import sys,glob
from PIL import Image
d=sys.argv[1]; fs=sorted(glob.glob(d+'/s_*.png')); n=int(sys.argv[2]) if len(sys.argv)>2 else 12
for part in range(0,len(fs),n):
    ims=[Image.open(f).crop((0,280,1080,1400)).resize((460,477)) for f in fs[part:part+n]]
    W=Image.new('RGB',(460*3,477*((len(ims)+2)//3)))
    for k,im in enumerate(ims): W.paste(im,((k%3)*460,(k//3)*477))
    W.save('/tmp/%s_%d.png'%(sys.argv[3],part//n))
print(len(fs))
