  // ===== THE FAKE DIARIES — Decoded crime-show stage. NO portraits of the dictator, NO symbols: the "diaries" are plain black notebooks; the tell is the wrong initials on the cover (F H, should be A H). Neutral tone. =====
  // Facts (beats-v3 + research): Kujau (Stuttgart memorabilia dealer) wrote the notebooks, sold under a fake name via a middleman; Stern reporter Gerd Heidemann believed them; ~9 million marks; Heidemann secretly kept a chunk; April 1983 announcement; plastic letters F H instead of A H; national archives: modern paper and ink; crude forgery < 2 weeks; Hamburg 1985: ~4.5 years each.
  const PK = 'brand/photos/konrad-kujau/3.jpg', CROPK = { crop: [0, 0, 0.5, 0.78], fx: 0.5, fy: 0.36 };
  const cst = (g, th, t, o) => B.crimeStamp(g, th, t, o);
  function face(g, x, y, w, h, zoom = 1, mono = false) { g.save(); rr(g, x, y, w, h, 8); g.clip(); B.drawPhoto(g, B.images[PK], x, y, w, h, { ...CROPK, zoom }); if (mono) { g.globalCompositeOperation = 'saturation'; g.fillStyle = '#808080'; g.fillRect(x, y, w, h); g.globalCompositeOperation = 'source-over'; } g.restore(); g.strokeStyle = 'rgba(11,15,20,.45)'; g.lineWidth = 3; rr(g, x, y, w, h, 8); g.stroke(); }
  const pk = (t, at, o = 'bouncy') => Math.min(1.1, spring(t - at, o));
  const sub = (g, s, x, y, col, size = 24, al = 'center') => txt(g, s, x, y, F.monoX(size), col, al);
  const bottomChip = (g, S, t, th) => { let ch = null; for (const c of (S.chips || (S.chip ? [S.chip] : []))) if (t >= c.at) ch = c; if (ch && !(S.chipOut && t >= S.chipOut)) chip(g, ch.text, 540, ch.y || 1062, ch.tone || 'ink', th, ch.size || 38, 900, spring(t - ch.at, 'bouncy')); };
  const pop0 = (g, t, at, y0 = 70, base = 0.88) => { const k = pk(t, at); g.translate(0, (1 - Math.min(1, k)) * y0); g.scale(base + (1 - base) * k, base + (1 - base) * k); g.globalAlpha *= clamp((t - at) / 0.08); return k; };
  const billD = (g, x, y, w, h, lab = 'DM') => { clay(g, x, y, w, h, 8, '#3F8F6B', { shadowK: 0.4 }); g.strokeStyle = 'rgba(245,243,238,.7)'; g.lineWidth = 3; rr(g, x + 7, y + 7, w - 14, h - 14, 5); g.stroke(); g.fillStyle = 'rgba(245,243,238,.9)'; g.beginPath(); g.arc(x + w / 2, y + h / 2, h * 0.28, 0, 7); g.fill(); txt(g, lab, x + w / 2, y + h / 2 + 2, F.hero(h * 0.26), '#0B0F14'); };
  // ---------- a plain black notebook (no symbols). letters: ['F','H'] gold plastic tiles ----------
  function notebook(g, x, y, w, h, rot, th, o = {}) {
    g.save(); g.translate(x, y); g.rotate(rot); B.shadowed(g, () => rr(g, -w / 2, -h / 2, w, h, 14), '#14171d', 0.5);
    const gr = g.createLinearGradient(-w / 2, 0, w / 2, 0); gr.addColorStop(0, '#0e1013'); gr.addColorStop(0.08, '#262a31'); gr.addColorStop(0.5, '#1a1d22'); gr.addColorStop(1, '#101216'); g.fillStyle = gr; rr(g, -w / 2, -h / 2, w, h, 14); g.fill();
    g.fillStyle = '#07080a'; g.fillRect(-w / 2, -h / 2, w * 0.07, h); g.strokeStyle = 'rgba(255,255,255,.08)'; g.lineWidth = 3; rr(g, -w / 2 + 6, -h / 2 + 6, w - 12, h - 12, 10); g.stroke();
    g.fillStyle = '#7a1b1b'; g.fillRect(w * 0.34, -h / 2, w * 0.05, h); // elastic band
    if (o.letters) { const n = o.letters.length, tw = w * 0.22, th2 = tw * 1.2; o.letters.forEach((ch, i) => { const at = (o.lAt ?? 0) + i * 0.25, k = o.t == null ? 1 : Math.min(1.1, spring(o.t - at, 'bouncy')); if (o.t != null && o.t < at) return; const lx = (i - (n - 1) / 2) * (tw * 1.25) - w * 0.04, ly = h * 0.22; g.save(); g.translate(lx, ly - (1 - Math.min(1, k)) * -60); g.scale(0.7 + 0.3 * Math.min(1.1, k), 0.7 + 0.3 * Math.min(1.1, k)); g.globalAlpha *= clamp(((o.t ?? 1e9) - at) / 0.06 + (o.t == null ? 1 : 0)); clay(g, -tw / 2, -th2 / 2, tw, th2, 8, o.lcol || '#E0B63C', { shadowK: 0.4 }); txt(g, ch, 0, 4, F.hero(th2 * 0.78), '#5b4408'); g.restore(); }); }
    sub(g, 'DIARY', -w * 0.04, -h * 0.28, 'rgba(235,225,200,.5)', Math.max(14, w * 0.06));
    g.restore();
  }
  function reporter(g, x, y, s, th, o = {}) { // ILLUSTRATION card of the Stern reporter: coloured, not gray
    g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = '#C9A46A'; g.beginPath(); g.moveTo(-120, 190); g.quadraticCurveTo(-118, 80, -50, 70); g.lineTo(50, 70); g.quadraticCurveTo(118, 80, 120, 190); g.closePath(); g.fill(); g.strokeStyle = '#1a1210'; g.lineWidth = 5; g.stroke();
    g.fillStyle = '#F5F3EE'; g.beginPath(); g.moveTo(-30, 70); g.lineTo(0, 130); g.lineTo(30, 70); g.closePath(); g.fill(); g.stroke(); g.fillStyle = '#9B2A2A'; g.beginPath(); g.moveTo(-8, 92); g.lineTo(8, 92); g.lineTo(12, 160); g.lineTo(0, 172); g.lineTo(-12, 160); g.closePath(); g.fill();
    g.fillStyle = '#E8B98F'; g.beginPath(); g.ellipse(0, -10, 62, 76, 0, 0, 7); g.fill(); g.stroke(); g.fillStyle = '#6b5a45'; g.beginPath(); g.ellipse(0, -62, 62, 30, 0, Math.PI, 0); g.fill(); g.stroke();
    g.strokeStyle = '#1a1210'; g.lineWidth = 5; for (const q of [-26, 26]) { g.fillStyle = 'rgba(210,235,255,.6)'; g.beginPath(); g.ellipse(q, -8, 20, 15, 0, 0, 7); g.fill(); g.stroke(); } g.beginPath(); g.moveTo(-6, -8); g.lineTo(6, -8); g.stroke(); g.fillStyle = '#1a1210'; for (const q of [-26, 26]) { g.beginPath(); g.arc(q, -8, 4, 0, 7); g.fill(); }
    g.beginPath(); if (o.mood === 'worried') { g.moveTo(-18, 38); g.quadraticCurveTo(0, 28, 18, 38); } else { g.moveTo(-18, 32); g.quadraticCurveTo(0, 46, 18, 32); } g.stroke();
    g.fillStyle = '#F2B705'; rr(g, 50, 96, 54, 40, 6); g.fill(); g.lineWidth = 3; g.stroke(); txt(g, 'PRESS', 77, 117, F.hero(15), '#0B0F14'); g.restore();
  }
  function middleman(g, x, y, s) { g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = '#5B3FA8'; g.beginPath(); g.moveTo(-100, 170); g.quadraticCurveTo(-96, 70, -40, 56); g.lineTo(40, 56); g.quadraticCurveTo(96, 70, 100, 170); g.closePath(); g.fill(); g.strokeStyle = '#1a1210'; g.lineWidth = 5; g.stroke(); g.fillStyle = '#D9A87E'; g.beginPath(); g.ellipse(0, -8, 54, 66, 0, 0, 7); g.fill(); g.stroke(); g.fillStyle = '#2b2118'; g.beginPath(); g.ellipse(0, -38, 82, 18, 0, 0, 7); g.fill(); g.beginPath(); g.ellipse(0, -52, 50, 36, 0, Math.PI, 0); g.fill(); g.fillStyle = '#1a1210'; for (const q of [-20, 20]) { g.beginPath(); g.arc(q, -6, 5, 0, 7); g.fill(); } g.beginPath(); g.moveTo(-14, 30); g.lineTo(14, 30); g.stroke(); g.restore(); }
  function labeled(g, th, x, y, w, h, title, k = 1) { g.save(); g.translate(x, y); g.scale(k, k); paper(g, -w / 2, -h / 2, w, h, 14, { lift: 0.4 }); g.fillStyle = th.navy; rr(g, -w / 2, -h / 2, w, 44, 14); g.fill(); txt(g, title, 0, -h / 2 + 23, F.monoX(20), th.gold); g.restore(); }
  // ================= scenes =================
  function nb(g, p, lt, t, th, S) { // one notebook, letters drop in, red circle, stamp
    g.save(); g.translate(540, 830 + (S.dy || 0)); if (S.sc) g.scale(S.sc, S.sc); const k = pop0(g, t, S.at, 70);
    notebook(g, 0, 0, 340, 440, -0.04, th, { letters: S.letters || ['F', 'H'], lAt: S.lAt ?? S.at + 0.4, t });
    if (S.circleAt != null && t >= S.circleAt) { const u = ease.out(clamp((t - S.circleAt) / 0.45)); g.save(); g.strokeStyle = '#E0281E'; g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); g.ellipse(-14, 98, 150, 80, -0.04, -2.2, -2.2 + 6.9 * u); g.stroke(); g.restore(); }
    if (S.stampAt != null) cst(g, th, t, { text: S.stampText || 'WRONG INITIALS', at: S.stampAt, tone: 'bad', size: 58, rot: -0.1, x: 0, y: -150 });
    g.restore(); bottomChip(g, S, t, th);
  }
  function stack(g, p, lt, t, th, S) { // a pile of black notebooks
    const n = S.n || 12; g.save(); g.translate(0, 0); for (let i = 0; i < n; i++) { const at = S.at + i * (S.per || 0.12), o = t - at; if (o <= 0) continue; const k = Math.min(1.05, spring(o, 'snappy')), c = i % 4, r = Math.floor(i / 4), x = 260 + c * 190 + (r % 2 ? 40 : 0) + (hash(i * 3.1) - 0.5) * 24, y = 740 + r * 130 + (hash(i * 7.7) - 0.5) * 16; g.save(); g.globalAlpha *= clamp(o / 0.05); notebook(g, x, y - (1 - Math.min(1, k)) * 90, 150, 190, (hash(i * 1.3) - 0.5) * 0.35, th); g.restore(); } g.restore();
    if (S.tag) { const kk = pk(t, S.tagAt ?? S.at); g.save(); g.globalAlpha *= clamp(kk * 2); g.translate(540, 640); g.scale(0.8 + 0.2 * Math.min(1.08, kk), 0.8 + 0.2 * Math.min(1.08, kk)); stk(g, S.tag, 0, 0, F.hero(fit(S.tag, F.hero, 880, 78)), th.gold, 'center', 14); g.restore(); }
    bottomChip(g, S, t, th);
  }
  function casefile(g, p, lt, t, th, S) { // CASE FILE card with the forger's photo (small), name plate, role
    g.save(); g.translate(540, 835 + (S.dy || 0)); if (S.sc) g.scale(S.sc, S.sc); pop0(g, t, S.at, 90);
    paper(g, -440, -235, 880, 470, 18, { lift: 0.6 }); g.strokeStyle = th.gold; g.lineWidth = 6; rr(g, -424, -219, 848, 438, 12); g.stroke();
    g.fillStyle = th.navy; rr(g, -424, -219, 848, 52, 12); g.fill(); txt(g, S.head || 'CASE FILE Nº 1983 · WEST GERMANY', 0, -192, F.monoX(24), th.gold);
    face(g, -400, -140, 260, 300, 1 + 0.05 * lin(t, S.at, S.at + 6)); if (S.flash && lt < 0.4) { g.fillStyle = 'rgba(255,255,255,' + 0.8 * hit(lt, 12) + ')'; rr(g, -400, -140, 260, 300, 8); g.fill(); }
    sub(g, 'PHOTO: TELEPHIL · CC BY-SA 3.0', -270, 190, th.inkSoft, 11);
    const nm = t - (S.nameAt ?? S.at + 0.3); if (nm > 0) { g.save(); g.globalAlpha *= clamp(nm / 0.1); txt(g, 'KONRAD KUJAU', 150, -95, F.hero(76), th.ink); g.restore(); }
    const rl = t - (S.roleAt ?? S.at + 0.6); if (rl > 0) { g.save(); g.globalAlpha *= clamp(rl / 0.1); g.translate(150, -20); g.scale(0.8 + 0.2 * Math.min(1.1, spring(rl, 'bouncy')), 0.8 + 0.2 * Math.min(1.1, spring(rl, 'bouncy'))); clay(g, -250, -34, 500, 68, 14, th.gold, { shadowK: 0.4 }); txt(g, S.role || 'OLD WAR SOUVENIR DEALER', 0, 3, F.hero(fit(S.role || 'OLD WAR SOUVENIR DEALER', F.hero, 470, 40)), '#0B0F14'); g.restore(); }
    const pl = t - (S.placeAt ?? 9999); if (pl > 0) { g.save(); g.globalAlpha *= clamp(pl / 0.1); txt(g, S.place || 'STUTTGART · WEST GERMANY', 150, 60, F.monoX(28), th.inkSoft); g.fillStyle = th.navy; rr(g, -90, 90, 480, 6, 3); g.fill(); g.restore(); }
    for (const q of S.stamps || []) cst(g, th, t, { size: 70, rot: -0.1, x: 170, y: 150, ...q });
    g.restore(); bottomChip(g, S, t, th);
  }
  function souvenirs(g, p, lt, t, th, S) { // old war souvenirs: letters, map, medals, tin (generic, no symbols)
    const items = [['LETTERS', 300, 800, -0.1], ['OLD MAP', 540, 770, 0.05], ['MEDALS', 780, 810, 0.1]];
    items.forEach(([lab, x, y, r], i) => { const at = S.at + i * 0.25, o = t - at; if (o <= 0) return; const k = pk(t, at); g.save(); g.translate(x, y + (1 - Math.min(1, k)) * 70); g.rotate(r); g.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k); g.globalAlpha *= clamp(o / 0.08); paper(g, -110, -130, 220, 260, 8, { lift: 0.4, fill: '#E9DDBF' });
      if (i === 0) { for (let q = 0; q < 6; q++) { g.fillStyle = 'rgba(70,50,30,.55)'; g.fillRect(-80, -90 + q * 26, 160 - (q % 3) * 24, 5); } g.fillStyle = '#B03A2E'; g.beginPath(); g.arc(50, 80, 22, 0, 7); g.fill(); }
      if (i === 1) { g.strokeStyle = 'rgba(70,50,30,.6)'; g.lineWidth = 3; g.beginPath(); g.moveTo(-90, -60); g.quadraticCurveTo(-20, -110, 20, -40); g.quadraticCurveTo(60, 20, 90, -20); g.moveTo(-80, 40); g.quadraticCurveTo(0, 80, 80, 50); g.stroke(); g.fillStyle = '#B03A2E'; g.beginPath(); g.arc(20, -40, 8, 0, 7); g.fill(); }
      if (i === 2) { for (const [dx, col] of [[-50, '#C9A227'], [0, '#9aa2ad'], [50, '#B5651D']]) { g.fillStyle = col === '#9aa2ad' ? '#4a6fa5' : '#8b2d2d'; g.fillRect(dx - 12, -100, 24, 70); g.fillStyle = col; g.beginPath(); g.arc(dx, -10, 28, 0, 7); g.fill(); g.strokeStyle = 'rgba(0,0,0,.35)'; g.lineWidth = 3; g.stroke(); } }
      txt(g, lab, 0, 100, F.hero(34), th.ink); g.restore(); });
    const kk = pk(t, S.at); g.save(); g.globalAlpha *= clamp(kk * 2); g.translate(540, 640); stk(g, 'OLD WAR SOUVENIRS', 0, 0, F.hero(fit('OLD WAR SOUVENIRS', F.hero, 880, 84)), th.gold, 'center', 14); g.restore();
    bottomChip(g, S, t, th);
  }
  function forging(g, p, lt, t, th, S) { // an open notebook, handwriting appears line by line
    g.save(); g.translate(540, 840); pop0(g, t, S.at, 70); paper(g, -420, -230, 840, 440, 12, { lift: 0.5, fill: '#2a2e36' }); g.fillStyle = '#EFE6CF'; rr(g, -400, -210, 390, 400, 6); g.fill(); rr(g, 10, -210, 390, 400, 6); g.fill(); g.fillStyle = 'rgba(0,0,0,.18)'; g.fillRect(-4, -210, 8, 400);
    const lines = 14; g.strokeStyle = 'rgba(40,30,20,.7)'; g.lineWidth = 3; g.lineCap = 'round'; for (let i = 0; i < lines; i++) { const u = clamp((t - S.at - 0.2 - i * 0.14) / 0.3); if (u <= 0) continue; const sx = i < 7 ? -370 : 40, y = -170 + (i % 7) * 52, wlen = (240 + 60 * hash(i * 2.7)) * u; g.beginPath(); g.moveTo(sx, y); for (let q = 0; q <= 14; q++) { const xx = sx + wlen * q / 14; g.lineTo(xx, y + Math.sin(q * 2.1 + i) * 6 * (q % 2 ? 1 : -1)); } g.stroke(); }
    const pi = clamp((t - S.at - 0.2) / (lines * 0.14)); const pxp = (pi < 0.5 ? -370 + 300 * (pi * 2) : 40 + 300 * ((pi - 0.5) * 2)), pyp = -170 + (Math.floor(pi * 14) % 7) * 52; g.save(); g.translate(pxp, pyp); g.rotate(0.6); g.fillStyle = '#C9A227'; rr(g, -4, -90, 8, 90, 3); g.fill(); g.fillStyle = '#1a1210'; g.beginPath(); g.moveTo(-4, 0); g.lineTo(4, 0); g.lineTo(0, 14); g.fill(); g.restore();
    g.restore(); if (S.tag) { const kk = pk(t, S.tagAt ?? S.at + 0.4); g.save(); g.globalAlpha *= clamp(kk * 2); g.translate(540, 626); stk(g, S.tag, 0, 0, F.hero(fit(S.tag, F.hero, 880, 70)), th.gold, 'center', 12); g.restore(); }
    if (S.stampAt != null) cst(g, th, t, { text: S.stampText || 'ALL FAKE', at: S.stampAt, tone: 'bad', size: 70, rot: -0.1, x: 540, y: 1010 });
    bottomChip(g, S, t, th);
  }
  function alias(g, p, lt, t, th, S) { // name tag swap + chain forger -> middleman -> magazine
    g.save(); g.translate(540, 700); pop0(g, t, S.at, 60); g.fillStyle = th.navy; rr(g, -380, -80, 760, 150, 16); g.fill(); sub(g, 'HELLO MY NAME IS', 0, -52, th.gold, 22); txt(g, 'KONRAD KUJAU', 0, 2, F.hero(76), th.paper);
    if (S.strikeAt != null && t >= S.strikeAt) { const u = ease.out(clamp((t - S.strikeAt) / 0.3)); g.strokeStyle = th.bad; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); g.moveTo(-250, 4); g.lineTo(-250 + 500 * u, -6); g.stroke(); }
    g.restore();
    const rv = t - (S.revealAt ?? 9999); if (rv > 0) { g.save(); g.translate(540, 810); g.scale(0.8 + 0.2 * Math.min(1.1, spring(rv, 'bouncy')), 0.8 + 0.2 * Math.min(1.1, spring(rv, 'bouncy'))); g.globalAlpha *= clamp(rv / 0.1); g.fillStyle = th.paper; rr(g, -330, -42, 660, 84, 14); g.fill(); g.strokeStyle = th.bad; g.lineWidth = 5; rr(g, -330, -42, 660, 84, 14); g.stroke(); txt(g, 'KONRAD FISCHER', 0, 4, F.hero(60), th.badInk); g.restore(); sub(g, 'A FAKE NAME', 540, 872, th.gold, 22); }
    const ch = [[200, 'FORGER'], [540, 'MIDDLEMAN'], [880, 'BUYER']]; ch.forEach(([x, l], i) => { const at = S.chainAt + i * 0.35, o = t - at; if (o <= 0) return; const k = pk(t, at); g.save(); g.translate(x, 990); g.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k); g.globalAlpha *= clamp(o / 0.08); paper(g, -90, -70, 180, 140, 10, { lift: 0.3 }); if (i === 0) notebook(g, 0, -12, 70, 90, -0.1, th); if (i === 1) { g.save(); rr(g, -80, -62, 160, 100, 8); g.clip(); middleman(g, 0, -20, 0.38); g.restore(); } if (i === 2) { g.fillStyle = th.navy; rr(g, -60, -52, 120, 100, 6); g.fill(); txt(g, 'MAGAZINE', 0, -14, F.hero(24), th.gold); txt(g, '?', 0, 22, F.hero(46), th.paper); } txt(g, l, 0, 52, F.monoX(17), th.ink); g.restore();
      if (i < 2 && t >= at + 0.25) { const u = ease.out(clamp((t - at - 0.25) / 0.3)); g.strokeStyle = th.gold; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.moveTo(x + 100, 990); g.lineTo(x + 100 + 150 * u, 990); g.stroke(); if (u > 0.9) { g.fillStyle = th.gold; g.beginPath(); g.moveTo(x + 260, 990); g.lineTo(x + 242, 978); g.lineTo(x + 242, 1002); g.fill(); } } });
    bottomChip(g, S, t, th);
  }
  function magazine(g, x, y, w, h, th, o = {}) { g.save(); g.translate(x, y); paper(g, -w / 2, -h / 2, w, h, 6, { lift: 0.4, fill: '#F1EEE6' }); g.fillStyle = '#B3261E'; g.fillRect(-w / 2 + 10, -h / 2 + 10, w - 20, h * 0.16); txt(g, o.mast || 'THE MAGAZINE', 0, -h / 2 + 10 + h * 0.08, F.hero(h * 0.11), '#F5F3EE'); g.fillStyle = '#C8C2B4'; g.fillRect(-w / 2 + 14, -h / 2 + h * 0.26, w - 28, h * 0.32); g.fillStyle = 'rgba(40,36,30,.5)'; for (let i = 0; i < 4; i++) g.fillRect(-w / 2 + 16, h * 0.14 + i * h * 0.075, (w - 32) * (0.9 - i * 0.12), h * 0.03); if (o.head) txt(g, o.head, 0, -h / 2 + h * 0.42, F.hero(fit(o.head, F.hero, w - 30, h * 0.12)), '#0B0F14'); g.restore(); }
  function reportercard(g, p, lt, t, th, S) { // Stern + the reporter believes the notebooks
    g.save(); g.translate(260, 825); g.scale(0.86, 0.86); pop0(g, t, S.at, 70); magazine(g, 0, 0, 340, 440, th, { mast: 'STERN', head: 'BIG SCOOP' }); sub(g, 'GERMAN NEWS MAGAZINE', 0, 246, th.paper, 18); g.restore();
    const b = t - (S.rAt ?? S.at + 0.4); if (b > 0) { const kk = Math.min(1.1, spring(b, 'bouncy')); g.save(); g.translate(790, 825 + (1 - Math.min(1, kk)) * 70); g.scale(0.86, 0.86); g.rotate(0.03); g.globalAlpha *= clamp(b / 0.08); paper(g, -215, -245, 430, 490, 18, { lift: 0.5 });
      const bg = g.createLinearGradient(0, -220, 0, 110); bg.addColorStop(0, '#CFE3F0'); bg.addColorStop(1, '#9FC2D8'); g.fillStyle = bg; rr(g, -190, -220, 380, 330, 12); g.fill(); g.save(); rr(g, -190, -220, 380, 330, 12); g.clip(); reporter(g, 0, -40, 1.05, th, { mood: S.mood }); g.restore(); g.strokeStyle = 'rgba(11,15,20,.45)'; g.lineWidth = 3; rr(g, -190, -220, 380, 330, 12); g.stroke();
      g.fillStyle = th.navy; rr(g, -190, 124, 380, 96, 10); g.fill(); txt(g, 'GERD HEIDEMANN', 0, 156, F.hero(40), th.paper); sub(g, 'STAR REPORTER · ILLUSTRATION', 0, 198, th.gold, 16); g.restore(); }
    const bl = t - (S.believeAt ?? 9999); if (bl > 0) { const k = pk(t, S.believeAt); g.save(); g.translate(540, 780); g.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k); g.globalAlpha *= clamp(k * 2); g.save(); g.rotate(-0.05); notebook(g, 0, 0, 120, 150, 0, th); g.restore(); g.strokeStyle = th.good; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); g.moveTo(-34, 84); g.lineTo(-6, 112); g.lineTo(44, 58); g.stroke(); g.restore(); }
    bottomChip(g, S, t, th);
  }
  function pay(g, p, lt, t, th, S) { // the magazine pays ~9 million marks
    for (let st = 0; st < 4; st++) { const at = S.at + st * 0.25, o = t - at; if (o <= 0) continue; const k = pk(t, at, 'snappy'); for (let b = 0; b < 4 + st; b++) { g.save(); g.globalAlpha *= clamp(o / 0.05); g.translate(200 + st * 227, 1010 - b * 26 - (1 - Math.min(1, k)) * 80); g.rotate(((b + st) % 3 - 1) * 0.03); billD(g, -95, -30, 190, 62); g.restore(); } }
    const k = pk(t, S.at); g.save(); g.translate(540, 700); g.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k); g.globalAlpha *= clamp((t - S.at) / 0.08); const v = Math.round(9 * ease.out(clamp((t - S.at) / (S.dur || 1.3))) * 10) / 10; if (S.noNum) { stk(g, S.numText || 'A FORTUNE', 0, 0, F.hero(fit(S.numText || 'A FORTUNE', F.hero, 880, 120)), th.gold, 'center', 14); } else { stk(g, 'ABOUT ' + v.toFixed(1) + ' MILLION', 0, -10, F.hero(fit('ABOUT 9.0 MILLION', F.hero, 880, 104)), th.gold, 'center', 14); sub(g, 'MARKS · WEST GERMAN MONEY', 0, 62, th.paper, 24); } g.restore();
    if (S.stampAt != null) cst(g, th, t, { text: S.stampText || 'A FORTUNE', at: S.stampAt, tone: 'bad', size: 70, rot: -0.08, x: 540, y: 880 });
    bottomChip(g, S, t, th);
  }
  function skim(g, p, lt, t, th, S) { // the reporter secretly keeps a chunk
    g.save(); g.translate(300, 840); pop0(g, t, S.at, 60); paper(g, -170, -190, 340, 380, 14, { lift: 0.4 }); g.save(); rr(g, -150, -170, 300, 270, 8); g.clip(); const bg = g.createLinearGradient(0, -170, 0, 100); bg.addColorStop(0, '#CFE3F0'); bg.addColorStop(1, '#9FC2D8'); g.fillStyle = bg; g.fillRect(-150, -170, 300, 270); reporter(g, 0, -30, 0.95, th, { mood: 'worried' }); g.restore(); txt(g, 'HEIDEMANN', 0, 140, F.hero(40), th.ink); g.restore();
    for (let b = 0; b < 8; b++) { const own = b >= 5, u = own ? ease.inOut(clamp((t - S.moveAt - (b - 5) * 0.12) / 0.7)) : 0; const x = lerp(790, 520, u), y = lerp(990 - b * 26, 990 - (b - 5) * 24, u); const at = S.at + b * 0.07; if (t < at) continue; g.save(); g.globalAlpha *= clamp((t - at) / 0.05); g.translate(x, y); g.rotate(own ? u * -0.2 : ((b % 3) - 1) * 0.03); billD(g, -95, -30, 190, 62); g.restore(); }
    stk(g, 'THE MAGAZINE’S MONEY', 790, 700, F.hero(fit('THE MAGAZINE’S MONEY', F.hero, 400, 46)), th.paper, 'center', 10);
    if (S.stampAt != null) cst(g, th, t, { text: S.stampText || 'SECRETLY KEPT A CHUNK', at: S.stampAt, tone: 'bad', size: 40, rot: -0.05, x: 540, y: 622 });
    bottomChip(g, S, t, th);
  }
  function defcard(g, p, lt, t, th, S) {
    g.save(); g.translate(540, 830); pop0(g, t, S.at, 70, 0.9); paper(g, -430, -210, 860, 420, 18, { lift: 0.5 }); g.fillStyle = th.navy; rr(g, -430, -210, 860, 78, 18); g.fill(); txt(g, S.head || 'WHAT IT MEANS', 0, -170, F.hero(48), th.gold);
    g.save(); g.translate(-250, 30); const ia = t - (S.iconAt ?? S.at + 0.3); if (ia > 0) { g.globalAlpha *= clamp(ia / 0.1); g.scale(0.7 + 0.3 * Math.min(1.1, spring(ia, 'bouncy')), 0.7 + 0.3 * Math.min(1.1, spring(ia, 'bouncy'))); ICON[S.icon || 'cash'](g, th, t); } g.restore();
    const da = t - (S.defAt ?? S.at + 0.4); if (da > 0) { g.save(); g.globalAlpha *= clamp(da / 0.12); g.translate((1 - Math.min(1, spring(da, 'snappy'))) * 50, 0); txt(g, S.term, 120, -75, F.hero(fit(S.term, F.hero, 520, 78)), th.badInk); txt(g, S.d1, 120, 5, F.hero(fit(S.d1, F.hero, 520, 50)), th.ink); txt(g, S.d2, 120, 65, F.hero(fit(S.d2, F.hero, 520, 50)), th.ink); if (S.d3) txt(g, S.d3, 120, 125, F.hero(fit(S.d3, F.hero, 520, 50)), th.ink); g.restore(); }
    g.restore(); bottomChip(g, S, t, th);
  }
  const ICON = { cash(g, th) { B.crimeIcon(g, 'cash', 230, th); }, gavel(g, th) { B.crimeIcon(g, 'gavel', 230, th); }, book(g, th) { notebook(g, 0, 0, 150, 190, -0.06, th); }, fake(g, th) { notebook(g, 0, 0, 150, 190, -0.06, th); g.strokeStyle = th.bad; g.lineWidth = 14; g.lineCap = 'round'; g.beginPath(); g.moveTo(-70, -70); g.lineTo(70, 70); g.moveTo(70, -70); g.lineTo(-70, 70); g.stroke(); } };
  function press(g, p, lt, t, th, S) { // April 1983: the announcement - lectern, mics, camera flashes
    g.save(); g.translate(540, 840); pop0(g, t, S.at, 70); g.fillStyle = th.navy; rr(g, -420, -240, 840, 90, 12); g.fill(); txt(g, 'WORLD EXCLUSIVE · APRIL 1983', 0, -195, F.hero(52), th.gold);
    g.fillStyle = '#5B3A1F'; g.beginPath(); g.moveTo(-130, 200); g.lineTo(-100, -40); g.lineTo(100, -40); g.lineTo(130, 200); g.closePath(); g.fill(); g.strokeStyle = '#2a1a0c'; g.lineWidth = 5; g.stroke(); for (const q of [-50, 0, 50]) { g.strokeStyle = '#59606B'; g.lineWidth = 6; g.beginPath(); g.moveTo(q, -40); g.lineTo(q * 1.2, -110); g.stroke(); g.fillStyle = '#12171f'; g.beginPath(); g.arc(q * 1.2, -118, 15, 0, 7); g.fill(); }
    notebook(g, 0, 40, 110, 140, 0.05, th, { letters: ['F', 'H'] }); g.restore();
    for (let i = 0; i < 7; i++) { const ft = S.flashAt + i * 0.28, k = t - ft; if (k > 0 && k < 0.3) { const x = 120 + hash(i * 5.3) * 840, y = 700 + hash(i * 8.1) * 340; g.fillStyle = 'rgba(255,255,255,' + 0.9 * (1 - k / 0.3) + ')'; g.beginPath(); g.arc(x, y, 60 * (0.4 + k * 3), 0, 7); g.fill(); } }
    bottomChip(g, S, t, th);
  }
  function cover(g, p, lt, t, th, S) { // nobody checked the cover: magnifier + checklist
    g.save(); g.translate(330, 850); pop0(g, t, S.at, 60); notebook(g, 0, 0, 300, 390, -0.04, th, { letters: ['F', 'H'] }); const u = clamp((t - S.at) / 0.8), mx = lerp(120, -10, ease.out(u)) + Math.sin(t * 2) * 6, my = lerp(-160, 100, ease.out(u)); g.strokeStyle = '#C9A227'; g.lineWidth = 12; g.beginPath(); g.arc(mx, my, 62, 0, 7); g.stroke(); g.fillStyle = 'rgba(200,230,255,.25)'; g.beginPath(); g.arc(mx, my, 62, 0, 7); g.fill(); g.beginPath(); g.moveTo(mx + 44, my + 44); g.lineTo(mx + 100, my + 100); g.lineWidth = 16; g.stroke(); g.restore();
    const items = [['PAPER TEST', 'NOT DONE'], ['INK TEST', 'NOT DONE'], ['COVER CHECK', 'NOBODY']]; items.forEach(([a, b], i) => { const at = S.listAt + i * 0.4, o = t - at; if (o <= 0) return; const k = pk(t, at); g.save(); g.translate(790, 700 + i * 130); g.scale(0.85 + 0.15 * k, 0.85 + 0.15 * k); g.globalAlpha *= clamp(o / 0.08); paper(g, -190, -48, 380, 96, 12, { lift: 0.3 }); txt(g, a, -170, -10, F.hero(34), th.ink, 'left'); sub(g, b, -170, 24, th.badInk, 20, 'left'); g.strokeStyle = th.bad; g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); g.moveTo(130, -20); g.lineTo(166, 16); g.moveTo(166, -20); g.lineTo(130, 16); g.stroke(); g.restore(); });
    bottomChip(g, S, t, th);
  }
  function compare(g, p, lt, t, th, S) { // what it said (F H) vs what it should say (A H)
    [[300, 'WHAT IT SAID', ['F', 'H'], th.bad], [780, 'IT SHOULD SAY', ['A', 'H'], th.good]].forEach(([x, l, lt2, col], i) => { const at = S.at + i * (S.gap ?? 0.8), o = t - at; if (o <= 0) return; const k = pk(t, at); g.save(); g.translate(x, 840); g.scale(0.85 + 0.15 * k, 0.85 + 0.15 * k); g.globalAlpha *= clamp(o / 0.08); if (i === 1) g.globalAlpha *= 0.92; notebook(g, 0, 0, 280, 360, i ? 0.05 : -0.05, th, { letters: lt2, lcol: i ? '#7BC96F' : '#E0B63C' }); stk(g, l, 0, -228, F.hero(44), col, 'center', 10);
      if (!i) { const u = ease.out(clamp((t - at - 0.5) / 0.3)); g.save(); g.strokeStyle = '#E0281E'; g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); g.ellipse(-12, 80, 120, 62, -0.04, 0, 6.28 * u); g.stroke(); g.restore(); } else { const u = ease.out(clamp((t - at - 0.5) / 0.3)); g.save(); g.strokeStyle = th.good; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); g.moveTo(-40, 214); g.lineTo(-10, 244 * u + 0); g.lineTo(50, 190); g.stroke(); g.restore(); } g.restore(); });
    if (S.vsAt != null && t >= S.vsAt) { const k = pk(t, S.vsAt); g.save(); g.translate(540, 860); g.scale(k, k); g.fillStyle = '#0B0F14'; g.beginPath(); g.arc(0, 0, 40, 0, 7); g.fill(); g.strokeStyle = th.gold; g.lineWidth = 5; g.stroke(); txt(g, 'VS', 0, 3, F.hero(42), th.gold); g.restore(); }
    bottomChip(g, S, t, th);
  }
  function lab(g, p, lt, t, th, S) { // national archives lab: paper + ink under test, MODERN
    g.save(); g.translate(540, 840); pop0(g, t, S.at, 60); g.fillStyle = th.navy; rr(g, -440, -240, 880, 70, 12); g.fill(); txt(g, 'NATIONAL ARCHIVES · LAB TEST', 0, -205, F.hero(44), th.gold);
    paper(g, -420, -150, 400, 330, 14, { lift: 0.4 }); txt(g, 'PAPER', -220, -118, F.hero(42), th.ink); g.fillStyle = '#EFE6CF'; rr(g, -330, -85, 220, 150, 6); g.fill(); g.fillStyle = 'rgba(120,150,255,.28)'; rr(g, -330, -85, 220, 150, 6); g.fill();
    paper(g, 20, -150, 400, 330, 14, { lift: 0.4 }); txt(g, 'INK', 220, -118, F.hero(42), th.ink); g.strokeStyle = '#1a2a6b'; g.lineWidth = 8; g.lineCap = 'round'; g.beginPath(); g.moveTo(80, -30); g.quadraticCurveTo(140, -80, 200, -30); g.quadraticCurveTo(260, 20, 320, -30); g.stroke(); g.restore();
    [[S.paperAt, 'MODERN', -220], [S.inkAt, 'MODERN', 220]].forEach(([at, w, x]) => { if (at != null) cst(g, th, t, { text: w, at, tone: 'bad', size: 66, rot: x < 0 ? -0.1 : 0.08, x: 540 + x, y: 960 }); });
    if (S.lampAt != null && t >= S.lampAt) { const u = clamp((t - S.lampAt) / 0.4); g.save(); g.globalAlpha *= u * 0.5; const lg = g.createRadialGradient(540, 700, 10, 540, 840, 360); lg.addColorStop(0, 'rgba(180,200,255,.5)'); lg.addColorStop(1, 'rgba(180,200,255,0)'); g.fillStyle = lg; g.fillRect(100, 600, 880, 460); g.restore(); }
    bottomChip(g, S, t, th);
  }
  function days(g, p, lt, t, th, S) { // < 2 weeks: calendar of 14 days between announcement and the lab verdict
    g.save(); g.translate(540, 840); pop0(g, t, S.at, 60); paper(g, -440, -230, 880, 460, 16, { lift: 0.5 }); g.fillStyle = th.navy; rr(g, -440, -230, 880, 64, 16); g.fill(); txt(g, 'ANNOUNCEMENT  →  LAB VERDICT', 0, -198, F.hero(40), th.gold);
    for (let i = 0; i < 14; i++) { const c = i % 7, r = Math.floor(i / 7), x = -340 + c * 112, y = -110 + r * 130, o = t - (S.tickAt + i * (S.step ?? 0.12)), done = o > 0; g.save(); g.translate(x + 45, y + 50); g.fillStyle = done ? '#F3D9D6' : '#EEEBE2'; rr(g, -45, -50, 90, 100, 10); g.fill(); g.strokeStyle = 'rgba(11,15,20,.35)'; g.lineWidth = 3; rr(g, -45, -50, 90, 100, 10); g.stroke(); txt(g, String(i + 1), -22, -28, F.monoX(20), th.inkSoft); if (done) { const k = Math.min(1.1, spring(o, 'snappy')); g.strokeStyle = th.bad; g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); g.moveTo(-26, -20); g.lineTo(-26 + 52 * k, -20 + 52 * k); g.moveTo(26, -20); g.lineTo(26 - 52 * k, -20 + 52 * k); g.stroke(); } g.restore(); }
    g.restore(); if (S.stampAt != null) cst(g, th, t, { text: S.stampText || 'LESS THAN 2 WEEKS', at: S.stampAt, tone: 'bad', size: 56, rot: -0.05, x: 540, y: 1034 });
    bottomChip(g, S, t, th);
  }
  function crude(g, p, lt, t, th, S) { // CRUDE FORGERY stamp over the notebook
    g.save(); g.translate(540, 830); pop0(g, t, S.at, 60); notebook(g, 0, 0, 330, 430, -0.05, th, { letters: ['F', 'H'] }); g.restore(); if (S.stampAt != null) cst(g, th, t, { text: 'CRUDE FORGERY', at: S.stampAt, tone: 'bad', size: 74, rot: -0.1, x: 540, y: 840 }); bottomChip(g, S, t, th);
  }
  function court(g, p, lt, t, th, S) { // Hamburg court: columns + gavel + two defendants
    g.save(); g.translate(540, 830); pop0(g, t, S.at, 70); g.fillStyle = '#D9D2C0'; g.beginPath(); g.moveTo(-300, -120); g.lineTo(0, -230); g.lineTo(300, -120); g.closePath(); g.fill(); g.strokeStyle = '#6b6350'; g.lineWidth = 5; g.stroke(); for (let i = -2; i <= 2; i++) { g.fillStyle = '#E9E3D3'; g.fillRect(i * 110 - 28, -110, 56, 250); g.strokeRect(i * 110 - 28, -110, 56, 250); } g.fillStyle = '#C9C2AE'; g.fillRect(-340, 140, 680, 40); txt(g, 'HAMBURG · 1985', 0, -150, F.hero(40), '#3a3320'); g.restore();
    g.save(); g.translate(540, 1010); g.scale(0.9, 0.9); B.crimeIcon(g, 'gavel', 120, th); g.restore();
    const gk = S.gavelAt != null ? t - S.gavelAt : -1; if (gk > 0 && gk < 0.5) { g.save(); g.globalAlpha *= 1 - gk / 0.5; g.strokeStyle = th.gold; g.lineWidth = 6; g.beginPath(); g.arc(540, 1030, 40 + gk * 260, 0, 7); g.stroke(); g.restore(); }
    bottomChip(g, S, t, th);
  }
  function sentence(g, p, lt, t, th, S) { // two defendants, bars come down, ~4.5 years each
    [[320, 'KUJAU', 'photo'], [760, 'HEIDEMANN', 'rep']].forEach(([x, nm, kind], i) => { const at = S.at + i * 0.3, o = t - at; if (o <= 0) return; const k = pk(t, at); g.save(); g.translate(x, 760 + (1 - Math.min(1, k)) * 60); g.globalAlpha *= clamp(o / 0.08); paper(g, -200, -170, 400, 340, 14, { lift: 0.5 }); g.save(); rr(g, -180, -150, 360, 250, 8); g.clip(); if (kind === 'photo') { face(g, -180, -150, 360, 250, 1.05, true); } else { const bg = g.createLinearGradient(0, -150, 0, 100); bg.addColorStop(0, '#BFC9D2'); bg.addColorStop(1, '#8C99A6'); g.fillStyle = bg; g.fillRect(-180, -150, 360, 250); reporter(g, 0, -30, 0.95, th, { mood: 'worried' }); g.globalCompositeOperation = 'saturation'; g.fillStyle = '#808080'; g.fillRect(-180, -150, 360, 250); g.globalCompositeOperation = 'source-over'; }
      const bu = ease.in(clamp((t - S.barsAt - i * 0.3) / 0.35)); for (let b = 0; b < 7; b++) { const bx = -180 + (b + 0.5) * 360 / 7; g.fillStyle = '#10161f'; g.fillRect(bx - 10, -150, 20, 250 * bu); g.fillStyle = 'rgba(255,255,255,.22)'; g.fillRect(bx - 10, -150, 5, 250 * bu); } g.restore(); g.fillStyle = th.navy; rr(g, -180, 108, 360, 48, 8); g.fill(); txt(g, nm, 0, 133, F.hero(34), th.paper); g.restore(); });
    const ya = t - S.yrsAt; if (ya > 0) { const kk = Math.min(1.1, spring(ya, 'bouncy')); g.save(); g.translate(540, 1000); g.scale(0.8 + 0.2 * kk, 0.8 + 0.2 * kk); g.globalAlpha *= clamp(ya / 0.08); stk(g, 'ABOUT 4½ YEARS EACH', 0, -10, F.hero(fit('ABOUT 4½ YEARS EACH', F.hero, 880, 92)), th.bad, 'center', 14); g.restore(); }
    if (ya > 0.2) { const w = 840 / 9; for (let i = 0; i < 9; i++) { const u = ease.out(clamp((ya - 0.2 - i * 0.04) / 0.3)); g.fillStyle = i < 4.5 ? th.bad : 'rgba(255,59,48,.3)'; rr(g, 120 + i * w + 2, 1056, w - 4, 18 * u, 4); g.fill(); } }
    bottomChip(g, S, t, th);
  }
  function board(g, p, lt, t, th, S) { // evidence board
    g.save(); g.translate(540, 830); pop0(g, t, S.at, 60); const lg = g.createLinearGradient(-450, -230, 450, 230); lg.addColorStop(0, '#b98650'); lg.addColorStop(1, '#8c5f33'); g.fillStyle = lg; rr(g, -450, -240, 900, 480, 18); g.fill(); g.strokeStyle = '#4a2f17'; g.lineWidth = 14; rr(g, -450, -240, 900, 480, 18); g.stroke();
    for (let i = 0; i < 140; i++) { g.fillStyle = 'rgba(' + (hash(i * 3.1) > 0.5 ? '60,35,10' : '230,190,130') + ',' + (0.06 + 0.1 * hash(i * 7.7)) + ')'; g.beginPath(); g.arc(-440 + hash(i * 1.3) * 880, -230 + hash(i * 2.9) * 460, 2 + 4 * hash(i * 5.1), 0, 7); g.fill(); }
    const items = [{ x: 0, y: -60, w: 190, h: 215, kind: 'photo' }, { x: -310, y: -100, w: 170, h: 150, k: 'nb', txt: 'F H' }, { x: -310, y: 100, w: 170, h: 150, k: 'mag', txt: 'STERN' }, { x: 310, y: -100, w: 170, h: 150, icon: 'cash', txt: '~9M MARKS' }, { x: 310, y: 100, w: 170, h: 150, icon: 'gavel', txt: '~4½ YRS' }];
    const pins = items.map(it => [it.x, it.y - it.h / 2 + 8]), tight = ease.out(clamp((t - S.tightAt) / 0.5));
    items.forEach((it, i) => { if (i) { const at = S.at + 0.3 + (i - 1) * 0.25, u = ease.out(clamp((t - at - 0.1) / 0.4)); if (u > 0) { const a = pins[0], b = pins[i]; g.strokeStyle = '#E0281E'; g.lineWidth = 5; g.lineCap = 'round'; g.beginPath(); g.moveTo(a[0], a[1]); const ex = lerp(a[0], b[0], u), ey = lerp(a[1], b[1], u); g.quadraticCurveTo((a[0] + ex) / 2, (a[1] + ey) / 2 + 36 * (1 - tight), ex, ey); g.stroke(); } } });
    items.forEach((it, i) => { const at = i ? S.at + 0.3 + (i - 1) * 0.25 : S.at, o = t - at; if (o < 0) return; const kk = Math.min(1.1, spring(o, 'bouncy')); g.save(); g.translate(it.x, it.y); g.rotate((i - 2) * 0.03 + (1 - Math.min(1, kk)) * 0.2); g.scale(0.6 + 0.4 * kk, 0.6 + 0.4 * kk); paper(g, -it.w / 2, -it.h / 2, it.w, it.h, 8, { lift: 0.3, fill: it.kind ? '#EDE7D8' : th.paper });
      if (it.kind) { face(g, -it.w / 2 + 10, -it.h / 2 + 10, it.w - 20, it.h - 64, 1.0); g.fillStyle = th.navy; rr(g, -it.w / 2 + 10, it.h / 2 - 48, it.w - 20, 38, 6); g.fill(); txt(g, 'KUJAU', 0, it.h / 2 - 29, F.hero(26), th.paper); } else { g.save(); g.translate(0, -26); if (it.k === 'nb') notebook(g, 0, 0, 70, 90, -0.06, th, { letters: ['F', 'H'] }); else if (it.k === 'mag') magazine(g, 0, 0, 80, 100, th, { mast: 'STERN' }); else B.crimeIcon(g, it.icon, 80, th); g.restore(); txt(g, it.txt, 0, it.h / 2 - 22, F.hero(fit(it.txt, F.hero, it.w - 16, 30)), th.ink); } g.restore(); g.fillStyle = '#c4231a'; g.beginPath(); g.arc(pins[i][0], pins[i][1], 10, 0, 7); g.fill(); });
    g.restore(); if (S.stampAt != null) { g.save(); g.translate(540, 840); cst(g, th, t, { text: S.stampText || 'NOBODY CHECKED TWO LETTERS', at: S.stampAt, tone: 'bad', size: 44, rot: -0.07, x: 0, y: 190 }); g.restore(); }
    bottomChip(g, S, t, th);
  }
  function ask(g, p, lt, t, th, S) { const k = spring(lt, 'bouncy'); g.save(); g.translate(540, 800); g.scale(0.7 + 0.3 * Math.min(1.06, k), 0.7 + 0.3 * Math.min(1.06, k)); g.globalAlpha *= clamp(k * 2); const sz = Math.min(fit(S.l1, F.hero, 900, 112), fit(S.l2, F.hero, 900, 112)); stk(g, S.l1, 0, -62, F.hero(sz), th.gold, 'center', 16); stk(g, S.l2, 0, 62, F.hero(sz), th.bad, 'center', 16); g.restore(); }
  const SC = { nb, stack, casefile, souvenirs, forging, alias, reportercard, pay, skim, defcard, press, cover, compare, lab, days, crude, court, sentence, board, ask };
  // ---------- suspect card (always on, bottom-left): the forger's face, a different treatment every beat ----------
  function pip(g, p, env) {
    const { t, theme: th } = env; let K = p.keys[0]; for (const q of p.keys) if (t >= q.at) K = q; const o = t - K.at, pop = 1 + 0.07 * Math.exp(-o * 7) * Math.cos(o * 22);
    g.save(); g.scale(pop, pop); g.rotate(-0.03); paper(g, -100, -150, 200, 262, 14, { lift: 0.5 }); face(g, -90, -140, 180, 190, 1 + 0.05 * Math.min(1, o / 3), !!K.mono);
    if (K.tint) { g.fillStyle = K.tint; rr(g, -90, -140, 180, 190, 8); g.fill(); }
    if (K.x) { const u = ease.out(clamp(o / 0.3)); g.strokeStyle = th.bad; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); g.moveTo(-60, -110); g.lineTo(-60 + 120 * u, -110 + 120 * u); g.moveTo(60, -110); g.lineTo(60 - 120 * u, -110 + 120 * u); g.stroke(); }
    if (K.bars) { const u = ease.in(clamp(o / 0.3)); for (let i = 0; i < 6; i++) { const bx = -90 + (i + 0.5) * 30; g.fillStyle = '#10161f'; g.fillRect(bx - 5, -140, 10, 190 * u); } }
    g.fillStyle = th.bad; rr(g, -90, 56, 180, 28, 8); g.fill(); txt(g, 'KUJAU · FORGER', 0, 70, F.cap(13), th.paper);
    const w = Math.max(196, mw(K.text, F.cap(21)) + 22); g.save(); g.translate(0, 120); g.fillStyle = th.ink; rr(g, -w / 2, -20, w, 40, 10); g.fill(); g.strokeStyle = K.tone === 'bad' ? '#FF3B30' : K.tone === 'good' ? '#00D26A' : '#F2B705'; g.lineWidth = 3; rr(g, -w / 2, -20, w, 40, 10); g.stroke(); txt(g, K.text, 0, 2, F.cap(21), g.strokeStyle); g.restore();
    if (K.stamp) cst(g, th, t, { text: K.stamp, at: K.at + 0.1, tone: K.tone || 'bad', size: 30, rot: -0.2, x: 0, y: -40 });
    g.restore();
  }
  B.register('apip', { defaults: { keys: [] }, ownEnter: true, size: () => [230, 330], anchors: () => ({ face: [0, -40, 200, 240] }), draw(g, p, env) { g.globalAlpha *= clamp(env.lt / 0.08); pip(g, p, env); } });
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
      for (const S of p.scenes) {
        if (t < S.from - 0.02 || t > S.to + 0.02) continue; const lt = t - S.from, kin = spring(lt + 0.08, { f: 2.4, z: 0.7 }), a = clamp(lt / 0.12) * (1 - lin(t, S.to - 0.12, S.to)), sc = (S.pop === false ? 1 : 0.94 + 0.06 * Math.min(1.05, kin));
        g.save(); g.globalAlpha *= a; g.translate(540, 840 + (S.gdy || 0)); g.scale(sc * (S.gsc || 1), sc * (S.gsc || 1)); g.translate(-540, -840);
        const fn = SC[S.type]; if (!fn) throw new Error('unknown scene type ' + S.type); fn(g, p, lt, t, th, S);
        g.restore();
      }
      hookText(g, p, t, th);
      for (const n of p.notes) if (t >= n.at && t < n.out + 0.2) { const nt = t - n.at, k = Math.min(1.08, spring(nt, 'bouncy')), fo = 1 - lin(t, n.out - 0.15, n.out + 0.05); g.save(); g.globalAlpha *= clamp(nt / 0.06) * fo; chip(g, n.text, 540, n.y || 598, n.tone || 'bad', th, n.size || 44, 900, k); g.restore(); }
    },
  });
  B.register('hypo', {
    defaults: { text: '' }, ownEnter: true, size: () => [10, 10],
    draw(g, p, env) { const s = p.text, f = F.monoX(21), w = mw(s, f) + 36; g.globalAlpha *= 0.9; g.fillStyle = 'rgba(11,15,20,.78)'; rr(g, -w / 2, -18, w, 36, 18); g.fill(); g.strokeStyle = env.theme.accent; g.lineWidth = 2; rr(g, -w / 2, -18, w, 36, 18); g.stroke(); txt(g, s, 0, 1, f, env.theme.accent); },
  });
  Object.assign(window.DD.h, { fit, stk, chip, label, mw });
})();
