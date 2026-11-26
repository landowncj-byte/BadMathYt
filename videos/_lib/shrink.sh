#!/bin/bash
# usage: shrink.sh <video.mp4> [crf=24]  re-encode video stream (audio copied) until < 39 MB
f=$1; crf=${2:-24}
while true; do
  ffmpeg -y -loglevel error -i $f -c:v libx264 -crf $crf -preset medium -pix_fmt yuv420p -c:a copy -movflags +faststart /tmp/shr.mp4 || exit 1
  s=$(stat -c %s /tmp/shr.mp4); echo "crf $crf -> $s"
  [ $s -lt 40500000 ] && { mv /tmp/shr.mp4 $f; break; }
  crf=$((crf+2))
done
