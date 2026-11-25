// Bad Math engine v2 — REPLACEMENT-FACE LIBRARY (data only). Loaded before cast.js.
// Characters make no sound: emotion is carried by faces that SNAP between named states (stop-motion replacement faces).
// Each face is plain data; add / rename / redraw faces by editing this table or calling BM2.Faces.define(name, spec) from a scene.
// Units: px in head space at scale 1 (head is ~168 wide x 150 tall). "+" brow y = raised. Mouth corners cl/cr: + = lifted (smile).
//
//   eyes:  { mode, size, pupil, lidTop, lidSlope, lidBot, look:[x,y], blink }
//          mode: open | dot | arc (happy ^) | arcDown (u) | line (closed) | x | star | dollar | tear (open, glossy)
//          size  eye scale (1)        pupil 0.3..1.4        lidTop 0..1 share of the eye covered from above
//          lidSlope px: + = inner end lower (angry/scheming), - = inner end higher (sad)     lidBot 0..1 cheek-lift from below
//          look  pupil offset in eye radii (-1..1); 'side' shortcuts: [0.85,0]    blink false = never blinks in this face
//   brows: { y, tilt, farY, farTilt, w, hide }       y raise px; tilt: + = inner end DOWN (angry), - = inner end UP (worried)
//   mouth: { w, cl, cr, top, open, teeth, tongue, round, wavy, talk:false }
//          w half-width multiplier   open px of the mouth opening   teeth 0..1 upper teeth   round 0..1 -> O shape
//          cl/cr corner lift (near/far corner) px   top: px the upper lip curves up(+)   wavy: zig-zag line (nervous)
//   head:  { tilt, dy, dx, jaw, scale }    jaw = extra px the lower face stretches down (jaw-drop)
//   body:  { lean, shrug, tremble, bounce }
//   extras: ['sweat','blush','vein','sparkle','tear','steam','gulp','question','exclaim','zzz', ...]  (see BM2.Faces.extras in cast.js)
//   loop:  { fps, head:[dx,dy,tilt], mouthOpen:[min,max], shoulders }  stop-motion loop ("on twos"), pure function of time
//   snap:  frames of anticipation squash before the new face lands (default 2)
(function () {
  const B = (window.BM2 = window.BM2 || {});
  const F = (B.Faces = B.Faces || { library: {}, extras: {} });
  F.define = (name, spec) => { F.library[name] = spec; return spec; };
  const D = F.define;

  D('neutral',         { eyes: { mode: 'open', pupil: 0.8 }, brows: { y: 0, tilt: 0 }, mouth: { w: 0.8, cl: 1, cr: 1 } });
  D('happy',           { eyes: { mode: 'open', pupil: 0.9, lidBot: 0.3 }, brows: { y: 5, tilt: -2 }, mouth: { w: 1.1, cl: 7, cr: 7, open: 14, teeth: 0.8, tongue: 0.5 }, extras: ['blush'] });
  D('smug-grin',       { eyes: { mode: 'open', pupil: 0.75, lidTop: 0.38, look: [0.5, 0] }, brows: { y: 2, tilt: 0, farY: 9 }, mouth: { w: 1.1, cl: 3, cr: 11, top: 2, open: 3, teeth: 0.6 }, head: { tilt: -0.06, dy: -3 } });
  D('nervous-sweat',   { eyes: { mode: 'open', pupil: 0.55, look: [-0.3, -0.2] }, brows: { y: 8, tilt: -6 }, mouth: { w: 0.9, wavy: 1, cl: -1, cr: -1 }, extras: ['sweat'], body: { tremble: 1.5 } });
  D('jaw-drop-shock',  { eyes: { mode: 'open', size: 1.25, pupil: 0.4 }, brows: { y: 20, tilt: -2 }, mouth: { w: 0.8, round: 0.7, open: 40, tongue: 0.4, cl: 0, cr: 0 }, head: { jaw: 20, dy: 4 }, body: { lean: -0.1 }, extras: ['exclaim'], snap: 2 });
  D('side-eye',        { eyes: { mode: 'open', pupil: 0.8, lidTop: 0.28, look: [1, 0], blink: false }, brows: { y: 1, tilt: 3, farY: 6 }, mouth: { w: 0.7, cl: -2, cr: -2 } });
  D('fake-smile',      { eyes: { mode: 'open', pupil: 0.7, look: [0, 0] }, brows: { y: 4, tilt: -3 }, mouth: { w: 1.25, cl: 8, cr: 8, open: 8, teeth: 1, tongue: 0 }, extras: ['sweatSmall'], body: { tremble: 0.6 } });
  D('panic',           { eyes: { mode: 'open', size: 1.2, pupil: 0.35, look: [0, 0] }, brows: { y: 16, tilt: -7 }, mouth: { w: 1.0, open: 30, wavy: 0.5, teeth: 0.4, cl: -4, cr: -4 }, extras: ['sweat', 'sweat2'], body: { tremble: 3 }, head: { dy: -2 } });
  D('guilty-gulp',     { eyes: { mode: 'open', pupil: 0.65, look: [-0.9, 0.4] }, brows: { y: 5, tilt: -5 }, mouth: { w: 0.7, cl: -3, cr: -3, open: 0 }, extras: ['gulp', 'sweatSmall'], head: { dy: 3 } });
  D('triumphant',      { eyes: { mode: 'arc', size: 1.1 }, brows: { y: 9, tilt: -1 }, mouth: { w: 1.3, cl: 9, cr: 9, open: 26, teeth: 0.9, tongue: 0.5 }, head: { tilt: -0.1, dy: -6 }, body: { lean: -0.06 }, extras: ['sparkle'] });
  D('deadpan',         { eyes: { mode: 'dot', size: 0.95, pupil: 1, lidTop: 0.5, blink: true }, brows: { y: -1, tilt: 0 }, mouth: { w: 0.6, cl: 0, cr: 0 } });
  D('crying',          { eyes: { mode: 'tear', size: 1.05, pupil: 1.1, lidTop: 0.15, lidSlope: -7 }, brows: { y: 7, tilt: -10 }, mouth: { w: 1.0, cl: -11, cr: -11, open: 22, top: -3, teeth: 0 }, extras: ['tear'], head: { dy: 6, tilt: 0.05 }, loop: { fps: 12, head: [0, 1.5, 0], mouthOpen: [18, 26] } });
  D('scheming',        { eyes: { mode: 'open', pupil: 0.7, lidTop: 0.4, lidSlope: 7, look: [0.7, -0.2] }, brows: { y: 1, tilt: 9, farY: 5 }, mouth: { w: 1.3, cl: 8, cr: 12, top: 2, open: 7, teeth: 1 }, head: { tilt: 0.06, dy: 3 }, body: { lean: 0.05 } });
  D('disbelief',       { eyes: { mode: 'open', size: 1.1, pupil: 0.5, lidTop: 0.12 }, brows: { y: 8, tilt: 0, farY: 14 }, mouth: { w: 0.85, cl: -4, cr: -1, open: 5 }, head: { tilt: 0.1 }, extras: ['question'] });
  D('caught-red-handed', { eyes: { mode: 'open', size: 1.2, pupil: 0.4, look: [0, 0] }, brows: { y: 14, tilt: -5 }, mouth: { w: 0.9, open: 16, round: 0.4, teeth: 0.5, cl: -2, cr: -2 }, extras: ['sweat', 'blush', 'exclaim'], body: { lean: -0.08 }, head: { dy: -3 } });
  D('dreamy-greed',    { eyes: { mode: 'dollar', size: 1.25 }, brows: { y: 8, tilt: -2 }, mouth: { w: 1.15, cl: 7, cr: 7, open: 16, tongue: 0.7, teeth: 0.4 }, extras: ['sparkle', 'drool'], head: { tilt: 0.05, dy: -2 }, loop: { fps: 12, head: [0, 1.2, 0.015] } });
  D('terrified',       { eyes: { mode: 'open', size: 1.3, pupil: 0.3 }, brows: { y: 22, tilt: -8 }, mouth: { w: 0.95, open: 36, wavy: 0.35, teeth: 0.6, cl: -6, cr: -6 }, extras: ['sweat', 'sweat2'], body: { tremble: 3.5, lean: -0.12 }, head: { jaw: 8 } });
  D('furious',         { eyes: { mode: 'open', size: 1.0, pupil: 0.5, lidTop: 0.32, lidSlope: 11 }, brows: { y: -4, tilt: 14 }, mouth: { w: 1.1, cl: -9, cr: -9, open: 14, teeth: 1, tongue: 0 }, extras: ['vein', 'steam'], body: { tremble: 1.2, lean: 0.08 }, head: { dy: 2 } });
  D('relieved',        { eyes: { mode: 'arcDown', size: 1.0 }, brows: { y: 3, tilt: -6 }, mouth: { w: 1.0, cl: 5, cr: 5, open: 18, round: 0.3, tongue: 0.3 }, extras: ['sweat'], head: { tilt: 0.08, dy: 4 }, body: { lean: 0.04 } });
  D('confused',        { eyes: { mode: 'open', pupil: 0.65, look: [0.4, -0.6] }, brows: { y: 3, tilt: 3, farY: 13 }, mouth: { w: 0.7, cl: -3, cr: 3, wavy: 0.4 }, head: { tilt: 0.14 }, extras: ['question'] });
  D('laughing-silently', { eyes: { mode: 'arc', size: 1.1 }, brows: { y: 8, tilt: -3 }, mouth: { w: 1.35, cl: 8, cr: 8, open: 34, teeth: 0.9, tongue: 0.6 }, extras: ['tear'], loop: { fps: 12, head: [0, 4, 0.05], mouthOpen: [22, 40], shoulders: 5 }, body: { tremble: 0 } });
  D('suspicious',      { eyes: { mode: 'open', pupil: 0.8, lidTop: 0.33, lidSlope: 3, look: [0.9, 0] }, brows: { y: 0, tilt: 6, farY: 7 }, mouth: { w: 0.7, cl: -3, cr: -1 }, head: { tilt: 0.05 } });
  D('embarrassed',     { eyes: { mode: 'open', pupil: 0.6, look: [-0.7, 0.6] }, brows: { y: 4, tilt: -6 }, mouth: { w: 0.9, wavy: 0.6, cl: 2, cr: 2 }, extras: ['blush', 'sweatSmall'], head: { dy: 5, tilt: -0.07 } });
  D('proud',           { eyes: { mode: 'arc', size: 1.0 }, brows: { y: 5, tilt: -2 }, mouth: { w: 1.0, cl: 6, cr: 6, open: 4 }, head: { tilt: -0.1, dy: -8 }, body: { lean: -0.07 } });
  D('sick',            { eyes: { mode: 'open', pupil: 0.55, lidTop: 0.3, lidSlope: -4, look: [0, 0.3] }, brows: { y: 3, tilt: -7 }, mouth: { w: 0.9, wavy: 0.8, cl: -5, cr: -5, open: 4 }, extras: ['sweat'], head: { dy: 8 }, body: { lean: 0.1, tremble: 0.6 } });
  D('sleepy',          { eyes: { mode: 'line' }, brows: { y: -1, tilt: -3 }, mouth: { w: 0.7, round: 0.5, open: 8, cl: 0, cr: 0 }, extras: ['zzz'], head: { dy: 8, tilt: 0.12 }, loop: { fps: 6, head: [0, 2, 0] } });
  D('evil-grin',       { eyes: { mode: 'open', pupil: 0.45, lidTop: 0.3, lidSlope: 9 }, brows: { y: -2, tilt: 12 }, mouth: { w: 1.45, cl: 12, cr: 12, open: 12, teeth: 1 }, head: { dy: 4, tilt: 0.04 } });
  D('lovestruck',      { eyes: { mode: 'star', size: 1.25 }, brows: { y: 8, tilt: -4 }, mouth: { w: 0.9, cl: 6, cr: 6, open: 8 }, extras: ['blush', 'sparkle'], head: { tilt: 0.08 } });
  D('blank-stare',     { eyes: { mode: 'dot', size: 1.2, pupil: 1, blink: false }, brows: { y: 2, tilt: 0 }, mouth: { w: 0.5, cl: 0, cr: 0 }, head: { dy: 0 } });
})();
