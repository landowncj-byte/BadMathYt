# How much rent do you pay a landlord in a lifetime?
What If · Counter (everyday cost × time) · compiled 2026-11-26 for Sat 2026-12-05 19:00 · computed in Python

## The claim in one line
Rent $1,500 a month and let it rise 3% a year for 40 years, and you pay **$1,357,223** in total — the monthly bill grows to **$4,751** by year 40.

## Assumptions (on screen: "ASSUMES")
- Start **$1,500/month**; rent **+3% every year (assumed)**; 40 years; no moves, no deposits, no renters' insurance, no tax angle.
- Not "rent vs buy" — buying has its own costs, deliberately not compared.
- Hypothetical; not a forecast.

## Formula
Total = Σ_{y=0..39} 12 × 1,500 × 1.03^y = 18,000 × (1.03^40 − 1)/0.03 = $1,357,223.

## Number spine (Python)
| Year | Rent / month |
|---|---|
| 1 | $1,500 |
| 10 | $1,957 |
| 20 | $2,630 |
| 30 | $3,535 |
| 40 | **$4,751** |

| Cumulative paid | Total |
|---|---|
| 10 years | $206,350 |
| 20 years | $483,667 |
| 30 years | $856,357 |
| 40 years | **$1,357,223** |
| Flat rent, no raises (40 yrs) | $720,000 |

Derived: the 3% raises add **$637,223** over flat rent (+88%). Total = **21.2 years** of the median full-time salary ($64,064/yr, BLS Q3 2026 — see million-on-median-salary). The monthly bill triples (×3.17) from year 1 to year 40.

## Story loop
STAKES: one monthly payment you barely think about. · QUESTION: what's the whole lifetime bill? · TWIST: $1.36 million — and half the damage comes from small yearly raises. · REHOOKS: "year 10: $206K" → "year 20: $484K" → "year 30" → "year 40: $4,751 a month".
Comment bait: "What's your rent right now — and what was your first?"

## Convictions
None.

## Don't say
- "Buy a house" / "renting is throwing money away" / any rent-vs-buy conclusion; landlord-bashing.
- Real city rent medians (unsourced here). Inflation as fact (3% is assumed).
- Overlap: keep it away from the Sat 11:00 salary video's 21-years comparison in voiced lines (one reference only).

## Pronunciation
$1,357,223 = "one million three hundred fifty-seven thousand"; $4,751 = "forty-seven fifty-one"; 3% = "three percent".

## Hook seeds
1. "You'll pay your landlord one point three six million dollars." 2. "Your rent triples in 40 years. Here's the bill." 3. "A 3% raise a year turns $1,500 into $4,751."

## Visual ideas
1. Frame 0: a key slams on a stack of cash, counter "$1,357,223". 2. Rent tag climbing each decade. 3. Cumulative stack bars at 10/20/30/40. 4. Flat vs rising rent staircases. 5. 21 years of salary bar. Loop to key.

## Sources
Arithmetic only (assumptions on screen).
