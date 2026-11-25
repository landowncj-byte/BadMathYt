import sys,subprocess,os,glob
from PIL import Image,ImageDraw
v,out=sys.argv[1],sys.argv[2]; d=os.path.dirname(out) or '.'; tmp=d+'/_s1'; os.makedirs(tmp,exist_ok=True)
for f in glob.glob(tmp+'/*'): os.remove(f)
subprocess.run(['ffmpeg','-v','error','-y','-i',v,'-vf','fps=1,scale=216:-1',tmp+'/f_%03d.png'],check=True)
fs=sorted(glob.glob(tmp+'/f_*.png')); cols=10; w,h=216,384; rows=(len(fs)+cols-1)//cols
im=Image.new('RGB',(cols*w,rows*h)); dr=ImageDraw.Draw(im)
for i,f in enumerate(fs):
    x,y=(i%cols)*w,(i//cols)*h; im.paste(Image.open(f).convert('RGB'),(x,y)); dr.rectangle([x,y,x+44,y+18],fill=(0,0,0)); dr.text((x+4,y+3),f'{i}s',fill=(255,255,0))
im.save(out); [os.remove(f) for f in fs]; os.rmdir(tmp)
