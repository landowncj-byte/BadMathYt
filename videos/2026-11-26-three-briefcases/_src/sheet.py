import sys,subprocess,glob,os,tempfile
from PIL import Image,ImageDraw
v,out=sys.argv[1],sys.argv[2]
d=tempfile.mkdtemp(dir='/tmp/claude-0/-home-user-badmathyt/2038a7ea-fea8-5825-b2d5-fe5c8d6143c0/scratchpad')
subprocess.run(['ffmpeg','-loglevel','error','-i',v,'-vf','fps=1,scale=216:384','%s/f_%%03d.png'%d],check=True)
fs=sorted(glob.glob(d+'/f_*.png')); cols=8; rows=(len(fs)+cols-1)//cols
im=Image.new('RGB',(cols*216,rows*384))
for i,f in enumerate(fs):
    t=Image.open(f); dr=ImageDraw.Draw(t); dr.rectangle([0,0,44,18],fill=(0,0,0)); dr.text((3,3),'%ds'%i,fill=(255,255,0)); im.paste(t,((i%cols)*216,(i//cols)*384))
im.save(out); print(len(fs))
