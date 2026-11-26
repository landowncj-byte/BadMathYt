# usage: crime_sheet.py <stillsdir> <out_prefix> [cols=4] [per=8] [tile_w=405]  -> labelled keyframe sheets
import sys,glob,os
from PIL import Image,ImageDraw
d,out=sys.argv[1],sys.argv[2]; cols=int(sys.argv[3]) if len(sys.argv)>3 else 4; per=int(sys.argv[4]) if len(sys.argv)>4 else 8; w=int(sys.argv[5]) if len(sys.argv)>5 else 405; h=w*16//9
fs=sorted(glob.glob(d+'/s_*.png'))
for k in range(0,len(fs),per):
    ch=fs[k:k+per]; rows=(len(ch)+cols-1)//cols; im=Image.new('RGB',(cols*w,rows*h)); dr=ImageDraw.Draw(im)
    for i,f in enumerate(ch):
        x,y=(i%cols)*w,(i//cols)*h; im.paste(Image.open(f).convert('RGB').resize((w,h)),(x,y)); dr.rectangle([x,y,x+62,y+16],fill=(0,0,0)); dr.text((x+3,y+2),os.path.basename(f)[2:-4]+'s',fill=(255,255,0))
    im.save('%s_%02d.png'%(out,k//per))
print(len(fs))
