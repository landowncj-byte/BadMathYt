# Visual system v2 — research: what makes motion graphics satisfying

Compiled 2026-11-25 for the owner's brief: *"pull the graphics closer, show the numbers, zoom in on the important parts, let the avatar walk in front and step back, a flowing experience, get away from the flat neon glow, extremely satisfying to look at."*

**How reliable is this file?** Sections 1–8 are craft rules that are stable and widely documented (animation principles, platform motion guidelines, perception research). Section 9 (what top Shorts do) is built from published descriptions of those channels and from our own `research/2026-11-25/competitors.md`; I did **not** watch reference videos frame by frame for this pass (`brand/tools/watch.sh` is there for that). Pacing/retention numbers quoted from vendor blogs are marked as rules of thumb, not data. Sources are listed at the end. Every rule here is implemented or named in `brand/engine-v2/` and specified in `brand/VISUAL-V2.md`.

---

## 1. Easing and physics — "never linear"

Why it works: the eye reads constant-velocity motion as mechanical, because nothing with mass starts or stops instantly. Easing is the cheapest way to make a flat shape feel like an object.

| Rule | Codeable value (engine name) |
|---|---|
| Things that **enter** decelerate into place | `cubic-bezier(0.16, 1, 0.3, 1)`, 0.3–0.5 s (`ease.out`) |
| Things that **leave** accelerate away | `cubic-bezier(0.7, 0, 0.84, 0)`, 0.2–0.3 s (`ease.in`) |
| Things that **move and stay** ease both ends | `cubic-bezier(0.65, 0, 0.35, 1)` (`ease.inOut`) |
| Linear is for continuous loops only | spinners, tickers — nothing else |
| **Springs** for anything with weight: overshoot once, then settle | damped spring, frequency 2.6 Hz, damping ratio 0.62 → ~8 % overshoot, settled in ~0.45 s (`spring(t,'snappy')`) |
| Heavier = slower and less bounce; lighter = faster and more | card: 1.3 Hz / 0.9 · coin: 3.0 Hz / 0.4 (`'heavy'`, `'bouncy'`) |
| **Anticipation**: a small counter-move before the action | 60–160 ms, 5–7 % squash or a dip back (`ease.antic`, storyteller crouch) |
| **Follow-through / overlap**: attached parts stop later than the body | 40–80 ms later (head lags the body lean; labels settle after bars) |
| **Squash and stretch** on impact, volume preserved | scale (1+s, 1−s), s ≈ 0.06–0.09, decays in ~0.3 s |
| **Secondary motion**: shadow grows as an object lifts; ticks fly off a landing | shadow blur +60 px and offset +34 px at full lift |
| **Stagger** groups, never reveal at once | 40–80 ms per item, total capped at ~0.7 s (`stagger`) |
| Duration scales with distance and size | micro 0.1–0.2 s · element 0.3–0.5 s · hero 0.4–0.8 s · camera 0.6–1.2 s |
| No more than ~1/3 of the elements move at once | one hero move, the rest hold or drift |

Springs are evaluated **analytically** (closed-form damped oscillator), so they stay deterministic for `render(t)`.

## 2. Camera language

Why it works: a moving camera turns a flat board into a place. A push-in tells the viewer "this is the thing", a pull-back says "now here is what it means", and parallax gives the brain the depth cue it uses in the real world (near things move faster than far things).

