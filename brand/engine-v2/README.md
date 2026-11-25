# Bad Math engine v2 — how to build a Short

One shared engine for every new video. You write **one data file** (`scene.js`): the graphics, placed in a single continuous world, and a list of **beats** that move the camera and the storyteller on spoken words. The engine does the easing, springs, depth of field, parallax, motion blur, captions and lip-sync. Look and rules: `brand/VISUAL-V2.md`. Working example: `research/visual-v2/prototype/scene/scene.js` (→ `research/visual-v2/prototype/video.mp4`).

Deterministic: `window.render(t)` draws the frame for time `t` on a 1080×1920 canvas; Playwright captures it; ffmpeg encodes. Never run `playwright install`.

## Quick start (copy-paste)

```bash
cd /home/user/badmathyt
V=videos/<date>-<slug>/<cut>            # e.g. videos/2026-11-26-tipton/tiktok  (voice/ must already hold narration.wav, words.json, mouth.json)
E=brand/engine-v2

node $E/bm2.cjs init   $V/build --voice $V/voice --series whatif     # or decoded. Creates scene.html, scene.js (starter), voice.js
#   ... edit $V/build/scene.js ...
node $E/bm2.cjs check  $V/build                  # compiles; prints beats, captions and sfx with resolved times; clear errors
node $E/bm2.cjs stills $V/build 0,1.2,5,10.4     # PNG stills -> $V/build/stills  (LOOK at them)
node $E/bm2.cjs render $V/build --parts 2        # -> $V/build/video_noaudio.mp4 + sfx.json   (~1.5 min for 25 s; max 2 parts)
python3 $E/mix.py $V/build $V/voice $V/video.mp4 # voice -16 LUFS, bed -24 ducked, master -14 LUFS / <= -1 dBTP
node $E/bm2.cjs sheet  $V/video.mp4 $V/contact_sheet.png 6 4
```

After a re-voice: `node $E/bm2.cjs voice $V/build $V/voice`, then `check` again (word times moved; `@word` refs follow automatically).

Files in a build folder: `scene.html` (loader, generated), `voice.js` (generated from `words.json` + `mouth.json`), **`scene.js` (the only file you write)**, `sfx.json` + `video_noaudio.mp4` + `parts/` (generated; `parts/*.mp4` is git-ignored).

## The scene format

```js
BM2.scene({
  series: 'whatif',                 // 'whatif' | 'decoded'  -> pill, accent, stage colours
  title: 'OVERDRAFT',               // mono label beside the pill (Decoded: 'CASE: FTX · 2022')
  duration: 25.51,                  // seconds (narration length + small tail)
  footnote: ['line 1', 'line 2'],   // assumptions / source line (STYLE.md §8)
  elements: [ ... ],                // the graphics (below)
  beats:    [ ... ],                // camera + storyteller choreography (below)
  poses:    [[at, pose, {target}]], // extra pose changes between beats (optional)
  shakes:   [[at, px]],             // camera shake on big hits (optional, 2-3 per video)
  captions: { emph: {'$34': 'bad'}, fix: [['a PR.', 'APR.']] },   // or false
  sfx:      [{ at, name, gain, dur, offset }],                    // sounds from brand/sfx-library (by manifest name)
  bed:      { name: 'upbeat_bed_2', gain: -1 },                   // music bed
})
```

Other options: `fps` (30), `pill: false`, `storyteller: false`, `stEnter: seconds` (pop him in instead of being there at frame 0), `autoSfx: false`, `motionBlur: false`, `float: 0` (kill the idle camera float), `theme: {…}` (override theme tokens; do not use to break the brand lock).

### Timing everything to words.json

Every time in a scene (`at`, `in`, `out`, anything inside `props`) is **seconds** or a **word reference**:

| Ref | Meaning |
|---|---|
| `'@$34'` | start of the first spoken "$34" |
| `'@$34#2'` | start of the second "$34" |
| `'@cents>'` | **end** of "cents" |
| `'@math+0.3'`, `'@math-0.2'` | offset in seconds |

