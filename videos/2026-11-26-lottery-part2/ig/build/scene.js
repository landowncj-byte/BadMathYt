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
// ===== Bad Math engine v2 — CRIME-SHOW recipes (RULES 112, brand/CRIME-SHOW.md) =====
// suspect  : the con's real licensed photo in a crime-show treatment (file card + red string, quote card, picture-in-picture,
//            arrested X / stamps, jail bars, mugshot height chart, verdict) with an optional slow push-in on the face
// board    : cork evidence board, pinned photo + evidence notes, red string that pulls tight
// victim   : coloured, consistent victim character card (investors, collectors, billionaire, diner)
// datecard : date / location / chapter slate (screen layer)
// All images must sit under brand/ or videos/ (repo-relative) so a fresh clone renders.
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, burst, hit, wobble } = B;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const pop = (t, o = 'snappy') => clamp(spring(t, o), 0, 1.25);
  const RED = '#E0281E';

  // ---- photo drawn into a rect: crop = [x,y,w,h] fractions of the source (region of interest); fx,fy = focal point inside it; zoom >= 1 pushes in
  function drawPhoto(g, img, x, y, w, h, o) {
    const [cx, cy, cw, ch] = o.crop || [0, 0, 1, 1]; let sw = cw * img.width, sh = ch * img.height; const ta = w / h;
    if (sw / sh > ta) sw = sh * ta; else sh = sw / ta; const z = o.zoom || 1; sw /= z; sh /= z;
    const ccx = (cx + cw * (o.fx ?? 0.5)) * img.width, ccy = (cy + ch * (o.fy ?? 0.5)) * img.height;
    const sx = clamp(ccx - sw / 2, 0, img.width - sw), sy = clamp(ccy - sh / 2, 0, img.height - sh);
    g.drawImage(img, sx, sy, sw, sh, x, y, w, h);
  }
  function bigX(g, cx, cy, r, col, u, lw) { g.save(); g.strokeStyle = col; g.lineWidth = lw; g.lineCap = 'round'; const a = clamp(u * 2), b2 = clamp(u * 2 - 1); g.beginPath(); g.moveTo(cx - r, cy - r); g.lineTo(cx - r + 2 * r * a, cy - r + 2 * r * a); g.stroke(); if (b2 > 0) { g.beginPath(); g.moveTo(cx + r, cy - r); g.lineTo(cx + r - 2 * r * b2, cy - r + 2 * r * b2); g.stroke(); } g.restore(); }
  const imgOf = src => { const im = B.images && B.images[src]; if (!im) throw new Error('crime: image not preloaded: ' + src); return im; };
  B.drawPhoto = drawPhoto;

  function stamp(g, th, t, s) { // s: {text, at, tone, size, rot, x, y}
    const k = t - s.at; if (k < 0) return; const size = s.size || 70, f = F.hero(size), w = mw(s.text, f) + size * 0.8, h = size * 1.4, col = B.tone(s.tone || 'bad', true);
    const sc = 1 + 1.1 * (1 - ease.expo(clamp(k / 0.2))) - 0.05 * wobble(k - 0.2, 5, 9);
    g.save(); g.globalAlpha = clamp(k / 0.05); g.translate(s.x || 0, s.y || 0); g.rotate(s.rot ?? -0.1); g.scale(sc, sc);
    g.fillStyle = 'rgba(245,243,238,.92)'; rr(g, -w / 2, -h / 2, w, h, size * 0.14); g.fill(); g.strokeStyle = col; g.lineWidth = size * 0.09; rr(g, -w / 2 + size * 0.06, -h / 2 + size * 0.06, w - size * 0.12, h - size * 0.12, size * 0.1); g.stroke();
    txt(g, s.text, 0, size * 0.05, f, col); g.restore(); burst(g, s.x || 0, s.y || 0, w * 0.5, col, k - 0.12, 14, 0.45);
  }
  B.crimeStamp = stamp;

  function crown(g, th, t, c, cx, cy, scale) { // c: {at, off, re}; sits at (cx, cy) = top-centre of photo
    const kd = dd => 1 - spring(Math.max(0, dd), { f: 2.5, z: 0.5 }); let y = 0, x = 0, rot = 0, a = 1;
    if (c.re != null && t >= c.re) { y = kd(t - c.re) * -60; a = clamp((t - c.re) / 0.05); }
    else if (c.off != null && t >= c.off) { const u = lin(t, c.off, c.off + 0.8), e = ease.out(u); x = 320 * e; rot = 1.1 * e; y = 380 * ease.in(clamp(u * 1.15)); a = 1 - clamp((t - c.off - 1.2) / 0.25); }
    else y = (t - c.at) < 1.2 ? kd(t - c.at) * -60 : 0;
    if (t < c.at || a < 0.01) return; g.save(); g.globalAlpha *= a * clamp((t - c.at) / 0.05 + (c.re != null && t >= c.re ? 1 : 0)); g.translate(cx + x, cy + y); g.rotate(rot); g.scale(scale, scale);
    const path = () => { g.beginPath(); g.moveTo(-112, 0); g.lineTo(-118, -112); g.lineTo(-58, -58); g.lineTo(0, -138); g.lineTo(58, -58); g.lineTo(118, -112); g.lineTo(112, 0); g.closePath(); };
    B.shadowed(g, path, th.gold, 0.3); g.save(); path(); g.clip(); const lg = g.createLinearGradient(0, -140, 0, 0); lg.addColorStop(0, 'rgba(255,255,255,.35)'); lg.addColorStop(0.5, 'rgba(255,255,255,0)'); lg.addColorStop(1, 'rgba(0,0,0,.25)'); g.fillStyle = lg; g.fillRect(-130, -150, 260, 160); g.restore();
    g.fillStyle = th.gold; for (const [qx, qy] of [[-118, -116], [0, -142], [118, -116]]) { g.beginPath(); g.arc(qx, qy, 13, 0, 7); g.fill(); g.strokeStyle = 'rgba(0,0,0,.25)'; g.lineWidth = 3; g.stroke(); } g.restore();
  }

  function pin(g, x, y, r = 13) { g.save(); g.fillStyle = 'rgba(2,4,9,.4)'; g.beginPath(); g.ellipse(x + 3, y + 6, r, r * 0.7, 0, 0, 7); g.fill(); const lg = g.createRadialGradient(x - r * 0.35, y - r * 0.4, 1, x, y, r); lg.addColorStop(0, '#ff8a80'); lg.addColorStop(1, '#b3160f'); g.fillStyle = lg; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); g.restore(); }
  function string(g, a, b, k, sag, w = 5) { if (k <= 0) return; const x = lerp(a[0], b[0], k), y = lerp(a[1], b[1], k), mx = (a[0] + x) / 2, my = (a[1] + y) / 2 + sag * Math.sin(Math.PI * Math.min(1, k)); g.save(); g.strokeStyle = 'rgba(2,4,9,.35)'; g.lineWidth = w + 2; g.lineCap = 'round'; g.beginPath(); g.moveTo(a[0] + 2, a[1] + 5); g.quadraticCurveTo(mx + 2, my + 5, x + 2, y + 5); g.stroke(); g.strokeStyle = RED; g.lineWidth = w; g.beginPath(); g.moveTo(a[0], a[1]); g.quadraticCurveTo(mx, my, x, y); g.stroke(); g.restore(); }

  // ================= suspect =================
  B.register('suspect', {
    defaults: {
      src: '', crop: [0, 0, 1, 1], fx: 0.5, fy: 0.4, w: 460, aspect: 1.05, pw: 0, variant: 'card', name: '', nick: '', credit: '', tag: '', caseNo: '', tilt: 0.0, file: false, pinned: false,
      push: null, flash: true, xmark: null, bars: null, heights: null, stamps: [], crownAt: null, crownOff: null, crownRe: null, quote: null, quoteAt: 0, quoteSize: 62, quoteSub: '', label: '', arrow: null, stringTo: null, stringAt: 0, dim: null, ring: null, mono: false,
    }, ownEnter: true,
    size(p) { const pip = p.variant === 'pip', side = p.variant === 'side', pw = side ? (p.pw || p.w * 0.46) : p.w - 44, ph = pw * p.aspect, plate = p.name ? (p.nick ? 124 : 90) : 0;
      return [p.w, 22 + ph + 22 + (pip ? (p.label ? 56 : 0) : plate ? plate + 14 : 0)]; },
    anchors(p) { const [w, h] = this.size(p), side = p.variant === 'side', pw = side ? (p.pw || p.w * 0.46) : p.w - 44, ph = pw * p.aspect, px = -w / 2 + 22, py = -h / 2 + 22;
      return { face: [px + pw / 2, py + ph * 0.42, pw * 0.8, ph * 0.62], photo: [px + pw / 2, py + ph / 2, pw, ph], name: [0, h / 2 - 22 - 60, w, 130], quote: [w * 0.22, -h * 0.1, w * 0.5, h * 0.7] }; },
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, th = theme, img = imgOf(p.src), [w, h] = this.size(p), pip = p.variant === 'pip', side = p.variant === 'side';
      const pw = side ? (p.pw || p.w * 0.46) : p.w - 44, ph = pw * p.aspect, x0 = -w / 2, y0 = -h / 2, px = x0 + 22, py = y0 + 22, k = spring(lt, 'heavy');
      g.save(); g.translate(0, (pip ? 0 : (1 - k) * 220)); g.rotate(p.tilt + (pip ? 0 : (1 - k) * -0.1)); g.globalAlpha *= clamp(lt / 0.1);
      // case-file folder behind the card
      if (p.file) { const M = th.manila || '#E2C48D', fx0 = x0 - 16, fy0 = y0 - 36, fw = w + 32, fh = h + 52; const body = () => { g.beginPath(); g.moveTo(fx0, fy0 + 36); g.lineTo(fx0 + fw * 0.12, fy0 + 36); g.lineTo(fx0 + fw * 0.17, fy0 + 6); g.lineTo(fx0 + fw * 0.52, fy0 + 6); g.lineTo(fx0 + fw * 0.57, fy0 + 36); g.lineTo(fx0 + fw, fy0 + 36); g.lineTo(fx0 + fw, fy0 + fh); g.lineTo(fx0, fy0 + fh); g.closePath(); };
        B.shadowed(g, body, M, lift); g.save(); body(); g.clip(); const lg = g.createLinearGradient(fx0, fy0, fx0 + fw * 0.7, fy0 + fh); lg.addColorStop(0, 'rgba(255,255,255,.28)'); lg.addColorStop(0.5, 'rgba(255,255,255,0)'); lg.addColorStop(1, 'rgba(80,50,10,.18)'); g.fillStyle = lg; g.fillRect(fx0, fy0, fw, fh); g.restore();
        if (p.caseNo) txt(g, p.caseNo, fx0 + fw * 0.345, fy0 + 24, F.monoX(20), '#5a4010'); }
      paper(g, x0, y0, w, h, pip ? 12 : 16, { lift, fill: p.file ? th.paper : th.paper });
      // photo
      let zoom = 1; if (p.push) zoom = 1 + (p.push.to - 1) * ease.inOut(lin(t, p.push.at, p.push.at + p.push.dur)); else zoom = 1 + 0.045 * lin(lt, 0, 6);
      g.save(); rr(g, px, py, pw, ph, 6); g.clip(); drawPhoto(g, img, px, py, pw, ph, { crop: p.crop, fx: p.fx, fy: p.fy, zoom });
      if (p.mono) { g.globalCompositeOperation = 'saturation'; g.fillStyle = '#808080'; g.fillRect(px, py, pw, ph); g.globalCompositeOperation = 'source-over'; }
      const vg = g.createLinearGradient(px, py, px + pw, py + ph); vg.addColorStop(0, 'rgba(255,255,255,.08)'); vg.addColorStop(0.55, 'rgba(255,255,255,0)'); vg.addColorStop(1, 'rgba(0,0,0,.2)'); g.fillStyle = vg; g.fillRect(px, py, pw, ph);
      // dim photo while an X / bars are shown
      if (p.xmark != null && t >= p.xmark) { g.fillStyle = 'rgba(40,0,0,' + (0.38 * clamp((t - p.xmark) / 0.2)) + ')'; g.fillRect(px, py, pw, ph); }
      // height chart: horizontal measuring lines + ticks
      if (p.heights != null && t >= p.heights) { const u = ease.out(lin(t, p.heights, p.heights + 0.5)); g.strokeStyle = 'rgba(245,243,238,.78)'; g.lineWidth = 3; for (let i = 0; i < 16; i++) { const yy = py + ph - (i + 1) * ph / 17 * u - (1 - u) * 0, big = i % 5 === 4; g.beginPath(); g.moveTo(px + pw - (big ? 150 : 70), yy); g.lineTo(px + pw, yy); g.stroke(); if (big) txt(g, String((i + 1) / 5 * 1 | 0), px + pw - 170, yy, F.mono(22), 'rgba(245,243,238,.9)', 'right'); }
        g.fillStyle = 'rgba(245,243,238,.2)'; g.fillRect(px + pw - 150, py, 2, ph); }
      // jail bars
      if (p.bars != null && t >= p.bars) { const u = ease.in(lin(t, p.bars, p.bars + 0.3)), n = 7; for (let i = 0; i < n; i++) { const bx = px + (i + 0.5) * pw / n, bh = ph * u; g.fillStyle = '#10161f'; g.fillRect(bx - 9, py, 18, bh); g.fillStyle = 'rgba(255,255,255,.22)'; g.fillRect(bx - 9, py, 5, bh); } g.fillStyle = '#10161f'; g.fillRect(px, py, pw, 14 * u); g.fillRect(px, py + ph - 14 * u, pw, 14 * u); if (t - p.bars - 0.28 > 0 && t - p.bars < 0.5) { g.fillStyle = 'rgba(255,255,255,' + 0.5 * hit(t - p.bars - 0.28, 16) + ')'; g.fillRect(px, py, pw, ph); } }
      // shutter flash on the reveal
      if (p.flash) { const f = hit(lt - 0.05, 14) * (lt > 0.05 ? 1 : 0); if (f > 0.01) { g.fillStyle = 'rgba(255,255,255,' + 0.85 * f + ')'; g.fillRect(px, py, pw, ph); } }
      // red ring around the face
      if (p.ring != null && t >= p.ring) { const u = ease.out(lin(t, p.ring, p.ring + 0.35)); g.strokeStyle = RED; g.lineWidth = 7; g.beginPath(); g.ellipse(px + pw * (side ? 0.5 : 0.5), py + ph * 0.42, pw * 0.3 * (2 - u), ph * 0.34 * (2 - u), 0, 0, 7); g.globalAlpha *= u; g.stroke(); }
      g.restore(); g.strokeStyle = 'rgba(11,15,20,.3)'; g.lineWidth = 2; rr(g, px, py, pw, ph, 6); g.stroke();
      if (p.xmark != null && t >= p.xmark) { const u = ease.out(lin(t, p.xmark, p.xmark + 0.3)); bigX(g, px + pw / 2, py + ph / 2, pw * 0.3, RED, u, pw * 0.1); }
      // plate: name + nickname
      if (!pip && p.name) { const ty = y0 + 22 + ph + 14, tw = pw + (side ? 0 : 0), ph2 = p.nick ? 124 : 90; g.fillStyle = th.navy; rr(g, px, ty, tw, ph2, 10); g.fill(); txt(g, p.name, px + tw / 2, ty + 32, F.hero(p.nameSize || (side ? 34 : 44)), th.paper);
        if (p.nick) txt(g, p.nick, px + tw / 2, ty + 74, F.monoX(side ? 17 : 22), th.gold); if (p.tag) txt(g, p.tag, px + tw / 2, ty + ph2 - 16, F.mono(15), rgba(th.paper, 0.7)); }
      if (pip && p.label) { const ty = y0 + 22 + ph + 6; g.fillStyle = RED; rr(g, px, ty, pw, 40, 8); g.fill(); txt(g, p.label, px + pw / 2, ty + 21, F.cap(22), th.paper); }
      if (p.credit) txt(g, p.credit, 0, y0 + h - 9, F.mono(12), th.inkSoft);
      // side layout: quote text on the right
      if (side && p.quote) { const qx = x0 + 22 + pw + 26, qw = w - 22 - pw - 26 - 24, on = t - p.quoteAt; if (on > -0.3) { const a = clamp((on + 0.3) / 0.25), pr = pop(on + 0.2); g.save(); g.globalAlpha *= a; g.translate((1 - pr) * 60, 0);
          if (!p.noquote) { g.fillStyle = th.gold; g.font = F.hero(190); g.textAlign = 'left'; g.textBaseline = 'middle'; g.fillText('“', qx - 4, y0 + 110); } let y = y0 + (p.noquote ? 90 : 190); const f = F.hero(p.quoteSize), lh = p.quoteSize * 1.12;
          p.quote.forEach(seg => { const lines = typeof seg === 'string' ? [[seg, 'ink']] : [seg]; for (const [s, tn] of lines) { txt(g, s, qx, y + lh / 2, f, B.tone(tn || 'ink', true), 'left'); y += lh; } });
          if (p.quoteSub) txt(g, p.quoteSub, qx, y + 22, F.mono(22), th.inkSoft, 'left'); g.restore(); } }
      for (const s of p.stamps) stamp(g, th, t, { ...s, x: s.x ?? 0, y: s.y ?? 0 });
      if (p.crownAt != null) crown(g, th, t, { at: p.crownAt, off: p.crownOff, re: p.crownRe }, px + pw / 2, py + 22, pw / 420);
      if (p.pinned || p.stringTo) { const pk = pop(lt - 0.1); pin(g, 0, y0 + 4 - (p.file ? 22 : 0), 13 * pk); if (p.stringTo) string(g, [0, y0 + 4 - (p.file ? 22 : 0)], p.stringTo, ease.out(lin(t, p.stringAt, p.stringAt + 0.6)), 40); }
      if (pip && p.arrow) { const u = ease.out(lin(t, p.arrow.at ?? 0, (p.arrow.at ?? 0) + 0.4)), [ax, ay] = p.arrow.to, sx = 0, sy = y0 + h * 0.5; if (u > 0) { g.save(); g.strokeStyle = RED; g.fillStyle = RED; g.lineWidth = 8; g.lineCap = 'round'; const ex = lerp(sx, ax, u), ey = lerp(sy, ay, u); g.beginPath(); g.moveTo(sx, sy); g.quadraticCurveTo((sx + ex) / 2, Math.min(sy, ey) - 60 * u, ex, ey); g.stroke(); const an = Math.atan2(ey - Math.min(sy, ey) + 60 * u, ex - (sx + ex) / 2); g.translate(ex, ey); g.rotate(an); g.beginPath(); g.moveTo(0, 0); g.lineTo(-30, -16); g.lineTo(-30, 16); g.closePath(); g.fill(); g.restore(); } }
      g.restore();
    },
  });

  // ================= mini icons for the board =================
  function bi(g, kind, s, th) {
    g.save(); const u = s / 100; g.scale(u, u); g.lineCap = 'round'; g.lineJoin = 'round';
    switch (kind) {
      case 'plate': g.fillStyle = '#f4f0e4'; g.beginPath(); g.roundRect(-52, -26, 104, 52, 7); g.fill(); g.strokeStyle = '#2c3e66'; g.lineWidth = 5; g.beginPath(); g.roundRect(-47, -21, 94, 42, 4); g.stroke(); g.fillStyle = '#2c3e66'; g.fillRect(-36, -14, 72, 8); txt(g, 'CD 000', 0, 10, F.monoX(22), '#0B0F14'); break;
      case 'badge': g.fillStyle = '#2c3e66'; g.beginPath(); g.moveTo(0, -48); g.lineTo(38, -34); g.lineTo(36, 8); g.quadraticCurveTo(30, 34, 0, 48); g.quadraticCurveTo(-30, 34, -36, 8); g.lineTo(-38, -34); g.closePath(); g.fill(); g.strokeStyle = th.gold; g.lineWidth = 5; g.stroke(); g.fillStyle = th.gold; g.beginPath(); g.arc(0, -4, 14, 0, 7); g.fill(); break;
      case 'cash': for (let i = 2; i >= 0; i--) { g.fillStyle = i ? '#188a56' : '#1FA366'; g.beginPath(); g.roundRect(-46 + i * 6, -22 - i * 9, 92, 44, 5); g.fill(); } g.fillStyle = '#F5F3EE'; g.beginPath(); g.arc(0, -4, 13, 0, 7); g.fill(); txt(g, '$', 0, -2, F.hero(22), '#188a56'); break;
      case 'cuffs': g.strokeStyle = '#59606B'; g.lineWidth = 9; for (const q of [-1, 1]) { g.beginPath(); g.arc(q * 28, 6, 22, 0, 7); g.stroke(); } g.setLineDash([6, 5]); g.beginPath(); g.moveTo(-8, 6); g.lineTo(8, 6); g.stroke(); g.setLineDash([]); break;
      case 'bottle': g.fillStyle = '#1d2a1f'; g.beginPath(); g.roundRect(-16, -10, 32, 62, 8); g.fill(); g.beginPath(); g.roundRect(-7, -50, 14, 46, 4); g.fill(); g.fillStyle = '#7a1b1b'; g.fillRect(-8, -52, 16, 8); g.fillStyle = '#efe6cf'; g.beginPath(); g.roundRect(-14, 6, 28, 28, 3); g.fill(); g.fillStyle = '#0B0F14'; g.fillRect(-9, 12, 18, 3); g.fillRect(-9, 19, 14, 3); break;
      case 'labels': for (let i = 2; i >= 0; i--) { g.save(); g.translate(i * 8 - 8, -i * 6 + 6); g.rotate(i * 0.07 - 0.07); g.fillStyle = i ? '#d8cfb5' : '#efe6cf'; g.beginPath(); g.roundRect(-34, -26, 68, 52, 4); g.fill(); g.restore(); } g.fillStyle = '#0B0F14'; g.fillRect(-18, -10, 34, 4); g.fillRect(-18, -2, 26, 4); g.fillRect(-18, 6, 30, 4); break;
      case 'paddle': g.fillStyle = '#8a5a2b'; g.fillRect(-5, 6, 10, 46); g.fillStyle = '#F5F3EE'; g.beginPath(); g.arc(0, -16, 34, 0, 7); g.fill(); g.strokeStyle = '#E0281E'; g.lineWidth = 5; g.stroke(); txt(g, '42', 0, -14, F.hero(34), '#0B0F14'); break;
      case 'cheque': g.fillStyle = '#F5F3EE'; g.beginPath(); g.roundRect(-52, -28, 104, 56, 5); g.fill(); g.strokeStyle = '#59606B'; g.lineWidth = 3; g.beginPath(); g.moveTo(-40, 8); g.lineTo(20, 8); g.stroke(); g.fillStyle = '#188a56'; g.fillRect(-46, -22, 30, 8); txt(g, '$', 34, 8, F.hero(30), '#188a56'); break;
      case 'gavel': g.save(); g.rotate(-0.5); g.fillStyle = '#6b4423'; g.beginPath(); g.roundRect(-34, -30, 68, 30, 6); g.fill(); g.fillRect(-5, -2, 10, 60); g.restore(); g.fillStyle = '#2b2f36'; g.beginPath(); g.roundRect(-46, 36, 92, 14, 5); g.fill(); break;
      case 'crown': g.fillStyle = th.gold; g.beginPath(); g.moveTo(-44, 24); g.lineTo(-50, -26); g.lineTo(-22, -4); g.lineTo(0, -40); g.lineTo(22, -4); g.lineTo(50, -26); g.lineTo(44, 24); g.closePath(); g.fill(); break;
      case 'fork': g.strokeStyle = '#59606B'; g.lineWidth = 7; g.beginPath(); g.moveTo(0, 50); g.lineTo(0, -4); for (const q of [-14, 0, 14]) { g.moveTo(q, -4); g.lineTo(q, -44); } g.moveTo(-14, -4); g.lineTo(14, -4); g.stroke(); break;
    }
    g.restore();
  }
  B.crimeIcon = bi;

  // ================= board =================
  B.register('board', {
    defaults: { w: 980, h: 1140, title: 'EVIDENCE BOARD', caseNo: '', items: [], strings: [], tightAt: 99999 }, size: p => [p.w, p.h],
    anchors: p => Object.fromEntries(p.items.map((it, i) => [it.id || ('i' + i), [it.x, it.y, it.w, it.h || it.w]])),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, th = theme, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2;
      B.shadowed(g, () => rr(g, x0, y0, w, h, 22), '#5a3a1e', lift);
      g.save(); rr(g, x0, y0, w, h, 22); g.clip(); const lg = g.createLinearGradient(x0, y0, x0 + w, y0 + h); lg.addColorStop(0, '#b98650'); lg.addColorStop(1, '#8c5f33'); g.fillStyle = lg; g.fillRect(x0, y0, w, h);
      for (let i = 0; i < 320; i++) { g.fillStyle = 'rgba(' + (B.hash(i * 3.1) > 0.5 ? '60,35,10' : '230,190,130') + ',' + (0.06 + 0.1 * B.hash(i * 7.7)) + ')'; g.beginPath(); g.arc(x0 + B.hash(i * 1.3) * w, y0 + B.hash(i * 2.9) * h, 2 + 5 * B.hash(i * 5.1), 0, 7); g.fill(); } g.restore();
      g.strokeStyle = '#4a2f17'; g.lineWidth = 16; rr(g, x0, y0, w, h, 22); g.stroke(); g.strokeStyle = 'rgba(255,255,255,.12)'; g.lineWidth = 3; rr(g, x0 + 9, y0 + 9, w - 18, h - 18, 16); g.stroke();
      // title strip
      g.fillStyle = th.paper; rr(g, -270, y0 - 6, 540, 64, 10); g.fill(); txt(g, p.title, 0, y0 + 27, F.hero(36), th.ink); if (p.caseNo) txt(g, p.caseNo, 0, y0 + 50, F.mono(14), th.inkSoft);
      const pins = []; const tight = ease.out(lin(t, p.tightAt, p.tightAt + 0.5));
      p.items.forEach((it, i) => { const at = it.at ?? -1, on = t - at; pins[i] = [it.x, it.y - (it.h || it.w) / 2 + 10]; if (on < 0) return; const k = pop(on, 'bouncy'), rot = (it.rot || 0) + (1 - k) * 0.25, iw = it.w, ih = it.h || it.w;
        g.save(); g.translate(it.x, it.y); g.rotate(rot); g.scale(0.55 + 0.45 * k, 0.55 + 0.45 * k); g.globalAlpha = clamp(on / 0.08);
        paper(g, -iw / 2, -ih / 2, iw, ih, 10, { lift: 0.2, fill: it.k === 'photo' ? '#EDE7D8' : (it.fill || th.paper) });
        if (it.k === 'photo') { const pw = iw - 24, ph = ih - (it.name ? 66 : 24); g.save(); rr(g, -iw / 2 + 12, -ih / 2 + 12, pw, ph, 4); g.clip(); drawPhoto(g, imgOf(it.src), -iw / 2 + 12, -ih / 2 + 12, pw, ph, { crop: it.crop, fx: it.fx, fy: it.fy, zoom: 1 + (it.push ? it.push * ease.out(lin(on, 0, 3)) : 0) }); g.restore();
          if (it.xmark != null && t >= it.xmark) { const u = ease.out(lin(t, it.xmark, it.xmark + 0.3)); bigX(g, 0, -ih / 2 + 12 + ph / 2, pw * 0.28, RED, u, pw * 0.09); }
          if (it.name) { g.fillStyle = th.navy; rr(g, -iw / 2 + 12, ih / 2 - 52, iw - 24, 40, 6); g.fill(); txt(g, it.name, 0, ih / 2 - 31, F.hero(it.nameSize || 28), th.paper); } }
        else { // note: icon on top, text lines below
          if (it.icon) { g.save(); g.translate(0, -ih / 2 + (it.iconY ?? 62)); bi(g, it.icon, it.iconS || 96, th); g.restore(); }
          const ls = it.lines || []; let y = ih / 2 - 24 - (ls.length - 1) * ((it.size || 38) * 1.05) - (it.size || 38) * 0.5;
          ls.forEach(l => { const [s, tn, sz] = typeof l === 'string' ? [l, 'ink'] : l; txt(g, s, 0, y, F.hero(sz || it.size || 38), B.tone(tn || 'ink', true)); y += (sz || it.size || 38) * 1.05; });
          if (it.stamp && t >= it.stamp.at) { g.save(); g.translate(0, it.stamp.y ?? 0); stamp(g, th, t, { text: it.stamp.text, at: it.stamp.at, tone: it.stamp.tone, size: it.stamp.size || 34, rot: it.stamp.rot ?? -0.12 }); g.restore(); } }
        g.restore(); });
      for (const [a, b, sat] of p.strings) { if (!pins[a] || !pins[b]) continue; const ia = p.items[a], ib = p.items[b]; if (t < Math.max(ia.at ?? -1, ib.at ?? -1)) continue; string(g, pins[a], pins[b], ease.out(lin(t, sat, sat + 0.45)), lerp(34, 3, tight)); }
      p.items.forEach((it, i) => { if (t - (it.at ?? -1) > 0.05) pin(g, pins[i][0], pins[i][1], 11 * pop(t - (it.at ?? -1) - 0.05)); });
    },
  });

  // ================= victim =================
  B.register('victim', {
    defaults: { kind: 'investor', label: 'THE INVESTORS', sub: '', w: 400, h: 500, reactAt: 99999, tape: 'VICTIMS', suit: '#1FA366' }, size: p => [p.w, p.h],
    anchors: p => ({ face: [0, -p.h * 0.12, p.w * 0.6, p.h * 0.45], label: [0, p.h / 2 - 70, p.w, 120] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, th = theme, w = p.w, h = p.h, k = spring(lt, 'heavy'), shock = clamp((t - p.reactAt) / 0.12), by = h / 2 - 150;
      g.save(); g.translate(0, (1 - k) * 200); g.rotate((1 - k) * 0.08); g.globalAlpha *= clamp(lt / 0.1);
      paper(g, -w / 2, -h / 2, w, h, 20, { lift }); g.save(); rr(g, -w / 2 + 18, -h / 2 + 18, w - 36, h - 160, 12); g.clip(); const bg = g.createLinearGradient(0, -h / 2, 0, h / 2); bg.addColorStop(0, '#CFE8DA'); bg.addColorStop(1, '#9FD0B6'); g.fillStyle = bg; g.fillRect(-w / 2, -h / 2, w, h);
      const sw = 1 + 0.03 * Math.sin(t * 2.2); // body
      g.fillStyle = p.suit; g.beginPath(); g.moveTo(-w * 0.34, by + 90); g.quadraticCurveTo(-w * 0.34, by - 30, 0, by - 40); g.quadraticCurveTo(w * 0.34, by - 30, w * 0.34, by + 90); g.closePath(); g.fill(); g.fillStyle = 'rgba(0,0,0,.14)'; g.beginPath(); g.moveTo(0, by - 40); g.quadraticCurveTo(w * 0.34, by - 30, w * 0.34, by + 90); g.lineTo(0, by + 90); g.closePath(); g.fill();
      g.fillStyle = '#F5F3EE'; g.beginPath(); g.moveTo(-26, by - 36); g.lineTo(0, by + 14); g.lineTo(26, by - 36); g.closePath(); g.fill(); g.fillStyle = '#E0281E'; g.beginPath(); g.moveTo(-8, by - 14); g.lineTo(8, by - 14); g.lineTo(5, by + 36); g.lineTo(0, by + 44); g.lineTo(-5, by + 36); g.closePath(); g.fill();
      const hy = by - 100 + (shock * -8); g.fillStyle = '#E8C9A0'; g.beginPath(); g.arc(0, hy, 56, 0, 7); g.fill(); g.fillStyle = 'rgba(224,120,100,.45)'; g.beginPath(); g.arc(-34, hy + 14, 10, 0, 7); g.arc(34, hy + 14, 10, 0, 7); g.fill();
      const ey = hy - 6 - shock * 3; g.fillStyle = '#fff'; for (const q of [-1, 1]) { g.beginPath(); g.arc(q * 20, ey, 11 + shock * 3, 0, 7); g.fill(); } g.fillStyle = '#0B0F14'; for (const q of [-1, 1]) { g.beginPath(); g.arc(q * 20, ey + 1, 5 - shock * 1.5, 0, 7); g.fill(); }
      g.strokeStyle = '#5a3f08'; g.lineWidth = 5; g.lineCap = 'round'; for (const q of [-1, 1]) { g.beginPath(); g.moveTo(q * 8, ey - 20 - shock * 8); g.lineTo(q * 32, ey - 22 - shock * 12 + (1 - shock) * 4); g.stroke(); }
      g.fillStyle = '#7a2b25'; g.beginPath(); if (shock > 0.2) g.ellipse(0, hy + 32, 9, 12 * shock, 0, 0, 7); else { g.arc(0, hy + 30, 14, 0.2, Math.PI - 0.2); } g.fill();
      if (p.kind === 'investor') { g.fillStyle = '#6b4423'; g.beginPath(); g.roundRect(w * 0.12, by + 34, 98, 68, 8); g.fill(); g.strokeStyle = '#4a2f17'; g.lineWidth = 6; g.beginPath(); g.arc(w * 0.12 + 49, by + 34, 20, Math.PI, 0); g.stroke(); g.fillStyle = th.gold; g.fillRect(w * 0.12 + 42, by + 62, 14, 12); }
      if (p.kind === 'collector') { g.fillStyle = '#16202e'; g.beginPath(); g.ellipse(0, hy - 54, 68, 12, 0, 0, 7); g.fill(); g.beginPath(); g.roundRect(-40, hy - 112, 80, 62, 8); g.fill(); g.fillStyle = th.gold; g.fillRect(-40, hy - 66, 80, 10);
        g.strokeStyle = th.gold; g.lineWidth = 5; g.beginPath(); g.arc(20, ey, 17, 0, 7); g.stroke(); g.beginPath(); g.moveTo(32, ey + 12); g.lineTo(44, by + 20); g.stroke(); bi(g, 'paddle', 150, th); }
      if (p.kind === 'billionaire') { g.fillStyle = '#0B0F14'; g.beginPath(); g.roundRect(-46, ey - 12, 40, 22, 6); g.roundRect(6, ey - 12, 40, 22, 6); g.fill(); g.fillRect(-8, ey - 6, 16, 5); g.save(); g.translate(w * 0.2, by + 52); g.rotate(-0.2); bi(g, 'cheque', 120, th); g.restore(); }
      if (p.kind === 'winemaker') { g.fillStyle = '#8a5a2b'; g.beginPath(); g.moveTo(-40, by - 34); g.lineTo(40, by - 34); g.lineTo(54, by + 90); g.lineTo(-54, by + 90); g.closePath(); g.fill(); g.fillStyle = '#16202e'; g.beginPath(); g.ellipse(0, hy - 52, 62, 10, 0, 0, 7); g.fill(); g.beginPath(); g.arc(0, hy - 56, 40, Math.PI, 0); g.fill(); g.save(); g.translate(w * 0.27, by + 36); g.rotate(0.15); bi(g, 'bottle', 120, th); g.restore(); }
      if (p.kind === 'diner') { g.fillStyle = '#F5F3EE'; g.beginPath(); g.moveTo(-40, by - 34); g.lineTo(40, by - 34); g.lineTo(52, by + 70); g.lineTo(-52, by + 70); g.closePath(); g.fill(); g.strokeStyle = '#E0281E'; g.lineWidth = 4; g.beginPath(); g.moveTo(-34, by + 6); g.lineTo(34, by + 6); g.moveTo(-40, by + 30); g.lineTo(40, by + 30); g.stroke(); g.save(); g.translate(w * 0.26, by + 30); g.rotate(0.25); bi(g, 'fork', 100, th); g.restore(); }
      g.restore();
      g.fillStyle = '#188a56'; rr(g, -w / 2 + 18, h / 2 - 130, w - 36, 110, 10); g.fill(); txt(g, p.label, 0, h / 2 - 92, F.hero(p.labelSize || 44), th.paper); if (p.sub) txt(g, p.sub, 0, h / 2 - 48, F.mono(19), rgba(th.paper, 0.85));
      g.save(); g.translate(-w * 0.22, -h / 2 + 4); g.rotate(-0.1); g.fillStyle = '#188a56'; g.fillRect(-60, -16, 120, 32); txt(g, p.tape, 0, 1, F.monoX(17), th.paper); g.restore();
      g.restore();
    },
  });

  // ================= datecard (screen layer slate) =================
  B.register('datecard', {
    defaults: { big: '1988', small: 'FLORIDA', kicker: '', w: 560, tone: 'gold' }, ownEnter: true, size: p => [p.w, 150],
    draw(g, p, env) {
      const { t, lt, theme } = env, th = theme, w = p.w, h = p.kicker ? 170 : 140, k = spring(lt, 'snappy'), a = clamp(lt / 0.1); g.save(); g.globalAlpha *= a; g.translate((1 - k) * -w * 0.6, 0);
      B.shadowed(g, () => rr(g, -w / 2, -h / 2, w, h, 10), '#12171f', 0.4); g.fillStyle = '#12171f'; rr(g, -w / 2, -h / 2, w, h, 10); g.fill(); g.fillStyle = RED; g.fillRect(-w / 2, -h / 2, 12, h);
      const n = Math.floor(lin(lt, 0.1, 0.1 + 0.035 * p.big.length) * p.big.length); let y = -h / 2 + 30; if (p.kicker) { txt(g, p.kicker, -w / 2 + 40, y, F.monoX(20), th.gold, 'left'); y += 40; }
      txt(g, p.big.slice(0, n) + (n < p.big.length && Math.floor(lt * 10) % 2 ? '_' : ''), -w / 2 + 40, y + 36, F.hero(78), th.paper, 'left'); txt(g, p.small, -w / 2 + 40, h / 2 - 28, F.monoX(26), B.tone(p.tone, false), 'left'); g.restore();
    },
  });

  // ================= tile: small evidence tile (icon + caption + optional stamp) =================
  B.register('tile', {
    defaults: { icon: 'plate', caption: '', w: 270, h: 300, iconS: 150, stamp: '', stampAt: 99999, tone: 'bad', tilt: 0 }, size: p => [p.w, p.h],
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, k = spring(lt, 'bouncy'); g.save(); g.translate(0, (1 - k) * 120); g.rotate(p.tilt + (1 - k) * 0.15); g.globalAlpha *= clamp(lt / 0.1);
      paper(g, -p.w / 2, -p.h / 2, p.w, p.h, 16, { lift }); g.save(); g.translate(0, -p.h * 0.1); bi(g, p.icon, p.iconS, theme); g.restore();
      txt(g, p.caption, 0, p.h / 2 - 40, F.hero(p.cap || 34), theme.ink); if (p.stamp) stamp(g, theme, t, { text: p.stamp, at: p.stampAt, tone: p.tone, size: p.stampSize || 46, rot: -0.14, y: -p.h * 0.08 }); g.restore();
    },
  });
})();
// ===== Bad Math engine v2 — crime-show HUD (beat label pill + live number chip), screen layer =====
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, countAt, hash, hit } = B;
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
// ===== Lottery Part 2 v3 (CRIME-SHOW / What If pass) — recurring cast + new real-object recipes. Prepended after shared.js. =====
// crew     : THE AUSTRALIAN FUND (kind 'fund', green + gold blazers) / THE TEXAS GROUP (kind 'texas', navy + red). Same three faces every time. coloured ILLUSTRATION cards.
// official : THE STATE OF VIRGINIA — one consistent lottery official (grey suit, glasses, VA seal) with moods, a magnifier, a PAID stamp, a pen.
// bundles  : rubber-banded ticket bundles popping onto a printing belt.   salaries : 20 pay slips.   combos : a dot-grid of every combination.
// house    : "THE HOUSE" card with an ALWAYS WINS banner that gets crossed out.   qticket : a ticket with a "?" and a magnifier.
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, countAt, hash, hit, wobble } = B;
  const INK = '#0B0F14';
  const NOW = 1e9; const at0 = v => (v == null ? NOW : v);
  const zn = () => B.zoomNow || 1;

  // ---------------------------------------------------------------- bust helper (origin = bottom centre of torso, head centre ~ y -150)
  function bust(g, o) {
    const { skin, hair, suit, shirt = '#F5F3EE', tie = null, mood = 'neutral', tt = 0, glasses = false, hairStyle = 'short', s = 1, lapel = null, tint = null } = o;
    const blink = (tt % 3.4) < 0.1 || ((tt + 1.3) % 5.1) > 5.02;
    g.save(); g.scale(s, s); g.lineJoin = 'round'; g.lineCap = 'round';
    const bob = Math.sin(tt * 2.4 + (o.ph || 0)) * 2; g.translate(0, bob);
    // torso
    clay(g, -78, -104, 156, 106, 38, suit, { shadowK: 0.5 });
    g.fillStyle = shirt; g.beginPath(); g.moveTo(-24, -102); g.lineTo(24, -102); g.lineTo(0, -52); g.closePath(); g.fill();
    if (tie) { g.fillStyle = tie; g.beginPath(); g.moveTo(-8, -98); g.lineTo(8, -98); g.lineTo(11, -66); g.lineTo(0, -48); g.lineTo(-11, -66); g.closePath(); g.fill(); }
    if (lapel) { g.fillStyle = lapel; g.beginPath(); g.arc(36, -70, 8, 0, 7); g.fill(); g.strokeStyle = INK; g.lineWidth = 2.5; g.stroke(); }
    // neck + head
    g.fillStyle = B.shade ? B.shade(skin, -0.08) : skin; g.fillRect(-14, -112, 28, 16);
    const cy = -154, R = 50;
    if (hairStyle === 'long') { g.fillStyle = hair; g.strokeStyle = INK; g.lineWidth = 4; g.beginPath(); g.ellipse(0, cy + 8, R + 10, R + 18, 0, 0, 7); g.fill(); g.stroke(); }
    g.fillStyle = skin; g.strokeStyle = INK; g.lineWidth = 4.5; g.beginPath(); g.ellipse(0, cy, R * 0.94, R, 0, 0, 7); g.fill(); g.stroke();
    for (const q of [-1, 1]) { g.beginPath(); g.ellipse(q * R * 0.94, cy + 3, 8, 12, 0, 0, 7); g.fill(); g.stroke(); }
    // hair
    g.fillStyle = hair; g.lineWidth = 4;
    if (hairStyle === 'short') { g.beginPath(); g.moveTo(-R * 0.92, cy - 6); g.quadraticCurveTo(-R * 1.05, cy - R * 1.12, 0, cy - R * 1.08); g.quadraticCurveTo(R * 1.05, cy - R * 1.12, R * 0.92, cy - 6); g.quadraticCurveTo(R * 0.55, cy - R * 0.62, 0, cy - R * 0.66); g.quadraticCurveTo(-R * 0.55, cy - R * 0.62, -R * 0.92, cy - 6); g.fill(); g.stroke(); }
    else if (hairStyle === 'long') { g.beginPath(); g.moveTo(-R * 0.96, cy + 4); g.quadraticCurveTo(-R * 1.1, cy - R * 1.15, 0, cy - R * 1.1); g.quadraticCurveTo(R * 1.1, cy - R * 1.15, R * 0.96, cy + 4); g.quadraticCurveTo(R * 0.3, cy - R * 0.5, -R * 0.2, cy - R * 0.62); g.quadraticCurveTo(-R * 0.7, cy - R * 0.4, -R * 0.96, cy + 4); g.fill(); g.stroke(); }
    else if (hairStyle === 'cap') { g.fillStyle = o.cap || '#2c3e66'; g.beginPath(); g.moveTo(-R * 1.0, cy - 8); g.quadraticCurveTo(-R * 1.05, cy - R * 1.25, 0, cy - R * 1.2); g.quadraticCurveTo(R * 1.05, cy - R * 1.25, R * 1.0, cy - 8); g.closePath(); g.fill(); g.stroke(); g.fillRect(-R * 1.0, cy - 12, R * 2.0, 10); g.strokeRect(-R * 1.0, cy - 12, R * 2.0, 10); g.beginPath(); g.moveTo(R * 0.2, cy - 8); g.quadraticCurveTo(R * 1.1, cy - 4, R * 1.28, cy + 4); g.lineTo(R * 0.4, cy + 2); g.closePath(); g.fill(); g.stroke(); }
    else if (hairStyle === 'grey') { g.fillStyle = '#C9CCD3'; g.beginPath(); g.moveTo(-R * 0.94, cy - 4); g.quadraticCurveTo(-R * 1.06, cy - R * 0.95, -R * 0.4, cy - R * 1.04); g.quadraticCurveTo(0, cy - R * 0.92, R * 0.4, cy - R * 1.04); g.quadraticCurveTo(R * 1.06, cy - R * 0.95, R * 0.94, cy - 4); g.quadraticCurveTo(R * 0.7, cy - R * 0.55, 0, cy - R * 0.6); g.quadraticCurveTo(-R * 0.7, cy - R * 0.55, -R * 0.94, cy - 4); g.fill(); g.stroke(); }
    // face by mood
    const M = { neutral: { b: 0, t: 0, m: 'smile', e: 'n' }, cheer: { b: 12, t: 0, m: 'grin', e: 'arc' }, shock: { b: 16, t: 0, m: 'o', e: 'wide' }, think: { b: 8, t: 0.12, m: 'flat', e: 'n', look: [-1, -1] }, stern: { b: -4, t: 0.3, m: 'frown', e: 'n' }, smug: { b: -2, t: -0.1, m: 'smirk', e: 'half' }, worry: { b: 12, t: -0.3, m: 'wob', e: 'n', sweat: 1 }, tired: { b: -2, t: -0.2, m: 'flat', e: 'half' } }[mood] || { b: 0, t: 0, m: 'smile', e: 'n' };
    for (const q of [-1, 1]) {
      const ex = q * 20, ey = cy - 4;
      if (M.e === 'arc' || blink) { g.strokeStyle = INK; g.lineWidth = 4.5; g.beginPath(); if (M.e === 'arc') g.arc(ex, ey + 4, 10, Math.PI * 1.1, Math.PI * 1.9); else { g.moveTo(ex - 9, ey); g.lineTo(ex + 9, ey); } g.stroke(); }
      else { const er = M.e === 'wide' ? 13 : 10.5; g.fillStyle = '#F5F3EE'; g.strokeStyle = INK; g.lineWidth = 3.5; g.beginPath(); g.ellipse(ex, ey, er, er * (M.e === 'half' ? 0.7 : 1.05), 0, 0, 7); g.fill(); g.stroke(); const lk = M.look || [0.3 * Math.sin(tt * 0.9), 0]; g.fillStyle = INK; g.beginPath(); g.arc(ex + lk[0] * 3.5, ey + lk[1] * 3.5, M.e === 'wide' ? 3.6 : 5, 0, 7); g.fill();
        if (M.e === 'half') { g.fillStyle = skin; g.fillRect(ex - er - 1, ey - er * 1.1, er * 2 + 2, er * 0.55); g.strokeStyle = INK; g.lineWidth = 3; g.beginPath(); g.moveTo(ex - er, ey - er * 0.45); g.lineTo(ex + er, ey - er * 0.45); g.stroke(); } }
      g.strokeStyle = hairStyle === 'grey' ? '#8B8F99' : INK; g.lineWidth = 5; g.beginPath(); g.moveTo(ex - 11 * q, ey - 17 - M.b * 0.4 + M.t * 10 * q); g.lineTo(ex + 11 * q, ey - 17 - M.b * 0.4 - M.t * 10 * q); g.stroke();
    }
    if (glasses) { g.strokeStyle = '#2b2f36'; g.lineWidth = 3.5; for (const q of [-1, 1]) { g.beginPath(); g.rect(q * 20 - 15, cy - 20, 30, 24); g.stroke(); } g.beginPath(); g.moveTo(-5, cy - 10); g.lineTo(5, cy - 10); g.stroke(); }
    const my = cy + 28; g.strokeStyle = INK; g.lineWidth = 4;
    if (M.m === 'smile') { g.beginPath(); g.arc(0, my - 6, 14, 0.3, Math.PI - 0.3); g.stroke(); }
    else if (M.m === 'grin') { g.fillStyle = '#7A1F1F'; g.beginPath(); g.moveTo(-20, my - 8); g.quadraticCurveTo(0, my + 26, 20, my - 8); g.closePath(); g.fill(); g.stroke(); g.fillStyle = '#F5F3EE'; g.beginPath(); g.moveTo(-15, my - 6); g.lineTo(15, my - 6); g.lineTo(12, my + 2); g.lineTo(-12, my + 2); g.closePath(); g.fill(); }
    else if (M.m === 'o') { g.fillStyle = '#7A1F1F'; g.beginPath(); g.ellipse(0, my + 2, 9, 13, 0, 0, 7); g.fill(); g.stroke(); }
    else if (M.m === 'flat') { g.beginPath(); g.moveTo(-11, my); g.lineTo(11, my - 2); g.stroke(); }
    else if (M.m === 'frown') { g.beginPath(); g.arc(0, my + 12, 14, Math.PI + 0.35, -0.35); g.stroke(); }
    else if (M.m === 'smirk') { g.beginPath(); g.moveTo(-12, my); g.quadraticCurveTo(4, my + 8, 18, my - 9); g.stroke(); }
    else if (M.m === 'wob') { g.beginPath(); g.moveTo(-14, my + 4); g.quadraticCurveTo(-7, my - 5, 0, my + 4); g.quadraticCurveTo(7, my + 13, 14, my + 4); g.stroke(); }
    if (M.sweat) { const w = (tt * 1.5) % 1; g.fillStyle = '#7FD6FF'; g.strokeStyle = INK; g.lineWidth = 2.5; g.save(); g.translate(48, cy - 26 + w * 10); g.beginPath(); g.moveTo(0, -12); g.quadraticCurveTo(10, 2, 0, 9); g.quadraticCurveTo(-10, 2, 0, -12); g.fill(); g.stroke(); g.restore(); }
    g.restore();
  }
  window.BMBUST = bust;
  const moodAt = (K, t, d = 'neutral') => { let c = { m: d, t: -1e9 }; for (const k of K || []) if (t >= k.t && k.t >= c.t) c = k; return c; };

  // ---------------------------------------------------------------- crew card
  const CREWS = {
    fund: { bg0: '#BFE3F2', bg1: '#F7E7B0', ground: '#7FBF8F', suit: '#1FA366', lapel: '#F2B705', label: 'THE AUSTRALIAN FUND', sub: 'ILLUSTRATION · A GROUP OF INVESTORS',
      people: [{ x: -128, y: 0, s: 0.84, skin: '#E8C39A', hair: '#6B4423', hs: 'short' }, { x: 128, y: 0, s: 0.84, skin: '#C98E64', hair: '#16181F', hs: 'long' }, { x: 0, y: 14, s: 1.05, skin: '#F1CDA8', hair: '#B07A3A', hs: 'cap', cap: '#F2B705' }] },
    texas: { bg0: '#F3C9B5', bg1: '#F7E1B8', ground: '#C98F5A', suit: '#2c3e66', lapel: '#E0281E', label: 'THE TEXAS GROUP', sub: 'ILLUSTRATION · A GROUP OF BUYERS',
      people: [{ x: -128, y: 0, s: 0.84, skin: '#F1CDA8', hair: '#3a2a1a', hs: 'cap', cap: '#E0281E' }, { x: 128, y: 0, s: 0.84, skin: '#8D5A3B', hair: '#16181F', hs: 'short' }, { x: 0, y: 14, s: 1.05, skin: '#E8C39A', hair: '#8a6a3a', hs: 'long' }] },
  };
  B.register('crew', {
    defaults: { kind: 'fund', w: 520, h: 540, cheerAt: NOW, worryAt: NOW, calmAt: NOW, held: 'none', heldAt: NOW, label: null, sub: null, tilt: -0.02, tag: '', mono: false, stamps: [] }, ownEnter: true,
    size: p => [p.w, p.h], anchors: p => ({ face: [0, -p.h * 0.18, p.w * 0.82, p.h * 0.5], plate: [0, p.h / 2 - 70, p.w, 120], all: [0, 0, p.w, p.h] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, C = CREWS[p.kind], w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, k = spring(lt, 'heavy');
      g.save(); g.translate(0, (1 - k) * 230); g.rotate(p.tilt + (1 - k) * -0.1); g.globalAlpha *= clamp(lt / 0.1);
      paper(g, x0, y0, w, h, 18, { lift });
      const px = x0 + 20, py = y0 + 20, pw = w - 40, ph = h - 20 - 20 - 118;
      g.save(); rr(g, px, py, pw, ph, 10); g.clip(); const bg = g.createLinearGradient(0, py, 0, py + ph); bg.addColorStop(0, C.bg0); bg.addColorStop(1, C.bg1); g.fillStyle = bg; g.fillRect(px, py, pw, ph);
      g.fillStyle = C.ground; g.fillRect(px, py + ph - 56, pw, 60); g.fillStyle = 'rgba(0,0,0,.08)'; g.fillRect(px, py + ph - 56, pw, 6);
      const cheer = t >= p.cheerAt && t < p.calmAt, worry = t >= p.worryAt && t < p.cheerAt, since = t - p.cheerAt, by = py + ph - 40;
      const order = [0, 1, 2];
      for (const i of order) { const q = C.people[i]; const jump = cheer ? Math.abs(Math.sin(Math.max(0, since) * 7 + i * 1.7)) * Math.exp(-Math.max(0, since) * 0.9) * 34 : 0;
        g.save(); g.translate((px + pw / 2) + q.x * (pw / 520), by - jump + q.y); bust(g, { skin: q.skin, hair: q.hair, hairStyle: q.hs, cap: q.cap, suit: C.suit, tie: i === 2 ? C.lapel : null, lapel: C.lapel, s: q.s * (pw / 480), tt: t, ph: i * 1.3, mood: cheer ? 'cheer' : worry ? 'worry' : (i === 2 ? 'smug' : 'neutral') });
        if (cheer && i !== 2) { g.strokeStyle = INK; g.lineWidth = 4; g.fillStyle = q.skin; for (const sd of [-1, 1]) { g.beginPath(); g.moveTo(sd * 66 * q.s, -60 * q.s); g.lineTo(sd * 92 * q.s, -150 * q.s - jump * 0.3); g.stroke(); g.beginPath(); g.arc(sd * 92 * q.s, -154 * q.s - jump * 0.3, 11, 0, 7); g.fill(); g.stroke(); } }
        g.restore(); }
      // held object in front (tickets fan / cheque)
      const hn = t - p.heldAt; if (p.held !== 'none' && hn > -0.01) { const hk = spring(Math.max(0, hn), 'snappy'); g.save(); g.translate(px + pw / 2, by + 6 + (1 - hk) * 60); g.globalAlpha *= clamp(hn / 0.1);
        if (p.held === 'tickets') { for (let i = 0; i < 5; i++) { B.ticket(g, (i - 2) * 46, -14 + Math.abs(i - 2) * 6, 124, 58, (i - 2) * 0.16, i, { sh: 6 }); } }
        else { g.fillStyle = theme.paper; g.strokeStyle = theme.goodInk; g.lineWidth = 4; rr(g, -92, -44, 184, 80, 8); g.fill(); g.stroke(); txt(g, '$27,000,000', 0, -4, F.hero(34), theme.goodInk); }
        g.restore(); }
      if (p.mono) { g.globalCompositeOperation = 'saturation'; g.fillStyle = '#808080'; g.fillRect(px, py, pw, ph); g.globalCompositeOperation = 'source-over'; }
      g.restore(); g.strokeStyle = 'rgba(11,15,20,.3)'; g.lineWidth = 2; rr(g, px, py, pw, ph, 10); g.stroke();
      // name plate
      const ty = py + ph + 12; g.fillStyle = theme.navy; rr(g, px, ty, pw, 100, 10); g.fill(); txt(g, p.label || C.label, px + pw / 2, ty + 38, F.hero(p.labelSize || 42), theme.paper); txt(g, p.sub || C.sub, px + pw / 2, ty + 78, F.mono(14), theme.gold);
      for (const s of p.stamps) B.crimeStamp && B.crimeStamp(g, theme, t, { ...s, x: s.x ?? 0, y: s.y ?? 0 });
      if (p.tag) { g.save(); g.translate(-w * 0.26, y0 + 4); g.rotate(-0.1); g.fillStyle = C.suit; g.fillRect(-64, -15, 128, 30); txt(g, p.tag, 0, 1, F.monoX(16), theme.paper); g.restore(); }
      g.restore();
    },
  });

  // ---------------------------------------------------------------- the Virginia official
  B.register('official', {
    defaults: { w: 480, h: 560, moods: [], glassAt: NOW, glassDur: 1.4, stampAt: NOW, stampText: 'PAID', penAt: NOW, tilt: 0.02, label: 'THE STATE OF VIRGINIA', sub: 'ILLUSTRATION · LOTTERY OFFICIAL', mono: false, thought: '', thoughtAt: NOW, thoughtOut: NOW }, ownEnter: true,
    size: p => [p.w, p.h], anchors: p => ({ face: [0, -p.h * 0.17, p.w * 0.7, p.h * 0.45], plate: [0, p.h / 2 - 70, p.w, 120], all: [0, 0, p.w, p.h] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, k = spring(lt, 'heavy'), mk = moodAt(p.moods, t, 'neutral');
      g.save(); g.translate(0, (1 - k) * 230); g.rotate(p.tilt + (1 - k) * 0.1); g.globalAlpha *= clamp(lt / 0.1);
      paper(g, x0, y0, w, h, 18, { lift });
      const px = x0 + 20, py = y0 + 20, pw = w - 40, ph = h - 40 - 118;
      g.save(); rr(g, px, py, pw, ph, 10); g.clip(); const bg = g.createLinearGradient(0, py, 0, py + ph); bg.addColorStop(0, '#D9E6F2'); bg.addColorStop(1, '#F1E3C8'); g.fillStyle = bg; g.fillRect(px, py, pw, ph);
      // flag-ish backdrop stripes + wall clock
      g.fillStyle = 'rgba(44,62,102,.1)'; g.fillRect(px, py + ph * 0.55, pw, ph * 0.45); g.fillStyle = 'rgba(0,0,0,.07)'; g.fillRect(px, py + ph - 52, pw, 56);
      // seal
      g.save(); g.translate(px + 62, py + 66); g.fillStyle = theme.navy; g.beginPath(); g.arc(0, 0, 44, 0, 7); g.fill(); g.strokeStyle = theme.gold; g.lineWidth = 4; g.beginPath(); g.arc(0, 0, 36, 0, 7); g.stroke(); txt(g, 'VA', 0, 2, F.hero(36), theme.gold); g.restore();
      const cx = px + pw / 2, by = py + ph - 36;
      g.save(); g.translate(cx, by); const hs = (pw / 480) * 1.5;
      // arm holding a pen / stamp (right side)
      const sl = t - p.stampAt, stamping = sl > -0.4 && sl < 0.6, pen = t - p.penAt;
      bust(g, { skin: '#E9C6A0', hair: '#C9CCD3', hairStyle: 'grey', suit: '#59606B', tie: '#E0281E', lapel: theme.gold, glasses: true, s: hs, tt: t, mood: mk.m });
      // stamp tool (wooden) raised on the right, slams down at stampAt
      if (p.stampAt < NOW / 2) { const up = sl < 0 ? ease.out(clamp((sl + 0.4) / 0.4)) * 0 + 1 : 1, dy = sl < 0 ? -34 + 0 : (sl < 0.16 ? lerp(-34, 40, ease.in(clamp(sl / 0.16))) : lerp(40, -20, ease.out(clamp((sl - 0.5) / 0.5))));
        g.save(); g.translate(96 * hs * 0.72, -118 * hs * 0.72 + dy); g.fillStyle = '#8a5a2b'; rr(g, -14, -60, 28, 56, 8); g.fill(); g.strokeStyle = INK; g.lineWidth = 3; g.stroke(); g.fillStyle = '#59606B'; rr(g, -34, -6, 68, 22, 6); g.fill(); g.stroke(); g.restore(); }
      else if (p.penAt < NOW / 2) { const wr = pen > 0 ? Math.sin(pen * 14) * 3 : 0; g.save(); g.translate(92 * hs * 0.72, -102 * hs * 0.72); g.rotate(-0.6 + wr * 0.02); g.fillStyle = '#E0281E'; rr(g, -4, -52, 8, 60, 4); g.fill(); g.strokeStyle = INK; g.lineWidth = 2.5; g.stroke(); g.restore(); }
      g.restore();
      if (p.mono) { g.globalCompositeOperation = 'saturation'; g.fillStyle = '#808080'; g.fillRect(px, py, pw, ph); g.globalCompositeOperation = 'source-over'; }
      g.restore(); g.strokeStyle = 'rgba(11,15,20,.3)'; g.lineWidth = 2; rr(g, px, py, pw, ph, 10); g.stroke();
      // magnifier sweep over the photo area
      const gn = t - p.glassAt; if (gn > -0.05 && gn < p.glassDur + 0.5) { const u = ease.inOut(clamp(gn / p.glassDur)), gx = lerp(px + pw * 0.25, px + pw * 0.8, u), gy = py + ph * 0.55 + Math.sin(u * Math.PI * 3) * 22, r = 62, fa = clamp((gn + 0.05) / 0.12) * (1 - clamp((gn - p.glassDur) / 0.4));
        g.save(); g.globalAlpha *= fa; g.translate(gx, gy); g.rotate(-0.3); g.fillStyle = 'rgba(245,243,238,.2)'; g.beginPath(); g.arc(0, 0, r, 0, 7); g.fill(); g.strokeStyle = theme.gold; g.lineWidth = r * 0.24; g.beginPath(); g.arc(0, 0, r, 0, 7); g.stroke(); g.strokeStyle = INK; g.lineWidth = r * 0.3; g.beginPath(); g.moveTo(r * 0.72, r * 0.72); g.lineTo(r * 1.5, r * 1.55); g.stroke(); g.restore(); }
      // stamp result
      if (sl > 0.12) { const st = sl - 0.12, sc = 1 + 1.0 * (1 - ease.expo(clamp(st / 0.2))), sf = F.hero(86), sw = (p.stampText.length * 52) + 70; g.save(); g.translate(cx + 0, py + ph * 0.5); g.rotate(-0.12); g.scale(sc, sc); g.globalAlpha *= clamp(st / 0.05); const col = p.stampTone === 'bad' ? theme.badInk : theme.goodInk;
        g.fillStyle = 'rgba(245,243,238,.94)'; rr(g, -sw / 2, -62, sw, 124, 12); g.fill(); g.strokeStyle = col; g.lineWidth = 9; rr(g, -sw / 2 + 7, -55, sw - 14, 110, 9); g.stroke(); txt(g, p.stampText, 0, 4, sf, col); g.restore(); burst(g, cx, py + ph * 0.5, sw * 0.55, p.stampTone === 'bad' ? theme.bad : theme.good, st - 0.1, 14, 0.45); }
      // thought bubble
      if (p.thought && t >= p.thoughtAt && t < p.thoughtOut) { const tk = spring(t - p.thoughtAt, 'snappy'), fa = 1 - clamp((t - p.thoughtOut + 0.2) / 0.2); g.save(); g.globalAlpha *= fa; g.translate(px + pw * 0.62, py + 62); g.scale(0.5 + 0.5 * tk, 0.5 + 0.5 * tk); g.fillStyle = theme.paper; rr(g, -90, -44, 180, 88, 26); g.fill(); g.strokeStyle = INK; g.lineWidth = 3; g.stroke(); txt(g, p.thought, 0, 3, F.hero(54), theme.badInk); g.restore(); }
      const ty = py + ph + 12; g.fillStyle = theme.navy; rr(g, px, ty, pw, 100, 10); g.fill(); txt(g, p.label, px + pw / 2, ty + 38, F.hero(p.labelSize || 38), theme.paper); txt(g, p.sub, px + pw / 2, ty + 78, F.mono(14), theme.gold);
      g.restore();
    },
  });

  // ---------------------------------------------------------------- bundles on a printing belt
  B.register('bundles', {
    defaults: { cols: 6, rows: 3, at: NOW, per: 0.1, w: 900, label: 'PRINTED IN BULK', countTo: 0, countAt: NOW, countDur: 1.4, beltAt: NOW }, ownEnter: true,
    size: p => [p.w, p.rows * 150 + 170],
    anchors: p => ({ pile: [0, -30, p.w, p.rows * 150], belt: [0, p.rows * 75 + 30, p.w, 70] }),
    draw(g, p, env) {
      const { t, lt, theme } = env, w = p.w, rows = p.rows, h = rows * 150 + 170, y0 = -h / 2, beltY = y0 + rows * 150 + 70;
      // belt
      g.save(); g.globalAlpha *= clamp(lt / 0.1); const bk = spring(lt, 'snappy'); g.translate(0, (1 - bk) * 80);
      clay(g, -w / 2, beltY, w, 50, 22, '#3a4252', { lift: 0.4, shadowK: 0.6 }); g.save(); rr(g, -w / 2, beltY, w, 50, 22); g.clip(); g.fillStyle = 'rgba(245,243,238,.28)'; const off = (t * 120) % 60; for (let x = -w / 2 - 60 + off; x < w / 2 + 60; x += 60) { g.beginPath(); g.moveTo(x, beltY + 8); g.lineTo(x + 20, beltY + 8); g.lineTo(x + 8, beltY + 42); g.lineTo(x - 12, beltY + 42); g.closePath(); g.fill(); } g.restore(); g.restore();
      let i = 0; const cw = w / p.cols;
      for (let r = 0; r < rows; r++) for (let c = 0; c < p.cols; c++, i++) {
        const o = t - (p.at + i * p.per); if (o <= 0) continue; const k = spring(o, 'snappy'), cx = -w / 2 + cw * (c + 0.5), cy = y0 + (rows - 1 - r) * 150 + 80 + (1 - k) * -220 + (r === 0 ? 0 : 0);
        g.save(); g.translate(cx, cy); g.globalAlpha *= clamp(o / 0.08); g.rotate((hash(i * 3.3) - 0.5) * 0.06);
        for (let j = 3; j >= 0; j--) B.ticket(g, (hash(i + j) - 0.5) * 6, -j * 11 + 20, 150, 66, (hash(i * 2 + j * 5) - 0.5) * 0.08, i + j, { sh: j === 0 ? 8 : 0 });
        g.fillStyle = theme.badInk; rr(g, -14, -34, 28, 78, 4); g.fill(); g.strokeStyle = 'rgba(0,0,0,.25)'; g.lineWidth = 2; g.stroke(); g.restore();
      }
      const ln = t - p.at; if (p.label && ln > -0.2) { const r = (ln + 0.2); g.save(); g.globalAlpha *= clamp(r / 0.2); txt(g, p.label, 0, y0 - 40, F.hero(70), theme.paper); g.restore(); }
      if (p.countTo) { const cn = t - p.countAt, v = cn < 0 ? 0 : countAt(Math.max(0, cn), p.countDur, 0, p.countTo); g.save(); g.globalAlpha *= clamp((cn + 0.1) / 0.15); const o = { font: F.hero(120), size: 120, color: theme.gold, prefix: '', suffix: '+', decimals: 0, align: 'center' }; roll(g, v, 0, beltY + 150, o); g.restore(); }
    },
  });

  // ---------------------------------------------------------------- salaries: 20 pay slips
  B.register('salaries', {
    defaults: { at: NOW, per: 0.1, n: 20, w: 760, h: 760, each: '$65K', total: '$1.3M', totalAt: NOW }, size: p => [p.w, p.h],
    anchors: p => ({ count: [0, -p.h / 2 + 100, p.w * 0.8, 150], grid: [0, 30, p.w * 0.92, p.h * 0.58], total: [0, p.h / 2 - 90, p.w * 0.9, 120] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 22, { lift });
      g.save(); rr(g, x0, y0, w, h, 22); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 170); g.restore();
      let done = 0; for (let i = 0; i < p.n; i++) if (t >= p.at + i * p.per) done++;
      txt(g, 'NORMAL SALARIES', 0, y0 + 40, F.cap(34), rgba(theme.paper, 0.85));
      txt(g, String(done), -60, y0 + 112, F.hero(100), done >= p.n ? theme.gold : theme.paper); txt(g, '/ ' + p.n, 66, y0 + 124, F.hero(56), rgba(theme.paper, 0.7));
      const cols = 5, rows = 4, gw = (w - 80) / cols, gh = (h - 170 - 150) / rows;
      for (let i = 0; i < p.n; i++) { const o = t - (p.at + i * p.per); if (o <= 0) continue; const k = spring(o, 'bouncy'), c = i % cols, r = Math.floor(i / cols), cx = x0 + 40 + gw * (c + 0.5), cy = y0 + 170 + 26 + gh * (r + 0.5);
        g.save(); g.translate(cx, cy); g.scale(0.4 + 0.6 * k, 0.4 + 0.6 * k); g.globalAlpha *= clamp(o / 0.06); g.rotate((hash(i * 4.1) - 0.5) * 0.12); paper(g, -gw * 0.44, -gh * 0.42, gw * 0.88, gh * 0.84, 8, { lift: 0.15, fill: '#EFF6EC' });
        g.fillStyle = '#E8C39A'; g.beginPath(); g.arc(-gw * 0.2, -gh * 0.08, 14, 0, 7); g.fill(); g.fillStyle = '#1FA366'; g.beginPath(); g.moveTo(-gw * 0.2 - 22, gh * 0.3); g.quadraticCurveTo(-gw * 0.2, gh * 0.02, -gw * 0.2 + 22, gh * 0.3); g.closePath(); g.fill();
        txt(g, p.each, gw * 0.12, -gh * 0.06, F.hero(30), theme.goodInk); g.fillStyle = theme.paperShade; rr(g, -gw * 0.1 + 8, gh * 0.12, gw * 0.4, 8, 4); g.fill(); g.restore(); }
      const tn = t - p.totalAt; if (tn > -0.02) { const k = spring(Math.max(0, tn), 'snappy'); g.save(); g.translate(0, y0 + h - 82 + (1 - k) * 30); g.globalAlpha *= clamp(tn / 0.1); marker(g, -w * 0.43, -46, w * 0.86, 92, theme.goodInk, clamp(tn / 0.3), 0.18); txt(g, '≈ ' + p.total + ' A YEAR', 0, 4, F.hero(72), theme.goodInk); g.restore(); burst(g, 0, y0 + h - 82, 300, theme.good, tn - 0.05, 16, 0.5); }
      txt(g, 'ROUGH: ~$65K A TYPICAL US SALARY', 0, y0 + h - 22, F.mono(15), theme.inkSoft);
    },
  });

  // ---------------------------------------------------------------- combos: every lottery combination as a dot grid
  B.register('combos', {
    defaults: { at: NOW, dur: 2.4, w: 860, h: 720, cols: 20, rows: 14, missing: 3, pctAt: NOW, label: 'EVERY COMBINATION', sub: 'EACH DOT = ABOUT 92,000 COMBINATIONS', boughtLabel: 'BOUGHT', tone: 'good' },
    size: p => [p.w, p.h], anchors: p => ({ pct: [0, -p.h / 2 + 120, p.w * 0.8, 170], grid: [0, 40, p.w * 0.94, p.h * 0.62] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, N = p.cols * p.rows; paper(g, x0, y0, w, h, 22, { lift });
      g.save(); rr(g, x0, y0, w, h, 22); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 190); g.restore();
      txt(g, p.label, 0, y0 + 40, F.cap(34), rgba(theme.paper, 0.85));
      const u = t < p.at ? 0 : ease.inOut(clamp((t - p.at) / p.dur)), fill = Math.floor(u * (N - p.missing + 0.999)), pct = N ? (fill / N * 100) : 0, done = u >= 1;
      const o = { font: F.hero(120), size: 120, color: done ? theme.gold : theme.paper, prefix: '', suffix: '%', decimals: 0, align: 'center' }; roll(g, Math.min(99, pct), 0, y0 + 124, o);
      const gx = x0 + 44, gy = y0 + 220, cw = (w - 88) / p.cols, ch = (h - 220 - 70) / p.rows;
      for (let i = 0; i < N; i++) { const c = i % p.cols, r = Math.floor(i / p.cols), cx = gx + cw * (c + 0.5), cy = gy + ch * (r + 0.5), rad = Math.min(cw, ch) * 0.34, isMiss = i >= N - p.missing;
        if (i < fill) { const age = u < 1 ? 0 : 1; g.fillStyle = theme.good; g.beginPath(); g.arc(cx, cy, rad, 0, 7); g.fill(); }
        else { g.strokeStyle = isMiss && done ? theme.badInk : theme.rule; g.lineWidth = isMiss && done ? 4 : 2.5; g.beginPath(); g.arc(cx, cy, rad, 0, 7); g.stroke(); } }
      if (done) { const dn = t - p.at - p.dur, k = spring(Math.max(0, dn), 'bouncy'); g.save(); g.translate(0, y0 + h - 40); g.scale(0.6 + 0.4 * k, 0.6 + 0.4 * k); g.globalAlpha *= clamp(dn / 0.1); txt(g, 'NEARLY ALL ' + p.boughtLabel, 0, 0, F.hero(46), theme.badInk); g.restore(); burst(g, 0, y0 + 124, 280, theme.gold, dn - 0.05, 16, 0.5); }
      else txt(g, p.sub, 0, y0 + h - 30, F.mono(15), theme.inkSoft);
    },
  });

  // ---------------------------------------------------------------- house: THE HOUSE · ALWAYS WINS, crossed out
  B.register('house', {
    defaults: { xAt: NOW, w: 760, h: 700, winsAt: NOW }, size: p => [p.w, p.h], anchors: p => ({ sign: [0, -p.h * 0.22, p.w * 0.8, 120], roof: [0, -p.h * 0.1, p.w * 0.8, p.h * 0.5] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 22, { lift });
      g.save(); rr(g, x0, y0, w, h, 22); g.clip(); const bg = g.createLinearGradient(0, y0, 0, y0 + h); bg.addColorStop(0, '#CBE4F2'); bg.addColorStop(1, '#F6E8C0'); g.fillStyle = bg; g.fillRect(x0, y0, w, h); g.fillStyle = '#7FBF8F'; g.fillRect(x0, y0 + h - 120, w, 130); g.restore();
      // building
      clay(g, -200, y0 + 250, 400, 280, 12, '#C9511F', { shadowK: 0.6 }); g.fillStyle = '#8f3510'; g.beginPath(); g.moveTo(-240, y0 + 256); g.lineTo(0, y0 + 110); g.lineTo(240, y0 + 256); g.closePath(); g.fill(); g.strokeStyle = INK; g.lineWidth = 4; g.stroke();
      clay(g, -48, y0 + 380, 96, 150, 10, '#F2B705', { shadowK: 0.4 }); for (const q of [-1, 1]) clay(g, q * 128 - 36, y0 + 320, 72, 72, 8, '#CBE4F2', { shadowK: 0.3 });
      B.shadowed(g, () => rr(g, -190, y0 + 52, 380, 72), theme.navy, 0.4); g.fillStyle = theme.navy; rr(g, -190, y0 + 52, 380, 72, 12); g.fill(); txt(g, 'THE HOUSE', 0, y0 + 90, F.hero(56), theme.paper);
      const wn = t - p.winsAt; if (wn > -0.02) { const k = spring(Math.max(0, wn), 'snappy'); g.save(); g.translate(0, y0 + h - 70 + (1 - k) * 40); g.globalAlpha *= clamp(wn / 0.1); marker(g, -w * 0.42, -44, w * 0.84, 88, theme.gold, clamp(wn / 0.3), 0.5); txt(g, 'ALWAYS WINS', 0, 4, F.hero(72), theme.ink);
        const xn = t - p.xAt; if (xn > 0) { const u = ease.out(clamp(xn / 0.3)); g.strokeStyle = theme.badInk; g.lineWidth = 14; g.lineCap = 'round'; g.beginPath(); g.moveTo(-w * 0.4, 6); g.lineTo(-w * 0.4 + w * 0.8 * u, 6 - 10 * u); g.stroke(); } g.restore(); }
      const xn2 = t - p.xAt; if (xn2 > 0.25) { const k = spring(xn2 - 0.25, 'bouncy'); g.save(); g.translate(0, y0 + h * 0.46); g.rotate(-0.1); g.scale(k, k); g.fillStyle = 'rgba(245,243,238,.95)'; rr(g, -260, -60, 520, 120, 12); g.fill(); g.strokeStyle = theme.goodInk; g.lineWidth = 9; rr(g, -253, -53, 506, 106, 9); g.stroke(); txt(g, 'NOT THIS TIME', 0, 4, F.hero(68), theme.goodInk); g.restore(); }
    },
  });

  // ---------------------------------------------------------------- qticket: a ticket with a big "?"
  B.register('qticket', {
    defaults: { qAt: NOW, tagAt: NOW, tags: ['IN A STORE?', 'IN BULK?', 'HOW?'], w: 760, h: 540, stampAt: NOW, stampText: "CAN'T PROVE IT" }, size: p => [p.w, p.h],
    anchors: p => ({ ticket: [0, -p.h * 0.1, p.w * 0.8, p.h * 0.5], q: [0, -p.h * 0.1, 200, 220] }),
    draw(g, p, env) {
      const { t, lt, theme } = env, w = p.w, h = p.h; const k = spring(lt, 'snappy'); g.save(); g.globalAlpha *= clamp(lt / 0.1); g.translate(0, (1 - k) * 80);
      B.ticket(g, 0, -h * 0.1, 640, 290, -0.04, 1, { sh: 18, edge: theme.gold, edgeW: 6, label: 'THE WINNING TICKET' });
      const qn = t - p.qAt; if (qn > -0.02) { const qk = spring(Math.max(0, qn), 'bouncy'); g.save(); g.translate(120, -h * 0.1); g.scale(0.4 + 0.6 * qk, 0.4 + 0.6 * qk); g.rotate(0.08); g.globalAlpha *= clamp(qn / 0.1); g.fillStyle = theme.paper; g.beginPath(); g.arc(0, 0, 118, 0, 7); g.fill(); g.strokeStyle = theme.badInk; g.lineWidth = 12; g.stroke(); txt(g, '?', 0, 8, F.hero(190), theme.badInk); g.restore(); }
      p.tags.forEach((s, i) => { const tn = t - (p.tagAt + i * 0.32); if (tn < 0) return; const tk = spring(tn, 'bouncy'), x = (i - 1) * 245, y = h * 0.24; g.save(); g.translate(x, y); g.rotate((i - 1) * 0.05); g.scale(0.5 + 0.5 * tk, 0.5 + 0.5 * tk); g.globalAlpha *= clamp(tn / 0.08); paper(g, -112, -34, 224, 68, 12, { lift: 0.3 }); txt(g, s, 0, 3, F.cap(28), theme.ink); g.restore(); });
      const sn = t - p.stampAt; if (sn > 0) { const sc = 1 + 1.1 * (1 - ease.expo(clamp(sn / 0.2))), sf = F.hero(70), sw = p.stampText.length * 40 + 80; g.save(); g.translate(0, h * 0.4); g.rotate(-0.07); g.scale(sc, sc); g.globalAlpha *= clamp(sn / 0.05); g.fillStyle = 'rgba(245,243,238,.95)'; rr(g, -sw / 2, -56, sw, 112, 12); g.fill(); g.strokeStyle = theme.badInk; g.lineWidth = 8; rr(g, -sw / 2 + 6, -50, sw - 12, 100, 9); g.stroke(); txt(g, p.stampText, 0, 4, sf, theme.badInk); g.restore(); burst(g, 0, h * 0.4, sw * 0.5, theme.bad, sn - 0.1, 14, 0.45); }
      g.restore();
    },
  });

  // ---------------------------------------------------------------- oneticket: the friend who buys ONE ticket and prays
  B.register('oneticket', {
    defaults: { xAt: NOW, winsAt: NOW, w: 760, h: 700 }, size: p => [p.w, p.h], anchors: p => ({ sign: [0, -p.h * 0.2, p.w * 0.8, 130], ticket: [0, -p.h * 0.05, p.w * 0.8, p.h * 0.45] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 22, { lift });
      g.save(); rr(g, x0, y0, w, h, 22); g.clip(); const bg = g.createLinearGradient(0, y0, 0, y0 + h); bg.addColorStop(0, '#E6DDF4'); bg.addColorStop(1, '#F6E8C0'); g.fillStyle = bg; g.fillRect(x0, y0, w, h); g.restore();
      txt(g, 'THE FRIEND WHO BUYS', 0, y0 + 62, F.cap(40), theme.ink); txt(g, 'ONE TICKET', 0, y0 + 132, F.hero(92), theme.badInk);
      const wn = t - p.winsAt, k = wn > -0.2 ? ease.out(clamp((wn + 0.2) / 0.5)) : 0;
      g.save(); g.translate(0, y0 + 330); g.rotate(-0.05 + Math.sin(t * 1.3) * 0.015); B.ticket(g, 0, 0, 440, 200, 0, 1, { sh: 16, edge: theme.gold, edgeW: 6, label: 'ONE TICKET' }); g.restore();
      // sparkles = the prayer
      for (let i = 0; i < 10; i++) { const a = k * clamp((wn + 0.2) / 0.4 + i * 0.02); if (a <= 0) continue; const ang = i / 10 * Math.PI * 2 + t * 0.6, r = 190 + 30 * Math.sin(t * 3 + i), x = Math.cos(ang) * r * 1.2, y = y0 + 330 + Math.sin(ang) * r * 0.55; g.save(); g.translate(x, y); g.rotate(ang); g.globalAlpha *= a; g.fillStyle = theme.gold; g.beginPath(); for (let j = 0; j < 8; j++) { const rr2 = j % 2 ? 6 : 16, aa = j / 8 * Math.PI * 2; g.lineTo(Math.cos(aa) * rr2, Math.sin(aa) * rr2); } g.closePath(); g.fill(); g.restore(); }
      if (wn > -0.02) { const kk = spring(Math.max(0, wn), 'snappy'); g.save(); g.translate(0, y0 + h - 100 + (1 - kk) * 40); g.globalAlpha *= clamp(wn / 0.1); marker(g, -w * 0.4, -46, w * 0.8, 92, theme.gold, clamp(wn / 0.3), 0.5); txt(g, 'AND PRAYS', 0, 4, F.hero(76), theme.ink);
        const xn = t - p.xAt; if (xn > 0) { const u = ease.out(clamp(xn / 0.3)); g.strokeStyle = theme.badInk; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); g.moveTo(-w * 0.34, 6); g.lineTo(-w * 0.34 + w * 0.68 * u, 2); g.stroke(); } g.restore(); }
    },
  });
})();
// ===== Lottery Part 2 v3 — scene builder shared by the three cuts: LOT(W, V) -> BM2.scene spec =====
// W = word refs of this cut ('@word#n'), V = variant switches {open:'va'|'tx'|'chq', jack:true|false, name, duration, ...}
// Every spoken line has its own visual beat. Characters: THE AUSTRALIAN FUND (crew fund) x7, THE STATE OF VIRGINIA (official) x7, THE TEXAS GROUP (crew texas).
// Stations (world px, 1800 apart): row0 y=0: hook(0) intro(1800) jackpot(3600) rule(5400) bulk(7200) · row1 y=1800: legal(0) invest(1800) qticket(3600) paid(5400) fan(7200)
// row2 y=3600: salaries(0) house(1800) newrules(3600) yearcal(5400) texasgroup(7200) · row3 y=5400: combos(0) jackpot95(1800) sign(3600) final(5400)
window.LOT = function (W, V) {
  const SB = 'side-by-side', GH = 'graphic-hero', ZN = 'zoom-on-number', PF = 'presenter-front', PK = 'peek', PB = 'pull-back';
  const R = (ref, d) => (d == null ? ref : (typeof ref === 'number' ? ref + d : ref + (d >= 0 ? '+' : '') + d));
  const STL = { x: 120, y: 1410, s: 0.85 }, STR = { x: 940, y: 1410, s: 0.85 };
  const LOCPH = 'brand/photos/stock/lottery-tickets/1.jpg', BALLS = 'brand/photos/stock/lottery-balls/8.jpg';
  const sx = 1800, row = 1800;
  const hookProps = V.hook;
  const tx = V.open === 'tx';
  const els = [];
  const E = (...a) => els.push(...a);
  // ---------------------------------------------------------------- S0 hook (frame 0 and the loop)
  if (V.open === 'va') {
    E({ id: 'hook', type: 'hook', at: [0, -540], in: 0, out: R(W.hookOut, -0.1), props: hookProps },
      { id: 'cr0', type: 'crew', at: [0, -40], in: -3, props: { kind: 'fund', w: 440, h: 470, cheerAt: W.five, held: 'tickets', heldAt: W.tickets, tag: 'THE BUYERS' } },
      { id: 'mtn0', type: 'mountain', at: [0, 385], in: -4, props: { rows: 7, thumpAt: 0.04, heroAt: 99999, seed: 3 } },
      { id: 'hook2', type: 'hook', at: [0, -540], in: R(W.endAt, 0.05), props: hookProps },
      { id: 'cr0b', type: 'crew', at: [0, -40], in: R(W.endAt, -0.15), props: { kind: 'fund', w: 440, h: 470, cheerAt: R(W.endAt, 0.2), tag: 'THE BUYERS' } });
  } else if (tx) {
    E({ id: 'hook', type: 'hook', at: [0, -540], in: 0, out: R(W.hookOut, -0.1), props: hookProps },
      { id: 'cr0', type: 'crew', at: [-250, -60], in: -3, props: { kind: 'texas', w: 420, h: 450, cheerAt: W.won, held: 'tickets', heldAt: W.every0, tag: 'THE BUYERS' } },
      { id: 'jack0', type: 'counter', at: [250, 20], in: -3, props: { at: W.n95, dur: 1.0, to: 95000000, prefix: '$', label: 'TEXAS · 2023', sub: 'JACKPOT', tone: 'good', size: 112, w: 560 } },
      { id: 'mtn0', type: 'mountain', at: [0, 390], in: -4, props: { rows: 7, thumpAt: 0.04, heroAt: 99999, seed: 8 } },
      { id: 'hook2', type: 'hook', at: [0, -540], in: R(W.endAt, 0.05), props: hookProps },
      { id: 'cr0b', type: 'crew', at: [-250, -60], in: R(W.endAt, -0.15), props: { kind: 'texas', w: 420, h: 450, cheerAt: R(W.endAt, 0.2), tag: 'THE BUYERS' } });
  } else { // 'chq': Virginia has to pay
    E({ id: 'hook', type: 'hook', at: [0, -560], in: 0, out: R(W.hookOut, -0.1), props: hookProps },
      { id: 'chq0', type: 'cheque', at: [0, -110], in: -3, props: { at: W.n27, dur: 1.2, to: 27000000, rosetteAt: 99999, head: 'PRIZE CHEQUE', payee: 'A LOTTERY CREW', src: 'PER UPI · MAR 10, 1992' }, scale: 0.9 },
      { id: 'of0', type: 'official', at: [-245, 360], in: -3, props: { w: 400, h: 480, labelSize: 32, moods: [{ t: 0, m: 'stern' }], thought: '$27M?', thoughtAt: W.pay0, thoughtOut: R(W.hookOut, -0.2) } },
      { id: 'cr0', type: 'crew', at: [245, 360], in: -3, props: { kind: 'fund', w: 400, h: 480, cheerAt: W.n27, tag: 'THE CREW' } },
      { id: 'hook2', type: 'hook', at: [0, -560], in: R(W.endAt, 0.05), props: hookProps },
      { id: 'chq0b', type: 'cheque', at: [0, -110], in: R(W.endAt, -0.15), props: { at: R(W.endAt, 0.15), dur: 1.0, to: 27000000, head: 'PRIZE CHEQUE', payee: 'A LOTTERY CREW', src: 'PER UPI · MAR 10, 1992' }, scale: 0.9 },
      { id: 'of0b', type: 'official', at: [-245, 360], in: R(W.endAt, -0.15), props: { w: 400, h: 480, labelSize: 32, moods: [{ t: 0, m: 'think' }] } },
      { id: 'cr0b', type: 'crew', at: [245, 360], in: R(W.endAt, -0.15), props: { kind: 'fund', w: 400, h: 480, cheerAt: R(W.endAt, 0.2), tag: 'THE CREW' } });
  }
  // ---------------------------------------------------------------- S1 intro: THE FUND vs THE STATE (1992)
  E({ id: 'cr1', type: 'crew', at: [sx - 330, 60], in: R(W.s1, -0.3), props: { kind: 'fund', w: 480, h: 500, held: 'tickets', heldAt: W.every, stamps: [{ text: 'AUSTRALIA', at: W.fund, size: 40, x: 0, y: -150, rot: -0.1, tone: 'good' }], tag: 'THE BUYERS' } },
    { id: 'of1', type: 'official', at: [sx + 330, 60], in: W.vas, props: { w: 460, h: 520, labelSize: 34, moods: [{ t: 0, m: 'think' }] } },
    { id: 'vs', type: 'text', at: [sx, -330], in: R(W.tried, 0.05), props: { lines: V.vsLines || [[['TRIED TO BUY', 'gold']]], size: V.vsSize || 76 } },
    { id: 'every1', type: 'text', at: [sx, 450], in: W.every, props: { lines: V.everyLines || [[['EVERY TICKET', 'bad']]], size: 84 } },
    // ---------------------------------------------------------------- S2 jackpot
    { id: 'cr2', type: 'crew', at: [3600, -230], in: R(W.s2, -0.35), props: { kind: 'fund', w: 440, h: 470, cheerAt: W.worked, held: 'cheque', heldAt: W.jackpot, tag: 'THE WINNERS' } },
    { id: 'chq', type: 'cheque', at: [3600, 300], in: R(W.jackpot, -0.25), props: { at: R(W.jackpotN, 0), dur: 1.4, to: 27000000, rosetteAt: W.record, payee: 'AN AUSTRALIAN FUND' } },
    // ---------------------------------------------------------------- S3 the rule + licensed store
    { id: 'book', type: 'rulebook', at: [5240, 40], in: R(W.but, -0.4), props: { ulAt: W.licensed, lineAt: R(W.but, 0.5), newAt: 99999, stampAt: 99999 } },
    { id: 'store', type: 'photo', at: [5980, 330], in: R(W.licensed, -0.1), props: { src: LOCPH, w: 360, aspect: 1.0, fx: 0.5, fy: 0.5, tilt: 0.06, credit: 'PHOTO: LIBRARY OF CONGRESS · NO KNOWN RESTRICTIONS', name: 'LICENSED', role: 'A STORE · ILLUSTRATIVE', tape: true } },
    // ---------------------------------------------------------------- S4 printed in bulk
    { id: 'cr4', type: 'crew', at: [7200, -240], in: R(W.s4, -0.35), props: { kind: 'fund', w: 440, h: 460, cheerAt: 99999, held: 'tickets', heldAt: R(W.s4, 0.2), tag: 'THE BUYERS', moods: [] } },
    { id: 'bund', type: 'bundles', at: [7200, 330], in: R(W.s4, -0.3), props: { cols: 6, rows: 3, at: R(W.printed, -0.2), per: 0.07, w: 880, label: '' } },
    { id: 'bulkT', type: 'text', layer: 'screen', at: [540, 440], in: W.printed, out: R(W.s5, -0.15), props: { lines: [[['MILLIONS ', 'paper'], ['PRINTED', 'gold']]], size: 70 } },
    // ---------------------------------------------------------------- S5 legal?
    { id: 'of5', type: 'official', at: [0, row + 20], in: R(W.s5, -0.35), props: { w: 460, h: 540, moods: [{ t: 0, m: 'think' }, { t: R(W.legal, 0), m: 'worry' }], thought: '?', thoughtAt: R(W.s5, 0.3), thoughtOut: W.like } },
    { id: 'tk5', type: 'qticket', at: [0, row + 600], in: R(W.s5, 0.05), scale: 0.72, props: { qAt: R(W.legal, -0.1), tagAt: 99999, tags: [] } },
    { id: 'legalT', type: 'text', layer: 'screen', at: [540, 440], in: R(W.s5, 0.2), out: R(W.like, -0.1), props: { lines: V.legalLines || [[['WAS IT ', 'paper'], ['LEGAL?', 'gold']]], size: 92 } },
    // ---------------------------------------------------------------- S6 investigates + calendar
    { id: 'of6', type: 'official', at: [sx - 330, row + 40], in: R(W.s6, -0.35), props: { w: 440, h: 520, glassAt: R(W.s6, 0.1), glassDur: 1.6, moods: [{ t: 0, m: 'stern' }] } },
    { id: 'cal', type: 'datecal', at: [sx + 330, row + 30], scale: 0.78, in: R(W.weeks, -0.4), props: { tick1At: R(W.weeks, 0.3), tearAt: R(W.weeks, 0.9), tick2At: R(W.weeks, 1.6), provedAt: 99999 } },
    // ---------------------------------------------------------------- S7 can't prove it
    { id: 'tk7', type: 'qticket', at: [3600, row + 80], in: R(W.nobody, -0.45), props: { qAt: R(W.prove, -0.1), tagAt: R(W.prove, 0.2), stampAt: W.bought } },
    // ---------------------------------------------------------------- S8 no proof -> paid
    { id: 'of8', type: 'official', at: [5400 - 290, row + 70], in: R(W.s8, -0.4), props: { w: 440, h: 520, labelSize: 34, stampAt: W.paid, stampText: 'PAID', moods: [{ t: 0, m: 'stern' }, { t: R(W.paid, 0), m: 'smug' }] } },
    { id: 'cr8', type: 'crew', at: [5400 + 290, row + 110], in: R(W.s8, -0.3), props: { kind: 'fund', w: 400, h: 440, worryAt: R(W.s8, 0.3), cheerAt: R(W.paid, 0.2), tag: 'THE WINNERS' } },
    { id: 'npT', type: 'stamp', at: [5400, row - 330], rot: -0.05, in: R(W.s8, 0), out: R(W.paid, -0.1), props: { text: 'NO PROOF = NO BROKEN RULE', tone: 'accent', size: 44 } },
    // ---------------------------------------------------------------- S9 cheque fan
    { id: 'fan', type: 'chequefan', at: [7200, row + 30], in: R(W.s9, -0.5), props: { at: R(W.year, -0.05), per: 0.04, valAt: W.valAt || W.one, yearAt: W.year, nAt: W.twenty } },
    // ---------------------------------------------------------------- S10 twenty normal salaries
    { id: 'sal', type: 'salaries', at: [0, 2 * row + 40], in: R(W.sal, -0.5), props: { at: R(W.sal, 0.15), per: 0.07, totalAt: R(W.single, 0) } },
    // ---------------------------------------------------------------- S11 the house always wins
    { id: 'hse', type: V.send === 'one' ? 'oneticket' : 'house', at: [sx, 2 * row + 30], in: R(W.send, -0.45), props: { winsAt: W.wins, xAt: R(W.wins, 0.9) } },
    // ---------------------------------------------------------------- S12 the fix: new rules
    { id: 'of12', type: 'official', at: [3600 - 380, 2 * row + 90], in: R(W.then, -0.4), props: { w: 420, h: 500, labelSize: 32, penAt: R(W.rushed, 0.1), moods: [{ t: 0, m: 'stern' }, { t: W.problem, m: 'smug' }] } },
    { id: 'book2', type: 'rulebook', at: [3600 + 300, 2 * row + 20], scale: 0.8, in: R(W.then, -0.2), props: { ulAt: 99999, lineAt: 99999, newAt: W.bulk2, stampAt: R(W.bulk2, 0.3), dimAt: 99999 } },
    { id: 'solvT', type: 'text', layer: 'screen', at: [540, 440], in: W.problem, out: R(W.y31, -0.15), props: { lines: V.solvedLines || [[['SOLVED?', 'gold']]], size: V.solvedSize || 120 } },
    // ---------------------------------------------------------------- S14 31 years later
    { id: 'ycal', type: 'yearcal', at: [5400, 2 * row + 20], in: R(W.y31, -0.5), props: { flipAt: R(W.later, V.flipOff == null ? 0.15 : V.flipOff), labelAt: R(W.later, V.flipOff == null ? 0.0 : V.flipOff - 0.15), dur: V.flipDur || 0.8, yearsAt: R(W.y31, 0.05) } },
    // ---------------------------------------------------------------- S15 the Texas group + S16 combos
    { id: 'cr15', type: 'crew', at: [7200, 2 * row + 50], in: R(W.s15, -0.4), props: { kind: 'texas', w: 500, h: 520, held: 'tickets', heldAt: W.nearly, tag: 'A GROUP · TEXAS', stamps: [{ text: 'TEXAS 2023', at: R(W.s15, 0.2), size: 42, x: 0, y: -150, rot: -0.08, tone: 'bad' }] } },
    { id: 'cmb', type: 'combos', at: [0, 3 * row + 20], in: R(W.comb, -0.5), props: { at: R(W.comb, -0.1), dur: 1.7, w: 780, h: 660 } });
  // S17 $95M (skipped in the TikTok cut: it opened on it)
  if (V.jack !== false) E(
    { id: 'jmtn', type: 'mountain', at: [sx + 250, 3 * row + 380], scale: 0.62, in: R(W.n95, -0.6), props: { rows: 11, seed: 8, thumpAt: W.n95 } },
    { id: 'jack', type: 'counter', at: [sx, 3 * row - 140], in: R(W.n95, -0.55), out: R(W.commS, -0.05), props: { at: R(W.n95, -0.1), dur: 1.2, to: 95000000, prefix: '$', label: 'TEXAS · 2023', sub: 'JACKPOT · AGAIN', tone: 'good', size: 150, w: 900 } },
    { id: 'cr17', type: 'crew', at: [sx - 420, 3 * row + 390], in: R(W.n95, -0.3), out: R(W.commS, -0.05), props: { kind: 'texas', w: 380, h: 410, cheerAt: R(W.n95, 0.1), tag: 'THE WINNERS', labelSize: 34 } });
  E({ id: 'sign', type: 'sign', at: [3600, 3 * row - 110], in: R(W.commS, -0.1), props: { dropAt: W.shut, tagAt: R(W.commission, 0.1), fall: 210 } },
    // ---------------------------------------------------------------- S19 final question
    { id: 'of19', type: 'official', at: [5400, 3 * row + 20], in: R(W.q, -0.4), props: { w: 460, h: 540, moods: [{ t: 0, m: 'think' }, { t: W.pay, m: 'stern' }], thought: '?', thoughtAt: R(W.q, 0.3), thoughtOut: W.yes } },
    { id: 'tk19', type: 'qticket', at: [5400, 3 * row + 640], in: R(W.q, 0.05), scale: 0.6, props: { qAt: W.pay, tagAt: 99999, tags: [] } },
    // ---------------------------------------------------------------- screen micro-moments + HUD
    { id: 'heart', type: 'heart', layer: 'screen', at: [800, 930], in: R(W.like, -0.05), out: R(W.like, 1.15), props: { s: 1 } },
    { id: 'liket', type: 'text', layer: 'screen', at: [800, 1190], in: R(W.like, 0.15), out: R(W.like, 1.2), props: { lines: [[[V.likeText || 'LIKE', 'gold']]], size: 62 } },
    { id: 'plane', type: 'plane', layer: 'screen', at: [540, 960], in: R(W.send, -0.05), out: R(W.send, 1.2), props: { dur: 0.9, from: [-230, 250], to: [280, -330], s: 1.5 } },
    { id: 'sendtx', type: 'text', layer: 'screen', at: [800, 1190], in: R(W.send, 0.15), out: R(W.send, 1.2), props: { lines: [[['SEND', 'gold']]], size: 70 } },
    { id: 'btn', type: 'follow', layer: 'screen', at: [830, 1010], scale: 0.8, in: R(W.follow, -0.05), out: R(W.follow, 1.45), props: { press: 0.55 } },
    { id: 'ask', type: 'bubble', layer: 'screen', at: [600, 1090], in: R(W.q, 0.5), out: R(W.yes, 0.3), props: { l1: V.askL1 || 'SHOULD THE STATE PAY?', l2: V.askL2 || 'YES / NO', size: 46, tail: 'left' } },
    ...(V.extra || []),
    { id: 'hud', type: 'hud', layer: 'screen', at: [0, 0], in: -1, props: { labels: V.labels, items: V.items } });
  // ================================================================ beats
  const beats = [], bt = (at, o) => { if (at == null || at === 'undefined' || /undefined/.test(String(at))) return; beats.push({ at, ...o }); };
  const F0 = V.open === 'va' ? ['hook', 'cr0', 'mtn0'] : tx ? ['hook', 'cr0', 'jack0', 'mtn0'] : ['hook', 'chq0', 'of0', 'cr0'];
  const F0e = F0.map(x => x === 'hook' ? 'hook2' : x === 'chq0' ? 'chq0b' : x === 'of0' ? 'of0b' : x === 'cr0' ? 'cr0b' : x);
  beats.push({ at: 0, beat: SB, focus: F0, fill: 0.9, maxH: V.f0maxH || 900, sx: 540, sy: V.f0sy || 905, st: { x: 130, y: 1410, s: 0.85 }, pose: 'shock', keep: ['hook', 'hook2'] });
  if (V.open === 'va') bt(W.five, { beat: ZN, focus: 'hook.l1', fill: 0.95, maxH: 400, sy: 760, st: { x: 130, y: 1410, s: 0.85 }, dur: 0.45 });
  if (tx) bt(W.n95, { beat: ZN, focus: 'jack0', fill: 0.92, maxH: 500, sy: 780, st: { x: 130, y: 1410, s: 0.85 }, pose: 'shock', dur: 0.45 });
  if (V.open === 'chq') bt(W.n27, { beat: ZN, focus: 'chq0.amount', fill: 0.95, maxH: 400, sy: 760, st: { x: 130, y: 1410, s: 0.85 }, pose: 'shock', dur: 0.45 });
  bt(W.reframe, { beat: GH, focus: F0, fill: 0.9, maxH: V.f0maxH || 900, sx: 540, sy: V.f0sy || 905, st: STR, pose: 'point', dur: 0.7, keep: ['hook', 'hook2'] });
  // intro
  bt(R(W.s1, -0.25), { beat: GH, focus: V.s1both ? ['cr1', 'of1'] : 'cr1', move: 'whip', fill: V.s1both ? 0.9 : 0.62, maxH: 800, sy: 800, st: STR, pose: 'point' });
  bt(R(W.tried, -0.1), { beat: GH, focus: V.s1both ? ['cr1', 'of1', 'vs'] : ['cr1', 'vs'], fill: 0.74, maxH: 900, sy: 800, st: STR, pose: 'idle', dur: 0.7 });
  bt(W.every, { beat: ZN, focus: 'every1', fill: 0.86, maxH: 300, sy: 740, st: STL, pose: 'shock', dur: 0.45 });
  bt(V.vasBeat === false ? undefined : W.vas, { beat: GH, focus: ['cr1', 'of1', 'vs', 'every1'], fill: 0.97, maxH: 880, sy: 800, st: STR, pose: 'point', dur: 0.7 });
  // jackpot
  bt(R(W.s2, -0.2), { beat: GH, focus: ['cr2', 'chq'], move: 'whip', fill: 0.86, maxH: 950, sy: 770, st: STL, pose: 'shock' });
  bt(W.jackpotN, { beat: ZN, focus: 'chq.amount', fill: 0.92, sy: 760, st: STL, pose: 'shock', dur: 0.5 });
  bt(W.record, { beat: GH, focus: ['cr2', 'chq'], fill: 0.86, maxH: 950, sy: 770, st: STR, pose: 'point', dur: 0.7 });
  // rule + licensed store
  bt(R(W.but, -0.25), { beat: SB, focus: 'book', move: 'whip', sx: 640, sy: 830, fill: 0.7, maxH: 840, st: 'corner-left', pose: 'point' });
  bt(W.licensed, { beat: ZN, focus: 'book.rule', fill: 0.62, sy: 880, st: 'corner-left', dur: 0.5 });
  bt(W.store, { beat: GH, focus: ['book', 'store'], fill: 0.97, maxH: 880, sy: 800, st: STL, pose: 'point', dur: 0.7 });
  // printed in bulk
  bt(R(W.s4, -0.25), { beat: GH, focus: ['cr4', 'bund'], move: 'whip', fill: 0.9, maxH: 980, sy: 800, st: STL, pose: 'idle' });
  bt(W.printed, { beat: ZN, focus: 'bund.pile', fill: 0.9, maxH: 560, sy: 800, st: STL, pose: 'shock', dur: 0.5 });
  bt(W.bulk, { beat: GH, focus: ['cr4', 'bund'], fill: 0.9, maxH: 980, sy: 800, st: STR, pose: 'point', dur: 0.7 });
  // legal?
  bt(R(W.s5, -0.25), { beat: SB, focus: ['of5', 'tk5'], move: 'whip', fill: 0.62, maxH: 1000, sy: 850, st: STL, pose: 'chin' });
  bt(W.legal, { beat: ZN, focus: 'tk5', fill: 0.78, maxH: 420, sy: 1000, st: STL, pose: 'shock', dur: 0.45 });
  bt(W.like, { beat: PF, focus: 'of5', sy: 780, pose: 'you' });
  // investigates + calendar
  bt(R(W.s6, -0.25), { beat: GH, focus: 'of6', move: 'whip', fill: 0.6, maxH: 800, sy: 880, st: STR, pose: 'point' });
  bt(R(W.weeks, -0.55), { beat: GH, focus: ['of6', 'cal'], fill: 0.97, maxH: 720, sy: 880, st: STL, pose: 'point', dur: 0.7 });
  bt(W.weeks, { beat: ZN, focus: 'cal.date', fill: 0.7, sy: 900, st: STL, pose: 'shock', dur: 0.5 });
  bt(R(W.nobody, -0.2), { beat: GH, focus: 'tk7', move: 'whip', fill: 0.92, maxH: 760, sy: 800, st: STL, pose: 'chin' });
  bt(W.prove, { beat: ZN, focus: 'tk7.q', fill: 0.8, maxH: 420, sy: 780, st: STL, pose: 'shock', dur: 0.45 });
  bt(W.bought, { beat: GH, focus: 'tk7', fill: 0.92, maxH: 760, sy: 800, st: STR, pose: 'idle', dur: 0.7 });
  // paid
  bt(R(W.s8, -0.25), { beat: GH, focus: ['of8', 'cr8', 'npT'], move: 'whip', fill: 0.97, maxH: 720, sy: 800, st: STL, pose: 'idle' });
  bt(W.paid, { beat: ZN, focus: 'of8', fill: 0.8, maxH: 640, sy: 800, st: STR, pose: 'shock', dur: 0.4 });
  bt(W.paidTail, { beat: GH, focus: ['of8', 'cr8', 'npT'], fill: 0.97, maxH: 720, sy: 800, st: STL, pose: 'point', dur: 0.7 });
  // cheque fan
  bt(R(W.s9, -0.3), { beat: GH, focus: 'fan', move: 'whip', fill: 0.92, maxH: 980, sy: 790, st: STL, pose: 'idle' });
  bt(W.oneZN, { beat: ZN, focus: 'fan.value', fill: 0.84, sy: 740, st: STL, pose: 'shock', dur: 0.55 });
  bt(W.year, { beat: GH, focus: 'fan', fill: 0.9, maxH: 980, sy: 780, st: STL, pose: 'idle', dur: 0.7 });
  bt(W.years, { beat: GH, focus: 'fan', fill: 0.92, maxH: 980, sy: 780, st: STR, pose: 'point', dur: 0.8 });
  // salaries
  bt(R(W.sal, -0.25), { beat: SB, focus: 'sal', move: 'whip', sx: 600, sy: 790, fill: 0.84, maxH: 880, st: STL, pose: 'point' });
  bt(W.salaries, { beat: ZN, focus: 'sal.count', fill: 0.6, maxH: 400, sy: 780, st: STL, pose: 'shock', dur: 0.5 });
  bt(W.single, { beat: GH, focus: 'sal', fill: 0.86, maxH: 880, sx: 560, sy: 790, st: STR, pose: 'idle', dur: 0.7 });
  // send + house
  bt(R(W.send, -0.25), { beat: GH, focus: 'hse', move: 'whip', fill: 0.82, maxH: 900, sy: 800, st: STL, pose: 'you' });
  bt(W.wins, { beat: ZN, focus: 'hse.sign', fill: 0.5, maxH: 380, sy: 860, st: STL, pose: 'shock', dur: 0.4 });
  bt(R(W.wins, 0.6), { beat: GH, focus: 'hse', fill: 0.82, maxH: 900, sy: 800, st: STR, pose: 'shrug', dur: 0.7 });
  // new rules
  bt(R(W.then, -0.25), { beat: GH, focus: ['of12', 'book2'], move: 'whip', fill: 0.97, maxH: 760, sy: 800, st: STL, pose: 'point' });
  bt(W.bulk2, { beat: ZN, focus: 'book2', fill: 0.8, maxH: 640, sy: 800, st: STR, pose: 'shock', dur: 0.45 });
  bt(W.problem, { beat: PF, focus: 'book2', sy: 830, zoom: 0.85, pose: 'shrug' });
  // 31 years later
  bt(R(W.y31, -0.2), { beat: SB, focus: 'ycal', move: 'whip', sx: 640, sy: 830, fill: 0.7, maxH: 840, st: 'corner-left', pose: 'point' });
  bt(V.ycalZN === false ? undefined : R(W.later, 0.3), { beat: ZN, focus: 'ycal.year', fill: 0.72, maxH: 400, sy: 700, st: 'corner-left', pose: 'shock', dur: 0.5 });
  bt(R(W.follow, -0.1), { beat: GH, focus: V.followFocus || 'ycal', fill: 0.7, maxH: 840, sx: 520, sy: 830, st: 'corner-left', pose: 'idle', dur: 0.8 });
  // Texas group + combos
  bt(R(W.s15, -0.25), { beat: GH, focus: 'cr15', move: 'whip', fill: 0.7, maxH: 760, sy: 820, st: STL, pose: 'shock' });
  bt(W.comb, { beat: SB, focus: 'cmb', move: 'whip', sx: 560, sy: 800, fill: 0.92, maxH: 900, st: STL, pose: 'point' });
  bt(W.crZN, { beat: ZN, focus: 'cr15', fill: 0.86, maxH: 640, sy: 800, st: STL, pose: 'point', dur: 0.5 });
  bt(W.pctZ, { beat: ZN, focus: 'cmb.pct', fill: 0.6, maxH: 400, sy: 800, st: STL, pose: 'shock', dur: 0.5 });
  if (V.jack !== false) {
    bt(R(W.n95, -0.5), { beat: SB, focus: ['jack', 'jmtn', 'cr17'], move: 'whip', fill: 0.92, maxH: 1080, sy: 800, st: STR, pose: 'shock' });
    bt(W.n95, { beat: ZN, focus: 'jack', fill: 0.94, maxH: 520, sy: 780, st: STR, pose: 'shock', dur: 0.4, lead: 0.12 });
    bt(R(W.n95, 1.6), { beat: GH, focus: ['jack', 'jmtn', 'cr17'], fill: 0.92, maxH: 1080, sy: 800, st: STR, pose: 'shock', dur: 0.8 });
  }
  // sign + final
  bt(W.commS, { beat: SB, focus: ['sign'], move: 'whip', fill: 0.78, maxH: 1040, sy: 800, st: 'corner-left', pose: 'point', dur: 0.8 });
  bt(W.shut, { beat: ZN, focus: 'sign', fill: 0.86, maxH: 560, sy: 760, st: 'corner-left', pose: 'shock', dur: 0.45 });
  bt(W.commission, { beat: GH, focus: ['sign'], fill: 0.78, maxH: 1040, sy: 800, st: 'corner-left', pose: 'idle', dur: 0.8 });
  bt(R(W.q, -0.3), { beat: PF, focus: 'of19', move: 'whip', sy: 780, pose: 'talk' });
  bt(W.pay, { beat: GH, focus: ['of19', 'tk19'], fill: 0.62, maxH: 1000, sy: 850, st: STL, pose: 'point', dur: 0.6 });
  bt(W.yes, { beat: SB, focus: F0e, move: 'whip', fill: 0.9, maxH: V.f0maxH || 900, sx: 540, sy: V.f0sy || 905, st: { x: 130, y: 1410, s: 0.85 }, pose: 'shock', keep: ['hook', 'hook2'] });
  for (const b of beats) { if (b.beat === PF || b.beat === ZN || b.at === 0) continue; b.maxH = Math.min(b.maxH || 860, 860); const lo = 430 + b.maxH / 2, hi = 1330 - b.maxH / 2; b.sy = Math.min(hi, Math.max(lo, b.sy || 880)); }
  // ================================================================ sfx
  const S = [];
  const sx_ = (at, name, gain, dur) => { if (at == null || /undefined/.test(String(at))) return; S.push({ at, name, gain, dur }); };
  S.push({ at: 0, name: 'deep_boom_2', gain: -3, dur: 0.5 }, { at: 0.03, name: 'rubber_stamp_2', gain: -6, dur: 0.5 }, { at: 0.06, name: 'paper_slam_2', gain: -9, dur: 0.5 });
  sx_(W.five, 'pop_2', -9, 0.3); sx_(W.n27, 'money_counter_1', -11, 1.2); sx_(W.n95 && tx ? W.n95 : undefined, 'cinematic_hit_1', -5, 1.2);
  sx_(R(W.s1, -0.25), 'paper_slam_2', -10, 0.5); sx_(W.fund, 'rubber_stamp_2', -8, 0.5); sx_(W.every, 'pop_2', -9, 0.3); sx_(W.vas, 'thud_1', -10, 0.4);
  sx_(W.worked, 'success_chime_1', -11, 1.0); sx_(W.jackpotN, 'money_counter_1', -11, 1.5); sx_(R(W.jackpotN, 1.5), 'cash_register_1', -8, 0.9); sx_(W.record, 'rubber_stamp_2', -8, 0.5);
  sx_(R(W.but, -0.4), 'paper_slam_2', -10, 0.5); sx_(W.licensed, 'typewriter_1', -12, 0.7); sx_(W.store, 'pop_2', -9, 0.3);
  sx_(W.printed, 'swoosh_2', -10, 0.8); sx_(R(W.printed, 0.3), 'coins_drop_1', -13, 1.0);
  sx_(R(W.s5, -0.3), 'paper_slam_2', -10, 0.5); sx_(W.legal, 'pop_1', -9, 0.4); sx_(W.like, 'heartbeat_1', -8, 0.9);
  sx_(R(W.s6, -0.3), 'paper_slam_2', -10, 0.5); sx_(R(W.weeks, 0.3), 'click_1', -9, 0.3); sx_(R(W.weeks, 0.9), 'paper_slam_1', -9, 0.5); sx_(R(W.weeks, 1.6), 'ding_2', -10, 0.7);
  sx_(R(W.nobody, -0.4), 'swoosh_2', -10, 0.6); sx_(W.prove, 'pop_1', -9, 0.4); sx_(W.bought, 'rubber_stamp_2', -7, 0.5);
  sx_(W.paid, 'rubber_stamp_2', -4, 0.5); sx_(W.paid, 'success_chime_1', -11, 1.0);
  sx_(W.year, 'coins_drop_1', -12, 1.1); sx_(W.valAt || W.one, 'ding_2', -8, 0.7);
  sx_(W.sal, 'typewriter_2', -12, 1.0); sx_(W.send, 'swoosh_2', -9, 1.0);
  sx_(W.wins, 'rubber_stamp_2', -7, 0.5); sx_(R(W.wins, 0.9), 'record_scratch_stop_1', -14, 0.6);
  sx_(R(W.then, -0.4), 'paper_slam_2', -10, 0.5); sx_(W.bulk2, 'rubber_stamp_2', -5, 0.5); sx_(W.bulk2, 'thud_2', -8, 0.4);
  sx_(W.problem, 'record_scratch_stop_1', -14, 0.6); sx_(R(W.y31, -0.2), 'paper_slam_2', -10, 0.5); sx_(W.y31, 'clock_ticking_1', -14, 1.2);
  sx_(R(W.follow, 0.5), 'click_1', -8, 0.3); sx_(R(W.follow, 0.58), 'success_chime_1', -12, 1.0);
  sx_(R(W.later, 0.0), 'riser_2', -12, 0.9); sx_(R(W.s15, -0.2), 'paper_slam_2', -10, 0.5); sx_(W.comb, 'typewriter_1', -12, 1.0); sx_(R(W.comb, 2.1), 'cash_register_1', -9, 0.9);
  if (V.jack !== false) { sx_(R(W.n95, -0.3), 'sub_drop_1', -8, 1.2); sx_(W.n95, 'cinematic_hit_1', -3, 1.2); sx_(W.n95, 'deep_boom_1', -3, 1.4); sx_(R(W.n95, 0.1), 'cash_register_1', -8, 0.9); }
  sx_(W.shut, 'door_slam_1', -5, 0.8); sx_(R(W.commission, 0.1), 'rubber_stamp_2', -6, 0.5);
  sx_(W.q, 'pop_1', -9, 0.5); sx_(W.yes, 'rewind_2', -11, 0.9);
  return {
    series: 'whatif', title: V.title || 'PART 2 · LOTTERY · 1992', duration: V.duration,
    footnote: ['THE 1992 PURCHASE WAS LEGAL AND VIRGINIA PAID · SOURCES: UPI · WASHINGTON POST · ROANOKE TIMES (1992)', 'VIRGINIAN-PILOT (1997) · KUT · HOUSTON CHRONICLE · LOTTERYUSA (TEXAS 2023) · ~$65K = ROUGH TYPICAL US SALARY', 'ILLUSTRATIONS: THE FUND · THE OFFICIAL · TICKETS · CHEQUE · RULEBOOK · SIGN · PHOTO: LIBRARY OF CONGRESS (NO KNOWN RESTRICTIONS)'],
    elements: els, beats, poses: [[R(W.follow, -0.1), 'follow', { target: [830, 1010] }], [R(W.follow, 1.5), 'talk']], shakes: V.shakes, captions: V.captions, bed: V.bed || { name: 'tense_bed_2', gain: -1 }, sfx: S,
  };
};
// IG/FB cut v3 (63.89 s narration) — opens on "Virginia had to pay a lottery crew $27 f***ing million"
BM2.scene(LOT({
  n27: '@$27', pay0: '@pay', hookOut: '@This', endAt: '@One', reframe: '@crew', tickets: '@$27',
  s1: '@This', fund: '@Australian', tried: '@bought', every: '@every', vas: '@This',
  s2: '@yeah', worked: '@yeah', jackpot: '@jackpot', jackpotN: '@jackpot', record: '@record',
  but: '@But', licensed: '@licensed', store: '@store',
  s4: '@these', printed: '@printed', bulk: '@bulk',
  s5: '@Double', legal: '@taken', like: '@tap',
  s6: '@Virginia#2', weeks: '@weeks', nobody: '@Nobody', prove: '@prove', bought: '@single',
  s8: '@broken', paid: '@paid',
  s9: '@million#3', valAt: '@million#3', year: '@year', years: '@years', twenty: '@20',
  sal: "@That's", salaries: '@salaries', single: '@math',
  send: '@Send', wins: '@wins',
  then: '@Then', rushed: '@rushed', bulk2: '@bulk#2', problem: '@Problem',
  y31: '@31', later: '@later', follow: '@Follow',
  s15: '@group', nearly: '@nearly', crZN: '@They#4', comb: '@nearly',
  n95: '@95', commS: '@result', shut: '@shut', commission: '@commission',
  q: '@Genius', pay: '@greedy', yes: '@One',
}, {
  open: 'chq', duration: 64.29, jack: true, title: 'PART 2 · LOTTERY · 1992', likeText: 'DOUBLE TAP', s1both: true, vasBeat: false, ycalZN: false, flipOff: 0.2, flipDur: 0.7, followFocus: 'cr15',
  hook: { stamp: 'PART 2', lines: [[['VIRGINIA HAD TO PAY', 'paper']], [['$27 MILLION', 'good']], [['TO A LOTTERY CREW', 'gold']]], size: 88 },
  vsLines: [[['BOUGHT 5M+ TICKETS', 'gold']]], vsSize: 66, everyLines: [[['ALMOST EVERY COMBO', 'bad']]],
  legalLines: [[['WOULD ', 'paper'], ['YOU?', 'gold']]],
  askL1: 'GENIUS OR GREEDY?', askL2: 'ONE WORD',
  labels: [{ at: -1, text: 'THE BILL' }, { at: '@This', text: 'THE BUY' }, { at: '@But', text: 'THE SNAG' }, { at: '@Virginia#2', text: 'THE VERDICT' }, { at: '@paid', text: 'THE PAYOUT' }, { at: '@Then', text: 'THE FIX' }, { at: '@31', text: 'THE REPEAT' }, { at: '@result', text: 'THE FALLOUT' }, { at: '@One', text: 'THE BILL' }],
  items: [{ at: 0, label: 'VIRGINIA HAD TO PAY', from: 0, to: 27000000, prefix: '$', dur: 3.2, tone: 'good' }, { at: '@over', label: 'TICKETS BOUGHT', from: 0, to: 5000000, dur: 1.4, suffix: '+' }, { at: '@weeks', label: 'WEEKS OF DOUBT', from: 0, to: 3, dur: 0.6 }, { at: '@$1', label: 'PAID EACH YEAR', from: 0, to: 1300000, prefix: '$', dur: 1.0, tone: 'good' }, { at: '@salaries', label: 'NORMAL SALARIES', from: 0, to: 20, dur: 1.2 }, { at: '@31', label: 'YEARS LATER', from: 0, to: 31, dur: 1.0, tone: 'bad' }, { at: '@95', label: 'TEXAS JACKPOT', from: 0, to: 95000000, prefix: '$', dur: 1.2, tone: 'good' }, { at: '@One+0.1', label: 'VIRGINIA HAD TO PAY', from: 0, to: 27000000, prefix: '$', dur: 1.2, tone: 'good' }],
  shakes: [[0.05, 14], ['@$27', 14], ['@record', 8], ['@paid', 10], ['@bulk#2', 10], ['@95', 26], ['@shut', 14]],
  captions: { gap: 16, emph: { '$27': 'good', '$1.3': 'good', paid: 'good', '31': 'bad', '$95': 'good', broken: 'bad', record: 'accent', commission: 'bad', 'F***ING': 'bad' }, fix: [['$27', '$27'], ['fucking', 'F***ING'], ['$1', '$1.3'], ['95', '$95']] },
}));
