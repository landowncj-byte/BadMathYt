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
    defaults: { w: 900, h: 1100, ticker: [[0, 0]], gaps: [], ghostAt: 99999, tagFinal: false, feeTagAt: -1, ripAt: 99999, depAt: -1, rateAt: -1, bpAt: -1, bpOut: 99999, coinAt: -1 },
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
        g.save(); g.globalAlpha *= clamp(bt / 0.1) * fo; for (const [cx, kk, c] of [[ax, k, theme.good], [bx, kb, theme.gold]]) { const hh = bh * kk * wob; g.fillStyle = rgba(c, 0.22); rr(g, cx - cw / 2, baseY - hh, cw, hh, 14); g.fill(); g.strokeStyle = c; g.lineWidth = 5; g.setLineDash([16, 10]); rr(g, cx - cw / 2, baseY - hh, cw, hh, 14); g.stroke(); g.setLineDash([]); }
        if (bt > 0.3) txt(g, '= SAME', 0, baseY - bh * 0.5, F.hero(64), theme.ink); g.restore(); }
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
      if (!cur) for (const [at, s1] of [[p.depAt, '$500 / MONTH × 40 YEARS'], [p.rateAt, 'ASSUMES 7% BEFORE FEES · NOT A FORECAST']]) { if (at > -0.5 && t >= at) { const ct = t - at, k = spring(ct, 'bouncy'), f = F.monoX(s1[0] === '$' ? 38 : 27), tw = mw(s1, f) + 60; if (s1[0] === '$' && p.rateAt > -0.5 && t >= p.rateAt) continue;
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
