# Double or nothing — "$1,000 for sure, or flip a coin 10 times and double it every time you win?"
What If · Dilemma (A or B) · pure arithmetic · compiled 2026-11-26 for Fri 2026-11-27 · all figures computed in Python (scratchpad m.py)

## The claim in one line
Ten straight wins turn $1,000 into **$1,024,000** — but you only get there **1 time in 1,024 (0.0977%)**. The average payout is still exactly $1,000. **99.9% of the time you walk away with nothing.**

## Assumptions (on screen: "ASSUMES")
- Fair coin, 50/50, each flip independent. One flip: heads = your money doubles, tails = you lose everything.
- You must keep going until all 10 flips are won, or you lose (you cannot stop early). Option A: $1,000 cash for sure, no tax.
- Hypothetical; no casino takes this bet at fair odds.

## Formula
After *n* straight wins: $1,000 × 2ⁿ. Chance of *n* straight wins: (1/2)ⁿ. Expected value = 1,000 × 2ⁿ × (1/2)ⁿ = **$1,000** for any n.

## Number spine (Python)
| Flips won | Money | Chance | Walk away with $0 |
|---|---|---|---|
| 1 | $2,000 | 1 in 2 (50%) | 50% |
| 2 | $4,000 | 1 in 4 (25%) | 75% |
| 3 | $8,000 | 1 in 8 (12.5%) | 87.5% |
| 5 | $32,000 | 1 in 32 (3.1%) | 96.9% |
| 7 | $128,000 | 1 in 128 (0.78%) | 99.2% |
| 10 | **$1,024,000** | **1 in 1,024 (0.0977%)** | **99.90%** |

| Derived | Value | Working |
|---|---|---|
| Expected payout | **$1,000** — identical to A | 1,024,000 × 1/1,024 |
| Odds of $0 | 1,023 out of 1,024 | 1 − 1/1,024 = 99.902% |
| Multiple needed to hit a million | **1,000×** takes 10 doublings (2¹⁰ = 1,024; 2⁹ = 512 is not enough) | log₂(1000) = 9.97 |
| If you quit after 7 flips | $128,000 — but only 1 in 128 people got there | |
| Crowd view | send 1,024 people through: **1 leaves with $1,024,000; 1,023 leave with $0**; total handed out $1,024,000 = $1,000 each on average | |
| Comparison | Reaching 10 heads in a row is as likely as calling a given coin-flip sequence of 10 — "1 in 1,024" is like picking the right day among 2.8 years of days (1,024 ÷ 365 = 2.8 years) | arithmetic |

## Story loop
STAKES: grab $1,000 right now, or ride a coin to a million. · QUESTION: which would you pick? (most say flip.) · TWIST: both are worth exactly the same on average — the flip just hides how rare the win is: 1,023 of every 1,024 people end with nothing. · REHOOKS: "flip 1: $2,000, easy" → "flip 5: $32,000, still 1 in 32" → "flip 10: you are the one in 1,024".
Comment question: "How many flips before you'd quit?"

## Convictions
None. What If.

## Don't say
- "Gambling is always bad" / any betting advice / tie to stocks, crypto, parlays (rule 30/42). Pure coin math.
- "You'll lose" → "99.9% of people leave with $0."
- Don't reuse logged hooks (two buttons A/B, "$1 every second"). Don't reuse the parlay video's "everyone has the same odds" framing — keep it a coin.
- Expected value only in everyday words: "on average, every person gets $1,000".

## Pronunciation
- $1,024,000 → "one million twenty-four thousand" · 0.0977% → "about a tenth of one percent" · 1 in 1,024 → "one in a thousand and twenty-four".

## Visual ideas
1. Frame 0: a bag of $1,000 vs a spinning coin; stamp "SAME AVERAGE".
2. Coin flips ladder: $1K → $2K → $4K → … each rung lights up; most dots go dark.
3. 1,024 stick-figure grid: all fall to gray except ONE gold figure at the end; "1,023 GO HOME WITH $0".
4. Bar "chance of $0": 50% → 75% → 87.5% → 96.9% → 99.9%.
5. Payoff: the gold figure holds $1,024,000 next to a pile of 1,024 × $1,000 bags — same total.
6. Loop: coin lands edge.

## Sources
Arithmetic only (formulas above). Fair-coin assumption stated.
