import subprocess,json,re
DUR=50.1
# (file, at, dur, gain_dB, fade_in, fade_out, src_offset)
FX=[("deep_boom_1",0.0,1.6,-3,0,.5,0),("rubber_stamp_2",0.24,.5,-3,0,0,0),("glitch_1",0.02,.4,-9,0,0,0),
("swoosh_2",2.55,.9,-4,0,.2,0),("paper_rustle",2.6,2.2,-9,.05,.8,3),("explosion_small_2",2.62,.9,-8,0,.3,0),
("money_counter_1",3.8,.4,-9,0,.05,0),("deep_boom_1",4.16,1.8,-3,0,.6,0),("paper_slam_2",4.17,.5,-8,0,0,0),
("pop_2",5.68,.3,-6,0,0,0),("swipe_2",7.0,.5,-8,0,0,0),("money_counter_1",7.54,2.4,-10,.1,.3,0),("ding_2",9.98,.7,-5,0,.1,0),("deep_boom_2",9.98,.36,-8,0,0,0),
("pop_2",11.58,.3,-4,0,0,0),("coin_single_1",11.62,.8,-8,0,.2,0),
("cash_register_1",13.66,1.0,-4,0,.1,0),("whoosh_2",14.2,.5,-8,0,0,0),("swoosh_2",15.64,.9,-9,0,.2,0),("success_chime_1",16.6,.9,-4,0,.1,0),
("rubber_stamp_2",17.44,.6,-2,0,0,0),("deep_boom_2",17.44,.36,-6,0,0,0),
("notification_chime_2",19.02,1.5,-9,0,.3,0),("coin_single_1",19.2,.8,-12,0,.2,0),("coin_single_1",19.7,.8,-12,0,.2,0),
("clock_ticking_2",20.7,2.0,-6,0,.05,0),("fail_buzzer_2",22.7,.47,-4,0,0,0),("thud_1",22.7,.8,-8,0,.2,0),("thud_1",25.9,.8,-6,0,.2,0),("deep_boom_2",25.9,.36,-8,0,0,0),
("swoosh_2",26.72,.9,-6,0,.2,0),("wrong_buzzer_1",29.2,1.1,-4,0,.1,0),
("click_1",30.95,.3,-4,0,0,0),("pop_2",30.2,.3,-8,0,0,0),
("ball_pop",32.80,.4,-3,0,.05,0),("pingpong",32.80,.3,-8,0,0,0),("ball_pop",32.94,.4,-3,0,.05,0),("pingpong",32.94,.3,-8,0,0,0),
("ball_pop",33.50,.4,-3,0,.05,0),("pingpong",33.50,.3,-8,0,0,0),("ball_pop",33.92,.4,-3,0,.05,0),("pingpong",33.92,.3,-8,0,0,0),
("ball_pop",34.40,.4,-3,0,.05,0),("pingpong",34.40,.3,-8,0,0,0),("ball_pop",35.00,.4,-1,0,.05,0),("pingpong",35.00,.3,-6,0,0,0),
("heartbeat_2",32.3,3.2,-6,.5,.2,0),("riser_2",33.9,1.8,-14,.3,.1,0),
("airhorn_1",35.92,1.6,-8,0,.3,0),("cheer_1",35.92,2.6,-9,0,1.0,0),("confetti_pop",35.92,.4,-6,0,0,0),("confetti_pop",36.74,.4,-8,0,0,0),("cash_register_1",36.74,1.0,-4,0,.1,0),
("whoosh_2",38.5,.5,-8,0,0,0),("swipe_2",39.4,.5,-8,0,0,0),("money_counter_1",39.55,.6,-10,0,.1,0),("ding_2",40.1,.7,-6,0,.1,0),
("printer",42.98,3.4,-8,.05,.4,0),("whoosh_2",42.8,.5,-9,0,0,0),
("pop_2",44.2,.2,-10,0,0,0),("pop_2",44.3,.2,-10,0,0,0),("pop_2",44.4,.2,-10,0,0,0),("pop_2",44.5,.2,-10,0,0,0),("pop_2",44.6,.2,-10,0,0,0),("pop_2",44.7,.2,-10,0,0,0),("pop_2",44.8,.2,-10,0,0,0),
("rubber_stamp_2",44.88,.6,-3,0,0,0),("thud_1",44.88,.8,-8,0,.2,0),
("whoosh_2",46.4,.5,-8,0,0,0),("rubber_stamp_2",47.7,.6,-1,0,0,0),("deep_boom_1",47.7,1.8,-4,0,.6,0),("glitch_1",49.8,.3,-9,0,0,0)]
# (file, at, dur, src_offset, gain dB, fade_in, fade_out)
BEDS=[("upbeat_bed_2",0.0,30.1,0,-1,.3,.6),("tense_bed_1",30.1,5.6,6,0,.5,.2),("upbeat_bed_2",36.0,14.1,20,-1,.3,1.2)]
ins=["-i","voice/narration.wav"]
fc=[f"[0:a]aresample=48000,pan=stereo|c0=c0|c1=c0,apad=whole_dur={DUR},loudnorm=I=-16:TP=-2:LRA=11,aresample=48000,asplit[v][vk]"]
n=1;fxl=[];bl=[]
for f,at,d,g,fi,fo,off in FX:
    ins+=["-i",f"sfx/{f}.mp3"];ms=int(at*1000)
    ch=f"[{n}:a]aresample=48000,aformat=channel_layouts=stereo,atrim={off}:{off+d+1.0 if off else 99},asetpts=PTS-STARTPTS,silenceremove=start_periods=1:start_threshold=-45dB,atrim=0:{d},asetpts=PTS-STARTPTS"
    if fi: ch+=f",afade=in:d={fi}"
    if fo: ch+=f",afade=out:st={max(0,d-fo)}:d={fo}"
    fc.append(ch+f",volume={g}dB,adelay={ms}|{ms}[f{n}]");fxl.append(f"[f{n}]");n+=1
