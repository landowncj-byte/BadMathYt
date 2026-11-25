import subprocess,json,re,os
def mix(base,DUR,FX,BEDS,voice='voice/narration.wav',sfx='sfx/'):
    os.chdir(base)
    ins=["-i",voice]
    fc=[f"[0:a]aresample=48000,pan=stereo|c0=c0|c1=c0,apad=whole_dur={DUR},atrim=0:{DUR},loudnorm=I=-16:TP=-2:LRA=11,aresample=48000,asplit[v][vk]"]
    n=1;fxl=[];bl=[]
    for f,at,d,g,fi,fo,off in FX:
        ins+=["-i",f"{sfx}{f}.mp3"];ms=int(at*1000)
        ch=f"[{n}:a]aresample=48000,aformat=channel_layouts=stereo,atrim={off}:{off+d+1.0 if off else 99},asetpts=PTS-STARTPTS,silenceremove=start_periods=1:start_threshold=-45dB,atrim=0:{d},asetpts=PTS-STARTPTS"
        if fi: ch+=f",afade=in:d={fi}"
        if fo: ch+=f",afade=out:st={max(0,d-fo)}:d={fo}"
        fc.append(ch+f",volume={g}dB,adelay={ms}|{ms}[f{n}]");fxl.append(f"[f{n}]");n+=1
    for f,at,d,off,g,fi,fo in BEDS:
        ins+=["-i",f"{sfx}{f}.mp3"];ms=int(at*1000)
        fc.append(f"[{n}:a]aresample=48000,aformat=channel_layouts=stereo,atrim={off}:{off+d},asetpts=PTS-STARTPTS,loudnorm=I=-24:TP=-6:LRA=15,aresample=48000,afade=in:d={fi},afade=out:st={d-fo}:d={fo},volume={g}dB,adelay={ms}|{ms}[b{n}]");bl.append(f"[b{n}]");n+=1
    fc.append("".join(fxl)+f"amix=inputs={len(fxl)}:normalize=0:duration=longest,apad=whole_dur={DUR},atrim=0:{DUR},volume=-1dB[fx]")
    fc.append("".join(bl)+f"amix=inputs={len(bl)}:normalize=0:duration=longest,apad=whole_dur={DUR},atrim=0:{DUR}[bed]")
    fc.append("[bed][vk]sidechaincompress=threshold=0.04:ratio=5:attack=15:release=350[bd]")
    fc.append("[v][fx][bd]amix=inputs=3:normalize=0:duration=first,highpass=f=60,acompressor=threshold=-16dB:ratio=2.5:attack=10:release=200[out]")
    subprocess.run(["ffmpeg","-hide_banner","-loglevel","error","-y",*ins,"-filter_complex",";".join(fc),"-map","[out]","-t",str(DUR),"-c:a","pcm_f32le","build/mixpre.wav"],check=True)
    r=subprocess.run(["ffmpeg","-hide_banner","-y","-i","build/mixpre.wav","-af","loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json","-f","null","-"],capture_output=True,text=True).stderr
    m=json.loads(re.search(r'\{[^{}]*"input_i"[^{}]*\}',r,re.S).group(0));print(m)
    def meas(f):
        o=subprocess.run(["ffmpeg","-hide_banner","-i",f,"-af","ebur128=peak=true","-f","null","-"],capture_output=True,text=True).stderr
        p=subprocess.run(["ffmpeg","-hide_banner","-i",f,"-af","aresample=192000,astats=metadata=0","-f","null","-"],capture_output=True,text=True).stderr
        return float(re.findall(r"I:\s+(-?[\d.]+) LUFS",o)[-1]),max(float(x) for x in re.findall(r"Peak level dB: (-?[\d.]+)",p))
    for tp in (-1.5,-2.5,-3.5,-4.5,-5.5):
        lim=round(10**((tp-0.0)/20),3)
        af=f"loudnorm=I=-14:TP={tp}:LRA=11:measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true,aresample=192000,alimiter=limit={lim}:level=false:attack=1:release=60,aresample=48000,afade=t=in:d=0.03,afade=t=out:st={DUR-0.08}:d=0.08"
        subprocess.run(["ffmpeg","-hide_banner","-loglevel","error","-y","-i","build/mixpre.wav","-af",af,"-c:a","pcm_s16le","build/mix.wav"],check=True)
        subprocess.run(["ffmpeg","-hide_banner","-loglevel","error","-y","-i","build/video_noaudio.mp4","-i","build/mix.wav","-map","0:v","-map","1:a","-c:v","copy","-c:a","aac","-b:a","192k","-movflags","+faststart","video.mp4"],check=True)
        I,pk=meas("video.mp4"); print("try tp",tp,"LUFS",I,"peak",pk)
        if pk<=-1.2 and abs(I+14)<=.4: break
