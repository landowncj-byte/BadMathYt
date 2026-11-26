#!/bin/bash
# usage: build.sh <cut dir ('.' | tiktok | ig)> <yt|tt|ig>
S=/home/user/badmathyt/videos/2026-11-30-victor-lustig; R=/home/user/badmathyt
cat $S/_src/v5_head.js $S/_src/v6_body.js > $S/_src/v5.js
cat $S/_src/ref_recipes.js $S/_src/ref_plane.js $R/brand/engine-v2/crime.js $S/_src/v5.js $S/_src/vmk.js $S/_src/$2.js > $S/$1/build/scene.js
