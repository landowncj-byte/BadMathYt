// videos/_lib/lib.js — shared recipes for the 2026-12 crime-show batch (hook, plane/heart/mag CTA moments, slamstamp, gavel, hud, nope). Copied from fake-prince/_src.
// reused CTA micro-moment recipes (from Tucker payday): plane, heart, mag
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
  B.register('mag', {
    defaults: { press: 0.5, from: [-170, 120] }, size: () => [10, 10],
    draw(g, p, env) {
      const lt = env.lt, u = ease.out(clamp(lt / 0.4)), dip = lt > p.press ? 0.14 * hit(lt - p.press, 9) : 0, th = env.theme, x = lerp(p.from[0], 70, u), y = lerp(p.from[1], 40, u);
      g.save(); g.translate(x, y); g.rotate(-0.25); g.scale(0.8 - dip, 0.8 - dip); g.fillStyle = 'rgba(245,243,238,.2)'; g.beginPath(); g.arc(0, 0, 58, 0, 7); g.fill(); g.strokeStyle = th.gold; g.lineWidth = 15; g.beginPath(); g.arc(0, 0, 58, 0, 7); g.stroke();
      g.strokeStyle = 'rgba(255,255,255,.55)'; g.lineWidth = 6; g.beginPath(); g.arc(0, 0, 40, 3.5, 4.6); g.stroke(); g.strokeStyle = th.ink; g.lineWidth = 18; g.lineCap = 'round'; g.beginPath(); g.moveTo(42, 42); g.lineTo(96, 100); g.stroke(); g.restore();
    },
  });
})();
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, countAt, hash, hit } = B;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  // ---------- hook: frame-0 text, fully drawn at t=0 (no stagger). lines: [[[text,tone],..],..]; sizes per line ----------
  B.register('hook', {
    defaults: { lines: [], sizes: [], size: 96, lh: 1.1 }, ownEnter: true,
    size: p => [980, p.lines.length * p.size * p.lh],
    draw(g, p, env) {
      const { lt } = env, k0 = hit(lt, 8), n = p.lines.length; g.save(); g.scale(1 + 0.1 * k0, 1 + 0.1 * k0); g.rotate(-0.018 * k0);
      let y = -(p.lines.reduce((a, _, i) => a + (p.sizes[i] || p.size) * p.lh, 0)) / 2;
      p.lines.forEach((segs, i) => { const sz = p.sizes[i] || p.size; y += sz * p.lh / 2; const f = F.hero(sz), tw = segs.reduce((a, s) => a + mw(s[0], f), 0); let x = -tw / 2;
        g.save(); g.shadowColor = 'rgba(0,0,0,.5)'; g.shadowBlur = 18 * B.zoomNow; g.shadowOffsetY = 8 * B.zoomNow; for (const [s, tn] of segs) { txt(g, s, x, y, f, B.tone(tn, false), 'left'); x += mw(s, f); } g.restore(); y += sz * p.lh / 2; });
      g.restore();
    },
  });

})();
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, countAt, hash, hit } = B;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const rise = (t, at, d = 18) => { const o = t - at; return { a: clamp(o / 0.12), y: (1 - spring(Math.max(0, o), 'snappy')) * d, on: o > 0 }; };
  // ---------- slamstamp: frame-0 rubber stamp (starts big, thumps to size). Stays on screen ----------
  B.register('slamstamp', {
    defaults: { text: 'FAKE', tone: 'bad', size: 120, fill: 'paper' }, ownEnter: true,
    size: p => [mw(p.text, F.hero(p.size)) + p.size * 0.8, p.size * 1.42],
    draw(g, p, env) {
      const { lt, theme, lift } = env, [w, h] = this.size(p), col = B.tone(p.tone, true), k = clamp(lt / 0.2), sc = 1 + 0.45 * (1 - ease.out(k));
      g.save(); g.scale(sc, sc); paper(g, -w / 2, -h / 2, w, h, p.size * 0.14, { fill: B.tone(p.fill), lift }); g.strokeStyle = col; g.lineWidth = p.size * 0.075; rr(g, -w / 2 + 12, -h / 2 + 12, w - 24, h - 24, p.size * 0.09); g.stroke();
      txt(g, p.text, 0, p.size * 0.045, F.hero(p.size), col); g.restore(); burst(g, 0, 0, w * 0.62, B.tone(p.tone, false), lt - 0.16, 16, 0.45);
    },
  });
  // ---------- gavel: wooden mallet + block; strikes at `at` ----------
  B.register('gavel', {
    defaults: { at: 99999 }, ownEnter: true, size: () => [420, 300],
    draw(g, p, env) {
      const { t, lt, theme } = env, sp = spring(Math.max(0, lt), 'snappy'), ga = p.at;
      const ang = t < ga - 0.35 ? 0.9 : t < ga ? lerp(0.9, 0, ease.in(lin(t, ga - 0.35, ga))) : -0.12 * hit(t - ga, 9) * Math.max(0, Math.sin((t - ga) * 18));
      g.save(); g.scale(0.7 + 0.3 * sp, 0.7 + 0.3 * sp); g.globalAlpha *= clamp(lt / 0.08 + 0.3);
      clay(g, -190, 70, 300, 52, 14, theme.manila, { shadowK: 0.5 }); clay(g, -150, 44, 220, 36, 10, '#B9955A', { shadowK: 0.3 });
      g.save(); g.translate(150, 0); g.rotate(ang); clay(g, -200, -11, 210, 22, 9, theme.manila, { shadowK: 0.3 }); clay(g, -250, -72, 84, 144, 14, '#B9955A', { shadowK: 0.3 }); g.restore();
      g.restore(); if (ga < 90) burst(g, -50, 70, 210, theme.paper, t - ga - 0.02, 14, 0.4);
    },
  });
})();
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, countAt, hash, hit } = B;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
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
      default: if (B.extraIcons && B.extraIcons[kind]) B.extraIcons[kind](g, th); break;
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

