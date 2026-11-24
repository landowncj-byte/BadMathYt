// Bad Math storyteller: the channel's one recurring character. Load this file in every video (see brand/CHARACTER.md).
// Usage: Storyteller.draw(ctx, t, { mouth, timeline, bubbles, follow }).
//   mouth: 0..1 loudness for this frame (from the narration).
//   timeline: [[startSec, pose], ...] with poses idle | point | chin | shock | shrug | you | wave | follow.
//   bubbles: [[start, end, 'LINE 1', 'LINE 2'?], ...] speech bubbles (comment prompts).
//   follow: [start, end] shows the +FOLLOW button that ticks to FOLLOWING.
//   pos: {x, y, s} optional placement (feet position + scale); default = vertical-shorts placement. Bubble and follow button anchor relative to pos.
//   followLabel: optional ['+ FOLLOW', '✓ FOLLOWING'] labels (e.g. ['SUBSCRIBE','✓ SUBSCRIBED']). followAt: [x,y] absolute override, followScale: number.
// Deterministic: everything is a function of t.
(function () {
  const INK = '#0B0F14', RED = '#FF3B30', PAPER = '#F5F3EE', GOLD = '#F2B705', HL = '#FFD60A', GREEN = '#00D26A';
  const SUIT = '#2c3e66', SUIT_EDGE = '#6f86b8';
  // Fixed placement: bottom-right, just left of the Shorts/TikTok/Reels button rail (keep x < 940).
  const POS = { x: 842, y: 1545, s: 1.12 };
  const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  const lin = (t, a, b) => clamp((t - a) / (b - a));
  const eo = x => 1 - Math.pow(1 - clamp(x), 3);
  const back = x => { x = clamp(x); const c1 = 1.9, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
  function poseAt(timeline, t) { let p = 'idle', since = 0; for (const [s, name] of timeline || []) if (t >= s) { p = name; since = s; } return [p, t - since]; }
  function bubble(c, t, b, P) {
    const [s, e, l1, l2, at] = b; if (t < s || t >= e) return;
    const k = back(lin(t, s, s + .25)) * (1 - eo(lin(t, e - .15, e)));
    c.save(); c.translate(...(at || rel(P, 720, 985))); c.scale(k, k);
    c.font = '800 31px Inter'; const w = Math.max(c.measureText(l1).width, l2 ? c.measureText(l2).width : 0) + 56, h = l2 ? 118 : 74;
    c.fillStyle = PAPER; c.beginPath(); c.roundRect(-w / 2, -h / 2, w, h, 26); c.fill();
    c.beginPath(); c.moveTo(w * .18, h / 2 - 2); c.lineTo(w * .32, h / 2 + 46); c.lineTo(w * .34, h / 2 - 2); c.fill();
    c.fillStyle = INK; c.textAlign = 'center'; c.textBaseline = 'middle';
    if (l2) { c.fillText(l1, 0, -22); c.fillStyle = RED; c.fillText(l2, 0, 24); } else c.fillText(l1, 0, 2);
    c.restore();
  }
  // position defined for the default placement, re-anchored relative to pos
  function rel(P, x, y) { const r = P.s / POS.s; return [P.x + (x - POS.x) * r, P.y + (y - POS.y) * r]; }
  function followBtn(c, t, f, P, o) {
    const [s, e] = f; if (t < s || t >= e) return;
    const k = back(lin(t, s, s + .25)); const done = t > s + .9; const press = t > s + .75 && t < s + .95 ? .9 : 1;
    c.save(); c.translate(...(o.followAt || rel(P, 700, 1030))); const fs = (o.followScale || 1) * k * press; c.scale(fs, fs);
    c.fillStyle = done ? '#2a323d' : RED; c.beginPath(); c.roundRect(-150, -42, 300, 84, 42); c.fill();
    c.fillStyle = PAPER; c.font = '800 38px Inter'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText((o.followLabel || ['+ FOLLOW', '✓ FOLLOWING'])[done ? 1 : 0], 0, 2);
    if (!done) { // tap ripple
      const r = lin(t, s + .55, s + .9); if (r > 0) { c.strokeStyle = `rgba(245,243,238,${1 - r})`; c.lineWidth = 6; c.beginPath(); c.arc(80, 10, 20 + 60 * r, 0, 7); c.stroke(); }
    }
    c.restore();
  }
  function draw(c, t, o = {}) {
    const P = { ...POS, ...(o.pos || {}) };
    const m = clamp(o.mouth || 0), enter = back(lin(t, o.enterAt ?? .45, (o.enterAt ?? .45) + .4)); if (enter <= 0) return;
    const [pose, pt] = poseAt(o.timeline, t);
    const shock = pose === 'shock' ? Math.exp(-pt * 4) : 0;
    const bob = Math.sin(t * 3.1) * 6 + (m > .25 ? Math.sin(t * 22) * 2 : 0) - shock * 40;
    c.save(); c.translate(P.x, P.y + bob); c.scale(enter * P.s, enter * P.s);
    const rim = c.createRadialGradient(0, -150, 20, 0, -150, 190); rim.addColorStop(0, 'rgba(255,214,10,.22)'); rim.addColorStop(1, 'rgba(255,214,10,0)'); c.fillStyle = rim; c.fillRect(-200, -360, 400, 380);
    c.fillStyle = 'rgba(0,0,0,.4)'; c.beginPath(); c.ellipse(0, 0, 80, 14, 0, 0, 7); c.fill();
    // suit
    c.fillStyle = SUIT; c.strokeStyle = SUIT_EDGE; c.lineWidth = 4; c.beginPath(); c.moveTo(-62, -8); c.lineTo(62, -8); c.lineTo(48, -120); c.lineTo(-48, -120); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = PAPER; c.beginPath(); c.moveTo(-14, -120); c.lineTo(14, -120); c.lineTo(0, -80); c.closePath(); c.fill();
    c.fillStyle = RED; c.beginPath(); c.moveTo(0, -116); c.lineTo(-22, -128); c.lineTo(-22, -104); c.closePath(); c.fill(); c.beginPath(); c.moveTo(0, -116); c.lineTo(22, -128); c.lineTo(22, -104); c.closePath(); c.fill(); c.beginPath(); c.arc(0, -116, 6, 0, 7); c.fill();
    const arm = (side, ang, len = 70) => { c.save(); c.translate(side * 46, -108); c.rotate(ang); c.lineCap = 'round'; c.strokeStyle = SUIT_EDGE; c.lineWidth = 22; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, len); c.stroke(); c.strokeStyle = SUIT; c.lineWidth = 15; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, len); c.stroke(); c.fillStyle = PAPER; c.beginPath(); c.arc(0, len + 6, 11, 0, 7); c.fill(); c.restore(); };
    const wig = Math.sin(t * 6) * .08;
    if (pose === 'point') { arm(1, .5 + wig * .3); arm(-1, 2.35 + wig, 78); }
    else if (pose === 'chin') { arm(1, .35); arm(-1, 2.6, 48); }
    else if (pose === 'shock') { arm(1, -2.6 - shock * .2, 64); arm(-1, 2.6 + shock * .2, 64); }
    else if (pose === 'shrug') { const s = Math.sin(clamp(pt / .6) * Math.PI); arm(1, -1.2 - s * .3, 56); arm(-1, 1.2 + s * .3, 56); }
    else if (pose === 'you') { arm(1, .4); arm(-1, 1.6 + Math.sin(t * 8) * .1, 76); }
    else if (pose === 'wave') { arm(1, -2.7 + Math.sin(t * 10) * .35, 66); arm(-1, -.4); }
    else if (pose === 'follow') { arm(1, .4); arm(-1, 2.0 + Math.sin(t * 9) * .12, 80); }
    else { arm(1, .3 + wig * .2); arm(-1, -.3 - wig * .2); }
    // coin head
    c.save(); c.translate(0, -200); c.rotate(Math.sin(t * 1.7) * .05 + (pose === 'chin' ? .12 : 0));
    const R = 78; c.fillStyle = '#b8860b'; c.beginPath(); c.arc(0, 0, R, 0, 7); c.fill();
    for (let i = 0; i < 64; i++) { const a = i / 64 * Math.PI * 2; c.strokeStyle = '#8a6408'; c.lineWidth = 3; c.beginPath(); c.moveTo(Math.cos(a) * (R - 6), Math.sin(a) * (R - 6)); c.lineTo(Math.cos(a) * R, Math.sin(a) * R); c.stroke(); }
    const hg = c.createRadialGradient(-20, -24, 10, 0, 0, R); hg.addColorStop(0, '#ffe27a'); hg.addColorStop(1, GOLD); c.fillStyle = hg; c.beginPath(); c.arc(0, 0, R - 9, 0, 7); c.fill();
    c.strokeStyle = 'rgba(138,100,8,.6)'; c.lineWidth = 3; c.beginPath(); c.arc(0, 0, R - 16, 0, 7); c.stroke();
    const blink = ((t + .7) % 3.3) < .12 ? .15 : 1; const look = (pose === 'you' || pose === 'wave' || pose === 'follow') ? [0, 2] : [-6, -4];
    const browUp = 6 + shock * 16 + (pose === 'shrug' ? 8 : 0) + (pose === 'chin' ? -3 : 0);
    for (const s of [-1, 1]) { c.fillStyle = '#fff'; c.beginPath(); c.ellipse(s * 25, -12, 15, 18 * blink, 0, 0, 7); c.fill(); if (blink > .5) { c.fillStyle = INK; c.beginPath(); c.arc(s * 25 + look[0], -10 + look[1], 7, 0, 7); c.fill(); }
      c.strokeStyle = '#5a3f08'; c.lineWidth = 6; c.lineCap = 'round'; c.beginPath(); c.moveTo(s * 14, -34 - browUp + (pose === 'chin' && s > 0 ? -6 : 0)); c.lineTo(s * 36, -38 - browUp); c.stroke(); }
    const mo = clamp(m * 1.2 + shock * .8); c.fillStyle = '#3a1a08'; c.beginPath(); c.ellipse(0, 26, 18 + mo * 6, 3 + mo * 16, 0, 0, 7); c.fill();
    if (mo < .08) { c.strokeStyle = '#3a1a08'; c.lineWidth = 5; c.beginPath(); c.arc(0, 18, 16, .2 * Math.PI, .8 * Math.PI); c.stroke(); }
    c.fillStyle = 'rgba(255,120,80,.35)'; c.beginPath(); c.arc(-44, 14, 9, 0, 7); c.arc(44, 14, 9, 0, 7); c.fill();
    c.restore(); c.restore();
    for (const b of o.bubbles || []) bubble(c, t, b, P);
    if (o.follow) followBtn(c, t, o.follow, P, o);
  }
  // Head only, for avatars / profile pictures
  function head(c, x, y, r) { c.save(); c.translate(x, y); c.scale(r / 78, r / 78); const R = 78;
    c.fillStyle = '#b8860b'; c.beginPath(); c.arc(0, 0, R, 0, 7); c.fill();
    for (let i = 0; i < 64; i++) { const a = i / 64 * Math.PI * 2; c.strokeStyle = '#8a6408'; c.lineWidth = 3; c.beginPath(); c.moveTo(Math.cos(a) * (R - 6), Math.sin(a) * (R - 6)); c.lineTo(Math.cos(a) * R, Math.sin(a) * R); c.stroke(); }
    const hg = c.createRadialGradient(-20, -24, 10, 0, 0, R); hg.addColorStop(0, '#ffe27a'); hg.addColorStop(1, GOLD); c.fillStyle = hg; c.beginPath(); c.arc(0, 0, R - 9, 0, 7); c.fill();
    c.strokeStyle = 'rgba(138,100,8,.6)'; c.lineWidth = 3; c.beginPath(); c.arc(0, 0, R - 16, 0, 7); c.stroke();
    for (const s of [-1, 1]) { c.fillStyle = '#fff'; c.beginPath(); c.ellipse(s * 25, -12, 15, 18, 0, 0, 7); c.fill(); c.fillStyle = INK; c.beginPath(); c.arc(s * 25 + 2, -8, 7.5, 0, 7); c.fill(); c.strokeStyle = '#5a3f08'; c.lineWidth = 6; c.lineCap = 'round'; c.beginPath(); c.moveTo(s * 14, -40); c.lineTo(s * 36, -48 + (s > 0 ? -6 : 0)); c.stroke(); }
    c.strokeStyle = '#3a1a08'; c.lineWidth = 6; c.beginPath(); c.arc(4, 16, 20, .15 * Math.PI, .75 * Math.PI); c.stroke();
    c.fillStyle = 'rgba(255,120,80,.35)'; c.beginPath(); c.arc(-44, 14, 9, 0, 7); c.arc(44, 14, 9, 0, 7); c.fill();
    c.restore(); }
  window.Storyteller = { draw, head, POS, poses: ['idle', 'point', 'chin', 'shock', 'shrug', 'you', 'wave', 'follow'] };
})();
