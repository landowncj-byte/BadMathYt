// ===== Lottery rig v3 (longer cut) — extra recipes: hud · blabel · office · robot · steps · usmap · years =====
// Generic illustrations only (no real logos, no photos of Tipton). Appended after shared.js, before the cut file.
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, countAt, hash, hit, wobble } = B;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const ball = B.lball, BALL = ['#FF3B30', '#F2B705', '#2c3e66', '#F5F3EE', '#1FA366'];
  const pinPath = g => { g.beginPath(); g.moveTo(0, 36); g.bezierCurveTo(-46, -6, -34, -40, 0, -40); g.bezierCurveTo(34, -40, 46, -6, 0, 36); g.closePath(); };
  const pin = (g, x, y, s, th, k = 1) => { g.save(); g.translate(x, y); g.scale(s * k, s * k); B.shadowed(g, () => pinPath(g), th.bad, 0.1, { k: 0.7 }); g.fillStyle = th.paper; g.beginPath(); g.arc(0, -10, 14, 0, 7); g.fill(); g.restore(); };
  const figure = (g, x, y, th, man, s = 1, tint) => { g.save(); g.translate(x, y); g.scale(s, s); clay(g, -44, 8, 88, 118, 30, man ? th.navy : (tint || '#C9C3B4'), { shadowK: 0.4 }); g.fillStyle = man ? '#E7C79B' : '#E7E2D6'; g.beginPath(); g.arc(0, -26, 38, 0, 7); g.fill(); if (man) { g.fillStyle = th.bad; g.beginPath(); g.moveTo(-9, 12); g.lineTo(9, 12); g.lineTo(0, 44); g.closePath(); g.fill(); } g.restore(); };
  const slip = (g, x, y, rot, th, s = 1) => { g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s); paper(g, -26, -20, 52, 40, 6, { lift: 0.2, grain: false }); txt(g, '##', 0, 1, F.mono(18), th.ink); g.restore(); };
  const header = (g, x0, y0, w, h, title, th, size = 54, band = 90, rad = 28) => { g.save(); rr(g, x0, y0, w, h, rad); g.clip(); g.fillStyle = th.navy; g.fillRect(x0, y0, w, band); g.restore(); txt(g, title, x0 + 40, y0 + band / 2 + 2, F.hero(size), th.paper, 'left'); };
  const PIPS = { 1: [[0, 0]], 2: [[-1, -1], [1, 1]], 3: [[-1, -1], [0, 0], [1, 1]], 4: [[-1, -1], [1, -1], [-1, 1], [1, 1]], 5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]], 6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]] };
  const die = (g, x, y, s, val, rot, alpha = 1) => { g.save(); g.globalAlpha *= alpha; g.translate(x, y); g.rotate(rot); clay(g, -s / 2, -s / 2, s, s, s * 0.2, '#F5F3EE', { shadowK: 0.4 }); g.fillStyle = '#0B0F14'; for (const [a, b] of PIPS[val]) { g.beginPath(); g.arc(a * s * 0.26, b * s * 0.26, s * 0.085, 0, 7); g.fill(); } g.restore(); };

  // ---------- hud (screen): the LIVE REAL NUMBER. keys: [{at, label, v, prefix, suffix, dec, tone}] — rolls between keys ----------
  B.register('hud', {
    defaults: { keys: [] }, ownEnter: true, size: () => [372, 70],
    draw(g, p, env) {
      const t = env.t, th = env.theme, ks = p.keys; let i = 0; for (let j = 0; j < ks.length; j++) if (t >= ks[j].at) i = j;
      const k = ks[i], pk = ks[Math.max(0, i - 1)], e = i ? clamp((t - k.at) / 0.6) : 1, u = ease.out(e), bump = i && t >= k.at ? hit(t - k.at, 9) : 0;
      g.save(); const s = 1 + 0.07 * bump; g.scale(s, s); g.fillStyle = 'rgba(11,15,20,.82)'; rr(g, -186, -35, 372, 70, 16); g.fill(); g.strokeStyle = 'rgba(245,243,238,.3)'; g.lineWidth = 2; rr(g, -186, -35, 372, 70, 16); g.stroke();
      const lab = (kk, a, dy) => { g.save(); g.globalAlpha = a; const ls = kk.label.split('\n'); ls.forEach((l, n) => txt(g, l, -170, dy + (n - (ls.length - 1) / 2) * 21, F.mono(16), th.gold, 'left')); g.restore(); };
      const same = i && typeof k.v === 'number' && typeof pk.v === 'number' && (pk.prefix || '') === (k.prefix || '') && (pk.suffix || '') === (k.suffix || '') && (pk.dec || 0) === (k.dec || 0);
      const val = (kk, a, dy, v) => { g.save(); g.globalAlpha = a; g.translate(0, dy); const col = B.tone(kk.tone || 'paper', false);
        if (typeof kk.v === 'number') { const o = { font: F.hero(50), size: 50, color: col, prefix: kk.prefix || '', decimals: kk.dec || 0, speed: (same && e < 1) ? 40 : 0 }, nw = B.rollWidth(g, v, o).w, sw = kk.suffix ? mw(kk.suffix, F.hero(26)) : 0, x = 172 - (nw + sw); roll(g, v, x, 0, { ...o, align: 'left' }); if (kk.suffix) txt(g, kk.suffix, x + nw + 3, 10, F.hero(26), col, 'left'); }
        else { const w = mw(String(kk.v), F.hero(50)); txt(g, String(kk.v), 172 - w, 2, F.hero(50), col, 'left'); } g.restore(); };
      if (same) { lab(k, u, 0); if (u < 1) lab(pk, 1 - u, 0); val(k, 1, 0, lerp(pk.v, k.v, u)); }
      else { if (i && u < 1) { lab(pk, 1 - u, -12 * u); val(pk, 1 - u, -14 * u, pk.v); } lab(k, u, 12 * (1 - u)); val(k, u, 14 * (1 - u), k.v); }
      g.restore();
    },
  });

  // ---------- blabel (screen): small pinned beat label that changes per section. keys: [{at, text}]. Drawn left-aligned from x=0 ----------
  B.register('blabel', {
    defaults: { keys: [] }, ownEnter: true, size: () => [320, 44],
    draw(g, p, env) {
      const t = env.t, th = env.theme, ks = p.keys; let i = 0; for (let j = 0; j < ks.length; j++) if (t >= ks[j].at) i = j;
      const k = ks[i], pk = ks[Math.max(0, i - 1)], u = i ? ease.out(clamp((t - k.at) / 0.4)) : 1;
      const chip = (kk, a, dy) => { const w = mw(kk.text, F.cap(24)) + 40; g.save(); g.globalAlpha = a; g.translate(0, dy); clay(g, 0, -22, w, 44, 12, th.gold, { shadowK: 0.3 }); txt(g, kk.text, w / 2, 1, F.cap(24), '#0B0F14'); g.restore(); };
      if (i && u < 1) chip(pk, 1 - u, -16 * u); chip(k, u, 16 * (1 - u));
    },
  });

  // ---------- office: the case board — name tag, "where did he work?" building, computers, cables to many states ----------
  B.register('office', {
    defaults: { nameAt: 99999, buildAt: 99999, compAt: 99999, linkAt: 99999, per: 0.12 }, size: () => [1000, 860],
    anchors: () => ({ name: [270, -365, 380, 130], bld: [-260, -10, 380, 560], sign: [-260, -165, 350, 100], comp: [-260, 190, 340, 130], pins: [300, -60, 380, 330], many: [300, 215, 420, 90] }),
    draw(g, p, env) {
      const { t, theme: th, lift } = env, x0 = -500, y0 = -430; paper(g, x0, y0, 1000, 860, 28, { lift }); header(g, x0, y0, 1000, 860, 'THE CASE BOARD', th, 50);
      const bx = -440, bw = 360, by = -250, bh = 550, lit = clamp((t - p.buildAt) / 0.6);
      g.fillStyle = '#CFC9BA'; rr(g, bx, by, bw, bh, 10); g.fill(); g.fillStyle = '#59606B'; rr(g, bx - 14, by - 24, bw + 28, 38, 10); g.fill();
      // sign plate: "?" until buildAt, then flips to plain text
      const sk = spring(Math.max(0, t - p.buildAt), 'snappy');
      if (t < p.buildAt) { g.save(); g.strokeStyle = th.inkSoft; g.lineWidth = 5; g.setLineDash([14, 10]); rr(g, bx + 15, by + 20, bw - 30, 100, 12); g.stroke(); g.setLineDash([]); txt(g, '?', bx + bw / 2, by + 74 + Math.sin(t * 5) * 3, F.hero(96), th.badInk); g.restore(); }
      else { g.save(); g.translate(bx + bw / 2, by + 70); g.scale(1, 0.15 + 0.85 * sk); clay(g, -165, -50, 330, 100, 12, th.navy, { shadowK: 0.4 }); txt(g, 'MULTI-STATE', 0, -17, F.cap(25), th.paper); txt(g, 'LOTTERY ASSOCIATION', 0, 19, F.cap(25), th.gold); g.restore(); }
      for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) { const wx = bx + 40 + c * 110, wy = by + 150 + r * 85, lk = clamp((lit * 3 - (r * 0.4 + c * 0.15))); g.fillStyle = lk > 0.5 ? '#F2D38A' : '#59606B'; rr(g, wx, wy, 70, 52, 6); g.fill();
        if (r === 3) { const ct = t - (p.compAt + c * 0.14); if (ct > 0) { const k = spring(ct, 'bouncy'); g.save(); g.translate(wx + 35, wy + 26); g.scale(k, k); g.fillStyle = '#1b2540'; rr(g, -31, -22, 62, 44, 6); g.fill(); for (let l = 0; l < 3; l++) { g.fillStyle = (l + c + Math.floor(t * 4)) % 3 === 0 ? '#1FA366' : '#F2B705'; g.beginPath(); g.arc(-18 + l * 14, 10, 3.5, 0, 7); g.fill(); } g.fillStyle = 'rgba(245,243,238,.35)'; g.fillRect(-24, -12, 48, 4); g.fillRect(-24, -4, 30, 4); g.restore(); } } }
      g.fillStyle = '#3a4350'; rr(g, bx + bw / 2 - 34, by + 470, 68, 80, 8); g.fill();
      // cables to pins
      const P = [[170, -190], [340, -205], [460, -105], [225, -55], [400, 25], [170, 85]], hub = [-80, 150];
      P.forEach(([px, py], i) => { const kk = ease.out(clamp((t - (p.linkAt + i * p.per)) / 0.5)); if (kk <= 0) return; g.save(); g.strokeStyle = '#59606B'; g.lineWidth = 7; g.lineCap = 'round'; g.beginPath(); const n = Math.max(2, Math.floor(26 * kk)); for (let s = 0; s <= n; s++) { const u = (s / 26), mx = lerp(hub[0], px, 0.5), x = (1 - u) * (1 - u) * hub[0] + 2 * (1 - u) * u * mx + u * u * px, y = (1 - u) * (1 - u) * hub[1] + 2 * (1 - u) * u * (hub[1] * 0.4 + py * 0.6) + u * u * py; s ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); g.restore();
        const pt = t - (p.linkAt + i * p.per + 0.4); if (pt > 0) { pin(g, px, py - 10, 0.85, th, spring(pt, 'bouncy')); burst(g, px, py - 20, 44, th.bad, pt - 0.04, 7, 0.3); } });
      { const mt = t - (p.linkAt + 6 * p.per + 0.3); if (mt > 0) { g.save(); g.translate(300, 215); const s = 1 + 0.1 * hit(mt, 8); g.scale(s, s); g.globalAlpha = clamp(mt / 0.1); txt(g, 'MANY STATES', 0, 0, F.hero(70), th.ink); g.restore(); } }
      txt(g, 'ILLUSTRATION', x0 + 24, y0 + 836, F.mono(17), th.inkSoft, 'left');
      // name tag (pinned from above)
      { const nt = t - p.nameAt; if (nt > 0) { const k = spring(nt, 'bouncy'); g.save(); g.translate(270, -365 - (1 - k) * 320); g.rotate(-0.05 + (1 - k) * 0.12); paper(g, -190, -62, 380, 124, 12, { lift: 0.35 }); txt(g, 'EDDIE TIPTON', 0, 6, F.hero(60), th.ink); g.fillStyle = th.bad; g.beginPath(); g.arc(0, -52, 11, 0, 7); g.fill(); g.restore(); } }
    },
  });

  // ---------- robot: paper robot shaking a dice cup. roll → numbers pop out → later "knows the dice before the throw" ----------
  B.register('robot', {
    defaults: { shakeAt: 99999, rollAt: 99999, picksAt: 99999, peekAt: 99999, throwAt: 99999, nums: [17, 4, 33, 9, 26] }, size: () => [900, 880],
    anchors: () => ({ head: [-150, -190, 240, 200], cup: [160, 0, 200, 220], table: [250, 215, 330, 90], dice: [270, 200, 190, 100], play: [230, 90, 460, 380], balls: [0, 335, 820, 130], hdr: [0, -395, 820, 90] }),
    draw(g, p, env) {
      const { t, theme: th, lift } = env, x0 = -450, y0 = -440; paper(g, x0, y0, 900, 880, 28, { lift }); header(g, x0, y0, 900, 880, 'A LOTTERY COMPUTER', th, 50);
      const rx = -150, idle = Math.sin(t * 2) * 4;
      // table
      clay(g, 70, 258, 400, 34, 10, th.manila, { shadowK: 0.3 });
      // body + head
      g.save(); g.translate(rx, idle * 0.5); clay(g, -110, -90, 220, 230, 28, th.navy, { shadowK: 0.5 }); g.fillStyle = 'rgba(245,243,238,.18)'; rr(g, -70, -50, 140, 90, 12); g.fill();
      for (let l = 0; l < 3; l++) { g.fillStyle = (l + Math.floor(t * 3)) % 3 === 0 ? '#1FA366' : l === 1 ? '#F2B705' : '#FF3B30'; g.beginPath(); g.arc(-36 + l * 36, -8, 9, 0, 7); g.fill(); }
      clay(g, -60, 140, 40, 70, 10, '#1b2540', { shadowK: 0.3 }); clay(g, 20, 140, 40, 70, 10, '#1b2540', { shadowK: 0.3 });
      const bl = (Math.floor(t * 1.4) % 5 === 0 && (t * 1.4) % 1 < 0.12);
      clay(g, -92, -250, 184, 150, 30, '#E7E2D6', { shadowK: 0.5 }); g.strokeStyle = '#59606B'; g.lineWidth = 8; g.beginPath(); g.moveTo(0, -250); g.lineTo(0, -292); g.stroke(); g.fillStyle = th.bad; g.beginPath(); g.arc(0, -300, 15 + (hit(((t * 1.2) % 1), 6)) * 4, 0, 7); g.fill();
      for (const ex of [-38, 38]) { g.fillStyle = '#fff'; g.beginPath(); g.ellipse(ex, -182, 22, bl ? 3 : 24, 0, 0, 7); g.fill(); if (!bl) { g.fillStyle = '#0B0F14'; g.beginPath(); g.arc(ex + (t >= p.peekAt && t < p.throwAt ? 5 : 0), -178, 10, 0, 7); g.fill(); } }
      g.fillStyle = '#59606B'; rr(g, -34, -126, 68, 12, 6); g.fill();
      g.restore();
      // phases
      const rolling = t >= p.rollAt && t < p.rollAt + 1.0, peek = t >= p.peekAt && t < p.throwAt, thrown = t >= p.throwAt;
      const handUp = !peek && !thrown, shaking = t >= p.shakeAt && t < p.rollAt;
      // arm
      const cupHand = [130, -40 + idle * 0.5];
      g.save(); g.strokeStyle = th.navy; g.lineWidth = 34; g.lineCap = 'round'; g.beginPath(); g.moveTo(rx + 100, -50); const ax = handUp ? cupHand[0] - 20 : rx + 190, ay = handUp ? cupHand[1] + 40 : 90; g.quadraticCurveTo(rx + 190, -60, ax + (shaking ? Math.sin(t * 34) * 6 : 0), ay); g.stroke(); g.restore();
      const cup = (cx, cy, ang, a) => { g.save(); g.globalAlpha *= a; g.translate(cx, cy); g.rotate(ang); g.beginPath(); g.moveTo(-62, -80); g.lineTo(62, -80); g.lineTo(46, 80); g.lineTo(-46, 80); g.closePath(); B.shadowed(g, () => { g.beginPath(); g.moveTo(-62, -80); g.lineTo(62, -80); g.lineTo(46, 80); g.lineTo(-46, 80); g.closePath(); }, th.manila, 0.2, { k: 0.6 }); g.fillStyle = 'rgba(11,15,20,.14)'; g.fillRect(-56, -20, 112, 18); g.fillRect(-52, 30, 104, 18); g.strokeStyle = 'rgba(11,15,20,.3)'; g.lineWidth = 3; g.stroke(); g.restore(); };
      const faces = (i, seed) => 1 + Math.floor(hash(Math.floor(t * 16) + i * 7 + seed) * 6), FIN = [[2, 5], [6, 4]];
      const diceAt = (i, base) => [270 + i * 100 + base, 222];
      if (!peek && !thrown) {
        if (rolling) { const u = clamp((t - p.rollAt) / 0.95); cup(cupHand[0] + 20, cupHand[1] - 10, Math.sin(clamp((t - p.rollAt) / 0.9) * Math.PI) * 1.25, 1);
          for (let i = 0; i < 2; i++) { const [tx, ty] = diceAt(i, 0), eu = ease.out(u), x = lerp(cupHand[0] + 60, tx, eu), y = lerp(cupHand[1] - 20, ty, u * u) - Math.sin(u * Math.PI) * 130 - 26 * Math.abs(Math.sin(u * 9)) * (1 - u), v = u > 0.82 ? FIN[0][i] : faces(i, 0); die(g, x, y, 76, v, (1 - u) * (7 + i * 4), 1); } }
        else { cup(cupHand[0] + 20 + (shaking ? Math.sin(t * 34) * 5 : 0), cupHand[1] - 10 + (shaking ? Math.cos(t * 41) * 5 : 0), shaking ? Math.sin(t * 34) * 0.2 : Math.sin(t * 2) * 0.02, 1); if (t >= p.rollAt + 1.0) for (let i = 0; i < 2; i++) { const [x, y] = diceAt(i, 0); die(g, x, y, 76, FIN[0][i], i ? 0.12 : -0.1, 1); } }
      } else if (peek) { const k = ease.out(clamp((t - p.peekAt) / 0.35)); for (let i = 0; i < 2; i++) { const [x, y] = diceAt(i, 40); die(g, x, y, 76, FIN[1][i], i ? 0.12 : -0.1, 1); } cup(lerp(300, 345, k) + 0, lerp(40, 205, k) - 4, 0, 0.5);
        const ek = spring(Math.max(0, t - p.peekAt - 0.2), 'bouncy'); g.save(); g.translate(345, 40 + Math.sin(t * 5) * 5); g.scale(ek, ek); clay(g, -60, -34, 120, 68, 34, '#F5F3EE', { shadowK: 0.4 }); g.fillStyle = th.navy; g.beginPath(); g.arc(0, 0, 22, 0, 7); g.fill(); g.fillStyle = '#0B0F14'; g.beginPath(); g.arc(0, 0, 10, 0, 7); g.fill(); g.fillStyle = '#fff'; g.beginPath(); g.arc(-6, -6, 4, 0, 7); g.fill(); g.restore();
      } else { const u = clamp((t - p.throwAt) / 0.9), lift2 = ease.out(clamp((t - p.throwAt) / 0.35)); if (u < 1) cup(lerp(345, 340, lift2), lerp(205, -40, lift2) - 4, lift2 * 0.5, 1 - lift2);
        for (let i = 0; i < 2; i++) { const [x, y] = diceAt(i, 40); const hop = Math.abs(Math.sin(u * Math.PI * 2.5)) * 60 * (1 - u); die(g, x, y - hop, 76, u > 0.7 ? FIN[1][i] : faces(i, 3), (1 - u) * (5 + i * 3), 1); }
        const ek = clamp((t - p.throwAt - 0.6) / 0.3); if (ek > 0) { g.save(); g.globalAlpha = ek; txt(g, 'SAME NUMBERS', 345, 100 - 0, F.mono(24), th.badInk); g.restore(); } }
      // numbers pop out (nobody can guess them)
      for (let i = 0; i < 5; i++) { const x = -330 + i * 165, y = 345, ct = t - (p.picksAt + i * 0.16); if (ct <= 0) { g.fillStyle = rgba(th.ink, 0.12); g.beginPath(); g.arc(x, y, 50, 0, 7); g.fill(); txt(g, '?', x, y + 2, F.hero(54), th.inkSoft); } else { const k = spring(ct, 'bouncy'); ball(g, x, y - (1 - k) * 90 * 0, 52 * (0.4 + 0.6 * k), BALL[i], p.nums[i]); burst(g, x, y, 62, th.bad, ct - 0.04, 7, 0.3); } }
      txt(g, 'ILLUSTRATION', x0 + 24, y0 + 856, F.mono(17), th.inkSoft, 'left');
    },
  });

  // ---------- steps: three numbered boxes that open ONE AT A TIME. 1 code → numbers known · 2 hands numbers over · 3 they win, share ----------
  B.register('steps', {
    defaults: { open: [99999, 99999, 99999], codeAt: 99999, predAt: 99999, passAt: 99999, per: 0.34, winAt: 99999, shareAt: 99999, nums: [8, 15, 22, 31, 40], heads: ['HE WROTE CODE', 'HE GAVE THE NUMBERS', 'THEY WON · THEY SHARED'], tags: ['HE TOLD A COURT', 'HE SAID', 'HE SAID'] }, size: () => [940, 1090],
    anchors: () => { const a = {}; for (let i = 0; i < 3; i++) { const y = -540 + i * 360; a['b' + (i + 1)] = [0, y + 170, 880, 340]; a['h' + (i + 1)] = [0, y + 48, 880, 96]; } a.pred = [81, -540 + 290, 470, 70]; a.scroll = [-225, -540 + 185, 300, 170]; return a; },
    draw(g, p, env) {
      const { t, theme: th, lift } = env, x0 = -440, w = 880;
      for (let i = 0; i < 3; i++) {
        const y = -540 + i * 360, ot = t - p.open[i], k = ot < 0 ? 0 : spring(ot, 'snappy'), h = lerp(96, 340, Math.min(1, k)), ca = clamp((ot - 0.22) / 0.25), bad = i === 2 ? th.badInk : th.ink;
        paper(g, x0, y, w, h, 22, { lift: lift + (ot > 0 && ot < 0.4 ? 0.3 : 0) });
        g.save(); rr(g, x0, y, w, h, 22); g.clip(); g.fillStyle = th.navy; g.fillRect(x0, y, w, 96);
        // numbered badge + header
        const nk = ot < 0 ? 1 : 1 + 0.25 * hit(ot, 8); g.save(); g.translate(x0 + 56, y + 48); g.scale(nk, nk); g.fillStyle = ot >= 0 ? th.bad : '#59606B'; g.beginPath(); g.arc(0, 0, 34, 0, 7); g.fill(); txt(g, String(i + 1), 0, 2, F.hero(46), th.paper); g.restore();
        txt(g, 'STEP ' + (i + 1) + ': ' + p.heads[i], x0 + 112, y + 50, F.hero(i === 2 ? 40 : 44), ot >= 0 ? th.paper : rgba(th.paper, 0.45), 'left');
        if (ca > 0) { g.globalAlpha = ca; txt(g, p.tags[i], x0 + w - 28, y + 120, F.mono(19), th.inkSoft, 'right'); g.translate(0, y); g.scale(0.9, 0.9);
          if (i === 0) { // scroll slides into the machine, then the numbers are known
            const cu = ease.out(clamp((t - p.codeAt) / 0.7)), sx = lerp(x0 + 40, x0 + 300, cu); clay(g, x0 + 520, 140, 300, 150, 20, th.navy, { shadowK: 0.4 }); g.fillStyle = 'rgba(245,243,238,.2)'; g.beginPath(); g.arc(x0 + 670, 215, 46, 0, 7); g.fill(); txt(g, 'COMPUTER', x0 + 670, 268, F.mono(18), 'rgba(245,243,238,.7)');
            g.save(); g.translate(sx, 0); paper(g, 0, 130, 230, 150, 10, { fill: '#F2E6C9', lift: 0.25 }); for (let l = 0; l < 6; l++) { const lk = clamp((t - p.codeAt + 0.45 - l * 0.07) / 0.2); g.fillStyle = rgba(th.ink, 0.5); g.fillRect(18 + (l % 3) * 16, 150 + l * 20, lk * (80 + hash(l * 3.1) * 110), 8); } g.restore(); txt(g, '{ CODE }', x0 + 150 + cu * 120, 120 - 0, F.mono(22), th.badInk);
            for (let n = 0; n < 5; n++) { const bx = x0 + 330 + n * 100, by = 322, ct = t - (p.predAt + n * 0.14); if (ct <= 0) { g.fillStyle = rgba(th.ink, 0.12); g.beginPath(); g.arc(bx, by, 32, 0, 7); g.fill(); txt(g, '?', bx, by + 2, F.hero(36), th.inkSoft); } else { const kk = spring(ct, 'bouncy'); ball(g, bx, by, 34 * (0.4 + 0.6 * kk), BALL[n], p.nums[n]); } }
            txt(g, 'HE CAN', x0 + 100, 306, F.cap(24), th.inkSoft); txt(g, 'PREDICT THEM', x0 + 100, 338, F.cap(24), th.badInk);
          } else if (i === 1) { // he passes number slips to others
            figure(g, x0 + 110, 235, th, true, 1.05); for (let n = 0; n < 3; n++) figure(g, x0 + 430 + n * 160, 240, th, false, 0.95);
            txt(g, 'HE', x0 + 110, 340, F.mono(22), th.inkSoft); txt(g, 'OTHER PEOPLE', x0 + 590, 340, F.mono(22), th.inkSoft);
            for (let n = 0; n < 3; n++) { const o = (t - (p.passAt + n * p.per)) / 0.5; if (o <= 0) continue; const u = ease.inOut(clamp(o)), tx = x0 + 430 + n * 160; slip(g, lerp(x0 + 170, tx - 20, u), 225 - Math.sin(u * Math.PI) * 70, (u - 0.5) * 0.6, th); if (o >= 1) slip(g, tx + 10, 205, 0.12 * (n - 1), th, 0.9); }
          } else { // they win, then a slice of the money goes back
            for (let n = 0; n < 3; n++) figure(g, x0 + 100 + n * 160, 250, th, false, 0.95); figure(g, x0 + 780, 235, th, true, 1.05); txt(g, 'HE', x0 + 780, 340, F.mono(22), th.inkSoft); txt(g, 'THEY', x0 + 260, 340, F.mono(22), th.inkSoft);
            for (let n = 0; n < 3; n++) { const wt = t - (p.winAt + n * 0.16); if (wt > 0) { const kk = spring(wt, 'bouncy'); g.save(); g.translate(x0 + 100 + n * 160, 160 - kk * 30); g.scale(kk, kk); g.rotate(-0.08 + n * 0.08); paper(g, -48, -28, 96, 56, 8, { lift: 0.25, grain: false }); txt(g, 'WIN', 0, -8, F.cap(17), th.goodInk); txt(g, '$$$', 0, 14, F.hero(22), th.goodInk); g.restore(); burst(g, x0 + 100 + n * 160, 140, 50, th.good, wt - 0.04, 7, 0.3); } }
            for (let n = 0; n < 5; n++) { const o = (t - (p.shareAt + n * 0.14)) / 0.6; if (o <= 0) continue; const u = ease.inOut(clamp(o)), sx0 = x0 + 100 + (n % 3) * 160, sy0 = 215; const cx = lerp(sx0, x0 + 760, u), cy = lerp(sy0, 215, u) - Math.sin(u * Math.PI) * 90; if (u >= 1) continue; g.save(); g.fillStyle = th.gold; g.strokeStyle = '#a77f00'; g.lineWidth = 3; g.beginPath(); g.arc(cx, cy, 20, 0, 7); g.fill(); g.stroke(); txt(g, '$', cx, cy + 1, F.hero(22), '#7a5c00'); g.restore(); }
          }
          if (i === 0) txt(g, 'ILLUSTRATION', x0 + w - 28, 366, F.mono(14), th.inkSoft, 'right');
        }
        g.restore();
      }
    },
  });

  // ---------- usmap: tile-grid map of the U.S. (generic, no state names); five tiles light up ----------
  const MAPROWS = ['XXXXX..XXX.', '.XXXXXXXXXX', '.XXXXXXXXXX', '.XXXXXXXXX.', '..XXXXXXXX.', '...XXX..XX.', '......X...X'];
  B.register('usmap', {
    defaults: { at: 99999, per: 0.16, endAt: 99999, hl: [[2, 1], [5, 2], [8, 1], [3, 4], [7, 3]], label: '5 STATES', sub: 'PLEADED GUILTY' }, ownEnter: true, size: () => [900, 800],
    anchors: () => ({ grid: [0, -50, 800, 520], label: [0, 285, 700, 150], head: [0, -345, 820, 90] }),
    draw(g, p, env) {
      const { t, theme: th, lift } = env, x0 = -450, y0 = -400, a0 = clamp(env.lt / 0.1), tt = t >= p.endAt ? t - p.endAt : t; g.save(); g.globalAlpha = a0; paper(g, x0, y0, 900, 800, 28, { lift }); header(g, x0, y0, 900, 800, 'THE MAP · ILLUSTRATION', th, 40);
      const S = 66, G = 8, ox = -(11 * (S + G) - G) / 2, oy = -270;
      MAPROWS.forEach((row, r) => { for (let c = 0; c < 11; c++) if (row[c] === 'X') { const hli = p.hl.findIndex(h => h[0] === c && h[1] === r), x = ox + c * (S + G), y = oy + r * (S + G), appear = clamp((env.lt - (r * 0.03 + c * 0.012)) / 0.2);
        if (hli < 0) { g.save(); g.globalAlpha = a0 * appear; g.fillStyle = '#D8D3C7'; rr(g, x, y, S, S, 10); g.fill(); g.restore(); }
        else { const ti = tt - (p.at + hli * p.per), k = ti < 0 ? 0 : spring(ti, 'bouncy'); g.save(); g.translate(x + S / 2, y + S / 2); g.scale(1 + 0.22 * k * (ti < 0.5 ? 1 : 0) + 0.0, 1 + 0.22 * k * (ti < 0.5 ? 1 : 0)); g.fillStyle = ti < 0 ? '#D8D3C7' : th.bad; B.shadowed(g, () => rr(g, -S / 2, -S / 2, S, S, 10), ti < 0 ? '#D8D3C7' : th.bad, ti < 0 ? 0 : 0.18, { k: 0.6 }); if (ti > 0) { txt(g, String(hli + 1), 0, 2, F.hero(36), th.paper); } g.restore(); if (ti > 0) burst(g, x + S / 2, y + S / 2, 70, th.bad, ti - 0.04, 8, 0.35); } } });
      const done = tt >= p.at + 4 * p.per + 0.1, k2 = clamp((tt - (p.at + 4 * p.per)) / 0.25);
      if (done) { g.save(); g.translate(0, 285); const s = 1 + 0.12 * hit(tt - (p.at + 4 * p.per), 8) + (env.hot === 'label' ? 0.03 * env.hotK : 0); g.scale(s, s); g.globalAlpha = k2; txt(g, p.label, 0, 0, F.hero(124), th.badInk); g.restore(); g.save(); g.globalAlpha = k2; txt(g, '(' + p.sub + ')', 0, 365, F.mono(26), th.inkSoft); g.restore(); }
      txt(g, 'WHICH FIVE: NOT SHOWN', x0 + 28, y0 + 770, F.mono(16), th.inkSoft, 'left'); g.restore();
    },
  });

  // ---------- years: $16.5M ÷ $50K a year. A real counted grid: one tile = one year (330 tiles); the counter is the tile count ----------
  B.register('years', {
    defaults: { startAt: 99999, fullAt: 99999, payAt: 99999, total: 330 }, size: () => [940, 1100],
    anchors: () => ({ head: [0, -500, 880, 100], pay: [0, -380, 820, 120], grid: [0, -90, 836, 450], count: [0, 330, 860, 260] }),
    draw(g, p, env) {
      const { t, theme: th, lift } = env, x0 = -470, y0 = -550, w = 940; paper(g, x0, y0, w, 1100, 28, { lift }); header(g, x0, y0, w, 1100, '$16.5M ÷ $50K A YEAR', th, 48);
      txt(g, 'OUR MATH', x0 + w - 30, y0 + 46, F.mono(22), th.gold, 'right');
      // pay row: cash bundle = one year of pay
      { const pk = spring(Math.max(0, t - p.payAt), 'snappy'), a = clamp((t - p.payAt) / 0.1); g.save(); g.globalAlpha = a; g.translate(0, y0 + 160 + (1 - pk) * 30); for (let n = 0; n < 4; n++) { g.save(); g.translate(-300 + n * 7, -n * 5); clay(g, 0, -34, 120, 66, 8, '#1FA366', { shadowK: 0.4 }); g.fillStyle = th.paper; g.fillRect(48, -34, 24, 66); g.restore(); } txt(g, '$50K', -120 + 108, 4, F.hero(60), th.ink, 'left'); txt(g, '= 1 YEAR OF WORK', 120 + 22, 6, F.cap(30), th.inkSoft, 'left'); g.restore(); }
      // grid: 22 x 15 tiles
      const TW = 34, TH = 26, GX = 4, gx0 = -(22 * (TW + GX) - GX) / 2, gy0 = y0 + 250, u = clamp((t - p.startAt) / Math.max(0.01, p.fullAt - p.startAt)), n = t < p.startAt ? 0 : p.total * (u <= 0 ? 0 : Math.pow(u, 1.5)), cnt = Math.floor(n + (u >= 1 ? 0.999 : 0));
      for (let i = 0; i < p.total; i++) { const c = i % 22, r = Math.floor(i / 22), x = gx0 + c * (TW + GX), y = gy0 + r * (TH + GX), on = i < cnt; g.fillStyle = on ? (i === cnt - 1 && u < 1 ? th.gold : '#2c3e66') : 'rgba(11,15,20,.09)'; rr(g, x, y, TW, TH, 5); g.fill(); }
      txt(g, 'ONE TILE = ONE YEAR', 0, gy0 + 15 * (TH + GX) + 22, F.mono(20), th.inkSoft);
      // counter
      const fin = u >= 1, land = t - p.fullAt, o = { font: F.hero(190), size: 190, color: fin ? th.badInk : th.ink, speed: 0 }, nw = B.rollWidth(g, cnt, o).w, sw = mw(' YEARS', F.hero(96)), tot = nw + sw;
      g.save(); g.translate(0, y0 + 960); const s = 1 + (fin && land < 0.7 ? 0.12 * hit(land, 7) : 0) + (env.hot === 'count' ? 0.03 * env.hotK : 0); g.scale(s, s); roll(g, cnt, -tot / 2, 0, { ...o, align: 'left' }); txt(g, ' YEARS', -tot / 2 + nw, 38, F.hero(96), fin ? th.badInk : th.ink, 'left'); if (fin) marker(g, -tot / 2, 112, tot, 9, th.badInk, clamp(land / 0.3), 0.9); g.restore();
      if (fin) burst(g, 0, y0 + 960, 300, th.bad, land - 0.05, 18, 0.5);
    },
  });
})();
