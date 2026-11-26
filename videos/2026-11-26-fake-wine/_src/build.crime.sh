#!/bin/bash
# usage: build.crime.sh <cut-dir-relative-to-topic or .> <yt|tt|ig>   (recipes + crime-show cut -> build/scene.js)
D="$(cd "$(dirname "$0")" && pwd)"; S="$(dirname "$D")"; R="$(dirname "$(dirname "$S")")"
cat $D/shared.js $R/brand/engine-v2/crime.js $R/brand/engine-v2/crime_hud.js $D/$2.crime.js > $S/$1/build/scene.js
