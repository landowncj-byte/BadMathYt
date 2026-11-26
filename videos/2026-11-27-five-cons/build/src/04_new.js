// ===== Five Cons — new recipes: bottles, car, lotto ticket, paydays loop, mail list, ruler =====
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, countAt } = B;
  const tone = (n, p) => B.tone(n, p);
  const pop = (t, o = 'snappy') => clamp(spring(t, o), 0, 1.25);
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const bad = '#E0281E';

  // bottles: a row of wine bottles with year labels. items [{label, at}], fakeAt tints every bottle red + FAKE tape, hot = index to enlarge
  B.register('bottles', {
    defaults: { items: [{ label: '1945', at: 0 }], fakeAt: 99999, s: 1, gap: 150, tape: 'FAKE' }, size: p => [p.items.length * p.gap + 80, 380 * p.s],
    anchors: p => Object.fromEntries(p.items.map((it, i) => ['b' + i, [(i - (p.items.length - 1) / 2) * p.gap, 0, 120 * p.s, 330 * p.s]])),
    draw(g, p, env) {
      const { t, theme } = env, n = p.items.length; const fk = clamp((t - p.fakeAt) / 0.3);
      p.items.forEach((it, i) => { const on = t - it.at; if (on < 0) return; const k = pop(on, 'bouncy'), x = (i - (n - 1) / 2) * p.gap; g.save(); g.translate(x, 0); g.scale(p.s * (0.5 + 0.5 * k), p.s * (0.5 + 0.5 * k)); g.globalAlpha *= clamp(on / 0.1);
        B.shadowed(g, () => { g.beginPath(); g.roundRect(-40, -30, 80, 190, 18); g.roundRect(-14, -150, 28, 130, 8); }, '#152319', 0.3);
        g.fillStyle = '#1a2c20'; g.beginPath(); g.roundRect(-40, -30, 80, 190, 18); g.fill(); g.beginPath(); g.roundRect(-14, -150, 28, 130, 8); g.fill();
        g.fillStyle = 'rgba(255,255,255,.14)'; g.fillRect(-30, -20, 9, 160); g.fillStyle = fk > 0 ? bad : '#7a1b1b'; g.beginPath(); g.roundRect(-16, -158, 32, 26, 5); g.fill();
        g.fillStyle = '#EFE6CF'; g.beginPath(); g.roundRect(-34, 20, 68, 86, 5); g.fill(); g.strokeStyle = '#8a7a50'; g.lineWidth = 2; g.stroke();
        txt(g, it.label, 0, 56, F.hero(it.size || 30), '#2a1d0a'); g.fillStyle = '#2a1d0a'; g.fillRect(-22, 78, 44, 3); g.fillRect(-16, 88, 32, 3);
        if (fk > 0) { g.fillStyle = 'rgba(224,40,30,' + 0.28 * fk + ')'; g.beginPath(); g.roundRect(-40, -30, 80, 190, 18); g.fill(); }
        g.restore(); });
      if (fk > 0) { const kk = pop(t - p.fakeAt); g.save(); g.translate(0, 40); g.rotate(-0.07); g.scale(kk, kk); const w = n * p.gap * 0.7 + 160; g.fillStyle = bad; rr(g, -w / 2, -52, w, 104, 10); g.fill(); txt(g, p.tape, 0, 3, F.hero(78), theme.paper); g.restore(); }
    },
  });

  // car: generic sports car (no livery) with a licence plate
  B.register('car', {
    defaults: { w: 640, plate: 'DIPLOMAT', plateAt: 0, color: '#D4311F', fakeAt: 99999 }, size: p => [p.w, p.w * 0.46],
    anchors: p => ({ plate: [-p.w * 0.02, p.w * 0.1, p.w * 0.2, p.w * 0.085] }),
    draw(g, p, env) {
      const { t, theme } = env, w = p.w, u = w / 640, k = pop(env.lt, 'heavy'); g.save(); g.translate((1 - k) * -300, 0); g.scale(u, u); g.globalAlpha *= clamp(env.lt / 0.1);
      g.fillStyle = 'rgba(0,0,0,.28)'; g.beginPath(); g.ellipse(0, 128, 290, 20, 0, 0, 7); g.fill();
      const ink = '#10161f'; g.lineJoin = 'round';
      g.fillStyle = p.color; g.beginPath(); g.moveTo(-300, 70); g.quadraticCurveTo(-310, 20, -230, 10); g.lineTo(-120, -14); g.quadraticCurveTo(-60, -90, 30, -90); g.quadraticCurveTo(120, -90, 170, -20); g.lineTo(270, 8); g.quadraticCurveTo(310, 24, 306, 70); g.lineTo(300, 96); g.lineTo(-296, 96); g.closePath(); g.fill(); g.strokeStyle = ink; g.lineWidth = 7; g.stroke();
      g.fillStyle = 'rgba(180,225,255,.8)'; g.beginPath(); g.moveTo(-96, -10); g.quadraticCurveTo(-50, -70, 28, -70); g.quadraticCurveTo(100, -70, 136, -14); g.closePath(); g.fill(); g.stroke();
      g.fillStyle = 'rgba(255,255,255,.22)'; g.beginPath(); g.moveTo(-240, 24); g.lineTo(160, 6); g.lineTo(160, 26); g.lineTo(-240, 44); g.fill();
      for (const x of [-170, 168]) { g.fillStyle = ink; g.beginPath(); g.arc(x, 98, 52, 0, 7); g.fill(); g.fillStyle = '#C9CED6'; g.beginPath(); g.arc(x, 98, 28, 0, 7); g.fill(); g.fillStyle = ink; g.beginPath(); g.arc(x, 98, 9, 0, 7); g.fill(); }
      g.fillStyle = '#F5F3EE'; rr(g, -78, 52, 130, 44, 6); g.fill(); g.strokeStyle = ink; g.lineWidth = 4; g.stroke(); g.fillStyle = '#2c3e66'; g.fillRect(-72, 56, 118, 10);
      txt(g, p.plate, -13, 80, F.monoX(20), ink);
      const fk = clamp((t - p.fakeAt) / 0.2); if (fk > 0) { const s = 1 + 1.1 * (1 - ease.expo(fk)); g.save(); g.translate(-13, 74); g.rotate(-0.16); g.scale(s, s); g.fillStyle = 'rgba(245,243,238,.95)'; rr(g, -92, -34, 184, 68, 8); g.fill(); g.strokeStyle = bad; g.lineWidth = 6; rr(g, -88, -30, 176, 60, 6); g.stroke(); txt(g, 'FAKE', 0, 3, F.hero(54), bad); g.restore(); }
      g.restore();
    },
  });

  // lotto: a lottery ticket with six balls + jackpot line; stamp on demand
  B.register('lotto', {
    defaults: { w: 760, h: 440, amount: '$16.5 MILLION', sub: 'ADVERTISED JACKPOT', balls: [4, 15, 22, 31, 40, 9], ballsAt: 0, per: 0.22, stamp: '', stampAt: 99999, stampTone: 'bad', grey: false }, size: p => [p.w, p.h],
    anchors: p => ({ amount: [0, -p.h * 0.14, p.w * 0.9, 140], balls: [0, p.h * 0.2, p.w * 0.9, 110] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; g.save(); g.rotate(-0.02);
      paper(g, x0, y0, w, h, 18, { lift }); g.fillStyle = theme.navy; g.save(); rr(g, x0, y0, w, 86, 18); g.clip(); g.fillRect(x0, y0, w, 86); g.restore();
      txt(g, 'LOTTERY TICKET', 0, y0 + 44, F.hero(48), theme.paper); txt(g, p.sub, 0, y0 + 122, F.monoX(22), theme.inkSoft);
      txt(g, p.amount, 0, y0 + 205, F.hero(p.amountSize || 110), p.grey ? '#8a8f98' : theme.ink);
      p.balls.forEach((n, i) => { const on = t - (p.ballsAt + i * p.per), x = (i - (p.balls.length - 1) / 2) * 110, y = y0 + h - 100; if (on < 0) return; const k = pop(on, 'bouncy'); g.save(); g.translate(x, y); g.scale(k, k);
        g.fillStyle = ['#E0281E', '#2F5DA8', '#F2B705', '#1FA366', '#8A3FD1', '#F28C00'][i % 6]; g.beginPath(); g.arc(0, 0, 42, 0, 7); g.fill(); g.strokeStyle = '#0B0F14'; g.lineWidth = 4; g.stroke(); g.fillStyle = '#F5F3EE'; g.beginPath(); g.arc(0, 0, 24, 0, 7); g.fill(); txt(g, String(n), 0, 2, F.hero(30), '#0B0F14'); g.restore(); });
      g.restore(); if (p.stamp) B.crimeStamp && B.crimeStamp(g, theme, t, { text: p.stamp, at: p.stampAt, tone: p.stampTone, size: 84, rot: -0.12, x: 60, y: 10 });
    },
  });

  // paydays: the loan that never ends. owed tile stays $500; each payday takes a $150 fee; running paid counter
  B.register('paydays', {
    defaults: { w: 1500, h: 640, n: 5, at: 0, per: 0.8, fee: 150, owed: 500, owedLabel: 'STILL OWED', capLabel: 'FEES PAID' }, size: p => [p.w, p.h],
    anchors: p => ({ owed: [-p.w * 0.36, 40, 400, 330], paid: [p.w * 0.34, 40, 460, 330] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 22, { lift });
      g.save(); rr(g, x0, y0, w, 90, 22); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 90); g.restore(); txt(g, 'EVERY PAYDAY', 0, y0 + 46, F.hero(52), theme.paper);
      const n = Math.max(0, Math.min(p.n, Math.floor((t - p.at) / p.per) + 1)); const cw = 170, gap = 18, tot = p.n * (cw + gap) - gap, sx = -tot / 2 + 40;
      for (let i = 0; i < p.n; i++) { const on = t - (p.at + i * p.per), x = sx + i * (cw + gap) + cw / 2 + 120, y = y0 + 330; g.fillStyle = 'rgba(11,15,20,.07)'; rr(g, x - cw / 2, y - 120, cw, 240, 14); g.fill(); txt(g, 'PAYDAY', x, y - 90, F.monoX(20), theme.inkSoft); txt(g, String(i + 1), x, y - 52, F.hero(36), theme.inkSoft);
        if (on > 0) { const k = pop(on, 'bouncy'); g.save(); g.translate(x, y + 20 + (1 - k) * -60); g.globalAlpha *= clamp(on / 0.1); g.fillStyle = bad; rr(g, -cw / 2 + 10, -50, cw - 20, 110, 12); g.fill(); txt(g, '-$' + p.fee, 0, 4, F.hero(52), theme.paper); g.restore(); } }
      g.fillStyle = '#EAF6EF'; rr(g, x0 + 36, y0 + 120, 330, 460, 16); g.fill(); g.strokeStyle = tone('good', true); g.lineWidth = 5; g.stroke(); txt(g, p.owedLabel, x0 + 201, y0 + 168, F.cap(30), theme.inkSoft); txt(g, '$' + p.owed, x0 + 201, y0 + 290, F.hero(110), tone('good', true)); txt(g, 'NEVER MOVES', x0 + 201, y0 + 410, F.monoX(26), theme.inkSoft);
      const paid = p.fee * n; g.fillStyle = '#FBEAE8'; rr(g, x0 + w - 366, y0 + 120, 330, 460, 16); g.fill(); g.strokeStyle = bad; g.lineWidth = 5; g.stroke(); txt(g, p.capLabel, x0 + w - 201, y0 + 168, F.cap(30), theme.inkSoft); txt(g, '$' + paid, x0 + w - 201, y0 + 290, F.hero(110), bad);
    },
  });

  // maillist: customer e-mails that bounce. rows appear fast, each gets a red BOUNCED
  B.register('maillist', {
    defaults: { w: 900, h: 700, at: 0, per: 0.18, rows: 8, bounceAt: 0, title: 'EMAIL TO CUSTOMERS' }, size: p => [p.w, p.h],
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 18, { lift }); g.save(); rr(g, x0, y0, w, 80, 18); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 80); g.restore(); txt(g, p.title, 0, y0 + 42, F.hero(46), theme.paper);
      const names = ['A. SMITH', 'B. JONES', 'C. LEE', 'D. PATEL', 'E. GARCIA', 'F. BROWN', 'G. KIM', 'H. DAVIS', 'I. MILLER', 'J. WILSON'];
      for (let i = 0; i < p.rows; i++) { const on = t - (p.at + i * p.per); if (on < 0) continue; const y = y0 + 126 + i * 62; g.save(); g.globalAlpha *= clamp(on / 0.1); g.fillStyle = 'rgba(11,15,20,.06)'; rr(g, x0 + 30, y - 24, w - 60, 52, 8); g.fill(); txt(g, names[i % 10].toLowerCase().replace(/[^a-z]/g, '') + '@mail.example', x0 + 54, y, F.mono(26), theme.ink, 'left');
        const b = t - (p.bounceAt + i * 0.1); if (b > 0) { const k = pop(b, 'bouncy'); g.save(); g.translate(x0 + w - 130, y); g.scale(k, k); g.fillStyle = bad; rr(g, -88, -22, 176, 44, 8); g.fill(); txt(g, 'NOT REAL', 0, 2, F.cap(26), theme.paper); g.restore(); } g.restore(); }
    },
  });

  // ruler: two years joined by a span with a big number (labels 37 YEARS OLDER)
  B.register('ruler', {
    defaults: { w: 1400, h: 420, from: '1945', to: '1982', n: 37, at: 0, dur: 1.4, fromLabel: 'LABEL SAYS', toLabel: 'FIRST MADE' }, size: p => [p.w, p.h],
    anchors: p => ({ n: [0, -30, 560, 220] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2 + 120, x1 = w / 2 - 120, y = 90; paper(g, -w / 2, -h / 2, w, h, 20, { lift });
      const u = ease.out(lin(t, p.at, p.at + p.dur)); g.strokeStyle = theme.ink; g.lineWidth = 8; g.lineCap = 'round'; g.beginPath(); g.moveTo(x0, y); g.lineTo(x0 + (x1 - x0) * u, y); g.stroke();
      for (let i = 0; i <= 37; i++) { const x = lerp(x0, x1, i / 37); if (i / 37 > u) break; g.lineWidth = i % 5 ? 3 : 5; g.beginPath(); g.moveTo(x, y); g.lineTo(x, y + (i % 5 ? 14 : 26)); g.stroke(); }
      g.fillStyle = tone('good', true); g.beginPath(); g.arc(x0, y, 16, 0, 7); g.fill(); txt(g, p.from, x0, y + 90, F.hero(76), theme.ink); txt(g, p.fromLabel, x0, y + 142, F.monoX(22), theme.inkSoft);
      if (u > 0.98) { g.fillStyle = bad; g.beginPath(); g.arc(x1, y, 16, 0, 7); g.fill(); } txt(g, p.to, x1, y + 90, F.hero(76), theme.ink); txt(g, p.toLabel, x1, y + 142, F.monoX(22), theme.inkSoft);
      const v = Math.round(p.n * u), land = t - (p.at + p.dur); g.save(); g.translate(0, -h / 2 + 130); g.scale(1 + (land > 0 ? 0.08 * (1 - spring(land, { f: 2.4, z: 0.42 })) : 0), 1 + (land > 0 ? 0.08 * (1 - spring(land, { f: 2.4, z: 0.42 })) : 0)); txt(g, v + ' YEARS', 0, 0, F.hero(150), land > 0 ? bad : theme.ink); g.restore();
    },
  });
})();
(function () {
  const B = window.BM2, { clamp, ease, spring, rr, txt, F } = B;
  // beatlabel: small red pill (screen layer, top-right) that names the beat: THE PITCH · THE TRICK · THE CATCH · THE SENTENCE
  B.register('beatlabel', {
    defaults: { text: 'THE PITCH', n: '' }, ownEnter: true, size: () => [400, 70],
    draw(g, p, env) {
      const { lt, theme } = env, k = clamp(spring(lt, 'snappy'), 0, 1.2); g.save(); g.globalAlpha *= clamp(lt / 0.12); g.translate((1 - k) * 80, 0);
      g.font = F.cap(30); const w = g.measureText(p.text).width + 70; g.fillStyle = 'rgba(11,15,20,.78)'; rr(g, -w, -26, w, 52, 10); g.fill(); g.fillStyle = '#E0281E'; g.fillRect(-w, -26, 10, 52);
      txt(g, p.text, -w / 2 + 6, 1, F.cap(30), theme.paper); g.restore();
    },
  });
})();
