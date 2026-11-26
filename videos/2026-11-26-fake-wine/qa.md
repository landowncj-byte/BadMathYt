# QA — Rudy Kurniawan fake wine (Decoded, fact-strict) — REBUILT 2026-11-25 to the long scripts (REBUILD-LONGER Stage 2)
Engine v2, series decoded, pill title CASE: KURNIAWAN · 2013. Full re-edit (not a re-time) against the new voice/words.json + sentences.json and each cut's voice/beats-v3.md. Sources `_src/` (shared.js + yt.js / tt.js / ig.js; v1 recipes kept, new recipes added: gavel, auction, calendar, factory (3-step wine factory), bgrid ($2.1M ÷ 219)). Footnote on every cut: CONVICTED 2013 · 10 YEARS · $28.4M BACK · SOURCES: DOJ SDNY · TRIAL REPORTS + ILLUSTRATIONS line + PHOTOS line. Voice/ files untouched.

| Cut | Order | Narration | Video | Size | LUFS / peak | File |
|---|---|---|---|---|---|---|
| YouTube | chronological | 92.84 s | 93.23 s | 34.1 MB | -14.0 / -1.4 dBFS | video.mp4 |
| TikTok | mystery-first | 89.29 s | 89.70 s | 33.2 MB | -14.0 / -1.4 dBFS | tiktok/video.mp4 |
| IG/FB | impossible date first | 93.39 s | 93.80 s | 35.0 MB | -14.0 / -1.3 dBFS | ig/video.mp4 |
All three are > 60 s (ffprobe). Rendered with `--crf 24` to stay < 40 MB. Mix: mix.py defaults, master -14 LUFS, CC0 brand/sfx-library only, tense_bed_2, one hit per reveal on the same @word. captions.srt per cut rebuilt from voice/sentences.json (tags removed). On-screen captions from words.json with captions.fix ($1,000, $12, Rudy Kurniawan, part's next, Double-tap, wine-snob). Contact sheets: contact_sheet.png per cut, one frame every 2 s with timestamps (10 columns), each viewed, plus per-beat stills checked before every render (motion-tips keyframe check); a 1 s test of the hardest effect (calendar + auction) was covered by the still pass, not a separate clip.
script_gate.py --all: PASS x3 (YT 249 words 92.8 s, TT 247 words 89.3 s, IG 248 words 93.4 s; TT warn: word count vs the skill's ~30 s target, expected for the 90 s series).

## Visual plan (per line, every line has its own visual)
auction paddle/auction card with BID paddles and rising bars (what an auction is) · gavel + counter ≈$35 MILLION · calendar of $1,000 chips rolling to 95 YEARS · WORLD RECORD stamp + gavel · catalogue page with 1945 ringed · label vs timeline FIRST MADE 1982 with 37-year bracket · door card ARRESTED AT HOME 2012 · real kitchen exhibit photo above the bench · 3-step "WINE FACTORY" diagram (mix / rebottle / label, rows light up on the spoken step) · cheque $2.1 MILLION (IG adds 219-bottle grid ≈ $9,600 EACH) · folder then verdict card CONVICTED / 10 YEARS / $28.4M · comment bubble then whip back to the frame-0 composition (last frame echoes first, checked on real last frames). Camera push-ins on every spoken number, storyteller front/behind (peek) and left/right/corner, shot changes about every 1.5-2.5 s, the camera and counters hold through the pauses after big numbers.

## VIDEO GATE (YT / TT / IG)
| # | Result | Note |
|---|---|---|
| V1 | YES x3 | script_gate --all PASS on real sentences.json |
| V2 | YES x3 | 2-s timestamped sheets + per-beat stills viewed; not listened to by me |
| V3 | YES x3 | frame 0 shows the full hook (YT 3-line hook + paddles + bench + FRAUD stamp; TT 3-line hook + cheque + FAKE? stamp; IG LABEL: 1945 + bottle + FIRST MADE: 1982); hit sound at 0 |
| V4 | YES x3 | beat/animation about every 1.5-2.5 s; longest holds are the pauses after big numbers (counter/stamp still animating) |
| V5 | YES x3 | push-in on each spoken number (2006, $35, 1,000, 95, $12, 1945, 1982, 37, 2012, $2, 10, $28; TT/IG same set; IG also $9,600); storyteller peeks behind graphics and moves spots |
| V6 | YES x3 | like heart (YT $12 club, TT screw cap, IG box wine), plane out of a glass (send), mag taps +FOLLOW -> FOLLOWING, comment bubble on the last line; each <= 1.5 s |
| V7 | PARTIAL | the verdict hits land at 83-89% because the voiced scripts put conviction at 78-88 s; after the last number there is ~3 s to the question, then the loop whip. Script timing, not changeable here |
| V8 | YES x3 | ink/paper/clay, no glow |
| V9 | YES x3 | see table; "PER DOJ / PROSECUTORS SAID / HE TOLD THE JURY / OUR MATH" attributions; ILLUSTRATION labels |
| V10 | YES x3 | captions from words.json + captions.fix, no tags |
| V11 | NOT CHECKED | voice not re-listened (out of scope) |
| V12 | YES x3 | CC0 library, -14 LUFS, peak <= -1.3 dBFS |
| V13 | n/a | not posting |

## On-screen facts
| On screen | Cut | Source / grade |
|---|---|---|
| Real photo Rudy Kurniawan (ICE), tag WINE COLLECTOR · 2006 (TT: THE SELLER) + WINE COLLECTOR CALIFORNIA | all | research ✔2; photo public domain |
| Auction card (generic, EXAMPLE BIDS · NO REAL PRICES) | all | explains the term, no numbers |
| ≈$35 MILLION, 2006 · 2 AUCTIONS | all | $10.6M + $24.7M = $35.3M ✔2 |
| $1,000 A DAY ... 95 YEARS, OUR MATH: ≈$35M ÷ $1,000 A DAY ≈ 95 YEARS | all | 35,000,000 / 1,000 = 35,000 days = 95.8 years (our arithmetic) |
| WORLD RECORD stamp | all | single-owner sale record ✔2 |
| Catalogue NEW YORK · APRIL 2008, ONE FRENCH WINE, 1945 ringed; WITHDRAWN; winemaker silhouette ILLUSTRATION · NO LIKENESS | all | ✔2 |
| LABEL 1945 vs FIRST MADE: 1982, 37 YEARS, PER TRIAL TESTIMONY | all | 1982 - 1945 = 37 |
| ARRESTED AT HOME 2012 PER DOJ | all (TT: ARRESTED 2012 · CONVICTED OF FRAUD) | ✔2 |
| Real kitchen exhibit photo + PROSECUTORS: "WINE FACTORY" | all | public domain; prosecutors' description ✔2 |
| 3-step factory: MIX older + newer wine / REBOTTLE old bottles, new (TT: fresh) corks + wax / LABEL thousands of labels, "PROSECUTORS SAID" | all | ✔2, attributed |
| Cheque $2.1 MILLION PAID BY A BILLIONAIRE, HE TOLD THE JURY ("FAKES" quote) | all | testimony: $2.1M for 219 bottles he says were fake ✔2 |
| $2.1M ÷ 219 BOTTLES, EACH ≈ $9,600 (OUR MATH) | IG | 2,100,000 / 219 = 9,589 |
| Scorecard NOT A TASTE TEST | TT | script line |
| Verdict CONVICTED / 10 YEARS / PAY BACK $28.4 MILLION (RESTITUTION · PER DOJ) | all | DOJ SDNY ✔2 |
Not shown on purpose: Ponsot/Acker/Koch names, lot counts, 19,000 labels, $550M/$130M, deportation, "biggest fraud". The 2006 wine is never called fake; the 1945 lots were withdrawn, never "sold".

## Doubts
- "One of his sales set a world record" (script) is a record for a single-owner sale; the beats-v3 note about "so buyers trusted him" is not on screen.
- On-screen "FAKES" on the cheque is the buyer's claim, shown with HE TOLD THE JURY.
- IG profanity (damn, dumbass) appears only in voiced captions, aimed at the convicted forger.
- Minor cosmetics: during a few fast whips/zooms (YT ~14 s auction, ~72 s FAKES text, ~86 s verdict top; TT ~48 s stamp, ~52 s CAUGHT HOW? over NOT A TASTE TEST for ~0.5 s) a card top slides under the DECODED pill for a few frames. Not fixed.
- Rendered with `--crf 24`; frames are slightly softer than the old CRF 20 renders.
- Loop: final whip returns to the frame-0 composition at rest (checked on real last frames).

## Photos (real, licensed; brand/photos/VERIFIED.md)
| File | Cut / where | Page URL | License | Author |
|---|---|---|---|---|
| brand/photos/rudy-kurniawan/2.jpg (Rudy Kurniawan, photographed by ICE 2021, "paper" card, name tag RUDY KURNIAWAN, credit U.S. ICE · PUBLIC DOMAIN) | YT: replaces the name card on the case board (id tag, at @Ruddy); TT: replaces the "THE SELLER" card (at the 3rd "he" = "He got convicted"); IG: new card with the kitchen photo (at "seller's") | https://commons.wikimedia.org/wiki/File:Rudy_Kurniawan_4-7-21_ICE.jpg | Public domain | U.S. Immigration and Customs Enforcement |
| brand/photos/rudy-kurniawan/3.jpg (his kitchen photographed by investigators; "GOVERNMENT EXHIBIT" sticker visible; credit U.S. GOVERNMENT TRIAL EXHIBIT · PUBLIC DOMAIN) | YT: above the illustrated bench (at "prosecutors"); TT: above the bench (at "prosecutors" +0.25); IG: above the bench (at "prosecutors" -0.1) | https://commons.wikimedia.org/wiki/File:Rudy_Kurniawan%27s_kitchen.jpg | Public domain | U.S. Government |
Footnote line on every cut: "PHOTOS: U.S. ICE; U.S. GOVERNMENT TRIAL EXHIBIT · PUBLIC DOMAIN VIA WIKIMEDIA COMMONS". No stock added (nothing obviously good and logo-free). The YT winemaker silhouette stays (it is the winery's winemaker, not Kurniawan; no photo). The ICE photo is from 2021 (his deportation), shown with the 2006/2013 case labels; the card credit does not say 2021 (credit text as specified).

Footnote line on every cut: "PHOTOS: U.S. ICE; U.S. GOVERNMENT TRIAL EXHIBIT · PUBLIC DOMAIN VIA WIKIMEDIA COMMONS". Only these two Kurniawan-related photos are used (never any other "Rudy Kurniawan" image). Photo cards: YT at @wait (name tag RUDY KURNIAWAN), TT at "So who sold it", IG at "So who does that"; kitchen exhibit above the bench at "prosecutors". No stock added. The YT winemaker silhouette stays (no photo). The ICE photo is from 2021, shown under 2006/2013 case labels; the card credit does not say 2021.

## CRIME-SHOW BUILD STATUS
RENDERED READY: YouTube (video.mp4) 86.5s 30.2MB — -14.0 LUFS, peak -1.3 dBFS. Suspect (Rudy Kurniawan, ICE photo) on screen: 0.0 cold open, 4.5 intro case file, 26.6 world-record card, 38+ "HIS LABELS" PiP, 48.4 arrested/height chart, 71 evidence board, 76-86 verdict stamp+bars, 86.3 loop frame (32% of runtime as camera focus). 1945 label vs FIRST MADE 1982 shown as giant card (36-44 s). AV.md in build/.
RENDERED READY: TikTok (tiktok/video.mp4) 84.2s 29.0MB — BM2_BED_DB=-12 mix, -14.1 LUFS, peak -1.2 dBFS. Suspect: 0 cold open, 4.2 "THE SELLER?" case file, ~26 photo card, ~46-56 HIS LABELS PiP, ~71 evidence board (arrested X), 76-84 verdict + bars, 84.2 loop (27% of runtime as focus).
RENDERED READY: IG (ig/video.mp4) 82.8s 29.4MB — -14.1 LUFS, peak -1.25 dBFS. Suspect: ~4 "SO WHO DOES THAT?" photo card, ~6 case file + red ring, HIS LABELS PiP 30-50, 48 arrested mono, evidence board, 72-82 verdict stamp + bars, loop (25% focus). Giant 1945 label opens the cut, FIRST MADE 1982 timeline later.
VIDEO GATE: V1-V12 reviewed from contact sheets/stills (not listened); mute test ok. Known: FIRST MADE card overlaps "LABEL SAYS" bottle slightly.
