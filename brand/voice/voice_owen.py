"""Owen (ElevenLabs) narration for one Short cut — owner rule 2026-11-25 "make every video use owens voice".
usage: /root/tts/.venv/bin/python brand/voice/voice_owen.py <cut_dir> <owen.mp3>
Takes ONE Owen take of the whole script (voice/script.json lines joined, tags stripped) and writes, like voice_cut.py:
  voice/narration.wav (44.1 kHz mono, loudness left to mix.py), voice/words.json (Whisper word timings, for @word refs),
  voice/sentences.json (one entry per script line: start/end from aligned words, SHOW text = line minus tags),
  voice/mouth.json (30 fps). Owen's own natural pauses are kept (no inserted gaps, no breath noises).
Originals are kept in voice/kokoro/ the first time."""
import difflib, json, math, os, re, shutil, subprocess, sys, tempfile, numpy as np, soundfile as sf
from faster_whisper import WhisperModel
cut, mp3 = sys.argv[1], sys.argv[2]
v = os.path.join(cut, 'voice'); SR = 44100
lines = json.load(open(os.path.join(v, 'script.json')))
kb = os.path.join(v, 'kokoro')
if not os.path.isdir(kb):
    os.makedirs(kb)
    for f in ('narration.wav', 'words.json', 'sentences.json', 'mouth.json'):
        if os.path.exists(os.path.join(v, f)): shutil.copy(os.path.join(v, f), kb)
t = tempfile.mktemp(suffix='.wav')
subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', mp3, '-ar', str(SR), '-ac', '1', t], check=True)
a, _ = sf.read(t, dtype='float32'); os.remove(t)
nz = np.where(np.abs(a) > 0.01)[0]
if len(nz): a = a[max(0, nz[0] - int(.03 * SR)): nz[-1] + int(.25 * SR)]
sf.write(os.path.join(v, 'narration.wav'), a, SR)
t16 = tempfile.mktemp(suffix='.wav')
subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', os.path.join(v, 'narration.wav'), '-ar', '16000', '-ac', '1', t16], check=True)
a16, _ = sf.read(t16, dtype='float32'); os.remove(t16)
wm = WhisperModel('small.en', device='cpu', compute_type='int8')
segs, _ = wm.transcribe(a16, word_timestamps=True, language='en', beam_size=5)
words = [{'w': w.word.strip(), 's': round(float(w.start), 3), 'e': round(float(w.end), 3)} for s in segs for w in (s.words or []) if w.word.strip()]
json.dump(words, open(os.path.join(v, 'words.json'), 'w'), indent=1)
show = lambda s: re.sub(r'\s+', ' ', re.sub(r'\[[^\]]*\]', ' ', s)).strip()
def toks(s): return [x for x in (re.sub(r"[^a-z0-9']", '', w.lower()).strip("'") for w in re.split(r'[\s\-—]+', s)) if x]
# global alignment of script tokens to whisper tokens (difflib), then line boundaries from matched tokens
st, owner = [], []
for i, (l, _) in enumerate(lines):
    for x in toks(show(l)): st.append(x); owner.append(i)
wt, widx = [], []
for j, w in enumerate(words):
    for x in toks(w['w']): wt.append(x); widx.append(j)
sm = difflib.SequenceMatcher(None, st, wt, autojunk=False)
first, last = {}, {}
for blk in sm.get_matching_blocks():
    for k in range(blk.size):
        li, wj = owner[blk.a + k], widx[blk.b + k]
        first.setdefault(li, wj); last[li] = wj
sents, prev_end = [], 0.0
for i, (l, _) in enumerate(lines):
    if i in first: s, e = words[first[i]]['s'], words[last[i]]['e']
    else: s = e = prev_end            # unmatched (numbers etc.): filled below
    sents.append({'text': show(l), 'start': round(s, 3), 'end': round(e, 3)}); prev_end = e
for i, x in enumerate(sents):        # repair lines with no match: between neighbours
    if i not in first:
        lo = sents[i - 1]['end'] if i else 0.0
        hi = next((sents[k]['start'] for k in range(i + 1, len(sents)) if k in first), len(a) / SR)
        x['start'], x['end'] = round(lo + 0.05, 3), round(hi - 0.05, 3)
json.dump(sents, open(os.path.join(v, 'sentences.json'), 'w'), indent=1)
fs = 16000 / 30; n = int(math.ceil(len(a16) / fs))
rms = np.array([math.sqrt(float(np.mean(a16[int(i * fs):int((i + 1) * fs)].astype(np.float64) ** 2))) for i in range(n)])
p = float(np.percentile(rms, 98)); json.dump([round(float(x), 3) for x in np.clip(rms / p, 0, 1)], open(os.path.join(v, 'mouth.json'), 'w'))
miss = [i + 1 for i in range(len(lines)) if i not in first]
print(f'{cut}: {len(a)/SR:.2f} s | {len(words)} words | lines unmatched: {miss or "none"} | match ratio {sm.ratio():.2f}')
