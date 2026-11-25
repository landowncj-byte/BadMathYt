#!/bin/bash
# usage: render_cut.sh <build_dir> <frames>
cd "$1"; N=$2; H=$((N/2)); mkdir -p parts
node render.cjs video parts/p1.mp4 30 0 $H > parts/p1.log 2>&1 &
node render.cjs video parts/p2.mp4 30 $H $N > parts/p2.log 2>&1 &
wait
printf "file 'p1.mp4'\nfile 'p2.mp4'\n" > parts/list.txt
ffmpeg -y -v error -f concat -i parts/list.txt -c copy video_noaudio.mp4 && echo done $1
