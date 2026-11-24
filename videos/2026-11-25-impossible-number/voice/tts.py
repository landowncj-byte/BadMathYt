"""Narration build: Kokoro TTS -> narration.wav + paragraph timings,
then Whisper word timings, timeline.json and mouth envelope, then accuracy check.

Run from anywhere: python voice/tts.py
"""
import difflib
import json
import math
import os
import re
import subprocess

import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(BASE)

SR = 24000            # Kokoro output rate
VOICE, SPEED = 'am_michael', 1.12
SENT_GAP = 0.22       # silence between sentences inside one paragraph (s)
FPS = 30
TRIM_THRESH, TRIM_PRE, TRIM_POST = 0.01, 0.02, 0.06

P = json.load(open('paragraphs.json', encoding='utf-8'))
k = Kokoro('/root/tts/kokoro-v1.0.onnx', '/root/tts/voices-v1.0.bin')


def split_sentences(text):
    # split after '. ', '? ', '! ' and keep the punctuation with its sentence
    return [s for s in re.split(r'(?<=[.?!]) ', text.strip()) if s]


def synth(sentence):
    a, sr = k.create(sentence, voice=VOICE, speed=SPEED, lang='en-us')
    assert sr == SR, sr
    a = np.asarray(a, dtype=np.float32)
    nz = np.where(np.abs(a) > TRIM_THRESH)[0]
    if len(nz) == 0:
        return a[:0]
    return a[max(0, nz[0] - int(TRIM_PRE * sr)): nz[-1] + int(TRIM_POST * sr)]


# ---------- step 1: synthesize paragraphs ----------
gap = np.zeros(int(SENT_GAP * SR), dtype=np.float32)
out, timed, t = [], [], 0.0
for p in P:
    parts = []
    for i, s in enumerate(split_sentences(p['text'])):
        if i:
            parts.append(gap)
        parts.append(synth(s))
    para = np.concatenate(parts)
    start, end = t, t + len(para) / SR
    pause = np.zeros(int(round(p['pause'] * SR)), dtype=np.float32)
    timed.append({'id': p['id'], 'chapter': p['chapter'],
                  'start': round(start, 3), 'end': round(end, 3),
                  'pause': p['pause'], 'text': p['text']})
    out += [para, pause]
    t = end + len(pause) / SR

y = np.concatenate(out)
sf.write('voice/narration.wav', y, SR)
total = round(len(y) / SR, 3)
json.dump([{k_: r[k_] for k_ in ('id', 'chapter', 'start', 'end')} for r in timed],
          open('voice/paragraphs_timed.json', 'w'), indent=1)
print('narration duration', total, 's, paragraphs', len(timed))

# ---------- step 3: word timings with Whisper ----------
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', 'voice/narration.wav',
                '-ar', '16000', '-ac', '1', 'voice/n16.wav'], check=True)
a16, sr16 = sf.read('voice/n16.wav', dtype='float32')
assert sr16 == 16000
if a16.ndim > 1:
    a16 = a16.mean(axis=1)

from faster_whisper import WhisperModel
model = WhisperModel('small.en', device='cpu', compute_type='int8')
segments, _info = model.transcribe(a16, word_timestamps=True, language='en', beam_size=5)
words = []
for seg in segments:
    for w in (seg.words or []):
        txt = w.word.strip()
        if txt:
            words.append({'w': txt, 's': round(float(w.start), 3), 'e': round(float(w.end), 3)})
json.dump(words, open('voice/words.json', 'w'), indent=1)
print('whisper words', len(words))

# ---------- step 4: timeline ----------
def window_end(p):
    return p['end'] + p['pause']


para_words = {p['id']: [] for p in timed}
unassigned = 0
for wd in words:
    hit = None
    for p in timed:
        if p['start'] <= wd['s'] <= window_end(p):
            hit = p
            break
    if hit is None:
        # fall back to the nearest window (Whisper timestamps can sit just outside)
        hit = min(timed, key=lambda p: min(abs(wd['s'] - p['start']),
                                           abs(wd['s'] - window_end(p))))
        unassigned += 1
    para_words[hit['id']].append({'w': wd['w'], 's': wd['s'], 'e': wd['e']})
if unassigned:
    print('words outside every window (assigned to nearest):', unassigned)

timeline = {
    'duration': total,
    'paragraphs': [{'id': p['id'], 'chapter': p['chapter'], 'start': p['start'],
                    'end': p['end'], 'text': p['text'], 'words': para_words[p['id']]}
                   for p in timed],
}
json.dump(timeline, open('voice/timeline.json', 'w'), indent=1)

# ---------- step 5: mouth envelope ----------
fs = sr16 / FPS
n_frames = int(math.ceil(len(a16) / fs))
rms = np.zeros(n_frames)
for i in range(n_frames):
    seg = a16[int(i * fs): int((i + 1) * fs)]
    if len(seg):
        rms[i] = math.sqrt(float(np.mean(seg.astype(np.float64) ** 2)))
p98 = float(np.percentile(rms, 98))
mouth = np.clip(rms / p98, 0, 1) if p98 > 0 else np.zeros(n_frames)
json.dump([round(float(v), 3) for v in mouth], open('voice/mouth.json', 'w'))
print('mouth frames', n_frames)

# ---------- step 6: accuracy check ----------
NUM_WORDS = set("""zero one two three four five six seven eight nine ten eleven twelve
thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty thirty forty fifty
sixty seventy eighty ninety hundred thousand million billion trillion and point
first second third fourth fifth sixth seventh eighth ninth tenth eleventh twelfth
thirteenth fourteenth fifteenth sixteenth seventeenth eighteenth nineteenth twentieth
thirtieth fortieth fiftieth sixtieth seventieth eightieth ninetieth hundredth thousandth
millionth percent""".split())


def norm(text):
    text = text.lower().replace('-', ' ').replace("'", '').replace(',', '')
    text = re.sub(r'[^a-z0-9 ]', ' ', text)
    return text.split()


def is_num(tok):
    return any(c.isdigit() for c in tok) or tok in NUM_WORDS


script_tokens, script_owner = [], []
for p in timed:
    toks = norm(p['text'])
    script_tokens += toks
    script_owner += [p['id']] * len(toks)
whisper_tokens = []
for wd in words:
    whisper_tokens += norm(wd['w'])

sm = difflib.SequenceMatcher(None, script_tokens, whisper_tokens, autojunk=False)
print(f'match ratio (script vs whisper, raw tokens): {sm.ratio():.4f}')

num_fmt, real = 0, []
for tag, i1, i2, j1, j2 in sm.get_opcodes():
    if tag == 'equal':
        continue
    s_span = script_tokens[i1:i2]
    w_span = whisper_tokens[j1:j2]
    if all(is_num(t) for t in s_span + w_span):
        num_fmt += 1
        continue
    pid = script_owner[i1] if i1 < len(script_owner) else script_owner[-1]
    real.append({'id': pid, 'op': tag, 'script': ' '.join(s_span), 'whisper': ' '.join(w_span)})

print('number-format differences (accepted):', num_fmt)
print('real word mismatches:', len(real))
for r in real:
    print(f"  {r['id']} {r['op']:8s} script='{r['script']}' whisper='{r['whisper']}'")
