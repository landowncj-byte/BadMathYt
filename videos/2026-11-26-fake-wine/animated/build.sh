#!/bin/sh
cd "$(dirname "$0")/src" && cat 00-head.js [0-9][0-9]-s*.js 99-tail.js > ../scene.js && echo "scene.js: $(wc -c < ../scene.js) bytes"
