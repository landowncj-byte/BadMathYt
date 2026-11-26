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
      case 'pair': person(g, -26, 56, 1.05, col, {}); person(g, 26, 56, 1.05, B.shade(col, -0.28), {}); stroke(g, col2, 4); g.beginPath(); g.moveTo(-8, -6); g.lineTo(10, -6); g.stroke(); break;
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
    defaults: { w: 820, h: 560, to: 123, at: 0, dur: 1.2, size: 230, tag: 'TRADE CONFIRMATION', rows: [['DATE', 'APRIL 16, 1991'], ['STOCK', 'PROCTER & GAMBLE']], rowsAt: 0, label: 'CALL OPTIONS BOUGHT', tone: 'good', pulse: 1e9 }, ownEnter: true,
    size: p => [p.w, p.h], anchors: p => ({ qty: [0, 70, p.w * 0.9, 300], head: [0, -p.h / 2 + 130, p.w, 260] }),
    draw(g, p, env) { const { t, lt, theme, lift } = env, w = p.w, h = p.h, k = spring(lt, 'heavy'), x0 = -w / 2, y0 = -h / 2;
      g.save(); g.translate(0, (1 - k) * 220); g.rotate((1 - k) * 0.12 + (env.lt > 0.5 ? 0 : 0)); g.globalAlpha *= clamp(lt / 0.1);
      paper(g, x0, y0, w, h, 18, { lift }); g.save(); rr(g, x0, y0, w, h, 18); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 96); g.restore();
      txt(g, p.tag, x0 + 34, y0 + 50, F.monoX(32), theme.paper, 'left');
      p.rows.forEach((r, i) => { const on = clamp((t - p.rowsAt - i * 0.12) / 0.2); g.save(); g.globalAlpha *= on; txt(g, r[0], x0 + 40, y0 + 140 + i * 50, F.mono(26), theme.inkSoft, 'left'); txt(g, r[1], x0 + w - 40, y0 + 140 + i * 50, F.monoX(30), theme.ink, 'right'); g.restore(); });
      g.strokeStyle = theme.rule; g.lineWidth = 3; g.setLineDash([10, 9]); g.beginPath(); g.moveTo(x0 + 34, y0 + 128 + p.rows.length * 50 + 8); g.lineTo(x0 + w - 34, y0 + 128 + p.rows.length * 50 + 8); g.stroke(); g.setLineDash([]);
      const lt2 = t - p.at, v = lt2 < 0 ? 0 : countAt(lt2, p.dur, 0, p.to), land = lt2 - p.dur, pu = t - p.pulse, s = 1 + (land > 0 ? 0.13 * (1 - spring(land, { f: 2.4, z: 0.42 })) : 0) + (pu > 0 ? 0.14 * hit(pu, 6) : 0) + (env.hot === 'qty' ? 0.03 * env.hotK : 0), by = y0 + h - 170;
      g.save(); g.translate(0, by); g.scale(s, s); roll(g, v, 0, 0, { font: F.hero(p.size), size: p.size, color: tone(p.tone, true), speed: lt2 > 0 && lt2 < p.dur ? p.to / p.dur : 0 }); g.restore(); burst(g, 0, by, w * 0.4, tone(p.tone, false), land > 0 && p.at > -1 ? land : pu, 18, 0.55);
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
    defaults: { w: 520, h: 640, tab: '1920', title: 'THE COUPON', sub: '', icon: 'coupon', stamp: '', stampAt: 99999, tone: 'bad', iconAt: -1e9 }, size: p => [p.w, p.h], anchors: p => ({ head: [0, -p.h / 2 + 90, p.w, 180], icon: [0, -40, p.w * 0.7, 280] }),
    draw(g, p, env) { const { t, lt, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, M = theme.manila || MANILA;
      const body = () => { g.beginPath(); g.moveTo(x0, y0 + 64); g.lineTo(x0 + 190, y0 + 64); g.lineTo(x0 + 220, y0 + 22); g.lineTo(x0 + 380, y0 + 22); g.lineTo(x0 + 400, y0 + 64); g.lineTo(x0 + w, y0 + 64); g.lineTo(x0 + w, y0 + h); g.lineTo(x0, y0 + h); g.closePath(); };
      B.shadowed(g, body, M, lift); g.save(); body(); g.clip(); const lg = g.createLinearGradient(x0, y0, x0 + w * 0.7, y0 + h); lg.addColorStop(0, 'rgba(255,255,255,.28)'); lg.addColorStop(0.5, 'rgba(255,255,255,0)'); lg.addColorStop(1, 'rgba(80,50,10,.18)'); g.fillStyle = lg; g.fillRect(x0, y0, w, h); g.globalAlpha = 0.5; g.globalCompositeOperation = 'multiply'; g.fillStyle = B.grainPattern; g.fillRect(x0, y0, w, h); g.restore();
      txt(g, p.tab, x0 + 300, y0 + 44, F.monoX(30), '#5a4010'); g.fillStyle = theme.paper; g.beginPath(); g.roundRect(x0 + 38, y0 + 104, w - 76, h - 150, 12); g.fill();
      const ik = pop(t - Math.max(p.iconAt, env.t - lt + 0.1)); g.save(); g.translate(0, -50); g.scale(0.7 + 0.3 * ik, 0.7 + 0.3 * ik); g.globalAlpha *= clamp(ik * 2); icon(g, p.icon, 230, tone(p.tone, true), theme.paper); g.restore();
      g.save(); g.globalAlpha *= clamp(ik * 2); txt(g, p.title, 0, h / 2 - 150, F.hero(62), theme.ink); if (p.sub) txt(g, p.sub, 0, h / 2 - 92, F.mono(24), theme.inkSoft); g.restore();
      const on = t - p.stampAt; if (on > 0 && p.stamp) { g.save(); g.translate(0, 30); g.rotate(-0.12); const sc = 1 + 1.6 * (1 - ease.expo(on / 0.22)) - 0.06 * wobble(on - 0.2, 5, 9); g.scale(sc, sc); g.globalAlpha = clamp(on / 0.06); const sw = mw(p.stamp, F.hero(54)) + 50;
        g.fillStyle = rgba(theme.paper, 0.92); rr(g, -sw / 2, -44, sw, 88, 10); g.fill(); g.strokeStyle = theme.badInk; g.lineWidth = 6; rr(g, -sw / 2 + 6, -38, sw - 12, 76, 7); g.stroke(); txt(g, p.stamp, 0, 4, F.hero(54), theme.badInk); g.restore(); burst(g, 0, 30, sw * 0.55, theme.bad, on - 0.16, 14, 0.45); } },
  });

  // ---------- checklist: THE IMPOSSIBLE NUMBER TEST card with a padlock ----------
  B.register('checklist', {
    defaults: { w: 1000, h: 650, title: 'THE IMPOSSIBLE NUMBER TEST', rows: [], lockOpen: 99999, tickTone: 'bad' }, size: p => [p.w, p.h], anchors: p => ({ head: [0, -p.h / 2 + 80, p.w, 150], ...Object.fromEntries(p.rows.map((r, i) => ['r' + i, [0, -p.h / 2 + 235 + i * 125, p.w * 0.92, 110]])) }),
    draw(g, p, env) { const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift });
      g.save(); rr(g, x0, y0, w, h, 26); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 150); g.restore(); txt(g, p.title, x0 + 50, y0 + 76, F.hero(58), theme.paper, 'left');
      const lk = clamp((t - p.lockOpen) / 0.35); g.save(); g.translate(x0 + w - 90, y0 + 75); g.rotate(lk > 0 ? -0.2 * Math.sin(Math.PI * lk) : 0); icon(g, 'lock', 80, '#F2B705', '#0B0F14', lk); g.restore();
      p.rows.forEach((r, i) => { const y = y0 + 235 + i * 125, sh = r.show == null ? 1 : pop(t - r.show), tk = r.tick == null ? 0 : t - r.tick; g.save(); g.translate(0, y);
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
      const lines = p.title.split('\n'); lines.forEach((l, i) => txt(g, l, 0, h * 0.27 + (i - (lines.length - 1) / 2) * p.titleSize * 1.05, F.hero(p.titleSize), fg)); if (p.sub) txt(g, p.sub, 0, h / 2 - 50, F.mono(24), dark ? rgba(theme.paper, 0.75) : theme.inkSoft);
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
    defaults: { w: 1200, h: 420, word: 'Pon·zi scheme', pos: 'noun', def: "pays old investors with new investors' money", at: 0 }, size: p => [p.w, p.h],
    draw(g, p, env) { const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2; paper(g, x0, -h / 2, w, h, 20, { lift, fill: '#EFE6CF' }); const n = Math.ceil(p.word.length * lin(t - p.at, 0, 0.9)), f = F.hero(110);
      txt(g, p.word.slice(0, n), x0 + 56, -h / 2 + 120, f, theme.ink, 'left'); if (t - p.at > 0.95) { const cx = x0 + 56 + mw(p.word, f) + 24; if (Math.floor(t * 3) % 2 == 0 && t - p.at < 1.6) { g.fillStyle = theme.badInk; g.fillRect(cx - 24, -h / 2 + 70, 8, 100); } txt(g, '(' + p.pos + ')', cx, -h / 2 + 140, F.mono(34), theme.inkSoft, 'left'); }
      g.fillStyle = theme.rule; g.fillRect(x0 + 56, -30, w - 112, 4); const on = t - p.at - 1.1; if (on > 0) { g.save(); g.globalAlpha = clamp(on / 0.2); g.translate(0, (1 - pop(on)) * 20); txt(g, '1.', x0 + 56, 50, F.monoX(40), theme.badInk, 'left'); txt(g, p.def, x0 + 120, 50, F.cap(36), theme.ink, 'left'); g.restore(); } },
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
    defaults: { n: 4, w: 1700, h: 640, at: 0, times: [0, 1, 2, 3], label: 'SAME OIL' }, size: p => [p.w, p.h], anchors: p => ({ count: [0, -p.h / 2 + 40, 900, 160], row: [0, -40, p.w, 380] }),
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
    anchors: p => ({ plot: [0, 20, p.w - 140, p.h - 170], end: [p.w * 0.2, -p.h * 0.12, 520, 360], start: [-p.w * 0.35, p.h * 0.25, 420, 300] }),
    draw(g, p, env) { const { t, theme, lift } = env, w = p.w, h = p.h, dark = p.fill === 'dark', ML = 90, MR = 60, MT = p.title ? 100 : 50, MB = 56, PW = w - ML - MR, PH = h - MT - MB, ox = -w / 2 + ML, oy = h / 2 - MB;
      paper(g, -w / 2, -h / 2, w, h, 26, { lift, fill: dark ? '#18212D' : theme.paper, grain: !dark }); const fg = dark ? theme.paper : theme.ink, soft = dark ? rgba(theme.paper, 0.35) : theme.inkSoft;
      if (p.title) txt(g, p.title, -w / 2 + 44, -h / 2 + 52, F.mono(28), dark ? rgba(theme.paper, 0.75) : theme.inkSoft, 'left');
      if (p.grid) { g.strokeStyle = dark ? rgba(theme.paper, 0.1) : theme.rule; g.lineWidth = 2; for (let i = 1; i <= 4; i++) { g.beginPath(); g.moveTo(ox, oy - PH * i / 4); g.lineTo(ox + PW, oy - PH * i / 4); g.stroke(); } }
      if (p.axes) { stroke(g, soft, 4); g.beginPath(); g.moveTo(ox, oy - PH); g.lineTo(ox, oy); g.lineTo(ox + PW, oy); g.stroke(); }
      p.series.forEach((s, si) => { s._pts = s._pts || genSeries(s, PW, PH); const pts = s._pts, u = (s.lin ? lin : (a, b, c) => ease.inOut(lin(a, b, c)))(t, s.at ?? 0, (s.at ?? 0) + (s.dur ?? 3)); if (u <= 0) return; const col = tone(s.tone || 'good', !dark);
        const n = pts.length - 1, f = u * n, i0 = Math.floor(f), fr = f - i0, P = q => [ox + pts[q][0] * PW, oy - pts[q][1] * PH]; g.save(); g.beginPath(); g.rect(-w / 2, -h / 2, w, h); g.clip();
        const path = () => { g.beginPath(); for (let i = 0; i <= Math.min(i0, n); i++) { const [x, y] = P(i); i ? g.lineTo(x, y) : g.moveTo(x, y); } if (i0 < n) { const [a, b] = [P(i0), P(i0 + 1)]; g.lineTo(lerp(a[0], b[0], fr), lerp(a[1], b[1], fr)); } };
        g.strokeStyle = 'rgba(0,0,0,.35)'; g.lineWidth = (s.w || 8) + 6; g.lineJoin = 'round'; g.lineCap = 'round'; g.save(); g.translate(3, 7); path(); g.stroke(); g.restore(); stroke(g, col, s.w || 8); if (s.dash) g.setLineDash([22, 14]); path(); g.stroke(); g.setLineDash([]);
        const hd = i0 < n ? [lerp(P(i0)[0], P(i0 + 1)[0], fr), lerp(P(i0)[1], P(i0 + 1)[1], fr)] : P(n); if (u < 1 || s.dot) { g.fillStyle = col; g.beginPath(); g.arc(hd[0], hd[1], 13, 0, 7); g.fill(); g.fillStyle = dark ? theme.paper : theme.ink; g.beginPath(); g.arc(hd[0], hd[1], 5, 0, 7); g.fill(); }
        g.restore(); const lk = t - (s.labelAt ?? 1e9); if (s.label && lk > 0) { g.save(); const e = P(n), fw = mw(s.label, F.cap(30)) + 40, lx = clamp(e[0] - fw / 2 - 20, -w / 2 + fw / 2 + 20, w / 2 - fw / 2 - 20), ly = (s.labelDy ?? -50) + e[1]; g.translate(lx, ly); g.globalAlpha = clamp(lk / 0.1); g.scale(0.7 + 0.3 * pop(lk), 0.7 + 0.3 * pop(lk)); clay(g, -fw / 2, -26, fw, 52, 26, tone(s.tone || 'good', false), { shadowK: 0.6 }); txt(g, s.label, 0, 2, F.cap(30), (s.tone === 'paper' || s.tone === 'accent' && false) ? theme.ink : theme.paper); g.restore(); } });
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
      [[p.a, p.aAt, -90, 'accent'], [p.b, p.bAt, 100, 'bad']].forEach(([r, at, y, tn]) => { const on = t - at; if (on < 0) return; g.save(); g.translate(250, y); g.globalAlpha = clamp(on / 0.1); const s = 0.8 + 0.2 * pop(on); g.scale(s, s); txt(g, r[0], -250, -86, F.mono(28), rgba(theme.paper, 0.7), 'left'); txt(g, r[1], -250, 0, F.hero(110), tone(tn, false), 'left'); g.restore(); }); },
  });

  // ---------- cells: 100 month-cells; 4 turn red ----------
  B.register('cells', {
    defaults: { w: 900, h: 860, at: 0, redAt: 99999, reds: [13, 38, 59, 82], label: '' }, size: p => [p.w, p.h], anchors: p => ({ grid: [0, -40, p.w * 0.92, p.h * 0.76], label: [0, p.h / 2 - 70, p.w, 120] }),
    draw(g, p, env) { const { t, theme, lift } = env, w = p.w, h = p.h, cs = 56, gap = 11, gw = 10 * cs + 9 * gap, x0 = -gw / 2, y0 = -h / 2 + 52; paper(g, -w / 2, -h / 2, w, h, 26, { lift, fill: '#18212D', grain: false });
      for (let i = 0; i < 100; i++) { const c = i % 10, r = Math.floor(i / 10), on = t - p.at - i * 0.012; if (on < 0) continue; const isRed = p.reds.includes(i), rk = isRed ? t - p.redAt - p.reds.indexOf(i) * 0.25 : -1, red = rk > 0, k = pop(on, 'bouncy'), s = (red ? 1 + 0.3 * hit(rk, 7) : 1) * k; g.save(); g.translate(x0 + c * (cs + gap) + cs / 2, y0 + r * (cs + gap) + cs / 2); g.scale(s, s); clay(g, -cs / 2, -cs / 2, cs, cs, 12, red ? theme.bad : theme.good, { shadowK: 0.4 }); g.restore(); }
      const lk = t - p.labelAt; if (p.label && t > (p.labelAt || 0)) { g.save(); g.globalAlpha = clamp(lk / 0.12); g.translate(0, h / 2 - 62 + (1 - pop(lk)) * 20); txt(g, p.label, 0, 0, F.hero(62), theme.paper); g.restore(); } },
  });

  // ---------- needed: options that existed (fills to the ceiling) vs options Madoff needed (punches through it). No numbers. ----------
  B.register('needed', {
    defaults: { w: 1300, h: 860, at: 0, a: 'OPTIONS THAT EXISTED', b: 'OPTIONS MADOFF NEEDED', aAt: 0, bAt: 99999, head: 'CHICAGO BOARD OPTIONS EXCHANGE' }, size: p => [p.w, p.h], anchors: p => ({ a: [-250, 60, 420, 600], b: [250, -20, 420, 760], ceil: [0, -160, p.w * 0.8, 120] }),
    draw(g, p, env) { const { t, theme, lift } = env, w = p.w, h = p.h, gy = h / 2 - 120, ceil = gy - 430, bw = 260; paper(g, -w / 2, -h / 2, w, h, 26, { lift, fill: '#18212D', grain: false }); txt(g, p.head, -w / 2 + 70, -h / 2 + 52, F.mono(24), rgba(theme.paper, 0.6), 'left');
      const k1 = clamp(spring(t - p.aAt, { f: 1.7, z: 0.55 }), 0, 1.02), k2 = clamp(spring(t - p.bAt, { f: 1.5, z: 0.5 }), 0, 1.08), ax = -250, bx = 250, bh2 = 430 + 190; g.fillStyle = rgba(theme.paper, 0.28); rr(g, -w / 2 + 40, gy, w - 80, 6, 3); g.fill();
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
// ===== part D: CTA micro-moments (screen layer): heart pulse, paper-plane flick =====
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, clay, burst, hit } = B;
  const heartPath = (g, s) => { g.beginPath(); g.moveTo(0, s * 0.35); g.bezierCurveTo(-s * 1.1, -s * 0.25, -s * 0.55, -s * 0.95, 0, -s * 0.4); g.bezierCurveTo(s * 0.55, -s * 0.95, s * 1.1, -s * 0.25, 0, s * 0.35); g.closePath(); };
  // heart: pops, pulses twice, three small hearts float up, fades. Total ~1.4 s. (v2 look: clay red, soft shadow, no glow)
  B.register('heart', { defaults: { s: 70 }, ownEnter: true, size: p => [p.s * 3, p.s * 3],
    draw(g, p, env) { const { lt } = env, d = 1.4; if (lt < 0 || lt > d) return; const k = clamp(spring(lt, 'bouncy'), 0, 1.3), pul = 1 + 0.22 * hit(lt - 0.35, 9) * (lt > 0.35 ? 1 : 0) + 0.18 * hit(lt - 0.75, 9) * (lt > 0.75 ? 1 : 0), a = 1 - ease.in(lin(lt, 1.1, d));
      g.save(); g.globalAlpha = a; g.translate(0, -26 * ease.out(lin(lt, 0, d))); g.scale(k * pul, k * pul);
      B.shadowed(g, () => heartPath(g, p.s), '#FF3B30', 0.3); g.save(); heartPath(g, p.s); g.clip(); const lg = g.createLinearGradient(-p.s, -p.s, p.s, p.s); lg.addColorStop(0, 'rgba(255,255,255,.35)'); lg.addColorStop(0.5, 'rgba(255,255,255,0)'); lg.addColorStop(1, 'rgba(0,0,0,.22)'); g.fillStyle = lg; g.fillRect(-p.s * 1.3, -p.s, p.s * 2.6, p.s * 1.6); g.restore(); g.restore();
      for (let i = 0; i < 3; i++) { const u = lin(lt, 0.3 + i * 0.12, 1.3 + i * 0.05); if (u <= 0 || u >= 1) continue; g.save(); g.globalAlpha = Math.sin(Math.PI * u); g.translate((i - 1) * p.s * 0.9 + Math.sin(u * 5 + i) * 10, -p.s * 0.9 - u * 120); g.scale(0.28, 0.28); heartPath(g, p.s); g.fillStyle = '#FF3B30'; g.fill(); g.restore(); }
      burst(g, 0, 0, p.s * 1.1, '#FF3B30', lt - 0.3, 10, 0.4); } });
  // plane: a paper plane is flicked from his hand and flies off up-right (path in screen px). ~1.3 s
  B.register('plane', { defaults: { dx: 230, dy: -360 }, ownEnter: true, size: () => [200, 200],
    draw(g, p, env) { const { lt, theme } = env, d = 1.3; if (lt < 0 || lt > d) return; const u = ease.out(lin(lt, 0, d)), x = p.dx * u, y = p.dy * u + 120 * Math.sin(Math.PI * u) * (1 - u) * -1 * -1 - 80 * Math.sin(Math.PI * u), ang = Math.atan2(p.dy - 160 * (1 - 2 * u), p.dx), sc = 1 + 0.5 * (1 - u) * 0 - 0.35 * u, a = 1 - ease.in(lin(lt, 1.0, d));
      g.save(); g.globalAlpha = a * 0.5; g.strokeStyle = theme.paper; g.lineWidth = 4; g.lineCap = 'round'; g.setLineDash([2, 16]); g.beginPath(); for (let i = 0; i <= 20; i++) { const v = u * i / 20, xx = p.dx * v, yy = p.dy * v - 80 * Math.sin(Math.PI * v); i ? g.lineTo(xx, yy) : g.moveTo(xx, yy); } g.stroke(); g.restore();
      g.save(); g.globalAlpha = a; g.translate(x, y); g.rotate(ang + Math.sin(lt * 9) * 0.12); g.scale(sc * 1.6, sc * 1.6); const path = () => { g.beginPath(); g.moveTo(34, 0); g.lineTo(-30, -22); g.lineTo(-14, 0); g.lineTo(-30, 22); g.closePath(); };
      B.shadowed(g, path, theme.paper, 0.4); g.fillStyle = 'rgba(20,24,30,.16)'; g.beginPath(); g.moveTo(34, 0); g.lineTo(-14, 0); g.lineTo(-30, 22); g.closePath(); g.fill(); g.strokeStyle = 'rgba(11,15,20,.25)'; g.lineWidth = 2; g.beginPath(); g.moveTo(34, 0); g.lineTo(-14, 0); g.stroke(); g.restore(); } });
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
      const n = Math.max(0, Math.min(p.n, Math.floor((t - p.at) / p.per) + 1)); const cw = 148, gap = 14, tot = p.n * (cw + gap) - gap, sx = -tot / 2;
      for (let i = 0; i < p.n; i++) { const on = t - (p.at + i * p.per), x = sx + i * (cw + gap) + cw / 2, y = y0 + 330; g.fillStyle = 'rgba(11,15,20,.07)'; rr(g, x - cw / 2, y - 120, cw, 240, 14); g.fill(); txt(g, 'PAYDAY', x, y - 90, F.monoX(20), theme.inkSoft); txt(g, String(i + 1), x, y - 52, F.hero(36), theme.inkSoft);
        if (on > 0) { const k = pop(on, 'bouncy'); g.save(); g.translate(x, y + 20 + (1 - k) * -60); g.globalAlpha *= clamp(on / 0.1); g.fillStyle = bad; rr(g, -cw / 2 + 8, -50, cw - 16, 110, 12); g.fill(); txt(g, '-$' + p.fee, 0, 4, F.hero(46), theme.paper); g.restore(); } }
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
// ===== scene: 5 CONS THAT FOOLED BILLIONAIRES, BANKS AND ENTIRE STATES (long-form, engine v2, 1920x1080) =====
const E = [], BT = [], SF = [], PO = [], SK = [];
const RM = [0, 24000, 50000, 76000, 102000, 128000, 154000, 182000];   // rooms: cold open, ch1..ch5, ch6 pattern, end card
const K = (room, k) => room + 2800 * k;
const el = (id, type, x, y, inn, props, o) => E.push({ id, type, at: [x, y], in: inn, props: props || {}, ...(o || {}) });
const bt = (at, beat, focus, o) => BT.push({ at, beat, ...(focus !== undefined && focus !== null ? { focus } : {}), ...(o || {}) });
const sf = (at, name, gain = -8, dur = 1, offset) => SF.push({ at, name, gain, dur, ...(offset ? { offset } : {}) });
const po = (at, pose, target) => PO.push(target ? [at, pose, { target }] : [at, pose]);
const sk = (at, amp = 12) => SK.push([at, amp]);
// the five cons as recurring characters (crime.js `suspect` base props)
const CON = {
  kur: { src: 'brand/photos/rudy-kurniawan/2.jpg', name: 'RUDY KURNIAWAN', nick: '“THE WINE COLLECTOR”', credit: 'PHOTO: U.S. ICE · PUBLIC DOMAIN', fx: 0.49, fy: 0.45, aspect: 1.05 },
  gig: { src: 'brand/photos/anthony-gignac/1.jpg', crop: [0.5, 0, 0.5, 1], name: 'ANTHONY GIGNAC', nick: '“THE PRINCE”', credit: 'PHOTO: MIAMI-DADE COUNTY · PUBLIC DOMAIN', fx: 0.46, fy: 0.4, aspect: 1.05 },
  tip: { src: 'videos/2026-11-27-five-cons/assets/tipton.png', name: 'EDDIE TIPTON', nick: '“THE LOTTERY IT GUY”', credit: 'ILLUSTRATION · NO LICENSED PHOTO', fx: 0.5, fy: 0.45, aspect: 1.12 },
  tuc: { src: 'videos/2026-11-27-five-cons/assets/tucker.png', name: 'SCOTT TUCKER', nick: '“THE PAYDAY LENDER”', credit: 'ILLUSTRATION · NO LICENSED PHOTO', fx: 0.5, fy: 0.45, aspect: 1.12 },
  jav: { src: 'brand/photos/charlie-javice-illustration/founder.png', name: 'CHARLIE JAVICE', nick: '“THE FOUNDER”', credit: 'ILLUSTRATION · NO LICENSED PHOTO', fx: 0.5, fy: 0.42, aspect: 1.12 },
};
const con = (id, who, x, y, inn, extra, o) => el(id, 'suspect', x, y, inn, { ...CON[who], ...(extra || {}) }, o);
const STAGES = [
  { at: '@P07-0.7', dur: 1.2, theme: { stage: ['#3a1620', '#240d14', '#120609'], blobs: [['#7a2a3c', 0.55], ['#5b1f33', 0.5], ['#3e2030', 0.55], ['#7a2a3c', 0.4]], dust: '#FFD9DF' } },
  { at: '@P21-0.7', dur: 1.2, theme: { stage: ['#123a3d', '#0c2528', '#061214'], blobs: [['#1f7a7a', 0.55], ['#2a6a78', 0.5], ['#2e4a60', 0.55], ['#1f7a7a', 0.4]], dust: '#D9FFF6' } },
  { at: '@P34-0.7', dur: 1.2, theme: { stage: ['#2a2f52', '#171a33', '#0B0F14'], blobs: [['#8a6a1f', 0.5], ['#2a3a78', 0.55], ['#3e3a70', 0.5], ['#8a6a1f', 0.35]], dust: '#FFF0C0' } },
  { at: '@P48-0.7', dur: 1.2, theme: { stage: ['#14382a', '#0c2219', '#06120d'], blobs: [['#1f7a4a', 0.55], ['#2a6a50', 0.5], ['#1e4a3a', 0.5], ['#1f7a4a', 0.4]], dust: '#D9FFE6' } },
  { at: '@P60-0.7', dur: 1.2, theme: { stage: ['#2e1e52', '#1a1233', '#0B0F14'], blobs: [['#5a2aa8', 0.55], ['#3a2a78', 0.5], ['#6a2a8a', 0.45], ['#5a2aa8', 0.4]], dust: '#EBD9FF' } },
  { at: '@P71-0.7', dur: 1.2, theme: { stage: ['#26354A', '#152030', '#0B0F14'], blobs: [['#1F5F7A', 0.58], ['#2A4278', 0.55], ['#1E4A4A', 0.5], ['#1F5F7A', 0.4]], dust: '#DCEBFF' } },
];
const CHAP = [['@P07', 'THE WINE'], ['@P21', 'THE PRINCE'], ['@P34', 'THE LOTTERY'], ['@P48', 'THE LOAN'], ['@P60', 'THE USERS'], ['@P71', 'THE PATTERN']];
// ---------------- COLD OPEN (P01-P06): three faces, three numbers ----------------
const R0 = k => K(RM[0], k);
// P01: the wine con — Kurniawan photo + $2.1M + bottles tagged FAKE on "kitchen"
con('k0', 'kur', R0(0) - 640, 60, -3, { w: 440, variant: 'card', stamps: [{ text: 'FAKE WINE', at: '@P01:kitchen', tone: 'bad', size: 60, rot: -0.1, y: 40 }], file: true, caseNo: 'CASE Nº 1' }, { out: '@P02-0.2' });
el('c21', 'counter', R0(0) + 330, -60, -3, { label: 'A BILLIONAIRE PAID', sub: 'FOR "RARE" WINE', to: 2100000, prefix: '$', at: '@P01:$2', dur: 1.3, tone: 'bad', size: 150, w: 900 }, { out: '@P02-0.2' });
el('b0', 'bottles', R0(0) + 330, 280, '@P01:wine-0.1', { items: [{ label: '1945', at: '@P01:wine' }, { label: '1982', at: '@P01:wine+0.12' }, { label: '1990', at: '@P01:wine+0.24' }], fakeAt: '@P01:kitchen', gap: 170 }, { out: '@P02-0.2' });
bt(0, 'graphic-hero', ['k0', 'c21'], { fill: 0.74, sy: 480, pose: 'point' }); sf(0, 'paper_slam_2', -9, 0.5); sf(0.05, 'camera_flash_1', -9, 0.6);
bt('@P01:$2', 'zoom-on-number', 'c21.value', { fill: 0.42, sy: 520 }); sf('@P01:$2', 'money_counter_2', -12, 1.4); sf('@P01:million+0.2', 'deep_boom_1', -6, 1.0); sk('@P01:million+0.2', 12);
bt('@P01:wine', 'graphic-hero', ['k0', 'c21', 'b0'], { fill: 0.78, sy: 500, pose: 'point' });
bt('@P01:kitchen', 'zoom-on-number', 'k0', { fill: 0.3, maxH: 760, sy: 520, pose: 'shock' }); sf('@P01:kitchen', 'rubber_stamp_2', -5, 0.5);
// P02: the bank con — 4,000,000 customers who did not exist, Javice small, $175M
el('bank', 'icon', R0(1) - 560, 20, '@P02-0.3', { kind: 'building', s: 380, col: 'paper' }, { out: '@P03-0.2' });
el('c175', 'counter', R0(1) + 160, -170, '@P02-0.3', { label: 'A BANK PAID', to: 175000000, prefix: '$', at: '@P02:$175', dur: 1.5, tone: 'bad', size: 130, w: 980 }, { out: '@P03-0.2' });
el('c4m', 'counter', R0(1) + 160, 150, '@P02:4-0.1', { label: 'FOR CUSTOMERS', to: 4000000, at: '@P02:4', dur: 1.2, tone: 'good', size: 130, w: 980, card: true }, { out: '@P03-0.2' });
con('j0', 'jav', R0(1) + 720, 340, '@P02:did-0.2', { w: 250, variant: 'pip', label: 'NEVER EXISTED', flash: false, xmark: '@P02:exist' }, { out: '@P03-0.2' });
bt('@P02', 'graphic-hero', ['bank', 'c175', 'c4m'], { move: 'whip', fill: 0.72, sy: 500, pose: 'point' }); sf('@P02-0.3', 'swoosh_2', -11, 0.5);
bt('@P02:$175', 'zoom-on-number', 'c175.value', { fill: 0.5, sy: 500 }); sf('@P02:$175', 'money_counter_1', -12, 1.6); sf('@P02:million+0.2', 'cash_register_1', -9, 0.9);
bt('@P02:4', 'zoom-on-number', 'c4m.value', { fill: 0.5, sy: 500 });
bt('@P02:did', 'graphic-hero', ['c4m', 'j0'], { fill: 0.6, sy: 500, pose: 'shock' }); sf('@P02:exist', 'glitch_1', -9, 0.6); sk('@P02:exist', 12);
// P03: the lottery con — $16.5M jackpot rigged by the man whose job was to protect it
con('t0', 'tip', R0(2) - 640, 60, '@P03-0.3', { w: 440, variant: 'card', file: true, caseNo: 'CASE Nº 3', stamps: [{ text: 'RIGGED IT', at: '@P03:rigged', tone: 'bad', size: 60, rot: -0.1, y: 40 }] }, { out: '@P04-0.2' });
el('lt0', 'lotto', R0(2) + 330, 0, '@P03-0.2', { w: 760, h: 440, amount: '$16.5 MILLION', ballsAt: '@P03:$16', stamp: 'RIGGED', stampAt: '@P03:rigged' }, { out: '@P04-0.2' });
el('lk', 'icon', R0(2) + 330, -330, '@P03:protect-0.3', { kind: 'lock', s: 180, col: 'paper' }, { out: '@P04-0.2' });
bt('@P03', 'graphic-hero', ['t0', 'lt0'], { move: 'whip', fill: 0.78, sy: 500, pose: 'point' }); sf('@P03-0.3', 'swoosh_2', -11, 0.5); sf('@P03-0.1', 'camera_flash_1', -9, 0.6);
bt('@P03:$16', 'zoom-on-number', 'lt0.amount', { fill: 0.42, sy: 500 }); sf('@P03:$16', 'money_counter_2', -12, 1.2);
bt('@P03:rigged', 'zoom-on-number', 'lt0', { fill: 0.4, maxH: 640, sy: 520, pose: 'shock' }); sf('@P03:rigged', 'rubber_stamp_2', -5, 0.5); sk('@P03:rigged', 12);
bt('@P03:protect', 'graphic-hero', ['t0', 'lt0', 'lk'], { fill: 0.78, sy: 540, pose: 'chin' });
// P04: five real cons, every one ended in a courtroom, caught the same way
for (const [i, w] of ['kur', 'gig', 'tip', 'tuc', 'jav'].entries()) con('f' + i, w, R0(3) + (i - 2) * 420, 60 + (i % 2) * 24, `@P04:five+${(i * 0.14).toFixed(2)}`, { w: 330, variant: 'card', tilt: (i - 2) * 0.03, flash: i < 2, credit: '' }, { out: '@P05-0.2' });
el('fiveT', 'text', R0(3), -400, '@P04-0.2', { lines: [[['FIVE REAL CONS', 'paper']]], size: 96 }, { out: '@P05-0.2' });
el('gav', 'icon', R0(3) + 960, -330, '@P04:courtroom-0.2', { kind: 'cuffs', s: 200, col: 'paper' }, { out: '@P05-0.2' });
bt('@P04', 'graphic-hero', ['fiveT', 'f0', 'f4'], { move: 'whip', fill: 0.9, sy: 470, pose: 'point' }); sf('@P04-0.3', 'swoosh_2', -11, 0.5);
for (let i = 0; i < 5; i++) sf(`@P04:five+${(i * 0.14).toFixed(2)}`, 'pop_2', -9, 0.3);
bt('@P04:every', 'zoom-on-number', 'f0', { fill: 0.22, maxH: 520, sy: 500 }); bt('@P04:courtroom', 'graphic-hero', ['f0', 'f4', 'gav'], { fill: 0.95, sy: 520, pose: 'shock' }); sf('@P04:courtroom', 'gavel_1', -6, 0.8);
bt('@P04:same', 'zoom-on-number', 'fiveT', { fill: 0.5, maxH: 300, sy: 360, pose: 'chin' });
// P05: not a genius detective — one small number that did not add up
el('q5', 'text', R0(4), -40, '@P05-0.3', { lines: [[['?', 'accent']]], size: 560 }, { out: '@P05:by-0.1' });
el('one', 'counter', R0(4), 20, '@P05:by-0.1', { label: 'ONE SMALL NUMBER', sub: 'THAT DID NOT ADD UP', to: 1, at: '@P05:one', dur: 0.4, tone: 'accent', size: 330, w: 900 }, { out: '@P06-0.2' });
el('mag', 'icon', R0(4) + 480, -140, '@P05:small-0.1', { kind: 'magnifier', s: 280, col: 'paper' }, { out: '@P06-0.2' });
bt('@P05', 'graphic-hero', 'q5', { move: 'whip', fill: 0.3, maxH: 700, sy: 480, pose: 'chin' }); sf('@P05-0.2', 'suspense_drone_1', -18, 3, 0);
bt('@P05:by', 'graphic-hero', ['one', 'mag'], { fill: 0.58, sy: 480, pose: 'point' }); sf('@P05:one', 'pop_2', -8, 0.4); bt('@P05:small', 'zoom-on-number', 'one.value', { fill: 0.34, maxH: 480, sy: 480, pose: 'shock' }); sf('@P05:did', 'wrong_buzzer_2', -12, 0.6);
// P06: stick around — the pattern board teaser, then the title
el('bt', 'board', R0(5), 40, '@P06-0.3', { w: 1300, h: 760, title: 'THE PATTERN', caseNo: '5 CASES · 1 CLUE', items: [
  { k: 'photo', src: CON.kur.src, x: -480, y: -150, w: 230, h: 260, name: 'KURNIAWAN', at: '@P06+0.1', rot: -0.05, fx: 0.49, fy: 0.4 }, { k: 'photo', src: CON.gig.src, crop: [0.5, 0, 0.5, 1], x: -240, y: -130, w: 230, h: 260, name: 'GIGNAC', at: '@P06+0.25', rot: 0.04, fx: 0.46, fy: 0.4 },
  { k: 'photo', src: CON.tip.src, x: 0, y: -150, w: 230, h: 260, name: 'TIPTON', at: '@P06+0.4', rot: -0.03 }, { k: 'photo', src: CON.tuc.src, x: 240, y: -130, w: 230, h: 260, name: 'TUCKER', at: '@P06+0.55', rot: 0.05 }, { k: 'photo', src: CON.jav.src, x: 480, y: -150, w: 230, h: 260, name: 'JAVICE', at: '@P06+0.7', rot: -0.04 },
  { x: 0, y: 190, w: 420, h: 150, lines: [['?', 'bad', 90]], at: '@P06:pattern', rot: 0.02 }], strings: [[0, 1, '@P06+0.9'], [1, 2, '@P06+1.1'], [2, 3, '@P06+1.3'], [3, 4, '@P06+1.5'], [0, 5, '@P06:pattern'], [4, 5, '@P06:pattern+0.2']], tightAt: 99999 }, { out: '@P06>-0.2' });
el('ttl', 'headline', R0(6), 40, '@P06>-0.1', { kicker: 'A BAD MATH CASE FILE', lines: [[['5 ', 'accent'], ['CONS', 'paper']]], size: 260, underAt: 0.9 });
bt('@P06', 'graphic-hero', 'bt', { move: 'whip', fill: 0.7, sy: 470, pose: 'point' }); sf('@P06-0.3', 'swoosh_2', -11, 0.5);
for (let i = 0; i < 5; i++) sf(`@P06+${(0.1 + i * 0.15).toFixed(2)}`, 'camera_flash_1', -14, 0.4);
bt('@P06:pattern', 'zoom-on-number', 'bt', { fill: 0.62, maxH: 780, sy: 470, pose: 'shock' }); sf('@P06:pattern', 'heartbeat_1', -10, 2);
bt('@P06>-0.1', 'graphic-hero', 'ttl', { move: 'whip', fill: 0.72, sy: 470, pose: 'shock', dur: 0.5 }); sf('@P06>-0.2', 'deep_boom_1', -3, 2.0); sk('@P06>-0.1', 12);
// ---------------- CH1 · THE WINE THAT COULDN'T EXIST (P07-P20) — burgundy room, Kurniawan ----------------
const R1 = k => K(RM[1], k);
// P07 chapter card + case-file intro
el('ch1', 'headline', R1(0) - 360, 40, '@P07-0.3', { kicker: 'CHAPTER ONE', lines: ['THE WINE THAT', [['COULDN\'T ', 'paper'], ['EXIST', 'bad']]], size: 118, underAt: 1.0 }, { out: '@P08-0.2' });
con('k1', 'kur', R1(0) + 640, 50, '@P07-0.2', { w: 440, variant: 'card', file: true, caseNo: 'CASE Nº 1', push: { at: '@P07', to: 1.12, dur: 4 } }, { out: '@P08-0.2' });
bt('@P07', 'graphic-hero', ['ch1', 'k1'], { move: 'whip', dur0: 0.7, fill: 0.82, sy: 480, pose: 'shrug', arc: 0.2 }); sf('@P07-0.6', 'tape_stop_1', -8, 1.0); sf('@P07-0.1', 'cinematic_hit_1', -9, 1.5); sf('@P07+0.9', 'camera_flash_1', -9, 0.6); sk('@P07+0.7', 8);
bt('@P07:wine', 'zoom-on-number', 'k1', { fill: 0.3, maxH: 760, sy: 520, pose: 'point' });
// P08 LA, early 2000s — the pitch: a young collector at the fanciest dinners
el('dc8', 'datecard', R1(1) - 360, -330, '@P08-0.2', { big: '2000s', small: 'LOS ANGELES' }, { out: '@P09-0.2' });
con('k2', 'kur', R1(1) - 150, 40, '@P08-0.3', { w: 880, variant: 'side', quote: ['A YOUNG', 'COLLECTOR'], quoteSub: 'AMERICA\'S FANCIEST WINE DINNERS', quoteSize: 74, quoteAt: '@P08:young', noquote: false, aspect: 0.62, pw: 400 }, { out: '@P09-0.2' });
el('v8', 'victim', R1(1) + 600, 80, '@P08:fanciest-0.2', { kind: 'collector', label: 'THE DINNER GUESTS', sub: 'WINE LOVERS', w: 360, h: 460, reactAt: '@P08:fanciest' }, { out: '@P09-0.2' });
bt('@P08', 'graphic-hero', ['k2', 'v8', 'dc8'], { move: 'whip', fill: 0.72, sy: 500, pose: 'point' }); sf('@P08-0.3', 'swoosh_2', -11, 0.5); sf('@P08-0.1', 'camera_flash_1', -10, 0.6);
bt('@P08:young', 'zoom-on-number', 'k2', { fill: 0.5, maxH: 720, sy: 500 }); bt('@P08:fanciest', 'graphic-hero', ['k2', 'v8'], { fill: 0.74, sy: 480, pose: 'point' }); sf('@P08:fanciest', 'pop_2', -9, 0.3);
// P09 bottles that cost $10,000 like soda; people call him a genius
el('b9', 'bottles', R1(2) - 330, 60, '@P09-0.3', { items: [{ label: '$10,000', at: '@P09:bottles', size: 24 }, { label: '$10,000', at: '@P09:bottles+0.2', size: 24 }, { label: '$10,000', at: '@P09:bottles+0.4', size: 24 }], gap: 190 }, { out: '@P10-0.2' });
el('g9', 'text', R1(2) + 560, 20, '@P09:people-0.1', { lines: [[['“GENIUS”', 'gold']]], size: 140 }, { enter: 'slam', out: '@P10-0.2' });
con('k9', 'kur', R1(2) + 560, 290, '@P09:genius-0.3', { w: 270, variant: 'pip', label: 'THE PITCH', flash: false }, { out: '@P10-0.2' });
bt('@P09', 'graphic-hero', 'b9', { move: 'whip', fill: 0.6, sy: 500, pose: 'point' }); sf('@P09-0.3', 'swoosh_2', -11, 0.5);
bt('@P09:bottles', 'zoom-on-number', 'b9', { fill: 0.5, maxH: 520, sy: 510 }); sf('@P09:bottles', 'pop_2', -9, 0.3); bt('@P09:soda', 'graphic-hero', 'b9', { fill: 0.64, sy: 500, pose: 'shrug' });
bt('@P09:people', 'graphic-hero', ['b9', 'g9', 'k9'], { fill: 0.84, sx: 960, sy: 500, pose: 'shock' }); sf('@P09:genius', 'rubber_stamp_2', -6, 0.5);
// P10 2006 auction, $35M, world record
el('gav10', 'tile', R1(3) - 520, 80, '@P10-0.3', { icon: 'gavel', caption: 'AUCTION · 2006', w: 330, h: 380, iconS: 190 }, { out: '@P11-0.2' });
el('c35', 'counter', R1(3) + 270, 0, '@P10-0.2', { label: 'TWO SALES', sub: 'ONE OF THEM BROKE THE WORLD RECORD', to: 35000000, prefix: '$', at: '@P10:$35', dur: 1.6, tone: 'good', size: 180, w: 1060 }, { out: '@P11-0.2' });
el('wr10', 'stamp', R1(3) + 620, -250, '@P10:world', { text: 'WORLD RECORD', tone: 'accent', size: 70 }, { rot: -0.08, out: '@P11-0.2' });
bt('@P10', 'graphic-hero', ['gav10', 'c35'], { move: 'whip', fill: 0.8, sy: 500, pose: 'point' }); sf('@P10-0.3', 'swoosh_2', -11, 0.5); sf('@P10:sells', 'gavel_1', -7, 0.8);
bt('@P10:$35', 'zoom-on-number', 'c35.value', { fill: 0.5, sy: 510, pose: 'shock' }); sf('@P10:$35', 'money_counter_2', -11, 1.6); sf('@P10:million+0.3', 'cash_register_1', -9, 0.9); sk('@P10:million+0.3', 10);
bt('@P10:world', 'graphic-hero', ['c35', 'wr10'], { fill: 0.7, sy: 500, pose: 'point' }); sf('@P10:world', 'rubber_stamp_2', -5, 0.5);
// P11-P12 the trick, step by step; he is in the corner with an arrow to the step
el('s1', 'card', R1(4) - 1020, 40, '@P11:here\'s-0.1', { w: 440, h: 440, lines: [{ t: '1', size: 130, tone: 'bad', at: '@P11:here\'s' }, { t: 'OLD, CHEAPER', size: 52, at: '@P11:bought' }, { t: 'WINE', size: 52, at: '@P11:bought' }] }, { out: '@P13-0.2' });
el('s2', 'card', R1(4) - 340, 40, '@P11:newer-0.2', { w: 440, h: 440, lines: [{ t: '2', size: 130, tone: 'bad', at: '@P11:mixed' }, { t: 'MIX IN', size: 52, at: '@P11:newer' }, { t: 'NEWER WINE', size: 52, at: '@P11:newer' }] }, { out: '@P13-0.2' });
el('s3', 'card', R1(4) + 340, 40, '@P11:poured-0.1', { w: 440, h: 440, lines: [{ t: '3', size: 130, tone: 'bad', at: '@P11:poured' }, { t: 'POUR INTO', size: 52, at: '@P11:poured' }, { t: 'EMPTY OLD BOTTLES', size: 40, at: '@P11:empty' }] }, { out: '@P13-0.2' });
el('s4', 'card', R1(4) + 1020, 40, '@P12:new-0.1', { w: 440, h: 440, lines: [{ t: '4', size: 130, tone: 'bad', at: '@P12:new' }, { t: 'NEW CORKS', size: 46, at: '@P12:corks' }, { t: 'NEW WAX', size: 46, at: '@P12:wax' }, { t: 'PRINTED LABELS', size: 40, at: '@P12:printed' }] }, { out: '@P13-0.2' });
con('k11', 'kur', R1(4) - 340, 400, '@P11:how', { w: 250, variant: 'pip', label: 'HE DID THIS', flash: false, arrow: { at: '@P11:bought', to: [-120, -220] } }, { out: '@P13-0.2' });
bt('@P11', 'graphic-hero', ['s1', 's2', 's3'], { move: 'whip', fill: 0.92, sy: 480, pose: 'point' }); sf('@P11-0.3', 'swoosh_2', -11, 0.5);
bt('@P11:bought', 'zoom-on-number', ['s1', 'k11'], { fill: 0.4, maxH: 760, sy: 500 }); sf('@P11:here\'s', 'pop_2', -8, 0.3);
bt('@P11:newer', 'zoom-on-number', 's2', { fill: 0.26, maxH: 640, sy: 500 }); sf('@P11:newer', 'pop_2', -8, 0.3); bt('@P11:poured', 'zoom-on-number', 's3', { fill: 0.26, maxH: 640, sy: 500, pose: 'shock' }); sf('@P11:poured', 'pour_glug_1', -10, 1.2);
bt('@P12', 'graphic-hero', ['s3', 's4'], { fill: 0.7, sy: 490, pose: 'point' }); bt('@P12:new#2', 'zoom-on-number', 's4', { fill: 0.28, maxH: 640, sy: 500 }); sf('@P12:corks', 'pop_2', -8, 0.3); sf('@P12:wax', 'pop_1', -9, 0.3); sf('@P12:printed', 'typewriter_2', -11, 1.2);
bt('@P12:famous', 'zoom-on-number', 's4', { fill: 0.34, maxH: 640, sy: 500, pose: 'point' });
// P13 FBI search 2012: kitchen photo, wine factory
el('kit', 'photo', R1(5) - 420, 20, '@P13-0.3', { src: 'brand/photos/rudy-kurniawan/3.jpg', name: 'HIS KITCHEN', role: 'FBI SEARCH · 2012', credit: 'PHOTO: U.S. GOVERNMENT · PUBLIC DOMAIN', treatment: 'paper', fx: 0.5, fy: 0.5, w: 780, aspect: 0.72, tilt: -0.02 }, { out: '@P14-0.2' });
el('t13a', 'tile', R1(5) + 330, -200, '@P13:stacks-0.1', { icon: 'bottle', caption: 'CORKS', w: 250, h: 270, iconS: 130, stamp: '', tilt: 0.03 }, { out: '@P14-0.2' });
el('t13b', 'tile', R1(5) + 620, -200, '@P13:wax-0.1', { icon: 'cash', caption: 'WAX', w: 250, h: 270, iconS: 130, tilt: -0.02 }, { out: '@P14-0.2' });
el('t13c', 'tile', R1(5) + 905, -200, '@P13:thousands-0.4', { icon: 'labels', caption: 'LABELS', w: 250, h: 270, iconS: 130, tilt: 0.03 }, { out: '@P14-0.2' });
el('wf', 'stamp', R1(5) + 620, 150, '@P13:wine+0.1', { text: 'A WINE FACTORY', tone: 'bad', size: 74 }, { rot: -0.05, out: '@P14-0.2' });
bt('@P13', 'graphic-hero', 'kit', { move: 'whip', fill: 0.5, maxH: 700, sx: 800, sy: 480, pose: 'point' }); sf('@P13-0.3', 'camera_flash_1', -9, 0.6);
bt('@P13:prosecutors', 'graphic-hero', ['kit', 'wf'], { fill: 0.82, sy: 500 }); sf('@P13:wine+0.1', 'rubber_stamp_2', -5, 0.5); sk('@P13:wine+0.1', 10);
bt('@P13:stacks', 'graphic-hero', ['t13a', 't13b', 't13c', 'wf'], { fill: 0.5, sx: 900, sy: 470, pose: 'point' }); sf('@P13:stacks-0.1', 'pop_2', -9, 0.3); sf('@P13:wax-0.1', 'pop_2', -9, 0.3); sf('@P13:thousands-0.4', 'pop_1', -9, 0.3);
bt('@P13:thousands', 'zoom-on-number', 't13c', { fill: 0.2, maxH: 400, sx: 900, sy: 440, pose: 'shock' });
// P14 the best tasters drank it and praised it
for (let i = 0; i < 3; i++) el('ts' + i, 'victim', R1(6) - 420 + i * 420, 20, `@P14:tasters+${(i * 0.18).toFixed(2)}`, { kind: 'collector', label: 'EXPERT TASTER', sub: 'LOVED IT', w: 320, h: 410, suit: ['#1FA366', '#2F5DA8', '#8A3FD1'][i], tape: 'TASTER', reactAt: '@P14:praised' }, { out: '@P15-0.2' });
el('pr14', 'stamp', R1(6), 330, '@P14:praised-0.1', { text: 'DRANK IT · PRAISED IT', tone: 'good', size: 70 }, { rot: -0.04, out: '@P15-0.2' });
bt('@P14', 'graphic-hero', 'ts1', { move: 'whip', fill: 0.3, maxH: 620, sy: 500, pose: 'chin' }); sf('@P14-0.3', 'swoosh_2', -11, 0.5);
bt('@P14:tasters', 'graphic-hero', ['ts0', 'ts2', 'pr14'], { fill: 0.72, sy: 500, pose: 'point' }); bt('@P14:praised', 'zoom-on-number', 'pr14', { fill: 0.44, maxH: 300, sy: 500, pose: 'shrug' }); sf('@P14:praised', 'pop_2', -9, 0.3);
// P15 what caught him: not taste, a date; red ring on his face (the catch)
el('h15', 'headline', R1(7) - 520, -250, '@P15-0.3', { kicker: 'WHAT CAUGHT HIM', lines: [[['NOT TASTE.', 'paper']], [['A DATE.', 'bad']]], size: 150, underAt: 1.0 }, { out: '@P16-0.2' });
con('k15', 'kur', R1(7) + 620, 20, '@P15-0.3', { w: 400, variant: 'card', ring: '@P15:date', push: { at: '@P15', to: 1.25, dur: 3 }, flash: false }, { out: '@P16-0.2' });
bt('@P15', 'graphic-hero', ['h15', 'k15'], { move: 'whip', fill: 0.84, sy: 480, pose: 'chin' }); sf('@P15-0.3', 'swoosh_2', -11, 0.5);
bt('@P15:date', 'zoom-on-number', 'h15', { fill: 0.38, maxH: 520, sy: 380, pose: 'shock' }); sf('@P15:date', 'rubber_stamp_2', -5, 0.5); sk('@P15:date', 10);
// P16 2008 NY auction, label going back to 1945
el('lot16', 'card', R1(7) + 380, 280, '@P16-0.2', { w: 780, h: 220, lines: [{ t: 'CLOS SAINT-DENIS', size: 70, at: '@P16:french' }, { t: 'NEW YORK AUCTION · 2008', size: 34, font: 'mono', at: '@P16:auction' }] }, { out: '@P17-0.2' });
el('cal16', 'calendar', R1(7) - 520, 40, '@P16-0.2', { head: 'LABEL SAYS', roll: { from: 2008, to: 1945, at: '@P16:labels', dur: 1.7 }, sub: 'LABELS GO BACK TO 1945', subAt: '@P16:1945', size: 190 }, { out: '@P17-0.2' });
bt('@P16', 'graphic-hero', ['lot16', 'cal16'], { fill: 0.78, sy: 500, pose: 'point' }); sf('@P16', 'paper_slam_2', -10, 0.5);
bt('@P16:labels', 'zoom-on-number', 'cal16.value', { fill: 0.36, sy: 480, pose: 'shock' }); sf('@P16:labels', 'money_counter_1', -13, 1.7);
// P17 winemaker Ponsot objects; his family only started in 1982
el('v17', 'victim', R1(8) - 560, 40, '@P17-0.3', { kind: 'winemaker', label: 'LAURENT PONSOT', sub: 'THE WINEMAKER', w: 380, h: 480, reactAt: '@P17:objected' }, { out: '@P19-0.2' });
el('tl17', 'text', R1(8) + 200, -200, '@P17:family-0.2', { lines: [[['HIS FAMILY STARTED', 'paper']], [['MAKING IT IN ', 'paper'], ['1982', 'good']]], size: 76 }, { out: '@P18-0.2' });
bt('@P17', 'graphic-hero', 'v17', { move: 'whip', fill: 0.28, maxH: 740, sy: 500, pose: 'point' }); sf('@P17-0.3', 'swoosh_2', -11, 0.5);
bt('@P17:objected', 'zoom-on-number', 'v17', { fill: 0.3, maxH: 740, sy: 500, pose: 'shock' }); sf('@P17:objected', 'wrong_buzzer_2', -11, 0.6);
bt('@P17:family', 'graphic-hero', ['v17', 'tl17'], { fill: 0.8, sy: 480, pose: 'point' }); bt('@P17:1982', 'zoom-on-number', 'tl17', { fill: 0.4, maxH: 300, sy: 360, pose: 'point' }); sf('@P17:1982', 'ding_2', -9, 0.7);
// P18 labels were thirty-seven years older than the wine
el('ru18', 'ruler', R1(8) + 400, 40, '@P18-0.3', { from: '1945', to: '1982', n: 37, at: '@P18:those', dur: 1.5 }, { out: '@P19-0.2' });
bt('@P18', 'graphic-hero', 'ru18', { fill: 0.64, maxH: 700, sy: 500, pose: 'point' }); sf('@P18-0.3', 'paper_slam_2', -10, 0.5); sf('@P18:those', 'clock_ticking_1', -10, 1.5);
bt('@P18:37', 'zoom-on-number', 'ru18.n', { fill: 0.4, maxH: 420, sy: 400, pose: 'shock' }); sf('@P18:older', 'rubber_stamp_2', -5, 0.5); sk('@P18:older', 12);
// P19 billionaire Bill Koch: $2.1M for 219 bottles he says are fake
el('v19', 'victim', R1(9) - 560, 40, '@P19-0.3', { kind: 'billionaire', label: 'BILL KOCH', sub: 'BILLIONAIRE COLLECTOR', w: 380, h: 480, reactAt: '@P19:fake' }, { out: '@P20-0.2' });
el('c19', 'counter', R1(9) + 130, -120, '@P19-0.2', { label: 'HE PAID', to: 2100000, prefix: '$', at: '@P19:$2', dur: 1.2, tone: 'bad', size: 150, w: 900 }, { out: '@P20-0.2' });
el('b219', 'counter', R1(9) + 130, 200, '@P19:$2+0.6', { label: 'FOR BOTTLES HE SAYS ARE FAKE', to: 219, at: '@P19:219', dur: 0.9, tone: 'paper', size: 150, w: 900 }, { out: '@P20-0.2' });
bt('@P19', 'graphic-hero', ['v19', 'c19'], { move: 'whip', fill: 0.76, sy: 490, pose: 'point' }); sf('@P19-0.3', 'swoosh_2', -11, 0.5);
bt('@P19:$2', 'zoom-on-number', 'c19.value', { fill: 0.48, sy: 480 }); sf('@P19:$2', 'money_counter_2', -12, 1.3);
bt('@P19:219', 'zoom-on-number', 'b219.value', { fill: 0.48, sy: 520, pose: 'shock' }); sf('@P19:219', 'pop_2', -8, 0.4); bt('@P19:fake', 'graphic-hero', ['v19', 'c19', 'b219'], { fill: 0.82, sy: 500, pose: 'point' });
// P20 verdict: Kurniawan behind bars, 10 years, $28M+
con('k20', 'kur', R1(10) - 520, 40, '@P20-0.3', { w: 420, variant: 'card', bars: '@P20:10', stamps: [{ text: 'CONVICTED 2013', at: '@P20:jury', tone: 'bad', size: 52, rot: -0.1, y: 60 }], push: { at: '@P20', to: 1.2, dur: 4 }, flash: false }, { out: '@P21-0.2' });
el('y20', 'counter', R1(10) + 220, -130, '@P20:sentenced-0.1', { label: 'SENTENCED TO', sub: 'IN PRISON', to: 10, suffix: ' YEARS', at: '@P20:10', dur: 0.7, tone: 'bad', size: 170, w: 900 }, { out: '@P21-0.2' });
el('m20', 'counter', R1(10) + 220, 210, '@P20:ordered-0.1', { label: 'AND MUST PAY BACK MORE THAN', to: 28000000, prefix: '$', at: '@P20:$28', dur: 1.3, tone: 'bad', size: 130, w: 900 }, { out: '@P21-0.2' });
bt('@P20', 'graphic-hero', ['k20', 'y20'], { move: 'whip', fill: 0.78, sy: 490, pose: 'point' }); sf('@P20-0.3', 'swoosh_2', -11, 0.5);
bt('@P20:jury', 'zoom-on-number', 'k20', { fill: 0.28, maxH: 740, sy: 500, pose: 'shock' }); sf('@P20:jury', 'gavel_1', -5, 0.8); sk('@P20:jury', 12);
bt('@P20:10', 'zoom-on-number', 'y20.value', { fill: 0.42, maxH: 420, sy: 480 }); sf('@P20:10-0.1', 'cell_door_1', -7, 1.2); sf('@P20:10', 'deep_boom_1', -6, 1.0);
bt('@P20:$28', 'zoom-on-number', 'm20.value', { fill: 0.46, maxH: 360, sy: 520 }); sf('@P20:$28', 'money_counter_1', -12, 1.4);
bt('@P20:ordered', 'graphic-hero', ['k20', 'y20', 'm20'], { fill: 0.84, sy: 500, pose: 'chin' });
// ---------------- CH2 · THE PRINCE WHO ORDERED PORK (P21-P33) — royal teal room, Gignac ----------------
const R2 = k => K(RM[2], k);
el('ch2', 'headline', R2(0) - 360, 40, '@P21-0.3', { kicker: 'CHAPTER TWO', lines: ['THE PRINCE WHO', [['ORDERED ', 'paper'], ['PORK', 'accent']]], size: 118, underAt: 1.0 }, { out: '@P22-0.2' });
con('g1', 'gig', R2(0) + 640, 50, '@P21-0.2', { w: 440, variant: 'card', file: true, caseNo: 'CASE Nº 2', crownAt: '@P21:prince', push: { at: '@P21', to: 1.12, dur: 4 } }, { out: '@P22-0.2' });
bt('@P21', 'graphic-hero', ['ch2', 'g1'], { move: 'whip', dur0: 0.7, fill: 0.82, sy: 480, pose: 'shrug', arc: 0.2 }); sf('@P21-0.6', 'tape_stop_1', -8, 1.0); sf('@P21-0.1', 'cinematic_hit_1', -9, 1.5); sf('@P21+0.9', 'camera_flash_1', -9, 0.6); sk('@P21+0.7', 8);
bt('@P21:prince', 'zoom-on-number', 'g1', { fill: 0.3, maxH: 760, sy: 520, pose: 'point' });
// P22 Miami: he calls himself a prince — the pitch quote
el('dc22', 'datecard', R2(1) - 300, -330, '@P22-0.2', { big: 'MIAMI', small: 'FLORIDA' }, { out: '@P23-0.2' });
con('g2', 'gig', R2(1) - 200, 40, '@P22-0.3', { w: 900, variant: 'side', quote: ['“PRINCE KHALID', 'BIN AL-SAUD”'], quoteSub: 'SAUDI ROYAL FAMILY · HIS CLAIM', quoteSize: 62, quoteAt: '@P22:calls', noquote: true, aspect: 0.62, pw: 400, crownAt: '@P22:calls' }, { out: '@P23-0.2' });
bt('@P22', 'graphic-hero', ['g2', 'dc22'], { move: 'whip', fill: 0.56, maxH: 860, sy: 500, pose: 'point' }); sf('@P22-0.3', 'swoosh_2', -11, 0.5); sf('@P22-0.1', 'typewriter_2', -11, 1.6);
bt('@P22:royal', 'zoom-on-number', 'g2', { fill: 0.62, maxH: 640, sy: 500, pose: 'shrug' });
// P23 Fisher Island, a sign on the door that says Sultan
el('sky23', 'icon', R2(2) - 480, -90, '@P23-0.3', { kind: 'building', s: 300, col: 'paper' }, { out: '@P24-0.2' });
el('fi23', 'text', R2(2) - 480, 190, '@P23:fisher-0.2', { lines: [[['FISHER ISLAND', 'paper']], [['ONE OF THE RICHEST ZIP CODES', 'gold', 34]]], size: 64 }, { out: '@P24-0.2' });
el('door23', 'card', R2(2) + 520, 40, '@P23:sign-0.2', { w: 560, h: 420, fill: 'navy', lines: [{ t: 'SULTAN', size: 150, tone: 'gold', at: '@P23:sultan' }, { t: 'SIGN ON HIS DOOR', size: 32, font: 'mono', tone: 'paper', at: '@P23:sultan' }] }, { out: '@P24-0.2' });
bt('@P23', 'graphic-hero', ['sky23', 'fi23'], { move: 'whip', fill: 0.5, sy: 480, pose: 'point' }); sf('@P23-0.3', 'swoosh_2', -11, 0.5);
bt('@P23:sign', 'graphic-hero', 'door23', { fill: 0.36, maxH: 600, sy: 500, pose: 'point' }); sf('@P23:sign-0.2', 'paper_slam_2', -10, 0.5); bt('@P23:sultan', 'zoom-on-number', 'door23', { fill: 0.42, maxH: 560, sy: 500, pose: 'shock' }); sf('@P23:sultan', 'pop_2', -8, 0.4);
// P24 Ferrari with diplomatic plates; bodyguards flash badges
el('car24', 'car', R2(3) - 420, 40, '@P24-0.3', { w: 720, plate: 'DIPLOMAT 1', fakeAt: '@P27:plates' }, { out: '@P25-0.2' });
el('bd24', 'tile', R2(3) + 330, 0, '@P24:badges-0.2', { icon: 'badge', caption: 'DSS BADGE', w: 290, h: 330, iconS: 150, tilt: 0.03 }, { out: '@P25-0.2' });
el('bd24b', 'tile', R2(3) + 650, 40, '@P24:badges', { icon: 'badge', caption: 'DSS BADGE', w: 290, h: 330, iconS: 150, tilt: -0.04 }, { out: '@P25-0.2' });
con('g24', 'gig', R2(3) + 120, 380, '@P24:drives', { w: 230, variant: 'pip', label: 'HIS RIDE', flash: false }, { out: '@P25-0.2' });
bt('@P24', 'graphic-hero', 'car24', { move: 'whip', fill: 0.44, maxH: 520, sy: 500, pose: 'point' }); sf('@P24-0.3', 'swoosh_2', -11, 0.5); bt('@P24:license', 'zoom-on-number', 'car24.plate', { fill: 0.13, maxH: 360, sy: 520 }); sf('@P24:license', 'pop_2', -8, 0.3);
bt('@P24:badges', 'graphic-hero', ['car24', 'bd24', 'bd24b'], { fill: 0.86, sy: 500, pose: 'point' }); sf('@P24:badges', 'camera_flash_1', -10, 0.6);
// P25 he tells investors he can bring in hundreds of millions
el('v25', 'victim', R2(4) - 600, 40, '@P25-0.3', { kind: 'investor', label: 'THE INVESTORS', sub: 'GET IN FIRST', w: 380, h: 480, reactAt: '@P25:first' }, { out: '@P26-0.2' });
el('q25', 'text', R2(4) + 260, -150, '@P25:hundreds-0.4', { lines: [[['“HUNDREDS OF MILLIONS”', 'gold']], [['IF YOU GET IN FIRST', 'paper', 54]]], size: 78 }, { out: '@P26-0.2' });
con('g25', 'gig', R2(4) + 260, 230, '@P25:he-0.1', { w: 260, variant: 'pip', label: 'THE PITCH', flash: false, arrow: { at: '@P25:hundreds', to: [0, -180] } }, { out: '@P26-0.2' });
bt('@P25', 'graphic-hero', ['v25', 'q25'], { move: 'whip', fill: 0.7, sy: 500, pose: 'point' }); sf('@P25-0.3', 'swoosh_2', -11, 0.5);
bt('@P25:hundreds', 'zoom-on-number', 'q25', { fill: 0.44, maxH: 420, sy: 400, pose: 'point' }); sf('@P25:hundreds', 'pop_2', -8, 0.4); bt('@P25:first', 'graphic-hero', ['v25', 'q25', 'g25'], { fill: 0.82, sy: 500, pose: 'shock' });
// P26 investors handed over $8M+
el('cs26', 'cashStack', R2(5) - 480, 120, '@P26-0.3', { count: 60, at: '@P26:handed', per: 0.04, each: 135000, prefix: '$', label: 'HANDED OVER', w: 520 }, { out: '@P27-0.2' });
el('c26', 'counter', R2(5) + 340, 20, '@P26-0.2', { label: 'INVESTORS HANDED HIM', sub: 'MORE THAN', to: 8000000, prefix: '$', at: '@P26:$8', dur: 1.2, tone: 'bad', size: 170, w: 1000 }, { out: '@P27-0.2' });
bt('@P26', 'graphic-hero', ['cs26', 'c26'], { move: 'whip', fill: 0.8, sy: 500, pose: 'point' }); sf('@P26-0.3', 'swoosh_2', -11, 0.5);
bt('@P26:$8', 'zoom-on-number', 'c26.value', { fill: 0.5, sy: 500, pose: 'shock' }); sf('@P26:$8', 'cash_register_1', -9, 0.9); sf('@P26:$8', 'money_counter_2', -11, 1.3); sk('@P26:$8+1.0', 10);
// P27 reveal: plates fake, badges fake, the prince is Anthony Gignac from Michigan
con('g27', 'gig', R2(6) - 360, 40, '@P27-0.3', { w: 440, variant: 'card', crownOff: '@P27:plates', stamps: [{ text: 'NOT A PRINCE', at: '@P27:man', tone: 'bad', size: 54, rot: -0.1, y: 60 }], ring: '@P27:man', flash: false, push: { at: '@P27', to: 1.2, dur: 4 } }, { out: '@P28-0.2' });
el('t27a', 'tile', R2(6) + 380, -120, '@P27:plates-0.1', { icon: 'plate', caption: 'PLATES', w: 280, h: 310, iconS: 150, stamp: 'FAKE', stampAt: '@P27:plates', tone: 'bad', tilt: -0.03 }, { out: '@P28-0.2' });
el('t27b', 'tile', R2(6) + 700, -120, '@P27:badges-0.1', { icon: 'badge', caption: 'BADGES', w: 280, h: 310, iconS: 150, stamp: 'FAKE', stampAt: '@P27:badges', tone: 'bad', tilt: 0.03 }, { out: '@P28-0.2' });
el('mi27', 'text', R2(6) + 540, 250, '@P27:michigan-0.1', { lines: [[['GREW UP IN ', 'paper'], ['MICHIGAN', 'bad']]], size: 62 }, { out: '@P28-0.2' });
bt('@P27', 'graphic-hero', ['g27', 't27a'], { move: 'whip', fill: 0.78, sy: 490, pose: 'point' }); sf('@P27-0.3', 'swoosh_2', -11, 0.5);
bt('@P27:plates', 'zoom-on-number', 't27a', { fill: 0.22, maxH: 520, sy: 500, pose: 'shock' }); sf('@P27:plates', 'rubber_stamp_2', -5, 0.5); sk('@P27:plates', 10); bt('@P27:badges', 'zoom-on-number', 't27b', { fill: 0.22, maxH: 520, sy: 500 }); sf('@P27:badges', 'rubber_stamp_2', -5, 0.5);
bt('@P27:man', 'graphic-hero', ['g27', 't27b', 'mi27'], { fill: 0.8, sy: 500, pose: 'point' }); sf('@P27:man', 'camera_flash_1', -9, 0.6); sf('@P27:man+0.2', 'heartbeat_1', -10, 2);
bt('@P27:michigan', 'zoom-on-number', 'mi27', { fill: 0.4, maxH: 300, sy: 460 });
// P28 nobody checked the plates
el('mg28', 'icon', R2(7) - 320, 40, '@P28-0.3', { kind: 'magnifier', s: 360, col: 'paper' }, { out: '@P29-0.2' });
el('n28', 'stamp', R2(7) + 380, 40, '@P28:checked-0.3', { text: 'NOBODY CHECKED', tone: 'bad', size: 110 }, { rot: -0.05, out: '@P29-0.2' });
el('pl28', 'tile', R2(7) + 380, 300, '@P28:plates-0.1', { icon: 'plate', caption: 'THE PLATES', w: 240, h: 260, iconS: 120 }, { out: '@P29-0.2' });
bt('@P28', 'graphic-hero', ['mg28', 'n28'], { move: 'whip', fill: 0.66, sy: 490, pose: 'chin' }); sf('@P28-0.3', 'swoosh_2', -11, 0.5); bt('@P28:checked', 'zoom-on-number', 'n28', { fill: 0.5, maxH: 420, sy: 460, pose: 'shock' }); sf('@P28:checked', 'rubber_stamp_2', -5, 0.5); sk('@P28:checked', 10);
// P29 dinner: a devout Saudi royal would not eat pork; the partner watched him eat pork
el('v29', 'victim', R2(8) - 560, 100, '@P29-0.3', { kind: 'diner', label: 'THE PARTNER', sub: 'WATCHED THE DINNER', w: 380, h: 480, reactAt: '@P29:pork#2' }, { out: '@P30-0.2' });
el('ck29', 'text', R2(8) + 120, -90, '@P29:dinner-0.1', { lines: [[['A DEVOUT SAUDI ROYAL', 'paper']], [['WOULD NOT EAT ', 'paper'], ['PORK', 'bad']]], size: 70 }, { out: '@P30-0.2' });
con('g29', 'gig', R2(8) + 340, 260, '@P29:watched-0.1', { w: 290, variant: 'pip', label: 'ATE PORK', flash: false, xmark: '@P29:pork#2' }, { out: '@P30-0.2' });
bt('@P29', 'graphic-hero', 'v29', { move: 'whip', fill: 0.26, maxH: 740, sy: 500, pose: 'point' }); sf('@P29-0.3', 'swoosh_2', -11, 0.5); bt('@P29:dinner', 'graphic-hero', ['v29', 'ck29'], { fill: 0.78, sy: 490, pose: 'point' });
bt('@P29:pork', 'zoom-on-number', 'ck29', { fill: 0.5, maxH: 360, sy: 360 }); sf('@P29:pork', 'pop_2', -8, 0.4); bt('@P29:watched', 'graphic-hero', ['v29', 'ck29', 'g29'], { fill: 0.8, sy: 500, pose: 'shock' }); sf('@P29:pork#2', 'wrong_buzzer_2', -10, 0.6); sk('@P29:pork#2', 10);
// P30 his security team dug in; the story fell apart
el('id30a', 'tile', R2(9) - 330, 20, '@P30:team-0.2', { icon: 'badge', caption: 'SECURITY TEAM', w: 300, h: 340, iconS: 150 }, { out: '@P31-0.2' });
el('mg30', 'icon', R2(9) + 70, 20, '@P30:digging-0.2', { kind: 'magnifier', s: 330, col: 'paper' }, { out: '@P31-0.2' });
el('fa30', 'stamp', R2(9) + 520, 20, '@P30:apart-0.1', { text: 'FELL APART', tone: 'bad', size: 96 }, { rot: -0.06, out: '@P31-0.2' });
bt('@P30', 'graphic-hero', ['id30a', 'mg30'], { move: 'whip', fill: 0.6, sy: 490, pose: 'point' }); sf('@P30-0.3', 'swoosh_2', -11, 0.5); bt('@P30:apart', 'graphic-hero', ['mg30', 'fa30'], { fill: 0.62, sy: 490, pose: 'shock' }); sf('@P30:apart-0.1', 'rubber_stamp_2', -5, 0.5); sk('@P30:apart', 10);
// P31 arrested or convicted eleven times since 1988, same prince act
el('c31', 'counter', R2(10) - 300, -60, '@P31-0.2', { label: 'SINCE 1988', sub: 'ARRESTED OR CONVICTED', to: 11, suffix: ' TIMES', at: '@P31:11', dur: 0.9, tone: 'bad', size: 190, w: 980 }, { out: '@P32-0.2' });
for (let i = 0; i < 6; i++) con('m31' + i, 'gig', R2(10) - 800 + i * 235, 330, `@P31:11+${(i * 0.12).toFixed(2)}`, { w: 200, variant: 'pip', label: i === 5 ? 'SAME ACT' : '', flash: false, mono: true, credit: '' }, { out: '@P32-0.2' });
bt('@P31', 'graphic-hero', ['c31', 'm310'], { move: 'whip', fill: 0.74, sy: 490, pose: 'point' }); sf('@P31-0.3', 'swoosh_2', -11, 0.5);
bt('@P31:11', 'zoom-on-number', 'c31.value', { fill: 0.42, maxH: 440, sy: 460, pose: 'shock' }); sf('@P31:11', 'pop_2', -8, 0.4); for (let i = 0; i < 6; i++) sf(`@P31:11+${(i * 0.12).toFixed(2)}`, 'camera_flash_1', -14, 0.3);
bt('@P31:same', 'graphic-hero', ['c31', 'm310', 'm315'], { fill: 0.84, sy: 500, pose: 'point' });
// P32 verdict
con('g32', 'gig', R2(11) - 520, 40, '@P32-0.3', { w: 420, variant: 'card', bars: '@P32:18', stamps: [{ text: 'SENTENCED 2019', at: '@P32:2019', tone: 'bad', size: 52, rot: -0.1, y: 60 }], push: { at: '@P32', to: 1.2, dur: 4 }, flash: false }, { out: '@P33-0.2' });
el('y32', 'counter', R2(11) + 220, 0, '@P32:sentenced-0.2', { label: 'FEDERAL PRISON', sub: 'MORE THAN', to: 18, suffix: ' YEARS', at: '@P32:18', dur: 0.9, tone: 'bad', size: 170, w: 940 }, { out: '@P33-0.2' });
bt('@P32', 'graphic-hero', ['g32', 'y32'], { move: 'whip', fill: 0.78, sy: 490, pose: 'point' }); sf('@P32-0.3', 'swoosh_2', -11, 0.5); sf('@P32:2019', 'gavel_1', -5, 0.8); sk('@P32:2019', 12);
bt('@P32:18', 'zoom-on-number', 'y32.value', { fill: 0.44, maxH: 420, sy: 480, pose: 'shock' }); sf('@P32:18-0.1', 'cell_door_1', -7, 1.2);
bt('@P32:prison', 'graphic-hero', ['g32', 'y32'], { fill: 0.8, sy: 500, pose: 'chin' });
// P33 LIKE micro-moment
el('heart', 'heart', 1620, 760, '@P33:hit-0.15', { s: 64 }, { layer: 'screen', out: '@P33:hit+1.5' });
sf('@P33:hit-0.1', 'pop_2', -8, 0.3); sf('@P33:hit+0.35', 'ding_2', -11, 0.7);
el('lk33', 'stamp', R2(12), 40, '@P33-0.3', { text: 'TRUE STORIES · REAL NUMBERS', tone: 'good', size: 96 }, { rot: -0.03, out: '@P34-0.2' });
bt('@P33', 'graphic-hero', 'lk33', { move: 'whip', fill: 0.7, maxH: 500, sx: 860, sy: 480, st: 'corner', pose: 'you' }); po('@P33:hit', 'you'); sf('@P33-0.3', 'swoosh_2', -11, 0.5);
bt('@P33:true', 'zoom-on-number', 'lk33', { fill: 0.72, maxH: 300, sx: 860, sy: 440, st: 'corner', pose: 'point' });
// ---------------- CH3 · THE LOTTERY'S OWN SECURITY GUY (P34-P47) — lottery gold-navy room, Tipton (illustration) ----------------
const R3 = k => K(RM[3], k);
el('ch3', 'headline', R3(0) - 360, 40, '@P34-0.3', { kicker: 'CHAPTER THREE', lines: ['THE LOTTERY\'S OWN', [['SECURITY ', 'paper'], ['GUY', 'accent']]], size: 112, underAt: 1.0 }, { out: '@P35-0.2' });
con('t1', 'tip', R3(0) + 640, 50, '@P34-0.2', { w: 440, variant: 'card', file: true, caseNo: 'CASE Nº 3', push: { at: '@P34', to: 1.12, dur: 4 } }, { out: '@P35-0.2' });
bt('@P34', 'graphic-hero', ['ch3', 't1'], { move: 'whip', dur0: 0.7, fill: 0.82, sy: 480, pose: 'shrug', arc: 0.2 }); sf('@P34-0.6', 'tape_stop_1', -8, 1.0); sf('@P34-0.1', 'cinematic_hit_1', -9, 1.5); sf('@P34+0.9', 'camera_flash_1', -9, 0.6); sk('@P34+0.7', 8);
bt('@P34:security', 'zoom-on-number', 't1', { fill: 0.3, maxH: 760, sy: 520, pose: 'point' });
// P35 millions trust the numbers are random
for (let i = 0; i < 6; i++) el('tk35' + i, 'icon', R3(1) - 700 + i * 280, 20 + (i % 2) * 40, `@P35+${(0.3 + i * 0.4).toFixed(2)}`, { kind: 'ticket', s: 200, col: 'paper' }, { out: '@P36-0.2' });
el('rn35', 'stamp', R3(1), 300, '@P35:random-0.2', { text: 'ARE THEY RANDOM?', tone: 'accent', size: 100 }, { rot: -0.04, out: '@P36-0.2' });
bt('@P35', 'graphic-hero', 'tk352', { move: 'whip', fill: 0.5, sy: 480, pose: 'point' }); sf('@P35-0.3', 'swoosh_2', -11, 0.5);
bt('@P35:millions', 'graphic-hero', ['tk350', 'tk355'], { fill: 0.82, sy: 480, pose: 'point' }); for (let i = 0; i < 6; i++) sf(`@P35+${(0.3 + i * 0.4).toFixed(2)}`, 'pop_2', -12, 0.3);
bt('@P35:random', 'zoom-on-number', 'rn35', { fill: 0.5, maxH: 400, sy: 470, pose: 'chin' }); sf('@P35:random', 'rubber_stamp_2', -6, 0.5);
// P36 Iowa computers pick numbers for many states, guarded by one man
el('mp36', 'map', R3(2) - 520, 20, '@P36-0.3', { title: 'LOTTERIES THAT USE THE COMPUTERS', w: 760, h: 560, nodes: [{ id: 'ia', x: 0.5, y: 0.5, label: 'IOWA', sub: 'THE COMPUTERS', at: '@P36:iowa', tone: 'accent', r: 34 }, { id: 'a', x: 0.15, y: 0.3, label: '', at: '@P36:many', r: 16 }, { id: 'b', x: 0.85, y: 0.25, label: '', at: '@P36:many+0.1', r: 16 }, { id: 'c', x: 0.2, y: 0.8, label: '', at: '@P36:many+0.2', r: 16 }, { id: 'd', x: 0.8, y: 0.8, label: '', at: '@P36:many+0.3', r: 16 }], links: [{ from: 'ia', to: 'a', at: '@P36:many' }, { from: 'ia', to: 'b', at: '@P36:many+0.1' }, { from: 'ia', to: 'c', at: '@P36:many+0.2' }, { from: 'ia', to: 'd', at: '@P36:many+0.3' }] }, { out: '@P37-0.2' });
con('t36', 'tip', R3(2) + 520, 40, '@P36:eddie-0.4', { w: 420, variant: 'card', nick: '“INFORMATION SECURITY DIRECTOR”', stamps: [], flash: true, push: { at: '@P36:eddie', to: 1.2, dur: 3 } }, { out: '@P37-0.2' });
bt('@P36', 'graphic-hero', 'mp36', { move: 'whip', fill: 0.42, maxH: 700, sy: 490, pose: 'point' }); sf('@P36-0.3', 'swoosh_2', -11, 0.5); sf('@P36:iowa', 'pop_2', -8, 0.4);
bt('@P36:many', 'graphic-hero', 'mp36', { fill: 0.44, maxH: 700, sy: 490 }); bt('@P36:eddie', 'graphic-hero', ['mp36', 't36'], { fill: 0.82, sy: 490, pose: 'point' }); sf('@P36:eddie', 'camera_flash_1', -9, 0.6);
bt('@P36:director', 'zoom-on-number', 't36', { fill: 0.3, maxH: 760, sy: 520, pose: 'shock' });
// P37 he helped write the software; trick step 1
con('t37', 'tip', R3(3) - 700, 380, '@P37-0.2', { w: 250, variant: 'pip', label: 'HE WROTE IT', flash: false, arrow: { at: '@P37:write', to: [250, -250] } }, { out: '@P38-0.2' });
el('cd37', 'card', R3(3) + 40, 20, '@P37-0.3', { w: 1000, h: 520, fill: 'navy', lines: [{ t: 'LOTTERY SOFTWARE', size: 40, font: 'mono', tone: 'gold', at: '@P37-0.1' }, { t: '{ pick numbers }', size: 120, tone: 'paper', at: '@P37:software', gap: 60 }, { t: 'STEP 1 · HE HELPED WRITE IT', size: 38, font: 'mono', tone: 'good', at: '@P37:helped' }] }, { out: '@P38-0.2' });
bt('@P37', 'graphic-hero', ['t37', 'cd37'], { move: 'whip', fill: 0.78, sy: 500, pose: 'point' }); sf('@P37-0.3', 'swoosh_2', -11, 0.5); sf('@P37:software', 'typewriter_2', -11, 1.4);
bt('@P37:software', 'zoom-on-number', 'cd37', { fill: 0.5, maxH: 520, sy: 500 }); bt('@P37:write', 'graphic-hero', ['t37', 'cd37'], { fill: 0.78, sy: 500, pose: 'point' });
// P38 trick: hid extra code; a few dates a year the numbers were predictable
el('cd38', 'card', R3(4) - 700, 40, '@P38:hid-0.2', { w: 560, h: 420, fill: 'navy', lines: [{ t: 'STEP 2', size: 44, font: 'mono', tone: 'good', at: '@P38:hid-0.1' }, { t: 'HIDDEN CODE', size: 90, tone: 'bad', at: '@P38:hid', gap: 40 }, { t: 'EXTRA LINES, NOBODY SEES', size: 26, font: 'mono', tone: 'paper', at: '@P38:code' }] }, { out: '@P39-0.2' });
el('cal38', 'calendar', R3(4) + 20, 40, '@P38:dates-0.3', { head: 'A FEW DATES A YEAR', pages: [{ at: '@P38:dates', text: 'JAN' }, { at: '@P38:dates+0.5', text: 'JUL', tone: 'bad' }, { at: '@P38:specific+0.3', text: 'DEC', tone: 'bad' }], size: 140, w: 600 }, { out: '@P39-0.2' });
for (let i = 0; i < 6; i++) el('bl38' + i, 'tile', R3(4) + 800 + (i % 3) * 190, -120 + Math.floor(i / 3) * 230, `@P38:predict+${(i * 0.1).toFixed(1)}`, { icon: 'labels', caption: '', w: 170, h: 190, iconS: 70 }, { out: '@P39-0.2' });
el('pd38', 'stamp', R3(4) + 980, 280, '@P38:predict+0.7', { text: 'HE CAN PREDICT', tone: 'bad', size: 52 }, { rot: -0.05, out: '@P39-0.2' });
bt('@P38', 'graphic-hero', 'cd38', { move: 'whip', fill: 0.34, maxH: 560, sy: 500, pose: 'point' }); sf('@P38-0.3', 'swoosh_2', -11, 0.5); sf('@P38:hid', 'pop_2', -8, 0.4);
bt('@P38:dates', 'graphic-hero', ['cd38', 'cal38'], { fill: 0.64, sy: 500, pose: 'point' }); sf('@P38:dates', 'paper_slam_2', -11, 0.5);
bt('@P38:predict', 'graphic-hero', ['cal38', 'bl380', 'pd38'], { fill: 0.7, sy: 500, pose: 'shock' }); sf('@P38:predict+0.7', 'rubber_stamp_2', -6, 0.5); sk('@P38:predict+0.7', 10);
// P39 workers can't play; he passed numbers to his brother and a friend who bought tickets
con('t39', 'tip', R3(5) - 760, 40, '@P39-0.3', { w: 300, variant: 'pip', label: 'THE TRICK', flash: false }, { out: '@P40-0.2' });
el('fl39', 'flow', R3(5) + 220, 80, '@P39:passed-0.3', { w: 1280, h: 360, items: [{ label: 'NUMBERS', icon: 'doc', at: '@P39:passed' }, { label: 'BROTHER + FRIEND', icon: 'pair', at: '@P39:brother' }, { label: 'TICKET', icon: 'ticket', at: '@P39:bought' }, { label: 'WIN', icon: 'dollar', at: '@P39:collected', tone: 'good' }] }, { out: '@P40-0.2' });
el('np39', 'stamp', R3(5) - 280, -300, '@P39:aren\'t-0.1', { text: 'WORKERS CAN\'T PLAY', tone: 'bad', size: 74 }, { rot: -0.04, out: '@P40-0.2' });
bt('@P39', 'graphic-hero', ['np39', 't39'], { move: 'whip', fill: 0.62, sy: 480, pose: 'point' }); sf('@P39-0.3', 'swoosh_2', -11, 0.5); sf('@P39:aren\'t', 'rubber_stamp_2', -6, 0.5);
bt('@P39:passed', 'graphic-hero', 'fl39', { fill: 0.72, maxH: 460, sy: 500, pose: 'point' }); sf('@P39:passed', 'pop_2', -8, 0.3); sf('@P39:brother', 'pop_2', -8, 0.3); sf('@P39:bought', 'pop_2', -8, 0.3); sf('@P39:collected', 'cash_register_1', -9, 0.9);
bt('@P39:collected', 'zoom-on-number', 'fl39', { fill: 0.5, maxH: 420, sy: 500, pose: 'shock' });
// P40 Colorado, Wisconsin, Oklahoma — $2.5M+
el('mp40', 'map', R3(6) - 380, 30, '@P40-0.3', { title: 'THE SMALLER WINS', w: 840, h: 560, nodes: [{ id: 'co', x: 0.25, y: 0.45, label: 'COLORADO', at: '@P40:colorado', tone: 'accent', r: 26 }, { id: 'wi', x: 0.72, y: 0.22, label: 'WISCONSIN', at: '@P40:wisconsin', tone: 'accent', r: 26 }, { id: 'ok', x: 0.5, y: 0.78, label: 'OKLAHOMA', at: '@P40:oklahoma', tone: 'accent', r: 26 }], links: [] }, { out: '@P41-0.2' });
el('c40', 'counter', R3(6) + 520, 20, '@P40:wins-0.2', { label: 'WINS, COMBINED', sub: 'MORE THAN', to: 2500000, prefix: '$', at: '@P40:two', dur: 1.2, tone: 'good', size: 130, w: 760 }, { out: '@P41-0.2' });
bt('@P40', 'graphic-hero', 'mp40', { move: 'whip', fill: 0.42, maxH: 700, sy: 490, pose: 'point' }); sf('@P40-0.3', 'swoosh_2', -11, 0.5);
for (const w of ['colorado', 'wisconsin', 'oklahoma']) sf(`@P40:${w}`, 'pop_2', -8, 0.3);
bt('@P40:wins', 'graphic-hero', ['mp40', 'c40'], { fill: 0.86, sy: 490, pose: 'point' }); bt('@P40:two', 'zoom-on-number', 'c40.value', { fill: 0.42, maxH: 400, sy: 500, pose: 'shock' }); sf('@P40:two', 'money_counter_2', -11, 1.3);
// P41 Dec 29 2010, Des Moines gas station ticket, $16.5M jackpot
el('dc41', 'datecard', R3(7) - 300, -330, '@P41-0.2', { big: 'DEC 29, 2010', small: 'DES MOINES, IOWA', w: 640 }, { out: '@P42-0.2' });
el('lt41', 'lotto', R3(7) - 150, 40, '@P41-0.3', { w: 800, h: 460, amount: '$16.5 MILLION', ballsAt: '@P41:ticket', per: 0.2 }, { out: '@P43-0.2' });
con('t41', 'tip', R3(7) + 640, 40, '@P41:hits-0.2', { w: 260, variant: 'pip', label: 'THE BIG ONE', flash: false }, { out: '@P43-0.2' });
bt('@P41', 'graphic-hero', ['lt41', 'dc41', 't41'], { move: 'whip', fill: 0.62, maxH: 860, sy: 500, pose: 'point' }); sf('@P41-0.3', 'swoosh_2', -11, 0.5); sf('@P41:bought', 'pop_2', -8, 0.4);
bt('@P41:16', 'zoom-on-number', 'lt41.amount', { fill: 0.42, maxH: 420, sy: 440, pose: 'shock' }); sf('@P41:16', 'money_counter_2', -11, 1.3); sf('@P41:hits', 'cash_register_1', -8, 0.9); sk('@P41:hits', 10);
// P42 to claim, someone has to show their face
el('sl42', 'silh', R3(8) - 380, 40, '@P42-0.3', { name: 'SHOW YOUR FACE', role: 'TO CLAIM THE PRIZE', hat: 'none', tone: 'navy', tag: 'WHO?' }, { out: '@P43-0.2' });
el('q42', 'text', R3(8) + 360, 40, '@P42:problem-0.1', { lines: [[['ONE ', 'paper'], ['PROBLEM', 'bad']]], size: 150 }, { enter: 'slam', out: '@P43-0.2' });
bt('@P42', 'graphic-hero', 'sl42', { move: 'whip', fill: 0.26, maxH: 700, sy: 500, pose: 'chin' }); sf('@P42-0.3', 'swoosh_2', -11, 0.5);
bt('@P42:problem', 'graphic-hero', ['sl42', 'q42'], { fill: 0.74, sy: 490, pose: 'shock' }); sf('@P42:problem', 'rubber_stamp_2', -5, 0.5); sk('@P42:problem', 10); bt('@P42:face', 'zoom-on-number', 'sl42', { fill: 0.28, maxH: 700, sy: 500, pose: 'point' }); sf('@P42:face', 'camera_flash_1', -9, 0.6);
// P43 nobody for a year; two hours before the deadline, lawyers for a Belize trust
el('cal43', 'calendar', R3(9) - 640, 40, '@P43-0.3', { head: 'MONTHS WITH NO CLAIM', roll: { from: 0, to: 12, at: '@P43:year', dur: 2.2 }, sub: 'NOBODY CAME FORWARD', subAt: '@P43:year+1.5', size: 190, w: 620 }, { out: '@P44-0.2' });
el('ck43', 'counter', R3(9) + 110, -120, '@P43:two-0.3', { label: 'BEFORE THE DEADLINE', to: 2, suffix: ' HOURS', prefix: '< ', at: '@P43:two', dur: 0.5, tone: 'bad', size: 130, w: 640 }, { out: '@P44-0.2' });
el('bz43', 'card', R3(9) + 110, 210, '@P43:lawyers-0.1', { w: 640, h: 220, fill: 'navy', lines: [{ t: 'MYSTERY TRUST', size: 62, tone: 'gold', at: '@P43:lawyers' }, { t: 'BELIZE', size: 52, tone: 'paper', at: '@P43:belize' }] }, { out: '@P44-0.2' });
bt('@P43', 'graphic-hero', 'cal43', { move: 'whip', fill: 0.4, maxH: 700, sy: 490, pose: 'chin' }); sf('@P43-0.3', 'swoosh_2', -11, 0.5); sf('@P43:year', 'money_counter_1', -13, 2.0);
bt('@P43:two', 'graphic-hero', ['cal43', 'ck43', 'bz43'], { fill: 0.8, sy: 490, pose: 'point' }); bt('@P43:two', 'zoom-on-number', 'ck43.value', { fill: 0.28, maxH: 340, sy: 460, pose: 'shock' }); sf('@P43:two', 'clock_ticking_1', -8, 1.5); sf('@P43:lawyers', 'paper_slam_2', -10, 0.5); sf('@P43:belize', 'pop_2', -8, 0.4);
// P44 lottery refused to pay until it knew who really bought it
el('rf44', 'stamp', R3(10) - 100, 40, '@P44:refused-0.1', { text: 'NO PAYOUT UNTIL WE KNOW WHO', tone: 'bad', size: 84 }, { rot: -0.04, out: '@P45-0.2' });
el('mg44', 'icon', R3(10) - 100, -300, '@P44:who-0.3', { kind: 'magnifier', s: 220, col: 'paper' }, { out: '@P45-0.2' });
bt('@P44', 'graphic-hero', 'rf44', { move: 'whip', fill: 0.78, maxH: 480, sy: 500, pose: 'point' }); sf('@P44-0.3', 'swoosh_2', -11, 0.5); sf('@P44:refused', 'rubber_stamp_2', -5, 0.5); sk('@P44:refused', 10);
bt('@P44:who', 'graphic-hero', ['rf44', 'mg44'], { fill: 0.74, sy: 480, pose: 'shock' });
// P45 store security video; his co-workers recognize his voice; red ring on Tipton
el('vd45', 'card', R3(11) - 700, 40, '@P45-0.3', { w: 620, h: 400, fill: 'navy', lines: [{ t: 'SECURITY VIDEO', size: 50, font: 'mono', tone: 'gold', at: '@P45:video-0.2' }, { t: 'STORE · 12/29/2010', size: 34, font: 'mono', tone: 'paper', at: '@P45:video' }, { t: '● REC', size: 80, tone: 'bad', at: '@P45:video', gap: 36 }] }, { out: '@P46-0.2' });
el('vc45', 'text', R3(11) + 60, -150, '@P45:voice-0.3', { lines: [[['“THAT\'S HIS ', 'paper'], ['VOICE', 'bad'], ['”', 'paper']]], size: 80 }, { out: '@P46-0.2' });
con('t45', 'tip', R3(11) + 560, 160, '@P45:voice-0.1', { w: 400, variant: 'card', ring: '@P45:director', flash: false, push: { at: '@P45:director', to: 1.3, dur: 3 } }, { out: '@P46-0.2' });
bt('@P45', 'graphic-hero', 'vd45', { move: 'whip', fill: 0.4, maxH: 600, sy: 490, pose: 'point' }); sf('@P45-0.3', 'swoosh_2', -11, 0.5); sf('@P45:video', 'camera_flash_1', -10, 0.6);
bt('@P45:voice', 'graphic-hero', ['vd45', 'vc45', 't45'], { fill: 0.9, sy: 500, pose: 'shock' }); sf('@P45:voice', 'pop_2', -8, 0.4);
bt('@P45:director', 'zoom-on-number', 't45', { fill: 0.3, maxH: 760, sy: 520, pose: 'point' }); sf('@P45:director', 'heartbeat_1', -9, 2); sf('@P45:director', 'rubber_stamp_2', -6, 0.5); sk('@P45:director', 12);
// P46 verdict: pleaded guilty 2017, up to 25 years
con('t46', 'tip', R3(12) - 520, 40, '@P46-0.3', { w: 420, variant: 'card', bars: '@P46:25', stamps: [{ text: 'PLEADED GUILTY 2017', at: '@P46:pleaded', tone: 'bad', size: 44, rot: -0.1, y: 60 }], push: { at: '@P46', to: 1.2, dur: 4 }, flash: false }, { out: '@P47-0.2' });
el('y46', 'counter', R3(12) + 220, 0, '@P46:sentenced-0.2', { label: 'SENTENCED TO', sub: 'UP TO', to: 25, suffix: ' YEARS', at: '@P46:25', dur: 0.9, tone: 'bad', size: 170, w: 940 }, { out: '@P47-0.2' });
bt('@P46', 'graphic-hero', ['t46', 'y46'], { move: 'whip', fill: 0.78, sy: 490, pose: 'point' }); sf('@P46-0.3', 'swoosh_2', -11, 0.5); sf('@P46:pleaded', 'gavel_1', -5, 0.8); sk('@P46:pleaded', 12);
bt('@P46:25', 'zoom-on-number', 'y46.value', { fill: 0.44, maxH: 420, sy: 480, pose: 'shock' }); sf('@P46:25-0.1', 'cell_door_1', -7, 1.2);
bt('@P46:prison', 'graphic-hero', ['t46', 'y46'], { fill: 0.8, sy: 500, pose: 'chin' });
// P47 the jackpot was never collected
el('lt47', 'lotto', R3(13), 40, '@P47-0.3', { w: 840, h: 480, amount: '$16.5 MILLION', ballsAt: -5, grey: true, stamp: 'NEVER COLLECTED', stampAt: '@P47:nobody' }, { out: '@P48-0.2' });
bt('@P47', 'graphic-hero', 'lt47', { move: 'whip', fill: 0.46, maxH: 700, sy: 500, pose: 'point' }); sf('@P47-0.3', 'swoosh_2', -11, 0.5);
bt('@P47:nobody', 'zoom-on-number', 'lt47', { fill: 0.52, maxH: 620, sy: 500, pose: 'shock' }); sf('@P47:nobody', 'rubber_stamp_2', -5, 0.5); sk('@P47:nobody', 12);
// ---------------- CH4 · THE LOAN THAT NEVER ENDED (P48-P59) — payday green room, Tucker (illustration) ----------------
const R4 = k => K(RM[4], k);
el('ch4', 'headline', R4(0) - 360, 40, '@P48-0.3', { kicker: 'CHAPTER FOUR', lines: ['THE LOAN THAT', [['NEVER ', 'paper'], ['ENDED', 'bad']]], size: 118, underAt: 1.0 }, { out: '@P49-0.2' });
con('u1', 'tuc', R4(0) + 640, 50, '@P48-0.2', { w: 440, variant: 'card', file: true, caseNo: 'CASE Nº 4', push: { at: '@P48', to: 1.12, dur: 4 } }, { out: '@P49-0.2' });
bt('@P48', 'graphic-hero', ['ch4', 'u1'], { move: 'whip', dur0: 0.7, fill: 0.82, sy: 480, pose: 'shrug', arc: 0.2 }); sf('@P48-0.6', 'tape_stop_1', -8, 1.0); sf('@P48-0.1', 'cinematic_hit_1', -9, 1.5); sf('@P48+0.9', 'camera_flash_1', -9, 0.6); sk('@P48+0.7', 8);
bt('@P48:loan', 'zoom-on-number', 'u1', { fill: 0.3, maxH: 760, sy: 520, pose: 'point' });
// P49 rent due Friday, paycheck Monday: a payday loan covers the gap
el('rent49', 'card', R4(1) - 620, 40, '@P49:rent-0.2', { w: 520, h: 400, lines: [{ t: 'RENT DUE', size: 48, font: 'mono', tone: 'bad', at: '@P49:rent' }, { t: 'FRIDAY', size: 104, tone: 'bad', at: '@P49:friday', gap: 34 }] }, { out: '@P50-0.2' });
el('pay49', 'card', R4(1) + 620, 40, '@P49:paycheck-0.2', { w: 520, h: 400, lines: [{ t: 'PAYCHECK', size: 48, font: 'mono', tone: 'good', at: '@P49:paycheck' }, { t: 'MONDAY', size: 104, tone: 'good', at: '@P49:monday', gap: 34 }] }, { out: '@P50-0.2' });
el('gap49', 'text', R4(1), 40, '@P49:payday-0.1', { lines: [[['A PAYDAY LOAN', 'gold']], [['COVERS THE GAP', 'paper', 52]]], size: 66 }, { out: '@P50-0.2' });
bt('@P49', 'graphic-hero', 'rent49', { move: 'whip', fill: 0.3, maxH: 560, sy: 500, pose: 'point' }); sf('@P49-0.3', 'swoosh_2', -11, 0.5); sf('@P49:friday', 'paper_slam_2', -10, 0.5);
bt('@P49:paycheck', 'graphic-hero', ['rent49', 'pay49'], { fill: 0.9, sy: 500, pose: 'point' }); sf('@P49:monday', 'paper_slam_2', -10, 0.5); bt('@P49:payday', 'graphic-hero', ['rent49', 'pay49', 'gap49'], { fill: 0.9, sy: 500, pose: 'chin' }); sf('@P49:payday', 'pop_2', -8, 0.4);
bt('@P49:borrow', 'zoom-on-number', 'gap49', { fill: 0.4, maxH: 300, sy: 460, pose: 'point' });
// P50 the pitch: borrow $500, pay back $650
con('u2', 'tuc', R4(2) - 640, 40, '@P50-0.3', { w: 440, variant: 'card', flash: false }, { out: '@P52-0.2' });
el('b500', 'counter', R4(2) + 160, -140, '@P50:$500-0.2', { label: 'BORROW', to: 500, prefix: '$', at: '@P50:$500', dur: 0.8, tone: 'good', size: 150, w: 640 }, { out: '@P52-0.2' });
el('p650', 'counter', R4(2) + 160, 190, '@P50:pay-0.2', { label: 'PAY BACK', to: 650, prefix: '$', at: '@P50:$650', dur: 0.8, tone: 'bad', size: 150, w: 640 }, { out: '@P52-0.2' });
el('pw50', 'text', R4(2) + 700, 20, '@P50:paperwork-0.1', { lines: [[['THE PAPERWORK', 'paper']], [['SAID SO', 'gold']]], size: 54 }, { out: '@P51-0.2' });
bt('@P50', 'graphic-hero', ['u2', 'b500'], { move: 'whip', fill: 0.72, sy: 490, pose: 'point' }); sf('@P50-0.3', 'swoosh_2', -11, 0.5);
bt('@P50:$500', 'zoom-on-number', 'b500.value', { fill: 0.4, maxH: 400, sy: 480 }); sf('@P50:$500', 'money_counter_2', -12, 1.0); bt('@P50:$650', 'zoom-on-number', 'p650.value', { fill: 0.4, maxH: 400, sy: 520, pose: 'point' }); sf('@P50:$650', 'money_counter_2', -12, 1.0);
bt('@P50:paperwork', 'graphic-hero', ['b500', 'p650', 'pw50'], { fill: 0.7, sx: 1000, sy: 500 });
// P51 expensive but clear — except that's not what happened
el('ec51', 'stamp', R4(3) - 380, -120, '@P51:expensive-0.1', { text: 'EXPENSIVE, BUT CLEAR', tone: 'good', size: 96 }, { rot: -0.04, out: '@P51:except-0.1' });
el('ex51', 'stamp', R4(3) + 20, 90, '@P51:except-0.05', { text: 'EXCEPT…', tone: 'bad', size: 190 }, { rot: -0.05, out: '@P52-0.2' });
bt('@P51', 'graphic-hero', 'ec51', { move: 'whip', fill: 0.6, maxH: 400, sy: 500, pose: 'shrug' }); sf('@P51-0.3', 'swoosh_2', -11, 0.5); sf('@P51:expensive', 'rubber_stamp_2', -6, 0.5);
bt('@P51:except', 'zoom-on-number', 'ex51', { fill: 0.62, maxH: 460, sy: 480, pose: 'shock' }); sf('@P51:except', 'rubber_stamp_2', -4, 0.5); sk('@P51:except', 12); sf('@P51:except', 'wrong_buzzer_2', -11, 0.6);
// P52 the trick: auto-renew every payday, $150 fee each time, the $500 never goes down
el('pd52', 'paydays', R4(4), 40, '@P52-0.3', { w: 1560, h: 660, n: 5, at: '@P52:renewed', per: 0.9, fee: 150, owed: 500 }, { out: '@P53-0.2' });
con('u52', 'tuc', R4(4) + 1000, 400, '@P52:company-0.1', { w: 240, variant: 'pip', label: 'THE TRICK', flash: false }, { out: '@P53-0.2' });
bt('@P52', 'graphic-hero', 'pd52', { move: 'whip', fill: 0.78, maxH: 760, sy: 500, pose: 'point' }); sf('@P52-0.3', 'swoosh_2', -11, 0.5);
for (let i = 0; i < 5; i++) sf(`@P52:renewed+${(i * 0.9).toFixed(1)}`, 'cash_register_1', -10, 0.8);
bt('@P52:took', 'zoom-on-number', 'pd52.paid', { fill: 0.24, maxH: 500, sy: 540, pose: 'shock' }); bt('@P52:$500', 'zoom-on-number', 'pd52.owed', { fill: 0.24, maxH: 500, sy: 540, pose: 'point' }); sf('@P52:$500', 'wrong_buzzer_2', -11, 0.6);
bt('@P52:down', 'graphic-hero', 'pd52', { fill: 0.78, maxH: 760, sy: 500, pose: 'shock' });
// P53 DOJ borrower paid $1,925 on a $500 loan
el('c53', 'counter', R4(5) + 100, -80, '@P53-0.3', { label: 'ONE BORROWER PAID', sub: 'ON A $500 LOAN', to: 1925, prefix: '$', at: '@P53:$1', dur: 1.4, tone: 'bad', size: 210, w: 1000 }, { out: '@P54-0.2' });
con('u53', 'tuc', R4(5) - 700, 80, '@P53-0.2', { w: 320, variant: 'pip', label: 'DOJ SAYS', flash: false, arrow: { at: '@P53:$1', to: [260, -60] } }, { out: '@P54-0.2' });
bt('@P53', 'graphic-hero', ['c53', 'u53'], { move: 'whip', fill: 0.78, sy: 490, pose: 'point' }); sf('@P53-0.3', 'swoosh_2', -11, 0.5);
bt('@P53:$1', 'zoom-on-number', 'c53.value', { fill: 0.56, maxH: 480, sy: 500, pose: 'shock' }); sf('@P53:$1', 'money_counter_1', -12, 1.5); sf('@P53:loan', 'deep_boom_1', -6, 1.0); sk('@P53:loan', 12);
// P54 ~700% a year vs credit card 22%
el('bar54', 'bars', R4(6), 0, '@P54-0.3', { items: [{ id: 'cc', label: 'CREDIT CARD', value: 22, show: 22, display: { suffix: '%' }, tone: 'accent', at: '@P54:credit' }, { id: 'pd', label: 'THIS LOAN', value: 700, show: 700, display: { suffix: '%' }, tone: 'bad', at: '@P54:700', style: 'cash' }], max: 700, h: 640, barW: 260, gap: 260, note: 'APR · PER YEAR' }, { out: '@P55-0.2' });
bt('@P54', 'graphic-hero', 'bar54', { move: 'whip', fill: 0.52, maxH: 800, sy: 500, pose: 'point' }); sf('@P54-0.3', 'swoosh_2', -11, 0.5);
bt('@P54:700', 'zoom-on-number', 'bar54.pd_top', { fill: 0.3, maxH: 460, sy: 420, pose: 'shock' }); sf('@P54:700', 'money_counter_2', -11, 1.2); sk('@P54:700+0.6', 10);
bt('@P54:credit', 'graphic-hero', 'bar54', { fill: 0.5, maxH: 800, sy: 500, pose: 'point' }); bt('@P54:22', 'zoom-on-number', 'bar54.cc_base', { fill: 0.3, maxH: 420, sy: 560, pose: 'point' }); sf('@P54:22', 'pop_2', -8, 0.4);
// P55 4.5M borrowers, $3.5B
el('c55a', 'counter', R4(7) - 400, 0, '@P55-0.3', { label: 'AT LEAST', sub: 'PEOPLE BORROWED', to: 4500000, at: '@P55:four', dur: 1.3, tone: 'paper', size: 150, w: 800 }, { out: '@P56-0.2' });
el('c55b', 'counter', R4(7) + 520, 0, '@P55:brought-0.3', { label: 'THE BUSINESS BROUGHT IN', sub: 'MORE THAN', to: 3500000000, prefix: '$', at: '@P55:$3', dur: 1.5, tone: 'bad', size: 120, w: 920 }, { out: '@P56-0.2' });
bt('@P55', 'graphic-hero', 'c55a', { move: 'whip', fill: 0.42, maxH: 600, sy: 490, pose: 'point' }); sf('@P55-0.3', 'swoosh_2', -11, 0.5);
bt('@P55:four', 'zoom-on-number', 'c55a.value', { fill: 0.38, maxH: 420, sy: 480 }); sf('@P55:four', 'money_counter_2', -11, 1.3); bt('@P55:$3', 'zoom-on-number', 'c55b.value', { fill: 0.46, maxH: 400, sy: 500, pose: 'shock' }); sf('@P55:$3', 'money_counter_1', -11, 1.5); sf('@P55:billion+0.2', 'cash_register_1', -9, 0.9); sk('@P55:billion+0.2', 12);
bt('@P55:business', 'graphic-hero', ['c55a', 'c55b'], { fill: 0.86, sy: 490, pose: 'chin' });
// P56 some money went into his own pro race car team
el('car56', 'car', R4(8) - 160, 40, '@P56-0.3', { w: 760, plate: 'GENERIC', color: '#2F5DA8' }, { out: '@P57-0.2' });
el('tm56', 'stamp', R4(8) + 560, -230, '@P56:race-0.1', { text: 'HIS OWN RACING TEAM', tone: 'bad', size: 70 }, { rot: -0.05, out: '@P57-0.2' });
con('u56', 'tuc', R4(8) - 760, 300, '@P56:money-0.1', { w: 240, variant: 'pip', label: 'HIS TEAM', flash: false, arrow: { at: '@P56:race', to: [300, -100] } }, { out: '@P57-0.2' });
bt('@P56', 'graphic-hero', 'car56', { move: 'whip', fill: 0.48, maxH: 560, sy: 500, pose: 'point' }); sf('@P56-0.3', 'swoosh_2', -11, 0.5);
bt('@P56:race', 'graphic-hero', ['car56', 'tm56', 'u56'], { fill: 0.84, sy: 500, pose: 'shock' }); sf('@P56:race', 'rubber_stamp_2', -5, 0.5); sk('@P56:race', 10);
// P57 claimed tribes owned it, because states can't sue tribes; prosecutors: a sham
el('tr57', 'card', R4(9) - 440, 40, '@P57:tribes-0.3', { w: 600, h: 440, fill: 'navy', lines: [{ t: '“TRIBES OWN IT”', size: 64, tone: 'gold', at: '@P57:tribes' }, { t: 'BECAUSE STATES', size: 38, tone: 'paper', at: '@P57:because' }, { t: 'CAN\'T SUE TRIBES', size: 52, tone: 'paper', at: '@P57:sue' }] }, { out: '@P58-0.2' });
el('sh57', 'stamp', R4(9) + 420, 40, '@P57:sham-0.1', { text: 'A SHAM', tone: 'bad', size: 190 }, { rot: -0.07, out: '@P58-0.2' });
el('pr57', 'text', R4(9) + 420, 300, '@P57:prosecutors-0.1', { lines: [[['PROSECUTORS CALLED IT', 'paper']]], size: 44 }, { out: '@P58-0.2' });
bt('@P57', 'graphic-hero', 'tr57', { move: 'whip', fill: 0.34, maxH: 620, sy: 500, pose: 'point' }); sf('@P57-0.3', 'swoosh_2', -11, 0.5);
bt('@P57:tribes', 'zoom-on-number', 'tr57', { fill: 0.34, maxH: 620, sy: 500 }); sf('@P57:tribes', 'pop_2', -8, 0.4); sf('@P57:sue', 'paper_slam_2', -10, 0.5);
bt('@P57:sham', 'graphic-hero', ['tr57', 'sh57', 'pr57'], { fill: 0.86, sy: 480, pose: 'shock' }); sf('@P57:sham', 'rubber_stamp_2', -4, 0.5); sk('@P57:sham', 12);
// P58 verdict: 14 counts, 200 months (16+ years)
con('u58', 'tuc', R4(10) - 520, 40, '@P58-0.3', { w: 420, variant: 'card', bars: '@P58:200', stamps: [{ text: 'GUILTY · ALL 14', at: '@P58:jury', tone: 'bad', size: 52, rot: -0.1, y: 60 }], push: { at: '@P58', to: 1.2, dur: 4 }, flash: false }, { out: '@P59-0.2' });
el('y58', 'counter', R4(10) + 220, -130, '@P58:sentenced-0.2', { label: 'SENTENCED TO', sub: 'MONTHS IN PRISON', to: 200, at: '@P58:200', dur: 1.1, tone: 'bad', size: 170, w: 940 }, { out: '@P59-0.2' });
el('x58', 'text', R4(10) + 220, 210, '@P58:more-0.1', { lines: [[['MORE THAN ', 'paper'], ['16 YEARS', 'bad']]], size: 90 }, { out: '@P59-0.2' });
bt('@P58', 'graphic-hero', ['u58', 'y58'], { move: 'whip', fill: 0.78, sy: 490, pose: 'point' }); sf('@P58-0.3', 'swoosh_2', -11, 0.5); sf('@P58:jury', 'gavel_1', -5, 0.8); sk('@P58:jury', 12);
bt('@P58:200', 'zoom-on-number', 'y58.value', { fill: 0.44, maxH: 420, sy: 480, pose: 'shock' }); sf('@P58:200-0.1', 'cell_door_1', -7, 1.2); bt('@P58:more', 'graphic-hero', ['u58', 'y58', 'x58'], { fill: 0.84, sy: 500, pose: 'chin' });
// P59 SEND micro-moment: plane
el('plane', 'plane', 1690, 930, '@P59:send-0.05', { dx: 190, dy: -330 }, { layer: 'screen', out: '@P59:send+1.5' });
sf('@P59:send-0.05', 'swoosh_2', -9, 1.0);
el('sd59', 'stamp', R4(11), 40, '@P59-0.3', { text: 'SEND THIS CHAPTER', tone: 'accent', size: 96 }, { rot: -0.03, out: '@P60-0.2' });
bt('@P59', 'graphic-hero', 'sd59', { move: 'whip', fill: 0.7, maxH: 500, sx: 860, sy: 480, st: 'corner', pose: 'you' }); po('@P59:send', 'you'); sf('@P59-0.3', 'swoosh_2', -11, 0.5);
bt('@P59:someone', 'zoom-on-number', 'sd59', { fill: 0.74, maxH: 300, sx: 860, sy: 440, st: 'corner', pose: 'point' });
// ---------------- CH5 · FOUR MILLION PEOPLE WHO NEVER EXISTED (P60-P70) — founder purple room, Javice (illustration) ----------------
const R5 = k => K(RM[5], k);
el('ch5', 'headline', R5(0) - 360, 40, '@P60-0.3', { kicker: 'CHAPTER FIVE', lines: ['4 MILLION PEOPLE', [['WHO NEVER ', 'paper'], ['EXISTED', 'bad']]], size: 112, underAt: 1.0 }, { out: '@P61-0.2' });
con('j1', 'jav', R5(0) + 640, 50, '@P60-0.2', { w: 440, variant: 'card', file: true, caseNo: 'CASE Nº 5', push: { at: '@P60', to: 1.12, dur: 4 } }, { out: '@P61-0.2' });
bt('@P60', 'graphic-hero', ['ch5', 'j1'], { move: 'whip', dur0: 0.7, fill: 0.82, sy: 480, pose: 'shrug', arc: 0.2 }); sf('@P60-0.6', 'tape_stop_1', -8, 1.0); sf('@P60-0.1', 'cinematic_hit_1', -9, 1.5); sf('@P60+0.9', 'camera_flash_1', -9, 0.6); sk('@P60+0.7', 8);
bt('@P60:million', 'zoom-on-number', 'j1', { fill: 0.3, maxH: 760, sy: 520, pose: 'point' });
// P61 the pitch: Frank, a website that helped students fill out the federal aid form
con('j2', 'jav', R5(1) - 640, 40, '@P61-0.3', { w: 440, variant: 'card', flash: false }, { out: '@P62-0.2' });
el('fr61', 'card', R5(1) + 300, 40, '@P61:website-0.2', { w: 820, h: 480, fill: 'navy', lines: [{ t: 'FRANK', size: 150, tone: 'gold', at: '@P61:website' }, { t: 'HELPS STUDENTS FILL OUT', size: 40, font: 'mono', tone: 'paper', at: '@P61:fill' }, { t: 'THE FEDERAL COLLEGE AID FORM', size: 40, font: 'mono', tone: 'paper', at: '@P61:federal' }] }, { out: '@P62-0.2' });
bt('@P61', 'graphic-hero', ['j2', 'fr61'], { move: 'whip', fill: 0.76, sy: 490, pose: 'point' }); sf('@P61-0.3', 'swoosh_2', -11, 0.5);
bt('@P61:website', 'zoom-on-number', 'fr61', { fill: 0.44, maxH: 560, sy: 500 }); sf('@P61:website', 'pop_2', -8, 0.4); sf('@P61:fill', 'typewriter_2', -11, 1.6);
// P62 by 2021 banks wanted to buy; she claimed 4.25M users
el('c62', 'counter', R5(2) + 200, -40, '@P62:users-0.3', { label: 'SHE TOLD THE BANKS', sub: 'FRANK HAD THIS MANY USERS', to: 4250000, at: '@P62:four', dur: 1.5, tone: 'good', size: 190, w: 1080 }, { out: '@P63-0.2' });
el('bk62', 'icon', R5(2) - 680, 20, '@P62-0.3', { kind: 'building', s: 330, col: 'paper' }, { out: '@P63-0.2' });
con('j62', 'jav', R5(2) - 680, 380, '@P62:she-0.1', { w: 230, variant: 'pip', label: 'HER CLAIM', flash: false }, { out: '@P63-0.2' });
bt('@P62', 'graphic-hero', ['bk62', 'c62'], { move: 'whip', fill: 0.8, sy: 490, pose: 'point' }); sf('@P62-0.3', 'swoosh_2', -11, 0.5);
bt('@P62:four', 'zoom-on-number', 'c62.value', { fill: 0.56, maxH: 460, sy: 480, pose: 'shock' }); sf('@P62:four', 'money_counter_2', -11, 1.5); sf('@P62:users', 'pop_2', -8, 0.4);
// P63 SEC: real number was fewer than 300,000 (true scale bars)
el('bar63', 'bars', R5(3), 0, '@P63-0.3', { items: [{ id: 'cl', label: 'SHE CLAIMED', value: 4250000, show: 4250000, tone: 'good', at: '@P63:sec' }, { id: 'rl', label: 'THE REAL NUMBER', sub: 'SEC SAYS', value: 300000, show: 300000, display: { prefix: '< ' }, tone: 'bad', at: '@P63:fewer' }], max: 4250000, h: 640, barW: 260, gap: 260, note: 'USERS · TRUE SCALE' }, { out: '@P64-0.2' });
el('x14', 'stamp', R5(3) + 640, -240, '@P63:300+0.4', { text: '14× TOO MANY', tone: 'bad', size: 74 }, { rot: -0.06, out: '@P64-0.2' });
bt('@P63', 'graphic-hero', 'bar63', { move: 'whip', fill: 0.5, maxH: 800, sy: 500, pose: 'point' }); sf('@P63-0.3', 'swoosh_2', -11, 0.5);
bt('@P63:fewer', 'zoom-on-number', 'bar63.rl_top', { fill: 0.34, maxH: 460, sy: 450, pose: 'shock' }); sf('@P63:fewer', 'money_counter_2', -11, 1.2); sk('@P63:fewer+0.8', 12); bt('@P63:300', 'graphic-hero', ['bar63', 'x14'], { fill: 0.7, sy: 500, pose: 'point' }); sf('@P63:300+0.4', 'rubber_stamp_2', -5, 0.5);
// P64 JPMorgan asked to see the customer list
el('bk64', 'icon', R5(4) - 560, 20, '@P64-0.3', { kind: 'building', s: 360, col: 'paper' }, { out: '@P65-0.2' });
el('bt64', 'badge', R5(4) - 560, 250, '@P64:morgan-0.1', { text: 'THE BANK', tone: 'navy', size: 52 }, { out: '@P65-0.2' });
el('dc64', 'doc', R5(4) + 380, 20, '@P64:customer-0.3', { w: 560, h: 620, title: 'CUSTOMER LIST', sub: 'SHOW US THE PEOPLE', skeleton: true, lines: [] }, { out: '@P65-0.2' });
bt('@P64', 'graphic-hero', ['bk64', 'bt64'], { move: 'whip', fill: 0.4, maxH: 640, sy: 490, pose: 'point' }); sf('@P64-0.3', 'swoosh_2', -11, 0.5);
bt('@P64:asked', 'graphic-hero', ['bk64', 'dc64'], { fill: 0.82, sy: 500, pose: 'point' }); sf('@P64:customer-0.3', 'paper_slam_2', -10, 0.5); bt('@P64:customer', 'zoom-on-number', 'dc64', { fill: 0.3, maxH: 640, sy: 500, pose: 'chin' });
// P65 you can't hand over four million people you don't have
el('nm65', 'text', R5(5) - 380, -200, '@P65:four-0.2', { lines: [[['4,000,000 PEOPLE', 'paper']], [['NEEDED', 'gold', 64]]], size: 96 }, { out: '@P66-0.2' });
el('dg65', 'dotgrid', R5(5) + 330, 40, '@P65:problem-0.3', { cols: 40, rows: 26, gap: 17, at: '@P65:problem', hiAt: 99999, per: 0.9 }, { out: '@P66-0.2' });
el('pb65', 'stamp', R5(5) - 380, 220, '@P65:problem', { text: 'THE PROBLEM', tone: 'bad', size: 104 }, { rot: -0.05, out: '@P66-0.2' });
bt('@P65', 'graphic-hero', ['nm65'], { move: 'whip', fill: 0.5, maxH: 520, sy: 480, pose: 'chin' }); sf('@P65-0.3', 'swoosh_2', -11, 0.5);
bt('@P65:problem', 'graphic-hero', ['nm65', 'dg65', 'pb65'], { fill: 0.9, sy: 500, pose: 'shock' }); sf('@P65:problem', 'rubber_stamp_2', -5, 0.5); sk('@P65:problem', 10); bt('@P65:can\'t', 'zoom-on-number', 'pb65', { fill: 0.4, maxH: 300, sy: 460, pose: 'point' });
// P66 she asked her own engineer to create fake data; he refused
el('en66', 'victim', R5(6) - 540, 40, '@P66:engineer-0.3', { kind: 'investor', label: 'HER ENGINEER', sub: 'SAID NO', suit: '#2F5DA8', w: 340, h: 440, tape: 'ENGINEER', reactAt: '@P66:refused' }, { out: '@P67-0.2' });
el('fk66', 'text', R5(6) + 340, -80, '@P66:fake-0.2', { lines: [[['“CREATE FAKE DATA”', 'bad']]], size: 76 }, { out: '@P67-0.2' });
el('rf66', 'stamp', R5(6) + 340, 160, '@P66:refused-0.1', { text: 'HE REFUSED', tone: 'good', size: 120 }, { rot: -0.05, out: '@P67-0.2' });
con('j66', 'jav', R5(6) + 1000, 400, '@P66:asked-0.1', { w: 230, variant: 'pip', label: 'THE ASK', flash: false }, { out: '@P67-0.2' });
bt('@P66', 'graphic-hero', ['en66'], { move: 'whip', fill: 0.26, maxH: 640, sy: 490, pose: 'point' }); sf('@P66-0.3', 'swoosh_2', -11, 0.5);
bt('@P66:fake', 'graphic-hero', ['en66', 'fk66'], { fill: 0.76, sy: 490, pose: 'point' }); sf('@P66:fake', 'typewriter_2', -11, 1.2);
bt('@P66:refused', 'zoom-on-number', 'rf66', { fill: 0.4, maxH: 360, sy: 480, pose: 'shock' }); sf('@P66:refused', 'rubber_stamp_2', -5, 0.5); sk('@P66:refused', 10);
// P67 professor generated 4M+ fake records for about $18,000
el('pf67', 'victim', R5(7) - 700, 100, '@P67-0.3', { kind: 'investor', label: 'DATA PROFESSOR', sub: 'GENERATES THE RECORDS', suit: '#5a2aa8', w: 380, h: 480, reactAt: '@P67:more' }, { out: '@P68-0.2' });
el('ml67', 'maillist', R5(7) + 60, 140, '@P67:generated-0.3', { w: 700, h: 640, at: '@P67:generated', per: 0.12, rows: 9, bounceAt: 99999, title: 'FAKE CUSTOMER RECORDS' }, { out: '@P68-0.2' });
el('c67', 'counter', R5(7) + 60, -330, '@P67:four-0.3', { label: 'FAKE RECORDS', sub: 'MORE THAN', to: 4000000, at: '@P67:four', dur: 1.3, tone: 'bad', size: 120, w: 760 }, { out: '@P68-0.2' });
el('ch67', 'counter', R5(7) + 900, 140, '@P67:cost-0.1', { label: 'IT COST ABOUT', to: 18000, prefix: '$', at: '@P67:$18', dur: 1.0, tone: 'bad', size: 110, w: 560 }, { out: '@P68-0.2' });
bt('@P67', 'graphic-hero', ['pf67', 'ml67'], { move: 'whip', fill: 0.62, sy: 490, pose: 'point' }); sf('@P67-0.3', 'swoosh_2', -11, 0.5); sf('@P67:generated', 'typewriter_2', -11, 1.6);
bt('@P67:four', 'zoom-on-number', 'c67.value', { fill: 0.38, maxH: 400, sy: 400 }); sf('@P67:four', 'money_counter_2', -11, 1.3); bt('@P67:cost', 'graphic-hero', ['ml67', 'ch67'], { fill: 0.72, sx: 1100, sy: 490, pose: 'point' });
bt('@P67:$18', 'zoom-on-number', 'ch67.value', { fill: 0.3, maxH: 400, sy: 480, pose: 'shock' }); sf('@P67:$18', 'cash_register_1', -9, 0.9); sk('@P67:$18', 10);
// P68 JPMorgan bought Frank for $175M
el('cs68', 'cashStack', R5(8) - 520, 100, '@P68-0.3', { count: 70, at: '@P68:bought', per: 0.03, each: 2500000, prefix: '$', label: 'THE PRICE', w: 520 }, { out: '@P69-0.2' });
el('c68', 'counter', R5(8) + 340, 20, '@P68-0.2', { label: 'THE BANK PAID', to: 175000000, prefix: '$', at: '@P68:$175', dur: 1.5, tone: 'bad', size: 170, w: 1000 }, { out: '@P69-0.2' });
bt('@P68', 'graphic-hero', ['cs68', 'c68'], { move: 'whip', fill: 0.82, sy: 500, pose: 'point' }); sf('@P68-0.3', 'swoosh_2', -11, 0.5);
bt('@P68:$175', 'zoom-on-number', 'c68.value', { fill: 0.5, maxH: 420, sy: 500, pose: 'shock' }); sf('@P68:$175', 'money_counter_1', -11, 1.6); sf('@P68:million+0.2', 'cash_register_1', -9, 0.9); sk('@P68:million+0.2', 12);
// P69 the bank tried to reach its customers; the list fell apart
el('ml69', 'maillist', R5(9), 20, '@P69-0.3', { w: 900, h: 720, at: '@P69:reach', per: 0.2, rows: 10, bounceAt: '@P69:list', title: 'EMAIL TO THE NEW CUSTOMERS' }, { out: '@P70-0.2' });
bt('@P69', 'graphic-hero', 'ml69', { move: 'whip', fill: 0.5, maxH: 860, sy: 500, pose: 'point' }); sf('@P69-0.3', 'swoosh_2', -11, 0.5);
bt('@P69:list', 'zoom-on-number', 'ml69', { fill: 0.5, maxH: 860, sy: 500, pose: 'shock' }); for (let i = 0; i < 5; i++) sf(`@P69:list+${(i * 0.1).toFixed(1)}`, 'wrong_buzzer_2', -14, 0.4); sk('@P69:list', 12);
// P70 verdict: all four counts, 85 months, $287.5M
con('j70', 'jav', R5(10) - 520, 40, '@P70-0.3', { w: 420, variant: 'card', bars: '@P70:85', stamps: [{ text: 'GUILTY · ALL 4', at: '@P70:jury', tone: 'bad', size: 52, rot: -0.1, y: 60 }], push: { at: '@P70', to: 1.2, dur: 4 }, flash: false }, { out: '@P71-0.2' });
el('y70', 'counter', R5(10) + 220, -130, '@P70:sentenced-0.1', { label: 'SENTENCED TO', sub: 'MONTHS IN PRISON', to: 85, at: '@P70:85', dur: 0.9, tone: 'bad', size: 170, w: 940 }, { out: '@P71-0.2' });
el('m70', 'counter', R5(10) + 220, 210, '@P70:pay-0.1', { label: 'AND ORDERED TO PAY BACK', to: 287500000, prefix: '$', at: '@P70:$287', dur: 1.5, tone: 'bad', size: 120, w: 940 }, { out: '@P71-0.2' });
bt('@P70', 'graphic-hero', ['j70', 'y70'], { move: 'whip', fill: 0.78, sy: 490, pose: 'point' }); sf('@P70-0.3', 'swoosh_2', -11, 0.5); sf('@P70:jury', 'gavel_1', -5, 0.8); sk('@P70:jury', 12);
bt('@P70:85', 'zoom-on-number', 'y70.value', { fill: 0.44, maxH: 420, sy: 480, pose: 'shock' }); sf('@P70:85-0.1', 'cell_door_1', -7, 1.2);
bt('@P70:$287', 'zoom-on-number', 'm70.value', { fill: 0.5, maxH: 360, sy: 520 }); sf('@P70:$287', 'money_counter_1', -11, 1.5); bt('@P70:pay', 'graphic-hero', ['j70', 'y70', 'm70'], { fill: 0.84, sy: 500, pose: 'chin' });
// ---------------- CH6 · THE PATTERN (P71-P81) — steel room, evidence board with all five faces ----------------
const R6 = k => K(RM[6], k);
el('ch6', 'headline', R6(0) - 300, -250, '@P71-0.3', { kicker: 'CHAPTER SIX', lines: [[['THE ', 'paper'], ['PATTERN', 'accent']]], size: 150, underAt: 1.0 }, { out: '@P72-0.2' });
// the board: five faces on the top row, five clues pinned underneath, strings pull face -> clue
const BX = R6(0) + 200, BY = 40;
const faces = [['kur', -560], ['gig', -280], ['tip', 0], ['tuc', 280], ['jav', 560]];
const clues = [
  { id: 'cl1', x: -560, y: 300, icon: 'labels', lines: [['37 YEARS OLDER', 'bad', 30], ['THAN THE WINE', 'ink', 24]], at: '@P73:label' },
  { id: 'cl2', x: -280, y: 300, icon: 'fork', lines: [['A PRINCE', 'bad', 30], ['WHO ATE PORK', 'ink', 24]], at: '@P74:prince' },
  { id: 'cl3', x: 0, y: 300, icon: 'cheque', lines: [['A JACKPOT NOBODY', 'bad', 28], ['COULD CLAIM', 'ink', 24]], at: '@P75:jackpot' },
  { id: 'cl4', x: 280, y: 300, icon: 'cash', lines: [['A BALANCE THAT', 'bad', 28], ['NEVER MOVED', 'ink', 24]], at: '@P76:loan' },
  { id: 'cl5', x: 560, y: 300, icon: 'crown', lines: [['A LIST 14×', 'bad', 30], ['TOO BIG', 'ink', 24]], at: '@P77:customer' },
];
el('bd6', 'board', BX, BY, '@P71-0.2', { w: 1500, h: 860, title: 'THE EVIDENCE BOARD', caseNo: '5 CASES · 1 PATTERN', items: [
  ...faces.map(([w, x], i) => ({ k: 'photo', src: CON[w].src, crop: CON[w].crop, x, y: -170, w: 250, h: 290, name: CON[w].name.split(' ')[1], nameSize: 28, at: `@P71+${(0.1 + i * 0.18).toFixed(2)}`, rot: [-0.04, 0.03, -0.02, 0.04, -0.03][i], fx: CON[w].fx, fy: CON[w].fy === 0.45 ? 0.4 : CON[w].fy, ...(i === 0 ? { xmark: '@P80:failed' } : {}) })),
  ...clues.map(c => ({ ...c, w: 250, h: 240, size: 28, rot: 0.02 * (c.x > 0 ? -1 : 1) })),
], strings: [[0, 5, '@P73:label'], [1, 6, '@P74:prince'], [2, 7, '@P75:jackpot'], [3, 8, '@P76:loan'], [4, 9, '@P77:customer']], tightAt: '@P78:caught' }, { out: '@P79-0.2' });
bt('@P71', 'graphic-hero', ['ch6', 'bd6'], { move: 'whip', dur0: 0.7, fill: 0.86, sy: 500, pose: 'shrug', arc: 0.2 }); sf('@P71-0.6', 'tape_stop_1', -8, 1.0); sf('@P71-0.1', 'cinematic_hit_1', -9, 1.5);
for (let i = 0; i < 5; i++) sf(`@P71+${(0.1 + i * 0.18).toFixed(2)}`, 'camera_flash_1', -12, 0.4);
bt('@P71:pattern', 'zoom-on-number', 'ch6', { fill: 0.4, maxH: 520, sy: 400, pose: 'point' });
bt('@P72', 'graphic-hero', 'bd6', { fill: 0.84, sy: 500, pose: 'point' });
bt('@P73', 'zoom-on-number', ['bd6.i0', 'bd6.cl1'], { fill: 0.34, maxH: 640, sy: 560, pose: 'point' }); sf('@P73:label', 'paper_slam_2', -10, 0.5); sf('@P73:label', 'pop_2', -8, 0.4);
bt('@P74', 'zoom-on-number', ['bd6.i1', 'bd6.cl2'], { fill: 0.34, maxH: 640, sy: 560, pose: 'point' }); sf('@P74:prince', 'paper_slam_2', -10, 0.5);
bt('@P75', 'zoom-on-number', ['bd6.i2', 'bd6.cl3'], { fill: 0.34, maxH: 640, sy: 560, pose: 'point' }); sf('@P75:jackpot', 'paper_slam_2', -10, 0.5);
bt('@P76', 'zoom-on-number', ['bd6.i3', 'bd6.cl4'], { fill: 0.34, maxH: 640, sy: 560, pose: 'point' }); sf('@P76:loan', 'paper_slam_2', -10, 0.5);
bt('@P77', 'zoom-on-number', ['bd6.i4', 'bd6.cl5'], { fill: 0.34, maxH: 640, sy: 560, pose: 'shock' }); sf('@P77:customer', 'paper_slam_2', -10, 0.5); sk('@P77:customer', 10);
// P77 "fourteen times too big" counter, P78 one number, one detail
el('x14b', 'counter', R6(0) + 1300, -250, '@P77:14-0.2', { label: 'TOO BIG', to: 14, suffix: '×', at: '@P77:14', dur: 0.7, tone: 'bad', size: 170, w: 560 }, { out: '@P78-0.2' });
bt('@P77:14', 'zoom-on-number', 'x14b.value', { fill: 0.3, maxH: 420, sx: 1000, sy: 460, pose: 'shock' }); sf('@P77:14', 'rubber_stamp_2', -5, 0.5);
el('mg78', 'icon', R6(1) + 100, -40, '@P78-0.3', { kind: 'magnifier', s: 360, col: 'paper' }, { out: '@P79-0.2' });
el('h78', 'headline', R6(1) + 100, 280, '@P78:checked-0.1', { lines: [[['ONE NUMBER. ', 'paper'], ['ONE DETAIL.', 'bad']]], size: 100, under: 'bad', underAt: 0.8 }, { out: '@P79-0.2' });
bt('@P78', 'graphic-hero', ['bd6'], { fill: 0.86, sy: 500, pose: 'point' });
bt('@P78:smarter', 'graphic-hero', ['mg78'], { move: 'whip', fill: 0.22, maxH: 520, sy: 440, pose: 'chin' }); sf('@P78:smarter', 'swoosh_2', -11, 0.5);
bt('@P78:checked', 'graphic-hero', ['mg78', 'h78'], { fill: 0.66, sy: 500, pose: 'point' }); sf('@P78:checked', 'typewriter_2', -11, 1.4); bt('@P78:didn\'t', 'zoom-on-number', 'h78', { fill: 0.6, maxH: 300, sy: 470, pose: 'shock' }); sf('@P78:didn\'t', 'rubber_stamp_2', -5, 0.5); sk('@P78:didn\'t', 10);
// P79 the three-question test card; each question lands on its number
el('cl79', 'checklist', R6(2), 40, '@P79-0.3', { title: 'THE 3-QUESTION TEST', lockOpen: '@P79>', rows: [{ show: '@P79:one', t: 'DOES THIS NUMBER MAKE SENSE?' }, { show: '@P79:two', t: 'CAN I CHECK IT MYSELF, TODAY?' }, { show: '@P79:three#2', t: 'WHAT IF I SAY, “SHOW ME”?' }] }, { out: '@P81-0.2' });
bt('@P79', 'graphic-hero', 'cl79', { move: 'whip', fill: 0.62, maxH: 800, sy: 500, pose: 'point' }); sf('@P79-0.3', 'paper_slam_2', -10, 0.5); sf('@P79-0.3', 'swoosh_2', -11, 0.5);
for (const w of ['one', 'two', 'three']) { sf(`@P79:${w}${w === 'three' ? '#2' : ''}`, 'pop_2', -9, 0.3); }
bt('@P79:one', 'zoom-on-number', 'cl79.r0', { fill: 0.6, maxH: 300, sy: 480 }); bt('@P79:two', 'zoom-on-number', 'cl79.r1', { fill: 0.6, maxH: 300, sy: 480 }); bt('@P79:three#2', 'zoom-on-number', 'cl79.r2', { fill: 0.6, maxH: 300, sy: 480, pose: 'chin' });
// P80 every con would have failed: the ticks, then five FAILED stamps
for (let i = 0; i < 5; i++) con('fl' + i, ['kur', 'gig', 'tip', 'tuc', 'jav'][i], R6(3) + (i - 2) * 400, 40, `@P80:every+${(i * 0.15).toFixed(2)}`, { w: 320, variant: 'card', flash: false, credit: '', stamps: [{ text: 'FAILED', at: `@P80:failed+${(i * 0.25).toFixed(2)}`, tone: 'bad', size: 70, rot: -0.12, y: 20 }] }, { out: '@P81-0.2' });
bt('@P80', 'graphic-hero', ['fl0', 'fl4'], { move: 'whip', fill: 0.94, sy: 500, pose: 'point' }); sf('@P80-0.3', 'swoosh_2', -11, 0.5);
for (let i = 0; i < 5; i++) sf(`@P80:failed+${(i * 0.25).toFixed(2)}`, 'rubber_stamp_2', -6 + (i === 4 ? 2 : 0), 0.5);
bt('@P80:failed', 'graphic-hero', ['fl0', 'fl4'], { fill: 0.94, sy: 500, pose: 'shock' }); sk('@P80:failed+1.0', 12);
// P81 SUBSCRIBE moment + comment bubble, then END CARD
el('sub81', 'follow', 1480, 880, '@P81:subscribe-0.2', { press: 0.7, labels: ['SUBSCRIBE', '✓ SUBSCRIBED'] }, { layer: 'screen', out: '@P81:subscribe+1.6' });
sf('@P81:subscribe-0.15', 'pop_2', -9, 0.3); sf('@P81:subscribe+0.55', 'click_1', -8, 0.3); sf('@P81:subscribe+0.6', 'success_chime_1', -12, 1.2);
el('end81', 'headline', R6(4), 40, '@P81-0.3', { kicker: 'NEW CASE EVERY WEEK', lines: [[['THE MATH ', 'paper'], ['CATCHES', 'bad']], [['THE BAD GUY', 'paper']]], size: 130, underAt: 1.0 }, { out: '@P81>' });
bt('@P81', 'graphic-hero', 'end81', { move: 'whip', fill: 0.7, maxH: 640, sx: 860, sy: 480, st: 'corner', pose: 'point' }); sf('@P81-0.3', 'swoosh_2', -11, 0.5);
bt('@P81:subscribe', 'graphic-hero', 'end81', { fill: 0.72, maxH: 640, sx: 860, sy: 480, st: 'corner', pose: 'follow' }); po('@P81:subscribe', 'follow', [1480, 880]); po('@P81:subscribe+1.2', 'point');
// END CARD (12 s after the last word): clean dark card with YouTube end-screen slots
el('endc', 'endslots', RM[7], 40, '@P81>+0.4', { at: '@P81>+0.4', rl: 'WATCH NEXT', cl: 'SUBSCRIBE' }, { layer: 'screen' });
el('endt', 'headline', RM[7], -380, '@P81>+0.2', { kicker: 'BAD MATH', lines: [[['5 CONS. ', 'paper'], ['1 PATTERN.', 'accent']]], size: 86, under: 'accent', underAt: 0.8 }, {});
bt('@P81>+0.1', 'graphic-hero', 'endt', { move: 'whip', fill: 0.4, maxH: 400, sy: 260, st: 'off', pose: 'wave' });
po('@P81>+0.5', 'wave');
const BEATLABELS = [['@P07', '@P08', 'THE CASE'], ['@P08', '@P10', 'THE PITCH'], ['@P11', '@P13', 'THE TRICK'], ['@P15', '@P20', 'THE CATCH'], ['@P20', '@P21', 'THE SENTENCE'],
  ['@P21', '@P22', 'THE CASE'], ['@P22', '@P27', 'THE PITCH'], ['@P27', '@P29', 'THE TRICK'], ['@P29', '@P32', 'THE CATCH'], ['@P32', '@P34', 'THE SENTENCE'],
  ['@P34', '@P35', 'THE CASE'], ['@P36', '@P37', 'THE JOB'], ['@P37', '@P41', 'THE TRICK'], ['@P41', '@P45', 'THE BIG ONE'], ['@P45', '@P46', 'THE CATCH'], ['@P46', '@P48', 'THE SENTENCE'],
  ['@P48', '@P49', 'THE CASE'], ['@P49', '@P52', 'THE PITCH'], ['@P52', '@P58', 'THE TRICK'], ['@P58', '@P60', 'THE SENTENCE'],
  ['@P60', '@P61', 'THE CASE'], ['@P61', '@P64', 'THE PITCH'], ['@P64', '@P69', 'THE TRICK'], ['@P69', '@P70', 'THE CATCH'], ['@P70', '@P71', 'THE SENTENCE'],
  ['@P71', '@P79', 'THE EVIDENCE'], ['@P79', '@P81', 'THE TEST']];
BEATLABELS.forEach(([a, b, t], i) => el('bl' + i, 'beatlabel', 1856, 140, a, { text: t }, { layer: 'screen', out: b }));
BM2.scene({
  series: 'decoded', title: 'CASE FILE: 5 CONS', duration: 515.78, fps: 30,
  footnote: ['DOCUMENTED CASES · COURT / DOJ / SEC RECORDS · SOURCES IN DESCRIPTION · NOT FINANCIAL ADVICE', 'PHOTOS: U.S. ICE, MIAMI-DADE COUNTY, U.S. GOVERNMENT (PUBLIC DOMAIN). CARTOON CARDS = ILLUSTRATIONS, NOT PHOTOS'],
  elements: E, beats: BT, poses: PO, shakes: SK, sfx: SF,
  stages: STAGES, hudOff: [['@P81>+0.1', 900]], travel: { every: 10 },
  captions: { fix: [], hide: [['@P81>+0.1', 900]], emph: {
    '$2.1': 'bad', '$175': 'bad', '$16.5': 'bad', fake: 'bad', rigged: 'bad', '$35': 'good', '37': 'bad', '219': 'bad', '$28': 'bad', '$8': 'bad', '11': 'bad', '18': 'bad', pork: 'bad', '$2.5': 'good',
    '$500': 'good', '$650': 'bad', '$150': 'bad', '$1,925': 'bad', '700': 'bad', '22': 'good', '4.5': 'paper', '$3.5': 'bad', '4.25': 'good', '300,000': 'bad', '$18,000': 'bad', '85': 'bad', '$287.5': 'bad', '14': 'bad', '25': 'bad', '200': 'bad',
    guilty: 'bad', prison: 'bad', convicted: 'bad', exist: 'bad', existed: 'bad', cons: 'accent', pattern: 'accent', number: 'accent', check: 'accent', sham: 'bad' } },
});
