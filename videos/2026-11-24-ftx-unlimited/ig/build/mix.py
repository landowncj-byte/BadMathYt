import subprocess, json, re, sys
DUR = 20.28
P = [["glitch_1", 0.0, 0.8, None], ["deep_boom_1", 0.0, 0.9, 2.5], ["swoosh_2", 1.52, 0.5, None], ["swipe_1", 3.4200000000000004, 0.5, None], ["whoosh_2", 5.12, 0.5, None], ["swoosh_2", 7.069999999999999, 0.5, None], ["swipe_1", 9.32, 0.5, None], ["whoosh_2", 10.47, 0.5, None], ["swoosh_2", 12.770000000000001, 0.5, None], ["swipe_1", 13.57, 0.5, None], ["whoosh_2", 15.92, 0.5, None], ["rubber_stamp_2", 1.58, 0.8, None], ["rubber_stamp_2", 2.36, 0.9, None], ["pop_2", 2.8, 0.6, None], ["coins_drop_2", 3.9, 0.6, None], ["pop_2", 5.26, 0.6, None], ["pop_2", 6.4, 0.6, None], ["money_counter_1", 7.5, 0.5, 1.2], ["glitch_1", 8.72, 0.7, None], ["sub_drop_1", 8.72, 0.7, 1.5], ["rubber_stamp_2", 9.54, 1.0, None], ["deep_boom_2", 9.54, 0.7, None], ["rubber_stamp_2", 9.9, 0.7, None], ["deep_boom_1", 10.72, 1.0, 2.5], ["cinematic_hit_1", 10.72, 0.6, 2.5], ["coins_drop_1", 11.6, 0.5, None], ["rubber_stamp_2", 12.84, 0.9, None], ["sub_drop_1", 12.84, 0.8, 1.5], ["sad_trombone_1", 13.0, 0.5, 2.0], ["cell_door_2", 13.64, 0.9, 2.5], ["gavel_2", 13.64, 1.0, 2.0], ["rubber_stamp_2", 14.0, 0.9, None], ["rubber_stamp_2", 14.7, 1.0, None], ["deep_boom_2", 14.7, 0.7, None], ["swipe_1", 16.35, 0.7, None], ["pop_2", 17.35, 0.6, None], ["notification_chime_2", 17.35, 0.5, None], ["pop_2", 18.5, 0.5, None], ["swipe_1", 18.9, 0.6, None], ["glitch_1", 20.0, 0.6, None]]
BED = "tense_bed_2"
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
r = subprocess.run(["ffmpeg","-hide_banner","-y",*ins,"-filter_complex",fc+";[pre]loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json[o]","-map","[o]","-f","None","-"],capture_output=True,text=True)
open("build/err.txt","w").write(r.stderr);j = json.loads(re.search(r"\{[^{}]*\"input_i\"[^{}]*\}", r.stderr, re.S).group(0))
ln = f"loudnorm=I=-14:TP=-1.5:LRA=11:measured_I={j['input_i']}:measured_TP={j['input_tp']}:measured_LRA={j['input_lra']}:measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true"
r = run(f";[pre]{ln},aresample=48000,alimiter=limit=0.76:level=false:attack=1:release=60[out]")
print(r.stderr[-300:] if r.returncode else "ok", j['input_i'], j['input_tp'])
