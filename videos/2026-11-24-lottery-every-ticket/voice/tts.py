import numpy as np, soundfile as sf, json
from kokoro_onnx import Kokoro
k = Kokoro('/root/tts/kokoro-v1.0.onnx', '/root/tts/voices-v1.0.bin')
L = [("You're an idiot for buying one lottery ticket.", .2), ("This guy's team bought over five million.", .45),
("Virginia, nineteen ninety-two. Seven million and fifty-nine thousand possible combinations. One dollar each.", .3),
("The jackpot? Twenty-seven million. So a fund from Australia did the math. Buy every single one.", .3),
("Hit like if you'd have done it too.", .3),
("But buying them takes time. They ran out of it, with about one and a half million combinations never bought.", .3),
("Send this to the friend who still plays their birthday.", .3),
("Follow along. Then the numbers came out.", .4),
("Eight. Eleven. Thirteen. Fifteen. Nineteen. Twenty.", .35),
("They had it. Twenty-seven million dollars.", .45),
("Today, Powerball has two hundred ninety-two million combinations. At one ticket a second, that's nine years of printing.", .35),
("So yes. You're still an idiot for buying one.", .6)]
out, marks, t = [], [], 0.0
for s, p in L:
    a, sr = k.create(s, voice='am_michael', speed=1.12, lang='en-us')
    nz = np.where(np.abs(a) > 0.01)[0]; a = a[max(0, nz[0]-int(.02*sr)): nz[-1]+int(.06*sr)]
    marks.append({"text": s, "start": round(t,3), "end": round(t+len(a)/sr,3)}); out += [a, np.zeros(int(p*sr), dtype=a.dtype)]; t += len(a)/sr + p
y = np.concatenate(out); sf.write('voice/narration.wav', y, sr); json.dump(marks, open('voice/sentences.json','w'), indent=1)
print('dur', round(len(y)/sr,2)); [print(f"{m['start']:6.2f} {m['text'][:60]}") for m in marks]
