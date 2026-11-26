#!/bin/bash
# usage: remix.sh <topic dir> <cutdir>
cd $1; D=$2; if [ "$D" = tiktok ]; then export BM2_BED_DB=-12; fi
python3 /home/user/badmathyt/videos/_lib/mix_cs.py $D/build $D/voice $D/video.mp4 | tail -2
ffprobe -v error -show_entries format=duration,size -of csv=p=0 $D/video.mp4
