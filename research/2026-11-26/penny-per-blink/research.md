# Penny per blink — "A penny every time anyone on Earth blinks: you pass the richest person alive before bedtime"
What If · Counter (off-the-wall) · SPARE (#9) · arithmetic + 4 sourced inputs · compiled 2026-11-25 for Thu 2026-11-26

**Access note:** pages could not be opened from this sandbox; inputs come from search-result extracts. The blink rate is the soft input — it is a stated assumption, not a fact (see sensitivity rows).

## The claim in one line
At one cent per human blink, the world's eyelids pay you about **$1.2 billion a minute**: a billionaire in **48 seconds**, richer than the richest person on Earth in about **11½ hours**, and the entire US national debt in about **34 waking days**. Your *own* blinks would pay you $144 a day.

## Assumptions (must be on screen: "ASSUMES")
- World population **8.3 billion** (Nov 2026).
- Everyone blinks **15 times a minute** while awake. Studies range from roughly 10 to 20; 15 is our round middle.
- People are awake **16 hours a day**; nobody blinks asleep. For the first rows we simply assume everyone is awake at once (the per-minute rate); the per-day rows use 16 waking hours.
- $0.01 per blink, paid instantly. Hypothetical.

## Formula
Dollars per minute = population × blinks per minute × $0.01 = 8,300,000,000 × 15 × 0.01 = **$1,245,000,000**.

## Number spine (Python 2026-11-25; re-checked by hand)
| Figure | Exact value | Working | Source for the input | Grade |
|---|---|---|---|---|
| World population | 8,324,412,938 (Worldometer/UN, 2026-11-03); US Census clock ≈ 8.2 billion (projection for July 2026) | we use **8.3 billion** | https://www.worldometers.info/world-population/ ; https://www.census.gov/newsroom/stories/world-population-day.html | ✔2 for "about 8.2–8.3 billion" |
| Blink rate | ~14/min looking straight ahead (review); 19 vs 11/min women vs men (2008 optoelectronic study); ~10/min in lab settings (Wikipedia); individuals range 2–50 | we use **15/min** | https://pmc.ncbi.nlm.nih.gov/articles/PMC3156585 ; https://pubmed.ncbi.nlm.nih.gov/18565090/ ; Bentivoglio et al. 1997 https://pubmed.ncbi.nlm.nih.gov/9399231/ | ⚠ **assumption** — sources disagree; show "ASSUMES 15 BLINKS/MIN" |
| Per minute | **$1,245,000,000** | 8.3e9 × 15 × 0.01 | — | ✔ math |
| Per second | **$20,750,000** | ÷ 60 | — | ✔ |
| First $1,000,000 | **0.048 s** (about 1/20 of a second) | 1,000,000 ÷ 20,750,000 | — | ✔ |
| First $1,000,000,000 | **48.2 seconds** | 1e9 ÷ 20,750,000 | — | ✔ |
| Richest person | Elon Musk, **$869 billion** (Forbes, as of 12 a.m. ET Nov 1, 2026; a page labelled October showed $936B — it moves daily) | | Forbes Australia monthly top-10 https://www.forbes.com.au/news/billionaires/who-are-the-10-richest-people-in-the-world/ | ✔1 dated — re-read Forbes Real-Time Billionaires on build day and show the date |
| Time to pass $869B | **698 minutes = 11 h 38 min** | 869e9 ÷ 1.245e9 | — | ✔ math on a dated input |
| US national debt | **$40.2 trillion** at end of Sept 2026 (GAO report, 2026-11-09); passed $40T on 2026-08-18 (Treasury "Debt to the Penny": $40.047T) | | GAO via IBTimes https://www.ibtimes.co.uk/us-federal-debt-interest-costs-fiscal-2026-1832484 ; NPR/KUOW 2026-08-19 ; Al Jazeera 2026-08-19 | ✔2 for "just over $40 trillion" |
| Time to cover $40.2T | 32,289 min = 538.2 waking hours = **33.6 days** at 16 waking hours/day | 40.2e12 ÷ 1.245e9 ; ÷ 60 ; ÷ 16 | — | ✔ |
| One waking day | **$1,195,200,000,000** ($1.195 trillion) | 1.245e9 × 960 min | — | ✔ |
| One year | **$436.2 trillion** | × 365 | — | ✔ |
| Only YOUR blinks | 14,400 blinks/day → **$144.00 a day → $52,560 a year** | 15 × 60 × 16 ; × 0.01 ; × 365 | — | ✔ |
| Sensitivity: 10 blinks/min | $830M/min · Musk in 17 h 27 min · debt in 50.4 days | | — | ✔ |
| Sensitivity: 17 blinks/min, 8.3B | $1.411B/min · Musk in 10 h 16 min · debt in 29.7 days | | — | ✔ |
| Sensitivity: 8.2B people, 15/min | $1.23B/min · Musk in 11 h 47 min · debt in 34.0 days | | — | ✔ |

## Story loop (suggested)
STAKES: you, one deal: a penny per blink — everyone's blinks. · QUESTION: a penny is nothing… how long until it's real money? · TWIST: you blinked — that was $20 million. Billionaire before this video ends; past the richest human by tonight. And the kicker: your *own* blinks alone are a $52,560-a-year job. · REHOOKS: "first million: one-twentieth of a second" → "billionaire at second 48" (time it to land near second 48 of the YT cut if possible) → "richest person by dinner" → "the US debt takes a month".
Comment question: "What would you do with minute one?"

## Who was convicted
Nobody. What If. Not real.

## Don't say
- "Humans blink exactly X times a minute" — say "about 15, give or take".
- "28,800 blinks a day" or other internet counts — unsourced.
- Musk's number without a date; "trillionaire" claims.
- "A blink lasts 0.1 seconds" (not sourced here) — the tempting line "you'd make a million faster than a blink" is **probably true (0.048 s) but the blink-duration input is unverified** → say "before your eyes even finish closing" only if a source for blink duration (commonly 0.1–0.4 s) is opened; otherwise "in a twentieth of a second".
- Close cousin of the posted "$1 every second" Short: do NOT reuse that hook or its 11.6 days / 31.7 years numbers; this one is a *rate-of-the-whole-planet* gag, not a time-scale explainer.

## Pronunciation
- $1,245,000,000 → "one point two billion dollars a minute" · $20,750,000 → "about twenty million a second"
- 11 h 38 min → "about eleven and a half hours" · $52,560 → "fifty-two grand a year"

## Visual ideas
1. Frame 0: a giant eye blinks at the camera and a penny shoots out with a "cha-ching"; stamp "1 BLINK = 1¢". Then the globe turns into 8.3 billion blinking dots.
2. Running counter (series device) top-centre, racing: milestone flags fly past — $1M (0.05 s) · $1B (48 s) · "RICHEST PERSON" (11.6 h) · "US DEBT" (34 days).
3. Storyteller blinks; a tiny "+$0.01" pops over his head each time — then camera pulls out to the whole planet doing it.
4. Payoff: counter collapses to one line — "JUST YOU: $144 A DAY".
5. ASSUMES card: "8.3B PEOPLE · 15 BLINKS/MIN · AWAKE 16 H".

## Sources
- Population: Worldometer (UN-based), US Census world population clock notes https://www.census.gov/data/data-tools/population-clock/world-notes.html
- Blink-rate literature: links in table
- Forbes monthly top-10 (Nov 1, 2026): link in table
- Debt: GAO (Nov 9, 2026) via press; Treasury Debt to the Penny https://fiscaldata.treasury.gov/datasets/debt-to-the-penny/ (not opened)
- Arithmetic: formulas above.
