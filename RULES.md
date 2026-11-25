# RULES.md — every rule and correction the owner has given (Bad Math)

**Read this before writing a script, directing a build, or queuing a post.** Newest wording wins. STYLE.md / PRODUCTION.md explain the *how*; this file is the *what*, and it overrides them where they disagree (see "Known conflicts" at the bottom).
Compiled 2026-11-25 by Fable from all 156 owner messages in `archive/conversation-latest.md` + HANDOFF / CHANNEL / STYLE / PRODUCTION / VISUAL-V2 §0.

**Correction protocol (rule 96):** the same turn the owner corrects anything → add/replace the line here (date + their words) → update the gate below and `brand/tools/script_gate.py` if a machine can check it → then do the work. A correction that is only in chat is a correction that will be forgotten.

---

## SCRIPT GATE — answer every line for EVERY script (3 per topic) BEFORE voicing
Run `python3 brand/tools/script_gate.py videos/<slug> --all` (un-voiced drafts: add `--script script.v2.json`). **Exit 1 = do not voice.** Then answer the judgement lines by hand in the DIRECTION file.

| # | Question (must be YES) | Checked by |
|---|---|---|
| S1 | Hook: first sentence ≤ 12 words, outrageous / negative / edgy, **and true + sourced**? Lands inside ~3 s? Not a soft "What if…?" opener? | gate (length) + director |
| S2 | 10 hook variants written and scored; best one kept? | director |
| S3 | Story loop written out: `STAKES / QUESTION / TWIST / REHOOKS` — a real twist and a rehook every 6–8 s? | director |
| S4 | **LIKE** ask at ~30% (20–40%), one short clause tied to a reaction the viewer is having? | gate |
| S5 | **SHARE / SEND** ask at ~55% (45–65%), tied to a specific person in their life? | gate |
| S6 | **FOLLOW** ask at ~80% (70–90%), a promise right before the payoff — not a plea? | gate |
| S7 | Comment question right AFTER the payoff (debatable, one line)? | gate |
| S8 | **No end CTA block:** fewer than 2 asks in the last 15%, last line is NOT like/share/follow, no "follow for more / for the next one"? Video ends on the payoff / twist / loop line? | gate |
| S9 | IG/FB cut: send/share mid-video + at least one more ask, spread (never both at the end)? | gate |
| S10 | Duration in the window — DECODED 80–100 s, target 90 (≤ 250 words) · WHAT IF 62–75 s, never under 60 s, target 65 (≤ 180 words)? (owner 2026-11-25) | gate |
| S10b | KINDERGARTEN CLARITY: who / what / why set up before the numbers; every term explained in plain words (no "APR", "restitution", "principal" without a 5-word explanation); ONE new idea per line; every big number gets an everyday comparison; the "how did it work" step is walked slowly, step by step; nothing a viewer must already know. Read it as a 10-year-old: any moment you'd be lost → rewrite. | director |
| S11 | Pacing: no stretch > 6 s without a number, a question or a turn; no voiced line > 7 s; no 3 bare numbers in a row; no sentence with 4+ figures; first turn/question before ~20%? | gate |
| S12 | Payoff lands at ~75–80% with a beat of silence before it; nothing after it except the comment question and a loop line? | director |
| S13 | Humanized: contractions, 1–3 reactions, talks to "you", everyday words (heavier slang on TikTok/IG), ONE self-correction (never inside a Decoded fact), 1–3 tags from `[breath] [sigh] [gasp] [sniff] [smack] [throat] [pause]`? | gate (warn) + director |
| S14 | **Zero** um / uh / erm, **zero** laugh / [chuckle], no "link in bio", no "like and subscribe", no Tape, no advice, no "AI-narrated"? | gate |
| S15 | Platform tone right: YouTube ad-safe (dumb/stupid/idiot only) · TikTok spicy, no strong profanity · IG/FB most disrespectful, profanity OK, no slurs, never the victims? | gate (profanity) + director |
| S16 | Decoded: every voiced/on-screen fact is VERIFIED or ✔2 in `research.md`, attributed ("prosecutors say"), convicted/pleaded only, pending = "alleged"? What If: assumptions said and shown, math re-checked? | director |
| S17 | Three cuts are three different scripts (own hook, own order), not one script trimmed? Topic not in `ideas.md` already? | director |
| S18 | Pronunciation pass done (`pronounce.py audit`), numbers written as words in the SAY layer? | director |

