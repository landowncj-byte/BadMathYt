  // ===== pennies-to-the-moon body. Math (beats-v3.md): penny 1.52 mm; Moon 384,400 km = 238,855 mi; N = 384,400,000 / 0.00152 = 252,894,736,842; cost $2,528,947,368; bill 0.10922 mm -> 3.52e13 bills; jackpot $2.04B (2022). =====
  const PEN = 1.52e-3, BIL = 1.0922e-4, MOON = 384.4e6, NMOON = MOON / PEN, NBILL = MOON / BIL, JACK = 2.04e9, COSTP = NMOON / 100;
  const px0 = 70, pw = 940, py0 = 606, ph = 468, gy = 1040, topY = 646, HH = gy - topY, CX = 540;
  const trk = (K, t) => { let v = K[0][1]; for (let i = 0; i < K.length - 1; i++) { const a = K[i], b = K[i + 1]; if (t >= b[0]) v = b[1]; else if (t > a[0]) { if (b[2] === 'j') v = a[1]; else { const u = ease.inOut(lin(t, a[0], b[0])); v = Math.exp(lerp(Math.log(Math.max(a[1], 1e-9)), Math.log(Math.max(b[1], 1e-9)), u)); } break; } else break; } return v; };
  const bigw = v => { const U = v >= 1e12 ? [1e12, 'trillion'] : v >= 1e9 ? [1e9, 'billion'] : [1e6, 'million']; const x = v / U[0]; return (x < 10 ? x.toFixed(2) : x < 100 ? x.toFixed(1) : String(Math.round(x))) + ' ' + U[1]; };
  const fCount = v => v < 1e6 ? fmt(Math.round(v)) : bigw(v);
  const fCost = d => d < 10 ? '$' + d.toFixed(2) : d < 1e6 ? '$' + fmt(Math.round(d)) : '$' + bigw(d);
  const fHeight = m => { if (m < 0.1) return (m * 1000).toFixed(m < 0.01 ? 2 : 1) + ' mm'; if (m < 1) return Math.round(m * 100) + ' cm'; if (m < 1609) return (m < 10 ? m.toFixed(1) : fmt(Math.round(m))) + ' m'; const mi = m / 1609.34; if (mi < 10) return mi.toFixed(1) + ' mi'; if (mi < 1000) return fmt(Math.round(mi)) + ' mi'; if (mi >= 1e5) return fmt(Math.round(mi / 1000) * 1000) + ' mi'; return fmt(Math.round(mi)) + ' mi'; };
  const COPPER = ['#B96C38', '#C77B45'], bills = '#2FA46B';
  const sticker = (g, s, x, y, col, size, al = 'center', lw = 12) => stk(g, s, x, y, F.hero(size), col, al, lw);
  function pennyFace(g, r, k = 1) {
    const gr = g.createRadialGradient(-r * 0.3, -r * 0.35, r * 0.1, 0, 0, r); gr.addColorStop(0, '#F0A56F'); gr.addColorStop(1, '#B9622E');
    g.fillStyle = '#7a3d18'; g.beginPath(); g.arc(0, r * 0.1, r, 0, 7); g.fill(); g.fillStyle = gr; g.beginPath(); g.arc(0, 0, r, 0, 7); g.fill();
    g.strokeStyle = 'rgba(90,40,12,.8)'; g.lineWidth = r * 0.06; g.beginPath(); g.arc(0, 0, r * 0.82, 0, 7); g.stroke();
    txt(g, '1¢', 0, r * 0.04, F.hero(r * 0.95), '#6f3512'); txt(g, 'ONE CENT', 0, -r * 0.58, F.monoX(Math.max(10, r * 0.14)), '#6f3512'); txt(g, '★  ★  ★', 0, r * 0.62, F.monoX(Math.max(10, r * 0.14)), '#6f3512');
  }
  const billArt = (g, x, y, w, h, lab = '$1') => { clay(g, x, y, w, h, 10, bills, { shadowK: 0.5 }); g.strokeStyle = 'rgba(245,243,238,.7)'; g.lineWidth = 3; rr(g, x + 8, y + 8, w - 16, h - 16, 6); g.stroke(); g.fillStyle = 'rgba(245,243,238,.9)'; g.beginPath(); g.arc(x + w / 2, y + h / 2, h * 0.3, 0, 7); g.fill(); txt(g, lab, x + w / 2, y + h / 2 + 2, F.hero(h * 0.34), '#0B0F14'); };
  const mchip = (g, p, t, th, S, y0 = 1050) => { if (!S.chip || t < S.chip.at) return; chip(g, S.chip.text, 540, S.chip.y || y0, S.chip.tone || 'ink', th, S.chip.size || 38, 900, spring(t - S.chip.at, 'bouncy')); };
  // ---------- little world props (stand = real height scaled to the tower; float = fixed-size icon) ----------
  function person(g, x, h) { const s = h / 100; g.save(); g.translate(x, 0); g.scale(s, s); g.fillStyle = '#2c3e66'; g.fillRect(-12, -50, 10, 50); g.fillRect(2, -50, 10, 50); g.fillStyle = '#E8590C'; rr(g, -18, -82, 36, 38, 8); g.fill(); g.fillStyle = '#F0BE94'; g.beginPath(); g.arc(0, -92, 12, 0, 7); g.fill(); g.fillStyle = '#F2B705'; g.beginPath(); g.arc(0, -96, 12, 3.3, 6.1); g.fill(); g.restore(); }
  function house(g, x, h) { const w = h * 1.5; g.fillStyle = '#E9D8B8'; g.fillRect(x - w / 2, -h * 0.62, w, h * 0.62); g.fillStyle = '#B5473B'; g.beginPath(); g.moveTo(x - w * 0.6, -h * 0.62); g.lineTo(x, -h); g.lineTo(x + w * 0.6, -h * 0.62); g.closePath(); g.fill(); g.fillStyle = '#7CC8FF'; g.fillRect(x - w * 0.28, -h * 0.46, w * 0.18, h * 0.2); g.fillRect(x + w * 0.1, -h * 0.46, w * 0.18, h * 0.2); }
  function sky(g, x, h) { const w = Math.max(40, h * 0.2); g.fillStyle = '#8FA3BF'; g.fillRect(x - w / 2, -h, w, h); g.fillStyle = 'rgba(255,245,200,.8)'; const rows = Math.min(40, Math.max(6, Math.floor(h / 14))); for (let r = 0; r < rows; r++) for (let c = 0; c < 3; c++) g.fillRect(x - w / 2 + 6 + c * (w - 12) / 3, -h + 8 + r * (h - 16) / rows, (w - 24) / 3, Math.max(2, (h - 16) / rows * 0.5)); }
  function peak(g, x, h) { const w = h * 1.7; g.fillStyle = '#6E7C91'; g.beginPath(); g.moveTo(x - w / 2, 0); g.lineTo(x, -h); g.lineTo(x + w / 2, 0); g.closePath(); g.fill(); g.fillStyle = '#F2F6FA'; g.beginPath(); g.moveTo(x - w * 0.11, -h * 0.78); g.lineTo(x, -h); g.lineTo(x + w * 0.11, -h * 0.78); g.lineTo(x + w * 0.04, -h * 0.72); g.lineTo(x - w * 0.03, -h * 0.76); g.closePath(); g.fill(); }
  function cloud(g, x, y) { g.fillStyle = 'rgba(255,255,255,.95)'; [[-34, 6, 26], [-8, -8, 32], [24, 0, 28], [46, 8, 20], [0, 10, 30]].forEach(([dx, dy, r]) => { g.beginPath(); g.arc(x + dx, y + dy, r, 0, 7); g.fill(); }); }
  function jet(g, x, y) { g.save(); g.translate(x, y); g.fillStyle = '#F5F3EE'; rr(g, -48, -9, 96, 18, 9); g.fill(); g.beginPath(); g.moveTo(-6, 0); g.lineTo(-30, -34); g.lineTo(-16, -34); g.lineTo(18, 0); g.fill(); g.beginPath(); g.moveTo(-6, 0); g.lineTo(-30, 34); g.lineTo(-16, 34); g.lineTo(18, 0); g.fill(); g.fillStyle = '#E5534B'; g.fillRect(36, -9, 12, 8); g.restore(); }
  function iss(g, x, y) { g.save(); g.translate(x, y); g.fillStyle = '#D8D3C7'; rr(g, -16, -10, 32, 20, 4); g.fill(); g.fillStyle = '#3E78C4'; for (const sx of [-1, 1]) { g.fillRect(sx * 22 - (sx < 0 ? 38 : 0), -22, 38, 18); g.fillRect(sx * 22 - (sx < 0 ? 38 : 0), 4, 38, 18); } g.restore(); }
  function moonArt(g, x, y, r) { const gr = g.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r); gr.addColorStop(0, '#F4F1E6'); gr.addColorStop(1, '#B9B6A6'); g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); g.fillStyle = 'rgba(120,118,104,.35)'; [[-0.3, -0.2, 0.22], [0.3, 0.1, 0.16], [-0.05, 0.4, 0.14], [0.1, -0.45, 0.1]].forEach(([a, b, c]) => { g.beginPath(); g.arc(x + a * r, y + b * r, c * r, 0, 7); g.fill(); }); }
  function earthArt(g, x, y, r) { const gr = g.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r); gr.addColorStop(0, '#6FC1F0'); gr.addColorStop(1, '#1F63B5'); g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); g.fillStyle = '#4C9A4F'; [[-0.3, -0.2, 0.3], [0.35, 0.25, 0.26], [0.05, 0.5, 0.15]].forEach(([a, b, c]) => { g.beginPath(); g.ellipse(x + a * r, y + b * r, c * r, c * r * 0.7, 0.5, 0, 7); g.fill(); }); }
  const LM = [
    { a: 1.7, k: 'stand', f: person, x: 420, lab: 'YOU · 1.7 m' }, { a: 8, k: 'stand', f: house, x: 250, lab: 'HOUSE · 8 m' }, { a: 400, k: 'stand', f: sky, x: 800, lab: 'SKYSCRAPER · 400 m' },
    { a: 2000, k: 'float', f: cloud, x: 230, lab: 'CLOUDS · 2,000 m' }, { a: 8849, k: 'stand', f: peak, x: 790, lab: 'EVEREST · 8,849 m' }, { a: 10000, k: 'float', f: jet, x: 260, lab: 'AIRLINERS · 10 km' },
    { a: 1e5, k: 'line', lab: 'EDGE OF SPACE · 100 km' }, { a: 4.2e5, k: 'float', f: iss, x: 800, lab: 'SPACE STATION · ~400 km' },
  ];
  // ---------- the tower: auto-zoom world. penny tower or bill tower, N from the track ----------
  function tower(g, p, lt, t, th, S) {
    const bill = S.kind === 'bill', thick = bill ? BIL : PEN, N = Math.max(1, trk(p.P, t)), h = N * thick, cp = bill ? 8 : 24, pxT = Math.min(cp, HH / N), towerPx = N * pxT, ppm = pxT / thick;
    const lh = Math.log10(Math.max(h, 1e-3)), u = clamp((lh - 3.3) / 1.9), mix = (a, b, k) => { const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16); const c = i => Math.round(lerp((pa >> i) & 255, (pb >> i) & 255, k)); return 'rgb(' + c(16) + ',' + c(8) + ',' + c(0) + ')'; };
    g.save(); rr(g, px0, py0, pw, ph, 28); g.clip();
    const bg = g.createLinearGradient(0, py0, 0, py0 + ph); bg.addColorStop(0, mix('#4FA8E8', '#03050c', u)); bg.addColorStop(1, mix('#BFE6FA', '#0e1838', u)); g.fillStyle = bg; g.fillRect(px0, py0, pw, ph);
    if (u > 0.05) { for (let i = 0; i < 70; i++) { g.fillStyle = 'rgba(255,255,255,' + (u * (0.3 + 0.6 * hash(i * 5.1))) + ')'; g.beginPath(); g.arc(px0 + hash(i * 1.7) * pw, py0 + hash(i * 9.3) * (ph - 40), 0.8 + 1.4 * hash(i * 3.3), 0, 7); g.fill(); } }
    // ground (flat -> curved Earth)
    const R = lerp(5000, 560, u); g.fillStyle = mix('#4C9A4F', '#1F63B5', u * 0.8); g.beginPath(); g.arc(CX, gy + R, R, 0, 7); g.fill(); g.fillStyle = mix('#3C7E40', '#174C8E', u * 0.8); g.fillRect(px0, gy + 8 + 24 * (1 - u), pw, 200);
    g.save(); g.translate(0, gy);
    // landmarks
    if (!S.noLM) for (const L of LM) {
      const hp = L.a * ppm, yy = -hp; let al;
      if (L.k === 'stand') { if (hp < 14 || hp > 1.3 * HH) continue; al = clamp((1.3 * HH - hp) / (0.3 * HH)); } else { if (hp < 40 || hp > HH + 10) continue; al = clamp((HH + 10 - hp) / 40) * clamp((hp - 40) / 30); }
      g.save(); g.globalAlpha *= al;
      if (L.k === 'stand') L.f(g, L.x, hp); else if (L.k === 'float') L.f(g, L.x, yy); else { g.strokeStyle = 'rgba(255,255,255,.7)'; g.lineWidth = 3; g.setLineDash([14, 10]); g.beginPath(); g.moveTo(px0, yy); g.lineTo(px0 + pw, yy); g.stroke(); g.setLineDash([]); }
      const lx = L.k === 'line' ? px0 + 24 : L.x - 60, ly = Math.max(topY - 22 - gy + 14, L.k === 'stand' ? yy - 16 : yy - (L.k === 'line' ? 18 : 38)); const f = F.monoX(21), w = mw(L.lab, f) + 22; g.fillStyle = 'rgba(6,8,11,.78)'; rr(g, lx - 6, ly - 15, w, 30, 15); g.fill(); txt(g, L.lab, lx + 5, ly + 1, f, '#F5F3EE', 'left'); g.restore();
    }
    // moon
    if (h > 3e6 && !S.noLM) { const my = Math.max(topY - gy + 40, -MOON * ppm), a = clamp((lh - 6.4) / 1.2); g.save(); g.globalAlpha *= a; moonArt(g, 800, my, 40); const f = F.monoX(22), lab = 'THE MOON'; g.fillStyle = 'rgba(6,8,11,.78)'; rr(g, 628, my - 14, mw(lab, f) + 24, 30, 15); g.fill(); txt(g, lab, 640, my + 1, f, '#F5F3EE', 'left'); g.restore(); }
    // the tower
    const landed = S.drop == null ? 0 : S.drop + 0.35;
    if (t >= landed) {
      const dpx = bill ? clamp(1430 * pxT, 9, 360) : Math.max(7, 12.53 * pxT);
      if (pxT >= 3) { const n = Math.ceil(N); for (let i = 0; i < n; i++) { const y = -(i + 1) * pxT; g.fillStyle = bill ? (i % 2 ? '#2FA46B' : '#27935E') : COPPER[i % 2]; rr(g, CX - dpx / 2, y + 1, dpx, pxT - 1.5, Math.min(5, pxT / 3)); g.fill(); g.fillStyle = bill ? 'rgba(255,255,255,.28)' : 'rgba(255,225,190,.5)'; g.fillRect(CX - dpx / 2 + 4, y + 2, dpx - 8, 2); } }
      else { const gr = g.createLinearGradient(CX - dpx / 2, 0, CX + dpx / 2, 0); gr.addColorStop(0, bill ? '#1d7a4c' : '#8E4A22'); gr.addColorStop(0.45, bill ? '#5BD08E' : '#E9A06A'); gr.addColorStop(1, bill ? '#1d7a4c' : '#8E4A22'); g.fillStyle = gr; g.fillRect(CX - dpx / 2, -towerPx, dpx, towerPx); g.fillStyle = 'rgba(0,0,0,.22)'; const off = (t * 40) % 6; for (let y = -towerPx + off; y < 0; y += 6) g.fillRect(CX - dpx / 2, y, dpx, 1.4); }
      // top pointer
      const ty = -towerPx - 12 - 4 * Math.sin(t * 6); g.fillStyle = th.accent; g.beginPath(); g.moveTo(CX - 11, ty - 14); g.lineTo(CX + 11, ty - 14); g.lineTo(CX, ty + 4); g.closePath(); g.fill();
    }
    // the first penny drop
    if (S.drop != null && t >= S.drop && t < landed) { const k = (t - S.drop) / 0.35, y = lerp(-HH - 20, -12, ease.in(k)), ry = 1 - 0.93 * ease.in(clamp((k - 0.55) / 0.45)); g.save(); g.translate(CX, y); g.scale(1, ry); g.rotate(k * 0.3); pennyFace(g, 60); g.restore(); }
    g.restore();
    label(g, 'AUTO-ZOOM · NOT TO SCALE', px0 + pw - 24, py0 + ph - 18, 'rgba(245,243,238,.85)', 17, 'right');
    if (S.dim) { const d = S.dim * (1 - lin(t, S.dimOut, S.dimOut + 0.25)); if (d > 0) { g.fillStyle = 'rgba(6,8,11,' + d + ')'; g.fillRect(px0, py0, pw, ph); } }
    g.restore(); g.strokeStyle = 'rgba(245,243,238,.35)'; g.lineWidth = 3; rr(g, px0, py0, pw, ph, 28); g.stroke();
    mchip(g, p, t, th, S, 1010);
  }
  // penny anatomy: face + edge-on slab, thickness callout
  function penny(g, p, lt, t, th, S) {
    const k = Math.min(1.06, spring(lt, 'bouncy')), sc = 22; g.save(); g.translate(300, 835); g.scale(0.7 + 0.3 * k, 0.7 + 0.3 * k); pennyFace(g, 130); g.restore();
    const ek = clamp((t - S.edge) / 0.35); if (ek > 0) { const w = 19.05 * sc * 0.76, hh = 1.52 * sc * 1.3 * 1.0; const e = Math.min(1.08, spring(t - S.edge, 'bouncy')); g.save(); g.translate(745, 835); g.scale(0.8 + 0.2 * e, 0.8 + 0.2 * e); g.globalAlpha *= clamp(ek * 2);
      const th2 = 1.52 * sc * 1.2, dw = 19.05 * sc * 0.82; g.fillStyle = '#7a3d18'; rr(g, -dw / 2, -th2 / 2 + 6, dw, th2, 5); g.fill(); const gr = g.createLinearGradient(0, -th2 / 2, 0, th2 / 2); gr.addColorStop(0, '#F0A56F'); gr.addColorStop(1, '#B9622E'); g.fillStyle = gr; rr(g, -dw / 2, -th2 / 2, dw, th2, 5); g.fill(); g.strokeStyle = 'rgba(90,40,12,.7)'; g.lineWidth = 2; for (let i = 0; i < 40; i++) { const x = -dw / 2 + 8 + i * (dw - 16) / 39; g.beginPath(); g.moveTo(x, -th2 / 2 + 4); g.lineTo(x, th2 / 2 - 4); g.stroke(); }
      // thickness bracket
      g.strokeStyle = th.accent; g.lineWidth = 4; g.beginPath(); g.moveTo(dw / 2 + 24, -th2 / 2); g.lineTo(dw / 2 + 24, th2 / 2); g.moveTo(dw / 2 + 12, -th2 / 2); g.lineTo(dw / 2 + 36, -th2 / 2); g.moveTo(dw / 2 + 12, th2 / 2); g.lineTo(dw / 2 + 36, th2 / 2); g.stroke();
      g.beginPath(); g.moveTo(-dw / 2, th2 / 2 + 36); g.lineTo(dw / 2, th2 / 2 + 36); g.moveTo(-dw / 2, th2 / 2 + 26); g.lineTo(-dw / 2, th2 / 2 + 46); g.moveTo(dw / 2, th2 / 2 + 26); g.lineTo(dw / 2, th2 / 2 + 46); g.stroke(); label(g, '19.05 mm WIDE', 0, th2 / 2 + 74, th.paper, 26); g.restore();
      const bk = spring(t - S.edge - 0.15, 'bouncy'); g.save(); g.translate(745, 720); g.scale(0.8 + 0.2 * Math.min(1.1, bk), 0.8 + 0.2 * Math.min(1.1, bk)); g.globalAlpha *= clamp(bk * 2); stk(g, '1.52 mm', 0, 0, F.hero(124), th.accent, 'center', 16); g.restore(); label(g, 'THICK · EDGE-ON VIEW', 745, 790, th.paper, 24); }
    mchip(g, p, t, th, S, 1030);
  }
  // Earth -> Moon: distance, or the "perfectly straight" tower
  function moon(g, p, lt, t, th, S) {
    const ex = 170, mx = 890, y = S.y || 880; earthArt(g, ex, y, 88); moonArt(g, mx, y, 40);
    const x0 = ex + 88, x1 = mx - 40, d = ease.out(clamp((t - S.at) / 0.9));
    if (S.mode === 'dist') {
      g.strokeStyle = th.accent; g.lineWidth = 5; g.setLineDash([16, 12]); g.lineDashOffset = -t * 30; g.beginPath(); g.moveTo(x0, y); g.lineTo(lerp(x0, x1, d), y); g.stroke(); g.setLineDash([]);
      if (d > 0.98) { for (const [a, b] of [[x0, 1], [x1, -1]]) { g.fillStyle = th.accent; g.beginPath(); g.moveTo(a, y); g.lineTo(a + 22 * b, y - 12); g.lineTo(a + 22 * b, y + 12); g.fill(); } }
      const nk = Math.min(1.08, spring(t - S.at, 'bouncy')); g.save(); g.translate(540, 740); g.scale(0.8 + 0.2 * nk, 0.8 + 0.2 * nk); const v = Math.round(239000 * ease.out(clamp((t - S.at) / (S.dur || 1.2))) / 1000) * 1000; stk(g, fmt(v) + ' MILES', 0, 0, F.hero(fit('239,000 MILES', F.hero, 880, 130)), th.paper, 'center', 16); g.restore();
      label(g, 'ABOUT · 384,400 km AVERAGE', 540, 988, th.paper, 26); label(g, 'NOT TO SCALE', 540, 1030, 'rgba(245,243,238,.7)', 20);
    } else {
      const wob = (1 - ease.out(clamp((t - S.at - 0.2) / (S.lock || 1.4)))) * 38 * Math.sin(t * 9); const cy = y - 6 + wob * 0.0;
      g.lineCap = 'round'; for (let i = 0; i < 36; i++) { const u0 = i / 36, u1 = (i + 1) / 36; if (u1 > d) break; const xa = lerp(x0, x1, u0), xb = lerp(x0, x1, u1), ya = cy - Math.sin(u0 * Math.PI) * wob, yb = cy - Math.sin(u1 * Math.PI) * wob; g.strokeStyle = i % 2 ? '#C77B45' : '#E39A62'; g.lineWidth = 16; g.beginPath(); g.moveTo(xa, ya); g.lineTo(xb + 1, yb); g.stroke(); }
      const lk = clamp((t - S.at - (S.lock || 1.4)) / 0.4); if (lk > 0) { g.save(); g.globalAlpha *= lk; g.strokeStyle = th.good; g.lineWidth = 3; g.setLineDash([8, 8]); g.beginPath(); g.moveTo(x0 - 20, cy); g.lineTo(x1 + 20, cy); g.stroke(); g.setLineDash([]); g.restore(); }
      stk(g, 'PERFECTLY STRAIGHT', 540, 735, F.hero(fit('PERFECTLY STRAIGHT', F.hero, 880, 84)), th.paper, 'center', 14);
      if (S.never && t >= S.never) { const nk = spring(t - S.never, 'bouncy'); stamp(g, S.neverText || 'NEVER FALLS', 540, 1000, 'good', th, 60, -0.04, nk); }
    }
    mchip(g, p, t, th, S, 1050);
  }
  function hundred(g, p, lt, t, th, S) {
    const mg = clamp((t - S.merge) / 0.7), me = ease.inOut(mg);
    for (let i = 0; i < 100; i++) { const on = t - (S.at + i * 0.012); if (on <= 0) continue; const c = i % 10, r = Math.floor(i / 10), x = 540 + (c - 4.5) * 46, y = 700 + r * 40, k = Math.min(1.1, spring(on, 'snappy')), X = lerp(x, 540, me), Y = lerp(y, 840, me), s = (1 - me * 0.8) * k; if (me > 0.98) continue; g.save(); g.translate(X, Y); g.scale(s, s * 0.9); g.globalAlpha *= clamp(on / 0.05); coinFlat(g, 19); g.restore(); }
    if (mg > 0.25) { const k = Math.min(1.1, spring(t - S.merge - 0.25, 'bouncy')); g.save(); g.translate(540, 840); g.scale(k, k); billArt(g, -230, -100, 460, 200, '$1'); g.restore(); }
    if (t > S.at + 0.3 && mg < 1) label(g, '100 PENNIES', 540, 1010 - 0 * mg, th.paper, 28);
    mchip(g, p, t, th, S, 1050);
  }
  function coinFlat(g, r) { const gr = g.createRadialGradient(-r * 0.3, -r * 0.3, 1, 0, 0, r); gr.addColorStop(0, '#F0A56F'); gr.addColorStop(1, '#B9622E'); g.fillStyle = gr; g.beginPath(); g.arc(0, 0, r, 0, 7); g.fill(); g.strokeStyle = 'rgba(90,40,12,.8)'; g.lineWidth = 2; g.beginPath(); g.arc(0, 0, r * 0.75, 0, 7); g.stroke(); }
  function bignum(g, p, lt, t, th, S) {
    const u = ease.out(clamp((t - S.at) / S.dur)), v = S.num * u, k = Math.min(1.08, spring(lt, 'bouncy')), s = (S.pre || '') + v.toFixed(S.dec || 0), big = (S.pre || '') + S.num.toFixed(S.dec || 0);
    g.save(); g.translate(540, 770); g.scale(0.85 + 0.15 * k, 0.85 + 0.15 * k); stk(g, s, 0, 0, F.hero(fit(big, F.hero, 880, 250)), S.col || th.good, 'center', 20); g.restore();
    if (S.word) { const wk = spring(t - S.at - S.dur * 0.7, 'bouncy'), w = S.word; g.save(); g.globalAlpha *= clamp(wk * 2); g.translate(540, 920); g.scale(0.8 + 0.2 * Math.min(1.08, wk), 0.8 + 0.2 * Math.min(1.08, wk)); stk(g, w, 0, 0, F.hero(fit(w, F.hero, 880, 130)), th.paper, 'center', 14); g.restore(); }
    if (S.l1) stk(g, S.l1, 540, 1020, F.hero(fit(S.l1, F.hero, 860, 56)), th.accent, 'center', 10);
    mchip(g, p, t, th, S, 1050);
  }
  // two bars on a true scale: record jackpot vs the penny tower
  function jackpot(g, p, lt, t, th, S) {
    const base = 1005, mx = 300, hT = mx, hJ = mx * JACK / COSTP, gk = ease.out(clamp((t - S.at) / 0.9));
    paper(g, 150, base - 6, 780, 10, 4, { lift: 0.1 });
    const bar = (x, w, h, col, top, val, name, tcol, k) => { const hh = h * k; g.save(); clay(g, x, base - hh, w, hh, 16, col, { shadowK: 0.6 }); g.restore(); if (k > 0.3) { stk(g, val, x + w / 2, base - hh - 38, F.hero(66), tcol, 'center', 12); } label(g, name, x + w / 2, base + 34, th.paper, 22); };
    bar(230, 240, hJ, th.gold, 0, '$2.04B', 'RECORD JACKPOT', th.gold, gk);
    if (t > S.at + 0.5) { const jk = ease.out(clamp((t - S.at - 0.5) / 0.9)); bar(610, 240, hT, '#C77B45', 0, '$2.53B', 'PENNY TOWER', '#F0A56F', jk); }
    // ticket icon on the jackpot bar
    const tk = Math.min(1.1, spring(t - S.at, 'bouncy')); g.save(); g.translate(350, base - hJ * gk - 150); g.scale(tk, tk); g.rotate(-0.08); clay(g, -90, -42, 180, 84, 12, '#F5F3EE', { shadowK: 0.5 }); g.fillStyle = th.gold; g.fillRect(-90, -42, 180, 24); txt(g, 'JACKPOT', 0, -30, F.monoX(18), '#0B0F14'); txt(g, '$2.04B', 0, 12, F.hero(40), '#0B0F14'); g.restore();
    if (S.pct && t >= S.pct) { const k = spring(t - S.pct, 'bouncy'), y = base - hJ; g.save(); g.globalAlpha *= clamp(k * 2); g.strokeStyle = th.accent; g.lineWidth = 4; g.setLineDash([10, 8]); g.beginPath(); g.moveTo(470, y); g.lineTo(850, y); g.stroke(); g.setLineDash([]); g.restore(); chip(g, '81% OF THE WAY THERE', 540, S.pctY || 700, 'accent', th, 44, 900, k); }
    mchip(g, p, t, th, S, 1058);
  }
  // 17,252 record jackpots as a dot field
  function jackpots(g, p, lt, t, th, S) {
    const n = 17252, cols = 211, pitch = 4.45, x0 = 540 - cols * pitch / 2, y0 = 760, rows = Math.ceil(n / cols), sw = clamp((t - S.at) / S.dur);
    const v = Math.round(n * ease.out(sw)); stk(g, fmt(v), 540, 668, F.hero(120), th.gold, 'center', 16); label(g, 'RECORD JACKPOTS · $2.04B EACH', 540, 722, th.paper, 24);
    const cnt = Math.floor(n * ease.out(sw)); g.fillStyle = th.gold; for (let i = 0; i < cnt; i++) { const c = i % cols, r = Math.floor(i / cols); g.fillRect(x0 + c * pitch, y0 + r * pitch, 3.2, 3.2); }
    g.fillStyle = th.paper; g.fillRect(x0, y0, 3.2, 3.2); if (t > S.at + 0.2) { const k = spring(t - S.at - 0.2, 'bouncy'); g.save(); g.globalAlpha *= clamp(k * 2); g.strokeStyle = th.paper; g.lineWidth = 3; g.beginPath(); g.arc(x0 + 1.6, y0 + 1.6, 12, 0, 7); g.stroke(); g.restore(); label(g, '← ONE JACKPOT', x0 + 26, y0 + 2, th.paper, 20, 'left'); }
    label(g, '= $35.2 TRILLION IN $1 BILLS', 540, y0 + rows * pitch + 46, th.good, 26);
    mchip(g, p, t, th, S, 1058);
  }
  // 1 penny vs 14 dollar bills: same height
  function swap(g, p, lt, t, th, S) {
    const sc = 50, base = 960, tp = PEN * 1000 * sc, tb = BIL * 1000 * sc, k1 = Math.min(1.08, spring(lt, 'bouncy'));
    stk(g, 'SAME HEIGHT', 540, 690, F.hero(76), th.paper, 'center', 12);
    g.save(); g.translate(0, 0); g.globalAlpha *= clamp(k1 * 2); const lx = 330; g.fillStyle = '#7a3d18'; rr(g, lx - 150, base - tp + 6, 300, tp, 6); g.fill(); const gr = g.createLinearGradient(0, base - tp, 0, base); gr.addColorStop(0, '#F0A56F'); gr.addColorStop(1, '#B9622E'); g.fillStyle = gr; rr(g, lx - 150, base - tp, 300, tp, 6); g.fill(); g.restore();
    label(g, '1 PENNY', lx, base + 52, th.paper, 28); label(g, '1.52 mm', lx, base + 90, '#F0A56F', 28);
    const st = S.at; for (let i = 0; i < 14; i++) { const on = t - (st + i * 0.12); if (on <= 0) continue; const k = Math.min(1, spring(on, 'snappy')); const y = base - (i + 1) * tb - (1 - k) * 60; g.save(); g.globalAlpha *= clamp(on / 0.05); g.fillStyle = i % 2 ? '#2FA46B' : '#27935E'; rr(g, 750 - 150, y, 300, tb - 0.8, 2); g.fill(); g.fillStyle = 'rgba(255,255,255,.3)'; g.fillRect(750 - 148, y, 296, 1.2); g.restore(); }
    label(g, '14 DOLLAR BILLS', 750, base + 52, th.paper, 28); label(g, '0.109 mm EACH', 750, base + 90, th.good, 28);
    g.strokeStyle = th.accent; g.lineWidth = 3; g.setLineDash([10, 8]); g.beginPath(); g.moveTo(150, base - tp); g.lineTo(930, base - tp); g.stroke(); g.setLineDash([]);
    if (S.eq && t >= S.eq) { const k = Math.min(1.1, spring(t - S.eq, 'bouncy')); g.save(); g.translate(540, base - tp - 120); g.scale(k, k); g.fillStyle = '#0B0F14'; g.beginPath(); g.arc(0, 0, 40, 0, 7); g.fill(); g.strokeStyle = th.accent; g.lineWidth = 5; g.stroke(); txt(g, '≈', 0, 3, F.hero(64), th.accent); g.restore(); }
    mchip(g, p, t, th, S, 1050);
  }
  // the penny tower split across everyone: 31 pennies each
  function people(g, p, lt, t, th, S) {
    const n = S.n || 31, cnt = Math.min(n, Math.floor(Math.max(0, t - S.at) / (S.per || 0.05)));
    earthArt(g, 200, 770, 70); label(g, '8.2 BILLION PEOPLE', 200, 870, th.paper, 22); label(g, '÷ 253 BILLION PENNIES', 200, 905, 'rgba(245,243,238,.8)', 18);
    for (let i = 0; i < cnt; i++) { const c = i % 8, r = Math.floor(i / 8), on = t - (S.at + i * (S.per || 0.05)), k = Math.min(1.1, spring(on, 'snappy')); g.save(); g.translate(430 + c * 66, 700 + r * 66); g.scale(k, k * 0.9); coinFlat(g, 27); g.restore(); }
    const vk = Math.min(1.1, spring(t - S.at - 0.1, 'bouncy')); const big = S.big || '31 PENNIES EACH'; g.save(); g.translate(600, 1005); g.scale(0.8 + 0.2 * vk, 0.8 + 0.2 * vk); stk(g, big, 0, 0, F.hero(fit(big, F.hero, 700, 92)), th.accent, 'center', 14); g.restore();
    mchip(g, p, t, th, S, 1058);
  }
  function weight(g, p, lt, t, th, S) {
    const u = ease.out(clamp((t - S.at) / S.dur)), v = Math.round(630000 * u), k = Math.min(1.08, spring(lt, 'bouncy'));
    g.save(); g.translate(540, 700); g.scale(0.85 + 0.15 * k, 0.85 + 0.15 * k); stk(g, fmt(v), 0, 0, F.hero(190), th.bad, 'center', 18); g.restore(); sticker(g, 'TONS', 540, 840, th.paper, 120, 'center', 14);
    g.save(); g.translate(540, 975); g.fillStyle = '#7B8696'; g.beginPath(); g.moveTo(-90, 30); g.lineTo(-60, -40); g.lineTo(60, -40); g.lineTo(90, 30); g.closePath(); g.fill(); g.strokeStyle = '#0B0F14'; g.lineWidth = 4; g.stroke(); g.beginPath(); g.arc(0, -52, 16, 3.14, 6.28); g.stroke(); txt(g, 'TON', 0, -4, F.hero(34), '#0B0F14'); g.restore();
    label(g, 'ABOUT 1.4 BILLION POUNDS · 2.5 g PER PENNY', 540, 1050, th.paper, 22); mchip(g, p, t, th, S, 1050);
  }
  // pennies sliver vs bills
  function versus(g, p, lt, t, th, S) {
    const base = 1000, mx = 280, k = ease.out(clamp((t - S.at) / 0.9));
    g.fillStyle = 'rgba(245,243,238,.35)'; g.fillRect(180, base, 720, 4);
    clay(g, 220, base - mx * k, 250, mx * k, 16, bills, { shadowK: 0.6 }); if (k > 0.5) { stk(g, '$35.2T', 345, base - mx * k - 40, F.hero(66), th.good, 'center', 12); } label(g, 'DOLLAR-BILL TOWER', 345, base + 36, th.paper, 22);
    const pk = ease.out(clamp((t - S.at - 0.6) / 0.6)); g.save(); g.globalAlpha *= pk; g.fillStyle = '#C77B45'; g.fillRect(610, base - 4, 250, 4); g.restore(); if (pk > 0) { g.save(); g.globalAlpha *= pk; stk(g, '$2.53B', 735, base - 100, F.hero(66), '#F0A56F', 'center', 12); g.strokeStyle = '#F0A56F'; g.lineWidth = 4; g.beginPath(); g.moveTo(735, base - 62); g.lineTo(735, base - 12); g.stroke(); g.beginPath(); g.moveTo(725, base - 24); g.lineTo(735, base - 10); g.lineTo(745, base - 24); g.stroke(); g.restore(); label(g, 'PENNY TOWER', 735, base + 36, th.paper, 22); }
    if (S.ratio && t >= S.ratio) { const rk = spring(t - S.ratio, 'bouncy'); chip(g, 'PENNIES: ~14,000× CHEAPER', 540, 690, 'accent', th, 46, 900, rk); }
    mchip(g, p, t, th, S, 1058);
  }
  function ask(g, p, lt, t, th, S) { const k = spring(lt, 'bouncy'); g.save(); g.translate(540, 800); g.scale(0.7 + 0.3 * Math.min(1.06, k), 0.7 + 0.3 * Math.min(1.06, k)); g.globalAlpha *= clamp(k * 2); const sz = Math.min(fit(S.l1, F.hero, 900, 112), fit(S.l2, F.hero, 900, 112)); stk(g, S.l1, 0, -62, F.hero(sz), th.accent, 'center', 16); stk(g, S.l2, 0, 62, F.hero(sz), th.good, 'center', 16); g.restore(); }
  const SC = { tower, penny, moon, hundred, bignum, jackpot, jackpots, swap, people, weight, versus, ask };
  Object.assign(window.PM.h, { fit, stk, chip, stamp, label, mw, TONE, fmt: fmt });
  B.register('pstage', {
    defaults: { P: [[0, 1]], C: [], scenes: [], hook: null, beats: [], notes: [] }, ownEnter: true, size: () => [1080, 1920],
    draw(g, p, env) {
      const { t, theme: th } = env; g.translate(-540, -960);
      let bl = ''; for (const b of p.beats) if (t >= b[0]) bl = b[1]; if (bl) { const k = spring(t - (p.beats.find(b => b[1] === bl)[0]), 'snappy'); g.save(); g.globalAlpha *= clamp(k * 2); label(g, bl, 990, 264, th.accent, 26, 'right'); g.restore(); }
      let seg = p.C[0]; for (const s of p.C) if (t >= s.from) seg = s; const segT = t - seg.from, pop = 1 + 0.05 * hit(Math.min(0.5, Math.max(0, segT)), 8);
      if (seg.mode !== 'off') {
        g.save(); g.translate(540, 437); g.scale(pop, pop); g.translate(-540, -437); paper(g, 70, 322, 940, 230, 26, { lift: 0.3 });
        let L, R, C3, fr; const m = seg.mode;
        if (m === 'pen' || m === 'bill') { const N = Math.max(1, trk(p.P, t)), b = m === 'bill'; L = ['HEIGHT', fHeight(N * (b ? BIL : PEN))]; R = [b ? 'DOLLAR BILLS' : 'PENNIES', fCount(N)]; C3 = [b ? 'TOTAL COST' : 'TOTAL COST', fCost(b ? N : N / 100)]; fr = Math.log10(N) / Math.log10(b ? NBILL : NMOON); }
        else { L = seg.L; R = seg.R; C3 = seg.C3; fr = seg.fr == null ? 1 : seg.fr; }
        g.fillStyle = 'rgba(11,15,20,.14)'; rr(g, 98, 456, 884, 18, 9); g.fill(); const fw = clamp(fr) * 884; if (fw > 4) { g.fillStyle = m === 'bill' ? th.good : th.gold; rr(g, 98, 456, Math.max(18, fw), 18, 9); g.fill(); }
        label(g, L[0], 100, 354, th.inkSoft, 26, 'left'); label(g, R[0], 980, 354, th.inkSoft, 26, 'right');
        const sL = fit(L[1], F.hero, 420, 92, 36), sR = fit(R[1], F.hero, 440, 92, 36);
        txt(g, L[1], 100, 418, F.hero(sL), th.ink, 'left'); txt(g, R[1], 980, 418, F.hero(sR), th.ink, 'right');
        if (C3) { label(g, C3[0], 100, 516, th.inkSoft, 24, 'left'); txt(g, C3[1], 980, 516, F.hero(fit(C3[1], F.hero, 600, 50, 30)), m === 'bill' ? '#118a4e' : th.ink, 'right'); }
        g.restore();
      }
      hookText(g, p, t, th);
      for (const S of p.scenes) {
        if (t < S.from - 0.02 || t > S.to + 0.02) continue; const lt = t - S.from, kin = spring(lt + 0.08, { f: 2.4, z: 0.7 }), a = clamp(lt / 0.12) * (1 - lin(t, S.to - 0.12, S.to)), sc = (S.pop === false ? 1 : 0.94 + 0.06 * Math.min(1.05, kin));
        g.save(); g.globalAlpha *= a; g.translate(540, 840 + (S.dy || 0)); g.scale(sc * (S.sc || 1), sc * (S.sc || 1)); g.translate(-540, -840);
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
