# QA — BitConnect "1% a day" (Decoded, engine v2)
Sources: `_src/shared.js parts (head/mid/plane.part) + yt.js / tt.js / ig.js`, built by `_src/build.sh`. Research: research/2026-11-25/bitconnect-one-percent/research.md.

## Cuts
| Cut | Narration | Scene duration | Output |
|---|---|---|---|
| YouTube | 52.95 s | 53.35 s | video.mp4 |
| TikTok | 33.96 s | 34.36 s | tiktok/video.mp4 |
| IG/FB | 20.66 s | 21.06 s | ig/video.mp4 |

Captions fixed to the script: "1389" -> "1,389", "54," -> "54—" (YT), "bod" -> "bot" (TikTok). IG caption shows the spoken profanity; on-screen graphics do not. captions.srt per cut is built from sentences.json (tags removed).

## On-screen facts
| On screen | Source / grade |
|---|---|
| "ABOUT 1% A DAY", "$1,000 @ 1% A DAY" (posted returns) | SEC complaint/release 2021-172, research.md number spine (~1%/day posted), ✔1; shown as "posted returns", not "guaranteed" |
| DAY 365 $37,783 · DAY 730 $1,427,588 · DAY 1,095 $53,939,174 · DAY 1,389 $1,000,000,000, tag OUR MATH | arithmetic 1000 x 1.01^days (research.md); card labelled OUR MATH + formula footer |
| Generic TRADING BOT box (header "BITCONNECT" in plain brand font, no logo); coin pipe NEW WALLETS -> OLD WALLETS, tag PROSECUTORS SAY | DOJ/SEC allegation (research beats 4; plea supports), attributed |
| $2,400,000,000 MONEY TAKEN IN, PER DOJ | DOJ ✔2 |
| Coin chart (BITCONNECT COIN, ILLUSTRATION · NOT REAL PRICES), SHUT DOWN JAN 2018, COLLAPSED stamp, no % | Wikipedia ✔1 / research (Jan 2018 shutdown); curve is generic |
| CASE FILE: TOP US PROMOTER · PLEADED GUILTY (conspiracy to commit wire fraud) · 38 MONTHS · SENTENCED 2022 | DOJ S.D. Cal. ✔2 (plea 2021-09-01, sentence 2022-09-16) |
| Footnote: PROMOTER CONVICTED 2021 · 38 MONTHS · SOURCES: DOJ, SEC | as above |

Not shown on purpose: founder (no conviction implied), promoter name, restitution, 92% figure, meme/Carlos Matos, any real logo.

## Push-ins on spoken numbers
YT: "1%" head (1.96) · "1,000" (13.70) · 37 (16.72) · 1.4 (19.40) · 53 (22.48) · 1389 (24.38) · billionaire value+row (25.56) · $2.4 (35.26) · collapsed chart (40.06) · guilty (42.56) · 38 months (43.50); bot window at "hand over" (8.60).
TikTok: 1% (6.24) · 1,000 (8.80) · 37 (11.86) · 1.4 (13.68) · day 1389 (14.90) · billionaire (15.78) · $2.4 (23.04) · 38 (26.74).
IG: 1% (0.80) · billion (6.28) · 2.4 (11.68) · 38 (15.82).
Front/back: presenter-front several times per cut (hook, "No bot does that", comment question), storyteller goes BEHIND the counter/case card on every push-in (layer back), whips between stations; each cut ends wide (YT/TT/IG) then whips back to the hook with the counter reset to day 0 (clean loop).

## Sound
CC0 sfx from brand/sfx-library, one hit per reveal on the same @word as the picture; bed tense_bed_2; mix.py defaults.

## Doubts
- Day 1,389 row/main counter is rounded to exactly $1,000,000,000 (true value on day 1,389 is ~$1.006B; day 1,388 is below $1B), so "passes $1B on day 1,389" holds.
- Ticker idles slowly (days 0-22) before the spoken "one year" so frame 0 is alive; it is not claimed as data.
- TikTok/IG show the PLEADED GUILTY stamp although narration only says "38 months" (fact is DOJ ✔2).
- Caption/graphic "SENTENCED 2022" vs footnote "CONVICTED 2021": plea 2021, sentencing 2022.
- Primary DOJ/SEC pages could not be re-opened (research.md access note); grades unchanged.
