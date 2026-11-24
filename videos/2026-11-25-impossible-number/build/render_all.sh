#!/bin/bash
# Renders the full video (narration + 15 s end card) in 3 parallel parts -> build/silent.mp4 (no audio).
set -e; cd "$(dirname "$0")"; mkdir -p tmp
N=$(node render.cjs frames 30 | tail -1); A=$((N/3)); B=$((2*N/3))
node render.cjs video tmp/part1.mp4 30 0 $A & node render.cjs video tmp/part2.mp4 30 $A $B & node render.cjs video tmp/part3.mp4 30 $B $N & wait
printf "file 'part1.mp4'\nfile 'part2.mp4'\nfile 'part3.mp4'\n" > tmp/list.txt
ffmpeg -y -v error -f concat -safe 0 -i tmp/list.txt -c copy silent.mp4; echo "silent.mp4: $N frames"
