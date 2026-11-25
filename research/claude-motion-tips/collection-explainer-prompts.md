# Explainer / motion-graphics prompts from github.com/yihui-dev/awesome-opus5-5-videos (MIT-licensed list; prompts by their creators — for TECHNIQUE study only, never copy their videos)

## ror-fly-880547 — explainer — tags ['canvas']
Post: https://x.com/Ror_Fly/status/2102853258582880547

We're going to try a little test. Do you think you could render a recipe motion graphic animation using javascript or html (w/e you think will produce the best) to show the full recipe from start to finish (empty glass to completed cocktail) - Explainer video style - Showing the recipe ingreidents + measurements as they're going into the cup. Should be a 30s video.

## twoclipping-402193 — motion — tags ['svg']
Post: https://x.com/twoclipping/status/2103273003555402193

<inputs>
Ask me for: 8 to 12 UI states I want the shape to become (e.g. button, loader, player, slider, toggle, tabs, chart, command palette, toast), pure black and white or one accent color, and a royalty-free song around 120 BPM (e.g. Mixkit, free for commercial use).
</inputs>

<direction>
Dribbble-level UI motion. One shape, never cut: every state is the same element morphing its size, radius and color while its content swaps with a short blur. A cursor drives every change with real clicks and drags. Light warm-gray canvas, black and white components, one clean UI font (Geist). Springs everywhere, a tiny overshoot at most. The camera zooms so each state fills the frame. The last frame is the first frame, so it loops.
Banned: bouncy easing, particle bursts, glows, gradients on UI chrome, mismatched icon strokes, dead time, anything that looks like a template.
</direction>

<structure>
120 BPM, 7 bars, something happens on every beat.
Button → loader → check → dynamic island → music player with a play/pause morph → scrub the progress bar → it becomes a volume slider that stretches when dragged past max → a toggle flips on the beat → the knob becomes a liquid tab indicator → the tabs open into a chart that draws itself, with a tooltip on hover → it collapses into ⌘K → type to filter → enter → toast → back to the button.
</structure>

<build>
1. One HTML file, square 1440x1440. Every style is computed from time inside seek(t): no CSS transitions, no timers, no state carried between frames.
2. Springs are closed-form step responses. A value that changes target many times is the sum of one spring per change, so it stays a pure function of time.
3. The tab indicator's two edges ride different springs, so the leading edge stretches ahead of the trailing one. Same trick for the toggle knob.
4. Drags are direct manipulation: while the cursor is held, the value is computed from its position. On release it springs back from wherever it was.
5. Analyze the song with numpy for the beat grid and start on a downbeat. Place every UI sound by its measured peak.
6. Render with Playwright: 4 subframes per frame, blended with ffmpeg tmix for motion blur at 60fps.
7. Render one frame per beat before the full render. Fix anything off the grid, cramped or hard to read.
</build>

<gotchas>
Never put will-change on anything the camera scales or the text renders blurry. Text that swaps inside a morphing container needs its own enter and exit timing or it overlaps. Make the last frame identical to the first, cursor position and speed included, or the loop stutters.
</gotchas>

<start>
Ask me for the inputs, then show me the state list on the beat grid before you write any code.
</start>

## deedydas-252537 — explainer — tags ['svg', 'gsap']
Post: https://x.com/deedydas/status/2102787937482252537

make a modern slick and punchy video for a modern startup that works on inference

## sudo-kiran-335993 — explainer — tags ['canvas', 'svg', 'gsap', 'css']
Post: https://x.com/sudo_kiran/status/2103761658745335993

create best motion graphics explainer of the (your product) with very good script and good design colors and good music make sure the video should be incredible and people should feels like watch it many times.. it has to be in 30 seconds good and very intresting, it has to be best of the best of the best of the best video
(product link)

## 0xvalure-331584 — explainer — tags ['threejs', 'canvas']
Post: https://x.com/0xValure/status/2103603025579331584

Make this PayBox logo into a reel. Pretend you are a world-class motion designer. Make a 10-second dynamic video like the reference

## verbove-268381 — explainer — tags ['canvas']
Post: https://x.com/verbove/status/2103483957266268381

<inputs> 
Ask me for: 
• my product + URL 
• 8–12 UI states that tell its story 
• the real data shown in each state 
• brand colors + fonts + accent color 
• required formats (1:1, 16:9, 9:16) 
</inputs>

<rules> 
One HTML file. One canvas
One draw(t) function

No CSS transitions
No timers
No state carried between frames

One shape, never cut

Every state is the same element changing size, radius and color while the content swaps

A cursor drives the sequence with real clicks, typing and one drag

Real UI. Real data. No placeholders.

</rules>
<structure> 
120 BPM grid

Something happens on every bea

logo → button → handle field → “is this you?” → loader → pin → globe filling with users → matches → tabs → RSVP → search → logo

</structure>

<motion> 
Closed-form springs everywhere with only a tiny overshoot.

If a value changes target multiple times, sum one spring per change

Content enters after its container starts morphing and leaves before the next morph so text never overlaps

Use a short blur on transitions

Never fade black directly into the accent color. Move an accent element between states instead

Make tab indicators stretch by putting each edge on a different spring

Zoom the camera so every state fills the frame

Make the last frame equal the first so the whole thing loops
</motion>

<export> 
First render one frame per beat as a contact sheet

Fix anything cramped or broken

Then render every frame in headless Chrome at 60fps, averaging 6 subframes for motion blur

Pipe into ffmpeg:
H.264 + yuv420p

Export all aspect ratios in parallel
</export>

motion design is becoming a prompt

## ajith-io-562538 — explainer — tags ['threejs', 'shader', 'canvas']
Post: https://x.com/ajith_io/status/2103800569584562538

Make a dynamic 40-second motion graphics video on Distilbook that shows what an incredible motion designer you are, like it's your showreel - go all out. Use the Oppenheimer theme music as inspiration, but compose it yourself.

## morse-369333 — 3d — tags ['svg']
Post: https://x.com/__morse/status/2103485566570369333

<inputs>
Ask me for: 8 to 12 UI states I want the shape to become (e.g. button, loader, player, slider, toggle, tabs, chart, command palette, toast), pure black and white or one accent color, and a royalty-free song around 120 BPM (e.g. Mixkit, free for commercial use).
</inputs>

<direction>
Dribbble-level UI motion. One shape, never cut: every state is the same element morphing its size, radius and color while its content swaps with a short blur. A cursor drives every change with real clicks and drags. Light warm-gray canvas, black and white components, one clean UI font (Geist). Springs everywhere, a tiny overshoot at most. The camera zooms so each state fills the frame. The last frame is the first frame, so it loops.
Banned: bouncy easing, particle bursts, glows, gradients on UI chrome, mismatched icon strokes, dead time, anything that looks like a template.
</direction>

<structure>
120 BPM, 7 bars, something happens on every beat.
Button → loader → check → dynamic island → music player with a play/pause morph → scrub the progress bar → it becomes a volume slider that stretches when dragged past max → a toggle flips on the beat → the knob becomes a liquid tab indicator → the tabs open into a chart that draws itself, with a tooltip on hover → it collapses into ⌘K → type to filter → enter → toast → back to the button.
</structure>

<build>
1. One HTML file, square 1440x1440. Every style is computed from time inside seek(t): no CSS transitions, no timers, no state carried between frames.
2. Springs are closed-form step responses. A value that changes target many times is the sum of one spring per change, so it stays a pure function of time.
3. The tab indicator's two edges ride different springs, so the leading edge stretches ahead of the trailing one. Same trick for the toggle knob.
4. Drags are direct manipulation: while the cursor is held, the value is computed from its position. On release it springs back from wherever it was.
5. Analyze the song with numpy for the beat grid and start on a downbeat. Place every UI sound by its measured peak.
6. Render with Playwright: 4 subframes per frame, blended with ffmpeg tmix for motion blur at 60fps.
7. Render one frame per beat before the full render. Fix anything off the grid, cramped or hard to read.
</build>

<gotchas>
Never put will-change on anything the camera scales or the text renders blurry. Text that swaps inside a morphing container needs its own enter and exit timing or it overlaps. Make the last frame identical to the first, cursor position and speed included, or the loop stutters.
</gotchas>

<start>
Ask me for the inputs, then show me the state list on the beat grid before you write any code.
</start>

## lukasersil-726495 — 3d — tags ['threejs', 'shader', 'canvas', 'svg']
Post: https://x.com/lukasersil/status/2103742861971726495

Create a bold, dynamic 15-second motion graphics showreel that feels like the ultimate portfolio piece of an exceptionally talented motion designer. Showcase a wide range of advanced techniques: kinetic typography, smooth transitions, 2D and 3D animation, abstract geometry, fluid simulations, particles, distortion, creative masking, compositing, lighting, depth, and seamless camera movement. Keep the pacing fast, confident, and visually surprising, with every shot transitioning naturally into the next. Make it feel meticulously art-directed rather than like a random collection of effects. Push the creativity, polish, timing, and visual impact as far as possible. This should feel like the opening reel that gets a motion designer hired.

## linearuncle-971663 — explainer — tags ['svg', 'audio']
Post: https://x.com/LinearUncle/status/2103128559174971663

请用Manim给我制作一个导数概念学习的视频，要求通俗易懂，并且有例子，引人思考。配音使用edge-tts

## demonugc-525162 — motion — tags ['svg']
Post: https://x.com/demonugc/status/2103526713208525162

<inputs>
Ask me for: 8 to 12 UI states I want the shape to become (e.g. button, loader, player, slider, toggle, tabs, chart, command palette, toast), pure black and white or one accent color, and a royalty-free song around 120 BPM (e.g. Mixkit, free for commercial use).
</inputs>

<direction>
Dribbble-level UI motion. One shape, never cut: every state is the same element morphing its size, radius and color while its content swaps with a short blur. A cursor drives every change with real clicks and drags. Light warm-gray canvas, black and white components, one clean UI font (Geist). Springs everywhere, a tiny overshoot at most. The camera zooms so each state fills the frame. The last frame is the first frame, so it loops.
Banned: bouncy easing, particle bursts, glows, gradients on UI chrome, mismatched icon strokes, dead time, anything that looks like a template.
</direction>

<structure>
120 BPM, 7 bars, something happens on every beat.
Button → loader → check → dynamic island → music player with a play/pause morph → scrub the progress bar → it becomes a volume slider that stretches when dragged past max → a toggle flips on the beat → the knob becomes a liquid tab indicator → the tabs open into a chart that draws itself, with a tooltip on hover → it collapses into ⌘K → type to filter → enter → toast → back to the button.
</structure>

<build>
1. One HTML file, square 1440x1440. Every style is computed from time inside seek(t): no CSS transitions, no timers, no state carried between frames.
2. Springs are closed-form step responses. A value that changes target many times is the sum of one spring per change, so it stays a pure function of time.
3. The tab indicator's two edges ride different springs, so the leading edge stretches ahead of the trailing one. Same trick for the toggle knob.
4. Drags are direct manipulation: while the cursor is held, the value is computed from its position. On release it springs back from wherever it was.
5. Analyze the song with numpy for the beat grid and start on a downbeat. Place every UI sound by its measured peak.
6. Render with Playwright: 4 subframes per frame, blended with ffmpeg tmix for motion blur at 60fps.
7. Render one frame per beat before the full render. Fix anything off the grid, cramped or hard to read.
</build>

<gotchas>
Never put will-change on anything the camera scales or the text renders blurry. Text that swaps inside a morphing container needs its own enter and exit timing or it overlaps. Make the last frame identical to the first, cursor position and speed included, or the loop stutters.
</gotchas>

<start>
Ask me for the inputs, then show me the state list on the beat grid before you write any code.
</start>

## alex-prompter-997524 — explainer — tags ['svg', 'gsap']
Post: https://x.com/alex_prompter/status/2103499977632997524

Adopt the role of an expert motion designer. Build a 30-second animated explainer for my business as a single HTML page. 5 scenes. The customer's problem, what I do, how it works in 3 steps, one proof point, and my name at the end. Bold text, smooth transitions, my brand colours. My business [DESCRIBE WHAT YOU SELL, WHO IT'S FOR AND YOUR COLOURS]

## emollick-019567 — explainer — tags ['canvas']
Post: https://x.com/emollick/status/2103688362960019567

A video explaining recursion, where every explanation about recursion has a radically different video style, make this self-referential & clever & fast moving.

## dale-vaz-879074 — motion — tags ['canvas']
Post: https://x.com/dale_vaz/status/2103290592679879074

create a self contained aesthetically pleasing, breathtaking animation of the Sahi Trading Terminal. it should start with a single dot on a black screen and then have multiple windows show up on the screen such as Charts, Positons , Option Chain, Watchlist. And zoom into and out at multiple scales. Finally the camera zooms out to make the desktop look like a point in space. And then it zooms back in to reveal a mobile screen in landscape mode with a chart in one half and an option chain in another. The video ends in Sjngle Screen Trading on SAHI
use javascript for it. be detailed and accurate. it should be visually stunning
0:46

