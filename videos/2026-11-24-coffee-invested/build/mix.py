import subprocess,json,re
DUR=41.47
# (file, at, dur, gain_dB, fade_in, fade_out, src_offset)
FX=[("rubber_stamp_2",0.0,.5,-3,0,0,0),("deep_boom_2",0.0,.36,-5,0,0,0),("glitch_1",0.02,.4,-9,0,0,0),
("rubber_stamp_2",0.7,.5,-2,0,0,0),("thud_1",0.7,.8,-8,0,.2,0),("glitch_1",0.7,.2,-14,0,0,0),
("glass_shatter_1",3.98,1.0,-8,0,.4,0),("explosion_small_2",4.02,.9,-12,0,.3,0),("money_counter_1",4.05,.5,-10,0,.1,0),("whoosh_2",4.3,.5,-8,0,0,0),
("swipe_2",4.55,.5,-8,0,0,0),("paper_slam_2",5.0,.5,-7,0,0,0),("deep_boom_2",5.0,.36,-8,0,0,0),("pop_2",5.9,.3,-6,0,0,0),
("whoosh_2",6.4,.5,-8,0,0,0),("money_counter_1",6.56,1.6,-9,.05,.2,0),("ding_2",8.14,.7,-8,0,.1,0),
("deep_boom_1",8.84,1.6,-4,0,.5,0),("paper_slam_2",8.84,.5,-8,0,0,0),("cash_register_1",8.9,1.0,-7,0,.1,0),
("swoosh_2",9.3,.9,-6,0,.2,0),("swipe_2",9.7,.5,-9,0,0,0),
("pop_1",10.0,1.3,-9,0,.3,0),("coins_drop_1",10.05,1.5,-9,0,.4,0),("coin_single_1",10.7,.8,-12,0,.2,0),("coin_single_1",11.2,.8,-12,0,.2,0),("coins_drop_2",11.6,.4,-10,0,0,0),("pop_1",11.0,1.3,-10,0,.3,0),("coins_drop_2",12.2,.4,-10,0,0,0),
("pop_2",11.46,.3,-6,0,0,0),("ding_2",11.88,.7,-6,0,.1,0),("coin_single_1",11.9,.8,-10,0,.2,0),
("rubber_stamp_2",15.32,.5,-5,0,0,0),("swoosh_2",16.2,.9,-9,0,.2,0),
("pop_2",16.4,.3,-6,0,0,0),("rubber_stamp_2",16.7,.5,-6,0,0,0),("success_chime_1",16.6,.9,-6,0,.1,0),("pop_2",17.2,.2,-10,0,0,0),("pop_2",17.9,.2,-10,0,0,0),
("whoosh_2",18.8,.5,-8,0,0,0),("money_counter_1",19.16,1.3,-9,0,.1,0),("ding_2",20.48,.7,-5,0,.1,0),("deep_boom_2",20.48,.36,-8,0,0,0),("coin_single_1",20.5,.8,-10,0,.2,0),
("money_counter_1",22.16,1.1,-9,0,.1,0),("ding_2",23.26,.7,-5,0,.1,0),("deep_boom_2",23.26,.36,-8,0,0,0),("coins_drop_2",23.3,.4,-9,0,0,0),
("swoosh_2",24.5,.9,-7,0,.2,0),("swipe_2",24.6,.5,-4,0,0,0),("pop_2",25.7,.3,-6,0,0,0),("ding_2",25.8,.7,-9,0,.1,0),("notification_chime_2",26.25,1.2,-9,0,.3,0),
("whoosh_2",27.15,.5,-8,0,0,0),("money_counter_1",27.26,1.7,-9,0,.1,0),("ding_2",29.0,.7,-5,0,.1,0),("deep_boom_2",29.0,.36,-8,0,0,0),("coin_single_1",29.0,.8,-10,0,.2,0),
("pop_2",30.9,.3,-8,0,0,0),("click_1",31.55,.3,-4,0,0,0),("riser_1",30.95,3.0,-12,.4,.2,0),("heartbeat_2",31.6,2.5,-6,.5,.2,0),
("deep_boom_2",34.0,.36,-9,0,0,0),("riser_2",33.7,1.8,-14,.3,.1,0),("money_counter_1",34.3,1.2,-8,0,.1,0),
("deep_boom_1",35.44,1.8,-3,0,.6,0),("cash_register_1",35.5,1.0,-3,0,.1,0),("coins_drop_1",35.6,1.5,-8,0,.4,0),("airhorn_1",35.5,1.2,-12,0,.3,0),("cheer_1",35.6,2.2,-12,0,1.0,0),("coins_drop_2",36.6,.4,-9,0,0,0),
("notification_chime_2",36.5,1.2,-10,0,.3,0),
("whoosh_2",37.95,.5,-8,0,0,0),("typewriter_2",38.2,.8,-8,0,.2,0),("typewriter_2",38.55,.8,-9,0,.2,0),
("swipe_2",39.45,.5,-8,0,0,0),("deep_boom_1",39.6,1.5,-6,0,.5,0),("rubber_stamp_2",40.22,.5,-2,0,0,0),("deep_boom_2",40.22,.36,-6,0,0,0),("glitch_1",41.2,.3,-9,0,0,0)]
# (file, at, dur, src_offset, gain dB, fade_in, fade_out)
BEDS=[("upbeat_bed_2",0.0,30.9,0,-1,.3,.5),("tense_bed_1",30.9,3.3,6,0,.4,.2),("upbeat_bed_2",34.0,7.47,20,-1,.2,1.2)]
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
