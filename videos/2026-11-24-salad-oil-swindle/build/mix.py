import subprocess, sys
DUR = 42.6
# (file, time_s, gain) — every effect lands on an on-screen hit
P = [("oil_pour",0.0,.55),("glitch_boom",2.40,1.0),("whoosh",3.18,.6),("typewriter",3.3,.45),("typewriter",5.0,.4),("whoosh",6.4,.45),
("whoosh",7.8,.6),("stamp",9.42,.95),("whoosh",10.05,.5),("whoosh",11.43,.5),("underwater",13.65,.85),("whoosh",15.2,.5),
("pipes",16.9,.6),("pipes",19.3,.5),("stamp",17.35,.4),("stamp",18.55,.45),("stamp",19.75,.5),("stamp",20.95,.55),
("whoosh",22.2,.5),("stamp",26.95,.95),("whoosh",27.45,.5),("oil_pour",28.0,.4),("whoosh",29.7,.5),("glass_shatter",30.75,.95),
("whoosh",31.45,.4),("glitch_boom",35.12,.8),("cell_door",35.75,.9),("stamp",37.3,.5),("stamp",38.2,.6),("whoosh",38.6,.5),("stamp",41.0,.85),("oil_pour",42.05,.35)]
music = sys.argv[1] if len(sys.argv) > 1 else None
ins = ["-i","voice/narration_edit.wav"] + sum([["-i",f"sfx/{f}.mp3"] for f,_,_ in P],[])
if music: ins += ["-i", music]
fc = "[0:a]aresample=48000,pan=stereo|c0=c0|c1=c0,apad=whole_dur=%.2f,loudnorm=I=-16:TP=-2:LRA=11,aresample=48000,asplit[v][vk];" % DUR
for i,(f,t,g) in enumerate(P, start=1):
    fc += f"[{i}:a]aresample=48000,aformat=channel_layouts=stereo,volume={g},adelay={int(t*1000)}|{int(t*1000)}[s{i}];"
fc += "".join(f"[s{i}]" for i in range(1,len(P)+1)) + f"amix=inputs={len(P)}:normalize=0:duration=longest,apad=whole_dur={DUR},atrim=0:{DUR},volume=0.55[fx];"
mixins = "[v][fx]"; n = 2
if music:
    k = len(P)+1
    fc += f"[{k}:a]aresample=48000,aformat=channel_layouts=stereo,atrim=0:{DUR},loudnorm=I=-24:TP=-4:LRA=11,aresample=48000[m];[m][vk]sidechaincompress=threshold=0.04:ratio=5:attack=15:release=350[md];"
    mixins += "[md]"; n = 3
else:
    fc += "[vk]anullsink;"
fc += f"{mixins}amix=inputs={n}:normalize=0:duration=first,highpass=f=60,acompressor=threshold=-16dB:ratio=2.5:attack=10:release=200,loudnorm=I=-14:TP=-1.5:LRA=11,aresample=192000,alimiter=limit=0.84:level=false:attack=1:release=60,aresample=48000[out]"
subprocess.run(["ffmpeg","-hide_banner","-loglevel","error","-y",*ins,"-filter_complex",fc,"-map","[out]","-t",str(DUR),"-c:a","pcm_s16le","build/mix.wav"],check=True)