## kloss-xyz-067876 — explainer — tags ['canvas', 'svg', 'css']
Post: https://x.com/kloss_xyz/status/2103652674336067876

make a video highlighting key moments in the history of AI.

## henkvaness-975279 — explainer — tags ['svg']
Post: https://x.com/henkvaness/status/2103801351993975279

make educational video out of article.

## amitsingha89-780553 — explainer — tags ['svg']
Post: https://x.com/AmitSingha89/status/2103737604277780553

Make a professional explainer video for https://anuprerna.com for a first-time visitor.

## tak3sh8-441895 — explainer — tags ['canvas', 'audio']
Post: https://x.com/tak3sh8/status/2103667481139441895

Do a quick hand-drawn whiteboard animations explaining what is replica symmetry breaking in the SK model

Prompt 2: build the mp4 version with narration

## astrothewizard-618782 — explainer — tags ['canvas']
Post: https://x.com/AstroTheWizard/status/2103629247751618782

I want you to make a 60-second, fully animated explainer video, end to end, completely on your own. I'm stepping away from my computer, so work autonomously until it's done. Don't stop to ask me questions; make the calls yourself and tell me what you decided at the end.

Topic: the journey of photons 

Style: whimsical, charming, storybook. Give the photon a personality. It should feel like a professional motion-design studio made it, not "AI video". The whole thing should be a pure JavaScript animation, rendered from code frame by frame. Don't use AI video generators for the visuals. I've seen the videos people are posting from Opus 5.5 (kinetic typography reels, continuous infinite zooms, data-driven explainers like The Pudding or 3Blue1Brown), and what makes them great is that they're code-rendered: crisp, precise, with a coherent design system and one strong formal idea per scene. Aim for that bar or above.

Make it genuinely educational and accurate. Where you can, simulate the real thing: the random walk should be an actual random walk, not a drawing of one. Include real numbers (core temperature, distance, travel time, years inside the Sun) and be honest about uncertainty in the estimates. Use humor and visual gags to keep attention: onomatopoeia, little characters, callbacks. Put what was happening on Earth during those 100,000 years alongside the photon's timeline.

Deliverable: 1920x1080 at 60fps, exactly 60 seconds, with:
- A voiceover script you write yourself, voiced with the highest-quality text-to-speech model you can access
- Burned-in captions, since most people watch on X with the sound off
- An original music score that fits the whimsical tone and changes with each scene
- Sound design synced exactly to the on-screen action (every bounce, pop, whoosh and ding)
- A professional mix: music ducks under the voice, mastered to streaming loudness

You write the script, design the characters, pick the typography and palette, compose the music, and build the animation engine. Use any tools and resources you can find access to: open fonts, sample libraries, open-source models. Use whatever works.

Quality is paramount. Build verification loops: render stills of every scene and review them critically, check transitions frame by frame, measure the audio mix numerically, fix what's weak and re-render. Don't hand me a first draft. Hand me something you'd put your name on. Also give me the source code so it's reproducible

## dzhohola-249003 — motion — tags ['css']
Post: https://x.com/dzhohola/status/2103605737595249003

<inputs>
Ask me for: 8 to 12 UI states I want the shape to become (e.g. button, loader, player, slider, toggle, tabs, chart, command palette, toast), pure black and white or one accent color, and a royalty-free song around 120 BPM (e.g. Mixkit, free for commercial use).
</inputs>

<direction>
Dribbble-level UI motion. One shape, never cut: every state is the same element morphing its size, radius and color while its content swaps with a short blur. A cursor drives every change with real clicks and drags. Light warm-gray canvas, black and white components, one clean UI font (Geist). Springs everywhere, a tiny overshoot at most. The camera zooms so each state fills the frame. The last frame is the first frame, so it loops.
Banned: bouncy easing, particle bursts, glows, gradients on UI chrome, mismatched icon strokes, dead time, anything that looks like a template.
</direction>

<structure>
120 BPM, 7 bars, something happens on every beat.
Button → loader → check → dynamic island → music player with a play/pause morph → scrub the progress bar → it becomes a volume slider that stretches when dragged past max → a toggle flips on the beat → the knob becomes a liquid tab indicator → the tabs open into a chart that draws itself, with a tooltip on hover → it collapses into ⌘K → type to filter → enter → toast → back to the button.
</structure>

<build>
1. One HTML file, square 1440x1440. Every style is computed from time inside seek(t): no CSS transitions, no timers, no state carried between frames.
2. Springs are closed-form step responses. A value that changes target many times is the sum of one spring per change, so it stays a pure function of time.
3. The tab indicator's two edges ride different springs, so the leading edge stretches ahead of the trailing one. Same trick for the toggle knob.
4. Drags are direct manipulation: while the cursor is held, the value is computed from its position. On release it springs back from wherever it was.
5. Analyze the song with numpy for the beat grid and start on a downbeat. Place every UI sound by its measured peak.
6. Render with Playwright: 4 subframes per frame, blended with ffmpeg tmix for motion blur at 60fps.
7. Render one frame per beat before the full render. Fix anything off the grid, cramped or hard to read.
</build>

<gotchas>
Never put will-change on anything the camera scales or the text renders blurry. Text that swaps inside a morphing container needs its own enter and exit timing or it overlaps. Make the last frame identical to the first, cursor position and speed included, or the loop stutters.
</gotchas>

<start>
Ask me for the inputs, then show me the state list on the beat grid before you write any code.
</start>

## hicallmechai-878304 — motion — tags ['svg', 'gsap']
Post: https://x.com/hiCallMeChai/status/2103600312296878304

<inputs>
Ask me for: 8 to 12 UI states I want the shape to become (e.g. button, loader, player, slider, toggle, tabs, chart, command palette, toast), pure black and white or one accent color, and a royalty-free song around 120 BPM (e.g. Mixkit, free for commercial use).
</inputs>

<direction>
Dribbble-level UI motion. One shape, never cut: every state is the same element morphing its size, radius and color while its content swaps with a short blur. A cursor drives every change with real clicks and drags. Light warm-gray canvas, black and white components, one clean UI font (Geist). Springs everywhere, a tiny overshoot at most. The camera zooms so each state fills the frame. The last frame is the first frame, so it loops.
Banned: bouncy easing, particle bursts, glows, gradients on UI chrome, mismatched icon strokes, dead time, anything that looks like a template.
</direction>

<structure>
120 BPM, 7 bars, something happens on every beat.
Button → loader → check → dynamic island → music player with a play/pause morph → scrub the progress bar → it becomes a volume slider that stretches when dragged past max → a toggle flips on the beat → the knob becomes a liquid tab indicator → the tabs open into a chart that draws itself, with a tooltip on hover → it collapses into ⌘K → type to filter → enter → toast → back to the button.
</structure>

<build>
1. One HTML file, square 1440x1440. Every style is computed from time inside seek(t): no CSS transitions, no timers, no state carried between frames.
2. Springs are closed-form step responses. A value that changes target many times is the sum of one spring per change, so it stays a pure function of time.
3. The tab indicator's two edges ride different springs, so the leading edge stretches ahead of the trailing one. Same trick for the toggle knob.
4. Drags are direct manipulation: while the cursor is held, the value is computed from its position. On release it springs back from wherever it was.
5. Analyze the song with numpy for the beat grid and start on a downbeat. Place every UI sound by its measured peak.
6. Render with Playwright: 4 subframes per frame, blended with ffmpeg tmix for motion blur at 60fps.
7. Render one frame per beat before the full render. Fix anything off the grid, cramped or hard to read.
</build>

<gotchas>
Never put will-change on anything the camera scales or the text renders blurry. Text that swaps inside a morphing container needs its own enter and exit timing or it overlaps. Make the last frame identical to the first, cursor position and speed included, or the loop stutters.
</gotchas>

<start>
Ask me for the inputs, then show me the state list on the beat grid before you write any code.
</start>

## annacher-433425 — motion — tags ['svg']
Post: https://x.com/AnnaCher___/status/2103571096549433425

Analyze http://sprites.ai and build a product promo from our own UI, not generic components.

