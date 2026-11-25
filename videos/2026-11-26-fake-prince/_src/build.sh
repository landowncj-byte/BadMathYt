#!/bin/bash
# usage: build.sh <cut-dir-relative-to-folder or .> <yt|tt|ig>
S=/home/user/badmathyt/videos/2026-11-26-fake-prince
cat $S/_src/shared.js $S/_src/reuse.js $S/_src/wine_bits.js $S/_src/shared2.js $S/_src/$2.js > $S/$1/build/scene.js