## VIDEO GATE — answer every line for EVERY rendered cut BEFORE queuing
| # | Question (must be YES) | How |
|---|---|---|
| V1 | Re-ran `script_gate.py` on the cut with the real `sentences.json` — PASS? | gate |
| V2 | Watched it (`brand/tools/watch.sh video.mp4 <out>` or a 1-fps timestamped sheet), not just a 24-frame contact sheet? | director |
| V3 | Frame 0 is a pattern break (slam / stamp / impossible number + hit sound) with the outrageous words on screen — no title card, no fade? | sheet |
| V4 | Something meaningful changes every 2–3 s; **no card/layout held longer than ~4 s**; no static shot > 3 s? | 1-fps sheet |
| V5 | Camera pushes in on every spoken number as it is said; storyteller travels (in front / behind / beside), never parked pointing? | sheet |
| V6 | CTA micro-moments on screen when voiced: heart pulse (like) · paper-plane flick (share) · storyteller taps +FOLLOW (follow) · comment bubble after the payoff. Small, ≤ 1.5 s, never a banner, never stacked? | sheet |
| V7 | The biggest visual hit is the payoff at ~75–80%; the video is over ≤ ~6 s later and loops into frame 0? | sheet |
| V8 | Brand lock intact (rule 62) and no neon glow (rule 59)? | sheet |
| V9 | Every on-screen number matches `research.md`; ASSUMES / HYPOTHETICAL card on What If; "alleged" where needed; ILLUSTRATION label on anything illustrative? | sheet + research |
| V10 | Captions from script/sentences (never Whisper), no [tags] shown, normal spelling, readable muted, inside the safe zone? | sheet |
| V11 | Liam voice; no butchered words (Whisper check of names/acronyms); breaths sound human? | listen/transcript |
| V12 | Sound is CC0 library only; −14 LUFS, peak ≤ −1 dBTP; a hit on the payoff, silence before it? | qa.md |
| V13 | Post settings: AI labels OFF on all platforms, no "AI-narrated", no "link in bio", comment-bait first comment, right slot, YouTube 10-per-UTC-day cap respected, ≤ 7 days ahead? | PostFast |

---

## The rules (numbered; date = when the owner said it, quote = their words)

### Posting & schedule
1. Minimum **8 posts per platform per day** (Shorts), not "up to 8". — 2026-11-24, logged in CHANNEL.md ("at least 8 posts every day")
2. Long-form: **Mon / Wed / Fri 17:00 ET, YouTube only**. — 2026-11-24 "keeping the 3 times a month for longform" (see conflict C4)
3. Auto-publish with no approval prompts; revocable only by "stop auto-posting". — 2026-11-24 "Stop asking for permission to approve posts"
4. Videos must go out on time even when the owner is away. — 2026-11-24 "posted on time every day"
5. Build one at a time and publish each as soon as it's done. — 2026-11-24 "whenever one gets done, just automatically upload it"
6. Every post is unique; never repeat a topic (check `ideas.md`). — 2026-11-24 "do not create repetitive mess"
7. Build ahead is fine, but schedule at most ~7 days out. — 2026-11-24 "like a week ahead or so"
8. Daily analytics pull + weekly review; replicate what performs, improve daily. — 2026-11-24 "make the content better and better every day"
9. Don't delete or rebuild posts that are already fine just because a new style rule arrived. — 2026-11-25 "The posts we have right now are fine" (exception: a video the owner calls bad gets rebuilt and replaced)
10. Slots (ET): Shorts 08/10/12/14/16/18/20/22; PostFast YouTube cap 10 per UTC day (ET 20:00+ counts as next day). — PRODUCTION.md 2026-11-25
11. If usage runs out, continue when it refills; never drop the job. — 2026-11-24 "continue afterwards whenever it refills"

