import subprocess, json, re, sys
DUR = 17.77
P = [['glitch_1', 0, 0.8, None], ['deep_boom_1', 0, 0.9, 2.5], ['rubber_stamp_2', 0.08, 0.9, None], ['airhorn_1', 0.1, 0.25, 1.0], ['swoosh_2', 2.38, 0.5, None], ['money_counter_1', 2.45, 0.5, 1.5], ['coins_drop_1', 3.5, 0.6, None], ['cash_register_1', 3.9, 0.8, None], ['swipe_1', 4.28, 0.5, None], ['pop_2', 4.4, 0.5, None], ['riser_1', 4.6, 0.4, 1.0], ['rubber_stamp_1', 6.3, 0.8, None], ['rimshot_1', 6.4, 0.5, None], ['whoosh_2', 6.88, 0.5, None], ['deep_boom_1', 7.2, 1.0, 2.5], ['glitch_1', 7.2, 0.8, None], ['sub_drop_1', 7.2, 0.8, 1.5], ['cinematic_hit_1', 7.22, 0.5, 2.0], ['rubber_stamp_2', 8.0, 0.9, None], ['deep_boom_2', 8.0, 0.6, None], ['swipe_1', 8.48, 0.5, None], ['money_counter_1', 8.6, 0.4, 1.0], ['success_chime_1', 9.5, 0.6, None], ['ding_1', 9.5, 0.5, None], ['swoosh_2', 10.08, 0.5, None], ['paper_slam_1', 10.2, 0.8, None], ['rubber_stamp_1', 11.16, 0.9, None], ['deep_boom_2', 11.16, 0.8, None], ['glitch_1', 11.16, 0.5, None], ['airhorn_1', 11.2, 0.2, 1.0], ['swipe_1', 12.08, 0.5, None], ['cell_door_2', 12.16, 0.9, 2.5], ['deep_boom_1', 12.16, 0.6, 1.5], ['rubber_stamp_2', 12.3, 0.9, None], ['rubber_stamp_1', 12.9, 0.9, None], ['swoosh_2', 13.78, 0.5, None], ['pop_2', 13.9, 0.5, None], ['pop_2', 14.45, 0.5, None], ['pop_2', 14.6, 0.5, None], ['deep_boom_2', 14.6, 0.4, None], ['swoosh_2', 14.9, 0.6, None], ['notification_chime_2', 15.9, 0.5, None], ['pop_1', 15.9, 0.5, None], ['pop_2', 16.7, 0.5, None], ['rimshot_1', 16.8, 0.4, None], ['glitch_1', 17.37, 0.6, None]]
BED = "upbeat_bed_1"
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
