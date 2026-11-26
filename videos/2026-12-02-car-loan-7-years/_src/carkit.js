// car-loan topic props (What If): cartoon sedan that ages, loan check, bank, clock, calendar grids, seesaw
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, burst, hash, hit } = B;
  const INK = '#1b2028';
  const pop = (t, o = 'snappy') => clamp(spring(Math.max(0, t), o), 0, 1.25);
  const E = (g, x, y, rx, ry, c, st, lw) => { g.beginPath(); g.ellipse(x, y, rx, ry, 0, 0, 7); g.fillStyle = c; g.fill(); if (st) { g.strokeStyle = st; g.lineWidth = lw || 4; g.stroke(); } };
  const RR = (g, x, y, w, h, r, c, st, lw) => { g.beginPath(); g.roundRect(x, y, w, h, r); g.fillStyle = c; g.fill(); if (st) { g.strokeStyle = st; g.lineWidth = lw || 4; g.stroke(); } };
  const car = (g, age) => { // age 0 shiny, 1 dusty, 2 old/rusty
    const body = ['#2E86DE', '#6f93b8', '#8d8a80'][age], dark = ['#1f5fa6', '#4d6a8a', '#6b665b'][age];
    g.save(); g.translate(0, 12); g.fillStyle = 'rgba(0,0,0,.22)'; g.beginPath(); g.ellipse(0, 50, 92, 9, 0, 0, 7); g.fill();
    const bp = () => { g.beginPath(); g.moveTo(-92, 34); g.lineTo(-92, 4); g.quadraticCurveTo(-88, -10, -60, -14); g.lineTo(-40, -42); g.quadraticCurveTo(-30, -52, -14, -52); g.lineTo(26, -52); g.quadraticCurveTo(42, -50, 52, -32); g.lineTo(60, -14); g.quadraticCurveTo(90, -10, 92, 8); g.lineTo(92, 34); g.closePath(); };
    bp(); g.fillStyle = body; g.fill(); g.strokeStyle = INK; g.lineWidth = 5; g.stroke();
    g.save(); bp(); g.clip(); const lg = g.createLinearGradient(0, -52, 0, 36); lg.addColorStop(0, 'rgba(255,255,255,' + (age === 0 ? 0.4 : 0.1) + ')'); lg.addColorStop(0.5, 'rgba(255,255,255,0)'); lg.addColorStop(1, 'rgba(0,0,0,.25)'); g.fillStyle = lg; g.fillRect(-100, -60, 200, 100);
    if (age >= 1) { for (let i = 0; i < 14; i++) { E(g, -80 + hash(i * 3.3) * 160, -30 + hash(i * 7.7) * 60, 10 + hash(i) * 14, 5 + hash(i + 4) * 7, age === 1 ? 'rgba(200,185,150,.45)' : 'rgba(150,80,40,.55)'); } }
    if (age === 2) { g.fillStyle = dark; g.fillRect(-92, 20, 184, 6); }
    g.restore();
    g.beginPath(); g.moveTo(-34, -40); g.lineTo(-18, -46); g.lineTo(22, -46); g.lineTo(44, -26); g.lineTo(-44, -26); g.closePath(); g.fillStyle = age === 2 ? '#7f8c96' : '#bfe3f5'; g.fill(); g.strokeStyle = INK; g.lineWidth = 4; g.stroke(); g.beginPath(); g.moveTo(4, -46); g.lineTo(4, -26); g.stroke();
    for (const x of [-52, 54]) { E(g, x, 36, 21, 21, '#151a20', INK, 3); E(g, x, 36, 10, 10, age === 2 ? '#8a8f96' : '#c9ccd2'); }
    E(g, 90, -2, 6, 5, age === 2 ? '#b8a96a' : '#FFE27A'); E(g, -90, -2, 5, 5, '#E0281E');
    if (age === 2) { g.strokeStyle = 'rgba(120,120,120,.55)'; g.lineWidth = 10; g.lineCap = 'round'; g.beginPath(); g.moveTo(-100, 8); g.quadraticCurveTo(-120, -4, -112, -22); g.stroke(); }
    g.restore(); };
  const check = (g, th) => { g.save(); g.rotate(-0.08); RR(g, -60, -34, 120, 68, 6, '#F5F3EE', INK, 4); g.fillStyle = '#188a56'; g.fillRect(-56, -30, 112, 16); g.fillStyle = INK; g.fillRect(-48, 6, 60, 4); g.fillRect(-48, 18, 40, 4); txt(g, '$44,664', 20, -2, F.hero(18), '#188a56'); g.restore(); };
  const bank = (g, th) => { g.beginPath(); g.moveTo(-60, -30); g.lineTo(0, -66); g.lineTo(60, -30); g.closePath(); g.fillStyle = '#2c3e66'; g.fill(); g.strokeStyle = INK; g.lineWidth = 4; g.stroke(); for (let i = 0; i < 4; i++) RR(g, -48 + i * 29, -26, 16, 66, 3, '#e9edf5', INK, 3); RR(g, -64, 40, 128, 14, 3, '#59647a', INK, 3); };
  const clock = (g, th) => { E(g, 0, 0, 58, 58, '#F5F3EE', INK, 5); g.strokeStyle = INK; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.moveTo(0, 0); g.lineTo(0, -34); g.moveTo(0, 0); g.lineTo(24, 10); g.stroke(); E(g, 0, 0, 6, 6, '#E0281E'); for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; g.beginPath(); g.moveTo(Math.cos(a) * 46, Math.sin(a) * 46); g.lineTo(Math.cos(a) * 52, Math.sin(a) * 52); g.stroke(); } };
  const keys = (g, th) => { g.strokeStyle = '#c9ccd2'; g.lineWidth = 8; g.beginPath(); g.arc(0, -34, 20, 0, 7); g.stroke(); RR(g, -24, -20, 48, 76, 10, '#2b3340', INK, 4); E(g, 0, 6, 9, 9, '#E0281E'); E(g, 0, 32, 6, 6, '#c9ccd2'); };
  const slip = (g, th) => { RR(g, -44, -58, 88, 116, 6, '#F5F3EE', INK, 4); g.fillStyle = th.navy; g.fillRect(-42, -56, 84, 18); for (let i = 0; i < 4; i++) { g.fillStyle = '#c9c3b3'; g.fillRect(-32, -26 + i * 18, 64, 6); } txt(g, '$', 0, 36, F.hero(34), '#00A152'); };
  const tag = (g, th) => { g.beginPath(); g.moveTo(-50, -30); g.lineTo(30, -30); g.lineTo(58, 0); g.lineTo(30, 30); g.lineTo(-50, 30); g.closePath(); g.fillStyle = '#F2B705'; g.fill(); g.strokeStyle = INK; g.lineWidth = 4; g.stroke(); E(g, -34, 0, 7, 7, '#F5F3EE', INK, 3); txt(g, '$', 4, 2, F.hero(36), INK); };
  B.extraIcons = Object.assign(B.extraIcons || {}, { car0: g => car(g, 0), car1: g => car(g, 1), car2: g => car(g, 2), check, bank, clock, keys, slip, tag });

  // ---- calendar grids: 48 boxes vs 84 boxes; a coin drips into the bank on each box (interest every month)
  B.register('months', {
    defaults: { w: 900, h: 780, at: 0, dur: 2.2, rows: [{ n: 48, label: '4 YEARS · 48 MONTHS', tone: 'good' }, { n: 84, label: '7 YEARS · 84 MONTHS', tone: 'bad' }], head: 'MONTHS YOU OWE' }, size: p => [p.w, p.h], ownEnter: true,
    anchors: p => ({ a: [0, -p.h * 0.1, p.w * 0.9, 240], b: [0, p.h * 0.22, p.w * 0.9, 300] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, k = pop(lt, 'snappy'); g.save(); g.scale(0.92 + 0.08 * k, 0.92 + 0.08 * k); g.globalAlpha *= clamp(lt / 0.1 + 0.2); paper(g, -w / 2, -h / 2, w, h, 22, { lift });
      g.save(); rr(g, -w / 2, -h / 2, w, h, 22); g.clip(); g.fillStyle = theme.navy; g.fillRect(-w / 2, -h / 2, w, 110); g.restore(); txt(g, p.head, 0, -h / 2 + 56, F.hero(62), theme.paper);
      const fill = clamp(lin(t, p.at, p.at + p.dur)); let y = -h / 2 + 150;
      p.rows.forEach((r, ri) => { const cols = 12, n = r.n, rows = Math.ceil(n / cols), cw = (w - 100) / cols, ch = ri ? 38 : 38, col = B.tone(r.tone, true); txt(g, r.label, -w / 2 + 50, y + 18, F.hero(40), col, 'left');
        const gy = y + 52; for (let i = 0; i < n; i++) { const x = -w / 2 + 50 + (i % cols) * cw, yy = gy + Math.floor(i / cols) * ch, on = i < fill * n; g.fillStyle = on ? col : theme.paperShade; rr(g, x + 3, yy + 3, cw - 6, ch - 6, 5); g.fill(); if (on && i > fill * n - 3) burst(g, x + cw / 2, yy + ch / 2, cw * 0.5, col, (fill * n - i) / n * 3, 5, 0.3); }
        y += 52 + rows * ch + 56; });
      g.restore();
    },
  });
  // ---- seesaw: payment goes down, price goes up
  B.register('seesaw', {
    defaults: { w: 900, h: 640, at: 0, l: 'PAYMENT', r: 'PRICE', lt: '↓', rt: '↑' }, size: p => [p.w, p.h], ownEnter: true,
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, k = pop(lt, 'snappy'); g.save(); g.scale(0.92 + 0.08 * k, 0.92 + 0.08 * k); g.globalAlpha *= clamp(lt / 0.1 + 0.2); paper(g, -w / 2, -h / 2, w, h, 22, { lift });
      const tilt = ease.out(clamp((t - p.at) / 0.6)) * 0.22; g.save(); g.translate(0, 120); P_(g, [[-30, 130], [30, 130], [0, 40]], '#59606B'); g.rotate(tilt); RR(g, -350, -14, 700, 28, 10, '#8a5a2b', INK, 4);
      [[-300, p.l, p.lt, theme.goodInk], [300, p.r, p.rt, theme.badInk]].forEach(([x, lab, arr, col], i) => { g.save(); g.translate(x, -14); g.rotate(-tilt); RR(g, -120, -190, 240, 180, 14, '#F5F3EE', INK, 4); txt(g, lab, 0, -138, F.hero(46), theme.ink); txt(g, arr, 0, -64, F.hero(100), col); g.restore(); });
      g.restore(); g.restore();
    },
  });
  const P_ = (g, pts, c) => { g.beginPath(); pts.forEach((p, i) => i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); g.closePath(); g.fillStyle = c; g.fill(); g.strokeStyle = INK; g.lineWidth = 4; g.stroke(); };
  // ---- workweeks: 5 full bars of 40h + a sixth starting; hours counter 216
  B.register('weeks', {
    defaults: { w: 860, h: 700, at: 0, dur: 2.0, hours: 216, head: 'HOURS OF WORK', foot: 'AT $24.51/HR (BLS MEDIAN WAGE)' }, size: p => [p.w, p.h], ownEnter: true,
    anchors: p => ({ bars: [0, 20, p.w * 0.9, 380], num: [0, -p.h / 2 + 150, p.w * 0.9, 190] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, k = pop(lt, 'snappy'); g.save(); g.scale(0.92 + 0.08 * k, 0.92 + 0.08 * k); g.globalAlpha *= clamp(lt / 0.1 + 0.2); paper(g, -w / 2, -h / 2, w, h, 22, { lift });
      g.save(); rr(g, -w / 2, -h / 2, w, h, 22); g.clip(); g.fillStyle = theme.navy; g.fillRect(-w / 2, -h / 2, w, 100); g.restore(); txt(g, p.head, 0, -h / 2 + 52, F.hero(56), theme.paper);
      const u = clamp(lin(t, p.at, p.at + p.dur)), hrs = u >= 1 ? p.hours : Math.min(p.hours, ease.inOut(u) * p.hours); const o = { font: F.hero(170), size: 170, color: theme.badInk, speed: p.hours / p.dur * 0.5 }; const nw = B.rollWidth(g, p.hours, o).w, uw = MCw(' HRS', F.hero(64)), tot = nw + uw;
      g.save(); g.translate(0, -h / 2 + 200); B.roll(g, Math.round(hrs), -tot / 2, 0, { ...o, align: 'left' }); txt(g, ' HRS', -tot / 2 + nw, 34, F.hero(64), theme.badInk, 'left'); g.restore();
      for (let i = 0; i < 6; i++) { const y = -h / 2 + 320 + i * 52, f = clamp((hrs - i * 40) / 40); g.fillStyle = theme.paperShade; rr(g, -w / 2 + 120, y, w - 240, 38, 8); g.fill(); if (f > 0) { g.fillStyle = i < 5 ? theme.badInk : '#F2B705'; rr(g, -w / 2 + 120, y, (w - 240) * f, 38, 8); g.fill(); } txt(g, 'WK ' + (i + 1), -w / 2 + 60, y + 20, F.monoX(22), theme.inkSoft); if (f >= 1) txt(g, '40 H', w / 2 - 80, y + 20, F.monoX(22), theme.inkSoft); }
      txt(g, p.foot, 0, h / 2 - 34, F.mono(20), theme.inkSoft); g.restore();
    },
  });
  const MCc = document.createElement('canvas').getContext('2d'); const MCw = (s, f) => { MCc.font = f; return MCc.measureText(s).width; };
})();
