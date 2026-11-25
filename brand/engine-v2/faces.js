// Bad Math engine v2 — REPLACEMENT-FACE RESERVOIR (data only). Loaded before cast.js. Source of truth for the list: brand/SHOW-BIBLE.md §2.4 (F01-F26).
// Characters make no sound; emotion lives in these faces. A face is a complete pre-drawn set (brows + eyes + mouth + extras) that SNAPS in (see cast.js: faceAt).
// Edit a row, or add one with BM2.Faces.define('F27', {name:'...', ...}), and every character picks it up. A face can be referenced as 'F02', 'SMUG GRIN', 'smug-grin'.
// Units: px in head space (the head is ~160 wide x 158 tall; the bible's 150 x 120 face slot sits in the middle).
//   eyes:  { mode, size, farSize, pupil, lidTop, lidSlope, lidBot, look:[x,y], dart, blink }
//          mode: dot (solid) | open (white + pupil) | slit | arc (happy ^) | arcDown (closed u) | line | lash | spiral | dollar | star | x | tear
//          lidTop 0..1 share covered from above; lidSlope px (+ = inner end lower); look = pupil offset in eye radii; dart = pupils jump between two spots (on twos)
//   brows: { y, tilt, farY, farTilt }      y = raise in px (a big y floats the brows above the head outline); tilt + = inner end DOWN (angry), - = inner end UP (worried)
//   mouth: { w, dx, cl, cr, open, teeth, tongue, round, wavy, rect, jag, talk:false }
//          w half-width multiplier; cl/cr = corner lift px (+ smile); open px; teeth 0..1; round 0..1 = O shape; wavy = zig-zag line; rect = open rectangle; jag = jagged
//   head:  { tilt, dy, dx, jaw (extra px the jaw drops, lengthens the outline), hairLift, shake }
//   body:  { lean, shrug (+ up, - slump), tremble }       lock: pose locked to the face: 'armsUp' | 'steeple' | 'chin' | 'collar' | 'cheek'
//   extras: sweat sweat2 sweat3 sweatSmall blush vein steam sparkle tear gulp question exclaim chip zzz drool puff
(function () {
  const B = (window.BM2 = window.BM2 || {});
  const F = (B.Faces = B.Faces || {}); F.library = {}; F.extras = F.extras || {}; F.alias = {};
  const key = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '');
  F.define = (id, spec) => { spec.id = id; F.library[id] = spec; F.alias[key(id)] = id; if (spec.name) F.alias[key(spec.name)] = id; return spec; };
  F.resolve = name => F.library[name] ? name : F.alias[key(name)] || null;
  const D = F.define;

  D('F01', { name: 'NEUTRAL',          eyes: { mode: 'dot', size: 1 }, brows: { y: 0, tilt: 0 }, mouth: { w: 0.55, cl: 0, cr: 0 } });
  D('F02', { name: 'SMUG GRIN',        eyes: { mode: 'dot', size: 1.1, lidTop: 0.45 }, brows: { y: 2, tilt: 0, farY: 11 }, mouth: { w: 1.2, cl: 3, cr: 14, open: 0 }, head: { tilt: -0.11, dy: -2 } });
  D('F03', { name: 'FAKE SMILE',       eyes: { mode: 'open', size: 1.15, pupil: 0.3 }, brows: { y: 11, tilt: -1 }, mouth: { w: 1.35, cl: 9, cr: 9, open: 11, teeth: 1 }, extras: ['sweatSmall'] });
  D('F04', { name: 'DELIGHT',          eyes: { mode: 'arc', size: 1.1 }, brows: { y: 13, tilt: -2 }, mouth: { w: 1.1, cl: 9, cr: 9, open: 30, teeth: 0.35, tongue: 0.5 }, extras: ['sparkle'] });
  D('F05', { name: 'TRIUMPHANT',       eyes: { mode: 'open', size: 1.1, pupil: 0.6, look: [0, -0.8] }, brows: { y: 2, tilt: 10 }, mouth: { w: 1.5, cl: 10, cr: 10, open: 40, teeth: 1, tongue: 0.4 }, head: { tilt: -0.08, dy: -5 }, lock: 'armsUp' });
  D('F06', { name: 'SIDE-EYE',         eyes: { mode: 'open', size: 1, pupil: 0.8, lidTop: 0.38, look: [1, 0], blink: false }, brows: { y: 0, tilt: 3, farY: -7 }, mouth: { w: 0.55, dx: 10, cl: -1, cr: -1 }, head: { tilt: -0.1, dx: -6 } });
  D('F07', { name: 'SUSPICIOUS SQUINT',eyes: { mode: 'slit', size: 1.05 }, brows: { y: -4, tilt: 7 }, mouth: { w: 0.85, wavy: 1, cl: -1, cr: -1 }, head: { dx: 8, dy: 2 } });
  D('F08', { name: 'DISBELIEF',        eyes: { mode: 'open', size: 1.3, farSize: 0.75, pupil: 0.5 }, brows: { y: -2, tilt: 0, farY: 24 }, mouth: { w: 0.5, dx: 5, round: 0.5, open: 15, cl: -2, cr: -2 }, head: { tilt: 0.17 } });
  D('F09', { name: 'DEADPAN',          eyes: { mode: 'dot', size: 1.05, lidTop: 0.5, blink: false }, brows: { y: -4, tilt: 0 }, mouth: { w: 0.85, cl: 0, cr: 0 } });
  D('F10', { name: 'NERVOUS SWEAT',    eyes: { mode: 'open', size: 1.1, pupil: 0.4, dart: true }, brows: { y: 9, tilt: -8 }, mouth: { w: 0.9, wavy: 1, cl: -1, cr: -1 }, extras: ['sweat', 'sweat2', 'sweat3'], body: { tremble: 1 } });
  D('F11', { name: 'GUILTY GULP',      eyes: { mode: 'open', size: 1.05, pupil: 0.55, look: [-0.9, 0.65] }, brows: { y: 7, tilt: -7 }, mouth: { w: 0.55, cl: -3, cr: -3 }, extras: ['gulp', 'sweatSmall'], head: { dy: 3 }, lock: 'collar' });
  D('F12', { name: 'CAUGHT RED-HANDED',eyes: { mode: 'open', size: 1.4, pupil: 0.22 }, brows: { y: 40, tilt: -3 }, mouth: { w: 0.4, round: 0.9, open: 12 }, extras: ['exclaim'], body: { shrug: 24, lean: -0.06 }, head: { dy: -3 } });
  D('F13', { name: 'JAW-DROP SHOCK',   eyes: { mode: 'open', size: 1.35, pupil: 0.5 }, brows: { y: 24, tilt: -2 }, mouth: { w: 0.75, round: 0.55, open: 44, tongue: 0.5, cl: 0, cr: 0 }, head: { jaw: 40, dy: 5 }, body: { lean: -0.08 } });
  D('F14', { name: 'PANIC',            eyes: { mode: 'spiral', size: 1.25 }, brows: { y: 18, tilt: -6 }, mouth: { w: 1, rect: 1, open: 30, teeth: 1 }, extras: ['sweat', 'sweat2', 'sweat3', 'sweatSmall'], head: { hairLift: 20, dy: -2 }, body: { tremble: 2.4 } });
  D('F15', { name: 'DREAMY GREED',     eyes: { mode: 'dollar', size: 1.3 }, brows: { y: 9, tilt: -2 }, mouth: { w: 1.1, cl: 8, cr: 8, open: 20, tongue: 0.8, teeth: 0.3 }, extras: ['drool', 'sparkle'], head: { dy: -10, tilt: 0.05 } });
  D('F16', { name: 'SCHEMING',         eyes: { mode: 'open', size: 0.95, pupil: 0.55, lidTop: 0.42, look: [0.85, 0] }, brows: { y: -2, tilt: 12, farY: 3 }, mouth: { w: 1.05, cl: 1, cr: 9 }, head: { tilt: 0.05, dy: 3 }, lock: 'steeple' });
  D('F17', { name: 'FURIOUS',          eyes: { mode: 'dot', size: 0.8 }, brows: { y: -6, tilt: 16 }, mouth: { w: 1.05, rect: 1, jag: 1, open: 22, teeth: 1 }, extras: ['steam', 'vein'], body: { tremble: 1.2, lean: 0.06 }, head: { dy: 2 } });
  D('F18', { name: 'STERN',            eyes: { mode: 'dot', size: 0.85, lidTop: 0.15 }, brows: { y: -7, tilt: 3 }, mouth: { w: 0.85, cl: -10, cr: -10 }, head: { tilt: 0.09, dy: 2 } });
  D('F19', { name: 'TERRIFIED',        eyes: { mode: 'open', size: 1.25, pupil: 0.24 }, brows: { y: 22, tilt: -9 }, mouth: { w: 0.95, wavy: 0.5, open: 28, cl: -5, cr: -5, teeth: 0.4 }, extras: ['sweat', 'sweat2'], head: { shake: 4 }, body: { tremble: 1.5 } });
  D('F20', { name: 'DEFEATED',         eyes: { mode: 'dot', size: 1, lidTop: 0.5, look: [0, 0.9] }, brows: { y: 2, tilt: -10 }, mouth: { w: 0.6, cl: -7, cr: -7 }, head: { dy: 24, tilt: 0.04 }, body: { shrug: -12, lean: 0.1 } });
  D('F21', { name: 'CRYING',           eyes: { mode: 'arcDown', size: 1.1 }, brows: { y: 5, tilt: -11 }, mouth: { w: 1.1, wavy: 0.5, open: 26, cl: -10, cr: -10 }, extras: ['tear'], head: { dy: 8 }, body: { tremble: 0.7 } });
  D('F22', { name: 'RELIEVED',         eyes: { mode: 'arcDown', size: 1.05 }, brows: { y: 6, tilt: -3 }, mouth: { w: 0.7, cl: 5, cr: 5, open: 14 }, extras: ['puff'], head: { tilt: 0.07, dy: 5 }, body: { shrug: -9 } });
  D('F23', { name: 'THINKING',         eyes: { mode: 'open', size: 1.05, pupil: 0.55, look: [0.6, -0.8] }, brows: { y: 9, tilt: 0, farY: 0 }, mouth: { w: 0.28, round: 0.8, open: 6, cl: 0, cr: 0 }, head: { tilt: 0.07 }, lock: 'chin' });
  D('F24', { name: 'PROUD SNOB',       eyes: { mode: 'lash', size: 1.05 }, brows: { y: 9, tilt: -1 }, mouth: { w: 0.45, cl: 3, cr: 3 }, head: { tilt: -0.26, dy: -3 } });
  D('F25', { name: 'BORED',            eyes: { mode: 'dot', size: 1, lidTop: 0.5, dart: true, blink: true }, brows: { y: -3, tilt: 0 }, mouth: { w: 0.7, open: 3, cl: 0, cr: 0 }, head: { tilt: 0.12, dy: 4 }, lock: 'cheek' });
  D('F26', { name: 'EUREKA',           eyes: { mode: 'open', size: 1.15, pupil: 0.5 }, brows: { y: 28, tilt: -1 }, mouth: { w: 0.5, round: 1, open: 24 }, extras: ['chip'], head: { dy: -3 } });
})();
