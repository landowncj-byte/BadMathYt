#!/bin/bash
# usage: build.sh <topic dir> <cut dir: . | tiktok | ig> <cutfile (yt|tt|ig)>
T=$1; C=$2; K=$3; R=/home/user/badmathyt; L=$R/videos/_lib
mkdir -p $T/$C/build
[ -f $T/$C/build/scene.html ] || node $R/brand/engine-v2/bm2.cjs init $T/$C/build --voice $T/$C/voice --series $(cat $T/voice/series.txt) >/dev/null
node $R/brand/engine-v2/bm2.cjs voice $T/$C/build $T/$C/voice >/dev/null
cat $L/cs_ref.js $R/brand/engine-v2/crime.js $L/cs.js $L/mk.js $T/_src/topic.js $T/_src/$K.js > $T/$C/build/scene.js
