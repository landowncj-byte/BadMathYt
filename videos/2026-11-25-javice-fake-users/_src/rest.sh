#!/bin/bash
cd /home/user/badmathyt; B=videos/2026-11-25-javice-fake-users
for c in tiktok ig; do
 node brand/engine-v2/bm2.cjs render $B/$c/build --parts 2 > $B/$c/build/render.log 2>&1
 python3 brand/engine-v2/mix.py $B/$c/build $B/$c/voice $B/$c/video.mp4 > $B/$c/build/mix.log 2>&1
 node brand/engine-v2/bm2.cjs sheet $B/$c/video.mp4 $B/$c/contact_sheet.png 6 4 > $B/$c/build/sheet.log 2>&1
done
echo done > $B/_src/rest.done
