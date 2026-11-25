# VISUAL-V2 — the Bad Math visual system, version 2

**Status:** replaces the neon look for all NEW videos from 2026-11-25. Engine: `brand/engine-v2/` (how to build: `brand/engine-v2/README.md`). Research behind every rule: `research/visual-v2/research.md`. Proof: `research/visual-v2/prototype/video.mp4`.

**The owner's brief:** the avatar should stop standing in one spot and pointing. The graphics he talks about come toward the screen, show the numbers and focus on the moving parts, with zooms on what matters. He walks in front and talks, then lets the graphic come back in front of him. Flowing, eye-catching, satisfying; no flat background glowing neon.

**The idea in one line:** *one continuous world, a real camera, and a presenter who moves through it.* Graphics are lit paper-and-clay objects on a dark Ink stage; the camera flies into each number as it is spoken.

---

## 0. Brand lock (strict — the owner's words: "evolve the look, don't rebrand it")

A viewer of today's videos must instantly recognise a v2 video as the same channel.

**Does NOT change**
- **The storyteller is the same character:** gold coin head (ridged edge, inner rim, `#F2B705` → `#ffe27a` gradient), big white eyes, brown brows `#5a3f08`, rosy cheeks, small mouth, navy suit `#2c3e66` with `#6f86b8` edge, white shirt V, red bowtie `#FF3B30`, same proportions, same expressions and poses (idle, point, chin, shock, shrug, you, wave, follow). `brand/engine-v2/storyteller-v2.js` copies the v1 geometry and colours one-for-one. Never redraw, recolour or restyle him.
- **Profile pictures** `brand/pfp-ink.png` and `brand/pfp-red.png`: untouched.
- **Series identity:** the red **DECODED** pill (`#FF3B30`, Paper text) and the yellow **WHAT IF** pill (`#FFD60A`, Ink text), top-left at (90, 238), with the mono title beside it — drawn by the engine exactly as in v1.
- **Type:** Anton (hooks, hero numbers, wordmark), Inter 800 (captions, labels), JetBrains Mono (math, counters, footnotes).
- **The "BAD MATH" wordmark:** Anton, uppercase, Paper White.
- **Brand colours:** Ink `#0B0F14`, Paper White `#F5F3EE`, Money Green `#00D26A`, Highlighter `#FFD60A`, Loss Red `#FF3B30`, Gold `#F2B705`.
- **Captions:** white Inter 800 uppercase with the thick dark outline, key words in the series/meaning colour.
- The comment bubble and the red +FOLLOW → ✓ FOLLOWING button, the footnote line, the safe zones, every STYLE.md honesty rule.

**What changes (and only this)**
1. The **neon glow** goes: no outer glows on text or shapes, no glowing radial rays, no chromatic glitch as a background.
2. **Flat staging** gives way to a camera, depth layers and choreography.
3. **Motion** becomes springy, physical and locked to the words.
4. His **motion and rendering quality** improve (travel, scale, layers, lean, blended poses, soft shading, a contact shadow in place of the yellow rim glow). His design does not.

---

## 1. Palette, background, light and texture

### Shared tokens (both series)
| Token | Hex | Use |
|---|---|---|
| Ink | `#0B0F14` | frame edges, pill text, text on paper |
| Paper | `#F5F3EE` | cards, receipts, documents, text on the stage |
| Paper shade / rule | `#E7E2D6` / `#D8D3C7` | skeleton lines, dashed rules on paper |
| Ink soft | `#59606B` | secondary text on paper |
| Money Green | `#00D26A` | gains, on the dark stage and in captions |
| Loss Red | `#FF3B30` | losses, fees, on the dark stage and in captions |
| Highlighter | `#FFD60A` | What If accent, active caption word |
| Gold | `#F2B705` | coins, premium accents |
| Green / Red / Yellow **on paper** | `#00A152` / `#E0281E` / `#B88700` | the same brand hues, darkened one step so they keep contrast as "printed ink" on Paper |
| Suit navy | `#2c3e66` | document header bands, cards that belong to "the bank" |
| Cash green | `#1FA366` with a Paper band | bills |
| Shadow | `#020409` | all drop shadows (alpha 0.34–0.44) |