for f,at,d,off,g,fi,fo in BEDS:
    ins+=["-i",f"sfx/{f}.mp3"];ms=int(at*1000)
    fc.append(f"[{n}:a]aresample=48000,aformat=channel_layouts=stereo,atrim={off}:{off+d},asetpts=PTS-STARTPTS,loudnorm=I=-24:TP=-6:LRA=15,aresample=48000,afade=in:d={fi},afade=out:st={d-fo}:d={fo},volume={g}dB,adelay={ms}|{ms}[b{n}]");bl.append(f"[b{n}]");n+=1
fc.append("".join(fxl)+f"amix=inputs={len(fxl)}:normalize=0:duration=longest,apad=whole_dur={DUR},atrim=0:{DUR},volume=-1dB[fx]")
fc.append("".join(bl)+f"amix=inputs={len(bl)}:normalize=0:duration=longest,apad=whole_dur={DUR},atrim=0:{DUR}[bed]")
fc.append("[bed][vk]sidechaincompress=threshold=0.04:ratio=5:attack=15:release=350[bd]")
fc.append("[v][fx][bd]amix=inputs=3:normalize=0:duration=first,highpass=f=60,acompressor=threshold=-16dB:ratio=2.5:attack=10:release=200[out]")
subprocess.run(["ffmpeg","-hide_banner","-loglevel","error","-y",*ins,"-filter_complex",";".join(fc),"-map","[out]","-t",str(DUR),"-c:a","pcm_f32le","build/mixpre.wav"],check=True)
# pass 1 measure
r=subprocess.run(["ffmpeg","-hide_banner","-y","-i","build/mixpre.wav","-af","loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json","-f","null","-"],capture_output=True,text=True).stderr
m=json.loads(re.search(r'\{[^{}]*"input_i"[^{}]*\}',r,re.S).group(0));print(m)
af=f"loudnorm=I=-14:TP=-1.5:LRA=11:measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true,aresample=192000,alimiter=limit=0.85:level=false:attack=1:release=60,aresample=48000"
subprocess.run(["ffmpeg","-hide_banner","-loglevel","error","-y","-i","build/mixpre.wav","-af",af,"-c:a","pcm_s16le","build/mix.wav"],check=True)
