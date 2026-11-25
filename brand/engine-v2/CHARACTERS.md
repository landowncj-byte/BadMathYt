# Characters, sets and shots (animated story scenes)

The "Paper Trail" tech for `brand/SHOW-BIBLE.md`: silent paper **token-people** with snap-on replacement faces, standing in real **3D paper sets**, filmed by a moving perspective camera. Art direction (palettes, faces, looks, sets) is data; the engine is art-agnostic. Everything is a pure function of time (`window.render(t)`), so it renders frame by frame in headless Chromium like the rest of engine-v2.

Demo: `brand/engine-v2/demo-characters/` (15.3 s, 1080 x 1920). `scene.js` there is a complete worked example in the bible's flat form.

## 1. Architecture

| Layer | File | What |
|---|---|---|
| Faces (data) | `faces.js` | the 26-face reservoir F01-F26 (bible 2.4), `BM2.Faces.define()` |
| Rig | `cast.js` | token-people puppet: parts, 2-bone IK limbs, locked-stride gaits, gestures, face snap, mimed talk, hair / hats / accessories / outfits / builds |
| Looks (data) | `looks.js` | HOST, CON, MARK, RICH, JUDGE, AGENT, YOU, PAL, EXPERT, TELLER, KID, CROWD |
| Props | `props.js` | 2D art for every prop (held props and paper standees) |
| Paper materials | `paper.js` | procedural, deterministic canvas textures (card grain + fibres, creased walls, ledger / receipt floors, banknote guilloche trim, round seals), baked once and cached |
| 3D stage | `stage3d.js` + `sets3d.js` + `vendor/three.cjs` | three.js scene per story scene: paper sets, lamp + hard shadows, characters as camera-facing paper cards textured from the rig, perspective camera |
| Sequence | `story.js` | compiler for the scene format, shot / camera system, devices, transitions, captions, `board` |
| 2D fallback | `sets.js` | the earlier 4-layer parallax sets, used when three.js is not loaded or `stage: '2d'` |

**Characters are 2D, the world is 3D.** Each character is drawn by the rig onto a canvas every frame (body on twos = 15 poses/s; faces at 30 fps so snaps land on the frame) and shown as a card that always faces the lens, standing on the 3D floor at `(x, 0, lane * 64)`. Cards occlude and are occluded by 3D props and set pieces, cast a hard floor shadow of their silhouette through an invisible proxy card that faces the lamp, and **receive the set's shadows** (blinds, bars, frames) through a gobo-mask pass: the set's casters are rendered once from the lamp into a depth texture that the card shader samples. A depth-of-field / rack-focus pass blurs by distance from a focus point. The WebGL canvas is copied into the 2D frame, so captions, name plates, impact frames, freeze frames, the security-cam filter, motion blur and transitions are ordinary 2D code on top.

Units: 1 world unit = 1 px of the rig. A figure is ~400 units tall (bible "scale 1" = 520 px = 1.3 x this; gait strides are already converted). x right, y up, z toward the camera; `lane` l -> z = 64 l (use -4 for "far back", +2 for "close to the lens").

## 2. Quick start

```bash
cd /home/user/badmathyt; V=videos/<date>-<slug>/<cut>; E=brand/engine-v2
node $E/bm2.cjs init   $V/build --voice $V/voice --story --series decoded   # scene.html (loads three + the rig) + a starter scene.js
node $E/bm2.cjs check  $V/build        # compiles; beats = shots with resolved times; prints face-hold warnings
node $E/bm2.cjs board  $V/build        # storyboard.md + labelled keyframe contact sheets (one cell per shot) -> $V/build/board/
node $E/bm2.cjs stills $V/build 0.5,3.4,5     # PNG stills
node $E/bm2.cjs render $V/build --jobs 4 --chunk 4        # -> video_noaudio.mp4 (resumable chunks), sfx.json
python3 $E/mix.py ...                  # unchanged: voice + sfx.json + bed
```
Characters never speak: the soundtrack is Owen + sfx + music. `voice/mouth.json` (loudness per 30 fps frame) only gates the *mimed* talk loop; per-character series can be supplied as `BM2_VOICE.mouths = {ID: [...]}`.

## 3. The scene format

Two equivalent ways to write a video; both compile to the same thing.

### 3a. Flat bible form: `shots: [...]` (one storyboard row = one entry)