Tone names in scene files: `good`, `bad`, `accent`, `ink`, `paper`, `gold`, `navy`, `soft`. The engine picks the on-paper or on-stage variant automatically.

### What If — "Ink studio, cool"
- **Stage:** radial light pool from the top-left (centre 330, 430): `#2A3647` → `#161E2A` → `#0B0F14` at the edges. Brand Ink is still the frame; the lit centre is lifted so shadows can exist.
- **Far colour fields (parallax 0.3):** large soft radial shapes, deep teal `#1F5F6A` (α 0.62), warm amber-brown `#6A4A1E` (α 0.5), deep blue `#2A4278` (α 0.6).
- **Accent:** Highlighter `#FFD60A`. Motes: warm `#FFE9C2`.

### Decoded — "Lamp desk, warm"
- **Stage:** light pool from (300, 380): `#33292B` → `#1B1719` → `#0B0F14`.
- **Far colour fields:** oxblood `#6A221C` (α 0.6), manila-brown `#57431F` (α 0.5), slate `#1E2A3C` (α 0.55).
- **Accent:** Loss Red `#FF3B30`. Extra surface: manila `#E2C48D` for folders. Motes: `#FFD9B0`.

### Layers (back to front)
| Layer | Parallax | Content |
|---|---|---|
| Stage light | fixed | the radial gradient above |
| Far | 0.3 | soft colour fields |
| Mid-far | 0.55 | ledger dot grid (dots every 96 px, α 0.075; every 4th is larger) — the motion cue that makes camera travel visible |
| (Storyteller, when `back`) | screen | behind the graphic |
| **Mid** | 1.0 | all graphics |
| (Storyteller, when `front`) | screen | in front of the graphic |
| Foreground | 1.4 | a few soft out-of-focus motes (α ≤ 0.085) |
| Vignette | fixed | radial, 0 → 50 % black at the corners |
| Screen UI | fixed | bubble, follow button, wordmark, pill, captions, footnote |
| Grain | fixed | static paper tooth, multiply, over everything |

### Surfaces, shadows, lighting
- **Light comes from the top-left.** Every surface gets a top-left highlight and a darker bottom-right.
- **Paper** (`BM2.paper`): Paper fill, two shadows, diagonal light gradient (white 22 % → transparent → warm dark 10 %), 1.5 px white inner edge at 55 %, grain.
- **Clay** (`BM2.clay`): solid brand colour, top highlight (white 26 %), bottom shade (black 20 %), slight left-to-right falloff. For bars, pills, dots, buttons.
- **Two-part shadow** (`BM2.shadowed`), scaled by the live zoom: contact = blur 7, offset (1.5, 4), α 0.42; ambient = blur 34, offset (8, 18), α 0.34.
- **Lift** (an object coming toward the camera, 0→1): scale +4.5 %, rise 10 px, ambient shadow grows to blur 94 / offset (22, 52) / α 0.44.
- **Emphasis without glow:** marker swipe behind a value (tone at 22–30 % alpha, wipes left→right in 0.3 s), an underline that draws, a tick burst, a spring pop.
- **Never:** `shadowBlur` used as a coloured glow, additive blending, glowing text, RGB-split, scanlines.

---

## 2. Camera system

A virtual camera with **x, y** (the world point it looks at), **zoom**, **rotation**, and the **screen point (sx, sy)** that world point lands on. Default landing point = the stage centre **(540, 740)**, above the captions.

- **One world.** A video is 2–4 "stations" (a receipt, a document, a chart…) placed ~1,500–1,800 world px apart. The camera travels between them; there are no hard cuts inside a Short.
- **Scripts declare moves on words.** Each beat has `at: '@word'`; the camera starts `lead` seconds earlier (0.2 s, whips 0.3 s) so it **lands on the word**.
- **Framing by intent:** `focus` (an element, an anchor inside it such as `receipt.fee`, or a list) + `fill` (share of the 1080 width the focus takes). The engine computes x, y and zoom.

