# STYLE.md — Bad Math (paste-anywhere brief)

Any chat or agent writing for this channel follows this file. Channel facts live in `CHANNEL.md`.

## 1. One-liner and audience
**Bad Math:** the math behind the world's biggest money cons and its wildest money hypotheticals.
Two series: **What If** (economics thought experiments) and **Decoded** (how real, documented scams worked).
Audience: US, 18–28, mostly young men with first paychecks, scrolling Shorts at night. They want to feel smarter, see how money actually works, and spot a con before it gets them. They hate gurus, latte lectures, stock picks, slow intros and AI slop.

## 2. Voice rules
- A sharp friend doing the math out loud. Never a guru, never an expert, never "I". The narrator has no name.
- Short lines (≤ 12 words). Concrete numbers. One idea per line.
- Explain the mechanism, not a moral. Let the math deliver the judgment.
- Every video ends on a punchy one-liner.
- **What If:** curious, playful, "wait, really?" energy. Mark speculation ("assume", "in this world", "roughly").
- **Decoded:** calm, low and tense, with dry humor. Use "alleged" for anything not ruled on. Mock the con and the tactic, never the victims.

Example lines:
1. "One dollar a second. Sounds slow. It isn't."
2. "The returns weren't high. They were *smooth*. That was the tell."
3. "Here's where the math stops working."

Banned phrasings:
1. "You should invest in…" / "This is how you get rich" (advice, guru talk)
2. "Hey guys, welcome back" / "In today's video" (slow intro)
3. "Experts say…" / "Studies show…" with no named source (vague authority)

## 3. Format library
| Format | Series | Recipe |
|---|---|---|
| **The Counter** | What If | A number ticks up or drains on screen, then breaks intuition at the payoff. |
| **Scale Swap** | What If | Apply one rule to a person → a city → a country, and watch it break. |
| **The Pitch vs The Math** | Decoded | The promise the con made, then the arithmetic that made it impossible. |
| **Case File** | Decoded | Dated timeline: setup → hook for victims → the tell → collapse → the sentence or ruling. |
| **Spot the Tell** (later) | Decoded | Show three red flags; the viewer guesses which one sank it. |
Alternate series every upload, and don't run the same format twice in a row.

## 4. Hook patterns that fit
- **Impossible number** (true only): "This fund never had a losing month. That's the problem."
- **Viewer-in-the-scene question:** "You get a dollar every second. When are you a billionaire?"
- **Flip:** "The scam wasn't the high returns."
- **Callout:** "If a 'mentor' ever asked you to recruit friends, watch this."
- **Reveal first:** show the collapse or the final number on frame 0, then rewind.
On frame 0: visual + ≤ 7-word on-screen hook in Anton + voice, all at once.

## 5. Retention rules
- Open loop by 3–5 s; payoff at 75–80% after a half-second of silence.
- Something changes every 2–3 s: a cut, a zoom, a number tick, a stamp, a string pulling tight.
- One escalating number is the spine, with the math shown on screen in JetBrains Mono.
- Name the viewer's experience once ("you're doing the math right now").
- Physical payoff: the counter shatters, the file gets stamped, the chart collapses.
- Every key beat has on-screen text so the video works muted.
- The last line flows back into frame 0 for the loop.

## 6. Visual style
- **Storyteller (every video):** the coin-head character from `brand/storyteller.js`, bottom-right, left of the button rail. Captions sit to his left (center x≈420–460, max width 600–620). See brand/CHARACTER.md.
- **Background** Ink `#0B0F14`. **Text** Paper White `#F5F3EE`. **Numbers** Money Green `#00D26A`.
- **What If accent:** Highlighter `#FFD60A`. Bright, cinematic AI scenes, one clear subject, a slow push-in.
- **Decoded accent:** Loss Red `#FF3B30`. Case-file look: documents, redactions, dated timelines, red string, "EXHIBIT" stamps. Show real documents only when they're public records, with the source logged.
- **Fonts:** Anton (hooks and thumbnails, uppercase), Inter Bold (captions, 1–4 words, ≥ 54 px at 1080 wide, key word in the series accent), JetBrains Mono (all math and counters).
- **Image style prefixes** (keep identical across videos):
  - What If: `cinematic hyperreal scene, vivid saturated light, single clear subject, dramatic wide angle, deep shadows, yellow #FFD60A accent light, 9:16, no text`
  - Decoded: `dark investigative desk, manila case files, printed documents, red string on corkboard, low-key lighting, film grain, red #FF3B30 accent, 9:16, no text, no real logos`
