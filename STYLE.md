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
- AI labels are OFF (user rule 2026-11-25: original animation + a generic narrator, no real person imitated). Never imitate a real person's voice or likeness — if a video ever would, the label goes back on for that video.

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
| Length (owner 2026-11-25: longer, more context) | **60–90 s** story with a full arc and full context | **50–75 s**, punchy but every step explained | **35–55 s**, the story explained simply, then the punchline |
| Hook tone | edgy, ad-safe (no profanity: "dumb", "stupid", "idiot") | edgy + spicy, direct "you"/POV, mild profanity bleeped or swapped ("dumbass", "screwed") — keep TikTok For You–safe | **most disrespectful + vulgar** (user rule): profanity allowed in voice and on screen ("dumbass", "shit", "f***ing"); no slurs, no sexual content, never insult victims or groups |
| Structure | hook → setup → re-hooks → payoff at 75–80% → loop line | hook → "here's how he did it" fast list → twist → open-ended question for comments | hook → the one insane number → punchline → "send this to…"/"save this" |
| CTA weave | like / share / follow (§13) | comment bait (a debatable question), follow for part 2, "send to…" | **send** (DMs) and **save**, then follow |
| Caption | title ≤ 60 chars + description w/ sources | short, spicy, 3–5 hashtags, a question | hook line + 1–2 lines + 3–5 hashtags; FB uses the same Reel |

Guardrails for all three (unchanged): facts verified; "fraud"/"criminal" only for convicted people; mock behavior and con artists, never victims; no "link in bio", no Tape.

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

## 20. Visual system v2 — flowing, satisfying, no neon (user rule 2026-11-25)
The user likes the animation but wants it better: the storyteller must stop standing still and pointing; graphics he references **come toward the camera**, the camera **pushes in on the important numbers and moving parts**, he **steps in front of the graphic to talk, then lets it come back in front of him** — one continuous, flowing, interactive experience. **Move away from the flat glowing-neon look.** Every graphic, graph and transition must be **extremely satisfying to watch** (springs, overshoot, precise motion, completion, depth, rich non-neon palette).
- **One-time build by Fable** (research → `research/visual-v2/research.md`, spec → `brand/VISUAL-V2.md`, engine → `brand/engine-v2/`), then **handed back**: the normal pipeline continues unchanged — Fable researches topics, Opus creates/directs using the v2 engine and spec, Sonnet/Haiku build. Fable is not the daily animator.
- Applies to **new videos only**. Already-scheduled or already-built videos stay as they are.
- Once `brand/engine-v2/READY` exists, every new build uses engine v2 and VISUAL-V2.md; Opus's direction notes must specify camera moves on spoken numbers and storyteller choreography beats.
- **BRAND LOCK (user rule 2026-11-25):** v2 evolves the look, it does NOT rebrand. The storyteller keeps the same design (coin face, features, navy suit, red bowtie, proportions, expression style) — only his motion/staging and render quality improve. Profile pictures, the DECODED red pill / WHAT IF pill, the Anton·Inter·JetBrains Mono type, the BAD MATH wordmark and the series colors stay exactly the same. Only the neon-glow backgrounds, flat staging and stiff motion change. A viewer must instantly recognize a v2 video as the same channel.

## 21. Humanize every script (user rule 2026-11-25: "humanize the scripts a bit")
Scripts must sound like a real person telling a friend something wild — not a narrator reading a fact sheet. Apply to all three cuts (YouTube a little cleaner, TikTok/IG looser).
- **Talk, don't list.** Contractions always (it's, didn't, you'd). Mix short punches with one longer run-on sentence. No three-item fact lists in a row.
- **React.** Small human reactions between facts: "Yeah.", "Wait.", "Okay, so…", "And it gets dumber.", "I'm not kidding.", "Think about that for a sec." (1–3 per Short, never every line.)
- **Talk to the viewer.** "you", "your", rhetorical questions ("Guess how many were real?").
- **Round numbers the way people say them** when exactness isn't the point ("like four million fake customers", "about seventeen grand"), but keep the exact figure on screen. Decoded facts stay exact where the number IS the point.
- **Spoken rhythm for the voice:** commas and periods where a person would breathe; one idea per sentence; avoid stacked numbers in one sentence.
- **Keep** the hook gate (§14), story loop (§18), woven CTAs (§13) and accuracy rules (§19) — humanizing never adds facts or changes meaning.

Before → after (from real scripts):
- "Her startup, Frank, claimed four point two five million users. The SEC says the real number was fewer than three hundred thousand." → "Her startup, Frank, said it had over four million users. Real number? According to the SEC… under three hundred thousand. Yeah."
- "Month one, you pay a hundred forty-three dollars. Your debt goes down by fifty." → "So month one, you pay a hundred forty-three bucks. And your debt goes down… fifty. Fifty dollars."
- "Ten coin flips. Your real chance of hitting all ten: one in one thousand twenty-four." → "That's basically ten coin flips in a row. Your odds of hitting all ten? One in a thousand twenty-four. Not great."

