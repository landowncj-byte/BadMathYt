# QA — Eddie Tipton / lottery rig (Decoded) — CRIME-SHOW rebuild 2026-11-26 (RULES 112)
Engine v2, series decoded. Sources: `_src/shared.js` + `shared2.js` + **`shared3.js` (new: the con as a recurring character)** + yt/tt/ig.js (`_src/build.sh <cut> <yt|tt|ig>`); `*.v3.bak` = previous scene sources. Per-cut line-by-line visuals in `<cut>/build/AV.md`. Voice untouched. Pill CASE: TIPTON · 2017. Rendered here (cloud) with `bm2.cjs render --jobs 2 --chunk 30`, video re-encoded x264 crf 24 so each file is < 40 MB, then `mix.py` (via brand/tools/crime_finalize.sh).

## The bad guy: PHOTO OR ILLUSTRATION
No licensed photo. Retried 2026-11-26: `photos.py "Eddie Tipton"` and `stock.py "Eddie Tipton"` and direct Commons/Wikipedia API searches all returned HTTP 429 (shared proxy rate limit; an earlier Commons query returned no Tipton file). Nothing was verified by eye, so nothing licensed was used (VERIFIED.md updated with the retry note). He is ONE coloured ILLUSTRATED character, the same design in every treatment, labelled ILLUSTRATION: "THE LOTTERY IT GUY" (glasses, blue shirt, orange lanyard with MUSL IT SECURITY badge, red thumb drive). Footnote says "CHARACTER, NOT A PHOTO". Cast cards (consistent): THE LOTTERY (navy suit), THE OTHERS (purple hood, coin bag), THE PLAYERS (green hoodie, ticket).

## Durations / sizes / loudness
| Cut | Narration | Video | File | Size | Loudness |
|---|---|---|---|---|---|
| YouTube | 85.8 s | 86.5 s | video.mp4 | 31.0 MB | -14.0 LUFS, peak -1.30 dBFS |
| TikTok | 86.6 s | 86.97 s | tiktok/video.mp4 | 30.1 MB | -14.0 LUFS, peak -1.27 dBFS |
| IG/FB | 84.1 s | 84.8 s | ig/video.mp4 | 30.4 MB | -14.0 LUFS, peak -1.41 dBFS |
script_gate --all: PASS x3 (TikTok warn 250 words, script not touched). captions.srt rebuilt from sentences.json; contact_sheet.png (6x4) per cut; 1-fps sheets viewed.

## Suspect (the lottery IT guy) appearances, seconds (full-size card / PiP)
Treatments: A cold-open badge with his face · B CASE FILE intro card (name types out, red string to note) · C quote card HIS JOB: KEEP IT SAFE flips to the truth · D PiP "he did this" + arrow + step labels (thumb drive in hand on step 1) · E PiP HIS SCHEME on the jackpot ticket · F evidence board (strings pull tight) · G caught card (red X + PLEADED GUILTY stamp) · H verdict PiP (prison bars + SENTENCED stamp).
| Cut | A | B | ID badge | C | D | E | F | G | H | on screen (full-size / incl. PiP) |
|---|---|---|---|---|---|---|---|---|---|---|
| YT | 0-3.4 | 5.1-8.5 | 21.9-24.5 | 24.5-27.2 | 28.9-49.1 | 55.5-62.3 | 73.7-76.6 | 76.4-79.7 | 79.8-83.3 | ~18 s (21%) / ~49 s (56%) |
| TT | 0-5.0 (badge on ticket) | 14.4-16.7 | 32.4-36.8 | 37.1-39.6 | 40.0-60.4 | 65.7-70.6 | 74.4-77.5 | 77.5-80.4 | 80.4-83.5 | ~20 s (23%) / ~48 s (55%) |
| IG | 0-3.4 | 5.5-9.0 | 9.0-13.5 | 29.4-33.8 | 34.4-51.0 | 56.0-63.2 | 72.0-74.8 | 74.8-77.6 | 77.6-80.6* | ~19 s (22%) / ~47 s (55%) |
(* IG verdict PiP runs to the end; times from element windows in the scene, approximate to 0.3 s.)

## VIDEO GATE (YT / TT / IG)
| # | Result |
|---|---|
| V1 script_gate on real sentences | PASS / PASS / PASS |
| V2 watched via 1-fps sheets | yes / yes / yes |
| V3 frame 0 slam + hook text + sound | YT: badge slam with his face + cracked machine + hook; TT: $16.5M NEVER COLLECTED slam + his badge; IG: badge + hook. Hit sounds at 0 |
| V4 change every 2-3 s | yes; longest holds are the step cards (PiP label changes) |
| V5 push-ins on numbers, storyteller travels | yes |
| V6 CTA micro-moments | heart/plane/follow/bubble present where the script asks (IG: no like ask, double-tap heart) |
| V7 payoff biggest hit (zero slam + 25 years) and loop to frame 0 | yes |
| V8 brand lock, no neon | yes |
| V9 numbers = research; ILLUSTRATION labels | yes; "PROSECUTORS SAY" on the thumb-drive popup; no day/month of trigger dates; "2010 · IOWA" location card |
| V10 captions from script wording, nothing below y 1340 | yes |
| V11 voice | not re-listened, untouched |
| V12 CC0 sfx only, -14 LUFS, peak <= -1 dBTP | yes (camera_shutter, typewriter, suspense_drone, rubber_stamp, handcuff_click, gavel, cell_door, heartbeat added) |
| V13 post settings | not in scope |
Mute test: with sound off you can see who (coloured IT guy with MUSL badge), what (wrote code, passed numbers, others won, $16.5M never paid), and the end (PLEADED GUILTY, 25 YEARS, bars).

## Doubts / issues
- No photo; the character is generic, not a likeness. The thumb drive is not in the narration (shown as illustration, labelled PROSECUTORS SAY); director can drop `usb` + `drive` props if the source is not solid.
- "IOWA" location card assumes MUSL is Iowa-based (it is) and the 2010 ticket location is not stated beyond that.
- Some whip-pan frames are blurred/near-empty for ~0.3 s (74.0 s on TT) by design.
- Pre-existing: robot station title clipped at top during zoom; odometer shows intermediate digits while rolling.

## CRIME-SHOW BUILD STATUS
RENDERED READY: YouTube(root) 86.5s 31.0MB (video.mp4)
RENDERED READY: TikTok 86.97s 30.1MB (tiktok/video.mp4)
RENDERED READY: IG/FB 84.8s 30.4MB (ig/video.mp4)
All three: READY.
