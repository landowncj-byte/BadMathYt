// ===== Tucker payday — shared custom recipes (registered via BM2.register; prepended to each cut's scene.js) =====
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, countAt, hash, hit } = B;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const approx = (g, cx, cy, w, col, lw) => { g.save(); g.strokeStyle = col; g.lineWidth = lw; g.lineCap = 'round'; for (const dy of [-lw * 1.1, lw * 1.1]) { g.beginPath(); for (let i = 0; i <= 20; i++) { const u = i / 20, x = cx - w / 2 + u * w, y = cy + dy + Math.sin(u * Math.PI * 2) * lw * 0.9; i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); } g.restore(); };
  const rise = (t, at, d = 18) => { const o = t - at; return { a: clamp(o / 0.12), y: (1 - spring(Math.max(0, o), 'snappy')) * d, on: o > 0 }; };

  // ---------- loanbox: GENERIC loan disclosure. TOTAL OF PAYMENTS $650 rolls like an odometer to $1,925 (red); can reset ----------
  B.register('loanbox', {
    defaults: { w: 780, h: 780, from: 650, to: 1925, at: 99999, dur: 1.25, reset: 99999, rdur: 0.9, amountAt: 99999, totalAt: 99999, sub2: 'PER DOJ · ONE BORROWER' },
    size: p => [p.w, p.h],
    anchors: p => ({ head: [0, -p.h / 2 + 65, p.w, 130], amount: [0, -p.h / 2 + 250, p.w * 0.92, 96], total: [0, 150, p.w * 0.94, 290] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift });
      g.save(); rr(g, x0, y0, w, h, 26); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 130); g.restore();
      txt(g, 'LOAN DISCLOSURE', x0 + 40, y0 + 66, F.hero(72), theme.paper, 'left'); txt(g, 'ILLUSTRATION', x0 + w - 36, y0 + 36, F.mono(18), 'rgba(245,243,238,.7)', 'right');
      txt(g, 'GENERIC RECREATION · NOT A REAL FORM', x0 + 40, y0 + 164, F.mono(21), theme.inkSoft, 'left');
      // amount row
      { const on = t - p.amountAt, k = on > 0 ? spring(on, 'snappy') : 0, y = y0 + 250, s = 1 + 0.12 * k - (on > 0 ? 0.08 * clamp(on - 0.2) : 0) + (env.hot === 'amount' ? 0.04 * env.hotK : 0), vf = F.monoX(70), vw = mw('$500', vf);
        txt(g, 'AMOUNT BORROWED', x0 + 40, y, F.mono(30), theme.inkSoft, 'left'); g.save(); g.translate(x0 + w - 40, y); g.scale(s, s); if (on > 0) marker(g, -vw - 12, -42, vw + 24, 86, theme.accentInk, clamp(on / 0.3), 0.2); txt(g, '$500', 0, 4, vf, theme.ink, 'right'); g.restore(); burst(g, x0 + w - 40 - vw / 2, y, vw * 0.7, theme.accent, on - 0.05, 12, 0.45); }
      g.strokeStyle = theme.rule; g.lineWidth = 3; g.setLineDash([10, 9]); g.beginPath(); g.moveTo(x0 + 40, y0 + 320); g.lineTo(x0 + w - 40, y0 + 320); g.stroke(); g.setLineDash([]);
      txt(g, 'TOTAL OF PAYMENTS', 0, y0 + 360, F.cap(38), theme.inkSoft);
      // the odometer
      const rolling = t >= p.at && t < p.at + p.dur, rt = t - p.at, st = t - p.reset;
      let v = p.from, red = false, land = -1;
      if (t >= p.at) { v = countAt(rt, p.dur, p.from, p.to); red = true; land = rt - p.dur; }
      if (t >= p.reset) { const u = lin(st, 0, p.rdur), e = ease.inOut(u); v = lerp(p.to, p.from, e); red = u < 0.5; land = -1; }
      const spd = t >= p.reset && st < p.rdur ? (p.to - p.from) / p.rdur * 0.8 : rolling ? Math.abs(countAt(rt + 0.02, p.dur, p.from, p.to) - v) / 0.02 : 0;
      const hotPulse = (t >= p.totalAt ? 0.12 * hit(t - p.totalAt, 6) : 0) + (env.hot === 'total' ? 0.03 * env.hotK : 0), sc = 1 + (land > 0 && t < p.reset ? 0.14 * hit(land, 6) : 0) + hotPulse;
      const o = { font: F.hero(228), size: 228, color: red ? theme.badInk : theme.ink, prefix: '$', speed: spd }, rwid = B.rollWidth(g, p.to, o).w;
      g.save(); g.translate(0, y0 + 542); g.scale(sc, sc); roll(g, v, 0, 0, o);
      if (red && land > 0 && t < p.reset) marker(g, -rwid / 2, 130, rwid, 10, theme.badInk, clamp(land / 0.3), 0.9);
      if (t >= p.totalAt && !(t >= p.at && t < p.reset)) marker(g, -rwid / 2 + 70, 128, rwid - 140, 9, theme.accentInk, clamp((t - p.totalAt) / 0.3), 0.6);
      g.restore(); if (t < p.reset) burst(g, 0, y0 + 542, 340, theme.bad, land, 20, 0.55);
      // caption under the number
      const showBig = t >= p.at + 0.2 && t < p.reset + 0.3, a = showBig ? clamp((t - p.at - 0.2) / 0.2) : 1;
      g.save(); if (showBig) { g.globalAlpha = a; txt(g, p.sub2, 0, y0 + h - 64, F.cap(32), theme.badInk); } else { txt(g, 'AS DISCLOSED TO THE BORROWER', 0, y0 + h - 62, F.cap(30), theme.inkSoft); } g.restore();
      if (t >= p.at + 0.1 && t < p.reset + 0.3) { const k = spring(t - p.at - 0.1, 'snappy'); g.save(); g.globalAlpha = clamp((t - p.at) / 0.15); g.translate(x0 + w - 40, y0 + h - 24 + (1 - k) * -10); txt(g, 'FORM SAID $650', 0, 0, F.mono(22), theme.inkSoft, 'right'); const wd = mw('FORM SAID $650', F.mono(22)); g.strokeStyle = theme.inkSoft; g.lineWidth = 3; g.beginPath(); g.moveTo(-wd, 0); g.lineTo(0, 0); g.stroke(); g.restore(); }
    },
  });

  // ---------- silhouette: Tucker name card, no photo ----------
  B.register('silh', {
    defaults: { w: 560, h: 620, name: 'SCOTT TUCKER', sub: 'ONLINE PAYDAY LENDER' }, size: p => [p.w, p.h],
    draw(g, p, env) {
      const { theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 24, { lift });
      g.save(); rr(g, x0, y0, w, h, 24); g.clip(); const bg = g.createLinearGradient(0, y0, 0, y0 + h); bg.addColorStop(0, '#E7E2D6'); bg.addColorStop(1, '#D8D3C7'); g.fillStyle = bg; g.fillRect(x0, y0, w, h);
      const sg = g.createLinearGradient(0, y0 + 300, 0, y0 + 480); sg.addColorStop(0, '#6a7282'); sg.addColorStop(1, '#3a4350'); g.fillStyle = sg; rr(g, -190, y0 + 330, 380, 300, 130); g.fill(); g.fillStyle = '#59606B'; g.fillRect(-28, y0 + 255, 56, 90); const hg = g.createLinearGradient(-70, y0 + 100, 70, y0 + 270); hg.addColorStop(0, '#7c8596'); hg.addColorStop(1, '#4a5260'); g.fillStyle = hg; g.beginPath(); g.ellipse(0, y0 + 195, 86, 104, 0, 0, 7); g.fill();
      g.fillStyle = theme.navy; g.fillRect(x0, y0 + h - 120, w, 120); g.restore();
      txt(g, 'ILLUSTRATION', x0 + 26, y0 + 34, F.mono(18), theme.inkSoft, 'left'); txt(g, p.name, 0, y0 + h - 72, F.hero(56), theme.paper); txt(g, p.sub, 0, y0 + h - 28, F.mono(22), 'rgba(245,243,238,.8)');
    },
  });

  // ---------- paycal: paycheck calendar. Each payday takes $150; the $500 OWED tile never changes ----------
  B.register('paycal', {
    defaults: { w: 800, h: 940, paydays: [], fee: 150, owedAt: [], neverAt: 99999, bigAt: 99999, bigTo: 1425, bigDur: 1.1, bigSub: 'PER DOJ · ONE BORROWER' },
    size: p => [p.w, p.h],
    anchors(p) { const x0 = -p.w / 2, y0 = -p.h / 2, a = { owed: [x0 + 40 + 170, y0 + 680 + 105, 340, 210], fees: [x0 + 420 + 170, y0 + 680 + 105, 340, 210] }; for (let i = 0; i < 6; i++) a['p' + i] = [x0 + 40 + (i % 3) * 250 + 110, y0 + 160 + Math.floor(i / 3) * 250 + 113, 220, 226]; return a; },
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift });
      g.save(); rr(g, x0, y0, w, h, 26); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 124); g.restore();
      txt(g, 'PAYCHECK CALENDAR', x0 + 40, y0 + 62, F.hero(66), theme.paper, 'left'); txt(g, 'ILLUSTRATION', x0 + w - 34, y0 + 32, F.mono(18), 'rgba(245,243,238,.7)', 'right');
      for (let i = 0; i < 6; i++) {
        const tx = x0 + 40 + (i % 3) * 250, ty = y0 + 160 + Math.floor(i / 3) * 250, pt = p.paydays[i] ?? 99999, on = t - pt, k = on > 0 ? spring(on, 'snappy') : 0;
        g.save(); g.fillStyle = theme.paperShade; rr(g, tx, ty, 220, 226, 18); g.fill(); g.strokeStyle = theme.rule; g.lineWidth = 2; rr(g, tx, ty, 220, 226, 18); g.stroke(); g.restore();
        txt(g, 'PAYDAY ' + (i + 1), tx + 110, ty + 34, F.mono(24), theme.inkSoft);
        g.save(); g.strokeStyle = theme.rule; g.lineWidth = 3; g.setLineDash([8, 8]); rr(g, tx + 18, ty + 78, 184, 118, 14); g.stroke(); g.restore();
        if (on > 0) { g.save(); g.globalAlpha = clamp(on / 0.1); g.translate(0, (1 - k) * -150); clay(g, tx + 18, ty + 78, 184, 118, 14, theme.bad, { shadowK: 0.5 }); txt(g, '-$' + p.fee, tx + 110, ty + 140, F.hero(70), theme.paper); g.restore(); burst(g, tx + 110, ty + 137, 80, theme.bad, on - 0.1, 12, 0.4); }
      }
      // owed tile: never changes
      { const tx = x0 + 40, ty = y0 + 680; let s = 1; for (const ot of p.owedAt) if (t >= ot) s += 0.06 * hit(t - ot, 7); s += env.hot === 'owed' ? 0.03 * env.hotK : 0;
        g.save(); g.translate(tx + 170, ty + 105); g.scale(s, s); clay(g, -170, -105, 340, 210, 20, theme.navy, { shadowK: 0.6 }); txt(g, 'STILL OWED', 0, -62, F.cap(28), 'rgba(245,243,238,.8)'); txt(g, '$500', 0, 18, F.hero(120), theme.paper); g.restore();
        const nt = t - p.neverAt; if (nt > 0) { const k = clamp(1.9 * (1 - ease.expo(nt / 0.22)) + 1), al = clamp(nt / 0.06); g.save(); g.globalAlpha = al; g.translate(tx + 170, ty + 205); g.rotate(-0.07); g.scale(k, k); paper(g, -150, -30, 300, 60, 12, { fill: theme.paper }); g.strokeStyle = theme.badInk; g.lineWidth = 4; rr(g, -144, -24, 288, 48, 8); g.stroke(); txt(g, 'NEVER MOVED', 0, 3, F.hero(38), theme.badInk); g.restore(); burst(g, tx + 170, ty + 205, 180, theme.bad, nt - 0.1, 14, 0.45); } }
      // fees tile: running total
      { const tx = x0 + 420, ty = y0 + 680; let v = 0; for (const pt of p.paydays) v += p.fee * ease.out(lin(t, pt, pt + 0.4)); const base = p.fee * p.paydays.length; let land = -1, spd = 0;
        if (t >= p.bigAt) { const bt = t - p.bigAt; v = countAt(bt, p.bigDur, base, p.bigTo); land = bt - p.bigDur; spd = bt < p.bigDur ? Math.abs(countAt(bt + 0.02, p.bigDur, base, p.bigTo) - v) / 0.02 : 0; }
        const s = 1 + (land > 0 ? 0.14 * hit(land, 6) : 0) + (env.hot === 'fees' ? 0.03 * env.hotK : 0);
        g.save(); g.translate(tx + 170, ty + 105); g.scale(s, s); clay(g, -170, -105, 340, 210, 20, theme.bad, { shadowK: 0.6 }); txt(g, 'FEES PAID', 0, -62, F.cap(28), 'rgba(245,243,238,.9)'); roll(g, v, 0, 14, { font: F.hero(104), size: 104, color: theme.paper, prefix: '$', speed: spd }); if (land > -0.3) { g.globalAlpha = clamp((land + 0.3) / 0.2); txt(g, p.bigSub, 0, 78, F.mono(19), 'rgba(245,243,238,.92)'); } g.restore(); }
    },
  });

  // ---------- rate: ≈700% A YEAR (DOJ's words) ----------
  B.register('rate', {
    defaults: { w: 760, h: 520, at: 99999, dur: 1.0, to: 700 }, size: p => [p.w, p.h], anchors: p => ({ hero: [0, -20, p.w * 0.92, 250] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift });
      g.save(); g.translate(x0 + 40, y0 + 58); clay(g, 0, -28, 280, 56, 14, theme.bad, { shadowK: 0.4 }); txt(g, "DOJ'S WORDS", 140, 2, F.cap(30), theme.paper); g.restore();
      const lt = t - p.at; if (lt > 0) { const v = countAt(lt, p.dur, 0, p.to), land = lt - p.dur, spd = lt < p.dur ? Math.abs(countAt(lt + 0.02, p.dur, 0, p.to) - v) / 0.02 : 0, o = { font: F.hero(210), size: 210, color: theme.badInk, suffix: '%', speed: spd }, aw = 130, rw = B.rollWidth(g, p.to, o).w, tot = aw + 26 + rw, s = 1 + (land > 0 ? 0.14 * hit(land, 6) : 0) + (env.hot === 'hero' ? 0.03 * env.hotK : 0);
        g.save(); g.translate(0, -20); g.scale(s, s); approx(g, -tot / 2 + aw / 2, -6, aw, theme.badInk, 14); roll(g, v, -tot / 2 + aw + 26, 0, { ...o, align: 'left' }); if (land > 0) marker(g, -tot / 2, 120, tot, 9, theme.badInk, clamp(land / 0.3), 0.9); g.restore(); burst(g, 0, -20, 300, theme.bad, land, 18, 0.55);
        if (land > -0.1) { const on = land + 0.1; g.save(); g.globalAlpha = clamp(on / 0.1); g.translate(0, y0 + h - 100 + (1 - spring(on, 'snappy')) * 26); txt(g, 'A YEAR', 0, 0, F.hero(96), theme.ink); g.restore(); } }
    },
  });

  // ---------- scale: 4,500,000 borrowers / $3,500,000,000 counters ----------
  B.register('scale', {
    defaults: { w: 880, h: 800, bAt: 99999, bDur: 0.9, rAt: 99999, rDur: 1.0, single: false }, size: p => [p.w, p.single ? 600 : p.h],
    anchors: p => ({ borrowers: [0, -(p.single ? 300 : p.h / 2) + (p.single ? 345 : 285), p.w * 0.94, 300], revenue: [0, -p.h / 2 + 590, p.w * 0.94, 260] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.single ? 600 : p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift });
      g.save(); rr(g, x0, y0, w, h, 26); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 124); g.restore(); txt(g, 'THE SCALE', x0 + 40, y0 + 62, F.hero(66), theme.paper, 'left'); txt(g, 'PER DOJ', x0 + w - 34, y0 + 36, F.mono(20), 'rgba(245,243,238,.75)', 'right');
      const sect = (yc, label, at, dur, to, size, prefix, sub, hotId) => {
        txt(g, label, 0, yc - size * 0.78, F.cap(32), theme.inkSoft); const lt = t - at, o0 = { font: F.hero(size), size, color: theme.badInk, prefix };
        const v = lt < 0 ? 0 : countAt(lt, dur, 0, to), land = lt - dur, spd = lt > 0 && lt < dur ? Math.abs(countAt(lt + 0.02, dur, 0, to) - v) / 0.02 : 0, s = 1 + (land > 0 ? 0.12 * hit(land, 6) : 0) + (env.hot === hotId ? 0.03 * env.hotK : 0), rw = B.rollWidth(g, to, o0).w;
        g.save(); g.translate(0, yc); g.scale(s, s); if (lt < 0) { g.fillStyle = theme.rule; rr(g, -rw / 2, -size * 0.3, rw, size * 0.6, size * 0.3); g.fill(); } else { roll(g, v, 0, 0, { ...o0, speed: spd }); if (land > 0) marker(g, -rw / 2, size * 0.58, rw, 8, theme.badInk, clamp(land / 0.3), 0.9); } g.restore(); if (lt > 0) burst(g, 0, yc, rw * 0.55, theme.bad, land, 18, 0.5);
        txt(g, sub, 0, yc + size * 0.95, F.cap(34), theme.ink);
      };
      sect(y0 + (p.single ? 345 : 300), 'AT LEAST', p.bAt, p.bDur, 4500000, 150, '', 'BORROWERS', 'borrowers'); if (p.single) return;
      g.strokeStyle = theme.rule; g.lineWidth = 3; g.setLineDash([10, 9]); g.beginPath(); g.moveTo(x0 + 40, y0 + 482); g.lineTo(x0 + w - 40, y0 + 482); g.stroke(); g.setLineDash([]);
      sect(y0 + 625, 'OVER', p.rAt, p.rDur, 3500000000, 112, '$', 'IN REVENUE · 2008–2013', 'revenue');
    },
  });

  // ---------- car: generic race car (no livery) + "A PRO RACING TEAM · HIS OWN" ----------
  B.register('car', {
    defaults: { w: 900, h: 560, driveAt: 99999, ownAt: 99999 }, size: p => [p.w, p.h], anchors: p => ({ car: [0, 60, p.w * 0.9, 300], head: [0, -p.h / 2 + 100, p.w * 0.9, 190] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift });
      txt(g, 'A PRO RACING TEAM', 0, y0 + 78, F.hero(76), theme.ink); { const r = rise(t, p.ownAt, 20); if (r.on) { g.save(); g.globalAlpha = r.a; g.translate(0, r.y); txt(g, 'HIS OWN', 0, y0 + 160, F.hero(76), theme.badInk); g.restore(); } }
      txt(g, 'ILLUSTRATION', x0 + w - 28, y0 + h - 26, F.mono(18), '#9aa0a8', 'right');
      // track
      const ty = y0 + 262; g.save(); rr(g, x0 + 24, ty, w - 48, 232, 18); g.clip(); const tg = g.createLinearGradient(0, ty, 0, ty + 232); tg.addColorStop(0, '#39404b'); tg.addColorStop(1, '#232830'); g.fillStyle = tg; g.fillRect(x0, ty, w, 232);
      const u = ease.out(lin(t - p.driveAt, 0, 0.95)), off = u * 700; g.fillStyle = 'rgba(245,243,238,.8)'; for (let i = -2; i < 8; i++) g.fillRect(x0 + ((i * 190 + off) % 1520) - 100, ty + 170, 100, 10);
      g.fillStyle = theme.bad; g.fillRect(x0, ty + 8, w, 12); g.fillStyle = '#F5F3EE'; for (let i = 0; i < 24; i++) if (i % 2) g.fillRect(x0 + i * 40 - (off % 80), ty + 8, 40, 12);
      const cx = lerp(-w * 0.75, -10, u), vib = u >= 1 ? Math.sin(t * 70) * 0.9 : 0, cy = ty + 112 + vib; const rot = -cx / 40;
      if (u < 0.98) { g.strokeStyle = 'rgba(245,243,238,.45)'; g.lineWidth = 5; g.lineCap = 'round'; for (let i = 0; i < 5; i++) { const yy = cy - 40 + i * 24, ln = 120 * (1 - u); g.beginPath(); g.moveTo(cx - 260 - ln, yy); g.lineTo(cx - 240, yy); g.stroke(); } }
      g.translate(cx, cy); g.scale(1.1, 1.1); g.fillStyle = 'rgba(0,0,0,.35)'; g.beginPath(); g.ellipse(0, 78, 250, 18, 0, 0, 7); g.fill();
      // body
      const bp = () => { g.beginPath(); g.moveTo(-225, 44); g.lineTo(-225, 0); g.quadraticCurveTo(-210, -22, -160, -26); g.lineTo(-72, -30); g.lineTo(-28, -82); g.quadraticCurveTo(14, -94, 44, -62); g.lineTo(76, -28); g.lineTo(196, -14); g.quadraticCurveTo(236, 0, 236, 44); g.closePath(); };
      bp(); g.fillStyle = theme.bad; g.fill(); g.save(); bp(); g.clip(); const lg = g.createLinearGradient(0, -90, 0, 50); lg.addColorStop(0, 'rgba(255,255,255,.32)'); lg.addColorStop(0.4, 'rgba(255,255,255,0)'); lg.addColorStop(1, 'rgba(0,0,0,.28)'); g.fillStyle = lg; g.fillRect(-240, -100, 490, 160); g.restore();
      g.fillStyle = '#1B2430'; g.beginPath(); g.moveTo(-20, -72); g.lineTo(28, -72); g.lineTo(58, -34); g.lineTo(-42, -34); g.closePath(); g.fill(); g.fillStyle = 'rgba(255,255,255,.18)'; g.beginPath(); g.moveTo(-14, -70); g.lineTo(2, -70); g.lineTo(-18, -36); g.lineTo(-38, -36); g.closePath(); g.fill();
      g.fillStyle = '#1B2430'; g.fillRect(-232, -62, 62, 12); g.fillRect(-212, -52, 8, 34); g.fillRect(-190, -52, 8, 34); g.fillStyle = theme.paper; g.fillRect(-60, 20, 190, 8);
      for (const wx of [-142, 138]) { g.save(); g.translate(wx, 44); g.fillStyle = '#12161c'; g.beginPath(); g.arc(0, 0, 40, 0, 7); g.fill(); g.rotate(rot); g.fillStyle = '#c9ccd2'; g.beginPath(); g.arc(0, 0, 22, 0, 7); g.fill(); g.strokeStyle = '#59606B'; g.lineWidth = 4; for (let i = 0; i < 5; i++) { g.rotate(Math.PI * 2 / 5); g.beginPath(); g.moveTo(0, 0); g.lineTo(20, 0); g.stroke(); } g.restore(); }
      g.restore();
    },
  });

  // ---------- verdict: courtroom card (gavel + GUILTY + 14 OF 14 COUNTS + 200 MONTHS) ----------
  B.register('verdict', {
    defaults: { w: 780, guiltyAt: 99999, countsAt: 99999, monthsAt: 99999, subAt: 99999 },
    size: p => [p.w, 700],
    anchors(p) { const y0 = -350; return { head: [0, y0 + 70, p.w, 140], guilty: [0, y0 + 240, p.w * 0.92, 230], counts: [0, y0 + 345, p.w * 0.92, 70], months: [0, y0 + 525, p.w * 0.92, 200] }; },
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = 700, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift });
      g.save(); rr(g, x0, y0, w, h, 26); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 140); g.restore();
      txt(g, 'THE VERDICT', x0 + 40, y0 + 70, F.hero(70), theme.paper, 'left');
      const ga = p.guiltyAt, ang = t < ga - 0.3 ? -0.95 : t < ga ? lerp(-0.95, 0.1, ease.in(lin(t, ga - 0.3, ga))) : 0.1 - 0.35 * hit(t - ga, 9) * Math.max(0, Math.sin((t - ga) * 18));
      g.save(); g.translate(x0 + w - 120, y0 + 98); clay(g, -62, 6, 124, 22, 8, theme.manila, { shadowK: 0.3 }); g.translate(0, -2); g.rotate(ang); clay(g, -9, -118, 18, 124, 8, theme.manila, { shadowK: 0.3 }); clay(g, -50, -150, 100, 58, 12, '#B9955A', { shadowK: 0.3 }); g.restore();
      const dash = y => { g.strokeStyle = theme.rule; g.lineWidth = 3; g.setLineDash([10, 9]); g.beginPath(); g.moveTo(x0 + 40, y); g.lineTo(x0 + w - 40, y); g.stroke(); g.setLineDash([]); };
      { const gt = t - ga; if (gt > 0) { const sc = 1 + 1.3 * (1 - ease.expo(gt / 0.2)), a = clamp(gt / 0.08), yy = y0 + 240, hot = env.hot === 'guilty' ? 0.03 * env.hotK : 0; g.save(); g.globalAlpha = a; g.translate(0, yy); g.rotate(-0.04); g.scale(sc + hot, sc + hot); marker(g, -250, -86, 500, 150, theme.badInk, clamp((gt - 0.1) / 0.3), 0.16); txt(g, 'GUILTY', 0, 0, F.hero(160), theme.badInk); g.restore(); burst(g, 0, y0 + 240, 300, theme.bad, gt - 0.1, 20, 0.55); } }
      { const r = rise(t, p.countsAt, 22); if (r.on) { const hs = env.hot === 'counts' ? 1 + 0.03 * env.hotK : 1; g.save(); g.globalAlpha = r.a; g.translate(0, y0 + 345 + r.y); g.scale(hs, hs); marker(g, -320, -30, 640, 62, theme.badInk, clamp((t - p.countsAt) / 0.3), 0.14); txt(g, '14 OF 14 COUNTS · OCT 2017', 0, 2, F.cap(40), theme.ink); g.restore(); } }
      dash(y0 + 410);
      { const mt = t - p.monthsAt; if (mt > -0.01) { const v = countAt(Math.max(0, mt), 0.7, 0, 200), land = mt - 0.7, s = 1 + (land > 0 ? 0.16 * hit(land, 6) : 0) + (env.hot === 'months' ? 0.03 * env.hotK : 0), o = { font: F.hero(150), size: 150, color: theme.ink, speed: mt < 0.7 ? 200 / 0.5 : 0 };
        const nw = B.rollWidth(g, 200, o).w, sw = mw(' MONTHS', F.hero(150)), tot = nw + sw; g.save(); g.translate(0, y0 + 525); g.scale(s, s); roll(g, v, -tot / 2, 0, { ...o, align: 'left' }); txt(g, ' MONTHS', -tot / 2 + nw, 0, F.hero(150), theme.badInk, 'left'); if (land > 0) marker(g, -tot / 2, 98, tot, 9, theme.badInk, clamp(land / 0.3), 0.9); g.restore(); burst(g, 0, y0 + 525, 330, theme.bad, land, 18, 0.55); }
        const r = rise(t, p.subAt, 22); if (r.on) { g.save(); g.globalAlpha = r.a; g.translate(0, y0 + 656 + r.y); txt(g, '(16 YRS 8 MO) · SENTENCED JAN 2018', 0, 0, F.cap(33), theme.inkSoft); g.restore(); } }
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

