#!/usr/bin/env python3
"""Bad Math engine v2 mixer. Same recipe as the v1 mixlib: voice -16 LUFS, bed -24 LUFS ducked under the voice,
master -14 LUFS / true peak <= -1 dBTP (two-pass loudnorm + limiter). SFX come straight from brand/sfx-library
and their times come from <sceneDir>/sfx.json, which `bm2.cjs render` (or `check`) writes from scene.js.
usage: python3 brand/engine-v2/mix.py <sceneDir> <voiceDir> <out.mp4>"""
import subprocess, json, re, os, sys
HERE = os.path.dirname(os.path.abspath(__file__)); LIB = os.path.join(HERE, '..', 'sfx-library')
MAN = {m['name']: os.path.join(LIB, m['file']) for m in json.load(open(os.path.join(LIB, 'manifest.json')))}
def run(a, **k): return subprocess.run(a, **k)
def mix(scene, voice_dir, out):
    S = json.load(open(os.path.join(scene, 'sfx.json'))); DUR = S['duration']; pre = os.path.join(scene, 'mixpre.wav'); mw = os.path.join(scene, 'mix.wav')
    ins = ['-i', os.path.join(voice_dir, 'narration.wav')]
    fc = [f"[0:a]aresample=48000,pan=stereo|c0=c0|c1=c0,apad=whole_dur={DUR},atrim=0:{DUR},loudnorm=I=-16:TP=-2:LRA=11,aresample=48000,asplit[v][vk]"]
    n = 1; fxl = []
    for s in S['sfx']:
        if s['name'] not in MAN: sys.exit(f"sfx '{s['name']}' not in brand/sfx-library/manifest.json")
        ins += ['-i', MAN[s['name']]]; ms = int(s['at'] * 1000); d = s.get('dur', 1); off = s.get('offset', 0)
        ch = f"[{n}:a]aresample=48000,aformat=channel_layouts=stereo,atrim={off}:{off + d + 1.0 if off else 99},asetpts=PTS-STARTPTS,silenceremove=start_periods=1:start_threshold=-45dB,atrim=0:{d},asetpts=PTS-STARTPTS,afade=out:st={max(0, d - min(.15, d / 3)):.3f}:d={min(.15, d / 3):.3f}"
        fc.append(ch + f",volume={s.get('gain', -8)}dB,adelay={ms}|{ms}[f{n}]"); fxl.append(f"[f{n}]"); n += 1
    fc.append("".join(fxl) + f"amix=inputs={len(fxl)}:normalize=0:duration=longest,apad=whole_dur={DUR},atrim=0:{DUR},volume=-1dB[fx]" if fxl else f"anullsrc=r=48000:cl=stereo,atrim=0:{DUR}[fx]")
    bed = S.get('bed')
    if bed:
        ins += ['-i', MAN[bed['name']]]; off = bed.get('offset', 0)
        fc.append(f"[{n}:a]aresample=48000,aformat=channel_layouts=stereo,atrim={off}:{off + DUR},asetpts=PTS-STARTPTS,loudnorm=I=-24:TP=-6:LRA=15,aresample=48000,afade=in:d=0.3,afade=out:st={DUR - 1:.3f}:d=1,volume={bed.get('gain', -1)}dB,apad=whole_dur={DUR},atrim=0:{DUR}[bed]")
        fc.append("[bed][vk]sidechaincompress=threshold=0.04:ratio=5:attack=15:release=350[bd]")
    else: fc.append(f"[vk]volume=0[bd]")
    fc.append("[v][fx][bd]amix=inputs=3:normalize=0:duration=first,highpass=f=60,acompressor=threshold=-16dB:ratio=2.5:attack=10:release=200[out]")
    run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *ins, '-filter_complex', ';'.join(fc), '-map', '[out]', '-t', str(DUR), '-c:a', 'pcm_f32le', pre], check=True)
    r = run(['ffmpeg', '-hide_banner', '-y', '-i', pre, '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json', '-f', 'null', '-'], capture_output=True, text=True).stderr
    m = json.loads(re.search(r'\{[^{}]*"input_i"[^{}]*\}', r, re.S).group(0))
    def meas(f):
        o = run(['ffmpeg', '-hide_banner', '-i', f, '-af', 'ebur128=peak=true', '-f', 'null', '-'], capture_output=True, text=True).stderr
        p = run(['ffmpeg', '-hide_banner', '-i', f, '-af', 'aresample=192000,astats=metadata=0', '-f', 'null', '-'], capture_output=True, text=True).stderr
        return float(re.findall(r"I:\s+(-?[\d.]+) LUFS", o)[-1]), max(float(x) for x in re.findall(r"Peak level dB: (-?[\d.]+)", p))
    for trim in (0, -.3, -.6, -.9):
        lim = round(10 ** (-1.5 / 20), 3)
        af = f"loudnorm=I=-14:TP=-1.5:LRA=11:measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true,volume={trim}dB,aresample=192000,alimiter=limit={lim}:level=false:attack=1:release=60,aresample=48000,afade=t=in:d=0.03,afade=t=out:st={DUR - 0.08}:d=0.08"
        run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', pre, '-af', af, '-c:a', 'pcm_s16le', mw], check=True)
        run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', os.path.join(scene, 'video_noaudio.mp4'), '-i', mw, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-aac_pns', '0', '-aac_is', '0', '-aac_tns', '0', '-movflags', '+faststart', out], check=True)
        I, pk = meas(out); print(f"trim {trim} dB -> {I} LUFS, peak {pk} dBFS")
        if pk <= -1.05 and abs(I + 14) <= .4: break
    for f in (pre,): os.remove(f)
if __name__ == '__main__':
    if len(sys.argv) != 4: sys.exit(__doc__)
    mix(*sys.argv[1:])
