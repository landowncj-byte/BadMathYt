#!/bin/bash
# usage: ss5.sh <cutdir> <yt5|tt5|ig5> t1 t2 ...   -> build, check, stills, montage
D=$1; C=$2; shift 2
cd /home/user/badmathyt/videos/2026-11-26-penny-doubled
bash _src/build5.sh $D $C
node /home/user/badmathyt/brand/engine-v2/bm2.cjs check $D/build 2>&1 | grep -i "error\|FAIL\|^OK\|PAGE\|not in\|unknown"
T=$(echo "$@" | tr ' ' ',')
rm -rf $D/build/stills; node /home/user/badmathyt/brand/engine-v2/bm2.cjs stills $D/build $T 2>&1 | tail -1
