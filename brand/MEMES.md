# Meme playbook — Bad Math

Meme **formats** we recreate in our own art style, timed to our own CC0 sounds (`brand/sfx-library/`). Never use copyrighted meme originals: no ripped sound clips (original vine boom, "bruh", JoJo "To Be Continued" music, Windows/Mac system sounds, TV/movie quotes), no meme images or faces (Stonks guy, Drake, "This is fine", Wojak, Pepe, Distracted Boyfriend, celebrities), no brand logos. The storyteller is our meme face.

**Rules:** max 1 meme beat every ~8–10 s in Shorts (2–3 per Short), ~1 per 30–45 s in long-form. A meme must land on a real beat (a reveal, a dumb decision, an impossible number) — never random. Keep it kind: roast behaviors, systems and con artists' tactics, never viewers or victims.

| # | Format | When to use | How we build it | Sound (library category) |
|---|---|---|---|---|
| 1 | **Boom zoom** | The impossible number lands | Hard punch-zoom 1.0→1.25 in 2 frames + slight shake on the number or the storyteller's shocked face | impacts/deep_boom |
| 2 | **Record-scratch freeze** | "But wait…" twist, a narrator correction | Freeze frame, desaturate to 30%, yellow "WAIT." stamp | transitions/record_scratch |
| 3 | **Red circle + arrow** | Point at the tell in a document/chart | Hand-drawn red circle animates around the detail, arrow pops in | ui/pop + impacts/thud |
| 4 | **"Nobody: / Me:" card** | The con's absurd pitch | White text-only meme card in Inter 800 over ink, 1.5 s | ui/click |
| 5 | **Sad trombone** | A plan obviously failing (bank run, margin call) | Storyteller shrug + things droop / slide down | comedy/sad_trombone |
| 6 | **Crickets** | "And regulators did… nothing." | Empty frame, a tumbleweed (our drawing) rolls by, 1.2 s silence + crickets | comedy/crickets |
| 7 | **Airhorn / celebration** | An absurd win in a What If | Confetti burst, storyteller arms up, number pops | comedy/airhorn |
| 8 | **Visible confusion** | A nonsense claim | Storyteller tilts head, a "?" floats up, italic caption "*visible confusion*" | ui/pop |
| 9 | **Slow-mo dramatic zoom** | Before the reveal (silence beat) | Slow 3 s zoom on the storyteller's eyes, vignette closes in | tension/heartbeat or riser |
| 10 | **"Narrator: they were not fine"** | Undercut overconfidence | Caption card in the dry narrator voice, Special Elite type | ui/typewriter |
| 11 | **Fake loading bar** | "Calculating…" before a math reveal | A progress bar with silly steps ("checking the math… finding the math… there is no math") | ui/click ×3 + ding |
| 12 | **Wrong-answer buzzer** | The viewer's gut answer gets debunked | Big red ✗ over the wrong option | success-fail/error_buzzer |
| 13 | **Ka-ching cut** | Money appears out of thin air | Cash bills rain + register drawer | money/cash_register |
| 14 | **"To be continued" freeze** (our version) | Long-form chapter cliffhanger | Freeze + sepia + our own arrow graphic "NEXT: CHAPTER 2" — no JoJo music, use a CC0 sting | music/dramatic_sting |
| 15 | **POV caption** | Put the viewer in the scam | "POV: you just wired your savings to a guy named Bernie" over the scene | ui/pop |
| 16 | **Side-by-side "expectation vs reality"** | Promise vs math | Split screen, left glossy, right cracked | transitions/whoosh + impacts/thud |
| 17 | **Rimshot** | A dry one-liner punchline | Storyteller wink / eyebrow raise | comedy/rimshot |
| 18 | **Glitch "error"** | Something that can't exist | Screen glitch + "ERROR: NUMBER DOES NOT EXIST" dialog in our UI style (not Windows) | tension/glitch |

**Storyteller meme poses to add to `brand/storyteller.js` when a build needs them:** head-tilt (confused), facepalm, wink, eye-roll, slow blink (deadpan), sweating (nervous laugh), sunglasses-on (cool reveal). Add as new poses in the shared module so every video gets the same ones.

**Directing note:** in each `DIRECTION.md`, mark meme beats explicitly, e.g. `P15 "twenty-seven" → MEME #1 boom zoom (impacts/deep_boom_1)`.
