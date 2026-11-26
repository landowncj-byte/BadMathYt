#!/bin/bash
# usage: build.crime.sh <cut-dir-relative-to-topic or .> <yt|tt|ig>
D="$(cd "$(dirname "$0")" && pwd)"; S="$(dirname "$D")"; R="$(dirname "$(dirname "$S")")"; P=$R/videos/2026-11-26-fake-prince/_src
cat $D/shared_j.js $D/heartmag.js $P/wine_bits.js $P/shared2.js $R/brand/engine-v2/crime.js $D/gen.js $D/cfg_$2.js > $S/$1/build/scene.js