### Platforms & cuts
12. Accounts: YouTube BadMath · TikTok @color.me.saved (it IS the Bad Math TikTok until renamed) · Instagram badmath.tv · Facebook BadMath.tv. — 2026-11-24 "just under the wrong username"
13. Every topic = **three different scripts and edits**, not one video cross-posted. — 2026-11-24 "make the whole script… completely different"
14. YouTube Shorts: Decoded ~90 s (80–100), What If ~65 s (62–75, never under 60) (was 40–55; owner 2026-11-25 "scripts are being rushed… missing too much context"), full story arc, ad-safe edgy, loops, searchable title. — STYLE §15, 2026-11-24
15. TikTok: Decoded ~90 s, What If ~65 s (was 25–40), start mid-action but explain every step, spicy, direct "you", comment bait. — STYLE §15, 2026-11-24
16. Instagram + Facebook Reels: Decoded ~90 s, What If ~65 s (was 15–25), simple setup then the punchline, built for sends and saves. — STYLE §15, 2026-11-24
17. The Instagram hook is the most disrespectful and vulgar one. — 2026-11-24 "more disrespectful and actually more vulgar"
18. Each platform gets what its algorithm favors. — 2026-11-24 "YouTube favors one thing and Instagram favors another"
19. Captions/descriptions written per platform (IG, TikTok, YouTube). — 2026-11-24 "captions for Instagram, YouTube, and TikTok"
20. Socials are purely for views and content: no link-in-bio lines, no Tape on TikTok/IG. — 2026-11-24 "we are avoiding link in bio"

### Hooks & story
21. A pattern break at the very start sets the hook. — 2026-11-24 "I need a pattern break at the beginning"
22. Hooks are rule #1, retention #2: first line outrageous, negative, edgy — and true. — 2026-11-24, STYLE §14 ("This guy was so dumb…", "You're probably an idiot if…")
23. Hook claims are sourced; "dumb / fraud" only for convicted people or on-the-record acts; roast habits and con artists, never victims or groups. — STYLE §14
24. Write 10 hook variants, keep the strongest true one; frame 0 shows the outrageous words; open a loop paid off at 75–80%. — STYLE §14
25. Story loop in every script: stakes → big question → unexpected twist → rehook, until the payoff. — 2026-11-25 "take this videos knowledge and apply it to urself"
26. Rehook every 6–8 s; something changes on screen every 2–3 s; the last line loops into frame 0. — STYLE §14/§18
27. The middle must be interesting and captivating, not filler. — 2026-11-24 "the meat of the video… more interesting"
28. **Pacing matters as much as the hook: no dead spots, no long setups, no number dumps, no flat middle, no dragging ending.** — 2026-11-25 "the 1% fee video was trash it had bad pacing"
29. What If premises can be random and wild as long as money is the theme. — 2026-11-25 "something off the wall, kind of crazy"
30. No slow intros, no guru talk, no latte lectures, no stock picks, no obvious AI slop. — 2026-11-24 intake "tired of rich-guy gurus"
31. Long-forms must be built to hit: great idea, hook, thumbnail, everything. — 2026-11-24 "I wanted to hit"

### Scripts & voice
32. Humanize every script: sounds like a person telling a friend, not a fact sheet. — 2026-11-25 "humanize the scripts a bit"
33. Contractions, short punches + one run-on, small reactions (1–3), talk to "you", round numbers in speech (exact on screen). — STYLE §21
34. Use words humans use — like, literally, honestly, bucks, grand, no way, bro; light on YouTube, heavier on TikTok, heaviest on IG/FB. — 2026-11-25 "add words humans would use"
35. Human imperfections: ONE restart / self-correction per Short (never inside a number that is a Decoded fact), breaths and human noises via `brand/voice/humanize.py`. — 2026-11-25 "more inhale and human noise sounds"
36. **NO "um / uh / erm" fillers. Ever.** — 2026-11-25 "drop the uhms it doesnt sound right at all" / "just cut the uhms out of the scripts"
37. **NO laugh, NO [chuckle].** — 2026-11-25 "that laugh is hella out of place"
38. Shorts voice = free Kokoro **am_liam**, plain read, all new Shorts. — 2026-11-25 "liam is great" / "make all the new ones liam"
39. **No energy mode / no hyper voice.** (Asked for "more energy… sporadic and crazy" first, then dropped it.) — 2026-11-25 "no skip the energy part"
40. Long-form voice = ElevenLabs **Owen – Calm, Trustworthy Narrator** (83MXTnoLsr3jX4Sl4gL4); paid voice is for long-forms only. — 2026-11-24 "Owen, the trustworthy narrator" / "longform should always get it"
41. The voice must pronounce every word right: phonetic SAY layer, normal-spelling SHOW layer in captions. — 2026-11-24 "it just butchers them… not like an AI robot slop"
42. Narrator has no name, is never an expert, never says "I"; no advice, no picks, no guaranteed returns; never pitches Tape. — 2026-11-24 intake
43. Short lines, concrete numbers, one idea per line; explain the mechanism, not a moral; end on a punchy one-liner. — STYLE §2
44. No templated scripts with names swapped; never copy competitors' topics, scripts, footage or audio (patterns only). — 2026-11-24 intake
45. Don't spend time on mock/demo videos when real ones are due. — 2026-11-25 "just focus on the projects leave the mock video out"

