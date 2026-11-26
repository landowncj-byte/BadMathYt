# QA: penny-doubled (What If, engine v2) 2026-11-25
Scripts/voice untouched. Sources: `_src/shared.js` (custom recipes hookart/ab/board/dealchips) + `ref_recipes.js`/`ref_plane.js` (chip, heart, plane copied from one-percent-fee) + yt/tt/ig.js (`_src/build.sh <cut> <yt|tt|ig>`). No engine files changed.
| Cut | File | Narration | Video | Size |
|---|---|---|---|---|
| YouTube | video.mp4 | 44.35 s | 44.77 s | 31.9 MB (crf 22) |
| TikTok | tiktok/video.mp4 | 33.72 s | 34.13 s | 21.8 MB |
| IG/FB | ig/video.mp4 | 19.83 s | 20.23 s | 15.0 MB |
Mix: -14.0 LUFS, true peak -1.32 / -1.33 / -1.15 dBFS. Sounds: brand/sfx-library only (CC0). Contact sheets: 1 fps, timestamped, `contact_sheet.png` per cut. captions.srt from sentences.json (3 files).

## On-screen facts (all from research.md; no day-31 / $10.7M figure)
| On screen | Value | research.md |
|---|---|---|
| Day 10 | $5.12 | spine row |
| Day 20 | $5,242.88; million "≈190× bigger" | spine row / 190.7× |
| Day 27 | $671,088.64, still behind | spine row |
| Day 28 | $1,342,177.28, first day ahead (meter 134%) | spine row |
| Day 30 | $5,368,709.12; meter 537% (5.37×) | spine row / derived |
| Pie | 87.5% in the last 3 days (slice "DAYS 1-27" is the remainder, unlabelled %) | derived |
| Calendar tiles | every day 1-30 = 0.01 x 2^(n-1), computed in code (exact) | formula |
| Labels | OUR MATH (board header + footnote), HYPOTHETICAL chip, ASSUMES footnote (1c on day 1, doubles daily, 30 days, no taxes/interest), NOT FINANCIAL ADVICE | assumptions |
Note: the penny stack is drawn at a minimum coin height (about 14 px) so it is visible; the meter and numbers are to true scale.

## VIDEO GATE
| # | YT | TT | IG |
|---|---|---|---|
| V1 script_gate --all | PASS | PASS (warn 87 words > 75 target) | PASS |
| V2 watched (1-fps sheet + stills) | Y | Y | Y |
| V3 frame 0 slam + full hook text, hit sound | Y (brick+penny slam, hook 3 lines) | Y (penny slap, brick yanked) | Y (A/B buttons are the hook, brick+penny under them) |
| V4 change every 2-3 s, no layout >~4 s | mostly; 9.9-11.8 s calendar + question text is a camera nudge only | Y | Y |
| V5 push-ins on numbers, storyteller travels | Y | Y | Y |
| V6 heart / plane / +FOLLOW / bubble | Y all four | Y all four | heart, plane, bubble (no follow ask in script) |
| V7 payoff biggest hit, ends <= ~6 s after | boom at 39.5 s, ends 5.3 s later | boom 28.5 s, ends 5.6 s later | boom 13.55 s (67%), ends 6.7 s later |
| V8 brand lock, no neon | Y | Y | Y |
| V9 numbers = research.md, HYPOTHETICAL / ASSUMES | Y | Y | Y |
| V10 captions from sentences wording, no [tags] | Y | Y | Y (script words kept as spoken) |
| V11 voice | not re-listened (voice untouched) | same | same |
| V12 CC0 sfx, -14 LUFS, peak <= -1 dBTP | Y (sample peak) | Y | Y |
| V13 post settings | not part of this build | | |

## CRIME-SHOW BUILD STATUS
v5 rebuild (director rejected the v3 ig render: cropped hook, cut-off numbers, blurry stacked boards). New stage `_src/pd5.js` + `_src/pdmk.js` + yt5/tt5/ig5.js (`_src/build5.sh <cut> <yt5|tt5|ig5>`): everything is drawn in screen space (camera cannot crop it), ONE idea per scene, every number auto-fitted to <= 920 px (margin >= 70 px), real coin grids (1 -> 512 coins, each doubling = a copy of the same coins slides in), live day/$ counter, true-scale million-brick vs penny-tower bars, YOU card + storyteller in the bottom row, nothing in the caption band. Voice untouched (Owen, `bm2.cjs voice` re-synced).
RENDERED READY: penny-doubled/video.mp4 (YouTube) 70.97s 14.7MB (-14.0 LUFS, -1.26 dBTP)
RENDERED READY: penny-doubled/tiktok 68.70s 14.3MB (-14.0 LUFS, -1.32 dBTP, bed -12 dB)
RENDERED READY: penny-doubled/ig 68.23s 14.2MB (-14.0 LUFS, -1.30 dBTP)
Gate: script_gate --all PASS x3; keyframe sheets + final 6x4 contact sheets of all three cuts viewed; no cropped text / cut-off numbers / overlapping cards found after fixes. Residuals: plane trail crosses the HYPOTHETICAL chip for ~1 s on the SEND beat; the day-20 bar scene (about 10 s) changes only through note chips and the counter.
