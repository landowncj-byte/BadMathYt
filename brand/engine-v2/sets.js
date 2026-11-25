// Bad Math engine v2 — SETS (backgrounds). A set is 4 parallax layers + ambient motion; all pure functions of time.
//   BM2.Sets.define('cellar', { palette:{...}, wideW:1100, home:{x:0,y:-300}, layers:[ {id:'far', p:0.35, draw(g, env){}}, {id:'mid', p:0.65, ...}, {id:'near', p:1, ...}, {id:'fg', p:1.4, ...} ] })
// env = { t, pal, x0, x1, y0, y1 (visible range in THIS layer's coordinates), gy (y of the floor line in this layer when the camera is at home), z, hash, w (layer pixel width) }
// The near layer (p = 1) is the stage: the floor line is y = 0, characters and props stand on it. Draw with infinite tiling so any pan / whip stays covered.
// Layer draws use flat colour + the shared ink outline; no randomness except B.hash (deterministic). Ambient = lights that pulse, clouds that drift, crowds that bob.
(function () {
  const B = window.BM2, { clamp, lerp, hash } = B, TAU = Math.PI * 2, S = (B.Sets = { sets: {}, HOME_Y: -300 });
  S.define = (name, def) => (S.sets[name] = def);
  const ink = () => B.Style.ink, ol = () => B.Style.ol, sh = (c, k) => B.shade(c, k);
  const tiles = (x0, x1, per, fn) => { for (let i = Math.floor(x0 / per) - 1; i <= Math.ceil(x1 / per); i++) fn(i * per, i, hash(i * 7.31 + 3.1)); };
  const blob = (g, fill, lw) => { g.fillStyle = fill; g.fill(); if (lw) { g.lineWidth = lw; g.strokeStyle = ink(); g.lineJoin = 'round'; g.stroke(); } };
  const flick = (t, k, a = 0.12) => 1 - a + a * Math.sin(Math.floor(t * 10) * 12.9898 + k * 78.233) * 0.5 + a * 0.5 * (hash(Math.floor(t * 10) + k * 9.7) - 0.5); // lights flicker on 10 fps steps
  const glow = (g, x, y, r, col, a) => { const rg = g.createRadialGradient(x, y, 0, x, y, r); rg.addColorStop(0, B.rgba(col, a)); rg.addColorStop(1, B.rgba(col, 0)); g.fillStyle = rg; g.fillRect(x - r, y - r, r * 2, r * 2); };
  S.glow = glow; S.tiles = tiles; S.flick = flick;

  // ---------------------------------------------------------------- CELLAR (wine cellar / vault)
  S.define('cellar', {
    palette: { wall: '#4a3a46', wall2: '#3a2c38', arch: '#2b2029', stone: '#5a4757', floor: '#6b4b3a', floor2: '#5a3e30', wood: '#8c5a35', lamp: '#ffc86b', accent: '#a8283a', fog: '#2a1d28' },
    wideW: 1100, home: { x: 0, y: -300 },
    layers: [
      { id: 'far', p: 0.35, draw(g, e) { const P = e.pal; g.fillStyle = P.wall2; g.fillRect(e.x0, e.y0, e.x1 - e.x0, e.y1 - e.y0);
        tiles(e.x0, e.x1, 360, (x, i) => { g.beginPath(); g.moveTo(x + 40, e.gy - 150 + 150); g.lineTo(x + 40, e.gy - 330); g.quadraticCurveTo(x + 180, e.gy - 520, x + 320, e.gy - 330); g.lineTo(x + 320, e.gy); g.closePath(); blob(g, P.arch, 0); g.fillStyle = sh(P.arch, -0.3); g.fillRect(x + 90, e.gy - 280, 180, 280); }); } },
      { id: 'mid', p: 0.65, draw(g, e) { const P = e.pal, t = e.t;
        tiles(e.x0, e.x1, 620, (x, i, h) => { // wine racks every 620px (grid of bottle ends) and barrels
          if (h < 0.55) { const rw = 360, rh = 300, y0 = e.gy - rh; g.beginPath(); g.rect(x, y0, rw, rh); blob(g, sh(P.wood, -0.25), ol() * 0.8); for (let r = 0; r < 5; r++) for (let c = 0; c < 7; c++) { g.beginPath(); g.arc(x + 28 + c * 50, y0 + 30 + r * 56, 18, 0, TAU); blob(g, (r + c) % 3 ? '#2e1f2c' : '#7d2b3a', ol() * 0.6); } }
          else { for (let k = 0; k < 2; k++) { const bx = x + 80 + k * 190, by = e.gy; g.beginPath(); g.moveTo(bx - 70, by); g.quadraticCurveTo(bx - 90, by - 90, bx - 70, by - 180); g.lineTo(bx + 70, by - 180); g.quadraticCurveTo(bx + 90, by - 90, bx + 70, by); g.closePath(); blob(g, sh(P.wood, -0.1), ol() * 0.8); g.beginPath(); g.moveTo(bx - 76, by - 140); g.lineTo(bx + 76, by - 140); g.moveTo(bx - 76, by - 40); g.lineTo(bx + 76, by - 40); g.lineWidth = 8; g.strokeStyle = '#2b2a2c'; g.stroke(); } } });
        tiles(e.x0, e.x1, 520, (x, i, h) => { const sw = Math.sin(t * 1.3 + i * 2) * 0.05, fl = flick(t, i); g.save(); g.translate(x + 260, e.gy - 620); g.rotate(sw); g.beginPath(); g.moveTo(0, -300); g.lineTo(0, 0); g.lineWidth = 5; g.strokeStyle = ink(); g.stroke(); g.beginPath(); g.moveTo(-26, 0); g.lineTo(26, 0); g.lineTo(16, 30); g.lineTo(-16, 30); g.closePath(); blob(g, '#2b2a2c', ol() * 0.7); glow(g, 0, 40, 260, P.lamp, 0.5 * fl); g.beginPath(); g.arc(0, 36, 11, 0, TAU); g.fillStyle = P.lamp; g.fill(); g.restore(); }); } },
      { id: 'near', p: 1, draw(g, e) { const P = e.pal, t = e.t; // wall base, floor, light pools
        g.fillStyle = P.wall; g.fillRect(e.x0, e.y0, e.x1 - e.x0, -e.y0 + 0 - 0 + 1); // wall above the floor
        tiles(e.x0, e.x1, 190, (x, i, h) => { g.beginPath(); g.rect(x, -280 - 0, 190, 280); g.fillStyle = h > 0.5 ? P.wall : sh(P.wall, 0.05); g.fill(); g.lineWidth = 3; g.strokeStyle = sh(P.wall, -0.4); g.stroke(); });
        g.fillStyle = P.stone; g.fillRect(e.x0, -26, e.x1 - e.x0, 26); g.lineWidth = ol(); g.strokeStyle = ink(); g.beginPath(); g.moveTo(e.x0, 0); g.lineTo(e.x1, 0); g.stroke();
        g.fillStyle = P.floor; g.fillRect(e.x0, 0, e.x1 - e.x0, e.y1);
        tiles(e.x0, e.x1, 160, (x, i, h) => { g.beginPath(); g.moveTo(x, 0); g.lineTo(x - 90 - 40 * (i % 3), e.y1); g.lineWidth = 3; g.strokeStyle = P.floor2; g.stroke(); });
        for (const y of [90, 230, 450]) { g.beginPath(); g.moveTo(e.x0, y); g.lineTo(e.x1, y); g.lineWidth = 3; g.strokeStyle = P.floor2; g.stroke(); }
        tiles(e.x0, e.x1, 520, (x, i) => { const fl = flick(t, i); glow(g, x + 260, 40, 280, P.lamp, 0.26 * fl); }); } },
      { id: 'fg', p: 1.4, draw(g, e) { const P = e.pal, t = e.t; // out-of-focus foreground: drifting dust motes + dark cobweb corner
        tiles(e.x0, e.x1, 700, (x, i, h) => { for (let k = 0; k < 3; k++) { const hh = hash(i * 5.1 + k * 2.3), px = x + hh * 700, py = e.y0 + ((hash(i + k * 9.1) * (e.y1 - e.y0) + t * (10 + 14 * hh)) % (e.y1 - e.y0)); g.beginPath(); g.arc(px, py, 5 + hh * 8, 0, TAU); g.fillStyle = B.rgba(P.lamp, 0.22); g.fill(); } }); } },
    ],
  });

  // ---------------------------------------------------------------- OFFICE / courtroom-ish interior with a skyline window
  S.define('office', {
    palette: { wall: '#d9d2c0', wall2: '#c9c0aa', trim: '#8a7a62', floor: '#6d6a74', floor2: '#5b5864', sky: '#9fd0ee', sky2: '#d8ecf7', building: '#7d93ad', building2: '#5f7792', accent: '#c9402f', plant: '#3e8c4b', lamp: '#fff2c4' },
    wideW: 1100, home: { x: 0, y: -300 },
    layers: [
      { id: 'far', p: 0.25, draw(g, e) { const P = e.pal, t = e.t; const gr = g.createLinearGradient(0, e.y0, 0, e.gy); gr.addColorStop(0, P.sky); gr.addColorStop(1, P.sky2); g.fillStyle = gr; g.fillRect(e.x0, e.y0, e.x1 - e.x0, e.y1 - e.y0);
        tiles(e.x0, e.x1, 900, (x, i, h) => { const cx = x + ((t * (14 + 10 * h) + h * 900) % 900) - 0, cy = e.gy - 520 - 120 * h; g.fillStyle = 'rgba(255,255,255,.9)'; for (const [dx, dy, r] of [[0, 0, 60], [60, 14, 48], [-60, 18, 44], [20, -24, 40]]) { g.beginPath(); g.arc(cx + dx, cy + dy, r, 0, TAU); g.fill(); } });
        tiles(e.x0, e.x1, 300, (x, i, h) => { const bh = 260 + 280 * h; g.fillStyle = i % 2 ? P.building : P.building2; g.fillRect(x + 8, e.gy - bh + 120, 270, bh + 400); g.fillStyle = 'rgba(255,255,255,.35)'; for (let r = 0; r < 8; r++) for (let c = 0; c < 4; c++) if (hash(i * 3.3 + r * 1.7 + c * 5.1 + Math.floor(t * 0.2)) > 0.45) g.fillRect(x + 28 + c * 62, e.gy - bh + 150 + r * 54, 30, 30); }); } },
      { id: 'mid', p: 0.6, draw(g, e) { const P = e.pal; // wall with a window band: draw wall everywhere except window holes (the far layer shows through)
        tiles(e.x0, e.x1, 760, (x, i, h) => { g.fillStyle = P.wall; g.fillRect(x, e.y0, 760, e.y1 - e.y0); });
        tiles(e.x0, e.x1, 760, (x, i, h) => { g.save(); g.beginPath(); g.rect(x + 130, e.gy - 560, 500, 340); g.clip(); g.restore(); }); } },
      { id: 'near', p: 1, draw(g, e) { const P = e.pal, t = e.t;
        g.fillStyle = P.wall; g.fillRect(e.x0, e.y0, e.x1 - e.x0, -e.y0);
        tiles(e.x0, e.x1, 900, (x, i, h) => { // window hole showing the far layer is impractical; draw a framed window with sky gradient instead
          g.beginPath(); g.roundRect(x + 120, -610, 560, 380, 8); const gr = g.createLinearGradient(0, -610, 0, -230); gr.addColorStop(0, P.sky); gr.addColorStop(1, P.sky2); g.fillStyle = gr; g.fill();
          for (let k = 0; k < 6; k++) { const bx = x + 140 + k * 88, bh = 80 + 120 * hash(i * 6 + k); g.fillStyle = k % 2 ? P.building : P.building2; g.fillRect(bx, -230 - bh, 80, bh); }
          const cx = x + 120 + ((t * 18 + h * 500) % 700) - 70; g.fillStyle = 'rgba(255,255,255,.9)'; g.beginPath(); g.arc(cx, -520, 30, 0, TAU); g.arc(cx + 34, -512, 24, 0, TAU); g.arc(cx - 32, -510, 22, 0, TAU); g.fill(); g.save(); g.beginPath(); g.rect(x + 120, -610, 560, 380); g.restore();
          g.beginPath(); g.roundRect(x + 120, -610, 560, 380, 8); g.lineWidth = ol() * 1.2; g.strokeStyle = ink(); g.stroke(); g.beginPath(); g.moveTo(x + 400, -610); g.lineTo(x + 400, -230); g.moveTo(x + 120, -420); g.lineTo(x + 680, -420); g.lineWidth = ol(); g.stroke(); g.beginPath(); g.roundRect(x + 100, -236, 600, 18, 4); blob(g, P.trim, ol() * 0.8); });
        g.fillStyle = P.wall2; g.fillRect(e.x0, -90, e.x1 - e.x0, 90); g.beginPath(); g.moveTo(e.x0, -90); g.lineTo(e.x1, -90); g.lineWidth = 5; g.strokeStyle = sh(P.wall2, -0.4); g.stroke();
        g.fillStyle = P.floor; g.fillRect(e.x0, 0, e.x1 - e.x0, e.y1); g.lineWidth = ol(); g.strokeStyle = ink(); g.beginPath(); g.moveTo(e.x0, 0); g.lineTo(e.x1, 0); g.stroke();
        tiles(e.x0, e.x1, 220, (x, i) => { g.beginPath(); g.moveTo(x, 0); g.lineTo(x - 100 * (1 + (i % 2) * 0.4), e.y1); g.lineWidth = 3; g.strokeStyle = P.floor2; g.stroke(); }); } },
      { id: 'fg', p: 1.35, draw(g, e) { const P = e.pal, t = e.t; tiles(e.x0, e.x1, 1400, (x, i, h) => { g.save(); g.translate(x + 200, e.y1 - 40); const sw = Math.sin(t * 0.9 + i) * 0.03; g.rotate(sw); for (let k = 0; k < 5; k++) { g.save(); g.rotate((k - 2) * 0.35); g.beginPath(); g.ellipse(0, -140, 34, 150, 0, 0, TAU); g.fillStyle = k % 2 ? sh(P.plant, -0.25) : sh(P.plant, -0.1); g.fill(); g.restore(); } g.restore(); }); } },
    ],
  });

  // ---------------------------------------------------------------- STREET (night city)
  S.define('street', {
    palette: { sky: '#1b2447', sky2: '#4b4f86', building: '#2a3158', building2: '#222849', window: '#ffd97a', shop: '#3a3f6b', awning: '#c9402f', walk: '#6c6f8c', walk2: '#585a78', curb: '#8b8da8', neon: '#ff4f8b', lamp: '#ffd58a' },
    wideW: 1100, home: { x: 0, y: -300 },
    layers: [
      { id: 'far', p: 0.2, draw(g, e) { const P = e.pal, t = e.t; const gr = g.createLinearGradient(0, e.y0, 0, e.gy); gr.addColorStop(0, P.sky); gr.addColorStop(1, P.sky2); g.fillStyle = gr; g.fillRect(e.x0, e.y0, e.x1 - e.x0, e.y1 - e.y0);
        tiles(e.x0, e.x1, 140, (x, i, h) => { if (h > 0.6) { const tw = Math.floor(t * 3 + h * 9) % 3; g.fillStyle = tw ? 'rgba(255,255,255,.8)' : 'rgba(255,255,255,.3)'; g.fillRect(x + h * 100, e.gy - 900 - 600 * hash(i * 1.9), 4, 4); } });
        g.fillStyle = '#e9e6cf'; g.beginPath(); g.arc(e.x0 * 0 + 260, e.gy - 760, 70, 0, TAU); g.fill();
        tiles(e.x0, e.x1, 210, (x, i, h) => { const bh = 220 + 380 * h; g.fillStyle = P.building2; g.fillRect(x, e.gy - bh, 200, bh + 400); }); } },
      { id: 'mid', p: 0.6, draw(g, e) { const P = e.pal, t = e.t; tiles(e.x0, e.x1, 330, (x, i, h) => { const bh = 420 + 380 * h; g.fillStyle = P.building; g.fillRect(x, e.gy - bh, 310, bh + 400); g.lineWidth = 3; g.strokeStyle = 'rgba(0,0,0,.35)'; g.strokeRect(x, e.gy - bh, 310, bh + 400);
          for (let r = 0; r < Math.floor(bh / 70); r++) for (let c = 0; c < 4; c++) { const on = hash(i * 11.3 + r * 3.7 + c * 1.9) > 0.5 && !(hash(i * 5 + r + c + Math.floor(t * 0.5)) > 0.97); g.fillStyle = on ? P.window : '#161b36'; g.fillRect(x + 22 + c * 70, e.gy - bh + 34 + r * 70, 38, 38); } }); } },
      { id: 'near', p: 1, draw(g, e) { const P = e.pal, t = e.t;
        tiles(e.x0, e.x1, 520, (x, i, h) => { g.beginPath(); g.rect(x, -420, 500, 420); blob(g, P.shop, ol() * 0.9); g.beginPath(); g.moveTo(x - 10, -330); g.lineTo(x + 510, -330); g.lineTo(x + 480, -270); g.lineTo(x + 20, -270); g.closePath(); blob(g, i % 2 ? P.awning : '#2f8f6b', ol() * 0.9); g.beginPath(); g.roundRect(x + 40, -240, 190, 200, 6); g.fillStyle = P.window; g.fill(); g.lineWidth = ol() * 0.9; g.strokeStyle = ink(); g.stroke(); g.beginPath(); g.roundRect(x + 290, -240, 140, 240, 6); blob(g, sh(P.shop, -0.3), ol() * 0.9); const nf = Math.floor(t * 6 + i) % 14 > 0 ? 1 : 0.35; g.save(); g.globalAlpha = nf; g.font = '40px Anton, Impact, sans-serif'; g.textAlign = 'center'; g.fillStyle = P.neon; g.fillText(['OPEN', 'BAR', 'DELI', 'PAWN'][i & 3 & 3 ? (i & 3) : 0] || 'OPEN', x + 250, -372); g.restore(); glow(g, x + 135, -140, 190, P.window, 0.3); });
        g.fillStyle = P.walk; g.fillRect(e.x0, 0, e.x1 - e.x0, e.y1); g.fillStyle = P.curb; g.fillRect(e.x0, 0, e.x1 - e.x0, 22); g.beginPath(); g.moveTo(e.x0, 0); g.lineTo(e.x1, 0); g.lineWidth = ol(); g.strokeStyle = ink(); g.stroke();
        tiles(e.x0, e.x1, 150, (x, i) => { g.beginPath(); g.moveTo(x, 22); g.lineTo(x - 60, e.y1); g.lineWidth = 3; g.strokeStyle = P.walk2; g.stroke(); }); } },
      { id: 'fg', p: 1.4, draw(g, e) { const P = e.pal, t = e.t; tiles(e.x0, e.x1, 1500, (x, i, h) => { const lx = x + 300; g.beginPath(); g.rect(lx - 14, e.y0, 28, e.y1 - e.y0); g.fillStyle = '#12142a'; g.fill(); glow(g, lx, e.gy - 700, 420, P.lamp, 0.35 * flick(t, i, 0.18)); }); } },
    ],
  });

  // ---------------------------------------------------------------- STUDIO (plain cyclorama for cards / isolated reactions)
  S.define('studio', {
    palette: { bg: '#e8e0cf', bg2: '#d6cbb4', floor: '#bdb199', line: '#a99c82' }, wideW: 1100, home: { x: 0, y: -300 },
    layers: [
      { id: 'far', p: 0.3, draw(g, e) { const P = e.pal; const gr = g.createLinearGradient(0, e.y0, 0, e.gy); gr.addColorStop(0, P.bg2); gr.addColorStop(1, P.bg); g.fillStyle = gr; g.fillRect(e.x0, e.y0, e.x1 - e.x0, e.y1 - e.y0); } },
      { id: 'mid', p: 0.6, draw() {} },
      { id: 'near', p: 1, draw(g, e) { const P = e.pal; g.fillStyle = P.floor; g.fillRect(e.x0, 0, e.x1 - e.x0, e.y1); g.beginPath(); g.moveTo(e.x0, 0); g.lineTo(e.x1, 0); g.lineWidth = ol(); g.strokeStyle = ink(); g.stroke(); } },
      { id: 'fg', p: 1.4, draw() {} },
    ],
  });
})();
