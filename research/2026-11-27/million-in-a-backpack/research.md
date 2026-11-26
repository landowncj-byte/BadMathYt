# Could you carry $1,000,000 in cash? Could you carry $1,000,000,000?
What If · Physical-prop math (movie suitcase myth) · compiled 2026-11-26 for Fri 2026-11-27 · computed in Python

## The claim in one line
$1,000,000 in **$100 bills** weighs about **22 pounds** and fits in a small backpack. In **$20 bills** it's **110 pounds** — and in **$1 bills** it's **1 ton**. A billion in $100s is **10 metric tons**.

## Assumptions (on screen: "ASSUMES")
- Every U.S. bill weighs **about 1 gram** regardless of denomination (BEP FAQ — official).
- Bill size **6.14 × 2.61 in, 0.0043 in thick** (BEP figures as quoted by a physics page ✔1 — not seen on bep.gov itself).
- New-ish bills, loose stack (no bands); a bundle with straps adds a little. Cash only, no counting errors.

## Formula
Bills = value ÷ denomination · weight = bills × 1 g · stack height = bills × 0.0043 in · volume = bills × (6.14 × 2.61 × 0.0043 in³ = 0.0689 in³ = 0.001129 liters).

## Number spine (Python)
| Cash | Bills | Weight | Stack height | Volume |
|---|---|---|---|---|
| **$1,000,000 in $100s** | 10,000 | **10.0 kg = 22.0 lb** | 43 in = 3.6 ft | about **11.3 liters** (a small backpack holds roughly 20–25 L; not sourced) |
| **$1,000,000 in $20s** | 50,000 | **50.0 kg = 110.2 lb** | 215 in = 17.9 ft | about **56 liters** |
| **$1,000,000 in $1s** | 1,000,000 | **1,000 kg = 2,205 lb ≈ 1 metric ton** | 4,300 in = 358 ft (109 m) | about **1,129 liters** (1.13 m³) |
| **$1,000,000,000 in $100s** | 10,000,000 | **10,000 kg = 22,046 lb = 10 metric tons** | 3,583 ft (1,092 m) | about **11,300 liters** (11.3 m³) |
| $1,000,000,000 in $20s | 50,000,000 | 50 metric tons | 17,917 ft (5.46 km) | 56.5 m³ |
| $100,000 in $100s | 1,000 | 1 kg = 2.2 lb | 4.3 in | 1.1 liters |

Source rows: BEP FAQ https://www.bep.gov/currency/faqs ("approximate weight of a note, regardless of denomination, is one gram") ✔ primary (extract); dimensions via hypertextbook quote of BEP https://hypertextbook.com/facts/1999/DeneneWilliams.shtml ✔1 ; size chart https://size-charts.com/topics/house-size-chart/dollar-bills-size-chart ✔1 (secondary).

Derived comparisons (arithmetic; everyday objects NOT sourced → label "about"): $1M in $100s ≈ **2.6 gallons of milk** (22.0 lb ÷ 8.6 lb/gal — milk weight is a common figure, ⚠ unsourced); height 43 in ≈ **a first-grader's height** (⚠ unsourced; or "3.6 ft"). $1M in $1s is **109 m tall** — taller than a **30-story** building? ⚠ don't assert floors; say "109 meters, 358 feet".
Twist: the weight, not the money, is the limit — the same million in $1 bills can't be moved by hand, and a billion in hundreds is 10,000 kg.

## Story loop
STAKES: every heist movie: a bag with a million. · QUESTION: can one person actually run with it? · TWIST: yes in hundreds (22 lb) — but in $20s it weighs as much as a grown teenager, and in ones it's a ton. And a billion is 10 tons no matter how you stack it in hundreds. · REHOOKS: "22 pounds" → "$20s: 110" → "$1s: a ton" → "a billion: 10 tons".
Comment question: "Which would you carry out: hundreds, twenties, or ones?"

## Convictions
None. (Don't tie to real robberies without a verified source.)

## Don't say
- "Movie bags are fake/wrong" unless shown. 
- Any real heist cash amounts (not researched).
- That cash is "heavy" for "everyone" (people differ). Use numbers.
- Don't reuse logged hooks: weight-vs-height-cash is **already built** (your weight in $20s vs your height in $100s) — this angle (carry/ton) must stay distinct: don't repeat the "$100s are five times bigger / 2.56 lb per inch" twist. ⚠ overlap risk: it shares BEP specs; keep it to "could you CARRY it" and avoid "weight vs height". Rank accordingly.

## Pronunciation
- $1,000,000,000 → "one billion dollars" · BEP → say "the U.S. Treasury".

## Visual ideas
1. Frame 0: a gym bag on a scale, needle at 22 lb; $1,000,000 stamp.
2. Three bags: hundreds / twenties / ones; scale readings 22 / 110 / 2,205; the ones bag crushes the scale.
3. Stack heights: 3.6 ft vs 17.9 ft vs 358 ft against a silhouette person.
4. $1B pallet block labelled "10 TONS" with a tiny person next to it.
5. Payoff: forklift icon: "YOU NEED A FORKLIFT".
6. Loop: scale resets to 22 lb.

## Sources
BEP FAQ; hypertextbook; size-charts.com. Arithmetic.
