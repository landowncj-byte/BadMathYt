#!/usr/bin/env bash
# Watch a video: download (YouTube/Instagram/TikTok link or local file), transcribe, and make a frame sheet.
# usage: brand/tools/watch.sh <url-or-file> <outdir>
# Notes: needs the site's hosts allowed in the environment (Instagram video CDNs are scontent-*.cdninstagram.com;
# if the download says "403 ... no rule allows this host", add that exact host). YouTube may refuse cloud servers.
set -e; SRC="$1"; OUT="${2:-/tmp/watch}"; mkdir -p "$OUT"; cd "$OUT"
PY=/root/tts/.venv/bin/python; YTDLP=/root/tts/.venv/bin/yt-dlp
if [ -f "$SRC" ]; then cp "$SRC" video.mp4; else
  $YTDLP -q --no-playlist -f "b[ext=mp4]/b" --print-to-file "%(uploader)s | %(title)s | %(view_count)s views | %(description)s" meta.txt -o "video.%(ext)s" "$SRC"
  [ -f video.mp4 ] || ffmpeg -v error -y -i video.* video.mp4; fi
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 video.mp4); STEP=$(python3 -c "print(max(1,round($D/27,2)))")
ffmpeg -v error -y -i video.mp4 -vf "fps=1/$STEP,scale=200:-1,tile=9x3" -frames:v 1 sheet.png
ffmpeg -v error -y -i video.mp4 -ac 1 -ar 16000 audio.wav
$PY - <<'P' > transcript.txt
from faster_whisper import WhisperModel; import soundfile as sf
y,_=sf.read('audio.wav',dtype='float32'); m=WhisperModel('small.en',device='cpu',compute_type='int8')
for s in m.transcribe(y,language='en')[0]: print(f'[{s.start:5.1f}] {s.text.strip()}')
P
echo "duration ${D}s · frame every ${STEP}s → $OUT/sheet.png · transcript → $OUT/transcript.txt"
