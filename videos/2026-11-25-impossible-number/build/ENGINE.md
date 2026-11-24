# ENGINE.md — API for chapter authors (ch1–ch3)

Files: `index.html` loads `../../../brand/storyteller.js`, `engine.js`, `chapters/ch0..ch4.js`, then `window.ready = Engine.start()`.
Everything is a **global** (classic scripts). Canvas is 1920×1080. **`W` is the word-time helper, so the canvas size constants are `VW`, `VH`** (not W/H).

## Timing
- Data: `../voice/timeline.json` (+ `mouth.json`) when present, else `timeline.stub.json` (`node make_stub.cjs`). `render.cjs` injects the data (file:// can't fetch).
- `P('P15')` → `{id, chapter, start, end, text, words}`.
- `W('P15', 'twenty-seven', nth=1)` → start time (s) of that word in that paragraph. `Wend(...)` → end time. Case/punctuation-insensitive. Number words match Whisper digits (`'twenty'` matches `20`, `'seventeen'` matches `17`, `'twenty-seven'` matches `27,000`). A multi-word phrase works (`'seventeen more years'`). Query with the *spoken* word as in `paragraphs.json`; if Whisper wrote a number the query `'123'` also works. If not found it falls back to the word's position in the script text and records it in `Engine.missing` (`render.cjs` prints a WARN). Whisper words can bleed over a paragraph boundary (last word of P02 may be the first of P03): query the word inside the paragraph that contains it in the script.
- Caption spelling fixes (markopoulos→Markopolos, proctor→Procter, bayon→Bayonne, sec→SEC, P27 "count again"→"counted") are applied to the timeline words at load (`SPELL` in engine.js).
- **Never hard-code seconds.** Always `P()`/`W()`.

## Registering a chapter and scenes
```js
Engine.chapter(1, () => {                       // setup runs once the timeline is loaded: P()/W() are valid here
  Engine.scene('P08', 'P08', (c, t, lt) => {...}, {film:true});   // c = 2D ctx, t = global time, lt = t - scene start
  Engine.scene('P09', 'P09', fn);
  Engine.sceneAt(W('P12','million'), fn2);       // cut mid-paragraph; or Engine.scene(['P12','million',1,-.1], null, fn)
});
```
- A scene runs from its start until the **next scene starts** (last narration scene: end of narration), so there are never gaps. Register chapters' scenes in time order; the engine sorts by start. `toId` is informational.
- Each scene gets an automatic whip-pan cut (0.16 s). opts: `{whip:false, film:true (sepia grain+scratches+gate weave), vignette:0.6, name, layers:{hud,cap,foot,st}}`.
- **Chapter label** (top-right) is automatic from `paragraphs.json` `chapter` and `Engine.CH_NAMES`.
- Draw your own background every scene (`bgGrid(c,t,tint)`, `sepiaBg(c)`); the engine clears to INK first.
- Errors in a scene are caught and shown as red "SCENE ERROR" text + console error, so one bug never kills the render.

## FX (call inside the chapter setup, with word-keyed times)
`Engine.glitch(t0,t1,amt=1)`, `Engine.shake(t0,dur=.3,amp=20)`, `Engine.punch(t0,dur=.3,amt=.06)` (punch-zoom), `Engine.flash(t0,dur=.2)`, `Engine.whip(t0)` (extra whip), `Engine.hit(t0,{shake,punch,glitch,glitchDur,flash,cue})` (combo), `Engine.cue(t,'name')` (log an SFX cue for the sound agent; glitch/shake/flash/whip auto-log). All cues: `Engine.cues` (array of `{t,name}`).
Storyteller: poses are the DIRECTION.md table (in engine.js `POSES`); extra: `Engine.pose(t,'shock')`, `Engine.bubble(s,e,'L1','L2',[x,y])`, `Engine.st.follow=[s,e]`, `Engine.st.followLabel`, `Engine.st.followAt`, `Engine.st.followScale`.

## Helpers
Math: `clamp lin(t,a,b) eo ei eio back bounce lerp hash(n) fmt(n) money(n) roll(t,t0,t1,to,from=0,ease=eo)` (rolling counter value).
Draw: `rr(c,x,y,w,h,r)` `txt(c,s,x,y,font,color,align,base)` `stamp(c,s,x,y,size,color,rot,k,font)` (k 0..1 slam; stamp lands when k starts rising: use `lin(t,tWord,tWord+.15)`) `paper(...)` `paperSlam(c,t,t0,x,y,w,h,rot,col,drawFn)` `glow(c,x,y,r,col,a)` `bgGrid` `sepiaBg` `film(c,t)` `typedText(c,s,x,y,font,color,t,t0,t1,align)` `push(c,lt,dur,z0,z1,cx,cy)` (camera push, wrap in save/restore).
Icons/props: `coupon tank chartIcon padlock(c,x,y,s,open) checkbox(c,x,y,s,k) checklist(c,x,y,{rows,k,rot}) folder(c,x,y,w,h,tab,{draw,rot}) ticketContent(c,w,h) placeholder(...)`. The 1991 ticket for P43: `paperSlam(c,t,t0,840,490,960,620,-.025,'#EFE7D2',(c2,w,h)=>ticketContent(c2,w,h))`.
Fonts (CSS family names): `Anton` 400, `Inter` 800/700, `JBM` (JetBrains Mono) 800/700, `Elite` (Special Elite), `Rye`. Anton lacks `×` (use JBM for it). Colors: `INK RED GREEN PAPER HL GOLD GREY SEP SEP2 BRN BRN2`.

## Layout / safe areas (1920×1080)
- Content: x 80–1600, y 110–880 (`SAFE`, centre `SAFE.cx=840, cy=495`). Captions own y 880–1010 (centered x=960, max width 1300). Storyteller owns x>1600, y>760. HUD occupies y<90; footnote y≈1052.
- Persistent layers (HUD, captions, storyteller, footnote, vignette, grain) are drawn by the engine; do not draw them. Whip/shake/punch/glitch are post-processing of the whole frame.
- Make something change every 3–6 s: key sub-beats to words with `W()`; use `lt`/`t` only for continuous motion.

## Render
`node render.cjs stills 12.5,P15+3,P29+0.5,END out/` · `node render.cjs video out.mp4 30 [from] [to]` · `node render.cjs info` · `./render_all.sh` (full video → `silent.mp4`, 3 parallel parts).
