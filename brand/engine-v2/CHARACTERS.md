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
| 3D stage | `stage3d.js` + `sets3d.js` + `vendor/three.cjs` | three.js scene per story scene: paper sets, lamp + hard shadows, characters as camera-facing paper cards textured from the rig, perspective camera |
| Sequence | `story.js` | compiler for the scene format, shot / camera system, devices, transitions, captions, `board` |
| 2D fallback | `sets.js` | the earlier 4-layer parallax sets, used when three.js is not loaded or `stage: '2d'` |

**Characters are 2D, the world is 3D.** Each character is drawn by the rig onto a canvas every frame (body on twos = 15 poses/s; faces at 30 fps so snaps land on the frame) and shown as a card that always faces the lens, standing on the 3D floor at `(x, 0, lane * 64)`. Cards occlude and are occluded by 3D props and set pieces, and cast a hard floor shadow of their silhouette through an invisible proxy card that faces the lamp. The WebGL canvas is copied into the 2D frame, so captions, name plates, impact frames, freeze frames, the security-cam filter, motion blur and transitions are ordinary 2D code on top.

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

`sets3d.js`: `void desk auction kitchen court street map`, with `night` and `day` themes (`BM2.Sets3D.themes`: bg, A backdrop, B wall paper, C accent, D furniture, E floor, F darkest, lamp, `amb`/`key`/`elev`/`soft` light values). Each set is a function that adds slabs, cylinders and textured planes to a group and returns `{update(t)}` for ambient motion; the stage adds one hard-shadow lamp (`lamp: [dx, dy, dz]` per scene; low elevation = long noir shadows, high + soft = What If) and a fill light.

```js
BM2.Sets3D.define('bank', { marks: { A: -300, B: 300 }, build(c) {      // c: { K (theme colours), slab, cyl, disc, floor, text, token, theme }
  c.floor(c.K.E); c.slab(4200, 1000, 30, 0, 0, -520, c.K.B);            // slab(w, h, d, x, bottomY, z, colour)
  c.text(900, 300, 1, (g, w, h) => { /* paint a canvas */ }, 0, 640, -490);   // a lit sign / tote board
  return { update(t) { /* lights, crowd bob */ } }; } });
```
Camera marks (`A`, `B`, `door`...) are named x positions used by `cast.at` and `mark`. Props: every `BM2.Props.define(kind, {w, h, grip, draw})` is automatically a **paper standee** in the 3D set (the 2D art on a card with a shadow) and a held prop. Hero props can have a real 3D model: `BM2.Sets3D.defineProp('barrel', (c, o) => THREE.Group)` (table, barrel, crate, podium are done). Set props in a scene: `props: [{id, kind, x, lane, scale, yaw, color, text, in, out, anim: 'bob'|'sway'}]`.

2D fallback: with `stage: '2d'` (or no three.js) the same story renders on `sets.js` parallax layers (cellar, office, street, studio).

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

Observer shots: `observer: 'peek'` (`peek: {prop, side, blur, dark, creep}`: a dark blurred foreground object covers a third of the frame), `overcrowd` (backs of heads along the bottom), `ots`, `pov`, `security` (low-fps world, grain, scanlines, glitch band, `CAM 2 · ILLUSTRATION` tag, rounded frame; no fake timestamp), `courtsketch` (pencil-on-tan filter), `window` (we look through a lit window frame). Devices: `freeze: {label, role}` (desaturated to 30 %, Paper border, Anton name plate + mono role tag, shutter flash), `card: {title, sub, tag}`, `fx: [{type:'impact', on, accent}]` (bible impact frame: 2 frames, A = Paper + Ink silhouette + torn wedges, B = accent + Paper silhouette; auto `deep_boom`), `shake`, `punch`, `flash`, `speedlines`, `tension`, `vignette`, `split: {panels:[{shot,on},...], dir:'v'|'h', badges:true}` (2-3 panels).

## 9. Storyboard mapping and the board review

`BM2.storyBoard()` / `bm2.cjs board` prints one row per action and shot straight from the compiled scene (`storyboard.md`), and renders one keyframe per shot (default 60 % into the shot, or `key`) into 6-column contact sheets labelled `id  t0-t1  size  target` + the narration words (`board/board_01.png`...). Compare against the STORYBOARD thumbnails row by row (bible 10.3).

## 10. Performance (software WebGL in this container)

See the numbers in the delivery notes: a plain frame is one shadow-mapped three.js render + one 2D composite; whips and shakes cost up to 10 renders per frame. Rendering is CPU-bound, so `--jobs` beyond the core count does not help. Levers: lower `shadow.mapSize` in `stage3d.js` (2048 -> 1024), `motionBlur: false`, fewer set props, `--fps 24` for animatics, density cap in `stage3d.js` (character card textures follow screen size, 1x-3.5x).

## 11. Known limits

* Character cards face the lens, so a camera orbit never shows a character's side or back (it is paper); orbits stay readable because shadows and the set rotate. Orbits beyond ~30 deg start to show the card thickness of standee props.
* Characters do not receive lamp shadows from the set (gobo stripes land on walls and floor, not on cards); floor shadows are one-light, one-direction.
* No per-pixel depth of field yet: DOF is faked with blurred dark foreground occluders (peek / over-crowd / OTS) and the set is sharp. A depth-based bokeh pass is the next step.
* Props are paper standees unless a 3D model is registered; tote-board flip tiles and the P1 number props are not built (a `text` plane exists in `sets3d.js`).
* Mimed talk, face snaps and gestures are procedural: complex object interaction (pouring, pulling a cork) is staged with held props and cuts.
* The bible's per-part 2-frame hair lag and ±0.6 px outline wobble are not implemented; the paper-edge highlight on set shapes is replaced by flat colour + the lamp's hard shadows.
* Landscape 16:9 for the story path is untested (sizes use `W`/`H`, so it should adapt).