Words are matched lower-case with surrounding punctuation stripped (`"$34."` matches `@$34`, `",000"` matches `@000` or `@,000`). Whisper splits numbers ("17", ",000", "%"): pick the piece you want. If a ref is wrong, `check` fails and prints every spoken word so you can pick the right one. **Beats lead automatically:** the camera starts 0.2 s before `at` (0.3 s for whips) so it lands on the word; override with `lead`.

### Elements

```js
{ id: 'receipt', type: 'receipt', at: [0, 70], in: -1, out: '@that\'s', props: { ... } }
```

| Field | Meaning |
|---|---|
| `id` | name used by beats (`focus: 'receipt'` or an anchor `'receipt.fee'`) |
| `type` | recipe (table below) |
| `at: [x, y]` | world position of its centre. Station 1 at `[0, 0]`, next stations ~1,500–1,800 px away (any direction). For `layer: 'screen'`, screen pixels. |
| `in`, `out` | when it enters / leaves. `in: -1` = already there on frame 0. |
| `enter` | `'pop'` (default) · `'rise'` · `'drop'` · `'slam'` (receipt, doc, text have their own) |
| `scale`, `rot` | size multiplier, rotation in radians |
| `layer` | `'mid'` (default, in the world) · `'fg'` (in the world, slightly closer) · `'screen'` (fixed UI over the storyteller) |
| `z` | draw order (default: list order) |
| `sfx` | `'pop_2'` or `{name, gain, dur}` played at `in` |

**Recipes and props** (`tone` = `good` · `bad` · `accent` · `ink` · `paper` · `gold` · `navy` · `soft`):

| type | props | anchors |
|---|---|---|
| `text` | `lines: ['PLAIN', [['$34','bad'],[' TO BORROW','paper']]]`, `size` (120), `font` (`hero`·`cap`·`mono`), `color`, `per` (word stagger) | — |
| `receipt` | `title`, `rows: [{id, k, v, at, tone}]`, `foot`, `w` (560), `rowH` (92). A row lights up at its `at`. | each row `id` |
| `stamp` | `text`, `tone`, `size` (96), `fill`. Use `rot` ≈ ±0.07. | — |
| `counter` | `to`, `from` (0), `at`, `dur` (1.2), `prefix`, `suffix`, `decimals`, `size` (210), `tone`, `label`, `sub`, `card` (true), `w` (760) | `value` |
| `doc` | `title`, `sub`, `skeleton` (grey lines), `lines: [{id, t, at, tone, mark, big}]`, `hero: {label, to, prefix, suffix, at, dur, sub, tone}`, `w` (680), `h` (860), `band` | `head`, each line `id`, `hero` |
| `bars` | `items: [{id, label, sub, value, show, display:{prefix,suffix,decimals}, tone, at, style:'cash', count, dur}]`, `max`, `h` (820), `barW` (200), `gap` (130), `note`. `value` sets the height (true scale); `show` is the number displayed if different (4 for 4¢ when value is 0.04). | each item `id` (whole bar), `id_base` (around the baseline: for slivers), `id_top` (the value label) |
| `barRace` | `items: [{label, tone, values:[…]}]`, `times: [t0, t1, …]` (one per value), `prefix`, `suffix`, `decimals`, `w`, `rowH` | — |
| `cashStack` | `count`, `at`, `per` (0.05 s per bill), `each` (value per bill), `prefix`, `label`, `w`, `bh` | `total` |
| `coins` | `count`, `at`, `per`, `r` | — |
| `pie` | `slices: [{value, tone, label, at}]`, `r` (250), `hole` (0.6), `total`, `center: {to, suffix, at, label}` | `center` |
| `timeline` | `items: [{id, date, label, at, tone}]`, `w` (780), `step` (180) | each item `id` (or `i0`, `i1`…) |
| `map` | `title`, `nodes: [{id, x, y, label, sub, at, tone, r}]` (x, y from 0 to 1), `links: [{from, to, at, tone, dur}]`, `w`, `h` | each node `id` |
| `card` | `w`, `h`, `fill` (`paper`·`navy`…), `pad`, `lines: [{t, size, font, tone, at, mark, gap}]` | — |
| `photo` | `src` (repo-relative `brand/photos/<slug>/n.jpg`, or relative to scene.html), `name`, `role`, `credit` (tiny mono line, e.g. `PHOTO: U.S. DOJ · PUBLIC DOMAIN`), `tag`, `w` (440), `tilt` (rad), `treatment` (`paper` · `polaroid` · `mugshot`), `fx`/`fy` (0..1 focal point of the face for the cover crop), `aspect` (1.12), `tape` (true). Real licensed photo of a real person in a lit paper frame: cover-cropped, soft shadow, Anton name plate, spring-in; images are preloaded before frame 0 and a missing file fails `check` / `stills` / `render`. No photo → use `silh` (ILLUSTRATION). | `face`, `name`, `photo` |
| `bubble` | `l1`, `l2` (red), `size`, `tail` (`left`·`right`) — use `layer: 'screen'` | — |
| `follow` | `press` (seconds after `in`), `labels` — use `layer: 'screen'` | — |

