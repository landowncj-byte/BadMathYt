#!/bin/bash
# concatenates the recipes + scene parts into scene.js (duration = narration + 12 s end card)
cd "$(dirname "$0")" || exit 1
DUR=$(python3 -c "import json;print(round(json.load(open('../align/timeline.json'))['duration']+12.4,2))")
cat src/0[0-3]*.js ../../../brand/engine-v2/crime.js src/0[4-9]*.js src/[1-9]*.js | sed "s/__DUR__/$DUR/" > scene.js && echo "scene.js: $(wc -c < scene.js) bytes, duration $DUR"
