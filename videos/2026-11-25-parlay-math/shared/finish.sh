#!/bin/bash
# usage (in video folder): finish.sh DUR
ffmpeg -y -v error -i build/video_noaudio.mp4 -i build/mix.wav -map 0:v -map 1:a -c:v copy -af apad -c:a aac -b:a 192k -t $1 -movflags +faststart video.mp4
ffmpeg -hide_banner -i video.mp4 -af ebur128=peak=true -f null - 2>&1 | tail -14 | grep -E " I: |Peak:"
echo frames $(ffprobe -v error -select_streams v -count_frames -show_entries stream=nb_read_frames -of csv=p=0 video.mp4) dur $(ffprobe -v error -show_entries format=duration -of csv=p=0 video.mp4)
