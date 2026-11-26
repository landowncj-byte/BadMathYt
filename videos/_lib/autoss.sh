#!/bin/bash
# usage: autoss.sh <topic dir> <cutdir> <cutfile> [offset=2.0]  -> build, one still per scene (start+offset, clipped), sheets in <cut>/build/sheet_NN.png
T=$1; D=$2; K=$3; OFF=${4:-2.0}; R=/home/user/badmathyt; cd $T
bash _src/build.sh $PWD $D $K
node $R/brand/engine-v2/bm2.cjs check $D/build 2>&1 | grep -iE "error|fail|not in|unknown|^OK" | head -5
node $R/videos/_lib/dbg.cjs $D/build 2>&1 | grep CS: | head
LIST=$(node $R/videos/_lib/dbg.cjs $D/build 2>&1 | grep '@' | grep -v CS: | tail -1)
TS=$(python3 - "$LIST" "$OFF" <<'PY'
import sys
L=[x.split('@') for x in sys.argv[1].split()]; off=float(sys.argv[2]); st=[float(b) for a,b in L]
out=[]
for i,t in enumerate(st):
    e=st[i+1] if i+1<len(st) else t+4
    out.append(round(min(t+off, e-0.25),2) if i else round(min(0.4+off*0.2,e-0.2),2))
print(','.join(str(x) for x in out))
PY
)
echo "stills at $TS"
rm -rf $D/build/stills; node $R/brand/engine-v2/bm2.cjs stills $D/build $TS 2>&1 | tail -1
rm -f $D/build/sheet_*.png; python3 $R/brand/tools/crime_sheet.py $D/build/stills $D/build/sheet ${COLS:-5} ${PER:-10} ${TW:-324}
