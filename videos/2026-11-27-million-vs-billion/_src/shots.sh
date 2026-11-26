#!/bin/bash
# shots.sh <cutdir> <yt|tt|ig> <cols> t1 t2 ...  -> build, stills, montage
D=$1; C=$2; COLS=$3; shift 3
cd /home/user/badmathyt/videos/2026-11-27-million-vs-billion
bash _src/build5.sh $D $C
node /home/user/badmathyt/brand/engine-v2/bm2.cjs check $D/build 2>&1 | grep -iE "error|fail|not in|unknown" | head
rm -rf $D/build/stills; node /home/user/badmathyt/brand/engine-v2/bm2.cjs stills $D/build $(echo "$@" | tr ' ' ',') 2>&1 | tail -3
python3 ../2026-11-26-penny-doubled/_src/mont.py $D/build/stills $D/build/stills_m.png $COLS 360
