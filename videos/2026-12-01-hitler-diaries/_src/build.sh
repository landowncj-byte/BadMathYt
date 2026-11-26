#!/bin/bash
# usage: build.sh <cut dir ('.' | tiktok | ig)> <yt|tt|ig>
S=/home/user/badmathyt/videos/2026-12-01-hitler-diaries
cat $S/_src/ref_recipes.js $S/_src/ref_plane.js /home/user/badmathyt/brand/engine-v2/crime.js $S/_src/dd_head.js $S/_src/dd_body.js $S/_src/ddmk.js $S/_src/$2.js > $S/$1/build/scene.js
