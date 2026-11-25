import subprocess,json,re,shutil,os
LIB='/home/user/badmathyt/brand/sfx-library'
def find(name):
    for r,d,f in os.walk(LIB):
        if name+'.mp3' in f: return os.path.join(r,name+'.mp3')
    raise Exception(name)
def mix(FX,BEDS,DUR):
    os.makedirs('sfx',exist_ok=True)
    for n in {f[0] for f in FX}|{b[0] for b in BEDS}:
        if not os.path.exists(f'sfx/{n}.mp3'): shutil.copy(find(n),f'sfx/{n}.mp3')
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
    af=f"loudnorm=I=-14:TP=-1.5:LRA=11:measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true,aresample=192000,alimiter=limit=0.85:level=false:attack=1:release=60,aresample=48000"
    subprocess.run(["ffmpeg","-hide_banner","-loglevel","error","-y","-i","build/mixpre.wav","-af",af,"-c:a","pcm_s16le","build/mix.wav"],check=True)
