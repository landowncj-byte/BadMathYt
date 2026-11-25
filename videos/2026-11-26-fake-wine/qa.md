# QA — Rudy Kurniawan fake wine (Decoded, fact-strict)
Engine v2, series decoded, pill title CASE: KURNIAWAN · 2013. Sources `_src/` (shared.js + yt.js / tt.js / ig.js). Footnote on every cut: CONVICTED 2013 · 10 YEARS · SOURCES: DOJ SDNY · TRIAL REPORTS + ILLUSTRATIONS line + PHOTOS line. Art is generic (no winery logos/labels, no real names on bottles, no likeness of the winemaker). Real photos only of Kurniawan (ICE 2021) and the government's kitchen exhibit (see Photos). RE-TIMED 2026-11-25 to the re-voiced smoothed scripts (all refs are @word, final loop whip = @last word + offset).

| Cut | Narration | Video | Size | File |
|---|---|---|---|---|
| YouTube | 51.53 s | 51.93 s | 39.1 MB | video.mp4 |
| TikTok | 32.79 s | 33.20 s | 21.3 MB | tiktok/video.mp4 |
| IG/FB | 23.31 s | 23.70 s | 15.5 MB | ig/video.mp4 |
Mix: mix.py defaults, master -14 LUFS (YT -14.0 / peak -1.38, TT -14.1 / -1.39, IG -14.1 / -1.32 dBFS). Sound: brand/sfx-library CC0 only, tense_bed_2; hit on each reveal at the same @word. Captions: captions.srt per cut from voice/sentences.json (tags removed). script_gate.py --all: DURATION FAIL x3 only (YT 51.5 s vs new window 60-90, TT 32.8 s vs 50-75, IG 23.3 s vs 35-55; the owner's 2026-11-25 longer-script windows). Everything else passes. This is script length (scripts/voice are out of scope here), not a build issue; TT warn: 93 words.

## VIDEO GATE (YT / TT / IG)
| # | Result | Note |
|---|---|---|
| V1 | FAIL / FAIL / FAIL | script_gate on real sentences.json: only the DURATION window fails (scripts shorter than new 60-90 / 50-75 / 35-55 s windows); needs longer scripts, not touched |
| V2 | YES x3 | 1-fps timestamped sheets (contact_sheet.png per cut), each viewed; not listened to by me |
| V3 | YES x3 | Frame 0: YT bottle slam label 1945 + timeline card FIRST MADE: 1982 stamp + "LABEL: 1945"; TT/IG cheque slam + red FAKE stamp + $2.1 MILLION; boom + stamp hit at 0 s |
| V4 | YES x3 | beat or reveal every 1.5-3 s; longest hold is a zoomed card ~2 s |
| V5 | YES x3 | zoom-on-number on every spoken number (YT: 1945, 1982, 35, 12, 1945, 1982, 37-year bracket, 2012, 10, 28, 37; TT: two, 10, 10 years, 1945, 1982, bracket; IG: $2, 1945, 1982, bracket, 10); storyteller left/right/front/behind, whips between stations |
| V6 | YES x3 | heart (like), plane out of wine glass (send), mag taps +FOLLOW -> FOLLOWING (YT, TT), comment bubble after payoff; each <= 1.5 s; IG has no follow line in the script |
| V7 | YES x3 | YT payoff CONVICTED/10 YEARS/$28.4M at 38.8 s (80%), then 37-years-off peel + question, whip to frame 0; TT payoff 1945 vs 1982 at 21-25 s; IG at 13.8-17 s with verdict last |
| V8 | YES x3 | Ink/paper/clay, no glow |
| V9 | YES x3 | see facts table; ILLUSTRATION on bottle/bench/catalogue/winemaker/cheque/crate/timeline; real photos credited on card + footnote |
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
- TikTok re-rendered: CAUGHT HOW? moved up between name tag and stamps and exits at Send-0.3; no world text sits in the caption band (y>1340) in any cut.

## Photos (real, licensed; brand/photos/VERIFIED.md)
| File | Cut / where | Page URL | License | Author |
|---|---|---|---|---|
| brand/photos/rudy-kurniawan/2.jpg (Rudy Kurniawan, photographed by ICE 2021, "paper" card, name tag RUDY KURNIAWAN, credit U.S. ICE · PUBLIC DOMAIN) | YT: replaces the name card on the case board (id tag, at @Ruddy); TT: replaces the "THE SELLER" card (at the 3rd "he" = "He got convicted"); IG: new card with the kitchen photo (at "seller's") | https://commons.wikimedia.org/wiki/File:Rudy_Kurniawan_4-7-21_ICE.jpg | Public domain | U.S. Immigration and Customs Enforcement |
| brand/photos/rudy-kurniawan/3.jpg (his kitchen photographed by investigators; "GOVERNMENT EXHIBIT" sticker visible; credit U.S. GOVERNMENT TRIAL EXHIBIT · PUBLIC DOMAIN) | YT: above the illustrated bench (at "prosecutors"); TT: above the bench (at "prosecutors" +0.25); IG: above the bench (at "prosecutors" -0.1) | https://commons.wikimedia.org/wiki/File:Rudy_Kurniawan%27s_kitchen.jpg | Public domain | U.S. Government |
Footnote line on every cut: "PHOTOS: U.S. ICE; U.S. GOVERNMENT TRIAL EXHIBIT · PUBLIC DOMAIN VIA WIKIMEDIA COMMONS". No stock added (nothing obviously good and logo-free). The YT winemaker silhouette stays (it is the winery's winemaker, not Kurniawan; no photo). The ICE photo is from 2021 (his deportation), shown with the 2006/2013 case labels; the card credit does not say 2021 (credit text as specified).

## Photo-pass notes
- Photo cards sit above the bench, clear of numbers/captions/hook; the bench beats were reframed (`maxH 880`, `sy 905`) so the stack ends above the caption band and below the title pill.
- TT: the kitchen photo's top edge tucks behind the title pill during the 8-10 s presenter beats (pill is on top; cosmetic). TT 11.0 s is an empty beat (the pause after "prison" before "He got convicted": by design, hold).
- "THE SELLER?" screen text exits before the photos' zoom frames so it never sits on a photo.
- Scenes re-keyed to the new wording (Whisper heard 'Wade'/'Kerniawin'; fixed with captions.fix; captions.srt rebuilt from sentences.json).
