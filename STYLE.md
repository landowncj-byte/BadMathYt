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
