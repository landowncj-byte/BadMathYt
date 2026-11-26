// ===== Anna Delvey — Decoded crime-show stage 'astage' (screen space). Layout: pill y238-290 | live card y322-552 | zone y590-1085 | row y1100-1335 (suspect card left, storyteller right) | captions ~1432.
// Facts: voice/beats-v3.md + research/2026-11-27/anna-delvey-fake-heiress (don't-say list respected: no $22M loan, no firm/bank/hotel names, no 'stole from Rachel').
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
  const PA = 'brand/photos/han-van-meegeren/4.jpg', PF = 'brand/photos/han-van-meegeren/2.jpg';
  const cst = (g, th, t, o) => B.crimeStamp(g, th, t, o);
  const img = s => B.images[s];
  const CROP = { [PA]: { crop: [0.45, 0, 0.55, 0.75], fx: 0.44, fy: 0.42 } };
  // his face in a rect (cover crop on the face), optional zoom / grayscale
  function face(g, x, y, w, h, zoom = 1, mono = false, fxo = 0, fyo = 0) { const c = CROP[PA]; g.save(); rr(g, x, y, w, h, 8); g.clip(); B.drawPhoto(g, img(PA), x, y, w, h, { crop: c.crop, fx: c.fx + fxo, fy: c.fy + fyo, zoom: zoom * (w / h >= 1.3 ? 1.05 : 1.6) }); if (mono) { g.globalCompositeOperation = 'saturation'; g.fillStyle = '#808080'; g.fillRect(x, y, w, h); g.globalCompositeOperation = 'source-over'; } g.restore(); g.strokeStyle = 'rgba(11,15,20,.45)'; g.lineWidth = 3; rr(g, x, y, w, h, 8); g.stroke(); }
  const pk = (t, at, o = 'bouncy') => Math.min(1.1, spring(t - at, o));
  const sub = (g, s, x, y, col, size = 24, al = 'center') => txt(g, s, x, y, F.monoX(size), col, al);
  const bottomChip = (g, S, t, th) => { let ch = null; for (const c of (S.chips || (S.chip ? [S.chip] : []))) if (t >= c.at) ch = c; if (ch && !(S.chipOut && t >= S.chipOut)) chip(g, ch.text, 540, ch.y || 1062, ch.tone || 'ink', th, ch.size || 38, 900, spring(t - ch.at, 'bouncy')); };
  const tagsOf = (g, S, t, th) => { for (const nt of S.tags || []) if (t >= nt.at && (!nt.out || t < nt.out)) chip(g, nt.text, nt.x || 540, nt.y || 625, nt.tone || 'ink', th, nt.size || 36, nt.w || 900, spring(t - nt.at, 'bouncy')); };
  function goldFrame(g, cx, cy, w, h, zoom, th) {
    const b = 16, W = w + 2 * b, H = h + 2 * b; g.save(); g.translate(cx, cy); B.shadowed(g, () => rr(g, -W / 2, -H / 2, W, H, 10), '#B8860B', 0.5);
    const lg = g.createLinearGradient(-W / 2, -H / 2, W / 2, H / 2); lg.addColorStop(0, '#F7DC6F'); lg.addColorStop(0.45, '#C9961A'); lg.addColorStop(1, '#8A6410'); g.fillStyle = lg; rr(g, -W / 2, -H / 2, W, H, 10); g.fill();
    g.strokeStyle = 'rgba(60,40,5,.6)'; g.lineWidth = 3; rr(g, -W / 2, -H / 2, W, H, 10); g.stroke(); g.strokeStyle = 'rgba(255,240,170,.7)'; g.lineWidth = 2; rr(g, -W / 2 + 5, -H / 2 + 5, W - 10, H - 10, 7); g.stroke(); g.strokeStyle = 'rgba(60,40,5,.6)'; g.lineWidth = 3; rr(g, -w / 2 - 3, -h / 2 - 3, w + 6, h + 6, 3); g.stroke();
    g.save(); rr(g, -w / 2, -h / 2, w, h, 3); g.clip(); B.drawPhoto(g, img(PF), -w / 2, -h / 2, w, h, { zoom }); g.globalCompositeOperation = 'multiply'; g.fillStyle = 'rgba(255,205,140,.55)'; g.fillRect(-w / 2, -h / 2, w, h); g.globalCompositeOperation = 'source-over'; g.restore(); g.restore();
  }
  const ICON = {
    frame(g, th) { goldFrameMini(g); }, cuffs(g, th) { B.crimeIcon(g, 'cuffs', 230, th); }, gavel(g, th) { B.crimeIcon(g, 'gavel', 230, th); }, cash(g, th) { B.crimeIcon(g, 'cash', 230, th); },
    coin(g, th) { g.fillStyle = '#E3A400'; g.beginPath(); g.arc(0, 0, 100, 0, 7); g.fill(); g.strokeStyle = '#7a5806'; g.lineWidth = 8; g.stroke(); g.beginPath(); g.arc(0, 0, 76, 0, 7); g.stroke(); txt(g, 'ƒ', 0, 6, F.hero(110), '#7a5806'); },
    palette(g, th) { g.fillStyle = '#d9b27a'; g.beginPath(); g.ellipse(0, 0, 110, 80, -0.2, 0, 7); g.fill(); g.strokeStyle = '#0B0F14'; g.lineWidth = 6; g.stroke(); g.fillStyle = '#F5F3EE'; g.beginPath(); g.arc(50, 20, 16, 0, 7); g.fill(); [['#E0281E', -50, -20], ['#2c3e66', -10, -46], ['#F2B705', 30, -36], ['#1FA366', -64, 22]].forEach(([c, x, y]) => { g.fillStyle = c; g.beginPath(); g.arc(x, y, 18, 0, 7); g.fill(); g.stroke(); }); },
  };
  function goldFrameMini(g) { g.fillStyle = '#C9961A'; rr(g, -100, -80, 200, 160, 8); g.fill(); g.strokeStyle = '#0B0F14'; g.lineWidth = 6; g.stroke(); g.fillStyle = '#4a5a6e'; rr(g, -78, -58, 156, 116, 4); g.fill(); g.fillStyle = '#d9b27a'; g.beginPath(); g.ellipse(0, -10, 28, 34, 0, 0, 7); g.fill(); g.fillStyle = '#7a5f3a'; g.beginPath(); g.moveTo(-56, 58); g.quadraticCurveTo(0, -10, 56, 58); g.fill(); }
  // ---------- scenes ----------
  function frame(g, p, lt, t, th, S) {
    const k = pk(t, S.at); g.save(); g.translate(540, 800 + (1 - Math.min(1, k)) * 70); g.scale(0.9 + 0.1 * k, 0.9 + 0.1 * k); g.globalAlpha *= clamp((t - S.at) / 0.08);
    goldFrame(g, 0, -20, 470, 367, 1 + 0.05 * lin(t, S.at, S.at + 7), th);
    const pl = t - (S.labelAt ?? S.at + 0.3); if (pl > 0) { g.save(); g.globalAlpha *= clamp(pl / 0.1); clay(g, -240, 218, 480, 74, 12, th.navy, { shadowK: 0.4 }); txt(g, S.plate1 || 'JOHANNES VERMEER', 0, 240, F.hero(34), th.gold); sub(g, S.plate2 || '“LOST MASTERPIECE”', 0, 274, th.paper, 20); g.restore(); }
    if (S.stampAt != null) cst(g, th, t, { text: S.stampText || 'PAINTED BY HIM', at: S.stampAt, tone: 'bad', size: 62, rot: -0.1, x: 60, y: -20 });
    sub(g, 'PHOTO OF HIS FAKE · CC BY-SA 3.0', 0, 306, th.paper, 12); g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th);
  }
  function intro(g, p, lt, t, th, S) {
    const k = pk(t, S.at); g.save(); g.translate(540, 835 + (S.dy0 || 0) + (1 - Math.min(1, k)) * 90); g.scale(0.88 + 0.12 * k, 0.88 + 0.12 * k); g.rotate(-0.018 * (1 - Math.min(1, k)) * 4); g.globalAlpha *= clamp((t - S.at) / 0.08);
    paper(g, -440, -235, 880, 470, 18, { lift: 0.6 }); g.fillStyle = th.navy; rr(g, -424, -219, 848, 52, 12); g.fill(); txt(g, S.head || 'CASE FILE · THE FORGER', 0, -192, F.monoX(24), th.gold);
    face(g, -400, -140, 300, 340, 1 + 0.07 * lin(t, S.at, S.at + 6)); if (S.flash && lt < 0.4) { g.fillStyle = 'rgba(255,255,255,' + 0.8 * hit(lt, 12) + ')'; rr(g, -400, -140, 300, 340, 8); g.fill(); }
    g.fillStyle = '#c4231a'; g.beginPath(); g.arc(-250, -150, 12, 0, 7); g.fill();
    const nm = t - (S.nameAt ?? S.at + 0.3); if (nm > 0) { g.save(); g.globalAlpha *= clamp(nm / 0.1); txt(g, 'HAN VAN MEEGEREN', -70, -105, F.hero(fit('HAN VAN MEEGEREN', F.hero, 480, 66)), th.ink, 'left'); g.restore(); }
    const rl = t - (S.roleAt ?? S.at + 0.6); if (rl > 0) { g.save(); g.globalAlpha *= clamp(rl / 0.1); g.translate(130, -30); g.scale(0.8 + 0.2 * Math.min(1.1, spring(rl, 'bouncy')), 0.8 + 0.2 * Math.min(1.1, spring(rl, 'bouncy'))); clay(g, -230, -34, 460, 68, 14, th.gold, { shadowK: 0.4 }); txt(g, S.role || 'DUTCH PAINTER', 0, 3, F.hero(44), '#0B0F14'); g.restore(); }
    const tr = t - (S.line2At ?? 9999); if (tr > 0) { g.save(); g.globalAlpha *= clamp(tr / 0.1); txt(g, S.line2 || '', 130, 52, F.monoX(26), th.inkSoft); g.fillStyle = th.navy; rr(g, -50, 80, 360, 6, 3); g.fill(); g.restore(); }
    sub(g, 'PHOTO: KOOS RAUCAMP / ANEFO · CC BY 4.0', -250, 222, th.inkSoft, 12);
    for (const q of S.stamps || []) cst(g, th, t, { size: 70, rot: -0.1, x: 150, y: 110, ...q });
    g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th);
  }
  function defcard(g, p, lt, t, th, S) {
    const k = pk(t, S.at); g.save(); g.translate(540, 830 + (1 - Math.min(1, k)) * 70); g.scale(0.9 + 0.1 * k, 0.9 + 0.1 * k); g.globalAlpha *= clamp((t - S.at) / 0.08);
    paper(g, -430, -210, 860, 420, 18, { lift: 0.5 }); g.fillStyle = th.navy; rr(g, -430, -210, 860, 78, 18); g.fill(); txt(g, S.head || 'WHAT IT MEANS', 0, -170, F.hero(48), th.gold);
    g.save(); g.translate(-250, 30); const ia = t - (S.iconAt ?? S.at + 0.3); if (ia > 0) { g.globalAlpha *= clamp(ia / 0.1); g.scale(0.7 + 0.3 * Math.min(1.1, spring(ia, 'bouncy')), 0.7 + 0.3 * Math.min(1.1, spring(ia, 'bouncy'))); ICON[S.icon || 'frame'](g, th, t); } g.restore();
    const da = t - (S.defAt ?? S.at + 0.4); if (da > 0) { g.save(); g.globalAlpha *= clamp(da / 0.12); g.translate((1 - Math.min(1, spring(da, 'snappy'))) * 50, 0); txt(g, S.term, 120, -75, F.hero(fit(S.term, F.hero, 520, 78)), th.badInk); txt(g, S.d1, 120, 5, F.hero(fit(S.d1, F.hero, 520, 50)), th.ink); txt(g, S.d2, 120, 65, F.hero(fit(S.d2, F.hero, 520, 50)), th.ink); if (S.d3) txt(g, S.d3, 120, 125, F.hero(fit(S.d3, F.hero, 520, 50)), th.ink); g.restore(); }
    g.restore(); bottomChip(g, S, t, th);
  }
  function steps(g, p, lt, t, th, S) {
    S.items.forEach((it, i) => { const o = t - it.at; if (o <= 0) return; const k = pk(t, it.at), x = 190 + i * 350;
      g.save(); g.translate(x, 840 + (1 - Math.min(1, k)) * 60); g.scale(0.85 + 0.15 * k, 0.85 + 0.15 * k); g.globalAlpha *= clamp(o / 0.08); paper(g, -150, -190, 300, 380, 18, { lift: 0.5 }); g.fillStyle = th.navy; rr(g, -150, -190, 300, 60, 18); g.fill(); txt(g, 'STEP ' + (i + 1), 0, -158, F.hero(40), th.gold);
      g.save(); g.translate(0, -30); g.scale(0.62, 0.62); if (it.icon === 'check') { g.fillStyle = '#1FA366'; g.beginPath(); g.arc(0, 0, 100, 0, 7); g.fill(); g.strokeStyle = '#F5F3EE'; g.lineWidth = 22; g.lineCap = 'round'; g.beginPath(); g.moveTo(-50, 4); g.lineTo(-12, 44); g.lineTo(56, -40); g.stroke(); } else if (it.icon === 'lost') { goldFrameMini(g); g.save(); g.rotate(-0.2); clay(g, -110, -26, 220, 52, 12, th.bad, { shadowK: 0.4 }); txt(g, 'FOUND!', 0, 2, F.hero(40), th.paper); g.restore(); } else ICON[it.icon](g, th); g.restore();
      txt(g, it.l1, 0, 80, F.hero(fit(it.l1, F.hero, 270, 46)), th.ink); txt(g, it.l2, 0, 132, F.hero(fit(it.l2, F.hero, 270, 36)), th.badInk); g.restore();
      if (i > 0) { const u = ease.out(clamp(o / 0.25)); g.strokeStyle = th.bad; g.fillStyle = th.bad; g.lineWidth = 8; g.lineCap = 'round'; g.beginPath(); g.moveTo(x - 190, 840); g.lineTo(x - 190 + 28 * u, 840); g.stroke(); g.beginPath(); g.moveTo(x - 154, 840); g.lineTo(x - 174, 826); g.lineTo(x - 174, 854); g.closePath(); if (u > 0.8) g.fill(); } });
    tagsOf(g, S, t, th); bottomChip(g, S, t, th);
  }
  function deal(g, p, lt, t, th, S) {
    const kb = pk(t, S.buyerAt); if (t >= S.buyerAt) { g.save(); g.translate(290, 760 + (1 - Math.min(1, kb)) * 60); g.scale(0.85 + 0.15 * kb, 0.85 + 0.15 * kb); g.globalAlpha *= clamp((t - S.buyerAt) / 0.08); paper(g, -210, -135, 420, 270, 16, { lift: 0.5 }); g.fillStyle = th.navy; rr(g, -210, -135, 420, 64, 16); g.fill(); txt(g, S.buyerHead || 'THE BUYER · 1943', 0, -104, F.monoX(24), th.gold); txt(g, 'HERMANN GOERING', 0, -22, F.hero(fit('HERMANN GOERING', F.hero, 380, 54)), th.ink); clay(g, -150, 20, 300, 62, 14, th.bad, { shadowK: 0.4 }); txt(g, 'NAZI LEADER', 0, 52, F.hero(42), th.paper); sub(g, 'TEXT ONLY · NO PHOTO', 0, 112, th.inkSoft, 14); g.restore(); }
    const kf = pk(t, S.frameAt ?? S.at); if (t >= (S.frameAt ?? S.at)) { g.save(); g.translate(805, 755 + (1 - Math.min(1, kf)) * 60); g.scale(0.85 + 0.15 * kf, 0.85 + 0.15 * kf); g.globalAlpha *= clamp((t - (S.frameAt ?? S.at)) / 0.08); goldFrame(g, 0, 0, 270, 211, 1, th); txt(g, 'A “VERMEER”', 0, 148, F.hero(30), th.gold); if (S.fakeAt != null) cst(g, th, t, { text: 'FAKE', at: S.fakeAt, tone: 'bad', size: 54, rot: -0.14, x: 0, y: 0 }); g.restore(); }
    if (S.arrowAt != null && t >= S.arrowAt) { const u = ease.out(clamp((t - S.arrowAt) / 0.35)); g.save(); g.strokeStyle = th.gold; g.fillStyle = th.gold; g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); g.moveTo(640, 760); g.lineTo(640 - 70 * u, 760); g.stroke(); if (u > 0.9) { g.beginPath(); g.moveTo(552, 760); g.lineTo(578, 744); g.lineTo(578, 776); g.closePath(); g.fill(); } g.restore(); }
    if (S.priceAt != null && t >= S.priceAt) { const k = pk(t, S.priceAt), v = Math.round(1650000 * ease.out(clamp((t - (S.numAt ?? S.priceAt)) / 1.0))); g.save(); g.translate(540, 985 + (1 - Math.min(1, k)) * 40); g.scale(0.9 + 0.1 * k, 0.9 + 0.1 * k); g.globalAlpha *= clamp((t - S.priceAt) / 0.08); paper(g, -430, -62, 860, 124, 16, { lift: 0.5 }); sub(g, 'PRICE PAID', -400, -32, th.inkSoft, 22, 'left'); txt(g, fmt(v) + ' GUILDERS', 400, 8, F.hero(fit('1,650,000 GUILDERS', F.hero, 520, 64)), th.badInk, 'right'); sub(g, 'DUTCH MONEY BACK THEN', -400, 34, th.inkSoft, 20, 'left'); if (S.soldAt != null) cst(g, th, t, { text: 'SOLD', at: S.soldAt, tone: 'bad', size: 34, rot: -0.14, x: -195, y: -4 }); g.restore(); }
    tagsOf(g, S, t, th); bottomChip(g, S, t, th);
  }
  function trace(g, p, lt, t, th, S) {
    const k = pk(t, S.at); g.save(); g.translate(300, 810 + (1 - Math.min(1, k)) * 60); g.rotate(-0.025); g.globalAlpha *= clamp((t - S.at) / 0.08); paper(g, -230, -230, 460, 460, 18, { lift: 0.5 }); g.fillStyle = th.navy; rr(g, -210, -210, 420, 52, 10); g.fill(); txt(g, 'GOERING’S COLLECTION', 0, -184, F.monoX(22), th.gold); goldFrame(g, 0, -20, 250, 195, 1, th); txt(g, '1945', -150, 170, F.hero(60), th.badInk, 'left'); sub(g, 'FOUND BY INVESTIGATORS', 60, 172, th.inkSoft, 16, 'center'); if (S.foundAt != null) cst(g, th, t, { text: 'FOUND', at: S.foundAt, tone: 'bad', size: 54, rot: -0.12, x: 20, y: -20 }); g.restore();
    const kf = pk(t, S.faceAt); if (t >= S.faceAt) { g.save(); g.translate(790, 810 + (1 - Math.min(1, kf)) * 60); g.rotate(0.03); g.globalAlpha *= clamp((t - S.faceAt) / 0.08); paper(g, -200, -230, 400, 460, 18, { lift: 0.5 }); face(g, -176, -206, 352, 320, 1 + 0.08 * lin(t, S.faceAt, S.faceAt + 4)); g.fillStyle = th.navy; rr(g, -176, 126, 352, 82, 10); g.fill(); txt(g, 'HAN VAN MEEGEREN', 0, 158, F.hero(36), th.paper); sub(g, 'TRACED TO HIM', 0, 192, th.gold, 18); g.restore(); }
    if (S.stringAt != null && t >= S.stringAt) { const u = ease.out(clamp((t - S.stringAt) / 0.5)); g.strokeStyle = '#E0281E'; g.lineWidth = 7; g.lineCap = 'round'; g.beginPath(); g.moveTo(420, 640); g.quadraticCurveTo(540, 600 + 60 * Math.sin(3.14 * u), 420 + 360 * u, 640 - 10 * u); g.stroke(); g.fillStyle = '#c4231a'; g.beginPath(); g.arc(420, 640, 10, 0, 7); g.fill(); g.beginPath(); g.arc(790, 640, 10, 0, 7); g.fill(); }
    tagsOf(g, S, t, th); bottomChip(g, S, t, th);
  }
  function arrest(g, p, lt, t, th, S) {
    const k = pk(t, S.at); g.save(); g.translate(540, 810 + (1 - Math.min(1, k)) * 70); g.scale(0.9 + 0.1 * k, 0.9 + 0.1 * k); g.globalAlpha *= clamp((t - S.at) / 0.08); paper(g, -300, -240, 600, 480, 16, { lift: 0.6 }); face(g, -270, -210, 540, 300, 1 + 0.12 * ease.out(clamp((t - S.at) / 3)), false, 0, 0.0);
    if (S.flash && lt < 0.4) { g.fillStyle = 'rgba(255,255,255,' + 0.9 * hit(lt, 12) + ')'; rr(g, -270, -210, 540, 300, 8); g.fill(); } if (S.xAt != null && t >= S.xAt) { g.fillStyle = 'rgba(40,0,0,.35)'; rr(g, -270, -210, 540, 300, 8); g.fill(); }
    g.fillStyle = th.navy; rr(g, -270, 100, 540, 120, 10); g.fill(); txt(g, 'HAN VAN MEEGEREN', -240, 134, F.hero(42), th.paper, 'left'); sub(g, S.line || 'ARRESTED · 1945', -240, 166, th.gold, 20, 'left'); const cl = t - (S.chargeAt ?? 9999); if (cl > 0) { g.save(); g.globalAlpha *= clamp(cl / 0.1); sub(g, 'CHARGE: COLLABORATION', -240, 198, th.paper, 22, 'left'); g.restore(); }
    const cu = t - (S.cuffAt ?? 9999); if (cu > 0) { g.save(); g.translate(205, 150); g.rotate(-0.2); const kk = Math.min(1.1, spring(cu, 'bouncy')); g.scale(kk * 0.7, kk * 0.7); B.crimeIcon(g, 'cuffs', 150, th); g.restore(); }
    if (S.stampAt != null) cst(g, th, t, { text: 'ARRESTED', at: S.stampAt, tone: 'bad', size: 84, rot: -0.12, x: 0, y: -40 });
    g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th);
  }
  function confess(g, p, lt, t, th, S) {
    const k = pk(t, S.at); g.save(); g.translate(540, 810 + (1 - Math.min(1, k)) * 70); g.scale(0.9 + 0.1 * k, 0.9 + 0.1 * k); g.globalAlpha *= clamp((t - S.at) / 0.08);
    paper(g, -440, -230, 880, 460, 18, { lift: 0.5 }); face(g, -410, -200, 250, 300, 1.15 - 0.1 * ease.out(clamp((t - S.at) / 1.5))); g.fillStyle = th.navy; rr(g, -410, 110, 250, 90, 8); g.fill(); txt(g, 'VAN MEEGEREN', -285, 140, F.hero(30), th.paper); sub(g, S.tagline || 'HIS CONFESSION', -285, 176, th.gold, 16);
    g.fillStyle = th.bad; g.beginPath(); g.moveTo(-140, -200); g.lineTo(-100, -200); g.lineTo(-100, -150); g.closePath(); g.fill(); txt(g, '“', -128, -170, F.hero(130), th.bad, 'left');
    (S.lines || []).forEach((ln, i) => { const o = t - ln.at; if (o <= 0) return; const s = ln.text, n = Math.min(s.length, Math.floor(o * 26)); g.save(); txt(g, s.slice(0, n), -100, -120 + i * 100, F.hero(fit(s, F.hero, 520, 80)), ln.tone === 'bad' ? th.badInk : th.ink, 'left'); g.restore(); });
    if (S.stampAt != null) cst(g, th, t, { text: S.stampText || 'HE CONFESSED', at: S.stampAt, tone: 'bad', size: 54, rot: -0.07, x: 170, y: 150 });
    g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th);
  }
  function watch(g, p, lt, t, th, S) {
    const k = pk(t, S.at), z = 1 + (S.push || 0.5) * ease.inOut(clamp((t - (S.pushAt ?? S.at)) / (S.pushDur || 4))), w = 660, h = Math.round(w * 687 / 960);
    g.save(); g.translate(540, 835 + (1 - Math.min(1, k)) * 70); g.scale(0.9 + 0.1 * k, 0.9 + 0.1 * k); g.rotate(-0.012); g.globalAlpha *= clamp((t - S.at) / 0.08);
    paper(g, -w / 2 - 18, -h / 2 - 18, w + 36, h + 76, 10, { lift: 0.6 }); g.save(); rr(g, -w / 2, -h / 2, w, h, 4); g.clip(); const fx = 0.69 - (0.69 - 0.5) * (1 - 1 / z) * 0, fy = 0.31; B.drawPhoto(g, img(PA), -w / 2, -h / 2, w, h, { zoom: z, fx: 0.5 + (0.69 - 0.5) * ease.inOut(clamp((t - (S.pushAt ?? S.at)) / (S.pushDur || 4))), fy: 0.5 - 0.19 * ease.inOut(clamp((t - (S.pushAt ?? S.at)) / (S.pushDur || 4))) }); g.restore();
    if (S.flash && lt < 0.4) { g.fillStyle = 'rgba(255,255,255,' + 0.8 * hit(lt, 12) + ')'; rr(g, -w / 2, -h / 2, w, h, 4); g.fill(); }
    sub(g, 'PHOTO: KOOS RAUCAMP / ANEFO · CC BY 4.0', 0, h / 2 + 38, th.inkSoft, 14);
    (S.callouts || []).forEach(c => { const o = t - c.at; if (o <= 0) return; const kk = pk(t, c.at), u = ease.out(clamp(o / 0.3)); g.save(); g.translate(-540, -835); g.strokeStyle = th.bad; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.moveTo(c.fx, c.fy); g.lineTo(c.fx + (c.x - c.fx) * u, c.fy + (c.y - c.fy) * u); g.stroke(); g.translate(c.x, c.y); g.scale(kk, kk); clay(g, -c.w / 2, -27, c.w, 54, 27, c.tone === 'good' ? th.good : th.bad, { shadowK: 0.5 }); txt(g, c.text, 0, 3, F.hero(fit(c.text, F.hero, c.w - 20, 32)), c.tone === 'good' ? '#0B0F14' : th.paper); g.restore(); });
    if (S.stampAt != null) cst(g, th, t, { text: S.stampText || 'NEW FAKE · LIVE', at: S.stampAt, tone: 'bad', size: 54, rot: -0.08, x: 0, y: 40 });
    g.restore(); bottomChip(g, S, t, th);
  }
  function swap(g, p, lt, t, th, S) {
    const A = pk(t, S.at); g.save(); g.translate(290, 820 + (1 - Math.min(1, A)) * 60); g.globalAlpha *= clamp((t - S.at) / 0.08); g.scale(0.85 + 0.15 * A, 0.85 + 0.15 * A); paper(g, -230, -210, 460, 420, 18, { lift: 0.5 }); face(g, -205, -185, 410, 210, 1.05, S.strikeAt != null && t >= S.strikeAt); g.fillStyle = th.navy; rr(g, -205, 40, 410, 150, 10); g.fill(); txt(g, 'TRAITOR', 0, 82, F.hero(58), th.paper); sub(g, 'COLLABORATION', 0, 130, th.gold, 22); sub(g, 'HELPING THE ENEMY', 0, 160, th.paper, 16);
    if (S.strikeAt != null && t >= S.strikeAt) { const u = ease.out(clamp((t - S.strikeAt) / 0.3)); g.strokeStyle = th.bad; g.lineWidth = 14; g.lineCap = 'round'; g.beginPath(); g.moveTo(-205, 120 + 20); g.lineTo(-205 + 410 * u, 70 - 20 * u); g.stroke(); } g.restore();
    const rv = t - (S.revealAt ?? 9999); if (rv > 0) { const B2 = Math.min(1.1, spring(rv, 'bouncy')); g.save(); g.translate(790, 820 + (1 - Math.min(1, B2)) * 60); g.scale(0.85 + 0.15 * Math.min(1, B2), 0.85 + 0.15 * Math.min(1, B2)); g.globalAlpha *= clamp(rv / 0.08); paper(g, -230, -210, 460, 420, 18, { lift: 0.5 }); face(g, -205, -185, 410, 210, 1.05); g.fillStyle = '#188a56'; rr(g, -205, 40, 410, 150, 10); g.fill(); txt(g, 'FAKER', 0, 82, F.hero(58), th.paper); sub(g, 'FORGERY', 0, 130, th.paper, 22); sub(g, 'FAKING ART', 0, 160, th.paper, 16); g.restore(); const u = ease.out(clamp(rv / 0.4)); g.save(); g.strokeStyle = th.gold; g.fillStyle = th.gold; g.lineWidth = 10; g.lineCap = 'round'; g.beginPath(); g.moveTo(520, 820); g.lineTo(520 + 40 * u, 820); g.stroke(); g.restore(); }
    tagsOf(g, S, t, th); bottomChip(g, S, t, th);
  }
  function charge(g, p, lt, t, th, S) {
    const k = pk(t, S.at); g.save(); g.translate(540, 780 + (1 - Math.min(1, k)) * 60); g.globalAlpha *= clamp((t - S.at) / 0.08); g.scale(0.9 + 0.1 * k, 0.9 + 0.1 * k); paper(g, -430, -190, 860, 380, 18, { lift: 0.5 }); g.fillStyle = th.navy; rr(g, -430, -190, 860, 70, 18); g.fill(); txt(g, 'THE CHARGE', 0, -154, F.hero(46), th.gold);
    txt(g, 'COLLABORATION', 0, -50, F.hero(88), th.ink); if (S.strikeAt != null && t >= S.strikeAt) { const u = ease.out(clamp((t - S.strikeAt) / 0.3)); g.strokeStyle = th.bad; g.lineWidth = 14; g.lineCap = 'round'; g.beginPath(); g.moveTo(-330, -40); g.lineTo(-330 + 660 * u, -52); g.stroke(); }
    const rv = t - (S.revealAt ?? 9999); if (rv > 0) { const s = 'FORGERY', n = Math.min(s.length, Math.floor(rv * 14)); g.fillStyle = th.paperShade; rr(g, -330, 30, 660, 110, 14); g.fill(); g.strokeStyle = th.bad; g.lineWidth = 5; rr(g, -330, 30, 660, 110, 14); g.stroke(); txt(g, s.slice(0, n), 0, 86, F.hero(96), th.badInk); }
    const df = t - (S.defAt ?? 9999); if (df > 0) { g.save(); g.globalAlpha *= clamp(df / 0.1); sub(g, 'FORGERY = FAKING ART', 0, 166, th.inkSoft, 26); g.restore(); }
    g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th);
  }
  function verdict(g, p, lt, t, th, S) {
    const k = pk(t, S.at); g.save(); g.translate(540, 765 + (1 - Math.min(1, k)) * 60); g.globalAlpha *= clamp((t - S.at) / 0.08); g.scale(0.9 + 0.1 * k, 0.9 + 0.1 * k); paper(g, -300, -130, 600, 260, 16, { lift: 0.5 }); face(g, -270, -100, 540, 200, 1.1, true, 0, 0.02);
    const bu = ease.in(clamp((t - (S.barsAt ?? S.at)) / 0.35)); for (let i = 0; i < 8; i++) { const bx = -270 + (i + 0.5) * 540 / 8; g.fillStyle = '#10161f'; g.fillRect(bx - 9, -100, 18, 200 * bu); g.fillStyle = 'rgba(255,255,255,.22)'; g.fillRect(bx - 9, -100, 5, 200 * bu); } g.restore();
    const da = t - (S.dateAt ?? 9999); if (da > 0) { g.save(); g.globalAlpha *= clamp(da / 0.1); sub(g, 'AMSTERDAM · NOV 1947 · CONVICTED OF FORGERY', 540, 610, th.gold, 22); g.restore(); }
    const ya = t - S.yrsAt; if (ya > 0) { const kk = Math.min(1.1, spring(ya, 'bouncy')); g.save(); g.translate(540, 975); g.scale(0.8 + 0.2 * kk, 0.8 + 0.2 * kk); g.globalAlpha *= clamp(ya / 0.08); stk(g, '1 YEAR', 0, -6, F.hero(130), th.bad, 'center', 16); g.restore(); const w = 840 / 12; for (let i = 0; i < 12; i++) { const u = ease.out(clamp((ya - 0.2 - i * 0.03) / 0.3)); g.fillStyle = th.bad; rr(g, 120 + i * w + 2, 1058, w - 4, 16 * u, 4); g.fill(); } sub(g, 'ONE YEAR OF PRISON', 540, 1090, th.paper, 18); }
    tagsOf(g, S, t, th); bottomChip(g, S, t, th);
  }
  function after(g, p, lt, t, th, S) {
    const k = pk(t, S.at); g.save(); g.translate(540, 800); g.globalAlpha *= clamp((t - S.at) / 0.08); g.scale(0.85 + 0.15 * k, 0.85 + 0.15 * k); stk(g, 'WEEKS LATER', 0, -70, F.hero(fit('WEEKS LATER', F.hero, 860, 130)), th.paper, 'center', 14); g.restore();
    const w = 840 / 12; for (let i = 0; i < 12; i++) { const u = ease.out(clamp((t - S.at - 0.2 - i * 0.03) / 0.3)); g.fillStyle = 'rgba(245,243,238,.15)'; rr(g, 120 + i * w + 2, 880, w - 4, 70 * u, 6); g.fill(); g.strokeStyle = th.bad; g.lineWidth = 2; rr(g, 120 + i * w + 2, 880, w - 4, 70 * u, 6); g.stroke(); }
    sub(g, 'HIS ONE-YEAR SENTENCE', 540, 986, th.paper, 22); if (S.stampAt != null) { g.save(); g.translate(540, 915); cst(g, th, t, { text: 'NEVER SERVED', at: S.stampAt, tone: 'bad', size: 70, rot: -0.07, x: 0, y: 0 }); g.restore(); }
    tagsOf(g, S, t, th); bottomChip(g, S, t, th);
  }
  function board(g, p, lt, t, th, S) {
    const k = pk(t, S.at); g.save(); g.translate(540, 830 + (1 - Math.min(1, k)) * 60); g.globalAlpha *= clamp((t - S.at) / 0.08);
    const lg = g.createLinearGradient(-450, -230, 450, 230); lg.addColorStop(0, '#b98650'); lg.addColorStop(1, '#8c5f33'); g.fillStyle = lg; rr(g, -450, -240, 900, 480, 18); g.fill(); g.strokeStyle = '#4a2f17'; g.lineWidth = 14; rr(g, -450, -240, 900, 480, 18); g.stroke();
    for (let i = 0; i < 160; i++) { g.fillStyle = 'rgba(' + (hash(i * 3.1) > 0.5 ? '60,35,10' : '230,190,130') + ',' + (0.06 + 0.1 * hash(i * 7.7)) + ')'; g.beginPath(); g.arc(-440 + hash(i * 1.3) * 880, -230 + hash(i * 2.9) * 460, 2 + 4 * hash(i * 5.1), 0, 7); g.fill(); }
    const items = [{ x: 0, y: -60, w: 200, h: 230, kind: 'photo' }, { x: -310, y: -100, w: 190, h: 150, kind: 'frame', txt: 'FAKE VERMEER' }, { x: -310, y: 100, w: 190, h: 150, icon: 'cash', txt: '1.65M GUILDERS' }, { x: 310, y: -100, w: 190, h: 150, icon: 'cuffs', txt: 'ARRESTED 1945' }, { x: 310, y: 100, w: 190, h: 150, icon: 'gavel', txt: '1 YEAR · 1947' }];
    const pins = items.map(it => [it.x, it.y - it.h / 2 + 8]), tight = ease.out(clamp((t - S.tightAt) / 0.5));
    items.forEach((it, i) => { if (i) { const at = S.at + 0.3 + (i - 1) * 0.25, u = ease.out(clamp((t - at - 0.1) / 0.4)); if (u > 0) { const a = pins[0], b = pins[i]; g.strokeStyle = '#E0281E'; g.lineWidth = 5; g.lineCap = 'round'; g.beginPath(); g.moveTo(a[0], a[1]); const ex = lerp(a[0], b[0], u), ey = lerp(a[1], b[1], u); g.quadraticCurveTo((a[0] + ex) / 2, (a[1] + ey) / 2 + 36 * (1 - tight), ex, ey); g.stroke(); } } });
    items.forEach((it, i) => { const at = i ? S.at + 0.3 + (i - 1) * 0.25 : S.at, o = t - at; if (o < 0) return; const kk = Math.min(1.1, spring(o, 'bouncy')); g.save(); g.translate(it.x, it.y); g.rotate((i - 2) * 0.03 + (1 - Math.min(1, kk)) * 0.2); g.scale(0.6 + 0.4 * kk, 0.6 + 0.4 * kk); paper(g, -it.w / 2, -it.h / 2, it.w, it.h, 8, { lift: 0.3, fill: it.kind === 'photo' ? '#EDE7D8' : th.paper });
      if (it.kind === 'photo') { face(g, -it.w / 2 + 10, -it.h / 2 + 10, it.w - 20, it.h - 64, 1.0); g.fillStyle = th.navy; rr(g, -it.w / 2 + 10, it.h / 2 - 48, it.w - 20, 38, 6); g.fill(); txt(g, 'VAN MEEGEREN', 0, it.h / 2 - 29, F.hero(24), th.paper); }
      else if (it.kind === 'frame') { g.save(); g.translate(0, -22); g.scale(0.5, 0.5); goldFrameMini(g); g.restore(); txt(g, it.txt, 0, it.h / 2 - 26, F.hero(fit(it.txt, F.hero, it.w - 16, 28)), th.badInk); }
      else { g.save(); g.translate(0, -26); B.crimeIcon(g, it.icon, 80, th); g.restore(); txt(g, it.txt, 0, it.h / 2 - 28, F.hero(fit(it.txt, F.hero, it.w - 16, 28)), th.ink); } g.restore(); g.fillStyle = '#c4231a'; g.beginPath(); g.arc(pins[i][0], pins[i][1], 10, 0, 7); g.fill(); });
    g.restore(); if (S.stampAt != null) { g.save(); g.translate(540, 840); cst(g, th, t, { text: S.stampText || 'THE FAKE SAVED HIM', at: S.stampAt, tone: 'bad', size: 48, rot: -0.07, x: 0, y: 190 }); g.restore(); }
    bottomChip(g, S, t, th);
  }
  function ask(g, p, lt, t, th, S) {
    const k = spring(lt, 'bouncy'); g.save(); g.translate(540, 800); g.scale(0.7 + 0.3 * Math.min(1.06, k), 0.7 + 0.3 * Math.min(1.06, k)); g.globalAlpha *= clamp(k * 2);
    const sz = Math.min(fit(S.l1, F.hero, 900, 112), fit(S.l2, F.hero, 900, 112)); stk(g, S.l1, 0, -62, F.hero(sz), th.gold, 'center', 16); stk(g, S.l2, 0, 62, F.hero(sz), th.bad, 'center', 16); g.restore();
  }
  const SC = { frame, intro, defcard, steps, deal, trace, arrest, confess, watch, swap, charge, verdict, after, board, ask };
  // ---------- suspect card (always on, bottom-left): his face in a different treatment at every beat ----------
  function pip(g, p, env) {
    const { t, theme: th } = env; let K = p.keys[0]; for (const q of p.keys) if (t >= q.at) K = q; const o = t - K.at, pop = 1 + 0.07 * Math.exp(-o * 7) * Math.cos(o * 22);
    g.save(); g.scale(pop, pop); g.rotate(-0.03); paper(g, -100, -150, 200, 262, 14, { lift: 0.5 }); face(g, -90, -140, 180, 190, 1 + 0.06 * Math.min(1, o / 3) + (K.zoom || 0), !!K.mono, K.fx || 0, K.fy || 0);
    if (K.tint) { g.fillStyle = K.tint; rr(g, -90, -140, 180, 190, 8); g.fill(); }
    if (K.x) { const u = ease.out(clamp(o / 0.3)); g.strokeStyle = th.bad; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); g.moveTo(-60, -110); g.lineTo(-60 + 120 * u, -110 + 120 * u); g.moveTo(60, -110); g.lineTo(60 - 120 * u, -110 + 120 * u); g.stroke(); }
    if (K.bars) { const u = ease.in(clamp(o / 0.3)); for (let i = 0; i < 6; i++) { const bx = -90 + (i + 0.5) * 30; g.fillStyle = '#10161f'; g.fillRect(bx - 5, -140, 10, 190 * u); } }
    g.fillStyle = th.bad; rr(g, -90, 56, 180, 28, 8); g.fill(); txt(g, 'VAN MEEGEREN', 0, 70, F.cap(13), th.paper);
    const w = Math.max(196, mw(K.text, F.cap(21)) + 22); g.save(); g.translate(0, 120); g.fillStyle = th.ink; rr(g, -w / 2, -20, w, 40, 10); g.fill(); g.strokeStyle = K.tone === 'bad' ? '#FF3B30' : K.tone === 'good' ? '#00D26A' : '#F2B705'; g.lineWidth = 3; rr(g, -w / 2, -20, w, 40, 10); g.stroke(); txt(g, K.text, 0, 2, F.cap(21), g.strokeStyle); g.restore();
    if (K.stamp) cst(g, th, t, { text: K.stamp, at: K.at + 0.1, tone: K.tone || 'bad', size: 30, rot: -0.2, x: 0, y: -40 });
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
        const fr = seg.bar ? clamp(seg.bar(t)) : 0; if (fr > 0.005) { g.fillStyle = th.bad; rr(g, 98, 344, Math.max(22, fr * 884), 22, 11); g.fill(); }
        label(g, L[0], 100, 398, th.inkSoft, 26, 'left'); label(g, R[0], 980, 398, th.inkSoft, 26, 'right');
        const sL = fit(L[1], F.hero, 415, 100, 22), sR = fit(R[1], F.hero, 415, 100, 22), cc = c => c === 'bad' ? th.badInk : c === 'gold' ? '#B88700' : th.ink;
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
