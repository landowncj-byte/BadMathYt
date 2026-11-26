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
// ===== Fakes That Fooled the Experts — new recipes: wall (empty hooks), notebooks (plain black, FH initials), gallery, brushframe =====
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst } = B;
  const pop = (t, o = 'snappy') => clamp(spring(t, o), 0, 1.25);
  const bad = '#E0281E';
  const cover = (g, img, x, y, w, h) => { const sc = Math.max(w / img.width, h / img.height), dw = img.width * sc, dh = img.height * sc; g.drawImage(img, x + (w - dw) / 2, y + (h - dh) * 0.3, dw, dh); };

  // wall: a gallery wall. The painting hangs there until goneAt; then four empty hooks are ringed one by one.
  B.register('wall', {
    defaults: { w: 820, h: 760, src: '', goneAt: 99999, hooksAt: 99999, label: 'FOUR EMPTY HOOKS', labelAt: 99999, name: 'THE LOUVRE · SALON CARRÉ', nameAt: -1 }, size: p => [p.w, p.h],
    anchors: p => ({ hooks: [0, -p.h * 0.1, p.w * 0.62, p.h * 0.5], wall: [0, 0, p.w, p.h] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, k = spring(lt, 'heavy'); const img = p.src && B.images[p.src];
      g.save(); g.translate(0, (1 - k) * 200); g.rotate((1 - k) * 0.05); g.globalAlpha *= clamp(lt / 0.1);
      paper(g, x0, y0, w, h, 22, { lift, fill: '#CFC3AC' }); g.save(); rr(g, x0, y0, w, h, 22); g.clip();
      const lg = g.createLinearGradient(0, y0, 0, y0 + h); lg.addColorStop(0, '#5a4a3a'); lg.addColorStop(1, '#3e3226'); g.fillStyle = lg; g.fillRect(x0, y0, w, h);
      g.fillStyle = 'rgba(255,255,255,.05)'; for (let i = 0; i < 9; i++) g.fillRect(x0 + i * w / 9 + 6, y0, 3, h);   // wallpaper stripes
      g.fillStyle = '#2a2018'; g.fillRect(x0, y0 + h - 120, w, 120); g.fillStyle = 'rgba(255,255,255,.12)'; g.fillRect(x0, y0 + h - 124, w, 5);
      const fw = w * 0.5, fh = h * 0.58, fx = -fw / 2, fy = y0 + h * 0.14, gone = t - p.goneAt;
      if (gone < 0 || gone < 0.5) { const drop = gone > 0 ? ease.in(clamp(gone / 0.5)) * (h * 0.5) : 0; g.save(); g.translate(0, drop); g.globalAlpha *= gone > 0 ? 1 - clamp(gone / 0.5) : 1; g.rotate(gone > 0 ? 0.12 * clamp(gone / 0.5) : 0);
        B.shadowed(g, () => rr(g, fx - 18, fy - 18, fw + 36, fh + 36, 8), '#8a6a1f', 0.4); g.fillStyle = '#B88A2B'; rr(g, fx - 18, fy - 18, fw + 36, fh + 36, 8); g.fill(); g.fillStyle = '#E3B94E'; rr(g, fx - 10, fy - 10, fw + 20, fh + 20, 5); g.fill();
        g.save(); rr(g, fx, fy, fw, fh, 3); g.clip(); if (img) cover(g, img, fx, fy, fw, fh); else { g.fillStyle = '#6b5a3a'; g.fillRect(fx, fy, fw, fh); } g.restore(); g.restore(); }
      else { g.fillStyle = 'rgba(255,255,255,.07)'; rr(g, fx - 18, fy - 18, fw + 36, fh + 36, 8); g.fill(); }
      const hk = [[fx + 28, fy + 6], [fx + fw - 28, fy + 6], [fx + 28, fy + fh - 6], [fx + fw - 28, fy + fh - 6]];
      hk.forEach(([hx, hy], i) => { if (gone > 0.35 || gone > 0.2 && i === 0) { g.fillStyle = '#d9d2c3'; g.beginPath(); g.arc(hx, hy, 9, 0, 7); g.fill(); g.strokeStyle = '#2a2018'; g.lineWidth = 3; g.stroke();
        const on = t - p.hooksAt - i * 0.35; if (on > 0) { const u = pop(on, 'bouncy'); g.strokeStyle = bad; g.lineWidth = 6; g.beginPath(); g.arc(hx, hy, 34 * u, 0, 7); g.stroke(); txt(g, String(i + 1), hx + (i % 2 ? 56 : -56), hy + (i < 2 ? -40 : 44), F.hero(40), bad); } } });
      g.restore();
      if (p.name && t >= p.nameAt) txt(g, p.name, 0, y0 + 46, F.monoX(24), '#E9DFC9');
      const lb = t - p.labelAt; if (lb > 0) { g.save(); g.translate(0, h / 2 - 70 + (1 - pop(lb)) * 30); g.globalAlpha *= clamp(lb / 0.1); g.fillStyle = bad; rr(g, -250, -40, 500, 80, 10); g.fill(); txt(g, p.label, 0, 3, F.hero(48), theme.paper); g.restore(); }
      g.restore();
    },
  });

  // notebooks: plain black notebooks (a stack, "dozens"), plastic letters F H on the cover. fixAt: ring on the letters + "SHOULD SAY A H".
  B.register('notebook', {
    defaults: { w: 600, h: 700, n: 5, lettersAt: -1, ringAt: 99999, shouldAt: 99999, stampText: '', stampAt: 99999, count: '' }, size: p => [p.w, p.h],
    anchors: p => ({ letters: [0, -p.h * 0.02, 360, 190], book: [0, 20, p.w * 0.7, p.h * 0.7] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, k = spring(lt, 'bouncy'); g.save(); g.globalAlpha *= clamp(lt / 0.1); g.translate(0, (1 - k) * 160);
      const bw = w * 0.62, bh = h * 0.66, n = p.n;
      for (let i = n - 1; i >= 0; i--) { const on = lt - 0.06 * (n - 1 - i), kk = pop(on, 'bouncy'); if (on < 0) continue; g.save(); g.translate((i - (n - 1) / 2) * 38 * (i ? 1 : 0.0) + (i ? (i % 2 ? 1 : -1) * 18 * i : 0), -i * 14 + (1 - kk) * 70); g.rotate((i ? (i % 2 ? 0.05 : -0.05) * i * 0.6 : 0) * 1);
        const bk = i === 0; B.shadowed(g, () => rr(g, -bw / 2, -bh / 2, bw, bh, 16), '#0b0f14', bk ? lift : 0.15); const cg = g.createLinearGradient(-bw / 2, -bh / 2, bw / 2, bh / 2); cg.addColorStop(0, i ? '#222a35' : '#2b3441'); cg.addColorStop(1, '#10151d'); g.fillStyle = cg; rr(g, -bw / 2, -bh / 2, bw, bh, 16); g.fill();
        g.fillStyle = 'rgba(255,255,255,.10)'; rr(g, -bw / 2 + 4, -bh / 2 + 4, bw * 0.09, bh - 8, 10); g.fill(); g.strokeStyle = 'rgba(255,255,255,.18)'; g.lineWidth = 3; rr(g, -bw / 2, -bh / 2, bw, bh, 16); g.stroke();
        if (bk) { g.fillStyle = '#7a1b1b'; g.fillRect(-bw / 2 + bw * 0.14, -bh / 2 + 4, 10, bh - 8); }   // ribbon, not a symbol
        g.restore(); }
      // plastic letters F H on the front notebook
      const on = lt - 0.1 - p.lettersAt * 0 ; const la = t - p.lettersAt;
      if (p.lettersAt >= 0 ? la > -0.01 : on > 0) { ['F', 'H'].forEach((c, i) => { const q = pop((p.lettersAt >= 0 ? la : on) - i * 0.18, 'bouncy'); if (q <= 0) return; g.save(); g.translate((i - 0.5) * 130, -h * 0.02 + (1 - q) * -50); g.scale(q, q);
          g.fillStyle = 'rgba(0,0,0,.45)'; g.beginPath(); g.roundRect(-52 + 5, -80 + 8, 104, 160, 12); g.fill(); const lg = g.createLinearGradient(0, -80, 0, 80); lg.addColorStop(0, '#F2E3A0'); lg.addColorStop(1, '#C9A640'); g.fillStyle = lg; g.beginPath(); g.roundRect(-52, -80, 104, 160, 12); g.fill(); g.strokeStyle = 'rgba(0,0,0,.35)'; g.lineWidth = 3; g.stroke();
          txt(g, c, 0, 6, F.hero(124), '#2a1d0a'); g.restore(); }); }
      const rg = t - p.ringAt; if (rg > 0) { const u = ease.out(clamp(rg / 0.35)); g.strokeStyle = bad; g.lineWidth = 9; g.beginPath(); g.ellipse(0, -h * 0.02, 190 * (2 - u), 120 * (2 - u), 0, 0, 7); g.save(); g.globalAlpha *= u; g.stroke(); g.restore(); }
      const sh = t - p.shouldAt; if (sh > 0) { g.save(); g.translate(0, h * 0.40 + (1 - pop(sh)) * 40); g.globalAlpha *= clamp(sh / 0.1); g.fillStyle = theme.paper; rr(g, -250, -62, 500, 124, 14); g.fill(); g.strokeStyle = theme.good; g.lineWidth = 7; rr(g, -244, -56, 488, 112, 10); g.stroke(); txt(g, 'THE NAME STARTS WITH', 0, -26, F.mono(22), theme.inkSoft); txt(g, 'A   H', 0, 22, F.hero(66), theme.goodInk || '#188a56'); g.restore(); }
      if (p.count) { g.save(); g.translate(w * 0.34, -h * 0.4); g.rotate(0.1); g.fillStyle = bad; rr(g, -120, -34, 240, 68, 8); g.fill(); txt(g, p.count, 0, 3, F.hero(38), theme.paper); g.restore(); }
      if (p.stampText && t >= p.stampAt) B.crimeStamp(g, theme, t, { text: p.stampText, at: p.stampAt, tone: 'bad', size: 60, rot: -0.1, x: 0, y: h * 0.12 });
      g.restore();
    },
  });

  // gallery: a row of framed pictures labelled with the dealer/expert/owner "BOUGHT IT" (Vermeers that were fakes) -> each gets FAKE tape at fakeAt
  B.register('gallery', {
    defaults: { items: [], w: 1300, h: 520, fakeAt: 99999, tape: 'ALL FAKES', head: '' }, size: p => [p.w, p.h],
    anchors: p => Object.fromEntries(p.items.map((it, i) => ['f' + i, [(i - (p.items.length - 1) / 2) * 320, 10, 270, 340]])),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, n = p.items.length, fk = clamp((t - p.fakeAt) / 0.3);
      paper(g, -w / 2, -h / 2, w, h, 24, { lift, fill: '#2a2018', grain: false }); if (p.head) txt(g, p.head, 0, -h / 2 + 40, F.monoX(24), '#E9DFC9');
      p.items.forEach((it, i) => { const on = t - it.at; if (on < 0) return; const kk = pop(on, 'bouncy'), x = (i - (n - 1) / 2) * 320; g.save(); g.translate(x, 20); g.scale(0.6 + 0.4 * kk, 0.6 + 0.4 * kk); g.globalAlpha *= clamp(on / 0.1);
        B.shadowed(g, () => rr(g, -138, -178, 276, 356, 6), '#000', 0.3); g.fillStyle = '#B88A2B'; rr(g, -138, -178, 276, 356, 6); g.fill(); g.fillStyle = '#E3B94E'; rr(g, -128, -168, 256, 336, 4); g.fill();
        const cl = ['#4a5a6a', '#6a5a3a', '#3a4a4a', '#5a4a5a', '#58603a'][i % 5]; const pg = g.createLinearGradient(0, -150, 0, 150); pg.addColorStop(0, cl); pg.addColorStop(1, '#1b1b1b'); g.fillStyle = pg; g.fillRect(-114, -154, 228, 308);
        g.fillStyle = 'rgba(240,230,200,.55)'; g.beginPath(); g.arc(0, -40, 42, 0, 7); g.fill(); g.beginPath(); g.moveTo(-70, 150); g.quadraticCurveTo(0, 20, 70, 150); g.fill(); g.fillStyle = 'rgba(255,255,255,.14)'; g.fillRect(-114, -154, 228, 10);
        g.fillStyle = '#EFE6CF'; rr(g, -100, 112, 200, 40, 4); g.fill(); txt(g, it.label || 'VERMEER?', 0, 133, F.monoX(20), '#2a1d0a');
        if (fk > 0) { g.fillStyle = 'rgba(224,40,30,' + 0.25 * fk + ')'; g.fillRect(-114, -154, 228, 308); g.save(); g.rotate(-0.12); g.scale(pop(t - p.fakeAt - i * 0.12), pop(t - p.fakeAt - i * 0.12)); g.fillStyle = bad; rr(g, -92, -26, 184, 52, 8); g.fill(); txt(g, 'FAKE', 0, 3, F.hero(40), theme.paper); g.restore(); }
        g.restore(); });
    },
  });
})();
// ===== scene: FAKES THAT FOOLED THE EXPERTS (long-form, engine v2, 1920x1080) =====
const E = [], BT = [], SF = [], PO = [], SK = [];
const RM = [0, 60000, 120000, 180000, 240000, 300000, 360000];   // rooms: cold open, ch1..ch5, end card
const K = (room, k) => room + 2800 * k;
const el = (id, type, x, y, inn, props, o) => E.push({ id, type, at: [x, y], in: inn, props: props || {}, ...(o || {}) });
const bt = (at, beat, focus, o) => BT.push({ at, beat, ...(focus !== undefined && focus !== null ? { focus } : {}), ...(o || {}) });
const sf = (at, name, gain = -8, dur = 1, offset) => SF.push({ at, name, gain, dur, ...(offset ? { offset } : {}) });
const po = (at, pose, target) => PO.push(target ? [at, pose, { target }] : [at, pose]);
const sk = (at, amp = 12) => SK.push([at, amp]);
// the four fakers as recurring characters (crime.js `suspect` base props): real licensed photos only
const CON = {
  per: { src: 'brand/photos/vincenzo-peruggia/1.jpg', name: 'VINCENZO PERUGGIA', nick: '“THE THIEF”', credit: 'PHOTO: POLICE FILE · PUBLIC DOMAIN', fx: 0.5, fy: 0.36, aspect: 1.1 },
  mee: { src: 'brand/photos/han-van-meegeren/4.jpg', crop: [0.5, 0, 0.5, 1], name: 'HAN VAN MEEGEREN', nick: '“THE FORGER”', credit: 'PHOTO: KOOS RAUCAMP / ANEFO · CC BY 4.0', fx: 0.42, fy: 0.3, aspect: 1.05 },
  kuj: { src: 'brand/photos/konrad-kujau/3.jpg', crop: [0, 0, 0.6, 1], name: 'KONRAD KUJAU', nick: '“THE DIARY FORGER”', credit: 'PHOTO: TELEPHIL · CC BY-SA 3.0', fx: 0.4, fy: 0.3, aspect: 1.05 },
  kur: { src: 'brand/photos/rudy-kurniawan/2.jpg', name: 'RUDY KURNIAWAN', nick: '“THE WINE COLLECTOR”', credit: 'PHOTO: U.S. ICE · PUBLIC DOMAIN', fx: 0.49, fy: 0.45, aspect: 1.05 },
};
const con = (id, who, x, y, inn, extra, o) => { const b = { ...CON[who], ...(extra || {}) }; if (b.variant !== 'pip' && b.variant !== 'side' && !b.nameSize) b.nameSize = Math.min(44, Math.floor((b.w - 44 - 36) / (b.name.length * 0.5))); if (b.variant === 'side' && !b.nameSize) b.nameSize = 30; el(id, 'suspect', x, y, inn, b, o); };
const STAGES = [
  { at: '@P08-0.7', dur: 1.2, theme: { stage: ['#1d2840', '#121a2c', '#080c16'], blobs: [['#8a6a1f', 0.4], ['#2a3a78', 0.55], ['#3e4a70', 0.5], ['#8a6a1f', 0.3]], dust: '#FFF0C0' } },
  { at: '@P26-0.7', dur: 1.2, theme: { stage: ['#3a2812', '#25190b', '#120c05'], blobs: [['#8a5a1f', 0.55], ['#6a4a2a', 0.5], ['#3e3020', 0.55], ['#8a5a1f', 0.4]], dust: '#FFE4B8' } },
  { at: '@P46-0.7', dur: 1.2, theme: { stage: ['#2a2848', '#1a1830', '#0B0F14'], blobs: [['#4a3a88', 0.5], ['#2a4a68', 0.5], ['#3a3a60', 0.5], ['#4a3a88', 0.35]], dust: '#E4DEFF' } },
  { at: '@P61-0.7', dur: 1.2, theme: { stage: ['#3a1620', '#240d14', '#120609'], blobs: [['#7a2a3c', 0.55], ['#5b1f33', 0.5], ['#3e2030', 0.55], ['#7a2a3c', 0.4]], dust: '#FFD9DF' } },
  { at: '@P77-0.7', dur: 1.2, theme: { stage: ['#26354A', '#152030', '#0B0F14'], blobs: [['#1F5F7A', 0.58], ['#2A4278', 0.55], ['#1E4A4A', 0.5], ['#1F5F7A', 0.4]], dust: '#DCEBFF' } },
];
const R0 = k => K(RM[0], k);
// ---------------- COLD OPEN (P01-P07): four faces, four details ----------------
// P01: the thief + the Mona Lisa leaving the wall
con('k0', 'per', R0(0) - 600, 60, -3, { w: 420, variant: 'card', file: true, caseNo: 'CASE Nº 1', stamps: [{ text: 'THE THIEF', at: '@P01:man', tone: 'bad', size: 56, rot: -0.1, y: 40 }] }, { out: '@P02-0.2' });
el('w0', 'wall', R0(0) + 330, 40, -3, { w: 800, h: 740, src: 'brand/photos/mona-lisa-painting/1.jpg', goneAt: '@P01:under', hooksAt: '@P01:arm', label: 'THE MOST FAMOUS PAINTING', labelAt: '@P01:arm', nameAt: -1 }, { out: '@P02-0.2' });
bt(0, 'graphic-hero', ['k0', 'w0'], { fill: 0.84, sy: 480, pose: 'point' }); sf(0, 'paper_slam_2', -9, 0.5); sf(0.05, 'camera_flash_1', -9, 0.6);
bt('@P01:museum', 'zoom-on-number', 'w0', { fill: 0.4, maxH: 760, sy: 500, pose: 'chin' });
bt('@P01:famous#2', 'graphic-hero', ['k0', 'w0'], { fill: 0.84, sy: 480, pose: 'point' });
bt('@P01:under', 'zoom-on-number', 'w0', { fill: 0.42, maxH: 780, sy: 500, pose: 'shock' }); sf('@P01:under', 'door_bang_1', -9, 0.8); sk('@P01:under', 10);
// P02: the forger + 1.65 million guilders sold to a Nazi leader (text card only)
con('k1', 'mee', R0(1) - 660, 60, '@P02-0.3', { w: 420, variant: 'card', file: true, caseNo: 'CASE Nº 2', stamps: [{ text: 'FAKE', at: '@P02:fake', tone: 'bad', size: 70, rot: -0.1, y: 30 }] }, { out: '@P03-0.2' });
el('g2', 'card', R0(1) + 250, -200, '@P02:painter+0.4', { w: 640, h: 280, lines: [{ t: 'THE BUYER', size: 24, gap: 54, font: 'mono', tone: 'inkSoft', at: '@P02:nazi-0.4' }, { t: 'HERMANN GOERING', size: 58, font: 'hero', at: '@P02:nazi-0.3' }, { t: 'A NAZI LEADER', size: 40, tone: 'bad', at: '@P02:nazi' }], pad: 56 }, { out: '@P03-0.2' });
el('c2', 'counter', R0(1) + 250, 150, '@P02:sold-0.2', { label: 'PRICE IN GUILDERS (DUTCH MONEY)', to: 1.65, decimals: 2, suffix: ' MILLION', at: '@P02:1', dur: 1.2, tone: 'bad', size: 110, w: 900 }, { out: '@P03-0.2' });
bt('@P02', 'graphic-hero', ['k1', 'g2', 'c2'], { move: 'whip', fill: 0.86, sy: 500, pose: 'point' }); sf('@P02-0.3', 'swoosh_2', -11, 0.5);
bt('@P02:fake', 'zoom-on-number', 'k1', { fill: 0.3, maxH: 760, sy: 520, pose: 'shock' }); sf('@P02:fake', 'rubber_stamp_2', -5, 0.5);
bt('@P02:nazi', 'graphic-hero', ['g2', 'c2'], { fill: 0.5, sy: 500, pose: 'chin' });
bt('@P02:1', 'zoom-on-number', 'c2.value', { fill: 0.42, maxH: 420, sy: 500 }); sf('@P02:1', 'money_counter_2', -12, 1.3);
// P03: the diary forger, a magazine, ~9 million marks, wrong initials
con('k2', 'kuj', R0(2) - 700, 60, '@P03-0.3', { w: 380, variant: 'card', file: true, caseNo: 'CASE Nº 3', stamps: [{ text: 'FORGED', at: '@P03:secret', tone: 'bad', size: 60, rot: -0.1, y: 40 }] }, { out: '@P04-0.2' });
el('nb0', 'notebook', R0(2) + 120, 20, '@P03:secret-0.3', { w: 560, h: 700, n: 4, lettersAt: '@P03:wrong', ringAt: '@P03:cover' }, { out: '@P04-0.2' });
el('c3', 'counter', R0(2) + 760, -60, '@P03:nine-0.2', { label: 'A MAGAZINE PAID ABOUT', sub: 'MARKS (WEST GERMAN MONEY)', to: 9, suffix: ' MILLION', at: '@P03:nine', dur: 1.0, tone: 'bad', size: 100, w: 760 }, { out: '@P04-0.2' });
bt('@P03', 'graphic-hero', ['k2', 'nb0', 'c3'], { move: 'whip', fill: 0.9, sy: 500, pose: 'point' }); sf('@P03-0.3', 'swoosh_2', -11, 0.5);
bt('@P03:nine', 'zoom-on-number', 'c3.value', { fill: 0.34, maxH: 420, sx: 1100, sy: 480 }); sf('@P03:nine', 'money_counter_1', -12, 1.3);
bt('@P03:wrong', 'zoom-on-number', 'nb0.letters', { fill: 0.3, maxH: 420, sy: 500, pose: 'shock' }); sf('@P03:wrong', 'pop_2', -8, 0.4); sf('@P03:cover', 'rubber_stamp_2', -6, 0.5); sk('@P03:cover', 10);
// P04: the wine collector, world record, then "a wine factory"
con('k3', 'kur', R0(3) - 640, 60, '@P04-0.3', { w: 420, variant: 'card', file: true, caseNo: 'CASE Nº 4', stamps: [{ text: 'A WINE FACTORY', at: '@P04:factory', tone: 'bad', size: 50, rot: -0.1, y: 40 }] }, { out: '@P05-0.2' });
el('bo4', 'bottles', R0(3) + 360, 80, '@P04:wine-0.3', { items: [{ label: '1945', at: '@P04:wine' }, { label: '1982', at: '@P04:wine+0.15' }, { label: '1990', at: '@P04:wine+0.3' }], gap: 190, fakeAt: '@P04:house' }, { out: '@P05-0.2' });
el('wr4', 'stamp', R0(3) + 360, -270, '@P04:record-0.1', { text: 'WORLD AUCTION RECORD', tone: 'accent', size: 62 }, { rot: -0.05, out: '@P05-0.2' });
bt('@P04', 'graphic-hero', ['k3', 'bo4'], { move: 'whip', fill: 0.86, sy: 500, pose: 'point' }); sf('@P04-0.3', 'swoosh_2', -11, 0.5);
bt('@P04:record', 'graphic-hero', ['bo4', 'wr4'], { fill: 0.6, sx: 1100, sy: 480, pose: 'chin' }); sf('@P04:record', 'gavel_1', -7, 0.8);
bt('@P04:house', 'zoom-on-number', 'bo4', { fill: 0.4, maxH: 520, sx: 960, sy: 520 });
bt('@P04:factory', 'zoom-on-number', 'k3', { fill: 0.3, maxH: 760, sy: 520, pose: 'shock' }); sf('@P04:factory', 'rubber_stamp_2', -5, 0.5); sk('@P04:factory', 10);
// P05: four stories - three fakes and one real masterpiece
for (const [i, w] of ['per', 'mee', 'kuj', 'kur'].entries()) con('f' + i, w, R0(4) + (i - 1.5) * 440, 60 + (i % 2) * 24, `@P05:four+${(i * 0.14).toFixed(2)}`, { w: 340, variant: 'card', tilt: (i - 1.5) * 0.03, flash: i < 2, credit: '', stamps: i === 0 ? [{ text: 'THE REAL ONE', at: '@P05:real', tone: 'good', size: 38, rot: -0.1, y: 60 }] : [{ text: 'FAKE', at: `@P05:fooled+${(i * 0.18).toFixed(2)}`, tone: 'bad', size: 70, rot: -0.1, y: 40 }] }, { out: '@P06-0.2' });
el('fourT', 'text', R0(4), -400, '@P05-0.2', { lines: [[['FOUR STORIES', 'paper']]], size: 96 }, { out: '@P06-0.2' });
bt('@P05', 'graphic-hero', ['fourT', 'f0', 'f3'], { move: 'whip', fill: 0.92, sy: 480, pose: 'point' }); sf('@P05-0.3', 'swoosh_2', -11, 0.5);
for (let i = 0; i < 4; i++) sf(`@P05:four+${(i * 0.14).toFixed(2)}`, 'pop_2', -9, 0.3);
bt('@P05:three', 'graphic-hero', ['f1', 'f3'], { fill: 0.64, sy: 500, pose: 'shock' }); for (let i = 1; i < 4; i++) sf(`@P05:fooled+${(i * 0.18).toFixed(2)}`, 'rubber_stamp_2', -8, 0.5);
bt('@P05:masterpiece', 'zoom-on-number', 'f0', { fill: 0.3, maxH: 760, sy: 520, pose: 'chin' }); sf('@P05:real', 'ding_2', -9, 0.7);
bt('@P05:prove', 'graphic-hero', ['f0', 'f1', 'f2', 'f3'], { fill: 0.92, sy: 500, pose: 'point' });
// P06: every one ended in a courtroom; came apart over something tiny
el('gv6', 'tile', R0(5) - 520, 40, '@P06-0.3', { icon: 'gavel', caption: 'A COURTROOM', w: 340, h: 400, iconS: 200 }, { out: '@P07-0.2' });
el('mg6', 'icon', R0(5) + 380, 0, '@P06:apart-0.2', { kind: 'magnifier', s: 330, col: 'paper' }, { out: '@P07-0.2' });
el('t6', 'text', R0(5) + 380, 280, '@P06:tiny-0.4', { lines: [[['SOMETHING ', 'paper'], ['TINY', 'bad']]], size: 110 }, { out: '@P07-0.2' });
bt('@P06', 'graphic-hero', 'gv6', { move: 'whip', fill: 0.26, maxH: 640, sy: 500, pose: 'point' }); sf('@P06-0.3', 'swoosh_2', -11, 0.5); sf('@P06:courtroom', 'gavel_1', -6, 0.8);
bt('@P06:apart', 'graphic-hero', ['gv6', 'mg6'], { fill: 0.7, sy: 480, pose: 'chin' });
bt('@P06:tiny', 'zoom-on-number', 't6', { fill: 0.5, maxH: 320, sy: 450, pose: 'shock' }); sf('@P06:tiny', 'rubber_stamp_2', -5, 0.5); sk('@P06:tiny', 8);
// P07: three simple checks teaser, then the title
el('cl7', 'checklist', R0(6) - 100, 40, '@P07-0.3', { title: 'THREE SIMPLE CHECKS', lockOpen: '@P07>', rows: [{ show: '@P07:three', t: 'CHECK ONE   ???' }, { show: '@P07:simple', t: 'CHECK TWO   ???' }, { show: '@P07:caught', t: 'CHECK THREE   ???' }] }, { out: '@P07:all+0.1' });
el('ttl', 'headline', R0(7), 40, '@P07:all-0.1', { kicker: 'A BAD MATH CASE FILE', lines: [[['FAKES', 'accent']], [['THAT FOOLED THE EXPERTS', 'paper']]], size: 200, underAt: 0.9 });
bt('@P07', 'graphic-hero', 'cl7', { move: 'whip', fill: 0.58, maxH: 780, sy: 500, pose: 'point' }); sf('@P07-0.3', 'paper_slam_2', -10, 0.5); sf('@P07-0.3', 'swoosh_2', -11, 0.5);
for (const w of ['three', 'simple', 'caught']) sf(`@P07:${w}`, 'pop_2', -9, 0.3);
bt('@P07:simple', 'graphic-hero', 'cl7', { fill: 0.6, maxH: 780, sy: 500 }); bt('@P07:caught', 'graphic-hero', 'cl7', { fill: 0.6, maxH: 780, sy: 500, pose: 'chin' });
bt('@P07:all', 'graphic-hero', 'ttl', { move: 'whip', fill: 0.8, sy: 470, pose: 'shock', dur: 0.5 }); sf('@P07:all-0.1', 'deep_boom_1', -3, 2.0); sk('@P07:all', 12);
// ---------------- CH1 · THE MONA LISA THIEF (P08-P25) — Paris navy-gold room, Peruggia ----------------
const R1 = k => K(RM[1], k);
const MONA = 'brand/photos/mona-lisa-painting/1.jpg';
// P08 chapter card + case file
el('ch1', 'headline', R1(0) - 400, 40, '@P08-0.3', { kicker: 'CHAPTER ONE', lines: ['THE MONA', [['LISA ', 'paper'], ['THIEF', 'bad']]], size: 150, underAt: 1.0 }, { out: '@P09-0.2' });
con('p1', 'per', R1(0) + 560, 50, '@P08-0.2', { w: 440, variant: 'card', file: true, caseNo: 'CASE Nº 1', push: { at: '@P08', to: 1.12, dur: 3 } }, { out: '@P09-0.2' });
bt('@P08', 'graphic-hero', ['ch1', 'p1'], { move: 'whip', dur0: 0.7, fill: 0.84, sy: 480, pose: 'shrug', arc: 0.2 }); sf('@P08-0.6', 'tape_stop_1', -8, 1.0); sf('@P08-0.1', 'cinematic_hit_1', -9, 1.5); sf('@P08+0.9', 'camera_flash_1', -9, 0.6); sk('@P08+0.7', 8);
bt('@P08:thief', 'zoom-on-number', 'p1', { fill: 0.3, maxH: 760, sy: 520, pose: 'point' });
// P09 Paris, Monday, August 21st 1911; the Louvre is closed
el('dc9', 'datecard', R1(1) - 560, -320, '@P09-0.2', { big: '1911', small: 'PARIS · MONDAY' }, { out: '@P10-0.2' });
el('cal9', 'calendar', R1(1) - 200, 60, '@P09-0.3', { head: 'AUGUST 1911', band: 'navy', pages: [{ at: '@P09:monday', text: 'MON', tone: 'ink' }, { at: '@P09:21st', text: '21', tone: 'bad' }], size: 220 }, { out: '@P10-0.2' });
el('sg9', 'card', R1(1) + 520, 40, '@P09:louvre-0.3', { w: 560, h: 320, lines: [{ t: 'LOUVRE MUSEUM', size: 50, font: 'hero', at: '@P09:louvre' }, { t: 'CLOSED', size: 110, font: 'hero', tone: 'bad', at: '@P09:closed' }], pad: 100 }, { out: '@P10-0.2' });
bt('@P09', 'graphic-hero', ['dc9', 'cal9'], { move: 'whip', fill: 0.62, sy: 500, pose: 'point' }); sf('@P09-0.3', 'swoosh_2', -11, 0.5);
bt('@P09:21st', 'zoom-on-number', 'cal9.value', { fill: 0.34, maxH: 440, sy: 500 }); sf('@P09:21st', 'paper_slam_2', -10, 0.5);
bt('@P09:louvre', 'graphic-hero', ['cal9', 'sg9'], { fill: 0.84, sy: 500, pose: 'chin' });
bt('@P09:closed', 'zoom-on-number', 'sg9', { fill: 0.34, maxH: 360, sy: 500, pose: 'shock' }); sf('@P09:closed', 'rubber_stamp_2', -6, 0.5);
// P10 the pitch: who he was
con('p10', 'per', R1(2) - 150, 40, '@P10-0.3', { w: 900, variant: 'side', quote: ['ITALIAN.', 'EX-LOUVRE', 'WORKER.'], quoteSub: 'HE KNEW THE BUILDING', quoteSize: 74, quoteAt: '@P10:italian', noquote: true, aspect: 0.66, pw: 400 }, { out: '@P11-0.2' });
el('bd10', 'tile', R1(2) + 700, 40, '@P10:used-0.2', { icon: 'badge', caption: 'WORKED THERE', w: 300, h: 340, iconS: 170, tilt: 0.03 }, { out: '@P11-0.2' });
bt('@P10', 'graphic-hero', ['p10'], { move: 'whip', fill: 0.56, maxH: 800, sy: 500, pose: 'point' }); sf('@P10-0.3', 'swoosh_2', -11, 0.5); sf('@P10-0.1', 'camera_flash_1', -10, 0.6);
bt('@P10:italian', 'zoom-on-number', 'p10', { fill: 0.5, maxH: 740, sy: 500 }); sf('@P10:italian', 'typewriter_2', -11, 1.0);
bt('@P10:used', 'graphic-hero', ['p10', 'bd10'], { fill: 0.84, sy: 500, pose: 'point' }); sf('@P10:used', 'pop_2', -9, 0.3);
// P11 the trick: takes it off the wall
el('w11', 'wall', R1(3) - 200, 40, '@P11-0.3', { w: 820, h: 760, src: MONA, goneAt: '@P11:off', hooksAt: 99999, label: 'GONE', labelAt: '@P11:walks' }, { out: '@P12-0.2' });
con('p11', 'per', R1(3) + 520, 380, '@P11:takes-0.2', { w: 260, variant: 'pip', label: 'HE DID THIS', flash: false, arrow: { at: '@P11:off', to: [-250, -220] } }, { out: '@P12-0.2' });
bt('@P11', 'graphic-hero', ['w11'], { move: 'whip', fill: 0.4, maxH: 800, sy: 500, pose: 'point' }); sf('@P11-0.3', 'swoosh_2', -11, 0.5);
bt('@P11:off', 'zoom-on-number', 'w11', { fill: 0.42, maxH: 800, sy: 500, pose: 'shock' }); sf('@P11:off', 'paper_rustle_2', -8, 0.8); sf('@P11:off+0.2', 'thud_1', -10, 0.6);
bt('@P11:walks', 'graphic-hero', ['w11', 'p11'], { fill: 0.78, sy: 500, pose: 'point' }); sf('@P11:walks', 'footsteps_1', -10, 1.4);
// P12 how long until anyone noticed? a whole day
el('q12', 'text', R1(4) - 480, 0, '@P12-0.3', { lines: [[['?', 'accent']]], size: 480 }, { out: '@P13-0.2' });
el('c12', 'counter', R1(4) + 220, 20, '@P12:whole-0.3', { label: 'UNTIL ANYONE NOTICED', to: 1, suffix: ' WHOLE DAY', at: '@P12:whole', dur: 0.5, tone: 'bad', size: 140, w: 1000 }, { out: '@P13-0.2' });
bt('@P12', 'graphic-hero', ['q12', 'c12'], { move: 'whip', fill: 0.84, sy: 480, pose: 'chin' }); sf('@P12-0.3', 'swoosh_2', -11, 0.5); sf('@P12:long', 'clock_ticking_1', -11, 2.0);
bt('@P12:whole', 'zoom-on-number', 'c12.value', { fill: 0.46, maxH: 400, sy: 500, pose: 'shock' }); sf('@P12:whole', 'pop_2', -8, 0.4); sf('@P12:day', 'wrong_buzzer_2', -12, 0.6);
// P13 four empty hooks
el('dc13', 'datecard', R1(5) - 640, -330, '@P13-0.2', { big: 'DAY 2', small: 'A PAINTER NOTICES' }, { out: '@P14-0.2' });
el('w13', 'wall', R1(5) + 60, 40, '@P13-0.3', { w: 820, h: 760, src: MONA, goneAt: -9, hooksAt: '@P13:four', label: 'FOUR EMPTY HOOKS', labelAt: '@P13:hooks' }, { out: '@P14-0.2' });
bt('@P13', 'graphic-hero', ['dc13', 'w13'], { move: 'whip', fill: 0.72, sy: 500, pose: 'point' }); sf('@P13-0.3', 'swoosh_2', -11, 0.5);
bt('@P13:four', 'zoom-on-number', 'w13.hooks', { fill: 0.46, maxH: 700, sy: 480, pose: 'shock' }); for (let i = 0; i < 4; i++) sf(`@P13:four+${(i * 0.35).toFixed(2)}`, 'pop_2', -8, 0.3);
bt('@P13:hooks', 'graphic-hero', ['w13'], { fill: 0.5, maxH: 860, sy: 500, pose: 'point' }); sf('@P13:hooks', 'rubber_stamp_2', -6, 0.5);
// P14 shut for a week; newspapers; crowds line up to stare at the blank spot
el('nw14', 'news', R1(6) - 520, 20, '@P14-0.3', { w: 700, h: 520, head: 'EXTRA!', lines: ['LOUVRE SHUT', 'FOR A WEEK', 'THE EMPTY WALL'] }, { out: '@P15-0.2' });
el('qu14', 'queue', R1(6) + 520, 40, '@P14:crowds-0.3', { w: 1100, h: 480, n: 8, door: 'THE BLANK SPOT', capsAt: 99999 }, { out: '@P15-0.2' });
bt('@P14', 'graphic-hero', ['nw14'], { move: 'whip', fill: 0.4, maxH: 700, sy: 500, pose: 'point' }); sf('@P14-0.3', 'swoosh_2', -11, 0.5);
bt('@P14:week', 'zoom-on-number', 'nw14', { fill: 0.42, maxH: 700, sy: 500, pose: 'shock' }); sf('@P14:week', 'paper_slam_2', -10, 0.5);
bt('@P14:newspapers', 'graphic-hero', ['nw14', 'qu14'], { fill: 0.88, sy: 500, pose: 'point' }); sf('@P14:newspapers', 'page_turn_1', -9, 0.8);
bt('@P14:crowds', 'graphic-hero', ['qu14'], { fill: 0.55, maxH: 520, sy: 500, pose: 'chin' }); sf('@P14:crowds', 'crowd_murmur_auction_1', -16, 3.5);
bt('@P14:blank', 'zoom-on-number', 'qu14.door', { fill: 0.3, maxH: 480, sy: 480 });
// P15 and then nothing for over two years
el('n15', 'text', R1(7) - 520, -40, '@P15:nothing-0.3', { lines: [[['NOTHING.', 'bad']]], size: 230 }, { enter: 'slam', out: '@P16-0.2' });
el('cal15', 'calendar', R1(7) + 460, 40, '@P15:months-0.2', { head: 'SINCE THE THEFT', band: 'bad', roll: { from: 1911, to: 1913, at: '@P15:two', dur: 1.6 }, sub: 'OVER 2 YEARS · NOBODY FINDS IT', subAt: '@P15:finds', size: 220, w: 760, h: 520 }, { out: '@P16-0.2' });
bt('@P15', 'graphic-hero', ['n15'], { move: 'whip', fill: 0.5, maxH: 520, sy: 480, pose: 'chin' }); sf('@P15-0.3', 'swoosh_2', -11, 0.5); sf('@P15:nothing', 'deep_boom_2', -8, 1.0);
bt('@P15:weeks', 'graphic-hero', ['n15', 'cal15'], { fill: 0.9, sy: 480, pose: 'shrug' });
bt('@P15:two', 'zoom-on-number', 'cal15.value', { fill: 0.34, maxH: 440, sy: 500, pose: 'shock' }); sf('@P15:two', 'money_counter_1', -13, 1.6);
bt('@P15:finds', 'graphic-hero', ['n15', 'cal15'], { fill: 0.9, sy: 480, pose: 'chin' });
// P16 the reveal: it was in his apartment
el('ap16', 'photo', R1(8) - 340, 40, '@P16-0.3', { src: MONA, name: 'THE MONA LISA', role: 'IN HIS SMALL PARIS APARTMENT', credit: 'PUBLIC-DOMAIN REPRODUCTION', treatment: 'paper', fx: 0.5, fy: 0.3, w: 520, aspect: 1.3, tilt: -0.03 }, { out: '@P17-0.2' });
con('p16', 'per', R1(8) + 460, 60, '@P16:peruggia\'s-0.2', { w: 400, variant: 'card', flash: false, ring: '@P16:apartment', push: { at: '@P16:peruggia\'s', to: 1.2, dur: 3 } }, { out: '@P17-0.2' });
bt('@P16', 'graphic-hero', ['ap16'], { move: 'whip', fill: 0.34, maxH: 780, sy: 450, pose: 'shock' }); sf('@P16-0.3', 'swoosh_2', -11, 0.5); sf('@P16:most', 'heartbeat_1', -10, 2.5);
bt('@P16:peruggia\'s', 'graphic-hero', ['ap16', 'p16'], { fill: 0.82, sy: 500, pose: 'point' }); sf('@P16:peruggia\'s', 'camera_flash_1', -10, 0.6);
bt('@P16:apartment', 'zoom-on-number', 'p16', { fill: 0.3, maxH: 760, sy: 520, pose: 'shock' }); sf('@P16:apartment', 'rubber_stamp_2', -5, 0.5);
// P17 the catch: he catches himself
el('h17', 'headline', R1(9) - 480, -230, '@P17-0.3', { kicker: 'THE CATCH', lines: [[['HE CATCHES', 'paper']], [['HIMSELF.', 'bad']]], size: 150, underAt: 1.0 }, { out: '@P18-0.2' });
con('p17', 'per', R1(9) + 600, 20, '@P17-0.3', { w: 400, variant: 'card', ring: '@P17:catches', push: { at: '@P17', to: 1.25, dur: 3 }, flash: false }, { out: '@P18-0.2' });
bt('@P17', 'graphic-hero', ['h17', 'p17'], { move: 'whip', fill: 0.86, sy: 480, pose: 'chin' }); sf('@P17-0.3', 'swoosh_2', -11, 0.5);
bt('@P17:trail', 'graphic-hero', ['h17', 'p17'], { fill: 0.9, sy: 480, pose: 'shrug' });
bt('@P17:catches', 'zoom-on-number', 'h17', { fill: 0.4, maxH: 520, sy: 380, pose: 'shock' }); sf('@P17:catches', 'rubber_stamp_2', -5, 0.5); sk('@P17:catches', 10);
// P18 letter to the Florence dealer Alfredo Geri
el('dc18', 'datecard', R1(10) - 700, -330, '@P18-0.2', { big: '1913', small: 'FLORENCE, ITALY' }, { out: '@P19-0.2' });
el('m18', 'memo', R1(10) + 100, 20, '@P18-0.3', { w: 700, h: 820, to: 'ALFREDO GERI · ART DEALER', date: '1913', title: ['THE MONA LISA', 'IS FOR SALE'], titleAt: '@P18:letter' }, { out: '@P19-0.2' });
bt('@P18', 'graphic-hero', ['dc18', 'm18'], { move: 'whip', fill: 0.6, maxH: 760, sy: 450, pose: 'point' }); sf('@P18-0.3', 'swoosh_2', -11, 0.5); sf('@P18:letter', 'pen_scratch_1', -10, 1.5);
bt('@P18:letter', 'zoom-on-number', 'm18', { fill: 0.4, maxH: 740, sy: 450 }); sf('@P18:letter', 'paper_slam_2', -10, 0.5);
bt('@P18:dealer', 'graphic-hero', ['dc18', 'm18'], { fill: 0.7, maxH: 760, sy: 450, pose: 'chin' });
bt('@P18:geri', 'zoom-on-number', 'm18', { fill: 0.4, maxH: 800, sy: 500, pose: 'point' });
// P19 500,000 lire; the painting should go home to Italy
con('p19', 'per', R1(11) - 560, 80, '@P19-0.3', { w: 330, variant: 'card', flash: false, credit: '' }, { out: '@P20-0.2' });
el('c19', 'counter', R1(11) + 150, -130, '@P19:500-0.2', { label: 'HIS PRICE', to: 500000, suffix: ' LIRE', at: '@P19:500', dur: 1.2, tone: 'bad', size: 150, w: 900 }, { out: '@P20-0.2' });
el('h19', 'stamp', R1(11) + 150, 180, '@P19:home-0.1', { text: 'IT SHOULD GO HOME TO ITALY', tone: 'accent', size: 54 }, { rot: -0.03, out: '@P20-0.2' });
bt('@P19', 'graphic-hero', ['p19', 'c19'], { move: 'whip', fill: 0.8, sy: 490, pose: 'point' }); sf('@P19-0.3', 'swoosh_2', -11, 0.5);
bt('@P19:500', 'zoom-on-number', 'c19.value', { fill: 0.5, maxH: 420, sy: 480 }); sf('@P19:500', 'money_counter_2', -12, 1.4); sf('@P19:lire', 'cash_register_1', -10, 0.9);
bt('@P19:home', 'graphic-hero', ['p19', 'c19', 'h19'], { fill: 0.84, sy: 500, pose: 'chin' }); sf('@P19:home', 'rubber_stamp_2', -6, 0.5);
// P20 Geri brings in the expert: Giovanni Poggi, director of the Uffizi
el('ge20', 'card', R1(12) - 440, 40, '@P20-0.3', { w: 520, h: 300, lines: [{ t: 'ALFREDO GERI', size: 52, font: 'hero', at: '@P20:geri' }, { t: 'ART DEALER · FLORENCE', size: 24, font: 'mono', tone: 'inkSoft', at: '@P20:geri+0.1' }], pad: 100 }, { out: '@P21-0.2' });
el('po20', 'card', R1(12) + 280, 40, '@P20:expert-0.3', { w: 640, h: 380, lines: [{ t: 'THE EXPERT', size: 26, gap: 54, font: 'mono', tone: 'bad', at: '@P20:expert' }, { t: 'GIOVANNI POGGI', size: 62, font: 'hero', at: '@P20:expert+0.1' }, { t: 'DIRECTOR · UFFIZI GALLERY', size: 28, font: 'mono', tone: 'inkSoft', at: '@P20:uffizi' }], pad: 90 }, { out: '@P21-0.2' });
bt('@P20', 'graphic-hero', ['ge20'], { move: 'whip', fill: 0.3, maxH: 520, sy: 500, pose: 'point' }); sf('@P20-0.3', 'swoosh_2', -11, 0.5);
bt('@P20:expert', 'graphic-hero', ['ge20', 'po20'], { fill: 0.84, sy: 500, pose: 'point' }); sf('@P20:expert', 'pop_2', -9, 0.3);
bt('@P20:uffizi', 'zoom-on-number', 'po20', { fill: 0.38, maxH: 520, sy: 500, pose: 'chin' });
// P21 hotel meeting; looked closely; it is the real one
con('p21', 'per', R1(13) - 600, 60, '@P21-0.3', { w: 380, variant: 'card', flash: false, credit: '' }, { out: '@P22-0.2' });
el('ht21', 'tile', R1(13) - 150, -240, '@P21:hotel-0.3', { icon: 'index', caption: 'HIS HOTEL', w: 260, h: 290, iconS: 140, tilt: -0.03 }, { out: '@P22-0.2' });
el('ph21', 'photo', R1(13) + 400, 40, '@P21:painting-0.2', { src: MONA, name: 'THE PAINTING', role: 'EXAMINED CLOSELY', credit: 'PUBLIC-DOMAIN REPRODUCTION', fx: 0.5, fy: 0.3, w: 460, aspect: 1.3, tilt: 0.03 }, { out: '@P22-0.2' });
el('st21', 'stamp', R1(13) + 400, 120, '@P21:real-0.1', { text: 'THE REAL ONE', tone: 'good', size: 88 }, { rot: -0.06, out: '@P22-0.2' });
bt('@P21', 'graphic-hero', ['p21', 'ht21'], { move: 'whip', fill: 0.62, sy: 500, pose: 'point' }); sf('@P21-0.3', 'swoosh_2', -11, 0.5);
bt('@P21:look', 'graphic-hero', ['p21', 'ph21'], { fill: 0.82, sy: 500, pose: 'chin' }); sf('@P21:look', 'camera_flash_1', -10, 0.6);
bt('@P21:real', 'zoom-on-number', ['ph21', 'st21'], { fill: 0.36, maxH: 800, sy: 520, pose: 'shock' }); sf('@P21:real', 'rubber_stamp_2', -5, 0.5); sf('@P21:real', 'ding_2', -10, 0.7); sk('@P21:real', 10);
// P22 "we'll take it to be checked", then arrested at his hotel mid-December 1913
con('p22', 'per', R1(14) - 300, 40, '@P22:police-0.4', { w: 420, variant: 'card', flash: false, credit: '', stamps: [{ text: 'ARRESTED', at: '@P22:arrest', tone: 'bad', size: 74, rot: -0.1, y: 40 }] }, { out: '@P23-0.2' });
el('dc22', 'datecard', R1(14) + 460, -330, '@P22:december-0.3', { big: 'DEC 1913', small: 'AT HIS HOTEL' }, { out: '@P23-0.2' });
el('cf22', 'tile', R1(14) + 540, 100, '@P22:arrest-0.2', { icon: 'cuffs', caption: 'POLICE', w: 280, h: 310, iconS: 160 }, { out: '@P23-0.2' });
bt('@P22', 'graphic-hero', ['p22'], { move: 'whip', fill: 0.3, maxH: 760, sy: 500, pose: 'chin' }); sf('@P22-0.3', 'swoosh_2', -11, 0.5);
bt('@P22:december', 'graphic-hero', ['p22', 'dc22'], { fill: 0.84, sy: 480, pose: 'point' });
bt('@P22:arrest', 'zoom-on-number', 'p22', { fill: 0.3, maxH: 760, sy: 520, pose: 'shock' }); sf('@P22:arrest', 'handcuff_click_1', -6, 0.8); sf('@P22:arrest', 'rubber_stamp_2', -6, 0.5); sk('@P22:arrest', 12);
// P23 verdict: one year and 15 days; for Italy; served less than a year
con('p23', 'per', R1(15) - 520, 40, '@P23-0.3', { w: 420, variant: 'card', bars: '@P23:sentenced', stamps: [{ text: 'FLORENCE 1914', at: '@P23:court', tone: 'bad', size: 50, rot: -0.1, y: 60 }], push: { at: '@P23', to: 1.2, dur: 5 }, flash: false }, { out: '@P24-0.2' });
el('y23', 'counter', R1(15) + 260, -130, '@P23:one-0.2', { label: 'SENTENCED TO', to: 1, suffix: ' YEAR + 15 DAYS', at: '@P23:one', dur: 0.6, tone: 'bad', size: 110, w: 1000 }, { out: '@P24-0.2' });
el('i23', 'text', R1(15) + 260, 120, '@P23:said-0.1', { lines: [[['“I DID IT FOR ', 'paper'], ['ITALY', 'good'], ['”', 'paper']]], size: 76 }, { out: '@P24-0.2' });
el('s23', 'stamp', R1(15) + 260, 280, '@P23:less-0.1', { text: 'SERVED: LESS THAN A YEAR', tone: 'accent', size: 58 }, { rot: -0.03, out: '@P24-0.2' });
bt('@P23', 'graphic-hero', ['p23', 'y23'], { move: 'whip', fill: 0.8, sy: 490, pose: 'point' }); sf('@P23-0.3', 'swoosh_2', -11, 0.5);
bt('@P23:court', 'zoom-on-number', 'p23', { fill: 0.28, maxH: 760, sy: 500, pose: 'shock' }); sf('@P23:court', 'gavel_1', -5, 0.8); sf('@P23:sentenced-0.1', 'cell_door_1', -7, 1.2); sk('@P23:court', 10);
bt('@P23:one', 'zoom-on-number', 'y23.value', { fill: 0.42, maxH: 400, sy: 480 }); sf('@P23:one', 'deep_boom_1', -7, 1.0);
bt('@P23:said', 'graphic-hero', ['p23', 'y23', 'i23'], { fill: 0.84, sy: 500, pose: 'chin' });
bt('@P23:ended', 'graphic-hero', ['p23', 'i23', 's23'], { fill: 0.86, sy: 500, pose: 'shrug' }); sf('@P23:less', 'rubber_stamp_2', -6, 0.5);
// P24 famous -> the most famous
el('a24', 'photo', R1(16) - 460, 60, '@P24-0.3', { src: MONA, name: 'BEFORE THE THEFT', role: 'FAMOUS', credit: 'PUBLIC-DOMAIN REPRODUCTION', fx: 0.5, fy: 0.3, w: 340, aspect: 1.3, tilt: -0.03 }, { out: '@P25-0.2' });
el('b24', 'photo', R1(16) + 330, 20, '@P24:after-0.3', { src: MONA, name: 'AFTER THE THEFT', role: 'THE MOST FAMOUS PAINTING', credit: 'PUBLIC-DOMAIN REPRODUCTION', fx: 0.5, fy: 0.3, w: 560, aspect: 1.3, tilt: 0.03 }, { out: '@P25-0.2' });
el('ar24', 'icon', R1(16) - 60, 60, '@P24:after-0.1', { kind: 'chart', s: 200, col: 'accent' }, { out: '@P25-0.2' });
bt('@P24', 'graphic-hero', ['a24'], { move: 'whip', fill: 0.26, maxH: 800, sy: 500, pose: 'chin' }); sf('@P24-0.3', 'swoosh_2', -11, 0.5);
bt('@P24:before', 'graphic-hero', ['a24'], { fill: 0.3, maxH: 800, sy: 500, pose: 'point' });
bt('@P24:after', 'graphic-hero', ['a24', 'b24', 'ar24'], { fill: 0.9, sy: 500, pose: 'point' }); sf('@P24:after', 'pop_2', -9, 0.3);
bt('@P24:most', 'zoom-on-number', 'b24', { fill: 0.34, maxH: 800, sy: 470, pose: 'shock' }); sf('@P24:most', 'camera_flash_1', -9, 0.6); sk('@P24:most', 8);
// P25 LIKE moment
el('heart', 'heart', 1620, 760, '@P25:like-0.15', { s: 64 }, { layer: 'screen', out: '@P25:like+1.5' });
sf('@P25:like-0.1', 'pop_2', -8, 0.3); sf('@P25:like+0.35', 'ding_2', -11, 0.7);
el('lk25', 'stamp', R1(17), 40, '@P25-0.3', { text: 'CAUGHT BY HIS OWN LETTER', tone: 'good', size: 100 }, { rot: -0.03, out: '@P26-0.2' });
bt('@P25', 'graphic-hero', 'lk25', { move: 'whip', fill: 0.6, sy: 500, pose: 'shock' }); sf('@P25-0.3', 'swoosh_2', -11, 0.5);
bt('@P25:letter', 'graphic-hero', 'lk25', { fill: 0.7, sy: 500, pose: 'point' });
// ---------------- CH2 · THE VERMEER FORGER (P26-P45) — Dutch amber room, van Meegeren ----------------
const R2 = k => K(RM[2], k);
// P26 chapter card + case file
el('ch2', 'headline', R2(0) - 400, 40, '@P26-0.3', { kicker: 'CHAPTER TWO', lines: ['THE VERMEER', [['FORGER', 'bad']]], size: 150, underAt: 1.0 }, { out: '@P27-0.2' });
con('m1', 'mee', R2(0) + 580, 50, '@P26-0.2', { w: 440, variant: 'card', file: true, caseNo: 'CASE Nº 2', push: { at: '@P26', to: 1.12, dur: 3 } }, { out: '@P27-0.2' });
bt('@P26', 'graphic-hero', ['ch2', 'm1'], { move: 'whip', dur0: 0.7, fill: 0.84, sy: 480, pose: 'shrug', arc: 0.2 }); sf('@P26-0.6', 'tape_stop_1', -8, 1.0); sf('@P26-0.1', 'cinematic_hit_1', -9, 1.5); sf('@P26+0.9', 'camera_flash_1', -9, 0.6); sk('@P26+0.7', 8);
bt('@P26:forger', 'zoom-on-number', 'm1', { fill: 0.3, maxH: 760, sy: 520, pose: 'point' });
// P27 the pitch: a painter the critics ignore
el('dc27', 'datecard', R2(1) - 700, -330, '@P27-0.2', { big: '1930s', small: 'THE NETHERLANDS' }, { out: '@P28-0.2' });
con('m27', 'mee', R2(1) - 100, 40, '@P27-0.3', { w: 900, variant: 'side', quote: ['IGNORED', 'BY THE', 'CRITICS.'], quoteSub: 'A DUTCH PAINTER', quoteSize: 78, quoteAt: '@P27:critics-0.2', noquote: true, aspect: 0.66, pw: 400 }, { out: '@P28-0.2' });
bt('@P27', 'graphic-hero', ['dc27', 'm27'], { move: 'whip', fill: 0.62, sy: 500, pose: 'point' }); sf('@P27-0.3', 'swoosh_2', -11, 0.5); sf('@P27-0.1', 'camera_flash_1', -10, 0.6);
bt('@P27:dutch', 'zoom-on-number', 'm27', { fill: 0.5, maxH: 740, sy: 500 });
bt('@P27:critics', 'graphic-hero', ['m27'], { fill: 0.6, maxH: 800, sy: 500, pose: 'shrug' }); sf('@P27:critics', 'typewriter_2', -11, 1.2);
// P28 the target: Vermeer, 1600s
el('v28', 'card', R2(2) - 200, 20, '@P28:target-0.3', { w: 700, h: 400, lines: [{ t: 'THE TARGET', size: 28, gap: 54, font: 'mono', tone: 'bad', at: '@P28:target' }, { t: 'JOHANNES VERMEER', size: 70, font: 'hero', at: '@P28:johannes' }, { t: 'DUTCH MASTER · 1600s', size: 32, font: 'mono', tone: 'inkSoft', at: '@P28:dutch' }], pad: 100 }, { out: '@P29-0.2' });
con('m28', 'mee', R2(2) + 560, 280, '@P28:picks-0.2', { w: 250, variant: 'pip', label: 'HE PICKS', flash: false, arrow: { at: '@P28:target', to: [-210, -150] } }, { out: '@P29-0.2' });
bt('@P28', 'graphic-hero', ['v28', 'm28'], { move: 'whip', fill: 0.8, sy: 500, pose: 'point' }); sf('@P28-0.3', 'swoosh_2', -11, 0.5);
bt('@P28:target', 'zoom-on-number', 'v28', { fill: 0.5, maxH: 520, sy: 500, pose: 'chin' }); sf('@P28:target', 'rubber_stamp_2', -8, 0.5);
bt('@P28:dutch', 'graphic-hero', ['v28', 'm28'], { fill: 0.82, sy: 500, pose: 'point' });
// P29 only a few dozen real ones: a new one is buried treasure
el('g29', 'gallery', R2(3) - 200, 20, '@P29-0.3', { w: 1500, h: 520, head: 'REAL VERMEERS KNOWN: ONLY A FEW DOZEN', items: [0, 1, 2, 3].map(i => ({ label: 'REAL VERMEER', at: `@P29:few+${(i * 0.2).toFixed(2)}` })) }, { out: '@P30-0.2' });
el('t29', 'tile', R2(3) + 860, 40, '@P29:treasure-0.5', { icon: 'cash', caption: 'BURIED TREASURE', cap: 28, w: 340, h: 380, iconS: 190, tilt: 0.04 }, { out: '@P30-0.2' });
bt('@P29', 'graphic-hero', ['g29'], { move: 'whip', fill: 0.8, sy: 500, pose: 'point' }); sf('@P29-0.3', 'swoosh_2', -11, 0.5);
bt('@P29:few', 'zoom-on-number', 'g29', { fill: 0.8, maxH: 640, sy: 500, pose: 'chin' }); for (let i = 0; i < 4; i++) sf(`@P29:few+${(i * 0.2).toFixed(2)}`, 'pop_2', -9, 0.3);
bt('@P29:new', 'graphic-hero', ['g29', 't29'], { fill: 0.95, sy: 500, pose: 'point' });
bt('@P29:treasure', 'zoom-on-number', 't29', { fill: 0.22, maxH: 520, sx: 1100, sy: 500, pose: 'shock' }); sf('@P29:treasure', 'coins_drop_1', -10, 1.0);
// P30 the trick: paints in Vermeer's style, sells as lost Vermeers
el('ph30', 'photo', R2(4) - 640, 20, '@P30:paints-0.3', { src: 'brand/photos/han-van-meegeren/2.jpg', name: 'HIS OWN PAINTING', role: 'IN VERMEER\'S STYLE', credit: 'HAN VAN MEEGEREN · CC BY-SA 3.0 (WIKIMEDIA)', fx: 0.5, fy: 0.4, w: 600, aspect: 0.8, tilt: -0.02 }, { out: '@P31-0.2' });
el('s30', 'card', R2(4) + 140, 20, '@P30:sells-0.3', { w: 520, h: 440, lines: [{ t: '2', size: 130, tone: 'bad', at: '@P30:sells' }, { t: 'SELL THEM AS', size: 44, at: '@P30:sells+0.1' }, { t: '“LOST VERMEERS”', size: 52, tone: 'bad', at: '@P30:lost' }, { t: 'JUST DISCOVERED', size: 30, font: 'mono', tone: 'inkSoft', at: '@P30:discovered' }], pad: 90 }, { out: '@P31-0.2' });
el('n30', 'card', R2(4) - 640, -430, '@P30:paints-0.1', { w: 340, h: 110, lines: [{ t: '1  PAINT NEW ONES', size: 36, tone: 'bad', at: '@P30:paints' }], pad: 55 }, { out: '@P31-0.2' });
con('m30', 'mee', R2(4) + 660, 330, '@P30:van-0.2', { w: 250, variant: 'pip', label: 'HE DID THIS', flash: false, arrow: { at: '@P30:sells', to: [-250, -180] } }, { out: '@P31-0.2' });
bt('@P30', 'graphic-hero', ['ph30', 'n30'], { move: 'whip', fill: 0.4, maxH: 940, sy: 500, pose: 'point' }); sf('@P30-0.3', 'swoosh_2', -11, 0.5);
bt('@P30:paints', 'zoom-on-number', 'ph30', { fill: 0.34, maxH: 900, sy: 540 }); sf('@P30:paints', 'paper_slam_2', -10, 0.5);
bt('@P30:sells', 'graphic-hero', ['ph30', 's30', 'm30'], { fill: 0.84, sy: 500, pose: 'point' }); sf('@P30:sells', 'pop_2', -8, 0.3);
bt('@P30:lost', 'zoom-on-number', 's30', { fill: 0.3, maxH: 520, sy: 500, pose: 'chin' }); sf('@P30:lost', 'rubber_stamp_2', -8, 0.5);
// P31 the art world believes him
el('g31', 'gallery', R2(5) - 100, 40, '@P31-0.3', { w: 1300, h: 520, head: 'THE ART WORLD BELIEVES HIM', items: [{ label: 'LOST VERMEER', at: '@P31:experts' }, { label: 'LOST VERMEER', at: '@P31:museums' }, { label: 'LOST VERMEER', at: '@P31:buy' }] }, { out: '@P32-0.2' });
el('x31', 'victim', R2(5) - 960, 40, '@P31:believes-0.2', { kind: 'collector', label: 'THE EXPERTS', sub: 'BELIEVED HIM', w: 340, h: 440, reactAt: '@P31:museums', tape: 'EXPERTS' }, { out: '@P32-0.2' });
bt('@P31', 'graphic-hero', ['g31'], { move: 'whip', fill: 0.78, sy: 500, pose: 'point' }); sf('@P31-0.3', 'swoosh_2', -11, 0.5);
bt('@P31:believes', 'graphic-hero', ['x31', 'g31'], { fill: 0.9, sy: 500, pose: 'chin' });
bt('@P31:experts', 'zoom-on-number', 'g31', { fill: 0.7, maxH: 560, sy: 500 }); sf('@P31:experts', 'pop_2', -9, 0.3); sf('@P31:museums', 'pop_2', -9, 0.3); sf('@P31:buy', 'cash_register_1', -10, 0.9);
// P32 then it gets dangerous
el('d32', 'text', R2(6), -20, '@P32-0.3', { lines: [[['THEN IT GETS ', 'paper'], ['DANGEROUS', 'bad']]], size: 150 }, { enter: 'slam', out: '@P33-0.2' });
bt('@P32', 'graphic-hero', 'd32', { move: 'whip', fill: 0.8, maxH: 340, sy: 470, pose: 'shock' }); sf('@P32-0.3', 'swoosh_2', -11, 0.5); sf('@P32:dangerous', 'dramatic_sting_1', -8, 1.5); sk('@P32:dangerous', 12);
bt('@P32:dangerous', 'zoom-on-number', 'd32', { fill: 0.86, maxH: 300, sy: 470, pose: 'shock' });
// P33 1943, German occupation, fake sold via a dealer to Goering (TEXT ONLY: no portrait, no symbols)
el('dc33', 'datecard', R2(7) - 760, -330, '@P33-0.2', { big: '1943', small: 'GERMAN OCCUPATION' }, { out: '@P34-0.2' });
el('f33', 'flow', R2(7) + 100, 60, '@P33-0.3', { w: 1500, h: 360, items: [{ id: 'a', icon: 'person', label: 'VAN MEEGEREN', tone: 'paper', at: '@P33:fakes', size: 24 }, { id: 'b', icon: 'handshake', label: 'A DEALER', tone: 'paper', at: '@P33:dealer', size: 30 }, { id: 'c', icon: 'dollar', label: 'GOERING', tone: 'bad', at: '@P33:hermann', size: 32 }] }, { out: '@P34-0.2' });
el('g33', 'card', R2(7) + 100, 340, '@P33:nazi-0.4', { w: 760, h: 150, lines: [{ t: 'HERMANN GOERING · A NAZI LEADER', size: 40, tone: 'bad', at: '@P33:nazi' }], pad: 76 }, { out: '@P34-0.2' });
con('m33', 'mee', R2(7) - 620, 380, '@P33:fakes-0.2', { w: 230, variant: 'pip', label: 'HIS FAKE', flash: false }, { out: '@P34-0.2' });
bt('@P33', 'graphic-hero', ['dc33', 'f33'], { move: 'whip', fill: 0.72, sy: 500, pose: 'point' }); sf('@P33-0.3', 'swoosh_2', -11, 0.5);
bt('@P33:fakes', 'graphic-hero', ['f33', 'm33'], { fill: 0.86, sy: 480, pose: 'point' }); sf('@P33:fakes', 'pop_2', -9, 0.3); sf('@P33:dealer', 'pop_2', -9, 0.3);
bt('@P33:hermann', 'zoom-on-number', 'f33.c', { fill: 0.22, maxH: 520, sy: 460, pose: 'shock' }); sf('@P33:hermann', 'pop_2', -8, 0.4);
bt('@P33:nazi', 'graphic-hero', ['f33', 'g33'], { fill: 0.7, sy: 560, pose: 'chin' }); sf('@P33:nazi', 'rubber_stamp_2', -8, 0.5); sk('@P33:nazi', 8);
// P34 the price: 1.65 million guilders (Dutch money) - a fortune
el('c34', 'counter', R2(8) - 100, -80, '@P34:price-0.2', { label: 'THE PRICE', sub: 'GUILDERS WERE DUTCH MONEY', to: 1.65, decimals: 2, suffix: ' MILLION', at: '@P34:1', dur: 1.2, tone: 'bad', size: 170, w: 1100 }, { out: '@P35-0.2' });
el('f34', 'stamp', R2(8) - 100, 250, '@P34:fortune-0.2', { text: 'A FORTUNE', tone: 'accent', size: 90 }, { rot: -0.04, out: '@P35-0.2' });
bt('@P34', 'graphic-hero', ['c34'], { move: 'whip', fill: 0.58, sy: 480, pose: 'point' }); sf('@P34-0.3', 'swoosh_2', -11, 0.5);
bt('@P34:1', 'zoom-on-number', 'c34.value', { fill: 0.5, maxH: 440, sy: 480, pose: 'shock' }); sf('@P34:1', 'money_counter_2', -12, 1.4); sf('@P34:million', 'cash_register_1', -9, 0.9); sk('@P34:million', 10);
bt('@P34:guilders', 'graphic-hero', ['c34'], { fill: 0.6, sy: 480, pose: 'chin' });
bt('@P34:fortune', 'graphic-hero', ['c34', 'f34'], { fill: 0.7, sy: 500, pose: 'shock' }); sf('@P34:fortune', 'rubber_stamp_2', -6, 0.5);
// P35 1945: found in Goering's collection, traced to van Meegeren
el('t35', 'timeline', R2(9) - 380, 40, '@P35-0.3', { w: 900, step: 180, items: [{ id: 'i0', date: '1945', label: 'THE WAR IS OVER', at: '@P35:1945', tone: 'accent' }, { id: 'i1', date: 'INVESTIGATORS', label: 'FIND IT IN GOERING\'S COLLECTION', at: '@P35:find', tone: 'accent' }, { id: 'i2', date: 'THE TRAIL', label: 'LEADS TO VAN MEEGEREN', at: '@P35:trace', tone: 'bad' }] }, { out: '@P36-0.2' });
con('m35', 'mee', R2(9) + 640, 40, '@P35:trace-0.3', { w: 400, variant: 'card', ring: '@P35:meegeren', flash: false, credit: '' }, { out: '@P36-0.2' });
bt('@P35', 'graphic-hero', ['t35'], { move: 'whip', fill: 0.5, maxH: 640, sy: 500, pose: 'point' }); sf('@P35-0.3', 'swoosh_2', -11, 0.5);
bt('@P35:find', 'zoom-on-number', 't35.i1', { fill: 0.4, maxH: 300, sy: 500 }); sf('@P35:find', 'page_turn_1', -10, 0.8);
bt('@P35:trace', 'graphic-hero', ['t35', 'm35'], { fill: 0.9, sy: 500, pose: 'point' }); sf('@P35:trace', 'camera_flash_1', -10, 0.6);
bt('@P35:meegeren', 'zoom-on-number', 'm35', { fill: 0.3, maxH: 760, sy: 520, pose: 'shock' }); sf('@P35:meegeren', 'rubber_stamp_2', -5, 0.5);
// P36 national treasure to the enemy; arrested and charged with collaboration
con('m36', 'mee', R2(10) - 480, 40, '@P36-0.3', { w: 420, variant: 'card', flash: false, credit: '', stamps: [{ text: 'COLLABORATION', at: '@P36:collaboration', tone: 'bad', size: 46, rot: -0.1, y: 50 }] }, { out: '@P37-0.2' });
el('e36', 'text', R2(10) + 280, -110, '@P36:treasure-0.2', { lines: [[['A DUTCH ', 'paper'], ['NATIONAL TREASURE', 'gold']], [['SOLD TO ', 'paper'], ['THE ENEMY', 'bad']]], size: 60 }, { out: '@P37-0.2' });
el('c36', 'tile', R2(10) + 160, 190, '@P36:arrested-0.2', { icon: 'cuffs', caption: 'ARRESTED', w: 270, h: 300, iconS: 150, tilt: -0.03 }, { out: '@P37-0.2' });
el('d36', 'card', R2(10) + 560, 200, '@P36:means-0.2', { w: 540, h: 230, lines: [{ t: 'COLLABORATION =', size: 36, tone: 'bad', at: '@P36:means' }, { t: 'HELPING THE ENEMY', size: 42, at: '@P36:helping' }], pad: 70 }, { out: '@P37-0.2' });
bt('@P36', 'graphic-hero', ['m36'], { move: 'whip', fill: 0.3, maxH: 760, sy: 500, pose: 'chin' }); sf('@P36-0.3', 'swoosh_2', -11, 0.5);
bt('@P36:treasure', 'graphic-hero', ['m36', 'e36'], { fill: 0.84, sy: 480, pose: 'point' });
bt('@P36:arrested', 'graphic-hero', ['m36', 'e36', 'c36'], { fill: 0.88, sy: 500, pose: 'shock' }); sf('@P36:arrested', 'handcuff_click_1', -7, 0.8);
bt('@P36:collaboration', 'zoom-on-number', 'm36', { fill: 0.28, maxH: 760, sy: 520, pose: 'shock' }); sf('@P36:collaboration', 'rubber_stamp_2', -5, 0.5); sk('@P36:collaboration', 10);
bt('@P36:means', 'graphic-hero', ['m36', 'd36'], { fill: 0.84, sy: 500, pose: 'chin' });
// P37 how do you get out of that? confess to something smaller
el('q37', 'text', R2(11) - 520, 0, '@P37-0.3', { lines: [[['?', 'accent']]], size: 440 }, { out: '@P38-0.2' });
el('h37', 'headline', R2(11) + 280, 20, '@P37:confess-0.3', { kicker: 'THE WAY OUT', lines: [[['CONFESS TO', 'paper']], [['SOMETHING', 'paper']], [['SMALLER.', 'bad']]], size: 130, underAt: 0.9 }, { out: '@P38-0.2' });
bt('@P37', 'graphic-hero', ['q37'], { move: 'whip', fill: 0.3, maxH: 640, sy: 480, pose: 'shrug' }); sf('@P37-0.3', 'swoosh_2', -11, 0.5);
bt('@P37:confess', 'graphic-hero', ['q37', 'h37'], { fill: 0.82, sy: 480, pose: 'point' }); sf('@P37:confess', 'typewriter_2', -11, 1.2);
bt('@P37:smaller', 'zoom-on-number', 'h37', { fill: 0.4, maxH: 520, sy: 480, pose: 'shock' }); sf('@P37:smaller', 'rubber_stamp_2', -5, 0.5);
// P38 the confession: "I painted it myself"
con('m38', 'mee', R2(12) - 150, 40, '@P38-0.3', { w: 900, variant: 'side', quote: ['“I DIDN\'T SELL', 'A TREASURE.', 'I PAINTED IT', 'MYSELF.”'], quoteSize: 56, quoteAt: '@P38:says', noquote: true, aspect: 0.66, pw: 400 }, { out: '@P39-0.2' });
bt('@P38', 'graphic-hero', ['m38'], { move: 'whip', fill: 0.62, maxH: 800, sy: 500, pose: 'point' }); sf('@P38-0.3', 'swoosh_2', -11, 0.5); sf('@P38-0.1', 'camera_flash_1', -10, 0.6);
bt('@P38:says', 'zoom-on-number', 'm38', { fill: 0.52, maxH: 760, sy: 500 }); sf('@P38:says', 'typewriter_2', -11, 1.5);
bt('@P38:painted', 'graphic-hero', ['m38'], { fill: 0.62, maxH: 800, sy: 500, pose: 'shock' });
// P39 nobody believes him: the experts had already called them real
for (let i = 0; i < 2; i++) el('x39' + i, 'victim', R2(13) - 500 + i * 400, 40, `@P39:nobody+${(i * 0.2).toFixed(2)}`, { kind: 'collector', label: 'THE EXPERTS', sub: 'ALREADY SAID: REAL', w: 340, h: 440, suit: ['#2F5DA8', '#8A3FD1'][i], reactAt: '@P39:believes', tape: 'EXPERTS' }, { out: '@P40-0.2' });
el('s39', 'stamp', R2(13) + 480, 40, '@P39:believes-0.1', { text: 'NOBODY BELIEVES HIM', tone: 'bad', size: 70 }, { rot: -0.05, out: '@P40-0.2' });
el('r39', 'stamp', R2(13) + 480, 250, '@P39:real-0.1', { text: 'REAL (SAID THE EXPERTS)', tone: 'accent', size: 44 }, { rot: 0.03, out: '@P40-0.2' });
bt('@P39', 'graphic-hero', ['x390', 'x391'], { move: 'whip', fill: 0.52, sy: 500, pose: 'chin' }); sf('@P39-0.3', 'swoosh_2', -11, 0.5);
bt('@P39:believes', 'graphic-hero', ['x390', 'x391', 's39'], { fill: 0.86, sy: 500, pose: 'shrug' }); sf('@P39:believes', 'rubber_stamp_2', -6, 0.5); sf('@P39:believes', 'wrong_buzzer_2', -12, 0.6);
bt('@P39:real', 'graphic-hero', ['s39', 'r39'], { fill: 0.5, sx: 1000, sy: 500, pose: 'point' });
// P40 he paints one more, with officials watching
el('ph40', 'photo', R2(14) - 200, 20, '@P40-0.3', { src: 'brand/photos/han-van-meegeren/4.jpg', name: 'HE PAINTS ONE MORE', role: 'WHILE OFFICIALS WATCH · OCT 1945', credit: 'PHOTO: KOOS RAUCAMP / ANEFO · CC BY 4.0', fx: 0.6, fy: 0.5, w: 900, aspect: 0.7, tilt: -0.02 }, { out: '@P41-0.2' });
el('t40', 'tile', R2(14) + 560, -200, '@P40:paint-0.2', { icon: 'labels', caption: 'PAINT + CANVAS', cap: 26, w: 300, h: 320, iconS: 150, tilt: 0.04 }, { out: '@P41-0.2' });
el('o40', 'victim', R2(14) + 560, 240, '@P40:officials-0.3', { kind: 'investor', label: 'OFFICIALS', sub: 'WATCHING', w: 300, h: 380, tape: 'OFFICIALS', reactAt: '@P40:brand' }, { out: '@P41-0.2' });
bt('@P40', 'graphic-hero', ['ph40'], { move: 'whip', fill: 0.5, maxH: 900, sy: 500, pose: 'point' }); sf('@P40-0.3', 'swoosh_2', -11, 0.5);
bt('@P40:paint', 'graphic-hero', ['ph40', 't40'], { fill: 0.78, sy: 500, pose: 'point' }); sf('@P40:paint', 'pop_2', -9, 0.3);
bt('@P40:officials', 'graphic-hero', ['ph40', 'o40'], { fill: 0.84, sy: 500, pose: 'chin' }); sf('@P40:officials', 'pop_2', -9, 0.3);
bt('@P40:brand', 'zoom-on-number', 'ph40', { fill: 0.42, maxH: 940, sy: 520, pose: 'shock' }); sf('@P40:brand', 'camera_flash_1', -9, 0.6); sf('@P40:brand', 'pen_scratch_1', -12, 1.5);
// P41 the charge changes: not a traitor, a forger
con('m41', 'mee', R2(15) - 500, 40, '@P41-0.3', { w: 420, variant: 'card', flash: false, credit: '', ring: '@P41:forger' }, { out: '@P42-0.2' });
el('a41', 'stamp', R2(15) + 300, -150, '@P41:traitor-0.1', { text: 'NOT A TRAITOR', tone: 'good', size: 80 }, { rot: -0.05, out: '@P42-0.2' });
el('b41', 'stamp', R2(15) + 300, 130, '@P41:forger-0.1', { text: 'A FORGER', tone: 'bad', size: 120 }, { rot: 0.04, out: '@P42-0.2' });
bt('@P41', 'graphic-hero', ['m41', 'a41'], { move: 'whip', fill: 0.84, sy: 480, pose: 'point' }); sf('@P41-0.3', 'swoosh_2', -11, 0.5);
bt('@P41:traitor', 'zoom-on-number', 'a41', { fill: 0.4, maxH: 300, sx: 1100, sy: 440, pose: 'chin' }); sf('@P41:traitor', 'rubber_stamp_2', -7, 0.5);
bt('@P41:forger', 'graphic-hero', ['m41', 'a41', 'b41'], { fill: 0.88, sy: 500, pose: 'shock' }); sf('@P41:forger', 'rubber_stamp_2', -4, 0.5); sk('@P41:forger', 10);
// P42 verdict 1947
con('m42', 'mee', R2(16) - 520, 40, '@P42-0.3', { w: 420, variant: 'card', bars: '@P42:sentenced', stamps: [{ text: 'CONVICTED 1947', at: '@P42:convicted', tone: 'bad', size: 46, rot: -0.1, y: 60 }], push: { at: '@P42', to: 1.2, dur: 5 }, flash: false }, { out: '@P43-0.2' });
el('y42', 'counter', R2(16) + 260, -120, '@P42:sentenced-0.1', { label: 'SENTENCED TO', sub: 'FOR FORGERY AND FRAUD', to: 1, suffix: ' YEAR IN PRISON', at: '@P42:one', dur: 0.6, tone: 'bad', size: 110, w: 1000 }, { out: '@P43-0.2' });
bt('@P42', 'graphic-hero', ['m42', 'y42'], { move: 'whip', fill: 0.8, sy: 490, pose: 'point' }); sf('@P42-0.3', 'swoosh_2', -11, 0.5);
bt('@P42:convicted', 'zoom-on-number', 'm42', { fill: 0.28, maxH: 760, sy: 500, pose: 'shock' }); sf('@P42:convicted', 'gavel_1', -5, 0.8); sk('@P42:convicted', 10);
bt('@P42:sentenced', 'graphic-hero', ['m42', 'y42'], { fill: 0.84, sy: 500, pose: 'chin' }); sf('@P42:sentenced-0.1', 'cell_door_1', -7, 1.2);
bt('@P42:one', 'zoom-on-number', 'y42.value', { fill: 0.42, maxH: 400, sy: 480 }); sf('@P42:one', 'deep_boom_1', -7, 1.0);
// P43 weeks later he dies before he serves it
con('m43', 'mee', R2(17) - 350, 40, '@P43-0.3', { w: 420, variant: 'card', mono: true, flash: false, credit: '', stamps: [{ text: 'NEVER SERVED IT', at: '@P43:serves', tone: 'bad', size: 46, rot: -0.1, y: 50 }] }, { out: '@P44-0.2' });
el('d43', 'datecard', R2(17) + 380, -100, '@P43-0.2', { big: 'WEEKS LATER', small: 'AFTER THE VERDICT' }, { out: '@P44-0.2' });
bt('@P43', 'graphic-hero', ['m43', 'd43'], { move: 'whip', fill: 0.84, sy: 500, pose: 'chin' }); sf('@P43-0.3', 'swoosh_2', -11, 0.5); sf('@P43:later', 'suspense_drone_1', -16, 3.5);
bt('@P43:serves', 'zoom-on-number', 'm43', { fill: 0.28, maxH: 760, sy: 520, pose: 'shock' }); sf('@P43:serves', 'rubber_stamp_2', -5, 0.5);
// P44 the experts couldn't spot his fakes; the only proof was to watch him paint one
el('g44', 'gallery', R2(18) - 100, 30, '@P44-0.3', { w: 1400, h: 520, head: 'THE EXPERTS COULD NOT TELL', fakeAt: '@P44:fake', items: [0, 1, 2, 3].map(i => ({ label: 'EXPERT: REAL', at: `@P44:experts+${(i * 0.15).toFixed(2)}` })) }, { out: '@P45-0.2' });
con('m44', 'mee', R2(18) + 760, 360, '@P44:watch-0.2', { w: 270, variant: 'pip', label: 'WATCH HIM PAINT ONE', flash: false, arrow: { at: '@P44:watch', to: [-250, -170] } }, { out: '@P45-0.2' });
bt('@P44', 'graphic-hero', ['g44'], { move: 'whip', fill: 0.8, sy: 500, pose: 'chin' }); sf('@P44-0.3', 'swoosh_2', -11, 0.5);
bt('@P44:fake', 'zoom-on-number', 'g44', { fill: 0.82, maxH: 640, sy: 500, pose: 'shock' }); for (let i = 0; i < 4; i++) sf(`@P44:fake+${(i * 0.12).toFixed(2)}`, 'rubber_stamp_2', -9, 0.5); sk('@P44:fake', 10);
bt('@P44:watch', 'graphic-hero', ['g44', 'm44'], { fill: 0.95, sy: 500, pose: 'point' }); sf('@P44:watch', 'pop_2', -8, 0.3);
// P45 SEND moment
el('plane', 'plane', 1690, 930, '@P45:send-0.05', { dx: 190, dy: -330 }, { layer: 'screen', out: '@P45:send+1.5' });
sf('@P45:send-0.05', 'swoosh_2', -9, 1.0);
el('sd45', 'stamp', R2(19), 40, '@P45-0.3', { text: 'SEND THIS ONE TO THAT FRIEND', tone: 'accent', size: 90 }, { rot: -0.03, out: '@P46-0.2' });
bt('@P45', 'graphic-hero', 'sd45', { move: 'whip', fill: 0.7, sy: 500, pose: 'shock' }); sf('@P45-0.3', 'swoosh_2', -11, 0.5);
bt('@P45:send', 'graphic-hero', 'sd45', { fill: 0.76, sy: 500, pose: 'point' });
// ---------------- CH3 · THE FAKE DIARIES (P46-P60) — violet-ink room, Kujau. NO Hitler image, NO symbols: plain black notebooks, F H initials ----------------
const R3 = k => K(RM[3], k);
// P46 chapter card + case file
el('ch3', 'headline', R3(0) - 400, 40, '@P46-0.3', { kicker: 'CHAPTER THREE', lines: ['THE FAKE', [['DIARIES', 'bad']]], size: 150, underAt: 1.0 }, { out: '@P47-0.2' });
con('u1', 'kuj', R3(0) + 560, 50, '@P46-0.2', { w: 380, variant: 'card', file: true, caseNo: 'CASE Nº 3', push: { at: '@P46', to: 1.1, dur: 3 } }, { out: '@P47-0.2' });
bt('@P46', 'graphic-hero', ['ch3', 'u1'], { move: 'whip', dur0: 0.7, fill: 0.84, sy: 480, pose: 'shrug', arc: 0.2 }); sf('@P46-0.6', 'tape_stop_1', -8, 1.0); sf('@P46-0.1', 'cinematic_hit_1', -9, 1.5); sf('@P46+0.9', 'camera_flash_1', -9, 0.6); sk('@P46+0.7', 8);
bt('@P46:diaries', 'zoom-on-number', 'u1', { fill: 0.26, maxH: 700, sy: 520, pose: 'point' });
// P47 the pitch: a souvenir seller in Stuttgart
el('dc47', 'datecard', R3(1) - 760, -330, '@P47-0.2', { big: '1980s', small: 'WEST GERMANY' }, { out: '@P48-0.2' });
con('u47', 'kuj', R3(1) - 150, 40, '@P47-0.3', { w: 880, variant: 'side', quote: ['SELLS OLD', 'SOUVENIRS', 'IN STUTTGART.'], quoteSize: 62, quoteAt: '@P47:konrad', noquote: true, aspect: 0.66, pw: 390 }, { out: '@P48-0.2' });
el('t47', 'tile', R3(1) + 700, 40, '@P47:souvenirs-0.3', { icon: 'labels', caption: 'OLD SOUVENIRS', cap: 28, w: 300, h: 340, iconS: 170, tilt: 0.03 }, { out: '@P48-0.2' });
bt('@P47', 'graphic-hero', ['dc47', 'u47'], { move: 'whip', fill: 0.62, sy: 500, pose: 'point' }); sf('@P47-0.3', 'swoosh_2', -11, 0.5); sf('@P47-0.1', 'camera_flash_1', -10, 0.6);
bt('@P47:konrad', 'zoom-on-number', 'u47', { fill: 0.5, maxH: 740, sy: 500 }); sf('@P47:konrad', 'typewriter_2', -11, 1.2);
bt('@P47:souvenirs', 'graphic-hero', ['u47', 't47'], { fill: 0.84, sy: 500, pose: 'chin' }); sf('@P47:souvenirs', 'pop_2', -9, 0.3);
// P48 the trick: dozens of hand-written notebooks, claimed to be secret diaries
el('nb48', 'notebook', R3(2) - 150, 20, '@P48:notebooks-0.3', { w: 600, h: 720, n: 6, lettersAt: 99999, count: 'DOZENS · BY HAND' }, { out: '@P49-0.2' });
el('c48', 'card', R3(2) + 560, -60, '@P48:claims-0.3', { w: 560, h: 330, lines: [{ t: 'HE CLAIMS', size: 28, gap: 54, font: 'mono', tone: 'bad', at: '@P48:claims' }, { t: 'SECRET DIARIES', size: 68, font: 'hero', at: '@P48:secret-0.2' }, { t: 'NOT REAL · SHOWN AS THE FAKE', size: 22, font: 'mono', tone: 'inkSoft', at: '@P48:secret' }], pad: 90 }, { out: '@P49-0.2' });
con('u48', 'kuj', R3(2) + 560, 300, '@P48:writing-0.3', { w: 250, variant: 'pip', label: 'HE WROTE THEM', flash: false, arrow: { at: '@P48:by', to: [-370, -140] } }, { out: '@P49-0.2' });
bt('@P48', 'graphic-hero', ['nb48', 'c48'], { move: 'whip', fill: 0.84, sy: 500, pose: 'point' }); sf('@P48-0.3', 'swoosh_2', -11, 0.5);
bt('@P48:notebooks', 'zoom-on-number', 'nb48', { fill: 0.4, maxH: 900, sy: 500, pose: 'shock' }); sf('@P48:notebooks', 'paper_slam_2', -10, 0.5); sf('@P48:by', 'pen_scratch_1', -10, 1.4);
bt('@P48:dozens', 'zoom-on-number', 'nb48', { fill: 0.44, maxH: 900, sy: 500, pose: 'point' });
bt('@P48:claims', 'graphic-hero', ['nb48', 'c48', 'u48'], { fill: 0.88, sy: 500, pose: 'chin' }); sf('@P48:claims', 'pop_2', -9, 0.3);
bt('@P48:secret', 'zoom-on-number', 'c48', { fill: 0.34, maxH: 520, sx: 1100, sy: 480, pose: 'shock' }); sf('@P48:secret', 'rubber_stamp_2', -7, 0.5);
// P49 sold under a fake name through a middleman
el('f49', 'flow', R3(3), 40, '@P49-0.3', { w: 1500, h: 360, items: [{ id: 'a', icon: 'person', label: 'KUJAU', tone: 'paper', at: '@P49:sells', size: 30 }, { id: 'b', icon: 'index', label: 'A FAKE NAME', tone: 'bad', at: '@P49:fake', size: 28 }, { id: 'c', icon: 'handshake', label: 'A MIDDLEMAN', tone: 'paper', at: '@P49:middleman', size: 28 }] }, { out: '@P50-0.2' });
con('u49', 'kuj', R3(3) - 700, 380, '@P49:sells-0.2', { w: 230, variant: 'pip', label: 'THE SELLER', flash: false }, { out: '@P50-0.2' });
bt('@P49', 'graphic-hero', ['f49'], { move: 'whip', fill: 0.8, sy: 500, pose: 'point' }); sf('@P49-0.3', 'swoosh_2', -11, 0.5);
bt('@P49:fake', 'zoom-on-number', 'f49.b', { fill: 0.24, maxH: 520, sy: 500, pose: 'chin' }); sf('@P49:fake', 'pop_2', -8, 0.4); sf('@P49:sells', 'pop_2', -9, 0.3);
bt('@P49:middleman', 'graphic-hero', ['f49', 'u49'], { fill: 0.9, sy: 500, pose: 'point' }); sf('@P49:middleman', 'pop_2', -9, 0.3);
// P50 Gerd Heidemann, a star reporter at Stern; he believes they are real
el('h50', 'card', R3(4) - 400, 20, '@P50:heidemann-0.3', { w: 640, h: 360, lines: [{ t: 'THE REPORTER', size: 26, gap: 54, font: 'mono', tone: 'bad', at: '@P50:end' }, { t: 'GERD HEIDEMANN', size: 66, font: 'hero', at: '@P50:gerd' }, { t: 'STAR REPORTER · STERN', size: 30, font: 'mono', tone: 'inkSoft', at: '@P50:star' }], pad: 90 }, { out: '@P51-0.2' });
el('n50', 'news', R3(4) + 440, 40, '@P50:magazines-0.6', { w: 620, h: 520, head: 'STERN', lines: ['ONE OF GERMANY\'S', 'BIGGEST MAGAZINES', 'THE DIARIES?'] }, { out: '@P51-0.2' });
el('b50', 'stamp', R3(4) - 100, 330, '@P50:believes-0.1', { text: 'HE BELIEVES THEY\'RE REAL', tone: 'accent', size: 52 }, { rot: -0.03, out: '@P51-0.2' });
bt('@P50', 'graphic-hero', ['h50'], { move: 'whip', fill: 0.4, maxH: 560, sy: 480, pose: 'point' }); sf('@P50-0.3', 'swoosh_2', -11, 0.5);
bt('@P50:star', 'zoom-on-number', 'h50', { fill: 0.42, maxH: 520, sy: 480, pose: 'chin' }); sf('@P50:star', 'paper_slam_2', -10, 0.5);
bt('@P50:magazines', 'graphic-hero', ['h50', 'n50'], { fill: 0.88, sy: 480, pose: 'point' }); sf('@P50:magazines', 'page_turn_1', -9, 0.8);
bt('@P50:believes', 'graphic-hero', ['h50', 'n50', 'b50'], { fill: 0.9, sy: 520, pose: 'shock' }); sf('@P50:believes', 'rubber_stamp_2', -7, 0.5);
// P51 his bosses pay about nine million marks
el('v51', 'victim', R3(5) - 560, 40, '@P51:bosses-0.3', { kind: 'investor', label: 'HIS BOSSES', sub: 'AT THE MAGAZINE', w: 360, h: 460, tape: 'THE MAGAZINE', reactAt: '@P51:nine' }, { out: '@P52-0.2' });
el('c51', 'counter', R3(5) + 250, -130, '@P51:paying-0.2', { label: 'THEY PAY ABOUT', sub: 'MARKS · WEST GERMANY\'S MONEY', to: 9, suffix: ' MILLION', at: '@P51:nine', dur: 1.0, tone: 'bad', size: 140, w: 1000 }, { out: '@P52-0.2' });
el('f51', 'stamp', R3(5) + 250, 230, '@P51:fortune-0.2', { text: 'A FORTUNE', tone: 'accent', size: 84 }, { rot: -0.04, out: '@P52-0.2' });
bt('@P51', 'graphic-hero', ['v51'], { move: 'whip', fill: 0.26, maxH: 700, sy: 500, pose: 'chin' }); sf('@P51-0.3', 'swoosh_2', -11, 0.5);
bt('@P51:paying', 'graphic-hero', ['v51', 'c51'], { fill: 0.86, sy: 490, pose: 'point' });
bt('@P51:nine', 'zoom-on-number', 'c51.value', { fill: 0.5, maxH: 420, sy: 480, pose: 'shock' }); sf('@P51:nine', 'money_counter_2', -12, 1.4); sk('@P51:million', 10);
bt('@P51:fortune', 'graphic-hero', ['c51', 'f51'], { fill: 0.72, sx: 1000, sy: 490, pose: 'chin' }); sf('@P51:fortune', 'rubber_stamp_2', -6, 0.5);
// P52 Heidemann secretly kept a big chunk
el('h52', 'card', R3(6) - 400, 20, '@P52-0.3', { w: 560, h: 280, lines: [{ t: 'GERD HEIDEMANN', size: 56, font: 'hero', at: '@P52:heidemann' }, { t: 'STAR REPORTER', size: 28, font: 'mono', tone: 'inkSoft', at: '@P52:heidemann' }], pad: 100 }, { out: '@P53-0.2' });
el('t52', 'tile', R3(6) + 260, 20, '@P52:secretly-0.3', { icon: 'cash', caption: 'A BIG CHUNK', cap: 30, w: 320, h: 360, iconS: 180, tilt: -0.03 }, { out: '@P53-0.2' });
el('k52', 'stamp', R3(6) + 260, 280, '@P52:himself-0.3', { text: 'KEPT FOR HIMSELF', tone: 'bad', size: 68 }, { rot: 0.03, out: '@P53-0.2' });
bt('@P52', 'graphic-hero', ['h52', 't52'], { move: 'whip', fill: 0.74, sy: 500, pose: 'point' }); sf('@P52-0.3', 'swoosh_2', -11, 0.5);
bt('@P52:secretly', 'zoom-on-number', 't52', { fill: 0.26, maxH: 520, sx: 1100, sy: 480, pose: 'shock' }); sf('@P52:secretly', 'coins_drop_1', -10, 1.0);
bt('@P52:himself', 'graphic-hero', ['h52', 't52', 'k52'], { fill: 0.8, sy: 510, pose: 'chin' }); sf('@P52:himself', 'rubber_stamp_2', -6, 0.5); sk('@P52:himself', 8);
// P53 April 1983: the magazine tells the whole world
el('dc53', 'datecard', R3(7) - 640, -330, '@P53-0.2', { big: 'APRIL 1983', small: 'THE MAGAZINE TELLS THE WORLD', w: 700 }, { out: '@P54-0.2' });
el('n53', 'news', R3(7) + 100, 40, '@P53-0.3', { w: 760, h: 560, head: 'STERN', lines: ['“SECRET DIARIES”', 'FOUND?', 'THE WHOLE WORLD IS TOLD'] }, { out: '@P54-0.2' });
bt('@P53', 'graphic-hero', ['dc53', 'n53'], { move: 'whip', fill: 0.7, sy: 500, pose: 'point' }); sf('@P53-0.3', 'swoosh_2', -11, 0.5); sf('@P53:magazine', 'paper_slam_2', -10, 0.5);
bt('@P53:world', 'zoom-on-number', 'n53', { fill: 0.42, maxH: 600, sy: 500, pose: 'shock' }); sf('@P53:world', 'crowd_ooh_1', -12, 1.5);
// P54 nobody checked the most obvious thing: the cover
el('nb54', 'notebook', R3(8) - 300, 20, '@P54-0.3', { w: 560, h: 700, n: 3, lettersAt: 99999 }, { out: '@P55-0.2' });
el('mg54', 'icon', R3(8) + 100, -150, '@P54:checked-0.3', { kind: 'magnifier', s: 300, col: 'paper' }, { out: '@P55-0.2' });
el('t54', 'text', R3(8) + 420, 220, '@P54:obvious-0.2', { lines: [[['NOBODY CHECKED', 'paper']], [['THE COVER', 'bad']]], size: 90 }, { out: '@P55-0.2' });
bt('@P54', 'graphic-hero', ['nb54'], { move: 'whip', fill: 0.34, maxH: 860, sy: 500, pose: 'chin' }); sf('@P54-0.3', 'swoosh_2', -11, 0.5);
bt('@P54:checked', 'graphic-hero', ['nb54', 'mg54'], { fill: 0.7, sy: 480, pose: 'point' }); sf('@P54:checked', 'pop_2', -9, 0.4);
bt('@P54:cover', 'graphic-hero', ['nb54', 'mg54', 't54'], { fill: 0.92, sy: 500, pose: 'shock' }); sf('@P54:cover', 'rubber_stamp_2', -6, 0.5); sk('@P54:cover', 8);
// P55 plastic letters from a shop: F and H
el('nb55', 'notebook', R3(9) - 200, 20, '@P55-0.3', { w: 640, h: 740, n: 4, lettersAt: '@P55:letters#2' }, { out: '@P56-0.2' });
el('s55', 'card', R3(9) + 560, -100, '@P55:plastic-0.3', { w: 520, h: 260, lines: [{ t: 'PLASTIC LETTERS', size: 50, font: 'hero', at: '@P55:plastic' }, { t: 'BOUGHT FROM A SHOP', size: 28, font: 'mono', tone: 'inkSoft', at: '@P55:shop' }], pad: 90 }, { out: '@P56-0.2' });
con('u55', 'kuj', R3(9) + 560, 270, '@P55:front-0.3', { w: 240, variant: 'pip', label: 'HIS COVER', flash: false, arrow: { at: '@P55:letters#2', to: [-400, -80] } }, { out: '@P56-0.2' });
bt('@P55', 'graphic-hero', ['nb55', 's55'], { move: 'whip', fill: 0.84, sy: 500, pose: 'point' }); sf('@P55-0.3', 'swoosh_2', -11, 0.5);
bt('@P55:plastic', 'graphic-hero', ['nb55', 's55', 'u55'], { fill: 0.92, sy: 500, pose: 'chin' }); sf('@P55:plastic', 'pop_2', -9, 0.3);
bt('@P55:letters#2', 'zoom-on-number', 'nb55.letters', { fill: 0.34, maxH: 460, sy: 500, pose: 'shock' }); sf('@P55:letters#2', 'pop_2', -7, 0.4); sf('@P55:letters#2+0.18', 'pop_2', -7, 0.4);
// P56 should have said A H (the catch)
el('nb56', 'notebook', R3(10) - 100, 20, '@P56-0.3', { w: 640, h: 740, n: 4, lettersAt: 0, ringAt: '@P56:name', shouldAt: '@P56:said' }, { out: '@P57-0.2' });
el('h56', 'headline', R3(10) - 800, -230, '@P56-0.3', { kicker: 'THE CATCH', lines: [[['WRONG', 'bad']], [['INITIALS', 'paper']]], size: 120, underAt: 0.9 }, { out: '@P57-0.2' });
bt('@P56', 'graphic-hero', ['nb56', 'h56'], { move: 'whip', fill: 0.86, sy: 500, pose: 'chin' }); sf('@P56-0.3', 'swoosh_2', -11, 0.5);
bt('@P56:name', 'zoom-on-number', 'nb56.letters', { fill: 0.34, maxH: 460, sy: 480, pose: 'shock' }); sf('@P56:name', 'rubber_stamp_2', -5, 0.5); sk('@P56:name', 10);
bt('@P56:said', 'graphic-hero', ['nb56'], { fill: 0.5, maxH: 800, sy: 470, pose: 'point' }); sf('@P56:said', 'ding_2', -9, 0.7);
// P57 national archives test: paper and ink both modern
el('d57', 'doc', R3(11) - 100, 40, '@P57-0.3', { title: 'NATIONAL ARCHIVES', sub: 'GERMANY · LAB TEST', w: 720, h: 700, skeleton: 2, band: 'navy', lines: [{ id: 'paper', t: 'PAPER: MODERN', at: '@P57:paper', tone: 'bad', mark: 'bad' }, { id: 'ink', t: 'INK: MODERN', at: '@P57:ink', tone: 'bad', mark: 'bad' }, { id: 'new', t: 'TOO NEW TO BE REAL', at: '@P57:new', tone: 'bad', big: true }] }, { out: '@P58-0.2' });
bt('@P57', 'graphic-hero', ['d57'], { move: 'whip', fill: 0.4, maxH: 920, sy: 500, pose: 'point' }); sf('@P57-0.3', 'swoosh_2', -11, 0.5);
bt('@P57:paper', 'zoom-on-number', 'd57.paper', { fill: 0.4, maxH: 300, sy: 480 }); sf('@P57:paper', 'typewriter_2', -11, 1.0);
bt('@P57:ink', 'zoom-on-number', 'd57.ink', { fill: 0.4, maxH: 300, sy: 480, pose: 'chin' }); sf('@P57:ink', 'typewriter_2', -11, 1.0);
bt('@P57:modern', 'graphic-hero', ['d57'], { fill: 0.4, maxH: 660, sy: 440, pose: 'shock' });
bt('@P57:new', 'zoom-on-number', 'd57.new', { fill: 0.42, maxH: 300, sy: 480, pose: 'shock' }); sf('@P57:new', 'rubber_stamp_2', -5, 0.5);
// P58 less than two weeks later: crude forgery
el('c58', 'counter', R3(12) - 200, -100, '@P58:less-0.3', { label: 'AFTER THE BIG ANNOUNCEMENT', prefix: '< ', to: 2, suffix: ' WEEKS', at: '@P58:two', dur: 0.6, tone: 'bad', size: 170, w: 1000 }, { out: '@P59-0.2' });
el('nb58', 'notebook', R3(12) + 680, 20, '@P58:crude-0.5', { w: 520, h: 640, n: 3, lettersAt: 0, stampText: 'FAKE', stampAt: '@P58:forgery' }, { out: '@P59-0.2' });
el('d58', 'card', R3(12) - 200, 250, '@P58:means-0.2', { w: 780, h: 230, lines: [{ t: 'CRUDE FORGERY =', size: 36, tone: 'bad', at: '@P58:means' }, { t: 'A CHEAP, OBVIOUS FAKE', size: 44, at: '@P58:cheap' }], pad: 70 }, { out: '@P59-0.2' });
bt('@P58', 'graphic-hero', ['c58'], { move: 'whip', fill: 0.6, sy: 470, pose: 'point' }); sf('@P58-0.3', 'swoosh_2', -11, 0.5);
bt('@P58:two', 'zoom-on-number', 'c58.value', { fill: 0.5, maxH: 420, sy: 470, pose: 'shock' }); sf('@P58:two', 'money_counter_1', -13, 1.0); sf('@P58:two+0.6', 'clock_ticking_1', -11, 1.5);
bt('@P58:crude', 'graphic-hero', ['c58', 'nb58'], { fill: 0.92, sy: 480, pose: 'chin' });
bt('@P58:forgery', 'zoom-on-number', 'nb58', { fill: 0.3, maxH: 700, sx: 1250, sy: 500, pose: 'shock' }); sf('@P58:forgery', 'rubber_stamp_2', -5, 0.5); sk('@P58:forgery', 10);
bt('@P58:means', 'graphic-hero', ['c58', 'd58'], { fill: 0.7, sy: 500, pose: 'chin' });
// P59 verdict: Hamburg 1985, about four and a half years each
con('u59', 'kuj', R3(13) - 640, 40, '@P59-0.3', { w: 380, variant: 'card', bars: '@P59:sentenced', stamps: [{ text: 'CONVICTED 1985', at: '@P59:convicted', tone: 'bad', size: 42, rot: -0.1, y: 60 }], push: { at: '@P59', to: 1.15, dur: 6 }, flash: false }, { out: '@P60-0.2' });
el('h59', 'card', R3(13) - 130, 40, '@P59:convicted-0.2', { w: 420, h: 330, lines: [{ t: 'GERD HEIDEMANN', size: 40, font: 'hero', at: '@P59:heidemann' }, { t: 'CONVICTED TOO', size: 28, font: 'mono', tone: 'bad', at: '@P59:heidemann' }, { t: 'HAMBURG · 1985', size: 24, font: 'mono', tone: 'inkSoft', at: '@P59:hamburg' }], pad: 90 }, { out: '@P60-0.2' });
el('y59', 'counter', R3(13) + 520, -50, '@P59:each-0.5', { label: 'EACH SENTENCED TO ABOUT', to: 4.5, decimals: 1, suffix: ' YEARS', at: '@P59:four', dur: 0.8, tone: 'bad', size: 150, w: 760 }, { out: '@P60-0.2' });
bt('@P59', 'graphic-hero', ['u59', 'h59'], { move: 'whip', fill: 0.78, sy: 500, pose: 'point' }); sf('@P59-0.3', 'swoosh_2', -11, 0.5);
bt('@P59:convicted', 'zoom-on-number', 'u59', { fill: 0.28, maxH: 740, sy: 500, pose: 'shock' }); sf('@P59:convicted', 'gavel_1', -5, 0.8); sk('@P59:convicted', 10);
bt('@P59:heidemann', 'graphic-hero', ['u59', 'h59', 'y59'], { fill: 0.92, sy: 500, pose: 'chin' });
bt('@P59:four', 'zoom-on-number', 'y59.value', { fill: 0.34, maxH: 400, sx: 1100, sy: 480 }); sf('@P59:four', 'deep_boom_1', -7, 1.0); sf('@P59:sentenced-0.1', 'cell_door_1', -7, 1.2);
// P60 the order was wrong: paid first, tested after; flip it
el('o60', 'flow', R3(14), -200, '@P60:paid-0.3', { w: 1000, h: 360, items: [{ id: 'a', icon: 'dollar', label: '1  PAID', tone: 'bad', at: '@P60:paid', size: 34 }, { id: 'b', icon: 'magnifier', label: '2  TESTED', tone: 'paper', at: '@P60:cheap', size: 34 }] }, { out: '@P61-0.2' });
el('o60b', 'flow', R3(14), 240, '@P60:flip-0.2', { w: 1000, h: 360, items: [{ id: 'a', icon: 'magnifier', label: '1  TEST', tone: 'good', at: '@P60:flip', size: 34 }, { id: 'b', icon: 'dollar', label: '2  PAY', tone: 'paper', at: '@P60:flip+0.4', size: 34 }] }, { out: '@P61-0.2' });
el('x60', 'stamp', R3(14) + 760, 240, '@P60:fake-0.1', { text: 'NEVER MAKES IT TO PRINT', tone: 'good', size: 46 }, { rot: -0.04, out: '@P61-0.2' });
bt('@P60', 'graphic-hero', ['o60'], { move: 'whip', fill: 0.5, maxH: 520, sy: 440, pose: 'point' }); sf('@P60-0.3', 'swoosh_2', -11, 0.5);
bt('@P60:paid', 'zoom-on-number', 'o60.a', { fill: 0.2, maxH: 400, sy: 440 }); sf('@P60:paid', 'cash_register_1', -10, 0.9);
bt('@P60:cheap', 'graphic-hero', ['o60'], { fill: 0.5, maxH: 520, sy: 440, pose: 'chin' }); sf('@P60:cheap', 'pop_2', -9, 0.3);
bt('@P60:flip', 'graphic-hero', ['o60', 'o60b'], { fill: 0.5, maxH: 980, sy: 500, pose: 'point' }); sf('@P60:flip', 'rewind_1', -10, 0.9); sf('@P60:flip+0.4', 'pop_2', -9, 0.3);
bt('@P60:fake', 'graphic-hero', ['o60b', 'x60'], { fill: 0.7, sy: 560, pose: 'shock' }); sf('@P60:fake', 'rubber_stamp_2', -6, 0.5);
// ---------------- CH4 · THE WINE IN THE KITCHEN (P61-P76) — burgundy room, Kurniawan ----------------
const R4 = k => K(RM[4], k);
// P61 chapter card + case file
el('ch4', 'headline', R4(0) - 400, 40, '@P61-0.3', { kicker: 'CHAPTER FOUR', lines: ['THE WINE IN', [['THE KITCHEN', 'bad']]], size: 140, underAt: 1.0 }, { out: '@P62-0.2' });
con('w1', 'kur', R4(0) + 600, 50, '@P61-0.2', { w: 440, variant: 'card', file: true, caseNo: 'CASE Nº 4', push: { at: '@P61', to: 1.12, dur: 3 } }, { out: '@P62-0.2' });
bt('@P61', 'graphic-hero', ['ch4', 'w1'], { move: 'whip', dur0: 0.7, fill: 0.84, sy: 480, pose: 'shrug', arc: 0.2 }); sf('@P61-0.6', 'tape_stop_1', -8, 1.0); sf('@P61-0.1', 'cinematic_hit_1', -9, 1.5); sf('@P61+0.9', 'camera_flash_1', -9, 0.6); sk('@P61+0.7', 8);
bt('@P61:kitchen', 'zoom-on-number', 'w1', { fill: 0.3, maxH: 760, sy: 520, pose: 'point' });
// P62 the pitch: a young collector, a star of the rare wine world
el('dc62', 'datecard', R4(1) - 700, -330, '@P62-0.2', { big: '2000s', small: 'LOS ANGELES' }, { out: '@P63-0.2' });
con('w62', 'kur', R4(1) - 100, 40, '@P62-0.3', { w: 900, variant: 'side', quote: ['A YOUNG', 'COLLECTOR.', 'A STAR OF', 'RARE WINE.'], quoteSize: 62, quoteAt: '@P62:young', noquote: true, aspect: 0.66, pw: 400 }, { out: '@P63-0.2' });
bt('@P62', 'graphic-hero', ['dc62', 'w62'], { move: 'whip', fill: 0.62, sy: 500, pose: 'point' }); sf('@P62-0.3', 'swoosh_2', -11, 0.5); sf('@P62-0.1', 'camera_flash_1', -10, 0.6);
bt('@P62:young', 'zoom-on-number', 'w62', { fill: 0.5, maxH: 740, sy: 500 }); sf('@P62:young', 'typewriter_2', -11, 1.2);
bt('@P62:star', 'graphic-hero', ['w62'], { fill: 0.62, maxH: 800, sy: 500, pose: 'shock' }); sf('@P62:star', 'pop_2', -9, 0.3);
// P63 opens rare old bottles at fancy dinners like they're nothing
for (let i = 0; i < 2; i++) el('d63' + i, 'victim', R4(2) - 700 + i * 380, 40, `@P63:fancy+${(i * 0.2).toFixed(2)}`, { kind: 'collector', label: 'DINNER GUEST', sub: 'WINE LOVER', w: 320, h: 420, suit: ['#2F5DA8', '#8A3FD1'][i], tape: 'DINNER', reactAt: '@P63:nothing' }, { out: '@P64-0.2' });
el('b63', 'bottles', R4(2) + 420, 80, '@P63:opens-0.3', { items: [{ label: '1945', at: '@P63:opens' }, { label: '1982', at: '@P63:rare' }, { label: '1990', at: '@P63:old' }], gap: 200 }, { out: '@P64-0.2' });
bt('@P63', 'graphic-hero', ['b63'], { move: 'whip', fill: 0.4, maxH: 560, sx: 1100, sy: 500, pose: 'point' }); sf('@P63-0.3', 'swoosh_2', -11, 0.5); sf('@P63:opens', 'cork_pop_1', -8, 0.8);
bt('@P63:dinners', 'graphic-hero', ['d630', 'd631', 'b63'], { fill: 0.92, sy: 500, pose: 'chin' }); sf('@P63:dinners', 'glass_clink_1', -10, 1.0);
bt('@P63:nothing', 'zoom-on-number', 'b63', { fill: 0.5, maxH: 520, sx: 1100, sy: 520, pose: 'shrug' });
// P64 2006: two auctions, $35 million, world record
el('g64', 'tile', R4(3) - 520, 80, '@P64-0.3', { icon: 'gavel', caption: 'AUCTIONS · 2006', cap: 30, w: 340, h: 390, iconS: 190 }, { out: '@P65-0.2' });
el('c64', 'counter', R4(3) + 270, 0, '@P64:two-0.2', { label: 'TWO AUCTIONS BRING IN ABOUT', to: 35, prefix: '$', suffix: ' MILLION', at: '@P64:$35', dur: 1.5, tone: 'good', size: 150, w: 1060 }, { out: '@P65-0.2' });
el('wr64', 'stamp', R4(3) + 620, -250, '@P64:record-0.1', { text: 'WORLD RECORD', tone: 'accent', size: 70 }, { rot: -0.08, out: '@P65-0.2' });
bt('@P64', 'graphic-hero', ['g64', 'c64'], { move: 'whip', fill: 0.8, sy: 500, pose: 'point' }); sf('@P64-0.3', 'swoosh_2', -11, 0.5); sf('@P64:auctions', 'gavel_1', -7, 0.8);
bt('@P64:$35', 'zoom-on-number', 'c64.value', { fill: 0.5, sy: 510, pose: 'shock' }); sf('@P64:$35', 'money_counter_2', -11, 1.6); sf('@P64:million+0.3', 'cash_register_1', -9, 0.9); sk('@P64:million+0.3', 10);
bt('@P64:second', 'graphic-hero', ['c64', 'wr64'], { fill: 0.7, sy: 500, pose: 'point' }); sf('@P64:record', 'rubber_stamp_2', -5, 0.5);
// P65 how do you fake wine the best tasters are drinking?
el('q65', 'text', R4(4) - 520, 0, '@P65-0.3', { lines: [[['?', 'accent']]], size: 440 }, { out: '@P66-0.2' });
for (let i = 0; i < 3; i++) el('t65' + i, 'victim', R4(4) + 60 + i * 380, 40, `@P65:tasters+${(i * 0.2).toFixed(2)}`, { kind: 'collector', label: 'EXPERT TASTER', sub: 'DRINKING IT', w: 320, h: 420, suit: ['#1FA366', '#2F5DA8', '#8A3FD1'][i], tape: 'TASTER', reactAt: '@P65:drinking' }, { out: '@P66-0.2' });
bt('@P65', 'graphic-hero', ['q65'], { move: 'whip', fill: 0.28, maxH: 640, sy: 480, pose: 'shrug' }); sf('@P65-0.3', 'swoosh_2', -11, 0.5);
bt('@P65:fake', 'graphic-hero', ['q65', 't650'], { fill: 0.7, sy: 480, pose: 'chin' });
bt('@P65:tasters', 'graphic-hero', ['t650', 't652'], { fill: 0.7, sy: 500, pose: 'point' }); sf('@P65:tasters', 'pop_2', -9, 0.3);
bt('@P65:drinking', 'zoom-on-number', 't651', { fill: 0.24, maxH: 560, sy: 500, pose: 'shock' }); sf('@P65:drinking', 'glass_clink_1', -10, 1.0);
// P66 the trick, steps 1-3 (his actions), pip in the corner with an arrow
el('s1', 'card', R4(5) - 1020, 40, '@P66:older-0.2', { w: 440, h: 440, lines: [{ t: '1', size: 130, tone: 'bad', at: '@P66:older-0.1' }, { t: 'OLDER, CHEAPER', size: 46, at: '@P66:older' }, { t: 'WINE', size: 52, at: '@P66:cheaper' }] }, { out: '@P68-0.2' });
el('s2', 'card', R4(5) - 340, 40, '@P66:mixed-0.2', { w: 440, h: 440, lines: [{ t: '2', size: 130, tone: 'bad', at: '@P66:mixed-0.1' }, { t: 'MIX IN', size: 52, at: '@P66:mixed' }, { t: 'NEWER WINE', size: 52, at: '@P66:newer' }] }, { out: '@P68-0.2' });
el('s3', 'card', R4(5) + 340, 40, '@P66:poured-0.2', { w: 440, h: 440, lines: [{ t: '3', size: 130, tone: 'bad', at: '@P66:poured-0.1' }, { t: 'POUR INTO', size: 52, at: '@P66:poured' }, { t: 'OLD BOTTLES', size: 48, at: '@P66:old' }] }, { out: '@P68-0.2' });
con('w66', 'kur', R4(5) - 340, 400, '@P66:prosecutors-0.2', { w: 250, variant: 'pip', label: 'HE DID THIS', flash: false, arrow: { at: '@P66:older', to: [-340, -230] } }, { out: '@P68-0.2' });
bt('@P66', 'graphic-hero', ['s1', 's2', 's3'], { move: 'whip', fill: 0.92, sy: 480, pose: 'point' }); sf('@P66-0.3', 'swoosh_2', -11, 0.5);
bt('@P66:older', 'zoom-on-number', ['s1', 'w66'], { fill: 0.4, maxH: 760, sy: 500 }); sf('@P66:older-0.1', 'pop_2', -8, 0.3);
bt('@P66:mixed', 'zoom-on-number', 's2', { fill: 0.26, maxH: 640, sy: 500 }); sf('@P66:mixed-0.1', 'pop_2', -8, 0.3); sf('@P66:mixed', 'stir_pot_1', -14, 1.2);
bt('@P66:poured', 'zoom-on-number', 's3', { fill: 0.26, maxH: 640, sy: 500, pose: 'shock' }); sf('@P66:poured', 'pour_glug_1', -10, 1.2);
// P67 new corks, wax, printed labels
el('s4', 'card', R4(5) + 1020, 40, '@P67:new-0.2', { w: 440, h: 440, lines: [{ t: '4', size: 130, tone: 'bad', at: '@P67:new-0.1' }, { t: 'NEW CORKS · NEW WAX', size: 36, at: '@P67:corks' }, { t: 'PRINTED LABELS', size: 44, at: '@P67:printed' }] }, { out: '@P68-0.2' });
el('k67', 'tile', R4(5) + 1020, -330, '@P67:corks-0.2', { icon: 'bottle', caption: 'CORKS', cap: 28, w: 240, h: 250, iconS: 120, tilt: -0.03 }, { out: '@P68-0.2' });
el('x67', 'tile', R4(5) + 1280, -330, '@P67:wax-0.2', { icon: 'badge', caption: 'WAX', cap: 28, w: 240, h: 250, iconS: 120, tilt: 0.02 }, { out: '@P68-0.2' });
el('l67', 'tile', R4(5) + 1540, -330, '@P67:printed-0.2', { icon: 'labels', caption: 'LABELS', cap: 28, w: 240, h: 250, iconS: 120, tilt: -0.02 }, { out: '@P68-0.2' });
bt('@P67', 'graphic-hero', ['s3', 's4'], { fill: 0.7, sy: 490, pose: 'point' }); sf('@P67-0.1', 'swoosh_2', -11, 0.5);
bt('@P67:new', 'zoom-on-number', 's4', { fill: 0.28, maxH: 640, sy: 500 }); sf('@P67:corks', 'cork_pop_1', -9, 0.6); sf('@P67:wax', 'wax_plop_1', -10, 0.6); sf('@P67:printed', 'label_slap_1', -10, 0.6);
bt('@P67:famous', 'graphic-hero', ['s4', 'k67', 'x67', 'l67'], { fill: 0.6, sx: 1250, sy: 460, pose: 'shock' });
// P68 for years, plenty of experts drank it and bought more
for (let i = 0; i < 3; i++) el('e68' + i, 'victim', R4(6) - 420 + i * 420, 20, `@P68:experts+${(0.1 + i * 0.2).toFixed(2)}`, { kind: 'collector', label: 'EXPERT TASTER', sub: 'LOVED IT', w: 320, h: 410, suit: ['#1FA366', '#2F5DA8', '#8A3FD1'][i], tape: 'TASTER', reactAt: '@P68:bought' }, { out: '@P69-0.2' });
el('pr68', 'stamp', R4(6), 330, '@P68:drank-0.1', { text: 'DRANK IT · BOUGHT MORE', tone: 'good', size: 66 }, { rot: -0.04, out: '@P69-0.2' });
bt('@P68', 'graphic-hero', ['e681'], { move: 'whip', fill: 0.3, maxH: 620, sy: 500, pose: 'chin' }); sf('@P68-0.3', 'swoosh_2', -11, 0.5);
bt('@P68:experts', 'graphic-hero', ['e680', 'e682', 'pr68'], { fill: 0.72, sy: 500, pose: 'point' });
bt('@P68:bought', 'zoom-on-number', 'pr68', { fill: 0.44, maxH: 300, sy: 500, pose: 'shrug' }); sf('@P68:drank', 'pop_2', -9, 0.3); sf('@P68:bought', 'cash_register_1', -10, 0.9);
// P69 what caught him: not taste, a date; red ring
el('h69', 'headline', R4(7) - 520, -250, '@P69-0.3', { kicker: 'WHAT CAUGHT HIM', lines: [[['NOT TASTE.', 'paper']], [['A DATE.', 'bad']]], size: 150, underAt: 1.0 }, { out: '@P70-0.2' });
con('w69', 'kur', R4(7) + 620, 20, '@P69-0.3', { w: 400, variant: 'card', ring: '@P69:date', push: { at: '@P69', to: 1.25, dur: 3 }, flash: false }, { out: '@P70-0.2' });
bt('@P69', 'graphic-hero', ['h69', 'w69'], { move: 'whip', fill: 0.84, sy: 480, pose: 'chin' }); sf('@P69-0.3', 'swoosh_2', -11, 0.5);
bt('@P69:date', 'zoom-on-number', 'h69', { fill: 0.38, maxH: 520, sy: 380, pose: 'shock' }); sf('@P69:date', 'rubber_stamp_2', -5, 0.5); sk('@P69:date', 10);
// P70 2008 New York auction, labels going back to 1945
el('lot70', 'card', R4(8) + 380, 280, '@P70-0.2', { w: 780, h: 220, lines: [{ t: 'CLOS SAINT-DENIS', size: 70, at: '@P70:french' }, { t: 'NEW YORK AUCTION · 2008', size: 34, font: 'mono', at: '@P70:auction' }] }, { out: '@P71-0.2' });
el('cal70', 'calendar', R4(8) - 520, 40, '@P70-0.2', { head: 'LABEL SAYS', roll: { from: 2008, to: 1945, at: '@P70:labels', dur: 1.7 }, sub: 'LABELS GO BACK TO 1945', subAt: '@P70:1945', size: 190 }, { out: '@P71-0.2' });
bt('@P70', 'graphic-hero', ['lot70', 'cal70'], { move: 'whip', fill: 0.78, sy: 500, pose: 'point' }); sf('@P70', 'paper_slam_2', -10, 0.5);
bt('@P70:french', 'graphic-hero', ['lot70', 'cal70'], { fill: 0.84, sy: 500, pose: 'chin' });
bt('@P70:labels', 'zoom-on-number', 'cal70.value', { fill: 0.36, sy: 480, pose: 'shock' }); sf('@P70:labels', 'money_counter_1', -13, 1.7);
// P71 the winemaker objects; his family started in 1982
el('v71', 'victim', R4(9) - 560, 40, '@P71-0.3', { kind: 'winemaker', label: 'LAURENT PONSOT', sub: 'THE WINEMAKER', w: 380, h: 480, reactAt: '@P71:objected' }, { out: '@P72-0.2' });
el('tl71', 'text', R4(9) + 200, -120, '@P71:family-0.2', { lines: [[['HIS FAMILY STARTED', 'paper']], [['MAKING IT IN ', 'paper'], ['1982', 'good']]], size: 76 }, { out: '@P72-0.2' });
bt('@P71', 'graphic-hero', 'v71', { move: 'whip', fill: 0.28, maxH: 740, sy: 500, pose: 'point' }); sf('@P71-0.3', 'swoosh_2', -11, 0.5);
bt('@P71:objected', 'zoom-on-number', 'v71', { fill: 0.3, maxH: 740, sy: 500, pose: 'shock' }); sf('@P71:objected', 'wrong_buzzer_2', -11, 0.6);
bt('@P71:family', 'graphic-hero', ['v71', 'tl71'], { fill: 0.8, sy: 480, pose: 'point' });
bt('@P71:1982', 'zoom-on-number', 'tl71', { fill: 0.4, maxH: 300, sy: 360, pose: 'point' }); sf('@P71:1982', 'ding_2', -9, 0.7);
// P72 37 years older than the wine; pulled from the sale
el('ru72', 'ruler', R4(9) + 1000, 40, '@P72-0.3', { from: '1945', to: '1982', n: 37, at: '@P72:those', dur: 1.5 }, { out: '@P73-0.2' });
el('pl72', 'stamp', R4(9) + 1000, 330, '@P72:pulled-0.1', { text: 'PULLED FROM THE SALE', tone: 'bad', size: 64 }, { rot: -0.04, out: '@P73-0.2' });
bt('@P72', 'graphic-hero', 'ru72', { move: 'whip', fill: 0.64, maxH: 700, sy: 500, pose: 'point' }); sf('@P72-0.3', 'paper_slam_2', -10, 0.5); sf('@P72:those', 'clock_ticking_1', -10, 1.5);
bt('@P72:37', 'graphic-hero', 'ru72', { fill: 0.74, maxH: 760, sy: 500, pose: 'shock' }); sf('@P72:older', 'rubber_stamp_2', -5, 0.5); sk('@P72:older', 12);
bt('@P72:pulled', 'graphic-hero', ['ru72', 'pl72'], { fill: 0.72, sy: 540, pose: 'chin' }); sf('@P72:pulled', 'rubber_stamp_2', -6, 0.5);
// P73 FBI, his home: bottles, corks, wax, thousands of labels = a wine factory
el('kit', 'photo', R4(10) - 420, 20, '@P73:fbi-0.3', { src: 'brand/photos/rudy-kurniawan/3.jpg', name: 'HIS KITCHEN', role: 'FBI SEARCH · 2012', credit: 'PHOTO: U.S. GOVERNMENT · PUBLIC DOMAIN', treatment: 'paper', fx: 0.5, fy: 0.5, w: 780, aspect: 0.72, tilt: -0.02 }, { out: '@P74-0.2' });
con('w73', 'kur', R4(10) - 1000, 40, '@P73:arrested-0.2', { w: 330, variant: 'card', flash: false, credit: '', stamps: [{ text: 'ARRESTED 2012', at: '@P73:arrested', tone: 'bad', size: 36, rot: -0.1, y: 40 }] }, { out: '@P74-0.2' });
el('t73a', 'tile', R4(10) + 330, -290, '@P73:corks-0.1', { icon: 'bottle', caption: 'CORKS', cap: 28, w: 250, h: 270, iconS: 130, tilt: 0.03 }, { out: '@P74-0.2' });
el('t73b', 'tile', R4(10) + 620, -290, '@P73:wax-0.1', { icon: 'badge', caption: 'WAX', cap: 28, w: 250, h: 270, iconS: 130, tilt: -0.02 }, { out: '@P74-0.2' });
el('t73c', 'tile', R4(10) + 905, -290, '@P73:thousands-0.4', { icon: 'labels', caption: 'LABELS', cap: 28, w: 250, h: 270, iconS: 130, tilt: 0.03 }, { out: '@P74-0.2' });
el('wf', 'stamp', R4(10) + 620, 20, '@P73:factory-0.2', { text: 'A WINE FACTORY', tone: 'bad', size: 74 }, { rot: -0.05, out: '@P74-0.2' });
bt('@P73', 'graphic-hero', ['w73', 'kit'], { move: 'whip', fill: 0.84, sy: 480, pose: 'point' }); sf('@P73-0.3', 'camera_flash_1', -9, 0.6);
bt('@P73:arrested', 'zoom-on-number', 'w73', { fill: 0.22, maxH: 560, sy: 500, pose: 'shock' }); sf('@P73:arrested', 'handcuff_click_1', -7, 0.8); sf('@P73:arrested', 'rubber_stamp_2', -7, 0.5);
bt('@P73:inside', 'graphic-hero', ['kit'], { fill: 0.5, maxH: 700, sx: 800, sy: 480, pose: 'point' });
bt('@P73:corks', 'graphic-hero', ['t73a', 't73b', 't73c', 'wf'], { fill: 0.5, sx: 900, sy: 470, pose: 'point' }); sf('@P73:corks-0.1', 'pop_2', -9, 0.3); sf('@P73:wax-0.1', 'pop_2', -9, 0.3); sf('@P73:thousands-0.4', 'pop_1', -9, 0.3);
bt('@P73:thousands', 'zoom-on-number', 't73c', { fill: 0.2, maxH: 400, sx: 900, sy: 440, pose: 'shock' });
bt('@P73:factory', 'graphic-hero', ['kit', 'wf'], { fill: 0.82, sy: 500, pose: 'chin' }); sf('@P73:factory', 'rubber_stamp_2', -5, 0.5); sk('@P73:factory', 10);
// P74 Bill Koch: $2.1M for 219 bottles he says were fake
el('v74', 'victim', R4(11) - 560, 40, '@P74-0.3', { kind: 'billionaire', label: 'BILL KOCH', sub: 'BILLIONAIRE COLLECTOR', w: 380, h: 480, reactAt: '@P74:fake' }, { out: '@P75-0.2' });
el('c74', 'counter', R4(11) + 130, -120, '@P74-0.2', { label: 'HE PAID', to: 2.1, decimals: 1, prefix: '$', suffix: ' MILLION', at: '@P74:$2', dur: 1.2, tone: 'bad', size: 130, w: 900 }, { out: '@P75-0.2' });
el('b74', 'counter', R4(11) + 130, 200, '@P74:$2+0.6', { label: 'FOR BOTTLES HE SAYS WERE FAKE', to: 219, at: '@P74:219', dur: 0.9, tone: 'paper', size: 150, w: 900 }, { out: '@P75-0.2' });
bt('@P74', 'graphic-hero', ['v74', 'c74'], { move: 'whip', fill: 0.76, sy: 490, pose: 'point' }); sf('@P74-0.3', 'swoosh_2', -11, 0.5);
bt('@P74:$2', 'zoom-on-number', 'c74.value', { fill: 0.48, sy: 480 }); sf('@P74:$2', 'money_counter_2', -12, 1.3);
bt('@P74:219', 'zoom-on-number', 'b74.value', { fill: 0.48, sy: 520, pose: 'shock' }); sf('@P74:219', 'pop_2', -8, 0.4);
bt('@P74:fake', 'graphic-hero', ['v74', 'c74', 'b74'], { fill: 0.82, sy: 500, pose: 'point' });
// P75 verdict: convicted 2013, 10 years, $28.4M
con('w75', 'kur', R4(12) - 520, 40, '@P75-0.3', { w: 420, variant: 'card', bars: '@P75:10', stamps: [{ text: 'CONVICTED 2013', at: '@P75:convicted', tone: 'bad', size: 52, rot: -0.1, y: 60 }], push: { at: '@P75', to: 1.2, dur: 5 }, flash: false }, { out: '@P76-0.2' });
el('y75', 'counter', R4(12) + 220, -130, '@P75:sentenced-0.1', { label: 'SENTENCED TO', sub: 'IN PRISON', to: 10, suffix: ' YEARS', at: '@P75:10', dur: 0.7, tone: 'bad', size: 170, w: 900 }, { out: '@P76-0.2' });
el('m75', 'counter', R4(12) + 220, 210, '@P75:ordered-0.1', { label: 'AND MUST PAY BACK ABOUT', to: 28.4, decimals: 1, prefix: '$', suffix: ' MILLION', at: '@P75:$28', dur: 1.3, tone: 'bad', size: 120, w: 900 }, { out: '@P76-0.2' });
bt('@P75', 'graphic-hero', ['w75', 'y75'], { move: 'whip', fill: 0.78, sy: 490, pose: 'point' }); sf('@P75-0.3', 'swoosh_2', -11, 0.5);
bt('@P75:convicted', 'zoom-on-number', 'w75', { fill: 0.28, maxH: 740, sy: 500, pose: 'shock' }); sf('@P75:jury', 'gavel_1', -5, 0.8); sk('@P75:jury', 12);
bt('@P75:10', 'zoom-on-number', 'y75.value', { fill: 0.42, maxH: 420, sy: 480 }); sf('@P75:10-0.1', 'cell_door_1', -7, 1.2); sf('@P75:10', 'deep_boom_1', -6, 1.0);
bt('@P75:$28', 'zoom-on-number', 'm75.value', { fill: 0.46, maxH: 360, sy: 520 }); sf('@P75:$28', 'money_counter_1', -12, 1.4);
bt('@P75:ordered', 'graphic-hero', ['w75', 'y75', 'm75'], { fill: 0.84, sy: 500, pose: 'chin' });
// P76 the best noses missed it; a guy reading a label caught it
for (let i = 0; i < 3; i++) el('n76' + i, 'victim', R4(13) - 740 + i * 300, 60, `@P76:best+${(i * 0.15).toFixed(2)}`, { kind: 'collector', label: 'BEST NOSE', sub: 'MISSED IT', w: 270, h: 360, suit: ['#1FA366', '#2F5DA8', '#8A3FD1'][i], tape: 'NOSE', reactAt: '@P76:catch', labelSize: 34 }, { out: '@P77-0.2' });
el('m76', 'stamp', R4(13) - 440, 330, '@P76:catch-0.1', { text: 'MISSED IT', tone: 'bad', size: 60 }, { rot: -0.04, out: '@P77-0.2' });
el('mg76', 'icon', R4(13) + 520, -90, '@P76:guy-0.2', { kind: 'magnifier', s: 300, col: 'paper' }, { out: '@P77-0.2' });
el('lb76', 'card', R4(13) + 520, 170, '@P76:reading-0.2', { w: 560, h: 190, lines: [{ t: 'CLOS SAINT-DENIS · 1945', size: 36, font: 'cap', at: '@P76:reading' }, { t: 'CAUGHT IT', size: 54, font: 'hero', tone: 'good', at: '@P76:did' }], pad: 62 }, { out: '@P77-0.2' });
bt('@P76', 'graphic-hero', ['n760', 'n762'], { move: 'whip', fill: 0.62, sy: 520, pose: 'chin' }); sf('@P76-0.3', 'swoosh_2', -11, 0.5);
bt('@P76:catch', 'graphic-hero', ['n760', 'n762', 'm76'], { fill: 0.7, sy: 520, pose: 'shrug' }); sf('@P76:catch', 'wrong_buzzer_2', -11, 0.6); sf('@P76:catch', 'rubber_stamp_2', -7, 0.5);
bt('@P76:guy', 'graphic-hero', ['mg76', 'lb76'], { move: 'whip', fill: 0.5, sy: 480, pose: 'point' }); sf('@P76:guy-0.3', 'swoosh_2', -11, 0.5);
bt('@P76:did', 'zoom-on-number', 'lb76', { fill: 0.44, maxH: 360, sy: 480, pose: 'shock' }); sf('@P76:did', 'ding_2', -9, 0.7); sf('@P76:did', 'rubber_stamp_2', -8, 0.5);
// ---------------- CH5 · THE LESSON: 3 CHECKS (P77-P88) — steel room, evidence board with all four faces ----------------
const R5 = k => K(RM[5], k);
el('ch5', 'headline', R5(0) - 300, -250, '@P77-0.3', { kicker: 'CHAPTER FIVE', lines: [[['THE ', 'paper'], ['LESSON', 'accent']]], size: 150, underAt: 1.0 }, { out: '@P78-0.2' });
// the board: four faces on the top row, four clues underneath, strings pull face -> clue and go tight
const BX = R5(0) + 200, BY = 40;
const faces = [['per', -540], ['mee', -180], ['kuj', 180], ['kur', 540]];
const clues = [
  { id: 'cl1', x: -540, y: 300, icon: 'cash', lines: [['A LETTER', 'bad', 32], ['ASKING FOR MONEY', 'ink', 22]], at: '@P79:letter' },
  { id: 'cl2', x: -180, y: 300, lines: [['ONE MORE', 'bad', 34], ['FAKE PAINTED', 'bad', 34], ['TO PROVE THE REST', 'ink', 22]], at: '@P80:paint' },
  { id: 'cl3', x: 180, y: 300, lines: [['F  H', 'bad', 74], ['TWO PLASTIC LETTERS', 'ink', 22]], at: '@P81:plastic' },
  { id: 'cl4', x: 540, y: 300, icon: 'labels', lines: [['37 YEARS', 'bad', 34], ['TOO EARLY', 'ink', 26]], at: '@P82:37' },
];
el('bd5', 'board', BX, BY, '@P77-0.2', { w: 1500, h: 860, title: 'THE EVIDENCE BOARD', caseNo: '4 CASES · 1 PATTERN', items: [
  ...faces.map(([w, x], i) => ({ k: 'photo', src: CON[w].src, crop: CON[w].crop, x, y: -170, w: 250, h: 290, name: CON[w].name.split(' ').pop(), nameSize: 28, at: `@P77+${(0.1 + i * 0.2).toFixed(2)}`, rot: [-0.04, 0.03, -0.02, 0.04][i], fx: CON[w].fx, fy: CON[w].fy })),
  ...clues.map(c => ({ ...c, w: 270, h: 250, size: 28, rot: 0.02 * (c.x > 0 ? -1 : 1) })),
], strings: [[0, 4, '@P79:letter'], [1, 5, '@P80:paint'], [2, 6, '@P81:plastic'], [3, 7, '@P82:37']], tightAt: '@P83:detail' }, { out: '@P84-0.2' });
bt('@P77', 'graphic-hero', ['ch5', 'bd5'], { move: 'whip', dur0: 0.7, fill: 0.86, sy: 500, pose: 'shrug', arc: 0.2 }); sf('@P77-0.6', 'tape_stop_1', -8, 1.0); sf('@P77-0.1', 'cinematic_hit_1', -9, 1.5);
for (let i = 0; i < 4; i++) sf(`@P77+${(0.1 + i * 0.2).toFixed(2)}`, 'camera_flash_1', -12, 0.4);
bt('@P77:common', 'zoom-on-number', 'ch5', { fill: 0.4, maxH: 520, sy: 400, pose: 'point' });
bt('@P78', 'graphic-hero', 'bd5', { fill: 0.84, sy: 500, pose: 'point' });
bt('@P78:gave', 'graphic-hero', ['bd5.i0', 'bd5.i3'], { fill: 0.84, sy: 480, pose: 'chin' });
bt('@P79', 'zoom-on-number', ['bd5.i0', 'bd5.cl1'], { fill: 0.34, maxH: 640, sy: 560, pose: 'point' }); sf('@P79:letter', 'paper_slam_2', -10, 0.5); sf('@P79:letter', 'pop_2', -8, 0.4);
bt('@P80', 'zoom-on-number', ['bd5.i1', 'bd5.cl2'], { fill: 0.34, maxH: 640, sy: 560, pose: 'point' }); sf('@P80:paint', 'paper_slam_2', -10, 0.5);
bt('@P81', 'zoom-on-number', ['bd5.i2', 'bd5.cl3'], { fill: 0.34, maxH: 640, sy: 560, pose: 'point' }); sf('@P81:plastic', 'paper_slam_2', -10, 0.5);
bt('@P82', 'zoom-on-number', ['bd5.i3', 'bd5.cl4'], { fill: 0.34, maxH: 640, sy: 560, pose: 'shock' }); sf('@P82:37', 'paper_slam_2', -10, 0.5); sk('@P82:37', 10);
el('x37', 'counter', R5(0) + 1300, -250, '@P82:37-0.2', { label: 'YEARS TOO EARLY', to: 37, at: '@P82:37', dur: 0.7, tone: 'bad', size: 170, w: 560 }, { out: '@P83-0.2' });
bt('@P82:37', 'zoom-on-number', 'x37.value', { fill: 0.3, maxH: 420, sx: 1000, sy: 460, pose: 'shock' }); sf('@P82:37', 'rubber_stamp_2', -5, 0.5);
// P83 none took a genius detective; one detail anyone could check
el('mg83', 'icon', R5(1) + 100, -40, '@P83-0.3', { kind: 'magnifier', s: 360, col: 'paper' }, { out: '@P84-0.2' });
el('h83', 'headline', R5(1) + 100, 280, '@P83:detail-0.1', { lines: [[['ONE DETAIL. ', 'paper'], ['ANYONE CAN CHECK.', 'bad']]], size: 96, under: 'bad', underAt: 0.8 }, { out: '@P84-0.2' });
bt('@P83', 'graphic-hero', ['bd5'], { fill: 0.86, sy: 500, pose: 'point' });
bt('@P83:genius', 'graphic-hero', ['mg83'], { move: 'whip', fill: 0.22, maxH: 520, sy: 440, pose: 'chin' }); sf('@P83:genius', 'swoosh_2', -11, 0.5);
bt('@P83:detail', 'graphic-hero', ['mg83', 'h83'], { fill: 0.68, sy: 500, pose: 'point' }); sf('@P83:detail', 'typewriter_2', -11, 1.4);
bt('@P83:check', 'graphic-hero', 'h83', { fill: 0.9, maxH: 300, sy: 470, pose: 'shock' }); sf('@P83:check', 'rubber_stamp_2', -5, 0.5); sk('@P83:check', 10);
// P84-P86 the three checks, each lands on its number
el('cl84', 'checklist', R5(2), 20, '@P84-0.3', { title: 'THE 3 CHECKS ANYONE CAN DO', lockOpen: '@P86>', rows: [{ show: '@P84:one', t: 'READ THE BORING DETAILS', size: 44 }, { show: '@P85:two', t: 'ASK WHERE IT CAME FROM', size: 44 }, { show: '@P86:three', t: 'CHECK IT BEFORE YOU PAY', size: 44 }] }, { out: '@P87-0.2' });
const chip = (id, p, inn, text, tone, out) => el(id, 'badge', R5(2) + p, 450, inn, { text, tone, size: 32, tcol: 'paper' }, { out });
chip('c841', -420, '@P84:date-0.1', 'THE DATE', 'navy', '@P85-0.2'); chip('c842', 0, '@P84:spelling-0.1', 'THE SPELLING', 'navy', '@P85-0.2'); chip('c843', 440, '@P84:name-0.1', 'THE NAME ON THE FRONT', 'navy', '@P85-0.2');
chip('c851', -540, '@P85:secret-0.1', 'A SECRET SELLER', 'bad', '@P86-0.2'); chip('c852', 160, '@P85:lost-0.1', 'A LOST TREASURE THAT JUST SHOWED UP', 'bad', '@P86-0.2');
chip('c861', -300, '@P86:paid-0.1', 'THE MAGAZINE PAID FIRST', 'bad', '@P87-0.2'); chip('c862', 240, '@P86:tested-0.1', 'AND TESTED LATER', 'bad', '@P87-0.2');
bt('@P84', 'graphic-hero', 'cl84', { move: 'whip', fill: 0.62, maxH: 800, sy: 480, pose: 'point' }); sf('@P84-0.3', 'paper_slam_2', -10, 0.5); sf('@P84-0.3', 'swoosh_2', -11, 0.5);
bt('@P84:one', 'graphic-hero', ['cl84'], { fill: 0.5, maxH: 780, sy: 500 }); sf('@P84:one', 'pop_2', -9, 0.3);
bt('@P84:date', 'graphic-hero', ['cl84', 'c841', 'c843'], { fill: 0.7, sy: 500, pose: 'chin' }); sf('@P84:date', 'pop_2', -9, 0.3); sf('@P84:spelling', 'pop_2', -9, 0.3); sf('@P84:name', 'pop_2', -9, 0.3);
bt('@P85:two', 'graphic-hero', ['cl84'], { fill: 0.5, maxH: 780, sy: 500, pose: 'point' }); sf('@P85:two', 'pop_2', -9, 0.3);
bt('@P85:secret', 'graphic-hero', ['cl84', 'c851', 'c852'], { fill: 0.7, sy: 500, pose: 'chin' }); sf('@P85:secret', 'pop_2', -9, 0.3); sf('@P85:lost', 'pop_2', -9, 0.3);
bt('@P85:slow', 'zoom-on-number', 'c852', { fill: 0.4, maxH: 200, sx: 1000, sy: 640, pose: 'shock' });
bt('@P86:three', 'graphic-hero', ['cl84'], { fill: 0.5, maxH: 780, sy: 500, pose: 'chin' }); sf('@P86:three', 'pop_2', -9, 0.3);
bt('@P86:paid', 'graphic-hero', ['cl84', 'c861', 'c862'], { fill: 0.7, sy: 500, pose: 'point' }); sf('@P86:paid', 'cash_register_1', -10, 0.9); sf('@P86:tested', 'pop_2', -9, 0.3);
bt('@P86:cost', 'zoom-on-number', ['c861', 'c862'], { fill: 0.5, maxH: 200, sy: 640, pose: 'shock' }); sf('@P86:cost', 'rubber_stamp_2', -7, 0.5);
// P87 all four fail the test
for (let i = 0; i < 4; i++) con('fl' + i, ['per', 'mee', 'kuj', 'kur'][i], R5(3) + (i - 1.5) * 440, 40, `@P87:three+${(i * 0.15).toFixed(2)}`, { w: 340, variant: 'card', flash: false, credit: '', stamps: [{ text: 'FAILED', at: `@P87:caught+${(i * 0.25).toFixed(2)}`, tone: 'bad', size: 70, rot: -0.12, y: 20 }] }, { out: '@P88-0.2' });
bt('@P87', 'graphic-hero', ['fl0', 'fl3'], { move: 'whip', fill: 0.94, sy: 500, pose: 'point' }); sf('@P87-0.3', 'swoosh_2', -11, 0.5);
for (let i = 0; i < 4; i++) sf(`@P87:caught+${(i * 0.25).toFixed(2)}`, 'rubber_stamp_2', -6 + (i === 3 ? 2 : 0), 0.5);
bt('@P87:caught', 'graphic-hero', ['fl0', 'fl3'], { fill: 0.94, sy: 500, pose: 'shock' }); sk('@P87:caught+0.8', 12);
// P88 SUBSCRIBE moment, then END CARD
el('sub88', 'follow', 1480, 880, '@P88:subscribe-0.2', { press: 0.7, labels: ['SUBSCRIBE', '✓ SUBSCRIBED'] }, { layer: 'screen', out: '@P88:subscribe+1.6' });
sf('@P88:subscribe-0.15', 'pop_2', -9, 0.3); sf('@P88:subscribe+0.55', 'click_1', -8, 0.3); sf('@P88:subscribe+0.6', 'success_chime_1', -12, 1.2);
el('end88', 'headline', R5(4), 40, '@P88-0.3', { kicker: 'A NEW CASE EVERY WEEK', lines: [[['ONE TINY DETAIL', 'paper']], [['SINKS A ', 'paper'], ['GIANT LIE', 'bad']]], size: 130, underAt: 1.0 }, { out: '@P88>' });
bt('@P88', 'graphic-hero', 'end88', { move: 'whip', fill: 0.7, maxH: 640, sx: 860, sy: 480, st: 'corner', pose: 'point' }); sf('@P88-0.3', 'swoosh_2', -11, 0.5);
bt('@P88:tiny', 'zoom-on-number', 'end88', { fill: 0.7, maxH: 640, sx: 860, sy: 480, st: 'corner', pose: 'shock' });
bt('@P88:subscribe', 'graphic-hero', 'end88', { fill: 0.72, maxH: 640, sx: 860, sy: 480, st: 'corner', pose: 'follow' }); po('@P88:subscribe', 'follow', [1480, 880]); po('@P88:subscribe+1.2', 'point');
// END CARD (12 s after the last word): wordmark, YouTube end-screen slots, storyteller waving, music only
el('wm', 'text', 960, 140, '@P88>+0.2', { lines: [[['BAD MATH', 'paper']]], size: 150, shadow: true }, { layer: 'screen' });
el('slots', 'endslots', 0, 0, '@P88>+0.4', { rl: 'WATCH NEXT', cl: 'SUBSCRIBE' }, { layer: 'screen' });
bt('@P88>+0.3', 'wide', { x: RM[6], y: 0, w: 1000, h: 600 }, { move: 'whip', dur0: 0.9, fill: 0.5, sy: 470, st: { x: 1075, y: 1064, s: 1.05, layer: 'front' }, pose: 'wave', stDur: 0.9, arc: 0.2 }); sf('@P88>+0.1', 'swoosh_2', -9, 0.8); sf('@P88>+0.7', 'success_chime_2', -12, 1.4);
// extra push-ins so no picture holds longer than ~3 s (found by the beat-gap check)
bt('@P51:marks#2', 'graphic-hero', ['c51', 'v51'], { fill: 0.86, sy: 490, pose: 'chin' });
bt('@P44:experts', 'graphic-hero', ['g44'], { fill: 0.84, sy: 500, pose: 'point' });
bt('@P80:prove', 'graphic-hero', ['bd5'], { fill: 0.86, sy: 500, pose: 'chin' });
bt('@P34:back', 'graphic-hero', ['c34'], { fill: 0.66, sy: 480, pose: 'point' });
bt('@P27:painter', 'graphic-hero', ['m27'], { fill: 0.64, maxH: 800, sy: 500, pose: 'chin' });
bt('@P86:before', 'graphic-hero', ['cl84'], { fill: 0.56, maxH: 800, sy: 500, pose: 'point' });
bt('@P71:start', 'graphic-hero', ['v71', 'tl71'], { fill: 0.84, sy: 480, pose: 'point' });
bt('@P45:friend', 'graphic-hero', ['sd45'], { fill: 0.8, sy: 500, pose: 'chin' });
bt('@P73:prosecutors', 'graphic-hero', ['kit'], { fill: 0.55, maxH: 760, sx: 900, sy: 480, pose: 'chin' });
bt('@P72:bottles', 'graphic-hero', ['ru72'], { fill: 0.7, maxH: 720, sy: 500, pose: 'chin' });
bt('@P06:every', 'graphic-hero', ['gv6'], { fill: 0.32, maxH: 700, sy: 500, pose: 'chin' });
bt('@P84:simple', 'graphic-hero', ['cl84'], { fill: 0.56, maxH: 800, sy: 500, pose: 'chin' });
bt('@P47:sells', 'graphic-hero', ['u47'], { fill: 0.6, maxH: 780, sy: 500, pose: 'shrug' });
bt('@P33:german', 'graphic-hero', ['dc33', 'f33'], { fill: 0.78, sy: 500, pose: 'chin' });
bt('@P85:ask', 'graphic-hero', ['cl84'], { fill: 0.56, maxH: 800, sy: 500, pose: 'chin' });
bt('@P44:end', 'graphic-hero', ['g44'], { fill: 0.8, sy: 500, pose: 'shrug' });
bt('@P27:1930s', 'graphic-hero', ['dc27', 'm27'], { fill: 0.6, sy: 500, pose: 'point' });
bt('@P72:itself', 'graphic-hero', ['ru72'], { fill: 0.7, maxH: 720, sy: 500, pose: 'point' });
bt('@P06:ended', 'graphic-hero', ['gv6'], { fill: 0.3, maxH: 640, sy: 500, pose: 'point' });
bt('@P47:man', 'graphic-hero', ['dc47', 'u47'], { fill: 0.64, sy: 500, pose: 'point' });
const BEATLABELS = [['@P08', '@P10', 'THE CASE'], ['@P10', '@P11', 'THE PITCH'], ['@P11', '@P13', 'THE TRICK'], ['@P13', '@P17', 'THE MYSTERY'], ['@P17', '@P22', 'THE CATCH'], ['@P22', '@P24', 'THE SENTENCE'],
  ['@P26', '@P27', 'THE CASE'], ['@P27', '@P30', 'THE PITCH'], ['@P30', '@P32', 'THE TRICK'], ['@P32', '@P37', 'THE BIG ONE'], ['@P37', '@P42', 'THE CATCH'], ['@P42', '@P45', 'THE SENTENCE'],
  ['@P46', '@P47', 'THE CASE'], ['@P47', '@P48', 'THE PITCH'], ['@P48', '@P53', 'THE TRICK'], ['@P53', '@P54', 'THE BIG REVEAL'], ['@P54', '@P59', 'THE CATCH'], ['@P59', '@P60', 'THE SENTENCE'], ['@P60', '@P61', 'THE ORDER'],
  ['@P61', '@P62', 'THE CASE'], ['@P62', '@P66', 'THE PITCH'], ['@P66', '@P69', 'THE TRICK'], ['@P69', '@P73', 'THE CATCH'], ['@P73', '@P75', 'THE SEARCH'], ['@P75', '@P77', 'THE SENTENCE'],
  ['@P77', '@P83', 'THE EVIDENCE'], ['@P83', '@P84', 'THE DETAIL'], ['@P84', '@P88', 'THE TEST']];
