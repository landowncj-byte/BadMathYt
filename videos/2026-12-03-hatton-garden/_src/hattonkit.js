// Hatton Garden props (generic, no brand logos)
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, burst, hash, hit } = B;
  const INK = '#1b2028';
  const pop = (t, o = 'snappy') => clamp(spring(Math.max(0, t), o), 0, 1.25);
  const E = (g, x, y, rx, ry, c, st, lw) => { g.beginPath(); g.ellipse(x, y, rx, ry, 0, 0, 7); g.fillStyle = c; g.fill(); if (st) { g.strokeStyle = st; g.lineWidth = lw || 4; g.stroke(); } };
  const RR = (g, x, y, w, h, r, c, st, lw) => { g.beginPath(); g.roundRect(x, y, w, h, r); g.fillStyle = c; g.fill(); if (st) { g.strokeStyle = st; g.lineWidth = lw || 4; g.stroke(); } };
  const P = (g, pts, c, st, lw) => { g.beginPath(); pts.forEach((p, i) => i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); g.closePath(); g.fillStyle = c; g.fill(); if (st) { g.strokeStyle = st; g.lineWidth = lw || 4; g.lineJoin = 'round'; g.stroke(); } };
  const lift = (g) => { RR(g, -50, -64, 100, 128, 4, '#59647a', INK, 4); RR(g, -36, -52, 72, 104, 2, '#1b2028'); g.strokeStyle = '#c9ccd2'; g.lineWidth = 4; g.beginPath(); g.moveTo(-10, -52); g.lineTo(-10, 0); g.moveTo(10, -52); g.lineTo(10, 0); g.stroke(); RR(g, -26, -4, 52, 44, 4, '#8f98a8', INK, 3); for (let i = 0; i < 4; i++) { g.fillStyle = 'rgba(255,255,255,.3)'; g.fillRect(-20 + i * 11, 6, 6, 26); } g.fillStyle = '#F2B705'; g.beginPath(); g.moveTo(0, 56); g.lineTo(-12, 44); g.lineTo(12, 44); g.closePath(); g.fill(); };
  const drill = (g) => { g.save(); g.rotate(-0.3); RR(g, -16, -70, 32, 96, 8, '#59606B', INK, 4); RR(g, -34, -96, 68, 36, 10, '#d9362b', INK, 4); RR(g, -22, 26, 44, 40, 4, '#c9ccd2', INK, 4); g.fillStyle = '#8f98a8'; for (let i = 0; i < 5; i++) g.fillRect(-18 + i * 9, 30, 4, 32); g.restore(); for (let i = 0; i < 6; i++) { E(g, 20 + i * 8, 60 - (i % 3) * 14, 5, 5, 'rgba(200,190,170,.8)'); } };
  const cam = (g) => { RR(g, -50, -26, 90, 46, 8, '#e9edf5', INK, 4); E(g, 52, -2, 20, 20, '#2b3340', INK, 4); E(g, 52, -2, 8, 8, '#8ED8F2'); RR(g, -64, -40, 20, 24, 4, '#59606B', INK, 3); g.fillStyle = INK; g.fillRect(-12, 20, 14, 36); E(g, -40, -10, 5, 5, '#E0281E'); };
  const carrec = (g) => { RR(g, -78, -6, 156, 40, 9, '#8a949f', INK, 4); P(g, [[-46, -6], [-30, -38], [30, -38], [50, -6]], '#8a949f', INK, 4); RR(g, -22, -34, 40, 24, 3, '#bfe3f5', INK, 3); for (const x of [-46, 46]) E(g, x, 38, 15, 15, '#151a20', INK, 3); RR(g, 44, -64, 66, 28, 8, '#F5F3EE', INK, 3); E(g, 60, -50, 8, 8, '#E0281E'); txt(g, 'REC', 90, -49, F.monoX(15), '#E0281E'); };
  const mic = (g) => { RR(g, -18, -50, 36, 66, 18, '#59606B', INK, 4); g.strokeStyle = INK; g.lineWidth = 5; g.beginPath(); g.arc(0, 10, 32, 0.15, Math.PI - 0.15); g.stroke(); g.beginPath(); g.moveTo(0, 42); g.lineTo(0, 62); g.moveTo(-20, 62); g.lineTo(20, 62); g.stroke(); g.strokeStyle = 'rgba(255,255,255,.4)'; g.lineWidth = 3; for (let i = -2; i <= 2; i++) { g.beginPath(); g.moveTo(-12, i * 10 - 22); g.lineTo(12, i * 10 - 22); g.stroke(); } };
  const jar = (g) => { RR(g, -44, -50, 88, 112, 14, 'rgba(190,230,250,.5)', INK, 5); RR(g, -50, -64, 100, 18, 6, '#b88700', INK, 4); for (let i = 0; i < 7; i++) E(g, -26 + (i % 3) * 26, 46 - Math.floor(i / 3) * 22, 14, 10, '#F2B705', '#8a6a10', 3); txt(g, '£', 0, -10, F.hero(40), '#8a6a10'); };
  const wave = (g) => { RR(g, -64, -42, 128, 84, 16, '#F5F3EE', INK, 4); g.strokeStyle = '#E0281E'; g.lineWidth = 8; g.lineCap = 'round'; for (let i = -4; i <= 4; i++) { const h = 8 + 26 * Math.abs(Math.sin(i * 1.3)); g.beginPath(); g.moveTo(i * 12, -h); g.lineTo(i * 12, h); g.stroke(); } };
  const cuffs9 = (g) => { g.strokeStyle = '#59606B'; g.lineWidth = 9; for (const q of [-1, 1]) { g.beginPath(); g.arc(q * 28, 6, 22, 0, 7); g.stroke(); } g.setLineDash([6, 5]); g.beginPath(); g.moveTo(-8, 6); g.lineTo(8, 6); g.stroke(); g.setLineDash([]); };
  B.extraIcons = Object.assign(B.extraIcons || {}, { lift, drill, cam, carrec, mic, jar, wave, cuffs9 });
  // ---- camwall: grid of camera feeds; one feed circled at p.circleAt
  B.register('camwall', {
    defaults: { w: 880, h: 760, cols: 4, rows: 4, circleAt: 99999, head: 'LONDON · CAMERA FEEDS', at: 0 }, size: p => [p.w, p.h], ownEnter: true,
    anchors: p => ({ feed: [p.w * 0.12, 30, p.w * 0.26, p.h * 0.2], wall: [0, 40, p.w * 0.92, p.h * 0.75] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, k = pop(lt, 'snappy'); g.save(); g.scale(0.92 + 0.08 * k, 0.92 + 0.08 * k); g.globalAlpha *= clamp(lt / 0.1 + 0.2); paper(g, -w / 2, -h / 2, w, h, 22, { lift, fill: '#10141a' });
      txt(g, p.head, 0, -h / 2 + 40, F.hero(46), '#F5F3EE'); const cw = (w - 60) / p.cols, ch = (h - 140) / p.rows, gx = -w / 2 + 30, gy = -h / 2 + 90, n = p.cols * p.rows, on = Math.floor(clamp((t - p.at) / 1.2) * n);
      for (let i = 0; i < n; i++) { const x = gx + (i % p.cols) * cw, y = gy + Math.floor(i / p.cols) * ch; if (i >= on) { g.fillStyle = '#1b2230'; g.fillRect(x + 4, y + 4, cw - 8, ch - 8); continue; } g.fillStyle = ['#2c3e66', '#3a4a5c', '#2f4a4a', '#4a3f5a'][i % 4]; g.fillRect(x + 4, y + 4, cw - 8, ch - 8); g.fillStyle = 'rgba(255,255,255,.12)'; g.fillRect(x + 4, y + ch * 0.62, cw - 8, ch * 0.3); g.fillStyle = '#6a7585'; g.fillRect(x + cw * 0.2, y + ch * 0.45 + (i % 3) * 6, cw * 0.28, ch * 0.2); E(g, x + cw * 0.3, y + ch * 0.7, 6, 6, '#151a20'); E(g, x + cw * 0.42, y + ch * 0.7, 6, 6, '#151a20'); E(g, x + 14, y + 14, 4, 4, '#E0281E'); if ((Math.floor(t * 3 + i) % 6) < 3) txt(g, 'REC', x + 36, y + 15, F.monoX(11), 'rgba(245,243,238,.7)', 'left'); }
      const co = ease.out(clamp((t - p.circleAt) / 0.4)); if (co > 0) { const x = gx + 1 * cw + cw / 2, y = gy + 1 * ch + ch / 2; g.strokeStyle = '#E0281E'; g.lineWidth = 8; g.beginPath(); g.ellipse(x, y, cw * 0.55 * (2 - co), ch * 0.6 * (2 - co), 0, 0, 7); g.stroke(); }
      g.restore();
    },
  });
})();
