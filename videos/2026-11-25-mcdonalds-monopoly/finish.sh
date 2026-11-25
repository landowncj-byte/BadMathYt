#!/bin/bash
# usage: finish.sh <cutdir>   (cutdir contains build/video_noaudio.mp4 + build/mix.wav)
d=$1
ffmpeg -v error -y -i $d/build/video_noaudio.mp4 -i $d/build/mix.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -movflags +faststart -shortest $d/video.mp4
ffmpeg -hide_banner -nostats -i $d/video.mp4 -af ebur128=peak=true -f null - 2>&1 | grep -A12 "Summary" | grep -E "I:|Peak:" 
ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate,duration -of csv=p=0 $d/video.mp4
