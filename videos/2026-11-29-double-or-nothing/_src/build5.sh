#!/bin/bash
# usage: build5.sh <cut dir ('.' | tiktok | ig)> <yt|tt|ig>
S=/home/user/badmathyt/videos/2026-11-29-double-or-nothing
cat $S/_src/ref_recipes.js $S/_src/ref_plane.js $S/_src/you.js $S/_src/dn5.js $S/_src/dnmk.js $S/_src/$2.js > $S/$1/build/scene.js
