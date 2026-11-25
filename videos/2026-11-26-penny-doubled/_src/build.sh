#!/bin/bash
# usage: build.sh <cut dir rel to slug ('.' | tiktok | ig)> <yt|tt|ig>
S=/home/user/badmathyt/videos/2026-11-26-penny-doubled
cat $S/_src/ref_recipes.js $S/_src/ref_plane.js $S/_src/shared.js $S/_src/$2.js > $S/$1/build/scene.js
