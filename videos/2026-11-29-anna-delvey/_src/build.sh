#!/bin/bash
# usage: build.sh <cut dir ('.' | tiktok | ig)> <yt|tt|ig>
S=/home/user/badmathyt/videos/2026-11-29-anna-delvey; R=/home/user/badmathyt
cat $S/_src/an5_head.js $S/_src/an5_body.js > $S/_src/an5.js
cat $R/videos/2026-11-27-million-vs-billion/_src/ref_recipes.js $R/videos/2026-11-27-million-vs-billion/_src/ref_plane.js $R/brand/engine-v2/crime.js $S/_src/an5.js $S/_src/anmk.js $S/_src/$2.js > $S/$1/build/scene.js
