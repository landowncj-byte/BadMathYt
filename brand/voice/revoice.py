"""Re-voice a finished cut with the current default Shorts voice (am_liam), keeping every
sentence at its original start time so animation/captions stay in sync.
usage: python revoice.py <voice_dir> [voice]   (backs up narration.wav -> narration.prev.wav)"""
import sys, json, os, subprocess, tempfile, numpy as np, soundfile as sf
sys.path.insert(0, '/home/user/badmathyt/brand/voice')
from pronounce import say
from kokoro_onnx import Kokoro
vd = sys.argv[1]; voice = sys.argv[2] if len(sys.argv) > 2 else 'am_liam'
k = Kokoro('/root/tts/kokoro-v1.0.onnx', '/root/tts/voices-v1.0.bin')
y, sr = sf.read(f'{vd}/narration.wav', dtype='float32')
if not os.path.exists(f'{vd}/narration.prev.wav'): sf.write(f'{vd}/narration.prev.wav', y, sr)
S = json.load(open(f'{vd}/sentences.json'))
out = np.zeros_like(y)
for i, s in enumerate(S):
    a, _ = say(k, s['text'], voice=voice)
    nz = np.where(np.abs(a) > 0.01)[0]; a = a[max(0, nz[0]-int(.02*sr)): nz[-1]+int(.06*sr)]
    st = int(s['start']*sr); nxt = int(S[i+1]['start']*sr) if i+1 < len(S) else len(y)
    room = nxt - st - int(.06*sr)
    if len(a) > room:
        r = min(len(a)/room, 1.3)
        fi, fo = tempfile.mktemp(suffix='.wav'), tempfile.mktemp(suffix='.wav'); sf.write(fi, a, sr)
        subprocess.run(['ffmpeg','-v','error','-y','-i',fi,'-af',f'atempo={r:.4f}',fo], check=True)
        a, _ = sf.read(fo, dtype='float32'); a = a[:room]
    out[st:st+len(a)] = a; s['end'] = round((st+len(a))/sr, 3)
sf.write(f'{vd}/narration.wav', out, sr); json.dump(S, open(f'{vd}/sentences.json','w'), indent=1)
hop = sr//30; n = len(out)//hop; r = np.array([np.sqrt(np.mean(out[j*hop:(j+1)*hop]**2)) for j in range(n)])
json.dump([round(float(v),3) for v in np.clip(r/np.percentile(r,98),0,1)], open(f'{vd}/mouth.json','w'))
print('revoiced', vd, voice, len(S), 'sentences')
