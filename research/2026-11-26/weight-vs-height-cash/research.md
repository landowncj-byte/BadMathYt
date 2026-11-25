# Weight vs height — "Your weight in $20 bills, or your height in $100 bills?"
What If · Dilemma (A or B) · pure arithmetic + 3 sourced inputs · compiled 2026-11-25 for Thu 2026-11-26

**Access note:** no page could be opened from this sandbox (all fetches fail); inputs were read in search-result extracts of uscurrency.gov / bep.gov / cdc.gov. Re-open the three input pages before publishing.

## The claim in one line
Pile A is your body weight in $20 bills; stack B is $100 bills stacked flat as tall as you. For the average American adult, the "small" bills win — by about $200,000 for men — and the line between A and B is one number: **2.56 pounds per inch of height**.

## Assumptions (must be on screen: "ASSUMES")
- Every US banknote, any denomination, weighs **1 gram** (official figure is "approximately 1 gram").
- A note is **0.0043 inches** thick; the stack is flat, crisp, uncompressed notes.
- 1 lb = 453.59237 g (exact definition).
- "Average American" = CDC measured averages, adults 20+, Aug 2021–Aug 2023.
- Hypothetical. Nobody is offering this. Notes are counted whole (rounded down).

## Formulas
- Pile A value = floor(weight_lb × 453.59237) notes × $20 → **$9,071.85 per pound**
- Stack B value = floor(height_in ÷ 0.0043) notes × $100 → **$23,255.81 per inch** (232.56 notes per inch)
- Break-even: weight_lb × 20 × 453.59237 = height_in × 100 ÷ 0.0043 → **weight ÷ height = 2.5635 lb per inch**. Heavier than that per inch → take the weight. Lighter → take the height.

## Number spine (computed in Python 2026-11-25, re-checked by hand)
| Figure | Exact value | Working | Source | Grade |
|---|---|---|---|---|
| Note weight | ≈ 1 g, every denomination | — | US Currency Education Program https://www.uscurrency.gov/currency-facts ("no matter the denomination, a banknote weighs approximately 1 gram"); BEP FAQ https://www.bep.gov/currency/faqs | ✔2 (two government pages, via extract) |
| Note thickness | 0.0043 in | — | Bureau of Engraving and Printing (archived moneyfactory.com FAQ: "thickness is .0043 inches"); repeated by Alliant CU, Wikipedia | ✔2, but the current uscurrency.gov page was not seen stating it → show as an ASSUMES line |
| Avg US man (20+) | **199.0 lb, 68.9 in** | — | CDC FastStats Body Measurements https://www.cdc.gov/nchs/fastats/body-measurements.htm (Anthropometric Reference Data, Aug 2021–Aug 2023) | ✔ primary via extract |
| Avg US woman (20+) | **171.8 lb, 63.5 in** | — | same | ✔ primary via extract |
| Avg man, A (weight in $20s) | 90,264 notes → **$1,805,280** | 199.0 × 453.59237 = 90,264.88 g | arithmetic | ✔ |
| Avg man, B (height in $100s) | 16,023 notes → **$1,602,300** | 68.9 ÷ 0.0043 = 16,023.26 | arithmetic | ✔ |
| Avg man: A beats B by | **$202,980** | 1,805,280 − 1,602,300 | arithmetic | ✔ |
| Avg woman, A | 77,927 notes → **$1,558,540** | 171.8 × 453.59237 = 77,927.17 | arithmetic | ✔ |
| Avg woman, B | 14,767 notes → **$1,476,700** | 63.5 ÷ 0.0043 = 14,767.44 | arithmetic | ✔ |
| Avg woman: A beats B by | **$81,840** | | arithmetic | ✔ |
| Break-even ratio | **2.5635 lb per inch** | (100 ÷ 0.0043) ÷ (20 × 453.59237) = 23,255.81 ÷ 9,071.85 | arithmetic | ✔ |
| Break-even weights | 5'0" → 153.8 lb · 5'4" → 164.1 · 5'6" → 169.2 · 5'9" → 176.9 · 5'10" → 179.4 · 6'0" → 184.6 · 6'3" → 192.3 | height_in × 2.5635 | arithmetic | ✔ |
| Example: 150 lb, 5'10" | A $1,360,760 vs B $1,627,900 → **height wins by $267,140** | 68,038 notes vs 16,279 notes | arithmetic | ✔ |
| Example: 250 lb, 6'0" | A $2,267,960 vs B $1,674,400 → weight wins by $593,560 | 113,398 vs 16,744 notes | arithmetic | ✔ |
| The twist number | The $1.6M height stack of hundreds weighs only **35.3 lb** | 16,023 g ÷ 453.59 | arithmetic | ✔ |
| The other twist | The 199-lb pile of twenties, stacked, would be **32.3 feet tall** | 90,264 × 0.0043 = 388.1 in | arithmetic | ✔ |
| Sanity flip | Weight in **$100s** (avg man) = $9,026,400; height in **$20s** = $320,460 | same counts × other bill | arithmetic | ✔ — shows why the question is built with small bills on the heavy side |

