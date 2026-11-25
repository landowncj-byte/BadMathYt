#!/bin/bash
# usage: sheet.sh out.png cols t1,t2,...
cd /home/user/badmathyt/videos/2026-11-24-theranos-revenue/build
rm -rf ../stills; node render.cjs stills $3 ../stills 2>&1 | head
ffmpeg -y -v error -pattern_type glob -i '../stills/s_*.png' -vf "scale=360:-1,tile=$2x2" -frames:v 1 $1
