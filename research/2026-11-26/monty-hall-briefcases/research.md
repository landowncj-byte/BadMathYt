# Three briefcases — "A thousand PhDs got this $1,000,000 question wrong"
What If · Dilemma (STAY or SWITCH) · exact probability + one sourced true story · compiled 2026-11-25 for Thu 2026-11-26

**Access note:** pages could not be opened from this sandbox; the story facts come from search extracts (NYT 1991 reprint pages, UPenn math notes, Wikipedia). Math is our own and exact.

## The claim in one line
Three briefcases, one holds $1,000,000. You pick one; the host — who knows where the money is — opens an empty one from the other two and offers a swap. Switching wins **2 times in 3**; staying wins 1 in 3. When a magazine columnist printed that in 1990, about 10,000 readers wrote in, most to say she was wrong — close to 1,000 of them signed with a PhD.

## Assumptions (must be on screen: "ASSUMES")
1. Exactly one case has $1,000,000; the other two are empty. Placement is random.
2. The host **knows** where the money is.
3. The host **always** opens an empty case you didn't pick, and **always** offers the swap.
4. If your first pick is the money, he opens either empty case at random.
(If the host opens a case at random and it just happens to be empty, the answer changes to 50/50. This is the #1 comment fight — put assumption 2–3 on screen.)

## Arithmetic (shown and re-checked)
- P(first pick has the money) = **1/3**. P(first pick is empty) = **2/3**.
- If you **stay**: you win only when your first pick was right → **1/3 = 33.33%**.
- If you **switch**: when your first pick was empty (2/3 of the time) the host is forced to open the *other* empty case, so the remaining case must hold the money → **2/3 = 66.67%**. When your first pick was right (1/3), switching loses.
- Enumeration check (9 equally likely combos of money position × your pick): stay wins 3 of 9, switch wins 6 of 9. ✔
- Simulation check (1,000,000 random games, Python, seed 1): switch won **66.59%**. ✔

| Figure | Exact value | Working |
|---|---|---|
| Stay win chance | 1/3 = 33.33% | |
| Switch win chance | 2/3 = 66.67% | 1 − 1/3 |
| Average payout if you stay | **$333,333.33** | $1,000,000 × 1/3 |
| Average payout if you switch | **$666,666.67** | $1,000,000 × 2/3 |
| What staying "costs" on average | **$333,333.33** | difference |
| Switch vs stay | **exactly 2×** | (2/3) ÷ (1/3) |
| 100-case version | you pick 1; host opens 98 empties; switching wins **99/100 = 99%** | first pick right only 1/100 |
| Play it 10 times | stayers win 3.33 times on average, switchers 6.67 | 10 × 1/3, 10 × 2/3 |

## The true story (Decoded-standard facts for the voiced lines)
| Fact | Value | Source (URL) | Grade |
|---|---|---|---|
| Column | Marilyn vos Savant's "Ask Marilyn", *Parade* magazine, **September 9, 1990**; reader's question from Craig Whitaker; she answered "switch" | CHANCE (American Statistical Association) https://chance.amstat.org/?p=15899 ; Wikipedia https://en.wikipedia.org/wiki/Monty_Hall_problem | ✔2 |
| Letters | about **10,000**, by her own estimate, most disagreeing | John Tierney, *New York Times*, July 21, 1991, "Behind Monty Hall's Doors: Puzzle, Debate and Answer?" (§1 p.1) https://www.nytimes.com/1991/07/21/us/behind-monty-hall-s-doors-puzzle-debate-and-answer.html ; The Week reprint https://theweek.com/articles/514647/last-word-what-are-odds | ✔2 — say "about ten thousand letters, by her count" |
| PhDs | "close to 1,000" of the letters carried PhD signatures, many on math/science department letterhead | UPenn math dept notes quoting her account https://www2.math.upenn.edu/~kazdan/210/notes-misc/Monty_Hall.html ; NYT 1991 (as cited on Wikipedia) | ✔2 (both trace to vos Savant's own tally — attribute it: "she counted nearly a thousand PhDs") |
| "92% said she was wrong" | 92% of general-public letters | one secondary site | ⚠ don't say |
| The real host tested it | Monty Hall, host of *Let's Make a Deal*, ran the game at his home for the NYT reporter: switching won **8 cars, 2 goats** in that trial, and he agreed that under those rules you should switch | NYT 1991 (extract) | ✔1–2 — fine as "the real game-show host tried it himself and switching won" |
| Hall's caveat | on the real show he was **not** required to offer a switch — he could change the rules, which changes the math | NYT 1991 | ✔1 — this is why the ASSUMES card matters |
| Name | The "Monty Hall problem", named after the host; puzzle first posed by statistician Steve Selvin in 1975 | Wikipedia | ✔1 — optional |

## Story loop (suggested)
STAKES: $1,000,000 in one of three cases; you've already picked. · QUESTION: he opens an empty one — two left — it's 50/50 now… right? · TWIST: it's 67/33. Your first pick was a 1-in-3 guess and nothing he did changed that; the other case inherits the rest. · REHOOKS: "ten thousand people wrote in to say that's wrong" → "nearly a thousand had PhDs" → "then the actual host tried it at his kitchen table" → 100-case version makes it obvious.
Comment question: "STAY or SWITCH? (Read the rules on screen before you fight.)"

## Who was convicted
Nobody. Not a con. What If + a true anecdote. Don't call anyone dumb by name: the roast is "a thousand PhDs", a group of letter-writers who were wrong on the record — keep it as a fact ("got it wrong"), not an insult to a class of people.

## Don't say
- "It's always better to switch" without the host-knows rule.
- "The world's smartest woman" / "highest IQ ever (228)" — Guinness listing is disputed and retired; say "a magazine columnist famous for her IQ score" or just "a magazine columnist".
- "92% of readers" · "Paul Erdős refused to believe it until he saw a computer simulation" (one book's anecdote, ✔1) · any invented angry-letter quote. Real letter excerpts exist in the NYT piece but were not readable here — no quotes.
- "Monty Hall admitted she was right" as a quote — paraphrase only.
- "Doors, a car and goats" visuals copied from the show — use our own briefcases; no show logo, no host likeness (rules 65, 81).

## Pronunciation
- vos Savant = **voss suh-VAHNT** · Parade = puh-RAYD
- 2/3 → "two out of three" · 66.67% → "sixty-seven percent" · $666,667 → "six hundred sixty-six thousand" (show exact)
- PhDs = "P-H-Ds"

## Visual ideas
1. Frame 0: three steel briefcases slam onto the desk, a "$1,000,000" tag swinging off one handle; stamp "1,000 PhDs GOT THIS WRONG". Not two buttons.
2. Storyteller taps case 1; a gloved host hand flips case 3 open — empty. Big on-screen: "50 / 50?" then the "50/50" cracks.
3. Probability bars: case 1 stays stuck at 33%; the bar from the opened case physically slides onto case 2 → 67%.
4. Mailbag avalanche: counter to 10,000 letters, ~1,000 of them stamped "PhD".
5. Payoff (75–80%): 100 briefcases fan out, 98 pop open empty at once, one closed case left next to yours — "99%".
6. ASSUMES card pinned the whole time, small: "HOST KNOWS · ALWAYS OPENS AN EMPTY ONE".

## Sources
- Tierney, NYT 1991-07-21 (link above) · CHANCE/ASA (link above) · UPenn notes (link above) · The Week reprint (link above) · Wikipedia "Monty Hall problem" and "Marilyn vos Savant"
- Arithmetic + enumeration + simulation: formulas above.
