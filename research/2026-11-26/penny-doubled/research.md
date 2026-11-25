# Penny doubled — "$1,000,000 today, or one penny that doubles every day for a month?"
What If · Dilemma (A or B) · pure arithmetic · compiled 2026-11-25 for Thu 2026-11-26

## The claim in one line
A penny that doubles daily is worth **$5,368,709.12 on day 30** — but it is still under a million on **day 27**, and it's worth just **$5,242.88 on day 20**. The whole win happens in the last three days, so the right answer depends on how long the "month" is.

## Assumptions (must be on screen: "ASSUMES")
- Day 1 you hold **$0.01**. Each new day the amount you hold doubles. (You are not *paid* a new doubling amount each day — that would be a different, bigger deal: see last rows.)
- Option A is a flat $1,000,000 on day 1. No taxes, no interest on either side. Hypothetical.
- "A month" = 30 days unless stated.

## Formula
Amount on day *n* = $0.01 × 2^(n−1). First day it reaches $1,000,000: 2^(n−1) ≥ 100,000,000 → n − 1 ≥ log₂(100,000,000) = 26.58 → **n = 28**.

## Number spine (Python, 2026-11-25; every row checked by doubling by hand from the row above)
| Day | Exact amount | Note |
|---|---|---|
| 1 | $0.01 | |
| 7 | $0.64 | one week in: not even a dollar |
| 10 | **$5.12** | 2⁹ cents |
| 14 | $81.92 | two weeks |
| 15 | $163.84 | halfway through the month |
| 20 | **$5,242.88** | two-thirds done; A is still 190× bigger |
| 21 | $10,485.76 | three weeks |
| 25 | $167,772.16 | |
| 26 | $335,544.32 | |
| 27 | **$671,088.64** | still LOSING to the million with 3 days left |
| 28 | **$1,342,177.28** | first day ahead (February wins by $342,177.28) |
| 29 | $2,684,354.56 | |
| 30 | **$5,368,709.12** | 2²⁹ cents = 536,870,912 pennies |
| 31 | $10,737,418.24 | a 31-day month doubles it again |

| Derived figure | Value | Working |
|---|---|---|
| Day-30 edge over A | **$4,368,709.12** (5.37×) | 5,368,709.12 − 1,000,000 |
| Share of the final amount made in the last 3 days | **87.5%** ($4,697,620.48) | (day 30 − day 27) ÷ day 30 = 1 − 1/8 |
| If the deal were 27 days | B loses by $328,911.36 | 1,000,000 − 671,088.64 |
| Days B is behind A | 27 of 30 | days 1–27 |
| Weight of the day-30 pile in actual pennies | 536,870,912 × 2.5 g = 1,342,177 kg = **2,958,994 lb ≈ 1,480 US tons** | 2.5 g per cent (US Mint coin specifications — ✔1, from the Mint's published spec; re-check usmint.gov) |
| Different deal (paid the doubling amount every day and you keep them all) | total after 30 days = $0.01 × (2³⁰ − 1) = **$10,737,418.23** | don't mix with the rows above — say which version |

## Story loop (suggested)
STAKES: a million dollars, in your hand, now — or a single penny. · QUESTION: everyone "knows" the penny wins… do you actually know when? · TWIST: on day 20 you have five grand. On day 27 you're still losing. 87.5% of the money shows up in the last three days — and if the month is 27 days, the penny loses. · REHOOKS: "day 10: five dollars" → "day 20: you'd be begging for the million" → "day 27: still behind" → day 30 slam.
Comment question: "Be honest — would you have bailed on day 20?"

## Who was convicted
Nobody. What If. Pure math.

## Don't say
- "You'd have $10.7 million" for the doubling-balance version (that's the pay-every-day total, or day 31).
- "The penny always wins" — false for any deal of 27 days or fewer.
- "This is how compound interest works on your savings" → guru/advice territory (rule 30/42). No investing tie-in. This is not a return anyone can get: 100% a day.
- "The US stopped making pennies in 2025" / "a penny costs 3.7¢ to make" — both widely reported (last circulating pennies struck Nov 2025; FY2024 Mint cost 3.69¢) but **not re-checked today** → ⚠ leave out unless verified at usmint.gov.
- Don't reuse the logged hooks "two buttons A/B" or "$1 every second".

## Pronunciation
- $5,368,709.12 → say "five point three seven million"; show exact.
- $5,242.88 → "about five grand" (TikTok/IG) / "five thousand two hundred forty-two dollars" (YT).
- $671,088.64 → "six hundred seventy-one thousand".

## Visual ideas
1. Frame 0: a single penny spins on the desk next to a brick of cash stamped "$1,000,000"; stamp over the penny: "THE PENNY LOSES FOR 27 DAYS".
2. Calendar grid of 30 squares; each day a stack doubles — for 20 squares the stacks are invisible next to the brick. Camera pushes into day 20: "$5,242.88".
3. Day 27 square flashes red: "$671,088 — STILL BEHIND".
4. Payoff: days 28–30 erupt and bury the brick; "87.5% IN 3 DAYS".
5. Running device: a meter bar "PENNY vs MILLION" that stays near 0% then snaps to 537%.
6. Loop: calendar flips to "FEBRUARY · 28 DAYS" → "…depends on the month" → back to the spinning penny.

## Sources
- Arithmetic only (formula above). Coin weight: United States Mint coin specifications (cent = 2.500 g) https://www.usmint.gov/learn/coins-and-medals/circulating-coins/coin-specifications — not opened today.
