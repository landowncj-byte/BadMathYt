# QA — Lottery Part 2 (series: DECODED, factual follow-up; nobody is called a criminal, no GUILTY stamp, no people)
Cuts: YouTube `video.mp4` 48.97 s / 35.9 MB · TikTok `tiktok/video.mp4` 35.50 s / 23.8 MB · IG/FB `ig/video.mp4` 23.77 s / 16.6 MB. Sources of truth: `_src/{shared,yt,tt,ig}.js` (`_src/build.sh`). Contact sheets (1 fps, timestamped): `contact_sheet.png`, `tiktok/contact_sheet.png`, `ig/contact_sheet.png`. script_gate `--all`: PASS x3 (TikTok warns 92 words vs 90 target; voiced script is final).

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
| V8 | YES | brand lock intact; no glow |
| V9 | YES | see facts table; "ILLUSTRATION" labels on cheque, ticket, rulebook, sign; footnote carries "NO CONVICTIONS" + sources |
| V10 | YES | captions from script wording via captions.fix (numbers formatted, no [tags], gap 16); IG profanity shown as F***ING (censored on screen only) |
| V11 | not re-listened (voice unchanged from supplied files) | |
| V12 | YES | CC0 library sfx only; master -14.0/-14.1/-14.0 LUFS, peak <= -1.3 dBTP; hits on the stamp/payoff words |
| V13 | n/a (not posted) | |

Lessons-from-review checks: (1) frame 0 shows the full hook, storyteller sits bottom-left below the text; (2) on-screen text/buttons kept above the caption band (screen text at y 360-440, CTA micro-moments at y <= 1190), SEND label moved off the number; (3) temporary text uses `out` (fades+drops), hook text exits at the question, no leftovers behind captions (TT "25.8M" line removed before the presenter beat).

## Series note
The beats.md files say WHAT IF pill; the brief for this build said decoded (factual follow-up), so the red DECODED pill is used with title "PART 2 · LOTTERY · ...". The PART 2 tag is on frame 0 as a stamp and in the pill title on every frame.

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
- YT: the calendar year roll 1992->2023 lands just before the whip to Texas (0.4 s of the final 2023); IG/TT similar.
- The TikTok cut is 92 words (gate warns, passes); IG shows "F***ING" censored while the voice says it uncensored.
