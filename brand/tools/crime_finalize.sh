#!/bin/bash
# usage: crime_finalize.sh <cut-dir>   (after bm2.cjs render): mix, captions.srt, contact sheet, stats
V=$1; R="$(cd "$(dirname "$0")/../.." && pwd)"; cd $R
python3 brand/engine-v2/mix.py $V/build $V/voice $V/video.mp4 | tail -3
python3 - $V <<'PY'
import json,sys
v=sys.argv[1]; s=json.load(open(v+'/voice/sentences.json')); f=lambda t:'%02d:%02d:%02d,%03d'%(t//3600,t%3600//60,t%60,round((t%1)*1000)%1000)
open(v+'/captions.srt','w').write(''.join('%d\n%s --> %s\n%s\n\n'%(i+1,f(x['start']),f(x['end']),x['text']) for i,x in enumerate(s)))
PY
node brand/engine-v2/bm2.cjs sheet $V/video.mp4 $V/contact_sheet.png 6 4 > /dev/null 2>&1
ffprobe -v error -show_entries format=duration,size -of default=nw=1 $V/video.mp4
ffmpeg -nostats -i $V/video.mp4 -af ebur128=peak=true -f null - 2>&1 | grep -A12 "Summary" | grep -E "I:|Peak:" 
