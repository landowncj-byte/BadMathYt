# How long to save $1,000,000 on the median salary?
What If · Dilemma/Counter (everyday ambition) · compiled 2026-11-26 for Sat 2026-12-05 11:00 · computed in Python

## The claim in one line
On the US median full-time paycheck ($1,232 a week, $64,064 a year), saving 15% takes **104 years** with no interest — and about **31 years** only if the savings grow 7% a year. Interest does most of the work.

## Assumptions (on screen: "ASSUMES")
- **$64,064/year = $1,232 × 52** — BLS usual weekly earnings, full-time wage and salary workers, **Q3 2026 median (not seasonally adjusted), released 21 Oct 2026** (✔1 extract; re-check the release).
- Savings = a fixed % of that gross pay, deposited at **year-end**, no raises, no taxes on gains, no inflation.
- Growth line: **7% a year (assumption) and a 4% line** — not forecasts, not advice.

## Formula
No interest: years = $1,000,000 ÷ (pay × %). With rate r: n = ln(1 + FV·r / D) / ln(1 + r), D = yearly deposit.

## Number spine (Python)
| Save % | $/year | No interest | At 7% | At 4% |
|---|---|---|---|---|
| 10% | $6,406 | **156.1 yrs** | 36.6 yrs | 50.5 yrs |
| 15% | **$9,610** | **104.1 yrs** | **31.3 yrs** | 41.9 yrs |
| 20% | $12,813 | **78.0 yrs** | 27.6 yrs | 36.1 yrs |
| 100% (every dollar, no spending) | $64,064 | **15.6 yrs** | — | — |

Derived: you'd save $9,610/year × 31.3 years ≈ $301,000 of your own money at 7% — the other ~$699,000 is growth (arithmetic: 9,610×31.3 = $300,800). Comparison: 104 years is about 2.6 working lifetimes (104 ÷ 40-year career).

## Story loop
STAKES: everyone says "a million is the goal". · QUESTION: how long does it take on a normal paycheck? · TWIST: 104 years if the money just sits there — the time shrinks only because money earns money. · REHOOKS: "100% saved: 15 years" → "10%: 156" → "with growth: 36" → "the gap is growth".
Comment bait: "What % do you save?"

## Convictions
None.

## Don't say
- "Invest in the stock market / index funds", any return as promised, "you need $1M to retire" (unsourced).
- That the median earner can or can't save — no morals.
- BLS median equals "average person" — it's the full-time worker median.

## Pronunciation
$1,232 = "twelve thirty-two" · $64,064 = "sixty-four thousand sixty-four" · BLS = "the government's labor stats".

## Hook seeds
1. "On a normal paycheck, saving a million dollars takes 104 years. Unless this happens." 2. "A million bucks: 15 years if you save every dollar you earn." 3. "Most people can't save a million. The math says why."

## Visual ideas
1. Frame 0: a paycheck $1,232 → ×52 = $64,064; stamp "104 YEARS". 2. Pie: 15% slice = $9,610. 3. Progress bar to $1M with a calendar flipping years. 4. Split bar: your money vs growth (31 years). 5. 10/15/20% table. Loop to paycheck.

## Sources
BLS Q3 2026 release https://www.bls.gov/news.release/archives/wkyeng_10212026.htm (extract $1,232) · arithmetic.