<direction>
Dribbble-level UI motion. One shape, never cut: every state is the same element morphing its size, radius and color while its content swaps with a short blur. A cursor drives every change with real clicks and drags. Warm-gray canvas, black and white components, one accent (#FD9543), Geist. Springs everywhere, a tiny overshoot at most. The camera zooms so each state fills the frame. Last frame = first frame, so it loops.
Banned: bouncy easing, particles, glows, gradients on UI chrome, mismatched icon strokes, dead time, anything that looks like a template.
</direction>

<structure>
120 BPM, 7 bars, something on every beat.
Connect ad account (Meta, Google, LinkedIn, TikTok, Reddit logos) → loader → check → prompt bar types "Launch ads that convert" → island "Researching 42 competitors" → Ads Library wall of real ads scrolls and lands on a top performer → approval card → Approve & launch → budget slider that stretches past max → Autopilot toggle → knob becomes a liquid tab indicator across channels → ROAS chart draws itself with hover tooltip → ⌘K → type "pause" → toast "Paused 3 losing ads" → back to the button.
</structure>

<build>
1. One HTML file, 1440x1440. Every style is computed inside seek(t): no CSS transitions, no timers, no state between frames.
2. Springs are closed-form step responses. A value that changes target many times is a sum of springs, so it stays a pure function of time.
3. Tab indicator and toggle knob: the two edges ride different springs, so the leading edge stretches ahead.
4. Drags are direct manipulation: while held, the value follows the cursor. On release it springs back from wherever it was.
5. No music. Synthesize UI sounds with numpy and place each one by its measured peak on the beat grid.
6. Render with Playwright: 4 subframes per frame, blended with ffmpeg tmix for motion blur at 60fps.
7. Render one frame per beat first. Fix anything off-grid, cramped or hard to read.
</build>

<gotchas>
No will-change on anything the camera scales. Swapped text needs its own enter/exit timing. Match the last frame to the first, cursor position and speed included, or the loop stutters.
</gotchas>

Show me the state list on the beat grid before writing any code.

## thegrootdev-966114 — motion — tags ['svg']
Post: https://x.com/TheGrootDev/status/2103516567824966114

<inputs>
Ask me for: my featured Pokémon or starter trio, 8–12 Pokémon-themed UI states, and a royalty-free song around 120 BPM with a playful adventure or electronic feel. Confirm that the song’s license permits the intended use.Default palette: warm off-white, black, and Poké Ball red. Pokémon artwork keeps its original colors.
</inputs>

<direction>
A Pokémon-inspired UI motion film with Dribbble-level polish. Imagine a beautifully designed modern Pokédex: playful, precise, and instantly http://recognizable.One shape, never cut: a Poké Ball continuously morphs into every interface component by changing its size, radius, and color. Its central button, dividing line, and outer shell become the controls and structure of each new state. Content swaps with a short blur and carefully separated enter/exit timing.

A visible cursor drives every interaction with clicks, drags, and hover gestures. Use a light warm-gray canvas, clean Geist typography, consistent icon strokes, and crisp Pokémon artwork.

Use tightly damped springs with only a tiny overshoot. The camera smoothly reframes each state so the interface stays large and readable. The ending returns exactly to the opening Poké Ball for a seamless loop.

Banned: excessive bouncing, particle bursts, glows, gradients on UI chrome, mismatched icon strokes, dead time, generic dashboard layouts, abrupt scene changes, and unrelated floating elements.
</direction>

<structure>
120 BPM, 4/4 time, 7 bars: 28 beats, approximately 14 seconds. Something intentional happens on every http://beat.Bar 1 — Poké Ball activation

1. A closed Poké Ball sits centered; the cursor approaches.
2. The cursor clicks its central button.
3. The button becomes a circular scanning loader.
4. The scan resolves into a check, and the shell stretches into a compact Pokédex.

Bar 2 — Pokémon discovery
5. The Pokédex expands to reveal the featured Pokémon.
6. Its name, number, and type appear in a quick stagger.
7. The cursor clicks the cry/play control.
8. The control morphs into pause while a compact waveform animates.

Bar 3 — Trainer controls
9. The waveform flattens into a volume slider.
10. The cursor drags its Poké Ball-shaped knob to maximum.
11. Dragging beyond maximum elastically stretches the slider.
12. On release, it settles and compresses into a shiny-mode toggle.

Bar 4 — Pokémon details
13. The cursor flips shiny mode; the artwork changes to the correct shiny variant.
14. The toggle knob stretches into a liquid tab indicator.
15. The cursor selects “Stats.”
16. The card opens into a clean Pokémon stat chart.

Bar 5 — Stats to search
17. Stat bars draw themselves in sync with the beat.
18. The cursor hovers over a bar; a readable tooltip appears.
19. The chart retracts into the same container.
20. The container compresses into a Pokédex search field.

Bar 6 — Find and select
21. The search field expands into a command palette.
22. A short Pokémon name is typed; matching results filter.
23. The cursor selects a result,

## nezbuilds-294391 — motion — tags ['svg']
Post: https://x.com/nezbuilds/status/2103487427365294391

<inputs>
Ask me for: 8 to 12 UI states I want the shape to become (e.g. button, loader, player, slider, toggle, tabs, chart, command palette, toast), pure black and white or one accent color, and a royalty-free song around 120 BPM (e.g. Mixkit, free for commercial use).
</inputs>

<direction>
Dribbble-level UI motion. One shape, never cut: every state is the same element morphing its size, radius and color while its content swaps with a short blur. A cursor drives every change with real clicks and drags. Light warm-gray canvas, black and white components, one clean UI font (Geist). Springs everywhere, a tiny overshoot at most. The camera zooms so each state fills the frame. The last frame is the first frame, so it loops.
Banned: bouncy easing, particle bursts, glows, gradients on UI chrome, mismatched icon strokes, dead time, anything that looks like a template.
</direction>

<structure>
120 BPM, 7 bars, something happens on every beat.
Button → loader → check → dynamic island → music player with a play/pause morph → scrub the progress bar → it becomes a volume slider that stretches when dragged past max → a toggle flips on the beat → the knob becomes a liquid tab indicator → the tabs open into a chart that draws itself, with a tooltip on hover → it collapses into ⌘K → type to filter → enter → toast → back to the button.
</structure>

<build>
1. One HTML file, square 1440x1440. Every style is computed from time inside seek(t): no CSS transitions, no timers, no state carried between frames.
2. Springs are closed-form step responses. A value that changes target many times is the sum of one spring per change, so it stays a pure function of time.
3. The tab indicator's two edges ride different springs, so the leading edge stretches ahead of the trailing one. Same trick for the toggle knob.
4. Drags are direct manipulation: while the cursor is held, the value is computed from its position. On release it springs back from wherever it was.
5. Analyze the song with numpy for the beat grid and start on a downbeat. Place every UI sound by its measured peak.
6. Render with Playwright: 4 subframes per frame, blended with ffmpeg tmix for motion blur at 60fps.
7. Render one frame per beat before the full render. Fix anything off the grid, cramped or hard to read.
</build>

<gotchas>
Never put will-change on anything the camera scales or the text renders blurry. Text that swaps inside a morphing container needs its own enter and exit timing or it overlaps. Make the last frame identical to the first, cursor position and speed included, or the loop stutters.
</gotchas>

<start>
Ask me for the inputs, then show me the state list on the beat grid before you write any code.
</start>

## sudo-kiran-254201 — explainer — tags ['canvas', 'svg', 'css']
Post: https://x.com/sudo_kiran/status/2103486573476254201

make a dynamic 30-seconds motion graphic video about the distilbook like a product explainer the video has to be very incredible
(product url)

## sanjeevn72-457691 — motion — tags ['svg']
Post: https://x.com/sanjeevn72/status/2103456358125457691

<inputs>
Ask me for: 8 to 12 UI states I want the shape to become (e.g. button, loader, player, slider, toggle, tabs, chart, command palette, toast), pure black and white or one accent color, and a royalty-free song around 120 BPM (e.g. Mixkit, free for commercial use).
</inputs>

<direction>
Dribbble-level UI motion. One shape, never cut: every state is the same element morphing its size, radius and color while its content swaps with a short blur. A cursor drives every change with real clicks and drags. Light warm-gray canvas, black and white components, one clean UI font (Geist). Springs everywhere, a tiny overshoot at most. The camera zooms so each state fills the frame. The last frame is the first frame, so it loops.
Banned: bouncy easing, particle bursts, glows, gradients on UI chrome, mismatched icon strokes, dead time, anything that looks like a template.
</direction>

<structure>
120 BPM, 7 bars, something happens on every beat.
Button → loader → check → dynamic island → music player with a play/pause morph → scrub the progress bar → it becomes a volume slider that stretches when dragged past max → a toggle flips on the beat → the knob becomes a liquid tab indicator → the tabs open into a chart that draws itself, with a tooltip on hover → it collapses into ⌘K → type to filter → enter → toast → back to the button.
</structure>

<build>
1. One HTML file, square 1440x1440. Every style is computed from time inside seek(t): no CSS transitions, no timers, no state carried between frames.
2. Springs are closed-form step responses. A value that changes target many times is the sum of one spring per change, so it stays a pure function of time.
3. The tab indicator's two edges ride different springs, so the leading edge stretches ahead of the trailing one. Same trick for the toggle knob.
4. Drags are direct manipulation: while the cursor is held, the value is computed from its position. On release it springs back from wherever it was.
5. Analyze the song with numpy for the beat grid and start on a downbeat. Place every UI sound by its measured peak.
6. Render with Playwright: 4 subframes per frame, blended with ffmpeg tmix for motion blur at 60fps.
7. Render one frame per beat before the full render. Fix anything off the grid, cramped or hard to read.
</build>

<gotchas>
Never put will-change on anything the camera scales or the text renders blurry. Text that swaps inside a morphing container needs its own enter and exit timing or it overlaps. Make the last frame identical to the first, cursor position and speed included, or the loop stutters.
</gotchas>

<start>
Ask me for the inputs, then show me the state list on the beat grid before you write any code.
</start>

## sarut0bisasuke-069973 — explainer — tags ['canvas']
Post: https://x.com/Sarut0biSasuke/status/2103418429248069973

Render a recipe motion graphic animation using JavaScript or HTML (whatever you think will produce the best result) to show the full recipe for a White Russian from start to finish, empty glass to completed cocktail. Explainer video style, showing the ingredients and measurements as they go into the glass. It should be a 30s video.

## tomandrieu96707-875264 — explainer — tags ['canvas', 'svg', 'gsap']
Post: https://x.com/TomAndrieu96707/status/2103411144899875264

Create a pure javascript animation. 30s-60s whimsical hand drawn collage style with appropriate audio that will explain the same story as our “about-us” page. Use assets from our repo when possible.

## 0xnfrith-068999 — explainer — tags ['svg', 'gsap']
Post: https://x.com/0xnfrith/status/2103358957050068999

make me an animation to explain why celld earns its place.

## 1stnoel-603851 — explainer — tags ['gsap']
Post: https://x.com/1stnoel_/status/2103247530259603851

Make a 1-minute educational video about https://readsotto.app/ with synthesized voice narration.

## retropunkai-277590 — explainer — tags ['canvas', 'svg', 'gsap', 'ai-image']
Post: https://x.com/RetropunkAI/status/2103237989065277590

Render a fun motion graphic animation using the GSAP animation platform (see below) to show a brief history of The Sphere in Las Vegas from start to today (start with a minimal architecture to completed venue) - Explainer video style - Talk about how bands now play there, The Wizard of Oz film and next how on Oct 1 2026 Metallica will make their debut - and guess who is attending? We are! Should be a 30-60s video depending on the info. Use the images in the folder.

Sphere History:
https://en.wikipedia.org/wiki/Sphere_(venue)

Animation Platforms:
https://gsap.com/

Ask me any questions if you need, but if you feel confident please have fun and make something awesome that will go super viral!

## parkerrex-701462 — explainer — tags ['canvas', 'physics']
Post: https://x.com/ParkerRex/status/2103206747846701462

explain a token bucket rate limiter, canvas only, no libraries, every frame a pure function of time so my renderer can screenshot it.

## charlesmendez-476517 — explainer — tags ['canvas', 'svg', 'gsap']
Post: https://x.com/charlesmendez/status/2102847039415476517

I Want you to make a modern slick and punchy video for 
http://
datagran.io with an example of a user creating a chatgpt ads campaign, then connecting their metrics, understanding attribution, then connecting a voice agent to it, the agent responding, then doing follow up, adding humans in the loop and then providing analytics.

## nikolajankovic-616097 — explainer — tags ['canvas']
Post: https://x.com/_nikolajankovic/status/2102867033100616097

make a hand-drawn stop-motion animation;
story: you're defi saver and explaining yourself in 1st person

## 0xlangeai-178533 — explainer — tags ['svg', 'css']
Post: https://x.com/0xlangeai/status/2104119716533178533

Opus 5.5 做的文章讲解,  省流

## stephanferraro-224281 — explainer — tags ['threejs', 'shader', 'physics']
Post: https://x.com/StephanFerraro/status/2103020274107224281

Claude Opus 5.5 on our AI coding benchmark: build a fully autonomous 3D water simulation from an empty repo - procedural mountains, rain, streams, lakes. TypeScript + Three.js, no physics engine.

One prompt, zero corrections, ~21 min. 23/23 tests green.

https://github.com/AiondaDotCom/ai-sim-benchmark

## chudry223-081860 — explainer — tags ['threejs', 'shader']
Post: https://x.com/chudry223/status/2103044654187081860

One prompt. One interactive camera lab. 🎥🔥

Claude Opus 5.5 generates a 3D experience where you can adjust the focus ring, move lens elements, shift the focal plane, and see real-time depth-of-field effects.

AI-generated interactive 3D is getting wild. 🤯

## voxyz-ai-345550 — explainer — tags ['threejs', 'shader', 'canvas', 'gsap']
Post: https://x.com/Voxyz_ai/status/2103117246860345550

I asked Opus 5.5 to explain gravitational lensing by building an interactive black hole lab

One prompt for the first version, then a dynamic workflow to polish it for three rounds while I slept. This is what I woke up to: 5h 28m end to end, $90 at API prices

https://blackhole.voxyz.ai

Drag the black hole and the sky behind it bends into arcs, closing into a full ring when everything lines up

Each round ran 3 agents. Two reviewers each picked 9 to 10 issues and ranked them P0, P1, P2. The third one fixed them.
Round 1: 3D materials and lighting + UI and type
Round 2: camera motion and interaction + science-communication design
Round 3: a design director deciding whether it ships + visual QA and performance

Every P0 got fixed, the rest only if worth it. When the two reviewers disagreed, it picked one and wrote down why. It backed up before each round, checked screenshots after, and rolled back anything it couldn't fix.

## explorations-iq-921682 — explainer — tags ['threejs', 'shader', 'canvas']
Post: https://x.com/explorations_iq/status/2103317768669921682

Opus 5.5 generated this simulation of molecular orbitals in about ~20 minutes. I had to prompt for some structures and resonance but I can see the promise of instant educational simulations for any advanced topic

## nybobs-680050 — explainer — tags ['threejs', 'canvas']
Post: https://x.com/nybobs/status/2103385835328680050

110k rigid bodies in real time, in a browser tab. Grab anything, fire cannonballs.

Built with Claude Opus 5.5: Augmented Vertex Block Descent (SIGGRAPH 2025, Giles, Diaz & Yuksel) in WebGPU with @threejs . It's a physics solver that stays stable with huge scenes and big mass ratios. Opus 5.5 even put together this whole demo reel video just from a single text prompt in Claude Code haha 🤯

Try it: https://three-avbd.vercel.app
(recorded on an M4 Max, lighter scenes run fine on older computers or on mobile)

Code's here, MIT licensed. Go build something with it, have fun breaking things: https://github.com/sbobyn/three-avbd

#threejs #WebGPU

## garmdotcom-987439 — explainer — tags ['canvas', 'svg']
Post: https://x.com/garmdotcom/status/2103516101518987439

Tried to jump on the explainer video "made entirely with Opus 5.5" bandwagon.

Accidentally didn't include an OpenRouter API key.

Opus decided to just do everything itself. 

The result is insane

$0 additional cost.

Prompt in next post

## cyrilxbt-149036 — explainer — tags ['canvas', 'physics']
Post: https://x.com/cyrilXBT/status/2103532793406149036

🚨 Opus 5.5 is the best model launch in 2026

this entire physics engine is one HTML file.

sand, water, oil, fire, lava, plants, steam.

108,000 particles at 60fps.

built with Opus 5.5.

prompt in the replies 👇

follow @cyrilXBT

## miguel07code-091611 — explainer — tags ['canvas', 'audio', 'ai-image']
Post: https://x.com/Miguel07Code/status/2103626582896091611

fourier series were hard to learn back in university (2 years ago) and they are fun! 

what unlocks @HyperFrames_ + @claudeai Opus 5.5 is that you can get the best explainer videos just with 1 prompt

you are curious about something? ask claude!

## kureshirfan-386691 — explainer — tags ['svg']
Post: https://x.com/kureshirfan/status/2103788564840386691

I asked Claude Opus 5.5 to explain the earthquake physics as an animation. This is what it built, physically accurate strain profile included. 
#opus5 @AnthropicAI @claudeai

## amberpromptai-345137 — explainer — tags ['canvas']
Post: https://x.com/AmberPromptai/status/2103793821012345137

Tried Opus 5.5 to explain the Mid-Autumn Festival 🌕

From ancient traditions to mooncakes and family reunions, I turned the story into a short animated video.
The message is simple: No matter how far apart we are, make time for the people we miss.

What do you think of the result?

## iniyanai-856596 — explainer — tags ['threejs', 'svg', 'audio']
Post: https://x.com/iniyanai/status/2103814603100856596

Asked claude Opus 5.5 to make an explainer on how a mechanical keyboard works.

It wrote the music in code, used real switch recordings as the beats, built the 3D in @threejs  and timed every cut to the beat.

No stock footage. no editing app.

What a time to be alive!

## acoramaa-053577 — explainer — tags ['threejs', 'shader']
Post: https://x.com/Acoramaa/status/2103833991879053577

I TRIED MAKING A 3D MOTION GRAPHIC WITH CLAUDE OPUS 5.5. THIS IS WHAT CAME OUT.

The idea was simple: start at my desk and don't stop zooming until we hit a single atom inside the CPU.

Opus 5.5 took it and just kept going.

Into the PC case. The cooler lifts off. The CPU under it. The metal lid comes off. Then the silicon die, one core, the copper wiring stacked on top, rows of logic cells, the fins and gates of the transistors…

…all the way down to one silicon atom, bonded to its four neighbours.

One continuous shot, no cuts. The ruler on the right tracks the scale the whole time: from about a metre down to about 2 nanometres.

And the part that still gets me: every frame of this is 3D rendered right in a browser, from code. No Blender, no After Effects, no stock footage.

A year ago this would have been a studio job. Now it's one conversation.

Opus 5.5 is on another level.

## kgonia7-746268 — explainer — tags ['threejs', 'shader', 'canvas', 'particles']
Post: https://x.com/kgonia7/status/2103835848575746268

From Cabo da Roca to observable universe.

I gave opus 5.5 old prompt I prepared for Fable but I was not satisfied with the results. I asked model to create a cinematic film that zooms out from a hillside on Earth to the full observable universe using @threejs No external assets. 

Time: ~3h
Output tokens: 662,769
Cache: 125.6M read, 2.0M written; 
API-equivalent cost: about $54.52: output $13.26, cache reads $25.12, cache writes $16.14

## nathanwilbanks-981110 — explainer — tags ['threejs', 'shader', 'audio']
Post: https://x.com/NathanWilbanks_/status/2103881538592981110

I asked opus 5.5 in @agnt_gg for the most realistic fire it could build using ONLY javascript.

It wrote a real 3D fluid simulation that runs on the GPU. The flame colors come from blackbody physics, the smoke is real volume, it runs at 96 fps in 1080p, and it critiqued its own renders about 40 times.

Then it shot a 38 second film of it. The sound comes from the fire itself. 🔥

Details:

- Nothing faked. The fire is actual simulated gas that burns, heats up, rises, and swirls. It gives off soot that glows, and the soot that escapes cools into smoke. Every frame is computed on the GPU.

- The AI graded its own work: render a frame, have a vision model pick it apart like a VFX supervisor, fix it, repeat. It caught a flame that kept dying, ring shaped artifacts on the ground, and coals that looked like cheese chips.

- The film isn't screen recorded. Each frame is rendered offline with scripted camera moves. The crackle and roar come from how brightly the fire burns in each frame.

- No Blender, no stock footage, no sound library. One HTML file, one conversation.

## hunzai-842605 — explainer — tags ['canvas', 'audio']
Post: https://x.com/hunzai/status/2103904436141842605

//Like most of you//  I asked opus 5.5 (medium) to generate animation to explain "Tree as an ecosystem" with AUDIO - no fancy prompts just oneliner prompt - and it created this

## konstantinsaifo-501736 — explainer — tags ['threejs', 'shader']
Post: https://x.com/konstantinsaifo/status/2104094723887501736

I asked Claude Opus 5.5 to explain how a rocket engine works by building an interactive Raptor 3 you can take apart in your browser.

Cut it open, follow the oxygen and the methane through both turbopumps, then throttle it and watch the shock diamonds move.

http://airsup.ai/rocket-engine

## rakhsh-tech-544921 — explainer — tags ['canvas', 'audio']
Post: https://x.com/Rakhsh_Tech/status/2104144532644544921

Claude Opus 5.5 で、ドパガキ用のグラフィックの動画作りが流行っているので、物理演算で落ち着いた音づくりにも挑戦してみました。

弦、笛、太鼓、鈴、水の泡。物理演算できる音をコードにして鳴らしています。映像作りだけではありません。音の表現にも一段工夫を凝らしたい。そんな人はチャレンジしてみる価値があると思います。

グラフィックの動画を作っている人は、ひと味違うサウンドエフェクトも試してみてはどうでしょうか。

#ClaudeCode #物理演算 #Opus

## arthurkatcher-604161 — explainer — tags ['svg', 'gsap', 'audio']
Post: https://x.com/arthurkatcher/status/2104198927549604161

I asked Opus 5.5 to explain how a coding agent works in 40 seconds.

never been this shocked. It animated the whole thing, wrote the music, and landed every cut on the beat.

one message in Claude Code, 14 minutes. Workflow is in the comments 👇

## moguzbulbul-215591 — explainer — tags ['svg', 'gsap', 'css']
Post: https://x.com/moguzbulbul/status/2104206095313215591

I was struggling to explain my UX decisions in interviews, so I made this kind of animation with Opus 5.5

Anyone want the skill?

## irinatoxi-962937 — explainer — tags ['threejs', 'shader', 'canvas']
Post: https://x.com/irinatoxi/status/2104212841657962937

Opus 5.5 just turned a smartphone into a 20-second trip from glass to atoms.

It starts on the phone, dives through the motherboard and chip, then keeps going through the semiconductor structure until you’re basically staring at the atomic scale.

This is the kind of 3D shot that normally looks like a whole studio touched it.

Instead, Opus 5.5 built the sequence.

That’s fucking ridiculous.

## konstantinsaifo-587629 — explainer — tags ['threejs', 'shader']
Post: https://x.com/konstantinsaifo/status/2104216976801587629

I asked Claude Opus 5.5 to explain how a fusion reactor works by building one you can take apart in your browser.

Drag the plasma from 15 million °C, the heat of the Sun's core, to 150 million and watch a city light up.

https://airsup.ai/lab

## stefanostraus-971191 — explainer — tags ['threejs', 'shader', 'canvas']
Post: https://x.com/StefanoStraus/status/2104236916316971191

I asked Opus 5.5 again for an engine you can take apart in the browser

Pistons against magnets at the same shaft speed. Push the RPM, open the cylinders, slow time down to 1/10

Under 15 minutes, and it did not even move the usage meter on my Max plan. The first experiment took half an hour, this one reused the framework the earlier ones built

This is a screen recording, the real thing runs live in your browser

Next I want to find where it breaks, so a game is coming

## timguignard-623571 — explainer — tags ['svg']
Post: https://x.com/TimGuignard/status/2104515756159623571

Just tested Claude Opus 5.5 with Hyperframes.
One prompt (also generated), the result is ok. Not crazy, but with a few more indications and a clear direction, it would probably get much nicer.

The video below is actually a screen record.

## itsahmedharoon-544194 — explainer — tags ['svg']
Post: https://x.com/itsahmedharoon/status/2103986344414544194

Jumping on the Claude Code + Hyperframe bandwagon.

I made this intro completely zero-shot using Opus 5.5.

Claude downloaded and ran an open-source model for text-to-speech, added the turbine sound at the start, layered in the other sound effects, and nailed the motion and visuals.

The accuracy of the whole thing is unreal. I’m in awe.

## stokebuilder-356793 — explainer — tags ['canvas', 'svg']
Post: https://x.com/stokebuilder/status/2103896101120356793

I used Opus 5.5 to generate 50 podcast animations for extremely hard to visualize concepts like Jev for Legal.  Absolutely blown away. 

We're about to see an explosion of visual podcasts, this entire medium is about to shift 

Sharing my prompt below.

【作者补充制作说明】
Go through the entire [episode] cut and add full-screen animations and graphics wherever they help. Be aggressive and over-inclusive: 35–50 moments, at least 2 per chapter. The goal is to fill empty talking-head time, explain ideas, and create visual hooks.

Style. Pick an aesthetic that's genuinely interesting and very, very cool, built in JavaScript with HyperFrames and assembled in Tesseract. Inspiration (all JS, no image assets):

https://x.com/Voxyz_ai/status/2102531681450119426: paper, typewriter-tape labels, hand-drawn marks
https://x.com/donaldjewkes/status/2102801274173587569: halftone, manga and pixel print, kinetic data type

Stay inside the LegalQuants brand (read brands/legalquants/): charcoal, white and black only, Arial, and the supplied lockup top-right, static. Write a shared style bible and a component kit first, so every animation looks like the same show.

Moments I definitely want:

[LIST]

Rules

Whenever anything goes full-screen (animation, screen share or still), one of us is in a corner picture-in-picture, bottom-right, following whoever is talking.
No punch-ins or zooming on the cameras. Keep each speaker relatively centered.
Copy must be verbatim or faithful to what's said. Never invent facts, numbers or quotes.
Sync each animation's beats to the spoken words.
Keep each graphic inside one uncut stretch of audio, and leave a few seconds of faces between graphics.

Process

An Opus 5.5 agent at extra-high effort finds every timestamp where an animation could fill space and hook the viewer, with a concept for each.
Opus 5.5 at medium effort builds each animation.
Opus 5.5 at extra-high effort judges each one once on brand consistency with the others, visual interest, relevance to the narrative and creative judgment.
Only cues the judge considers egregiously bad go back for a fix. No blanket redo loops.
Assemble the full cut with PiP baked into every full-screen visual, and give me a folder of the individual animations.

## henritoivar-445215 — explainer — tags ['canvas', 'svg', 'gsap']
Post: https://x.com/HenriToivar/status/2102832525798445215

Opus 5.5 is an absolute BEAST in creating videos.

I am extremely shocked because my previous attempts with GPT-6 Astra and Grok 4.6 were quite underwhelming, far from production ready video.

The leap here is gigantic.

This is a ZERO shot video.

【作者补充制作说明】
Why Opus 5.5 is so impressive is because it's is not a video generation model. It uses pure code to generate the sound effects, the music. All of the animations are done with CSS/HTML/JS, it doesn't use any video or image assets.

This is extremely useful for creating detailed explainer videos where you need very fine control over the infographics and consistent deterministic output.

The framework I used was hyperframes and narration is done by OpenAI text-to-speech.

## rpa-dake-593915 — explainer — tags ['svg']
Post: https://x.com/rpa_dake/status/2104466394859593915

Claude Opus 5.5 に Remotion のコードを書かせて、検索の歴史を15秒の年表ムービーにしたら、めちゃくちゃアツい🔥

・1996から2015まで、ネオン調の年号がspringで3D回転しながら叩きつけるように出る。
・大学の研究から持株会社への再編まで、各年の出来事を線画のSVGで描き足していく。
・最後は「検索から、すべてへ。」で締める

歴史ものの勢いは、情報量より場面を叩きつける間で決まる。

## aschapmann-724497 — motion — tags ['svg', 'gsap', 'css']
Post: https://x.com/aschapmann/status/2104230888812724497

I couldn't resist to do it one more time, this time for RedShip.. and it's waaaaay better!! 

It took +1h for Opus 5.5 to do it. I used this prompt 👇

save it and try it for your SaaS: 

"Act as a senior motion designer and build a 30-second launch video for [product] in Remotion, entirely in code so I can edit and re-render it: first read my landing page and codebase to pull the real story, copy, colors, font and logo file (trace the logo to SVG so it stays sharp and can be animated), then write the video as one story (why the market matters, why it's painful today, how [product] fixes it, what you get) in 4 to 5 scenes with one short title each, animate everything like a premium product film (kinetic typography word by word, spring easing, smooth camera pushes and pans, depth and glow, elements that build in on the beat instead of just appearing), keep each scene on screen long enough to read, add one soft sound effect for every element that appears and silence otherwise, and end on a memorable animated logo reveal with the tagline and URL, then render it, check the frames yourself and fix anything that overlaps, clips or feels rushed before showing me the result."

## itsyashf-692347 — explainer — tags ['canvas', 'svg']
Post: https://x.com/itsyashf/status/2104227261142692347

Made this small video for a linkedin post with Opus 5.5 + Remotion and 2 screenshots of reference

## daniel-haida-636937 — motion — tags ['canvas', 'svg', 'css']
Post: https://x.com/daniel_haida/status/2104139720829636937

claude code (opus 5.5) made the product film for taxtello, my bookkeeping app

every frame is code: react + remotion, 0 after effects
the soundtrack is code too, synthesized in python from sine waves and noise

1 prompt and 2 rounds of feedback

full prompt below, steal it ↓

You are the senior motion designer, product designer and Remotion engineer for Taxtello.

Your task is to create a genuinely premium, Apple-level product film for Taxtello.

This is NOT a generic SaaS explainer.
This is NOT a feature walkthrough.
This is NOT a startup template animation.

I want a maximum 15-second brand/product showreel that makes Taxtello look like a mature, expensive, beautifully designed financial product.

Think:

Apple product launch film
× premium fintech
× editorial motion design
× restrained Stripe-like product presentation
× Taxtello's own visual identity

The desired reaction is:

“Wait, this is a German bookkeeping app?”

The film should feel expensive.

────────────────────────────────────
REPO / SOURCE OF TRUTH
────────────────────────────────────

First inspect the real repositories before designing anything.

Main product:
  /taxtello/main

Existing Remotion project:
  /taxtello/beta-motion

Important real brand sources:

  /taxtello/main/public/css/app/_00-tokens.css
  /taxtello/main/docs/design/TOKENS.md
  /taxtello/main/public/taxtello-wordmark.png
  /taxtello/main/public/icons.svg

Existing current product screenshots can be found under:

  /taxtello/main/artifacts/smoke-ui-smoke/

Prefer the newest valid screenshots/current source over stale artifacts.

There is already an existing 24-second Remotion hero animation in
/taxtello/beta-motion.

DO NOT replace it.
DO NOT regress it.
DO NOT force its current AI-connections storyline into this new film.

Create a new independent composition for this task, e.g.

  TaxtelloShowreel15

You may reuse good infrastructure, fonts, rendering utilities, motion primitives,
easing curves, asset loading and QA infrastructure from beta-motion where useful.

But creatively this should be a new film.

Before implementation, inspect the actual Taxtello UI and understand the product.

Do not invent functionality that does not exist.

────────────────────────────────────
REAL TAXTELLO VISUAL LANGUAGE
────────────────────────────────────

Use the real design system.

Core palette:

Background:
  #0c0f1a

Elevated surfaces:
  #111525
  #131722
  #1a2032

Primary brand gold:
  #e8b84b

Gold highlight:
  #f5d07a

Gold depth:
  #9b6d18

Primary text:
  #e8eaf2

Strong warm white:
  #f6f4eb

Secondary text:
  #8b93b5

Positive:
  #34d399

Negative/error only where semantically necessary:
  #f87171

Typography:
  Plus Jakarta Sans

Numbers / financial values where appropriate:
  JetBrains Mono

Use the actual Taxtello wordmark and/or Taxtello mark.
Do not redraw or approximate the logo.

Taxtello's gold should feel like a precious accent, not a yellow UI flood.

Think:
dark metal
warm gold
glass
ink
precision
quiet co

## itakahashikun-990109 — explainer — tags ['canvas', 'svg']
Post: https://x.com/iTakahashikun/status/2103731575661990109

ださいけど、Remotion で動画っぽいのつくった。コードは見てない。環境だけ用意した…っていっても、いつものように jj init されるカスタム try コマンドを叩いてディレクトリをつくって「Remotion の環境をプリーズ」だけだわ。なんもしてない。あとは Opus 5.5 とちょっと話しただけだわ。未来だ。

## cboyack-407181 — explainer — tags ['canvas', 'svg']
Post: https://x.com/cboyack/status/2103617085402407181

Asked Opus 5.5 (max) to create a 15-second video about why we need to end the Fed. Behold. 

Took 1 hour 45 minutes to do. It used @Remotion to create it.

## salmanr2d2-661615 — explainer — tags ['canvas', 'svg']
Post: https://x.com/salmanr2d2/status/2103608284825661615

Made with Opus 5.5 and Remotion. #claude #opus #reactnative #currency

## ninjaswebcom-684126 — explainer — tags ['canvas']
Post: https://x.com/ninjaswebcom/status/2103537378283684126

Made with Opus 5.5, remotion y eleven labs. 145k tokens.

## tony-tt-872147 — explainer — tags ['canvas']
Post: https://x.com/_Tony_TT_/status/2103227891009872147

Opus 5.5 on the Trading House

❯ Using React/TypeScript (Remotion), every image drawn in SVG and Canvas, an open-source TTS voice, and a score synthesized in Python. No stock footage. No image generators.

❯ Build a short 30-60s animation work about the Trading House

## samissudo-927179 — explainer — tags ['canvas', 'svg', 'gsap']
Post: https://x.com/samissudo/status/2102860811219927179

created this with opus 5.5 + remotion, the possibilities are endless

## imthatcarlos-133592 — explainer — tags ['canvas', 'svg', 'ai-image']
Post: https://x.com/imthatcarlos/status/2102849219388133592

Opus 5.5 just one-shotted this explainer video for @sherwoodagent 🔥

Since I ran it within the context of our web app, it used existing components and branding to inform the design and used @Remotion skills for rendering

Kind of insane, haven't tried doing any video generation for months, but the latest models are making it easier to create content that is polished without heavy iteration

Prompt: "make a modern slick and punchy video for sherwood protocol. feel free to take branding or components from the landing page or app. the goal is to highlight how it enables agentic hedge funds, explaining it simply"

## 0xlangeai-597929 — explainer — tags ['svg']
Post: https://x.com/0xlangeai/status/2106391068367597929

哈哈,   别再急着买API, 用 CLIProxyAPI 盘活你的 AI 订阅这篇文章的视频版宣传片来了

全程使用 Opus 5.5 + remotion 制作 

感觉还不错的 ,  把流程环节都给讲清楚了

## xamfonos-004331 — explainer — tags ['svg']
Post: https://x.com/xamfonos_/status/2107809209593004331

Opus 5.5 + Remotion 🤓

## tetsu-tetsu333-576886 — explainer — tags ['svg', 'gsap']
Post: https://x.com/tetsu_tetsu333/status/2106177888265576886

Opus 5.5×Gemini 3.8 Flash TTSやばい

新作SEOツール「コトサーチ」のリリース動画を、ほぼ自動で作ってくれた。
自分がやったのは「ツールへのログイン」と「承認」だけ。

個人的には、画面スクショまで自動で撮ってくれるところが一線を超えた感じ。
(もちろんナレーションも自然すぎてすごい..)

具体的な手順はこんな感じ👇
① Claudeがブラウザでツールにログイン
（ここだけ自分でやった）

② Claudeがアプリを触って、機能仕様書を作成
機能・料金・言っちゃダメな表現まで整理

③ Claudeがツールの画面スクショを撮影
PC・スマホ・パーツ切り出しで38枚

④ Claudeが絵コンテとナレーション原稿を作成

⑤ ClaudeがRemotionで動画を実装
書き出した静止画を自分で見て、文字切れや重なりまで直してくる

⑥ Gemini 3.8 Flash TTSでナレーション音声を生成
声の設定も原稿の入力もClaudeが操作

⑦ Claudeが音声を32フレーズに分解
話した瞬間に画面とテロップが出るよう自動で同期

⑧ BGMはClaudeがコードで作曲
声の下では自動で音量を下げてくれる

⑨ 52秒の動画が完成

ということでSEOツール「コトサーチ」は10月4日に正式リリースです。
キーワードを入れるだけでSEO記事ができて、サイト全体の内部リンクまで整えられます。
明日のリリースをお楽しみにしててください！！！

## aylmerth-356252 — explainer — tags ['canvas']
Post: https://x.com/AylmerTH/status/2105346401878356252

I made this with a two sentence prompt using Opus 5.5 and Remotion.

## falcong-j-277506 — explainer — tags ['svg', 'gsap']
Post: https://x.com/FalconG_J/status/2105033204319277506

「Opus 5.5なら数分でできる」は本当か。

記事の冒頭に置く30秒の動画を、Remotionで作りました。
1本目は、依頼してから10分33秒。
最初の1秒から、主役の文字が大きく動きます。

作り方の手順とプロンプトは、引用先の記事へ。

## heyiamnick-119558 — motion — tags ['canvas']
Post: https://x.com/heyiamnick/status/2109174851412119558

<direction>
Build a 30-second looping motion design showreel that introduces CLAUDE, a motion designer.
Concept, in one line: one pencil line gets promoted three times (graphite on paper, wire on a blueprint, light on black) and never leaves the screen.

Every shot is made out of the previous one: shapes, type and colour transform into the next scene. No cuts, no fades.

Typeface: Geist only. Weight 900 for big words, 600 to 800 for small labels (24 to 28 px, tracked 0.14 to 0.3 em).
Palette: paper cream #EDE6D5, blueprint blue #1B3ED2, hologram cyan #45F0DD, plus black #07080A, graphite #16161A and white. Each stage's accent is the next stage's colour: blue pencil on paper, cyan on the blueprint, white on the hologram.
Camera: locked and front-on for the whole film, like a drafting table. Objects turn; the camera never moves.
Empty border: nothing at rest within 150 px of the sides or 90 px of the top and bottom. Things travelling through may cross it.

Three inks. The same geometry is drawn in whichever ink is on screen:
- PAPER: a cream paper background (use my paper image if I give one, otherwise flat cream with fine drawn grain) with a 60 px blue grid at about 13% and every fifth line at 26%. Lines are pencil: resampled and pushed off true by slow sine waves whose phase changes 8 times a second, stroked twice (full width at 90%, half width at 40% with more wobble), with paper tooth knocked out of the strokes, then multiplied onto the paper. Fills are diagonal hatching drawn on one line at a time. Big type is hatching cut to the letter shapes, with a doubled outline.
- BLUEPRINT: flat blue with the same grid in white. Clean white lines 3 to 4 px, hidden edges dashed and thinner, fills are fine clean hatching.
- HOLOGRAM: black with the same grid in cyan. Cyan lines with a white core 30% of the line width. Fills are horizontal scan lines on an 8 px pitch whose thickness follows how lit the surface is. No blur halo anywhere: it reads as light through line density only.

Banned: particle bursts, glows, lens flares, camera shake, RGB split, crossfades, generic gradients, bouncy easing, holds longer than half a second, anything that looks like a template.
</direction>

<structure>
120 BPM, 60 beats, 15 bars of 2 seconds. Something happens on every beat. Moves start 0.05 s before their beat so they land on it.
Easing: a critically damped spring, 1 - (1 + w t) e^(-w t) with w between 12 and 40, so nothing ever passes its target; exponential ease-in and ease-out for wipes, presses and exits.
Scene changes: paper to blueprint by a shape that floods the frame with a hard edge; blueprint to hologram and hologram to paper by one horizontal scan line.
The last frame is the first frame, so it loops.
Two corner labels stay on all film: top left "FIG. 07 — GEAR" (bar number and name), bottom right "BEAT 27 / 60". Bar names: DRAFT, TYPE, CURVE, MORPH, TILE, SOLID, GEAR, PANEL, DATA, LIGHT, WAVE, GLOBE, DRUM, FORM, END.
</structure>
<mascot>

The creative dire

## aichrislee-408244 — explainer — tags ['threejs', 'shader', 'svg']
Post: https://x.com/aichrislee/status/2108709764817408244

Build me a camera lens in interactive 3D, in one HTML file with Three.js.

Make it look real: a big black pro zoom lens with its glass front, the rubber focus and zoom rings, the red stripe and the white numbers, and inside it the parts you never get to see. The stack of glass elements in their groups, the aperture blades that open and close, the focus motor, the image stabilizer, the zoom cams, and the gold contacts on the mount. Cut it open down the side so I can see the glass inside, with light passing through it as colored beams that bend and meet on the camera sensor behind it. The aperture blades open and close slowly. I can drag to orbit around it and scroll to zoom.

Add an Explode button. When I press it, every part slides apart along the lens with its name on a label. Press it again and it all snaps back together. When I hover a part, it lights up and shows one line on what it does.

No images. Do not ask me any questions. Just build it.

## 0xspikez-483865 — explainer — tags ['threejs', 'shader', 'svg']
Post: https://x.com/0xSpikez/status/2108550549532483865

an interactive 3D turbofan you can take apart in the browser, built with Three.js.

suck, squeeze, bang, blow, every stage labelled:
> the fan pulls in a huge mass of air. most of it bypasses the core and makes most of the thrust
> compressor stages squeeze the air about 40 times, heating it
> fuel burns hotter than the turbine metal's melting point
> the blades survive on cooling air and heat-resistant coatings
> two shafts, one inside the other, spinning at different speeds

then it explodes into every stage.

## eyadnour-172216 — explainer — tags ['threejs', 'canvas', 'audio']
Post: https://x.com/eyadnour/status/2108314868189172216

Build an interactive explainer on how QR codes hold and repair a message. Render fully in the browser using Three.js. Include treatment for visuals and sound design.

## aichrislee-378670 — explainer — tags ['threejs', 'canvas', 'audio']
Post: https://x.com/aichrislee/status/2107985027254378670

Build me a human heart in interactive 3D, in one HTML file with Three.js.

Make it look real: the deep red muscle with the red arteries and blue veins on top, and inside it the parts you never get to see. The four chambers, the four valves, the aorta and the pulmonary artery, the veins bringing blood back, and the wiring that sets the beat. The heart beats about once a second, the valves open and close in time, and the blood flows through it, blue going in and red going out. I can drag to orbit around it and scroll to zoom.

Add an Explode button. When I press it, every part slides apart with its name on a label. Press it again and it all snaps back together. When I hover a part, it lights up and shows one line on what it does.

No images. Do not ask me any questions. Just build it.

## fleyta88-443662 — explainer — tags []
Post: https://x.com/fleyta88/status/2108249741125443662

Build a GSAP timeline for UI cards with specific timing constraints: 280ms for cards, 220ms for title, 160ms for metadata, and a 60ms stagger between elements. Implement a verification loop where the animation is stepped through frame-by-frame using Playwright, screenshots are compared to detect overshoot or errors, and the code is patched until it passes the checks without rewriting everything.

## wilzerjb-007630 — explainer — tags []
Post: https://x.com/wilzerjb/status/2107892042320007630

Create me a motion explainer video for my business @aidellyai

## eleanorina-653042 — explainer — tags []
Post: https://x.com/_eleanorina/status/2107841006909653042

Build the latest FrankenManim version on my Mac and then use it to create a nice 3b1b-style explainer video about Hoeffding's D. Use FrankenTTS to provide the narration.

## twoclipping-041659 — interactive — tags []
Post: https://x.com/twoclipping/status/2107822293653041659

<inputs>
Ask me for: a voiceover or song with a spoken line (the audio file) and its transcript, 10-12 small objects that sum up my life, two silhouettes to light like a heat camera (a head in profile and a raised hand), and the 3 words I want to land hardest. If I skip any, use the defaults: vinyl, book, camera, cat, coin, game controller, cap, heart, money, plant, clapperboard, skateboard; free CC0 silhouettes from Openverse; action, intention, curiosity.
</inputs>

<direction>
A 20 second 4:3 film, 1440x1080 at 60fps, cut to the voice. Off-white paper, black, one red, one yellow, Geist for every word. Film grain on everything, a soft vignette, and a camera that never rests: a slow handheld float under everything plus a slow push inside every scene.
No scene cuts to the next: each handoff starts on the exact last frame of the scene before. The only hard cuts are the beat flips on the last word.
Every object is pixel art you draw yourself: a 16x16 grid per object, every cell a hand-placed colour, rendered as a 3D block (a darker extrusion down-right, a thin bevel on every cell) with a soft contact shadow.
The silhouettes are lit like a heat camera: the heat comes from how thick the body is at each point, so the nose, the hair and the fingertips run cooler, plus one hotspot and a slow moving noise, mapped through a black > red > orange > cream ramp. The edge stays razor sharp, with a soft glow outside it.
Motion rules: nothing pops in (eased glides of about 0.5s with a soft start), fast moves get real motion blur instead of ghost copies, and captions type with the voice behind a block cursor.
Banned: stock footage, AI video, 3D camera moves, particles, glitch.
</direction>

<structure>
Hang every scene on the transcript's word timings (measure them with faster-whisper word timestamps, one short chunk at a time):
1. The first word fills a yellow card. The card wipes off to the left and the question types underneath on two centred lines that glide to stay centred as they grow, the key word underlined in red as it's spoken.
2. The objects streak past in lanes above and below the words, a cyan four-point flare sweeps in, then the page burns away: black closes in from the edges onto the head, behind a hot red edge.
3. The head heats up on black while the answer types low on the left. A thin white orbit draws itself around the head, its far half passing behind it. On the last word, paper blooms out from inside the head with the objects in it, and the camera falls through: the head rushes past the lens until the paper is all we see.
4. The objects sit on a tilted ring seen in perspective (the front ones bigger and lower, drawn last), slowly turning, each one bobbing; the coin flips and lands with sparks.
5. On each of the 3 words, that object flies out of the ring to the left and grows, the page floods black from it, and the word types beside it (camera: a red shutter star; book: a red ribbon sweep; record: two white orbits and red notes). Then the floo

## nakazakifam-831964 — explainer — tags []
Post: https://x.com/nakazakifam/status/2107715000227831964

NextCoreのような海外のカッコイいYouTubeチャンネルをオマージュした、タイポグラフィとコードだけで作成する心理学解説動画を作ってください。画像生成AIや動画生成AIは使わず、全てコード（HTML/CSS/JSなど）で表現できる描写に制限して作成します。数秒ごとに連続で異なる描写スタイルに切り替わりながら進む構成にしてください。

## incognitoprince-849212 — explainer — tags []
Post: https://x.com/IncognitoPrince/status/2107664651760849212

Create a 1-minute explainer video about [Topic] featuring After Effects style kinetic text animations. Use HTML/CSS/JS to render the animation with smooth transitions, bold typography, and timed reveals. The final output should be a standalone web-based animation file that can be recorded or exported as a video.

## rossaxbt-312793 — 3d — tags []
Post: https://x.com/rossaxbt/status/2107483570885312793

<inputs>
Ask me for: one question a user asks my product and its one-line answer, two album covers, a royalty-free song around 110 BPM with a quiet intro and a hard drop (Mixkit, free for commercial use), and my logo for the ending. If I skip anything, use these defaults: "is this all code?" / "yes. every frame.", two atmospheric photos, and Mixkit "Head Bang".
</inputs>

<direction>
A 22-second square loop, 1440x1440 at 60fps. 2D only, one continuous take. Nothing cuts: each scene grows from the one before it, and every gesture carries the camera into the next space. Each morph takes 0.8s on cubic-bezier(.45,0,.15,1). The camera zoom follows the same curve, making the shape changes feel almost invisible. Content dissolves during the second half of each glide. One gesture per scene.

Look: a warm light stage (#f3f3f0 to #e3e3de), black UI, and a dark app world (#121212) tinted by the current album cover. Use one green accent (#1ed760), Geist for UI, the real macOS pointer, and soft layered shadows that grow as shapes lift.

Banned: hard cuts, bouncy springs, particles, glows, zooming in and immediately back out, holds longer than 1s, anything that feels like a template.
</direction>

<structure>
Follow the song's beats. The press lands on the drop.

Generate: the cursor clicks. The pill glides into a spinner, then becomes a check.

Chat: the check splits into three typing dots with goo. The left dot flies up, becomes the question bubble and types the question. The right dot flies down into the reply. Both bubbles shrink back into dots as they glide toward the center and merge with the middle dot.

Play: the middle dot bends into a play triangle, one point at a time. The cursor presses it on the drop. A white button appears under the click as the dark app floods the frame around it, leaving the white shape as the play button. The camera pulls back to reveal the full now-playing screen: large cover, title, heart (liked, filling green), progress bar, controls and volume.

Swipe: the cursor drags the cover sideways. The next track slides in, and the app changes its tint to match the new cover.

Drag: the camera glides toward the volume slider. The cursor pulls it to max and keeps going. The bar rubber-bands, dragging the camera sideways out of the app and onto a dark dotted canvas while the camera follows the knob.

Chart: the line lands and curves upward into a green chart as the number counts up. The volume knob becomes the chart's final point.

Dive: the cursor clicks that point. The camera dives into it until the light stage fills the frame.

Ending: an "Ask [my product]" button grows from the light, narrows into a line, then fans out into my logo (default: the Claude spark, with six copies rotating into twelve rays in Claude orange). Hold for 2s.

## rashadmirza404-020971 — explainer — tags []
Post: https://x.com/RashadMirza404/status/2107310721600020971

Create a self-contained, aesthetically pleasing, breathtaking animation of optogenetics: how a light-sensing protein from green algae became a light switch for brain cells. Use JavaScript on a single canvas, all in one HTML file. Be detailed and scientifically accurate.

## nilou-salehi-458567 — explainer — tags []
Post: https://x.com/nilou_salehi/status/2107184179947458567

Take a look at our documentation and the product ux and generate a marketing video which narrates how our product works

## ivysparkleai-543294 — explainer — tags []
Post: https://x.com/IvySparkleAI/status/2107065771658543294

A sung explainer from @leploutos gave me an idea: what if AI agents explained themselves over a house groove? Ten Treblo tracks, one human choice. Then Opus 5.5 got one brief: turn the chosen song into a film, not a slideshow. It built the motion, synced the words, rendered, checked and fixed its own work. Almost one-shot from our side—not one untested take. No editing timeline dragged by hand. Follow the copper thread. It becomes something else 😉 Taste set the direction. An experiment from our @agenticrealism world. Curious about the thinking behind it? Our articles go deeper. Link below. Agentic Music. This is Crazy.

## archiveexplorer-560622 — explainer — tags []
Post: https://x.com/ArchiveExplorer/status/2106732275685560622

Write my launch video as 9 beats: pain, reframe, name, how it works, objection, range, mechanism in numbers, offer, CTA – one line each. For every beat write 3 headline options and send them to Jev to pick the one that best fits my brief. Build each beat as a wireframe first in HyperFrames: boxes, outlined text, guide lines, no color. Show me one still per beat and lock the timing. Then skin it from my DESIGN.md without moving the layout, and render a split view: final on the left, wireframe on the right.

## xodud-rkd-160324 — explainer — tags []
Post: https://x.com/xodud_rkd/status/2106732228181160324

Make a pixel motion video of all human progress, then 30 years into the future. Output in mp4

## cryptoxorz-359201 — explainer — tags []
Post: https://x.com/Cryptoxorz/status/2106632900049359201

Help me make a science explainer video. Topic: {Topic} (Supplementary materials: {Paper/Link/Screenshot, Optional}; Target audience: {Zero-basis public / Some basis, Optional})

- Content: Explain one core question clearly, with a curiosity hook, counter-intuitive points, and life-like analogies, but facts must be accurate and sourced.
  - Prioritize citing original papers, authoritative institutions, and textbooks; do not use secondary marketing accounts.

## haribuilds-007643 — explainer — tags []
Post: https://x.com/hariBuilds_/status/2106440528435007643

Build a complete data animation about Earth’s most isolated location. Visualize Point Nemo, orbital altitude vs. terrestrial distance, and the oceanic spacecraft cemetery.

## ulyssexbt-205279 — explainer — tags []
Post: https://x.com/ulyssexbt/status/2106383971093205279

Make a film about its own prompt.
15 seconds. 0 keyframes. 0 samples
every frame is code. every sound is code. even the equalizer is dancing to its own soundtrack

step 1 → score first - the music is written in code at 120 BPM, every beat exported as data
step 2 → one function draws everything - seek(t) paints frame t, no timers, no randomness
step 3 → the visuals hear the song - FFT on its own mix, the bars are the real track
step 4 → it grades itself - one still per beat, scored 1-10, fixes the lowest on camera

## henrygsing-050247 — explainer — tags []
Post: https://x.com/HenrygSing/status/2106208175792050247

给它一份讲稿和一段“导演要求”（风格参照 Kurzgesagt × 皮克斯开场）。它先出方案，我确认后再动手。它先写 STORYBOARD.md，每一场写清时间、画面、文字、转场。用 Remotion 一场一场搭。还有一个就是在本地用微软的TTS 生成语音。免费。

## michaelraspuzzi-740595 — explainer — tags []
Post: https://x.com/michaelraspuzzi/status/2106083592820740595

explain loop transformers in a youtube animated short. search web for some real papers to read too.

switch up scenes, and make the visual narrative more compelling. also, make sure hook creates a curiosity gap for real world application on why this matters.

## woojinrad-455731 — explainer — tags []
Post: https://x.com/woojinrad/status/2106083299462455731

Read the attached article and make a 25-second animated explainer (1080×1350, 24 fps) in a colored-pencil storybook style, drawn entirely in JavaScript on an HTML canvas, with a soundtrack synthesized using the Web Audio API. Pick 3 main ideas, give each a short caption taken from the text, and use one simple original character. Show me the storyboard first, then render it to MP4.

## twoclipping-747965 — motion — tags []
Post: https://x.com/twoclipping/status/2105927781678747965

<inputs>
Ask me for: my product's name (nightshift) (one lowercase word, it becomes a black wordmark with a period), the one job a user hands it before bed (book 10 sales calls this week), the three results it reports by morning (200 leads found / 200 emails sent / 10 calls booked), two photos of the same place at night and by day (aligned, so a crossfade reads as a real sunrise), one sunny daytime photo for outside the logo, and a song with a big hit near its start. If I skip any, use the defaults.
</inputs>

<direction>
A 24 second square product launch video, 1440x1440 at 60fps, 2D only, one continuous take that loops. The whole video happens inside the period of the wordmark. Outside it's daytime (the sunny photo behind a black wordmark). Inside it's the night photo under iOS-style glass panels (the blurred photo behind each panel, a tint, a rim light). Nothing cuts: every scene grows out of the last, shapes morph, dots fly, colours change under floods. Every morph glides 0.8s on cubic-bezier(.45,0,.15,1) and the camera zoom rides the same curve. Geist, the real macOS pointer, soft shadows that grow with each shape's height.
Banned: flat or gradient backgrounds made in code, camera zooms into tiny points, hard cuts, crossfades between scenes, bouncy springs, particles, glows, holds longer than 1s, cropped type.
</direction>

<structure>
Beats are the song's. The song enters on its big hit as the first pill appears.
Open: the letters slide into the period and vanish into it while it glides to the middle. The period opens like an iris onto the night inside it, and "you log off at 6", then "[product] doesn't", roll through one mask line over the night photo.
Ask: a glass "Ask [product]" pill springs in. The cursor clicks it, it glides into an input and the job types out.
Find: send shrinks the input to a dot that ripples into a 23x15 grid. A scan line sweeps it, 200 dots light up and a counter counts them.
Write: the lit dots pour into a glass email composer. A second, purple cursor labelled "[product]" types a personal opener and presses Send, and the counter runs to 200/200.
Night: the composer becomes a glass orb with a progress ring. A clock chip swaps 11:42 PM, 3:17 AM, 5:02 AM, 6:59 AM while the sky relights from night to dawn and "while you sleep" rolls in.
Results (beat 20): the orb turns black and goo-splits into the three result pills. The checks pop green.
Morning: the pills merge into a Dynamic Island that grows into a phone lock screen: the day photo, the date, a big 7:00, the bezel growing out of the screen edge. Three glass notifications stack in, and the cursor taps the first, which opens like iOS.
Proof: a week calendar (10 meetings pop in, a hover shows one's time), then a pipeline chart ($48,200 counts up, the line draws, a hover follows it). A black flood from the line's end becomes "Start your night shift →" and the cursor clicks it.
Out: the button shrinks into a dot, the whole scene closes down into it like an iris, and th

## koushikde-937635 — explainer — tags []
Post: https://x.com/_koushikde_/status/2105730717455937635

Make a 15s motion video in code (1920x1080, 60fps, one HTML file drawing every frame from a single seek(t) function, rendered with Playwright + ffmpeg, original synthesized sound at 128 BPM).
Idea: a blank résumé fills itself in, one skill per bar, and every skill gets proved on screen before it's ticked.
Story: a paper résumé slams onto a dark page and its rows type in (skills, type, systems, depth, data) → the camera pushes into the orange bullet until it floods the frame → five skill meters fill, each on a different curve → one word swings from thin to black on the beat, then flips through six typefaces → a dot grid ripples and resolves into a pixel mascot → a square tunnel flies at the camera and an extruded "3D" slams out → bars trace a spring curve while a counter lands on the reel's real frame count → "EVERY FRAME ON THE BEAT." one word per beat → the résumé comes back, filled in, mascot in the photo box.
Rules: one orange accent carries every transition; springs, never linear; every state change sits on the beat; no corner labels, no fake HUD numbers.

## gdgtify-989608 — 3d — tags []
Post: https://x.com/Gdgtify/status/2105669567036989608

Create a 20.00-second kinetic typography film titled “ESCAPE THE ORBIT,” based on John F. Kennedy’s Rice University address, September 12, 1962.

The central experience: a sentence discovers that it can change its own trajectory.

Deliver one complete, self-contained HTML file. Composition: 1080×1080. Target: 60fps. Use Canvas, SVG, or embedded WebGL. Embed required assets and libraries. The film must work without audio.

EXACT DISPLAY TEXT
“We choose to go to the moon”
“[…]”
“not because they are easy,”
“but because they are hard”
Preserve this order. The bracketed ellipsis explicitly indicates omitted speech. Attribution is separate from the excerpt. No additional slogans.
ART DIRECTION
Background: midnight # 080D23.
Primary type: warm white # FFF4DD.
Trajectory: electric coral # FF654F.
Secondary orbital geometry: blue # 6685FF.
Use a broad, confident grotesque for the speech and a sharply drawn italic for the final emphatic word. Avoid the appearance of a spacecraft dashboard. No rockets, astronaut illustrations, starfield wallpaper, lens flares, or decorative telemetry.
The frame should resemble an exceptionally refined astronomical instrument that has become expressive.

CENTRAL VISUAL RULE
The baseline of the sentence is a trajectory.

At first it is trapped in a closed orbit. A rhetorical decision changes that orbit into an open path. The letters remain the same travelers throughout.
Use an abstract orbital metaphor; do not present invented mission data or imply a physically accurate flight simulation.
STORYBOARD
0.00–3.50
The opening excerpt appears across the center, large and horizontal. Reveal it in three meaningful phrase groups.
A single hairline ellipse passes behind the baseline. A small circular lunar mark occupies its distant focus.
Hold the completed phrase motionless for 700ms.

3.50–6.00
The camera pulls back. The previously straight baseline reveals a shallow curvature.

The phrase travels along the ellipse as a coherent unit. Keep its glyphs upright during the initial movement. Only after the reading hold may they progressively adopt the tangent of the path.

The viewer realizes the sentence is circling rather than advancing.
6.00–7.00
Show the bracketed omission in an uncluttered central opening. The orbital movement decelerates.

7.00–10.50
Reveal the next clause on the near side of the orbit. Its final word travels through one smooth, effortless arc and returns toward where it started.

This ease should feel elegant but unproductive. Avoid comic bouncing.

10.50–14.50
Reveal the final clause horizontally before transforming it.
At its emphasis, the ellipse opens at one precise point. The same tracked letter group takes the new tangent and departs.
Perform one deliberate 70-degree camera roll. Counter-rotate the active phrase so it remains readable while the orbital field changes orientation around it.

The trajectory sweeps from lower left to upper right. Acceleration is conveyed by expanding spacing between its trailing

## gabzofar-852359 — explainer — tags []
Post: https://x.com/GabZoFar/status/2105657821475852359

Make one 60-second, 60 fps, Apple-style motion-graphics product film for Kirocast (https://t.co/YDA5cSDcTa, "The MacOS screen recorder built for AI."), in two versions: 16:9 at 1920×1080 and 9:16 at 1080×1920 for Instagram Reels and TikTok. Both versions share the same timeline

## gdgtify-130294 — explainer — tags []
Post: https://x.com/Gdgtify/status/2105570411870130294

Create a 20.00-second kinetic spoken-word film titled “BUILD THE FLOOR.”
Treat this as an original miniature speech staged inside a typographic field. Every line reorganizes the field of the frame. The final declaration must stand on a field that finally lies flat.
Deliver one self-contained HTML file, 1080×1080, targeting 60fps, using SVG and/or Canvas. Embed all required assets.
ART DIRECTION
Background #102820. Letterforms # F4E9D5. Field lines and filings # F2B544. A magnetic-monument world: streamlines, flux, stillness at the null. Typography stays crisp; particles are atmosphere only. High-contrast serif for the speech, heavy grotesque for load-bearing words, restrained monospace for flux gauges. No horseshoe magnets, lightning, electron diagrams, or sci-fi arcs.
ORIGINAL SPEECH — EXACT WORDS, EXACT ORDER
“We were told to wait.”
“So we learned the weight of waiting.”
“Then one voice made room.”
“Then another.”
“Now the floor belongs to us.”
Do not attribute these words to any real person. No extra slogans. The complete speech must be understandable without audio.
CENTRAL VISUAL RULE
Words have assigned field roles. WAIT is a repelling plate; letterforms lean away from it, kerning compressed. WAITING is field lines sagging under load while filings stream toward the low side. VOICE is one pole reversed; the field reorganizes and letters stand upright along it. ROOM is a null point, a still eye inside the field. FLOOR is the field flattened into a horizontal plane. These roles must emerge from the actual letterforms responding to the field, not from illustrations.
STORYBOARD
0.00–3.00 — “We were told to wait.” The sentence leans away from the WAIT plate; streamlines compress against it. Available space pinches on the plate side; the sentence remains readable, pressed but intact.
3.00–6.50 — “So we learned the weight of waiting.” Reveal in phrase groups. Field lines sag deeper with each phrase. Filings — deterministic, hash-seeded per id and time — drift along the streamlines toward the low side and gather. The WAITING glyph hangs tilted inside the field as a suspended load.
6.50–10.00 — “Then one voice made room.” VOICE enters; one pole reverses. The field reorganizes: old streamlines retract by dash-offset while new ones draw in. Letters rotate upright along the new field — analytic rotation of whole glyphs, never path morphing. ROOM opens as a null point, a still eye; the counter of the O in ROOM is its center, and the next composition sits calm inside it.
10.00–12.50 — “Then another.” A second pole turns. The field becomes symmetric; every letter stands vertical. The baseline levels into the first perfect horizontal in the film. Hold absolute stillness for at least 400ms — even the filings pause.
12.50–16.00 — “Now the floor belongs to us.” The field flattens into a hor

## mablesjoseph-735781 — explainer — tags []
Post: https://x.com/mablesjoseph/status/2105472483054735781

Can you generate a motion graphics explainer in the visual style of this post and using all its content? I will leave the details up to you. I want you to show off what you can do so you have full creative freedom within those styling constraints. I want to give this to my engineers at my company. I want you to be proud of the final product. Utilize the elevenlabs and remotion tools at your disposal and let me know if you don't see them for some reason. Use whatever you want in those tools to make the most polished product that you would be proud of. Source Article : Context Tax - X article from the article

## blueoctopusai-270222 — explainer — tags []
Post: https://x.com/blueoctopusai/status/2105116391439270222

Make a motion graphics video that explains how the First & 10 Yellow Line works.

## jdverolme-302685 — explainer — tags []
Post: https://x.com/jdverolme/status/2105013143596302685

I need a 1-minute motion graphics video about the history of AI up to today, with a short introduction. Your role is a motion designer. Go all-in.

## adomicael-707503 — interactive — tags []
Post: https://x.com/adomicael/status/2104977482818707503

Create an interactive explainer animation showing what happens when you ask an AI a question. Visualize the path from a phone, through fiber optic cables across the US, into a data center, passing through 8 GPUs, down to a single transistor, and back with the answer.

## sudo-kiran-670892 — explainer — tags []
Post: https://x.com/sudo_kiran/status/2104846546768670892

make a dynamic 30-seconds motion graphic video about the distilbook like a product explainer the video has to be very incredible (product url) https://t.co/BcbRbZVf1d

## king1818888-642123 — explainer — tags []
Post: https://x.com/king1818888/status/2104764925478642123

请帮我上网研究大家怎么用 Claude Opus 5.5 制作动画，整理成一套清楚的操作流程，再用这套流程亲手做一部「如何用 Opus 5.5 做动画」的教学动画。

第一阶段：资料收集

1. 搜寻范围：YouTube 教学影片（可读字幕或说明栏）、X/Twitter、Reddit（r/ClaudeAI
第三阶段：制作教学动画

1. 内容：用动画呈现第二阶段整理出的流程，让没有经验的人看完就知道怎么开始。
2. 长度：约 【2-4】 分钟，分成 【5–7】 个段落（开场 → 各步骤 → 小技巧 → 结尾总结）。
3.

## charlessieg-370949 — explainer — tags []
Post: https://x.com/charlessieg/status/2104688668405370949

I want a snappy futuristic promo video for the launch of AccelaStudy AI Test Prep. Be sure to showcase the best features and reasons for using the product.

## twoclipping-762046 — 3d — tags []
Post: https://x.com/twoclipping/status/2104674464868762046

<inputs>
Ask me for: the one question a user asks my product and its one-line answer, two album covers, a royalty-free song around 110 BPM with a quiet intro and a hard drop (Mixkit, free for commercial use), and my logo for the ending. If I skip any, use the defaults: "is this all code?" / "yes. every frame.", two atmospheric photos, Mixkit "Head Bang".
</inputs>

<direction>
A 22 second square loop, 1440x1440 at 60fps, 2D only, one continuous take. Nothing ever cuts: every scene grows out of the last, and every gesture physically carries the camera into the next world. Every morph glides for 0.8s on cubic-bezier(.45,0,.15,1) and the camera zoom rides the same curve, so shapes change so smoothly you barely notice. Content dissolves in the back half of each glide. One gesture per scene.
Look: a warm light stage (#f3f3f0 to #e3e3de), black UI, the app world dark (#121212) tinted from the current album cover, one green accent (#1ed760). Geist for UI, the real macOS pointer, soft layered shadows that grow with the shape's height.
Banned: hard cuts, bouncy springs, particles, glows, zooming in and straight back out, holds longer than 1s, anything that looks like a template.
</direction>

<structure>
Beats are the song's, and the press lands on its drop.
Generate: the cursor clicks, the pill glides into a spinner, then a check.
Chat: the check splits into three typing dots (goo). The left dot flies up into the question bubble and types it, the right one flies down into the reply. Both contract back into dots while gliding in and pour into the middle one.
Play: the middle dot bends into a play triangle, point by point. The cursor presses it on the drop: a white button pops in under the click and the dark app floods out around it, so the leftover white becomes the play button. The camera pulls back to reveal the full now-playing screen: big cover, title, heart (liked, fills green), progress, controls, volume.
Swipe: the cursor drags the cover sideways, the next track slides in, and the whole app retints from the new cover.
Drag: the camera glides to the volume. The cursor drags it to max and keeps pulling: the bar rubber-bands and drags the camera sideways out of the app, tracking the knob across a dark dotted canvas.
Chart: the line lands and bends up into a green chart while the number counts up. The volume knob becomes its last point.
Dive: the cursor clicks that point and the camera dives into it until the light stage fills the frame.
Ending: an "Ask [my product]" button grows out of the light, thins into a line, and the line fans out into my logo (default: the Claude spark, six copies rotating into twelve rays in Claude orange). It folds back into the line, which thickens into Generate. Last frame = first frame.
</structure>

## andrewmichaelsa-385936 — explainer — tags []
Post: https://x.com/andrewmichaelsa/status/2104490962139385936

Take a look at our Youtube for example animated explainer videos, review our brand guidelines for style reference, review this blog post, and our codebase to understand the new feature. Generate screenshots if needed, visit our site, grab any assets you need, and generate an explainer video to explain Site Optimization.

## deeprajo1-623150 — motion — tags []
Post: https://x.com/deeprajO1/status/2104490501340623150

Create a dynamic 30sec launch vdo for your site url here. Make it feel like a high-end motion designer’s resume/showreel piece, bold, cinematic, polished, and visually impressive. Showcase the website’s identity, UI, features, and overall concept through fast-paced motion graphics, smooth transitions, kinetic typography, creative camera movements, and strong visual storytelling.

Go all out with the motion design. Make every second feel intentional and demonstrate exceptional creativity, timing, composition, and animation quality. The final video should feel like a professional product launch + motion design showreel, not a generic website promo.

## buildfastwithai-780900 — explainer — tags []
Post: https://x.com/BuildFastWithAI/status/2104451249269780900

generate a creative mp4 video on indian civilisation with music and sound effects.

## noah-z-zhang-765393 — explainer — tags []
Post: https://x.com/noah_z_zhang/status/2104408692816765393

<direction>
Dribbble-level dark-mode UI motion. One continuous timeline, 0 hard cuts. 
Canvas: Pitch black (#000000) with subtle grid texture.
Pacing: Strict 120 BPM, punchy kinetic typography.
Camera: Snappy
</direction>

## gandamu-ml-124280 — explainer — tags []
Post: https://x.com/gandamu_ml/status/2104402167906124280

Create a player and tools for Another World's approach to animation. Also create a realtime video for Kavinsky-Nightcall starring Lester from Another World driving to the lab. Use crude compression for binary+data <250KB.

## deedydas-407965 — explainer — tags []
Post: https://x.com/deedydas/status/2104391577091407965

every single open source repo should have an explainer video like this 7min one for SQLite

1. explains what the repo does and why its useful
2. shows a high level map of the code (beautiful graphic!)
3. life of a query through the codebase
4. the core abstractions in the repo
5. a real trace of execution and what happens, with a bit on join-order query planning

and yes, this was all generated by opus 5.5 w/ gemini 3.8 tts. i sound like i'm on repeat, but im in shock at just how coherent and capable this model is. 

everything truly is code.

## koldo2k-741714 — explainer — tags []
Post: https://x.com/koldo2k/status/2104114332430741714

Explain the color wheel in a dynamic ~20-second motion graphics video, same energy as a motion designer's showreel. Use the classic 12-hue artist's wheel and cover

## linke1427832-343079 — explainer — tags []
Post: https://x.com/linke1427832/status/2104099543839343079

Make a cinematic 2-minute video on the history of artificial intelligence, titled "Building the Brain: A History of Artificial Intelligence". Make it epic and emotional, like a documentary trailer. Go all out.

Compose the soundtrack yourself, fully synthesized in code. No samples, no audio files, no VST instruments. Cut the visuals to the music.

1920x1080, 60fps. No downloaded images or footage, every frame generated in code. Render the final video with the music mixed in as an MP4 and save it [here] (your preferred file location).

## astroboysoup-861770 — explainer — tags []
Post: https://x.com/astroboysoup/status/2104063140371861770

Generate a 15sec explainer animation of my new app @ChatSoonApp. Pure HTML/CSS/JS.

## bradmillscan-839974 — explainer — tags []
Post: https://x.com/bradmillscan/status/2104048013362839974

Can't Print the Proof

I gave Opus 5.5 total creative freedom to create an epic monetary history banger. 

1 caveat, I said use bitcoin block data to build the animation and wow me with the best quality without using generative video tools.

🤯

21 million, that's the truth

## yunn260414-016888 — explainer — tags []
Post: https://x.com/Yunn260414/status/2104044910769016888

帮我用js制作一个视频，主题是：什么是Git
要深入浅出，让一个计算机0基础的人也能看得懂，然后要介绍一些常用指令的意思等等
要有声音的，然后是中文讲的
你可以用任何工具或者安装工具，可以联网检索

## howlemont-503897 — explainer — tags []
Post: https://x.com/howlemont/status/2104023736370503897

Turn the file into a 2D animated video, using a BBC-style voice, with English narration and English subtitles.

regarding video effects / script completeness / voice matching / music and sound-effects coordination, Choose those by yourself

## cagrimbakirci-842869 — explainer — tags []
Post: https://x.com/cagrimbakirci/status/2104011756397842869

Opus 5.5 is truly insane. 

It one-shotted this explainer of how evolution built the eye.

What makes it even more crazy is that every single retina image in this visualization is computed, not drawn!

Felt fitting after all the "how a camera works" one-shots. Because, you know... evolution many-shotted eyes.

Over 40 times.

Enjoy.

## dotey-927166 — explainer — tags []
Post: https://x.com/dotey/status/2103964025683927166

做一支史诗编年片《中华文明史》，可以写代码逐帧渲染，再用 ffmpeg 合成。
配乐当时钟：五声调式，乐器从骨笛、编钟一路演进到管弦，BPM 随年代加快，所有切点踩拍。
宣纸白描和玄底泥金两种画风交替；每卷一个主色和一套随时代演变的纹样（彩陶纹 → 饕餮纹 → 云气纹 → 卷草纹 → 缠枝纹 → 回纹）。
每镜一个按词组出现的书法大字关键词，配一幅线稿。全片 HUD：左上朱印卷号，右侧竖排朝代名，底部卷轴时间尺和年份计数。
卷交界用朱印盖下、鼓钟重击的冲击转场。先定拍点网格和分镜表，再渲染。
地图只画示意，不画近现代真实人物，年代核对后再交付。

## ldataengineer-823010 — explainer — tags []
Post: https://x.com/Ldataengineer/status/2103945508972823010

Turn the whole debate about P(doom) into a cinematic explainer.

✈️ Would you board a plane with a 10% crash risk?
🌍 What does “10% risk to civilisation” actually mean?
🤖 And why are AI researchers arguing about this number while capability keeps accelerating?

## pluginplay-472343 — explainer — tags []
Post: https://x.com/PluginPlay__/status/2103910844677472343

pixel art boomerang render of the history of LLMs. then RSI. then it goes fucking crazy. 15 seconds max. self contained .html

## dotey-522564 — explainer — tags []
Post: https://x.com/dotey/status/2103683057689522564

帮我用js制作一个视频，主题是：什么是 Transformer
要深入浅出，让高中生也能看得懂，不仅high level说的清楚，也要有细节，包括注意力机制，甚至一些数学概念

你可以用任何工具或者安装工具，可以联网检索

请给我惊喜

## bitfish-539054 — explainer — tags []
Post: https://x.com/bitfish/status/2103670987879539054

输入如下：魔鬼控制人类最简单的方法,就是让人保持漂流状态。98% 的人,终其一生都在漂流。" —— 拿破仑·希尔《智胜恶魔》

参考这个洞见，创作一部讲解视频，尽可能令人难以置信的 2D 动画，时长 1 -3分钟，要有连贯的讲解，对白和声音。

## yankis0x-174321 — explainer — tags []
Post: https://x.com/yankis0x/status/2103502194578174321

The trick is NOT the prompt. It is one rule: every frame is a pure function of time.

song -> numpy beat grid -> Opus 5.5 writes one HTML file -> Playwright renders -> ffmpeg blends

step 1 -> pick a royalty-free track around 120 BPM

step 2 -> give Opus 5.5 8 to 12 UI states: button, loader, toggle, chart, command palette

step 3 -> one HTML file, 1440x1440, every style computed inside seek(t). no CSS transitions, no timers

step 4 -> springs as closed-form math, so any frame renders in any order

step 5 -> numpy finds the beats, every UI sound lands on a measured peak

step 6 -> Playwright shoots 4 subframes per frame, ffmpeg tmix blends them into 60fps motion blur

step 7 -> render one frame per beat first, fix what is off the grid, then the full render

the math:

120 BPM x 7 bars = 28 beats = 14 seconds
14 s x 60 fps x 4 subframes = 3,360 browser renders

## amol909s-607293 — explainer — tags []
Post: https://x.com/Amol909S/status/2103456534768607293

make a dynamic 20s motion graphics video that shows what an incredible motion designer you are, like it's your showreel for this app commotion, highlighting tiling layout, auto model classifer and other features you deem fit to be in video. Go all out.

## sanjeevn72-151834 — explainer — tags []
Post: https://x.com/sanjeevn72/status/2103456484793151834

&lt;inputs&gt;
Ask me for: 8 to 12 UI states I want the shape to become (e.g. button, loader, player, slider, toggle, tabs, chart, command palette, toast), pure black and white or one accent color, and a royalty-free song around 120 BPM (e.g. Mixkit, free for commercial use).
&lt;/inputs&gt;

## essjaykay755-847163 — 3d — tags []
Post: https://x.com/essjaykay755/status/2103446726245847163

create a bold, cinematic 30 sec motion graphics showreel that feels like a high end designer resume brought to life....mixing kinetic typography, fluid 3D motion, sharp graphic transitions, abstract geometry, expressive compositing, and unexpected visual transformations. keep the pacing fast, rhythmic and constantly evolving, with every shot revealing a new technique while maintaining a cohesive art direction. Make it feel premium, inventive, technically precise and unforgettable

## rneayan-417829 — explainer — tags []
Post: https://x.com/rneayan/status/2103400657856417829

Drop every country's population as marbles. 1 marble = 1 million people.
+ sound effects
8,144 marbles. Real 2024 population data.
Every clink is synced to a simulated collision.

## retropunkai-060898 — explainer — tags []
Post: https://x.com/RetropunkAI/status/2103237991091060898

Render a fun motion graphic animation using the GSAP animation platform (see below) to show a brief history of The Sphere in Las Vegas from start to today (start with a minimal architecture to completed venue) - Explainer video style - Talk about how bands live page with GSAP animations :

## agioyaz-397647 — 3d — tags []
Post: https://x.com/AGIOyaZ/status/2103167623303397647

Create a 37-second vertical short film (1080×1920, 30 fps) in three.js, titled "White Space".

【Experience】
Without showing a single human figure, let viewers physically feel how a life consumed by efficiency loses its light — and how a single empty space lets a richer light pour back in. The climax should make people hold their breath: a world-class stained glass image of the Virgin and two angels projected across a cathedral floor in blazing color.

【Setting】
- A dim Gothic cathedral interior with one lancet window, 15 m tall and 10 m wide.
- Strong sunlight enters from outside at 45°, casting the window's image onto the stone floor.
- Stained glass: an original, symmetric composition in the tradition of 13th-century French cathedral glass — never copy an existing window.

【Stained glass quality bar】
Aim for the level of Chartres or Sainte-Chapelle:
- Hundreds of small glass pieces, each with its own color variation, streaks, and seed bubbles
- Grisaille painting on the glass: serene faces with painted eyelids, brows and lips; drapery folds with soft shading; every feather painted with a rachis and barbs
- Edge matting so each piece glows brighter at its center
- A deep blue diaper background with ruby rosettes, a jeweled border of alternating colors and pearls
- The Virgin in a ruby niche under a pointed Gothic arch with crockets, columns and capitals, gold rays radiating behind her halo
- A multi-ring rose window at the top with stone-like tracery and jewel roundels

【Timeline】
0–3 s: Colorless white light fills the cathedral.
3–11 s: Gray cubes engraved with words fly in faster and faster, sealing the window. The room darkens.
11–14 s: Total darkness and silence.
14–19 s: Only the "BUSY" block falls away, dissolving into sparks. One golden beam enters.
19–26 s: Blocks cascade away from the first hole. Colored light shafts multiply; the glass is revealed.
26–33 s: The camera spirals up through the shafts to look down on the Virgin and angels glowing across the floor.
33–37 s: Everything is engulfed in radiant light; the final line appears, then dissolves into white.

【Words on the blocks】
BUSY, URGENT, ASAP, DEADLINE, KPI, MEETING, OVERTIME, OPTIMIZE, EFFICIENCY, INBOX, FASTER, TO-DO, SPRINT, TARGETS, HUSTLE, REPLY ALL, EOD, METRICS, SCALE, GRIND, RUSH, PING, FOLLOW-UP, MULTITASK, NOW

【On-screen text (elegant serif, appearing and fading quietly)】
"Every day, faster."
"Every day, more efficient."
"Until the light could no longer get in."
"Let one thing go."
"Where there is space, light comes in."
"And the light was richer than before."
Final: "Abundance dwells / in white space."

【Music and sound (original, synthesized)】
- 0–11 s: A ticking clock that accelerates; a dull thud each time a block lands; a low drone rising in tension
- 11–14 s: Silence
- 14.8 s: A single crystalline bell as the first beam enters
- 19–33 s: A soft chime for each falling block, blooming into an ethereal choir-like pad with a slo

## so-ainsight-225926 — explainer — tags []
Post: https://x.com/so_ainsight/status/2103119227192225926

JavaScriptだけでアニメーション動画を作って。
テーマは「Claude Codeって何？」。15秒・16:9、手描きの紙コラージュ風で、日本語ナレーション付き。

台本・素材・アニメーション・構成、全部任せます。
画像は gpt-image-2.5 、声は Gemini TTS

