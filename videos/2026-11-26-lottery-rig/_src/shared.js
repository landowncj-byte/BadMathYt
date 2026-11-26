// ===== Lottery rig (Tipton) — shared custom recipes (registered via BM2.register; prepended to each cut's scene.js) =====
// All art is generic/recreated: no real lottery logos, no photos, no store footage. Names in plain text only.
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, countAt, hash, hit, wobble } = B;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const rel = (t, p) => (t >= p.endAt ? t - p.endAt : t);   // slam-relative time: replays the frame-0 slam at endAt (the loop)
  const BALL = ['#FF3B30', '#F2B705', '#2c3e66', '#F5F3EE', '#1FA366', '#FF3B30', '#F2B705', '#2c3e66'];
  const ball = (g, x, y, r, col, num, ink) => {
    g.save(); g.translate(x, y); g.shadowColor = 'rgba(2,4,9,.35)'; g.shadowBlur = 12 * B.zoomNow; g.shadowOffsetY = 6 * B.zoomNow; g.fillStyle = col; g.beginPath(); g.arc(0, 0, r, 0, 7); g.fill(); g.shadowColor = 'transparent';
    const lg = g.createRadialGradient(-r * 0.4, -r * 0.45, r * 0.1, 0, 0, r * 1.05); lg.addColorStop(0, 'rgba(255,255,255,.38)'); lg.addColorStop(0.5, 'rgba(255,255,255,0)'); lg.addColorStop(1, 'rgba(0,0,0,.28)'); g.fillStyle = lg; g.beginPath(); g.arc(0, 0, r, 0, 7); g.fill();
    if (num != null) { g.fillStyle = 'rgba(245,243,238,.94)'; g.beginPath(); g.arc(0, 0, r * 0.52, 0, 7); g.fill(); txt(g, String(num), 0, r * 0.04, F.hero(r * 0.72), ink || '#0B0F14'); }
    g.restore();
  };
  B.lball = ball;

  // ---------- htext: frame-0 hook text. Drawn immediately (no stagger), slams 1.18 -> 1, replays at endAt ----------
  B.register('htext', {
    defaults: { l1: [['SECURITY DIRECTOR', 'paper']], l2: [['RIGGED THE LOTTERY', 'bad']], size: 110, endAt: 99999 }, ownEnter: true, size: p => [900, p.size * 2.3],
    anchors: p => ({ a1: [0, -p.size * 0.58, 900, p.size], a2: [0, p.size * 0.58, 900, p.size] }),
    draw(g, p, env) {
      const st = rel(env.t, p), k = hit(st, 8), s = 1 + 0.18 * k; g.save(); g.scale(s, s); g.rotate(-0.02 * k);
      const line = (segs, y) => { const w = segs.reduce((a, s0) => a + mw(s0[0], F.hero(p.size)), 0); let x = -w / 2; g.save(); g.shadowColor = 'rgba(0,0,0,.5)'; g.shadowBlur = 18 * B.zoomNow; g.shadowOffsetY = 8 * B.zoomNow; for (const [s0, tn] of segs) { txt(g, s0, x, y, F.hero(p.size), B.tone(tn, false), 'left'); x += mw(s0, F.hero(p.size)); } g.restore(); };
      line(p.l1, -p.size * 0.58); line(p.l2, p.size * 0.58); g.restore();
    },
  });

  // ---------- machine: clay lottery-ball machine (generic). Dome cracks + balls spill at the slam; replays at endAt ----------
  B.register('machine', {
    defaults: { endAt: 99999, crackAt: 0.04, spillAt: 0.12 }, size: () => [640, 760],
    anchors: () => ({ dome: [0, -70, 540, 540], base: [0, 250, 580, 160] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, st = rel(t, p);
      clay(g, -290, 170, 580, 150, 28, theme.navy, { lift }); clay(g, -78, 298, 156, 46, 12, '#1b2540', {}); txt(g, 'DRAW MACHINE', 0, 245, F.mono(24), 'rgba(245,243,238,.7)');
      g.save(); g.beginPath(); g.arc(0, -70, 262, 0, 7); g.clip();
      const bg = g.createRadialGradient(-80, -170, 20, 0, -70, 270); bg.addColorStop(0, 'rgba(245,243,238,.30)'); bg.addColorStop(1, 'rgba(245,243,238,.08)'); g.fillStyle = bg; g.fillRect(-270, -340, 540, 540);
      for (let i = 0; i < 14; i++) { const r = 175 * Math.sqrt(hash(i * 1.3 + 2)), a = hash(i * 5.1) * 6.28 + t * (0.7 + hash(i * 2.2)) * (i % 2 ? 1 : -1); ball(g, Math.cos(a) * r, -70 + Math.sin(a) * r * 0.92, 42, BALL[i % 8], (i * 7 + 3) % 40 + 1, i % 8 === 2 ? '#0B0F14' : '#0B0F14'); }
      g.restore();
      g.save(); g.strokeStyle = 'rgba(245,243,238,.7)'; g.lineWidth = 10; g.beginPath(); g.arc(0, -70, 262, 0, 7); g.stroke(); g.strokeStyle = 'rgba(255,255,255,.55)'; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); g.arc(0, -70, 230, 3.5, 4.3); g.stroke(); g.restore();
      { const k = ease.out(clamp((st - p.crackAt) / 0.26)); if (k > 0) { const pts = [[-40, -330], [-90, -250], [-30, -200], [-100, -120], [-40, -60], [-110, 10], [-60, 70]], n = Math.floor(pts.length * k) + 1; g.save(); g.lineJoin = 'round'; g.lineCap = 'round'; for (const [c, wd] of [['#F5F3EE', 15], ['#0B0F14', 7]]) { g.strokeStyle = c; g.lineWidth = wd; g.beginPath(); pts.slice(0, n).forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.stroke(); } g.restore(); } }
      for (let j = 0; j < 8; j++) { const lt = st - p.spillAt - j * 0.06; if (lt <= 0) continue; const a = 1 - clamp((lt - 1.1) / 0.45); if (a <= 0) continue; const sc = 1 + 1.9 * lt, x = (j - 3.5) * 36 + (hash(j * 3.3) - 0.5) * 520 * lt, y = 200 + 120 * lt + 760 * lt * lt; g.save(); g.globalAlpha = a; ball(g, x, y, 40 * sc, BALL[(j + 3) % 8], (j * 11 + 5) % 40 + 1); g.restore(); }
    },
  });

  // ---------- badge: security badge card (plain text, ILLUSTRATION). badge (normal enter) / sbadge (slam at frame 0, replays at endAt) ----------
  const drawBadge = (g, p, env, sl) => {
    const { t, theme, lift } = env, w = 500, h = 640, x0 = -w / 2, y0 = -h / 2; let s = 1, rot = 0, st = 0;
    if (sl) { st = rel(t, p); const k = ease.expo(clamp(st / 0.2)); s = 1 + 0.6 * (1 - k); rot = 0.12 * (1 - k); }
    g.save(); g.scale(s, s); g.rotate(rot);
    clay(g, -52, y0 - 40, 104, 64, 14, '#59606B', { shadowK: 0.3 }); paper(g, x0, y0, w, h, 26, { lift: lift + (sl ? 0.4 * (1 - ease.expo(clamp(st / 0.3))) : 0) });
    g.save(); rr(g, x0, y0, w, h, 26); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 104); g.restore();
    txt(g, 'MULTI-STATE LOTTERY', 0, y0 + 40, F.cap(30), theme.paper); txt(g, 'ASSOCIATION', 0, y0 + 76, F.cap(30), theme.paper);
    B.badgeFace(g, x0, y0, t);
    txt(g, 'INFORMATION', 0, y0 + 392, F.cap(38), theme.ink); txt(g, 'SECURITY DIRECTOR', 0, y0 + 440, F.cap(38), theme.badInk);
    { const k = clamp((t - p.nameAt) / 0.3); if (k > 0) { marker(g, x0 + 50, y0 + 478, w - 100, 56, theme.bad, k, 0.22); g.save(); g.globalAlpha = clamp(k * 3); txt(g, p.name, 0, y0 + 508, F.hero(46), theme.ink); g.restore(); } }
    txt(g, 'ILLUSTRATION', x0 + 26, y0 + h - 30, F.mono(18), theme.inkSoft, 'left');
    { const lt = t - (p.lockAt ?? 99999); if (lt > 0) { const k = spring(lt, 'bouncy'); g.save(); g.translate(x0 + w - 70, y0 + h - 80); g.scale(1.5 * k, 1.5 * k); g.rotate(-0.12); g.strokeStyle = '#59606B'; g.lineWidth = 14; g.lineCap = 'round'; g.beginPath(); g.moveTo(-26, -22); g.lineTo(-26, -50); g.arc(0, -50, 26, Math.PI, 0); g.lineTo(26, -22); g.stroke(); clay(g, -44, -26, 88, 74, 14, theme.gold, { shadowK: 0.5 }); g.fillStyle = theme.ink; g.beginPath(); g.arc(0, 4, 9, 0, 7); g.fill(); g.fillRect(-3.5, 8, 7, 20); g.restore(); } }
    g.restore(); if (sl) burst(g, 0, 0, 380 * 1, theme.bad, st - 0.16, 16, 0.5);
  };
  B.register('badge', { defaults: { nameAt: 99999, lockAt: 99999, name: 'EDDIE TIPTON' }, size: () => [500, 640], anchors: () => ({ name: [0, 188, 400, 60], title: [0, 100, 460, 110] }), draw(g, p, env) { drawBadge(g, p, env, false); } });
  B.register('sbadge', { defaults: { nameAt: 99999, name: 'EDDIE TIPTON', endAt: 99999 }, ownEnter: true, size: () => [500, 640], draw(g, p, env) { drawBadge(g, p, env, true); } });

  // ---------- states: five-state marker row (generic pins, no state names). Pins drop in from `at`; label rolls to 5 ----------
  B.register('states', {
    defaults: { at: 99999, per: 0.14, endAt: 99999, label: '5 STATES', sub: 'PLEADED GUILTY' }, ownEnter: true, size: () => [900, 360],
    anchors: () => ({ label: [0, 100, 520, 140], row: [0, -55, 840, 140] }),
    draw(g, p, env) {
      const t = rel(env.t, p), th = env.theme, lt0 = env.lt; const a0 = clamp(lt0 / 0.1);
      g.save(); g.globalAlpha = a0; paper(g, -450, -120, 900, 130, 24, { lift: env.lift });
      for (let i = 0; i < 5; i++) { const ti = t - (p.at + i * p.per), k = spring(Math.max(0, ti), 'bouncy'); const x = -350 + i * 175, yy = -55 - (1 - k) * 160 * (ti > 0 ? 1 : 0); if (ti <= -0.02) { g.fillStyle = rgba(th.inkSoft, 0.35); g.beginPath(); g.arc(x, -50, 12, 0, 7); g.fill(); continue; }
        g.save(); g.translate(x, yy); g.scale(0.9 + 0.1 * k, 0.9 + 0.1 * k); g.beginPath(); const path = () => { g.beginPath(); g.moveTo(0, 36); g.bezierCurveTo(-46, -6, -34, -40, 0, -40); g.bezierCurveTo(34, -40, 46, -6, 0, 36); g.closePath(); };
        B.shadowed(g, path, th.bad, 0.1, { k: 0.7 }); g.fillStyle = th.paper; g.beginPath(); g.arc(0, -10, 14, 0, 7); g.fill(); g.restore(); burst(g, x, -50, 50, th.bad, ti - 0.05, 8, 0.35); }
      g.restore();
      const done = t >= p.at + 4 * p.per + 0.1, k2 = clamp((t - (p.at + 4 * p.per)) / 0.25);
      if (done) { g.save(); g.translate(0, 100); const s = 1 + 0.12 * hit(t - (p.at + 4 * p.per), 8) + (env.hot === 'label' ? 0.03 * env.hotK : 0); g.scale(s, s); g.globalAlpha = k2; g.shadowColor = 'rgba(0,0,0,.5)'; g.shadowBlur = 16 * B.zoomNow; g.shadowOffsetY = 7 * B.zoomNow; txt(g, p.label, 0, 0, F.hero(128), th.paper); g.restore(); g.save(); g.globalAlpha = k2; txt(g, '(' + p.sub + ')', 0, 205, F.mono(30), 'rgba(245,243,238,.85)'); g.restore(); }
    },
  });

  // ---------- server: "RANDOM NUMBER GENERATOR" card + small code tab; padlock flips into a code scroll; a ball rolls out ----------
  B.register('server', {
    defaults: { tabAt: 99999, lockAt: 99999, flipAt: 99999, rollAt: 99999, sub: 'THE COMPUTER THAT PICKS THE BALLS' }, size: () => [600, 700],
    anchors: () => ({ head: [0, -285, 560, 120], lock: [0, -90, 200, 200], scroll: [0, -90, 440, 320], out: [60, 172, 500, 120], tab: [358, 231, 160, 80] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = 600, h = 700, x0 = -w / 2, y0 = -h / 2;
      // code tab: peeks from behind the card edge; slides out fully at tabAt
      { const k = ease.out(clamp((t - p.tabAt) / 0.35)), tx = x0 + w - 78 + 66 * k; g.save(); clay(g, tx, y0 + 548, 140, 66, 14, theme.manila, { shadowK: 0.4 }); txt(g, '</>', tx + 84, y0 + 581, F.mono(32), theme.ink); g.restore(); }
      paper(g, x0, y0, w, h, 26, { lift });
      g.save(); rr(g, x0, y0, w, h, 26); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 130); g.restore();
      txt(g, 'RANDOM NUMBER', 0, y0 + 48, F.cap(44), theme.paper); txt(g, 'GENERATOR', 0, y0 + 96, F.cap(44), theme.gold);
      for (let r = 0; r < 3; r++) { const yy = y0 + 156 + r * 66; clay(g, x0 + 50, yy, w - 100, 54, 12, '#1b2230', { shadowK: 0.3 }); for (let l = 0; l < 4; l++) { g.fillStyle = (l + r) % 3 === 0 ? theme.gold : (l + r) % 3 === 1 ? '#1FA366' : '#59606B'; g.beginPath(); g.arc(x0 + 82 + l * 30, yy + 27, 8, 0, 7); g.fill(); } g.fillStyle = 'rgba(245,243,238,.25)'; g.fillRect(x0 + 230, yy + 18, 250, 6); g.fillRect(x0 + 230, yy + 32, 160, 6); }
      // output row: five slots
      for (let i = 0; i < 5; i++) { const x = x0 + 80 + i * 110, y = y0 + 520; g.fillStyle = rgba(theme.ink, 0.12); g.beginPath(); g.arc(x, y, 38, 0, 7); g.fill(); txt(g, '?', x, y + 2, F.hero(40), theme.inkSoft); }
      txt(g, 'ILLUSTRATION', x0 + 24, y0 + h - 24, F.mono(18), theme.inkSoft, 'left');
      // padlock -> flips into a code scroll
      const lk = clamp((t - p.lockAt) / 0.25), fl = clamp((t - p.flipAt) / 0.4);
      if (lk > 0 && fl < 0.5) { const sx = fl < 0.5 ? Math.cos(fl * Math.PI) : 0, s = (0.6 + 0.4 * spring(Math.max(0, t - p.lockAt), 'snappy')); g.save(); g.translate(0, y0 + 345); g.scale(s * sx, s); g.globalAlpha = clamp(lk * 3);
        g.strokeStyle = '#59606B'; g.lineWidth = 26; g.lineCap = 'round'; g.beginPath(); g.moveTo(-52, -58); g.lineTo(-52, -112); g.arc(0, -112, 52, Math.PI, 0); g.lineTo(52, -58); g.stroke();
        clay(g, -90, -62, 180, 150, 22, theme.gold, { shadowK: 0.5 }); g.fillStyle = theme.ink; g.beginPath(); g.arc(0, 0, 18, 0, 7); g.fill(); g.fillRect(-7, 6, 14, 40); g.restore(); }
      if (fl > 0.5) { const u = ease.out(clamp((t - p.flipAt - 0.2) / 0.55)), sc = 0.7 + 0.3 * spring(Math.max(0, t - p.flipAt - 0.2), 'snappy'), hh = 40 + 290 * u, cy = y0 + 150;
        g.save(); g.translate(0, cy); g.scale(sc, sc); paper(g, -230, 0, 460, hh, 10, { fill: '#F2E6C9', lift: 0.3 }); g.save(); rr(g, -230, 0, 460, hh, 10); g.clip();
        for (let i = 0; i < 9; i++) { const yy = 56 + i * 31; if (yy > hh - 20) break; g.fillStyle = rgba(theme.ink, 0.5); g.fillRect(-190 + (i % 3) * 22, yy, 120 + hash(i * 3.1) * 190, 9); }
        g.restore(); clay(g, -250, -20, 500, 40, 20, theme.manila, { shadowK: 0.3 }); clay(g, -250, hh - 20, 500, 40, 20, theme.manila, { shadowK: 0.3 }); txt(g, '{ }', 190, 66, F.mono(34), theme.badInk); g.restore(); }
      // a ball rolls out of the output, already showing its number
      { const lt = t - p.rollAt; if (lt > 0) { const u = ease.out(clamp(lt / 0.7)); ball(g, lerp(x0 + 520, x0 + 440, u) - 0, lerp(y0 + 520, y0 + 640, u * u) + 0, lerp(30, 54, u), theme.gold, 17); } }
    },
  });

  // ---------- slips: faceless paper figures pass number slips hand to hand; coins slide back ----------
  B.register('slips', {
    defaults: { at: 99999, per: 0.42, chips: [99999, 99999, 99999], head: 'HE SAID:', head0: 'THE PAYOUT PLAN', headAt: 99999 }, size: () => [980, 720],
    anchors: () => ({ chips: [0, -190, 800, 330], row: [0, 190, 900, 300], c1: [0, -250, 700, 80], c2: [0, -165, 700, 80], c3: [0, -80, 700, 80] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = 980, x0 = -w / 2, y0 = -360; paper(g, x0, y0, w, 720, 28, { lift });
      g.save(); rr(g, x0, y0, w, 720, 28); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 90); g.restore(); txt(g, t < p.headAt ? p.head0 : p.head, x0 + 40, y0 + 46, F.hero(56), theme.paper, 'left');
      const labels = ['GAVE THE NUMBERS', 'THEY WON', 'THEY SHARED'], cols = [theme.ink, theme.goodInk, theme.badInk];
      labels.forEach((s, i) => { const o = t - p.chips[i], k = spring(Math.max(0, o), 'snappy'); if (o < 0) return; g.save(); g.globalAlpha = clamp(o / 0.1); g.translate(0, y0 + 160 + i * 86 + (1 - k) * 22); marker(g, -380, -34, 760, 68, cols[i], clamp(o / 0.3), 0.14); txt(g, (i ? '→  ' : '') + s, 0, 2, F.cap(46), cols[i]); g.restore(); });
      // figures
      const fy = y0 + 520; for (let i = 0; i < 5; i++) { const x = x0 + 120 + i * 185, first = i === 0, col = first ? theme.navy : '#C9C3B4';
        g.save(); g.translate(x, fy + Math.sin(t * 3 + i * 1.3) * 4); clay(g, -44, 8, 88, 118, 30, col, { shadowK: 0.4 }); g.fillStyle = first ? '#E7C79B' : '#E7E2D6'; g.beginPath(); g.arc(0, -26, 38, 0, 7); g.fill(); if (first) { g.fillStyle = theme.bad; g.beginPath(); g.moveTo(-9, 12); g.lineTo(9, 12); g.lineTo(0, 44); g.closePath(); g.fill(); if (t < p.at + 0.1) { g.save(); g.translate(58, 52); g.rotate(0.2); paper(g, -26, -20, 52, 40, 6, { lift: 0.2, grain: false }); txt(g, '##', 0, 1, F.mono(18), theme.ink); g.restore(); } } g.restore(); }
      txt(g, 'HE', x0 + 120, fy + 150, F.mono(26), theme.inkSoft); txt(g, 'OTHERS', x0 + 120 + 185 * 2.5, fy + 150, F.mono(26), theme.inkSoft); txt(g, 'ILLUSTRATION', x0 + 26, y0 + 700, F.mono(18), theme.inkSoft, 'left');
      for (let i = 0; i < 4; i++) { const o = (t - (p.at + i * p.per)) / 0.38; if (o <= 0 || o >= 1) continue; const u = ease.inOut(o); const xx = lerp(x0 + 120 + i * 185, x0 + 120 + (i + 1) * 185, u), yy = fy - 30 - Math.sin(u * Math.PI) * 60; g.save(); g.translate(xx, yy); g.rotate((u - 0.5) * 0.5); paper(g, -26, -20, 52, 40, 6, { lift: 0.2, grain: false }); txt(g, '##', 0, 1, F.mono(18), theme.ink); g.restore(); }
      for (let i = 0; i < 4; i++) { const o = (t - (p.at + 4 * p.per + 0.15 + i * 0.16)) / 0.45; if (o <= 0) continue; const u = ease.out(clamp(o)); const xx = lerp(x0 + 120 + 4 * 185, x0 + 120 + (3 - i) * 185 * 0 + 60 + i * 12, u), yy = fy + 94 + (i % 2) * 10; g.save(); g.fillStyle = theme.gold; g.strokeStyle = '#a77f00'; g.lineWidth = 3; g.beginPath(); g.arc(xx, yy, 22, 0, 7); g.fill(); g.stroke(); txt(g, '$', xx, yy + 1, F.hero(24), '#7a5c00'); g.restore(); }
    },
  });

  // ---------- ticket: giant jackpot ticket; $16.5M rolls up (ADVERTISED); blank PAID tile; drains to 0; $0 slams ----------
  B.register('ticket', {
    defaults: { at: 99999, dur: 1.3, askAt: 99999, drainAt: 99999, drainDur: 0.9, head: '2010 · ADVERTISED JACKPOT', askLabel: 'PAID OUT', askQ: '$ ?', payLabel: 'PAID', stamp: 'NOBODY COLLECTED', stampSize: 56 }, size: () => [820, 820],
    anchors: () => ({ head: [0, -330, 760, 90], total: [0, -150, 760, 190], paid: [0, 150, 700, 260], stamp: [0, 330, 700, 110] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = 820, h = 820, x0 = -w / 2, y0 = -h / 2, dEnd = p.drainAt + p.drainDur, landed = t >= dEnd;
      const bb = p.style === 'billboard';
      if (bb) { for (const sx of [-240, 190]) clay(g, sx, y0 + h - 20, 50, 110, 8, '#59606B', { shadowK: 0.3 }); }
      paper(g, x0, y0, w, h, 30, { lift });
      g.save(); rr(g, x0, y0, w, h, 30); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 100); g.restore();
      txt(g, p.head, 0, y0 + 52, F.cap(36), theme.paper);
      for (let i = 0; i < (bb ? 0 : 8); i++) { g.fillStyle = rgba('#0B0F14', 0.16); g.beginPath(); g.arc(x0 + 30, y0 + 140 + i * 74, 9, 0, 7); g.arc(x0 + w - 30, y0 + 140 + i * 74, 9, 0, 7); g.fill(); }
      // big number: rolls up to 16.5 (million), then drains to 0
      let v = 0; { const lt = t - p.at; v = lt < 0 ? 0 : countAt(lt, p.dur, 0, 16.5); if (t >= p.drainAt) v = 16.5 * (1 - ease.inOut(clamp((t - p.drainAt) / p.drainDur))); }
      const draining = t >= p.drainAt && !landed, land0 = t - p.at - p.dur;
      const o = { font: F.hero(188), size: 188, color: landed || t < p.at ? rgba(theme.ink, t < p.at ? 0.16 : 0.28) : draining ? theme.badInk : theme.ink, prefix: '$', decimals: 1, speed: (t < p.at + p.dur || draining) ? 40 : 0 };
      const nw = B.rollWidth(g, v, o).w, sw = mw(' MILLION', F.hero(96)), tot = nw + sw; g.save(); g.translate(0, y0 + 245); const s = 1 + (land0 > 0 && land0 < 0.6 ? 0.1 * hit(land0, 7) : 0) + (env.hot === 'total' ? 0.03 * env.hotK : 0); g.scale(s, s);
      roll(g, v, -tot / 2, 0, { ...o, align: 'left' }); txt(g, ' MILLION', -tot / 2 + nw, 36, F.hero(96), landed ? rgba(theme.ink, 0.28) : t < p.at ? rgba(theme.ink, 0.16) : theme.ink, 'left'); g.restore();
      if (t > p.at) marker(g, -tot / 2, y0 + 336, tot, 8, landed ? rgba(theme.ink, 0.2) : theme.badInk, clamp((t - p.at - p.dur) / 0.3), 0.9);
      g.fillStyle = theme.rule; g.fillRect(x0 + 60, y0 + 384, w - 120, 4);
      // PAID tile
      const ak = clamp((t - p.askAt) / 0.2); if (ak > 0 && !landed) { g.save(); g.globalAlpha = ak; txt(g, p.askLabel, 0, y0 + 450, F.cap(50), theme.inkSoft); const q = 1 + 0.06 * Math.sin(t * 7); g.translate(0, y0 + 575); g.scale(q, q); txt(g, p.askQ, 0, 0, F.hero(170), theme.badInk); g.restore(); }
      if (landed) { const lt = t - dEnd, sc = 1 + 1.4 * (1 - ease.expo(clamp(lt / 0.2))) - 0.05 * wobble(lt - 0.18, 5, 9);
        g.save(); g.fillStyle = rgba(theme.ink, 0.1); rr(g, x0 + 20, y0 + 110, w - 40, 280, 14); g.fill(); g.restore();
        txt(g, p.payLabel, -170, y0 + 450, F.cap(54), theme.inkSoft); g.save(); g.globalAlpha = clamp(lt / 0.06); g.translate(0, y0 + 590); g.scale(sc, sc); g.rotate(-0.03); marker(g, -170, -108, 340, 190, theme.badInk, clamp((lt - 0.1) / 0.3), 0.16); txt(g, '$0', 0, 0, F.hero(250), theme.badInk); g.restore(); burst(g, 0, y0 + 590, 280, theme.bad, lt - 0.12, 20, 0.55);
        const sk = clamp((lt - 0.35) / 0.2); if (sk > 0) { g.save(); g.globalAlpha = clamp(sk * 3); g.translate(-45, y0 + 730); g.rotate(-0.045); g.scale(1 + 0.35 * (1 - ease.out(sk)), 1 + 0.35 * (1 - ease.out(sk))); g.strokeStyle = theme.badInk; g.lineWidth = 7; const bw = mw(p.stamp, F.hero(p.stampSize)) + 50; rr(g, -bw / 2, -46, bw, 92, 10); g.stroke(); txt(g, p.stamp, 0, 4, F.hero(p.stampSize), theme.badInk); g.restore(); } }
      txt(g, bb ? 'ILLUSTRATION · GENERIC BILLBOARD' : 'ILLUSTRATION · GENERIC TICKET', x0 + 28, y0 + h - 18, F.mono(16), theme.inkSoft, 'left');
    },
  });

  // ---------- verdict: case-file card. Gavel, stamp PLEADED GUILTY, "2017", UP TO 25 YEARS; optional footer chips ----------
  B.register('plea', {
    defaults: { guiltyAt: 99999, yearAt: 99999, yearsAt: 99999, chips: false, chipAt: 99999, endAt: 99999, barsAt: 99999, chipList: null }, size: p => [800, p.chips ? 800 : 700],
    anchors: p => { const y0 = -(p.chips ? 400 : 350); return { head: [0, y0 + 65, 760, 130], guilty: [0, y0 + 250, 700, 190], year: [0, y0 + 345, 340, 80], years: [0, y0 + 590, 720, 230], chips: [0, y0 + 725, 740, 80] }; },
    draw(g, p, env) {
      const { t, theme, lift } = env, w = 800, h = p.chips ? 800 : 700, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift });
      g.save(); rr(g, x0, y0, w, h, 26); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 130); g.restore(); txt(g, 'THE CASE FILE', x0 + 40, y0 + 66, F.hero(64), theme.paper, 'left');
      const ga = p.guiltyAt, ang = t < ga - 0.3 ? -0.95 : t < ga ? lerp(-0.95, 0.1, ease.in(lin(t, ga - 0.3, ga))) : 0.1 - 0.35 * hit(t - ga, 9) * Math.max(0, Math.sin((t - ga) * 18));
      g.save(); g.translate(x0 + w - 120, y0 + 98); clay(g, -62, 6, 124, 22, 8, theme.manila, { shadowK: 0.3 }); g.translate(0, -2); g.rotate(ang); clay(g, -9, -118, 18, 124, 8, theme.manila, { shadowK: 0.3 }); clay(g, -50, -150, 100, 58, 12, '#B9955A', { shadowK: 0.3 }); g.restore();
      { const gt = t - ga; if (gt > 0) { const sc = 1 + 1.3 * (1 - ease.expo(gt / 0.2)), a = clamp(gt / 0.08), yy = y0 + 250, hot = env.hot === 'guilty' ? 0.03 * env.hotK : 0; g.save(); g.globalAlpha = a; g.translate(0, yy); g.rotate(-0.04); g.scale(sc + hot, sc + hot); marker(g, -330, -86, 660, 150, theme.badInk, clamp((gt - 0.1) / 0.3), 0.16); txt(g, 'PLEADED GUILTY', 0, 0, F.hero(112), theme.badInk); g.restore(); burst(g, 0, yy, 300, theme.bad, gt - 0.1, 20, 0.55); } }
      { const yt0 = t - p.yearAt; if (yt0 > 0) { const s0 = 1 + 0.25 * hit(yt0, 8) + (env.hot === 'year' ? 0.03 * env.hotK : 0); g.save(); g.globalAlpha = clamp(yt0 / 0.1); g.translate(0, y0 + 355); g.scale(s0, s0); txt(g, '2017', 0, 0, F.mono(64), theme.ink); g.restore(); } }
      g.save(); g.strokeStyle = theme.rule; g.lineWidth = 3; g.setLineDash([10, 9]); g.beginPath(); g.moveTo(x0 + 40, y0 + 410); g.lineTo(x0 + w - 40, y0 + 410); g.stroke(); g.setLineDash([]); g.restore();
      { const yt = t - p.yearsAt; if (yt > -0.01) { const v = countAt(Math.max(0, yt), 0.6, 0, 25), land = yt - 0.6, s = 1 + (land > 0 ? 0.16 * hit(land, 6) : 0) + (env.hot === 'years' ? 0.03 * env.hotK : 0), o = { font: F.hero(200), size: 200, color: theme.ink, speed: yt < 0.6 ? 25 / 0.45 : 0 };
        const nw = B.rollWidth(g, 25, o).w, sw = mw(' YEARS', F.hero(120)), tot = nw + sw; g.save(); g.globalAlpha = clamp((yt + 0.01) / 0.1); txt(g, 'UP TO', 0, y0 + 452, F.cap(40), theme.inkSoft); g.translate(0, y0 + 590); g.scale(s, s); roll(g, v, -tot / 2, 0, { ...o, align: 'left' }); txt(g, ' YEARS', -tot / 2 + nw, 30, F.hero(120), theme.badInk, 'left'); if (land > 0) marker(g, -tot / 2, 112, tot, 9, theme.badInk, clamp(land / 0.3), 0.9); g.restore(); burst(g, 0, y0 + 590, 330, theme.bad, land, 18, 0.55); } }
      if (p.chips) { const ct = t - p.chipAt; if (ct > 0) { const ks = [spring(ct, 'snappy'), spring(Math.max(0, ct - 0.18), 'snappy')]; g.save(); g.globalAlpha = clamp(ct / 0.1);
        (p.chipList || [['RESTITUTION: MORE THAN $2M', -190, 0, 350], ['PAROLED 2022', 240, 1, 260]]).forEach(([s, x, i, bw]) => { g.save(); g.translate(x, y0 + 730 + (1 - ks[i]) * 24); g.globalAlpha = clamp((ct - i * 0.18) / 0.1); clay(g, -bw / 2, -34, bw, 68, 20, theme.navy, { shadowK: 0.4 }); txt(g, s, 0, 2, F.cap(i ? 28 : 25), theme.paper); g.restore(); }); g.restore(); } }
      { const bt = t - p.barsAt; if (bt > 0) { g.save(); rr(g, x0, y0, w, h, 26); g.clip(); for (let i = 0; i < 9; i++) { const k = ease.out(clamp((bt - i * 0.035) / 0.3)); if (k <= 0) continue; const bx = x0 + 44 + i * ((w - 88) / 8); clay(g, bx - 10, y0 + 130 - (1 - k) * h, 20, (h - 130) * k, 8, '#3a4350', { shadowK: 0.5 }); } g.restore(); } }
    },
  });

  // ---------- plane (screen): paper plane flick ----------
  B.register('plane', {
    defaults: { dur: 1.9, from: [-420, 330], to: [440, -360], s: 2.2 }, size: () => [10, 10],
    draw(g, p, env) {
      const lt = env.lt, u = ease.out(lin(lt, 0, p.dur)), pos = k => [lerp(p.from[0], p.to[0], k), lerp(p.from[1], p.to[1], k) - Math.sin(Math.PI * k) * 150], [px, py] = pos(u), [qx, qy] = pos(Math.min(1, u + 0.02)), a = Math.atan2(qy - py, qx - px) || -0.6;
      g.save(); g.strokeStyle = rgba(env.theme.accent, 0.85); g.lineWidth = 6; g.lineCap = 'round'; g.setLineDash([2, 22]); g.beginPath(); for (let i = 0; i <= 30; i++) { const [x, y] = pos(u * i / 30); i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); g.setLineDash([]); g.restore();
      g.save(); g.translate(px, py); g.rotate(a); const s = p.s * (0.7 + 0.3 * spring(lt, 'snappy')); g.scale(s, s);
      g.shadowColor = 'rgba(2,4,9,.4)'; g.shadowBlur = 24; g.shadowOffsetY = 14; g.fillStyle = env.theme.paper; g.beginPath(); g.moveTo(70, 0); g.lineTo(-56, -38); g.lineTo(-30, 0); g.lineTo(-56, 38); g.closePath(); g.fill(); g.shadowColor = 'transparent';
      g.fillStyle = '#D8D3C7'; g.beginPath(); g.moveTo(70, 0); g.lineTo(-30, 0); g.lineTo(-56, 38); g.closePath(); g.fill(); g.fillStyle = 'rgba(255,255,255,.7)'; g.beginPath(); g.moveTo(70, 0); g.lineTo(-56, -38); g.lineTo(-30, -2); g.closePath(); g.fill(); g.strokeStyle = 'rgba(0,0,0,.25)'; g.lineWidth = 2; g.beginPath(); g.moveTo(70, 0); g.lineTo(-30, 0); g.stroke(); g.restore();
    },
  });

  // ---------- heart (screen): one pulse ----------
  B.register('heart', {
    defaults: { s: 1 }, size: () => [10, 10],
    draw(g, p, env) {
      const lt = env.lt, k = spring(lt, 'bouncy'), pulse = 1 + 0.3 * Math.max(0, Math.sin(lt * Math.PI * 2 / 0.4 - 0.4)) * (lt < 0.8 ? 1 : 0), sc = (0.4 + 0.6 * k) * pulse * p.s * 1.3, th = env.theme;
      g.save(); g.scale(sc, sc); const path = () => { g.beginPath(); g.moveTo(0, 62); g.bezierCurveTo(-120, -10, -78, -86, 0, -34); g.bezierCurveTo(78, -86, 120, -10, 0, 62); g.closePath(); };
      B.shadowed(g, path, th.bad, 0.2); g.save(); path(); g.clip(); const lg = g.createLinearGradient(0, -80, 0, 70); lg.addColorStop(0, 'rgba(255,255,255,.3)'); lg.addColorStop(0.4, 'rgba(255,255,255,0)'); lg.addColorStop(1, 'rgba(0,0,0,.22)'); g.fillStyle = lg; g.fillRect(-130, -90, 260, 170); g.restore();
      g.strokeStyle = th.paper; g.lineWidth = 8; path(); g.stroke(); g.restore(); burst(g, 0, 0, 90 * p.s, th.bad, lt - 0.05, 8, 0.4);
    },
  });
})();
