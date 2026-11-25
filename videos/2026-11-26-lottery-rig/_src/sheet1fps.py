import sys,subprocess,glob,os,tempfile
from PIL import Image,ImageDraw
v,out=sys.argv[1],sys.argv[2]; d=tempfile.mkdtemp(dir='/tmp/claude-0/-home-user-badmathyt/2038a7ea-fea8-5825-b2d5-fe5c8d6143c0/scratchpad')
subprocess.run(['ffmpeg','-v','error','-y','-i',v,'-vf','fps=1,scale=216:-1',d+'/f_%03d.png'],check=True)
fs=sorted(glob.glob(d+'/f_*.png')); cols=10; rows=(len(fs)+cols-1)//cols; w,h=Image.open(fs[0]).size
im=Image.new('RGB',(cols*w,rows*h))
for i,f in enumerate(fs):
    t=Image.open(f).convert('RGB'); ImageDraw.Draw(t).text((6,6),'%ds'%i,fill=(255,255,0)); im.paste(t,((i%cols)*w,(i//cols)*h))
im.save(out); print(len(fs),im.size)
