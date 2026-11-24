import subprocess, json, re
DUR = 46.8
# (file, time_s, gain, max_dur) every effect lands on an on-screen hit
P = [("glitch_1",0.0,.8,None),("deep_boom_1",0.0,.9,2.5),("rubber_stamp_2",0.86,.8,None),("rubber_stamp_2",2.88,.9,None),("whoosh_2",3.95,.5,None),("keyboard_typing_2",4.1,.5,None),("keyboard_typing_2",4.45,.5,None),("keyboard_typing_2",4.8,.5,None),("keyboard_typing_2",5.15,.5,None),
("swoosh_2",5.62,.5,None),("pop_2",5.78,.6,None),("money_counter_1",7.7,.5,1.2),("coins_drop_2",8.62,.6,None),("swoosh_2",9.72,.5,None),("pop_2",10.44,.6,None),("swoosh_2",12.88,.5,None),
("coins_drop_2",13.3,.5,None),("swoosh_2",14.45,.5,None),("money_counter_1",14.9,.5,1.3),("glitch_1",16.14,.8,None),("sub_drop_1",16.14,.7,1.5),("rubber_stamp_2",17.4,.9,None),
("swoosh_2",18.33,.5,None),("pop_2",18.58,.7,None),("swoosh_2",20.43,.5,None),("click_1",22.34,.3,.25),("click_1",22.75,.3,.25),("click_1",23.15,.3,.25),("click_1",23.55,.3,.25),
("swoosh_2",24.33,.5,None),("money_counter_1",25.3,.8,2.4),("riser_1",25.98,.7,1.7),("deep_boom_1",27.68,1.0,2.5),("cinematic_hit_1",27.68,.6,2.5),("swoosh_2",29.03,.5,None),
("coins_drop_1",30.08,.8,None),("swipe_1",31.24,.7,None),("whoosh_2",34.72,.5,None),("alarm_2",35.26,.7,None),("alarm_1",35.3,.4,1.6),("glitch_1",35.26,.7,None),
("sub_drop_1",36.34,.8,None),("rubber_stamp_2",37.26,1.0,None),("deep_boom_2",37.26,.7,None),("rubber_stamp_2",37.45,.5,None),("swoosh_2",38.32,.5,None),("click_1",39.15,.5,.3),("ding_1",39.35,.6,None),
("gavel_2",41.3,1.0,2.0),("rubber_stamp_2",41.32,.6,None),("rubber_stamp_2",42.28,.9,None),("pop_2",42.0,.5,None),("notification_chime_2",42.0,.4,None),("cell_door_2",42.98,.9,2.5),("rubber_stamp_2",42.98,.8,None),
("swoosh_2",44.42,.5,None),("glitch_1",46.45,.6,None)]
ins = ["-i","voice/narration.wav"] + sum([["-i",f"sfx/{f}.mp3"] for f,_,_,_ in P],[]) + ["-i","sfx/tense_bed_2.mp3"]
fc = "[0:a]aresample=48000,pan=stereo|c0=c0|c1=c0,apad=whole_dur=%.2f,loudnorm=I=-16:TP=-2:LRA=11,aresample=48000,asplit[v][vk];" % DUR
for i,(f,t,g,d) in enumerate(P, start=1):
    trim = f"atrim=0:{d},afade=t=out:st={max(0,d-.2)}:d=0.2," if d else ""
    fc += f"[{i}:a]aresample=48000,aformat=channel_layouts=stereo,{trim}volume={g},adelay={int(t*1000)}|{int(t*1000)}[s{i}];"
fc += "".join(f"[s{i}]" for i in range(1,len(P)+1)) + f"amix=inputs={len(P)}:normalize=0:duration=longest,apad=whole_dur={DUR},atrim=0:{DUR},volume=0.55[fx];"
k = len(P)+1
fc += f"[{k}:a]aresample=48000,aformat=channel_layouts=stereo,atrim=0:{DUR},loudnorm=I=-24:TP=-4:LRA=11,aresample=48000[m];[m][vk]sidechaincompress=threshold=0.04:ratio=5:attack=15:release=350[md];"
fc += f"[v][fx][md]amix=inputs=3:normalize=0:duration=first,highpass=f=60,acompressor=threshold=-16dB:ratio=2.5:attack=10:release=200,afade=t=out:st={DUR-.6}:d=0.6,aresample=48000[pre]"
def run(extra):
    return subprocess.run(["ffmpeg","-hide_banner","-y",*ins,"-filter_complex",fc+extra,"-map","[out]","-t",str(DUR),"-c:a","pcm_s16le","build/mix.wav"],capture_output=True,text=True)
# pass 1: measure
r = subprocess.run(["ffmpeg","-hide_banner","-y",*ins,"-filter_complex",fc+";[pre]loudnorm=I=-14:TP=-2.2:LRA=11:print_format=json[o]","-map","[o]","-f","null","-"],capture_output=True,text=True)
open("build/err.txt","w").write(r.stderr);j = json.loads(re.search(r"\{[^{}]*\"input_i\"[^{}]*\}", r.stderr, re.S).group(0))
ln = f"loudnorm=I=-14:TP=-2.2:LRA=11:measured_I={j['input_i']}:measured_TP={j['input_tp']}:measured_LRA={j['input_lra']}:measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true"
r = run(f";[pre]{ln},aresample=48000,alimiter=limit=0.76:level=false:attack=1:release=60[out]")
print(r.stderr[-300:] if r.returncode else "ok", j['input_i'], j['input_tp'])
