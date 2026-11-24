"""Original music bed + SFX for the $1/second Short. All synthesized here (no third-party audio)."""
import numpy as np, wave

SR = 48000
DUR = 28.8
N = int(SR * DUR)
rng = np.random.default_rng(7)

def wav_out(path, x):
    x = np.clip(x, -1, 1)
    with wave.open(path, "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((x * 32767).astype(np.int16).tobytes())

def add(buf, t0, sig):
    i = int(t0 * SR); j = min(N, i + len(sig))
    if i < N: buf[i:j] += sig[: j - i]

def env(n, a=0.002, r=0.1):
    t = np.arange(n) / SR
    return np.minimum(1, t / a) * np.exp(-t / r)

def tick(f=2400, amp=0.5, r=0.025):
    n = int(0.08 * SR); t = np.arange(n) / SR
    return amp * np.sin(2 * np.pi * f * t) * env(n, 0.001, r)

def whoosh(d=0.45, amp=0.35):
    n = int(d * SR); x = rng.standard_normal(n)
    # sweep: one-pole low-pass with rising cutoff
    y = np.zeros(n); c = np.linspace(0.02, 0.35, n); s = 0
    for k in range(n): s += c[k] * (x[k] - s); y[k] = s
    shape = np.sin(np.pi * np.linspace(0, 1, n)) ** 2
    return amp * y / (np.abs(y).max() + 1e-9) * shape

def impact(amp=0.9):
    n = int(1.4 * SR); t = np.arange(n) / SR
    f = 55 + 90 * np.exp(-t * 18)
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 3.2)
    crack = rng.standard_normal(n) * np.exp(-t * 30) * 0.5
    return amp * (body + crack)

def chime(f=1318.5, amp=0.35):
    n = int(1.2 * SR); t = np.arange(n) / SR
    return amp * (np.sin(2*np.pi*f*t) + 0.5*np.sin(2*np.pi*2*f*t) + 0.3*np.sin(2*np.pi*3.01*f*t)) * env(n, 0.002, 0.35)

def riser(d, amp=0.25):
    n = int(d * SR); t = np.arange(n) / SR
    f = 200 * (8 ** (t / d))
    tone = np.sin(2 * np.pi * np.cumsum(f) / SR)
    noise = rng.standard_normal(n) * 0.3
    return amp * (tone * 0.6 + noise) * (t / d) ** 2

sfx = np.zeros(N)
# $1 every second: one tick per dollar
for s in range(0, 6): add(sfx, s + 0.0, tick(2600 if s == 0 else 2400, 0.55))
# whooshes on scene changes
for t0 in [3.62, 5.28, 7.63, 10.13, 13.63, 16.28, 23.43]: add(sfx, t0, whoosh())
# rolling counter ticks while the number races
for a, b, rate in [(5.45, 7.0, 14), (7.8, 9.6, 16), (10.3, 12.9, 16), (13.8, 15.6, 18), (16.45, 18.5, 18), (19.3, 19.6, 20), (20.74, 21.2, 30)]:
    t0 = a
    while t0 < b: add(sfx, t0, tick(3000, 0.16, 0.012)); t0 += 1 / rate
# milestones
for t0 in [7.0, 9.6, 12.9]: add(sfx, t0, tick(1800, 0.5, 0.05))
add(sfx, 15.6, chime())                     # millionaire
add(sfx, 16.45, riser(3.25))                # build to "a year? two?"
add(sfx, 20.74, impact(0.95))               # 31.7 YEARS stamp
add(sfx, 25.7, impact(0.5))                 # billion bar
add(sfx, 23.75, tick(1500, 0.4, 0.06))      # million sliver

# music bed: original pad (Am - F - C - G), quiet pulse, cut during the silence
t = np.arange(N) / SR
chords = [[220.0, 261.63, 329.63], [174.61, 220.0, 261.63], [196.0, 261.63, 329.63], [196.0, 246.94, 293.66]]
bed = np.zeros(N); bar = 2.4
for i in range(int(DUR / bar) + 1):
    a = int(i * bar * SR); b = min(N, int((i + 1) * bar * SR) + int(0.3 * SR))
    if a >= N: break
    tt = np.arange(b - a) / SR
    seg = sum(np.sin(2*np.pi*f*tt) + 0.3*np.sin(2*np.pi*2*f*tt + 0.3) for f in chords[i % 4])
    seg += 0.8 * np.sin(2*np.pi*chords[i % 4][0]/2*tt)          # bass
    e = np.minimum(1, tt / 0.25) * np.minimum(1, (len(tt)/SR - tt) / 0.3)
    bed[a:b] += seg * e * 0.12
pulse = 0.75 + 0.25 * np.cos(2 * np.pi * t * (100 / 60))          # 100 bpm swell
bed *= pulse
gate = np.ones(N)
gate[(t >= 19.7) & (t < 20.74)] = 0.0                               # silence before the reveal
fade = np.clip((t - 19.4) / 0.3, 0, 1); gate = np.where((t >= 19.4) & (t < 19.7), 1 - fade, gate)
gate = np.where(t > DUR - 0.6, np.clip((DUR - t) / 0.6, 0, 1), gate)
bed *= gate
sfx[(t >= 19.7) & (t < 20.74)] *= 0.0

wav_out("sfx.wav", sfx / max(1, np.abs(sfx).max()) * 0.9)
wav_out("music.wav", bed / np.abs(bed).max() * 0.8)
print("ok")
