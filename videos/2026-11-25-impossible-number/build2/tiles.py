#!/usr/bin/env python3
# usage: tiles.py out.png cols stillsdir t1 t2 ...   -> labelled contact sheet of stills
import sys, glob
from PIL import Image, ImageDraw
out, cols, d = sys.argv[1], int(sys.argv[2]), sys.argv[3]; ts = [float(x) for x in sys.argv[4:]]
tw, th = 640, 360; rows = (len(ts) + cols - 1) // cols
W = Image.new('RGB', (cols * tw, rows * th), (0, 0, 0)); dr = ImageDraw.Draw(W)
for i, t in enumerate(ts):
    f = f"{d}/s_{t:06.2f}.png"
    try: im = Image.open(f).resize((tw, th))
    except Exception as e: continue
    W.paste(im, ((i % cols) * tw, (i // cols) * th)); dr.rectangle([(i % cols) * tw, (i // cols) * th, (i % cols) * tw + 70, (i // cols) * th + 16], fill=(0, 0, 0)); dr.text(((i % cols) * tw + 3, (i // cols) * th + 2), f"{t:.1f}s", fill=(255, 255, 0))
W.save(out)
