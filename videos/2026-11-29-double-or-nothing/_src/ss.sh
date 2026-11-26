#!/bin/bash
# usage: ss.sh <cutdir> <yt|tt|ig> t1 t2 ...  (build, check, stills, montage)
D=$1; C=$2; shift 2
cd /home/user/badmathyt/videos/2026-11-29-double-or-nothing
bash _src/build5.sh $D $C
node /home/user/badmathyt/brand/engine-v2/bm2.cjs check $D/build 2>&1 | grep -iE "error|fail|^OK|not in|unknown|PAGE" | head -20
T=$(echo "$@" | tr ' ' ',')
rm -rf $D/build/stills; node /home/user/badmathyt/brand/engine-v2/bm2.cjs stills $D/build $T 2>&1 | tail -1
python3 /home/user/badmathyt/videos/2026-11-26-penny-doubled/_src/mont.py $D/build/stills $D/build/stills_m.png ${COLS:-6} 360
