// ===== The 1% fee — shared custom recipes (registered via BM2.register; prepended to each cut's scene.js) =====
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, hash, hit } = B;
  const tone = (n, p) => B.tone(n, p);
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const fmt = v => '$' + B.fmtNum(Math.round(v), 0, true);
  // future value of $500/month at annual rate r after `yrs` years (monthly compounding) — research.md formula
  const fv = (r, yrs) => { const i = r / 12, n = 12 * yrs; return n <= 0 ? 0 : 500 * (Math.pow(1 + i, n) - 1) / i; };
  const AMAX = fv(0.07, 40);
  window.FV = fv;

  // ---------- plan: THE SETUP card (funds, deposit strip, assumptions) ----------
  B.register('plan', {
    defaults: { w: 800, h: 900, aAt: -1, bAt: -1, feeAt: -1, depAt: -1, putAt: -1, rateAt: -1 },
    size: p => [p.w, p.h],
    anchors: p => ({ head: [0, -p.h / 2 + 64, p.w, 128], funds: [0, -p.h / 2 + 305, p.w * 0.94, 290], fa: [0, -p.h / 2 + 235, p.w * 0.94, 130], fb: [0, -p.h / 2 + 375, p.w * 0.94, 130], dep: [0, -p.h / 2 + 545, p.w * 0.94, 120], put: [0, -p.h / 2 + 650, p.w * 0.8, 90], assume: [0, -p.h / 2 + 800, p.w * 0.94, 190] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2;
      paper(g, x0, y0, w, h, 26, { lift });
      g.save(); rr(g, x0, y0, w, h, 26); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 128); const hg = g.createLinearGradient(0, y0, 0, y0 + 128); hg.addColorStop(0, 'rgba(255,255,255,.12)'); hg.addColorStop(1, 'rgba(0,0,0,.14)'); g.fillStyle = hg; g.fillRect(x0, y0, w, 128); g.restore();
      txt(g, 'TWO IDENTICAL FUNDS', x0 + 40, y0 + 54, F.hero(50), theme.paper, 'left'); txt(g, 'THE SETUP · HYPOTHETICAL', x0 + 42, y0 + 98, F.mono(22), rgba(theme.paper, 0.78), 'left');
      // fund rows
      const row = (y, at, name, rate, col, fee, feeAt) => { const on = t - at, k = on > -0.5 && at > -0.5 ? spring(on, 'snappy') : 0, bx = x0 + 36, bw = w - 72, bh = 118;
        if (at < -0.5 || on < 0) { g.fillStyle = theme.paperShade; rr(g, bx, y - bh / 2, bw, bh, 18); g.fill(); g.fillStyle = theme.rule; rr(g, bx + 28, y - 14, 220, 28, 14); g.fill(); return; }
        g.save(); g.translate(0, y); g.scale(0.9 + 0.1 * k, 0.9 + 0.1 * k); g.globalAlpha *= clamp(on / 0.1); clay(g, bx, -bh / 2, bw, bh, 18, col, { shadowK: 0.6 });
        txt(g, name, bx + 30, -22, F.hero(54), theme.ink, 'left'); txt(g, rate, bx + 32, 28, F.monoX(30), theme.ink, 'left');
        if (fee && feeAt > -0.5 && t >= feeAt) { const fo = t - feeAt, fk = spring(fo, 'bouncy'), f = F.cap(34), tw = mw('1% FEE', f) + 44; g.save(); g.translate(bx + bw - 30 - tw / 2, 0); g.scale(0.4 + 0.6 * fk, 0.4 + 0.6 * fk); clay(g, -tw / 2, -30, tw, 60, 30, theme.bad, { shadowK: 0.5 }); txt(g, '1% FEE', 0, 2, f, theme.paper); g.restore(); burst(g, bx + bw - 30 - tw / 2, y, 90, theme.bad, fo, 14, 0.5); }
        else if (!fee) txt(g, 'FEE ~0%', bx + bw - 32, 2, F.monoX(30), theme.ink, 'right');
        g.restore(); };
      row(y0 + 235, p.aAt, 'FUND A', '7% A YEAR', theme.good, false);
      row(y0 + 375, p.bAt, 'FUND B', '7% − 1% = 6% A YEAR', theme.gold, true, p.feeAt);
      // deposit strip
      const dy = y0 + 545, don = t - p.depAt, dk = p.depAt > -0.5 ? spring(don, 'snappy') : 1;
      if (p.depAt > -0.5 && don < 0) { g.fillStyle = theme.paperShade; rr(g, x0 + 36, dy - 56, w - 72, 112, 18); g.fill(); }
      else { g.save(); g.translate(0, dy); g.scale(0.92 + 0.08 * dk, 0.92 + 0.08 * dk); clay(g, x0 + 36, -56, w - 72, 112, 18, theme.ink, { shadowK: 0.6 }); txt(g, '$500 / MONTH × 40 YEARS', 0, -4, F.hero(52), theme.paper);
        if (p.depAt > -0.5) burst(g, 0, 0, w * 0.4, theme.accent, don, 14, 0.4); g.restore(); }
      // put in
      const pon = t - p.putAt; if (p.putAt < -0.5 || pon >= 0) { const k = p.putAt < -0.5 ? 1 : spring(pon, 'bouncy'); g.save(); g.translate(0, y0 + 650); g.scale(0.7 + 0.3 * k, 0.7 + 0.3 * k); g.globalAlpha *= p.putAt < -0.5 ? 1 : clamp(pon / 0.1);
        txt(g, 'YOU PUT IN  $240,000', 0, 0, F.hero(50), theme.goodInk); if (p.putAt > -0.5) marker(g, -250, 18, 500, 6, theme.goodInk, clamp((pon - 0.1) / 0.3), 0.9); g.restore(); }
      // assumptions (always on)
      g.strokeStyle = theme.rule; g.lineWidth = 3; g.setLineDash([10, 9]); g.beginPath(); g.moveTo(x0 + 40, y0 + 710); g.lineTo(x0 + w - 40, y0 + 710); g.stroke(); g.setLineDash([]);
      const rt = t - p.rateAt, rk = p.rateAt > -0.5 && rt > 0 ? 1 : 0;
      if (rk) marker(g, -w * 0.4, y0 + 750 - 20, w * 0.8, 40, theme.accent, clamp(rt / 0.3), 0.3);
      txt(g, '7% IS AN ASSUMPTION, NOT A FORECAST', 0, y0 + 750, F.monoX(27), theme.ink);
      txt(g, 'MONTHLY COMPOUNDING · NO TAXES', 0, y0 + 800, F.mono(25), theme.inkSoft);
      txt(g, 'NOT FINANCIAL ADVICE · NO REAL FUNDS', 0, y0 + 842, F.mono(25), theme.inkSoft);
    },
  });

  // ---------- twin: two identical funds growing side by side, year ticker, gap tag, ghost block ----------
  B.register('twin', {
    defaults: { w: 900, h: 1100, ticker: [[0, 0]], gaps: [], ghostAt: 99999, tagFinal: false, feeTagAt: -1, ripAt: 99999, chips: null, depAt: -1, rateAt: -1, bpAt: -1, bpOut: 99999, coinAt: -1 },
    size: p => [p.w, p.h],
    anchors: p => ({ head: [0, -485, 900, 130], year: [270, -485, 340, 120], tag: [0, -300, 840, 110], btag: [185, 507, 340, 100], base: [0, 335, 780, 210], tops: [0, -150, 780, 230], ghost: [185, -92, 330, 190], cols: [0, 110, 780, 640], names: [0, 485, 780, 130] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, K = p.ticker;
      // year ticker: eased between keyframes
      let yr = K[0][1], land = -9; for (let i = 0; i < K.length - 1; i++) { const a = K[i], b = K[i + 1]; if (t >= b[0]) { yr = b[1]; if (b[1] !== a[1]) land = t - b[0]; } else if (t > a[0]) { yr = lerp(a[1], b[1], ease.inOut(lin(t, a[0], b[0]))); break; } else break; }
      const speed = (() => { for (let i = 0; i < K.length - 1; i++) if (t > K[i][0] && t < K[i + 1][0]) return Math.abs(K[i + 1][1] - K[i][1]) / (K[i + 1][0] - K[i][0]); return 0; })();
      const wob = land > 0 && land < 0.7 ? 1 + 0.03 * Math.exp(-land * 8) * Math.cos(land * 24) : 1;
      paper(g, x0, y0, w, h, 28, { lift });
      g.save(); rr(g, x0, y0, w, h, 28); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 130); const hg = g.createLinearGradient(0, y0, 0, y0 + 130); hg.addColorStop(0, 'rgba(255,255,255,.12)'); hg.addColorStop(1, 'rgba(0,0,0,.14)'); g.fillStyle = hg; g.fillRect(x0, y0, w, 130); g.restore();
      txt(g, 'TWO IDENTICAL FUNDS', x0 + 36, y0 + 52, F.hero(40), theme.paper, 'left'); txt(g, 'HYPOTHETICAL · NO REAL FUNDS', x0 + 38, y0 + 96, F.mono(21), rgba(theme.paper, 0.75), 'left');
      g.save(); g.font = F.hero(40); txt(g, 'YEAR', x0 + w - 200, y0 + 68, F.hero(40), rgba(theme.paper, 0.8), 'right'); roll(g, Math.round(yr), x0 + w - 36, y0 + 68, { font: F.hero(84), size: 84, color: theme.accent, align: 'right', speed: speed > 6 ? speed * 0.4 : 0 }); g.restore();
      // progress rail 0..40
      const rx0 = x0 + 60, rx1 = x0 + w - 60, ry = y0 + 166; g.strokeStyle = theme.rule; g.lineWidth = 10; g.lineCap = 'round'; g.beginPath(); g.moveTo(rx0, ry); g.lineTo(rx1, ry); g.stroke();
      if (yr > 0.05) { g.strokeStyle = theme.accentInk; g.beginPath(); g.moveTo(rx0, ry); g.lineTo(lerp(rx0, rx1, yr / 40), ry); g.stroke(); }
      for (const m of [0, 10, 20, 30, 40]) { const mx = lerp(rx0, rx1, m / 40); g.fillStyle = yr >= m - 0.01 ? theme.accentInk : theme.inkSoft; g.beginPath(); g.arc(mx, ry, 8, 0, 7); g.fill(); txt(g, String(m), mx, ry + 30, F.mono(20), theme.inkSoft); }
      // plot
      const baseY = 400, H = 560, hA = fv(0.07, yr) / AMAX * H * wob, hB = fv(0.06, yr) / AMAX * H * wob, cw = 300, ax = -185, bx = 185;
      g.strokeStyle = rgba(theme.ink, 0.12); g.lineWidth = 2; g.setLineDash([8, 10]); for (const v of [250e3, 500e3, 750e3, 1e6, 1.25e6]) { const gy = baseY - v / AMAX * H; g.beginPath(); g.moveTo(x0 + 90, gy); g.lineTo(x0 + w - 40, gy); g.stroke(); txt(g, v >= 1e6 ? '$' + v / 1e6 + 'M' : '$' + v / 1e3 + 'K', x0 + 40, gy - 14, F.mono(20), theme.inkSoft, 'left'); } g.setLineDash([]);
      g.fillStyle = theme.ink; g.fillRect(x0 + 60, baseY, w - 120, 6);
      const col = (cx, hh, c) => { if (hh < 1) return; clay(g, cx - cw / 2, baseY - hh, cw, hh, 14, c, { shadowK: 0.6 }); g.save(); rr(g, cx - cw / 2, baseY - hh, cw, hh, 14); g.clip(); g.fillStyle = 'rgba(0,0,0,.10)'; for (let y = baseY - 26; y > baseY - hh; y -= 26) g.fillRect(cx - cw / 2, y, cw, 3); g.restore(); };
      // blueprint columns (same fund, same size) before the money flows
      if (p.bpAt > -0.5 && t >= p.bpAt && t < p.bpOut + 0.4) { const bt = t - p.bpAt, k = Math.max(0, spring(bt, 'bouncy')), kb = Math.max(0, spring(bt - 0.12, 'bouncy')), fo = 1 - ease.in(lin(t, p.bpOut, p.bpOut + 0.35)), bh = 330, wob = 1 + 0.025 * Math.sin(bt * 14) * Math.exp(-bt * 3);
        g.save(); g.globalAlpha *= clamp(bt / 0.1) * fo; for (const [cx, kk, c] of [[ax, k, theme.good], [bx, kb, theme.gold]]) { const hh = bh * kk * wob * (cx === bx && p.feeTagAt > -0.5 && t >= p.feeTagAt ? 1 - 0.14 * Math.min(1.1, spring(t - p.feeTagAt, 'bouncy')) : 1); g.fillStyle = rgba(c, 0.22); rr(g, cx - cw / 2, baseY - hh, cw, hh, 14); g.fill(); g.strokeStyle = c; g.lineWidth = 5; g.setLineDash([16, 10]); rr(g, cx - cw / 2, baseY - hh, cw, hh, 14); g.stroke(); g.setLineDash([]); }
        if (bt > 0.3 && !(p.feeTagAt > -0.5 && t >= p.feeTagAt)) txt(g, '= SAME', 0, baseY - bh * 0.5, F.hero(64), theme.ink); g.restore(); }
      // coins dripping into both columns while the clock runs
      if (speed > 0.25 || (p.coinAt > -0.5 && t >= p.coinAt && t < p.coinAt + 3)) for (let i = 0; i < 10; i++) { const ph = ((t * 1.7 + i / 10) % 1), cx = (i % 2 ? bx : ax) + (hash(i * 3.3) - 0.5) * 140, cy = lerp(baseY - 640, baseY - Math.max(40, (i % 2 ? hB : hA)) - 20, ph * ph); g.save(); g.globalAlpha *= Math.min(1, ph * 6) * (1 - lin(ph, 0.9, 1)); g.translate(cx, cy); g.scale(1, 0.55); g.fillStyle = '#8a6408'; g.beginPath(); g.arc(0, 8, 17, 0, 7); g.fill(); g.fillStyle = '#F2B705'; g.beginPath(); g.arc(0, 0, 17, 0, 7); g.fill(); g.strokeStyle = 'rgba(138,100,8,.7)'; g.lineWidth = 3; g.beginPath(); g.arc(0, 0, 10, 0, 7); g.stroke(); g.restore(); }
      // ghost block: what the fee takes from fund B
      g.save(); { const ru = lin(t, p.ripAt, p.ripAt + 0.5); if (ru > 0) { g.translate(bx, baseY - hA); g.rotate(0.28 * ru); g.translate(-bx + 330 * ru, -baseY + hA - 900 * ru * ru); g.globalAlpha *= 1 - ease.in(lin(ru, 0.6, 1)); } }
      const gapH = Math.max(0, hA - hB), gyTop = baseY - hA, gyBot = baseY - hB;
      if (gapH > 0.5) { g.save(); g.beginPath(); g.rect(bx - cw / 2, gyTop, cw, Math.max(gapH, 3)); g.clip(); g.fillStyle = rgba(theme.bad, 0.22); g.fillRect(bx - cw / 2, gyTop, cw, Math.max(gapH, 3)); g.strokeStyle = rgba(theme.bad, 0.55); g.lineWidth = 5; for (let k = -cw; k < cw + gapH; k += 22) { g.beginPath(); g.moveTo(bx - cw / 2 + k, gyTop + Math.max(gapH, 3)); g.lineTo(bx - cw / 2 + k + gapH + 6, gyTop - 3); g.stroke(); } g.restore();
        g.strokeStyle = theme.bad; g.lineWidth = 4; g.setLineDash([12, 8]); g.beginPath(); g.moveTo(ax - cw / 2 + 6, gyTop); g.lineTo(bx + cw / 2, gyTop); g.stroke(); g.setLineDash([]); g.fillStyle = theme.bad; g.fillRect(bx - cw / 2, Math.max(gyTop, gyBot - 4), cw, Math.min(4, Math.max(gapH, 3))); }
      g.restore();
      col(ax, hA, theme.good); col(bx, hB, theme.gold);
      roll(g, Math.round(fv(0.07, yr)), ax, baseY - hA - 46, { font: F.hero(56), size: 56, color: theme.goodInk, prefix: '$', speed: speed > 0 ? speed * 30000 : 0 });
      const bIn = hB > 130; roll(g, Math.round(fv(0.06, yr)), bx, bIn ? baseY - hB + 50 : baseY - hB - 46, { font: F.hero(56), size: 56, color: bIn ? theme.ink : theme.accentInk, prefix: '$', speed: speed > 0 ? speed * 30000 : 0 });
      // ghost label: the fee, in the ghost block
      if (t >= p.ghostAt) { const gt = t - p.ghostAt, k = spring(gt, 'bouncy'); g.save(); g.translate(bx, baseY - (hA + hB) / 2 + 2); g.scale(0.5 + 0.5 * k, 0.5 + 0.5 * k); g.globalAlpha *= clamp(gt / 0.1); clay(g, -cw / 2 + 4, -66, cw - 8, 132, 16, theme.bad, { shadowK: 0.6 }); txt(g, 'THE 1% FEE', 0, -34, F.monoX(24), theme.paper); roll(g, 316661 * ease.expo(lin(gt, 0, 0.9)), 0, 16, { font: F.hero(60), size: 60, color: theme.paper, prefix: '$', speed: lin(gt, 0, 0.9) < 1 ? 14000 : 0 }); g.restore(); burst(g, bx, baseY - (hA + hB) / 2, 200, theme.bad, gt - 0.05, 18, 0.55); }
      // names
      txt(g, 'FUND A', ax, baseY + 54, F.cap(40), theme.ink); txt(g, 'FEE ≈ 0%', ax, baseY + 100, F.monoX(26), theme.goodInk);
      txt(g, 'FUND B', bx, baseY + 54, F.cap(40), theme.ink);
      if (p.feeTagAt > -0.5 && t >= p.feeTagAt) { const ft = t - p.feeTagAt, k = spring(ft, 'bouncy'); g.save(); g.translate(bx, baseY + 107); g.rotate(-0.07 * (1 - k)); g.scale(0.3 + 0.7 * k, 0.3 + 0.7 * k); g.globalAlpha *= clamp(ft / 0.06); const f = F.monoX(30), tw = mw('+1% A YEAR', f) + 56; clay(g, -tw / 2, -27, tw, 54, 27, theme.bad, { shadowK: 0.6 }); g.fillStyle = theme.paper; g.beginPath(); g.arc(-tw / 2 + 24, 0, 7, 0, 7); g.fill(); txt(g, '+1% A YEAR', 10, 2, f, theme.paper); g.restore(); burst(g, bx, baseY + 107, 130, theme.bad, ft - 0.04, 12, 0.4); }
      // gap tag (fixed zone under the header): the latest callout
      let cur = null; for (const gp of p.gaps) if (t >= gp.at) cur = gp;
      if (!cur && p.chips) { const f = F.monoX(30), its = p.chips.map(([at, s1]) => [at, s1, mw(s1, f) + 48]), tot = its.reduce((a, i) => a + i[2] + 16, -16); let x = -tot / 2;
        for (const [at, s1, cw2] of its) { if (t >= at) { const ct = t - at, k = spring(ct, 'bouncy'); g.save(); g.translate(x + cw2 / 2, -300); g.scale(0.5 + 0.5 * k, 0.5 + 0.5 * k); g.globalAlpha *= clamp(ct / 0.08); clay(g, -cw2 / 2, -36, cw2, 72, 36, s1[0] === 'A' ? theme.navy : theme.ink, { shadowK: 0.6 }); txt(g, s1, 0, 2, f, s1[0] === 'A' ? theme.paper : theme.accent); g.restore(); burst(g, x + cw2 / 2, -300, 150, theme.accent, ct - 0.05, 10, 0.35); } x += cw2 + 16; } }
      if (!cur && !p.chips) for (const [at, s1] of [[p.depAt, '$500 / MONTH × 40 YEARS'], [p.rateAt, 'ASSUMES 7% BEFORE FEES · NOT A FORECAST']]) { if (at > -0.5 && t >= at) { const ct = t - at, k = spring(ct, 'bouncy'), f = F.monoX(s1[0] === '$' ? 38 : 27), tw = mw(s1, f) + 60; if (s1[0] === '$' && p.rateAt > -0.5 && t >= p.rateAt) continue;
        g.save(); g.translate(0, -300); g.scale(0.55 + 0.45 * k, 0.55 + 0.45 * k); g.globalAlpha *= clamp(ct / 0.08); clay(g, -tw / 2, -44, tw, 88, 44, s1[0] === '$' ? theme.ink : theme.navy, { shadowK: 0.6 }); txt(g, s1, 0, 2, f, s1[0] === '$' ? theme.accent : theme.paper); g.restore(); burst(g, 0, -300, 260, theme.accent, ct - 0.05, 12, 0.35); } }
      if (cur) { const gt = t - cur.at, k = spring(gt, 'bouncy'), vs = cur.year >= 40; const gap = fv(0.07, cur.year) - fv(0.06, cur.year), a = vs ? 'A ' + fmt(fv(0.07, 40)) : null;
        g.save(); g.translate(0, -300); g.scale(0.55 + 0.45 * k, 0.55 + 0.45 * k); g.globalAlpha *= clamp(gt / 0.08);
        if (vs) { const s1 = 'YEAR 40 · A ' + fmt(fv(0.07, 40)) + ' vs B ' + fmt(fv(0.06, 40)), f = F.monoX(34), tw = mw(s1, f) + 56; clay(g, -tw / 2, -46, tw, 92, 24, theme.navy, { shadowK: 0.6 }); txt(g, s1, 0, 2, f, theme.paper); }
        else { const s1 = 'YEAR ' + cur.year + ' GAP', s2 = fmt(gap), f1 = F.monoX(34), f2 = F.hero(70), w1 = mw(s1, f1), w2 = mw(s2, f2), tw = w1 + w2 + 90; clay(g, -tw / 2, -50, tw, 100, 26, theme.bad, { shadowK: 0.6 }); txt(g, s1, -tw / 2 + 32, 2, f1, theme.paper, 'left'); txt(g, s2, tw / 2 - 32, 2, f2, theme.paper, 'right'); }
        g.restore(); burst(g, 0, -300, 280, theme.bad, gt - 0.05, 14, 0.4); }
    },
  });

  // ---------- fee: the bill at year 40 — the fee bar vs the money you put in ----------
  B.register('fee', {
    defaults: { w: 880, h: 1000, feeAt: -1, putAt: 99999, moreAt: 99999, mathAt: 99999 },
    size: p => [p.w, p.h],
    anchors: p => ({ fee: [0, -p.h / 2 + 210, p.w * 0.94, 190], put: [0, -p.h / 2 + 480, p.w * 0.94, 190], more: [0, p.h / 2 - 230, p.w * 0.9, 130], math: [0, p.h / 2 - 90, p.w * 0.94, 130], head: [0, -p.h / 2 + 62, p.w, 120] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, bx = x0 + 44, bw = w - 88, putW = bw * 240 / 316.661;
      paper(g, x0, y0, w, h, 28, { lift });
      g.save(); rr(g, x0, y0, w, h, 28); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 124); const hg = g.createLinearGradient(0, y0, 0, y0 + 124); hg.addColorStop(0, 'rgba(255,255,255,.12)'); hg.addColorStop(1, 'rgba(0,0,0,.14)'); g.fillStyle = hg; g.fillRect(x0, y0, w, 124); g.restore();
      txt(g, 'THE BILL · YEAR 40', x0 + 40, y0 + 56, F.hero(52), theme.paper, 'left'); txt(g, 'HYPOTHETICAL · $500/MONTH · 7% vs 6%', x0 + 42, y0 + 98, F.mono(21), rgba(theme.paper, 0.75), 'left');
      // fee row
      const fo = t - p.feeAt, fk = fo > 0 ? spring(fo, 'snappy') : 0, fland = fo - 0.9;
      if (fo > 0) { g.save(); g.translate(0, -650 * (1 - Math.min(1.06, spring(fo, { f: 2.1, z: 0.55 })))); g.globalAlpha *= clamp(fo / 0.06); txt(g, 'THE 1% FEE COST', bx, y0 + 190, F.cap(36), theme.inkSoft, 'left');
        const s = 1 + (fland > 0 ? 0.12 * (1 - spring(fland, { f: 2.4, z: 0.42 })) : 0.04 * lin(fo, 0, 0.9)); g.save(); g.translate(x0 + w - 44, y0 + 205); g.scale(s, s); const o = { font: F.hero(112), size: 112, color: theme.badInk, prefix: '$', align: 'right', speed: fo < 0.9 ? 20000 : 0 };
        roll(g, 316661 * ease.expo(lin(fo, 0, 0.9)), 0, 0, o); if (fland > 0) { const rw = B.rollWidth(g, 316661, o).w; marker(g, -rw, 76, rw, 9, theme.badInk, clamp(fland / 0.35), 0.9); } g.restore();
        clay(g, bx, y0 + 296, bw * ease.out(lin(fo, 0.05, 0.8)), 76, 16, theme.bad, { shadowK: 0.6 }); g.restore(); if (fland > 0) burst(g, 0, y0 + 205, w * 0.4, theme.bad, fland, 18, 0.55); }
      // put-in row
      const po = t - p.putAt; if (po > 0) { const k = spring(po, 'snappy'); g.save(); g.globalAlpha *= clamp(po / 0.1); txt(g, 'YOU PUT IN', bx, y0 + 470, F.cap(36), theme.inkSoft, 'left');
        g.save(); g.translate(x0 + w - 44, y0 + 485); const s = 1 + 0.12 * (1 - spring(po - 0.6, { f: 2.4, z: 0.42 })) * (po > 0.6 ? 1 : 0); g.scale(s, s); roll(g, 240000 * ease.expo(lin(po, 0, 0.7)), 0, 0, { font: F.hero(112), size: 112, color: theme.goodInk, prefix: '$', align: 'right', speed: po < 0.7 ? 14000 : 0 }); g.restore();
        clay(g, bx, y0 + 576, putW * ease.out(lin(po, 0.05, 0.7)), 76, 16, theme.good, { shadowK: 0.6 }); g.restore();
        // the fee bar runs past the deposits
        const lk = ease.out(lin(po, 0.5, 0.9)); g.save(); g.globalAlpha *= lk; g.strokeStyle = theme.ink; g.lineWidth = 4; g.setLineDash([10, 8]); g.beginPath(); g.moveTo(bx + putW, y0 + 280); g.lineTo(bx + putW, y0 + 668); g.stroke(); g.setLineDash([]); g.restore(); burst(g, bx + putW, y0 + 614, 120, theme.good, po - 0.6, 12, 0.4); }
      // verdict
      const mo = t - p.moreAt; if (mo > 0) { const k = spring(mo, 'bouncy'); g.save(); g.translate(0, y0 + 790); g.scale(0.5 + 0.5 * k, 0.5 + 0.5 * k); g.rotate(-0.03 * (1 - k)); g.globalAlpha *= clamp(mo / 0.08); const f = F.hero(76), s1 = 'MORE THAN YOU PUT IN', tw = mw(s1, f) + 60; clay(g, -tw / 2, -62, tw, 124, 22, theme.bad, { shadowK: 0.7 }); txt(g, s1, 0, 5, f, theme.paper); g.restore(); burst(g, 0, y0 + 790, 360, theme.bad, mo - 0.04, 18, 0.55); }
      // arithmetic
      const ao = t - p.mathAt; if (ao > 0) { g.save(); g.globalAlpha *= clamp(ao / 0.25); txt(g, '$1,312,407 − $995,745 = $316,661', 0, y0 + 902, F.mono(25), theme.inkSoft); txt(g, '$500 × 480 MONTHS = $240,000', 0, y0 + 942, F.mono(25), theme.inkSoft); g.restore(); }
    },
  });

  // ---------- plane: the "send this" paper plane (screen layer) ----------
  B.register('plane', {
    defaults: { from: [120, 1050], to: [1180, 300], dur: 1.5, s: 1 }, ownEnter: true, size: () => [10, 10],
    draw(g, p, env) { const lt = env.lt, u = clamp(lt / p.dur), e = ease.inOut(u), [x0, y0] = p.from, [x1, y1] = p.to, cx = (x0 + x1) / 2 - 80, cy = Math.max(y0, y1) + 160;
      const P = k => { const a = (1 - k) * (1 - k), b = 2 * (1 - k) * k, c = k * k; return [a * x0 + b * cx + c * x1, a * y0 + b * cy + c * y1]; };
      g.strokeStyle = rgba(env.theme.paper, 0.5); g.lineWidth = 5; g.setLineDash([4, 18]); g.lineCap = 'round'; g.beginPath(); for (let i = 0; i <= 24; i++) { const [px, py] = P(e * i / 24); i ? g.lineTo(px, py) : g.moveTo(px, py); } g.stroke(); g.setLineDash([]);
      const [px, py] = P(e), [qx, qy] = P(Math.min(1, e + 0.02)), a = Math.atan2(qy - py, qx - px), s = p.s * (1 + 0.35 * Math.sin(Math.PI * u) - 0.25 * u);
      g.save(); g.translate(px, py); g.rotate(a); g.scale(s, s); const sh = () => { g.beginPath(); g.moveTo(70, 0); g.lineTo(-60, -44); g.lineTo(-34, 0); g.lineTo(-60, 44); g.closePath(); };
      B.shadowed(g, sh, '#F5F3EE', 0.5); g.fillStyle = '#F5F3EE'; sh(); g.fill(); g.fillStyle = '#D8D3C7'; g.beginPath(); g.moveTo(70, 0); g.lineTo(-34, 0); g.lineTo(-60, 44); g.closePath(); g.fill(); g.strokeStyle = 'rgba(11,15,20,.35)'; g.lineWidth = 2; g.beginPath(); g.moveTo(70, 0); g.lineTo(-34, 0); g.stroke(); g.restore(); },
  });
})();
// ===== v2 additions: hook slam art (3 variants), chip, heart pulse =====
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, clay, burst, hash } = B;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const bill = (g, x, y, w, h) => { clay(g, x, y, w, h - 2, 6, '#1FA366', { shadowK: 0.45 }); g.fillStyle = 'rgba(245,243,238,.82)'; g.fillRect(x + w * 0.42, y + 1, w * 0.16, h - 4); g.fillStyle = 'rgba(0,0,0,.16)'; g.fillRect(x, y + h - 4, w, 2); };
  const tag = (g, th, w, h, label, fs) => { clay(g, -w / 2, -h / 2, w, h, 30, th.bad, { shadowK: 0.7 }); g.fillStyle = '#0B0F14'; g.beginPath(); g.arc(-w / 2 + 44, 0, 15, 0, 7); g.fill(); g.strokeStyle = th.paper; g.lineWidth = 5; g.beginPath(); g.arc(-w / 2 + 44, 0, 15, 0, 7); g.stroke(); txt(g, label, 34, 6, F.hero(fs), th.paper); };

  // slam: the frame-0 pattern break. variant 'stack' (tag drops, cash stack tips), 'mouth' (tag opens, swallows cash), 'wallet' (tag lifts a bill out of a wallet in slow motion)
  B.register('slam', {
    defaults: { variant: 'stack', reAt: 99999 },
    size: () => [760, 760],
    anchors: () => ({ tag: [20, -90, 520, 330], stack: [0, 170, 640, 400], all: [0, 30, 760, 760] }),
    draw(g, p, env) {
      const { t, theme } = env, rk = t >= p.reAt ? ease.inOut(lin(t, p.reAt, p.reAt + 0.8)) : 0;
      if (p.variant === 'stack') {
        const n = 14, bh = 32, w = 520, base = 300, ti = 0.26, tipK = t > ti ? spring(t - ti, { f: 2.0, z: 0.5 }) * (1 - rk) : 0, slide = ease.out(lin(t, ti, ti + 0.6)) * (1 - rk), sq = 1 - 0.05 * B.hit(t - ti, 9) * (rk > 0 ? 0 : 1);
        g.save(); g.translate(w / 2, base); g.rotate(-0.36 * tipK); g.translate(-w / 2, -base); g.translate(0, base); g.scale(1, sq); g.translate(0, -base);
        g.fillStyle = rgba(theme.paper, 0.3); rr(g, -w / 2 - 40, base, w + 80, 6, 3); g.fill();
        for (let b = 0; b < n; b++) { const y = base - (b + 1) * bh, jx = (hash(b * 7.7) - 0.5) * 14 + (b > 6 ? (b - 6) * 20 * slide : 0); g.save(); g.translate(jx, y + bh / 2); g.rotate((hash(b * 3.1) - 0.5) * 0.04 + (b > 6 ? 0.05 * (b - 6) * slide : 0)); bill(g, -w / 2, -bh / 2, w, bh); g.restore(); }
        const rest = base - n * bh - 70, ty = lerp(rest - 300, rest, ease.in(clamp(t / ti))) + (t > ti ? 0 : 0), up = rk;
        g.save(); g.translate(40 - 20 * slide, lerp(ty, rest - 300, up)); g.rotate(-0.12 + 0.08 * Math.sin(t * 20) * Math.exp(-Math.max(0, t - ti) * 6)); tag(g, theme, 400, 230, '1%', 168); g.restore();
        g.restore(); if (t > ti && rk === 0) burst(g, 40, base - n * bh - 20, 300, theme.bad, t - ti - 0.02, 16, 0.5);
      } else if (p.variant === 'mouth') {
        const te = t >= p.reAt ? t - p.reAt : t, open = te < 2.7 ? 56 + 50 * Math.abs(Math.sin(te * 8.2)) : 6 + 40 * Math.exp(-(te - 2.7) * 3), tw = 470, th2 = 250, cy = 20;
        for (let i = 0; i < 9; i++) { const u0 = ((te * 1.25 + i / 9) % 1); if (te >= 2.9) continue; const u = ease.in(u0), x = lerp(-340, -10, u), y = lerp(230 + (hash(i * 2.3) - 0.5) * 100, cy + 10, u), s = lerp(1, 0.35, u);
          g.save(); g.globalAlpha *= (te < 2.7 ? 1 : clamp(1 - (te - 2.7) / 0.2)); g.translate(x, y); g.rotate(-0.7 * u + (hash(i) - 0.5) * 0.4); g.scale(s, s); bill(g, -90, -26, 180, 52); g.restore(); }
        g.save(); g.translate(40, cy); g.save(); g.translate(0, -open / 2); g.beginPath(); g.moveTo(-tw / 2, 0); g.lineTo(-tw / 2, -th2 / 2 + 30); g.quadraticCurveTo(-tw / 2, -th2 / 2, -tw / 2 + 40, -th2 / 2); g.lineTo(tw / 2 - 40, -th2 / 2); g.quadraticCurveTo(tw / 2, -th2 / 2, tw / 2, -th2 / 2 + 30); g.lineTo(tw / 2, 0); g.closePath();
        B.shadowed(g, () => { g.beginPath(); g.rect(-tw / 2, -th2 / 2, tw, th2 / 2); }, theme.bad, 0.4); g.fillStyle = theme.bad; g.fill(); g.fillStyle = theme.paper; for (let k = 0; k < 6; k++) { const x = -tw / 2 + 36 + k * (tw - 72) / 5; g.beginPath(); g.moveTo(x - 24, 0); g.lineTo(x + 24, 0); g.lineTo(x, 34 * (open > 12 ? 1 : 0.3)); g.fill(); }
        txt(g, '1%', 0, -th2 / 4 - 4, F.hero(130), theme.paper); g.restore();
        g.save(); g.translate(0, open / 2); g.beginPath(); g.moveTo(-tw / 2, 0); g.lineTo(-tw / 2, th2 / 2 - 30); g.quadraticCurveTo(-tw / 2, th2 / 2, -tw / 2 + 40, th2 / 2); g.lineTo(tw / 2 - 40, th2 / 2); g.quadraticCurveTo(tw / 2, th2 / 2, tw / 2, th2 / 2 - 30); g.lineTo(tw / 2, 0); g.closePath(); g.fillStyle = '#B3221A'; g.fill(); g.fillStyle = theme.paper; for (let k = 0; k < 5; k++) { const x = -tw / 2 + 60 + k * (tw - 120) / 4; g.beginPath(); g.moveTo(x - 24, 0); g.lineTo(x + 24, 0); g.lineTo(x, -30 * (open > 12 ? 1 : 0.3)); g.fill(); } g.restore(); g.restore();
      } else { // wallet
        const rise = (ease.inOut(lin(t, 0.0, 3.6)) * 0.85 + 0.15 * lin(t, 0, 3.6)) * (1 - rk), wob = Math.sin(t * 5) * 0.04;
        g.save(); g.translate(0, 180);
        for (let i = 0; i < 3; i++) { g.save(); g.translate(-100 + i * 100, -140 - (i === 1 ? 70 * rise + 60 : 20)); g.rotate((i - 1) * 0.1 + (i === 1 ? wob : 0)); bill(g, -75, -90, 150, 190); g.restore(); }
        clay(g, -290, -120, 580, 360, 40, '#2c3e66', { shadowK: 0.8 }); g.fillStyle = 'rgba(0,0,0,.18)'; rr(g, -290, -120, 580, 90, 40); g.fill(); g.strokeStyle = 'rgba(111,134,184,.85)'; g.lineWidth = 5; g.setLineDash([14, 10]); rr(g, -262, -92, 524, 304, 28); g.stroke(); g.setLineDash([]);
        clay(g, 140, 20, 190, 110, 30, '#1f2d4d', { shadowK: 0.6 }); g.fillStyle = theme.gold; g.beginPath(); g.arc(235, 75, 20, 0, 7); g.fill();
        g.save(); g.translate(0, -230 - 150 * rise); g.rotate(0.12 + wob); tag(g, theme, 330, 190, '1%', 130); g.strokeStyle = theme.paper; g.lineWidth = 6; g.beginPath(); g.moveTo(-110, 70); g.lineTo(-100, 140 + 150 * rise); g.stroke(); g.restore(); g.restore();
      }
    },
  });

  // chip: a small pill label (screen layer for the always-on HYPOTHETICAL chip)
  B.register('chip', {
    defaults: { text: 'HYPOTHETICAL', size: 28, tone: 'paper' }, ownEnter: true, size: p => [mw(p.text, F.monoX(p.size)) + 56, p.size * 2],
    draw(g, p, env) { const [w, h] = this.size(p), k = spring(env.lt, 'bouncy'), th = env.theme; g.scale(0.6 + 0.4 * k, 0.6 + 0.4 * k); g.globalAlpha *= clamp(env.lt / 0.1);
      clay(g, -w / 2, -h / 2, w, h, h / 2, '#0B0F14', { shadowK: 0.5 }); g.strokeStyle = th.accent; g.lineWidth = 3; rr(g, -w / 2, -h / 2, w, h, h / 2); g.stroke(); txt(g, p.text, 0, 2, F.monoX(p.size), th.accent); },
  });

  // heart: one small pulse beside the storyteller (<= 1 s). screen layer.
  B.register('heart', {
    defaults: { s: 1, dur: 0.9 }, ownEnter: true, size: () => [160, 160],
    draw(g, p, env) { const lt = env.lt, k = spring(lt, { f: 2.6, z: 0.38 }), beat = 1 + 0.22 * Math.max(0, Math.sin((lt - 0.28) * 14)) * Math.exp(-(lt - 0.28) * 3) * (lt > 0.28 ? 1 : 0), fade = 1 - lin(lt, p.dur - 0.25, p.dur), s = p.s * (0.2 + 0.8 * k) * beat;
      g.globalAlpha *= clamp(lt / 0.06) * fade; g.rotate(-0.12); g.scale(s, s);
      const path = () => { g.beginPath(); g.moveTo(0, 56); g.bezierCurveTo(-90, -4, -62, -74, 0, -30); g.bezierCurveTo(62, -74, 90, -4, 0, 56); g.closePath(); };
      B.shadowed(g, path, '#FF3B30', 0.4); g.fillStyle = '#FF3B30'; path(); g.fill(); g.fillStyle = 'rgba(255,255,255,.35)'; g.beginPath(); g.ellipse(-34, -26, 14, 9, -0.6, 0, 7); g.fill();
      const r = lin(lt, 0.25, 0.8); if (r > 0 && r < 1) { g.strokeStyle = rgba('#FF3B30', 1 - r); g.lineWidth = 6; path(); g.save(); g.scale(1 + 0.8 * ease.out(r), 1 + 0.8 * ease.out(r)); path(); g.stroke(); g.restore(); } },
  });
})();
const F0 = { x: 0, y: -60, w: 780, h: 1260 };
const FR = { fill: 0.84, maxH: 1230, sx: 570, sy: 1040 };
BM2.scene({
  series: 'whatif', title: 'THE 1% FEE', duration: 35.75,
  footnote: ['HYPOTHETICAL · 7% IS AN ASSUMPTION, NOT A FORECAST', 'MONTHLY COMPOUNDING · NO TAXES · NOT FINANCIAL ADVICE', 'PHOTOS: IMAGES_OF_MONEY (CC BY 2.0), FRAN.TRUDEAU (CC BY-SA 2.0), VIA FLICKR'],
  elements: [
    // --- station 1: frame-0 slam + loop frame ---
    { id: 'hook', type: 'text', at: [0, -690], in: -1, out: 3.85, props: { lines: [[['JUST ', 'paper'], ['1%', 'bad']]], size: 150 } },
    { id: 'ate', type: 'text', at: [0, -420], in: '@ate', out: 3.85, props: { lines: [[['ATE', 'paper']], [['$316,661', 'bad']]], size: 130, per: 0.12 } },
    { id: 'art', type: 'slam', at: [0, 330], scale: 1.6, in: -1, props: { variant: 'mouth', reAt: 34.3 } },
    { id: 'endt', type: 'text', at: [0, -690], in: 34.3, props: { lines: [[['JUST ', 'paper'], ['1%', 'bad']]], size: 150 } },
    // --- station 2: twin ---
    { id: 'twin', type: 'twin', at: [1750, 0], in: 3.9, props: { bpAt: 4.3, bpOut: 10.2, feeTagAt: '@charges+0.3', ripAt: 26.75,
      chips: [['@500', '$500/MO'], ['@40', '40 YRS'], ['@assumed', 'ASSUMES 7%']],
      ticker: [[0, 0], [10.3, 0], [13.4, 10], [17.6, 10], [19.9, 30], [23.1, 30], [26.3, 39], [26.7, 39], [27.0, 40]],
      gaps: [{ year: 10, at: '@4' }, { year: 30, at: '@107' }] } },
    // --- station 3: the bill ---
    { id: 'fee', type: 'fee', at: [3500, 0], in: 26.5, props: { feeAt: 27.0, putAt: '@only', moreAt: 32.3 } },
    // --- screen-fixed ---
    { id: 'hyp', type: 'chip', layer: 'screen', at: [850, 264], in: '@Same', props: { text: 'HYPOTHETICAL', size: 24 } },
    { id: 'heart', type: 'heart', layer: 'screen', at: [800, 900], in: '@heart', props: { s: 1, dur: 0.9 } },
    { id: 'nothing', type: 'text', layer: 'screen', at: [540, 400], in: '@sounds#2', out: '@500-0.2', props: { lines: [['SOUNDS LIKE'], [['NOTHING', 'accent']]], size: 96 } },
    { id: 'plane', type: 'plane', layer: 'screen', at: [0, 0], in: '@Send-0.05', out: '@Send+1.0', props: { from: [470, 1000], to: [1150, 420], dur: 0.85, s: 0.62 } },
    { id: 'ph1', type: 'photo', layer: 'screen', at: [215, 1030], in: '@sounds#2', out: '@500-0.2', props: { src: 'brand/photos/stock/piggy-bank-coins/5.jpg', name: 'SAVINGS', role: '', credit: 'PHOTO: IMAGES_OF_MONEY · CC BY 2.0', w: 330, tilt: -0.07, treatment: 'paper', aspect: 1.0, tape: true } },
    { id: 'ph2', type: 'photo', layer: 'screen', at: [830, 1030], in: 16.7, out: 18.3, props: { src: 'brand/photos/stock/stacked-coins/1.jpg', name: 'COINS', role: '', credit: 'PHOTO: FRAN.TRUDEAU · CC BY-SA 2.0', w: 270, tilt: 0.06, treatment: 'paper', aspect: 0.8, tape: true } },
    { id: 'btn', type: 'follow', layer: 'screen', at: [650, 1120], in: '@Follow+0.05', out: '@Follow+1.45', props: { press: 0.55 } },
    { id: 'ask', type: 'bubble', layer: 'screen', at: [690, 720], in: '@Still', out: '@Still+1.5', props: { l1: 'STILL TINY?', l2: 'COMMENT', size: 56, tail: 'left' } },
  ],
  beats: [
    { at: 0, beat: 'side-by-side', focus: F0, ...FR, pose: 'shock', keep: ['hook', 'art', 'endt', 'ate'] },
    { at: 0.5, beat: 'zoom-on-number', focus: 'hook', fill: 0.94, sy: 760, rot: 0.008, pose: 'point', keep: ['hook', 'art'] },
    { at: '@it', beat: 'pull-back', focus: F0, ...FR, pose: 'talk', keep: ['hook', 'art', 'ate'] },
    { at: '@ate', beat: 'zoom-on-number', focus: 'ate', fill: 0.8, sy: 760, rot: -0.01, pose: 'shock', keep: ['hook', 'art', 'ate'] },
    { at: 2.7, beat: 'pull-back', focus: F0, ...FR, pose: 'talk', keep: ['hook', 'art', 'ate'] },
    // twin
    { at: '@Same', beat: 'graphic-hero', focus: 'twin', move: 'whip', fill: 0.9, maxH: 900, sy: 840, st: 'corner-left', pose: 'idle' },
    { at: '@except', beat: 'zoom-on-number', focus: 'twin.cols', fill: 0.84, sy: 790, rot: 0.008, st: 'corner-left', pose: 'point' },
    { at: '@charges+0.3', beat: 'zoom-on-number', focus: 'twin.btag', fill: 0.84, sy: 860, rot: -0.01, st: 'corner-left', pose: 'point' },
    { at: '@Tap', beat: 'presenter-front', focus: 'twin', sy: 820, pose: 'shrug' },
    { at: '@500', beat: 'zoom-on-number', focus: 'twin.tag', fill: 0.86, sy: 760, rot: 0.01, st: 'corner-left', pose: 'point' },
    { at: '@40', beat: 'zoom-on-number', focus: 'twin.tag', fill: 0.88, sy: 760, rot: -0.01, st: 'corner-left', pose: 'point', dur: 0.5 },
    { at: '@assumed', beat: 'zoom-on-number', focus: 'twin.tag', fill: 0.9, sy: 760, rot: 0.01, st: 'corner-left', pose: 'point', dur: 0.5 },
    { at: 13.3, beat: 'zoom-on-number', focus: 'twin.year', fill: 0.66, sy: 600, rot: 0.01, st: 'corner-left', pose: 'point' },
    { at: '@4', beat: 'zoom-on-number', focus: 'twin.tag', fill: 0.86, sy: 760, rot: -0.01, st: 'corner-left', pose: 'point' },
    { at: '@whatever', beat: 'zoom-on-number', focus: 'twin.base', fill: 0.86, sy: 680, rot: 0.008, st: 'corner-left', pose: 'shrug', dur: 0.55 },
    { at: '@Send', beat: 'presenter-front', focus: 'twin', sy: 820, pose: 'you' },
    { at: 18.5, beat: 'graphic-hero', focus: 'twin', fill: 0.9, maxH: 900, sy: 840, st: 'corner-left', pose: 'idle' },
    { at: 19.9, beat: 'zoom-on-number', focus: 'twin.year', fill: 0.66, sy: 600, rot: -0.008, st: 'corner-left', pose: 'point' },
    { at: '@107', beat: 'zoom-on-number', focus: 'twin.tag', fill: 0.88, sy: 760, rot: 0.012, st: 'corner-left', pose: 'shock' },
    { at: '@yes', beat: 'pull-back', focus: 'twin', fill: 0.9, maxH: 900, sy: 840, st: 'corner-left', pose: 'shrug' },
    { at: '@Follow', beat: 'presenter-front', focus: 'twin', sy: 820, pose: 'follow' },
    { at: '@catches', beat: 'graphic-hero', focus: 'twin', fill: 0.9, maxH: 900, sy: 840, st: 'corner-left', pose: 'point' },
    { at: 26.0, beat: 'zoom-on-number', focus: 'twin.year', fill: 0.7, sy: 620, rot: 0.008, st: 'corner-left', pose: 'idle', dur: 0.9 },
    // payoff
    { at: 27.0, beat: 'peek', focus: 'fee', move: 'whip', sy: 880, maxH: 820, pose: 'idle' },
    { at: '@316#2', beat: 'zoom-on-number', focus: 'fee.fee', fill: 0.97, sy: 700, rot: 0.01, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@to#2', beat: 'pull-back', focus: 'fee', fill: 0.84, maxH: 900, sy: 770, st: 'corner-left', pose: 'shock' },
    { at: '@only', beat: 'zoom-on-number', focus: 'fee.put', fill: 0.9, sy: 760, rot: -0.01, st: 'corner-left', pose: 'shrug' },
    { at: 32.2, beat: 'zoom-on-number', focus: 'fee.more', fill: 0.9, sy: 800, rot: 0.01, st: 'corner-left', pose: 'shrug' },
    { at: '@Still', beat: 'presenter-front', focus: 'fee', sy: 770, pose: 'chin' },
    { at: 34.35, beat: 'side-by-side', focus: F0, move: 'whip', ...FR, pose: 'shock', keep: ['hook', 'art', 'endt', 'ate'] },
  ],
  poses: [['@Follow', 'follow', { target: [650, 1120] }]],
  shakes: [[0.3, 8], ['@ate', 14], ['@316#2', 18], ['@107', 8], ['@only', 8]],
  captions: { emph: { '1%': 'bad', '316': 'bad', '4,600': 'bad', '107': 'bad', '240.': 'good', '7%.': 'accent' }, fix: [
    ['tiny,', 'tiny.'], ['10,', '10?'], ['bucks,', 'bucks.'], ['30,', '30?'], ['grand,', 'grand.'], ['yes.', 'Yeah.'], ["40's next and", "40's next, and"], ['2 to', 'To— to'], ['Still tiny.', 'Still tiny?'] ] },
  bed: { name: 'lofi_bed_1', gain: -1 },
  sfx: [
    { at: 0, name: 'deep_boom_2', gain: -4, dur: 0.36 }, { at: '@ate', name: 'cash_register_1', gain: -8, dur: 0.9 }, { at: '@ate', name: 'paper_slam_1', gain: -7, dur: 0.5 },
    { at: 4.3, name: 'pop_1', gain: -10, dur: 0.4 }, { at: 4.42, name: 'pop_1', gain: -11, dur: 0.4 },
    { at: '@charges+0.3', name: 'click_1', gain: -8, dur: 0.25 }, { at: '@charges+0.3', name: 'pop_2', gain: -9, dur: 0.3 },
    { at: '@heart', name: 'pop_2', gain: -9, dur: 0.3 },
    { at: '@500', name: 'pop_1', gain: -9, dur: 0.4 }, { at: '@500', name: 'cash_register_1', gain: -10, dur: 0.9 }, { at: '@40', name: 'pop_1', gain: -9, dur: 0.4 }, { at: '@assumed', name: 'click_2', gain: -9, dur: 0.2 },
    { at: 10.3, name: 'money_counter_1', gain: -13, dur: 0.9 }, { at: '@4', name: 'ding_2', gain: -9, dur: 0.6 },
    { at: '@Send-0.05', name: 'swoosh_1', gain: -9, dur: 0.9 },
    { at: 17.6, name: 'money_counter_1', gain: -13, dur: 0.9 }, { at: '@107', name: 'ding_2', gain: -7, dur: 0.6 }, { at: '@107', name: 'sub_drop_1', gain: -9, dur: 0.9 },
    { at: 23.1, name: 'money_counter_2', gain: -13, dur: 2.6 },
    { at: '@Follow+0.05', name: 'pop_1', gain: -9, dur: 0.5 }, { at: '@Follow+0.6', name: 'click_1', gain: -8, dur: 0.3 }, { at: '@Follow+0.7', name: 'success_chime_1', gain: -12, dur: 1.2 },
    { at: 26.75, name: 'paper_slam_2', gain: -10, dur: 0.5 },
    { at: 27.0, name: 'money_counter_2', gain: -11, dur: 0.9 }, { at: 27.3, name: 'deep_boom_1', gain: -2, dur: 1.6 }, { at: 27.3, name: 'cinematic_hit_1', gain: -6, dur: 1.2 },
    { at: '@only+0.05', name: 'pop_1', gain: -9, dur: 0.4 }, { at: 32.3, name: 'rubber_stamp_2', gain: -3, dur: 0.5 }, { at: 32.3, name: 'deep_boom_2', gain: -8, dur: 0.36 },
    { at: '@Still-0.1', name: 'pop_1', gain: -9, dur: 0.5 },
  ],
});
