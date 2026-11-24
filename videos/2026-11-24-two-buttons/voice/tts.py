import numpy as np, soundfile as sf, json
from kokoro_onnx import Kokoro
k = Kokoro('/root/tts/kokoro-v1.0.onnx', '/root/tts/voices-v1.0.bin')
VOICE, SPEED = 'am_michael', 1.12
L = [("Two buttons. You can only press one.", .45),
("Button A: one million dollars. Today.", .35),
("Button B: one thousand dollars, every week, for the rest of your life.", .5),
("Your gut says A.", .2), ("But watch.", .35),
("B pays fifty-two thousand a year.", .2), ("In about nineteen years, it passes A.", .3),
("Live sixty more years? B pays over three million.", .5),
("But wait.", .3),
("Park A's million somewhere earning five percent, and it pays you fifty thousand a year.", .2),
("And you still keep the million.", .45),
("Meanwhile, B never grows.", .2),
("With three percent inflation, in thirty years, your thousand buys what four hundred twelve does today.", .5),
("So which one?", .5),
("Comment A or B.", .25), ("Then rewatch. You might change your mind.", .6)]
out, marks, t = [], [], 0.0
for s, p in L:
    a, sr = k.create(s, voice=VOICE, speed=SPEED, lang='en-us')
    nz = np.where(np.abs(a) > 0.01)[0]; a = a[max(0, nz[0]-int(.02*sr)): nz[-1]+int(.06*sr)]
    marks.append({"text": s, "start": round(t, 3), "end": round(t + len(a)/sr, 3)})
    out += [a, np.zeros(int(p*sr), dtype=a.dtype)]; t += len(a)/sr + p
y = np.concatenate(out); sf.write('voice/narration.wav', y, sr)
json.dump(marks, open('voice/sentences.json','w'), indent=1); print('dur', round(len(y)/sr,2))
for m in marks: print(f"{m['start']:6.2f}-{m['end']:6.2f} {m['text']}")
