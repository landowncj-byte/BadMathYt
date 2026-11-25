import sys,glob
from PIL import Image
d=sys.argv[1]; fs=sorted(glob.glob(d+'/stills/s_*.png')); sel=sys.argv[2:] 
fs=[f for f in fs if (not sel) or any(f.endswith('s_%s.png'%s) for s in sel)]
n=len(fs); cols=min(n,4) if n>3 else n; rows=(n+cols-1)//cols; w=360;h=640
im=Image.new('RGB',(cols*w,rows*h))
for i,f in enumerate(fs): im.paste(Image.open(f).convert('RGB').resize((w,h)),((i%cols)*w,(i//cols)*h))
im.save(d+'/stills_m.png'); print(n)
