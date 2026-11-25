#!/bin/bash
# usage: build.sh <cut dir rel to slug ('.' for YT)> <yt|tt|ig>
S=/home/user/badmathyt/videos/2026-11-26-weight-vs-height
cat $S/_src/recipes.js $S/_src/$2.js > $S/$1/build/scene.js
