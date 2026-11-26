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
// ===== Lottery rig CRIME-SHOW pass (RULES 112) — the con as a recurring COLOURED ILLUSTRATED CHARACTER ("the lottery IT guy"). =====
// No licensed photo of Eddie Tipton exists (brand/photos/VERIFIED.md), so every treatment uses the SAME cartoon design, labelled ILLUSTRATION.
(function () {
  const B = window.BM2, { clamp, lerp, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, hit, hash } = B;
  const INK = '#1a1210', SK = '#E9B68C', SKS = '#D49A70', HAIR = '#3a2417', SHIRT = '#2F5DA8', LANY = '#F28C00', RED = '#E0281E';
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const stroke = (g, w = 5) => { g.strokeStyle = INK; g.lineWidth = w; g.lineJoin = 'round'; g.lineCap = 'round'; g.stroke(); };

  // ---------- the character: head + shoulders, centred on the head, ~300 x 380 units ----------
  const tip = (g, cx, cy, s, o = {}) => {
    const caught = o.mood === 'caught', t = o.t || 0; g.save(); g.translate(cx, cy); g.scale(s, s);
    // shoulders / shirt
    g.fillStyle = SHIRT; g.beginPath(); g.moveTo(-150, 215); g.quadraticCurveTo(-148, 112, -60, 94); g.lineTo(60, 94); g.quadraticCurveTo(148, 112, 150, 215); g.closePath(); g.fill(); stroke(g, 5);
    // neck + collar
    g.fillStyle = SKS; g.beginPath(); g.moveTo(-32, 58); g.lineTo(32, 58); g.lineTo(36, 104); g.lineTo(0, 130); g.lineTo(-36, 104); g.closePath(); g.fill(); stroke(g, 4);
    g.fillStyle = '#F5F3EE'; g.beginPath(); g.moveTo(-62, 92); g.lineTo(-8, 92); g.lineTo(-2, 134); g.lineTo(-44, 122); g.closePath(); g.fill(); stroke(g, 4);
    g.beginPath(); g.moveTo(62, 92); g.lineTo(8, 92); g.lineTo(2, 134); g.lineTo(44, 122); g.closePath(); g.fill(); stroke(g, 4);
    // lanyard + security badge
    g.fillStyle = LANY; g.beginPath(); g.moveTo(-46, 96); g.lineTo(-30, 96); g.lineTo(-2, 150); g.lineTo(-16, 156); g.closePath(); g.fill(); stroke(g, 3);
    g.beginPath(); g.moveTo(46, 96); g.lineTo(30, 96); g.lineTo(2, 150); g.lineTo(16, 156); g.closePath(); g.fill(); stroke(g, 3);
    g.fillStyle = '#F5F3EE'; rr(g, -40, 150, 80, 92, 8); g.fill(); stroke(g, 4); g.fillStyle = '#2c3e66'; g.fillRect(-38, 152, 76, 22);
    txt(g, 'MUSL', 0, 163, F.cap(15), '#F5F3EE'); txt(g, 'IT SECURITY', 0, 188, F.cap(10.5), INK);
    g.fillStyle = '#C9CED6'; g.beginPath(); g.arc(0, 213, 15, 0, 7); g.fill(); stroke(g, 2.5); g.fillStyle = '#59606B'; g.fillRect(-14, 232, 28, 5);
    // ears + head
    g.fillStyle = SKS; for (const sx of [-1, 1]) { g.beginPath(); g.ellipse(sx * 80, 4, 13, 22, 0, 0, 7); g.fill(); stroke(g, 4); }
    g.fillStyle = SK; g.beginPath(); g.ellipse(0, -6, 79, 94, 0, 0, 7); g.fill(); stroke(g, 5);
    // hair
    g.fillStyle = HAIR; g.beginPath(); g.moveTo(-82, -20); g.bezierCurveTo(-98, -104, -40, -126, 8, -122); g.bezierCurveTo(62, -124, 100, -90, 82, -20); g.bezierCurveTo(70, -54, 40, -74, -2, -74); g.bezierCurveTo(-42, -70, -68, -52, -82, -20); g.closePath(); g.fill(); stroke(g, 4.5);
    // glasses
    g.fillStyle = 'rgba(205,232,255,.62)'; for (const x of [-64, 12]) { rr(g, x, -26, 52, 40, 11); g.fill(); stroke(g, 6); }
    g.beginPath(); g.moveTo(-12, -10); g.lineTo(12, -10); stroke(g, 5); g.beginPath(); g.moveTo(-64, -12); g.lineTo(-80, -16); g.moveTo(64, -12); g.lineTo(80, -16); stroke(g, 4);
    // eyes (blink every ~3 s)
    const bl = (t % 3.1) > 3.0 ? 0.15 : 1, lk = o.look || 0, pr = caught ? 9 : 6.5; g.fillStyle = caught ? '#fff' : 'transparent';
    for (const x of [-38, 38]) { if (caught) { g.fillStyle = '#fff'; g.beginPath(); g.ellipse(x, -7, 15, 14 * bl, 0, 0, 7); g.fill(); } g.fillStyle = INK; g.beginPath(); g.ellipse(x + lk * 5, -6, pr, pr * bl, 0, 0, 7); g.fill(); }
    // brows + nose + mouth
    g.beginPath(); if (caught) { g.moveTo(-66, -34); g.lineTo(-16, -48); g.moveTo(66, -34); g.lineTo(16, -48); } else { g.moveTo(-66, -40); g.lineTo(-16, -44); g.moveTo(16, -48); g.lineTo(64, -38); } stroke(g, 6);
    g.beginPath(); g.moveTo(-3, 6); g.quadraticCurveTo(-12, 28, 4, 30); stroke(g, 4);
    g.beginPath(); if (caught) { g.moveTo(-28, 58); g.quadraticCurveTo(-10, 48, 0, 56); g.quadraticCurveTo(12, 64, 30, 52); } else { g.moveTo(-30, 54); g.quadraticCurveTo(6, 70, 38, 44); } stroke(g, 5.5);
    if (!caught) { g.beginPath(); g.moveTo(38, 44); g.lineTo(44, 38); stroke(g, 4.5); }
    if (caught) { const dy = (t * 40) % 30; g.fillStyle = '#7CC8FF'; g.beginPath(); g.moveTo(98, -66 + dy); g.quadraticCurveTo(116, -36 + dy, 98, -30 + dy); g.quadraticCurveTo(80, -36 + dy, 98, -66 + dy); g.fill(); stroke(g, 3); }
    // thumb drive in his hand
    if (o.drive) { g.save(); g.translate(128, 170); g.rotate(-0.45); g.fillStyle = SK; g.beginPath(); g.arc(0, 52, 26, 0, 7); g.fill(); stroke(g, 4); g.fillStyle = RED; rr(g, -17, -34, 34, 78, 8); g.fill(); stroke(g, 4.5); g.fillStyle = '#C9CED6'; rr(g, -12, -72, 24, 42, 4); g.fill(); stroke(g, 4); g.fillStyle = INK; g.fillRect(-6, -64, 4, 10); g.fillRect(3, -64, 4, 10); g.fillStyle = SK; g.beginPath(); g.ellipse(0, 40, 27, 20, 0, 0, 7); g.fill(); stroke(g, 4); g.restore(); }
    g.restore();
  };
  B.tip = tip;

  // gold portrait panel (clipped), with optional ken-burns push, wall lines (mugshot) and cage bars
  const panel = (g, x, y, w, h, o = {}) => {
    g.save(); rr(g, x, y, w, h, 18); g.clip();
    const bg = g.createRadialGradient(x + w / 2, y + h * 0.35, 20, x + w / 2, y + h * 0.5, Math.max(w, h) * 0.8);
    if (o.wall) { bg.addColorStop(0, '#E9EEF5'); bg.addColorStop(1, '#AEB9C9'); } else { bg.addColorStop(0, '#FFD866'); bg.addColorStop(1, '#E9980B'); }
    g.fillStyle = bg; g.fillRect(x, y, w, h);
    if (o.wall) { g.strokeStyle = 'rgba(11,15,20,.35)'; g.lineWidth = 2; for (let i = 0; i < 16; i++) { const yy = y + h - i * h / 16; g.beginPath(); g.moveTo(x + w - (i % 5 === 0 ? 60 : 30), yy); g.lineTo(x + w, yy); g.stroke(); if (i % 5 === 0) txt(g, String(i * 10 / 5 + 150), x + w - 82, yy - 2, F.mono(14), 'rgba(11,15,20,.5)'); } }
    else { g.fillStyle = 'rgba(255,255,255,.14)'; for (let i = -6; i < 8; i++) { g.beginPath(); g.moveTo(x + w / 2 + i * 60 - 14, y); g.lineTo(x + w / 2 + i * 60 + 14, y); g.lineTo(x + w / 2 + i * 150 + 14, y + h); g.lineTo(x + w / 2 + i * 150 - 14, y + h); g.fill(); } }
    const k = 1 + (o.push || 0), sc = (o.scale || h / 330) * k;
    tip(g, x + w / 2, y + h * 0.5 - 6 * sc + (o.dy || 0), sc, { mood: o.mood, drive: o.drive, t: o.t, look: o.look });
    if (o.tint) { g.fillStyle = `rgba(20,10,10,${o.tint})`; g.fillRect(x, y, w, h); }
    if (o.bars > 0) { const n = 7; for (let i = 0; i < n; i++) { const bx = x + (i + 0.5) * w / n, bh = h * ease.out(clamp(o.bars * 1.4 - i * 0.05)); g.fillStyle = '#1b1f27'; g.fillRect(bx - 9, y, 18, bh); g.fillStyle = 'rgba(255,255,255,.22)'; g.fillRect(bx - 6, y, 4, bh); } if (o.bars > 0.6) { g.fillStyle = '#1b1f27'; g.fillRect(x, y + h * 0.3, w, 14); g.fillRect(x, y + h * 0.72, w, 14); } }
    g.restore(); g.strokeStyle = INK; g.lineWidth = 5; rr(g, x, y, w, h, 18); g.stroke();
  };
  const stamp = (g, text, x, y, rot, k, size = 70, col = RED) => { if (k <= 0) return; const s = 1 + 1.4 * (1 - ease.expo(clamp(k / 0.18))); g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s); g.globalAlpha = clamp(k / 0.05); const w = mw(text, F.hero(size)) + 44; g.strokeStyle = col; g.lineWidth = 9; rr(g, -w / 2, -size * 0.62, w, size * 1.24, 12); g.stroke(); g.lineWidth = 3; rr(g, -w / 2 + 9, -size * 0.62 + 9, w - 18, size * 1.24 - 18, 8); g.stroke(); g.fillStyle = 'rgba(245,243,238,.82)'; rr(g, -w / 2 + 5, -size * 0.62 + 5, w - 10, size * 1.24 - 10, 9); g.fill(); txt(g, text, 0, 3, F.hero(size), col); g.restore(); };
  const xmark = (g, cx, cy, r, k) => { if (k <= 0) return; g.save(); g.lineCap = 'round'; for (const [c, wd] of [['#F5F3EE', 44], [RED, 30]]) { g.strokeStyle = c; g.lineWidth = wd; g.beginPath(); g.moveTo(cx - r, cy - r); g.lineTo(cx - r + 2 * r * ease.out(clamp(k * 2)), cy - r + 2 * r * ease.out(clamp(k * 2))); g.stroke(); if (k > 0.5) { g.beginPath(); g.moveTo(cx + r, cy - r); g.lineTo(cx + r - 2 * r * ease.out(clamp((k - 0.5) * 2)), cy - r + 2 * r * ease.out(clamp((k - 0.5) * 2))); g.stroke(); } } g.restore(); };
  const plate = (g, x, y, w, name, sub, th, nameK = 1) => { g.fillStyle = th.navy; rr(g, x, y, w, 96, 12); g.fill(); const n = Math.max(0, Math.floor(name.length * nameK)); txt(g, name.slice(0, n) + (nameK < 1 && nameK > 0 && (Math.floor(nameK * 40) % 2) ? '▌' : ''), x + w / 2, y + 50, F.hero(64), th.paper); g.fillStyle = RED; rr(g, x, y + 104, w, 52, 10); g.fill(); txt(g, sub, x + w / 2, y + 131, F.cap(28), '#F5F3EE'); };

  // ---------- suspect: modes case | quote | caught | verdict ----------
  B.register('suspect', {
    defaults: { mode: 'case', mood: 'smug', nameAt: 99999, stampAt: 99999, stampText: '', xAt: 99999, barsAt: 99999, note: '', noteAt: 99999, flipAt: 99999, head: 'HIS JOB', lines: ['KEEP THE', 'LOTTERY SAFE'], flipHead: 'THE TRUTH', flipLines: ['HE RIGGED IT'], year: '', sub: 'THE LOTTERY IT GUY', drive: false },
    ownEnter: true, size: p => (p.mode === 'quote' ? [960, 640] : [640, 860]),
    anchors: p => (p.mode === 'quote' ? { face: [-290, 0, 360, 460], quote: [220, 0, 480, 420] } : { face: [0, -100, 460, 470], name: [0, 270, 560, 100], stamp: [0, 160, 560, 150] }),
    draw(g, p, env) {
      const { lt, t, theme } = env, k = spring(lt, 'heavy'), push = clamp(lt / 7) * 0.07, flash = clamp(1 - lt / 0.22);
      g.save(); g.translate(0, (1 - k) * 260); g.rotate((1 - k) * -0.12 + (p.mode === 'quote' ? -0.015 : 0.012)); g.globalAlpha *= clamp(lt / 0.08);
      if (p.mode === 'case') {
        paper(g, -320, -380, 640, 800, 20, { fill: theme.manila, lift: env.lift }); g.fillStyle = theme.manila; rr(g, -320, -430, 250, 70, 14); g.fill(); g.strokeStyle = 'rgba(11,15,20,.25)'; g.lineWidth = 2; rr(g, -320, -430, 250, 70, 14); g.stroke(); txt(g, 'CASE FILE Nº 001', -195, -396, F.mono(22), theme.ink);
        panel(g, -262, -338, 524, 440, { push, t, drive: p.drive }); const nk = clamp((t - p.nameAt) / 0.7); plate(g, -262, 124, 524, 'EDDIE TIPTON', p.sub, theme, nk);
        txt(g, 'ILLUSTRATION', -250, 372, F.mono(16), theme.inkSoft, 'left');
        // red string from a pin on the file to a taped note
        const pk = ease.out(clamp((t - p.noteAt) / 0.5)); g.fillStyle = RED; g.beginPath(); g.arc(0, -352, 13, 0, 7); g.fill(); stroke(g, 3);
        if (pk > 0) { const ex = 420, ey = -150; g.strokeStyle = '#D61F14'; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.moveTo(0, -352); g.quadraticCurveTo(220, -310 + 30 * Math.sin(t * 2), lerp(0, ex, pk), lerp(-352, ey, pk)); g.stroke();
          if (pk > 0.9) { g.save(); g.translate(ex + 20, ey + 8); g.rotate(0.07); paper(g, -130, -62, 260, 124, 8, { fill: '#FFF4B8', lift: 0.3, grain: false }); const parts = p.note.split('|'); parts.forEach((s, i) => txt(g, s, 0, -22 + i * 50, F.hero(i ? 50 : 40), i ? RED : theme.ink)); g.restore(); } }
      } else if (p.mode === 'quote') {
        g.save(); g.translate(-300, 0); g.rotate(-0.035); paper(g, -190, -300, 380, 560, 18, { lift: env.lift }); panel(g, -168, -278, 336, 376, { push, t, drive: p.drive }); g.fillStyle = theme.navy; rr(g, -168, 112, 336, 56, 10); g.fill(); txt(g, 'THE LOTTERY IT GUY', 0, 140, F.cap(25), theme.paper); txt(g, 'ILLUSTRATION', -170, 206, F.mono(15), theme.inkSoft, 'left'); txt(g, 'EDDIE TIPTON', 0, 238, F.hero(36), theme.ink); g.restore();
        const fl = t >= p.flipAt, fk = spring(Math.max(0, t - p.flipAt), 'bouncy'), L = fl ? p.flipLines : p.lines, hd = fl ? p.flipHead : p.head, col = fl ? RED : '#00A152';
        g.save(); g.translate(190, -20); if (fl) g.scale(0.9 + 0.1 * fk, 0.9 + 0.1 * fk); paper(g, -270, -300, 540, 560, 22, { lift: env.lift + 0.1 }); g.fillStyle = theme.paper; g.beginPath(); g.moveTo(-270, -20); g.lineTo(-330, 20); g.lineTo(-270, 50); g.fill();
        g.fillStyle = col; rr(g, -236, -268, 280, 52, 10); g.fill(); txt(g, hd + ':', -96, -241, F.cap(30), '#F5F3EE');
        L.forEach((s, i) => txt(g, s, 0, -120 + i * 100, F.hero(L.length > 2 ? 80 : 92), i === L.length - 1 ? col : theme.ink));
        g.translate(0, 150); g.fillStyle = col; g.beginPath(); g.arc(0, 0, 62, 0, 7); g.fill(); stroke(g, 5); g.strokeStyle = '#F5F3EE'; g.lineWidth = 16; g.lineCap = 'round'; g.beginPath(); if (fl) { g.moveTo(-26, -26); g.lineTo(26, 26); g.moveTo(26, -26); g.lineTo(-26, 26); } else { g.moveTo(-28, 2); g.lineTo(-8, 24); g.lineTo(30, -22); } g.stroke(); g.restore();
      } else { // caught | verdict : booking-style placard
        paper(g, -320, -380, 640, 800, 20, { fill: '#F5F3EE', lift: env.lift }); const bars = p.mode === 'verdict' ? ease.out(clamp((t - p.barsAt) / 0.9)) : 0;
        panel(g, -262, -338, 524, 440, { wall: true, mood: 'caught', push, t, tint: 0.12 + 0.12 * (p.mode === 'verdict' ? 1 : 0), bars, dy: 0 });
        xmark(g, 0, -118, 150, (t - p.xAt) / 0.5);
        plate(g, -262, 124, 524, 'EDDIE TIPTON', p.sub, theme, 1); txt(g, 'ILLUSTRATION', -250, 372, F.mono(16), theme.inkSoft, 'left'); if (p.year) txt(g, p.year, 250, 372, F.mono(18), theme.inkSoft, 'right');
        stamp(g, p.stampText, 0, 40, -0.1, t - p.stampAt, p.stampText.length > 14 ? 58 : 76);
      }
      if (flash > 0) { g.fillStyle = `rgba(255,255,255,${0.85 * flash})`; g.fillRect(-500, -500, 1000, 1000); }
      g.restore();
    },
  });

  // ---------- pip: small picture-in-picture of him in the left strip (screen layer) with a pointer + changing label ----------
  B.register('pip', {
    defaults: { labels: [], big: 1.1, mood: 'smug', driveAt: 99999, driveUntil: 99999, barsAt: 99999, stampAt: 99999, stampText: '', arrow: true, sub: 'THE LOTTERY IT GUY' }, ownEnter: true, size: () => [240, 380],
    anchors: () => ({ face: [0, -40, 220, 260] }),
    draw(g, p, env) {
      const { lt, t, theme } = env, k = spring(lt, 'snappy'); g.save(); g.translate((1 - k) * -300, 0); g.scale(p.big, p.big); g.rotate(-0.025); g.globalAlpha *= clamp(lt / 0.08);
      paper(g, -112, -170, 224, 300, 14, { lift: 0.5 }); const bars = ease.out(clamp((t - p.barsAt) / 0.8)); panel(g, -100, -158, 200, 214, { push: clamp(lt / 8) * 0.06, t, mood: p.mood, drive: t >= p.driveAt && t < p.driveUntil, bars, wall: p.mood === 'caught', tint: p.mood === 'caught' ? 0.15 : 0 });
      g.fillStyle = theme.navy; rr(g, -100, 62, 200, 32, 8); g.fill(); txt(g, p.sub, 0, 79, F.cap(14.5), theme.paper); txt(g, 'EDDIE TIPTON', 0, 108, F.hero(26), theme.ink); txt(g, 'ILLUSTRATION', 0, 124, F.mono(10), theme.inkSoft);
      stamp(g, p.stampText, 0, -40, -0.12, t - p.stampAt, 40);
      let L = null; for (const l of p.labels) if (t >= l.at && (l.until == null || t < l.until)) L = l;
      if (L) { const o = t - L.at, lk = spring(o, 'bouncy'), col = L.tone === 'bad' ? RED : L.tone === 'gold' ? '#F2B705' : theme.paper; g.save(); g.translate(0, 168 + (1 - lk) * 14); g.globalAlpha = clamp(o / 0.08); const w = Math.max(200, mw(L.text, F.cap(20)) + 26); g.fillStyle = theme.ink; rr(g, -w / 2, -22, w, 46, 10); g.fill(); g.strokeStyle = col; g.lineWidth = 3; rr(g, -w / 2, -22, w, 46, 10); g.stroke(); txt(g, L.text, 0, 2, F.cap(20), col); g.restore();
        if (p.arrow) { g.save(); g.translate(128 + 8 * Math.sin(t * 6), -30); g.fillStyle = col === theme.paper ? '#F2B705' : col; g.beginPath(); g.moveTo(0, -22); g.lineTo(34, 0); g.lineTo(0, 22); g.lineTo(0, 9); g.lineTo(-22, 9); g.lineTo(-22, -9); g.lineTo(0, -9); g.closePath(); g.fill(); stroke(g, 3); g.restore(); } }
      g.restore();
    },
  });

  // ---------- cast: consistent character cards for the other people in the story (screen or world) ----------
  B.register('cast', {
    defaults: { kind: 'player' }, ownEnter: true, size: () => [300, 400],
    draw(g, p, env) {
      const { lt, t, theme } = env, k = spring(lt, 'snappy'), K = { player: ['#DDE9F7', 'THE PLAYERS', '#1FA366'], lottery: ['#FBE9C0', 'THE LOTTERY', '#2c3e66'], friend: ['#E6DAF5', 'THE OTHERS', '#7A4FD0'] }[p.kind];
      g.save(); g.translate((1 - k) * -280, 0); g.rotate(0.03); g.globalAlpha *= clamp(lt / 0.08); paper(g, -140, -190, 280, 380, 14, { lift: 0.4 }); g.save(); rr(g, -126, -176, 252, 284, 12); g.clip(); g.fillStyle = K[0]; g.fillRect(-126, -176, 252, 284);
      const bob = Math.sin(t * 3) * 3; g.translate(0, bob); // body
      g.fillStyle = K[2]; g.beginPath(); g.moveTo(-100, 120); g.quadraticCurveTo(-98, 20, -40, 6); g.lineTo(40, 6); g.quadraticCurveTo(98, 20, 100, 120); g.closePath(); g.fill(); stroke(g, 5);
      if (p.kind === 'lottery') { g.fillStyle = '#F5F3EE'; g.beginPath(); g.moveTo(-26, 6); g.lineTo(26, 6); g.lineTo(0, 60); g.closePath(); g.fill(); stroke(g, 3); g.fillStyle = RED; g.beginPath(); g.moveTo(-9, 20); g.lineTo(9, 20); g.lineTo(5, 80); g.lineTo(-5, 80); g.closePath(); g.fill(); }
      g.fillStyle = SK; g.beginPath(); g.ellipse(0, -52, 52, 60, 0, 0, 7); g.fill(); stroke(g, 5);
      if (p.kind === 'friend') { g.fillStyle = '#7A4FD0'; g.beginPath(); g.moveTo(-64, -40); g.bezierCurveTo(-70, -130, 70, -130, 64, -40); g.bezierCurveTo(50, -80, -50, -80, -64, -40); g.fill(); stroke(g, 4); g.fillStyle = INK; rr(g, -44, -62, 88, 22, 8); g.fill(); }
      else { g.fillStyle = p.kind === 'player' ? '#8B5A2B' : '#2a2a30'; g.beginPath(); g.moveTo(-54, -58); g.bezierCurveTo(-60, -122, 60, -122, 54, -58); g.bezierCurveTo(40, -88, -40, -88, -54, -58); g.fill(); stroke(g, 4); g.fillStyle = INK; for (const x of [-20, 20]) { g.beginPath(); g.arc(x, -52, 5.5, 0, 7); g.fill(); } g.beginPath(); g.moveTo(-18, -22); g.quadraticCurveTo(0, -8, 18, -22); stroke(g, 4.5); }
      // held prop
      g.save(); g.translate(78, 60); g.rotate(-0.25);
      if (p.kind === 'player') { paper(g, -34, -50, 68, 98, 6, { fill: '#FFF4B8', lift: 0.1, grain: false }); for (let i = 0; i < 3; i++) { g.fillStyle = [RED, '#F2B705', '#2c3e66'][i]; g.beginPath(); g.arc(-16 + i * 16, -24, 7, 0, 7); g.fill(); } txt(g, 'TICKET', 0, 18, F.cap(13), INK); }
      else if (p.kind === 'lottery') { g.fillStyle = RED; g.beginPath(); g.arc(0, 0, 36, 0, 7); g.fill(); stroke(g, 4); g.fillStyle = '#F5F3EE'; g.beginPath(); g.arc(0, 0, 19, 0, 7); g.fill(); txt(g, '17', 0, 2, F.hero(24), INK); }
      else { g.fillStyle = '#C9A24A'; g.beginPath(); g.ellipse(0, 12, 36, 42, 0, 0, 7); g.fill(); stroke(g, 4); txt(g, '$', 0, 14, F.hero(40), INK); }
      g.restore(); g.restore();
      g.fillStyle = K[2]; rr(g, -126, 116, 252, 44, 8); g.fill(); txt(g, K[1], 0, 139, F.cap(26), '#F5F3EE'); txt(g, 'ILLUSTRATION', 0, 176, F.mono(11), theme.inkSoft); g.restore();
    },
  });

  // ---------- dcard: typewriter date/location slug (screen layer) ----------
  B.register('dcard', {
    defaults: { text: '2010 · IOWA', sub: 'CASE FILE Nº 001' }, ownEnter: true, size: () => [680, 150],
    draw(g, p, env) {
      const { lt, theme } = env, k = ease.out(clamp(lt / 0.25)), n = Math.min(p.text.length, Math.floor(lt / 0.05)); g.save(); g.translate((1 - k) * -500, 0);
      clay(g, -340, -64, 680, 128, 16, '#12161d', { shadowK: 0.6 }); g.fillStyle = RED; g.fillRect(-340, -64, 22, 128); txt(g, p.sub, -300, -38, F.mono(18), 'rgba(245,243,238,.6)', 'left'); txt(g, p.text.slice(0, n) + (lt < p.text.length * 0.05 + 0.5 && Math.floor(lt * 8) % 2 ? '▌' : ''), -300, 14, F.monoX(62), '#F5F3EE', 'left'); g.restore();
    },
  });

  // ---------- usb: the thumb drive popup (screen layer) ----------
  B.register('usb', {
    defaults: { label: 'THUMB DRIVE' }, ownEnter: true, size: () => [400, 300],
    draw(g, p, env) {
      const { lt, t, theme } = env, k = spring(lt, 'bouncy'); g.save(); g.scale(0.6 + 0.4 * k, 0.6 + 0.4 * k); g.rotate(-0.1); paper(g, -190, -130, 380, 260, 18, { lift: 0.5 });
      g.save(); g.translate(0, -12 + 4 * Math.sin(t * 5)); g.fillStyle = '#C9CED6'; rr(g, 40, -34, 100, 68, 6); g.fill(); stroke(g, 5); g.fillStyle = INK; g.fillRect(100, -18, 24, 10); g.fillRect(100, 6, 24, 10); g.fillStyle = RED; rr(g, -150, -46, 200, 92, 16); g.fill(); stroke(g, 5); g.fillStyle = 'rgba(255,255,255,.3)'; rr(g, -138, -38, 160, 18, 8); g.fill(); txt(g, 'CODE', -50, 14, F.hero(40), '#F5F3EE'); g.restore();
      txt(g, p.label, 0, 74, F.cap(34), theme.ink); txt(g, 'ILLUSTRATION · PROSECUTORS SAY', 0, 108, F.mono(13), theme.inkSoft); g.restore();
    },
  });

  // ---------- board: the evidence board recap (cork, his portrait pinned, red strings to the evidence) ----------
  B.register('board', {
    defaults: { at: [], tightAt: 99999, ticket: '$16.5M', paid: '$0' }, size: () => [1000, 1240],
    anchors: () => ({ face: [0, -400, 280, 340], ticket: [-290, -60, 360, 200], states: [290, -60, 300, 200], code: [-290, 250, 340, 190], others: [290, 250, 340, 190], paid: [0, 505, 560, 170] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, X = -500, Y = -620;
      shadowedBoard(g, X, Y, 1000, 1240, lift); g.save(); rr(g, X, Y, 1000, 1240, 14); g.clip(); for (let i = 0; i < 520; i++) { g.fillStyle = `rgba(${hash(i) > 0.5 ? '60,34,14' : '240,200,150'},${0.10 + 0.1 * hash(i * 3.1)})`; g.beginPath(); g.arc(X + hash(i * 1.7) * 1000, Y + hash(i * 2.9) * 1240, 2 + hash(i * 5.3) * 3, 0, 7); g.fill(); } g.restore();
      g.strokeStyle = '#5a3a1c'; g.lineWidth = 26; rr(g, X, Y, 1000, 1240, 14); g.stroke();
      txt(g, 'EVIDENCE BOARD', 0, -566, F.mono(26), 'rgba(40,20,8,.7)');
      const pin = [0, -452], items = [[-290, -60], [290, -60], [-290, 250], [290, 250], [0, 505]], tight = ease.out(clamp((t - p.tightAt) / 0.4)), shake = tight > 0 && tight < 1 ? Math.sin(t * 70) * 3 : 0;
      // strings first
      items.forEach((it, i) => { const k = ease.out(clamp((t - p.at[i] - 0.1) / 0.3)); if (k <= 0) return; const ex = lerp(pin[0], it[0], k), ey = lerp(pin[1], it[1] - 110, k), sag = 36 * (1 - tight); g.strokeStyle = '#D61F14'; g.lineWidth = 5 + 3 * tight; g.lineCap = 'round'; g.beginPath(); g.moveTo(pin[0], pin[1]); g.quadraticCurveTo((pin[0] + ex) / 2 + shake, (pin[1] + ey) / 2 + sag, ex, ey); g.stroke(); });
      const pop = i => spring(Math.max(0, t - p.at[i]), 'bouncy'), on = i => t >= p.at[i] - 0.02;
      // portrait (always there)
      g.save(); g.translate(0, -300); g.rotate(-0.02); paper(g, -150, -160, 300, 360, 12, { lift: 0.3 }); panel(g, -134, -144, 268, 250, { push: 0, t, mood: tight > 0.5 ? 'caught' : 'smug' }); txt(g, 'EDDIE TIPTON', 0, 134, F.hero(34), theme.ink); txt(g, 'THE LOTTERY IT GUY', 0, 168, F.cap(17), RED); g.restore();
      g.fillStyle = RED; g.beginPath(); g.arc(pin[0], pin[1], 15, 0, 7); g.fill(); stroke(g, 3);
      const card = (i, cx, cy, w, h, rot, fill, fn) => { if (!on(i)) return; const s = 0.6 + 0.4 * pop(i); g.save(); g.translate(cx, cy); g.rotate(rot); g.scale(s, s); paper(g, -w / 2, -h / 2, w, h, 10, { fill, lift: 0.3, grain: false }); fn(); g.fillStyle = RED; g.beginPath(); g.arc(0, -h / 2 - 2, 11, 0, 7); g.fill(); stroke(g, 3); g.restore(); };
      card(0, -290, -60, 360, 200, -0.04, '#F5F3EE', () => { txt(g, '2010 JACKPOT', 0, -62, F.cap(26), theme.ink); txt(g, p.ticket, 0, 6, F.hero(86), '#00A152'); txt(g, 'ADVERTISED', 0, 66, F.mono(20), theme.inkSoft); });
      card(1, 290, -60, 300, 200, 0.045, '#F5F3EE', () => { txt(g, 'FIVE STATES', 0, -58, F.cap(30), theme.ink); for (let i = 0; i < 5; i++) { g.fillStyle = RED; g.beginPath(); g.arc(-96 + i * 48, 6, 15, 0, 7); g.fill(); stroke(g, 3); g.fillStyle = '#F5F3EE'; g.beginPath(); g.arc(-96 + i * 48, 6, 5, 0, 7); g.fill(); } txt(g, 'PLEADED GUILTY', 0, 62, F.mono(19), RED); });
      card(2, -290, 250, 340, 190, -0.03, theme.manila, () => { txt(g, '</>  THE CODE', 0, -52, F.cap(30), theme.ink); g.save(); g.translate(0, 16); g.fillStyle = RED; rr(g, -70, -26, 100, 52, 10); g.fill(); stroke(g, 3.5); g.fillStyle = '#C9CED6'; rr(g, 20, -16, 52, 32, 4); g.fill(); stroke(g, 3.5); g.restore(); txt(g, 'THUMB DRIVE', 0, 68, F.mono(18), theme.inkSoft); });
      card(3, 290, 250, 340, 190, 0.035, '#F5F3EE', () => { txt(g, 'THE OTHERS WON', 0, -52, F.cap(28), theme.ink); for (let i = 0; i < 3; i++) { const x = -80 + i * 80; g.fillStyle = '#7A4FD0'; g.beginPath(); g.moveTo(x - 30, 52); g.quadraticCurveTo(x - 28, 10, x, 8); g.quadraticCurveTo(x + 28, 10, x + 30, 52); g.fill(); stroke(g, 3.5); g.fillStyle = SK; g.beginPath(); g.arc(x, -6, 22, 0, 7); g.fill(); stroke(g, 3.5); g.fillStyle = INK; g.fillRect(x - 18, -14, 36, 9); } });
      card(4, 0, 505, 560, 170, -0.015, '#F5F3EE', () => { txt(g, 'PAID OUT', -140, -14, F.cap(36), theme.ink); txt(g, p.paid, 120, -8, F.hero(110), RED); txt(g, 'NOBODY COLLECTED', 0, 56, F.mono(22), theme.inkSoft); });
    },
  });
  function shadowedBoard(g, x, y, w, h, lift) { B.shadowed(g, () => rr(g, x, y, w, h, 14), '#B07C4A', lift + 0.3, {}); }

  // patch the lottery badge: replace the grey silhouette with the coloured character (called by drawBadge)
  B.badgeFace = (g, x0, y0, t) => { g.save(); rr(g, x0 + 130, y0 + 130, 240, 220, 18); g.clip(); const bg = g.createRadialGradient(0, y0 + 220, 10, 0, y0 + 240, 190); bg.addColorStop(0, '#FFD866'); bg.addColorStop(1, '#E9980B'); g.fillStyle = bg; g.fillRect(x0 + 130, y0 + 130, 240, 220); tip(g, 0, y0 + 232, 0.62, { t }); g.restore(); g.strokeStyle = INK; g.lineWidth = 4; rr(g, x0 + 130, y0 + 130, 240, 220, 18); g.stroke(); };
})();
// IG/FB cut v3 (~84 s) — Decoded, most vulgar. Stations (U-shape): A hook (0,0) · M map (1700,0) · O office+badge (3400,0) · R robot (5100,0)
//   · S steps (5100,1900) · B billboard (3400,1900) · Y years (1700,1900) · P plea (0,1900)
const END = 84.50;
const PH = (src, credit) => ({ src, credit, tag: 'PHOTO', w: 400, aspect: 0.95, tape: true });
BM2.scene({
  series: 'decoded', title: 'CASE: TIPTON · 2017', duration: 84.80,
  footnote: ['PLEADED GUILTY 2017 · UP TO 25 YEARS · SOURCES: CNN MONEY · TIME · CBS NEWS', 'ILLUSTRATIONS: THE LOTTERY IT GUY (CHARACTER, NOT A PHOTO) · ROBOT · MAP · BILLBOARD · CAST (GENERIC) · MATH: OURS', 'PHOTOS: ELIZAIO (BINGO BALLS) · TORKILDR (SERVER ROOM), CC BY-SA, WIKIMEDIA / FLICKR'],
  elements: [
    { id: 'hook', type: 'htext', at: [0, -470], in: 0, props: { l1: [['THIS DUMBASS RIGGED', 'paper']], l2: [['THE LOTTERY · 5 STATES', 'bad']], size: 88, endAt: END } },
    { id: 'mach', type: 'machine', at: [-150, 90], scale: 0.78, in: -1, props: { endAt: END } },
    { id: 'sb', type: 'sbadge', at: [215, -10], scale: 0.86, rot: 0.07, in: 0, z: 30, props: { endAt: END } },
    // ---- CRIME-SHOW: the con as a recurring character ----
    { id: 'cs', type: 'suspect', at: [1700, -1900], in: "@name's-0.25", out: '@He+0.15', z: 60, props: { mode: 'case', nameAt: '@Eddie', noteAt: '@Eddie+0.5', note: 'RIGGED|5 STATES' } },
    { id: 'castL', type: 'cast', layer: 'screen', at: [150, 700], scale: 0.7, in: '@lotteries-0.1', out: '@think-0.1', z: 70, props: { kind: 'lottery' } },
    { id: 'q', type: 'suspect', at: [3400, -1900], in: '@So-0.3', out: '@Okay-0.25', z: 60, props: { mode: 'quote', flipAt: '@rigs-0.05', head: 'HIS JOB', lines: ['KEEP IT', 'SAFE'], flipHead: 'WHAT HE DID', flipLines: ['HE RIGGED', 'IT'] } },
    { id: 'pip1', type: 'pip', layer: 'screen', at: [152, 640], in: '@Okay+0.3', out: '@Send-0.1', z: 70, props: { driveAt: '@wrote-0.1', driveUntil: '@step#2', labels: [{ at: '@step', text: 'WROTE THE CODE', until: '@step#2' }, { at: '@step#2', text: 'GAVE NUMBERS', until: '@step#3' }, { at: '@step#3', text: 'SHARED THE WINNINGS', tone: 'bad' }] } },
    { id: 'usb', type: 'usb', layer: 'screen', at: [152, 1040], scale: 0.6, in: '@wrote-0.1', out: '@wrote+3.2', z: 72, props: {} },
    { id: 'castF', type: 'cast', layer: 'screen', at: [152, 1010], scale: 0.62, in: '@handed+0.3', out: '@step#3-0.1', z: 72, props: { kind: 'friend' } },
    { id: 'castP', type: 'cast', layer: 'screen', at: [152, 760], scale: 0.7, in: '@Send-0.05', out: '@Now-0.2', z: 72, props: { kind: 'player' } },
    { id: 'pip2', type: 'pip', layer: 'screen', at: [152, 640], in: '@ticket#2-0.3', out: '@Say-0.25', z: 70, props: { labels: [{ at: '@scheme-0.2', text: 'HIS SCHEME', tone: 'bad' }] } },
    { id: 'dc2', type: 'dcard', layer: 'screen', at: [540, 372], scale: 0.7, in: '@2010-0.1', out: '@2010+2.2', z: 95, props: { text: '2010 · IOWA', sub: 'THE JACKPOT' } },
    { id: 'bd2', type: 'board', at: [-1800, 1900], in: '@Nobody#2-0.1', out: '@pleaded-0.1', z: 60, props: { at: ['@Nobody#2+0.05', '@collected-0.1', '@collected+0.3', '@collected+0.7', '@2017-0.05'], tightAt: '@2017+0.4', ticket: '$16.5M', paid: '$0' } },
    { id: 'ct', type: 'suspect', at: [-1800, 3800], in: '@pleaded-0.15', out: '@sentenced-0.12', z: 60, props: { mode: 'caught', xAt: '@pleaded+0.1', stampAt: '@guilty+0.05', stampText: 'PLEADED GUILTY', year: '2017' } },
    { id: 'pip4', type: 'pip', layer: 'screen', at: [152, 640], in: '@sentenced-0.1', out: '@trust-0.55', z: 70, props: { big: 1.12, mood: 'caught', barsAt: '@prison-0.35', stampAt: '@25-0.1', stampText: 'SENTENCED', labels: [{ at: '@25', text: 'UP TO 25 YEARS', tone: 'bad' }] } },
    { id: 'rig', type: 'stamp', at: [-150, -250], rot: -0.1, in: '@rigged', out: '@five', z: 40, props: { text: 'RIGGED', tone: 'bad', size: 84 } },
    { id: 'map', type: 'usmap', at: [1700, 0], in: '@five-0.5', props: { at: '@five+0.05', per: 0.16, endAt: END, label: '5 STATES', sub: 'PLEADED GUILTY' } },
    { id: 'off', type: 'office', at: [3400, 0], in: '@He-0.3', props: { nameAt: '@Eddie', buildAt: '@multistate-0.05', compAt: '@computers', linkAt: '@lotteries', per: 0.12 } },
    { id: 'mach2', type: 'machine', at: [3860, 260], scale: 0.5, in: '@engine-0.3', out: '@And#2-0.1', z: 45, props: { crackAt: 99999, spillAt: 99999 } },
    { id: 'bd', type: 'badge', at: [4320, 40], scale: 0.85, rot: -0.04, enter: 'drop', in: '@actually-0.2', props: { nameAt: '@director+0.3' } },
    { id: 'ph1', type: 'photo', at: [3770, 330], scale: 0.8, in: '@computers-0.1', out: '@lotteries-0.05', z: 50, props: { ...PH('brand/photos/stock/server-room/5.jpg', 'TORKILDR · CC BY-SA 2.0'), tilt: 0.05, fx: 0.6 } },
    { id: 'robot', type: 'robot', at: [5100, 0], in: '@And#2-0.4', props: { shakeAt: '@robot-0.35', rollAt: '@rolling', picksAt: '@pick', peekAt: '@knew', throwAt: '@threw' } },
    { id: 'ph2', type: 'photo', at: [5640, -300], scale: 0.82, in: '@nobody', out: '@So', z: 50, props: { ...PH('brand/photos/stock/lottery-balls/8.jpg', 'ELIZAIO · CC BY-SA 2.0'), tilt: -0.05, fx: 0.55, fy: 0.55 } },
    { id: 'steps', type: 'steps', at: [5100, 1900], in: '@Okay-0.3', props: { open: ['@step', '@step#2', '@step#3'], codeAt: '@wrote', predAt: '@predict', passAt: '@handed', per: 0.34, winAt: '@won', shareAt: '@shared', heads: ['HE WROTE CODE', 'HE HANDED OVER NUMBERS', 'THEY WON · THEY SHARED'] } },
    { id: 'tk', type: 'ticket', at: [3400, 1900], enter: 'drop', in: '@Now-0.3', props: { style: 'billboard', at: '@16', dur: 1.2, askAt: '@guess#2', drainAt: '@Not-0.95', drainDur: 0.9, head: '2010 · ADVERTISED JACKPOT', askLabel: 'PAID OUT', askQ: '$ ?', payLabel: 'PAID', stamp: 'NOT A CENT', stampSize: 64 } },
    { id: 'yrs', type: 'years', at: [1700, 1900], in: '@Say-0.4', props: { payAt: '@Say', startAt: '@50', fullAt: '@330+0.35' } },
    { id: 'plea', type: 'plea', at: [0, 1900], in: '@sentenced-0.5', props: { yearAt: '@2017', guiltyAt: '@guilty', yearsAt: '@25', chips: true, chipAt: '@years#2+0.5', chipList: [['PAROLED 2022', 0, 0, 300]], barsAt: '@prison+0.1' } },
    // ---- screen text pops ----
    { id: 'p0', type: 'text', layer: 'screen', at: [540, 345], in: '@never-0.1', out: '@never+1.5', props: { lines: [[['NEVER CASHED', 'bad']]], size: 78 } },
    { id: 'p6', type: 'text', layer: 'screen', at: [540, 330], in: '@engine-0.1', out: '@engine+1.5', props: { lines: [[['THE ENGINE ROOM', 'gold']]], size: 62 } },
    { id: 'p1', type: 'text', layer: 'screen', at: [540, 345], in: '@job#2', out: '@job#2+1.5', props: { lines: [[['ONE JOB', 'gold']]], size: 76 } },
    { id: 'p2', type: 'text', layer: 'screen', at: [540, 345], in: '@guess-0.4', out: '@guess+1.0', props: { lines: [[['NOBODY CAN GUESS', 'paper']]], size: 64 } },
    { id: 'p3', type: 'text', layer: 'screen', at: [540, 345], in: '@rigs-0.1', out: '@rigs+1.3', props: { lines: [[['THE GUARD RIGS IT', 'bad']]], size: 62 } },
    { id: 'p4', type: 'text', layer: 'screen', at: [540, 345], in: '@knew-0.2', out: '@threw', props: { lines: [[['KNEW THE DICE FIRST', 'gold']]], size: 60 } },
    { id: 'p5', type: 'text', layer: 'screen', at: [540, 345], in: '@Okay', out: '@step', props: { lines: [[['THE SCAM, SLOWLY', 'gold']]], size: 64 } },
    { id: 'hud', type: 'hud', layer: 'screen', at: [825, 250], in: -1, z: 90, props: { keys: [
      { at: 0, label: 'STATES\nRIGGED', v: 5, tone: 'bad' }, { at: "@name's", label: 'INFO SECURITY\nDIRECTORS', v: 1 }, { at: '@multistate', label: 'OFFICE\nDRAWING', v: 1 }, { at: '@many', label: 'STATES\nSERVED', v: 'MANY' },
      { at: '@And#2', label: 'NUMBERS YOU\nCAN GUESS', v: 0, tone: 'gold' }, { at: '@So', label: 'GUARDS WHO\nRIGGED IT', v: 1, tone: 'bad' }, { at: '@Okay', label: 'STEPS TO\nTHE SCAM', v: 3, tone: 'gold' },
      { at: '@step', label: 'THE SCAM', v: 'STEP 1' }, { at: '@predict', label: 'WINNING NUMBERS\nPREDICTED', v: 'YES', tone: 'bad' }, { at: '@step#2', label: 'THE SCAM', v: 'STEP 2' }, { at: '@step#3', label: 'THE SCAM', v: 'STEP 3' },
      { at: '@Now', label: 'THE YEAR', v: '2010' }, { at: '@advertised', label: 'ADVERTISED\nJACKPOT', v: 16.5, prefix: '$', suffix: 'M', dec: 1, tone: 'gold' },
      { at: '@Say', label: 'YEARS OF WORK\nAT $50K A YEAR', v: 1, suffix: ' YR' }, { at: '@330-0.15', label: 'YEARS OF WORK\nAT $50K A YEAR', v: 330, suffix: ' YR', tone: 'bad' },
      { at: '@guess#2', label: 'PAID OUT', v: '$ ?', tone: 'gold' }, { at: '@Not', label: 'PAID OUT', v: 0, prefix: '$', tone: 'bad' },
      { at: '@2017', label: 'PLEADED\nGUILTY', v: '2017' }, { at: '@25', label: 'PRISON,\nUP TO', v: 25, suffix: ' YRS', tone: 'bad' }, { at: END - 0.7, label: 'STATES\nRIGGED', v: 5, tone: 'bad' }] } },
    { id: 'bl', type: 'blabel', layer: 'screen', at: [90, 192], in: -1, z: 91, props: { keys: [{ at: 0, text: 'THE JOB' }, { at: '@Okay', text: 'THE TRICK' }, { at: '@Now', text: 'THE JACKPOT' }, { at: '@Nobody#2', text: 'THE CATCH' }, { at: '@sentenced', text: 'THE SENTENCE' }, { at: END - 0.7, text: 'THE JOB' }] } },
    { id: 'heart', type: 'heart', layer: 'screen', at: [800, 930], in: '@double-0.05', out: '@double+1.15', props: { s: 1 } },
    { id: 'plane', type: 'plane', layer: 'screen', at: [540, 960], in: '@Send-0.05', out: '@Send+1.2', props: { dur: 0.9, from: [-230, 250], to: [280, -330], s: 1.5 } },
    { id: 'sendtx', type: 'text', layer: 'screen', at: [270, 335], in: '@Send+0.15', out: '@Send+1.2', props: { lines: [[['SEND', 'gold']]], size: 70 } },
    { id: 'btn', type: 'follow', layer: 'screen', at: [830, 1010], scale: 0.8, in: '@Follow-0.05', out: '@Follow+1.45', props: { press: 0.5 } },
    { id: 'ask', type: 'bubble', layer: 'screen', at: [600, 1090], in: '@trust-0.2', out: END - 0.35, props: { l1: 'STILL TRUST THE', l2: 'DAMN LOTTERY?', size: 46, tail: 'left' } },
  ],
  beats: [
    { at: 0, beat: 'side-by-side', focus: ['hook', 'mach', 'sb'], sx: 540, sy: 915, fill: 0.97, maxH: 1010, st: { x: 130, y: 1350, s: 1.15 }, pose: 'shock' },
    { at: '@five-0.1', beat: 'side-by-side', focus: 'map', move: 'whip', sx: 540, sy: 800, fill: 0.9, maxH: 900, st: 'corner', pose: 'point', point: 'map.grid' },
    { at: '@states+0.35', beat: 'zoom-on-number', focus: 'map.label', fill: 0.8, maxH: 400, sy: 780, st: 'corner', pose: 'shock', dur: 0.5 },
    { at: '@biggest', beat: 'graphic-hero', focus: 'map', fill: 0.88, maxH: 900, sy: 800, st: 'corner-left', pose: 'shrug', dur: 0.6 },
    { at: '@never', beat: 'zoom-on-number', focus: 'map.grid', fill: 0.9, maxH: 540, sy: 760, st: 'corner', pose: 'shock', dur: 0.5 },
    { at: "@name's", beat: 'side-by-side', focus: 'cs', move: 'whip', sx: 540, sy: 790, fill: 0.78, maxH: 1050, st: 'corner', pose: 'shock', drift: 0.04 },
    { at: '@Eddie', beat: 'zoom-on-number', focus: 'cs.name', fill: 0.82, maxH: 300, sy: 930, st: 'corner', pose: 'point', point: 'cs.name', dur: 0.5 },
    { at: '@wait', beat: 'graphic-hero', focus: 'cs', fill: 0.82, maxH: 1050, sy: 800, st: 'corner', pose: 'shrug', dur: 0.9 },
    { at: '@He', beat: 'side-by-side', move: 'whip', focus: ['off', 'bd'], sx: 540, sy: 800, fill: 0.95, maxH: 900, st: 'corner-left', pose: 'point', point: 'bd.title', dur: 0.8 },
    { at: '@information', beat: 'zoom-on-number', focus: 'bd.title', fill: 0.52, maxH: 360, sy: 950, st: 'corner-left', pose: 'point', point: 'bd.title', dur: 0.5 },
    { at: '@multistate', beat: 'graphic-hero', focus: 'off.sign', fill: 0.88, maxH: 330, sy: 760, st: 'corner', pose: 'point', point: 'off.sign', dur: 0.5 },
    { at: '@Association', beat: 'graphic-hero', focus: 'off', fill: 0.92, maxH: 900, sy: 810, st: 'corner', pose: 'idle', dur: 0.7 },
    { at: "@That's", beat: 'side-by-side', focus: 'off', sx: 700, sy: 810, fill: 0.74, maxH: 900, st: 'left', pose: 'point', point: 'off.bld', dur: 0.8 },
    { at: '@computers', beat: 'graphic-hero', focus: ['off.comp', 'ph1'], fill: 0.95, maxH: 700, sy: 860, st: 'corner-left', pose: 'point', point: 'off.comp', dur: 0.6 },
    { at: '@lotteries', beat: 'graphic-hero', sx: 660, focus: 'off.pins', fill: 0.64, maxH: 640, sy: 790, st: 'corner', pose: 'point', point: 'off.pins', dur: 0.6 },
    { at: '@many', beat: 'zoom-on-number', sx: 660, focus: 'off.many', fill: 0.6, maxH: 320, sy: 800, st: 'corner', pose: 'shock', dur: 0.5 },
    { at: '@think', beat: 'side-by-side', focus: 'off', sx: 700, sy: 810, fill: 0.74, maxH: 900, st: 'left', pose: 'chin', dur: 0.8 },
    { at: '@engine', beat: 'zoom-on-number', focus: ['off.bld', 'mach2'], fill: 0.85, maxH: 700, sy: 800, st: 'corner-left', pose: 'point', point: 'mach2', dur: 0.55 },
    { at: '@drawings', beat: 'zoom-on-number', focus: 'mach2', fill: 0.6, maxH: 600, sy: 800, st: 'corner-left', pose: 'shock', dur: 0.6 },
    { at: '@And#2', beat: 'side-by-side', focus: 'robot', move: 'whip', sx: 540, sy: 760, fill: 0.8, maxH: 900, st: 'corner', pose: 'point', point: 'robot.head' },
    { at: '@job#2', beat: 'zoom-on-number', focus: 'robot.head', fill: 0.42, maxH: 460, sy: 760, st: 'corner', pose: 'chin', dur: 0.5 },
    { at: '@pick', beat: 'graphic-hero', focus: 'robot.balls', fill: 0.95, maxH: 420, sy: 700, st: 'corner', pose: 'point', point: 'robot.balls', dur: 0.55 },
    { at: '@nobody', beat: 'graphic-hero', focus: ['robot', 'ph2'], fill: 0.9, maxH: 1000, sy: 780, st: 'corner-left', pose: 'shrug', dur: 0.7 },
    { at: '@robot', beat: 'zoom-on-number', focus: 'robot.play', fill: 0.6, maxH: 520, sy: 760, st: 'corner-left', pose: 'point', point: 'robot.cup', dur: 0.5 },
    { at: '@rolling', beat: 'graphic-hero', focus: 'robot.play', fill: 0.64, maxH: 520, sy: 780, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@So', beat: 'side-by-side', focus: 'q', move: 'whip', sx: 540, sy: 760, fill: 0.97, maxH: 900, st: 'corner', pose: 'chin', drift: 0.04 },
    { at: '@rigs-0.05', beat: 'zoom-on-number', focus: 'q.quote', fill: 0.62, maxH: 520, sy: 760, st: 'corner', pose: 'shock', dur: 0.5 },
    { at: '@double', beat: 'graphic-hero', focus: 'q', fill: 0.97, maxH: 900, sy: 760, st: 'corner', pose: 'you', dur: 0.7 },
    { at: '@Okay', beat: 'side-by-side', focus: 'steps', move: 'whip', sx: 665, sy: 760, fill: 0.69, maxH: 1050, st: 'corner', pose: 'point', point: 'steps.h1' },
    { at: '@scam', beat: 'graphic-hero', sx: 665, focus: 'steps', fill: 0.70, maxH: 1050, sy: 760, st: 'corner', pose: 'idle', dur: 0.8 },
    { at: '@step', beat: 'graphic-hero', sx: 665, focus: 'steps.b1', fill: 0.71, maxH: 440, sy: 660, st: 'corner', pose: 'point', point: 'steps.b1', dur: 0.5 },
    { at: '@wrote', beat: 'zoom-on-number', sx: 665, focus: 'steps.scroll', fill: 0.5, maxH: 300, sy: 700, st: 'corner', pose: 'shock', dur: 0.5 },
    { at: '@predict', beat: 'zoom-on-number', sx: 665, focus: 'steps.pred', fill: 0.70, maxH: 300, sy: 700, st: 'corner', pose: 'shock', dur: 0.5 },
    { at: '@knew-0.3', beat: 'side-by-side', focus: 'robot', move: 'whip', sx: 665, sy: 760, fill: 0.70, maxH: 900, st: 'corner', pose: 'point', point: 'robot.cup' },
    { at: '@dice#2', beat: 'graphic-hero', sx: 665, focus: 'robot.play', fill: 0.56, maxH: 520, sy: 780, st: 'corner', pose: 'chin', dur: 0.5 },
    { at: '@before', beat: 'zoom-on-number', sx: 665, focus: 'robot.play', fill: 0.52, maxH: 520, sy: 760, st: 'corner', pose: 'shock', dur: 0.5 },
    { at: '@threw', beat: 'zoom-on-number', sx: 665, focus: 'robot.play', fill: 0.60, maxH: 520, sy: 780, st: 'corner', pose: 'shock', dur: 0.45 },
    { at: '@step#2', beat: 'graphic-hero', sx: 665, focus: 'steps.b2', move: 'whip', fill: 0.71, maxH: 440, sy: 660, st: 'corner', pose: 'point', point: 'steps.b2' },
    { at: '@handed', beat: 'zoom-on-number', sx: 665, focus: 'steps.b2', fill: 0.75, maxH: 400, sy: 680, st: 'corner', pose: 'point', point: 'steps.b2', dur: 0.5 },
    { at: '@step#3', beat: 'graphic-hero', sx: 665, focus: 'steps.b3', fill: 0.71, maxH: 440, sy: 660, st: 'corner', pose: 'point', point: 'steps.b3', dur: 0.55 },
    { at: '@won', beat: 'zoom-on-number', sx: 665, focus: 'steps.b3', fill: 0.75, maxH: 400, sy: 680, st: 'corner', pose: 'shock', dur: 0.5 },
    { at: '@Send', beat: 'peek', sx: 665, focus: 'steps', fill: 0.70, maxH: 1050, sy: 760, pose: 'you', dur: 0.8 },
    { at: '@whoever', beat: 'side-by-side', focus: 'steps', sx: 665, sy: 760, fill: 0.58, maxH: 1050, st: 'corner', pose: 'you', dur: 0.7 },
    { at: '@plays', beat: 'zoom-on-number', sx: 665, focus: 'steps.b3', fill: 0.71, maxH: 440, sy: 660, st: 'corner', pose: 'point', point: 'steps.b3', dur: 0.6 },
    { at: '@Now', beat: 'side-by-side', focus: 'tk', move: 'whip', sx: 540, sy: 800, fill: 0.8, maxH: 1000, st: 'corner', pose: 'point', point: 'tk.head' },
    { at: '@2010', beat: 'zoom-on-number', focus: 'tk.head', fill: 0.8, maxH: 400, sy: 700, st: 'corner', pose: 'shock', dur: 0.55 },
    { at: '@scheme', beat: 'graphic-hero', sx: 650, focus: 'tk', fill: 0.67, maxH: 1000, sy: 800, st: 'corner', pose: 'point', point: 'tk.head', dur: 0.7 },
    { at: '@billboard', beat: 'side-by-side', focus: 'tk', sx: 650, sy: 800, fill: 0.59, maxH: 1000, st: 'corner', pose: 'point', point: 'tk.head', dur: 0.7 },
    { at: '@advertised', beat: 'graphic-hero', sx: 650, focus: 'tk.total', fill: 0.67, maxH: 600, sy: 700, st: 'corner', pose: 'point', dur: 0.6 },
    { at: '@16', beat: 'zoom-on-number', sx: 650, focus: 'tk.total', fill: 0.74, maxH: 560, sy: 680, st: 'corner', pose: 'shock', dur: 0.55 },
    { at: '@Say', beat: 'side-by-side', focus: 'yrs', move: 'whip', sx: 540, sy: 740, fill: 0.8, maxH: 900, st: 'corner', pose: 'point', point: 'yrs.pay' },
    { at: '@50', beat: 'zoom-on-number', focus: 'yrs.pay', fill: 0.85, maxH: 300, sy: 760, st: 'corner', pose: 'point', point: 'yrs.pay', dur: 0.5 },
    { at: '@year', beat: 'graphic-hero', focus: ['yrs.grid', 'yrs.count'], fill: 0.9, maxH: 800, sy: 700, st: 'corner', pose: 'point', point: 'yrs.grid', dur: 0.6 },
    { at: '@330', beat: 'zoom-on-number', focus: 'yrs.count', fill: 0.9, maxH: 480, sy: 900, rot: 0.02, st: 'corner', pose: 'shock', dur: 0.4, lead: 0.15 },
    { at: '@Follow', beat: 'graphic-hero', focus: 'tk', move: 'whip', fill: 0.8, maxH: 1000, sy: 800, st: 'left', pose: 'follow', dur: 0.6 },
    { at: '@guess#2', beat: 'graphic-hero', focus: 'tk.paid', fill: 0.72, maxH: 560, sy: 980, st: 'corner', pose: 'shrug', dur: 0.6 },
    { at: '@Not-0.1', beat: 'zoom-on-number', focus: 'tk.paid', fill: 0.86, maxH: 640, sy: 1010, rot: 0.02, st: 'corner', pose: 'shock', dur: 0.4, lead: 0.15 },
    { at: '@Nobody#2-0.05', beat: 'graphic-hero', focus: 'bd2', move: 'whip', fill: 0.94, maxH: 1080, sy: 790, st: 'corner', pose: 'shock', dur: 0.6 },
    { at: '@2017+0.35', beat: 'zoom-on-number', focus: 'bd2.face', fill: 0.62, maxH: 560, sy: 760, st: 'corner', pose: 'shock', dur: 0.55 },
    { at: '@pleaded-0.1', beat: 'graphic-hero', focus: 'ct', move: 'whip', fill: 0.8, maxH: 1050, sy: 790, st: 'corner', pose: 'shock' },
    { at: '@guilty', beat: 'zoom-on-number', focus: 'ct.stamp', fill: 0.84, maxH: 420, sy: 780, st: 'corner', pose: 'shock', dur: 0.4 },
    { at: '@admitted+0.2', beat: 'pull-back', focus: 'ct', fill: 0.8, maxH: 1050, sy: 790, st: 'corner', pose: 'chin', dur: 0.9, drift: 0.04 },
    { at: '@sentenced-0.1', beat: 'side-by-side', focus: 'plea', move: 'whip', sx: 725, sy: 830, fill: 0.58, maxH: 960, st: 'corner', pose: 'idle' },
    { at: '@25', beat: 'zoom-on-number', sx: 725, focus: 'plea.years', fill: 0.62, maxH: 620, sy: 1060, rot: -0.02, st: 'corner', pose: 'shock', dur: 0.4, lead: 0.15 },
    { at: '@prison', beat: 'pull-back', sx: 725, focus: 'plea', fill: 0.58, maxH: 960, sy: 830, st: 'corner', pose: 'idle', dur: 0.7 },
    { at: '@trust-0.5', beat: 'presenter-front', focus: 'plea', sy: 760, pose: 'you' },
    { at: END - 0.38, beat: 'side-by-side', focus: ['hook', 'mach'], move: 'whip', sx: 540, sy: 915, fill: 0.95, maxH: 1010, st: { x: 130, y: 1350, s: 1.15 }, pose: 'shock' },
  ],
  poses: [['@Follow-0.1', 'follow', { target: [830, 1010] }], ['@Follow+1.5', 'talk']],
  shakes: [[0.05, 14], ['@rigged', 8], ['@330', 10], ['@Not-0.05', 26], ['@guilty', 14], ['@25', 22], ['@prison+0.1', 10]],
  captions: { emph: { dumbass: 'bad', rigged: 'bad', five: 'bad', never: 'bad', fucking: 'bad', cent: 'bad', '25': 'bad', guilty: 'bad', '$16': 'accent', '16': 'accent', '330': 'bad', rigs: 'bad' }, gap: 16, fix: [['16.5 million', '$16.5 million'], ['Step one, he', 'Step one: he'], ['Step two, he', 'Step two: he'], ['Step three, those', 'Step three: those'], ['Not a fucking', 'Not a fucking'], ['cent, nobody', 'cent. Nobody'], ['lottery. Yes', 'lottery?']] },
  bed: { name: 'tense_bed_2', gain: -1 },
  sfx: [
    { at: "@name's", name: 'camera_shutter_2', gain: -7, dur: 0.5 }, { at: '@Eddie', name: 'typewriter_2', gain: -11, dur: 0.9 }, { at: '@So-0.1', name: 'camera_shutter_1', gain: -8, dur: 0.5 },
    { at: '@rigs-0.05', name: 'rubber_stamp_1', gain: -8, dur: 0.5 }, { at: '@Okay+0.3', name: 'pop_1', gain: -10, dur: 0.4 }, { at: '@2010', name: 'typewriter_1', gain: -12, dur: 0.9 },
    { at: '@Nobody#2-0.05', name: 'suspense_drone_1', gain: -13, dur: 3.4 }, { at: '@Nobody#2-0.05', name: 'swoosh_2', gain: -9, dur: 0.5 }, { at: '@Nobody#2+0.05', name: 'pop_2', gain: -9, dur: 0.3 }, { at: '@collected-0.1', name: 'pop_2', gain: -9, dur: 0.3 }, { at: '@collected+0.3', name: 'pop_2', gain: -9, dur: 0.3 }, { at: '@collected+0.7', name: 'pop_2', gain: -9, dur: 0.3 }, { at: '@2017+0.4', name: 'heartbeat_1', gain: -6, dur: 1.2 },
    { at: '@pleaded+0.1', name: 'handcuff_click_1', gain: -7, dur: 0.6 }, { at: '@guilty+0.05', name: 'rubber_stamp_2', gain: -4, dur: 0.5 }, { at: '@sentenced', name: 'camera_shutter_2', gain: -8, dur: 0.5 }, { at: '@prison-0.3', name: 'cell_door_2', gain: -9, dur: 1.0 },
    { at: 0, name: 'deep_boom_2', gain: -3, dur: 0.5 }, { at: 0.03, name: 'rubber_stamp_2', gain: -6, dur: 0.5 }, { at: 0.1, name: 'glass_shatter_1', gain: -10, dur: 0.6 },
    { at: '@rigged', name: 'rubber_stamp_2', gain: -7, dur: 0.5 },
    { at: '@five+0.05', name: 'pop_2', gain: -10, dur: 0.3 }, { at: '@five+0.21', name: 'pop_2', gain: -10, dur: 0.3 }, { at: '@five+0.37', name: 'pop_2', gain: -10, dur: 0.3 }, { at: '@five+0.53', name: 'pop_2', gain: -10, dur: 0.3 }, { at: '@five+0.69', name: 'pop_2', gain: -10, dur: 0.3 }, { at: '@five+0.85', name: 'ding_2', gain: -9, dur: 0.7 },
    { at: '@never', name: 'rubber_stamp_2', gain: -7, dur: 0.5 },
    { at: '@Eddie', name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@actually', name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@multistate', name: 'rubber_stamp_2', gain: -9, dur: 0.5 }, { at: '@computers', name: 'click_1', gain: -9, dur: 0.3 }, { at: '@computers', name: 'pop_1', gain: -10, dur: 0.4 },
    { at: '@lotteries', name: 'swipe_2', gain: -11, dur: 0.5 }, { at: '@many+0.5', name: 'ding_2', gain: -10, dur: 0.7 },
    { at: '@pick', name: 'pop_2', gain: -9, dur: 0.3 }, { at: '@pick+0.16', name: 'pop_2', gain: -9, dur: 0.3 }, { at: '@pick+0.32', name: 'pop_2', gain: -9, dur: 0.3 }, { at: '@pick+0.48', name: 'pop_2', gain: -9, dur: 0.3 }, { at: '@pick+0.64', name: 'pop_2', gain: -9, dur: 0.3 },
    { at: '@nobody', name: 'paper_slam_2', gain: -11, dur: 0.5 }, { at: '@robot-0.3', name: 'typewriter_1', gain: -14, dur: 0.9 }, { at: '@rolling+0.5', name: 'click_2', gain: -9, dur: 0.3 },
    { at: '@rigs', name: 'rubber_stamp_2', gain: -8, dur: 0.5 }, { at: '@double', name: 'heartbeat_1', gain: -8, dur: 0.9 },
    { at: '@Okay', name: 'swoosh_2', gain: -11, dur: 0.6 }, { at: '@step', name: 'pop_1', gain: -8, dur: 0.5 }, { at: '@wrote', name: 'typewriter_1', gain: -12, dur: 0.8 }, { at: '@predict', name: 'pop_2', gain: -8, dur: 0.3 }, { at: '@predict+0.14', name: 'pop_2', gain: -9, dur: 0.3 }, { at: '@predict+0.28', name: 'pop_2', gain: -9, dur: 0.3 },
    { at: '@knew', name: 'click_2', gain: -10, dur: 0.3 }, { at: '@threw', name: 'click_1', gain: -9, dur: 0.3 },
    { at: '@step#2', name: 'pop_1', gain: -8, dur: 0.5 }, { at: '@handed', name: 'click_2', gain: -11, dur: 0.3 }, { at: '@handed+0.34', name: 'click_2', gain: -11, dur: 0.3 }, { at: '@handed+0.68', name: 'click_2', gain: -11, dur: 0.3 },
    { at: '@step#3', name: 'pop_1', gain: -8, dur: 0.5 }, { at: '@won', name: 'pop_2', gain: -9, dur: 0.3 }, { at: '@shared', name: 'coins_drop_1', gain: -12, dur: 1.0 },
    { at: '@Send', name: 'swoosh_2', gain: -9, dur: 1.0 },
    { at: '@Now', name: 'paper_slam_2', gain: -8, dur: 0.5 }, { at: '@Now+0.1', name: 'thud_1', gain: -9, dur: 0.4 }, { at: '@16', name: 'money_counter_2', gain: -10, dur: 1.2 }, { at: '@16+1.2', name: 'cash_register_1', gain: -9, dur: 0.9 },
    { at: '@Say', name: 'paper_slam_2', gain: -11, dur: 0.5 }, { at: '@50', name: 'money_counter_1', gain: -13, dur: 1.6 }, { at: '@330+0.35', name: 'cinematic_hit_1', gain: -8, dur: 0.9 },
    { at: '@guess#2', name: 'clock_ticking_1', gain: -14, dur: 1.2 }, { at: '@Follow+0.5', name: 'click_1', gain: -8, dur: 0.3 }, { at: '@Follow+0.58', name: 'success_chime_1', gain: -12, dur: 1.0 },
    { at: '@Not-0.95', name: 'sub_drop_2', gain: -9, dur: 0.9 }, { at: '@Not-0.95', name: 'money_counter_1', gain: -13, dur: 0.9 },
    { at: '@Not-0.05', name: 'deep_boom_1', gain: -2, dur: 1.4 }, { at: '@Not-0.05', name: 'cinematic_hit_1', gain: -4, dur: 1.2 },
    { at: '@2017', name: 'paper_slam_2', gain: -9, dur: 0.5 }, { at: '@guilty', name: 'gavel_1', gain: -4, dur: 0.8 }, { at: '@guilty', name: 'paper_slam_2', gain: -9, dur: 0.5 }, { at: '@which', name: 'pop_1', gain: -10, dur: 0.4 },
    { at: '@25-0.5', name: 'riser_2', gain: -14, dur: 0.6 }, { at: '@25', name: 'cinematic_hit_1', gain: -4, dur: 1.2 }, { at: '@25', name: 'deep_boom_2', gain: -4, dur: 1.0 }, { at: '@prison+0.1', name: 'cell_door_1', gain: -7, dur: 1.0 },
    { at: '@trust-0.2', name: 'pop_1', gain: -9, dur: 0.5 }, { at: END - 0.38, name: 'rewind_2', gain: -11, dur: 0.9 }, { at: END, name: 'deep_boom_2', gain: -6, dur: 0.4 },
  ],
});