| Move | Use | Duration / curve | Notes |
|---|---|---|---|
| **Push-in** (`zoom-on-number`) | the key number, as it is said | 0.6 s, `cubic-bezier(0.22, 1, 0.36, 1)` | focus fills 62–94 %; 0.5–0.8° roll; everything else blurs 8 px and dims 35 % |
| **Slide while pushed** | next number on the same object | 0.5 s | flip the roll sign for a rocking feel |
| **Pull-back** | reveal context after a push | 1.0 s, `cubic-bezier(0.45, 0, 0.15, 1)` | fill ~0.8 |
| **Glide** | reframe within a station | 0.85–0.9 s, same curve | |
| **Whip** (`move: 'whip'`) | travel to the next station | 0.5 s, ease-in-out, 12 % zoom dip | automatic motion blur + whoosh |
| **Wide** | everything at once (endings, recap, loop point) | 1.1–1.2 s | fill 0.9 of all stations |
| **Hold** | while he talks | — | never frozen: +1.2 %/s slow push, 4–5 px float, ±0.13° roll |
| **Shake** | the 2–3 biggest hits only | 0.4 s decay | 10–18 px |

- Zoom interpolates in log space; travels longer than ~1,500 screen px dip the zoom up to 30 % mid-flight.
- **Depth of field** is per element: the focused element is sharp and lifted; others take the beat's blur and dim. Blur and dim ease over the move, so every beat change is a rack focus.
- **Motion blur** is automatic above ~34 px/frame of camera travel (3–14 sub-frame exposures, 0.75-frame shutter).
- **Rule of three pushes:** a 25–30 s Short has at least three push-ins on spoken numbers, each followed by a wider frame.

---

## 3. Storyteller choreography

He lives in **screen space** (he presents to the viewer; the world moves behind or in front of him), with a position, a scale and a **depth layer**: `front` (drawn over the graphics, crisp) or `back` (drawn behind them, so a graphic can cover him).

**Spots** (feet x, y · scale · layer). Feet stay at y ≈ 1330 so captions sit under them.

| Spot | Where | Scale | Layer |
|---|---|---|---|
| `front` | centre (540, 1330) | 1.8 | front |
| `left` / `right` | (215 / 818, 1330) | 1.4 | front |
| `corner` / `corner-left` | (852 / 200, 1330) | 0.95 | front |
| `peek` | behind the focused graphic, head and shoulders over its top edge (computed) | 1.15 | **back** |
| `shoulder` | (205, 1800), cropped, blurred 5 px, dimmed | 2.7 | front |
| `off` / `off-left` | outside the frame | 1.0 | front |
| custom | `{x, y, s, layer}` | any | any |

**How he moves:** 0.75 s per move, eased; a crouch (7 % squash, 0.16 s) before he goes, 1–3 hops depending on distance, a lean into the direction of travel, the head trailing the body, a squash-and-settle on landing; scale changes in log space; the layer switches at the midpoint of the move. He also leans against fast camera travel, as if carried by it. Poses blend with a spring (~0.34 s) instead of snapping; `point` aims the arm on the correct side at the actual screen position of the thing he references, and his eyes follow it.

### The beats (reusable choreography)

| Beat | Camera | Storyteller | Graphic | Use it when |
|---|---|---|---|---|
| **`side-by-side`** | focus fills ~60 %, shifted to x≈690 | `left` (or `right`), pointing at it | sharp, lifted | introducing a graphic; frame 0 |
| **`graphic-hero`** | focus fills ~80 % | steps aside to `corner`, pointing | sharp, lifted toward camera | the graphic is the star |
| **`zoom-on-number`** | push-in, 0.6 s, slight roll | `corner`, small, pointing at the number | the number pops; rest blurs | **every key number as it is spoken** |
| **`pull-back`** | back out to the whole object | `corner`, relaxed | all sharp | right after a push |
| **`presenter-front`** | eases back 10 % | walks to `front`, big, talking | blurs 7 px, dims 38 % (`keep` exempts one) | hooks, opinions, questions, CTAs |
| **`peek`** | focus fills ~80 %, placed low (`sy: 880`) | goes **behind** the graphic, peeks over the top | in front of him | "the graphic comes back in front of him" |
| **`over-shoulder`** | focus at ~78 %, shifted right | huge, soft, bottom-left foreground, looking at it | sharp | watching something unfold together |
| **`wide`** | all stations | anywhere | all sharp, tiny | recap, final frame / loop point |