- **Push-in on the key number, exactly as it is spoken.** Start the move ~0.2 s *before* the word so the camera *lands* on it; most of the travel should happen in the first third (`ease.push` = `cubic-bezier(0.22, 1, 0.36, 1)`), then a long soft settle.
- **Pull back to reveal context** right after (0.8–1.2 s, `ease.glide`). Push → hold → pull is the basic sentence.
- **"The camera flies into the number":** zoom so the number fills 60–90 % of the frame width, with 0.5–1° of roll. Zoom is interpolated in **log space** (equal ratios per unit time), otherwise zooms feel like they speed up at the end.
- **Long travels arc:** when the camera crosses a long distance it should dip the zoom out mid-flight (up to ~30 %) and come back in, so it reads as a flight rather than a slide (the idea behind van Wijk & Nuij's smooth zoom-and-pan).
- **Depth of field / rack focus:** blur what is not the subject (5–8 px at 1080 wide) and tint it slightly toward the background. Moving the blur from the graphic to the presenter and back *is* the rack focus.
- **Parallax layers:** background 0.3×, mid-far texture 0.55×, subject 1×, foreground 1.4×. The far texture (a dot grid) matters most: without something to slide past, a camera move over a dark field is invisible.
- **Whip between places** in 0.45–0.5 s with motion blur (sub-frame accumulation, shutter ≈ 0.75 of a frame) and a whoosh; never cut on rest.
- **Match cuts / hand-offs:** end a shot on the shape or position the next one starts with; with one continuous world and a travelling camera, every transition is a hand-off for free.
- **No dead frame:** while holding, keep a slow push (~1.2 %/s) and a 3–5 px float.
- **Camera shake is a spice:** 10–18 px, exponential decay in ~0.4 s, only on the 2–3 biggest hits.

## 3. Satisfying data-viz

Why it works: charts are satisfying when they behave like physical things being filled, stacked or settled, and when the number and the picture finish at the same instant.

- **Bars grow from a baseline with a spring** (1.7 Hz, damping 0.5) and their value label rides on top, counting.
- **Numbers roll like an odometer** with **tabular digits** (fixed cell width, so the number never jitters sideways); ease-out-expo progress so the big digits land softly; digits turning faster than ~14/s should smear instead of strobe.
- **The landing is the payoff:** on the final value → 13 % scale overshoot, a tick burst, an underline that draws in 0.35 s, and the sound hit, all on the same frame.
- **Fills and sweeps:** pie/donut slices sweep in with a spring, one after another, biggest first.
- **Stacks:** a growing stack of bills (one bill per dollar, dropped 40–50 ms apart with a tiny random offset and rotation) is the most "oddly satisfying" finance visual: repetition, rhythm, a clear end.
- **Honest scale is a visual event:** if one bar is 850× the other, keep it to scale and let the camera do the work (push in to see the sliver, then ride the tall one up).
- **Morph, don't swap:** the receipt's number becomes the formula's number; a counter becomes a bar. Keep one object alive across beats.
- **One chart, one message**, labels on the marks instead of a legend, round numbers for claims and exact numbers for data.
- **Perfect loop:** the last frame should be able to cut to frame 0 (wide shot → back into the first object).

## 4. Color — away from neon

Why neon glow reads as cheap: glow removes edges, flattens depth (everything emits, nothing is lit) and pushes saturated colour against black, which vibrates. What reads as rich is the opposite: **objects that are lit**, with soft shadows, a slightly lifted background, and saturated colour used as pigment on a surface.

- **Limit hues:** 1 base + 1 series accent + 2 semantic colours (gain/loss) + neutrals.
- **Lift the black.** Shadows cannot exist on pure black, so the stage must be a dark mid-tone with a light pool (we keep brand Ink `#0B0F14` at the edges and lift the lit centre to `#2A3647`).
- **Depth from light, not glow:** every object gets a two-part shadow (tight contact shadow + wide ambient shadow), a top-left highlight and a darker bottom edge ("clay"). Raising an object toward the camera = bigger, softer, longer shadow.
- **Tint the neutrals** toward the scene hue; pure grey next to colour looks dead.
- **Contrast marks the focal point:** the brightest, most saturated thing in the frame should be the thing being talked about. Everything else is dimmed, blurred or smaller.
- **Texture:** a 3–5 % static paper grain kills gradient banding and makes flat fills feel like material.
- **Mix colours in a perceptual/gamma-aware space** so gradients do not go muddy in the middle.
- **Brand colours on paper:** very bright greens/yellows lose contrast on white paper; print-style darker variants are used for text on paper, the exact brand hues stay for anything on the dark stage.

## 5. Composition

- **One focal point per frame.** If two things matter, one is ≥ 2× the other or the camera moves between them.
- **Thirds:** presenter on one third, graphic on the other two (side-by-side), or the subject on the upper-middle with captions on the lower third.
- **Negative space** is what makes the hero number feel big; do not fill it.
- **Lower third belongs to captions**, screen-fixed; the stage centre sits above it (y ≈ 740 of 1920).
- **Safe zones** for TikTok/Reels/Shorts UI: keep key content out of the top ~220 px, the bottom ~380 px and the right ~140 px of the lower half (exact overlays change; these margins cover all three).
- **Scale is spent once:** most type is modest; the hero number is 3–4× bigger, one time.

## 6. Pacing

- **Something changes every 1.5–3 s** (a camera move, a reveal, a presenter move). Vendor analyses of Shorts cluster around a change every 2–4 s; treat as a rule of thumb.
- **Hold before the payoff:** 0.3–0.6 s of relative stillness (and a dip in the sound) before the biggest number lands.
- **Speech sets the clock:** the narration decides every time; visuals land 0–2 frames *before* the word, never after.
- Frame 0 is already a complete, readable picture (no fade-in).

## 7. "Oddly satisfying" principles

No peer-reviewed study defines the genre; journalists and psychologists explain it with related findings (a "just right" feeling of completion, processing fluency for symmetry and pattern, predictability with small variation). Used here as design heuristics:

1. **Completion** — every motion finishes cleanly: the bar reaches its line, the counter lands on the exact value, the stamp sits flat.
2. **Precision** — things land exactly on grid, on baseline, on the beat; tabular digits; no jitter.
3. **Symmetry and order** — even spacing, repeated modules (bills, coins, rows).
4. **Rhythm** — repeated drops at a steady interval, locked to the audio.
5. **Predictability with a small surprise** — the viewer can see where it is going, and the landing has a little extra (overshoot, tick burst).
6. **Material response** — squash, a shadow that moves, a tiny bounce: the object "answers".
7. **Sound and picture on the same frame** — a hit a frame late is worse than no hit.

## 8. Typography in motion

- Words appear at **speech rhythm** (whole words, 2–12 frames apart), never letter-by-letter except real typing.
- Karaoke-style captions: the spoken word pops (7 % spring) and takes the accent colour; upcoming words are dimmer.
- Captions are **screen-fixed** and never ride the camera.
- Type inside the world is vector-drawn so it stays crisp at any zoom; minimum on-screen size for anything meant to be read is ~4 % of frame height.
- Big numbers: Anton, tabular cells; math: JetBrains Mono; labels/captions: Inter 800.

## 9. Patterns from top explainer / finance creators (patterns only, nothing copied)

| Creator / format | Pattern worth using |
|---|---|
| **Kurzgesagt** | Flat shapes made deep with layered parallax, soft gradients and a camera that is almost always moving; narration fixes the timing and animation follows it. |
| **Vox / Johnny Harris–style explainers** | Paper, documents and maps as physical objects on a desk; the camera pushes into a highlighted line; marker-highlight instead of glow. |
| **3Blue1Brown** | One object transforms continuously instead of cutting; the camera follows the quantity that matters. |
| **Humphrey Yang** | Physical-scale props (rice grains, stacks) make a number felt; our cash stack and to-scale bars are the animated version. |
| **Zack D. Films** | One mechanism, one visceral visual, ~30 s; the camera goes *inside* the thing. |
| **Coffeezilla / fern** | Evidence board and reconstructed documents for cases; fits Decoded's document-reveal and timeline recipes. |
| Faceless Shorts in general | Big word-by-word captions in the lower third, a visual change every few seconds, and a punch-in on each key number. |

The gap for Bad Math: almost nobody in the faceless finance niche has a **presenter character that actually moves through the scene** with a real camera. That is the differentiator v2 is built around.

## 10. Top 10 findings (the short list)

1. Easing is the biggest single lever; springs with one small overshoot make objects feel real.
2. The camera should push into each key number as it is said and pull back for context.
3. Depth comes from light, shadow, blur and parallax — not from glow.
4. Lift the black: a dark mid-tone stage with a light pool lets shadows exist.
5. One focal point per frame; contrast, sharpness and size all point at it.
6. Satisfying = completion + precision + rhythm; the number, the motion and the sound finish on the same frame.
7. Numbers roll with tabular digits and land with an overshoot.
8. To-scale comparisons plus camera moves beat fake-scaled charts.
9. Something changes every 1.5–3 s, with a short hold before the payoff; speech sets every time.
10. The presenter moving between foreground and background is itself a rack focus: it tells the viewer when to listen and when to look.

## Sources

- F. Thomas & O. Johnston, *The Illusion of Life: Disney Animation* (1981) — the 12 principles (squash/stretch, anticipation, follow-through, slow in/out, arcs, secondary action, timing).
- Material Design, motion guidelines (easing and duration): https://m3.material.io/styles/motion/easing-and-duration
- Apple, "Animate with springs" (WWDC 2023): https://developer.apple.com/videos/play/wwdc2023/10158/
- J. J. van Wijk & W. A. A. Nuij, "Smooth and efficient zooming and panning" (IEEE InfoVis 2003).
- E. Tufte, *The Visual Display of Quantitative Information* (data-ink, honest scale).
- R. Reber, N. Schwarz, P. Winkielman, "Processing fluency and aesthetic pleasure" (Personality and Social Psychology Review, 2004).
- Kurzgesagt, "Our video process": https://kurzgesagt.org/youtube/ · https://en.wikipedia.org/wiki/Kurzgesagt
- "Oddly satisfying" explanations: https://www.livescience.com/62091-oddlysatisfying-videos-satisfying.html · https://www.discovermagazine.com/mind/why-are-oddly-satisfying-videos-sosatisfying · https://en.wikipedia.org/wiki/Oddly_satisfying_videos
- Shorts pacing/captions/safe-zone rules of thumb (vendor blogs, not platform data): https://www.opus.pro/blog/ideal-youtube-shorts-length-format-retention · https://www.opus.pro/blog/best-caption-presets-styles-boost-retention · https://aibrify.com/en/blog/youtube-shorts-retention-curve-playbook
- Adobe, gradients in motion design: https://blog.adobe.com/en/publish/2021/08/17/gradients-in-motion-design-offer-range-of-possibilities-match-our-current-emotional-spectrum
- Our own niche study: `research/2026-11-25/competitors.md`.
- Craft references loaded in this session: the `animation-principles`, `motionmaxxing`, `color-motion` and `video-shotcraft` skills (durations, curves, "no dead frame", "land decelerates, leave accelerates", one hero per frame).
