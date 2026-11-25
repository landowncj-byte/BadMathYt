#!/bin/bash
# usage: build.sh <cut dir rel to slug: . | tiktok | ig> <yt|tt|ig>
S=/home/user/badmathyt/videos/2026-11-26-three-briefcases
cat $S/_src/cases.js $S/_src/$2.js > $S/$1/build/scene.js
# TikTok: Whisper stamps the final "So…" at 28.18 s but it is spoken at ~29.08 s (sentences.json); keep the caption "switching." up until then
if [ "$2" = "tt" ]; then python3 - <<'P'
p='/home/user/badmathyt/videos/2026-11-26-three-briefcases/tiktok/build/voice.js'
s=open(p).read()
s=s.replace('{"w":"switching.","s":28,"e":28.18}','{"w":"switching.","s":28,"e":28.48}').replace('{"w":"So","s":28.18,"e":29.26}','{"w":"So","s":29.08,"e":29.26}')
open(p,'w').write(s)
P
fi
