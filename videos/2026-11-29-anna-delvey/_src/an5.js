// ===== Anna Delvey — Decoded crime-show stage 'astage' (screen space). Layout: pill y238-290 | live card y322-552 | zone y590-1085 | row y1100-1335 (suspect card left, storyteller right) | captions ~1432.
// Facts: voice/beats-v3.md + research/2026-11-27/anna-delvey-fake-heiress (don't-say list respected: no $22M loan, no firm/bank/hotel names, no 'stole from Rachel').
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, burst, hash, hit } = B;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const fmt = (v, d = 0) => B.fmtNum(v, d, true);
  window.AN5 = { h: {} };
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
  const PA = 'brand/photos/anna-sorokin/2.jpg', PB = 'brand/photos/anna-sorokin/4.jpg';
  const cst = (g, th, t, o) => B.crimeStamp(g, th, t, o);
  const img = s => B.images[s];
  const CROP = { [PA]: { crop: [0, 0, 1, 0.66], fx: 0.45, fy: 0.4 }, [PB]: { crop: [0, 0, 1, 0.72], fx: 0.55, fy: 0.36 } };
  function face(g, src, x, y, w, h, zoom = 1, mono = false) { const c = CROP[src]; g.save(); rr(g, x, y, w, h, 8); g.clip(); B.drawPhoto(g, img(src), x, y, w, h, { crop: c.crop, fx: c.fx, fy: c.fy, zoom }); if (mono) { g.globalCompositeOperation = 'saturation'; g.fillStyle = '#808080'; g.fillRect(x, y, w, h); g.globalCompositeOperation = 'source-over'; } g.restore(); g.strokeStyle = 'rgba(11,15,20,.45)'; g.lineWidth = 3; rr(g, x, y, w, h, 8); g.stroke(); }
  const pk = (t, at, o = 'bouncy') => Math.min(1.1, spring(t - at, o));
  const on = (t, at) => t >= at;
  const bubbleTxt = (g, s, x, y, size, col) => txt(g, s, x, y, F.hero(size), col);
  const crown = (g, x, y, s, th) => { g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = th.gold; g.beginPath(); g.moveTo(-60, 0); g.lineTo(-64, -60); g.lineTo(-30, -30); g.lineTo(0, -76); g.lineTo(30, -30); g.lineTo(64, -60); g.lineTo(60, 0); g.closePath(); g.fill(); g.strokeStyle = 'rgba(0,0,0,.3)'; g.lineWidth = 4; g.stroke(); g.restore(); };
  const billS = (g, x, y, w, h, lab) => { clay(g, x, y, w, h, 8, '#1FA366', { shadowK: 0.4 }); g.strokeStyle = 'rgba(245,243,238,.7)'; g.lineWidth = 3; rr(g, x + 7, y + 7, w - 14, h - 14, 5); g.stroke(); g.fillStyle = 'rgba(245,243,238,.9)'; g.beginPath(); g.arc(x + w / 2, y + h / 2, h * 0.28, 0, 7); g.fill(); txt(g, lab, x + w / 2, y + h / 2 + 2, F.hero(h * 0.3), '#0B0F14'); };
  const sub = (g, s, x, y, col, size = 24, al = 'center') => txt(g, s, x, y, F.monoX(size), col, al);
  const bottomChip = (g, S, t, th) => { let ch = null; for (const c of (S.chips || (S.chip ? [S.chip] : []))) if (t >= c.at) ch = c; if (ch && !(S.chipOut && t >= S.chipOut)) chip(g, ch.text, 540, ch.y || 1062, ch.tone || 'ink', th, ch.size || 38, 900, spring(t - ch.at, 'bouncy')); };
  // ---------- scenes ----------
  function society(g, p, lt, t, th, S) {
    const k = pk(t, S.at); g.save(); g.translate(540, 835 + (S.dy || 0) + (1 - Math.min(1, k)) * 90); if (S.sc) g.scale(S.sc, S.sc); g.scale(0.88 + 0.12 * k, 0.88 + 0.12 * k); g.rotate(-0.018 * (1 - Math.min(1, k)) * 4); g.globalAlpha *= clamp((t - S.at) / 0.08);
    paper(g, -440, -235, 880, 470, 18, { lift: 0.6 }); g.strokeStyle = th.gold; g.lineWidth = 6; rr(g, -424, -219, 848, 438, 12); g.stroke(); g.lineWidth = 2; rr(g, -414, -209, 828, 418, 8); g.stroke();
    g.fillStyle = th.navy; rr(g, -424, -219, 848, 52, 12); g.fill(); txt(g, 'THE NEW YORK SOCIETY PAGE', 0, -192, F.monoX(24), th.gold);
    face(g, PA, -400, -140, 300, 340, 1 + 0.05 * lin(t, S.at, S.at + 6)); if (S.flash && lt < 0.4) { g.fillStyle = 'rgba(255,255,255,' + 0.8 * hit(lt, 12) + ')'; rr(g, -400, -140, 300, 340, 8); g.fill(); }
    if (S.crownAt != null && t >= S.crownAt) crown(g, -250, -138 + Math.max(0, 1 - (t - S.crownAt) * 5) * -60, 1.1, th);
    const nm = t - (S.nameAt ?? S.at + 0.3); if (nm > 0) { g.save(); g.globalAlpha *= clamp(nm / 0.1); txt(g, 'ANNA DELVEY', 130, -105, F.hero(76), th.ink); g.restore(); }
    const rl = t - (S.roleAt ?? S.at + 0.6); if (rl > 0) { g.save(); g.globalAlpha *= clamp(rl / 0.1); g.translate(130, -30); g.scale(0.8 + 0.2 * Math.min(1.1, spring(rl, 'bouncy')), 0.8 + 0.2 * Math.min(1.1, spring(rl, 'bouncy'))); clay(g, -230, -34, 460, 68, 14, th.gold, { shadowK: 0.4 }); txt(g, 'GERMAN HEIRESS', 0, 3, F.hero(44), '#0B0F14'); g.restore(); }
    const tr = t - (S.trustAt ?? 9999); if (tr > 0) { g.save(); g.globalAlpha *= clamp(tr / 0.1); txt(g, 'TRUST FUND · OVERSEAS', 130, 52, F.monoX(26), th.inkSoft); g.fillStyle = th.navy; rr(g, -50, 80, 360, 6, 3); g.fill(); g.restore(); }
    sub(g, S.credit || '', 0, 222, th.inkSoft, 12);
    if (S.stampAt != null) cst(g, th, t, { text: 'HEIRESS', at: S.stampAt, tone: 'gold', size: 80, rot: -0.12, x: 150, y: 120 });
    for (const q of S.stamps || []) cst(g, th, t, { size: 80, rot: -0.12, x: 150, y: 120, ...q });
    g.restore(); bottomChip(g, S, t, th);
  }
  function defcard(g, p, lt, t, th, S) {
    const k = pk(t, S.at); g.save(); g.translate(540, 830 + (1 - Math.min(1, k)) * 70); g.scale(0.9 + 0.1 * k, 0.9 + 0.1 * k); g.globalAlpha *= clamp((t - S.at) / 0.08);
    paper(g, -430, -210, 860, 420, 18, { lift: 0.5 }); g.fillStyle = th.navy; rr(g, -430, -210, 860, 78, 18); g.fill(); txt(g, S.head || 'WHAT IT MEANS', 0, -170, F.hero(48), th.gold);
    g.save(); g.translate(-250, 30); const ia = t - (S.iconAt ?? S.at + 0.3); if (ia > 0) { g.globalAlpha *= clamp(ia / 0.1); g.scale(0.7 + 0.3 * Math.min(1.1, spring(ia, 'bouncy')), 0.7 + 0.3 * Math.min(1.1, spring(ia, 'bouncy'))); ICON[S.icon || 'vault'](g, th, t); } g.restore();
    const da = t - (S.defAt ?? S.at + 0.4); if (da > 0) { g.save(); g.globalAlpha *= clamp(da / 0.12); g.translate((1 - Math.min(1, spring(da, 'snappy'))) * 50, 0); txt(g, S.term, 120, -75, F.hero(fit(S.term, F.hero, 520, 78)), th.badInk); txt(g, S.d1, 120, 5, F.hero(fit(S.d1, F.hero, 520, 50)), th.ink); txt(g, S.d2, 120, 65, F.hero(fit(S.d2, F.hero, 520, 50)), th.ink); if (S.d3) txt(g, S.d3, 120, 125, F.hero(fit(S.d3, F.hero, 520, 50)), th.ink); g.restore(); }
    g.restore(); bottomChip(g, S, t, th);
  }
  const ICON = {
    vault(g, th) { g.fillStyle = '#59606B'; rr(g, -110, -110, 220, 220, 20); g.fill(); g.strokeStyle = '#0B0F14'; g.lineWidth = 6; g.stroke(); g.fillStyle = '#7b8492'; rr(g, -92, -92, 184, 184, 12); g.fill(); g.fillStyle = th.gold; g.beginPath(); g.arc(0, 0, 54, 0, 7); g.fill(); g.strokeStyle = '#0B0F14'; g.lineWidth = 5; g.stroke(); for (let i = 0; i < 8; i++) { const a = i / 8 * 6.2832; g.beginPath(); g.moveTo(Math.cos(a) * 18, Math.sin(a) * 18); g.lineTo(Math.cos(a) * 44, Math.sin(a) * 44); g.stroke(); } g.fillStyle = '#0B0F14'; g.beginPath(); g.arc(0, 0, 12, 0, 7); g.fill(); },
    cash(g, th) { B.crimeIcon(g, 'cash', 230, th); }, gavel(g, th) { B.crimeIcon(g, 'gavel', 230, th); }, cuffs(g, th) { B.crimeIcon(g, 'cuffs', 230, th); },
  };
  function claim(g, p, lt, t, th, S) {
    for (let st = 0; st < 3; st++) { const at = S.at + st * 0.25, o = t - at; if (o <= 0) continue; const k = pk(t, at, 'snappy'); for (let b = 0; b < 4 + st * 2; b++) { g.save(); g.globalAlpha *= clamp(o / 0.05); g.translate(250 + st * 290, 1010 - b * 26 - (1 - Math.min(1, k)) * 80); g.rotate(((b + st) % 3 - 1) * 0.03); billS(g, -105, -30, 210, 62, '$'); g.restore(); } }
    const k = pk(t, S.at); g.save(); g.translate(540, 700); g.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k); g.globalAlpha *= clamp((t - S.at) / 0.08); stk(g, 'TENS OF MILLIONS', 0, 0, F.hero(fit('TENS OF MILLIONS', F.hero, 880, 110)), th.gold, 'center', 14); sub(g, 'WHAT SHE SAID HER TRUST FUND WAS WORTH', 0, 76, th.paper, 22); g.restore();
    if (S.stampAt != null && t >= S.stampAt) { g.save(); g.translate(540, 880); g.scale(1, 1); cst(g, th, t, { text: 'NEVER EXISTED', at: S.stampAt, tone: 'bad', size: 78, rot: -0.08, x: 0, y: 0 }); g.restore(); }
    bottomChip(g, S, t, th);
  }
  function nameswap(g, p, lt, t, th, S) {
    const k = pk(t, S.at); g.save(); g.translate(540, 835 + (1 - Math.min(1, k)) * 80); g.globalAlpha *= clamp((t - S.at) / 0.08);
    paper(g, -440, -230, 880, 460, 18, { lift: 0.5 }); face(g, PB, -405, -195, 300, 360, 1.06 - 0.06 * ease.out(clamp((t - S.at) / 1.2))); sub(g, 'PHOTO: MARK MINTON · CC BY-SA 4.0', -255, 192, th.inkSoft, 13);
    g.fillStyle = th.navy; rr(g, -70, -190, 480, 120, 14); g.fill(); sub(g, 'HELLO MY NAME IS', 170, -168, th.gold, 20); txt(g, 'ANNA DELVEY', 170, -112, F.hero(66), th.paper);
    if (S.strikeAt != null && t >= S.strikeAt) { const u = ease.out(clamp((t - S.strikeAt) / 0.3)); g.strokeStyle = th.bad; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); g.moveTo(-60, -108); g.lineTo(-60 + 460 * u, -118); g.stroke(); }
    const rv = t - (S.revealAt ?? 9999); if (rv > 0) { const s = 'ANNA SOROKIN', n = Math.min(s.length, Math.floor(rv * 18)); g.fillStyle = th.paperShade; rr(g, -70, -50, 480, 100, 14); g.fill(); g.strokeStyle = th.bad; g.lineWidth = 4; rr(g, -70, -50, 480, 100, 14); g.stroke(); txt(g, s.slice(0, n), 170, 2, F.hero(66), th.ink); sub(g, 'HER REAL NAME', 170, 66, th.badInk, 20); }
    const c1 = t - (S.c1 ?? 9999); if (c1 > 0) { g.save(); g.globalAlpha *= clamp(c1 / 0.1); clay(g, -70, 90, 230, 56, 28, th.gold, { shadowK: 0.3 }); txt(g, 'FROM RUSSIA', 45, 120, F.hero(30), '#0B0F14'); g.restore(); }
    const c2 = t - (S.c2 ?? 9999); if (c2 > 0) { g.save(); g.globalAlpha *= clamp(c2 / 0.1); clay(g, 175, 90, 235, 56, 28, th.gold, { shadowK: 0.3 }); txt(g, 'RAISED IN GERMANY', 292, 120, F.hero(26), '#0B0F14'); g.restore(); }
    if (S.stampAt != null) cst(g, th, t, { text: 'NO FORTUNE', at: S.stampAt, tone: 'bad', size: 70, rot: -0.1, x: 130, y: 180 });
    g.restore(); bottomChip(g, S, t, th);
  }
  function receipt(g, x, y, w, h, rot, th, title, lines, k, total, stampT, t, stampAt) {
    g.save(); g.translate(x, y); g.rotate(rot); g.scale(k, k); paper(g, -w / 2, -h / 2, w, h, 6, { lift: 0.35, fill: '#FBFAF4' }); txt(g, title, 0, -h / 2 + 30, F.monoX(20), th.ink); g.strokeStyle = '#999'; g.lineWidth = 2; g.setLineDash([6, 6]); g.beginPath(); g.moveTo(-w / 2 + 16, -h / 2 + 52); g.lineTo(w / 2 - 16, -h / 2 + 52); g.stroke(); g.setLineDash([]);
    lines.forEach((l, i) => { sub(g, l, -w / 2 + 18, -h / 2 + 82 + i * 30, th.inkSoft, 17, 'left'); g.fillStyle = '#d6d2c6'; g.fillRect(w / 2 - 80, -h / 2 + 76 + i * 30, 60, 8); }); txt(g, 'TOTAL', -w / 2 + 52, h / 2 - 36, F.monoX(22), th.ink); txt(g, total, w / 2 - 70, h / 2 - 34, F.hero(30), th.ink);
    if (stampAt != null) cst(g, th, t, { text: stampT, at: stampAt, tone: 'bad', size: 36, rot: -0.2, x: 0, y: 20 }); g.restore();
  }
  function keycard(g, x, y, rot, th, k, label) { g.save(); g.translate(x, y); g.rotate(rot); g.scale(k, k); B.shadowed(g, () => rr(g, -130, -80, 260, 160, 14), '#12171f', 0.45); g.fillStyle = '#12171f'; rr(g, -130, -80, 260, 160, 14); g.fill(); g.fillStyle = th.gold; g.fillRect(-130, -30, 260, 16); g.fillStyle = '#2b3342'; rr(g, 70, 24, 40, 38, 6); g.fill(); txt(g, label, -60, -52, F.monoX(16), th.gold); txt(g, 'NEW YORK', -60, 24, F.hero(32), th.paper); sub(g, 'KEY CARD', -60, 56, '#8c93a1', 16); g.restore(); }
  function luxe(g, p, lt, t, th, S) {
    [[390, 800, -0.16, 'SUITE'], [540, 760, 0.04, 'SUITE'], [690, 810, 0.2, 'SUITE']].forEach(([x, y, r, l], i) => { const at = S.keysAt + i * 0.2; if (t < at) return; g.save(); g.globalAlpha *= clamp((t - at) / 0.06); keycard(g, x, y - (1 - Math.min(1, pk(t, at))) * -80, r, th, 0.9 * pk(t, at), l); g.restore(); });
    if (t >= S.rcptAt) { receipt(g, 270, 960, 280, 250, -0.07, th, 'ROOM SERVICE', ['CHAMPAGNE', 'SUITE DINNER', 'LATE SNACK'], pk(t, S.rcptAt), '$$$$', 'UNPAID', t, S.stampAt); receipt(g, 810, 960, 280, 250, 0.07, th, 'RESTAURANT', ['TABLE FOR 6', 'COCKTAILS', 'TIP'], pk(t, S.rcptAt + 0.25), '$$$$', 'UNPAID', t, S.stampAt != null ? S.stampAt + 0.3 : null); }
    bottomChip(g, S, t, th);
  }
  function terminal(g, p, lt, t, th, S) {
    g.save(); g.translate(540, 850); B.shadowed(g, () => rr(g, -190, -250, 380, 500, 34), '#12171f', 0.6); g.fillStyle = '#1b2230'; rr(g, -190, -250, 380, 500, 34); g.fill(); g.strokeStyle = '#2f3a50'; g.lineWidth = 4; g.stroke();
    // phase
    let ph = 0, since = 0; const cy = S.cycles; for (let i = 0; i < cy.length; i++) if (t >= cy[i]) { ph = i + 1; since = t - cy[i]; }
    const declined = ph > 0 && since > 0.32 && since < 1.05; const flash = declined ? 0.65 + 0.35 * Math.sin(since * 30) : 0;
    g.fillStyle = declined ? 'rgb(' + Math.round(150 + 80 * flash) + ',24,24)' : '#0f2a22'; rr(g, -156, -216, 312, 150, 12); g.fill();
    txt(g, declined ? 'DECLINED' : (since < 0.32 && ph > 0 ? 'PROCESSING…' : 'INSERT CARD'), 0, -150, F.hero(declined ? 64 : 40), declined ? th.paper : '#7be3b0'); if (declined) sub(g, 'CARD NOT ACCEPTED', 0, -100, th.paper, 18);
    for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) { g.fillStyle = '#323d55'; rr(g, -98 + c * 70, -30 + r * 52, 56, 38, 8); g.fill(); }
    g.fillStyle = '#0B0F14'; rr(g, -120, 200, 240, 18, 6); g.fill();
    if (ph > 0 && since < 0.5) { const u = ease.out(clamp(since / 0.3)); g.save(); g.translate(0, 200 - 330 * (1 - u)); clay(g, -90, -50, 180, 110, 12, th.gold, { shadowK: 0.4 }); g.fillStyle = '#7a5806'; g.fillRect(-90, -24, 180, 22); txt(g, 'HER CARD', 0, 30, F.hero(22), '#0B0F14'); g.restore(); }
    g.restore();
    // AGAIN counter (no number: she was declined again and again)
    const n = cy.filter(c => t >= c).length; if (n > 1) { g.save(); g.translate(540 - 260 + 10, 700); const k = Math.min(1.1, spring(t - cy[n - 1], 'bouncy')); g.scale(k, k); txt(g, n > 2 ? 'AGAIN. AND AGAIN.' : 'AGAIN.', 0, 0, F.hero(56), th.bad); g.restore(); }
    for (let i = 0; i < n; i++) { const c = cy[i], u = t - c - 0.32; if (u > 0 && u < 0.5) { g.save(); g.globalAlpha *= 1 - u / 0.5; stk(g, 'DECLINED', 540 + (i % 2 ? 260 : -260), 800 - u * 90, F.hero(52), th.bad, 'center', 8); g.restore(); } }
    bottomChip(g, S, t, th);
  }
  function bankIcon(g, x, y, s, th, col) { g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = col; g.beginPath(); g.moveTo(-90, -30); g.lineTo(0, -90); g.lineTo(90, -30); g.closePath(); g.fill(); for (let i = -2; i <= 2; i++) g.fillRect(i * 34 - 10, -20, 20, 80); g.fillRect(-100, 66, 200, 18); g.strokeStyle = '#0B0F14'; g.lineWidth = 4; g.stroke(); g.restore(); }
  function cover(g, p, lt, t, th, S) {
    const a = pk(t, S.at); g.save(); g.translate(250, 820); g.scale(0.8 + 0.2 * a, 0.8 + 0.2 * a); g.globalAlpha *= clamp((t - S.at) / 0.08); paper(g, -190, -190, 380, 380, 20, { lift: 0.4 }); bankIcon(g, 0, -20, 1.35, th, '#8aa0c8'); txt(g, 'HER BANK', 0, 150, F.hero(44), th.ink); g.restore();
    if (t >= S.blameAt) { const u = ease.out(clamp((t - S.blameAt) / 0.35)); g.save(); g.strokeStyle = th.bad; g.fillStyle = th.bad; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); g.moveTo(130, 600); g.quadraticCurveTo(250, 560, 250 + 20 * u, 660 - 40 * u); g.stroke(); g.restore(); g.save(); g.translate(250, 640); g.scale(pk(t, S.blameAt), pk(t, S.blameAt)); clay(g, -150, -34, 300, 68, 34, th.bad, { shadowK: 0.5 }); txt(g, 'SHE BLAMES IT', 0, 3, F.hero(36), th.paper); g.restore(); }
    if (t >= S.billAt) { const k = pk(t, S.billAt); g.save(); g.translate(790, 790); g.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k); g.globalAlpha *= clamp((t - S.billAt) / 0.08); receipt(g, 0, 0, 300, 300, 0.05, th, 'THE BILL', ['DINNER', 'DRINKS', 'TIP'], 1, '$$$$', 'PAID', t, S.paidAt); g.restore(); }
    if (t >= S.paidAt) { const u = pk(t, S.paidAt); g.save(); g.translate(790, 1010); g.scale(0.7 + 0.3 * u, 0.7 + 0.3 * u); clay(g, -150, -50, 300, 100, 14, th.navy, { shadowK: 0.5 }); txt(g, 'SOMEONE ELSE’S CARD', 0, -8, F.hero(26), th.paper); sub(g, 'COVERS THE BILL', 0, 26, th.gold, 20); g.restore(); }
    bottomChip(g, S, t, th);
  }
  function phone(g, p, lt, t, th, S) {
    const k = pk(t, S.at); g.save(); g.translate(540, 835 + (1 - Math.min(1, k)) * 80); g.scale(0.9 + 0.1 * k, 0.9 + 0.1 * k); g.globalAlpha *= clamp((t - S.at) / 0.08);
    B.shadowed(g, () => rr(g, -250, -235, 500, 470, 40), '#12171f', 0.6); g.fillStyle = '#1b2230'; rr(g, -250, -235, 500, 470, 40); g.fill(); g.fillStyle = '#e9eef7'; rr(g, -230, -215, 460, 430, 26); g.fill(); g.fillStyle = th.navy; rr(g, -230, -215, 460, 64, 26); g.fill(); txt(g, 'MESSAGES', 0, -184, F.monoX(22), th.paper);
    const mb = t - S.msgAt; if (mb > 0) { const kk = Math.min(1.1, spring(mb, 'bouncy')); g.save(); g.translate(-210, -105); g.scale(0.7 + 0.3 * kk, 0.7 + 0.3 * kk); g.globalAlpha *= clamp(mb / 0.08); clay(g, 0, 0, 360, 84, 26, th.badInk, { shadowK: 0.3 }); txt(g, '“THE WIRE IS COMING”', 180, 44, F.hero(32), th.paper); g.restore(); sub(g, 'HER EXCUSE', -210, -122, th.badInk, 18, 'left'); }
    const dt = (t - S.at) * 3; if (!(S.neverAt != null && t >= S.neverAt)) { g.fillStyle = '#c9d2e3'; rr(g, 50, -10, 150, 54, 24); g.fill(); for (let i = 0; i < 3; i++) { g.fillStyle = 'rgba(11,15,20,' + (0.3 + 0.5 * Math.max(0, Math.sin(dt * 3 - i))) + ')'; g.beginPath(); g.arc(88 + i * 36, 17, 8, 0, 7); g.fill(); } }
    // transfer bar that never fills
    txt(g, 'WIRE TRANSFER', 0, 80, F.monoX(22), th.ink); g.fillStyle = '#c9d2e3'; rr(g, -190, 100, 380, 36, 18); g.fill(); const sh = (Math.sin((t - S.at) * 2.4) * 0.5 + 0.5) * 0.14 + 0.02; g.fillStyle = th.gold; rr(g, -190, 100, Math.max(36, 380 * sh), 36, 18); g.fill();
    sub(g, S.neverAt != null && t >= S.neverAt ? 'STILL PENDING…' : 'ARRIVING SOON…', 0, 168, th.inkSoft, 20);
    if (S.neverAt != null) cst(g, th, t, { text: 'NEVER CAME', at: S.neverAt, tone: 'bad', size: 74, rot: -0.1, x: 0, y: 40 });
    g.restore(); bottomChip(g, S, t, th);
  }
  function wiredef(g, p, lt, t, th, S) {
    const k = pk(t, S.at); g.save(); g.globalAlpha *= clamp((t - S.at) / 0.08); g.translate(0, (1 - Math.min(1, k)) * 50);
    paper(g, -0 + 70, 620, 940, 330, 20, { lift: 0.4 }); bankIcon(g, 220, 800, 1.0, th, '#8aa0c8'); bankIcon(g, 860, 800, 1.0, th, '#8aa0c8'); txt(g, 'BANK', 220, 900, F.hero(34), th.ink); txt(g, 'BANK', 860, 900, F.hero(34), th.ink);
    g.strokeStyle = th.ink; g.lineWidth = 6; g.setLineDash([14, 12]); g.beginPath(); g.moveTo(330, 800); g.lineTo(750, 800); g.stroke(); g.setLineDash([]);
    const u = t - S.coinAt, stop = S.xAt != null && t >= S.xAt; if (u > 0) { const q = stop ? 0.5 : (u * 0.6) % 1, x = 330 + 420 * q; g.save(); g.globalAlpha *= stop ? Math.max(0, 1 - (t - S.xAt) / 0.3) : 1; g.fillStyle = th.gold; g.beginPath(); g.arc(x, 800, 24, 0, 7); g.fill(); g.strokeStyle = '#7a5806'; g.lineWidth = 4; g.stroke(); txt(g, '$', x, 802, F.hero(28), '#7a5806'); g.restore(); }
    if (stop) { const xx = pk(t, S.xAt); g.save(); g.translate(540, 800); g.scale(xx, xx); g.strokeStyle = th.bad; g.lineWidth = 16; g.lineCap = 'round'; g.beginPath(); g.moveTo(-50, -50); g.lineTo(50, 50); g.moveTo(50, -50); g.lineTo(-50, 50); g.stroke(); g.restore(); }
    txt(g, 'A WIRE = BANK-TO-BANK TRANSFER', 540, 668, F.hero(fit('A WIRE = BANK-TO-BANK TRANSFER', F.hero, 860, 50)), th.ink);
    g.restore(); bottomChip(g, S, t, th);
  }
  function hotels(g, p, lt, t, th, S) {
    const dk = pk(t, S.at); g.save(); g.translate(540 - 340 + (1 - Math.min(1, dk)) * -300, 650); g.globalAlpha *= clamp((t - S.at) / 0.08); B.shadowed(g, () => rr(g, -190, -60, 380, 120, 10), '#12171f', 0.4); g.fillStyle = '#12171f'; rr(g, -190, -60, 380, 120, 10); g.fill(); g.fillStyle = th.bad; g.fillRect(-190, -60, 12, 120); sub(g, 'NEW YORK CITY', -160, -30, th.gold, 20, 'left'); txt(g, '2017', -160, 20, F.hero(64), th.paper, 'left'); g.restore();
    [[320, 'HOTEL 1', S.s1], [760, 'HOTEL 2', S.s2]].forEach(([x, l, at], i) => { const k = pk(t, S.at + 0.3 + i * 0.35); if (t < S.at + 0.3 + i * 0.35) return; g.save(); g.translate(x, 880); g.rotate(i ? 0.06 : -0.06); g.scale(1.25 * k, 1.25 * k); g.globalAlpha *= clamp((t - S.at - 0.3 - i * 0.35) / 0.08); keycard(g, 0, 0, 0, th, 1, l); if (at != null) cst(g, th, t, { text: 'UNPAID', at, tone: 'bad', size: 44, rot: -0.15, x: 10, y: 20 }); g.restore(); });
    bottomChip(g, S, t, th);
  }
  function friend(g, p, lt, t, th, S) {
    const a = pk(t, S.at); g.save(); g.translate(300, 835 + (1 - Math.min(1, a)) * 70); g.rotate(-0.03); g.globalAlpha *= clamp((t - S.at) / 0.08); paper(g, -215, -245, 430, 490, 18, { lift: 0.5 }); face(g, PA, -190, -220, 380, 330, 1.0); g.fillStyle = th.navy; rr(g, -190, 124, 380, 96, 10); g.fill(); txt(g, 'ANNA DELVEY', 0, 156, F.hero(44), th.paper); sub(g, 'THE “HEIRESS”', 0, 196, th.gold, 20); g.restore();
    const b = t - (S.rAt ?? S.at + 0.5); if (b > 0) { const kk = Math.min(1.1, spring(b, 'bouncy')); g.save(); g.translate(790, 835 + (1 - Math.min(1, kk)) * 70); g.rotate(0.03); g.globalAlpha *= clamp(b / 0.08); paper(g, -215, -245, 430, 490, 18, { lift: 0.5 });
      const bg = g.createLinearGradient(0, -220, 0, 110); bg.addColorStop(0, '#CFE8DA'); bg.addColorStop(1, '#9FD0B6'); g.fillStyle = bg; rr(g, -190, -220, 380, 330, 12); g.fill(); g.save(); rr(g, -190, -220, 380, 330, 12); g.clip();
      g.fillStyle = '#1FA366'; g.beginPath(); g.moveTo(-150, 120); g.quadraticCurveTo(-140, 0, 0, -20); g.quadraticCurveTo(140, 0, 150, 120); g.fill(); g.fillStyle = '#6b3b1d'; g.beginPath(); g.ellipse(0, -100, 70, 80, 0, 0, 7); g.fill(); g.fillStyle = '#E8C9A0'; g.beginPath(); g.ellipse(0, -80, 52, 62, 0, 0, 7); g.fill(); g.fillStyle = '#0B0F14'; for (const q of [-1, 1]) { g.beginPath(); g.arc(q * 20, -84, 5, 0, 7); g.fill(); } g.strokeStyle = '#7a2b25'; g.lineWidth = 5; g.beginPath(); g.arc(0, -58, 16, 0.2, 2.9); g.stroke();
      g.fillStyle = '#2b2f36'; rr(g, 40, 10, 110, 76, 10); g.fill(); g.fillStyle = '#59606B'; g.beginPath(); g.arc(95, 48, 26, 0, 7); g.fill(); g.fillStyle = '#9ad7ff'; g.beginPath(); g.arc(95, 48, 16, 0, 7); g.fill(); g.restore();
      g.fillStyle = '#188a56'; rr(g, -190, 124, 380, 96, 10); g.fill(); txt(g, 'RACHEL WILLIAMS', 0, 156, F.hero(38), th.paper); sub(g, 'MAGAZINE PHOTO EDITOR', 0, 196, th.paper, 18); sub(g, 'ILLUSTRATION', 0, -232, th.inkSoft, 13); g.restore(); }
    if (S.strAt != null && t >= S.strAt) { const u = ease.out(clamp((t - S.strAt) / 0.5)); g.save(); g.strokeStyle = th.badInk; g.lineWidth = 7; g.lineCap = 'round'; g.beginPath(); g.moveTo(420, 640); g.quadraticCurveTo(540, 600 + 60 * Math.sin(3.14 * u), 420 + 240 * u, 640); g.stroke(); g.restore(); const k2 = pk(t, S.strAt); g.save(); g.translate(540, 612); g.scale(k2, k2); clay(g, -110, -26, 220, 52, 26, th.bad, { shadowK: 0.4 }); txt(g, 'HER FRIEND', 0, 2, F.hero(30), th.paper); g.restore(); }
    bottomChip(g, S, t, th);
  }
  function morocco(g, p, lt, t, th, S) {
    const a = pk(t, S.at); g.save(); g.translate(540, 650 + (1 - Math.min(1, a)) * -50); g.globalAlpha *= clamp((t - S.at) / 0.08); clay(g, -400, -48, 800, 96, 24, th.navy, { shadowK: 0.5 }); g.fillStyle = th.gold; g.beginPath(); g.arc(-330, 0, 26, 0, 7); g.fill(); for (let i = 0; i < 8; i++) { const an = i / 8 * 6.28; g.strokeStyle = th.gold; g.lineWidth = 4; g.beginPath(); g.moveTo(-330 + Math.cos(an) * 34, Math.sin(an) * 34); g.lineTo(-330 + Math.cos(an) * 44, Math.sin(an) * 44); g.stroke(); }
    txt(g, 'THE MOROCCO TRIP', 20, 3, F.hero(54), th.paper); g.restore();
    if (t >= S.billAt) { const u = ease.out(clamp((t - S.billAt) / 0.5)), k = pk(t, S.billAt), v = Math.round(62000 * ease.out(clamp((t - S.numAt) / 0.9))); g.save(); g.translate(300 + 0 * u, 900 - (1 - u) * 140); g.rotate(-0.05); g.globalAlpha *= clamp((t - S.billAt) / 0.08); g.scale(k, k); paper(g, -190, -200, 380, 400, 8, { lift: 0.5, fill: '#FBFAF4' }); txt(g, 'MOROCCO TRIP', 0, -168, F.monoX(22), th.ink); g.strokeStyle = '#999'; g.setLineDash([6, 6]); g.lineWidth = 2; g.beginPath(); g.moveTo(-170, -140); g.lineTo(170, -140); g.stroke(); g.setLineDash([]); ['HOTEL', 'TRANSPORT', 'DINNERS', 'ACTIVITIES'].forEach((l, i) => { sub(g, l, -165, -108 + i * 34, th.inkSoft, 18, 'left'); g.fillStyle = '#d6d2c6'; g.fillRect(90, -114 + i * 34, 70, 8); }); txt(g, 'TOTAL', 0, 60, F.monoX(24), th.ink); txt(g, '$' + fmt(v), 0, 128, F.hero(fit('$62,000', F.hero, 330, 88)), th.badInk); g.restore(); }
    if (t >= S.cardAt) { const u = ease.out(clamp((t - S.cardAt) / 0.5)), k = pk(t, S.cardAt); g.save(); g.translate(780 + (1 - u) * -120, 880); g.rotate(0.06); g.scale(k, k); g.globalAlpha *= clamp((t - S.cardAt) / 0.08); clay(g, -190, -118, 380, 236, 22, '#2c3e66', { shadowK: 0.6 }); g.fillStyle = th.gold; rr(g, -150, -64, 60, 46, 8); g.fill(); sub(g, '•••• •••• •••• ••••', 0, 20, th.paper, 24); txt(g, 'RACHEL', -120, 78, F.hero(36), th.paper, 'left'); if (S.chargedAt != null) cst(g, th, t, { text: 'CHARGED', at: S.chargedAt, tone: 'bad', size: 52, rot: -0.14, x: 0, y: -10 }); g.restore(); }
    bottomChip(g, S, t, th);
  }
  function pay(g, p, lt, t, th, S) {
    [['THE BILL', '$62,000', th.bad, 0.0], ['A YEAR OF PAY', 'FOR A LOT OF PEOPLE', th.gold, 0.25]].forEach(([l, v, col, d], i) => { const at = S.at + d, o = t - at; if (o <= 0) return; const u = ease.out(clamp(o / 0.9)), y = 700 + i * 190; g.save(); g.globalAlpha *= clamp(o / 0.1); sub(g, l, 90, y - 12, th.paper, 28, 'left'); stk(g, v, 990, y - 12, F.hero(fit(v, F.hero, 520, 54)), col, 'right', 9); g.fillStyle = 'rgba(245,243,238,.14)'; rr(g, 90, y + 24, 900, 76, 38); g.fill(); g.save(); rr(g, 90, y + 24, 900, 76, 38); g.clip(); clay(g, 90, y + 24, Math.max(76, 880 * u), 76, 38, col, { shadowK: 0.3 }); g.restore(); g.restore(); });
    bottomChip(g, S, t, th);
  }
  function arrest(g, p, lt, t, th, S) {
    const k = pk(t, S.at); g.save(); g.translate(540, 830 + (1 - Math.min(1, k)) * 70); g.scale(0.9 + 0.1 * k, 0.9 + 0.1 * k); g.globalAlpha *= clamp((t - S.at) / 0.08); paper(g, -300, -240, 600, 480, 16, { lift: 0.6 }); face(g, PA, -270, -210, 540, 330, 1 + 0.12 * ease.out(clamp((t - S.at) / 3)), false);
    if (S.flash && lt < 0.4) { g.fillStyle = 'rgba(255,255,255,' + 0.9 * hit(lt, 12) + ')'; rr(g, -270, -210, 540, 330, 8); g.fill(); }
    if (S.xAt != null && t >= S.xAt) { g.fillStyle = 'rgba(40,0,0,.35)'; rr(g, -270, -210, 540, 330, 8); g.fill(); }
    g.fillStyle = th.navy; rr(g, -270, 130, 540, 90, 10); g.fill(); txt(g, 'ANNA DELVEY', -240, 170, F.hero(48), th.paper, 'left'); sub(g, 'ARRESTED · OCT 2017', -240, 204, th.gold, 20, 'left');
    const cu = t - (S.cuffAt ?? 9999); if (cu > 0) { g.save(); g.translate(205, 168); g.rotate(-0.2); const kk = Math.min(1.1, spring(cu, 'bouncy')); g.scale(kk * 0.7, kk * 0.7); B.crimeIcon(g, 'cuffs', 150, th); g.restore(); }
    if (S.stampAt != null) cst(g, th, t, { text: 'ARRESTED', at: S.stampAt, tone: 'bad', size: 84, rot: -0.12, x: 0, y: -40 });
    g.restore(); bottomChip(g, S, t, th);
  }
  function verdict(g, p, lt, t, th, S) {
    const k = pk(t, S.at); g.save(); g.globalAlpha *= clamp((t - S.at) / 0.08); g.translate(0, (1 - Math.min(1, k)) * 50);
    paper(g, 90, 610, 270, 360, 16, { lift: 0.5 }); face(g, PA, 108, 628, 234, 250, 1.05, true); g.fillStyle = th.navy; rr(g, 108, 886, 234, 66, 8); g.fill(); txt(g, 'ANNA DELVEY', 225, 910, F.hero(30), th.paper); sub(g, 'MANHATTAN JURY · 2019', 225, 940, th.gold, 13);
    for (let i = 0; i < 8; i++) { const c = i % 2, r = Math.floor(i / 2), x = 395 + c * 300, y = 625 + r * 90, at = S.countAt + i * (S.countStep || 0.22); g.fillStyle = th.paper; rr(g, x, y, 280, 78, 10); g.fill(); g.strokeStyle = '#59606B'; g.lineWidth = 2; rr(g, x, y, 280, 78, 10); g.stroke(); sub(g, 'COUNT ' + (i + 1), x + 16, y + 26, th.inkSoft, 20, 'left'); txt(g, i === S.larcenyIdx ? 'GRAND LARCENY' : (i % 2 ? 'THEFT OF SERVICES' : 'LARCENY CHARGE'), x + 16, y + 56, F.hero(24), th.ink, 'left'); if (t >= at) { g.save(); g.translate(x + 215, y + 40); const kk = 1 + 1.0 * (1 - ease.expo(clamp((t - at) / 0.15))); g.rotate(-0.12); g.scale(kk, kk); g.globalAlpha *= clamp((t - at) / 0.04); g.strokeStyle = th.badInk; g.lineWidth = 5; rr(g, -56, -22, 112, 44, 6); g.stroke(); txt(g, 'GUILTY', 0, 2, F.hero(30), th.badInk); g.restore(); } }
    g.restore(); bottomChip(g, S, t, th);
  }
  function sentence(g, p, lt, t, th, S) {
    const k = pk(t, S.at); g.save(); g.translate(540, 775 + (1 - Math.min(1, k)) * 60); g.globalAlpha *= clamp((t - S.at) / 0.08); paper(g, -300, -170, 600, 340, 16, { lift: 0.5 }); face(g, PA, -270, -140, 540, 280, 1.1, true);
    const bu = ease.in(clamp((t - (S.barsAt ?? S.at)) / 0.35)); for (let i = 0; i < 8; i++) { const bx = -270 + (i + 0.5) * 540 / 8; g.fillStyle = '#10161f'; g.fillRect(bx - 9, -140, 18, 280 * bu); g.fillStyle = 'rgba(255,255,255,.22)'; g.fillRect(bx - 9, -140, 5, 280 * bu); } g.restore();
    const ya = t - S.yrsAt; if (ya > 0) { const kk = Math.min(1.1, spring(ya, 'bouncy')); g.save(); g.translate(540, 1000); g.scale(0.8 + 0.2 * kk, 0.8 + 0.2 * kk); g.globalAlpha *= clamp(ya / 0.08); stk(g, '4 TO 12 YEARS', 0, -20, F.hero(fit('4 TO 12 YEARS', F.hero, 860, 120)), th.bad, 'center', 14); g.restore(); }
    if (ya > 0.2) { const w = 840 / 12; for (let i = 0; i < 12; i++) { const u = ease.out(clamp((ya - 0.2 - i * 0.04) / 0.3)); g.fillStyle = i < 4 ? th.bad : 'rgba(255,59,48,.35)'; rr(g, 120 + i * w + 2, 1060, w - 4, 18 * u, 4); g.fill(); } }
    bottomChip(g, S, t, th);
  }
  function repay(g, p, lt, t, th, S) {
    const k = pk(t, S.at); for (let b = 0; b < 8; b++) { const o = t - (S.at + b * 0.07); if (o <= 0) continue; g.save(); g.globalAlpha *= clamp(o / 0.05); g.translate(540 + (b % 2 ? 8 : -8), 940 - b * 24 - (1 - Math.min(1, pk(t, S.at + b * 0.07, 'snappy'))) * 80); g.rotate((b % 3 - 1) * 0.025); billS(g, -190, -40, 380, 96, '$'); g.restore(); }
    const v = Math.round(200000 * ease.out(clamp((t - S.numAt) / 0.9))); g.save(); g.translate(540, 690); g.scale(0.85 + 0.15 * k, 0.85 + 0.15 * k); g.globalAlpha *= clamp((t - S.numAt + 0.3) / 0.2); stk(g, 'ABOUT $' + fmt(v), 0, 0, F.hero(fit('ABOUT $200,000', F.hero, 880, 120)), th.good, 'center', 14); g.restore();
    bottomChip(g, S, t, th);
  }
  function board(g, p, lt, t, th, S) {
    const k = pk(t, S.at); g.save(); g.translate(540, 830 + (1 - Math.min(1, k)) * 60); g.globalAlpha *= clamp((t - S.at) / 0.08);
    const lg = g.createLinearGradient(-450, -230, 450, 230); lg.addColorStop(0, '#b98650'); lg.addColorStop(1, '#8c5f33'); g.fillStyle = lg; rr(g, -450, -240, 900, 480, 18); g.fill(); g.strokeStyle = '#4a2f17'; g.lineWidth = 14; rr(g, -450, -240, 900, 480, 18); g.stroke();
    for (let i = 0; i < 160; i++) { g.fillStyle = 'rgba(' + (hash(i * 3.1) > 0.5 ? '60,35,10' : '230,190,130') + ',' + (0.06 + 0.1 * hash(i * 7.7)) + ')'; g.beginPath(); g.arc(-440 + hash(i * 1.3) * 880, -230 + hash(i * 2.9) * 460, 2 + 4 * hash(i * 5.1), 0, 7); g.fill(); }
    const items = [{ x: 0, y: -70, w: 190, h: 215, kind: 'photo' }, { x: -310, y: -100, w: 170, h: 150, icon: 'cash', txt: 'DECLINED', col: th.badInk, at: 0 }, { x: -310, y: 100, w: 170, h: 150, icon: 'cheque', txt: 'THE WIRE', col: th.ink, at: 1 }, { x: 310, y: -100, w: 170, h: 150, icon: 'cash', txt: '$62,000', col: th.badInk, at: 2 }, { x: 310, y: 100, w: 170, h: 150, icon: 'gavel', txt: '8 COUNTS', col: th.ink, at: 3 }];
    const pins = items.map(it => [it.x, it.y - it.h / 2 + 8]), tight = ease.out(clamp((t - S.tightAt) / 0.5));
    items.forEach((it, i) => { if (i) { const at = S.at + 0.3 + (i - 1) * 0.25, u = ease.out(clamp((t - at - 0.1) / 0.4)); if (u > 0) { const a = pins[0], b = pins[i]; g.strokeStyle = '#E0281E'; g.lineWidth = 5; g.lineCap = 'round'; g.beginPath(); g.moveTo(a[0], a[1]); const ex = lerp(a[0], b[0], u), ey = lerp(a[1], b[1], u); g.quadraticCurveTo((a[0] + ex) / 2, (a[1] + ey) / 2 + 36 * (1 - tight), ex, ey); g.stroke(); } } });
    items.forEach((it, i) => { const at = i ? S.at + 0.3 + (i - 1) * 0.25 : S.at, o = t - at; if (o < 0) return; const kk = Math.min(1.1, spring(o, 'bouncy')); g.save(); g.translate(it.x, it.y); g.rotate((i - 2) * 0.03 + (1 - Math.min(1, kk)) * 0.2); g.scale(0.6 + 0.4 * kk, 0.6 + 0.4 * kk); paper(g, -it.w / 2, -it.h / 2, it.w, it.h, 8, { lift: 0.3, fill: it.kind ? '#EDE7D8' : th.paper });
      if (it.kind) { face(g, PA, -it.w / 2 + 10, -it.h / 2 + 10, it.w - 20, it.h - 64, 1.0); g.fillStyle = th.navy; rr(g, -it.w / 2 + 10, it.h / 2 - 48, it.w - 20, 38, 6); g.fill(); txt(g, 'DELVEY', 0, it.h / 2 - 29, F.hero(26), th.paper); } else { g.save(); g.translate(0, -26); B.crimeIcon(g, it.icon, 80, th); g.restore(); txt(g, it.txt, 0, it.h / 2 - 28, F.hero(fit(it.txt, F.hero, it.w - 16, 32)), it.col); } g.restore(); g.fillStyle = '#c4231a'; g.beginPath(); g.arc(pins[i][0], pins[i][1], 10, 0, 7); g.fill(); });
    g.restore(); if (S.stampAt != null) { g.save(); g.translate(540, 840); cst(g, th, t, { text: S.stampText || 'THE MONEY NEVER SHOWED UP', at: S.stampAt, tone: 'bad', size: 44, rot: -0.07, x: 0, y: 190 }); g.restore(); }
    bottomChip(g, S, t, th);
  }
  function ask(g, p, lt, t, th, S) {
    const k = spring(lt, 'bouncy'); g.save(); g.translate(540, 800); g.scale(0.7 + 0.3 * Math.min(1.06, k), 0.7 + 0.3 * Math.min(1.06, k)); g.globalAlpha *= clamp(k * 2);
    const sz = Math.min(fit(S.l1, F.hero, 900, 112), fit(S.l2, F.hero, 900, 112)); stk(g, S.l1, 0, -62, F.hero(sz), th.gold, 'center', 16); stk(g, S.l2, 0, 62, F.hero(sz), th.bad, 'center', 16); g.restore();
  }
  const SC = { society, defcard, claim, nameswap, luxe, terminal, cover, phone, wiredef, hotels, friend, morocco, pay, arrest, verdict, sentence, repay, board, ask };
  // ---------- suspect card (always on, bottom-left): her face in a different treatment at every beat ----------
  function pip(g, p, env) {
    const { t, theme: th } = env; let K = p.keys[0]; for (const q of p.keys) if (t >= q.at) K = q; const o = t - K.at, pop = 1 + 0.07 * Math.exp(-o * 7) * Math.cos(o * 22), src = K.src || PA;
    g.save(); g.scale(pop, pop); g.rotate(-0.03); paper(g, -100, -150, 200, 262, 14, { lift: 0.5 }); face(g, src, -90, -140, 180, 190, 1 + 0.05 * Math.min(1, o / 3), !!K.mono);
    if (K.tint) { g.fillStyle = K.tint; rr(g, -90, -140, 180, 190, 8); g.fill(); }
    if (K.x) { const u = ease.out(clamp(o / 0.3)); g.strokeStyle = th.bad; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); g.moveTo(-60, -110); g.lineTo(-60 + 120 * u, -110 + 120 * u); g.moveTo(60, -110); g.lineTo(60 - 120 * u, -110 + 120 * u); g.stroke(); }
    if (K.bars) { const u = ease.in(clamp(o / 0.3)); for (let i = 0; i < 6; i++) { const bx = -90 + (i + 0.5) * 30; g.fillStyle = '#10161f'; g.fillRect(bx - 5, -140, 10, 190 * u); } }
    g.fillStyle = th.bad; rr(g, -90, 56, 180, 28, 8); g.fill(); txt(g, 'ANNA · SUSPECT', 0, 70, F.cap(13), th.paper);
    const w = Math.max(196, mw(K.text, F.cap(21)) + 22); g.save(); g.translate(0, 120); g.fillStyle = th.ink; rr(g, -w / 2, -20, w, 40, 10); g.fill(); g.strokeStyle = K.tone === 'bad' ? '#FF3B30' : K.tone === 'good' ? '#00D26A' : '#F2B705'; g.lineWidth = 3; rr(g, -w / 2, -20, w, 40, 10); g.stroke(); txt(g, K.text, 0, 2, F.cap(21), g.strokeStyle); g.restore();
    if (K.stamp) cst(g, th, t, { text: K.stamp, at: K.at + 0.1, tone: K.tone || 'bad', size: 30, rot: -0.2, x: 0, y: -40 });
    g.restore();
  }
  B.register('apip', { defaults: { keys: [] }, ownEnter: true, size: () => [230, 330], anchors: () => ({ face: [0, -40, 200, 240] }), draw(g, p, env) { g.globalAlpha *= clamp(env.lt / 0.08); pip(g, p, env); } });
  Object.assign(window.AN5.h, { fit, stk, chip, label, mw });
  // ---------- the stage ----------
  const val = (v, t) => { if (v && typeof v === 'object') { const u = ease.out(clamp((t - v.at) / (v.dur || 1))), x = lerp(v.from || 0, v.to, u); return (v.pre || '') + fmt(v.dec ? x : Math.round(x), v.dec || 0) + (v.suf || ''); } return v; };
  B.register('astage', {
    defaults: { C: [], scenes: [], hook: null, hideCounter: [], beats: [], notes: [] }, ownEnter: true, size: () => [1080, 1920],
    draw(g, p, env) {
      const { t, theme: th } = env; g.translate(-540, -960);
      let bl = ''; for (const b of p.beats) if (t >= b[0]) bl = b[1]; if (bl) { const k = spring(t - (p.beats.find(b => b[1] === bl)[0]), 'snappy'); g.save(); g.globalAlpha *= clamp(k * 2); label(g, bl, 990, 264, th.accent, 26, 'right'); g.restore(); }
      let seg = p.C[0]; for (const s of p.C) if (t >= s.from) seg = s; const hid = p.hideCounter.some(([a, b]) => t >= a && t < b), segT = t - seg.from, pop = 1 + 0.05 * hit(Math.min(0.5, Math.max(0, segT)), 8);
      if (!hid) {
        g.save(); g.translate(540, 437); g.scale(pop, pop); g.translate(-540, -437); paper(g, 70, 322, 940, 230, 26, { lift: 0.3 });
        const L = [seg.L[0], val(seg.L[1], t)], R = [seg.R[0], val(seg.R[1], t)]; g.fillStyle = 'rgba(11,15,20,.14)'; rr(g, 98, 344, 884, 22, 11); g.fill();
        const fr = seg.bar ? clamp(seg.bar(t)) : 0; if (fr > 0.005) { g.fillStyle = th.bad; rr(g, 98, 344, Math.max(22, fr * 884), 22, 11); g.fill(); }
        label(g, L[0], 100, 398, th.inkSoft, 28, 'left'); label(g, R[0], 980, 398, th.inkSoft, 28, 'right');
        const sL = fit(L[1], F.hero, 410, 104, 22), sR = fit(R[1], F.hero, 410, 104, 22);
        txt(g, L[1], 100, 484, F.hero(sL), seg.Lc === 'bad' ? th.badInk : seg.Lc === 'gold' ? '#B88700' : th.ink, 'left'); txt(g, R[1], 980, 484, F.hero(sR), seg.Rc === 'bad' ? th.badInk : seg.Rc === 'gold' ? '#B88700' : th.ink, 'right');
        g.restore();
      }
      hookText(g, p, t, th);
      for (const S of p.scenes) {
        if (t < S.from - 0.02 || t > S.to + 0.02) continue; const lt = t - S.from, kin = spring(lt + 0.08, { f: 2.4, z: 0.7 }), a = clamp(lt / 0.12) * (1 - lin(t, S.to - 0.12, S.to)), sc = (S.pop === false ? 1 : 0.94 + 0.06 * Math.min(1.05, kin));
        g.save(); g.globalAlpha *= a; g.translate(540, 840 + (S.gdy || 0)); g.scale(sc * (S.gsc || 1), sc * (S.gsc || 1)); g.translate(-540, -840);
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