See every recipe rendered: `node brand/engine-v2/bm2.cjs stills brand/engine-v2/examples/gallery 1.9,4.2,6.4,8.6,11.2,13.6,15.5`.

### Beats — camera + storyteller choreography

```js
{ at: '@$34', beat: 'zoom-on-number', focus: 'receipt.fee' }
```

| Beat | Camera | Storyteller | Others |
|---|---|---|---|
| `side-by-side` | focus fills 60 %, lands at x 690 | `left`, big (1.4), points at it | blur 5 |
| `graphic-hero` | focus fills 80 % | `corner`, small, points | blur 3 |
| `zoom-on-number` | push-in 0.6 s, fill 62 %, −0.7° roll | `corner`, points at the number | blur 8, dim 35 % |
| `pull-back` | back to the whole focus, fill 82 % | `corner`, idle | sharp |
| `presenter-front` | eases back (zoom ×0.9) | `front`, centre, 1.8×, talking | **everything** blurs 7, dims 38 % (`keep: ['id']` exempts) |
| `peek` | focus fills 80 % | **behind** the focus, peeking over its top edge | blur 3 |
| `over-shoulder` | focus fills 78 %, shifted right | huge soft foreground figure bottom-left | blur 5 |
| `wide` | every world element | `corner` | sharp |

**Beat parameters** (all optional except `at`):

| Param | Meaning | Default |
|---|---|---|
| `at` | time / `@word` the move should land on | — |
| `beat` | preset from the table | `graphic-hero` |
| `focus` | `'id'`, `'id.anchor'`, `['id', 'id2.anchor']` (framed together) or a world box `{x, y, w, h}` | previous beat's focus (`wide`: all elements) |
| `fill` | share of the 1080 width the focus takes (bigger = closer) | per beat |
| `zoom` | extra zoom multiplier | 1 |
| `maxH` | max on-screen height of the focus in px (caps the zoom for tall things) | 980 (`zoom-on-number`: 520) |
| `sx`, `sy` | screen point the focus centre lands on | 540, 740 |
| `rot` | camera roll in radians (keep within ±0.015) | 0 |
| `move: 'whip'` | fast travel (0.5 s) with motion blur + whoosh; use between stations | — |
| `dur`, `ease`, `lead`, `arc`, `drift` | camera duration, curve (`glide`·`push`·`inOut`·`out`), head start, zoom dip, hold push | per beat |
| `st` | storyteller spot: `corner` · `corner-left` · `left` · `right` · `front` · `peek` · `shoulder` · `off` · `off-left` · or `{x, y, s, layer: 'front'|'back', blur, dim}` | per beat |
| `side: 'right'` | flips `left` → `right`; for `peek`, `'left'` peeks over the left corner | — |
| `stScale`, `stDur`, `stDelay`, `hop` | his scale, travel time (0.75), delay, hop height (0 = glide) | — |
| `pose` | `idle` · `talk` · `point` · `chin` · `shock` · `shrug` · `you` · `wave` · `follow` | per beat |
| `point` / `look` | what he aims his arm / eyes at (`'id.anchor'`) | the focus |
| `keep` | ids that stay sharp even when the beat blurs things | — |
| `blur`, `dim`, `lift` | override the blur (px) / dim (0–1) of non-focused elements, and the lift of the focus | per beat |
| `sfx` | `'name'` or `{name, gain, dur}` on this beat (replaces the automatic whoosh/swipe) | auto |

