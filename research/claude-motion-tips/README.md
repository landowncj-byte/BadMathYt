# Claude Motion Tips — studied 2026-11-25 (owner: "study this… all the sublinks… use these in our video")

Source: https://withian.notion.site/Claude-Motion-Tips-3ef057be92ba807db689d2571b6b7adf (raw dump: notion-page-raw.txt).
Linked:
- github.com/yihui-dev/awesome-opus5-5-videos: 703 Opus 5.5 videos with prompts. The 139 explainer/motion prompts are in collection-explainer-prompts.md.
- skillry.dev gallery (host not allowed; same videos as the GitHub list).
- Anthropic's XML prompt guidance (platform.claude.com, not allowed here; the guidance itself is known: separate instructions, context and examples into consistent, descriptive XML tags).

## 1. What the page says
**Open-source effects** (give the project to Claude, have it study the project and its demos, and get ideas):

| Library | What it adds | Use for Bad Math? |
|---|---|---|
| Matter.js (github.com/liabru/matter-js, demos brm.io/matter-js/demo) | Gravity, collisions, bouncing, springs. "Make word cards fall and stack." | **YES**: bills and coins falling into real piles (weight-vs-height), penny doubling into a growing heap, briefcases dropping, verdict cards slamming down. |
| Rough.js (github.com/rough-stuff/rough, roughjs.com) | Sketchy outlines and hatched fills for hand-drawn diagrams | **YES, the biggest win for the kindergarten rule**: hand-drawn step 1 → 2 → 3 diagrams, circles around key numbers, arrows, comparison boxes. Seeded, so deterministic. |
| Anime.js (github.com/juliangarnier/anime) | Coordinated text, shape and SVG choreography | Maybe: our engine already has timelines and springs; borrow its stagger patterns. |
| p5.brush (github.com/acamposuribe/p5.brush) | Pencil, charcoal and marker strokes, watercolor fills, hatching | **YES (light)**: marker underline/highlight on the spoken number, an "evidence" scribble on Decoded case files. Seeded. |
| PixiJS + filters (github.com/pixijs/filters) | Glitch, glow, ASCII, bulge, crosshatch | Sparingly: a 0.3 s glitch on "FAKE"/"WITHDRAWN" reveals. NO glow (no-neon rule). |
| thinking-orbs (github.com/RareFormLabs/thinking-orbs) | Dotted "AI thinking" orbs | No (off-theme). |

**Three workflow upgrades:**
1. **Structure long prompts with XML tags** (art_direction / references / timing / deliverable).
2. **Test one second first.** Build and render the hardest effect as a 1-second test before the whole video.
3. **Check keyframes before rendering.** Make a contact sheet at the start, at every beat or transition and at the final hold, labelled with timestamps. Check for cropped text, accidental overlaps and elements disappearing mid-transition, then do the final render. Then watch a short preview for pacing.

The three copyable prompts are verbatim in notion-page-raw.txt.

## 2. What the best explainer prompts in the collection do (139 read by keyword; 6 longest in full)
- **Every frame is a pure function of time** (`seek(t)`): no CSS transitions, no timers, no carried state. Our engine already works this way, so keep it.
- **Closed-form springs**, with only a tiny overshoot. When a value changes target several times, sum one spring per change.
- **Content enters after its container starts morphing and leaves before the next morph**, so text never overlaps. Add a short blur on transitions.
- **Motion blur from subframes.** Render 4–6 subframes per output frame and blend them (ffmpeg `tmix`), which makes motion look filmed instead of "AI-stepped".
- **One strong formal idea per scene.** Use one accent element that carries every transition, never a fade from black straight into the accent.
- **Simulate the real thing.** "The random walk should be an actual random walk, not a drawing of one." For us:
  - The Monty Hall cut runs 1,000 real simulated games with a live tally.
  - The penny actually doubles, square by square.
  - The weight pile stacks real counts of bills.
- **Something happens on every beat.** Use a BPM grid; sound effects land on measured peaks.
- **Make the last frame match the first** so the video loops.
- **Real numbers, with honest uncertainty;** gags and callbacks keep attention.

## 3. How we apply it (owner wants these in our videos)
Applied now, through brand/REBUILD-LONGER.md stage 2 and brand/BUILD-BRIEF.md:
- A 1-second test of the hardest effect before the full scene.
- A keyframe contact sheet (one frame per beat, timestamped) checked BEFORE the final render.
- Content in after the container, out before the next. Short blur on transitions.
- "Simulate the real thing" where a What If allows it.
- A loop: the last frame echoes the first.

Engine upgrade (Sonnet engine task, queued after the current builds; tracked in queue-rebuild.md):
1. A `sketch` element using Rough.js (seeded): hand-drawn boxes, arrows, circles, underlines and step diagrams.
2. A `physics` element using Matter.js, PRE-SIMULATED with a fixed timestep and cached per frame so seek(t) stays deterministic: falling bills/coins/cards that stack.
3. A `marker` stroke (p5.brush-style, seeded) for highlighting spoken numbers.
4. Subframe motion blur in render (`--blur 4`: 4 subframes → ffmpeg tmix).
5. Optional `glitch` filter for FAKE/WITHDRAWN reveals (0.3 s max, no glow).
All library code is vendored locally (MIT/Apache licences noted). No CDN at render time.
