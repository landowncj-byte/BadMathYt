#!/bin/bash
# usage: build.sh <cut dir ('.' | tiktok | ig)> <yt|tt|ig>
S=/home/user/badmathyt/videos/2026-11-30-million-or-100-a-day
cat $S/_src/m5_head.js $S/_src/m5_body.js > $S/_src/m5.js
cat $S/_src/ref_recipes.js $S/_src/ref_plane.js $S/_src/you.js $S/_src/m5.js $S/_src/mmk.js $S/_src/$2.js > $S/$1/build/scene.js