**Transitions between beats** are implicit: the camera, his position/scale/layer and every element's blur/dim/lift ease from wherever they are to the new beat's values. A good sentence: `side-by-side` → `zoom-on-number` → `presenter-front` → whip `peek` → `zoom-on-number` → `pull-back` → whip `side-by-side` → `zoom-on-number` → `graphic-hero` → `presenter-front` → `wide`.

**Rules**
- He switches between front and back **at least twice** per Short, and changes spot at least every ~4 s.
- He is `front` and large only while what he says matters more than the picture; the moment a number is spoken, the camera goes to the number and he gets out of the way.
- He never covers the focused number.
- Comment bubble after the payoff, +FOLLOW tap in the last ~2 s (unchanged from CHARACTER.md).

---

## 4. Motion primitives

All in `brand/engine-v2/primitives.js`; all pure functions of time.

| Primitive | Definition | Use |
|---|---|---|
| `ease.out` | cubic-bezier(0.16, 1, 0.3, 1) | entrances |
| `ease.in` | cubic-bezier(0.7, 0, 0.84, 0) | exits (0.28 s: fade, shrink 10 %, drop 50 px) |
| `ease.inOut` | cubic-bezier(0.65, 0, 0.35, 1) | on-screen repositioning, whips |
| `ease.glide` | cubic-bezier(0.45, 0, 0.15, 1) | camera travel, storyteller travel |
| `ease.push` | cubic-bezier(0.22, 1, 0.36, 1) | camera push-ins |
| `ease.pop` | cubic-bezier(0.34, 1.56, 0.64, 1) | small overshoot pops |
| `ease.antic` | cubic-bezier(0.5, −0.35, 0.2, 1) | anticipation (dips back first) |
| `ease.expo` | 1 − 2^(−10u) | counters |
| `spring(t, preset)` | analytic damped spring 0→1 | `snappy` 2.6 Hz/0.62 (default) · `soft` 1.7/0.8 · `bouncy` 3.0/0.4 · `heavy` 1.3/0.9 · `stiff` 4.2/0.7 |
| **Overshoot** | spring with damping < 1 | pops, landings (+13 % on counters, +25 % on bar labels) |
| `stagger(lt, i, n, per, cap)` | 40–80 ms per item, total ≤ 0.7 s | rows, words, skeleton lines |
| **Number roll** `roll()` | odometer, tabular digit cells; digits faster than 14/s smear | every counter |
| **Bar grow** | spring 1.7 Hz / 0.5 from the baseline; label rides the top | `bars` |
| **Morph** | one object persists across beats (a row becomes a formula term, a value becomes a bar label); values interpolate, shapes spring | between recipes |
| **Focus pull** | per-element blur 0–8 px + dim toward the stage colour, eased over the beat | every beat change |
| **Parallax** | layers at 0.3 / 0.55 / 1 / 1.4 | always on |
| **Smear / motion blur** | sub-frame accumulation on fast camera moves | whips, fast zooms |
| `hit(t)`, `wobble(t)` | exponential decay, decaying sine | squash, shake, button press |
| `marker()`, `burst()` | highlighter wipe; radiating ticks | emphasis without glow |
| **Sound-synced hits** | `sfx: [{at: '@word', name}]` in the scene; the mixer reads the same resolved times as the picture | every reveal |

Element entrances: `pop` (scale from 55 %, snappy spring), `rise` (140 px up, soft spring), `drop` (falls 520 px, bounces), `slam` (2.6× → 1× in 0.22 s, then a wobble), or the recipe's own (receipt prints, document rises and straightens).

---

## 5. Chart and graphic recipes (v2 style)

Element `type`s in `brand/engine-v2/charts.js`. Full props in the README.

