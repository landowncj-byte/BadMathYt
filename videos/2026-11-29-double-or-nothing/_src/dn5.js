// ===== double-or-nothing — full-screen stage 'dstage' (screen space, camera can never crop). Layout: pill y238-290 | counter y322-552 | zone y590-1085 | row y1100-1335 | captions y~1432.
// Math (beats-v3.md): 1000 x 2^n; 10 wins = 1,024,000; chance 1/1024 = 0.0977%; 1,023 of 1,024 leave with 0; average payout = 1,024,000 / 1,024 = 1,000.
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, burst, hash, hit } = B;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const fmt = (v, d = 0) => B.fmtNum(v, d, true);
  window.DN5 = { h: {} };
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
  function hookText(g, p, t, th) {
    const H = p.hook; if (!H || t > H.until + 0.35) return; const T = TONE(th), k = Math.min(1.06, 0.88 + 0.12 * Math.min(1.1, spring(t + 0.12, { f: 2.6, z: 0.5 }))), fade = 1 - lin(t, H.until, H.until + 0.3);
    let size = H.size; for (const ln of H.lines) { const s = ln.map(x => x[0]).join(''); size = fit(s, F.hero, 920, size, 40); }
    g.save(); g.globalAlpha *= fade; g.translate(540, H.y); g.scale(k, k);
    const lh = size * 1.1; H.lines.forEach((ln, i) => { const s = ln.map(x => x[0]).join(''); let x = -mw(s, F.hero(size)) / 2; const y = (i - (H.lines.length - 1) / 2) * lh; for (const [w, tn] of ln) { const ww = mw(w, F.hero(size)); stk(g, w, x + ww / 2, y, F.hero(size), T[tn] || th.paper, 'center', 16); x += ww; } });
    g.restore();
  }
  const bill = (g, x, y, w, h, lab) => { clay(g, x, y, w, h, 10, '#1FA366', { shadowK: 0.5 }); g.strokeStyle = 'rgba(245,243,238,.7)'; g.lineWidth = 3; rr(g, x + 8, y + 8, w - 16, h - 16, 6); g.stroke(); g.fillStyle = 'rgba(245,243,238,.9)'; g.beginPath(); g.arc(x + w / 2, y + h / 2, h * 0.3, 0, 7); g.fill(); txt(g, lab, x + w / 2, y + h / 2 + 2, F.hero(h * 0.3), '#0B0F14'); };
  // ---------- the coin: a real flip (toss, spin, land, tiny bounce). flips: [{at, dur, res:'H'|'T', spins}] ----------
  function coinBody(g, r, face) {
    g.fillStyle = '#7a5806'; g.beginPath(); g.arc(0, r * 0.12, r, 0, 7); g.fill();
    const rim = g.createRadialGradient(-r * 0.3, -r * 0.35, r * 0.1, 0, 0, r); rim.addColorStop(0, '#ffe58a'); rim.addColorStop(1, '#E3A400'); g.fillStyle = rim; g.beginPath(); g.arc(0, 0, r, 0, 7); g.fill();
    g.strokeStyle = 'rgba(122,88,6,.55)'; g.lineWidth = r * 0.05; for (let i = 0; i < 40; i++) { const a = i / 40 * 6.2832; g.beginPath(); g.moveTo(Math.cos(a) * r * 0.92, Math.sin(a) * r * 0.92); g.lineTo(Math.cos(a) * r * 0.99, Math.sin(a) * r * 0.99); g.stroke(); }
    g.strokeStyle = 'rgba(122,88,6,.9)'; g.lineWidth = r * 0.06; g.beginPath(); g.arc(0, 0, r * 0.8, 0, 7); g.stroke();
    txt(g, face, 0, r * 0.06, F.hero(r * 1.05), '#7a5806'); txt(g, face === 'H' ? 'HEADS' : 'TAILS', 0, -r * 0.6, F.monoX(Math.max(10, r * 0.15)), '#7a5806'); txt(g, '★  ★  ★', 0, r * 0.62, F.monoX(Math.max(10, r * 0.15)), '#7a5806');
  }
  function tossState(flips, t) {
    let a = 0, res = 'H';
    for (let q = 0; q < flips.length; q++) {
      const f = flips[q]; if (t < f.at) break; const dur = f.dur || 0.7, u = (t - f.at) / dur, delta = 2 * Math.PI * (f.spins || 2) + (f.res !== res ? Math.PI : 0);
      if (u < 1) { const e = ease.inOut(u); return { ang: a + delta * e, y: -4 * u * (1 - u), air: true }; }
      a += delta; res = f.res; const d = t - f.at - dur;
      if (q === flips.length - 1 || t < flips[q + 1].at) return { ang: a, y: d < 0.5 ? -Math.abs(Math.sin(d * 16)) * Math.exp(-d * 9) * 0.22 : 0, air: false };
    }
    return { ang: a, y: 0, air: false };
  }
  function drawCoin(g, cx, cy, r, flips, t, lift) {
    const s = tossState(flips, t), y = cy + s.y * lift, c = Math.cos(s.ang), sy = Math.max(0.07, Math.abs(c)), face = c >= 0 ? 'H' : 'T', hh = clamp(-s.y, 0, 1);
    g.save(); g.fillStyle = 'rgba(0,0,0,' + (0.24 * (1 - hh * 0.6)) + ')'; g.beginPath(); g.ellipse(cx, cy + r * 1.15, r * (1 - hh * 0.35), r * 0.2 * (1 - hh * 0.35), 0, 0, 7); g.fill(); g.restore();
    g.save(); g.translate(cx, y); g.scale(1, sy); coinBody(g, r, face); g.restore(); return s;
  }
  // ---------- scenes ----------
  function choice(g, p, lt, t, th, S) {
    const cards = [[90, S.cash], [580, S.coin]];
    cards.forEach(([x0, c], i) => { const on = t - c.at; if (on <= 0) return; const k = Math.min(1.08, spring(on, 'bouncy')), picked = S.pick != null && t >= S.pick && i === 1, ps = picked ? 1 + 0.04 * Math.sin(Math.min(1, (t - S.pick) * 3) * 3.14) : 1;
      g.save(); g.translate(x0 + 205, 800 + (1 - Math.min(1, k)) * 60); g.scale((0.85 + 0.15 * k) * ps, (0.85 + 0.15 * k) * ps); g.globalAlpha *= clamp(on / 0.07);
      paper(g, -205, -215, 410, 430, 22, { lift: 0.5 }); if (picked) { g.strokeStyle = th.accent; g.lineWidth = 9; rr(g, -205, -215, 410, 430, 22); g.stroke(); }
      if (i === 0) { for (let b = 4; b >= 0; b--) { g.save(); g.translate(0, -40 + b * 18); g.rotate((b - 2) * 0.03); bill(g, -120, -42, 240, 100, '$' + (b < 4 ? '200' : '200')); g.restore(); } txt(g, '$1,000', 0, 120, F.hero(66), '#0B0F14'); txt(g, 'CASH · RIGHT NOW', 0, 176, F.monoX(22), '#59606B'); }
      else { g.save(); g.translate(0, -26); drawCoin(g, 0, 0, 100, c.flips || [], t, 55); g.restore(); txt(g, '×2  OR  $0', 0, 112, F.hero(70), '#0B0F14'); txt(g, 'FLIP A COIN', 0, 176, F.monoX(22), '#59606B'); }
      g.restore(); });
    if (S.or && t >= S.or) { const k = Math.min(1.1, spring(t - S.or, 'bouncy')); g.save(); g.translate(540, 800); g.scale(k, k); g.fillStyle = '#0B0F14'; g.beginPath(); g.arc(0, 0, 46, 0, 7); g.fill(); g.strokeStyle = th.accent; g.lineWidth = 5; g.stroke(); txt(g, 'OR', 0, 3, F.hero(44), th.accent); g.restore(); }
    if (S.chip && t >= S.chip.at) chip(g, S.chip.text, 540, 1062, S.chip.tone || 'ink', th, 38, 900, spring(t - S.chip.at, 'bouncy'));
  }
  function cash(g, p, lt, t, th, S) {
    const n = 10; for (let i = 0; i < n; i++) { const at = S.at + i * 0.09, on = t - at; if (on <= 0) continue; const k = Math.min(1.1, spring(on, 'snappy')); g.save(); g.globalAlpha *= clamp(on / 0.05); g.translate(540 + (i % 2 ? 6 : -6), 880 - i * 21 - (1 - Math.min(1, k)) * 90); g.rotate((i % 3 - 1) * 0.025); bill(g, -190, -56, 380, 118, '$100'); g.restore(); }
    if (t > S.at + 0.9) { const k = spring(t - S.at - 0.9, 'bouncy'); g.save(); g.globalAlpha *= clamp(k * 2); g.translate(540, 640); g.scale(0.8 + 0.2 * Math.min(1.08, k), 0.8 + 0.2 * Math.min(1.08, k)); stk(g, '$1,000', 0, 0, F.hero(150), th.good, 'center', 16); g.restore(); }
    if (S.chip && t >= S.chip.at) chip(g, S.chip.text, 540, 1062, 'ink', th, 38, 900, spring(t - S.chip.at, 'bouncy'));
  }
  function demo(g, p, lt, t, th, S) {
    const s = drawCoin(g, 540, 770, 130, S.flips, t, 70);
    S.flips.forEach((f, i) => { const L = f.at + (f.dur || 0.7), on = t - L; if (on < 0) return; const nxt = S.flips[i + 1]; if (nxt && t >= nxt.at) return; const k = Math.min(1.1, spring(on, 'bouncy')), H = f.res === 'H';
      g.save(); g.globalAlpha *= clamp(on / 0.06); g.translate(540, 985); g.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k);
      clay(g, -420, -52, 840, 104, 52, H ? th.good : th.bad, { shadowK: 0.6 }); txt(g, H ? 'HEADS: $1,000 → $2,000' : 'TAILS: $0', 0, 3, F.hero(fit(H ? 'HEADS: $1,000 → $2,000' : 'TAILS: $0', F.hero, 780, 60)), H ? '#0B0F14' : th.paper); g.restore(); if (on < 0.5) burst(g, 540, 985, 300, H ? th.good : th.bad, on - 0.03, 12, 0.4); });
  }
  function tenrow(g, p, lt, t, th, S) {
    stk(g, S.title || 'WIN 10 IN A ROW', 540, 640, F.hero(fit(S.title || 'WIN 10 IN A ROW', F.hero, 880, 74)), th.accent, 'center', 12);
    for (let i = 0; i < 10; i++) { const on = t - (S.at + i * 0.11); if (on <= 0) continue; const k = Math.min(1.12, spring(on, 'bouncy')), c = i % 5, r = Math.floor(i / 5), x = 540 + (c - 2) * 178, y = 790 + r * 190;
      g.save(); g.translate(x, y); g.scale(k, k); g.globalAlpha *= clamp(on / 0.05); coinBody(g, 76, 'H'); g.restore(); txt(g, String(i + 1), x + 70, y - 72, F.monoX(26), th.paper); }
    if (S.chip && t >= S.chip.at) chip(g, S.chip.text, 540, 1062, 'ink', th, 36, 900, spring(t - S.chip.at, 'bouncy'));
  }
  function bignum(g, p, lt, t, th, S) {
    const u = ease.out(clamp((t - S.at) / S.dur)), v = Math.round(S.num * u), s = (S.pre || '') + fmt(v), k = Math.min(1.08, spring(lt, 'bouncy')), big = (S.pre || '') + fmt(S.num);
    g.save(); g.translate(540, 790); g.scale(0.85 + 0.15 * k, 0.85 + 0.15 * k); stk(g, s, 0, 0, F.hero(fit(big, F.hero, 880, 210)), S.col || th.good, 'center', 18); g.restore();
    if (S.l1) stk(g, S.l1, 540, 930, F.hero(fit(S.l1, F.hero, 860, 80)), th.paper, 'center', 12);
    if (S.chip && t >= S.chip.at) chip(g, S.chip.text, 540, 1050, S.chip.tone || 'accent', th, 40, 900, spring(t - S.chip.at, 'bouncy'));
  }
  function big(g, p, lt, t, th, S) {
    const k = Math.min(1.1, spring(t - S.at, 'bouncy')); g.save(); g.globalAlpha *= clamp((t - S.at) / 0.08); g.translate(540, 790); g.scale(0.7 + 0.3 * k, 0.7 + 0.3 * k);
    stk(g, S.text, 0, 0, F.hero(fit(S.text, F.hero, 880, S.size || 200)), S.col || th.good, 'center', 18); g.restore();
    if (S.l1) stk(g, S.l1, 540, 930, F.hero(fit(S.l1, F.hero, 860, 78)), th.paper, 'center', 12);
    if (S.chip && t >= S.chip.at) chip(g, S.chip.text, 540, 1050, S.chip.tone || 'accent', th, 38, 900, spring(t - S.chip.at, 'bouncy'));
  }
  const LAB = ['$2,000', '$4,000', '$8,000', '$16,000', '$32,000', '$64,000', '$128,000', '$256,000', '$512,000', '$1,024,000'];
  function car(g, x, y, s, k) { g.save(); g.translate(x, y); g.scale(s * k, s * k); g.fillStyle = '#2c3e66'; g.beginPath(); g.moveTo(-90, 0); g.lineTo(-86, -34); g.quadraticCurveTo(-60, -40, -44, -66); g.lineTo(34, -66); g.quadraticCurveTo(58, -42, 84, -34); g.lineTo(92, 0); g.closePath(); g.fill(); g.strokeStyle = '#0B0F14'; g.lineWidth = 4; g.stroke(); g.fillStyle = '#9ad7ff'; g.beginPath(); g.moveTo(-36, -58); g.lineTo(-24, -34); g.lineTo(-4, -34); g.lineTo(-4, -58); g.closePath(); g.moveTo(8, -58); g.lineTo(8, -34); g.lineTo(52, -34); g.lineTo(36, -58); g.closePath(); g.fill(); for (const wx of [-52, 52]) { g.fillStyle = '#0B0F14'; g.beginPath(); g.arc(wx, 4, 20, 0, 7); g.fill(); g.fillStyle = '#c9ccd2'; g.beginPath(); g.arc(wx, 4, 9, 0, 7); g.fill(); } g.restore(); }
  function ladder(g, p, lt, t, th, S) {
    const fl = S.flips, s = drawCoin(g, 540, 705, 88, fl, t, 50); let won = 0; fl.forEach(f => { if (t >= f.at + (f.dur || 0.55) - 0.02) won = Math.max(won, f.n); });
    for (let i = 0; i < 10; i++) { const c = i % 5, r = Math.floor(i / 5), x = 90 + c * 182, y = 842 + r * 92, lit = i < won, on = t - (S.lit[i] ?? 9999), k = lit ? Math.min(1.12, spring(on, 'bouncy')) : 0;
      g.save(); g.translate(x + 86, y + 38); const sc = lit ? 0.96 + 0.1 * Math.min(1, k) : 1; g.scale(sc, sc);
      clay(g, -86, -38, 172, 76, 16, lit ? (i === 9 ? th.good : th.gold) : 'rgba(245,243,238,.12)', { shadowK: lit ? 0.5 : 0 }); if (!lit) { g.strokeStyle = 'rgba(245,243,238,.35)'; g.lineWidth = 3; rr(g, -86, -38, 172, 76, 16); g.stroke(); }
      txt(g, 'FLIP ' + (i + 1), 0, -20, F.monoX(17), lit ? 'rgba(11,15,20,.7)' : 'rgba(245,243,238,.6)'); const lb = LAB[i]; txt(g, lb, 0, 12, F.hero(fit(lb, F.hero, 156, 34)), lit ? '#0B0F14' : 'rgba(245,243,238,.65)'); g.restore(); }
    if (S.car && t >= S.car.at) { const k = Math.min(1.1, spring(t - S.car.at, 'bouncy')); car(g, 190, 700, 0.95, k); g.save(); g.globalAlpha *= clamp(k); txt(g, 'A NICE CAR', 190, 766, F.monoX(20), th.gold); g.restore(); }
    let ch = null; for (const c of S.chips || []) if (t >= c.at) ch = c; if (ch && !(S.chipOut && t >= S.chipOut)) chip(g, ch.text, 540, 1062, ch.tone || 'ink', th, 38, 900, spring(t - ch.at, 'bouncy'));
  }
  // ---------- the crowd: 1,024 people, one flip at a time ----------
  const GN = 32, GP = 13.5, GX = 540 - GN * GP / 2, GY = 598, ORD = (() => { const o = Array.from({ length: 1024 }, (_, i) => i).sort((a, b) => hash(a * 12.9898 + 1.7) - hash(b * 12.9898 + 1.7)), c = 16 * 32 + 16, k = o.indexOf(c); o[k] = o[1023]; o[1023] = c; return o; })();
  const ELIM = (() => { const e = new Array(1024); const cuts = [512, 768, 896, 960, 992, 1008, 1016, 1020, 1022, 1023]; for (let k = 0; k < 1024; k++) { let f = 11; for (let j = 0; j < 10; j++) if (k < cuts[j]) { f = j + 1; break; } e[ORD[k]] = f; } return e; })();
  const left = (t, F10) => { let n = 0; for (const f of F10) if (t >= f) n++; return n; };
  function crowd(g, p, lt, t, th, S) {
    const F10 = p.crowdFlips, n = left(t, F10), alive = 1024 >> n, appear = S.appear ?? S.from;
    for (let i = 0; i < 1024; i++) {
      const c = i % GN, r = Math.floor(i / GN), x = GX + (c + 0.5) * GP, y = GY + (r + 0.5) * GP, e = ELIM[i], ft = e <= 10 ? F10[e - 1] : 1e9, k = t - ft, ap = clamp((t - appear - (c + r) * 0.012) / 0.15);
      if (ap <= 0) continue; if (k < 0) { const sv = e === 11; g.fillStyle = sv && t >= (S.spotAt ?? 1e9) ? '#fff' : (hash(i * 3.7) > 0.5 ? '#F2B705' : '#FFD60A'); g.beginPath(); g.arc(x, y, 4.6 * ap * (sv && t >= (S.spotAt ?? 1e9) ? 1.5 : 1), 0, 7); g.fill(); }
      else if (k < 0.45) { const u = k / 0.45; g.fillStyle = 'rgba(229,83,75,' + (1 - u * 0.4) + ')'; g.beginPath(); g.arc(x, y, 4.6 * (1 + 0.5 * Math.sin(u * 3.1)) * (1 - u * 0.45), 0, 7); g.fill(); }
      else { g.fillStyle = 'rgba(245,243,238,.13)'; g.beginPath(); g.arc(x, y, 2.4, 0, 7); g.fill(); } }
    // side numbers
    label(g, 'FLIP', 90, 690, th.paper, 28, 'left'); stk(g, String(n), 90, 770, F.hero(120), th.accent, 'left', 12); label(g, 'OF 10', 90, 846, 'rgba(245,243,238,.8)', 24, 'left');
    label(g, 'PEOPLE LEFT', 990, 690, th.paper, 28, 'right'); stk(g, fmt(alive), 990, 770, F.hero(fit(fmt(alive), F.hero, 250, 120)), alive === 1 ? th.good : th.paper, 'right', 12);
    if (S.holds) label(g, n ? 'EACH HOLDS $' + fmt(1000 * (1 << n)) : 'EACH STARTS WITH $1,000', 990, 846, th.gold, 22, 'right');
    // the halving pop
    for (let j = 0; j < 10; j++) { const k = t - F10[j]; if (k > 0 && k < 0.7) { g.save(); g.globalAlpha *= 1 - k / 0.7; stk(g, '÷ 2', 540, 800 - k * 80, F.hero(110), th.bad, 'center', 14); g.restore(); } }
    // the one left
    if (S.spotAt != null && t >= S.spotAt) { const o = t - S.spotAt, cx = GX + (16 + 0.5) * GP, cy = GY + (16 + 0.5) * GP; for (let q = 0; q < 3; q++) { const u = ((o * 0.9 + q / 3) % 1); g.strokeStyle = 'rgba(0,210,106,' + (1 - u) + ')'; g.lineWidth = 5; g.beginPath(); g.arc(cx, cy, 14 + u * 70, 0, 7); g.stroke(); } if (o < 0.5) burst(g, cx, cy, 160, th.good, o - 0.02, 12, 0.4); }
    for (const nt of S.tags || []) if (t >= nt.at && (!nt.out || t < nt.out)) { const k = spring(t - nt.at, 'bouncy'); chip(g, nt.text, 540, nt.y || 1062, nt.tone || 'ink', th, nt.size || 38, 900, k); }
  }
  function days(g, p, lt, t, th, S) {
    const cols = 64, rows = 16, P = 14, x0 = 540 - cols * P / 2, y0 = 640; label(g, '1,024 DAYS ≈ 2.8 YEARS OF DAYS', 540, 612, th.paper, 26);
    for (let i = 0; i < 1024; i++) { const c = i % cols, r = Math.floor(i / cols), ap = clamp((t - S.at - c * 0.01 - r * 0.02) / 0.15); if (ap <= 0) continue; const hit0 = i === 531 && t >= S.pickAt; g.fillStyle = hit0 ? th.good : 'rgba(245,243,238,.35)'; g.beginPath(); g.arc(x0 + (c + 0.5) * P, y0 + (r + 0.5) * P, hit0 ? 8 : 4.2 * ap, 0, 7); g.fill(); }
    if (t >= S.pickAt) { const o = t - S.pickAt, cx = x0 + (531 % cols + 0.5) * P, cy = y0 + (Math.floor(531 / cols) + 0.5) * P; for (let q = 0; q < 2; q++) { const u = ((o * 0.9 + q / 2) % 1); g.strokeStyle = 'rgba(0,210,106,' + (1 - u) + ')'; g.lineWidth = 4; g.beginPath(); g.arc(cx, cy, 10 + u * 50, 0, 7); g.stroke(); } }
    if (S.chip && t >= S.chip.at) chip(g, S.chip.text, 540, 1010, S.chip.tone || 'ink', th, 38, 900, spring(t - S.chip.at, 'bouncy'));
  }
  function odds(g, p, lt, t, th, S) {
    const k = Math.min(1.08, spring(lt, 'bouncy')); g.save(); g.translate(540, 700); g.scale(0.85 + 0.15 * k, 0.85 + 0.15 * k); stk(g, '1 IN 1,024', 0, 0, F.hero(fit('1 IN 1,024', F.hero, 880, 160)), th.accent, 'center', 16); g.restore();
    const bx = 90, bw = 900, by = 830; g.fillStyle = 'rgba(245,243,238,.16)'; rr(g, bx, by, bw, 64, 32); g.fill(); g.strokeStyle = 'rgba(245,243,238,.7)'; g.lineWidth = 3; rr(g, bx, by, bw, 64, 32); g.stroke();
    const on = t - S.at; if (on > 0) { const u = ease.out(clamp(on / 0.5)); g.fillStyle = th.bad; g.fillRect(bx + 4, by - 16, 7 * u, 96); const ax = bx + 60, ay = by + 128; g.save(); g.globalAlpha *= u; g.strokeStyle = th.bad; g.lineWidth = 5; g.beginPath(); g.moveTo(bx + 8, by + 82); g.lineTo(ax - 20, ay - 28); g.stroke(); stk(g, 'ABOUT 0.1%', ax + 20, ay + 6, F.hero(64), th.bad, 'left', 12); g.restore(); }
    label(g, '0%', bx, by + 98, 'rgba(245,243,238,.7)', 22, 'left'); label(g, '100%', bx + bw, by + 98, 'rgba(245,243,238,.7)', 22, 'right');
    if (S.chip && t >= S.chip.at) chip(g, S.chip.text, 540, 1050, S.chip.tone || 'ink', th, 38, 900, spring(t - S.chip.at, 'bouncy'));
  }
  function duo(g, p, lt, t, th, S) {
    [S.a, S.b].forEach((c, i) => { const on = t - c.at; if (on <= 0) return; const k = spring(on, 'bouncy'), y = 720 + i * 224, bw = 920, bh = 196, col = c.col;
      g.save(); g.translate(540, y + (1 - Math.min(1, k)) * 70); g.scale(0.85 + 0.15 * Math.min(1.06, k), 0.85 + 0.15 * Math.min(1.06, k)); g.globalAlpha *= clamp(on / 0.07);
      clay(g, -bw / 2, -bh / 2 + 16, bw, bh - 16, 48, B.shade(col, -0.38), { shadowK: 0.8 }); clay(g, -bw / 2, -bh / 2, bw, bh - 14, 48, col, { shadowK: 0.3 });
      const sz = fit(c.l1, F.hero, 840, 82, 36); txt(g, c.l1, 0, -34, F.hero(sz), c.ink || '#0B0F14'); const s2 = fit(c.l2, F.hero, 840, 74, 36); txt(g, c.l2, 0, 44, F.hero(s2), c.ink || '#0B0F14'); g.restore(); });
  }
  function eq(g, p, lt, t, th, S) {
    [S.a, S.b].forEach((c, i) => { const on = t - c.at; if (on <= 0) return; const k = spring(on, 'bouncy'), x = i ? 770 : 310; g.save(); g.translate(x, 800 + (1 - Math.min(1, k)) * 60); g.scale(0.85 + 0.15 * Math.min(1.06, k), 0.85 + 0.15 * Math.min(1.06, k)); g.globalAlpha *= clamp(on / 0.07);
      clay(g, -215, -190, 430, 380, 36, B.shade(c.col, -0.38), { shadowK: 0.8 }); clay(g, -215, -190, 430, 366, 36, c.col, { shadowK: 0.3 });
      txt(g, c.l1, 0, -110, F.hero(fit(c.l1, F.hero, 380, 54)), '#0B0F14'); txt(g, c.l2, 0, -20, F.hero(fit(c.l2, F.hero, 390, 84)), '#0B0F14'); txt(g, c.l3, 0, 100, F.hero(fit(c.l3, F.hero, 380, 46)), '#0B0F14'); g.restore(); });
    if (S.mid && t >= S.mid) { const k = Math.min(1.12, spring(t - S.mid, 'bouncy')); g.save(); g.translate(540, 800); g.scale(k, k); g.fillStyle = '#0B0F14'; g.beginPath(); g.arc(0, 0, 52, 0, 7); g.fill(); g.strokeStyle = th.good; g.lineWidth = 6; g.stroke(); txt(g, '=', 0, 3, F.hero(76), th.good); g.restore(); }
    if (S.chip && t >= S.chip.at) chip(g, S.chip.text, 540, 1062, S.chip.tone || 'ink', th, 36, 900, spring(t - S.chip.at, 'bouncy'));
  }
  function ask(g, p, lt, t, th, S) {
    const k = spring(lt, 'bouncy'); g.save(); g.translate(540, 800); g.scale(0.7 + 0.3 * Math.min(1.06, k), 0.7 + 0.3 * Math.min(1.06, k)); g.globalAlpha *= clamp(k * 2);
    const sz = Math.min(fit(S.l1, F.hero, 900, 112), fit(S.l2, F.hero, 900, 112)); stk(g, S.l1, 0, -62, F.hero(sz), th.accent, 'center', 16); stk(g, S.l2, 0, 62, F.hero(sz), th.good, 'center', 16); g.restore();
  }
  const SC = { choice, cash, demo, tenrow, bignum, big, ladder, crowd, days, odds, duo, eq, ask };
  Object.assign(window.DN5.h, { fit, stk, chip, stamp, label, mw, TONE });
  B.register('dstage', {
    defaults: { K: [[0, 0]], C: [], scenes: [], hook: null, hideCounter: [], beats: [], notes: [], crowdFlips: [] }, ownEnter: true, size: () => [1080, 1920],
    draw(g, p, env) {
      const { t, theme: th } = env; g.translate(-540, -960);
      const x = xAt(t, p.K);
      let bl = ''; for (const b of p.beats) if (t >= b[0]) bl = b[1]; if (bl) { const k = spring(t - (p.beats.find(b => b[1] === bl)[0]), 'snappy'); g.save(); g.globalAlpha *= clamp(k * 2); label(g, bl, 990, 264, th.accent, 26, 'right'); g.restore(); }
      let seg = p.C[0]; for (const s of p.C) if (t >= s.from) seg = s; const hid = p.hideCounter.some(([a, b]) => t >= a && t < b), segT = t - seg.from, pop = 1 + 0.05 * hit(Math.min(0.5, Math.max(0, segT)), 8);
      if (!hid) {
        g.save(); g.translate(540, 437); g.scale(pop, pop); g.translate(-540, -437); paper(g, 70, 322, 940, 230, 26, { lift: 0.3 });
        let L, R, fr; const m = seg.mode;
        if (m === 'f') { const pot = 1000 * Math.pow(2, x); L = ['FLIPS WON', String(Math.round(x))]; R = ['YOUR POT', '$' + fmt(Math.round(pot))]; fr = x / 10; }
        else if (m === 'c') { const n = left(t, p.crowdFlips); L = ['FLIP', n + ' / 10']; R = ['PEOPLE LEFT', fmt(1024 >> n)]; fr = (1024 >> n) / 1024; }
        else { L = ['PEOPLE', '1,024']; R = ['AVERAGE PAYOUT', '$' + fmt(Math.round(x))]; fr = x / 1000; }
        g.fillStyle = 'rgba(11,15,20,.14)'; rr(g, 98, 344, 884, 22, 11); g.fill(); const fw = clamp(m === 'c' ? 1 - fr : fr) * 884; if (fw > 4) { g.fillStyle = m === 'c' ? th.bad : th.gold; rr(g, 98, 344, Math.max(22, fw), 22, 11); g.fill(); }
        label(g, L[0], 100, 398, th.inkSoft, 28, 'left'); label(g, R[0], 980, 398, th.inkSoft, 28, 'right');
        const sL = fit(L[1], F.hero, 430, 118, 40), sR = fit(R[1], F.hero, 430, 118, 40);
        txt(g, L[1], 100, 484, F.hero(sL), th.ink, 'left'); txt(g, R[1], 980, 484, F.hero(sR), m === 'c' && 1024 >> left(t, p.crowdFlips) === 1 ? th.good : th.ink, 'right');
        g.restore();
      }
      hookText(g, p, t, th);
      for (const S of p.scenes) {
        if (t < S.from - 0.02 || t > S.to + 0.02) continue; const lt = t - S.from, kin = spring(lt + 0.08, { f: 2.4, z: 0.7 }), a = clamp(lt / 0.12) * (1 - lin(t, S.to - 0.12, S.to)), sc = (S.pop === false ? 1 : 0.94 + 0.06 * Math.min(1.05, kin));
        g.save(); g.globalAlpha *= a; g.translate(540, 840); g.scale(sc, sc); g.translate(-540, -840);
        const fn = SC[S.type]; if (!fn) throw new Error('unknown scene type ' + S.type); fn(g, p, lt, t, th, S);
        g.restore();
      }
      for (const n of p.notes) if (t >= n.at && t < n.out + 0.2) { const nt = t - n.at, k = Math.min(1.08, spring(nt, 'bouncy')), fo = 1 - lin(t, n.out - 0.15, n.out + 0.05); g.save(); g.globalAlpha *= clamp(nt / 0.06) * fo; if (n.stamp) stamp(g, n.text, 540, n.y || 598, n.tone || 'good', th, n.size || 62, n.rot || -0.04, k); else chip(g, n.text, 540, n.y || 598, n.tone || 'bad', th, n.size || 44, 900, k); g.restore(); }
    },
  });
  B.register('hypo', {
    defaults: { text: 'HYPOTHETICAL' }, ownEnter: true, size: () => [10, 10],
    draw(g, p, env) { const s = p.text, f = F.monoX(21), w = mw(s, f) + 36; g.globalAlpha *= 0.9; g.fillStyle = 'rgba(11,15,20,.78)'; rr(g, -w / 2, -18, w, 36, 18); g.fill(); g.strokeStyle = env.theme.accent; g.lineWidth = 2; rr(g, -w / 2, -18, w, 36, 18); g.stroke(); txt(g, s, 0, 1, f, env.theme.accent); },
  });
})();
