// ===== Lottery Part 2 v3 (CRIME-SHOW / What If pass) — recurring cast + new real-object recipes. Prepended after shared.js. =====
// crew     : THE AUSTRALIAN FUND (kind 'fund', green + gold blazers) / THE TEXAS GROUP (kind 'texas', navy + red). Same three faces every time. coloured ILLUSTRATION cards.
// official : THE STATE OF VIRGINIA — one consistent lottery official (grey suit, glasses, VA seal) with moods, a magnifier, a PAID stamp, a pen.
// bundles  : rubber-banded ticket bundles popping onto a printing belt.   salaries : 20 pay slips.   combos : a dot-grid of every combination.
// house    : "THE HOUSE" card with an ALWAYS WINS banner that gets crossed out.   qticket : a ticket with a "?" and a magnifier.
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, countAt, hash, hit, wobble } = B;
  const INK = '#0B0F14';
  const NOW = 1e9; const at0 = v => (v == null ? NOW : v);
  const zn = () => B.zoomNow || 1;

  // ---------------------------------------------------------------- bust helper (origin = bottom centre of torso, head centre ~ y -150)
  function bust(g, o) {
    const { skin, hair, suit, shirt = '#F5F3EE', tie = null, mood = 'neutral', tt = 0, glasses = false, hairStyle = 'short', s = 1, lapel = null, tint = null } = o;
    const blink = (tt % 3.4) < 0.1 || ((tt + 1.3) % 5.1) > 5.02;
    g.save(); g.scale(s, s); g.lineJoin = 'round'; g.lineCap = 'round';
    const bob = Math.sin(tt * 2.4 + (o.ph || 0)) * 2; g.translate(0, bob);
    // torso
    clay(g, -78, -104, 156, 106, 38, suit, { shadowK: 0.5 });
    g.fillStyle = shirt; g.beginPath(); g.moveTo(-24, -102); g.lineTo(24, -102); g.lineTo(0, -52); g.closePath(); g.fill();
    if (tie) { g.fillStyle = tie; g.beginPath(); g.moveTo(-8, -98); g.lineTo(8, -98); g.lineTo(11, -66); g.lineTo(0, -48); g.lineTo(-11, -66); g.closePath(); g.fill(); }
    if (lapel) { g.fillStyle = lapel; g.beginPath(); g.arc(36, -70, 8, 0, 7); g.fill(); g.strokeStyle = INK; g.lineWidth = 2.5; g.stroke(); }
    // neck + head
    g.fillStyle = B.shade ? B.shade(skin, -0.08) : skin; g.fillRect(-14, -112, 28, 16);
    const cy = -154, R = 50;
    if (hairStyle === 'long') { g.fillStyle = hair; g.strokeStyle = INK; g.lineWidth = 4; g.beginPath(); g.ellipse(0, cy + 8, R + 10, R + 18, 0, 0, 7); g.fill(); g.stroke(); }
    g.fillStyle = skin; g.strokeStyle = INK; g.lineWidth = 4.5; g.beginPath(); g.ellipse(0, cy, R * 0.94, R, 0, 0, 7); g.fill(); g.stroke();
    for (const q of [-1, 1]) { g.beginPath(); g.ellipse(q * R * 0.94, cy + 3, 8, 12, 0, 0, 7); g.fill(); g.stroke(); }
    // hair
    g.fillStyle = hair; g.lineWidth = 4;
    if (hairStyle === 'short') { g.beginPath(); g.moveTo(-R * 0.92, cy - 6); g.quadraticCurveTo(-R * 1.05, cy - R * 1.12, 0, cy - R * 1.08); g.quadraticCurveTo(R * 1.05, cy - R * 1.12, R * 0.92, cy - 6); g.quadraticCurveTo(R * 0.55, cy - R * 0.62, 0, cy - R * 0.66); g.quadraticCurveTo(-R * 0.55, cy - R * 0.62, -R * 0.92, cy - 6); g.fill(); g.stroke(); }
    else if (hairStyle === 'long') { g.beginPath(); g.moveTo(-R * 0.96, cy + 4); g.quadraticCurveTo(-R * 1.1, cy - R * 1.15, 0, cy - R * 1.1); g.quadraticCurveTo(R * 1.1, cy - R * 1.15, R * 0.96, cy + 4); g.quadraticCurveTo(R * 0.3, cy - R * 0.5, -R * 0.2, cy - R * 0.62); g.quadraticCurveTo(-R * 0.7, cy - R * 0.4, -R * 0.96, cy + 4); g.fill(); g.stroke(); }
    else if (hairStyle === 'cap') { g.fillStyle = o.cap || '#2c3e66'; g.beginPath(); g.moveTo(-R * 1.0, cy - 8); g.quadraticCurveTo(-R * 1.05, cy - R * 1.25, 0, cy - R * 1.2); g.quadraticCurveTo(R * 1.05, cy - R * 1.25, R * 1.0, cy - 8); g.closePath(); g.fill(); g.stroke(); g.fillRect(-R * 1.0, cy - 12, R * 2.0, 10); g.strokeRect(-R * 1.0, cy - 12, R * 2.0, 10); g.beginPath(); g.moveTo(R * 0.2, cy - 8); g.quadraticCurveTo(R * 1.1, cy - 4, R * 1.28, cy + 4); g.lineTo(R * 0.4, cy + 2); g.closePath(); g.fill(); g.stroke(); }
    else if (hairStyle === 'grey') { g.fillStyle = '#C9CCD3'; g.beginPath(); g.moveTo(-R * 0.94, cy - 4); g.quadraticCurveTo(-R * 1.06, cy - R * 0.95, -R * 0.4, cy - R * 1.04); g.quadraticCurveTo(0, cy - R * 0.92, R * 0.4, cy - R * 1.04); g.quadraticCurveTo(R * 1.06, cy - R * 0.95, R * 0.94, cy - 4); g.quadraticCurveTo(R * 0.7, cy - R * 0.55, 0, cy - R * 0.6); g.quadraticCurveTo(-R * 0.7, cy - R * 0.55, -R * 0.94, cy - 4); g.fill(); g.stroke(); }
    // face by mood
    const M = { neutral: { b: 0, t: 0, m: 'smile', e: 'n' }, cheer: { b: 12, t: 0, m: 'grin', e: 'arc' }, shock: { b: 16, t: 0, m: 'o', e: 'wide' }, think: { b: 8, t: 0.12, m: 'flat', e: 'n', look: [-1, -1] }, stern: { b: -4, t: 0.3, m: 'frown', e: 'n' }, smug: { b: -2, t: -0.1, m: 'smirk', e: 'half' }, worry: { b: 12, t: -0.3, m: 'wob', e: 'n', sweat: 1 }, tired: { b: -2, t: -0.2, m: 'flat', e: 'half' } }[mood] || { b: 0, t: 0, m: 'smile', e: 'n' };
    for (const q of [-1, 1]) {
      const ex = q * 20, ey = cy - 4;
      if (M.e === 'arc' || blink) { g.strokeStyle = INK; g.lineWidth = 4.5; g.beginPath(); if (M.e === 'arc') g.arc(ex, ey + 4, 10, Math.PI * 1.1, Math.PI * 1.9); else { g.moveTo(ex - 9, ey); g.lineTo(ex + 9, ey); } g.stroke(); }
      else { const er = M.e === 'wide' ? 13 : 10.5; g.fillStyle = '#F5F3EE'; g.strokeStyle = INK; g.lineWidth = 3.5; g.beginPath(); g.ellipse(ex, ey, er, er * (M.e === 'half' ? 0.7 : 1.05), 0, 0, 7); g.fill(); g.stroke(); const lk = M.look || [0.3 * Math.sin(tt * 0.9), 0]; g.fillStyle = INK; g.beginPath(); g.arc(ex + lk[0] * 3.5, ey + lk[1] * 3.5, M.e === 'wide' ? 3.6 : 5, 0, 7); g.fill();
        if (M.e === 'half') { g.fillStyle = skin; g.fillRect(ex - er - 1, ey - er * 1.1, er * 2 + 2, er * 0.55); g.strokeStyle = INK; g.lineWidth = 3; g.beginPath(); g.moveTo(ex - er, ey - er * 0.45); g.lineTo(ex + er, ey - er * 0.45); g.stroke(); } }
      g.strokeStyle = hairStyle === 'grey' ? '#8B8F99' : INK; g.lineWidth = 5; g.beginPath(); g.moveTo(ex - 11 * q, ey - 17 - M.b * 0.4 + M.t * 10 * q); g.lineTo(ex + 11 * q, ey - 17 - M.b * 0.4 - M.t * 10 * q); g.stroke();
    }
    if (glasses) { g.strokeStyle = '#2b2f36'; g.lineWidth = 3.5; for (const q of [-1, 1]) { g.beginPath(); g.rect(q * 20 - 15, cy - 20, 30, 24); g.stroke(); } g.beginPath(); g.moveTo(-5, cy - 10); g.lineTo(5, cy - 10); g.stroke(); }
    const my = cy + 28; g.strokeStyle = INK; g.lineWidth = 4;
    if (M.m === 'smile') { g.beginPath(); g.arc(0, my - 6, 14, 0.3, Math.PI - 0.3); g.stroke(); }
    else if (M.m === 'grin') { g.fillStyle = '#7A1F1F'; g.beginPath(); g.moveTo(-20, my - 8); g.quadraticCurveTo(0, my + 26, 20, my - 8); g.closePath(); g.fill(); g.stroke(); g.fillStyle = '#F5F3EE'; g.beginPath(); g.moveTo(-15, my - 6); g.lineTo(15, my - 6); g.lineTo(12, my + 2); g.lineTo(-12, my + 2); g.closePath(); g.fill(); }
    else if (M.m === 'o') { g.fillStyle = '#7A1F1F'; g.beginPath(); g.ellipse(0, my + 2, 9, 13, 0, 0, 7); g.fill(); g.stroke(); }
    else if (M.m === 'flat') { g.beginPath(); g.moveTo(-11, my); g.lineTo(11, my - 2); g.stroke(); }
    else if (M.m === 'frown') { g.beginPath(); g.arc(0, my + 12, 14, Math.PI + 0.35, -0.35); g.stroke(); }
    else if (M.m === 'smirk') { g.beginPath(); g.moveTo(-12, my); g.quadraticCurveTo(4, my + 8, 18, my - 9); g.stroke(); }
    else if (M.m === 'wob') { g.beginPath(); g.moveTo(-14, my + 4); g.quadraticCurveTo(-7, my - 5, 0, my + 4); g.quadraticCurveTo(7, my + 13, 14, my + 4); g.stroke(); }
    if (M.sweat) { const w = (tt * 1.5) % 1; g.fillStyle = '#7FD6FF'; g.strokeStyle = INK; g.lineWidth = 2.5; g.save(); g.translate(48, cy - 26 + w * 10); g.beginPath(); g.moveTo(0, -12); g.quadraticCurveTo(10, 2, 0, 9); g.quadraticCurveTo(-10, 2, 0, -12); g.fill(); g.stroke(); g.restore(); }
    g.restore();
  }
  window.BMBUST = bust;
  const moodAt = (K, t, d = 'neutral') => { let c = { m: d, t: -1e9 }; for (const k of K || []) if (t >= k.t && k.t >= c.t) c = k; return c; };

  // ---------------------------------------------------------------- crew card
  const CREWS = {
    fund: { bg0: '#BFE3F2', bg1: '#F7E7B0', ground: '#7FBF8F', suit: '#1FA366', lapel: '#F2B705', label: 'THE AUSTRALIAN FUND', sub: 'ILLUSTRATION · A GROUP OF INVESTORS',
      people: [{ x: -128, y: 0, s: 0.84, skin: '#E8C39A', hair: '#6B4423', hs: 'short' }, { x: 128, y: 0, s: 0.84, skin: '#C98E64', hair: '#16181F', hs: 'long' }, { x: 0, y: 14, s: 1.05, skin: '#F1CDA8', hair: '#B07A3A', hs: 'cap', cap: '#F2B705' }] },
    texas: { bg0: '#F3C9B5', bg1: '#F7E1B8', ground: '#C98F5A', suit: '#2c3e66', lapel: '#E0281E', label: 'THE TEXAS GROUP', sub: 'ILLUSTRATION · A GROUP OF BUYERS',
      people: [{ x: -128, y: 0, s: 0.84, skin: '#F1CDA8', hair: '#3a2a1a', hs: 'cap', cap: '#E0281E' }, { x: 128, y: 0, s: 0.84, skin: '#8D5A3B', hair: '#16181F', hs: 'short' }, { x: 0, y: 14, s: 1.05, skin: '#E8C39A', hair: '#8a6a3a', hs: 'long' }] },
  };
  B.register('crew', {
    defaults: { kind: 'fund', w: 520, h: 540, cheerAt: NOW, worryAt: NOW, calmAt: NOW, held: 'none', heldAt: NOW, label: null, sub: null, tilt: -0.02, tag: '', mono: false, stamps: [] }, ownEnter: true,
    size: p => [p.w, p.h], anchors: p => ({ face: [0, -p.h * 0.18, p.w * 0.82, p.h * 0.5], plate: [0, p.h / 2 - 70, p.w, 120], all: [0, 0, p.w, p.h] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, C = CREWS[p.kind], w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, k = spring(lt, 'heavy');
      g.save(); g.translate(0, (1 - k) * 230); g.rotate(p.tilt + (1 - k) * -0.1); g.globalAlpha *= clamp(lt / 0.1);
      paper(g, x0, y0, w, h, 18, { lift });
      const px = x0 + 20, py = y0 + 20, pw = w - 40, ph = h - 20 - 20 - 118;
      g.save(); rr(g, px, py, pw, ph, 10); g.clip(); const bg = g.createLinearGradient(0, py, 0, py + ph); bg.addColorStop(0, C.bg0); bg.addColorStop(1, C.bg1); g.fillStyle = bg; g.fillRect(px, py, pw, ph);
      g.fillStyle = C.ground; g.fillRect(px, py + ph - 56, pw, 60); g.fillStyle = 'rgba(0,0,0,.08)'; g.fillRect(px, py + ph - 56, pw, 6);
      const cheer = t >= p.cheerAt && t < p.calmAt, worry = t >= p.worryAt && t < p.cheerAt, since = t - p.cheerAt, by = py + ph - 40;
      const order = [0, 1, 2];
      for (const i of order) { const q = C.people[i]; const jump = cheer ? Math.abs(Math.sin(Math.max(0, since) * 7 + i * 1.7)) * Math.exp(-Math.max(0, since) * 0.9) * 34 : 0;
        g.save(); g.translate((px + pw / 2) + q.x * (pw / 520), by - jump + q.y); bust(g, { skin: q.skin, hair: q.hair, hairStyle: q.hs, cap: q.cap, suit: C.suit, tie: i === 2 ? C.lapel : null, lapel: C.lapel, s: q.s * (pw / 480), tt: t, ph: i * 1.3, mood: cheer ? 'cheer' : worry ? 'worry' : (i === 2 ? 'smug' : 'neutral') });
        if (cheer && i !== 2) { g.strokeStyle = INK; g.lineWidth = 4; g.fillStyle = q.skin; for (const sd of [-1, 1]) { g.beginPath(); g.moveTo(sd * 66 * q.s, -60 * q.s); g.lineTo(sd * 92 * q.s, -150 * q.s - jump * 0.3); g.stroke(); g.beginPath(); g.arc(sd * 92 * q.s, -154 * q.s - jump * 0.3, 11, 0, 7); g.fill(); g.stroke(); } }
        g.restore(); }
      // held object in front (tickets fan / cheque)
      const hn = t - p.heldAt; if (p.held !== 'none' && hn > -0.01) { const hk = spring(Math.max(0, hn), 'snappy'); g.save(); g.translate(px + pw / 2, by + 6 + (1 - hk) * 60); g.globalAlpha *= clamp(hn / 0.1);
        if (p.held === 'tickets') { for (let i = 0; i < 5; i++) { B.ticket(g, (i - 2) * 46, -14 + Math.abs(i - 2) * 6, 124, 58, (i - 2) * 0.16, i, { sh: 6 }); } }
        else { g.fillStyle = theme.paper; g.strokeStyle = theme.goodInk; g.lineWidth = 4; rr(g, -92, -44, 184, 80, 8); g.fill(); g.stroke(); txt(g, '$27,000,000', 0, -4, F.hero(34), theme.goodInk); }
        g.restore(); }
      if (p.mono) { g.globalCompositeOperation = 'saturation'; g.fillStyle = '#808080'; g.fillRect(px, py, pw, ph); g.globalCompositeOperation = 'source-over'; }
      g.restore(); g.strokeStyle = 'rgba(11,15,20,.3)'; g.lineWidth = 2; rr(g, px, py, pw, ph, 10); g.stroke();
      // name plate
      const ty = py + ph + 12; g.fillStyle = theme.navy; rr(g, px, ty, pw, 100, 10); g.fill(); txt(g, p.label || C.label, px + pw / 2, ty + 38, F.hero(p.labelSize || 42), theme.paper); txt(g, p.sub || C.sub, px + pw / 2, ty + 78, F.mono(14), theme.gold);
      for (const s of p.stamps) B.crimeStamp && B.crimeStamp(g, theme, t, { ...s, x: s.x ?? 0, y: s.y ?? 0 });
      if (p.tag) { g.save(); g.translate(-w * 0.26, y0 + 4); g.rotate(-0.1); g.fillStyle = C.suit; g.fillRect(-64, -15, 128, 30); txt(g, p.tag, 0, 1, F.monoX(16), theme.paper); g.restore(); }
      g.restore();
    },
  });

  // ---------------------------------------------------------------- the Virginia official
  B.register('official', {
    defaults: { w: 480, h: 560, moods: [], glassAt: NOW, glassDur: 1.4, stampAt: NOW, stampText: 'PAID', penAt: NOW, tilt: 0.02, label: 'THE STATE OF VIRGINIA', sub: 'ILLUSTRATION · LOTTERY OFFICIAL', mono: false, thought: '', thoughtAt: NOW, thoughtOut: NOW }, ownEnter: true,
    size: p => [p.w, p.h], anchors: p => ({ face: [0, -p.h * 0.17, p.w * 0.7, p.h * 0.45], plate: [0, p.h / 2 - 70, p.w, 120], all: [0, 0, p.w, p.h] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, k = spring(lt, 'heavy'), mk = moodAt(p.moods, t, 'neutral');
      g.save(); g.translate(0, (1 - k) * 230); g.rotate(p.tilt + (1 - k) * 0.1); g.globalAlpha *= clamp(lt / 0.1);
      paper(g, x0, y0, w, h, 18, { lift });
      const px = x0 + 20, py = y0 + 20, pw = w - 40, ph = h - 40 - 118;
      g.save(); rr(g, px, py, pw, ph, 10); g.clip(); const bg = g.createLinearGradient(0, py, 0, py + ph); bg.addColorStop(0, '#D9E6F2'); bg.addColorStop(1, '#F1E3C8'); g.fillStyle = bg; g.fillRect(px, py, pw, ph);
      // flag-ish backdrop stripes + wall clock
      g.fillStyle = 'rgba(44,62,102,.1)'; g.fillRect(px, py + ph * 0.55, pw, ph * 0.45); g.fillStyle = 'rgba(0,0,0,.07)'; g.fillRect(px, py + ph - 52, pw, 56);
      // seal
      g.save(); g.translate(px + 62, py + 66); g.fillStyle = theme.navy; g.beginPath(); g.arc(0, 0, 44, 0, 7); g.fill(); g.strokeStyle = theme.gold; g.lineWidth = 4; g.beginPath(); g.arc(0, 0, 36, 0, 7); g.stroke(); txt(g, 'VA', 0, 2, F.hero(36), theme.gold); g.restore();
      const cx = px + pw / 2, by = py + ph - 36;
      g.save(); g.translate(cx, by); const hs = (pw / 480) * 1.5;
      // arm holding a pen / stamp (right side)
      const sl = t - p.stampAt, stamping = sl > -0.4 && sl < 0.6, pen = t - p.penAt;
      bust(g, { skin: '#E9C6A0', hair: '#C9CCD3', hairStyle: 'grey', suit: '#59606B', tie: '#E0281E', lapel: theme.gold, glasses: true, s: hs, tt: t, mood: mk.m });
      // stamp tool (wooden) raised on the right, slams down at stampAt
      if (p.stampAt < NOW / 2) { const up = sl < 0 ? ease.out(clamp((sl + 0.4) / 0.4)) * 0 + 1 : 1, dy = sl < 0 ? -34 + 0 : (sl < 0.16 ? lerp(-34, 40, ease.in(clamp(sl / 0.16))) : lerp(40, -20, ease.out(clamp((sl - 0.5) / 0.5))));
        g.save(); g.translate(96 * hs * 0.72, -118 * hs * 0.72 + dy); g.fillStyle = '#8a5a2b'; rr(g, -14, -60, 28, 56, 8); g.fill(); g.strokeStyle = INK; g.lineWidth = 3; g.stroke(); g.fillStyle = '#59606B'; rr(g, -34, -6, 68, 22, 6); g.fill(); g.stroke(); g.restore(); }
      else if (p.penAt < NOW / 2) { const wr = pen > 0 ? Math.sin(pen * 14) * 3 : 0; g.save(); g.translate(92 * hs * 0.72, -102 * hs * 0.72); g.rotate(-0.6 + wr * 0.02); g.fillStyle = '#E0281E'; rr(g, -4, -52, 8, 60, 4); g.fill(); g.strokeStyle = INK; g.lineWidth = 2.5; g.stroke(); g.restore(); }
      g.restore();
      if (p.mono) { g.globalCompositeOperation = 'saturation'; g.fillStyle = '#808080'; g.fillRect(px, py, pw, ph); g.globalCompositeOperation = 'source-over'; }
      g.restore(); g.strokeStyle = 'rgba(11,15,20,.3)'; g.lineWidth = 2; rr(g, px, py, pw, ph, 10); g.stroke();
      // magnifier sweep over the photo area
      const gn = t - p.glassAt; if (gn > -0.05 && gn < p.glassDur + 0.5) { const u = ease.inOut(clamp(gn / p.glassDur)), gx = lerp(px + pw * 0.25, px + pw * 0.8, u), gy = py + ph * 0.55 + Math.sin(u * Math.PI * 3) * 22, r = 62, fa = clamp((gn + 0.05) / 0.12) * (1 - clamp((gn - p.glassDur) / 0.4));
        g.save(); g.globalAlpha *= fa; g.translate(gx, gy); g.rotate(-0.3); g.fillStyle = 'rgba(245,243,238,.2)'; g.beginPath(); g.arc(0, 0, r, 0, 7); g.fill(); g.strokeStyle = theme.gold; g.lineWidth = r * 0.24; g.beginPath(); g.arc(0, 0, r, 0, 7); g.stroke(); g.strokeStyle = INK; g.lineWidth = r * 0.3; g.beginPath(); g.moveTo(r * 0.72, r * 0.72); g.lineTo(r * 1.5, r * 1.55); g.stroke(); g.restore(); }
      // stamp result
      if (sl > 0.12) { const st = sl - 0.12, sc = 1 + 1.0 * (1 - ease.expo(clamp(st / 0.2))), sf = F.hero(86), sw = (p.stampText.length * 52) + 70; g.save(); g.translate(cx + 0, py + ph * 0.5); g.rotate(-0.12); g.scale(sc, sc); g.globalAlpha *= clamp(st / 0.05); const col = p.stampTone === 'bad' ? theme.badInk : theme.goodInk;
        g.fillStyle = 'rgba(245,243,238,.94)'; rr(g, -sw / 2, -62, sw, 124, 12); g.fill(); g.strokeStyle = col; g.lineWidth = 9; rr(g, -sw / 2 + 7, -55, sw - 14, 110, 9); g.stroke(); txt(g, p.stampText, 0, 4, sf, col); g.restore(); burst(g, cx, py + ph * 0.5, sw * 0.55, p.stampTone === 'bad' ? theme.bad : theme.good, st - 0.1, 14, 0.45); }
      // thought bubble
      if (p.thought && t >= p.thoughtAt && t < p.thoughtOut) { const tk = spring(t - p.thoughtAt, 'snappy'), fa = 1 - clamp((t - p.thoughtOut + 0.2) / 0.2); g.save(); g.globalAlpha *= fa; g.translate(px + pw * 0.62, py + 62); g.scale(0.5 + 0.5 * tk, 0.5 + 0.5 * tk); g.fillStyle = theme.paper; rr(g, -90, -44, 180, 88, 26); g.fill(); g.strokeStyle = INK; g.lineWidth = 3; g.stroke(); txt(g, p.thought, 0, 3, F.hero(54), theme.badInk); g.restore(); }
      const ty = py + ph + 12; g.fillStyle = theme.navy; rr(g, px, ty, pw, 100, 10); g.fill(); txt(g, p.label, px + pw / 2, ty + 38, F.hero(p.labelSize || 38), theme.paper); txt(g, p.sub, px + pw / 2, ty + 78, F.mono(14), theme.gold);
      g.restore();
    },
  });

  // ---------------------------------------------------------------- bundles on a printing belt
  B.register('bundles', {
    defaults: { cols: 6, rows: 3, at: NOW, per: 0.1, w: 900, label: 'PRINTED IN BULK', countTo: 0, countAt: NOW, countDur: 1.4, beltAt: NOW }, ownEnter: true,
    size: p => [p.w, p.rows * 150 + 170],
    anchors: p => ({ pile: [0, -30, p.w, p.rows * 150], belt: [0, p.rows * 75 + 30, p.w, 70] }),
    draw(g, p, env) {
      const { t, lt, theme } = env, w = p.w, rows = p.rows, h = rows * 150 + 170, y0 = -h / 2, beltY = y0 + rows * 150 + 70;
      // belt
      g.save(); g.globalAlpha *= clamp(lt / 0.1); const bk = spring(lt, 'snappy'); g.translate(0, (1 - bk) * 80);
      clay(g, -w / 2, beltY, w, 50, 22, '#3a4252', { lift: 0.4, shadowK: 0.6 }); g.save(); rr(g, -w / 2, beltY, w, 50, 22); g.clip(); g.fillStyle = 'rgba(245,243,238,.28)'; const off = (t * 120) % 60; for (let x = -w / 2 - 60 + off; x < w / 2 + 60; x += 60) { g.beginPath(); g.moveTo(x, beltY + 8); g.lineTo(x + 20, beltY + 8); g.lineTo(x + 8, beltY + 42); g.lineTo(x - 12, beltY + 42); g.closePath(); g.fill(); } g.restore(); g.restore();
      let i = 0; const cw = w / p.cols;
      for (let r = 0; r < rows; r++) for (let c = 0; c < p.cols; c++, i++) {
        const o = t - (p.at + i * p.per); if (o <= 0) continue; const k = spring(o, 'snappy'), cx = -w / 2 + cw * (c + 0.5), cy = y0 + (rows - 1 - r) * 150 + 80 + (1 - k) * -220 + (r === 0 ? 0 : 0);
        g.save(); g.translate(cx, cy); g.globalAlpha *= clamp(o / 0.08); g.rotate((hash(i * 3.3) - 0.5) * 0.06);
        for (let j = 3; j >= 0; j--) B.ticket(g, (hash(i + j) - 0.5) * 6, -j * 11 + 20, 150, 66, (hash(i * 2 + j * 5) - 0.5) * 0.08, i + j, { sh: j === 0 ? 8 : 0 });
        g.fillStyle = theme.badInk; rr(g, -14, -34, 28, 78, 4); g.fill(); g.strokeStyle = 'rgba(0,0,0,.25)'; g.lineWidth = 2; g.stroke(); g.restore();
      }
      const ln = t - p.at; if (p.label && ln > -0.2) { const r = (ln + 0.2); g.save(); g.globalAlpha *= clamp(r / 0.2); txt(g, p.label, 0, y0 - 40, F.hero(70), theme.paper); g.restore(); }
      if (p.countTo) { const cn = t - p.countAt, v = cn < 0 ? 0 : countAt(Math.max(0, cn), p.countDur, 0, p.countTo); g.save(); g.globalAlpha *= clamp((cn + 0.1) / 0.15); const o = { font: F.hero(120), size: 120, color: theme.gold, prefix: '', suffix: '+', decimals: 0, align: 'center' }; roll(g, v, 0, beltY + 150, o); g.restore(); }
    },
  });

  // ---------------------------------------------------------------- salaries: 20 pay slips
  B.register('salaries', {
    defaults: { at: NOW, per: 0.1, n: 20, w: 760, h: 760, each: '$65K', total: '$1.3M', totalAt: NOW }, size: p => [p.w, p.h],
    anchors: p => ({ count: [0, -p.h / 2 + 100, p.w * 0.8, 150], grid: [0, 30, p.w * 0.92, p.h * 0.58], total: [0, p.h / 2 - 90, p.w * 0.9, 120] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 22, { lift });
      g.save(); rr(g, x0, y0, w, h, 22); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 170); g.restore();
      let done = 0; for (let i = 0; i < p.n; i++) if (t >= p.at + i * p.per) done++;
      txt(g, 'NORMAL SALARIES', 0, y0 + 40, F.cap(34), rgba(theme.paper, 0.85));
      txt(g, String(done), -60, y0 + 112, F.hero(100), done >= p.n ? theme.gold : theme.paper); txt(g, '/ ' + p.n, 66, y0 + 124, F.hero(56), rgba(theme.paper, 0.7));
      const cols = 5, rows = 4, gw = (w - 80) / cols, gh = (h - 170 - 150) / rows;
      for (let i = 0; i < p.n; i++) { const o = t - (p.at + i * p.per); if (o <= 0) continue; const k = spring(o, 'bouncy'), c = i % cols, r = Math.floor(i / cols), cx = x0 + 40 + gw * (c + 0.5), cy = y0 + 170 + 26 + gh * (r + 0.5);
        g.save(); g.translate(cx, cy); g.scale(0.4 + 0.6 * k, 0.4 + 0.6 * k); g.globalAlpha *= clamp(o / 0.06); g.rotate((hash(i * 4.1) - 0.5) * 0.12); paper(g, -gw * 0.44, -gh * 0.42, gw * 0.88, gh * 0.84, 8, { lift: 0.15, fill: '#EFF6EC' });
        g.fillStyle = '#E8C39A'; g.beginPath(); g.arc(-gw * 0.2, -gh * 0.08, 14, 0, 7); g.fill(); g.fillStyle = '#1FA366'; g.beginPath(); g.moveTo(-gw * 0.2 - 22, gh * 0.3); g.quadraticCurveTo(-gw * 0.2, gh * 0.02, -gw * 0.2 + 22, gh * 0.3); g.closePath(); g.fill();
        txt(g, p.each, gw * 0.12, -gh * 0.06, F.hero(30), theme.goodInk); g.fillStyle = theme.paperShade; rr(g, -gw * 0.1 + 8, gh * 0.12, gw * 0.4, 8, 4); g.fill(); g.restore(); }
      const tn = t - p.totalAt; if (tn > -0.02) { const k = spring(Math.max(0, tn), 'snappy'); g.save(); g.translate(0, y0 + h - 82 + (1 - k) * 30); g.globalAlpha *= clamp(tn / 0.1); marker(g, -w * 0.43, -46, w * 0.86, 92, theme.goodInk, clamp(tn / 0.3), 0.18); txt(g, '≈ ' + p.total + ' A YEAR', 0, 4, F.hero(72), theme.goodInk); g.restore(); burst(g, 0, y0 + h - 82, 300, theme.good, tn - 0.05, 16, 0.5); }
      txt(g, 'ROUGH: ~$65K A TYPICAL US SALARY', 0, y0 + h - 22, F.mono(15), theme.inkSoft);
    },
  });

  // ---------------------------------------------------------------- combos: every lottery combination as a dot grid
  B.register('combos', {
    defaults: { at: NOW, dur: 2.4, w: 860, h: 720, cols: 20, rows: 14, missing: 3, pctAt: NOW, label: 'EVERY COMBINATION', sub: 'EACH DOT = ABOUT 92,000 COMBINATIONS', boughtLabel: 'BOUGHT', tone: 'good' },
    size: p => [p.w, p.h], anchors: p => ({ pct: [0, -p.h / 2 + 120, p.w * 0.8, 170], grid: [0, 40, p.w * 0.94, p.h * 0.62] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, N = p.cols * p.rows; paper(g, x0, y0, w, h, 22, { lift });
      g.save(); rr(g, x0, y0, w, h, 22); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 190); g.restore();
      txt(g, p.label, 0, y0 + 40, F.cap(34), rgba(theme.paper, 0.85));
      const u = t < p.at ? 0 : ease.inOut(clamp((t - p.at) / p.dur)), fill = Math.floor(u * (N - p.missing + 0.999)), pct = N ? (fill / N * 100) : 0, done = u >= 1;
      const o = { font: F.hero(120), size: 120, color: done ? theme.gold : theme.paper, prefix: '', suffix: '%', decimals: 0, align: 'center' }; roll(g, Math.min(99, pct), 0, y0 + 124, o);
      const gx = x0 + 44, gy = y0 + 220, cw = (w - 88) / p.cols, ch = (h - 220 - 70) / p.rows;
      for (let i = 0; i < N; i++) { const c = i % p.cols, r = Math.floor(i / p.cols), cx = gx + cw * (c + 0.5), cy = gy + ch * (r + 0.5), rad = Math.min(cw, ch) * 0.34, isMiss = i >= N - p.missing;
        if (i < fill) { const age = u < 1 ? 0 : 1; g.fillStyle = theme.good; g.beginPath(); g.arc(cx, cy, rad, 0, 7); g.fill(); }
        else { g.strokeStyle = isMiss && done ? theme.badInk : theme.rule; g.lineWidth = isMiss && done ? 4 : 2.5; g.beginPath(); g.arc(cx, cy, rad, 0, 7); g.stroke(); } }
      if (done) { const dn = t - p.at - p.dur, k = spring(Math.max(0, dn), 'bouncy'); g.save(); g.translate(0, y0 + h - 40); g.scale(0.6 + 0.4 * k, 0.6 + 0.4 * k); g.globalAlpha *= clamp(dn / 0.1); txt(g, 'NEARLY ALL ' + p.boughtLabel, 0, 0, F.hero(46), theme.badInk); g.restore(); burst(g, 0, y0 + 124, 280, theme.gold, dn - 0.05, 16, 0.5); }
      else txt(g, p.sub, 0, y0 + h - 30, F.mono(15), theme.inkSoft);
    },
  });

  // ---------------------------------------------------------------- house: THE HOUSE · ALWAYS WINS, crossed out
  B.register('house', {
    defaults: { xAt: NOW, w: 760, h: 700, winsAt: NOW }, size: p => [p.w, p.h], anchors: p => ({ sign: [0, -p.h * 0.22, p.w * 0.8, 120], roof: [0, -p.h * 0.1, p.w * 0.8, p.h * 0.5] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 22, { lift });
      g.save(); rr(g, x0, y0, w, h, 22); g.clip(); const bg = g.createLinearGradient(0, y0, 0, y0 + h); bg.addColorStop(0, '#CBE4F2'); bg.addColorStop(1, '#F6E8C0'); g.fillStyle = bg; g.fillRect(x0, y0, w, h); g.fillStyle = '#7FBF8F'; g.fillRect(x0, y0 + h - 120, w, 130); g.restore();
      // building
      clay(g, -200, y0 + 250, 400, 280, 12, '#C9511F', { shadowK: 0.6 }); g.fillStyle = '#8f3510'; g.beginPath(); g.moveTo(-240, y0 + 256); g.lineTo(0, y0 + 110); g.lineTo(240, y0 + 256); g.closePath(); g.fill(); g.strokeStyle = INK; g.lineWidth = 4; g.stroke();
      clay(g, -48, y0 + 380, 96, 150, 10, '#F2B705', { shadowK: 0.4 }); for (const q of [-1, 1]) clay(g, q * 128 - 36, y0 + 320, 72, 72, 8, '#CBE4F2', { shadowK: 0.3 });
      B.shadowed(g, () => rr(g, -190, y0 + 52, 380, 72), theme.navy, 0.4); g.fillStyle = theme.navy; rr(g, -190, y0 + 52, 380, 72, 12); g.fill(); txt(g, 'THE HOUSE', 0, y0 + 90, F.hero(56), theme.paper);
      const wn = t - p.winsAt; if (wn > -0.02) { const k = spring(Math.max(0, wn), 'snappy'); g.save(); g.translate(0, y0 + h - 70 + (1 - k) * 40); g.globalAlpha *= clamp(wn / 0.1); marker(g, -w * 0.42, -44, w * 0.84, 88, theme.gold, clamp(wn / 0.3), 0.5); txt(g, 'ALWAYS WINS', 0, 4, F.hero(72), theme.ink);
        const xn = t - p.xAt; if (xn > 0) { const u = ease.out(clamp(xn / 0.3)); g.strokeStyle = theme.badInk; g.lineWidth = 14; g.lineCap = 'round'; g.beginPath(); g.moveTo(-w * 0.4, 6); g.lineTo(-w * 0.4 + w * 0.8 * u, 6 - 10 * u); g.stroke(); } g.restore(); }
      const xn2 = t - p.xAt; if (xn2 > 0.25) { const k = spring(xn2 - 0.25, 'bouncy'); g.save(); g.translate(0, y0 + h * 0.46); g.rotate(-0.1); g.scale(k, k); g.fillStyle = 'rgba(245,243,238,.95)'; rr(g, -260, -60, 520, 120, 12); g.fill(); g.strokeStyle = theme.goodInk; g.lineWidth = 9; rr(g, -253, -53, 506, 106, 9); g.stroke(); txt(g, 'NOT THIS TIME', 0, 4, F.hero(68), theme.goodInk); g.restore(); }
    },
  });

  // ---------------------------------------------------------------- qticket: a ticket with a big "?"
  B.register('qticket', {
    defaults: { qAt: NOW, tagAt: NOW, tags: ['IN A STORE?', 'IN BULK?', 'HOW?'], w: 760, h: 540, stampAt: NOW, stampText: "CAN'T PROVE IT" }, size: p => [p.w, p.h],
    anchors: p => ({ ticket: [0, -p.h * 0.1, p.w * 0.8, p.h * 0.5], q: [0, -p.h * 0.1, 200, 220] }),
    draw(g, p, env) {
      const { t, lt, theme } = env, w = p.w, h = p.h; const k = spring(lt, 'snappy'); g.save(); g.globalAlpha *= clamp(lt / 0.1); g.translate(0, (1 - k) * 80);
      B.ticket(g, 0, -h * 0.1, 640, 290, -0.04, 1, { sh: 18, edge: theme.gold, edgeW: 6, label: 'THE WINNING TICKET' });
      const qn = t - p.qAt; if (qn > -0.02) { const qk = spring(Math.max(0, qn), 'bouncy'); g.save(); g.translate(120, -h * 0.1); g.scale(0.4 + 0.6 * qk, 0.4 + 0.6 * qk); g.rotate(0.08); g.globalAlpha *= clamp(qn / 0.1); g.fillStyle = theme.paper; g.beginPath(); g.arc(0, 0, 118, 0, 7); g.fill(); g.strokeStyle = theme.badInk; g.lineWidth = 12; g.stroke(); txt(g, '?', 0, 8, F.hero(190), theme.badInk); g.restore(); }
      p.tags.forEach((s, i) => { const tn = t - (p.tagAt + i * 0.32); if (tn < 0) return; const tk = spring(tn, 'bouncy'), x = (i - 1) * 245, y = h * 0.24; g.save(); g.translate(x, y); g.rotate((i - 1) * 0.05); g.scale(0.5 + 0.5 * tk, 0.5 + 0.5 * tk); g.globalAlpha *= clamp(tn / 0.08); paper(g, -112, -34, 224, 68, 12, { lift: 0.3 }); txt(g, s, 0, 3, F.cap(28), theme.ink); g.restore(); });
      const sn = t - p.stampAt; if (sn > 0) { const sc = 1 + 1.1 * (1 - ease.expo(clamp(sn / 0.2))), sf = F.hero(70), sw = p.stampText.length * 40 + 80; g.save(); g.translate(0, h * 0.4); g.rotate(-0.07); g.scale(sc, sc); g.globalAlpha *= clamp(sn / 0.05); g.fillStyle = 'rgba(245,243,238,.95)'; rr(g, -sw / 2, -56, sw, 112, 12); g.fill(); g.strokeStyle = theme.badInk; g.lineWidth = 8; rr(g, -sw / 2 + 6, -50, sw - 12, 100, 9); g.stroke(); txt(g, p.stampText, 0, 4, sf, theme.badInk); g.restore(); burst(g, 0, h * 0.4, sw * 0.5, theme.bad, sn - 0.1, 14, 0.45); }
      g.restore();
    },
  });

  // ---------------------------------------------------------------- oneticket: the friend who buys ONE ticket and prays
  B.register('oneticket', {
    defaults: { xAt: NOW, winsAt: NOW, w: 760, h: 700 }, size: p => [p.w, p.h], anchors: p => ({ sign: [0, -p.h * 0.2, p.w * 0.8, 130], ticket: [0, -p.h * 0.05, p.w * 0.8, p.h * 0.45] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 22, { lift });
      g.save(); rr(g, x0, y0, w, h, 22); g.clip(); const bg = g.createLinearGradient(0, y0, 0, y0 + h); bg.addColorStop(0, '#E6DDF4'); bg.addColorStop(1, '#F6E8C0'); g.fillStyle = bg; g.fillRect(x0, y0, w, h); g.restore();
      txt(g, 'THE FRIEND WHO BUYS', 0, y0 + 62, F.cap(40), theme.ink); txt(g, 'ONE TICKET', 0, y0 + 132, F.hero(92), theme.badInk);
      const wn = t - p.winsAt, k = wn > -0.2 ? ease.out(clamp((wn + 0.2) / 0.5)) : 0;
      g.save(); g.translate(0, y0 + 330); g.rotate(-0.05 + Math.sin(t * 1.3) * 0.015); B.ticket(g, 0, 0, 440, 200, 0, 1, { sh: 16, edge: theme.gold, edgeW: 6, label: 'ONE TICKET' }); g.restore();
      // sparkles = the prayer
      for (let i = 0; i < 10; i++) { const a = k * clamp((wn + 0.2) / 0.4 + i * 0.02); if (a <= 0) continue; const ang = i / 10 * Math.PI * 2 + t * 0.6, r = 190 + 30 * Math.sin(t * 3 + i), x = Math.cos(ang) * r * 1.2, y = y0 + 330 + Math.sin(ang) * r * 0.55; g.save(); g.translate(x, y); g.rotate(ang); g.globalAlpha *= a; g.fillStyle = theme.gold; g.beginPath(); for (let j = 0; j < 8; j++) { const rr2 = j % 2 ? 6 : 16, aa = j / 8 * Math.PI * 2; g.lineTo(Math.cos(aa) * rr2, Math.sin(aa) * rr2); } g.closePath(); g.fill(); g.restore(); }
      if (wn > -0.02) { const kk = spring(Math.max(0, wn), 'snappy'); g.save(); g.translate(0, y0 + h - 100 + (1 - kk) * 40); g.globalAlpha *= clamp(wn / 0.1); marker(g, -w * 0.4, -46, w * 0.8, 92, theme.gold, clamp(wn / 0.3), 0.5); txt(g, 'AND PRAYS', 0, 4, F.hero(76), theme.ink);
        const xn = t - p.xAt; if (xn > 0) { const u = ease.out(clamp(xn / 0.3)); g.strokeStyle = theme.badInk; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); g.moveTo(-w * 0.34, 6); g.lineTo(-w * 0.34 + w * 0.68 * u, 2); g.stroke(); } g.restore(); }
    },
  });
})();
