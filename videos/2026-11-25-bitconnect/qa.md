# QA — BitConnect "1% a day" (Decoded, engine v2) — REBUILD 2026-11-25 (beats.v2.md)
Sources: `_src/head.part + mid.part + plane.part + v3.part` (shared recipes) + `yt.js / tt.js / ig.js`, built by `_src/build.sh`. Research: research/2026-11-25/bitconnect-one-percent/research.md. Engine tweak: optional `captions.gap` (extra word spacing; default 0, other videos unchanged) fixes joined words such as "PROSECUTORS SAY".

## Cuts
| Cut | Narration | Video | Size | Output |
|---|---|---|---|---|
| YouTube | 47.22 s | 47.63 s | 39.3 MB | video.mp4 (contact_sheet.png) |
| TikTok | 33.83 s | 34.23 s | 28.4 MB | tiktok/video.mp4 |
| IG/FB | 20.53 s | 20.93 s | 16.2 MB | ig/video.mp4 |
Mix: -14.0 LUFS, true peak <= -1.3 dBFS (mix.py). Sound: CC0 sfx-library + tense_bed_2 only. captions.srt per cut rewritten from voice/sentences.json (no tags).

## VIDEO GATE (YT / TT / IG)
| # | Question | YT | TT | IG | Note |
|---|---|---|---|---|---|
| V1 | script_gate.py PASS with real sentences.json | YES | YES | YES | warnings only: TT 90 words; loop key-word on TT/IG |
| V2 | Watched via 1-fps timestamped sheet | YES | YES | YES | contact_sheet.png in each cut |
| V3 | Frame 0 pattern break, hook words on screen | YES | YES | YES | slam "1% A DAY" + crack / flag / strings, hit sound, no fade |
| V4 | Meaningful change every 2-3 s, no layout > ~4 s | YES | YES | YES | longest holds ~3 s (YT shutter 34-38 s with follow tap + camera moves; IG counter 8-10 s with push-ins) |
| V5 | Push-in on every spoken number; storyteller travels | YES | YES | YES | 1%, 1,000, 37 grand, 1.4M, 1,389, billionaire, 38 months |
| V6 | CTA micro-moments on voiced word, small, <= 1.5 s | YES | YES | YES | heart (like), plane (send), +FOLLOW tap (YT/TT), comment bubble (YT/TT). IG script has no follow or comment line, so none shown |
| V7 | Biggest hit at payoff, loop into frame 0 | PARTLY | PARTLY | PARTLY | payoff lands ~86% (voice timing), not 75-80%; ends 5.8 / 4.4 / 2.7 s later; ends on the frame-0 composition |
| V8 | Brand lock, no neon | YES | YES | YES | drop shadows only; storyteller unchanged |
| V9 | On-screen facts match research.md | YES | YES | YES | OUR MATH tag on counter; PROSECUTORS SAY / PER DOJ; SOURCE: SEC COMPLAINT · ALLEGED; PLEADED GUILTY · 38 MONTHS; ILLUSTRATION label on app screen; founder not shown |
| V10 | Captions from sentences wording, no tags, safe zone | YES | YES | YES | token fixes: 1,389; handed it; bought in?; heart; spacing gap added |
| V11 | Voice / names | not re-listened | not re-listened | not re-listened | voice not changed by this task |
| V12 | CC0 sound, -14 LUFS, hit on payoff | YES | YES | YES | silence before payoff is only partial (bed runs) |
| V13 | Post settings | n/a | n/a | n/a | not posted |

## On-screen facts
APP SCREEN "+1.00% EVERY DAY" = generic illustration (labelled). SEC returns card: +1% rows, "ABOUT 1% A DAY", source chip "SEC COMPLAINT · ALLEGED". Counter "$1,000 @ 1% A DAY" rows DAY 365 $37,783 / DAY 730 $1,427,588 / DAY 1,389 $1,000,000,000 = OUR MATH (1000 x 1.01^days). YT only: $2,400,000,000 MONEY TAKEN IN, PER DOJ. TRADING BOT curtain -> NEW WALLETS -> OLD WALLETS pipe tagged PROSECUTORS SAY. SHUT DOWN JAN 2018 (YT). Case card: TOP US PROMOTER, PLEADED GUILTY, 38 MONTHS, SENTENCED 2022. Footnote PROMOTER CONVICTED 2021 · 38 MONTHS · SOURCES: DOJ, SEC. No logos, no memes, founder not shown.

## Doubts
- Payoff at ~86%, set by the re-voiced timing.
- Bed music cannot drop out on the follow line with current mixer.
- Bot "empty" beat shown as closed curtain then pipe, to avoid asserting emptiness.
- TT/IG show PLEADED GUILTY though narration says only "38 months" (DOJ-sourced).
- Day 1,389 value rounded to $1,000,000,000 (true ~ $1.006B).
- Primary DOJ/SEC pages could not be re-opened (research.md access note).
