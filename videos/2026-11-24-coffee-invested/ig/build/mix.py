import subprocess,json,re
DUR=18.0
# (file, at, dur, gain_dB, fade_in, fade_out, src_offset)
FX=[("rubber_stamp_2",0.0,.5,-3,0,0,0),("deep_boom_1",0.0,1.2,-3,0,.4,0),("glitch_1",0.02,.4,-9,0,0,0),("pop_2",0.14,.3,-10,0,0,0),
("rubber_stamp_2",2.0,.5,-3,0,0,0),("thud_1",2.0,.8,-8,0,.2,0),("glitch_1",2.0,.2,-12,0,0,0),
("explosion_small_2",3.5,.9,-11,0,.3,0),("glass_shatter_1",3.48,1.0,-8,0,.4,0),("deep_boom_1",3.5,1.6,-3,0,.5,0),("rubber_stamp_2",3.5,.5,-3,0,0,0),("airhorn_2",3.5,1.0,-13,0,.3,0),
("swoosh_2",4.3,.9,-7,0,.2,0),("pop_1",4.75,1.3,-9,0,.3,0),("coins_drop_1",4.8,1.5,-9,0,.4,0),("coin_single_1",5.6,.8,-12,0,.2,0),
("swipe_2",6.25,.5,-7,0,0,0),("pop_2",6.4,.3,-6,0,0,0),("ding_2",6.8,.7,-6,0,.1,0),("rubber_stamp_2",7.25,.5,-5,0,0,0),
("whoosh_2",7.62,.5,-8,0,0,0),("money_counter_1",7.7,.9,-9,0,.1,0),
("deep_boom_1",8.58,1.8,-2,0,.6,0),("cash_register_1",8.62,1.0,-3,0,.1,0),("coins_drop_1",8.7,1.5,-8,0,.4,0),("airhorn_1",8.62,1.2,-12,0,.3,0),("cheer_1",8.7,2.2,-12,0,1.0,0),("coins_drop_2",9.9,.4,-9,0,0,0),
("deep_boom_2",10.54,.36,-4,0,0,0),("rubber_stamp_2",10.54,.5,-5,0,0,0),
("whoosh_2",11.72,.5,-8,0,0,0),("typewriter_2",11.85,.8,-8,0,.2,0),("typewriter_2",12.78,.8,-9,0,.2,0),("typewriter_2",13.3,.8,-9,0,.2,0),
("clock_ticking_1",12.9,1.5,-8,.05,.2,0),("fail_buzzer_1",14.3,.5,-14,0,.1,0),
("swipe_2",14.35,.5,-8,0,0,0),("pop_2",14.48,.3,-4,0,0,0),("success_chime_1",14.5,.9,-7,0,.1,0),("rubber_stamp_2",14.74,.5,-6,0,0,0),
("swoosh_2",15.4,.9,-8,0,.2,0),("swipe_1",15.48,.6,-6,0,0,0),("pop_2",15.9,.3,-7,0,0,0),("notification_chime_2",16.5,1.2,-8,0,.3,0),("click_1",16.55,.3,-6,0,0,0),("glitch_1",17.7,.3,-9,0,0,0)]
# (file, at, dur, src_offset, gain dB, fade_in, fade_out)
BEDS=[("upbeat_bed_1",0.0,18.0,0,-1,.3,.8)]
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
