#!/bin/bash
# contact.sh <video> <out.png> <every_sec> <cols>
dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 $1)
n=$(python3 -c "import math;print(math.ceil($dur/$3))"); rows=$(( (n + $4 - 1) / $4 ))
ffmpeg -v error -y -i $1 -vf "fps=1/$3,scale=216:384,tile=$4x$rows" -frames:v 1 $2