### CTAs
46. Like, share and follow are **spread out through the video and woven into the script**. — 2026-11-24 "spread out throughout the video, but also incorporated within the script"
47. **Never a pitch.** No "follow and share to see more videos like this", no "follow for the next one", no "like and subscribe". — 2026-11-24 "Do not do that… I don't want it to feel like a pitch"
48. Follow is mentioned mid-story, in passing. — 2026-11-24 "midway through the story you kind of mention following the page"
49. Placement: like ~30% (a reaction) · share/send ~55% (a specific person) · follow ~80% (a promise before the payoff) · comment question after the payoff. — STYLE §13 + 2026-11-25 "i wold u spread out the cta throughout the video"
50. **No CTA block at the end. The ending is the payoff / twist / loop — never an ask.** — 2026-11-25 "the ending cta was terrible"
51. Each ask is one short clause in the narrator's dry voice with a tiny on-screen icon moment (heart / paper plane / +FOLLOW tap). No banners. — STYLE §13
52. Call people to follow and to comment what they think, placed where it converts best. — 2026-11-24 "calling people to follow and comment what they thing"
53. IG/FB leans on send + save; TikTok on a debatable comment question; comment keywords OK ("comment MATH"), never for links or products. — STYLE §15/§18
54. No "link in bio". No Tape in voice or on TikTok/IG. — 2026-11-24 "we are avoiding link in bio"

### Visuals & brand lock
55. Heavy animation, interactive, captivating; a static or flat video is a fail. — 2026-11-24 "didn't have really any animations"
56. Storyteller coin-head character in every video, bottom-right home, consistent everywhere. — 2026-11-24 "save the character so he is consistant and pops up everywhere"
57. He must not stand in one spot pointing: graphics come toward the camera, the camera zooms on the important numbers and moving parts, he steps in front to talk then lets the graphic come back. — 2026-11-25 "I want this to be a flowing experience"
58. Every graphic and graph must be extremely satisfying to watch (springs, overshoot, precision, completion). — 2026-11-25 "extremely satisfying to look at"
59. **No flat glowing-neon look.** — 2026-11-25 "I kind of want to get away from the neon"
60. Long-forms use the same v2 interactive style (16:9); never the old neon engine. — 2026-11-25 "same trash neon slop"
61. All new videos use `brand/engine-v2` + `brand/VISUAL-V2.md`; Fable built it once, Opus directs with it. — 2026-11-25
62. **Brand lock:** storyteller design, profile pictures, DECODED / WHAT IF pills, Anton · Inter · JetBrains Mono, BAD MATH wordmark and series colors never change. Evolve, don't rebrand. — 2026-11-25, VISUAL-V2 §0
63. Palette: Ink #0B0F14 · Paper #F5F3EE · Money Green #00D26A · What If yellow #FFD60A · Decoded red #FF3B30. — 2026-11-24 intake
64. Safe zones: nothing important above y≈220, below y≈1540, or under the right button rail; works muted (on-screen text on every key beat). — STYLE §5/§6
65. No real logos or brands in art; no other creators' clips; no free AI video generators (watermarks). — 2026-11-24 intake
66. Memes: 2-second meme clips are fine by the owner; source = clips the owner downloads from Vlipsy into `brand/memes/vlipsy/` (no scraping). — 2026-11-24 "small 2 second memes will not get us demonetized" (see conflict C6)
67. Profile: display name Bad Math, pfp `brand/pfp-ink.png`; bios optimized per platform in `brand/PROFILE.md`. — 2026-11-24 "name works" · 2026-11-25 "optimize all of my profile bios"

