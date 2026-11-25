// ===== BitConnect — shared custom recipes =====
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, countAt, hash, hit } = B;
  const tone = (n, p) => B.tone(n, p);
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const fmt = (v) => B.fmtNum(Math.round(v), 0, true);
  const approx = (g, cx, cy, w, col, lw) => { g.save(); g.strokeStyle = col; g.lineWidth = lw; g.lineCap = 'round'; for (const dy of [-lw * 1.1, lw * 1.1]) { g.beginPath(); for (let i = 0; i <= 20; i++) { const u = i / 20, x = cx - w / 2 + u * w, y = cy + dy + Math.sin(u * Math.PI * 2) * lw * 0.9; i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); } g.restore(); };

  const fitW = (g, v, o, maxW) => Math.min(1, maxW / B.rollWidth(g, v, o).w);
  const coin = (g, x, y, r, a = 1) => { g.save(); g.globalAlpha *= a; g.translate(x, y); const gr = g.createLinearGradient(-r, -r, r, r); gr.addColorStop(0, '#ffe27a'); gr.addColorStop(1, '#F2B705'); g.fillStyle = gr; g.beginPath(); g.arc(0, 0, r, 0, 7); g.fill(); g.strokeStyle = '#B88700'; g.lineWidth = Math.max(2, r * 0.1); g.beginPath(); g.arc(0, 0, r * 0.74, 0, 7); g.stroke(); txt(g, '$', 0, r * 0.05, F.hero(r * 1.1), '#B88700'); g.restore(); };
  const wallet = (g, x, y, w, h, col, s = 1, a = 1) => { g.save(); g.globalAlpha *= a; g.translate(x, y); g.scale(s, s); clay(g, -w / 2, -h / 2, w, h, 14, col, { shadowK: 0.5 }); g.fillStyle = 'rgba(0,0,0,.2)'; g.fillRect(-w / 2 + 6, -h / 2 + h * 0.2, w - 12, 4); clay(g, w / 2 - w * 0.36, -h * 0.1, w * 0.42, h * 0.36, 10, B.shade(col, -0.22), { shadowK: 0.2 }); g.fillStyle = '#F5F3EE'; g.beginPath(); g.arc(w / 2 - w * 0.15, h * 0.08, h * 0.06, 0, 7); g.fill(); g.restore(); };

  // ---------- compound: THE counter. "$1,000 @ 1% A DAY" with a day ticker, a rolling value and milestone rows that slam in ----------
  B.register('compound', {
    defaults: { w: 800, h: 1040, title: '$1,000 @ 1% A DAY', keys: [[0, 0]], rows: [], reset: 99999 },
    size: p => [p.w, p.h],
    anchors(p) { const y0 = -p.h / 2, a = { head: [0, y0 + 70, p.w, 140], rate: [-90, y0 + 62, 580, 96], day: [0, y0 + 225, p.w * 0.9, 150], value: [0, y0 + 405, p.w * 0.94, 230] }; p.rows.forEach((r, i) => { a['m' + i] = [0, y0 + 590 + i * 108, p.w * 0.9, 100]; }); return a; },
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2;
      const F1 = 1e9 / (1000 * Math.pow(1.01, 1389)), val = d => 1000 * Math.pow(1.01, d) * Math.pow(F1, clamp((d - 1095) / 294));
      const dayAt = tt => { const K = p.keys; let d = K[K.length - 1][1]; if (tt <= K[0][0]) d = K[0][1]; else for (let i = 0; i < K.length - 1; i++) { const a = K[i], b = K[i + 1]; if (tt >= a[0] && tt < b[0]) { d = lerp(a[1], b[1], ease.inOut(clamp((tt - a[0]) / (b[0] - a[0])))); break; } } if (tt >= p.reset) d = lerp(d, 0, ease.inOut(clamp((tt - p.reset) / 0.55))); return d; };
      const d = dayAt(t), d2 = dayAt(t + 0.02), v = val(d), dv = Math.abs(val(d2) - v) / 0.02, dd = Math.abs(d2 - d) / 0.02;
      paper(g, x0, y0, w, h, 26, { lift });
      g.save(); rr(g, x0, y0, w, h, 26); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 140); const hg = g.createLinearGradient(0, y0, 0, y0 + 140); hg.addColorStop(0, 'rgba(255,255,255,.12)'); hg.addColorStop(1, 'rgba(0,0,0,.14)'); g.fillStyle = hg; g.fillRect(x0, y0, w, 140); g.restore();
      txt(g, p.title, x0 + 36, y0 + 58, F.hero(68), theme.paper, 'left'); txt(g, 'ASSUMES 1% EVERY DAY, COMPOUNDED', x0 + 38, y0 + 110, F.mono(21), rgba(theme.paper, 0.78), 'left');
      clay(g, x0 + w - 206, y0 + 26, 170, 48, 12, theme.bad, { shadowK: 0.4 }); txt(g, 'OUR MATH', x0 + w - 121, y0 + 51, F.cap(26), theme.paper);
      // day ticker
      txt(g, 'DAY', x0 + 50, y0 + 228, F.cap(44), theme.inkSoft, 'left');
      { let s = 1; for (const r of p.rows) if (t >= r.at && t < p.reset) s += 0.06 * hit(t - r.at, 8); g.save(); g.translate(x0 + w - 50, y0 + 225); g.scale(s, s); g.translate(-(x0 + w - 50), -(y0 + 225)); roll(g, Math.round(d), x0 + w - 50, y0 + 225, { font: F.hero(124), size: 124, color: theme.ink, align: 'right', speed: dd }); g.restore(); }
      g.strokeStyle = theme.rule; g.lineWidth = 3; g.setLineDash([10, 9]); g.beginPath(); g.moveTo(x0 + 40, y0 + 318); g.lineTo(x0 + w - 40, y0 + 318); g.stroke(); g.setLineDash([]);
      // value
      { let s = 1; for (const r of p.rows) if (t >= r.at && t < p.reset) { s += 0.09 * hit(t - r.at, 7); burst(g, 0, y0 + 405, w * 0.4, theme.accent, t - r.at, 16, 0.5); }
        if (env.hot === 'value') s += 0.03 * env.hotK; const o = { font: F.hero(190), size: 190, color: v >= 1e6 ? theme.badInk : theme.ink, prefix: '$', speed: dv }, k = fitW(g, Math.max(v, 1000), o, w - 70);
        g.save(); g.translate(0, y0 + 425); g.scale(s * k, s * k); roll(g, v, 0, 0, o); g.restore(); }
      // milestone rows
      p.rows.forEach((r, i) => {
        const ry = y0 + 590 + i * 108, lt = t - r.at, gone = t >= p.reset;
        if (lt < 0 || gone) { g.save(); g.strokeStyle = rgba(theme.rule, 0.9); g.lineWidth = 3; g.setLineDash([9, 9]); rr(g, x0 + 36, ry - 46, w - 72, 92, 18); g.stroke(); g.restore(); return; }
        const k = spring(lt, 'snappy'), sc = 1.3 - 0.3 * k; g.save(); g.globalAlpha = clamp(lt / 0.06); g.translate(0, ry); g.scale(sc, sc);
        g.fillStyle = theme.paperShade; rr(g, x0 + 36, -46, w - 72, 92, 18); g.fill(); const c = tone(r.tone || 'bad', true); g.fillStyle = c; rr(g, x0 + 36, -46, 14, 92, 7); g.fill();
        txt(g, r.day, x0 + 76, 3, F.monoX(38), theme.ink, 'left'); txt(g, r.v, x0 + w - 62, 4, F.hero(r.size || 62), c, 'right'); marker(g, x0 + 60, 30, w - 120, 7, c, clamp((lt - 0.05) / 0.3), 0.5); g.restore(); burst(g, 0, ry, w * 0.36, theme.bad, lt, 14, 0.45);
      });
      txt(g, '$1,000 × 1.01 ^ DAYS', 0, y0 + h - 30, F.mono(22), theme.inkSoft);
    },
  });

  // ---------- bot: generic TRADING BOT box with a curtain; opens to show coins piped from new wallets to old wallets ----------
  B.register('bot', {
    defaults: { w: 820, h: 1140, noTaken: false, curtainAt: 99999, tagAt: 99999, coinInAt: 99999, payAt: 99999, takenAt: 99999, takenDur: 1.6, to: 2400000000 },
    size: p => [p.w, p.h],
    anchors(p) { const y0 = -p.h / 2; return { head: [0, y0 + 75, p.w, 150], pipe: [0, y0 + 440, p.w - 100, 500], window: [0, y0 + 440, p.w - 100, 500], taken: [0, y0 + 915, p.w * 0.94, 170] }; },
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, ww = w - 100, wh = 500, wx = x0 + 50, wy = y0 + 190, cy = wy + wh / 2;
      paper(g, x0, y0, w, h, 26, { lift });
      g.save(); rr(g, x0, y0, w, h, 26); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 150); const hg = g.createLinearGradient(0, y0, 0, y0 + 150); hg.addColorStop(0, 'rgba(255,255,255,.12)'); hg.addColorStop(1, 'rgba(0,0,0,.14)'); g.fillStyle = hg; g.fillRect(x0, y0, w, 150); g.restore();
      txt(g, 'BITCONNECT', x0 + 40, y0 + 62, F.hero(84), theme.paper, 'left'); txt(g, '2017 · THE "TRADING BOT"', x0 + 42, y0 + 118, F.mono(24), rgba(theme.paper, 0.78), 'left');
      // window frame
      clay(g, wx - 12, wy - 12, ww + 24, wh + 24, 30, theme.manila, { shadowK: 0.5 });
      g.save(); rr(g, wx, wy, ww, wh, 22); g.clip();
      const bg = g.createLinearGradient(0, wy, 0, wy + wh); bg.addColorStop(0, '#2a3652'); bg.addColorStop(1, '#161d2e'); g.fillStyle = bg; g.fillRect(wx, wy, ww, wh);
      const ot = t - p.curtainAt, open = ot > 0;
      g.translate(0, cy);
      if (open) {
        // wallets, pipe, flowing coins
        const SP = 0.55, spawn = j => 0.35 + j / (6 * SP); let pulseL = 0, pulseR = 0;
        for (let j = 0; j < 6; j++) for (let m = 0; m < 12; m++) { const ts = spawn(j) + m / SP, ta = ts + 1 / SP; if (ot > ts) pulseL += hit(ot - ts, 12); if (ot > ta) pulseR += hit(ot - ta, 12); }
        const op = clamp(ot / 0.5);
        g.save(); g.globalAlpha = op;
        [-1, 1].forEach(sd => { const pl = sd < 0 ? pulseL : pulseR, col = sd < 0 ? '#9fb0cf' : theme.gold; wallet(g, sd * 262 + sd * -30, -58, 140, 104, B.shade(col, -0.25), 0.92, 0.8); wallet(g, sd * 262 + sd * -14, -32, 140, 104, B.shade(col, -0.1), 0.96, 0.9); wallet(g, sd * 262, -8, 150, 112, col, 1 + 0.06 * pl); txt(g, sd < 0 ? 'NEW WALLETS' : 'OLD WALLETS', sd * 262, 98, F.cap(30), theme.paper); });
        clay(g, -196, -40, 392, 64, 32, '#8e98a8', { shadowK: 0.3 }); g.fillStyle = 'rgba(11,15,20,.55)'; rr(g, -190, -24, 380, 32, 16); g.fill();
        for (let j = 0; j < 6; j++) { const lt2 = ot - spawn(j); if (lt2 < 0) continue; const u = (lt2 * SP) % 1, a = clamp(u / 0.06) * clamp((1 - u) / 0.08); coin(g, -190 + u * 380, -8, 21 * (0.55 + 0.45 * a), a); }
        g.strokeStyle = rgba(theme.good, 0.9); g.lineWidth = 8; g.lineCap = 'round'; g.lineJoin = 'round';
        for (let i = 0; i < 4; i++) { const u = ((ot * 0.35 + i / 4) % 1), x = -150 + u * 300, a = clamp(u / 0.15) * clamp((1 - u) / 0.15); g.globalAlpha = op * a; g.beginPath(); g.moveTo(x - 10, 50); g.lineTo(x + 8, 62); g.lineTo(x - 10, 74); g.stroke(); }
        g.restore();
      }
      // curtain
      { const k = open ? ease.inOut(clamp(ot / 0.95)) : 0, half = ww / 2, pw = half * (1 - 0.8 * k) + 2;
        const panel = (sd) => { const px = sd < 0 ? -half : half - pw; g.save(); g.beginPath(); g.rect(px, -wh / 2, pw, wh); g.clip(); const gr = g.createLinearGradient(px, 0, px + pw, 0); gr.addColorStop(0, '#6c2220'); gr.addColorStop(0.5, '#8d302b'); gr.addColorStop(1, '#6c2220'); g.fillStyle = gr; g.fillRect(px, -wh / 2, pw, wh); const n = 6; for (let i = 0; i < n; i++) { const fx = px + (i + 0.5) * pw / n; const fg = g.createLinearGradient(fx - pw / n / 2, 0, fx + pw / n / 2, 0); fg.addColorStop(0, 'rgba(0,0,0,.28)'); fg.addColorStop(0.5, 'rgba(255,255,255,.07)'); fg.addColorStop(1, 'rgba(0,0,0,.28)'); g.fillStyle = fg; g.fillRect(fx - pw / n / 2, -wh / 2, pw / n, wh); } g.restore(); };
        if (k < 1) { panel(-1); panel(1); const ta = clamp(1 - ot * 5); if (ta > 0) { g.save(); g.globalAlpha = ta; txt(g, 'TRADING', 0, -52, F.hero(112), theme.paper); txt(g, 'BOT', 0, 62, F.hero(112), theme.paper); g.restore(); } }
        g.fillStyle = '#3f1411'; g.fillRect(-ww / 2, -wh / 2, ww, 30); g.fillStyle = theme.gold; g.fillRect(-ww / 2, -wh / 2 + 28, ww, 7); }
      g.restore();
      // coin slot + coin drop
      clay(g, -96, wy - 22, 192, 22, 8, '#1b2233', { shadowK: 0.2 });
      { const lt = t - p.coinInAt; if (lt > -0.05 && lt < 0.5) { g.save(); g.beginPath(); g.rect(-300, wy - 400, 600, 400 - 1); g.clip(); const u = clamp(lt / 0.46); coin(g, 0, lerp(wy - 230, wy - 8, u * u), 34, clamp((lt + 0.05) / 0.08)); g.restore(); } if (lt > 0.46 && lt < 0.9) burst(g, 0, wy - 6, 70, theme.gold, lt - 0.46, 10, 0.4); }
      // PROSECUTORS SAY tag
      { const lt = t - p.tagAt; if (lt > 0) { const k = spring(lt, 'snappy'); g.save(); g.translate(x0 + 60 + 215, wy - 8); g.scale(0.5 + 0.5 * k, 0.5 + 0.5 * k); g.globalAlpha = clamp(lt / 0.08); clay(g, -215, -33, 430, 66, 16, theme.bad, { shadowK: 0.6 }); txt(g, 'PROSECUTORS SAY', 0, 3, F.cap(36), theme.paper); g.restore(); } }
      // taken in
      if (!p.noTaken) {
      g.strokeStyle = theme.rule; g.lineWidth = 3; g.setLineDash([10, 9]); g.beginPath(); g.moveTo(x0 + 40, y0 + 748); g.lineTo(x0 + w - 40, y0 + 748); g.stroke(); g.setLineDash([]);
      txt(g, 'MONEY TAKEN IN', 0, y0 + 790, F.cap(38), theme.inkSoft);
      { const lt = t - p.takenAt, yA = y0 + 915; if (lt < 0) { g.fillStyle = theme.rule; rr(g, -300, yA - 40, 600, 80, 40); g.fill(); } else {
          const v = countAt(lt, p.takenDur, 0, p.to), land = lt - p.takenDur, speed = lt < p.takenDur ? Math.abs(countAt(lt + 0.02, p.takenDur, 0, p.to) - v) / 0.02 : 0, o = { font: F.hero(124), size: 124, color: theme.badInk, prefix: '$', speed }, k = fitW(g, p.to, o, w - 120);
          let s = 1 + (land > 0 ? 0.1 * hit(land, 6) : 0) + (env.hot === 'taken' ? 0.03 * env.hotK : 0); g.save(); g.translate(0, yA); g.scale(s * k, s * k); const rw = B.rollWidth(g, p.to, o).w; roll(g, v, 0, 0, o); if (land > 0) marker(g, -rw / 2, 78, rw, 9, theme.badInk, clamp(land / 0.3), 0.9); g.restore(); burst(g, 0, yA, w * 0.38, theme.bad, land, 18, 0.55);
          const on = lt - 0.2; if (on > 0) { const kk = spring(on, 'snappy'); g.save(); g.translate(0, y0 + 1040); g.scale(0.6 + 0.4 * kk, 0.6 + 0.4 * kk); g.globalAlpha = clamp(on / 0.08); clay(g, -135, -34, 270, 68, 16, theme.navy, { shadowK: 0.5 }); txt(g, 'PER DOJ', 0, 3, F.cap(38), theme.paper); g.restore(); } } }
      }
      // paid-out coin
      { const lt = t - p.payAt; if (lt > 0 && lt < 1.1) { const a = clamp((1.1 - lt) / 0.3); coin(g, 60 + lt * 230, wy + wh - 6 - 520 * lt + 1100 * lt * lt, 30, a); } }
    },
  });

  // ---------- cliff: generic coin chart that rises, then falls off a cliff (no numbers) ----------
  B.register('cliff', {
    defaults: { w: 800, h: 800, drawFrom: 0, fallAt: 99999, shutAt: 99999, title: 'BITCONNECT COIN', sub: 'ILLUSTRATION · NOT REAL PRICES' },
    size: p => [p.w, p.h],
    anchors(p) { const y0 = -p.h / 2; return { head: [0, y0 + 70, p.w, 140], plot: [0, y0 + 430, p.w - 100, 480] }; },
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, px0 = x0 + 60, px1 = x0 + w - 60, py0 = y0 + 250, py1 = y0 + h - 70, UF = 0.72;
      paper(g, x0, y0, w, h, 26, { lift });
      g.save(); rr(g, x0, y0, w, h, 26); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 140); const hg = g.createLinearGradient(0, y0, 0, y0 + 140); hg.addColorStop(0, 'rgba(255,255,255,.12)'); hg.addColorStop(1, 'rgba(0,0,0,.14)'); g.fillStyle = hg; g.fillRect(x0, y0, w, 140); g.restore();
      txt(g, p.title, x0 + 36, y0 + 58, F.hero(64), theme.paper, 'left'); txt(g, p.sub, x0 + 38, y0 + 108, F.mono(21), rgba(theme.paper, 0.78), 'left');
      const Y = u => { if (u <= UF) return 0.16 + 0.72 * Math.pow(u / UF, 1.35) + 0.035 * Math.sin(u * 46) + 0.025 * Math.sin(u * 113 + 1); const y1 = Y(UF), k = clamp((u - UF) / 0.08); return lerp(y1, 0.07, 1 - Math.pow(1 - k, 2.2)) + (u > UF + 0.08 ? 0.012 * Math.sin(u * 90) : 0); };
      const X = u => lerp(px0, px1, u), YY = u => lerp(py1, py0, Y(u));
      g.strokeStyle = theme.rule; g.lineWidth = 3; g.beginPath(); g.moveTo(px0, py1 + 14); g.lineTo(px1, py1 + 14); g.moveTo(px0 - 12, py0 - 20); g.lineTo(px0 - 12, py1 + 14); g.stroke();
      const ft = t - p.fallAt; let uf; if (t < p.drawFrom) uf = 0; else if (ft < 0) uf = UF * clamp((t - p.drawFrom) / (p.fallAt - p.drawFrom)); else if (ft < 0.3) uf = lerp(UF, UF + 0.08, ease.in(ft / 0.3)); else uf = lerp(UF + 0.08, 1, clamp((ft - 0.3) / 0.7, 0, 1) * 1);
      // shutdown flag
      { const lt = t - p.shutAt; if (lt > 0) { const k = spring(lt, 'snappy'), fx = X(UF); g.save(); g.globalAlpha = clamp(lt / 0.1); g.strokeStyle = theme.inkSoft; g.lineWidth = 3; g.setLineDash([8, 8]); g.beginPath(); g.moveTo(fx, py0 + 16); g.lineTo(fx, py1 + 14); g.stroke(); g.setLineDash([]); g.translate(fx - 60, py0 - 34); g.scale(0.5 + 0.5 * k, 0.5 + 0.5 * k); clay(g, -150, -36, 300, 72, 16, theme.navy, { shadowK: 0.5 }); txt(g, 'SHUT DOWN', 0, -9, F.cap(30), theme.paper); txt(g, 'JAN 2018', 0, 20, F.mono(24), rgba(theme.paper, 0.85)); g.restore(); } }
      // line + fill
      if (uf > 0.002) {
        const N = 160, pts = []; for (let i = 0; i <= N; i++) { const u = uf * i / N; pts.push([X(u), YY(u), u]); }
        g.save(); const grd = g.createLinearGradient(0, py0, 0, py1); const fallen = ft > 0; grd.addColorStop(0, rgba(theme.goodInk, 0.22)); grd.addColorStop(1, rgba(fallen ? theme.badInk : theme.goodInk, 0.03)); g.fillStyle = grd; g.beginPath(); g.moveTo(pts[0][0], py1 + 14); pts.forEach(q => g.lineTo(q[0], q[1])); g.lineTo(pts[N][0], py1 + 14); g.closePath(); g.fill();
        g.lineWidth = 10; g.lineCap = 'round'; g.lineJoin = 'round'; for (let i = 1; i <= N; i++) { g.strokeStyle = pts[i][2] > UF + 0.001 ? theme.badInk : theme.goodInk; g.beginPath(); g.moveTo(pts[i - 1][0], pts[i - 1][1]); g.lineTo(pts[i][0], pts[i][1]); g.stroke(); }
        const tp = pts[N]; g.fillStyle = tp[2] > UF ? theme.badInk : theme.goodInk; g.beginPath(); g.arc(tp[0], tp[1], 13, 0, 7); g.fill(); g.restore();
      }
      // COLLAPSED stamp
      { const gt = ft - 0.28; if (gt > 0) { const sc = 1 + 1.2 * (1 - ease.expo(gt / 0.2)); g.save(); g.globalAlpha = clamp(gt / 0.08); g.translate(-150, y0 + 335); g.rotate(-0.07); g.scale(sc * 0.82, sc * 0.82); g.fillStyle = rgba(theme.bad, 0.1); rr(g, -265, -78, 530, 156, 18); g.fill(); g.strokeStyle = theme.badInk; g.lineWidth = 10; rr(g, -265, -78, 530, 156, 18); g.stroke(); txt(g, 'COLLAPSED', 0, 6, F.hero(124), theme.badInk); g.restore(); burst(g, -150, y0 + 335, 260, theme.bad, gt - 0.1, 18, 0.5); } }
    },
  });

  // ---------- case: promoter case card (pleaded guilty, 38 months, 2022) ----------
  B.register('case', {
    defaults: { w: 800, h: 880, guiltyAt: 99999, monthsAt: 99999 },
    size: p => [p.w, p.h],
    anchors(p) { const y0 = -p.h / 2; return { head: [0, y0 + 70, p.w, 140], who: [0, y0 + 240, p.w * 0.92, 120], guilty: [0, y0 + 400, p.w * 0.8, 140], months: [0, y0 + 690, p.w * 0.92, 190] }; },
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2;
      paper(g, x0, y0, w, h, 26, { lift });
      g.save(); rr(g, x0, y0, w, h, 26); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 140); const hg = g.createLinearGradient(0, y0, 0, y0 + 140); hg.addColorStop(0, 'rgba(255,255,255,.12)'); hg.addColorStop(1, 'rgba(0,0,0,.14)'); g.fillStyle = hg; g.fillRect(x0, y0, w, 140); g.restore();
      txt(g, 'CASE FILE', x0 + 36, y0 + 58, F.hero(70), theme.paper, 'left'); txt(g, 'BITCONNECT · U.S. PROSECUTION', x0 + 38, y0 + 110, F.mono(22), rgba(theme.paper, 0.78), 'left');
      txt(g, 'TOP US PROMOTER', 0, y0 + 240, F.hero(96), theme.ink);
      { const gt = t - p.guiltyAt; if (gt > 0) { const sc = 1 + 1.3 * (1 - ease.expo(gt / 0.2)), a = clamp(gt / 0.08), hot = env.hot === 'guilty' ? 0.03 * env.hotK : 0; g.save(); g.globalAlpha = a; g.translate(0, y0 + 400); g.rotate(-0.05); g.scale(sc + hot, sc + hot); g.fillStyle = rgba(theme.bad, 0.1); rr(g, -320, -72, 640, 144, 18); g.fill(); g.strokeStyle = theme.badInk; g.lineWidth = 10; rr(g, -320, -72, 640, 144, 18); g.stroke(); txt(g, 'PLEADED GUILTY', 0, 6, F.hero(104), theme.badInk); g.restore(); burst(g, 0, y0 + 400, 330, theme.bad, gt - 0.1, 20, 0.55);
          g.save(); g.globalAlpha = clamp((gt - 0.25) / 0.15); txt(g, 'CONSPIRACY TO COMMIT WIRE FRAUD', 0, y0 + 500, F.monoX(26), theme.inkSoft); g.restore(); } else { g.strokeStyle = rgba(theme.rule, 0.9); g.lineWidth = 3; g.setLineDash([9, 9]); rr(g, -320, y0 + 328, 640, 144, 18); g.stroke(); g.setLineDash([]); } }
      g.strokeStyle = theme.rule; g.lineWidth = 3; g.setLineDash([10, 9]); g.beginPath(); g.moveTo(x0 + 40, y0 + 560); g.lineTo(x0 + w - 40, y0 + 560); g.stroke(); g.setLineDash([]);
      { const mt = t - p.monthsAt; if (mt > -0.01) { const v = countAt(Math.max(0, mt), 0.7, 0, 38), land = mt - 0.7, s = 1 + (land > 0 ? 0.16 * hit(land, 6) : 0) + (env.hot === 'months' ? 0.03 * env.hotK : 0), o = { font: F.hero(150), size: 150, color: theme.ink, speed: mt < 0.7 ? 38 / 0.5 : 0 };
          const nw = B.rollWidth(g, 38, o).w, sw = mw(' MONTHS', F.hero(150)), tot = nw + sw; g.save(); g.translate(0, y0 + 680); g.scale(s, s); roll(g, v, -tot / 2, 0, { ...o, align: 'left' }); txt(g, ' MONTHS', -tot / 2 + nw, 0, F.hero(150), theme.badInk, 'left'); if (land > 0) marker(g, -tot / 2, 92, tot, 9, theme.badInk, clamp(land / 0.3), 0.9); g.restore(); burst(g, 0, y0 + 680, 330, theme.bad, land, 18, 0.55);
          if (land > -0.2) { const on = land + 0.2; g.save(); g.globalAlpha = clamp(on / 0.12); g.translate(0, y0 + 822 + (1 - spring(on, 'snappy')) * 22); txt(g, 'SENTENCED 2022', 0, 0, F.cap(44), theme.inkSoft); g.restore(); } }
        else { g.fillStyle = theme.rule; rr(g, -250, y0 + 650, 500, 60, 30); g.fill(); } }
    },
  });
  // ---------- plane: paper plane flying across the screen (screen layer) ----------
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

  // ===== v3 recipes (rebuild 2026-11-25): slam text, phone, ticker, heart, flag, puppet =====
  const segs3 = l => (typeof l === 'string' ? [[l, null]] : l.map(x => (typeof x === 'string' ? [x, null] : x)));
  const path = (g, pts) => { g.beginPath(); pts.forEach((p, i) => (i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1]))); };

  // ---------- slamtext: hook text that SLAMS in (huge -> 1) with an ink outline; no glow ----------
  B.register('slamtext', {
    defaults: { lines: [[['TEXT', 'paper']]], size: 120, lh: 1.04, slam: true, over: 0.5, dur: 0.26, at0: 0 }, ownEnter: true,
    size: p => [Math.max(...p.lines.map(l => mw(segs3(l).map(s => s[0]).join(''), F.hero(p.size)))), p.lines.length * p.size * p.lh],
    draw(g, p, { lt }) {
      const font = F.hero(p.size), n = p.lines.length, u = clamp((lt - p.at0) / p.dur), k = p.slam ? 1 + p.over * (1 - ease.expo(u)) - 0.05 * B.wobble(lt - p.at0 - p.dur, 5, 9) : 1, a = p.slam ? 1 : clamp(lt / 0.12);
      g.save(); g.scale(k, k); g.globalAlpha *= a; g.textBaseline = 'middle'; g.textAlign = 'left'; g.font = font; g.lineJoin = 'round';
      p.lines.forEach((line, li) => { const ss = segs3(line), tw = mw(ss.map(s => s[0]).join(''), font); let x = -tw / 2; const y = (li - (n - 1) / 2) * p.size * p.lh;
        for (const [s, tn] of ss) { g.save(); g.shadowColor = 'rgba(2,4,9,.55)'; g.shadowBlur = 14; g.shadowOffsetY = 8; g.strokeStyle = '#0B0F14'; g.lineWidth = p.size * 0.1; g.strokeText(s, x, y); g.restore(); g.fillStyle = tone(tn || 'paper', false); g.fillText(s, x, y); x += mw(s, font); } });
      g.restore();
    },
  });

  // ---------- phone: generic "crypto app" phone. cracks on crackAt, coins pour in on coinsAt, SHUT DOWN shutter on shutAt, clean again at resetAt ----------
  B.register('phone', {
    defaults: { w: 640, h: 1060, crackAt: 99999, shutAt: 99999, shutOutAt: 99999, coinsAt: 99999, coinN: 9 },
    size: p => [p.w, p.h],
    anchors(p) { const y0 = -p.h / 2; return { screen: [0, 0, p.w - 60, p.h - 120], rate: [0, y0 + 360, p.w - 100, 280], top: [0, y0 + 40, p.w, 120] }; },
    draw(g, p, env) {
      const { t, theme } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, sx = x0 + 26, sy = y0 + 26, sw = w - 52, sh = h - 52;
      // coins fall into the slot at the top edge (clipped above it)
      if (t >= p.coinsAt && t < p.coinsAt + p.coinN * 0.13 + 0.9) { g.save(); g.beginPath(); g.rect(-w, y0 - 900, w * 2, 900 + 34); g.clip();
        for (let i = 0; i < p.coinN; i++) { const l = t - p.coinsAt - i * 0.13; if (l < 0 || l > 0.55) continue; const u = clamp(l / 0.4); coin(g, (hash(i * 3.1) - 0.5) * 150, lerp(y0 - 520, y0 + 70, u * u), 40, 1); } g.restore(); }
      clay(g, x0, y0, w, h, 64, '#1b2233', { shadowK: 0.7 });
      g.save(); rr(g, sx, sy, sw, sh, 44); g.clip();
      const bg = g.createLinearGradient(0, sy, 0, sy + sh); bg.addColorStop(0, '#1d2a40'); bg.addColorStop(1, '#0f1521'); g.fillStyle = bg; g.fillRect(sx, sy, sw, sh);
      clay(g, -70, sy + 14, 140, 30, 15, '#05080d', { shadowK: 0.1 });
      txt(g, 'YOUR CRYPTO APP', 0, sy + 96, F.monoX(26), rgba(theme.paper, 0.7)); txt(g, 'EARNINGS TODAY', 0, sy + 180, F.cap(34), rgba(theme.paper, 0.9));
      txt(g, '+1.00%', 0, sy + 320, F.hero(196), theme.good); txt(g, 'EVERY. SINGLE. DAY.', 0, sy + 440, F.monoX(30), rgba(theme.paper, 0.75));
      const n = 11, bw = (sw - 90) / n; for (let i = 0; i < n; i++) { const bh = 70 + i * 36 + (i % 3) * 10; clay(g, sx + 45 + i * bw + 4, sy + sh - 120 - bh, bw - 8, bh, 8, theme.good, { shadowK: 0.3 }); }
      txt(g, 'ILLUSTRATION', 0, sy + sh - 52, F.mono(20), rgba(theme.paper, 0.45));
      if (t >= p.crackAt) { const r = ease.out(clamp((t - p.crackAt) / 0.16)), cx = 70, cy = -90; g.lineCap = 'round'; g.lineJoin = 'round';
        const rays = []; for (let i = 0; i < 10; i++) { const a0 = i * 0.628 + hash(i * 1.7) * 0.5, pts = [[cx, cy]]; let x = cx, y = cy, a = a0; for (let s = 0; s < 6; s++) { a += (hash(i * 9.1 + s) - 0.5) * 0.7; const L = 70 + hash(i * 4.3 + s * 2.1) * 120; x += Math.cos(a) * L; y += Math.sin(a) * L; pts.push([x, y]); } rays.push(pts); }
        for (const pass of [0, 1]) { g.strokeStyle = pass ? 'rgba(255,255,255,.92)' : 'rgba(0,0,0,.55)'; g.lineWidth = pass ? 4 : 8; rays.forEach(pts => { const m = Math.max(1, Math.round(r * (pts.length - 1))); path(g, pts.slice(0, m + 1)); g.stroke(); }); }
        g.strokeStyle = 'rgba(255,255,255,.7)'; g.lineWidth = 3; for (const rr0 of [150, 290]) { if (r < 0.7) break; g.beginPath(); for (let i = 0; i <= 10; i++) { const a = i * 0.628, d = rr0 * (0.85 + hash(i * 2.3 + rr0) * 0.3); i ? g.lineTo(cx + Math.cos(a) * d, cy + Math.sin(a) * d) : g.moveTo(cx + Math.cos(a) * d, cy + Math.sin(a) * d); } g.stroke(); }
        const fl = hit(t - p.crackAt, 16); if (fl > 0.02) { g.fillStyle = `rgba(255,255,255,${0.55 * fl})`; g.fillRect(sx, sy, sw, sh); } }
      // SHUT DOWN shutter
      { const lt = t - p.shutAt; if (lt > 0 && t < p.shutOutAt + 0.35) { const u = ease.in(clamp(lt / 0.2)) * (1 - ease.inOut(clamp((t - p.shutOutAt) / 0.3))), bounce = lt > 0.2 ? 0.035 * sh * Math.exp(-(lt - 0.2) * 9) * Math.sin((lt - 0.2) * 34) : 0, bh = sh * u + bounce;
          g.fillStyle = theme.navy; g.fillRect(sx, sy, sw, bh); g.fillStyle = 'rgba(0,0,0,.22)'; for (let y = sy + 30; y < sy + bh; y += 34) g.fillRect(sx, y, sw, 4);
          g.fillStyle = theme.gold; g.fillRect(sx, sy + bh - 22, sw, 22); if (u > 0.55) { txt(g, 'SHUT', 0, -70, F.hero(180), theme.paper); txt(g, 'DOWN', 0, 90, F.hero(180), theme.bad); txt(g, 'JAN 2018', 0, 230, F.cap(54), theme.paper); } burst(g, 0, sy + bh, sw * 0.5, theme.gold, lt - 0.2, 14, 0.4); } }
      g.restore();
    },
  });

  // ---------- ticker: BitConnect "posted returns" card. +1% rows print one by one; source chip (alleged) ----------
  B.register('ticker', {
    defaults: { w: 820, h: 920, rowAt: [], srcAt: 99999, srcText: 'SOURCE: SEC COMPLAINT · ALLEGED' },
    size: p => [p.w, p.h],
    anchors(p) { const y0 = -p.h / 2, a = { head: [0, y0 + 70, p.w, 140], src: [0, y0 + p.h - 110, p.w * 0.92, 90] }; for (let i = 0; i < 4; i++) a['r' + i] = [0, y0 + 250 + i * 128, p.w * 0.9, 116]; return a; },
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2;
      paper(g, x0, y0, w, h, 26, { lift });
      g.save(); rr(g, x0, y0, w, h, 26); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 140); const hg = g.createLinearGradient(0, y0, 0, y0 + 140); hg.addColorStop(0, 'rgba(255,255,255,.12)'); hg.addColorStop(1, 'rgba(0,0,0,.14)'); g.fillStyle = hg; g.fillRect(x0, y0, w, 140); g.restore();
      txt(g, 'BITCONNECT', x0 + 36, y0 + 58, F.hero(76), theme.paper, 'left'); txt(g, 'POSTED RETURNS · ABOUT 1% A DAY', x0 + 38, y0 + 110, F.mono(22), rgba(theme.paper, 0.78), 'left');
      const labs = ['DAY 1', 'DAY 2', 'DAY 3', 'AND SO ON'];
      for (let i = 0; i < 4; i++) { const ry = y0 + 250 + i * 128, lt = t - (p.rowAt[i] ?? 99999);
        if (lt < 0) { g.save(); g.strokeStyle = rgba(theme.rule, 0.9); g.lineWidth = 3; g.setLineDash([9, 9]); rr(g, x0 + 36, ry - 52, w - 72, 104, 18); g.stroke(); g.restore(); continue; }
        const k = spring(lt, 'snappy'), sc = 1.25 - 0.25 * k; g.save(); g.globalAlpha = clamp(lt / 0.06); g.translate(0, ry); g.scale(sc, sc);
        g.fillStyle = theme.paperShade; rr(g, x0 + 36, -52, w - 72, 104, 18); g.fill(); g.fillStyle = theme.goodInk; rr(g, x0 + 36, -52, 14, 104, 7); g.fill();
        txt(g, labs[i], x0 + 76, 4, F.monoX(40), theme.ink, 'left'); txt(g, '+1%', x0 + w - 62, 6, F.hero(84), theme.goodInk, 'right'); marker(g, x0 + 60, 36, w - 120, 7, theme.goodInk, clamp((lt - 0.05) / 0.3), 0.5); g.restore(); burst(g, 0, ry, w * 0.34, theme.good, lt, 12, 0.4); }
      { const lt = t - p.srcAt; if (lt > 0) { const k = spring(lt, 'snappy'); g.save(); g.translate(0, y0 + h - 110 + (1 - k) * 30); g.globalAlpha = clamp(lt / 0.08); clay(g, -w * 0.43, -38, w * 0.86, 76, 18, theme.navy, { shadowK: 0.5 }); txt(g, p.srcText, 0, 3, F.monoX(27), theme.paper); g.restore(); } else { g.strokeStyle = rgba(theme.rule, 0.9); g.lineWidth = 3; g.setLineDash([9, 9]); rr(g, -w * 0.43, y0 + h - 148, w * 0.86, 76, 18); g.stroke(); g.setLineDash([]); } }
    },
  });

  // ---------- heart: small like-pulse (screen layer, <= 1.5 s) ----------
  B.register('heart', {
    defaults: { s: 1 }, size: () => [10, 10],
    draw(g, p, env) {
      const lt = env.lt, k = 0.35 + 0.65 * spring(lt, 'snappy'), pul = 1 + 0.22 * hit(lt - 0.5, 9) * (lt > 0.5 ? 1 : 0), s = p.s * k * pul * 1.5;
      g.save(); g.scale(s, s);
      const r = lin(lt, 0.0, 0.55); if (r > 0 && r < 1) { g.strokeStyle = rgba(env.theme.paper, 0.7 * (1 - r)); g.lineWidth = 5; g.beginPath(); g.arc(0, -4, 60 + 70 * ease.out(r), 0, 7); g.stroke(); }
      const r2 = lin(lt, 0.5, 1.05); if (r2 > 0 && r2 < 1) { g.strokeStyle = rgba(env.theme.paper, 0.7 * (1 - r2)); g.lineWidth = 5; g.beginPath(); g.arc(0, -4, 60 + 70 * ease.out(r2), 0, 7); g.stroke(); }
      g.shadowColor = 'rgba(2,4,9,.45)'; g.shadowBlur = 18; g.shadowOffsetY = 10;
      const hp = () => { g.beginPath(); g.moveTo(0, 42); g.bezierCurveTo(-112, -28, -52, -104, 0, -42); g.bezierCurveTo(52, -104, 112, -28, 0, 42); g.closePath(); };
      hp(); const gr = g.createLinearGradient(-60, -80, 60, 50); gr.addColorStop(0, '#ff6b60'); gr.addColorStop(1, '#E0281E'); g.fillStyle = gr; g.fill(); g.shadowColor = 'transparent';
      g.save(); hp(); g.clip(); g.fillStyle = 'rgba(255,255,255,.28)'; g.beginPath(); g.ellipse(-34, -52, 30, 16, -0.6, 0, 7); g.fill(); g.restore();
      g.restore();
    },
  });

  // ---------- flag: tiny "1% A DAY" chip; a huge red flag unfurls out of it (TikTok hook). furls back on backAt ----------
  B.register('flag', {
    defaults: { furlAt: -0.12, backAt: 99999, label: 'RED FLAG', chip: '1% A DAY' }, size: () => [900, 1000],
    draw(g, p, env) {
      const { t, theme } = env, ku = clamp((t - p.furlAt) / 0.42), k0 = ku <= 0 ? 0 : (1 - Math.pow(1 - ku, 3)) * (1 + 0.1 * Math.sin(ku * Math.PI)), kb = ease.inOut(clamp((t - p.backAt) / 0.5)), k = Math.max(0, k0 * (1 - kb)), top = -330, FW = 700, FH = 360;
      // pole
      g.fillStyle = '#8e98a8'; rr(g, -9, top - 24, 18, 700, 9); g.fill(); g.fillStyle = theme.gold; g.beginPath(); g.arc(0, top - 26, 20, 0, 7); g.fill();
      // cloth
      if (k > 0.01) { const w = FW * k, N = 22, up = [], dn = []; for (let i = 0; i <= N; i++) { const u = i / N, x = 9 + u * w, ph = t * 7 - u * 5, wave = Math.sin(ph) * (10 + 16 * u) * Math.min(1, k * 1.2); up.push([x, top + 4 + wave]); dn.push([x, top + FH - 4 + wave * 1.1 + u * 24]); }
        g.save(); g.shadowColor = 'rgba(2,4,9,.4)'; g.shadowBlur = 24; g.shadowOffsetY = 14; g.beginPath(); up.forEach((q, i) => (i ? g.lineTo(q[0], q[1]) : g.moveTo(q[0], q[1]))); for (let i = N; i >= 0; i--) g.lineTo(dn[i][0], dn[i][1]); g.closePath(); const fg = g.createLinearGradient(0, top, 0, top + FH); fg.addColorStop(0, '#ff5a50'); fg.addColorStop(1, '#c9241a'); g.fillStyle = fg; g.fill(); g.shadowColor = 'transparent'; g.clip();
        for (let i = 0; i < N; i += 2) { g.fillStyle = 'rgba(0,0,0,.13)'; g.beginPath(); g.moveTo(up[i][0], up[i][1]); g.lineTo(up[i + 1][0], up[i + 1][1]); g.lineTo(dn[i + 1][0], dn[i + 1][1]); g.lineTo(dn[i][0], dn[i][1]); g.fill(); }
        const ta = clamp((k - 0.7) / 0.3); if (ta > 0) { g.globalAlpha *= ta; txt(g, 'RED', 9 + w * 0.5, top + FH * 0.3 + Math.sin(t * 7 - 2.5) * 14, F.hero(122), theme.paper); txt(g, 'FLAG', 9 + w * 0.5, top + FH * 0.72 + Math.sin(t * 7 - 2.5) * 14, F.hero(122), theme.paper); } g.restore(); }
      // chip
      { const pk = 1 + 0.08 * hit(t - p.furlAt - 0.1, 9) * (t > p.furlAt ? 1 : 0); g.save(); g.translate(0, 372); g.scale(pk, pk); clay(g, -190, -52, 380, 104, 52, theme.paper, { shadowK: 0.6 }); txt(g, p.chip, 0, 5, F.hero(62), theme.badInk); g.restore(); }
    },
  });

  // ---------- puppet: wallet on strings from a control bar; strings drop at dropAt, yank at yankAt / yankAt2 ----------
  B.register('puppet', {
    defaults: { dropAt: -0.1, yankAt: 99999, yankAt2: 99999 }, size: () => [760, 1100],
    anchors: () => ({ wallet: [0, 170, 520, 400], bar: [0, -440, 600, 80] }),
    draw(g, p, env) {
      const { t, theme } = env, yk = at => { const l = t - at; return l < 0 ? 0 : 170 * Math.abs(Math.sin(l * 14)) * Math.exp(-l * 3.6); }, off = yk(p.yankAt) + yk(p.yankAt2), dk = ease.out(clamp((t - p.dropAt) / 0.38)), tilt = off * 0.0007;
      const wy = 170 - off, barY = -440 + (1 - dk) * -700 - off * 0.5;
      const anchors = [[-250, -60], [-90, -96], [90, -96], [250, -60]], tops = [[-260, 0], [-90, 0], [90, 0], [260, 0]];
      g.save(); g.translate(0, barY); g.rotate(tilt); clay(g, -310, -22, 620, 44, 16, theme.manila, { shadowK: 0.5 }); clay(g, -26, -70, 52, 56, 12, '#8e98a8', { shadowK: 0.3 }); g.restore();
      g.strokeStyle = rgba(theme.paper, 0.9); g.lineWidth = 4; g.lineCap = 'round';
      anchors.forEach((a, i) => { const bx = tops[i][0] * Math.cos(tilt) + 0, by = barY + tops[i][0] * Math.sin(tilt); g.beginPath(); g.moveTo(bx, by); g.lineTo(a[0], wy + a[1]); g.stroke(); });
      g.save(); g.translate(0, wy); g.rotate(-tilt * 2); wallet(g, 0, 0, 340, 250, theme.gold, 1.5, 1); g.restore();
      g.save(); g.translate(-60, wy - 20); g.rotate(-0.08); clay(g, -190, -52, 380, 104, 52, theme.paper, { shadowK: 0.6 }); txt(g, '1% A DAY', 0, 5, F.hero(62), theme.badInk); g.restore();
    },
  });
})();
// Instagram / Facebook Reels rebuild (beats.v2.md). Word times from voice/words.json (final voice).
const FR = { x: 150, y: 1330, s: 1.25 };
const BKS = { x: 190, y: 1330, s: 0.95, layer: 'back' };
const TXT = (lines, size, extra = {}) => ({ lines, size, ...extra });
BM2.scene({
  series: 'decoded', title: 'CASE: BITCONNECT · 2017', duration: 20.93,
  footnote: ['PROMOTER CONVICTED 2021 · 38 MONTHS · SOURCES: DOJ, SEC', 'OUR MATH: $1,000 × 1.01^DAYS', 'PHOTO: FEDERAL JUDICIARY, PUBLIC DOMAIN, VIA WIKIMEDIA COMMONS'],
  elements: [
    // ---- station A: wallet on strings (frame 0) ----
    { id: 'puppet', type: 'puppet', at: [0, 0], in: -1, props: { dropAt: -0.12, yankAt: '@getting', yankAt2: '@played-0.15' } },
    { id: 'hookI', type: 'slamtext', at: [0, -700], in: 0, out: 3.3, props: TXT([[['1% A DAY?', 'bad']]], 168, { over: 0.22 }) },
    { id: 'hookI2', type: 'slamtext', at: [0, -560], in: '@not', out: 3.3, props: TXT([[['NOT INVESTING.', 'paper']]], 84) },
    { id: 'played', type: 'stamp', at: [0, 330], rot: -0.07, in: '@played-0.12', out: 3.4, props: { text: 'GETTING PLAYED', tone: 'bad', size: 108 } },
    { id: 'hookI3', type: 'slamtext', at: [0, -700], in: 19.55, props: TXT([[['1% A DAY?', 'bad']]], 168, { slam: false }) },
    // ---- station B: THE counter ----
    { id: 'ctr', type: 'compound', at: [1750, 0], in: '@grand-0.6', props: { h: 740,
      keys: [[0, 0], [5.7, 0], [6.3, 40], [6.9, 400], [7.4, 900], ['@billion', 1389]],
      rows: [{ day: 'DAY 1,389', v: '$1,000,000,000', at: '@billion', tone: 'bad', size: 56 }] } },
    // ---- station C: bot -> pipe (the "case file") ----
    { id: 'bot', type: 'bot', at: [3500, 0], in: '@crypto-0.6', props: { h: 780, noTaken: true, curtainAt: '@new-0.1', tagAt: '@prosecutors' } },
    // ---- station D: promoter case ----
    { id: 'case', type: 'case', at: [3500, 1750], in: '@Top-0.4', props: { guiltyAt: '@promoter', monthsAt: '@38' } },
    { id: 'court', type: 'photo', at: [4210, 1790], in: '@Top-0.3', props: { src: 'brand/photos/stock/edward-j-schwartz-united-states-courthouse/1.jpg', name: 'FEDERAL COURT', role: 'SAN DIEGO', credit: 'PHOTO: FEDERAL JUDICIARY · PUBLIC DOMAIN', w: 400, aspect: 1.2, tilt: 0.05, fx: 0.5, fy: 0.5 } },
    // ---- screen-fixed micro moments ----
    { id: 'heart', type: 'heart', layer: 'screen', at: [830, 640], in: '@tap-0.1', out: '@tap+1.3', props: {} },
    { id: 'easy', type: 'text', layer: 'screen', at: [540, 500], in: '@easy', out: 5.75, props: TXT([[['EASY MONEY?', 'paper']]], 90) },
    { id: 'send', type: 'text', layer: 'screen', at: [610, 1235], in: '@Send', out: '@Send+1.3', props: TXT([[['SEND ', 'accent'], ['THIS', 'paper']]], 80) },
    { id: 'plane', type: 'plane', layer: 'screen', at: [540, 790], in: '@Send-0.05', out: '@Send+1.3', props: { dur: 1.25, s: 1.5, from: [-380, 330], to: [420, -300] } },
  ],
  beats: [
    { at: 0, beat: 'zoom-on-number', focus: ['hookI', 'puppet.wallet'], fill: 0.86, maxH: 1300, sy: 1000, st: FR, pose: 'shock', dur: 0.5 },
    { at: '@not-0.05', beat: 'graphic-hero', focus: ['hookI', 'puppet'], fill: 0.74, maxH: 1500, sy: 800, st: 'corner-left', pose: 'point' },
    { at: '@getting-0.1', beat: 'zoom-on-number', focus: 'puppet.wallet', fill: 0.9, maxH: 700, sy: 780, st: BKS, rot: -0.012, dur: 0.5 },
    { at: '@played-0.15', beat: 'graphic-hero', focus: ['puppet.wallet', 'played'], fill: 0.86, maxH: 900, sy: 800, st: 'corner-left', pose: 'shock' },
    { at: '@Double-0.1', beat: 'presenter-front', focus: 'puppet', sy: 760, pose: 'talk' },
    // 5.7-9.7: the counter
    { at: '@grand-0.1', beat: 'side-by-side', focus: 'ctr', move: 'whip', sy: 760, fill: 0.74, maxH: 1000, pose: 'point' },
    { at: '@1#2', beat: 'zoom-on-number', focus: 'ctr.head', fill: 0.92, sy: 690, st: BKS, dur: 0.5 },
    { at: 7.1, beat: 'graphic-hero', focus: 'ctr', st: 'corner-left', fill: 0.84, maxH: 1000, sy: 780, pose: 'point' },
    { at: '@billion', beat: 'zoom-on-number', focus: ['ctr.value', 'ctr.m0'], fill: 0.9, maxH: 760, sy: 850, st: BKS, pose: 'shock', dur: 0.4 },
    { at: '@four-0.1', beat: 'zoom-on-number', focus: 'ctr.day', fill: 0.8, maxH: 400, sy: 700, st: 'corner-left', pose: 'point', dur: 0.5 },
    { at: '@Send', beat: 'graphic-hero', focus: 'ctr', fill: 0.86, maxH: 1000, sy: 800, st: 'corner-left', pose: 'you' },
    // 11-17: the bot / pipe
    { at: '@crypto', beat: 'side-by-side', focus: 'bot', move: 'whip', sy: 800, fill: 0.74, maxH: 960, pose: 'shrug' },
    { at: '@sold-0.1', beat: 'graphic-hero', focus: 'bot', st: 'corner-left', fill: 0.8, maxH: 960, sy: 810, pose: 'point' },
    { at: '@but', beat: 'graphic-hero', focus: 'bot.head', fill: 0.9, maxH: 560, sy: 700, st: BKS, pose: 'chin' },
    { at: '@new-0.1', beat: 'zoom-on-number', focus: 'bot.pipe', fill: 0.94, maxH: 560, sy: 880, st: BKS, pose: 'point', dur: 0.5 },
    { at: 16.0, beat: 'pull-back', focus: 'bot', fill: 0.78, maxH: 960, sy: 790, st: 'corner-left' },
    // 16.9-: payoff
    { at: '@Top', beat: 'side-by-side', focus: 'case', move: 'whip', sy: 760, fill: 0.74, maxH: 950, pose: 'point' },
    { at: '@promoter-0.15', beat: 'zoom-on-number', focus: ['case.who', 'case.guilty'], fill: 0.9, sy: 820, st: 'corner-left', pose: 'shock', dur: 0.4 },
    { at: '@38', beat: 'zoom-on-number', focus: ['case.guilty', 'case.months'], fill: 0.94, maxH: 700, zoom: 1.05, sy: 830, st: BKS, dur: 0.4 },
    { at: 19.1, beat: 'pull-back', focus: ['case', 'court'], fill: 0.8, maxH: 950, sy: 770, st: 'corner-left', pose: 'idle' },
    // 19.55: whip back to the wallet = frame 0
    { at: 19.55, beat: 'zoom-on-number', focus: ['hookI3', 'puppet.wallet'], move: 'whip', fill: 0.86, maxH: 1300, sy: 1000, st: FR, pose: 'talk' },
  ],
  poses: [],
  shakes: [[0.0, 12], ['@getting', 12], ['@played-0.12', 16], ['@billion', 20], ['@promoter', 14], ['@38', 22]],
  captions: { gap: 16, emph: { '1%': 'bad', billion: 'bad', '38': 'bad', ass: 'bad', played: 'bad', prosecutors: 'accent', grand: 'good' }, fix: [] },
  bed: { name: 'tense_bed_2', gain: -1 },
  sfx: [
    { at: 0, name: 'deep_boom_2', gain: -4, dur: 0.4 }, { at: 0.05, name: 'punch_1', gain: -9, dur: 0.5 },
    { at: '@getting', name: 'cartoon_boing_1', gain: -10, dur: 0.6 }, { at: '@played-0.15', name: 'cartoon_boing_2', gain: -10, dur: 0.6 },
    { at: '@played-0.12', name: 'rubber_stamp_2', gain: -4, dur: 0.5 }, { at: '@played-0.12', name: 'thud_1', gain: -8, dur: 0.5 },
    { at: '@tap-0.1', name: 'pop_2', gain: -8, dur: 0.5 },
    { at: '@grand-0.1', name: 'money_counter_1', gain: -12, dur: 2.0 }, { at: '@1#2', name: 'cash_register_2', gain: -9, dur: 0.9 },
    { at: '@billion', name: 'deep_boom_1', gain: -4, dur: 1.6 }, { at: '@billion', name: 'cash_register_1', gain: -7, dur: 0.9 }, { at: '@billion', name: 'rubber_stamp_2', gain: -6, dur: 0.5 },
    { at: '@Send-0.05', name: 'swoosh_2', gain: -9, dur: 1.0 },
    { at: '@crypto', name: 'record_scratch_1', gain: -11, dur: 0.6 }, { at: '@BitConnect', name: 'paper_slam_2', gain: -10, dur: 0.5 },
    { at: '@prosecutors', name: 'pop_1', gain: -9, dur: 0.5 }, { at: '@new-0.1', name: 'swoosh_2', gain: -10, dur: 1.0 }, { at: '@new+0.25', name: 'money_counter_1', gain: -14, dur: 1.6, offset: 0.4 },
    { at: '@Top', name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@promoter', name: 'rubber_stamp_2', gain: -4, dur: 0.5 }, { at: '@promoter', name: 'gavel_1', gain: -6, dur: 0.8 },
    { at: '@38', name: 'cinematic_hit_1', gain: -3, dur: 1.6 }, { at: '@38', name: 'money_counter_2', gain: -11, dur: 0.8 }, { at: '@38+0.72', name: 'ding_2', gain: -8, dur: 0.7 },
    { at: 19.5, name: 'rewind_2', gain: -11, dur: 0.8 },
  ],
});
