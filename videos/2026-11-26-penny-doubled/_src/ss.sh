#!/bin/bash
# usage: ss.sh <cutdir> <yt|tt|ig> t1 t2 ...   -> build, check, stills, montage (build/stills_m.png)
D=$1; C=$2; shift 2
cd /home/user/badmathyt/videos/2026-11-26-penny-doubled
bash _src/build.sh $D $C
node /home/user/badmathyt/brand/engine-v2/bm2.cjs check $D/build 2>&1 | grep -i "error\|FAIL\|^OK"
T=$(echo "$@" | tr ' ' ',')
node /home/user/badmathyt/brand/engine-v2/bm2.cjs stills $D/build $T 2>&1 | tail -1
args=""; for t in "$@"; do args="$args $(printf '%06.2f' $t)"; done
python3 _src/m.py $D/build $args
