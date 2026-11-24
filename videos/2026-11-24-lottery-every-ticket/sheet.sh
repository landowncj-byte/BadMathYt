#!/bin/bash
# usage: sheet.sh stillsdir out.png cols
ffmpeg -y -v error -pattern_type glob -i "$1/*.png" -vf "scale=360:-1,tile=${3}x4:padding=6:color=0x222222" -frames:v 1 "$2"
