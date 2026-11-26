# QA: weight-vs-height (What If, engine v2) — RE-EDIT v3, 2026-11-25
Scripts/voice untouched (voice/ v3). Sources: _src/recipes.js + recipes2.js (new: offer, gram, rows, calendar, totals) + yt.js / tt.js / ig.js (build.sh <cut> <yt|tt|ig>); v1 scenes kept as *.v1.js. No engine files changed.
| Cut | File | Narration | Video | Size | Loudness |
|---|---|---|---|---|---|
| YouTube | video.mp4 | 70.89 s | 71.20 s | 19.4 MB | -14.0 LUFS, -1.3 dBTP |
| TikTok | tiktok/video.mp4 | 65.64 s | 66.03 s | 17.9 MB | -14.0 LUFS, -1.3 dBTP |
| IG/FB | ig/video.mp4 | 65.69 s | 66.10 s | 17.3 MB | -14.0 LUFS, -1.4 dBTP |
captions.srt from sentences.json; 1-fps contact_sheet.png per cut. script_gate --all: PASS x3.
Photos: D.L. (CC BY-SA 2.0) scale; THE.COMEDIAN (CC BY 2.0) $100 stack, via Flickr (footnote).
On-screen numbers all from beats-v3 math: 199.0 lb, 68.9 in, 90,264 x $20 = $1,805,280, 16,023 x $100 = $1,602,300, gap $202,980, 454 bills/lb ($9,080 counter), 233 bills/in, 2,030 days = 5.6 yrs, x2.56 (5'4"=164, 5'9"=177, 6'0"=185 lb).
## VIDEO GATE (YT / TT / IG)
V1 PASS all. V2 1-fps sheets viewed: Y. V3 frame 0 slam + hook: Y. V4 change every ~2.5 s: mostly; TT cheat-code card 50-57 s and IG 56-58 s hold longer with only counters/camera drift. V5 push-ins + travelling storyteller: Y. V6 heart/plane/follow/bubble: Y (TT heart on 'heart', IG on 'tap'). V7 payoff hit ~80% (YT 83%, IG 83%, TT slider 85%); loops to frame 0. V8 no neon: Y. V9 numbers/HYPOTHETICAL/ILLUSTRATION: Y. V10 captions from script words; hook caption shows "$200,000" (spoken "two hundred grand"). V11 voice listen-check not done. V12 CC0 sfx, -14 LUFS: Y.
## Doubts
- Scene durations are narration+0.3/0.4 (YT 71.20 vs 71.29).
- Inch stack (1 in) is small on screen; relies on the zoom beat.
- 1-second test / per-beat keyframe sheet done via stills on YT and TT; IG went straight to render after check.

## CRIME-SHOW BUILD STATUS (2026-11-26, RULES 112)
Re-edit on top of the Owen-timed scenes (voice re-synced with `bm2.cjs voice`, `check` OK on all three; durations = narration + 0.4 s: YT 65.48, TT 64.09, IG 65.40; all > 60 s). NOT rendered here: full render + mix + loudness + final gate run on the owner's PC (director queues it).
What changed: recurring cast (`_src/chars.js`): YOU = orange-hoodie player in the bottom-left corner with a reaction face per spoken beat (28/23/23 mood changes; name plate on entry; same design every time), THE STRANGER (top hat + monocle) stands between the two piles in the offer scene, the AVG US MAN card is YOU on the CDC card, beat labels THE BET / THE TWIST / THE ANSWER pinned in the HUD row. Storyteller coin stays right (no `corner-left`). `build/AV.md` per cut = line to picture to trigger word; `build/keyframes.png` = keyframe sheet (per beat) viewed and fixed. Build: `_src/build.sh <cut> <yt|tt|ig>`. Assets (photos in brand/photos/stock, sfx, fonts) are repo-relative.
Engine fix: `brand/engine-v2/bm2.cjs` line 16 had a `//` comment that swallowed the rest of the line (`p is not defined`), changed to `/* */` so check/stills/render run again.
- YouTube: SCENE READY: weight-vs-height (root) — render/mix/loudness pending on PC
- TikTok: SCENE READY: weight-vs-height/tiktok — render/mix/loudness pending on PC
- IG/FB: SCENE READY: weight-vs-height/ig — render/mix/loudness pending on PC
Known: video.mp4 / captions.srt / contact_sheet.png in the folders are the previous build (stale until the PC render); captions.srt must be rebuilt from sentences.json after render.
RENDERED READY: weight-vs-height (YouTube) 65.47s 18.9MB (-14.0 LUFS, -1.4 dBTP, 1080x1920 30fps; re-encoded crf 25). Contact sheet contact_sheet.png (1 fps) viewed, captions.srt rebuilt from sentences.json.
