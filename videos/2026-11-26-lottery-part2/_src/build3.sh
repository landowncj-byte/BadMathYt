#!/bin/bash
# usage: build3.sh <cut-dir-relative-to-topic or .> <yt|tt|ig>   -> <cut>/build/scene.js  (v3 crime-show pass)
D="$(cd "$(dirname "$0")" && pwd)"; S="$(dirname "$D")"; R="$(dirname "$(dirname "$S")")"
cat $D/shared.js $R/brand/engine-v2/crime.js $R/brand/engine-v2/crime_hud.js $D/crew.js $D/lot.js $D/$2"3.js" > $S/$1/build/scene.js
