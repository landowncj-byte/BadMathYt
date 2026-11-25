#!/bin/bash
# usage: build.sh <cut dir rel to slug> <yt2|tt2|ig2>
S=/home/user/badmathyt/videos/2026-11-25-one-percent-fee
cat $S/_src/shared2.js $S/_src/recipes.js $S/_src/$2.js > $S/$1/build/scene.js
