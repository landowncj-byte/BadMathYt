# RENDER QUEUE (cloud session → PC session)

| # | Folder | Cuts | Status | Notes |
|---|---|---|---|---|
| 7 | videos/2026-11-26-fake-prince | yt, tiktok, ig | waiting for scene | CRIME-SHOW rebuild (RULES 112). The earlier yt render is outdated |
| 8 | videos/2026-11-26-lottery-rig | yt, tiktok, ig | waiting for scene | CRIME-SHOW rebuild |
| 9 | videos/2026-11-26-weight-vs-height | yt, tiktok, ig | waiting for scene | Owen voice re-edit |
| 10 | videos/2026-11-26-fake-wine | yt, tiktok, ig | waiting for scene | CRIME-SHOW rebuild |
| 11 | videos/2026-11-26-penny-doubled | ig | waiting for scene | |
| 12 | videos/2026-11-26-three-briefcases | yt, tiktok, ig | waiting for scene | Owen voice re-edit |

Jobs 1–6 (before 05:30 UTC) are retired: those scenes were replaced by the crime-show rebuild. Only render rows marked `todo`. "waiting for scene" = the cloud has not pushed the scene yet; check again on the next pull.

Loop (PC session): every ~5 min `git pull`; render each `todo` row with `BM2_GPU=1`, one cut at a time; mix; captions; sheet; set the row to `done (<render s>)`; commit only those outputs; push. Rules: render only jobs whose scene files are committed (`<cut>/build/scene.js` newer than the voice files). Never post, never edit scripts or voice files. If a render fails, set the status to `failed: <reason>` and push.