**Words real people use (user rule 2026-11-25: "add words humans would use").** Sprinkle naturally — 2–5 per Short, never forced, never two in one sentence. Audience is US 18–28.
- Everyday: like, literally, honestly, basically, straight up, for real, legit, kinda, sorta, gonna, wanna, gotta, y'know, I mean, okay so, anyway, right?, crazy, insane, wild, nuts, ridiculous, a ton of, a bunch of, bucks, grand (=$1,000), a K, mil (=million).
- Reactions: no way, wait what, nah, bro, dude, bruh, oh it gets worse, you can't make this up, I'm not even kidding, let that sink in, sit with that, imagine, be so for real, plot twist, and here's the kicker.
- Casual put-downs (roast the con/habit, never the viewer as a person): clown, genius (sarcastic), absolute legend (ironic), cooked, got played, fell for it, rookie move, sus, wildin', delulu.
- Per platform: **YouTube** light touch (everyday words + a couple of reactions, ad-safe). **TikTok** more slang (bro, lowkey, highkey, ngl, cooked, wildin'). **IG/FB** heaviest + profanity allowed (§15).
- Write them so the voice can say them: "N G L" → write "not gonna lie"; "lowkey" fine; avoid emoji-only slang in the SAY text. On-screen captions still show the words as written.

**Human speech imperfections (user rule 2026-11-25: "add mistakes humans make while speaking — uhms, breaths" + "more inhale and human noise sounds").** Voice every Short with `brand/voice/humanize.py` `build(k, lines)`:
- **NO "um"/"uh"/"erm" fillers** (user rule 2026-11-25: "drop the uhms, it doesn't sound right at all"). Human feel comes from casual words ("like", "so", "just", "honestly"), one restart/self-correction per Short without a filler ("she— she had…", "four— no, four point two five"), and an occasional trailing "…right?". Never inside a number or a Decoded fact. humanize.py strips um/uh automatically.
- Inline sound tags (real CC0 human noises in `brand/sfx-library/breath/`): `[breath]` `[gasp]` `[sigh]` `[sniff]` `[smack]` `[throat]` `[pause]`. **NO laugh/[chuckle]** (user rule 2026-11-25: "that laugh is hella out of place"; humanize.py drops it). Auto soft inhales are added before ~1 in 3 lines. Use [sigh] after a sad verdict, [gasp] on a shock reveal, [smack] before a CTA. 1–3 tagged noises per Short.
- Captions show what was said minus the [tags]; take caption text from script/sentences, not Whisper (Whisper mangles words).
- Example: research/humanize-demo/mock-short.mp4 (Javice TikTok, humanized — NOTE: made before the no-um / no-laugh rule; don't copy its fillers or chuckle).

**Long-forms use visual v2 too (user rule 2026-11-25: the old long-form was "trash neon slop").** Build every long-form with engine v2 in 16:9 landscape mode (same world/camera/storyteller grammar, same brand lock, no neon). Never reuse the old neon canvas engine (videos/2026-11-25-impossible-number/build/engine.js) for new work.

## 22. Script craft — use the script-writing skills on EVERY script (user rule 2026-11-25: "bad script writing… grab a script writing skill")
Before writing any script, read `brand/skills/short-form-video-script/` (WATCH framework + references) and `brand/skills/hook-writer/` (mechanisms + scoring). Then:
1. **Beats, not prose:** write `[time · VISUAL · ON-SCREEN TEXT · SPOKEN]` beats; write the muted version first (text + visuals must carry the story alone).
2. **Hooks:** 5–10 candidates across different mechanisms, scored with the rubric (Gap, Specificity, Truth, Fit, Voice, Pull; Truth and Pull are pass/fail). Keep the winner; save the candidates in `voice/beats.md`.
3. **Cut-test every line:** it must grab, advance, or set up a payoff. Otherwise delete it. No throat-clearing, no setup paragraphs, no number dumps.
4. **Pacing:** a visual change every 2–4 s; never more than ~8 s on one shot; open a loop early and close it at the payoff.
5. **Cash the promise:** the payoff delivers exactly what the hook sold.
6. **Loop + CTAs:** the last line flows back to frame 1. CTAs are woven per §13 (like ~30%, send ~55%, follow ~80%, comment question after the payoff) — never a CTA block at the end.
7. Run `brand/tools/script_gate.py` on the cut; a FAIL means rewrite, not voice.
Owner rules (RULES.md) win over skill defaults (e.g. no AI disclosure, our CTA placement).

## 23. Flow and breathing room (user rule 2026-11-25)
- Write in full spoken sentences that connect ("so", "and then", "which means"), the way a person tells a story. Fragments are seasoning, not the meal: max 25% of sentences ≤ 3 words, never three in a row.
- Let big moments land: after a big number, a verdict or a twist, give a beat (line pause ≥ 0.5 s or `[beat]`). Example: "They took in over two point four billion dollars. [beat]" / "He was sentenced to twenty years in prison. [beat]"
- Say verdicts as sentences: "He was sentenced to twenty years in prison," not "Twenty years."

## §24 Context and clarity in Shorts (owner rule 2026-11-25)
"The scripts are being rushed and missing too much context… break it down almost to kindergartner level, but these are still very interesting stories."
- Shorts lengths: YouTube 60–90 s · TikTok 50–75 s · IG/FB 35–55 s. Use the extra time for CONTEXT, not more facts.
- Set the scene first: who is this person, what were they doing, why would anyone trust it — before the first big number.
- Every term explained in plain words the first time ("a payday loan — a tiny loan you pay back on your next paycheck").
- One new idea per line. Never stack two numbers in one sentence.
- Walk the trick step by step: "Step one… then… so now…". If a 10-year-old couldn't retell how it worked, rewrite.
- Every big number gets an everyday comparison (a car, rent, a year of groceries, a stadium full of people).
- Recap the key number once before the payoff.
- Still a story: stakes, mystery, twist, payoff (§18). Simple ≠ boring.
