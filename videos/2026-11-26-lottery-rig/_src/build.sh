#!/bin/bash
# usage: build.sh <cut-dir-relative-to-topic or .> <yt|tt|ig>
S=/home/user/badmathyt/videos/2026-11-26-lottery-rig
cat $S/_src/shared.js $S/_src/$2.js > $S/$1/build/scene.js
