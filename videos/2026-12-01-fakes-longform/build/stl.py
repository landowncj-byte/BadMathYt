#!/usr/bin/env python3
"""stl.py name t1 t2 ... : stills -> /tmp/claude-0/cm/fkstl_<name>/ and a labelled montage (4 cols, 640x360) /tmp/claude-0/cm/fkstl_<name>.png"""
import sys, subprocess, os, glob
from PIL import Image, ImageDraw
name = sys.argv[1]; ts = [float(x) for x in sys.argv[2:]]
out = f'/tmp/claude-0/cm/fkstl_{name}'; subprocess.run(['rm', '-rf', out])
subprocess.run(['node', 'brand/engine-v2/bm2.cjs', 'stills', 'videos/2026-12-01-fakes-longform/build', ','.join(f'{t:.2f}' for t in ts), out], cwd='/home/user/badmathyt', capture_output=True)
tw, th, cols = 640, 360, 3; rows = (len(ts) + cols - 1) // cols
W = Image.new('RGB', (cols * tw, rows * th)); d = ImageDraw.Draw(W)
for i, t in enumerate(ts):
    f = f'{out}/s_{t:06.2f}.png'
    if not os.path.exists(f): continue
    W.paste(Image.open(f).resize((tw, th)), ((i % cols) * tw, (i // cols) * th)); d.rectangle([(i % cols) * tw, (i // cols) * th, (i % cols) * tw + 60, (i // cols) * th + 14], fill=(0, 0, 0)); d.text(((i % cols) * tw + 3, (i // cols) * th + 2), f'{t:.1f}', fill=(255, 255, 0))
W.save(f'/tmp/claude-0/cm/fkstl_{name}.png')
