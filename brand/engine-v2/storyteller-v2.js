// Bad Math storyteller, engine v2. SAME CHARACTER as brand/storyteller.js (brand lock): gold coin head, big white
// eyes, brown brows, rosy cheeks, navy suit #2c3e66 with #6f86b8 edge, white shirt V, red bowtie #FF3B30, same
// proportions, same poses. What v2 adds is motion and rendering quality only:
//   - he travels (x, y), scales and switches depth layer ('front' of the graphic / 'back' behind it)
//   - poses blend with a spring instead of snapping; he can point at / look at any screen point
//   - hops with anticipation + squash on landing, leans into moves, head follows through
//   - soft contact shadow and soft shading instead of the yellow rim glow
// Deterministic: everything is a function of t.
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, wobble } = B;
  const INK = '#0B0F14', RED = '#FF3B30', PAPER = '#F5F3EE', GOLD = '#F2B705', SUIT = '#2c3e66', SUIT_EDGE = '#6f86b8';
  // pose -> [rightArmAngle, rightLen, leftArmAngle, leftLen, headTilt, browUp, look:[x,y]|null]   (angle 0 = arm straight down)
  function poseParams(pose, t, pt, m) {
    const wig = Math.sin(t * 6) * 0.08;
    switch (pose) {
      case 'point': return [0.5 + wig * 0.3, 70, 2.35 + wig, 78, 0, 6, [-6, -4]];
      case 'chin': return [0.35, 70, 2.6, 48, 0.12, 3, [-6, -4]];
      case 'shock': { const s = Math.exp(-pt * 4); return [-2.6 - s * 0.2, 64, 2.6 + s * 0.2, 64, 0, 6 + s * 16, [-6, -4]]; }
      case 'shrug': { const s = Math.sin(clamp(pt / 0.6) * Math.PI); return [-1.2 - s * 0.3, 56, 1.2 + s * 0.3, 56, 0, 14, [-6, -4]]; }
      case 'you': return [0.4, 70, 1.6 + Math.sin(t * 8) * 0.1, 76, 0, 6, [0, 2]];
      case 'wave': return [-2.7 + Math.sin(t * 10) * 0.35, 66, -0.4, 70, 0, 6, [0, 2]];
      case 'follow': return [0.4, 70, 2.0 + Math.sin(t * 9) * 0.12, 80, 0, 6, [0, 2]];
      case 'talk': { const a = 0.55 + m * 0.5 + Math.sin(t * 4.3) * 0.12, b = 0.6 + m * 0.4 + Math.sin(t * 3.7 + 1) * 0.14; return [-a, 62, b, 62, Math.sin(t * 2.1) * 0.03, 6 + m * 5, [0, 2]]; }
      default: return [0.3 + wig * 0.2, 70, -0.3 - wig * 0.2, 70, 0, 6, [-6, -4]];
    }
  }
  const POSE_BLEND = 0.34;
  // timeline: [[t, pose, {target:[sx,sy]}?], ...]  -> blended parameters at t
  function poseAt(timeline, t, m) {
    let cur = [0, 'idle'], prev = null; for (const e of timeline || []) if (t >= e[0]) { prev = cur; cur = e; }
    const pt = t - cur[0], A = poseParams(cur[1], t, pt, m); if (!prev) return { p: A, pose: cur[1], pt, opts: cur[2] || {}, k: 1, prevOpts: {} };
    const k = clamp(spring(pt, { f: 1 / POSE_BLEND * 0.75, z: 0.62 }), 0, 1.25), P0 = poseParams(prev[1], t, t - prev[0], m);
    const p = A.map((v, i) => (i === 6 ? [lerp(P0[6][0], v[0], clamp(k)), lerp(P0[6][1], v[1], clamp(k))] : lerp(P0[i], v, k)));
    return { p, pose: cur[1], pt, opts: cur[2] || {}, k: clamp(k), prevOpts: prev[2] || {} };
  }
  // Movement track. keys: [{t, dur, to:{x, y, s, layer, blur, dim}, hop}]  (x, y = feet on screen, s = scale)
  function track(keys) {
    keys = keys.slice().sort((a, b) => a.t - b.t);
    const first = { ...B.L.stFirst, layer: 'front', blur: 0, dim: 0, ...(keys[0] ? keys[0].to : {}) }, starts = [];
    function ev(i, t) {
      const k = keys[i], from = i === 0 ? first : starts[i], to = { ...from, ...k.to }, u = k.dur > 0 ? clamp((t - k.t) / k.dur) : 1, p = ease.glide(u);
      const dist = Math.hypot(to.x - from.x, to.y - from.y), n = k.hop === 0 ? 0 : clamp(Math.round(dist / 300), 1, 3), sc = Math.exp(lerp(Math.log(from.s), Math.log(to.s), p));
      const hop = n && dist > 30 ? Math.abs(Math.sin(Math.PI * p * n)) * (k.hop ?? 30) * sc : 0;
      const after = t - (k.t + k.dur), land = dist > 30 || Math.abs(to.s - from.s) > 0.1 ? wobble(after, 3.2, 7) * -0.09 : 0;   // squash on landing, then settle
      const antic = dist > 30 ? Math.sin(Math.PI * lin(t, k.t, k.t + 0.16)) * 0.07 : 0;                                         // crouch before moving
      return { x: lerp(from.x, to.x, p), y: lerp(from.y, to.y, p), hop, s: sc, layer: p < 0.5 ? from.layer : to.layer, blur: lerp(from.blur, to.blur, p), dim: lerp(from.dim, to.dim, p), squash: antic - land, moving: u > 0 && u < 1 ? Math.sin(Math.PI * u) : 0, dir: Math.sign(to.x - from.x) };
    }
    for (let i = 0; i < keys.length; i++) starts[i] = i === 0 ? first : { ...ev(i - 1, keys[i].t), squash: 0, hop: 0 };
    return { at(t) { let i = 0; for (let j = 0; j < keys.length; j++) if (t >= keys[j].t) i = j; return keys.length ? ev(i, Math.max(t, keys[0].t)) : { ...first, squash: 0, moving: 0, dir: 0 }; }, keys };
  }
  // st: {x, y, s, squash, moving, dir}; o: {mouth, timeline, enterAt, lean (extra radians, e.g. from camera velocity)}
  function draw(c, t, st, o = {}) {
    const m = clamp(o.mouth || 0), enter = o.enterAt == null ? 1 : ease.pop(lin(t, o.enterAt, o.enterAt + 0.4)); if (enter <= 0) return;
    const P = poseAt(o.timeline, t, m), [ra0, rl, la0, ll, tilt, browUp, look0] = P.p, pose = P.pose, shock = pose === 'shock' ? Math.exp(-P.pt * 4) : 0;
    let ra = ra0, la = la0, look = look0;
    const tgt = P.opts.target, sh = [st.x, st.y - 108 * st.s];
    if (tgt) { // aim the arm on the target's side at a screen point; eyes follow
      const dx = tgt[0] - sh[0], dy = tgt[1] - sh[1], a = Math.atan2(-dx, dy), d = Math.hypot(dx, dy) || 1, k = P.k;
      if (pose === 'point' || pose === 'follow') { if (dx < 0) { la = lerp(la0, a < 0 ? a + Math.PI * 2 : a, k); ra = lerp(ra0, 0.4, k); } else { ra = lerp(ra0, a > 0 ? a - Math.PI * 2 : a, k); la = lerp(la0, -0.4, k); } }
      look = [lerp(look0[0], (dx / d) * 8, k), lerp(look0[1], (dy / d) * 6, k)];
    }
    const lean = (o.lean || 0) + st.moving * st.dir * 0.11, sq = st.squash || 0;
    const bob = Math.sin(t * 3.1) * 6 + (m > 0.25 ? Math.sin(t * 22) * 2 : 0) - shock * 40;
    c.save(); c.translate(st.x, st.y); c.scale(st.s * enter, st.s * enter);
    // soft contact shadow (stays on the ground while he bobs/hops)
    const sg = c.createRadialGradient(0, 2, 4, 0, 2, 96); sg.addColorStop(0, 'rgba(0,0,0,.42)'); sg.addColorStop(1, 'rgba(0,0,0,0)'); c.save(); c.scale(1, 0.2); c.fillStyle = sg; c.beginPath(); c.arc(0, 10, 96, 0, 7); c.fill(); c.restore();
    c.translate(0, bob - (st.hop || 0) / st.s); c.rotate(lean); c.scale(1 + sq, 1 - sq);
    // suit (same shape/colours as v1; soft shading only)
    c.lineJoin = 'round'; const body = () => { c.beginPath(); c.moveTo(-62, -8); c.lineTo(62, -8); c.lineTo(48, -120); c.lineTo(-48, -120); c.closePath(); };
    c.fillStyle = SUIT; c.strokeStyle = SUIT_EDGE; c.lineWidth = 4; body(); c.fill();
    c.save(); body(); c.clip(); const bg = c.createLinearGradient(-62, -120, 62, -8); bg.addColorStop(0, 'rgba(255,255,255,.10)'); bg.addColorStop(0.55, 'rgba(255,255,255,0)'); bg.addColorStop(1, 'rgba(0,0,0,.22)'); c.fillStyle = bg; c.fillRect(-70, -124, 140, 120); c.restore();
    body(); c.stroke();
    c.fillStyle = PAPER; c.beginPath(); c.moveTo(-14, -120); c.lineTo(14, -120); c.lineTo(0, -80); c.closePath(); c.fill();
    c.fillStyle = RED; c.beginPath(); c.moveTo(0, -116); c.lineTo(-22, -128); c.lineTo(-22, -104); c.closePath(); c.fill(); c.beginPath(); c.moveTo(0, -116); c.lineTo(22, -128); c.lineTo(22, -104); c.closePath(); c.fill(); c.beginPath(); c.arc(0, -116, 6, 0, 7); c.fill();
    const arm = (side, ang, len) => { c.save(); c.translate(side * 46, -108); c.rotate(ang); c.lineCap = 'round'; c.strokeStyle = SUIT_EDGE; c.lineWidth = 22; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, len); c.stroke(); c.strokeStyle = SUIT; c.lineWidth = 15; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, len); c.stroke(); c.fillStyle = PAPER; c.beginPath(); c.arc(0, len + 6, 11, 0, 7); c.fill(); c.restore(); };
    arm(1, ra, rl); arm(-1, la, ll);
    // coin head (follow-through: lags the body lean a little)
    c.save(); c.translate(-lean * 60, -200); c.rotate(Math.sin(t * 1.7) * 0.05 + tilt - lean * 0.6);
    const R = 78; c.fillStyle = '#b8860b'; c.beginPath(); c.arc(0, 0, R, 0, 7); c.fill();
    for (let i = 0; i < 64; i++) { const a = (i / 64) * Math.PI * 2; c.strokeStyle = '#8a6408'; c.lineWidth = 3; c.beginPath(); c.moveTo(Math.cos(a) * (R - 6), Math.sin(a) * (R - 6)); c.lineTo(Math.cos(a) * R, Math.sin(a) * R); c.stroke(); }
    const hg = c.createRadialGradient(-20, -24, 10, 0, 0, R); hg.addColorStop(0, '#ffe27a'); hg.addColorStop(1, GOLD); c.fillStyle = hg; c.beginPath(); c.arc(0, 0, R - 9, 0, 7); c.fill();
    c.strokeStyle = 'rgba(138,100,8,.6)'; c.lineWidth = 3; c.beginPath(); c.arc(0, 0, R - 16, 0, 7); c.stroke();
    c.strokeStyle = 'rgba(255,255,255,.5)'; c.lineWidth = 5; c.lineCap = 'round'; c.beginPath(); c.arc(0, 0, R - 24, Math.PI * 1.08, Math.PI * 1.36); c.stroke(); // soft specular
    const blink = (t + 0.7) % 3.3 < 0.12 ? 0.15 : 1, bu = browUp + shock * 0;
    for (const s of [-1, 1]) {
      c.fillStyle = '#fff'; c.beginPath(); c.ellipse(s * 25, -12, 15, 18 * blink, 0, 0, 7); c.fill();
      if (blink > 0.5) { c.fillStyle = INK; c.beginPath(); c.arc(s * 25 + look[0], -10 + look[1], 7, 0, 7); c.fill(); }
      c.strokeStyle = '#5a3f08'; c.lineWidth = 6; c.lineCap = 'round'; c.beginPath(); c.moveTo(s * 14, -34 - bu + (pose === 'chin' && s > 0 ? -6 * P.k : 0)); c.lineTo(s * 36, -38 - bu); c.stroke();
    }
    const mo = clamp(m * 1.2 + shock * 0.8); c.fillStyle = '#3a1a08'; c.beginPath(); c.ellipse(0, 26, 18 + mo * 6, 3 + mo * 16, 0, 0, 7); c.fill();
    if (mo < 0.08) { c.strokeStyle = '#3a1a08'; c.lineWidth = 5; c.beginPath(); c.arc(0, 18, 16, 0.2 * Math.PI, 0.8 * Math.PI); c.stroke(); }
    c.fillStyle = 'rgba(255,120,80,.35)'; c.beginPath(); c.arc(-44, 14, 9, 0, 7); c.arc(44, 14, 9, 0, 7); c.fill();
    c.restore(); c.restore();
  }
  B.Storyteller = { draw, track, poseAt, poses: ['idle', 'talk', 'point', 'chin', 'shock', 'shrug', 'you', 'wave', 'follow'] };
})();