- **Safe zone (Shorts):** nothing important above y≈220, below y≈1540, or right of x≈940 in the lower half.
- **Thumbnail/cover template:** Ink background, one subject, ≤ 4 Anton words that add to the title, one Money Green number. Must pass the hand test.

## 7. Sound
- **Narrator:** the one Bad Math voice from Voice Design. What If: curious, light smile in the voice. Decoded: lower, slower, dry.
- **Music bed:** YouTube Audio Library only, at -24 to -26 LUFS under the voice. What If gets light pulses; Decoded gets low drones.
- **SFX:** a tick on every number change, a whoosh on cuts, a stamp or hit on the payoff, silence before the reveal.
- **Master:** -14 LUFS, true peak ≤ -1 dBTP.

## 8. Honesty rules
- Every number is checked against a real source and logged in `sources.md`. If it can't be verified, cut it.
- What If: say which parts are assumptions on screen and in voice ("assume no taxes", "hypothetically").
- Decoded: only documented or court-proven cases. Anything pending is "alleged". Cite the court records, regulator releases (SEC/DOJ/FTC) or major reporting.
- No advice, no picks, no guaranteed returns. The narrator never pitches Tape.
- The synthetic-content disclosure is always on, and the About section says "AI-narrated".

## 9. CTA
**Storyteller prompts (on screen, no extra voice):** comment bubble from the storyteller right after the payoff (one question tied to the story, 2–3 s), then the red "+ FOLLOW" button he taps in the last ~2 s over the loop. Never mid-video before the payoff, never both at once. No links, no Tape mentions on TikTok/Instagram. Character rules: brand/CHARACTER.md.

One line, tied to the payoff, in the last ~3 s. Examples: "Follow. Next file's worse." / "Comment your number." / "Part two: what happened to the money."
No "like and subscribe" reflex. Tape appears only in the pinned comment, description and channel links, labeled "my app".

## 10. Script output format
`script.md`: title · series · format · hook · angle · emotional driver · word count + estimated duration (~2.5 words/s).
Beat table: `time | voiceover (TTS-ready: numbers as words, no ALL CAPS) | visual | on-screen text (digits) | SFX/music`, one row per 2–3 s.
Number spine: every number with its math. Then `sources.md`.

## 11. Worked example (What If, ~32 s, 80 words). This is an example, not a planned upload.
**Title:** What If You Earned $1 Every Second? · **Format:** The Counter · **Driver:** awe → recognition

| time | voiceover | visual | on-screen text | SFX |
|---|---|---|---|---|
| 0–2 | One dollar. Every second. Forever. | Single dollar bill floats in golden light | $1 / SECOND | tick |
| 2–5 | When are you a billionaire? | Counter appears, starts racing | WHEN = $1,000,000,000? | whoosh |
| 5–9 | One minute: sixty bucks. One hour: thirty-six hundred. | Counter jumps, clock spins | 60 → 3,600 | ticks |
| 9–13 | One day: eighty-six thousand, four hundred dollars. | Sunrise to sunset over a pile of cash | $86,400 / DAY | cash hit |
| 13–17 | You're a millionaire in under twelve days. | Pile becomes a mansion | $1M = 11.6 DAYS | riser |
| 17–21 | So a billion's what, a year? Two? | Calendar pages flipping | 1 YEAR? | tick-tick |
| 21–24 | (0.5 s silence) | Calendar freezes | — | silence |
| 24–29 | Thirty-one years. Nearly thirty-two. | Counter slams; years stamp across screen | 31.7 YEARS | impact |
| 29–32 | A million is a vacation. A billion is your whole life. | Mansion shrinks into a dot | MILLION ≠ BILLION | low hit |

**Number spine:** 60 s × $1 = $60 · 3,600 s/hr = $3,600 · 86,400 s/day = $86,400 · $1,000,000 ÷ 86,400 = 11.57 days · $1,000,000,000 ÷ 86,400 = 11,574 days ÷ 365 = 31.7 years. Assumptions: no taxes, no interest, no spending (on screen: "hypothetical, no taxes").
**Sources:** pure arithmetic, no outside facts.

