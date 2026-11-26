#!/bin/bash
# usage: build5.sh <cut dir rel to slug ('.' | tiktok | ig)> <yt5|tt5|ig5>
S=/home/user/badmathyt/videos/2026-11-25-one-percent-fee; P=/home/user/badmathyt/videos/2026-11-26-penny-doubled/_src
cat $P/ref_recipes.js $P/ref_plane.js $P/shared.js $P/pd5.js $S/_src/you.js $S/_src/fee5.js $S/_src/$2.js > $S/$1/build/scene.js