BEATLABELS.forEach(([a, b, t], i) => el('bl' + i, 'beatlabel', 1856, 140, a + '+0.12', { text: t }, { layer: 'screen', out: b }));
BM2.scene({
  series: 'decoded', title: 'CASE FILE: 4 FAKES', duration: 512.88, fps: 30,
  footnote: ['DOCUMENTED CASES · COURT / ARCHIVE RECORDS · SOURCES IN DESCRIPTION · DATES & MONEY AS REPORTED',
    'PHOTOS: POLICE FILES, U.S. ICE / GOVERNMENT (PUBLIC DOMAIN) · KOOS RAUCAMP / ANEFO (CC BY 4.0) · TELEPHIL & VAN MEEGEREN PAINTING (CC BY-SA 3.0) · MONA LISA: PD REPRODUCTION'],
  elements: E, beats: BT, poses: PO, shakes: SK, sfx: SF,
  stages: STAGES, hudOff: [['@P88>+0.1', 900]], travel: { every: 10 },
  captions: { fix: [], hide: [['@P88>+0.1', 900]], emph: {
    '$35': 'good', '37': 'bad', '219': 'bad', '$28': 'bad', '$2': 'bad', '1': 'bad', '65': 'bad', '500': 'bad', '10': 'bad', '2013': 'bad', '1982': 'good', '1945': 'bad',
    fake: 'bad', fakes: 'bad', forger: 'bad', forgery: 'bad', real: 'good', arrested: 'bad', arrest: 'bad', convicted: 'bad', prison: 'bad', sentenced: 'bad', factory: 'bad', record: 'accent', wrong: 'bad',
    tiny: 'accent', check: 'accent', checks: 'accent', date: 'accent', letter: 'accent', 'f': 'bad', nothing: 'bad', dangerous: 'bad', million: 'bad', nine: 'bad', stern: 'accent', 'peruggia': 'accent', 'kujau': 'accent', 'meegeren': 'accent', 'kurniawan': 'accent' } },
});