## 12. Final checklist
- [ ] Hook works on frame 0 with the sound off.
- [ ] Series accent, fonts and palette are correct; nothing in the UI dead zones.
- [ ] Every number is in the number spine and `sources.md`; speculation is marked; anything pending says "alleged".
- [ ] No advice, picks or Tape pitch in the voiceover.
- [ ] The script is new, not last week's with names swapped.
- [ ] 20–45 s; -14 LUFS; captions match the audio.
- [ ] Synthetic disclosure on; assets logged in `credits.md`.
- [ ] The final line loops into frame 0.

## 13. Woven CTAs (user rule, 2026-11-24) — like, follow, share inside the story, never a pitch
Every video mentions all three, **spread out**, each as **one short clause that belongs to the story**, said in the narrator's dry voice. Never "like and subscribe", never "follow for more videos like this", never a block of asks at the end.
- **Like (~25–35% in):** tied to a reaction the viewer is having. "Tap the heart if you'd have wired the money too. Most of Boston did." / "If that number made your stomach drop, hit like — it should."
- **Share (~50–60%, at the most relatable beat):** tied to a person in their life. "Send this to the friend who keeps texting you about a 'can't-lose' coin." / "Your uncle with the 'guaranteed' 20%? He needs this part."
- **Follow (~75–85%, right before the payoff, as a promise not a plea):** "Stick around — following this page is how you spot the next one before it spots you." / "Remember this number; it shows up again in the next case."
- Long-form: the same three, spread across chapters (like in ch1, share in ch2, follow before the final act), plus the closing subscribe line.
- On screen, when each is said: a tiny matching icon moment — heart pulse (like), paper-plane flick (share), the storyteller tapping the +FOLLOW button (follow). No big banners.
- The comment-bubble prompt after the payoff and the tap-to-follow in the last 2 s stay as they are.

## 14. Hook gate (rule #1) and retention (rule #2) — user rule 2026-11-24
Hooks are the most important thing; retention is second, and the two are linked: the hook opens a loop the video must pay off. No script goes to voice until it passes this gate.

**The hook line (first 1–2 s, ≤ 12 words) must be outrageous.** It should be negative, edgy and close to controversial, so a scroller stops out of disbelief or offense. Patterns:
- "This guy was so dumb, he [did X]." (FTX: "…committed an eight billion dollar fraud. And wrote it into the code.")
- "You're probably an idiot if you [common money habit]."
- "This is the stupidest [con / bet / deal] in history, and [N] people fell for it."
- "[Respected person / bank / regulator] got played by [absurd detail]."
- "If you [do X], you're getting robbed. Here's the math."
- "Nobody this rich should be this stupid."

**Guardrails (they keep the channel monetized and out of court):**
- Every claim in the hook is true and sourced. Call someone "dumb", "stupid" or a "fraud" only if that person was convicted or the act is on the record; anyone not yet convicted is "alleged".
- "You're an idiot if…" roasts a *habit*, never a group or the victims.
- No strong profanity (f-word, slurs) in the voice, the title, the thumbnail or on screen; mild edge ("dumb", "stupid", "idiot", "insane", "robbed") is fine. The first ~7 s stay advertiser-friendly.
- No clickbait the video doesn't pay off. If the hook promises it, the video shows it.

**Process (in every script/DIRECTION.md):**
1. Write **10 hook variants**, score each 1–10 for *stop power* (would I stop scrolling?) and *truth*, and keep the best. Log the runner-up in ideas.md for later.
2. **Frame 0 must already be a pattern break:** a big glitch, slam, stamp or impossible number on screen with a hit sound. Never a title card or a slow fade.
3. **The on-screen text in the first second shows the outrageous part** ("SO DUMB", "$8,000,000,000", "IDIOT TAX"), because muted viewers read it.
4. **Open a loop** in the hook that is paid off at 75–80% (the punchline, the number, the verdict). State it in DIRECTION.md as `LOOP: … → PAID at …s`.