`poses: [['@000>', 'shock'], ['@follow', 'follow', {target: [600, 1120]}]]` adds pose changes between beats (`target` = `'id.anchor'` or a screen point).

### Captions

Built from `words.json` automatically (≤ 3 words / 15 characters, split on punctuation and pauses, number fragments re-joined). Options: `emph: {'$34': 'bad', cents: 'good'}` (colour by spoken word), `fix: [['a PR.', 'APR.']]` (repair a mis-heard token sequence; write the words exactly as `check` prints them), `hide: [[from, to]]`, `y` (1432), `size` (66), `maxChars`, `maxWords`. `captions: false` turns them off. They are always screen-fixed.

### Sound

`sfx: [{ at: '@$34', name: 'cash_register_1', gain: -9, dur: 1, offset: 0 }]` — `name` is a `brand/sfx-library/manifest.json` name (CC0 only). Whips get `whoosh_2` and push-ins get `swipe_2` automatically (`autoSfx: false` to stop). `bed: {name, gain, offset}`. `bm2.cjs check`/`render` write the resolved list to `sfx.json`; `mix.py` reads it, so picture and sound share the same word times. Typical gains: big hits −3 to −5 dB, registers/stamps −7 to −9, pops/clicks −7 to −12, counters −9 to −12.

## Landscape (16:9, 1920×1080) and long-form (added 2026-11-25)

Same engine, same look; Shorts are unchanged (re-rendered stills are byte-identical).

- **Format.** `bm2.cjs init <dir> --voice <voiceDir> --format 16:9` writes `<script>window.BM2_FORMAT='16:9'</script>` before the engine scripts (`primitives.js` reads it and sets `BM2.W/H` and the layout tokens `BM2.L`). Landscape layout: stage centre (960, 470) (`sy` ≈ 470–520 keeps graphics clear of the caption band), captions Inter 800 58 px at y 945 (≤ 26 chars, 5 words, max width 1300), DECODED/WHAT IF pill top-left (64, 40) with the mono title on an Ink chip, footnote bottom-left (64, 1036; it fades out while he stands on the left), storyteller default bottom-right (1740, 1062, ×0.9). Beat presets and storyteller spots are redefined for landscape (`corner` = bottom-right, `left`/`right`, `front` = big at x 1620, `shoulder`, `peek`), `fill` is the share of the 1920 width. Screen-UI defaults are in `BM2.L.bubble` / `BM2.L.follow`.
- **Paragraph-keyed refs** (when `voice.paragraphs` exists; `bm2.cjs voice` takes it from `<voiceDir>/engine_voice.json` = `{words:[{w,s,e,p}], paragraphs:[{id,chapter,start,end}]}`): `'@P15'` paragraph start, `'@P15>'` end, `'@P15:20'` first "20" spoken in P15, `'@P15:20#2'` second, `'@P15:twenty'` (spelled numbers match their digits), `'@P15:#3'` third word, `'@P15:20>'` word end, any ref + `+0.3` / `-0.2`. Whisper digit splits apply (`10 .5 %` → words `10`, `5`; `$64 .8`; `900 ,000` → `900`, `000`).
- **Rooms / stage over time.** `stages: [{at, dur, theme: {stage, blobs, dust, paper, paperShade, rule}}]` crossfades the stage palette (sepia chapter, cool chapter). A chapter card is an element in a new "room" far away in the world plus a long `move: 'whip'` beat.
- **HUD off.** `hudOff: [[from, to]]` hides pill + footnote (end card); captions use `captions.hide`.
- **Long renders.** `bm2.cjs render <dir> --jobs 4 --chunk 40 --crf 21 [--from s --to s] [--force]` renders independent chunks (one browser + ffmpeg each, flat memory), skips finished chunks (resumable), then concatenates. Delete `parts/cNNN.mp4*` to redo one chunk. Local sounds: `sfx: {name: 'local:pipes'}` reads `<video>/sfx/pipes.mp3`.

