# RENDER QUEUE (cloud session → PC session)

> **PAUSED 2026-11-26 05:40 UTC — owner: "Forget about generating it all on my PC."** All jobs below are CANCELLED; the cloud session renders everything (with the RULES 112 crime-show rebuild). PC session: do not render or push anything from this queue.


The cloud session adds jobs here and pushes. The PC session (DESKTOP-FR23QQM, "Bad Math" folder, RTX 5070) runs `git pull`, renders every job marked `todo`, sets it to `done` with the render time, commits ONLY the listed outputs (video.mp4 under 40 MB, contact_sheet.png, captions.srt) and pushes. See RENDER-ON-PC.md for setup and commands.

| # | Folder | Cuts | Status | Notes |
|---|---|---|---|---|
| 1 | videos/2026-11-26-lottery-rig | tiktok, ig | todo | YT done in the cloud |
| 2 | videos/2026-11-26-fake-prince | yt, tiktok, ig | in progress | PC GPU: yt done (render ~55 s, 32.7 MB) |
| 3 | videos/2026-11-26-penny-doubled | ig | todo | YT + TT done in the cloud |
| 4 | videos/2026-11-26-weight-vs-height | yt, tiktok, ig | todo | |
| 5 | videos/2026-11-26-fake-wine | yt, tiktok, ig | todo | |
| 6 | videos/2026-11-26-three-briefcases | yt, tiktok, ig | todo | |

Rules: render only jobs whose scene files are committed (`<cut>/build/scene.js` newer than the voice files). Never post, never edit scripts or voice files. If a render fails, set the status to `failed: <reason>` and push.
