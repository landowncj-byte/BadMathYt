# How many hours of work does your phone really cost?
What If · Scale Swap (money → time) · compiled 2026-11-26 for Fri 2026-12-04 15:00 · computed in Python

## The claim in one line
A $1,000 phone costs the median worker **41 hours** of pay. Add a $70/month plan for three years and the real bill is **$3,520 — 144 hours, three and a half work weeks**.

## Assumptions (on screen: "ASSUMES")
- Median hourly wage **$24.51** (BLS Occupational Employment and Wage Statistics, May 2025, all occupations; ✔1 extract, re-check the table).
- Phone **$1,000**; plan **$70/month** for **36 months**; no trade-in, no insurance, no tax on the phone. Wages are **before** tax, with a second line at an assumed **20%** tax (not a sourced rate).
- Hypothetical price points; not any brand.

## Formula
Hours = cost ÷ hourly wage. Plan total = $70 × 36 = $2,520. Phone + plan = $3,520.

## Number spine (Python)
| Item | Cost | Hours @ $24.51 | Hours @ $19.61 (after assumed 20% tax) |
|---|---|---|---|
| Phone | $1,000 | **40.8** | 51.0 |
| Plan, 1 year ($840) | $840 | 34.3 | 42.8 |
| Plan, 3 yrs ($2,520) | $2,520 | 102.8 | 128.5 |
| Phone + 3-yr plan | **$3,520** | **143.6** | **179.5** |

Derived: 143.6 h ÷ 40 = **3.6 work weeks**; 143.6 ÷ 8 = **18 work days**; after-tax 179.5 h ≈ **22.4 work days**. $3,520 ÷ 36 months = $97.78/month all-in. Comparison: 40.8 hours ≈ a full work week plus one extra day.

## Story loop
STAKES: you tap your phone 100 times a day without thinking about the price. · QUESTION: what is it really costing you — in hours? · TWIST: the plan costs more than the phone ($2,520 vs $1,000). · REHOOKS: "41 hours" → "the plan" → "144 hours" → "after tax: 22 work days".
Comment bait: "What do you pay a month — add it up."

## Convictions
None.

## Don't say
- Brand/model names, "don't buy a phone", carrier names, "phones are a waste".
- Real prices/plan costs as averages (not sourced). Don't claim the median wage is "what you earn".
- Tax rate as fact.

## Pronunciation
$24.51 = "twenty-four fifty-one" · BLS = say "the government's labor statistics" · 143.6 = "about a hundred and forty-four".

## Hook seeds
1. "Your phone costs you 144 hours of your life." 2. "The phone isn't the expensive part. The plan is." 3. "You worked three and a half weeks for the thing in your hand."

## Visual ideas
1. Frame 0: phone icon + clock ticking "144 HOURS". 2. Pay-stub hours bar filling for each cost. 3. Calendar with 18 days highlighted. 4. Plan bar overtakes phone bar. 5. After-tax shift 18 → 22. Loop to clock.

## Sources
BLS OEWS May 2025 https://www.bls.gov/news.release/ocwage.t01.htm (extract $24.51) · arithmetic.
