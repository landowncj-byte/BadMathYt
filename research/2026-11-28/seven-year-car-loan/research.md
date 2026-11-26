# The true cost of a 7-year car loan
What If · Myth vs Math (everyday cost) · compiled 2026-11-26 for Wed 2026-12-02 15:00 · computed in Python (scratchpad m.py)

## The claim in one line
Stretching the **same car** from 4 years to 7 years drops the payment by **$395 a month** — and costs **$5,287 more** in interest, about 216 hours of median-wage work.

## Assumptions (on screen: "ASSUMES")
- Loan amount **$44,664**, APR **7.0%** — Edmunds' Q3 2026 averages for new-car financing (average term 70.5 months, average payment $787). Experian's Q2 2026 data differs slightly ($43,610, 69.5 mo, $765) — use Edmunds, cite it.
- Fixed rate, no down payment beyond the amount financed, no fees, no early payoff. Interest compounds monthly (standard amortization).
- Not advice; the example holds the rate at 7% for every term (in real life longer loans usually carry higher rates — shown as a bonus line).

## Formula
Payment = P·i / (1 − (1+i)^−n), i = APR/12, n = months. Total interest = payment × n − P.

## Number spine (Python)
| Term | Monthly | Total paid | Interest |
|---|---|---|---|
| 4 yrs (48 mo) | **$1,069.54** | $51,337.68 | **$6,673.68** |
| 5 yrs (60) | $884.40 | $53,064.04 | $8,400.04 |
| 6 yrs (72) | $761.48 | $54,826.33 | $10,162.33 |
| 7 yrs (84) | **$674.10** | $56,624.35 | **$11,960.35** |
| Average 70.5 mo (Edmunds) | $774.53 | $54,604.09 | $9,940.09 |
| 7 yrs @ 9% (bonus) | $718.60 | $60,362.62 | $15,698.62 |

Derived: 7-yr vs 4-yr → monthly **−$395.44**, interest **+$5,286.67**, you pay for **three extra years**. 7-yr interest = **26.8%** of the sticker ($11,960 ÷ $44,664). Extra $5,287 ÷ $24.51/hr (BLS median hourly wage, May 2025) = **215.7 hours = 5.4 forty-hour work weeks**. (Median hourly wage: BLS OEWS May 2025 national table, ✔1 extract.)

## Story loop
STAKES: a car payment that looks affordable. · QUESTION: how is a payment $395 lower "free"? · TWIST: you pay interest for three more years: $5,287 extra, and the car is 7 years old when you're done. · REHOOKS: "payment drops" → "but the total grows" → "work weeks" → "9% version".
Comment bait: "What's your loan term — and did anyone tell you the total?"

## Convictions
None (What If).

## Don't say
- "Never take a long loan" / any advice, lender or brand names, trade-in/negative-equity claims (unsourced).
- "7-year loans are a scam".
- That every dealer pushes them. Keep to the math.

## Pronunciation
$44,664 = "forty-four thousand six hundred sixty-four" · 7.0% = "seven percent" · APR = say "yearly interest rate" · amortization — avoid.

## Hook seeds
1. "That 'low' car payment just cost you five thousand dollars." 2. "A seven-year car loan: same car, three more years of paying for it." 3. "Your car payment dropped $395 a month. Here's the catch."

## Visual ideas
1. Frame 0: two payment slips 1,069 vs 674, "−$395" slams, then "+$5,287" slams. 2. Calendar rows: 4 years (48 boxes) vs 7 years (84 boxes). 3. Interest as a pile of $20s growing beside the car. 4. Work-weeks counter 5.4. 5. 9% bonus bar. Loop to slips.

## Sources
Edmunds Q3 2026 https://www.edmunds.com/press/new-car-financing-records-pile-up-in-q3-as-buyers-borrow-more-and-stretch-loans-longer-according-to-edmunds.html (✔1, cross-check Experian https://experian.com/blogs/ask-experian/average-car-payment) · BLS OEWS https://www.bls.gov/news.release/ocwage.t01.htm · arithmetic.