**Retention:**
- Re-hook every 6–8 s (a new number, a twist, "but it gets worse").
- Something moves every 2–3 s; no static shot longer than 3 s.
- Shorts: last line loops into the first frame. Cut every word that doesn't serve the loop.
- Woven CTAs (§13) ride the story beats and never stall them.

## 15. Three platform cuts per topic — user rule 2026-11-24
Every topic gets **three different scripts and edits**, not one video cross-posted. Each has its own hook (all must pass §14), its own voice track, its own edit/length and its own caption. Same verified facts; the visuals/engine for the topic can be shared, but the cut, order and on-screen text are re-made per platform.

| | **YouTube Shorts** (BadMath) | **TikTok** (@color.me.saved) | **Instagram Reels + Facebook Reels** (badmath.tv) |
|---|---|---|---|
| Algorithm favors | viewed-vs-swiped, average % viewed, **loops**, searchable titles, subs from Shorts | completion + **rewatches**, comments, shares, watch-time in first 3 s, trend-native voice | **sends/shares per reach** (DM shares), **saves**, 3-second hold, original content, punchy text that works muted |
| Length | 40–55 s story with a full arc | 25–40 s, faster, no setup — start mid-action | **15–25 s**, one punchline, one number |
| Hook tone | edgy, ad-safe (no profanity: "dumb", "stupid", "idiot") | edgy + spicy, direct "you"/POV, mild profanity bleeped or swapped ("dumbass", "screwed") — keep TikTok For You–safe | **most disrespectful + vulgar** (user rule): profanity allowed in voice and on screen ("dumbass", "shit", "f***ing"); no slurs, no sexual content, never insult victims or groups |
| Structure | hook → setup → re-hooks → payoff at 75–80% → loop line | hook → "here's how he did it" fast list → twist → open-ended question for comments | hook → the one insane number → punchline → "send this to…"/"save this" |
| CTA weave | like / share / follow (§13) | comment bait (a debatable question), follow for part 2, "send to…" | **send** (DMs) and **save**, then follow |
| Caption | title ≤ 60 chars + description w/ sources | short, spicy, 3–5 hashtags, a question | hook line + 1–2 lines + 3–5 hashtags; FB uses the same Reel |

Guardrails for all three (unchanged): facts verified; "fraud"/"criminal" only for convicted people; mock behavior and con artists, never victims; AI disclosure on; no "link in bio", no Tape.

## 16. Pronunciation — say it like a person, show it like normal text (user rule 2026-11-24)
The free Kokoro voice mangles some words ("dumbass" → "dumb-bass", "Theranos", "Alameda", "VIP"...). Every script has two layers:
- **SAY layer (what the voice reads):** goes through `brand/voice/pronounce.py` — `say(k, text)` swaps in correct phonemes for every word in its `FIX` dictionary (exact IPA, sentence prosody preserved). If a word isn't in FIX and sounds wrong, either add it to FIX (preferred) or respell it phonetically in the SAY text only ("V I P", "F T X").
- **SHOW layer (captions, on-screen text, .srt):** always the normal spelling from the script — never the respelling, never Whisper's spelling.
- **Before voicing any script:** run `audit(k, text)` and check every name, acronym, profanity and long/rare word; fix anything wrong. **After voicing:** Whisper the narration with the names as `initial_prompt` and confirm each risky word comes back right.
- Already-built narration with a newly-found bad word: `python brand/voice/patch_sentences.py <voice_dir>` re-voices only those sentences at their original times, then re-run the cut's `build/mix.py` and re-mux.