// train-robbery props (generic: no brand logos / trade dress)
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, burst, hash, hit } = B;
  const INK = '#1b2028';
  const pop = (t, o = 'snappy') => clamp(spring(Math.max(0, t), o), 0, 1.25);
  const E = (g, x, y, rx, ry, c, st, lw) => { g.beginPath(); g.ellipse(x, y, rx, ry, 0, 0, 7); g.fillStyle = c; g.fill(); if (st) { g.strokeStyle = st; g.lineWidth = lw || 4; g.stroke(); } };
  const RR = (g, x, y, w, h, r, c, st, lw) => { g.beginPath(); g.roundRect(x, y, w, h, r); g.fillStyle = c; g.fill(); if (st) { g.strokeStyle = st; g.lineWidth = lw || 4; g.stroke(); } };
  const P = (g, pts, c, st, lw) => { g.beginPath(); pts.forEach((p, i) => i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); g.closePath(); g.fillStyle = c; g.fill(); if (st) { g.strokeStyle = st; g.lineWidth = lw || 4; g.lineJoin = 'round'; g.stroke(); } };
  const train = (g, th) => { RR(g, -92, -10, 88, 52, 6, '#c8261c', INK, 4); for (let i = 0; i < 3; i++) RR(g, -84 + i * 26, -2, 18, 20, 3, '#ffe9a8', INK, 3); RR(g, -2, -22, 72, 64, 8, '#2f3a48', INK, 4); RR(g, 40, -44, 30, 26, 4, '#2f3a48', INK, 4); RR(g, 18, -40, 12, 20, 2, '#1b2028'); E(g, 54, -52, 8, 8, '#8a949f'); RR(g, -8, 38, 82, 8, 3, '#59606B'); for (const x of [-70, -50, 10, 36, 58]) E(g, x, 48, 12, 12, '#151a20', INK, 3); E(g, 74, 18, 6, 6, '#FFE27A'); };
  const sack = (g, th) => { g.beginPath(); g.moveTo(-34, -40); g.quadraticCurveTo(-60, 0, -52, 40); g.quadraticCurveTo(0, 60, 52, 40); g.quadraticCurveTo(60, 0, 34, -40); g.closePath(); g.fillStyle = '#b89a6a'; g.fill(); g.strokeStyle = INK; g.lineWidth = 4; g.stroke(); P(g, [[-30, -40], [-42, -64], [-14, -52], [0, -70], [14, -52], [42, -64], [30, -40]], '#b89a6a', INK, 4); RR(g, -26, -46, 52, 8, 3, '#c8261c', INK, 2); RR(g, -34, -10, 68, 34, 4, '#F5F3EE', INK, 3); txt(g, 'MAIL', 0, 8, F.hero(28), '#c8261c'); };
  const farm = (g, th) => { P(g, [[-90, 50], [-60, 10], [60, 10], [90, 50]], '#6aa04f', INK, 4); RR(g, -42, -18, 84, 56, 3, '#d9c7a1', INK, 4); P(g, [[-52, -16], [0, -54], [52, -16]], '#8a3a2a', INK, 4); RR(g, -10, 8, 22, 30, 3, '#5a3b22', INK, 3); RR(g, -34, -4, 18, 18, 2, '#3a4a5c', INK, 3); RR(g, 16, -4, 18, 18, 2, '#3a4a5c', INK, 3); g.fillStyle = '#c8261c'; g.fillRect(-34, -4, 8, 18); g.fillRect(16, -4, 8, 18); };
  const board = (g, th) => { g.save(); g.rotate(-0.06); RR(g, -70, -70, 140, 140, 6, '#cfe6c9', INK, 4); RR(g, -46, -46, 92, 92, 3, '#e8f3e4', INK, 3); const cols = ['#a35a3a', '#8ecae6', '#e46ba0', '#f2a33a', '#d9362b', '#f5d63d', '#3aa56b', '#2c5aa0']; for (let i = 0; i < 10; i++) { RR(g, -70 + i * 14, -70, 14, 24, 1, cols[i % 8], INK, 2); RR(g, -70 + i * 14, 46, 14, 24, 1, cols[(i + 3) % 8], INK, 2); } for (let i = 1; i < 9; i++) { RR(g, -70, -46 + (i - 1) * 11.5, 24, 11.5, 1, cols[(i + 1) % 8], INK, 2); RR(g, 46, -46 + (i - 1) * 11.5, 24, 11.5, 1, cols[(i + 5) % 8], INK, 2); } g.save(); g.rotate(0.3); RR(g, -14, -14, 28, 28, 5, '#F5F3EE', INK, 3); for (const [x, y] of [[-6, -6], [6, 6], [0, 0]]) E(g, x, y, 3, 3, INK); g.restore(); g.restore(); };
  const ketchup = (g, th) => { RR(g, -26, -20, 52, 80, 14, '#c8261c', INK, 4); RR(g, -14, -48, 28, 32, 4, '#c8261c', INK, 4); RR(g, -16, -66, 32, 20, 4, '#F5F3EE', INK, 4); RR(g, -22, 6, 44, 34, 3, '#F5F3EE', INK, 3); txt(g, 'SAUCE', 0, 24, F.hero(14), '#c8261c'); };
  const finger = (g, th) => { g.strokeStyle = INK; g.lineWidth = 5; g.lineCap = 'round'; for (let i = 0; i < 7; i++) { g.beginPath(); g.ellipse(0, 6, 12 + i * 8, 16 + i * 9, 0, Math.PI * (0.9 + i * 0.02), Math.PI * (2.1 - i * 0.02)); g.stroke(); } };
  const signal = (g, th) => { RR(g, -8, -10, 16, 80, 3, '#59606B', INK, 3); RR(g, -26, -70, 52, 70, 8, '#2b3340', INK, 4); E(g, 0, -50, 12, 12, '#3aa56b'); E(g, 0, -22, 12, 12, '#E0281E'); };
  const copcar = (g, th) => { RR(g, -70, -6, 140, 38, 8, '#F5F3EE', INK, 4); P(g, [[-44, -6], [-30, -34], [30, -34], [48, -6]], '#F5F3EE', INK, 4); RR(g, -22, -30, 40, 20, 3, '#bfe3f5', INK, 3); RR(g, -8, -46, 18, 12, 3, '#2c5aa0', INK, 3); E(g, -2, -50, 4, 4, '#FF3B30'); RR(g, -66, 10, 132, 10, 3, '#2c3e66'); for (const x of [-42, 42]) E(g, x, 34, 14, 14, '#151a20', INK, 3); };
  const bundle = (g, th) => { for (let i = 2; i >= 0; i--) { g.save(); g.translate(i * 8 - 8, -i * 14 + 14); RR(g, -50, -22, 100, 44, 5, i ? '#2f8556' : '#3aa56b', INK, 3); g.fillStyle = '#e9e4d6'; g.fillRect(-9, -22, 18, 44); E(g, 0, 0, 14, 14, '#2f8556', INK, 3); g.restore(); } };
  const car = (g, th) => { RR(g, -70, -4, 140, 36, 8, '#2E86DE', INK, 4); P(g, [[-40, -4], [-26, -32], [24, -32], [44, -4]], '#2E86DE', INK, 4); RR(g, -20, -28, 36, 20, 3, '#bfe3f5', INK, 3); for (const x of [-42, 42]) E(g, x, 34, 15, 15, '#151a20', INK, 3); };
  const cloth = (g, th) => { g.save(); g.rotate(-0.3); RR(g, -50, -24, 100, 48, 10, '#9ad0e8', INK, 4); g.strokeStyle = 'rgba(255,255,255,.6)'; g.lineWidth = 4; for (let i = 0; i < 3; i++) { g.beginPath(); g.moveTo(-30 + i * 28, -14); g.lineTo(-24 + i * 28, 14); g.stroke(); } g.restore(); };
  const mag = (g, th) => { E(g, -6, -6, 38, 38, 'rgba(190,230,250,.5)', '#c9a227', 10); g.strokeStyle = '#2b3340'; g.lineWidth = 14; g.lineCap = 'round'; g.beginPath(); g.moveTo(22, 22); g.lineTo(60, 60); g.stroke(); };
  const tip = (g, th) => { g.save(); g.rotate(0.05); RR(g, -44, -50, 88, 100, 4, '#F5E6A8', INK, 3); txt(g, 'A TIP', 0, -22, F.hero(30), INK); g.strokeStyle = '#59606B'; g.lineWidth = 4; for (let i = 0; i < 3; i++) { g.beginPath(); g.moveTo(-30, 4 + i * 16); g.lineTo(30 - i * 8, 4 + i * 16); g.stroke(); } g.restore(); };
  B.extraIcons = Object.assign(B.extraIcons || {}, { train, sack, farm, board, ketchup, finger, signal, copcar, bundle, car, cloth, mag, tip });

  // ---- trainscene: night track; red loco + coach roll in, brakes at p.stopAt; signal flips green→red at p.rigAt
  B.register('trainscene', {
    defaults: { w: 900, h: 560, at: 0, stopAt: 3, rigAt: 99999, head: 'ENGLAND · NIGHT' }, size: p => [p.w, p.h], ownEnter: true,
    anchors: p => ({ train: [0, 60, p.w * 0.9, 240], signal: [p.w * 0.3, -60, 160, 240] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, k = pop(lt, 'snappy'); g.save(); g.scale(0.92 + 0.08 * k, 0.92 + 0.08 * k); g.globalAlpha *= clamp(lt / 0.1 + 0.2);
      paper(g, -w / 2, -h / 2, w, h, 22, { lift, fill: '#1c2b44' }); g.save(); rr(g, -w / 2, -h / 2, w, h, 22); g.clip();
      for (let i = 0; i < 40; i++) { g.fillStyle = 'rgba(255,255,230,' + (0.3 + 0.5 * hash(i)) + ')'; g.beginPath(); g.arc(-w / 2 + hash(i * 2.3) * w, -h / 2 + hash(i * 5.1) * h * 0.55, 1.5 + 2 * hash(i + 9), 0, 7); g.fill(); }
      E(g, w * 0.3, -h * 0.28, 34, 34, '#f4ecc8'); g.fillStyle = '#16301f'; g.fillRect(-w / 2, h * 0.18, w, h * 0.4); g.fillStyle = '#2a2f36'; g.fillRect(-w / 2, h * 0.2, w, 22); g.strokeStyle = '#59606B'; g.lineWidth = 4; for (let i = -10; i < 12; i++) { g.beginPath(); g.moveTo(-w / 2 + i * 70, h * 0.2); g.lineTo(-w / 2 + i * 70 - 14, h * 0.2 + 22); g.stroke(); }
      const u = ease.out(clamp((t - p.at) / (p.stopAt - p.at))), x = lerp(-w * 0.9, 0, u); g.save(); g.translate(x, h * 0.12); g.scale(1.6, 1.6); train(g, theme); g.save(); g.translate(-170, 0); train(g, theme); g.restore(); g.restore();
      g.save(); g.translate(w * 0.34, h * 0.02); g.scale(1.3, 1.3); const red = t >= p.rigAt; RR(g, -6, -10, 12, 80, 3, '#59606B', INK, 3); RR(g, -22, -66, 44, 62, 8, '#2b3340', INK, 4); E(g, 0, -46, 11, 11, red ? '#2c3a2f' : '#3aa56b'); E(g, 0, -20, 11, 11, red ? '#FF3B30' : '#4a2a2a'); g.restore();
      if (t > p.stopAt - 0.2) burst(g, w * 0.15, h * 0.28, 120, theme.paper, t - p.stopAt + 0.2, 8, 0.5);
      g.restore(); txt(g, p.head, -w / 2 + 28, -h / 2 + 30, F.monoX(20), 'rgba(245,243,238,.8)', 'left'); g.restore();
    },
  });
  // ---- scale: cash pile vs a car, pile wins
  B.register('scale', {
    defaults: { w: 900, h: 640, at: 0, a: 'bundle', b: 'car', la: '2.5 TONS OF CASH', lb: 'A CAR' }, size: p => [p.w, p.h], ownEnter: true,
    anchors: p => ({ a: [-p.w * 0.25, 40, 300, 300], b: [p.w * 0.25, 40, 300, 300] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, k = pop(lt, 'snappy'); g.save(); g.scale(0.92 + 0.08 * k, 0.92 + 0.08 * k); g.globalAlpha *= clamp(lt / 0.1 + 0.2); paper(g, -w / 2, -h / 2, w, h, 22, { lift });
      const tilt = ease.out(clamp((t - p.at) / 0.7)) * 0.2; g.save(); g.translate(0, 150); P(g, [[-36, 150], [36, 150], [0, 30]], '#59606B', INK, 4); g.rotate(-tilt); RR(g, -380, -12, 760, 24, 10, '#8a5a2b', INK, 4);
      [[-290, p.a, p.la, 3.0, theme.badInk], [290, p.b, p.lb, 1.4, theme.ink]].forEach(([x, ic, lab, s, col]) => { g.save(); g.translate(x, -12); g.rotate(tilt); g.save(); g.translate(0, -90 * s * 0.5); g.scale(s, s); B.crimeIcon(g, ic, 100, theme); g.restore(); RR(g, -150, 10, 300, 56, 8, col, INK, 3); txt(g, lab, 0, 38, F.hero(34), '#F5F3EE'); g.restore(); });
      g.restore(); g.restore();
    },
  });
})();

