import subprocess
DUR = 42.0
# (file, at, dur, gain_dB, fade_in, fade_out)  — one-shots start at their first audible sample
FX = [("kaching",0.0,1.1,-4,0,.1),("coins",1.15,1.6,-8,0,.3),("notif",0.3,.4,-6,0,0),("notif",1.0,.4,-6,0,0),("notif",1.7,.4,-6,0,0),
("tapestop",2.25,.7,-4,0,.1),("glitch",2.6,.5,-3,0,.15),("static",2.62,.4,-10,0,.1),("boom2",2.75,1.8,-2,0,.5),
("flash",7.0,1.6,-3,0,.4),("deepwhoosh",8.55,1.2,-8,0,.3),("whoosh",9.3,.5,-6,0,0),("whoosh",10.1,.5,-8,0,0),("coins",10.6,1.6,-8,0,.4),
("crowd",12.3,4.3,-12,.4,.6),("thump",14.4,.7,-2,0,.1),
("tapestop",16.35,.6,-3,0,.1),("adding",16.9,1.0,-4,0,.2),("deepwhoosh",17.8,1.5,-6,0,.4),("heart",21.0,1.0,-6,0,.2),
("boom2",22.49,1.6,-4,0,.5),("gasps",22.5,1.8,-2,0,.5),("thump",23.3,.7,-3,0,.1),("whoosh",24.45,.5,-6,0,0),("coins",25.2,1.5,-9,0,.4),
("newspaper",27.1,1.2,-2,0,.3),("thump",27.8,.7,-6,0,.1),("crowd",29.15,1.75,-7,.1,.4),
("collapse",31.0,1.5,2,0,.4),("collapse",31.45,1.5,0,0,.4),("collapse",31.9,1.4,0,0,.4),
("deepwhoosh",32.35,1.2,-7,0,.3),("glitch",33.75,.4,-4,0,.1),("boom",33.8,2.5,-2,0,1.0),
("typing",35.15,1.5,-6,0,.2),("typeding",36.55,.9,-4,0,.2),("whoosh",36.85,.5,-6,0,0),
("coin1",39.3,.8,-4,0,.2),("coin1",39.55,.8,-4,0,.2),("coin1",39.8,.8,-4,0,.2),("thump",41.0,.7,-2,0,.1),
("glitch",41.6,.4,-5,0,.1),("notif",41.85,.4,-8,0,0)]
# beds: (file, at, dur, src_offset, gain_dB, fade_in, fade_out)
BEDS = [("piano",2.75,13.85,0,-4,.25,.12),("projector",2.75,39.25,5,-8,.6,.6),("crackle",2.75,26.0,0,-12,.5,.5),("crackle",28.0,14.0,0,-12,.5,.5),("drone",16.7,25.3,0,-2,1.0,.8)]
ins = ["-i","voice/narration.wav"]; fc = []
fc.append(f"[0:a]aresample=48000,pan=stereo|c0=c0|c1=c0,apad=whole_dur={DUR},loudnorm=I=-16:TP=-2:LRA=11,aresample=48000,asplit[v][vk]")
n = 1; fxl = []
for f,at,d,g,fi,fo in FX:
    ins += ["-i", f"sfx/{f}.mp3"]; ms = int(at*1000)
    chain = f"[{n}:a]aresample=48000,aformat=channel_layouts=stereo,silenceremove=start_periods=1:start_threshold=-45dB,atrim=0:{d},asetpts=PTS-STARTPTS"
    if fi: chain += f",afade=in:d={fi}"
    if fo: chain += f",afade=out:st={max(0,d-fo)}:d={fo}"
    fc.append(chain + f",volume={g}dB,adelay={ms}|{ms}[f{n}]"); fxl.append(f"[f{n}]"); n += 1
bedl = []
for f,at,d,off,g,fi,fo in BEDS:
    ins += ["-i", f"sfx/{f}.mp3"]; ms = int(at*1000)
    fc.append(f"[{n}:a]aresample=48000,aformat=channel_layouts=stereo,atrim={off}:{off+d},asetpts=PTS-STARTPTS,loudnorm=I=-24:TP=-6:LRA=15,aresample=48000,afade=in:d={fi},afade=out:st={d-fo}:d={fo},volume={g}dB,adelay={ms}|{ms}[b{n}]"); bedl.append(f"[b{n}]"); n += 1
fc.append("".join(fxl) + f"amix=inputs={len(fxl)}:normalize=0:duration=longest,apad=whole_dur={DUR},atrim=0:{DUR},volume=-3dB[fx]")
fc.append("".join(bedl) + f"amix=inputs={len(bedl)}:normalize=0:duration=longest,apad=whole_dur={DUR},atrim=0:{DUR}[bed]")
fc.append("[bed][vk]sidechaincompress=threshold=0.04:ratio=5:attack=15:release=350[bd]")
fc.append("[v][fx][bd]amix=inputs=3:normalize=0:duration=first,highpass=f=60,acompressor=threshold=-16dB:ratio=2.5:attack=10:release=200,loudnorm=I=-14:TP=-1.5:LRA=11,aresample=192000,alimiter=limit=0.8:level=false:attack=1:release=60,aresample=48000[out]")
subprocess.run(["ffmpeg","-hide_banner","-loglevel","error","-y",*ins,"-filter_complex",";".join(fc),"-map","[out]","-t",str(DUR),"-c:a","pcm_s16le","build/mix.wav"],check=True)
