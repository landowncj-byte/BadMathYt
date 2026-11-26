#!/bin/bash
# usage: build.sh <cut dir rel to slug: . | tiktok | ig> <yt|tt|ig>   (v3, 2026-11-25 re-edit)
S="$(cd "$(dirname "$0")/.." && pwd)"
cat $S/_src/chars.js $S/_src/cases.js $S/_src/v3.js $S/_src/$2.js > $S/$1/build/scene.js
