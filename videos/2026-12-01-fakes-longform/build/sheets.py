#!/usr/bin/env python3
"""QA contact sheets: python3 sheets.py video.mp4 outdir  -> qa-v2/ch0_cold_open.png ... one frame every ~6 s per chapter, labelled with the time."""
import subprocess, sys, os, json
from PIL import Image, ImageDraw
v, out = sys.argv[1], sys.argv[2]; os.makedirs(out, exist_ok=True)
T = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../align/timeline.json'))); st = {p['id']: p['start'] for p in T['paragraphs']}; end = T['duration']
dur = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', v]))
chapters = [('ch0_cold_open', 0, st['P07']), ('ch1_wine', st['P07'], st['P21']), ('ch2_prince', st['P21'], st['P34']), ('ch3_lottery', st['P34'], st['P48']), ('ch4_payday', st['P48'], st['P60']), ('ch5_javice', st['P60'], st['P71']), ('ch6_pattern', st['P71'], end), ('end_card', end, dur)]
tw, th, cols = 480, 270, 4
for name, a, b in chapters:
    step = 6.0 if b - a > 20 else 3.0; ts = []; t = a + 0.5
    while t < b - 0.2: ts.append(t); t += step
    rows = (len(ts) + cols - 1) // cols; W = Image.new('RGB', (cols * tw, rows * th), (0, 0, 0)); d = ImageDraw.Draw(W)
    for i, t in enumerate(ts):
        f = f'/tmp/_sh_{i}.png'; subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', f'{t:.2f}', '-i', v, '-frames:v', '1', '-vf', f'scale={tw}:{th}', f], check=True)
        W.paste(Image.open(f), ((i % cols) * tw, (i // cols) * th)); d.rectangle([(i % cols) * tw, (i // cols) * th, (i % cols) * tw + 62, (i // cols) * th + 15], fill=(0, 0, 0)); d.text(((i % cols) * tw + 3, (i // cols) * th + 2), f'{t:6.1f}s', fill=(255, 255, 0))
    W.save(os.path.join(out, name + '.png')); print(name, len(ts), 'frames')
