#!/bin/bash
# st.sh out.png t1 t2 ... : render stills at those times and tile them 3 per row
cd /home/user/badmathyt && OUT=$1; shift; T=$(echo "$@" | tr ' ' ',')
D=videos/2026-11-25-impossible-number/build2
rm -rf $D/stills; node brand/engine-v2/bm2.cjs stills $D $T $D/stills >/dev/null 2>&1 || node brand/engine-v2/bm2.cjs stills $D $T $D/stills 2>&1 | head
python3 $D/tiles.py $OUT 3 $D/stills "$@"
