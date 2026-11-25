#!/bin/bash
# usage: build.sh <cut dir rel to slug: . | tiktok | ig> <yt|tt|ig>
S=/home/user/badmathyt/videos/2026-11-26-three-briefcases
cat $S/_src/cases.js $S/_src/$2.js > $S/$1/build/scene.js
# TikTok: Whisper stamps the final "So…" at 27.92 s but it is spoken at ~28.55 s (sentences.json); keep the caption "switching." up until then
if [ "$2" = "tt" ]; then python3 - <<'P'
import re
p='/home/user/badmathyt/videos/2026-11-26-three-briefcases/tiktok/build/voice.js'
s=open(p).read(); s=s.replace('{"w":"So","s":27.92,"e":28.72}','{"w":"So","s":28.55,"e":28.72}'); open(p,'w').write(s)
P
fi