## 17. Comments — hybrid mode (user rule 2026-11-25: "do both")
Every post ships with a comment-bait **first comment** (all platforms). Inbox (TikTok, Instagram, Facebook via PostFast; YouTube has no inbox) is checked a few times a day and during every build.
- **Auto-reply (no asking)** to normal comments: reactions, jokes, "wow", "is this real?" (answer with the source), topic requests ("do Enron!" → "noted 👀" + log it in ideas.md), friendly disagreement on the math (show the math once). Voice: short, dry, funny, Bad Math persona; roast the con artist / the bad math, **never the commenter**; no profanity on YouTube/TikTok replies, mild only on IG/FB; max ~1 reply per person per thread; never argue twice.
- **Check with the user first** (flag in the daily note, don't reply): anything about legal threats/defamation, a person claiming to be involved in a case or a victim, self-harm or personal money crises, requests for financial advice, brand/collab/business offers, press, hate/harassment pile-ons, anything we might be wrong about, and anything you're unsure of.
- **Never:** financial advice, promises, links, DMs asking for money, replies to minors' personal info, deleting legit criticism. Hide/delete only obvious spam, scams, slurs and doxxing (log what was removed).
- **Daily note to the user:** # replies sent (with 3–5 examples), flagged comments waiting for them, top topic requests.

## 18. The story loop (learned 2026-11-25 from a reference reel the user sent — danishmoosaa, "story loop")
Every script, all three platform cuts, must run this loop. It's the engine under §14 (hook) and retention:
1. **Stakes — make them care.** Three things in the first ~5 s: *someone to root for (or against)*, *something at risk*, *a reason it matters right now*. For Decoded: the con artist + the victims' money + "and it's still happening / you're doing it". For What If: YOU + your money + "this is your Tuesday coffee".
2. **The big question — make them curious.** Put an explicit question in the viewer's head ("is that even possible?", "how did nobody notice?", "where did the other $381 go?"). Say it or show it on screen as a question.
3. **The unexpected twist — surprise them.** Set up what the viewer expects, then reveal something different (they think the trick was X; it was Y — the guard was the thief; the fee is the loan; the "protection" is the product).
4. **The rehook — make them curious again.** The moment one question is answered, open the next one ("okay, but how did he get the seals?", "and the timing gets worse"). Every answer ends on a new question until the payoff; the last line loops to the first frame.
Write the loop explicitly in each DIRECTION/script note: `STAKES: … / QUESTION: … / TWIST: … / REHOOKS: …`. A script with no twist or no rehook fails review.

**Visual lessons from the same reel (apply to our own style, never copy its look):**
- One **recurring visual device** that carries the structure across the whole video (theirs: a glowing loop ring with numbered nodes that rotates to each step). Ours per series: Decoded = a "case board" with numbered red-string pins; What If = a running counter/meter. Return to it at each step so viewers feel progress.
- **Numbered step markers** when a video has steps (big "1 / 2 / 3" badges) — progress = retention.
- One object per beat, centered, minimal background; one accent color doing the work.
- Kinetic captions with **one emphasis word per line** styled differently (theirs: italic serif accent). Ours: the emphasis word in Anton + series color.
- CTA style that worked there: "Send this to a [specific person] who needs …" + a **comment-keyword prompt**. We can use comment keywords for engagement ("comment PART 2", "comment MATH") — never for links/products.

## 19. Series rules — What If = go wild · Decoded = zero errors (user rule 2026-11-25)
**WHAT IF — creative freedom.** Topics can be random, absurd, off-the-wall, as long as **money is the main theme**. Examples of the energy: "What if you got a penny every time someone on Earth blinked?", "What if you robbed every vending machine in America?", "What if you paid rent in Chuck E. Cheese tickets?", "What if Jeff Bezos dropped a $100 bill — is it worth picking up?", "What if you sold your house one LEGO brick at a time?". Rotate wildly different premises so the feed never feels repetitive.
- The premise can be ridiculous; **the math cannot be wrong**. Every assumption is stated on screen ("ASSUMES…"), every real-world input (prices, populations, rates) uses a real sourced number, and the arithmetic is double-checked by Opus.
- Label it as a hypothetical — never present a What If as something that happened.

**DECODED — 100% accurate, no exceptions.** The user does not want to get caught up in inaccurate information.
- Only cases with a **conviction, guilty plea, or final SEC/court judgment**. Anything pending = "alleged" (or skip the topic).
- **Every on-screen/voiced fact needs a primary source (DOJ/SEC/court/regulator) or at least two independent reputable sources** that agree. One source = cut it. Conflicting sources = use the conservative/attributed version ("the FBI said…", "later counts put it at…").
- No invented quotes, no dramatized dialogue presented as real, no "illustration" ambiguity — anything illustrative is labeled ILLUSTRATION on screen.
- Fable flags every figure's grade in research.md; Opus refuses to script any Decoded line that isn't VERIFIED or ✔2. When in doubt, leave it out.
- Corrections: if a posted Decoded video is found to contain an error, tell the user immediately and propose deleting/replacing it.
