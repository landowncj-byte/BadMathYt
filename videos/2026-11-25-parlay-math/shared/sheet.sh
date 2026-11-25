#!/bin/bash
# usage: sheet.sh "t1,t2,..." out.png [cols]  (run inside build/)
rm -rf stills; node render.cjs stills "$1" stills || exit 1
montage $(ls stills/*.png | sort) -label '%f' -tile ${3:-6}x -geometry 360x640+4+4 -background '#222' -fill white "$2"
