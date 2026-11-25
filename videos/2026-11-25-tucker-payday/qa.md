# QA — Scott Tucker payday loans (Decoded, fact-strict)
Engine v2, series decoded, scene source in `_src/` (shared.js + yt.js / tt.js / ig.js, `build.sh`). Pill title: CASE: TUCKER · 2017. Footnote: CONVICTED 2017 · 200 MONTHS · SOURCES: DOJ SDNY (+ illustration line).

## Durations
| Cut | Narration | Scene / video | File |
|---|---|---|---|
| YouTube | 54.10 s | 54.5 s | video.mp4 |
| TikTok | 34.59 s | 35.0 s | tiktok/video.mp4 |
| IG/FB | 20.43 s | 20.8 s | ig/video.mp4 |
Mix: voice -16 LUFS, bed tense_bed_2 ducked, master -14 LUFS, peak <= -1 dBTP (mix.py defaults). captions.srt per cut = voice/sentences.json (script wording, [tags] removed).

## On-screen facts (source: research/2026-11-25/tucker-payday-loans/research.md)
| On screen | Cut | Source / grade |
|---|---|---|
| Generic LOAN DISCLOSURE: amount borrowed $500, total of payments $650 (marked ILLUSTRATION, "generic recreation, not a real form"; no logos/names) | all | DOJ SDNY conviction release 2017-10-13, ✔2 |
| Total rolls to $1,925 in red, "PER DOJ · ONE BORROWER" ("FORM SAID $650" struck through) | all | DOJ sentencing release 2018-01-05, ✔2 (total paid $1,925 = $1,425 fees + $500) |
| Hook "$500 LOAN / FORM SAID $650 / HE TOOK $1,925" (IG, YT); "$500 LOAN / PAID BACK / ALMOST $2,000" (TT) | all | same; "almost $2,000" = the narration's "almost two grand" |
| Paycheck calendar (ILLUSTRATION): six paydays, each -$150; "STILL OWED $500" never changes; "NEVER MOVED" | all | research story beat 3 / number spine ($150 finance charge per $500 per pay period, principal untouched), DOJ ✔2; calendar is a generic illustration |
| FEES PAID running total ($150 x paydays) on the calendar | all | our arithmetic on the $150 charge; illustrative |
| FEES PAID rolls to $1,425, "PER DOJ · ONE BORROWER" | YT | DOJ sentencing release ✔2 (CNN 2016 also cites $1,425) |
| "A $500 loan" (owed tile pulse) | YT | DOJ |
| ≈700% A YEAR, tag "DOJ'S WORDS" | YT | DOJ "600% or 700%, sometimes higher than 1,000%"; "about 700%" is the research-approved wording, ✔2 |
| THE SCALE: AT LEAST 4,500,000 BORROWERS; OVER $3,500,000,000 IN REVENUE · 2008-2013 (PER DOJ). IG shows borrowers only | YT, TT, IG(part) | DOJ releases + Wikipedia, ✔2. Labelled revenue (not theft), per research "don't say" list |
| Silhouette card SCOTT TUCKER · ONLINE PAYDAY LENDER, tagged ILLUSTRATION, no photo | all | name + role from research beat 1 |
| Tag "PAYDAY LOANS · ONLINE" | YT | research |
| Generic red race car, "A PRO RACING TEAM · HIS OWN" (no livery, no team name, no number) | all | research beat 6 (Level 5 Motorsports not named); ILLUSTRATION tag |
| Verdict: GUILTY, 14 OF 14 COUNTS · OCT 2017 | all | DOJ conviction release 2017-10-13, ✔2 |
| 200 MONTHS (16 YRS 8 MO) · SENTENCED JAN 2018 | all | DOJ sentencing release 2018-01-05, ESPN, ✔2 |
| Comment bubble ("WHAT ARE YOU PAYING FOR?" YT / "READ THE FINE PRINT?" TT) + red +FOLLOW -> ✓ FOLLOWING | YT, TT | brand |
| IG end card: paper plane + "SEND TO THE FRIEND WHO NEVER READS THE FINE PRINT" | IG | brand CTA |

Not shown, on purpose: Ameriloan/brand names, Level 5, the tribal-immunity angle, Muir, FTC/Supreme Court, 1991 conviction, $380M personal take, any photo, any quote.

## Caption fixes (Whisper vs sentences.json)
YT: "$19 .25" -> $1,925; "$14 .25" -> $1,425; 500/650/150 given $ signs. TT: "500 -0650." -> "$500, owe $650."; "auto -renewed," -> "auto-renewed,"; "19 .25" -> $1,925; "print comment?" -> "print? Comment."; 500/150 -> $. IG: "$2 ,000." -> "two grand."; 150 -> $150. Captions never show [tags]; IG shows "bastard"/"damn".

## Push-ins (zoom-on-number)
YT (21): $500 1.16, $650 2.84, $1,925 4.32, "500" 10.62, "650" 11.82, 150 fee tile 16.28, "500" owed tile 17.70, $1,425 22.50, $500 owed 24.72, 700% 26.70, 4.5M 29.46, $3.5B 31.48, GUILTY 38.58, 14 counts 39.74, 200 months 42.10 (+ pull-backs). Front/back: presenter-front x2 (So where'd the money go 34.10; comment question 46.90), peek-style side-by-sides, whips between all stations; ends on wide at "Follow" (52.2) then whips home to the hook frame so it loops to frame 0 ($650 box restored).
TT (14): $500 0.60, "two grand" hook 2.44, $500 6.96, $650 7.72, $150 tile 11.20, $500 owed 12.66, $1,925 15.60, $500 17.54, 4.5M 19.82, $3.5B 21.20, GUILTY 25.82, 14 counts 26.46, 16 yrs/200 months 27.70. Front: 30.18 (comment). Wide at 33.46, whip home 34.16.
IG (9): $500 1.24, $1,925/two grand 2.72, $150 tile 4.64, owed $500 6.14, 4.5M 9.18, 14 counts 13.98, GUILTY 14.72, 200 months 15.28. Front: 17.50 (send). Home whip at 19.85 (loop).

## Sound
All CC0 from brand/sfx-library (manifest names), one hit per reveal on the same @word as the picture: money_counter on every roll + cash_register/deep_boom on landing, thud + coin per payday chip, rubber_stamp + deep_boom on "never moved", gavel + paper_slam on GUILTY, pop on bubble, click + success_chime on follow, rewind on the loop reset. Bed: tense_bed_2.

## Doubts / notes
- TikTok: "Follow." (33.46) is in sentences.json but not in words.json (Whisper missed it), so there is no caption for it and the beat/sfx are timed to the literal 33.46 s; the +FOLLOW button carries the word. Re-voicing would need those times updated.
- DOJ pages were never opened (research grading unchanged): every number is ✔2 from search extracts; a human check of the two DOJ releases is still pending.
- The "FEES PAID" running total on the calendar ($150 steps, 6 paydays) is illustrative arithmetic, not a DOJ figure; on YT it then rolls to DOJ's $1,425.
- Hook "HE TOOK $1,925" refers to DOJ's example borrower, not an average customer; the box says PER DOJ · ONE BORROWER once it rolls.
- The odometer shows 200 MONTHS in the IG/TT verdicts while the audio says "sixteen years"; the sub-line adds (16 YRS 8 MO).
- The final wide shot is small (7-8 stations); intended as a map/recap + loop transition.
