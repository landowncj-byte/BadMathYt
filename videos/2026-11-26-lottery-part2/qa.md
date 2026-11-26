# QA — Lottery Part 2 v3 (series: WHAT IF, factual follow-up; buyers are never called criminals; Texas = "shut down its lottery commission")
RE-EDIT (CRIME-SHOW pass): new v3 scripts + final Owen voices. Sources of truth: `_src/{shared,crew,lot,yt3,tt3,ig3}.js` (`_src/build3.sh`). Every spoken line has its own visual beat: `build/AV.md` per cut. Facts: `research/2026-11-26/lottery-part2/research.md`.

## Cuts
| Cut | file | duration | size | LUFS | true peak | narration+0.4 |
|---|---|---|---|---|---|---|
| YouTube | `videos/2026-11-26-lottery-part2/video.mp4` | 68.97 s | 23.0 MB | -14.0 | -1.311763 dBFS | 68.96 s |
| TikTok | `videos/2026-11-26-lottery-part2/tiktok/video.mp4` | 64.53 s | 20.5 MB | -14.1 | -1.380165 dBFS | 64.52 s |
| IG/FB | `videos/2026-11-26-lottery-part2/ig/video.mp4` | 64.30 s | 20.6 MB | -14.0 | -1.409111 dBFS | 64.29 s |

## Characters / recurring cast (camera-focus appearances, count · seconds in focus · start times)
- **YouTube** (69.0 s): THE AUSTRALIAN FUND (crew card): 11 appearances, 18 s (26%), at [0.0, 2.0, 4.8, 8.5, 10.3, 11.7, 14.3, 18.6, 20.7, 30.9, 67.8]; THE STATE OF VIRGINIA (official): 10 appearances, 17 s (24%), at [10.3, 21.1, 23.6, 25.2, 27.4, 30.9, 33.8, 44.9, 64.1, 67.1]; THE TEXAS GROUP: 4 appearances, 4 s (6%), at [52.9, 54.8, 57.7, 59.8]
- **TikTok** (64.5 s): THE AUSTRALIAN FUND (crew card): 10 appearances, 15 s (23%), at [0.0, 2.0, 7.5, 10.2, 14.1, 17.8, 25.4, 28.0, 33.1, 63.2]; THE STATE OF VIRGINIA (official): 11 appearances, 16 s (25%), at [7.5, 10.2, 18.6, 19.1, 28.7, 30.3, 33.1, 35.0, 46.0, 60.7, 62.3]; THE TEXAS GROUP: 1 appearances, 1 s (1%), at [51.6]
- **IG/FB** (64.3 s): THE AUSTRALIAN FUND (crew card): 10 appearances, 17 s (26%), at [0.0, 1.5, 4.5, 8.6, 12.6, 14.9, 20.3, 22.8, 31.4, 63.2]; THE STATE OF VIRGINIA (official): 14 appearances, 18 s (28%), at [0.0, 1.5, 4.5, 8.6, 24.7, 25.1, 27.3, 28.8, 31.4, 33.0, 42.8, 61.7, 62.4, 63.2]; THE TEXAS GROUP: 5 appearances, 6 s (10%), at [49.1, 51.3, 54.0, 55.9, 58.0]

## script_gate.py --all (real timings)
```
PASS  YouTube (whatif) cut · 17 lines · 200 words · 68.8 s (voiced timings) · videos/2026-11-26-lottery-part2/voice/script.json
FAIL  TikTok (whatif) cut · 16 lines · 187 words · 64.3 s (voiced timings) · videos/2026-11-26-lottery-part2/tiktok/voice/script.json
   ✗ CTA SHARE missing in the 45–65% window (found: "Send this" at 67%)
FAIL  IG/FB (whatif) cut · 16 lines · 178 words · 64.0 s (voiced timings) · videos/2026-11-26-lottery-part2/ig/voice/script.json
   ✗ PACING: one line runs 7.4 s (max 7.0 s) — split it: "This is part two, and in nineteen ninety-two, an Australian …"
```

