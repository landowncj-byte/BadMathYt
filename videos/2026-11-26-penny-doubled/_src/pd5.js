// ===== penny-doubled v5 — ONE clean idea at a time. Full-screen stage ('pstage') drawn in screen space (camera can never crop it).
// Layout (1080x1920): pill y238-290 | counter card y322-552 | scene zone y590-1085 | row y1100-1335 (YOU left, CTA/chip middle, storyteller right) | captions y~1432.
// Every number is fitted to the zone width (margin >= 70 px). Doubling math: day n = 0.01 x 2^(n-1) dollars (research.md), computed in code.
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, burst, hash, hit } = B;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const dol = n => Math.pow(2, n - 1) / 100, fmt = (v, d = 2) => B.fmtNum(v, d, true), money = n => '$' + fmt(dol(n), 2);
  window.PD5 = { dol, money, h: {} };
  const fit = (s, ff, maxW, size, min = 18) => { while (size > min && mw(s, ff(size)) > maxW) size -= 2; return size; };
  const stk = (g, s, x, y, font, col, al = 'center', lw = 12) => { g.save(); g.font = font; g.textAlign = al; g.textBaseline = 'middle'; g.lineJoin = 'round'; g.lineWidth = lw; g.strokeStyle = 'rgba(6,8,11,.92)'; g.strokeText(s, x, y); g.fillStyle = col; g.fillText(s, x, y); g.restore(); };
  const TONE = th => ({ paper: th.paper, accent: th.accent, good: th.good, bad: th.bad, gold: th.gold, ink: '#0B0F14' });

  // ---------- coins ----------
  const cache = {};
  function sprite(r) {
    const R = Math.max(2, Math.round(r * 2) / 2); if (cache[R]) return cache[R];
    const pad = 4, th = Math.max(2, R * 0.13), c = document.createElement('canvas'); c.width = Math.ceil(2 * R + 2 * pad); c.height = Math.ceil(2 * R + th + 2 * pad); const g = c.getContext('2d'), cx = c.width / 2, cy = pad + R;
    g.fillStyle = '#7a5806'; g.beginPath(); g.arc(cx, cy + th, R, 0, 7); g.fill();
    const hg = g.createRadialGradient(cx - R * 0.32, cy - R * 0.34, R * 0.1, cx, cy, R); hg.addColorStop(0, '#ffe58a'); hg.addColorStop(1, '#E3A400'); g.fillStyle = hg; g.beginPath(); g.arc(cx, cy, R, 0, 7); g.fill();
    g.strokeStyle = 'rgba(122,88,6,.85)'; g.lineWidth = Math.max(1, R * 0.07); g.beginPath(); g.arc(cx, cy, R * 0.8, 0, 7); g.stroke();
    g.strokeStyle = 'rgba(60,40,0,.55)'; g.lineWidth = Math.max(1, R * 0.05); g.beginPath(); g.arc(cx, cy, R - 0.5, 0, 7); g.stroke();
    if (R >= 20) txt(g, '1¢', cx, cy + R * 0.03, F.hero(R * 0.9), '#6b4d05');
    return (cache[R] = { c, cx, cy });
  }
  const coin = (g, x, y, r, a = 1) => { const s = sprite(r); g.globalAlpha = a; g.drawImage(s.c, x - s.cx, y - s.cy); g.globalAlpha = 1; };
  const dims = m => [1 << Math.ceil(m / 2), 1 << Math.floor(m / 2)];
  const cell = (i, m) => { let cx = 0, cy = 0; for (let b = 0; b < m; b++) if ((i >> b) & 1) { if (b % 2 === 0) cx += 1 << (b >> 1); else cy += 1 << (b >> 1); } return [cx, cy]; };
  const BOX = { x: 90, y: 612, w: 900, h: 388 };
  const radius = m => { const [c, r] = dims(m); return Math.min(100, BOX.w / (c * 2.14), BOX.h / (r * 2.14)); };
  const place = (i, m) => { const [c, r] = dims(m), R = radius(m), pit = 2.14 * R, ci = cell(i, m); return [BOX.x + BOX.w / 2 - (c * pit) / 2 + (ci[0] + 0.5) * pit + (hash(i * 3.1) - 0.5) * R * 0.1, BOX.y + BOX.h / 2 - (r * pit) / 2 + (ci[1] + 0.5) * pit + (hash(i * 5.3) - 0.5) * R * 0.1]; };

  // ---------- small helpers ----------
  const dayAt = (t, K) => { let day = K[0][1]; for (let i = 0; i < K.length - 1; i++) { const a = K[i], b = K[i + 1]; if (t >= b[0]) day = b[1]; else if (t > a[0]) { day = lerp(a[1], b[1], ease.inOut(lin(t, a[0], b[0]))); break; } else break; } return day; };
  const label = (g, s, x, y, col, size = 26, al = 'center') => txt(g, s, x, y, F.monoX(size), col, al);
  function chip(g, s, x, y, tone, th, size = 44, maxW = 900, k = 1) {
    const sz = fit(s, F.hero, maxW - 70, size), w = mw(s, F.hero(sz)) + 70, h = sz * 1.45; g.save(); g.translate(x, y); g.scale(0.7 + 0.3 * k, 0.7 + 0.3 * k);
    clay(g, -w / 2, -h / 2, w, h, h / 2, TONE(th)[tone] || tone, { shadowK: 0.6 }); txt(g, s, 0, 3, F.hero(sz), tone === 'bad' || tone === 'ink' ? th.paper : '#0B0F14'); g.restore();
  }
  function stamp(g, s, x, y, tone, th, size, rot, k) {
    const sz = fit(s, F.hero, 840, size), w = mw(s, F.hero(sz)) + 60, h = sz * 1.4, col = TONE(th)[tone] || tone; g.save(); g.translate(x, y); g.rotate(rot); g.scale(1.5 - 0.5 * Math.min(1.05, k), 1.5 - 0.5 * Math.min(1.05, k)); g.globalAlpha *= clamp(k * 3);
    g.fillStyle = 'rgba(11,15,20,.88)'; rr(g, -w / 2, -h / 2, w, h, 14); g.fill(); g.strokeStyle = col; g.lineWidth = 7; rr(g, -w / 2 + 5, -h / 2 + 5, w - 10, h - 10, 10); g.stroke(); txt(g, s, 0, 3, F.hero(sz), col); g.restore();
  }

  // ---------- scene painters (each draws in absolute screen coordinates; `a` = scene alpha, lt = scene-local time) ----------
  function hookText(g, p, t, th) {
    const H = p.hook; if (!H || t > H.until + 0.35) return; const T = TONE(th), k = Math.min(1.06, 0.88 + 0.12 * Math.min(1.1, spring(t + 0.12, { f: 2.6, z: 0.5 }))), fade = 1 - lin(t, H.until, H.until + 0.3);
    let size = H.size; for (const ln of H.lines) { const s = ln.map(x => x[0]).join(''); size = fit(s, F.hero, 920, size, 40); }
    g.save(); g.globalAlpha *= fade; g.translate(540, H.y); g.scale(k, k);
    const lh = size * 1.1; H.lines.forEach((ln, i) => { const s = ln.map(x => x[0]).join(''); let x = -mw(s, F.hero(size)) / 2; const y = (i - (H.lines.length - 1) / 2) * lh; for (const [w, tn] of ln) { const ww = mw(w, F.hero(size)); stk(g, w, x + ww / 2, y, F.hero(size), T[tn] || th.paper, 'center', 16); x += ww; } });
    if (H.sub && t >= H.sub.at) { const kk = spring(t - H.sub.at, 'snappy'); g.globalAlpha *= clamp(kk * 2); const sz = fit(H.sub.text, F.cap, 900, 40, 22); stk(g, H.sub.text, 0, (H.lines.length / 2) * lh + 10 + (1 - kk) * 14, F.cap(sz), th.bad, 'center', 10); }
    g.restore();
  }
  function deal(g, p, lt, t, th, a) {
    const D = p.deal, bw = 920, bh = 196, ys = [712, 936];
    D.cards.forEach((c, i) => {
      const on = t - c.at; if (on <= 0) return; const k = spring(on, 'bouncy'), y = ys[i];
      g.save(); g.translate(540, y + (1 - Math.min(1, k)) * 70); g.scale(0.85 + 0.15 * Math.min(1.06, k), 0.85 + 0.15 * Math.min(1.06, k)); g.globalAlpha *= clamp(on / 0.07);
      clay(g, -bw / 2, -bh / 2 + 16, bw, bh - 16, 48, B.shade(c.col, -0.38), { shadowK: 0.8 }); clay(g, -bw / 2, -bh / 2, bw, bh - 14, 48, c.col, { shadowK: 0.3 });
      g.fillStyle = '#0B0F14'; g.beginPath(); g.arc(-bw / 2 + 98, -6, 62, 0, 7); g.fill(); g.strokeStyle = th.paper; g.lineWidth = 6; g.beginPath(); g.arc(-bw / 2 + 98, -6, 62, 0, 7); g.stroke(); txt(g, c.letter, -bw / 2 + 98, -3, F.hero(96), th.paper);
      const mx = c.icon ? 440 : 640, sz = fit(c.l1, F.hero, mx, 92, 40); txt(g, c.l1, -bw / 2 + 190, -36, F.hero(sz), '#0B0F14', 'left'); const s2 = fit(c.l2, F.monoX, mx, 38, 20); txt(g, c.l2, -bw / 2 + 192, 52, F.monoX(s2), 'rgba(11,15,20,.8)', 'left');
      if (c.icon === 'bill') for (let b = 0; b < 3; b++) { g.save(); g.translate(bw / 2 - 100, 10 - b * 24); g.rotate(-0.06 + b * 0.05); clay(g, -62, -20, 124, 40, 6, '#1FA366', { shadowK: 0.45 }); g.fillStyle = 'rgba(245,243,238,.8)'; g.fillRect(-10, -19, 20, 36); g.restore(); }
      if (c.icon === 'coin') { coin(g, bw / 2 - 70, -6, 50); if (c.dbl) { const sp = spring(t - c.dbl, 'bouncy'); if (sp > 0) { coin(g, bw / 2 - 70 - 110 * Math.min(1.1, sp), -6, 50 * Math.min(1, sp)); } } }
      g.restore(); burst(g, 540, y, 300, c.col, on - 0.04, 12, 0.4);
    });
    if (D.chip && t >= D.chip.at) { const k = spring(t - D.chip.at, 'bouncy'); chip(g, D.chip.text, 540, 1068, 'ink', th, 34, 900, k); }
  }
  function coins(g, p, lt, t, th, dd) {
    const mf = clamp(dd - 1, 0, 9), m = Math.min(9, Math.floor(mf + 1e-4)), fr = Math.max(0, mf - m), u = m >= 9 ? 0 : ease.out(clamp(fr / 0.85)), N = 1 << m, R = lerp(radius(m), radius(m + 1), u);
    for (let i = 0; i < N; i++) { const a0 = place(i, m), a1 = place(i, m + 1); coin(g, lerp(a0[0], a1[0], u), lerp(a0[1], a1[1], u), R); }
    if (u > 0.001) for (let i = N; i < 2 * N; i++) {
      const [x1, y1] = place(i, m + 1), bit = Math.floor(Math.log2(i)), horiz = bit % 2 === 0, ui = ease.out(clamp((fr - 0.3 * hash(i * 1.7)) / 0.7)); if (ui <= 0) continue;
      const ox = horiz ? 560 * (1 - ui) : 0, oy = horiz ? 0 : 440 * (1 - ui), arc = -Math.sin(Math.PI * ui) * 70; coin(g, x1 + ox, y1 + oy + arc, R, clamp(ui * 4)); }
    const dn = Math.floor(dd + 1e-4), n = 1 << (dn - 1), s = n === 1 ? '1 COIN' : fmt(n, 0) + ' COINS', pk = 1 + 0.07 * hit(fr < 0.9 ? fr : 0, 6);
    g.save(); g.translate(540, 1050); g.scale(pk, pk); chip(g, s, 0, 0, 'accent', th, 42, 560); if (fr > 0.02 && fr < 0.95 && m < 9) stk(g, '×2', 300, -2, F.hero(60), th.good, 'center', 12); g.restore();
  }
  function item(g, p, lt, t, th, S) {
    const k = Math.min(1.08, spring(lt, 'bouncy')), cx = 540, cy = 790; g.save(); g.translate(cx, cy); g.scale(0.7 + 0.3 * k, 0.7 + 0.3 * k);
    if (S.kind === 'coffee') {
      for (let i = 0; i < 3; i++) { g.strokeStyle = 'rgba(245,243,238,.7)'; g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); const x = -50 + i * 50, ph = t * 3 + i * 1.7; g.moveTo(x, -150); g.bezierCurveTo(x + 22 * Math.sin(ph), -180, x - 22 * Math.sin(ph), -205, x + 8 * Math.sin(ph + 1), -240); g.stroke(); }
      const cup = () => { g.beginPath(); g.moveTo(-130, -120); g.lineTo(130, -120); g.lineTo(104, 150); g.quadraticCurveTo(100, 176, 76, 176); g.lineTo(-76, 176); g.quadraticCurveTo(-100, 176, -104, 150); g.closePath(); };
      B.shadowed(g, cup, '#F5F3EE', 0.5); g.fillStyle = '#F5F3EE'; cup(); g.fill(); g.fillStyle = '#C48A4A'; g.beginPath(); g.moveTo(-122, -40); g.lineTo(122, -40); g.lineTo(112, 80); g.lineTo(-112, 80); g.closePath(); g.fill();
      g.fillStyle = '#EDE7DA'; rr(g, -146, -150, 292, 40, 16); g.fill(); g.strokeStyle = '#0B0F14'; g.lineWidth = 4; rr(g, -146, -150, 292, 40, 16); g.stroke(); txt(g, '1', 0, 20, F.hero(70), '#3b2410');
      g.strokeStyle = '#F5F3EE'; g.lineWidth = 22; g.beginPath(); g.arc(150, 20, 52, -1.1, 1.1); g.stroke();
    } else {
      const sl = (y, col) => { clay(g, -190, y, 380, 56, 28, col, { shadowK: 0.5 }); };
      sl(40, '#D9A25B'); g.fillStyle = '#7BC74D'; for (let i = 0; i < 8; i++) { g.beginPath(); g.ellipse(-168 + i * 48, 28, 30, 18, 0, 0, 7); g.fill(); } clay(g, -180, -24, 360, 44, 14, '#E8553D', { shadowK: 0.4 }); clay(g, -176, -62, 352, 40, 14, '#F2D064', { shadowK: 0.4 }); sl(-130, '#E0AE6B');
      g.fillStyle = '#F5F3EE'; for (let i = 0; i < 5; i++) { g.beginPath(); g.ellipse(-100 + i * 50, -112, 6, 3.5, 0.4, 0, 7); g.fill(); }
      g.strokeStyle = '#0B0F14'; g.lineWidth = 5; g.beginPath(); g.arc(-70, 40, 6, 0, 7); g.stroke();
    }
    g.restore();
    const kk = spring(lt - 0.25, 'snappy'); g.save(); g.globalAlpha *= clamp(kk * 2); stk(g, S.l1, 540, 1000 + (1 - kk) * 16, F.hero(fit(S.l1, F.hero, 880, 100, 40)), th.accent, 'center', 14); g.restore();
  }
  function bars(g, p, lt, t, th, dd, S) {
    const base = 1032, maxH = 300, v = dol(1) * Math.pow(2, dd - 1), vm = Math.max(1e6, v), hm = (1e6 / vm) * maxH, hp = Math.max(5, (v / vm) * maxH), mx = 300, px = 760, bw = 300;
    g.fillStyle = 'rgba(245,243,238,.75)'; g.fillRect(90, base, 900, 5);
    // million brick (stacked bills)
    clay(g, mx - bw / 2, base - hm, bw, hm, 12, '#1FA366', { shadowK: 0.6 }); g.save(); rr(g, mx - bw / 2, base - hm, bw, hm, 12); g.clip(); g.fillStyle = 'rgba(0,0,0,.14)'; for (let y = base - 15; y > base - hm; y -= 15) g.fillRect(mx - bw / 2, y, bw, 2.5); g.fillStyle = 'rgba(245,243,238,.5)'; g.fillRect(mx - 18, base - hm, 36, hm); g.restore();
    const ml = '$1,000,000'; txt(g, ml, mx, base - hm - 36, F.hero(fit(ml, F.hero, 360, 62)), th.good);
    // dashed million line
    g.save(); g.strokeStyle = 'rgba(245,243,238,.55)'; g.lineWidth = 3; g.setLineDash([12, 9]); g.beginPath(); g.moveTo(mx + bw / 2, base - hm); g.lineTo(px + bw / 2 + 10, base - hm); g.stroke(); g.restore();
    // penny tower
    const top = base - hp, pw = bw; g.save(); const gg = g.createLinearGradient(px - pw / 2, 0, px + pw / 2, 0); gg.addColorStop(0, '#c58f00'); gg.addColorStop(0.4, '#ffe27a'); gg.addColorStop(1, '#b88700'); g.fillStyle = gg; rr(g, px - pw / 2, top, pw, hp, 6); g.fill();
    g.save(); rr(g, px - pw / 2, top, pw, hp, 6); g.clip(); g.fillStyle = 'rgba(100,70,0,.42)'; for (let y = base - 8; y > top; y -= 8) g.fillRect(px - pw / 2, y, pw, 2); g.restore();
    g.fillStyle = '#ffe58a'; g.beginPath(); g.ellipse(px, top, pw / 2, 12, 0, 0, 7); g.fill(); g.strokeStyle = 'rgba(122,88,6,.85)'; g.lineWidth = 3; g.beginPath(); g.ellipse(px, top, pw / 2 - 12, 7, 0, 0, 7); g.stroke(); g.restore();
    const pl = money(Math.floor(dd + 1e-4)); txt(g, pl, px, top - 38, F.hero(fit(pl, F.hero, 430, 62)), v >= 1e6 ? th.good : th.accent);
    label(g, 'A · TAKE THE MILLION', mx, base + 30, 'rgba(245,243,238,.8)', 21); label(g, 'B · YOUR PENNY PILE', px, base + 30, 'rgba(245,243,238,.8)', 21);
    if (v < 1e6 * 0.02) { g.save(); g.strokeStyle = th.accent; g.fillStyle = th.accent; g.lineWidth = 4; const ax = px - bw / 2 - 40; g.beginPath(); g.moveTo(ax - 50, base - 60); g.lineTo(ax, base - 14); g.stroke(); g.beginPath(); g.moveTo(ax + 4, base - 8); g.lineTo(ax - 16, base - 18); g.lineTo(ax - 4, base - 32); g.closePath(); g.fill(); g.restore(); }
  }
  function meter(g, p, lt, t, th, dd, S) {
    const v = dol(1) * Math.pow(2, dd - 1), pct = (v / 1e6) * 100, ds = Math.floor(dd + 1e-4), vs = money(ds), pc = dol(ds) / 1e6 * 100;
    const ps = pc >= 100 ? fmt(Math.round(pc), 0) + '%' : pc < 1 ? pc.toFixed(2) + '%' : pc < 10 ? pc.toFixed(1) + '%' : Math.round(pc) + '%', over = pc >= 100;
    label(g, 'YOUR PENNY PILE vs THE MILLION', 540, 618, 'rgba(245,243,238,.85)', 27);
    const sz = fit(ps, F.hero, 800, 190); stk(g, ps, 540, 770, F.hero(sz), over ? th.good : th.bad, 'center', 16);
    label(g, over ? 'AHEAD OF THE MILLION' : 'STILL BEHIND THE MILLION', 540, 876, over ? th.good : th.bad, 30);
    const x0 = 90, w = 900, y = 922, h = 54; g.fillStyle = 'rgba(245,243,238,.18)'; rr(g, x0, y, w, h, 27); g.fill(); g.strokeStyle = 'rgba(245,243,238,.7)'; g.lineWidth = 3; rr(g, x0, y, w, h, 27); g.stroke();
    const main = w * 0.74, fr = Math.min(pc, 100) / 100 * main + (over ? Math.min(1, (pc - 100) / 437) * (w - main) : 0);
    if (fr > 3) { g.save(); rr(g, x0, y, w, h, 27); g.clip(); clay(g, x0, y, Math.max(fr, 54), h, 27, over ? th.good : th.bad, { shadowK: 0.3 }); g.restore(); }
    g.strokeStyle = th.paper; g.lineWidth = 5; g.beginPath(); g.moveTo(x0 + main, y - 12); g.lineTo(x0 + main, y + h + 12); g.stroke(); label(g, '$1,000,000', x0 + main, y + h + 32, th.paper, 22);
    (S.ticks || []).forEach((tk, i) => { const on = t >= tk.at, cx = 330 + i * 210, k = on ? spring(t - tk.at, 'bouncy') : 0; g.save(); g.translate(cx, 1072); g.scale(0.8 + 0.2 * Math.min(1.1, k), 0.8 + 0.2 * Math.min(1.1, k)); clay(g, -85, -24, 170, 48, 24, on ? th.accent : 'rgba(245,243,238,.18)', { shadowK: 0.4 }); txt(g, 'DAY ' + tk.d, 0, 2, F.monoX(24), on ? '#0B0F14' : 'rgba(245,243,238,.7)'); g.restore(); });
  }
  function boom(g, p, lt, t, th, S) {
    const final = money(30), mid = S.revealAt, k = spring(t - mid, { f: 2.2, z: 0.5 }), pre = t < mid;
    label(g, 'DAY 30 · THE LAST DAY', 540, 632, th.paper, 30);
    const s = pre ? '$?,???,???.??' : final, sz = fit(final, F.hero, 920, 150), sc = pre ? 1 : 0.8 + 0.2 * Math.min(1.08, k);
    g.save(); g.translate(540, 745); g.scale(sc, sc); stk(g, s, 0, 0, F.hero(sz), pre ? 'rgba(245,243,238,.55)' : th.good, 'center', 18); g.restore();
    if (t >= S.chipAt) { const kk = spring(t - S.chipAt, 'bouncy'); chip(g, '5.37× THE MILLION', 540, 840, 'good', th, 52, 860, kk); }
    // coin mound at the bottom (falls in after the reveal)
    const R = 22; for (let row = 0; row < 4; row++) { const n = 12 - row * 2; for (let c = 0; c < n; c++) { const idx = row * 20 + c, dt = t - (mid + 0.04 * idx * 0.35 + 0.1 * hash(idx)), f = ease.out(clamp(dt / 0.45)); if (pre || f <= 0) continue; const x = 540 + (c - (n - 1) / 2) * 2.12 * R, y = 1056 - row * 1.78 * R; coin(g, x, lerp(y - 320, y, f), R, clamp(f * 3)); } }
    if (!pre) burst(g, 540, 745, 380, th.gold, t - mid - 0.02, 22, 0.6);
  }
  function pie(g, p, lt, t, th, S) {
    const cx = 540, cy = 826, r = 214, th2 = 92, f = ease.out(clamp((lt - 0.2) / 1.0)), a0 = -Math.PI / 2, last = 0.875;
    g.save(); g.lineCap = 'butt'; g.lineWidth = th2; g.strokeStyle = 'rgba(245,243,238,.28)'; g.beginPath(); g.arc(cx, cy, r - th2 / 2, a0, a0 + Math.PI * 2 * (1 - last) * f); g.stroke();
    g.strokeStyle = th.gold; g.beginPath(); g.arc(cx, cy, r - th2 / 2, a0 + Math.PI * 2 * (1 - last) * f, a0 + Math.PI * 2 * (1 - last) * f + Math.PI * 2 * last * f); g.stroke(); g.restore();
    const k = spring(t - S.centerAt, 'bouncy'); g.save(); g.globalAlpha *= clamp(k * 2); g.translate(cx, cy); g.scale(0.7 + 0.3 * Math.min(1.08, k), 0.7 + 0.3 * Math.min(1.08, k)); stk(g, '7/8', 0, -6, F.hero(150), th.accent, 'center', 14); g.restore();
    const kk = spring(t - S.centerAt - 0.15, 'snappy'); g.save(); g.globalAlpha *= clamp(kk * 2); chip(g, 'CAME IN THE LAST 3 DAYS', 540, 1062, 'accent', th, 38, 900, kk); g.restore();
  }
  function ask(g, p, lt, t, th, S0) { let S = S0;
    const sw = S0.swap && t >= S0.swap.at, k = spring(sw ? t - S0.swap.at : lt, 'bouncy'); if (sw) S = S0.swap; g.save(); g.translate(540, 672); g.scale(0.7 + 0.3 * Math.min(1.06, k), 0.7 + 0.3 * Math.min(1.06, k)); g.globalAlpha *= clamp(k * 2);
    const l1 = S.l1, l2 = S.l2, sz = Math.min(fit(l1, F.hero, 900, 112), fit(l2, F.hero, 900, 112)); stk(g, l1, 0, -62, F.hero(sz), th.accent, 'center', 16); stk(g, l2, 0, 62, F.hero(sz), th.good, 'center', 16); g.restore();
  }

  Object.assign(window.PD5.h, { fit, stk, chip, stamp, label, coin, mw, TONE });
  // ---------- the stage ----------
  B.register('pstage', {
    defaults: { K: [[0, 1]], scenes: [], hook: null, deal: null, counterIn: 0, hideCounter: [], beats: [], notes: [] }, ownEnter: true, size: () => [1080, 1920],
    draw(g, p, env) {
      const { t, theme: th } = env; g.translate(-540, -960);
      const dd = dayAt(t, p.K), ds = Math.floor(dd + 1e-4), pm = dd - ds;
      // beat label (top right)
      let bl = ''; for (const b of p.beats) if (t >= b[0]) bl = b[1]; if (bl) { const k = spring(t - (p.beats.find(b => b[1] === bl)[0]), 'snappy'); g.save(); g.globalAlpha *= clamp(k * 2); label(g, bl, 990, 264, th.accent, 26, 'right'); g.restore(); }
      // counter card
      const hid = p.hideCounter.some(([a, b]) => t >= a && t < b), ca = clamp((t - p.counterIn) / 0.25) * (hid ? 0 : 1);
      if (ca > 0.01) {
        g.save(); g.globalAlpha *= ca; g.translate(0, (1 - ease.out(clamp((t - p.counterIn) / 0.4))) * -30); paper(g, 70, 322, 940, 230, 26, { lift: 0.3 });
        for (let i = 1; i <= 30; i++) { const x = 98 + (i - 1) * 29.7, on = i <= ds; g.fillStyle = on ? (i >= 28 ? th.good : th.gold) : 'rgba(11,15,20,.14)'; rr(g, x, 342, 24, 22, 6); g.fill(); }
        txt(g, 'DAY', 100, 400, F.monoX(30), th.inkSoft, 'left'); const pk = 1 + 0.12 * Math.exp(-Math.max(0, pm) * 0) * hit(pm > 0.5 ? 0 : pm, 9); txt(g, String(ds), 188, 398, F.hero(64), th.ink, 'left'); txt(g, '/ 30', 188 + mw(String(ds), F.hero(64)) + 14, 404, F.monoX(28), th.inkSoft, 'left');
        label(g, 'YOUR PENNY PILE', 982, 400, th.inkSoft, 26, 'right');
        const vs = money(ds), v = dol(ds), sz = fit(vs, F.hero, 860, 112); g.save(); g.translate(540, 494); const pp = 1 + 0.045 * hit(Math.min(0.5, pm < 0.5 ? pm + 0.001 : 0), 8); g.scale(pp, pp); txt(g, vs, 0, 0, F.hero(sz), v >= 1e6 ? th.goodInk : th.ink); g.restore();
        g.restore();
      }
      // hook text
      hookText(g, p, t, th);
      // scenes
      for (const S of p.scenes) {
        if (t < S.from - 0.02 || t > S.to + 0.02) continue; const lt = t - S.from, kin = spring(lt + 0.08, { f: 2.4, z: 0.7 }), a = clamp(lt / 0.12) * (1 - lin(t, S.to - 0.12, S.to)), sc = (S.pop === false ? 1 : 0.94 + 0.06 * Math.min(1.05, kin));
        g.save(); g.globalAlpha *= a; g.translate(540, 840); g.scale(sc, sc); g.translate(-540, -840);
        if (S.type === 'deal') deal(g, p, lt, t, th, a); else if (S.type === 'coins') coins(g, p, lt, t, th, dd); else if (S.type === 'item') item(g, p, lt, t, th, S); else if (S.type === 'bars') bars(g, p, lt, t, th, dd, S);
        else if (S.type === 'meter') meter(g, p, lt, t, th, dd, S); else if (S.type === 'boom') boom(g, p, lt, t, th, S); else if (S.type === 'pie') pie(g, p, lt, t, th, S); else if (S.type === 'ask') ask(g, p, lt, t, th, S);
        g.restore();
      }
      // notes (chips / stamps)
      for (const n of p.notes) if (t >= n.at && t < n.out + 0.2) { const nt = t - n.at, k = Math.min(1.08, spring(nt, 'bouncy')), fo = 1 - lin(t, n.out - 0.15, n.out + 0.05); g.save(); g.globalAlpha *= clamp(nt / 0.06) * fo; if (n.stamp) stamp(g, n.text, 540, n.y || 598, n.tone || 'good', th, n.size || 62, n.rot || -0.04, k); else chip(g, n.text, 540, n.y || 598, n.tone || 'bad', th, n.size || 44, 900, k); g.restore(); }
    },
  });
  // small always-on chip row element: HYPOTHETICAL
  B.register('hypo', {
    defaults: { text: 'HYPOTHETICAL · NOT FINANCIAL ADVICE' }, ownEnter: true, size: () => [10, 10],
    draw(g, p, env) { const s = p.text, f = F.monoX(21), w = mw(s, f) + 36; g.globalAlpha *= 0.9; g.fillStyle = 'rgba(11,15,20,.78)'; rr(g, -w / 2, -18, w, 36, 18); g.fill(); g.strokeStyle = env.theme.accent; g.lineWidth = 2; rr(g, -w / 2, -18, w, 36, 18); g.stroke(); txt(g, s, 0, 1, f, env.theme.accent); },
  });
})();