```js
BM2.story({
  duration: 86.4, theme: 'night',                // 'night' = Decoded, 'day' = What If
  look: { RICH_A: 'RICH', RICH_B: 'RICH' },      // character id -> look (default: id is the look)
  hud: { pill: 'DECODED', title: 'CASE 001 · THE WINE FACTORY', footnote: '...' },
  captions: { emph: { fraud: '#FF3B30' } },       // captions: false to turn off
  sfx: [{ at: '@home', name: 'door_slam_1', gain: -8 }], bed: { name: 'jazz_bed_1', gain: -24 },
  shots: [
    { id: '1.2', at: '@home', size: 'CU', observer: 'reaction',        // one row of the storyboard
      narration: 'home.',                                              // free text, shown on the board sheet
      cast: [ { who: 'CON', pose: 'hold', hold: 'bottle' },
              { who: 'AGENT', at: [-760, 0], dir: 'right', face: 'F09', walk: { to: -170, until: '@His' } } ],
      faces: [ ['@home', 'CON', 'F12'] ],                              // [when, who, face]
      cam: ['push-in'], fx: [{ type: 'impact', on: 'CON' }], key: 3.8 },  // key = board keyframe time
  ],
});
```

Shot fields: `id`, `at` (seconds or `@word`), `set` (`'kitchen'` or `{kind, theme, palette}`; a new `set` starts a new scene, consecutive shots with the same set share one scene), `mark` (named camera/stage mark), `size` (`WS FS MS CU ECU INS TOP SPLIT`), `observer` (`reaction ots pov peek overcrowd security courtsketch window two`), `on` (target; defaults to the first/focus cast member), `over` (OTS: the shoulder in front), `cast`, `faces`, `actions` (raw verbs below), `cam`, `fx`, `sfx`, `transition` (on the first shot of a set), `freeze`, `card`, `split`, `narration`, `key`, `az`/`el` (camera azimuth / elevation in degrees, number or `[from, to]`), `orbit` (degrees swept during the shot), `dutch` (degrees), `move: 'whip'` + `dir`.

`cast[]` entries (per shot; a missing field = unchanged since the last shot): `who`, `look`, `override` (e.g. `{outfit:'apron', palette:{top:'#...'}}`), `at` (stand here at the start of this shot, a **placement**: `'left' | 'centre' | 'right' | mark name | x | [x, lane]`), `dir` (`'left' | 'right' | 'camera' | <character id>`), `face`, `pose` (a gesture), `hold` (prop kind in the hand), `target`, `look_at`, `crouch`, `talk`, `walk: {to, until|dur|speed, gait: 'walk'|'run'|'sneak'|'stomp', then}`.

### 3b. Scene form: `scenes: [...]`

```js
scenes: [{ id: 'kitchen', at: 0, set: 'kitchen', theme: 'night',
  cast: { CON: { base: 'CON', outfit: 'apron' } },
  blocking: { CON: { at: [330, -3], face: 'camera' } },
  actions: [ { at: '@home', who: 'CON', face: 'F12' }, { at: 3.4, who: 'AGENT', do: 'walk', to: -170, until: '@His' } ],
  shots:   [ { at: 0, shot: 'wide' }, { at: '@home', shot: 'reaction', on: 'CON' } ],
  fx: [ { at: 7.9, type: 'impact', on: 'CON' } ], transition: { type: 'whip', dur: 0.36, dir: 'left' } }]
```
`bm2.cjs board` prints the same rows either way: `time | scene | who | action / shot`.

### 3c. Action verbs (`do:`, or fields on a cast entry)

