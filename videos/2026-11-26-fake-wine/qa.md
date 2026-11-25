# QA — Rudy Kurniawan fake wine (Decoded, fact-strict)
Engine v2, series decoded, pill title CASE: KURNIAWAN · 2013. Sources `_src/` (shared.js + yt.js / tt.js / ig.js). Footnote on every cut: CONVICTED 2013 · 10 YEARS · SOURCES: DOJ SDNY · TRIAL REPORTS + ILLUSTRATIONS line. All art is generic (no winery logos/labels, no real names on bottles, no photos, no likeness).

| Cut | Narration | Video | Size | File |
|---|---|---|---|---|
| YouTube | 48.27 s | 48.67 s | 35.8 MB | video.mp4 |
| TikTok | 28.29 s | 28.70 s | 19.0 MB | tiktok/video.mp4 |
| IG/FB | 22.18 s | 22.57 s | 14.3 MB | ig/video.mp4 |
Mix: mix.py defaults, master -14 LUFS, peak <= -1.38 dBFS (YT -14.0/-1.46, TT -14.0/-1.38, IG -14.1/-1.46). Sound: brand/sfx-library CC0 only, tense_bed_2; hit on each reveal at the same @word. Captions: captions.srt per cut from voice/sentences.json (tags removed). script_gate.py --all: PASS x3 (TT warn: 86 words, script-side, untouched).

## VIDEO GATE (YT / TT / IG)
| # | Result | Note |
|---|---|---|
| V1 | PASS / PASS / PASS | script_gate on real sentences.json |
| V2 | YES x3 | 1-fps timestamped sheets (contact_sheet.png per cut), each viewed; not listened to by me |
| V3 | YES x3 | Frame 0: YT bottle slam label 1945 + timeline card FIRST MADE: 1982 stamp + "LABEL: 1945"; TT/IG cheque slam + red FAKE stamp + $2.1 MILLION; boom + stamp hit at 0 s |
| V4 | YES x3 | beat or reveal every 1.5-3 s; longest hold is a zoomed card ~2 s |
| V5 | YES x3 | zoom-on-number on every spoken number (YT: 1945, 1982, 35, 12, 1945, 1982, 37-year bracket, 2012, 10, 28, 37; TT: two, 10, 10 years, 1945, 1982, bracket; IG: $2, 1945, 1982, bracket, 10); storyteller left/right/front/behind, whips between stations |
| V6 | YES x3 | heart (like), plane out of wine glass (send), mag taps +FOLLOW -> FOLLOWING (YT, TT), comment bubble after payoff; each <= 1.5 s; IG has no follow line in the script |
| V7 | YES x3 | YT payoff CONVICTED/10 YEARS/$28.4M at 38.8 s (80%), then 37-years-off peel + question, whip to frame 0; TT payoff 1945 vs 1982 at 21-25 s; IG at 13.8-17 s with verdict last |
| V8 | YES x3 | Ink/paper/clay, no glow |
| V9 | YES x3 | see facts table; ILLUSTRATION on bottle/bench/catalogue/winemaker/cheque/crate/timeline |
| V10 | YES x3 | captions from words.json with captions.fix (Rudy Kurniawan, cellar, $35, $12, $28, what'd it, $10, fake-ass, Double-tap, wine-snob), gap 16 |
| V11 | NOT CHECKED | voice not re-listened (out of scope) |
| V12 | YES | CC0 library, -14 LUFS, peak <= -1 dBFS; boom on payoff |
| V13 | n/a | not posting |

## On-screen facts (source: research/2026-11-26/kurniawan-fake-wine/research.md)
| On screen | Cut | Source / grade |
|---|---|---|
| Generic bottle label 1945 (ILLUSTRATION, "GENERIC LABEL") | all | trial testimony, bottles labelled 1945-1971 (April 2008 NY lots), ✔2 |
| Timeline card FIRST MADE: 1982, axis 1945 vs 1982, bracket 37 YEARS, "PER TRIAL TESTIMONY" | all | Ponsot testimony via Decanter/Drinks Business/NY Post, ✔2; 1982-1945 = 37 arithmetic |
| "HIS FAMILY STARTED IN 1982" | YT | same |
| Name tag RUDY KURNIAWAN, WINE DEALER · 2006; stamp CONVICTED 2013 | YT, TT | research story + DOJ, ✔2 |
| Auction paddle (generic) + counter ≈$35 MILLION, HIS CELLAR · 2 AUCTIONS · 2006 | YT | $10.6M + $24.7M = $35.3M, ✔2 (Decanter) |
| $12 CLUB / $10 WINE GANG / CHEAP WINE CLUB stickers | YT/TT/IG | CTA props, not facts |
| Catalogue page NEW YORK · APRIL 2008, LOT ONE FRENCH WINE, SOME BOTTLES DATED 1945 (ILLUSTRATION; no house, no wine name, no count) | YT | ✔2 |
| WITHDRAWN stamp; winemaker silhouette THE WINEMAKER, ILLUSTRATION · NO LIKENESS | YT | ✔2 (lots pulled after winemaker objected) |
| ARRESTED AT HOME 2012, PER DOJ | YT | arrest 8 Mar 2012 at home, ✔2 |
| Kitchen bench ILLUSTRATION: OLD WINE + NEWER WINE jugs, funnel, cork, label, label printer spitting labels; tag PROSECUTORS: "WINE FACTORY" (YT, IG) / PROSECUTORS SAID (TT) | all but none in none | prosecutors' description, mixed older + newer wine, rebottled, thousands of labels, ✔2, attributed |
| Cheque $2.1 MILLION, HE TOLD THE JURY, FAKE stamp (cheque/crate ILLUSTRATION; no name) | TT, IG | collector testimony $2.1M for 219 bottles he says were fake, ✔2; "billionaire" per script |
| Taste-test scorecard with red X, NOT A TASTE TEST | TT | script line (no score claims) |
| Verdict: CONVICTED 2013 (JURY, MANHATTAN FEDERAL COURT), 10 YEARS | YT, IG | DOJ SDNY, ✔2 |
| PAY BACK $28.4 MILLION, RESTITUTION · PER DOJ | YT | $28,405,502.50, ✔2 |
| Prison bars over verdict | IG | illustration |
| 37 YEARS OFF stamp on peeling label; bubble WOULD YOU HAVE CHECKED? / COULD YOU TASTE IT? | YT / TT, IG | script + brand |

Not shown on purpose: Ponsot/Acker/Koch names, any lot count, 19,000 labels, $550M/$130M, $20M forfeiture, deportation, "biggest fraud", exact recipe, that the 2006 wine was fake.

## Doubts
- Research was read from search extracts only (DOJ pages never opened): human recheck of the DOJ release advised before posting.
- "FAKE" on the cheque is the buyer's claim (hook is "says"); card carries HE TOLD THE JURY.
- IG on-screen "FAKE-ASS WINE" mirrors the vulgar voiced hook (rule 17).
- Whips land on blurred frames at 1-fps samples; intended.
- Loop: final whip returns to the frame-0 composition at rest (not the slam-scaled frame 0); the slam replays at t=0.
- YT 35.8 MB (under 40 MB).
