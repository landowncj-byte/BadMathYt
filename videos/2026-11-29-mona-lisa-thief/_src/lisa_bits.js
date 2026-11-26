// ===== Mona Lisa thief — custom recipes (wall, press, queue, cal2, room, letter, checkers, cuffs, verd2, famous) =====
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, burst, hit, wobble } = B;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const pop = (t, o = 'snappy') => clamp(spring(t, o), 0, 1.25);
  const RED = '#E0281E', GOLD = '#F2B705', WALL = '#6E1F2B', WALL2 = '#4F1520';
  const HAND = s => `italic 800 ${s}px Inter`;
  const imgOf = src => { const im = B.images && B.images[src]; if (!im) throw new Error('lisa: image not preloaded: ' + src); return im; };

  // ---- museum wall background
  function wallBase(g, x0, y0, w, h, th) {
    g.save(); rr(g, x0, y0, w, h, 22); g.clip();
    const lg = g.createLinearGradient(0, y0, 0, y0 + h); lg.addColorStop(0, '#7C2433'); lg.addColorStop(1, WALL2); g.fillStyle = lg; g.fillRect(x0, y0, w, h);
    g.fillStyle = 'rgba(0,0,0,.10)'; for (let i = 0; i < 22; i++) g.fillRect(x0 + i * (w / 22), y0, w / 44, h);
    g.fillStyle = '#2A1218'; g.fillRect(x0, y0 + h - 110, w, 110); g.fillStyle = '#C9A24A'; g.fillRect(x0, y0 + h - 116, w, 8); // floor + rail
    g.fillStyle = 'rgba(255,255,255,.07)'; g.fillRect(x0, y0 + 70, w, 8);
    g.restore(); g.strokeStyle = 'rgba(11,15,20,.4)'; g.lineWidth = 4; rr(g, x0, y0, w, h, 22); g.stroke();
  }
  // ghost rectangle (unfaded wallpaper where the painting hung) + 4 hooks
  function ghost(g, cx, cy, fw, fh, k = 1) {
    g.save(); g.globalAlpha *= k; g.fillStyle = 'rgba(255,225,200,.17)'; g.fillRect(cx - fw / 2, cy - fh / 2, fw, fh); g.strokeStyle = 'rgba(255,225,200,.35)'; g.lineWidth = 3; g.setLineDash([14, 10]); g.strokeRect(cx - fw / 2, cy - fh / 2, fw, fh); g.setLineDash([]);
    g.restore(); return hooks(g, cx, cy, fw, fh);
  }
  function hooks(g, cx, cy, fw, fh) {
    const P = [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([a, b]) => [cx + a * (fw / 2 - 26), cy + b * (fh / 2 - 26)]);
    for (const [x, y] of P) { g.fillStyle = '#E8C46A'; g.beginPath(); g.arc(x, y, 12, 0, 7); g.fill(); g.strokeStyle = '#2A1218'; g.lineWidth = 4; g.stroke(); g.fillStyle = '#2A1218'; g.beginPath(); g.arc(x, y, 4, 0, 7); g.fill(); }
    return P;
  }
  // framed painting (PD reproduction of the Mona Lisa) in a gold frame
  function painting(g, src, cx, cy, fw, fh, o = {}) {
    const im = imgOf(src), b = o.border || 26;
    g.save(); g.translate(cx, cy); if (o.rot) g.rotate(o.rot);
    B.shadowed(g, () => { g.beginPath(); g.rect(-fw / 2, -fh / 2, fw, fh); }, '#B98A25', 0.3);
    const lg = g.createLinearGradient(-fw / 2, -fh / 2, fw / 2, fh / 2); lg.addColorStop(0, '#F0CF73'); lg.addColorStop(0.5, '#B98A25'); lg.addColorStop(1, '#E8C46A'); g.fillStyle = lg; g.fillRect(-fw / 2, -fh / 2, fw, fh);
    g.strokeStyle = '#6B4A10'; g.lineWidth = 3; g.strokeRect(-fw / 2 + 5, -fh / 2 + 5, fw - 10, fh - 10); g.strokeRect(-fw / 2 + b - 4, -fh / 2 + b - 4, fw - 2 * b + 8, fh - 2 * b + 8);
    g.save(); g.beginPath(); g.rect(-fw / 2 + b, -fh / 2 + b, fw - 2 * b, fh - 2 * b); g.clip(); B.drawPhoto(g, im, -fw / 2 + b, -fh / 2 + b, fw - 2 * b, fh - 2 * b, { fx: 0.5, fy: 0.45 }); g.restore();
    g.restore();
  }
  // back-view person: head + hat + body
  function person(g, x, y, s, col, hat, o = {}) {
    g.save(); g.translate(x, y); g.scale(s, s);
    g.fillStyle = col; g.beginPath(); g.moveTo(-34, 0); g.quadraticCurveTo(-36, -80, 0, -88); g.quadraticCurveTo(36, -80, 34, 0); g.closePath(); g.fill(); g.fillStyle = 'rgba(0,0,0,.18)'; g.beginPath(); g.moveTo(0, -88); g.quadraticCurveTo(36, -80, 34, 0); g.lineTo(0, 0); g.closePath(); g.fill();
    g.fillStyle = '#E3BE96'; g.beginPath(); g.arc(0, -112, 24, 0, 7); g.fill();
    g.fillStyle = hat; if (o.bowler !== false) { g.beginPath(); g.arc(0, -120, 24, Math.PI, 0); g.fill(); g.fillRect(-34, -122, 68, 7); } else { g.beginPath(); g.arc(0, -118, 26, Math.PI * 0.95, Math.PI * 2.05); g.fill(); }
    if (o.arm) { g.strokeStyle = col; g.lineWidth = 13; g.lineCap = 'round'; g.beginPath(); g.moveTo(24, -76); g.lineTo(46, -112 - 8 * Math.sin(o.arm)); g.stroke(); g.fillStyle = '#E3BE96'; g.beginPath(); g.arc(48, -118 - 8 * Math.sin(o.arm), 8, 0, 7); g.fill(); }
    g.restore();
  }
  const COATS = ['#2c3e66', '#5a3a1e', '#1E7D4F', '#7a2b25', '#3a4350', '#8a5a2b', '#C9A24A', '#44335e'], HATS = ['#16202e', '#2b1d13', '#1a1a1a', '#3a2a1a'];
  B.lisaPerson = person;

  // ================= wall: painting hangs, gets lifted, empty ghost + hooks, MISSING stamp, painter counts hooks =================
  B.register('wall', {
    defaults: { w: 900, h: 1000, art: '', liftAt: 99999, stampAt: 99999, stampText: 'MISSING', stampSub: '21 AUG 1911', hooks: [], painterAt: 99999, cap: 'SALON CARRÉ · THE LOUVRE', empty: false, hot: null },
    size: p => [p.w, p.h],
    anchors: p => ({ frame: [0, -50, 470, 670], hooks: [0, -50, 470, 670], stamp: [0, 360, 760, 220], painter: [-330, 280, 220, 340] }),
    draw(g, p, env) {
      const { t, lt, theme: th, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, cx = 0, cy = -50, fw = 430, fh = 620;
      B.shadowed(g, () => rr(g, x0, y0, w, h, 22), WALL, lift); wallBase(g, x0, y0, w, h, th);
      txt(g, p.cap, 0, y0 + 44, F.monoX(24), 'rgba(255,225,200,.8)'); txt(g, 'ILLUSTRATION', x0 + w - 24, y0 + 22, F.mono(14), 'rgba(255,225,200,.55)', 'right');
      const lifted = p.empty || t >= p.liftAt;
      if (lifted) { const k = p.empty ? 1 : ease.out(lin(t, p.liftAt + 0.2, p.liftAt + 0.5)); ghost(g, cx, cy, fw, fh, k); }
      else { const sway = 0.004 * Math.sin(t * 1.5); hooks(g, cx, cy, fw, fh); painting(g, p.art, cx, cy, fw, fh, { rot: sway }); }
      if (!p.empty && t >= p.liftAt && t < p.liftAt + 0.9) { const u = lin(t, p.liftAt, p.liftAt + 0.9), e = ease.in(u); painting(g, p.art, cx + 760 * e, cy + 60 * e, fw * (1 - 0.3 * e), fh * (1 - 0.3 * e), { rot: 0.5 * e }); }
      // hook numbers 1..4
      const HP = [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([a, b]) => [cx + a * (fw / 2 - 26), cy + b * (fh / 2 - 26)]);
      p.hooks.forEach((ht, i) => { const o = t - ht; if (o < 0) return; const k = pop(o, 'bouncy'); g.save(); g.translate(HP[i][0], HP[i][1]); g.scale(k, k); g.strokeStyle = RED; g.lineWidth = 8; g.beginPath(); g.arc(0, 0, 36, 0, 7); g.stroke(); g.fillStyle = RED; g.beginPath(); g.arc(46, -42, 22, 0, 7); g.fill(); txt(g, String(i + 1), 46, -41, F.hero(30), '#fff'); g.restore(); });
      // painter
      if (t >= p.painterAt) { const o = t - p.painterAt, k = pop(o, 'heavy'); g.save(); g.translate(-325 - (1 - k) * 160, 330); g.globalAlpha = clamp(o / 0.1);
        person(g, 0, 0, 1.5, '#1b5e8a', '#C0392B', { bowler: false, arm: 1 + Math.sin(o * 6) }); g.fillStyle = '#F5F3EE'; rr(g, -64, 12, 128, 38, 8); g.fill(); txt(g, 'A PAINTER', 0, 31, F.cap(21), th.ink); g.restore(); }
      if (t >= p.stampAt) { g.save(); g.translate(0, 360); B.crimeStamp(g, th, t, { text: p.stampText, at: p.stampAt, size: 92, rot: -0.07, x: 0, y: 0 }); txt(g, p.stampSub, 0, 118 * clamp((t - p.stampAt) / 0.2), F.hero(66), '#F5F3EE'); g.restore(); }
    },
  });

  // ================= press: newspaper front pages showing the empty wall =================
  function miniWall(g, x, y, w, h) { g.save(); g.translate(x, y); g.fillStyle = '#7C2433'; g.fillRect(-w / 2, -h / 2, w, h); g.fillStyle = 'rgba(255,225,200,.28)'; g.fillRect(-w * 0.22, -h * 0.36, w * 0.44, h * 0.72); g.fillStyle = '#E8C46A'; for (const a of [-1, 1]) for (const b of [-1, 1]) { g.beginPath(); g.arc(a * w * 0.17, b * h * 0.29, 6, 0, 7); g.fill(); } g.strokeStyle = '#0B0F14'; g.lineWidth = 3; g.strokeRect(-w / 2, -h / 2, w, h); g.restore(); }
  B.register('press', {
    defaults: { w: 940, h: 1000, at: 99999, closedAt: 99999, closedText: 'CLOSED · 1 WEEK', heads: [['THE DAILY', 'STOLEN!', 'MONA LISA GONE'], ['LE JOURNAL', 'VOLÉE !', 'LA JOCONDE A DISPARU'], ['IL GIORNALE', 'RUBATA!', 'LA GIOCONDA SCOMPARSA']] },
    size: p => [p.w, p.h],
    draw(g, p, env) {
      const { t, theme: th } = env, pos = [[-230, -80, -0.09], [230, -50, 0.07], [0, 230, -0.02]], tint = ['#F1E8CF', '#EADFC0', '#F4EFE0'];
      p.heads.forEach((hd, i) => { const o = t - (p.at + i * 0.42); if (o < 0) return; const k = pop(o, 'heavy'), [x, y, r] = pos[i]; g.save(); g.translate(x + (i === 1 ? 1 : -1) * (1 - k) * 700 * (i === 2 ? 0 : 1), y + (i === 2 ? (1 - k) * 700 : 0)); g.rotate(r + (1 - k) * 0.5); g.globalAlpha = clamp(o / 0.08);
        const W = 420, H = 540; paper(g, -W / 2, -H / 2, W, H, 6, { fill: tint[i], lift: 0.3 }); g.fillStyle = '#0B0F14'; g.fillRect(-W / 2 + 18, -H / 2 + 18, W - 36, 8); txt(g, hd[0], 0, -H / 2 + 62, F.hero(40), '#0B0F14'); g.fillRect(-W / 2 + 18, -H / 2 + 92, W - 36, 3);
        txt(g, hd[1], 0, -H / 2 + 158, F.hero(i === 0 ? 96 : 92), RED); txt(g, hd[2], 0, -H / 2 + 224, F.cap(21), '#0B0F14'); miniWall(g, 0, 22, W - 70, 190); txt(g, 'THE EMPTY WALL', 0, 142, F.mono(15), '#59606B');
        g.fillStyle = 'rgba(11,15,20,.35)'; for (let j = 0; j < 4; j++) { g.fillRect(-W / 2 + 22, 170 + j * 22, 160, 8); g.fillRect(20, 170 + j * 22, 180, 8); } g.restore(); });
      txt(g, 'ILLUSTRATION · NOT REAL FRONT PAGES', 0, p.h / 2 - 16, F.mono(16), th.paper);
      if (t >= p.closedAt) { const o = t - p.closedAt, k = pop(o, 'heavy'); g.save(); g.translate(0, -p.h / 2 + 55 - (1 - k) * 200); g.rotate(-0.04); const W = 700; paper(g, -W / 2, -62, W, 124, 12, { fill: '#F5F3EE', lift: 0.5 }); g.strokeStyle = RED; g.lineWidth = 8; rr(g, -W / 2 + 10, -52, W - 20, 104, 8); g.stroke(); txt(g, p.closedText, 0, 4, F.hero(86), RED); g.restore(); }
    },
  });

  // ================= queue: crowd stares at the blank spot =================
  B.register('queue', {
    defaults: { w: 940, h: 940, at: 99999, cap: 'PEOPLE QUEUED TO STARE', sub: 'AT A BLANK WALL' }, size: p => [p.w, p.h],
    draw(g, p, env) {
      const { t, theme: th, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2;
      B.shadowed(g, () => rr(g, x0, y0, w, h, 22), WALL, lift); wallBase(g, x0, y0, w, h, th); ghost(g, 0, -150, 360, 520);
      txt(g, 'ILLUSTRATION', x0 + w - 24, y0 + 22, F.mono(14), 'rgba(255,225,200,.55)', 'right');
      // ropes
      g.strokeStyle = '#C9A24A'; g.lineWidth = 8; g.beginPath(); g.moveTo(-330, 150); g.lineTo(330, 150); g.stroke();
      for (const x of [-330, 0, 330]) { g.fillStyle = '#C9A24A'; g.beginPath(); g.arc(x, 150, 14, 0, 7); g.fill(); g.fillRect(x - 4, 150, 8, 90); }
      // three rows of people, appear in waves
      const rows = [[300, 1.0, 9], [380, 1.2, 8], [470, 1.45, 6]];
      rows.forEach(([y, s, n], r) => { for (let i = 0; i < n; i++) { const idx = r * 10 + i, appear = p.at + idx * 0.05, o = t - appear; if (o < 0) continue; const k = pop(o, 'bouncy'), x = (i - (n - 1) / 2) * (w - 140) / n + (B.hash(idx) - 0.5) * 24; g.save(); g.globalAlpha = clamp(o / 0.1); person(g, x, y + (1 - k) * 80, s, COATS[idx % COATS.length], HATS[idx % HATS.length], { arm: (idx % 5 === 0) ? t * 3 : 0 }); g.restore(); } });
      const o = t - (p.at + 0.2); if (o > 0) { g.save(); g.globalAlpha = clamp(o / 0.15); g.translate(0, y0 + h - 70); paper(g, -410, -62, 820, 124, 12, { lift: 0.4 }); txt(g, p.cap, 0, -18, F.hero(52), th.ink); txt(g, p.sub, 0, 30, F.hero(52), RED); g.restore(); }
    },
  });

  // ================= cal2: tear-off calendar AUG 1911 → DEC 1913, 2 YEARS 4 MONTHS, NO CLUE =================
  B.register('cal2', {
    defaults: { w: 800, h: 950, at: 99999, dur: 2.6, clueAt: 99999, head: 'MISSING SINCE 21 AUG 1911' }, size: p => [p.w, p.h],
    anchors: p => ({ head: [0, -p.h / 2 + 70, p.w, 140], sheet: [0, -140, p.w * 0.8, 420], count: [0, p.h / 2 - 330, p.w * 0.9, 190], clue: [0, p.h / 2 - 120, 700, 200] }),
    draw(g, p, env) {
      const { t, theme: th, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift });
      g.save(); rr(g, x0, y0, w, h, 26); g.clip(); g.fillStyle = RED; g.fillRect(x0, y0, w, 124); g.restore(); for (const x of [-190, 190]) clay(g, x - 12, y0 - 26, 24, 60, 10, th.ink, { shadowK: 0.3 });
      txt(g, p.head, 0, y0 + 64, F.hero(56), th.paper); txt(g, 'ILLUSTRATION', x0 + w - 26, y0 + 22, F.mono(13), 'rgba(245,243,238,.75)', 'right');
      const u = clamp(lin(t, p.at, p.at + p.dur)), n = Math.floor(28 * ease.inOut(u) + 1e-6), mn = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'], mi = 7 + n, mo = mn[mi % 12], yr = 1911 + Math.floor(mi / 12);
      const frac = (28 * ease.inOut(u)) % 1, flipping = u > 0 && u < 1;
      // sheet
      g.save(); g.translate(0, y0 + 330); paper(g, -270, -170, 540, 340, 14, { lift: 0.2, fill: '#fff' });
      g.save(); g.beginPath(); g.rect(-270, -170, 540, 340); g.clip(); if (flipping) { g.save(); g.translate(0, -170); g.scale(1, 1 - frac); g.fillStyle = '#EDE7D8'; g.fillRect(-270, 0, 540, 340); g.restore(); }
      txt(g, mo, 0, -50, F.hero(150), th.ink); txt(g, String(yr), 0, 80, F.mono(64), RED); g.restore(); g.restore();
      // counter
      const m = Math.min(28, n), yy = Math.floor(m / 12), mm = m % 12, ca = clamp(lin(t, p.at, p.at + 0.2));
      g.save(); g.globalAlpha = ca; txt(g, 'NO CLUE', 0, y0 + 590, F.cap(30), th.inkSoft); txt(g, yy + ' YEAR' + (yy === 1 ? '' : 'S') + ' ' + mm + ' MONTH' + (mm === 1 ? '' : 'S'), 0, y0 + 670, F.hero(76), u >= 1 ? RED : th.ink); g.restore();
      if (u >= 1) { const o = t - p.at - p.dur; g.save(); g.translate(0, 0); B.crimeStamp(g, th, t, { text: 'NO CLUE', at: p.clueAt, size: 96, rot: -0.09, x: 0, y: y0 + h - 110 }); g.restore(); }
      else txt(g, 'POLICE: NO SUSPECT, NO PAINTING', 0, y0 + h - 70, F.mono(21), th.inkSoft);
    },
  });

  // ================= room: his small Paris flat, painting wrapped, frame corner peeks =================
  B.register('room', {
    defaults: { w: 900, h: 950, art: '', peekAt: 99999, cap: 'HIS PARIS FLAT' }, size: p => [p.w, p.h],
    anchors: p => ({ bundle: [150, 170, 300, 330], room: [0, 0, p.w, p.h] }),
    draw(g, p, env) {
      const { t, theme: th, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; B.shadowed(g, () => rr(g, x0, y0, w, h, 22), '#C7A57A', lift);
      g.save(); rr(g, x0, y0, w, h, 22); g.clip(); const lg = g.createLinearGradient(0, y0, 0, y0 + h); lg.addColorStop(0, '#D8BB92'); lg.addColorStop(1, '#B58F63'); g.fillStyle = lg; g.fillRect(x0, y0, w, h);
      g.fillStyle = 'rgba(80,50,20,.10)'; for (let i = 0; i < 12; i++) g.fillRect(x0 + i * 78, y0, 38, h); g.fillStyle = '#6B4423'; g.fillRect(x0, y0 + h - 190, w, 190); g.fillStyle = 'rgba(0,0,0,.2)'; g.fillRect(x0, y0 + h - 190, w, 10);
      // window with night
      g.fillStyle = '#16294a'; g.fillRect(-340, y0 + 120, 250, 330); g.fillStyle = '#F5F3EE'; for (const [sx, sy] of [[-300, 190], [-230, 250], [-150, 170], [-270, 330], [-180, 390]]) { g.beginPath(); g.arc(sx, y0 + sy, 4, 0, 7); g.fill(); } g.fillStyle = '#F2E6B0'; g.beginPath(); g.arc(-150, y0 + 220, 28, 0, 7); g.fill(); g.fillStyle = '#16294a'; g.beginPath(); g.arc(-138, y0 + 212, 26, 0, 7); g.fill();
      g.strokeStyle = '#4a2f17'; g.lineWidth = 12; g.strokeRect(-340, y0 + 120, 250, 330); g.beginPath(); g.moveTo(-215, y0 + 120); g.lineTo(-215, y0 + 450); g.moveTo(-340, y0 + 285); g.lineTo(-90, y0 + 285); g.stroke();
      // bed
      g.fillStyle = '#4a2f17'; g.fillRect(-400, y0 + h - 330, 430, 24); g.fillRect(-400, y0 + h - 330, 24, 250); g.fillStyle = '#2c3e66'; g.beginPath(); g.roundRect(-376, y0 + h - 420, 380, 110, 24); g.fill(); g.fillStyle = '#F5F3EE'; g.beginPath(); g.roundRect(-372, y0 + h - 450, 120, 56, 22); g.fill();
      // table + lamp
      g.fillStyle = '#4a2f17'; g.fillRect(250, y0 + h - 360, 190, 18); g.fillRect(262, y0 + h - 342, 14, 160); g.fillRect(412, y0 + h - 342, 14, 160); g.fillStyle = '#2b2f36'; g.fillRect(335, y0 + h - 440, 6, 80); g.fillStyle = '#F2B705'; g.beginPath(); g.moveTo(306, y0 + h - 440); g.lineTo(370, y0 + h - 440); g.lineTo(354, y0 + h - 490); g.lineTo(322, y0 + h - 490); g.closePath(); g.fill();
      const glow = g.createRadialGradient(338, y0 + h - 430, 10, 338, y0 + h - 380, 300); glow.addColorStop(0, 'rgba(255,230,150,.33)'); glow.addColorStop(1, 'rgba(255,230,150,0)'); g.fillStyle = glow; g.fillRect(x0, y0, w, h);
      g.restore();
      // the wrapped bundle (leans against the wall)
      g.save(); g.translate(150, y0 + h - 320); g.rotate(0.06); const bw = 270, bh = 420; g.fillStyle = '#9C7A4F'; g.beginPath(); g.roundRect(-bw / 2, -bh / 2, bw, bh, 8); g.fill(); g.strokeStyle = '#6B4F2A'; g.lineWidth = 5; g.beginPath(); g.moveTo(-bw / 2, -40); g.lineTo(bw / 2, -40); g.moveTo(-bw / 2, 90); g.lineTo(bw / 2, 90); g.moveTo(0, -bh / 2); g.lineTo(0, bh / 2); g.stroke();
      const pk = ease.out(lin(t, p.peekAt, p.peekAt + 0.5)); if (pk > 0) { g.save(); g.beginPath(); g.moveTo(-bw / 2, -bh / 2); g.lineTo(-bw / 2 + 170 * pk, -bh / 2); g.lineTo(-bw / 2, -bh / 2 + 220 * pk); g.closePath(); g.clip(); painting(g, p.art, 0, 0, bw, bh, { border: 20 }); g.restore(); g.strokeStyle = '#6B4F2A'; g.lineWidth = 4; g.beginPath(); g.moveTo(-bw / 2 + 170 * pk, -bh / 2); g.lineTo(-bw / 2, -bh / 2 + 220 * pk); g.stroke(); }
      g.restore();
      g.fillStyle = '#F5F3EE'; rr(g, -250, y0 + h - 82, 500, 56, 10); g.fill(); txt(g, p.cap, 0, y0 + h - 53, F.hero(40), th.ink); txt(g, 'ILLUSTRATION', x0 + w - 24, y0 + 22, F.mono(14), th.inkSoft, 'right');
    },
  });

  // ================= letter: handwritten, 500,000 LIRE circled =================
  B.register('letter', {
    defaults: { w: 800, h: 960, at: 99999, circleAt: 99999, homeAt: 99999, lines: ['Florence, Nov. 1913', 'Dear Sir,', 'I have the Mona Lisa.'], money: '500,000 LIRE', home: 'It should go home to Italy.' }, size: p => [p.w, p.h],
    anchors: p => ({ money: [0, 120, p.w * 0.8, 130], date: [0, -p.h / 2 + 130, p.w * 0.7, 80], paper: [0, 0, p.w, p.h] }),
    draw(g, p, env) {
      const { t, theme: th, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 8, { fill: '#F3EAD0', lift: lift + 0.3 });
      g.save(); rr(g, x0, y0, w, h, 8); g.clip(); g.strokeStyle = 'rgba(70,100,160,.22)'; g.lineWidth = 2; for (let y = y0 + 130; y < y0 + h; y += 62) { g.beginPath(); g.moveTo(x0, y); g.lineTo(x0 + w, y); g.stroke(); } g.restore();
      txt(g, 'ILLUSTRATION · NOT THE REAL LETTER', 0, y0 + h - 26, F.mono(16), th.inkSoft);
      const ink = '#1d2b4f'; let y = y0 + 104; const lines = p.lines;
      lines.forEach((s, i) => { const on = t - (p.at + i * 0.45); if (on < 0) return; const n = Math.floor(clamp(on / 0.4) * s.length); g.save(); g.translate(x0 + 60, y + i * 70 + Math.sin(i * 2) * 3); g.rotate(-0.012 * i); txt(g, s.slice(0, n), 0, 0, HAND(i === 0 ? 34 : 40), ink, 'left'); g.restore(); });
      const my = 100, mon = t - (p.at + lines.length * 0.45); if (mon > -0.1) { const k = pop(mon + 0.1, 'snappy'); g.save(); g.translate(0, my); g.rotate(-0.025); g.scale(0.6 + 0.4 * k, 0.6 + 0.4 * k); g.globalAlpha = clamp((mon + 0.1) / 0.1); txt(g, p.money, 0, 0, F.hero(124), ink); g.restore(); }
      const cu = ease.out(lin(t, p.circleAt, p.circleAt + 0.55)); if (cu > 0) { g.save(); g.translate(0, my); g.strokeStyle = RED; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); const tw = mw(p.money, F.hero(124)) / 2 + 38, th2 = 98, N = 60, M = Math.floor(N * cu); for (let i = 0; i <= M; i++) { const a = -2.4 + (i / N) * (Math.PI * 2 + 0.4), r = 1 + 0.03 * Math.sin(a * 3); const x = Math.cos(a) * tw * r, yv = Math.sin(a) * th2 * r; i ? g.lineTo(x, yv) : g.moveTo(x, yv); } g.stroke(); g.restore(); }
      const hn = t - p.homeAt; if (hn > 0) { const n = Math.floor(clamp(hn / 0.7) * p.home.length); g.save(); g.translate(x0 + 60, my + 190); g.rotate(-0.015); txt(g, p.home.slice(0, n), 0, 0, HAND(40), ink, 'left'); g.restore(); }
      if (hn > 0.9) { g.save(); g.translate(x0 + w - 60, y0 + h - 130); g.rotate(-0.05); txt(g, '— V.', 0, 0, HAND(54), ink, 'right'); g.restore(); }
    },
  });

  // ================= checkers: dealer + Uffizi director check the painting with magnifiers (hotel) =================
  B.register('checkers', {
    defaults: { w: 940, h: 960, art: '', at: 99999, realAt: 99999, cap: 'HOTEL · FLORENCE' }, size: p => [p.w, p.h],
    anchors: p => ({ art: [0, 10, 330, 480], left: [-300, 130, 280, 520], right: [300, 130, 280, 520], stamp: [0, -250, 700, 200] }),
    draw(g, p, env) {
      const { t, lt, theme: th, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; B.shadowed(g, () => rr(g, x0, y0, w, h, 22), '#2B3A55', lift);
      g.save(); rr(g, x0, y0, w, h, 22); g.clip(); const lg = g.createLinearGradient(0, y0, 0, y0 + h); lg.addColorStop(0, '#3C5280'); lg.addColorStop(1, '#22304D'); g.fillStyle = lg; g.fillRect(x0, y0, w, h); g.fillStyle = 'rgba(255,255,255,.05)'; for (let i = 0; i < 14; i++) g.fillRect(x0 + i * 70, y0, 30, h); g.fillStyle = '#5a3a1e'; g.fillRect(x0, y0 + h - 250, w, 250); g.fillStyle = 'rgba(0,0,0,.25)'; g.fillRect(x0, y0 + h - 250, w, 10); g.restore();
      g.fillStyle = '#F5F3EE'; rr(g, -190, y0 + 28, 380, 62, 10); g.fill(); g.strokeStyle = th.gold; g.lineWidth = 4; rr(g, -184, y0 + 34, 368, 50, 8); g.stroke(); txt(g, p.cap, 0, y0 + 60, F.hero(36), th.ink); txt(g, 'ILLUSTRATION', x0 + w - 24, y0 + 22, F.mono(14), 'rgba(255,255,255,.55)', 'right');
      // table
      g.fillStyle = '#7a4a22'; g.fillRect(-380, y0 + h - 260, 760, 34); g.fillStyle = '#4a2f17'; g.fillRect(-340, y0 + h - 226, 20, 200); g.fillRect(320, y0 + h - 226, 20, 200);
      const k = pop(t - p.at + 0.3, 'heavy'); g.save(); g.translate(0, (1 - k) * 300); painting(g, p.art, 0, y0 + h - 520, 330, 480, { rot: 0 }); g.restore();
      // men
      const man = (x, side, coat, hat, tag, bob) => { g.save(); g.translate(x, y0 + h - 230 + bob); const s = 2.1; g.scale(s, s);
        g.fillStyle = coat; g.beginPath(); g.moveTo(-50, 0); g.quadraticCurveTo(-52, -100, 0, -108); g.quadraticCurveTo(52, -100, 50, 0); g.closePath(); g.fill(); g.fillStyle = '#F5F3EE'; g.beginPath(); g.moveTo(-14, -104); g.lineTo(0, -70); g.lineTo(14, -104); g.closePath(); g.fill();
        g.fillStyle = '#E3BE96'; g.beginPath(); g.arc(0, -132, 28, 0, 7); g.fill(); g.fillStyle = '#0B0F14'; for (const q of [-1, 1]) { g.beginPath(); g.arc(q * 10 + side * 3, -134, 3.2, 0, 7); g.fill(); }
        if (tag === 'D') { g.fillStyle = '#2b1d13'; g.beginPath(); g.arc(0, -142, 28, Math.PI, 0); g.fill(); g.fillRect(-38, -144, 76, 7); g.strokeStyle = '#2b1d13'; g.lineWidth = 6; g.beginPath(); g.moveTo(-12, -117); g.quadraticCurveTo(0, -110, 12, -117); g.stroke(); }
        else { g.fillStyle = '#d9d9d9'; g.beginPath(); g.arc(0, -150, 24, Math.PI, 0); g.fill(); g.beginPath(); g.moveTo(-20, -112); g.quadraticCurveTo(0, -80, 20, -112); g.fill(); g.strokeStyle = '#0B0F14'; g.lineWidth = 2.5; for (const q of [-1, 1]) { g.beginPath(); g.arc(q * 10, -134, 8, 0, 7); g.stroke(); } }
        g.restore(); };
      man(-300, 1, '#1E7D4F', 'D', 'D', 2 * Math.sin(t * 2)); man(300, -1, '#16202e', 'U', 'U', 2 * Math.sin(t * 2 + 1));
      // magnifiers sweeping over the painting
      const mg = (side, ph) => { const x = side * (60 + 70 * Math.sin(t * 2.2 + ph)), y = y0 + h - 520 + 110 * Math.sin(t * 1.6 + ph * 2), r = 62; g.save(); g.translate(x, y); g.strokeStyle = '#2b2f36'; g.lineWidth = 16; g.beginPath(); g.moveTo(r * 0.7, r * 0.7); g.lineTo(side * -1 * -190, 260); g.stroke(); g.fillStyle = 'rgba(255,255,255,.22)'; g.beginPath(); g.arc(0, 0, r, 0, 7); g.fill(); g.strokeStyle = th.gold; g.lineWidth = 12; g.stroke(); g.restore(); };
      if (t > p.at + 0.4) { mg(-1, 0); mg(1, 2); }
      // labels
      const lab = (x, s) => { g.fillStyle = th.navy; rr(g, x - 150, y0 + h - 330, 300, 62, 10); g.fill(); txt(g, s, x, y0 + h - 298, F.hero(34), th.paper); };
      lab(-300, 'THE ART DEALER'); lab(300, 'UFFIZI DIRECTOR');
      if (t >= p.realAt) { g.save(); B.crimeStamp(g, th, t, { text: "IT'S REAL", at: p.realAt, tone: 'good', size: 100, rot: -0.08, x: 0, y: y0 + 200 }); g.restore(); }
    },
  });

  // ================= cuffs: handcuffs + MID-DEC 1913 =================
  B.register('cuffs', {
    defaults: { w: 820, h: 720, at: 99999, stampAt: 99999, big: 'MID-DEC 1913', small: 'FLORENCE · HIS HOTEL' }, size: p => [p.w, p.h],
    anchors: p => ({ cuffs: [0, -40, 600, 330], date: [0, p.h / 2 - 150, p.w * 0.9, 190] }),
    draw(g, p, env) {
      const { t, theme: th, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift });
      g.save(); rr(g, x0, y0, w, h, 26); g.clip(); g.fillStyle = th.navy; g.fillRect(x0, y0, w, 112); g.restore(); txt(g, 'THE ARREST', x0 + 40, y0 + 58, F.hero(64), th.paper, 'left'); txt(g, 'ILLUSTRATION', x0 + w - 28, y0 + 24, F.mono(14), 'rgba(245,243,238,.7)', 'right');
      const o = t - p.at, k = pop(o, 'heavy'); g.save(); g.translate(0, y0 + 300); g.globalAlpha = clamp(o / 0.1); g.scale(0.6 + 0.4 * k, 0.6 + 0.4 * k); g.rotate(-0.12 * (1 - k) - 0.03);
      const ring = (cx) => { g.strokeStyle = '#59606B'; g.lineWidth = 34; g.beginPath(); g.arc(cx, 0, 92, 0, 7); g.stroke(); g.strokeStyle = '#C9CED6'; g.lineWidth = 12; g.beginPath(); g.arc(cx, 0, 92, 3.6, 5.4); g.stroke(); g.fillStyle = '#3a4350'; g.beginPath(); g.roundRect(cx - 34, -150, 68, 70, 12); g.fill(); g.fillStyle = '#0B0F14'; g.beginPath(); g.arc(cx, -118, 8, 0, 7); g.fill(); };
      g.strokeStyle = '#59606B'; g.lineWidth = 16; g.setLineDash([32, 8]); g.beginPath(); g.moveTo(-140, -10); g.lineTo(140, -10); g.stroke(); g.setLineDash([]); ring(-190); ring(190); g.restore();
      const dk = pop(t - p.at - 0.3, 'snappy'); g.save(); g.globalAlpha = clamp((t - p.at - 0.3) / 0.12); g.translate(0, y0 + h - 150 + (1 - dk) * 24); txt(g, p.big, 0, 0, F.hero(112), RED); txt(g, p.small, 0, 76, F.monoX(26), th.inkSoft); g.restore();
      if (t >= p.stampAt) { g.save(); B.crimeStamp(g, th, t, { text: 'ARRESTED', at: p.stampAt, size: 78, rot: -0.12, x: 150, y: y0 + 250 }); g.restore(); }
    },
  });

  // ================= verd2: 1 YEAR 15 DAYS, SERVED < 1 YEAR, FOR ITALY =================
  B.register('verd2', {
    defaults: { w: 800, h: 840, guiltyAt: 99999, termAt: 99999, servedAt: 99999, claimAt: 99999, venue: 'FLORENCE · 1914' }, size: p => [p.w, p.h],
    anchors: p => ({ head: [0, -p.h / 2 + 70, p.w, 140], term: [0, -60, p.w * 0.92, 300], served: [0, 215, p.w * 0.9, 190], claim: [0, p.h / 2 - 100, p.w * 0.9, 100] }),
    draw(g, p, env) {
      const { t, theme: th, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift });
      g.save(); rr(g, x0, y0, w, h, 26); g.clip(); g.fillStyle = th.navy; g.fillRect(x0, y0, w, 128); g.restore(); txt(g, 'THE VERDICT', x0 + 40, y0 + 64, F.hero(68), th.paper, 'left'); txt(g, p.venue, x0 + w - 34, y0 + 28, F.monoX(20), th.gold, 'right');
      const gt = t - p.guiltyAt; if (gt > 0) { const sc = 1 + 1.2 * (1 - ease.expo(clamp(gt / 0.2))); g.save(); g.globalAlpha = clamp(gt / 0.08); g.translate(0, y0 + 205); g.rotate(-0.05); g.scale(sc, sc); txt(g, 'GUILTY', 0, 0, F.hero(84), RED); g.restore(); burst(g, 0, y0 + 205, 240, th.bad, gt - 0.1, 16, 0.5); }
      const tt = t - p.termAt; if (tt > 0) { const sc = 1 + 1.1 * (1 - ease.expo(clamp(tt / 0.22))); g.save(); g.globalAlpha = clamp(tt / 0.08); g.translate(0, y0 + 345); g.scale(sc, sc); txt(g, '1 YEAR', 0, 0, F.hero(170), th.ink); txt(g, '15 DAYS', 0, 152, F.hero(130), RED); B.marker(g, -190, 232, 380, 9, RED, clamp((tt - 0.3) / 0.3), 0.9); g.restore(); burst(g, 0, y0 + 400, 320, th.bad, tt - 0.12, 20, 0.55); }
      const sv = t - p.servedAt; if (sv > 0) { g.save(); B.crimeStamp(g, th, t, { text: 'SERVED < 1 YEAR', at: p.servedAt, size: 62, rot: -0.07, x: -110, y: y0 + 690 }); g.restore(); }
      const cl = t - p.claimAt; if (cl > 0) { const k = pop(cl, 'snappy'); g.save(); g.globalAlpha = clamp(cl / 0.12); g.translate(0, y0 + h - 56 + (1 - k) * 20); txt(g, 'HIS EXCUSE: “I DID IT FOR ITALY”', 0, 0, F.cap(31), th.inkSoft); g.restore(); }
    },
  });

  // ================= famous: the painting on a wall, crowds + camera flashes =================
  B.register('famous', {
    defaults: { w: 940, h: 1060, art: '', at: 99999, cap1: 'THE MOST FAMOUS', cap2: 'PAINTING IN THE WORLD' }, size: p => [p.w, p.h],
    anchors: p => ({ art: [0, -150, 420, 610], banner: [0, p.h / 2 - 150, p.w * 0.94, 260] }),
    draw(g, p, env) {
      const { t, lt, theme: th, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; B.shadowed(g, () => rr(g, x0, y0, w, h, 22), WALL, lift); wallBase(g, x0, y0, w, h, th);
      
      const k = pop(lt - 0.05, 'heavy'); g.save(); g.translate(0, (1 - k) * -30); painting(g, p.art, 0, -150, 410, 600); g.restore();
      txt(g, 'ILLUSTRATION · PD REPRODUCTION', x0 + w - 24, y0 + 22, F.mono(13), 'rgba(255,225,200,.55)', 'right');
      for (let r = 0; r < 2; r++) for (let i = 0; i < 9 - r; i++) { const idx = r * 10 + i, ap = p.at + idx * 0.035 - 0.3 + 1e-3, o = t - ap; if (o < -9) continue; const x = (i - (8 - r) / 2) * 98 + (B.hash(idx + 5) - 0.5) * 20; const yy = 250 + r * 110; g.save(); person(g, x, yy + 130, 1.15 + r * 0.25, COATS[(idx + 2) % COATS.length], HATS[idx % HATS.length], { arm: (idx % 3 === 0) ? t * 4 : 0 }); g.restore();
        if (idx % 4 === 1) { const fl = hit(((t * 2.1 + idx * 0.37) % 1.3) - 0.1, 14) * (t > p.at ? 1 : 0); if (fl > 0.02) { g.fillStyle = 'rgba(255,255,255,' + 0.9 * fl + ')'; g.beginPath(); g.arc(x + 40, yy - 20, 26 + 30 * fl, 0, 7); g.fill(); } } }
      const bn = t - p.at; if (bn > 0) { const kk = pop(bn, 'heavy'); g.save(); g.translate(0, y0 + h - 110 + (1 - kk) * 200); g.globalAlpha = clamp(bn / 0.1); paper(g, -430, -100, 860, 200, 16, { lift: 0.5 }); txt(g, p.cap1, 0, -40, F.hero(80), th.ink); txt(g, p.cap2, 0, 40, F.hero(72), RED); g.restore(); }
    },
  });
})();
