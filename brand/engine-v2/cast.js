// Bad Math engine v2 — CAST: the token-people puppet rig (SHOW-BIBLE §2-3). Canvas-2D vector shapes: flat colour, Ink outline.
// Everything here is a PURE FUNCTION OF TIME: BM2.Cast.pose(ch, t, ctx) -> pose, BM2.Cast.draw(g, ch, pose, t). No timers, no carried state.
// Load order: primitives.js, camera.js, faces.js, cast.js, looks.js, props.js, sets.js, engine.js, story.js.
//
// Rig (hip frame, facing +x, y down; the figure is ~400 px tall at scale 1; the bible's "520 px at scale 1" is C.UNIT = 1.3 times that):
//   ground -> legs (2-bone IK hip -> foot target) -> bell-shaped body -> head (+ hair/hat as a separate piece)   +  two 2-bone arms with mitten hands
// Locomotion is distance-driven: foot plants sit on a fixed lattice in world space, so feet NEVER slide.
// Faces are stop-motion replacement faces from BM2.Faces: they SNAP (2 frames of anticipation squash, 1 frame of pop, then hold) and never morph.
(function () {
  const B = window.BM2, { clamp, lerp, hash } = B, TAU = Math.PI * 2, C = (B.Cast = { looks: {}, outfits: {}, accessories: {}, hair: {}, gaits: {}, gestures: {}, builds: {} });
  const STYLE = (B.Style = Object.assign({ ink: '#0B0F14', ol: 4.2, white: '#fffdf6', paper: '#F5F3EE', mouthIn: '#3a1218', tongue: '#e8707c', blush: 'rgba(255,92,92,.38)', shadow: '#020409', sweat: '#8ddcff', fps: 30 }, B.Style || {}));
  const ss = (a, b, x) => { const u = clamp((x - a) / (b - a)); return u * u * (3 - 2 * u); };
  const eio = u => { u = clamp(u); return u * u * (3 - 2 * u); };
  const eout = u => 1 - Math.pow(1 - clamp(u), 3);
  C.UNIT = 1.3; // bible scale 1 (520 px) / our native figure height (~400 px)

  // ------------------------------------------------------------------ registries (art + config; swap freely)
  C.define = (id, def) => (C.looks[id] = def);   // a "look": head shape, hair, hat, costume, tells, palette, build
  C.outfit = (name, def) => (C.outfits[name] = def);
  C.accessory = (name, def) => (C.accessories[name] = def); // {slot:'head'|'face'|'body', draw(g, c, o)}
  C.hairStyle = (name, def) => (C.hair[name] = def);
  C.build = (name, def) => (C.builds[name] = def);
  C.gait = (name, def) => (C.gaits[name] = def);
  C.gesture = (name, fn) => (C.gestures[name] = fn);

  // token build: bell body, big head, short legs. th = body height, tw = shoulder width, bw = hem width, hh/hw = head half sizes, legL = length of ONE leg bone.
  C.build('token', { th: 188, tw: 84, bw: 128, hh: 79, hw: 80, legL: 36, legW: 19, armW: 17, armL: 53, hand: 14, head: 'round' });
  C.build('wide', { th: 180, tw: 100, bw: 152, hh: 76, hw: 78, legL: 36, legW: 20, armW: 18, armL: 52, hand: 14, head: 'round' });
  C.build('kid', { th: 150, tw: 74, bw: 112, hh: 76, hw: 78, legL: 30, legW: 16, armW: 15, armL: 44, hand: 12, head: 'round' });
  C.build('crowd', { th: 150, tw: 80, bw: 112, hh: 70, hw: 72, legL: 30, legW: 16, armW: 15, armL: 44, hand: 12, head: 'round' });

  const PAL = { skin: '#F5F3EE', hair: '#1b2433', top: '#59606B', top2: '#F5F3EE', bottom: '#2A3647', shoes: '#0B0F14', accent: '#FF3B30', eyeWhite: '#fffdf6', brow: null, ink: null };
  C.PAL = PAL;
  // costume shapes: the body bell is drawn in pal.top; "tell" shapes sit on top of it
  C.outfit('plain', { sleeve: 'long', wide: 1 });
  C.outfit('suit', { sleeve: 'long', wide: 1, tell: 'lapels' });
  C.outfit('dinner', { sleeve: 'long', wide: 1, tell: 'lapels' });
  C.outfit('apron', { sleeve: 'long', wide: 1, tell: 'apron' });
  C.outfit('robe', { sleeve: 'long', wide: 1.3, tell: 'robe' });
  C.outfit('windbreaker', { sleeve: 'long', wide: 1, tell: 'zip' });
  C.outfit('hoodie', { sleeve: 'long', wide: 1, tell: 'hoodie' });
  C.outfit('waistcoat', { sleeve: 'long', wide: 1, tell: 'vest' });
  C.outfit('jumper', { sleeve: 'long', wide: 1, tell: 'stripe' });

  // gaits (bible §3). S = stride (one full cycle = two steps) in native px: walk 150/1.3, run 260/1.3. cycle = seconds per cycle. H0, bob as fractions of the standing hip height.
  C.gait('walk',  { S: 115, cycle: 0.53, beta: 0.58, lift: 11, H0: 0.9, bob: 0.1, lean: 0.07, arm: 0.45, armE: 0.1 });
  C.gait('run',   { S: 200, cycle: 0.4, beta: 0.36, lift: 26, H0: 0.78, bob: 0.38, lean: 0.24, arm: 0.95, armE: 1.4 });
  C.gait('sneak', { S: 80, cycle: 0.8, beta: 0.72, lift: 14, H0: 0.66, bob: 0.06, lean: 0.17, arm: 0.2, armE: 0.7 });
  C.gait('stomp', { S: 100, cycle: 0.55, beta: 0.62, lift: 9, H0: 0.9, bob: 0.14, lean: 0.12, arm: 0.7, armE: 0.5 });

  // ------------------------------------------------------------------ drawing helpers
  const fillStroke = (g, fill, ink, lw) => { g.fillStyle = fill; g.fill(); if (lw > 0) { g.lineWidth = lw; g.strokeStyle = ink; g.lineJoin = 'round'; g.lineCap = 'round'; g.stroke(); } };
  function limb(g, pts, w, fill, ink, ol) {
    g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); g.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) g.lineTo(pts[i][0], pts[i][1]);
    g.strokeStyle = ink; g.lineWidth = w + ol * 2; g.stroke(); g.strokeStyle = fill; g.lineWidth = w; g.stroke();
  }
  function ik2(ax, ay, tx, ty, l1, l2, bend) {
    let dx = tx - ax, dy = ty - ay, d = Math.hypot(dx, dy); const mx = l1 + l2 - 0.5; if (d > mx) { dx *= mx / d; dy *= mx / d; d = mx; } if (d < 1) { dx = 0; dy = 1; d = 1; }
    const a = Math.atan2(dy, dx), A = Math.acos(clamp((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d), -1, 1)), th = a + bend * A;
    return [ax + Math.cos(th) * l1, ay + Math.sin(th) * l1, ax + dx, ay + dy];
  }
  C.ik2 = ik2;
  const sh = (c, k) => B.shade(c, k);
  const star4 = (g, x, y, r, col) => { g.beginPath(); for (let i = 0; i < 8; i++) { const rr = i % 2 ? r * 0.28 : r, an = (i * Math.PI) / 4 - Math.PI / 2; g.lineTo(x + Math.cos(an) * rr, y + Math.sin(an) * rr); } g.closePath(); fillStroke(g, col, STYLE.ink, 2.6); };
  // head outline: superellipse with separate top/bottom widths. shape = {w, h, n, top, bot}
  const SHAPES = { round: { w: 1, h: 1, n: 2.15, top: 1, bot: 1 }, square: { w: 0.98, h: 0.95, n: 4.2, top: 1, bot: 1 }, oval: { w: 0.84, h: 1.17, n: 2.2, top: 1, bot: 0.96 }, pear: { w: 1, h: 1, n: 2.3, top: 0.8, bot: 1.1 }, bean: { w: 1, h: 0.98, n: 2.1, top: 0.96, bot: 1.04, skew: 0.08 } };
  C.headShapes = SHAPES;
  function headPath(g, shape, hw, hh, jaw) {
    const S = SHAPES[shape] || SHAPES.round, N = 44; g.beginPath();
    for (let i = 0; i < N; i++) { const a = (i / N) * TAU, c = Math.cos(a), s = Math.sin(a), e = 2 / S.n; let x = Math.sign(c) * Math.pow(Math.abs(c), e) * hw * S.w, y = Math.sign(s) * Math.pow(Math.abs(s), e) * hh * S.h;
      const k = (y + hh) / (2 * hh); x *= lerp(S.top, S.bot, clamp(k)); if (y > 0) y += jaw * Math.pow(Math.abs(s), 1.4); x += (S.skew || 0) * y; i ? g.lineTo(x, y) : g.moveTo(x, y); }
    g.closePath();
  }

  // ------------------------------------------------------------------ hair / hats / accessories (head frame: origin = head centre, +x forward)
  // c = {pal, ink, ol, a, fx, hw, hh, ex, ey, my, jaw, mir, lift, k}
  const HAIR = (name, back, front) => C.hairStyle(name, { back, front });
  HAIR('bald', null, null);
  HAIR('tuft', null, (g, c) => { g.beginPath(); g.moveTo(-10, -c.hh * 0.95 - c.lift); g.quadraticCurveTo(-4, -c.hh * 1.5 - c.lift, 10, -c.hh * 0.95 - c.lift); g.closePath(); fillStroke(g, c.pal.hair, c.ink, c.ol); });
  HAIR('swoop', null, (g, c) => { const { hw, hh } = c, L = c.lift; g.beginPath(); g.moveTo(-hw * 0.9, -hh * 0.3 - L); g.bezierCurveTo(-hw * 0.9, -hh * 1.2 - L, hw * 0.6, -hh * 1.35 - L, hw * 1.25, -hh * 0.62 - L); g.bezierCurveTo(hw * 0.55, -hh * 0.78 - L, hw * 0.1, -hh * 0.6 - L, -hw * 0.45, -hh * 0.52 - L * 0.5); g.quadraticCurveTo(-hw * 0.8, -hh * 0.5, -hw * 0.9, -hh * 0.3 - L); g.closePath(); fillStroke(g, c.pal.hair, c.ink, c.ol); });
  HAIR('parted', null, (g, c) => { const { hw, hh } = c, L = c.lift; g.beginPath(); g.moveTo(-hw * 0.95, -hh * 0.1 - L); g.bezierCurveTo(-hw * 1.05, -hh * 1.25 - L, hw * 1.05, -hh * 1.25 - L, hw * 0.95, -hh * 0.1 - L); g.quadraticCurveTo(hw * 0.7, -hh * 0.62 - L * 0.6, hw * 0.12, -hh * 0.66); g.quadraticCurveTo(-hw * 0.3, -hh * 0.9, -hw * 0.6, -hh * 0.5); g.quadraticCurveTo(-hw * 0.9, -hh * 0.42, -hw * 0.95, -hh * 0.1 - L); g.closePath(); fillStroke(g, c.pal.hair, c.ink, c.ol); });
  HAIR('bun', (g, c) => { g.beginPath(); g.arc(0, -c.hh * 1.15 - c.lift, 30, 0, TAU); fillStroke(g, c.pal.hair, c.ink, c.ol); }, (g, c) => { const { hw, hh } = c, L = c.lift; g.beginPath(); g.moveTo(-hw * 0.95, -hh * 0.1 - L); g.bezierCurveTo(-hw * 1.0, -hh * 1.15 - L, hw * 1.0, -hh * 1.15 - L, hw * 0.95, -hh * 0.1 - L); g.quadraticCurveTo(hw * 0.5, -hh * 0.62, 0, -hh * 0.6); g.quadraticCurveTo(-hw * 0.5, -hh * 0.62, -hw * 0.95, -hh * 0.1 - L); g.closePath(); fillStroke(g, c.pal.hair, c.ink, c.ol); });
  HAIR('long', (g, c) => { const { hw, hh } = c; g.beginPath(); g.moveTo(-hw * 1.0, -hh * 0.3); g.quadraticCurveTo(-hw * 1.2, hh * 1.0, -hw * 0.8, hh * 1.2); g.lineTo(hw * 0.8, hh * 1.2); g.quadraticCurveTo(hw * 1.2, hh * 1.0, hw * 1.0, -hh * 0.3); g.closePath(); fillStroke(g, c.pal.hair, c.ink, c.ol); }, (g, c) => { const { hw, hh } = c, L = c.lift; g.beginPath(); g.moveTo(-hw * 1.0, hh * 0.1); g.bezierCurveTo(-hw * 1.1, -hh * 1.2 - L, hw * 1.1, -hh * 1.2 - L, hw * 1.0, hh * 0.1); g.quadraticCurveTo(hw * 0.8, -hh * 0.5, 0, -hh * 0.55); g.quadraticCurveTo(-hw * 0.5, -hh * 0.7, -hw * 0.8, -hh * 0.1); g.closePath(); fillStroke(g, c.pal.hair, c.ink, c.ol); });
  HAIR('curly', null, (g, c) => { const { hw, hh } = c, L = c.lift; g.beginPath(); for (let i = 0; i < 9; i++) { const an = Math.PI + (i / 8) * Math.PI, x = Math.cos(an) * hw * 0.95, y = Math.sin(an) * hh * 0.95 + hh * 0.05 - L; g.moveTo(x + 26, y); g.arc(x, y, 26, 0, TAU); } g.fillStyle = c.pal.hair; g.fill(); g.lineWidth = c.ol; g.strokeStyle = c.ink; g.stroke(); g.beginPath(); g.ellipse(0, -hh * 0.4 - L, hw * 0.9, hh * 0.5, 0, 0, TAU); g.fillStyle = c.pal.hair; g.fill(); });
  const HAT = (name, fn) => C.accessory(name, { slot: 'head', draw: fn });
  HAT('flatcap', (g, c, o) => { const { hw, hh } = c, col = o.color || c.pal.top, L = c.lift; g.beginPath(); g.moveTo(-hw * 0.98, -hh * 0.25 - L); g.bezierCurveTo(-hw * 1.0, -hh * 1.3 - L, hw * 1.0, -hh * 1.3 - L, hw * 0.98, -hh * 0.25 - L); g.closePath(); fillStroke(g, col, c.ink, c.ol); g.beginPath(); g.moveTo(hw * 0.1, -hh * 0.3 - L); g.quadraticCurveTo(hw * 1.3, -hh * 0.45 - L, hw * 1.4, -hh * 0.2 - L); g.quadraticCurveTo(hw * 0.8, -hh * 0.12 - L, hw * 0.1, -hh * 0.14 - L); g.closePath(); fillStroke(g, sh(col, -0.18), c.ink, c.ol); });
  HAT('visor', (g, c, o) => { const { hw, hh } = c, col = o.color || '#2d6a4f', L = c.lift; g.beginPath(); g.moveTo(-hw * 0.92, -hh * 0.5 - L); g.quadraticCurveTo(0, -hh * 0.74 - L, hw * 0.92, -hh * 0.5 - L); g.lineTo(hw * 1.3, -hh * 0.38 - L); g.quadraticCurveTo(0, -hh * 0.6 - L, -hw * 1.0, -hh * 0.38 - L); g.closePath(); fillStroke(g, col, c.ink, c.ol); });
  HAT('tophat', (g, c, o) => { const { hw, hh } = c, col = o.color || '#23201f', L = c.lift; g.beginPath(); g.ellipse(0, -hh * 0.75 - L, hw * 1.2, 13, 0, 0, TAU); fillStroke(g, col, c.ink, c.ol); g.beginPath(); g.rect(-hw * 0.7, -hh * 1.85 - L, hw * 1.4, hh * 1.1); fillStroke(g, col, c.ink, c.ol); g.beginPath(); g.rect(-hw * 0.7, -hh * 1.1 - L, hw * 1.4, 16); fillStroke(g, o.band || c.pal.accent, c.ink, c.ol * 0.7); });
  HAT('crown', (g, c, o) => { const { hw, hh } = c, col = o.color || '#F2B705', L = c.lift; g.beginPath(); g.moveTo(-hw * 0.8, -hh * 0.62 - L); g.lineTo(-hw * 0.88, -hh * 1.4 - L); g.lineTo(-hw * 0.4, -hh * 1.05 - L); g.lineTo(0, -hh * 1.55 - L); g.lineTo(hw * 0.4, -hh * 1.05 - L); g.lineTo(hw * 0.88, -hh * 1.4 - L); g.lineTo(hw * 0.8, -hh * 0.62 - L); g.closePath(); fillStroke(g, col, c.ink, c.ol); });
  HAT('hood', (g, c, o) => { const { hw, hh } = c, col = o.color || c.pal.top, L = c.lift; g.beginPath(); g.moveTo(-hw * 1.1, hh * 0.2); g.bezierCurveTo(-hw * 1.3, -hh * 1.5 - L, hw * 1.3, -hh * 1.5 - L, hw * 1.1, hh * 0.2); g.quadraticCurveTo(hw * 0.85, -hh * 0.55, 0, -hh * 0.62); g.quadraticCurveTo(-hw * 0.85, -hh * 0.55, -hw * 1.1, hh * 0.2); g.closePath(); fillStroke(g, col, c.ink, c.ol); });
  const FACE = (name, fn) => C.accessory(name, { slot: 'face', draw: fn });
  FACE('glasses', (g, c, o) => { for (const side of [0, 1]) { const x = c.fx + (side ? c.ex * (1 - 0.1 * c.a) : -c.ex), s = side ? 1 - 0.25 * c.a : 1, r = 26 * s * c.k; g.save(); g.translate(x, c.ey); g.beginPath(); if (o.kind === 'square') g.roundRect(-r, -r * 0.85, r * 2, r * 1.7, 6); else g.arc(0, 0, r, 0, TAU); g.fillStyle = 'rgba(190,230,255,.22)'; g.fill(); g.lineWidth = c.ol * 0.9; g.strokeStyle = o.color || c.ink; g.stroke(); g.restore(); } g.beginPath(); g.moveTo(c.fx - c.ex + 26 * c.k, c.ey); g.lineTo(c.fx + c.ex * (1 - 0.1 * c.a) - 26 * c.k * (1 - 0.25 * c.a), c.ey); g.lineWidth = c.ol * 0.9; g.strokeStyle = o.color || c.ink; g.stroke(); });
  FACE('sunbar', (g, c) => { g.beginPath(); g.roundRect(c.fx - c.ex - 32 * c.k, c.ey - 20 * c.k, c.ex * 2 + 64 * c.k, 38 * c.k, 10); fillStroke(g, '#0B0F14', c.ink, c.ol); g.beginPath(); g.moveTo(c.fx - c.ex - 18 * c.k, c.ey - 9 * c.k); g.lineTo(c.fx - c.ex + 6 * c.k, c.ey - 9 * c.k); g.strokeStyle = 'rgba(255,255,255,.25)'; g.lineWidth = 4; g.stroke(); });
  const BODY = (name, fn) => C.accessory(name, { slot: 'body', draw: fn });
  BODY('bowtie', (g, c, o) => { const x = c.a * 6, y = -c.th + 20, col = o.color || c.pal.accent; for (const s of [-1, 1]) { g.beginPath(); g.moveTo(x, y); g.lineTo(x + s * 24, y - 12); g.lineTo(x + s * 24, y + 12); g.closePath(); fillStroke(g, col, c.ink, c.ol * 0.8); } g.beginPath(); g.arc(x, y, 6.5, 0, TAU); fillStroke(g, sh(col, -0.25), c.ink, c.ol * 0.6); });
  BODY('tie', (g, c, o) => { const x = c.a * 7, y = -c.th + 24, col = o.color || c.pal.accent; g.beginPath(); g.moveTo(x - 7, y); g.lineTo(x + 7, y); g.lineTo(x + 12, y + 70); g.lineTo(x, y + 84); g.lineTo(x - 12, y + 70); g.closePath(); fillStroke(g, col, c.ink, c.ol * 0.8); });
  BODY('pocketsquare', (g, c, o) => { g.save(); g.translate(-26 + c.a * 3, -c.th * 0.62); g.beginPath(); g.moveTo(-9, 6); g.lineTo(-11, -12); g.lineTo(-2, -4); g.lineTo(5, -15); g.lineTo(9, 6); g.closePath(); fillStroke(g, o.color || '#FF3B30', c.ink, c.ol * 0.7); g.restore(); });
  BODY('scarf', (g, c, o) => { const col = o.color || c.pal.accent; g.beginPath(); g.roundRect(-c.tw * 0.5, -c.th + 14, c.tw, 24, 12); fillStroke(g, col, c.ink, c.ol); g.beginPath(); g.moveTo(8 + c.a * 6, -c.th + 30); g.lineTo(34 + c.a * 6, -c.th + 30); g.lineTo(30 + c.a * 6, -c.th + 90); g.lineTo(10 + c.a * 6, -c.th + 86); g.closePath(); fillStroke(g, sh(col, -0.14), c.ink, c.ol * 0.8); });
  BODY('badge', (g, c, o) => { g.save(); g.translate(-24, -c.th * 0.55); g.beginPath(); for (let i = 0; i < 10; i++) { const r = i % 2 ? 6 : 15, an = -Math.PI / 2 + (i * Math.PI) / 5; g.lineTo(Math.cos(an) * r, Math.sin(an) * r); } g.closePath(); fillStroke(g, o.color || '#F2B705', c.ink, c.ol * 0.7); g.restore(); });
  BODY('cufflinks', () => {});

  // ------------------------------------------------------------------ face system
  const FACE_DEF = { eyes: { mode: 'dot', size: 1, farSize: null, pupil: 0.8, lidTop: 0, lidSlope: 0, lidBot: 0, look: null, dart: false, blink: true }, brows: { y: 0, tilt: 0, farY: null, farTilt: null }, mouth: { w: 0.55, dx: 0, cl: 0, cr: 0, open: 0, teeth: 0, tongue: 0, round: 0, wavy: 0, rect: 0, jag: 0, talk: true }, head: { tilt: 0, dy: 0, dx: 0, jaw: 0, hairLift: 0, shake: 0 }, body: { lean: 0, shrug: 0, tremble: 0 }, extras: [], lock: null };
  const faceCache = {};
  function normFace(name) {
    let id = B.Faces.resolve(name); if (!id) { console.warn('unknown face "' + name + '" (using F01)'); id = 'F01'; } if (faceCache[id]) return faceCache[id];
    const s = B.Faces.library[id], f = { id, name: s.name, extras: s.extras || [], lock: s.lock || null }; for (const k of ['eyes', 'brows', 'mouth', 'head', 'body']) f[k] = Object.assign({}, FACE_DEF[k], s[k]); return (faceCache[id] = f);
  }
  C.normFace = normFace; C.clearFaceCache = () => { for (const k in faceCache) delete faceCache[k]; };
  const extras = (B.Faces.extras = B.Faces.extras || {});
  const stepT = (t, fps = 12) => Math.floor(t * fps) / fps; // stop-motion: animate "on twos/threes"
  C.stepT = stepT;
  const drop = (g, x, y, s, col) => { g.beginPath(); g.moveTo(x, y - 13 * s); g.quadraticCurveTo(x + 10 * s, y + 2 * s, x, y + 8 * s); g.quadraticCurveTo(x - 10 * s, y + 2 * s, x, y - 13 * s); g.closePath(); fillStroke(g, col, STYLE.ink, 3); };
  const bigText = (g, c, ch, x, y, size, col) => { g.save(); g.translate(x, y); g.scale(c.mir, 1); g.font = `${size}px Anton, Impact, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.lineJoin = 'round'; g.lineWidth = 11; g.strokeStyle = c.ink; g.strokeText(ch, 0, 0); g.fillStyle = col; g.fillText(ch, 0, 0); g.restore(); };
  extras.sweat = (g, c, t) => { const k = (stepT(t, 8) * 0.9) % 1; drop(g, c.hw * 0.86, -c.hh * 0.4 + k * 44, 1 - 0.3 * k, STYLE.sweat); };
  extras.sweat2 = (g, c, t) => { const k = (stepT(t + 0.4, 8) * 0.9) % 1; drop(g, -c.hw * 0.95, -c.hh * 0.15 + k * 46, 0.9 - 0.3 * k, STYLE.sweat); };
  extras.sweat3 = (g, c, t) => { const k = (stepT(t + 0.7, 8) * 0.9) % 1; drop(g, c.hw * 1.0, c.hh * 0.2 + k * 38, 0.8 - 0.3 * k, STYLE.sweat); };
  extras.sweatSmall = (g, c) => drop(g, c.hw * 0.84, -c.hh * 0.42, 0.85, STYLE.sweat);
  extras.blush = (g, c) => { g.fillStyle = STYLE.blush; for (const s of [-1, 1]) { g.beginPath(); g.ellipse(c.fx + s * (c.ex + 14 * c.k) * (s > 0 ? 1 - 0.2 * c.a : 1), c.ey + 30 * c.k, 17 * c.k, 10 * c.k, 0, 0, TAU); g.fill(); } };
  extras.vein = (g, c, t) => { const p = 1 + 0.2 * (stepT(t, 8) % 0.25 > 0.12 ? 1 : 0); g.save(); g.translate(c.hw * 0.55, -c.hh * 0.6); g.scale(p, p); g.strokeStyle = '#FF3B30'; g.lineWidth = 6; g.lineCap = 'round'; for (const [a, b, d, e] of [[-12, -4, -2, -4], [-4, -12, -4, -2], [12, -4, 2, -4], [4, -12, 4, -2], [-12, 4, -2, 4], [-4, 12, -4, 2], [12, 4, 2, 4], [4, 12, 4, 2]]) { g.beginPath(); g.moveTo(a, b); g.quadraticCurveTo(d * 0.4, e * 0.4, d, e); g.stroke(); } g.restore(); };
  extras.steam = (g, c, t) => { for (const [x, ph] of [[-c.hw * 1.2, 0], [c.hw * 1.2, 0.5]]) { const k = (stepT(t, 8) * 1.3 + ph) % 1; g.save(); g.globalAlpha = 1 - k; g.beginPath(); g.arc(x, -c.hh * 0.2 - k * 70, 13 + 11 * k, 0, TAU); g.fillStyle = '#fff'; g.fill(); g.lineWidth = 3.2; g.strokeStyle = STYLE.ink; g.stroke(); g.restore(); } };
  extras.sparkle = (g, c, t) => { const s = stepT(t, 8); for (let i = 0; i < 2; i++) { const an = -0.6 - i * 1.9, k = 0.5 + 0.5 * Math.sin(s * 9 + i * 2.1); star4(g, Math.cos(an) * c.hw * 1.3, Math.sin(an) * c.hh * 1.15, 12 + 8 * k, '#FFD60A'); } };
  extras.tear = (g, c, t) => { for (const [s, ph] of [[-1, 0], [1, 0.45]]) { const k = (stepT(t, 8) * 1.2 + ph) % 1, x = c.fx + s * (c.ex + 6) * (s > 0 ? 1 - 0.2 * c.a : 1); g.save(); g.globalAlpha = clamp(1.6 - k * 1.6); drop(g, x + s * k * 22, c.ey + 24 + k * 60, 1.1, STYLE.sweat); g.restore(); } };
  extras.gulp = (g, c, t, st) => { const k = ss(0.1, 0.35, st.u) * (1 - ss(0.55, 0.8, st.u)); g.beginPath(); g.ellipse(c.fx * 0.4, c.hh * 1.0 + 12 * k + c.jaw, 9, 10, 0, 0, TAU); fillStroke(g, sh(c.pal.skin, -0.12), c.ink, 2.6); };
  extras.question = (g, c, t) => bigText(g, c, '?', c.hw * 0.95, -c.hh * 1.18 - (stepT(t, 6) % 0.5) * 8, 80, '#FFD60A');
  extras.exclaim = (g, c, t) => bigText(g, c, '!', c.hw * 0.9, -c.hh * 1.3 - (stepT(t, 8) % 0.25) * 16, 88, '#FF3B30');
  extras.chip = (g, c) => { g.save(); g.translate(0, -c.hh * 1.55); g.rotate(-0.1); g.beginPath(); g.roundRect(-18, -34, 36, 68, 6); fillStroke(g, '#F5F3EE', c.ink, 3); g.fillStyle = c.ink; g.fillRect(-5, -22, 10, 28); g.beginPath(); g.arc(0, 18, 6, 0, TAU); g.fill(); g.restore(); };
  extras.zzz = (g, c, t) => { const k = (stepT(t, 6) * 0.5) % 1; for (let i = 0; i < 2; i++) bigText(g, c, 'Z', c.hw * (0.9 + 0.3 * i), -c.hh * (0.9 + 0.4 * i) - k * 14, 38 - i * 8, '#d9ecff'); };
  extras.drool = (g, c, t) => { const k = (stepT(t, 6) * 0.8) % 1; drop(g, c.fx + 26, c.my + 28 + k * 18, 0.8, '#bfe9ff'); };
  extras.puff = (g, c, t) => { const k = (stepT(t, 6) * 1.1) % 1; g.save(); g.globalAlpha = 1 - k; g.beginPath(); g.arc(c.fx + 54 + k * 40, c.my + 6 - k * 12, 10 + 10 * k, 0, TAU); g.fillStyle = '#fff'; g.fill(); g.lineWidth = 3; g.strokeStyle = STYLE.ink; g.stroke(); g.restore(); };

  // ------------------------------------------------------------------ pose evaluation (pure functions of t)
  const LANE = 64; C.LANE = LANE; C.laneY = l => l * LANE; C.laneS = l => 1 + 0.06 * l;
  function facingAt(ch, t) { let cur = ch.facing0 == null ? 1 : ch.facing0; for (const k of ch.facing) { if (t < k.t) break; const d = k.dur == null ? 0.25 : k.dur; if (d > 0 && t < k.t + d) return lerp(cur, k.v, eio((t - k.t) / d)); cur = k.v; } return cur; }
  function pathPoint(seg, D) { const pts = seg.pts; let d = D; for (let i = 1; i < pts.length; i++) { const L = seg.lens[i - 1]; if (d <= L || i === pts.length - 1) { const u = L > 0 ? clamp(d / L) : 1; return { x: lerp(pts[i - 1][0], pts[i][0], u), lane: lerp(pts[i - 1][1], pts[i][1], u), dir: Math.sign(pts[i][0] - pts[i - 1][0]) || 1 }; } d -= L; } const p = pts[pts.length - 1]; return { x: p[0], lane: p[1], dir: 1 }; }
  function distAt(seg, t) { const T = seg.t1 - seg.t0, u = clamp(t - seg.t0, 0, T), ta = Math.min(seg.ta, T / 2), v = seg.L / (T - ta); if (u < ta) return (v * u * u) / (2 * ta); if (u > T - ta) { const r = T - u; return seg.L - (v * r * r) / (2 * ta); } return (v * ta) / 2 + v * (u - ta); }
  // seg: {t0, t1, pts:[[x,lane]...], gait}. Adds lens, L, n (steps), hstep, S (stride adjusted so the move ends with the feet together).
  C.compileSeg = function (seg, build) {
    const g = C.gaits[seg.gait || 'walk']; seg.lens = []; seg.L = 0; for (let i = 1; i < seg.pts.length; i++) { const l = Math.hypot(seg.pts[i][0] - seg.pts[i - 1][0], (seg.pts[i][1] - seg.pts[i - 1][1]) * LANE); seg.lens.push(l); seg.L += l; }
    seg.g = g; seg.leg = (build || C.builds.token).legL; seg.n = Math.max(1, Math.round(seg.L / (g.S / 2))); seg.hstep = seg.L / seg.n; seg.S = seg.hstep * 2; seg.ta = seg.ta || 0.3; return seg;
  };
  function plantsOf(seg) { if (seg._pl) return seg._pl; const n = seg.n, pl = []; for (let k = 1; k <= n; k++) pl.push({ leg: k % 2 ? 'far' : 'near', P: k * seg.hstep }); pl.push({ leg: n % 2 ? 'near' : 'far', P: seg.L }); return (seg._pl = pl); }
  function footWorld(seg, leg, D) {
    const pl = plantsOf(seg).filter(p => p.leg === leg), g = seg.g, half = (seg.S * g.beta) / 2; let prev = 0, prevEnd = 0;
    for (let i = 0; i < pl.length; i++) { const p = pl[i], isLast = p.P >= seg.L - 1e-6, stanceEnd = isLast ? Infinity : p.P + half, sEnd = Math.min(p.P - half, seg.L), swingStart = Math.max(prevEnd, 0);
      if (D < sEnd) { const a = swingStart, b = Math.max(sEnd, a + 1e-3); if (D < a) return { x: prev, lift: 0, rot: 0 }; const u = clamp((D - a) / (b - a)), e = eio(u); return { x: lerp(prev, p.P, e), lift: Math.sin(Math.PI * u) * g.lift * Math.min(1, (p.P - prev) / (seg.hstep * 0.9) + 0.2), rot: -0.5 * Math.sin(Math.PI * Math.min(1, u * 1.15)) * (u < 0.5 ? 1 : 0.4) }; }
      if (D <= stanceEnd) return { x: p.P, lift: 0, rot: 0 }; prev = p.P; prevEnd = p.P + half; }
    return { x: prev, lift: 0, rot: 0 };
  }
  function gaitAt(seg, D) {
    const g = seg.g, Hs = seg.leg * 2 * 0.96, env = clamp(Math.min(D, seg.L - D) / Math.max(8, seg.hstep * 0.9)), cyc = Math.cos((TAU * D) / seg.hstep), H0 = Hs * g.H0, bob = Hs * g.bob;
    const h = lerp(Hs, H0 + bob * cyc, env), fa = footWorld(seg, 'near', D), fb = footWorld(seg, 'far', D), sw = Math.sin((TAU * D) / seg.S) * env;
    return { h, near: { x: fa.x - D, lift: fa.lift, rot: fa.rot }, far: { x: fb.x - D, lift: fb.lift, rot: fb.rot }, armN: sw * g.arm, armF: -sw * g.arm, armE: g.armE * env, lean: g.lean * env, env, cycle: cyc };
  }
  C.gaitAt = gaitAt;
  // position at time t: placements (hard cuts) and moves, in time order
  function moveAt(ch, t) {
    let last = { x: ch.init.x, lane: ch.init.lane || 0 }, cur = null;
    for (const e of ch.timeline) { if (e.place) { if (t >= e.t0) last = { x: e.place.x, lane: e.place.lane }; else break; continue; } if (t < e.t0) break; if (t >= e.t1) { const p = e.pts[e.pts.length - 1]; last = { x: p[0], lane: p[1] }; continue; } cur = e; break; }
    if (!cur) return { ...last, D: 0, seg: null, moving: false };
    const D = distAt(cur, t), p = pathPoint(cur, D); return { x: p.x, lane: p.lane, D, seg: cur, moving: true, dir: p.dir };
  }
  C.moveAt = moveAt; C.facingAt = facingAt;
  function keyAt(keys, t, def) { let v = def; for (const k of keys) { if (t < k.t) break; v = k; } return v; }
  function smoothKey(keys, t, def) { let from = def, to = def, tt = -1e9, dur = 0; for (const k of keys) { if (t < k.t) break; from = to; to = k.v; tt = k.t; dur = k.dur == null ? 0.25 : k.dur; } return dur > 0 ? lerp(from, to, eio((t - tt) / dur)) : to; }

  // gestures: return {near, far, head:{tilt,dy}, lean, shrug, hop, squash}. arm = {th, e} (angles from straight down) or {hx, hy, bend} (hand target in "legacy hip units", mapped onto the build)
  C.gesture('point', (lt, o, x) => { const d = x.dirTo(o.target, lt); return { [o.arm || 'near']: { th: d.th + Math.sin(lt * 7) * 0.025, e: 0.1, finger: 1 }, head: { tilt: -0.03 }, lean: 0.03 }; });
  C.gesture('shrug', (lt) => { const k = eout(lt / 0.12); return { near: { th: 0.55 * k, e: 1.9 * k, open: 1 }, far: { th: 0.55 * k, e: 1.9 * k, open: 1 }, shrug: 18 * k, head: { tilt: 0.1 * k, dy: 5 * k } }; });
  C.gesture('facepalm', (lt, o) => ({ [o.arm || 'near']: { hx: 20, hy: -176, bend: 1 }, head: { tilt: 0.1, dy: 9 }, lean: 0.1 }));
  C.gesture('count', (lt, o) => { const step = o.step || 0.5, n = Math.min(o.n || 3, Math.floor(Math.max(0, lt - 0.3) / step) + 1), tap = Math.floor((lt / step) * 2) % 2; return { near: { hx: 34, hy: -92, bend: 1, fingers: n }, far: { hx: 22 + tap * 3, hy: -74 - tap * 3, bend: 1, finger: 1 }, head: { dy: 4, tilt: 0.04 } }; });
  C.gesture('hold', (lt, o) => ({ [o.arm || 'near']: { hx: 38, hy: -70 + Math.sin(lt * 2.2) * 2, bend: 1, prop: o.prop, propRot: o.rot == null ? -0.15 : o.rot, propScale: o.propScale }, lean: 0.02 }));
  C.gesture('present', (lt, o) => ({ [o.arm || 'near']: { hx: 56, hy: -100, bend: 1, prop: o.prop, propRot: o.rot == null ? 0 : o.rot, propScale: o.propScale }, lean: 0.05 }));
  C.gesture('armsUp', (lt) => { const k = eout(lt / 0.12), w = Math.sin(lt * 14) * 0.12; return { near: { th: (2.85 + w) * k, e: -0.25 }, far: { th: (2.85 - w) * k, e: -0.25 }, hop: Math.abs(Math.sin(lt * 7)) * 14 * k, head: { tilt: -0.08 }, lean: -0.05 }; });
  C.gesture('slam', (lt) => { const up = eio(lt / 0.34), down = ss(0.34, 0.44, lt), th = lerp(0, 2.6, up) * (1 - down) + 1.5 * down, e = lerp(0.1, 0.9, up) * (1 - down) + 0.35 * down, hit = lt > 0.44 ? Math.exp(-(lt - 0.44) * 11) : 0; return { near: { th, e }, far: { th, e }, lean: 0.25 * down - 0.12 * up * (1 - down), head: { dy: 6 * hit }, squash: hit * 0.07 }; });
  C.gesture('wave', (lt, o) => ({ [o.arm || 'near']: { th: 2.7 * eout(lt / 0.2), e: 0.6 + Math.sin(lt * 11) * 0.5 }, head: { tilt: 0.05 } }));
  C.gesture('think', (lt, o) => ({ [o.arm || 'near']: { hx: 26, hy: -140, bend: 1 }, head: { tilt: 0.08, dy: 3 } }));
  C.gesture('cover', () => ({ near: { hx: 24, hy: -194, bend: 1 }, far: { hx: 24, hy: -190, bend: 1 }, head: { dy: 6 }, lean: 0.08 }));
  C.gesture('crossed', () => ({ near: { hx: 30, hy: -92, bend: -1 }, far: { hx: 30, hy: -98, bend: 1 } }));
  C.gesture('behind', () => ({ near: { hx: -34, hy: -70, bend: 1 }, far: { hx: -30, hy: -68, bend: 1 }, lean: 0.02 }));
  C.gesture('clap', (lt) => { const k = Math.floor(lt * 7) % 2; return { near: { hx: 34 - k * 10, hy: -92, bend: 1 }, far: { hx: 16 + k * 10, hy: -92, bend: 1 }, head: { dy: k * 2 } }; });
  C.gesture('hands-up', (lt) => { const k = eout(lt / 0.15); return { near: { th: 2.1 * k, e: 0.7 }, far: { th: 2.1 * k, e: 0.7 }, shrug: 6 * k, lean: -0.05 }; });
  C.gesture('shake-fist', (lt, o) => ({ [o.arm || 'near']: { th: 2.4 + Math.sin(lt * 16) * 0.12, e: 0.5, fist: 1 }, lean: 0.05 }));
  C.gesture('lean-in', () => ({ lean: 0.22, head: { dy: 6 } }));
  C.gesture('recoil', (lt) => ({ lean: -0.2 * eout(lt / 0.1), head: { dy: -4 }, near: { th: 0.8, e: 0.8 }, far: { th: 0.8, e: 0.8 } }));
  C.gesture('clutch', (lt, o) => ({ near: { hx: 30, hy: -86, bend: 1, prop: o.prop, propScale: o.propScale }, far: { hx: 24, hy: -82, bend: 1 }, lean: 0.03 }));
  C.gesture('raise-paddle', (lt, o) => ({ [o.arm || 'near']: { th: 2.75, e: 0.1, prop: o.prop || 'paddle', propRot: 0 }, lean: -0.03 }));
  C.gesture('stand', () => ({}));
  C.gesture('stir', (lt, o) => { const a = lt * 9; return { [o.arm || 'near']: { hx: 46 + Math.cos(a) * 12, hy: -62 + Math.sin(a) * 8, bend: 1, prop: o.prop, propRot: -0.3 + Math.cos(a) * 0.1 }, lean: 0.06, head: { dy: 4 } }; });
  C.gesture('tap', (lt, o) => { const k = Math.floor(lt * 6) % 2; return { [o.arm || 'near']: { hx: 56, hy: -70 + k * 10, bend: 1, finger: 1 }, lean: 0.04, head: { dy: 3 } }; });
  C.gesture('push-stack', (lt, o) => { const k = Math.sin(lt * 5) * 0.5 + 0.5; return { near: { hx: 52 + k * 24, hy: -78, bend: 1 }, far: { hx: 46 + k * 24, hy: -86, bend: 1 }, lean: 0.12 + k * 0.08, head: { dy: 5 } }; });
  C.gesture('unfold', (lt, o) => { const k = eout(lt / 0.5); return { near: { hx: 36 + k * 22, hy: -92, bend: 1, prop: o.prop }, far: { hx: 26 - k * 20, hy: -92, bend: -1 }, lean: 0.03 }; });
  C.gesture('peek', () => ({ head: { tilt: 0.12 }, lean: 0.1 }));
  const LOCKS = { armsUp: () => ({ near: { th: 2.9, e: -0.25 }, far: { th: 2.9, e: -0.25 } }), steeple: () => ({ near: { hx: 14, hy: -132, bend: 1 }, far: { hx: 18, hy: -128, bend: -1 } }), chin: () => ({ near: { hx: 22, hy: -140, bend: 1 } }), collar: () => ({ near: { hx: 16, hy: -122, bend: 1 } }), cheek: () => ({ near: { hx: 40, hy: -150, bend: 1 } }) };

  C.pose = function (ch, t, ctx) {
    const tf = ctx.tFace == null ? t : ctx.tFace, m = moveAt(ch, t), fcg = facingAt(ch, t), a = Math.abs(fcg), mir = fcg < 0 ? -1 : 1, seg = m.seg, b = ch.b, legTot = b.legL * 2, Hs = legTot * 0.96;
    const P = { x: m.x, lane: m.lane, y: C.laneY(m.lane), sc: ch.scale * C.laneS(m.lane), mir, a, moving: m.moving, D: m.D, t };
    const crouch = smoothKey(ch.crouch, t, 0); let hipH = Hs - crouch * legTot * 0.45, lean = 0, armN = { th: 0.06, e: 0.12 }, armF = { th: -0.04, e: 0.12 }, fn = { x: -2 * a, lift: 0, rot: 0 }, ff = { x: 3 + 2 * a, lift: 0, rot: 0 };
    const breathe = Math.sin((TAU * t) / 3.4 + ch.seed), sway = Math.sin((TAU * t) / 5.3 + ch.seed * 1.7);
    if (seg) { const g = gaitAt(seg, m.D); hipH = Math.min(g.h, hipH); fn = { x: g.near.x - 2 * a, lift: g.near.lift, rot: g.near.rot }; ff = { x: g.far.x + 3 + 2 * a, lift: g.far.lift, rot: g.far.rot }; lean = g.lean; armN = { th: g.armN, e: g.armE }; armF = { th: g.armF, e: g.armE }; }
    else { armN = { th: 0.06 + 0.025 * breathe, e: 0.12 }; armF = { th: -0.05 - 0.02 * breathe, e: 0.12 }; fn.x += sway * 1.2; ff.x -= sway * 1.2; }
    let headTilt = 0, headDy = 0, headDx = 0, shrug = 0, hop = 0, squash = 0;
    const F = C.faceAt(ch, tf, ctx); P.face = F;
    headTilt += F.head.tilt; headDy += F.head.dy * 0.8; headDx += F.head.dx; lean += F.body.lean; shrug += F.body.shrug; P.hairLift = F.head.hairLift;
    let trx = 0, try_ = 0; if (F.body.tremble) { const s = stepT(t, 15); trx = Math.sin(s * 91) * F.body.tremble; try_ = Math.cos(s * 77) * F.body.tremble * 0.6; } if (F.head.shake) headDx += Math.sin(Math.floor(tf * 15) * 12.3) * F.head.shake * 0.7;
    // pose locked to the face (F05 fists up, F16 steeple, F23 chin, F11 collar, F25 cheek) once the swap has landed
    if (F.lock && !F.anticipating) { const L = LOCKS[F.lock](); if (L.near) armN = L.near; if (L.far) armF = L.far; }
    for (const gs of ch.gestures) {
      if (t < gs.t0 - 0.001 || t > gs.t1 + 0.3) continue; const lt = t - gs.t0, wIn = eout(lt / (gs.rampIn || 0.14)), wOut = 1 - eio((t - gs.t1) / (gs.rampOut || 0.2)), w = clamp(Math.min(wIn, t > gs.t1 ? wOut : 1));
      const r = C.gestures[gs.kind](lt, gs, ctx.gx(ch, P, t)); if (!r) continue;
      if (r.near) armN = mixArm(armN, r.near, w); if (r.far) armF = mixArm(armF, r.far, w);
      if (r.head) { headTilt += (r.head.tilt || 0) * w; headDy += (r.head.dy || 0) * w; } lean += (r.lean || 0) * w; shrug += (r.shrug || 0) * w; hop += (r.hop || 0) * w; squash += (r.squash || 0) * w;
    }
    P.hipH = hipH - hop; P.lean = lean + crouch * 0.12; P.armN = armN; P.armF = armF; P.fn = fn; P.ff = ff; P.headTilt = headTilt; P.headDy = headDy + crouch * 4; P.headDx = headDx; P.shrug = shrug; P.squash = squash; P.breathe = breathe; P.sway = sway; P.trx = trx; P.try = try_; P.crouch = crouch; P.bodyX = sway * 1.0;
    const lk = keyAt(ch.looks, t, null); P.look = F.eyes.look || (lk && lk.v ? ctx.lookVec(ch, P, lk.v, t) : null) || [0.15 * a, 0]; if (F.eyes.dart) P.look = Math.floor(tf * 6) % 2 ? [-0.6, 0.25] : [0.6, -0.15];
    P.talk = C.talkAmt(ch, t, ctx); return P;
  };
  function mapHand(b, hx, hy) { // legacy hip-frame hand targets (shoulder -108, head -194) -> this build
    const sy = -(b.th - 26), hy0 = -(b.th + b.hh * 0.8), low = -b.th * 0.2; const y = hy <= -108 ? sy + ((hy + 108) * (sy - hy0)) / 86 : sy + ((hy + 108) * (low - sy)) / 68; return [hx * 1.1, y];
  }
  function mixArm(a, b, w) {
    if (w >= 0.999) return b; if (b.hx != null) { const from = a.hx != null ? a : { hx: 12 + 20 * Math.sin(a.th), hy: -108 + 56 * Math.cos(a.th) + 54 * Math.cos(a.th + (a.e || 0)), bend: 1 }; return { ...b, hx: lerp(from.hx, b.hx, w), hy: lerp(from.hy, b.hy, w) }; }
    if (a.hx != null) return { ...b, th: lerp(0.1, b.th, w), e: lerp(0.12, b.e, w) }; return { ...b, th: lerp(a.th, b.th, w), e: lerp(a.e || 0, b.e || 0, w) };
  }
  // Snap rule (bible 2.4): frames -2,-1 = head-only anticipation squash with the OLD face still on; frame 0 = new face swapped in whole, head pops (scaleY 1.06 / scaleX 0.96); frame +1 = normal; then hold.
  C.faceAt = function (ch, t, ctx) {
    const fps = ctx.fps || 30, keys = ch.faces, eps = 1e-6; let i = -1; for (let j = 0; j < keys.length; j++) if (t >= keys[j].t - eps) i = j; else break;
    const curName = i >= 0 ? keys[i].name : ch.face0; let sx = 1, sy = 1, anticip = false; const nx = keys[i + 1];
    if (nx && t >= nx.t - 2 / fps - eps) { anticip = true; sx = 1.06; sy = 0.92; } else if (i >= 0 && t < keys[i].t + 1 / fps - eps) { sx = 0.96; sy = 1.06; }
    const face = normFace(curName), u = i >= 0 ? t - keys[i].t : 9, out = { id: face.id, name: face.name, eyes: { ...face.eyes }, brows: { ...face.brows }, mouth: { ...face.mouth }, head: { ...face.head }, body: { ...face.body }, extras: face.extras, lock: face.lock, sx, sy, u, anticipating: anticip };
    const per = 2.5 + 1.5 * hash(ch.seed + Math.floor((t + ch.seed) / 3)), bt = (t + ch.seed * 0.7) % per; if (face.eyes.blink !== false && ['dot', 'open'].includes(out.eyes.mode) && !['F09', 'F12', 'F13'].includes(face.id) && bt < 2 / fps && u > 0.12) { out.eyes.mode = 'arcDown'; }
    return out;
  };
  // Mimed talk: three replacement mouths (shut / half / open) on twos, gated by Owen's loudness (voice.mouth) or a seeded pattern when there is no audio data.
  C.talkAmt = function (ch, t, ctx) {
    const w = ch.talks.find(r => t >= r[0] && t <= r[1]); if (!w) return null; const tq = Math.floor(t * 15) / 15; let lvl;
    if (ctx.hasMouth && ch.talkDrive !== 'pattern') { const amp = ctx.mouthAt(ch.id, tq); lvl = amp < 0.14 ? 0 : amp < 0.5 ? 1 : 2; } else { const q = Math.floor(t * 7.5); lvl = [1, 2, 0, 2, 1, 2, 1, 0][Math.floor(hash(q * 1.7 + ch.seed) * 8) % 8]; }
    return { level: lvl };
  };

  // ------------------------------------------------------------------ drawing
  function drawArm(g, c, A, side, P, t) {
    const bd = c.b, L1 = bd.armL, L2 = bd.armL * 0.96, sh0 = c.sh[side], shy = -(bd.th - 26) - P.shrug * 0.7; let ex, ey, hx, hy;
    if (A.hx != null) { const [mx, my] = mapHand(bd, A.hx, A.hy); [ex, ey, hx, hy] = ik2(sh0, shy, mx, my, L1, L2, A.bend == null ? 1 : A.bend); } else { ex = sh0 + Math.sin(A.th) * L1; ey = shy + Math.cos(A.th) * L1; const fa = A.th + (A.e || 0); hx = ex + Math.sin(fa) * L2; hy = ey + Math.cos(fa) * L2; }
    const pal = c.pal, fa = Math.atan2(hx - ex, hy - ey); limb(g, [[sh0, shy], [ex, ey], [hx - Math.sin(fa) * 4, hy - Math.cos(fa) * 4]], bd.armW, c.sleeveCol, c.ink, c.ol);
    const handR = bd.hand; g.save(); g.translate(hx, hy); g.rotate(-fa);
    if (A.prop) { g.save(); g.rotate(fa + (A.propRot || 0)); if (B.Props && B.Props.kinds[A.prop]) { const s = (A.propScale || 1) * 0.8; g.scale(s * c.mir, s); B.Props.drawHeld(g, A.prop, c.propOpts || {}, t, c); } g.restore(); }
    if (A.finger) limb(g, [[0, -4], [0, -handR - 18]], 8, pal.skin, c.ink, c.ol * 0.8);
    if (A.fingers) for (let i = 0; i < A.fingers; i++) { const x = (i - (A.fingers - 1) / 2) * 10; limb(g, [[x, -3], [x * 1.25, -handR - 14 - (i % 2) * 3]], 7, pal.skin, c.ink, c.ol * 0.7); }
    g.beginPath(); g.arc(0, 0, handR, 0, TAU); fillStroke(g, pal.skin, c.ink, c.ol); if (A.prop || A.open) { g.beginPath(); g.ellipse(handR * 0.6, handR * 0.3, 4.5, 7, 0.5, 0, TAU); fillStroke(g, pal.skin, c.ink, c.ol * 0.7); }
    g.restore();
  }
  function drawLeg(g, c, hipX, hipH, foot) {
    const bd = c.b, L = bd.legL, fx = hipX + foot.x, fy = -foot.lift, hy = -hipH, [kx, ky, tx, ty] = ik2(hipX, hy, fx, fy - 5, L, L * 0.98, -1);
    limb(g, [[hipX, hy], [kx, ky], [tx, ty]], bd.legW, c.pal.bottom, c.ink, c.ol);
    g.save(); g.translate(tx + 5, ty + 2); g.rotate(foot.rot * 0.7); g.beginPath(); g.moveTo(-14, -8); g.lineTo(-14, 6); g.lineTo(28, 8); g.lineTo(28, 1); g.quadraticCurveTo(10, -8, -14, -8); g.closePath(); fillStroke(g, c.pal.shoes, c.ink, c.ol); g.restore(); // wedge shoe
  }
  function drawHead(g, c, F, P, t) {
    const b = c.b, k = b.hh / 75, hw = b.hw * (c.headW || 1), hh = b.hh, a = P.a, fx = a * 16 * k, ex = 29 * k, ey = -4 * k, my = 38 * k, jaw = F.head.jaw * k, pal = c.pal, ink = c.ink, ol = c.ol, lift = (P.hairLift || 0) * 0.8;
    const cc = { pal, ink, ol, a, fx, hw, hh, ex, ey, my, jaw, mir: P.mir, th: b.th, tw: b.tw, k, lift };
    g.save(); g.scale(F.sx, F.sy); const hair = C.hair[c.hairStyle] || C.hair.bald; hair.back && hair.back(g, cc);
    headPath(g, c.headShape, hw, hh, jaw); fillStroke(g, pal.skin, ink, ol);
    if (c.coin) { g.save(); g.lineWidth = ol * 0.7; g.strokeStyle = sh(pal.skin, -0.32); for (let i = 0; i < 40; i++) { const an = (i / 40) * TAU; g.beginPath(); g.moveTo(Math.cos(an) * hw * 0.9, Math.sin(an) * hh * 0.9); g.lineTo(Math.cos(an) * hw * 0.97, Math.sin(an) * hh * 0.97); g.stroke(); } g.restore(); }
    if (P.back) { hair.front && hair.front(g, cc); g.beginPath(); g.ellipse(0, -hh * 0.2, hw * 0.95, hh * 1.0, 0, 0, TAU); g.fillStyle = pal.hair; g.fill(); g.lineWidth = ol; g.strokeStyle = ink; g.stroke(); g.restore(); return; }
    if (F.extras.includes('blush') || c.cheeks) extras.blush(g, cc);
    if (!c.eyesHidden) drawEyes(g, cc, F, P); drawBrows(g, cc, F); drawMouth(g, cc, F, P);
    for (const acc of c.acc) { const d = C.accessories[acc.name]; if (d && d.slot === 'face') d.draw(g, cc, acc); }
    hair.front && hair.front(g, cc);
    for (const acc of c.acc) { const d = C.accessories[acc.name]; if (d && d.slot === 'head') d.draw(g, cc, acc); }
    const st = { u: F.u }; for (const n of F.extras) if (n !== 'blush' && extras[n]) extras[n](g, cc, t, st);
    g.restore();
  }
  function drawEyes(g, c, F, P) {
    const e = F.eyes, look = P.look; g.lineJoin = 'round';
    for (const side of [0, 1]) {
      const szm = side && e.farSize ? e.farSize : e.size, sx = side ? 1 - 0.26 * c.a : 1, x = c.fx + (side ? c.ex * (1 - 0.1 * c.a) : -c.ex), mode = e.mode, rx = (mode === 'dot' ? 11 : 23) * szm * c.k * sx, ry = (mode === 'dot' ? 13 : 27) * szm * c.k; g.save(); g.translate(x, c.ey);
      if (mode === 'arc' || mode === 'arcDown' || mode === 'line' || mode === 'lash') { const R = 22 * szm * c.k * sx; g.beginPath(); if (mode === 'arc' || mode === 'lash') g.arc(0, 9, R, Math.PI * 1.12, Math.PI * 1.88); else if (mode === 'arcDown') g.arc(0, -8, R, Math.PI * 0.12, Math.PI * 0.88); else { g.moveTo(-R, 3); g.lineTo(R, 3); } g.lineWidth = c.ol * 1.3; g.lineCap = 'round'; g.strokeStyle = c.ink; g.stroke(); if (mode === 'lash') for (const d of [-0.5, 0, 0.5]) { const an = -Math.PI / 2 + d - 0.3 * (side ? 1 : -1); g.beginPath(); g.moveTo(Math.cos(an) * R * 0.9, 9 + Math.sin(an) * R * 0.9); g.lineTo(Math.cos(an) * R * 1.3, 9 + Math.sin(an) * R * 1.3 - 4); g.stroke(); } }
      else if (mode === 'x') { g.lineWidth = c.ol * 1.2; g.lineCap = 'round'; g.strokeStyle = c.ink; g.beginPath(); g.moveTo(-rx * 0.7, -ry * 0.5); g.lineTo(rx * 0.7, ry * 0.5); g.moveTo(rx * 0.7, -ry * 0.5); g.lineTo(-rx * 0.7, ry * 0.5); g.stroke(); }
      else if (mode === 'slit') { g.beginPath(); g.ellipse(0, 3, 24 * szm * c.k * sx, 4.2, 0, 0, TAU); g.fillStyle = c.ink; g.fill(); }
      else if (mode === 'spiral') { g.beginPath(); g.arc(0, 0, 26 * szm * c.k * sx, 0, TAU); fillStroke(g, c.pal.eyeWhite, c.ink, c.ol); g.beginPath(); for (let i = 0; i < 40; i++) { const an = i * 0.55 + Math.floor(P.t * 15) * 0.9, r = 2 + i * 0.5; i ? g.lineTo(Math.cos(an) * r, Math.sin(an) * r) : g.moveTo(Math.cos(an) * r, Math.sin(an) * r); } g.lineWidth = 3.4; g.strokeStyle = c.ink; g.stroke(); }
      else {
        const solid = mode === 'dot', lk = look || [0, 0];
        if (solid) { const ox = clamp(lk[0], -1, 1) * 7 * c.k, oy = clamp(lk[1], -1, 1) * 6 * c.k; g.beginPath(); g.ellipse(ox, oy, rx, ry, 0, 0, TAU); g.fillStyle = c.ink; g.fill(); g.beginPath(); g.arc(ox - rx * 0.3, oy - ry * 0.35, rx * 0.24, 0, TAU); g.fillStyle = 'rgba(255,255,255,.9)'; g.fill(); }
        else {
          g.beginPath(); g.ellipse(0, 0, rx, ry, 0, 0, TAU); fillStroke(g, c.pal.eyeWhite, c.ink, c.ol * 0.95);
          const pr = (mode === 'dollar' || mode === 'star' ? 0.62 : 0.5 * e.pupil) * rx * 1.15, px = clamp(lk[0], -1, 1) * (rx - pr * 0.9) * 0.85, py = clamp(lk[1], -1, 1) * (ry - pr * 0.9) * 0.85;
          g.save(); g.beginPath(); g.ellipse(0, 0, rx - 1, ry - 1, 0, 0, TAU); g.clip();
          if (mode === 'dollar') { g.font = `${pr * 2.5}px Anton, Impact, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = '#00D26A'; g.fillText('$', px, py + 2); } else if (mode === 'star') star4(g, px, py, pr * 1.25, '#ff5a8a'); else { g.beginPath(); g.arc(px, py, Math.min(pr, ry * 0.85), 0, TAU); g.fillStyle = c.ink; g.fill(); g.beginPath(); g.arc(px - pr * 0.28, py - pr * 0.3, pr * 0.24, 0, TAU); g.fillStyle = '#fff'; g.fill(); }
          g.restore(); g.beginPath(); g.ellipse(0, 0, rx, ry, 0, 0, TAU); g.lineWidth = c.ol * 0.95; g.strokeStyle = c.ink; g.stroke();
        }
        const lt = e.lidTop, ls = e.lidSlope; if (lt > 0.001 || ls) { const y0 = -ry + 2 * ry * lt, inner = side ? 1 : 0, yi = y0 + ls, yo = y0 - Math.abs(ls) * 0.25, yL = inner ? yi : yo, yR = inner ? yo : yi, xl = -rx - 4, xr = rx + 4; g.beginPath(); g.moveTo(xl, -ry - 8); g.lineTo(xr, -ry - 8); g.lineTo(xr, yR); g.lineTo(xl, yL); g.closePath(); g.fillStyle = c.pal.skin; g.fill(); g.beginPath(); g.moveTo(xl, yL); g.lineTo(xr, yR); g.lineWidth = c.ol * 1.0; g.strokeStyle = c.ink; g.stroke(); }
      }
      g.restore();
    }
  }
  function drawBrows(g, c, F) {
    const b = F.brows, eyeTop = c.ey - 31 * F.eyes.size * c.k, col = c.pal.brow || c.ink;
    for (const side of [0, 1]) { const sx = side ? 1 - 0.26 * c.a : 1, x = c.fx + (side ? c.ex * (1 - 0.1 * c.a) : -c.ex), w = 21 * sx * c.k, y = side && b.farY != null ? b.farY : b.y, tl = side && b.farTilt != null ? b.farTilt : b.tilt, yy = eyeTop - 7 * c.k - y * c.k, inner = side ? -1 : 1, yi = yy + tl * 0.8, yo = yy - tl * 0.35;
      g.beginPath(); g.moveTo(x - inner * w, yo); g.quadraticCurveTo(x, (yi + yo) / 2 - 3, x + inner * w, yi); g.lineWidth = 7.5 * c.k; g.lineCap = 'round'; g.strokeStyle = col; g.stroke(); }
  }
  function drawMouth(g, c, F, P) {
    const m = F.mouth, tk = P.talk, y = c.my; let { open, round, teeth, tongue, cl, cr, rect, jag, wavy } = m, w = m.w * 30 * c.k;
    if (tk && m.talk !== false) { w = 21 * c.k * (tk.level === 2 ? 1.1 : 1); cl = cr = 1; rect = jag = wavy = 0; round = 0; teeth = 0; tongue = tk.level === 2 ? 0.5 : 0; open = tk.level === 0 ? 0 : tk.level === 1 ? 10 * c.k : 27 * c.k; } // 3 replacement mouths; nothing else on the face changes
    const cx = c.fx + 3 * c.a + (m.dx || 0), xl = cx - w, xr = cx + w * (1 - 0.18 * c.a), yl = y - cl * 0.9, yr = y - cr * 0.9; g.lineCap = 'round'; g.lineJoin = 'round';
    if (wavy > 0 && open < 12) { g.beginPath(); const n = 6; for (let i = 0; i <= n; i++) { const x = lerp(xl, xr, i / n), yy = y + (i % 2 ? -1 : 1) * 4 * wavy - lerp(cl, cr, i / n); i ? g.lineTo(x, yy) : g.moveTo(x, yy); } g.lineWidth = c.ol * 1.2; g.strokeStyle = c.ink; g.stroke(); return; }
    if (open < 3 && round < 0.2) { g.beginPath(); g.moveTo(xl, yl); g.quadraticCurveTo((xl + xr) / 2, y + 3 - (cl + cr) * 0.25, xr, yr); g.lineWidth = c.ol * 1.35; g.strokeStyle = c.ink; g.stroke(); return; }
    const ww = lerp(w, w * 0.55, round), cl2 = lerp(xl, cx - ww, round), cr2 = lerp(xr, cx + ww, round), ya = lerp(yl, y, round), yb = lerp(yr, y, round);
    g.beginPath();
    if (rect) { const top = y - 4, bot = y + open, x0 = cx - w, x1 = cx + w; if (jag) { g.moveTo(x0, top); for (let i = 1; i <= 6; i++) g.lineTo(lerp(x0, x1, i / 6), top + (i % 2 ? 6 : -2)); g.lineTo(x1, bot); for (let i = 5; i >= 0; i--) g.lineTo(lerp(x0, x1, i / 6), bot + (i % 2 ? 4 : -5)); g.closePath(); } else g.roundRect(x0, top, x1 - x0, bot - top, 6); }
    else { g.moveTo(cl2, ya); g.quadraticCurveTo(cx, y - 2 - (cl + cr) * 0.15, cr2, yb); g.bezierCurveTo(cr2 + 2 * round, y + open * 1.25, cl2 - 2 * round, y + open * 1.25, cl2, ya); g.closePath(); }
    g.fillStyle = STYLE.mouthIn; g.fill(); g.save(); g.clip();
    if (tongue > 0.01) { g.beginPath(); g.ellipse(cx, y + open * 0.95, ww * 0.6, open * 0.34 * (0.5 + tongue), 0, 0, TAU); g.fillStyle = STYLE.tongue; g.fill(); }
    if (teeth > 0.01) { const th = Math.max(7, open * 0.4) * teeth; g.fillStyle = c.pal.eyeWhite; g.fillRect(cx - w - 4, Math.min(yl, yr, y) - 8, w * 2 + 8, 8 + th + 4); g.beginPath(); g.moveTo(cx - w, y + 2 + th); g.lineTo(cx + w, y + 2 + th); g.lineWidth = 2; g.strokeStyle = 'rgba(0,0,0,.25)'; g.stroke(); }
    g.restore(); g.lineWidth = c.ol * 1.2; g.strokeStyle = c.ink; g.stroke();
  }
  function body(g, c, P) {
    const bd = c.b, o = c.outfit, pal = c.pal, W2 = o.wide || 1, tw = bd.tw * (1 - 0.08 * P.a), bw = bd.bw * W2 * (1 - 0.08 * P.a), th = bd.th, col = pal.top, y0 = -th + 6, y1 = 12, mir = P.mir;
    if (o.tell === 'hoodie') { g.beginPath(); g.ellipse(-3 * P.a, y0 - 2, tw * 0.62, 24, 0, 0, TAU); fillStroke(g, sh(col, -0.14), c.ink, c.ol); }
    g.beginPath(); const a = tw / 2, bb = bw / 2; g.moveTo(-a + 16, y0); g.lineTo(a - 16, y0); g.quadraticCurveTo(a, y0, a + 2, y0 + 20); g.bezierCurveTo(a + 6, y0 + 70, bb - 4, y1 - 70, bb, y1 - 6); g.quadraticCurveTo(bb, y1, bb - 10, y1); g.lineTo(-bb + 10, y1); g.quadraticCurveTo(-bb, y1, -bb, y1 - 6); g.bezierCurveTo(-bb + 4, y1 - 70, -a - 6, y0 + 70, -a - 2, y0 + 20); g.quadraticCurveTo(-a, y0, -a + 16, y0); g.closePath(); fillStroke(g, col, c.ink, c.ol); // bell body
    const x0 = P.a * 6;
    if (o.tell === 'lapels') { g.beginPath(); g.moveTo(x0 - 18, y0); g.lineTo(x0, y0 + 50); g.lineTo(x0 + 18, y0); g.closePath(); fillStroke(g, pal.top2, c.ink, c.ol * 0.8); for (const s of [-1, 1]) { g.beginPath(); g.moveTo(x0 + s * 18, y0); g.lineTo(x0 + s * 40, y0 + 62); g.lineTo(x0 + s * 4, y0 + 48); g.lineTo(x0, y0 + 50); g.closePath(); fillStroke(g, sh(col, -0.14), c.ink, c.ol * 0.8); } g.beginPath(); g.moveTo(x0, y0 + 50); g.lineTo(x0, y1 - 2); g.lineWidth = c.ol * 0.8; g.strokeStyle = c.ink; g.stroke(); }
    else if (o.tell === 'apron') { g.beginPath(); g.moveTo(x0 - 30, y0 + 40); g.lineTo(x0 + 30, y0 + 40); g.lineTo(x0 + 50, y1 - 4); g.lineTo(x0 - 50, y1 - 4); g.closePath(); fillStroke(g, pal.top2, c.ink, c.ol * 0.9); g.fillStyle = 'rgba(122,31,47,.55)'; g.beginPath(); g.ellipse(x0 + 10, y1 - 38, 14, 8, 0.4, 0, TAU); g.fill(); g.beginPath(); g.moveTo(x0 - 26, y0 + 40); g.lineTo(x0 - 18, y0 + 6); g.moveTo(x0 + 26, y0 + 40); g.lineTo(x0 + 18, y0 + 6); g.lineWidth = 5; g.strokeStyle = c.ink; g.stroke(); }
    else if (o.tell === 'robe') { g.beginPath(); g.moveTo(x0 - 20, y0); g.lineTo(x0, y0 + 56); g.lineTo(x0 + 20, y0); g.closePath(); fillStroke(g, pal.top2, c.ink, c.ol * 0.8); g.beginPath(); g.moveTo(x0, y0 + 56); g.lineTo(x0, y1 - 2); g.lineWidth = c.ol; g.strokeStyle = c.ink; g.stroke(); }
    else if (o.tell === 'zip') { g.beginPath(); g.moveTo(x0, y0 + 4); g.lineTo(x0, y1 - 2); g.lineWidth = c.ol * 0.9; g.strokeStyle = c.ink; g.stroke(); if (c.chestText) { g.save(); g.translate(x0 - 26, y0 + 66); g.scale(mir, 1); g.font = '28px Anton, Impact, sans-serif'; g.textAlign = 'center'; g.fillStyle = pal.top2; g.fillText(c.chestText, 0, 0); g.restore(); } }
    else if (o.tell === 'hoodie') { g.beginPath(); g.moveTo(x0 - 24, y0 + 6); g.quadraticCurveTo(x0, y0 + 44, x0 + 24, y0 + 6); g.lineWidth = c.ol * 0.9; g.strokeStyle = c.ink; g.stroke(); g.beginPath(); g.roundRect(x0 - 34, y1 - 70, 68, 36, 10); fillStroke(g, sh(col, -0.1), c.ink, c.ol * 0.8); }
    else if (o.tell === 'vest') { g.beginPath(); g.moveTo(x0 - 20, y0); g.lineTo(x0, y0 + 56); g.lineTo(x0 + 20, y0); g.closePath(); fillStroke(g, pal.top2, c.ink, c.ol * 0.8); for (let i = 0; i < 3; i++) { g.beginPath(); g.arc(x0, y0 + 76 + i * 28, 4, 0, TAU); g.fillStyle = c.ink; g.fill(); } }
    else if (o.tell === 'stripe') { g.save(); g.beginPath(); g.moveTo(-a - 2, y0); g.lineTo(a + 2, y0); g.lineTo(bb, y1); g.lineTo(-bb, y1); g.closePath(); g.clip(); g.fillStyle = pal.top2; g.fillRect(-bb, y0 + 70, bb * 2, 18); g.fillRect(-bb, y0 + 112, bb * 2, 18); g.restore(); }
    for (const acc of c.acc) { const d = C.accessories[acc.name]; if (d && d.slot === 'body') d.draw(g, { th, tw, a: P.a, pal, ink: c.ink, ol: c.ol, k: 1 }, acc); }
  }
  // Draw a whole character (feet at P.x, P.y). o: {back}
  C.draw = function (g, ch, P, t, o = {}) {
    const bd = ch.b, c = { b: bd, pal: ch.pal, ink: ch.ink, ol: ch.ol, outfit: ch.outfitDef, mir: P.mir, sh: {}, acc: ch.acc, hairStyle: ch.hair, headShape: ch.headShape, sleeveCol: ch.sleeveCol || ch.pal.top, propOpts: ch.propOpts, coin: ch.coin, eyesHidden: ch.eyesHidden, chestText: ch.chestText, cheeks: ch.cheeks, headW: ch.headW };
    const shw = (bd.tw / 2) * (1 - 0.4 * P.a) - 1; c.sh.near = -shw; c.sh.far = shw; P.back = !!o.back;
    g.save(); g.translate(P.x, P.y); g.scale(P.sc * P.mir, P.sc); g.lineJoin = 'round'; g.translate(P.trx, P.try);
    const hipH = P.hipH, hx = { near: -(3 + 8 * (1 - P.a)), far: 3 + 8 * (1 - P.a) };
    drawLeg(g, c, hx.far, hipH, P.ff); drawLeg(g, c, hx.near, hipH, P.fn);
    g.translate(P.bodyX, -hipH); g.rotate(P.lean); g.scale(1 + P.squash, 1 + 0.012 * P.breathe - P.squash * 0.5);
    drawArm(g, c, P.armF, 'far', P, t); body(g, c, P); drawArm(g, c, P.armN, 'near', P, t);
    g.save(); g.translate(P.headDx + P.a * 4, -(bd.th + bd.hh * 0.8) + P.headDy); g.rotate(P.headTilt); drawHead(g, c, P.face, P, t); g.restore();
    g.restore();
  };
  C.headWorld = (ch, P) => ({ x: P.x, y: P.y - (P.hipH + ch.b.th + ch.b.hh * 0.8 - P.headDy) * P.sc });
  C.standH = b => b.legL * 1.92 + b.th + b.hh * 1.8;
  C.heightOf = ch => C.standH(ch.b) * ch.scale;

  // build a runtime char record from a look + per-scene overrides (palette / outfit / accessories / scale / head ...)
  C.make = function (id, base, over) {
    const L0 = C.looks[base || id] || {}, d = Object.assign({}, L0, over || {}), pal = Object.assign({}, PAL, L0.palette, (over || {}).palette), parse = a => (typeof a === 'string' ? (a.includes(':') ? { name: a.split(':')[0], kind: a.split(':')[1] } : { name: a }) : a), acc = (d.accessories || []).map(parse);
    const bd = C.builds[d.build || 'token'] || C.builds.token, o = C.outfits[d.outfit || 'plain'] || C.outfits.plain;
    return { id, look: base || id, def: d, pal, ink: pal.ink || STYLE.ink, ol: d.outline || STYLE.ol, b: Object.assign({}, bd, d.size || {}), outfit: d.outfit || 'plain', outfitDef: o, hair: d.hair || 'bald', headShape: d.head || bd.head || 'round', acc, scale: d.scale || 1, sleeveCol: d.sleeve, coin: d.coin, eyesHidden: d.eyesHidden, chestText: d.chestText, cheeks: d.cheeks, headW: d.headW, propOpts: d.propOpts, seed: d.seed != null ? d.seed : [...id].reduce((s, ch) => s * 31 + ch.charCodeAt(0), 7) % 97, facing0: d.facing == null ? 1 : d.facing, face0: d.face || 'F01', talkDrive: d.talkDrive || 'audio',
      init: { x: 0, lane: 0 }, timeline: [], moves: [], facing: [], faces: [], looks: [], gestures: [], talks: [], crouch: [] };
  };
  C.ss = ss; C.eio = eio; C.eout = eout;
})();
