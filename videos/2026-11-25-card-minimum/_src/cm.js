// ===== Card minimum v3 (CRIME-SHOW / What If pass) — recurring YOU + live month strip + shrinking bars + flying calendar pages + the kid. =====
// you        : YOU (orange hoodie player from the What If cast) holding the credit card. moods [{t,m}], age 0..1 (grey temples, tired eyes), tag.
// monthstrip : LIVE number from frame 0 (screen layer): MONTH n · OWE $x + the payment bar split (red INTEREST vs thin green YOUR DEBT) from the real simulation;
//              clock knots [[t, month]]; optional fixed-$250 ghost row from fixedAt.
// shrink     : payment bars for months 1..60, each split red interest / green debt (true values) — the minimum shrinks as the balance does.
// pagesfly   : calendar pages flying off, 2026 -> 2043, with a 16.5 YEARS counter.   kid : the baby born that day grows to 16 and drives.   stuff : $5,000 of shopping bags.
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, countAt, hash, hit, wobble } = B;
  const INK = '#0B0F14', NOW = 1e9;
  const SIM = window.CM_SIM;
  const moodAt = (K, t, d = 'neutral') => { let c = { m: d, t: -1e9 }; for (const k of K || []) if (t >= k.t && k.t >= c.t) c = k; return c; };
  const money = (v, d = 0) => '$' + v.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });

  // ---------------------------------------------------------------- YOU holding the card
  B.register('you', {
    defaults: { w: 480, h: 560, moods: [], age: 0, tag: '', label: 'YOU', sub: 'ILLUSTRATION · HOLDING THE CARD', tilt: -0.02, bg: 0, cardAt: -1e9 }, ownEnter: true,
    size: p => [p.w, p.h], anchors: p => ({ face: [0, -p.h * 0.2, p.w * 0.6, p.h * 0.4], card: [p.w * 0.16, p.h * 0.08, p.w * 0.5, p.h * 0.3], all: [0, 0, p.w, p.h] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, k = spring(lt, 'heavy'), mk = moodAt(p.moods, t, 'neutral');
      g.save(); g.translate(0, (1 - k) * 230); g.rotate(p.tilt + (1 - k) * -0.1); g.globalAlpha *= clamp(lt / 0.1);
      paper(g, x0, y0, w, h, 18, { lift });
      const px = x0 + 20, py = y0 + 20, pw = w - 40, ph = h - 40 - 112;
      g.save(); rr(g, px, py, pw, ph, 10); g.clip(); const bgs = [['#F3E3C3', '#F7C9A0'], ['#D8E8F2', '#BCD7EA'], ['#E8DDF3', '#F3D5E3']][p.bg % 3]; const bg = g.createLinearGradient(0, py, 0, py + ph); bg.addColorStop(0, bgs[0]); bg.addColorStop(1, bgs[1]); g.fillStyle = bg; g.fillRect(px, py, pw, ph);
      g.fillStyle = 'rgba(0,0,0,.08)'; g.fillRect(px, py + ph - 50, pw, 54);
      const cx = px + pw / 2 - 20, by = py + ph - 26, s = pw / 480 * 1.22;
      g.save(); g.translate(cx, by - 135 * s * 0); g.scale(s, s); g.translate(0, 0); const bob = 0;
      // BMCHAR draws with torso bottom at y=0 (figure grows up)
      window.BMCHAR(g, theme, 'you', mk.m, t, { look: mk.look });
      if (p.age > 0) { const a = Math.min(1, p.age); g.fillStyle = rgba('#D9D9DE', 0.9 * a); for (const q of [-1, 1]) { g.beginPath(); g.ellipse(q * 60, -218, 9 + 5 * a, 20 + 8 * a, q * 0.3, 0, 7); g.fill(); } g.strokeStyle = 'rgba(70,40,20,' + 0.55 * a + ')'; g.lineWidth = 3.5; g.lineCap = 'round'; for (const q of [-1, 1]) { g.beginPath(); g.arc(q * 25, -172, 15, 0.25 * Math.PI, 0.75 * Math.PI); g.stroke(); } }
      g.restore();
      // the credit card he holds up (navy, no bank name)
      const cardIn = t - p.cardAt, ck = cardIn < -1e8 ? 1 : spring(Math.max(0, cardIn), 'bouncy');
      g.save(); g.translate(cx + 86 * s, by - 74 * s + (1 - ck) * 60); g.rotate(-0.18 + Math.sin(t * 1.4) * 0.025); g.scale(0.5 + 0.5 * ck, 0.5 + 0.5 * ck);
      const cw = 190 * s, ch = 120 * s; B.shadowed(g, () => rr(g, -cw / 2, -ch / 2, cw, ch, 14 * s), theme.navy, 0.4); const lg = g.createLinearGradient(-cw / 2, -ch / 2, cw / 2, ch / 2); lg.addColorStop(0, '#4a64a0'); lg.addColorStop(1, '#1a2744'); g.fillStyle = lg; rr(g, -cw / 2, -ch / 2, cw, ch, 14 * s); g.fill();
      clay(g, -cw / 2 + 18 * s, -ch / 2 + 30 * s, 34 * s, 26 * s, 5, '#F2B705', { shadowK: 0.3 }); txt(g, '•••• •••• ••••', -cw / 2 + 18 * s, ch / 2 - 30 * s, F.monoX(15 * s), theme.paper, 'left'); txt(g, 'YOU', cw / 2 - 18 * s, ch / 2 - 14 * s, F.mono(12 * s), rgba(theme.paper, 0.7), 'right');
      g.fillStyle = '#F1C29A'; g.strokeStyle = INK; g.lineWidth = 3; g.beginPath(); g.arc(-cw / 2 + 4 * s, ch / 2 - 6 * s, 20 * s, 0, 7); g.fill(); g.stroke(); g.restore();
      g.restore();
      g.strokeStyle = 'rgba(11,15,20,.3)'; g.lineWidth = 2; rr(g, px, py, pw, ph, 10); g.stroke();
      const ty = py + ph + 12; g.fillStyle = theme.navy; rr(g, px, ty, pw, 90, 10); g.fill(); txt(g, p.label, px + pw / 2, ty + 36, F.hero(p.labelSize || 46), theme.paper); txt(g, p.sub, px + pw / 2, ty + 70, F.mono(13), theme.gold);
      if (p.tag) { g.save(); g.translate(-w * 0.26, y0 + 6); g.rotate(-0.1); g.fillStyle = '#C9511F'; g.fillRect(-70, -15, 140, 30); txt(g, p.tag, 0, 1, F.monoX(16), theme.paper); g.restore(); }
      g.restore();
    },
  });

  // ---------------------------------------------------------------- live month strip (screen layer)
  const monthAt = (clock, t) => { let m = clock[0][1]; for (let i = 0; i < clock.length - 1; i++) { const [t0, m0] = clock[i], [t1, m1] = clock[i + 1]; if (t >= t0 && t < t1) { const u = ease.inOut(clamp((t - t0) / Math.max(1e-6, t1 - t0))); return lerp(m0, m1, u); } if (t >= t1) m = m1; } return m; };
  B.register('monthstrip', {
    defaults: { clock: [[0, 1]], fixedAt: NOW, fixedDur: 2.2, x: 360, y: 296, w: 630 }, ownEnter: true, size: () => [10, 10],
    draw(g, p, env) {
      const { t, theme } = env, mo = Math.max(0, Math.min(198, Math.round(monthAt(p.clock, t)))), row = SIM.min[Math.max(1, mo) - 1], bal = mo === 0 ? 5000 : SIM.min[mo - 1][0], intr = row[1], pay = row[2], debt = pay - intr, w = p.w, fx = t >= p.fixedAt;
      const h = fx ? 148 : 96; g.save(); g.translate(p.x, p.y); g.fillStyle = 'rgba(11,15,20,.84)'; rr(g, 0, 0, w, h, 12); g.fill();
      txt(g, 'MONTHS PAID', 18, 22, F.mono(15), rgba(theme.gold, 0.95), 'left'); txt(g, String(mo), 18, 60, F.hero(44), theme.paper, 'left');
      txt(g, 'STILL OWE', w - 18, 22, F.mono(15), rgba(theme.gold, 0.95), 'right'); txt(g, money(Math.round(bal)), w - 18, 58, F.hero(44), bal < 3000 ? theme.good : theme.paper, 'right');
      txt(g, 'PAYMENT ' + money(pay, 2), w / 2 + 40, 22, F.mono(15), rgba(theme.paper, 0.85));
      // bar split, true proportions
      const bx = 150, bw = w - 300, by = 40, bh = 22, ri = bw * intr / pay; g.fillStyle = 'rgba(245,243,238,.12)'; rr(g, bx, by, bw, bh, 11); g.fill();
      g.save(); rr(g, bx, by, bw, bh, 11); g.clip(); g.fillStyle = theme.bad; g.fillRect(bx, by, ri, bh); g.fillStyle = theme.good; g.fillRect(bx + ri + 2, by, bw - ri - 2, bh); g.restore();
      txt(g, 'INTEREST ' + money(intr, 2), bx - 8, by + 11, F.mono(13), theme.bad, 'right'); txt(g, 'DEBT −' + money(debt, 2), bx + bw + 8, by + 11, F.mono(13), theme.good, 'left');
      if (fx) { const u = ease.out(clamp((t - p.fixedAt) / 0.4)), fm = Math.max(0, Math.min(26, Math.round(lin(t, p.fixedAt, p.fixedAt + p.fixedDur) * 26))), fb = fm === 0 ? 5000 : SIM.fix[fm - 1]; g.save(); g.globalAlpha *= u; g.fillStyle = 'rgba(31,163,102,.18)'; rr(g, 8, 94, w - 16, 46, 10); g.fill(); txt(g, 'FIXED $250 · MONTH ' + fm, 22, 118, F.monoX(20), theme.good, 'left'); txt(g, fb === 0 ? '✓ PAID OFF' : money(Math.round(fb)), w - 22, 118, F.hero(32), fb === 0 ? theme.good : theme.paper, 'right'); g.restore(); }
      g.restore();
    },
  });

  // ---------------------------------------------------------------- shrinking payment bars
  const SHR = [1, 12, 24, 36, 48, 60];
  B.register('shrink', {
    defaults: { at: NOW, per: 0.42, w: 940, h: 700, labelAt: NOW }, size: p => [p.w, p.h],
    anchors: p => ({ bars: [0, 60, p.w * 0.94, p.h * 0.6], head: [0, -p.h / 2 + 70, p.w * 0.8, 110], last: [p.w * 0.36, 90, 150, p.h * 0.5] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 22, { lift });
      g.save(); rr(g, x0, y0, w, h, 22); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 130); g.restore();
      txt(g, 'THE MINIMUM SHRINKS', 0, y0 + 48, F.hero(56), theme.paper); txt(g, 'AS YOUR BALANCE SHRINKS', 0, y0 + 98, F.cap(30), theme.gold);
      const bw = (w - 120) / SHR.length, base = y0 + h - 100, maxBar = h - 130 - 100 - 70;
      SHR.forEach((mo, i) => { const o = t - (p.at + i * p.per); if (o <= 0) return; const k = spring(o, 'snappy'), row = SIM.min[mo - 1], pay = row[2], intr = row[1], bh = maxBar * pay / 143.17 * k, ih = bh * intr / pay, cx = x0 + 60 + bw * (i + 0.5);
        g.save(); g.globalAlpha *= clamp(o / 0.08); clay(g, cx - bw * 0.36, base - bh, bw * 0.72, bh, 10, theme.bad, { shadowK: 0.3 }); g.fillStyle = theme.good; g.save(); rr(g, cx - bw * 0.36, base - bh, bw * 0.72, bh, 10); g.clip(); g.fillRect(cx - bw * 0.36, base - bh + ih, bw * 0.72, bh - ih); g.restore();
        g.restore(); g.save(); g.globalAlpha *= clamp(o / 0.12); txt(g, money(pay, 0), cx, base - bh - 26, F.hero(40), i === SHR.length - 1 ? theme.badInk : theme.ink); txt(g, 'MO ' + mo, cx, base + 32, F.monoX(20), theme.inkSoft); g.restore(); });
      g.fillStyle = theme.rule; g.fillRect(x0 + 40, base + 2, w - 80, 4);
      const ln = t - p.labelAt; if (ln > -0.02) { const kk = spring(Math.max(0, ln), 'snappy'); g.save(); g.translate(0, y0 + h - 34 + (1 - kk) * 20); g.globalAlpha *= clamp(ln / 0.1); txt(g, '■ INTEREST   ■ YOUR DEBT', 0, 0, F.mono(17), theme.inkSoft); g.restore(); }
    },
  });

  // ---------------------------------------------------------------- calendar pages flying off, 2026 -> 2043
  B.register('pagesfly', {
    defaults: { at: NOW, per: 0.15, n: 17, y0: 2026, w: 760, h: 900, big: 16.5, endAt: NOW }, size: p => [p.w, p.h],
    anchors: p => ({ counter: [0, -p.h / 2 + 90, p.w * 0.9, 170], page: [0, 60, 560, 560], end: [0, p.h / 2 - 90, p.w * 0.9, 120] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, y0 = -h / 2, cur = t < p.at ? 0 : Math.min(p.n, Math.floor((t - p.at) / p.per) + 1);
      const page = (yr, ox, oy, rot, a, sc) => { g.save(); g.translate(ox, oy + 80); g.rotate(rot); g.scale(sc, sc); g.globalAlpha *= a; paper(g, -270, -270, 540, 540, 20, { lift: lift * (a > 0.9 ? 1 : 0.3) }); g.save(); rr(g, -270, -270, 540, 540, 20); g.clip(); g.fillStyle = theme.navy; g.fillRect(-270, -270, 540, 100); g.restore();
        for (let i = 0; i < 2; i++) { g.fillStyle = INK; g.beginPath(); g.arc(-90 + i * 180, -266, 10, 0, 7); g.fill(); } txt(g, yr === p.y0 ? 'TODAY' : 'YEAR ' + (yr - p.y0), -240, -220, F.monoX(30), theme.paper, 'left'); txt(g, String(yr), 0, 10, F.hero(210), yr === p.y0 + p.n ? theme.badInk : theme.ink); g.fillStyle = theme.rule; for (let r = 0; r < 3; r++) for (let c = 0; c < 9; c++) { g.beginPath(); g.arc(-200 + c * 50, 170 + r * 28, 5, 0, 7); g.fill(); } g.restore(); };
      // pages beneath (next two) then the top page and the flyers
      const topYr = p.y0 + Math.min(cur, p.n); for (let j = 2; j >= 1; j--) page(topYr + j, j * 10, -j * 12, j * 0.02, 1, 1 - j * 0.02);
      page(topYr, 0, 0, 0, 1, 1);
      for (let k = Math.max(0, cur - 4); k < cur; k++) { const u = clamp((t - (p.at + (k) * p.per)) / 0.55); if (u >= 1) continue; const e = ease.out(u); page(p.y0 + k, e * 620 * (k % 2 ? 1 : -1.05), -e * 920, e * (k % 2 ? 1.1 : -1.0), 1 - e, 1 + 0.15 * e); }
      // counter
      const yrs = Math.min(p.big, cur / p.n * p.big), done = cur >= p.n; g.save(); g.translate(0, y0 + 82); const cf = F.hero(150); g.font = cf; const cw = B.rollWidth(g, p.big, { font: cf, decimals: 1 }).w + g.measureText(' YEARS').width; g.shadowColor = 'rgba(0,0,0,.45)'; g.shadowBlur = 16; roll(g, yrs, -cw / 2, 0, { font: cf, size: 150, color: done ? theme.bad : theme.paper, decimals: 1, suffix: ' YEARS', align: 'left', speed: cur > 0 && !done ? 9 : 0 }); g.restore();
      if (done) { const dn = t - (p.at + p.n * p.per); burst(g, 0, y0 + 82, 280, theme.bad, dn - 0.05, 18, 0.55); }
    },
  });

  // ---------------------------------------------------------------- the kid born that day
  B.register('kid', {
    defaults: { w: 740, h: 700, growAt: NOW, growDur: 1.0, driveAt: NOW, label: 'BORN THE DAY YOU STARTED' }, size: p => [p.w, p.h],
    anchors: p => ({ age: [0, -p.h / 2 + 150, p.w * 0.6, 200], kid: [p.w * 0.14, 90, p.w * 0.4, p.h * 0.55] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, k = spring(lt, 'heavy'); g.save(); g.translate(0, (1 - k) * 160); g.globalAlpha *= clamp(lt / 0.1);
      paper(g, x0, y0, w, h, 22, { lift }); g.save(); rr(g, x0, y0, w, h, 22); g.clip(); const bg = g.createLinearGradient(0, y0, 0, y0 + h); bg.addColorStop(0, '#CFE8F5'); bg.addColorStop(1, '#F7E7B0'); g.fillStyle = bg; g.fillRect(x0, y0, w, h); g.fillStyle = '#7FBF8F'; g.fillRect(x0, y0 + h - 110, w, 120); g.restore();
      txt(g, p.label, 0, y0 + 50, F.cap(36), theme.ink);
      const gu = clamp((t - p.growAt) / p.growDur), age = Math.round(16 * ease.inOut(gu)), teen = gu > 0.55;
      g.save(); g.translate(0, y0 + 140); txt(g, 'AGE', -70, 36, F.cap(40), theme.inkSoft); txt(g, String(age), 70, 40, F.hero(130), age >= 16 ? theme.badInk : theme.ink); g.restore();
      // YOU (older) on the left
      g.save(); g.translate(x0 + 180, y0 + h - 70); g.scale(0.78, 0.78); window.BMCHAR(g, theme, 'you', age >= 16 ? 'worried' : 'think', t, {}); g.fillStyle = rgba('#D9D9DE', 0.85); for (const q of [-1, 1]) { g.beginPath(); g.ellipse(q * 60, -218, 14, 28, q * 0.3, 0, 7); g.fill(); } g.restore();
      txt(g, 'YOU', x0 + 180, y0 + h - 22, F.hero(34), theme.ink);
      // the kid
      g.save(); g.translate(x0 + w - 230, y0 + h - 70); const gs = lerp(0.62, 1.08, ease.inOut(gu)); g.scale(gs, gs);
      window.BMBUST(g, { skin: '#F1CDA8', hair: '#B07A3A', hairStyle: teen ? 'short' : 'short', suit: teen ? '#7B52C9' : '#9EDCF0', shirt: teen ? '#F5F3EE' : '#F5F3EE', tie: null, s: 1, tt: t, mood: age >= 16 ? 'cheer' : 'cheer' });
      if (!teen) { g.fillStyle = '#F2B705'; g.beginPath(); g.arc(34, -152, 12, 0, 7); g.fill(); g.strokeStyle = INK; g.lineWidth = 3; g.stroke(); }
      const dn = t - p.driveAt; if (dn > -0.05) { const dk = spring(Math.max(0, dn), 'bouncy'); g.save(); g.translate(0, -60); g.scale(0.4 + 0.6 * dk, 0.4 + 0.6 * dk); g.strokeStyle = '#2b2f36'; g.lineWidth = 14; g.beginPath(); g.arc(0, 0, 56, 0, 7); g.stroke(); g.lineWidth = 9; g.beginPath(); g.moveTo(-56, 0); g.lineTo(56, 0); g.moveTo(0, 0); g.lineTo(0, 56); g.stroke(); g.fillStyle = '#2b2f36'; g.beginPath(); g.arc(0, 0, 14, 0, 7); g.fill(); g.restore(); }
      g.restore();
      if (dn > 0) { const sk = spring(dn, 'bouncy'); g.save(); g.translate(x0 + w - 150, y0 + 220); g.rotate(0.1); g.scale(sk, sk); clay(g, -90, -26, 180, 52, 8, '#1FA366', { shadowK: 0.4 }); txt(g, 'LEARNING TO DRIVE', 0, 2, F.monoX(17), theme.paper); g.restore(); }
      g.restore();
    },
  });

  // ---------------------------------------------------------------- $5,000 of stuff (shopping bags)
  B.register('stuff', {
    defaults: { w: 460, h: 520, at: NOW, per: 0.1, label: '$5,000 OF STUFF' }, size: p => [p.w, p.h],
    anchors: p => ({ pile: [0, 20, p.w * 0.9, p.h * 0.6], label: [0, p.h / 2 - 70, p.w * 0.9, 100] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, k = spring(lt, 'heavy'); g.save(); g.translate(0, (1 - k) * 160); g.globalAlpha *= clamp(lt / 0.1);
      paper(g, x0, y0, w, h, 20, { lift }); g.save(); rr(g, x0, y0, w, h, 20); g.clip(); g.fillStyle = '#EFE6CF'; g.fillRect(x0, y0, w, h); g.fillStyle = 'rgba(0,0,0,.06)'; g.fillRect(x0, y0 + h - 170, w, 12); g.restore();
      const cols = ['#E0281E', '#2c3e66', '#F2B705', '#1FA366', '#7B52C9'], pos = [[-130, 90, 120, 150, 0], [0, 70, 130, 175, 1], [128, 96, 116, 140, 2], [-60, -50, 112, 140, 3], [60, -60, 108, 130, 4]];
      pos.forEach(([bx, by, bw, bh, ci], i) => { const o = t - (p.at + i * p.per); if (o <= 0) return; const kk = spring(o, 'bouncy'); g.save(); g.translate(bx, by + 60 + (1 - kk) * -240); g.rotate((hash(i * 3.3) - 0.5) * 0.12); g.globalAlpha *= clamp(o / 0.08); clay(g, -bw / 2, -bh / 2, bw, bh, 8, cols[ci], { shadowK: 0.5 });
        g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.arc(-bw * 0.2, -bh / 2, bw * 0.16, Math.PI, 0); g.arc(bw * 0.2, -bh / 2, bw * 0.16, Math.PI, 0); g.stroke(); g.fillStyle = 'rgba(245,243,238,.9)'; g.beginPath(); g.arc(0, 4, bw * 0.2, 0, 7); g.fill(); txt(g, '$', 0, 6, F.hero(bw * 0.28), cols[ci]); g.restore(); });
      txt(g, p.label, 0, y0 + 56, F.hero(60), theme.ink); g.restore();
    },
  });
})();
