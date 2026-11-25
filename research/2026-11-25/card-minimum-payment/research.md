# Credit-card minimum — "Pay the minimum on $5,000 and you'll pay $12,811"
What If · Counter · pure arithmetic · compiled 2026-11-24/25

## The claim in one line
A $5,000 balance at today's average card rate, paid at the minimum only, takes 16½ years and costs $7,811 in interest — more than the debt itself.

## Assumptions (on screen)
- Balance **$5,000**, no new purchases, no fees. Hypothetical.
- APR **22.36%** (Federal Reserve G.19, rate on accounts assessed interest, Q3 2026 — relayed by LendingTree; see spine). Monthly rate = 22.36% ÷ 12 = 1.8633%.
- Minimum payment = **1% of the balance + that month's interest, with a $35 floor**. This is the common big-issuer formula; some cards use a flat 2–3% instead (results differ a lot).
- Interest compounds monthly (real cards use daily; difference is small).

## Formula
Each month: interest = balance × APR/12 · payment = max($35, 1% × balance + interest) · new balance = balance + interest − payment. Repeat until zero.

## Number spine (computed, Python, 2026-11-25)
| Figure | Exact value | What it means | Source | As-of |
|---|---|---|---|---|
| Month 1 | interest **$93.17**; payment **$143.17**; debt falls only **$50.00** → $4,950.00 | 65% of your first payment is interest | arithmetic | — |
| Month 2 / 3 | payment $141.73 / $140.32; balance $4,900.50 / $4,851.49 | The minimum *shrinks* as you go, which stretches the loan | arithmetic | — |
| After 5 years | still owe **$2,736** | Counter beat | arithmetic | — |
| Half-way point | balance drops below $2,500 in **month 69** (5 years 9 months) | Re-hook | arithmetic | — |
| Payoff time | **198 months = 16.5 years** | Killer number | arithmetic | — |
| Total interest | **$7,811** | 156% of the original debt | arithmetic | — |
| Total paid | **$12,811** | Title number | arithmetic | — |
| Same debt, fixed $250/month | 26 months, $1,315 interest | Comparison (math only, not advice) | arithmetic | — |
| Same debt, fixed $150/month | 53 months, $2,886 interest | Comparison | arithmetic | — |
| Sensitivity: 24% APR | 201 months, $8,442 interest | If the card is a store card | arithmetic | — |
| Sensitivity: $6,500 balance @22.36% | 224 months, $10,606 interest | If you want the "average balance" version (⚠ average-balance figure not sourced here) | arithmetic | — |
| Flat-2% formula (min $25) @22.36% | **1,160 months (96.7 years)**, $53,512 interest | Why issuers don't actually use flat 2% at these rates: 2% barely exceeds the 1.86% monthly interest. Optional "it gets worse" line — label clearly as a different formula | arithmetic | — |
| Average APR, accounts paying interest | **22.36%** (Q3 2026); 22.15% (Q2 2026) | The rate people who carry a balance actually pay | LendingTree citing Fed G.19: https://www.lendingtree.com/credit-cards/study/average-credit-card-interest-rate-in-america/ ; primary: https://www.federalreserve.gov/releases/g19/current/ ; FRED series https://fred.stlouisfed.org/graph/?g=1qkGv | Q3 2026 ⚠ secondary relay; open the Fed table before publishing |
| Average APR, all accounts | 21.19% (Q3 2026); 20.94% (Q2 2026) | Don't mix with the row above | same | Q3 2026 ⚠ |

## Who was convicted
Nobody; legal product. What If, not Decoded. No "scam"/"fraud". "Robbed" only as obvious hyperbole in a hook; the body says "this is how the formula works".

## On-screen-safe quotes
None.

## Commonly repeated but NOT verifiable — don't say
- "It takes 30 years to pay off a credit card on minimums" — depends entirely on the formula; ours gives 16.5.
- "The average American has $X,XXX in card debt" — several conflicting definitions (per cardholder, per household, per borrower with a balance); not sourced here.
- "Banks set the minimum to trap you" — motive claim; say "the formula is built so interest gets paid first".
- "Credit card rates are at an all-time high" — plausible but not checked.
- Any mention of a 10% rate cap proposal as law (it was proposed in 2026 and, per one search extract, not enacted — unverified).

## Pronunciation
- APR = "A-P-R" · 22.36% = "twenty-two point three six percent" (or "about twenty-two percent")
- $12,811 = "twelve thousand eight hundred eleven dollars" · 198 months = "one hundred ninety-eight months — sixteen and a half years"

## Visual ideas
1. Counter: "BALANCE $5,000" with a month ticker; each tick splits the payment bar into a big red "INTEREST" piece and a thin green "YOUR DEBT" piece.
2. Calendar pages flying from 2026 to mid-2043 ("16.5 YEARS").
3. A credit card as a treadmill: figure runs, distance counter barely moves.
4. Receipt reveal: "YOU BORROWED $5,000 · YOU PAID $12,811".
5. Ghost second counter racing ahead: "FIXED $250 → DONE IN 26 MONTHS" (label "same math, different payment").

## Sources
- Arithmetic (formula above).
- Federal Reserve G.19 Consumer Credit (primary) and LendingTree's relay (links in table).
