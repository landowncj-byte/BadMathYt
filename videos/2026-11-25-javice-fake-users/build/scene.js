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
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, inReset = t >= p.reset, cracked = !inReset && t >= p.crackAt, ct = t - p.crackAt, tt = inReset ? t - p.reset : t - (p.t0 || 0);
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
// reused CTA micro-moment recipes (from Tucker payday): plane, heart, mag
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, countAt, hash, hit } = B;
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
// recipes copied from videos/2026-11-26-fake-wine/_src/shared.js (slamstamp, gavel, calendar; calendar adapted: p.foot, to=22)
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
  // ---------- calendar: chips of $1,000 fill the days, the years counter rolls to 95 ----------
  B.register('calendar', {
    defaults: { w: 780, h: 900, at: 99999, dur: 1.7, yrsAt: 99999, yrsDur: 0.9, to: 22, foot: 'OUR MATH: $8M ÷ $1,000 A DAY ≈ 22 YEARS' }, ownEnter: true, size: p => [p.w, p.h],
    anchors: p => ({ head: [0, -p.h / 2 + 70, p.w, 140], grid: [0, -90, p.w * 0.92, 420], years: [0, p.h / 2 - 210, p.w * 0.9, 220] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, sp = spring(Math.max(0, lt), 'snappy');
      g.save(); g.scale(0.92 + 0.08 * sp, 0.92 + 0.08 * sp); g.globalAlpha *= clamp(lt / 0.08 + 0.4); g.rotate(0.012);
      paper(g, x0, y0, w, h, 26, { lift }); g.save(); rr(g, x0, y0, w, h, 26); g.clip(); g.fillStyle = theme.bad; g.fillRect(x0, y0, w, 130); g.restore();
      for (const x of [-190, 190]) { clay(g, x - 12, y0 - 26, 24, 60, 10, theme.ink, { shadowK: 0.3 }); }
      txt(g, '$1,000 A DAY', 0, y0 + 80, F.hero(78), theme.paper); txt(g, 'ILLUSTRATION', x0 + w - 28, y0 + 24, F.mono(14), 'rgba(245,243,238,.75)', 'right');
      const cols = 7, rows = 6, cw = 92, ch = 66, gx = x0 + (w - cols * cw) / 2, gy = y0 + 160, N = cols * rows, n = clamp(lin(t, p.at, p.at + p.dur)) * N;
      for (let i = 0; i < N; i++) { const cx = gx + (i % cols) * cw + cw / 2, cy = gy + Math.floor(i / cols) * ch + ch / 2; g.fillStyle = theme.paperShade; rr(g, cx - 40, cy - 28, 80, 56, 9); g.fill();
        if (i < n) { const k = spring(Math.max(0, n - i) / 6, 'bouncy'); g.save(); g.translate(cx, cy); g.scale(0.4 + 0.6 * Math.min(1, k), 0.4 + 0.6 * Math.min(1, k)); g.fillStyle = theme.gold; g.beginPath(); g.arc(0, 0, 25, 0, 7); g.fill(); g.strokeStyle = theme.ink; g.lineWidth = 3; g.beginPath(); g.arc(0, 0, 19, 0, 7); g.stroke(); txt(g, '$1K', 0, 5, F.mono(15), theme.ink); g.restore(); } }
      const mt = t - p.yrsAt; if (mt > -0.01) { const o = { font: F.hero(150), size: 150, color: theme.ink, speed: mt < p.yrsDur ? p.to / p.yrsDur * 0.5 : 0 }, v = countAt(Math.max(0, mt), p.yrsDur, 0, p.to), land = mt - p.yrsDur, nw = B.rollWidth(g, p.to, o).w, sw = mw(' YEARS', F.hero(150)), tot = nw + sw, s = 1 + (land > 0 ? 0.14 * hit(land, 6) : 0);
        g.save(); g.translate(0, y0 + h - 170); g.scale(s, s); roll(g, v, -tot / 2, 0, { ...o, align: 'left' }); txt(g, ' YEARS', -tot / 2 + nw, 0, F.hero(150), theme.badInk, 'left'); if (land > 0) marker(g, -tot / 2, 18, tot, 9, theme.badInk, clamp(land / 0.3), 0.9); g.restore(); burst(g, 0, y0 + h - 170, 300, theme.bad, land, 18, 0.55); }
      txt(g, p.foot, 0, y0 + h - 34, F.mono(18), theme.inkSoft);
      g.restore();
    },
  });
})();
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
// ===== Javice / Frank — CRIME-SHOW generator (RULES 112). One story, three cuts; each cut passes a cfg of word refs (cfg.R). =====
// Appended after: shared_j.js (pitch, sheet, engineer, bank, permath, verdict, plane), wine_bits.js, shared2.js (hud), crime.js (suspect, board, victim, datecard, tile), + charts.js built-ins
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, burst, hit } = B;

  // ---------- party: 14 guests were "invited", 1 showed up (ratio 4.25M : <300K) ----------
  B.register('party', {
    defaults: { w: 880, h: 760, nAt: 99999, oneAt: 99999 }, size: p => [p.w, p.h],
    anchors: p => ({ grid: [0, 20, p.w * 0.9, 420], big: [0, p.h / 2 - 130, p.w * 0.9, 190], head: [0, -p.h / 2 + 60, p.w, 120] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift });
      g.save(); rr(g, x0, y0, w, h, 26); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 120); g.restore();
      txt(g, 'THE PARTY MATH', x0 + 40, y0 + 62, F.hero(62), theme.paper, 'left'); txt(g, 'ILLUSTRATION', x0 + w - 34, y0 + 32, F.mono(18), 'rgba(245,243,238,.7)', 'right');
      const cols = 7, cw = 112, rh = 168, gx = -((cols - 1) * cw) / 2, gy = y0 + 270, fall = t >= p.oneAt, fk = ease.in(lin(t, p.oneAt, p.oneAt + 0.5));
      for (let i = 0; i < 14; i++) {
        const on = t - (p.nAt + i * 0.07); if (on < 0) continue; const k = spring(on, 'bouncy'), keep = i === 6, cx = gx + (i % cols) * cw, cy = gy + Math.floor(i / cols) * rh;
        let a = clamp(on / 0.1), sc = Math.min(1.15, k), dy = 0; if (fall && !keep) { a *= 1 - fk; sc *= 1 - 0.3 * fk; dy = 40 * fk; }
        g.save(); g.globalAlpha = a; g.translate(cx, cy + dy); g.scale(sc, sc); const col = keep ? '#E0281E' : '#59647a'; g.fillStyle = col; g.beginPath(); g.moveTo(-34, 62); g.quadraticCurveTo(-34, 6, 0, 2); g.quadraticCurveTo(34, 6, 34, 62); g.closePath(); g.fill(); g.strokeStyle = '#0B0F14'; g.lineWidth = 4; g.stroke();
        g.fillStyle = '#E8C9A0'; g.beginPath(); g.arc(0, -26, 26, 0, 7); g.fill(); g.stroke(); g.restore();
      }
      const n = t >= p.oneAt ? 1 : Math.min(14, Math.floor((t - p.nAt) / 0.07) + 1);
      if (t >= p.nAt) { const k = t >= p.oneAt ? spring(t - p.oneAt, 'snappy') : 1; g.save(); g.translate(0, y0 + h - 100); g.scale(0.85 + 0.15 * k, 0.85 + 0.15 * k); txt(g, t >= p.oneAt ? '1 SHOWED UP' : n + ' GUESTS SAID', 0, 0, F.hero(96), t >= p.oneAt ? theme.badInk : theme.ink); g.restore(); }
    },
  });


  // ---------- prof: the data-science professor victim-style character card (green card like the other cast; mortarboard + glasses + a tablet of 0s and 1s) ----------
  B.register('prof', {
    defaults: { label: 'THE PROFESSOR', sub: 'DATA SCIENCE', w: 340, h: 440, reactAt: 99999, tape: 'HIRED', labelSize: 38 }, size: p => [p.w, p.h],
    anchors: p => ({ face: [0, -p.h * 0.12, p.w * 0.6, p.h * 0.45], label: [0, p.h / 2 - 70, p.w, 120] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, k = spring(lt, 'heavy'), sh = clamp((t - p.reactAt) / 0.12), by = h / 2 - 150;
      g.save(); g.translate(0, (1 - k) * 200); g.rotate((1 - k) * 0.08); g.globalAlpha *= clamp(lt / 0.1);
      paper(g, -w / 2, -h / 2, w, h, 20, { lift }); g.save(); rr(g, -w / 2 + 18, -h / 2 + 18, w - 36, h - 160, 12); g.clip(); const bg = g.createLinearGradient(0, -h / 2, 0, h / 2); bg.addColorStop(0, '#CFEFDD'); bg.addColorStop(1, '#8FD1B0'); g.fillStyle = bg; g.fillRect(-w / 2, -h / 2, w, h);
      const sc = w / 400; g.translate(0, by + 20); g.scale(sc, sc); g.translate(0, -by);
      g.fillStyle = '#1FA366'; g.beginPath(); g.moveTo(-w * 0.34 / sc, by + 90); g.quadraticCurveTo(-w * 0.34 / sc, by - 30, 0, by - 40); g.quadraticCurveTo(w * 0.34 / sc, by - 30, w * 0.34 / sc, by + 90); g.closePath(); g.fill(); g.strokeStyle = '#0B0F14'; g.lineWidth = 5; g.stroke();
      g.fillStyle = '#F5F3EE'; g.beginPath(); g.moveTo(-26, by - 36); g.lineTo(0, by + 14); g.lineTo(26, by - 36); g.closePath(); g.fill();
      const hy = by - 100 - sh * 8; g.fillStyle = '#E8C9A0'; g.beginPath(); g.arc(0, hy, 56, 0, 7); g.fill(); g.stroke();
      g.strokeStyle = '#0B0F14'; g.lineWidth = 5; for (const q of [-1, 1]) { g.beginPath(); g.arc(q * 22, hy - 4, 17, 0, 7); g.stroke(); } g.beginPath(); g.moveTo(-5, hy - 4); g.lineTo(5, hy - 4); g.stroke();
      g.fillStyle = '#0B0F14'; for (const q of [-1, 1]) { g.beginPath(); g.arc(q * 22, hy - 4, 5 + sh * 2, 0, 7); g.fill(); }
      g.fillStyle = '#7a2b25'; g.beginPath(); if (sh > 0.2) g.ellipse(0, hy + 30, 9, 11 * sh, 0, 0, 7); else g.arc(0, hy + 28, 13, 0.2, Math.PI - 0.2); g.fill();
      g.fillStyle = '#14202e'; g.beginPath(); g.moveTo(-70, hy - 46); g.lineTo(0, hy - 74); g.lineTo(70, hy - 46); g.lineTo(0, hy - 24); g.closePath(); g.fill(); g.stroke(); g.fillRect(-36, hy - 40, 72, 18);
      g.strokeStyle = '#F2B705'; g.lineWidth = 5; g.beginPath(); g.moveTo(54, hy - 54); g.lineTo(62, hy - 6); g.stroke(); g.fillStyle = '#F2B705'; g.beginPath(); g.arc(62, hy - 2, 8, 0, 7); g.fill();
      g.fillStyle = '#16202e'; g.beginPath(); g.roundRect(w * 0.1 / sc, by + 18, 108, 78, 8); g.fill(); g.fillStyle = '#7CE0A6'; g.font = '700 16px "JetBrains Mono",monospace'; g.textAlign = 'left'; for (let i = 0; i < 4; i++) g.fillText(((i * 7 + Math.floor(t * 3)) % 3 ? '10110' : '01001') + (i % 2 ? '0' : '1'), w * 0.1 / sc + 12, by + 42 + i * 17);
      g.restore();
      g.fillStyle = '#188a56'; rr(g, -w / 2 + 18, h / 2 - 130, w - 36, 110, 10); g.fill(); txt(g, p.label, 0, h / 2 - 92, F.hero(p.labelSize), theme.paper); if (p.sub) txt(g, p.sub, 0, h / 2 - 48, F.mono(19), rgba(theme.paper, 0.85));
      g.save(); g.translate(-w * 0.22, -h / 2 + 4); g.rotate(-0.1); g.fillStyle = '#188a56'; g.fillRect(-60, -16, 120, 32); txt(g, p.tape, 0, 1, F.monoX(17), theme.paper); g.restore();
      g.restore();
    },
  });

  // ============================================================== scene builder ==============================================================
  const SB = 'side-by-side', GH = 'graphic-hero', ZN = 'zoom-on-number', PF = 'presenter-front', PK = 'peek', PB = 'pull-back';
  const PHOTO = 'brand/photos/charlie-javice-illustration/founder.png';
  const SUS = { src: PHOTO, crop: [0, 0, 1, 1], fx: 0.5, fy: 0.42, aspect: 1.1 };
  const NAME = { name: 'CHARLIE JAVICE', nick: '“THE FOUNDER”' };
  const CRED = 'ILLUSTRATION · NO LICENSED PHOTO';
  const STK = { x: 915, y: 1385, s: 0.95 };

  window.JAVICE = function (cfg) {
    const R = cfg.R, E = [], T = [], S = [], SH = [], PO = [];
    const stn = i => [(i % 6) * 1950, Math.floor(i / 6) * 1950];
    let si = 1; const seg = () => stn(si++);
    const O = (r, d) => { d = parseFloat(d); if (typeof r === 'number') return r + d; const m = String(r).match(/^(.*?)([+-]\d*\.?\d+)?$/), q = (m[2] ? parseFloat(m[2]) : 0) + d; return m[1] + (q ? (q > 0 ? '+' : '') + (+q.toFixed(3)) : ''); };
    const b = (at, beat, focus, o = {}) => T.push(Object.assign({ at, beat, focus }, o));
    const sfx = (at, name, gain = -9, dur = 0.5) => S.push({ at, name, gain, dur });
    const pip = (id, at0, out, label, to) => E.push({ id, type: 'suspect', layer: 'screen', at: [880, 1130], in: at0, out, props: Object.assign({}, SUS, { variant: 'pip', w: 200, aspect: 1.0, label, flash: true, tilt: 0.03, arrow: { at: O(at0, '+0.3'), to: to || [-420, -300] } }) });

    // ---- S0 frame 0 ----
    const hs = cfg.hook.side;
    E.push({ id: 'hook', type: 'text', at: [0, -400], in: -1, out: R.hookEnd, props: { lines: cfg.hook.lines, size: cfg.hook.size || 92 } });
    E.push({ id: 'hook2', type: 'text', at: [0, -400], in: R.loopIn, props: { lines: cfg.hook.lines, size: cfg.hook.size || 92 } });
    E.push({ id: 'sus0', type: 'suspect', at: [-230, 230], in: -1, props: Object.assign({}, SUS, NAME, { w: 420, flash: false, tilt: -0.02, credit: CRED, ring: R.hookRing || 99999 }) });
    E.push({ id: 'vs0', type: hs.kind === 'prof' ? 'prof' : 'victim', at: [300, 290], in: -1, props: { kind: hs.kind, label: hs.label, sub: hs.sub, labelSize: 34, w: 330, h: 430, tape: hs.tape || 'VICTIM', reactAt: R.hookReact || 99999 } });
    const F0 = ['hook', 'sus0', 'vs0'];
    b(0, SB, F0, { sx: 540, sy: 880, fill: 0.98, maxH: 900, st: STK, pose: 'shock' });
    cfg.hookBeats.forEach(([at, extra]) => b(at, ZN, extra.focus || F0, Object.assign({ fill: 1.0, maxH: 900, sx: 540, sy: 880, st: STK, dur: 0.45 }, extra)));
    sfx(0, 'deep_boom_2', -3); sfx(0.05, 'camera_shutter_1', -8, 0.4); sfx(0.1, 'paper_slam_2', -7);

    // ---- WHO + what Frank was ----
    { const [x, y] = seg();
      E.push({ id: 'mug', type: 'suspect', at: [x, y + 20], in: O(R.who, '-0.3'), props: Object.assign({}, SUS, NAME, { variant: 'card', file: true, caseNo: 'CASE FILE Nº 028', w: 480, credit: CRED, tilt: -0.03, push: { at: R.who, dur: 5.0, to: 1.3 }, stringTo: [690, 330], stringAt: R.whoString, ring: R.whoRing }) });
      E.push({ id: 'ftx', type: 'text', at: [x + 720, y + 10], in: R.frank, props: { lines: [[['FRANK', 'gold']], [['HELPS STUDENTS', 'paper']], [['FILL OUT THE', 'paper']], [['COLLEGE-AID FORM', 'gold']]], size: 62, per: 0.1 } });
      E.push({ id: 'dc1', type: 'datecard', layer: 'screen', at: [340, 480], in: O(R.who, '-0.1'), out: O(R.who, '+0.7'), props: { kicker: 'CASE FILE Nº 028 · THE PITCH', big: '2016', small: 'SHE LAUNCHES FRANK' } });
      b(R.who, SB, 'mug', { move: 'whip', sx: 540, sy: 960, fill: 0.62, maxH: 700, st: { x: 930, y: 1390, s: 0.85 }, pose: 'shrug' });
      b(R.whoName, ZN, 'mug', { fill: 0.7, maxH: 760, sy: 930, st: 'corner', pose: 'point', dur: 0.5 });
      b(R.frank, SB, ['mug', 'ftx'], { sx: 480, sy: 840, fill: 0.95, maxH: 1000, st: 'corner', pose: 'shock', dur: 0.8 });
      sfx(R.who, 'camera_shutter_2', -8, 0.4); sfx(O(R.who, '+0.2'), 'paper_slam_2', -10); sfx(R.frank, 'typewriter_2', -12, 0.8); }

    // ---- THE PITCH: 4.25M users -> SEC: fewer than 300,000 ----
    { const [x, y] = seg();
      E.push({ id: 'deck', type: 'pitch', at: [x - 60, y], in: O(R.pitch, '-0.4'), props: { t0: R.pitch, from: 3300000, upDur: cfg.deckDur, pulses: [R.claim], crackAt: O(R.real, '-0.1'), labelAt: O(R.real2, '+0.1'), reset: 99999 } });
      E.push({ id: 'spd', type: 'suspect', at: [x + 560, y + 280], in: R.pitch, props: Object.assign({}, SUS, { variant: 'pip', w: 230, aspect: 1.0, label: 'HER PITCH', flash: true, tilt: 0.04, arrow: { at: O(R.pitch, '+0.3'), to: [-300, -160] } }) });
      b(R.pitch, SB, ['deck', 'spd'], { move: 'whip', sx: 540, sy: 820, fill: 0.9, maxH: 800, st: 'corner-left', pose: 'point' });
      b(R.claim, ZN, 'deck.value', { fill: 0.8, maxH: 520, sy: 880, st: 'corner-left', pose: 'shock', dur: 0.5 });
      b(O(R.claim, '+1.0'), GH, ['deck', 'spd'], { fill: 0.9, maxH: 800, sx: 540, sy: 840, st: 'corner', dur: 0.7 });
      b(R.sec, GH, 'deck', { fill: 0.78, maxH: 800, sy: 840, st: 'corner-left', pose: 'talk', dur: 0.7 });
      b(R.real, ZN, 'deck.value', { fill: 0.8, maxH: 520, sy: 880, st: 'corner-left', pose: 'shock', dur: 0.5 });
      b(O(R.real2, '+0.8'), PB, 'deck', { fill: 0.8, maxH: 800, sy: 840, st: 'corner', dur: 0.7 });
      sfx(R.pitch, 'paper_slam_2', -10); sfx(R.claim, 'ding_2', -9, 0.7); sfx(O(R.real, '-0.1'), 'rubber_stamp_2', -5); sfx(R.real, 'deep_boom_2', -8, 0.4); SH.push([R.real, 12]); }

    // ---- 14 guests vs 1 (TikTok / IG) ----
    if (R.partyN) { const [x, y] = seg();
      E.push({ id: 'pty', type: 'party', at: [x, y], in: O(R.party, '-0.4'), props: { nAt: R.partyN, oneAt: R.partyOne } });
      b(R.party, SB, 'pty', { move: 'whip', sx: 540, sy: 920, fill: 0.9, maxH: 840, st: 'corner-left', pose: 'point' });
      b(R.partyN, ZN, 'pty', { fill: 0.96, maxH: 840, sy: 930, st: 'corner-left', pose: 'shock', dur: 0.5 });
      b(R.partyOne, ZN, 'pty', { fill: 0.92, maxH: 860, sy: 930, st: 'corner-left', pose: 'shock', dur: 0.45 });
      b(O(R.partyOne, '+1.1'), PB, 'pty', { fill: 0.9, maxH: 840, sy: 920, st: 'corner', dur: 0.7 });
      sfx(R.party, 'swipe_2', -11, 0.4); sfx(R.partyN, 'pop_2', -10, 0.4); sfx(R.partyOne, 'thud_1', -8, 0.4); }

    // ---- THE CHECK: the bank asks for the customer list ----
    { const [x, y] = seg();
      E.push({ id: 'vb', type: 'victim', at: [x - 300, y], in: O(R.bankAsk, '-0.3'), props: { kind: 'investor', label: 'JPMORGAN', sub: 'THE BANK', labelSize: 44, reactAt: R.listWord, w: 400, h: 500, tape: 'THE BANK' } });
      E.push({ id: 'btx', type: 'text', at: [x + 330, y - 10], in: R.askedWord, props: { lines: [[['ASKED TO SEE', 'paper']], [['THE CUSTOMER', 'gold']], [['LIST', 'gold']]], size: 76, per: 0.12 } });
      b(R.bankAsk, SB, ['vb', 'btx'], { move: 'whip', sx: 540, sy: 860, fill: 0.9, maxH: 860, st: 'left', pose: 'point' });
      b(R.listWord, ZN, ['vb', 'btx'], { fill: 0.9, maxH: 880, sy: 860, st: 'corner', pose: 'point', dur: 0.5 });
      sfx(R.bankAsk, 'swipe_2', -11, 0.4); sfx(R.askedWord, 'click_1', -8, 0.3); sfx(R.listWord, 'pop_1', -9, 0.4); }

    // ---- THE PROBLEM: there was no list ----
    { const [x, y] = seg();
      E.push({ id: 'sh0', type: 'sheet', at: [x, y], in: O(R.nolist0, '-0.4'), props: { fillAt: R.fillAt, fillDur: 1.8, tagAt: R.tagAt, fillTo: 4000000 } });
      E.push({ id: 'nol', type: 'slamstamp', at: [x, y + 20], rot: -0.07, in: R.noWord, props: { text: cfg.noText || 'NO LIST', tone: 'bad', size: 130 } });
      E.push({ id: 'sps2', type: 'suspect', at: [x + 540, y + 300], in: R.nolist0, props: Object.assign({}, SUS, { variant: 'pip', w: 230, aspect: 1.0, label: 'HER PROBLEM', flash: true, tilt: 0.04, arrow: { at: O(R.nolist0, '+0.3'), to: [-290, -150] } }) });
      b(R.nolist0, SB, ['sh0', 'sps2'], { move: 'whip', sx: 540, sy: 840, fill: 0.9, maxH: 940, st: 'corner-left', pose: 'shock' });
      b(R.noWord, ZN, 'sh0', { fill: 0.9, maxH: 900, sy: 880, st: 'corner-left', pose: 'shock', dur: 0.5 });
      sfx(R.nolist0, 'paper_slam_2', -10); sfx(R.noWord, 'rubber_stamp_2', -5); sfx(R.noWord, 'deep_boom_2', -8, 0.4); SH.push([R.noWord, 12]); }

    // ---- THE FAKE: the engineer says no ----
    { const [x, y] = seg();
      E.push({ id: 'eng', type: 'engineer', at: [x - 80, y], in: O(R.eng, '-0.4'), props: { askAt: R.engFake, noAt: R.engNo } });
      E.push({ id: 'stN', type: 'stamp', at: [x + 220, y + 40], rot: 0.1, in: R.engNo, props: { text: 'NO', tone: 'bad', size: 190 } });
      b(R.eng, SB, 'eng', { move: 'whip', sx: 540, sy: 880, fill: 0.62, maxH: 840, st: 'corner-left', pose: 'point' });
      b(R.engFake, ZN, 'eng', { fill: 0.7, maxH: 900, sy: 880, st: 'corner-left', pose: 'point', dur: 0.5 });
      b(R.engNo, ZN, ['eng', 'stN'], { fill: 0.92, maxH: 900, sy: 880, st: 'corner', pose: 'shock', dur: 0.4 });
      b(O(R.engNo, '+1.3'), GH, ['eng', 'stN'], { fill: 0.92, maxH: 900, sy: 880, st: 'corner-left', dur: 0.7 });
      sfx(R.eng, 'paper_slam_2', -10); sfx(R.engFake, 'typewriter_2', -12, 0.8); sfx(R.engNo, 'rubber_stamp_2', -4); sfx(R.engNo, 'deep_boom_2', -7, 0.4); SH.push([R.engNo, 14]); }

    // ---- THE FAKE: the professor generates 4 million fake people (list grows) ----
    { const [x, y] = seg();
      E.push({ id: 'prof', type: 'prof', at: [x - 470, y + 40], in: O(R.prof, '-0.3'), props: { label: 'THE PROFESSOR', sub: 'DATA SCIENCE', labelSize: 38, reactAt: R.profGen, w: 340, h: 440, tape: 'HIRED' } });
      E.push({ id: 'sh1', type: 'sheet', at: [x + 230, y], in: O(R.prof, '-0.2'), props: { fillAt: R.fillGo, fillDur: cfg.fillDur || 2.2, tagAt: R.tagAt2, fillTo: 4000000, w: 720, h: 860 } });
      E.push({ id: 'fk', type: 'slamstamp', at: [x + 230, y + 30], rot: -0.08, in: R.fakeWord, props: { text: 'FAKE', tone: 'bad', size: 150 } });
      pip('pipf', O(R.prof, '-0.1'), O(R.invoice, '-0.3'), 'HER DEAL', [-520, -330]);
      b(R.prof, SB, ['prof', 'sh1'], { move: 'whip', sx: 540, sy: 860, fill: 0.96, maxH: 920, st: 'corner', pose: 'point' });
      b(R.fillGo, ZN, 'sh1', { fill: 0.7, maxH: 900, sx: 620, sy: 880, st: 'corner-left', pose: 'shock', dur: 0.5 });
      b(O(R.fillGo, '+2.0'), GH, ['prof', 'sh1'], { fill: 0.96, maxH: 920, sy: 860, st: 'corner', pose: 'point', dur: 0.7 });
      sfx(R.prof, 'paper_slam_2', -10); sfx(R.profGen, 'pop_1', -9, 0.4); sfx(R.fillGo, 'money_counter_1', -12, 1.8); sfx(R.fakeWord, 'rubber_stamp_2', -5); SH.push([R.fakeWord, 12]); }

    // ---- $18,000 invoice ----
    { const [x, y] = seg();
      E.push({ id: 'inv', type: 'counter', at: [x, y], in: O(R.invoice0, '-0.4'), props: { from: 0, to: 18000, prefix: '$', at: R.invoice, dur: 1.0, size: 190, tone: 'bad', label: 'PAID TO THE PROFESSOR (ABOUT)', sub: "PER THE BANK'S LAWSUIT", w: 900 } });
      b(R.invoice0, SB, 'inv', { move: 'whip', sx: 540, sy: 880, fill: 0.9, maxH: 700, st: 'corner-left', pose: 'point' });
      b(R.invoice, ZN, 'inv.value', { fill: 0.84, maxH: 560, sy: 900, st: 'corner-left', pose: 'shock', dur: 0.5 });
      b(O(R.invoice, '+1.6'), PB, 'inv', { fill: 0.84, maxH: 700, sy: 880, st: 'corner', dur: 0.7 });
      sfx(R.invoice0, 'paper_slam_2', -10); sfx(R.invoice, 'money_counter_2', -11, 1.0); sfx(O(R.invoice, '+1.0'), 'cash_register_1', -9, 0.9); }

    // ---- THE DEAL: JPMorgan pays $175M ----
    { const [x, y] = seg();
      E.push({ id: 'bk', type: 'bank', at: [x, y - 40], in: O(R.deal, '-0.4'), props: { at: R.n175, dur: 1.1, pulses: [O(R.n175, '+1.2')] } });
      E.push({ id: 'vb2', type: 'victim', at: [x - 520, y + 330], in: O(R.deal, '-0.2'), props: { kind: 'investor', label: 'JPMORGAN', sub: 'THE BANK', labelSize: 34, reactAt: R.fellWord || 99999, w: 300, h: 380, tape: 'THE BANK' } });
      E.push({ id: 'sps3', type: 'suspect', at: [x + 570, y + 300], in: R.deal, props: Object.assign({}, SUS, { variant: 'pip', w: 230, aspect: 1.0, label: 'HER SALE', flash: true, tilt: 0.04, arrow: { at: O(R.deal, '+0.3'), to: [-300, -170] } }) });
      b(R.deal, SB, ['bk', 'vb2', 'sps3'], { move: 'whip', sx: 540, sy: 820, fill: 0.98, maxH: 940, st: 'corner', pose: 'point' });
      b(R.n175, ZN, 'bk.amount', { fill: 0.84, maxH: 520, sy: 860, st: 'corner-left', pose: 'shock', dur: 0.5 });
      b(O(R.n175, '+1.8'), PB, ['bk', 'vb2', 'sps3'], { fill: 0.98, maxH: 940, sy: 820, st: 'corner', dur: 0.7 });
      sfx(R.deal, 'paper_slam_2', -10); sfx(R.n175, 'money_counter_2', -10, 1.1); sfx(O(R.n175, '+1.1'), 'cash_register_1', -7, 0.9); SH.push([O(R.n175, '+1.1'), 12]); }

    // ---- $580 per real user (YT / IG) ----
    if (R.per) { const [x, y] = seg();
      E.push({ id: 'pm', type: 'permath', at: [x, y], in: O(R.per, '-0.4'), props: { at: R.n580, dur: 0.9 } });
      b(R.per, SB, 'pm', { move: 'whip', sx: 540, sy: 860, fill: 0.84, maxH: 760, st: 'corner-left', pose: 'point' });
      b(R.n580, ZN, 'pm.hero', { fill: 0.8, maxH: 520, sy: 880, st: 'corner-left', pose: 'shock', dur: 0.5 });
      b(O(R.n580, '+1.4'), PB, 'pm', { fill: 0.84, maxH: 760, sy: 860, st: 'corner', dur: 0.7 });
      sfx(R.per, 'paper_slam_2', -10); sfx(R.n580, 'ding_2', -9, 0.7); }

    // ---- THE COLLAPSE: the list falls apart ----
    { const [x, y] = seg();
      E.push({ id: 'sh2', type: 'sheet', at: [x + 120, y], in: O(R.fell0, '-0.4'), props: { fillAt: O(R.fell0, '-3'), fillDur: 0.1, tagAt: 99999, fillTo: 4000000, w: 720, h: 860 } });
      E.push({ id: 'vb3', type: 'victim', at: [x - 470, y + 40], in: O(R.fell0, '-0.3'), props: { kind: 'investor', label: 'JPMORGAN', sub: 'THE BANK', labelSize: 34, reactAt: R.fellWord, w: 340, h: 440, tape: 'THE BANK' } });
      E.push({ id: 'fa', type: 'slamstamp', at: [x + 120, y + 20], rot: -0.07, in: R.fellWord, props: { text: 'FELL APART', tone: 'bad', size: 120 } });
      b(R.fell0, SB, ['vb3', 'sh2'], { move: 'whip', sx: 540, sy: 860, fill: 0.98, maxH: 940, st: 'corner', pose: 'point' });
      b(R.fellWord, ZN, ['sh2', 'fa'], { fill: 0.78, maxH: 900, sy: 880, st: 'corner', pose: 'shock', dur: 0.4 });
      b(O(R.fellWord, '+1.2'), PB, ['vb3', 'sh2'], { fill: 0.98, maxH: 940, sy: 860, st: 'corner', dur: 0.7 });
      sfx(R.fell0, 'paper_slam_2', -10); sfx(R.fellWord, 'rubber_stamp_2', -5); sfx(R.fellWord, 'deep_boom_1', -5, 1.2); SH.push([R.fellWord, 16]); }

    // ---- EVIDENCE BOARD ----
    { const [x, y] = seg(), bd = R.board;
      E.push({ id: 'board', type: 'board', at: [x, y], in: O(bd, '-0.4'), props: { title: 'EVIDENCE BOARD', caseNo: 'CASE FILE Nº 028', tightAt: R.boardTight, items: [
        { id: 'ph', k: 'photo', src: PHOTO, crop: [0, 0, 1, 1], fx: 0.5, fy: 0.42, x: 0, y: -280, w: 330, h: 400, name: 'CHARLIE JAVICE', nameSize: 26, at: O(bd, '-0.2'), rot: -0.02, push: 0.3 },
        { id: 'n1', k: 'note', x: -300, y: 120, w: 270, h: 290, size: 44, lines: [['4.25M', 'bad'], ['CLAIMED', 'ink', 24]], at: O(bd, '+0.3'), rot: -0.05 },
        { id: 'n2', k: 'note', x: 0, y: 150, w: 270, h: 290, size: 44, lines: [['<300K', 'bad'], ['REAL (SEC)', 'ink', 24]], at: O(bd, '+0.6'), rot: 0.03 },
        { id: 'n3', k: 'note', x: 300, y: 120, w: 270, h: 290, icon: 'cash', size: 40, lines: [['$175M', 'bad']], at: O(bd, '+0.9'), rot: 0.05 },
        { id: 'n4', k: 'note', x: 0, y: 440, w: 640, h: 270, size: 96, lines: [['FAKE LIST', 'bad', 96]], at: O(bd, '+1.2'), rot: -0.02, stamp: { text: 'PER THE BANK', at: O(bd, '+1.5'), y: 82, size: 30, rot: -0.04 } } ],
        strings: [[0, 1, O(bd, '+0.5')], [0, 2, O(bd, '+0.8')], [0, 3, O(bd, '+1.1')], [0, 4, O(bd, '+1.4')], [1, 4, O(R.boardTight, '-0.2')], [2, 4, O(R.boardTight, '-0.1')], [3, 4, R.boardTight]] } });
      b(bd, PK, 'board', { move: 'whip', sy: 800, fill: 0.9, maxH: 860, pose: 'chin' });
      b(O(bd, '+0.9'), GH, 'board', { sy: 800, fill: 0.9, maxH: 860, st: 'corner-left', pose: 'point', dur: 0.7 });
      b(R.boardTight, PB, 'board', { fill: 0.86, maxH: 860, sy: 800, st: 'corner-left', dur: 0.6 });
      sfx(bd, 'paper_slam_2', -10); sfx(O(bd, '+0.3'), 'camera_shutter_1', -9, 0.4); sfx(R.boardTight, 'typewriter_1', -12, 1.0); }

    // ---- VERDICT ----
    { const [x, y] = seg();
      E.push({ id: 'sv', type: 'suspect', at: [x - 400, y + 20], in: R.jury0, props: Object.assign({}, SUS, NAME, { w: 440, flash: true, tilt: -0.02, credit: CRED, mono: true, stamps: [{ text: 'GUILTY', at: R.convicted, size: 74, x: 0, y: -30, rot: -0.1 }], bars: R.sentenced }) });
      E.push({ id: 'vd', type: 'verdict', at: [x + 400, y], in: O(R.jury0, '+0.0'), props: { guiltyAt: R.convicted, monthsAt: R.m85, restiAt: R.resti, restiDur: 1.6 } });
      b(R.jury0, SB, ['sv', 'vd'], { move: 'whip', sx: 540, sy: 880, fill: 0.98, maxH: 940, st: 'corner', pose: 'shock' });
      b(R.convicted, ZN, 'vd', { fill: 0.84, maxH: 900, sy: 900, st: 'corner-left', pose: 'shock', dur: 0.45 });
      b(R.sentenced, GH, ['sv', 'vd'], { sx: 540, sy: 880, fill: 0.98, maxH: 940, st: 'corner', pose: 'talk', dur: 0.7 });
      b(R.m85, ZN, 'vd', { fill: 0.86, maxH: 900, sy: 900, st: 'off', pose: 'shock', dur: 0.4 });
      b(R.resti, ZN, 'vd', { fill: 0.86, maxH: 900, sy: 900, st: 'off', pose: 'shock', dur: 0.5, move: R.extra ? 'whip' : undefined });
      b(O(R.resti, '+1.8'), GH, ['sv', 'vd'], { sx: 540, sy: 880, fill: 0.98, maxH: 940, st: 'corner', pose: 'idle', dur: 0.8 });
      sfx(R.jury0, 'camera_shutter_1', -8, 0.4); sfx(R.convicted, 'gavel_1', -4, 0.8); sfx(R.convicted, 'rubber_stamp_2', -6); sfx(R.sentenced, 'cell_door_1', -7, 1.0);
      sfx(R.m85, 'cinematic_hit_1', -3, 1.2); sfx(R.m85, 'deep_boom_1', -4, 1.4); sfx(R.resti, 'money_counter_2', -10, 1.6); sfx(O(R.resti, '+1.6'), 'cash_register_1', -8, 0.9);
      SH.push([R.convicted, 16], [R.m85, 20], [O(R.resti, '+1.6'), 14]); }

    // ---- extra line (coworker 68 months / prosecutors asked 12 years) ----
    if (R.extra) { const [x, y] = seg();
      E.push({ id: 'ex', type: 'text', at: [x, y], in: O(R.extra, '-0.3'), props: { lines: cfg.extraLines, size: cfg.extraSize || 82, per: 0.12 } });
      b(R.extra, SB, 'ex', { move: 'whip', sx: 540, sy: 840, fill: 0.9, maxH: 700, st: 'corner-left', pose: 'shock' });
      sfx(R.extra, 'rubber_stamp_2', -8); }

    // ---- CTAs + end ----
    cfg.cta.forEach(c => {
      if (c.k === 'heart') { E.push({ id: 'heart', type: 'heart', layer: 'screen', at: [800, 930], in: O(c.at, '-0.05'), out: O(c.at, '+1.15'), props: { s: 1 } }); sfx(c.at, 'heartbeat_1', -8, 0.9); }
      if (c.k === 'send') { E.push({ id: 'plane', type: 'plane', layer: 'screen', at: [540, 960], in: O(c.at, '-0.05'), out: O(c.at, '+1.2'), props: { dur: 0.9, from: [-230, 250], to: [280, -330], s: 1.5 } }, { id: 'sendtx', type: 'text', layer: 'screen', at: [820, 440], in: O(c.at, '+0.15'), out: O(c.at, '+1.2'), props: { lines: [[['SEND', 'gold']]], size: 70 } }); sfx(c.at, 'swoosh_2', -9, 1.0); }
      if (c.k === 'follow') { E.push({ id: 'mag', type: 'mag', layer: 'screen', at: [830, 1010], in: O(c.at, '-0.05'), out: O(c.at, '+1.45'), props: { press: 0.5 } }, { id: 'btn', type: 'follow', layer: 'screen', at: [830, 1010], scale: 0.8, in: O(c.at, '-0.05'), out: O(c.at, '+1.45'), props: { press: 0.5 } }); PO.push([O(c.at, '-0.1'), 'follow', { target: [830, 1010] }], [O(c.at, '+1.5'), 'talk']); sfx(O(c.at, '+0.5'), 'click_1', -8, 0.3); sfx(O(c.at, '+0.58'), 'success_chime_1', -12, 1.0); }
    });
    E.push({ id: 'ask', type: 'bubble', layer: 'screen', at: [600, 1090], in: R.ask, out: R.askEnd, props: { l1: cfg.ask[0], l2: cfg.ask[1], size: 52, tail: 'left' } });
    b(R.loop, SB, ['hook2', 'sus0', 'vs0'], { move: 'whip', sx: 540, sy: 880, fill: 0.98, maxH: 900, st: STK, pose: 'shock' });
    b(R.ask, PF, ['hook2', 'sus0'], { sy: 880, pose: 'talk' });
    sfx(R.loop, 'rewind_2', -11, 0.9); sfx(R.ask, 'pop_1', -9, 0.5);

    (cfg.extra || []).forEach(([at, beat, focus, o]) => b(at, beat, focus === 'F0' ? F0 : focus, Object.assign({ fill: 0.9, maxH: 860, sy: 860, st: 'corner-left', pose: 'talk', dur: 0.8 }, o || {})));

    // ---- HUD ----
    const lab = [{ at: -1, text: 'THE PITCH' }, { at: O(R.bankAsk, '-0.2'), text: 'THE CHECK' }, { at: O(R.eng, '-0.2'), text: 'THE FAKE' }, { at: O(R.deal, '-0.2'), text: 'THE DEAL' }, { at: O(R.fell0, '-0.2'), text: 'THE COLLAPSE' }, { at: O(R.board, '+0.2'), text: 'THE EVIDENCE' }, { at: O(R.jury0, '-0.2'), text: 'THE SENTENCE' }];
    const itm = [{ at: 0, label: 'CUSTOMERS SOLD (CLAIMED)', to: 4000000, dur: 1.2 }, { at: R.claim, label: 'USERS SHE CLAIMED', to: 4250000, dur: 0.8 }, { at: R.real, label: 'REAL USERS (SEC: UNDER)', to: 300000, dur: 0.9 }, { at: R.engNo, label: 'ENGINEERS WHO SAID YES', to: 0, dur: 0.4 }, { at: R.fillGo, label: 'FAKE CUSTOMERS MADE', from: 0, to: 4000000, dur: cfg.fillDur || 2.2 }, { at: R.invoice, label: 'PAID FOR THE LIST (ABOUT)', to: 18000, prefix: '$', dur: 1.0 }, { at: R.n175, label: 'JPMORGAN PAID', to: 175000000, prefix: '$', dur: 1.1 }]
      .concat(R.per ? [{ at: R.n580, label: 'PER REAL USER (OUR MATH)', to: 580, prefix: '$', dur: 0.9 }] : [])
      .concat([{ at: R.m85, label: 'MONTHS IN PRISON', to: 85, dur: 0.7 }, { at: R.resti, label: 'ORDERED TO PAY BACK', to: 287500000, prefix: '$', dur: 1.6 }, { at: R.loop, label: 'USERS SHE CLAIMED', to: 4250000, dur: 0.6 }]);
    E.push({ id: 'hud', type: 'hud', layer: 'screen', at: [0, 0], in: -1, props: { labels: lab, items: itm } });

    BM2.scene({
      series: 'decoded', title: 'CASE FILE Nº 028 · JAVICE', duration: cfg.duration,
      footnote: ['CONVICTED MARCH 2025 · SENTENCED SEPT 2025 · SOURCES: DOJ SDNY, SEC', 'OUR MATH: $175M ÷ ~300K REAL USERS ≈ $580 · FIGURES + LIST ARE ILLUSTRATIONS', 'FOUNDER, PROFESSOR, BANK CARDS = ILLUSTRATION (NO LICENSED PHOTO OF HER)'],
      elements: E, beats: T, poses: PO, shakes: SH, captions: cfg.captions,
      bed: { name: 'tense_bed_2', gain: -1 }, sfx: S,
    });
  };
})();
JAVICE({
  duration: 85.10, deckDur: 5.2, fillDur: 2.0,
  hook: { lines: [[['4,000,000', 'bad']], [['CUSTOMERS', 'paper']], [["WHO DIDN'T EXIST", 'gold']]], size: 96, side: { kind: 'investor', label: 'JPMORGAN', sub: 'THE BANK', tape: 'THE BANK' } },
  hookBeats: [['@four', {}], ['@exist', { fill: 1.1 }]],
  extra: [['@website', 'graphic-hero', 'mug', { fill: 0.62, maxH: 740, sy: 950 }], ['@giant', 'peek', ['mug', 'ftx'], { sx: 480, sy: 840, fill: 0.95, maxH: 1000 }], ['@banks', 'peek', ['deck', 'spd'], { sy: 840, fill: 0.9, maxH: 800 }], ['@buy', 'graphic-hero', 'deck', { fill: 0.78, maxH: 800, sy: 840, pose: 'chin' }], ['@smart', 'peek', ['vb', 'btx'], { sy: 860 }], ['@tried', 'peek', ['vb3', 'sh2'], { sy: 860, fill: 0.98, maxH: 940 }], ['@years', 'graphic-hero', ['sv', 'vd'], { sx: 540, sy: 880, fill: 0.98, maxH: 940, st: 'corner' }]],
  R: {
    hookEnd: '@charlie', hookRing: '@exist', hookReact: "@didn't", loopIn: '@four#6',
    who: '@charlie', whoName: '@javis', whoString: '@started', whoRing: '@frank', frank: '@it',
    pitch: '@by', claim: '@quarter', sec: '@sec', real: '@300', real2: '@000',
    bankAsk: '@so', askedWord: '@asked', listWord: '@list',
    nolist0: "@here's", noWord: '@no', fillAt: 99999, tagAt: 99999,
    eng: '@the#8', engFake: '@fake', engNo: '@no#2',
    prof: '@so#2', profGen: '@professor', fillGo: '@generated', fakeWord: '@fake#2', tagAt2: 99999,
    invoice0: '@according', invoice: '@$18',
    deal: '@the#11', n175: '@$175',
    per: "@that's", n580: '@$580',
    fell0: '@later', fellWord: '@fell',
    board: '@follow+0.2', boardTight: '@in#2',
    jury0: '@a#6', convicted: '@convicted', sentenced: '@sentenced', m85: '@85', resti: '@$287',
    loop: '@four#6', ask: '@which', askEnd: '@checked+0.5',
  },
  cta: [{ k: 'heart', at: '@hit' }, { k: 'send', at: '@send' }, { k: 'follow', at: '@follow' }],
  ask: ['4M OR 300K?', 'WHICH WOULD YOU CHECK'],
  captions: { emph: { '$175': 'bad', '$580': 'bad', '$18': 'bad', '85': 'bad', '$287': 'bad', million: 'bad', fake: 'bad', '300': 'bad', convicted: 'bad', no: 'bad' }, gap: 16 },
});
