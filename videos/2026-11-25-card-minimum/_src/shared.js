// ---- custom recipes for the credit-card-minimum cuts (registered with BM2.register; same v2 look: paper, clay, no glow) ----
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, countAt, wobble, hit } = B;
  const tone = (n, p) => B.tone(n, p);
  const M = document.createElement('canvas').getContext('2d'); const measure = (s, f) => { M.font = f; return M.measureText(s).width; };
  const NOW = 1e9; const at0 = v => (v == null ? NOW : v);

  // plastic card: navy credit card (no bank names, no logos)
  B.register('plastic', {
    defaults: { w: 520, h: 320 }, size: p => [p.w, p.h],
    draw(g, p, env) { const w = p.w, h = p.h, th = env.theme;
      B.shadowed(g, () => rr(g, -w / 2, -h / 2, w, h, 30), th.navy, env.lift);
      g.save(); rr(g, -w / 2, -h / 2, w, h, 30); g.clip();
      const lg = g.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2); lg.addColorStop(0, '#4a64a0'); lg.addColorStop(0.55, '#2c3e66'); lg.addColorStop(1, '#1a2744'); g.fillStyle = lg; g.fillRect(-w / 2, -h / 2, w, h);
      g.strokeStyle = 'rgba(255,255,255,.07)'; g.lineWidth = 34; for (let i = 0; i < 3; i++) { g.beginPath(); g.arc(w * 0.55, h * 0.9, 150 + i * 70, 3.3, 5.0); g.stroke(); }
      g.restore();
      clay(g, -w / 2 + 52, -h / 2 + 96, 92, 68, 12, '#F2B705', { shadowK: 0.4 }); g.strokeStyle = 'rgba(90,63,8,.55)'; g.lineWidth = 3; g.beginPath(); g.moveTo(-w / 2 + 52, -h / 2 + 130); g.lineTo(-w / 2 + 144, -h / 2 + 130); g.moveTo(-w / 2 + 98, -h / 2 + 96); g.lineTo(-w / 2 + 98, -h / 2 + 164); g.stroke();
      txt(g, 'CREDIT CARD', -w / 2 + 52, -h / 2 + 52, F.cap(28), 'rgba(245,243,238,.85)', 'left');
      txt(g, '4821  0000  0000  0000'.replace(/0/g, '•'), -w / 2 + 52, h / 2 - 96, F.monoX(34), th.paper, 'left');
      txt(g, 'YOU', -w / 2 + 52, h / 2 - 48, F.mono(24), 'rgba(245,243,238,.7)', 'left');
      g.strokeStyle = 'rgba(255,255,255,.5)'; g.lineWidth = 1.5; rr(g, -w / 2 + 1, -h / 2 + 1, w - 2, h - 2, 30); g.stroke(); },
  });

  // stmt: the monthly statement with the MINIMUM PAYMENT DUE box and the fine print
  B.register('stmt', {
    defaults: { w: 640, h: 740, balAt: NOW, aprAt: NOW, dueAt: NOW, fineAt: NOW, fine1At: NOW, fine2At: NOW, due: '$143.17', bal: '$5,000.00', apr: '22.36%' },
    size: p => [p.w, p.h],
    anchors: p => { const t = -p.h / 2; return { head: [0, t + 55, p.w, 110], bal: [0, t + 170, p.w * 0.94, 64], apr: [0, t + 245, p.w * 0.94, 64], due: [0, t + 420, p.w * 0.92, 230], fine: [0, t + 630, p.w * 0.92, 150] }; },
    draw(g, p, env) { const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2;
      paper(g, x0, y0, w, h, 20, { lift });
      g.save(); rr(g, x0, y0, w, h, 20); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 110); const hg = g.createLinearGradient(0, y0, 0, y0 + 110); hg.addColorStop(0, 'rgba(255,255,255,.12)'); hg.addColorStop(1, 'rgba(0,0,0,.14)'); g.fillStyle = hg; g.fillRect(x0, y0, w, 110); g.restore();
      txt(g, 'CREDIT CARD STATEMENT', x0 + 36, y0 + 55, F.hero(42), theme.paper, 'left');
      const row = (lab, val, y, at, tn, id) => { const on = t - at, k = on > 0 ? spring(on, 'snappy') : 0, isHot = env.hot === id, s = 1 + 0.12 * k * (1 - clamp(on - 0.2)) * 0 + (isHot ? 0.07 * env.hotK : 0);
        txt(g, lab, x0 + 40, y, F.mono(26), theme.inkSoft, 'left'); const vf = F.monoX(40), shown = on > 0 ? val : '• • • • •', vw = measure(shown, vf);
        g.save(); g.translate(x0 + w - 40, y); g.scale(s, s); if (on > 0) marker(g, -vw - 10, -28, vw + 20, 56, tone(tn, true), clamp(on / 0.3), 0.24); txt(g, shown, 0, 2, vf, on > 0 ? tone(tn, true) : theme.rule, 'right'); g.restore(); };
      row('NEW BALANCE', p.bal, y0 + 170, p.balAt, 'ink', 'bal'); row('APR', p.apr, y0 + 245, p.aprAt, 'bad', 'apr');
      g.strokeStyle = theme.rule; g.lineWidth = 3; g.setLineDash([10, 9]); g.beginPath(); g.moveTo(x0 + 36, y0 + 298); g.lineTo(x0 + w - 36, y0 + 298); g.stroke(); g.setLineDash([]);
      // minimum payment due box
      const bw = w * 0.92, bh = 220, by = y0 + 420, don = t - p.dueAt, dk = don > 0 ? spring(don, 'snappy') : 0, hotS = env.hot === 'due' ? 0.04 * env.hotK : 0;
      g.save(); g.translate(0, by); g.scale(1 + hotS, 1 + hotS); g.fillStyle = rgba(theme.bad, 0.07 + 0.08 * clamp(don / 0.3)); rr(g, -bw / 2, -bh / 2, bw, bh, 14); g.fill(); g.strokeStyle = tone('bad', true); g.lineWidth = 6; rr(g, -bw / 2, -bh / 2, bw, bh, 14); g.stroke();
      txt(g, 'MINIMUM PAYMENT DUE', 0, -bh / 2 + 44, F.cap(30), theme.ink); const vf = F.hero(120), vw = measure(p.due, vf); g.save(); g.translate(0, 18); g.scale(1 + 0.12 * dk * (1 - clamp(don - 0.25)), 1 + 0.12 * dk * (1 - clamp(don - 0.25))); if (don > 0) marker(g, -vw / 2 - 12, -62, vw + 24, 124, tone('bad', true), clamp(don / 0.3), 0.22); txt(g, p.due, 0, 4, vf, tone('bad', true)); g.restore();
      txt(g, 'MONTH 1 · ' + p.balLabel, 0, bh / 2 - 26, F.mono(20), theme.inkSoft); g.restore();
      // fine print
      const fw = w * 0.92, fh = 150, fy = y0 + 630, fon = t - p.fineAt, fk = fon > 0 ? clamp(fon / 0.25) : 0;
      g.save(); g.translate(0, fy); g.fillStyle = rgba(theme.accent === '#FFD60A' ? '#FFD60A' : theme.accent, 0.16 * fk); rr(g, -fw / 2, -fh / 2, fw, fh, 10); g.fill(); g.strokeStyle = fk > 0 ? tone('accent', true) : theme.inkSoft; g.lineWidth = fk > 0 ? 4 : 2.5; g.setLineDash(fk > 0 ? [] : [8, 7]); rr(g, -fw / 2, -fh / 2, fw, fh, 10); g.stroke(); g.setLineDash([]);
      txt(g, 'THE FINE PRINT', -fw / 2 + 20, -fh / 2 + 20, F.mono(16), theme.inkSoft, 'left');
      const L = [['MINIMUM PAYMENT = 1% OF BALANCE', p.fine1At, 'accent', -20], ["+ THAT MONTH'S INTEREST", p.fine2At, 'bad', 14], ['(FLOOR: $35)', NOW, 'ink', 46]];
      L.forEach(([s, at, tn, y]) => { const on = t - at, f = F.monoX(22), tw = measure(s, f); if (on > 0) marker(g, -fw / 2 + 16, y - 15, tw + 20, 30, tone(tn, true), clamp(on / 0.3), 0.3); txt(g, s, -fw / 2 + 26, y, f, on > 0 ? theme.ink : theme.inkSoft, 'left'); });
      g.restore(); },
  });
  B.elements.stmt.defaults.balLabel = '$5,000 AT 22.36%';

  // paybar: the payment bar that splits into a big red INTEREST part and a green DEBT part (true proportions)
  B.register('paybar', {
    defaults: { w: 880, h: 140, total: 143.17, intr: 93.17, debt: 50, fillAt: NOW, splitAt: NOW, gap: 52, label: 'YOUR PAYMENT' },
    size: p => [p.w + 120, 560],
    anchors: p => { const wi = p.w * p.intr / p.total, wd = p.w * p.debt / p.total, g = p.gap; return { total: [0, -190, p.w * 0.8, 260], int: [-p.w / 2 + wi / 2 - g / 2, 120, wi + 80, 330], debt: [p.w / 2 - wd / 2 + g / 2, 110, wd + 120, 360], bar: [0, 60, p.w + 100, 400] }; },
    draw(g, p, env) { const { t, theme } = env, w = p.w, h = p.h, wi = w * p.intr / p.total, wd = w - wi, fon = t - p.fillAt, son = t - p.splitAt, fk = fon > 0 ? ease.out(lin(fon, 0, 0.8)) : 0, sk = son > 0 ? spring(son, { f: 2.2, z: 0.45 }) : 0, gap = p.gap * sk;
      txt(g, p.label, 0, -300, F.cap(32), rgba(theme.paper, 0.8));
      const tv = { font: F.hero(124), size: 124, color: theme.paper, prefix: '$', decimals: 2 }; roll(g, p.total, 0, -190, tv);
      const x0 = -w / 2, xi0 = x0 - gap / 2, xd0 = x0 + wi + gap / 2, by = -h / 2 + 60;
      // base bar (neutral clay) then the red fill sweeps over the interest share
      if (son <= 0) { clay(g, x0, by, w, h, 26, '#8190AD', { lift: 0.2 }); if (fk > 0) { g.save(); rr(g, x0, by, w, h, 26); g.clip(); clay(g, x0 - 40, by, 40 + wi * fk, h, 26, theme.bad, { shadowK: 0.3 }); g.restore(); } }
      else { clay(g, xi0, by, wi, h, 26, theme.bad, { shadowK: 0.7 });
        const lift = 44 * sk + 6 * wobble(son, 5, 6), sc = 1 + 0.07 * sk; g.save(); g.translate(xd0 + wd / 2, by + h / 2 - lift); g.scale(sc, sc); clay(g, -wd / 2, -h / 2, wd, h, 26, B.mix('#8190AD', theme.good, clamp(son / 0.2)), { lift: 0.5, shadowK: 0.8 }); g.restore(); }
      if (fon > 0) { const ix = (son > 0 ? xi0 : x0) + wi / 2, iv = countAt(fon, 0.8, 0, p.intr), isp = fon < 0.8 ? p.intr / 0.8 : 0;
        txt(g, 'INTEREST', ix, by + h + 56, F.cap(32), tone('bad', false)); roll(g, iv, ix, by + h + 132, { font: F.hero(96), size: 96, color: tone('bad', false), prefix: '$', decimals: 2, speed: isp }); burst(g, ix, by + h + 132, 110, tone('bad', false), fon - 0.8, 12, 0.45); }
      if (son > 0) { const dx = xd0 + wd / 2, dv = countAt(son, 0.6, 0, p.debt); g.save(); g.globalAlpha *= clamp(son / 0.12);
        txt(g, 'DEBT DROPS', dx, by + h + 56 - 44 * sk * 0, F.cap(32), tone('good', false)); roll(g, dv, dx, by + h + 132, { font: F.hero(96), size: 96, color: tone('good', false), prefix: '−$', decimals: 2, speed: son < 0.6 ? p.debt / 0.6 : 0 }); g.restore(); burst(g, dx, by + h / 2 - 40, 140, tone('good', false), son - 0.05, 16, 0.55); } },
  });

  // cal: a wall calendar whose pages flip fast, then the balance still owed
  B.register('cal', {
    defaults: { w: 620, h: 780, from: 2026, to: 2031, flipAt: NOW, per: 0.2, owedAt: NOW, owed: 2736, start: 5000, dur: 0.95 }, ownEnter: false,
    size: p => [p.w, p.h],
    anchors: p => ({ page: [0, -p.h / 2 + 250, p.w, 500], owed: [0, p.h / 2 - 140, p.w, 230] }),
    draw(g, p, env) { const { t, theme } = env, w = p.w, ph = 500, x0 = -w / 2, y0 = -p.h / 2, N = p.to - p.from, f = (t - p.flipAt) / p.per, idx = f < 0 ? 0 : Math.min(Math.floor(f), N), u = f < 0 || idx >= N ? 0 : f - idx;
      const page = (yr, n) => { paper(g, x0, y0, w, ph, 18, { lift: env.lift }); g.save(); rr(g, x0, y0, w, ph, 18); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 96); g.restore();
        for (let i = 0; i < 2; i++) { g.fillStyle = '#0B0F14'; g.beginPath(); g.arc(-110 + i * 220, y0 + 22, 11, 0, 7); g.fill(); }
        txt(g, (n ? 'YEAR ' + n : 'TODAY'), x0 + 34, y0 + 58, F.monoX(34), theme.paper, 'left'); txt(g, String(yr), 0, y0 + 270, F.hero(260), theme.ink);
        g.fillStyle = theme.rule; for (let r = 0; r < 3; r++) for (let c = 0; c < 10; c++) { g.beginPath(); g.arc(x0 + 70 + c * ((w - 140) / 9), y0 + 410 + r * 28, 5, 0, 7); g.fill(); } };
      const yr0 = p.from + idx; if (idx < N && u > 0) { page(yr0 + 1, idx + 1); g.save(); g.translate(0, y0); const c = Math.cos(u * Math.PI / 2); g.scale(1, Math.max(0.001, c)); g.translate(0, -y0); g.rotate(-0.015 * u); page(yr0, idx); g.fillStyle = 'rgba(0,0,0,' + (0.35 * u) + ')'; rr(g, x0, y0, w, ph, 18); g.fill(); g.restore(); }
      else { const lk = idx >= N ? spring(t - p.flipAt - N * p.per, { f: 3, z: 0.4 }) : 1; g.save(); g.translate(0, (1 - lk) * -10); page(yr0, idx); g.restore(); }
      // owed panel
      const oy = p.h / 2 - 140, oh = 210, on = t - p.owedAt, k = on > 0 ? spring(on, 'snappy') : 0; paper(g, x0, oy - oh / 2, w, oh, 18, { fill: theme.navy, lift: env.lift });
      txt(g, 'STILL OWED', 0, oy - 62, F.cap(34), rgba(theme.paper, 0.85)); const v = on > 0 ? countAt(on, p.dur, p.start, p.owed) : p.start, land = on - p.dur, s = 1 + (land > 0 ? 0.1 * (1 - spring(land, { f: 2.4, z: 0.42 })) : 0) + (env.hot === 'owed' ? 0.03 * env.hotK : 0);
      g.save(); g.translate(0, oy + 22); g.scale(s, s); roll(g, v, 0, 0, { font: F.hero(124), size: 124, color: land > 0 ? theme.bad : theme.paper, prefix: '$', decimals: 0, speed: on > 0 && land < 0 ? Math.abs(p.start - p.owed) / p.dur : 0 }); g.restore(); burst(g, 0, oy + 22, 190, theme.bad, land, 18, 0.55); },
  });

  // track: a 2026-2043 timeline strip that fills to the payoff, plus a ghost run for the fixed payment
  B.register('track', {
    defaults: { w: 940, years: 17, y0: 2026, months: 198, fillAt: NOW, fillDur: 1.2, ghostAt: NOW, ghostDur: 1.0, ghostMonths: 26, ghostLabel: 'FIXED $250 / MONTH → 26 MONTHS', tagAt: NOW, tag: 'SAME MATH, DIFFERENT PAYMENT', label: 'ONLY PAYING THE MINIMUM', big: 16.5 },
    size: p => [p.w + 100, 720],
    anchors: p => ({ years: [0, -190, p.w * 0.85, 250], strip: [0, 40, p.w + 60, 150], ghost: [-p.w / 2 + 300, 195, 700, 130], end: [p.w * 0.43, 40, 220, 160], tag: [0, 300, p.w, 90] }),
    draw(g, p, env) { const { t, theme } = env, w = p.w, span = p.years * 12, x0 = -w / 2, sy = 40, sh = 70, fon = t - p.fillAt, fp = fon > 0 ? ease.out(lin(fon, 0, p.fillDur)) : 0;
      txt(g, p.label, 0, -355, F.cap(32), rgba(theme.paper, 0.8));
      const v = p.big * fp, cf = F.hero(210); g.font = cf; const cw = B.rollWidth(g, p.big, { font: cf, decimals: 1 }).w + g.measureText(' YEARS').width; roll(g, v, -cw / 2, -200, { font: cf, size: 210, color: tone('bad', false), decimals: 1, suffix: ' YEARS', align: 'left', speed: fp > 0 && fp < 0.98 ? p.big / p.fillDur : 0 });
      const lp = fon - p.fillDur; burst(g, 0, -200, 260, tone('bad', false), lp, 18, 0.55);
      g.fillStyle = rgba(theme.paper, 0.14); rr(g, x0, sy, w, sh, 20); g.fill();
      const fw = w * p.months / span * fp; if (fw > 4) { g.save(); rr(g, x0, sy, w, sh, 20); g.clip(); clay(g, x0 - 40, sy, 40 + fw, sh, 20, theme.bad, { shadowK: 0.3 }); g.restore(); const hx = x0 + fw; g.fillStyle = theme.paper; g.beginPath(); g.arc(hx, sy + sh / 2, 17, 0, 7); g.fill(); }
      for (let i = 0; i <= p.years; i++) { const x = x0 + w * i / p.years, big = i === 0 || i === p.years || [4, 9, 14].includes(i); g.strokeStyle = rgba(theme.paper, big ? 0.7 : 0.3); g.lineWidth = big ? 4 : 2.5; g.beginPath(); g.moveTo(x, sy + sh + 8); g.lineTo(x, sy + sh + (big ? 26 : 18)); g.stroke(); if (big) txt(g, String(p.y0 + i), x, sy + sh + 52, F.monoX(26), rgba(theme.paper, 0.9)); }
      const gon = t - p.ghostAt; if (gon > 0) { const gp = ease.out(lin(gon, 0, p.ghostDur)), gw = w * p.ghostMonths / span, gy = 205, gh = 36; g.save(); g.globalAlpha *= clamp(gon / 0.1); g.fillStyle = rgba(theme.paper, 0.1); rr(g, x0, gy, w, gh, 14); g.fill(); g.restore();
        clay(g, x0, gy, Math.max(8, gw * gp), gh, 14, theme.good, { shadowK: 0.4 }); const hx = x0 + gw * gp; g.fillStyle = theme.paper; g.beginPath(); g.arc(hx, gy + gh / 2, 15, 0, 7); g.fill();
        const ld = gon - p.ghostDur; g.save(); g.globalAlpha *= clamp(gon / 0.25); txt(g, p.ghostLabel, x0, gy + 78, F.cap(31), tone('good', false), 'left'); g.restore(); burst(g, x0 + gw, gy + gh / 2, 70, tone('good', false), ld, 12, 0.45);
        if (ld > 0) { const k = spring(ld, 'bouncy'); g.save(); g.translate(x0 + gw + 34, gy + gh / 2 + 2); g.scale(k, k); txt(g, '✓ DONE', 0, 0, F.cap(30), tone('good', false), 'left'); g.restore(); } }
      const ton = t - p.tagAt; if (ton > 0) { const k = spring(ton, 'snappy'), tw = measure(p.tag, F.cap(36)) + 60; g.save(); g.translate(0, 330 + (1 - k) * 30); g.globalAlpha *= clamp(ton / 0.12); paper(g, -tw / 2, -34, tw, 68, 12, { lift: env.lift }); txt(g, p.tag, 0, 2, F.cap(36), theme.ink); g.restore(); } },
  });

  // bigstamp: multi-line stamp (slams in)
  B.register('bigstamp', {
    defaults: { lines: ['STAMP'], tone: 'bad', size: 96, fill: 'paper' }, enter: 'slam',
    size: p => [Math.max(...p.lines.map(l => measure(l, F.hero(p.size)))) + p.size * 0.9, p.lines.length * p.size * 1.08 + p.size * 0.6],
    draw(g, p, { lt, lift }) { const [w, h] = this.size(p), col = tone(p.tone, true);
      paper(g, -w / 2, -h / 2, w, h, p.size * 0.14, { fill: tone(p.fill), lift }); g.strokeStyle = col; g.lineWidth = p.size * 0.07; rr(g, -w / 2 + 12, -h / 2 + 12, w - 24, h - 24, p.size * 0.09); g.stroke();
      p.lines.forEach((l, i) => txt(g, l, 0, (i - (p.lines.length - 1) / 2) * p.size * 1.08 + p.size * 0.04, F.hero(p.size), col)); burst(g, 0, 0, w * 0.62, tone(p.tone, false), lt - 0.16, 16, 0.45); },
  });

  // plane: paper plane flying across the screen (screen layer, absolute coordinates)
  B.register('plane', {
    defaults: { from: [120, 1050], to: [1180, 300], dur: 1.5, s: 1 }, ownEnter: true, size: () => [10, 10],
    draw(g, p, env) { const lt = env.lt, u = clamp(lt / p.dur), e = ease.inOut(u), [x0, y0] = p.from, [x1, y1] = p.to, cx = (x0 + x1) / 2 - 80, cy = Math.max(y0, y1) + 160;
      const P = k => { const a = (1 - k) * (1 - k), b = 2 * (1 - k) * k, c = k * k; return [a * x0 + b * cx + c * x1, a * y0 + b * cy + c * y1]; };
      g.strokeStyle = rgba(env.theme.paper, 0.5); g.lineWidth = 5; g.setLineDash([4, 18]); g.lineCap = 'round'; g.beginPath(); for (let i = 0; i <= 24; i++) { const [px, py] = P(e * i / 24); i ? g.lineTo(px, py) : g.moveTo(px, py); } g.stroke(); g.setLineDash([]);
      const [px, py] = P(e), [qx, qy] = P(Math.min(1, e + 0.02)), a = Math.atan2(qy - py, qx - px), s = p.s * (1 + 0.35 * Math.sin(Math.PI * u) - 0.25 * u);
      g.save(); g.translate(px, py); g.rotate(a); g.scale(s, s); const sh = () => { g.beginPath(); g.moveTo(70, 0); g.lineTo(-60, -44); g.lineTo(-34, 0); g.lineTo(-60, 44); g.closePath(); };
      B.shadowed(g, sh, '#F5F3EE', 0.5); g.fillStyle = '#F5F3EE'; sh(); g.fill(); g.fillStyle = '#D8D3C7'; g.beginPath(); g.moveTo(70, 0); g.lineTo(-34, 0); g.lineTo(-60, 44); g.closePath(); g.fill(); g.strokeStyle = 'rgba(11,15,20,.35)'; g.lineWidth = 2; g.beginPath(); g.moveTo(70, 0); g.lineTo(-34, 0); g.stroke(); g.restore(); },
  });

  // bookmark: save icon that fills gold when pressed (screen layer)
  B.register('bookmark', {
    defaults: { press: 0.6, label: 'SAVE' }, size: () => [200, 280],
    draw(g, p, env) { const lt = env.lt, on = lt - p.press, done = on > 0, k = done ? spring(on, 'bouncy') : 0, s = 1 + 0.18 * k * (1 - clamp(on - 0.3)) - 0.08 * hit(lt - p.press, 14) * (lt >= p.press ? 1 : 0);
      g.scale(s, s); const path = () => { g.beginPath(); g.moveTo(-70, -110); g.lineTo(70, -110); g.lineTo(70, 100); g.lineTo(0, 50); g.lineTo(-70, 100); g.closePath(); };
      B.shadowed(g, path, done ? '#F2B705' : '#F5F3EE', 0.5); g.fillStyle = done ? '#F2B705' : '#F5F3EE'; path(); g.fill(); g.save(); path(); g.clip(); const lg = g.createLinearGradient(-70, -110, 70, 100); lg.addColorStop(0, 'rgba(255,255,255,.3)'); lg.addColorStop(1, 'rgba(0,0,0,.14)'); g.fillStyle = lg; g.fillRect(-70, -110, 140, 220); g.restore();
      if (done) { g.strokeStyle = '#0B0F14'; g.lineWidth = 12; g.lineCap = 'round'; g.lineJoin = 'round'; const q = ease.out(lin(on, 0.05, 0.3)); g.beginPath(); g.moveTo(-28, -30); g.lineTo(-6 + 0 * q, -4); g.lineTo(-6 + 40 * q, -4 - 44 * q); g.stroke(); burst(g, 0, -10, 110, '#F2B705', on - 0.05, 14, 0.5); }
      txt(g, p.label, 0, 150, F.cap(36), env.theme.paper); },
  });
})();