## Story loop (suggested)
- STAKES: you, right now, two piles of real cash, pick one.
- QUESTION: twenties are worth 5× less — so B is obviously better… right?
- TWIST: a pound of paper is 454 notes; an inch is only 233. For the average American, the twenties win by $200K. The deciding number isn't the bill, it's your pounds-per-inch: 2.56.
- REHOOKS: "the hundreds stack only weighs 35 pounds" → "the twenties pile would be three storeys tall" → "here's your number: height in inches × 2.56".
- Comment question (after payoff): "A or B — and be honest about the scale."

## Who was convicted
Nobody. What If, hypothetical. No real offer exists.

## Don't say
- "A dollar bill weighs exactly 1 gram" → "about a gram" (official wording: approximately).
- Any body-shaming line. This roasts nobody; the joke is "the scale finally pays". Never "fat".
- "BMI over X" as the rule — BMI uses height squared; our rule is linear (lb per inch). At 5'9" the break-even 176.9 lb happens to equal BMI ≈ 26.1, but that changes with height. Don't mention BMI.
- "The average American is 5'9" and 200 lb" without "man" and "CDC" — women's numbers differ.
- Used-note thickness/weight (dirt, wear) — unknown; we assume crisp notes.

## Pronunciation
- $1,805,280 → say "about one point eight million"; show exact on screen.
- 2.56 → "two point five six pounds per inch" (or "about two and a half pounds for every inch").
- 0.0043 → don't voice; on-screen ASSUMES only.

## Visual ideas
1. Frame 0: storyteller on a giant scale on the left (pile of green twenties slamming down), a measuring tape and a thin tower of hundreds on the right. Stamps: "A: YOUR WEIGHT IN $20s" / "B: YOUR HEIGHT IN $100s". Not the "two buttons" layout (already used) — use a **scale vs tape measure**.
2. Counter race: two money counters spin up side by side; B looks like it's winning (bigger bill) then A blows past at the end.
3. Zoom into one inch of stack: "233 NOTES". Zoom into one pound on the scale: "454 NOTES".
4. The 35-lb reveal: storyteller lifts the entire $1.6M stack with one hand.
5. Payoff card: a slider "YOUR HEIGHT × 2.56 = YOUR NUMBER", with 5'4" → 164, 5'9" → 177, 6'0" → 185 ticking through. Loop: slider snaps back to the scale.

## Sources
- US Currency Education Program, Currency Facts: https://www.uscurrency.gov/currency-facts
- Bureau of Engraving and Printing FAQ: https://www.bep.gov/currency/faqs
- CDC NCHS FastStats, Body Measurements (data Aug 2021–Aug 2023): https://www.cdc.gov/nchs/fastats/body-measurements.htm
- Arithmetic: formulas above (script output kept by the researcher; every row reproducible with a calculator).
