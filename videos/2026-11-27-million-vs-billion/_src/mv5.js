// ===== million-vs-billion v5 — ONE clean idea at a time. Full-screen stage ('mstage') drawn in screen space (camera can never crop it).
// Layout (1080x1920): pill y238-290 | counter card y322-552 | scene zone y590-1085 | row y1100-1335 (YOU left, chip middle, storyteller right) | captions y~1432.
// Math (beats-v3.md): $1,000,000 / $1,000 per day = 1,000 days = 2.74 yrs; $1B = 1,000,000 days = 2,737.85 yrs; 2026 - 2738 ~ 712 BC;
// 1,000,000 s = 11.57 days; 1,000,000,000 s = 31.69 yrs. Everything below is computed in code from those definitions.
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, burst, hash, hit } = B;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const fmt = (v, d = 0) => B.fmtNum(v, d, true);
  window.MV5 = { h: {} };
  const fit = (s, ff, maxW, size, min = 18) => { while (size > min && mw(s, ff(size)) > maxW) size -= 2; return size; };
  const stk = (g, s, x, y, font, col, al = 'center', lw = 12) => { g.save(); g.font = font; g.textAlign = al; g.textBaseline = 'middle'; g.lineJoin = 'round'; g.lineWidth = lw; g.strokeStyle = 'rgba(6,8,11,.92)'; g.strokeText(s, x, y); g.fillStyle = col; g.fillText(s, x, y); g.restore(); };
  const TONE = th => ({ paper: th.paper, accent: th.accent, good: th.good, bad: th.bad, gold: th.gold, ink: '#0B0F14' });
  const label = (g, s, x, y, col, size = 26, al = 'center') => txt(g, s, x, y, F.monoX(size), col, al);
  const YR = 365.25, DAY = 86400;
  const xAt = (t, K) => { let v = K[0][1]; for (let i = 0; i < K.length - 1; i++) { const a = K[i], b = K[i + 1]; if (t >= b[0]) v = b[1]; else if (t > a[0]) { v = lerp(a[1], b[1], ease.inOut(lin(t, a[0], b[0]))); break; } else break; } return v; };
  const yearLabel = yrsBack => { const y = 2026 - yrsBack; if (y >= 1) return Math.floor(y) + ' AD'; return Math.max(1, Math.round(-y)) + ' BC'; };
  function chip(g, s, x, y, tone, th, size = 44, maxW = 900, k = 1) {
    const sz = fit(s, F.hero, maxW - 70, size), w = mw(s, F.hero(sz)) + 70, h = sz * 1.45; g.save(); g.translate(x, y); g.scale(0.7 + 0.3 * k, 0.7 + 0.3 * k);
    clay(g, -w / 2, -h / 2, w, h, h / 2, TONE(th)[tone] || tone, { shadowK: 0.6 }); txt(g, s, 0, 3, F.hero(sz), tone === 'bad' || tone === 'ink' ? th.paper : '#0B0F14'); g.restore();
  }
  function stamp(g, s, x, y, tone, th, size, rot, k) {
    const sz = fit(s, F.hero, 840, size), w = mw(s, F.hero(sz)) + 60, h = sz * 1.4, col = TONE(th)[tone] || tone; g.save(); g.translate(x, y); g.rotate(rot); g.scale(1.5 - 0.5 * Math.min(1.05, k), 1.5 - 0.5 * Math.min(1.05, k)); g.globalAlpha *= clamp(k * 3);
    g.fillStyle = 'rgba(11,15,20,.88)'; rr(g, -w / 2, -h / 2, w, h, 14); g.fill(); g.strokeStyle = col; g.lineWidth = 7; rr(g, -w / 2 + 5, -h / 2 + 5, w - 10, h - 10, 10); g.stroke(); txt(g, s, 0, 3, F.hero(sz), col); g.restore();
  }
  // a gift card centred at the origin
  function gift(g, w, h, col, amount, th, sz, sub) {
    clay(g, -w / 2, -h / 2 + 12, w, h - 12, 28, B.shade(col, -0.38), { shadowK: 0.8 }); clay(g, -w / 2, -h / 2, w, h - 12, 28, col, { shadowK: 0.3 });
    g.fillStyle = 'rgba(11,15,20,.82)'; g.fillRect(-w / 2 + 2, -h / 2 + h * 0.2, w - 4, h * 0.13);
    label(g, 'GIFT CARD', -w / 2 + 34, -h / 2 + h * 0.1, '#0B0F14', Math.max(18, Math.round(h * 0.11)), 'left');
    const s = fit(amount, F.hero, w - 70, sz, 24); txt(g, amount, 0, h * 0.14, F.hero(s), '#0B0F14');
    if (sub) label(g, sub, 0, h / 2 - h * 0.17, 'rgba(11,15,20,.75)', Math.max(16, Math.round(h * 0.075)));
  }
  // bill-stack block
  const blk = (g, x, y, w, h, col, top) => { g.fillStyle = col; g.fillRect(x, y, w, h); g.fillStyle = top; g.fillRect(x, y, w, Math.max(1.5, h * 0.28)); };

  // ---------- scene painters (absolute screen coordinates; lt = scene-local time) ----------
  function hookText(g, p, t, th) {
    const H = p.hook; if (!H || t > H.until + 0.35) return; const T = TONE(th), k = Math.min(1.06, 0.88 + 0.12 * Math.min(1.1, spring(t + 0.12, { f: 2.6, z: 0.5 }))), fade = 1 - lin(t, H.until, H.until + 0.3);
    let size = H.size; for (const ln of H.lines) { const s = ln.map(x => x[0]).join(''); size = fit(s, F.hero, 920, size, 40); }
    g.save(); g.globalAlpha *= fade; g.translate(540, H.y); g.scale(k, k);
    const lh = size * 1.1; H.lines.forEach((ln, i) => { const s = ln.map(x => x[0]).join(''); let x = -mw(s, F.hero(size)) / 2; const y = (i - (H.lines.length - 1) / 2) * lh; for (const [w, tn] of ln) { const ww = mw(w, F.hero(size)); stk(g, w, x + ww / 2, y, F.hero(size), T[tn] || th.paper, 'center', 16); x += ww; } });
    g.restore();
  }
  function cards2(g, p, lt, t, th, S) {
    (S.cards || []).forEach(c => {
      const on = t - c.at; if (on <= 0) return; const k = Math.min(1.08, spring(on, 'bouncy'));
      g.save(); g.translate(540, c.y + (1 - Math.min(1, k)) * 60); g.scale(0.85 + 0.15 * k, 0.85 + 0.15 * k); g.globalAlpha *= clamp(on / 0.07);
      gift(g, c.w, 98, c.col, c.amount, th, 58); g.restore(); if (on < 0.5) burst(g, 540, c.y, 260, c.col, on - 0.04, 10, 0.4);
    });
  }
  function gcard(g, p, lt, t, th, S, x) {
    const k = Math.min(1.08, spring(lt, 'bouncy')), bal = Math.max(0, S.cap - 1000 * x), cx = 540, cy = 826;
    g.save(); g.translate(cx, cy); g.scale(0.78 + 0.22 * k, 0.78 + 0.22 * k);
    const empty = bal <= 0;
    gift(g, 880, 400, S.col, '$' + fmt(Math.round(bal)), th, 150, empty ? 'EMPTY' : 'BALANCE');
    // the daily spend tag
    const fl = (t * 2.6) % 1; g.save(); g.globalAlpha *= (1 - fl) * (empty ? 0 : 1); stk(g, '-$1,000', 300, -178 - fl * 40, F.hero(54), th.bad, 'center', 10); g.restore();
    g.restore();
    chip(g, 'SPEND $1,000 EVERY DAY', 540, 1058, empty ? 'bad' : 'ink', th, 36, 900, k);
  }
  function pile(g, p, lt, t, th, S, x) {
    const N = 1000, rem = Math.max(0, Math.round(N - x)), cols = 50, pw = 18, ph = 15, x0 = 90, y0 = 650;
    for (let i = 0; i < N; i++) { const cx = x0 + (i % cols) * pw, cy = y0 + Math.floor(i / cols) * ph; const alive = i < rem; if (!alive) { g.fillStyle = 'rgba(245,243,238,.07)'; g.fillRect(cx + 1, cy + 1, pw - 2, ph - 2); continue; } const last = i === rem - 1 || (rem - i) < 6 && x > 1; blk(g, cx + 1, cy + 1, pw - 2, ph - 2, last ? '#E5534B' : '#1FA366', last ? '#ff9a93' : '#7fe0b0'); }
    label(g, 'EACH BLOCK = $1,000 = ONE DAY', 540, 978, 'rgba(245,243,238,.85)', 26);
    const bal = '$' + fmt(rem * 1000) + ' LEFT'; chip(g, bal, 540, 1040, rem === 0 ? 'bad' : 'ink', th, 40, 900);
    if (rem === 0) { stamp(g, 'BROKE', 540, 790, 'bad', th, 130, -0.05, spring(t - S.zeroAt, 'bouncy')); }
  }
  function vs(g, p, lt, t, th, S) {
    const rows = [S.a, S.b], max = S.max || 4.6, W = 900;
    rows.forEach((r, i) => {
      const on = t - r.at; if (on <= 0) return; const k = ease.out(clamp(on / 0.9)), y = 730 + i * 215;
      g.save(); g.globalAlpha *= clamp(on / 0.15);
      label(g, r.label, 90, y - 8, 'rgba(245,243,238,.9)', 28, 'left'); stk(g, r.text, 990, y - 6, F.hero(fit(r.text, F.hero, 440, 56)), i === 0 ? th.bad : th.accent, 'right', 10);
      g.fillStyle = 'rgba(245,243,238,.14)'; rr(g, 90, y + 30, W, 74, 37); g.fill();
      g.save(); rr(g, 90, y + 30, W, 74, 37); g.clip(); clay(g, 90, y + 30, Math.max(74, W * (r.yrs / max) * k), 74, 37, i === 0 ? th.bad : th.accent, { shadowK: 0.3 }); g.restore(); g.restore();
    });
    if (S.chip && t >= S.chip.at) chip(g, S.chip.text, 540, 1060, 'good', th, 40, 900, spring(t - S.chip.at, 'bouncy'));
  }
  function list(g, p, lt, t, th, S) {
    (S.items || []).forEach((c, i) => { const on = t - c.at; if (on <= 0) return; const k = Math.min(1.08, spring(on, 'bouncy')), y = 676 + i * 108;
      g.save(); g.translate(540, y + (1 - Math.min(1, k)) * 40); g.scale(0.85 + 0.15 * k, 0.85 + 0.15 * k); g.globalAlpha *= clamp(on / 0.07);
      clay(g, -450, -48, 900, 96, 48, c.col, { shadowK: 0.6 }); txt(g, c.text, 0, 3, F.hero(fit(c.text, F.hero, 820, 62)), c.ink || '#0B0F14'); g.restore(); });
  }
  function bignum(g, p, lt, t, th, S) {
    const u = ease.out(clamp((t - S.at) / S.dur)), v = Math.round(S.num * u), s = fmt(v), k = Math.min(1.08, spring(lt, 'bouncy'));
    g.save(); g.translate(540, 780); g.scale(0.85 + 0.15 * k, 0.85 + 0.15 * k); stk(g, s, 0, 0, F.hero(fit(fmt(S.num), F.hero, 860, 260)), th.accent, 'center', 18); g.restore();
    stk(g, S.l1, 540, 930, F.hero(fit(S.l1, F.hero, 860, 100)), th.paper, 'center', 12);
    if (S.chip && t >= S.chip.at) chip(g, S.chip.text, 540, 1040, 'accent', th, 42, 900, spring(t - S.chip.at, 'bouncy'));
  }
  function tline(g, p, lt, t, th, S, x) {
    const yb = x / YR, v = 2026 - yb, mx = vv => 90 + (vv + 800) / 2826 * 900, ay = 905, fade = clamp(lt / 0.2);
    g.fillStyle = 'rgba(245,243,238,.75)'; g.fillRect(90, ay, 900, 6);
    [[0, '1 AD'], [1000, '1000 AD']].forEach(([vv, l]) => { g.fillStyle = 'rgba(245,243,238,.75)'; g.fillRect(mx(vv) - 2, ay - 12, 4, 30); label(g, l, mx(vv), ay + 44, 'rgba(245,243,238,.85)', 24); });
    g.fillStyle = th.paper; g.fillRect(mx(2026) - 2, ay - 16, 4, 38); label(g, 'TODAY', 990, ay + 44, th.paper, 24, 'right');
    // travelled path
    const mxp = mx(v); g.fillStyle = th.accent; rr(g, mxp, ay - 4, mx(2026) - mxp, 14, 7); g.fill();
    // little Rome
    if (t >= S.romeAt) { const k = Math.min(1.1, spring(t - S.romeAt, 'bouncy')), rx = mx(-753), ry = ay - 6; g.save(); g.translate(rx + 22, ry); g.scale(k, k);
      [[-18, 30, 22], [4, 40, 30], [30, 28, 20]].forEach(([dx, w, h], i) => { g.fillStyle = ['#C98B5A', '#D9A25B', '#B97848'][i]; g.fillRect(dx - w / 2, -h, w, h); g.fillStyle = '#7a3e22'; g.beginPath(); g.moveTo(dx - w / 2 - 4, -h); g.lineTo(dx, -h - 16); g.lineTo(dx + w / 2 + 4, -h); g.closePath(); g.fill(); });
      g.restore(); g.save(); g.globalAlpha *= clamp((t - S.romeAt) / 0.2); label(g, 'ROME: A BRAND-NEW', 90, ay - 104, th.gold, 28, 'left'); label(g, 'LITTLE TOWN', 90, ay - 70, th.gold, 28, 'left'); g.restore(); }
    // moving marker
    g.save(); g.translate(mxp, ay + 3); g.fillStyle = '#0B0F14'; g.beginPath(); g.arc(0, 0, 24, 0, 7); g.fill(); g.fillStyle = th.accent; g.beginPath(); g.arc(0, 0, 18, 0, 7); g.fill(); g.restore();
    stk(g, yearLabel(yb), 540, 712, F.hero(fit('2026 AD', F.hero, 700, 112)), v < 1 ? th.accent : th.paper, 'center', 14);
    label(g, 'YEAR YOU HAVE TO START', 540, 612, 'rgba(245,243,238,.85)', 26);
    if (S.pinAt && t >= S.pinAt) { const k = spring(t - S.pinAt, 'bouncy'); g.save(); g.globalAlpha *= clamp(k * 2); chip(g, 'START HERE · ~700 BC', 540, 1040, 'accent', th, 42, 900, k); g.restore(); }
  }
  function stack(g, p, lt, t, th, S) {
    const cols = 50, x0 = 90, y0 = 650, pw0 = 18, ph0 = 15, N = 1000;
    let cnt = 0, txtS = ''; for (const s of S.steps) if (t >= s.at) { cnt = s.n; txtS = s.text; }
    const mu = S.mergeAt ? ease.inOut(clamp((t - S.mergeAt) / 0.9)) : 0;
    for (let i = 0; i < N; i++) {
      let tin = -1; for (let s = 0; s < S.steps.length; s++) { const st = S.steps[s], prev = s ? S.steps[s - 1].n : 0; if (i >= prev && i < st.n) tin = st.at + 0.35 * (i - prev) / Math.max(1, st.n - prev); }
      if (tin < 0 || t < tin) continue; const k = Math.min(1.1, spring(t - tin, 'snappy')), cx = x0 + (i % cols) * pw0, cy = y0 + Math.floor(i / cols) * ph0, gap = 1 - mu;
      g.save(); g.globalAlpha *= clamp((t - tin) / 0.05); g.translate(cx + pw0 / 2, cy + ph0 / 2); g.scale(k, k); blk(g, -pw0 / 2 + gap, -ph0 / 2 + gap, pw0 - 2 * gap, ph0 - 2 * gap, '#1FA366', '#7fe0b0'); g.restore();
    }
    if (mu > 0.95) { const k = spring(t - S.mergeAt - 0.8, 'bouncy'); g.save(); g.globalAlpha *= clamp(k * 2); g.translate(540, 800); g.scale(0.8 + 0.2 * Math.min(1.08, k), 0.8 + 0.2 * Math.min(1.08, k)); clay(g, -300, -64, 600, 128, 22, '#F5F3EE', { shadowK: 0.6 }); txt(g, '$1,000,000,000', 0, 4, F.hero(fit('$1,000,000,000', F.hero, 540, 80)), '#0B0F14'); g.restore(); }
    if (txtS) chip(g, mu > 0.95 ? '1,000 MILLIONS = ONE BILLION' : txtS, 540, 1040, 'ink', th, 38, 900);
    label(g, 'EACH BLOCK = ONE $1,000,000 PILE', 540, 988, 'rgba(245,243,238,.85)', 24);
  }
  function calendar(g, p, lt, t, th, S, x) {
    const days = x / DAY, cw = 118, ch = 118, gap = 10, x0 = 97, y0 = 652;
    label(g, 'TWO WEEKS ON A CALENDAR', 540, 622, 'rgba(245,243,238,.85)', 26);
    for (let i = 0; i < 14; i++) { const cx = x0 + (i % 7) * (cw + gap), cy = y0 + 30 + Math.floor(i / 7) * (ch + gap), f = clamp(days - i);
      g.fillStyle = 'rgba(245,243,238,.14)'; rr(g, cx, cy, cw, ch, 14); g.fill(); if (f > 0) { g.save(); rr(g, cx, cy, cw, ch, 14); g.clip(); clay(g, cx, cy + ch * (1 - f), cw, ch * f, 8, th.accent, { shadowK: 0.2 }); g.restore(); }
      g.strokeStyle = 'rgba(245,243,238,.5)'; g.lineWidth = 3; rr(g, cx, cy, cw, ch, 14); g.stroke(); txt(g, String(i + 1), cx + cw / 2, cy + ch / 2 + 2, F.hero(54), f > 0.5 ? '#0B0F14' : th.paper); }
    chip(g, '1,000,000 SECONDS = ' + days.toFixed(1) + ' DAYS', 540, 1040, 'ink', th, 38, 900);
  }
  function life(g, p, lt, t, th, S, x) {
    const yrs = x / (DAY * YR), mxA = 80, bx = 90, bw = 900, by = 790, bh = 80, f = yrs / mxA;
    label(g, 'YOUR LIFE', 90, 700, 'rgba(245,243,238,.9)', 30, 'left'); label(g, 'AGE 0 → ' + Math.round(yrs), 990, 700, th.accent, 30, 'right');
    g.fillStyle = 'rgba(245,243,238,.14)'; rr(g, bx, by, bw, bh, 40); g.fill();
    g.save(); rr(g, bx, by, bw, bh, 40); g.clip(); clay(g, bx, by, Math.max(bh, bw * f), bh, 40, th.bad, { shadowK: 0.3 }); g.restore();
    g.strokeStyle = 'rgba(245,243,238,.7)'; g.lineWidth = 3; rr(g, bx, by, bw, bh, 40); g.stroke();
    [0, 20, 40, 60, 80].forEach(a => { const ax = bx + bw * a / mxA; g.fillStyle = 'rgba(245,243,238,.8)'; g.fillRect(ax - 2, by + bh + 8, 4, 18); label(g, String(a), Math.min(990 - 14, Math.max(104, ax)), by + bh + 52, 'rgba(245,243,238,.85)', 26); });
    chip(g, 'COUNTING NON-STOP · NO SLEEP', 540, 1040, 'ink', th, 38, 900);
  }
  function duo(g, p, lt, t, th, S) {
    [S.a, S.b].forEach((c, i) => { const on = t - c.at; if (on <= 0) return; const k = spring(on, 'bouncy'), y = 720 + i * 224, bw = 920, bh = 196, col = c.col;
      g.save(); g.translate(540, y + (1 - Math.min(1, k)) * 70); g.scale(0.85 + 0.15 * Math.min(1.06, k), 0.85 + 0.15 * Math.min(1.06, k)); g.globalAlpha *= clamp(on / 0.07);
      clay(g, -bw / 2, -bh / 2 + 16, bw, bh - 16, 48, B.shade(col, -0.38), { shadowK: 0.8 }); clay(g, -bw / 2, -bh / 2, bw, bh - 14, 48, col, { shadowK: 0.3 });
      const sz = fit(c.l1, F.hero, 840, 82, 36); txt(g, c.l1, 0, -34, F.hero(sz), '#0B0F14'); const s2 = fit(c.l2, F.hero, 840, 74, 36); txt(g, c.l2, 0, 44, F.hero(s2), '#0B0F14'); g.restore(); });
  }
  function ask(g, p, lt, t, th, S) {
    const k = spring(lt, 'bouncy'); g.save(); g.translate(540, 800); g.scale(0.7 + 0.3 * Math.min(1.06, k), 0.7 + 0.3 * Math.min(1.06, k)); g.globalAlpha *= clamp(k * 2);
    const sz = Math.min(fit(S.l1, F.hero, 900, 112), fit(S.l2, F.hero, 900, 112)); stk(g, S.l1, 0, -62, F.hero(sz), th.accent, 'center', 16); stk(g, S.l2, 0, 62, F.hero(sz), th.good, 'center', 16); g.restore();
  }

  Object.assign(window.MV5.h, { fit, stk, chip, stamp, label, mw, TONE });
  // ---------- the stage ----------
  B.register('mstage', {
    defaults: { K: [[0, 0]], C: [], scenes: [], hook: null, hideCounter: [], beats: [], notes: [] }, ownEnter: true, size: () => [1080, 1920],
    draw(g, p, env) {
      const { t, theme: th } = env; g.translate(-540, -960);
      const x = xAt(t, p.K);
      let bl = ''; for (const b of p.beats) if (t >= b[0]) bl = b[1]; if (bl) { const k = spring(t - (p.beats.find(b => b[1] === bl)[0]), 'snappy'); g.save(); g.globalAlpha *= clamp(k * 2); label(g, bl, 990, 264, th.accent, 26, 'right'); g.restore(); }
      // counter card (live from frame 0)
      let seg = p.C[0]; for (const s of p.C) if (t >= s.from) seg = s; const hid = p.hideCounter.some(([a, b]) => t >= a && t < b), segT = t - seg.from, pop = 1 + 0.05 * hit(Math.min(0.5, Math.max(0, segT)), 8);
      if (!hid) {
        g.save(); g.translate(540, 437); g.scale(pop, pop); g.translate(-540, -437); paper(g, 70, 322, 940, 230, 26, { lift: 0.3 });
        let L, R, fr; const m = seg.mode;
        if (m === 'm' || m === 'b') { const days = Math.floor(x + 1e-6); L = ['DAY', fmt(days)]; R = ['YEARS', fmt(x / YR, m === 'm' ? 2 : (x / YR < 100 ? 1 : 0))]; fr = x / seg.max; }
        else if (m === 'y') { L = ['YEARS BACK', fmt(Math.floor(x / YR))]; R = ['YEAR', yearLabel(x / YR)]; fr = x / seg.max; }
        else if (m === 'n') { L = ['PILES OF $1M', fmt(Math.floor(x + 1e-6))]; R = ['TOTAL', '$' + fmt(Math.floor(x + 1e-6) * 1e6)]; fr = x / seg.max; }
        else { L = ['SECONDS COUNTED', fmt(Math.floor(x))]; R = [seg.u === 'y' ? 'YEARS' : 'DAYS', seg.u === 'y' ? (x / (DAY * YR)).toFixed(1) : (x / DAY).toFixed(1)]; fr = x / seg.max; }
        g.fillStyle = 'rgba(11,15,20,.14)'; rr(g, 98, 344, 884, 22, 11); g.fill(); const fw = clamp(fr) * 884; if (fw > 4) { g.fillStyle = m === 'y' ? th.gold : fr >= 0.999 ? th.bad : th.gold; rr(g, 98, 344, Math.max(22, fw), 22, 11); g.fill(); }
        label(g, L[0], 100, 398, th.inkSoft, 28, 'left'); label(g, R[0], 980, 398, th.inkSoft, 28, 'right');
        const sL = fit(L[1], F.hero, 430, 118, 40), sR = fit(R[1], F.hero, 430, 118, 40);
        txt(g, L[1], 100, 484, F.hero(sL), th.ink, 'left'); txt(g, R[1], 980, 484, F.hero(sR), m === 'y' ? th.bad : th.ink, 'right');
        g.restore();
      }
      hookText(g, p, t, th);
      for (const S of p.scenes) {
        if (t < S.from - 0.02 || t > S.to + 0.02) continue; const lt = t - S.from, kin = spring(lt + 0.08, { f: 2.4, z: 0.7 }), a = clamp(lt / 0.12) * (1 - lin(t, S.to - 0.12, S.to)), sc = (S.pop === false ? 1 : 0.94 + 0.06 * Math.min(1.05, kin));
        g.save(); g.globalAlpha *= a; g.translate(540, 840); g.scale(sc, sc); g.translate(-540, -840);
        const T = S.type;
        if (T === 'cards2') cards2(g, p, lt, t, th, S); else if (T === 'gcard') gcard(g, p, lt, t, th, S, x); else if (T === 'pile') pile(g, p, lt, t, th, S, x); else if (T === 'vs') vs(g, p, lt, t, th, S);
        else if (T === 'list') list(g, p, lt, t, th, S); else if (T === 'bignum') bignum(g, p, lt, t, th, S); else if (T === 'tline') tline(g, p, lt, t, th, S, x); else if (T === 'stack') stack(g, p, lt, t, th, S);
        else if (T === 'calendar') calendar(g, p, lt, t, th, S, x); else if (T === 'life') life(g, p, lt, t, th, S, x); else if (T === 'duo') duo(g, p, lt, t, th, S); else if (T === 'ask') ask(g, p, lt, t, th, S);
        g.restore();
      }
      for (const n of p.notes) if (t >= n.at && t < n.out + 0.2) { const nt = t - n.at, k = Math.min(1.08, spring(nt, 'bouncy')), fo = 1 - lin(t, n.out - 0.15, n.out + 0.05); g.save(); g.globalAlpha *= clamp(nt / 0.06) * fo; if (n.stamp) stamp(g, n.text, 540, n.y || 598, n.tone || 'good', th, n.size || 62, n.rot || -0.04, k); else chip(g, n.text, 540, n.y || 598, n.tone || 'bad', th, n.size || 44, 900, k); g.restore(); }
    },
  });
  B.register('hypo', {
    defaults: { text: 'HYPOTHETICAL · $1,000 A DAY · NO INTEREST' }, ownEnter: true, size: () => [10, 10],
    draw(g, p, env) { const s = p.text, f = F.monoX(21), w = mw(s, f) + 36; g.globalAlpha *= 0.9; g.fillStyle = 'rgba(11,15,20,.78)'; rr(g, -w / 2, -18, w, 36, 18); g.fill(); g.strokeStyle = env.theme.accent; g.lineWidth = 2; rr(g, -w / 2, -18, w, 36, 18); g.stroke(); txt(g, s, 0, 1, f, env.theme.accent); },
  });
})();
