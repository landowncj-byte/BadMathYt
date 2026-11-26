// videos/_lib/kit.js — generic crime-show props for the 2026-12 batch (static icons for tile/board notes + animated recipes)
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, countAt, hash, hit } = B;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const pop = (t, o = 'snappy') => clamp(spring(Math.max(0, t), o), 0, 1.25);
  const P = (g, pts, c, st, lw) => { g.beginPath(); pts.forEach((p, i) => i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); g.closePath(); g.fillStyle = c; g.fill(); if (st) { g.strokeStyle = st; g.lineWidth = lw || 4; g.lineJoin = 'round'; g.stroke(); } };
  const E = (g, x, y, rx, ry, c, st, lw) => { g.beginPath(); g.ellipse(x, y, rx, ry, 0, 0, 7); g.fillStyle = c; g.fill(); if (st) { g.strokeStyle = st; g.lineWidth = lw || 4; g.stroke(); } };
  const RR = (g, x, y, w, h, r, c, st, lw) => { g.beginPath(); g.roundRect(x, y, w, h, r); g.fillStyle = c; g.fill(); if (st) { g.strokeStyle = st; g.lineWidth = lw || 4; g.stroke(); } };
  const INK = '#1b2028';
  // ---- gem (shared): faceted diamond centred at 0,0 width w
  const gem = (g, w, tilt = 0) => { g.save(); g.rotate(tilt); const h = w * 0.82, a = [[-w / 2, -h * 0.18], [-w * 0.3, -h / 2], [w * 0.3, -h / 2], [w / 2, -h * 0.18], [0, h / 2]];
    P(g, a, '#8ED8F2', INK, Math.max(2, w * 0.05)); P(g, [[-w / 2, -h * 0.18], [w / 2, -h * 0.18], [0, h / 2]], '#5CBBE0'); P(g, [[-w * 0.3, -h / 2], [-w * 0.1, -h * 0.18], [0, -h / 2]], '#D3F3FF'); P(g, [[w * 0.3, -h / 2], [w * 0.1, -h * 0.18], [0, -h / 2]], '#BDEBFA');
    g.strokeStyle = INK; g.lineWidth = Math.max(2, w * 0.04); g.beginPath(); g.moveTo(-w * 0.3, -h / 2); g.lineTo(-w * 0.1, -h * 0.18); g.lineTo(0, h / 2); g.moveTo(w * 0.3, -h / 2); g.lineTo(w * 0.1, -h * 0.18); g.lineTo(0, h / 2); g.moveTo(-w / 2, -h * 0.18); g.lineTo(w / 2, -h * 0.18); g.stroke(); g.restore(); };
  B.gem = gem;
  const sandwich = (g, th, bite = true) => { RR(g, -50, 14, 100, 24, 11, '#D9A55B', INK, 4); RR(g, -46, 2, 92, 14, 6, '#5fae48', INK, 3);
    for (const [x, y] of [[-30, -2], [0, 0], [30, -2]]) { E(g, x, y, 21, 11, '#B3402F', INK, 3); E(g, x - 6, y - 2, 3, 2, '#F0C0B0'); E(g, x + 6, y + 2, 3, 2, '#F0C0B0'); }
    g.beginPath(); g.moveTo(-50, -8); g.quadraticCurveTo(-52, -44, 0, -46); g.quadraticCurveTo(52, -44, 50, -8); g.closePath(); g.fillStyle = '#E8B66C'; g.fill(); g.strokeStyle = INK; g.lineWidth = 4; g.stroke();
    if (bite) { for (const [x, y, r] of [[40, -30, 17], [26, -42, 14], [49, -14, 12]]) { g.beginPath(); g.arc(x, y, r, 0, 7); g.fillStyle = th.paper; g.fill(); } } };
  const trashbag = (g, th, k = 0) => { g.save(); g.rotate(0.05 * Math.sin(k * 9)); g.beginPath(); g.moveTo(-14, -62); g.quadraticCurveTo(-60, -40, -62, 14); g.quadraticCurveTo(-62, 56, 0, 58); g.quadraticCurveTo(62, 56, 62, 14); g.quadraticCurveTo(60, -40, 14, -62); g.closePath(); g.fillStyle = '#232a33'; g.fill(); g.strokeStyle = INK; g.lineWidth = 4; g.stroke();
    g.strokeStyle = 'rgba(255,255,255,.18)'; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.moveTo(-36, -10); g.quadraticCurveTo(-42, 20, -26, 38); g.stroke();
    P(g, [[-14, -62], [-30, -90], [-10, -78], [0, -96], [10, -78], [30, -90], [14, -62]], '#232a33', INK, 4); RR(g, -16, -66, 32, 9, 4, '#E0281E', INK, 3); g.restore(); };
  const keycard = (g, th) => { g.save(); g.rotate(-0.12); RR(g, -50, -32, 100, 64, 8, '#f4f0e4', INK, 4); g.fillStyle = th.navy; g.fillRect(-48, -30, 96, 18); g.fillStyle = INK; g.fillRect(-36, 2, 44, 6); g.fillRect(-36, 14, 64, 5); E(g, 32, -2, 9, 9, '#c9ccd2', INK, 3); g.restore(); };
  const building = (g, th) => { RR(g, -58, -44, 116, 92, 4, '#8f98a8', INK, 4); P(g, [[-66, -44], [0, -78], [66, -44]], '#59647a', INK, 4); for (let i = 0; i < 4; i++) RR(g, -44 + i * 24, -30, 14, 50, 3, '#e9edf5', INK, 3); RR(g, -14, 22, 28, 26, 3, '#2c3e66', INK, 3); g.fillStyle = INK; g.fillRect(-64, 48, 128, 6); };
  const match = (g, th) => { g.save(); g.rotate(-0.5); RR(g, -6, -20, 12, 90, 5, '#d9a55b', INK, 3); E(g, 0, -28, 14, 18, '#E0281E', INK, 3); g.beginPath(); g.moveTo(0, -80); g.quadraticCurveTo(26, -52, 0, -34); g.quadraticCurveTo(-26, -52, 0, -80); g.fillStyle = '#FFB020'; g.fill(); g.beginPath(); g.moveTo(0, -62); g.quadraticCurveTo(12, -48, 0, -38); g.quadraticCurveTo(-12, -48, 0, -62); g.fillStyle = '#FFE27A'; g.fill(); g.restore(); };
  const helix = (g, th) => { for (let s = -1; s <= 1; s += 2) { g.beginPath(); for (let i = 0; i <= 40; i++) { const y = -50 + i * 2.5, x = s * 26 * Math.sin(i * 0.28); i ? g.lineTo(x, y) : g.moveTo(x, y); } g.strokeStyle = s < 0 ? '#2c3e66' : '#E0281E'; g.lineWidth = 8; g.lineCap = 'round'; g.stroke(); } g.strokeStyle = '#59606B'; g.lineWidth = 4; for (let i = 0; i < 9; i++) { const y = -46 + i * 11.5, x = 26 * Math.sin((y + 50) / 2.5 * 0.28); g.beginPath(); g.moveTo(-x, y); g.lineTo(x, y); g.stroke(); } };
  const pin = (g, th) => { g.beginPath(); g.moveTo(0, 56); g.quadraticCurveTo(-46, -4, -40, -24); g.arc(0, -26, 40, Math.PI, 0); g.quadraticCurveTo(46, -4, 0, 56); g.closePath(); g.fillStyle = '#E0281E'; g.fill(); g.strokeStyle = INK; g.lineWidth = 4; g.stroke(); E(g, 0, -26, 15, 15, '#F5F3EE', INK, 3); };
  const vaulticon = (g, th) => { E(g, 0, 0, 56, 56, '#8f98a8', INK, 5); E(g, 0, 0, 42, 42, '#6c7686', INK, 4); E(g, 0, 0, 10, 10, '#c9ccd2', INK, 3); g.strokeStyle = '#c9ccd2'; g.lineWidth = 7; g.lineCap = 'round'; for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; g.beginPath(); g.moveTo(Math.cos(a) * 12, Math.sin(a) * 12); g.lineTo(Math.cos(a) * 34, Math.sin(a) * 34); g.stroke(); } };
  const drawerIcon = (g, th) => { for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) { RR(g, -50 + c * 35, -50 + r * 35, 30, 30, 4, '#9aa3b2', INK, 3); RR(g, -42 + c * 35, -38 + r * 35, 14, 5, 2, '#2b3340'); } };
  const bag2 = (g, th) => trashbag(g, th, 0);
  const calIcon = (g, th) => { RR(g, -52, -46, 104, 96, 8, '#F5F3EE', INK, 4); g.fillStyle = '#E0281E'; g.fillRect(-50, -44, 100, 26); txt(g, 'FEB', 0, -31, F.hero(22), '#fff'); txt(g, '2003', 0, 14, F.hero(38), INK); };
  const envelope = (g, th) => { RR(g, -50, -32, 100, 64, 6, '#F5F3EE', INK, 4); g.strokeStyle = INK; g.lineWidth = 4; g.beginPath(); g.moveTo(-48, -30); g.lineTo(0, 6); g.lineTo(48, -30); g.stroke(); txt(g, '$', 0, 16, F.hero(28), '#00A152'); };
  const court = (g, th) => { P(g, [[-60, -34], [0, -66], [60, -34]], '#8f98a8', INK, 4); for (let i = 0; i < 4; i++) RR(g, -48 + i * 29, -30, 16, 70, 3, '#e9edf5', INK, 3); RR(g, -62, 40, 124, 14, 3, '#59647a', INK, 3); };
  const bars = (g, th) => { for (let i = 0; i < 5; i++) RR(g, -48 + i * 22, -50, 12, 100, 4, '#2b3340', '#0b0d11', 2); RR(g, -56, -56, 112, 10, 3, '#59606B'); RR(g, -56, 46, 112, 10, 3, '#59606B'); };
  B.extraIcons = Object.assign(B.extraIcons || {}, { sandwich: (g, th) => sandwich(g, th, true), sandwich_full: (g, th) => sandwich(g, th, false), trashbag, keycard, building, match, helix, pin, vaulticon, drawerIcon, bag2, calIcon, envelope, court, bars, gem: (g) => gem(g, 90) });
  B.sandwichDraw = sandwich;

  // ---- generic paper tile with a (static or animated) icon + caption + stamp, free size. icon names: any B.extraIcons / crime icon
  B.register('prop', {
    defaults: { icon: 'sandwich', caption: '', w: 340, h: 380, iconS: 190, stamp: '', stampAt: 99999, stampSize: 40, tone: 'bad', tilt: 0, slam: false, wobble: false, cap: 36, sub: '', fill: null, x2: null },
    size: p => [p.w, p.h], ownEnter: true,
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, k = pop(lt, p.slam ? 'heavy' : 'bouncy'); g.save(); g.translate(0, p.slam ? (1 - k) * -360 : (1 - k) * 120); g.rotate(p.tilt + (1 - k) * (p.slam ? 0.2 : 0.15)); g.globalAlpha *= clamp(lt / 0.08 + 0.2);
      paper(g, -p.w / 2, -p.h / 2, p.w, p.h, 16, { lift, fill: p.fill || undefined }); g.save(); g.translate(0, -p.h * (p.caption ? 0.08 : 0)); g.save(); g.scale(p.iconS / 100, p.iconS / 100); if (p.wobble) g.rotate(0.06 * Math.sin(t * 7)); B.crimeIcon(g, p.icon, 100, theme); g.restore(); g.restore();
      if (p.caption) txt(g, p.caption, 0, p.h / 2 - (p.sub ? 56 : 40), F.hero(p.cap), theme.ink); if (p.sub) txt(g, p.sub, 0, p.h / 2 - 24, F.mono(17), theme.inkSoft);
      if (p.stamp) B.crimeStamp(g, theme, t, { text: p.stamp, at: p.stampAt, tone: p.tone, size: p.stampSize, rot: -0.13, y: -p.h * 0.05 });
      if (p.slam) burst(g, 0, p.h * 0.1, p.w * 0.6, theme.gold, lt - 0.2, 12, 0.4); g.restore();
    },
  });

  // ---- drawers: wall of small safe-deposit drawers; drawer i slides open at p.open[i] (absolute secs). empty drawers show a dark hole
  B.register('drawers', {
    defaults: { cols: 6, rows: 5, w: 880, h: 760, open: [], label: 'SAFE-DEPOSIT BOXES', sub: 'LOCKED DRAWERS YOU RENT', first: 0, hero: -1 }, size: p => [p.w, p.h], ownEnter: true,
    anchors: p => ({ wall: [0, 30, p.w * 0.9, p.h * 0.75], head: [0, -p.h / 2 + 60, p.w, 110] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, k = pop(lt, 'snappy'); g.save(); g.scale(0.9 + 0.1 * k, 0.9 + 0.1 * k); g.globalAlpha *= clamp(lt / 0.1 + 0.2);
      paper(g, -w / 2, -h / 2, w, h, 22, { lift, fill: '#aeb6c4' }); g.save(); rr(g, -w / 2, -h / 2, w, h, 22); g.clip(); g.fillStyle = theme.navy; g.fillRect(-w / 2, -h / 2, w, 120); g.restore();
      txt(g, p.label, 0, -h / 2 + 52, F.hero(54), theme.paper); txt(g, p.sub, 0, -h / 2 + 96, F.mono(19), 'rgba(245,243,238,.8)');
      const cw = (w - 80) / p.cols, ch = (h - 190) / p.rows, gx = -w / 2 + 40, gy = -h / 2 + 150;
      for (let r = 0; r < p.rows; r++) for (let c = 0; c < p.cols; c++) { const i = r * p.cols + c, at = p.open[i] ?? 99999, o = t - at, u = o > 0 ? ease.out(clamp(o / 0.22)) : 0, x = gx + c * cw, y = gy + r * ch;
        RR(g, x + 5, y + 5, cw - 10, ch - 10, 5, '#2b3340'); if (u > 0) { g.fillStyle = '#10141a'; g.fillRect(x + 9, y + 9, cw - 18, ch - 18); }
        g.save(); g.translate(0, u * (ch * 0.42)); RR(g, x + 7, y + 6, cw - 14, ch - 14 - u * 8, 5, '#c4cbd7', '#59606B', 2); RR(g, x + cw / 2 - 12, y + ch * 0.55, 24, 7, 3, '#59647a'); E(g, x + 16, y + 17, 3.5, 3.5, '#59606B'); g.restore(); if (u > 0 && o < 0.5) burst(g, x + cw / 2, y + ch / 2, cw * 0.5, theme.paper, o, 6, 0.4); }
      g.restore();
    },
  });

  // ---- locks: security layers stack (door / lock / alarm); item i appears at p.at[i]
  B.register('locks', {
    defaults: { w: 640, h: 820, at: [0, 0, 0], names: ['VAULT DOOR', 'COMBINATION LOCK', 'ALARM SYSTEM'], head: 'THE VAULT', sub: 'LAYER AFTER LAYER' }, size: p => [p.w, p.h], ownEnter: true,
    anchors: p => ({ stack: [0, 60, p.w * 0.9, p.h * 0.7] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, k = pop(lt, 'snappy'); g.save(); g.scale(0.92 + 0.08 * k, 0.92 + 0.08 * k); g.globalAlpha *= clamp(lt / 0.1 + 0.2); paper(g, -w / 2, -h / 2, w, h, 22, { lift });
      g.save(); rr(g, -w / 2, -h / 2, w, h, 22); g.clip(); g.fillStyle = theme.navy; g.fillRect(-w / 2, -h / 2, w, 110); g.restore(); txt(g, p.head, 0, -h / 2 + 50, F.hero(58), theme.paper); txt(g, p.sub, 0, -h / 2 + 90, F.mono(19), 'rgba(245,243,238,.8)');
      for (let i = 0; i < 3; i++) { const o = t - p.at[i], u = pop(o, 'bouncy'), y = -h / 2 + 250 + i * 212; if (o < 0) continue; g.save(); g.translate(0, y + (1 - Math.min(1, u)) * -120); g.scale(0.6 + 0.4 * Math.min(1, u), 0.6 + 0.4 * Math.min(1, u)); RR(g, -w / 2 + 34, -92, w - 68, 184, 14, '#e7e2d6', '#c9c3b3', 3);
        g.save(); g.translate(-w / 2 + 130, 0); g.scale(1.35, 1.35);
        if (i === 0) { vaulticon(g, theme); } else if (i === 1) { RR(g, -30, -6, 60, 46, 8, '#F2B705', INK, 4); g.strokeStyle = INK; g.lineWidth = 8; g.beginPath(); g.arc(0, -6, 20, Math.PI, 0); g.stroke(); E(g, 0, 16, 6, 6, INK); } else { P(g, [[-34, 30], [-34, -4], [-18, -4], [-18, -34], [18, -34], [18, -4], [34, -4], [34, 30]], '#E0281E', INK, 4); E(g, 0, 8, 10, 10, '#F5F3EE', INK, 3); }
        g.restore(); txt(g, p.names[i], -w / 2 + 230, 0, F.hero(40), theme.ink, 'left'); const kk = clamp((t - p.at[i] - 0.2) / 0.15); if (kk > 0) { g.save(); g.translate(w / 2 - 90, 0); g.strokeStyle = '#00A152'; g.lineWidth = 12; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); g.moveTo(-20, 2); g.lineTo(-6, 16); g.lineTo(kk >= 1 ? 22 : lerp(-6, 22, clamp((kk - .5) * 2)), kk >= 1 ? -18 : lerp(16, -18, clamp((kk - .5) * 2))); g.stroke(); g.restore(); } g.restore(); }
      g.restore();
    },
  });

  // ---- checklist: rows [{t, at (tick time), todo:true => unticked, red:true}] + big icon at the side; crackAt draws a crack across the card
  B.register('checklist', {
    defaults: { w: 760, h: 700, head: 'THE PLAN', rows: [], icon: '', iconAt: 0, crackAt: 99999, crackX: 0.5, foot: '' }, size: p => [p.w, p.h], ownEnter: true,
    anchors: p => ({ last: [0, -p.h / 2 + 240 + (p.rows.length - 1) * 150, p.w * 0.92, 130], head: [0, -p.h / 2 + 60, p.w, 110] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, k = pop(lt, 'snappy'); g.save(); g.scale(0.92 + 0.08 * k, 0.92 + 0.08 * k); g.globalAlpha *= clamp(lt / 0.1 + 0.2); paper(g, -w / 2, -h / 2, w, h, 22, { lift });
      g.save(); rr(g, -w / 2, -h / 2, w, h, 22); g.clip(); g.fillStyle = theme.navy; g.fillRect(-w / 2, -h / 2, w, 110); g.restore(); txt(g, p.head, 0, -h / 2 + 56, F.hero(62), theme.paper);
      p.rows.forEach((r, i) => { const y = -h / 2 + 200 + i * 150, o = t - (r.show ?? -1); if (o < 0) return; const u = pop(o, 'snappy'); g.save(); g.translate((1 - Math.min(1, u)) * -80, y); g.globalAlpha *= clamp(o / 0.1);
        RR(g, -w / 2 + 40, -44, 88, 88, 14, '#fff', INK, 6); const tk = clamp((t - (r.at ?? 99999)) / 0.2); if (tk > 0 && !r.todo) { g.strokeStyle = '#00A152'; g.lineWidth = 14; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); g.moveTo(-w / 2 + 62, 2); g.lineTo(-w / 2 + 82, 24); g.lineTo(lerp(-w / 2 + 82, -w / 2 + 118, clamp((tk - 0.4) / 0.6)), lerp(24, -26, clamp((tk - 0.4) / 0.6))); g.stroke(); }
        if (r.todo) { txt(g, '?', -w / 2 + 84, 4, F.hero(60), theme.badInk); }
        txt(g, r.t, -w / 2 + 160, 0, F.hero(r.size || 64), r.todo ? theme.badInk : theme.ink, 'left'); if (r.todo && t > (r.at ?? 99999)) { const cx = lerp(0, 1, clamp((t - r.at) / 0.25)); g.strokeStyle = theme.badInk; g.lineWidth = 9; g.beginPath(); g.moveTo(-w / 2 + 156, 4); g.lineTo(-w / 2 + 156 + (mw(r.t, F.hero(r.size || 64)) + 10) * cx, 4); g.stroke(); }
        g.restore(); });
      if (p.icon) { const o = t - p.iconAt; if (o > 0) { g.save(); g.translate(w / 2 - 130, h / 2 - 140); const u = pop(o, 'bouncy'); g.scale(2.1 * u, 2.1 * u); g.rotate(0.04 * Math.sin(t * 8)); B.crimeIcon(g, p.icon, 100, theme); g.restore(); } }
      if (p.foot) txt(g, p.foot, 0, h / 2 - 30, F.mono(18), theme.inkSoft);
      const co = t - p.crackAt; if (co > 0) { const u = ease.out(clamp(co / 0.35)); g.save(); g.strokeStyle = '#10141a'; g.lineWidth = 7; g.lineJoin = 'round'; g.beginPath(); const x0 = p.crackX * w - w / 2; const pts = [[x0, -h / 2], [x0 + 24, -h / 2 + 120], [x0 - 18, -h / 2 + 240], [x0 + 30, -h / 2 + 370], [x0 - 12, -h / 2 + 500], [x0 + 20, h / 2]]; const n = Math.max(1, Math.floor(u * (pts.length - 1))); g.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i <= n; i++) g.lineTo(pts[i][0], pts[i][1]); g.stroke(); g.restore(); }
      g.restore();
    },
  });

  // ---- paygrid: tiny envelopes fill a grid (each = a century of paychecks); counter shows years
  B.register('paygrid', {
    defaults: { w: 820, h: 760, at: 0, dur: 2.0, n: 1000, head: '$100K A YEAR', cols: 40, unit: 'YEARS OF PAYCHECKS', numAt: 0 }, size: p => [p.w, p.h], ownEnter: true,
    anchors: p => ({ grid: [0, -40, p.w * 0.92, p.h * 0.5], num: [0, p.h / 2 - 160, p.w * 0.9, 200] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, k = pop(lt, 'snappy'); g.save(); g.scale(0.92 + 0.08 * k, 0.92 + 0.08 * k); g.globalAlpha *= clamp(lt / 0.1 + 0.2); paper(g, -w / 2, -h / 2, w, h, 22, { lift });
      g.save(); rr(g, -w / 2, -h / 2, w, h, 22); g.clip(); g.fillStyle = theme.navy; g.fillRect(-w / 2, -h / 2, w, 120); g.restore(); txt(g, p.head, 0, -h / 2 + 62, F.hero(70), theme.paper);
      const cols = p.cols, rows = Math.ceil(p.n / cols), cw = (w - 80) / cols, ch = Math.min(cw * 0.78, 400 / rows), gx = -w / 2 + 40, gy = -h / 2 + 160, n = ease.inOut(clamp(lin(t, p.at, p.at + p.dur))) * p.n;
      for (let i = 0; i < p.n; i++) { const x = gx + (i % cols) * cw, y = gy + Math.floor(i / cols) * ch; if (i < n) { g.fillStyle = i < n - 12 ? '#2FAE72' : '#7be0b0'; g.fillRect(x + 1, y + 1, cw - 2, ch - 2); } else { g.fillStyle = 'rgba(0,0,0,.08)'; g.fillRect(x + 1, y + 1, cw - 2, ch - 2); } }
      const v = Math.round(n), nt = t - p.numAt; if (nt > -0.01) { const o = { font: F.hero(170), size: 170, color: theme.badInk, speed: p.n / p.dur * 0.5, align: 'left' }; const nw = B.rollWidth(g, p.n, o).w, uw = mw(' ' + p.unit.split(' ')[0], F.hero(70)); const tot = nw + uw; g.save(); g.translate(0, h / 2 - 190); roll(g, countAt(Math.max(0, t - p.at), p.dur, 0, p.n), -tot / 2, 0, o); txt(g, ' ' + p.unit.split(' ')[0], -tot / 2 + nw, 36, F.hero(70), theme.badInk, 'left'); g.restore(); }
      txt(g, p.unit.split(' ').slice(1).join(' '), 0, h / 2 - 44, F.mono(22), theme.inkSoft); g.restore();
    },
  });

  // ---- pile: diamonds pour into a pile (count gems from p.at over p.dur); fadeAt turns them into dashed outlines
  B.register('pile', {
    defaults: { w: 760, h: 620, at: 0, dur: 1.4, n: 46, tag: '', fadeAt: 99999, label: '' }, size: p => [p.w, p.h], ownEnter: true,
    anchors: p => ({ heap: [0, 40, p.w * 0.8, p.h * 0.7], tag: [0, -p.h / 2 + 40, 300, 70] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, k = pop(lt, 'snappy'); g.save(); g.scale(0.92 + 0.08 * k, 0.92 + 0.08 * k); g.globalAlpha *= clamp(lt / 0.1 + 0.2); paper(g, -w / 2, -h / 2, w, h, 22, { lift, fill: '#2c3e66' });
      const n = clamp(lin(t, p.at, p.at + p.dur)) * p.n, fade = clamp((t - p.fadeAt) / 0.8);
      for (let i = 0; i < p.n; i++) { if (i > n) break; const hh = hash(i * 3.3), hh2 = hash(i * 7.1), row = Math.floor(Math.sqrt(i * 1.6)), x = (hh - 0.5) * (w * 0.62) * (1 - row * 0.045), y = h * 0.3 - row * 38 - hh2 * 30 + (1 - ease.out(clamp((n - i) / 5))) * -300, s = 56 + hh2 * 34;
        g.save(); g.translate(x, y); g.globalAlpha *= 1 - fade * 0.85; if (fade > 0) { g.setLineDash([8, 8]); g.strokeStyle = '#F5F3EE'; g.lineWidth = 4; g.beginPath(); g.moveTo(-s / 2, -s * 0.15); g.lineTo(-s * 0.3, -s * 0.41); g.lineTo(s * 0.3, -s * 0.41); g.lineTo(s / 2, -s * 0.15); g.lineTo(0, s * 0.41); g.closePath(); g.stroke(); g.setLineDash([]); g.globalAlpha *= 0.4 + 0.6 * (1 - fade); } gem(g, s, (hh - 0.5) * 0.7); g.restore(); }
      if (p.tag) { const tk = pop(t - p.at - 0.3, 'snappy'); g.save(); g.translate(0, -h / 2 + 62); g.scale(tk, tk); g.rotate(-0.03); g.fillStyle = theme.paper; rr(g, -190, -34, 380, 68, 10); g.fill(); txt(g, p.tag, 0, 2, F.hero(40), theme.badInk); g.restore(); }
      if (p.label) txt(g, p.label, 0, h / 2 - 34, F.mono(22), 'rgba(245,243,238,.8)'); g.restore();
    },
  });

  // ---- keycardswipe: reader + card sliding through, door opens, calendar flips; for "come and go for a long time"
  B.register('swipe', {
    defaults: { w: 820, h: 640, at: 0, flipAt: 0, head: 'IN AND OUT', foot: 'FOR A LONG TIME' }, size: p => [p.w, p.h], ownEnter: true,
    anchors: p => ({ door: [-p.w * 0.2, 20, 300, 420], cal: [p.w * 0.25, 20, 280, 340] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, k = pop(lt, 'snappy'); g.save(); g.scale(0.92 + 0.08 * k, 0.92 + 0.08 * k); g.globalAlpha *= clamp(lt / 0.1 + 0.2); paper(g, -w / 2, -h / 2, w, h, 22, { lift });
      g.save(); rr(g, -w / 2, -h / 2, w, h, 22); g.clip(); g.fillStyle = theme.navy; g.fillRect(-w / 2, -h / 2, w, 100); g.restore(); txt(g, p.head, 0, -h / 2 + 50, F.hero(56), theme.paper);
      // door + reader
      const u = ease.inOut(clamp((t - p.at - 0.5) / 0.4)), dx = -w * 0.2; g.save(); g.translate(dx, 40); RR(g, -120, -170, 240, 340, 8, '#59647a', INK, 5); g.save(); g.beginPath(); g.rect(-110, -160, 220, 320); g.clip(); g.fillStyle = '#10141a'; g.fillRect(-110, -160, 220, 320); g.save(); g.translate(-110, 0); g.transform(1 - u * 0.85, 0, 0, 1, 0, 0); RR(g, 0, -160, 220, 320, 6, '#c8a06a', INK, 4); E(g, 190, 10, 9, 9, '#F2B705', INK, 3); g.restore(); g.restore();
      g.translate(150, -10); RR(g, -22, -50, 44, 100, 8, '#2b3340', INK, 3); E(g, 0, -26, 7, 7, u > 0.1 ? '#00D26A' : '#E0281E'); const sw = ease.inOut(clamp((t - p.at - 0.1) / 0.4)); g.save(); g.translate(-40 + 30 * 0, -60 + sw * 100); g.rotate(-0.1); RR(g, -38, -26, 76, 50, 6, '#f4f0e4', INK, 3); g.fillStyle = theme.navy; g.fillRect(-36, -24, 72, 12); g.restore(); g.restore();
      // calendar pages flipping
      g.save(); g.translate(w * 0.25, 30); RR(g, -130, -150, 260, 300, 10, '#F5F3EE', INK, 5); g.fillStyle = '#E0281E'; g.fillRect(-128, -148, 256, 56); const fl = Math.max(0, t - p.flipAt), pg = Math.floor(fl / 0.13) % 8; txt(g, ['MON', 'TUE', 'WED', 'THU', 'FRI', 'MON', 'TUE', 'WED'][pg], 0, -120, F.hero(40), '#fff'); txt(g, String(3 + (fl > 0 ? Math.min(28, Math.floor(fl / 0.13) * 4) : 0)), 0, 0, F.hero(150), theme.ink); if (fl > 0 && fl < 1.1) { g.globalAlpha = 0.3; g.fillStyle = INK; g.fillRect(-120, -30 + 80 * ((fl * 7.7) % 1), 240, 6); } g.restore();
      txt(g, p.foot, 0, h / 2 - 44, F.hero(60), theme.badInk); g.restore();
    },
  });

  // ---- plain big place card: photo in paper frame is handled by 'photo'. 'split': two cards with VS
  B.register('split', {
    defaults: { w: 900, h: 640, a: { icon: 'match', label: 'BURN THE BAG' }, b: { icon: 'sandwich', label: 'EAT THE SANDWICH' }, vsAt: 0 }, size: p => [p.w, p.h], ownEnter: true,
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, k = pop(lt, 'snappy'); g.save(); g.scale(0.92 + 0.08 * k, 0.92 + 0.08 * k); g.globalAlpha *= clamp(lt / 0.1 + 0.2);
      [[p.a, -w / 4, -0.03], [p.b, w / 4, 0.03]].forEach(([c, x, rot], i) => { g.save(); g.translate(x, 0); g.rotate(rot); paper(g, -w / 4 + 12, -h / 2, w / 2 - 24, h, 20, { lift }); g.save(); g.translate(0, -50); g.scale(2.2, 2.2); B.crimeIcon(g, c.icon, 100, theme); g.restore(); txt(g, c.label, 0, h / 2 - 60, F.hero(c.size || 46), theme.ink); g.restore(); });
      const vs = pop(t - p.vsAt, 'bouncy'); g.save(); g.scale(vs, vs); g.fillStyle = theme.badInk; g.beginPath(); g.arc(0, 0, 66, 0, 7); g.fill(); g.strokeStyle = theme.paper; g.lineWidth = 8; g.stroke(); txt(g, 'VS', 0, 4, F.hero(60), theme.paper); g.restore(); g.restore();
    },
  });
})();
