# QA — javice-fake-users (Decoded) — CRIME-SHOW RE-EDIT 2026-11-26 (RULES 112, new v3 scripts + final Owen voices)
Background music beds (RULES 115): tense_bed_2 on all three cuts.
## CRIME-SHOW BUILD STATUS
<!--S-->
RENDERED READY: YouTube(root) 85.1s 34.4MB
RENDERED READY: TikTok(tiktok/) 82.7s 33.7MB
<!--/S-->

Engine v2, series decoded. Scenes are generated: `_src/gen.js` (one story builder) + `_src/cfg_yt|tt|ig.js` (per-cut @word refs) + `_src/build.crime.sh <cut> <yt|tt|ig>` (concatenates recipes + `brand/engine-v2/crime.js`). Per-cut line-by-line visuals: `<cut>/build/AV.md`. Voice files untouched (`bm2.cjs voice` only re-read words.json). Rendered in the cloud with `bm2.cjs render --jobs 3 --chunk 28 --crf 23`; mixed with `mix.py` (TikTok with `BM2_BED_DB=-12`, RULES 113); captions.srt from sentences.json.

**The bad guy: ILLUSTRATION** (no licensed photo of Charlie Javice exists). One coloured, distinctive character (purple hoodie, brown hair, holding a pitch slide "4.25M USERS"), drawn by `_src/mk_founder.cjs` -> `brand/photos/charlie-javice-illustration/founder.png`; the same design in every treatment, labelled "ILLUSTRATION · NO LICENSED PHOTO" on the cards. Victims are consistent green cards: THE BANK (JPMORGAN) and THE PROFESSOR.

## Durations / sizes / loudness
| Cut | Narration | Video | File | Size | Loudness |
|---|---|---|---|---|---|
| YouTube (root) | 84.70 s | 85.10 s | video.mp4 | 34.4 MB | -14.0 LUFS, peak -1.3 dBFS |
| TikTok | 82.32 s | 82.73 s | tiktok/video.mp4 | 33.7 MB | -14.1 LUFS, peak -1.4 dBFS |
| IG/FB | 79.98 s | 80.37 s | ig/video.mp4 | 32.7 MB | -14.1 LUFS, peak -1.3 dBFS |

## Suspect appearances (seconds on screen; illustrated Charlie Javice)
Different crime-show treatment each time (CRIME-SHOW §1). Windows are element windows from the @word refs (approx. 0.3 s).

- **YouTube (root)** — A cold open card 0.0-4.7 · B case-file intro 4.7-12.4 · C PiP HER PITCH 12.4-25.5 · D PiP HER PROBLEM 30.9-34.5 · E PiP HER DEAL 40.1-46.3 · F PiP HER SALE 52.8-57.8 · G evidence board 66.6-70.0 · H verdict stamp + bars 70.0-81.4 · I loop frame 81.4-85.1 · full-size card 31 s (36%), with picture-in-picture 59 s (69%) of 85.1 s. 9 appearances.
- **TikTok** — A cold open card 0.0-10.5 · B case-file intro 10.5-15.6 · C PiP HER PITCH 15.6-28.3 · D PiP HER PROBLEM 32.9-36.4 · E PiP HER DEAL 41.6-47.7 · F PiP HER SALE 53.7-55.9 · G evidence board 60.5-66.1 · H verdict stamp + bars 66.1-81.4 · I loop frame 81.4-82.7 · full-size card 38 s (46%), with picture-in-picture 62 s (75%) of 82.7 s. 9 appearances.
- **IG/FB** — A cold open card 0.0-4.8 · B case-file intro 4.8-15.2 · C PiP HER PITCH 15.2-29.0 · D PiP HER PROBLEM 32.1-33.1 · E PiP HER DEAL 37.3-42.8 · F PiP HER SALE 49.0-53.6 · G evidence board 62.2-64.4 · H verdict stamp + bars 64.4-77.4 · I loop frame 77.4-80.4 · full-size card 33 s (41%), with picture-in-picture 58 s (73%) of 80.4 s. 9 appearances.

## Mute test (CRIME-SHOW §5)
With sound off the sheets show who (illustrated founder card + CHARLIE JAVICE + THE FOUNDER), what he/she did (FRANK pitch deck 4,250,000 cracking to 300,000; the engineer card stamped NO; the professor card + the list growing to 4,000,000 + FAKE; $175,000,000; FELL APART), the numbers (4.25M vs <300K, $18,000, $175M, ~$580 per real user, 4 counts, 85 months, $287.5M), and what happened (GUILTY stamp + jail bars, RESTITUTION $287.5M). PASS.

## On-screen facts (source: research/2026-11-25/javice-fake-users/research.md)
- 4.25 million claimed users vs fewer than 300,000 (SEC, attributed); 14 vs 1 party picture = our 4.25M : 300K (14.2x) arithmetic, labelled ILLUSTRATION; engineer asked first and refused (SEC); professor + coworker generated a list of over 4 million fake customers (shown growing to 4,000,000); "about $18,000 according to the bank's lawsuit"; JPMorgan paid $175 million (Sept 2021); ~$580 per real user = $175M / 300K (our math, footnoted); list fell apart; convicted on all 4 counts (March 2025); 85 months (Sept 2025); ordered to pay back $287.5 million; TikTok: coworker 68 months (research ✔2); IG: prosecutors asked for 12 years (ABC, ✔1).

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

