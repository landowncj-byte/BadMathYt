#!/bin/bash
d=$1
ffmpeg -v error -y -i $d/build/video_noaudio.mp4 -i $d/build/mix.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -movflags +faststart -shortest $d/video.mp4
ffmpeg -hide_banner -nostats -i $d/video.mp4 -af ebur128=peak=true -f null - 2>&1 | awk '/Summary/{f=1} f' | grep -E "I:|LRA:|Peak:" | tr -s ' ' | tr '\n' ' '; echo
ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate,duration -of csv=p=0 $d/video.mp4 | tr '\n' ' '; echo