// ===== v2 re-direct additions (2026-11-25): slam hook, ticks, tower, crowd, renew, crack, heart, sig, mag =====
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, countAt, hash, hit } = B;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const segW = (segs, size) => segs.reduce((a, s) => a + mw(s[0], F.hero(size)), 0);
  const GREEN = '#1FA366';
  const bill = (g, cx, cy, w, h, rot, label) => {
    g.save(); g.translate(cx, cy); g.rotate(rot); clay(g, -w / 2, -h / 2, w, h, 14, GREEN, { shadowK: 0.6 });
    g.strokeStyle = 'rgba(245,243,238,.75)'; g.lineWidth = 4; rr(g, -w / 2 + 12, -h / 2 + 12, w - 24, h - 24, 8); g.stroke();
    g.fillStyle = 'rgba(245,243,238,.92)'; g.beginPath(); g.arc(0, 0, h * 0.27, 0, 7); g.fill(); txt(g, '$', 0, 3, F.hero(h * 0.36), GREEN);
    if (label) { txt(g, label, -w / 2 + 24, -h / 2 + 36, F.hero(h * 0.2), '#F5F3EE', 'left'); txt(g, label, w / 2 - 24, h / 2 - 36, F.hero(h * 0.2), '#F5F3EE', 'right'); } g.restore();
  };
  B.bill = bill;

  // ---------- slam: frame-0 pattern break. Text + a $500 bill + a claw yanking a taller stack + a red source stamp ----------
  B.register('slam', {
    defaults: { l1: [['LENT ', 'paper'], ['$500', 'gold']], l2: [['TOOK ', 'paper'], ['$1,925', 'bad']], size: 124, endAt: 99999, n: 8 }, ownEnter: true, size: () => [960, 1000],
    anchors: () => ({ a1: [-60, -190, 760, 640], a2: [150, -20, 800, 900], bill: [-240, 90, 380, 220], stack: [250, 130, 380, 560] }),
    draw(g, p, env) {
      const { t, lt, theme } = env, k0 = hit(lt, 8), s = 1 + 0.15 * k0; g.save(); g.scale(s, s); g.rotate(-0.025 * k0);
      // claw cycle: yank = 1 (stack lifted) .. 0 (claw grabbing); calm at the end so the loop closes on frame 0
      const per = 2.4; let yank = 0.5 + 0.5 * Math.cos(2 * Math.PI * lt / per); if (t >= p.endAt) yank = lerp(yank, 1, ease.out(lin(t, p.endAt, p.endAt + 0.6)));
      const baseY = 330, step = 30, n = p.n, topY = baseY - n * step - 60 * 0 , lift = yank * 70, sx = 250;
      // single bill (left)
      bill(g, -240, 130, 380, 200, -0.07, '$500');
      // stack (right)
      for (let i = 0; i < n; i++) { const wob = (hash(i * 3.3) - 0.5) * 20, y = baseY - i * step - lift * (0.35 + 0.65 * i / n); bill(g, sx + wob, y - 60, 360, 120, (hash(i + 9) - 0.5) * 0.06, i === n - 1 ? '$' : ''); }
      // claw (diagonal arm from the right, prongs on the top bill)
      { const hx = sx, hy = baseY - (n - 1) * step - 60 - lift - 108; g.save(); g.lineCap = 'round'; g.strokeStyle = '#59606B'; g.lineWidth = 30; g.beginPath(); g.moveTo(600, -190); g.lineTo(hx, hy); g.stroke(); g.strokeStyle = '#c9ccd2'; g.lineWidth = 12; g.beginPath(); g.moveTo(600, -202); g.lineTo(hx, hy - 10); g.stroke();
        g.fillStyle = '#59606B'; g.beginPath(); g.arc(hx, hy, 40, 0, 7); g.fill(); g.strokeStyle = '#59606B'; g.lineWidth = 22; for (const d of [-1, 1]) { g.beginPath(); g.moveTo(hx + d * 28, hy + 20); g.quadraticCurveTo(hx + d * 120, hy + 40, hx + d * 112, hy + 108); g.stroke(); }
        g.fillStyle = '#c9ccd2'; g.beginPath(); g.arc(hx, hy, 18, 0, 7); g.fill(); g.restore(); }
      // text
      const line = (segs, y) => { const w = segW(segs, p.size); let x = -w / 2; g.save(); g.shadowColor = 'rgba(0,0,0,.5)'; g.shadowBlur = 18 * B.zoomNow; g.shadowOffsetY = 8 * B.zoomNow; for (const [s0, tn] of segs) { txt(g, s0, x, y, F.hero(p.size), B.tone(tn, false), 'left'); x += mw(s0, F.hero(p.size)); } g.restore(); };
      line(p.l1, -370); line(p.l2, -235);
      // red source stamp thumps in
      { const k = clamp(lt / 0.2), sc = 1 + 0.45 * (1 - ease.out(k)); g.save(); g.translate(340, -490); g.rotate(0.04); g.scale(sc, sc); paper(g, -250, -38, 500, 76, 10, { fill: theme.paper }); g.strokeStyle = theme.badInk; g.lineWidth = 5; rr(g, -242, -31, 484, 62, 6); g.stroke(); txt(g, 'PER DOJ · ONE BORROWER', 0, 3, F.cap(30), theme.badInk); g.restore(); }
      g.restore(); burst(g, 0, -100, 560, theme.bad, lt + 0.1, 20, 0.6);
    },
  });

  // ---------- ticks: 14 check boxes tick in a fast run ----------
  B.register('ticks', {
    defaults: { w: 780, at: 99999, dur: 0.9 }, size: p => [p.w, 190],
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, x0 = -w / 2, y0 = -95; paper(g, x0, y0, w, 190, 22, { lift });
      for (let i = 0; i < 14; i++) { const r = Math.floor(i / 7), c = i % 7, cx = x0 + 70 + c * 106, cy = y0 + 56 + r * 80, ti = p.at + (i / 14) * p.dur, k = clamp((t - ti) / 0.16);
        g.save(); g.translate(cx, cy); g.strokeStyle = theme.inkSoft; g.lineWidth = 4; rr(g, -28, -28, 56, 56, 8); g.stroke();
        if (k > 0) { const pop = 1 + 0.25 * hit(t - ti, 12); g.scale(pop, pop); g.fillStyle = rgba(theme.bad, 0.16 * k); rr(g, -28, -28, 56, 56, 8); g.fill(); g.strokeStyle = theme.badInk; g.lineWidth = 10; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); g.moveTo(-17, 2); g.lineTo(-4, 16); g.lineTo(k >= 1 ? 19 : lerp(-4, 19, ease.out(clamp((k - 0.5) * 2))), k >= 1 ? -16 : lerp(16, -16, ease.out(clamp((k - 0.5) * 2)))); g.stroke(); }
        g.restore(); }
    },
  });

  // ---------- tower: fee slips stack up beside the single $500 bill; counter rolls; source chip ----------
  B.register('tower', {
    defaults: { w: 800, h: 920, to: 1425, at: 99999, dur: 1.2, slipAt: 99999, slipDur: 1.0, label: 'FEES PAID', head: 'WHAT ONE BORROWER PAID', n: 9, foot: 'SOURCE: U.S. DOJ · SDNY' },
    size: p => [p.w, p.h], anchors: p => ({ total: [0, -170, p.w * 0.9, 220], bill: [-230, 300, 340, 190] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift });
      g.save(); rr(g, x0, y0, w, h, 26); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 116); g.restore();
      txt(g, p.head, x0 + 36, y0 + 60, F.hero(54), theme.paper, 'left'); txt(g, 'PER DOJ', x0 + w - 30, y0 + 34, F.mono(20), 'rgba(245,243,238,.75)', 'right');
      txt(g, p.label, 0, y0 + 168, F.cap(36), theme.inkSoft);
      const lt = t - p.at, v = lt < 0 ? 0 : countAt(lt, p.dur, 0, p.to), land = lt - p.dur, spd = lt > 0 && lt < p.dur ? Math.abs(countAt(lt + 0.02, p.dur, 0, p.to) - v) / 0.02 : 0, s = 1 + (land > 0 ? 0.14 * hit(land, 6) : 0) + (env.hot === 'total' ? 0.03 * env.hotK : 0), o = { font: F.hero(190), size: 190, color: theme.badInk, prefix: '$', speed: spd }, rw = B.rollWidth(g, p.to, o).w;
      g.save(); g.translate(0, y0 + 300); g.scale(s, s); if (lt < 0) { g.fillStyle = theme.rule; rr(g, -rw / 2, -50, rw, 100, 50); g.fill(); } else { roll(g, v, 0, 0, o); if (land > 0) marker(g, -rw / 2, 100, rw, 9, theme.badInk, clamp(land / 0.3), 0.9); } g.restore(); if (lt > 0) burst(g, 0, y0 + 300, 360, theme.bad, land, 20, 0.55);
      g.strokeStyle = theme.rule; g.lineWidth = 3; g.setLineDash([10, 9]); g.beginPath(); g.moveTo(x0 + 40, y0 + 440); g.lineTo(x0 + w - 40, y0 + 440); g.stroke(); g.setLineDash([]);
      // the single $500 bill (left) and the slip tower (right)
      { const bk = spring(t - (p.slipAt - 0.3), 'snappy'); if (t > p.slipAt - 0.3) { g.save(); g.globalAlpha = clamp((t - p.slipAt + 0.3) / 0.1); g.translate(0, (1 - bk) * -60); bill(g, -230, y0 + h - 260, 330, 175, -0.05, '$500'); txt(g, 'THE LOAN', -230, y0 + h - 130, F.cap(28), theme.inkSoft); g.restore(); } }
      for (let i = 0; i < p.n; i++) { const ti = p.slipAt + (i / p.n) * p.slipDur, k = spring(t - ti, 'bouncy'); if (t < ti) continue; g.save(); g.globalAlpha = clamp((t - ti) / 0.08); g.translate(160 + (hash(i * 5.1) - 0.5) * 16, y0 + h - 150 - i * 50 - (1 - k) * 320); g.rotate((hash(i + 2) - 0.5) * 0.05); paper(g, -150, -23, 300, 46, 8, { fill: theme.paperShade, lift: 0 });
        g.fillStyle = theme.bad; g.fillRect(-142, -15, 8, 30); txt(g, 'FEE', -108, 2, F.mono(22), theme.inkSoft, 'left'); g.strokeStyle = theme.rule; g.lineWidth = 3; g.beginPath(); g.moveTo(-40, 2); g.lineTo(130, 2); g.stroke(); g.restore(); }
      txt(g, p.foot, 0, y0 + h - 40, F.mono(20), theme.inkSoft);
    },
  });

  // ---------- crowd: one borrower multiplies into a grid; counter rolls to 4,500,000 ----------
  B.register('crowd', {
    defaults: { w: 880, h: 1100, at: 99999, dur: 1.1, gridAt: 99999, gridDur: 1.0 }, size: p => [p.w, p.h], anchors: p => ({ borrowers: [0, -p.h / 2 + 300, p.w * 0.94, 300], grid: [0, 190, p.w * 0.9, 540] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift });
      g.save(); rr(g, x0, y0, w, h, 26); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 124); g.restore(); txt(g, 'THE SCALE', x0 + 40, y0 + 62, F.hero(66), theme.paper, 'left'); txt(g, 'PER DOJ', x0 + w - 34, y0 + 36, F.mono(20), 'rgba(245,243,238,.75)', 'right');
      txt(g, 'AT LEAST', 0, y0 + 190, F.cap(32), theme.inkSoft); const lt = t - p.at, size = 150, o0 = { font: F.hero(size), size, color: theme.badInk }, rw = B.rollWidth(g, 4500000, o0).w;
      const v = lt < 0 ? 0 : countAt(lt, p.dur, 0, 4500000), land = lt - p.dur, spd = lt > 0 && lt < p.dur ? Math.abs(countAt(lt + 0.02, p.dur, 0, 4500000) - v) / 0.02 : 0, sc = 1 + (land > 0 ? 0.12 * hit(land, 6) : 0) + (env.hot === 'borrowers' ? 0.03 * env.hotK : 0);
      g.save(); g.translate(0, y0 + 290); g.scale(sc, sc); if (lt < 0) { g.fillStyle = theme.rule; rr(g, -rw / 2, -45, rw, 90, 45); g.fill(); } else { roll(g, v, 0, 0, { ...o0, speed: spd }); if (land > 0) marker(g, -rw / 2, 90, rw, 8, theme.badInk, clamp(land / 0.3), 0.9); } g.restore(); if (lt > 0) burst(g, 0, y0 + 290, rw * 0.55, theme.bad, land, 18, 0.5);
      txt(g, 'BORROWERS', 0, y0 + 420, F.cap(40), theme.ink);
      g.strokeStyle = theme.rule; g.lineWidth = 3; g.setLineDash([10, 9]); g.beginPath(); g.moveTo(x0 + 40, y0 + 480); g.lineTo(x0 + w - 40, y0 + 480); g.stroke(); g.setLineDash([]);
      // people grid: 8 x 6, the first one (red) is "one borrower", the rest multiply from it
      const person = (cx, cy, r, col) => { g.fillStyle = col; g.beginPath(); g.arc(cx, cy - r * 0.45, r * 0.34, 0, 7); g.fill(); g.beginPath(); g.moveTo(cx - r * 0.62, cy + r * 0.62); g.quadraticCurveTo(cx - r * 0.62, cy + r * 0.05, cx, cy + r * 0.05); g.quadraticCurveTo(cx + r * 0.62, cy + r * 0.05, cx + r * 0.62, cy + r * 0.62); g.closePath(); g.fill(); };
      const cols = 8, rows = 6, gx = x0 + 70, gy = y0 + 560;
      for (let i = 0; i < cols * rows; i++) { const c = i % cols, r0 = Math.floor(i / cols), px = gx + c * 100, py = gy + r0 * 88, dly = (hash(i * 1.7) * 0.8 + (c + r0) * 0.03) * p.gridDur / 1.0, k = spring(t - (p.gridAt + dly), 'bouncy');
        if (i === 0) { const k0 = spring(t - (p.gridAt - 0.5), 'bouncy'); if (t > p.gridAt - 0.5) { g.save(); g.translate(px, py); g.scale(0.4 + 0.6 * k0 + 0.5 * hit(t - p.gridAt, 5), 0.4 + 0.6 * k0 + 0.5 * hit(t - p.gridAt, 5)); person(0, 0, 70, theme.badInk); g.restore(); } continue; }
        if (t < p.gridAt + dly) continue; g.save(); g.globalAlpha = clamp((t - p.gridAt - dly) / 0.1); g.translate(px, py); g.scale(0.3 + 0.7 * k, 0.3 + 0.7 * k); person(0, 0, 66, '#59606B'); g.restore(); }
    },
  });

  // ---------- renew: a $500 loan with arrows spinning around it (auto-renew) ----------
  B.register('renew', {
    defaults: { w: 700, h: 700, at: 99999 }, size: p => [p.w, p.h],
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift });
      g.save(); rr(g, x0, y0, w, h, 26); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 118); g.restore(); txt(g, 'AUTO-RENEW', x0 + 38, y0 + 60, F.hero(66), theme.paper, 'left'); txt(g, 'ILLUSTRATION', x0 + w - 30, y0 + 32, F.mono(18), 'rgba(245,243,238,.7)', 'right');
      const lt = t - p.at, k = lt > 0 ? spring(lt, 'snappy') : 0, rot = lt > 0 ? 3.4 * lt : 0; g.save(); g.translate(0, 40); bill(g, 0, 0, 300, 160, -0.05, '$500');
      g.strokeStyle = theme.badInk; g.fillStyle = theme.badInk; g.lineWidth = 26; g.lineCap = 'round'; g.globalAlpha = clamp(lt / 0.2);
      for (let q = 0; q < 2; q++) { const a0 = rot + q * Math.PI + 0.35, a1 = a0 + Math.PI * 0.72, R = 235 * (0.8 + 0.2 * k); g.beginPath(); g.ellipse(0, 0, R, R * 0.92, 0, a0, a1); g.stroke(); const ex = Math.cos(a1) * R, ey = Math.sin(a1) * R * 0.92, tx = -Math.sin(a1), ty = Math.cos(a1) * 0.92; g.save(); g.translate(ex, ey); g.rotate(Math.atan2(ty, tx)); g.beginPath(); g.moveTo(40, 0); g.lineTo(-18, -36); g.lineTo(-18, 36); g.closePath(); g.fill(); g.restore(); }
      g.restore(); txt(g, 'AGAIN. AND AGAIN.', 0, y0 + h - 56, F.cap(36), theme.inkSoft);
    },
  });

  // ---------- crack: jagged crack across the loan form's total ----------
  B.register('crack', {
    defaults: { at: 99999, w: 780, y: 140 }, size: () => [10, 10],
    draw(g, p, env) {
      const lt = env.t - p.at; if (lt < 0) return; const k = ease.out(clamp(lt / 0.28)), pts = [[-340, -50], [-250, 10], [-170, -30], [-80, 40], [-10, -10], [70, 50], [150, 0], [240, 60], [330, 10]], n = Math.floor(pts.length * k) + 1;
      g.save(); g.translate(0, p.y); g.lineJoin = 'round'; g.lineCap = 'round'; for (const [c, wd] of [['#F5F3EE', 16], ['#0B0F14', 8]]) { g.strokeStyle = c; g.lineWidth = wd; g.beginPath(); pts.slice(0, n).forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.stroke(); }
      g.strokeStyle = '#0B0F14'; g.lineWidth = 5; g.beginPath(); g.moveTo(-80, 40); g.lineTo(-100, 110); g.moveTo(150, 0); g.lineTo(190, -70); g.stroke(); g.restore();
    },
  });

  // ---------- heart (screen): one pulse, <= 1.2 s ----------
  B.register('heart', {
    defaults: { s: 1 }, size: () => [10, 10],
    draw(g, p, env) {
      const lt = env.lt, k = spring(lt, 'bouncy'), pulse = 1 + 0.3 * Math.max(0, Math.sin(lt * Math.PI * 2 / 0.4 - 0.4)) * (lt < 0.8 ? 1 : 0), sc = (0.4 + 0.6 * k) * pulse * p.s * 1.3, th = env.theme;
      g.save(); g.scale(sc, sc); const path = () => { g.beginPath(); g.moveTo(0, 62); g.bezierCurveTo(-120, -10, -78, -86, 0, -34); g.bezierCurveTo(78, -86, 120, -10, 0, 62); g.closePath(); };
      B.shadowed(g, path, th.bad, 0.2); g.save(); path(); g.clip(); const lg = g.createLinearGradient(0, -80, 0, 70); lg.addColorStop(0, 'rgba(255,255,255,.3)'); lg.addColorStop(0.4, 'rgba(255,255,255,0)'); lg.addColorStop(1, 'rgba(0,0,0,.22)'); g.fillStyle = lg; g.fillRect(-130, -90, 260, 170); g.restore();
      g.strokeStyle = th.paper; g.lineWidth = 8; path(); g.stroke(); g.restore(); burst(g, 0, 0, 90 * p.s, th.bad, lt - 0.05, 8, 0.4);
    },
  });

  // ---------- sig: a pen scribbles a signature (screen) ----------
  B.register('sig', {
    defaults: { dur: 0.9, label: '' }, size: () => [10, 10],
    draw(g, p, env) {
      const lt = env.lt, u = ease.inOut(clamp(lt / p.dur)), th = env.theme, f = v => { const x = -190 + v * 380, y = Math.sin(v * 17) * 24 * (1 - v * 0.4) - Math.sin(v * 5.5) * 30; return [x, y]; };
      g.save(); g.strokeStyle = th.paper; g.lineWidth = 11; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); const N = 90; for (let i = 0; i <= N * u; i++) { const [x, y] = f(i / N); i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke();
      g.strokeStyle = 'rgba(245,243,238,.5)'; g.lineWidth = 5; g.beginPath(); g.moveTo(-230, 58); g.lineTo(230, 58); g.stroke(); txt(g, 'X', -250, 36, F.hero(46), th.paper, 'right');
      const [px, py] = f(u); g.translate(px, py); g.rotate(-0.8); clay(g, -8, -90, 16, 80, 6, th.gold, { shadowK: 0.3 }); g.fillStyle = th.ink; g.beginPath(); g.moveTo(-8, -10); g.lineTo(8, -10); g.lineTo(0, 12); g.closePath(); g.fill(); g.restore();
      if (p.label) { g.save(); g.translate(0, 130); txt(g, p.label, 0, 0, F.cap(44), th.paper); g.restore(); }
    },
  });

  // ---------- mag (screen): magnifier that taps the +FOLLOW button ----------
  B.register('mag', {
    defaults: { press: 0.5, from: [-170, 120] }, size: () => [10, 10],
    draw(g, p, env) {
      const lt = env.lt, u = ease.out(clamp(lt / 0.4)), dip = lt > p.press ? 0.14 * hit(lt - p.press, 9) : 0, th = env.theme, x = lerp(p.from[0], 70, u), y = lerp(p.from[1], 40, u);
      g.save(); g.translate(x, y); g.rotate(-0.25); g.scale(0.8 - dip, 0.8 - dip); g.fillStyle = 'rgba(245,243,238,.2)'; g.beginPath(); g.arc(0, 0, 58, 0, 7); g.fill(); g.strokeStyle = th.gold; g.lineWidth = 15; g.beginPath(); g.arc(0, 0, 58, 0, 7); g.stroke();
      g.strokeStyle = 'rgba(255,255,255,.55)'; g.lineWidth = 6; g.beginPath(); g.arc(0, 0, 40, 3.5, 4.6); g.stroke(); g.strokeStyle = th.ink; g.lineWidth = 18; g.lineCap = 'round'; g.beginPath(); g.moveTo(42, 42); g.lineTo(96, 100); g.stroke(); g.restore();
    },
  });
})();
