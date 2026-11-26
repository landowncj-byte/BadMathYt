#!/usr/bin/env python3
"""Long-form mixer for the Madoff video (engine v2). Voice -16 LUFS; per-chapter CC0 beds at -24 LUFS ducked a further ~5 dB under speech;
one-shot SFX from brand/sfx-library (manifest names) or ../sfx ('local:name'); master -14 LUFS, true peak <= -1 dBTP.
usage: python3 mix_long.py <build dir with sfx.json + video_noaudio.mp4> <out.mp4>"""
import json, os, re, subprocess, sys, numpy as np
SR = 48000
HERE = os.path.dirname(os.path.abspath(__file__)); VID = os.path.abspath(os.path.join(HERE, '..'))
LIB = os.path.abspath(os.path.join(VID, '../../brand/sfx-library')); MAN = {m['name']: os.path.join(LIB, m['file']) for m in json.load(open(os.path.join(LIB, 'manifest.json')))}
def run(a, **k): return subprocess.run(a, check=True, **k)
def decode(path, af=None):
    cmd = ['ffmpeg', '-v', 'error', '-i', path] + (['-af', af] if af else []) + ['-ar', str(SR), '-ac', '2', '-f', 'f32le', '-']
    b = subprocess.run(cmd, check=True, stdout=subprocess.PIPE).stdout; return np.frombuffer(b, dtype='<f4').reshape(-1, 2).copy()
def lufs_norm(path, target):  # integrated loudness normalisation via ffmpeg two-pass loudnorm (linear)
    r = subprocess.run(['ffmpeg', '-hide_banner', '-i', path, '-af', f'aresample={SR},loudnorm=I={target}:TP=-3:LRA=15:print_format=json', '-f', 'null', '-'], capture_output=True, text=True).stderr
    m = json.loads(re.search(r'\{[^{}]*"input_i"[^{}]*\}', r, re.S).group(0))
    return f"loudnorm=I={target}:TP=-3:LRA=15:measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true"
def sfx_path(name):
    if name.startswith('local:'): return os.path.join(VID, 'sfx', name[6:] + '.mp3')
    return MAN[name]
