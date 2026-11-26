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
      default: if (B.extraIcons && B.extraIcons[kind]) B.extraIcons[kind](g, th); break;
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
// ===== Heists long-form — custom recipes: 'prop' (one drawing function per story object), 'exhibit' (THE MISTAKE tray), mtray, mstamp, blackcut, casefolder =====
// Everything is generic: no Monopoly trade dress, no Royal Mail / Brink's / FIFA logos, no real faces.
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, burst, hash, hit, wobble } = B;
  const INK = '#10141A', RED = '#E0281E', GOLD = '#F2B705', PAPER = '#F5F3EE', GREEN = '#1FA366', NAVY = '#2c3e66', STEEL = '#6C7889';
  const pop = (t, o = 'snappy') => clamp(spring(t, o), 0, 1.25);
  const S = (g, c, w) => { g.strokeStyle = c; g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'round'; };
  const R = (g, x, y, w, h, r, fill, lw = 5, st = INK) => { g.beginPath(); g.roundRect(x, y, w, h, r); if (fill) { g.fillStyle = fill; g.fill(); } if (lw) { S(g, st, lw); g.stroke(); } };
  const C = (g, x, y, rx, ry, fill, lw = 5) => { g.beginPath(); g.ellipse(x, y, rx, ry ?? rx, 0, 0, 7); if (fill) { g.fillStyle = fill; g.fill(); } if (lw) { S(g, INK, lw); g.stroke(); } };
  const P = (g, pts, fill, lw = 5) => { g.beginPath(); pts.forEach((q, i) => i ? g.lineTo(q[0], q[1]) : g.moveTo(q[0], q[1])); g.closePath(); if (fill) { g.fillStyle = fill; g.fill(); } if (lw) { S(g, INK, lw); g.stroke(); } };
  const T = (g, s, x, y, font, col, al) => txt(g, s, x, y, font, col, al);
  const on = (t, a) => (a == null ? 1 : clamp((t - a) / 0.01) > 0 ? 1 : 0);
  const at = (t, a, d = 0.35) => a == null ? 1 : ease.out(lin(t, a, a + d));
  // ---- small things reused by several kinds ----
  function bill(g, x, y, w, h, rot, play) { g.save(); g.translate(x, y); g.rotate(rot); R(g, -w / 2, -h / 2, w, h, 4, play ? '#f2c0cf' : '#3fae78', 3); g.fillStyle = play ? '#e8809e' : '#e9f3dd'; g.beginPath(); g.arc(0, 0, h * 0.28, 0, 7); g.fill(); g.strokeStyle = INK; g.lineWidth = 2; g.stroke(); if (!play) { g.fillStyle = INK; g.font = F.hero(h * 0.3); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('£', 0, 2); } g.restore(); }
  function bundle(g, x, y, s, rot) { g.save(); g.translate(x, y); g.rotate(rot || 0); g.scale(s, s); for (let i = 2; i >= 0; i--) R(g, -50 + i * 5, -22 - i * 7, 100, 44, 5, i ? '#2f9a67' : '#3fae78', 3); R(g, -12, -34, 24, 56, 3, '#f2e7c4', 3); g.restore(); }
  function magnifier(g, x, y, s, rot) { g.save(); g.translate(x, y); g.rotate(rot || 0); g.scale(s, s); S(g, INK, 18); g.beginPath(); g.moveTo(34, 34); g.lineTo(86, 86); g.stroke(); S(g, '#8a5a2b', 11); g.beginPath(); g.moveTo(34, 34); g.lineTo(86, 86); g.stroke(); C(g, 0, 0, 44, 44, 'rgba(190,230,255,.35)', 10); g.fillStyle = 'rgba(255,255,255,.5)'; g.beginPath(); g.ellipse(-14, -16, 10, 6, -0.7, 0, 7); g.fill(); g.restore(); }
  function fprint(g, x, y, s, col) { g.save(); g.translate(x, y); g.scale(s, s); S(g, col, 3); for (let i = 1; i < 6; i++) { g.beginPath(); g.ellipse(0, 4, 4 + i * 5, 6 + i * 6, 0, Math.PI * 1.05, Math.PI * 2.05 - (i % 2) * 0.5); g.stroke(); } g.beginPath(); g.moveTo(0, 8); g.lineTo(0, 36); g.stroke(); g.restore(); }
  function carBody(g, x, y, s, col) { g.save(); g.translate(x, y); g.scale(s, s); P(g, [[-150, 0], [-140, -42], [-70, -52], [-35, -96], [70, -96], [118, -50], [160, -38], [160, 0]], col, 6); P(g, [[-30, -88], [-52, -50], [-4, -50], [-4, -88]], '#bfe1f2', 4); P(g, [[8, -88], [8, -50], [100, -50], [66, -88]], '#bfe1f2', 4); C(g, -92, 2, 30, 30, '#222a34', 6); C(g, 100, 2, 30, 30, '#222a34', 6); C(g, -92, 2, 12, 12, '#9aa5b3', 3); C(g, 100, 2, 12, 12, '#9aa5b3', 3); g.restore(); }
  function sandwich(g, x, y, s, k, bg) { g.save(); g.translate(x, y); g.scale(s, s); R(g, -120, 18, 240, 40, 18, '#d99a52', 6); R(g, -118, -44, 236, 30, 15, '#d99a52', 6); for (let i = 0; i < 5; i++) { g.save(); g.translate(-90 + i * 45, -8); g.rotate(i % 2 ? 0.3 : -0.3); C(g, 0, 0, 24, 14, '#c2334b', 4); g.fillStyle = '#f4c7cf'; g.beginPath(); g.arc(-6, -3, 3, 0, 7); g.arc(8, 3, 3, 0, 7); g.fill(); g.restore(); } P(g, [[-120, 8], [-86, 2], [-52, 12], [-20, 4], [20, 12], [60, 2], [120, 8], [120, 20], [-120, 20]], '#7fc15a', 4);
    if (k !== 0 && bg !== null) { g.save(); g.fillStyle = bg || '#e3e1d8'; for (const [bx, by, br] of [[110, -34, 28], [122, 0, 26], [108, 34, 30]]) { g.beginPath(); g.arc(bx, by, br, 0, 7); g.fill(); } g.restore(); } g.restore(); }
  function dogSil(g, x, y, s, col) { g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = col; g.beginPath(); g.ellipse(0, -30, 46, 24, 0, 0, 7); g.fill(); g.beginPath(); g.ellipse(52, -52, 22, 18, -0.3, 0, 7); g.fill(); g.beginPath(); g.moveTo(60, -66); g.lineTo(68, -88); g.lineTo(76, -64); g.fill(); g.fillRect(-36, -18, 10, 34); g.fillRect(22, -18, 10, 34); g.beginPath(); g.moveTo(-44, -38); g.quadraticCurveTo(-72, -70, -60, -80); g.lineTo(-52, -72); g.quadraticCurveTo(-56, -52, -38, -30); g.fill(); g.restore(); }
  function gavelSm(g, x, y, s) { g.save(); g.translate(x, y); g.scale(s, s); g.rotate(-0.5); R(g, -34, -30, 68, 30, 6, '#6b4423', 4); R(g, -5, -2, 10, 60, 3, '#6b4423', 4); g.restore(); R(g, x - 46 * s, y + 36 * s, 92 * s, 14 * s, 5, '#2b2f36', 3); }
  function wall(g, w, h, col) { R(g, -w / 2, -h / 2, w, h, 20, col, 6); }
  function cap(g, x, y, s) { g.save(); g.translate(x, y); g.scale(s, s); P(g, [[-60, 0], [-56, -36], [-20, -54], [30, -54], [62, -34], [66, 0]], '#2b3340', 5); R(g, -66, -2, 138, 12, 6, '#12161c', 4); C(g, 0, -40, 8, 8, GOLD, 3); g.restore(); }
  function mask(g, x, y, s, col) { g.save(); g.translate(x, y); g.scale(s, s); C(g, 0, 0, 60, 70, col, 6); C(g, -24, -12, 14, 14, '#fff', 4); C(g, 24, -12, 14, 14, '#fff', 4); C(g, -24, -12, 5, 5, INK, 0); C(g, 24, -12, 5, 5, INK, 0); S(g, INK, 5); g.beginPath(); g.moveTo(-28, 28); g.quadraticCurveTo(0, 50, 28, 28); g.stroke(); for (let i = -2; i <= 2; i++) { g.fillStyle = '#fff'; g.fillRect(i * 11 - 4, 30 + Math.abs(i) * -2, 8, 10); } g.restore(); }
  function shoe(g, x, y, s) { g.save(); g.translate(x, y); g.scale(s, s); P(g, [[-70, 10], [-70, -34], [-30, -40], [-6, -14], [64, -4], [76, 10]], '#3a2c22', 5); R(g, -74, 8, 154, 18, 7, '#e8e2d0', 4); g.restore(); }
  function note(g, x, y, w, h, rot, lines) { g.save(); g.translate(x, y); g.rotate(rot); R(g, -w / 2, -h / 2, w, h, 6, '#f4f0e4', 4); const cols = ['#E0281E', '#0B0F14', '#2c3e66', '#d9a406', '#0B0F14', '#E0281E', '#2c3e66']; for (let i = 0; i < 7; i++) { R(g, -w / 2 + 16 + i * (w - 36) / 7, -h / 2 + 18 + (i % 2) * 14, (w - 36) / 7 - 4, 28, 3, i % 2 ? '#fff' : '#e7e2d6', 2); g.fillStyle = cols[i]; g.fillRect(-w / 2 + 22 + i * (w - 36) / 7, -h / 2 + 24 + (i % 2) * 14, 10, 12); } for (let i = 0; i < (lines || 3); i++) { g.fillStyle = INK; g.fillRect(-w / 2 + 16, h * 0.08 + i * 18, (w - 32) * (1 - i * 0.2), 6); } g.restore(); }
  function speechDots(g, x, y, s, fill) { g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = PAPER; R(g, -90, -50, 180, 100, 30, PAPER, 5); P(g, [[-30, 48], [-52, 84], [-2, 50]], PAPER, 5); g.fillStyle = INK; for (let i = -1; i <= 1; i++) { g.beginPath(); g.arc(i * 40, 0, 10, 0, 7); g.fill(); } g.restore(); }

  // ---- the kinds ----
  const K = {
    board(g, p, env, w, h) { const t = env.t; R(g, -w / 2, -h / 2, w, h, 26, '#7a4a24', 6); g.save(); rr(g, -w / 2, -h / 2, w, h, 26); g.clip(); g.strokeStyle = 'rgba(40,20,5,.35)'; g.lineWidth = 3; for (let i = 1; i < 7; i++) { g.beginPath(); g.moveTo(-w / 2, -h / 2 + i * h / 7); g.lineTo(w / 2, -h / 2 + i * h / 7); g.stroke(); } g.restore();
      const bs = h * 0.82; R(g, -bs / 2, -bs / 2, bs, bs, 10, '#d7ead0', 6); const n = 9, cs = (bs - 120) / (n - 2), cols = ['#8a5a2b', '#9fd3f0', '#d44f9a', '#f0952a', '#e03b2f', '#f5d63a', '#2fa85a', '#2d58b8', '#8a5a2b'];
      for (let i = 0; i < 9; i++) for (const [qx, qy, vert] of [[-bs / 2 + 6 + i * (bs - 12) / 9, -bs / 2 + 6, 0], [-bs / 2 + 6 + i * (bs - 12) / 9, bs / 2 - 6 - (bs - 12) / 9 * 0.9, 0], [-bs / 2 + 6, -bs / 2 + 6 + i * (bs - 12) / 9, 1], [bs / 2 - 6 - (bs - 12) / 9 * 0.9, -bs / 2 + 6 + i * (bs - 12) / 9, 1]]) { const cw = (bs - 12) / 9; R(g, qx, qy, cw * (vert ? 0.9 : 1), cw * (vert ? 1 : 0.9), 2, '#e9f3dd', 2); g.fillStyle = cols[(i + (vert ? 3 : 0)) % 9]; if (vert) g.fillRect(qx + (qy < 0 ? 0 : 0), qy + 3, cw * 0.28, cw - 6); else g.fillRect(qx + 3, qy + (qy > 0 ? cw * 0.62 : 3), cw - 6, cw * 0.28); }
      g.save(); g.translate(0, 0); g.rotate(-0.78); R(g, -bs * 0.3, -bs * 0.07, bs * 0.6, bs * 0.14, 6, '#c5442c', 4); T(g, 'GAME NIGHT', 0, 2, F.hero(bs * 0.075), PAPER); g.restore();
      for (const [i, d] of (p.drops || []).entries()) { const k = t - d; if (k < 0) continue; const e = clamp(spring(k, { f: 2.6, z: 0.5 }), 0, 1.15), tx = (-0.3 + i * 0.21) * bs, ty = (-0.12 + (i % 2) * 0.22) * bs; bundle(g, tx, ty - (1 - e) * 340, 1.1, -0.3 + i * 0.4); }
      if (p.flip != null) { const k = lin(t, p.flip, p.flip + 0.6), x0 = bs * 0.2, y0 = -bs * 0.3; g.save(); g.translate(x0, y0); g.scale(Math.abs(Math.cos(k * Math.PI)) * 1 + 0.001, 1); bill(g, 0, 0, 120, 60, 0.2, k < 0.5); g.restore(); }
      if (p.ket != null) { const k = clamp(spring(t - p.ket, 'bouncy'), 0, 1.2); g.save(); g.translate(w * 0.38, 0); g.scale(k, k); R(g, -22, -10, 44, 100, 14, '#c92a1f', 5); R(g, -12, -52, 24, 46, 6, '#c92a1f', 5); R(g, -10, -62, 20, 14, 4, '#f2f2f2', 4); R(g, -18, 20, 36, 40, 4, '#f4f0e4', 3); g.restore(); }
      if (p.fp != null) { const k = ease.out(lin(t, p.fp, p.fp + 0.5)); g.save(); g.globalAlpha = k; g.translate(bs * 0.22, bs * 0.18); C(g, 0, 0, 60 + 14 * (1 - k), 60 + 14 * (1 - k), 'rgba(255,214,10,.22)', 5); fprint(g, 0, -14, 1.15, '#1a2a44'); g.restore(); if (p.ket != null) { g.save(); g.globalAlpha = k; g.translate(w * 0.38, 20); fprint(g, 0, 0, 0.7, '#1a2a44'); g.restore(); } }
      if (p.jail != null) { const k = pop(t - p.jail); g.save(); g.translate(-bs / 2 + 54, bs / 2 - 54); g.scale(k, k); R(g, -52, -52, 104, 104, 8, '#f4f0e4', 5); T(g, 'JAIL', 0, -22, F.hero(34), INK); for (let q = -1; q <= 1; q++) R(g, q * 24 - 4, -4, 8, 50, 2, '#6C7889', 2); g.restore(); }
      if (p.walk) { const u = ease.inOut(lin(t, p.walk[0], p.walk[1])), L = bs - 108, d = u * 3 * L; let x = -bs / 2 + 54, y = -bs / 2 + 54; if (d < L) x += d; else if (d < 2 * L) { x += L; y += d - L; } else { x += L - (d - 2 * L); y += L; } if (t > p.walk[0] - 0.3) { g.save(); g.translate(x, y - 8 * Math.abs(Math.sin(u * 40)) * (u > 0 && u < 1 ? 1 : 0)); C(g, 0, 0, 20, 20, RED, 5); R(g, -12, -34, 24, 20, 4, INK, 0); g.restore(); } }
      if (p.mag) { const k = ease.inOut(lin(t, p.mag[0], p.mag[1])); if (t > p.mag[0] - 0.2) magnifier(g, lerp(-bs * 0.34, bs * 0.18, k), lerp(-bs * 0.1, bs * 0.12, k), 1.5, 0); } },
    notes(g, p, env, w, h) { const t = env.t, play = p.mode === 'play'; for (let i = 0; i < 6; i++) { bill(g, (i - 2.5) * 40, -i * 4 + 30, 200, 100, (i - 2.5) * 0.06, play); } for (let i = 0; i < 4; i++) bill(g, (i - 1.5) * 26, -60 - i * 10, 200, 100, (i - 1.5) * 0.05, play); T(g, play ? 'PLAY MONEY' : 'REAL BANKNOTES', 0, h / 2 - 12, F.cap(34), play ? '#e8809e' : '#9be3b9'); },
    train(g, p, env, w, h) { const t = env.t, x = p.a != null ? lerp(-w * 0.9, w * 0.9, ease.inOut(lin(t, p.a, p.b))) : 0; g.save(); g.translate(x, 0); R(g, -w * 0.5, 0, w, 14, 5, '#3a4048', 4); const cars = p.cars || 3, cw = w / cars - 14; for (let i = 0; i < cars; i++) { const cx = -w / 2 + i * (cw + 14) + cw / 2; R(g, cx - cw / 2, -h * 0.5, cw, h * 0.5, 14, i ? '#b32b22' : '#8f1f19', 6); R(g, cx - cw / 2, -h * 0.5 + 6, cw, 14, 6, '#d9a406', 0); for (let k = 0; k < 3; k++) R(g, cx - cw / 2 + 18 + k * (cw - 36) / 3, -h * 0.5 + 40, (cw - 36) / 3 - 10, h * 0.2, 6, '#ffe9a8', 4); C(g, cx - cw * 0.3, 18, 17, 17, '#222a34', 5); C(g, cx + cw * 0.3, 18, 17, 17, '#222a34', 5); } g.restore(); },
    signal(g, p, env, w, h) { const t = env.t, red = p.a != null && t >= p.a; R(g, -14, -h * 0.1, 28, h * 0.6, 4, '#3a4048', 5); R(g, -52, -h * 0.5, 104, 190, 20, '#1a1f26', 6); C(g, 0, -h * 0.5 + 56, 30, 30, red ? '#3a2020' : '#1fe08a', 4); C(g, 0, -h * 0.5 + 132, 30, 30, red ? '#ff3b30' : '#3a2020', 4); R(g, -62, h * 0.46, 124, 16, 6, '#3a4048', 4); T(g, 'TRAIN SIGNAL', 0, h * 0.5 + 20, F.cap(26), PAPER); },
    bridge(g, p, env, w, h) { const t = env.t; const k = p.a != null ? ease.out(lin(t, p.a, p.a + 0.9)) : 1; R(g, -w / 2, h * 0.28, w, h * 0.22, 6, '#5b8a4a', 5); R(g, -w * 0.5, -h * 0.05, w, 34, 8, '#8a8f98', 5); for (const q of [-0.34, 0, 0.34]) { R(g, q * w - 26, -h * 0.05 + 34, 52, h * 0.34, 6, '#a3a8b0', 5); } g.save(); g.translate(lerp(-w * 0.9, 0, k) * 1, -h * 0.05 - 4); R(g, -150, -92, 300, 90, 12, '#b32b22', 6); for (let i = 0; i < 4; i++) R(g, -126 + i * 66, -66, 48, 40, 6, '#ffe9a8', 4); C(g, -90, 6, 14, 14, '#222a34', 4); C(g, 90, 6, 14, 14, '#222a34', 4); g.restore(); },
    sacks(g, p, env, w, h) { const t = env.t, n = p.n || 24, cols = 6; for (let i = 0; i < n; i++) { const k = clamp(spring(t - (p.a ?? 0) - i * (p.per ?? 0.05), { f: 2.4, z: 0.5 }), 0, 1.1), cx = (i % cols - (cols - 1) / 2) * 96, cy = (Math.floor(i / cols) - (n / cols - 1) / 2) * 96 + (1 - k) * -120; if (k <= 0) continue; g.save(); g.globalAlpha = clamp(k * 2); g.translate(cx, cy); P(g, [[-30, 34], [-36, -6], [-16, -26], [-10, -36], [10, -36], [16, -26], [36, -6], [30, 34]], '#c9b087', 4); R(g, -18, -36, 36, 10, 4, '#8a6a3a', 3); R(g, -16, -2, 32, 18, 3, '#f4f0e4', 2); g.restore(); } },
    scale(g, p, env, w, h) { const t = env.t, tilt = (p.a != null ? ease.inOut(lin(t, p.a, p.a + 0.9)) : 0) * (p.dir ?? 1) * 0.22; R(g, -12, -h * 0.3, 24, h * 0.7, 5, '#59606b', 5); R(g, -90, h * 0.4, 180, 20, 8, '#59606b', 5); g.save(); g.translate(0, -h * 0.3); g.rotate(tilt); R(g, -w * 0.42, -8, w * 0.84, 16, 8, '#8a909a', 5);
      for (const [side, it] of [[-1, p.l], [1, p.r]]) { g.save(); g.translate(side * w * 0.38, 0); g.rotate(-tilt); S(g, INK, 4); g.beginPath(); g.moveTo(0, 0); g.lineTo(-90, 150); g.moveTo(0, 0); g.lineTo(90, 150); g.stroke(); R(g, -110, 150, 220, 18, 9, '#c9ced6', 5);
        const ik = it.icon; g.save(); g.translate(0, 120); if (ik === 'cash') { for (let i = 0; i < 3; i++) bundle(g, (i - 1) * 70, -i % 2 * 26, 1.2); } else if (ik === 'car') carBody(g, 0, 0, 0.6, '#3b6fd8'); else if (ik === 'sandwich') sandwich(g, 0, -14, 0.42, 0); else if (ik === 'big') { for (let i = 0; i < 4; i++) R(g, (i - 1.5) * 52 - 20, -60 + (i % 2) * 8, 40, 60 - (i % 2) * 8, 5, ['#2c3e66', '#6C7889', '#8a5a2b', '#2c3e66'][i], 4); } else if (ik === 'tiny') { for (let i = 0; i < 3; i++) C(g, (i - 1) * 56, -14, 14, 14, ['#E0281E', '#F2B705', '#1FA366'][i], 4); } g.restore();
        g.restore(); T(g, it.label || '', side * w * 0.38, 250, F.cap(it.size || 34), PAPER); } g.restore(); },
    farm(g, p, env, w, h) { const t = env.t; R(g, -w / 2, h * 0.3, w, h * 0.2, 8, '#2f5a33', 5); R(g, -w * 0.32, -h * 0.1, w * 0.64, h * 0.42, 6, '#c9a46c', 6); P(g, [[-w * 0.38, -h * 0.1], [0, -h * 0.46], [w * 0.38, -h * 0.1]], '#8a3a2a', 6); R(g, w * 0.12, -h * 0.42, 40, 70, 4, '#7a3a2a', 5); for (const q of [-0.18, 0.18]) R(g, q * w - 36, 0, 72, 80, 6, (p.a != null && t > p.a) ? '#ffd86b' : '#ffe9a8', 5); R(g, -26, h * 0.1, 52, h * 0.22, 6, '#6b4423', 5); if (p.burn != null && t > p.burn) { const k = ease.out(lin(t, p.burn, p.burn + 0.4)); for (const q of [-0.22, 0, 0.22]) { g.fillStyle = 'rgba(255,120,30,' + 0.85 * k + ')'; g.beginPath(); g.moveTo(q * w - 24, -h * 0.1); g.quadraticCurveTo(q * w, -h * 0.1 - 110 * k, q * w + 24, -h * 0.1); g.fill(); } } },
    police(g, p, env, w, h) { const t = env.t, fl = Math.floor(t * 6) % 2; carBody(g, 0, 40, 1.4, '#e9eef5'); P(g, [[-150, 20], [160, 20], [160, 40], [-150, 40]], NAVY, 0); R(g, -52, -120, 104, 26, 8, '#1a1f26', 5); g.fillStyle = fl ? RED : '#2a6fe0'; g.fillRect(-48, -116, 46, 18); g.fillStyle = fl ? '#2a6fe0' : RED; g.fillRect(2, -116, 46, 18); T(g, 'POLICE', 0, 18, F.cap(30), NAVY); },
    vault(g, p, env, w, h) { const t = env.t; R(g, -w / 2, -h / 2, w, h, 20, '#1b2736', 6); const L = p.layers || [], names = p.names || []; for (let i = 0; i < 5; i++) { const k = i < L.length ? clamp(spring(t - L[i], { f: 2.4, z: 0.55 }), 0, 1.1) : 0, s = 1 - i * 0.17, ww = (w - 60) * s, hh = (h - 60) * s; if (k <= 0) continue; g.save(); g.globalAlpha = clamp(k * 2); g.scale(0.7 + 0.3 * k, 0.7 + 0.3 * k); R(g, -ww / 2, -hh / 2, ww, hh, 14, i % 2 ? '#2d4766' : '#3d5f86', 6, '#cfe6ff'); g.restore(); } const dk = L.length ? clamp(spring(t - L[L.length - 1] - 0.2, 'bouncy'), 0, 1.1) : 0; g.save(); g.scale(dk, dk); C(g, 0, 0, 70, 70, '#cfd6df', 7); C(g, 0, 0, 44, 44, '#9aa5b3', 5); for (let i = 0; i < 4; i++) { S(g, INK, 6); g.beginPath(); g.moveTo(0, 0); g.lineTo(Math.cos(i * 1.57 + 0.4) * 44, Math.sin(i * 1.57 + 0.4) * 44); g.stroke(); } g.restore(); },
    boxes(g, p, env, w, h) { const t = env.t, cols = p.cols || 6, rows = p.rows || 4, cw = w / cols - 10, ch = h / rows - 10, op = p.open || []; for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const i = r * cols + c, k = p.one != null ? (i === (p.idx ?? 9) ? clamp(spring(t - p.one, 'bouncy'), 0, 1.1) : 0) : op.length ? clamp(spring(t - (op[Math.min(i, op.length - 1)] + (op.length > 1 ? 0 : i * (p.per ?? 0.12))), 'bouncy'), 0, 1.1) : 0, x = -w / 2 + c * (cw + 10) + 5, y = -h / 2 + r * (ch + 10) + 5; R(g, x, y, cw, ch, 6, '#8a929e', 5); R(g, x + 6, y + 6, cw - 12, ch - 12, 4, '#a9b0bb', 3); if (k > 0.05) { R(g, x + 10, y + 10 + (1 - k) * 0, cw - 20, (ch - 20) * clamp(k), 4, '#0f141b', 3); if (k > 0.5) { C(g, x + cw / 2, y + ch / 2, 10, 10, GOLD, 3); } } else { C(g, x + cw - 18, y + ch / 2, 6, 6, '#59606b', 3); } } },
    sandwich(g, p, env, w, h) { const t = env.t; sandwich(g, 0, 0, w / 280, p.bite === false ? 0 : 1, p.bg); if (p.bag != null) { const k = ease.out(lin(t, p.bag, p.bag + 0.4)); g.save(); g.globalAlpha = k; R(g, -w * 0.44, -h * 0.38, w * 0.88, h * 0.76, 18, 'rgba(210,235,255,.28)', 5, 'rgba(240,250,255,.9)'); R(g, -w * 0.44, -h * 0.38, w * 0.88, 26, 6, '#d9d0b4', 4); T(g, 'EVIDENCE', 0, -h * 0.38 + 13, F.monoX(16), INK); g.restore(); } },
    dna(g, p, env, w, h) { const t = env.t, k = ease.out(lin(t, p.a ?? 0, (p.a ?? 0) + 0.8)); for (let i = 0; i < 24 * k; i++) { const y = -h * 0.45 + i * h * 0.9 / 24, a = i * 0.5 + t * 1.2, x1 = Math.sin(a) * w * 0.28, x2 = -x1; S(g, rgba(PAPER, 0.5), 5); g.beginPath(); g.moveTo(x1, y); g.lineTo(x2, y); g.stroke(); C(g, x1, y, 10, 10, i % 2 ? '#3da9fc' : RED, 3); C(g, x2, y, 10, 10, i % 2 ? RED : '#3da9fc', 3); } },
    bag(g, p, env, w, h) { const t = env.t, k = clamp(spring(t - (p.a ?? 0), 'bouncy'), 0, 1.1); R(g, -w / 2, h * 0.34, w, h * 0.16, 6, '#59606b', 5); S(g, '#e8d15a', 8); g.setLineDash([26, 22]); g.beginPath(); g.moveTo(-w / 2, h * 0.4); g.lineTo(w / 2, h * 0.4); g.stroke(); g.setLineDash([]); g.save(); g.translate(0, (1 - k) * -200); P(g, [[-100, h * 0.3], [-120, 0], [-70, -h * 0.28], [-20, -h * 0.4], [0, -h * 0.28], [30, -h * 0.4], [80, -h * 0.28], [120, 0], [100, h * 0.3]], '#232a33', 6); g.fillStyle = 'rgba(255,255,255,.12)'; g.beginPath(); g.ellipse(-50, -10, 18, 80, 0.2, 0, 7); g.fill(); g.restore(); R(g, w * 0.3, -h * 0.5, 190, 80, 8, '#f4f0e4', 5); T(g, 'NEAR', w * 0.3 + 95, -h * 0.5 + 26, F.hero(30), INK); T(g, 'BRUSSELS', w * 0.3 + 95, -h * 0.5 + 58, F.hero(30), RED); },
    envelopes(g, p, env, w, h) { const t = env.t, cols = p.cols || 20, rows = p.rows || 10; for (let i = 0; i < cols * rows; i++) { const k = clamp((t - (p.a ?? 0) - i * (p.per ?? 0.008)) / 0.12); if (k <= 0) continue; const x = -w / 2 + (i % cols) * (w / cols) + 5, y = -h / 2 + Math.floor(i / cols) * (h / rows) + 4; g.globalAlpha = k; R(g, x, y, w / cols - 8, h / rows - 8, 3, '#f4f0e4', 2); g.fillStyle = GREEN; g.fillRect(x + 4, y + 5, 10, 6); } g.globalAlpha = 1; },
    lift(g, p, env, w, h) { const t = env.t; R(g, -w / 2, -h / 2, w, h, 16, '#1b2128', 6); R(g, -w * 0.22, -h / 2 + 10, w * 0.44, h - 20, 6, '#2a323c', 5); for (let i = 0; i < 6; i++) { g.fillStyle = 'rgba(255,255,255,.1)'; g.fillRect(-w * 0.22, -h / 2 + 30 + i * h / 6, w * 0.44, 4); } const k = ease.inOut(lin(t, p.a ?? 0, (p.a ?? 0) + 3.4)); for (const q of [-1, 1]) { S(g, '#d9a406', 5); g.beginPath(); g.moveTo(q * 40, -h / 2 + 10); g.lineTo(q * 40, -h / 2 + 10 + (h - 20) * 0.9 * k); g.stroke(); g.save(); g.translate(q * 40, -h / 2 + 40 + (h - 120) * k * (q > 0 ? 0.9 : 1)); C(g, 0, -34, 14, 14, '#e8c9a0', 4); R(g, -14, -20, 28, 46, 8, q > 0 ? '#f28c28' : NAVY, 4); g.restore(); } R(g, -w * 0.3, h / 2 - 60, w * 0.6, 40, 8, '#8a929e', 5); T(g, 'VAULT', 0, h / 2 - 40, F.hero(30), INK); },
    drill(g, p, env, w, h) { const t = env.t, k = ease.inOut(lin(t, p.a ?? 0, (p.b ?? 3))), sh = Math.sin(t * 60) * 3 * (k > 0 && k < 1 ? 1 : 0); R(g, -w * 0.12, -h / 2, w * 0.24, h, 4, '#8f949c', 6); g.fillStyle = 'rgba(0,0,0,.18)'; for (let i = 0; i < 9; i++) g.fillRect(-w * 0.12 + (i % 2) * 20, -h / 2 + i * h / 9, w * 0.24 - (i % 2) * 20, 4); R(g, -w * 0.5, -h / 2, w * 0.38, h, 4, '#a3a8b0', 6); R(g, w * 0.12, -h / 2, w * 0.38, h, 4, '#a3a8b0', 6); const dx = lerp(-w * 0.62, w * 0.14, k) + sh; g.save(); g.translate(dx, 0); R(g, -170, -50, 120, 100, 18, '#d9a406', 6); R(g, -50, -22, 140, 44, 8, '#59606b', 5); P(g, [[90, -26], [150, -18], [150, 18], [90, 26]], '#c9ced6', 5); for (let i = 0; i < 5; i++) R(g, 150 - 0, -14 + i * 0, 0, 0, 0, null, 0); g.restore(); if (k > 0 && k < 1) for (let i = 0; i < 12; i++) { const a = hash(i * 3.1 + Math.floor(t * 30)) * 6.28, d = 20 + hash(i + Math.floor(t * 30)) * 80; C(g, dx + 150 + Math.cos(a) * d * 0.5, Math.sin(a) * d, 5, 5, '#ffd86b', 0); } },
    cctv(g, p, env, w, h) { const t = env.t, cols = 6, rows = 3, cw = w / cols - 10, ch = h / rows - 10, hi = p.hi ?? 7, e = p.a != null ? ease.out(lin(t, p.a, p.a + 0.5)) : 0; for (let i = 0; i < cols * rows; i++) { const x = -w / 2 + (i % cols) * (cw + 10) + 5, y = -h / 2 + Math.floor(i / cols) * (ch + 10) + 5; R(g, x, y, cw, ch, 8, '#1d2a2e', 5); g.fillStyle = 'rgba(120,200,160,.18)'; g.fillRect(x + 8, y + 8, cw - 16, ch - 16); P(g, [[x + 14, y + ch - 14], [x + 14, y + ch * 0.55], [x + cw * 0.45, y + ch * 0.55], [x + cw * 0.45, y + ch - 14]], 'rgba(255,255,255,.12)', 0); g.fillStyle = (Math.floor(t * 2 + i) % 2) ? RED : '#6a1a14'; g.beginPath(); g.arc(x + cw - 16, y + 16, 5, 0, 7); g.fill(); if (i === hi && e > 0) { g.save(); g.strokeStyle = RED; g.lineWidth = 7; g.beginPath(); g.ellipse(x + cw * 0.5, y + ch * 0.62, 56 * (2 - e), 34 * (2 - e), 0, 0, 7); g.globalAlpha = e; g.stroke(); g.restore(); carBody(g, x + cw * 0.5, y + ch * 0.8, 0.22, '#9aa5b3'); } } },
    car(g, p, env, w, h) { const t = env.t; carBody(g, 0, h * 0.18, w / 360, '#3b6fd8'); const m = p.a != null ? clamp(spring(t - p.a, 'bouncy'), 0, 1.15) : 0; if (m > 0) { g.save(); g.translate(-w * 0.04, -h * 0.03); g.scale(m, m); R(g, -10, -12, 20, 24, 5, '#222a34', 4); C(g, 0, -20, 7, 7, RED, 3); g.restore(); }
      if (p.b != null) for (let i = 0; i < 3; i++) { const k = lin(t, p.b + i * 0.25, p.b + i * 0.25 + 1.4); if (k <= 0) continue; const a = (1 - k) * 0.9; g.save(); g.globalAlpha = a; S(g, '#ffd60a', 6); g.beginPath(); g.arc(-w * 0.04, -h * 0.03, 30 + k * 150, -2.4, -0.7); g.stroke(); g.restore(); }
      if (p.c != null) { const k = pop(t - p.c); g.save(); g.translate(w * 0.28, -h * 0.32); g.scale(k, k); R(g, -120, -40, 240, 80, 24, PAPER, 5); T(g, 'ARGUING', 0, -12, F.cap(28), INK); T(g, 'SPLITTING THE LOOT', 0, 20, F.cap(22), RED); g.restore(); } },
    tape(g, p, env, w, h) { const t = env.t; R(g, -w / 2, -h / 2, w, h, 20, '#8a6a3a', 6); R(g, -w * 0.45, -h * 0.4, w * 0.9, h * 0.4, 10, '#c9a46c', 5); for (const q of [-1, 1]) { g.save(); g.translate(q * w * 0.22, -h * 0.2); g.rotate(t * 2.4 * q); C(g, 0, 0, 52, 52, '#2a2118', 6); for (let i = 0; i < 3; i++) { S(g, '#c9a46c', 8); g.beginPath(); g.moveTo(0, 0); g.lineTo(Math.cos(i * 2.09) * 38, Math.sin(i * 2.09) * 38); g.stroke(); } g.restore(); } for (let i = 0; i < 6; i++) { C(g, -w * 0.36 + i * w * 0.145, h * 0.22, 14, 14, i % 2 ? '#2a2118' : '#59606b', 4); } T(g, 'EVERY WORD RECORDED', 0, h * 0.4, F.cap(34), PAPER); },
    cuffs(g, p, env, w, h) { const n = p.n || 9, t = env.t; for (let i = 0; i < n; i++) { const k = clamp(spring(t - (p.a ?? 0) - i * (p.per ?? 0.16), 'bouncy'), 0, 1.15); if (k <= 0) continue; const cx = (i % 5 - 2) * 150 + (i >= 5 ? 75 : 0), cy = (i < 5 ? -70 : 70); g.save(); g.translate(cx, cy); g.scale(k, k); for (const q of [-1, 1]) { C(g, q * 34, 0, 28, 28, null, 10); S(g, '#c9ced6', 10); g.beginPath(); g.ellipse(q * 34, 0, 28, 28, 0, 0, 7); g.stroke(); } S(g, '#8a929e', 6); g.setLineDash([6, 6]); g.beginPath(); g.moveTo(-8, 0); g.lineTo(8, 0); g.stroke(); g.setLineDash([]); g.restore(); } },
    truck(g, p, env, w, h) { const t = env.t, x = p.a != null ? lerp(w * 0.8, 0, ease.out(lin(t, p.a, p.a + 1.0))) : 0; g.save(); g.translate(x, 0); R(g, -190, -h * 0.4, 270, h * 0.62, 12, '#cfd6df', 6); R(g, 80, -h * 0.22, 110, h * 0.44, 14, '#3b4452', 6); P(g, [[96, -h * 0.18], [168, -h * 0.18], [180, 0], [96, 0]], '#bfe1f2', 4); R(g, -170, -h * 0.34, 230, 24, 6, '#59606b', 3); T(g, 'ARMORED TRUCK', -55, -h * 0.05, F.cap(30), '#59606b'); C(g, -110, h * 0.22, 32, 32, '#222a34', 6); C(g, 120, h * 0.22, 32, 32, '#222a34', 6); g.restore(); },
    gear(g, p, env, w, h) { const t = env.t, s = w / 3, items = p.items || [], tm = p.times || []; items.forEach((it, i) => { const k = clamp(spring(t - (tm[i] ?? 0), 'bouncy'), 0, 1.15), x = (i - (items.length - 1) / 2) * s * 1.1; if (k <= 0) return; g.save(); g.translate(x, 0); g.scale(k, k); R(g, -s * 0.5, -s * 0.5, s, s, 22, PAPER, 5); g.save(); g.translate(0, -8); if (it === 'mask') mask(g, 0, 0, 1.0, '#9ad06b'); else if (it === 'cap') cap(g, 0, 20, 1.3); else shoe(g, 0, 14, 1.1); g.restore(); T(g, it === 'mask' ? 'RUBBER MASK' : it === 'cap' ? 'CHAUFFEUR CAP' : 'SOFT SHOES', 0, s * 0.5 - 24, F.cap(22), INK); g.restore(); }); },
    cart(g, p, env, w, h) { const t = env.t, x = lerp(-w * 0.3, w * 0.5, ease.inOut(lin(t, p.a ?? 0, (p.a ?? 0) + 3))); R(g, -w / 2, -h / 2, 40, h, 4, '#59606b', 5); R(g, -w * 0.46, -h * 0.5, w * 0.92, h, 14, 'rgba(255,255,255,.04)', 0); g.save(); g.translate(x, h * 0.1); R(g, -90, -80, 180, 110, 8, '#8a929e', 5); for (let i = 0; i < 4; i++) bundle(g, -60 + (i % 2) * 70 + (i > 1 ? 20 : 0), -50 - (i > 1 ? 30 : 0), 0.7, 0); C(g, -60, 40, 18, 18, '#222a34', 5); C(g, 60, 40, 18, 18, '#222a34', 5); S(g, INK, 6); g.beginPath(); g.moveTo(90, -60); g.lineTo(130, -110); g.stroke(); g.restore(); },
    deadend(g, p, env, w, h) { const t = env.t, n = p.n || 12, tm = p.a ?? 0; R(g, -w / 2, -h / 2, w, h, 18, '#a97c50', 6); for (let i = 0; i < 9; i++) { R(g, -w * 0.42 + (i % 3) * w * 0.3, -h * 0.36 + Math.floor(i / 3) * h * 0.27, w * 0.24, h * 0.2, 4, '#f4f0e4', 3); } for (let i = 0; i < n; i++) { const k = clamp(spring(t - tm - i * 0.12, 'snappy'), 0, 1.2); if (k <= 0) continue; const x = (hash(i * 7.7) - 0.5) * w * 0.72, y = (hash(i * 3.3 + 1) - 0.5) * h * 0.7; g.save(); g.translate(x, y); g.rotate((hash(i) - 0.5) * 0.5); g.scale(k, k); R(g, -88, -22, 176, 44, 6, 'rgba(245,243,238,.94)', 0); S(g, RED, 5); g.strokeRect(-85, -19, 170, 38); T(g, 'DEAD END', 0, 1, F.hero(28), RED); g.restore(); } },
    clock(g, p, env, w, h) { const t = env.t, r = Math.min(w, h) * 0.42, k = p.a != null ? ease.inOut(lin(t, p.a, p.b)) : 0; C(g, 0, 0, r + 14, r + 14, '#2a323c', 7); C(g, 0, 0, r, r, PAPER, 6); for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6 - Math.PI / 2; S(g, INK, i % 3 ? 5 : 9); g.beginPath(); g.moveTo(Math.cos(a) * r * 0.82, Math.sin(a) * r * 0.82); g.lineTo(Math.cos(a) * r * 0.94, Math.sin(a) * r * 0.94); g.stroke(); } g.save(); g.fillStyle = 'rgba(224,40,30,.32)'; g.beginPath(); g.moveTo(0, 0); g.arc(0, 0, r * 0.72, -Math.PI / 2, -Math.PI / 2 + k * Math.PI * 2); g.fill(); g.restore(); S(g, INK, 10); g.beginPath(); g.moveTo(0, 0); g.lineTo(Math.cos(-Math.PI / 2 + k * Math.PI * 2 * 6) * r * 0.5, Math.sin(-Math.PI / 2 + k * Math.PI * 2 * 6) * r * 0.5); g.stroke(); S(g, RED, 8); g.beginPath(); g.moveTo(0, 0); g.lineTo(Math.cos(-Math.PI / 2 + k * Math.PI * 2) * r * 0.72, Math.sin(-Math.PI / 2 + k * Math.PI * 2) * r * 0.72); g.stroke(); C(g, 0, 0, 12, 12, INK, 0); if (p.label) T(g, p.label, 0, r * 0.45, F.hero(r * 0.2), INK); },
    cell(g, p, env, w, h) { const t = env.t, k = clamp(spring(t - (p.a ?? 0), { f: 2.0, z: 0.45 }), 0, 1.1), img = B.images[p.src]; R(g, -w / 2, -h / 2, w, h, 16, '#18212D', 6); if (img) { g.save(); rr(g, -w / 2 + 14, -h / 2 + 14, w - 28, h - 28, 10); g.clip(); const sc = Math.max((w - 28) / img.width, (h - 28) / img.height); g.drawImage(img, -img.width * sc / 2, -img.height * sc / 2 + 16, img.width * sc, img.height * sc); g.restore(); } const bars = 7; for (let i = 0; i < bars; i++) { const x = -w / 2 + 40 + i * ((w - 80) / (bars - 1)); R(g, x - 10, -h / 2 - 10 + (1 - k) * -h, 20, (h + 20) * Math.min(1, k), 8, '#6C7889', 4); } g.fillStyle = '#6C7889'; g.fillRect(-w / 2, -h / 2 + 24 - (1 - Math.min(1, k)) * 200, w, 16); g.fillRect(-w / 2, h / 2 - 40 + (1 - Math.min(1, k)) * 200, w, 16);
      if (p.b != null) { const q = pop(t - p.b); g.save(); g.translate(w * 0.3, -h * 0.34); g.scale(q * 0.8, q * 0.8); speechDots(g, 0, 0, 1.0); if (p.c != null && t > p.c) { g.fillStyle = PAPER; g.fillRect(-84, -44, 168, 88); for (let i = 0; i < 9; i++) { const hh = 14 + 56 * Math.abs(Math.sin(t * 9 + i * 1.3)); R(g, -70 + i * 17, -hh / 2, 11, hh, 4, RED, 0); } } g.restore(); } },
    moneybag(g, p, env, w, h) { const t = env.t, k = p.a != null ? ease.out(lin(t, p.a, p.a + 0.6)) : 1, path = () => { g.beginPath(); [[-110, h * 0.4], [-150, h * 0.05], [-90, -h * 0.18], [-60, -h * 0.4], [60, -h * 0.4], [90, -h * 0.18], [150, h * 0.05], [110, h * 0.4]].forEach((q, i) => i ? g.lineTo(q[0], q[1]) : g.moveTo(q[0], q[1])); g.closePath(); };
      g.save(); path(); g.clip(); g.beginPath(); g.rect(-400, -400, 800, 800); g.moveTo(40, -20); g.lineTo(40 + 200 * k, -20 - 80 * k); g.lineTo(40 + 200 * k, 160); g.lineTo(60, 90); g.closePath(); g.clip('evenodd'); path(); g.fillStyle = '#c9b087'; g.fill(); S(g, INK, 6); g.stroke(); g.restore(); R(g, -64, -h * 0.44, 128, 26, 10, '#8a6a3a', 5); g.save(); path(); g.clip(); g.beginPath(); g.rect(-400, -400, 800, 800); g.moveTo(40, -20); g.lineTo(40 + 200 * k, -20 - 80 * k); g.lineTo(40 + 200 * k, 160); g.lineTo(60, 90); g.closePath(); g.clip('evenodd'); T(g, '$', 0, 8, F.hero(110), '#6b4a1a'); g.restore(); if (k > 0.1) { S(g, RED, 5); g.setLineDash([10, 8]); g.beginPath(); g.moveTo(40, -20); g.lineTo(60, 90); g.stroke(); g.setLineDash([]); } },
    coins100(g, p, env, w, h) { const t = env.t, cols = 20, rows = 5, d = Math.min(w / cols, h / rows) * 0.46, lit = p.lit || [41, 62], gem = p.shape === 'gem'; for (let i = 0; i < 100; i++) { const k = clamp((t - (p.a ?? 0) - i * 0.012) / 0.15); if (k <= 0) continue; const x = (i % cols - (cols - 1) / 2) * (w / cols), y = (Math.floor(i / cols) - (rows - 1) / 2) * (h / rows), L = lit.includes(i) && t > (p.b ?? 1e9), fade = gem ? ease.out(lin(t, p.b ?? 1e9, (p.b ?? 1e9) + 0.6)) : 0; g.save(); g.globalAlpha = k; g.translate(x, y); if (gem) { const keep = lit.includes(i); const pts = [[0, -d * 1.1], [d, -d * 0.2], [0, d * 1.1], [-d, -d * 0.2]]; if (keep || fade < 0.5) { P(g, pts, keep ? '#dff3ff' : 'rgba(223,243,255,' + (1 - fade * 2) + ')', 4); g.strokeStyle = 'rgba(80,140,200,.7)'; g.lineWidth = 2; g.beginPath(); g.moveTo(-d, -d * 0.2); g.lineTo(d, -d * 0.2); g.stroke(); } else { g.beginPath(); pts.forEach((q, ii) => ii ? g.lineTo(q[0], q[1]) : g.moveTo(q[0], q[1])); g.closePath(); g.setLineDash([5, 5]); g.strokeStyle = 'rgba(245,243,238,.35)'; g.lineWidth = 3; g.stroke(); } } else { const s2 = L ? 1 + 0.35 * hit(t - p.b, 6) + 0.15 : 1; g.scale(s2, s2); C(g, 0, 0, d, d, L ? GOLD : '#59606b', 4); if (L) T(g, '¢', 0, 2, F.hero(d * 1.2), '#7a5a00'); } g.restore(); } },
    glasscase(g, p, env, w, h) { const t = env.t, gone = p.gone != null && t >= p.gone; R(g, -w * 0.42, h * 0.3, w * 0.84, h * 0.2, 6, '#6b4423', 6); R(g, -w * 0.4, -h * 0.5, w * 0.8, h * 0.8, 10, 'rgba(190,230,255,.12)', 6, 'rgba(230,245,255,.85)'); if (!gone && !p.empty) { P(g, [[-62, -h * 0.3], [62, -h * 0.3], [42, -h * 0.12], [14, -h * 0.02], [14, h * 0.16], [46, h * 0.28], [-46, h * 0.28], [-14, h * 0.16], [-14, -h * 0.02], [-42, -h * 0.12]], GOLD, 6); C(g, 0, -h * 0.12, 16, 16, '#ffe27a', 3); } if (gone || p.empty) { T(g, 'EMPTY', 0, 0, F.hero(70), RED); } g.fillStyle = 'rgba(255,255,255,.15)'; g.beginPath(); g.moveTo(-w * 0.3, -h * 0.5); g.lineTo(-w * 0.18, -h * 0.5); g.lineTo(-w * 0.3, h * 0.3); g.lineTo(-w * 0.38, h * 0.3); g.fill(); },
    ransom(g, p, env, w, h) { const t = env.t; note(g, 0, 0, w * 0.7, h * 0.8, -0.05, 4); if (p.a != null) { const k = clamp(spring(t - p.a, 'bouncy'), 0, 1.15); g.save(); g.translate(w * 0.32, -h * 0.08); g.scale(k, k); g.rotate(0.3); P(g, [[-36, -30], [30, -34], [40, 20], [-20, 36]], GOLD, 5); S(g, '#8a929e', 6); g.beginPath(); g.roundRect(-8, -52, 20, 56, 10); g.stroke(); T(g, 'LINING', 0, 4, F.monoX(14), '#7a5a00'); g.restore(); } if (p.sig != null) { const k = ease.out(lin(t, p.sig, p.sig + 0.5)); g.save(); g.globalAlpha = k; g.translate(-w * 0.1, h * 0.28); g.rotate(-0.08); T(g, '— "JACKSON"', 0, 0, F.hero(40), RED); g.restore(); } },
    hedge(g, p, env, w, h) { const t = env.t; R(g, -w / 2, h * 0.3, w, h * 0.2, 6, '#3b7a3a', 5); for (let i = 0; i < 9; i++) C(g, -w * 0.4 + i * w * 0.1, h * 0.05 + (i % 2) * 14, 60, 52, i % 2 ? '#2f8a3a' : '#3aa24a', 5); R(g, -w * 0.45, h * 0.12, w * 0.9, h * 0.2, 6, '#2f8a3a', 0); const k = p.a != null ? clamp(spring(t - p.a, 'bouncy'), 0, 1.15) : 1; g.save(); g.translate(w * 0.1, h * 0.28 + (1 - k) * 60); g.scale(k, k); g.rotate(-0.1); R(g, -64, -40, 128, 80, 8, '#e8e2d0', 5); g.fillStyle = 'rgba(11,15,20,.55)'; for (let i = 0; i < 6; i++) g.fillRect(-52, -28 + i * 11, 104 - (i % 3) * 22, 4); g.restore(); if (p.dogs != null) for (let i = 0; i < 5; i++) { const k2 = clamp(spring(t - p.dogs - i * 0.14, 'snappy'), 0, 1); if (k2 > 0) { g.save(); g.globalAlpha = k2; dogSil(g, -w * 0.4 + i * w * 0.2, -h * 0.28 + (i % 2) * 36, 0.9, 'rgba(245,243,238,.85)'); g.restore(); } } },
    cutaway(g, p, env, w, h) { const t = env.t, k = ease.out(lin(t, p.a ?? 0, (p.a ?? 0) + 0.8)); R(g, -w / 2, -h * 0.05, w, h * 0.05 + 6, 4, '#59606b', 5); R(g, -w * 0.36, -h * 0.5, w * 0.72, h * 0.45, 8, '#a8744a', 6); for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) R(g, -w * 0.31 + c * w * 0.155, -h * 0.45 + r * h * 0.13, w * 0.1, h * 0.08, 4, '#ffe9a8', 4); R(g, -w * 0.06, -h * 0.17, w * 0.12, h * 0.12, 4, '#6b4423', 5); T(g, 'JEWELRY SHOPS', 0, -h * 0.53, F.cap(26), PAPER);
      g.save(); g.globalAlpha = k; R(g, -w * 0.36, h * 0.0, w * 0.72, h * 0.46 * k, 8, '#1b2128', 6); if (k > 0.6) { for (let r = 0; r < 3; r++) for (let c = 0; c < 7; c++) R(g, -w * 0.3 + c * w * 0.085, h * 0.1 + r * h * 0.09, w * 0.07, h * 0.07, 3, '#8a929e', 3); C(g, w * 0.26, h * 0.24, 38, 38, '#cfd6df', 6); C(g, w * 0.26, h * 0.24, 20, 20, '#9aa5b3', 4); T(g, 'VAULT', 0, h * 0.06, F.cap(24), '#cfe6ff'); } g.restore(); },
    cork(g, p, env, w, h) { const t = env.t, CARDS = [p.imgs[0], p.imgs[1], p.imgs[2], p.imgs[3], p.imgs[4]], NM = ['THE MONOPOLY GANG', 'THE FAKE DEALER', 'THE HATTON GARDEN CREW', '“SPECS”', 'PICKLES'], cw = w * 0.17, X = i => (i - 2) * w * 0.19;
      R(g, -w / 2, -h / 2, w, h, 22, '#b98a54', 10, '#6b4423'); g.save(); rr(g, -w / 2, -h / 2, w, h, 22); g.clip(); for (let i = 0; i < 420; i++) { g.fillStyle = hash(i * 1.3) > 0.5 ? 'rgba(90,55,20,.35)' : 'rgba(255,225,170,.28)'; g.beginPath(); g.arc((hash(i * 2.1) - 0.5) * w, (hash(i * 4.3 + 1) - 0.5) * h, 2 + hash(i * 7.7) * 4, 0, 7); g.fill(); } g.restore();
      T(g, 'THE EVIDENCE BOARD', 0, -h / 2 + 46, F.hero(52), '#3a2410');
      for (let i = 0; i < 5; i++) { const k = clamp(spring(t - (p.card ?? 0) - i * 0.1, 'bouncy'), 0, 1.15); if (k <= 0) continue; g.save(); g.translate(X(i), -h * 0.2); g.scale(k, k); g.rotate((i - 2) * 0.03); R(g, -cw / 2, -cw * 0.56, cw, cw * 1.12, 8, PAPER, 5); const im = B.images[CARDS[i]]; g.save(); rr(g, -cw / 2 + 10, -cw * 0.56 + 10, cw - 20, cw - 20, 6); g.clip(); if (im) B.drawPhoto(g, im, -cw / 2 + 10, -cw * 0.56 + 10, cw - 20, cw - 20, { fx: 0.5, fy: 0.45 }); g.restore(); R(g, -cw / 2 + 10, cw * 0.56 - cw * 0.17 - 8, cw - 20, cw * 0.17, 4, NAVY, 0); T(g, NM[i], 0, cw * 0.56 - cw * 0.085 - 8, F.hero(i === 2 ? 15 : 19), PAPER); C(g, 0, -cw * 0.56, 9, 9, RED, 3); g.restore(); }
      for (let i = 0; i < 5; i++) { const pin = (p.pins || [])[i], st = (p.strings || [])[i]; if (pin == null) continue; const k = clamp(spring(t - pin, 'bouncy'), 0, 1.15); if (k > 0) { g.save(); g.translate(X(i), h * 0.24); g.scale(k, k); R(g, -cw * 0.52, -cw * 0.52, cw * 1.04, cw * 1.04, 8, PAPER, 5); g.save(); g.translate(0, 0); const sc = cw * 0.9 / [520, 280, 360, 520, 700][i]; g.scale(sc, sc); const ex = [() => K.board(g, { drops: [], ket: -9, fp: -9 }, { t: 1e3 }, 520, 340), () => sandwich(g, 0, 0, 1, 1, PAPER), () => K.car(g, { a: -9, b: -9 }, { t: 1e3 }, 360, 220), () => K.cell(g, { src: p.imgs[3], a: -9, b: 1e9 }, { t: 1e3 }, 520, 360), () => K.hedge(g, { a: -9 }, { t: 1e3 }, 640, 400)][i]; ex(); g.restore(); C(g, 0, -cw * 0.52, 9, 9, RED, 3); g.restore(); }
        if (st != null && k > 0) { const u = ease.out(lin(t, st, st + 0.6)); if (u > 0) { const a0 = [X(i), h * 0.24 - cw * 0.52], b0 = [X(i), -h * 0.2 + cw * 0.56]; S(g, 'rgba(2,4,9,.35)', 8); g.beginPath(); g.moveTo(a0[0] + 2, a0[1] + 4); g.quadraticCurveTo(X(i) + 40 * (1 - u) + 2, lerp(a0[1], b0[1], 0.5 * u) + 4, lerp(a0[0], b0[0], u) + 2, lerp(a0[1], b0[1], u) + 4); g.stroke(); S(g, RED, 6); g.beginPath(); g.moveTo(a0[0], a0[1]); g.quadraticCurveTo(X(i) + 40 * (1 - u), lerp(a0[1], b0[1], 0.5 * u), lerp(a0[0], b0[0], u), lerp(a0[1], b0[1], u)); g.stroke(); } } } },
    sun(g, p, env, w, h) { const t = env.t, k = ease.out(lin(t, p.a ?? 0, (p.a ?? 0) + 0.8)); g.save(); g.scale(k, k); for (let i = 0; i < 14; i++) { g.save(); g.rotate(i * Math.PI / 7 + t * 0.2); R(g, 100, -8, 60 + (i % 2) * 24, 16, 8, GOLD, 0); g.restore(); } C(g, 0, 0, 84, 84, '#ffd23a', 6); g.restore(); },
    blueprint(g, p, env, w, h) { const t = env.t, k = ease.out(lin(t, p.a ?? 0, (p.a ?? 0) + 1.2)); g.save(); rr(g, -w / 2, -h / 2, w * k, h, 8); g.clip(); R(g, -w / 2, -h / 2, w, h, 8, '#2a5fa8', 5, '#cfe6ff'); g.strokeStyle = 'rgba(255,255,255,.18)'; g.lineWidth = 2; for (let i = 0; i < 20; i++) { g.beginPath(); g.moveTo(-w / 2 + i * w / 20, -h / 2); g.lineTo(-w / 2 + i * w / 20, h / 2); g.stroke(); g.beginPath(); g.moveTo(-w / 2, -h / 2 + i * h / 14); g.lineTo(w / 2, -h / 2 + i * h / 14); g.stroke(); } g.strokeStyle = 'rgba(255,255,255,.7)'; g.lineWidth = 4; g.strokeRect(-w * 0.35, -h * 0.25, w * 0.3, h * 0.3); g.strokeRect(-w * 0.0, -h * 0.28, w * 0.34, h * 0.36); g.beginPath(); g.moveTo(-w * 0.2, h * 0.3); g.lineTo(w * 0.3, h * 0.3); g.lineTo(w * 0.3, h * 0.12); g.stroke(); g.restore(); if (p.dot != null && t >= p.dot) { const d = clamp(spring(t - p.dot, 'bouncy'), 0, 1.2); C(g, w * 0.42, -h * 0.4, 7 * d, 7 * d, RED, 0); } },
    jailsq(g, p, env, w, h) { const t = env.t; R(g, -w / 2, -h / 2, w, h, 12, '#f4f0e4', 6); T(g, 'JAIL', 0, -h * 0.28, F.hero(h * 0.22), INK); for (let i = -2; i <= 2; i++) R(g, i * w * 0.14 - 6, -h * 0.08, 12, h * 0.46, 4, '#6C7889', 3); R(g, -w * 0.34, -h * 0.06, w * 0.68, 10, 4, '#6C7889', 3); R(g, -w * 0.34, h * 0.3, w * 0.68, 10, 4, '#6C7889', 3); },
  };
  B.heistKinds = K; B.heistArt = { bundle, magnifier, sandwich, carBody, dogSil, note, cap, mask, shoe, fprint, speechDots, bill };

  B.register('prop', {
    defaults: { kind: 'board', w: 700, h: 520, label: '', labelAt: -1e9, labelTone: 'paper' }, size: p => [p.w, p.h], anchors: p => ({ main: [0, 0, p.w, p.h], low: [0, p.h * 0.3, p.w, p.h * 0.4], dot: [p.w * 0.42, -p.h * 0.4, 70, 70], ...Object.fromEntries([0, 1, 2, 3, 4].flatMap(i => [['c' + i, [(i - 2) * p.w * 0.19, -p.h * 0.2, p.w * 0.17, p.w * 0.19]], ['e' + i, [(i - 2) * p.w * 0.19, p.h * 0.22, p.w * 0.17, p.w * 0.17]]])) }),
    draw(g, p, env) { const { lt } = env, k = clamp(spring(lt, 'snappy'), 0, 1.15); g.save(); g.globalAlpha *= clamp(lt / 0.1); g.translate(0, (1 - k) * 60); g.scale(0.9 + 0.1 * k, 0.9 + 0.1 * k); K[p.kind](g, p, env, p.w, p.h); g.restore();
      if (p.label) { const q = pop(env.t - p.labelAt); if (q > 0.02) { g.save(); g.globalAlpha *= clamp(q); g.translate(0, p.h / 2 + 44 + (1 - q) * 20); const w = Math.max(160, g.measureText(p.label).width); g.font = F.cap(34); const tw = g.measureText(p.label).width + 52; R(g, -tw / 2, -28, tw, 56, 10, 'rgba(11,15,20,.82)', 0); g.fillStyle = RED; g.fillRect(-tw / 2, -28, 8, 56); T(g, p.label, 4, 1, F.cap(34), B.tone(p.labelTone, false)); g.restore(); } } },
  });

  // ---- exhibit: white evidence tray with a magnifier, EXHIBIT tag and the object of the case ----
  const OBJ = {
    A(g, p, env, w, h) { K.board(g, { fp: p.t0 + 0.4, ket: p.t0 + 0.15, drops: [], mag: null }, env, w * 0.84, h * 0.7); },
    B(g, p, env, w, h) { K.sandwich(g, { bag: p.t0 + 0.5 }, env, w * 0.6, h * 0.5); },
    C(g, p, env, w, h) { K.car(g, { a: p.t0 + 0.25, b: p.t0 + 0.6, c: p.t0 + 0.9 }, env, w * 0.8, h * 0.62); },
    D(g, p, env, w, h) { K.cell(g, { src: p.src, a: p.t0 + 0.1, b: p.t0 + 0.6, c: p.c }, env, w * 0.58, h * 0.62); },
    E(g, p, env, w, h) { K.hedge(g, { a: p.t0 + 0.4, dogs: p.t0 + 0.9 }, env, w * 0.92, h * 0.8); },
  };
  B.register('exhibit', {
    defaults: { w: 820, h: 640, ex: 'A', label: 'EXHIBIT A', src: '', cap: '' }, ownEnter: true, size: p => [p.w, p.h], anchors: p => ({ main: [0, 0, p.w, p.h] }),
    draw(g, p, env) { const { lt, t, theme } = env, k = clamp(spring(lt - 0.02, { f: 2.1, z: 0.5 }), 0, 1.15), w = p.w, h = p.h; g.save(); g.globalAlpha *= clamp(lt / 0.06); g.translate(0, (1 - k) * -420); g.rotate((1 - k) * 0.08);
      B.shadowed(g, () => rr(g, -w / 2, -h / 2, w, h, 26), '#f7f5ef', 0.45); R(g, -w / 2, -h / 2, w, h, 26, '#f7f5ef', 6); R(g, -w / 2 + 18, -h / 2 + 18, w - 36, h - 36, 16, '#e3e1d8', 3, '#c9c6ba');
      g.save(); g.translate(0, 10); OBJ[p.ex](g, { t0: env.t - lt, src: p.src, c: p.c }, env, w, h); g.restore();
      R(g, -w / 2 + 28, h / 2 - 96, 232, 64, 8, '#fff6b8', 4); T(g, p.label, -w / 2 + 28 + 116, h / 2 - 64, F.hero(34), RED); R(g, -w / 2 + 28 + 100, h / 2 - 112, 26, 18, 9, null, 4);
      if (p.cap) T(g, p.cap, w / 2 - 40, h / 2 - 64, F.cap(26), INK, 'right');
      magnifier(g, w / 2 - 120 + Math.sin(lt * 1.6) * 8, -h / 2 + 100, 1.2, 0); g.restore(); },
  });

  // ---- mtray: five slots, one fills per case (screen layer, bottom-left) ----
  const TRAY = ['board', 'sandwich', 'car', 'cell', 'hedge'];
  B.register('mtray', {
    defaults: { fills: [] }, ownEnter: true, size: () => [300, 70],
    draw(g, p, env) { const { t } = env; g.save(); R(g, 0, -34, 300, 68, 12, 'rgba(11,15,20,.72)', 0); g.fillStyle = RED; g.fillRect(0, -34, 8, 68); T(g, 'MISTAKES', 22, -22, F.monoX(13), 'rgba(245,243,238,.7)', 'left');
      for (let i = 0; i < 5; i++) { const x = 52 + i * 54, y = 8, f = p.fills[i] != null && t >= p.fills[i], k = f ? clamp(spring(t - p.fills[i], 'bouncy'), 0, 1.2) : 0; R(g, x - 22, y - 22, 44, 44, 8, 'rgba(245,243,238,.08)', 3, 'rgba(245,243,238,.35)'); if (f) { g.save(); g.translate(x, y); g.scale(k * 0.5, k * 0.5); R(g, -40, -40, 80, 80, 14, PAPER, 5); const kind = TRAY[i]; if (kind === 'board') { R(g, -26, -26, 52, 52, 4, '#d7ead0', 4); R(g, -6, 2, 12, 26, 3, '#c92a1f', 3); } else if (kind === 'sandwich') sandwich(g, 0, 0, 0.22, 0); else if (kind === 'car') carBody(g, 0, 18, 0.22, '#3b6fd8'); else if (kind === 'cell') { for (let q = -2; q <= 2; q++) R(g, q * 14 - 3, -26, 6, 52, 2, '#6C7889', 2); } else dogSil(g, -4, 26, 0.5, '#3b2a1a'); g.restore(); } } g.restore(); },
  });

  // ---- mstamp: THE MISTAKE (same design, size, position every time) ----
  B.register('mstamp', {
    defaults: { text: 'THE MISTAKE' }, ownEnter: true, size: () => [760, 200],
    draw(g, p, env) { const { lt } = env, sc = 1 + 1.4 * (1 - ease.expo(clamp(lt / 0.18))) - 0.05 * wobble(lt - 0.18, 5, 9); g.save(); g.globalAlpha *= clamp(lt / 0.05); g.rotate(-0.07); g.scale(sc, sc); const w = 700, h = 170; g.fillStyle = 'rgba(245,243,238,.9)'; rr(g, -w / 2, -h / 2, w, h, 16); g.fill(); g.strokeStyle = RED; g.lineWidth = 12; rr(g, -w / 2 + 8, -h / 2 + 8, w - 16, h - 16, 12); g.stroke(); txt(g, p.text, 0, 8, F.hero(118), RED);
      g.fillStyle = 'rgba(245,243,238,.9)'; for (let i = 0; i < 90; i++) { g.globalAlpha = 0.5; g.beginPath(); g.arc((hash(i * 1.7) - 0.5) * w, (hash(i * 2.9 + 4) - 0.5) * h, 1.2 + hash(i * 5.1) * 3.4, 0, 7); g.fill(); } g.restore(); burst(g, 0, 0, w * 0.5, RED, lt - 0.16, 14, 0.45); },
  });
  // ---- blackcut: full-screen black for 4 frames ----
  B.register('blackcut', { defaults: {}, ownEnter: true, size: () => [1, 1], draw(g, p, env) { g.fillStyle = '#000'; g.fillRect(-4, -4, 1928, 1088); } });

  // ---- casefolder: manila case folder with a number and an object icon drawn inside ----
  B.register('casefolder', {
    defaults: { n: 1, title: 'THE BOARD GAME', kind: 'board', openAt: 1e9, w: 330, h: 410, tone: 'bad' }, ownEnter: true, size: p => [p.w, p.h], anchors: p => ({ main: [0, 0, p.w, p.h] }),
    draw(g, p, env) { const { t, lt, theme } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, k = clamp(spring(lt, 'bouncy'), 0, 1.15), op = ease.out(lin(t, p.openAt, p.openAt + 0.4)); g.save(); g.globalAlpha *= clamp(lt / 0.08); g.translate(0, (1 - k) * 140); g.rotate((1 - k) * 0.2 + (p.tilt || 0));
      const M = theme.manila || '#E2C48D', body = () => { g.beginPath(); g.moveTo(x0, y0 + 40); g.lineTo(x0 + w * 0.12, y0 + 40); g.lineTo(x0 + w * 0.17, y0 + 8); g.lineTo(x0 + w * 0.5, y0 + 8); g.lineTo(x0 + w * 0.55, y0 + 40); g.lineTo(x0 + w, y0 + 40); g.lineTo(x0 + w, y0 + h); g.lineTo(x0, y0 + h); g.closePath(); };
      B.shadowed(g, body, M, 0.4); T(g, 'CASE Nº ' + p.n, x0 + w * 0.34, y0 + 26, F.monoX(20), '#5a4010'); g.save(); g.translate(0, 20); R(g, x0 + 22, y0 + 64, w - 44, h - 100, 10, PAPER, 0); g.save(); g.translate(0, -6); g.scale(0.36 + 0.06 * op, 0.36 + 0.06 * op); g.globalAlpha *= 0.4 + 0.6 * op; const kd = K[p.kind] || OBJ.A; if (K[p.kind]) K[p.kind](g, { fp: 1e9, drops: [], items: ['mask', 'cap', 'shoe'], times: [0, 0, 0], a: -9, l: { icon: 'big' }, r: { icon: 'tiny' }, b: 1e9, c: 1e9, src: p.src, open: [-9], mag: null, layers: [-9, -9, -9, -9, -9], hi: 7 }, { t: env.t, lt }, 700, 520); g.restore();
      T(g, p.title, 0, h / 2 - 76, F.hero(34), INK); g.restore(); if (op > 0.01) { g.save(); g.globalAlpha *= op; g.strokeStyle = RED; g.lineWidth = 8; rr(g, x0 + 8, y0 + 50, w - 16, h - 58, 14); g.stroke(); g.restore(); } g.restore(); },
  });
})();
// ===== scene: 5 HEISTS · 1 DUMB MISTAKE EACH (long-form, engine v2, 1920x1080) =====
const E = [], BT = [], SF = [], PO = [], SK = [];
const RM = [0, 60000, 120000, 180000, 240000, 300000, 360000, 420000];   // rooms: cold open, ch1..ch6, end card
const K = (room, k) => room + 2800 * k;
const el = (id, type, x, y, inn, props, o) => E.push({ id, type, at: [x, y], in: inn, props: props || {}, ...(o || {}) });
const bt = (at, beat, focus, o) => BT.push({ at, beat, ...(focus !== undefined && focus !== null ? { focus } : {}), ...(o || {}) });
const sf = (at, name, gain = -8, dur = 1, offset) => SF.push({ at, name, gain, dur, ...(offset ? { offset } : {}) });
const po = (at, pose, target) => PO.push(target ? [at, pose, { target }] : [at, pose]);
const sk = (at, amp = 12) => SK.push([at, amp]);
const IMG = n => 'videos/2026-12-04-heists-longform/build/img/' + n + '.png';
// recurring villains: coloured ILLUSTRATION cards (the badge is baked into each image), same design every time
const CON = {
  mono: { src: IMG('monopoly'), name: 'THE MONOPOLY GANG', nick: '“THE TRAIN GANG”', aspect: 0.78 },
  dealer: { src: IMG('dealer'), name: 'THE FAKE DEALER', nick: '“LEONARDO NOTARBARTOLO”', aspect: 1.0 },
  crew: { src: IMG('crew_antwerp'), name: 'THE ANTWERP CREW', nick: '“THREE HELPERS”', aspect: 0.78 },
  hatton: { src: IMG('hatton'), name: 'THE HATTON GARDEN CREW', nick: '“MOSTLY OLDER MEN”', aspect: 0.78 },
  brinks: { src: IMG('brinks'), name: 'THE BRINK’S GANG', nick: '“RUBBER MASKS”', aspect: 0.78 },
  specs: { src: IMG('specs'), name: '“SPECS”', nick: 'JOSEPH O’KEEFE', aspect: 1.0 },
  specsj: { src: IMG('specs_stripes'), name: '“SPECS”', nick: 'JOSEPH O’KEEFE', aspect: 1.0 },
  bet: { src: IMG('betchley'), name: 'THE MIDDLEMAN', nick: '“EDWARD BETCHLEY”', aspect: 1.0 },
  thief: { src: IMG('thief'), name: 'THE THIEF', nick: '“NEVER IDENTIFIED”', aspect: 1.0 },
  pick: { src: IMG('pickles'), name: 'PICKLES', nick: '“THE DOG”', aspect: 1.0 },
  corb: { src: IMG('corbett'), name: 'DAVID CORBETT', nick: '“THE DOG WALKER”', aspect: 1.0 },
};
const con = (id, who, x, y, inn, extra, o) => { const b = { flash: false, credit: '', ...CON[who], ...(extra || {}) }; b.w = b.w || 420; if (b.variant !== 'pip' && b.variant !== 'side' && !b.nameSize) b.nameSize = Math.min(44, Math.floor((b.w - 44 - 36) / (b.name.length * 0.5))); if (b.variant === 'side' && !b.nameSize) b.nameSize = 30; el(id, 'suspect', x, y, inn, b, o); };
const pr = (id, kind, x, y, inn, props, o) => el(id, 'prop', x, y, inn, { kind, ...(props || {}) }, o);
// THE MISTAKE sequence: 4-frame black cut + heartbeat, red stamp (top-left third, same every time), tray slot fills; exhibit drops on a tray under a magnifier
const MIST = [];
function mistake(pid, word, nextPid, ex, xs, slot, extra) {
  const w = `@${pid}:${word}`, end = `@${nextPid}>+0.1`;
  el('bk' + pid, 'blackcut', 0, 0, w, {}, { layer: 'screen', z: 9990, out: w + '+0.134' });
  el('ms' + pid, 'mstamp', 480, 330, w + '+0.14', {}, { layer: 'screen', out: end });
  sf(w, 'heartbeat_1', -5, 1.2); sf(w + '+0.14', 'rubber_stamp_2', -3, 0.6); sf(w + '+0.14', 'sub_drop_1', -8, 1.0); sk(w + '+0.16', 12);
  el('ex' + pid, 'exhibit', xs, 40, w + '+0.1', { ex, label: 'EXHIBIT ' + ex, ...(extra || {}) }, { out: end });
  MIST.push([w, slot]);
}
const STAGES = [
  { at: '@P009-0.7', dur: 1.2, theme: { stage: ['#143326', '#0d2219', '#06100c'], blobs: [['#8a6a1f', 0.38], ['#1f6a4a', 0.55], ['#2a4a3e', 0.5], ['#8a6a1f', 0.3]], dust: '#FFF0C0' } },
  { at: '@P029-0.7', dur: 1.2, theme: { stage: ['#1d3550', '#122236', '#080e16'], blobs: [['#3a7aaa', 0.5], ['#2a4278', 0.55], ['#7aa0c0', 0.4], ['#3a7aaa', 0.3]], dust: '#DCEBFF' } },
  { at: '@P051-0.7', dur: 1.2, theme: { stage: ['#3a2a18', '#262028', '#0e1218'], blobs: [['#b0601a', 0.5], ['#3e4e68', 0.55], ['#8a5a2a', 0.4], ['#b0601a', 0.3]], dust: '#FFD9A8' } },
  { at: '@P072-0.7', dur: 1.2, theme: { stage: ['#3a2812', '#25190b', '#120c05'], blobs: [['#8a5a1f', 0.55], ['#7a2a1c', 0.5], ['#3e3020', 0.55], ['#8a5a1f', 0.4]], dust: '#FFE4B8' } },
  { at: '@P093-0.7', dur: 1.2, theme: { stage: ['#1f3a22', '#142a17', '#08140a'], blobs: [['#d9a21b', 0.45], ['#2a7a3a', 0.55], ['#3a5a30', 0.5], ['#d9a21b', 0.3]], dust: '#F0FFD0' } },
  { at: '@P112-0.7', dur: 1.2, theme: { stage: ['#3a2a1a', '#2a1d10', '#120c06'], blobs: [['#8a5a2a', 0.55], ['#6a3a20', 0.5], ['#3e3020', 0.55], ['#8a5a2a', 0.4]], dust: '#FFE4B8' } },
  { at: '@P120>+0.0', dur: 1.0, theme: { stage: ['#26354A', '#152030', '#0B0F14'], blobs: [['#1F5F7A', 0.58], ['#2A4278', 0.55], ['#1E4A4A', 0.5], ['#1F5F7A', 0.4]], dust: '#DCEBFF' } },
];
const R0 = k => K(RM[0], k), R1 = k => K(RM[1], k), R2 = k => K(RM[2], k), R3 = k => K(RM[3], k), R4 = k => K(RM[4], k), R5 = k => K(RM[5], k), R6 = k => K(RM[6], k);
// ---------------- COLD OPEN (P001-P008): the farmhouse table, real money ----------------
// P001: frame 0 — top-down table, banknote bundles thud onto the board, £2.6M counter, the gang card
pr('b1', 'board', R0(0) + 190, 110, -1, { w: 860, h: 540, drops: [0.15, 0.4, 0.65, 0.9], flip: '@P001:real' }, { out: '@P002-0.2' });
el('c1', 'counter', R0(0) + 190, -290, -1, { label: 'STOLEN FROM THE TRAIN', to: 2.6, decimals: 1, prefix: '£', suffix: ' MILLION', at: 0.15, dur: 0.85, tone: 'bad', size: 96, w: 700 }, { out: '@P002-0.2' });
con('k1', 'mono', R0(0) - 560, 60, 0.3, { w: 400, variant: 'card', file: true, caseNo: 'CASE Nº 1', flash: true }, { out: '@P002-0.2' });
bt(0, 'graphic-hero', ['b1', 'k1', 'c1'], { fill: 0.95, sy: 470, pose: 'point' }); for (const [i, t] of [0.15, 0.4, 0.65, 0.9].entries()) sf(t, 'thud_1', -7 - i * 0.5, 0.5); sf(0.15, 'money_counter_1', -11, 1.0); sf(0.3, 'camera_flash_1', -9, 0.6);
bt('@P001:farmhouse', 'graphic-hero', ['b1', 'c1'], { fill: 0.78, sy: 480, pose: 'chin' });
bt('@P001:monopoly', 'graphic-hero', ['b1', 'c1'], { fill: 0.66, maxH: 780, sy: 470, pose: 'point' });
bt('@P001:real', 'zoom-on-number', 'c1.value', { fill: 0.4, maxH: 400, sy: 470, pose: 'shock' }); sf('@P001:real', 'cash_register_1', -8, 1.0);
// P002: play money X, real notes check; a train passes behind
pr('t2', 'train', R0(1), -330, '@P002-0.3', { w: 1500, h: 170, cars: 4, a: '@P002:train-1.0', b: '@P002:train+0.8' }, { out: '@P003-0.2' });
pr('n2a', 'notes', R0(1) - 480, 90, '@P002-0.3', { w: 560, h: 420, mode: 'play' }, { out: '@P003-0.2' });
pr('n2b', 'notes', R0(1) + 420, 90, '@P002:real-0.3', { w: 560, h: 420, mode: 'real' }, { out: '@P003-0.2' });
el('s2a', 'stamp', R0(1) - 480, 100, '@P002:paper+0.3', { text: 'NOT THESE', tone: 'bad', size: 84 }, { rot: -0.1, out: '@P003-0.2' });
el('s2b', 'stamp', R0(1) + 420, 100, '@P002:notes', { text: 'THESE', tone: 'good', size: 96 }, { rot: -0.08, out: '@P003-0.2' });
bt('@P002', 'graphic-hero', ['n2a', 'n2b', 't2'], { move: 'whip', fill: 0.86, sy: 470, pose: 'point' }); sf('@P002-0.3', 'swoosh_2', -11, 0.5);
bt('@P002:paper', 'zoom-on-number', 'n2a', { fill: 0.34, maxH: 520, sy: 480, pose: 'shrug' }); sf('@P002:paper+0.3', 'rubber_stamp_2', -8, 0.5);
bt('@P002:real', 'zoom-on-number', 'n2b', { fill: 0.34, maxH: 520, sy: 480, pose: 'point' }); sf('@P002:notes', 'rubber_stamp_2', -8, 0.5); sf('@P002:train-0.6', 'whoosh_2', -12, 1.4);
bt('@P002:stolen', 'graphic-hero', ['t2', 'n2b'], { fill: 0.7, sy: 450, pose: 'chin' });
// P003: the board game is part of how they got caught (magnifier sweeps the board, a print glows; no ketchup yet)
pr('b3', 'board', R0(2), 60, '@P003-0.3', { w: 1100, h: 640, mag: ['@P003:board', '@P003:caught+0.3'], fp: '@P003:part' }, { out: '@P004-0.2' });
bt('@P003', 'graphic-hero', 'b3', { move: 'whip', fill: 0.6, maxH: 780, sy: 480, pose: 'point' }); sf('@P003-0.3', 'swoosh_2', -11, 0.5);
bt('@P003:part', 'zoom-on-number', 'b3', { fill: 0.56, maxH: 760, sy: 480, pose: 'shock' }); sf('@P003:part', 'suspense_drone_1', -12, 2.0);
// P004: the plans are huge, the mistakes are tiny
pr('bp4', 'blueprint', R0(3), 60, '@P004-0.3', { w: 1300, h: 640, a: '@P004', dot: '@P004:mistakes' }, { out: '@P005-0.2' });
el('h4', 'text', R0(3), -400, '@P004:plans', { lines: [[['THE PLANS ARE ', 'paper'], ['HUGE', 'good']]], size: 84 }, { out: '@P004:mistakes' });
el('t4', 'text', R0(3), -400, '@P004:mistakes', { lines: [[['THE MISTAKES ARE ', 'paper'], ['TINY', 'bad']]], size: 84 }, { out: '@P005-0.2' });
bt('@P004', 'graphic-hero', ['bp4', 'h4'], { move: 'whip', fill: 0.78, sy: 480, pose: 'chin' }); sf('@P004-0.3', 'swoosh_2', -11, 0.5); sf('@P004:plans', 'paper_rustle_2', -9, 1.2);
bt('@P004:huge', 'graphic-hero', 'bp4', { fill: 0.74, sy: 500, pose: 'point' });
bt('@P004:tiny', 'zoom-on-number', 'bp4.dot', { fill: 0.2, maxH: 600, sx: 960, sy: 480, pose: 'shock' }); sf('@P004:tiny', 'pop_2', -6, 0.4); sk('@P004:tiny', 8);
// P005 / P006: five case folders fan out, one opens per item on its word
const FK = [['board', 'THE BOARD GAME'], ['sandwich', 'THE SANDWICH'], ['car', 'THE LISTENING CAR'], ['cell', 'THE PARTNER'], ['hedge', 'THE DOG']];
const FW = ['board', 'sandwich', 'car', 'partner', 'pickles'];
FK.forEach(([k, t], i) => el('f' + i, 'casefolder', R0(4) + (i - 2) * 370, 40 + Math.abs(i - 2) * 24, `@P005:five+${(i * 0.13).toFixed(2)}`, { n: i + 1, title: t, kind: k, src: IMG('specs_stripes'), openAt: `@P006:${FW[i]}`, tilt: (i - 2) * 0.05 }, { out: '@P007-0.2' }));
el('fiveT', 'text', R0(4), -420, '@P005-0.2', { lines: [[['FIVE ', 'accent'], ['ROBBERIES', 'paper']]], size: 100 }, { out: '@P007-0.2' });
bt('@P005', 'graphic-hero', ['fiveT', 'f0', 'f4'], { move: 'whip', fill: 0.92, sy: 480, pose: 'point' }); sf('@P005-0.3', 'swoosh_2', -11, 0.5); for (let i = 0; i < 5; i++) sf(`@P005:five+${(i * 0.13).toFixed(2)}`, 'pop_2', -9, 0.3);
bt('@P005:famous', 'graphic-hero', ['f0', 'f4'], { fill: 0.9, sy: 500, pose: 'chin' });
bt('@P005:dumb', 'zoom-on-number', 'f2', { fill: 0.28, maxH: 560, sy: 500, pose: 'shock' }); sf('@P005:dumb', 'pop_2', -8, 0.4);
FW.forEach((w, i) => { bt(`@P006:${w}`, 'graphic-hero', 'f' + i, { fill: 0.3, maxH: 600, sy: 500, pose: i % 2 ? 'point' : 'chin' }); sf(`@P006:${w}`, 'paper_fold_1', -9, 0.6); });
con('pk6', 'pick', R0(4) + 2 * 370 + 20, -340, '@P006:pickles', { w: 250, variant: 'pip', label: 'PICKLES', aspect: 0.9 }, { out: '@P007-0.2' });
// P007: five folders line up as rising steps 1 to 5
for (let i = 0; i < 5; i++) { const h = 270 + i * 46; el('st' + i, 'casefolder', R0(5) + (i - 2) * 330, 330 - h / 2, `@P007+${(i * 0.14).toFixed(2)}`, { n: i + 1, title: FK[i][1], kind: FK[i][0], src: IMG('specs_stripes'), w: 290, h, openAt: -1e9 }, { out: '@P008-0.2' }); }
bt('@P007', 'graphic-hero', ['st0', 'st4'], { move: 'whip', fill: 0.9, sy: 500, pose: 'point' }); sf('@P007-0.3', 'swoosh_2', -11, 0.5); for (let i = 0; i < 5; i++) sf(`@P007+${(i * 0.14).toFixed(2)}`, 'pop_2', -9 + i * 0.6, 0.3);
bt('@P007:bigger', 'zoom-on-number', 'st4', { fill: 0.24, maxH: 700, sy: 480, pose: 'shock' }); sf('@P007:bigger', 'riser_1', -12, 1.4);
// P008: whip back to the farmhouse; the title lands at the end
pr('b8', 'board', R0(6) + 190, 110, '@P008-0.3', { w: 860, h: 540, drops: ['@P008', '@P008+0.2', '@P008+0.4', '@P008+0.6'] }, { out: '@P009-0.2' });
con('k8', 'mono', R0(6) - 560, 60, '@P008-0.2', { w: 400, variant: 'card', file: true, caseNo: 'CASE Nº 1' }, { out: '@P009-0.2' });
el('ttl', 'headline', R0(7), 60, '@P008:farmhouse-0.1', { kicker: 'A BAD MATH CASE FILE', lines: [[['5 HEISTS', 'accent']], [['1 DUMB MISTAKE EACH', 'paper']]], size: 150, underAt: 0.7 }, { out: '@P009-0.2' });
bt('@P008', 'graphic-hero', ['b8', 'k8'], { move: 'whip', fill: 0.9, sy: 470, pose: 'point' }); sf('@P008-0.3', 'swoosh_2', -11, 0.5); sf('@P008', 'thud_1', -8, 0.5);
bt('@P008:farmhouse', 'graphic-hero', 'ttl', { move: 'whip', fill: 0.84, sy: 470, pose: 'shock', dur: 0.5 }); sf('@P008:farmhouse-0.1', 'deep_boom_1', -4, 2.0); sk('@P008:farmhouse', 12);
// ---------------- CH1 · THE MONOPOLY GANG (P009-P028) — British railway night: deep green + lamp amber ----------------
// P009 chapter card + gang card
el('h9', 'headline', R1(0) - 420, 40, '@P009-0.3', { kicker: 'CASE FILE Nº 1', lines: ['THE MONOPOLY', [['GANG', 'bad']]], size: 150, underAt: 1.0 }, { out: '@P010-0.2' });
con('g9', 'mono', R1(0) + 580, 40, '@P009-0.2', { w: 440, variant: 'card', file: true, caseNo: 'CASE Nº 1', flash: true, push: { at: '@P009', to: 1.12, dur: 2.6 } }, { out: '@P010-0.2' });
bt('@P009', 'graphic-hero', ['h9', 'g9'], { move: 'whip', fill: 0.9, sy: 470, pose: 'shrug' }); sf('@P009-0.6', 'tape_stop_1', -8, 1.0); sf('@P009-0.1', 'cinematic_hit_1', -9, 1.5); sf('@P009+0.7', 'camera_flash_1', -9, 0.6);
bt('@P009:monopoly', 'zoom-on-number', 'g9', { fill: 0.3, maxH: 760, sy: 520, pose: 'point' });
// P010 England, August 1963, the train rolls through the night
el('dc10', 'datecard', R1(1) - 640, -300, '@P010-0.2', { big: '1963', small: 'ENGLAND · AUGUST' }, { out: '@P011-0.2' });
pr('t10', 'train', R1(1), 80, '@P010-0.3', { w: 1500, h: 260, cars: 4, a: '@P010:royal-0.5', b: '@P010>+0.3' }, { out: '@P011-0.2' });
bt('@P010', 'graphic-hero', ['dc10', 't10'], { move: 'whip', fill: 0.86, sy: 470, pose: 'point' }); sf('@P010-0.3', 'swoosh_2', -11, 0.5); sf('@P010:royal', 'whoosh_2', -12, 2.0);
bt('@P010:train', 'graphic-hero', 't10', { fill: 0.84, sy: 520, pose: 'chin' });
bt('@P010:night', 'graphic-hero', ['dc10', 't10'], { fill: 0.86, sy: 470, pose: 'point' });
// P011 Royal Mail = the post office; sacks of used banknotes
el('cd11', 'card', R1(2) - 520, 20, '@P011-0.3', { w: 640, h: 380, lines: [{ t: 'ROYAL MAIL', size: 76, font: 'hero', at: '@P011:royal' }, { t: '=', size: 80, font: 'hero', tone: 'bad', at: '@P011:is' }, { t: 'THE POST OFFICE', size: 60, font: 'hero', at: '@P011:post' }], pad: 90 }, { out: '@P012-0.2' });
pr('s11', 'sacks', R1(2) + 420, 20, '@P011:sacks-0.3', { w: 640, h: 420, n: 12, a: '@P011:sacks', per: 0.07, label: 'USED BANKNOTES', labelAt: '@P011:used' }, { out: '@P012-0.2' });
bt('@P011', 'graphic-hero', 'cd11', { move: 'whip', fill: 0.4, maxH: 520, sy: 480, pose: 'point' }); sf('@P011-0.3', 'swoosh_2', -11, 0.5); sf('@P011:post', 'typewriter_2', -11, 1.0);
bt('@P011:sacks', 'graphic-hero', ['cd11', 's11'], { fill: 0.86, sy: 480, pose: 'chin' }); sf('@P011:sacks', 'cash_rustle_1', -9, 1.2);
bt('@P011:used', 'zoom-on-number', 's11', { fill: 0.38, maxH: 600, sy: 500, pose: 'shock' });
// P012 the gang intro card: about 15 men
con('g12', 'mono', R1(3) - 400, 40, '@P012-0.3', { w: 440, variant: 'card', file: true, caseNo: 'CASE Nº 1', flash: true, stamps: [{ text: 'WANTED', at: '@P012:plan', tone: 'bad', size: 54, rot: -0.1, y: 40 }] }, { out: '@P013-0.2' });
el('t12', 'text', R1(3) + 380, 20, '@P012:about-0.2', { lines: [[['ABOUT ', 'paper'], ['15', 'bad']], [['MEN', 'paper']]], size: 170 }, { out: '@P013-0.2' });
bt('@P012', 'graphic-hero', ['g12', 't12'], { move: 'whip', fill: 0.86, sy: 480, pose: 'point' }); sf('@P012-0.3', 'swoosh_2', -11, 0.5); sf('@P012-0.1', 'camera_flash_1', -10, 0.6);
bt('@P012:15', 'zoom-on-number', 't12', { fill: 0.3, maxH: 520, sx: 1200, sy: 480, pose: 'shock' }); sf('@P012:15', 'pop_2', -8, 0.4);
bt('@P012:plan', 'graphic-hero', 'g12', { fill: 0.3, maxH: 760, sy: 520, pose: 'chin' }); sf('@P012:plan', 'rubber_stamp_2', -7, 0.5);
// P013 step one: rig the signal
el('bd13', 'badge', R1(4) - 600, -300, '@P013-0.3', { text: 'STEP 1', tone: 'bad', size: 54 }, { out: '@P014-0.2' });
pr('sg13', 'signal', R1(4) - 80, 20, '@P013-0.3', { w: 420, h: 640, a: '@P013:thinks' }, { out: '@P014-0.2' });
con('p13', 'mono', R1(4) + 480, 60, '@P013:rig-0.2', { w: 300, variant: 'pip', label: 'THEY DID THIS', aspect: 0.78, arrow: { at: '@P013:rig', to: [-440, 0] } }, { out: '@P014-0.2' });
el('d13', 'text', R1(4) + 480, -330, '@P013:thinks', { lines: [[['STOP!', 'bad']]], size: 120 }, { out: '@P014-0.2' });
bt('@P013', 'graphic-hero', ['bd13', 'sg13', 'p13'], { move: 'whip', fill: 0.86, sy: 480, pose: 'point' }); sf('@P013-0.3', 'swoosh_2', -11, 0.5);
bt('@P013:signal', 'zoom-on-number', 'sg13', { fill: 0.24, maxH: 760, sy: 500, pose: 'chin' }); sf('@P013:signal', 'pop_2', -8, 0.4);
bt('@P013:traffic', 'graphic-hero', ['sg13', 'p13'], { fill: 0.74, sy: 480, pose: 'point' });
bt('@P013:thinks', 'zoom-on-number', 'sg13', { fill: 0.24, maxH: 760, sy: 500, pose: 'shock' }); sf('@P013:thinks', 'click_1', -8, 0.4); sf('@P013:thinks+0.1', 'car_stop_1', -12, 1.2);
// P014 the train stops at a bridge
pr('br14', 'bridge', R1(5), 40, '@P014-0.3', { w: 1200, h: 560, a: '@P014:stops-0.6' }, { out: '@P015-0.2' });
bt('@P014', 'graphic-hero', 'br14', { move: 'whip', fill: 0.84, sy: 500, pose: 'point' }); sf('@P014-0.3', 'swoosh_2', -11, 0.5); sf('@P014:stops', 'car_stop_2', -10, 1.2);
bt('@P014:bridge', 'zoom-on-number', 'br14', { fill: 0.6, maxH: 600, sy: 500, pose: 'chin' });
// P015 step two: 120 mail sacks
el('bd15', 'badge', R1(6) - 560, -300, '@P015-0.3', { text: 'STEP 2', tone: 'bad', size: 54 }, { out: '@P016-0.2' });
pr('s15', 'sacks', R1(6) - 120, 40, '@P015:grab-0.1', { w: 640, h: 520, n: 24, a: '@P015:grab', per: 0.05 }, { out: '@P016-0.2' });
el('c15', 'counter', R1(6) + 520, 60, '@P015:120-0.3', { label: 'MAIL SACKS', to: 120, at: '@P015:120', dur: 0.9, tone: 'bad', size: 190, w: 620 }, { out: '@P016-0.2' });
bt('@P015', 'graphic-hero', ['bd15', 's15', 'c15'], { move: 'whip', fill: 0.88, sy: 480, pose: 'point' }); sf('@P015-0.3', 'swoosh_2', -11, 0.5); sf('@P015:grab', 'cash_rustle_1', -9, 1.4);
bt('@P015:120', 'zoom-on-number', 'c15.value', { fill: 0.34, maxH: 400, sx: 1100, sy: 480, pose: 'shock' }); sf('@P015:120', 'money_counter_1', -12, 1.2);
// P016 about 2.6 million pounds
el('c16', 'counter', R1(7), 20, '@P016:2-0.3', { label: 'INSIDE THE SACKS', to: 2.6, decimals: 1, prefix: '£', suffix: ' MILLION', at: '@P016:2', dur: 1.0, tone: 'good', size: 190, w: 1100 }, { out: '@P017-0.2' });
bt('@P016', 'graphic-hero', 'c16', { move: 'whip', fill: 0.74, sy: 480, pose: 'point' }); sf('@P016-0.3', 'swoosh_2', -11, 0.5);
bt('@P016:2', 'zoom-on-number', 'c16.value', { fill: 0.6, maxH: 460, sy: 480, pose: 'shock' }); sf('@P016:2', 'cash_register_1', -9, 1.0); sk('@P016:million', 8);
// P017 scale: 2.5 tons of cash vs a car
pr('sc17', 'scale', R1(8), 20, '@P017-0.3', { w: 1000, h: 560, a: '@P017:heavier-0.4', dir: -1, l: { icon: 'cash', label: '2.5 TONS OF CASH', size: 30 }, r: { icon: 'car', label: 'A CAR', size: 30 } }, { out: '@P018-0.2' });
bt('@P017', 'graphic-hero', 'sc17', { move: 'whip', fill: 0.62, maxH: 860, sy: 500, pose: 'point' }); sf('@P017-0.3', 'swoosh_2', -11, 0.5);
bt('@P017:tons', 'zoom-on-number', 'sc17', { fill: 0.7, maxH: 640, sy: 500, pose: 'chin' }); sf('@P017:tons', 'pop_2', -8, 0.4);
bt('@P017:heavier', 'graphic-hero', 'sc17', { fill: 0.74, maxH: 760, sy: 500, pose: 'shock' }); sf('@P017:heavier-0.3', 'thud_2', -8, 0.8);
// P018 step three: hide at a farmhouse
el('bd18', 'badge', R1(9) - 600, -300, '@P018-0.3', { text: 'STEP 3', tone: 'bad', size: 54 }, { out: '@P019-0.2' });
pr('fm18', 'farm', R1(9) - 60, 40, '@P018-0.3', { w: 760, h: 560, a: '@P018:lie' }, { out: '@P019-0.2' });
el('ll18', 'stamp', R1(9) + 460, 60, '@P018:lie', { text: 'LIE LOW', tone: 'accent', size: 100 }, { rot: -0.08, out: '@P019-0.2' });
bt('@P018', 'graphic-hero', ['bd18', 'fm18', 'll18'], { move: 'whip', fill: 0.88, sy: 480, pose: 'point' }); sf('@P018-0.3', 'swoosh_2', -11, 0.5);
bt('@P018:farmhouse', 'zoom-on-number', 'fm18', { fill: 0.44, maxH: 640, sy: 500, pose: 'chin' });
bt('@P018:lie', 'graphic-hero', ['fm18', 'll18'], { fill: 0.78, sy: 480, pose: 'shrug' }); sf('@P018:lie', 'rubber_stamp_2', -7, 0.5);
// P019 game night with the real money
pr('b19', 'board', R1(10) - 100, 60, '@P019-0.3', { w: 860, h: 540, drops: ['@P019:monopoly', '@P019:monopoly+0.25', '@P019:real'] }, { out: '@P020-0.2' });
con('p19', 'mono', R1(10) + 580, 100, '@P019:pass-0.2', { w: 300, variant: 'pip', label: 'GAME NIGHT', aspect: 0.78 }, { out: '@P020-0.2' });
bt('@P019', 'graphic-hero', ['b19', 'p19'], { move: 'whip', fill: 0.9, sy: 480, pose: 'chin' }); sf('@P019-0.3', 'swoosh_2', -11, 0.5);
bt('@P019:monopoly', 'zoom-on-number', 'b19', { fill: 0.5, maxH: 680, sy: 480, pose: 'point' }); sf('@P019:monopoly', 'thud_1', -8, 0.5); sf('@P019:real', 'cash_rustle_1', -9, 1.0);
bt('@P019:real', 'graphic-hero', ['b19', 'p19'], { fill: 0.9, sy: 480, pose: 'shock' });
// P020 + P021 leave no trace: one checklist spans both paragraphs
el('cl20', 'checklist', R1(11), 20, '@P020-0.3', { title: 'LEAVE NO TRACE', w: 1100, h: 560, rows: [{ show: '@P020:wipe-0.2', t: 'WIPE THE PLACE DOWN', tick: '@P020:down' }, { show: '@P021:burn-0.4', t: 'BURN THE FARMHOUSE' }, { show: '@P021:reportedly', t: 'REPORTEDLY: NOBODY DID' }], lockOpen: '@P021:did' }, { out: '@P022-0.2' });
bt('@P020', 'graphic-hero', 'cl20', { move: 'whip', fill: 0.62, maxH: 760, sy: 500, pose: 'point' }); sf('@P020-0.3', 'swoosh_2', -11, 0.5); sf('@P020:wipe', 'paper_rustle_2', -9, 0.8);
bt('@P020:down', 'zoom-on-number', 'cl20.r0', { fill: 0.5, maxH: 300, sy: 500, pose: 'chin' }); sf('@P020:down', 'success_chime_1', -11, 0.7);
bt('@P021:burn', 'zoom-on-number', 'cl20.r1', { fill: 0.5, maxH: 300, sy: 500, pose: 'point' }); sf('@P021:burn', 'pop_2', -9, 0.4);
bt('@P021:reportedly', 'zoom-on-number', 'cl20.r2', { fill: 0.5, maxH: 300, sy: 500, pose: 'shrug' }); sf('@P021:reportedly', 'typewriter_2', -11, 0.8);
// P022 a tip sends police to the farm
pr('po22', 'police', R1(12) - 200, 60, '@P022:police-0.4', { w: 640, h: 440 }, { out: '@P023-0.2' });
el('tp22', 'card', R1(12) + 420, -20, '@P022:tip-0.05', { w: 520, h: 300, lines: [{ t: 'A TIP', size: 120, font: 'hero', tone: 'bad', at: '@P022:tip' }, { t: 'ANONYMOUS NOTE', size: 26, font: 'mono', tone: 'soft', at: '@P022:tip+0.2' }], pad: 80 }, { out: '@P023-0.2' });
bt('@P022', 'graphic-hero', ['po22', 'tp22'], { move: 'whip', fill: 0.84, sy: 480, pose: 'point' }); sf('@P022-0.3', 'swoosh_2', -11, 0.5); sf('@P022:tip', 'paper_slam_2', -9, 0.5); sf('@P022:police', 'siren_1', -16, 1.6);
bt('@P022:tip', 'zoom-on-number', 'tp22', { fill: 0.34, maxH: 460, sx: 1100, sy: 480, pose: 'shock' });
// P023 they wiped almost everything. Almost.
el('t23', 'text', R1(13) - 470, -40, '@P023-0.2', { lines: [[['WIPED ', 'paper'], ['ALMOST', 'accent']], [['EVERYTHING', 'paper']]], size: 110 }, { out: '@P024-0.2' });
pr('b23', 'board', R1(13) + 430, 60, '@P023:wiped-0.1', { w: 720, h: 460, fp: '@P023:almost#2' }, { out: '@P024-0.2' });
bt('@P023', 'graphic-hero', ['t23', 'b23'], { move: 'whip', fill: 0.9, sy: 480, pose: 'chin' }); sf('@P023-0.3', 'swoosh_2', -11, 0.5);
bt('@P023:almost#2', 'zoom-on-number', 'b23', { fill: 0.4, maxH: 520, sx: 1200, sy: 480, pose: 'shock' }); sf('@P023:almost#2', 'suspense_drone_1', -11, 1.6);
// P024 THE MISTAKE — EXHIBIT A: the board + the ketchup bottle, fingerprint lifts
mistake('P024', 'mistake', 'P025', 'A', R1(14), 0);
bt('@P024:mistake+0.02', 'graphic-hero', 'exP024', { dur: 0.05, lead: 0, fill: 0.44, sx: 1230, sy: 520, pose: 'point' });
bt('@P024:fingerprints', 'zoom-on-number', 'exP024', { fill: 0.5, maxH: 780, sx: 1230, sy: 520, pose: 'shock' }); sf('@P024:fingerprints', 'camera_shutter_1', -8, 0.5);
bt('@P024:ketchup', 'graphic-hero', 'exP024', { fill: 0.5, maxH: 780, sx: 1230, sy: 520, pose: 'chin' }); sf('@P024:ketchup', 'pop_2', -8, 0.4);
// P025 a board game and a ketchup bottle helped crack the case
bt('@P025:board', 'zoom-on-number', 'exP024', { fill: 0.5, maxH: 780, sx: 1230, sy: 520, pose: 'point' }); bt('@P025:crack', 'graphic-hero', 'exP024', { fill: 0.44, sx: 1230, sy: 520, pose: 'shrug' }); sf('@P025:crack', 'ding_2', -9, 0.7);
// P026 convicted: most of the gang (April 1964)
el('dc26', 'datecard', R1(15) - 700, -310, '@P026-0.2', { big: '1964', small: 'APRIL' }, { out: '@P027-0.2' });
con('k26', 'mono', R1(15) + 60, 40, '@P026-0.3', { w: 520, variant: 'card', stamps: [{ text: 'CONVICTED', at: '@P026:convicted', tone: 'bad', size: 78, rot: -0.1, y: 20 }, { text: 'MOST OF THE GANG', at: '@P026:most+0.4', tone: 'bad', size: 36, rot: -0.05, y: 150 }] }, { out: '@P027-0.2' });
bt('@P026', 'graphic-hero', ['dc26', 'k26'], { move: 'whip', fill: 0.8, sy: 480, pose: 'point' }); sf('@P026-0.3', 'swoosh_2', -11, 0.5); sf('@P026:court', 'gavel_1', -7, 0.8);
bt('@P026:convicted', 'zoom-on-number', 'k26', { fill: 0.34, maxH: 780, sy: 520, pose: 'shock' }); sf('@P026:convicted', 'rubber_stamp_2', -5, 0.5); sk('@P026:convicted', 10);
// P027 up to 30 years
el('j27', 'jail', R1(16), 40, '@P027-0.3', { w: 1000, h: 700, dropAt: '@P027:main', plaqueAt: '@P027:30-0.15', head: 'THE MAIN MEN', lines: [{ t: 'UP TO 30 YEARS', at: '@P027:30', size: 92 }] }, { out: '@P028-0.2' });
bt('@P027', 'graphic-hero', 'j27', { move: 'whip', fill: 0.62, maxH: 820, sy: 500, pose: 'point' }); sf('@P027-0.3', 'swoosh_2', -11, 0.5); sf('@P027:main', 'cell_door_1', -9, 1.0);
bt('@P027:30', 'zoom-on-number', 'j27', { fill: 0.52, maxH: 620, sy: 520, pose: 'shock' }); sf('@P027:30', 'rubber_stamp_2', -6, 0.5);
// P028 tons of cash undone by a game about money; tray slot 1
pr('b28', 'board', R1(17), 60, '@P028-0.3', { w: 980, h: 600, drops: ['@P028:cash', '@P028:cash+0.12', '@P028:cash+0.24', '@P028:cash+0.36', '@P028:cash+0.48'], fp: '@P028:undone' }, { out: '@P029-0.2' });
con('p28', 'mono', R1(17) + 760, 360, '@P028:undone-0.2', { w: 280, variant: 'pip', label: 'UNDONE', aspect: 0.78, xmark: '@P028:undone' }, { out: '@P029-0.2' });
bt('@P028', 'graphic-hero', 'b28', { move: 'whip', fill: 0.66, maxH: 780, sy: 480, pose: 'point' }); sf('@P028-0.3', 'swoosh_2', -11, 0.5);
bt('@P028:cash', 'zoom-on-number', 'b28', { fill: 0.6, maxH: 720, sy: 480, pose: 'chin' }); for (let i = 0; i < 5; i++) sf(`@P028:cash+${(i * 0.12).toFixed(2)}`, 'thud_1', -9, 0.4);
bt('@P028:undone', 'graphic-hero', ['b28', 'p28'], { fill: 0.82, sy: 480, pose: 'shock' }); sf('@P028:undone', 'rubber_stamp_2', -7, 0.5); sk('@P028:undone', 8);
// ---------------- CH2 · THE SANDWICH (P029-P050) — diamond vault: steel blue + diamond white ----------------
const ANT = 'brand/photos/leonardo-notarbartolo/1.jpg';
// P029 chapter card + the fake dealer card
el('h29', 'headline', R2(0) - 420, 40, '@P029-0.3', { kicker: 'CASE FILE Nº 2', lines: ['THE', [['SANDWICH', 'bad']]], size: 170, underAt: 1.0 }, { out: '@P030-0.2' });
con('g29', 'dealer', R2(0) + 520, 40, '@P029-0.2', { w: 440, variant: 'card', file: true, caseNo: 'CASE Nº 2', flash: true, push: { at: '@P029', to: 1.12, dur: 2.4 } }, { out: '@P030-0.2' });
bt('@P029', 'graphic-hero', ['h29', 'g29'], { move: 'whip', fill: 0.9, sy: 470, pose: 'shrug' }); sf('@P029-0.6', 'tape_stop_1', -8, 1.0); sf('@P029-0.1', 'cinematic_hit_1', -9, 1.5); sf('@P029+0.7', 'camera_flash_1', -9, 0.6);
bt('@P029:sandwich', 'zoom-on-number', 'h29', { fill: 0.4, maxH: 520, sy: 480, pose: 'point' }); sf('@P029:sandwich', 'pop_2', -8, 0.4);
// P030 Antwerp, the diamond capital (public-domain street photo)
el('ph30', 'photo', R2(1) - 300, 40, '@P030-0.3', { src: ANT, name: 'ANTWERP, BELGIUM', role: 'A STREET IN THE DIAMOND DISTRICT', credit: 'PHOTO: THORSTEN1997 · PUBLIC DOMAIN', w: 700, aspect: 0.72, fx: 0.5, fy: 0.5, tilt: -0.02 }, { out: '@P031-0.2' });
el('dc30', 'datecard', R2(1) + 620, -230, '@P030-0.2', { big: 'ANTWERP', small: 'BELGIUM' }, { out: '@P031-0.2' });
el('tg30', 'stamp', R2(1) + 600, 110, '@P030:diamond', { text: 'DIAMOND CAPITAL', tone: 'accent', size: 70 }, { rot: -0.06, out: '@P031-0.2' });
bt('@P030', 'graphic-hero', ['ph30', 'dc30'], { move: 'whip', fill: 0.88, sy: 480, pose: 'point' }); sf('@P030-0.3', 'swoosh_2', -11, 0.5); sf('@P030-0.1', 'camera_shutter_1', -9, 0.5);
bt('@P030:diamond', 'graphic-hero', ['ph30', 'tg30', 'dc30'], { fill: 0.88, sy: 480, pose: 'shock' }); sf('@P030:diamond', 'rubber_stamp_2', -8, 0.5);
// P031 the vault with layers of security
pr('v31', 'vault', R2(2), 40, '@P031-0.3', { w: 900, h: 640, layers: ['@P031:under', '@P031:vault', '@P031:layer', '@P031:layer#2', '@P031:security'] }, { out: '@P032-0.2' });
bt('@P031', 'graphic-hero', 'v31', { move: 'whip', fill: 0.5, maxH: 800, sy: 500, pose: 'point' }); sf('@P031-0.3', 'swoosh_2', -11, 0.5);
bt('@P031:vault', 'zoom-on-number', 'v31', { fill: 0.5, maxH: 780, sy: 500, pose: 'chin' }); for (const [i, w] of ['under', 'vault', 'layer', 'layer#2', 'security'].entries()) sf(`@P031:${w}`, i === 4 ? 'cell_door_2' : 'click_2', -9, 0.6);
bt('@P031:security', 'graphic-hero', 'v31', { fill: 0.54, maxH: 800, sy: 500, pose: 'shock' });
// P032 safe-deposit boxes = locked metal drawers you rent
pr('bx32', 'boxes', R2(3), 40, '@P032-0.3', { w: 1100, h: 560, cols: 6, rows: 4, one: '@P032:rent', idx: 9 }, { out: '@P033-0.2' });
el('rt32', 'stamp', R2(3) + 520, -330, '@P032:rent', { text: 'YOU RENT IT', tone: 'accent', size: 80 }, { rot: -0.06, out: '@P033-0.2' });
bt('@P032', 'graphic-hero', 'bx32', { move: 'whip', fill: 0.62, maxH: 700, sy: 500, pose: 'point' }); sf('@P032-0.3', 'swoosh_2', -11, 0.5);
bt('@P032:locked', 'zoom-on-number', 'bx32', { fill: 0.7, maxH: 640, sy: 500, pose: 'chin' }); sf('@P032:locked', 'click_1', -8, 0.4);
bt('@P032:rent', 'graphic-hero', ['bx32', 'rt32'], { fill: 0.74, sy: 480, pose: 'point' }); sf('@P032:rent', 'pop_2', -8, 0.4); sf('@P032:rent+0.2', 'rubber_stamp_2', -8, 0.5);
// P033 meet Notarbartolo: his claim, a rented office
con('d33', 'dealer', R2(4) - 300, 40, '@P033-0.3', { w: 1000, variant: 'side', pw: 420, noquote: true, quote: [['“I’M A', 'ink'], ['DIAMOND', 'ink'], ['DEALER”', 'bad']], quoteSub: 'HIS CLAIM', quoteSize: 76, quoteAt: '@P033:notarbartolo+0.2', flash: true }, { out: '@P034-0.2' });
el('of33', 'card', R2(4) + 640, 20, '@P033:rented-0.3', { w: 400, h: 440, lines: [{ t: 'RENTED', size: 66, font: 'hero', at: '@P033:rented' }, { t: 'OFFICE', size: 66, font: 'hero', tone: 'bad', at: '@P033:office' }, { t: 'IN THE BUILDING', size: 24, font: 'mono', tone: 'soft', at: '@P033:building' }], pad: 90 }, { out: '@P034-0.2' });
bt('@P033', 'graphic-hero', ['d33'], { move: 'whip', fill: 0.62, maxH: 800, sy: 500, pose: 'point' }); sf('@P033-0.3', 'swoosh_2', -11, 0.5); sf('@P033-0.1', 'camera_flash_1', -10, 0.6);
bt('@P033:dealer', 'zoom-on-number', 'd33', { fill: 0.58, maxH: 780, sy: 500, pose: 'chin' }); sf('@P033:dealer', 'typewriter_2', -11, 1.0);
bt('@P033:rented', 'graphic-hero', ['d33', 'of33'], { fill: 0.9, sy: 480, pose: 'point' }); sf('@P033:rented', 'door_swing_1', -10, 1.0);
// P034 a reason to come and go, for a long time (no number)
el('cal34', 'calendar', R2(5) + 120, 40, '@P034-0.3', { head: 'FOR A LONG TIME', band: 'navy', size: 190, w: 700, h: 480, pages: ['JAN', 'MAR', 'MAY', 'JUL', 'SEP', 'NOV'].map((m, i) => ({ at: `@P034:reason+${(i * 0.4).toFixed(2)}`, text: m, tone: i % 2 ? 'ink' : 'bad' })) }, { out: '@P035-0.2' });
con('p34', 'dealer', R2(5) - 460, 80, '@P034:gave-0.2', { w: 300, variant: 'pip', label: 'COMES AND GOES', aspect: 1.0 }, { out: '@P035-0.2' });
bt('@P034', 'graphic-hero', ['p34', 'cal34'], { move: 'whip', fill: 0.84, sy: 480, pose: 'chin' }); sf('@P034-0.3', 'swoosh_2', -11, 0.5);
bt('@P034:reason', 'zoom-on-number', 'cal34', { fill: 0.4, maxH: 600, sx: 1150, sy: 480, pose: 'point' }); for (let i = 0; i < 6; i++) sf(`@P034:reason+${(i * 0.4).toFixed(2)}`, 'page_turn_1', -11, 0.4);
// P035 one weekend in February 2003: the crew gets in
el('dc35', 'datecard', R2(6) - 640, -300, '@P035-0.2', { big: '2003', small: 'FEB · ONE WEEKEND' }, { out: '@P036-0.2' });
con('c35', 'crew', R2(6) + 80, 40, '@P035-0.2', { w: 520, variant: 'card', file: true, caseNo: 'THE CREW', flash: true }, { out: '@P036-0.2' });
pr('v35', 'vault', R2(6) + 700, 220, '@P035-0.1', { w: 420, h: 330, layers: ['@P035:vault', '@P035:vault', '@P035:vault', '@P035:vault', '@P035:vault'] }, { out: '@P036-0.2' });
bt('@P035', 'graphic-hero', ['dc35', 'c35'], { move: 'whip', fill: 0.82, sy: 480, pose: 'point' }); sf('@P035-0.3', 'swoosh_2', -11, 0.5);
bt('@P035:crew', 'zoom-on-number', 'c35', { fill: 0.32, maxH: 760, sy: 500, pose: 'shock' }); sf('@P035:crew', 'camera_flash_1', -9, 0.6);
bt('@P035:vault', 'graphic-hero', ['c35', 'v35'], { fill: 0.82, sy: 480, pose: 'point' }); sf('@P035:vault', 'door_bang_1', -9, 0.8);
// P036 box after box
pr('bx36', 'boxes', R2(7), 40, '@P036-0.3', { w: 1100, h: 560, cols: 6, rows: 4, open: ['@P036:break'], per: 0.1 }, { out: '@P037-0.2' });
bt('@P036', 'graphic-hero', 'bx36', { move: 'whip', fill: 0.64, maxH: 700, sy: 500, pose: 'point' }); sf('@P036-0.3', 'swoosh_2', -11, 0.5);
bt('@P036:box', 'zoom-on-number', 'bx36', { fill: 0.74, maxH: 660, sy: 500, pose: 'shock' }); for (let i = 0; i < 6; i++) sf(`@P036:break+${(i * 0.3).toFixed(2)}`, 'pop_2', -9, 0.3);
// P037 the haul: ~$100 million (est.)
el('c37', 'counter', R2(8), 20, '@P037:$100-0.3', { label: 'THE HAUL (BY ESTIMATES)', to: 100, prefix: '$', suffix: ' MILLION', at: '@P037:$100', dur: 1.1, tone: 'good', size: 190, w: 1200 }, { out: '@P038-0.2' });
bt('@P037', 'graphic-hero', 'c37', { move: 'whip', fill: 0.78, sy: 480, pose: 'point' }); sf('@P037-0.3', 'swoosh_2', -11, 0.5);
bt('@P037:$100', 'zoom-on-number', 'c37.value', { fill: 0.7, maxH: 460, sy: 480, pose: 'shock' }); sf('@P037:$100', 'cash_register_1', -9, 1.0); sk('@P037:million', 8);
// P038 $100K a year -> 1,000 years of paychecks (1,000 envelopes)
pr('en38', 'envelopes', R2(9) - 120, 40, '@P038-0.3', { w: 1200, h: 620, cols: 40, rows: 25, a: '@P038:$100', per: 0.0032 }, { out: '@P039-0.2' });
el('c38', 'counter', R2(9) + 120, -430, '@P038:1-0.2', { label: 'YEARS OF $100,000 PAYCHECKS', to: 1000, suffix: ' YEARS', at: '@P038:1', dur: 1.0, tone: 'bad', size: 120, w: 900 }, { out: '@P039-0.2' });
bt('@P038', 'graphic-hero', ['en38', 'c38'], { move: 'whip', fill: 0.84, sy: 480, pose: 'point' }); sf('@P038-0.3', 'swoosh_2', -11, 0.5); sf('@P038:$100', 'paper_rustle_2', -10, 2.0);
bt('@P038:1', 'zoom-on-number', 'c38.value', { fill: 0.5, maxH: 420, sy: 480, pose: 'shock' }); sf('@P038:1', 'money_counter_1', -12, 1.2);
// P039 LIKE moment
el('heart', 'heart', 1620, 760, '@P039:hit-0.15', { s: 64 }, { layer: 'screen', out: '@P039:hit+1.5' }); sf('@P039:hit-0.1', 'pop_2', -8, 0.3); sf('@P039:hit+0.35', 'ding_2', -11, 0.7);
el('lk39', 'stamp', R2(10), 40, '@P039-0.3', { text: 'DID THEY GET AWAY?', tone: 'accent', size: 100 }, { rot: -0.03, out: '@P040-0.2' });
bt('@P039', 'graphic-hero', 'lk39', { move: 'whip', fill: 0.64, sy: 500, pose: 'shock' }); sf('@P039-0.3', 'swoosh_2', -11, 0.5);
bt('@P039:away', 'graphic-hero', 'lk39', { fill: 0.72, sy: 500, pose: 'point' });
// P040 one job left: get rid of the trash and burn it
el('cl40', 'checklist', R2(11), 20, '@P040-0.3', { title: 'ONE JOB LEFT', w: 1100, h: 480, rows: [{ show: '@P040:boring-0.2', t: 'GET RID OF THE TRASH' }, { show: '@P040:burn-0.2', t: 'BURN IT' }], lockOpen: '@P040>' }, { out: '@P041-0.2' });
bt('@P040', 'graphic-hero', 'cl40', { move: 'whip', fill: 0.6, maxH: 700, sy: 500, pose: 'point' }); sf('@P040-0.3', 'swoosh_2', -11, 0.5);
bt('@P040:trash', 'zoom-on-number', 'cl40.r0', { fill: 0.5, maxH: 300, sy: 500, pose: 'chin' }); sf('@P040:trash', 'pop_2', -9, 0.4);
bt('@P040:burn', 'zoom-on-number', 'cl40.r1', { fill: 0.5, maxH: 300, sy: 500, pose: 'point' }); sf('@P040:burn', 'pop_2', -9, 0.4);
// P041 it didn't happen: the bag got dumped by a road near Brussels
pr('bg41', 'bag', R2(12), 40, '@P041-0.3', { w: 900, h: 560, a: '@P041:dumped-0.2' }, { out: '@P042-0.2' });
el('x41', 'stamp', R2(12) - 330, -250, '@P041:happen+0.2', { text: 'BURN IT', tone: 'bad', size: 80 }, { rot: -0.08, out: '@P042-0.2' });
bt('@P041', 'graphic-hero', ['bg41', 'x41'], { move: 'whip', fill: 0.72, sy: 480, pose: 'shrug' }); sf('@P041-0.3', 'swoosh_2', -11, 0.5); sf('@P041:happen+0.2', 'wrong_buzzer_2', -12, 0.6);
bt('@P041:dumped', 'zoom-on-number', 'bg41', { fill: 0.6, maxH: 620, sy: 500, pose: 'point' }); sf('@P041:dumped', 'thud_2', -8, 0.6);
// P042 THE MISTAKE — EXHIBIT B: the half-eaten salami sandwich in an evidence bag
mistake('P042', 'mistake', 'P043', 'B', R2(13), 1);
bt('@P042:mistake+0.02', 'graphic-hero', 'exP042', { dur: 0.05, lead: 0, fill: 0.44, sx: 1230, sy: 520, pose: 'point' });
bt('@P042:evidence', 'zoom-on-number', 'exP042', { fill: 0.5, maxH: 780, sx: 1230, sy: 520, pose: 'shock' }); sf('@P042:evidence', 'camera_shutter_1', -8, 0.5);
bt('@P042:salami', 'zoom-on-number', 'exP042', { fill: 0.52, maxH: 780, sx: 1230, sy: 520, pose: 'chin' }); sf('@P042:salami', 'pop_2', -8, 0.4);
// P043 police say the sandwich carried his DNA: the tiny code only you have
pr('dn43', 'dna', R2(14) - 60, 40, '@P043:dna-0.3', { w: 360, h: 640, a: '@P043:dna' }, { out: '@P044-0.2' });
el('tg43', 'tile', R2(14) + 380, -150, '@P043:police-0.3', { icon: 'badge', caption: 'POLICE SAY', cap: 34, w: 330, h: 360, iconS: 170, tilt: 0.02 }, { out: '@P044-0.2' });
el('cd43', 'card', R2(14) + 820, 40, '@P043:code-0.3', { w: 560, h: 330, lines: [{ t: 'ONLY YOURS', size: 70, font: 'hero', tone: 'bad', at: '@P043:only' }, { t: 'THE TINY CODE IN YOUR BODY', size: 26, font: 'mono', tone: 'soft', at: '@P043:tiny' }], pad: 80 }, { out: '@P044-0.2' });
bt('@P043', 'graphic-hero', ['dn43', 'tg43'], { move: 'whip', fill: 0.6, sx: 1200, sy: 480, pose: 'point' }); sf('@P043-0.3', 'swoosh_2', -11, 0.5);
bt('@P043:dna', 'zoom-on-number', 'dn43', { fill: 0.24, maxH: 760, sx: 1200, sy: 500, pose: 'chin' }); sf('@P043:dna', 'pop_2', -8, 0.4);
bt('@P043:code', 'graphic-hero', ['tg43', 'cd43'], { fill: 0.7, sx: 1250, sy: 480, pose: 'point' });
bt('@P043:only', 'zoom-on-number', 'cd43', { fill: 0.4, maxH: 440, sx: 1250, sy: 480, pose: 'shock' }); sf('@P043:only', 'rubber_stamp_2', -8, 0.5);
// P044 + P045: five days later he walks back in, and is arrested
el('dc44', 'datecard', R2(15) - 700, -280, '@P044-0.2', { big: '5 DAYS LATER', small: 'AFTER THE HEIST' }, { out: '@P046-0.2' });
pr('of44', 'vault', R2(15) + 100, 60, '@P044-0.2', { w: 520, h: 420, layers: ['@P044:diamond', '@P044:diamond+0.1', '@P044:diamond+0.2', '@P044:diamond+0.3', '@P044:diamond+0.4'] }, { out: '@P046-0.2' });
con('w44', 'dealer', R2(15) + 640, 40, '@P044:five', { w: 400, variant: 'card', flash: true, ring: '@P045:arrested', stamps: [{ text: 'ARRESTED', at: '@P045:arrested', tone: 'bad', size: 80, rot: -0.1, y: 30 }] }, { out: '@P046-0.2' });
bt('@P044', 'graphic-hero', ['dc44', 'of44'], { move: 'whip', fill: 0.84, sy: 480, pose: 'point' }); sf('@P044-0.3', 'swoosh_2', -11, 0.5); sf('@P044:five', 'clock_ticking_1', -12, 2.0);
bt('@P044:walks', 'graphic-hero', ['of44', 'w44'], { fill: 0.86, sy: 480, pose: 'shock' }); sf('@P044:walks', 'door_swing_1', -10, 1.0); sf('@P044:walks+0.3', 'footsteps_1', -10, 1.2);
bt('@P045:arrested', 'zoom-on-number', 'w44', { fill: 0.3, maxH: 760, sy: 520, pose: 'shock' }); sf('@P045:arrested', 'handcuff_click_1', -6, 0.6); sf('@P045:arrested+0.05', 'rubber_stamp_2', -5, 0.5); sk('@P045:arrested', 10);
// P046 Antwerp court 2005: the planner
el('gv46', 'tile', R2(17) - 400, 20, '@P046-0.2', { icon: 'gavel', caption: 'ANTWERP COURT', cap: 32, w: 380, h: 420, iconS: 210, tilt: -0.02 }, { out: '@P047-0.2' });
el('dc46', 'datecard', R2(17) + 160, -300, '@P046-0.2', { big: '2005', small: 'THE PLANNER' }, { out: '@P047-0.2' });
con('d46', 'dealer', R2(17) + 280, 90, '@P046:planner-0.3', { w: 360, variant: 'card', stamps: [{ text: 'THE PLANNER', at: '@P046:planner', tone: 'bad', size: 54, rot: -0.1, y: 30 }] }, { out: '@P047-0.2' });
bt('@P046', 'graphic-hero', ['gv46', 'dc46', 'd46'], { move: 'whip', fill: 0.86, sy: 480, pose: 'point' }); sf('@P046-0.3', 'swoosh_2', -11, 0.5); sf('@P046:court', 'gavel_1', -7, 0.8);
bt('@P046:planner', 'zoom-on-number', 'd46', { fill: 0.26, maxH: 760, sx: 1150, sy: 520, pose: 'chin' }); sf('@P046:planner', 'rubber_stamp_2', -6, 0.5);
// P047 sentenced to 10 years
el('j47', 'jail', R2(18), 40, '@P047-0.3', { w: 1000, h: 700, dropAt: '@P047:sentenced', plaqueAt: '@P047:10-0.15', head: 'THE PLANNER', lines: [{ t: '10 YEARS', at: '@P047:10', size: 130 }] }, { out: '@P048-0.2' });
bt('@P047', 'graphic-hero', 'j47', { move: 'whip', fill: 0.62, maxH: 820, sy: 500, pose: 'point' }); sf('@P047-0.3', 'swoosh_2', -11, 0.5); sf('@P047:sentenced', 'cell_door_1', -9, 1.0);
bt('@P047:10', 'zoom-on-number', 'j47', { fill: 0.54, maxH: 620, sy: 520, pose: 'shock' }); sf('@P047:10', 'rubber_stamp_2', -6, 0.5);
// P048 three crew, five years each; P049 diamonds never found
for (let i = 0; i < 3; i++) el('cw48' + i, 'tile', R2(19) + (i - 1) * 380 - 200, 40, `@P048:three+${(i * 0.18).toFixed(2)}`, { icon: 'cuffs', caption: '5 YEARS', cap: 44, w: 330, h: 380, iconS: 190, tilt: (i - 1) * 0.03 }, { out: '@P049-0.2' });
bt('@P048', 'graphic-hero', ['cw480', 'cw482'], { move: 'whip', fill: 0.84, sy: 480, pose: 'point' }); sf('@P048-0.3', 'swoosh_2', -11, 0.5); for (let i = 0; i < 3; i++) sf(`@P048:three+${(i * 0.18).toFixed(2)}`, 'pop_2', -9, 0.3);
bt('@P048:five', 'zoom-on-number', ['cw480', 'cw482'], { fill: 0.9, maxH: 520, sy: 480, pose: 'shock' });
pr('dm49', 'coins100', R2(20), 40, '@P049:diamonds-0.3', { w: 1100, h: 440, a: '@P049:diamonds', lit: [3, 17, 24, 41, 58, 66, 73, 90], shape: 'gem', b: '@P049:most' }, { out: '@P050-0.2' });
el('nv49', 'stamp', R2(20) + 380, -280, '@P049:never', { text: 'MOST NEVER FOUND', tone: 'bad', size: 74 }, { rot: -0.05, out: '@P050-0.2' });
bt('@P049', 'graphic-hero', ['dm49'], { move: 'whip', fill: 0.7, maxH: 620, sy: 500, pose: 'chin' }); sf('@P049-0.3', 'swoosh_2', -11, 0.5);
bt('@P049:never', 'graphic-hero', ['dm49', 'nv49'], { fill: 0.8, sy: 480, pose: 'shrug' }); sf('@P049:never', 'rubber_stamp_2', -7, 0.5);
// P050 $100M next to the sandwich; the scale tips toward the sandwich; tray slot 2
pr('sc50', 'scale', R2(21), 20, '@P050-0.3', { w: 1000, h: 560, a: '@P050:trash', dir: 1, l: { icon: 'cash', label: '$100 MILLION', size: 32 }, r: { icon: 'sandwich', label: 'HIS OWN TRASH', size: 32 } }, { out: '@P051-0.2' });
bt('@P050', 'graphic-hero', 'sc50', { move: 'whip', fill: 0.62, maxH: 860, sy: 500, pose: 'point' }); sf('@P050-0.3', 'swoosh_2', -11, 0.5);
bt('@P050:trash', 'zoom-on-number', 'sc50', { fill: 0.7, maxH: 640, sy: 500, pose: 'shock' }); sf('@P050:trash', 'thud_2', -7, 0.8); sk('@P050:trash', 8);
// ---------------- CH3 · THE CAR THAT WAS LISTENING (P051-P071) — London night street: sodium orange + concrete blue-gray ----------------
const HAT = 'brand/photos/hatton-garden/2.jpg';
// P051 chapter card + the crew card
el('h51', 'headline', R3(0) - 440, 40, '@P051-0.3', { kicker: 'CASE FILE Nº 3', lines: ['THE CAR THAT', [['WAS LISTENING', 'bad']]], size: 130, underAt: 1.0 }, { out: '@P052-0.2' });
con('g51', 'hatton', R3(0) + 560, 40, '@P051-0.2', { w: 480, variant: 'card', file: true, caseNo: 'CASE Nº 3', flash: true, push: { at: '@P051', to: 1.12, dur: 2.6 } }, { out: '@P052-0.2' });
bt('@P051', 'graphic-hero', ['h51', 'g51'], { move: 'whip', fill: 0.9, sy: 470, pose: 'shrug' }); sf('@P051-0.6', 'tape_stop_1', -8, 1.0); sf('@P051-0.1', 'cinematic_hit_1', -9, 1.5); sf('@P051+0.7', 'camera_flash_1', -9, 0.6);
bt('@P051:car', 'zoom-on-number', 'h51', { fill: 0.5, maxH: 520, sy: 480, pose: 'point' }); sf('@P051:car', 'pop_2', -8, 0.4);
// P052 London, Easter weekend 2015: Hatton Garden jewelry district (public-domain street photo)
el('ph52', 'photo', R3(1) - 300, 40, '@P052-0.3', { src: HAT, name: 'HATTON GARDEN, LONDON', role: 'THE JEWELRY DISTRICT', credit: 'PHOTO: UNKNOWN AUTHOR · PUBLIC DOMAIN', w: 700, aspect: 0.74, fx: 0.5, fy: 0.5, tilt: 0.02 }, { out: '@P053-0.2' });
el('dc52', 'datecard', R3(1) + 620, -230, '@P052-0.2', { big: '2015', small: 'LONDON · EASTER WEEKEND' }, { out: '@P053-0.2' });
el('jd52', 'stamp', R3(1) + 600, 110, '@P052:jewelry', { text: 'JEWELRY DISTRICT', tone: 'accent', size: 66 }, { rot: -0.06, out: '@P053-0.2' });
bt('@P052', 'graphic-hero', ['ph52', 'dc52'], { move: 'whip', fill: 0.88, sy: 480, pose: 'point' }); sf('@P052-0.3', 'swoosh_2', -11, 0.5); sf('@P052-0.1', 'camera_shutter_1', -9, 0.5);
bt('@P052:easter', 'zoom-on-number', 'dc52', { fill: 0.4, maxH: 300, sx: 1200, sy: 480, pose: 'chin' });
bt('@P052:jewelry', 'graphic-hero', ['ph52', 'jd52', 'dc52'], { fill: 0.88, sy: 480, pose: 'shock' }); sf('@P052:jewelry', 'rubber_stamp_2', -8, 0.5);
// P053 the building cross-section: a vault in the basement, the same drawers as before
pr('cu53', 'cutaway', R3(2) - 300, 40, '@P053-0.3', { w: 760, h: 700, a: '@P053:vault-0.2' }, { out: '@P054-0.2' });
pr('bx53', 'boxes', R3(2) + 520, 40, '@P053:same-0.3', { w: 720, h: 420, cols: 6, rows: 4, one: '@P053:boxes', idx: 9 }, { out: '@P054-0.2' });
bt('@P053', 'graphic-hero', ['cu53'], { move: 'whip', fill: 0.4, maxH: 860, sy: 500, pose: 'point' }); sf('@P053-0.3', 'swoosh_2', -11, 0.5);
bt('@P053:vault', 'zoom-on-number', 'cu53', { fill: 0.42, maxH: 860, sy: 500, pose: 'chin' }); sf('@P053:vault', 'door_bang_1', -9, 0.8);
bt('@P053:boxes', 'graphic-hero', ['cu53', 'bx53'], { fill: 0.9, sy: 500, pose: 'point' }); sf('@P053:boxes', 'click_1', -8, 0.4);
// P054 the gang: mostly older men, led by a man in his 70s
con('g54', 'hatton', R3(3) - 300, 40, '@P054-0.3', { w: 520, variant: 'card', file: true, caseNo: 'THE CREW', flash: true, push: { at: '@P054', to: 1.1, dur: 3.5 } }, { out: '@P055-0.2' });
el('t54', 'text', R3(3) + 420, 20, '@P054:mostly-0.2', { lines: [[['MOSTLY ', 'paper'], ['OLDER', 'accent']], [['MEN', 'paper']], [['LED BY A MAN', 'soft']], [['IN HIS ', 'soft'], ['70s', 'bad']]], size: 100 }, { out: '@P055-0.2' });
bt('@P054', 'graphic-hero', ['g54', 't54'], { move: 'whip', fill: 0.86, sy: 480, pose: 'point' }); sf('@P054-0.3', 'swoosh_2', -11, 0.5); sf('@P054-0.1', 'camera_flash_1', -10, 0.6);
bt('@P054:older', 'zoom-on-number', 't54', { fill: 0.36, maxH: 560, sx: 1200, sy: 480, pose: 'chin' });
bt('@P054:70s', 'graphic-hero', ['g54', 't54'], { fill: 0.86, sy: 480, pose: 'shock' }); sf('@P054:70s', 'pop_2', -8, 0.4);
// P055 step one: down the lift shaft (= the tunnel an elevator rides in)
el('bd55', 'badge', R3(4) - 640, -300, '@P055-0.3', { text: 'STEP 1', tone: 'bad', size: 54 }, { out: '@P056-0.2' });
pr('lf55', 'lift', R3(4) - 240, 40, '@P055-0.3', { w: 480, h: 700, a: '@P055:climb' }, { out: '@P056-0.2' });
el('df55', 'card', R3(4) + 500, 20, '@P055:lift-0.3', { w: 640, h: 360, lines: [{ t: 'LIFT SHAFT', size: 76, font: 'hero', at: '@P055:lift' }, { t: '=', size: 70, font: 'hero', tone: 'bad', at: '@P055:tunnel-0.3' }, { t: 'THE TUNNEL AN ELEVATOR RIDES IN', size: 26, font: 'mono', tone: 'soft', at: '@P055:tunnel' }], pad: 90 }, { out: '@P056-0.2' });
bt('@P055', 'graphic-hero', ['bd55', 'lf55', 'df55'], { move: 'whip', fill: 0.88, sy: 480, pose: 'point' }); sf('@P055-0.3', 'swoosh_2', -11, 0.5);
bt('@P055:lift', 'zoom-on-number', 'lf55', { fill: 0.3, maxH: 780, sx: 700, sy: 500, pose: 'chin' }); sf('@P055:lift', 'pop_2', -8, 0.4);
bt('@P055:tunnel', 'graphic-hero', ['lf55', 'df55'], { fill: 0.84, sy: 480, pose: 'point' }); sf('@P055:tunnel', 'typewriter_2', -11, 1.0);
// P056 step two: drill through a thick concrete vault wall
el('bd56', 'badge', R3(5) - 640, -300, '@P056-0.3', { text: 'STEP 2', tone: 'bad', size: 54 }, { out: '@P057-0.2' });
pr('dr56', 'drill', R3(5), 40, '@P056-0.3', { w: 1000, h: 520, a: '@P056:drill', b: '@P056>-0.2' }, { out: '@P057-0.2' });
bt('@P056', 'graphic-hero', ['bd56', 'dr56'], { move: 'whip', fill: 0.84, sy: 480, pose: 'point' }); sf('@P056-0.3', 'swoosh_2', -11, 0.5);
bt('@P056:drill', 'zoom-on-number', 'dr56', { fill: 0.74, maxH: 620, sy: 500, pose: 'shock' }); sf('@P056:drill', 'static_1', -12, 2.4); sk('@P056:drill', 7);
bt('@P056:concrete', 'graphic-hero', 'dr56', { fill: 0.84, sy: 500, pose: 'chin' });
// P057 boxes pop open
pr('bx57', 'boxes', R3(6), 40, '@P057-0.3', { w: 1100, h: 560, cols: 6, rows: 4, open: ['@P057:open'], per: 0.12 }, { out: '@P058-0.2' });
bt('@P057', 'graphic-hero', 'bx57', { move: 'whip', fill: 0.64, maxH: 700, sy: 500, pose: 'point' }); sf('@P057-0.3', 'swoosh_2', -11, 0.5); for (let i = 0; i < 6; i++) sf(`@P057:open+${(i * 0.3).toFixed(2)}`, 'pop_2', -9, 0.3);
bt('@P057:box', 'zoom-on-number', 'bx57', { fill: 0.74, maxH: 660, sy: 500, pose: 'shock' });
// P058 the haul: more than £14 million
el('c58', 'counter', R3(7), 20, '@P058:14-0.3', { label: 'THE HAUL', to: 14, prefix: '£', suffix: ' MILLION+', at: '@P058:14', dur: 1.0, tone: 'good', size: 190, w: 1200 }, { out: '@P059-0.2' });
bt('@P058', 'graphic-hero', 'c58', { move: 'whip', fill: 0.78, sy: 480, pose: 'point' }); sf('@P058-0.3', 'swoosh_2', -11, 0.5);
bt('@P058:14', 'zoom-on-number', 'c58.value', { fill: 0.7, maxH: 460, sy: 480, pose: 'shock' }); sf('@P058:14', 'cash_register_1', -9, 1.0); sk('@P058:million', 8);
// P059 saving £1,000 a month would take 1,100+ years
el('jr59', 'tile', R3(8) - 520, 40, '@P059:thousand-0.3', { icon: 'cash', caption: '£1,000 / MONTH', cap: 34, w: 360, h: 400, iconS: 200, tilt: -0.03 }, { out: '@P060-0.2' });
el('c59', 'counter', R3(8) + 260, 40, '@P059:1-0.3', { label: 'YEARS TO SAVE IT', to: 1100, suffix: '+ YEARS', at: '@P059:1', dur: 1.2, tone: 'bad', size: 150, w: 900 }, { out: '@P060-0.2' });
bt('@P059', 'graphic-hero', ['jr59', 'c59'], { move: 'whip', fill: 0.86, sy: 480, pose: 'chin' }); sf('@P059-0.3', 'swoosh_2', -11, 0.5); sf('@P059:thousand', 'pop_2', -8, 0.4);
bt('@P059:1', 'zoom-on-number', 'c59.value', { fill: 0.5, maxH: 420, sx: 1150, sy: 480, pose: 'shock' }); sf('@P059:1', 'money_counter_1', -12, 1.4);
// P060 SEND moment
el('plane', 'plane', 1690, 930, '@P060:send-0.05', { dx: 190, dy: -330 }, { layer: 'screen', out: '@P060:send+1.5' }); sf('@P060:send-0.05', 'swoosh_2', -9, 1.0);
el('sd60', 'stamp', R3(9), 40, '@P060-0.3', { text: 'SEND THIS TO THAT FRIEND', tone: 'accent', size: 90 }, { rot: -0.03, out: '@P061-0.2' });
bt('@P060', 'graphic-hero', 'sd60', { move: 'whip', fill: 0.7, sy: 500, pose: 'shock' }); sf('@P060-0.3', 'swoosh_2', -11, 0.5);
bt('@P060:friend', 'graphic-hero', 'sd60', { fill: 0.76, sy: 500, pose: 'point' });
// P061 + P062 cameras everywhere; police spot a car (one CCTV wall across both)
pr('cc61', 'cctv', R3(10), 40, '@P061-0.3', { w: 1300, h: 640, a: '@P062:spot', hi: 8 }, { out: '@P063-0.2' });
bt('@P061', 'graphic-hero', 'cc61', { move: 'whip', fill: 0.7, maxH: 780, sy: 500, pose: 'point' }); sf('@P061-0.3', 'swoosh_2', -11, 0.5); sf('@P061:cameras', 'static_2', -16, 2.0);
bt('@P062:comb', 'graphic-hero', 'cc61', { fill: 0.76, maxH: 780, sy: 500, pose: 'chin' });
bt('@P062:spot', 'zoom-on-number', 'cc61', { fill: 0.88, maxH: 780, sy: 500, pose: 'shock' }); sf('@P062:spot', 'pop_2', -8, 0.4); sf('@P062:spot', 'camera_shutter_1', -8, 0.5);
// P063 detectives hide listening devices in the gang's cars
pr('cr63', 'car', R3(12) + 100, 60, '@P063-0.3', { w: 900, h: 540, a: '@P063:hide' }, { out: '@P064-0.2' });
el('dt63', 'tile', R3(12) - 620, 40, '@P063:detectives-0.3', { icon: 'badge', caption: 'DETECTIVES', cap: 32, w: 330, h: 360, iconS: 170, tilt: -0.03 }, { out: '@P064-0.2' });
bt('@P063', 'graphic-hero', ['dt63', 'cr63'], { move: 'whip', fill: 0.88, sy: 480, pose: 'point' }); sf('@P063-0.3', 'swoosh_2', -11, 0.5);
bt('@P063:hide', 'zoom-on-number', 'cr63', { fill: 0.6, maxH: 640, sy: 500, pose: 'chin' }); sf('@P063:hide', 'pop_2', -8, 0.4); sf('@P063:hide+0.3', 'click_2', -9, 0.4);
// P064 THE MISTAKE — EXHIBIT C: the car with a tiny mic, sound waves, empty bubbles (paraphrase)
mistake('P064', 'mistake', 'P065', 'C', R3(13), 2);
bt('@P064:mistake+0.02', 'graphic-hero', 'exP064', { dur: 0.05, lead: 0, fill: 0.44, sx: 1230, sy: 520, pose: 'point' });
bt('@P064:talking', 'zoom-on-number', 'exP064', { fill: 0.5, maxH: 780, sx: 1230, sy: 520, pose: 'shock' }); sf('@P064:talking', 'pop_2', -8, 0.4);
bt('@P064:arguing', 'graphic-hero', 'exP064', { fill: 0.5, maxH: 780, sx: 1230, sy: 520, pose: 'chin' }); sf('@P064:arguing', 'crowd_murmur_courtroom_1', -16, 3.0);
bt('@P064:loot', 'zoom-on-number', 'exP064', { fill: 0.52, maxH: 780, sx: 1230, sy: 520, pose: 'point' });
// P065 every word gets recorded
pr('tp65', 'tape', R3(14) + 400, 40, '@P065-0.3', { w: 700, h: 460 }, { out: '@P066-0.2' });
bt('@P065', 'graphic-hero', 'tp65', { move: 'whip', fill: 0.4, maxH: 660, sx: 1230, sy: 500, pose: 'point' }); sf('@P065-0.3', 'swoosh_2', -11, 0.5); sf('@P065:every', 'tape_zip_1', -12, 1.8);
bt('@P065:recorded', 'zoom-on-number', 'tp65', { fill: 0.5, maxH: 660, sx: 1230, sy: 500, pose: 'shock' });
// P066 May 2015: nine arrested
el('dc66', 'datecard', R3(15) - 660, -280, '@P066-0.2', { big: 'MAY 2015', small: 'POLICE MOVE IN' }, { out: '@P067-0.2' });
pr('cf66', 'cuffs', R3(15) + 100, 20, '@P066:arrest-0.2', { w: 900, h: 420, n: 9, a: '@P066:nine-0.4', per: 0.16 }, { out: '@P067-0.2' });
el('n66', 'text', R3(15) + 100, -300, '@P066:nine', { lines: [[['9 ', 'bad'], ['ARRESTED', 'paper']]], size: 120 }, { out: '@P067-0.2' });
bt('@P066', 'graphic-hero', ['dc66', 'cf66'], { move: 'whip', fill: 0.84, sy: 480, pose: 'point' }); sf('@P066-0.3', 'swoosh_2', -11, 0.5);
bt('@P066:nine', 'zoom-on-number', ['cf66', 'n66'], { fill: 0.6, maxH: 700, sy: 480, pose: 'shock' }); for (let i = 0; i < 9; i++) { const v = (i * 0.16 - 0.4).toFixed(2); sf(`@P066:nine${v < 0 ? '' : '+'}${v}`, 'handcuff_click_2', -12, 0.4); }
// P067 the judge: biggest burglary in English legal history
el('gv67', 'tile', R3(16) - 520, 20, '@P067:judge-0.3', { icon: 'gavel', caption: 'THE JUDGE', cap: 34, w: 360, h: 420, iconS: 210, tilt: -0.02 }, { out: '@P068-0.2' });
el('q67', 'card', R3(16) + 300, 20, '@P067:biggest-0.3', { w: 900, h: 420, lines: [{ t: '“BIGGEST BURGLARY', size: 76, font: 'hero', at: '@P067:biggest' }, { t: 'IN ENGLISH LEGAL HISTORY”', size: 60, font: 'hero', tone: 'bad', at: '@P067:english' }, { t: '— THE JUDGE', size: 30, font: 'mono', tone: 'soft', at: '@P067:history' }], pad: 120 }, { out: '@P068-0.2' });
bt('@P067', 'graphic-hero', ['gv67', 'q67'], { move: 'whip', fill: 0.88, sy: 480, pose: 'point' }); sf('@P067-0.3', 'swoosh_2', -11, 0.5); sf('@P067:judge', 'gavel_1', -7, 0.8);
bt('@P067:biggest', 'zoom-on-number', 'q67', { fill: 0.52, maxH: 520, sx: 1150, sy: 480, pose: 'chin' }); sf('@P067:biggest', 'typewriter_2', -11, 1.2);
bt('@P067:history', 'graphic-hero', ['gv67', 'q67'], { fill: 0.88, sy: 480, pose: 'shock' });
// P068-P070 verdict bars, three lines stacking on one plaque (7 years / ~6 years / 10 years)
el('j68', 'jail', R3(17), 40, '@P068-0.3', { w: 1200, h: 760, dropAt: '@P068:four', plaqueAt: '@P068:seven-0.5', head: 'THE SENTENCES', lines: [{ t: '4 MEN · 7 YEARS', at: '@P068:seven', size: 76 }, { t: '2 MEN · ~6 YEARS', at: '@P069:six', size: 76 }, { t: 'ELECTRONICS MAN · 10 YEARS', at: '@P070:10', size: 58 }] }, { out: '@P071-0.2' });
bt('@P068', 'graphic-hero', 'j68', { move: 'whip', fill: 0.62, maxH: 860, sy: 500, pose: 'point' }); sf('@P068-0.3', 'swoosh_2', -11, 0.5); sf('@P068:four', 'cell_door_1', -9, 1.0);
bt('@P068:seven', 'zoom-on-number', 'j68', { fill: 0.6, maxH: 780, sy: 500, pose: 'shock' }); sf('@P068:seven', 'rubber_stamp_2', -6, 0.5);
bt('@P069:two', 'graphic-hero', 'j68', { fill: 0.64, maxH: 860, sy: 500, pose: 'chin' }); sf('@P069:six', 'rubber_stamp_2', -8, 0.5);
bt('@P070:10', 'zoom-on-number', 'j68', { fill: 0.62, maxH: 800, sy: 500, pose: 'shock' }); sf('@P070:10', 'rubber_stamp_2', -6, 0.5);
// P071 split screen: the drill smashes the wall | the car catches every word; tray slot 3
pr('dr71', 'drill', R3(18) - 560, 40, '@P071-0.3', { w: 880, h: 520, a: '@P071:concrete', b: '@P071:concrete+2.0' }, { out: '@P072-0.2' });
pr('cr71', 'car', R3(18) + 560, 60, '@P071:ride-0.5', { w: 860, h: 520, a: '@P071:ride-0.2', b: '@P071:ride', c: '@P071:without' }, { out: '@P072-0.2' });
bt('@P071', 'graphic-hero', ['dr71', 'cr71'], { move: 'whip', fill: 0.94, sy: 480, pose: 'point' }); sf('@P071-0.3', 'swoosh_2', -11, 0.5);
bt('@P071:concrete', 'zoom-on-number', 'dr71', { fill: 0.44, maxH: 620, sy: 500, pose: 'chin' });
bt('@P071:ride', 'zoom-on-number', 'cr71', { fill: 0.44, maxH: 620, sy: 500, pose: 'shock' }); sf('@P071:ride', 'pop_2', -8, 0.4); sk('@P071:ride', 8);
bt('@P071:talking', 'graphic-hero', ['dr71', 'cr71'], { fill: 0.94, sy: 480, pose: 'shrug' });
// ---------------- CH4 · THE DEADLINE (P072-P092) — 1950s Boston: sepia + calendar red ----------------
const FBI = 'brand/photos/brinks-robbery-boston-1950/1.jpg';
// P072 chapter card + the gang card
el('h72', 'headline', R4(0) - 420, 40, '@P072-0.3', { kicker: 'CASE FILE Nº 4', lines: ['THE', [['DEADLINE', 'bad']]], size: 170, underAt: 1.0 }, { out: '@P073-0.2' });
con('g72', 'brinks', R4(0) + 560, 40, '@P072-0.2', { w: 480, variant: 'card', file: true, caseNo: 'CASE Nº 4', flash: true, push: { at: '@P072', to: 1.12, dur: 2.4 } }, { out: '@P073-0.2' });
bt('@P072', 'graphic-hero', ['h72', 'g72'], { move: 'whip', fill: 0.9, sy: 470, pose: 'shrug' }); sf('@P072-0.6', 'tape_stop_1', -8, 1.0); sf('@P072-0.1', 'cinematic_hit_1', -9, 1.5); sf('@P072+0.7', 'camera_flash_1', -9, 0.6);
bt('@P072:deadline', 'zoom-on-number', 'h72', { fill: 0.4, maxH: 520, sy: 480, pose: 'point' }); sf('@P072:deadline', 'clock_ticking_1', -12, 1.6);
// P073 Boston, January 1950; a company that moves cash in armored trucks (generic truck, no logo)
el('dc73', 'datecard', R4(1) - 640, -300, '@P073-0.2', { big: '1950', small: 'BOSTON · JANUARY' }, { out: '@P074-0.2' });
pr('tr73', 'truck', R4(1) + 60, 60, '@P073-0.3', { w: 900, h: 520, a: '@P073:company-0.2' }, { out: '@P074-0.2' });
bt('@P073', 'graphic-hero', ['dc73', 'tr73'], { move: 'whip', fill: 0.86, sy: 480, pose: 'point' }); sf('@P073-0.3', 'swoosh_2', -11, 0.5); sf('@P073:company', 'car_stop_1', -12, 1.2);
bt('@P073:cash', 'zoom-on-number', 'tr73', { fill: 0.52, maxH: 560, sy: 500, pose: 'chin' });
bt('@P073:trucks', 'graphic-hero', ['dc73', 'tr73'], { fill: 0.86, sy: 480, pose: 'point' });
// P074 masked men walk into the building
con('g74', 'brinks', R4(2) - 100, 40, '@P074-0.3', { w: 680, variant: 'card', file: true, caseNo: 'THE GANG', flash: true, push: { at: '@P074', to: 1.14, dur: 3.1 }, stamps: [{ text: 'MASKED', at: '@P074:masked', tone: 'bad', size: 70, rot: -0.1, y: 40 }] }, { out: '@P075-0.2' });
bt('@P074', 'graphic-hero', 'g74', { move: 'whip', fill: 0.3, maxH: 720, sy: 470, pose: 'point' }); sf('@P074-0.3', 'swoosh_2', -11, 0.5); sf('@P074-0.1', 'camera_flash_1', -10, 0.6);
bt('@P074:masked', 'zoom-on-number', 'g74', { fill: 0.34, maxH: 740, sy: 470, pose: 'shock' }); sf('@P074:masked', 'rubber_stamp_2', -6, 0.5); sf('@P074:walk', 'door_swing_2', -11, 0.9);
// P075 three items snap onto the gang: mask, cap, shoes
pr('gr75', 'gear', R4(3) + 180, 60, '@P075-0.3', { w: 1200, h: 520, items: ['mask', 'cap', 'shoe'], times: ['@P075:masks', '@P075:caps', '@P075:shoes'] }, { out: '@P076-0.2' });
con('p75', 'brinks', R4(3) - 640, 60, '@P075-0.2', { w: 330, variant: 'pip', label: 'THE GANG', aspect: 0.78 }, { out: '@P076-0.2' });
bt('@P075', 'graphic-hero', ['p75', 'gr75'], { move: 'whip', fill: 0.9, sy: 480, pose: 'point' }); sf('@P075-0.3', 'swoosh_2', -11, 0.5);
for (const w of ['masks', 'caps', 'shoes']) { bt(`@P075:${w}`, 'zoom-on-number', 'gr75', { fill: 0.62, maxH: 600, sy: 500, pose: 'point' }); sf(`@P075:${w}`, 'pop_2', -8, 0.4); }
// P076 they tie up the workers and walk out with the money
pr('ca76', 'cart', R4(4), 40, '@P076-0.3', { w: 1000, h: 440, a: '@P076:walk-0.3' }, { out: '@P077-0.2' });
el('w76', 'text', R4(4), -300, '@P076:tie-0.1', { lines: [[['WORKERS ', 'paper'], ['TIED UP', 'bad']]], size: 90 }, { out: '@P077-0.2' });
bt('@P076', 'graphic-hero', ['w76', 'ca76'], { move: 'whip', fill: 0.8, sy: 480, pose: 'point' }); sf('@P076-0.3', 'swoosh_2', -11, 0.5); sf('@P076:tie', 'paper_fold_1', -9, 0.6);
bt('@P076:walk', 'zoom-on-number', 'ca76', { fill: 0.7, maxH: 520, sy: 500, pose: 'shock' }); sf('@P076:walk', 'footsteps_1', -10, 1.4);
// P077 more than $2.7 million in cash, checks and more
el('c77', 'counter', R4(5), 20, '@P077:$2-0.3', { label: 'CASH, CHECKS AND MORE', to: 2.7, decimals: 1, prefix: '$', suffix: ' MILLION+', at: '@P077:$2', dur: 1.0, tone: 'good', size: 190, w: 1200 }, { out: '@P078-0.2' });
bt('@P077', 'graphic-hero', 'c77', { move: 'whip', fill: 0.78, sy: 480, pose: 'point' }); sf('@P077-0.3', 'swoosh_2', -11, 0.5);
bt('@P077:$2', 'zoom-on-number', 'c77.value', { fill: 0.7, maxH: 460, sy: 480, pose: 'shock' }); sf('@P077:$2', 'cash_register_1', -9, 1.0); sk('@P077:million', 8);
// P078 dead ends, then the FBI keeps one of the caps (public-domain evidence photo)
pr('de78', 'deadend', R4(6) - 380, 40, '@P078-0.3', { w: 900, h: 640, n: 14, a: '@P078:chase' }, { out: '@P079-0.2' });
el('fb78', 'photo', R4(6) + 600, 20, '@P078:fbi-0.3', { src: FBI, name: 'FBI EVIDENCE', role: 'THE ROBBERS’ CHAUFFEUR CAP', credit: 'PHOTO: FBI · PUBLIC DOMAIN', w: 620, aspect: 0.66, fx: 0.5, fy: 0.5, tilt: 0.03 }, { out: '@P079-0.2' });
bt('@P078', 'graphic-hero', 'de78', { move: 'whip', fill: 0.5, maxH: 780, sy: 500, pose: 'point' }); sf('@P078-0.3', 'swoosh_2', -11, 0.5); for (let i = 0; i < 6; i++) sf(`@P078:chase+${(0.3 + i * 0.3).toFixed(2)}`, 'rubber_stamp_2', -12, 0.4);
bt('@P078:dead', 'zoom-on-number', 'de78', { fill: 0.52, maxH: 780, sy: 500, pose: 'shrug' });
bt('@P078:fbi', 'graphic-hero', ['de78', 'fb78'], { fill: 0.9, sy: 480, pose: 'point' }); sf('@P078:fbi', 'camera_shutter_1', -8, 0.5);
bt('@P078:caps', 'zoom-on-number', 'fb78', { fill: 0.3, maxH: 720, sx: 1200, sy: 500, pose: 'chin' });
// P079 the plan: stay quiet for six years
con('g79', 'brinks', R4(7) - 460, 40, '@P079-0.3', { w: 460, variant: 'card', flash: false }, { out: '@P080-0.2' });
el('pl79', 'card', R4(7) + 320, 20, '@P079:gang-0.1', { w: 760, h: 460, lines: [{ t: 'THE PLAN', size: 34, font: 'mono', tone: 'soft', at: '@P079:gang' }, { t: 'STAY QUIET', size: 110, font: 'hero', at: '@P079:quiet' }, { t: 'FOR 6 YEARS', size: 100, font: 'hero', tone: 'bad', at: '@P079:six' }], pad: 100 }, { out: '@P080-0.2' });
bt('@P079', 'graphic-hero', ['g79', 'pl79'], { move: 'whip', fill: 0.86, sy: 480, pose: 'point' }); sf('@P079-0.3', 'swoosh_2', -11, 0.5);
bt('@P079:quiet', 'zoom-on-number', 'pl79', { fill: 0.4, maxH: 520, sx: 1150, sy: 480, pose: 'chin' }); sf('@P079:quiet', 'typewriter_2', -11, 1.0);
bt('@P079:six', 'zoom-on-number', 'pl79', { fill: 0.44, maxH: 520, sx: 1150, sy: 480, pose: 'shock' }); sf('@P079:six', 'rubber_stamp_2', -7, 0.5);
// P080-P082 the statute of limitations: one wall clock with a 6-year dial across three paragraphs, then a flying calendar
pr('ck80', 'clock', R4(8), 40, '@P080-0.3', { w: 700, h: 700, label: '6 YEARS', a: '@P081:six', b: '@P082>' }, { out: '@P083-0.2' });
el('sl80', 'card', R4(8) + 760, -80, '@P080:legal-0.3', { w: 620, h: 340, lines: [{ t: 'STATUTE OF', size: 62, font: 'hero', at: '@P080:statute' }, { t: 'LIMITATIONS', size: 62, font: 'hero', tone: 'bad', at: '@P080:limitations' }, { t: 'A LEGAL DEADLINE', size: 26, font: 'mono', tone: 'soft', at: '@P080:deadline' }], pad: 90 }, { out: '@P081-0.2' });
el('cb81', 'stamp', R4(8) + 760, -60, '@P081:charged-0.6', { text: 'CAN’T BE CHARGED', tone: 'bad', size: 70 }, { rot: -0.06, out: '@P082-0.2' });
el('cl82', 'calendar', R4(8) + 760, 20, '@P082:wait-0.2', { head: 'WAIT IT OUT', band: 'bad', roll: { from: 1950, to: 1956, at: '@P082:wait', dur: 1.5 }, size: 190, w: 560, h: 420 }, { out: '@P083-0.2' });
bt('@P080', 'graphic-hero', ['ck80', 'sl80'], { move: 'whip', fill: 0.86, sy: 480, pose: 'point' }); sf('@P080-0.3', 'swoosh_2', -11, 0.5);
bt('@P080:statute', 'zoom-on-number', 'sl80', { fill: 0.36, maxH: 420, sx: 1250, sy: 480, pose: 'chin' }); sf('@P080:statute', 'typewriter_2', -11, 1.2);
bt('@P081:six', 'zoom-on-number', 'ck80', { fill: 0.4, maxH: 720, sy: 500, pose: 'point' }); sf('@P081:six', 'clock_ticking_2', -10, 3.0);
bt('@P081:charged', 'graphic-hero', ['ck80', 'cb81'], { fill: 0.86, sy: 480, pose: 'shock' }); sf('@P081:charged-0.6', 'rubber_stamp_2', -7, 0.5);
bt('@P082:wait', 'graphic-hero', ['ck80', 'cl82'], { fill: 0.86, sy: 480, pose: 'shrug' }); sf('@P082:wait', 'page_turn_2', -10, 1.4);
bt('@P082:clock', 'zoom-on-number', 'ck80', { fill: 0.42, maxH: 720, sy: 500, pose: 'point' });
// P083 Specs: jailed for a different burglary
con('s83', 'specsj', R4(11) - 200, 40, '@P083-0.3', { w: 520, variant: 'card', file: true, caseNo: 'THE PARTNER', flash: true, bars: '@P083:jail-0.1' }, { out: '@P084-0.2' });
el('ab83', 'stamp', R4(11) + 600, -100, '@P083:different-0.2', { text: 'ANOTHER BURGLARY', tone: 'accent', size: 60 }, { rot: -0.05, out: '@P084-0.2' });
bt('@P083', 'graphic-hero', ['s83'], { move: 'whip', fill: 0.34, maxH: 860, sy: 520, pose: 'point' }); sf('@P083-0.3', 'swoosh_2', -11, 0.5); sf('@P083-0.1', 'camera_flash_1', -10, 0.6);
bt('@P083:jail', 'zoom-on-number', 's83', { fill: 0.36, maxH: 860, sy: 520, pose: 'shock' }); sf('@P083:jail-0.1', 'cell_door_1', -7, 1.0);
bt('@P083:different', 'graphic-hero', ['s83', 'ab83'], { fill: 0.7, sy: 500, pose: 'chin' }); sf('@P083:different', 'rubber_stamp_2', -8, 0.5);
// P084 reportedly feels cheated out of his share
pr('mb84', 'moneybag', R4(12) + 100, 60, '@P084-0.3', { w: 560, h: 560, a: '@P084:cheated' }, { out: '@P085-0.2' });
con('p84', 'specsj', R4(12) - 420, 80, '@P084-0.2', { w: 320, variant: 'pip', label: 'REPORTEDLY', aspect: 1.0, flash: false }, { out: '@P085-0.2' });
bt('@P084', 'graphic-hero', ['p84', 'mb84'], { move: 'whip', fill: 0.84, sy: 480, pose: 'chin' }); sf('@P084-0.3', 'swoosh_2', -11, 0.5); sf('@P084:reportedly', 'typewriter_2', -11, 0.8);
bt('@P084:cheated', 'zoom-on-number', 'mb84', { fill: 0.34, maxH: 600, sy: 500, pose: 'shock' }); sf('@P084:cheated', 'page_tear_1', -9, 0.8);
// P085 THE MISTAKE — EXHIBIT D (P085 starts on "mistake", the "The" is the end of P084)
mistake('P085', 'mistake', 'P086', 'D', R4(13), 3, { src: IMG('specs_stripes'), c: '@P086:talks' });
bt('@P085:mistake+0.02', 'graphic-hero', 'exP085', { dur: 0.05, lead: 0, fill: 0.44, sx: 1230, sy: 520, pose: 'point' });
bt('@P085:secret', 'zoom-on-number', 'exP085', { fill: 0.5, maxH: 780, sx: 1230, sy: 520, pose: 'shock' }); sf('@P085:secret', 'suspense_drone_1', -11, 2.0);
bt('@P085:unhappy', 'graphic-hero', 'exP085', { fill: 0.54, maxH: 780, sx: 1230, sy: 520, pose: 'chin' });
// P086 so Specs talks: the empty bubble fills with sound bars
el('ht86', 'stamp', R4(13) + 560, 330, '@P086:talks', { text: 'HE TALKS', tone: 'bad', size: 74 }, { rot: -0.06, out: '@P086>+0.1' });
bt('@P086:specs', 'zoom-on-number', 'exP085', { fill: 0.58, maxH: 780, sx: 1230, sy: 520, pose: 'point' }); bt('@P086:talks', 'zoom-on-number', 'exP085', { fill: 0.62, maxH: 780, sx: 1230, sy: 520, pose: 'shock' }); sf('@P086:talks', 'rubber_stamp_2', -6, 0.5); sf('@P086:talks', 'static_1', -14, 1.2);
// P087 January 1956: less than a week left, 11 men charged
el('dc87', 'datecard', R4(15) - 700, -300, '@P087-0.2', { big: '1956', small: 'JANUARY' }, { out: '@P088-0.2' });
el('t87', 'text', R4(15) - 100, -160, '@P087:less-0.3', { lines: [[['LESS THAN ', 'paper'], ['A WEEK', 'bad']], [['LEFT ON THE CLOCK', 'paper']]], size: 100 }, { out: '@P088-0.2' });
el('c87', 'counter', R4(15) + 80, 190, '@P087:11-0.3', { label: 'MEN CHARGED', to: 11, at: '@P087:11', dur: 0.8, tone: 'bad', size: 160, w: 620 }, { out: '@P088-0.2' });
con('g87', 'brinks', R4(15) + 640, 150, '@P087:eleven-0.3', { w: 360, variant: 'card', flash: false, stamps: [{ text: 'CHARGED', at: '@P087:charged', tone: 'bad', size: 54, rot: -0.1, y: 40 }] }, { out: '@P088-0.2' });
bt('@P087', 'graphic-hero', ['dc87', 't87'], { move: 'whip', fill: 0.8, sy: 480, pose: 'point' }); sf('@P087-0.3', 'swoosh_2', -11, 0.5); sf('@P087:less', 'clock_ticking_1', -10, 2.0);
bt('@P087:11', 'zoom-on-number', 'c87.value', { fill: 0.34, maxH: 420, sx: 960, sy: 520, pose: 'shock' }); sf('@P087:11', 'money_counter_2', -12, 1.0); sf('@P087:charged', 'rubber_stamp_2', -6, 0.5);
bt('@P087:charged', 'graphic-hero', ['c87', 'g87'], { fill: 0.84, sy: 520, pose: 'chin' });
// P088 six years = 2,190 days; they missed it by less than seven
el('c88', 'counter', R4(16) - 100, -30, '@P088:2-0.3', { label: '6 YEARS ≈', to: 2190, suffix: ' DAYS', at: '@P088:2', dur: 1.2, tone: 'accent', size: 170, w: 1000 }, { out: '@P089-0.2' });
el('m88', 'text', R4(16) - 100, 300, '@P088:missed-0.2', { lines: [[['MISSED BY ', 'paper'], ['LESS THAN 7', 'bad']]], size: 100 }, { out: '@P089-0.2' });
bt('@P088', 'graphic-hero', 'c88', { move: 'whip', fill: 0.7, sy: 480, pose: 'point' }); sf('@P088-0.3', 'swoosh_2', -11, 0.5);
bt('@P088:2', 'zoom-on-number', 'c88.value', { fill: 0.56, maxH: 440, sy: 460, pose: 'shock' }); sf('@P088:2', 'money_counter_1', -12, 1.4);
bt('@P088:missed', 'graphic-hero', ['c88', 'm88'], { fill: 0.84, sy: 520, pose: 'chin' }); sf('@P088:missed', 'wrong_buzzer_2', -12, 0.6); sk('@P088:seven', 9);
// P089 eight men, life in prison
el('j89', 'jail', R4(17), 40, '@P089-0.3', { w: 1000, h: 700, dropAt: '@P089:eight', plaqueAt: '@P089:life-0.15', head: 'THE GANG', lines: [{ t: '8 MEN · LIFE', at: '@P089:life', size: 100 }] }, { out: '@P090-0.2' });
bt('@P089', 'graphic-hero', 'j89', { move: 'whip', fill: 0.62, maxH: 820, sy: 500, pose: 'point' }); sf('@P089-0.3', 'swoosh_2', -11, 0.5); sf('@P089:eight', 'cell_door_1', -9, 1.0);
bt('@P089:life', 'zoom-on-number', 'j89', { fill: 0.54, maxH: 620, sy: 520, pose: 'shock' }); sf('@P089:life', 'rubber_stamp_2', -6, 0.5); sk('@P089:life', 9);
// P090 Specs: pleaded guilty, testified, four years
con('s90', 'specsj', R4(18), 40, '@P090-0.3', { w: 560, variant: 'card', stamps: [{ text: 'PLEADED GUILTY', at: '@P090:pleaded', tone: 'bad', size: 46, rot: -0.1, y: -40 }, { text: 'TESTIFIED', at: '@P090:testified', tone: 'accent', size: 56, rot: 0.06, y: 70 }, { text: '4 YEARS', at: '@P090:four', tone: 'bad', size: 90, rot: -0.08, y: 190 }] }, { out: '@P091-0.2' });
bt('@P090', 'graphic-hero', 's90', { move: 'whip', fill: 0.3, maxH: 780, sy: 470, pose: 'point' }); sf('@P090-0.3', 'swoosh_2', -11, 0.5);
for (const [w, g] of [['pleaded', -7], ['testified', -7], ['four', -5]]) sf(`@P090:${w}`, 'rubber_stamp_2', g, 0.5);
bt('@P090:testified', 'zoom-on-number', 's90', { fill: 0.34, maxH: 780, sy: 470, pose: 'chin' }); bt('@P090:four', 'zoom-on-number', 's90', { fill: 0.36, maxH: 780, sy: 470, pose: 'shock' });
// P091 only about $60,000 was ever found
el('c91', 'counter', R4(19), 20, '@P091:$60-0.3', { label: 'EVER FOUND', to: 60000, prefix: '$', at: '@P091:$60', dur: 1.0, tone: 'bad', size: 190, w: 1000, sub: 'OF $2.7 MILLION+' }, { out: '@P092-0.2' });
bt('@P091', 'graphic-hero', 'c91', { move: 'whip', fill: 0.7, sy: 480, pose: 'chin' }); sf('@P091-0.3', 'swoosh_2', -11, 0.5);
bt('@P091:$60', 'zoom-on-number', 'c91.value', { fill: 0.56, maxH: 440, sy: 480, pose: 'shock' }); sf('@P091:$60', 'cash_register_1', -9, 1.0);
// P092 two cents of every dollar; tray slot 4
pr('cn92', 'coins100', R4(20), 20, '@P092:two-1.4', { w: 1300, h: 520, a: '@P092-0.2', lit: [41, 62], b: '@P092:two' }, { out: '@P093-0.2' });
el('tc92', 'stamp', R4(20), -300, '@P092:two+0.3', { text: '2¢ OF EVERY $1', tone: 'bad', size: 96 }, { rot: -0.04, out: '@P093-0.2' });
bt('@P092', 'graphic-hero', 'cn92', { move: 'whip', fill: 0.8, maxH: 640, sy: 500, pose: 'point' }); sf('@P092-0.3', 'swoosh_2', -11, 0.5);
bt('@P092:two', 'zoom-on-number', ['cn92', 'tc92'], { fill: 0.8, maxH: 760, sy: 500, pose: 'shock' }); sf('@P092:two', 'coin_single_1', -8, 0.6); sf('@P092:two+0.3', 'rubber_stamp_2', -7, 0.5);
// ---------------- CH5 · THE DOG (P093-P111) — 1966 London park: grass green + trophy gold (warmest chapter) ----------------
const TRO = 'brand/photos/jules-rimet-trophy/3.jpg';
const TROPHY = (id, x, y, inn, o, out) => el(id, 'photo', x, y, inn, { src: TRO, name: 'REPLICA', role: 'A COPY, NOT THE STOLEN ONE', credit: 'PHOTO: ABEL LAFLEUR · PUBLIC DOMAIN', fx: 0.5, fy: 0.3, aspect: 1.2, ...(o || {}) }, out);
// P093 chapter card with Pickles' card
el('h93', 'headline', R5(0) - 420, 40, '@P093-0.3', { kicker: 'CASE FILE Nº 5', lines: ['THE', [['DOG', 'accent']]], size: 200, underAt: 1.0, underTone: 'good' }, { out: '@P094-0.2' });
con('g93', 'pick', R5(0) + 520, 40, '@P093-0.2', { w: 440, variant: 'card', file: true, caseNo: 'CASE Nº 5', flash: true, push: { at: '@P093', to: 1.12, dur: 2.4 } }, { out: '@P094-0.2' });
bt('@P093', 'graphic-hero', ['h93', 'g93'], { move: 'whip', fill: 0.9, sy: 470, pose: 'shrug' }); sf('@P093-0.6', 'tape_stop_1', -8, 1.0); sf('@P093-0.1', 'cinematic_hit_1', -9, 1.5); sf('@P093+0.7', 'camera_flash_1', -9, 0.6);
bt('@P093:dog', 'zoom-on-number', 'g93', { fill: 0.32, maxH: 780, sx: 1250, sy: 520, pose: 'point' }); sf('@P093:dog', 'pop_2', -8, 0.4);
// P094 London, March 1966; the World Cup is four months away
el('dc94', 'datecard', R5(1) - 640, -300, '@P094-0.2', { big: '1966', small: 'LONDON · MARCH' }, { out: '@P095-0.2' });
el('c94', 'counter', R5(1) + 160, 40, '@P094:world-0.3', { label: 'UNTIL THE WORLD CUP', to: 4, suffix: ' MONTHS', at: '@P094:four-0.3', dur: 0.8, tone: 'good', size: 190, w: 900 }, { out: '@P095-0.2' });
bt('@P094', 'graphic-hero', ['dc94'], { move: 'whip', fill: 0.4, maxH: 300, sy: 460, pose: 'point' }); sf('@P094-0.3', 'swoosh_2', -11, 0.5);
bt('@P094:host', 'graphic-hero', ['dc94', 'c94'], { fill: 0.9, sy: 480, pose: 'chin' });
bt('@P094:four', 'zoom-on-number', 'c94.value', { fill: 0.5, maxH: 440, sx: 1150, sy: 480, pose: 'shock' }); sf('@P094:four', 'clock_ticking_1', -10, 1.4);
// P095 the golden trophy in a glass case at a stamp show (a REPLICA photo)
TROPHY('tr95', R5(2) - 200, 40, '@P095-0.3', { w: 520, tilt: -0.02 }, { out: '@P096-0.2' });
el('ss95', 'stamp', R5(2) + 440, -120, '@P095:stamp-0.1', { text: 'STAMP SHOW', tone: 'accent', size: 84 }, { rot: -0.06, out: '@P096-0.2' });
el('gd95', 'text', R5(2) + 440, 140, '@P095:golden-0.1', { lines: [[['GOLDEN', 'gold']], [['TROPHY', 'paper']]], size: 110 }, { out: '@P096-0.2' });
bt('@P095', 'graphic-hero', ['tr95'], { move: 'whip', fill: 0.32, maxH: 900, sy: 520, pose: 'point' }); sf('@P095-0.3', 'swoosh_2', -11, 0.5); sf('@P095-0.1', 'camera_shutter_1', -9, 0.5);
bt('@P095:golden', 'graphic-hero', ['tr95', 'gd95'], { fill: 0.84, sy: 500, pose: 'shock' }); sf('@P095:golden', 'ding_2', -9, 0.7);
bt('@P095:stamp', 'graphic-hero', ['tr95', 'ss95', 'gd95'], { fill: 0.9, sy: 500, pose: 'chin' }); sf('@P095:stamp', 'rubber_stamp_2', -8, 0.5);
// P096 Sunday 20 March: the case is empty, THE THIEF ? appears
el('dc96', 'datecard', R5(3) - 700, -300, '@P096-0.2', { big: 'SUN 20 MARCH', small: '1966' }, { out: '@P097-0.2' });
pr('gc96', 'glasscase', R5(3) - 100, 40, '@P096-0.3', { w: 560, h: 640, gone: '@P096:takes-0.3' }, { out: '@P097-0.2' });
con('th96', 'thief', R5(3) + 560, 40, '@P096:somebody-0.2', { w: 380, variant: 'card', file: true, caseNo: 'UNKNOWN', flash: true }, { out: '@P097-0.2' });
bt('@P096', 'graphic-hero', ['dc96', 'gc96'], { move: 'whip', fill: 0.62, sy: 480, pose: 'point' }); sf('@P096-0.3', 'swoosh_2', -11, 0.5);
bt('@P096:somebody', 'graphic-hero', ['gc96', 'th96'], { fill: 0.78, sy: 500, pose: 'chin' }); sf('@P096:somebody', 'camera_flash_1', -10, 0.6);
bt('@P096:takes', 'zoom-on-number', 'gc96', { fill: 0.32, maxH: 780, sx: 900, sy: 500, pose: 'shock' }); sf('@P096:takes-0.3', 'glass_clink_1', -10, 0.6);
// P097 the most famous trophy in sport is just gone
el('t97', 'text', R5(4), -150, '@P097-0.3', { lines: [[['THE MOST FAMOUS', 'paper']], [['TROPHY IN SPORT', 'paper']]], size: 100 }, { out: '@P098-0.2' });
el('g97', 'text', R5(4), 210, '@P097:gone-0.1', { lines: [[['GONE', 'bad']]], size: 280 }, { enter: 'slam', out: '@P098-0.2' });
bt('@P097', 'graphic-hero', ['t97'], { move: 'whip', fill: 0.62, maxH: 460, sy: 400, pose: 'point' }); sf('@P097-0.3', 'swoosh_2', -11, 0.5);
bt('@P097:gone', 'zoom-on-number', ['t97', 'g97'], { fill: 0.7, maxH: 900, sy: 500, pose: 'shock' }); sf('@P097:gone-0.1', 'deep_boom_2', -6, 1.2); sk('@P097:gone', 12);
// P098 + P099 the ransom note (no amount) with a piece of the lining from "Jackson"
pr('rn98', 'ransom', R5(5) - 200, 40, '@P098-0.3', { w: 800, h: 560, a: '@P099:lining', sig: '@P099:jackson' }, { out: '@P100-0.2' });
el('df98', 'card', R5(5) + 560, 20, '@P098:ransom#2-0.3', { w: 600, h: 400, lines: [{ t: 'RANSOM', size: 84, font: 'hero', tone: 'bad', at: '@P098:ransom#2' }, { t: '=', size: 70, font: 'hero', at: '@P098:pay-0.3' }, { t: 'PAY US, OR NEVER', size: 40, font: 'hero', at: '@P098:pay' }, { t: 'SEE IT AGAIN', size: 40, font: 'hero', at: '@P098:never' }], pad: 100 }, { out: '@P099-0.2' });
bt('@P098', 'graphic-hero', ['rn98'], { move: 'whip', fill: 0.4, maxH: 700, sy: 500, pose: 'point' }); sf('@P098-0.3', 'swoosh_2', -11, 0.5); sf('@P098:ransom', 'paper_slam_2', -9, 0.5);
bt('@P098:ransom#2', 'graphic-hero', ['rn98', 'df98'], { fill: 0.86, sy: 480, pose: 'chin' }); sf('@P098:ransom#2', 'typewriter_2', -11, 1.2);
bt('@P098:pay', 'zoom-on-number', 'df98', { fill: 0.32, maxH: 520, sx: 1250, sy: 480, pose: 'point' });
bt('@P099:lining', 'zoom-on-number', 'rn98', { fill: 0.5, maxH: 700, sy: 500, pose: 'shock' }); sf('@P099:lining', 'tape_zip_1', -10, 0.8);
bt('@P099:jackson', 'zoom-on-number', 'rn98', { fill: 0.5, maxH: 700, sy: 500, pose: 'chin' }); sf('@P099:jackson', 'pen_scratch_1', -10, 1.0);
// P100 Betchley is arrested
con('b100', 'bet', R5(7), 40, '@P100-0.3', { w: 460, variant: 'card', file: true, caseNo: 'THE MIDDLEMAN', flash: true, stamps: [{ text: 'ARRESTED', at: '@P100:arrest', tone: 'bad', size: 84, rot: -0.1, y: 40 }] }, { out: '@P101-0.2' });
el('dw100', 'stamp', R5(7) + 560, -150, '@P100:london-0.1', { text: 'LONDON DOCKWORKER', tone: 'accent', size: 54 }, { rot: -0.05, out: '@P101-0.2' });
bt('@P100', 'graphic-hero', ['b100', 'dw100'], { move: 'whip', fill: 0.6, sy: 500, pose: 'point' }); sf('@P100-0.3', 'swoosh_2', -11, 0.5); sf('@P100-0.1', 'camera_flash_1', -10, 0.6);
bt('@P100:arrest', 'zoom-on-number', 'b100', { fill: 0.34, maxH: 780, sy: 520, pose: 'shock' }); sf('@P100:arrest', 'handcuff_click_1', -6, 0.6); sf('@P100:arrest', 'rubber_stamp_2', -5, 0.5); sk('@P100:arrest', 9);
// P101 "I'm only the middleman" (his claim); the thief is a question mark; he never tells
con('b101', 'bet', R5(8) - 360, 40, '@P101-0.3', { w: 1000, variant: 'side', pw: 420, noquote: true, quote: [['“I’M ONLY', 'ink'], ['THE', 'ink'], ['MIDDLEMAN”', 'bad']], quoteSub: 'HIS CLAIM', quoteSize: 70, quoteAt: '@P101:only-0.1', flash: false }, { out: '@P102-0.2' });
con('t101', 'thief', R5(8) + 560, 60, '@P101:someone-0.2', { w: 330, variant: 'pip', label: 'WHO?', aspect: 1.0 }, { out: '@P102-0.2' });
el('lk101', 'icon', R5(8) - 260, 160, '@P101:never-0.1', { kind: 'lock', s: 190, col: 'gold', k: 1 }, { out: '@P102-0.2' });
bt('@P101', 'graphic-hero', ['b101'], { move: 'whip', fill: 0.62, maxH: 800, sy: 500, pose: 'point' }); sf('@P101-0.3', 'swoosh_2', -11, 0.5);
bt('@P101:only', 'zoom-on-number', 'b101', { fill: 0.6, maxH: 780, sy: 500, pose: 'chin' }); sf('@P101:only', 'typewriter_2', -11, 1.0);
bt('@P101:someone', 'graphic-hero', ['b101', 't101'], { fill: 0.9, sy: 480, pose: 'shrug' }); sf('@P101:someone', 'camera_flash_1', -10, 0.6);
bt('@P101:never', 'zoom-on-number', ['b101', 'lk101'], { fill: 0.7, maxH: 780, sy: 500, pose: 'shock' }); sf('@P101:never', 'click_1', -7, 0.4);
// P102 SUBSCRIBE moment
el('sub102', 'follow', 1480, 880, '@P102:subscribe-0.2', { press: 0.7, labels: ['SUBSCRIBE', '✓ SUBSCRIBED'] }, { layer: 'screen', out: '@P102:subscribe+1.6' });
sf('@P102:subscribe-0.15', 'pop_2', -9, 0.3); sf('@P102:subscribe+0.55', 'click_1', -8, 0.3); sf('@P102:subscribe+0.6', 'success_chime_1', -12, 1.2);
el('nw102', 'headline', R5(9), 40, '@P102-0.3', { kicker: 'A NEW CASE EVERY WEEK', lines: [[['A GOOD ', 'paper'], ['CATCH', 'accent']]], size: 150, underAt: 1.0 }, { out: '@P103-0.2' });
bt('@P102', 'graphic-hero', 'nw102', { move: 'whip', fill: 0.7, maxH: 640, sx: 860, sy: 480, st: 'corner', pose: 'point' }); sf('@P102-0.3', 'swoosh_2', -11, 0.5);
bt('@P102:subscribe', 'graphic-hero', 'nw102', { fill: 0.72, maxH: 640, sx: 860, sy: 480, st: 'corner', pose: 'follow' }); po('@P102:subscribe', 'follow', [1480, 880]); po('@P102:subscribe+1.2', 'point');
// P103 the police have a note, a middleman, still no trophy
el('n103', 'tile', R5(10) - 400, 40, '@P103-0.1', { icon: 'cheque', caption: 'THE NOTE', cap: 36, w: 330, h: 380, iconS: 190, tilt: -0.03, stamp: 'FOUND', tone: 'good', stampAt: '@P103:note+0.3', stampSize: 44 }, { out: '@P104-0.2' });
el('m103', 'tile', R5(10), 40, '@P103+0.15', { icon: 'cuffs', caption: 'MIDDLEMAN', cap: 34, w: 330, h: 380, iconS: 190, tilt: 0.02, stamp: 'FOUND', tone: 'good', stampAt: '@P103:middleman+0.3', stampSize: 44 }, { out: '@P104-0.2' });
el('t103', 'tile', R5(10) + 400, 40, '@P103+0.4', { icon: 'crown', caption: 'THE TROPHY', cap: 34, w: 330, h: 380, iconS: 190, tilt: -0.02, stamp: 'MISSING', tone: 'bad', stampAt: '@P103:trophy', stampSize: 44 }, { out: '@P104-0.2' });
bt('@P103', 'graphic-hero', ['n103', 'm103', 't103'], { move: 'whip', fill: 0.84, sy: 480, pose: 'point' }); sf('@P103-0.3', 'swoosh_2', -11, 0.5);
for (const w of ['note', 'middleman']) { sf(`@P103:${w}`, 'pop_2', -9, 0.3); sf(`@P103:${w}+0.3`, 'success_chime_2', -13, 0.8); }
bt('@P103:trophy', 'zoom-on-number', 't103', { fill: 0.3, maxH: 560, sx: 1150, sy: 500, pose: 'shock' }); sf('@P103:trophy', 'wrong_buzzer_1', -11, 0.7); sf('@P103:trophy', 'rubber_stamp_2', -7, 0.5);
// P104 one week later: Corbett and Pickles walk in south London
el('dc104', 'datecard', R5(11) - 700, -300, '@P104-0.2', { big: '1 WEEK LATER', small: 'SOUTH LONDON' }, { out: '@P105-0.2' });
con('c104', 'corb', R5(11) - 160, 40, '@P104:david-0.3', { w: 400, variant: 'card', file: true, caseNo: 'DOG WALKER', flash: true }, { out: '@P105-0.2' });
con('p104', 'pick', R5(11) + 380, 70, '@P104:dog-0.3', { w: 400, variant: 'card', file: true, caseNo: 'THE DOG', flash: true }, { out: '@P105-0.2' });
bt('@P104', 'graphic-hero', ['dc104'], { move: 'whip', fill: 0.4, maxH: 300, sy: 460, pose: 'point' }); sf('@P104-0.3', 'swoosh_2', -11, 0.5);
bt('@P104:david', 'graphic-hero', ['dc104', 'c104'], { fill: 0.84, sy: 500, pose: 'point' }); sf('@P104:david', 'camera_flash_1', -10, 0.6);
bt('@P104:dog', 'graphic-hero', ['c104', 'p104'], { fill: 0.84, sy: 500, pose: 'chin' }); sf('@P104:dog', 'camera_flash_1', -10, 0.6); sf('@P104:walk', 'footsteps_1', -11, 1.6);
bt('@P104:london', 'zoom-on-number', 'p104', { fill: 0.3, maxH: 780, sx: 1200, sy: 520, pose: 'shock' });
// P105 Pickles sniffs a newspaper-wrapped package under a hedge
pr('hd105', 'hedge', R5(12) + 100, 60, '@P105-0.3', { w: 980, h: 560, a: '@P105:package-0.2' }, { out: '@P106-0.2' });
con('p105', 'pick', R5(12) - 520, 80, '@P105:sniffs-0.3', { w: 320, variant: 'pip', label: 'SNIFF, SNIFF', aspect: 1.0, flash: false, arrow: { at: '@P105:sniffs', to: [380, 60] } }, { out: '@P106-0.2' });
bt('@P105', 'graphic-hero', ['hd105'], { move: 'whip', fill: 0.6, maxH: 700, sy: 500, pose: 'point' }); sf('@P105-0.3', 'swoosh_2', -11, 0.5);
bt('@P105:sniffs', 'graphic-hero', ['p105', 'hd105'], { fill: 0.9, sy: 480, pose: 'chin' }); sf('@P105:sniffs', 'sniff_sharp_1', -8, 0.8); sf('@P105:sniffs+0.8', 'sniff_sharp_2', -9, 0.8);
bt('@P105:package', 'zoom-on-number', 'hd105', { fill: 0.5, maxH: 700, sy: 500, pose: 'point' }); sf('@P105:package', 'paper_rustle_1', -9, 1.0);
bt('@P105:newspaper', 'zoom-on-number', 'hd105', { fill: 0.56, maxH: 700, sy: 500, pose: 'shock' });
// P106 and inside: the World Cup trophy (REPLICA photo)
TROPHY('tr106', R5(13), 40, '@P106-0.3', { w: 560, tilt: 0.02 }, { out: '@P107-0.2' });
bt('@P106', 'graphic-hero', ['tr106'], { move: 'whip', fill: 0.3, maxH: 780, sy: 470, pose: 'shock' }); sf('@P106-0.3', 'swoosh_2', -11, 0.5); sf('@P106:inside', 'paper_tear_1', -9, 0.8); sf('@P106:trophy', 'camera_flash_1', -8, 0.6); sf('@P106:trophy', 'ding_2', -9, 0.7);
bt('@P106:world', 'zoom-on-number', 'tr106', { fill: 0.32, maxH: 780, sy: 470, pose: 'chin' });
// P107 THE MISTAKE — EXHIBIT E: a hedge, a newspaper bundle, a city full of dogs (the stamp stays through this paragraph; P108 is THE TWIST)
mistake('P107', 'mistake', 'P107', 'E', R5(14), 4);
bt('@P107:mistake+0.02', 'graphic-hero', 'exP107', { dur: 0.05, lead: 0, fill: 0.44, sx: 1230, sy: 520, pose: 'point' });
bt('@P107:hedge', 'zoom-on-number', 'exP107', { fill: 0.46, maxH: 780, sx: 1230, sy: 520, pose: 'chin' }); sf('@P107:hedge', 'pop_2', -8, 0.4);
bt('@P107:dogs', 'zoom-on-number', 'exP107', { fill: 0.46, maxH: 780, sx: 1230, sy: 520, pose: 'shock' }); sf('@P107:dogs', 'cartoon_boing_1', -12, 0.8);
// P108 THE TWIST: Corbett is briefly a suspect, then cleared
con('c108', 'corb', R5(15), 40, '@P108-0.3', { w: 520, variant: 'card', stamps: [{ text: 'BRIEFLY A SUSPECT', at: '@P108:briefly', tone: 'bad', size: 44, rot: -0.08, y: 30 }, { text: 'CLEARED', at: '@P108:suspect+0.5', tone: 'good', size: 96, rot: 0.06, y: 180 }] }, { out: '@P109-0.2' });
bt('@P108', 'graphic-hero', 'c108', { move: 'whip', fill: 0.3, maxH: 780, sy: 470, pose: 'shrug' }); sf('@P108-0.3', 'swoosh_2', -11, 0.5); sf('@P108:twist', 'dramatic_sting_1', -12, 1.4);
bt('@P108:briefly', 'zoom-on-number', 'c108', { fill: 0.32, maxH: 780, sy: 470, pose: 'chin' }); sf('@P108:briefly', 'rubber_stamp_2', -7, 0.5);
bt('@P108:suspect', 'zoom-on-number', 'c108', { fill: 0.34, maxH: 780, sy: 470, pose: 'point' }); sf('@P108:suspect+0.5', 'success_chime_1', -9, 1.0); sf('@P108:suspect+0.5', 'rubber_stamp_2', -6, 0.5);
// P109 Betchley convicted over the ransom demand: two years
el('j109', 'jail', R5(16) + 200, 40, '@P109-0.3', { w: 1000, h: 700, dropAt: '@P109:convicted', plaqueAt: '@P109:two-0.2', head: 'OVER THE RANSOM DEMAND', lines: [{ t: '2 YEARS', at: '@P109:two', size: 130 }] }, { out: '@P110-0.2' });
con('b109', 'bet', R5(16) - 620, 100, '@P109-0.2', { w: 320, variant: 'pip', label: 'CONVICTED', aspect: 1.0, flash: false }, { out: '@P110-0.2' });
bt('@P109', 'graphic-hero', ['b109', 'j109'], { move: 'whip', fill: 0.84, sy: 500, pose: 'point' }); sf('@P109-0.3', 'swoosh_2', -11, 0.5); sf('@P109:convicted', 'cell_door_1', -9, 1.0);
bt('@P109:two', 'zoom-on-number', 'j109', { fill: 0.54, maxH: 620, sx: 1100, sy: 520, pose: 'shock' }); sf('@P109:two', 'rubber_stamp_2', -6, 0.5);
// P110 the actual thief: never convicted
con('t110', 'thief', R5(17), 40, '@P110-0.3', { w: 480, variant: 'card', file: true, caseNo: 'UNKNOWN', flash: false, stamps: [{ text: 'NEVER CONVICTED', at: '@P110:convicted', tone: 'bad', size: 58, rot: -0.1, y: 50 }] }, { out: '@P111-0.2' });
bt('@P110', 'graphic-hero', 't110', { move: 'whip', fill: 0.34, maxH: 860, sy: 520, pose: 'chin' }); sf('@P110-0.3', 'swoosh_2', -11, 0.5);
bt('@P110:convicted', 'zoom-on-number', 't110', { fill: 0.4, maxH: 860, sy: 520, pose: 'shock' }); sf('@P110:convicted', 'rubber_stamp_2', -5, 0.5); sk('@P110:convicted', 9);
// P111 that summer England won; the hero was the dog; tray slot 5
pr('su111', 'sun', R5(18) - 20, -330, '@P111:summer-0.2', { w: 400, h: 400, a: '@P111:summer' }, { out: '@P112-0.2' });
TROPHY('tr111', R5(18) - 400, 60, '@P111:england-0.3', { w: 440, tilt: -0.03 }, { out: '@P112-0.2' });
con('p111', 'pick', R5(18) + 380, 60, '@P111:hero-0.5', { w: 440, variant: 'card', flash: true, stamps: [{ text: 'THE HERO', at: '@P111:hero', tone: 'good', size: 84, rot: -0.08, y: 50 }] }, { out: '@P112-0.2' });
bt('@P111', 'graphic-hero', ['su111', 'tr111'], { move: 'whip', fill: 0.76, sy: 440, pose: 'point' }); sf('@P111-0.3', 'swoosh_2', -11, 0.5);
bt('@P111:england', 'graphic-hero', ['tr111', 'su111'], { fill: 0.7, sy: 480, pose: 'chin' }); sf('@P111:won', 'cheer_1', -14, 2.0);
bt('@P111:hero', 'zoom-on-number', 'p111', { fill: 0.32, maxH: 780, sx: 1250, sy: 520, pose: 'shock' }); sf('@P111:hero', 'rubber_stamp_2', -6, 0.5); sf('@P111:hero', 'ding_2', -9, 0.8); sk('@P111:hero', 8);
// ---------------- CH6 · THE EVIDENCE BOARD (P112-P120) — cork board in the detective room, back to the farmhouse table ----------------
// P112 the MISTAKE TRAY becomes the cork evidence board with the villain cards
pr('cb112', 'cork', R6(0) + 2800 * 0, 40, '@P112-0.3', { w: 1600, h: 900, imgs: [IMG('monopoly'), IMG('dealer'), IMG('hatton'), IMG('specs'), IMG('pickles')], card: '@P112:pin', pins: ['@P113:ketchup', '@P113:sandwich', '@P113:car', '@P113:partner', '@P113:dog'], strings: ['@P113:ketchup+0.3', '@P113:sandwich+0.3', '@P113:car+0.3', '@P113:partner+0.3', '@P113:dog+0.3'] }, { out: '@P114-0.2' });
bt('@P112', 'graphic-hero', 'cb112', { move: 'whip', fill: 0.74, maxH: 900, sy: 500, pose: 'point' }); sf('@P112-0.3', 'swoosh_2', -11, 0.5); sf('@P112:pin', 'paper_slam_2', -8, 0.5); for (let i = 0; i < 5; i++) sf(`@P112:pin+${(0.3 + i * 0.1).toFixed(2)}`, 'pop_2', -10, 0.3);
bt('@P112:evidence', 'zoom-on-number', 'cb112', { fill: 0.8, maxH: 940, sy: 500, pose: 'chin' });
// P113 one exhibit pinned per item, red string pulls tight to each villain card
const PW = [['ketchup', 'e0'], ['sandwich', 'e1'], ['car', 'e2'], ['partner', 'e3'], ['dog', 'e4']];
PW.forEach(([w, a], i) => { bt(`@P113:${w}`, 'zoom-on-number', 'cb112.' + a, { fill: 0.3, maxH: 520, sy: 500, pose: i % 2 ? 'chin' : 'point' }); sf(`@P113:${w}`, 'pop_2', -8, 0.4); sf(`@P113:${w}+0.3`, 'tape_zip_2', -11, 0.6); });
bt('@P113>-0.5', 'graphic-hero', 'cb112', { fill: 0.78, maxH: 900, sy: 500, pose: 'shock' });
// P114 the hard part: signal, vault, drill, masks all stamped PLANNED
el('h114', 'text', R6(1), -330, '@P114-0.3', { lines: [[['THE ', 'paper'], ['HARD', 'accent'], [' PART', 'paper']]], size: 100 }, { out: '@P115-0.2' });
pr('sg114', 'signal', R6(1) - 640, 60, '@P114+0.0', { w: 260, h: 400 }, { out: '@P115-0.2' });
pr('vl114', 'vault', R6(1) - 210, 60, '@P114+0.15', { w: 380, h: 330, layers: ['@P114:vault', '@P114:vault', '@P114:vault', '@P114:vault', '@P114:vault'] }, { out: '@P115-0.2' });
pr('dr114', 'drill', R6(1) + 270, 60, '@P114+0.3', { w: 460, h: 300, a: '@P114:drill', b: '@P114:drill+1.5' }, { out: '@P115-0.2' });
pr('mk114', 'gear', R6(1) + 700, 60, '@P114+0.45', { w: 480, h: 300, items: ['mask'], times: ['@P114:masks'] }, { out: '@P115-0.2' });
for (const [i, [w, x]] of [['signal', -640], ['vault', -210], ['drill', 270], ['masks', 700]].entries()) { el('pl114' + i, 'stamp', R6(1) + x, 110, `@P114:${w}+0.3`, { text: 'PLANNED', tone: 'good', size: 60 }, { rot: -0.08 + i * 0.04, out: '@P115-0.2' }); sf(`@P114:${w}+0.3`, 'rubber_stamp_2', -9, 0.5); }
bt('@P114', 'graphic-hero', ['h114', 'sg114', 'mk114'], { move: 'whip', fill: 0.9, sy: 480, pose: 'point' }); sf('@P114-0.3', 'swoosh_2', -11, 0.5);
for (const [w, f] of [['signal', 'sg114'], ['vault', 'vl114'], ['drill', 'dr114'], ['masks', 'mk114']]) bt(`@P114:${w}`, 'graphic-hero', ['h114', f], { fill: 0.56, maxH: 760, sy: 480, pose: 'point' });
// P115 the easy part: game, trash, chat, share, hedge stamped LOST, one per word
el('h115', 'text', R6(2), -330, '@P115-0.3', { lines: [[['THE ', 'paper'], ['EASY', 'bad'], [' PART', 'paper']]], size: 100 }, { out: '@P116-0.2' });
const LOST = [['game', 'board', 330, 220], ['trash', 'bag', 330, 250], ['chat', 'car', 330, 220], ['share', 'moneybag', 260, 260], ['hedge', 'hedge', 400, 250]];
LOST.forEach(([w, k, pw, ph], i) => { const x = R6(2) + (i - 2) * 400; pr('ls115' + i, k, x, 60, `@P115+${(i * 0.14).toFixed(2)}`, { w: pw, h: ph, ...(k === 'board' ? { drops: [], fp: 1e9 } : {}), ...(k === 'bag' ? { a: -9 } : {}), ...(k === 'car' ? { a: -9, b: 1e9, c: 1e9 } : {}), ...(k === 'moneybag' ? { a: '@P115:share' } : {}), ...(k === 'hedge' ? { a: -9 } : {}), label: w.toUpperCase(), labelAt: `@P115:${w}` }, { out: '@P116-0.2' }); el('lx115' + i, 'stamp', x, 70, `@P115:${w}+0.2`, { text: 'LOST', tone: 'bad', size: 64 }, { rot: -0.08 + i * 0.04, out: '@P116-0.2' }); sf(`@P115:${w}+0.2`, 'rubber_stamp_2', -9, 0.5); });
bt('@P115', 'graphic-hero', ['h115', 'ls1150', 'ls1154'], { move: 'whip', fill: 0.94, sy: 480, pose: 'point' }); sf('@P115-0.3', 'swoosh_2', -11, 0.5);
for (const [i, [w]] of LOST.entries()) bt(`@P115:${w}`, 'graphic-hero', ['h115', 'ls115' + i], { fill: 0.5, maxH: 700, sy: 480, pose: i % 2 ? 'chin' : 'shock' });
// P116 big things vs tiny things: the tiny pan sinks
pr('sc116', 'scale', R6(3), 20, '@P116-0.3', { w: 1000, h: 560, a: '@P116:careless-0.3', dir: 1, l: { icon: 'big', label: 'BIG THINGS', size: 36 }, r: { icon: 'tiny', label: 'TINY THINGS', size: 36 } }, { out: '@P117-0.2' });
bt('@P116', 'graphic-hero', 'sc116', { move: 'whip', fill: 0.62, maxH: 860, sy: 500, pose: 'point' }); sf('@P116-0.3', 'swoosh_2', -11, 0.5);
bt('@P116:careful', 'zoom-on-number', 'sc116', { fill: 0.7, maxH: 700, sy: 500, pose: 'chin' });
bt('@P116:careless', 'graphic-hero', 'sc116', { fill: 0.74, maxH: 760, sy: 500, pose: 'shock' }); sf('@P116:careless-0.1', 'thud_2', -8, 0.8);
// P117-P119 back to the farmhouse table: same top-down shot as frame 0 (board, banknotes, the gang card), then the jail corner and the long way round
pr('b117', 'board', R6(4) + 190, 110, '@P117-0.3', { w: 860, h: 540, drops: ['@P117', '@P117+0.15', '@P117+0.3', '@P117+0.45'], jail: '@P119:jail-0.3', walk: ['@P119:they', '@P119>-0.1'] }, { out: '@P120-0.2' });
el('c118', 'counter', R6(4) + 190, -290, '@P118:tons-0.3', { label: 'STOLEN CASH', to: 2.5, decimals: 1, suffix: ' TONS', at: '@P118:half-0.3', dur: 0.9, tone: 'bad', size: 96, w: 700 }, { out: '@P119-0.2' });
con('k117', 'mono', R6(4) - 560, 60, '@P117-0.2', { w: 400, variant: 'card', file: true, caseNo: 'CASE Nº 1', flash: true }, { out: '@P120-0.2' });
bt('@P117', 'graphic-hero', ['b117', 'k117'], { move: 'whip', fill: 0.9, sy: 470, pose: 'point', dur: 0.7 }); sf('@P117-0.3', 'swoosh_2', -11, 0.5); for (let i = 0; i < 4; i++) sf(`@P117+${(i * 0.15).toFixed(2)}`, 'thud_1', -9, 0.5);
bt('@P117:farmhouse', 'graphic-hero', ['b117', 'k117'], { fill: 0.78, sy: 480, pose: 'chin' });
bt('@P118:gang', 'graphic-hero', ['b117', 'k117', 'c118'], { fill: 0.95, sy: 470, pose: 'point' });
bt('@P118:tons', 'zoom-on-number', 'c118.value', { fill: 0.4, maxH: 400, sy: 470, pose: 'shock' }); sf('@P118:half-0.3', 'money_counter_1', -12, 1.0); sf('@P118:monopoly', 'pop_2', -8, 0.4);
bt('@P118:monopoly', 'zoom-on-number', 'b117', { fill: 0.54, maxH: 640, sy: 480, pose: 'point' });
bt('@P119:game', 'zoom-on-number', 'b117', { fill: 0.56, maxH: 660, sy: 480, pose: 'chin' }); sf('@P119:jail-0.3', 'cell_door_2', -9, 1.0);
bt('@P119:they', 'graphic-hero', 'b117', { fill: 0.62, maxH: 700, sy: 480, pose: 'shrug' }); sf('@P119:they', 'footsteps_wood_1', -10, 2.4);
bt('@P119:long', 'zoom-on-number', 'b117', { fill: 0.58, maxH: 680, sy: 480, pose: 'point' });
// P120 comment question: sandwich, board game or car?
pr('sw120', 'sandwich', R6(5) - 520, 60, '@P120:sandwich-0.5', { w: 320, h: 240, bite: false, label: 'THE SANDWICH', labelAt: '@P120:sandwich' }, { out: '@P120>+0.1' });
pr('bd120', 'board', R6(5), 60, '@P120:board-0.5', { w: 440, h: 280, drops: [], label: 'THE BOARD GAME', labelAt: '@P120:board' }, { out: '@P120>+0.1' });
pr('cr120', 'car', R6(5) + 520, 60, '@P120:car-0.5', { w: 400, h: 250, a: -9, b: 1e9, c: 1e9, label: 'THE CAR', labelAt: '@P120:car#1' }, { out: '@P120>+0.1' });
el('bb120', 'bubble', 1470, 700, '@P120:comments-0.2', { l1: 'WHICH MISTAKE WAS', l2: 'THE DUMBEST?', tail: 'right', size: 38 }, { layer: 'screen', out: '@P120>+0.1' });
bt('@P120', 'graphic-hero', ['sw120', 'cr120'], { move: 'whip', fill: 0.9, sy: 460, pose: 'point' }); sf('@P120-0.3', 'swoosh_2', -11, 0.5);
bt('@P120:sandwich', 'zoom-on-number', 'sw120', { fill: 0.3, maxH: 480, sy: 460, pose: 'point' }); bt('@P120:board', 'zoom-on-number', 'bd120', { fill: 0.32, maxH: 480, sy: 460, pose: 'chin' }); bt('@P120:car#1', 'zoom-on-number', 'cr120', { fill: 0.3, maxH: 480, sy: 460, pose: 'shock' });
for (const w of ['sandwich', 'board', 'car#1']) sf(`@P120:${w}`, 'pop_2', -9, 0.3);
bt('@P120:tell', 'presenter-front', ['sw120', 'cr120'], { fill: 0.9, sy: 460, pose: 'talk' }); sf('@P120:comments-0.2', 'pop_2', -9, 0.3); sf('@P120:comments', 'notification_chime_1', -12, 1.0);
// END CARD (12 s after the last word): wordmark, YouTube end-screen slots, storyteller waving, music only
el('wm', 'text', 960, 140, '@P120>+0.2', { lines: [[['BAD MATH', 'paper']]], size: 150, shadow: true }, { layer: 'screen' });
el('slots', 'endslots', 0, 0, '@P120>+0.4', { rl: 'WATCH NEXT', cl: 'SUBSCRIBE' }, { layer: 'screen' });
bt('@P120>+0.3', 'wide', { x: RM[7], y: 0, w: 1000, h: 600 }, { move: 'whip', dur0: 0.9, fill: 0.5, sy: 470, st: { x: 1075, y: 1064, s: 1.05, layer: 'front' }, pose: 'wave', stDur: 0.9, arc: 0.2 }); sf('@P120>+0.1', 'swoosh_2', -9, 0.8); sf('@P120>+0.7', 'success_chime_2', -12, 1.4);
// beat labels (top-right pill): the show's recurring beats; THE MISTAKE spans the "The mistake?" paragraph and the one after it
const BEATLABELS = [
  ['@P009', '@P013', 'THE CASE'], ['@P013', '@P015', 'THE PLAN'], ['@P015', '@P018', 'THE HAUL'], ['@P018', '@P022', 'THE PLAN'], ['@P022', '@P024', 'THE CATCH'], ['@P024', '@P026', 'THE MISTAKE'], ['@P026', '@P029', 'THE SENTENCE'],
  ['@P029', '@P033', 'THE CASE'], ['@P033', '@P035', 'THE PLAN'], ['@P035', '@P040', 'THE HAUL'], ['@P040', '@P042', 'THE PLAN'], ['@P042', '@P044', 'THE MISTAKE'], ['@P044', '@P046', 'THE CATCH'], ['@P046', '@P051', 'THE SENTENCE'],
  ['@P051', '@P055', 'THE CASE'], ['@P055', '@P057', 'THE PLAN'], ['@P057', '@P061', 'THE HAUL'], ['@P061', '@P064', 'THE CATCH'], ['@P064', '@P066', 'THE MISTAKE'], ['@P066', '@P068', 'THE CATCH'], ['@P068', '@P072', 'THE SENTENCE'],
  ['@P072', '@P074', 'THE CASE'], ['@P074', '@P077', 'THE HEIST'], ['@P077', '@P079', 'THE HAUL'], ['@P079', '@P083', 'THE PLAN'], ['@P083', '@P085', 'THE CATCH'], ['@P085', '@P087', 'THE MISTAKE'], ['@P087', '@P089', 'THE CATCH'], ['@P089', '@P093', 'THE SENTENCE'],
  ['@P093', '@P096', 'THE CASE'], ['@P096', '@P098', 'THE HAUL'], ['@P098', '@P100', 'THE PLAN'], ['@P100', '@P107', 'THE CATCH'], ['@P107', '@P108', 'THE MISTAKE'], ['@P108', '@P109', 'THE TWIST'], ['@P109', '@P112', 'THE SENTENCE'],
  ['@P112', '@P117', 'THE EVIDENCE'], ['@P117', '@P120>', 'THE CASE']];
