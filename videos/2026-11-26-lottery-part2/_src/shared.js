// ===== Lottery Part 2 — shared custom recipes (registered via BM2.register; prepended to each cut's scene.js) =====
// Generic paper-and-clay art only: no real lottery logos, no people, no real documents (every prop is labelled ILLUSTRATION in the footnote).
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, countAt, hash, hit, wobble } = B;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const zn = () => B.zoomNow || 1;
  const STRIPE = ['#2c3e66', '#F2B705', '#1FA366', '#E0281E'];
  const BODY = ['#F5F3EE', '#EFE6CF', '#F5F3EE', '#E7E2D6'];
  const rise = (t, at, d = 18) => { const o = t - at; return { a: clamp(o / 0.12), y: (1 - spring(Math.max(0, o), 'snappy')) * d, on: o > 0 }; };

  // generic paper ticket (no logo, no digits): stripe, perforation, grey number bars
  function ticket(g, cx, cy, w, h, rot, i, o = {}) {
    g.save(); g.translate(cx, cy); g.rotate(rot); if (o.s && o.s !== 1) g.scale(o.s, o.s);
    const nr = h * 0.13, r = 8, hw = w / 2, hh = h / 2;
    const path = () => { g.beginPath(); g.moveTo(-hw + r, -hh); g.lineTo(hw - r, -hh); g.quadraticCurveTo(hw, -hh, hw, -hh + r); g.lineTo(hw, -nr); g.arc(hw, 0, nr, -Math.PI / 2, Math.PI / 2, true); g.lineTo(hw, hh - r); g.quadraticCurveTo(hw, hh, hw - r, hh); g.lineTo(-hw + r, hh); g.quadraticCurveTo(-hw, hh, -hw, hh - r); g.lineTo(-hw, nr); g.arc(-hw, 0, nr, Math.PI / 2, -Math.PI / 2, true); g.lineTo(-hw, -hh + r); g.quadraticCurveTo(-hw, -hh, -hw + r, -hh); g.closePath(); };
    const sh = (o.sh == null ? 10 : o.sh) * zn(); g.shadowColor = 'rgba(2,4,9,.38)'; g.shadowBlur = sh; g.shadowOffsetY = sh * 0.5;
    g.fillStyle = o.fill || BODY[i % 4]; path(); g.fill(); g.shadowColor = 'transparent';
    g.save(); path(); g.clip();
    g.fillStyle = STRIPE[(i * 7 + 1) % 4]; g.fillRect(-hw, -hh, w * 0.16, h);
    g.strokeStyle = 'rgba(89,96,107,.55)'; g.lineWidth = Math.max(2, h * 0.025); g.setLineDash([h * 0.07, h * 0.06]); g.beginPath(); g.moveTo(hw - w * 0.27, -hh); g.lineTo(hw - w * 0.27, hh); g.stroke(); g.setLineDash([]);
    g.fillStyle = 'rgba(89,96,107,.42)';
    for (let k = 0; k < 3; k++) { const ww = w * (0.22 + 0.2 * hash(i * 3.1 + k)); rr(g, -hw + w * 0.22, -h * 0.26 + k * h * 0.24, ww, h * 0.1, h * 0.04); g.fill(); }
    g.fillStyle = 'rgba(89,96,107,.55)'; rr(g, hw - w * 0.22, -h * 0.26, w * 0.14, h * 0.1, h * 0.04); g.fill();
    if (o.label) txt(g, o.label, -hw + w * 0.2, -h * 0.34, F.monoX(h * 0.15), 'rgba(11,15,20,.7)', 'left');
    g.restore();
    g.strokeStyle = o.edge || 'rgba(0,0,0,.2)'; g.lineWidth = o.edgeW || 2; path(); g.stroke(); g.restore();
  }
  B.ticket = ticket;

  // ---------- mountain: a pile of paper tickets. Rises (ticket by ticket) from `in`; thumps on thumpAt; one ticket lifts out (hero) ----------
  const mdims = p => [(p.rows - 1) * p.dx + p.tw, (p.rows - 1) * p.dy + p.th];
  B.register('mountain', {
    defaults: { rows: 10, tw: 170, th: 80, dx: 98, dy: 48, thumpAt: 99999, thump2At: 99999, heroAt: 99999, heroOut: 99999, seed: 1, label: '' }, ownEnter: true,
    size: p => mdims(p),
    anchors: p => { const [w, h] = mdims(p); return { top: [0, -h / 2 + 90, w * 0.45, 190], hero: [0, -h / 2 - 60, 440, 260], base: [0, h / 2 - 60, w, 120], whole: [0, -40, w, h + 200] }; },
    draw(g, p, env) {
      const { t, lt } = env, [w, h] = mdims(p), base = (p.rows - 1) * p.dy / 2; let idx = 0; const heroOn = t >= p.heroAt && t < p.heroOut;
      for (let r = 0; r < p.rows; r++) { const n = p.rows - r; for (let c = 0; c < n; c++) { const i = idx++, hh = hash(i * 7.3 + p.seed), isHero = r === p.rows - 1 && c === 0; if (isHero && heroOn) continue;
        const x = (c - (n - 1) / 2) * p.dx + (hash(i * 2.1 + p.seed) - 0.5) * 14, y = base - r * p.dy + (hash(i * 5.7 + p.seed) - 0.5) * 8, o = lt - r * 0.07 - hh * 0.15; if (o <= 0) continue;
        const k = spring(o, 'snappy'); let jump = 0; for (const tt of [p.thumpAt, p.thump2At]) { const tj = t - tt; if (tj > 0 && tj < 1.2) jump += Math.abs(Math.sin(tj * 11)) * Math.exp(-5 * tj) * (24 + hh * 46); }
        ticket(g, x, y + (1 - k) * 170 - jump, p.tw * (0.5 + 0.5 * k), p.th * (0.5 + 0.5 * k), (hash(i * 3.9 + p.seed) - 0.5) * 0.34, i, { sh: 8 }); } }
      if (heroOn || (t >= p.heroOut && t < p.heroOut + 0.5)) { const u = heroOn ? spring(t - p.heroAt, 'snappy') : 1 - ease.out(lin(t, p.heroOut, p.heroOut + 0.4)), bx = 0, by = base - (p.rows - 1) * p.dy;
        if (u > 0) { const y = by - u * 125, s = 1 + 0.55 * u; g.save(); g.globalAlpha = 0.28 * u; g.fillStyle = '#F5F3EE'; rr(g, -p.tw * s * 0.62, y - p.th * s * 0.8, p.tw * s * 1.24, p.th * s * 1.6, 26); g.fill(); g.restore();
          ticket(g, bx, y, p.tw, p.th, -0.05 * u, 0, { s, sh: 22, edge: '#F2B705', edgeW: 6, label: 'TICKET' }); } }
    },
  });

  // ---------- cheque: prize cheque with an odometer amount and an optional red record rosette ----------
  B.register('cheque', {
    defaults: { w: 800, h: 350, to: 27000000, from: 0, at: 0, dur: 1.3, rosetteAt: 99999, rosette: ['STATE', 'RECORD'], payee: 'AN AUSTRALIAN FUND', src: 'PER UPI · MAR 10, 1992', head: 'PRIZE CHEQUE', prefix: '$', suffix: '', size: 108 },
    size: p => [p.w, p.h], anchors: p => ({ amount: [0, 38, p.w * 0.92, 160], rosette: [p.w / 2 - 70, -p.h / 2 + 10, 200, 200] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 20, { lift });
      g.strokeStyle = theme.rule; g.lineWidth = 3; rr(g, x0 + 14, y0 + 14, w - 28, h - 28, 12); g.stroke();
      txt(g, p.head, x0 + 40, y0 + 46, F.monoX(24), theme.navy, 'left'); txt(g, 'ILLUSTRATION', x0 + 40, y0 + 76, F.mono(17), theme.inkSoft, 'left');
      txt(g, 'PAY TO', x0 + 40, y0 + 122, F.mono(20), theme.inkSoft, 'left'); txt(g, p.payee, x0 + 140, y0 + 122, F.cap(30), theme.ink, 'left');
      g.strokeStyle = theme.ink; g.lineWidth = 2; g.beginPath(); g.moveTo(x0 + 136, y0 + 144); g.lineTo(x0 + w * 0.68, y0 + 144); g.stroke();
      const lt = t - p.at, dur = p.dur, v = lt < 0 ? p.from : countAt(Math.max(0, lt), dur, p.from, p.to), land = lt - dur, s = 1 + (land > 0 ? 0.1 * (1 - spring(land, { f: 2.4, z: 0.42 })) : 0.03 * lin(lt, 0, dur)) + (env.hot === 'amount' ? 0.03 * env.hotK : 0);
      const o = { font: F.hero(p.size), size: p.size, color: theme.goodInk, prefix: p.prefix, suffix: p.suffix, decimals: 0, align: 'left', speed: lt > 0 && lt < dur ? Math.abs(countAt(lt + 0.02, dur, p.from, p.to) - v) / 0.02 : 0 };
      const nw = B.rollWidth(g, p.to, o).w; g.save(); g.translate(0, y0 + h * 0.66); g.scale(s, s); if (land > 0) marker(g, -nw / 2, p.size * 0.6, nw, p.size * 0.07, theme.goodInk, clamp(land / 0.35), 0.9); roll(g, v, -nw / 2, 0, o); g.restore(); burst(g, 0, y0 + h * 0.66, nw * 0.6, theme.good, land, 18, 0.55);
      txt(g, p.src, x0 + 40, y0 + h - 34, F.mono(18), theme.inkSoft, 'left');
      const rt = t - p.rosetteAt; if (rt > 0) { const k = spring(rt, 'bouncy'), cx = w / 2 - 70, cy = -h / 2 + 18; g.save(); g.translate(cx, cy); g.rotate(0.18); g.scale(0.3 + 0.7 * k, 0.3 + 0.7 * k); g.globalAlpha = clamp(rt / 0.1);
        g.shadowColor = 'rgba(2,4,9,.4)'; g.shadowBlur = 16 * zn(); g.shadowOffsetY = 8 * zn(); g.fillStyle = theme.badInk; g.beginPath(); for (let i = 0; i < 28; i++) { const a = i / 28 * Math.PI * 2, rad = i % 2 ? 84 : 98; g.lineTo(Math.cos(a) * rad, Math.sin(a) * rad); } g.closePath(); g.fill(); g.shadowColor = 'transparent';
        g.strokeStyle = theme.paper; g.lineWidth = 4; g.beginPath(); g.arc(0, 0, 70, 0, 7); g.stroke(); txt(g, p.rosette[0], 0, -22, F.hero(40), theme.paper); txt(g, p.rosette[1], 0, 24, F.hero(40), theme.paper); g.restore(); burst(g, cx, cy, 110, theme.bad, rt - 0.05, 14, 0.5); }
    },
  });

  // ---------- rulebook: Virginia rulebook card. Opens, red pencil underlines the rule, fresh red-ink rule slides in, EMERGENCY RULES stamp ----------
  B.register('rulebook', {
    defaults: { w: 700, h: 900, ulAt: 99999, lineAt: 99999, newAt: 99999, stampAt: 99999, dimAt: 99999, src: 'PER UPI · WASHINGTON POST, 1992', lineText: ['TICKETS MUST BE BOUGHT', 'AT A LICENSED RETAILER'], newText: ['NEW: NO BULK BUYING'], stamp: 'EMERGENCY RULES' }, ownEnter: true,
    size: p => [p.w, p.h], anchors: p => ({ head: [0, -p.h / 2 + 75, p.w, 150], rule: [0, -p.h / 2 + 300, p.w * 0.9, 190], news: [0, 60, p.w * 0.9, 150], stamp: [0, 150, p.w * 0.98, 230] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, k = spring(lt, 'snappy'), sx = 0.06 + 0.94 * k;
      g.save(); g.translate(x0, 0); g.scale(sx, 1); g.translate(-x0, 0);
      clay(g, x0 - 12, y0 + 10, w + 24, h, 26, theme.navy, { lift: 0.2 }); paper(g, x0, y0, w, h, 22, { lift });
      g.save(); rr(g, x0, y0, w, h, 22); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 150); g.restore();
      txt(g, 'VIRGINIA LOTTERY', x0 + 36, y0 + 58, F.hero(62), theme.paper, 'left'); txt(g, 'RULES', x0 + 36, y0 + 114, F.hero(46), theme.gold, 'left'); txt(g, 'ILLUSTRATION', x0 + w - 28, y0 + 30, F.mono(17), 'rgba(245,243,238,.7)', 'right');
      g.fillStyle = theme.paperShade; for (let i = 0; i < 4; i++) { rr(g, x0 + 40, y0 + 190 + i * 40, w * (0.5 + 0.38 * hash(i * 5.5)), 18, 9); g.fill(); }
      const ry = y0 + 420, ltm = t - p.lineAt;
      if (ltm > 0) { const r = rise(t, p.lineAt, 22); g.save(); g.globalAlpha = r.a; g.translate(0, r.y); txt(g, p.lineText[0], 0, ry - 22, F.cap(40), theme.ink); txt(g, p.lineText[1], 0, ry + 28, F.cap(40), theme.ink);
        const u = ease.out(clamp((t - p.ulAt) / 0.5)); if (u > 0) { g.strokeStyle = theme.badInk; g.lineWidth = 8; g.lineCap = 'round'; g.beginPath(); const x1 = -w * 0.4, x2 = x1 + w * 0.8 * u; for (let i = 0; i <= 24; i++) { const xx = lerp(x1, x2, i / 24), yy = ry + 62 + Math.sin(i * 1.3) * 4; i ? g.lineTo(xx, yy) : g.moveTo(xx, yy); } g.stroke(); } g.restore(); }
      else { g.fillStyle = theme.paperShade; for (let i = 0; i < 2; i++) { rr(g, x0 + 40, ry - 30 + i * 52, w * 0.75, 22, 11); g.fill(); } }
      g.fillStyle = theme.paperShade; for (let i = 0; i < 3; i++) { rr(g, x0 + 40, y0 + 560 + i * 40, w * (0.45 + 0.4 * hash(i * 9.1)), 18, 9); g.fill(); }
      const nt = t - p.newAt; if (nt > -0.01) { const u = ease.out(clamp(nt / 0.4)); g.save(); g.translate((1 - u) * w * 0.9, 0); g.shadowColor = 'rgba(2,4,9,.3)'; g.shadowBlur = 14 * zn(); g.shadowOffsetY = 6 * zn(); g.fillStyle = '#FBE9E6'; rr(g, x0 + 24, y0 + 520, w - 48, 150, 12); g.fill(); g.shadowColor = 'transparent';
        g.strokeStyle = theme.badInk; g.lineWidth = 4; rr(g, x0 + 24, y0 + 520, w - 48, 150, 12); g.stroke(); txt(g, p.newText[0], 0, y0 + 595, F.cap(44), theme.badInk); g.restore(); }
      txt(g, p.src, 0, y0 + h - 34, F.mono(18), theme.inkSoft);
      g.restore();
      const st = t - p.stampAt; if (st > 0) { const k2 = ease.expo(clamp(st / 0.2)), sc = 1 + 1.3 * (1 - k2) - 0.05 * wobble(st - 0.2, 6, 9), sf = F.hero(84), sw = mw(p.stamp, sf) + 80; g.save(); g.translate(0, y0 + h * 0.8); g.rotate(-0.1); g.scale(sc, sc); g.globalAlpha = clamp(st / 0.06) * 0.97;
        g.fillStyle = 'rgba(245,243,238,.9)'; rr(g, -sw / 2, -70, sw, 140, 14); g.fill(); g.strokeStyle = theme.badInk; g.lineWidth = 10; rr(g, -sw / 2 + 8, -62, sw - 16, 124, 10); g.stroke(); txt(g, p.stamp, 0, 4, sf, theme.badInk); g.restore(); burst(g, 0, y0 + h * 0.8, sw * 0.55, theme.bad, st - 0.16, 16, 0.45); }
    },
  });

  // ---------- datecal: 1992 calendar. FEB 15 page tears off, MAR 10 underneath, ticks, NO BROKEN RULE PROVEN ----------
  B.register('datecal', {
    defaults: { w: 640, h: 760, tearAt: 99999, tick1At: 99999, tick2At: 99999, provedAt: 99999, proved: 'NO BROKEN RULE PROVEN', src: 'PER UPI · WASHINGTON POST, 1992' },
    size: p => [p.w, p.h], anchors: p => ({ date: [0, -20, p.w * 0.9, 330], proved: [0, p.h / 2 - 110, p.w * 0.94, 120], head: [0, -p.h / 2 + 60, p.w, 120] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 24, { lift });
      g.save(); rr(g, x0, y0, w, h, 24); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 130); g.restore();
      txt(g, '1992', 0, y0 + 68, F.hero(92), theme.paper); for (let i = 0; i < 5; i++) { g.fillStyle = theme.ink; g.beginPath(); g.arc(x0 + 90 + i * (w - 180) / 4, y0 + 8, 11, 0, 7); g.fill(); }
      const page = (mon, day, lab, ty, tt) => { txt(g, mon, 0, y0 + 205, F.monoX(58), theme.inkSoft); txt(g, day, 0, y0 + 360, F.hero(280), theme.ink); txt(g, lab, 0, y0 + 520, F.cap(34), theme.inkSoft);
        const k = clamp((t - tt) / 0.25); if (k > 0) { const s = spring(t - tt, 'bouncy'); g.save(); g.translate(w * 0.3, y0 + 360); g.scale(s, s); g.strokeStyle = theme.goodInk; g.lineWidth = 22; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); g.moveTo(-50, 0); g.lineTo(-12, 42); g.lineTo(58, -48); g.stroke(); g.restore(); burst(g, w * 0.3, y0 + 360, 90, theme.good, t - tt - 0.05, 10, 0.4); } };
      page('MAR', '10', 'PAYOUT DECISION', 0, p.tick2At);
      const tr = t - p.tearAt; if (tr < 0.7) { const u = tr > 0 ? ease.in(clamp(tr / 0.55)) : 0; g.save(); g.translate(x0, y0 + 130); g.rotate(u * -0.35); g.translate(-x0, -(y0 + 130)); g.translate(-u * 160, u * 900); g.globalAlpha = 1 - clamp((tr - 0.3) / 0.35);
        g.shadowColor = 'rgba(2,4,9,.3)'; g.shadowBlur = 12 * zn(); g.shadowOffsetY = 6 * zn(); g.fillStyle = theme.paper; g.fillRect(x0, y0 + 130, w, h - 130 - 10); g.shadowColor = 'transparent'; page('FEB', '15', 'THE DRAWING', 0, p.tick1At); g.restore(); }
      const pr = t - p.provedAt; if (pr > -0.01) { const r = rise(t, p.provedAt, 20); g.save(); g.globalAlpha = r.a; g.translate(0, y0 + h - 118 + r.y); marker(g, -w * 0.45, -34, w * 0.9, 70, theme.goodInk, clamp(pr / 0.3), 0.18); txt(g, p.proved, 0, 2, F.cap(38), theme.goodInk); g.restore(); }
      txt(g, p.src, 0, y0 + h - 30, F.mono(17), theme.inkSoft);
    },
  });

  // ---------- yearcal: calendar year rolls (odometer) with a place label swap. flipAt: year starts to roll ----------
  B.register('yearcal', {
    defaults: { w: 680, h: 780, from: 1992, to: 2023, flipAt: 99999, labelAt: null, dur: 1.0, a: 'VIRGINIA', b: 'TEXAS', yearsAt: 99999, years: '31 YEARS LATER' },
    size: p => [p.w, p.h], anchors: p => ({ year: [0, -80, p.w * 0.9, 250], head: [0, -p.h / 2 + 65, p.w, 130], years: [0, p.h / 2 - 140, p.w * 0.9, 110] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, ft = t - p.flipAt, u = ft < 0 ? 0 : ease.expo(clamp(ft / p.dur)), lt2 = t - (p.labelAt == null ? p.flipAt : p.labelAt); paper(g, x0, y0, w, h, 24, { lift });
      g.save(); rr(g, x0, y0, w, h, 24); g.clip(); g.fillStyle = B.mix(theme.navy, theme.badInk, clamp(lt2 / 0.5)); g.fillRect(x0, y0, w, 130); g.restore();
      const sw = clamp(lt2 / 0.35); g.save(); g.beginPath(); g.rect(x0, y0 + 10, w, 120); g.clip(); txt(g, p.a, 0, y0 + 68 - sw * 120, F.hero(80), theme.paper); txt(g, p.b, 0, y0 + 68 + (1 - sw) * 120, F.hero(80), theme.paper); g.restore();
      for (let i = 0; i < 5; i++) { g.fillStyle = theme.ink; g.beginPath(); g.arc(x0 + 90 + i * (w - 180) / 4, y0 + 8, 11, 0, 7); g.fill(); }
      const v = lerp(p.from, p.to, u), yr = Math.round(v), moving = ft > 0 && ft < p.dur * 0.8, s = 1 + (ft > p.dur ? 0.1 * (1 - spring(ft - p.dur, { f: 2.4, z: 0.42 })) : 0);
      g.save(); g.translate(0, y0 + 300); g.scale(s, s);
      if (moving) { g.globalAlpha = 0.35; txt(g, String(yr - 7), 0, -70, F.hero(240), theme.ink); txt(g, String(yr + 7), 0, 70, F.hero(240), theme.ink); g.globalAlpha = 1; }
      txt(g, String(yr), 0, 0, F.hero(240), ft > p.dur * 0.8 ? theme.badInk : theme.ink); g.restore(); burst(g, 0, y0 + 300, 300, theme.bad, ft - p.dur, 18, 0.55);
      g.fillStyle = theme.paperShade; for (let r = 0; r < 4; r++) for (let c = 0; c < 7; c++) { rr(g, x0 + 62 + c * 83, y0 + 470 + r * 46, 62, 30, 8); g.fill(); }
      const yt = t - p.yearsAt; if (yt > -0.01) { const r = rise(t, p.yearsAt, 20); g.save(); g.globalAlpha = r.a; g.translate(0, y0 + h - 70 + r.y); marker(g, -w * 0.4, -34, w * 0.8, 68, theme.badInk, clamp(yt / 0.3), 0.2); txt(g, p.years, 0, 2, F.cap(40), theme.badInk); g.restore(); }
    },
  });

  // ---------- paystamp: PAY / DON'T PAY stamp hovering and wobbling; slams to PAID ✓ on slamAt; lifts back on liftAt ----------
  B.register('paystamp', {
    defaults: { slamAt: 99999, liftAt: 99999, w: 540, h: 250 }, ownEnter: true,
    size: p => [p.w, p.h + 140], anchors: p => ({ face: [0, 60, p.w, p.h] }),
    draw(g, p, env) {
      const { t, lt, theme } = env, w = p.w, h = p.h, sl = t - p.slamAt, li = t - p.liftAt, slammed = sl > 0 && li < 0;
      let dy = Math.sin(t * 2.3) * 10, rot = Math.sin(t * 1.7) * 0.05; if (slammed) { const k = ease.in(clamp(sl / 0.14)); dy = lerp(dy, 120, k); rot = lerp(rot, -0.04, k); } else if (li > 0 && li < 0.6) { const k = ease.out(clamp(li / 0.5)); dy = lerp(120, Math.sin(t * 2.3) * 10, k); rot = lerp(-0.04, Math.sin(t * 1.7) * 0.05, k); }
      const sc = lt < 0.4 ? 0.6 + 0.4 * spring(lt, 'bouncy') : 1; g.save(); g.translate(0, dy); g.rotate(rot); g.scale(sc, sc);
      clay(g, -34, -h / 2 - 110, 68, 68, 34, theme.ink, { lift: 0.3 }); clay(g, -16, -h / 2 - 50, 32, 60, 8, theme.gold, { lift: 0.2 });
      const res = slammed || (li > 0 && li < 0.15 ? 0 : 0) ? 1 : 0, col = res ? theme.goodInk : theme.ink; paper(g, -w / 2, -h / 2, w, h, 20, { lift: 0.5 }); g.strokeStyle = res ? theme.goodInk : theme.badInk; g.lineWidth = 9; rr(g, -w / 2 + 14, -h / 2 + 14, w - 28, h - 28, 12); g.stroke();
      if (res) { txt(g, 'PAID', -34, 6, F.hero(130), col); g.strokeStyle = theme.goodInk; g.lineWidth = 20; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); g.moveTo(w * 0.22 - 0, 8); g.lineTo(w * 0.22 + 30, 46); g.lineTo(w * 0.22 + 88, -30); g.stroke(); }
      else { txt(g, 'PAY', 0, -h * 0.2, F.hero(88), theme.goodInk); txt(g, "DON'T PAY", 0, h * 0.2, F.hero(88), theme.badInk); g.fillStyle = theme.inkSoft; g.fillRect(-w * 0.35, -4, w * 0.7, 5); }
      g.restore(); if (sl > 0 && li < 0) burst(g, 0, 120, w * 0.6, theme.good, sl - 0.1, 18, 0.5);
    },
  });

  // ---------- chequefan: 20 small cheques fan out one by one with ticks; amount text above ----------
  B.register('chequefan', {
    defaults: { n: 20, at: 99999, per: 0.045, w: 900, h: 860, valAt: 99999, yearAt: 99999, nAt: 99999, val: '≈ $1.3M', sub: 'A YEAR', times: '× 20 YEARS', src: 'PER VIRGINIAN-PILOT, 1997' }, ownEnter: true,
    size: p => [p.w, p.h], anchors: p => ({ value: [0, -p.h / 2 + 130, p.w * 0.9, 190], fan: [0, 120, p.w, 560], times: [0, -p.h / 2 + 330, p.w * 0.8, 90] }),
    draw(g, p, env) {
      const { t, theme } = env, w = p.w, h = p.h, y0 = -h / 2; let landed = 0;
      for (let i = 0; i < p.n; i++) { const ti = p.at + i * p.per, o = t - ti; if (o <= 0) continue; landed++; const k = spring(o, 'snappy'), f = i / (p.n - 1), ang = lerp(-0.85, 0.85, f), R = 520;
        g.save(); g.translate(0, y0 + 760); g.rotate(ang * k); g.translate(0, -R); const cw = 300, ch = 130; g.globalAlpha = clamp(o / 0.08);
        g.shadowColor = 'rgba(2,4,9,.4)'; g.shadowBlur = 12 * zn(); g.shadowOffsetY = 6 * zn(); g.fillStyle = theme.paper; rr(g, -cw / 2, -ch / 2, cw, ch, 12); g.fill(); g.shadowColor = 'transparent';
        g.strokeStyle = theme.rule; g.lineWidth = 3; rr(g, -cw / 2 + 8, -ch / 2 + 8, cw - 16, ch - 16, 8); g.stroke(); g.fillStyle = theme.paperShade; rr(g, -cw / 2 + 24, -8, cw * 0.5, 14, 7); g.fill(); rr(g, -cw / 2 + 24, 18, cw * 0.32, 14, 7); g.fill();
        txt(g, '≈ $1.3M', cw / 2 - 28, -26, F.monoX(20), theme.goodInk, 'right');
        const tk = clamp((o - 0.1) / 0.2); if (tk > 0) { g.strokeStyle = theme.goodInk; g.lineWidth = 8; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); g.moveTo(cw / 2 - 90, 20); g.lineTo(cw / 2 - 72, 38); g.lineTo(cw / 2 - 40, 0); g.stroke(); } g.restore(); }
      paper(g, -w * 0.46, y0 + 20, w * 0.92, 330, 24, { lift: env.lift });
      const vr = t - p.valAt; if (vr > -0.01) { const k = spring(Math.max(0, vr), { f: 2.4, z: 0.5 }); g.save(); g.translate(0, y0 + 130); g.scale(0.7 + 0.3 * k, 0.7 + 0.3 * k); g.globalAlpha = clamp(vr / 0.1); txt(g, p.val, 0, 0, F.hero(172), theme.goodInk); g.restore(); burst(g, 0, y0 + 130, 260, theme.good, vr - 0.05, 16, 0.5); }
      const yr = t - p.yearAt; if (yr > -0.01) { const r = rise(t, p.yearAt, 18); g.save(); g.globalAlpha = r.a; txt(g, p.sub, -w * 0.12 - 40, y0 + 250 + r.y, F.cap(46), theme.ink); g.restore(); }
      const nr = t - p.nAt; if (nr > -0.01) { const r = rise(t, p.nAt, 18); g.save(); g.globalAlpha = r.a; txt(g, p.times, w * 0.14, y0 + 250 + r.y, F.cap(46), theme.badInk); g.restore(); }
      txt(g, p.src, 0, y0 + 332, F.mono(18), theme.inkSoft);
    },
  });

  // ---------- sign: office sign "TEXAS / LOTTERY COMMISSION" swings on two chains, unhooks, drops; SHUT DOWN tag flips on ----------
  B.register('sign', {
    defaults: { dropAt: 99999, tagAt: 99999, fall: 520, src: 'PER KUT · HOUSTON CHRONICLE', w: 760 }, ownEnter: true,
    size: p => [p.w, 640], anchors: p => ({ board: [0, 40 + 0, p.w, 260], tag: [0, 120, 560, 150] }),
    draw(g, p, env) {
      const { t, lt, theme } = env, w = p.w, dt = t - p.dropAt, dropped = dt > 0, bw = 700, bh = 240; let bx = 0, by = 20, rot = Math.sin(t * 2.4) * 0.05 * (dropped ? 0 : 1);
      const k0 = spring(lt, 'snappy'); if (!dropped) rot += 0.16 * wobble(lt, 2.1, 1.2) * 0; else { const f = ease.in(clamp(dt / 0.55)); by += f * p.fall; rot = lerp(rot, 0.42, clamp(dt / 0.3)) + (dt > 0.55 ? lerp(0.42, 0.06, ease.out(clamp((dt - 0.55) / 0.35))) - 0.42 : 0) + 0.03 * wobble(dt - 0.55, 5, 7); }
      // bracket + chains
      clay(g, -w / 2, -300, w, 46, 14, '#59606B', { shadowK: 0.5 }); g.strokeStyle = '#59606B'; g.lineWidth = 9; g.lineCap = 'round';
      if (!dropped) for (const sx of [-290, 290]) { g.beginPath(); g.moveTo(sx, -254); g.lineTo(sx * Math.cos(rot) - (by - 120) * Math.sin(rot) * 0, -90); g.stroke(); }
      else for (const sx of [-290, 290]) { g.beginPath(); g.moveTo(sx, -254); g.lineTo(sx + Math.sin(dt * 9) * 6, -254 + Math.min(110, dt * 400)); g.stroke(); }
      g.save(); g.translate(0, -100); g.rotate(rot); g.translate(0, by + 100); g.globalAlpha = clamp(lt / 0.1);
      B.shadowed(g, () => rr(g, -bw / 2, -bh / 2, bw, bh, 18), theme.navy, 0.6); g.strokeStyle = theme.paper; g.lineWidth = 5; rr(g, -bw / 2 + 12, -bh / 2 + 12, bw - 24, bh - 24, 10); g.stroke();
      txt(g, 'TEXAS', 0, -62, F.monoX(34), theme.gold); txt(g, 'LOTTERY COMMISSION', 0, 20, F.hero(76), theme.paper); txt(g, 'ILLUSTRATION', bw / 2 - 28, bh / 2 - 26, F.mono(16), 'rgba(245,243,238,.6)', 'right');
      g.restore();
      const tg = t - p.tagAt; if (tg > 0) { const f = ease.out(clamp(tg / 0.35)), sc = Math.abs(Math.cos((1 - f) * Math.PI / 2)); g.save(); g.translate(0, by + 150 + 30); g.rotate(-0.07); g.scale(1, 0.1 + 0.9 * f); g.shadowColor = 'rgba(2,4,9,.4)'; g.shadowBlur = 14 * zn(); g.shadowOffsetY = 8 * zn(); g.fillStyle = theme.paper; rr(g, -270, -56, 540, 112, 14); g.fill(); g.shadowColor = 'transparent'; g.strokeStyle = theme.badInk; g.lineWidth = 8; rr(g, -262, -48, 524, 96, 10); g.stroke(); txt(g, 'SHUT DOWN', 0, 4, F.hero(80), theme.badInk); g.restore(); burst(g, 0, by + 180, 330, theme.bad, tg - 0.2, 18, 0.5); }
      const sr = t - p.tagAt; if (sr > 0.2) { g.save(); g.globalAlpha = clamp((sr - 0.2) / 0.3); txt(g, p.src, 0, by + 262, F.mono(20), 'rgba(245,243,238,.8)'); g.restore(); }
    },
  });

  // ---------- glass: paper magnifier that sweeps across a world area (from -> to) ----------
  B.register('glass', {
    defaults: { from: [-300, 0], to: [300, 0], dur: 1.2, r: 90, at: 0 }, size: () => [10, 10],
    draw(g, p, env) {
      const lt = env.t - p.at, u = ease.inOut(clamp(lt / p.dur)), x = lerp(p.from[0], p.to[0], u), y = lerp(p.from[1], p.to[1], u) + Math.sin(u * Math.PI * 3) * 24, th = env.theme, r = p.r;
      g.save(); g.translate(x, y); g.rotate(-0.3); g.shadowColor = 'rgba(2,4,9,.4)'; g.shadowBlur = 16 * zn(); g.shadowOffsetY = 10 * zn(); g.fillStyle = 'rgba(245,243,238,.18)'; g.beginPath(); g.arc(0, 0, r, 0, 7); g.fill(); g.shadowColor = 'transparent';
      g.strokeStyle = th.gold; g.lineWidth = r * 0.24; g.beginPath(); g.arc(0, 0, r, 0, 7); g.stroke(); g.strokeStyle = 'rgba(255,255,255,.55)'; g.lineWidth = r * 0.09; g.beginPath(); g.arc(0, 0, r * 0.68, 3.5, 4.7); g.stroke();
      g.strokeStyle = th.ink; g.lineWidth = r * 0.3; g.lineCap = 'round'; g.beginPath(); g.moveTo(r * 0.72, r * 0.72); g.lineTo(r * 1.55, r * 1.62); g.stroke(); g.restore();
    },
  });

  // ---------- hook: frame-0 slam card. PART 2 stamp + the full hook text, visible from the first frame (thumps at lt 0) ----------
  B.register('hook', {
    defaults: { stamp: 'PART 2', lines: [[['5,000,000+ ', 'gold'], ['TICKETS', 'paper']], [['THEY WON', 'good']]], size: 112, sub: '' }, ownEnter: true,
    size: p => [980, 190 + p.lines.length * p.size * 1.08],
    anchors: p => { const hh = 190 + p.lines.length * p.size * 1.08; return { stamp: [0, -hh / 2 + 80, 560, 170], lines: [0, 95, 980, p.lines.length * p.size * 1.1], l1: [0, -hh / 2 + 190 + p.size * 0.55, 980, p.size * 1.1], l2: [0, -hh / 2 + 190 + p.size * 1.6, 980, p.size * 1.1] }; },
    draw(g, p, env) {
      const { lt, theme } = env, hh = 190 + p.lines.length * p.size * 1.08, k0 = hit(lt, 7), s = 1 + 0.16 * k0; g.save(); g.scale(s, s); g.rotate(-0.02 * k0);
      g.save(); g.translate(0, -hh / 2 + 80); g.rotate(-0.045); const sf = F.hero(104), sw = mw(p.stamp, sf) + 90; paper(g, -sw / 2, -70, sw, 140, 18, { lift: 0.5, fill: theme.paper }); g.strokeStyle = theme.badInk; g.lineWidth = 9; rr(g, -sw / 2 + 12, -58, sw - 24, 116, 12); g.stroke(); txt(g, p.stamp, 0, 6, sf, theme.badInk); g.restore();
      p.lines.forEach((segs, li) => { const f = F.hero(p.size), tw = segs.reduce((a, sg) => a + mw(sg[0], f), 0), y = -hh / 2 + 190 + (li + 0.55) * p.size * 1.08; let x = -tw / 2; g.save(); g.shadowColor = 'rgba(0,0,0,.5)'; g.shadowBlur = 18 * zn(); g.shadowOffsetY = 8 * zn(); for (const [s0, tn] of segs) { txt(g, s0, x, y, f, B.tone(tn, false), 'left'); x += mw(s0, f); } g.restore(); });
      g.restore(); burst(g, 0, 0, 480, theme.bad, lt + 0.1, 20, 0.6);
    },
  });
})();

