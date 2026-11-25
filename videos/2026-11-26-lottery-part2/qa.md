# QA — Lottery Part 2 (series: WHAT IF, factual follow-up; nobody is called a criminal, no GUILTY stamp, no people)
Cuts: YouTube `video.mp4` 48.97 s / 36.5 MB · TikTok `tiktok/video.mp4` 35.50 s / 24.6 MB · IG/FB `ig/video.mp4` 23.77 s / 17.1 MB. Sources of truth: `_src/{shared,yt,tt,ig}.js` (`_src/build.sh`). Contact sheets (1 fps, timestamped): `contact_sheet.png`, `tiktok/contact_sheet.png`, `ig/contact_sheet.png`. script_gate `--all`: PASS x3 (TikTok warns 92 words vs 90 target; voiced script is final).

## VIDEO GATE (YT / TT / IG)
| # | Result | Note |
|---|---|---|
| V1 | PASS / PASS / PASS | script_gate.py --all on real sentences.json |
| V2 | YES x3 | watched via 1-fps timestamped sheets + beat stills (not a 24-frame sheet) |
| V3 | YES x3 | frame 0 = PART 2 stamp slam + full hook text, deep boom + stamp + paper slam at 0 s; no fade/title card |
| V4 | YES (borderline) | change every 2-3 s; longest holds ~4 s (YT calendar 34-39 s with follow tap + camera moves; TT calendar 19-22 s with plane; IG cheque fan 9-13 s) |
| V5 | YES | push-in on 5,000,000 / 27 / 1.3 / 31 / 2023 / 95 / "shutting"; storyteller moves left/right/front/behind per beat |
| V6 | YES | heart (YT "like", TT "heart", IG "double tap"), plane (send, all three), storyteller +FOLLOW tap (YT, TT; IG has no follow line in script), comment bubble on final question; all < 1.5 s, no banner |
| V7 | YES | biggest hit = Texas mountain + $95,000,000 (YT @95 40.6 s of 49 = 83%; TT sign drop 29.7 s = 84%; IG @95 19.9 s = 84%); whips back to frame-0 composition (hook re-slams) |
| V8 | YES | brand lock intact; no glow; WHAT IF pill + stage |
| V9 | YES | see facts table; "ILLUSTRATION" labels on cheque, ticket, rulebook, sign; footnote carries "1992 PURCHASE WAS LEGAL AND VIRGINIA PAID" + sources |
| V10 | YES | captions from script wording via captions.fix (numbers formatted, no [tags], gap 16); IG profanity shown as F***ING (censored on screen only) |
| V11 | not re-listened (voice unchanged from supplied files) | |
| V12 | YES | CC0 library sfx only; master -14.0/-14.1/-14.0 LUFS, peak <= -1.3 dBTP; hits on the stamp/payoff words |
| V13 | n/a (not posted) | |

Lessons-from-review checks: (1) frame 0 shows the full hook, storyteller sits bottom-left below the text; (2) on-screen text/buttons kept above the caption band (screen text at y 360-440, CTA micro-moments at y <= 1190), SEND label moved off the number; (3) temporary text uses `out` (fades+drops), hook text exits at the question, no leftovers behind captions (TT "25.8M" line removed before the presenter beat).

## Series note (revised)
All three cuts now use series `whatif` (yellow WHAT IF pill, cool Ink stage), as beats.md specified; DECODED is reserved for convicted/pleaded cases and nobody here was convicted. PART 2 tag kept (frame-0 stamp + pill title on every frame). Footnote now reads "THE 1992 PURCHASE WAS LEGAL AND VIRGINIA PAID · SOURCES: UPI · WASHINGTON POST" (+ Roanoke Times / Virginian-Pilot / KUT / Houston Chronicle and the ILLUSTRATIONS line); the "NO CONVICTIONS" wording is dropped. Stills re-checked after the theme change: red stamps/PAID/EMERGENCY on paper, gold/green hook text and captions all keep contrast on the cool stage; THE SNAG? / SOLVED? screen text moved to y 365 so it no longer collides with the rulebook header.
Year roll hold: 2023 is on screen, landed, for >= 0.8 s before the whip to Texas (YT lands ~38.9 s, whip starts ~39.8 s; TT lands ~22.8 s, whip ~23.6 s; IG lands ~17.7 s, whip ~18.7 s). The calendar now flips to TEXAS slightly before the word "Texas" is spoken (YT after "again,", TT during the pause before "'Cause").

## On-screen facts (research/2026-11-26/lottery-part2/research.md)
| On screen | Cut | Source / grade |
|---|---|---|
| PART 2 · 5,000,000+ TICKETS · THEY WON | YT | "over five million" voiced; WaPo ~5M, Roanoke Times 5.6M (research: say "more than five million") |
| $27,000,000 (prize cheque, "STATE RECORD" rosette, PER UPI MAR 10 1992) | all | UPI + Roanoke Times, ✔2 ("$27 million", "state record"); exact dollars not shown |
| WINNER: A FUND IN AUSTRALIA / PAY TO: AN AUSTRALIAN FUND | YT (TT/IG cheque payee only) | Roanoke Times + WaPo/UPI, ✔2 |
| VIRGINIA INVESTIGATES | YT | WaPo/Roanoke Times/UPI Feb-Mar 1992, documented |
| Rulebook: "TICKETS MUST BE BOUGHT AT A LICENSED RETAILER" (red underline) | all | Roanoke Times/WaPo; rule documented (generic ILLUSTRATION card, not real text) |
| FEB 15 -> MAR 10, 1992 · PAYOUT DECISION · NO BROKEN RULE PROVEN | YT (text only in TT/IG) | WaPo "Va. Lotto Payoff Approved" + UPI + Roanoke Times, ✔2 |
| PAID ✓ (PAY / DON'T PAY stamp) | all | ✔2 |
| ≈ $1.3M A YEAR × 20 YEARS (PER VIRGINIAN-PILOT, 1997) | all | research safe wording (UPI $1.03M conflicts; arithmetic $1.35M); 20 yearly payments |
| EMERGENCY RULES · NEW: NO BULK BUYING (PER UPI · WASHINGTON POST, 1992) | all | Lottery Board emergency regulations, kept generic (no 5x bond / walk-up details) |
| 1992 -> TEXAS 2023 calendar; 31 YEARS LATER | YT (31 only); calendar in all | arithmetic 2023-1992 = 31, voiced in YT |
| TEXAS · 2023 · $95,000,000 · JACKPOT · AGAIN | all | Houston Chronicle + LotteryUSA, ✔2 |
| NEARLY ALL 25.8M COMBINATIONS | TT | Rook TX acquired >99% of 25.8M combinations, ✔2 (voiced as "nearly every combo") |
| TEXAS LOTTERY COMMISSION sign -> ABOLISHED tag (PER KUT · HOUSTON CHRONICLE) | YT, TT | "Texas lawmakers abolished the Lottery Commission" KUT + Houston Chronicle, ✔2; script says "shutting down"; sign + tag read "TEXAS LOTTERY COMMISSION / ABOLISHED". IG ends at $95M (script has no commission line) |
Left out: every person, the pending Texas indictment, "won 14 times", CIA/FBI, per-investor payout, winning numbers, "5x bond" detail, real lottery logos. State names are plain text.

## Open doubts
- Rendering took ~9 min for YT; the 1-fps sheets cannot show the audio. V11 (listening) not redone.
- The TikTok cut is 92 words (gate warns, passes); IG shows "F***ING" censored while the voice says it uncensored.