| Verb | Params |
|---|---|
| `face` / `is` | face id or name (`'F12'`, `'CAUGHT RED-HANDED'`). Snaps. Held >= 8 frames or `check` warns. |
| `place` | `to: [x, lane]` hard-cut teleport (a new shot's staging) |
| `walk` `run` `sneak` `stomp` | `to` (x, `[x,lane]` or list of points), `until` or `dur` or `speed`, `then` (turn afterwards), `strafe` |
| `turn` | `to: 'left' | 'right' | 'camera' | id`, `dur` |
| `look` | `target: id | [x,y] | 'camera'` (eyes snap; faces with their own gaze win) |
| `talk` | `until`/`dur`: mimed 3-mouth loop, gated by `mouth.json`, for the clause where Owen reports speech |
| gestures | `point(target, arm)`, `shrug`, `facepalm`, `count(n)`, `hold(prop, take)`, `present(prop)`, `armsUp`, `slam(prop)`, `wave`, `think`, `cover`, `crossed`, `behind`, `clap`, `hands-up`, `shake-fist`, `lean-in`, `recoil`, `clutch`, `raise-paddle`, `stand` |
| `crouch` | `v: 0..1` (knees bend through IK; use to peek from behind a prop) |
| `prop` | `id`, `to`, `dur`, `arc`, `jolt`, `show` (move / hop / hit / appear / hide a set prop) |
| `bubble` | the one allowed sign gag: `text`, `until` |
| any | `sfx: 'name' | {name, gain}` |

Times everywhere are seconds or `@word` refs (`'@home'`, `'@kernioan>'` end of word, `'@wine#2'`, `'@rich+0.2'`): the same refs as the rest of engine-v2, resolved against `words.json`. `check` lists every spoken word when a ref is wrong. `slam` adds a shake, a prop jolt and a thud automatically.

## 4. Faces (stop-motion replacement faces)

`faces.js` holds F01-F26 exactly as the bible lists them (id, name, brows / eyes / mouth sets, outline cue, locked pose). A face is plain data:

```js
BM2.Faces.define('F12', { name: 'CAUGHT RED-HANDED',
  eyes:  { mode: 'open', size: 1.4, pupil: 0.22 },   // mode: dot open slit arc arcDown line lash spiral dollar star x tear
  brows: { y: 40, tilt: -3 },                         // a big y floats the brows above the head outline
  mouth: { w: 0.4, round: 0.9, open: 12 },
  extras: ['exclaim'],                                // sweat sweat2 sweat3 blush vein steam sparkle tear gulp question exclaim chip zzz drool puff
  head: { dy: -3 }, body: { shrug: 24, lean: -0.06 },
  lock: null });                                      // 'armsUp' | 'steeple' | 'chin' | 'collar' | 'cheek' = arm pose locked to the face
```
Other knobs: `eyes.lidTop/lidSlope/lidBot/look/dart/farSize`, `brows.farY/farTilt`, `mouth.cl/cr/teeth/tongue/wavy/rect/jag/dx`, `head.tilt/jaw/hairLift/shake/dx`, `body.tremble`. To rename or redraw a face, edit its row; to add one use the next id. Any string works as a reference (`'F12'`, `'CAUGHT RED-HANDED'`, `'caught-red-handed'`).

**Snap rule (implemented in `Cast.faceAt`)**: at frame -2 and -1 the head squashes (scaleY .92 / scaleX 1.06) with the old face still on; frame 0 swaps the whole new face and the head pops (1.06 / .96) for one frame; frame +1 is normal; then it holds. No cross-fade, no morphing. The key time is snapped to a frame, so a face cue on a word lands on that word's first frame. Blinks are 2-frame closed-arc swaps every 2.5-4 s (seeded), never during F09 / F12 / F13. `check` warns when two faces of one character are less than 8 frames apart.

**Mimed talk** replaces only the mouth: shut / half / open on twos, thresholds on `voice.mouth` (`ctx.hasMouth`), or a seeded pattern if there is no mouth data (`talkDrive: 'pattern'`). Eyes and brows keep the current face.

## 5. Looks, outfits, accessories (art direction)

```js
BM2.Cast.define('CON', { head: 'oval', hair: 'swoop', outfit: 'suit',
  palette: { top: '#59606B', top2: '#F5F3EE', bottom: '#2A3647', hair: '#0B0F14' },
  accessories: ['pocketsquare'] });                    // 'glasses:round', {name:'bowtie', color:'#F2B705'}
```
* `head`: `round square oval pear bean` (superellipse parameters in `Cast.headShapes`), `build`: `token wide kid crowd`, `size: {hh, hw, th, legL...}` for one-off proportions, `scale`.
* `palette`: `skin` (Paper White for people; HOST's gold coin uses `coin: true`), `hair top top2 bottom shoes accent brow ink`.
* `outfit`: `plain suit dinner apron robe windbreaker hoodie waistcoat jumper` (`Cast.outfit(name, {tell, wide})`; add a tell by extending `body()` in `cast.js`).
* `hair`: `bald tuft swoop parted bun long curly`; hats (`flatcap visor tophat crown hood`), face (`glasses sunbar`) and body (`bowtie tie pocketsquare scarf badge`) accessories are registered with `Cast.accessory(name, {slot, draw(g, c, o)})`; `c` carries head sizes / feature positions so a new one is ~5 lines of canvas paths.
* Per scene: `cast: { CON: { base: 'CON', outfit: 'apron' } }` or `override` on a cast entry. Global look overrides: `BM2.story({ style: { ink: '#0B0F14', ol: 4.2 } })`.
* Gaits (`Cast.gait`): `walk` (stride 150 bible px, cycle 0.53 s), `run` (260 px, 0.40 s), `sneak` (0.8 s), `stomp`.

## 6. Locomotion (no foot sliding)

A move is a path with a start and end time. Foot plants sit on a lattice **in world space**: the stance foot moves back at exactly the body's speed, the other foot swings and plants a half stride ahead, and the stride is nudged per move so the last two plants land together (feet together when the character stops). Default move duration is `distance / (stride / cycle)`; if you give `until`, the speed follows and the cycle rate stretches slightly (never the foot contact). The body bobs, leans and swings its arms from the same distance parameter. Turning is a facing key (`dir`), a squash through the front view. Idle is breathing, a weight shift and seeded blinks.

## 7. Sets (3D paper) and props

### 7.0 Paper look (paper.js, sets3d.js)
Everything in a set is card. `paper.js` bakes the textures once per page load (seeded, no external images) and the sets reuse them, so render cost is the same as flat colour. Load `paper.js` before `sets3d.js` in `scene.html` (the starter and both demos do; without it sets fall back to flat colour).
* **Card faces**: every `slab()` face is a per-size panel texture: fibre grain, speckle, soft mottling, a lighter 2-3 px cut edge on the top / left rim and a darker hairline bottom / right.
* **Thickness edge**: thin slabs (min dimension <= 42 % of the middle one, or `card: true`) are folded card: the faces get the panel texture, the edge faces get a flat lighter strip, so you see the card's thickness from any off-axis camera. Chunky slabs (`card: false`) are blocks with a lighter top.
* **Walls**: `c.wall(w, h, d, x, y, z, colour, {folds, seed, dado: {h, col, ink}, paint(g, w, h, px)})`: grain, vertical valley-fold creases (dark hairline + light twin + soft shadow), faint kinks, optional banknote-guilloche dado.
* **Floors**: `c.floor(colour, w, d, z, {kind: 'ledger' | 'receipt' | 'card' | 'plain'})`. `ledger` (default) = accounts-ledger paper: rules and red margin lines that run to the vanishing point, so depth reads at once; `receipt` = cream thermal paper with faint printed item lines (pavements, desks).
* **Banknote trim**: `c.band(w, h, x, y, z, colour, ink)` (interlaced sine guilloche strip), `Paper.band / Paper.rosette` (canvas painters), used for dados, bench fronts, sign plates and the map legend. `c.seal(r, x, y, z, paper, ink, {star})` = round crest with a rosette and a star (no real emblem).
* **Dressing helpers** (all in the ctx passed to `build`): `sign(text, w, h, x, y, z)` (short world label, unlit, text auto-fits), `frame(w, h, x, y, z, paint)` (framed picture), `curtain(w, h, x, y, z, colour, {folds, depth})` (pleated drape), `cupboard(x, y, z, w, h, colour)`, `hangLamp(x, yShade, z, {r, top})` (cord + cone shade; the bulb is a flat disc, never a glow), `chairs(x0, x1, z, n, colour)` (chair backs), plus `slab cyl disc token text gobo`. Slab positions are centres in x and z, bottom in y.
* **Depth layering** (every set): FAR (z < -450: wall, skyline, seal, sign), MID (z -450..-120: furniture, shop fronts, hanging lamps, bench), STAGE (z -120..120: where the cast stands), NEAR (z > 250: dark chair backs, door frame, rail balusters, lamp post, file stacks). Keep NEAR pieces at |x| > 400 so they only show in wides and trucks; at most 3 things to read per frame.
* **Signs**: `K.sign` (set `palette: {sign: 'TEXT'}`) is the only text a set paints; keep it a 1-3 word world label (`AUCTION \u00B7 NEW YORK`, `BANK`, `WINE`, `PAWN`). Never a sign that repeats the narration.

Set sampler: `brand/engine-v2/demo-sets/` renders one wide shot per set in night and day: `node brand/engine-v2/bm2.cjs board brand/engine-v2/demo-sets`.

### 7.1 Sets and props

`sets3d.js`: `void desk auction kitchen court street map` (dressed: desk = case board, filing cabinets, pendant, blotter; auction = panelled wall, sign plate, pilasters, drapes, pendants, dais, crested podium, lot pedestal, rows of chair backs; kitchen = window with curtains, framed picture, cupboards, counter, hanging lamp, island, chair back, door frame; court = crest, bench with banknote front and seal, jury box, witness stand, rail with balusters; street = skyline, cloud strips, three shop fronts with awnings and signs, lamp posts, bollards; map = folded map with creases, compass rose, legend and pop-up trees / houses / pins), with `night` and `day` themes (`BM2.Sets3D.themes`: bg, A backdrop, B wall paper, C accent, D furniture, E floor, F darkest, lamp, `amb`/`key`/`elev`/`soft` light values, `pool` (card falloff floor, 0 = no lamp pool), `vig` vignette). Each set is a function that adds slabs, cylinders and textured planes to a group and returns `{update(t)}` for ambient motion; the stage adds one hard-shadow lamp (`lamp: [dx, dy, dz]` per scene; low elevation = long noir shadows, high + soft = What If) and a fill light.

**Lighting mood.** Night Edition: the lamp is a SpotLight (one shadow map) aimed at the set's pool point (`pool: [x, y, z]` on the set definition or per scene `pool:`; `pool: false` = flat directional light, used by the top-down map), so you get a warm pool, soft falloff into deep shadow, and the character cards fall off with the same cone (`poolMin` = `K.pool`); `K.poolAngle` widens it (default 0.78 rad). Day Edition: a soft directional key plus a bright hemisphere fill, no pool. Both: vignette (`spec.vignette`, default night 0.36 black, day 0.10 Grape) and the light multiply paper grain over the whole frame (`grain`, default 0.18). No glow, no bloom, no additive blending anywhere: lamp bulbs are flat cream discs.

```js
BM2.Sets3D.define('bank', { marks: { A: -300, B: 300 }, build(c) {      // c: { K (theme colours), slab, cyl, disc, floor, text, token, theme }
  c.floor(c.K.E); c.slab(4200, 1000, 30, 0, 0, -520, c.K.B);            // slab(w, h, d, x, bottomY, z, colour)
  c.text(900, 300, 1, (g, w, h) => { /* paint a canvas */ }, 0, 640, -490);   // a lit sign / tote board
  return { update(t) { /* lights, crowd bob */ } }; } });
```
**Gobo shadows**: `c.gobo('blinds'|'bars'|'cross', [x,y,z] target, distance, w, h)` adds invisible casters between the lamp and the target; their stripes fall on floor, walls and the character cards (the kitchen at night uses it). Any visible set mesh also shadows the cards.

Camera marks (`A`, `B`, `door`...) are named x positions used by `cast.at` and `mark`. Props: every `BM2.Props.define(kind, {w, h, grip, draw})` is automatically a **paper standee** in the 3D set (the 2D art on a card with a shadow) and a held prop. Hero props can have a real 3D model (done: `bottle` lathe with label and cork, `jug`, `barrel`, `table`, `crate`, `podium`, `bars` (cell bars), `coinstack {n, cols}` (gold coin tower), `yearrack {cols, rows, hl}` (38-slot year rack), `torch {sweep, spread, tilt}` (flat paper beam wedge)): `BM2.Sets3D.defineProp('barrel', (c, o) => THREE.Group)` (table, barrel, crate, podium are done). Set props in a scene: `props: [{id, kind, x, lane, scale, yaw, color, text, in, out, anim: 'bob'|'sway'}]`.

2D fallback: with `stage: '2d'` (or no three.js) the same story renders on `sets.js` parallax layers (cellar, office, street, studio).

**Character cards (cut-outs).** The card shader adds a thin white paper border (alpha dilation, 5 card units, Paper `#F5F3EE`) and a tiny offset drop shadow (3 units down-right, 34 % ink) around the printed figure, so characters read as cut-outs standing in the set. Faces are untouched. Knobs before `BM2.story`: `BM2.Stage3D.border = false` (off), `BM2.Stage3D.borderW = 5`. The lamp-cast floor shadows are unchanged.

**Captions use the script, not Whisper.** `voice.js` carries `sentences[].text` (the show-text from `voice/sentences.json`); per sentence the Whisper words are aligned to the script tokens (LCS on normalised text, gaps between exact anchors spread by character length over the Whisper span), so names and numbers are spelled as written ("Rudy Kurniawan", "two thousand six") while the timing is still word-by-word from `words.json`. `@word` refs in scenes still resolve against the Whisper words (Whisper's "kernioan" stays the ref). `captions: {source: 'whisper'}` restores the old behaviour. Rebuild `voice.js` with `bm2.cjs voice` after a re-voice so `sentences` is present.

## 8. Shots and the camera

A shot is a framing of a target, then optional moves. All values are data in `BM2.SHOTS` (width of world visible, height of the framed point, screen position):

| size | meaning | default framing |
|---|---|---|
| WS | wide | whole set (`wideW` 950 units), el 5 deg |
| FS / MS | full / medium | 600 / 470 units wide |
| CU / ECU | head and shoulders / eyes | 300 / 170 |
| `reaction` | CU with a small push-in at the cut | 280 |
| two | fits all `on: [a, b]` | |
| ots | `on` = the face, `over` = the shoulder (dark soft foreground figure) | |
| pov | camera at the witness looking at `target`, with `mask: 'eyes'|'binoc'|'ring'|'none'` | |
| INS / TOP | a prop alone / straight down (map) | |

Camera moves (`cam: ['push-in', 'crash', 'pull-back', 'truck', 'orbit', 'dutch', 'crane', 'creep']` or raw `{push, zoomMoves, pan, orbit, az, el, r, punch, hand}`): creep = slow push (default 4.5 %), push-in 0.55 s +25 %, crash zoom 0.2 s +60 % with overshoot, truck (pan with true parallax), orbit (azimuth sweep, real 3D), crane (elevation sweep). Characters are followed with a trailing average (pure function of time); `lock: true` freezes the framing at the cut. A whip-pan is `move: 'whip'` (+ `dir`): the previous shot sweeps away in 0.14 s, the new one sweeps in over 0.2 s with sub-frame motion blur (up to 10 samples) and a 14 deg azimuth swing. Whip *transitions* between sets: `transition: {type: 'whip'|'slide'|'wipe'|'iris'|'fade'|'dip'|'flash', dur, dir}`.

**3D camera extras** (all data on a shot): `dof: {blur, sharp, falloff} | false` (default on for CU / ECU / reaction / INS: blur in px at 1080 wide, focus on the target; add it to any other shot explicitly), `focus: <id>` (focus elsewhere), `rack: {from, to, at, dur}` (rack focus between two targets, e.g. bottle -> con in 0.3 s), `path: [{at, pos:[x,y,z], look:[x,y,z], fov}]` (explicit 3D camera keys, eased; use it to **travel through a doorway**: start outside the door frame, end inside), `lamp: [dx,dy,dz] | {from, to}` (aim / sweep the lamp for this shot: long shadows, 9.1-style), `match: '<shot id>'` + `matchZoom` (start from the exact camera of another shot's last frame: camera-position matching across a cut), `fov`, `orbitMax: true` (allow azimuth beyond 30 deg), `az` / `el` `[from, to]`. Azimuth is clamped to +/-30 deg unless `orbitMax`, because paper standees and cards are thin; a prop with a real 3D model (bottle, jug, barrel, table, crate, podium, bars, coin stack, year rack, torch) can be orbited to 45 deg or more with `orbitMax: true`.

Observer shots: `observer: 'peek'` (`peek: {prop, side, blur, dark, creep}`: a dark blurred foreground object covers a third of the frame), `overcrowd` (backs of heads along the bottom), `ots`, `pov`, `security` (low-fps world, grain, scanlines, glitch band, `CAM 2 · ILLUSTRATION` tag, rounded frame; no fake timestamp), `courtsketch` (pencil-on-tan filter), `window` (we look through a lit window frame). Devices: `freeze: {label, role}` (desaturated to 30 %, Paper border, Anton name plate + mono role tag, shutter flash), `card: {title, sub, tag}`, `fx: [{type:'impact', on, accent}]` (bible impact frame: 2 frames, A = Paper + Ink silhouette + torn wedges, B = accent + Paper silhouette; auto `deep_boom`), `shake`, `punch`, `flash`, `speedlines`, `tension`, `vignette`, `split: {panels:[{shot,on},...], dir:'v'|'h', badges:true}` (2-3 panels).

## 9. Storyboard mapping and the board review

`BM2.storyBoard()` / `bm2.cjs board` prints one row per action and shot straight from the compiled scene (`storyboard.md`), and renders one keyframe per shot (default 60 % into the shot, or `key`) into 6-column contact sheets labelled `id  t0-t1  size  target` + the narration words (`board/board_01.png`...). Compare against the STORYBOARD thumbnails row by row (bible 10.3).

## 10. Performance (software WebGL, 4-core container, no GPU)

Measured on the 15.3 s demo (459 frames, 1080 x 1920, 30 fps): **117 s with `--jobs 2 --preset veryfast`, i.e. 0.26 s per frame**, so a 90 s Short (2700 frames) is about **11-12 minutes** on this machine; with a GPU it is several times faster. Single frames: wide shot ~130 ms, close-up ~220 ms, close-up with depth of field ~420 ms, whip transition ~0.5 s (a 2D smear of two single renders). Rendering is CPU-bound (SwiftShader uses all cores), so `--jobs 2` is the sweet spot; more jobs do not help. Render with `node bm2.cjs render <dir> --jobs 2 --chunk 4 --preset veryfast`.

What was done for speed: character textures are cropped to what is on screen (snapped, so no reallocation), redrawn only when the pose step / face / blink changes, and sampled without mipmaps; the GL canvas renders at 0.75 scale and is upscaled; the lamp's shadow map is 1024; blurs in the observer overlays use a down/up-scale instead of `ctx.filter` (which costs ~0.6 s per full-screen frame in software); DOF runs a 16-tap gather at half resolution only on shots that ask for it. Knobs (set before `BM2.story`): `BM2.Stage3D.scale` (0.75), `.aa` (MSAA on), `.shadowSize` (1024), `.dofSamples` (4); per shot `dof: false`; scene `motionBlur: false`.

## 11. Known limits

* Character cards face the lens, so an orbit never shows a character's side or back (it is paper). Cards and 2D standees stay within +/-30 deg of azimuth; real-3D props can orbit further with `orbitMax`.
* DOF is a single-layer gather blur (22 taps, depth-weighted): near-field bleeding over sharp subjects is approximate; the blur radius is capped by `blur` (px). Split-screen panels do not get DOF.
* Card shadows come from the set's casters only (one lamp, one mask); characters do not shadow each other's faces (floor shadows only).
* Floor shadows are one-light, one-direction (per shot you may re-aim the lamp). The shadow proxy is a low-res (150 x 160) silhouette.
* No tote-board flip tiles or the other P1 number props. Set dressing is big simple shapes only; the spot-lamp pool follows the scene's `pool` point, not the camera, so a wide that leaves the pool goes dark (aim `pool:` per scene).
* The bible's per-part 2-frame hair lag and the +/-0.6 px outline wobble are not implemented; the paper-edge highlight on set shapes is replaced by flat colour and the lamp's hard shadows.
* Landscape 16:9 for the story path is untested (sizes use `W`/`H`).

## 12. Pilot v2 assets: what is built

| Asset (storyboard v2 list) | Status |
|---|---|
| 38-slot year rack | built: `yearrack {cols:19, rows:2, hl}` (3D) |
| gold coin tower | built: `coinstack {n, cols}` (3D) |
| cell bars | built: `bars {n, pitch, h}` (3D, casts bar stripes) + gobo `'bars'` |
| torch (beam wedge) | built: `torch {sweep, spread, tilt}` (3D, flat paper beam; no second light) |
| jugs | built: `jug` (3D lathe) |
| spoon, evidence tag, stick / shepherd's crook | built as paper standees: `spoon`, `tag {text}`, `crook` |
| hero bottle (orbit) | built: `bottle` (3D lathe, label band, cork); held bottles stay 2D |
| poses stir / tap / push-stack / unfold | built (gestures: `stir`, `tap`, `push-stack`, `unfold`) |
| kitchen dressing, map pop-ups | built (see 7.0; map = folded map with pop-up trees / houses / pins) |
| tote-board flip tiles, calendar pages, cheque / receipt / verdict stamp props | NOT built (P1 #9) |