## VIDEO GATE (YT / TT / IG)
| # | Result | Note |
|---|---|---|
| V1 | see script_gate block | the voiced scripts are final (Opus); gate FAILs, if any, are script-level (listed above), not build-level |
| V2 | YES x3 | watched via 1-fps timestamped sheets + keyframe stills (every beat) |
| V3 | YES x3 | frame 0 = slam hook card (+ PART 2 / TEXAS 2023 stamp), fund/official/cheque or mountain, live number chip rolling from 0, deep boom + stamp at 0 s |
| V4 | YES | picture changes at least every ~2.5 s (camera beat, new card, counter, stamp, calendar flip or dot fill); longest holds ~3 s with a counter or push running |
| V5 | YES | push-ins on 5M / 27M / 1.3M / 20 / 31 / 95M / shutting; storyteller front / behind / beside, never parked |
| V6 | YES | heart (like / tap / double tap), paper plane (send), +FOLLOW tap, comment bubble on the final question; all <= 1.5 s, no banner |
| V7 | YES | payoff = $95M counter + commission sign dropping (~83-90%); loops into frame 0 (hook + fund card + mountain re-slam) |
| V8 | YES | brand lock intact; no glow; WHAT IF pill |
| V9 | YES | see facts table; ILLUSTRATION labels on fund, official, cheque, rulebook, sign, tickets; footnote carries sources + "THE 1992 PURCHASE WAS LEGAL AND VIRGINIA PAID" |
| V10 | YES | captions from script words with fixes (numbers formatted); IG profanity shown as F***ING on screen only |
| V11 | not re-listened | Owen voices are final supplied files |
| V12 | YES | CC0 sfx-library only; master -14 LUFS, peak <= -1 dBTP; TikTok bed -12 dB (BM2_BED_DB=-12, RULES 113) |
| V13 | n/a | not posted |

## On-screen facts (research/2026-11-26/lottery-part2/research.md)
| On screen | Source / grade |
|---|---|
| 5,000,000+ TICKETS BOUGHT (HUD) | WaPo ~5M, Roanoke Times 5.6M -> "more than five million" (voiced "over five million") ✔2 |
| $27,000,000 cheque + STATE RECORD | UPI + Roanoke Times ✔2 |
| AN AUSTRALIAN FUND / THE AUSTRALIAN FUND card | Roanoke Times + WaPo/UPI ✔2 (generic coloured ILLUSTRATION, no real people) |
| Rulebook "TICKETS MUST BE BOUGHT AT A LICENSED RETAILER" | rule documented (WaPo/Roanoke Times); generic card |
| LoC photo "LICENSED · A STORE · ILLUSTRATIVE" | Library of Congress, no known restrictions (1930s street ticket seller) - illustrative only |
| ticket bundles "printed in bulk" | generic ILLUSTRATION |
| 1992 calendar FEB 15 -> MAR 10; WEEKS OF DOUBT 3 | WaPo "Va. Lotto Payoff Approved", UPI, Roanoke Times ✔2 (about three weeks) |
| ? ticket · IN A STORE? IN BULK? HOW? · CAN'T PROVE IT | "nobody could prove how the ticket was bought" UPI Thorson ✔1/✔2 |
| NO PROOF = NO BROKEN RULE · PAID | ✔2 |
| ≈ $1.3M A YEAR × 20 YEARS (PER VIRGINIAN-PILOT, 1997) | research safe wording ($27,036,142 / 20 = $1.35M; UPI $1.03M conflicts) |
| 20 pay slips of $65K = ≈ $1.3M | arithmetic; "~$65K = rough typical US salary" in footnote (assumption) |
| NEW: NO BULK BUYING · EMERGENCY RULES (PER UPI · WASHINGTON POST, 1992) | Lottery Board emergency regulations ✔1/✔2, generic wording |
| 31 YEARS LATER (1992 -> 2023) | arithmetic |
| TEXAS 2023 · $95,000,000 · JACKPOT | Houston Chronicle + LotteryUSA ✔2 |
| dot grid 99% "NEARLY ALL BOUGHT" (each dot ≈ 92,000 of 25.8M combinations) | Rook TX acquired >99% of 25.8M combinations ✔2; spoken "nearly every combination" |
| TEXAS LOTTERY COMMISSION sign + SHUT DOWN tag | script wording "shut down its lottery commission"; KUT + Houston Chronicle ✔2 (lawmakers abolished it) |
Left out: every real person, the pending Texas indictment, "won 14 times", CIA/FBI, per-investor payout, winning numbers, the 5x bond detail, real lottery logos. Buyers are never called criminals.

## CRIME-SHOW BUILD STATUS
RENDERED READY: videos/2026-11-26-lottery-part2/video.mp4 69.0s 23.0MB
RENDERED READY: videos/2026-11-26-lottery-part2/tiktok/video.mp4 64.5s 20.5MB
RENDERED READY: videos/2026-11-26-lottery-part2/ig/video.mp4 64.3s 20.6MB