BEATLABELS.forEach(([a, b, t], i) => el('bl' + i, 'beatlabel', 1856, 140, a + '+0.12', { text: t }, { layer: 'screen', out: b }));
// the running MISTAKE TRAY (bottom-left, five slots, one fills per chapter)
el('mtray', 'mtray', 64, 150, '@P009', { fills: MIST.map(m => m[0] + '+0.5') }, { layer: 'screen', out: '@P112' });
// extra push-ins so no picture holds longer than ~3.4 s (found by the beat-gap check)
bt('@P010:1963', 'graphic-hero', ['dc10', 't10'], { fill: 0.8, sy: 480, pose: 'chin' });
bt('@P033:said', 'graphic-hero', 'd33', { fill: 0.64, maxH: 800, sy: 490, pose: 'point' });
bt('@P040:get', 'graphic-hero', 'cl40', { fill: 0.64, maxH: 720, sy: 500, pose: 'chin' });
bt('@P052:hatton', 'graphic-hero', ['ph52', 'jd52'], { fill: 0.8, sy: 480, pose: 'point' });
bt('@P070:electronics', 'graphic-hero', 'j68', { fill: 0.66, maxH: 860, sy: 500, pose: 'point' });
bt('@P073:1950', 'graphic-hero', ['dc73', 'tr73'], { fill: 0.8, sy: 480, pose: 'chin' });
bt('@P077:cash', 'graphic-hero', 'c77', { fill: 0.82, sy: 480, pose: 'point' });
bt('@P087:week', 'graphic-hero', ['dc87', 't87'], { fill: 0.84, sy: 470, pose: 'chin' });
bt('@P094:england', 'graphic-hero', ['dc94', 'c94'], { fill: 0.92, sy: 480, pose: 'point' });
bt('@P095:sitting', 'graphic-hero', ['tr95', 'gd95', 'ss95'], { fill: 0.86, sy: 500, pose: 'point' });
bt('@P099:comes', 'graphic-hero', 'rn98', { fill: 0.46, maxH: 720, sy: 500, pose: 'point' });
BM2.scene({
  series: 'decoded', title: 'CASE FILE: 5 HEISTS', duration: 518.97, fps: 30,
  footnote: ['DOCUMENTED CASES · COURT / POLICE RECORDS · SOURCES IN DESCRIPTION · SENTENCES & MONEY AS REPORTED · VILLAINS & PICKLES ARE ILLUSTRATIONS',
    'PHOTOS: ANTWERP STREET (THORSTEN1997), HATTON GARDEN (UNKNOWN), TROPHY REPLICA (ABEL LAFLEUR): PUBLIC DOMAIN, VIA WIKIMEDIA COMMONS · CAP: FBI, PUBLIC DOMAIN'],
  elements: E, beats: BT, poses: PO, shakes: SK, sfx: SF,
  stages: STAGES, hudOff: [['@P120>+0.1', 900], ...MIST.map(m => [m[0], m[0] + '+0.134'])], travel: { every: 10 },
  captions: { fix: [['The hall?', 'The haul?'], ['The hall is', 'The haul is'], ['diamond center', 'Diamond Centre'], ['rubber-sold', 'rubber-soled'], ["O 'Keeffe,", "O'Keefe,"], ['royal mail', 'Royal Mail'], ['Royal mail is', 'Royal Mail is']], hide: [['@P120>+0.1', 900], ...MIST.map(m => [m[0], m[0] + '+0.134'])], emph: {
    '£2': 'bad', '$100': 'good', '$2': 'good', '$60': 'bad', '£14': 'good', '120': 'bad', '15': 'bad', '30': 'bad', '10': 'bad', '2005': 'bad', '1,000': 'bad', '1,100': 'bad', '2,190': 'accent', '11': 'bad', '2015': 'accent', '1963': 'accent', '1950': 'accent', '1956': 'accent', '1966': 'accent', '1964': 'accent', '2003': 'accent',
    mistake: 'bad', mistakes: 'bad', arrested: 'bad', convicted: 'bad', sentenced: 'bad', prison: 'bad', dumbest: 'bad', dumb: 'bad', fingerprints: 'bad', dna: 'bad', ransom: 'bad', suspect: 'bad', recorded: 'bad', talks: 'bad', missed: 'bad', deadline: 'bad',
    sandwich: 'accent', ketchup: 'accent', monopoly: 'accent', pickles: 'accent', dog: 'accent', hedge: 'accent', specs: 'accent', notarbartolo: 'accent', betchley: 'accent', corbett: 'accent', million: 'good', tons: 'bad' } },
});
