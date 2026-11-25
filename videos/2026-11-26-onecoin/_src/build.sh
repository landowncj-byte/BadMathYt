#!/bin/bash
# usage: build.sh <cutdir: . | tiktok | ig> <yt|tt|ig>
S=/home/user/badmathyt/videos/2026-11-26-onecoin
T=/home/user/badmathyt/videos/2026-11-25-tucker-payday/_src/shared.js
{ echo "// ===== OneCoin — shared custom recipes ====="; echo "(function () {"; sed -n 3,4p $T; sed -n 175,183p $T; sed -n 157,167p $T; sed -n 285,295p $T; sed -n 308,316p $T; cat $S/_src/oc.part; echo "})();"; cat $S/_src/$2.js; } > $S/$1/build/scene.js
