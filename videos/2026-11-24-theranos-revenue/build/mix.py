import subprocess, json, re
DUR = 54.08
# (file, time_s, gain, max_dur, extra_filter) every effect lands on an on-screen hit
P = [("glitch_1",0.0,.8,None,""),("deep_boom_1",0.0,.9,2.5,""),("rubber_stamp_2",0.9,.8,None,""),("swoosh_2",2.05,.4,None,""),("pop_2",2.3,.5,None,""),("pop_2",2.52,.5,None,""),("money_counter_1",3.86,.4,1.0,""),
("deep_boom_1",5.92,1.0,2.5,""),("glitch_1",5.92,.8,None,""),("sub_drop_1",5.92,.8,1.5,""),("cinematic_hit_1",5.94,.5,2.0,""),("rubber_stamp_2",6.3,.8,None,""),
("cinematic_hit_1",7.66,.7,2.0,""),("whoosh_2",7.58,.5,None,""),("swoosh_2",9.1,.5,None,""),("swoosh_2",10.3,.4,None,""),
("pop_2",12.08,.9,.25,"asetrate=76800,aresample=48000,lowpass=f=4000"),("thud_1",12.1,.35,None,""),("ding_1",13.4,.6,None,""),
("swoosh_2",14.28,.4,None,""),("coins_drop_1",14.5,.8,None,""),("money_counter_1",14.5,.5,1.6,""),("coins_drop_2",15.0,.6,None,""),("coins_drop_1",15.5,.6,None,""),("cash_register_1",16.0,.8,None,""),
("riser_1",17.5,.7,1.7,""),("success_chime_1",19.12,.6,None,""),("ding_1",19.14,.5,None,""),("glitch_1",19.12,.4,None,""),
("paper_slam_1",20.42,.9,None,""),("swoosh_2",20.3,.4,None,""),
("pop_1",24.42,.6,None,""),("notification_chime_2",24.5,.4,None,""),("pop_1",25.1,.4,None,""),("pop_1",25.8,.4,None,""),
("deep_boom_2",26.66,.9,None,""),("glitch_1",26.66,.6,None,""),("rubber_stamp_1",26.8,.9,None,""),
("swoosh_2",27.55,.5,None,""),("paper_slam_1",27.88,1.0,None,""),("fail_buzzer_1",29.64,.35,1.0,""),("pop_2",30.28,.5,None,""),
("swipe_1",31.85,.6,None,""),("thud_1",32.6,.5,None,""),("pop_2",33.7,.6,None,""),("thud_1",33.75,.5,None,""),("pop_2",34.3,.5,None,""),
("swipe_1",35.96,.7,None,""),("pop_2",36.9,.5,None,""),("ding_1",36.95,.4,None,""),
("whoosh_2",39.4,.5,None,""),("paper_slam_2",40.0,.7,None,""),("rubber_stamp_2",40.18,1.0,None,""),("deep_boom_2",40.18,.8,None,""),("glitch_1",40.18,.5,None,""),
("click_1",43.1,.5,.3,""),("click_1",43.85,.5,.3,""),("ding_1",43.95,.6,None,""),("notification_chime_2",43.95,.4,None,""),("swoosh_2",44.08,.5,None,""),
("swipe_1",45.95,.4,None,""),("gavel_2",46.18,1.0,2.0,""),("deep_boom_2",46.18,.6,None,""),("rubber_stamp_2",46.92,.9,None,""),("rubber_stamp_1",47.88,1.0,None,""),
("swoosh_2",49.2,.5,None,""),("cell_door_2",49.5,.9,2.5,""),("deep_boom_1",49.5,.5,1.5,""),
("swoosh_2",50.35,.5,None,""),("rubber_stamp_2",51.08,.7,None,""),("swoosh_2",52.1,.4,None,""),("rubber_stamp_1",52.95,.9,None,""),("deep_boom_2",53.0,.6,None,""),("glitch_1",53.72,.6,None,"")]
ins = ["-i","voice/narration.wav"] + sum([["-i",f"sfx/{f}.mp3"] for f,_,_,_,_ in P],[]) + ["-i","sfx/tense_bed_2.mp3"]
fc = "[0:a]aresample=48000,pan=stereo|c0=c0|c1=c0,apad=whole_dur=%.2f,loudnorm=I=-16:TP=-2:LRA=11,aresample=48000,asplit[v][vk];" % DUR
for i,(f,t,g,d,ex) in enumerate(P, start=1):
    trim = f"atrim=0:{d},afade=t=out:st={max(0,d-.2)}:d=0.2," if d else ""
    exf = ex+"," if ex else ""
    fc += f"[{i}:a]aresample=48000,{exf}aformat=channel_layouts=stereo,{trim}volume={g},adelay={int(t*1000)}|{int(t*1000)}[s{i}];"
fc += "".join(f"[s{i}]" for i in range(1,len(P)+1)) + f"amix=inputs={len(P)}:normalize=0:duration=longest,apad=whole_dur={DUR},atrim=0:{DUR},volume=0.55[fx];"
k = len(P)+1
fc += f"[{k}:a]aresample=48000,aformat=channel_layouts=stereo,atrim=0:{DUR},loudnorm=I=-24:TP=-4:LRA=11,aresample=48000[m];[m][vk]sidechaincompress=threshold=0.04:ratio=5:attack=15:release=350[md];"
fc += f"[v][fx][md]amix=inputs=3:normalize=0:duration=first,highpass=f=60,acompressor=threshold=-16dB:ratio=2.5:attack=10:release=200,afade=t=out:st={DUR-.6}:d=0.6,aresample=48000[pre]"
def run(extra):
    return subprocess.run(["ffmpeg","-hide_banner","-y",*ins,"-filter_complex",fc+extra,"-map","[out]","-t",str(DUR),"-c:a","pcm_s16le","build/mix.wav"],capture_output=True,text=True)
r = subprocess.run(["ffmpeg","-hide_banner","-y",*ins,"-filter_complex",fc+";[pre]loudnorm=I=-14:TP=-2.2:LRA=11:print_format=json[o]","-map","[o]","-f","null","-"],capture_output=True,text=True)
open("build/err.txt","w").write(r.stderr);j = json.loads(re.search(r"\{[^{}]*\"input_i\"[^{}]*\}", r.stderr, re.S).group(0))
ln = f"loudnorm=I=-14:TP=-2.2:LRA=11:measured_I={j['input_i']}:measured_TP={j['input_tp']}:measured_LRA={j['input_lra']}:measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true"
r = run(f";[pre]{ln},aresample=48000,alimiter=limit=0.76:level=false:attack=1:release=60[out]")
print(r.stderr[-300:] if r.returncode else "ok", j['input_i'], j['input_tp'])
