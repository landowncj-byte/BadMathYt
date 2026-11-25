import subprocess, json, re, os, shutil, sys
LIB = '/home/user/badmathyt/brand/sfx-library'
def ensure_sfx(P, bed, sfxdir):
    """copy used CC0 files from brand/sfx-library into sfxdir (flat) and write CREDITS.md"""
    man = json.load(open(LIB + '/manifest.json')); by = {os.path.basename(m['file']): m for m in man}
    os.makedirs(sfxdir, exist_ok=True); names = sorted(set([p[0] + '.mp3' for p in P] + [bed + '.mp3'])); rows = []
    for n in names:
        m = by[n]; shutil.copy(LIB + '/' + m['file'], sfxdir + '/' + n)
        rows.append(f"| {n} | {m['title']} | {m['creator']} | {m['license']} {m.get('license_version','')} | {m['source_url']} |")
    open(sfxdir + '/CREDITS.md', 'w').write("# SFX credits (all CC0 1.0, from brand/sfx-library; CC0 needs no attribution, listed for source tracking)\n\nNo peel sticker sound exists in the CC0 library: paper swipes/slams and swooshes stand in for peels. Nothing here is a ripped meme clip.\n\n| file | title | creator | license | source |\n|---|---|---|---|---|\n" + "\n".join(rows) + "\n")
def mix(P, DUR, bed, voice, sfxdir, outwav, quiet=None, workdir='.', bedgain=1.0):
    ins = ["-i", voice] + sum([["-i", f"{sfxdir}/{f}.mp3"] for f, _, _, _ in P], []) + ["-stream_loop", "-1", "-i", f"{sfxdir}/{bed}.mp3"]
    qexp = ''
    if quiet:
        a0, b0 = quiet; qexp = f",volume=eval=frame:volume='1-0.97*clip((t-{a0})/0.5,0,1)*(1-clip((t-{b0})/0.9,0,1))'"
    fc = "[0:a]aresample=48000,pan=stereo|c0=c0|c1=c0,apad=whole_dur=%.2f,loudnorm=I=-16:TP=-2:LRA=11,aresample=48000,asplit[v][vk];" % DUR
    for i, (f, t, g, d) in enumerate(P, start=1):
        trim = f"atrim=0:{d},afade=t=out:st={max(0,d-.2)}:d=0.2," if d else ""
        fc += f"[{i}:a]aresample=48000,aformat=channel_layouts=stereo,{trim}volume={g},adelay={int(t*1000)}|{int(t*1000)}[s{i}];"
    fc += "".join(f"[s{i}]" for i in range(1, len(P) + 1)) + f"amix=inputs={len(P)}:normalize=0:duration=longest,apad=whole_dur={DUR},atrim=0:{DUR},volume=0.55{qexp}[fx];"
    k = len(P) + 1
    fc += f"[{k}:a]aresample=48000,aformat=channel_layouts=stereo,atrim=0:{DUR},loudnorm=I=-24:TP=-4:LRA=11,aresample=48000,volume={bedgain}[m];[m][vk]sidechaincompress=threshold=0.04:ratio=5:attack=15:release=350[md0];[md0]anull{qexp}[md];"
    fc += f"[v][fx][md]amix=inputs=3:normalize=0:duration=first,highpass=f=60,acompressor=threshold=-16dB:ratio=2.5:attack=10:release=200,afade=t=out:st={DUR-.5}:d=0.5,aresample=48000[pre]"
    r = subprocess.run(["ffmpeg", "-hide_banner", "-y", *ins, "-filter_complex", fc + ";[pre]loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json[o]", "-map", "[o]", "-f", "null", "-"], capture_output=True, text=True)
    open(workdir + "/err.txt", "w").write(r.stderr)
    j = json.loads(re.search(r"\{[^{}]*\"input_i\"[^{}]*\}", r.stderr, re.S).group(0))
    ln = f"loudnorm=I=-14:TP=-1.5:LRA=11:measured_I={j['input_i']}:measured_TP={j['input_tp']}:measured_LRA={j['input_lra']}:measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true"
    r = subprocess.run(["ffmpeg", "-hide_banner", "-y", *ins, "-filter_complex", fc + f";[pre]{ln},aresample=48000,alimiter=limit=0.84:level=false:attack=1:release=60[out]", "-map", "[out]", "-t", str(DUR), "-c:a", "pcm_s16le", outwav], capture_output=True, text=True)
    print(r.stderr[-300:] if r.returncode else "ok", j['input_i'], j['input_tp'])
