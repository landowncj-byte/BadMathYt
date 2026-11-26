#!/bin/bash
# usage: build.sh <cut dir rel to slug ('.' for YT)> <yt|tt|ig>
S="$(cd "$(dirname "$0")/.." && pwd)"
cat $S/_src/chars.js $S/_src/recipes.js $S/_src/recipes2.js $S/_src/recipes3.js $S/_src/$2.js > $S/$1/build/scene.js