const SENT = [[0.0, 4.12], [4.88, 7.0], [8.96, 13.04], [13.74, 17.64], [18.3, 23.52], [24.1, 27.96], [27.96, 30.4], [31.24, 33.62], [34.64, 36.98], [37.52, 39.98], [40.56, 43.9], [44.4, 48.08], [48.48, 51.12], [51.54, 55.14], [55.14, 57.74], [58.16, 61.4], [61.98, 66.08], [66.5, 68.9], [69.6, 72.98], [73.46, 76.2], [76.62, 79.4], [81.78, 84.92], [85.34, 87.86]];
const S = i => SENT[i][0], E = i => SENT[i][1];
const VW = BM2_VOICE.words.map(x => ({ w: x.w.toLowerCase().replace(/^[^a-z0-9$]+|[^a-z0-9$]+$/g, ''), s: x.s, e: x.e }));
const W = (w, n = 1) => { let c = 0; for (const x of VW) if (x.w === w.toLowerCase() && ++c === n) return x.s; throw new Error('W: word not found ' + w + '#' + n); };
const SW = (i, k) => { const ws = BM2_VOICE.words.filter(u => u.s >= SENT[i][0] - 0.02 && u.s < Math.max(SENT[i][1] - 0.005, i + 1 < SENT.length ? SENT[i + 1][0] - 0.05 : 1e9)); const u = ws[k < 0 ? ws.length + k : k]; if (!u) throw new Error('SW ' + i + ',' + k); return u.s; };
const SE = (i, k) => { const ws = BM2_VOICE.words.filter(u => u.s >= SENT[i][0] - 0.02 && u.s < Math.max(SENT[i][1] - 0.005, i + 1 < SENT.length ? SENT[i + 1][0] - 0.05 : 1e9)); const u = ws[k < 0 ? ws.length + k : k]; if (!u) throw new Error('SE ' + i + ',' + k); return u.e; };
const WE = (w, n = 1) => { let c = 0; for (const x of VW) if (x.w === w.toLowerCase() && ++c === n) return x.e; throw new Error('WE: word not found ' + w + '#' + n); };
// Great Train Robbery (Monopoly) · YouTube · DECODED crime-show. Stations: row-major, 5 per row, 1900 apart.
const SB = 'side-by-side', GH = 'graphic-hero', ZN = 'zoom-on-number', PF = 'presenter-front', PK = 'peek', PB = 'pull-back';
const GANG = 'videos/2026-12-02-train-robbery-monopoly/_src/img/gang.png';
const ST = i => [(i % 5) * 1900, Math.floor(i / 5) * 1900], A = (i, dx = 0, dy = 0) => [ST(i)[0] + dx, ST(i)[1] + dy];
const F0 = { sx: 540, sy: 850, fill: 0.98, maxH: 960, st: { x: 915, y: 1395, s: 0.85 } };
const G = (o) => Object.assign({ src: GANG, crop: [0, 0, 1, 1], fx: 0.5, fy: 0.45, aspect: 0.78, name: 'THE MONOPOLY GANG', tag: 'ILLUSTRATION', flash: false }, o);
const ILL = 'ILLUSTRATION';
const HK = [[['2.5 TONS OF CASH', 'paper']], [['CAUGHT BY KETCHUP', 'bad']]];
const els = [], beats = [], sfx = [], poses = [], shakes = [];
const E_ = (id, type, at, o) => els.push(Object.assign({ id, type, at }, o));
// ---- S0 frame 0 ----
E_('hook', 'hook', A(0, 0, -440), { in: 0, out: SW(0,11) + 0.3, props: { lines: HK, sizes: [66, 76] } });
E_('hook2', 'hook', A(0, 0, -440), { in: E(21) + 0.6, props: { lines: HK, sizes: [66, 76] } });
E_('bd0', 'prop', A(0, 140, 60), { in: -1, props: { icon: 'ketchup', caption: 'KETCHUP', cap: 34, w: 470, h: 500, iconS: 330, slam: true, tilt: 0.03 } });
E_('bn0', 'prop', A(0, 340, 370), { in: -1, props: { icon: 'bundle', caption: '2.5 TONS', cap: 30, w: 260, h: 250, iconS: 150, tilt: -0.05 } });
E_('gg0', 'suspect', A(0, -300, 250), { in: -1, props: G({ w: 400, nick: '≈15 MEN', tilt: -0.03 }) });
// ---- S1 date ----
E_('eng', 'text', A(1, 0, 0), { in: SW(1,4) - 0.2, props: { lines: [[['ENGLAND', 'paper']], [['AUGUST 1963', 'gold']]], size: 112 } });
// ---- S2 train ----
E_('trn', 'trainscene', A(2, 0, 0), { in: SW(4,0) - 0.3, props: { w: 940, h: 600, at: SW(4,2) - 0.5, stopAt: SW(5,13) + 0.3, rigAt: SW(5,9), head: 'ROYAL MAIL TRAIN · NIGHT' } });
// ---- S3 sacks ----
E_('sck', 'prop', A(3, -260, 40), { in: SW(4,10) - 0.3, props: { icon: 'sack', caption: 'SACKS OF USED NOTES', cap: 30, w: 420, h: 480, iconS: 300, tilt: -0.04 } });
// ---- S4 intro ★ ----
E_('gg4', 'suspect', A(4, -150, 20), { in: SW(5,0) - 0.35, props: G({ variant: 'card', file: true, caseNo: 'CASE FILE Nº 2', w: 560, aspect: 0.78, nick: '“THE GANG”', tag: ILL, tilt: -0.03, push: { at: SW(5,0), dur: 3, to: 1.3 }, stringTo: [600, 60], stringAt: SW(5,4) - 0.2, ring: SW(5,3) + 0.2 }) });
E_('c15', 'counter', A(4, 520, 60), { in: SW(5,3) - 0.2, props: { to: 15, prefix: '≈', at: SW(5,4), dur: 0.7, size: 170, tone: 'bad', label: 'MEN IN THE GANG', w: 440 } });
// ---- S5 step 1 / S7 stops are on the train; step cards ----
E_('s1', 'prop', A(5, 0, 0), { in: SW(5,6) - 0.3, props: { icon: 'signal', caption: 'STEP 1: RIG THE SIGNAL', cap: 38, w: 560, h: 520, iconS: 300, tilt: -0.02 } });
// ---- S8 step 2 ----
E_('s2', 'prop', A(8, -280, 20), { in: S(7) - 0.3, props: { icon: 'sack', caption: 'STEP 2', cap: 40, w: 400, h: 460, iconS: 280, tilt: -0.04 } });
E_('c120', 'counter', A(8, 300, 20), { in: SW(7,3) - 0.2, props: { to: 120, at: SW(7,4), dur: 0.9, size: 180, tone: 'bad', label: 'MAIL SACKS', w: 460 } });
// ---- S9 money ----
E_('c26', 'counter', A(9, 0, 0), { in: S(8) - 0.3, props: { to: 2.6, prefix: '£', suffix: ' MILLION', decimals: 1, at: SW(8,3), dur: 1.0, size: 150, tone: 'bad', label: 'ABOUT · STOLEN', w: 860 } });
// ---- S10 scale ----
E_('scl', 'scale', A(10, 0, 0), { in: S(9) - 0.3, props: { w: 920, h: 660, at: SW(9,5), a: 'bundle', b: 'car', la: '2.5 TONS OF CASH', lb: 'A CAR' } });
// ---- S11 farmhouse ----
E_('frm', 'prop', A(11, 0, 0), { in: S(1) - 0.3, props: { icon: 'farm', caption: 'STEP 3: HIDE AT A FARMHOUSE', cap: 34, w: 600, h: 520, iconS: 330, tilt: 0.02 } });
// ---- S12 game night ★ ----
E_('gg12', 'suspect', A(12, -330, 20), { in: S(2) - 0.3, props: G({ w: 420, nick: 'GAME NIGHT', tilt: -0.03, flash: true }) });
E_('bd12', 'prop', A(12, 190, -10), { in: SW(2,4) - 0.2, props: { icon: 'board', caption: 'MONOPOLY, WITH REAL MONEY', cap: 24, w: 460, h: 460, iconS: 300, tilt: 0.04 } });
E_('bn12', 'prop', A(12, 440, 330), { in: SW(2,8), props: { icon: 'bundle', caption: 'THE BANK', cap: 28, w: 250, h: 240, iconS: 140, tilt: -0.05 } });
// ---- S14/15 checklist ----
E_('chk', 'checklist', A(14, 0, 0), { in: S(11) - 0.3, props: { w: 800, h: 640, head: 'LEAVE NO TRACE', icon: 'cloth', iconAt: SW(11,7) - 0.2, crackAt: 99999, rows: [{ t: 'WIPE THE PLACE', at: SW(11,7) + 0.3, show: S(11) }, { t: 'BURN THE FARMHOUSE', at: SW(13,9), todo: true, show: SW(13,4) - 0.4, size: 50 }] } });
E_('nb', 'nope', A(14, 0, 400), { rot: -0.03, in: SW(13,8) - 0.1, props: { text: 'REPORTEDLY NOBODY DID', at: SW(13,9), w: 760 } });
// ---- S16 tip ----
E_('cop', 'prop', A(16, -250, 40), { in: S(14) - 0.3, props: { icon: 'copcar', caption: 'POLICE', cap: 36, w: 420, h: 380, iconS: 300, tilt: -0.04 } });
E_('tp', 'prop', A(16, 230, -10), { in: SW(14,2) - 0.2, props: { icon: 'tip', caption: 'THE FARM', cap: 34, w: 360, h: 400, iconS: 230, tilt: 0.05 } });
// ---- S17 almost everything ----
E_('alm', 'text', A(17, 0, -120), { in: S(15) - 0.2, props: { lines: [[['WIPED', 'paper']], [['ALMOST', 'bad']], [['EVERYTHING', 'paper']]], size: 112 } });
E_('bd17', 'prop', A(17, 0, 380), { in: SW(15,7) - 0.2, props: { icon: 'board', caption: '…WELL, ALMOST', cap: 32, w: 420, h: 330, iconS: 190, tilt: 0.03 } });
// ---- S18 evidence board ★ ----
E_('brd', 'board', A(18, 0, 0), { in: S(16) - 0.35, props: { title: 'EVIDENCE BOARD', caseNo: 'CASE FILE Nº 2', w: 980, h: 1140, tightAt: SW(16,11), items: [
  { id: 'ph', k: 'photo', src: GANG, crop: [0, 0, 1, 1], fx: 0.5, fy: 0.45, x: 0, y: -270, w: 400, h: 400, name: 'THE MONOPOLY GANG', nameSize: 26, at: S(16) - 0.1, rot: -0.02, push: 0.3 },
  { id: 'bo', k: 'note', x: -300, y: 120, w: 290, h: 340, icon: 'board', iconS: 150, size: 32, lines: [['MONOPOLY BOARD', 'bad', 28]], at: SW(16,5) - 0.1, rot: -0.05, stamp: { text: 'PRINTS', at: SW(16,7), size: 30, y: 70, rot: -0.06 } },
  { id: 'fp', k: 'note', x: 0, y: 150, w: 270, h: 320, icon: 'finger', iconS: 130, size: 34, lines: [['FINGERPRINTS', 'bad', 30]], at: SW(16,3) - 0.1, rot: 0.03 },
  { id: 'ke', k: 'note', x: 300, y: 120, w: 290, h: 340, icon: 'ketchup', iconS: 150, size: 34, lines: [['KETCHUP BOTTLE', 'bad', 28]], at: SW(16,11) - 0.1, rot: 0.05, stamp: { text: 'PRINTS', at: SW(16,12), size: 30, y: 70, rot: 0.06 } } ],
  strings: [[0, 2, SW(16,3)], [2, 1, SW(16,5)], [2, 3, SW(16,11)], [0, 1, SW(16,6)], [0, 3, SW(16,12)]] } });