### Facts (Decoded / What If)
68. **Decoded = 100% accurate, no exceptions.** — 2026-11-25 "Keep that 100% accurate, 100% facts"
69. Decoded only covers convictions, guilty pleas or final judgments; anything pending is "alleged" or skipped. — 2026-11-24 intake
70. Every Decoded fact = a primary source or 2+ independent sources (✔2 / VERIFIED in research.md); one source = cut; conflicts = the conservative, attributed version. — STYLE §19
71. No invented quotes or dramatized dialogue; label anything illustrative. — STYLE §19
72. What If: the premise can be absurd, the math cannot be wrong; assumptions said and shown; never presented as something that happened. — 2026-11-25 "As long as you keep money as the main idea"
73. Every number is checked against a source and logged; unverifiable = cut. — 2026-11-24 intake "Numbers you haven't checked"
74. If a posted Decoded video has an error: tell the owner immediately and propose replacing it. — STYLE §19
75. No thumbnail/hook promise the video doesn't deliver; no strong profanity in titles or thumbnails. — 2026-11-24 intake

### Sound
76. No synthesized "Claude slop" sounds; use real recorded sounds. — 2026-11-24 "it was just Claude Code slop… sounded like shit"
77. Sound effects and music are always free (CC0 library); never spend ElevenLabs credits on SFX or music. — 2026-11-24 "i want free sound effects just paid voice"
78. Build a big library of sound effects and memes to use. — 2026-11-24 "find as many sound effects and memes"
79. Mix: voice clear over the bed, −14 LUFS, peak ≤ −1 dBTP; tick on number changes, hit on the payoff, silence before it. — STYLE §7

### Labels & compliance
80. **AI-generated labels OFF on every platform and every scheduled post**; no "AI-narrated" text. — 2026-11-25 "REMOVE THE AI LABEL OFF OF EVERYTHING"
81. Reason + limit: we never imitate a real person; if a video ever did, that one gets labeled. — 2026-11-25 "since we are not mimicing people"
82. YouTube descriptions keep "not financial advice"; no advice, picks or guaranteed returns anywhere. — 2026-11-24 intake
83. Tape ("my app") only in pinned comment / description / channel links on YouTube; one disclosed non-trading, non-crypto affiliate after 1K subs. — 2026-11-24 intake
84. Repo is private and is where everything gets saved. — 2026-11-24 "The repo is for you to save stuff on"

### Comments
85. Manage comments through PostFast: first comment on every post + replies. — 2026-11-25 "that would actually be so perfect"
86. Hybrid mode: auto-reply to normal comments in the dry Bad Math voice; flag sensitive ones (legal, victims, advice requests, business, press, pile-ons, possible errors) to the owner. — 2026-11-25 "do both"
87. Never give advice, argue twice, or roast the commenter; log topic requests in `ideas.md`. — STYLE §17

### Models / roles
88. **Fable** = all research: facts AND content/competitor/viral research feeding ideas to Opus. — 2026-11-25 "Fable is better at research"
89. **Opus** = creation and directing. **Sonnet / Haiku** = coding, rendering, voice timings, sound, packaging. — 2026-11-24 "Use one of the lesser models that do the coding"
90. Fable is brought out for big quality fixes (visual v2, this rulebook), then hands back; Fable is not the daily animator. — 2026-11-25 "I want Fable to… handle the changes" / "Bring Fable out"
91. Use skills/tools that let Claude watch videos and post on its own; watch reference videos the owner sends and apply the lessons. — 2026-11-25 "install a skill that allows u to watch youtube and instagram videos"

### Usage & communication
92. Budget ~$150/mo: Claude Max + ElevenLabs Creator. Free everything else. — 2026-11-24 "i only have 150$"
93. Be efficient with credits: lesser models for building, ≤ 3 agents, short replies; give time-based usage estimates before heavy jobs. — 2026-11-24 "more efficient with the credits"
94. Send the owner each finished video + its slot; answer status questions straight; when asked for something (bios, titles, links, captions) hand it over directly. — 2026-11-25 "give me the new bios i never updated them"
95. Don't ask permission for things already authorized; don't make the owner repeat themselves. — 2026-11-24 "you don't have to ask me every time"

