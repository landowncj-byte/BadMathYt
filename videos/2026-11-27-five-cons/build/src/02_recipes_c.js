// ===== part C: chart, stopwatch, cells, needed, memo, lenses, jail, yearbars, bracket, endslots =====
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, countAt, hash, hit, wobble } = B;
  const tone = (n, p) => B.tone(n, p), { OIL, WATER, STEEL } = B.PAL, icon = B.icon, xmark = B.xmark, tick = B.tick;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const pop = (t, o = 'snappy') => clamp(spring(t, o), 0, 1.25);
  const stroke = (g, col, w) => { g.strokeStyle = col; g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'round'; };

  // ---------- chart: line chart that draws left to right. Series: {kind:'noise'|'crash'|'straight'|'smooth'|'pts', seed, tone, at, dur, w, label, labelAt}. 'straight' is exactly 45 degrees on screen. ----------
  function genSeries(s, PW, PH) {
    const n = s.n || 120, out = [];
    if (s.kind === 'pts') return s.pts;
    if (s.kind === 'straight') { const L = Math.min(PW, PH) * (s.len || 0.94); return [[0, 0], [L / PW, L / PH]]; }
    if (s.kind === 'smooth') { for (let i = 0; i <= n; i++) { const x = i / n; out.push([x, (s.y0 ?? 0.06) + (s.y1 ?? 0.9) * x * (s.k ?? 1) + (hash(i * 3.1 + (s.seed || 1)) - 0.5) * 0.012]); } return out; }
    let y = 0, vals = []; const cr = s.crashAt ?? 2;
    for (let i = 0; i <= n; i++) { const x = i / n; const noise = (hash(i * 1.93 + (s.seed || 1) * 17.7) - 0.5) * 2, dr = s.drift ?? 0.0065; if (x < cr) y += dr + noise * (s.vol ?? 0.045) * (1 + 0.8 * Math.sin(i * 0.31 + (s.seed || 1))); else y -= (s.fall ?? 0.045) * (0.7 + 0.6 * hash(i)) ; vals.push(y); }
    const mn = Math.min(...vals), mx = Math.max(...vals); const lo = s.lo ?? 0.06, hi = s.hi ?? 0.92; return vals.map((v, i) => [i / n, lo + (hi - lo) * (v - mn) / Math.max(1e-6, mx - mn)]);
  }
  B.register('chart', {
    defaults: { w: 1500, h: 760, fill: 'dark', title: '', series: [], angle: null, crack: null, markX: null, axes: true, grid: true, tag: '' }, size: p => [p.w, p.h],
    anchors: p => ({ plot: [0, 20, p.w - 140, p.h - 170], end: [p.w * 0.2, -p.h * 0.12, 520, 360], start: [-p.w * 0.35, p.h * 0.25, 420, 300] }),
    draw(g, p, env) { const { t, theme, lift } = env, w = p.w, h = p.h, dark = p.fill === 'dark', ML = 90, MR = 60, MT = p.title ? 100 : 50, MB = 56, PW = w - ML - MR, PH = h - MT - MB, ox = -w / 2 + ML, oy = h / 2 - MB;
      paper(g, -w / 2, -h / 2, w, h, 26, { lift, fill: dark ? '#18212D' : theme.paper, grain: !dark }); const fg = dark ? theme.paper : theme.ink, soft = dark ? rgba(theme.paper, 0.35) : theme.inkSoft;
      if (p.title) txt(g, p.title, -w / 2 + 44, -h / 2 + 52, F.mono(28), dark ? rgba(theme.paper, 0.75) : theme.inkSoft, 'left');
      if (p.grid) { g.strokeStyle = dark ? rgba(theme.paper, 0.1) : theme.rule; g.lineWidth = 2; for (let i = 1; i <= 4; i++) { g.beginPath(); g.moveTo(ox, oy - PH * i / 4); g.lineTo(ox + PW, oy - PH * i / 4); g.stroke(); } }
      if (p.axes) { stroke(g, soft, 4); g.beginPath(); g.moveTo(ox, oy - PH); g.lineTo(ox, oy); g.lineTo(ox + PW, oy); g.stroke(); }
      p.series.forEach((s, si) => { s._pts = s._pts || genSeries(s, PW, PH); const pts = s._pts, u = (s.lin ? lin : (a, b, c) => ease.inOut(lin(a, b, c)))(t, s.at ?? 0, (s.at ?? 0) + (s.dur ?? 3)); if (u <= 0) return; const col = tone(s.tone || 'good', !dark);
        const n = pts.length - 1, f = u * n, i0 = Math.floor(f), fr = f - i0, P = q => [ox + pts[q][0] * PW, oy - pts[q][1] * PH]; g.save(); g.beginPath(); g.rect(-w / 2, -h / 2, w, h); g.clip();
        const path = () => { g.beginPath(); for (let i = 0; i <= Math.min(i0, n); i++) { const [x, y] = P(i); i ? g.lineTo(x, y) : g.moveTo(x, y); } if (i0 < n) { const [a, b] = [P(i0), P(i0 + 1)]; g.lineTo(lerp(a[0], b[0], fr), lerp(a[1], b[1], fr)); } };
        g.strokeStyle = 'rgba(0,0,0,.35)'; g.lineWidth = (s.w || 8) + 6; g.lineJoin = 'round'; g.lineCap = 'round'; g.save(); g.translate(3, 7); path(); g.stroke(); g.restore(); stroke(g, col, s.w || 8); if (s.dash) g.setLineDash([22, 14]); path(); g.stroke(); g.setLineDash([]);
        const hd = i0 < n ? [lerp(P(i0)[0], P(i0 + 1)[0], fr), lerp(P(i0)[1], P(i0 + 1)[1], fr)] : P(n); if (u < 1 || s.dot) { g.fillStyle = col; g.beginPath(); g.arc(hd[0], hd[1], 13, 0, 7); g.fill(); g.fillStyle = dark ? theme.paper : theme.ink; g.beginPath(); g.arc(hd[0], hd[1], 5, 0, 7); g.fill(); }
        g.restore(); const lk = t - (s.labelAt ?? 1e9); if (s.label && lk > 0) { g.save(); const e = P(n), fw = mw(s.label, F.cap(30)) + 40, lx = clamp(e[0] - fw / 2 - 20, -w / 2 + fw / 2 + 20, w / 2 - fw / 2 - 20), ly = (s.labelDy ?? -50) + e[1]; g.translate(lx, ly); g.globalAlpha = clamp(lk / 0.1); g.scale(0.7 + 0.3 * pop(lk), 0.7 + 0.3 * pop(lk)); clay(g, -fw / 2, -26, fw, 52, 26, tone(s.tone || 'good', false), { shadowK: 0.6 }); txt(g, s.label, 0, 2, F.cap(30), (s.tone === 'paper' || s.tone === 'accent' && false) ? theme.ink : theme.paper); g.restore(); } });
      if (p.angle) { const ak = t - p.angle.at; if (ak > 0) { const k = ease.out(lin(ak, 0, 0.5)), R = 230; g.save(); stroke(g, theme.accent, 5); g.setLineDash([14, 10]); g.beginPath(); g.moveTo(ox, oy); g.lineTo(ox + 420, oy); g.stroke(); g.setLineDash([]); g.beginPath(); g.arc(ox, oy, R, -Math.PI / 4 * k, 0); g.stroke(); g.globalAlpha = clamp((ak - 0.25) / 0.2); g.translate(ox + 290, oy - 56); g.scale(0.8 + 0.2 * pop(ak - 0.25), 0.8 + 0.2 * pop(ak - 0.25)); txt(g, '45°', 0, 0, F.hero(84), theme.accent); g.restore(); } }
      if (p.markX) { const xk = t - p.markX.at; if (xk > 0) { const px = ox + PW * (p.markX.x ?? 0.7), py = oy - PH * (p.markX.y ?? 0.6), s = 1 + 0.5 * hit(xk, 9); g.save(); g.translate(px, py); g.scale(s, s); g.fillStyle = theme.paper; g.beginPath(); g.arc(0, 0, 70, 0, 7); g.fill(); g.fillStyle = theme.badInk; g.beginPath(); g.arc(0, 0, 62, 0, 7); g.fill(); xmark(g, 0, 0, 27, theme.paper, ease.out(lin(xk, 0, 0.25)), 12); g.restore(); burst(g, px, py, 90, theme.bad, xk - 0.1, 14, 0.45); } }
      if (p.crack) { const ck = t - p.crack.at; if (ck > 0) { const k = lin(ck, 0, 0.35); g.save(); g.beginPath(); rr(g, -w / 2, -h / 2, w, h, 26); g.clip(); const cx = p.crack.x ?? 0.62, cy = p.crack.y ?? 0.3, c0 = [ox + PW * cx, oy - PH * (1 - cy)]; const rays = 9; for (let r = 0; r < rays; r++) { const a = (r / rays) * Math.PI * 2 + 0.3 + hash(r) * 0.4, len = (260 + 520 * hash(r * 3.3)) * k; let x = c0[0], y = c0[1]; g.beginPath(); g.moveTo(x, y); for (let sgm = 1; sgm <= 5; sgm++) { x += Math.cos(a + (hash(r * 9 + sgm) - 0.5) * 0.7) * len / 5; y += Math.sin(a + (hash(r * 5 + sgm) - 0.5) * 0.7) * len / 5; g.lineTo(x, y); } stroke(g, 'rgba(8,10,14,.85)', 7); g.stroke(); stroke(g, 'rgba(245,243,238,.9)', 3); g.stroke(); } g.restore(); } }
      if (p.tag) txt(g, p.tag, w / 2 - 40, -h / 2 + 52, F.mono(24), dark ? rgba(theme.paper, 0.6) : theme.inkSoft, 'right'); },
  });

  // ---------- stopwatch: dial + two readouts (5 MIN doubt -> 4 HOURS proof) ----------
  B.register('stopwatch', {
    defaults: { w: 1000, h: 520, aAt: 0, bAt: 99999, a: ['KNEW', '5 MIN'], b: ['PROVED', '4 HOURS'] }, size: p => [p.w, p.h], anchors: p => ({ a: [200, -90, 560, 170], b: [200, 100, 560, 170], dial: [-300, 0, 400, 400] }),
    draw(g, p, env) { const { t, theme, lift } = env, w = p.w, h = p.h; paper(g, -w / 2, -h / 2, w, h, 26, { lift, fill: '#18212D', grain: false }); const dx = -w / 2 + 250, R = 170;
      g.save(); g.translate(dx, 0); clay(g, -R - 16, -R - 16, 2 * R + 32, 2 * R + 32, R + 16, '#2A3647', { shadowK: 0.6 }); g.fillStyle = theme.paper; g.beginPath(); g.arc(0, 0, R, 0, 7); g.fill(); stroke(g, theme.ink, 4); for (let i = 0; i < 60; i++) { const a = i / 60 * Math.PI * 2, r1 = R - (i % 5 ? 12 : 26); g.beginPath(); g.moveTo(Math.sin(a) * r1, -Math.cos(a) * r1); g.lineTo(Math.sin(a) * (R - 4), -Math.cos(a) * (R - 4)); g.stroke(); }
      const a1 = ease.inOut(lin(t, p.aAt, p.aAt + 0.8)), a2 = ease.inOut(lin(t, p.bAt, p.bAt + 1.6)), ang = a1 * 0.5 + a2 * (Math.PI * 2 * 2 - 0.5) + (a2 > 0 && a2 < 1 ? 0 : 0); stroke(g, theme.badInk, 8); g.beginPath(); g.moveTo(-Math.sin(ang) * 20, Math.cos(ang) * 20); g.lineTo(Math.sin(ang) * (R - 34), -Math.cos(ang) * (R - 34)); g.stroke(); g.fillStyle = theme.ink; g.beginPath(); g.arc(0, 0, 13, 0, 7); g.fill(); g.restore();
      [[p.a, p.aAt, -90, 'accent'], [p.b, p.bAt, 100, 'bad']].forEach(([r, at, y, tn]) => { const on = t - at; if (on < 0) return; g.save(); g.translate(250, y); g.globalAlpha = clamp(on / 0.1); const s = 0.8 + 0.2 * pop(on); g.scale(s, s); txt(g, r[0], -250, -86, F.mono(28), rgba(theme.paper, 0.7), 'left'); txt(g, r[1], -250, 0, F.hero(110), tone(tn, false), 'left'); g.restore(); }); },
  });

  // ---------- cells: 100 month-cells; 4 turn red ----------
  B.register('cells', {
    defaults: { w: 900, h: 860, at: 0, redAt: 99999, reds: [13, 38, 59, 82], label: '' }, size: p => [p.w, p.h], anchors: p => ({ grid: [0, -40, p.w * 0.92, p.h * 0.76], label: [0, p.h / 2 - 70, p.w, 120] }),
    draw(g, p, env) { const { t, theme, lift } = env, w = p.w, h = p.h, cs = 56, gap = 11, gw = 10 * cs + 9 * gap, x0 = -gw / 2, y0 = -h / 2 + 52; paper(g, -w / 2, -h / 2, w, h, 26, { lift, fill: '#18212D', grain: false });
      for (let i = 0; i < 100; i++) { const c = i % 10, r = Math.floor(i / 10), on = t - p.at - i * 0.012; if (on < 0) continue; const isRed = p.reds.includes(i), rk = isRed ? t - p.redAt - p.reds.indexOf(i) * 0.25 : -1, red = rk > 0, k = pop(on, 'bouncy'), s = (red ? 1 + 0.3 * hit(rk, 7) : 1) * k; g.save(); g.translate(x0 + c * (cs + gap) + cs / 2, y0 + r * (cs + gap) + cs / 2); g.scale(s, s); clay(g, -cs / 2, -cs / 2, cs, cs, 12, red ? theme.bad : theme.good, { shadowK: 0.4 }); g.restore(); }
      const lk = t - p.labelAt; if (p.label && t > (p.labelAt || 0)) { g.save(); g.globalAlpha = clamp(lk / 0.12); g.translate(0, h / 2 - 62 + (1 - pop(lk)) * 20); txt(g, p.label, 0, 0, F.hero(62), theme.paper); g.restore(); } },
  });

  // ---------- needed: options that existed (fills to the ceiling) vs options Madoff needed (punches through it). No numbers. ----------
  B.register('needed', {
    defaults: { w: 1300, h: 860, at: 0, a: 'OPTIONS THAT EXISTED', b: 'OPTIONS MADOFF NEEDED', aAt: 0, bAt: 99999, head: 'CHICAGO BOARD OPTIONS EXCHANGE' }, size: p => [p.w, p.h], anchors: p => ({ a: [-250, 60, 420, 600], b: [250, -20, 420, 760], ceil: [0, -160, p.w * 0.8, 120] }),
    draw(g, p, env) { const { t, theme, lift } = env, w = p.w, h = p.h, gy = h / 2 - 120, ceil = gy - 430, bw = 260; paper(g, -w / 2, -h / 2, w, h, 26, { lift, fill: '#18212D', grain: false }); txt(g, p.head, -w / 2 + 70, -h / 2 + 52, F.mono(24), rgba(theme.paper, 0.6), 'left');
      const k1 = clamp(spring(t - p.aAt, { f: 1.7, z: 0.55 }), 0, 1.02), k2 = clamp(spring(t - p.bAt, { f: 1.5, z: 0.5 }), 0, 1.08), ax = -250, bx = 250, bh2 = 430 + 190; g.fillStyle = rgba(theme.paper, 0.28); rr(g, -w / 2 + 40, gy, w - 80, 6, 3); g.fill();
      clay(g, ax - bw / 2, gy - 430 * k1, bw, 430 * k1, 16, theme.good, { shadowK: 0.5 });
      const hit2 = k2 * 430 > 430 - 4 ? 1 : 0, bt = gy - bh2 * k2; // ceiling beam (two halves, gap around bar B once it breaks through)
      const gap = hit2 ? 60 : 0; g.fillStyle = '#566377'; g.fillRect(-w / 2 + 40, ceil - 14, (bx - bw / 2 - gap) + w / 2 - 40, 28); g.fillRect(bx + bw / 2 + gap, ceil - 14, w / 2 - 40 - (bx + bw / 2 + gap), 28); if (!hit2) g.fillRect(bx - bw / 2 - gap, ceil - 14, bw + 2 * gap, 28);
      clay(g, bx - bw / 2, bt, bw, gy - bt, 16, theme.bad, { shadowK: 0.5 }); if (hit2) { const bk = t - p.bAt - 0.5; for (let q = 0; q < 8; q++) { const u = clamp(bk / 0.9); if (u <= 0 || u >= 1) break; g.save(); g.globalAlpha = 1 - u; g.translate(bx + (hash(q) - 0.5) * 340 * u, ceil - 80 * Math.sin(Math.PI * u) * (0.5 + hash(q * 2)) + 300 * u * u); g.rotate(u * 6 * (hash(q + 4) - 0.5)); g.fillStyle = '#566377'; g.fillRect(-14, -9, 28, 18); g.restore(); } }
      txt(g, 'CEILING: WHAT EXISTS', -w / 2 + 70, ceil - 40, F.mono(22), rgba(theme.paper, 0.6), 'left'); txt(g, p.a, ax, gy + 44, F.cap(28), rgba(theme.paper, 0.92)); txt(g, p.b, bx, gy + 44, F.cap(28), rgba(theme.paper, 0.92)); },
  });

  // ---------- memo: the 2005 SEC memo ----------
  B.register('memo', {
    defaults: { w: 760, h: 860, to: 'U.S. SEC', date: '2005', title: ["THE WORLD'S", 'LARGEST HEDGE FUND', 'IS A FRAUD'], at: 0, titleAt: 0 }, ownEnter: true, size: p => [p.w, p.h], anchors: p => ({ title: [0, 40, p.w * 0.9, 330], head: [0, -p.h / 2 + 80, p.w, 160] }),
    draw(g, p, env) { const { t, lt, theme, lift } = env, w = p.w, h = p.h, k = spring(lt, 'heavy'), x0 = -w / 2, y0 = -h / 2; g.save(); g.translate(0, (1 - k) * 320); g.rotate((1 - k) * -0.08 + 0.015); g.globalAlpha *= clamp(lt / 0.1);
      paper(g, x0, y0, w, h, 14, { lift }); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 140); g.save(); rr(g, x0, y0, w, h, 14); g.clip(); g.fillRect(x0, y0, w, 140); g.restore(); txt(g, 'MEMORANDUM', x0 + 44, y0 + 70, F.hero(60), theme.paper, 'left');
      txt(g, 'TO:', x0 + 44, y0 + 196, F.monoX(28), theme.inkSoft, 'left'); txt(g, p.to, x0 + 130, y0 + 196, F.monoX(30), theme.ink, 'left'); txt(g, 'DATE:', x0 + 44, y0 + 246, F.monoX(28), theme.inkSoft, 'left'); txt(g, p.date, x0 + 160, y0 + 246, F.monoX(30), theme.ink, 'left'); txt(g, 'RE:', x0 + 44, y0 + 296, F.monoX(28), theme.inkSoft, 'left');
      g.strokeStyle = theme.rule; g.lineWidth = 3; g.setLineDash([10, 9]); g.beginPath(); g.moveTo(x0 + 40, y0 + 330); g.lineTo(x0 + w - 40, y0 + 330); g.stroke(); g.setLineDash([]);
      p.title.forEach((l, i) => { const on = t - p.titleAt - i * 0.25, n = Math.ceil(l.length * ease.out(lin(on, 0, 0.5))); if (on > 0) { const tw = mw(l, F.hero(64)); marker(g, x0 + 44 - 8, y0 + 392 + i * 92 - 40, tw + 16, 80, theme.bad, clamp((on - 0.3) / 0.3), 0.2); txt(g, l.slice(0, n), x0 + 44, y0 + 392 + i * 92, F.hero(64), theme.badInk, 'left'); } });
      for (let i = 0; i < 6; i++) { const s = ease.out(lin(lt - 0.4 - i * 0.07, 0, 0.4)); g.fillStyle = theme.rule; g.beginPath(); g.roundRect(x0 + 44, y0 + 690 + i * 28, (w - 88) * (i === 5 ? 0.45 : 0.95) * s, 12, 6); if (s > 0) g.fill(); } g.restore(); },
  });

  // ---------- lenses: 8 magnifying glasses along 1992-2008, each finds nothing ----------
  B.register('lenses', {
    defaults: { w: 1700, h: 480, n: 8, at: 0, per: 0.45, from: '1992', to: '2008' }, size: p => [p.w, p.h], anchors: p => ({ row: [0, 0, p.w, p.h] }),
    draw(g, p, env) { const { t, theme, lift } = env, w = p.w, h = p.h, ay = h / 2 - 90, L = w - 200; stroke(g, rgba(theme.paper, 0.3), 8); g.beginPath(); g.moveTo(-L / 2, ay); g.lineTo(L / 2, ay); g.stroke(); const dk = ease.out(lin(t - p.at, 0, 0.6)); stroke(g, theme.paper, 8); g.beginPath(); g.moveTo(-L / 2, ay); g.lineTo(-L / 2 + L * dk, ay); g.stroke(); txt(g, p.from, -L / 2, ay + 52, F.monoX(34), theme.paper); txt(g, p.to, L / 2, ay + 52, F.monoX(34), theme.paper);
      for (let i = 0; i < p.n; i++) { const on = t - p.at - 0.3 - i * p.per; if (on < 0) continue; const x = -L / 2 + 70 + (L - 140) * i / (p.n - 1), k = pop(on, 'bouncy'); g.save(); g.translate(x, ay - 190); g.scale(k, k); g.fillStyle = rgba(theme.paper, 0.1); g.beginPath(); g.arc(0, 0, 80, 0, 7); g.fill(); clay(g, -62, -62, 124, 124, 62, '#2A3647', { shadowK: 0.5 }); icon(g, 'magnifier', 100, theme.paper, theme.ink); g.restore(); g.save(); g.globalAlpha = clamp((on - 0.15) / 0.15); g.translate(0, (1 - pop(on - 0.1)) * 14); txt(g, 'NO FRAUD', x, ay - 70, F.cap(24), rgba(theme.paper, 0.75)); txt(g, 'FOUND', x, ay - 44, F.cap(24), rgba(theme.paper, 0.75)); g.restore(); stroke(g, theme.paper, 5); g.beginPath(); g.moveTo(x, ay - 24); g.lineTo(x, ay); g.stroke(); } },
  });

  // ---------- jail: bars slam down over a paper plaque with lines (strike-through supported) ----------
  B.register('jail', {
    defaults: { w: 1000, h: 800, dropAt: 0, lines: [], head: '' }, size: p => [p.w, p.h], anchors: p => ({ plaque: [0, 120, p.w * 0.86, 360], head: [0, -p.h / 2 + 90, 700, 140] }),
    draw(g, p, env) { const { t, theme, lift } = env, w = p.w, h = p.h; paper(g, -w / 2, -h / 2, w, h, 26, { lift, fill: '#18212D', grain: false }); g.save(); g.beginPath(); g.rect(-w / 2, -h / 2, w, h); g.clip();
      const bars = 9; for (let i = 0; i < bars; i++) { const on = t - p.dropAt - i * 0.045, k = on > 0 ? clamp(spring(on, { f: 2.0, z: 0.45 }), 0, 1.1) : 0, x = -w / 2 + 70 + i * ((w - 140) / (bars - 1)), top = -h / 2 - 20, bh = (h + 40) * k; if (bh > 0) clay(g, x - 14, top, 28, bh, 10, '#6C7889', { shadowK: 0.6 }); }
      g.fillStyle = '#6C7889'; const rk = clamp(spring(t - p.dropAt - 0.3, 'soft'), 0, 1); g.fillRect(-w / 2, -h / 2 + 150 - (1 - rk) * 200, w, 22); g.fillRect(-w / 2, h / 2 - 120 + (1 - rk) * 200, w, 22); g.restore();
      const pk = t - (p.plaqueAt ?? p.dropAt + 0.5); if (pk > 0) { g.save(); g.translate(0, 80 + (1 - pop(pk)) * 60); g.globalAlpha = clamp(pk / 0.1); paper(g, -w * 0.4, -170, w * 0.8, 340, 16, { lift: 0.4 }); p.lines.forEach((l, i) => { const on = t - l.at; if (on < 0) return; const y = (i - (p.lines.length - 1) / 2) * 120, f = F.hero(l.size || 96), tw = mw(l.t, f); g.save(); g.globalAlpha *= clamp(on / 0.1); g.translate(0, y + (1 - pop(on)) * 24); txt(g, l.t, 0, 0, f, tone(l.tone || 'ink', true)); if (l.strike != null && t > l.strike) { const sk = ease.out(lin(t - l.strike, 0, 0.25)); g.strokeStyle = theme.badInk; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); g.moveTo(-tw / 2 - 20, 4); g.lineTo(-tw / 2 - 20 + (tw + 40) * sk, 4); g.stroke(); } g.restore(); }); g.restore(); }
      if (p.head) txt(g, p.head, 0, -h / 2 + 60, F.mono(26), rgba(theme.paper, 0.6)); },
  });

  // ---------- yearbars: 17 years of ~10% (suspiciously uniform) ----------
  B.register('yearbars', {
    defaults: { w: 1500, h: 600, n: 17, at: 0, per: 0.32, from: '1992', to: '2008' }, size: p => [p.w, p.h], anchors: p => ({ row: [0, 0, p.w, p.h] }),
    draw(g, p, env) { const { t, theme, lift } = env, w = p.w, h = p.h, gy = h / 2 - 90, bw = 56, gap = (w - 160 - p.n * bw) / (p.n - 1), top = 360; paper(g, -w / 2, -h / 2, w, h, 26, { lift, fill: '#18212D', grain: false }); g.fillStyle = rgba(theme.paper, 0.28); rr(g, -w / 2 + 50, gy, w - 100, 6, 3); g.fill();
      stroke(g, rgba(theme.paper, 0.4), 3); g.setLineDash([14, 10]); const ly = gy - top * 0.1 * 7.2; g.beginPath(); g.moveTo(-w / 2 + 60, ly); g.lineTo(w / 2 - 60, ly); g.stroke(); g.setLineDash([]); txt(g, '10%', w / 2 - 60, ly - 26, F.monoX(26), rgba(theme.paper, 0.7), 'right');
      for (let i = 0; i < p.n; i++) { const on = t - p.at - i * p.per; if (on < 0) continue; const hh = top * 0.1 * 7.2 * (1 + (hash(i * 3.7) - 0.5) * 0.06), k = clamp(spring(on, { f: 2.2, z: 0.5 }), 0, 1.15), x = -w / 2 + 80 + i * (bw + gap); clay(g, x, gy - hh * k, bw, hh * k, 10, theme.good, { shadowK: 0.4 }); g.save(); g.globalAlpha = clamp(on / 0.15); txt(g, i == 0 ? p.from : i == p.n - 1 ? p.to : '', x + bw / 2, gy + 38, F.mono(22), rgba(theme.paper, 0.7)); g.restore(); } },
  });

  // ---------- bracket: curly bracket spanning a width with label lines under it ----------
  B.register('bracket', {
    defaults: { w: 1000, h: 240, at: 0, lines: [] }, size: p => [p.w, p.h], anchors: p => ({ label: [0, 60, p.w, 160] }),
    draw(g, p, env) { const { t, theme } = env, on = t - p.at, k = ease.out(lin(on, 0, 0.5)), w = p.w * k, y = -p.h / 2 + 30; if (on < 0) return; stroke(g, theme.bad, 10); g.beginPath(); g.moveTo(-w / 2, y + 30); g.quadraticCurveTo(-w / 2, y + 90, -w / 2 + 70, y + 90); g.lineTo(-30, y + 90); g.quadraticCurveTo(0, y + 90, 0, y + 120); g.quadraticCurveTo(0, y + 90, 30, y + 90); g.lineTo(w / 2 - 70, y + 90); g.quadraticCurveTo(w / 2, y + 90, w / 2, y + 30); g.stroke();
      p.lines.forEach((l, i) => { const lo = t - p.at - 0.3 - i * 0.2; if (lo < 0) return; g.save(); g.globalAlpha = clamp(lo / 0.12); g.translate(0, (1 - pop(lo)) * 16); txt(g, l.t, 0, y + 170 + i * 56, l.hero ? F.hero(l.size || 64) : F.cap(l.size || 30), tone(l.tone || 'paper', false)); g.restore(); }); },
  });

  // ---------- endslots: YouTube end-screen placeholders (screen layer, drawn in screen px). 800x450 rect at (120,310), r=170 circle at (1400,535). ----------
  B.register('endslots', {
    defaults: { at: 0, rect: [120, 310, 800, 450], circle: [1400, 535, 170], rl: 'WATCH NEXT', cl: 'SUBSCRIBE' }, ownEnter: true, size: () => [1, 1],
    draw(g, p, env) { const { lt, theme } = env, k = pop(lt, 'soft'), [rx, ry, rw, rh] = p.rect, [cx, cy, cr] = p.circle; g.save(); g.globalAlpha = clamp(lt / 0.3);
      for (const shape of ['r', 'c']) { g.save(); const sc = 0.92 + 0.08 * k; if (shape === 'r') { g.translate(rx + rw / 2, ry + rh / 2); g.scale(sc, sc); g.fillStyle = 'rgba(245,243,238,.06)'; rr(g, -rw / 2, -rh / 2, rw, rh, 22); g.fill(); g.strokeStyle = 'rgba(245,243,238,.45)'; g.lineWidth = 4; g.setLineDash([18, 12]); g.lineDashOffset = -lt * 14; rr(g, -rw / 2, -rh / 2, rw, rh, 22); g.stroke(); g.setLineDash([]); } else { g.translate(cx, cy); g.scale(sc, sc); g.fillStyle = 'rgba(245,243,238,.06)'; g.beginPath(); g.arc(0, 0, cr, 0, 7); g.fill(); g.strokeStyle = 'rgba(245,243,238,.45)'; g.lineWidth = 4; g.setLineDash([18, 12]); g.lineDashOffset = -lt * 14; g.beginPath(); g.arc(0, 0, cr, 0, 7); g.stroke(); g.setLineDash([]); } g.restore(); }
      txt(g, p.rl, rx + rw / 2, ry - 34, F.cap(30), rgba(theme.paper, 0.8)); txt(g, p.cl, cx, cy + cr + 40, F.cap(30), rgba(theme.paper, 0.8)); g.restore(); },
  });
})();
