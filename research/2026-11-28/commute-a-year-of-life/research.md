# Your commute is a full year of your life
What If · Scale Swap (time → life) · compiled 2026-11-26 for Sun 2026-12-06 15:00 · computed in Python

## The claim in one line
A 26-minute commute each way, 250 workdays a year, for 40 years is **8,800 hours — 367 days, more than a full year with no sleeping, no breaks.** At the median wage that unpaid time is worth about **$215,688**.

## Assumptions (on screen: "ASSUMES")
- One-way commute **26.4 minutes** (Census Bureau ACS, **2022** national average, ✔1 extract — a secondary report says 27.2 min for 2024; re-open data.census.gov Table S0801 to pick the latest).
- Round trip ×2; **250 workdays/year**; **40 working years**; all days commuting (no remote days).
- Median wage **$24.51/hr** (BLS OEWS May 2025) for the dollar line only — your commute time isn't paid.

## Formula
Hours/yr = 26.4 × 2 × 250 ÷ 60 = 220. ×40 = 8,800. ÷24 = 366.7 days.

## Number spine (Python)
| Item | Value |
|---|---|
| Daily round trip | 52.8 min |
| Per year | **220 hours** (about 5.5 forty-hour work weeks) |
| 40 years | **8,800 hours** |
| In 24-hour days | **366.7 days** = a full year, nonstop |
| In work years (2,080 h) | **4.2 years** of full-time work |
| Value at $24.51/hr | **$215,688** |
| Sensitivity: 27.2 min, 240 days | 217.6 h/yr; 8,704 h; 362.7 days; $213,335 |
| 27.2 min, 250 days | 226.7 h/yr; 9,067 h; 377.8 days; $222,224 |

Comparison: 220 hours a year ≈ **9 days** of nonstop driving; 40 years ≈ **365 days**, that is 40% of a calendar year per decade (arithmetic).

## Story loop
STAKES: a boring half hour each way. · QUESTION: what does it add up to? · TWIST: a full year, nonstop, with no sleep — and nobody pays you. · REHOOKS: "52 minutes a day" → "220 hours a year" → "367 days" → "$215K of free time".
Comment bait: "How long is your commute — one way?"

## Convictions
None.

## Don't say
- "Quit your job / move / work remote" advice, or that commuting is wasted ("some people like it").
- 26.4 as the "2024 average" (it's 2022). No gas/car costs unsourced.
- $ value as money lost — it's the value of the time at median pay.

## Pronunciation
8,800 = "eight thousand eight hundred"; $215,688 = "two hundred fifteen thousand"; Census = SEN-sus.

## Hook seeds
1. "Your commute will take a full year of your life, nonstop." 2. "40 years of driving to work = 8,800 hours." 3. "Nobody pays you for the 367 days you'll spend getting to work."

## Visual ideas
1. Frame 0: clock spins, stamp "367 DAYS". 2. Car icon with a 26-minute meter × 2. 3. Calendar 365 squares filling with road icons. 4. Year-of-life bar vs 80-year life (8,800 h ÷ 700,800 h in 80 years = 1.25% of a lifetime). 5. Wage tag $215,688. Loop to clock.

## Sources
Census Bureau ACS (extract: 26.4 min, 2022) https://www.census.gov/library/publications/2021/acs/acs-47.html + data.census.gov S0801 to confirm · BLS OEWS · arithmetic.
