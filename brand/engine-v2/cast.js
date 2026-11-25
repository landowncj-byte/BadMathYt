// Bad Math engine v2 — CAST: the puppet rig. Silent cut-out characters (canvas 2D vector shapes, flat colour, thick ink outline).
// Everything here is a PURE FUNCTION OF TIME: BM2.Cast.pose(ch, t, ctx) -> pose, BM2.Cast.draw(g, ch, pose, t). No timers, no carried state.
// Load order: primitives.js, camera.js, faces.js, cast.js, props.js, sets.js, story.js.
//
// Rig (hip frame, facing +x, y down, 1 unit = 1 px at scale 1; whole puppet is ~410 px tall):
//   ground -> legs (2-bone IK from the hip to a foot target) -> pelvis -> torso -> head   +  two arms (near / far)
// Locomotion is distance-driven (foot plants sit on a fixed lattice in world space, so there is NO foot sliding).
// Faces are stop-motion REPLACEMENT FACES from BM2.Faces (faces.js): they SNAP, with a 1-2 frame squash, and then hold.
(function () {
  const B = window.BM2, { clamp, lerp, hash } = B, TAU = Math.PI * 2, C = (B.Cast = { chars: {}, outfits: {}, accessories: {}, hair: {}, gaits: {}, gestures: {}, builds: {} });
  const STYLE = (B.Style = Object.assign({ ink: '#16110e', ol: 7, white: '#fffdf6', mouthIn: '#4b1822', tongue: '#e8707c', blush: 'rgba(255,92,92,.38)', shadow: 'rgba(8,6,4,.30)', sweat: '#8ddcff', fps: 30 }, B.Style || {}));
  const ss = (a, b, x) => { const u = clamp((x - a) / (b - a)); return u * u * (3 - 2 * u); }; // smoothstep
  const eio = u => { u = clamp(u); return u * u * (3 - 2 * u); };
  const eout = u => 1 - Math.pow(1 - clamp(u), 3);

  // ------------------------------------------------------------------ definitions (art + config; swap freely)
  C.define = (id, def) => (C.chars[id] = def);
  C.outfit = (name, def) => (C.outfits[name] = def);
  C.accessory = (name, def) => (C.accessories[name] = def); // def: {slot:'head'|'face'|'body', z:'front'|'back', draw(g, c, o)}
  C.hairStyle = (name, def) => (C.hair[name] = def);
  C.build = (name, def) => (C.builds[name] = def);
  C.gait = (name, def) => (C.gaits[name] = def);
  C.gesture = (name, fn) => (C.gestures[name] = fn);

  C.build('average', { tw: 98, bw: 90, th: 126, headS: 1, legW: 25, armW: 20, legL: 72, armL: 56 });
  C.build('slim', { tw: 82, bw: 76, th: 130, headS: 1, legW: 21, armW: 17, legL: 74, armL: 58 });
  C.build('stocky', { tw: 120, bw: 116, th: 118, headS: 1.04, legW: 29, armW: 23, legL: 68, armL: 54 });
  C.build('kid', { tw: 84, bw: 80, th: 100, headS: 1.18, legW: 22, armW: 18, legL: 58, armL: 46 });
  C.build('tall', { tw: 90, bw: 80, th: 150, headS: 0.92, legW: 22, armW: 18, legL: 84, armL: 64 });

  const PAL = { skin: '#f2c19a', hair: '#3b2a1e', top: '#3f6fb5', top2: '#f4f1e8', bottom: '#2f3a52', shoes: '#241a14', accent: '#e24b3c', eyeWhite: '#fffdf6', ink: null };
  C.PAL = PAL;

  C.outfit('tee',    { sleeve: 'short', skirt: 0, collar: 'crew' });
  C.outfit('suit',   { sleeve: 'long', skirt: 0, collar: 'suit', cuff: true });
  C.outfit('hoodie', { sleeve: 'long', skirt: 0, collar: 'hood' });
  C.outfit('dress',  { sleeve: 'short', skirt: 0.5, collar: 'crew' });
  C.outfit('coat',   { sleeve: 'long', skirt: 0.62, collar: 'suit', cuff: true });
  C.outfit('vest',   { sleeve: 'none', skirt: 0, collar: 'vest' });

  C.gait('walk',  { S: 170, beta: 0.58, lift: 24, H0: 132, bob: 6, lean: 0.03, arm: 0.55, armE: 0.12 });
  C.gait('run',   { S: 330, beta: 0.36, lift: 52, H0: 116, bob: 22, lean: 0.2, arm: 1.0, armE: 1.45 });
  C.gait('sneak', { S: 120, beta: 0.72, lift: 16, H0: 90, bob: 3, lean: 0.24, arm: 0.22, armE: 0.7 });
  C.gait('stomp', { S: 140, beta: 0.62, lift: 14, H0: 132, bob: 9, lean: 0.1, arm: 0.8, armE: 0.5 });

  // ------------------------------------------------------------------ small drawing helpers
  const trap = (g, tw, bw, y0, y1, r) => { // rounded trapezoid, top width tw at y0, bottom width bw at y1
    const a = tw / 2, b = bw / 2; g.beginPath(); g.moveTo(-a + r, y0); g.lineTo(a - r, y0); g.quadraticCurveTo(a, y0, a - 2, y0 + r); g.lineTo(b, y1 - r * 0.6); g.quadraticCurveTo(b + 1, y1, b - r * 0.7, y1); g.lineTo(-b + r * 0.7, y1); g.quadraticCurveTo(-b - 1, y1, -b, y1 - r * 0.6); g.lineTo(-a + 2, y0 + r); g.quadraticCurveTo(-a, y0, -a + r, y0); g.closePath();
  };
  const fillStroke = (g, fill, ink, lw) => { g.fillStyle = fill; g.fill(); g.lineWidth = lw; g.strokeStyle = ink; g.lineJoin = 'round'; g.lineCap = 'round'; g.stroke(); };
  function limb(g, pts, w, fill, ink, ol) { // thick polyline with an outline
    g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); g.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) g.lineTo(pts[i][0], pts[i][1]);
    g.strokeStyle = ink; g.lineWidth = w + ol; g.stroke(); g.strokeStyle = fill; g.lineWidth = w; g.stroke();
  }
  function ik2(ax, ay, tx, ty, l1, l2, bend) { // elbow/knee point for a 2-bone chain; returns [ex, ey, hx, hy]
    let dx = tx - ax, dy = ty - ay, d = Math.hypot(dx, dy); const mx = l1 + l2 - 0.5; if (d > mx) { dx *= mx / d; dy *= mx / d; d = mx; } if (d < 1) { dx = 0; dy = 1; d = 1; }
    const a = Math.atan2(dy, dx), A = Math.acos(clamp((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d), -1, 1)), th = a + bend * A;
    return [ax + Math.cos(th) * l1, ay + Math.sin(th) * l1, ax + dx, ay + dy];
  }
  C.ik2 = ik2;
  const lightC = (c, k) => B.shade(c, k);

  // ------------------------------------------------------------------ hair / hats / accessories (head frame: origin = head centre, +x forward)
  // c = {pal, ink, ol, a (facing amount 0..1), fx (feature shift), hw, hh (head half sizes), ex (eye x), ey (eye y), mir}
  C.hairStyle('bald',  { back() {}, front() {} });
  C.hairStyle('short', { back() {}, front(g, c) { const { hw, hh } = c; g.beginPath(); g.moveTo(-hw * 0.98, -hh * 0.1); g.bezierCurveTo(-hw * 1.05, -hh * 1.1, hw * 1.05, -hh * 1.1, hw * 0.98, -hh * 0.1); g.quadraticCurveTo(hw * 0.7, -hh * 0.55, hw * 0.35 + c.fx * 0.6, -hh * 0.5); g.quadraticCurveTo(0, -hh * 0.7, -hw * 0.5, -hh * 0.5); g.quadraticCurveTo(-hw * 0.85, -hh * 0.45, -hw * 0.98, -hh * 0.1); g.closePath(); fillStroke(g, c.pal.hair, c.ink, c.ol); } });
  C.hairStyle('spiky', { back() {}, front(g, c) { const { hw, hh } = c; g.beginPath(); g.moveTo(-hw * 0.98, -hh * 0.1); for (let i = 0; i <= 6; i++) { const x = -hw + (i / 6) * 2 * hw; g.lineTo(x * 0.98, -hh * (0.78 + 0.1 * Math.cos(i * 1.3))); g.lineTo((x + hw / 6) * 0.98, -hh * 1.32 + (i % 2) * 8); } g.lineTo(hw * 0.98, -hh * 0.1); g.quadraticCurveTo(hw * 0.6, -hh * 0.5, 0, -hh * 0.55); g.quadraticCurveTo(-hw * 0.7, -hh * 0.5, -hw * 0.98, -hh * 0.1); g.closePath(); fillStroke(g, c.pal.hair, c.ink, c.ol); } });
  C.hairStyle('parted', { back() {}, front(g, c) { const { hw, hh } = c; g.beginPath(); g.moveTo(-hw * 0.98, -hh * 0.05); g.bezierCurveTo(-hw * 1.1, -hh * 1.15, hw * 1.1, -hh * 1.15, hw * 0.98, -hh * 0.05); g.quadraticCurveTo(hw * 0.8, -hh * 0.6, hw * 0.1 + c.fx, -hh * 0.62); g.quadraticCurveTo(-hw * 0.2, -hh * 0.9, -hw * 0.55, -hh * 0.45); g.quadraticCurveTo(-hw * 0.9, -hh * 0.4, -hw * 0.98, -hh * 0.05); g.closePath(); fillStroke(g, c.pal.hair, c.ink, c.ol); } });
  C.hairStyle('long', { back(g, c) { const { hw, hh } = c; g.beginPath(); g.moveTo(-hw * 1.02, -hh * 0.3); g.quadraticCurveTo(-hw * 1.25, hh * 1.0, -hw * 0.85, hh * 1.35); g.lineTo(hw * 0.85, hh * 1.35); g.quadraticCurveTo(hw * 1.25, hh * 1.0, hw * 1.02, -hh * 0.3); g.closePath(); fillStroke(g, c.pal.hair, c.ink, c.ol); },
    front(g, c) { const { hw, hh } = c; g.beginPath(); g.moveTo(-hw * 1.02, hh * 0.1); g.bezierCurveTo(-hw * 1.15, -hh * 1.2, hw * 1.15, -hh * 1.2, hw * 1.02, hh * 0.1); g.quadraticCurveTo(hw * 0.85, -hh * 0.5, hw * 0.2 + c.fx, -hh * 0.5); g.quadraticCurveTo(-hw * 0.4, -hh * 0.78, -hw * 0.8, -hh * 0.1); g.closePath(); fillStroke(g, c.pal.hair, c.ink, c.ol); } });
  C.hairStyle('curly', { back() {}, front(g, c) { const { hw, hh } = c; g.beginPath(); for (let i = 0; i < 9; i++) { const an = Math.PI + (i / 8) * Math.PI, x = Math.cos(an) * hw * 0.95, y = Math.sin(an) * hh * 0.95 + hh * 0.05; g.moveTo(x + 30, y); g.arc(x, y, 30, 0, TAU); } g.fillStyle = c.pal.hair; g.fill(); g.lineWidth = c.ol; g.strokeStyle = c.ink; g.stroke(); g.beginPath(); g.ellipse(0, -hh * 0.35, hw * 0.92, hh * 0.55, 0, 0, TAU); g.fillStyle = c.pal.hair; g.fill(); } });

  // hats: slot head, drawn last in head frame. y = -hh is the crown of the head.
  const HAT = (name, fn) => C.accessory(name, { slot: 'head', z: 'front', draw: fn });
  HAT('cap', (g, c, o) => { const { hw, hh } = c, col = o.color || c.pal.accent; g.beginPath(); g.moveTo(-hw * 0.98, -hh * 0.3); g.bezierCurveTo(-hw * 1.0, -hh * 1.35, hw * 1.0, -hh * 1.35, hw * 0.98, -hh * 0.3); g.closePath(); fillStroke(g, col, c.ink, c.ol); g.beginPath(); g.moveTo(hw * 0.2, -hh * 0.36); g.quadraticCurveTo(hw * 1.5, -hh * 0.5, hw * 1.55, -hh * 0.25); g.quadraticCurveTo(hw * 0.9, -hh * 0.2, hw * 0.2, -hh * 0.2); g.closePath(); fillStroke(g, lightC(col, -0.2), c.ink, c.ol); });
  HAT('tophat', (g, c, o) => { const { hw, hh } = c, col = o.color || '#23201f'; g.beginPath(); g.ellipse(0, -hh * 0.78, hw * 1.25, 14, 0, 0, TAU); fillStroke(g, col, c.ink, c.ol); g.beginPath(); g.rect(-hw * 0.72, -hh * 1.95, hw * 1.44, hh * 1.22); fillStroke(g, col, c.ink, c.ol); g.beginPath(); g.rect(-hw * 0.72, -hh * 1.12, hw * 1.44, 20); fillStroke(g, o.band || c.pal.accent, c.ink, c.ol * 0.7); g.beginPath(); g.ellipse(0, -hh * 1.95, hw * 0.72, 12, 0, 0, TAU); fillStroke(g, lightC(col, 0.12), c.ink, c.ol); });
  HAT('crown', (g, c, o) => { const { hw, hh } = c, col = o.color || '#f2c230'; g.beginPath(); g.moveTo(-hw * 0.8, -hh * 0.62); g.lineTo(-hw * 0.88, -hh * 1.45); g.lineTo(-hw * 0.4, -hh * 1.1); g.lineTo(0, -hh * 1.6); g.lineTo(hw * 0.4, -hh * 1.1); g.lineTo(hw * 0.88, -hh * 1.45); g.lineTo(hw * 0.8, -hh * 0.62); g.closePath(); fillStroke(g, col, c.ink, c.ol); [[-hw * 0.88, -hh * 1.45], [0, -hh * 1.6], [hw * 0.88, -hh * 1.45]].forEach(([x, y]) => { g.beginPath(); g.arc(x, y, 8, 0, TAU); fillStroke(g, '#e24b3c', c.ink, c.ol * 0.6); }); g.beginPath(); g.rect(-hw * 0.8, -hh * 0.75, hw * 1.6, 16); fillStroke(g, lightC(col, -0.15), c.ink, c.ol * 0.7); });
  HAT('hardhat', (g, c, o) => { const { hw, hh } = c, col = o.color || '#f2b705'; g.beginPath(); g.moveTo(-hw * 1.1, -hh * 0.42); g.bezierCurveTo(-hw * 1.1, -hh * 1.55, hw * 1.1, -hh * 1.55, hw * 1.1, -hh * 0.42); g.closePath(); fillStroke(g, col, c.ink, c.ol); g.beginPath(); g.rect(-hw * 1.3, -hh * 0.5, hw * 2.6, 16); fillStroke(g, lightC(col, -0.12), c.ink, c.ol); g.beginPath(); g.rect(-12, -hh * 1.35, 24, hh * 0.9); fillStroke(g, lightC(col, -0.12), c.ink, c.ol * 0.7); });
  HAT('beanie', (g, c, o) => { const { hw, hh } = c, col = o.color || c.pal.accent; g.beginPath(); g.moveTo(-hw * 1.0, -hh * 0.4); g.bezierCurveTo(-hw * 1.0, -hh * 1.5, hw * 1.0, -hh * 1.5, hw * 1.0, -hh * 0.4); g.closePath(); fillStroke(g, col, c.ink, c.ol); g.beginPath(); g.rect(-hw * 1.02, -hh * 0.55, hw * 2.04, 24); fillStroke(g, lightC(col, -0.15), c.ink, c.ol); g.beginPath(); g.arc(0, -hh * 1.3, 14, 0, TAU); fillStroke(g, lightC(col, 0.25), c.ink, c.ol * 0.7); });
  HAT('cowboy', (g, c, o) => { const { hw, hh } = c, col = o.color || '#9a6b3c'; g.beginPath(); g.moveTo(-hw * 1.7, -hh * 0.45); g.quadraticCurveTo(0, -hh * 0.15, hw * 1.7, -hh * 0.45); g.quadraticCurveTo(hw * 1.45, -hh * 0.7, hw * 0.8, -hh * 0.68); g.lineTo(hw * 0.8, -hh * 1.2); g.quadraticCurveTo(0, -hh * 1.05, -hw * 0.8, -hh * 1.2); g.lineTo(-hw * 0.8, -hh * 0.68); g.quadraticCurveTo(-hw * 1.45, -hh * 0.7, -hw * 1.7, -hh * 0.45); g.closePath(); fillStroke(g, col, c.ink, c.ol); });
  HAT('fedora', (g, c, o) => { const { hw, hh } = c, col = o.color || '#4a4540'; g.beginPath(); g.ellipse(0, -hh * 0.62, hw * 1.45, 17, 0, 0, TAU); fillStroke(g, col, c.ink, c.ol); g.beginPath(); g.moveTo(-hw * 0.8, -hh * 0.62); g.quadraticCurveTo(-hw * 0.85, -hh * 1.4, -hw * 0.25, -hh * 1.3); g.quadraticCurveTo(0, -hh * 1.2, hw * 0.25, -hh * 1.3); g.quadraticCurveTo(hw * 0.85, -hh * 1.4, hw * 0.8, -hh * 0.62); g.closePath(); fillStroke(g, col, c.ink, c.ol); g.beginPath(); g.rect(-hw * 0.8, -hh * 0.82, hw * 1.6, 18); fillStroke(g, o.band || c.pal.accent, c.ink, c.ol * 0.6); });

  // face accessories (drawn after the face, before the hat)
  const FACE = (name, fn) => C.accessory(name, { slot: 'face', z: 'front', draw: fn });
  FACE('glasses', (g, c, o) => { const kind = o.kind || 'round'; for (const side of [0, 1]) { const x = c.fx + (side ? c.ex * (1 - 0.1 * c.a) : -c.ex), s = side ? 1 - 0.25 * c.a : 1, r = 25 * s; g.save(); g.translate(x, c.ey); if (kind === 'shades') { g.beginPath(); g.roundRect(-r * 1.15, -r * 0.75, r * 2.3, r * 1.5, 8); fillStroke(g, '#151515', c.ink, c.ol * 0.8); g.beginPath(); g.moveTo(-r * 0.7, -r * 0.4); g.lineTo(-r * 0.1, -r * 0.4); g.strokeStyle = 'rgba(255,255,255,.35)'; g.lineWidth = 4; g.stroke(); } else { g.beginPath(); if (kind === 'square') g.roundRect(-r, -r * 0.85, r * 2, r * 1.7, 6); else g.arc(0, 0, r, 0, TAU); g.fillStyle = 'rgba(190,230,255,.28)'; g.fill(); g.lineWidth = c.ol * 0.8; g.strokeStyle = o.color || c.ink; g.stroke(); } g.restore(); } g.beginPath(); g.moveTo(c.fx - c.ex + 24, c.ey); g.lineTo(c.fx + c.ex * (1 - 0.1 * c.a) - 24 * (1 - 0.25 * c.a), c.ey); g.lineWidth = c.ol * 0.8; g.strokeStyle = o.color || c.ink; g.stroke(); g.beginPath(); g.moveTo(c.fx - c.ex - 25, c.ey - 2); g.lineTo(-c.hw * 0.98, c.ey - 4); g.stroke(); });
  FACE('mustache', (g, c, o) => { const x = c.fx + 4 * c.a, y = c.my - 13 - (c.mouthOpenPx ? 0 : 0); g.save(); g.translate(x, y); g.beginPath(); g.moveTo(0, 2); g.bezierCurveTo(-8, -10, -34, -8, -42, 8); g.bezierCurveTo(-30, 10, -12, 6, 0, 10); g.bezierCurveTo(12, 6, 30, 10, 42, 8); g.bezierCurveTo(34, -8, 8, -10, 0, 2); g.closePath(); fillStroke(g, o.color || c.pal.hair, c.ink, c.ol * 0.7); g.restore(); });
  FACE('beard', (g, c, o) => { g.beginPath(); g.moveTo(-c.hw * 0.92, c.hh * 0.1); g.quadraticCurveTo(-c.hw * 0.95, c.hh * 1.12 + c.jaw, 0, c.hh * 1.12 + c.jaw); g.quadraticCurveTo(c.hw * 0.95, c.hh * 1.12 + c.jaw, c.hw * 0.92, c.hh * 0.1); g.quadraticCurveTo(c.hw * 0.6, c.hh * 0.4, c.fx * 0.5 + c.hw * 0.4, c.my - 16); g.lineTo(c.fx * 0.5 - c.hw * 0.4, c.my - 16); g.quadraticCurveTo(-c.hw * 0.6, c.hh * 0.4, -c.hw * 0.92, c.hh * 0.1); g.closePath(); fillStroke(g, o.color || c.pal.hair, c.ink, c.ol); c.mouthOver = true; });
  // body accessories (torso frame, origin = hip, chest at y -100)
  const BODY = (name, fn, z = 'front') => C.accessory(name, { slot: 'body', z, draw: fn });
  BODY('tie', (g, c, o) => { const x = c.a * 7, col = o.color || c.pal.accent; g.beginPath(); g.moveTo(x - 10, -118); g.lineTo(x + 10, -118); g.lineTo(x + 7, -104); g.lineTo(x + 5, -112); g.closePath(); fillStroke(g, lightC(col, -0.1), c.ink, c.ol * 0.7); g.beginPath(); g.moveTo(x - 6, -108); g.lineTo(x + 6, -108); g.lineTo(x + 13, -52); g.lineTo(x, -40); g.lineTo(x - 13, -52); g.closePath(); fillStroke(g, col, c.ink, c.ol * 0.8); });
  BODY('bowtie', (g, c, o) => { const x = c.a * 7, col = o.color || c.pal.accent; g.beginPath(); g.moveTo(x, -114); g.lineTo(x - 24, -126); g.lineTo(x - 24, -102); g.closePath(); fillStroke(g, col, c.ink, c.ol * 0.7); g.beginPath(); g.moveTo(x, -114); g.lineTo(x + 24, -126); g.lineTo(x + 24, -102); g.closePath(); fillStroke(g, col, c.ink, c.ol * 0.7); g.beginPath(); g.arc(x, -114, 7, 0, TAU); fillStroke(g, lightC(col, -0.2), c.ink, c.ol * 0.6); });
  BODY('badge', (g, c, o) => { const x = -22 + c.a * 4, y = -82; g.save(); g.translate(x, y); g.beginPath(); for (let i = 0; i < 10; i++) { const r = i % 2 ? 7 : 17, an = -Math.PI / 2 + (i * Math.PI) / 5; g.lineTo(Math.cos(an) * r, Math.sin(an) * r); } g.closePath(); fillStroke(g, o.color || '#f2c230', c.ink, c.ol * 0.7); g.restore(); });
  BODY('scarf', (g, c, o) => { const col = o.color || c.pal.accent; g.beginPath(); g.roundRect(-c.tw * 0.45, -132, c.tw * 0.9, 24, 12); fillStroke(g, col, c.ink, c.ol); g.beginPath(); g.moveTo(8 + c.a * 6, -112); g.lineTo(38 + c.a * 6, -112); g.lineTo(34 + c.a * 6, -52); g.lineTo(10 + c.a * 6, -56); g.closePath(); fillStroke(g, lightC(col, -0.12), c.ink, c.ol * 0.8); });
  BODY('lanyard', (g, c, o) => { g.beginPath(); g.moveTo(-14, -124); g.lineTo(0, -60); g.lineTo(14, -124); g.strokeStyle = o.color || c.pal.accent; g.lineWidth = 6; g.stroke(); g.beginPath(); g.roundRect(-14, -62, 28, 34, 5); fillStroke(g, c.pal.top2, c.ink, c.ol * 0.6); });

  // ------------------------------------------------------------------ face system (replacement faces)
  const FACE_DEF = { eyes: { mode: 'open', size: 1, pupil: 0.8, lidTop: 0, lidSlope: 0, lidBot: 0, look: null, blink: true }, brows: { y: 0, tilt: 0, farY: null, farTilt: null, w: 1, hide: false }, mouth: { w: 0.8, cl: 0, cr: 0, top: 0, open: 0, teeth: 0, tongue: 0, round: 0, wavy: 0, talk: true }, head: { tilt: 0, dy: 0, dx: 0, jaw: 0, scale: 1 }, body: { lean: 0, shrug: 0, tremble: 0, bounce: 0 }, extras: [], loop: null, snap: 2 };
  const faceCache = {};
  function normFace(name) {
    if (faceCache[name]) return faceCache[name]; const lib = B.Faces.library, s = lib[name] || lib.neutral; if (!lib[name]) console.warn('unknown face "' + name + '"');
    const f = { name, extras: s.extras || [], loop: s.loop || null, snap: s.snap == null ? 2 : s.snap }; for (const k of ['eyes', 'brows', 'mouth', 'head', 'body']) f[k] = Object.assign({}, FACE_DEF[k], s[k]); return (faceCache[name] = f);
  }
  C.normFace = normFace; C.clearFaceCache = () => { for (const k in faceCache) delete faceCache[k]; };

  const extras = (B.Faces.extras = B.Faces.extras || {});
  const stepT = (t, fps = 12) => Math.floor(t * fps) / fps; // stop-motion: animate "on twos/threes"
  const drop = (g, x, y, s, col) => { g.beginPath(); g.moveTo(x, y - 14 * s); g.quadraticCurveTo(x + 11 * s, y + 2 * s, x, y + 9 * s); g.quadraticCurveTo(x - 11 * s, y + 2 * s, x, y - 14 * s); g.closePath(); fillStroke(g, col, STYLE.ink, 3.5); g.beginPath(); g.arc(x - 3 * s, y + 2 * s, 2 * s, 0, TAU); g.fillStyle = 'rgba(255,255,255,.8)'; g.fill(); };
  const star4 = (g, x, y, r, col) => { g.beginPath(); for (let i = 0; i < 8; i++) { const rr = i % 2 ? r * 0.28 : r, an = (i * Math.PI) / 4 - Math.PI / 2; g.lineTo(x + Math.cos(an) * rr, y + Math.sin(an) * rr); } g.closePath(); fillStroke(g, col, STYLE.ink, 3); };
  extras.sweat = (g, c, t) => { const k = (stepT(t, 8) * 0.9) % 1; drop(g, c.hw * 0.78, -c.hh * 0.5 + k * 46, 1.0 - 0.3 * k, STYLE.sweat); };
  extras.sweat2 = (g, c, t) => { const k = (stepT(t + 0.4, 8) * 0.9) % 1; drop(g, -c.hw * 0.86, -c.hh * 0.2 + k * 50, 0.9 - 0.3 * k, STYLE.sweat); };
  extras.sweatSmall = (g, c, t) => drop(g, c.hw * 0.8, -c.hh * 0.45, 0.85, STYLE.sweat);
  extras.blush = (g, c) => { g.fillStyle = STYLE.blush; for (const s of [-1, 1]) { g.beginPath(); g.ellipse(c.fx + s * (c.ex + 12) * (s > 0 ? 1 - 0.2 * c.a : 1), c.ey + 28, 17, 10, 0, 0, TAU); g.fill(); } };
  extras.vein = (g, c, t) => { const p = 1 + 0.18 * (stepT(t, 8) % 0.25 > 0.12 ? 1 : 0); g.save(); g.translate(c.hw * 0.55, -c.hh * 0.62); g.scale(p, p); g.strokeStyle = '#e0281e'; g.lineWidth = 6; g.lineCap = 'round'; for (const [a, b, d, e] of [[-12, -4, -2, -4], [-4, -12, -4, -2], [12, -4, 2, -4], [4, -12, 4, -2], [-12, 4, -2, 4], [-4, 12, -4, 2], [12, 4, 2, 4], [4, 12, 4, 2]]) { g.beginPath(); g.moveTo(a, b); g.quadraticCurveTo(d * 0.4, e * 0.4, d, e); g.stroke(); } g.restore(); };
  extras.steam = (g, c, t) => { for (const [x, ph] of [[-c.hw * 0.7, 0], [c.hw * 0.7, 0.5]]) { const k = (stepT(t, 8) * 1.3 + ph) % 1; g.save(); g.globalAlpha = 1 - k; g.beginPath(); g.arc(x, -c.hh * 1.05 - k * 60, 12 + 10 * k, 0, TAU); g.fillStyle = '#fff'; g.fill(); g.lineWidth = 3.5; g.strokeStyle = STYLE.ink; g.stroke(); g.restore(); } };
  extras.sparkle = (g, c, t) => { const s = stepT(t, 8); for (let i = 0; i < 4; i++) { const an = i * 1.7 + 0.5, k = 0.5 + 0.5 * Math.sin(s * 9 + i * 2.1); if (k < 0.25) continue; star4(g, Math.cos(an) * c.hw * 1.25, Math.sin(an) * c.hh * 1.1 - 6, 11 + 9 * k, '#ffe56a'); } };
  extras.tear = (g, c, t) => { for (const [s, ph] of [[-1, 0], [1, 0.45]]) { const k = (stepT(t, 8) * 1.2 + ph) % 1, x = c.fx + s * (c.ex + 6) * (s > 0 ? 1 - 0.2 * c.a : 1); g.save(); g.globalAlpha = clamp(1.6 - k * 1.6); drop(g, x + s * k * 14, c.ey + 24 + k * 56, 1.05, STYLE.sweat); g.restore(); } };
  extras.gulp = (g, c, t, st) => { const k = ss(0.1, 0.35, st.u) * (1 - ss(0.5, 0.75, st.u)); g.beginPath(); g.ellipse(c.fx * 0.4, c.hh * 0.98 + 12 * k, 8, 9, 0, 0, TAU); g.fillStyle = lightC(c.pal.skin, -0.1); g.fill(); g.lineWidth = 3; g.strokeStyle = c.ink; g.stroke(); };
  const bigText = (g, c, ch, x, y, size, col) => { g.save(); g.translate(x, y); g.scale(c.mir, 1); g.font = `${size}px Anton, Impact, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.lineJoin = 'round'; g.lineWidth = 12; g.strokeStyle = c.ink; g.strokeText(ch, 0, 0); g.fillStyle = col; g.fillText(ch, 0, 0); g.restore(); };
  extras.question = (g, c, t) => bigText(g, c, '?', c.hw * 0.95 * c.mir * c.mir, -c.hh * 1.18 - (stepT(t, 6) % 0.5) * 8, 84, '#ffe56a');
  extras.exclaim = (g, c, t) => bigText(g, c, '!', c.hw * 0.95, -c.hh * 1.2 - (stepT(t, 8) % 0.25) * 16, 92, '#ff5a47');
  extras.zzz = (g, c, t) => { const k = (stepT(t, 6) * 0.5) % 1; for (let i = 0; i < 2; i++) bigText(g, c, 'Z', c.hw * (0.9 + 0.3 * i), -c.hh * (0.9 + 0.4 * i) - k * 14, 40 - i * 8, '#d9ecff'); };
  extras.drool = (g, c, t) => { const k = (stepT(t, 6) * 0.8) % 1; drop(g, c.fx + 24, c.my + 26 + k * 18, 0.8, '#bfe9ff'); };

  // ------------------------------------------------------------------ pose evaluation (pure functions of t)
  // ch = compiled character (see story.js): {id, pal, build, outfit, hair, accessories, scale, init:{x,lane}, moves[], facing[], faces[], looks[], gestures[], talks[], crouch[], holds[]}
  const LANE = 64;
  C.LANE = LANE;
  const laneY = l => l * LANE, laneS = l => 1 + 0.06 * l;
  C.laneY = laneY; C.laneS = laneS;

  function facingAt(ch, t) { // continuous -1..1 (sign = direction, magnitude = 3/4-ness). Keys: {t, v, dur}, sorted by t
    let cur = ch.facing0 == null ? 1 : ch.facing0;
    for (const k of ch.facing) { if (t < k.t) break; const d = k.dur == null ? 0.25 : k.dur; if (d > 0 && t < k.t + d) return lerp(cur, k.v, eio((t - k.t) / d)); cur = k.v; }
    return cur;
  }
  function pathPoint(seg, D) { // polyline pts [[x,lane],...] -> {x, lane}
    const pts = seg.pts; let d = D; for (let i = 1; i < pts.length; i++) { const L = seg.lens[i - 1]; if (d <= L || i === pts.length - 1) { const u = L > 0 ? clamp(d / L) : 1; return { x: lerp(pts[i - 1][0], pts[i][0], u), lane: lerp(pts[i - 1][1], pts[i][1], u), dir: Math.sign(pts[i][0] - pts[i - 1][0]) || 1 }; } d -= L; }
    const p = pts[pts.length - 1]; return { x: p[0], lane: p[1], dir: 1 };
  }
  function distAt(seg, t) { // trapezoid velocity profile (soft start / stop), D(t) in world px along the path
    const T = seg.t1 - seg.t0, u = clamp(t - seg.t0, 0, T), ta = Math.min(seg.ta, T / 2), v = seg.L / (T - ta);
    if (u < ta) return (v * u * u) / (2 * ta); if (u > T - ta) { const r = T - u; return seg.L - (v * r * r) / (2 * ta); } return (v * ta) / 2 + v * (u - ta);
  }
  C.compileSeg = function (seg) { // seg: {t0, t1, pts, gait} -> adds L, lens, n, S (stride adjusted so the move ends with feet together)
    const g = C.gaits[seg.gait || 'walk']; seg.lens = []; seg.L = 0; for (let i = 1; i < seg.pts.length; i++) { const l = Math.hypot(seg.pts[i][0] - seg.pts[i - 1][0], (seg.pts[i][1] - seg.pts[i - 1][1]) * LANE); seg.lens.push(l); seg.L += l; }
    seg.g = g; seg.n = Math.max(1, Math.round(seg.L / (g.S / 2))); seg.hstep = seg.L / seg.n; seg.S = seg.hstep * 2; seg.ta = seg.ta || 0.32; return seg; // n steps: plants at k*hstep, last two feet both at L
  };
  function plantsOf(seg) { // lattice of foot plants: [{leg:'far'|'near', P}] with the first two feet starting together at 0
    if (seg._pl) return seg._pl; const n = seg.n, pl = []; // step k (1..n): plant at k*hstep (far foot first), final step brings the other foot to L
    for (let k = 1; k <= n; k++) pl.push({ leg: k % 2 ? 'far' : 'near', P: k * seg.hstep }); pl.push({ leg: n % 2 ? 'near' : 'far', P: seg.L }); return (seg._pl = pl);
  }
  function footWorld(seg, leg, D) { // returns {x (world distance), lift, rot, planted}
    const pl = plantsOf(seg).filter(p => p.leg === leg), g = seg.g, half = (seg.S * g.beta) / 2; let prev = 0, prevEnd = 0;
    for (let i = 0; i < pl.length; i++) {
      const p = pl[i], isLast = p === pl[pl.length - 1] || (p.P >= seg.L - 1e-6), start = p.P - half, stanceEnd = isLast ? Infinity : p.P + half, swingEnd = isLast && p.P >= seg.L - 1e-6 ? seg.L : start, swingStart = Math.max(prevEnd, 0);
      const sEnd = Math.min(start, seg.L); // plant begins here
      if (D < sEnd) { // swing from prev to p
        const a = swingStart, b = Math.max(sEnd, a + 1e-3), u = clamp((D - a) / (b - a)); if (D < a) return { x: prev, lift: 0, rot: 0, planted: true };
        const e = eio(u); return { x: lerp(prev, p.P, e), lift: Math.sin(Math.PI * u) * g.lift * Math.min(1, (p.P - prev) / (seg.hstep * 0.9) + 0.2), rot: -0.5 * Math.sin(Math.PI * Math.min(1, u * 1.15)) * (u < 0.5 ? 1 : 0.4), planted: false };
      }
      if (D <= stanceEnd) return { x: p.P, lift: 0, rot: 0, planted: true };
      prev = p.P; prevEnd = p.P + half;
    }
    return { x: prev, lift: 0, rot: 0, planted: true };
  }
  function gaitAt(seg, D) {
    const g = seg.g, Hs = 138, env = clamp(Math.min(D, seg.L - D) / Math.max(10, seg.hstep * 0.9)), cyc = Math.cos((TAU * D) / seg.hstep);
    const h = lerp(Hs, g.H0 + g.bob * cyc, env), fa = footWorld(seg, 'near', D), fb = footWorld(seg, 'far', D), sw = Math.sin((TAU * D) / seg.S) * env;
    return { h, near: { x: fa.x - D, lift: fa.lift, rot: fa.rot }, far: { x: fb.x - D, lift: fb.lift, rot: fb.rot }, armN: sw * g.arm, armF: -sw * g.arm, armE: g.armE * env, lean: g.lean * env, env };
  }
  C.gaitAt = gaitAt;
  function moveAt(ch, t) { // -> {x, lane, D, seg, moving, dir}
    let last = { x: ch.init.x, lane: ch.init.lane || 0 }, cur = null;
    for (const seg of ch.moves) { if (t < seg.t0) break; if (t >= seg.t1) { const p = seg.pts[seg.pts.length - 1]; last = { x: p[0], lane: p[1] }; continue; } cur = seg; break; }
    if (!cur) return { ...last, D: 0, seg: null, moving: false };
    const D = distAt(cur, t), p = pathPoint(cur, D); return { x: p.x, lane: p.lane, D, seg: cur, moving: true, dir: p.dir };
  }
  C.moveAt = moveAt; C.facingAt = facingAt;

  function keyAt(keys, t, def) { let v = def; for (const k of keys) { if (t < k.t) break; v = k; } return v; }
  function smoothKey(keys, t, def) { // numeric keys {t, v, dur}: eased blend from previous value
    let from = def, to = def, tt = -1e9, dur = 0; for (const k of keys) { if (t < k.t) break; from = to; to = k.v; tt = k.t; dur = k.dur == null ? 0.25 : k.dur; } return dur > 0 ? lerp(from, to, eio((t - tt) / dur)) : to;
  }

  // ---- gestures. Each returns {near, far, head, lean, shrug, hop, hold, fingers...} for local time lt (seconds since start) — "weight" is applied by the caller.
  // arm = {th, e} (angles) or {hx, hy, bend} (hand target in hip frame, 2-bone IK)
  const A = (th, e) => ({ th, e });
  C.gesture('point', (lt, o, x) => { const d = x.dirTo(o.target, lt); const wob = Math.sin(lt * 7) * 0.025; const a = { th: d.th + wob, e: 0.1, finger: 1 }; return { [o.arm || 'near']: a, head: { tilt: -0.03 }, lean: 0.03 }; });
  C.gesture('shrug', (lt, o) => { const k = eout(lt / 0.2); return { near: { th: 0.5 * k, e: 1.9 * k, open: 1 }, far: { th: 0.5 * k, e: 1.9 * k, open: 1 }, shrug: 16 * k, head: { tilt: 0.11 * k, dy: 5 * k }, lean: -0.02 }; });
  C.gesture('facepalm', (lt, o) => ({ [o.arm || 'near']: { hx: 20, hy: -176, bend: 1 }, head: { tilt: 0.1, dy: 9 }, lean: 0.1 }));
  C.gesture('count', (lt, o) => { const step = o.step || 0.5, n = Math.min(o.n || 3, Math.floor(Math.max(0, lt - 0.3) / step) + 1), tap = Math.floor(lt / step * 2) % 2; return { near: { hx: 34, hy: -92, bend: 1, fingers: n, up: true }, far: { hx: 22 + tap * 3, hy: -74 - tap * 3, bend: 1, finger: 1 }, head: { dy: 4, tilt: 0.04 } }; });
  C.gesture('hold', (lt, o, x) => ({ [o.arm || 'near']: { hx: 38, hy: -66 + Math.sin(lt * 2.2) * 2, bend: 1, prop: o.prop, propRot: o.rot == null ? -0.15 : o.rot, propScale: o.propScale }, lean: 0.02 }));
  C.gesture('armsUp', (lt, o) => { const k = eout(lt / 0.18), w = Math.sin(lt * 14) * 0.12; return { near: { th: (2.85 + w) * k, e: -0.25 }, far: { th: (2.85 - w) * k, e: -0.25 }, hop: Math.abs(Math.sin(lt * 7)) * 16 * k, head: { tilt: -0.08 }, lean: -0.05 }; });
  C.gesture('slam', (lt, o) => { const up = eio(lt / 0.34), down = ss(0.34, 0.44, lt), th = lerp(0, 2.6, up) * (1 - down) + 1.5 * down, e = lerp(0.1, 0.9, up) * (1 - down) + 0.35 * down, hit = lt > 0.44 ? Math.exp(-(lt - 0.44) * 11) : 0; return { near: { th, e }, far: { th, e }, lean: 0.25 * down - 0.12 * up * (1 - down), head: { dy: 6 * hit, tilt: 0 }, shrug: 0, squash: hit * 0.07 }; });
  C.gesture('wave', (lt, o) => { const k = eout(lt / 0.2); return { [o.arm || 'near']: { th: 2.7 * k, e: 0.6 + Math.sin(lt * 11) * 0.5 }, head: { tilt: 0.05 } }; });
  C.gesture('think', (lt, o) => ({ [o.arm || 'near']: { hx: 26, hy: -146, bend: 1 }, far: { hx: 10, hy: -68, bend: 1 }, head: { tilt: 0.08, dy: 3 } }));
  C.gesture('cover', (lt, o) => ({ near: { hx: 24, hy: -194, bend: 1 }, far: { hx: 24, hy: -190, bend: 1 }, head: { dy: 6 }, lean: 0.08 })); // hands over eyes
  C.gesture('hug', (lt, o) => ({ near: { hx: 40, hy: -100, bend: 1 }, far: { hx: 36, hy: -90, bend: 1 }, lean: 0.04 }));
  C.gesture('clap', (lt, o) => { const k = Math.floor(lt * 7) % 2; return { near: { hx: 34 - k * 10, hy: -92, bend: 1 }, far: { hx: 30 + k * 10 - 14, hy: -92, bend: 1 }, head: { dy: k * 2 } }; });
  C.gesture('hands-up', (lt, o) => { const k = eout(lt / 0.2); return { near: { th: 2.1 * k, e: 0.7 }, far: { th: 2.1 * k, e: 0.7 }, shrug: 6 * k, lean: -0.05 }; });
  C.gesture('shake-fist', (lt, o) => ({ [o.arm || 'near']: { th: 2.4 + Math.sin(lt * 16) * 0.12, e: 0.5, fist: 1 }, lean: 0.05 }));
  C.gesture('peek', (lt, o) => ({ head: { tilt: 0.12, dy: 0 }, lean: 0.1 }));

  // main: everything the draw needs
  C.pose = function (ch, t, ctx) {
    const m = moveAt(ch, t), fcg = facingAt(ch, t), a = Math.abs(fcg), mir = fcg < 0 ? -1 : 1, seg = m.seg, fps = ctx.fps || 30;
    const build = ch.b, bob = { x: Math.sin(t * 0.9 + ch.seed) * 2.2, y: 0 };
    let P = { x: m.x, lane: m.lane, y: laneY(m.lane), sc: ch.scale * laneS(m.lane), mir, a, moving: m.moving, D: m.D, t };
    // legs / hips
    const crouch = smoothKey(ch.crouch, t, 0), hStand = 138;
    let hipH = hStand - crouch * 52, lean = 0, armN = { th: 0.06, e: 0.12 }, armF = { th: -0.04, e: 0.12 }, fn = { x: -4 * a + 2, lift: 0, rot: 0 }, ff = { x: 6 + 4 * a, lift: 0, rot: 0 };
    const breathe = Math.sin((TAU * t) / 3.4 + ch.seed), sway = Math.sin((TAU * t) / 5.3 + ch.seed * 1.7);
    if (seg) { const g = gaitAt(seg, m.D); hipH = lerp(hipH, Math.min(g.h, hStand - crouch * 52), 1); fn = { x: g.near.x - 4 * a + 2, lift: g.near.lift, rot: g.near.rot }; ff = { x: g.far.x + 6 + 4 * a, lift: g.far.lift, rot: g.far.rot }; lean = g.lean; armN = { th: g.armN, e: g.armE }; armF = { th: g.armF, e: g.armE }; }
    else { // idle: breathing + gentle weight shift
      armN = { th: 0.06 + 0.025 * breathe, e: 0.12 }; armF = { th: -0.05 - 0.02 * breathe, e: 0.12 }; fn.x += sway * 1.5; ff.x -= sway * 1.5; }
    let headTilt = 0, headDy = 0, headDx = 0, shrug = 0, hop = 0, squash = 0, holdProp = null; const handFx = { near: {}, far: {} };
    // face (replacement faces)
    const F = C.faceAt(ch, t, ctx); P.face = F;
    headTilt += F.head.tilt; headDy += F.head.dy; headDx += F.head.dx; lean += F.body.lean; shrug += F.body.shrug + (F.loop ? F.loop.shoulders : 0); headDy += F.loop ? F.loop.dy : 0; headDx += F.loop ? F.loop.dx : 0; headTilt += F.loop ? F.loop.tilt : 0;
    const trem = F.body.tremble; let trx = 0, try_ = 0; if (trem) { const s = stepT(t, 24); trx = Math.sin(s * 91) * trem; try_ = Math.cos(s * 77) * trem * 0.6; }
    // gestures (weighted)
    for (const gs of ch.gestures) {
      if (t < gs.t0 - 0.001 || t > gs.t1 + 0.3) continue; const lt = t - gs.t0, wIn = eout(lt / (gs.rampIn || 0.16)), wOut = 1 - eio((t - gs.t1) / (gs.rampOut || 0.22)), w = clamp(Math.min(wIn, t > gs.t1 ? wOut : 1));
      const r = C.gestures[gs.kind](lt, gs, ctx.gx(ch, P, t)); if (!r) continue;
      const mix = (cur, nw) => (nw ? mixArm(cur, nw, w) : cur);
      const side = (n, f) => { if (r.near) armN = mix(armN, r.near); if (r.far) armF = mix(armF, r.far); };
      side(); if (r.head) { headTilt += (r.head.tilt || 0) * w; headDy += (r.head.dy || 0) * w; } lean += (r.lean || 0) * w; shrug += (r.shrug || 0) * w; hop += (r.hop || 0) * w; squash += (r.squash || 0) * w;
    }
    // crouch / peek lowers the hips (knees bend through IK)
    P.hipH = hipH - hop; P.lean = lean + crouch * 0.1; P.armN = armN; P.armF = armF; P.fn = fn; P.ff = ff; P.headTilt = headTilt; P.headDy = headDy + crouch * 4; P.headDx = headDx; P.shrug = shrug; P.squash = squash; P.breathe = breathe; P.sway = sway; P.trx = trx; P.try = try_; P.crouch = crouch;
    P.bounce = F.body.bounce ? Math.abs(Math.sin(t * 9)) * F.body.bounce : 0; P.handFx = handFx; P.bodyX = sway * 1.2 + bob.x * 0.2;
    // look direction (eyes) — a snap, not a glide
    const lk = keyAt(ch.looks, t, null); P.look = F.eyes.look || (lk && lk.v ? ctx.lookVec(ch, P, lk.v, t) : null) || [0.15 * a, 0]; P.hold = ch.holds ? ch.holds.find(h => t >= h.t0 && t <= h.t1) : null;
    P.talk = C.talkAmt(ch, t, ctx); return P;
  };
  function mixArm(a, b, w) {
    if (w >= 0.999) return b; if (b.hx != null) { // IK target: blend from where the arm currently would be
      const from = a.hx != null ? a : { hx: 14 + 20 * Math.sin(a.th), hy: -108 + 56 * Math.cos(a.th) + 54 * Math.cos(a.th + (a.e || 0)), bend: 1 }; return { ...b, hx: lerp(from.hx, b.hx, w), hy: lerp(from.hy, b.hy, w) }; }
    if (a.hx != null) return { ...b, th: lerp(0.1, b.th, w), e: lerp(0.12, b.e, w) };
    return { ...b, th: lerp(a.th, b.th, w), e: lerp(a.e || 0, b.e || 0, w) };
  }

  // face evaluation: snap + squash + hold, loops on twos, blink frames, mime talk
  C.faceAt = function (ch, t, ctx) {
    const fps = ctx.fps || 30, keys = ch.faces; let i = -1; for (let j = 0; j < keys.length; j++) if (t >= keys[j].t) i = j; else break;
    const cur = normFace(i >= 0 ? keys[i].name : ch.face0 || 'neutral'), u = i >= 0 ? t - keys[i].t : 1e9, fr = u * fps, snap = cur.snap;
    let face = cur, sx = 1, sy = 1;
    if (i >= 0 && snap > 0 && fr < snap) { const half = snap / 2; if (i > 0 || ch.face0) { const prev = normFace(i > 0 ? keys[i - 1].name : ch.face0); if (fr < half) { face = prev; sx = 1.07; sy = 0.9; } else { sx = 0.95; sy = 1.07; } } else { sx = 0.95; sy = 1.07; } if (snap === 1) { face = cur; sx = 0.93; sy = 1.08; } }
    const lp = face.loop, qt = lp ? stepT(t, lp.fps || 12) : 0, ph = lp ? Math.sin(TAU * qt * 3.3) : 0;
    const out = { name: face.name, eyes: { ...face.eyes }, brows: { ...face.brows }, mouth: { ...face.mouth }, head: { ...face.head }, body: { ...face.body }, extras: face.extras, sx, sy, u, loop: null };
    if (lp) { out.loop = { dx: (lp.head ? lp.head[0] : 0) * ph, dy: (lp.head ? lp.head[1] : 0) * Math.abs(ph), tilt: (lp.head ? lp.head[2] : 0) * ph, shoulders: (lp.shoulders || 0) * Math.abs(ph) }; if (lp.mouthOpen) out.mouth.open = lerp(lp.mouthOpen[0], lp.mouthOpen[1], 0.5 + 0.5 * Math.sin(TAU * qt * 3.3 + 1)); }
    // blink = 3 closed frames at deterministic intervals (stop-motion style)
    const per = 3.1 + 2.1 * hash(ch.seed + Math.floor((t + ch.seed) / 3)), bt = (t + ch.seed * 0.7) % per; if (face.eyes.blink !== false && ['open', 'dot', 'tear'].includes(out.eyes.mode) && bt < 3 / fps && (i < 0 || u > 0.2)) out.eyes.mode = 'line';
    return out;
  };
  // miming a talk loop: only inside ch.talks windows (narration says this character speaks). Returns 0 (closed) .. 1 (wide) per frame, stepped on 3s.
  C.talkAmt = function (ch, t, ctx) {
    const w = ch.talks.find(r => t >= r[0] && t <= r[1]); if (!w) return null; const fade = Math.min(1, (t - w[0]) / 0.05, (w[1] - t) / 0.05); if (fade <= 0) return null;
    if (ch.talkDrive === 'audio' && ctx.mouthAt) { const amp = ctx.mouthAt(ch.id, t); return { open: clamp(Math.pow(amp, 0.8) * 1.15), vis: ctx.visemeAt ? ctx.visemeAt(t) : null }; }
    const q = Math.floor(t * 9), pat = [0.2, 0.75, 0.4, 1, 0.3, 0.85, 0.15, 0.6]; const k = pat[Math.floor(hash(q * 1.7 + ch.seed) * pat.length) % pat.length]; return { open: k, vis: { round: hash(q * 3.1 + 1) > 0.78 ? 1 : 0, wide: hash(q * 2.3 + 2) > 0.7 ? 1 : 0 } };
  };

  // ------------------------------------------------------------------ drawing
  function drawArm(g, c, A, side, P, t) { // A = {th,e} | {hx,hy,bend}; draws sleeve/skin, hand
    const bd = c.b, L1 = bd.armL, L2 = bd.armL * 0.95, sh = c.sh[side], shy = -108 - P.shrug; let ex, ey, hx, hy;
    if (A.hx != null) [ex, ey, hx, hy] = ik2(sh, shy, A.hx, A.hy, L1, L2, A.bend == null ? 1 : A.bend); else { ex = sh + Math.sin(A.th) * L1; ey = shy + Math.cos(A.th) * L1; const fa = A.th + (A.e || 0); hx = ex + Math.sin(fa) * L2; hy = ey + Math.cos(fa) * L2; }
    const o = c.outfit, sleeve = o.sleeve, aw = bd.armW, pal = c.pal, skin = pal.skin, sleeveCol = c.sleeveCol;
    const fa = Math.atan2(hx - ex, hy - ey); // forearm direction (angle from down)
    if (sleeve === 'long') { limb(g, [[sh, shy], [ex, ey], [hx - Math.sin(fa) * 10, hy - Math.cos(fa) * 10]], aw, sleeveCol, c.ol); if (o.cuff) { g.beginPath(); g.arc(hx - Math.sin(fa) * 10, hy - Math.cos(fa) * 10, aw * 0.62, 0, TAU); fillStroke(g, pal.top2, c.ink, c.ol * 0.7); } }
    else if (sleeve === 'short') { limb(g, [[ex, ey], [hx, hy]], aw * 0.86, skin, c.ink, c.ol); limb(g, [[sh, shy], [lerp(sh, ex, 0.9), lerp(shy, ey, 0.9)]], aw * 1.12, sleeveCol, c.ink, c.ol); }
    else { limb(g, [[sh, shy], [ex, ey], [hx, hy]], aw * 0.86, skin, c.ink, c.ol); }
    // hand
    const fx = A.fingers, handR = bd.armW * 0.82; g.save(); g.translate(hx, hy); g.rotate(-fa);
    if (A.prop) { g.save(); g.rotate(fa + (A.propRot || 0)); const pr = B.Props && B.Props.kinds[A.prop]; if (pr) { const s = (A.propScale || 1) * 0.85; g.scale(s * c.mir, s); B.Props.drawHeld(g, A.prop, c.propOpts || {}, t, c); } g.restore(); }
    if (A.finger || fx || A.open) {
      if (A.finger) { limb(g, [[0, -6], [0, -handR - 20]], 9, skin, c.ink, c.ol * 0.8); }
      if (fx) for (let i = 0; i < fx; i++) { const x = (i - (fx - 1) / 2) * 11, k = eout((P.t - (A.t0 || 0) - 0.0) * 6 + 1); limb(g, [[x, -4], [x * 1.25, -handR - 16 - (i % 2) * 3]], 8, skin, c.ink, c.ol * 0.7); }
    }
    g.beginPath(); g.arc(0, 0, handR, 0, TAU); fillStroke(g, skin, c.ink, c.ol * (A.fist ? 1.1 : 0.9)); if (!A.finger && !fx && !A.fist) { g.beginPath(); g.ellipse(handR * 0.55, handR * 0.35, 5, 8, 0.5, 0, TAU); g.fillStyle = skin; g.fill(); g.lineWidth = c.ol * 0.6; g.strokeStyle = c.ink; g.stroke(); }
    g.restore();
  }

  function drawLeg(g, c, side, hipX, hipH, foot, P) {
    const bd = c.b, L = bd.legL, fx = hipX + foot.x, fy = -foot.lift, hy = -hipH; const [kx, ky, tx, ty] = ik2(hipX, hy, fx, fy - 7, L, L * 0.98, -1), skin = c.pal.skin, pants = c.outfit.skirt ? c.pal.skin : c.pal.bottom, w = bd.legW;
    limb(g, [[hipX, hy], [kx, ky], [tx, ty]], w, pants, c.ink, c.ol);
    // shoe (toe forward)
    g.save(); g.translate(tx + 6, ty + 2); g.rotate(foot.rot * 0.7); g.beginPath(); g.moveTo(-18, -10); g.quadraticCurveTo(-20, 7, -10, 9); g.lineTo(26, 9); g.quadraticCurveTo(34, 8, 32, -2); g.quadraticCurveTo(26, -10, 10, -9); g.closePath(); fillStroke(g, c.pal.shoes, c.ink, c.ol); g.restore();
  }

  function drawHead(g, c, F, P, t) {
    const hs = c.b.headS, hw = 84 * hs, hh = 75 * hs, a = P.a, fx = a * 17 * hs, ex = 29 * hs, ey = -4 * hs, my = 38 * hs, jaw = F.head.jaw * hs, pal = c.pal, ink = c.ink, ol = c.ol;
    const cc = { pal, ink, ol, a, fx, hw, hh, ex, ey, my, jaw, mir: P.mir, tw: c.b.tw };
    g.save(); g.scale(F.sx, F.sy); const eyes = F.eyes, mouth = F.mouth;
    // back hair, ears
    const hair = C.hair[c.hairStyle] || C.hair.bald; hair.back && hair.back(g, cc);
    g.beginPath(); g.ellipse(-hw * 0.96, 8 * hs, 14 * hs, 18 * hs, 0, 0, TAU); fillStroke(g, pal.skin, ink, ol);
    if (a < 0.6) { g.beginPath(); g.ellipse(hw * 0.96, 8 * hs, 14 * hs, 18 * hs, 0, 0, TAU); fillStroke(g, pal.skin, ink, ol); }
    // head shape (jaw-drop stretches the lower half)
    g.beginPath(); g.moveTo(-hw, 0); g.bezierCurveTo(-hw, -hh * 1.33, hw, -hh * 1.33, hw, 0); g.bezierCurveTo(hw, hh * 0.9 + jaw * 0.6, hw * 0.55, hh + jaw, 0, hh + jaw); g.bezierCurveTo(-hw * 0.55, hh + jaw, -hw, hh * 0.9 + jaw * 0.6, -hw, 0); g.closePath(); fillStroke(g, pal.skin, ink, ol);
    if (P.back) { hair.front && hair.front(g, cc); g.beginPath(); g.ellipse(0, -hh * 0.2, hw * 0.95, hh * 1.05, 0, 0, TAU); g.fillStyle = pal.hair; g.fill(); g.lineWidth = ol; g.strokeStyle = ink; g.stroke(); g.restore(); return; }
    // nose
    g.beginPath(); g.ellipse(fx + 8 + 12 * a, 14 * hs, 7 * hs, 5.5 * hs, 0, 0, TAU); g.fillStyle = lightC(pal.skin, -0.09); g.fill(); g.lineWidth = ol * 0.55; g.strokeStyle = ink; g.stroke();
    for (const n of F.extras) if (n === 'blush') extras.blush(g, cc, t, F);
    drawEyes(g, cc, F, P); drawBrows(g, cc, F);
    cc.mouthOver = false; drawMouth(g, cc, F, P);
    for (const acc of c.acc) { const d = C.accessories[acc.name]; if (d && d.slot === 'face') d.draw(g, cc, acc); }
    hair.front && hair.front(g, cc);
    for (const acc of c.acc) { const d = C.accessories[acc.name]; if (d && d.slot === 'head') d.draw(g, cc, acc); }
    const st = { u: F.u };
    for (const n of F.extras) if (n !== 'blush' && extras[n]) extras[n](g, cc, t, st);
    g.restore();
  }

  function drawEyes(g, c, F, P) {
    const e = F.eyes, sz = e.size, R = [25 * sz, 29 * sz], look = P.look; g.lineJoin = 'round';
    for (const side of [0, 1]) { // 0 = near/back eye, 1 = far eye (narrower in 3/4 view)
      const sx = side ? 1 - 0.28 * c.a : 1, x = c.fx + (side ? c.ex * (1 - 0.1 * c.a) : -c.ex) , rx = R[0] * sx, ry = R[1]; g.save(); g.translate(x, c.ey);
      const mode = e.mode;
      if (mode === 'arc' || mode === 'arcDown' || mode === 'line') {
        g.beginPath(); if (mode === 'arc') g.arc(0, 8, rx * 0.8, Math.PI * 1.1, Math.PI * 1.9); else if (mode === 'arcDown') g.arc(0, -6, rx * 0.8, Math.PI * 0.1, Math.PI * 0.9); else { g.moveTo(-rx * 0.8, 3); g.lineTo(rx * 0.8, 3); }
        g.lineWidth = c.ol * 1.15; g.lineCap = 'round'; g.strokeStyle = c.ink; g.stroke();
      } else if (mode === 'x') { g.lineWidth = c.ol; g.lineCap = 'round'; g.strokeStyle = c.ink; g.beginPath(); g.moveTo(-rx * 0.6, -ry * 0.5); g.lineTo(rx * 0.6, ry * 0.5); g.moveTo(rx * 0.6, -ry * 0.5); g.lineTo(-rx * 0.6, ry * 0.5); g.stroke(); }
      else {
        const dotOnly = mode === 'dot'; g.beginPath(); g.ellipse(0, 0, rx, ry, 0, 0, TAU); if (dotOnly) { g.fillStyle = c.pal.eyeWhite; g.fill(); g.lineWidth = c.ol * 0.9; g.strokeStyle = c.ink; g.stroke(); } else fillStroke(g, c.pal.eyeWhite, c.ink, c.ol * 0.95);
        // pupil / special iris
        const lk = look || [0, 0], pr = (mode === 'dollar' || mode === 'star' ? 0.62 : 0.5 * e.pupil) * rx * 1.15, px = clamp(lk[0], -1, 1) * (rx - pr * 0.9) * 0.85, py = clamp(lk[1], -1, 1) * (ry - pr * 0.9) * 0.85;
        g.save(); g.beginPath(); g.ellipse(0, 0, rx - 1, ry - 1, 0, 0, TAU); g.clip();
        if (mode === 'dollar') { g.font = `${pr * 2.5}px Anton, Impact, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = '#1fa44d'; g.fillText('$', px, py + 2); }
        else if (mode === 'star') { star4(g, px, py, pr * 1.25, '#ff5a8a'); }
        else { g.beginPath(); g.arc(px, py, Math.min(pr, ry * 0.85), 0, TAU); g.fillStyle = c.ink; g.fill(); if (mode === 'tear') { g.beginPath(); g.arc(px - pr * 0.3, py - pr * 0.35, pr * 0.28, 0, TAU); g.fillStyle = '#fff'; g.fill(); g.beginPath(); g.arc(px + pr * 0.3, py + pr * 0.4, pr * 0.16, 0, TAU); g.fill(); } else { g.beginPath(); g.arc(px - pr * 0.28, py - pr * 0.3, pr * 0.24, 0, TAU); g.fillStyle = '#fff'; g.fill(); } }
        // lids (skin coloured, with an ink edge); slope: + = inner end lower
        const lt = e.lidTop, ls = e.lidSlope, lb = e.lidBot; const inner = side ? -1 : 1; // inner end is toward the nose centre line
        if (lt > 0.001 || ls) { const y0 = -ry + 2 * ry * lt, yi = y0 + ls * inner * 0.0 + (inner > 0 ? ls : 0) * (side ? 0 : 1) + (inner < 0 ? ls : 0) * (side ? 1 : 0), yo = y0 - Math.abs(ls) * 0.25 * Math.sign(ls || 1); // inner/outer heights
          const xl = -rx - 4, xr = rx + 4, yl = side ? yo : yi, yr = side ? yi : yo; // near eye: inner = right end (toward nose centre)... mirrored for far eye
          const yL = side ? yi : yo, yR = side ? yo : yi; void yl; void yr;
          g.beginPath(); g.moveTo(xl, -ry - 6); g.lineTo(xr, -ry - 6); g.lineTo(xr, yR); g.lineTo(xl, yL); g.closePath(); g.fillStyle = c.pal.skin; g.fill(); g.beginPath(); g.moveTo(xl, yL); g.lineTo(xr, yR); g.lineWidth = c.ol * 0.9; g.strokeStyle = c.ink; g.stroke(); }
        if (lb > 0.001) { const yb = ry - 2 * ry * lb; g.beginPath(); g.ellipse(0, ry * 1.5 + (yb - ry), rx * 1.5, ry * 1.2, 0, 0, TAU); g.fillStyle = c.pal.skin; g.fill(); g.lineWidth = c.ol * 0.7; g.strokeStyle = c.ink; g.stroke(); }
        g.restore(); g.beginPath(); g.ellipse(0, 0, rx, ry, 0, 0, TAU); g.lineWidth = c.ol * 0.95; g.strokeStyle = c.ink; g.stroke();
      }
      g.restore();
    }
  }
  function drawBrows(g, c, F) {
    const b = F.brows; if (b.hide) return; const eyeTop = c.ey - 32 * F.eyes.size;
    for (const side of [0, 1]) { const sx = side ? 1 - 0.28 * c.a : 1, x = c.fx + (side ? c.ex * (1 - 0.1 * c.a) : -c.ex), w = 21 * sx, y = (side && b.farY != null ? b.farY : b.y), tl = (side && b.farTilt != null ? b.farTilt : b.tilt), yy = eyeTop - 8 - y - (F.eyes.mode.startsWith('arc') ? 0 : 0); const innerDir = side ? -1 : 1; // inner end is at +x for the near eye, -x for far
      g.beginPath(); g.moveTo(x - innerDir * w, yy - tl * 0.0 + (tl > 0 ? 0 : 0) - tl * -0 - (-tl) * 0 + (-tl * 0) + (tl * 0)); const yi = yy + tl * 0.8, yo = yy - tl * 0.35; g.beginPath(); g.moveTo(x - innerDir * w, yo); g.quadraticCurveTo(x, (yi + yo) / 2 - 4, x + innerDir * w, yi); g.lineWidth = (7.5 * b.w) * 1; g.lineCap = 'round'; g.strokeStyle = c.ink; g.stroke(); }
  }
  function drawMouth(g, c, F, P) {
    const m = F.mouth, y = c.my, cx = c.fx + 3 * c.a; let open = m.open, round = m.round, teeth = m.teeth, tongue = m.tongue, w = m.w * 30; const tk = P.talk;
    if (tk && m.talk !== false) { open = Math.max(open * 0.3, tk.open * 26 + 2); if (tk.vis) { round = Math.max(round, tk.vis.round * 0.6); w *= tk.vis.round ? 0.7 : tk.vis.wide ? 1.15 : 1; } teeth = Math.max(teeth, tk.open > 0.6 ? 0.7 : 0); tongue = Math.max(tongue, tk.open > 0.8 ? 0.5 : 0); }
    c.my = y; const xl = cx - w, xr = cx + w * (1 - 0.18 * c.a), yl = y - m.cl * 1 * 0.9, yr = y - m.cr * 0.9; g.lineCap = 'round'; g.lineJoin = 'round';
    if (m.wavy > 0 && open < 12) { g.beginPath(); const n = 6; for (let i = 0; i <= n; i++) { const x = lerp(xl, xr, i / n), yy = y + (i % 2 ? -1 : 1) * 4 * m.wavy + (-lerp(m.cl, m.cr, i / n)); i ? g.lineTo(x, yy) : g.moveTo(x, yy); } g.lineWidth = c.ol * 1.1; g.strokeStyle = c.ink; g.stroke(); if (open > 4) { } return; }
    if (open < 3 && round < 0.2) { g.beginPath(); g.moveTo(xl, yl); g.quadraticCurveTo((xl + xr) / 2, y + 2 - m.top - (m.cl + m.cr) * -0.0 + (m.cl + m.cr) * -0.25 + 0, xr, yr); g.lineWidth = c.ol * 1.15; g.strokeStyle = c.ink; g.stroke(); return; }
    // open mouth: top lip curve + lower jaw bulge
    const ww = lerp(w, w * 0.55, round), cl = lerp(xl, cx - ww, round), cr = lerp(xr, cx + ww, round), topY = y - m.top - ((m.cl + m.cr) / 2) * 0.1;
    g.beginPath(); g.moveTo(cl, lerp(yl, y, round)); g.quadraticCurveTo(cx, topY - 2 + Math.min(0, -(m.cl + m.cr) * 0.3), cr, lerp(yr, y, round)); g.bezierCurveTo(cr + 2 * round, y + open * 1.25, cl - 2 * round, y + open * 1.25, cl, lerp(yl, y, round)); g.closePath();
    g.fillStyle = STYLE.mouthIn; g.fill(); g.save(); g.clip();
    if (tongue > 0.01) { g.beginPath(); g.ellipse(cx, y + open * 0.95, ww * 0.6, open * 0.34 * (0.5 + tongue), 0, 0, TAU); g.fillStyle = STYLE.tongue; g.fill(); }
    if (teeth > 0.01) { g.fillStyle = c.pal.eyeWhite; g.fillRect(cl - 4, Math.min(yl, yr, y) - 6, cr - cl + 8, 6 + Math.max(7, open * 0.4) * teeth + 4); g.beginPath(); g.moveTo(cl, y + 2 + Math.max(7, open * 0.4) * teeth); g.lineTo(cr, y + 2 + Math.max(7, open * 0.4) * teeth); g.lineWidth = 2; g.strokeStyle = 'rgba(0,0,0,.25)'; g.stroke(); }
    g.restore(); g.beginPath(); g.moveTo(cl, lerp(yl, y, round)); g.quadraticCurveTo(cx, topY - 2 + Math.min(0, -(m.cl + m.cr) * 0.3), cr, lerp(yr, y, round)); g.bezierCurveTo(cr + 2 * round, y + open * 1.25, cl - 2 * round, y + open * 1.25, cl, lerp(yl, y, round)); g.closePath(); g.lineWidth = c.ol * 1.05; g.strokeStyle = c.ink; g.stroke();
  }

  function torso(g, c, P) {
    const bd = c.b, o = c.outfit, pal = c.pal, tw = bd.tw * (1 - 0.1 * P.a), bw = bd.bw * (1 - 0.1 * P.a), th = bd.th, col = pal.top, y0 = -th + 8;
    // skirt / coat tails behind the torso edge
    if (o.skirt) { const sl = 138 * o.skirt + 10, sway = P.sway * 3; g.beginPath(); g.moveTo(-bw / 2 - 2, -20); g.lineTo(bw / 2 + 2, -20); g.lineTo(bw / 2 + 22 + sway, sl); g.lineTo(-bw / 2 - 22 + sway, sl); g.closePath(); fillStroke(g, lightC(col, -0.08), c.ink, c.ol); }
    else { g.beginPath(); g.roundRect(-bw / 2 - 2, -22, bw + 4, 40, 14); fillStroke(g, pal.bottom, c.ink, c.ol); } // pelvis / trousers top
    if (o.collar === 'hood') { g.beginPath(); g.ellipse(-4 * P.a, y0 - 2, tw * 0.5, 22, 0, 0, TAU); fillStroke(g, lightC(col, -0.12), c.ink, c.ol); }
    trap(g, tw, bw, y0, 4, 26); fillStroke(g, col, c.ink, c.ol);
    if (o.collar === 'suit') { const x = P.a * 6; g.beginPath(); g.moveTo(x - 20, y0); g.lineTo(x, y0 + 46); g.lineTo(x + 20, y0); g.closePath(); fillStroke(g, pal.top2, c.ink, c.ol * 0.7); g.beginPath(); g.moveTo(x - 20, y0); g.lineTo(x - 34, y0 + 52); g.lineTo(x - 4, y0 + 52 - 8); g.lineTo(x, y0 + 46); g.closePath(); fillStroke(g, lightC(col, -0.1), c.ink, c.ol * 0.7); g.beginPath(); g.moveTo(x + 20, y0); g.lineTo(x + 34, y0 + 52); g.lineTo(x + 4, y0 + 44); g.lineTo(x, y0 + 46); g.closePath(); fillStroke(g, lightC(col, -0.1), c.ink, c.ol * 0.7); g.beginPath(); g.moveTo(x, y0 + 46); g.lineTo(x, 4); g.lineWidth = c.ol * 0.8; g.strokeStyle = c.ink; g.stroke(); }
    else if (o.collar === 'crew') { g.beginPath(); g.arc(P.a * 4, y0 + 2, 22, 0.15 * Math.PI, 0.85 * Math.PI); g.lineWidth = c.ol * 0.9; g.strokeStyle = c.ink; g.stroke(); }
    else if (o.collar === 'hood') { g.beginPath(); g.moveTo(-22, y0 + 4); g.quadraticCurveTo(0, y0 + 40, 22, y0 + 4); g.lineWidth = c.ol * 0.9; g.strokeStyle = c.ink; g.stroke(); g.beginPath(); g.roundRect(-30, -52, 60, 30, 10); fillStroke(g, lightC(col, -0.08), c.ink, c.ol * 0.7); }
    else if (o.collar === 'vest') { g.beginPath(); g.moveTo(-18, y0); g.lineTo(0, y0 + 48); g.lineTo(18, y0); g.closePath(); fillStroke(g, pal.top2, c.ink, c.ol * 0.7); }
  }

  // draw a whole character. (x, y) of the ground contact are in P. Wrap in your own save/restore.
  C.draw = function (g, ch, P, t, o = {}) {
    const bd = ch.b, c = { b: bd, pal: ch.pal, ink: ch.ink, ol: ch.ol, outfit: ch.outfitDef, mir: P.mir, sh: {}, acc: ch.acc, hairStyle: ch.hair, sleeveCol: ch.pal.top, propOpts: ch.propOpts, tw: bd.tw };
    const shw = (bd.tw / 2) * (1 - 0.45 * P.a) - 2; c.sh.near = -shw; c.sh.far = shw; P.back = !!o.back;
    g.save(); g.translate(P.x + (o.dx || 0), P.y + (o.dy || 0)); g.scale(P.sc * P.mir * (o.sx || 1) * (1 - P.squash * 0.0), P.sc * (o.sy || 1)); g.lineJoin = 'round';
    if (!o.noShadow) { const k = 1 - P.crouch * 0.1 - Math.min(0.2, (138 - P.hipH) / 400); g.beginPath(); g.ellipse(0, 3, 74 * k * (P.sc > 0 ? 1 : 1), 13, 0, 0, TAU); g.fillStyle = STYLE.shadow; g.fill(); }
    g.translate(P.trx, P.try);
    const hipH = P.hipH + P.bounce, hx = { near: -(4 + 11 * (1 - P.a)), far: 4 + 11 * (1 - P.a) };
    drawLeg(g, c, 'far', hx.far, hipH, P.ff, P); drawLeg(g, c, 'near', hx.near, hipH, P.fn, P);
    g.translate(P.bodyX, -hipH); g.rotate(P.lean); g.scale(1, 1 + 0.012 * P.breathe - P.squash * 0.5); g.scale(1 + P.squash, 1);
    drawArm(g, c, P.armF, 'far', P, t);
    torso(g, c, P); for (const acc of ch.acc) { const d = C.accessories[acc.name]; if (d && d.slot === 'body') d.draw(g, c, acc); }
    drawArm(g, c, P.armN, 'near', P, t);
    // head, neck
    g.save(); g.translate(P.headDx * 1 + (P.a * 5), -126 - 68 * ch.b.headS + P.headDy); g.rotate(P.headTilt); const F = P.face; drawHead(g, c, F, P, t); g.restore();
    g.restore();
  };

  // head position in world space (for bubbles, look targets, shot framing). Returns {x, y} of the head centre.
  C.headWorld = function (ch, P) { const hs = ch.b.headS; return { x: P.x, y: P.y - (P.hipH + 126 + 68 * hs - P.headDy) * P.sc }; };
  C.heightOf = ch => 410 * ch.scale; // standing height in world px

  // build a runtime char record from a definition + per-scene overrides (palette / outfit / accessories / scale)
  C.make = function (id, base, over) {
    const d = Object.assign({}, C.chars[base || id] || {}, over || {}); const pal = Object.assign({}, PAL, (C.chars[base || id] || {}).palette, (over || {}).palette);
    const acc = (d.accessories || []).map(a => (typeof a === 'string' ? (a.includes(':') ? { name: a.split(':')[0], kind: a.split(':')[1] } : { name: a }) : a));
    return { id, def: d, pal, ink: pal.ink || STYLE.ink, ol: d.outline || STYLE.ol, b: C.builds[d.build || 'average'] || C.builds.average, outfit: d.outfit || 'tee', outfitDef: C.outfits[d.outfit || 'tee'] || C.outfits.tee, hair: d.hair || 'short', acc, scale: d.scale || 1, propOpts: d.propOpts, seed: (d.seed != null ? d.seed : [...id].reduce((s, ch) => s * 31 + ch.charCodeAt(0), 7) % 97), facing0: d.facing == null ? 1 : d.facing, face0: d.face || 'neutral', talkDrive: d.talkDrive || 'mime',
      init: { x: 0, lane: 0 }, moves: [], facing: [], faces: [], looks: [], gestures: [], talks: [], crouch: [], holds: [] };
  };
  C.ss = ss; C.eio = eio; C.eout = eout; C.stepT = stepT;
})();
