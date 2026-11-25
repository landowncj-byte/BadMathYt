// ===== Weight vs height — custom recipes (registered via BM2.register; prepended to each cut's scene.js) =====
// scale  : clay bathroom scale + dial + pile of $20 bills, counters (lb / bills / $)
// tower  : stack of $100 bills + tape measure + counters (in / bills / $), 1-inch bracket, 35 LB luggage tag
// doll   : paper-doll "average US man" (CDC) with stat chips, or an empty YOU outline
// fivex  : a $100 slides in front of a $20, x5 badge
// gap    : green "$20s WIN BY $202,980" banner (+ flip-point line)
// slider : HEIGHT (IN) x 2.56 = YOUR NUMBER
// chip, heart, plane : micro-moments
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, hash } = B;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const fmt = v => B.fmtNum(Math.round(v), 0, true);
  const LB = 453.59237;
  const GREEN = '#1FA366', HUN = '#3BBE86';
  // piecewise keyframes [{t, v, e}] -> value (and speed of change)
  const EAS = { out: ease.out, in: ease.in, expo: ease.expo, inOut: ease.inOut, lin: x => x };
  const kfv = (K, t) => { if (!K || !K.length) return [0, 0]; if (t <= K[0].t) return [K[0].v, 0]; for (let i = 0; i < K.length - 1; i++) { const a = K[i], b = K[i + 1]; if (t < b.t) { const u = lin(t, a.t, b.t), e = (EAS[b.e || 'inOut'] || ease.inOut), v = lerp(a.v, b.v, e(u)), v2 = lerp(a.v, b.v, e(Math.min(1, u + 0.02 / Math.max(0.05, b.t - a.t)))); return [v, Math.abs(v2 - v) / 0.02]; } } return [K[K.length - 1].v, 0]; };
  const offA = (p, t) => { let o = 0; for (const [a, b] of (p.btnOff || [])) o = Math.max(o, clamp((t - a) / 0.1) * (1 - clamp((t - b) / 0.1))); return 1 - o; };
  const bill = (g, x, y, w, h, c) => { clay(g, x, y, w, h - 1, Math.min(5, h / 3), c || GREEN, { shadowK: 0.4 }); g.fillStyle = 'rgba(245,243,238,.8)'; g.fillRect(x + w * 0.42, y + 1, w * 0.16, h - 3); };
  const btn = (g, th, letter, label, col, x, y, w, k, hi) => { g.save(); g.translate(x, y); g.scale(k, k); clay(g, -w / 2, -56, w, 112, 30, col, { shadowK: 0.7 });
    g.fillStyle = '#0B0F14'; g.beginPath(); g.arc(-w / 2 + 62, 0, 40, 0, 7); g.fill(); txt(g, letter, -w / 2 + 62, 4, F.hero(54), col);
    txt(g, label, 34, 4, F.hero(label.length > 18 ? 34 : 38), '#0B0F14'); if (hi) { g.strokeStyle = th.paper; g.lineWidth = 6; rr(g, -w / 2 - 8, -64, w + 16, 128, 36); g.stroke(); } g.restore(); };

  // ---------- scale ----------
  B.register('scale', {
    defaults: { fill: [{ t: 0, v: 0 }], slamAt: -1, btnAt: -1, pulses: [], bigAt: 99999, hold: 0 }, ownEnter: true,
    size: () => [600, 960],
    anchors: () => ({ btn: [0, -485, 560, 130], dial: [0, -40, 220, 220], pile: [0, 210, 580, 420], lb: [0, -366, 480, 60], count: [0, -318, 540, 60], total: [0, -218, 580, 120], all: [0, -55, 600, 960] }),
    draw(g, p, env) {
      const { t, theme, lift } = env; const [n, spd] = kfv(p.fill, t), lb = n / LB, big = clamp(n / 90264);
      let dy = 0, sq = 1;
      if (p.slamAt > -0.5) { const s = t - p.slamAt; if (s < 0) dy = -110; else { dy = -110 * (1 - ease.in(clamp(s / 0.22))); if (s > 0.22) { sq = 1 - 0.07 * B.hit(s - 0.22, 9); } } }
      g.save(); g.translate(0, dy); g.translate(0, 350); g.scale(1 / sq, sq); g.translate(0, -350);
      // button A
      { const bk = p.btnAt < -0.5 ? 1 : Math.max(0, spring(t - p.btnAt, 'bouncy')); let pu = 0; for (const q of p.pulses) if (t >= q && t < q + 0.5) pu = 0.06 * Math.sin((t - q) / 0.5 * Math.PI); g.save(); g.globalAlpha *= offA(p, t); btn(g, theme, 'A', 'YOUR WEIGHT IN $20s', theme.good, 0, -485, 540, (0.5 + 0.5 * bk) * (1 + pu), pu > 0.01); g.restore(); }
      // dial
      const dc = [0, -40], R = 92; g.save(); g.translate(dc[0], dc[1]); B.shadowed(g, () => { g.beginPath(); g.arc(0, 0, R, 0, 7); }, theme.paper, 0.5); g.fillStyle = theme.paper; g.beginPath(); g.arc(0, 0, R, 0, 7); g.fill();
      g.strokeStyle = theme.ink; g.lineWidth = 4; for (let i = 0; i <= 20; i++) { const a = lerp(-2.2, 0.7 + Math.PI * 0.0, i / 20) - 0.0, a2 = -2.35 + i / 20 * 4.7 - Math.PI / 2 + Math.PI / 2; const aa = -Math.PI * 1.25 + i / 20 * Math.PI * 1.5; const l = i % 5 === 0 ? 20 : 11; g.beginPath(); g.moveTo(Math.cos(aa) * (R - 12), Math.sin(aa) * (R - 12)); g.lineTo(Math.cos(aa) * (R - 12 - l), Math.sin(aa) * (R - 12 - l)); g.stroke(); }
      const na = -Math.PI * 1.25 + clamp(lb / 250) * Math.PI * 1.5 + (spd > 0 ? 0.03 * Math.sin(t * 40) : 0); g.save(); g.rotate(na); g.fillStyle = theme.bad; g.beginPath(); g.moveTo(-10, -5); g.lineTo(R - 24, 0); g.lineTo(-10, 5); g.closePath(); g.fill(); g.restore(); g.fillStyle = theme.ink; g.beginPath(); g.arc(0, 0, 12, 0, 7); g.fill();
      txt(g, 'LB', 0, 46, F.monoX(22), theme.inkSoft); g.restore();
      // platform
      clay(g, -290, 330, 580, 84, 30, theme.navy, { shadowK: 0.8 }); g.fillStyle = 'rgba(255,255,255,.14)'; rr(g, -270, 340, 540, 16, 8); g.fill();
      // pile
      const nb = n < 0.5 ? 0 : n < 1.5 ? 1 : Math.round(6 + 174 * Math.pow(big, 0.35)), er = 1 + 1.5 * ease.out(clamp(lin(t, p.bigAt, p.bigAt + 0.9))) * (t >= p.bigAt ? 1 : 0), mul = n > 5000 ? er : 1;
      g.save(); g.translate(0, 326); g.scale(1, n > 20000 ? mul : 1);
      if (nb === 1) { const lt1 = Math.max(0, t - (p.fill.find(k => k.v >= 1) || { t: 0 }).t + 0.5), y = -22 - 260 * (1 - spring(Math.min(lt1, 1.2), { f: 3, z: 0.55 })); g.save(); g.translate(0, y); g.rotate(-0.1); bill(g, -60, -28, 120, 56); g.restore(); }
      else for (let i = 0; i < nb; i++) { const k = i % 91, layer = Math.floor(i / 91); let r = 0, c = k; while (c >= 13 - r) { c -= 13 - r; r++; } const x = (c - (13 - r - 1) / 2) * 40 + (hash(i * 3.1) - 0.5) * 8, y = -(r * 15 + layer * 6 + 12); g.save(); g.translate(x, y); g.rotate((hash(i * 7.7) - 0.5) * 0.12); bill(g, -21, -9, 42, 18); g.restore(); }
      g.restore();
      // counters
      const lbS = n < 1 ? 0 : lb; roll(g, lbS, 0, -366, { font: F.monoX(44), size: 44, color: theme.paper, suffix: ' LB', decimals: 1, speed: spd * 0.01 });
      roll(g, Math.round(n), 0, -318, { font: F.monoX(36), size: 36, color: theme.accent, suffix: n < 1.5 && n > 0.5 ? ' BILL' : ' BILLS', speed: spd });
      const bump = 1 + 0.1 * B.hit(t - p.bigAt, 7) * (t >= p.bigAt ? 1 : 0); g.save(); g.translate(0, -218); g.scale(bump, bump); roll(g, Math.round(n) * 20, 0, 0, { font: F.hero(100), size: 100, color: theme.good, prefix: '$', speed: spd * 20 }); g.restore();
      if (t >= p.bigAt) burst(g, 0, -218, 330, theme.good, t - p.bigAt - 0.05, 20, 0.6);
      g.restore();
    },
  });

  // ---------- tower ----------
  B.register('tower', {
    defaults: { rise: [{ t: 0, v: 0 }], slamAt: -1, btnAt: -1, pulses: [], inchAt: 99999, inchOut: 99999, tagAt: 99999, sagAt: 99999, nopeAt: 99999, nopeOut: 99999, endAt: 99999 }, ownEnter: true,
    size: () => [600, 960],
    anchors: () => ({ btn: [0, -485, 560, 130], stack: [0, 125, 200, 560], tape: [-130, 125, 130, 560], base: [0, 385, 520, 140], inch: [320, 372, 520, 140], lb: [0, -366, 480, 60], count: [0, -318, 540, 60], total: [0, -218, 580, 120], tag: [240, -190, 280, 240], all: [0, 90, 600, 1250] }),
    draw(g, p, env) {
      const { t, theme } = env; const [inch, spd] = kfv(p.rise, t), PX = 8, nb = Math.floor(inch / 0.0043), top = 400 - inch * PX;
      let dy = 0, sq = 1; if (p.slamAt > -0.5) { const s = t - p.slamAt; if (s < 0) dy = 160; else { dy = 160 * (1 - ease.out(clamp(s / 0.3))); if (s > 0.3) sq = 1 + 0.05 * B.hit(s - 0.3, 9); } }
      const sag = t >= p.sagAt && t < p.endAt ? 0.05 * (1 - Math.exp(-(t - p.sagAt) * 4)) * 1 : 0;
      g.save(); g.translate(0, dy); g.translate(0, 400); g.scale(1, sq); g.translate(0, -400);
      { const bk = p.btnAt < -0.5 ? 1 : Math.max(0, spring(t - p.btnAt, 'bouncy')); let pu = 0; for (const q of p.pulses) if (t >= q && t < q + 0.5) pu = 0.06 * Math.sin((t - q) / 0.5 * Math.PI); g.save(); g.globalAlpha *= offA(p, t); btn(g, theme, 'B', 'YOUR HEIGHT IN $100s', theme.accent, 0, -485, 560, (0.5 + 0.5 * bk) * (1 + pu), pu > 0.01); g.restore(); }
      // ground
      g.fillStyle = rgba(theme.paper, 0.3); rr(g, -290, 400, 580, 8, 4); g.fill();
      // tape measure (left of tower)
      const tx = -130; clay(g, tx - 44, top - 30, 88, Math.max(60, inch * PX + 30 + 8), 10, '#F2B705', { shadowK: 0.5 });
      g.save(); rr(g, tx - 44, top - 30, 88, inch * PX + 38, 10); g.clip(); g.strokeStyle = '#0B0F14'; g.fillStyle = '#0B0F14'; g.lineWidth = 2;
      for (let i = 0; i <= Math.floor(inch) + 2; i++) { const y = 400 - i * PX, L = i % 12 === 0 ? 40 : i % 6 === 0 ? 28 : 16; g.beginPath(); g.moveTo(tx + 44, y); g.lineTo(tx + 44 - L, y); g.stroke(); }
      g.restore(); g.textAlign = 'left'; for (let f = 1; f <= 5; f++) { const y = 400 - f * 12 * PX; if (y > top - 30) txt(g, f + 'FT', tx - 38, y - 10, F.monoX(20), '#0B0F14', 'left'); }
      // stack of $100
      const sw = 150, x0 = -sw / 2 + 45;
      g.save(); g.translate(x0 + sw / 2, 400); g.rotate(sag); g.translate(-(x0 + sw / 2), -400);
      if (inch > 0.05) { const h = inch * PX; clay(g, x0, 400 - h, sw, h, 8, HUN, { shadowK: 0.7 }); g.save(); rr(g, x0, 400 - h, sw, h, 8); g.clip(); g.fillStyle = 'rgba(11,15,20,.16)'; for (let y = 400 - 4; y > 400 - h; y -= 7) g.fillRect(x0, y, sw, 2); g.fillStyle = 'rgba(245,243,238,.55)'; g.fillRect(x0 + sw * 0.42, 400 - h, sw * 0.16, h); g.restore();
        txt(g, '$100', x0 + sw / 2, 400 - h - 30, F.hero(34), theme.paper); }
      // tag (hangs off the right side of the stack)
      if (t >= p.tagAt && t < p.endAt) { const s = t - p.tagAt, k = spring(s, 'bouncy'), sw2 = 0.25 * Math.exp(-s * 2.2) * Math.cos(s * 9); g.save(); g.translate(x0 + sw - 12, top + 8); g.rotate(sw2); g.scale(0.4 + 0.6 * k, 0.4 + 0.6 * k); g.strokeStyle = theme.paper; g.lineWidth = 5; g.beginPath(); g.moveTo(0, 0); g.lineTo(64, 74); g.stroke(); g.translate(64, 74); clay(g, -20, 0, 220, 190, 22, theme.paper, { shadowK: 0.7 }); g.fillStyle = '#0B0F14'; g.beginPath(); g.arc(-2 + 22, 24, 11, 0, 7); g.fill(); txt(g, '35', 90, 80, F.hero(92), theme.badInk || theme.bad); txt(g, 'LB', 90, 150, F.hero(48), '#0B0F14'); g.restore(); burst(g, x0 + sw + 130, top + 170, 200, theme.bad, s - 0.05, 12, 0.4); }
      g.restore();
      // 1-inch bracket at the base + callout
      if (t >= p.inchAt && t < p.inchOut + 0.3) { const s = t - p.inchAt, k = spring(s, 'bouncy'), fo = 1 - ease.in(lin(t, p.inchOut, p.inchOut + 0.3)); g.save(); g.globalAlpha *= clamp(s / 0.08) * fo; const bx = x0 + sw + 22, by = 400 - PX;
        g.strokeStyle = theme.accent; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.moveTo(bx, 400); g.lineTo(bx + 18, 400); g.lineTo(bx + 18, by); g.lineTo(bx, by); g.stroke(); g.setLineDash([8, 8]); g.beginPath(); g.moveTo(bx + 18, 400 - PX / 2); g.lineTo(bx + 70, 400 - PX / 2); g.stroke(); g.setLineDash([]);
        g.save(); g.translate(bx + 70 + 10, 390); g.scale(0.5 + 0.5 * k, 0.5 + 0.5 * k); clay(g, 0, -62, 330, 124, 24, theme.ink, { shadowK: 0.7 }); txt(g, '1 INCH =', 24, -26, F.monoX(26), theme.accent, 'left'); roll(g, 233 * ease.expo(lin(s, 0.05, 0.8)), 24, 20, { font: F.hero(64), size: 64, color: theme.paper, suffix: ' BILLS', align: 'left', speed: s < 0.8 ? 400 : 0 }); g.restore(); g.restore(); burst(g, bx + 18, 400 - PX / 2, 120, theme.accent, s - 0.05, 12, 0.4); }
      // NOPE stamp
      if (t >= p.nopeAt && t < p.nopeOut) { const s = t - p.nopeAt, k = 1 + 1.2 * (1 - ease.expo(clamp(s / 0.2))); g.save(); g.translate(0, 120); g.rotate(-0.16); g.scale(k, k); g.globalAlpha *= clamp(s / 0.06); const f = F.hero(130), tw = mw('NOPE', f) + 70; clay(g, -tw / 2, -90, tw, 180, 20, theme.bad, { shadowK: 0.8 }); g.strokeStyle = theme.paper; g.lineWidth = 8; rr(g, -tw / 2 + 12, -78, tw - 24, 156, 14); g.stroke(); txt(g, 'NOPE', 0, 8, f, theme.paper); g.restore(); }
      // counters
      roll(g, inch, 0, -366, { font: F.monoX(44), size: 44, color: theme.paper, suffix: ' IN', decimals: 1, speed: spd * 0.01 });
      roll(g, nb, 0, -318, { font: F.monoX(36), size: 36, color: theme.accent, suffix: ' BILLS', speed: spd * 233 });
      g.save(); g.translate(0, -218); roll(g, nb * 100, 0, 0, { font: F.hero(100), size: 100, color: theme.accent, prefix: '$', speed: spd * 23300 }); g.restore();
      g.restore();
    },
  });

  // ---------- doll ----------
  B.register('doll', {
    defaults: { mode: 'man', lbAt: 99999, hAt: 99999, headAt: 99999, nameAt: 99999 }, ownEnter: true, size: () => [420, 820],
    anchors: () => ({ lb: [0, 195, 380, 120], h: [0, 315, 380, 120], name: [0, -355, 380, 100], all: [0, 0, 420, 820] }),
    draw(g, p, env) {
      const { t, theme, lift, lt } = env, k = Math.max(0, spring(lt, { f: 2.1, z: 0.55 })), you = p.mode === 'you';
      g.save(); g.translate(0, -700 * (1 - Math.min(1.08, k))); g.globalAlpha *= clamp(lt / 0.06);
      paper(g, -210, -410, 420, 820, 26, { lift }); g.save(); rr(g, -210, -410, 420, 820, 26); g.clip(); g.fillStyle = theme.navy; g.fillRect(-210, -410, 420, 100); g.restore();
      txt(g, you ? 'YOUR TURN' : 'AVG US MAN', 0, -372, F.hero(46), theme.paper); txt(g, you ? 'YOU' : 'PER THE CDC', 0, -332, F.mono(20), rgba(theme.paper, 0.78));
      // figure
      g.save(); g.translate(0, -40); const col = you ? 'rgba(0,0,0,0)' : theme.paperShade; g.fillStyle = col; g.strokeStyle = you ? theme.inkSoft : theme.ink; g.lineWidth = you ? 6 : 5; if (you) g.setLineDash([14, 10]);
      g.beginPath(); g.arc(0, -150, 46, 0, 7); g.fill(); g.stroke(); rr(g, -62, -92, 124, 190, 30); g.fill(); g.stroke(); rr(g, -112, -86, 44, 150, 20); g.fill(); g.stroke(); rr(g, 68, -86, 44, 150, 20); g.fill(); g.stroke(); rr(g, -56, 94, 50, 160, 18); g.fill(); g.stroke(); rr(g, 6, 94, 50, 160, 18); g.fill(); g.stroke(); g.setLineDash([]);
      if (!you) { g.fillStyle = theme.ink; g.beginPath(); g.arc(-16, -156, 5, 0, 7); g.arc(16, -156, 5, 0, 7); g.fill(); g.lineWidth = 4; g.beginPath(); g.arc(0, -140, 16, 0.2, Math.PI - 0.2); g.stroke(); } else txt(g, '?', 0, -150, F.hero(70), theme.inkSoft);
      g.restore();
      txt(g, 'ILLUSTRATION', 0, 392, F.mono(16), theme.inkSoft);
      const chip = (at, label, val, y, col) => { if (t < at) { g.fillStyle = theme.paperShade; rr(g, -180, y - 48, 360, 96, 20); g.fill(); return; } const s = t - at, kk = Math.max(0, spring(s, 'bouncy')); g.save(); g.translate(0, y); g.scale(0.6 + 0.4 * kk, 0.6 + 0.4 * kk); g.globalAlpha *= clamp(s / 0.06); clay(g, -180, -48, 360, 96, 20, col, { shadowK: 0.6 }); txt(g, label, 0, -26, F.monoX(20), 'rgba(11,15,20,.75)'); txt(g, val, 0, 14, F.hero(54), '#0B0F14'); g.restore(); burst(g, 0, y, 200, col, s - 0.04, 12, 0.4); };
      if (!you) { chip(p.lbAt, 'BODY WEIGHT', '199.0 LB', 195, theme.good); chip(p.hAt, 'HEIGHT', '68.9 IN (≈5′9″)', 315, theme.accent); }
      else { g.fillStyle = theme.paperShade; rr(g, -180, 147, 360, 96, 20); g.fill(); rr(g, -180, 267, 360, 96, 20); g.fill(); txt(g, 'YOUR HEIGHT?', 0, 195, F.cap(30), theme.inkSoft); txt(g, 'YOUR WEIGHT?', 0, 315, F.cap(30), theme.inkSoft); }
      g.restore();
    },
  });

  // ---------- fivex ----------
  B.register('fivex', {
    defaults: { xAt: 99999 }, ownEnter: true, size: () => [640, 520], anchors: () => ({ x: [160, -130, 420, 280], all: [0, 0, 640, 520] }),
    draw(g, p, env) {
      const { t, theme, lt } = env, k = spring(lt, 'snappy'); g.save(); g.globalAlpha *= clamp(lt / 0.06); g.scale(0.6 + 0.4 * k, 0.6 + 0.4 * k);
      paper(g, -320, -260, 640, 520, 28, { lift: env.lift });
      const sl = ease.out(lin(lt, 0.15, 0.7)); g.save(); g.translate(-90, 40); g.rotate(-0.06); bill(g, -150, -80, 300, 160, GREEN); txt(g, '$20', 0, 8, F.hero(76), '#F5F3EE'); g.restore();
      g.save(); g.translate(lerp(-420, 40, sl), -20 - 10 * sl); g.rotate(0.05); bill(g, -150, -80, 300, 160, '#5BD6A0'); txt(g, '$100', 0, 8, F.hero(76), '#0B0F14'); g.restore();
      if (t >= p.xAt) { const s = t - p.xAt, kk = Math.max(0, spring(s, 'bouncy')); g.save(); g.translate(190, -150); g.rotate(-0.12); g.scale(0.3 + 0.7 * kk, 0.3 + 0.7 * kk); clay(g, -110, -70, 220, 140, 30, theme.accent, { shadowK: 0.8 }); txt(g, '×5', 0, 6, F.hero(110), '#0B0F14'); g.restore(); burst(g, 190, -150, 260, theme.accent, s - 0.05, 16, 0.5); }
      txt(g, 'BIGGER BILL = BETTER?', 0, 205, F.monoX(28), theme.inkSoft);
      g.restore();
    },
  });

  // ---------- gap ----------
  B.register('gap', {
    defaults: { to: 202980, dur: 0.9, flipAt: 99999, win: '$20s WIN BY', pre: '' }, ownEnter: true, size: () => [820, 240], anchors: () => ({ num: [0, 30, 780, 160], flip: [0, 210, 780, 80], all: [0, 70, 820, 440] }),
    draw(g, p, env) {
      const { t, theme, lt } = env, k = Math.max(0, spring(lt, 'bouncy')); g.save(); g.globalAlpha *= clamp(lt / 0.06); g.translate(0, 0); g.scale(0.5 + 0.5 * k, 0.5 + 0.5 * k);
      clay(g, -400, -125, 800, 250, 32, theme.good, { shadowK: 0.8 }); txt(g, p.win, 0, -78, F.hero(44), '#0B0F14');
      const v = p.to * ease.expo(lin(lt, 0, p.dur)); roll(g, v, 0, 28, { font: F.hero(128), size: 128, color: '#0B0F14', prefix: '+$', speed: lt < p.dur ? 160000 : 0 }); g.restore();
      burst(g, 0, 0, 440, theme.good, lt - 0.05, 20, 0.6);
      if (t >= p.flipAt) { const s = t - p.flipAt, kk = Math.max(0, spring(s, 'bouncy')); g.save(); g.translate(0, 210); g.scale(0.6 + 0.4 * kk, 0.6 + 0.4 * kk); g.globalAlpha *= clamp(s / 0.08); const f = F.monoX(30), s1 = 'FLIP POINT: 2.56 LB PER INCH', tw = mw(s1, f) + 56; clay(g, -tw / 2, -40, tw, 80, 40, theme.ink, { shadowK: 0.7 }); txt(g, s1, 0, 3, f, theme.accent); g.restore(); }
    },
  });

  // ---------- slider ----------
  B.register('slider', {
    defaults: { xAt: 99999, rows: [], takeAt: 99999 }, ownEnter: true, size: () => [900, 900],
    anchors: () => ({ formula: [0, -190, 820, 200], rows: [0, 130, 820, 340], r0: [0, 40, 820, 100], r1: [0, 150, 820, 100], r2: [0, 260, 820, 100], take: [0, 380, 820, 110], head: [0, -390, 900, 120], all: [0, 0, 900, 900] }),
    draw(g, p, env) {
      const { t, theme, lt, lift } = env, k = Math.max(0, spring(lt, { f: 2.1, z: 0.55 })), x0 = -450, y0 = -450;
      g.save(); g.translate(0, 700 * (1 - Math.min(1.06, k))); g.globalAlpha *= clamp(lt / 0.06);
      paper(g, x0, y0, 900, 900, 28, { lift }); g.save(); rr(g, x0, y0, 900, 900, 28); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, 900, 120); g.restore();
      txt(g, 'THE CHEAT CODE', x0 + 40, y0 + 54, F.hero(54), theme.paper, 'left'); txt(g, 'AVG-MAN MATH · 1 G / BILL · 0.0043 IN / BILL', x0 + 42, y0 + 98, F.mono(21), rgba(theme.paper, 0.78), 'left');
      // formula
      txt(g, 'HEIGHT (IN)', -230, -200, F.hero(60), theme.ink); const xs = t >= p.xAt ? Math.max(0, spring(t - p.xAt, 'bouncy')) : 0;
      if (xs > 0) { g.save(); g.translate(120, -200); g.rotate(-0.05 * (1 - xs)); g.scale(0.3 + 0.7 * xs, 0.3 + 0.7 * xs); clay(g, -140, -66, 280, 132, 24, theme.accent, { shadowK: 0.8 }); txt(g, '× 2.56', 0, 6, F.hero(100), '#0B0F14'); g.restore(); burst(g, 120, -200, 300, theme.accent, t - p.xAt - 0.05, 16, 0.5); }
      txt(g, '= YOUR NUMBER (LB)', 0, -110, F.hero(52), theme.goodInk);
      // rows
      p.rows.forEach((r, i) => { const y = 40 + i * 110, on = t - r.at; if (on < 0) { g.fillStyle = theme.paperShade; rr(g, x0 + 40, y - 46, 820, 92, 18); g.fill(); return; } const kk = Math.max(0, spring(on, 'snappy')); g.save(); g.translate(0, y); g.scale(0.92 + 0.08 * kk, 0.92 + 0.08 * kk); clay(g, x0 + 40, -46, 820, 92, 18, theme.paper === '#F5F3EE' ? '#EDE8DA' : theme.paperShade, { shadowK: 0.5 });
        txt(g, r.h, x0 + 80, 2, F.hero(54), theme.ink, 'left'); txt(g, r.inch + ' IN × 2.56', x0 + 290, 2, F.monoX(28), theme.inkSoft, 'left'); roll(g, r.lb * ease.expo(lin(on, 0, 0.4)), x0 + 830, 2, { font: F.hero(60), size: 60, color: theme.goodInk, suffix: ' LB', align: 'right', speed: on < 0.4 ? 800 : 0 }); g.restore(); });
      if (t >= p.takeAt) { const s = t - p.takeAt, kk = Math.max(0, spring(s, 'bouncy')); g.save(); g.translate(0, 380); g.scale(0.5 + 0.5 * kk, 0.5 + 0.5 * kk); g.rotate(-0.025 * (1 - kk)); g.globalAlpha *= clamp(s / 0.06); const f = F.hero(52), s1 = 'HEAVIER? TAKE THE $20s', tw = mw(s1, f) + 70; clay(g, -tw / 2, -58, tw, 116, 24, theme.good, { shadowK: 0.8 }); txt(g, s1, 0, 4, f, '#0B0F14'); g.restore(); burst(g, 0, 380, 380, theme.good, s - 0.05, 16, 0.5); }
      g.restore();
    },
  });

  // ---------- chip / heart / plane ----------
  B.register('chip', {
    defaults: { text: 'HYPOTHETICAL', size: 28, tone: 'paper' }, ownEnter: true, size: p => [mw(p.text, F.monoX(p.size)) + 56, p.size * 2],
    draw(g, p, env) { const [w, h] = this.size(p), k = spring(env.lt, 'bouncy'), th = env.theme; g.scale(0.6 + 0.4 * k, 0.6 + 0.4 * k); g.globalAlpha *= clamp(env.lt / 0.1);
      clay(g, -w / 2, -h / 2, w, h, h / 2, '#0B0F14', { shadowK: 0.5 }); g.strokeStyle = th.accent; g.lineWidth = 3; rr(g, -w / 2, -h / 2, w, h, h / 2); g.stroke(); txt(g, p.text, 0, 2, F.monoX(p.size), th.accent); },
  });
  B.register('heart', {
    defaults: { s: 1, dur: 0.9 }, ownEnter: true, size: () => [160, 160],
    draw(g, p, env) { const lt = env.lt, k = spring(lt, { f: 2.6, z: 0.38 }), beat = 1 + 0.22 * Math.max(0, Math.sin((lt - 0.28) * 14)) * Math.exp(-(lt - 0.28) * 3) * (lt > 0.28 ? 1 : 0), fade = 1 - lin(lt, p.dur - 0.25, p.dur), s = p.s * (0.2 + 0.8 * k) * beat;
      g.globalAlpha *= clamp(lt / 0.06) * fade; g.rotate(-0.12); g.scale(s, s);
      const path = () => { g.beginPath(); g.moveTo(0, 56); g.bezierCurveTo(-90, -4, -62, -74, 0, -30); g.bezierCurveTo(62, -74, 90, -4, 0, 56); g.closePath(); };
      B.shadowed(g, path, '#FF3B30', 0.4); g.fillStyle = '#FF3B30'; path(); g.fill(); g.fillStyle = 'rgba(255,255,255,.35)'; g.beginPath(); g.ellipse(-34, -26, 14, 9, -0.6, 0, 7); g.fill();
      const r = lin(lt, 0.25, 0.8); if (r > 0 && r < 1) { g.strokeStyle = rgba('#FF3B30', 1 - r); g.lineWidth = 6; g.save(); g.scale(1 + 0.8 * ease.out(r), 1 + 0.8 * ease.out(r)); path(); g.stroke(); g.restore(); } },
  });
  B.register('plane', {
    defaults: { from: [120, 1050], to: [1180, 300], dur: 1.5, s: 1 }, ownEnter: true, size: () => [10, 10],
    draw(g, p, env) { const lt = env.lt, u = clamp(lt / p.dur), e = ease.inOut(u), [x0, y0] = p.from, [x1, y1] = p.to, cx = (x0 + x1) / 2 - 80, cy = Math.max(y0, y1) + 160;
      const P = k => { const a = (1 - k) * (1 - k), b = 2 * (1 - k) * k, c = k * k; return [a * x0 + b * cx + c * x1, a * y0 + b * cy + c * y1]; };
      g.strokeStyle = rgba(env.theme.paper, 0.5); g.lineWidth = 5; g.setLineDash([4, 18]); g.lineCap = 'round'; g.beginPath(); for (let i = 0; i <= 24; i++) { const [px, py] = P(e * i / 24); i ? g.lineTo(px, py) : g.moveTo(px, py); } g.stroke(); g.setLineDash([]);
      const [px, py] = P(e), [qx, qy] = P(Math.min(1, e + 0.02)), a = Math.atan2(qy - py, qx - px), s = p.s * (1 + 0.35 * Math.sin(Math.PI * u) - 0.25 * u);
      g.save(); g.translate(px, py); g.rotate(a); g.scale(s, s); const sh = () => { g.beginPath(); g.moveTo(70, 0); g.lineTo(-60, -44); g.lineTo(-34, 0); g.lineTo(-60, 44); g.closePath(); };
      B.shadowed(g, sh, '#F5F3EE', 0.5); g.fillStyle = '#F5F3EE'; sh(); g.fill(); g.fillStyle = '#D8D3C7'; g.beginPath(); g.moveTo(70, 0); g.lineTo(-34, 0); g.lineTo(-60, 44); g.closePath(); g.fill(); g.strokeStyle = 'rgba(11,15,20,.35)'; g.lineWidth = 2; g.beginPath(); g.moveTo(70, 0); g.lineTo(-34, 0); g.stroke(); g.restore(); },
  });
})();
// ===== Weight vs height — recipes 2 (re-edit, long cut). Appended after recipes.js =====
// offer    : two trays slide in (A twenties pile, B hundreds stack), KEEP ONE tag
// gram     : tiny balance, $20 vs $100 settle level, 1 G tags, SAME WEIGHT ribbon
// rows     : POUNDS bar (long) vs INCHES bar (short)
// calendar : $100-a-day months filling up, years counter
// totals   : two columns $1.6M (hundreds) vs $1.8M (twenties) + gap tag
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, burst, roll } = B;
  const GREEN = '#1FA366', HUN = '#3BBE86';
  const bill = (g, x, y, w, h, c) => { clay(g, x, y, w, h - 1, Math.min(5, h / 3), c || GREEN, { shadowK: 0.4 }); g.fillStyle = 'rgba(245,243,238,.8)'; g.fillRect(x + w * 0.42, y + 1, w * 0.16, h - 3); };
  const pop = (t, a) => (t < a ? 0 : Math.max(0, spring(t - a, 'bouncy')));

  // ---------- offer ----------
  B.register('offer', {
    defaults: { keepAt: 99999 }, ownEnter: true, size: () => [980, 620],
    anchors: () => ({ a: [-250, 60, 420, 440], b: [250, 60, 420, 440], keep: [0, -250, 500, 120], all: [0, 0, 980, 620] }),
    draw(g, p, env) {
      const { t, theme, lt } = env; const k1 = ease.out(clamp(lt / 0.45)), k2 = ease.out(clamp((lt - 0.12) / 0.45));
      g.save(); g.globalAlpha *= clamp(lt / 0.06);
      // A tray from left
      g.save(); g.translate(lerp(-900, -250, k1), 60);
      clay(g, -210, 120, 420, 60, 24, theme.navy, { shadowK: 0.8 });
      for (let r = 0; r < 7; r++) for (let c = 0; c < 8 - r; c++) { g.save(); g.translate((c - (8 - r - 1) / 2) * 44, 104 - r * 17); bill(g, -22, -10, 44, 20, GREEN); g.restore(); }
      clay(g, -130, -220, 260, 84, 24, theme.good, { shadowK: 0.6 }); txt(g, 'A', -80, -178, F.hero(60), '#0B0F14'); txt(g, '$20s', 30, -176, F.hero(46), '#0B0F14');
      g.restore();
      // B tray from right
      g.save(); g.translate(lerp(900, 250, k2), 60);
      clay(g, -210, 120, 420, 60, 24, theme.navy, { shadowK: 0.8 });
      clay(g, -75, -90, 150, 205, 8, HUN, { shadowK: 0.7 }); g.save(); rr(g, -75, -90, 150, 205, 8); g.clip(); g.fillStyle = 'rgba(11,15,20,.16)'; for (let y = 110; y > -90; y -= 7) g.fillRect(-75, y, 150, 2); g.fillStyle = 'rgba(245,243,238,.55)'; g.fillRect(-12, -90, 24, 205); g.restore();
      clay(g, -130, -220, 260, 84, 24, theme.accent, { shadowK: 0.6 }); txt(g, 'B', -80, -178, F.hero(60), '#0B0F14'); txt(g, '$100s', 30, -176, F.hero(46), '#0B0F14');
      g.restore();
      // KEEP ONE tag
      if (t >= p.keepAt) { const s = t - p.keepAt, kk = pop(t, p.keepAt); g.save(); g.translate(0, -265); g.rotate(-0.04 * (1 - kk)); g.scale(0.4 + 0.6 * kk, 0.4 + 0.6 * kk); clay(g, -260, -52, 520, 104, 26, theme.paper, { shadowK: 0.7 }); txt(g, 'KEEP ONE', 0, 4, F.hero(72), theme.ink); g.restore(); }
      g.restore();
    },
  });

  // ---------- gram ----------
  B.register('gram', {
    defaults: { gAt: 99999, sameAt: 99999, dropAt: 0 }, ownEnter: true, size: () => [960, 640],
    anchors: () => ({ l: [-300, 40, 300, 300], r: [300, 40, 300, 300], same: [0, 270, 700, 110], all: [0, 0, 960, 640] }),
    draw(g, p, env) {
      const { t, theme, lt } = env; const k = Math.max(0, spring(lt, { f: 2.1, z: 0.55 }));
      g.save(); g.globalAlpha *= clamp(lt / 0.06); g.translate(0, -500 * (1 - Math.min(1.06, k)));
      paper(g, -480, -320, 960, 640, 28, { lift: env.lift });
      const settle = Math.exp(-(t - p.dropAt) * 3.2) * Math.cos((t - p.dropAt) * 9), tilt = t < p.dropAt ? 0.16 : 0.16 * settle; // radians
      // post
      clay(g, -20, -70, 40, 330, 10, theme.navy, { shadowK: 0.6 }); clay(g, -150, 250, 300, 36, 14, theme.navy, { shadowK: 0.6 });
      g.save(); g.translate(0, -80); g.rotate(tilt);
      clay(g, -380, -12, 760, 24, 12, theme.ink, { shadowK: 0.5 });
      const pan = (x, label, c, tc) => { g.save(); g.translate(x, 0); g.rotate(-tilt); g.strokeStyle = theme.ink; g.lineWidth = 4; g.beginPath(); g.moveTo(0, 0); g.lineTo(-90, 150); g.moveTo(0, 0); g.lineTo(90, 150); g.stroke(); clay(g, -110, 150, 220, 26, 12, theme.navy, { shadowK: 0.6 });
        const by = 150 - 40 - 20; g.save(); g.translate(0, by); const drop = ease.out(clamp((t - p.dropAt) / 0.3)); g.translate(0, -160 * (1 - drop)); g.rotate(x < 0 ? -0.05 : 0.05); bill(g, -90, -40, 180, 80, c); txt(g, label, 0, 4, F.hero(48), tc); g.restore();
        if (t >= p.gAt) { const kk = pop(t, p.gAt); g.save(); g.translate(0, 220); g.scale(0.4 + 0.6 * kk, 0.4 + 0.6 * kk); clay(g, -90, -34, 180, 68, 22, theme.ink, { shadowK: 0.6 }); txt(g, '1 GRAM', 0, 3, F.monoX(30), theme.accent); g.restore(); }
        g.restore(); };
      pan(-300, '$20', GREEN, '#F5F3EE'); pan(300, '$100', '#5BD6A0', '#0B0F14');
      g.restore();
      clay(g, -14, -100, 28, 28, 14, theme.accent, { shadowK: 0.4 });
      if (t >= p.sameAt) { const kk = pop(t, p.sameAt); g.save(); g.translate(0, 265); g.scale(0.5 + 0.5 * kk, 0.5 + 0.5 * kk); clay(g, -330, -50, 660, 100, 26, theme.good, { shadowK: 0.7 }); txt(g, 'SAME WEIGHT', 0, 4, F.hero(64), '#0B0F14'); g.restore(); }
      g.restore();
    },
  });

  // ---------- rows ----------
  B.register('rows', {
    defaults: { lbAt: 99999, inAt: 99999, moreAt: 99999 }, ownEnter: true, size: () => [980, 760],
    anchors: () => ({ lb: [0, -110, 900, 220], inch: [0, 140, 900, 220], more: [0, 300, 700, 110], all: [0, 0, 980, 760] }),
    draw(g, p, env) {
      const { t, theme, lt } = env; const k = Math.max(0, spring(lt, { f: 2.1, z: 0.55 }));
      g.save(); g.globalAlpha *= clamp(lt / 0.06); g.translate(0, 600 * (1 - Math.min(1.06, k)));
      paper(g, -490, -380, 980, 760, 28, { lift: env.lift }); g.save(); rr(g, -490, -380, 980, 760, 28); g.clip(); g.fillStyle = theme.navy; g.fillRect(-490, -380, 980, 100); g.restore();
      txt(g, 'AVERAGE MAN: WHICH IS BIGGER?', 0, -330, F.hero(48), theme.paper);
      const row = (y, at, label, val, full, col, unit, tickEvery) => {
        txt(g, label, -430, y - 78, F.hero(44), theme.ink, 'left');
        g.fillStyle = theme.paperShade; rr(g, -430, y - 50, 860, 90, 20); g.fill();
        if (t >= at) { const s = t - at, w = 860 * full * ease.out(clamp(s / 0.9)); clay(g, -430, y - 50, Math.max(30, w), 90, 20, col, { shadowK: 0.5 });
          g.save(); rr(g, -430, y - 50, Math.max(30, w), 90, 20); g.clip(); g.strokeStyle = 'rgba(11,15,20,.28)'; g.lineWidth = 3; for (let i = 1; i * tickEvery * 860 / 200 < w; i++) { const x = -430 + i * tickEvery * 860 / 200; g.beginPath(); g.moveTo(x, y - 50); g.lineTo(x, y + (i % 5 === 0 ? 40 : 4)); g.stroke(); } g.restore();
          roll(g, val * ease.out(clamp(s / 0.9)), 410, y - 78, { font: F.hero(60), size: 60, color: theme.ink, suffix: unit, align: 'right', speed: s < 0.9 ? 300 : 0 }); }
      };
      row(-130, p.lbAt, 'POUNDS HE WEIGHS', 199, 199 / 200, theme.good, ' LB', 10);
      row(100, p.inAt, 'INCHES HE STANDS', 69, 69 / 200, theme.accent, ' IN', 10);
      if (t >= p.moreAt) { const kk = pop(t, p.moreAt); g.save(); g.translate(0, 290); g.scale(0.5 + 0.5 * kk, 0.5 + 0.5 * kk); g.rotate(-0.03 * (1 - kk)); clay(g, -360, -56, 720, 112, 26, theme.good, { shadowK: 0.7 }); txt(g, 'WAY MORE POUNDS', 0, 5, F.hero(66), '#0B0F14'); g.restore(); }
      g.restore();
    },
  });

  // ---------- calendar ----------
  B.register('calendar', {
    defaults: { at: 99999, dur: 2.2, doneAt: 99999 }, ownEnter: true, size: () => [900, 940],
    anchors: () => ({ head: [0, -400, 860, 120], grid: [0, 0, 820, 640], days: [0, 400, 820, 130], all: [0, 0, 900, 940] }),
    draw(g, p, env) {
      const { t, theme, lt } = env; const k = Math.max(0, spring(lt, { f: 2.1, z: 0.55 }));
      g.save(); g.globalAlpha *= clamp(lt / 0.06); g.translate(0, 700 * (1 - Math.min(1.06, k)));
      paper(g, -450, -470, 900, 940, 28, { lift: env.lift }); g.save(); rr(g, -450, -470, 900, 940, 28); g.clip(); g.fillStyle = theme.navy; g.fillRect(-450, -470, 900, 120); g.restore();
      txt(g, '$100 A DAY', -400, -420, F.hero(54), theme.paper, 'left'); txt(g, 'EACH SQUARE = ONE MONTH', -398, -376, F.mono(22), rgba(theme.paper, 0.78), 'left');
      const u = ease.inOut(clamp((t - p.at) / p.dur)), months = 67 * u, cols = 7, cw = 104, gx = -(cols * cw) / 2 + cw / 2;
      for (let i = 0; i < 70; i++) { const c = i % cols, r = Math.floor(i / cols), x = gx + c * cw, y = -250 + r * 62, on = i < months;
        if (!on) { g.fillStyle = theme.paperShade; rr(g, x - 45, y - 24, 90, 48, 10); g.fill(); }
        else { const pk = i > months - 3 ? 1 + 0.15 * Math.sin((months - i) * 3) : 1; g.save(); g.translate(x, y); g.scale(pk, pk); bill(g, -45, -24, 90, 48, HUN); txt(g, '$', 0, 3, F.hero(30), '#0B0F14'); g.restore(); } }
      const days = Math.round(2030 * u); roll(g, days, -110, 410, { font: F.hero(96), size: 96, color: theme.ink, align: 'right', speed: u > 0 && u < 1 ? 2000 : 0 });
      txt(g, 'DAYS', -90, 420, F.hero(48), theme.inkSoft, 'left');
      if (t >= p.doneAt) { const kk = pop(t, p.doneAt); g.save(); g.translate(250, 410); g.rotate(-0.06); g.scale(0.4 + 0.6 * kk, 0.4 + 0.6 * kk); clay(g, -170, -62, 340, 124, 26, theme.accent, { shadowK: 0.7 }); txt(g, '5½ YEARS', 0, 6, F.hero(66), '#0B0F14'); g.restore(); burst(g, 250, 410, 260, theme.accent, t - p.doneAt - 0.05, 16, 0.5); }
      g.restore();
    },
  });

  // ---------- totals ----------
  B.register('totals', {
    defaults: { hAt: 99999, wAt: 99999, gapAt: 99999 }, ownEnter: true, size: () => [980, 900],
    anchors: () => ({ h: [-230, 80, 380, 700], w: [230, 80, 380, 700], hv: [-230, -330, 420, 110], wv: [230, -330, 420, 110], gap: [0, 360, 780, 130], all: [0, 0, 980, 900] }),
    draw(g, p, env) {
      const { t, theme, lt } = env; const k = Math.max(0, spring(lt, { f: 2.1, z: 0.55 }));
      g.save(); g.globalAlpha *= clamp(lt / 0.06); g.translate(0, 700 * (1 - Math.min(1.06, k)));
      paper(g, -490, -450, 980, 900, 28, { lift: env.lift }); g.save(); rr(g, -490, -450, 980, 900, 28); g.clip(); g.fillStyle = theme.navy; g.fillRect(-490, -450, 980, 96); g.restore();
      txt(g, 'SIDE BY SIDE (AVG MAN)', 0, -402, F.hero(46), theme.paper);
      const base = 250, top = 480;
      const col = (x, at, v, col2, label, vcol) => { const u = t >= at ? ease.expo(clamp((t - at) / 1.0)) : 0, h = (v / 1.8e6) * top * u; clay(g, x - 120, base - h, 240, Math.max(4, h), 14, col2, { shadowK: 0.6 }); g.save(); rr(g, x - 120, base - h, 240, Math.max(4, h), 14); g.clip(); g.fillStyle = 'rgba(11,15,20,.14)'; for (let y = base - 4; y > base - h; y -= 9) g.fillRect(x - 120, y, 240, 2); g.restore();
        txt(g, label, x, base + 36, F.hero(44), theme.ink); roll(g, v * u, x, -300, { font: F.hero(78), size: 78, color: vcol, prefix: '$', speed: u > 0 && u < 1 ? 1800000 : 0 }); };
      g.fillStyle = rgba(theme.ink, 0.4); rr(g, -440, base, 880, 6, 3); g.fill();
      col(-230, p.hAt, 1602300, HUN, 'HEIGHT IN $100s', theme.goodInk); col(230, p.wAt, 1805280, GREEN, 'WEIGHT IN $20s', theme.goodInk);
      if (t >= p.gapAt) { const kk = pop(t, p.gapAt); g.save(); g.translate(0, 360); g.scale(0.4 + 0.6 * kk, 0.4 + 0.6 * kk); clay(g, -380, -56, 760, 112, 28, theme.good, { shadowK: 0.8 }); txt(g, '$20s WIN BY $202,980', 0, 6, F.hero(60), '#0B0F14'); g.restore(); burst(g, 0, 360, 380, theme.good, t - p.gapAt - 0.05, 18, 0.6); }
      g.restore();
    },
  });
})();
const F0 = { x: 0, y: -190, w: 1240, h: 1220 };
const FR = { fill: 0.86, maxH: 1000, sx: 560, sy: 800 };
const HOOK = { lines: [[['PICK THE $100s =', 'paper']], [['A $200K F*CK-UP', 'bad']]], size: 88 };
const KEEP = ['hook', 'endt', 'scale', 'tower'];
const BTN = [['@Here\'s', '@fuck#2>+0.2']];
const LAST = '@fuck#2>';
BM2.scene({
  series: 'whatif', title: 'WEIGHT VS HEIGHT', duration: 66.09,
  footnote: ['HYPOTHETICAL · NOBODY IS OFFERING THIS · NOT FINANCIAL ADVICE', 'ASSUMES ≈1 G & 0.0043 IN PER BILL · CRISP, FLAT, WHOLE NOTES', 'AVG US MAN = CDC 199.0 LB · 68.9 IN (AUG 2021–AUG 2023)', 'PHOTOS: D.L. (CC BY-SA 2.0) · THE.COMEDIAN (CC BY 2.0) · VIA FLICKR'],
  elements: [
    { id: 'hook', type: 'text', at: [0, -690], in: -1, out: '@Here\'s-0.2', props: HOOK },
    { id: 'endt', type: 'text', at: [0, -690], in: LAST + '+0.25', props: HOOK },
    { id: 'scale', type: 'scale', at: [-300, 0], in: -1, props: { btnOff: BTN, slamAt: 0, btnAt: 0.1, pulses: ['@weight', '@bills'], bigAt: '@million#2-0.5', fill: [
      { t: 0, v: 4500 }, { t: '@Option-0.3', v: 4500 }, { t: '@Option-0.1', v: 0, e: 'out' }, { t: '@weight', v: 0 }, { t: '@bills+0.4', v: 31000, e: 'expo' }, { t: '@But-0.1', v: 31000 }, { t: '@But+0.4', v: 0, e: 'in' },
      { t: '@pound-0.3', v: 0 }, { t: '@pound+0.2', v: 1 }, { t: '@$9-0.1', v: 1 }, { t: '@$9+0.5', v: 454, e: 'expo' }, { t: '@His#3', v: 454 }, { t: '@20s#3', v: 30000, e: 'in' }, { t: '@million#2', v: 90264, e: 'expo' }, { t: '@So#2-0.4', v: 90264 }, { t: '@So#2', v: 90264 }, { t: LAST + '+0.25', v: 90264 }, { t: LAST + '+0.85', v: 4500 }] } },
    { id: 'tower', type: 'tower', at: [300, 0], in: -1, props: { btnOff: BTN, slamAt: 0.05, btnAt: 0.2, pulses: ['@hundreds#2', '@Option#2'], inchAt: '@inch', inchOut: '@Sounds', endAt: LAST + '+0.25', rise: [
      { t: 0, v: 36 }, { t: '@stacked', v: 36 }, { t: '@tall+0.3', v: 68.9, e: 'out' }, { t: '@And#2-0.5', v: 68.9 }, { t: '@And#2-0.1', v: 1, e: 'in' }, { t: '@His-0.3', v: 1 }, { t: '@million', v: 68.9, e: 'expo' }, { t: LAST + '+0.25', v: 68.9 }, { t: LAST + '+0.85', v: 36 }] } },
    { id: 'offer', type: 'offer', at: [0, 1750], in: '@Here\'s-0.1', out: '@Option+0.3', props: { keepAt: '@free' } },
    { id: 'gram', type: 'gram', at: [1900, 0], in: '@But-0.4', out: '@So+0.3', props: { dropAt: '@But+0.1', gAt: '@gram', sameAt: '@weighs' } },
    { id: 'rows', type: 'rows', at: [1900, 1750], in: '@Except-0.4', out: '@CDC-0.2', props: { lbAt: '@pounds', inAt: '@inches', moreAt: '@inches+0.5' } },
    { id: 'doll', type: 'doll', at: [-1900, 0], in: '@CDC-0.4', out: '@His+0.1', props: { lbAt: '@199-0.3', hAt: '@five' } },
    { id: 'tot', type: 'totals', at: [0, -1750], in: '@So#2-0.4', out: LAST + '-1.0', props: { hAt: '@So#2', wAt: '@damn#2', gapAt: '@200' } },
    { id: 'ph1', type: 'photo', layer: 'screen', at: [200, 1130], in: '@weight', out: '@Option#2', props: { src: 'brand/photos/stock/bathroom-scale/3.jpg', name: 'SCALE', credit: 'D.L. · CC BY-SA 2.0', w: 250, tilt: -0.07, treatment: 'polaroid', aspect: 1.0 } },
    { id: 'ph2', type: 'photo', layer: 'screen', at: [880, 1130], in: '@stacked', out: '@Double-0.2', props: { src: 'brand/photos/stock/stack-of-hundred-dollar-bills/2.jpg', name: '$100 STACK', credit: 'THE.COMEDIAN · CC BY 2.0', w: 250, tilt: 0.07, treatment: 'polaroid', aspect: 1.0 } },
    { id: 'hyp', type: 'chip', layer: 'screen', at: [850, 264], in: '@Here\'s', props: { text: 'HYPOTHETICAL', size: 24 } },
    { id: 'hund', type: 'text', layer: 'screen', at: [540, 345], in: '@yelled', out: '@But-0.1', props: { lines: [[['HUNDREDS?', 'accent']]], size: 96 } },
    { id: 'g1', type: 'chip', layer: 'screen', at: [540, 345], in: '@every', out: '@So-0.1', props: { text: '≈1 G A BILL · ASSUMED', size: 30 } },
    { id: 'lbt', type: 'text', layer: 'screen', at: [540, 345], in: '@pound', out: '@And#2-0.1', props: { lines: [[['1 LB =', 'paper'], [' 454 BILLS', 'good']]], size: 76 } },
    { id: 'inc', type: 'text', layer: 'screen', at: [540, 345], in: '@inch', out: '@Sounds', props: { lines: [[['1 INCH =', 'paper'], [' 233 BILLS', 'accent']]], size: 76 } },
    { id: 'next', type: 'text', layer: 'screen', at: [540, 350], in: '@Now', out: '@His#3', props: { lines: [[['HIS WEIGHT…', 'accent']]], size: 110 } },
    { id: 'heart', type: 'heart', layer: 'screen', at: [800, 900], in: '@tap', props: { s: 1, dur: 0.9 } },
    { id: 'plane', type: 'plane', layer: 'screen', at: [0, 0], in: '@Send-0.05', out: '@Send+1.0', props: { from: [470, 1000], to: [1150, 420], dur: 0.85, s: 0.62 } },
    { id: 'btn', type: 'follow', layer: 'screen', at: [650, 1120], in: '@follow+0.05', out: '@follow+1.45', props: { press: 0.55 } },
    { id: 'ask', type: 'bubble', layer: 'screen', at: [690, 720], in: '@So#3', out: LAST + '+0.25', props: { l1: '$20s OR THE', l2: '$200K F*CK-UP?', size: 46, tail: 'left' } },
  ],
  beats: [
    { at: 0, beat: 'side-by-side', focus: F0, ...FR, pose: 'shock', st: { x: 540, y: 1250, s: 1.25 }, keep: KEEP },
    { at: '@$200', beat: 'zoom-on-number', focus: 'hook', fill: 0.8, sy: 560, rot: 0.008, pose: 'point', keep: KEEP },
    { at: '@Here\'s-0.3', beat: 'pull-back', focus: F0, ...FR, pose: 'talk', keep: KEEP, drift: 0.02 },
    { at: '@Here\'s', beat: 'graphic-hero', focus: 'offer', move: 'whip', fill: 0.92, maxH: 900, sy: 780, st: 'corner', pose: 'point' },
    { at: '@free', beat: 'zoom-on-number', focus: 'offer.keep', fill: 0.8, sy: 700, rot: 0.01, st: 'corner-left', pose: 'shock', keep: ['offer'] },
    { at: '@Option', beat: 'graphic-hero', focus: 'scale', move: 'whip', fill: 0.8, maxH: 900, sy: 850, st: 'corner', pose: 'point' },
    { at: '@weight', beat: 'zoom-on-number', focus: 'scale.dial', fill: 0.62, sy: 760, rot: 0.01, st: 'corner', pose: 'shock', dur: 0.5 },
    { at: '@bills+0.4', beat: 'pull-back', focus: 'scale', fill: 0.82, maxH: 950, sy: 850, st: 'corner', pose: 'idle', drift: 0.03 },
    { at: '@Option#2', beat: 'graphic-hero', focus: 'tower', move: 'whip', fill: 0.8, maxH: 900, sy: 850, st: 'corner-left', pose: 'point' },
    { at: '@stacked', beat: 'zoom-on-number', focus: 'tower.stack', fill: 0.62, sy: 780, rot: -0.01, st: 'corner-left', pose: 'point', dur: 0.5 },
    { at: '@tall', beat: 'pull-back', focus: F0, ...FR, pose: 'chin', keep: KEEP },
    { at: '@Double', beat: 'graphic-hero', focus: 'tower', fill: 0.78, maxH: 900, sy: 850, st: 'right', pose: 'point', keep: ['tower'] },
    { at: '@brain', beat: 'presenter-front', focus: 'tower', fill: 0.78, maxH: 900, sy: 850, pose: 'chin', keep: ['tower'] },
    { at: '@But', beat: 'graphic-hero', focus: 'gram', move: 'whip', fill: 0.94, maxH: 900, sy: 780, st: 'corner', pose: 'idle' },
    { at: '@thin', beat: 'zoom-on-number', focus: 'gram.l', fill: 0.6, sy: 760, rot: 0.01, st: 'corner', pose: 'point', dur: 0.5, keep: ['gram'] },
    { at: '@weighs', beat: 'pull-back', focus: 'gram', fill: 0.94, maxH: 900, sy: 780, st: 'corner', pose: 'chin', keep: ['gram'] },
    { at: '@gram', beat: 'zoom-on-number', focus: 'gram.r', fill: 0.62, sy: 760, rot: -0.01, st: 'corner', pose: 'shock', dur: 0.5, keep: ['gram'] },
    { at: '@So', beat: 'graphic-hero', focus: 'scale', move: 'whip', fill: 0.84, maxH: 950, sy: 850, st: 'corner', pose: 'idle' },
    { at: '@pound', beat: 'zoom-on-number', focus: 'scale.pile', fill: 0.7, sy: 880, rot: 0.01, st: 'corner', pose: 'point', dur: 0.5 },
    { at: '@$9', beat: 'zoom-on-number', focus: 'scale.total', fill: 0.84, sy: 780, rot: -0.01, st: 'corner', pose: 'shock', dur: 0.5, keep: ['scale'] },
    { at: '@And#2', beat: 'graphic-hero', st: 'right', focus: 'tower', move: 'whip', sy: 850, maxH: 900, pose: 'idle' },
    { at: '@inch', beat: 'zoom-on-number', focus: 'tower.base', fill: 0.8, sy: 860, rot: -0.01, st: 'corner-left', pose: 'point' },
    { at: '@$23', beat: 'zoom-on-number', focus: 'tower.inch', fill: 0.85, sy: 860, rot: 0.01, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@Sounds', beat: 'presenter-front', focus: 'tower', fill: 0.78, maxH: 900, sy: 850, pose: 'shrug', keep: ['tower'] },
    { at: '@Except', beat: 'graphic-hero', focus: 'rows', move: 'whip', fill: 0.94, maxH: 900, sy: 780, st: 'corner', pose: 'point' },
    { at: '@pounds', beat: 'zoom-on-number', focus: 'rows.lb', fill: 0.9, sy: 760, rot: 0.01, st: 'corner-left', pose: 'point', dur: 0.5, keep: ['rows'] },
    { at: '@inches', beat: 'zoom-on-number', focus: 'rows.inch', fill: 0.9, sy: 780, rot: -0.01, st: 'corner-left', pose: 'shock', dur: 0.5, keep: ['rows'] },
    { at: '@Send', beat: 'graphic-hero', focus: 'rows', fill: 0.94, maxH: 900, sy: 780, st: 'right', pose: 'you', keep: ['rows'] },
    { at: '@grab', beat: 'peek', focus: 'rows', fill: 0.94, maxH: 900, sy: 780, pose: 'shock', keep: ['rows'] },
    { at: '@CDC', beat: 'graphic-hero', focus: 'doll', move: 'whip', fill: 0.55, maxH: 900, sy: 860, st: 'corner-left', pose: 'idle' },
    { at: '@199', beat: 'zoom-on-number', focus: 'doll.lb', fill: 0.62, sy: 760, rot: 0.01, st: 'corner-left', pose: 'point', keep: ['doll'], dur: 0.5 },
    { at: '@five', beat: 'zoom-on-number', focus: 'doll.h', fill: 0.62, sy: 760, rot: -0.01, st: 'corner-left', pose: 'shock', keep: ['doll'], dur: 0.5 },
    { at: '@His', beat: 'graphic-hero', focus: 'tower', move: 'whip', fill: 0.8, maxH: 900, sy: 850, st: 'corner-left', pose: 'idle' },
    { at: '@$1', beat: 'zoom-on-number', focus: 'tower.total', fill: 0.78, sy: 800, rot: 0.01, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@million+0.5', beat: 'pull-back', focus: 'tower', fill: 0.8, maxH: 900, sy: 850, st: 'corner-left', pose: 'chin', drift: 0.03 },
    { at: '@Now', beat: 'presenter-front', focus: 'scale', fill: 0.8, maxH: 900, sy: 850, pose: 'chin', keep: ['scale'] },
    { at: '@follow', beat: 'presenter-front', focus: 'scale', fill: 0.8, maxH: 900, sy: 850, pose: 'follow', keep: ['scale'] },
    { at: '@His#3', beat: 'graphic-hero', focus: 'scale', fill: 0.84, maxH: 900, sy: 850, st: 'right', pose: 'point' },
    { at: '@20s#3', beat: 'zoom-on-number', focus: 'scale.total', fill: 0.84, sy: 780, rot: 0.012, st: 'corner', pose: 'shock', dur: 0.5, keep: ['scale'] },
    { at: '@million#2', beat: 'zoom-on-number', focus: 'scale.pile', fill: 0.9, sy: 900, rot: -0.01, st: 'corner', pose: 'shock', dur: 0.6, drift: 0.03, keep: ['scale'] },
    { at: '@So#2', beat: 'graphic-hero', focus: 'tot', move: 'whip', fill: 0.94, maxH: 950, sy: 800, st: 'corner', pose: 'idle' },
    { at: '@200', beat: 'zoom-on-number', focus: 'tot.gap', fill: 0.88, sy: 800, rot: -0.01, st: 'corner-left', pose: 'shock', dur: 0.5, keep: ['tot'] },
    { at: '@tape', beat: 'pull-back', focus: 'tot', fill: 0.94, maxH: 950, sy: 800, st: 'corner', pose: 'shrug', drift: 0.03 },
    { at: '@So#3', beat: 'presenter-front', focus: F0, move: 'whip', ...FR, pose: 'shrug', keep: KEEP },
    { at: LAST + '+0.25', beat: 'side-by-side', focus: F0, move: 'whip', ...FR, pose: 'shock', keep: KEEP },
  ],
  poses: [['@follow', 'follow', { target: [650, 1120] }]],
  shakes: [[0.3, 10], ['@20s#3', 18], ['@200', 8], ['@free', 6]],
  captions: { gap: 16, emph: { '20s': 'good', '200': 'bad', '$9': 'good', '$23': 'good', 'million': 'good' }, fix: [['$20 bills','twenty dollar bills'], ['20s','twenties'], ['fuck -up.','F*CK-UP.'], ['fuck -up?','F*CK-UP?'], ['$200 ,000','two hundred grand'], ['200 grand','two hundred grand'], ['here','here,']] },
  bed: { name: 'upbeat_bed_2', gain: -1 },
  sfx: [
    { at: 0, name: 'deep_boom_2', gain: -4, dur: 0.36 }, { at: 0.2, name: 'paper_slam_1', gain: -6, dur: 0.5 }, { at: 0.3, name: 'thud_1', gain: -8, dur: 0.4 },
    { at: '@$200', name: 'rubber_stamp_2', gain: -7, dur: 0.5 },
    { at: '@Here\'s', name: 'pop_1', gain: -10, dur: 0.4 }, { at: '@free', name: 'rubber_stamp_2', gain: -9, dur: 0.5 },
    { at: '@Option', name: 'click_1', gain: -8, dur: 0.25 }, { at: '@Option#2', name: 'click_2', gain: -8, dur: 0.25 },
    { at: '@tap', name: 'pop_2', gain: -9, dur: 0.3 },
    { at: '@But+0.1', name: 'thud_2', gain: -9, dur: 0.4 }, { at: '@weighs', name: 'ding_2', gain: -9, dur: 0.6 }, { at: '@gram', name: 'coin_single_1', gain: -9, dur: 0.5 },
    { at: '@pound+0.2', name: 'money_counter_1', gain: -12, dur: 1.4 }, { at: '@$9+0.5', name: 'ding_2', gain: -9, dur: 0.6 },
    { at: '@inch', name: 'click_1', gain: -8, dur: 0.3 }, { at: '@$23', name: 'ding_2', gain: -8, dur: 0.6 },
    { at: '@pounds', name: 'click_2', gain: -9, dur: 0.2 }, { at: '@inches', name: 'click_2', gain: -9, dur: 0.2 }, { at: '@inches+0.5', name: 'pop_2', gain: -8, dur: 0.3 },
    { at: '@Send-0.05', name: 'swoosh_1', gain: -9, dur: 0.9 },
    { at: '@CDC', name: 'pop_1', gain: -9, dur: 0.4 }, { at: '@199-0.3', name: 'click_2', gain: -9, dur: 0.2 }, { at: '@five', name: 'click_2', gain: -9, dur: 0.2 },
    { at: '@His+0.2', name: 'money_counter_2', gain: -12, dur: 1.6 }, { at: '@million', name: 'ding_2', gain: -8, dur: 0.6 },
    { at: '@follow+0.05', name: 'pop_1', gain: -9, dur: 0.5 }, { at: '@follow+0.6', name: 'click_1', gain: -8, dur: 0.3 }, { at: '@follow+0.7', name: 'success_chime_1', gain: -12, dur: 1.2 },
    { at: '@His#3', name: 'suspense_drone_1', gain: -14, dur: 1.2 },
    { at: '@20s#3', name: 'money_counter_2', gain: -10, dur: 1.4 }, { at: '@million#2-0.4', name: 'deep_boom_1', gain: -2, dur: 1.6 }, { at: '@million#2-0.4', name: 'cinematic_hit_1', gain: -6, dur: 1.2 },
    { at: '@200', name: 'rubber_stamp_2', gain: -5, dur: 0.5 }, { at: '@200', name: 'ding_2', gain: -7, dur: 0.6 },
    { at: '@So#3-0.1', name: 'pop_1', gain: -9, dur: 0.5 },
  ],
});
