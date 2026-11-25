# usage: sheetN.py <stillsdir> <out_prefix> [cols=4] [per=12]  -> labelled sheets of stills (270x480 tiles)
import sys,glob,os
from PIL import Image,ImageDraw
d,out=sys.argv[1],sys.argv[2]; cols=int(sys.argv[3]) if len(sys.argv)>3 else 4; per=int(sys.argv[4]) if len(sys.argv)>4 else 12
fs=sorted(glob.glob(d+'/s_*.png')); w,h=270,480
for k in range(0,len(fs),per):
    ch=fs[k:k+per]; rows=(len(ch)+cols-1)//cols; im=Image.new('RGB',(cols*w,rows*h)); dr=ImageDraw.Draw(im)
    for i,f in enumerate(ch):
        x,y=(i%cols)*w,(i//cols)*h; im.paste(Image.open(f).convert('RGB').resize((w,h)),(x,y)); dr.rectangle([x,y,x+60,y+16],fill=(0,0,0)); dr.text((x+3,y+2),os.path.basename(f)[2:-4]+'s',fill=(255,255,0))
    im.save('%s_%02d.png'%(out,k//per))
print(len(fs))