// ---- S19 magnifier ----
// ---- S21 court ★ ----
E_('crt', 'prop', A(21, 330, -20), { in: S(18) - 0.3, props: { icon: 'court', caption: 'APRIL 1964', cap: 40, w: 380, h: 440, iconS: 230, tilt: 0.03 } });
E_('gg21', 'suspect', A(21, -200, 20), { in: SW(18,3) - 0.3, props: G({ w: 480, nick: 'MOST OF THE GANG', tilt: -0.02, mono: true, flash: true, stamps: [{ text: 'CONVICTED', at: SW(18,5), size: 64, x: 0, y: -50, rot: -0.1 }] }) });
E_('gv', 'gavel', A(21, 300, 320), { in: SW(18,4), props: { at: SW(18,5) + 0.05 } });
// ---- S22 verdict ★ ----
E_('gg22', 'suspect', A(22, -200, 20), { in: S(19) - 0.3, props: G({ w: 480, nick: 'THE MAIN MEN', tilt: -0.02, mono: true, flash: true, push: { at: S(19), dur: 2.6, to: 1.35 }, bars: SW(19,8), stamps: [{ text: 'UP TO 30 YEARS', at: SW(19,8), size: 48, x: 0, y: -40, rot: -0.1 }] }) });
E_('c30', 'counter', A(22, 450, 0), { in: SW(19,6) - 0.2, props: { to: 30, prefix: 'UP TO ', at: SW(19,8), dur: 0.7, suffix: ' YRS', size: 120, tone: 'bad', label: 'IN PRISON', w: 520 } });
// ---- S23 recap ★ ----
E_('rec', 'board', A(23, 0, 0), { in: S(21) - 0.35, props: { title: 'CASE CLOSED?', caseNo: 'CASE FILE Nº 2', w: 980, h: 900, tightAt: SW(21,7) - 0.1, items: [
  { id: 'ph', k: 'photo', src: GANG, crop: [0, 0, 1, 1], fx: 0.5, fy: 0.45, x: 0, y: -170, w: 380, h: 380, name: 'THE MONOPOLY GANG', nameSize: 26, at: S(21) - 0.1, rot: -0.02, push: 0.3 },
  { id: 'mn', k: 'note', x: -290, y: 200, w: 300, h: 320, icon: 'bundle', iconS: 140, size: 34, lines: [['2.5 TONS', 'bad', 40], ['OF CASH', 'ink', 30]], at: S(21) + 0.2, rot: -0.05 },
  { id: 'bg', k: 'note', x: 280, y: 200, w: 300, h: 320, icon: 'ketchup', iconS: 140, size: 34, lines: [['A KETCHUP BOTTLE', 'bad', 26]], at: SW(21,7) - 0.1, rot: 0.05, stamp: { text: 'UNDONE', at: SW(21,7) + 0.2, size: 36, y: 60, rot: -0.05 } } ],
  strings: [[0, 1, S(21) + 0.4], [0, 2, SW(21,7)], [1, 2, SW(21,7) + 0.2]] } });
