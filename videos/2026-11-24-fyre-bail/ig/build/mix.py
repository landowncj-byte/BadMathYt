import subprocess, json, re
DUR = 18.58
P = [('deep_boom_2', 0.0, 0.95, None), ('glitch_1', 0, 0.6, None), ('thud_1', 0.02, 0.8, 1.0), ('rubber_stamp_2', 0.05, 0.9, None), ('swipe_1', 2.27, 0.6, None), ('paper_slam_1', 2.5, 0.6, None), ('pop_2', 3.0, 0.5, None), ('whoosh_2', 3.67, 0.5, None), ('money_counter_1', 3.76, 0.4, 1.0), ('cash_register_1', 4.62, 0.8, None), ('thud_2', 4.62, 0.6, None), ('pop_2', 4.9, 0.5, None), ('swoosh_2', 5.17, 0.5, None), ('pop_2', 5.7, 0.5, None), ('deep_boom_1', 6.0, 0.95, 2.0), ('glass_shatter_2', 6.05, 0.4, 0.9), ('rubber_stamp_2', 6.9, 0.8, None), ('swipe_1', 7.67, 0.5, None), ('cell_door_2', 7.86, 0.9, 1.2), ('rubber_stamp_2', 8.5, 1.0, None), ('gavel_2', 8.5, 0.7, 1.5), ('whoosh_2', 9.37, 0.5, None), ('rubber_stamp_2', 9.72, 0.8, None), ('rubber_stamp_2', 10.1, 0.8, None), ('rubber_stamp_2', 10.46, 0.8, None), ('wrong_buzzer_2', 10.46, 0.3, None), ('swoosh_2', 10.97, 0.5, None), ('rubber_stamp_2', 11.0, 1.0, None), ('deep_boom_2', 11.0, 0.7, None), ('rubber_stamp_2', 11.52, 1.0, None), ('alarm_1', 11.6, 0.3, 1.0), ('swipe_1', 12.27, 0.5, None), ('pop_2', 12.6, 0.5, None), ('rimshot_1', 12.74, 0.9, None), ('rubber_stamp_2', 12.74, 0.8, None), ('whoosh_2', 13.57, 0.5, None), ('cell_door_1', 13.68, 0.9, 2.0), ('thud_1', 13.68, 0.9, None), ('deep_boom_2', 13.68, 0.7, None), ('rubber_stamp_2', 13.95, 1.0, None), ('rubber_stamp_2', 14.52, 0.8, None), ('swipe_1', 15.27, 0.5, None), ('whoosh_1', 15.42, 0.4, 1.5), ('pop_2', 15.8, 0.5, None), ('swoosh_2', 16.87, 0.5, None), ('pop_2', 17.0, 0.5, None), ('paper_slam_1', 17.1, 0.6, None), ('notification_chime_1', 17.6, 0.5, 1.2), ('success_chime_1', 17.85, 0.4, 1.0), ('glitch_1', 18.28, 0.8, None)]
BED = 'upbeat_bed_2'
ins = ["-i","voice/narration.wav"] + sum([["-i",f"sfx/{f}.mp3"] for f,_,_,_ in P],[]) + ["-i","sfx/"+BED+".mp3"]
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
r = subprocess.run(["ffmpeg","-hide_banner","-y",*ins,"-filter_complex",fc+";[pre]loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json[o]","-map","[o]","-f","null","-"],capture_output=True,text=True)
open("build/err.txt","w").write(r.stderr);j = json.loads(re.search(r"\{[^{}]*\"input_i\"[^{}]*\}", r.stderr, re.S).group(0))
ln = f"loudnorm=I=-14:TP=-1.5:LRA=11:measured_I={j['input_i']}:measured_TP={j['input_tp']}:measured_LRA={j['input_lra']}:measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true"
r = run(f";[pre]{ln},aresample=48000,alimiter=limit=0.76:level=false:attack=1:release=60[out]")
print(r.stderr[-300:] if r.returncode else "ok", j['input_i'], j['input_tp'])