// ---- copied micro-moment recipes (heart, plane) from tucker-payday ----
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, countAt, hash, hit } = B;
  B.register('plane', {
    defaults: { dur: 1.9, from: [-420, 330], to: [440, -360], s: 2.2 }, size: () => [10, 10],
    draw(g, p, env) {
      const lt = env.lt, u = ease.out(lin(lt, 0, p.dur)), pos = k => [lerp(p.from[0], p.to[0], k), lerp(p.from[1], p.to[1], k) - Math.sin(Math.PI * k) * 150], [px, py] = pos(u), [qx, qy] = pos(Math.min(1, u + 0.02)), a = Math.atan2(qy - py, qx - px) || -0.6;
      g.save(); g.strokeStyle = rgba(env.theme.accent, 0.85); g.lineWidth = 6; g.lineCap = 'round'; g.setLineDash([2, 22]); g.beginPath(); for (let i = 0; i <= 30; i++) { const [x, y] = pos(u * i / 30); i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); g.setLineDash([]); g.restore();
      g.save(); g.translate(px, py); g.rotate(a); const s = p.s * (0.7 + 0.3 * spring(lt, 'snappy')), sh = B.zoomNow || 1; g.scale(s, s);
      g.shadowColor = 'rgba(2,4,9,.4)'; g.shadowBlur = 24; g.shadowOffsetY = 14; g.fillStyle = env.theme.paper; g.beginPath(); g.moveTo(70, 0); g.lineTo(-56, -38); g.lineTo(-30, 0); g.lineTo(-56, 38); g.closePath(); g.fill(); g.shadowColor = 'transparent';
      g.fillStyle = '#D8D3C7'; g.beginPath(); g.moveTo(70, 0); g.lineTo(-30, 0); g.lineTo(-56, 38); g.closePath(); g.fill(); g.fillStyle = 'rgba(255,255,255,.7)'; g.beginPath(); g.moveTo(70, 0); g.lineTo(-56, -38); g.lineTo(-30, -2); g.closePath(); g.fill(); g.strokeStyle = 'rgba(0,0,0,.25)'; g.lineWidth = 2; g.beginPath(); g.moveTo(70, 0); g.lineTo(-30, 0); g.stroke(); g.restore();
    },
  });
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
