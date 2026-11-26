// ===== one-percent-fee v5 — two identical piggy-bank funds A and B growing side by side. ONE idea on screen at a time; full-screen stage in screen space.
// Layout identical to penny-doubled v5: pill 238-290 | counter card 322-552 | scene zone 590-1085 | row 1100-1335 (YOU left, chip middle, storyteller right) | captions ~1432.
// Math (research.md): $500/month, monthly compounding, A 7%/yr, B 6%/yr (7% minus the 1% fee). FV = 500 x ((1+r/12)^m - 1) / (r/12), m = months.
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, burst, hash, hit } = B, H = window.PD5.h, { fit, stk, chip, stamp, label, coin, mw, TONE } = H;
  const fv = (m, r) => (m <= 0 ? 0 : 500 * (Math.pow(1 + r / 12, m) - 1) / (r / 12)), fA = m => fv(m, 0.07), fB = m => fv(m, 0.06), fmt0 = v => '$' + B.fmtNum(Math.round(v), 0, true);
  window.FEE = { fA, fB, fmt0 };
  const yearAt = (t, K) => { let y = K[0][1]; for (let i = 0; i < K.length - 1; i++) { const a = K[i], b = K[i + 1]; if (t >= b[0]) y = b[1]; else if (t > a[0]) { y = lerp(a[1], b[1], ease.inOut(lin(t, a[0], b[0]))); break; } else break; } return y; };

  // ---------- the piggy bank (same design every time) ----------
  function pig(g, x, y, w, o = {}) { // (x, y) = centre of the underside; w = body width
    const s = w / 250, t = o.t || 0; g.save(); g.translate(x, y); g.scale(s, s); g.rotate(o.rot || 0);
    const INK = '#1a1210', PK = '#F28DB0', PK2 = '#D96C93';
    const st = (lw = 5) => { g.strokeStyle = INK; g.lineWidth = lw; g.lineJoin = 'round'; g.lineCap = 'round'; g.stroke(); };
    for (const lx of [-70, 62]) { g.fillStyle = PK2; rr(g, lx - 20, -52, 40, 56, 12); g.fill(); st(4.5); }
    g.fillStyle = PK; g.beginPath(); g.ellipse(0, -92, 118, 84, 0, 0, 7); g.fill(); st(5.5);
    g.fillStyle = 'rgba(255,255,255,.28)'; g.beginPath(); g.ellipse(-34, -130, 46, 17, -0.3, 0, 7); g.fill();
    g.fillStyle = PK2; g.beginPath(); g.moveTo(40, -158); g.lineTo(70, -208); g.lineTo(92, -152); g.closePath(); g.fill(); st(4.5);
    g.fillStyle = INK; g.beginPath(); g.ellipse(-8, -112, 12, 5, 0, 0, 7); g.fill();
    g.fillStyle = PK2; g.beginPath(); g.ellipse(-120, -92, 26, 34, 0, 0, 7); g.fill(); st(4.5); g.fillStyle = INK; for (const dy of [-8, 10]) { g.beginPath(); g.ellipse(-124, -92 + dy, 4.5, 6, 0, 0, 7); g.fill(); }
    g.fillStyle = INK; g.beginPath(); g.arc(-62, -112, 9, 0, 7); g.fill(); g.fillStyle = '#fff'; g.beginPath(); g.arc(-59, -115, 3, 0, 7); g.fill();
    g.strokeStyle = INK; g.lineWidth = 5; g.beginPath(); g.moveTo(112, -96); g.quadraticCurveTo(150, -112, 138, -138); g.quadraticCurveTo(128, -156, 148, -150); g.stroke();
    g.fillStyle = '#7a2342'; rr(g, -26, -166, 56, 10, 5); g.fill();
    if (o.tag) { g.save(); g.translate(60, -78); g.rotate(0.12); clay(g, -44, -26, 88, 52, 12, '#FF3B30', { shadowK: 0.5 }); txt(g, o.tag, 0, 3, F.hero(40), '#F5F3EE'); g.restore(); }
    if (o.letter) { g.fillStyle = '#0B0F14'; g.beginPath(); g.arc(-8, -70, 30, 0, 7); g.fill(); g.strokeStyle = '#F5F3EE'; g.lineWidth = 4; g.beginPath(); g.arc(-8, -70, 30, 0, 7); g.stroke(); txt(g, o.letter, -8, -67, F.hero(40), '#F5F3EE'); }
    g.restore();
  }
  const tower = (g, x, base, h, w) => { // stack of coins
    const top = base - h, gg = g.createLinearGradient(x - w / 2, 0, x + w / 2, 0); gg.addColorStop(0, '#c58f00'); gg.addColorStop(0.4, '#ffe27a'); gg.addColorStop(1, '#b88700'); g.fillStyle = gg; rr(g, x - w / 2, top, w, h, 5); g.fill();
    g.save(); rr(g, x - w / 2, top, w, h, 5); g.clip(); g.fillStyle = 'rgba(100,70,0,.42)'; for (let y = base - 8; y > top; y -= 8) g.fillRect(x - w / 2, y, w, 2); g.restore();
  };
  const bill = (g, cx, cy, rot, s = 1) => { g.save(); g.translate(cx, cy); g.rotate(rot); g.scale(s, s); clay(g, -62, -26, 124, 52, 7, '#1FA366', { shadowK: 0.45 }); g.fillStyle = 'rgba(245,243,238,.82)'; g.fillRect(-10, -25, 20, 48); txt(g, '$500', 0, 1, F.hero(26), '#0B2E1C'); g.restore(); };

  // ---------- scenes ----------
  const XA = 290, XB = 810, BASE = 1046, PW = 250, MAXH = 230, TW = 120;
  function pigsScene(g, p, lt, t, th, S, yr, showB) {
    const m = Math.round(yr * 12), a = fA(m), b = fB(m), mx = fA(480);
    const ha = Math.max(6, a / mx * MAXH), hb = Math.max(6, b / mx * MAXH);
    g.fillStyle = 'rgba(245,243,238,.7)'; g.fillRect(90, BASE, 900, 5);
    tower(g, XA, BASE, ha, TW); pig(g, XA, BASE - ha, PW, { letter: 'A', t });
    label(g, 'FUND A · NO FEE', XA, BASE + 28, 'rgba(245,243,238,.85)', 21);
    if (showB) { const k = S.bAt == null ? 1 : spring(t - S.bAt, 'bouncy'); g.save(); g.globalAlpha *= clamp(k * 3); g.translate(XB, BASE); g.scale(0.7 + 0.3 * Math.min(1.06, k), 0.7 + 0.3 * Math.min(1.06, k)); g.translate(-XB, -BASE); tower(g, XB, BASE, hb, TW); pig(g, XB, BASE - hb, PW, { letter: 'B', tag: '1%', t }); label(g, 'FUND B · 1% FEE', XB, BASE + 28, 'rgba(245,243,238,.85)', 21); g.restore();
      if (S.gap !== false && t >= (S.gapAt ?? -1)) { const gap = a - b, gk = spring(t - (S.gapAt ?? 0), 'bouncy'), ya = BASE - ha - 150, yb = BASE - hb - 150; g.save(); g.globalAlpha *= clamp(gk * 3); g.strokeStyle = th.bad; g.lineWidth = 5; g.setLineDash([10, 8]); g.beginPath(); g.moveTo(XA + 140, ya); g.lineTo(540, ya); g.moveTo(XB - 140, yb); g.lineTo(540, yb); g.stroke(); g.setLineDash([]); g.beginPath(); g.moveTo(540, ya); g.lineTo(540, yb); g.stroke();
        const cy = Math.max(660, Math.min(860, (ya + yb) / 2)), s2 = fmt0(gap), sz = fit(s2, F.hero, 250, 62, 28); g.translate(540, cy); g.scale(0.7 + 0.3 * Math.min(1.06, gk), 0.7 + 0.3 * Math.min(1.06, gk)); clay(g, -134, -56, 268, 112, 26, '#0B0F14', { shadowK: 0.5 }); g.strokeStyle = th.bad; g.lineWidth = 4; rr(g, -134, -56, 268, 112, 26); g.stroke(); label(g, 'THE GAP', 0, -30, th.bad, 22); txt(g, s2, 0, 10, F.hero(sz), th.bad); g.restore(); }
    }
  }
  function twin(g, p, lt, t, th, S) {
    const k = Math.min(1.06, spring(lt, 'bouncy')), tg = t >= (S.tagAt ?? 1e9) ? spring(t - S.tagAt, { f: 2.4, z: 0.45 }) : 0;
    g.save(); g.translate(540, 900); g.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k); g.translate(-540, -900);
    pig(g, XA + 20, 1000, 300, { letter: 'A' }); pig(g, XB - 20, 1000, 300, { letter: 'B', tag: tg > 0 ? '1%' : null, rot: tg > 0 ? 0.04 * Math.sin(tg * 9) * Math.exp(-(t - S.tagAt) * 3) : 0 });
    label(g, S.la || 'FUND A', XA + 20, 1040, th.paper, 26); label(g, S.lb || 'FUND B', XB - 20, 1040, th.paper, 26);
    txt(g, '=', 540, 880, F.hero(150), 'rgba(245,243,238,.85)'); label(g, 'IDENTICAL', 540, 970, 'rgba(245,243,238,.85)', 22);
    g.restore(); if (tg > 0) burst(g, XB + 40, 920, 260, th.bad, t - S.tagAt - 0.02, 16, 0.5);
  }
  function deposit(g, p, lt, t, th, S) {
    const k = Math.min(1.06, spring(lt, 'bouncy'));
    g.save(); g.translate(540, 840); g.scale(0.85 + 0.15 * k, 0.85 + 0.15 * k); g.translate(-540, -840); pig(g, 540, 960, 380, { t });
    for (let i = 0; i < 5; i++) { const ph = ((t * 1.1 + i / 5) % 1), y = lerp(640, 790, ease.in(ph)), a = 1 - lin(ph, 0.82, 1); g.save(); g.globalAlpha *= a; bill(g, 540 + (hash(i * 2.3) - 0.5) * 60, y, (hash(i) - 0.5) * 0.5, 0.8); g.restore(); }
    g.restore();
    chip(g, '$500 EVERY MONTH · 40 YEARS', 540, 612, 'accent', th, 38, 920, spring(lt, 'bouncy'));
    if (t >= S.sumAt) { const u = ease.out(clamp((t - S.sumAt) / 1.3)), v = 240000 * u, sz = fit('$240,000', F.hero, 700, 120); g.save(); const k2 = spring(t - S.sumAt, 'bouncy'); g.translate(540, 1012); g.scale(0.8 + 0.2 * Math.min(1.06, k2), 0.8 + 0.2 * Math.min(1.06, k2)); stk(g, fmt0(v), 0, 0, F.hero(sz), th.accent, 'center', 14); g.restore(); label(g, 'YOUR OWN MONEY PUT IN', 540, 1078, th.paper, 22); }
  }
  function hero(g, p, lt, t, th, S) {
    let st = S.steps[0]; for (const x of S.steps) if (t >= x.at) st = x; const k = spring(Math.max(0, t - st.at) + (st === S.steps[0] ? lt : 0), 'bouncy'), kk = Math.min(1.06, k);
    g.save(); g.translate(540, 840); g.scale(0.8 + 0.2 * kk, 0.8 + 0.2 * kk); g.globalAlpha *= clamp(k * 3);
    const lines = st.lines, sz0 = st.size || 150; let sz = sz0; for (const ln of lines) sz = Math.min(sz, fit(ln[0], F.hero, 900, sz0, 40)); const lh = sz * 1.08;
    lines.forEach((ln, i) => stk(g, ln[0], 0, (i - (lines.length - 1) / 2) * lh - (st.sub ? 40 : 0), F.hero(sz), TONE(th)[ln[1]] || th.paper, 'center', 16));
    if (st.sub) { const sub = st.sub, sz2 = fit(sub, F.monoX, 900, 34, 18); txt(g, sub, 0, (lines.length / 2) * lh + 10, F.monoX(sz2), th.accent); }
    g.restore();
  }
  function cost(g, p, lt, t, th, S) { // the fee's cost, big
    const k = Math.min(1.06, spring(lt, 'bouncy')); label(g, 'THE 1% FEE COST YOU', 540, 626, th.paper, 30);
    g.save(); g.translate(540, 770); g.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k); const s = '$316,661', sz = fit(s, F.hero, 900, 160); stk(g, s, 0, 0, F.hero(sz), th.bad, 'center', 18); g.restore();
    const pk = (a, b) => spring(t - a, 'bouncy'); const m = 480, A = fA(m), Bv = fB(m), w = 800; const ya = 900, hb = 40;
    const bk = pk(S.a); g.save(); g.globalAlpha *= clamp(bk * 3); clay(g, 140, ya - 20, w, hb, 20, '#00D26A', { shadowK: 0.4 }); g.restore(); label(g, 'FUND A · $1,312,407', 140, ya - 44, th.good, 26, 'left');
    const bb = pk(S.b); g.save(); g.globalAlpha *= clamp(bb * 3); clay(g, 140, ya + 70, w * Bv / A, hb, 20, '#FFD60A', { shadowK: 0.4 }); g.restore(); label(g, 'FUND B · $995,745', 140, ya + 46, th.accent, 26, 'left');
    if (bb > 0) { g.save(); g.globalAlpha *= clamp(bb * 3); g.strokeStyle = th.bad; g.lineWidth = 5; const xa = 140 + w, xb = 140 + w * Bv / A; clay(g, xb, ya + 70, xa - xb, hb, 20, th.bad, { shadowK: 0.4 }); g.restore(); label(g, '= THE FEE', (140 + w * Bv / A + 140 + w) / 2, ya + 130, th.bad, 22); }
  }
  function compare(g, p, lt, t, th, S) {
    const k = Math.min(1.06, spring(lt, 'bouncy')), cost = 316661, put = 240000, W0 = 800, x0 = 140;
    label(g, 'THE FEE vs YOUR OWN DEPOSITS', 540, 625, th.paper, 28);
    const row = (y, lab, v, col, at, fill) => { const kk = spring(t - at, 'bouncy'), f = ease.out(clamp((t - at) / 0.8)); g.save(); g.globalAlpha *= clamp(kk * 3); label(g, lab, x0, y - 92, col, 24, 'left'); g.fillStyle = 'rgba(245,243,238,.14)'; rr(g, x0, y - 40, W0, 80, 40); g.fill(); g.save(); rr(g, x0, y - 40, W0, 80, 40); g.clip(); clay(g, x0, y - 40, Math.max(80, W0 * v / cost * f), 80, 40, fill, { shadowK: 0.3 }); g.restore(); const s = fmt0(v), sz = fit(s, F.hero, 360, 70); stk(g, s, x0 + 24, y + 2, F.hero(sz), th.paper, 'left', 10); g.restore(); };
    row(760, 'THE FEE COST', cost, th.bad, S.a, th.bad); row(940, 'ALL YOU EVER PUT IN', put, th.good, S.b, '#1FA366');
    if (t >= S.moreAt) { const kk = spring(t - S.moreAt, 'bouncy'); chip(g, 'THE FEE WAS BIGGER', 540, 1054, 'bad', th, 40, 760, kk); }
  }
  function ask(g, p, lt, t, th, S) {
    const k = Math.min(1.06, spring(lt, 'bouncy')); g.save(); g.translate(540, 700); g.scale(0.7 + 0.3 * k, 0.7 + 0.3 * k); g.globalAlpha *= clamp(k * 2);
    const sz = Math.min(fit(S.l1, F.hero, 900, 140), fit(S.l2, F.hero, 900, 140)); stk(g, S.l1, 0, -70, F.hero(sz), th.accent, 'center', 16); stk(g, S.l2, 0, 70, F.hero(sz), th.good, 'center', 16); g.restore();
    pig(g, XA + 60, 1040, 190, { letter: 'A' }); pig(g, XB - 60, 1040, 190, { letter: 'B', tag: '1%' });
  }

  B.register('fstage', {
    defaults: { K: [[0, 0]], scenes: [], hook: null, counterIn: 0, hideCounter: [], beats: [], notes: [], bAt: 1e9 }, ownEnter: true, size: () => [1080, 1920],
    draw(g, p, env) {
      const { t, theme: th } = env; g.translate(-540, -960);
      const yr = yearAt(t, p.K), m = Math.round(yr * 12), yi = Math.floor(yr + 1e-4);
      let bl = ''; for (const b of p.beats) if (t >= b[0]) bl = b[1]; if (bl) { const k = spring(t - p.beats.find(b => b[1] === bl)[0], 'snappy'); g.save(); g.globalAlpha *= clamp(k * 2); label(g, bl, 990, 264, th.accent, 26, 'right'); g.restore(); }
      // counter card: year + put in + A + B
      const hid = p.hideCounter.some(([a, b]) => t >= a && t < b), ca = clamp((t - p.counterIn) / 0.25) * (hid ? 0 : 1);
      if (ca > 0.01) {
        const showB = !(p.bHide || []).some(([a, b]) => t >= a && t < b);
        g.save(); g.globalAlpha *= ca; g.translate(0, (1 - ease.out(clamp((t - p.counterIn) / 0.4))) * -30); paper(g, 70, 322, 940, 230, 26, { lift: 0.3 });
        for (let i = 1; i <= 40; i++) { g.fillStyle = i <= yi ? (i > 30 ? th.bad : th.gold) : 'rgba(11,15,20,.14)'; rr(g, 96 + (i - 1) * 22.4, 342, 18, 20, 5); g.fill(); }
        txt(g, 'YEAR', 100, 396, F.monoX(28), th.inkSoft, 'left'); txt(g, String(yi), 184, 394, F.hero(60), th.ink, 'left'); txt(g, '/ 40', 184 + mw(String(yi), F.hero(60)) + 12, 400, F.monoX(26), th.inkSoft, 'left');
        txt(g, 'YOU PUT IN ' + fmt0(500 * Math.floor(yi * 12)), 982, 398, F.monoX(26), th.inkSoft, 'right');
        const colW = 440; [[100, 'FUND A · NO FEE', fA(yi * 12), th.goodInk, true], [540, 'FUND B · 1% FEE', fB(yi * 12), th.badInk, showB]].forEach(([x, lab, v, col, on]) => {
          label(g, lab, x + 20, 440, th.inkSoft, 22, 'left'); const s = on ? fmt0(v) : '— — —', sz = fit(s, F.hero, colW - 30, 84); txt(g, s, x + 20, 500, F.hero(sz), on ? col : 'rgba(11,15,20,.3)', 'left'); });
        g.fillStyle = 'rgba(11,15,20,.14)'; g.fillRect(528, 420, 3, 110);
        g.restore();
      }
      if (p.hook) hookText(g, p.hook, t, th);
      for (const S of p.scenes) {
        if (t < S.from - 0.02 || t > S.to + 0.02) continue; const lt = t - S.from, kin = spring(lt + 0.08, { f: 2.4, z: 0.7 }), a = clamp(lt / 0.12) * (1 - lin(t, S.to - 0.12, S.to)), sc = 0.94 + 0.06 * Math.min(1.05, kin);
        g.save(); g.globalAlpha *= a; g.translate(540, 840); g.scale(sc, sc); g.translate(-540, -840);
        if (S.type === 'twin') twin(g, p, lt, t, th, S); else if (S.type === 'deposit') deposit(g, p, lt, t, th, S); else if (S.type === 'hero') hero(g, p, lt, t, th, S); else if (S.type === 'pigs') pigsScene(g, p, lt, t, th, S, yr, S.bAt == null ? true : t >= S.bAt);
        else if (S.type === 'cost') cost(g, p, lt, t, th, S); else if (S.type === 'compare') compare(g, p, lt, t, th, S); else if (S.type === 'ask') ask(g, p, lt, t, th, S);
        g.restore();
      }
      for (const n of p.notes) if (t >= n.at && t < n.out + 0.2) { const nt = t - n.at, k = Math.min(1.08, spring(nt, 'bouncy')), fo = 1 - lin(t, n.out - 0.15, n.out + 0.05); g.save(); g.globalAlpha *= clamp(nt / 0.06) * fo; if (n.stamp) stamp(g, n.text, 540, n.y || 598, n.tone || 'good', th, n.size || 56, n.rot || -0.04, k); else chip(g, n.text, 540, n.y || 598, n.tone || 'bad', th, n.size || 42, 920, k); g.restore(); }
    },
  });
  function hookText(g, H, t, th) {
    if (t > H.until + 0.35) return; const T = TONE(th), k = Math.min(1.06, 0.88 + 0.12 * Math.min(1.1, spring(t + 0.12, { f: 2.6, z: 0.5 }))), fade = 1 - lin(t, H.until, H.until + 0.3);
    let size = H.size; for (const ln of H.lines) size = fit(ln.map(x => x[0]).join(''), F.hero, 920, size, 40);
    g.save(); g.globalAlpha *= fade; g.translate(540, H.y); g.scale(k, k); const lh = size * 1.1;
    H.lines.forEach((ln, i) => { const s = ln.map(x => x[0]).join(''); let x = -mw(s, F.hero(size)) / 2; const y = (i - (H.lines.length - 1) / 2) * lh; for (const [w, tn] of ln) { const ww = mw(w, F.hero(size)); stk(g, w, x + ww / 2, y, F.hero(size), T[tn] || th.paper, 'center', 16); x += ww; } });
    if (H.sub && t >= H.sub.at) { const kk = spring(t - H.sub.at, 'snappy'); g.globalAlpha *= clamp(kk * 2); stk(g, H.sub.text, 0, (H.lines.length / 2) * lh + 14 + (1 - kk) * 14, F.cap(fit(H.sub.text, F.cap, 900, 40, 22)), th.bad, 'center', 10); }
    g.restore();
  }
  // hook art: two identical pigs, the 1% tag slams onto B (replays at reAt)
  B.register('feeart', {
    defaults: { reAt: 99999 }, ownEnter: true, size: () => [900, 500],
    draw(g, p, env) {
      const { t, theme: th } = env, te = t >= p.reAt ? t - p.reAt : t, tg = spring(te - 0.08, { f: 2.4, z: 0.45 }), u = te - 0.08;
      g.fillStyle = 'rgba(245,243,238,.6)'; g.fillRect(-380, 210, 760, 5);
      pig(g, -190, 205, 300, { letter: 'A' }); pig(g, 190, 205, 300, { letter: 'B', tag: u > -0.05 ? '1%' : null, rot: 0.04 * Math.sin(Math.max(0, u) * 9) * Math.exp(-Math.max(0, u) * 3) });
      if (u > 0) burst(g, 250, 120, 260, th.bad, u - 0.02, 16, 0.5);
    },
  });
  B.register('hypo', {
    defaults: { text: 'HYPOTHETICAL · NOT FINANCIAL ADVICE' }, ownEnter: true, size: () => [10, 10],
    draw(g, p, env) { const s = p.text, f = F.monoX(21), w = mw(s, f) + 36; g.globalAlpha *= 0.9; g.fillStyle = 'rgba(11,15,20,.78)'; rr(g, -w / 2, -18, w, 36, 18); g.fill(); g.strokeStyle = env.theme.accent; g.lineWidth = 2; rr(g, -w / 2, -18, w, 36, 18); g.stroke(); txt(g, s, 0, 1, f, env.theme.accent); },
  });

  // ---------- factory ----------
  const ST = { x: 905, y: 1338, s: 0.8, layer: 'front', blur: 0, dim: 0 }, DX = [0, 420, -380, 300, -300, 380, -420, 260];
  window.FEE.make = function (c) {
    const ask = c.scenes.find(s => s.type === 'ask'), els = [];
    els.push({ id: 'stage', type: 'fstage', layer: 'screen', at: [540, 960], in: -1, z: 10, props: { K: c.K, scenes: c.scenes, hook: c.hook, counterIn: c.counterIn, hideCounter: c.hideCounter || [], bHide: c.bHide || [], beats: c.labels, notes: c.notes || [] } });
    els.push({ id: 'art', type: 'feeart', layer: 'screen', at: [540, 780], in: -1, out: c.hook.until, z: 9, props: {} });
    els.push({ id: 'you', type: 'you', layer: 'screen', at: [150, 1213], scale: 0.82, in: -1, z: 20, props: { keys: c.you, hand: 'none' } });
    els.push({ id: 'hypo', type: 'hypo', layer: 'screen', at: [545, 1316], in: 0.2, z: 20, props: { text: c.chip || 'HYPOTHETICAL · NOT FINANCIAL ADVICE' } });
    if (c.cta.like) els.push({ id: 'heart', type: 'heart', layer: 'screen', at: [520, 1205], in: c.cta.like, out: c.cta.likeOut, z: 30, props: { s: 1, dur: 1.0 } });
    if (c.cta.send) els.push({ id: 'plane', type: 'plane', layer: 'screen', at: [0, 0], in: c.cta.send, out: c.cta.sendOut, z: 30, props: { from: [330, 1275], to: [760, 1160], dur: 1.2, s: 0.7 } });
    if (c.cta.follow) els.push({ id: 'follow', type: 'follow', layer: 'screen', at: [520, 1215], in: c.cta.follow, out: c.cta.followOut, z: 30, props: { press: 0.75 } });
    if (c.cta.bubble) els.push({ id: 'bubble', type: 'bubble', layer: 'screen', at: [520, 1205], in: c.cta.bubble.at, z: 30, props: { l1: c.cta.bubble.l1, l2: c.cta.bubble.l2, size: 40, tail: 'left' } });
    const beats = c.scenes.map((s, i) => ({ at: s.from, beat: 'wide', focus: { x: 540 + DX[i % DX.length], y: 740 + (i % 2 ? 90 : -60), w: 1080, h: 300 }, fill: 1, dur: 0.8, st: ST, pose: s.pose || 'talk' }));
    beats.unshift({ at: 0, beat: 'wide', focus: { x: 540, y: 740, w: 1080, h: 300 }, fill: 1, st: ST, pose: 'shock' });
    return { series: 'whatif', title: '1% FEE × 40 YEARS', duration: c.dur, footnote: c.footnote, elements: els, beats, poses: [...(c.cta.follow ? [[c.cta.follow, 'follow', { target: [520, 1215] }]] : []), ...(c.poses || [])], shakes: c.shakes, captions: c.captions, bed: c.bed || { name: 'upbeat_bed_2', gain: -1 }, sfx: c.sfx };
  };
})();