## How to direct a v2 video (checklist)

1. **Stations.** From the script, pick 2–4 graphics that carry the story (hook object → evidence → comparison/payoff). Place them in a row (`[0,0]`, `[1750,…]`, `[3450,…]`).
2. **Number spine → anchors.** Every number in the spine must live on an element as an anchor (a receipt row, a doc line, a counter, a bar) with `at: '@<the word>'`.
3. **Frame 0.** `side-by-side` on the hook text + first object, both `in: -1`. The outrageous number is on screen at t = 0.
4. **Write the beat list** down the narration, one beat every 1.5–3 s:
   - a number is spoken → `zoom-on-number` on its anchor;
   - after it → `pull-back` or `graphic-hero`;
   - an opinion, question or CTA → `presenter-front`;
   - new station → `move: 'whip'` with `peek` or `side-by-side`;
   - payoff → `zoom-on-number` + `shakes` + a `shock` pose + the big hit sound;
   - ending → `presenter-front` for the comment bubble, then `wide` + `follow` button.
   Minimums: 3 push-ins on spoken numbers, 2 front/back switches, 1 chart beat.
5. `check`, then `stills` at every beat time + 0.6 s. Fix: he covers the number → change `st`; focus under the pill → raise `sy` or lower `fill`; frame empty → tighter `fill` or add the element to `focus`.
6. Sound: one sound per reveal, on the same `@word` as the picture. `render`, `mix.py`, `sheet`, review the sheet.

Layout numbers to remember: stage centre (540, 740); pill y 238–290; his feet y 1330; captions y ≈ 1432; footnote y 1500; nothing important right of x 940 below y 960.

## Files

| File | What |
|---|---|
| `primitives.js` | easing, analytic springs, stagger, colour, paper/clay/shadow surfaces, marker, burst, odometer number roll, grain |
| `camera.js` | camera track (x, y, zoom, rotation, screen anchor), parallax, framing, shake, speed |
| `storyteller-v2.js` | the brand character (v1 geometry and colours) with travel, scale, layers, blended poses, aim, squash, lean |
| `charts.js` | element recipes; add a recipe with `BM2.register(type, {defaults, size, anchors, draw})` |
| `engine.js` | themes, `@word` time refs, beat presets, focus/blur, captions, layers, motion blur, `BM2.scene()` |
| `bm2.cjs` | CLI: init · voice · check · stills · render · sheet |
| `mix.py` | audio mix + mux |
| `starter/` | scene.html template + copy-paste starter scene |
| `examples/gallery/` | every recipe on one board (Decoded theme) |
| `fonts/` | Anton, Inter 600/800, JetBrains Mono 700/800 (OFL) |

Adding a recipe: draw in local coordinates with the origin at the element's centre, use `BM2.paper` / `BM2.clay` / `BM2.shadowed` for surfaces, `BM2.spring` / `BM2.ease` for motion, `BM2.roll` for numbers, read times from `props` (already resolved to seconds) and `env.t`. No glow, no randomness without `BM2.hash`, no `Date.now()`.

## Known limits

- The storyteller is screen-space: he does not shrink into the world on a `wide` shot.
- "Morph" is a practice (keep one object alive and change its values), not a shape-tween function.
- Depth-of-field blur is per element (one blur value each), not per pixel.
- Text inside the world is vector and stays crisp at any zoom; very small world text (< 20 px on screen) is unreadable by design — zoom in or make it bigger.
