#!/bin/bash
# usage: ss.sh <cutdir> <cutfile> t1 t2 ...   (build + stills + labelled sheets in <cut>/build/sheet_NN.png)
D=$1; K=$2; shift 2; cd /home/user/badmathyt/videos/2026-12-04-stanford-ponzi
bash _src/build.sh $PWD $D $K
node /home/user/badmathyt/brand/engine-v2/bm2.cjs check $D/build 2>&1 | grep -iE "error|fail|not in|unknown|CS:|^OK" | head
T=$(echo "$@" | tr ' ' ','); rm -rf $D/build/stills; node /home/user/badmathyt/brand/engine-v2/bm2.cjs stills $D/build $T 2>&1 | tail -1
rm -f $D/build/sheet_*.png; python3 /home/user/badmathyt/brand/tools/crime_sheet.py $D/build/stills $D/build/sheet ${COLS:-4} ${PER:-8} ${TW:-405}
