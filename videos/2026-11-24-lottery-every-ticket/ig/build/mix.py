import subprocess,json,re,os
CUT=os.path.basename(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
# (file, at, dur, gain_dB, fade_in, fade_out, src_offset)
if CUT=='tiktok':
    DUR=32.32
    FX=[("deep_boom_1",0.0,1.6,-3,0,.5,0),("rubber_stamp_2",0.15,.5,-3,0,0,0),("glitch_1",0.02,.4,-9,0,0,0),("thud_1",2.1,.5,-9,0,.1,0),
    ("swoosh_2",2.5,.7,-5,0,.2,0),("paper_slam_2",3.32,.5,-9,0,0,0),("paper_slam_2",3.68,.5,-8,0,0,0),("success_chime_1",4.1,.9,-5,0,.1,0),
    ("swipe_2",4.7,.5,-8,0,0,0),("pop_2",5.0,.3,-6,0,0,0),("thud_1",5.4,.6,-6,0,.1,0),("deep_boom_2",5.4,.36,-8,0,0,0),
    ("swoosh_2",7.1,.6,-6,0,.2,0),("pop_2",7.2,.2,-10,0,0,0),("pop_2",7.38,.2,-10,0,0,0),("pop_2",7.56,.2,-10,0,0,0),("pop_2",7.74,.2,-10,0,0,0),("pop_2",7.92,.2,-10,0,0,0),("pop_2",8.1,.2,-10,0,0,0),
    ("money_counter_1",7.16,.9,-10,.05,.1,0),("deep_boom_2",8.0,.36,-8,0,0,0),("ding_2",8.0,.7,-6,0,.1,0),("coin_single_1",8.8,.8,-8,0,.2,0),
    ("whoosh_2",9.9,.5,-8,0,0,0),("pop_2",10.16,.3,-8,0,0,0),("deep_boom_1",10.52,1.6,-3,0,.5,0),("coins_drop_1",10.55,1.2,-9,0,.3,0),("cash_register_1",10.7,1.0,-6,0,.1,0),
    ("explosion_small_2",11.9,.9,-8,0,.3,0),("paper_rustle",12.0,2.2,-9,.05,.8,3),("rubber_stamp_2",13.3,.6,-2,0,0,0),("deep_boom_2",13.3,.36,-6,0,0,0),
    ("swipe_2",14.3,.5,-8,0,0,0),("clock_ticking_2",14.3,1.0,-6,0,.05,0),("fail_buzzer_2",15.3,.47,-4,0,0,0),("thud_1",15.3,.6,-8,0,.1,0),
    ("swoosh_2",15.9,.6,-8,0,.2,0),("money_counter_1",15.92,1.2,-10,.05,.1,0),("deep_boom_2",17.08,.36,-7,0,0,0),("rubber_stamp_2",17.4,.6,-4,0,0,0),
    ("whoosh_2",18.1,.5,-8,0,0,0),("heartbeat_2",18.1,3.9,-6,.3,.2,0),("riser_2",18.9,2.2,-14,.3,.1,0),
    ("ball_pop",18.86,.4,-3,0,.05,0),("pingpong",18.86,.3,-8,0,0,0),("ball_pop",19.42,.4,-3,0,.05,0),("pingpong",19.42,.3,-8,0,0,0),("ball_pop",19.80,.4,-3,0,.05,0),("pingpong",19.80,.3,-8,0,0,0),
    ("ball_pop",20.22,.4,-3,0,.05,0),("pingpong",20.22,.3,-8,0,0,0),("ball_pop",20.78,.4,-3,0,.05,0),("pingpong",20.78,.3,-8,0,0,0),("ball_pop",21.32,.4,-1,0,.05,0),("pingpong",21.32,.3,-6,0,0,0),
    ("airhorn_1",22.1,1.4,-8,0,.3,0),("cheer_1",22.1,1.6,-10,0,.8,0),("confetti_pop",22.1,.4,-6,0,0,0),("rubber_stamp_2",22.1,.6,-3,0,0,0),("cash_register_1",22.55,1.0,-5,0,.1,0),
    ("swoosh_2",23.4,.6,-7,0,.2,0),("pop_2",23.78,.3,-6,0,0,0),("swipe_2",24.7,.5,-8,0,0,0),("money_counter_1",24.78,.7,-10,0,.1,0),("deep_boom_1",25.4,1.6,-4,0,.5,0),
    ("rubber_stamp_2",26.7,.6,-3,0,0,0),("thud_1",26.7,.6,-8,0,.1,0),
    ("whoosh_2",27.2,.5,-8,0,0,0),("pop_2",27.3,.3,-5,0,0,0),("pop_2",27.42,.3,-6,0,0,0),("ding_2",28.1,.7,-8,0,.1,0),("click_1",28.76,.3,-5,0,0,0),
    ("pop_2",30.1,.3,-7,0,0,0),("rubber_stamp_2",30.25,.6,-6,0,0,0),("pop_2",30.4,.3,-8,0,0,0),("click_1",30.85,.3,-4,0,0,0),("ding_2",31.0,.7,-7,0,.1,0),("glitch_1",31.95,.3,-9,0,0,0)]
    BEDS=[("upbeat_bed_2",0.0,18.1,0,-1,.3,.4),("tense_bed_1",18.1,3.94,6,0,.4,.2),("upbeat_bed_2",22.04,10.3,20,-1,.3,1.2)]
else:
    DUR=22.83
    FX=[("deep_boom_1",0.0,1.6,-3,0,.5,0),("rubber_stamp_2",0.15,.5,-3,0,0,0),("glitch_1",0.02,.4,-9,0,0,0),
    ("swoosh_2",1.9,.6,-6,0,.2,0),("money_counter_1",2.4,.8,-9,0,.1,0),("deep_boom_2",2.4,.36,-7,0,0,0),("paper_slam_2",3.32,.5,-8,0,0,0),
    ("whoosh_2",4.0,.5,-8,0,0,0),("pop_2",4.3,.3,-6,0,0,0),("swipe_2",5.3,.5,-8,0,0,0),("money_counter_1",5.4,.6,-10,0,.1,0),("deep_boom_1",5.9,1.8,-2,0,.6,0),("explosion_small_2",5.9,.9,-10,0,.3,0),
    ("swoosh_2",7.4,.6,-7,0,.2,0),("paper_slam_2",7.76,.5,-8,0,0,0),("pop_2",9.22,.3,-6,0,0,0),
    ("rubber_stamp_2",9.88,.6,-1,0,0,0),("deep_boom_2",9.88,.36,-6,0,0,0),("paper_rustle",9.95,2.2,-9,.05,.8,3),("money_counter_1",11.12,.9,-10,0,.1,0),("thud_1",12.0,.6,-8,0,.1,0),("paper_slam_2",12.34,.5,-8,0,0,0),
    ("swipe_2",12.9,.5,-8,0,0,0),("pop_2",12.95,.3,-6,0,0,0),
    ("rubber_stamp_2",14.0,.6,-2,0,0,0),("confetti_pop",14.0,.4,-6,0,0,0),("airhorn_1",14.32,1.4,-8,0,.3,0),("cheer_1",14.0,2.0,-10,0,.8,0),("cash_register_1",14.6,1.0,-5,0,.1,0),
    ("whoosh_2",16.1,.5,-8,0,0,0),("swoosh_2",16.2,.9,-6,0,.2,0),("swipe_2",17.5,.5,-8,0,0,0),("fail_buzzer_2",18.22,.47,-4,0,0,0),("thud_1",18.22,.6,-8,0,.1,0),("rubber_stamp_2",18.96,.6,-4,0,0,0),
    ("swoosh_2",19.9,.6,-7,0,.2,0),("pop_2",19.92,.3,-4,0,0,0),("ding_2",19.95,.7,-6,0,.1,0),("notification_chime_2",20.2,1.2,-10,0,.3,0),("rubber_stamp_2",21.46,.6,-6,0,0,0),("glitch_1",22.5,.3,-9,0,0,0)]
    BEDS=[("upbeat_bed_1",0.0,22.83,0,-1,.3,1.0)]
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
r=subprocess.run(["ffmpeg","-hide_banner","-y","-i","build/mixpre.wav","-af","loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json","-f","null","-"],capture_output=True,text=True).stderr
m=json.loads(re.search(r'\{[^{}]*"input_i"[^{}]*\}',r,re.S).group(0));print(m)
af=f"loudnorm=I=-14:TP=-1.5:LRA=11:measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true,aresample=192000,alimiter=limit=0.70:level=false:attack=1:release=60,aresample=48000"
subprocess.run(["ffmpeg","-hide_banner","-loglevel","error","-y","-i","build/mixpre.wav","-af",af,"-c:a","pcm_s16le","build/mix.wav"],check=True)