def loop_to(a, n, xf=int(1.2 * SR)):  # loop a bed to n samples with equal-power crossfades
    if len(a) >= n: return a[:n]
    out = np.zeros((n, 2), 'f4'); pos = 0; first = True
    while pos < n:
        seg = a.copy(); k = min(xf, len(seg) // 3)
        if not first: seg[:k] *= np.sin(np.linspace(0, np.pi / 2, k))[:, None]
        seg[-k:] *= np.cos(np.linspace(0, np.pi / 2, k))[:, None]
        end = min(n, pos + len(seg)); out[pos:end] += seg[:end - pos]; pos += len(seg) - k; first = False
    return out
def main(bd, out):
    S = json.load(open(os.path.join(bd, 'sfx.json'))); DUR = S['duration']; N = int(DUR * SR) + 1
    P = json.load(open(os.path.join(VID, 'align/timeline.json')))['paragraphs']; pstart = {p['id']: p['start'] for p in P}; VEND = P[-1]['end']
    # ---- voice ----
    vp = os.path.join(VID, 'align/narration.wav'); v = decode(vp, lufs_norm(vp, -16).replace('TP=-3', 'TP=-2')); v = v[:, :]
    voice = np.zeros((N, 2), 'f4'); voice[:min(N, len(v))] = v[:N]
    # ---- sfx ----
    fx = np.zeros((N, 2), 'f4'); cache = {}
    for s in S['sfx']:
        p = sfx_path(s['name'])
        if p not in cache: cache[p] = decode(p)
        a = cache[p]; off = int(s.get('offset', 0) * SR); a = a[off:]; d = int(s.get('dur', 1) * SR)
        nz = np.where(np.abs(a).max(axis=1) > 10 ** (-45 / 20))[0]
        if len(nz): a = a[nz[0]:]
        a = a[:d].copy(); f = int(min(0.15, s.get('dur', 1) / 3) * SR)
        if len(a) > f: a[-f:] *= np.linspace(1, 0, f)[:, None]
        a *= 10 ** (s.get('gain', -8) / 20); i = int(s['at'] * SR); j = min(N, i + len(a))
        if j > i: fx[i:j] += a[:j - i]
    fx *= 10 ** (-1 / 20)
    # ---- beds (per chapter, crossfaded) ----
    T = lambda k: pstart[k]
    segs = [  # start, end, [(manifest bed name, gain dB)] — RULES 115: a different bed per chapter
        (0, T('P07') - 0.3, [('tense_bed_1', 0)]),
        (T('P07') - 0.3, T('P21') - 0.3, [('jazz_bed_1', 0)]),
        (T('P21') - 0.3, T('P34') - 0.3, [('tense_bed_2', 0)]),
        (T('P34') - 0.3, T('P48') - 0.3, [('auction_tension_bed_1', 0)]),
        (T('P48') - 0.3, T('P60') - 0.3, [('verdict_bed_2', 0)]),
        (T('P60') - 0.3, T('P71') - 0.3, [('tense_bed_1', 0)]),
        (T('P71') - 0.3, DUR, [('lofi_bed_1', 0)])]
    bed = np.zeros((N, 2), 'f4'); XF = 1.2
    for a, b, files in segs:
        i0 = int(max(0, a - XF / 2) * SR); i1 = min(N, int((b + XF / 2) * SR)); n = i1 - i0; seg = np.zeros((n, 2), 'f4')
        for fn, g in files:
            fp = MAN[fn]; x = decode(fp, lufs_norm(fp, -24)) * 10 ** (g / 20); seg += loop_to(x, n)
        env = np.ones(n, 'f4'); k = int(XF * SR)
        if a > 0: env[:k] = np.sin(np.linspace(0, np.pi / 2, k))
        if b < DUR - 1: env[-k:] = np.cos(np.linspace(0, np.pi / 2, k))
        bed[i0:i1] += seg * env[:, None]
    # end card: music only, a little louder; last 2.5 s fade out
    endt = VEND + 0.2; g = np.ones(N, 'f4'); i = int(endt * SR); r = int(1.5 * SR); g[i:i + r] = np.linspace(1, 10 ** (7 / 20), r); g[i + r:] = 10 ** (7 / 20); f = int(2.5 * SR); g[-f:] *= np.linspace(1, 0, f)
    # duck under speech: smoothed voice envelope -> -5 dB while talking
    w = int(0.05 * SR); cs = np.concatenate([[0.0], np.cumsum(voice[:, 0].astype('f8') ** 2)]); idx = np.arange(N); lo = np.clip(idx - w // 2, 0, N); hi = np.clip(idx + w // 2, 0, N); e = np.sqrt((cs[hi] - cs[lo]) / np.maximum(1, hi - lo)); act = (e > 0.012).astype('f4')
    def smooth(x, att, rel):
        y = np.empty_like(x); c = 0.0; ka, kr = np.exp(-1 / (att * SR)), np.exp(-1 / (rel * SR))
        step = 480; xs = x[::step]; ys = np.empty_like(xs)
        for q, val in enumerate(xs):
            k = ka if val > c else kr; c = k * c + (1 - k) * val; ys[q] = c
        return np.interp(np.arange(len(x)), np.arange(len(xs)) * step, ys).astype('f4')
    duck = smooth(act, 0.04 * 10, 0.45 * 4) ; bed *= (10 ** (-5.5 * duck / 20))[:, None] * g[:, None]
    mix = voice + fx + bed; np.save(os.path.join(bd, 'mixpre.npy'), mix) if False else None
    pre = os.path.join(bd, 'mixpre.wav'); mw = os.path.join(bd, 'mix.wav')
    run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '2', '-i', '-', '-c:a', 'pcm_f32le', pre], input=mix.astype('<f4').tobytes())
    r = subprocess.run(['ffmpeg', '-hide_banner', '-y', '-i', pre, '-af', 'highpass=f=50,acompressor=threshold=-18dB:ratio=2.2:attack=10:release=220,loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json', '-f', 'null', '-'], capture_output=True, text=True).stderr
    m = json.loads(re.search(r'\{[^{}]*"input_i"[^{}]*\}', r, re.S).group(0))
    def meas(f):
        o = subprocess.run(['ffmpeg', '-hide_banner', '-i', f, '-af', 'ebur128=peak=true', '-f', 'null', '-'], capture_output=True, text=True).stderr
        p = subprocess.run(['ffmpeg', '-hide_banner', '-i', f, '-af', 'aresample=192000,astats=metadata=0', '-f', 'null', '-'], capture_output=True, text=True).stderr
        return float(re.findall(r"I:\s+(-?[\d.]+) LUFS", o)[-1]), max(float(x) for x in re.findall(r"Peak level dB: (-?[\d.]+)", p))
    for trim in (0, -.3, -.6, -.9, -1.2):
        lim = round(10 ** (-1.5 / 20), 3)
        af = f"highpass=f=50,acompressor=threshold=-18dB:ratio=2.2:attack=10:release=220,loudnorm=I=-14:TP=-1.5:LRA=11:measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true,volume={trim}dB,aresample=192000,alimiter=limit={lim}:level=false:attack=1:release=60,aresample={SR},afade=t=in:d=0.03,afade=t=out:st={DUR - 0.08}:d=0.08"
        run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', pre, '-af', af, '-c:a', 'pcm_s16le', mw])
        run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', os.path.join(bd, 'video_noaudio.mp4'), '-i', mw, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-aac_pns', '0', '-aac_is', '0', '-aac_tns', '0', '-movflags', '+faststart', out])
        I, pk = meas(out); print(f"trim {trim} dB -> {I} LUFS, peak {pk} dBFS", flush=True)
        if pk <= -1.05 and abs(I + 14) <= .4: break
    os.remove(pre)
if __name__ == '__main__':
    if len(sys.argv) != 3: sys.exit(__doc__)
    main(*sys.argv[1:])
