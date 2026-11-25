import sys,subprocess,glob,os,shutil
from PIL import Image,ImageDraw
v,out=sys.argv[1],sys.argv[2]; cols=int(sys.argv[3]) if len(sys.argv)>3 else 10
d='/tmp/claude-0/-home-user-badmathyt/2038a7ea-fea8-5825-b2d5-fe5c8d6143c0/scratchpad/sh_%d'%os.getpid(); os.makedirs(d)
subprocess.run(['ffmpeg','-y','-v','error','-i',v,'-vf','fps=1,scale=216:384',d+'/f_%03d.png'],check=True)
fs=sorted(glob.glob(d+'/f_*.png')); n=len(fs); rows=(n+cols-1)//cols
im=Image.new('RGB',(cols*216,rows*384),(20,20,20))
for i,f in enumerate(fs):
    t=Image.open(f); dr=ImageDraw.Draw(t); dr.rectangle([0,0,52,18],fill=(0,0,0)); dr.text((3,3),'%ds'%i,fill=(255,255,0)); im.paste(t,((i%cols)*216,(i//cols)*384))
im.save(out); print(n,out); shutil.rmtree(d)
