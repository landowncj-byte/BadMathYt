#!/bin/bash
# usage: build3.sh <cut-dir-relative-to-topic or .> <yt|tt|ig>  -> <cut>/build/scene.js
D="$(cd "$(dirname "$0")" && pwd)"; S="$(dirname "$D")"; R="$(dirname "$(dirname "$S")")"
cat $R/videos/2026-11-26-weight-vs-height/_src/chars.js $R/videos/2026-11-26-lottery-part2/_src/shared.js $R/brand/engine-v2/crime.js $R/brand/engine-v2/crime_hud.js $R/videos/2026-11-26-lottery-part2/_src/crew.js $D/simdata.js $D/shared.js $D/cm.js $D/cmcore.js $D/$2"3.js" > $S/$1/build/scene.js
