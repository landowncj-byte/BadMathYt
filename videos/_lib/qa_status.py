#!/usr/bin/env python3
# usage: qa_status.py <topic-dir> "<notes markdown file>"  -> measures the 3 cuts, copies beats-v3 -> build/AV.md, appends RENDERED READY lines + notes to qa.md
import sys, os, re, subprocess, json, shutil
T = sys.argv[1]; notes = open(sys.argv[2]).read() if len(sys.argv) > 2 else ''
cuts = [('YouTube(root)', '.'), ('TikTok(tiktok/)', 'tiktok'), ('IG/FB(ig/)', 'ig')]
lines = []
for name, c in cuts:
    d = T if c == '.' else os.path.join(T, c); v = os.path.join(d, 'video.mp4')
    dur = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', v]).decode())
    size = os.path.getsize(v) / 1e6
    out = subprocess.run(['ffmpeg', '-nostats', '-i', v, '-af', 'ebur128=peak=true', '-f', 'null', '-'], capture_output=True, text=True).stderr
    i = re.findall(r'I:\s+(-?[\d.]+) LUFS', out)[-1]; tp = re.findall(r'Peak:\s+(-?[\d.]+) dBFS', out)[-1]
    shutil.copy(os.path.join(d, 'voice/beats-v3.md'), os.path.join(d, 'build/AV.md'))
    lines.append('RENDERED READY: %s %.1fs %.1fMB · %s LUFS · TP %s dBFS · mix v2 (quiet bed)' % (name, dur, size, i, tp))
    assert dur > 60 and size < 40, (name, dur, size)
q = os.path.join(T, 'qa.md'); s = open(q).read()
s = s.replace('## CRIME-SHOW BUILD STATUS\nVOICED READY', '## CRIME-SHOW BUILD STATUS\nVOICED READY\n' + '\n'.join(lines) + ('\n\n' + notes if notes else ''))
open(q, 'w').write(s); print('\n'.join(lines))
