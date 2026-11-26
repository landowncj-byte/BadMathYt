#!/bin/bash
# usage: build5.sh <cut dir rel to slug ('.' | tiktok | ig)> <yt5|tt5|ig5>
S=/home/user/badmathyt/videos/2026-11-26-penny-doubled
cat $S/_src/ref_recipes.js $S/_src/ref_plane.js $S/_src/shared.js $S/_src/you.js $S/_src/pd5.js $S/_src/pdmk.js $S/_src/$2.js > $S/$1/build/scene.js
