// Bad Math engine v2 — element recipes (the graphics the camera looks at). Each type registers:
//   size(props) -> [w, h]                     local box, origin at its centre
//   anchors(props) -> {name: [cx, cy, w, h]}  sub-boxes a beat can focus ('id.name')
//   draw(g, props, env)                       env = {t, lt (seconds since `in`), theme, lift 0..1, hot (focused anchor), hotK, hotT}
// Times inside props may be '@word' refs; the engine resolves them to seconds before draw is called.
// v2 look: paper cards and clay solids with soft shadows on the dark Ink stage, brand colours as flat pigment, no glow.
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, countAt, hash, wobble, stagger } = B;
  B.elements = {}; B.register = (type, def) => (B.elements[type] = def);
  const M = document.createElement('canvas').getContext('2d'); const measure = (s, font) => { M.font = font; return M.measureText(s).width; };
  const tone = (n, onPaper) => B.tone(n, onPaper);
  const segs = line => (typeof line === 'string' ? [[line, null]] : line.map(x => (typeof x === 'string' ? [x, null] : x)));

  // ---------- text: headline set straight on the stage (hooks, labels). Words rise in on a stagger. ----------
  B.register('text', {
    defaults: { lines: ['TEXT'], size: 120, font: 'hero', color: 'paper', lh: 1.08, per: 0.07, shadow: true }, ownEnter: true,
    size: p => [Math.max(...p.lines.map(l => measure(segs(l).map(s => s[0]).join(''), F[p.font](p.size)))), p.lines.length * p.size * p.lh],
    draw(g, p, { lt }) {
      const font = F[p.font](p.size), n = p.lines.length; let wi = 0; g.textBaseline = 'middle'; g.textAlign = 'left'; g.font = font;
      p.lines.forEach((line, li) => { const ss = segs(line), tw = measure(ss.map(s => s[0]).join(''), font); let x = -tw / 2; const y = (li - (n - 1) / 2) * p.size * p.lh;
        for (const [s, tn] of ss) { const k = spring(lt - wi * p.per, 'snappy'), a = clamp((lt - wi * p.per) / 0.1); wi++; g.save(); g.globalAlpha *= a; g.translate(0, (1 - k) * p.size * 0.45);
          if (p.shadow) { g.shadowColor = 'rgba(0,0,0,.45)'; g.shadowBlur = 18 * B.zoomNow; g.shadowOffsetY = 8 * B.zoomNow; }
          g.fillStyle = tone(tn || p.color, false); g.font = font; g.fillText(s, x, y); g.restore(); x += measure(s, font); } });
    },
  });

  // ---------- receipt: a printed slip. Rows light up (marker swipe + pop) when their value is spoken. ----------
  const rcH = p => 150 + p.rows.length * p.rowH + 64;
  B.register('receipt', {
    defaults: { title: 'RECEIPT', rows: [], w: 560, rowH: 92, foot: '' }, ownEnter: true,
    size: p => [p.w, rcH(p)],
    anchors: p => Object.fromEntries(p.rows.map((r, i) => [r.id || 'r' + i, [0, -rcH(p) / 2 + 150 + (i + 0.5) * p.rowH, p.w * 0.94, p.rowH]])),
    draw(g, p, { t, lt, theme, lift, hot, hotK }) {
      const w = p.w, h = rcH(p), pr = ease.out(lin(lt, 0, 0.75)), top = -h / 2;
      // printer slot
      clay(g, -w / 2 - 34, top - 30, w + 68, 40, 14, '#1B2430', { shadowK: 0.6 }); g.fillStyle = 'rgba(0,0,0,.55)'; rr(g, -w / 2 - 10, top - 14, w + 20, 10, 5); g.fill();
      g.save(); g.beginPath(); g.rect(-w, top - 6, w * 2, h + 400); g.clip(); g.translate(0, -(1 - pr) * h + Math.sin(lt * 46) * 2.2 * (1 - pr));
      const path = () => { g.beginPath(); g.moveTo(-w / 2, top); g.lineTo(w / 2, top); g.lineTo(w / 2, top + h - 16); const n = 20; for (let i = 0; i <= n; i++) g.lineTo(w / 2 - (i / n) * w, top + h - (i % 2 ? 0 : 16)); g.closePath(); };
      B.shadowed(g, path, theme.paper, lift);
      g.save(); path(); g.clip(); const lg = g.createLinearGradient(-w / 2, top, w / 2, top + h); lg.addColorStop(0, 'rgba(255,255,255,.25)'); lg.addColorStop(1, 'rgba(60,40,20,.10)'); g.fillStyle = lg; g.fillRect(-w / 2, top, w, h); g.globalAlpha = 0.5; g.globalCompositeOperation = 'multiply'; g.fillStyle = B.grainPattern; g.fillRect(-w / 2, top, w, h); g.restore();
      txt(g, p.title, 0, top + 62, F.monoX(34), theme.ink); g.strokeStyle = theme.rule; g.lineWidth = 3; g.setLineDash([10, 9]); g.beginPath(); g.moveTo(-w / 2 + 36, top + 112); g.lineTo(w / 2 - 36, top + 112); g.stroke(); g.setLineDash([]);
      p.rows.forEach((r, i) => { const y = top + 150 + (i + 0.5) * p.rowH, on = r.at == null ? 0 : t - r.at, k = on > 0 ? spring(on, 'snappy') : 0, col = on > 0 ? tone(r.tone || 'ink', true) : theme.ink, isHot = hot === (r.id || 'r' + i);
        txt(g, r.k, -w / 2 + 44, y, F.mono(30), theme.inkSoft, 'left');
        const vf = F.monoX(46), vw = measure(r.v, vf), s = 1 + 0.2 * k + (isHot ? 0.06 * hotK : 0) - (on > 0 ? 0.06 * clamp(on - 0.2) : 0);
        g.save(); g.translate(w / 2 - 44, y); g.scale(s, s); if (on > 0) marker(g, -vw - 10, -30, vw + 20, 60, tone(r.tone || 'accent', true), clamp(on / 0.3), 0.22);
        txt(g, r.v, 0, 2, vf, col, 'right'); g.restore(); });
      if (p.foot) txt(g, p.foot, 0, top + h - 52, F.mono(22), theme.inkSoft);
      g.restore();
    },
  });

  // ---------- stamp: slams down (use enter:'slam'), sits slightly rotated (set rot on the element). ----------
  B.register('stamp', {
    defaults: { text: 'STAMP', tone: 'bad', size: 96, fill: 'paper' }, enter: 'slam',
    size: p => [measure(p.text, F.hero(p.size)) + p.size * 0.8, p.size * 1.42],
    draw(g, p, { lt, lift }) { const [w, h] = this.size(p), col = tone(p.tone, true);
      paper(g, -w / 2, -h / 2, w, h, p.size * 0.14, { fill: tone(p.fill), lift }); g.strokeStyle = col; g.lineWidth = p.size * 0.075; rr(g, -w / 2 + 12, -h / 2 + 12, w - 24, h - 24, p.size * 0.09); g.stroke();
      txt(g, p.text, 0, p.size * 0.045, F.hero(p.size), col); burst(g, 0, 0, w * 0.62, tone(p.tone, false), lt - 0.16, 16, 0.45); },
  });

  // ---------- counter: the hero number. Odometer roll with tabular digits, lands with a spring + tick burst + underline. ----------
  function counterCore(g, p, env, x, y) {
    const lt = env.t - p.at, dur = p.dur, v = lt < 0 ? p.from : countAt(lt, dur, p.from, p.to), land = lt - dur, col = tone(p.tone, p.onPaper !== false);
    const speed = lt > 0 && lt < dur ? Math.abs(countAt(lt + 0.02, dur, p.from, p.to) - v) / 0.02 : 0;
    const s = 1 + (land > 0 ? 0.13 * (1 - spring(land, { f: 2.4, z: 0.42 })) + 0.0 : 0.05 * lin(lt, 0, dur)) + (env.hot === 'value' ? 0.03 * env.hotK : 0);
    g.save(); g.translate(x, y); g.scale(s, s);
    const o = { font: F.hero(p.size), size: p.size, color: col, prefix: p.prefix, suffix: p.suffix, decimals: p.decimals, speed };
    const w = B.rollWidth(g, p.to, o).w; if (land > 0 && p.underline !== false) marker(g, -w / 2, p.size * 0.66, w, p.size * 0.07, col, clamp(land / 0.35), 0.9);
    roll(g, v, 0, 0, o); g.restore(); burst(g, x, y, w * 0.62, tone(p.tone, false), land, 18, 0.55); return w;
  }
  B.register('counter', {
    defaults: { from: 0, to: 100, at: 0, dur: 1.2, prefix: '', suffix: '', decimals: 0, size: 210, tone: 'bad', label: '', sub: '', card: true, w: 760 },
    size: p => [p.w, p.size * 1.25 + (p.label ? 80 : 0) + (p.sub ? 70 : 0) + 90],
    anchors: p => ({ value: [0, 0, p.w * 0.9, p.size * 1.3] }),
    draw(g, p, env) { const [w, h] = this.size(p), yN = (p.label ? 40 : 0) - (p.sub ? 35 : 0);
      if (p.card) paper(g, -w / 2, -h / 2, w, h, 30, { lift: env.lift }); const onP = p.card;
      if (p.label) txt(g, p.label, 0, -h / 2 + 70, F.cap(38), onP ? env.theme.inkSoft : rgba(env.theme.paper, 0.8));
      counterCore(g, { ...p, onPaper: onP }, env, 0, yN + 8);
      if (p.sub) { const k = spring(env.t - p.at - p.dur, 'snappy'); g.save(); g.globalAlpha = clamp((env.t - p.at - p.dur) / 0.12); g.translate(0, h / 2 - 68 + (1 - k) * 30); txt(g, p.sub, 0, 0, F.cap(40), onP ? env.theme.ink : env.theme.paper); g.restore(); } },
  });

  // ---------- doc: document reveal. Page rises, header band, skeleton lines write in, real lines type on cue, optional hero counter. ----------
  B.register('doc', {
    defaults: { title: 'DOCUMENT', sub: '', lines: [], hero: null, w: 680, h: 860, skeleton: 4, band: 'navy' }, ownEnter: true,
    size: p => [p.w, p.h],
    anchors: p => { const a = { head: [0, -p.h / 2 + 80, p.w, 160] }; p.lines.forEach((l, i) => (a[l.id || 'l' + i] = [0, -p.h / 2 + 200 + p.skeleton * 34 + 60 + i * 84, p.w * 0.92, 90])); if (p.hero) a.hero = [0, p.h / 2 - 215, p.w * 0.96, 400]; return a; },
    draw(g, p, env) { const { t, lt, theme, lift } = env, w = p.w, h = p.h, k = spring(lt, 'heavy'), x0 = -w / 2, y0 = -h / 2;
      g.save(); g.translate(0, (1 - k) * 260); g.rotate((1 - k) * -0.05); g.globalAlpha *= clamp(lt / 0.12);
      paper(g, x0, y0, w, h, 20, { lift });
      g.save(); rr(g, x0, y0, w, h, 20); g.clip(); g.fillStyle = tone(p.band, true); g.fillRect(x0, y0, w, 150); const hg = g.createLinearGradient(0, y0, 0, y0 + 150); hg.addColorStop(0, 'rgba(255,255,255,.12)'); hg.addColorStop(1, 'rgba(0,0,0,.14)'); g.fillStyle = hg; g.fillRect(x0, y0, w, 150); g.restore();
      txt(g, p.title, x0 + 40, y0 + 62, F.hero(52), theme.paper, 'left'); if (p.sub) txt(g, p.sub, x0 + 42, y0 + 118, F.mono(22), rgba(theme.paper, 0.75), 'left');
      for (let i = 0; i < p.skeleton; i++) { const s = ease.out(lin(lt - 0.25 - i * 0.07, 0, 0.4)), ww = (w - 80) * (0.55 + 0.45 * hash(i * 3.3 + p.w)); g.fillStyle = theme.rule; rr(g, x0 + 40, y0 + 196 + i * 34, ww * s, 14, 7); if (s > 0) g.fill(); }
      p.lines.forEach((l, i) => { const y = y0 + 200 + p.skeleton * 34 + 60 + i * 84, on = t - (l.at ?? 0); if (on <= 0) return; const font = l.big ? F.hero(64) : F.monoX(42), n = Math.ceil(l.t.length * ease.out(lin(on, 0, l.type ?? 0.5))), s = l.t.slice(0, n), col = tone(l.tone || 'ink', true);
        const tw = measure(l.t, font); if (l.mark) marker(g, -tw / 2 - 12, y - 30, tw + 24, 60, tone(l.mark, true), clamp((on - 0.4) / 0.3), 0.22);
        g.save(); g.translate(0, y); const pk = 1 + 0.06 * (env.hot === (l.id || 'l' + i) ? env.hotK : 0); g.scale(pk, pk); txt(g, s, -tw / 2, 0, font, col, 'left'); g.restore(); });
      if (p.hero) { const hy = h / 2 - 240; g.strokeStyle = theme.rule; g.lineWidth = 3; g.setLineDash([10, 9]); g.beginPath(); g.moveTo(x0 + 40, hy - 160); g.lineTo(-x0 - 40, hy - 160); g.stroke(); g.setLineDash([]);
        const hon = t - p.hero.at + 0.25; if (hon > 0) { g.save(); g.globalAlpha *= clamp(hon / 0.2); if (p.hero.label) txt(g, p.hero.label, 0, hy - 112 + (1 - spring(hon, 'snappy')) * 20, F.cap(32), theme.inkSoft); g.restore(); } if (hon > 0.25) counterCore(g, { from: 0, dur: 1.2, size: 150, tone: 'bad', decimals: 0, ...p.hero, onPaper: true }, env, 0, hy + 10);
        if (p.hero.sub) { const on = t - p.hero.at - (p.hero.dur ?? 1.2); if (on > 0) { const sk = spring(on, 'snappy'); g.save(); g.globalAlpha *= clamp(on / 0.1); g.translate(0, hy + 172 + (1 - sk) * 26); txt(g, p.hero.sub, 0, 0, F.hero(60), tone(p.hero.tone || 'bad', true)); g.restore(); } } }
      g.restore(); },
  });

  // ---------- bars: clay bars (or stacks of cash) that grow from a baseline with a spring; values roll on top. ----------
  function bill(g, x, y, w, h, i) { clay(g, x, y, w, h - 2, 5, '#1FA366', { shadowK: 0.45 }); g.fillStyle = 'rgba(245,243,238,.82)'; g.fillRect(x + w * 0.42, y + 1, w * 0.16, h - 4); g.fillStyle = 'rgba(0,0,0,.16)'; g.fillRect(x, y + h - 4, w, 2); }
  const BAR_SPRING = { f: 1.7, z: 0.5 };
  const barsGeo = p => { const n = p.items.length, tw = n * p.barW + (n - 1) * p.gap, H = p.h + 230, y0 = H / 2 - 120; return { n, tw, H, y0, x: i => -tw / 2 + i * (p.barW + p.gap) }; };
  B.register('bars', {
    defaults: { items: [], max: null, h: 820, barW: 200, gap: 130, minH: 6, note: '' },
    size: p => { const G = barsGeo(p); return [G.tw + 120, G.H]; },
    anchors: p => { const G = barsGeo(p), mx = p.max || Math.max(...p.items.map(i => i.value)), a = {}; p.items.forEach((it, i) => { const bh = Math.max(p.minH, (it.value / mx) * p.h), cx = G.x(i) + p.barW / 2; a[it.id || 'b' + i] = [cx, G.y0 - bh / 2 - 40, p.barW + 150, bh + 180]; a[(it.id || 'b' + i) + '_base'] = [cx, G.y0 - 70, p.barW + 190, 300]; a[(it.id || 'b' + i) + '_top'] = [cx, G.y0 - bh - 70, p.barW + 260, 240]; }); return a; },
    draw(g, p, env) { const { t, theme } = env, G = barsGeo(p), mx = p.max || Math.max(...p.items.map(i => i.value));
      g.fillStyle = rgba(theme.paper, 0.28); rr(g, -G.tw / 2 - 50, G.y0, G.tw + 100, 6, 3); g.fill();
      p.items.forEach((it, i) => { const x = G.x(i), on = t - (it.at ?? 0), full = Math.max(p.minH, (it.value / mx) * p.h), col = tone(it.tone || 'good', false), dsp = { prefix: '', suffix: '', decimals: 0, ...(it.display || {}) };
        txt(g, it.label, x + p.barW / 2, G.y0 + 52, F.cap(34), rgba(theme.paper, 0.92)); if (it.sub) txt(g, it.sub, x + p.barW / 2, G.y0 + 96, F.mono(24), rgba(theme.paper, 0.55));
        if (on <= 0) return; let topY;
        if (it.style === 'cash') { const n = it.count || Math.max(1, Math.round(it.value)), bh = full / n, per = Math.min(0.045, (it.dur || 1.3) / n); topY = G.y0;
          for (let b = 0; b < n; b++) { const bl = on - b * per; if (bl <= 0) break; const k = spring(bl, { f: 3.2, z: 0.5 }), jx = (hash(b * 7.7 + i) - 0.5) * 12, y = G.y0 - (b + 1) * bh - (1 - k) * 90; g.save(); g.globalAlpha *= clamp(bl / 0.05); g.translate(x + p.barW / 2 + jx, y + bh / 2); g.rotate((hash(b * 3.1) - 0.5) * 0.035); bill(g, -p.barW / 2, -bh / 2, p.barW, bh, b); g.restore(); topY = Math.min(topY, y); }
        } else { const hh = Math.max(0, full * spring(on, BAR_SPRING)); topY = G.y0 - hh; clay(g, x, topY, p.barW, hh, Math.min(18, hh / 2), col, { lift: env.lift * 0.5 }); }
        const dur = it.style === 'cash' ? (it.count || Math.round(it.value)) * Math.min(0.045, (it.dur || 1.3) / (it.count || Math.round(it.value))) : 0.7, v = countAt(on, dur, 0, it.show ?? it.value, it.style === 'cash' ? (u => u) : ease.expo), land = on - dur, s = 1 + (land > 0 ? 0.25 * (1 - spring(land, { f: 2.4, z: 0.42 })) : 0);
        g.save(); g.translate(x + p.barW / 2, topY - 62); g.scale(s, s); roll(g, v, 0, 0, { font: F.hero(it.size || 84), size: it.size || 84, color: col, ...dsp, speed: land < 0 ? (it.show ?? it.value) / dur : 0 }); g.restore(); burst(g, x + p.barW / 2, topY - 62, 120, col, land, 14, 0.5); });
      if (p.note) txt(g, p.note, 0, G.y0 + 150, F.mono(24), rgba(theme.paper, 0.5)); },
  });

  // ---------- cashStack: bills drop one by one into a stack; the total rolls above it. ----------
  B.register('cashStack', {
    defaults: { count: 20, at: 0, per: 0.05, w: 300, bh: 26, prefix: '$', each: 1, label: '', tone: 'good' },
    size: p => [p.w + 160, p.count * p.bh + 260], anchors: p => ({ total: [0, -(p.count * p.bh + 260) / 2 + 80, p.w + 160, 180] }),
    draw(g, p, env) { const on = env.t - p.at, H = p.count * p.bh + 260, y0 = H / 2 - 70; g.fillStyle = rgba(env.theme.paper, 0.28); rr(g, -p.w / 2 - 60, y0, p.w + 120, 6, 3); g.fill(); if (p.label) txt(g, p.label, 0, y0 + 46, F.cap(32), rgba(env.theme.paper, 0.9));
      let n = 0, top = y0; for (let b = 0; b < p.count; b++) { const bl = on - b * p.per; if (bl <= 0) break; n++; const k = spring(bl, { f: 3.2, z: 0.5 }), y = y0 - (b + 1) * p.bh - (1 - k) * 110; g.save(); g.globalAlpha *= clamp(bl / 0.05); g.translate((hash(b * 7.7) - 0.5) * 14, y + p.bh / 2); g.rotate((hash(b * 3.1) - 0.5) * 0.04); bill(g, -p.w / 2, -p.bh / 2, p.w, p.bh, b); g.restore(); top = Math.min(top, y); }
      const land = on - p.count * p.per, s = 1 + (land > 0 ? 0.2 * (1 - spring(land, { f: 2.4, z: 0.42 })) : 0); g.save(); g.translate(0, top - 74); g.scale(s, s); roll(g, n * p.each, 0, 0, { font: F.hero(110), size: 110, color: tone(p.tone, false), prefix: p.prefix }); g.restore(); burst(g, 0, top - 74, 150, tone(p.tone, false), land, 16, 0.5); },
  });

  // ---------- coins: gold coins drop and stack flat (pennies, tokens). ----------
  B.register('coins', {
    defaults: { count: 4, at: 0, per: 0.14, r: 46, label: '' }, size: p => [p.r * 2 + 40, p.count * p.r * 0.36 + p.r + 40],
    draw(g, p, env) { const on = env.t - p.at, [w, h] = this.size(p), y0 = h / 2 - 20;
      for (let i = 0; i < p.count; i++) { const l = on - i * p.per; if (l <= 0) break; const k = spring(l, { f: 3.0, z: 0.38 }), y = y0 - i * p.r * 0.36 - (1 - k) * 260, x = (hash(i * 5.3) - 0.5) * 10; g.save(); g.globalAlpha *= clamp(l / 0.05); g.translate(x, y); g.scale(1, 0.42);
        g.fillStyle = '#8a6408'; g.beginPath(); g.arc(0, 16, p.r, 0, 7); g.fill(); const hg = g.createRadialGradient(-p.r * 0.3, -p.r * 0.3, 4, 0, 0, p.r); hg.addColorStop(0, '#ffe27a'); hg.addColorStop(1, '#F2B705'); g.fillStyle = hg; g.beginPath(); g.arc(0, 0, p.r, 0, 7); g.fill(); g.strokeStyle = 'rgba(138,100,8,.7)'; g.lineWidth = 4; g.beginPath(); g.arc(0, 0, p.r - 9, 0, 7); g.stroke(); g.restore(); } },
  });

  // ---------- pie: donut that fills slice by slice with a spring; the centre value rolls. ----------
  B.register('pie', {
    defaults: { slices: [], r: 250, hole: 0.6, center: null, total: null }, size: p => [p.r * 2 + 80, p.r * 2 + 80], anchors: p => ({ center: [0, 0, p.r * 1.3, p.r * 0.9] }),
    draw(g, p, env) { const { t, theme } = env, tot = p.total || p.slices.reduce((a, s) => a + s.value, 0), R = p.r, r = R * p.hole;
      B.shadowed(g, () => { g.beginPath(); g.arc(0, 0, R, 0, 7); g.arc(0, 0, r, 0, 7, true); }, '#1B2430', env.lift);
      let a0 = -Math.PI / 2; for (const s of p.slices) { const on = t - (s.at ?? 0), k = on > 0 ? spring(on, { f: 1.6, z: 0.6 }) : 0, sw = (s.value / tot) * Math.PI * 2, a1 = a0 + sw * k, col = tone(s.tone || 'accent', false);
        if (k > 0) { g.save(); g.beginPath(); g.arc(0, 0, R, a0, a1); g.arc(0, 0, r, a1, a0, true); g.closePath(); g.fillStyle = col; g.fill(); g.clip(); const lg = g.createLinearGradient(-R, -R, R, R); lg.addColorStop(0, 'rgba(255,255,255,.25)'); lg.addColorStop(1, 'rgba(0,0,0,.25)'); g.fillStyle = lg; g.fillRect(-R, -R, 2 * R, 2 * R); g.restore();
          if (s.label) { const am = a0 + sw / 2, lx = Math.cos(am) * (R + 70), ly = Math.sin(am) * (R + 70); g.save(); g.globalAlpha *= clamp((on - 0.25) / 0.15); txt(g, s.label, lx, ly, F.cap(30), rgba(theme.paper, 0.92)); g.restore(); } }
        a0 += sw; }
      if (p.center) { const c = { from: 0, dur: 1, size: R * 0.5, tone: 'paper', decimals: 0, at: 0, underline: false, ...p.center }; counterCore(g, { ...c, onPaper: false }, env, 0, c.label ? -14 : 0); if (c.label) txt(g, c.label, 0, R * 0.3, F.cap(26), rgba(theme.paper, 0.7)); } },
  });

  // ---------- timeline: vertical dated line. The line draws to each node as its date is spoken; the node pops. ----------
  B.register('timeline', {
    defaults: { items: [], w: 780, step: 180 }, size: p => [p.w, p.items.length * p.step], anchors: p => Object.fromEntries(p.items.map((it, i) => [it.id || 'i' + i, [0, -p.items.length * p.step / 2 + (i + 0.5) * p.step, p.w, p.step]])),
    draw(g, p, env) { const { t, theme } = env, n = p.items.length, top = (-n * p.step) / 2, x = -p.w / 2 + 70; let reach = top + p.step * 0.5;
      p.items.forEach((it, i) => { const on = t - (it.at ?? 0); if (on > 0) reach = Math.max(reach, lerp(top + (Math.max(0, i - 1) + 0.5) * p.step, top + (i + 0.5) * p.step, ease.out(lin(on + 0.25, 0, 0.45)))); });
      g.strokeStyle = rgba(theme.paper, 0.16); g.lineWidth = 8; g.lineCap = 'round'; g.beginPath(); g.moveTo(x, top + p.step * 0.5); g.lineTo(x, top + (n - 0.5) * p.step); g.stroke();
      g.strokeStyle = theme.paper; g.beginPath(); g.moveTo(x, top + p.step * 0.5); g.lineTo(x, reach); g.stroke();
      p.items.forEach((it, i) => { const on = t - (it.at ?? 0); if (on <= 0) return; const y = top + (i + 0.5) * p.step, k = spring(on, 'bouncy'), col = tone(it.tone || 'accent', false), hot = env.hot === (it.id || 'i' + i) ? env.hotK : 0;
        g.save(); g.translate(x, y); g.scale(k, k); clay(g, -22, -22, 44, 44, 22, col, { shadowK: 0.7 }); g.restore(); if (on < 0.6) { g.strokeStyle = rgba(col, 1 - on / 0.6); g.lineWidth = 5; g.beginPath(); g.arc(x, y, 24 + 46 * ease.out(on / 0.6), 0, 7); g.stroke(); }
        const sl = spring(on - 0.06, 'snappy'); g.save(); g.globalAlpha *= clamp(on / 0.12); g.translate(x + 60 + (1 - sl) * 50, y); g.scale(1 + 0.05 * hot, 1 + 0.05 * hot); txt(g, it.date, 0, -26, F.monoX(30), col, 'left'); txt(g, it.label, 0, 22, F.cap(40), theme.paper, 'left'); g.restore(); }); },
  });

  // ---------- map: abstract board of places with arcs drawing between them (money flows, networks). No real geography needed. ----------
  B.register('map', {
    defaults: { w: 820, h: 820, nodes: [], links: [], title: '' }, size: p => [p.w, p.h], anchors: p => Object.fromEntries(p.nodes.map(n => [n.id, [(n.x - 0.5) * p.w, (n.y - 0.5) * p.h, 300, 240]])),
    draw(g, p, env) { const { t, theme } = env, w = p.w, h = p.h, P = n => [(n.x - 0.5) * w, (n.y - 0.5) * h], by = Object.fromEntries(p.nodes.map(n => [n.id, n]));
      paper(g, -w / 2, -h / 2, w, h, 28, { lift: env.lift, fill: '#18212D', grain: false }); g.fillStyle = rgba(theme.paper, 0.1); for (let x = -w / 2 + 40; x < w / 2 - 20; x += 44) for (let y = -h / 2 + 40; y < h / 2 - 20; y += 44) { g.beginPath(); g.arc(x, y, 2.4, 0, 7); g.fill(); }
      if (p.title) txt(g, p.title, -w / 2 + 40, -h / 2 + 56, F.mono(26), rgba(theme.paper, 0.6), 'left');
      for (const l of p.links) { const on = t - (l.at ?? 0); if (on <= 0) continue; const [x0, y0] = P(by[l.from]), [x1, y1] = P(by[l.to]), k = ease.inOut(lin(on, 0, l.dur || 0.7)), mx = (x0 + x1) / 2, my = (y0 + y1) / 2 - Math.hypot(x1 - x0, y1 - y0) * 0.28, col = tone(l.tone || 'accent', false);
        const q = u => [(1 - u) * (1 - u) * x0 + 2 * (1 - u) * u * mx + u * u * x1, (1 - u) * (1 - u) * y0 + 2 * (1 - u) * u * my + u * u * y1];
        g.strokeStyle = 'rgba(0,0,0,.35)'; g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); for (let u = 0; u <= k + 1e-6; u += 0.02) { const [x, y] = q(Math.min(u, k)); u ? g.lineTo(x + 4, y + 10) : g.moveTo(x + 4, y + 10); } g.stroke();
        g.strokeStyle = col; g.lineWidth = 7; g.beginPath(); for (let u = 0; u <= k + 1e-6; u += 0.02) { const [x, y] = q(Math.min(u, k)); u ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); const [hx, hy] = q(k); if (k < 1) clay(g, hx - 13, hy - 13, 26, 26, 13, theme.paper, { shadowK: 0.5 }); }
      for (const n of p.nodes) { const on = t - (n.at ?? 0); if (on <= 0) continue; const [x, y] = P(n), k = spring(on, 'bouncy'), col = tone(n.tone || 'paper', false), r = n.r || 26;
        if (on < 0.7) { g.strokeStyle = rgba(col, 1 - on / 0.7); g.lineWidth = 5; g.beginPath(); g.arc(x, y, r + 60 * ease.out(on / 0.7), 0, 7); g.stroke(); }
        g.save(); g.translate(x, y); g.scale(k, k); clay(g, -r, -r, 2 * r, 2 * r, r, col, { shadowK: 0.7 }); g.restore(); if (n.label) { g.save(); g.globalAlpha *= clamp((on - 0.1) / 0.12); txt(g, n.label, x, y + r + 34, F.cap(30), theme.paper); if (n.sub) txt(g, n.sub, x, y + r + 70, F.mono(24), rgba(theme.paper, 0.65)); g.restore(); } } },
  });

  // ---------- barRace: horizontal ranked bars; values interpolate between keyframes and rows swap places smoothly. ----------
  B.register('barRace', {
    defaults: { items: [], times: [0, 1], w: 820, rowH: 104, prefix: '', suffix: '', decimals: 0, labelW: 230 }, size: p => [p.w, p.items.length * p.rowH + 40],
    draw(g, p, env) { const { t, theme } = env, n = p.items.length, K = p.times.length; let seg = 0; while (seg < K - 2 && t >= p.times[seg + 1]) seg++; const u = ease.inOut(lin(t, p.times[seg], p.times[seg + 1]));
      const rank = k => { const o = p.items.map((it, i) => [it.values[k], i]).sort((a, b) => b[0] - a[0]); const r = []; o.forEach(([, i], pos) => (r[i] = pos)); return r; }, r0 = rank(seg), r1 = rank(seg + 1);
      const vals = p.items.map(it => lerp(it.values[seg], it.values[seg + 1], u)), mx = Math.max(...vals), top = (-n * p.rowH) / 2, bw = p.w - p.labelW - 190, ent = clamp(spring(env.lt, 'soft'), 0, 1.05);
      p.items.forEach((it, i) => { const pos = lerp(r0[i], r1[i], ease.inOut(lin(u, 0.15, 0.85))), y = top + (pos + 0.5) * p.rowH, x = -p.w / 2 + p.labelW, ww = Math.max(10, (vals[i] / mx) * bw * ent), col = tone(it.tone || 'accent', false), lead = Math.round(pos) === 0;
        txt(g, it.label, x - 22, y, F.cap(32), rgba(theme.paper, lead ? 1 : 0.8), 'right'); clay(g, x, y - p.rowH * 0.33, ww, p.rowH * 0.66, 14, col, { shadowK: 0.6 });
        roll(g, vals[i], x + ww + 18, y + 2, { font: F.hero(46), size: 46, color: theme.paper, prefix: p.prefix, suffix: p.suffix, decimals: p.decimals, align: 'left', speed: Math.abs(it.values[seg + 1] - it.values[seg]) / Math.max(0.01, p.times[seg + 1] - p.times[seg]) * (u > 0 && u < 1 ? 1 : 0) }); }); },
  });

  // ---------- card: generic paper card with lines of text (quotes, labels, formulas). ----------
  B.register('card', {
    defaults: { w: 640, h: 300, lines: [], fill: 'paper', r: 26 }, size: p => [p.w, p.h],
    draw(g, p, env) { paper(g, -p.w / 2, -p.h / 2, p.w, p.h, p.r, { fill: tone(p.fill), lift: env.lift }); const n = p.lines.length; let y = -p.h / 2 + (p.pad || 70);
      p.lines.forEach((l, i) => { const size = l.size || 44, on = env.t - (l.at ?? -9); if (on > 0) { const k = spring(on, 'snappy'); g.save(); g.globalAlpha *= clamp(on / 0.1); g.translate(0, y + (1 - k) * 24); if (l.mark) { const tw = measure(l.t, F[l.font || 'cap'](size)); marker(g, -tw / 2 - 10, -size * 0.6, tw + 20, size * 1.2, tone(l.mark, true), clamp((on - 0.2) / 0.3), 0.22); } txt(g, l.t, 0, 0, F[l.font || 'cap'](size), tone(l.tone || 'ink', true)); g.restore(); } y += (l.gap || size * 1.45); }); },
  });


  // ---------- photo: a REAL licensed photo in a lit paper frame (RULES: real people get real photos). Images are preloaded by the engine
  // (BM2.images[src]) before the first frame; a missing file fails check/stills/render. treatment: 'paper' | 'polaroid' | 'mugshot'.
  // props: src (repo-relative 'brand/photos/..' or relative to scene.html), name, role, credit, tag, w, tilt (rad), treatment, fx/fy (focal point 0..1 of the face), tape.
  B.register('photo', {
    defaults: { src: '', name: '', role: '', credit: '', tag: '', w: 440, tilt: 0.03, treatment: 'paper', fx: 0.5, fy: 0.35, aspect: 1.12, tape: true }, ownEnter: true,
    size: p => [p.w, 22 + (p.w - 44) * p.aspect + (p.name ? 130 : 60)],
    anchors(p) { const [w, h] = this.size(p), ph = (p.w - 44) * p.aspect; return { face: [0, -h / 2 + 22 + ph * 0.42, p.w * 0.78, ph * 0.62], name: [0, h / 2 - 70, w, 130], photo: [0, -h / 2 + 22 + ph / 2, p.w - 44, ph] }; },
    draw(g, p, env) {
      const { lt, theme, lift } = env, img = B.images && B.images[p.src]; if (!img) throw new Error('photo: image not preloaded: ' + p.src);
      const [w, h] = this.size(p), pw = p.w - 44, ph = pw * p.aspect, x0 = -w / 2, y0 = -h / 2, k = spring(lt, 'heavy'), mug = p.treatment === 'mugshot', pol = p.treatment === 'polaroid';
      g.save(); g.translate(0, (1 - k) * 240); g.rotate(p.tilt + (1 - k) * -0.1); g.globalAlpha *= clamp(lt / 0.1);
      paper(g, x0, y0, w, h, pol ? 10 : 16, { lift, fill: mug ? '#C9CED6' : theme.paper });
      // photo, cover-cropped around the focal point
      const sc = Math.max(pw / img.width, ph / img.height), dw = img.width * sc, dh = img.height * sc, ox = clamp(pw / 2 - p.fx * dw, pw - dw, 0), oy = clamp(ph / 2 - p.fy * dh, ph - dh, 0), px = x0 + 22, py = y0 + 22;
      g.save(); rr(g, px, py, pw, ph, 6); g.clip(); g.drawImage(img, px + ox, py + oy, dw, dh);
      const vg = g.createLinearGradient(px, py, px + pw, py + ph); vg.addColorStop(0, 'rgba(255,255,255,.10)'); vg.addColorStop(0.5, 'rgba(255,255,255,0)'); vg.addColorStop(1, 'rgba(0,0,0,.18)'); g.fillStyle = vg; g.fillRect(px, py, pw, ph);
      if (mug) { g.strokeStyle = 'rgba(11,15,20,.55)'; g.lineWidth = 2; for (let i = 0; i < 14; i++) { const yy = py + ph - i * ph / 14; g.beginPath(); g.moveTo(px + pw - (i % 5 === 0 ? 46 : 24), yy); g.lineTo(px + pw, yy); g.stroke(); } }
      g.restore(); g.strokeStyle = 'rgba(11,15,20,.28)'; g.lineWidth = 2; rr(g, px, py, pw, ph, 6); g.stroke();
      if (p.name) { const ty = y0 + 22 + ph + 14, tw = w - 44; g.fillStyle = mug ? '#1B2430' : theme.navy; rr(g, px, ty, tw, 84, 10); g.fill(); txt(g, p.name, 0, ty + 30, F.hero(44), theme.paper); if (p.role) txt(g, p.role, 0, ty + 63, F.mono(21), rgba(theme.paper, 0.8)); }
      const cl = [p.tag, p.credit].filter(Boolean).join(' · '); if (cl) txt(g, cl, 0, y0 + h - (p.name ? 15 : 30), F.mono(14), theme.inkSoft);
      if (p.tape) { g.save(); g.translate(-w * 0.28, y0 + 2); g.rotate(-0.12); g.fillStyle = 'rgba(236,222,170,.82)'; g.fillRect(-52, -14, 104, 30); g.fillStyle = 'rgba(255,255,255,.25)'; g.fillRect(-52, -14, 104, 8); g.restore(); }
      g.restore(); },
  });

  // ---------- bubble + follow: the storyteller's comment prompt and follow button (same design as v1). Use layer:'screen'. ----------
  B.register('bubble', {
    defaults: { l1: 'COMMENT', l2: '', tail: 'right', size: 44 }, size: p => [Math.max(measure(p.l1, F.cap(p.size)), measure(p.l2 || '', F.cap(p.size))) + 80, p.l2 ? p.size * 3.5 : p.size * 2.2],
    draw(g, p, env) { const [w, h] = this.size(p), th = env.theme, s = p.tail === 'left' ? -1 : 1; B.shadowed(g, () => { rr(g, -w / 2, -h / 2, w, h, 34); }, th.paper, 0.4);
      g.fillStyle = th.paper; g.beginPath(); g.moveTo(s * w * 0.16, h / 2 - 2); g.lineTo(s * w * 0.3, h / 2 + 56); g.lineTo(s * w * 0.34, h / 2 - 2); g.fill();
      if (p.l2) { txt(g, p.l1, 0, -p.size * 0.62, F.cap(p.size), th.ink); txt(g, p.l2, 0, p.size * 0.7, F.cap(p.size), '#FF3B30'); } else txt(g, p.l1, 0, 2, F.cap(p.size), th.ink); },
  });
  B.register('follow', {
    defaults: { press: 0.75, labels: ['+ FOLLOW', '✓ FOLLOWING'] }, size: () => [340, 96],
    draw(g, p, env) { const lt = env.lt, done = lt > p.press + 0.12, pr = 1 - 0.1 * B.hit(lt - p.press, 9) * (lt >= p.press ? 1 : 0) + (done ? 0.06 * wobble(lt - p.press - 0.12, 4, 7) : 0); g.scale(pr, pr);
      clay(g, -170, -48, 340, 96, 48, done ? '#2a323d' : '#FF3B30', { lift: 0.3 }); txt(g, p.labels[done ? 1 : 0], 0, 3, F.cap(42), env.theme.paper);
      const r = lin(lt, p.press - 0.1, p.press + 0.35); if (r > 0 && r < 1) { g.strokeStyle = rgba(env.theme.paper, 1 - r); g.lineWidth = 6; g.beginPath(); g.arc(90, 10, 20 + 70 * ease.out(r), 0, 7); g.stroke(); } },
  });
})();