// ---- S24 chips ----
E_('spl2', 'split', A(24, 0, 0), { in: S(22) - 0.3, props: { w: 920, h: 640, a: { icon: 'board', label: 'MONOPOLY', size: 44 }, b: { icon: 'ketchup', label: 'KETCHUP', size: 44 }, vsAt: SW(22,1) } });
// ---- screen overlays ----
E_('bg20', 'suspect', A(20, 0, 20), { in: SW(20,4) - 0.3, props: G({ w: 520, nick: 'RONNIE BIGGS', tag: ILL + ' · NOT A PHOTO', tilt: -0.02, mono: true, flash: true, stamps: [{ text: 'ESCAPED · 1965', at: SW(20,6), size: 52, x: 0, y: -40, rot: -0.1 }] }) });
E_('dc1', 'datecard', [340, 480], { layer: 'screen', in: SW(1,4), out: SW(1,4) + 2.0, props: { kicker: 'CASE FILE Nº 2 · THE SETUP', big: 'ENGLAND', small: 'AUGUST 1963' } });
E_('dc2', 'datecard', [340, 480], { layer: 'screen', in: SW(5,6) - 0.1, out: SW(5,6) + 2.2, props: { kicker: 'CHAPTER 2', big: 'THE PLAN', small: 'STEP 1 · 2 · 3' } });
E_('dc3', 'datecard', [340, 480], { layer: 'screen', in: S(15) - 0.1, out: S(15) + 1.9, props: { kicker: 'CHAPTER 4', big: 'THE SLIP', small: 'ALMOST EVERYTHING' } });
E_('dc4', 'datecard', [340, 480], { layer: 'screen', in: S(18) - 0.1, out: S(18) + 2.4, props: { kicker: 'COURT · APRIL 1964', big: 'THE VERDICT', small: 'MOST OF THE GANG' } });
E_('heart', 'heart', [800, 930], { layer: 'screen', in: SW(6,1) - 0.05, out: SW(6,1) + 1.15, props: { s: 1 } });
E_('plane', 'plane', [540, 960], { layer: 'screen', in: SW(12,1) - 0.05, out: SW(12,1) + 1.2, props: { dur: 0.9, from: [-230, 250], to: [280, -330], s: 1.5 } });
E_('sendtx', 'text', [830, 360], { layer: 'screen', in: SW(12,1) + 0.15, out: SW(12,1) + 1.2, props: { lines: [[['SEND', 'gold']]], size: 70 } });
E_('btn', 'follow', [830, 1010], { layer: 'screen', scale: 0.8, in: SW(17,0) - 0.05, out: SW(17,0) + 1.45, props: { press: 0.5 } });
E_('ask', 'bubble', [600, 1090], { layer: 'screen', in: SW(22,0) - 0.1, out: E(22) + 0.2, props: { l1: 'THE SANDWICH-LEVEL', l2: 'DUMB: WHICH?', size: 52, tail: 'left' } });
E_('rew', 'text', [540, 440], { layer: 'screen', in: S(3) + 0.3, out: SW(3,8) - 0.1, props: { lines: [[["WHERE'D THE", 'paper']], [['REAL MONEY COME FROM?', 'gold']]], size: 60 } });
E_('hud', 'hud', [0, 0], { layer: 'screen', in: -1, props: { labels: [{ at: -1, text: 'THE HOOK' }, { at: SW(1,4) - 0.1, text: 'THE SETUP' }, { at: SW(5,0) - 0.1, text: 'THE GANG' }, { at: SW(5,6) - 0.1, text: 'THE PLAN' }, { at: S(11) - 0.1, text: 'THE COVER-UP' }, { at: S(15) - 0.1, text: 'THE SLIP' }, { at: S(18) - 0.1, text: 'THE SENTENCE' }], items: [] } });
const B_ = (at, beat, focus, o) => beats.push(Object.assign({ at, beat, focus }, o || {}));
B_(0, SB, ['hook', 'bd0', 'bn0', 'gg0'], Object.assign({ pose: 'talk' }, F0));
B_(SW(0,9), GH, ['hook', 'bd0', 'bn0', 'gg0'], { fill: 0.98, maxH: 960, sy: 850, pose: 'shock', st: 'corner' });
B_(SW(1,4) - 0.05, GH, 'eng', { move: 'whip', fill: 0.9, sy: 830 });
B_(SW(4,0) - 0.05, PK, 'trn', { move: 'whip', fill: 0.98, sy: 830, maxH: 700 });
B_(SW(5,0) - 0.05, GH, ['gg4', 'c15'], { move: 'whip', fill: 0.98, maxH: 860, sy: 830, st: 'corner' });
B_(SW(5,4), ZN, 'c15.value', { fill: 0.5, maxH: 400, sy: 800 });
B_(SW(5,6) - 0.05, GH, 's1', { move: 'whip', fill: 0.7, maxH: 800, sy: 830 });
B_(SW(5,9), GH, 'trn.signal', { move: 'whip', fill: 0.5, maxH: 520, sy: 830 });
B_(S(6), PF, 'trn', { pose: 'shrug', sy: 830, fill: 0.98 });
B_(SW(5,13) - 0.05, GH, 'trn', { fill: 0.98, maxH: 700, sy: 830, st: 'corner' });
B_(S(7) - 0.05, SB, ['s2', 'c120'], { move: 'whip', fill: 0.98, maxH: 800, sy: 830 });
B_(SW(7,4), ZN, 'c120.value', { fill: 0.6, maxH: 440, sy: 800 });
B_(S(8) - 0.05, GH, 'c26', { move: 'whip', fill: 0.98, sy: 800, maxH: 440 });
B_(SW(8,3), ZN, 'c26.value', { fill: 0.9, maxH: 380, sy: 800, pose: 'shock', st: 'corner' });
B_(S(9) - 0.05, GH, 'scl', { move: 'whip', fill: 0.98, maxH: 860, sy: 830 });
B_(SW(9,9), ZN, 'scl.a', { fill: 0.5, maxH: 420, sy: 820 });
B_(S(1) - 0.05, GH, 'frm', { move: 'whip', fill: 0.78, maxH: 800, sy: 830 });
B_(S(2) - 0.05, SB, ['gg12', 'bd12', 'bn12'], { move: 'whip', fill: 1.0, maxH: 880, sy: 830 });
B_(SW(2,5), ZN, 'bd12', { fill: 0.55, maxH: 520, sy: 800 });
B_(S(12), PF, 'bd12', { sy: 830 });
B_(S(11) - 0.05, GH, 'chk', { move: 'whip', fill: 0.9, maxH: 800, sy: 830 });
B_(SW(13,4), GH, ['chk', 'nb'], { fill: 0.98, maxH: 860, sy: 830, st: 'corner' });
B_(S(14) - 0.05, SB, ['cop', 'tp'], { move: 'whip', fill: 0.88, maxH: 800, sy: 830 });
B_(S(15) - 0.05, GH, ['alm', 'bd17'], { move: 'whip', fill: 0.98, maxH: 900, sy: 830 });
B_(S(16) - 0.05, GH, 'brd', { move: 'whip', fill: 0.98, maxH: 900, sy: 830, st: 'corner' });
B_(SW(16,12), ZN, 'brd.ke', { fill: 0.5, maxH: 520, sy: 830 });
B_(S(17) - 0.05, PF, 'brd', { move: 'whip', fill: 0.9, maxH: 900, sy: 830 });
B_(SW(20,4) - 0.05, GH, 'bg20', { move: 'whip', fill: 0.9, maxH: 820, sy: 830, st: 'corner' });
B_(S(18) - 0.05, GH, ['gg21', 'crt', 'gv'], { move: 'whip', fill: 0.86, maxH: 900, sy: 830 });
B_(S(19) - 0.05, GH, ['gg22', 'c30'], { move: 'whip', fill: 0.98, maxH: 820, sy: 830, st: 'corner' });
B_(SW(19,8), ZN, 'c30.value', { fill: 0.6, maxH: 420, sy: 800 });
B_(S(21) - 0.05, GH, 'rec', { move: 'whip', fill: 0.98, maxH: 900, sy: 830, st: 'corner' });
B_(SW(21,7), ZN, 'rec.bg', { fill: 0.6, maxH: 460, sy: 860 });
B_(S(22) - 0.05, PF, 'spl2', { move: 'whip', fill: 0.98, sy: 800, maxH: 700 });
B_(S(3), PF, 'bd12', { pose: 'shrug', sy: 830 });
B_(S(10) - 0.05, GH, 'frm', { move: 'whip', fill: 0.78, maxH: 800, sy: 830 });
B_(E(22) - 0.55, SB, ['hook2', 'bd0', 'bn0', 'gg0'], Object.assign({ move: 'whip', pose: 'talk' }, F0));
poses.push([SW(17,0), 'follow', { target: [830, 1010] }]);
shakes.push([SW(0,9), 14], [SW(8,3) + 0.1, 12], [SW(16,12) + 0.1, 12], [SW(18,5) + 0.05, 14], [SW(19,8) + 0.1, 16]);
const SX = (at, name, gain, dur, offset) => sfx.push({ at, name, gain, dur, offset: offset || 0 });
SX(0, 'deep_boom_2', -4, 0.4); SX(0.2, 'cash_rustle_1', -9, 1.2); SX(SW(0,9), 'thud_1', -5, 0.6); SX(SW(1,4), 'typewriter_1', -12, 1.6); SX(SW(4,2), 'car_stop_1', -14, 1.8);
SX(SW(4,10), 'cash_rustle_1', -10, 1.0); SX(SW(5,0), 'camera_shutter_1', -8, 0.4); SX(SW(5,0) + 0.3, 'typewriter_1', -12, 1.6); SX(SW(5,9), 'click_2', -7, 0.4); SX(SW(5,13), 'car_stop_2', -10, 1.4);
SX(SW(7,4), 'cash_count_1', -10, 1.2); SX(SW(8,3), 'cash_register_1', -8, 1.0); SX(SW(9,5), 'sub_drop_1', -9, 0.8); SX(S(2), 'camera_shutter_2', -8, 0.4); SX(SW(2,5), 'click_1', -8, 0.3);
SX(SW(6,1), 'pop_2', -9, 0.3); SX(SW(12,1), 'swoosh_1', -9, 0.6); SX(SW(11,7), 'paper_rustle_1', -9, 0.8); SX(SW(13,9), 'wrong_buzzer_1', -9, 0.5); SX(SW(14,2), 'siren_1', -14, 1.6);
SX(S(16), 'suspense_drone_1', -13, 3.0); SX(SW(16,7), 'rubber_stamp_1', -7, 0.5); SX(SW(16,12), 'rubber_stamp_2', -7, 0.5); SX(SW(16,12) + 0.1, 'deep_boom_1', -7, 1.4);
SX(SW(17,0) + 0.5, 'click_1', -8, 0.3); SX(SW(18,5), 'gavel_1', -5, 0.8); SX(SW(18,5) + 0.1, 'rubber_stamp_2', -6, 0.5); SX(SW(19,8), 'rubber_stamp_1', -6, 0.6); SX(SW(19,8) + 0.2, 'cell_door_1', -7, 1.2); SX(SW(21,7), 'rubber_stamp_2', -7, 0.5);
BM2.scene({ series: 'decoded', title: 'CASE FILE Nº 2 · ENGLAND · 1963', duration: SENT[SENT.length - 1][1] + 0.4,
  footnote: ['COURT CONVICTED MOST OF THE GANG · APRIL 1964 · MAIN MEN UP TO 30 YEARS', 'ABOUT 15 MEN · ABOUT £2.6M · ABOUT 2.5 TONS OF CASH · BURNING THE FARM: REPORTEDLY NEVER HAPPENED', 'ILLUSTRATIONS / PROPS (GENERIC): NO REAL PHOTOS OF THE GANG · NO BRAND LOGOS'],
  elements: els, beats: beats.sort((a, b) => a.at - b.at), poses, shakes, sfx,
  captions: { emph: { Monopoly: 'bad', ketchup: 'bad', fingerprints: 'bad', convicted: 'bad', million: 'good' }, gap: 16 }, bed: { name: 'orchestral_bed_3', gain: -1 } });
