# QA — Card minimum v3 (series: WHAT IF; arithmetic only, no accusations)
RE-EDIT (CRIME-SHOW pass): new v3 scripts + final Owen voices. Sources of truth: `_src/{shared,simdata,cm,cmcore,yt3,tt3,ig3}.js` (`_src/build3.sh`; YOU recipe from the What If cast in `videos/2026-11-26-weight-vs-height/_src/chars.js`). `build/AV.md` per cut. Facts: `research/2026-11-25/card-minimum-payment/research.md` (month-by-month simulation embedded in `_src/simdata.js`).

## Cuts
| Cut | file | duration | size | LUFS | true peak | narration+0.4 |
|---|---|---|---|---|---|---|
| YouTube | `videos/2026-11-25-card-minimum/video.mp4` | 66.00 s | 18.2 MB | -14.0 | -1.323487 dBFS | 66.01 s |
| TikTok | `videos/2026-11-25-card-minimum/tiktok/video.mp4` | 68.20 s | 18.7 MB | -13.9 | -1.125107 dBFS | 68.19 s |
| IG/FB | `videos/2026-11-25-card-minimum/ig/video.mp4` | 66.83 s | 18.2 MB | -14.0 | -1.404436 dBFS | 66.82 s |

## Characters / recurring cast (camera-focus appearances, count · seconds in focus · start times)
- **YouTube** (66.0 s): YOU (card holder): 18 appearances, 32 s (48%), at [0.0, 3.9, 7.1, 14.3, 17.9, 24.9, 26.5, 30.3, 30.4, 38.8, 42.8, 43.3, 44.3, 45.5, 46.7, 54.8, 60.2, 65.1]
- **TikTok** (68.2 s): YOU (card holder): 13 appearances, 31 s (45%), at [0.0, 6.9, 12.1, 15.6, 19.3, 23.9, 33.4, 35.1, 45.2, 49.7, 56.9, 60.4, 67.2]
- **IG/FB** (66.8 s): YOU (card holder): 17 appearances, 29 s (44%), at [0.0, 7.0, 12.0, 14.8, 19.6, 20.0, 26.8, 32.0, 41.7, 45.7, 45.7, 46.2, 47.2, 48.8, 56.3, 59.5, 65.7]

## script_gate.py --all (real timings)
```
PASS  YouTube (whatif) cut · 15 lines · 200 words · 65.7 s (voiced timings) · videos/2026-11-25-card-minimum/voice/script.json
PASS  TikTok (whatif) cut · 17 lines · 203 words · 67.9 s (voiced timings) · videos/2026-11-25-card-minimum/tiktok/voice/script.json
PASS  IG/FB (whatif) cut · 18 lines · 200 words · 66.5 s (voiced timings) · videos/2026-11-25-card-minimum/ig/voice/script.json
```

## VIDEO GATE (YT / TT / IG)
| # | Result | Note |
|---|---|---|
| V1 | PASS x3 (see block) | script_gate.py --all on the real sentences.json (warnings only) |
| V2 | YES x3 | watched via keyframe stills at every beat |
| V3 | YES x3 | frame 0 = hook text + YOU holding the card + the LIVE strip already showing month 0, $5,000 owed and the split payment bar; deep boom at 0 s |
| V4 | YES | picture changes at least every ~2.5 s (camera, bars building, calendar pages, counters) |
| V5 | YES | push-ins on $5,000 / 22% / $143 / $93 / $50 / $2,736 / 16.5 / $12,811 / $250 / 26 / 14; storyteller front / beside |
| V6 | YES | heart, paper plane, +FOLLOW tap, comment bubble; all <= 1.5 s |
| V7 | YES | payoff = 14 YEARS FASTER stamp + ghost lane DONE; loops to frame 0 |
| V8 | YES | brand lock intact; no glow |
| V9 | YES | numbers from the simulation / research table; footnote carries the assumptions |
| V10 | YES | captions from script words; "$2 .50" fixed to $250; IG profanity F***ING |
| V11 | not re-listened | Owen voices are final |
| V12 | YES | CC0 sfx only; -14 LUFS, peak <= -1 dBTP; TikTok bed -12 dB |
| V13 | n/a | not posted |

## On-screen facts (research/2026-11-25/card-minimum-payment/research.md; live strip = real month-by-month simulation)
| On screen | Value |
|---|---|
| balance / APR | $5,000 · 22.36% (Fed G.19 Q3 2026 via LendingTree; "about 22%" voiced) |
| minimum rule | 1% of balance + that month's interest, $35 floor (assumption in footnote) |
| month 1 | pays $143.17 = $93.17 interest + $50.00 debt (65% / 35% bar, true proportions) |
| payments shrink | month 1 $143 -> month 60 $79 (bars show red interest / green debt per month from the simulation) |
| after 5 years (month 60) | still owe $2,736 |
| payoff | 198 months = 16.5 years |
| totals | paid $12,811 · interest $7,811 |
| fixed $250 | 26 months (live ghost row counts months 0 -> 26 and balance to $0); $1,315 interest not shown |
| 14 years faster | 16.5 - 2.2 years (arithmetic: 198 - 26 = 172 months = 14.3 years) |
| kid born that day | 16.5 years -> age 16, "learning to drive" (comparison only) |
YOU, the card, shopping bags, kid are ILLUSTRATIONS (no brands, no bank names).

## CRIME-SHOW BUILD STATUS
RENDERED READY: videos/2026-11-25-card-minimum/video.mp4 66.0s 18.9MB — FIXED 2026-11-26 10:16Z (final 'fix' section: 16.5 YEARS headline shrunk to fit with margin, ghost-row zoom reframed, 'SAME MATH' tag moved off the ghost label, 'THE MINIMUM =' text now exits before the payment bar, fee text moved off the $143.17/$93.17 labels; bed gameshow_bed_1 per RULES 115; -14 LUFS)
RENDERED READY: videos/2026-11-25-card-minimum/tiktok/video.mp4 68.2s 19.2MB — FIXED 2026-11-26 10:16Z (final 'fix' section: 16.5 YEARS headline shrunk to fit with margin, ghost-row zoom reframed, 'SAME MATH' tag moved off the ghost label, 'THE MINIMUM =' text now exits before the payment bar, fee text moved off the $143.17/$93.17 labels; bed gameshow_bed_1 per RULES 115; -14 LUFS)
RENDERED READY: videos/2026-11-25-card-minimum/ig/video.mp4 66.8s 19.2MB — FIXED 2026-11-26 10:16Z (final 'fix' section: 16.5 YEARS headline shrunk to fit with margin, ghost-row zoom reframed, 'SAME MATH' tag moved off the ghost label, 'THE MINIMUM =' text now exits before the payment bar, fee text moved off the $143.17/$93.17 labels; bed gameshow_bed_1 per RULES 115; -14 LUFS)
