#!/bin/bash
# usage: ss5.sh <cutdir> <yt|tt|ig> t1 t2 ...
D=$1; C=$2; shift 2
cd /home/user/badmathyt/videos/2026-11-27-million-vs-billion
bash _src/build5.sh $D $C
node /home/user/badmathyt/brand/engine-v2/bm2.cjs check $D/build 2>&1 | grep -i "error\|FAIL\|^OK\|PAGE\|not in\|unknown" | head -20
T=$(echo "$@" | tr ' ' ',')
rm -rf $D/build/stills; node /home/user/badmathyt/brand/engine-v2/bm2.cjs stills $D/build $T 2>&1 | tail -1
