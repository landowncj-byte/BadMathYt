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
// ===== Tucker payday — CRIME-SHOW generator (RULES 112). One story, three cuts: each cut passes a cfg of word refs (cfg.R) + order. =====
// Appended after: shared.js (loanbox, paycal, rate, crowd, car, verdict, ticks, renew, heart/plane/mag...), wine_bits.js, shared2.js (hud), crime.js (suspect, board, victim, datecard, tile)
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, burst, hit } = B;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };

  // ---------- claw: a crane claw drops on a payday tile of the paycheck calendar and lifts the $150 away (world overlay, same centre as paycal) ----------
  B.register('claw', {
    defaults: { w: 800, h: 940, grabs: [], fee: 150 }, ownEnter: true, size: p => [p.w, p.h],
    draw(g, p, env) {
      const { t, theme } = env, x0 = -p.w / 2, y0 = -p.h / 2;
      p.grabs.forEach((gt, i) => {
        const o = t - gt; if (o < -0.05 || o > 1.1) return;
        const tx = x0 + 40 + (i % 3) * 250 + 110, ty = y0 + 160 + Math.floor(i / 3) * 250 + 140;
        const down = ease.out(lin(o, -0.05, 0.28)), up = ease.in(lin(o, 0.5, 1.05)), k = down - up, top = y0 + 130, cy = lerp(top, ty - 40, k);
        g.save(); g.globalAlpha = clamp((o + 0.05) / 0.08) * clamp((1.1 - o) / 0.15);
        g.strokeStyle = '#0B0F14'; g.lineWidth = 8; g.beginPath(); g.moveTo(tx, top - 60); g.lineTo(tx, cy - 30); g.stroke();
        const open = o < 0.3 ? 1 : 0.15;
        g.translate(tx, cy); g.fillStyle = '#59647a'; g.strokeStyle = '#0B0F14'; g.lineWidth = 5; rr(g, -26, -34, 52, 34, 8); g.fill(); g.stroke();
        for (const s of [-1, 1]) { g.save(); g.rotate(s * 0.55 * open + s * 0.1); g.fillStyle = '#C9CED6'; g.beginPath(); g.moveTo(s * 6, -4); g.quadraticCurveTo(s * 52, 8, s * 30, 52); g.lineTo(s * 20, 46); g.quadraticCurveTo(s * 34, 12, s * 2, 8); g.closePath(); g.fill(); g.stroke(); g.restore(); }
        if (o > 0.28) { g.save(); g.translate(0, 48); g.rotate(-0.05); clay(g, -64, -26, 128, 52, 8, theme.good || '#00A152', { shadowK: 0.3 }); txt(g, '$' + p.fee, 0, 0, F.hero(34), theme.paper); g.restore(); }
        g.restore();
      });
    },
  });

  // ---------- tribe: the "shield" claim: OWNED BY A TRIBE -> STATES CAN'T SUE -> cracked, SHAM (prosecutors) ----------
  B.register('tribe', {
    defaults: { w: 860, h: 920, claimAt: 99999, sueAt: 99999, crackAt: 99999, shamAt: 99999 }, size: p => [p.w, p.h],
    anchors: p => ({ shield: [0, -40, 520, 560], sham: [0, 270, 700, 220], head: [0, -p.h / 2 + 65, p.w, 130] }),
    draw(g, p, env) {
      const { t, theme, lift } = env; p.in0 = t - env.lt; const w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift });
      g.save(); rr(g, x0, y0, w, h, 26); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 124); g.restore();
      txt(g, 'THE "SHIELD"', x0 + 40, y0 + 62, F.hero(66), theme.paper, 'left'); txt(g, 'HIS CLAIM', x0 + w - 34, y0 + 32, F.mono(20), 'rgba(245,243,238,.75)', 'right');
      if (t < p.claimAt + 0.15) { const fa = clamp((p.claimAt + 0.15 - t) / 0.2) * clamp((t - p.in0) / 0.15); g.save(); g.globalAlpha = fa; txt(g, 'STATES', 0, -140, F.hero(130), theme.ink); txt(g, 'COME AFTER HIS LOANS', 0, -50, F.cap(38), theme.inkSoft);
        for (let i = 0; i < 3; i++) { const o = clamp((t - p.in0 - 0.25 - i * 0.18) / 0.2), k2 = spring(Math.max(0, t - p.in0 - 0.25 - i * 0.18), 'snappy'); if (o <= 0) continue; g.save(); g.translate(-230 + i * 230, 90 + (1 - k2) * 40); g.rotate((i - 1) * 0.07); g.globalAlpha *= o; paper(g, -90, -60, 180, 120, 10, { lift: 0.4 }); txt(g, 'LAWSUIT', 0, -18, F.cap(24), theme.badInk); g.fillStyle = theme.rule; for (let j = 0; j < 3; j++) g.fillRect(-64, 6 + j * 16, 128, 6); g.restore(); } g.restore(); }
      const ck = t >= p.claimAt ? spring(t - p.claimAt, 'heavy') : 0, cr = ease.out(lin(t, p.crackAt, p.crackAt + 0.3));
      g.save(); g.translate(0, -50 + (1 - ck) * -160); g.globalAlpha = clamp((t - p.claimAt) / 0.1 + (t >= p.claimAt ? 0 : -9));
      const sh = () => { g.beginPath(); g.moveTo(-170, -190); g.quadraticCurveTo(0, -240, 170, -190); g.lineTo(170, 20); g.quadraticCurveTo(160, 150, 0, 240); g.quadraticCurveTo(-160, 150, -170, 20); g.closePath(); };
      B.shadowed(g, sh, '#1E7D4F', 0.5); const lg = g.createLinearGradient(-170, -200, 170, 240); lg.addColorStop(0, '#2FB872'); lg.addColorStop(1, '#16603B'); g.fillStyle = lg; sh(); g.fill(); g.strokeStyle = '#0B0F14'; g.lineWidth = 8; g.stroke();
      g.strokeStyle = 'rgba(255,255,255,.35)'; g.lineWidth = 6; g.beginPath(); g.moveTo(-136, -160); g.quadraticCurveTo(0, -200, 136, -160); g.stroke();
      txt(g, 'OWNED BY', 0, -86, F.cap(34), theme.paper); txt(g, 'A TRIBE', 0, -20, F.hero(86), theme.paper); txt(g, '(HIS CLAIM)', 0, 52, F.mono(24), 'rgba(245,243,238,.85)');
      if (cr > 0) { g.save(); sh(); g.clip(); g.strokeStyle = '#0B0F14'; g.lineWidth = 11; g.lineJoin = 'round'; g.lineCap = 'round'; const pts = [[-30, -200], [-6, -110], [-40, -50], [8, 20], [-24, 90], [30, 160], [10, 240]], n = Math.max(2, Math.floor(pts.length * cr)); g.beginPath(); pts.slice(0, n).forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.stroke(); g.restore(); }
      g.restore();
      { const o = t - p.sueAt; if (o > 0) { const k = spring(o, 'snappy'); g.save(); g.globalAlpha = clamp(o / 0.1); g.translate(0, y0 + h - 120 + (1 - k) * 30); txt(g, "STATES CAN'T SUE TRIBES", 0, 0, F.hero(52), theme.ink); g.restore(); } }
      { const o = t - p.shamAt; if (o > 0) { const sc = 1 + 1.2 * (1 - ease.expo(clamp(o / 0.2))); g.save(); g.globalAlpha = clamp(o / 0.06); g.translate(0, 190); g.rotate(-0.08); g.scale(sc, sc); const W = 560; paper(g, -W / 2, -78, W, 156, 14, { fill: theme.paper, lift: 0.5 }); g.strokeStyle = theme.badInk; g.lineWidth = 8; rr(g, -W / 2 + 10, -68, W - 20, 136, 10); g.stroke(); txt(g, 'A SHAM', 0, -8, F.hero(110), theme.badInk); txt(g, 'PROSECUTORS SAID', 0, 54, F.mono(22), theme.inkSoft); g.restore(); } }
    },
  });

  // ============================================================== scene builder ==============================================================
  const SB = 'side-by-side', GH = 'graphic-hero', ZN = 'zoom-on-number', PF = 'presenter-front', PK = 'peek', PB = 'pull-back';
  const PHOTO = 'brand/photos/scott-tucker/1.jpg';
  const SUS = { src: PHOTO, crop: [0, 0, 1, 1], fx: 0.5, fy: 0.34, aspect: 1.22 };
  const NAME = { name: 'SCOTT TUCKER', nick: '“THE PAYDAY LENDER”' };
  const CRED = 'PHOTO: LEVEL 5 MOTORSPORTS · CC BY-SA 2.0';
  const STK = { x: 915, y: 1385, s: 0.95 };

  window.TUCKER = function (cfg) {
    const R = cfg.R, E = [], T = [], S = [], HL = [], HI = [], SH = [], PO = [];
    const stn = i => [(i % 6) * 1950, Math.floor(i / 6) * 1950];
    let si = 1; const seg = () => { const o = stn(si); si++; return o; };
    const b = (at, beat, focus, o = {}) => T.push(Object.assign({ at, beat, focus }, o));
    const sfx = (at, name, gain = -9, dur = 0.5) => S.push({ at, name, gain, dur });
    const bad = s => [[s, 'bad']];
    const O = (r, d) => { d = parseFloat(d); if (typeof r === 'number') return r + d; const m = String(r).match(/^(.*?)([+-]\d*\.?\d+)?$/), q = (m[2] ? parseFloat(m[2]) : 0) + d; return m[1] + (q ? (q > 0 ? '+' : '') + (+q.toFixed(3)) : ''); };

    // ---- S0 frame 0 (loop target) ----
    E.push({ id: 'hook', type: 'text', at: [0, -400], in: -1, out: R.hookEnd, props: { lines: cfg.hook.lines, size: cfg.hook.size || 92 } });
    E.push({ id: 'hook2', type: 'text', at: [0, -400], in: R.loopIn, props: { lines: cfg.hook.lines, size: cfg.hook.size || 92 } });
    E.push({ id: 'sus0', type: 'suspect', at: [0, 190], in: -1, props: Object.assign({}, SUS, NAME, { w: 440, flash: false, tilt: -0.02, credit: CRED, ring: R.hookRing || 99999 }) });
    E.push({ id: 'tl0', type: 'tile', at: [370, 420], in: -1, props: { icon: 'cash', caption: cfg.hook.tile, w: 250, h: 280, cap: 30, tilt: 0.06 } });
    const F0 = ['hook', 'sus0', 'tl0'];
    b(0, SB, F0, { sx: 540, sy: 880, fill: 0.98, maxH: 900, st: STK, pose: 'shock' });
    cfg.hookBeats.forEach(([at, extra]) => b(at, ZN, extra.focus || F0, Object.assign({ fill: 1.0, maxH: 900, sx: 540, sy: 880, st: STK, dur: 0.45 }, extra)));
    sfx(0, 'deep_boom_2', -3); sfx(0.05, 'camera_shutter_1', -8, 0.4); sfx(0.1, 'paper_slam_2', -7);

    // ---- WHO ----
    { const [x, y] = seg();
      E.push({ id: 'mug', type: 'suspect', at: [x, y + 20], in: O(R.who, '-0.3'), props: Object.assign({}, SUS, NAME, { variant: 'card', file: true, caseNo: 'CASE FILE Nº 027', w: 480, credit: CRED, tilt: -0.03, push: { at: R.who, dur: 5.0, to: 1.3 }, stringTo: [690, 330], stringAt: R.whoString, ring: R.whoRing }) });
      E.push({ id: 'ol', type: 'text', at: [x + 720, y + 10], in: R.onlineIn, props: { lines: [[['ONLINE', 'paper']], [['PAYDAY', 'gold']], [['LOANS', 'paper']]], size: 100 } });
      E.push({ id: 'dc1', type: 'datecard', layer: 'screen', at: [340, 480], in: O(R.who, '-0.1'), out: O(R.who, '+0.7'), props: { kicker: 'CASE FILE Nº 027 · THE LOANS', big: 'KANSAS', small: 'ONLINE PAYDAY LOANS' } });
      b(R.who, SB, 'mug', { move: 'whip', sx: 540, sy: 960, fill: 0.62, maxH: 700, st: { x: 930, y: 1390, s: 0.85 }, pose: 'shrug' });
      b(R.whoName, ZN, 'mug', { fill: 0.7, maxH: 760, sy: 930, st: 'corner', pose: 'point', dur: 0.5 });
      b(R.onlineIn, SB, ['mug', 'ol'], { sx: 540, sy: 840, fill: 0.95, maxH: 1000, st: 'corner', pose: 'shock', dur: 0.8 });
      sfx(R.who, 'camera_shutter_2', -8, 0.4); sfx(O(R.who, '+0.2'), 'paper_slam_2', -10); sfx(R.onlineIn, 'typewriter_2', -12, 0.8); }

    // ---- WHAT'S A PAYDAY LOAN ----
    { const [x, y] = seg();
      E.push({ id: 'bor', type: 'victim', at: [x - 320, y], in: O(R.def, '-0.3'), props: { kind: 'diner', label: 'THE BORROWER', sub: 'NEEDS CASH TILL PAYDAY', labelSize: 40, reactAt: R.defPay, w: 400, h: 500, tape: 'BORROWER' } });
      E.push({ id: 'dtx', type: 'text', at: [x + 330, y - 10], in: R.def, props: { lines: [[['A SMALL LOAN', 'gold']], [['PAID BACK ON', 'paper']], [['YOUR NEXT', 'paper']], [['PAYDAY', 'gold']]], size: 66, per: 0.1 } });
      b(R.def, SB, ['bor', 'dtx'], { move: 'whip', sx: 540, sy: 860, fill: 0.95, maxH: 860, st: 'left', pose: 'point' });
      b(R.defLoan, ZN, ['bor', 'dtx'], { fill: 0.9, maxH: 900, sy: 860, st: 'corner', pose: 'point', dur: 0.5 });
      b(R.defPay, GH, ['bor', 'dtx'], { fill: 0.95, maxH: 860, sy: 860, st: 'corner-left', pose: 'talk', dur: 0.7 });
      if (R.defMid) b(R.defMid, GH, ['bor', 'dtx'], { sx: 520, fill: 0.86, maxH: 860, sy: 860, st: 'corner-left', pose: 'chin', dur: 0.8 });
      if (R.defExtra) b(R.defExtra, ZN, 'bor', { fill: 0.5, maxH: 700, sy: 880, st: 'corner', pose: 'shrug', dur: 0.5 });
      sfx(R.def, 'swipe_2', -11, 0.4); sfx(R.defLoan, 'pop_1', -9, 0.4); }

    // ---- THE PITCH (paperwork box) ----
    { const [x, y] = seg();
      E.push({ id: 'lb', type: 'loanbox', at: [x, y], in: O(R.pitch, '-0.4'), props: { at: 99999, amountAt: R.borrow, totalAt: R.p650 } });
      E.push({ id: 'pip1', type: 'suspect', layer: 'screen', at: [880, 1130], in: O(R.pitch, '-0.3'), out: R.p650, props: Object.assign({}, SUS, { variant: 'pip', w: 200, aspect: 1.0, label: 'HIS FORM', flash: true, tilt: 0.03, arrow: { at: O(R.pitch, '+0.2'), to: [-400, -330] } }) });
      b(R.pitch, GH, 'lb', { move: 'whip', sx: 430, sy: 830, fill: 0.66, maxH: 800, st: 'corner-left', pose: 'point' });
      b(R.borrow, ZN, 'lb.amount', { sx: 430, fill: 0.7, maxH: 300, sy: 760, st: 'corner-left', dur: 0.45 });
      b(R.p650, ZN, 'lb.total', { sx: 430, fill: 0.72, maxH: 460, sy: 980, st: 'corner-left', pose: 'shock', dur: 0.5 });
      b(O(R.p650, '+0.9'), PB, 'lb', { sx: 430, fill: 0.66, maxH: 800, sy: 830, st: 'corner', dur: 0.7 });
      sfx(R.pitch, 'paper_slam_2', -10); sfx(R.borrow, 'pop_2', -9, 0.3); sfx(R.p650, 'ding_2', -9, 0.7); }

    // ---- THE TRICK: auto-renew ----
    { const [x, y] = seg();
      E.push({ id: 'rn', type: 'renew', at: [x, y], in: O(R.trick, '-0.4'), props: { at: R.renewed } });
      b(R.trick, SB, 'rn', { move: 'whip', sx: 540, sy: 850, fill: 0.74, maxH: 800, st: 'corner-left', pose: 'point' });
      b(R.renewed, ZN, 'rn', { fill: 0.85, maxH: 700, sy: 850, st: 'corner-left', pose: 'shock', dur: 0.5 });
      b(R.every, GH, 'rn', { fill: 0.78, maxH: 800, sy: 850, st: 'corner', pose: 'talk', dur: 0.8 });
      sfx(R.trick, 'paper_slam_2', -10); sfx(R.renewed, 'swoosh_2', -10, 0.9); }

    // ---- THE TRICK: the claw takes $150 every payday, the $500 never moves ----
    { const [x, y] = seg();
      E.push({ id: 'pc', type: 'paycal', at: [x, y], in: O(R.cal, '-0.5'), props: { paydays: R.pd, owedAt: [R.never, R.neverB || R.never], neverAt: R.never } });
      E.push({ id: 'cw', type: 'claw', at: [x, y], in: O(R.cal, '-0.5'), props: { grabs: R.pd } });
      E.push({ id: 'pipc', type: 'suspect', layer: 'screen', at: [880, 1130], in: R.cal, out: R.fee, props: Object.assign({}, SUS, { variant: 'pip', w: 200, aspect: 1.0, label: 'HIS FEES', flash: true, tilt: 0.03, arrow: { at: O(R.cal, '+0.3'), to: [-420, -300] } }) });
      b(R.cal, SB, 'pc', { move: 'whip', sx: 450, sy: 820, fill: 0.66, maxH: 930, st: 'corner-left', pose: 'point' });
      b(R.fee, ZN, 'pc', { sx: 540, fill: 0.8, maxH: 880, sy: 860, st: 'corner-left', dur: 0.5 });
      b(R.pdEnd, PB, 'pc', { fill: 0.72, maxH: 880, sx: 540, sy: 860, st: 'corner-left', dur: 0.8 });
      b(R.never, ZN, 'pc', { fill: 0.86, maxH: 880, sy: 860, st: 'corner', pose: 'shock', dur: 0.6 });
      b(R.neverEnd, GH, 'pc', { fill: 0.72, maxH: 880, sx: 540, sy: 860, st: 'corner-left', dur: 0.8 });
      R.pd.forEach(p => sfx(p, 'thud_1', -10, 0.4)); sfx(R.fee, 'coin_single_2', -10, 0.6); sfx(R.never, 'rubber_stamp_2', -5); sfx(R.never, 'deep_boom_2', -8, 0.4); }

    // ---- RENT ON YOUR OWN DEBT ----
    { const [x, y] = seg();
      E.push({ id: 'rb', type: 'victim', at: [x - 320, y + 10], in: O(R.rent, '-0.4'), props: { kind: 'diner', label: 'THE BORROWER', sub: 'EVERY 2 WEEKS', labelSize: 40, reactAt: R.rentWord, w: 400, h: 500, tape: 'BORROWER' } });
      E.push({ id: 'rtx', type: 'text', at: [x + 330, y], in: R.rent, props: { lines: [[['RENT', 'bad']], [['ON YOUR', 'paper']], [['OWN DEBT', 'gold']]], size: 92, per: 0.12 } });
      b(R.rent, SB, ['rb', 'rtx'], { move: 'whip', sx: 540, sy: 860, fill: 0.95, maxH: 860, st: 'left', pose: 'you' });
      b(R.rentWord, ZN, ['rb', 'rtx'], { fill: 0.9, maxH: 900, sy: 860, st: 'corner', pose: 'point', dur: 0.5 });
      sfx(R.rent, 'swipe_2', -11, 0.4); sfx(R.rentWord, 'thud_1', -8, 0.4); }

    // ---- ONE BORROWER PAID $1,925 (the box rolls up) ----
    { const [x, y] = seg();
      E.push({ id: 'lb2', type: 'loanbox', at: [x - 100, y], in: O(R.doj, '-0.4'), props: { from: 650, to: 1925, at: R.dojNum, dur: 1.4, amountAt: R.doj, totalAt: O(R.doj, '+0.2'), head: 'LOAN DISCLOSURE' } });
      E.push({ id: 'sp2', type: 'suspect', at: [x + 560, y + 250], in: R.doj, props: Object.assign({}, SUS, { variant: 'pip', w: 230, aspect: 1.0, label: 'HIS LOAN', flash: true, tilt: 0.04, arrow: { at: O(R.doj, '+0.2'), to: [-300, -160] } }) });
      b(R.doj, SB, ['lb2', 'sp2'], { move: 'whip', sx: 560, sy: 840, fill: 0.9, maxH: 900, st: 'corner-left', pose: 'point' });
      b(R.dojNum, ZN, 'lb2.total', { fill: 0.7, maxH: 520, sy: 990, st: 'corner-left', pose: 'shock', dur: 0.5, lead: 0.1 });
      b(O(R.dojNum, '+1.5'), PB, ['lb2', 'sp2'], { fill: 0.86, maxH: 900, sx: 560, sy: 840, st: 'corner', dur: 0.7 });
      sfx(R.doj, 'paper_slam_2', -10); sfx(R.dojNum, 'money_counter_1', -10, 1.5); sfx(O(R.dojNum, '+1.4'), 'cash_register_1', -8, 0.9); SH.push([O(R.dojNum, '+1.4'), 10]); }

    // ---- ~700% ----
    { const [x, y] = seg();
      E.push({ id: 'rt', type: 'rate', at: [x, y], in: O(R.rate, '-0.4'), props: { at: R.p700 } });
      b(R.rate, SB, 'rt', { move: 'whip', sx: 540, sy: 840, fill: 0.84, maxH: 800, st: 'corner-left', pose: 'point' });
      b(R.p700, ZN, 'rt.hero', { fill: 0.7, maxH: 520, sy: 840, st: 'corner-left', pose: 'shock', dur: 0.5 });
      if (R.rateAfter) b(R.rateAfter, PF, 'rt', { sy: 820, pose: 'talk' });
      sfx(R.rate, 'paper_slam_2', -10); sfx(R.p700, 'cinematic_hit_1', -8, 0.8); SH.push([O(R.p700, '+1.0'), 10]); }

    // ---- 4.5 MILLION ----
    { const [x, y] = seg();
      E.push({ id: 'cr', type: 'crowd', at: [x, y], in: O(R.crowd, '-0.4'), props: { at: R.four, dur: 1.0, gridAt: O(R.four, '+0.6'), gridDur: 1.1 } });
      b(R.crowd, GH, 'cr', { move: 'whip', sy: 920, fill: 0.84, maxH: 880, st: 'corner-left', pose: 'point' });
      b(R.four, ZN, 'cr.borrowers', { fill: 0.8, sy: 900, st: 'corner-left', pose: 'shock', dur: 0.5 });
      b(O(R.four, '+1.6'), PB, 'cr', { fill: 0.84, maxH: 880, sy: 920, st: 'corner', dur: 0.8 });
      sfx(R.crowd, 'paper_slam_2', -10); sfx(R.four, 'money_counter_1', -11, 1.0); sfx(O(R.four, '+1.0'), 'ding_2', -9, 0.7); }

    // ---- $3.5 BILLION ----
    { const [x, y] = seg();
      E.push({ id: 'rv', type: 'counter', at: [x, y - 60], in: O(R.rev, '-0.4'), props: { from: 0, to: 3.5, decimals: 1, prefix: '$', suffix: ' BILLION', at: R.rev3, dur: 1.3, size: 160, tone: 'bad', label: 'HIS BUSINESS MADE (OVER)', sub: '2008 → JUNE 2013 · PER DOJ', w: 900 } });
      E.push({ id: 'cs', type: 'cashStack', at: [x, y + 420], in: R.rev3, props: { count: 36, at: R.rev3, per: 0.04, each: 1, prefix: '', label: '' } });
      b(R.rev, SB, ['rv', 'cs'], { move: 'whip', sx: 540, sy: 820, fill: 0.9, maxH: 1000, st: 'corner-left', pose: 'point' });
      b(R.rev3, ZN, 'rv.value', { fill: 0.84, maxH: 560, sy: 940, st: 'corner-left', pose: 'shock', dur: 0.5 });
      b(O(R.rev3, '+1.8'), PB, ['rv', 'cs'], { fill: 0.88, maxH: 1000, sy: 820, st: 'corner', dur: 0.8 });
      sfx(R.rev, 'paper_slam_2', -10); sfx(R.rev3, 'money_counter_2', -10, 1.3); sfx(O(R.rev3, '+1.3'), 'cash_register_1', -8, 0.9); SH.push([O(R.rev3, '+1.3'), 10]); }

    // ---- RACE TEAM ----
    if (R.race0) { const [x, y] = seg();
      E.push({ id: 'car', type: 'car', at: [x, y], in: O(R.race0, '-0.4'), props: { driveAt: R.raceDrive, ownAt: R.raceOwn } });
      E.push({ id: 'spc', type: 'suspect', at: [x + 560, y + 330], in: R.race0, props: Object.assign({}, SUS, { variant: 'pip', w: 230, aspect: 1.0, label: 'HIS TEAM', flash: true, tilt: 0.04, arrow: { at: O(R.race0, '+0.3'), to: [-280, -150] } }) });
      b(R.race0, SB, ['car', 'spc'], { move: 'whip', sx: 560, sy: 840, fill: 0.9, maxH: 800, st: 'corner-left', pose: 'chin' });
      b(R.raceOwn, ZN, 'car.car', { fill: 0.8, maxH: 420, sy: 880, st: 'corner-left', pose: 'point', dur: 0.5 });
      b(O(R.raceOwn, '+0.6'), GH, ['car', 'spc'], { fill: 0.9, maxH: 800, sx: 560, sy: 840, st: 'corner', dur: 0.7 });
      sfx(R.race0, 'swoosh_2', -10, 0.9); sfx(R.raceDrive, 'riser_2', -14, 1.2); sfx(R.raceOwn, 'pop_1', -9, 0.4); }

    // ---- THE SHIELD ----
    { const [x, y] = seg();
      E.push({ id: 'tr', type: 'tribe', at: [x - 80, y], in: O(R.shield, '-0.4'), props: { claimAt: R.claimed, sueAt: R.sue, crackAt: O(R.shamAt, '-0.3'), shamAt: R.shamAt } });
      E.push({ id: 'sps', type: 'suspect', at: [x + 570, y + 300], in: R.shield, props: Object.assign({}, SUS, { variant: 'pip', w: 230, aspect: 1.0, label: 'HIS SHIELD', flash: true, tilt: 0.04, arrow: { at: O(R.shield, '+0.3'), to: [-300, -140] } }) });
      b(R.shield, SB, ['tr', 'sps'], { move: 'whip', sx: 540, sy: 860, fill: 0.9, maxH: 960, st: 'corner-left', pose: 'point' });
      b(R.claimed, ZN, 'tr', { fill: 0.84, maxH: 900, sy: 900, st: 'corner-left', pose: 'shock', dur: 0.5 });
      b(R.sue, ZN, 'tr', { fill: 0.86, maxH: 940, sy: 880, st: 'corner-left', pose: 'point', dur: 0.5 });
      b(R.shamAt, ZN, 'tr', { fill: 0.9, maxH: 940, sy: 900, st: 'corner-left', pose: 'shock', dur: 0.4 });
      if (!R.noShamPB) b(O(R.shamAt, '+1.0'), PB, ['tr', 'sps'], { fill: 0.9, maxH: 960, sx: 540, sy: 860, st: 'corner', dur: 0.7 });
      sfx(R.shield, 'paper_slam_2', -10); sfx(R.claimed, 'click_1', -8, 0.3); sfx(R.sue, 'pop_1', -9, 0.4); sfx(O(R.shamAt, '-0.3'), 'thud_1', -8, 0.4); sfx(R.shamAt, 'rubber_stamp_2', -5); SH.push([R.shamAt, 12]); }

    // ---- EVIDENCE BOARD ----
    { const [x, y] = seg(), bd = R.board;
      E.push({ id: 'board', type: 'board', at: [x, y], in: O(bd, '-0.4'), props: { title: 'EVIDENCE BOARD', caseNo: 'CASE FILE Nº 027', tightAt: R.boardTight, items: [
        { id: 'ph', k: 'photo', src: PHOTO, crop: [0, 0, 1, 1], fx: 0.5, fy: 0.34, x: 0, y: -280, w: 330, h: 410, name: 'SCOTT TUCKER', nameSize: 26, at: O(bd, '-0.2'), rot: -0.02, push: 0.3 },
        { id: 'n1', k: 'note', x: -300, y: 120, w: 270, h: 290, icon: 'cash', size: 40, lines: [['$1,925', 'bad']], at: O(bd, '+0.3'), rot: -0.05 },
        { id: 'n2', k: 'note', x: 0, y: 150, w: 270, h: 290, size: 46, lines: [['4.5M', 'bad'], ['BORROWERS', 'ink', 24]], at: O(bd, '+0.6'), rot: 0.03 },
        { id: 'n3', k: 'note', x: 300, y: 120, w: 270, h: 290, icon: 'cash', size: 40, lines: [['$3.5B', 'bad']], at: O(bd, '+0.9'), rot: 0.05 },
        { id: 'n4', k: 'note', x: 0, y: 440, w: 640, h: 270, size: 120, lines: [['SHAM', 'bad', 120]], at: O(bd, '+1.2'), rot: -0.02, stamp: { text: 'PROSECUTORS SAID', at: O(bd, '+1.5'), y: 82, size: 30, rot: -0.04 } } ],
        strings: [[0, 1, O(bd, '+0.5')], [0, 2, O(bd, '+0.8')], [0, 3, O(bd, '+1.1')], [0, 4, O(bd, '+1.4')], [1, 4, O(R.boardTight, '-0.2')], [2, 4, O(R.boardTight, '-0.1')], [3, 4, R.boardTight]] } });
      b(bd, PK, 'board', { move: 'whip', sy: 800, fill: 0.9, maxH: 860, pose: 'chin' });
      b(O(bd, '+0.9'), GH, 'board', { sy: 800, fill: 0.9, maxH: 860, st: 'corner-left', pose: 'point', dur: 0.7 });
      b(R.boardTight, PB, 'board', { fill: 0.86, maxH: 860, sy: 800, st: 'corner-left', dur: 0.6 });
      sfx(bd, 'paper_slam_2', -10); sfx(O(bd, '+0.3'), 'camera_shutter_1', -9, 0.4); sfx(R.boardTight, 'typewriter_1', -12, 1.0); }

    // ---- ARRESTED + VERDICT ----
    { const [x, y] = seg();
      E.push({ id: 'sa', type: 'suspect', at: [x - 380, y + 20], in: O(R.arrest, '-0.5'), out: R.jury, props: Object.assign({}, SUS, NAME, { w: 450, flash: true, tilt: -0.02, credit: CRED, mono: true, xmark: O(R.arrest, '+0.2'), stamps: [{ text: 'ARRESTED 2016', at: O(R.arrest, '+0.5'), size: 52, x: 0, y: 40, rot: -0.1 }] }) });
      E.push({ id: 'vd', type: 'verdict', at: [x + 420, y - 30], in: O(R.jury, '-0.5'), props: { guiltyAt: R.convicted, countsAt: R.c14, monthsAt: R.m200, subAt: R.y16 } });
      E.push({ id: 'tk', type: 'ticks', at: [x + 420, y + 440], in: O(R.jury, '-0.5'), out: O(R.m200, '-0.2'), props: { at: R.c14, dur: 0.9 } });
      E.push({ id: 'sv', type: 'suspect', at: [x - 380, y + 20], in: R.jury, props: Object.assign({}, SUS, NAME, { w: 450, flash: false, tilt: -0.02, credit: CRED, mono: true, stamps: [{ text: 'GUILTY', at: R.convicted, size: 74, x: 0, y: -30, rot: -0.1 }], bars: R.sentenced }) });
      b(R.arrest, SB, ['sa', 'vd', 'tk'], { move: 'whip', sx: 540, sy: 880, fill: 0.96, maxH: 1120, st: 'corner', pose: 'shock' });
      b(O(R.arrest, '+0.7'), ZN, 'sa', { fill: 0.6, maxH: 700, sy: 870, st: 'corner', pose: 'shock', dur: 0.5 });
      b(R.jury, SB, ['sv', 'vd', 'tk'], { sx: 540, sy: 880, fill: 0.96, maxH: 1120, st: 'corner', pose: 'point', dur: 0.8 });
      b(R.convicted, ZN, 'vd', { fill: 0.84, maxH: 900, sy: 940, st: 'corner-left', pose: 'shock', dur: 0.45 });
      b(R.c14, GH, ['vd', 'tk'], { fill: 0.82, maxH: 900, sy: 940, st: 'corner-left', pose: 'point', dur: 0.7 });
      b(R.sentenced, GH, ['sv', 'vd'], { sx: 540, sy: 880, fill: 0.96, maxH: 1120, st: 'corner', pose: 'talk', dur: 0.7 });
      b(R.m200, ZN, 'vd', { fill: 0.86, maxH: 900, sy: 900, rot: 0.02, st: 'off', pose: 'shock', dur: 0.4, lead: 0.15 });
      b(R.y16, GH, ['sv', 'vd'], { sx: 540, sy: 880, fill: 0.96, maxH: 1120, st: 'corner', pose: 'idle', dur: 0.8 });
      sfx(R.arrest, 'camera_shutter_1', -8, 0.4); sfx(O(R.arrest, '+0.2'), 'thud_1', -8, 0.4); sfx(O(R.arrest, '+0.5'), 'rubber_stamp_2', -6);
      sfx(R.convicted, 'gavel_1', -4, 0.8); sfx(R.convicted, 'rubber_stamp_2', -6); sfx(R.c14, 'typewriter_1', -12, 0.9);
      sfx(R.sentenced, 'cell_door_1', -7, 1.0); sfx(R.m200, 'cinematic_hit_1', -3, 1.2); sfx(R.m200, 'deep_boom_1', -4, 1.4); sfx(O(R.m200, '+0.1'), 'money_counter_2', -11, 0.8);
      SH.push([R.arrest, 12], [R.convicted, 16], [R.m200, 26]); }

    // ---- his lawyer (TikTok only) ----
    if (R.lawyer) { const [x, y] = seg();
      E.push({ id: 'lw', type: 'text', at: [x, y], in: O(R.lawyer, '-0.3'), props: { lines: [[['HIS OWN LAWYER:', 'gold']], [['7 YEARS', 'bad']], [['(84 MONTHS)', 'paper']]], size: 90, per: 0.12 } });
      b(R.lawyer, SB, 'lw', { move: 'whip', sx: 540, sy: 840, fill: 0.7, maxH: 700, st: 'corner-left', pose: 'shock' });
      sfx(R.lawyer, 'rubber_stamp_2', -8); }

    // ---- screen micro-moments (CTAs) + comment bubble ----
    cfg.cta.forEach(c => {
      if (c.k === 'heart') { E.push({ id: 'heart', type: 'heart', layer: 'screen', at: [800, 930], in: O(c.at, '-0.05'), out: O(c.at, '+1.15'), props: { s: 1 } }); sfx(c.at, 'heartbeat_1', -8, 0.9); }
      if (c.k === 'sig') { E.push({ id: 'sig', type: 'sig', layer: 'screen', at: [420, 640], in: O(c.at, '+0.1'), out: O(c.at, '+1.5'), props: { dur: 0.8, label: 'SIGNED WITHOUT READING?' } }); sfx(O(c.at, '+0.1'), 'pop_1', -10, 0.4); }
      if (c.k === 'send') { E.push({ id: 'plane', type: 'plane', layer: 'screen', at: [540, 960], in: O(c.at, '-0.05'), out: O(c.at, '+1.2'), props: { dur: 0.9, from: [-230, 250], to: [280, -330], s: 1.5 } }, { id: 'sendtx', type: 'text', layer: 'screen', at: [820, 440], in: O(c.at, '+0.15'), out: O(c.at, '+1.2'), props: { lines: [[['SEND', 'gold']]], size: 70 } }); sfx(c.at, 'swoosh_2', -9, 1.0); }
      if (c.k === 'follow') { E.push({ id: 'mag', type: 'mag', layer: 'screen', at: [830, 1010], in: O(c.at, '-0.05'), out: O(c.at, '+1.45'), props: { press: 0.5 } }, { id: 'btn', type: 'follow', layer: 'screen', at: [830, 1010], scale: 0.8, in: O(c.at, '-0.05'), out: O(c.at, '+1.45'), props: { press: 0.5 } }); PO.push([O(c.at, '-0.1'), 'follow', { target: [830, 1010] }], [O(c.at, '+1.5'), 'talk']); sfx(O(c.at, '+0.5'), 'click_1', -8, 0.3); sfx(O(c.at, '+0.58'), 'success_chime_1', -12, 1.0); }
    });
    E.push({ id: 'ask', type: 'bubble', layer: 'screen', at: [600, 1090], in: R.ask, out: R.askEnd, props: { l1: cfg.ask[0], l2: cfg.ask[1], size: 52, tail: 'left' } });
    b(R.loop, SB, ['hook2', 'sus0', 'tl0'], { move: 'whip', sx: 540, sy: 880, fill: 0.98, maxH: 900, st: STK, pose: 'shock' });
    b(R.ask, PF, ['hook2', 'sus0'], { sy: 880, pose: 'talk' });
    sfx(R.loop, 'rewind_2', -11, 0.9); sfx(R.ask, 'pop_1', -9, 0.5);

    // ---- HUD ----
    E.push({ id: 'hud', type: 'hud', layer: 'screen', at: [0, 0], in: -1, props: { labels: cfg.labels, items: cfg.items } });

    const lab = cfg.labels || [{ at: -1, text: 'THE LOAN' }, { at: R.pitch, text: 'THE PITCH' }, { at: O(R.trick, '-0.25'), text: 'THE TRICK' }, { at: O(R.doj, '-0.2'), text: 'THE MATH' }, { at: O(R.crowd, '-0.2'), text: 'THE SCALE' }, { at: O(R.shield, '-0.2'), text: 'THE SHIELD' }, { at: O(R.board, '+0.2'), text: 'THE EVIDENCE' }, { at: O(R.arrest, '-0.2'), text: 'THE SENTENCE' }];
    const itm = cfg.items || [{ at: 0, label: 'BORROWED', to: 500, prefix: '$', dur: 0.6 }, { at: R.p650, label: 'PAPERWORK SAID', to: 650, prefix: '$', dur: 0.5 }, { at: R.fee, label: 'FEE EVERY PAYDAY', to: 150, prefix: '$', dur: 0.5 }, { at: R.never, label: 'STILL OWED', to: 500, prefix: '$', dur: 0.5 }, { at: R.dojNum, label: 'ONE BORROWER PAID', to: 1925, prefix: '$', dur: 1.3 }, { at: R.p700, label: 'RATE A YEAR (ABOUT)', to: 700, suffix: '%', prefix: '~', dur: 0.9 }, { at: R.four, label: 'BORROWERS (AT LEAST)', to: 4500000, dur: 1.0 }, { at: R.rev3, label: 'REVENUE (OVER)', to: 3500000000, prefix: '$', dur: 1.3 }, { at: R.shamAt, label: 'TRIBE-OWNED FOR REAL', to: 0, dur: 0.4 }, { at: R.board, label: 'PIECES OF EVIDENCE', to: 4, dur: 0.6 }, { at: R.arrest, label: 'YEAR ARRESTED', to: 2016, commas: false, dur: 0.6 }, { at: R.c14, label: 'COUNTS: GUILTY ON', to: 14, dur: 0.6 }, { at: R.m200, label: 'MONTHS IN PRISON', to: 200, dur: 0.7 }, { at: R.loop, label: 'BORROWED', to: 500, prefix: '$', dur: 0.5 }];
    E.find(e => e.id === 'hud').props = { labels: lab, items: itm };
    BM2.scene({
      series: 'decoded', title: 'CASE FILE Nº 027 · TUCKER', duration: cfg.duration,
      footnote: ['CONVICTED OCT 2017 · SENTENCED JAN 2018 · SOURCES: DOJ SDNY', 'ILLUSTRATIONS: LOAN FORM · CALENDAR · RACE CAR · CLAW (GENERIC)', 'PHOTO: LEVEL 5 MOTORSPORTS · CC BY-SA 2.0 · VIA WIKIMEDIA COMMONS'],
      elements: E, beats: T, poses: PO, shakes: SH, captions: cfg.captions,
      bed: { name: 'verdict_bed_2', gain: -1 }, sfx: S,
    });
  };
})();
TUCKER({
  duration: 82.9,
  hook: { lines: [[['LENT ', 'paper'], ['$500', 'gold']], [['TOOK ', 'paper'], ['~$2,000', 'bad']]], size: 104, tile: '$500 LOAN' },
  hookBeats: [['@$500', {}], ['@grand', { fill: 1.1 }]],
  R: {
    hookEnd: '@who', hookRing: '@grand', loopIn: '@fine',
    who: '@who', whoName: '@scott', whoString: '@tucker', whoRing: '@scott+0.3', onlineIn: '@online',
    def: '@payday#2', defLoan: '@means', defPay: '@paycheck', defMid: '@who#3', defExtra: '@broke',
    pitch: '@his', borrow: '@500', p650: '@650',
    trick: "@here's", renewed: '@renewed', every: '@every',
    cal: '@each', fee: '@150', pd: ['@150', '@150+0.4', '@150+0.8', '@150+1.2', '@150+1.6', '@150+2.0'], pdEnd: '@150+2.3', never: '@never', neverEnd: '@down+0.4',
    rent: '@so', rentWord: '@rent',
    doj: '@one', dojNum: '@925',
    rate: '@prosecutors', p700: '@700', rateAfter: '@send',
    crowd: '@at', four: '@four',
    rev: '@pulled', rev3: '@three',
    race0: '@spent', raceDrive: '@some#2', raceOwn: '@race',
    shield: '@when', claimed: '@tribes', sue: '@states#2', shamAt: '@sham',
    board: '@follow+0.2', boardTight: '@up',
    arrest: '@arrested', jury: '@jury', convicted: '@convicted', c14: '@14', sentenced: '@sentenced', m200: '@200', y16: '@16',
    noShamPB: true,
    loop: '@fine', ask: '@read', askEnd: '@word+0.5',
  },
  cta: [{ k: 'heart', at: '@tap' }, { k: 'send', at: '@send' }, { k: 'follow', at: '@follow' }],
  ask: ['READ IT OR SKIP IT?', 'ONE WORD'],
  captions: { emph: { '$500': 'accent', '$650': 'accent', '$1,925': 'bad', '150': 'bad', '14': 'bad', '200': 'bad', '700': 'bad', million: 'bad', billion: 'bad', sham: 'bad', convicted: 'bad', arrested: 'bad' }, gap: 16 },
});
