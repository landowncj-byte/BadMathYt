// ===== Victor Lustig — Decoded crime-show stage (screen space). Layout: pill y238-290 | live card y322-552 | zone y590-1085 | row y1100-1335 | captions ~1432.
// Facts: voice/beats-v3.md + research/2026-11-27/victor-lustig-eiffel-tower. Eiffel Tower sale = LEGEND (sepia stamps); arrest/escape/plea/20 yrs = FACT / COURT RECORD (green).
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, burst, hash, hit } = B;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const fmt = (v, d = 0) => B.fmtNum(v, d, true);
  window.V5 = { h: {} };
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
  // ===== Victor Lustig — Decoded stage. LEGEND (sepia) vs FACT (green) stamps. Photos: DOJ record 1931 (2.jpg), 1935 clipping (1.jpg), both PD.
  const P2 = 'brand/photos/victor-lustig/2.jpg', P1 = 'brand/photos/victor-lustig/1.jpg';
  const LEG = '#8A5217', LEGB = '#E8D9B8';
  const cst = (g, th, t, o) => B.crimeStamp(g, th, t, o);
  const img = s => B.images[s];
  const KIND = { a: { src: P2, crop: [0.04, 0.15, 0.27, 0.35], fx: 0.5, fy: 0.48 }, p: { src: P2, crop: [0.36, 0.16, 0.22, 0.34], fx: 0.49, fy: 0.48 }, c: { src: P1, crop: [0.36, 0.07, 0.22, 0.28], fx: 0.49, fy: 0.51 } };
  // his face in a rect. o: k 'a' (DOJ front) | 'p' (DOJ profile) | 'c' (1935 clipping); zoom; mono; sepia
  function face(g, x, y, w, h, o = {}) { const K = KIND[o.k || 'a']; g.save(); rr(g, x, y, w, h, 8); g.clip(); B.drawPhoto(g, img(K.src), x, y, w, h, { crop: K.crop, fx: K.fx + (o.fx || 0), fy: K.fy + (o.fy || 0), zoom: o.zoom || 1 });
    if (o.mono) { g.globalCompositeOperation = 'saturation'; g.fillStyle = '#808080'; g.fillRect(x, y, w, h); g.globalCompositeOperation = 'source-over'; }
    if (o.sepia) { g.globalCompositeOperation = 'multiply'; g.fillStyle = 'rgba(232,196,140,.75)'; g.fillRect(x, y, w, h); g.globalCompositeOperation = 'source-over'; }
    g.restore(); g.strokeStyle = 'rgba(11,15,20,.45)'; g.lineWidth = 3; rr(g, x, y, w, h, 8); g.stroke(); }
  const pk = (t, at, o = 'bouncy') => Math.min(1.1, spring(t - at, o));
  const sub = (g, s, x, y, col, size = 24, al = 'center') => txt(g, s, x, y, F.monoX(size), col, al);
  const bottomChip = (g, S, t, th) => { let ch = null; for (const c of (S.chips || (S.chip ? [S.chip] : []))) if (t >= c.at) ch = c; if (ch && !(S.chipOut && t >= S.chipOut)) chip(g, ch.text, 540, ch.y || 1062, ch.tone || 'ink', th, ch.size || 38, 900, spring(t - ch.at, 'bouncy')); };
  const enter = (g, t, at, x, y, dy = 70, rot = 0) => { g.save(); const k = pk(t, at); g.translate(x, y + (1 - Math.min(1, k)) * dy); g.rotate(rot); g.scale(0.9 + 0.1 * k, 0.9 + 0.1 * k); g.globalAlpha *= clamp((t - at) / 0.08); return k; };
  const hdr = (g, th, w, y0, s, h = 52, col) => { g.fillStyle = col || th.navy; rr(g, -w / 2 + 10, y0, w - 20, h, 12); g.fill(); txt(g, s, 0, y0 + h / 2 + 2, F.monoX(24), th.gold); };
  const strike = (g, th, x0, x1, y, u) => { g.strokeStyle = th.bad; g.lineWidth = 14; g.lineCap = 'round'; g.beginPath(); g.moveTo(x0, y + 10); g.lineTo(x0 + (x1 - x0) * u, y - 10 * u); g.stroke(); };
  const bigX = (g, cx, cy, r, u, lw = 22) => { g.save(); g.strokeStyle = '#E0281E'; g.lineWidth = lw; g.lineCap = 'round'; const a = clamp(u * 2), b = clamp(u * 2 - 1); g.beginPath(); g.moveTo(cx - r, cy - r); g.lineTo(cx - r + 2 * r * a, cy - r + 2 * r * a); g.stroke(); if (b > 0) { g.beginPath(); g.moveTo(cx + r, cy - r); g.lineTo(cx + r - 2 * r * b, cy - r + 2 * r * b); g.stroke(); } g.restore(); };
  const legendStamp = (g, th, t, at, text = 'LEGEND', o = {}) => { if (at != null) cst(g, th, t, { text, at, tone: LEG, size: 60, rot: -0.1, x: 0, y: 0, ...o }); };
  const factStamp = (g, th, t, at, text = 'FACT', o = {}) => { if (at != null) cst(g, th, t, { text, at, tone: 'good', size: 60, rot: -0.08, x: 0, y: 0, ...o }); };
  // ---- the tower, line art, centred, height 300*s
  function tower(g, s, col, lw = 7) {
    g.save(); g.scale(s, s); g.strokeStyle = col; g.fillStyle = col; g.lineCap = 'round'; g.lineJoin = 'round'; const W = y => 5 + 86 * Math.pow((y + 150) / 300, 2.1);
    g.lineWidth = lw; g.beginPath(); for (let y = -150; y <= 150; y += 10) { y === -150 ? g.moveTo(-W(y), y) : g.lineTo(-W(y), y); } g.stroke(); g.beginPath(); for (let y = -150; y <= 150; y += 10) { y === -150 ? g.moveTo(W(y), y) : g.lineTo(W(y), y); } g.stroke();
    g.lineWidth = lw * 0.9; g.beginPath(); g.moveTo(0, -150); g.lineTo(0, -190); g.stroke();
    g.lineWidth = lw * 0.7; const plat = [-60, 14, 96]; for (const y of plat) { g.beginPath(); g.moveTo(-W(y) - 10, y); g.lineTo(W(y) + 10, y); g.stroke(); }
    g.lineWidth = lw * 0.4; const zig = (ya, yb, n) => { for (let i = 0; i < n; i++) { const y0 = lerp(ya, yb, i / n), y1 = lerp(ya, yb, (i + 1) / n); g.beginPath(); g.moveTo(-W(y0), y0); g.lineTo(W(y1), y1); g.moveTo(W(y0), y0); g.lineTo(-W(y1), y1); g.stroke(); } };
    zig(-150, -60, 3); zig(-60, 14, 2); zig(14, 96, 2);
    g.lineWidth = lw * 0.9; g.beginPath(); g.moveTo(-W(150) + 6, 150); g.quadraticCurveTo(0, 20, W(150) - 6, 150); g.stroke(); g.restore();
  }
  // ---- coloured illustration bust (dealers): hat, face, suit
  function bust(g, x, y, s, col, o = {}) { g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = col; g.strokeStyle = '#0B0F14'; g.lineWidth = 5; g.beginPath(); g.moveTo(-50, 70); g.quadraticCurveTo(-50, 8, 0, 8); g.quadraticCurveTo(50, 8, 50, 70); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = '#F1C9A0'; g.beginPath(); g.arc(0, -22, 30, 0, 7); g.fill(); g.stroke(); g.fillStyle = o.hat || '#3a3f4a'; g.beginPath(); g.ellipse(0, -40, 44, 10, 0, 0, 7); g.fill(); g.stroke(); g.beginPath(); g.roundRect(-26, -72, 52, 36, 8); g.fill(); g.stroke();
    g.fillStyle = '#0B0F14'; g.beginPath(); g.arc(-10, -22, 3.5, 0, 7); g.arc(10, -22, 3.5, 0, 7); g.fill(); g.lineWidth = 4; g.beginPath(); if (o.sad) { g.arc(0, -4, 8, 3.5, 5.9); } else g.arc(0, -10, 9, 0.2, 2.9); g.stroke();
    if (o.blush) { g.fillStyle = 'rgba(224,40,30,.45)'; g.beginPath(); g.arc(-19, -12, 7, 0, 7); g.arc(19, -12, 7, 0, 7); g.fill(); } g.restore(); }
  function bill(g, x, y, w, h, fake, th, rot = 0) { g.save(); g.translate(x, y); g.rotate(rot); clay(g, -w / 2, -h / 2, w, h, 8, '#1FA366', { shadowK: 0.5 }); g.strokeStyle = 'rgba(245,243,238,.8)'; g.lineWidth = 4; rr(g, -w / 2 + 8, -h / 2 + 8, w - 16, h - 16, 5); g.stroke(); g.fillStyle = '#F5F3EE'; g.beginPath(); g.arc(0, 0, h * 0.27, 0, 7); g.fill(); txt(g, '$', 0, 3, F.hero(h * 0.36), '#188a56'); txt(g, '100', -w / 2 + 34, -h / 2 + 24, F.hero(h * 0.2), '#F5F3EE'); txt(g, '100', w / 2 - 34, h / 2 - 24, F.hero(h * 0.2), '#F5F3EE'); if (fake) { g.save(); g.rotate(-0.3); g.globalAlpha *= 0.9; txt(g, 'FAKE', 0, 4, F.hero(h * 0.5), th.bad); g.restore(); } g.restore(); }
  const ICON = {
    scrap(g, th) { g.lineCap = 'round'; const bars = [[-70, 30, 0.1], [-10, 40, -0.15], [60, 24, 0.05], [-40, -10, -0.05], [30, -6, 0.2]]; bars.forEach(([x, y, r], i) => { g.save(); g.translate(x, y); g.rotate(r); clay(g, -52, -14, 104, 28, 6, i % 2 ? '#8892a0' : '#a9b2bf', { shadowK: 0.4 }); g.restore(); }); g.strokeStyle = th.bad; g.lineWidth = 10; g.beginPath(); g.arc(0, -52, 36, 0.4, 5.6); g.stroke(); g.fillStyle = th.bad; g.beginPath(); g.moveTo(32, -76); g.lineTo(58, -48); g.lineTo(20, -46); g.closePath(); g.fill(); },
    badge(g, th) { B.crimeIcon(g, 'badge', 230, th); }, cuffs(g, th) { B.crimeIcon(g, 'cuffs', 230, th); }, gavel(g, th) { B.crimeIcon(g, 'gavel', 230, th); }, cash(g, th) { B.crimeIcon(g, 'cash', 230, th); },
    fake(g, th) { bill(g, 0, 0, 210, 110, true, th, -0.1); },
  };
  // ---------- scenes ----------
  function tower_(g, p, lt, t, th, S) { // sepia card, tower + FOR SALE tag + LEGEND stamp (+ X = never charged)
    enter(g, t, S.at, 540, 840); paper(g, -380, -235, 760, 470, 18, { lift: 0.6, fill: LEGB }); hdr(g, th, 760, -224, S.head || 'THE STORY GOES', 46, '#6a4216');
    g.save(); g.translate(-170, 30); tower(g, 0.78, '#4a3418', 7); g.restore();
    const ta = t - (S.tagAt ?? S.at + 0.3); if (ta > 0) { const k = pk(t, S.tagAt ?? S.at + 0.3); g.save(); g.translate(160, -40); g.rotate(0.07 + 0.05 * Math.sin(t * 3) * Math.exp(-ta * 1.5)); g.scale(0.7 + 0.3 * k, 0.7 + 0.3 * k); g.strokeStyle = '#4a3418'; g.lineWidth = 4; g.beginPath(); g.moveTo(-40, -120); g.lineTo(0, -70); g.stroke(); clay(g, -150, -70, 300, 160, 16, th.paper, { shadowK: 0.5 }); txt(g, 'FOR SALE', 0, -20, F.hero(70), th.badInk); txt(g, S.tagText || '“SCRAP”', 0, 52, F.hero(66), th.ink); g.restore(); }
    legendStamp(g, th, t, S.stampAt, S.stampText || 'LEGEND', { x: 130, y: 150, size: 54 });
    if (S.xAt != null && t >= S.xAt) { const u = ease.out(clamp((t - S.xAt) / 0.35)); bigX(g, -170, 20, 120, u, 24); }
    sub(g, S.foot || 'NO COURT EVER PROVED IT', 0, 214, th.inkSoft, 18); g.restore(); bottomChip(g, S, t, th); }
  function split(g, p, lt, t, th, S) { // hook: LEGEND panel vs RECORD panel
    const Lp = S.L, Rp = S.R;
    for (const [P, x, at] of [[Lp, 295, S.at], [Rp, 785, S.at2 ?? S.at + 0.25]]) { enter(g, t, at, x, 800, 60, P === Lp ? -0.02 : 0.02); paper(g, -240, -230, 480, 460, 18, { lift: 0.5, fill: P.kind === 'tower' ? LEGB : undefined }); hdr(g, th, 480, -222, P.head, 46, P.kind === 'tower' ? '#6a4216' : th.navy);
      if (P.kind === 'tower') { g.save(); g.translate(-60, 36); tower(g, 0.66, '#4a3418', 7); g.restore(); const k = pk(t, at + 0.2); g.save(); g.translate(110, -40); g.rotate(0.08); g.scale(k, k); clay(g, -90, -50, 180, 100, 12, th.paper, { shadowK: 0.4 }); txt(g, 'FOR SALE', 0, -14, F.hero(38), th.badInk); txt(g, '“SCRAP”', 0, 28, F.hero(36), th.ink); g.restore(); }
      else { face(g, -190, -150, 380, 240, { k: P.k || 'a', zoom: 1.0, mono: P.mono }); if (P.bars) { const bu = ease.in(clamp((t - P.bars) / 0.35)); for (let i = 0; i < 9; i++) { const bx = -190 + (i + 0.5) * 380 / 9; g.fillStyle = '#10161f'; g.fillRect(bx - 8, -150, 16, 240 * bu); g.fillStyle = 'rgba(255,255,255,.2)'; g.fillRect(bx - 8, -150, 4, 240 * bu); } }
        txt(g, P.line1 || 'VICTOR LUSTIG', 0, 128, F.hero(fit(P.line1 || 'VICTOR LUSTIG', F.hero, 430, 50)), th.ink); sub(g, P.line2 || '', 0, 168, th.badInk, 22); }
      if (P.stamp) (P.kind === 'tower' ? legendStamp : factStamp)(g, th, t, P.stampAt, P.stamp, { x: 0, y: 170, size: 46 });
      g.restore(); }
    tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  const tagsOf = (g, S, t, th) => { for (const nt of S.tags || []) if (t >= nt.at && (!nt.out || t < nt.out)) chip(g, nt.text, nt.x || 540, nt.y || 625, nt.tone || 'ink', th, nt.size || 36, nt.w || 900, spring(t - nt.at, 'bouncy')); };
  function intro(g, p, lt, t, th, S) {
    enter(g, t, S.at, 540, 835 + (S.dy0 || 0), 90, -0.02); paper(g, -440, -235, 880, 470, 18, { lift: 0.6 }); hdr(g, th, 880, -219, S.head || 'CASE FILE · THE CON MAN', 52);
    face(g, -400, -140, 300, 340, { k: S.k || 'a', zoom: 1 + 0.07 * lin(t, S.at, S.at + 6) }); if (S.flash && lt < 0.4) { g.fillStyle = 'rgba(255,255,255,' + 0.8 * hit(lt, 12) + ')'; rr(g, -400, -140, 300, 340, 8); g.fill(); }
    g.fillStyle = '#c4231a'; g.beginPath(); g.arc(-250, -150, 12, 0, 7); g.fill();
    const nm = t - (S.nameAt ?? S.at + 0.3); if (nm > 0) { g.save(); g.globalAlpha *= clamp(nm / 0.1); txt(g, 'VICTOR LUSTIG', -70, -105, F.hero(fit('VICTOR LUSTIG', F.hero, 480, 66)), th.ink, 'left'); g.restore(); }
    const rl = t - (S.roleAt ?? S.at + 0.6); if (rl > 0) { const k = Math.min(1.1, spring(rl, 'bouncy')); g.save(); g.globalAlpha *= clamp(rl / 0.1); g.translate(130, -30); g.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k); clay(g, -230, -34, 460, 68, 14, th.gold, { shadowK: 0.4 }); txt(g, S.role || 'CON MAN', 0, 3, F.hero(44), '#0B0F14'); g.restore(); }
    const tr = t - (S.line2At ?? 9999); if (tr > 0) { g.save(); g.globalAlpha *= clamp(tr / 0.1); txt(g, S.line2 || '', 130, 52, F.monoX(26), th.inkSoft); g.fillStyle = th.navy; rr(g, -50, 80, 360, 6, 3); g.fill(); g.restore(); }
    sub(g, 'PHOTO: U.S. DEPT. OF JUSTICE, 1931 · PUBLIC DOMAIN', -250, 222, th.inkSoft, 12);
    for (const q of S.stamps || []) cst(g, th, t, { size: 66, rot: -0.1, x: 150, y: 110, ...q });
    g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function titleStrike(g, p, lt, t, th, S) { // "COUNT" struck out -> MADE UP
    enter(g, t, S.at, 540, 800, 60); paper(g, -430, -200, 860, 400, 18, { lift: 0.5 }); hdr(g, th, 860, -190, 'HIS TITLE', 60); txt(g, '“COUNT”', 0, -30, F.hero(130), th.ink);
    if (S.strikeAt != null && t >= S.strikeAt) strike(g, th, -330, 330, -30, ease.out(clamp((t - S.strikeAt) / 0.3)));
    const rv = t - (S.revealAt ?? 9999); if (rv > 0) { const k = pk(t, S.revealAt); g.save(); g.translate(0, 88); g.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k); g.globalAlpha *= clamp(rv / 0.08); g.fillStyle = th.paperShade; rr(g, -330, -48, 660, 96, 14); g.fill(); g.strokeStyle = th.bad; g.lineWidth = 5; rr(g, -330, -48, 660, 96, 14); g.stroke(); txt(g, 'MADE UP', 0, 4, F.hero(82), th.badInk); g.restore(); }
    if (S.noble != null && t >= S.noble) { g.save(); g.globalAlpha *= clamp((t - S.noble) / 0.1); sub(g, 'A NOBLE TITLE · LIKE “PRINCE”', 0, 172, th.inkSoft, 22); g.restore(); }
    g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function date(g, p, lt, t, th, S) {
    enter(g, t, S.at, 540, 800, 60); paper(g, -400, -215, 800, 430, 18, { lift: 0.5, fill: LEGB }); hdr(g, th, 800, -205, S.head || 'THE STORY GOES', 56, '#6a4216');
    g.save(); g.translate(250, 20); tower(g, 0.5, '#4a3418', 8); g.restore();
    const a = t - (S.l1At ?? S.at + 0.3); if (a > 0) { g.save(); g.globalAlpha *= clamp(a / 0.1); txt(g, S.l1 || 'PARIS', -380, -50, F.hero(fit(S.l1 || 'PARIS', F.hero, 500, 140)), th.ink, 'left'); g.restore(); }
    const b = t - (S.l2At ?? S.at + 0.6); if (b > 0) { const k = pk(t, S.l2At ?? S.at + 0.6); g.save(); g.globalAlpha *= clamp(b / 0.1); g.translate(-380, 90); g.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k); txt(g, S.l2 || '1925', 0, 0, F.hero(150), th.badInk, 'left'); g.restore(); }
    legendStamp(g, th, t, S.stampAt, 'LEGEND', { x: 140, y: 150, size: 54 }); g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function official(g, p, lt, t, th, S) {
    enter(g, t, S.at, 540, 815, 70); paper(g, -400, -215, 800, 430, 18, { lift: 0.5 }); hdr(g, th, 800, -205, S.head || 'THE STORY GOES · HIS ACT', 52, '#6a4216');
    face(g, -360, -130, 250, 300, { k: 'c', zoom: 1.0 + 0.1 * lin(t, S.at, S.at + 4), sepia: true });
    const ba = t - (S.badgeAt ?? S.at + 1); if (ba > 0) { const k = pk(t, S.badgeAt ?? S.at + 1); g.save(); g.translate(-120, 100); g.scale(k * 0.7, k * 0.7); B.crimeIcon(g, 'badge', 200, th); g.restore(); }
    const ca = t - (S.claimAt ?? S.at + 1.3); if (ca > 0) { const k = pk(t, S.claimAt ?? S.at + 1.3); g.save(); g.globalAlpha *= clamp(ca / 0.1); g.translate(130, -20); g.scale(0.85 + 0.15 * k, 0.85 + 0.15 * k); txt(g, 'HE POSES AS', 0, -70, F.monoX(26), th.inkSoft); txt(g, 'A GOVERNMENT', 0, -10, F.hero(60), th.ink); txt(g, 'OFFICIAL', 0, 52, F.hero(78), th.badInk); sub(g, '(HE WASN’T ONE)', 0, 108, th.inkSoft, 22); g.restore(); }
    legendStamp(g, th, t, S.stampAt, 'LEGEND', { x: 200, y: 160, size: 46 }); g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function dealers(g, p, lt, t, th, S) {
    enter(g, t, S.at, 540, 810, 60); paper(g, -440, -230, 880, 450, 18, { lift: 0.5, fill: LEGB }); hdr(g, th, 880, -220, S.head || 'FIVE SCRAP-METAL DEALERS', 52, '#6a4216');
    // hotel table
    g.fillStyle = '#8a5a2b'; g.beginPath(); g.ellipse(0, 110, 380, 50, 0, 0, 7); g.fill(); g.strokeStyle = '#4a2f17'; g.lineWidth = 5; g.stroke();
    const cols = ['#2c3e66', '#8a2f2f', '#2f6f4f', '#6b4a8a', '#a8741a'], xs = [-300, -150, 0, 150, 300];
    xs.forEach((x, i) => { const at = (S.times || [])[i] ?? S.at + 0.3 + i * 0.2, o = t - at; if (o < 0) return; const k = pk(t, at), isP = i === 2 && S.poissonAt != null && t >= S.poissonAt, big = isP ? 1 + 0.18 * pk(t, S.poissonAt) : 1; g.save(); g.globalAlpha *= clamp(o / 0.08); g.translate(x, 20 + (1 - Math.min(1, k)) * 40); g.scale(big, big); bust(g, 0, 8, 1.45, cols[i], { hat: i % 2 ? '#2b2f36' : '#5a4a3a' }); if (isP) { g.strokeStyle = th.bad; g.lineWidth = 6; g.beginPath(); g.arc(0, -10, 78, 0, 7); g.stroke(); } g.restore(); });
    if (S.poissonAt != null && t >= S.poissonAt) { const k = pk(t, S.poissonAt); g.save(); g.translate(0, -100); g.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k); clay(g, -150, -26, 300, 52, 26, th.bad, { shadowK: 0.5 }); txt(g, 'POISSON', 0, 3, F.hero(36), th.paper); g.restore(); }
    sub(g, 'ILLUSTRATION · NO REAL FACES', 0, 196, th.inkSoft, 14); legendStamp(g, th, t, S.stampAt, 'LEGEND', { x: 330, y: -90, size: 40 }); g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function defcard(g, p, lt, t, th, S) {
    enter(g, t, S.at, 540, 830, 70); paper(g, -430, -210, 860, 420, 18, { lift: 0.5 }); g.fillStyle = th.navy; rr(g, -430, -210, 860, 78, 18); g.fill(); txt(g, S.head || 'WHAT IT MEANS', 0, -170, F.hero(48), th.gold);
    g.save(); g.translate(-250, 30); const ia = t - (S.iconAt ?? S.at + 0.3); if (ia > 0) { const k = Math.min(1.1, spring(ia, 'bouncy')); g.globalAlpha *= clamp(ia / 0.1); g.scale(0.7 + 0.3 * k, 0.7 + 0.3 * k); ICON[S.icon](g, th); } g.restore();
    const da = t - (S.defAt ?? S.at + 0.4); if (da > 0) { g.save(); g.globalAlpha *= clamp(da / 0.12); g.translate((1 - Math.min(1, spring(da, 'snappy'))) * 50, 0); txt(g, S.term, 120, -75, F.hero(fit(S.term, F.hero, 520, 78)), th.badInk); txt(g, S.d1, 120, 5, F.hero(fit(S.d1, F.hero, 520, 50)), th.ink); txt(g, S.d2, 120, 65, F.hero(fit(S.d2, F.hero, 520, 50)), th.ink); if (S.d3) txt(g, S.d3, 120, 125, F.hero(fit(S.d3, F.hero, 520, 50)), th.ink); g.restore(); }
    if (S.factAt != null) factStamp(g, th, t, S.factAt, S.factText || 'FACT', { x: 250, y: 160, size: 40 }); g.restore(); bottomChip(g, S, t, th); }
  function whisper(g, p, lt, t, th, S) {
    enter(g, t, S.at, 540, 810, 70); paper(g, -440, -230, 880, 460, 18, { lift: 0.5, fill: LEGB }); hdr(g, th, 880, -220, S.head || 'THE STORY GOES · HE WHISPERS', 52, '#6a4216');
    face(g, -410, -150, 250, 300, { k: 'p', zoom: 1.1 - 0.1 * ease.out(clamp((t - S.at) / 1.5)), sepia: true }); txt(g, '“', -152, -98, F.hero(100), th.bad, 'left');
    (S.lines || []).forEach((ln, i) => { const o = t - ln.at; if (o <= 0) return; const s = ln.text, n = Math.min(s.length, Math.floor(o * 26)); txt(g, s.slice(0, n), -105, -70 + i * 90, F.hero(fit(s, F.hero, 540, 70)), ln.tone === 'bad' ? th.badInk : th.ink, 'left'); });
    if (S.quietAt != null && t >= S.quietAt) { const k = pk(t, S.quietAt); g.save(); g.translate(-285, 190); g.scale(k, k); clay(g, -125, -20, 250, 40, 20, th.navy, { shadowK: 0.4 }); txt(g, 'KEEP IT QUIET', 0, 2, F.hero(24), th.gold); g.restore(); }
    legendStamp(g, th, t, S.stampAt, 'LEGEND', { x: 230, y: 160, size: 50 }); g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function paid(g, p, lt, t, th, S) {
    enter(g, t, S.at, 300, 800, 60); paper(g, -230, -230, 460, 440, 18, { lift: 0.5, fill: LEGB }); hdr(g, th, 460, -220, 'THE BUYER', 46, '#6a4216'); bust(g, 0, -20, 1.8, '#2f6f4f', { hat: '#5a4a3a' }); txt(g, 'POISSON', 0, 150, F.hero(52), th.ink); sub(g, 'ONE SCRAP DEALER', 0, 188, th.inkSoft, 16); g.restore();
    const ca = t - (S.cashAt ?? 9999); if (ca > 0) { g.save(); const k = pk(t, S.cashAt); g.translate(770, 800); g.scale(0.7 + 0.3 * k, 0.7 + 0.3 * k); g.globalAlpha *= clamp(ca / 0.08); for (let i = 0; i < 4; i++) bill(g, 0, 70 - i * 46, 300, 130, false, th, (i - 1.5) * 0.04); g.restore(); const u = ease.out(clamp(ca / 0.35)); g.save(); g.strokeStyle = th.gold; g.fillStyle = th.gold; g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); g.moveTo(560, 800); g.lineTo(560 + 80 * u, 800); g.stroke(); if (u > 0.9) { g.beginPath(); g.moveTo(650, 800); g.lineTo(624, 784); g.lineTo(624, 816); g.closePath(); g.fill(); } g.restore(); }
    if (S.stampAt != null) cst(g, th, t, { text: S.stampText || 'REPORTEDLY', at: S.stampAt, tone: LEG, size: 46, rot: -0.1, x: 790, y: 965 });
    tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function noreport(g, p, lt, t, th, S) {
    enter(g, t, S.at, 300, 800, 60); paper(g, -230, -230, 460, 440, 18, { lift: 0.5, fill: LEGB }); hdr(g, th, 460, -220, 'THE BUYER, LATER', 46, '#6a4216'); bust(g, 0, -20, 1.8, '#2f6f4f', { hat: '#5a4a3a', sad: true, blush: true }); txt(g, 'POISSON', 0, 150, F.hero(52), th.ink); sub(g, 'TOO EMBARRASSED', 0, 188, th.badInk, 18); g.restore();
    enter(g, t, S.docAt ?? S.at + 0.3, 770, 800, 60, 0.03); paper(g, -200, -230, 400, 440, 12, { lift: 0.5 }); hdr(g, th, 400, -220, 'POLICE REPORT', 46); g.strokeStyle = 'rgba(11,15,20,.25)'; g.lineWidth = 6; for (let i = 0; i < 5; i++) { g.beginPath(); g.moveTo(-150, -130 + i * 36); g.lineTo(150 - (i % 2) * 60, -130 + i * 36); g.stroke(); }
    if (S.noneAt != null) cst(g, th, t, { text: 'NONE FILED', at: S.noneAt, tone: 'bad', size: 54, rot: -0.12, x: 0, y: 70 }); g.restore();
    legendStamp(g, th, t, S.stampAt, 'THE STORY GOES', { x: 540, y: 1045, size: 40 }); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function again(g, p, lt, t, th, S) {
    enter(g, t, S.at, 540, 800, 60); paper(g, -420, -210, 840, 420, 18, { lift: 0.5, fill: LEGB }); hdr(g, th, 840, -200, 'THE STORY GOES', 52, '#6a4216');
    g.save(); g.translate(-230, 40); g.strokeStyle = th.bad; g.lineWidth = 22; g.lineCap = 'round'; const u = ease.out(clamp((t - (S.at + 0.2)) / 1.0)); g.beginPath(); g.arc(0, 0, 90, -1.2, -1.2 + 5.2 * u); g.stroke(); const a = -1.2 + 5.2 * u; g.fillStyle = th.bad; g.save(); g.translate(Math.cos(a) * 90, Math.sin(a) * 90); g.rotate(a + Math.PI / 2); g.beginPath(); g.moveTo(0, -24); g.lineTo(26, 14); g.lineTo(-26, 14); g.closePath(); g.fill(); g.restore(); g.restore();
    const ba = t - (S.backAt ?? S.at + 0.5); if (ba > 0) { const k = pk(t, S.backAt ?? S.at + 0.5); g.save(); g.globalAlpha *= clamp(ba / 0.1); g.translate(120, -10); g.scale(0.85 + 0.15 * k, 0.85 + 0.15 * k); txt(g, 'HE CAME BACK', 0, -70, F.hero(64), th.ink); txt(g, 'AND TRIED', 0, -5, F.hero(64), th.ink); txt(g, 'AGAIN', 0, 75, F.hero(88), th.badInk); g.restore(); }
    g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function unproven(g, p, lt, t, th, S) {
    enter(g, t, S.at, 540, 805, 60); paper(g, -430, -215, 860, 430, 18, { lift: 0.5 }); hdr(g, th, 860, -205, S.head || 'THE EIFFEL TOWER SALE (LEGEND)', 58);
    g.save(); g.translate(-250, 40); B.crimeIcon(g, 'gavel', 230, th); const xa = t - (S.xAt ?? 9999); if (xa > 0) bigX(g, 0, 0, 90, ease.out(clamp(xa / 0.4)), 26); g.restore();
    const q = t - (S.qAt ?? S.at + 0.3); if (q > 0) { g.save(); g.globalAlpha *= clamp(q / 0.1); txt(g, 'PROVEN', 130, -70, F.hero(82), th.ink); txt(g, 'IN COURT?', 130, 5, F.hero(82), th.ink); g.restore(); }
    const no = t - (S.noAt ?? 9999); if (no > 0) { const k = pk(t, S.noAt); g.save(); g.translate(100, 110); g.scale(0.7 + 0.3 * k, 0.7 + 0.3 * k); g.globalAlpha *= clamp(no / 0.08); clay(g, -110, -42, 220, 84, 18, th.bad, { shadowK: 0.5 }); txt(g, 'NEVER', 0, 5, F.hero(66), th.paper); g.restore(); }
    legendStamp(g, th, t, S.stampAt, 'LEGEND', { x: 330, y: 150, size: 40 }); g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function record(g, p, lt, t, th, S) { // ON THE RECORD file with FACT stamp
    enter(g, t, S.at, 540, 800, 60); paper(g, -430, -200, 860, 400, 18, { lift: 0.5 }); hdr(g, th, 860, -190, 'CASE FILE · COURT RECORD', 60, '#14603f');
    face(g, -390, -110, 230, 260, { k: 'a', zoom: 1.0 + 0.1 * lin(t, S.at, S.at + 4) }); txt(g, S.l1 || 'ON THE RECORD', 130, -70, F.hero(fit(S.l1 || 'ON THE RECORD', F.hero, 470, 76)), th.ink); const b = t - (S.l2At ?? 9999); if (b > 0) { const k = pk(t, S.l2At); g.save(); g.translate(130, 30); g.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k); g.globalAlpha *= clamp(b / 0.08); txt(g, S.l2 || 'FAKE MONEY', 0, 0, F.hero(fit(S.l2 || 'FAKE MONEY', F.hero, 470, 100)), th.badInk); g.restore(); }
    factStamp(g, th, t, S.factAt, 'FACT', { x: 250, y: 140, size: 56 }); g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function fakecash(g, p, lt, t, th, S) {
    enter(g, t, S.at, 540, 815, 70); paper(g, -430, -215, 860, 430, 18, { lift: 0.5 }); hdr(g, th, 860, -205, 'COUNTERFEITING', 60, '#14603f');
    const k = pk(t, S.billAt ?? S.at); g.save(); g.translate(-190, 20); g.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k); bill(g, 0, 0, 380, 190, S.fakeAt != null && t >= S.fakeAt, th, -0.06); g.restore();
    const d = t - (S.defAt ?? 9999); if (d > 0) { g.save(); g.globalAlpha *= clamp(d / 0.12); g.translate((1 - Math.min(1, spring(d, 'snappy'))) * 40, 0); txt(g, 'MAKING', 230, -50, F.hero(70), th.ink); txt(g, 'FAKE CASH', 230, 30, F.hero(80), th.badInk); sub(g, 'THEN PASSING IT OFF AS REAL', 230, 100, th.inkSoft, 18); g.restore(); }
    factStamp(g, th, t, S.factAt, 'FACT', { x: 230, y: 160, size: 46 }); g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function moneybox(g, p, lt, t, th, S) { // IG: reportedly a box that "printed" $100 bills
    enter(g, t, S.at, 540, 815, 70); paper(g, -430, -215, 860, 430, 18, { lift: 0.5, fill: LEGB }); hdr(g, th, 860, -205, 'HE REPORTEDLY SOLD A “MONEY BOX”', 52, '#6a4216');
    g.save(); g.translate(-200, 60); clay(g, -150, -40, 300, 150, 16, '#5a4a3a', { shadowK: 0.5 }); g.fillStyle = '#2b2f36'; g.fillRect(-120, -20, 240, 14); const u = ease.out(clamp((t - (S.billAt ?? S.at + 0.5)) / 0.9)); g.save(); rr(g, -150, -150, 300, 118, 4); g.clip(); bill(g, 0, -110 + 90 * (1 - u) * -1 + 20, 220, 108, false, th, 0.04); g.restore(); txt(g, '$100 MAKER?', 0, 70, F.hero(40), th.paper); g.restore();
    const d = t - (S.defAt ?? 9999); if (d > 0) { g.save(); g.globalAlpha *= clamp(d / 0.12); txt(g, 'A BOX THAT', 220, -55, F.hero(54), th.ink); txt(g, '“PRINTED”', 220, 10, F.hero(64), th.badInk); txt(g, '$100 BILLS', 220, 72, F.hero(54), th.ink); g.restore(); }
    legendStamp(g, th, t, S.stampAt, 'REPORTEDLY', { x: 240, y: 165, size: 46 }); g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function arrest(g, p, lt, t, th, S) { // 1935 clipping, push-in on his face
    const w = 470, h = Math.round(w * 469 / 460), z = 1 + (S.push || 0.12) * ease.inOut(clamp((t - (S.pushAt ?? S.at)) / (S.pushDur || 3.5)));
    enter(g, t, S.at, 540, 825, 70, -0.012); paper(g, -w / 2 - 16, -h / 2 - 16, w + 32, h + 70, 10, { lift: 0.6 }); g.save(); rr(g, -w / 2, -h / 2, w, h, 4); g.clip(); const u = ease.inOut(clamp((t - (S.pushAt ?? S.at)) / (S.pushDur || 3.5))); B.drawPhoto(g, img(P1), -w / 2, -h / 2, w, h, { zoom: z, fx: 0.5 + (0.47 - 0.5) * u, fy: 0.5 - 0.06 * u }); g.restore();
    if (S.flash && lt < 0.4) { g.fillStyle = 'rgba(255,255,255,' + 0.8 * hit(lt, 12) + ')'; rr(g, -w / 2, -h / 2, w, h, 4); g.fill(); }
    sub(g, '1935 NEWSPAPER · PUBLIC DOMAIN', 0, h / 2 + 30, th.inkSoft, 14);
    const c = S.callout; if (c && t >= c.at) { const k = pk(t, c.at); g.save(); g.translate(0, h / 2 - 20); g.scale(k, k); clay(g, -250, -30, 500, 60, 30, th.navy, { shadowK: 0.5 }); txt(g, c.text, 0, 3, F.hero(34), th.gold); g.restore(); }
    if (S.stampAt != null) cst(g, th, t, { text: 'ARRESTED', at: S.stampAt, tone: 'bad', size: 74, rot: -0.12, x: -60, y: -40 }); factStamp(g, th, t, S.factAt, 'FACT', { x: 200, y: 110, size: 44 });
    g.restore(); bottomChip(g, S, t, th); }
  function escape(g, p, lt, t, th, S) {
    enter(g, t, S.at, 540, 800, 60); paper(g, -430, -230, 860, 460, 18, { lift: 0.5 }); hdr(g, th, 860, -220, 'FEDERAL JAIL · 1935', 52);
    g.fillStyle = '#59606B'; rr(g, -300, -150, 280, 330, 8); g.fill(); g.fillStyle = '#10161f'; rr(g, -240, -110, 160, 200, 6); g.fill(); g.fillStyle = '#0B0F14'; for (let i = 0; i < 4; i++) g.fillRect(-224 + i * 44, -110, 10, 200);
    const ea = t - (S.escAt ?? 9999); if (ea > 0) { const u = ease.out(clamp(ea / 0.9)); g.strokeStyle = '#b8863b'; g.lineWidth = 9; g.lineCap = 'round'; g.setLineDash([16, 8]); g.beginPath(); g.moveTo(-160, -20); g.quadraticCurveTo(-190, 60, -130 + 10 * u, -20 + 230 * u); g.stroke(); g.setLineDash([]); const k = pk(t, S.escAt); g.save(); g.translate(-180 + 60 * u, -10 + 220 * u); g.scale(0.8, 0.8); bust(g, 0, 0, 0.7, '#59606B', { hat: '#1a1f27' }); g.restore(); cst(g, th, t, { text: 'ESCAPED', at: S.escAt + 0.1, tone: 'bad', size: 58, rot: -0.1, x: 170, y: -90 }); }
    const ca = t - (S.caughtAt ?? 9999); if (ca > 0) { g.save(); const k = pk(t, S.caughtAt); g.translate(190, 60); g.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k); g.globalAlpha *= clamp(ca / 0.1); clay(g, -190, -44, 380, 88, 18, th.navy, { shadowK: 0.5 }); txt(g, S.caughtText || 'CAUGHT AGAIN', 0, 4, F.hero(fit(S.caughtText || 'CAUGHT AGAIN', F.hero, 340, 54)), th.gold); g.restore(); }
    factStamp(g, th, t, S.factAt, 'FACT', { x: 280, y: 190, size: 40 }); g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function sentence(g, p, lt, t, th, S) { // pleaded guilty: 15 + 5
    enter(g, t, S.at, 540, 800, 60); paper(g, -430, -220, 860, 440, 18, { lift: 0.5 }); hdr(g, th, 860, -210, 'FEDERAL COURT · COURT RECORD', 56, '#14603f');
    face(g, -390, -130, 230, 260, { k: 'a', mono: true, zoom: 1.0 }); sub(g, 'VICTOR LUSTIG', -275, 160, th.ink, 22);
    const a = t - (S.guiltyAt ?? S.at + 0.3); if (a > 0) cst(g, th, t, { text: 'PLEADED GUILTY', at: S.guiltyAt ?? S.at + 0.3, tone: 'bad', size: 52, rot: -0.07, x: 130, y: -120 });
    const f1 = t - (S.fifteenAt ?? 9999); if (f1 > 0) { const k = pk(t, S.fifteenAt); g.save(); g.translate(60, 0); g.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k); g.globalAlpha *= clamp(f1 / 0.08); txt(g, '15 YRS', 0, 0, F.hero(96), th.badInk); sub(g, 'FAKE MONEY', 0, 56, th.inkSoft, 20); g.restore(); }
    const f2 = t - (S.fiveAt ?? 9999); if (f2 > 0) { const k = pk(t, S.fiveAt); g.save(); g.translate(290, 0); g.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k); g.globalAlpha *= clamp(f2 / 0.08); txt(g, '+ 5', 0, 0, F.hero(96), th.badInk); sub(g, 'THE ESCAPE', 0, 56, th.inkSoft, 20); g.restore(); }
    g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function verdict(g, p, lt, t, th, S) {
    enter(g, t, S.at, 540, 760, 60); paper(g, -300, -140, 600, 280, 16, { lift: 0.5 }); face(g, -270, -110, 260, 220, { k: 'p', mono: true, zoom: 1.1 });
    const bu = ease.in(clamp((t - (S.barsAt ?? S.at)) / 0.35)); for (let i = 0; i < 5; i++) { const bx = -270 + (i + 0.5) * 260 / 5; g.fillStyle = '#10161f'; g.fillRect(bx - 8, -110, 16, 220 * bu); g.fillStyle = 'rgba(255,255,255,.22)'; g.fillRect(bx - 8, -110, 4, 220 * bu); }
    txt(g, 'LUSTIG', 150, -60, F.hero(70), th.ink); sub(g, 'GUILTY · 1935', 150, 0, th.badInk, 22); factStamp(g, th, t, S.factAt, 'COURT RECORD', { x: 150, y: 70, size: 30 }); g.restore();
    const ya = t - S.yrsAt; if (ya > 0) { const kk = Math.min(1.1, spring(ya, 'bouncy')); g.save(); g.translate(540, 990); g.scale(0.8 + 0.2 * kk, 0.8 + 0.2 * kk); g.globalAlpha *= clamp(ya / 0.08); stk(g, '20 YEARS', 0, -6, F.hero(130), th.bad, 'center', 16); g.restore(); const w = 840 / 20; for (let i = 0; i < 20; i++) { const u = ease.out(clamp((ya - 0.2 - i * 0.025) / 0.3)); g.fillStyle = th.bad; rr(g, 120 + i * w + 2, 1062, w - 4, 20 * u, 3); g.fill(); } }
    const al = t - (S.alcAt ?? 9999); if (al > 0) { const k = pk(t, S.alcAt); chip(g, 'ALCATRAZ · ISLAND PRISON', 540, 1112, 'ink', th, 34, 900, k); }
    tagsOf(g, S, t, th); }
  function island(g, p, lt, t, th, S) {
    enter(g, t, S.at, 540, 810, 60); paper(g, -430, -210, 860, 420, 18, { lift: 0.5 }); hdr(g, th, 860, -200, 'THE FAMOUS ISLAND PRISON', 56, '#14603f');
    g.save(); rr(g, -410, -130, 400, 320, 10); g.clip(); const sk = g.createLinearGradient(0, -130, 0, 40); sk.addColorStop(0, '#9cc7ea'); sk.addColorStop(1, '#dcebf5'); g.fillStyle = sk; g.fillRect(-410, -130, 400, 170); g.fillStyle = '#2f6fb0'; g.fillRect(-410, 40, 400, 150);
    g.fillStyle = '#8a7a63'; g.beginPath(); g.moveTo(-340, 50); g.lineTo(-300, -10); g.lineTo(-150, -20); g.lineTo(-70, 50); g.closePath(); g.fill(); g.strokeStyle = '#0B0F14'; g.lineWidth = 4; g.stroke();
    g.fillStyle = '#d8d0bd'; g.fillRect(-270, -62, 110, 46); g.strokeStyle = '#0B0F14'; g.strokeRect(-270, -62, 110, 46); g.fillStyle = '#0B0F14'; for (let i = 0; i < 6; i++) g.fillRect(-258 + i * 17, -50, 8, 14); g.fillStyle = '#d8d0bd'; g.fillRect(-150, -90, 16, 74); g.strokeRect(-150, -90, 16, 74);
    g.strokeStyle = 'rgba(255,255,255,.7)'; g.lineWidth = 4; for (let r = 0; r < 4; r++) { g.beginPath(); for (let x = -410; x <= -10; x += 20) { const y = 80 + r * 30 + 5 * Math.sin(x * 0.05 + t * 2 + r); x === -410 ? g.moveTo(x, y) : g.lineTo(x, y); } g.stroke(); } g.restore(); g.strokeStyle = 'rgba(11,15,20,.4)'; g.lineWidth = 3; rr(g, -410, -130, 400, 320, 10); g.stroke();
    const a = t - (S.l1At ?? S.at + 0.3); if (a > 0) { g.save(); g.globalAlpha *= clamp(a / 0.1); txt(g, 'ALCATRAZ', 220, -50, F.hero(96), th.badInk); txt(g, 'ISLAND PRISON', 220, 30, F.hero(50), th.ink); sub(g, 'SAN FRANCISCO BAY', 220, 90, th.inkSoft, 24); g.restore(); }
    factStamp(g, th, t, S.factAt, 'COURT RECORD', { x: 230, y: 150, size: 34 }); g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function child(g, p, lt, t, th, S) { // 20 years vs a whole childhood (0-18)
    enter(g, t, S.at, 540, 810, 60); paper(g, -440, -200, 880, 400, 18, { lift: 0.5 }); hdr(g, th, 880, -190, '20 YEARS vs A WHOLE CHILDHOOD', 54);
    const W = 780, x0 = -390, cw = W / 20; for (let i = 0; i < 20; i++) { const u = ease.out(clamp((t - S.at - 0.2 - i * 0.04) / 0.3)); g.fillStyle = i < 18 ? '#2f6fb0' : th.bad; rr(g, x0 + i * cw + 2, -20 - 60 * u + 60, cw - 4, 60 * u, 4); g.fill(); }
    const a = t - (S.kidAt ?? S.at + 1.0); if (a > 0) { g.save(); g.globalAlpha *= clamp(a / 0.1); g.strokeStyle = '#2f6fb0'; g.lineWidth = 5; g.beginPath(); g.moveTo(x0, 90); g.lineTo(x0 + cw * 18, 90); g.stroke(); txt(g, 'BORN → 18: A WHOLE CHILDHOOD', x0 + cw * 9, 128, F.hero(36), '#1f5a99'); g.restore(); }
    const b = t - (S.longAt ?? 9999); if (b > 0) { g.save(); g.globalAlpha *= clamp(b / 0.1); const k = pk(t, S.longAt); g.translate(0, -88); g.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k); txt(g, 'HIS SENTENCE: LONGER', 0, 0, F.hero(56), th.badInk); g.restore(); }
    g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function board(g, p, lt, t, th, S) {
    const k = pk(t, S.at); g.save(); g.translate(540, 830 + (1 - Math.min(1, k)) * 60); g.globalAlpha *= clamp((t - S.at) / 0.08);
    const lg = g.createLinearGradient(-450, -230, 450, 230); lg.addColorStop(0, '#b98650'); lg.addColorStop(1, '#8c5f33'); g.fillStyle = lg; rr(g, -450, -240, 900, 480, 18); g.fill(); g.strokeStyle = '#4a2f17'; g.lineWidth = 14; rr(g, -450, -240, 900, 480, 18); g.stroke();
    for (let i = 0; i < 160; i++) { g.fillStyle = 'rgba(' + (hash(i * 3.1) > 0.5 ? '60,35,10' : '230,190,130') + ',' + (0.06 + 0.1 * hash(i * 7.7)) + ')'; g.beginPath(); g.arc(-440 + hash(i * 1.3) * 880, -230 + hash(i * 2.9) * 460, 2 + 4 * hash(i * 5.1), 0, 7); g.fill(); }
    const items = [{ x: 0, y: -60, w: 200, h: 230, kind: 'photo' }, { x: -310, y: -100, w: 190, h: 150, kind: 'tower', txt: 'EIFFEL TOWER', tag: 'LEGEND' }, { x: -310, y: 100, w: 190, h: 150, icon: 'cash', txt: 'FAKE MONEY', tag: 'FACT' }, { x: 310, y: -100, w: 190, h: 150, icon: 'cuffs', txt: 'ARRESTED 1935', tag: 'FACT' }, { x: 310, y: 100, w: 190, h: 150, icon: 'gavel', txt: '20 YEARS', tag: 'COURT RECORD' }];
    const pins = items.map(it => [it.x, it.y - it.h / 2 + 8]), tight = ease.out(clamp((t - S.tightAt) / 0.5)), step = S.step || 0.25;
    items.forEach((it, i) => { if (i) { const at = S.at + 0.3 + (i - 1) * step, u = ease.out(clamp((t - at - 0.1) / 0.4)); if (u > 0) { const a = pins[0], b = pins[i]; g.strokeStyle = '#E0281E'; g.lineWidth = 5; g.lineCap = 'round'; g.beginPath(); g.moveTo(a[0], a[1]); const ex = lerp(a[0], b[0], u), ey = lerp(a[1], b[1], u); g.quadraticCurveTo((a[0] + ex) / 2, (a[1] + ey) / 2 + 36 * (1 - tight), ex, ey); g.stroke(); } } });
    items.forEach((it, i) => { const at = i ? S.at + 0.3 + (i - 1) * step : S.at, o = t - at; if (o < 0) return; const kk = Math.min(1.1, spring(o, 'bouncy')); g.save(); g.translate(it.x, it.y); g.rotate((i - 2) * 0.03 + (1 - Math.min(1, kk)) * 0.2); g.scale(0.6 + 0.4 * kk, 0.6 + 0.4 * kk); paper(g, -it.w / 2, -it.h / 2, it.w, it.h, 8, { lift: 0.3, fill: it.kind === 'photo' ? '#EDE7D8' : it.kind === 'tower' ? LEGB : th.paper });
      if (it.kind === 'photo') { face(g, -it.w / 2 + 10, -it.h / 2 + 10, it.w - 20, it.h - 64, { k: 'a', zoom: 1.0 }); g.fillStyle = th.navy; rr(g, -it.w / 2 + 10, it.h / 2 - 48, it.w - 20, 38, 6); g.fill(); txt(g, 'LUSTIG', 0, it.h / 2 - 29, F.hero(26), th.paper); }
      else if (it.kind === 'tower') { g.save(); g.translate(0, -14); tower(g, 0.28, '#4a3418', 8); g.restore(); txt(g, it.txt, 0, it.h / 2 - 26, F.hero(fit(it.txt, F.hero, it.w - 16, 26)), th.ink); }
      else { g.save(); g.translate(0, -26); B.crimeIcon(g, it.icon, 80, th); g.restore(); txt(g, it.txt, 0, it.h / 2 - 28, F.hero(fit(it.txt, F.hero, it.w - 16, 28)), th.ink); }
      if (it.tag) { const lg2 = it.tag === 'LEGEND'; g.save(); g.translate(0, -it.h / 2 - 2); g.rotate(-0.06); const tw = mw(it.tag, F.hero(24)) + 24; g.fillStyle = lg2 ? LEG : '#14603f'; rr(g, -tw / 2, -16, tw, 32, 6); g.fill(); txt(g, it.tag, 0, 2, F.hero(24), '#F5F3EE'); g.restore(); }
      g.restore(); g.fillStyle = '#c4231a'; g.beginPath(); g.arc(pins[i][0], pins[i][1], 10, 0, 7); g.fill(); });
    g.restore(); if (S.stampAt != null) { g.save(); g.translate(540, 840); cst(g, th, t, { text: S.stampText || 'FAKE CASH LOCKED HIM UP', at: S.stampAt, tone: 'bad', size: 44, rot: -0.06, x: 0, y: 190 }); g.restore(); }
    bottomChip(g, S, t, th); }
  function ask(g, p, lt, t, th, S) {
    const k = spring(lt, 'bouncy'); g.save(); g.translate(540, 800); g.scale(0.7 + 0.3 * Math.min(1.06, k), 0.7 + 0.3 * Math.min(1.06, k)); g.globalAlpha *= clamp(k * 2);
    const sz = Math.min(fit(S.l1, F.hero, 900, 112), fit(S.l2, F.hero, 900, 112)); stk(g, S.l1, 0, -62, F.hero(sz), th.gold, 'center', 16); stk(g, S.l2, 0, 62, F.hero(sz), th.bad, 'center', 16); if (S.stampAt != null) cst(g, th, t, { text: S.stampText || 'LEGEND', at: S.stampAt, tone: LEG, size: 40, rot: -0.07, x: 0, y: 160 }); g.restore(); }
  const SC = { tower: tower_, split, intro, titleStrike, date, official, dealers, defcard, whisper, paid, noreport, again, unproven, record, fakecash, moneybox, arrest, escape, sentence, verdict, island, child, board, ask };
  // ---------- suspect card (always on, bottom-left): his face, different treatment at every beat ----------
  function pip(g, p, env) {
    const { t, theme: th } = env; let K = p.keys[0]; for (const q of p.keys) if (t >= q.at) K = q; const o = t - K.at, pop = 1 + 0.07 * Math.exp(-o * 7) * Math.cos(o * 22);
    g.save(); g.scale(pop, pop); g.rotate(-0.03); paper(g, -100, -150, 200, 262, 14, { lift: 0.5 }); face(g, -90, -140, 180, 190, { k: K.k || 'a', zoom: 1 + 0.06 * Math.min(1, o / 3) + (K.zoom || 0), mono: !!K.mono, sepia: !!K.sepia, fx: K.fx || 0, fy: K.fy || 0 });
    if (K.tint) { g.fillStyle = K.tint; rr(g, -90, -140, 180, 190, 8); g.fill(); }
    if (K.x) { const u = ease.out(clamp(o / 0.3)); g.strokeStyle = th.bad; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); g.moveTo(-60, -110); g.lineTo(-60 + 120 * u, -110 + 120 * u); g.moveTo(60, -110); g.lineTo(60 - 120 * u, -110 + 120 * u); g.stroke(); }
    if (K.bars) { const u = ease.in(clamp(o / 0.3)); for (let i = 0; i < 6; i++) { const bx = -90 + (i + 0.5) * 30; g.fillStyle = '#10161f'; g.fillRect(bx - 5, -140, 10, 190 * u); } }
    g.fillStyle = th.bad; rr(g, -90, 56, 180, 28, 8); g.fill(); txt(g, 'VICTOR LUSTIG', 0, 70, F.cap(14), th.paper);
    const w = Math.max(196, mw(K.text, F.cap(21)) + 22); g.save(); g.translate(0, 120); g.fillStyle = th.ink; rr(g, -w / 2, -20, w, 40, 10); g.fill(); const sc = K.tone === 'bad' ? '#FF3B30' : K.tone === 'good' ? '#00D26A' : K.tone === 'leg' ? '#D9A55B' : '#F2B705'; g.strokeStyle = sc; g.lineWidth = 3; rr(g, -w / 2, -20, w, 40, 10); g.stroke(); txt(g, K.text, 0, 2, F.cap(21), sc); g.restore();
    if (K.stamp) cst(g, th, t, { text: K.stamp, at: K.at + 0.1, tone: K.tone === 'leg' ? LEG : K.tone || 'bad', size: 28, rot: -0.2, x: 0, y: -40 });
    g.restore();
  }
  B.register('vpip', { defaults: { keys: [] }, ownEnter: true, size: () => [230, 330], anchors: () => ({ face: [0, -40, 200, 240] }), draw(g, p, env) { g.globalAlpha *= clamp(env.lt / 0.08); pip(g, p, env); } });
  Object.assign(window.V5.h, { fit, stk, chip, label, mw });
  // ---------- the stage ----------
  const val = (v, t) => { if (v && typeof v === 'object') { const u = ease.out(clamp((t - v.at) / (v.dur || 1))), x = lerp(v.from || 0, v.to, u); return (v.pre || '') + fmt(v.dec ? x : Math.round(x), v.dec || 0) + (v.suf || ''); } return v; };
  B.register('vstage', {
    defaults: { C: [], scenes: [], hook: null, hideCounter: [], beats: [], notes: [] }, ownEnter: true, size: () => [1080, 1920],
    draw(g, p, env) {
      const { t, theme: th } = env; g.translate(-540, -960);
      let bl = ''; for (const b of p.beats) if (t >= b[0]) bl = b[1]; if (bl) { const k = spring(t - (p.beats.find(b => b[1] === bl)[0]), 'snappy'); g.save(); g.globalAlpha *= clamp(k * 2); label(g, bl, 990, 264, th.accent, 26, 'right'); g.restore(); }
      let seg = p.C[0]; for (const s of p.C) if (t >= s.from) seg = s; const hid = p.hideCounter.some(([a, b]) => t >= a && t < b), segT = t - seg.from, pop = 1 + 0.05 * hit(Math.min(0.5, Math.max(0, segT)), 8);
      if (!hid) {
        g.save(); g.translate(540, 437); g.scale(pop, pop); g.translate(-540, -437); paper(g, 70, 322, 940, 230, 26, { lift: 0.3 });
        const L = [seg.L[0], val(seg.L[1], t)], R = [seg.R[0], val(seg.R[1], t)]; g.fillStyle = 'rgba(11,15,20,.14)'; rr(g, 98, 344, 884, 22, 11); g.fill();
        label(g, L[0], 100, 398, th.inkSoft, 26, 'left'); label(g, R[0], 980, 398, th.inkSoft, 26, 'right');
        const sL = fit(L[1], F.hero, 415, 100, 22), sR = fit(R[1], F.hero, 415, 100, 22), cc = c => c === 'bad' ? th.badInk : c === 'gold' ? '#B88700' : c === 'leg' ? LEG : c === 'good' ? '#14803f' : th.ink;
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
    defaults: { text: '' }, ownEnter: true, size: () => [10, 10],
    draw(g, p, env) { const s = p.text, f = F.monoX(21), w = mw(s, f) + 36; g.globalAlpha *= 0.9; g.fillStyle = 'rgba(11,15,20,.78)'; rr(g, -w / 2, -18, w, 36, 18); g.fill(); g.strokeStyle = env.theme.accent; g.lineWidth = 2; rr(g, -w / 2, -18, w, 36, 18); g.stroke(); txt(g, s, 0, 1, f, env.theme.accent); },
  });
})();
