"""Owen (ElevenLabs) narration for the heists long-form (2026-12-04).
Inputs: voice-owen/ch0..ch6.mp3 (one per chapter, paragraphs separated by \n\n in the prompt), ../paragraphs.json.
Splits each chapter at paragraph breaks (largest word gap near the expected point), rebuilds the narration
with the original per-paragraph pauses, and writes ../align/{narration.wav, timeline.json, mouth.json, words.json,
paragraphs_timed.json} (Kokoro originals backed up to ../align/kokoro/)."""
import difflib, json, math, os, shutil, subprocess, numpy as np, soundfile as sf
from faster_whisper import WhisperModel
os.chdir(os.path.dirname(os.path.abspath(__file__)))
SR = 44100; FPS = 30
P = json.load(open('../paragraphs.json'))
wm = WhisperModel('small.en', device='cpu', compute_type='int8')
def load(f):
    t = '/tmp/_hl_o.wav'; subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', f, '-ar', str(SR), '-ac', '1', t], check=True)
    a, _ = sf.read(t, dtype='float32'); return a
def whisper(a):
    t = '/tmp/_hl_o16.wav'; sf.write('/tmp/_hl_o44.wav', a, SR)
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', '/tmp/_hl_o44.wav', '-ar', '16000', '-ac', '1', t], check=True)
    a16, _ = sf.read(t, dtype='float32')
    segs, _ = wm.transcribe(a16, word_timestamps=True, language='en', beam_size=5)
    return [{'w': w.word.strip(), 's': float(w.start), 'e': float(w.end)} for s in segs for w in (s.words or []) if w.word.strip()]
out, timed, t = [], [], 0.0
report = []
for ch in range(7):
    allp = [p for p in P if p['chapter'] == ch]
    paras = [p for p in allp if 'file' not in p]
    a = load(f'ch{ch}.mp3'); dur = len(a) / SR
    cf = f'/tmp/claude-0/cm/ws_hl_ch{ch}.json'
    if os.path.exists(cf): ws = json.load(open(cf))
    else:
        ws = whisper(a); json.dump(ws, open(cf, 'w'))
    import re
    NUM = set('a half quarter point oh zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty thirty forty fifty sixty seventy eighty ninety hundred thousand million billion and first second third fourth fifth sixth seventh eighth ninth tenth eleventh twelfth thirteenth fourteenth fifteenth sixteenth seventeenth eighteenth nineteenth twentieth thirtieth st nd rd th'.split())
    ALIAS = {'spex': 'specs', 'specks': 'specs', 'plan': 'planned'}   # Whisper spellings of names in this script
    def toks(t): return [ALIAS.get(x, x) for x in (re.sub(r"[^a-z']", '', w.lower()).strip("'") for w in re.split(r'[\s-]+', t)) if x and x not in NUM]
    wt = [toks(w['w']) for w in ws]   # per whisper word (digits drop out)
    flat = [(i, x) for i, tl in enumerate(wt) for x in tl]
    cuts, pos = [], 0
    for b in range(1, len(paras)):
        hit = None
        for kl in (3, 2, 1):
            key = toks(paras[b]['text'])[:kl]
            for k in range(pos, len(flat) - len(key) + 1):
                if all(difflib.SequenceMatcher(None, a, b).ratio() >= 0.75 for a, b in zip([x for _, x in flat[k:k + len(key)]], key)): hit = k; break
            if hit is not None: break
        if hit is None: raise SystemExit(f"no match for {paras[b]['id']} key={key}")
        wi = flat[hit][0]; pos = hit + 1
        # step back over leading words dropped from the key (And / One / Three / numbers)
        raw = [re.sub(r"[^a-z0-9']", '', w.lower()) for w in re.split(r'[\s-]+', paras[b]['text'])]
        lead = 0
        for x in raw:
            if x and (x in NUM or x.isdigit()): lead += 1
            else: break
        while lead > 0 and wi > 0 and not toks(ws[wi - 1]['w']):
            wi -= 1; lead -= 1
        cuts.append(((ws[wi - 1]['e'] + ws[wi]['s']) / 2, 0, wi))
    bounds = [0.0] + [c[0] for c in cuts] + [dur]
    segs = {}
    for j, p in enumerate(paras):
        segs[p['id']] = (a[int(bounds[j] * SR): int(bounds[j + 1] * SR)], [w['w'] for w in ws if bounds[j] <= w['s'] < bounds[j + 1]][:4])
    for p in allp:
        if 'file' in p: seg, first = load(p['file']), ['(insert)']
        else: seg, first = segs[p['id']]
        nz = np.where(np.abs(seg) > 0.004)[0]
        seg = seg[max(0, nz[0] - int(0.03 * SR)): nz[-1] + int(0.08 * SR)] if len(nz) else seg
        if 'file' in p: seg = seg / max(1e-6, np.abs(seg).max()) * float(np.percentile(np.abs(a), 99.9))
        start = t; end = t + len(seg) / SR
        timed.append({'id': p['id'], 'chapter': ch, 'start': round(start, 3), 'end': round(end, 3), 'pause': p['pause'], 'text': p['text']})
        out += [seg, np.zeros(int(round(p['pause'] * SR)), 'float32')]; t = end + p['pause']
        report.append(f"{p['id']} {start:7.2f}-{end:7.2f} | heard: {' '.join(first)} | script: {' '.join(p['text'].split()[:4])}")
y = np.concatenate(out)
# loudness-normalise roughly like Kokoro narration (peak 0.9)
y = y / max(1e-6, np.abs(y).max()) * 0.9
sf.write('../align/narration.wav', y, SR)
total = round(len(y) / SR, 3)
words = whisper(y)
json.dump([{k: round(v, 3) if k != 'w' else v for k, v in w.items()} for w in words], open('../align/words.json', 'w'), indent=1)
json.dump([{k: r[k] for k in ('id', 'chapter', 'start', 'end')} for r in timed], open('../align/paragraphs_timed.json', 'w'), indent=1)
pw = {p['id']: [] for p in timed}
for wd in words:
    hit = next((p for p in timed if p['start'] - 0.05 <= wd['s'] <= p['end'] + p['pause']), None) or min(timed, key=lambda p: abs(wd['s'] - p['start']))
    pw[hit['id']].append({'w': wd['w'], 's': round(wd['s'], 3), 'e': round(wd['e'], 3)})
json.dump({'duration': total, 'paragraphs': [{'id': p['id'], 'chapter': p['chapter'], 'start': p['start'], 'end': p['end'], 'text': p['text'], 'words': pw[p['id']]} for p in timed]}, open('../align/timeline.json', 'w'), indent=1)
subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', '../align/narration.wav', '-ar', '16000', '-ac', '1', '/tmp/_hl_n16.wav'], check=True)
a16, _ = sf.read('/tmp/_hl_n16.wav', dtype='float32'); fs = 16000 / FPS; n = int(math.ceil(len(a16) / fs))
rms = np.array([math.sqrt(float(np.mean(a16[int(i * fs):int((i + 1) * fs)].astype(np.float64) ** 2))) for i in range(n)])
json.dump([round(float(v), 3) for v in np.clip(rms / np.percentile(rms, 98), 0, 1)], open('../align/mouth.json', 'w'))
open('align_report.txt', 'w').write('\n'.join(report) + f'\nTOTAL {total} s\n')
print('\n'.join(report)); print('TOTAL', total)
