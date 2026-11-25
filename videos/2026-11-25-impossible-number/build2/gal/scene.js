// ===== Impossible Number (long-form) — custom recipes, part A: shared helpers, icons, ticket, calendar, folder, checklist, headline, panel, badge, silhouette =====
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, countAt, hash, hit, wobble } = B;
  const tone = (n, p) => B.tone(n, p);
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const OIL = '#D9A21B', OIL2 = '#8A5E08', WATER = '#2F6FA8', WATER2 = '#1D4770', STEEL = '#5C6B7E', STEEL2 = '#2E3947', MANILA = '#E2C48D';
  B.PAL = { OIL, OIL2, WATER, WATER2, STEEL, STEEL2, MANILA };
  const pop = (t, o = 'snappy') => clamp(spring(t, o), 0, 1.25);
  const stroke = (g, col, w) => { g.strokeStyle = col; g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'round'; };
  // little cross / tick drawn as vectors (Anton has no glyphs for them)
  function xmark(g, x, y, r, col, k = 1, w = r * 0.32) { if (k <= 0) return; stroke(g, col, w); g.beginPath(); g.moveTo(x - r, y - r); g.lineTo(x - r + 2 * r * clamp(k * 2), y - r + 2 * r * clamp(k * 2)); g.stroke(); if (k > 0.5) { g.beginPath(); g.moveTo(x + r, y - r); g.lineTo(x + r - 2 * r * clamp(k * 2 - 1), y - r + 2 * r * clamp(k * 2 - 1)); g.stroke(); } }
  function tick(g, x, y, r, col, k = 1, w = r * 0.34) { if (k <= 0) return; stroke(g, col, w); const a = [x - r, y + 0.05 * r], b = [x - r * 0.3, y + r * 0.7], c = [x + r, y - r * 0.7]; g.beginPath(); g.moveTo(...a); const u = clamp(k * 2); g.lineTo(lerp(a[0], b[0], u), lerp(a[1], b[1], u)); if (k > 0.5) { const v = clamp(k * 2 - 1); g.lineTo(lerp(b[0], c[0], v), lerp(b[1], c[1], v)); } g.stroke(); }
  B.xmark = xmark; B.tick = tick;
  function person(g, x, y, s, col, o = {}) { // simple clay figure: feet at (x, y)
    const sw = o.walk ? Math.sin(o.walk) * 0.25 : 0; g.save(); g.translate(x, y); g.scale(s, s);
    g.fillStyle = 'rgba(0,0,0,.28)'; g.beginPath(); g.ellipse(0, 2, 22, 6, 0, 0, 7); g.fill();
    stroke(g, B.shade(col, -0.25), 10); for (const q of [-1, 1]) { g.beginPath(); g.moveTo(q * 7, -30); g.lineTo(q * 7 + Math.sin(sw * q) * 14, -2); g.stroke(); }
    g.fillStyle = col; g.beginPath(); g.roundRect(-17, -78, 34, 52, 12); g.fill(); g.fillStyle = 'rgba(255,255,255,.16)'; g.beginPath(); g.roundRect(-17, -78, 15, 52, 8); g.fill();
    g.fillStyle = o.skin || '#E8C9A0'; g.beginPath(); g.arc(0, -94, 15, 0, 7); g.fill();
    if (o.cap) { g.fillStyle = o.cap; g.beginPath(); g.arc(0, -98, 16, Math.PI, 0); g.fill(); g.fillRect(-18, -99, 36, 5); g.fillStyle = '#E8B923'; g.beginPath(); g.arc(0, -101, 3.5, 0, 7); g.fill(); }
    if (o.hat) { g.fillStyle = o.hat; g.beginPath(); g.ellipse(0, -104, 20, 5, 0, 0, 7); g.fill(); g.beginPath(); g.arc(0, -105, 12, Math.PI, 0); g.fill(); }
    g.restore();
  }
  B.person = person;
  // ---------- icons (vector, centred, ±s/2) ----------
  function icon(g, kind, s, col = '#F5F3EE', col2 = '#0B0F14', k = 1) {
    g.save(); const u = s / 100; g.scale(u, u); stroke(g, col, 7);
    switch (kind) {
      case 'coupon': g.fillStyle = col; g.beginPath(); g.roundRect(-50, -32, 100, 64, 6); g.fill(); g.strokeStyle = col2; g.lineWidth = 3; g.setLineDash([5, 5]); g.beginPath(); g.roundRect(-43, -25, 86, 50, 3); g.stroke(); g.setLineDash([]); g.beginPath(); g.arc(-18, 0, 16, 0, 7); g.stroke(); for (let i = 0; i < 3; i++) { g.beginPath(); g.moveTo(8, -12 + i * 12); g.lineTo(38, -12 + i * 12); g.stroke(); } break;
      case 'tank': g.fillStyle = col; g.beginPath(); g.rect(-34, -34, 68, 74); g.fill(); g.beginPath(); g.ellipse(0, 40, 34, 11, 0, 0, 7); g.fill(); g.fillStyle = B.shade(col, 0.25); g.beginPath(); g.ellipse(0, -34, 34, 11, 0, 0, 7); g.fill(); g.fillStyle = col2; g.fillRect(-34, 0, 68, 5); g.fillRect(-34, 18, 68, 5); break;
      case 'chart': stroke(g, col, 7); g.beginPath(); g.moveTo(-42, -40); g.lineTo(-42, 40); g.lineTo(46, 40); g.stroke(); stroke(g, col2, 9); g.beginPath(); g.moveTo(-34, 32); g.lineTo(38, -34); g.stroke(); break;
      case 'building': g.fillStyle = col; g.beginPath(); g.moveTo(-50, -18); g.lineTo(0, -46); g.lineTo(50, -18); g.closePath(); g.fill(); for (let i = 0; i < 4; i++) g.fillRect(-40 + i * 24, -10, 13, 44); g.fillRect(-52, 38, 104, 9); g.fillRect(-48, -14, 96, 6); break;
      case 'shield': g.fillStyle = col; g.beginPath(); g.moveTo(0, -46); g.lineTo(38, -32); g.lineTo(36, 8); g.quadraticCurveTo(30, 34, 0, 48); g.quadraticCurveTo(-30, 34, -36, 8); g.lineTo(-38, -32); g.closePath(); g.fill(); tick(g, 0, 2, 17, col2, k, 8); break;
      case 'rocket': g.save(); g.rotate(0.6); g.fillStyle = col; g.beginPath(); g.moveTo(0, -50); g.quadraticCurveTo(24, -22, 18, 28); g.lineTo(-18, 28); g.quadraticCurveTo(-24, -22, 0, -50); g.fill(); g.fillStyle = col2; g.beginPath(); g.arc(0, -8, 9, 0, 7); g.fill(); g.fillStyle = '#FF3B30'; g.beginPath(); g.moveTo(-18, 12); g.lineTo(-34, 34); g.lineTo(-18, 28); g.fill(); g.beginPath(); g.moveTo(18, 12); g.lineTo(34, 34); g.lineTo(18, 28); g.fill(); g.fillStyle = '#F2B705'; g.beginPath(); g.moveTo(-9, 30); g.lineTo(0, 54); g.lineTo(9, 30); g.fill(); g.restore(); break;
      case 'cuffs': for (const q of [-1, 1]) { g.beginPath(); g.arc(q * 28, 6, 22, 0, 7); g.stroke(); g.fillStyle = col; g.beginPath(); g.roundRect(q * 28 - 8, -26, 16, 12, 3); g.fill(); } stroke(g, col, 5); g.setLineDash([8, 6]); g.beginPath(); g.moveTo(-8, 6); g.lineTo(8, 6); g.stroke(); g.setLineDash([]); break;
      case 'lock': case 'unlock': { const open = kind === 'unlock' ? 1 : 1 - clamp(k); stroke(g, col, 10); g.beginPath(); g.arc(0, -16 - open * 10, 20, Math.PI, 0); g.lineTo(20, -16 - open * 10 + (open ? 0 : 16)); g.stroke(); if (!open) { g.beginPath(); g.moveTo(-20, -16); g.lineTo(-20, -4); g.stroke(); } g.fillStyle = col; g.beginPath(); g.roundRect(-32, -6, 64, 50, 9); g.fill(); g.fillStyle = col2; g.beginPath(); g.arc(0, 14, 7, 0, 7); g.fill(); g.fillRect(-3, 14, 6, 16); break; }
      case 'magnifier': stroke(g, col, 9); g.beginPath(); g.arc(-8, -8, 28, 0, 7); g.stroke(); stroke(g, col, 14); g.beginPath(); g.moveTo(14, 14); g.lineTo(44, 44); g.stroke(); break;
      case 'dollar': g.fillStyle = col; g.beginPath(); g.arc(0, 0, 44, 0, 7); g.fill(); txt(g, '$', 0, 4, F.hero(64), col2); break;
      case 'doc': g.fillStyle = col; g.beginPath(); g.roundRect(-34, -46, 68, 92, 6); g.fill(); stroke(g, col2, 5); for (let i = 0; i < 5; i++) { g.beginPath(); g.moveTo(-22, -26 + i * 16); g.lineTo(i == 4 ? 4 : 22, -26 + i * 16); g.stroke(); } break;
      case 'index': for (let i = 2; i >= 0; i--) { g.save(); g.translate(i * 7 - 7, -i * 8 + 8); g.fillStyle = i ? B.shade(col, -0.12 * i) : col; g.beginPath(); g.roundRect(-38, -24, 76, 48, 5); g.fill(); g.restore(); } stroke(g, col2, 4); g.beginPath(); g.moveTo(-34, -14); g.lineTo(26, -14); g.moveTo(-34, -2); g.lineTo(10, -2); g.stroke(); break;
      case 'handshake': g.fillStyle = col; g.save(); g.rotate(-0.35); g.beginPath(); g.roundRect(-52, -14, 62, 28, 13); g.fill(); g.restore(); g.save(); g.rotate(0.35); g.fillStyle = B.shade(col, -0.18); g.beginPath(); g.roundRect(-10, -14, 62, 28, 13); g.fill(); g.restore(); g.fillStyle = col; g.beginPath(); g.arc(0, 0, 17, 0, 7); g.fill(); stroke(g, col2, 4); for (let i = -1; i <= 1; i++) { g.beginPath(); g.moveTo(-8 + i * 7, -6); g.lineTo(-4 + i * 7, 8); g.stroke(); } break;
      case 'loop': stroke(g, col, 10); g.beginPath(); g.arc(0, 0, 32, -0.4, Math.PI * 1.45); g.stroke(); g.fillStyle = col; g.beginPath(); g.moveTo(24, -36); g.lineTo(52, -22); g.lineTo(20, -10); g.closePath(); g.fill(); break;
      case 'bars': for (let i = -3; i <= 3; i++) { g.fillStyle = col; g.fillRect(i * 14 - 4, -46, 8, 92); } g.fillRect(-50, -50, 100, 8); g.fillRect(-50, 42, 100, 8); break;
      case 'person': person(g, 0, 48, 0.9, col, { hat: null }); break;
      case 'ticket': g.fillStyle = col; g.beginPath(); g.roundRect(-36, -46, 72, 92, 6); g.fill(); stroke(g, col2, 5); g.beginPath(); g.moveTo(-24, -30); g.lineTo(24, -30); g.moveTo(-24, -14); g.lineTo(12, -14); g.stroke(); txt(g, '123', 0, 22, F.hero(34), col2); break;
    }
    g.restore();
  }
  B.icon = icon;
  B.register('icon', { defaults: { kind: 'tank', s: 160, col: 'paper', col2: 'ink', k: 1 }, size: p => [p.s, p.s], draw(g, p, env) { icon(g, p.kind, p.s, tone(p.col, false), tone(p.col2, false), p.k); } });

  // ---------- headline: Anton lines on the stage + a drawn underline (titles, chapter cards) ----------
  B.register('headline', {
    defaults: { kicker: '', lines: ['TITLE'], size: 150, lh: 1.02, tone: 'paper', under: 'accent', underAt: 0.9, per: 0.09, kickerTone: 'accent', align: 'center' }, ownEnter: true,
    size: p => [Math.max(...p.lines.map(l => mw(typeof l === 'string' ? l : l.map(s => s[0]).join(''), F.hero(p.size)))) + 40, p.lines.length * p.size * p.lh + (p.kicker ? 90 : 0) + 60],
    anchors: p => ({ title: [0, (p.kicker ? 45 : 0), 0, 0].map((v, i) => i < 2 ? v : 0) && [0, p.kicker ? 45 : 0, Math.max(...p.lines.map(l => mw(typeof l === 'string' ? l : l.map(s => s[0]).join(''), F.hero(p.size)))) + 40, p.lines.length * p.size * p.lh] }),
    draw(g, p, { lt, theme }) {
      const n = p.lines.length, H = n * p.size * p.lh, top = -(H + (p.kicker ? 90 : 0)) / 2; let wi = 0;
      if (p.kicker) { const k = pop(lt); g.save(); g.globalAlpha = clamp(lt / 0.12); g.translate(0, top + 30 + (1 - k) * 30); const f = F.monoX(34); g.font = f; const kw = g.measureText(p.kicker).width; txt(g, p.kicker, 0, 0, f, tone(p.kickerTone, false)); g.restore(); }
      g.textBaseline = 'middle'; const y0 = top + (p.kicker ? 90 : 0);
      p.lines.forEach((line, li) => { const segs = typeof line === 'string' ? [[line, p.tone]] : line, font = F.hero(p.size), tw = mw(segs.map(s => s[0]).join(''), font); let x = -tw / 2; const y = y0 + (li + 0.5) * p.size * p.lh;
        for (const [s, tn] of segs) { const lt2 = lt - 0.12 - wi * p.per; wi++; const k = pop(lt2), a = clamp(lt2 / 0.1); g.save(); g.globalAlpha *= a; g.translate(0, (1 - k) * p.size * 0.5); g.shadowColor = 'rgba(0,0,0,.5)'; g.shadowBlur = 18 * B.zoomNow; g.shadowOffsetY = 8 * B.zoomNow; g.font = font; g.textAlign = 'left'; g.fillStyle = tone(tn || p.tone, false); g.fillText(s, x, y); g.restore(); x += mw(s, font); } });
      if (p.under) { const k = ease.out(lin(lt - p.underAt, 0, 0.5)), w = Math.max(...p.lines.map(l => mw(typeof l === 'string' ? l : l.map(s => s[0]).join(''), F.hero(p.size)))); if (k > 0) { g.fillStyle = tone(p.under, false); g.beginPath(); g.roundRect(-w / 2, y0 + H + 6, w * k, 16, 8); g.fill(); } }
    },
  });

  // ---------- ticket: the 1991 trade ticket (paper slip, big counter) ----------
  B.register('ticket', {
    defaults: { w: 820, h: 560, to: 123, at: 0, dur: 1.2, size: 230, tag: 'TRADE CONFIRMATION', rows: [['DATE', 'APRIL 16, 1991'], ['STOCK', 'PROCTER & GAMBLE']], rowsAt: 0, label: 'CALL OPTIONS BOUGHT', tone: 'good' }, ownEnter: true,
    size: p => [p.w, p.h], anchors: p => ({ qty: [0, 70, p.w * 0.9, 300], head: [0, -p.h / 2 + 130, p.w, 260] }),
    draw(g, p, env) { const { t, lt, theme, lift } = env, w = p.w, h = p.h, k = spring(lt, 'heavy'), x0 = -w / 2, y0 = -h / 2;
      g.save(); g.translate(0, (1 - k) * 220); g.rotate((1 - k) * 0.12 + (env.lt > 0.5 ? 0 : 0)); g.globalAlpha *= clamp(lt / 0.1);
      paper(g, x0, y0, w, h, 18, { lift }); g.save(); rr(g, x0, y0, w, h, 18); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 96); g.restore();
      txt(g, p.tag, x0 + 34, y0 + 50, F.monoX(32), theme.paper, 'left');
      p.rows.forEach((r, i) => { const on = clamp((t - p.rowsAt - i * 0.12) / 0.2); g.save(); g.globalAlpha *= on; txt(g, r[0], x0 + 40, y0 + 140 + i * 50, F.mono(26), theme.inkSoft, 'left'); txt(g, r[1], x0 + w - 40, y0 + 140 + i * 50, F.monoX(30), theme.ink, 'right'); g.restore(); });
      g.strokeStyle = theme.rule; g.lineWidth = 3; g.setLineDash([10, 9]); g.beginPath(); g.moveTo(x0 + 34, y0 + 128 + p.rows.length * 50 + 8); g.lineTo(x0 + w - 34, y0 + 128 + p.rows.length * 50 + 8); g.stroke(); g.setLineDash([]);
      const lt2 = t - p.at, v = lt2 < 0 ? 0 : countAt(lt2, p.dur, 0, p.to), land = lt2 - p.dur, s = 1 + (land > 0 ? 0.13 * (1 - spring(land, { f: 2.4, z: 0.42 })) : 0) + (env.hot === 'qty' ? 0.03 * env.hotK : 0), by = y0 + h - 170;
      g.save(); g.translate(0, by); g.scale(s, s); roll(g, v, 0, 0, { font: F.hero(p.size), size: p.size, color: tone(p.tone, true), speed: lt2 > 0 && lt2 < p.dur ? p.to / p.dur : 0 }); g.restore(); burst(g, 0, by, w * 0.4, tone(p.tone, false), land, 18, 0.55);
      txt(g, p.label, 0, y0 + h - 40, F.cap(34), theme.inkSoft); g.restore(); },
  });

  // ---------- calendar: rolling year or flipping date pages ----------
  B.register('calendar', {
    defaults: { w: 640, h: 500, band: 'bad', head: 'YEAR', roll: null, pages: [], size: 190, sub: '', subAt: 0 }, size: p => [p.w, p.h], anchors: p => ({ value: [0, 30, p.w * 0.9, p.size * 1.2] }),
    draw(g, p, env) { const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2;
      paper(g, x0, y0, w, h, 24, { lift }); g.save(); rr(g, x0, y0, w, h, 24); g.clip(); g.fillStyle = tone(p.band, true); g.fillRect(x0, y0, w, 86); g.restore(); for (const q of [-1, 1]) { g.fillStyle = '#1B2430'; g.beginPath(); g.roundRect(q * w * 0.28 - 9, y0 - 14, 18, 42, 9); g.fill(); }
      txt(g, p.head, 0, y0 + 46, F.cap(40), theme.paper);
      if (p.roll) { const lt = t - p.roll.at, v = lt < 0 ? p.roll.from : countAt(lt, p.roll.dur, p.roll.from, p.roll.to, ease.inOut), land = lt - p.roll.dur, s = 1 + (land > 0 ? 0.1 * (1 - spring(land, { f: 2.4, z: 0.42 })) : 0);
        g.save(); g.translate(0, 34); g.scale(s, s); roll(g, v, 0, 0, { font: F.hero(p.size), size: p.size, color: theme.ink, commas: false, speed: lt > 0 && lt < p.roll.dur ? Math.abs(p.roll.to - p.roll.from) / p.roll.dur : 0 }); g.restore(); }
      if (p.pages.length) { let i = 0; p.pages.forEach((pg, j) => { if (t >= pg.at) i = j; }); const pg = p.pages[i], u = lin(t, pg.at, pg.at + 0.32), prev = i ? p.pages[i - 1] : null;
        g.save(); g.beginPath(); g.rect(x0 + 10, y0 + 90, w - 20, h - 100); g.clip();
        if (prev && u < 1) { g.save(); g.translate(0, 34 + u * 140); g.globalAlpha = 1 - u; txt(g, prev.text, 0, 0, F.hero(pg.size || p.size), theme.ink); g.restore(); }
        g.save(); g.translate(0, 34 - (1 - ease.out(u)) * 150); g.globalAlpha = prev ? u : clamp((t - pg.at + 0.1) / 0.15); const s = 1 + 0.08 * hit(t - pg.at - 0.3, 6) * (prev ? 1 : 0); g.scale(s, s); txt(g, pg.text, 0, 0, F.hero(pg.size || p.size), tone(pg.tone || 'ink', true)); g.restore(); g.restore(); }
      if (p.sub) { const on = t - p.subAt; if (on > 0) { g.save(); g.globalAlpha = clamp(on / 0.12); g.translate(0, h / 2 - 52 + (1 - pop(on)) * 24); txt(g, p.sub, 0, 0, F.cap(36), theme.inkSoft); g.restore(); } } },
  });

  // ---------- folder: manila case-file folder with a tab, icon and title ----------
  B.register('folder', {
    defaults: { w: 520, h: 640, tab: '1920', title: 'THE COUPON', sub: '', icon: 'coupon', stamp: '', stampAt: 99999, tone: 'bad' }, size: p => [p.w, p.h], anchors: p => ({ head: [0, -p.h / 2 + 90, p.w, 180], icon: [0, -40, p.w * 0.7, 280] }),
    draw(g, p, env) { const { t, lt, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, M = theme.manila || MANILA;
      const body = () => { g.beginPath(); g.moveTo(x0, y0 + 64); g.lineTo(x0 + 190, y0 + 64); g.lineTo(x0 + 220, y0 + 22); g.lineTo(x0 + 380, y0 + 22); g.lineTo(x0 + 400, y0 + 64); g.lineTo(x0 + w, y0 + 64); g.lineTo(x0 + w, y0 + h); g.lineTo(x0, y0 + h); g.closePath(); };
      B.shadowed(g, body, M, lift); g.save(); body(); g.clip(); const lg = g.createLinearGradient(x0, y0, x0 + w * 0.7, y0 + h); lg.addColorStop(0, 'rgba(255,255,255,.28)'); lg.addColorStop(0.5, 'rgba(255,255,255,0)'); lg.addColorStop(1, 'rgba(80,50,10,.18)'); g.fillStyle = lg; g.fillRect(x0, y0, w, h); g.globalAlpha = 0.5; g.globalCompositeOperation = 'multiply'; g.fillStyle = B.grainPattern; g.fillRect(x0, y0, w, h); g.restore();
      txt(g, p.tab, x0 + 300, y0 + 44, F.monoX(30), '#5a4010'); g.fillStyle = theme.paper; g.beginPath(); g.roundRect(x0 + 38, y0 + 104, w - 76, h - 150, 12); g.fill();
      const ik = pop(lt - 0.1); g.save(); g.translate(0, -50); g.scale(0.7 + 0.3 * ik, 0.7 + 0.3 * ik); icon(g, p.icon, 230, tone(p.tone, true), theme.paper); g.restore();
      txt(g, p.title, 0, h / 2 - 150, F.hero(62), theme.ink); if (p.sub) txt(g, p.sub, 0, h / 2 - 92, F.mono(24), theme.inkSoft);
      const on = t - p.stampAt; if (on > 0 && p.stamp) { g.save(); g.translate(0, 30); g.rotate(-0.12); const sc = 1 + 1.6 * (1 - ease.expo(on / 0.22)) - 0.06 * wobble(on - 0.2, 5, 9); g.scale(sc, sc); g.globalAlpha = clamp(on / 0.06); const sw = mw(p.stamp, F.hero(54)) + 50;
        g.fillStyle = rgba(theme.paper, 0.92); rr(g, -sw / 2, -44, sw, 88, 10); g.fill(); g.strokeStyle = theme.badInk; g.lineWidth = 6; rr(g, -sw / 2 + 6, -38, sw - 12, 76, 7); g.stroke(); txt(g, p.stamp, 0, 4, F.hero(54), theme.badInk); g.restore(); burst(g, 0, 30, sw * 0.55, theme.bad, on - 0.16, 14, 0.45); } },
  });

  // ---------- checklist: THE IMPOSSIBLE NUMBER TEST card with a padlock ----------
  B.register('checklist', {
    defaults: { w: 1000, h: 760, title: 'THE IMPOSSIBLE NUMBER TEST', rows: [], lockOpen: 99999, tickTone: 'bad' }, size: p => [p.w, p.h], anchors: p => ({ head: [0, -p.h / 2 + 80, p.w, 150], ...Object.fromEntries(p.rows.map((r, i) => ['r' + i, [0, -p.h / 2 + 250 + i * 150, p.w * 0.92, 130]])) }),
    draw(g, p, env) { const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift });
      g.save(); rr(g, x0, y0, w, h, 26); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 150); g.restore(); txt(g, p.title, x0 + 50, y0 + 76, F.hero(58), theme.paper, 'left');
      const lk = clamp((t - p.lockOpen) / 0.35); g.save(); g.translate(x0 + w - 90, y0 + 75); g.rotate(lk > 0 ? -0.2 * Math.sin(Math.PI * lk) : 0); icon(g, 'lock', 80, '#F2B705', '#0B0F14', lk); g.restore();
      p.rows.forEach((r, i) => { const y = y0 + 250 + i * 150, sh = r.show == null ? 1 : pop(t - r.show), tk = r.tick == null ? 0 : t - r.tick; g.save(); g.translate(0, y);
        g.strokeStyle = theme.ink; g.lineWidth = 7; rr(g, x0 + 54, -34, 68, 68, 12); g.stroke(); if (tk > 0) { g.fillStyle = rgba(theme.good, 0.0); tick(g, x0 + 88, 2, 28, theme.badInk, ease.out(lin(tk, 0, 0.3)), 11); burst(g, x0 + 88, 0, 44, theme.bad, tk - 0.1, 10, 0.4); }
        txt(g, String(i + 1), x0 + 54 + 34, 2, F.hero(40), r.show == null ? theme.ink : 'rgba(0,0,0,0)'); if (tk <= 0 && r.show == null) { } 
        g.save(); g.globalAlpha = clamp(sh); g.translate((1 - sh) * 40, 0); if (r.t) txt(g, r.t, x0 + 160, 2, F.cap(r.size || 46), theme.ink, 'left'); g.restore();
        if (r.show != null && !(r.t && sh > 0.05)) { g.fillStyle = theme.rule; g.beginPath(); g.roundRect(x0 + 160, -9, w * 0.5, 18, 9); g.fill(); } if (r.show == null) { g.fillStyle = theme.rule; g.beginPath(); g.roundRect(x0 + 160, -9, w * 0.5, 18, 9); g.fill(); }
        g.restore(); }); },
  });

  // ---------- panel: paper card with an icon, title, optional mark (x / check / lock) ----------
  B.register('panel', {
    defaults: { w: 520, h: 600, title: 'PANEL', sub: '', icon: 'coupon', iconS: 200, tone: 'ink', mark: '', markAt: 99999, fill: 'paper', lines: [], titleSize: 54 }, size: p => [p.w, p.h], anchors: p => ({ icon: [0, -p.h * 0.1, p.w * 0.8, p.h * 0.5], title: [0, p.h * 0.3, p.w, 160] }),
    draw(g, p, env) { const { t, lt, theme, lift } = env, w = p.w, h = p.h; paper(g, -w / 2, -h / 2, w, h, 26, { lift, fill: tone(p.fill) }); const dark = p.fill === 'navy', fg = dark ? theme.paper : theme.ink;
      g.save(); g.translate(0, -h * 0.13); const k = pop(lt - 0.08); g.scale(0.7 + 0.3 * k, 0.7 + 0.3 * k); icon(g, p.icon, p.iconS, p.tone === 'ink' ? (dark ? theme.paper : theme.navy) : tone(p.tone, !dark), dark ? theme.navy : theme.paper); g.restore();
      const lines = p.title.split('\\n'); lines.forEach((l, i) => txt(g, l, 0, h * 0.27 + (i - (lines.length - 1) / 2) * p.titleSize * 1.05, F.hero(p.titleSize), fg)); if (p.sub) txt(g, p.sub, 0, h / 2 - 50, F.mono(24), dark ? rgba(theme.paper, 0.75) : theme.inkSoft);
      p.lines.forEach((l, i) => { const on = t - (l.at ?? -9); if (on > 0) { g.save(); g.globalAlpha = clamp(on / 0.12); g.translate(0, (1 - pop(on)) * 20); txt(g, l.t, 0, h / 2 - 60 - (p.lines.length - 1 - i) * 46, F.cap(l.size || 32), tone(l.tone || 'ink', !dark)); g.restore(); } });
      const on = t - p.markAt; if (on > 0 && p.mark) { g.save(); g.translate(w * 0.28, -h * 0.34); const sc = 1 + 0.5 * hit(on, 9); g.scale(sc, sc); if (p.mark === 'x') { g.fillStyle = theme.paper; g.beginPath(); g.arc(0, 0, 52, 0, 7); g.fill(); g.fillStyle = theme.badInk; g.beginPath(); g.arc(0, 0, 46, 0, 7); g.fill(); xmark(g, 0, 0, 20, theme.paper, ease.out(lin(on, 0, 0.25)), 9); } else if (p.mark === 'check') { g.fillStyle = theme.goodInk; g.beginPath(); g.arc(0, 0, 46, 0, 7); g.fill(); tick(g, 0, 2, 22, theme.paper, ease.out(lin(on, 0, 0.3)), 9); } else if (p.mark === 'lock') { g.fillStyle = '#F2B705'; g.beginPath(); g.arc(0, 0, 50, 0, 7); g.fill(); icon(g, 'lock', 64, '#0B0F14', '#F2B705', 0); } g.restore(); burst(g, w * 0.28, -h * 0.34, 62, p.mark === 'check' ? theme.good : theme.bad, on - 0.1, 12, 0.4); } },
  });

  // ---------- badge: clay pill with text ----------
  B.register('badge', {
    defaults: { text: 'BADGE', tone: 'navy', size: 40, tcol: 'paper' }, size: p => [mw(p.text, F.cap(p.size)) + p.size * 1.6, p.size * 1.9],
    draw(g, p, env) { const [w, h] = this.size(p); clay(g, -w / 2, -h / 2, w, h, h / 2, tone(p.tone, false), { lift: env.lift }); txt(g, p.text, 0, 2, F.cap(p.size), tone(p.tcol, false)); },
  });

  // ---------- silh: person card (silhouette bust, name plate, role). Always tagged ILLUSTRATION; no photos. ----------
  B.register('silh', {
    defaults: { w: 440, h: 580, name: 'NAME', role: '', hat: 'none', tone: 'navy', tag: 'ILLUSTRATION', tagAt: 0 }, size: p => [p.w, p.h], anchors: p => ({ name: [0, p.h / 2 - 110, p.w, 190] }),
    draw(g, p, env) { const { t, lt, theme, lift } = env, w = p.w, h = p.h; paper(g, -w / 2, -h / 2, w, h, 24, { lift });
      g.save(); rr(g, -w / 2 + 22, -h / 2 + 22, w - 44, h - 230, 14); g.clip(); const bg = g.createLinearGradient(0, -h / 2, 0, h / 2); bg.addColorStop(0, '#D9D4C6'); bg.addColorStop(1, '#BDB6A4'); g.fillStyle = bg; g.fillRect(-w / 2, -h / 2, w, h);
      const k = pop(lt - 0.05), by = h / 2 - 200 + (1 - k) * 80; g.fillStyle = tone(p.tone, true); g.beginPath(); g.moveTo(-w * 0.36, by + 60); g.quadraticCurveTo(-w * 0.36, by - 40, 0, by - 46); g.quadraticCurveTo(w * 0.36, by - 40, w * 0.36, by + 60); g.closePath(); g.fill();
      g.fillStyle = B.shade(tone(p.tone, true), -0.15); g.beginPath(); g.arc(0, by - 130, 62, 0, 7); g.fill(); g.fillStyle = tone(p.tone, true); g.beginPath(); g.arc(0, by - 132, 62, 0, 7); g.fill();
      if (p.hat === 'bowler') { g.fillStyle = '#16202e'; g.beginPath(); g.ellipse(0, by - 170, 84, 14, 0, 0, 7); g.fill(); g.beginPath(); g.arc(0, by - 172, 50, Math.PI, 0); g.fill(); }
      if (p.hat === 'press') { g.fillStyle = '#16202e'; g.beginPath(); g.ellipse(0, by - 178, 74, 10, 0, 0, 7); g.fill(); g.beginPath(); g.roundRect(-46, by - 218, 92, 44, 8); g.fill(); g.fillStyle = '#D8D3C7'; g.fillRect(-46, by - 188, 92, 8); }
      g.restore(); g.fillStyle = theme.navy; g.beginPath(); g.roundRect(-w / 2 + 22, h / 2 - 192, w - 44, 140, 12); g.fill(); txt(g, p.name, 0, h / 2 - 144, F.hero(46), theme.paper); if (p.role) txt(g, p.role, 0, h / 2 - 92, F.mono(23), rgba(theme.paper, 0.78)); txt(g, p.tag, 0, h / 2 - 28, F.mono(18), theme.inkSoft); },
  });
})();
// ===== part B: coupon, queue, dotgrid, pyramid, news, banks, dict, tanks, tankcut, flow, receiptstack, pipes, tankpair =====
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, countAt, hash, hit, wobble } = B;
  const tone = (n, p) => B.tone(n, p), { OIL, OIL2, WATER, WATER2, STEEL, STEEL2 } = B.PAL, icon = B.icon, person = B.person, xmark = B.xmark, tick = B.tick;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const pop = (t, o = 'snappy') => clamp(spring(t, o), 0, 1.25);
  const stroke = (g, col, w) => { g.strokeStyle = col; g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'round'; };
  const lbl = (g, s, x, y, size, col, a = 1) => { g.save(); g.globalAlpha *= a; txt(g, s, x, y, F.cap(size), col); g.restore(); };

  // ---------- coupon: international reply coupon (paper, perforated), flips in ----------
  B.register('coupon', {
    defaults: { w: 720, h: 440, flipAt: 0, title: 'INTERNATIONAL', sub: 'REPLY COUPON' }, ownEnter: true, size: p => [p.w, p.h], anchors: p => ({ face: [0, 0, p.w, p.h] }),
    draw(g, p, env) { const { t, lt, theme, lift } = env, w = p.w, h = p.h, k = clamp(spring(t - p.flipAt, 'soft'), 0, 1.1), sx = Math.cos((1 - k) * Math.PI * 0.5 + 0) * 1; g.save(); g.globalAlpha *= clamp(lt / 0.1); g.translate(0, (1 - k) * 120); g.scale(Math.max(0.02, sx), 1);
      paper(g, -w / 2, -h / 2, w, h, 16, { lift, fill: '#EFE6CF' }); g.strokeStyle = tone('bad', true); g.lineWidth = 4; g.setLineDash([12, 8]); rr(g, -w / 2 + 20, -h / 2 + 20, w - 40, h - 40, 8); g.stroke(); g.setLineDash([]);
      txt(g, p.title, 0, -h / 2 + 90, F.hero(76), theme.navy); txt(g, p.sub, 0, -h / 2 + 168, F.hero(76), theme.badInk);
      g.strokeStyle = theme.navy; g.lineWidth = 5; g.beginPath(); g.arc(-w / 2 + 120, h / 2 - 105, 58, 0, 7); g.stroke(); g.beginPath(); g.arc(-w / 2 + 120, h / 2 - 105, 42, 0, 7); g.stroke(); txt(g, 'POST', -w / 2 + 120, h / 2 - 105, F.mono(22), theme.navy);
      for (let i = 0; i < 3; i++) { g.fillStyle = theme.rule; g.beginPath(); g.roundRect(-w / 2 + 230, h / 2 - 140 + i * 30, w - 320 - i * 50, 12, 6); g.fill(); } g.restore(); },
  });

  // ---------- queue: investors marching to a door; police caps can be added ----------
  B.register('queue', {
    defaults: { w: 1700, h: 520, n: 11, door: 'SECURITIES EXCHANGE CO.', capsAt: 99999, caps: 7, at: 0, doorTone: 'navy' }, size: p => [p.w, p.h], anchors: p => ({ door: [p.w / 2 - 210, 0, 420, p.h], line: [-120, 90, p.w - 520, 300] }),
    draw(g, p, env) { const { t, lt, theme, lift } = env, w = p.w, h = p.h, gy = h / 2 - 40; g.fillStyle = rgba(theme.paper, 0.22); rr(g, -w / 2, gy, w, 6, 3); g.fill();
      const dx = w / 2 - 230; B.shadowed(g, () => rr(g, dx - 170, -h / 2 + 10, 340, h - 50, 12), theme.navy, lift); g.save(); rr(g, dx - 170, -h / 2 + 10, 340, h - 50, 12); g.clip(); const lg = g.createLinearGradient(dx - 170, 0, dx + 170, 0); lg.addColorStop(0, 'rgba(255,255,255,.14)'); lg.addColorStop(1, 'rgba(0,0,0,.2)'); g.fillStyle = lg; g.fillRect(dx - 170, -h / 2, 340, h); g.restore();
      g.fillStyle = '#1B2430'; g.beginPath(); g.roundRect(dx - 70, gy - 230, 140, 230, [70, 70, 0, 0]); g.fill(); g.fillStyle = '#F2B705'; g.beginPath(); g.arc(dx + 38, gy - 110, 7, 0, 7); g.fill();
      const lines = p.door.split(' '), half = Math.ceil(lines.length / 2); txt(g, lines.slice(0, half).join(' '), dx, -h / 2 + 72, F.hero(40), theme.paper); txt(g, lines.slice(half).join(' '), dx, -h / 2 + 122, F.hero(40), theme.paper);
      for (let i = 0; i < p.n; i++) { const on = t - p.at - i * 0.12; if (on < 0) continue; const x0 = -w / 2 + 120 + i * ((w - 520) / p.n), arrive = pop(on, 'soft'), x = lerp(x0 - 300, x0, clamp(arrive)), cap = i < p.caps && t >= p.capsAt + (p.caps - 1 - i) * 0.1;
        g.save(); g.globalAlpha *= clamp(on / 0.2); person(g, x + (t * 14 % 6), gy, 1.45, ['#6F86B8', '#B9835A', '#8E5A5A', '#5F8F7B', '#A38A4F'][i % 5], { walk: t * 6 + i * 1.7, cap: cap ? '#2A56C6' : null }); g.restore(); } },
  });

  // ---------- dotgrid: N dots, ONE highlighted (1 in 6,000) ----------
  B.register('dotgrid', {
    defaults: { cols: 100, rows: 60, gap: 15, at: 0, hiAt: 99999, hiCol: 71, hiRow: 22, per: 0.6 }, size: p => [p.cols * p.gap + 60, p.rows * p.gap + 60], anchors: p => ({ hi: [(p.hiCol - (p.cols - 1) / 2) * p.gap, (p.hiRow - (p.rows - 1) / 2) * p.gap, 90, 90] }),
    draw(g, p, env) { const { t, theme } = env, [w, h] = this.size(p); paper(g, -w / 2, -h / 2, w, h, 24, { lift: env.lift, fill: '#1B2430', grain: false }); const on = lin(t - p.at, 0, p.per);
      g.fillStyle = rgba(theme.paper, 0.78); g.beginPath(); const n = Math.floor(p.cols * p.rows * ease.out(on)); for (let i = 0; i < n; i++) { const c = i % p.cols, r = Math.floor(i / p.cols); if (c === p.hiCol && r === p.hiRow) continue; const x = (c - (p.cols - 1) / 2) * p.gap, y = (r - (p.rows - 1) / 2) * p.gap; g.moveTo(x + 4, y); g.arc(x, y, 4, 0, 7); } g.fill();
      const hk = t - p.hiAt; if (hk > 0) { const x = (p.hiCol - (p.cols - 1) / 2) * p.gap, y = (p.hiRow - (p.rows - 1) / 2) * p.gap; g.save(); g.translate(x, y); const s = 1 + 2.4 * pop(hk, 'bouncy') * 1; g.scale(s, s); g.fillStyle = theme.good; g.beginPath(); g.arc(0, 0, 4.6, 0, 7); g.fill(); g.restore(); g.strokeStyle = rgba(theme.good, clamp(1 - hk / 0.9)); g.lineWidth = 3; g.beginPath(); g.arc(x, y, 10 + 70 * ease.out(hk / 0.9), 0, 7); g.stroke(); } },
  });

  // ---------- pyramid: newest investors at the bottom, money flows UP to the old ones ----------
  B.register('pyramid', {
    defaults: { rows: 6, at: 0, flowAt: 99999, label: 'NEW MONEY PAYS OLD', w: 1000, h: 760 }, size: p => [p.w, p.h], anchors: p => ({ top: [0, -p.h / 2 + 150, 300, 260], base: [0, p.h / 2 - 190, p.w * 0.8, 260] }),
    draw(g, p, env) { const { t, theme, lift } = env, w = p.w, h = p.h, R = p.rows; paper(g, -w / 2, -h / 2, w, h, 26, { lift, fill: '#18212D', grain: false });
      const pos = (r, i) => [(i - r / 2) * 110, -h / 2 + 150 + r * 92]; for (let r = 0; r < R; r++) for (let i = 0; i <= r; i++) { const on = t - p.at - (R - 1 - r) * 0.18 - i * 0.03; if (on < 0) continue; const [x, y] = pos(r, i), s = pop(on, 'bouncy'); g.save(); g.translate(x, y); g.scale(s, s); clay(g, -22, -22, 44, 44, 22, r === 0 ? '#F2B705' : r < 2 ? '#B9835A' : '#6F86B8', { shadowK: 0.5 }); g.restore(); }
      const fk = t - p.flowAt; if (fk > 0) for (let q = 0; q < 14; q++) { const u = ((fk * 0.55 + q / 14) % 1), r = (R - 1) * (1 - u), i = (R - 1 > 0 ? (r / 2) + (hash(q * 3.3) - 0.5) * r * 0.9 : 0), x = (i - r / 2) * 110, y = -h / 2 + 150 + r * 92; g.save(); g.globalAlpha = Math.sin(Math.PI * clamp(u * 1.0)); g.translate(x, y); clay(g, -15, -15, 30, 30, 15, theme.good, { shadowK: 0.4 }); txt(g, '$', 0, 2, F.hero(22), theme.ink); g.restore(); }
      if (fk > -0.3) { g.save(); g.globalAlpha = clamp((fk + 0.3) / 0.15); txt(g, p.label, 0, h / 2 - 46, F.hero(52), theme.paper); g.restore(); } },
  });

  // ---------- news: spinning EXTRA! newspaper ----------
  B.register('news', {
    defaults: { w: 760, h: 560, head: 'EXTRA!', lines: ['160,000,000', 'COUPONS NEEDED', 'ABOUT 27,000 EXIST'], spin: 0.7 }, ownEnter: true, size: p => [p.w, p.h],
    draw(g, p, env) { const { lt, theme, lift } = env, w = p.w, h = p.h, k = clamp(spring(lt, 'soft'), 0, 1.1), sp = (1 - k) * 4 * Math.PI; g.save(); g.globalAlpha *= clamp(lt / 0.08); g.rotate(-sp); g.scale(0.2 + 0.8 * k, 0.2 + 0.8 * k);
      paper(g, -w / 2, -h / 2, w, h, 10, { lift, fill: '#E9DFC6' }); txt(g, p.head, 0, -h / 2 + 100, F.hero(150), theme.ink); g.fillStyle = theme.ink; g.fillRect(-w / 2 + 40, -h / 2 + 190, w - 80, 5); g.fillRect(-w / 2 + 40, -h / 2 + 200, w - 80, 2);
      p.lines.forEach((l, i) => txt(g, l, 0, -h / 2 + 270 + i * 70, F.hero(i == 0 ? 78 : 50), i == 0 ? theme.badInk : theme.ink)); for (let i = 0; i < 5; i++) { g.fillStyle = theme.rule; g.fillRect(-w / 2 + 50 + (i % 2) * 330, h / 2 - 120 + Math.floor(i / 2) * 26, 300, 10); } g.restore(); },
  });

  // ---------- bank icons: crumble one by one (mode crumble) or turn red (mode red) ----------
  B.register('banks', {
    defaults: { n: 6, cols: 6, s: 150, gap: 40, at: 0, mode: 'crumble', times: null, per: 0.5, label: '', labelAt: 0 }, size: p => { const rows = Math.ceil(p.n / p.cols); return [p.cols * (p.s + p.gap), rows * (p.s + p.gap) + 90]; },
    draw(g, p, env) { const { t, theme } = env, rows = Math.ceil(p.n / p.cols), [w, h] = this.size(p); let down = 0;
      for (let i = 0; i < p.n; i++) { const c = i % p.cols, r = Math.floor(i / p.cols), x = (c - (p.cols - 1) / 2) * (p.s + p.gap), y = (r - (rows - 1) / 2) * (p.s + p.gap) - 20, appear = t - p.at + 0.001 - Math.min(i * 0.02, 0.5), ft = p.times ? p.times[i] : p.at + 0.4 + i * p.per, fall = t - ft; if (appear < 0) continue; if (fall > 0) down++;
        g.save(); g.translate(x, y); g.globalAlpha *= clamp(appear / 0.1); g.scale(pop(appear, 'bouncy'), pop(appear, 'bouncy'));
        if (p.mode === 'crumble') { if (fall > 0) { const f = clamp(fall / 0.7), sh = Math.sin(fall * 60) * 6 * (1 - f); g.translate(sh, ease.in(f) * p.s * 0.35); g.rotate(f * 0.35 * (i % 2 ? 1 : -1)); g.scale(1, 1 - 0.55 * ease.in(f)); g.globalAlpha *= 1 - 0.35 * f; } icon(g, 'building', p.s, fall > 0 ? tone('bad', false) : theme.paper, theme.ink); if (fall > 0 && fall < 0.8) { g.fillStyle = rgba(theme.paper, 0.35 * (1 - fall / 0.8)); for (let q = 0; q < 6; q++) { g.beginPath(); g.arc((hash(q + i * 7) - 0.5) * p.s, p.s * 0.3 - fall * 60 * hash(q * 2 + 1), 8 + 10 * hash(q), 0, 7); g.fill(); } } }
        else { const k = clamp(fall / 0.3), col = fall > 0 ? B.mix('#F5F3EE', theme.bad, k) : theme.paper; const sc = 1 + 0.22 * hit(fall, 9) * (fall > 0 ? 1 : 0); g.scale(sc, sc); icon(g, 'building', p.s, col, theme.ink); }
        g.restore(); }
      if (p.label) { const on = t - p.labelAt; if (on > 0) { g.save(); g.globalAlpha = clamp(on / 0.12); roll(g, down, 0, h / 2 - 30, { font: F.hero(70), size: 70, color: theme.paper, suffix: p.mode === 'crumble' ? ' / ' + p.n : '', align: 'center', commas: false }); g.restore(); } } },
  });

  // ---------- dict: dictionary entry types out ----------
  B.register('dict', {
    defaults: { w: 1000, h: 420, word: 'Pon·zi scheme', pos: 'noun', def: "pays old investors with new investors' money", at: 0 }, size: p => [p.w, p.h],
    draw(g, p, env) { const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2; paper(g, x0, -h / 2, w, h, 20, { lift, fill: '#EFE6CF' }); const n = Math.ceil(p.word.length * lin(t - p.at, 0, 0.9)), f = F.hero(110);
      txt(g, p.word.slice(0, n), x0 + 56, -h / 2 + 120, f, theme.ink, 'left'); if (t - p.at > 0.95) { const cx = x0 + 56 + mw(p.word, f) + 24; if (Math.floor(t * 3) % 2 == 0 && t - p.at < 1.6) { g.fillStyle = theme.badInk; g.fillRect(cx - 24, -h / 2 + 70, 8, 100); } txt(g, '(' + p.pos + ')', cx, -h / 2 + 140, F.mono(34), theme.inkSoft, 'left'); }
      g.fillStyle = theme.rule; g.fillRect(x0 + 56, -30, w - 112, 4); const on = t - p.at - 1.1; if (on > 0) { g.save(); g.globalAlpha = clamp(on / 0.2); g.translate(0, (1 - pop(on)) * 20); txt(g, '1.', x0 + 56, 50, F.monoX(40), theme.badInk, 'left'); txt(g, p.def, x0 + 120, 50, F.cap(40), theme.ink, 'left'); g.restore(); } },
  });

  // ---------- tanks: a row of storage tanks (tank farm). cutaway=true shows levels ----------
  function tankShape(g, x, y, w, h, col, o = {}) { // cylinder, (x, y) = bottom centre
    const ry = w * 0.16; g.save(); g.translate(x, y); const body = () => { g.beginPath(); g.moveTo(-w / 2, -h); g.lineTo(-w / 2, 0); g.ellipse(0, 0, w / 2, ry, 0, Math.PI, 0, true); g.lineTo(w / 2, -h); g.closePath(); };
    B.shadowed(g, body, col, o.lift || 0, { k: 0.8 }); g.save(); body(); g.clip(); const lg = g.createLinearGradient(-w / 2, 0, w / 2, 0); lg.addColorStop(0, 'rgba(255,255,255,.22)'); lg.addColorStop(0.35, 'rgba(255,255,255,0)'); lg.addColorStop(1, 'rgba(0,0,0,.3)'); g.fillStyle = lg; g.fillRect(-w / 2, -h - ry, w, h + 2 * ry); g.fillStyle = 'rgba(0,0,0,.14)'; for (const q of [0.33, 0.66]) g.fillRect(-w / 2, -h * q - 2, w, 4); g.restore();
    g.fillStyle = B.shade(col, 0.18); g.beginPath(); g.ellipse(0, -h, w / 2, ry, 0, 0, 7); g.fill(); g.fillStyle = 'rgba(0,0,0,.28)'; g.beginPath(); g.ellipse(w * 0.12, -h, w * 0.1, ry * 0.45, 0, 0, 7); g.fill(); g.restore(); }
  B.tankShape = tankShape;
  B.register('tanks', {
    defaults: { n: 5, w: 1500, h: 560, at: 0, pin: 'BAYONNE, N.J.', pinAt: 0 }, size: p => [p.w, p.h], anchors: p => ({ pin: [0, -p.h / 2 + 90, 520, 160] }),
    draw(g, p, env) { const { t, theme, lift } = env, w = p.w, h = p.h, gy = h / 2 - 50; g.fillStyle = rgba(theme.paper, 0.22); rr(g, -w / 2, gy, w, 6, 3); g.fill();
      for (let i = 0; i < p.n; i++) { const on = t - p.at - i * 0.12; if (on < 0) continue; const k = pop(on, 'bouncy'), tw = 190, x = (i - (p.n - 1) / 2) * (w / p.n * 0.98), th = 270 + (i % 2) * 40; g.save(); g.translate(x, gy); g.scale(1, Math.max(0.01, k)); tankShape(g, 0, 0, tw, th, i == 2 ? '#7C8CA0' : STEEL, { lift: 0 }); g.restore(); }
      const pk = t - p.pinAt; if (pk > 0) { const s = pop(pk, 'bouncy'); g.save(); g.translate(0, -h / 2 + 100 - (1 - s) * 90); g.globalAlpha = clamp(pk / 0.1); g.fillStyle = theme.bad; g.beginPath(); g.arc(0, 0, 34, Math.PI * 0.82, Math.PI * 0.18, false); g.lineTo(0, 62); g.closePath(); g.fill(); g.fillStyle = theme.paper; g.beginPath(); g.arc(0, -2, 13, 0, 7); g.fill(); txt(g, p.pin, 62, 2, F.hero(54), theme.paper, 'left'); g.restore(); } },
  });

  // ---------- tankcut: X-ray cutaway of ONE tank: thin oil on top, water below, hidden compartment, inspector's dipstick ----------
  B.register('tankcut', {
    defaults: { w: 760, h: 820, at: 0, oilAt: 0, waterAt: 99999, tubeAt: 99999, stickAt: 99999, stick2At: 99999 }, size: p => [p.w, p.h], anchors: p => ({ water: [0, 150, 560, 380], oil: [0, -p.h / 2 + 250, 560, 120], tube: [-30, 20, 140, 560], hatch: [0, -p.h / 2 + 130, 300, 200] }),
    draw(g, p, env) { const { t, lt, theme, lift } = env, w = p.w, h = p.h, tw = 560, tx = 0, ty = -h / 2 + 200, th = h - 290, ry = 80; const wl = ty + th * 0.2, wk = clamp(spring(t - p.waterAt, 'soft'), 0, 1);
      paper(g, -w / 2, -h / 2, w, h, 26, { lift, fill: '#18212D', grain: false }); g.save(); g.beginPath(); g.moveTo(-tw / 2, ty); g.lineTo(-tw / 2, ty + th); g.ellipse(0, ty + th, tw / 2, ry * 0.6, 0, Math.PI, 0, true); g.lineTo(tw / 2, ty); g.closePath(); g.clip();
      g.fillStyle = '#243142'; g.fillRect(-tw / 2, ty - 40, tw, th + 120); // empty interior
      const oilTop = ty + 18, oilH = lerp(th * 0.78, th * 0.15, wk), waterTop = oilTop + oilH * 0.0; const ok = clamp(spring(t - p.oilAt, 'soft'), 0, 1);
      // water fills from the bottom up to wl, oil sits on it (oil floats)
      const wTop = lerp(ty + th, ty + th * 0.2 + 36, wk), oTop = lerp(ty + th * (1 - 0.78 * ok), wTop - 36 * (wk > 0.01 ? 1 : 0) - (wk > 0.01 ? 0 : 0), 1); const oilTopY = wk > 0.01 ? lerp(ty + th * (1 - 0.78 * ok), ty + th * 0.2 - 4, wk) : ty + th * (1 - 0.78 * ok);
      g.fillStyle = WATER; g.fillRect(-tw / 2, wTop + 0, tw, th + 160); g.fillStyle = WATER2; g.fillRect(-tw / 2, wTop + (th + 160) * 0.55, tw, th);
      g.fillStyle = OIL; g.fillRect(-tw / 2, oilTopY, tw, Math.max(0, wTop - oilTopY + 4)); g.fillStyle = 'rgba(255,255,255,.16)'; g.fillRect(-tw / 2, oilTopY, tw, 6);
      if (wk > 0.5) { g.fillStyle = 'rgba(245,243,238,.3)'; for (let b = 0; b < 12; b++) { const u = ((t * 0.3 + hash(b * 5.1)) % 1), bx = (hash(b * 2.3) - 0.5) * (tw - 80), by = ty + th - u * (ty + th - wTop - 10), r = 5 + 6 * hash(b * 9.7); g.beginPath(); g.arc(bx + Math.sin(t * 2 + b) * 6, by, r, 0, 7); g.fill(); } }
      g.restore(); stroke(g, rgba(theme.paper, 0.85), 6); g.beginPath(); g.moveTo(-tw / 2, ty); g.lineTo(-tw / 2, ty + th); g.ellipse(0, ty + th, tw / 2, ry * 0.6, 0, Math.PI, 0, true); g.lineTo(tw / 2, ty); g.stroke(); g.fillStyle = '#2C394B'; g.beginPath(); g.ellipse(0, ty, tw / 2, ry * 0.5, 0, 0, 7); g.fill(); stroke(g, rgba(theme.paper, 0.85), 6); g.beginPath(); g.ellipse(0, ty, tw / 2, ry * 0.5, 0, 0, 7); g.stroke();
      g.fillStyle = '#C9CED6'; g.beginPath(); g.ellipse(0, ty - 4, 60, 16, 0, 0, 7); g.fill(); // hatch
      const tk = t - p.tubeAt; if (tk > 0) { const u = ease.out(lin(tk, 0, 0.5)); g.save(); g.globalAlpha = 1; g.fillStyle = OIL; g.fillRect(-30 - 24, ty, 48, (th - 20) * u); stroke(g, '#C9CED6', 5); g.beginPath(); g.rect(-54, ty, 48, (th - 20) * u); g.stroke(); const dk = clamp((tk - 0.4) / 0.25); if (dk > 0) { g.strokeStyle = theme.bad; g.lineWidth = 6; g.setLineDash([16, 10]); g.lineDashOffset = -t * 20; g.beginPath(); g.roundRect(-84, ty - 24, 108, th + 30, 12); g.stroke(); g.setLineDash([]); } g.restore(); }
      const sk = t - p.stickAt; if (sk > 0) { const dip = sk < 0.9 ? ease.inOut(lin(sk, 0, 0.45)) * (1 - ease.inOut(lin(sk, 0.55, 0.9))) : 0, sy = ty - 200 + dip * 230; g.save(); stroke(g, '#E5E0D2', 12); g.beginPath(); g.moveTo(0, ty - 330); g.lineTo(0, sy + 0); g.stroke(); g.fillStyle = OIL; g.beginPath(); g.roundRect(-8, sy - 40, 16, 70 * clamp(dip * 3), 6); g.fill(); g.restore(); }
      const sk2 = t - p.stick2At; if (sk2 > 0) { g.save(); g.globalAlpha = clamp(sk2 / 0.1); g.translate(w * 0.26, -h * 0.28); g.fillStyle = theme.goodInk; g.beginPath(); g.roundRect(-96, -34, 192, 68, 14); g.fill(); tick(g, -56, 0, 15, theme.paper, ease.out(lin(sk2, 0, 0.3)), 8); txt(g, 'OIL', 26, 3, F.hero(44), theme.paper); g.restore(); } },
  });

  // ---------- flow: TANK -> INSPECTOR -> RECEIPT -> BANK -> $ (boxes light in turn) ----------
  B.register('flow', {
    defaults: { items: [], w: 1760, h: 360 }, size: p => [p.w, p.h], anchors: p => Object.fromEntries(p.items.map((it, i) => [it.id || 'i' + i, [(i - (p.items.length - 1) / 2) * (p.w / p.items.length), 0, 280, p.h]])),
    draw(g, p, env) { const { t, theme, lift } = env, n = p.items.length, step = p.w / n;
      p.items.forEach((it, i) => { const x = (i - (n - 1) / 2) * step, on = t - it.at;
        if (i < n - 1) { const ak = ease.out(lin(on + 0.1, 0, 0.5)), x0 = x + 112, x1 = x + step - 112; stroke(g, rgba(theme.paper, 0.18), 8); g.beginPath(); g.moveTo(x0, 0); g.lineTo(x1, 0); g.stroke(); if (ak > 0 && on > -0.1) { stroke(g, theme.paper, 8); g.beginPath(); g.moveTo(x0, 0); g.lineTo(lerp(x0, x1, ak), 0); g.stroke(); if (ak > 0.9) { g.fillStyle = theme.paper; g.beginPath(); g.moveTo(x1 + 8, 0); g.lineTo(x1 - 14, -16); g.lineTo(x1 - 14, 16); g.fill(); } } }
        const k = on > 0 ? pop(on, 'bouncy') : 0, s = 0.9 + 0.1 * k + (env.hot === (it.id || 'i' + i) ? 0.05 * env.hotK : 0); g.save(); g.translate(x, 0); g.scale(s, s); const fill = on > 0 ? tone(it.tone || 'paper') : '#2A3647';
        clay(g, -104, -118, 208, 236, 26, on > 0 ? (it.tone ? tone(it.tone, false) : theme.paper) : '#2A3647', { lift: on > 0 ? 0.3 : 0, shadowK: 0.7 }); icon(g, it.icon, 104, on > 0 ? (it.tone ? theme.paper : theme.navy) : rgba(theme.paper, 0.3), on > 0 ? (it.tone ? tone(it.tone, false) : theme.paper) : '#2A3647'); txt(g, it.label, 0, 82, F.cap(it.size || 30), on > 0 ? (it.tone ? theme.paper : theme.ink) : rgba(theme.paper, 0.4)); g.restore(); }); },
  });

  // ---------- receiptstack: receipts multiply while the tank level stays the same ----------
  B.register('receiptstack', {
    defaults: { w: 1500, h: 700, at: 0, per: 0.16, count: 12, label: 'RECEIPT OIL', labelAt: 99999 }, size: p => [p.w, p.h], anchors: p => ({ stack: [260, 0, 900, p.h], tank: [-480, 20, 340, 560] }),
    draw(g, p, env) { const { t, theme, lift } = env, w = p.w, h = p.h, gy = h / 2 - 70; g.fillStyle = rgba(theme.paper, 0.22); rr(g, -w / 2, gy, w, 6, 3); g.fill();
      B.tankShape(g, -w / 2 + 290, gy, 300, 480, STEEL, { lift: 0 }); g.save(); g.beginPath(); g.rect(-w / 2 + 140, gy - 340, 300, 330); g.clip(); g.fillStyle = OIL; g.fillRect(-w / 2 + 140, gy - 150, 300, 160); g.restore(); stroke(g, theme.paper, 4); g.setLineDash([12, 8]); g.beginPath(); g.moveTo(-w / 2 + 120, gy - 150); g.lineTo(-w / 2 + 470, gy - 150); g.stroke(); g.setLineDash([]); txt(g, 'SAME TANK', -w / 2 + 290, gy + 42, F.cap(30), rgba(theme.paper, 0.85));
      for (let i = 0; i < p.count; i++) { const on = t - p.at - i * p.per; if (on < 0) continue; const k = pop(on, 'soft'), col = i % 4, row = Math.floor(i / 4), x = 50 + col * 232 + (hash(i * 4.2) - 0.5) * 20, y = gy - 250 - row * 20 + (row === 0 ? 0 : -row * 10) + (hash(i * 9) - 0.5) * 12 - (i % 2) * 0; g.save(); g.translate(x, y + (1 - k) * 80); g.rotate((hash(i * 1.7) - 0.5) * 0.2 + (1 - k) * 0.4); g.globalAlpha *= clamp(on / 0.1); g.scale(0.9, 0.9); paper(g, -90, -120, 180, 240, 10, { fill: '#F0EAD8', grain: false }); txt(g, 'RECEIPT', 0, -92, F.monoX(22), theme.ink); for (let q = 0; q < 5; q++) { g.fillStyle = theme.rule; g.fillRect(-64, -56 + q * 22, q % 2 ? 100 : 128, 8); } g.fillStyle = OIL; g.beginPath(); g.arc(30, 76, 24, 0, 7); g.fill(); g.restore(); }
      const lk = t - p.labelAt; if (lk > 0) { g.save(); g.globalAlpha = clamp(lk / 0.1); g.translate(250, -h / 2 + 40 - (1 - pop(lk)) * 24); const lw = mw(p.label, F.hero(80)) + 70; clay(g, -lw / 2, -50, lw, 100, 22, theme.bad, { lift: 0.3 }); txt(g, p.label, 0, 4, F.hero(80), theme.paper); g.restore(); } },
  });

  // ---------- pipes: the same oil races ahead of the inspector, counted again and again ----------
  B.register('pipes', {
    defaults: { n: 4, w: 1700, h: 640, at: 0, times: [0, 1, 2, 3], label: 'SAME OIL' }, size: p => [p.w, p.h], anchors: p => ({ count: [0, h0(p) - 120, 900, 160], row: [0, -40, p.w, 380] }),
    draw(g, p, env) { const { t, theme, lift } = env, w = p.w, h = p.h, gy = 60, step = w / p.n; const tx = i => (i - (p.n - 1) / 2) * step * 0.96; let cur = -1; p.times.forEach((tt, i) => { if (t >= tt) cur = i; });
      stroke(g, '#3A4656', 34); g.beginPath(); g.moveTo(tx(0), gy + 60); g.lineTo(tx(p.n - 1), gy + 60); g.stroke(); stroke(g, '#566377', 22); g.beginPath(); g.moveTo(tx(0), gy + 60); g.lineTo(tx(p.n - 1), gy + 60); g.stroke();
      for (let i = 0; i < p.n; i++) { const on = t - p.at - i * 0.1; if (on < 0) continue; const k = pop(on, 'bouncy'); g.save(); g.translate(tx(i), gy); g.scale(1, k); B.tankShape(g, 0, 0, 200, 300, STEEL); const lit = i <= cur; if (lit) { g.save(); g.beginPath(); g.rect(-100, -300, 200, 300); g.clip(); g.fillStyle = OIL; g.fillRect(-100, -300 * (0.55 + 0.1 * Math.sin(i)), 200, 300); g.restore(); } g.restore(); }
      // oil blob travelling through the pipe, one tank ahead of the inspector
      for (let i = 0; i < p.n - 1; i++) { const a = p.times[i], b = p.times[i + 1], u = ease.inOut(lin(t, a - 0.15, b - 0.15)); if (u > 0 && u < 1) { const x = lerp(tx(i), tx(i + 1), u); g.fillStyle = OIL; g.beginPath(); g.ellipse(x, gy + 60, 38, 17, 0, 0, 7); g.fill(); g.fillStyle = 'rgba(255,255,255,.3)'; g.beginPath(); g.ellipse(x - 10, gy + 54, 16, 6, 0, 0, 7); g.fill(); } }
      if (cur >= 0) { const wi = cur >= p.n - 1 ? p.n - 1 : cur, nx = cur < p.n - 1 ? lerp(tx(cur), tx(cur + 1), ease.inOut(lin(t, p.times[cur + 1] - 0.9, p.times[cur + 1]))) : tx(cur); g.save(); g.translate(nx + 10, gy + 240); person(g, 0, 0, 1.5, theme.navy, { walk: t * 7, hat: '#0B0F14' }); g.restore(); }
      if (cur >= 0) { const k = pop(t - p.times[cur], 'bouncy'); g.save(); g.translate(0, -h / 2 + 40); g.scale(0.9 + 0.1 * k, 0.9 + 0.1 * k); const f = F.hero(76); g.font = f; txt(g, p.label + ' · COUNTED ×' + (cur + 1), 0, 0, f, theme.paper); g.restore(); } },
  });
  const h0 = p => p.h / 2;

  // ---------- tankpair: ALL OF THE U.S. vs ALLIED'S RECEIPTS (overflows past the rim) ----------
  B.register('tankpair', {
    defaults: { w: 1600, h: 800, at: 0, a: "ALL OF THE U.S.", sub: 'SOYBEAN + COTTONSEED OIL', b: "ALLIED'S RECEIPTS", fillAt: 99999, overAt: 99999 }, size: p => [p.w, p.h], anchors: p => ({ a: [-380, 60, 500, 640], b: [380, 20, 500, 720] }),
    draw(g, p, env) { const { t, theme, lift } = env, w = p.w, h = p.h, gy = h / 2 - 120; g.fillStyle = rgba(theme.paper, 0.22); rr(g, -w / 2, gy, w, 6, 3); g.fill();
      const fk = clamp(spring(t - p.fillAt, 'soft'), 0, 1.02), ok = ease.out(lin(t - p.overAt, 0, 0.9)); const tanks = [{ x: -380, th: 520, tw: 400, fill: 0.9 * fk, col: STEEL, name: p.a, sub: p.sub }, { x: 380, th: 520, tw: 400, fill: 0.9 * fk + 0.6 * ok, col: STEEL, name: p.b }];
      tanks.forEach((tk, i) => { g.save(); g.translate(tk.x, gy); const on = clamp(spring(t - p.at - i * 0.12, 'bouncy'), 0, 1.1); g.scale(1, Math.max(0.01, on)); B.tankShape(g, 0, 0, tk.tw, tk.th, tk.col); g.save(); g.beginPath(); g.rect(-tk.tw / 2, -tk.th, tk.tw, tk.th); g.clip(); g.fillStyle = OIL; g.fillRect(-tk.tw / 2, -tk.th * Math.min(1, tk.fill), tk.tw, tk.th); g.restore(); if (tk.fill > 1) { const over = (tk.fill - 1) * tk.th * 0.9; g.fillStyle = OIL; g.beginPath(); g.ellipse(0, -tk.th, tk.tw / 2 + 4, tk.tw * 0.16, 0, 0, 7); g.fill(); for (const q of [-1, 1]) { g.beginPath(); g.moveTo(q * tk.tw / 2 - q * 6, -tk.th); g.bezierCurveTo(q * (tk.tw / 2 + 30), -tk.th + over * 0.3, q * (tk.tw / 2 + 36), -tk.th + over * 0.8, q * (tk.tw / 2 + 24), -tk.th + over * 1.1); g.lineTo(q * (tk.tw / 2 - 12), -tk.th + over * 0.4); g.fill(); } g.beginPath(); g.ellipse(0, -tk.th - over * 0.0, 110, 32 + over * 0.15, 0, 0, 7); g.fill(); }
        g.restore(); txt(g, tk.name, tk.x, gy + 62, F.hero(52), theme.paper); if (tk.sub) txt(g, tk.sub, tk.x, gy + 108, F.mono(24), rgba(theme.paper, 0.7)); }); },
  });
})();
// ===== part C: chart, stopwatch, cells, needed, memo, lenses, jail, yearbars, bracket, endslots =====
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, countAt, hash, hit, wobble } = B;
  const tone = (n, p) => B.tone(n, p), { OIL, WATER, STEEL } = B.PAL, icon = B.icon, xmark = B.xmark, tick = B.tick;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const pop = (t, o = 'snappy') => clamp(spring(t, o), 0, 1.25);
  const stroke = (g, col, w) => { g.strokeStyle = col; g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'round'; };

  // ---------- chart: line chart that draws left to right. Series: {kind:'noise'|'crash'|'straight'|'smooth'|'pts', seed, tone, at, dur, w, label, labelAt}. 'straight' is exactly 45 degrees on screen. ----------
  function genSeries(s, PW, PH) {
    const n = s.n || 120, out = [];
    if (s.kind === 'pts') return s.pts;
    if (s.kind === 'straight') { const L = Math.min(PW, PH) * (s.len || 0.94); return [[0, 0], [L / PW, L / PH]]; }
    if (s.kind === 'smooth') { for (let i = 0; i <= n; i++) { const x = i / n; out.push([x, (s.y0 ?? 0.06) + (s.y1 ?? 0.9) * x * (s.k ?? 1) + (hash(i * 3.1 + (s.seed || 1)) - 0.5) * 0.012]); } return out; }
    let y = 0, vals = []; const cr = s.crashAt ?? 2;
    for (let i = 0; i <= n; i++) { const x = i / n; const noise = (hash(i * 1.93 + (s.seed || 1) * 17.7) - 0.5) * 2, dr = s.drift ?? 0.0065; if (x < cr) y += dr + noise * (s.vol ?? 0.045) * (1 + 0.8 * Math.sin(i * 0.31 + (s.seed || 1))); else y -= (s.fall ?? 0.045) * (0.7 + 0.6 * hash(i)) ; vals.push(y); }
    const mn = Math.min(...vals), mx = Math.max(...vals); const lo = s.lo ?? 0.06, hi = s.hi ?? 0.92; return vals.map((v, i) => [i / n, lo + (hi - lo) * (v - mn) / Math.max(1e-6, mx - mn)]);
  }
  B.register('chart', {
    defaults: { w: 1500, h: 760, fill: 'dark', title: '', series: [], angle: null, crack: null, markX: null, axes: true, grid: true, tag: '' }, size: p => [p.w, p.h],
    anchors: p => ({ plot: [0, 20, p.w - 140, p.h - 170], end: [p.w * 0.3, -p.h * 0.2, 420, 340], start: [-p.w * 0.35, p.h * 0.25, 420, 300] }),
    draw(g, p, env) { const { t, theme, lift } = env, w = p.w, h = p.h, dark = p.fill === 'dark', ML = 90, MR = 60, MT = p.title ? 100 : 50, MB = 56, PW = w - ML - MR, PH = h - MT - MB, ox = -w / 2 + ML, oy = h / 2 - MB;
      paper(g, -w / 2, -h / 2, w, h, 26, { lift, fill: dark ? '#18212D' : theme.paper, grain: !dark }); const fg = dark ? theme.paper : theme.ink, soft = dark ? rgba(theme.paper, 0.35) : theme.inkSoft;
      if (p.title) txt(g, p.title, -w / 2 + 44, -h / 2 + 52, F.mono(28), dark ? rgba(theme.paper, 0.75) : theme.inkSoft, 'left');
      if (p.grid) { g.strokeStyle = dark ? rgba(theme.paper, 0.1) : theme.rule; g.lineWidth = 2; for (let i = 1; i <= 4; i++) { g.beginPath(); g.moveTo(ox, oy - PH * i / 4); g.lineTo(ox + PW, oy - PH * i / 4); g.stroke(); } }
      if (p.axes) { stroke(g, soft, 4); g.beginPath(); g.moveTo(ox, oy - PH); g.lineTo(ox, oy); g.lineTo(ox + PW, oy); g.stroke(); }
      p.series.forEach((s, si) => { s._pts = s._pts || genSeries(s, PW, PH); const pts = s._pts, u = ease.inOut(lin(t, s.at ?? 0, (s.at ?? 0) + (s.dur ?? 3))); if (u <= 0) return; const col = tone(s.tone || 'good', !dark);
        const n = pts.length - 1, f = u * n, i0 = Math.floor(f), fr = f - i0, P = q => [ox + pts[q][0] * PW, oy - pts[q][1] * PH]; g.save(); g.beginPath(); g.rect(-w / 2, -h / 2, w, h); g.clip();
        const path = () => { g.beginPath(); for (let i = 0; i <= Math.min(i0, n); i++) { const [x, y] = P(i); i ? g.lineTo(x, y) : g.moveTo(x, y); } if (i0 < n) { const [a, b] = [P(i0), P(i0 + 1)]; g.lineTo(lerp(a[0], b[0], fr), lerp(a[1], b[1], fr)); } };
        g.strokeStyle = 'rgba(0,0,0,.35)'; g.lineWidth = (s.w || 8) + 6; g.lineJoin = 'round'; g.lineCap = 'round'; g.save(); g.translate(3, 7); path(); g.stroke(); g.restore(); stroke(g, col, s.w || 8); if (s.dash) g.setLineDash([22, 14]); path(); g.stroke(); g.setLineDash([]);
        const hd = i0 < n ? [lerp(P(i0)[0], P(i0 + 1)[0], fr), lerp(P(i0)[1], P(i0 + 1)[1], fr)] : P(n); if (u < 1 || s.dot) { g.fillStyle = col; g.beginPath(); g.arc(hd[0], hd[1], 13, 0, 7); g.fill(); g.fillStyle = dark ? theme.paper : theme.ink; g.beginPath(); g.arc(hd[0], hd[1], 5, 0, 7); g.fill(); }
        g.restore(); const lk = t - (s.labelAt ?? 1e9); if (s.label && lk > 0) { g.save(); const e = P(n), fw = mw(s.label, F.cap(30)) + 40, lx = clamp(e[0] - fw / 2 - 20, -w / 2 + fw / 2 + 20, w / 2 - fw / 2 - 20), ly = (s.labelDy ?? -50) + e[1]; g.translate(lx, ly); g.globalAlpha = clamp(lk / 0.1); g.scale(0.7 + 0.3 * pop(lk), 0.7 + 0.3 * pop(lk)); clay(g, -fw / 2, -26, fw, 52, 26, tone(s.tone || 'good', false), { shadowK: 0.6 }); txt(g, s.label, 0, 2, F.cap(30), theme.paper); g.restore(); } });
      if (p.angle) { const ak = t - p.angle.at; if (ak > 0) { const k = ease.out(lin(ak, 0, 0.5)), R = 230; g.save(); stroke(g, theme.accent, 5); g.setLineDash([14, 10]); g.beginPath(); g.moveTo(ox, oy); g.lineTo(ox + 420, oy); g.stroke(); g.setLineDash([]); g.beginPath(); g.arc(ox, oy, R, -Math.PI / 4 * k, 0); g.stroke(); g.globalAlpha = clamp((ak - 0.25) / 0.2); g.translate(ox + 290, oy - 56); g.scale(0.8 + 0.2 * pop(ak - 0.25), 0.8 + 0.2 * pop(ak - 0.25)); txt(g, '45°', 0, 0, F.hero(84), theme.accent); g.restore(); } }
      if (p.markX) { const xk = t - p.markX.at; if (xk > 0) { const px = ox + PW * (p.markX.x ?? 0.7), py = oy - PH * (p.markX.y ?? 0.6), s = 1 + 0.5 * hit(xk, 9); g.save(); g.translate(px, py); g.scale(s, s); g.fillStyle = theme.paper; g.beginPath(); g.arc(0, 0, 70, 0, 7); g.fill(); g.fillStyle = theme.badInk; g.beginPath(); g.arc(0, 0, 62, 0, 7); g.fill(); xmark(g, 0, 0, 27, theme.paper, ease.out(lin(xk, 0, 0.25)), 12); g.restore(); burst(g, px, py, 90, theme.bad, xk - 0.1, 14, 0.45); } }
      if (p.crack) { const ck = t - p.crack.at; if (ck > 0) { const k = lin(ck, 0, 0.35); g.save(); g.beginPath(); rr(g, -w / 2, -h / 2, w, h, 26); g.clip(); const cx = p.crack.x ?? 0.62, cy = p.crack.y ?? 0.3, c0 = [ox + PW * cx, oy - PH * (1 - cy)]; const rays = 9; for (let r = 0; r < rays; r++) { const a = (r / rays) * Math.PI * 2 + 0.3 + hash(r) * 0.4, len = (260 + 520 * hash(r * 3.3)) * k; let x = c0[0], y = c0[1]; g.beginPath(); g.moveTo(x, y); for (let sgm = 1; sgm <= 5; sgm++) { x += Math.cos(a + (hash(r * 9 + sgm) - 0.5) * 0.7) * len / 5; y += Math.sin(a + (hash(r * 5 + sgm) - 0.5) * 0.7) * len / 5; g.lineTo(x, y); } stroke(g, 'rgba(8,10,14,.85)', 7); g.stroke(); stroke(g, 'rgba(245,243,238,.9)', 3); g.stroke(); } g.restore(); } }
      if (p.tag) txt(g, p.tag, w / 2 - 40, -h / 2 + 52, F.mono(24), dark ? rgba(theme.paper, 0.6) : theme.inkSoft, 'right'); },
  });

  // ---------- stopwatch: dial + two readouts (5 MIN doubt -> 4 HOURS proof) ----------
  B.register('stopwatch', {
    defaults: { w: 1000, h: 520, aAt: 0, bAt: 99999, a: ['KNEW', '5 MIN'], b: ['PROVED', '4 HOURS'] }, size: p => [p.w, p.h], anchors: p => ({ a: [200, -90, 560, 170], b: [200, 100, 560, 170], dial: [-300, 0, 400, 400] }),
    draw(g, p, env) { const { t, theme, lift } = env, w = p.w, h = p.h; paper(g, -w / 2, -h / 2, w, h, 26, { lift, fill: '#18212D', grain: false }); const dx = -w / 2 + 250, R = 170;
      g.save(); g.translate(dx, 0); clay(g, -R - 16, -R - 16, 2 * R + 32, 2 * R + 32, R + 16, '#2A3647', { shadowK: 0.6 }); g.fillStyle = theme.paper; g.beginPath(); g.arc(0, 0, R, 0, 7); g.fill(); stroke(g, theme.ink, 4); for (let i = 0; i < 60; i++) { const a = i / 60 * Math.PI * 2, r1 = R - (i % 5 ? 12 : 26); g.beginPath(); g.moveTo(Math.sin(a) * r1, -Math.cos(a) * r1); g.lineTo(Math.sin(a) * (R - 4), -Math.cos(a) * (R - 4)); g.stroke(); }
      const a1 = ease.inOut(lin(t, p.aAt, p.aAt + 0.8)), a2 = ease.inOut(lin(t, p.bAt, p.bAt + 1.6)), ang = a1 * 0.5 + a2 * (Math.PI * 2 * 2 - 0.5) + (a2 > 0 && a2 < 1 ? 0 : 0); stroke(g, theme.badInk, 8); g.beginPath(); g.moveTo(-Math.sin(ang) * 20, Math.cos(ang) * 20); g.lineTo(Math.sin(ang) * (R - 34), -Math.cos(ang) * (R - 34)); g.stroke(); g.fillStyle = theme.ink; g.beginPath(); g.arc(0, 0, 13, 0, 7); g.fill(); g.restore();
      [[p.a, p.aAt, -90, 'accent'], [p.b, p.bAt, 100, 'bad']].forEach(([r, at, y, tn]) => { const on = t - at; if (on < 0) return; g.save(); g.translate(150, y); g.globalAlpha = clamp(on / 0.1); const s = 0.8 + 0.2 * pop(on); g.scale(s, s); txt(g, r[0], -250, -50, F.mono(30), rgba(theme.paper, 0.7), 'left'); txt(g, r[1], -250, 14, F.hero(110), tone(tn, false), 'left'); g.restore(); }); },
  });

  // ---------- cells: 100 month-cells; 4 turn red ----------
  B.register('cells', {
    defaults: { w: 1000, h: 800, at: 0, redAt: 99999, reds: [13, 38, 59, 82], label: '' }, size: p => [p.w, p.h], anchors: p => ({ grid: [0, -40, p.w * 0.92, p.h * 0.76], label: [0, p.h / 2 - 70, p.w, 120] }),
    draw(g, p, env) { const { t, theme, lift } = env, w = p.w, h = p.h, cs = 66, gap = 14, gw = 10 * cs + 9 * gap, x0 = -gw / 2, y0 = -h / 2 + 70; paper(g, -w / 2, -h / 2, w, h, 26, { lift, fill: '#18212D', grain: false });
      for (let i = 0; i < 100; i++) { const c = i % 10, r = Math.floor(i / 10), on = t - p.at - i * 0.012; if (on < 0) continue; const isRed = p.reds.includes(i), rk = isRed ? t - p.redAt - p.reds.indexOf(i) * 0.25 : -1, red = rk > 0, k = pop(on, 'bouncy'), s = (red ? 1 + 0.3 * hit(rk, 7) : 1) * k; g.save(); g.translate(x0 + c * (cs + gap) + cs / 2, y0 + r * (cs + gap) + cs / 2); g.scale(s, s); clay(g, -cs / 2, -cs / 2, cs, cs, 12, red ? theme.bad : theme.good, { shadowK: 0.4 }); g.restore(); }
      const lk = t - p.labelAt; if (p.label && t > (p.labelAt || 0)) { g.save(); g.globalAlpha = clamp(lk / 0.12); g.translate(0, h / 2 - 56 + (1 - pop(lk)) * 20); txt(g, p.label, 0, 0, F.hero(60), theme.paper); g.restore(); } },
  });

  // ---------- needed: options that existed (fills to the ceiling) vs options Madoff needed (punches through it). No numbers. ----------
  B.register('needed', {
    defaults: { w: 1300, h: 800, at: 0, a: 'OPTIONS THAT EXISTED', b: 'OPTIONS MADOFF NEEDED', aAt: 0, bAt: 99999, head: 'CHICAGO BOARD OPTIONS EXCHANGE' }, size: p => [p.w, p.h], anchors: p => ({ a: [-250, 60, 420, 600], b: [250, -20, 420, 760], ceil: [0, -160, p.w * 0.8, 120] }),
    draw(g, p, env) { const { t, theme, lift } = env, w = p.w, h = p.h, gy = h / 2 - 120, ceil = gy - 430, bw = 260; paper(g, -w / 2, -h / 2, w, h, 26, { lift, fill: '#18212D', grain: false }); txt(g, p.head, 0, -h / 2 + 50, F.mono(26), rgba(theme.paper, 0.6));
      const k1 = clamp(spring(t - p.aAt, { f: 1.7, z: 0.55 }), 0, 1.02), k2 = clamp(spring(t - p.bAt, { f: 1.5, z: 0.5 }), 0, 1.08), ax = -250, bx = 250, bh2 = 430 + 250; g.fillStyle = rgba(theme.paper, 0.28); rr(g, -w / 2 + 40, gy, w - 80, 6, 3); g.fill();
      clay(g, ax - bw / 2, gy - 430 * k1, bw, 430 * k1, 16, theme.good, { shadowK: 0.5 });
      const hit2 = k2 * 430 > 430 - 4 ? 1 : 0, bt = gy - bh2 * k2; // ceiling beam (two halves, gap around bar B once it breaks through)
      const gap = hit2 ? 60 : 0; g.fillStyle = '#566377'; g.fillRect(-w / 2 + 40, ceil - 14, (bx - bw / 2 - gap) + w / 2 - 40, 28); g.fillRect(bx + bw / 2 + gap, ceil - 14, w / 2 - 40 - (bx + bw / 2 + gap), 28); if (!hit2) g.fillRect(bx - bw / 2 - gap, ceil - 14, bw + 2 * gap, 28);
      clay(g, bx - bw / 2, bt, bw, gy - bt, 16, theme.bad, { shadowK: 0.5 }); if (hit2) { const bk = t - p.bAt - 0.5; for (let q = 0; q < 8; q++) { const u = clamp(bk / 0.9); if (u <= 0 || u >= 1) break; g.save(); g.globalAlpha = 1 - u; g.translate(bx + (hash(q) - 0.5) * 340 * u, ceil - 80 * Math.sin(Math.PI * u) * (0.5 + hash(q * 2)) + 300 * u * u); g.rotate(u * 6 * (hash(q + 4) - 0.5)); g.fillStyle = '#566377'; g.fillRect(-14, -9, 28, 18); g.restore(); } }
      txt(g, 'CEILING: WHAT EXISTS', -w / 2 + 70, ceil - 40, F.mono(22), rgba(theme.paper, 0.6), 'left'); txt(g, p.a, ax, gy + 44, F.cap(28), rgba(theme.paper, 0.92)); txt(g, p.b, bx, gy + 44, F.cap(28), rgba(theme.paper, 0.92)); },
  });

  // ---------- memo: the 2005 SEC memo ----------
  B.register('memo', {
    defaults: { w: 760, h: 860, to: 'U.S. SEC', date: '2005', title: ["THE WORLD'S", 'LARGEST HEDGE FUND', 'IS A FRAUD'], at: 0, titleAt: 0 }, ownEnter: true, size: p => [p.w, p.h], anchors: p => ({ title: [0, 40, p.w * 0.9, 330], head: [0, -p.h / 2 + 80, p.w, 160] }),
    draw(g, p, env) { const { t, lt, theme, lift } = env, w = p.w, h = p.h, k = spring(lt, 'heavy'), x0 = -w / 2, y0 = -h / 2; g.save(); g.translate(0, (1 - k) * 320); g.rotate((1 - k) * -0.08 + 0.015); g.globalAlpha *= clamp(lt / 0.1);
      paper(g, x0, y0, w, h, 14, { lift }); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 140); g.save(); rr(g, x0, y0, w, h, 14); g.clip(); g.fillRect(x0, y0, w, 140); g.restore(); txt(g, 'MEMORANDUM', x0 + 44, y0 + 70, F.hero(60), theme.paper, 'left');
      txt(g, 'TO:', x0 + 44, y0 + 196, F.monoX(28), theme.inkSoft, 'left'); txt(g, p.to, x0 + 130, y0 + 196, F.monoX(30), theme.ink, 'left'); txt(g, 'DATE:', x0 + 44, y0 + 246, F.monoX(28), theme.inkSoft, 'left'); txt(g, p.date, x0 + 160, y0 + 246, F.monoX(30), theme.ink, 'left'); txt(g, 'RE:', x0 + 44, y0 + 296, F.monoX(28), theme.inkSoft, 'left');
      g.strokeStyle = theme.rule; g.lineWidth = 3; g.setLineDash([10, 9]); g.beginPath(); g.moveTo(x0 + 40, y0 + 330); g.lineTo(x0 + w - 40, y0 + 330); g.stroke(); g.setLineDash([]);
      p.title.forEach((l, i) => { const on = t - p.titleAt - i * 0.25, n = Math.ceil(l.length * ease.out(lin(on, 0, 0.5))); if (on > 0) { const tw = mw(l, F.hero(64)); marker(g, x0 + 44 - 8, y0 + 392 + i * 92 - 40, tw + 16, 80, theme.bad, clamp((on - 0.3) / 0.3), 0.2); txt(g, l.slice(0, n), x0 + 44, y0 + 392 + i * 92, F.hero(64), theme.badInk, 'left'); } });
      for (let i = 0; i < 6; i++) { const s = ease.out(lin(lt - 0.4 - i * 0.07, 0, 0.4)); g.fillStyle = theme.rule; g.beginPath(); g.roundRect(x0 + 44, y0 + 690 + i * 28, (w - 88) * (i === 5 ? 0.45 : 0.95) * s, 12, 6); if (s > 0) g.fill(); } g.restore(); },
  });

  // ---------- lenses: 8 magnifying glasses along 1992-2008, each finds nothing ----------
  B.register('lenses', {
    defaults: { w: 1700, h: 480, n: 8, at: 0, per: 0.45, from: '1992', to: '2008' }, size: p => [p.w, p.h], anchors: p => ({ row: [0, 0, p.w, p.h] }),
    draw(g, p, env) { const { t, theme, lift } = env, w = p.w, h = p.h, ay = h / 2 - 90, L = w - 200; stroke(g, rgba(theme.paper, 0.3), 8); g.beginPath(); g.moveTo(-L / 2, ay); g.lineTo(L / 2, ay); g.stroke(); const dk = ease.out(lin(t - p.at, 0, 0.6)); stroke(g, theme.paper, 8); g.beginPath(); g.moveTo(-L / 2, ay); g.lineTo(-L / 2 + L * dk, ay); g.stroke(); txt(g, p.from, -L / 2, ay + 52, F.monoX(34), theme.paper); txt(g, p.to, L / 2, ay + 52, F.monoX(34), theme.paper);
      for (let i = 0; i < p.n; i++) { const on = t - p.at - 0.3 - i * p.per; if (on < 0) continue; const x = -L / 2 + 70 + (L - 140) * i / (p.n - 1), k = pop(on, 'bouncy'); g.save(); g.translate(x, ay - 190); g.scale(k, k); g.fillStyle = rgba(theme.paper, 0.1); g.beginPath(); g.arc(0, 0, 80, 0, 7); g.fill(); clay(g, -62, -62, 124, 124, 62, '#2A3647', { shadowK: 0.5 }); icon(g, 'magnifier', 100, theme.paper, theme.ink); g.restore(); g.save(); g.globalAlpha = clamp((on - 0.15) / 0.15); g.translate(0, (1 - pop(on - 0.1)) * 14); txt(g, 'NO FRAUD', x, ay - 70, F.cap(24), rgba(theme.paper, 0.75)); txt(g, 'FOUND', x, ay - 44, F.cap(24), rgba(theme.paper, 0.75)); g.restore(); stroke(g, theme.paper, 5); g.beginPath(); g.moveTo(x, ay - 24); g.lineTo(x, ay); g.stroke(); } },
  });

  // ---------- jail: bars slam down over a paper plaque with lines (strike-through supported) ----------
  B.register('jail', {
    defaults: { w: 1000, h: 800, dropAt: 0, lines: [], head: '' }, size: p => [p.w, p.h], anchors: p => ({ plaque: [0, 120, p.w * 0.86, 360], head: [0, -p.h / 2 + 90, 700, 140] }),
    draw(g, p, env) { const { t, theme, lift } = env, w = p.w, h = p.h; paper(g, -w / 2, -h / 2, w, h, 26, { lift, fill: '#18212D', grain: false }); g.save(); g.beginPath(); g.rect(-w / 2, -h / 2, w, h); g.clip();
      const bars = 9; for (let i = 0; i < bars; i++) { const on = t - p.dropAt - i * 0.045, k = on > 0 ? clamp(spring(on, { f: 2.0, z: 0.45 }), 0, 1.1) : 0, x = -w / 2 + 70 + i * ((w - 140) / (bars - 1)), top = -h / 2 - 20, bh = (h + 40) * k; if (bh > 0) clay(g, x - 14, top, 28, bh, 10, '#6C7889', { shadowK: 0.6 }); }
      g.fillStyle = '#6C7889'; const rk = clamp(spring(t - p.dropAt - 0.3, 'soft'), 0, 1); g.fillRect(-w / 2, -h / 2 + 150 - (1 - rk) * 200, w, 22); g.fillRect(-w / 2, h / 2 - 120 + (1 - rk) * 200, w, 22); g.restore();
      const pk = t - (p.plaqueAt ?? p.dropAt + 0.5); if (pk > 0) { g.save(); g.translate(0, 80 + (1 - pop(pk)) * 60); g.globalAlpha = clamp(pk / 0.1); paper(g, -w * 0.4, -170, w * 0.8, 340, 16, { lift: 0.4 }); p.lines.forEach((l, i) => { const on = t - l.at; if (on < 0) return; const y = (i - (p.lines.length - 1) / 2) * 120, f = F.hero(l.size || 96), tw = mw(l.t, f); g.save(); g.globalAlpha *= clamp(on / 0.1); g.translate(0, y + (1 - pop(on)) * 24); txt(g, l.t, 0, 0, f, tone(l.tone || 'ink', true)); if (l.strike != null && t > l.strike) { const sk = ease.out(lin(t - l.strike, 0, 0.25)); g.strokeStyle = theme.badInk; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); g.moveTo(-tw / 2 - 20, 4); g.lineTo(-tw / 2 - 20 + (tw + 40) * sk, 4); g.stroke(); } g.restore(); }); g.restore(); }
      if (p.head) txt(g, p.head, 0, -h / 2 + 60, F.mono(26), rgba(theme.paper, 0.6)); },
  });

  // ---------- yearbars: 17 years of ~10% (suspiciously uniform) ----------
  B.register('yearbars', {
    defaults: { w: 1500, h: 600, n: 17, at: 0, per: 0.32, from: '1992', to: '2008' }, size: p => [p.w, p.h], anchors: p => ({ row: [0, 0, p.w, p.h] }),
    draw(g, p, env) { const { t, theme, lift } = env, w = p.w, h = p.h, gy = h / 2 - 90, bw = 56, gap = (w - 160 - p.n * bw) / (p.n - 1), top = 360; paper(g, -w / 2, -h / 2, w, h, 26, { lift, fill: '#18212D', grain: false }); g.fillStyle = rgba(theme.paper, 0.28); rr(g, -w / 2 + 50, gy, w - 100, 6, 3); g.fill();
      stroke(g, rgba(theme.paper, 0.4), 3); g.setLineDash([14, 10]); const ly = gy - top * 0.1 * 7.2; g.beginPath(); g.moveTo(-w / 2 + 60, ly); g.lineTo(w / 2 - 60, ly); g.stroke(); g.setLineDash([]); txt(g, '10%', w / 2 - 60, ly - 26, F.monoX(26), rgba(theme.paper, 0.7), 'right');
      for (let i = 0; i < p.n; i++) { const on = t - p.at - i * p.per; if (on < 0) continue; const hh = top * 0.1 * 7.2 * (1 + (hash(i * 3.7) - 0.5) * 0.06), k = clamp(spring(on, { f: 2.2, z: 0.5 }), 0, 1.15), x = -w / 2 + 80 + i * (bw + gap); clay(g, x, gy - hh * k, bw, hh * k, 10, theme.good, { shadowK: 0.4 }); g.save(); g.globalAlpha = clamp(on / 0.15); txt(g, i == 0 ? p.from : i == p.n - 1 ? p.to : '', x + bw / 2, gy + 38, F.mono(22), rgba(theme.paper, 0.7)); g.restore(); } },
  });

  // ---------- bracket: curly bracket spanning a width with label lines under it ----------
  B.register('bracket', {
    defaults: { w: 1000, h: 240, at: 0, lines: [] }, size: p => [p.w, p.h], anchors: p => ({ label: [0, 60, p.w, 160] }),
    draw(g, p, env) { const { t, theme } = env, on = t - p.at, k = ease.out(lin(on, 0, 0.5)), w = p.w * k, y = -p.h / 2 + 30; if (on < 0) return; stroke(g, theme.bad, 10); g.beginPath(); g.moveTo(-w / 2, y + 30); g.quadraticCurveTo(-w / 2, y + 90, -w / 2 + 70, y + 90); g.lineTo(-30, y + 90); g.quadraticCurveTo(0, y + 90, 0, y + 120); g.quadraticCurveTo(0, y + 90, 30, y + 90); g.lineTo(w / 2 - 70, y + 90); g.quadraticCurveTo(w / 2, y + 90, w / 2, y + 30); g.stroke();
      p.lines.forEach((l, i) => { const lo = t - p.at - 0.3 - i * 0.2; if (lo < 0) return; g.save(); g.globalAlpha = clamp(lo / 0.12); g.translate(0, (1 - pop(lo)) * 16); txt(g, l.t, 0, y + 170 + i * 56, l.hero ? F.hero(l.size || 64) : F.cap(l.size || 30), tone(l.tone || 'paper', false)); g.restore(); }); },
  });

  // ---------- endslots: YouTube end-screen placeholders (screen layer, drawn in screen px). 800x450 rect at (120,310), r=170 circle at (1400,535). ----------
  B.register('endslots', {
    defaults: { at: 0, rect: [120, 310, 800, 450], circle: [1400, 535, 170], rl: 'WATCH NEXT', cl: 'SUBSCRIBE' }, ownEnter: true, size: () => [1, 1],
    draw(g, p, env) { const { lt, theme } = env, k = pop(lt, 'soft'), [rx, ry, rw, rh] = p.rect, [cx, cy, cr] = p.circle; g.save(); g.globalAlpha = clamp(lt / 0.3);
      for (const shape of ['r', 'c']) { g.save(); const sc = 0.92 + 0.08 * k; if (shape === 'r') { g.translate(rx + rw / 2, ry + rh / 2); g.scale(sc, sc); g.fillStyle = 'rgba(245,243,238,.06)'; rr(g, -rw / 2, -rh / 2, rw, rh, 22); g.fill(); g.strokeStyle = 'rgba(245,243,238,.45)'; g.lineWidth = 4; g.setLineDash([18, 12]); g.lineDashOffset = -lt * 14; rr(g, -rw / 2, -rh / 2, rw, rh, 22); g.stroke(); g.setLineDash([]); } else { g.translate(cx, cy); g.scale(sc, sc); g.fillStyle = 'rgba(245,243,238,.06)'; g.beginPath(); g.arc(0, 0, cr, 0, 7); g.fill(); g.strokeStyle = 'rgba(245,243,238,.45)'; g.lineWidth = 4; g.setLineDash([18, 12]); g.lineDashOffset = -lt * 14; g.beginPath(); g.arc(0, 0, cr, 0, 7); g.stroke(); g.setLineDash([]); } g.restore(); }
      txt(g, p.rl, rx + rw / 2, ry - 34, F.cap(30), rgba(theme.paper, 0.8)); txt(g, p.cl, cx, cy + cr + 40, F.cap(30), rgba(theme.paper, 0.8)); g.restore(); },
  });
})();
const mk = (id, type, x, y, props, extra) => ({ id, type, at: [x, y], in: -1, props, ...extra });
const els = [
 mk('coupon','coupon',0,0,{}), mk('queue','queue',2600,0,{capsAt:2,caps:6}), mk('dots','dotgrid',5200,0,{hiAt:1.5}), mk('pyr','pyramid',7800,0,{flowAt:1}),
 mk('news','news',0,1400,{}), mk('banks','banks',2600,1400,{n:6,label:'x',labelAt:0}), mk('banks2','banks',5200,1400,{n:51,cols:11,s:80,gap:22,mode:'red',per:0.04}), mk('dict','dict',7800,1400,{}),
 mk('tanks','tanks',0,2800,{}), mk('tc','tankcut',2600,2800,{waterAt:1,tubeAt:2,stickAt:2.5,stick2At:3.5,oilAt:0}), mk('flow','flow',5600,2800,{items:[{label:'TANK',icon:'tank',at:0.2},{label:'INSPECTOR',icon:'magnifier',at:0.6},{label:'RECEIPT',icon:'doc',at:1},{label:'BANK',icon:'building',at:1.4},{label:'$',icon:'dollar',at:1.8,tone:'good'}]}),
 mk('rs','receiptstack',0,4200,{labelAt:2}), mk('pipes','pipes',3200,4200,{times:[0.5,1.5,2.5,3.5]}), mk('tp','tankpair',6200,4200,{fillAt:0.5,overAt:1.5}),
 mk('chart','chart',0,5600,{series:[{kind:'noise',seed:3,tone:'bad',at:0.2,dur:2,label:'REAL MARKET',labelAt:2.2},{kind:'straight',tone:'good',at:2.4,dur:1.5,label:'MADOFF',labelAt:4,w:12}],angle:{at:4},markX:{at:4.5}}),
 mk('sw','stopwatch',2600,5600,{aAt:0.3,bAt:1.5}), mk('cells','cells',5000,5600,{redAt:2,label:'LOSING MONTHS ≈ 4%',labelAt:2.5}), mk('need','needed',7500,5600,{bAt:1}),
 mk('memo','memo',0,7000,{}), mk('len','lenses',2600,7000,{}), mk('jail','jail',5600,7000,{lines:[{t:'20 YEARS',at:0.8,strike:1.8,tone:'bad'},{t:'OUT IN 7',at:2.2,tone:'good'}]}), mk('yb','yearbars',8000,7000,{}), mk('br','bracket',10000,7000,{lines:[{t:'$35–55B',hero:true,tone:'bad'},{t:'NEVER EXISTED'}]}),
];
BM2.scene({ series: 'decoded', title: 'GALLERY B', duration: 90, float: 0, captions: false, storyteller: true, elements: els,
 beats: els.map((e, i) => ({ at: i * 4, beat: 'graphic-hero', focus: e.id, fill: 0.55, dur: 0.3, lead: 0 })) });