### Memory
96. **Remember every correction and rule. A correction never has to be given twice.** — 2026-11-25 "everytime i correct you remember it you are failing to do that" / "i need you to remember every correction and rule"
97. Never lose context: HANDOFF.md + `archive/` backups + successor-session protocol after the 3rd compaction. — 2026-11-25 "I don't ever have to lose this context"
98. Everything new is saved to the repo so a new window can continue. — 2026-11-25 "make sure this info is asaved on your brain"
99. This is a long-term project; keep the system files current after every work block. — 2026-11-25 "this is a long-term plan for me"
100. A rule in a file is not enough — every script and video is CHECKED against the gates above before voice / queue. — 2026-11-25 (root cause of the 1% fee failure: STYLE §13 existed and was not checked)
101. BROAD TOPICS: money is the topic, the audience is EVERYONE. Every topic must pass the "grandma / 16-year-old" test — the subject (brand, person, game, product, event, everyday cost) is recognizable in 2 seconds with zero finance knowledge. No niche finance topics (obscure fraudsters, crypto tokens, fund mechanics, fee structures) unless framed through something everyone knows. — 2026-11-25 "the topic is money, but the audience is everyone"
102. SHORTS NEED CONTEXT, NOT SPEED: Shorts are longer (DECODED ~90 s (80–100 s) · WHAT IF ~65 s (62–75 s, never under 60 s), same on every platform) and explained almost at kindergarten level — set up who/what/why, explain every term in plain words, one idea per line, walk the "how it worked" step by step, give every big number an everyday comparison, never rush details. Still a gripping story. Long-forms unchanged. — 2026-11-25 "the scripts are being rushed… I'm losing everything… break it down almost to kindergartner level"
103. EVERY Short is OVER 60 SECONDS on every platform — no exceptions (TikTok pays only on videos longer than 1 minute). Gate floor: 62 s. — 2026-11-25 "They always have to be above 60 seconds… I can't get monetized at least on TikTok"
104. NO BREATHING and NATURAL PAUSES: no [breath]/[sigh]/[gasp]/[smack]/[sniff]/[throat] noises at all, no auto inhales. Gaps between lines are natural (~0.22 s; ~0.38 s where a big number or verdict lands). No long dead-air holds. brand/voice/humanize.py enforces it. Supersedes the "human noises" part of STYLE §21 and the long-beat guidance of §23. — 2026-11-25 "get rid of the breathing too all of the pauses are weird"

---

## Rejected by the owner — never bring back
um / uh fillers · laugh / chuckle · energy / hyper voice · neon glow look · AI labels & "AI-narrated" · "link in bio" · pitch CTAs ("follow for more", "like and subscribe") · end-of-video CTA blocks · synthesized "Claude slop" sounds · repeated topics · per-post approval prompts · storyteller parked in a corner pointing · flat, barely-animated videos · one script cross-posted to all platforms · mock videos instead of real work.

## Known conflicts (newest wins — fix the older file when you touch it)
- **C1 · CTA placement.** STYLE §9 ("never mid-video before the payoff… one line in the last ~3 s", examples "Follow. Next file's worse.") and CHANNEL.md `cta:` contradict STYLE §13 and rules 46–50. **Woven + spread wins; §9's voiced end-line is dead.** §9's on-screen comment bubble after the payoff stays; the +FOLLOW tap moves to the ~80% follow line (a silent tap in the loop frame is optional, never voiced).
- **C2 · IG/FB CTA.** STYLE §15 table ends the IG cut on "send this to… / save this"; rule 50 forbids ending on an ask. **Send goes mid-video (~50–60%); IG ends on the punchline.**
- **C3 · AI labels.** CHANNEL.md `disclosures:` and STYLE §12 checklist still say "synthetic disclosure ON / AI-narrated". **OFF wins (rules 80–81).**
- **C4 · Long-form cadence.** Owner's last words were "3 times a **month**"; the system runs Mon/Wed/Fri (3 a **week**) based on the Creator-plan discussion just before. Treated as a slip of the tongue — **confirm with the owner.**
- **C5 · Lengths.** Intake and STYLE §12 say Shorts 20–45 s; §15 per-platform windows are newer and win. Note 2026-11-25 Javice / parlay / McDonald's YouTube cuts ran 57–60 s (over the window).
- **C6 · Vlipsy.** Owner: "pull ur memes from here" + "2 second memes will not get us demonetized". Repo guardrail (MEMES.md): only clips the owner downloads by hand, because Vlipsy's terms forbid scraping. Owner accepted that workflow; no clips supplied yet.
- **C7 · Music source.** STYLE §7 says "YouTube Audio Library only"; practice and rule 77 = CC0 library (Openverse / Freesound). CC0 wins.
- **C8 · "Don't rebuild" vs "it was trash".** Rule 9 protects finished posts from *style-change* rebuilds; an explicit owner complaint about a specific video overrides it (1% fee, and the two same-batch Shorts with the same CTA fault).
- **C9 · Line length.** STYLE §2 "≤ 12 words per line" vs §21 "one longer run-on sentence". Hook ≤ 12 words always; one run-on per Short allowed, but no voiced line over ~7 s.
- **C10 · Hook vs series tone.** What If "curious, playful" (intake) vs "outrageous, negative" hook gate (newer). The hook is outrageous; the playfulness lives in the middle. A What If must not open with a soft "What if…?" question — the pill already says WHAT IF.
- **C11 · Follow before payoff vs payoff at 75–80%.** Both sit at ~80%. Order is fixed: follow-promise clause (~72–80%) → half-beat of silence → payoff (~78–85%) → comment question → loop line.