| Recipe | What it looks like | Satisfying part |
|---|---|---|
| **`counter`** | Anton number on a paper card (or bare on the stage), label above, sub-line below | odometer roll → +13 % overshoot → underline draws → tick burst → hit sound, on one frame |
| **`bars`** | clay bars on a baseline, value riding on top; `style: 'cash'` builds the bar from stacked bills | spring growth; true scale + camera (push into the sliver, ride the tall one up) |
| **`barRace`** | horizontal ranked clay bars, values rolling | rows swap places smoothly as values cross |
| **`cashStack`** | bills dropping one by one, total rolling above | steady rhythm, each bill bounces, clean final number |
| **`coins`** | gold coins dropping into a flat stack | bouncy spring, coin sound per drop |
| **`pie`** | clay donut filling slice by slice, centre value rolling | each slice sweeps with a spring; labels settle after |
| **`timeline`** | vertical line, dated nodes | the line draws to each node as its date is spoken; node pops with a ring |
| **`map`** | dark board, dotted grid, places as clay dots, arcs between them | arcs draw with a travelling head; nodes ping |
| **`doc`** | paper document: navy header band, skeleton lines, typed formula lines, hero counter | page rises and straightens; lines write in; marker swipe on the formula |
| **`receipt`** | printed slip from a printer slot, zig-zag edge | prints out; each row lights up (marker + pop) as its value is spoken |
| **`stamp`** | Anton text in a ruled box on paper | slams from 2.6×, wobbles, tick burst, stamp sound |
| **`card`** | generic paper/navy card with text lines | lines rise in on cue, optional marker |
| **`text`** | Anton headline straight on the stage | words rise in on a 70 ms stagger |
| **`bubble`**, **`follow`** | the storyteller's comment bubble and follow button (v1 design) | pop; press, ripple, tick |

**Chart rules:** one message per chart; labels on the marks; real scale; Green = good/money, Red = cost/loss, Gold/Yellow = neutral highlight; every number from the script's number spine.

---

## 6. Captions and safe zones

- **Captions are screen-fixed.** They are drawn after the camera, the storyteller and the vignette, and never move, scale or blur with the world.
- Style (brand-locked): Inter 800, uppercase, 66 px, Paper White, 15 px dark outline, centred at **x 540, y 1432**, max width 800, ≤ 3 words / ~15 characters per chunk, built automatically from `words.json`.
- The word being spoken pops (7 % spring) and takes the series accent; words not yet spoken sit at 62 % opacity; `emph` colours chosen words Green/Red/accent.
- Nothing in the world needs to stay clear of the caption band: the outline keeps captions readable over paper, cash or dark stage. Avoid parking a *key number* under them.
- **Safe zones (1080×1920), all platforms:**
  - top 220 px: nothing important (the series pill sits at y 238–290);
  - bottom: nothing important below y ≈ 1540 (captions end ~1480, footnote at 1500–1525);
  - right rail: nothing important right of x ≈ 940 for y > 960 (like/comment/share buttons);
  - the stage for graphics is roughly x 60–1020, y 300–1250; the focus lands at (540, 740).
- Storyteller spots are pre-set inside these zones. Screen UI (bubble ≈ (560, 650), follow button ≈ (650, 1120), wordmark ≈ (540, 440)) is placed by the scene.
- Footnote (assumptions/source, STYLE.md §8): JetBrains Mono 17 px at (90, 1500), two lines max.

---

## 7. Checklist for a v2 Short

- [ ] Frame 0 is a full picture: hook text + the number + him, no fade-in.
- [ ] ≥ 3 push-ins, each landing on a spoken number; each followed by a wider frame.
- [ ] He changes layer (front ↔ back) at least twice and never covers the focused number.
- [ ] A beat (camera or presenter change) every 1.5–3 s; no shot static longer than 3 s.
- [ ] One satisfying chart beat (counter landing, stack, bars) with its sound hit on the same frame.
- [ ] No glow anywhere; depth from shadow, blur and parallax only.
- [ ] Brand lock respected (§0). Captions fixed; safe zones clear.
- [ ] Last frame can cut to frame 0.
