# $1 on red, 1,000 times: how likely are you to be ahead?
What If · Myth vs Math (house edge) · compiled 2026-11-26 for Thu 2026-12-03 15:00 · exact binomial in Python (not simulation)

## The claim in one line
Bet $1 on red at an American roulette wheel 1,000 times and you finish **ahead only 4.5% of the time (about 1 in 22)** — after just 10 spins it's 31%. You lose **$52.63 on average**.

## Assumptions (on screen: "ASSUMES")
- American wheel: **38 slots** (18 red, 18 black, **2 green: 0 and 00**). Red wins **18/38 = 47.37%**; red pays even money ($1 win, $1 loss). Each spin independent.
- "Ahead" means strictly more than $0 after exactly 1,000 spins; you can't quit early.
- Not a slot machine (slot payouts vary by machine and aren't published here) — roulette's math is exact and public.
- Hypothetical; no betting advice.

## Formula
Net after n spins = 2w − n, w ~ Binomial(n, 18/38). Expected loss per $1 = 1 − 2·(18/38) = 2/38 = **5.26%** (house edge). EV(1,000) = −$52.63.

## Number spine (Python, exact)
| Spins | Chance ahead | Expected net |
|---|---|---|
| 10 | **31.4%** | −$0.53 |
| 50 | 30.3% | −$2.63 |
| 100 | 26.5% | −$5.26 |
| 250 | 18.5% | −$13.16 |
| 500 | 11.1% | −$26.32 |
| 1,000 | **4.48%** (1 in 22.3) | **−$52.63** |

Extra at 1,000 spins: exactly even **0.63%**; behind **94.9%**; down $50 or more **54.6%**; down $100 or more **7.1%**; up $50 or more **0.065% (about 1 in 1,500)**. Median finish **−$52** (474 wins). Single-zero wheel (bonus): EV −$27.03 over 1,000. House edge: 2/38 = 5.263%.

Comparison: 1 in 22 ≈ picking the one winning name in a class of 22 people. $52.63 ≈ a decent dinner (don't price — say "about fifty bucks").

## Story loop
STAKES: a fair-looking coin flip: red or black. · QUESTION: if it's almost 50/50, how bad can it be? · TWIST: the two green slots tilt it, and the longer you play the faster "ahead" disappears: 31% → 4%. · REHOOKS: "10 spins" → "100" → "500" → "1,000".
Comment bait: "How many spins do you play before you walk?"

## Convictions
None.

## Don't say
- "Gambling is a scam / never gamble", systems (Martingale), slot machine odds, casino names.
- That ahead is impossible. "House always wins" → "the house wins on average".
- Don't reuse the parlay (two videos back) or coin-flip framing ("double or nothing") — this is spin count vs "ahead", not payout size.

## Pronunciation
Roulette = roo-LET · 00 = "double zero" · 18/38 = "eighteen out of thirty-eight" · 4.48% = "about four and a half percent" · 5.26% = "just over five percent".

## Hook seeds
1. "Bet $1 on red a thousand times and only one in twenty-two people finish ahead." 2. "Ten spins: you're fine. A thousand spins: you're toast." 3. "Roulette almost looks fair — until you do the math for 1,000 spins."

## Visual ideas
1. Frame 0: wheel with two green slots lighting up, "5.26%". 2. 1,000 stick figures: green ones (ahead) shrink: 31% → 4.5% as spin counter climbs. 3. Chip stack drifting down −$52.63. 4. 1-in-22 class photo (22 figures, one gold). Loop to wheel.

## Sources
Standard roulette rules (38 pockets; public) · exact binomial arithmetic. No external stat needed.
