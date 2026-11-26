#!/bin/bash
# usage: cut.sh <topic dir> <cutdir> <cutfile>  -> build, render (jobs 3), mix (tiktok -12), srt, sheet, stats
T=$1; D=$2; K=$3; R=/home/user/badmathyt; cd $T
bash _src/build.sh $PWD $D $K
rm -rf $D/build/parts
node $R/brand/engine-v2/bm2.cjs render $D/build --jobs 3 --chunk 20 --crf 20 --force > $D/build/render.log 2>&1 || { echo RENDER FAIL; tail $D/build/render.log; exit 1; }
if [ "$D" = tiktok ]; then export BM2_BED_DB=-12; fi
python3 $R/videos/_lib/mix_cs.py $D/build $D/voice $D/video.mp4 | tail -2
python3 - $D <<'PY'
import json,sys
v=sys.argv[1]; s=json.load(open(v+'/voice/sentences.json')); f=lambda t:'%02d:%02d:%02d,%03d'%(t//3600,t%3600//60,t%60,round((t%1)*1000)%1000)
open(v+'/captions.srt','w').write(''.join('%d\n%s --> %s\n%s\n\n'%(i+1,f(x['start']),f(x['end']),x['text']) for i,x in enumerate(s)))
PY
node $R/brand/engine-v2/bm2.cjs sheet $D/video.mp4 $D/contact_sheet.png 6 4 >/dev/null 2>&1
ffprobe -v error -show_entries format=duration,size -of csv=p=0 $D/video.mp4
ffmpeg -nostats -i $D/video.mp4 -af ebur128=peak=true -f null - 2>&1 | grep -A12 Summary | grep -E "I:|Peak:"