- (2026-11-25, "i like the title, How simple math caught 3 massive frauds") Long-form titles: plain words, outcome first, a number, no insider phrase the viewer must already understand. Post 526cfc00 was replaced by c0419604 with this title.

- (2026-11-25, "find real pictures of everyone… use stock images where you see fit… connected to Canva") **Real photos:** every real person named in a video is shown with a REAL photo when a properly licensed one exists. Find them with `python3 brand/tools/photos.py "<name>"` (Wikimedia Commons: public domain / CC0 / CC BY / CC BY-SA only), check the file page really shows that person, save under `brand/photos/<slug>/` with `credits.json`, and credit in the footnote or description ("Photo: <author>, <license>, via Wikimedia Commons"). Never an AI-generated or look-alike picture of a real person; never a copyrighted press photo. No licensed photo → silhouette card labelled ILLUSTRATION. This REPLACES the old "silhouette only / no real photos" habit. Real logos are still out.
- (same) **Stock / generated imagery:** where a real-world object or place makes a beat land harder (a wine cellar, a lottery terminal, a courthouse), use a licensed stock image (Wikimedia Commons via photos.py, or Canva: `mcp__Canva__generate-image` / Canva designs exported as PNG) inside a paper "photo" card in the v2 look. Keep the brand lock: photos sit in paper frames on the stage; they never replace the storyteller, pills, fonts or colours. Label AI-generated generic imagery ILLUSTRATION.
- (2026-11-25, "just set it to the first frame or the last frame… I'll set it myself") Shorts: no designed covers; the owner sets covers himself. Long-form thumbnails: v2 look with real photos of the people when licensed ones exist.
- (2026-11-25, "only add stock where a clean free photo exists, with no watermarks. Don't do any watermarks on our videos") Stock images: only clean, free, licensed photos (Wikimedia Commons PD/CC) with NO watermark, no stock-site overlay, no visible logo. No Canva AI stock for now. If nothing clean exists, add nothing. Never put any watermark on our videos.
- (2026-11-25, "find free stock image options so you are not so limited… install them") Stock search tool: `brand/tools/stock.py` (Openverse + Library of Congress + Wikimedia Commons, no API keys). Same rules: free license, no watermark, no logos, credit CC BY in the footnote.
- (2026-11-25, "there isn't any pauses on the emphasized moments… after a big number give it a little pause… the words feel chopped up and put together instead of actually a sentence") **Flow + breathing room:** (1) After every big number or verdict (millions, percent, years in prison) leave a beat: line pause ≥ 0.5 s or end the line with `[beat]` (0.7 s silence in humanize.py) so the viewer feels it. (2) Write real spoken sentences, not telegraph fragments: "And the jury? They found him guilty on all fourteen counts, and he got two hundred months in prison." — not "Guilty. Fourteen counts. Two hundred months." Max 25% of sentences may be ≤ 3 words, never three fragments in a row. script_gate.py enforces both (CHOPPY, NO BEAT).
