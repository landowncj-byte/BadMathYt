# $1,000,000 now, or $100 every single day for the rest of your life?
What If · Dilemma (A or B) · pure arithmetic · compiled 2026-11-26 for Fri 2026-11-27 · computed in Python

## The claim in one line
$100 a day sounds small, but it adds up to **$36,500 a year** — and it takes **27.4 years** (10,000 days) to pass the million. Whether the daily check wins depends only on how many years you have left.

## Assumptions (on screen: "ASSUMES")
- You get $100 **every day** (365 days/year), paid whether or not you work. No tax, no inflation, no interest on either option. Option A: $1,000,000 cash today.
- "For life" is shown at several ages; the real number of years you'll live is unknowable.
- Hypothetical. This is not investment advice and says nothing about real returns.

## Formula
Break-even = $1,000,000 ÷ $100 per day = **10,000 days** = 10,000 ÷ 365 = **27.4 years**.

## Number spine (Python)
| Item | Value |
|---|---|
| Per day | $100 |
| Per year (365 days) | **$36,500** |
| Per month (average) | **$3,041.67** |
| Days to reach $1M | **10,000** |
| Years to reach $1M | **27.4** |
| If you take it at age 25 and live to 80 (55 yrs) | $2,007,500 — beats A by **$1,007,500** |
| Age 25 → 90 (65 yrs) | $2,372,500 |
| Age 40 → 80 (40 yrs) | $1,460,000 — beats A by $460,000 |
| Age 40 → 90 (50 yrs) | $1,825,000 |
| Age 60 → 80 (20 yrs) | $730,000 — **loses to A by $270,000** |
| Age 60 → 90 (30 yrs) | $1,095,000 — beats A by $95,000 (barely) |
| 30 years of $100/day | $1,095,000 |
| 50 years | $1,825,000 |

Derived: the daily option wins if you collect for **more than 27.4 years** from the day you start. Extra row: age 30 → 90 (60 years) = 60 × $36,500 = $2,190,000, beating A by **$1,190,000**. (No life-expectancy table was opened; every age pair is an example, not a forecast.)

## Story loop
STAKES: a million, in the bank today, vs a hundred bucks a day. · QUESTION: which is bigger? (Most pick the million: "it's a million.") · TWIST: the $100 a day passes it on day 10,000 — about 27 years — and keeps going. But if you're 60 it can lose. · REHOOKS: "year 1: $36,500" → "year 10: $365,000" → "year 27: you catch up" → "your age decides".
Comment question: "How old are you — A or B?" (every viewer self-sorts).

## Convictions
None.

## Don't say
- "Take the daily check, it's always better" → depends on years left.
- Any "invest the million and..." comparison (rule 30/42 — no returns). Maybe one line "this ignores interest and tax" only.
- Don't use the MrBeast "$50,000 a month" structure or name (our own competitor note says it's the pattern; keep numbers/hook different).
- Don't reuse logged hooks (penny doubling, two buttons).

## Pronunciation
- $36,500 → "thirty-six thousand five hundred" · 10,000 days → "ten thousand days" · 27.4 → "twenty-seven point four".

## Visual ideas
1. Frame 0: a brick of cash "$1,000,000" vs a single $100 bill with a sun/moon "EVERY DAY".
2. Day counter climbing; $100 bills piling into stacks per year ($36,500).
3. Race bar: daily pile vs the fixed million; crossover flash at "DAY 10,000".
4. Age slider: 25 / 40 / 60 with verdict stamps WIN / WIN / LOSE.
5. Payoff: calendar of 27 years flipping.
6. Loop: the bill slides next to the brick again.

## Sources
Arithmetic only.
