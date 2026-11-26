// ===== Lottery rig CRIME-SHOW pass (RULES 112) — the con as a recurring COLOURED ILLUSTRATED CHARACTER ("the lottery IT guy"). =====
// No licensed photo of Eddie Tipton exists (brand/photos/VERIFIED.md), so every treatment uses the SAME cartoon design, labelled ILLUSTRATION.
(function () {
  const B = window.BM2, { clamp, lerp, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, hit, hash } = B;
  const INK = '#1a1210', SK = '#E9B68C', SKS = '#D49A70', HAIR = '#3a2417', SHIRT = '#2F5DA8', LANY = '#F28C00', RED = '#E0281E';
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const stroke = (g, w = 5) => { g.strokeStyle = INK; g.lineWidth = w; g.lineJoin = 'round'; g.lineCap = 'round'; g.stroke(); };

  // ---------- the character: head + shoulders, centred on the head, ~300 x 380 units ----------
  const tip = (g, cx, cy, s, o = {}) => {
    const caught = o.mood === 'caught', t = o.t || 0; g.save(); g.translate(cx, cy); g.scale(s, s);
    // shoulders / shirt
    g.fillStyle = SHIRT; g.beginPath(); g.moveTo(-150, 215); g.quadraticCurveTo(-148, 112, -60, 94); g.lineTo(60, 94); g.quadraticCurveTo(148, 112, 150, 215); g.closePath(); g.fill(); stroke(g, 5);
    // neck + collar
    g.fillStyle = SKS; g.beginPath(); g.moveTo(-32, 58); g.lineTo(32, 58); g.lineTo(36, 104); g.lineTo(0, 130); g.lineTo(-36, 104); g.closePath(); g.fill(); stroke(g, 4);
    g.fillStyle = '#F5F3EE'; g.beginPath(); g.moveTo(-62, 92); g.lineTo(-8, 92); g.lineTo(-2, 134); g.lineTo(-44, 122); g.closePath(); g.fill(); stroke(g, 4);
    g.beginPath(); g.moveTo(62, 92); g.lineTo(8, 92); g.lineTo(2, 134); g.lineTo(44, 122); g.closePath(); g.fill(); stroke(g, 4);
    // lanyard + security badge
    g.fillStyle = LANY; g.beginPath(); g.moveTo(-46, 96); g.lineTo(-30, 96); g.lineTo(-2, 150); g.lineTo(-16, 156); g.closePath(); g.fill(); stroke(g, 3);
    g.beginPath(); g.moveTo(46, 96); g.lineTo(30, 96); g.lineTo(2, 150); g.lineTo(16, 156); g.closePath(); g.fill(); stroke(g, 3);
    g.fillStyle = '#F5F3EE'; rr(g, -40, 150, 80, 92, 8); g.fill(); stroke(g, 4); g.fillStyle = '#2c3e66'; g.fillRect(-38, 152, 76, 22);
    txt(g, 'MUSL', 0, 163, F.cap(15), '#F5F3EE'); txt(g, 'IT SECURITY', 0, 188, F.cap(10.5), INK);
    g.fillStyle = '#C9CED6'; g.beginPath(); g.arc(0, 213, 15, 0, 7); g.fill(); stroke(g, 2.5); g.fillStyle = '#59606B'; g.fillRect(-14, 232, 28, 5);
    // ears + head
    g.fillStyle = SKS; for (const sx of [-1, 1]) { g.beginPath(); g.ellipse(sx * 80, 4, 13, 22, 0, 0, 7); g.fill(); stroke(g, 4); }
    g.fillStyle = SK; g.beginPath(); g.ellipse(0, -6, 79, 94, 0, 0, 7); g.fill(); stroke(g, 5);
    // hair
    g.fillStyle = HAIR; g.beginPath(); g.moveTo(-82, -20); g.bezierCurveTo(-98, -104, -40, -126, 8, -122); g.bezierCurveTo(62, -124, 100, -90, 82, -20); g.bezierCurveTo(70, -54, 40, -74, -2, -74); g.bezierCurveTo(-42, -70, -68, -52, -82, -20); g.closePath(); g.fill(); stroke(g, 4.5);
    // glasses
    g.fillStyle = 'rgba(205,232,255,.62)'; for (const x of [-64, 12]) { rr(g, x, -26, 52, 40, 11); g.fill(); stroke(g, 6); }
    g.beginPath(); g.moveTo(-12, -10); g.lineTo(12, -10); stroke(g, 5); g.beginPath(); g.moveTo(-64, -12); g.lineTo(-80, -16); g.moveTo(64, -12); g.lineTo(80, -16); stroke(g, 4);
    // eyes (blink every ~3 s)
    const bl = (t % 3.1) > 3.0 ? 0.15 : 1, lk = o.look || 0, pr = caught ? 9 : 6.5; g.fillStyle = caught ? '#fff' : 'transparent';
    for (const x of [-38, 38]) { if (caught) { g.fillStyle = '#fff'; g.beginPath(); g.ellipse(x, -7, 15, 14 * bl, 0, 0, 7); g.fill(); } g.fillStyle = INK; g.beginPath(); g.ellipse(x + lk * 5, -6, pr, pr * bl, 0, 0, 7); g.fill(); }
    // brows + nose + mouth
    g.beginPath(); if (caught) { g.moveTo(-66, -34); g.lineTo(-16, -48); g.moveTo(66, -34); g.lineTo(16, -48); } else { g.moveTo(-66, -40); g.lineTo(-16, -44); g.moveTo(16, -48); g.lineTo(64, -38); } stroke(g, 6);
    g.beginPath(); g.moveTo(-3, 6); g.quadraticCurveTo(-12, 28, 4, 30); stroke(g, 4);
    g.beginPath(); if (caught) { g.moveTo(-28, 58); g.quadraticCurveTo(-10, 48, 0, 56); g.quadraticCurveTo(12, 64, 30, 52); } else { g.moveTo(-30, 54); g.quadraticCurveTo(6, 70, 38, 44); } stroke(g, 5.5);
    if (!caught) { g.beginPath(); g.moveTo(38, 44); g.lineTo(44, 38); stroke(g, 4.5); }
    if (caught) { const dy = (t * 40) % 30; g.fillStyle = '#7CC8FF'; g.beginPath(); g.moveTo(98, -66 + dy); g.quadraticCurveTo(116, -36 + dy, 98, -30 + dy); g.quadraticCurveTo(80, -36 + dy, 98, -66 + dy); g.fill(); stroke(g, 3); }
    // thumb drive in his hand
    if (o.drive) { g.save(); g.translate(128, 170); g.rotate(-0.45); g.fillStyle = SK; g.beginPath(); g.arc(0, 52, 26, 0, 7); g.fill(); stroke(g, 4); g.fillStyle = RED; rr(g, -17, -34, 34, 78, 8); g.fill(); stroke(g, 4.5); g.fillStyle = '#C9CED6'; rr(g, -12, -72, 24, 42, 4); g.fill(); stroke(g, 4); g.fillStyle = INK; g.fillRect(-6, -64, 4, 10); g.fillRect(3, -64, 4, 10); g.fillStyle = SK; g.beginPath(); g.ellipse(0, 40, 27, 20, 0, 0, 7); g.fill(); stroke(g, 4); g.restore(); }
    g.restore();
  };
  B.tip = tip;

  // gold portrait panel (clipped), with optional ken-burns push, wall lines (mugshot) and cage bars
  const panel = (g, x, y, w, h, o = {}) => {
    g.save(); rr(g, x, y, w, h, 18); g.clip();
    const bg = g.createRadialGradient(x + w / 2, y + h * 0.35, 20, x + w / 2, y + h * 0.5, Math.max(w, h) * 0.8);
    if (o.wall) { bg.addColorStop(0, '#E9EEF5'); bg.addColorStop(1, '#AEB9C9'); } else { bg.addColorStop(0, '#FFD866'); bg.addColorStop(1, '#E9980B'); }
    g.fillStyle = bg; g.fillRect(x, y, w, h);
    if (o.wall) { g.strokeStyle = 'rgba(11,15,20,.35)'; g.lineWidth = 2; for (let i = 0; i < 16; i++) { const yy = y + h - i * h / 16; g.beginPath(); g.moveTo(x + w - (i % 5 === 0 ? 60 : 30), yy); g.lineTo(x + w, yy); g.stroke(); if (i % 5 === 0) txt(g, String(i * 10 / 5 + 150), x + w - 82, yy - 2, F.mono(14), 'rgba(11,15,20,.5)'); } }
    else { g.fillStyle = 'rgba(255,255,255,.14)'; for (let i = -6; i < 8; i++) { g.beginPath(); g.moveTo(x + w / 2 + i * 60 - 14, y); g.lineTo(x + w / 2 + i * 60 + 14, y); g.lineTo(x + w / 2 + i * 150 + 14, y + h); g.lineTo(x + w / 2 + i * 150 - 14, y + h); g.fill(); } }
    const k = 1 + (o.push || 0), sc = (o.scale || h / 330) * k;
    tip(g, x + w / 2, y + h * 0.5 - 6 * sc + (o.dy || 0), sc, { mood: o.mood, drive: o.drive, t: o.t, look: o.look });
    if (o.tint) { g.fillStyle = `rgba(20,10,10,${o.tint})`; g.fillRect(x, y, w, h); }
    if (o.bars > 0) { const n = 7; for (let i = 0; i < n; i++) { const bx = x + (i + 0.5) * w / n, bh = h * ease.out(clamp(o.bars * 1.4 - i * 0.05)); g.fillStyle = '#1b1f27'; g.fillRect(bx - 9, y, 18, bh); g.fillStyle = 'rgba(255,255,255,.22)'; g.fillRect(bx - 6, y, 4, bh); } if (o.bars > 0.6) { g.fillStyle = '#1b1f27'; g.fillRect(x, y + h * 0.3, w, 14); g.fillRect(x, y + h * 0.72, w, 14); } }
    g.restore(); g.strokeStyle = INK; g.lineWidth = 5; rr(g, x, y, w, h, 18); g.stroke();
  };
  const stamp = (g, text, x, y, rot, k, size = 70, col = RED) => { if (k <= 0) return; const s = 1 + 1.4 * (1 - ease.expo(clamp(k / 0.18))); g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s); g.globalAlpha = clamp(k / 0.05); const w = mw(text, F.hero(size)) + 44; g.strokeStyle = col; g.lineWidth = 9; rr(g, -w / 2, -size * 0.62, w, size * 1.24, 12); g.stroke(); g.lineWidth = 3; rr(g, -w / 2 + 9, -size * 0.62 + 9, w - 18, size * 1.24 - 18, 8); g.stroke(); g.fillStyle = 'rgba(245,243,238,.82)'; rr(g, -w / 2 + 5, -size * 0.62 + 5, w - 10, size * 1.24 - 10, 9); g.fill(); txt(g, text, 0, 3, F.hero(size), col); g.restore(); };
  const xmark = (g, cx, cy, r, k) => { if (k <= 0) return; g.save(); g.lineCap = 'round'; for (const [c, wd] of [['#F5F3EE', 44], [RED, 30]]) { g.strokeStyle = c; g.lineWidth = wd; g.beginPath(); g.moveTo(cx - r, cy - r); g.lineTo(cx - r + 2 * r * ease.out(clamp(k * 2)), cy - r + 2 * r * ease.out(clamp(k * 2))); g.stroke(); if (k > 0.5) { g.beginPath(); g.moveTo(cx + r, cy - r); g.lineTo(cx + r - 2 * r * ease.out(clamp((k - 0.5) * 2)), cy - r + 2 * r * ease.out(clamp((k - 0.5) * 2))); g.stroke(); } } g.restore(); };
  const plate = (g, x, y, w, name, sub, th, nameK = 1) => { g.fillStyle = th.navy; rr(g, x, y, w, 96, 12); g.fill(); const n = Math.max(0, Math.floor(name.length * nameK)); txt(g, name.slice(0, n) + (nameK < 1 && nameK > 0 && (Math.floor(nameK * 40) % 2) ? '▌' : ''), x + w / 2, y + 50, F.hero(64), th.paper); g.fillStyle = RED; rr(g, x, y + 104, w, 52, 10); g.fill(); txt(g, sub, x + w / 2, y + 131, F.cap(28), '#F5F3EE'); };

  // ---------- suspect: modes case | quote | caught | verdict ----------
  B.register('suspect', {
    defaults: { mode: 'case', mood: 'smug', nameAt: 99999, stampAt: 99999, stampText: '', xAt: 99999, barsAt: 99999, note: '', noteAt: 99999, flipAt: 99999, head: 'HIS JOB', lines: ['KEEP THE', 'LOTTERY SAFE'], flipHead: 'THE TRUTH', flipLines: ['HE RIGGED IT'], year: '', sub: 'THE LOTTERY IT GUY', drive: false },
    ownEnter: true, size: p => (p.mode === 'quote' ? [960, 640] : [640, 860]),
    anchors: p => (p.mode === 'quote' ? { face: [-290, 0, 360, 460], quote: [220, 0, 480, 420] } : { face: [0, -100, 460, 470], name: [0, 270, 560, 100], stamp: [0, 160, 560, 150] }),
    draw(g, p, env) {
      const { lt, t, theme } = env, k = spring(lt, 'heavy'), push = clamp(lt / 7) * 0.07, flash = clamp(1 - lt / 0.22);
      g.save(); g.translate(0, (1 - k) * 260); g.rotate((1 - k) * -0.12 + (p.mode === 'quote' ? -0.015 : 0.012)); g.globalAlpha *= clamp(lt / 0.08);
      if (p.mode === 'case') {
        paper(g, -320, -380, 640, 800, 20, { fill: theme.manila, lift: env.lift }); g.fillStyle = theme.manila; rr(g, -320, -430, 250, 70, 14); g.fill(); g.strokeStyle = 'rgba(11,15,20,.25)'; g.lineWidth = 2; rr(g, -320, -430, 250, 70, 14); g.stroke(); txt(g, 'CASE FILE Nº 001', -195, -396, F.mono(22), theme.ink);
        panel(g, -262, -338, 524, 440, { push, t, drive: p.drive }); const nk = clamp((t - p.nameAt) / 0.7); plate(g, -262, 124, 524, 'EDDIE TIPTON', p.sub, theme, nk);
        txt(g, 'ILLUSTRATION', -250, 372, F.mono(16), theme.inkSoft, 'left');
        // red string from a pin on the file to a taped note
        const pk = ease.out(clamp((t - p.noteAt) / 0.5)); g.fillStyle = RED; g.beginPath(); g.arc(0, -352, 13, 0, 7); g.fill(); stroke(g, 3);
        if (pk > 0) { const ex = 420, ey = -150; g.strokeStyle = '#D61F14'; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.moveTo(0, -352); g.quadraticCurveTo(220, -310 + 30 * Math.sin(t * 2), lerp(0, ex, pk), lerp(-352, ey, pk)); g.stroke();
          if (pk > 0.9) { g.save(); g.translate(ex + 20, ey + 8); g.rotate(0.07); paper(g, -130, -62, 260, 124, 8, { fill: '#FFF4B8', lift: 0.3, grain: false }); const parts = p.note.split('|'); parts.forEach((s, i) => txt(g, s, 0, -22 + i * 50, F.hero(i ? 50 : 40), i ? RED : theme.ink)); g.restore(); } }
      } else if (p.mode === 'quote') {
        g.save(); g.translate(-300, 0); g.rotate(-0.035); paper(g, -190, -300, 380, 560, 18, { lift: env.lift }); panel(g, -168, -278, 336, 376, { push, t, drive: p.drive }); g.fillStyle = theme.navy; rr(g, -168, 112, 336, 56, 10); g.fill(); txt(g, 'THE LOTTERY IT GUY', 0, 140, F.cap(25), theme.paper); txt(g, 'ILLUSTRATION', -170, 206, F.mono(15), theme.inkSoft, 'left'); txt(g, 'EDDIE TIPTON', 0, 238, F.hero(36), theme.ink); g.restore();
        const fl = t >= p.flipAt, fk = spring(Math.max(0, t - p.flipAt), 'bouncy'), L = fl ? p.flipLines : p.lines, hd = fl ? p.flipHead : p.head, col = fl ? RED : '#00A152';
        g.save(); g.translate(190, -20); if (fl) g.scale(0.9 + 0.1 * fk, 0.9 + 0.1 * fk); paper(g, -270, -300, 540, 560, 22, { lift: env.lift + 0.1 }); g.fillStyle = theme.paper; g.beginPath(); g.moveTo(-270, -20); g.lineTo(-330, 20); g.lineTo(-270, 50); g.fill();
        g.fillStyle = col; rr(g, -236, -268, 280, 52, 10); g.fill(); txt(g, hd + ':', -96, -241, F.cap(30), '#F5F3EE');
        L.forEach((s, i) => txt(g, s, 0, -120 + i * 100, F.hero(L.length > 2 ? 80 : 92), i === L.length - 1 ? col : theme.ink));
        g.translate(0, 150); g.fillStyle = col; g.beginPath(); g.arc(0, 0, 62, 0, 7); g.fill(); stroke(g, 5); g.strokeStyle = '#F5F3EE'; g.lineWidth = 16; g.lineCap = 'round'; g.beginPath(); if (fl) { g.moveTo(-26, -26); g.lineTo(26, 26); g.moveTo(26, -26); g.lineTo(-26, 26); } else { g.moveTo(-28, 2); g.lineTo(-8, 24); g.lineTo(30, -22); } g.stroke(); g.restore();
      } else { // caught | verdict : booking-style placard
        paper(g, -320, -380, 640, 800, 20, { fill: '#F5F3EE', lift: env.lift }); const bars = p.mode === 'verdict' ? ease.out(clamp((t - p.barsAt) / 0.9)) : 0;
        panel(g, -262, -338, 524, 440, { wall: true, mood: 'caught', push, t, tint: 0.12 + 0.12 * (p.mode === 'verdict' ? 1 : 0), bars, dy: 0 });
        xmark(g, 0, -118, 150, (t - p.xAt) / 0.5);
        plate(g, -262, 124, 524, 'EDDIE TIPTON', p.sub, theme, 1); txt(g, 'ILLUSTRATION', -250, 372, F.mono(16), theme.inkSoft, 'left'); if (p.year) txt(g, p.year, 250, 372, F.mono(18), theme.inkSoft, 'right');
        stamp(g, p.stampText, 0, 40, -0.1, t - p.stampAt, p.stampText.length > 14 ? 58 : 76);
      }
      if (flash > 0) { g.fillStyle = `rgba(255,255,255,${0.85 * flash})`; g.fillRect(-500, -500, 1000, 1000); }
      g.restore();
    },
  });

  // ---------- pip: small picture-in-picture of him in the left strip (screen layer) with a pointer + changing label ----------
  B.register('pip', {
    defaults: { labels: [], big: 1.1, mood: 'smug', driveAt: 99999, driveUntil: 99999, barsAt: 99999, stampAt: 99999, stampText: '', arrow: true, sub: 'THE LOTTERY IT GUY' }, ownEnter: true, size: () => [240, 380],
    anchors: () => ({ face: [0, -40, 220, 260] }),
    draw(g, p, env) {
      const { lt, t, theme } = env, k = spring(lt, 'snappy'); g.save(); g.translate((1 - k) * -300, 0); g.scale(p.big, p.big); g.rotate(-0.025); g.globalAlpha *= clamp(lt / 0.08);
      paper(g, -112, -170, 224, 300, 14, { lift: 0.5 }); const bars = ease.out(clamp((t - p.barsAt) / 0.8)); panel(g, -100, -158, 200, 214, { push: clamp(lt / 8) * 0.06, t, mood: p.mood, drive: t >= p.driveAt && t < p.driveUntil, bars, wall: p.mood === 'caught', tint: p.mood === 'caught' ? 0.15 : 0 });
      g.fillStyle = theme.navy; rr(g, -100, 62, 200, 32, 8); g.fill(); txt(g, p.sub, 0, 79, F.cap(14.5), theme.paper); txt(g, 'EDDIE TIPTON', 0, 108, F.hero(26), theme.ink); txt(g, 'ILLUSTRATION', 0, 124, F.mono(10), theme.inkSoft);
      stamp(g, p.stampText, 0, -40, -0.12, t - p.stampAt, 40);
      let L = null; for (const l of p.labels) if (t >= l.at && (l.until == null || t < l.until)) L = l;
      if (L) { const o = t - L.at, lk = spring(o, 'bouncy'), col = L.tone === 'bad' ? RED : L.tone === 'gold' ? '#F2B705' : theme.paper; g.save(); g.translate(0, 168 + (1 - lk) * 14); g.globalAlpha = clamp(o / 0.08); const w = Math.max(200, mw(L.text, F.cap(20)) + 26); g.fillStyle = theme.ink; rr(g, -w / 2, -22, w, 46, 10); g.fill(); g.strokeStyle = col; g.lineWidth = 3; rr(g, -w / 2, -22, w, 46, 10); g.stroke(); txt(g, L.text, 0, 2, F.cap(20), col); g.restore();
        if (p.arrow) { g.save(); g.translate(128 + 8 * Math.sin(t * 6), -30); g.fillStyle = col === theme.paper ? '#F2B705' : col; g.beginPath(); g.moveTo(0, -22); g.lineTo(34, 0); g.lineTo(0, 22); g.lineTo(0, 9); g.lineTo(-22, 9); g.lineTo(-22, -9); g.lineTo(0, -9); g.closePath(); g.fill(); stroke(g, 3); g.restore(); } }
      g.restore();
    },
  });

  // ---------- cast: consistent character cards for the other people in the story (screen or world) ----------
  B.register('cast', {
    defaults: { kind: 'player' }, ownEnter: true, size: () => [300, 400],
    draw(g, p, env) {
      const { lt, t, theme } = env, k = spring(lt, 'snappy'), K = { player: ['#DDE9F7', 'THE PLAYERS', '#1FA366'], lottery: ['#FBE9C0', 'THE LOTTERY', '#2c3e66'], friend: ['#E6DAF5', 'THE OTHERS', '#7A4FD0'] }[p.kind];
      g.save(); g.translate((1 - k) * -280, 0); g.rotate(0.03); g.globalAlpha *= clamp(lt / 0.08); paper(g, -140, -190, 280, 380, 14, { lift: 0.4 }); g.save(); rr(g, -126, -176, 252, 284, 12); g.clip(); g.fillStyle = K[0]; g.fillRect(-126, -176, 252, 284);
      const bob = Math.sin(t * 3) * 3; g.translate(0, bob); // body
      g.fillStyle = K[2]; g.beginPath(); g.moveTo(-100, 120); g.quadraticCurveTo(-98, 20, -40, 6); g.lineTo(40, 6); g.quadraticCurveTo(98, 20, 100, 120); g.closePath(); g.fill(); stroke(g, 5);
      if (p.kind === 'lottery') { g.fillStyle = '#F5F3EE'; g.beginPath(); g.moveTo(-26, 6); g.lineTo(26, 6); g.lineTo(0, 60); g.closePath(); g.fill(); stroke(g, 3); g.fillStyle = RED; g.beginPath(); g.moveTo(-9, 20); g.lineTo(9, 20); g.lineTo(5, 80); g.lineTo(-5, 80); g.closePath(); g.fill(); }
      g.fillStyle = SK; g.beginPath(); g.ellipse(0, -52, 52, 60, 0, 0, 7); g.fill(); stroke(g, 5);
      if (p.kind === 'friend') { g.fillStyle = '#7A4FD0'; g.beginPath(); g.moveTo(-64, -40); g.bezierCurveTo(-70, -130, 70, -130, 64, -40); g.bezierCurveTo(50, -80, -50, -80, -64, -40); g.fill(); stroke(g, 4); g.fillStyle = INK; rr(g, -44, -62, 88, 22, 8); g.fill(); }
      else { g.fillStyle = p.kind === 'player' ? '#8B5A2B' : '#2a2a30'; g.beginPath(); g.moveTo(-54, -58); g.bezierCurveTo(-60, -122, 60, -122, 54, -58); g.bezierCurveTo(40, -88, -40, -88, -54, -58); g.fill(); stroke(g, 4); g.fillStyle = INK; for (const x of [-20, 20]) { g.beginPath(); g.arc(x, -52, 5.5, 0, 7); g.fill(); } g.beginPath(); g.moveTo(-18, -22); g.quadraticCurveTo(0, -8, 18, -22); stroke(g, 4.5); }
      // held prop
      g.save(); g.translate(78, 60); g.rotate(-0.25);
      if (p.kind === 'player') { paper(g, -34, -50, 68, 98, 6, { fill: '#FFF4B8', lift: 0.1, grain: false }); for (let i = 0; i < 3; i++) { g.fillStyle = [RED, '#F2B705', '#2c3e66'][i]; g.beginPath(); g.arc(-16 + i * 16, -24, 7, 0, 7); g.fill(); } txt(g, 'TICKET', 0, 18, F.cap(13), INK); }
      else if (p.kind === 'lottery') { g.fillStyle = RED; g.beginPath(); g.arc(0, 0, 36, 0, 7); g.fill(); stroke(g, 4); g.fillStyle = '#F5F3EE'; g.beginPath(); g.arc(0, 0, 19, 0, 7); g.fill(); txt(g, '17', 0, 2, F.hero(24), INK); }
      else { g.fillStyle = '#C9A24A'; g.beginPath(); g.ellipse(0, 12, 36, 42, 0, 0, 7); g.fill(); stroke(g, 4); txt(g, '$', 0, 14, F.hero(40), INK); }
      g.restore(); g.restore();
      g.fillStyle = K[2]; rr(g, -126, 116, 252, 44, 8); g.fill(); txt(g, K[1], 0, 139, F.cap(26), '#F5F3EE'); txt(g, 'ILLUSTRATION', 0, 176, F.mono(11), theme.inkSoft); g.restore();
    },
  });

  // ---------- dcard: typewriter date/location slug (screen layer) ----------
  B.register('dcard', {
    defaults: { text: '2010 · IOWA', sub: 'CASE FILE Nº 001' }, ownEnter: true, size: () => [680, 150],
    draw(g, p, env) {
      const { lt, theme } = env, k = ease.out(clamp(lt / 0.25)), n = Math.min(p.text.length, Math.floor(lt / 0.05)); g.save(); g.translate((1 - k) * -500, 0);
      clay(g, -340, -64, 680, 128, 16, '#12161d', { shadowK: 0.6 }); g.fillStyle = RED; g.fillRect(-340, -64, 22, 128); txt(g, p.sub, -300, -38, F.mono(18), 'rgba(245,243,238,.6)', 'left'); txt(g, p.text.slice(0, n) + (lt < p.text.length * 0.05 + 0.5 && Math.floor(lt * 8) % 2 ? '▌' : ''), -300, 14, F.monoX(62), '#F5F3EE', 'left'); g.restore();
    },
  });

  // ---------- usb: the thumb drive popup (screen layer) ----------
  B.register('usb', {
    defaults: { label: 'THUMB DRIVE' }, ownEnter: true, size: () => [400, 300],
    draw(g, p, env) {
      const { lt, t, theme } = env, k = spring(lt, 'bouncy'); g.save(); g.scale(0.6 + 0.4 * k, 0.6 + 0.4 * k); g.rotate(-0.1); paper(g, -190, -130, 380, 260, 18, { lift: 0.5 });
      g.save(); g.translate(0, -12 + 4 * Math.sin(t * 5)); g.fillStyle = '#C9CED6'; rr(g, 40, -34, 100, 68, 6); g.fill(); stroke(g, 5); g.fillStyle = INK; g.fillRect(100, -18, 24, 10); g.fillRect(100, 6, 24, 10); g.fillStyle = RED; rr(g, -150, -46, 200, 92, 16); g.fill(); stroke(g, 5); g.fillStyle = 'rgba(255,255,255,.3)'; rr(g, -138, -38, 160, 18, 8); g.fill(); txt(g, 'CODE', -50, 14, F.hero(40), '#F5F3EE'); g.restore();
      txt(g, p.label, 0, 74, F.cap(34), theme.ink); txt(g, 'ILLUSTRATION · PROSECUTORS SAY', 0, 108, F.mono(13), theme.inkSoft); g.restore();
    },
  });

  // ---------- board: the evidence board recap (cork, his portrait pinned, red strings to the evidence) ----------
  B.register('board', {
    defaults: { at: [], tightAt: 99999, ticket: '$16.5M', paid: '$0' }, size: () => [1000, 1240],
    anchors: () => ({ face: [0, -400, 280, 340], ticket: [-290, -60, 360, 200], states: [290, -60, 300, 200], code: [-290, 250, 340, 190], others: [290, 250, 340, 190], paid: [0, 505, 560, 170] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, X = -500, Y = -620;
      shadowedBoard(g, X, Y, 1000, 1240, lift); g.save(); rr(g, X, Y, 1000, 1240, 14); g.clip(); for (let i = 0; i < 520; i++) { g.fillStyle = `rgba(${hash(i) > 0.5 ? '60,34,14' : '240,200,150'},${0.10 + 0.1 * hash(i * 3.1)})`; g.beginPath(); g.arc(X + hash(i * 1.7) * 1000, Y + hash(i * 2.9) * 1240, 2 + hash(i * 5.3) * 3, 0, 7); g.fill(); } g.restore();
      g.strokeStyle = '#5a3a1c'; g.lineWidth = 26; rr(g, X, Y, 1000, 1240, 14); g.stroke();
      txt(g, 'EVIDENCE BOARD', 0, -566, F.mono(26), 'rgba(40,20,8,.7)');
      const pin = [0, -452], items = [[-290, -60], [290, -60], [-290, 250], [290, 250], [0, 505]], tight = ease.out(clamp((t - p.tightAt) / 0.4)), shake = tight > 0 && tight < 1 ? Math.sin(t * 70) * 3 : 0;
      // strings first
      items.forEach((it, i) => { const k = ease.out(clamp((t - p.at[i] - 0.1) / 0.3)); if (k <= 0) return; const ex = lerp(pin[0], it[0], k), ey = lerp(pin[1], it[1] - 110, k), sag = 36 * (1 - tight); g.strokeStyle = '#D61F14'; g.lineWidth = 5 + 3 * tight; g.lineCap = 'round'; g.beginPath(); g.moveTo(pin[0], pin[1]); g.quadraticCurveTo((pin[0] + ex) / 2 + shake, (pin[1] + ey) / 2 + sag, ex, ey); g.stroke(); });
      const pop = i => spring(Math.max(0, t - p.at[i]), 'bouncy'), on = i => t >= p.at[i] - 0.02;
      // portrait (always there)
      g.save(); g.translate(0, -300); g.rotate(-0.02); paper(g, -150, -160, 300, 360, 12, { lift: 0.3 }); panel(g, -134, -144, 268, 250, { push: 0, t, mood: tight > 0.5 ? 'caught' : 'smug' }); txt(g, 'EDDIE TIPTON', 0, 134, F.hero(34), theme.ink); txt(g, 'THE LOTTERY IT GUY', 0, 168, F.cap(17), RED); g.restore();
      g.fillStyle = RED; g.beginPath(); g.arc(pin[0], pin[1], 15, 0, 7); g.fill(); stroke(g, 3);
      const card = (i, cx, cy, w, h, rot, fill, fn) => { if (!on(i)) return; const s = 0.6 + 0.4 * pop(i); g.save(); g.translate(cx, cy); g.rotate(rot); g.scale(s, s); paper(g, -w / 2, -h / 2, w, h, 10, { fill, lift: 0.3, grain: false }); fn(); g.fillStyle = RED; g.beginPath(); g.arc(0, -h / 2 - 2, 11, 0, 7); g.fill(); stroke(g, 3); g.restore(); };
      card(0, -290, -60, 360, 200, -0.04, '#F5F3EE', () => { txt(g, '2010 JACKPOT', 0, -62, F.cap(26), theme.ink); txt(g, p.ticket, 0, 6, F.hero(86), '#00A152'); txt(g, 'ADVERTISED', 0, 66, F.mono(20), theme.inkSoft); });
      card(1, 290, -60, 300, 200, 0.045, '#F5F3EE', () => { txt(g, 'FIVE STATES', 0, -58, F.cap(30), theme.ink); for (let i = 0; i < 5; i++) { g.fillStyle = RED; g.beginPath(); g.arc(-96 + i * 48, 6, 15, 0, 7); g.fill(); stroke(g, 3); g.fillStyle = '#F5F3EE'; g.beginPath(); g.arc(-96 + i * 48, 6, 5, 0, 7); g.fill(); } txt(g, 'PLEADED GUILTY', 0, 62, F.mono(19), RED); });
      card(2, -290, 250, 340, 190, -0.03, theme.manila, () => { txt(g, '</>  THE CODE', 0, -52, F.cap(30), theme.ink); g.save(); g.translate(0, 16); g.fillStyle = RED; rr(g, -70, -26, 100, 52, 10); g.fill(); stroke(g, 3.5); g.fillStyle = '#C9CED6'; rr(g, 20, -16, 52, 32, 4); g.fill(); stroke(g, 3.5); g.restore(); txt(g, 'THUMB DRIVE', 0, 68, F.mono(18), theme.inkSoft); });
      card(3, 290, 250, 340, 190, 0.035, '#F5F3EE', () => { txt(g, 'THE OTHERS WON', 0, -52, F.cap(28), theme.ink); for (let i = 0; i < 3; i++) { const x = -80 + i * 80; g.fillStyle = '#7A4FD0'; g.beginPath(); g.moveTo(x - 30, 52); g.quadraticCurveTo(x - 28, 10, x, 8); g.quadraticCurveTo(x + 28, 10, x + 30, 52); g.fill(); stroke(g, 3.5); g.fillStyle = SK; g.beginPath(); g.arc(x, -6, 22, 0, 7); g.fill(); stroke(g, 3.5); g.fillStyle = INK; g.fillRect(x - 18, -14, 36, 9); } });
      card(4, 0, 505, 560, 170, -0.015, '#F5F3EE', () => { txt(g, 'PAID OUT', -140, -14, F.cap(36), theme.ink); txt(g, p.paid, 120, -8, F.hero(110), RED); txt(g, 'NOBODY COLLECTED', 0, 56, F.mono(22), theme.inkSoft); });
    },
  });
  function shadowedBoard(g, x, y, w, h, lift) { B.shadowed(g, () => rr(g, x, y, w, h, 14), '#B07C4A', lift + 0.3, {}); }

  // patch the lottery badge: replace the grey silhouette with the coloured character (called by drawBadge)
  B.badgeFace = (g, x0, y0, t) => { g.save(); rr(g, x0 + 130, y0 + 130, 240, 220, 18); g.clip(); const bg = g.createRadialGradient(0, y0 + 220, 10, 0, y0 + 240, 190); bg.addColorStop(0, '#FFD866'); bg.addColorStop(1, '#E9980B'); g.fillStyle = bg; g.fillRect(x0 + 130, y0 + 130, 240, 220); tip(g, 0, y0 + 232, 0.62, { t }); g.restore(); g.strokeStyle = INK; g.lineWidth = 4; rr(g, x0 + 130, y0 + 130, 240, 220, 18); g.stroke(); };
})();
