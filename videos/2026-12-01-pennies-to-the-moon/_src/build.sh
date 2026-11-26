#!/bin/bash
# usage: build.sh <cut dir ('.' | tiktok | ig)> <yt|tt|ig>
S=/home/user/badmathyt/videos/2026-12-01-pennies-to-the-moon
cat $S/_src/ref_recipes.js $S/_src/ref_plane.js $S/_src/you.js $S/_src/pm_head.js $S/_src/pm_body.js $S/_src/pmmk.js $S/_src/$2.js > $S/$1/build/scene.js
