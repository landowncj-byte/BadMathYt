#!/bin/bash
# usage: build.sh <cutdir relative to bitconnect, '.' for YT> <yt|tt|ig>
S=/home/user/badmathyt/videos/2026-11-25-bitconnect
{ echo "// ===== BitConnect — shared custom recipes ====="; echo "(function () {"; cat $S/_src/head.part $S/_src/mid.part $S/_src/plane.part $S/_src/v3.part; echo "})();"; cat $S/_src/$2.js; } > $S/$1/build/scene.js
