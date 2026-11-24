"""Re-voice only sentences containing given words with the pronunciation fixes, keeping
each sentence at its original start time (so animation/captions/mouth stay in sync).
usage: python patch_sentences.py <voice_dir>   (uses voice_dir/sentences.json + narration.wav)"""
import sys, json, numpy as np, soundfile as sf, re
sys.path.insert(0, '/home/user/badmathyt/brand/voice')
from pronounce import say, FIX
from kokoro_onnx import Kokoro
vd = sys.argv[1]
k = Kokoro('/root/tts/kokoro-v1.0.onnx', '/root/tts/voices-v1.0.bin')
y, sr = sf.read(f'{vd}/narration.wav', dtype='float32')
S = json.load(open(f'{vd}/sentences.json'))
for i, s in enumerate(S):
    hits = [w for w in FIX if re.search(r"(?<![A-Za-z])" + re.escape(w) + r"(?![A-Za-z])", s['text'], re.I)]
    if not hits: continue
    a, _ = say(k, s['text'])
    nz = np.where(np.abs(a) > 0.01)[0]; a = a[max(0, nz[0]-int(.02*sr)): nz[-1]+int(.06*sr)]
    st = int(s['start']*sr); en = int(s['end']*sr)
    nxt = int(S[i+1]['start']*sr) if i+1 < len(S) else len(y)
    room = nxt - st - int(.08*sr)
    if len(a) > room:   # speed up slightly to fit the slot (max ~12%)
        import subprocess, tempfile, os
        r = len(a)/room
        tf = tempfile.mktemp(suffix='.wav'); to = tempfile.mktemp(suffix='.wav'); sf.write(tf, a, sr)
        subprocess.run(['ffmpeg','-v','error','-y','-i',tf,'-af',f'atempo={min(r,1.25):.4f}',to]); a, _ = sf.read(to, dtype='float32')
        a = a[:room]; print(f'  s{i} sped x{r:.3f}')
    y[st:nxt] = 0; y[st:st+len(a)] = a
    s['end'] = round((st+len(a))/sr, 3)
    print(f'  patched s{i} {hits}: {s["text"][:60]}  ({(en-st)/sr:.2f}s -> {len(a)/sr:.2f}s)')
sf.write(f'{vd}/narration.wav', y, sr); json.dump(S, open(f'{vd}/sentences.json','w'), indent=1)
hop = sr//30; n = len(y)//hop; r = np.array([np.sqrt(np.mean(y[j*hop:(j+1)*hop]**2)) for j in range(n)])
json.dump([round(float(v),3) for v in np.clip(r/np.percentile(r,98),0,1)], open(f'{vd}/mouth.json','w'))
