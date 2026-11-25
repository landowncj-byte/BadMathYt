// ===== Javice / Frank — shared custom recipes (registered via BM2.register; prepended to each cut's scene.js) =====
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, countAt, hash, hit } = B;
  const tone = (n, p) => B.tone(n, p);
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const fmt = (v) => B.fmtNum(Math.round(v), 0, true);
  const approx = (g, cx, cy, w, col, lw) => { g.save(); g.strokeStyle = col; g.lineWidth = lw; g.lineCap = 'round'; for (const dy of [-lw * 1.1, lw * 1.1]) { g.beginPath(); for (let i = 0; i <= 20; i++) { const u = i / 20, x = cx - w / 2 + u * w, y = cy + dy + Math.sin(u * Math.PI * 2) * lw * 0.9; i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); } g.restore(); };

  // ---------- pitch: the PITCH DECK slide with the giant user counter that cracks ----------
  B.register('pitch', {
    defaults: { w: 820, h: 660, title: 'FRANK · PITCH DECK', sub: 'STUDENT FINANCIAL-AID STARTUP', claim: 4250000, from: 3200000, upDur: 4.2, pulses: [], crackAt: 99999, labelAt: 99999, reset: 99999, size: 176, label: 'THE SEC SAYS: < 300,000 REAL', real: 300000 },
    size: p => [p.w, p.h],
    anchors: p => ({ value: [0, 10, p.w * 0.94, p.size * 1.2], label: [0, p.h / 2 - 95, p.w * 0.9, 110], head: [0, -p.h / 2 + 60, p.w, 120] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, inReset = t >= p.reset, cracked = !inReset && t >= p.crackAt, ct = t - p.crackAt, tt = inReset ? t - p.reset : t;
      paper(g, x0, y0, w, h, 26, { lift });
      g.save(); rr(g, x0, y0, w, h, 26); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 124); const hg = g.createLinearGradient(0, y0, 0, y0 + 124); hg.addColorStop(0, 'rgba(255,255,255,.12)'); hg.addColorStop(1, 'rgba(0,0,0,.14)'); g.fillStyle = hg; g.fillRect(x0, y0, w, 124);
      // decorative trend line (up while the claim stands, falls after the crack)
      const k = cracked ? clamp(spring(ct - 0.15, 'soft'), 0, 1) : 0, up = [0.9, 0.78, 0.7, 0.55, 0.5, 0.36, 0.22, 0.1], dn = [0.1, 0.18, 0.3, 0.42, 0.7, 0.86, 0.94, 1];
      g.beginPath(); up.forEach((u, i) => { const x = x0 + 40 + i * ((w - 80) / 7), y = lerp(y0 + h * 0.4, y0 + h - 130, lerp(u, dn[i], k)); i ? g.lineTo(x, y) : g.moveTo(x, y); }); g.lineTo(x0 + w - 40, y0 + h); g.lineTo(x0 + 40, y0 + h); g.closePath(); g.fillStyle = rgba(cracked ? theme.badInk : theme.goodInk, 0.11); g.fill();
      g.restore();
      txt(g, p.title, x0 + 40, y0 + 52, F.hero(50), theme.paper, 'left'); txt(g, p.sub, x0 + 42, y0 + 96, F.mono(21), rgba(theme.paper, 0.78), 'left');
      txt(g, 'ACTIVE USERS', 0, y0 + 176, F.cap(36), theme.inkSoft);
      const yN = 12; let col = theme.ink, s = 1, jx = 0, jy = 0, valueText = null;
      g.save(); g.translate(0, yN);
      if (!cracked) {
        const v = countAt(Math.max(0, tt), p.upDur, p.from, p.claim), speed = tt > 0 && tt < p.upDur ? Math.abs(countAt(tt + 0.02, p.upDur, p.from, p.claim) - v) / 0.02 : 0;
        for (const pt of p.pulses) if (t >= pt) { s += 0.11 * hit(t - pt, 7); burst(g, 0, 0, w * 0.4, theme.accent, t - pt, 16, 0.5); }
        if (env.hot === 'value') s += 0.03 * env.hotK; g.scale(s, s); roll(g, v, 0, 0, { font: F.hero(p.size), size: p.size, color: col, speed });
      } else {
        const sw = lin(ct, 0, 0.3); if (ct < 0.28) { jx = (hash(Math.floor(t * 60)) - 0.5) * 14 * sw; jy = (hash(Math.floor(t * 60) + 9) - 0.5) * 8 * sw; }
        const dv = countAt(Math.max(0, ct - 0.28), 0.8, p.claim, p.real, ease.expo), land = ct - 1.08, dd = lin(ct, 0.28, 1.08), c = ease.out(dd);
        col = B.mix(theme.ink, theme.badInk, clamp(ct / 0.3)); s = 1 - 0.14 * c + (land > 0 ? 0.2 * hit(land, 6) : 0); const dy = land > 0 ? 18 * (1 - spring(land, { f: 2.2, z: 0.4 })) * -1 + 16 : 16 * c;
        g.translate(jx, jy + dy); g.scale(s, s); const o = { font: F.hero(p.size), size: p.size, color: col, speed: ct > 0.28 && dd < 1 ? Math.abs(countAt(ct - 0.26, 0.8, p.claim, p.real, ease.expo) - dv) / 0.02 : 0, prefix: land > -0.02 ? '<' : '' };
        const rw = B.rollWidth(g, dv, o).w; roll(g, dv, 0, 0, o); if (land > 0) marker(g, -rw / 2, p.size * 0.66, rw, p.size * 0.07, theme.badInk, clamp(land / 0.3), 0.9);
        // crack line across the digits (paper gap + dark edge) — grows then stays
        const pts = [[0, -112], [-30, -64], [24, -22], [-22, 26], [28, 70], [0, 118]].map(q => [q[0] * p.size / 176, q[1] * p.size / 176]), cp = lin(ct, 0, 0.22) * (pts.length - 1), a = ct < 1.0 ? 1 : clamp(1 - (ct - 1.0) / 0.3);
        if (a > 0 && cp > 0) { g.save(); g.globalAlpha = a; g.lineCap = 'round'; g.lineJoin = 'round'; for (const [lw, cc] of [[14, theme.ink], [7, theme.paper]]) { g.strokeStyle = cc; g.lineWidth = lw; g.beginPath(); g.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i <= Math.floor(cp); i++) g.lineTo(pts[i][0], pts[i][1]); const fr = cp - Math.floor(cp), i0 = Math.floor(cp); if (i0 < pts.length - 1) g.lineTo(lerp(pts[i0][0], pts[i0 + 1][0], fr), lerp(pts[i0][1], pts[i0 + 1][1], fr)); g.stroke(); } g.restore(); }
        burst(g, 0, 0, w * 0.34, theme.bad, land, 20, 0.55);
      }
      g.restore();
      if (cracked && ct > 1.15) { const on = clamp((ct - 1.15) / 0.2), tw = mw('CLAIMED 4,250,000', F.monoX(30)); g.save(); g.globalAlpha = on; txt(g, 'CLAIMED 4,250,000', 0, 150, F.monoX(30), theme.inkSoft); g.strokeStyle = theme.badInk; g.lineWidth = 5; g.beginPath(); g.moveTo(-tw / 2 - 8, 150); g.lineTo(-tw / 2 - 8 + (tw + 16) * ease.out(clamp((ct - 1.25) / 0.25)), 150); g.stroke(); g.restore(); }
      if (!inReset && t >= p.labelAt) { const lt = t - p.labelAt, k2 = spring(lt, 'snappy'), bw = w * 0.9; g.save(); g.translate(0, h / 2 - 78); g.scale(0.6 + 0.4 * k2, 0.6 + 0.4 * k2); g.globalAlpha = clamp(lt / 0.1); clay(g, -bw / 2, -42, bw, 84, 16, theme.bad, { shadowK: 0.5 }); txt(g, p.label, 0, 3, F.cap(36), theme.paper); g.restore(); }
    },
  });

  // ---------- sheet: CUSTOMER LIST spreadsheet whose rows multiply (grid fill) ----------
  B.register('sheet', {
    defaults: { w: 780, h: 900, title: 'CUSTOMER LIST', sub: 'ILLUSTRATION · NOT REAL DATA', fillAt: 99999, fillDur: 1.5, fillTo: 4000000, tagAt: 99999, tag: 'PROSECUTORS SAY', count: true },
    size: p => [p.w, p.h],
    anchors: p => ({ head: [0, -p.h / 2 + 70, p.w, 140], grid: [0, -20, p.w * 0.94, p.h - 340], count: [0, p.h / 2 - 58, p.w * 0.94, 160] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2;
      paper(g, x0, y0, w, h, 22, { lift });
      g.save(); rr(g, x0, y0, w, h, 22); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 130); g.restore();
      txt(g, p.title, x0 + 36, y0 + 58, F.hero(54), theme.paper, 'left'); txt(g, p.sub, x0 + 38, y0 + 102, F.mono(19), rgba(theme.paper, 0.75), 'left');
      if (t >= p.tagAt) { const k = spring(t - p.tagAt, 'snappy'), f = F.cap(24), tw = mw(p.tag, f) + 34; g.save(); g.translate(x0 + w - 28 - tw / 2, y0 + 62); g.scale(0.5 + 0.5 * k, 0.5 + 0.5 * k); clay(g, -tw / 2, -24, tw, 48, 12, theme.bad, { shadowK: 0.4 }); txt(g, p.tag, 0, 2, f, theme.paper); g.restore(); }
      const hy = y0 + 130; g.fillStyle = theme.paperShade; g.fillRect(x0, hy, w, 46); txt(g, '#', x0 + 30, hy + 24, F.mono(20), theme.inkSoft, 'left'); txt(g, 'NAME', x0 + 200, hy + 24, F.mono(20), theme.inkSoft, 'left'); txt(g, 'EMAIL', x0 + 450, hy + 24, F.mono(20), theme.inkSoft, 'left');
      const gy0 = hy + 56, gh = h - 130 - 56 - 184, fp = lin(t, p.fillAt, p.fillAt + p.fillDur), rh = lerp(56, 17, ease.inOut(lin(fp, 0, 0.4))), N = Math.floor(gh / rh), tint = ease.inOut(fp);
      const base = fp > 0 ? Math.max(N, Math.floor(p.fillTo * ease.expo(fp))) : N;
      g.save(); g.beginPath(); g.rect(x0, gy0, w, gh); g.clip();
      g.strokeStyle = rgba(theme.rule, 0.55); g.lineWidth = 2; for (let i = 1; i <= N; i++) { const yy = gy0 + i * rh; g.beginPath(); g.moveTo(x0 + 20, yy); g.lineTo(x0 + w - 20, yy); g.stroke(); }
      for (let i = 0; i < N; i++) {
        const ap = i < 7 ? 0.3 + 0.09 * i : p.fillAt + 0.7 * (i / 40), on = (i < 7 ? lt - ap : t - ap); if (on <= 0) continue; const sp = spring(on, 'bouncy'), y = gy0 + (i + 0.5) * rh, idx = fp > 0 ? base - N + i + 1 : i + 1;
        g.save(); g.translate(0, y); g.scale(1, 0.4 + 0.6 * clamp(sp, 0, 1.1)); g.globalAlpha = clamp(on / 0.06);
        if (i % 2 === 0) { g.fillStyle = rgba(theme.paperShade, 0.7); g.fillRect(x0, -rh / 2, w, rh); } if (fp > 0 && i >= 7) { g.fillStyle = rgba(theme.badInk, 0.2 * hit(on, 4)); g.fillRect(x0, -rh / 2, w, rh); }
        const fs = Math.min(22, rh * 0.62), bh = Math.max(7, rh * 0.36), cb = B.mix(theme.rule, '#E6928A', tint * 0.9); txt(g, fmt(idx), x0 + 30, 1, F.mono(fs), theme.inkSoft, 'left');
        g.fillStyle = cb; rr(g, x0 + 200, -bh / 2, 110 + 120 * hash(idx * 1.7), bh, bh / 2); g.fill(); rr(g, x0 + 450, -bh / 2, 120 + 150 * hash(idx * 2.9 + 4), bh, bh / 2); g.fill(); g.restore();
      }
      g.restore();
      // footer: record counter
      const fy = y0 + h - 84; g.strokeStyle = theme.rule; g.lineWidth = 3; g.setLineDash([10, 9]); g.beginPath(); g.moveTo(x0 + 34, fy - 98); g.lineTo(x0 + w - 34, fy - 98); g.stroke(); g.setLineDash([]);
      if (p.count) {
        txt(g, 'RECORDS', 0, fy - 66, F.cap(26), theme.inkSoft);
        if (t >= p.fillAt - 0.15) { const v = countAt(Math.max(0, t - p.fillAt), p.fillDur, 7, p.fillTo, ease.expo), land = t - p.fillAt - p.fillDur, s = 1 + (land > 0 ? 0.18 * hit(land, 6) : 0) + (env.hot === 'count' ? 0.03 * env.hotK : 0);
          g.save(); g.translate(0, fy + 26); g.scale(s, s); roll(g, v, 0, 0, { font: F.hero(100), size: 100, color: theme.badInk, suffix: land > -0.05 ? '+' : '', speed: t - p.fillAt < p.fillDur ? p.fillTo / 3 : 0 }); g.restore(); burst(g, 0, fy + 26, 200, theme.bad, land, 16, 0.5); }
        else txt(g, '—', 0, fy + 26, F.hero(100), theme.rule);
      }
    },
  });

  // ---------- engineer: small faceless figure (ILLUSTRATION) who shakes his head ----------
  B.register('engineer', {
    defaults: { w: 600, h: 800, askAt: 99999, noAt: 99999 },
    size: p => [p.w, p.h], anchors: p => ({ fig: [0, -p.h / 2 + 330, p.w * 0.8, 420], head: [0, -p.h / 2 + 260, 300, 260], card: [0, 0, p.w, p.h] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2;
      paper(g, x0, y0, w, h, 24, { lift }); g.save(); rr(g, x0, y0, w, h, 24); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 112); g.restore();
      txt(g, 'PER THE SEC', x0 + 36, y0 + 52, F.hero(54), theme.paper, 'left'); txt(g, 'ILLUSTRATION', x0 + 38, y0 + 92, F.mono(19), rgba(theme.paper, 0.75), 'left');
      const cy = y0 + 240, nd = t >= p.noAt ? t - p.noAt : -1, sh = nd >= 0 ? 0.36 * Math.sin(2 * Math.PI * 3.3 * nd) * Math.exp(-0.9 * nd) : 0.05 * Math.sin(lt * 2);
      g.save(); g.beginPath(); g.rect(x0, y0 + 112, w, 392); g.clip();
      const sg = g.createLinearGradient(0, cy, 0, cy + 260); sg.addColorStop(0, '#4a5463'); sg.addColorStop(1, '#2f3744'); g.fillStyle = sg; rr(g, -185, cy + 110, 370, 300, 120); g.fill();
      g.fillStyle = '#6a7282'; g.fillRect(-26, cy + 50, 52, 70);
      g.save(); g.translate(0, cy + 70); g.rotate(sh); const hg = g.createLinearGradient(-80, -170, 80, 0); hg.addColorStop(0, '#7c8596'); hg.addColorStop(1, '#59606B'); g.fillStyle = hg; g.beginPath(); g.arc(0, -90, 92, 0, 7); g.fill();
      g.strokeStyle = '#2f3744'; g.lineWidth = 8; g.beginPath(); g.arc(-34, -92, 24, 0, 7); g.stroke(); g.beginPath(); g.arc(34, -92, 24, 0, 7); g.stroke(); g.beginPath(); g.moveTo(-10, -92); g.lineTo(10, -92); g.stroke(); g.restore(); g.restore();
      txt(g, 'HER OWN ENGINEER', 0, y0 + 540, F.cap(30), theme.inkSoft);
      if (t >= p.askAt) { const on = t - p.askAt, s = 'ASKED FOR FAKE DATA', n = Math.ceil(s.length * ease.out(clamp(on / 0.55))); txt(g, s.slice(0, n), -mw(s, F.monoX(32)) / 2, y0 + 606, F.monoX(32), theme.ink, 'left'); }
      if (t >= p.noAt) { const on = t - p.noAt, k = spring(on, 'snappy'); g.save(); g.translate(0, y0 + 692); g.scale(0.5 + 0.5 * k, 0.5 + 0.5 * k); g.globalAlpha = clamp(on / 0.1); txt(g, 'HE REFUSED', 0, 0, F.hero(78), theme.badInk); g.restore(); }
    },
  });

  // ---------- silhouette: founder name card, no photo ----------
  B.register('silh', {
    defaults: { w: 520, h: 600, name: 'CHARLIE JAVICE · FOUNDER' }, size: p => [p.w, p.h],
    draw(g, p, env) {
      const { theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 24, { lift });
      g.save(); rr(g, x0, y0, w, h, 24); g.clip(); const bg = g.createLinearGradient(0, y0, 0, y0 + h); bg.addColorStop(0, '#E7E2D6'); bg.addColorStop(1, '#D8D3C7'); g.fillStyle = bg; g.fillRect(x0, y0, w, h);
      const sg = g.createLinearGradient(0, y0 + 300, 0, y0 + 480); sg.addColorStop(0, '#6a7282'); sg.addColorStop(1, '#3a4350'); g.fillStyle = sg; rr(g, -190, y0 + 330, 380, 300, 130); g.fill(); g.fillStyle = '#59606B'; g.fillRect(-28, y0 + 255, 56, 90); const hg = g.createLinearGradient(-70, y0 + 100, 70, y0 + 270); hg.addColorStop(0, '#7c8596'); hg.addColorStop(1, '#4a5260'); g.fillStyle = hg; g.beginPath(); g.ellipse(0, y0 + 195, 86, 104, 0, 0, 7); g.fill();
      g.fillStyle = theme.navy; g.fillRect(x0, y0 + h - 112, w, 112); g.restore();
      txt(g, 'ILLUSTRATION', x0 + 26, y0 + 34, F.mono(18), theme.inkSoft, 'left'); txt(g, p.name, 0, y0 + h - 56, F.cap(29), theme.paper);
    },
  });

  // ---------- bank: generic bank card with plain text JPMORGAN (no logo) ----------
  B.register('bank', {
    defaults: { w: 740, h: 580, at: 99999, dur: 1.1, to: 175000000, pulses: [], label: 'PAID FOR FRANK', sub: 'SEPT 2021' },
    size: p => [p.w, p.h], anchors: p => ({ amount: [0, 28, p.w * 0.94, 190], head: [0, -p.h / 2 + 70, p.w, 140] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift });
      g.save(); rr(g, x0, y0, w, h, 26); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 140); g.restore();
      // generic bank building icon
      g.save(); g.translate(x0 + 84, y0 + 70); g.fillStyle = theme.paper; g.beginPath(); g.moveTo(-46, -14); g.lineTo(0, -46); g.lineTo(46, -14); g.closePath(); g.fill(); for (let i = 0; i < 4; i++) g.fillRect(-38 + i * 25, -8, 13, 38); g.fillRect(-48, 34, 96, 9); g.restore();
      txt(g, 'JPMORGAN', x0 + 150, y0 + 74, F.hero(78), theme.paper, 'left');
      txt(g, p.label, 0, y0 + 196, F.cap(36), theme.inkSoft);
      const lt = t - p.at, yA = 28;
      if (lt < 0) { g.fillStyle = theme.rule; rr(g, -250, yA - 28, 500, 56, 28); g.fill(); }
      else { const v = countAt(lt, p.dur, 0, p.to), land = lt - p.dur, speed = lt < p.dur ? Math.abs(countAt(lt + 0.02, p.dur, 0, p.to) - v) / 0.02 : 0; let s = 1 + (land > 0 ? 0.14 * hit(land, 6) : 0); for (const pt of p.pulses) if (t >= pt) { s += 0.1 * hit(t - pt, 7); burst(g, 0, yA, w * 0.4, theme.accent, t - pt, 16, 0.5); }
        if (env.hot === 'amount') s += 0.03 * env.hotK; g.save(); g.translate(0, yA); g.scale(s, s); const o = { font: F.hero(120), size: 120, color: theme.badInk, prefix: '$', speed }; const rw = B.rollWidth(g, v, o).w; roll(g, v, 0, 0, o); if (land > 0) marker(g, -rw / 2, 82, rw, 9, theme.badInk, clamp(land / 0.3), 0.9); g.restore(); burst(g, 0, yA, w * 0.38, theme.bad, land, 18, 0.55); }
      txt(g, p.sub, 0, y0 + h - 76, F.monoX(34), theme.ink);
    },
  });

  // ---------- permath: OUR MATH card ----------
  B.register('permath', {
    defaults: { w: 740, h: 600, at: 99999, dur: 0.9, to: 580 }, size: p => [p.w, p.h], anchors: p => ({ hero: [0, 50, p.w * 0.92, 230] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift });
      g.save(); g.translate(x0 + 40, y0 + 58); clay(g, 0, -28, 210, 56, 14, theme.bad, { shadowK: 0.4 }); txt(g, 'OUR MATH', 105, 2, F.cap(30), theme.paper); g.restore();
      const fo = t - (p.at - 0.35), f = '$175M ÷ 300K', n = Math.ceil(f.length * ease.out(clamp(fo / 0.45))); if (fo > 0) txt(g, f.slice(0, n), -mw(f, F.monoX(58)) / 2, y0 + 170, F.monoX(58), theme.ink, 'left');
      const lt = t - p.at; if (lt > 0) { const v = countAt(lt, p.dur, 0, p.to), land = lt - p.dur, speed = lt < p.dur ? Math.abs(countAt(lt + 0.02, p.dur, 0, p.to) - v) / 0.02 : 0, o = { font: F.hero(190), size: 190, color: theme.badInk, prefix: '$', speed }, aw = 120, rw = B.rollWidth(g, p.to, o).w, tot = aw + 24 + rw, s = 1 + (land > 0 ? 0.14 * hit(land, 6) : 0) + (env.hot === 'hero' ? 0.03 * env.hotK : 0);
        g.save(); g.translate(0, 50); g.scale(s, s); approx(g, -tot / 2 + aw / 2, -6, aw, theme.badInk, 13); roll(g, v, -tot / 2 + aw + 24, 0, { ...o, align: 'left' }); if (land > 0) marker(g, -tot / 2, 112, tot, 9, theme.badInk, clamp(land / 0.3), 0.9); g.restore(); burst(g, 0, 50, 300, theme.bad, land, 18, 0.55);
        if (land > -0.1) { const on = land + 0.1, k = spring(on, 'snappy'); g.save(); g.globalAlpha = clamp(on / 0.1); g.translate(0, y0 + h - 88 + (1 - k) * 26); txt(g, 'PER REAL USER', 0, 0, F.hero(70), theme.ink); g.restore(); } }
    },
  });

  // ---------- verdict: courtroom card (gavel + GUILTY + sentence + restitution) ----------
  B.register('verdict', {
    defaults: { w: 780, guiltyAt: 99999, monthsAt: 99999, restiAt: 99999, resti: true, restiDur: 1.5 },
    size: p => [p.w, p.resti ? 830 : 640],
    anchors(p) { const h = this.size(p)[1], y0 = -h / 2; return { head: [0, y0 + 70, p.w, 140], guilty: [0, y0 + 240, p.w * 0.92, 230], months: [0, y0 + 485, p.w * 0.92, 200], resti: [0, y0 + 715, p.w * 0.92, 220] }; },
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = this.size(p)[1], x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift });
      g.save(); rr(g, x0, y0, w, h, 26); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 140); g.restore();
      txt(g, 'THE VERDICT', x0 + 40, y0 + 70, F.hero(70), theme.paper, 'left');
      // gavel: raised, swings down and hits at guiltyAt, bounces
      const ga = p.guiltyAt, ang = t < ga - 0.3 ? -0.95 : t < ga ? lerp(-0.95, 0.1, ease.in(lin(t, ga - 0.3, ga))) : 0.1 - 0.35 * hit(t - ga, 9) * Math.max(0, Math.sin((t - ga) * 18)) ;
      g.save(); g.translate(x0 + w - 120, y0 + 98); clay(g, -62, 6, 124, 22, 8, theme.manila, { shadowK: 0.3 }); g.translate(0, -2); g.rotate(ang); clay(g, -9, -118, 18, 124, 8, theme.manila, { shadowK: 0.3 }); clay(g, -50, -150, 100, 58, 12, '#B9955A', { shadowK: 0.3 }); g.restore();
      const dash = y => { g.strokeStyle = theme.rule; g.lineWidth = 3; g.setLineDash([10, 9]); g.beginPath(); g.moveTo(x0 + 40, y); g.lineTo(x0 + w - 40, y); g.stroke(); g.setLineDash([]); };
      { const gt = t - ga; if (gt > 0) { const sc = 1 + 1.3 * (1 - ease.expo(gt / 0.2)), a = clamp(gt / 0.08), yy = y0 + 240, hot = env.hot === 'guilty' ? 0.03 * env.hotK : 0; g.save(); g.globalAlpha = a; g.translate(0, yy); g.rotate(-0.04); g.scale(sc + hot, sc + hot); marker(g, -250, -86, 500, 150, theme.badInk, clamp((gt - 0.1) / 0.3), 0.16); txt(g, 'GUILTY', 0, 0, F.hero(160), theme.badInk); g.restore(); burst(g, 0, y0 + 240, 300, theme.bad, gt - 0.1, 20, 0.55);
        const k2 = spring(gt - 0.2, 'snappy'); g.save(); g.globalAlpha = clamp((gt - 0.2) / 0.12); g.translate(0, y0 + 330 + (1 - k2) * 24); txt(g, '4 OF 4 COUNTS · MARCH 2025', 0, 0, F.cap(38), theme.ink); g.restore(); } }
      dash(y0 + 385);
      { const mt = t - p.monthsAt; if (mt > -0.01) { const v = countAt(Math.max(0, mt), 0.7, 0, 85), land = mt - 0.7, s = 1 + (land > 0 ? 0.16 * hit(land, 6) : 0) + (env.hot === 'months' ? 0.03 * env.hotK : 0), o = { font: F.hero(140), size: 140, color: theme.ink, speed: mt < 0.7 ? 85 / 0.5 : 0 };
        const nw = B.rollWidth(g, 85, o).w, sw = mw(' MONTHS', F.hero(140)), tot = nw + sw; g.save(); g.translate(0, y0 + 485); g.scale(s, s); roll(g, v, -tot / 2, 0, { ...o, align: 'left' }); txt(g, ' MONTHS', -tot / 2 + nw, 0, F.hero(140), theme.badInk, 'left'); if (land > 0) marker(g, -tot / 2, 92, tot, 9, theme.badInk, clamp(land / 0.3), 0.9); g.restore(); burst(g, 0, y0 + 485, 320, theme.bad, land, 18, 0.55);
        if (land > -0.2) { const on = land + 0.2; g.save(); g.globalAlpha = clamp(on / 0.12); g.translate(0, y0 + 570 + (1 - spring(on, 'snappy')) * 22); txt(g, 'IN PRISON · SENTENCED SEPT 2025', 0, 0, F.cap(32), theme.inkSoft); g.restore(); } } }
      if (p.resti) { dash(y0 + 615); const rt = t - p.restiAt; if (rt > -0.5) { const on = rt + 0.5; g.save(); g.globalAlpha = clamp(on / 0.12); g.translate(0, y0 + 650 + (1 - spring(on, 'snappy')) * 20); txt(g, 'RESTITUTION', 0, 0, F.cap(40), theme.inkSoft); g.restore(); }
        if (rt > 0) { const v = countAt(rt, p.restiDur, 0, 287500000), land = rt - p.restiDur, s = 1 + (land > 0 ? 0.14 * hit(land, 6) : 0) + (env.hot === 'resti' ? 0.03 * env.hotK : 0), o = { font: F.hero(128), size: 128, color: theme.badInk, prefix: '$', speed: rt < p.restiDur ? 287500000 / 0.7 : 0 }; g.save(); g.translate(0, y0 + 742); g.scale(s, s); const rw = B.rollWidth(g, 287500000, o).w; roll(g, v, 0, 0, o); if (land > 0) marker(g, -rw / 2, 70, rw, 9, theme.badInk, clamp(land / 0.3), 0.9); g.restore(); burst(g, 0, y0 + 742, 320, theme.bad, land, 18, 0.55); } }
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
})();
const HOOK = { lines: [[['SHE ', 'paper'], ['SOLD ', 'paper'], ['JPMORGAN', 'paper']], [['4,000,000 ', 'bad'], ['CUSTOMERS', 'paper']], [["THAT ", 'paper'], ["DIDN'T ", 'paper'], ['EXIST', 'bad']]], size: 100 };
BM2.scene({
  series: 'decoded', title: 'CASE: FRANK · 2021', duration: 17.52,
  footnote: ['CONVICTED 2025 · 85 MONTHS · SOURCES: DOJ, SEC', 'FIGURES + LIST ARE ILLUSTRATIONS', 'PHOTOS: WOBBANIGHT CC0, PIDATACENTERS CC BY-SA, A. SURESH CC BY, VIA COMMONS'],
  elements: [
    { id: 'hook', type: 'text', at: [0, -520], in: -1, out: '@fewer-0.1', props: HOOK },
    { id: 'deck', type: 'pitch', at: [0, 0], scale: 0.85, in: -1, props: { from: 3700000, upDur: 2.0, crackAt: '@300-0.1', labelAt: '@,000>+0.1' } },
    { id: 'bank', type: 'bank', at: [1650, 0], in: '@$175-0.5', props: { at: '@$175', dur: 1.0 } },
    { id: 'pbank', type: 'photo', at: [1960, -240], in: '@$175-0.5', props: { src: 'brand/photos/stock/jpmorgan-chase-building-270-park-avenue/3.jpg', name: '', credit: 'PHOTO: WOBBANIGHT · CC0', treatment: 'polaroid', w: 200, tilt: 0.07, aspect: 1.0 } },
    { id: 'sheet', type: 'sheet', at: [3300, -60], in: '@When-0.4', props: { fillAt: '@fake-0.15', fillDur: 0.7, tagAt: '@professor' } },
    { id: 'pdata', type: 'photo', at: [3580, -250], in: '@When-0.4', props: { src: 'brand/photos/stock/data-center-server-racks/2.jpg', name: '', credit: 'PHOTO: PIDATACENTERS · CC BY-SA 4.0', treatment: 'polaroid', w: 230, tilt: 0.07, aspect: 1.0 } },
    { id: 'stampS', type: 'stamp', at: [3300, 20], rot: -0.09, in: '@it', props: { text: 'SYNTHETIC', tone: 'bad', size: 150 } },
    { id: 'verdict', type: 'verdict', at: [4950, 0], in: '@85-0.35', props: { guiltyAt: '@85-0.2', monthsAt: '@85', resti: false } },
    { id: 'pcourt', type: 'photo', at: [5345, -185], in: '@85-0.35', props: { src: 'brand/photos/stock/daniel-patrick-moynihan-united-states-courthouse/2.jpg', name: '', credit: 'PHOTO: AJAY SURESH · CC BY 4.0', treatment: 'polaroid', w: 200, tilt: -0.06, aspect: 1.0 } },
    { id: 'bold', type: 'stamp', layer: 'screen', at: [540, 470], rot: -0.07, in: '@bold', out: '@85-0.3', props: { text: 'BOLD AS HELL', tone: 'bad', size: 124 } },
    { id: 'plane', type: 'plane', layer: 'screen', at: [540, 760], in: '@Send-0.1', out: '@count+0.2', props: {} },
    { id: 'send', type: 'text', layer: 'screen', at: [540, 610], in: '@Send', props: { lines: [[['SEND ', 'accent'], ['TO ', 'paper'], ['THE ', 'paper'], ['FRIEND', 'paper']], [['WHO ', 'paper'], ['FAKES ', 'paper'], ['THEIR', 'paper']], [['FOLLOWERS', 'bad']]], size: 98, per: 0.12 } },
  ],
  beats: [
    { at: 0, beat: 'graphic-hero', focus: ['hook', 'deck'], sx: 540, sy: 835, fill: 0.9, maxH: 940, st: { x: 150, y: 1330, s: 1.1 }, pose: 'talk' },
    { at: '@$175', beat: 'zoom-on-number', focus: 'bank.amount', move: 'whip', fill: 0.8, sy: 790, st: 'corner-left', pose: 'point', keep: ['pbank'] },
    { at: '@fewer', beat: 'graphic-hero', focus: 'deck', move: 'whip', st: 'corner-left', sy: 760, fill: 0.84, pose: 'point' },
    { at: '@300', beat: 'zoom-on-number', focus: 'deck.value', fill: 0.8, sy: 790, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@When', beat: 'side-by-side', focus: 'sheet', move: 'whip', sy: 760, fill: 0.7, maxH: 900, pose: 'point', keep: ['pdata'] },
    { at: '@professor', beat: 'graphic-hero', focus: 'sheet', st: 'corner', fill: 0.78, sy: 760, maxH: 900, pose: 'point', keep: ['pdata'] },
    { at: '@bold', beat: 'presenter-front', focus: 'sheet', sy: 760, pose: 'shrug', keep: ['pdata', 'stampS'] },
    { at: '@85', beat: 'zoom-on-number', focus: 'verdict.months', move: 'whip', fill: 0.66, sy: 860, st: 'corner-left', pose: 'shock', keep: ['pcourt'] },
    { at: '@Send', beat: 'presenter-front', focus: 'verdict', sy: 760, pose: 'you', keep: ['pcourt'] },
  ],
  poses: [],
  shakes: [['@300', 16], ['@bold', 14], ['@85', 12]],
  captions: { emph: { '4': 'bad', '$175': 'accent', '300,000': 'bad', fake: 'bad', hell: 'bad', '85': 'bad', fewer: 'bad' }, fix: [] },
  bed: { name: 'tense_bed_2', gain: -1 },
  sfx: [
    { at: 0, name: 'deep_boom_2', gain: -4, dur: 0.36 }, { at: 0.08, name: 'money_counter_1', gain: -14, dur: 1.4 },
    { at: '@$175', name: 'cash_register_1', gain: -8, dur: 0.9 }, { at: '@$175+0.05', name: 'money_counter_2', gain: -13, dur: 1.0 },
    { at: '@300-0.1', name: 'glass_shatter_2', gain: -8, dur: 0.7 }, { at: '@300+0.2', name: 'sub_drop_1', gain: -8, dur: 1.0 }, { at: '@300+0.98', name: 'deep_boom_1', gain: -3, dur: 1.6 },
    { at: '@When', name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@fake-0.15', name: 'money_counter_1', gain: -12, dur: 0.9, offset: 0.5 },
    { at: '@it', name: 'rubber_stamp_2', gain: -3, dur: 0.5 }, { at: '@it', name: 'deep_boom_2', gain: -8, dur: 0.36 },
    { at: '@bold', name: 'rubber_stamp_2', gain: -3, dur: 0.5 }, { at: '@bold', name: 'comedic_sting_1', gain: -9, dur: 1.2 },
    { at: '@85-0.2', name: 'gavel_1', gain: -4, dur: 0.8 }, { at: '@85', name: 'money_counter_2', gain: -11, dur: 0.8 }, { at: '@85+0.72', name: 'ding_2', gain: -8, dur: 0.7 },
    { at: '@Send', name: 'swoosh_2', gain: -9, dur: 1.0 },
  ],
});
