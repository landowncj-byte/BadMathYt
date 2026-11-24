import subprocess
DUR = 42.2
FX = [("boom",0.42,1.8,-2,0,.5),("boom",0.72,1.8,-3,0,.5),("pop",1.0,.2,-6,0,0),("whoosh",2.35,.5,-6,0,0),("press",2.42,.3,-2,0,0),("latch",2.6,.8,-4,0,.2),
("kaching",2.85,1.1,-3,0,.2),("whoosh",4.83,.5,-6,0,0),("press",4.92,.3,-2,0,0),
("flip",5.5,.4,-6,0,0),("flip",5.75,.4,-7,0,0),("flip",6.0,.4,-6,0,0),("flip",6.25,.4,-7,0,0),("flip",6.5,.4,-6,0,0),("flip",6.75,.4,-7,0,0),("flip",7.0,.4,-6,0,0),("flip",7.25,.4,-7,0,0),
("coins",5.6,3.4,-10,0,.6),("pop",8.2,.2,-4,0,0),("whoosh",9.23,.5,-6,0,0),("buzzer",10.45,.35,-6,0,.05),("whoosh",11.6,.5,-6,0,0),
("riser",12.9,2.0,-8,.2,.1),("ding",14.95,.5,-2,0,.1),("bell",18.7,1.6,-4,0,.4),
("scratch",19.62,1.0,-1,0,.2),("deepwhoosh",19.9,1.2,-8,0,.3),("coins",21.0,2.4,-11,0,.5),("whoosh",23.6,.5,-6,0,0),("ooh",26.85,1.6,-4,0,.6),
("whoosh",27.97,.5,-6,0,0),("pop",28.7,.2,-4,0,0),("riser",31.4,2.4,-9,.3,.2),("buzzer",34.4,.35,-5,0,.05),
("whoosh",36.34,.5,-6,0,0),("tick",36.36,1.5,-3,0,.1),("drumroll",36.4,1.4,-8,.1,.2),("pop",37.85,.2,-3,0,0),("applause",38.0,2.2,-12,0,1.0),("whoosh",41.7,.5,-6,0,0)]
BEDS = [("pizz",0.0,19.75,0,-3,.05,.1),("hiphop",20.0,16.35,0,-4,.4,.3),("pizz",37.8,4.4,0,-5,.3,.4)]
ins = ["-i","voice/narration.wav"]; fc = [f"[0:a]aresample=48000,pan=stereo|c0=c0|c1=c0,apad=whole_dur={DUR},loudnorm=I=-16:TP=-2:LRA=11,aresample=48000,asplit[v][vk]"]
n = 1; fxl = []; bl = []
for f,at,d,g,fi,fo in FX:
    ins += ["-i", f"sfx/{f}.mp3"]; ms = int(at*1000)
    ch = f"[{n}:a]aresample=48000,aformat=channel_layouts=stereo,silenceremove=start_periods=1:start_threshold=-45dB,atrim=0:{d},asetpts=PTS-STARTPTS"
    if fi: ch += f",afade=in:d={fi}"
    if fo: ch += f",afade=out:st={max(0,d-fo)}:d={fo}"
    fc.append(ch + f",volume={g}dB,adelay={ms}|{ms}[f{n}]"); fxl.append(f"[f{n}]"); n += 1
for f,at,d,off,g,fi,fo in BEDS:
    ins += ["-i", f"sfx/{f}.mp3"]; ms = int(at*1000)
    fc.append(f"[{n}:a]aresample=48000,aformat=channel_layouts=stereo,atrim={off}:{off+d},asetpts=PTS-STARTPTS,loudnorm=I=-24:TP=-6:LRA=15,aresample=48000,afade=in:d={fi},afade=out:st={d-fo}:d={fo},volume={g}dB,adelay={ms}|{ms}[b{n}]"); bl.append(f"[b{n}]"); n += 1
fc.append("".join(fxl) + f"amix=inputs={len(fxl)}:normalize=0:duration=longest,apad=whole_dur={DUR},atrim=0:{DUR},volume=-3dB[fx]")
fc.append("".join(bl) + f"amix=inputs={len(bl)}:normalize=0:duration=longest,apad=whole_dur={DUR},atrim=0:{DUR}[bed]")
fc.append("[bed][vk]sidechaincompress=threshold=0.04:ratio=5:attack=15:release=350[bd]")
fc.append("[v][fx][bd]amix=inputs=3:normalize=0:duration=first,highpass=f=60,acompressor=threshold=-16dB:ratio=2.5:attack=10:release=200,loudnorm=I=-14:TP=-1.5:LRA=11,aresample=192000,alimiter=limit=0.8:level=false:attack=1:release=60,aresample=48000[out]")
subprocess.run(["ffmpeg","-hide_banner","-loglevel","error","-y",*ins,"-filter_complex",";".join(fc),"-map","[out]","-t",str(DUR),"-c:a","pcm_s16le","build/mix.wav"],check=True)
