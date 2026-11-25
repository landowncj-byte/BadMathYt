import sys,glob
from PIL import Image,ImageDraw
d=sys.argv[1];out=sys.argv[2];cols=int(sys.argv[3]) if len(sys.argv)>3 else 5
fs=sorted(glob.glob(d+'/s_*.png'))
w,h=288,512
rows=(len(fs)+cols-1)//cols
S=Image.new('RGB',(cols*w,rows*(h+0)),(30,30,30))
for i,f in enumerate(fs):
    im=Image.open(f).convert('RGB').resize((w,h))
    dr=ImageDraw.Draw(im);dr.text((6,6),f.split('_')[-1][:-4],fill=(255,255,0))
    S.paste(im,((i%cols)*w,(i//cols)*h))
S.save(out)
