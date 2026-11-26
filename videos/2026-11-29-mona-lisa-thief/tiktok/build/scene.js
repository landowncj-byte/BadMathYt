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
// ===== Mona Lisa thief — custom recipes (wall, press, queue, cal2, room, letter, checkers, cuffs, verd2, famous) =====
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, burst, hit, wobble } = B;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const pop = (t, o = 'snappy') => clamp(spring(t, o), 0, 1.25);
  const RED = '#E0281E', GOLD = '#F2B705', WALL = '#6E1F2B', WALL2 = '#4F1520';
  const HAND = s => `italic 800 ${s}px Inter`;
  const imgOf = src => { const im = B.images && B.images[src]; if (!im) throw new Error('lisa: image not preloaded: ' + src); return im; };

  // ---- museum wall background
  function wallBase(g, x0, y0, w, h, th) {
    g.save(); rr(g, x0, y0, w, h, 22); g.clip();
    const lg = g.createLinearGradient(0, y0, 0, y0 + h); lg.addColorStop(0, '#7C2433'); lg.addColorStop(1, WALL2); g.fillStyle = lg; g.fillRect(x0, y0, w, h);
    g.fillStyle = 'rgba(0,0,0,.10)'; for (let i = 0; i < 22; i++) g.fillRect(x0 + i * (w / 22), y0, w / 44, h);
    g.fillStyle = '#2A1218'; g.fillRect(x0, y0 + h - 110, w, 110); g.fillStyle = '#C9A24A'; g.fillRect(x0, y0 + h - 116, w, 8); // floor + rail
    g.fillStyle = 'rgba(255,255,255,.07)'; g.fillRect(x0, y0 + 70, w, 8);
    g.restore(); g.strokeStyle = 'rgba(11,15,20,.4)'; g.lineWidth = 4; rr(g, x0, y0, w, h, 22); g.stroke();
  }
  // ghost rectangle (unfaded wallpaper where the painting hung) + 4 hooks
  function ghost(g, cx, cy, fw, fh, k = 1) {
    g.save(); g.globalAlpha *= k; g.fillStyle = 'rgba(255,225,200,.17)'; g.fillRect(cx - fw / 2, cy - fh / 2, fw, fh); g.strokeStyle = 'rgba(255,225,200,.35)'; g.lineWidth = 3; g.setLineDash([14, 10]); g.strokeRect(cx - fw / 2, cy - fh / 2, fw, fh); g.setLineDash([]);
    g.restore(); return hooks(g, cx, cy, fw, fh);
  }
  function hooks(g, cx, cy, fw, fh) {
    const P = [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([a, b]) => [cx + a * (fw / 2 - 26), cy + b * (fh / 2 - 26)]);
    for (const [x, y] of P) { g.fillStyle = '#E8C46A'; g.beginPath(); g.arc(x, y, 12, 0, 7); g.fill(); g.strokeStyle = '#2A1218'; g.lineWidth = 4; g.stroke(); g.fillStyle = '#2A1218'; g.beginPath(); g.arc(x, y, 4, 0, 7); g.fill(); }
    return P;
  }
  // framed painting (PD reproduction of the Mona Lisa) in a gold frame
  function painting(g, src, cx, cy, fw, fh, o = {}) {
    const im = imgOf(src), b = o.border || 26;
    g.save(); g.translate(cx, cy); if (o.rot) g.rotate(o.rot);
    B.shadowed(g, () => { g.beginPath(); g.rect(-fw / 2, -fh / 2, fw, fh); }, '#B98A25', 0.3);
    const lg = g.createLinearGradient(-fw / 2, -fh / 2, fw / 2, fh / 2); lg.addColorStop(0, '#F0CF73'); lg.addColorStop(0.5, '#B98A25'); lg.addColorStop(1, '#E8C46A'); g.fillStyle = lg; g.fillRect(-fw / 2, -fh / 2, fw, fh);
    g.strokeStyle = '#6B4A10'; g.lineWidth = 3; g.strokeRect(-fw / 2 + 5, -fh / 2 + 5, fw - 10, fh - 10); g.strokeRect(-fw / 2 + b - 4, -fh / 2 + b - 4, fw - 2 * b + 8, fh - 2 * b + 8);
    g.save(); g.beginPath(); g.rect(-fw / 2 + b, -fh / 2 + b, fw - 2 * b, fh - 2 * b); g.clip(); B.drawPhoto(g, im, -fw / 2 + b, -fh / 2 + b, fw - 2 * b, fh - 2 * b, { fx: 0.5, fy: 0.45 }); g.restore();
    g.restore();
  }
  // back-view person: head + hat + body
  function person(g, x, y, s, col, hat, o = {}) {
    g.save(); g.translate(x, y); g.scale(s, s);
    g.fillStyle = col; g.beginPath(); g.moveTo(-34, 0); g.quadraticCurveTo(-36, -80, 0, -88); g.quadraticCurveTo(36, -80, 34, 0); g.closePath(); g.fill(); g.fillStyle = 'rgba(0,0,0,.18)'; g.beginPath(); g.moveTo(0, -88); g.quadraticCurveTo(36, -80, 34, 0); g.lineTo(0, 0); g.closePath(); g.fill();
    g.fillStyle = '#E3BE96'; g.beginPath(); g.arc(0, -112, 24, 0, 7); g.fill();
    g.fillStyle = hat; if (o.bowler !== false) { g.beginPath(); g.arc(0, -120, 24, Math.PI, 0); g.fill(); g.fillRect(-34, -122, 68, 7); } else { g.beginPath(); g.arc(0, -118, 26, Math.PI * 0.95, Math.PI * 2.05); g.fill(); }
    if (o.arm) { g.strokeStyle = col; g.lineWidth = 13; g.lineCap = 'round'; g.beginPath(); g.moveTo(24, -76); g.lineTo(46, -112 - 8 * Math.sin(o.arm)); g.stroke(); g.fillStyle = '#E3BE96'; g.beginPath(); g.arc(48, -118 - 8 * Math.sin(o.arm), 8, 0, 7); g.fill(); }
    g.restore();
  }
  const COATS = ['#2c3e66', '#5a3a1e', '#1E7D4F', '#7a2b25', '#3a4350', '#8a5a2b', '#C9A24A', '#44335e'], HATS = ['#16202e', '#2b1d13', '#1a1a1a', '#3a2a1a'];
  B.lisaPerson = person;

  // ================= wall: painting hangs, gets lifted, empty ghost + hooks, MISSING stamp, painter counts hooks =================
  B.register('wall', {
    defaults: { w: 900, h: 1000, art: '', liftAt: 99999, stampAt: 99999, stampText: 'MISSING', stampSub: '21 AUG 1911', hooks: [], painterAt: 99999, cap: 'SALON CARRÉ · THE LOUVRE', empty: false, hot: null },
    size: p => [p.w, p.h],
    anchors: p => ({ frame: [0, -50, 470, 670], hooks: [0, -50, 470, 670], stamp: [0, 360, 760, 220], painter: [-330, 280, 220, 340] }),
    draw(g, p, env) {
      const { t, lt, theme: th, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, cx = 0, cy = -50, fw = 430, fh = 620;
      B.shadowed(g, () => rr(g, x0, y0, w, h, 22), WALL, lift); wallBase(g, x0, y0, w, h, th);
      txt(g, p.cap, 0, y0 + 44, F.monoX(24), 'rgba(255,225,200,.8)'); txt(g, 'ILLUSTRATION', x0 + w - 24, y0 + 22, F.mono(14), 'rgba(255,225,200,.55)', 'right');
      const lifted = p.empty || t >= p.liftAt;
      if (lifted) { const k = p.empty ? 1 : ease.out(lin(t, p.liftAt + 0.2, p.liftAt + 0.5)); ghost(g, cx, cy, fw, fh, k); }
      else { const sway = 0.004 * Math.sin(t * 1.5); hooks(g, cx, cy, fw, fh); painting(g, p.art, cx, cy, fw, fh, { rot: sway }); }
      if (!p.empty && t >= p.liftAt && t < p.liftAt + 0.9) { const u = lin(t, p.liftAt, p.liftAt + 0.9), e = ease.in(u); painting(g, p.art, cx + 760 * e, cy + 60 * e, fw * (1 - 0.3 * e), fh * (1 - 0.3 * e), { rot: 0.5 * e }); }
      // hook numbers 1..4
      const HP = [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([a, b]) => [cx + a * (fw / 2 - 26), cy + b * (fh / 2 - 26)]);
      p.hooks.forEach((ht, i) => { const o = t - ht; if (o < 0) return; const k = pop(o, 'bouncy'); g.save(); g.translate(HP[i][0], HP[i][1]); g.scale(k, k); g.strokeStyle = RED; g.lineWidth = 8; g.beginPath(); g.arc(0, 0, 36, 0, 7); g.stroke(); g.fillStyle = RED; g.beginPath(); g.arc(46, -42, 22, 0, 7); g.fill(); txt(g, String(i + 1), 46, -41, F.hero(30), '#fff'); g.restore(); });
      // painter
      if (t >= p.painterAt) { const o = t - p.painterAt, k = pop(o, 'heavy'); g.save(); g.translate(-325 - (1 - k) * 160, 330); g.globalAlpha = clamp(o / 0.1);
        person(g, 0, 0, 1.5, '#1b5e8a', '#C0392B', { bowler: false, arm: 1 + Math.sin(o * 6) }); g.fillStyle = '#F5F3EE'; rr(g, -64, 12, 128, 38, 8); g.fill(); txt(g, 'A PAINTER', 0, 31, F.cap(21), th.ink); g.restore(); }
      if (t >= p.stampAt) { g.save(); g.translate(0, 360); B.crimeStamp(g, th, t, { text: p.stampText, at: p.stampAt, size: 92, rot: -0.07, x: 0, y: 0 }); txt(g, p.stampSub, 0, 118 * clamp((t - p.stampAt) / 0.2), F.hero(66), '#F5F3EE'); g.restore(); }
    },
  });

  // ================= press: newspaper front pages showing the empty wall =================
  function miniWall(g, x, y, w, h) { g.save(); g.translate(x, y); g.fillStyle = '#7C2433'; g.fillRect(-w / 2, -h / 2, w, h); g.fillStyle = 'rgba(255,225,200,.28)'; g.fillRect(-w * 0.22, -h * 0.36, w * 0.44, h * 0.72); g.fillStyle = '#E8C46A'; for (const a of [-1, 1]) for (const b of [-1, 1]) { g.beginPath(); g.arc(a * w * 0.17, b * h * 0.29, 6, 0, 7); g.fill(); } g.strokeStyle = '#0B0F14'; g.lineWidth = 3; g.strokeRect(-w / 2, -h / 2, w, h); g.restore(); }
  B.register('press', {
    defaults: { w: 940, h: 1000, at: 99999, closedAt: 99999, closedText: 'CLOSED · 1 WEEK', heads: [['THE DAILY', 'STOLEN!', 'MONA LISA GONE'], ['LE JOURNAL', 'VOLÉE !', 'LA JOCONDE A DISPARU'], ['IL GIORNALE', 'RUBATA!', 'LA GIOCONDA SCOMPARSA']] },
    size: p => [p.w, p.h],
    draw(g, p, env) {
      const { t, theme: th } = env, pos = [[-230, -80, -0.09], [230, -50, 0.07], [0, 230, -0.02]], tint = ['#F1E8CF', '#EADFC0', '#F4EFE0'];
      p.heads.forEach((hd, i) => { const o = t - (p.at + i * 0.42); if (o < 0) return; const k = pop(o, 'heavy'), [x, y, r] = pos[i]; g.save(); g.translate(x + (i === 1 ? 1 : -1) * (1 - k) * 700 * (i === 2 ? 0 : 1), y + (i === 2 ? (1 - k) * 700 : 0)); g.rotate(r + (1 - k) * 0.5); g.globalAlpha = clamp(o / 0.08);
        const W = 420, H = 540; paper(g, -W / 2, -H / 2, W, H, 6, { fill: tint[i], lift: 0.3 }); g.fillStyle = '#0B0F14'; g.fillRect(-W / 2 + 18, -H / 2 + 18, W - 36, 8); txt(g, hd[0], 0, -H / 2 + 62, F.hero(40), '#0B0F14'); g.fillRect(-W / 2 + 18, -H / 2 + 92, W - 36, 3);
        txt(g, hd[1], 0, -H / 2 + 158, F.hero(i === 0 ? 96 : 92), RED); txt(g, hd[2], 0, -H / 2 + 224, F.cap(21), '#0B0F14'); miniWall(g, 0, 22, W - 70, 190); txt(g, 'THE EMPTY WALL', 0, 142, F.mono(15), '#59606B');
        g.fillStyle = 'rgba(11,15,20,.35)'; for (let j = 0; j < 4; j++) { g.fillRect(-W / 2 + 22, 170 + j * 22, 160, 8); g.fillRect(20, 170 + j * 22, 180, 8); } g.restore(); });
      txt(g, 'ILLUSTRATION · NOT REAL FRONT PAGES', 0, p.h / 2 - 16, F.mono(16), th.paper);
      if (t >= p.closedAt) { const o = t - p.closedAt, k = pop(o, 'heavy'); g.save(); g.translate(0, -p.h / 2 + 55 - (1 - k) * 200); g.rotate(-0.04); const W = 700; paper(g, -W / 2, -62, W, 124, 12, { fill: '#F5F3EE', lift: 0.5 }); g.strokeStyle = RED; g.lineWidth = 8; rr(g, -W / 2 + 10, -52, W - 20, 104, 8); g.stroke(); txt(g, p.closedText, 0, 4, F.hero(86), RED); g.restore(); }
    },
  });

  // ================= queue: crowd stares at the blank spot =================
  B.register('queue', {
    defaults: { w: 940, h: 940, at: 99999, cap: 'PEOPLE QUEUED TO STARE', sub: 'AT A BLANK WALL' }, size: p => [p.w, p.h],
    draw(g, p, env) {
      const { t, theme: th, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2;
      B.shadowed(g, () => rr(g, x0, y0, w, h, 22), WALL, lift); wallBase(g, x0, y0, w, h, th); ghost(g, 0, -150, 360, 520);
      txt(g, 'ILLUSTRATION', x0 + w - 24, y0 + 22, F.mono(14), 'rgba(255,225,200,.55)', 'right');
      // ropes
      g.strokeStyle = '#C9A24A'; g.lineWidth = 8; g.beginPath(); g.moveTo(-330, 150); g.lineTo(330, 150); g.stroke();
      for (const x of [-330, 0, 330]) { g.fillStyle = '#C9A24A'; g.beginPath(); g.arc(x, 150, 14, 0, 7); g.fill(); g.fillRect(x - 4, 150, 8, 90); }
      // three rows of people, appear in waves
      const rows = [[300, 1.0, 9], [380, 1.2, 8], [470, 1.45, 6]];
      rows.forEach(([y, s, n], r) => { for (let i = 0; i < n; i++) { const idx = r * 10 + i, appear = p.at + idx * 0.05, o = t - appear; if (o < 0) continue; const k = pop(o, 'bouncy'), x = (i - (n - 1) / 2) * (w - 140) / n + (B.hash(idx) - 0.5) * 24; g.save(); g.globalAlpha = clamp(o / 0.1); person(g, x, y + (1 - k) * 80, s, COATS[idx % COATS.length], HATS[idx % HATS.length], { arm: (idx % 5 === 0) ? t * 3 : 0 }); g.restore(); } });
      const o = t - (p.at + 0.2); if (o > 0) { g.save(); g.globalAlpha = clamp(o / 0.15); g.translate(0, y0 + h - 70); paper(g, -410, -62, 820, 124, 12, { lift: 0.4 }); txt(g, p.cap, 0, -18, F.hero(52), th.ink); txt(g, p.sub, 0, 30, F.hero(52), RED); g.restore(); }
    },
  });

  // ================= cal2: tear-off calendar AUG 1911 → DEC 1913, 2 YEARS 4 MONTHS, NO CLUE =================
  B.register('cal2', {
    defaults: { w: 800, h: 950, at: 99999, dur: 2.6, clueAt: 99999, head: 'MISSING SINCE 21 AUG 1911' }, size: p => [p.w, p.h],
    anchors: p => ({ head: [0, -p.h / 2 + 70, p.w, 140], sheet: [0, -140, p.w * 0.8, 420], count: [0, p.h / 2 - 330, p.w * 0.9, 190], clue: [0, p.h / 2 - 120, 700, 200] }),
    draw(g, p, env) {
      const { t, theme: th, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift });
      g.save(); rr(g, x0, y0, w, h, 26); g.clip(); g.fillStyle = RED; g.fillRect(x0, y0, w, 124); g.restore(); for (const x of [-190, 190]) clay(g, x - 12, y0 - 26, 24, 60, 10, th.ink, { shadowK: 0.3 });
      txt(g, p.head, 0, y0 + 64, F.hero(56), th.paper); txt(g, 'ILLUSTRATION', x0 + w - 26, y0 + 22, F.mono(13), 'rgba(245,243,238,.75)', 'right');
      const u = clamp(lin(t, p.at, p.at + p.dur)), n = Math.floor(28 * ease.inOut(u) + 1e-6), mn = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'], mi = 7 + n, mo = mn[mi % 12], yr = 1911 + Math.floor(mi / 12);
      const frac = (28 * ease.inOut(u)) % 1, flipping = u > 0 && u < 1;
      // sheet
      g.save(); g.translate(0, y0 + 330); paper(g, -270, -170, 540, 340, 14, { lift: 0.2, fill: '#fff' });
      g.save(); g.beginPath(); g.rect(-270, -170, 540, 340); g.clip(); if (flipping) { g.save(); g.translate(0, -170); g.scale(1, 1 - frac); g.fillStyle = '#EDE7D8'; g.fillRect(-270, 0, 540, 340); g.restore(); }
      txt(g, mo, 0, -50, F.hero(150), th.ink); txt(g, String(yr), 0, 80, F.mono(64), RED); g.restore(); g.restore();
      // counter
      const m = Math.min(28, n), yy = Math.floor(m / 12), mm = m % 12, ca = clamp(lin(t, p.at, p.at + 0.2));
      g.save(); g.globalAlpha = ca; txt(g, 'NO CLUE', 0, y0 + 590, F.cap(30), th.inkSoft); txt(g, yy + ' YEAR' + (yy === 1 ? '' : 'S') + ' ' + mm + ' MONTH' + (mm === 1 ? '' : 'S'), 0, y0 + 670, F.hero(76), u >= 1 ? RED : th.ink); g.restore();
      if (u >= 1) { const o = t - p.at - p.dur; g.save(); g.translate(0, 0); B.crimeStamp(g, th, t, { text: 'NO CLUE', at: p.clueAt, size: 96, rot: -0.09, x: 0, y: y0 + h - 110 }); g.restore(); }
      else txt(g, 'POLICE: NO SUSPECT, NO PAINTING', 0, y0 + h - 70, F.mono(21), th.inkSoft);
    },
  });

  // ================= room: his small Paris flat, painting wrapped, frame corner peeks =================
  B.register('room', {
    defaults: { w: 900, h: 950, art: '', peekAt: 99999, cap: 'HIS PARIS FLAT' }, size: p => [p.w, p.h],
    anchors: p => ({ bundle: [150, 170, 300, 330], room: [0, 0, p.w, p.h] }),
    draw(g, p, env) {
      const { t, theme: th, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; B.shadowed(g, () => rr(g, x0, y0, w, h, 22), '#C7A57A', lift);
      g.save(); rr(g, x0, y0, w, h, 22); g.clip(); const lg = g.createLinearGradient(0, y0, 0, y0 + h); lg.addColorStop(0, '#D8BB92'); lg.addColorStop(1, '#B58F63'); g.fillStyle = lg; g.fillRect(x0, y0, w, h);
      g.fillStyle = 'rgba(80,50,20,.10)'; for (let i = 0; i < 12; i++) g.fillRect(x0 + i * 78, y0, 38, h); g.fillStyle = '#6B4423'; g.fillRect(x0, y0 + h - 190, w, 190); g.fillStyle = 'rgba(0,0,0,.2)'; g.fillRect(x0, y0 + h - 190, w, 10);
      // window with night
      g.fillStyle = '#16294a'; g.fillRect(-340, y0 + 120, 250, 330); g.fillStyle = '#F5F3EE'; for (const [sx, sy] of [[-300, 190], [-230, 250], [-150, 170], [-270, 330], [-180, 390]]) { g.beginPath(); g.arc(sx, y0 + sy, 4, 0, 7); g.fill(); } g.fillStyle = '#F2E6B0'; g.beginPath(); g.arc(-150, y0 + 220, 28, 0, 7); g.fill(); g.fillStyle = '#16294a'; g.beginPath(); g.arc(-138, y0 + 212, 26, 0, 7); g.fill();
      g.strokeStyle = '#4a2f17'; g.lineWidth = 12; g.strokeRect(-340, y0 + 120, 250, 330); g.beginPath(); g.moveTo(-215, y0 + 120); g.lineTo(-215, y0 + 450); g.moveTo(-340, y0 + 285); g.lineTo(-90, y0 + 285); g.stroke();
      // bed
      g.fillStyle = '#4a2f17'; g.fillRect(-400, y0 + h - 330, 430, 24); g.fillRect(-400, y0 + h - 330, 24, 250); g.fillStyle = '#2c3e66'; g.beginPath(); g.roundRect(-376, y0 + h - 420, 380, 110, 24); g.fill(); g.fillStyle = '#F5F3EE'; g.beginPath(); g.roundRect(-372, y0 + h - 450, 120, 56, 22); g.fill();
      // table + lamp
      g.fillStyle = '#4a2f17'; g.fillRect(250, y0 + h - 360, 190, 18); g.fillRect(262, y0 + h - 342, 14, 160); g.fillRect(412, y0 + h - 342, 14, 160); g.fillStyle = '#2b2f36'; g.fillRect(335, y0 + h - 440, 6, 80); g.fillStyle = '#F2B705'; g.beginPath(); g.moveTo(306, y0 + h - 440); g.lineTo(370, y0 + h - 440); g.lineTo(354, y0 + h - 490); g.lineTo(322, y0 + h - 490); g.closePath(); g.fill();
      const glow = g.createRadialGradient(338, y0 + h - 430, 10, 338, y0 + h - 380, 300); glow.addColorStop(0, 'rgba(255,230,150,.33)'); glow.addColorStop(1, 'rgba(255,230,150,0)'); g.fillStyle = glow; g.fillRect(x0, y0, w, h);
      g.restore();
      // the wrapped bundle (leans against the wall)
      g.save(); g.translate(150, y0 + h - 320); g.rotate(0.06); const bw = 270, bh = 420; g.fillStyle = '#9C7A4F'; g.beginPath(); g.roundRect(-bw / 2, -bh / 2, bw, bh, 8); g.fill(); g.strokeStyle = '#6B4F2A'; g.lineWidth = 5; g.beginPath(); g.moveTo(-bw / 2, -40); g.lineTo(bw / 2, -40); g.moveTo(-bw / 2, 90); g.lineTo(bw / 2, 90); g.moveTo(0, -bh / 2); g.lineTo(0, bh / 2); g.stroke();
      const pk = ease.out(lin(t, p.peekAt, p.peekAt + 0.5)); if (pk > 0) { g.save(); g.beginPath(); g.moveTo(-bw / 2, -bh / 2); g.lineTo(-bw / 2 + 170 * pk, -bh / 2); g.lineTo(-bw / 2, -bh / 2 + 220 * pk); g.closePath(); g.clip(); painting(g, p.art, 0, 0, bw, bh, { border: 20 }); g.restore(); g.strokeStyle = '#6B4F2A'; g.lineWidth = 4; g.beginPath(); g.moveTo(-bw / 2 + 170 * pk, -bh / 2); g.lineTo(-bw / 2, -bh / 2 + 220 * pk); g.stroke(); }
      g.restore();
      g.fillStyle = '#F5F3EE'; rr(g, -250, y0 + h - 82, 500, 56, 10); g.fill(); txt(g, p.cap, 0, y0 + h - 53, F.hero(40), th.ink); txt(g, 'ILLUSTRATION', x0 + w - 24, y0 + 22, F.mono(14), th.inkSoft, 'right');
    },
  });

  // ================= letter: handwritten, 500,000 LIRE circled =================
  B.register('letter', {
    defaults: { w: 800, h: 960, at: 99999, circleAt: 99999, homeAt: 99999, lines: ['Florence, Nov. 1913', 'Dear Sir,', 'I have the Mona Lisa.'], money: '500,000 LIRE', home: 'It should go home to Italy.' }, size: p => [p.w, p.h],
    anchors: p => ({ money: [0, 120, p.w * 0.8, 130], date: [0, -p.h / 2 + 130, p.w * 0.7, 80], paper: [0, 0, p.w, p.h] }),
    draw(g, p, env) {
      const { t, theme: th, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 8, { fill: '#F3EAD0', lift: lift + 0.3 });
      g.save(); rr(g, x0, y0, w, h, 8); g.clip(); g.strokeStyle = 'rgba(70,100,160,.22)'; g.lineWidth = 2; for (let y = y0 + 130; y < y0 + h; y += 62) { g.beginPath(); g.moveTo(x0, y); g.lineTo(x0 + w, y); g.stroke(); } g.restore();
      txt(g, 'ILLUSTRATION · NOT THE REAL LETTER', 0, y0 + h - 26, F.mono(16), th.inkSoft);
      const ink = '#1d2b4f'; let y = y0 + 104; const lines = p.lines;
      lines.forEach((s, i) => { const on = t - (p.at + i * 0.45); if (on < 0) return; const n = Math.floor(clamp(on / 0.4) * s.length); g.save(); g.translate(x0 + 60, y + i * 70 + Math.sin(i * 2) * 3); g.rotate(-0.012 * i); txt(g, s.slice(0, n), 0, 0, HAND(i === 0 ? 34 : 40), ink, 'left'); g.restore(); });
      const my = 100, mon = t - (p.at + lines.length * 0.45); if (mon > -0.1) { const k = pop(mon + 0.1, 'snappy'); g.save(); g.translate(0, my); g.rotate(-0.025); g.scale(0.6 + 0.4 * k, 0.6 + 0.4 * k); g.globalAlpha = clamp((mon + 0.1) / 0.1); txt(g, p.money, 0, 0, F.hero(124), ink); g.restore(); }
      const cu = ease.out(lin(t, p.circleAt, p.circleAt + 0.55)); if (cu > 0) { g.save(); g.translate(0, my); g.strokeStyle = RED; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); const tw = mw(p.money, F.hero(124)) / 2 + 38, th2 = 98, N = 60, M = Math.floor(N * cu); for (let i = 0; i <= M; i++) { const a = -2.4 + (i / N) * (Math.PI * 2 + 0.4), r = 1 + 0.03 * Math.sin(a * 3); const x = Math.cos(a) * tw * r, yv = Math.sin(a) * th2 * r; i ? g.lineTo(x, yv) : g.moveTo(x, yv); } g.stroke(); g.restore(); }
      const hn = t - p.homeAt; if (hn > 0) { const n = Math.floor(clamp(hn / 0.7) * p.home.length); g.save(); g.translate(x0 + 60, my + 190); g.rotate(-0.015); txt(g, p.home.slice(0, n), 0, 0, HAND(40), ink, 'left'); g.restore(); }
      if (hn > 0.9) { g.save(); g.translate(x0 + w - 60, y0 + h - 130); g.rotate(-0.05); txt(g, '— V.', 0, 0, HAND(54), ink, 'right'); g.restore(); }
    },
  });

  // ================= checkers: dealer + Uffizi director check the painting with magnifiers (hotel) =================
  B.register('checkers', {
    defaults: { w: 940, h: 960, art: '', at: 99999, realAt: 99999, cap: 'HOTEL · FLORENCE' }, size: p => [p.w, p.h],
    anchors: p => ({ art: [0, 10, 330, 480], left: [-300, 130, 280, 520], right: [300, 130, 280, 520], stamp: [0, -250, 700, 200] }),
    draw(g, p, env) {
      const { t, lt, theme: th, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; B.shadowed(g, () => rr(g, x0, y0, w, h, 22), '#2B3A55', lift);
      g.save(); rr(g, x0, y0, w, h, 22); g.clip(); const lg = g.createLinearGradient(0, y0, 0, y0 + h); lg.addColorStop(0, '#3C5280'); lg.addColorStop(1, '#22304D'); g.fillStyle = lg; g.fillRect(x0, y0, w, h); g.fillStyle = 'rgba(255,255,255,.05)'; for (let i = 0; i < 14; i++) g.fillRect(x0 + i * 70, y0, 30, h); g.fillStyle = '#5a3a1e'; g.fillRect(x0, y0 + h - 250, w, 250); g.fillStyle = 'rgba(0,0,0,.25)'; g.fillRect(x0, y0 + h - 250, w, 10); g.restore();
      g.fillStyle = '#F5F3EE'; rr(g, -190, y0 + 28, 380, 62, 10); g.fill(); g.strokeStyle = th.gold; g.lineWidth = 4; rr(g, -184, y0 + 34, 368, 50, 8); g.stroke(); txt(g, p.cap, 0, y0 + 60, F.hero(36), th.ink); txt(g, 'ILLUSTRATION', x0 + w - 24, y0 + 22, F.mono(14), 'rgba(255,255,255,.55)', 'right');
      // table
      g.fillStyle = '#7a4a22'; g.fillRect(-380, y0 + h - 260, 760, 34); g.fillStyle = '#4a2f17'; g.fillRect(-340, y0 + h - 226, 20, 200); g.fillRect(320, y0 + h - 226, 20, 200);
      const k = pop(t - p.at + 0.3, 'heavy'); g.save(); g.translate(0, (1 - k) * 300); painting(g, p.art, 0, y0 + h - 520, 330, 480, { rot: 0 }); g.restore();
      // men
      const man = (x, side, coat, hat, tag, bob) => { g.save(); g.translate(x, y0 + h - 230 + bob); const s = 2.1; g.scale(s, s);
        g.fillStyle = coat; g.beginPath(); g.moveTo(-50, 0); g.quadraticCurveTo(-52, -100, 0, -108); g.quadraticCurveTo(52, -100, 50, 0); g.closePath(); g.fill(); g.fillStyle = '#F5F3EE'; g.beginPath(); g.moveTo(-14, -104); g.lineTo(0, -70); g.lineTo(14, -104); g.closePath(); g.fill();
        g.fillStyle = '#E3BE96'; g.beginPath(); g.arc(0, -132, 28, 0, 7); g.fill(); g.fillStyle = '#0B0F14'; for (const q of [-1, 1]) { g.beginPath(); g.arc(q * 10 + side * 3, -134, 3.2, 0, 7); g.fill(); }
        if (tag === 'D') { g.fillStyle = '#2b1d13'; g.beginPath(); g.arc(0, -142, 28, Math.PI, 0); g.fill(); g.fillRect(-38, -144, 76, 7); g.strokeStyle = '#2b1d13'; g.lineWidth = 6; g.beginPath(); g.moveTo(-12, -117); g.quadraticCurveTo(0, -110, 12, -117); g.stroke(); }
        else { g.fillStyle = '#d9d9d9'; g.beginPath(); g.arc(0, -150, 24, Math.PI, 0); g.fill(); g.beginPath(); g.moveTo(-20, -112); g.quadraticCurveTo(0, -80, 20, -112); g.fill(); g.strokeStyle = '#0B0F14'; g.lineWidth = 2.5; for (const q of [-1, 1]) { g.beginPath(); g.arc(q * 10, -134, 8, 0, 7); g.stroke(); } }
        g.restore(); };
      man(-300, 1, '#1E7D4F', 'D', 'D', 2 * Math.sin(t * 2)); man(300, -1, '#16202e', 'U', 'U', 2 * Math.sin(t * 2 + 1));
      // magnifiers sweeping over the painting
      const mg = (side, ph) => { const x = side * (60 + 70 * Math.sin(t * 2.2 + ph)), y = y0 + h - 520 + 110 * Math.sin(t * 1.6 + ph * 2), r = 62; g.save(); g.translate(x, y); g.strokeStyle = '#2b2f36'; g.lineWidth = 16; g.beginPath(); g.moveTo(r * 0.7, r * 0.7); g.lineTo(side * -1 * -190, 260); g.stroke(); g.fillStyle = 'rgba(255,255,255,.22)'; g.beginPath(); g.arc(0, 0, r, 0, 7); g.fill(); g.strokeStyle = th.gold; g.lineWidth = 12; g.stroke(); g.restore(); };
      if (t > p.at + 0.4) { mg(-1, 0); mg(1, 2); }
      // labels
      const lab = (x, s) => { g.fillStyle = th.navy; rr(g, x - 150, y0 + h - 330, 300, 62, 10); g.fill(); txt(g, s, x, y0 + h - 298, F.hero(34), th.paper); };
      lab(-300, 'THE ART DEALER'); lab(300, 'UFFIZI DIRECTOR');
      if (t >= p.realAt) { g.save(); B.crimeStamp(g, th, t, { text: "IT'S REAL", at: p.realAt, tone: 'good', size: 100, rot: -0.08, x: 0, y: y0 + 200 }); g.restore(); }
    },
  });

  // ================= cuffs: handcuffs + MID-DEC 1913 =================
  B.register('cuffs', {
    defaults: { w: 820, h: 720, at: 99999, stampAt: 99999, big: 'MID-DEC 1913', small: 'FLORENCE · HIS HOTEL' }, size: p => [p.w, p.h],
    anchors: p => ({ cuffs: [0, -40, 600, 330], date: [0, p.h / 2 - 150, p.w * 0.9, 190] }),
    draw(g, p, env) {
      const { t, theme: th, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift });
      g.save(); rr(g, x0, y0, w, h, 26); g.clip(); g.fillStyle = th.navy; g.fillRect(x0, y0, w, 112); g.restore(); txt(g, 'THE ARREST', x0 + 40, y0 + 58, F.hero(64), th.paper, 'left'); txt(g, 'ILLUSTRATION', x0 + w - 28, y0 + 24, F.mono(14), 'rgba(245,243,238,.7)', 'right');
      const o = t - p.at, k = pop(o, 'heavy'); g.save(); g.translate(0, y0 + 300); g.globalAlpha = clamp(o / 0.1); g.scale(0.6 + 0.4 * k, 0.6 + 0.4 * k); g.rotate(-0.12 * (1 - k) - 0.03);
      const ring = (cx) => { g.strokeStyle = '#59606B'; g.lineWidth = 34; g.beginPath(); g.arc(cx, 0, 92, 0, 7); g.stroke(); g.strokeStyle = '#C9CED6'; g.lineWidth = 12; g.beginPath(); g.arc(cx, 0, 92, 3.6, 5.4); g.stroke(); g.fillStyle = '#3a4350'; g.beginPath(); g.roundRect(cx - 34, -150, 68, 70, 12); g.fill(); g.fillStyle = '#0B0F14'; g.beginPath(); g.arc(cx, -118, 8, 0, 7); g.fill(); };
      g.strokeStyle = '#59606B'; g.lineWidth = 16; g.setLineDash([32, 8]); g.beginPath(); g.moveTo(-140, -10); g.lineTo(140, -10); g.stroke(); g.setLineDash([]); ring(-190); ring(190); g.restore();
      const dk = pop(t - p.at - 0.3, 'snappy'); g.save(); g.globalAlpha = clamp((t - p.at - 0.3) / 0.12); g.translate(0, y0 + h - 150 + (1 - dk) * 24); txt(g, p.big, 0, 0, F.hero(112), RED); txt(g, p.small, 0, 76, F.monoX(26), th.inkSoft); g.restore();
      if (t >= p.stampAt) { g.save(); B.crimeStamp(g, th, t, { text: 'ARRESTED', at: p.stampAt, size: 78, rot: -0.12, x: 150, y: y0 + 250 }); g.restore(); }
    },
  });

  // ================= verd2: 1 YEAR 15 DAYS, SERVED < 1 YEAR, FOR ITALY =================
  B.register('verd2', {
    defaults: { w: 800, h: 840, guiltyAt: 99999, termAt: 99999, servedAt: 99999, claimAt: 99999, venue: 'FLORENCE · 1914' }, size: p => [p.w, p.h],
    anchors: p => ({ head: [0, -p.h / 2 + 70, p.w, 140], term: [0, -60, p.w * 0.92, 300], served: [0, 215, p.w * 0.9, 190], claim: [0, p.h / 2 - 100, p.w * 0.9, 100] }),
    draw(g, p, env) {
      const { t, theme: th, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift });
      g.save(); rr(g, x0, y0, w, h, 26); g.clip(); g.fillStyle = th.navy; g.fillRect(x0, y0, w, 128); g.restore(); txt(g, 'THE VERDICT', x0 + 40, y0 + 64, F.hero(68), th.paper, 'left'); txt(g, p.venue, x0 + w - 34, y0 + 28, F.monoX(20), th.gold, 'right');
      const gt = t - p.guiltyAt; if (gt > 0) { const sc = 1 + 1.2 * (1 - ease.expo(clamp(gt / 0.2))); g.save(); g.globalAlpha = clamp(gt / 0.08); g.translate(0, y0 + 205); g.rotate(-0.05); g.scale(sc, sc); txt(g, 'GUILTY', 0, 0, F.hero(84), RED); g.restore(); burst(g, 0, y0 + 205, 240, th.bad, gt - 0.1, 16, 0.5); }
      const tt = t - p.termAt; if (tt > 0) { const sc = 1 + 1.1 * (1 - ease.expo(clamp(tt / 0.22))); g.save(); g.globalAlpha = clamp(tt / 0.08); g.translate(0, y0 + 345); g.scale(sc, sc); txt(g, '1 YEAR', 0, 0, F.hero(170), th.ink); txt(g, '15 DAYS', 0, 152, F.hero(130), RED); B.marker(g, -190, 232, 380, 9, RED, clamp((tt - 0.3) / 0.3), 0.9); g.restore(); burst(g, 0, y0 + 400, 320, th.bad, tt - 0.12, 20, 0.55); }
      const sv = t - p.servedAt; if (sv > 0) { g.save(); B.crimeStamp(g, th, t, { text: 'SERVED < 1 YEAR', at: p.servedAt, size: 62, rot: -0.07, x: -110, y: y0 + 690 }); g.restore(); }
      const cl = t - p.claimAt; if (cl > 0) { const k = pop(cl, 'snappy'); g.save(); g.globalAlpha = clamp(cl / 0.12); g.translate(0, y0 + h - 56 + (1 - k) * 20); txt(g, 'HIS EXCUSE: “I DID IT FOR ITALY”', 0, 0, F.cap(31), th.inkSoft); g.restore(); }
    },
  });

  // ================= famous: the painting on a wall, crowds + camera flashes =================
  B.register('famous', {
    defaults: { w: 940, h: 1060, art: '', at: 99999, cap1: 'THE MOST FAMOUS', cap2: 'PAINTING IN THE WORLD' }, size: p => [p.w, p.h],
    anchors: p => ({ art: [0, -150, 420, 610], banner: [0, p.h / 2 - 150, p.w * 0.94, 260] }),
    draw(g, p, env) {
      const { t, lt, theme: th, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; B.shadowed(g, () => rr(g, x0, y0, w, h, 22), WALL, lift); wallBase(g, x0, y0, w, h, th);
      
      const k = pop(lt - 0.05, 'heavy'); g.save(); g.translate(0, (1 - k) * -30); painting(g, p.art, 0, -150, 410, 600); g.restore();
      txt(g, 'ILLUSTRATION · PD REPRODUCTION', x0 + w - 24, y0 + 22, F.mono(13), 'rgba(255,225,200,.55)', 'right');
      for (let r = 0; r < 2; r++) for (let i = 0; i < 9 - r; i++) { const idx = r * 10 + i, ap = p.at + idx * 0.035 - 0.3 + 1e-3, o = t - ap; if (o < -9) continue; const x = (i - (8 - r) / 2) * 98 + (B.hash(idx + 5) - 0.5) * 20; const yy = 250 + r * 110; g.save(); person(g, x, yy + 130, 1.15 + r * 0.25, COATS[(idx + 2) % COATS.length], HATS[idx % HATS.length], { arm: (idx % 3 === 0) ? t * 4 : 0 }); g.restore();
        if (idx % 4 === 1) { const fl = hit(((t * 2.1 + idx * 0.37) % 1.3) - 0.1, 14) * (t > p.at ? 1 : 0); if (fl > 0.02) { g.fillStyle = 'rgba(255,255,255,' + 0.9 * fl + ')'; g.beginPath(); g.arc(x + 40, yy - 20, 26 + 30 * fl, 0, 7); g.fill(); } } }
      const bn = t - p.at; if (bn > 0) { const kk = pop(bn, 'heavy'); g.save(); g.translate(0, y0 + h - 110 + (1 - kk) * 200); g.globalAlpha = clamp(bn / 0.1); paper(g, -430, -100, 860, 200, 16, { lift: 0.5 }); txt(g, p.cap1, 0, -40, F.hero(80), th.ink); txt(g, p.cap2, 0, 40, F.hero(72), RED); g.restore(); }
    },
  });
})();
// ===== Mona Lisa thief — CRIME-SHOW generator (RULES 112). One story, three cuts: each cut passes cfg (word refs in cfg.R). =====
// Appended after: tucker shared.js (heart/plane/mag...), wine_bits.js, shared2.js (hud), crime.js, lisa_bits.js
(function () {
  const B = window.BM2;
  const SB = 'side-by-side', GH = 'graphic-hero', ZN = 'zoom-on-number', PF = 'presenter-front', PK = 'peek', PB = 'pull-back';
  const P1 = 'brand/photos/vincenzo-peruggia/1.jpg', P2 = 'brand/photos/vincenzo-peruggia/2.jpg', ART = 'brand/photos/mona-lisa-painting/1.jpg';
  const SUS = { src: P1, crop: [0, 0, 1, 1], fx: 0.52, fy: 0.32, aspect: 1.1 };
  const SUS2 = { src: P2, crop: [0.47, 0.235, 0.44, 0.44], fx: 0.5, fy: 0.4, aspect: 1.05 };
  const SUSP = { src: P2, crop: [0.07, 0.197, 0.37, 0.48], fx: 0.5, fy: 0.4, aspect: 1.1 };
  const NAME = { name: 'VINCENZO PERUGGIA', nick: '“THE LOUVRE INSIDER”', nameSize: 38 };
  const CRED = 'PARIS POLICE · PUBLIC DOMAIN · VIA WIKIMEDIA COMMONS';
  const STK = { x: 915, y: 1385, s: 0.95 };

  window.LISA = function (cfg) {
    const R = cfg.R, E = [], T = [], S = [], SH = [], PO = [];
    const stn = i => [(i % 6) * 2100, Math.floor(i / 6) * 2100];
    let si = 1; const seg = () => { const o = stn(si); si++; return o; };
    const b = (at, beat, focus, o = {}) => T.push(Object.assign({ at, beat, focus }, o));
    const sfx = (at, name, gain = -9, dur = 0.5) => S.push({ at, name, gain, dur });
    const O = (r, d) => { d = parseFloat(d); if (typeof r === 'number') return r + d; const m = String(r).match(/^(.*?)([+-]\d*\.?\d+)?$/), q = (m[2] ? parseFloat(m[2]) : 0) + d; return m[1] + (q ? (q > 0 ? '+' : '') + (+q.toFixed(3)) : ''); };
    const pip = (id, at, out, label, to, o = {}, pos = [880, 1130]) => E.push({ id, type: 'suspect', layer: 'screen', at: pos, in: at, out, props: Object.assign({}, SUS, { variant: 'pip', w: 200, aspect: 1.0, label, flash: true, tilt: 0.03, arrow: { at: O(at, '+0.25'), to } }, o) });
    const LAY = { sx: 540, sy: 840, maxH: 880 };

    // ---- S0 frame 0 (loop target): empty frame + 4 hooks + MISSING stamp + his face ----
    E.push({ id: 'hook', type: 'text', at: [0, -350], in: -1, out: R.hookEnd, props: { lines: cfg.hook.lines, size: cfg.hook.size || 96 } });
    E.push({ id: 'hook2', type: 'text', at: [0, -350], in: R.loopIn, props: { lines: cfg.hook.lines, size: cfg.hook.size || 96 } });
    E.push({ id: 'w0', type: 'wall', at: [-170, 40], in: -1, scale: 0.5, props: { empty: true, art: ART, stampAt: 0.15, stampText: 'MISSING', stampSub: '21 AUG 1911', cap: 'THE LOUVRE · PARIS' } });
    E.push({ id: 'sus0', type: 'suspect', at: [190, 235], in: -1, props: Object.assign({}, SUS, NAME, { w: 330, flash: false, tilt: 0.03, credit: CRED, mono: true, ring: R.hookRing || 99999 }) });
    const F0 = ['hook', 'w0', 'sus0'];
    b(0, SB, F0, { sx: 540, sy: 850, fill: 0.98, maxH: 880, st: STK, pose: 'shock' });
    cfg.hookBeats.forEach(([at, extra]) => b(at, ZN, extra.focus || F0, Object.assign({ fill: 1.0, maxH: 900, sx: 540, sy: 850, st: STK, dur: 0.45 }, extra)));
    sfx(0, 'deep_boom_2', -3); sfx(0.05, 'camera_shutter_1', -8, 0.4); sfx(0.15, 'rubber_stamp_2', -5);

    // ---- WHO ----
    { const [x, y] = seg();
      E.push({ id: 'mug', type: 'suspect', at: [x - 30, y + 20], in: O(R.who, '-0.3'), props: Object.assign({}, SUS, NAME, { variant: 'card', file: true, caseNo: 'CASE FILE Nº 028', w: 500, credit: CRED, tilt: -0.03, push: { at: R.who, dur: 5.0, to: 1.3 }, stringTo: [700, 330], stringAt: R.whoString, ring: R.whoRing }) });
      E.push({ id: 'lv', type: 'text', at: [x + 700, y + 20], in: R.louvre, props: { lines: [[['USED TO', 'paper']], [['WORK AT', 'paper']], [['THE', 'paper']], [['LOUVRE', 'gold']]], size: 88 } });
      E.push({ id: 'dc1', type: 'datecard', layer: 'screen', at: [340, 480], in: O(R.who, '-0.1'), out: O(R.who, '+0.9'), props: { kicker: 'CASE FILE Nº 028 · THE THEFT', big: 'PARIS', small: '1911' } });
      b(R.who, SB, 'mug', { move: 'whip', sx: 540, sy: 960, fill: 0.62, maxH: 700, st: { x: 930, y: 1390, s: 0.85 }, pose: 'shrug' });
      b(R.whoName, ZN, 'mug', { fill: 0.7, maxH: 760, sy: 930, st: 'corner', pose: 'point', dur: 0.5 });
      b(R.louvre, SB, ['mug', 'lv'], { sx: 540, sy: 840, fill: 0.95, maxH: 1000, st: 'corner', pose: 'shock', dur: 0.8 });
      sfx(R.who, 'camera_shutter_2', -8, 0.4); sfx(O(R.who, '+0.2'), 'paper_slam_2', -10); sfx(R.louvre, 'typewriter_2', -12, 0.8); }

    // ---- THE THEFT: painting lifted off the wall ----
    { const [x, y] = seg();
      E.push({ id: 'wt', type: 'wall', at: [x, y], in: O(R.theft, '-0.4'), props: { art: ART, liftAt: R.lift, stampAt: R.stampT, stampText: 'MISSING', stampSub: '21 AUG 1911' } });
      E.push({ id: 'dc2', type: 'datecard', layer: 'screen', at: [340, 480], in: O(R.theft, '-0.1'), out: O(R.lift, '+0.4'), props: { kicker: cfg.dateKicker || 'THE LOUVRE · CLOSED DAY', big: 'MON 21 AUG', small: '1911 · PARIS' } });
      pip('pipt', R.theft, O(R.stampT, '+0.6'), 'INSIDER', [-400, -300]);
      b(R.theft, GH, 'wt', Object.assign({ move: 'whip', fill: 0.82, st: 'corner-left', pose: 'point' }, LAY, { sx: 450 }));
      b(R.lift, ZN, 'wt.frame', { fill: 0.8, maxH: 600, sy: 840, st: 'corner-left', pose: 'shock', dur: 0.5, sx: 450 });
      b(O(R.lift, '+1.0'), PB, 'wt', Object.assign({ fill: 0.82, st: 'corner', sx: 450 }, LAY));
      sfx(R.theft, 'paper_slam_2', -10); sfx(R.lift, 'swoosh_2', -8, 0.8); sfx(R.stampT, 'rubber_stamp_2', -5); SH.push([R.stampT, 14]); }

    // ---- NEXT DAY: a painter counts four empty hooks ----
    { const [x, y] = seg();
      E.push({ id: 'wd', type: 'wall', at: [x, y], in: O(R.painter, '-0.5'), props: { empty: true, art: ART, painterAt: R.painter, hooks: cfg.hk, stampAt: 99999, cap: 'THE NEXT DAY · THE LOUVRE' } });
      E.push({ id: 'dc3', type: 'datecard', layer: 'screen', at: [340, 480], in: O(R.painter, '-0.1'), out: O(R.painter, '+0.9'), props: { kicker: 'THE NEXT MORNING', big: 'TUE 22 AUG', small: '1911 · PARIS' } });
      b(R.painter, GH, 'wd', Object.assign({ move: 'whip', fill: 0.82, st: 'corner', pose: 'point' }, LAY));
      b(cfg.hk[0], ZN, 'wd.hooks', { fill: 0.8, maxH: 620, sy: 840, st: 'corner', pose: 'shock', dur: 0.5 });
      b(O(cfg.hk[3], '+0.7'), PB, 'wd', Object.assign({ fill: 0.82, st: 'corner' }, LAY));
      cfg.hk.forEach(h => sfx(h, 'pop_2', -9, 0.3)); sfx(R.painter, 'swipe_2', -11, 0.4); }

    // ---- NEWSPAPERS + CLOSED ----
    { const [x, y] = seg();
      E.push({ id: 'pr', type: 'press', at: [x, y], in: R.pressIn || O(R.press, '-0.5'), props: { at: R.press, closedAt: R.closed, closedText: 'CLOSED · 1 WEEK' } });
      b(R.pressIn || R.press, GH, 'pr', Object.assign({ move: 'whip', fill: 0.9, st: 'corner-left', pose: 'point' }, LAY));
      b(R.closed, ZN, 'pr', { fill: 0.8, maxH: 860, sy: 850, st: 'corner-left', pose: 'shock', dur: 0.5 });
      if (R.paper2) b(R.paper2, GH, 'pr', Object.assign({ fill: 0.9, st: 'corner' }, LAY, { dur: 0.7 }));
      sfx(R.closed, 'rubber_stamp_2', -6); for (let i = 0; i < 3; i++) sfx(O(R.press, '+' + (i * 0.42)), 'paper_slam_2', -11, 0.4); }

    // ---- CROWD STARES AT THE BLANK SPOT ----
    { const [x, y] = seg();
      E.push({ id: 'qu', type: 'queue', at: [x, y], in: O(R.queue, '-0.5'), props: { at: R.queue } });
      b(R.queue, GH, 'qu', Object.assign({ move: 'whip', fill: 0.9, st: 'corner-left', pose: 'shock' }, LAY));
      b(O(R.queue, '+1.4'), PB, 'qu', Object.assign({ fill: 0.9, st: 'corner' }, LAY, { dur: 0.8 }));
      sfx(R.queue, 'swoosh_2', -11, 0.9); }

    // ---- NO CLUE: calendar ticks 2 YEARS 4 MONTHS ----
    { const [x, y] = seg();
      E.push({ id: 'cl', type: 'cal2', at: [x - 60, y], in: O(R.cal, '-0.4'), props: { at: R.cal, dur: cfg.calDur, clueAt: R.clue } });
      pip('pipc', R.cal, O(R.clue, '+0.8'), 'NO SUSPECT', [-420, -250]);
      b(R.cal, SB, 'cl', Object.assign({ move: 'whip', fill: 0.84, st: 'corner-left', pose: 'chin' }, LAY, { sx: 500 }));
      b(R.clue, ZN, 'cl.clue', { fill: 0.8, maxH: 760, sy: 900, st: 'corner-left', pose: 'shock', dur: 0.5, sx: 500 });
      b(O(R.clue, '+0.9'), PB, 'cl', Object.assign({ fill: 0.84, st: 'corner', sx: 500 }, LAY));
      for (let i = 0; i < 8; i++) sfx(O(R.cal, '+' + (i * cfg.calDur / 8).toFixed(2)), 'click_1', -14, 0.2); sfx(R.clue, 'rubber_stamp_2', -4); sfx(R.clue, 'deep_boom_2', -8, 0.5); SH.push([R.clue, 12]); }
    if (R.zero) { const [x, y] = seg();
      E.push({ id: 'zl', type: 'text', at: [x, y], in: O(R.zero, '-0.3'), out: R.total, props: { lines: [[['ZERO', 'bad']], [['LEADS', 'paper']]], size: 150, per: 0.2 } });
      E.push({ id: 'zl2', type: 'text', at: [x, y], in: O(R.total, '-0.1'), props: { lines: [[['TOTAL', 'paper']], [['EMBARRASS-', 'gold', 80]], [['MENT', 'gold', 80]]], size: 140, per: 0.2 } });
      b(R.zero, SB, 'zl', { move: 'whip', sx: 540, sy: 840, fill: 0.9, maxH: 900, st: 'corner-left', pose: 'shock' });
      b(R.total, SB, 'zl2', { sx: 540, sy: 840, fill: 0.9, maxH: 900, st: 'corner-left', pose: 'talk', dur: 0.5 });
      sfx(R.zero, 'rubber_stamp_2', -8); sfx(R.total, 'thud_1', -8, 0.4); }

    // ---- HIS SMALL PARIS FLAT ----
    { const [x, y] = seg();
      E.push({ id: 'rm', type: 'room', at: [x, y], in: O(R.room, '-0.4'), props: { art: ART, peekAt: R.peek, cap: 'HIS TINY PARIS FLAT' } });
      pip('pipr', R.room, O(R.peek, '+1.2'), 'HIS FLAT', [-340, -150]);
      b(R.room, GH, 'rm', Object.assign({ move: 'whip', fill: 0.9, st: 'corner-left', pose: 'point' }, LAY));
      b(R.peek, ZN, 'rm.bundle', { fill: 0.4, maxH: 560, sy: 840, st: 'corner-left', pose: 'shock', dur: 0.5 });
      b(O(R.peek, '+1.2'), PB, 'rm', Object.assign({ fill: 0.9, st: 'corner' }, LAY));
      sfx(R.room, 'swoosh_2', -11, 0.8); sfx(R.peek, 'pop_1', -9, 0.4); sfx(R.peek, 'heartbeat_1', -9, 0.9); }

    if (R.twist) { const [x, y] = seg();
      E.push({ id: 'tw1', type: 'text', at: [x, y], in: O(R.twist[0], '-0.3'), out: R.twist[1], props: { lines: [[['SO HOW DID', 'paper']], [['THEY CATCH', 'paper']], [['HIM?', 'gold']]], size: 170, per: 0.15 } });
      E.push({ id: 'tw2', type: 'text', at: [x, y], in: O(R.twist[1], '-0.1'), props: { lines: [[['HE CAUGHT', 'paper']], [['HIMSELF', 'bad']]], size: 200, per: 0.25 } });
      b(R.twist[0], SB, 'tw1', { move: 'whip', sx: 540, sy: 840, fill: 0.9, maxH: 900, st: 'corner-left', pose: 'chin' });
      b(R.twist[1], ZN, 'tw2', { fill: 0.9, maxH: 900, sy: 840, st: 'corner-left', pose: 'shock', dur: 0.5 });
      sfx(R.twist[0], 'swipe_2', -11, 0.4); sfx(R.twist[1], 'cinematic_hit_1', -7, 0.8); SH.push([R.twist[1], 12]); }

    // ---- HE CAUGHT HIMSELF: the letter ----
    { const [x, y] = seg();
      E.push({ id: 'dc4', type: 'datecard', layer: 'screen', at: [340, 480], in: O(R.y13, '-0.1'), out: O(R.letter, '+0.5'), props: { kicker: 'CASE FILE Nº 028 · THE LETTER', big: 'NOV 1913', small: 'TO FLORENCE · ITALY' } });
      E.push({ id: 'lt', type: 'letter', at: [x, y], in: R.letterIn || O(R.letter, '-0.4'), props: { at: R.letterAt || R.letter, circleAt: R.circle, homeAt: R.home || 99999 } });
      pip('pipl', R.letter, O(R.circle, '+2.2'), 'HIS LETTER', [-420, -260]);
      b(R.letterIn || R.letter, GH, 'lt', Object.assign({ move: 'whip', fill: 0.84, st: 'corner-left', pose: 'point' }, LAY, { sx: 500 }));
      b(R.circle, ZN, 'lt.money', { fill: 0.5, maxH: 420, sy: 900, st: 'corner-left', pose: 'shock', dur: 0.5, sx: 520 });
      b(O(R.circle, '+1.6'), PB, 'lt', Object.assign({ fill: 0.84, st: 'corner', sx: 500 }, LAY));
      sfx(R.letter, 'typewriter_2', -11, 2.0); sfx(R.circle, 'paper_slam_2', -9); sfx(R.circle, 'cinematic_hit_1', -10, 0.8); }

    // ---- THE HOTEL: dealer + Uffizi director check the painting ----
    { const [x, y] = seg();
      E.push({ id: 'ck', type: 'checkers', at: [x, y], in: O(R.hotel, '-0.4'), props: { art: ART, at: R.hotel, realAt: R.real } });
      pip('pipk', R.hotel, O(R.real, '+0.8'), 'HIS HOTEL', [380, 250], {}, [190, 560]);
      b(R.hotel, SB, 'ck', Object.assign({ move: 'whip', fill: 0.92, st: 'corner-left', pose: 'point' }, LAY, { sx: 540 }));
      b(R.real, ZN, 'ck.stamp', { fill: 0.84, maxH: 760, sy: 900, st: 'corner-left', pose: 'shock', dur: 0.5 });
      b(O(R.real, '+0.9'), PB, 'ck', Object.assign({ fill: 0.92, st: 'corner' }, LAY));
      sfx(R.hotel, 'swoosh_2', -11, 0.8); sfx(R.real, 'rubber_stamp_2', -5); sfx(R.real, 'ding_2', -9, 0.7); }

    // ---- THE ARREST: cuffs + MID-DEC 1913 + his face X ----
    { const [x, y] = seg();
      E.push({ id: 'sa', type: 'suspect', at: [x - 410, y + 20], in: O(R.arrest, '-0.5'), props: Object.assign({}, SUS, NAME, { w: 440, flash: true, tilt: -0.02, credit: CRED, mono: true, xmark: O(R.arrest, '+0.6'), stamps: [{ text: 'CAUGHT', at: O(R.arrest, '+0.9'), size: 60, x: 0, y: 40, rot: -0.1 }] }) });
      E.push({ id: 'cf', type: 'cuffs', at: [x + 400, y], in: O(R.arrest, '-0.4'), props: { at: R.arrest, stampAt: O(R.arrest, '+0.8') } });
      b(R.arrest, SB, ['sa', 'cf'], { move: 'whip', sx: 540, sy: 860, fill: 0.98, maxH: 1000, st: 'corner', pose: 'shock' });
      b(O(R.arrest, '+0.7'), ZN, 'sa', { fill: 0.6, maxH: 700, sy: 870, st: 'corner', pose: 'shock', dur: 0.5 });
      b(O(R.arrest, '+2.0'), GH, ['sa', 'cf'], { sx: 540, sy: 860, fill: 0.98, maxH: 1000, st: 'corner', pose: 'talk', dur: 0.8 });
      sfx(R.arrest, 'camera_shutter_1', -8, 0.4); sfx(O(R.arrest, '+0.4'), 'thud_1', -8, 0.4); sfx(O(R.arrest, '+0.8'), 'rubber_stamp_2', -6); SH.push([O(R.arrest, '+0.8'), 14]); }

    // ---- EVIDENCE BOARD ----
    { const [x, y] = seg(), bd = R.board;
      E.push({ id: 'board', type: 'board', at: [x, y], in: O(bd, '-0.4'), props: { title: 'EVIDENCE BOARD', caseNo: 'CASE FILE Nº 028', tightAt: R.boardTight, items: [
        { id: 'ph', k: 'photo', src: P1, crop: [0, 0, 1, 1], fx: 0.52, fy: 0.32, x: 0, y: -280, w: 330, h: 410, name: 'VINCENZO PERUGGIA', nameSize: 24, at: O(bd, '-0.2'), rot: -0.02, push: 0.3 },
        { id: 'n1', k: 'note', x: -300, y: 120, w: 270, h: 290, icon: 'cheque', size: 34, lines: [['500,000', 'bad', 38], ['LIRE', 'ink', 28]], at: O(bd, '+0.3'), rot: -0.05 },
        { id: 'n2', k: 'note', x: 0, y: 150, w: 270, h: 290, icon: 'labels', size: 40, lines: [['2 YRS', 'bad'], ['NO CLUE', 'ink', 26]], at: O(bd, '+0.6'), rot: 0.03 },
        { id: 'n3', k: 'note', x: 300, y: 120, w: 270, h: 290, icon: 'cuffs', size: 36, lines: [['MID-DEC', 'bad', 38], ['1913', 'ink', 34]], at: O(bd, '+0.9'), rot: 0.05 },
        { id: 'n4', k: 'note', x: 0, y: 440, w: 700, h: 270, size: 82, lines: [['HIS OWN LETTER', 'bad', 76]], at: O(bd, '+1.2'), rot: -0.02, stamp: { text: 'CAUGHT HIMSELF', at: O(bd, '+1.5'), y: -86, size: 34, rot: -0.04 } } ],
        strings: [[0, 1, O(bd, '+0.5')], [0, 2, O(bd, '+0.8')], [0, 3, O(bd, '+1.1')], [0, 4, O(bd, '+1.4')], [1, 4, O(R.boardTight, '-0.2')], [2, 4, O(R.boardTight, '-0.1')], [3, 4, R.boardTight]] } });
      b(bd, PK, 'board', { move: 'whip', sy: 800, fill: 0.9, maxH: 860, pose: 'chin' });
      b(O(bd, '+0.9'), GH, 'board', { sy: 800, fill: 0.9, maxH: 860, st: 'corner-left', pose: 'point', dur: 0.7 });
      b(R.boardTight, PB, 'board', { fill: 0.86, maxH: 860, sy: 800, st: 'corner-left', dur: 0.6 });
      sfx(bd, 'paper_slam_2', -10); sfx(O(bd, '+0.3'), 'camera_shutter_1', -9, 0.4); sfx(R.boardTight, 'typewriter_1', -12, 1.0); }

    // ---- VERDICT ----
    { const [x, y] = seg();
      E.push({ id: 'sv', type: 'suspect', at: [x - 390, y + 20], in: O(R.verd, '-0.5'), props: Object.assign({}, SUS, NAME, { w: 440, flash: false, tilt: -0.02, credit: CRED, mono: true, stamps: [{ text: 'SENTENCED', at: R.guilty, size: 58, x: 0, y: -10, rot: -0.1 }], bars: R.served }) });
      E.push({ id: 'vd', type: 'verd2', at: [x + 410, y - 20], in: O(R.verd, '-0.5'), props: { guiltyAt: R.guilty, termAt: R.term, servedAt: R.served } });
      b(R.verd, SB, ['sv', 'vd'], { move: 'whip', sx: 540, sy: 860, fill: 0.98, maxH: 960, st: 'corner', pose: 'point' });
      b(R.term, ZN, 'vd.term', { fill: 0.84, maxH: 700, sy: 880, st: 'off', pose: 'shock', dur: 0.45, sx: 540 });
      b(R.served, GH, ['sv', 'vd'], { move: 'whip', sx: 540, sy: 860, fill: 0.98, maxH: 960, st: 'corner', pose: 'talk', dur: 0.8 });
      sfx(R.guilty, 'gavel_1', -4, 0.8); sfx(R.term, 'cinematic_hit_1', -4, 1.0); sfx(R.term, 'deep_boom_1', -5, 1.2); sfx(R.served, 'cell_door_1', -7, 1.0); sfx(R.served, 'rubber_stamp_2', -5); SH.push([R.term, 22], [R.guilty, 12]); }

    // ---- HIS EXCUSE: FOR ITALY (quote card with the front-view crop) ----
    { const [x, y] = seg();
      E.push({ id: 'qc', type: 'suspect', at: [x, y], in: O(R.excuse, '-0.4'), props: Object.assign({}, SUS2, { variant: 'side', w: 800, pw: 360, aspect: 1.1, name: '', quote: ['FOR', 'ITALY'], quoteAt: R.excuse, quoteSize: 120, quoteSub: 'HIS EXCUSE', flash: true, tilt: -0.02, credit: CRED, stamps: [{ text: 'HIS CLAIM', at: O(R.excuse, '+0.9'), size: 50, x: -120, y: 100, rot: -0.1 }], ring: O(R.excuse, '+0.3') }) });
      b(R.excuse, SB, 'qc', { move: 'whip', sx: 540, sy: 820, fill: 0.94, maxH: 640, st: 'corner', pose: 'shrug' });
      sfx(R.excuse, 'camera_shutter_2', -8, 0.4); sfx(O(R.excuse, '+0.3'), 'paper_slam_2', -10); sfx(O(R.excuse, '+0.9'), 'rubber_stamp_2', -7); }

    // ---- FAMOUS ----
    { const [x, y] = seg();
      E.push({ id: 'fm', type: 'famous', at: [x, y], in: O(R.famous, '-0.5'), props: { art: ART, at: R.famousWord } });
      b(R.famous, GH, 'fm', Object.assign({ move: 'whip', fill: 0.92, st: 'corner-left', pose: 'point' }, LAY, { maxH: 960, sy: 830 }));
      b(R.famousWord, ZN, 'fm.banner', { fill: 0.92, maxH: 780, sy: 880, st: 'corner-left', pose: 'shock', dur: 0.6 });
      sfx(R.famous, 'swoosh_2', -11, 0.9); sfx(R.famousWord, 'cinematic_hit_1', -6, 1.0); sfx(R.famousWord, 'camera_shutter_1', -9, 0.4); }
    if (R.recap) { const [x, y] = seg();
      E.push({ id: 'rc', type: 'text', at: [x, y], in: O(R.recap[0], '-0.2'), props: { lines: [[['2 YEARS', 'paper']], [['NO CLUE', 'bad']], [['1 LETTER', 'gold']]], size: 130, per: 0.35 } });
      b(R.recap[0], SB, 'rc', { move: 'whip', sx: 540, sy: 860, fill: 0.78, maxH: 620, st: 'corner-left', pose: 'talk' });
      sfx(R.recap[0], 'thud_1', -8, 0.4); sfx(R.recap[1], 'paper_slam_2', -8); }

    // ---- CTAs + comment bubble ----
    cfg.cta.forEach(c => {
      if (c.k === 'heart') { E.push({ id: 'heart', type: 'heart', layer: 'screen', at: [800, 930], in: O(c.at, '-0.05'), out: O(c.at, '+1.15'), props: { s: 1 } }); sfx(c.at, 'heartbeat_1', -8, 0.9); }
      if (c.k === 'send') { E.push({ id: 'plane', type: 'plane', layer: 'screen', at: [540, 960], in: O(c.at, '-0.05'), out: O(c.at, '+1.2'), props: { dur: 0.9, from: [-230, 250], to: [280, -330], s: 1.5 } }, { id: 'sendtx', type: 'text', layer: 'screen', at: [820, 440], in: O(c.at, '+0.15'), out: O(c.at, '+1.2'), props: { lines: [[['SEND', 'gold']]], size: 70 } }); sfx(c.at, 'swoosh_2', -9, 1.0); }
      if (c.k === 'follow') { E.push({ id: 'mag', type: 'mag', layer: 'screen', at: [830, 1010], in: O(c.at, '-0.05'), out: O(c.at, '+1.45'), props: { press: 0.5 } }, { id: 'btn', type: 'follow', layer: 'screen', at: [830, 1010], scale: 0.8, in: O(c.at, '-0.05'), out: O(c.at, '+1.45'), props: { press: 0.5 } }); PO.push([O(c.at, '-0.1'), 'follow', { target: [830, 1010] }], [O(c.at, '+1.5'), 'talk']); sfx(O(c.at, '+0.5'), 'click_1', -8, 0.3); sfx(O(c.at, '+0.58'), 'success_chime_1', -12, 1.0); }
    });
    E.push({ id: 'ask', type: 'bubble', layer: 'screen', at: [600, 1090], in: R.ask, out: R.askEnd, props: { l1: cfg.ask[0], l2: cfg.ask[1], size: 52, tail: 'left' } });
    b(R.loop, SB, ['hook2', 'w0', 'sus0'], { move: 'whip', sx: 540, sy: 850, fill: 0.98, maxH: 880, st: STK, pose: 'shock' });
    b(R.ask, PF, ['hook2', 'sus0'], { sy: 880, pose: 'talk' });
    sfx(R.loop, 'rewind_2', -11, 0.9); sfx(R.ask, 'pop_1', -9, 0.5);

    // ---- HUD ----
    const lab = [{ at: -1, text: 'THE THEFT' }, { at: O(R.painter, '-0.2'), text: 'THE ALARM' }, { at: O(R.press, '-0.2'), text: 'THE FALLOUT' }, { at: O(R.cal, '-0.2'), text: 'THE COLD TRAIL' }, { at: O(R.y13, '-0.2'), text: 'THE SLIP' }, { at: O(R.hotel, '-0.2'), text: 'THE TRAP' }, { at: O(R.verd, '-0.2'), text: 'THE SENTENCE' }, { at: O(R.famous, '-0.2'), text: 'THE AFTERMATH' }];
    const itm = [{ at: R.cal, label: 'MISSING (MONTHS)', to: 28, dur: cfg.calDur, from: 0 }, { at: R.circle, label: 'HIS ASKING PRICE', to: 500000, suffix: ' LIRE', dur: 0.9, from: 0 }];
    E.push({ id: 'hud', type: 'hud', layer: 'screen', at: [0, 0], in: -1, props: { labels: lab, items: itm } });
    B.scene({
      series: 'decoded', title: 'CASE FILE Nº 028 · PERUGGIA', duration: cfg.duration,
      footnote: ['SENTENCED IN FLORENCE, 1914 · SOURCES: SMITHSONIAN · HISTORY.COM · TIME', 'ILLUSTRATIONS: WALL · NEWSPAPERS · FLAT · LETTER · HOTEL · CUFFS (GENERIC)', 'PHOTOS: PARIS POLICE 1909 · PUBLIC DOMAIN · MONA LISA: PD REPRODUCTION · VIA WIKIMEDIA COMMONS'],
      elements: E, beats: T, poses: PO, shakes: SH, captions: cfg.captions,
      bed: { name: 'noir_bed_1', gain: -1 }, sfx: S,
    });
  };
})();
LISA({
  duration: 80.9,
  hook: { lines: [[['STOLE THE ', 'paper'], ['MONA LISA', 'gold']], [['GOT CAUGHT ', 'paper']], [['ASKING FOR MONEY', 'bad']]], size: 70 },
  hookBeats: [['@mona', {}], ['@money', { fill: 1.1 }]],
  hk: ['@four', '@empty', '@hooks', '@hooks+0.4'],
  calDur: 1.7,
  dateKicker: 'THE LOUVRE · CLOSED DAY',
  R: {
    hookEnd: "@let's", hookRing: '@asking', loopIn: '@stealing',
    who: '@paris', whoName: '@vincenzo', whoString: '@vincenzo+0.4', whoRing: '@perugia+0.2', louvre: '@louvre',
    theft: '@monday', lift: '@walked', stampT: '@arm',
    painter: '@painter',
    pressIn: '@louvre#2', press: '@newspapers', closed: '@shut',
    queue: '@people',
    cal: '@and#3', clue: '@found',
    room: '@where', peek: '@apartment',
    y13: '@1913', letterIn: '@then#2', letterAt: '@greedy', letter: '@wrote', circle: '@500',
    hotel: '@dealer#2', real: '@real',
    arrest: '@so#2', board: '@two#2', boardTight: '@letter',
    excuse: '@excuse', verd: '@court', guilty: '@gave', term: '@one#3', served: '@served',
    famous: '@theft', famousWord: '@famous',
    loop: '@stealing', ask: '@fair', askEnd: '@not+0.4',
  },
  cta: [{ k: 'heart', at: '@heart' }, { k: 'send', at: '@send' }, { k: 'follow', at: '@follow' }],
  ask: ['FAIR?', 'YES OR NO'],
  captions: { emph: { '500,000': 'accent', lire: 'accent', '1911': 'bad', '1913': 'bad', stole: 'bad', police: 'bad', '15': 'bad', real: 'good', greedy: 'bad' }, gap: 16 },
});
