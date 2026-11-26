import sys,glob,os
from PIL import Image,ImageDraw
d=sys.argv[1]; out=sys.argv[2]; cols=int(sys.argv[3]); w=int(sys.argv[4]); h=w*16//9
fs=sorted(glob.glob(d+'/s_*.png'))
rows=(len(fs)+cols-1)//cols; im=Image.new('RGB',(cols*w,rows*h)); dr=ImageDraw.Draw(im)
for i,f in enumerate(fs):
    x,y=(i%cols)*w,(i//cols)*h; im.paste(Image.open(f).convert('RGB').resize((w,h)),(x,y)); dr.rectangle([x,y,x+60,y+15],fill=(0,0,0)); dr.text((x+3,y+2),os.path.basename(f)[2:-4],fill=(255,255,0))
im.save(out); print(len(fs))
