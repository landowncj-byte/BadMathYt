// Brink's 1950 props (generic: no real logos). icons + bigclock + deadends + yearstrip
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, burst, hash, hit, roll, countAt } = B;
  const INK = '#1b2028';
  const pop = (t, o = 'snappy') => clamp(spring(Math.max(0, t), o), 0, 1.25);
  const E = (g, x, y, rx, ry, c, st, lw) => { g.beginPath(); g.ellipse(x, y, rx, ry, 0, 0, 7); g.fillStyle = c; g.fill(); if (st) { g.strokeStyle = st; g.lineWidth = lw || 4; g.stroke(); } };
  const RR = (g, x, y, w, h, r, c, st, lw) => { g.beginPath(); g.roundRect(x, y, w, h, r); g.fillStyle = c; g.fill(); if (st) { g.strokeStyle = st; g.lineWidth = lw || 4; g.stroke(); } };
  const P = (g, pts, c, st, lw) => { g.beginPath(); pts.forEach((p, i) => i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); g.closePath(); g.fillStyle = c; g.fill(); if (st) { g.strokeStyle = st; g.lineWidth = lw || 4; g.lineJoin = 'round'; g.stroke(); } };
  const armtruck = (g) => { RR(g, -86, -34, 120, 70, 8, '#59647a', INK, 4); RR(g, 30, -14, 54, 50, 8, '#59647a', INK, 4); RR(g, 44, -8, 30, 22, 3, '#bfe3f5', INK, 3); RR(g, -70, -20, 90, 40, 4, '#3b4658', INK, 3); for (const x of [-52, 56]) E(g, x, 40, 16, 16, '#151a20', INK, 3); RR(g, -64, -14, 30, 10, 2, '#F2B705'); };
  const mask = (g) => { E(g, 0, 0, 52, 58, '#8fbf6a', INK, 5); for (const q of [-1, 1]) E(g, q * 20, -10, 12, 9, '#0a0d12'); g.fillStyle = '#0a0d12'; g.beginPath(); g.moveTo(-26, 20); g.quadraticCurveTo(0, 50, 26, 20); g.quadraticCurveTo(0, 28, -26, 20); g.fill(); g.fillStyle = '#fff'; for (let k = -2; k <= 2; k++) g.fillRect(k * 8 - 3, 24, 6, 6); };
  const capicon = (g) => { g.fillStyle = '#8b8574'; g.beginPath(); g.moveTo(-56, 6); g.bezierCurveTo(-60, -50, 60, -50, 56, 6); g.closePath(); g.fill(); g.strokeStyle = INK; g.lineWidth = 4; g.stroke(); RR(g, -60, 0, 120, 16, 6, '#6e6858', INK, 4); g.beginPath(); g.moveTo(-50, 14); g.quadraticCurveTo(0, 56, 50, 14); g.fillStyle = '#1b2028'; g.fill(); };
  const shoe = (g) => { g.beginPath(); g.moveTo(-60, 20); g.lineTo(-60, -20); g.quadraticCurveTo(-20, -30, 0, -10); g.quadraticCurveTo(40, 0, 62, 14); g.lineTo(62, 28); g.lineTo(-60, 28); g.closePath(); g.fillStyle = '#3b2f2a'; g.fill(); g.strokeStyle = INK; g.lineWidth = 4; g.stroke(); RR(g, -62, 24, 126, 18, 5, '#c9c3b3', INK, 3); for (let i = 0; i < 6; i++) { g.fillStyle = '#8a8474'; g.fillRect(-52 + i * 20, 30, 10, 6); } };
  const rope = (g) => { g.strokeStyle = '#b89a6a'; g.lineWidth = 14; g.lineCap = 'round'; for (let i = 0; i < 3; i++) { g.beginPath(); g.ellipse(0, -20 + i * 26, 56 - i * 4, 18, 0, 0, 7); g.stroke(); } g.strokeStyle = INK; g.lineWidth = 3; for (let i = 0; i < 3; i++) { g.beginPath(); g.ellipse(0, -20 + i * 26, 56 - i * 4, 18, 0, 0, 7); g.stroke(); } };
  const bundle = (g) => { for (let i = 2; i >= 0; i--) { g.save(); g.translate(i * 8 - 8, -i * 14 + 14); RR(g, -50, -22, 100, 44, 5, i ? '#2f8556' : '#3aa56b', INK, 3); g.fillStyle = '#e9e4d6'; g.fillRect(-9, -22, 18, 44); E(g, 0, 0, 14, 14, '#2f8556', INK, 3); g.restore(); } };
  const whisper = (g) => { g.beginPath(); g.moveTo(-60, -30); g.quadraticCurveTo(-60, -60, -20, -60); g.lineTo(30, -60); g.quadraticCurveTo(66, -60, 66, -28); g.quadraticCurveTo(66, 4, 30, 4); g.lineTo(-14, 4); g.lineTo(-34, 30); g.lineTo(-34, 4); g.quadraticCurveTo(-60, 2, -60, -30); g.closePath(); g.fillStyle = '#F5F3EE'; g.fill(); g.strokeStyle = INK; g.lineWidth = 4; g.stroke(); txt(g, 'shh…', 2, -30, F.hero(36), INK); };
  const dollar = (g) => { RR(g, -64, -34, 128, 68, 6, '#cfe6c9', INK, 4); E(g, 0, 0, 22, 22, '#9fc9a0', INK, 3); txt(g, '$', 0, 2, F.hero(30), '#2f6f4e'); g.strokeStyle = '#2f6f4e'; g.lineWidth = 3; g.strokeRect(-56, -26, 112, 52); };
  const wave = (g) => { RR(g, -60, -40, 120, 80, 14, '#F5F3EE', INK, 4); g.strokeStyle = '#E0281E'; g.lineWidth = 8; g.lineCap = 'round'; for (let i = -4; i <= 4; i++) { const h = 8 + 26 * Math.abs(Math.sin(i * 1.3)); g.beginPath(); g.moveTo(i * 12, -h); g.lineTo(i * 12, h); g.stroke(); } };
  const clockIcon = (g) => { E(g, 0, 0, 58, 58, '#F5F3EE', INK, 5); g.strokeStyle = INK; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.moveTo(0, 0); g.lineTo(0, -34); g.moveTo(0, 0); g.lineTo(24, 10); g.stroke(); E(g, 0, 0, 6, 6, '#E0281E'); };
  const scales = (g) => { g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.moveTo(0, 50); g.lineTo(0, -40); g.moveTo(-50, -30); g.lineTo(50, -30); g.stroke(); for (const q of [-1, 1]) { g.beginPath(); g.moveTo(q * 50, -30); g.lineTo(q * 30, 10); g.lineTo(q * 70, 10); g.closePath(); g.fillStyle = '#F2B705'; g.fill(); g.stroke(); } };
  B.extraIcons = Object.assign(B.extraIcons || {}, { armtruck, mask, capicon, shoe, rope, bundle, whisper, dollar, wave, clockIcon, scales });

  // ---- bigclock: sweeping clock; label A until p.flipAt, then label B in red with a hit
  B.register('bigclock', {
    defaults: { w: 560, h: 560, a: '6 YEARS', b: '< 1 WEEK LEFT', flipAt: 99999, speed: 2.4 }, size: p => [p.w, p.h], ownEnter: true,
    anchors: p => ({ face: [0, -20, p.w * 0.8, p.w * 0.8], label: [0, p.h / 2 - 70, p.w, 110] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, k = pop(lt, 'heavy'); g.save(); g.translate(0, (1 - k) * -240); g.globalAlpha *= clamp(lt / 0.08 + 0.3); paper(g, -w / 2, -h / 2, w, h, 26, { lift });
      const flipped = t >= p.flipAt, r = w * 0.34; g.save(); g.translate(0, -h * 0.07); E(g, 0, 0, r, r, '#F5F3EE', INK, 8); for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; g.strokeStyle = INK; g.lineWidth = i % 3 ? 4 : 8; g.beginPath(); g.moveTo(Math.cos(a) * r * 0.86, Math.sin(a) * r * 0.86); g.lineTo(Math.cos(a) * r * 0.97, Math.sin(a) * r * 0.97); g.stroke(); }
      const ang = flipped ? -Math.PI / 2 + 0.08 * Math.sin((t - p.flipAt) * 30) * Math.max(0, 1 - (t - p.flipAt)) : t * p.speed; g.strokeStyle = flipped ? theme.badInk : INK; g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); g.moveTo(0, 0); g.lineTo(Math.cos(ang) * r * 0.78, Math.sin(ang) * r * 0.78); g.stroke(); g.lineWidth = 12; g.beginPath(); g.moveTo(0, 0); g.lineTo(Math.cos(t * p.speed / 12 - 1) * r * 0.5, Math.sin(t * p.speed / 12 - 1) * r * 0.5); g.stroke(); E(g, 0, 0, 12, 12, theme.badInk); g.restore();
      const s = flipped ? 1 + 0.2 * hit(t - p.flipAt, 9) : 1; g.save(); g.translate(0, h / 2 - 56); g.scale(s, s); txt(g, flipped ? p.b : p.a, 0, 0, F.hero(flipped ? 60 : 80), flipped ? theme.badInk : theme.ink); g.restore();
      if (flipped) burst(g, 0, -h * 0.07, r * 1.1, theme.badInk, t - p.flipAt, 14, 0.5); g.restore();
    },
  });
  // ---- deadends: simplified street grid; pins that dead-end with red X's multiplying from p.at
  B.register('deadends', {
    defaults: { w: 860, h: 700, at: 0, head: 'BOSTON · THE CHASE', n: 14 }, size: p => [p.w, p.h], ownEnter: true,
    anchors: p => ({ map: [0, 40, p.w * 0.92, p.h * 0.7] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, k = pop(lt, 'snappy'); g.save(); g.scale(0.92 + 0.08 * k, 0.92 + 0.08 * k); g.globalAlpha *= clamp(lt / 0.1 + 0.2); paper(g, -w / 2, -h / 2, w, h, 22, { lift, fill: '#e8e2cf' });
      g.save(); rr(g, -w / 2, -h / 2, w, h, 22); g.clip(); g.fillStyle = theme.navy; g.fillRect(-w / 2, -h / 2, w, 100); g.strokeStyle = '#b9b29b'; g.lineWidth = 14; for (let i = 0; i < 6; i++) { g.beginPath(); g.moveTo(-w / 2, -h / 2 + 170 + i * 100); g.lineTo(w / 2, -h / 2 + 150 + i * 100 + (i % 2) * 24); g.stroke(); } for (let i = 0; i < 7; i++) { g.beginPath(); g.moveTo(-w / 2 + 70 + i * 120, -h / 2 + 100); g.lineTo(-w / 2 + 40 + i * 120 + (i % 3) * 30, h / 2); g.stroke(); } g.fillStyle = '#9ac5de'; g.beginPath(); g.ellipse(w / 2 - 80, h / 2 - 40, 170, 90, 0.3, 0, 7); g.fill(); g.restore();
      txt(g, p.head, 0, -h / 2 + 52, F.hero(52), theme.paper);
      for (let i = 0; i < p.n; i++) { const at = p.at + i * 0.17, o = t - at; if (o < 0) continue; const x = -w / 2 + 90 + hash(i * 3.7) * (w - 180), y = -h / 2 + 170 + hash(i * 9.1) * (h - 260), u = pop(o, 'bouncy'); g.save(); g.translate(x, y); g.scale(u, u); g.strokeStyle = '#E0281E'; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); g.moveTo(-18, -18); g.lineTo(18, 18); g.moveTo(18, -18); g.lineTo(-18, 18); g.stroke(); g.restore(); }
      g.restore();
    },
  });
  // ---- yearstrip: 1950 -> 1956 bar fills; ticks per year
  B.register('yearstrip', {
    defaults: { w: 900, h: 360, at: 0, dur: 2.0, from: 1950, to: 1956, head: 'THE PLAN: STAY QUIET' }, size: p => [p.w, p.h], ownEnter: true,
    anchors: p => ({ bar: [0, 20, p.w * 0.9, 120] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, k = pop(lt, 'snappy'); g.save(); g.scale(0.92 + 0.08 * k, 0.92 + 0.08 * k); g.globalAlpha *= clamp(lt / 0.1 + 0.2); paper(g, -w / 2, -h / 2, w, h, 22, { lift });
      g.save(); rr(g, -w / 2, -h / 2, w, h, 22); g.clip(); g.fillStyle = theme.navy; g.fillRect(-w / 2, -h / 2, w, 90); g.restore(); txt(g, p.head, 0, -h / 2 + 46, F.hero(50), theme.paper);
      const u = ease.inOut(clamp(lin(t, p.at, p.at + p.dur))), x0 = -w / 2 + 70, x1 = w / 2 - 70, y = 40; g.fillStyle = theme.paperShade; rr(g, x0, y - 24, x1 - x0, 48, 12); g.fill(); g.fillStyle = theme.badInk; rr(g, x0, y - 24, (x1 - x0) * u, 48, 12); g.fill();
      for (let i = 0; i <= p.to - p.from; i++) { const x = lerp(x0, x1, i / (p.to - p.from)); g.fillStyle = theme.ink; g.fillRect(x - 2, y + 30, 4, 18); txt(g, String(p.from + i), x, y + 76, F.monoX(24), theme.ink); }
      g.restore();
    },
  });
})();
