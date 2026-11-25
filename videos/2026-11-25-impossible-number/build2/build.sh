#!/bin/bash
# concatenates the recipes + scene parts into scene.js
cd "$(dirname "$0")" && cat src/*.js > scene.js && echo "scene.js: $(wc -c < scene.js) bytes"
