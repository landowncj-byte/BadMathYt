  // ---------- shared bits ----------
  const bill = (g, x, y, w, h, lab) => { clay(g, x, y, w, h, 10, '#1FA366', { shadowK: 0.5 }); g.strokeStyle = 'rgba(245,243,238,.7)'; g.lineWidth = 3; rr(g, x + 8, y + 8, w - 16, h - 16, 6); g.stroke(); g.fillStyle = 'rgba(245,243,238,.9)'; g.beginPath(); g.arc(x + w / 2, y + h / 2, h * 0.3, 0, 7); g.fill(); txt(g, lab, x + w / 2, y + h / 2 + 2, F.hero(h * 0.3), '#0B0F14'); };
  const pk = (t, at, o = 'bouncy') => Math.min(1.1, spring(t - at, o));
  const sub = (g, s, x, y, col, size = 24, al = 'center') => txt(g, s, x, y, F.monoX(size), col, al);
  const bottomChip = (g, S, t, th) => { let ch = null; for (const c of (S.chips || (S.chip ? [S.chip] : []))) if (t >= c.at) ch = c; if (ch && !(S.chipOut && t >= S.chipOut)) chip(g, ch.text, 540, ch.y || 1062, ch.tone || 'ink', th, ch.size || 38, 900, spring(t - ch.at, 'bouncy')); };
  const tagsOf = (g, S, t, th) => { for (const nt of S.tags || []) if (t >= nt.at && (!nt.out || t < nt.out)) chip(g, nt.text, 540, nt.y || 640, nt.tone || 'ink', th, nt.size || 38, 900, spring(t - nt.at, 'bouncy')); };
  const bundle = (g, x, y, w, h) => { clay(g, x, y, w, h, 8, '#1FA366', { shadowK: 0.4 }); g.fillStyle = 'rgba(245,243,238,.9)'; g.fillRect(x + w * 0.4, y + 2, w * 0.2, h - 4); txt(g, '$', x + w * 0.5, y + h * 0.54, F.hero(h * 0.5), '#0B0F14'); g.fillStyle = 'rgba(0,0,0,.15)'; g.fillRect(x, y + h - 5, w, 3); };
  // the million: a pyramid of 10 banded bundles (4-3-2-1) with its base at baseY
  function brick(g, cx, baseY, s, vis) {
    const w = 104 * s, h = 54 * s; let i = 0; for (let r = 0; r < 4; r++) { const n = 4 - r; for (let c = 0; c < n; c++, i++) { if (vis != null && i >= vis) continue; bundle(g, cx - n * w / 2 + c * w + 1, baseY - (r + 1) * h, w - 2, h - 2); } }
  }
  function car(g, x, y, s, k, col) { g.save(); g.translate(x, y); g.scale(s * k, s * k); g.fillStyle = col || '#2c3e66'; g.beginPath(); g.moveTo(-90, 0); g.lineTo(-86, -34); g.quadraticCurveTo(-60, -40, -44, -66); g.lineTo(34, -66); g.quadraticCurveTo(58, -42, 84, -34); g.lineTo(92, 0); g.closePath(); g.fill(); g.strokeStyle = '#0B0F14'; g.lineWidth = 4; g.stroke(); g.fillStyle = '#9ad7ff'; g.beginPath(); g.moveTo(-36, -58); g.lineTo(-24, -34); g.lineTo(-4, -34); g.lineTo(-4, -58); g.closePath(); g.moveTo(8, -58); g.lineTo(8, -34); g.lineTo(52, -34); g.lineTo(36, -58); g.closePath(); g.fill(); for (const wx of [-52, 52]) { g.fillStyle = '#0B0F14'; g.beginPath(); g.arc(wx, 4, 20, 0, 7); g.fill(); g.fillStyle = '#c9ccd2'; g.beginPath(); g.arc(wx, 4, 9, 0, 7); g.fill(); } g.restore(); }
  const sun = (g, x, y, r, t) => { g.save(); g.translate(x, y); g.rotate(t * 0.5); g.strokeStyle = '#F2B705'; g.lineWidth = 7; g.lineCap = 'round'; for (let i = 0; i < 10; i++) { const a = i / 10 * 6.2832; g.beginPath(); g.moveTo(Math.cos(a) * r * 1.3, Math.sin(a) * r * 1.3); g.lineTo(Math.cos(a) * r * 1.75, Math.sin(a) * r * 1.75); g.stroke(); } g.fillStyle = '#FFD60A'; g.beginPath(); g.arc(0, 0, r, 0, 7); g.fill(); g.strokeStyle = '#0B0F14'; g.lineWidth = 4; g.stroke(); g.restore(); };
  const dayAt = (t, p) => Math.max(0, xAt(t, p.K));
  const yrs = d => (d / 365).toFixed(1);
  // ---------- scenes ----------
  function piles(g, p, lt, t, th, S) {
    const cards = [[90, S.leftAt ?? -1, 0], [580, S.rightAt ?? -1, 1]];
    cards.forEach(([x0, at, i]) => { const st = at < 0, on = st ? 1 : t - at; if (on <= 0) return; const k = st ? 1 : Math.min(1.08, spring(on, 'bouncy')), picked = S.pick != null && t >= S.pick && i === 0, ps = picked ? 1 + 0.04 * Math.sin(Math.min(1, (t - S.pick) * 3) * 3.14) : 1, dim = S.dimLeft && i === 0 && t >= S.dimLeft;
      g.save(); g.translate(x0 + 205, 800 + (1 - Math.min(1, k)) * 60); g.scale((0.85 + 0.15 * k) * ps, (0.85 + 0.15 * k) * ps); g.globalAlpha *= st ? 1 : clamp(on / 0.07); if (dim) g.globalAlpha *= 0.55;
      paper(g, -205, -215, 410, 430, 22, { lift: 0.5 }); if (picked) { g.strokeStyle = th.accent; g.lineWidth = 9; rr(g, -205, -215, 410, 430, 22); g.stroke(); }
      if (i === 0) { g.save(); g.translate(0, 20); brick(g, 0, 80, 1.15); g.restore(); txt(g, '$1,000,000', 0, 120, F.hero(66), '#0B0F14'); txt(g, 'CASH · TODAY', 0, 176, F.monoX(22), '#59606B'); }
      else { sun(g, 120, -150, 24, t); g.save(); g.translate(-8, -30); g.rotate(-0.08 + 0.02 * Math.sin(t * 2)); bill(g, -125, -52, 250, 104, '$100'); g.restore(); txt(g, '$100 A DAY', 0, 112, F.hero(66), '#0B0F14'); txt(g, 'EVERY SINGLE DAY', 0, 176, F.monoX(22), '#59606B'); }
      g.restore(); });
    if (S.orAt != null && t >= S.orAt) { const k = Math.min(1.1, spring(t - S.orAt, 'bouncy')); g.save(); g.translate(540, 800); g.scale(k, k); g.fillStyle = '#0B0F14'; g.beginPath(); g.arc(0, 0, 46, 0, 7); g.fill(); g.strokeStyle = th.accent; g.lineWidth = 5; g.stroke(); txt(g, 'OR', 0, 3, F.hero(44), th.accent); g.restore(); }
    tagsOf(g, S, t, th); bottomChip(g, S, t, th);
  }
  function drip(g, p, lt, t, th, S) {
    const D = dayAt(t, p), n = Math.floor(D + 1e-6), f = D - n, k = pk(lt, 0);
    g.save(); g.translate(300, 830); g.scale(0.9 + 0.1 * Math.min(1, k), 0.9 + 0.1 * Math.min(1, k)); paper(g, -190, -200, 380, 400, 20, { lift: 0.5 }); g.fillStyle = th.bad; rr(g, -190, -200, 380, 84, 20); g.fill(); txt(g, 'EVERY MORNING', 0, -158, F.hero(40), th.paper); txt(g, 'DAY', 0, -88, F.monoX(26), '#59606B'); txt(g, fmt(n), 0, 38, F.hero(fit(fmt(n), F.hero, 330, 160)), '#0B0F14'); txt(g, '+$100', 0, 150, F.hero(54), '#1FA366'); g.restore();
    const layers = Math.min(26, n), top = 1040 - layers * 15; g.save(); for (let i = 0; i < layers; i++) { g.save(); g.translate(790 + ((i % 3) - 1) * 4, 1040 - i * 15); g.rotate(((i % 5) - 2) * 0.012); bill(g, -150, -26, 300, 40, ''); g.restore(); }
    if (n < 400) { const u = ease.in(clamp(f / 0.9)), y = lerp(Math.max(640, top - 200), top - 18, u); g.save(); g.globalAlpha *= clamp(f / 0.1); g.translate(790, y); g.rotate(-0.15 + 0.15 * u); bill(g, -150, -40, 300, 80, '$100'); g.restore(); } g.restore();
    stk(g, '$' + fmt(100 * n), 790, top - 70 < 640 ? 640 : top - 70, F.hero(64), th.good, 'center', 10);
    bottomChip(g, S, t, th);
  }
  function rent(g, p, lt, t, th, S) {
    const k = pk(lt, 0); g.save(); g.translate(540, 760); g.scale(0.85 + 0.15 * Math.min(1, k), 0.85 + 0.15 * Math.min(1, k));
    const v = Math.round(3042 * ease.out(clamp((t - S.numAt) / 0.9))); stk(g, t >= S.numAt - 0.1 ? '$' + fmt(v) : '$100 × 30', 0, 0, F.hero(fit('$3,042', F.hero, 700, 190)), th.good, 'center', 16); sub(g, '$100 A DAY · PER MONTH', 0, 112, th.paper, 26); g.restore();
    // house + basket
    const h0 = S.rentAt != null ? t - S.rentAt : -1; if (h0 > 0) { const kk = pk(t, S.rentAt); g.save(); g.translate(310, 960); g.scale(kk, kk); paper(g, -190, -90, 380, 190, 18, { lift: 0.4 }); g.save(); g.translate(-90, 6); g.fillStyle = '#E8590C'; g.beginPath(); g.moveTo(-60, -10); g.lineTo(0, -66); g.lineTo(60, -10); g.closePath(); g.fill(); g.strokeStyle = '#0B0F14'; g.lineWidth = 4; g.stroke(); g.fillStyle = '#F5E6C8'; g.fillRect(-46, -10, 92, 66); g.strokeRect(-46, -10, 92, 66); g.fillStyle = '#7a3b1d'; g.fillRect(-12, 14, 24, 42); g.restore(); txt(g, 'RENT', 70, -8, F.hero(60), '#0B0F14'); sub(g, 'PAID', 70, 40, '#59606B', 22); g.restore(); }
    const g0 = S.grocAt != null ? t - S.grocAt : -1; if (g0 > 0) { const kk = pk(t, S.grocAt); g.save(); g.translate(770, 960); g.scale(kk, kk); paper(g, -190, -90, 380, 190, 18, { lift: 0.4 }); g.save(); g.translate(-96, 10); g.fillStyle = '#D9A441'; g.beginPath(); g.moveTo(-54, -20); g.lineTo(54, -20); g.lineTo(42, 52); g.lineTo(-42, 52); g.closePath(); g.fill(); g.strokeStyle = '#0B0F14'; g.lineWidth = 4; g.stroke(); g.strokeStyle = '#0B0F14'; g.beginPath(); g.arc(0, -20, 34, 3.14, 0); g.stroke(); g.fillStyle = '#d9422f'; g.beginPath(); g.arc(-16, -30, 15, 0, 7); g.fill(); g.fillStyle = '#6dbf3a'; g.beginPath(); g.arc(18, -34, 14, 0, 7); g.fill(); g.restore(); txt(g, 'GROCERIES', 66, -8, F.hero(40), '#0B0F14'); sub(g, 'COVERED', 66, 40, '#59606B', 22); g.restore(); }
    bottomChip(g, S, t, th);
  }
  function year(g, p, lt, t, th, S) {
    const n = S.n || 1, u = ease.inOut(clamp((t - S.at) / (S.dur || 1.6))), tot = 36500 * n, v = Math.round(tot * u);
    sub(g, n === 1 ? 'ONE YEAR · 365 DAYS · $100 EACH' : 'TEN YEARS · 3,650 DAYS', 540, 622, th.paper, 26);
    if (n === 1) { const cols = 30, P = 19, x0 = 540 - cols * P / 2, y0 = 650; for (let i = 0; i < 365; i++) { const c = i % cols, r = Math.floor(i / cols), lit = i < 365 * u; g.fillStyle = lit ? '#1FA366' : 'rgba(245,243,238,.16)'; g.beginPath(); g.arc(x0 + (c + 0.5) * P, y0 + (r + 0.5) * P, lit ? 7 : 5, 0, 7); g.fill(); } }
    else { for (let i = 0; i < 10; i++) { const c = i % 5, r = Math.floor(i / 5), x = 100 + c * 180, y = 650 + r * 96, q = clamp(u * 10 - i); clay(g, x, y, 168, 82, 14, 'rgba(245,243,238,.14)', { shadowK: 0 }); if (q > 0) { g.save(); rr(g, x, y, 168, 82, 14); g.clip(); g.fillStyle = '#1FA366'; g.fillRect(x, y, 168 * q, 82); g.restore(); } txt(g, 'YEAR ' + (i + 1), x + 84, y + 41, F.hero(30), q > 0.5 ? '#0B0F14' : th.paper); } }
    stk(g, '$' + fmt(v), 540, n === 1 ? 960 : 910, F.hero(120), th.good, 'center', 14);
    // against the million
    const by = n === 1 ? 1016 : 1000, bw = 780, bx = 150; g.fillStyle = 'rgba(245,243,238,.16)'; rr(g, bx, by, bw, 28, 14); g.fill(); g.fillStyle = th.gold; rr(g, bx, by, Math.max(28, bw * tot / 1e6 * u), 28, 14); g.fill(); sub(g, '$1,000,000', bx + bw, by + 52, th.paper, 22, 'right'); sub(g, 'YOUR PILE', bx, by + 52, th.gold, 22, 'left');
    bottomChip(g, S, t, th);
  }
  function race(g, p, lt, t, th, S) {
    const D = dayAt(t, p), pile = 100 * D, max = Math.max(1e6, pile * 1.04), x0 = 90, W = 900, caught = S.catchAt != null && t >= S.catchAt, k = pk(lt, 0);
    const bar = (y, lab, val, col, txCol, str) => { sub(g, lab, x0, y - 30, th.paper, 24, 'left'); g.fillStyle = 'rgba(245,243,238,.12)'; rr(g, x0, y, W, 84, 20); g.fill(); const w = Math.max(16, W * val / max); clay(g, x0, y, w, 84, 20, col, { shadowK: 0.4 }); const inside = w > 440; txt(g, str, inside ? x0 + w - 22 : x0 + w + 20, y + 44, F.hero(60), inside ? '#0B0F14' : th.paper, inside ? 'right' : 'left'); };
    g.save(); g.globalAlpha *= clamp(k * 2); bar(722, 'OPTION A · THE MILLION', 1e6, th.gold, '#0B0F14', '$1,000,000'); bar(850, 'OPTION B · $100 A DAY', pile, caught ? th.good : '#1FA366', '#0B0F14', '$' + fmt(Math.round(pile))); g.restore();
    stk(g, 'DAY ' + fmt(Math.round(D)), 540, 985, F.hero(fit('DAY 20,000', F.hero, 560, 80)), caught ? th.good : th.paper, 'center', 12); sub(g, '= ' + yrs(D) + ' YEARS OF CHECKS', 540, 1036, th.paper, 24);
    if (caught) { const o = t - S.catchAt; for (let q = 0; q < 2; q++) { const u = ((o * 1.1 + q / 2) % 1); g.strokeStyle = 'rgba(0,210,106,' + (1 - u) * 0.9 + ')'; g.lineWidth = 6; rr(g, x0 - u * 14, 850 - u * 14, W + u * 28, 84 + u * 28, 20 + u * 10); g.stroke(); } if (o < 0.5) burst(g, x0 + W * 0.97 * (1e6 / max), 892, 220, th.good, o - 0.02, 14, 0.4); if (S.catchStamp !== false) { g.save(); g.translate(540, 626); stamp(g, 'CAUGHT UP · DAY 10,000', 0, 0, 'good', th, 50, -0.03, pk(t, S.catchAt)); g.restore(); } }
    tagsOf(g, S, t, th); bottomChip(g, S, t, th);
  }
  function years27(g, p, lt, t, th, S) {
    const u = ease.inOut(clamp((t - S.at) / (S.dur || 2))), n = 27.4 * u; sub(g, '10,000 DAYS ÷ 365 = 27.4 YEARS', 540, 628, th.paper, 28);
    for (let i = 0; i < 28; i++) { const c = i % 7, r = Math.floor(i / 7), x = 150 + c * 118, y = 640 + r * 72, q = clamp(n - i), part = i === 27; if (!part || q > 0 || true) { clay(g, x, y, 106, 60, 14, q > 0 ? (part ? th.good : '#E8590C') : 'rgba(245,243,238,.12)', { shadowK: q > 0 ? 0.4 : 0 }); if (part) { g.fillStyle = 'rgba(11,15,20,.55)'; rr(g, x + 106 * 0.4, y, 106 * 0.6, 60, 14); g.fill(); } txt(g, 'Y' + (i + 1), x + 53, y + 30, F.hero(34), q > 0 ? '#0B0F14' : 'rgba(245,243,238,.55)'); } }
    stk(g, n.toFixed(1) + ' YEARS', 540, 985, F.hero(80), th.accent, 'center', 12);
    bottomChip(g, S, t, th);
  }
  function blow(g, p, lt, t, th, S) {
    const u = clamp((t - S.at) / (S.dur || 1.2)), vis = Math.ceil(10 * (1 - u)), k = pk(lt, 0);
    g.save(); g.globalAlpha *= clamp(k * 2); g.save(); g.translate(0, 0); brick(g, 330, 960, 1.55, vis); g.restore();
    for (let i = 0; i < 10; i++) { const a = S.at + i * (S.dur || 1.2) / 10, o = t - a; if (o > 0 && o < 0.9) { const w = o / 0.9; g.save(); g.globalAlpha *= 1 - w; g.translate(330 + w * 520, 800 - Math.sin(w * 3.14) * 150 + w * 200); g.rotate(w * 5); bill(g, -60, -28, 120, 56, '$'); g.restore(); } }
    if (S.cars) { S.cars.forEach((c, i) => { const o = t - c; if (o <= 0) return; const kk = pk(t, c, 'snappy'); g.save(); g.translate(660 + (1 - Math.min(1, kk)) * 260 + (i % 2) * 60, 840 + i * 70); car(g, 0, 0, 0.8, 1, ['#d9422f', '#2c3e66', '#F2B705'][i % 3]); g.restore(); }); }
    g.restore(); stk(g, '$' + fmt(Math.round(1e6 * (1 - ease.inOut(u)))), 540, 650, F.hero(110), u > 0.98 ? th.bad : th.good, 'center', 14);
    bottomChip(g, S, t, th);
  }
  function life(g, p, lt, t, th, S) {
    const px = a => 110 + (a - 20) / 75 * 860, k = pk(lt, 0); g.save(); g.globalAlpha *= clamp(k * 2);
    sub(g, S.head || 'THE DAILY MONEY NEEDS 27.4 YEARS TO CATCH UP', 540, 612, th.gold, 24); sub(g, '◆ = WHERE YOUR PILE PASSES $1,000,000', 540, 640, th.paper, 18);
    g.strokeStyle = 'rgba(245,243,238,.55)'; g.lineWidth = 4; g.beginPath(); g.moveTo(px(20), 1008); g.lineTo(px(95), 1008); g.stroke(); for (const a of [25, 40, 60, 80]) { g.beginPath(); g.moveTo(px(a), 996); g.lineTo(px(a), 1020); g.stroke(); sub(g, 'AGE ' + a, px(a), 1046, a === 80 ? th.bad : th.paper, 22); }
    g.setLineDash([10, 10]); g.strokeStyle = th.bad; g.lineWidth = 4; g.beginPath(); g.moveTo(px(80), 664); g.lineTo(px(80), 1000); g.stroke(); g.setLineDash([]); sub(g, 'AGE 80', px(80), 660, th.bad, 20);
    (S.rows || []).forEach((r, i) => { const y = 706 + i * 100, st = r.at < 0, on = st ? 99 : t - r.at; if (on < -0.0001) return; const u = st ? 1 : ease.out(clamp(on / (r.dur || 1.3))), x0 = px(r.age), x1 = x0 + (px(80) - x0) * u, win = r.win, res = r.resAt != null ? t >= r.resAt : st;
      g.save(); g.globalAlpha *= st ? 1 : clamp(on / 0.1); clay(g, x0, y, Math.max(20, x1 - x0), 56, 16, res ? (win ? th.good : th.bad) : th.gold, { shadowK: 0.4 }); B.you(g, x0 - 34, y + 38, 0.2, res ? (win ? 'happy' : 'angry') : 'neutral', t);
      sub(g, 'AGE ' + r.age + ' → 80 · ' + (80 - r.age) + ' YEARS', x0, y - 18, th.paper, 22, 'left'); if (res) { g.save(); const kk = st ? 1 : pk(t, r.resAt); g.translate(990, y - 18); g.scale(kk, kk); txt(g, win ? 'WINS' : 'LOSES', 0, 0, F.monoX(22), win ? th.good : th.bad, 'right'); g.restore(); }
      const cx = px(r.age + 27.4); g.save(); g.translate(cx, y + 28); g.rotate(0.785); if (x1 >= cx || r.age + 27.4 > 80) { g.fillStyle = r.age + 27.4 > 80 ? 'rgba(11,15,20,.0)' : '#0B0F14'; g.strokeStyle = r.age + 27.4 > 80 ? th.bad : th.gold; g.lineWidth = 4; g.fillRect(-11, -11, 22, 22); g.strokeRect(-11, -11, 22, 22); } g.restore(); 
      const v = Math.round(r.total * ease.out(clamp((t - (r.numAt ?? r.at)) / 0.9))); if (x1 - x0 > 190) txt(g, '$' + fmt(st ? r.total : v), x0 + 20, y + 30, F.hero(42), '#0B0F14', 'left'); g.restore(); });
    g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th);
  }
  function vs(g, p, lt, t, th, S) {
    const base = 985, MH = 320, mx = S.max || 2.2e6, k = pk(lt, 0); const mil = 1e6;
    S.items.forEach((it, i) => { const x = i ? 770 : 310, on = t - it.at; if (on <= 0) return; const kk = Math.min(1.08, spring(on, 'bouncy')), u = ease.out(clamp(on / 0.9)), h = MH * it.val / mx * u, v = Math.round(it.val * u);
      g.save(); g.globalAlpha *= clamp(on / 0.08); clay(g, x - 130, base - Math.max(16, h), 260, Math.max(16, h), 16, it.col, { shadowK: 0.5 }); g.restore(); stk(g, '$' + fmt(v), x, base - Math.max(16, h) - 46, F.hero(fit('$2,007,500', F.hero, 330, 78)), it.col === th.bad ? th.bad : th.paper, 'center', 10); txt(g, it.label, x, base + 36, F.hero(34), th.paper); sub(g, it.sub, x, base + 68, th.gold, 20); });
    g.setLineDash([12, 10]); g.strokeStyle = th.paper; g.lineWidth = 4; g.beginPath(); g.moveTo(130, base - MH * mil / mx); g.lineTo(950, base - MH * mil / mx); g.stroke(); g.setLineDash([]);
    g.strokeStyle = 'rgba(245,243,238,.6)'; g.lineWidth = 4; g.beginPath(); g.moveTo(130, base); g.lineTo(950, base); g.stroke();
    if (S.gap && t >= S.gap.at) { const kk = pk(t, S.gap.at); g.save(); g.translate(540, 614); g.scale(kk, kk); stamp(g, S.gap.text, 0, 0, S.gap.tone || 'bad', th, 42, -0.03, kk); g.restore(); }
    tagsOf(g, S, t, th); bottomChip(g, { ...S, chips: (S.chips || []).map(c => ({ ...c, y: 1088 })) }, t, th);
  }
  function ask(g, p, lt, t, th, S) {
    const k = spring(lt, 'bouncy'); g.save(); g.translate(540, 800); g.scale(0.7 + 0.3 * Math.min(1.06, k), 0.7 + 0.3 * Math.min(1.06, k)); g.globalAlpha *= clamp(k * 2);
    const sz = Math.min(fit(S.l1, F.hero, 900, 112), fit(S.l2, F.hero, 900, 112)); stk(g, S.l1, 0, -62, F.hero(sz), th.accent, 'center', 16); stk(g, S.l2, 0, 62, F.hero(sz), th.good, 'center', 16); g.restore();
  }
  const SC = { piles, drip, rent, year, race, years27, blow, life, vs, ask };
  Object.assign(window.M5.h, { fit, stk, chip, stamp, label, mw, TONE });
  const val = (v, t, p) => { if (typeof v === 'string') { if (v === '~pile') return '$' + fmt(Math.round(100 * dayAt(t, p))); if (v === '~dayl') return 'THE PILE · DAY ' + fmt(Math.round(dayAt(t, p))); return v; } if (v && typeof v === 'object') { const u = ease.out(clamp((t - v.at) / (v.dur || 1))), x = lerp(v.from || 0, v.to, u); return (v.pre || '') + fmt(Math.round(x)) + (v.suf || ''); } return v; };
  B.register('mstage', {
    defaults: { K: [[0, 0]], C: [], scenes: [], hook: null, hideCounter: [], beats: [], notes: [] }, ownEnter: true, size: () => [1080, 1920],
    draw(g, p, env) {
      const { t, theme: th } = env; g.translate(-540, -960);
      let bl = ''; for (const b of p.beats) if (t >= b[0]) bl = b[1]; if (bl) { const k = spring(t - (p.beats.find(b => b[1] === bl)[0]), 'snappy'); g.save(); g.globalAlpha *= clamp(k * 2); label(g, bl, 990, 264, th.accent, 26, 'right'); g.restore(); }
      let seg = p.C[0]; for (const s of p.C) if (t >= s.from) seg = s; const hid = p.hideCounter.some(([a, b]) => t >= a && t < b), segT = t - seg.from, pop = 1 + 0.05 * hit(Math.min(0.5, Math.max(0, segT)), 8);
      if (!hid) {
        g.save(); g.translate(540, 437); g.scale(pop, pop); g.translate(-540, -437); paper(g, 70, 322, 940, 230, 26, { lift: 0.3 });
        const L = [val(seg.L[0], t, p), val(seg.L[1], t, p)], R = [val(seg.R[0], t, p), val(seg.R[1], t, p)]; g.fillStyle = 'rgba(11,15,20,.14)'; rr(g, 98, 344, 884, 22, 11); g.fill();
        const fr = seg.bar === 'pile' ? clamp(100 * dayAt(t, p) / 1e6) : seg.bar === 'fall' ? 0 : 0; if (fr > 0.003) { g.fillStyle = fr >= 1 ? th.good : th.gold; rr(g, 98, 344, Math.max(22, fr * 884), 22, 11); g.fill(); }
        label(g, L[0], 100, 398, th.inkSoft, 26, 'left'); label(g, R[0], 980, 398, th.inkSoft, 26, 'right');
        const sL = fit(L[1], F.hero, 430, 118, 40), sR = fit(R[1], F.hero, 430, 118, 40), cc = c => c === 'bad' ? th.bad : c === 'good' ? '#0E9F55' : c === 'gold' ? '#B88700' : th.ink;
        txt(g, L[1], 100, 484, F.hero(sL), cc(seg.Lc), 'left'); txt(g, R[1], 980, 484, F.hero(sR), cc(seg.Rc), 'right');
        g.restore();
      }
      hookText(g, p, t, th);
      for (const S of p.scenes) {
        if (t < S.from - 0.02 || t > S.to + 0.02) continue; const lt = t - S.from, kin = spring(lt + 0.08, { f: 2.4, z: 0.7 }), a = clamp(lt / 0.12) * (1 - lin(t, S.to - 0.12, S.to)), sc = (S.pop === false ? 1 : 0.94 + 0.06 * Math.min(1.05, kin)) * (S.sc || 1);
        g.save(); g.globalAlpha *= a; g.translate(540, 840 + (S.dy || 0)); g.scale(sc, sc); g.translate(-540, -840);
        const fn = SC[S.type]; if (!fn) throw new Error('unknown scene type ' + S.type); fn(g, p, lt, t, th, S);
        g.restore();
      }
      for (const n of p.notes) if (t >= n.at && t < n.out + 0.2) { const nt = t - n.at, k = Math.min(1.08, spring(nt, 'bouncy')), fo = 1 - lin(t, n.out - 0.15, n.out + 0.05); g.save(); g.globalAlpha *= clamp(nt / 0.06) * fo; chip(g, n.text, 540, n.y || 598, n.tone || 'bad', th, n.size || 44, 900, k); g.restore(); }
    },
  });
  B.register('hypo', {
    defaults: { text: 'HYPOTHETICAL' }, ownEnter: true, size: () => [10, 10],
    draw(g, p, env) { const s = p.text, f = F.monoX(21), w = mw(s, f) + 36; g.globalAlpha *= 0.9; g.fillStyle = 'rgba(11,15,20,.78)'; rr(g, -w / 2, -18, w, 36, 18); g.fill(); g.strokeStyle = env.theme.accent; g.lineWidth = 2; rr(g, -w / 2, -18, w, 36, 18); g.stroke(); txt(g, s, 0, 1, f, env.theme.accent); },
  });
})();
