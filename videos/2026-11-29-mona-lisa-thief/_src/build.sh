#!/bin/bash
# usage: build.sh <cut-dir-relative-to-topic or .> <yt|tt|ig>
D="$(cd "$(dirname "$0")" && pwd)"; S="$(dirname "$D")"; R="$(dirname "$(dirname "$S")")"; P=$R/videos/2026-11-26-fake-prince/_src; U=$R/videos/2026-11-25-tucker-payday/_src
cat $U/shared.js $P/wine_bits.js $P/shared2.js $R/brand/engine-v2/crime.js $D/lisa_bits.js $D/gen.js $D/cfg_$2.js > $S/$1/build/scene.js
