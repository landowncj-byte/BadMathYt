#!/bin/bash
# usage: rendercut.sh <topic-dir> <cut: . | tiktok | ig> <cut.js>    gen -> check -> render -> finalize (mix/srt/sheet/stats)
T=$1; C=$2; J=$3; R=/home/user/badmathyt; cd $R
[ "$C" = "." ] && CUT=$T || CUT=$T/$C
python3 $T/_src/gen.py $C $J || exit 1
node brand/engine-v2/bm2.cjs check $CUT/build 2>&1 | grep -iE "error|fail" && exit 1
node brand/engine-v2/bm2.cjs render $CUT/build --force --crf 23 2>&1 | tail -3
if [ "$C" = "tiktok" ]; then BM2_BED_DB=-12 bash brand/tools/crime_finalize.sh $CUT; else bash brand/tools/crime_finalize.sh $CUT; fi
echo "DONE $CUT"
