# Parlay math — "Your 10-leg parlay hands the sportsbook 37%"
What If · Myth vs Math · pure arithmetic · compiled 2026-11-24/25

## The claim in one line
At standard −110 pricing the book keeps about 4.5% of a single bet. Multiply ten of those bets together and the book's theoretical cut is 37%.

## Assumptions (must be on screen)
- Every leg is a true 50/50 (a fairly-lined point spread or total).
- Every leg is priced at **−110** (risk $110 to win $100).
- Legs are independent; parlay pays the legs' decimal odds multiplied together ("true-odds" parlay, the standard for modern US books).
- No pushes, no promos, no taxes. Hypothetical.
- Real same-game parlays are priced by the book's own model and are not covered by this formula.

## Formula
- Decimal payout of one −110 bet: 1 + 100/110 = **1.9091**
- n-leg parlay payout multiple: **1.9091ⁿ**
- True chance of hitting n coin flips: **(½)ⁿ**
- Expected return per $1 = 1.9091ⁿ × (½)ⁿ = **0.9545ⁿ**
- House edge = 1 − 0.9545ⁿ

## Number spine (all computed; script: Python, 2026-11-25)
| Figure | Exact value | What it means | Source | As-of |
|---|---|---|---|---|
| 1 leg | pays 1.91×, true odds 1 in 2, return 95.45% → **edge 4.55%** | Baseline "vig" | arithmetic | — |
| 2 legs | pays 3.64×, 1 in 4 → edge 8.88% | | arithmetic | — |
| 3 legs | pays 6.96×, 1 in 8 → edge 13.03% | | arithmetic | — |
| 5 legs | pays 25.36×, 1 in 32 → edge 20.75% | | arithmetic | — |
| 8 legs | pays 176.45×, 1 in 256 → edge 31.08% | | arithmetic | — |
| **10 legs** | pays **643.08×**, true odds **1 in 1,024** → return 62.8% → **edge 37.2%** | The killer number | arithmetic | — |
| 12 legs | pays 2,343.79×, 1 in 4,096 → edge 42.78% | | arithmetic | — |
| Fair 10-leg payout | 1,024× | What a no-cut book would pay | arithmetic | — |
| $10 ten-leg ticket | wins $6,431 total; a fair ticket would return $10,240 → **$3,809 short** | Concrete version | arithmetic | — |
| $10 a day for a year on 10-leggers | stake $3,650 → expected loss 37.2% = **$1,358**; same stake on single bets = $166 | Counter beat | arithmetic (expected value, not a prediction) | — |
| Real-world parlay hold, Illinois | ~18.2% parlays vs ~4.9% straight bets | What books actually kept | https://www.gamblingsite.com/blog/straight-bets-vs-parlays-beginners/ (secondary; underlying = Illinois Gaming Board monthly reports) | 2023 ⚠ secondary |
| Real-world parlay hold, New Jersey | ~24.2% parlays vs ~4.4% everything else | Same | same secondary source (underlying = NJ DGE) | Sept 2024 ⚠ secondary |
| Parlays' share | "around a quarter of handle but more than half of operator revenue" | Why they are advertised | https://sccgmanagement.com/sccg-articles/2025/11/28/are-same-game-parlays-becoming-the-new-lottery/ | 2025 ⚠ industry blog — soften to "a disproportionate share" |
| WaPo investigation | "Parlays are becoming more popular and sportsbooks are making billions" | Mainstream confirmation of the trend | https://www.washingtonpost.com/sports/interactive/2025/parlay-popularity-odds-sportsbooks/ | 2025 (headline only seen) |

Why real hold (18–24%) is lower than 37%: most parlays have 2–4 legs, not 10. The 2–4 leg rows (8.9%–17%) bracket the regulators' numbers, which is a nice consistency check to mention in the description.

## Who was convicted
Nobody — this is legal pricing. It is a What If, not a Decoded. Never use "scam" or "fraud"; use "the math" and "the cut".

## On-screen-safe quotes
None. (No verified quote collected.)

## Commonly repeated but NOT verifiable — don't say
- "Sportsbooks make 30% on parlays" as a national fact — state data cluster around 18–24%; operators don't publish it by bet type.
- "Parlays are 70% of sportsbook profit."
- "Same-game parlays have a 40% edge" — not derivable from public pricing.
- Any claim about a specific named sportsbook.
- "Singles are a good bet" — they still lose 4.5% in expectation; and it would be advice.

## Pronunciation
- Parlay = **PAR-lay** · vig = "vig" (short for vigorish = **VIG-er-ish**)
- −110 = "minus one-ten" · 643-to-1 = "six forty-three to one"
- "1 in 1,024" = "one in one thousand twenty-four"

## Visual ideas
1. Ten coins flip in a row; each lands and a slice comes off a pie labelled "YOUR SHARE": 95% → 91% → 87% … → 63%.
2. Split screen: "FAIR PRICE 1,024×" vs "THEY PAY 643×" with the gap in red: "−37%".
3. Phone betting-slip mock-up (generic, no logos) where each added leg makes a small "house" icon grow.
4. Counter: $10 a day for 365 days; two bars fill — "singles −$166" vs "10-leg parlays −$1,358" (label: expected value).
5. Loop: the last coin flips back into the first.

## Sources
- Arithmetic only for the core claim (formula above).
- Illinois/New Jersey hold figures: gamblingsite.com summary (link above); primary data live at the Illinois Gaming Board and NJ Division of Gaming Enforcement monthly sports-wagering reports (not opened here).
- Washington Post 2025 interactive (link above). Legal Sports Report note that operators don't break out hold by bet type: https://www.legalsportsreport.com/258357/kalshi-parlay-volume-surges-but-sports-prediction-economics-still-lag-sportsbooks/
