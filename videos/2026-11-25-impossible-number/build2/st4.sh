#!/bin/bash
# st4.sh outprefix t1 t2 ... : stills at those times, 4 columns x 5 rows per sheet
cd /home/user/badmathyt; P=$1; shift; D=videos/2026-11-25-impossible-number/build2; n=0; set -- "$@"
while [ $# -gt 0 ]; do
  chunk=(); for i in $(seq 1 20); do [ $# -gt 0 ] && chunk+=("$1") && shift; done
  T=$(IFS=,; echo "${chunk[*]}"); rm -rf $D/stills; node brand/engine-v2/bm2.cjs stills $D "$T" $D/stills >/dev/null 2>&1
  python3 - "$P-$n.png" $D/stills "${chunk[@]}" <<'PY'
import sys
from PIL import Image, ImageDraw
out, d = sys.argv[1], sys.argv[2]; ts = [float(x) for x in sys.argv[3:]]; tw, th = 480, 270; cols = 4; rows = (len(ts) + 3) // 4
W = Image.new('RGB', (cols * tw, rows * th)); dr = ImageDraw.Draw(W)
for i, t in enumerate(ts):
    try: im = Image.open(f"{d}/s_{t:06.2f}.png").resize((tw, th))
    except Exception: continue
    W.paste(im, ((i % cols) * tw, (i // cols) * th)); dr.rectangle([(i % cols) * tw, (i // cols) * th, (i % cols) * tw + 56, (i // cols) * th + 14], fill=(0, 0, 0)); dr.text(((i % cols) * tw + 3, (i // cols) * th + 2), f"{t:.1f}", fill=(255, 255, 0))
W.save(out)
PY
  n=$((n+1))
done
