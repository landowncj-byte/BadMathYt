---
name: youtube-automation
description: A reusable, channel-agnostic YouTube automation system, start to finish. Use for anything YouTube - setting up a new channel, deep niche and competitor research, outlier hunting, comment mining, marketing angles, hooks, titles, thumbnails, scripts, voiceover, captions, editing, Shorts, metadata, uploading, scheduling, analytics reviews, and monetization-risk checks. Works for any niche; it learns the channel through a short intake and keeps that in a CHANNEL.md file.
license: MIT
---

# YouTube Automation (template)

A complete operating system for running a YouTube channel with an AI agent. **It carries no channel, niche or decisions of its own.** Everything channel-specific is collected in an intake (§1) and saved to `CHANNEL.md`; every later step reads from that file.

**Golden rule of automation:** automate the production, keep a human on the three decisions that make or break a channel: **which idea, which title + thumbnail, and when to publish.**

---

## 0. Modes (what the user can ask for)

| User says something like… | Run |
|---|---|
| "Set up a new channel" / no `CHANNEL.md` exists | §1 Intake → §2 Style guide |
| "Find me a niche" / "is this niche good?" | §4.1 Niche finder → §4.2 Validator |
| "Break down this channel / video" | §4.3 Competitor teardown |
| "What should I make?" / "give me ideas" | §4.4 Outliers + §4.5 Comment mining → §5 Angles |
| "Write hooks / titles / thumbnail ideas" | §5 + §6 |
| "Write a script" | §7 |
| "Make the video" | §7 → §8 → §9 → §10 |
| "Make this week's content" | §11 Batch mode |
| "Turn this into Shorts" | §8.6 |
| "Upload / schedule it" | §12 |
| "How is the channel doing?" | §13 Analytics |
| "Could this get demonetized?" | §14 Risk audit |

If a request needs channel details that are missing, ask only for those fields; never fill them from earlier conversations or assumptions.

---

## 1. Intake: build `CHANNEL.md` (once per channel)

Ask these in one compact message (offer sensible defaults the user can accept with "yes"):

1. **Channel idea in one line.** What is it, and who is it for?
2. **Audience:** age range, situation, what they want, what they're tired of.
3. **Goal:** ad revenue, a product, leads, a brand, or fun? (It changes CTAs and topics.)
4. **Formats:** Shorts, long-form or both; target lengths; cadence per week.
5. **Faceless or on-camera?** Narrator voice: AI, a clone of the user's own voice (with consent), or the user's real recordings.
6. **Look:** 2-3 reference channels or videos they love (for *mechanisms*, not copying), plus any brand colors or fonts.
7. **Tone:** funny, calm, dramatic, educational, cozy, intense…
8. **Hard nos:** topics, words, styles or claims to avoid.
9. **Tools and budget:** free/local only, or which paid tools are allowed (API keys available?).
10. **Language and region.**

Write `CHANNEL.md`:

```yaml
channel: ""          # one-line positioning
audience: ""
goal: ""
formats: {shorts: "30-60 s, 1080x1920", long: "8-15 min, 1920x1080", cadence: ""}
narrator: ""         # engine + voice + emotion range
tone: ""
look: {style: "", palette: [], fonts: {title: "", captions: ""}, motion: ""}
references: []       # channels/videos to learn mechanisms from
hard_nos: []
cta: ""              # one line, tied to the goal
disclaimer: ""       # e.g. "Not financial/medical/legal advice" when the niche needs it
tools: {paid_allowed: false, api_keys: []}
language: "en"
decisions: []        # dated log of the user's choices, newest first
```

Every time the user makes a decision, append it to `decisions` with the date. Re-read `CHANNEL.md` at the start of every task.

## 2. Style guide (a paste-anywhere file per channel)

From `CHANNEL.md` + research (§4.3), write `STYLE.md`: a self-contained brief that any chat or agent can follow. Sections:
1. Channel one-liner and audience.
2. Voice rules (how it talks, 3 example lines, 3 banned phrasings).
3. Format library chosen for this channel (§5.3), each with a one-line recipe.
4. Hook patterns that fit (§6.1).
5. Retention rules (§7.3).
6. Visual style: look, palette hex codes, fonts, caption style, motion language, thumbnail template.
7. Sound: narrator, music bed, SFX rules.
8. Honesty rules for the niche (§3).
9. CTA.
10. Output format for scripts (§7.4).
11. One fully worked example short.
12. Final checklist.

