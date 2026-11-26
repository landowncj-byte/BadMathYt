# QA — tucker-payday (Decoded) — CRIME-SHOW RE-EDIT 2026-11-26 (RULES 112, new v3 scripts + final Owen voices)
Background music beds (RULES 115): verdict_bed_2 on all three cuts.
## CRIME-SHOW BUILD STATUS
<!--S-->
RENDERED READY: YouTube(root) 83.1s 32.6MB
RENDERED READY: TikTok(tiktok/) 77.2s 30.6MB
RENDERED READY: IG/FB(ig/) 82.9s 32.6MB
<!--/S-->

Engine v2, series decoded. Scenes are generated: `_src/gen.js` (one story builder) + `_src/cfg_yt|tt|ig.js` (per-cut @word refs) + `_src/build.crime.sh <cut> <yt|tt|ig>` (concatenates recipes + `brand/engine-v2/crime.js`). Per-cut line-by-line visuals: `<cut>/build/AV.md`. Voice files untouched (`bm2.cjs voice` only re-read words.json). Rendered in the cloud with `bm2.cjs render --jobs 3 --chunk 28 --crf 23`; mixed with `mix.py` (TikTok with `BM2_BED_DB=-12`, RULES 113); captions.srt from sentences.json.

**The bad guy: REAL PHOTO.** Scott Tucker portrait, file `brand/photos/scott-tucker/1.jpg` = Wikimedia Commons File:ScottTuckerRaceCarDriver.jpg, "Scott Tucker, Race Car Driver", author Level 5 Motorsports, licence CC BY-SA 2.0 (checked on the file page and by eye: clean portrait, right man, no watermark). Credit is in every footnote and on the card ("PHOTO: LEVEL 5 MOTORSPORTS · CC BY-SA 2.0"). Added to brand/photos/VERIFIED.md.

## Durations / sizes / loudness
| Cut | Narration | Video | File | Size | Loudness |
|---|---|---|---|---|---|
| YouTube (root) | 82.68 s | 83.07 s | video.mp4 | 32.6 MB | -14.0 LUFS, peak -1.3 dBFS |
| TikTok | 76.79 s | 77.20 s | tiktok/video.mp4 | 30.6 MB | -14.1 LUFS, peak -1.3 dBFS |
| IG/FB | 82.50 s | 82.90 s | ig/video.mp4 | 32.6 MB | -14.0 LUFS, peak -1.3 dBFS |

## Suspect appearances (seconds on screen; Scott Tucker)
Different crime-show treatment each time (CRIME-SHOW §1). Windows are element windows from the @word refs (approx. 0.3 s).

- **YouTube (root)** — A cold open face 0.0-4.5 · B case-file intro 4.5-8.6 · C PiP HIS FORM 12.5-16.0 · D PiP HIS FEES 21.9-23.2 · E PiP HIS LOAN 33.9-39.3 · F PiP HIS TEAM 52.2-56.4 · G PiP HIS SHIELD 56.4-66.2 · H evidence board 66.2-69.8 · I ARRESTED X 69.8-71.5 · J verdict stamp + bars 71.5-78.5 · K loop frame 78.5-83.1 · full-size card 25 s (31%), with picture-in-picture 50 s (60%) of 83.1 s. 11 appearances.
- **TikTok** — A cold open face 0.0-4.1 · B case-file intro 4.1-7.4 · C PiP HIS FORM 14.9-17.7 · D PiP HIS FEES 24.5-25.8 · E PiP HIS LOAN 31.8-38.0 · G PiP HIS SHIELD 50.8-58.6 · H evidence board 58.6-62.7 · I ARRESTED X 62.7-64.6 · J verdict stamp + bars 64.6-75.8 · K loop frame 75.8-77.2 · full-size card 26 s (34%), with picture-in-picture 44 s (57%) of 77.2 s. 10 appearances.
- **IG/FB** — A cold open face 0.0-4.4 · B case-file intro 4.4-8.9 · C PiP HIS FORM 16.2-19.0 · D PiP HIS FEES 27.3-28.3 · E PiP HIS LOAN 35.4-42.2 · F PiP HIS TEAM 55.1-57.5 · G PiP HIS SHIELD 57.5-67.2 · H evidence board 67.2-69.9 · I ARRESTED X 69.9-71.7 · J verdict stamp + bars 71.7-79.5 · K loop frame 79.5-82.9 · full-size card 25 s (30%), with picture-in-picture 47 s (57%) of 82.9 s. 11 appearances.

## Mute test (CRIME-SHOW §5)
With sound off the sheets show who (photo card + SCOTT TUCKER + THE PAYDAY LENDER), what he/she did (LOAN DISCLOSURE $500 -> $650 rolling to $1,925; claw taking $150 every payday while STILL OWED $500 never moves; tribe shield stamped A SHAM), the numbers (4.5M borrowers, $3.5B, ~700%, 14 counts, 200 months), and what happened (ARRESTED 2016 stamp, GUILTY stamp + jail bars). PASS.

## On-screen facts (source: research/2026-11-25/tucker-payday-loans/research.md)
- $500 loan, disclosure total $650 (generic recreation, labelled ILLUSTRATION); finance charge $150 per payday, principal untouched; DOJ example borrower paid $1,925; "about 700% a year" attributed to prosecutors/DOJ; at least 4.5 million borrowers; over $3.5 billion revenue 2008 to June 2013 (not "theft"); race team = his Level 5 Motorsports (generic car drawing); tribal ownership claim shown as HIS CLAIM, "A SHAM — PROSECUTORS SAID"; arrested 2016, convicted on all 14 counts (Oct 2017), 200 months (Jan 2018). TikTok adds: lawyer 84 months (seven years), research ✔1. No FTC/Supreme Court figures used.

## VIDEO GATE (YT / TT / IG)
| # | Result |
|---|---|
| V1 script_gate --all | PASS x3 |
| V2 watched (6x4 contact sheet + 1-fps sheet per cut + keyframe stills per beat) | yes |
| V3 frame 0 | suspect card + hook text + shutter/boom/paper slam at 0 s | 
| V4 change every 2-3 s | yes; HUD number + beat label + camera moves; longest static card ~4 s |
| V5 push-ins on spoken numbers, storyteller moves | yes |
| V6 CTA micro-moments | heart / plane + SEND / mag + FOLLOW tap / comment bubble |
| V7 payoff + loop | verdict stamp + gavel / cell door at ~85-90%, whip back to frame 0 |
| V8 brand lock, no neon | yes |
| V9 numbers match research, ILLUSTRATION labels, attribution | yes |
| V10 captions from sentences/script words | yes (words.json grouped; numbers re-joined) |
| V11 Owen voice untouched | yes |
| V12 CC0 sfx only, -14 LUFS, TP <= -1 dBTP | yes (TikTok bed -12 dB) |
| V13 n/a (director posts) | - |

