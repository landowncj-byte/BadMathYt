import numpy as np, soundfile as sf, json
from kokoro_onnx import Kokoro
k = Kokoro('/root/tts/kokoro-v1.0.onnx', '/root/tts/voices-v1.0.bin')
VOICE, SPEED = 'am_michael', 1.12
# (sentence, pause after in seconds)
L = [("Fifty percent profit. In forty-five days.", .5),
("Boston, nineteen twenty.", .2), ("Banks paid five percent a year.", .3),
("Charles Ponzi said he bought postal coupons cheap in Europe, and cashed them in America.", .3),
("Thousands lined up.", .15), ("Even most of Boston's police force bought in.", .4),
("But do the math.", .25), ("To pay everyone, he'd need a hundred and sixty million coupons.", .45),
("There were about twenty-seven thousand.", .5),
("So the profits came from the next investor.", .35),
("Then a newspaper checked the numbers.", .25), ("The line turned into a run.", .2), ("Six banks went down.", .2),
("Twenty million dollars.", .15), ("Gone.", .45),
("His name became the word for it.", .35), ("He died broke.", .3), ("Total estate: seventy-five dollars.", .6)]
out, marks, t = [], [], 0.0
for s, p in L:
    a, sr = k.create(s, voice=VOICE, speed=SPEED, lang='en-us')
    # trim leading/trailing silence
    nz = np.where(np.abs(a) > 0.01)[0]; a = a[max(0, nz[0]-int(.02*sr)): nz[-1]+int(.06*sr)]
    marks.append({"text": s, "start": round(t, 3), "end": round(t + len(a)/sr, 3)})
    out += [a, np.zeros(int(p*sr), dtype=a.dtype)]; t += len(a)/sr + p
y = np.concatenate(out); sf.write('voice/narration.wav', y, sr)
json.dump(marks, open('voice/sentences.json','w'), indent=1); print('dur', round(len(y)/sr,2), 'sr', sr)