---

## 3. Ground rules (every channel)

1. **Never publish, schedule or upload without explicit approval for that specific video.** Default privacy: `private`.
2. **Never invent** stats, quotes, studies, testimonials, view counts, income claims or "results". Every factual claim gets a source in `sources.md`; hypotheticals are labeled "example".
3. **Mechanism, never wording.** From other creators take *why it works* (structure, pacing, curiosity gap, format), never their sentences, scenes, titles, thumbnails, characters, footage, music or brand look.
4. **Original or licensed assets only.** Record every music/SFX/font/image license in `credits.md`. No other brands' logos or characters.
5. **Inauthentic / mass-produced content risk.** YouTube demonetizes templated, repetitive uploads with little added value. Every video needs its own story or insight, its own script and visible editorial effort. A template is a production tool, never the content.
6. **Disclose synthetic media** (YouTube's "altered or synthetic content" setting) when a realistic AI voice, face or event could be mistaken for real. Clone only voices the owner consented to.
7. **Cost gate.** Free/local tools by default; ask before anything that spends money or credits.
8. **Label research honestly:** `[MEASURED]` (counted with code or data), `[ESTIMATE]`, `[OPINION]`, `[UNVERIFIED]`. No causal claims from tiny samples.
9. **Roast or criticize behaviors, not people.** Keep humor kind when it targets the viewer.

---

## 4. Deep research

**Data ladder** (use the highest one available and say which you used):
1. YouTube Data API v3 (key in an env var or header): `search.list` → `videos.list` (stats, duration) → `channels.list` (subscribers, video count) → `commentThreads.list`.
2. A research MCP/connector the user has (TubeLab, vidIQ, NexLev, etc.).
3. Web search + public pages; transcripts via a transcript tool.
4. The user pastes data or screenshots.
Never guess numbers you couldn't fetch; write "unavailable".

**Key metric: the outlier ratio** = a video's views ÷ its channel's average (or median) views. ≥ 3× is an outlier; small channels with big ratios are the strongest signal. Ignore channels with only a few hundred subscribers (ratios are noisy) and paid-placement spikes (huge views, almost no likes or comments).

### 4.1 Niche finder
A niche = **market** (what the audience cares about) + **format** (a repeatable title pattern + thumbnail layout + structure). New niches come from three moves:
- **Twist** a winning format (change the angle, the host, the scale, the time frame).
- **Merge** two formats ("X explained as a ranking", "history told as a true-crime case").
- **Bend** a proven format into a new market or language where its promise still makes sense.

Sample two pools: **breakout channels** (joined < 1 year, average views ≥ subscribers) and **cash cows** (monetized, earning steadily). Produce 10 ideas ranked by opportunity, audience value, money and originality, each with: what it is, bent from (proof video + ratio), audience, first title formula + first video title. Check the top 3 with one search each: how many close matches already exist (🟢 open / 🟡 proven and early / 🔴 crowded).

### 4.2 Niche validator
Sample 10-15 on-topic channels (exclude ones whose views-per-sub is > 3× the sample median, and name them). Score 0-100 (🔴 < 50 · 🟡 50-70 · 🟢 > 70):
- **Market size** = average of each channel's most-viewed video ÷ 1,000,000 × 100 (cap 100).
- **Unsaturated** = average (average views ÷ subscribers) ÷ 1.1 × 100.
- **Profitable** = estimated low-end RPM ÷ $7 × 100 (state the RPM source; mark estimates).
Then: young channels breaking in (proof it's still open), channels that lost monetization (what format they shared), the formats that win, what the leaders never cover. Verdict: **enter / enter with a twist / stay out**, with numbers. Give your own read beside the formula and say why they differ.

### 4.3 Competitor teardown (channel or single video)
1. **Identity card:** the niche, the promise, the audience, the format(s), length, cadence, look, narrator, how it's probably produced and at what cost.
2. **Formats by ratio:** the 1-3 repeatable formats behind its best videos (a format needs ≥ 3 videos beating the channel average). Title pattern with slots marked, thumbnail layout, length.
3. **Titles:** the formula from most to least viewed, repeated words, number/"you"/question ratios `[MEASURED]`.
4. **Thumbnails:** layout, subject + emotion, text (word count, size, position), palette, contrast, **hand test** (cover the text: does the picture still say the topic?), how the thumbnail text relates to the title (adds curiosity vs repeats).
5. **Script structure** from transcripts: hook length and type, promise, section rhythm, re-hooks, payoff position (% of runtime), CTA count and position, closing, words per minute, reading level.
6. **Visual and audio rhythm:** cuts per minute, visual types (illustration, stock, motion graphics, 3D, footage), on-screen text, music and SFX use. Watch or sample frames; don't rely on transcripts alone.
7. **Top 5 vs bottom 5:** what differs (pattern, not proven cause).
8. **Mechanisms to adopt**, each written as "what they do → how we do it in our own way", plus **what to avoid** (policy risks, saturation, the competitor's weak spots).

For a single reference video ("why did this go viral?"), do a beat-by-beat teardown: a table per 2-5 s (or per 15-30 s for long-form) of `time | what's said | what's on screen | what changes | why it holds attention`, then the principles.

### 4.4 Outlier and trend hunt
Search the niche (and 2-3 adjacent niches) for outliers in the last 3-12 months, Shorts and long-form separately. For each: title, views, ratio, date, format, why it probably worked `[OPINION]`. Note rising title patterns, seasonal topics (holidays, tax season, back to school, New Year), and news hooks. Video ideas come from twisting outliers with **SCAMPER** (substitute, combine, adapt, modify, put to another use, eliminate, reverse), never by remaking them.

### 4.5 Comment mining (voice of the audience)
Pull comments from 10-15 videos picked by ratio (theirs and competitors'). Remove spam and the creator's replies. Group into **questions, objections, requests, confessions, and inside jokes**, weighted by likes (a question with 900 likes = 900 people asking). A theme needs ≥ 3 videos. Output: top themes with verbatim quotes, **their exact phrases** (reuse them in hooks and titles), and video ideas that answer the biggest asks.

### 4.6 Audience research (beyond YouTube)
Reddit, forums, reviews, TikTok comments and search autocomplete for the niche: the pains, desires, fears, slang and "I thought I was the only one" moments. Save a `voice-of-audience.md` swipe file of real phrases (quoted, with source).

---

## 5. Marketing angles

An **angle** = the emotional entry point into a topic. The same topic can be pitched 10 ways; test angles, not just titles.

### 5.1 Angle library
| Angle | Pattern | Example shape |
|---|---|---|
| Loss / fear | what it's costing you | "This habit is quietly costing you ___" |
| Desire / transformation | the after state | "What ___ does to you after 30 days" |
| Self-diagnosis / identity | "if you do X, this is about you" | count the signs, reveal the label last |
| Curiosity gap | a strange true fact | "Why ___ actually ___" |
| Contrarian / flip | the common belief is wrong | "___ is making you ___. Here's why." |
| Story / true story | a person, a stake, a twist | "In 19__, one man ___" |
| Villain | a system, company tactic or habit as the bad guy | "The trick ___ uses on you" |
| Ranking / tier list | judgment + debate | "Ranking every ___ from ___ to ___" |
| Versus | two choices, one winner | "___ vs ___: which actually ___?" |
| Timeline / escalation | 1 day → 1 year → 10 years | a counter that grows |
| POV / skit | the viewer's situation dramatized | "POV: your ___ watching you ___" |
| Challenge / experiment | "I tried ___ for 30 days" (only if real) | |
| Myth-busting | 3-5 myths, one surprising truth | |
| Sequel / reply | answer a top comment or a past winner | "You asked ___, so…" |

### 5.2 Emotional drivers
Pick one primary driver per video: **shock, recognition ("that's me"), fear of loss, hope, outrage at a system, schadenfreude, nostalgia, awe, humor.** The hook should hit it within 2 seconds; the payoff should resolve it.

### 5.3 Format library (repeatable show formats)
Choose 2-4 per channel and rotate so the feed never repeats one angle:
- **Explainer:** "How ___ actually works": hook → how it works → 2-4 beats (one number + one analogy each) → the catch → payoff.
- **Transformation timeline:** "What happens when you ___ for 1 day / 1 month / 10 years."
- **Follow-the-object:** a thing (a dollar, a calorie, a package) is the main character.
- **True story:** a real event told like a thriller, with chapters and cliffhangers.
- **Recurring cast show:** recurring characters in a fixed setting (a clinic, a courtroom, a game show, a support group) where each episode diagnoses or judges one type or habit. Fixed beats make it bingeable.
- **Deep dive / personality profile:** an astrology-creator *style* profile of an audience type: signs, green flags, red flags, worst match, the real reason, the fix. Lead with self-diagnosis; reveal the label last.
- **Ranking / tier list,** **versus,** **myths vs facts,** **POV skits,** **"I tried it" experiments** (real only).

### 5.4 CTA design
- One CTA, one line, tied to the payoff; never "like and subscribe" as a reflex.
- Shorts: in the last ~3 s. Long-form: a soft one at ~25% and a real one at the end + end screen to the next video.
- **Comment-keyword CTA** ("Comment WORD and I'll send you ___") drives comments and DMs. Only use it when a real reward exists, and the user can reply (manually or with an auto-DM tool they approved).
- Match the CTA to `CHANNEL.md → goal` (follow for part 2, comment a confession, get the free thing, watch the next video).

---

## 6. Packaging (before the script)

The click decides everything. Lock the title + thumbnail first, then write the video that delivers them.

### 6.1 Hooks
Write **5 variants** per video, each a different type: **reveal** (show the result first), **callout** ("if you ___, watch this"), **shock number/fact** (true only), **flip/contrarian**, **story drop-in**, **question about the viewer's life**, **negative framing** (the loss, the mistake, the regret). Rate each one's risk of drop-off.
- **Shorts:** the hook lands on frame 0 through three channels at once: visual + on-screen text (≤ 7 words) + voice. Decided in 1-2 s.
- **Long-form:** 28-42 s hook window in three beats: **GRAB** (0-10 s, the surprising thing or result) → **PROMISE** (what they'll get) → **STAKES** (why it matters now). No "welcome back".

### 6.2 Titles
8 options built on formulas that are **proven** in the niche (an outlier uses it) or marked 🧪 untested. ≤ 60 characters, keyword in the first 40, one promise + one curiosity gap, nothing the video can't back up. Fill slots with what the *viewer* wants, not what the creator is proud of. Vary opening words across uploads.

### 6.3 Thumbnails
3 concepts: one subject + one strong emotion + ≤ 4 words that **add** to the title (never repeat it) + optionally one number. Big shapes, high contrast, readable at 160 px wide. Pass the **hand test** and a **squint test**. Make 2-3 finals for YouTube's Test & Compare.

### 6.4 The promise rule
The first 30 s (long-form) or 3 s (Shorts) must start paying off the title + thumbnail. High CTR with low retention gets a video buried.

---

## 7. Script

### 7.1 Length budget
AI narration ≈ **2.5-2.6 words/s** (~150 wpm). Shorts 30-60 s = 75-150 words; 8-15 min = 1,200-2,300 words. Compute the duration before voicing.

### 7.2 Structures
**Short (30-60 s):** hook (0-2 s) → open loop by 5 s → escalating beats every 2-4 s → name the viewer's experience once → payoff at **75-80%** after a half-second of silence → one-line CTA → last line loops into frame 0.

**Long-form:** cold open (the best moment, ≤ 30 s) → promise → chapters every 2-3 min, each ending on a mini-cliffhanger → **re-hooks** at ~25% and ~50% ("but that's not the worst part") → pattern interrupts every 60-90 s → "what this means for you" final act with something actionable → CTA + end screen.

### 7.3 Retention engineering (the principles behind videos people rewatch)
1. **Visible, inevitable progress:** a counter, a timeline, a countdown or a filling bar the viewer can't stop watching.
2. **One escalating number** as the spine (it grows or drains), with the math shown on screen.
3. **Open a loop early, pay it late** (75-80%). Several small loops are better than one.
4. **Something changes every 2-4 s** (Shorts) or 10-20 s (long-form): a cut, a zoom, a label, a number tick, a sound.
5. **Escalate:** every beat bigger, weirder or funnier than the last. Never plateau.
6. **Talk to the viewer about their own experience** ("you're doing the math right now, aren't you?").
7. **Silence before impact:** a half-second of nothing, then the payoff.
8. **Physical payoff:** the moment happens on screen (it explodes, collapses, shatters), not only in words.
9. **Seamless loop** for Shorts: the last frame or line flows back into the first.
10. **Premium and minimal:** one subject on screen, clean type, nothing cluttered.
11. **Big, felt numbers:** yearly or lifetime totals beat tiny daily ones; say the math out loud. Never inflate past what's true or clearly labeled hypothetical.
12. **Muted-friendly:** 80% of viewers watch muted at first; every key beat needs on-screen text.

### 7.4 Script output format
`script.md`:
1. Title, chosen hook, angle, emotional driver.
2. Beat table: `time | voiceover | visual (what's on screen) | on-screen text | SFX/music`, one row per 2-4 s (Shorts) or 10-30 s (long-form).
3. **Number spine:** every number shown, with its math.
4. `sources.md`: every factual claim with a link; unverifiable claims are cut or labeled.

### 7.5 Writing for TTS (prevents most re-records)
- Write numbers as spoken words; keep the digits in the caption text.
- **Interjections** ("mm-hmm", "uh-huh", "ugh", "pfft") are often spelled out letter by letter: test them, and use phoneme input or respell them ("mmhm") until they sound like sounds.
- **ALL-CAPS words** are often read as acronyms ("OWN" → "O-W-N"): use lowercase in the voice text and put emphasis in the captions instead, or map them with phonemes.
- Don't start a line with "…" or a bare number word; round awkward numbers.
- Lines ≤ 12 words; "?" lifts, "." lands, "—" pauses.

---

## 8. Production

### 8.1 Voice
| Engine (free) | Best for |
|---|---|
| Chatterbox (MIT) | expressive narration; an emotion/exaggeration control; voice cloning from 10-30 s of **consented** audio |
| Kokoro (Apache-2.0) | fast and consistent; many voices; phoneme control |
| edge-tts | zero-setup fallback (needs internet) |
| Paid (ElevenLabs, etc.) | only if `CHANNEL.md` allows paid tools |

Give each character its own fixed voice and an emotion level per line. Generate one clip per line, **cache by hash(text + voice + settings)**, and never regenerate unchanged lines.

### 8.2 Captions
- Word timings come from **the real audio** (faster-whisper / Whisper with `word_timestamps`), never estimated from character counts. Each word appears **~0.05 s before** it's spoken.
- Re-take any line whose transcript differs from the script (word error rate > 0.2).
- 1-4 words on screen, the key word or number in the accent color.
- Keep clear of the platform UI. Shorts: nothing important above y≈220, below y≈1540, or right of x≈940 in the lower half.

### 8.3 Visuals
Choose the lightest tool that delivers the look in `STYLE.md`:
| Look | Tool |
|---|---|
| Illustrated stills with slow pans and zooms | ffmpeg `zoompan` per clip + concat demuxer |
| Kinetic type, counters, diagrams, 2D characters | HTML/CSS/GSAP → MP4 (HyperFrames) or React → MP4 (Remotion) |
| 3D scenes and characters | three.js inside the HTML renderer, or Blender |
| AI images/video | only if allowed; keep one consistent style prompt prefix; test one image before batching |

Rules: one subject on screen; every number change gets a visual pop and a sound; character name tags never hidden behind other elements; frame 0 is a real image (it often becomes the thumbnail). Render **one job at a time**. Animations must be deterministic (a pure function of time) so renders are frame-exact.

### 8.4 Sound
A music bed under the voice (royalty-free, license in `credits.md`), an SFX on every number change, a whoosh on transitions, a hit on the payoff, silence before the reveal. Cut on the beat where possible.

### 8.5 Edit + audio master
- Assemble with the concat **demuxer** (`-f concat -safe 0 -i list.txt -c copy`), not the concat filter.
- Mix: voice ≈ -16 LUFS, music bed -24 to -26 (≥ 10 dB under the voice).
- Master chain: `highpass=f=75, acompressor=threshold=-18dB:ratio=3:attack=20:release=220, loudnorm=I=-14:TP=-1.5:LRA=11, alimiter=limit=0.95` → **-14 LUFS, true peak ≤ -1 dBTP**.
- Export H.264 + AAC, 30 fps (or 60 for motion-heavy work), Shorts 1080×1920, long-form 1920×1080 or 4K.

### 8.6 Shorts from long-form
Pick 3 self-contained moments (the hook, the most surprising beat, the payoff). Rebuild them vertically when possible; otherwise use a blurred-background fallback:
`split=2[bg][fg];[bg]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,boxblur=40:8[b];[fg]scale=1080:-2[f];[b][f]overlay=(W-w)/2:(H-h)/2-200`
Each Short gets its own frame-0 hook, never a mid-sentence start. Post them within ~7 days of the long-form and link back to it.

---

## 9. QA (always, before calling anything done)

Automated → `qa.md` (PASS / FIX / FAIL):
- [ ] Duration within ±10% of the script budget; correct resolution, fps and codecs.
- [ ] -14 ±1 LUFS; true peak ≤ -1 dBTP.
- [ ] No frozen stretch > 3 s (Shorts) / > 20 s (long-form); frame 0 isn't black or empty.
- [ ] Caption match rate ≥ 90% against the audio; no caption in a UI dead zone.
- [ ] Every claim in `sources.md`; every asset in `credits.md`.

By eye (cheap): **one contact sheet** of 8-12 frames (hook, each beat, payoff, CTA, last frame) at ~300 px wide. Check text size (captions ≥ 54 px at 1080 wide), overlaps, hidden labels, the safe zone, caption sync, and whether frame 0 works as a thumbnail. For important videos, have a fresh sub-agent with no context critique the contact sheet.

**Hook audit:** would *you* stop scrolling on frame 0 with the sound off? If not, fix the hook before anything else.

## 10. Thumbnail + metadata

**Thumbnail:** 1280×720, < 2 MB; rendered from the video's own art style; 2-3 variants.

**`upload.json`:**
```json
{
  "title": "",
  "description": "First 150 chars: the hook + main keyword (visible before 'more').\n\nChapters:\n0:00 ...\n\nSources:\n...\n\n<disclaimer>",
  "tags": ["5-15 phrases people actually search"],
  "categoryId": "",
  "defaultLanguage": "",
  "madeForKids": false,
  "containsSyntheticMedia": false,
  "privacyStatus": "private",
  "publishAt": null,
  "playlist": "",
  "pinnedComment": "a question that invites a one-word answer"
}
```
Chapters: the first at `0:00`, at least 3, each ≥ 10 s. Add every video to a playlist, plus an end screen to the most related video (session watch time).

## 11. Batch mode ("make this week's content")

1. Re-read `CHANNEL.md`, `STYLE.md` and `learnings.md`.
2. Research once for the week (§4.4 + §4.5) → present ~10 ideas in one table (angle, format, hook, score). **User picks** (one message).
3. Packaging for all picks (§6) → **user picks** titles + thumbnails (one message).
4. For each video: script → voice → captions → visuals → edit → QA → thumbnail → metadata. One render at a time; cache everything.
5. Deliver **one review page** listing every package (video, thumbnail, title, description, QA status, proposed publish time).
6. **User approves** → upload privately and schedule (§12).
Rotate formats and angles so no two consecutive uploads feel the same.

## 12. Upload + schedule (only after explicit approval)

- YouTube Data API v3: `videos.insert` (resumable) → `thumbnails.set` → `playlistItems.insert`, with an OAuth refresh token the user created (scope `youtube.upload`). Tokens live in env vars or a secret store, never in files that get committed.
- Tell the user up front:
  - Uploads from an **unverified** Google Cloud project are locked to **private** until the project passes YouTube's API audit. Until then, upload private and the user publishes or schedules in Studio.
  - An upload costs ~1,600 of the default 10,000 daily quota units (~6 uploads a day).
- No API? The package folder *is* the deliverable; the user uploads in Studio using `upload.json`.
- Cross-posting (TikTok, Reels) uses each platform's own tools or a scheduler the user approved; remove other platforms' watermarks.

**Package folder:**
```
videos/<YYYY-MM-DD>-<slug>/
  brief.md  script.md  sources.md  credits.md  qa.md
  voice/  captions.json  video.mp4  shorts/*.mp4
  thumb-a.png  thumb-b.png  upload.json
```

## 13. Analytics loop (weekly)

Pull (API/Studio export) or ask for, per video: **impressions CTR, average view duration and % viewed, retention at 30 s (long-form) or "stayed to watch" % / swipe-away (Shorts), traffic sources, subs per view, comments per view.**

Rough benchmarks (vary by niche; compare within your own channel first):
| Metric | Weak | OK | Strong |
|---|---|---|---|
| CTR (overall) | < 3% | 3-8% | > 8% |
| Avg % viewed (long-form) | < 20% | 20-50% | > 50% |
| Shorts stayed-to-watch | < 60% | 60-75% | > 75% |
| Subs per view | < 0.1% | 0.1-1% | > 1% |

Diagnosis: **low CTR** = packaging problem (title/thumbnail); **high CTR + low retention** = the promise isn't delivered or the hook is slow; **drop at a specific timestamp** = that beat is weak; **low subs per view** = no reason to come back (series, CTA, consistency).

Then: rank the week; compare the top 2 with the bottom 2 on angle, hook, title, thumbnail, length and topic; write 1-3 dated rules into `learnings.md` (labeled small-sample); make sequels of winners; feed it all into next week's research.

## 14. Monetization and policy risk audit

Check titles, thumbnails, descriptions and 3-5 transcripts against YouTube's live monetization and community policies (read the current pages; they change). Score 0-100 (🟢 < 30, 🟡 30-59, 🔴 ≥ 60) for:
- **Inauthentic / repetitive content:** near-identical scripts, voices, structures and thumbnails across videos; low added value.
- **Reused content:** others' clips or footage without significant transformation.
- **Misleading metadata or thumbnails.**
- **Advertiser-unfriendly topics** for the niche.
- **Synthetic media not disclosed;** made-for-kids mislabeling.
For each risk: the evidence, then the fix, highest risk first.

## 15. Working efficiently

- Re-read only `CHANNEL.md`/`STYLE.md`/`learnings.md` and the files the task needs; read line ranges, not whole files.
- Cap tool output; one contact sheet per visual check; background long renders and voice jobs and don't poll them.
- Cache voices and renders; change text only when it must change; fix layout in CSS before regenerating audio.
- **Plan before building:** settle the script and timing first. Rebuild loops are the costliest mistake.
- Replies lead with the result and list only what the user must decide.

---
Credits: written in our own words, drawing on MIT-licensed open-source skills: [youtube-research-skills](https://github.com/TubeLabHQ/youtube-research-skills) by TubeLab (niche finder/validator/bending, comment mining, ideation, title formulas, risk audit), [youtube-marketing-skills](https://github.com/adityaarsharma/youtube-marketing-skills) by Aditya Sharma (hook window, retention scripting, algorithm and benchmarks, Shorts playbook), [zero-dollar-studio](https://github.com/TheNoumanDev/zero-dollar-studio) by TheNoumanDev (free voice/caption pipeline, TTS writing rules, QA), [claude-skill-media-pipeline](https://github.com/iliasabk/claude-skill-media-pipeline) by iliasabk (ffmpeg assembly, mastering, Shorts conversion, upload), and [youtube-automation-competitor-analysis](https://github.com/jenny-gecglr/youtube-automation-competitor-analysis) by jenny-gecglr (mechanism-not-wording, thumbnail tests). Benchmarks are rough industry figures, not guarantees; check YouTube's current policies and limits before relying on them.
