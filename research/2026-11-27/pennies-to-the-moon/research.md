# How much money does it take to stack pennies all the way to the Moon?
What If · Everyday-object scale math · compiled 2026-11-26 for Fri 2026-11-27 · computed in Python

## The claim in one line
A single stack of pennies to the Moon needs **about 253 billion pennies = $2.53 billion** — **less than 1.25× the record lottery jackpot** (Powerball $2.04 billion advertised, 2022). The same stack in **dollar bills** would cost **$35.2 trillion**.

## Assumptions (on screen: "ASSUMES")
- Average Earth–Moon distance **384,400 km** (NASA average; the real distance swings about ±5%).
- Penny thickness **1.52 mm**, weight **2.5 g** (US Mint spec table; older Mint pages said 1.55 mm).
- Bill thickness **0.0043 in = 0.10922 mm** (BEP figure via a physics page).
- A perfectly straight, stable stack (impossible: it'd collapse; gravity ignored). Hypothetical.

## Formula
Pennies = 384,400,000 m ÷ 0.00152 m = **252,894,736,842** → ÷ 100 = **$2,528,947,368**. Bills: 384,400,000 m ÷ 0.00010922 m = **3.52 × 10¹³** bills.

## Number spine (Python)
| Figure | Value | Source | Grade |
|---|---|---|---|
| Penny thickness | **1.52 mm** | US Mint coin specifications https://usmint.gov/learn/coin-specifications ; Mint media kit https://www.usmint.gov/news/media-kit/penny | ✔2 (current table; older page 1.55 mm) |
| Penny weight | **2.50 g**, 19.05 mm diameter | Mint media kit | ✔1 primary |
| Earth–Moon distance | **384,400 km** average | NASA/astronomy standard figure | ⚠ not opened this run; universally cited |
| Pennies needed | **≈ 252.9 billion** | arithmetic | derived |
| Cost | **≈ $2.53 billion ($2,528,947,368)** | arithmetic | derived |
| Weight of the stack | 252.9B × 2.5 g = **632,237 metric tons** (≈1.39 billion lb) | arithmetic | derived |
| Powerball record | **$2.04 billion** advertised jackpot (annuity), lump sum **$997.6 million**, Nov 7/8 2022, one California ticket | Powerball release https://www.powerball.com/ticket-california-wins-world-record-204-billion-powerball-jackpot ; NPR https://www.npr.org/2022/11/08/1135068822/powerball-jackpot-drawing-delayed | ✔2 |
| Comparison | moon-stack $2.53B = **1.24×** the $2.04B jackpot, **2.54×** the $997.6M cash value | arithmetic | derived |
| Per person | $2.53B ÷ 8.2 billion people = **31 cents** each; ÷ 342M Americans = **$7.39** each | arithmetic (US pop. ⚠ unsourced) | derived; use world 31¢ only |
| Pennies around the Earth | equator 40,075 km → **263.7 million pennies = $2.64 million** | arithmetic (circumference standard) | ⚠ circ. unsourced |
| Height check | Everest 8,849 m = 5.82 million pennies = **$58,217** | arithmetic (height ⚠ unsourced) | derived |
| Dollar bills version | 3.52 × 10¹³ = **35.2 trillion bills = $35.2 trillion** | arithmetic | derived |
| Hundreds version | **$3.52 quadrillion** | arithmetic | derived |

Twist: the Moon in pennies is only **31 cents per human on Earth**. Counter-twist: swap in dollar bills and it's **$35.2 trillion** — about **17,000 times** the record lottery jackpot ($35.195T ÷ $2.04B = 17,252).

## Story loop
STAKES: pennies are the most worthless money — stack them to the Moon. · QUESTION: how rich do you have to be? · TWIST: $2.5 billion — barely more than the biggest lottery jackpot ever. But swap in dollar bills and it's $35 trillion: the thinnest coin is the cheapest ladder. · REHOOKS: "253 billion pennies" → "632,000 tons" → "less than a Powerball" → "now with $1 bills".
Comment question: "What would you stack to the Moon?"

## Convictions
None.

## Don't say
- That the stack could stand ("it would collapse under its own weight / the Moon moves" — fine to say, but unmeasured).
- "A penny costs more than a penny to make" — not re-verified (see 11-25 penny notes).
- Real wealth comparisons to named people/companies.
- Cost to launch/NASA budgets.
- Don't repeat the logged "penny doubling" hook or "million vs billion" comparisons.

## Pronunciation
- $2,528,947,368 → "two point five three billion" · 3.52 × 10¹³ → "thirty-five trillion" · 632,237 tons → "about six hundred thirty thousand tons".

## Visual ideas
1. Frame 0: one penny, camera pulls up a tower of coins into space; counter "253,000,000,000".
2. Price tag "$2.53 BILLION" next to a lottery ticket "$2.04B" — taller.
3. Weight scale "632,000 TONS".
4. Swap to a green $1 bill column — counter whirls to "$35.2 TRILLION".
5. "31¢ PER PERSON ON EARTH" payoff.
6. Loop: penny falls over.

## Sources
US Mint, Powerball, NPR; arithmetic. Moon distance and population: general figures, not opened.
