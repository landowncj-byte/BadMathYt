import numpy as np, soundfile as sf, json
from kokoro_onnx import Kokoro
k = Kokoro('/root/tts/kokoro-v1.0.onnx', '/root/tts/voices-v1.0.bin')
L = [("This guy was so dumb, he committed an eight billion dollar fraud.", .2), ("And wrote it into the code.", .45),
("F T X. A crypto exchange with over a million users.", .25),
("Its owner, Sam Bankman-Fried, also ran a trading firm called Alameda. Alameda's credit line? Essentially unlimited. No collateral.", .3),
("Hit like if you'd have trusted it too.", .3),
("His own engineer testified that some simple tweaks to the code helped Alameda misappropriate as much as sixty-five billion dollars.", .35),
("Alameda took about eight billion. Send this to the friend who swears their exchange is safe.", .3),
("Then withdrawals spiked. The money wasn't there. Bankrupt.", .3),
("Follow along. Every con leaves this fingerprint.", .3),
("Seven counts. Guilty. Twenty-five years.", .45),
("Credit limit: none.", .6)]
out, marks, t = [], [], 0.0
for s, p in L:
    a, sr = k.create(s, voice='am_michael', speed=1.12, lang='en-us')
    nz = np.where(np.abs(a) > 0.01)[0]; a = a[max(0, nz[0]-int(.02*sr)): nz[-1]+int(.06*sr)]
    marks.append({"text": s, "start": round(t,3), "end": round(t+len(a)/sr,3)}); out += [a, np.zeros(int(p*sr), dtype=a.dtype)]; t += len(a)/sr + p
y = np.concatenate(out); sf.write('voice/narration.wav', y, sr); json.dump(marks, open('voice/sentences.json','w'), indent=1)
print('dur', round(len(y)/sr,2)); [print(f"{m['start']:6.2f} {m['text'][:60]}") for m in marks]
