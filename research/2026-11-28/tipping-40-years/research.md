# 20% tips for 40 years: the number nobody adds up
What If · Counter (habit × time) · compiled 2026-11-26 for Sun 2026-12-06 19:00 · computed in Python

## The claim in one line
A 20% tip on a $50 meal twice a week is **$1,040 a year — $41,600 over 40 years** (about $207,600 if each year's tips had been invested at an assumed 7%). It also means servers received $41,600 from you.

## Assumptions (on screen: "ASSUMES")
- $50 bill, **2 meals out per week, 52 weeks**, **40 years**; tip = 20% = **$10**. No inflation, no price growth.
- Investment line: end-of-year deposits of $1,040, **7% return (assumption)**, not a forecast and not advice.
- The tip goes to the person who served you; this is not "should you tip".

## Formula
Per year = $10 × 2 × 52 = $1,040. 40 years = $41,600. FV = Σ $1,040 × 1.07^(40−t−1) = $207,620.52.

## Number spine (Python)
| Item | Value |
|---|---|
| One tip | $10 |
| Per year | **$1,040** |
| 40 years (no interest) | **$41,600** |
| 40 years at assumed 7% (investment line) | **$207,620.52** |
| 15% instead of 20% | $780/yr → difference **$260/yr = $10,400 over 40 yrs** |
| Total bills in 40 years | $208,000 ($5,200/yr); tips = 20% of that |
| Same tips, $40 bill once a week | $416/yr → $16,640 |

Comparison: $41,600 = four years of the $10,400 gap between 20% and 15% tips; no unsourced car-price comparison.

## Story loop
STAKES: one $10 tip feels like nothing. · QUESTION: what does the habit add up to? · TWIST: $41,600 — and the "what if invested" line is five times that. · REHOOKS: "$10" → "a year" → "40 years" → "if it grew".
Comment bait: "Tip 20%, 15% or less — and why?" (debate generator; keep neutral).

## Convictions
None.

## Don't say
- "Stop tipping", "servers get too much", anything shaming service workers or tippers. No policy claims (tip credit, minimum wage — unsourced).
- The 7% as a promise. No advice.
- Avoid coffee-habit framing (we already ran $6 coffee at 7% — "$437,000"); this one is a sum of tips, tone neutral. Spare topic; weakest of the 7.

## Pronunciation
$207,620.52 = "two hundred seven thousand six hundred twenty" · 20% = "twenty percent".

## Hook seeds
1. "A ten-dollar tip is a forty-thousand-dollar habit." 2. "You've been spending $1,040 a year on one habit — and never noticed." 3. "Tip 20% for 40 years and here's the total."

## Visual ideas
1. Frame 0: a receipt with "TIP $10" slams, then ×104 per year counter. 2. Receipts piling per year to $1,040. 3. 40-year timeline stacking to $41,600. 4. Bonus bar "if invested: $207,620". 5. 15% vs 20% gap $10,400. Loop to receipt.

## Sources
Arithmetic only.
