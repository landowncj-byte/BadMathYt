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
