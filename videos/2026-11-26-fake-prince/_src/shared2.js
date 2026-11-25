// ===== fake-prince v3 (REBUILD-LONGER) — extra recipes. All generic props: no real emblems, flags, logos. Prepended after shared.js/reuse.js/wine_bits.js =====
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, countAt, hash, hit } = B;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const rise = (t, at, d = 18) => { const o = t - at; return { a: clamp(o / 0.12), y: (1 - spring(Math.max(0, o), 'snappy')) * d, on: o > 0 }; };
  const band = (g, th, x0, y0, w, h, r, title, size) => { g.save(); rr(g, x0, y0, w, h, r); g.clip(); g.fillStyle = th.navy; g.fillRect(x0, y0, w, 120); g.restore(); txt(g, title, x0 + 36, y0 + 62, F.hero(size || 62), th.paper, 'left'); };
  const tag = (g, s, x, y, col, al) => txt(g, s, x, y, F.mono(19), col || 'rgba(245,243,238,.75)', al || 'center');
  const crownPath = g => { g.beginPath(); g.moveTo(-112, 0); g.lineTo(-118, -112); g.lineTo(-58, -58); g.lineTo(0, -138); g.lineTo(58, -58); g.lineTo(118, -112); g.lineTo(112, 0); g.closePath(); };
  const drawCrown = (g, th, s) => { g.save(); g.scale(s, s); B.shadowed(g, () => crownPath(g), th.gold, 0.3); g.fillStyle = th.gold; for (const [cx, cy] of [[-118, -116], [0, -142], [118, -116]]) { g.beginPath(); g.arc(cx, cy, 13, 0, 7); g.fill(); g.strokeStyle = 'rgba(0,0,0,.25)'; g.lineWidth = 3; g.stroke(); } g.restore(); };
  const sil = (g, x, y, s) => { g.save(); g.translate(x, y); g.scale(s, s); clay(g, -180, 40, 360, 250, 120, '#59647a', { shadowK: 0.5 }); clay(g, -34, -20, 68, 80, 22, '#6d778c', { shadowK: 0.3 }); clay(g, -92, -180, 184, 214, 92, '#8c96aa', { shadowK: 0.5 }); g.restore(); };
  const stampT = (g, t, at, x, y, rot, size, col, text) => { const k = t - at; if (k < 0) return; const sc = 1 + 1.1 * (1 - ease.expo(clamp(k / 0.2))), w = mw(text, F.hero(size)) + size * 0.8, h = size * 1.4;
    g.save(); g.globalAlpha = clamp(k / 0.05); g.translate(x, y); g.rotate(rot); g.scale(sc, sc); g.fillStyle = 'rgba(245,243,238,.92)'; rr(g, -w / 2, -h / 2, w, h, size * 0.14); g.fill(); g.strokeStyle = col; g.lineWidth = size * 0.09; rr(g, -w / 2, -h / 2, w, h, size * 0.14); g.stroke(); txt(g, text, 0, size * 0.05, F.hero(size), col); g.restore(); burst(g, x, y, w * 0.6, col, k - 0.14, 14, 0.4); };
  const drawCar = (g, th, rot) => { g.fillStyle = 'rgba(0,0,0,.25)'; g.beginPath(); g.ellipse(0, 86, 250, 16, 0, 0, 7); g.fill();
    const bp = () => { g.beginPath(); g.moveTo(-225, 44); g.lineTo(-225, 0); g.quadraticCurveTo(-210, -22, -160, -26); g.lineTo(-72, -30); g.lineTo(-28, -82); g.quadraticCurveTo(14, -94, 44, -62); g.lineTo(76, -28); g.lineTo(196, -14); g.quadraticCurveTo(236, 0, 236, 44); g.closePath(); };
    bp(); g.fillStyle = th.bad; g.fill(); g.save(); bp(); g.clip(); const lg = g.createLinearGradient(0, -90, 0, 50); lg.addColorStop(0, 'rgba(255,255,255,.32)'); lg.addColorStop(0.4, 'rgba(255,255,255,0)'); lg.addColorStop(1, 'rgba(0,0,0,.28)'); g.fillStyle = lg; g.fillRect(-240, -100, 490, 160); g.restore();
    g.fillStyle = '#1B2430'; g.beginPath(); g.moveTo(-20, -72); g.lineTo(28, -72); g.lineTo(58, -34); g.lineTo(-42, -34); g.closePath(); g.fill();
    for (const wx of [-142, 138]) { g.save(); g.translate(wx, 44); g.fillStyle = '#12161c'; g.beginPath(); g.arc(0, 0, 40, 0, 7); g.fill(); g.rotate(rot || 0); g.fillStyle = '#c9ccd2'; g.beginPath(); g.arc(0, 0, 22, 0, 7); g.fill(); g.strokeStyle = '#59606B'; g.lineWidth = 4; for (let i = 0; i < 5; i++) { g.rotate(Math.PI * 2 / 5); g.beginPath(); g.moveTo(0, 0); g.lineTo(20, 0); g.stroke(); } g.restore(); } };
  const shield = (g, th, s) => { g.save(); g.scale(s, s); g.shadowColor = 'rgba(2,4,9,.4)'; g.shadowBlur = 10; g.shadowOffsetY = 6; const sp = () => { g.beginPath(); g.moveTo(-48, -56); g.lineTo(48, -56); g.lineTo(48, 12); g.quadraticCurveTo(48, 58, 0, 74); g.quadraticCurveTo(-48, 58, -48, 12); g.closePath(); };
    g.fillStyle = th.gold; sp(); g.fill(); g.shadowColor = 'transparent'; g.strokeStyle = '#8a6a10'; g.lineWidth = 5; sp(); g.stroke(); txt(g, 'SECURITY', 0, -12, F.cap(15), '#5a3f08'); g.fillStyle = '#8a6a10'; g.beginPath(); g.arc(0, 26, 18, 0, 7); g.fill(); g.restore(); };
  // seed -> plant of coins (the "hoping it grows" icon). k = local time since it appeared
  const plant = (g, th, k, s) => { g.save(); g.scale(s, s); g.fillStyle = '#5b4330'; g.beginPath(); g.ellipse(0, 90, 120, 26, 0, 0, 7); g.fill(); const u = ease.out(clamp((k - 0.1) / 0.7)), hh = 170 * u;
    g.strokeStyle = '#2E8B57'; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); g.moveTo(0, 86); g.lineTo(0, 86 - hh); g.stroke();
    for (const [f, sd] of [[0.45, -1], [0.65, 1]]) { const lu = clamp((u - f) / 0.3); if (lu > 0) { g.save(); g.translate(0, 86 - hh * f); g.rotate(sd * 0.7); g.fillStyle = '#2E8B57'; g.beginPath(); g.ellipse(sd * 30 * lu, -6, 36 * lu, 14 * lu, 0, 0, 7); g.fill(); g.restore(); } }
    [[-70, -62, 0.7], [0, -106, 0.85], [70, -62, 1.0]].forEach(([cx, cy, d]) => { const c = spring(Math.max(0, k - d), 'bouncy'); if (k > d) { g.save(); g.translate(cx, 86 - 170 + 70 + cy + 62 - 62); g.scale(c, c); g.fillStyle = th.gold; g.beginPath(); g.arc(0, 0, 34, 0, 7); g.fill(); g.strokeStyle = '#8a6a10'; g.lineWidth = 4; g.beginPath(); g.arc(0, 0, 26, 0, 7); g.stroke(); txt(g, '$', 0, 3, F.hero(34), '#5a3f08'); g.restore(); } });
    g.restore(); };

  // ---------- defcard: a plain-words definition card (term, "= definition", a tiny icon). icon 'conman' | 'investor' ----------
  B.register('defcard', {
    defaults: { w: 860, h: 860, head: "WHAT'S A CON MAN?", term: 'CON MAN', d1: 'LIES TO TAKE', d2: "PEOPLE'S MONEY", icon: 'conman', defAt: 99999, iconAt: 99999 }, size: p => [p.w, p.h],
    anchors: p => ({ head: [0, -p.h / 2 + 65, p.w, 130], term: [0, -p.h / 2 + 250, p.w * 0.9, 170], def: [0, -p.h / 2 + 470, p.w * 0.9, 200], icon: [0, p.h / 2 - 150, p.w * 0.85, 300] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift }); band(g, theme, x0, y0, w, h, 26, p.head, 56);
      const tw = mw(p.term, F.hero(150)); txt(g, p.term, 0, y0 + 255, F.hero(150), theme.ink); marker(g, -tw / 2, y0 + 335, tw, 10, theme.badInk, clamp(lt / 0.5), 0.9);
      { const r = rise(t, p.defAt, 22); if (r.on) { g.save(); g.globalAlpha = r.a; g.translate(0, r.y); txt(g, '= ' + p.d1, 0, y0 + 440, F.hero(64), theme.ink); g.restore(); } }
      { const r = rise(t, p.defAt + 0.3, 22); if (r.on) { g.save(); g.globalAlpha = r.a; g.translate(0, r.y); txt(g, p.d2, 0, y0 + 520, F.hero(76), theme.badInk); g.restore(); } }
      const ik = t - p.iconAt; if (ik > 0) { const k = spring(ik, 'bouncy'); g.save(); g.translate(0, y0 + h - 150); g.globalAlpha *= clamp(ik / 0.1);
        if (p.icon === 'conman') { g.save(); g.translate(-190, 0); g.scale(0.7 + 0.3 * k, 0.7 + 0.3 * k); B.shadowed(g, () => { g.beginPath(); g.arc(0, 0, 90, 0, 7); }, theme.paper, 0.3); g.fillStyle = '#0B0F14'; for (const ex of [-33, 33]) { g.beginPath(); g.ellipse(ex, -18, 15, 11, 0, 0, 7); g.fill(); } g.strokeStyle = '#0B0F14'; g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); g.arc(0, 4, 50, 0.25, Math.PI - 0.25); g.stroke(); g.strokeStyle = theme.rule; g.lineWidth = 4; g.beginPath(); g.arc(0, 0, 90, 0, 7); g.stroke(); g.restore();
          const u = ease.inOut(clamp((ik - 0.35) / 0.9)), wx = lerp(250, 60, u); g.save(); g.translate(wx, 14); clay(g, -78, -50, 156, 100, 16, '#7a5230', { shadowK: 0.4 }); g.fillStyle = '#93663c'; rr(g, -78, -50, 156, 44, 14); g.fill(); g.fillStyle = theme.gold; g.beginPath(); g.arc(0, -6, 12, 0, 7); g.fill();
          g.fillStyle = '#E8B98A'; g.beginPath(); g.arc(104, 12, 36, 0, 7); g.fill(); for (const fy of [-22, 4, 30]) { g.beginPath(); g.arc(86, 12 + fy * 0.8, 15, 0, 7); g.fill(); } g.restore();
          for (let i = 0; i < 3; i++) { const cu = clamp((ik - 0.9 - i * 0.2) / 0.55); if (cu > 0 && cu < 1) { const cx = lerp(wx, -120, cu), cy = -Math.sin(Math.PI * cu) * 110; g.save(); g.translate(cx, cy); g.fillStyle = theme.gold; g.beginPath(); g.arc(0, 0, 22, 0, 7); g.fill(); g.strokeStyle = '#8a6a10'; g.lineWidth = 3; g.beginPath(); g.arc(0, 0, 16, 0, 7); g.stroke(); txt(g, '$', 0, 2, F.hero(22), '#5a3f08'); g.restore(); } } }
        else { g.translate(0, 8); plant(g, theme, ik, 0.82); }
        g.restore(); tag(g, 'ILLUSTRATION', 0, y0 + h - 18, theme.inkSoft); }
    },
  });

  // ---------- investors: faceless clay figures hand envelopes toward a crown; optional TRUST/LEGIT meter; optional plain-words tag ----------
  B.register('investors', {
    defaults: { w: 920, h: 800, head: 'INVESTORS', figAt: 99999, defAt: 99999, meter: '', meterAt: 99999, mdur: 1.0, sub: 'ILLUSTRATION · FACELESS' }, size: p => [p.w, p.h],
    anchors: p => ({ head: [0, -p.h / 2 + 65, p.w, 130], figs: [0, 130, p.w * 0.9, 300], def: [0, -p.h / 2 + 260, p.w * 0.85, 240], meter: [0, -p.h / 2 + 250, p.w * 0.85, 140] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift }); band(g, theme, x0, y0, w, h, 26, p.head, 62);
      g.save(); g.translate(0, y0 + 500); drawCrown(g, theme, 0.55); g.restore();
      [-300, 0, 300].forEach((fx, i) => { const k = ease.out(clamp((t - (p.figAt + i * 0.18)) / 0.5)), a = clamp((t - (p.figAt + i * 0.18) + 0.3) / 0.2); if (a <= 0) return; g.save(); g.globalAlpha *= a; sil(g, fx, y0 + 640, 0.5);
        const ex = lerp(fx + 80, (i - 1) * 24, k), ey = lerp(y0 + 620, y0 + 500 - 20 + i * 4, k) - Math.sin(Math.PI * k) * 60; g.save(); g.translate(ex, ey); g.rotate((1 - k) * 0.3); paper(g, -42, -29, 84, 58, 6, { lift: 0.2 }); g.strokeStyle = theme.rule; g.lineWidth = 3; g.beginPath(); g.moveTo(-42, -29); g.lineTo(0, 2); g.lineTo(42, -29); g.stroke(); g.restore(); g.restore(); });
      if (p.meter) { const mk = ease.out(clamp((t - p.meterAt) / p.mdur)), mx = x0 + 70, mww = w - 140; txt(g, p.meter, mx, y0 + 215, F.hero(64), theme.ink, 'left'); g.fillStyle = theme.rule; rr(g, mx, y0 + 260, mww, 64, 32); g.fill(); if (mk > 0.01) { g.fillStyle = theme.gold; rr(g, mx, y0 + 260, Math.max(64, mww * mk), 64, 32); g.fill(); } if (mk >= 1) txt(g, 'FULL', x0 + w - 110, y0 + 292, F.cap(34), theme.ink); }
      { const r = rise(t, p.defAt, 26); if (r.on) { g.save(); g.globalAlpha = r.a; g.translate(0, y0 + 280 + r.y); g.rotate(-0.025); paper(g, -420, -105, 840, 210, 14, { fill: '#F5E6A8' }); txt(g, 'PEOPLE WHO HAND OVER MONEY', 80, -42, F.cap(34), theme.ink); txt(g, 'HOPING IT GROWS', 80, 28, F.hero(70), theme.badInk); g.save(); g.translate(-310, -4); plant(g, theme, t - p.defAt - 0.2, 0.42); g.restore(); g.restore(); } }
      tag(g, p.sub, 0, y0 + h - 20, theme.inkSoft);
    },
  });

  // ---------- ruler18: an 18-notch ruler; a clay head travels from NEWBORN to GRADUATE while AGE rolls 0 -> 18. toy: 'rattle' | 'bottle' ----------
  B.register('ruler18', {
    defaults: { w: 940, h: 640, at: 99999, dur: 1.9, toy: 'rattle', head: '18 YEARS IS…' }, size: p => [p.w, p.h],
    anchors: p => ({ num: [0, -p.h / 2 + 235, p.w * 0.8, 200], ruler: [0, 60, p.w * 0.9, 240], head: [0, -p.h / 2 + 65, p.w, 130] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift }); band(g, theme, x0, y0, w, h, 26, p.head, 60);
      const u = ease.inOut(clamp((t - p.at) / p.dur)), age = t < p.at ? 0 : Math.round(18 * u), done = t - p.at - p.dur, rx0 = -380, rx1 = 380, ry = y0 + 440;
      const o = { font: F.hero(190), size: 190, color: theme.ink, align: 'left', speed: u > 0 && u < 1 ? 8 : 0 }, nw = B.rollWidth(g, 18, o).w, sw = mw(' YEARS OLD', F.hero(60)); g.save(); g.translate(0, y0 + 270); const s = 1 + (done > 0 ? 0.1 * hit(done, 6) : 0); g.scale(s, s);
      txt(g, 'AGE', -(nw + sw) / 2 - 10, -10, F.cap(40), theme.inkSoft, 'right'); roll(g, age, -(nw + sw) / 2 + 20, 0, o); txt(g, ' YEARS', -(nw + sw) / 2 + 20 + nw, 38, F.hero(60), theme.badInk, 'left'); g.restore();
      g.strokeStyle = theme.ink; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.moveTo(rx0, ry); g.lineTo(rx1, ry); g.stroke(); for (let i = 0; i <= 18; i++) { const x = lerp(rx0, rx1, i / 18); g.strokeStyle = i <= age && t >= p.at ? theme.badInk : theme.ink; g.lineWidth = i % 6 === 0 ? 7 : 4; g.beginPath(); g.moveTo(x, ry); g.lineTo(x, ry - (i % 6 === 0 ? 40 : 24)); g.stroke(); }
      g.fillStyle = theme.badInk; rr(g, rx0, ry - 6, (rx1 - rx0) * u, 12, 6); g.fill();
      // left toy + right cap
      g.save(); g.translate(rx0 - 10, ry + 78); if (p.toy === 'bottle') { clay(g, -22, -34, 44, 72, 14, theme.paper, { shadowK: 0.3 }); g.fillStyle = theme.gold; g.beginPath(); g.ellipse(0, -44, 14, 12, 0, 0, 7); g.fill(); g.fillStyle = '#6aa0d8'; g.fillRect(-18, -4, 36, 22); } else { clay(g, -4, -10, 8, 54, 4, theme.gold, { shadowK: 0.2 }); g.fillStyle = theme.badInk; g.beginPath(); g.arc(0, -26, 28, 0, 7); g.fill(); g.fillStyle = 'rgba(255,255,255,.4)'; g.beginPath(); g.arc(-8, -34, 8, 0, 7); g.fill(); } g.restore();
      txt(g, 'NEWBORN', rx0 + 40, ry + 82, F.cap(30), theme.ink, 'left');
      g.save(); g.translate(rx1 - 6, ry + 80); { const ck = t >= p.at + p.dur - 0.1 ? spring(t - p.at - p.dur + 0.1, 'bouncy') : 0.7; g.scale(ck, ck); g.fillStyle = '#1B2430'; g.beginPath(); g.moveTo(0, -34); g.lineTo(60, -10); g.lineTo(0, 14); g.lineTo(-60, -10); g.closePath(); g.fill(); g.fillStyle = '#2c3e66'; rr(g, -32, 6, 64, 26, 8); g.fill(); g.strokeStyle = theme.gold; g.lineWidth = 4; g.beginPath(); g.moveTo(52, -8); g.lineTo(52, 30); g.stroke(); g.fillStyle = theme.gold; g.beginPath(); g.arc(52, 34, 7, 0, 7); g.fill(); } g.restore();
      txt(g, 'HIGH SCHOOL GRADUATE', rx1 - 60, ry + 82, F.cap(30), theme.ink, 'right');
      // travelling head
      { const hx = lerp(rx0, rx1, u), hy = ry - 78 - Math.abs(Math.sin(u * 30)) * (u > 0 && u < 1 ? 6 : 0); g.save(); g.translate(hx, hy); B.shadowed(g, () => { g.beginPath(); g.arc(0, 0, 38, 0, 7); }, '#E8B98A', 0.3); g.fillStyle = '#0B0F14'; for (const ex of [-13, 13]) { g.beginPath(); g.arc(ex, -4, 4.5, 0, 7); g.fill(); } g.strokeStyle = '#0B0F14'; g.lineWidth = 4; g.lineCap = 'round'; g.beginPath(); g.arc(0, 8, 13, 0.3, Math.PI - 0.3); g.stroke();
        if (u < 0.9) { g.strokeStyle = '#5a3f08'; g.lineWidth = 5; g.beginPath(); g.moveTo(0, -37); g.quadraticCurveTo(10, -58, -4, -60); g.stroke(); } else { const hk = spring(Math.max(0, (u - 0.9) / 0.1 * 0.4), 'bouncy'); g.save(); g.translate(0, -36 - 16 * (1 - hk)); g.fillStyle = '#1B2430'; g.beginPath(); g.moveTo(0, -18); g.lineTo(48, -2); g.lineTo(0, 12); g.lineTo(-48, -2); g.closePath(); g.fill(); g.fillStyle = '#2c3e66'; rr(g, -26, 6, 52, 18, 6); g.fill(); g.restore(); }
        g.restore(); }
      tag(g, 'A COMPARISON OF LENGTH ONLY · ILLUSTRATION', 0, y0 + h - 22, theme.inkSoft);
    },
  });

  // ---------- span: 1988 -> 2017 paper timeline, a crown rides it, ~30 YEARS rolls. cakesAt: birthday cakes pop along it; cmpAt: YOU 30 MINUTES vs HIM 30 YEARS bars ----------
  B.register('span', {
    defaults: { w: 960, h: 660, at: 99999, dur: 1.6, head: 'THE PRINCE ACT', cakesAt: 99999, cmpAt: 99999 }, size: p => [p.w, p.h],
    anchors: p => ({ num: [0, -p.h / 2 + 215, p.w * 0.85, 190], strip: [0, 20, p.w * 0.9, 170], cmp: [0, p.h / 2 - 140, p.w * 0.85, 200], head: [0, -p.h / 2 + 65, p.w, 130] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift }); band(g, theme, x0, y0, w, h, 26, p.head, 60);
      const sx0 = -390, sx1 = 390, sy = y0 + 345, u = ease.inOut(clamp((t - p.at) / p.dur)), done = t - p.at - p.dur;
      const o = { font: F.hero(180), size: 180, color: u >= 1 ? theme.badInk : theme.ink, prefix: '~', align: 'left', speed: u > 0 && u < 1 ? 14 : 0 }, v = t < p.at ? 0 : Math.round(30 * u), nw = B.rollWidth(g, 30, o).w, sw = mw(' YEARS', F.hero(70)), tot = nw + sw, s = 1 + (done > 0 ? 0.12 * hit(done, 6) : 0);
      g.save(); g.translate(0, y0 + 250); g.scale(s, s); roll(g, v, -tot / 2, 0, o); txt(g, ' YEARS', -tot / 2 + nw, 36, F.hero(70), theme.badInk, 'left'); if (done > 0) marker(g, -tot / 2, 80, tot, 9, theme.badInk, clamp(done / 0.3), 0.9); g.restore(); if (done > -0.05) burst(g, 0, y0 + 250, 300, theme.bad, done, 16, 0.5);
      g.strokeStyle = theme.ink; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.moveTo(sx0, sy); g.lineTo(sx1, sy); g.stroke(); for (let i = 0; i <= 29; i++) { const x = lerp(sx0, sx1, i / 29); g.lineWidth = i % 5 === 0 ? 6 : 3; g.beginPath(); g.moveTo(x, sy); g.lineTo(x, sy - (i % 5 === 0 ? 26 : 14)); g.stroke(); }
      g.fillStyle = theme.badInk; rr(g, sx0, sy - 5, (sx1 - sx0) * u, 10, 5); g.fill();
      txt(g, '1988', sx0, sy + 36, F.hero(44), theme.ink, 'center'); txt(g, '2017', sx1, sy + 36, F.hero(44), theme.ink, 'center'); txt(g, 'ARRESTED', sx1, sy + 70, F.mono(16), theme.inkSoft, 'center');
      { const cx = lerp(sx0, sx1, u); g.save(); g.translate(cx, sy - 40 - (u > 0 && u < 1 ? Math.abs(Math.sin(u * 40)) * 8 : 0)); drawCrown(g, theme, 0.28); g.restore(); }
      // birthday cakes (TikTok): stop at ~2/3 of the strip
      if (t > p.cakesAt) { const n = 8; for (let i = 0; i < n; i++) { const k = spring(Math.max(0, t - p.cakesAt - i * 0.09), 'bouncy'); if (t < p.cakesAt + i * 0.09) continue; const cx = lerp(sx0 + 20, sx0 + (sx1 - sx0) * 0.66, i / (n - 1)), cy = sy + 118; g.save(); g.translate(cx, cy); g.scale(k, k); clay(g, -24, -14, 48, 32, 6, theme.paper, { shadowK: 0.3 }); g.fillStyle = '#E86A92'; rr(g, -24, -14, 48, 12, 6); g.fill(); g.fillStyle = theme.gold; g.fillRect(-3, -34, 6, 20); g.fillStyle = theme.bad; g.beginPath(); g.ellipse(0, -39, 5, 7, 0, 0, 7); g.fill(); g.restore(); }
        const r = rise(t, p.cakesAt + 0.8, 20); if (r.on) { const ex = sx0 + (sx1 - sx0) * 0.66; g.save(); g.globalAlpha = r.a; g.translate(ex, sy + 185 + r.y); paper(g, -170, -28, 340, 56, 10, { fill: '#F5E6A8' }); txt(g, 'A LOT OF YOU: YOUR WHOLE LIFE', 0, 3, F.cap(22), theme.ink); g.restore(); } }
      // compare bars (Instagram)
      if (t > p.cmpAt) { const bx = x0 + 70, k1 = ease.out(clamp((t - p.cmpAt) / 0.3)), k2 = ease.out(clamp((t - p.cmpAt - 0.5) / 0.9)); txt(g, 'YOU', bx, sy + 118, F.hero(40), theme.ink, 'left'); g.fillStyle = theme.good; rr(g, bx + 130, sy + 98, 22 * k1, 38, 6); g.fill(); txt(g, '30 MINUTES', bx + 170, sy + 118, F.cap(30), theme.goodInk, 'left');
        txt(g, 'HIM', bx, sy + 178, F.hero(40), theme.ink, 'left'); g.fillStyle = theme.bad; rr(g, bx + 130, sy + 158, Math.max(0, (w - 340) * k2), 38, 6); g.fill(); if (k2 > 0.95) txt(g, '30 YEARS', bx + 130 + (w - 340) - 14, sy + 178, F.hero(36), theme.paper, 'right'); }
      tag(g, 'ABOUT 30 YEARS = 1988 TO THE 2017 ARREST · PER DOJ DATES', 0, y0 + h - 22, theme.inkSoft);
    },
  });

  // ---------- costume: "what a prince wears" diagram: clay silhouette + crown, a car-plate tile and a badge tile pinned on strings, FAKE stamps ----------
  B.register('costume', {
    defaults: { w: 980, h: 900, plateAt: 99999, badgeAt: 99999, fakeAt: 99999, fake2At: 99999 }, size: p => [p.w, p.h],
    anchors: p => ({ plate: [-300, 60, 300, 340], badge: [300, 60, 300, 340], fig: [0, 80, 300, 600], head: [0, -p.h / 2 + 65, p.w, 130] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift }); band(g, theme, x0, y0, w, h, 26, 'HIS COSTUME', 68);
      txt(g, 'WHAT A “PRINCE” WEARS', x0 + w - 36, y0 + 62, F.mono(24), 'rgba(245,243,238,.8)', 'right');
      const cy = y0 + 560; sil(g, 0, cy, 0.82); g.save(); g.translate(0, cy - 150 * 0.82 + 8); drawCrown(g, theme, 0.7); g.restore(); txt(g, 'NOT A PRINCE', 0, y0 + h - 80, F.mono(22), theme.inkSoft);
      const tile = (cx, at, draw, label) => { const r = t - at; if (r < -0.01) return false; const k = spring(Math.max(0, r), 'snappy'); g.save(); g.globalAlpha *= clamp(r / 0.08 + 0.2); g.translate(cx, cy - 20); g.scale(0.6 + 0.4 * k, 0.6 + 0.4 * k); paper(g, -150, -170, 300, 340, 18, { lift }); g.fillStyle = theme.bad; g.beginPath(); g.arc(0, -170, 13, 0, 7); g.fill(); draw(); txt(g, label, 0, 136, F.cap(30), theme.ink); g.restore(); return true; };
      tile(-300, p.plateAt, () => { g.save(); g.translate(0, -82); g.scale(0.3, 0.3); drawCar(g, theme, 0); g.restore(); g.save(); g.translate(0, 28); g.fillStyle = '#F5F3EE'; g.strokeStyle = theme.navy; g.lineWidth = 6; rr(g, -115, -56, 230, 112, 12); g.fill(); rr(g, -115, -56, 230, 112, 12); g.stroke(); g.fillStyle = theme.navy; g.fillRect(-109, -50, 218, 34); txt(g, 'DIPLOMAT', 0, -33, F.cap(24), theme.paper); txt(g, 'D 0 0 0 0', 0, 22, F.mono(40), theme.navy); g.restore(); txt(g, 'GENERIC PLATE', 0, 154, F.mono(13), theme.inkSoft); }, 'CAR PLATE');
      tile(300, p.badgeAt, () => { g.save(); g.translate(0, -10); shield(g, theme, 1.5); g.restore(); txt(g, 'GENERIC BADGE', 0, 154, F.mono(13), theme.inkSoft); }, 'SECURITY BADGE');
      stampT(g, t, p.fakeAt, -300, cy + 10, -0.14, 92, theme.badInk, 'FAKE'); stampT(g, t, p.fake2At, 300, cy + 10, 0.1, 92, theme.badInk, 'FAKE'); tag(g, 'ILLUSTRATION · PROPS', 0, y0 + h - 30, theme.inkSoft);
    },
  });

  // ---------- whycard: a calm, plain 3-step "why" (numbered boxes open one at a time). No art, no jokes ----------
  B.register('whycard', {
    defaults: { w: 960, h: 840, head: 'WHY IT MATTERS', sub: 'IN PLAIN WORDS', r1: ['SAUDI ROYALS', 'ARE MUSLIM'], r2: ['ISLAM FORBIDS', 'EATING PORK'], r3: ['SO HIS CHARACTER', 'WOULD NEVER ORDER IT'], a1: 99999, a2: 99999, a3: 99999 }, size: p => [p.w, p.h],
    anchors: p => ({ r1: [0, -p.h / 2 + 260, p.w * 0.9, 190], r2: [0, -p.h / 2 + 470, p.w * 0.9, 190], r3: [0, -p.h / 2 + 680, p.w * 0.9, 190], head: [0, -p.h / 2 + 65, p.w, 130] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift }); band(g, theme, x0, y0, w, h, 26, p.head, 62); txt(g, p.sub, x0 + w - 36, y0 + 62, F.mono(24), 'rgba(245,243,238,.8)', 'right');
      [[p.r1, p.a1], [p.r2, p.a2], [p.r3, p.a3]].forEach(([ls, at], i) => { const r = rise(t, at, 34); if (!r.on) return; const ry = y0 + 165 + i * 210, last = i === 2; g.save(); g.globalAlpha = r.a; g.translate(0, r.y);
        if (i > 0) { g.fillStyle = theme.inkSoft; g.beginPath(); g.moveTo(-18, ry - 30); g.lineTo(18, ry - 30); g.lineTo(0, ry - 8); g.closePath(); g.fill(); }
        paper(g, x0 + 44, ry, w - 88, 170, 16, { fill: last ? '#FBEDEB' : theme.paperShade }); if (last) { g.strokeStyle = theme.badInk; g.lineWidth = 4; rr(g, x0 + 48, ry + 4, w - 96, 162, 14); g.stroke(); }
        g.fillStyle = last ? theme.badInk : theme.navy; g.beginPath(); g.arc(x0 + 128, ry + 85, 44, 0, 7); g.fill(); txt(g, String(i + 1), x0 + 128, ry + 90, F.hero(56), theme.paper);
        txt(g, ls[0], x0 + 200, ry + 64, F.hero(56), last ? theme.badInk : theme.ink, 'left'); txt(g, ls[1], x0 + 200, ry + 126, F.hero(56), theme.ink, 'left'); g.restore(); });
    },
  });

  // ---------- pcard: gold-edged PRINCE name card (his claim). crackAt: splits down the middle; dropAt: crown slides off; stampAt: OUT OF CHARACTER stamp ----------
  B.register('pcard', {
    defaults: { w: 780, h: 500, sub: 'HIS CLAIM', crackAt: 99999, dropAt: 99999, stampAt: 99999, stampText: 'OUT OF CHARACTER' }, size: p => [p.w, p.h],
    anchors: p => ({ name: [0, 40, p.w * 0.9, 200], crown: [0, -p.h / 2 + 50, 300, 130] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, ck = t >= p.crackAt ? ease.out(clamp((t - p.crackAt) / 0.25)) : 0, split = 14 * ck;
      const card = () => { paper(g, x0, y0, w, h, 24, { lift }); g.strokeStyle = theme.gold; g.lineWidth = 16; rr(g, x0 + 16, y0 + 16, w - 32, h - 32, 14); g.stroke(); txt(g, 'PRINCE', 0, y0 + 285, F.hero(210), theme.ink); txt(g, p.sub, 0, y0 + h - 56, F.mono(26), theme.inkSoft); tag(g, 'ILLUSTRATION · PROP · NOT A REAL TITLE', 0, y0 + h - 28, theme.inkSoft);
        const du = t >= p.dropAt ? clamp((t - p.dropAt) / 0.9) : 0; if (du < 1) { const dy = 460 * ease.in(du), dx = 220 * ease.out(du), cr = 1.2 * du; g.save(); g.translate(dx, y0 + 108 + dy - (du > 0.85 ? 14 * Math.abs(Math.sin((du - 0.85) * 40)) : 0)); g.rotate(cr); drawCrown(g, theme, 0.5); g.restore(); } };
      if (ck > 0) { for (const s of [-1, 1]) { g.save(); g.translate(s * split, 0); g.rotate(s * 0.018 * ck); g.beginPath(); g.rect(s < 0 ? x0 - 40 : 0, y0 - 40, w / 2 + 40, h + 80); g.clip(); card(); g.restore(); }
        g.strokeStyle = theme.badInk; g.lineWidth = 5; g.beginPath(); g.moveTo(0, y0 + 6); for (let i = 1; i <= 8; i++) g.lineTo((i % 2 ? 1 : -1) * 16, y0 + 6 + (h - 12) * Math.min(1, ck * 8 / 8 + 0) * i / 8); g.stroke(); } else card();
      stampT(g, t, p.stampAt, 40, 30, -0.1, 86, theme.badInk, p.stampText);
    },
  });

  // ---------- skyline: paper Miami skyline, a spotlight swings to a dust-sheeted shape ----------
  B.register('skyline', {
    defaults: { w: 940, h: 640, lampAt: 99999, label: 'MIAMI' }, size: p => [p.w, p.h],
    anchors: p => ({ cover: [250, 140, 300, 220], head: [0, -p.h / 2 + 65, p.w, 130] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift }); band(g, theme, x0, y0, w, h, 26, p.label, 72);
      const base = y0 + h - 70; [[-400, 90, 250], [-300, 70, 330], [-215, 90, 210], [-120, 80, 380], [-30, 100, 290], [70, 70, 240], [150, 60, 330]].forEach(([bx, bw, bh], i) => { clay(g, bx, base - bh, bw, bh, 8, i % 2 ? '#59647a' : '#6d778c', { shadowK: 0.4 }); g.fillStyle = 'rgba(245,243,238,.5)'; for (let r = 0; r < Math.floor(bh / 46); r++) for (let c = 0; c < Math.floor(bw / 30); c++) g.fillRect(bx + 12 + c * 26, base - bh + 18 + r * 40, 10, 14); });
      const u = ease.inOut(clamp((t - p.lampAt + 0.9) / 1.3)), sx = lerp(-380, 250, u), shimmer = t > p.lampAt ? 1 : 0; g.save(); g.fillStyle = 'rgba(255,248,220,.2)'; g.beginPath(); g.moveTo(sx - 12, y0 + 130); g.lineTo(sx + 12, y0 + 130); g.lineTo(sx + 150, base); g.lineTo(sx - 150, base); g.closePath(); g.fill(); g.restore();
      // sheeted shape
      g.save(); g.translate(250, base - 4); g.fillStyle = theme.paper; g.strokeStyle = theme.rule; g.lineWidth = 3; g.beginPath(); g.moveTo(-150, 0); g.quadraticCurveTo(-150, -70, -90, -90); g.quadraticCurveTo(-30, -130, 40, -100); g.quadraticCurveTo(130, -90, 150, 0); g.closePath(); g.fill(); g.stroke(); g.strokeStyle = 'rgba(0,0,0,.12)'; for (const fx of [-70, -10, 60]) { g.beginPath(); g.moveTo(fx, -92); g.quadraticCurveTo(fx - 8, -40, fx - 4, 0); g.stroke(); } txt(g, '?', 0, -36 - 6 * Math.sin(t * 5) * shimmer, F.hero(90), theme.badInk); g.restore();
      tag(g, 'ILLUSTRATION · GENERIC SKYLINE', 0, y0 + h - 24, theme.inkSoft);
    },
  });

  // ---------- nope: a sticky note with a red X (NOT THE CAR / NOT THE BADGES) ----------
  B.register('nope', {
    defaults: { text: 'NOT THE CAR', at: 99999, w: 520 }, size: p => [p.w, 140],
    draw(g, p, env) {
      const { t, theme } = env, w = p.w; paper(g, -w / 2, -62, w, 124, 12, { fill: '#F5E6A8' }); const k = clamp((t - p.at) / 0.18); txt(g, p.text, -30, 4, F.hero(60), theme.ink);
      if (k > 0) { const s = 1 + 0.3 * hit(t - p.at, 10); g.save(); g.translate(w / 2 - 70, 0); g.scale(s, s); g.strokeStyle = theme.badInk; g.lineWidth = 14; g.lineCap = 'round'; g.beginPath(); g.moveTo(-26, -26); g.lineTo(-26 + 52 * Math.min(1, k * 2), -26 + 52 * Math.min(1, k * 2)); g.stroke(); if (k > 0.5) { g.beginPath(); g.moveTo(26, -26); g.lineTo(26 - 52 * Math.min(1, (k - 0.5) * 2), -26 + 52 * Math.min(1, (k - 0.5) * 2)); g.stroke(); } g.restore();
        g.strokeStyle = theme.badInk; g.lineWidth = 7; g.beginPath(); g.moveTo(-w / 2 + 34, 6); g.lineTo(-w / 2 + 34 + (w - 190) * clamp((t - p.at) / 0.25), 6); g.stroke(); }
    },
  });

  // ---------- hud (screen layer): pinned beat label + a LIVE REAL number chip that rolls to each new value on its trigger word ----------
  // labels: [{at, text}] · items: [{at, label, to, from?, dur?, prefix?, suffix?, commas?}]; `from` defaults to the previous item's `to`.
  B.register('hud', {
    defaults: { labels: [], items: [] }, ownEnter: true, size: () => [10, 10],
    draw(g, p, env) {
      const { t, theme } = env; let li = -1; p.labels.forEach((l, i) => { if (t >= l.at) li = i; });
      if (li >= 0) { const L = p.labels[li], lt = t - L.at, k = ease.out(clamp(lt / 0.3)), P = li > 0 ? p.labels[li - 1] : null, f = F.cap(27); g.font = f; const nw = g.measureText(L.text).width + 62;
        g.save(); g.translate(90, 318); if (P && lt < 0.3) { g.globalAlpha = 1 - k; txt(g, P.text, 38, -((k) * 18) + 22, f, theme.paper, 'left'); g.globalAlpha = 1; }
        g.fillStyle = 'rgba(11,15,20,.82)'; rr(g, 0, 0, nw, 46, 10); g.fill(); g.fillStyle = theme.gold; g.beginPath(); g.arc(22, 23, 7, 0, 7); g.fill(); g.save(); rr(g, 0, 0, nw, 46, 10); g.clip(); g.globalAlpha = lt < 0.3 ? k : 1; txt(g, L.text, 38, 24 + (1 - k) * 16, f, theme.paper, 'left'); g.restore(); g.restore(); }
      let ii = -1; p.items.forEach((it, i) => { if (t >= it.at) ii = i; }); if (ii < 0) return; const it = p.items[ii], prev = ii > 0 ? p.items[ii - 1] : null, from = it.from != null ? it.from : (prev ? prev.to : 0), dur = it.dur || 0.6, rt = t - it.at, v = countAt(Math.max(0, rt), dur, from, it.to), land = rt - dur;
      const sp = rt > 0 && rt < dur ? Math.min(40, Math.abs(countAt(rt + 0.02, dur, from, it.to) - v) / 0.02 / Math.max(1, Math.abs(it.to - from)) * 6) : 0, o = { font: F.hero(54), size: 54, color: it.tone ? B.tone(it.tone, false) : theme.paper, prefix: it.prefix || '', suffix: it.suffix || '', align: 'left', commas: it.commas !== false, decimals: 0, speed: sp };
      const lab = it.label; g.font = F.mono(19); const lw = g.measureText(lab).width, nw = B.rollWidth(g, it.to, o).w, cw = Math.max(lw, nw) + 44, x1 = 990, s = 1 + (land > 0 ? 0.08 * hit(land, 7) : 0);
      g.save(); g.translate(x1, 300); g.fillStyle = 'rgba(11,15,20,.82)'; rr(g, -cw, 0, cw, 92, 12); g.fill(); if (rt < 0.3 && prev) { g.globalAlpha = 1 - rt / 0.3; txt(g, prev.label, -cw + 22, 20, F.mono(19), rgba(theme.paper, 0.75), 'left'); g.globalAlpha = 1; }
      g.save(); rr(g, -cw, 0, cw, 92, 12); g.clip(); g.globalAlpha = clamp(rt / 0.25 + 0.4); txt(g, lab, -cw + 22, 20, F.mono(19), rgba(theme.gold, 0.95), 'left'); g.translate(-cw + 22, 64); g.scale(s, s); roll(g, v, 0, 0, o); g.restore(); g.restore();
    },
  });
})();
