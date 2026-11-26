// roulette props (generic wheel: no casino branding)
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, burst, hash, hit, roll, countAt } = B;
  const INK = '#1b2028';
  const pop = (t, o = 'snappy') => clamp(spring(Math.max(0, t), o), 0, 1.25);
  const E = (g, x, y, rx, ry, c, st, lw) => { g.beginPath(); g.ellipse(x, y, rx, ry, 0, 0, 7); g.fillStyle = c; g.fill(); if (st) { g.strokeStyle = st; g.lineWidth = lw || 4; g.stroke(); } };
  const RR = (g, x, y, w, h, r, c, st, lw) => { g.beginPath(); g.roundRect(x, y, w, h, r); g.fillStyle = c; g.fill(); if (st) { g.strokeStyle = st; g.lineWidth = lw || 4; g.stroke(); } };
  const chip = (g) => { E(g, 0, 0, 50, 50, '#E0281E', INK, 5); g.strokeStyle = '#F5F3EE'; g.lineWidth = 8; g.setLineDash([12, 12]); g.beginPath(); g.arc(0, 0, 40, 0, 7); g.stroke(); g.setLineDash([]); E(g, 0, 0, 26, 26, '#F5F3EE', INK, 3); txt(g, '$1', 0, 2, F.hero(26), INK); };
  const coinflip = (g) => { g.save(); g.rotate(-0.15); E(g, 0, 0, 54, 54, '#F2B705', INK, 5); E(g, 0, 0, 40, 40, '#f7c93a', '#b88700', 3); txt(g, '?', 0, 3, F.hero(54), '#8a6a10'); g.restore(); };
  const dollar = (g) => { RR(g, -64, -34, 128, 68, 6, '#cfe6c9', INK, 4); E(g, 0, 0, 22, 22, '#9fc9a0', INK, 3); txt(g, '$', 0, 2, F.hero(30), '#2f6f4e'); g.strokeStyle = '#2f6f4e'; g.lineWidth = 3; g.strokeRect(-56, -26, 112, 52); };
  const stack = (g) => { for (let i = 0; i < 5; i++) { E(g, 0, 36 - i * 16, 46, 16, i % 2 ? '#E0281E' : '#2c3e66', INK, 3); } };
  const player = (g, col, s) => { g.fillStyle = col; g.beginPath(); g.arc(0, -s * 0.5, s * 0.34, 0, 7); g.fill(); g.beginPath(); g.moveTo(-s * 0.5, s * 0.5); g.quadraticCurveTo(-s * 0.5, -s * 0.05, 0, -s * 0.1); g.quadraticCurveTo(s * 0.5, -s * 0.05, s * 0.5, s * 0.5); g.closePath(); g.fill(); };
  B.extraIcons = Object.assign(B.extraIcons || {}, { chip, coinflip, dollar, stack });

  // ---- wheel: top-down; slots 38 (alternating red/black, green at 2 opposite); ticks to p.count from countAt; lights per colour; spinning until stopAt
  B.register('wheel', {
    defaults: { w: 520, count: 38, countAt: -1, countDur: 1.0, redAt: 99999, blackAt: 99999, greenAt: 99999, spin: 1.2, center: '' }, size: p => [p.w, p.w], ownEnter: true,
    anchors: p => ({ wheel: [0, 0, p.w * 0.9, p.w * 0.9] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, R = p.w / 2, k = pop(lt, 'heavy'); g.save(); g.scale(0.7 + 0.3 * k, 0.7 + 0.3 * k); g.globalAlpha *= clamp(lt / 0.08 + 0.3);
      B.shadowed(g, () => { g.beginPath(); g.arc(0, 0, R * 0.98, 0, 7); }, '#5a3a1e', lift); E(g, 0, 0, R * 0.98, R * 0.98, '#6b4423', INK, 6);
      const N = 38, n = p.countAt < 0 ? N : Math.round(ease.out(clamp((t - p.countAt) / p.countDur)) * N), rot = t * p.spin; g.save(); g.rotate(rot);
      for (let i = 0; i < N; i++) { const a0 = i / N * Math.PI * 2, a1 = (i + 1) / N * Math.PI * 2; const green = i === 0 || i === 19, red = !green && i % 2 === 1; const col = green ? '#1f9a52' : red ? '#d9362b' : '#1b2028'; const on = i < n; g.beginPath(); g.moveTo(0, 0); g.arc(0, 0, R * 0.9, a0, a1); g.closePath(); g.fillStyle = on ? col : '#3a2a1a'; g.fill(); g.strokeStyle = '#d9c9a0'; g.lineWidth = 2; g.stroke();
        const lit = (green && t >= p.greenAt) || (red && t >= p.redAt) || (!green && !red && t >= p.blackAt); if (lit && on) { const f = 0.5 + 0.5 * Math.sin((t - (green ? p.greenAt : red ? p.redAt : p.blackAt)) * 12); g.fillStyle = 'rgba(255,255,255,' + (0.18 + 0.3 * f * (t - (green ? p.greenAt : red ? p.redAt : p.blackAt) < 1.2 ? 1 : 0.2)) + ')'; g.fill(); } }
      g.restore(); E(g, 0, 0, R * 0.52, R * 0.52, '#8a5a2b', INK, 5); E(g, 0, 0, R * 0.4, R * 0.4, '#b07a3c', '#6b4423', 4); for (let i = 0; i < 4; i++) { const a = rot * 0.5 + i * Math.PI / 2; g.strokeStyle = '#e8d9a8'; g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); g.moveTo(Math.cos(a) * R * 0.08, Math.sin(a) * R * 0.08); g.lineTo(Math.cos(a) * R * 0.36, Math.sin(a) * R * 0.36); g.stroke(); } E(g, 0, 0, R * 0.09, R * 0.09, '#e8d9a8', INK, 3);
      const ba = -rot * 1.4 + 1; E(g, Math.cos(ba) * R * 0.78, Math.sin(ba) * R * 0.78, 9, 9, '#F5F3EE', INK, 2);
      g.fillStyle = 'rgba(11,15,20,.8)'; const cnt = String(n); if (p.countAt >= 0 || p.center) { g.save(); g.translate(0, R * 1.08); RR(g, -90, -26, 180, 52, 10, 'rgba(11,15,20,.85)'); txt(g, p.center || (cnt + ' SLOTS'), 0, 2, F.hero(34), '#F5F3EE'); g.restore(); }
      g.restore();
    },
  });
  // ---- crowd: N dots; pct (gold = ahead) interpolates through stages [{at,pct}] with stable ranking
  B.register('crowd', {
    defaults: { w: 920, h: 780, cols: 25, rows: 16, stages: [{ at: 0, pct: 1 }], head: 'PLAYERS', ahead: 'AHEAD', behind: 'BEHIND' }, size: p => [p.w, p.h], ownEnter: true,
    anchors: p => ({ crowd: [0, 30, p.w * 0.9, p.h * 0.7] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, k = pop(lt, 'snappy'); g.save(); g.scale(0.92 + 0.08 * k, 0.92 + 0.08 * k); g.globalAlpha *= clamp(lt / 0.1 + 0.2); paper(g, -w / 2, -h / 2, w, h, 22, { lift });
      g.save(); rr(g, -w / 2, -h / 2, w, h, 22); g.clip(); g.fillStyle = theme.navy; g.fillRect(-w / 2, -h / 2, w, 100); g.restore(); txt(g, p.head, 0, -h / 2 + 52, F.hero(52), theme.paper);
      let pct = p.stages[0].pct; for (let i = 1; i < p.stages.length; i++) { const a = p.stages[i - 1], b = p.stages[i]; if (t >= b.at) pct = b.pct; else if (t > a.at && t < b.at && false) pct = a.pct; }
      for (let i = p.stages.length - 1; i > 0; i--) { const a = p.stages[i - 1], b = p.stages[i]; if (t >= b.at - 0.01 && t < b.at + 0.6) { pct = lerp(a.pct, b.pct, ease.out(clamp((t - b.at) / 0.6))); break; } }
      const N = p.cols * p.rows, cw = (w - 100) / p.cols, ch = (h - 250) / p.rows, gx = -w / 2 + 50, gy = -h / 2 + 140, s = Math.min(cw, ch) * 0.95;
      const gold = Math.round(pct * N); const rank = Array.from({ length: N }, (_, i) => ({ i, r: hash(i * 7.31 + 3) })).sort((a, b) => a.r - b.r); const isGold = new Array(N).fill(false); for (let j = 0; j < gold; j++) isGold[rank[j].i] = true;
      for (let i = 0; i < N; i++) { g.save(); g.translate(gx + (i % p.cols + 0.5) * cw, gy + (Math.floor(i / p.cols) + 0.6) * ch); player(g, isGold[i] ? '#F2B705' : '#aab1bd', s); g.restore(); }
      const o = { font: F.hero(100), size: 100, color: theme.ink, suffix: '%', decimals: 1 }; if (pct >= 0.999) txt(g, 'EVERYONE STARTS EVEN', 0, h / 2 - 64, F.hero(54), theme.inkSoft); else txt(g, (pct * 100).toFixed(1) + '% ' + p.ahead, 0, h / 2 - 64, F.hero(80), '#b88700');
      g.restore();
    },
  });
  // ---- classrow: 22 kids, one gold at p.at (21 grey)
  B.register('classrow', {
    defaults: { w: 900, h: 300, n: 22, at: 99999, head: 'A CLASS OF 22' }, size: p => [p.w, p.h], ownEnter: true,
    anchors: p => ({ gold: [p.w * 0.35, 20, 130, 200], row: [0, 20, p.w * 0.95, 200] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, k = pop(lt, 'snappy'); g.save(); g.scale(0.92 + 0.08 * k, 0.92 + 0.08 * k); g.globalAlpha *= clamp(lt / 0.1 + 0.2); paper(g, -w / 2, -h / 2, w, h, 20, { lift });
      txt(g, p.head, 0, -h / 2 + 34, F.hero(36), theme.ink); const s = Math.min(70, (w - 60) / p.n * 1.25), cw = (w - 60) / p.n;
      for (let i = 0; i < p.n; i++) { const gold = i === 7, on = t >= p.at; g.save(); g.translate(-w / 2 + 30 + (i + 0.5) * cw, 24); const j = gold && on ? -26 * ease.out(clamp((t - p.at) / 0.3)) : 0; g.translate(0, j); const sc = gold && on ? 1.35 : 1; g.scale(sc, sc); player(g, gold && on ? '#F2B705' : '#aab1bd', s); g.restore(); }
      g.restore();
    },
  });
})();
