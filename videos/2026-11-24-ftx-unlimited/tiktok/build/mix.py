import subprocess, json, re, sys
DUR = 35.72
P = [["glitch_1", 0.0, 0.8, None], ["deep_boom_1", 0.0, 0.9, 2.5], ["swoosh_2", 1.97, 0.5, None], ["swipe_1", 3.47, 0.5, None], ["whoosh_2", 5.17, 0.5, None], ["swoosh_2", 6.97, 0.5, None], ["swipe_1", 8.97, 0.5, None], ["whoosh_2", 10.57, 0.5, None], ["swoosh_2", 12.370000000000001, 0.5, None], ["swipe_1", 14.67, 0.5, None], ["whoosh_2", 16.869999999999997, 0.5, None], ["swoosh_2", 18.869999999999997, 0.5, None], ["swipe_1", 20.97, 0.5, None], ["whoosh_2", 22.77, 0.5, None], ["swoosh_2", 24.27, 0.5, None], ["swipe_1", 25.97, 0.5, None], ["whoosh_2", 27.369999999999997, 0.5, None], ["swoosh_2", 32.92, 0.5, None], ["rubber_stamp_2", 2.55, 0.8, None], ["sub_drop_1", 2.55, 0.6, 1.2], ["rubber_stamp_2", 5.3, 0.8, None], ["pop_2", 6.6, 0.6, None], ["rubber_stamp_2", 6.6, 0.5, None], ["pop_2", 9.0, 0.5, None], ["money_counter_1", 8.7, 0.5, 1.0], ["pop_2", 9.5, 0.6, None], ["coins_drop_2", 10.9, 0.5, None], ["rubber_stamp_2", 11.46, 0.8, None], ["glitch_1", 12.92, 0.6, None], ["sub_drop_1", 12.92, 0.7, 1.5], ["rubber_stamp_2", 13.88, 0.9, None], ["click_1", 15.76, 0.4, 0.3], ["keyboard_typing_2", 17.0, 0.5, None], ["keyboard_typing_2", 17.35, 0.5, None], ["keyboard_typing_2", 17.7, 0.5, None], ["keyboard_typing_2", 18.05, 0.5, None], ["money_counter_1", 19.2, 0.7, 1.1], ["deep_boom_1", 20.26, 1.0, 2.5], ["cinematic_hit_1", 20.26, 0.6, 2.5], ["alarm_2", 21.44, 0.6, None], ["glitch_1", 21.44, 0.5, None], ["rubber_stamp_2", 22.04, 0.8, None], ["sub_drop_1", 23.46, 0.8, 1.5], ["rubber_stamp_2", 23.46, 1.0, None], ["deep_boom_2", 23.46, 0.7, None], ["gavel_2", 24.6, 1.0, 2.0], ["rubber_stamp_2", 24.62, 0.6, None], ["rubber_stamp_2", 25.4, 0.9, None], ["cell_door_2", 26.1, 0.9, 2.5], ["rubber_stamp_2", 26.32, 0.9, None], ["pop_2", 27.55, 0.6, None], ["ding_1", 28.48, 0.5, None], ["pop_2", 29.6, 0.6, None], ["pop_2", 31.7, 0.4, None], ["pop_2", 31.9, 0.4, None], ["pop_2", 32.1, 0.4, None], ["pop_2", 32.3, 0.4, None], ["click_1", 33.4, 0.5, 0.3], ["ding_1", 34.05, 0.6, None], ["notification_chime_2", 34.05, 0.4, None], ["rubber_stamp_2", 33.6, 0.6, None], ["glitch_1", 35.4, 0.6, None]]
BED = "tense_bed_1"
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
