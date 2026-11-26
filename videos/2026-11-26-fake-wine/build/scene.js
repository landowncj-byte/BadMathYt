// ===== fake-wine (Decoded) — shared custom recipes, prepended to each cut's scene.js. Generic bottles/labels only: no real winery logos or label designs. =====
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, countAt, hash, hit } = B;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const rise = (t, at, d = 18) => { const o = t - at; return { a: clamp(o / 0.12), y: (1 - spring(Math.max(0, o), 'snappy')) * d, on: o > 0 }; };
  const GLASS = '#2E4A3A', RED = '#8A1D1D';

  // generic bottle outline (local, origin = centre of body block)
  const bpath = g => { g.beginPath(); g.moveTo(-85, 340); g.lineTo(-85, -20); g.bezierCurveTo(-85, -120, -26, -150, -26, -250); g.lineTo(-26, -330); g.lineTo(26, -330); g.lineTo(26, -250); g.bezierCurveTo(26, -150, 85, -120, 85, -20); g.lineTo(85, 340); g.closePath(); };
  const labelDraw = (g, p, theme, scale) => {
    paper(g, -82, 0, 164, 236, 8, { lift: 0.1 });
    txt(g, 'RED WINE', 0, 26, F.mono(17), theme.inkSoft);
    g.strokeStyle = theme.rule; g.lineWidth = 3; g.beginPath(); g.moveTo(-58, 44); g.lineTo(58, 44); g.stroke();
    if (p.sticker) { g.fillStyle = theme.gold; g.beginPath(); g.arc(0, 128, 62, 0, 7); g.fill(); g.strokeStyle = theme.ink; g.lineWidth = 4; g.beginPath(); g.arc(0, 128, 52, 0, 7); g.stroke(); txt(g, p.sticker, 0, 132, F.hero(60), theme.ink); }
    else { txt(g, p.year, 0, 122, F.hero(78), theme.ink); g.strokeStyle = theme.badInk; g.lineWidth = 4; g.beginPath(); g.moveTo(-50, 170); g.lineTo(50, 170); g.stroke(); }
    txt(g, 'GENERIC LABEL', 0, 214, F.mono(13), theme.inkSoft);
  };
  const bottleBody = (g, p, theme, lift, label) => {
    B.shadowed(g, () => bpath(g), p.glass || GLASS, lift);
    g.save(); bpath(g); g.clip(); const lg = g.createLinearGradient(-85, 0, 85, 0); lg.addColorStop(0, 'rgba(255,255,255,.22)'); lg.addColorStop(0.28, 'rgba(255,255,255,0)'); lg.addColorStop(0.8, 'rgba(0,0,0,.0)'); lg.addColorStop(1, 'rgba(0,0,0,.3)'); g.fillStyle = lg; g.fillRect(-90, -340, 180, 690);
    if (p.dust) { g.globalAlpha = 0.28; g.fillStyle = '#d8cdb8'; g.fillRect(-90, 250, 180, 100); g.fillRect(-90, -200, 180, 40); g.globalAlpha = 1; }
    g.restore();
    // cap
    if (p.screw) { clay(g, -30, -352, 60, 74, 8, '#c9ccd2', { shadowK: 0.3 }); g.strokeStyle = 'rgba(0,0,0,.2)'; g.lineWidth = 2; for (let y = -340; y < -290; y += 9) { g.beginPath(); g.moveTo(-28, y); g.lineTo(28, y); g.stroke(); } }
    else clay(g, -31, -350, 62, 86, 10, RED, { shadowK: 0.3 });
    if (label) label();
  };

  // ---------- bottle: clay wine bottle with a generic paper label. year -> label year; sticker -> price sticker. slam: frame-0 drop. ----------
  B.register('bottle', {
    defaults: { year: '1945', sticker: '', screw: false, dust: true, slam: false, peelAt: 99999, peelDur: 0.7, turnAt: 99999, ringAt: 99999 }, ownEnter: true,
    size: () => [260, 700],
    anchors: () => ({ label: [0, 118, 190, 250], year: [0, 124, 170, 90], body: [0, 0, 190, 690] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env; let sx = 1, k0 = 0;
      if (p.slam) k0 = hit(lt, 8);
      if (p.turnAt < 90) { sx = lerp(0.1, 1, ease.out(lin(t, p.turnAt, p.turnAt + 0.55))); }
      const sc = 1 + 0.12 * k0; g.save(); g.translate(0, 0); g.scale(sc * sx, sc); g.rotate(-0.03 * k0);
      const peel = t >= p.peelAt ? ease.out(lin(t, p.peelAt, p.peelAt + p.peelDur)) : 0;
      bottleBody(g, p, theme, lift, peel > 0 ? null : () => { g.save(); g.translate(0, 0); labelDraw(g, p, theme); g.restore(); });
      if (peel > 0) { // bare patch where the label was + the label floating to camera
        g.fillStyle = 'rgba(0,0,0,.18)'; rr(g, -82, 0, 164, 236, 8); g.fill();
        g.save(); g.translate(lerp(0, -30, peel), lerp(0, -300, peel)); g.rotate(-0.07 * peel); const s2 = 1 + 1.15 * peel; g.scale(s2, s2); labelDraw(g, p, theme); g.restore();
      }
      g.restore();
      if (p.slam) burst(g, 0, 330, 260, '#d8cdb8', lt - 0.02, 14, 0.5);
    },
  });

  // ---------- wintl: winery timeline card. FIRST MADE: 1982 (stamp-style row), axis with the bottle on the wrong end, 37-year bracket ----------
  B.register('wintl', {
    defaults: { w: 640, firstAt: -1, axisAt: 99999, bracketAt: 99999, sub: 'PER TRIAL TESTIMONY', label: 'LABEL SAYS', headNote: 'WINERY TIMELINE', yearL: '1945', yearR: '1982', yearsText: '37 YEARS' }, ownEnter: true,
    size: p => [p.w, 640],
    anchors: p => ({ first: [0, -125, p.w * 0.92, 130], axis: [0, 40, p.w * 0.9, 150], bracket: [0, 175, p.w * 0.9, 170], y1982: [200, 70, 200, 120] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = 640, x0 = -w / 2, y0 = -h / 2;
      const pop = spring(Math.max(0, lt), 'snappy'), s0 = 0.9 + 0.1 * pop; g.save(); g.scale(s0, s0); g.globalAlpha *= clamp(lt / 0.08 + 0.4);
      paper(g, x0, y0, w, h, 26, { lift });
      g.save(); rr(g, x0, y0, w, h, 26); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 100); g.restore();
      txt(g, p.headNote, x0 + 34, y0 + 52, F.hero(52), theme.paper, 'left'); txt(g, 'ILLUSTRATION', x0 + w - 28, y0 + 26, F.mono(15), 'rgba(245,243,238,.7)', 'right');
      // FIRST MADE row (stamp-style)
      { const ft = t - p.firstAt; if (ft > -0.01) { const sc = 1 + 0.5 * (1 - ease.out(clamp(ft / 0.18))); g.save(); g.translate(0, y0 + 190); g.rotate(-0.025); g.scale(sc, sc);
          g.strokeStyle = theme.badInk; g.lineWidth = 7; rr(g, -w * 0.45, -62, w * 0.9, 124, 14); g.stroke();
          const a = 'FIRST MADE: ', b = p.yearR, f = F.hero(76), wa = mw(a, f), wb = mw(b, f), tot = wa + wb; txt(g, a, -tot / 2, 4, f, theme.ink, 'left'); txt(g, b, -tot / 2 + wa, 4, f, theme.badInk, 'left'); g.restore(); burst(g, 0, y0 + 190, 300, theme.bad, ft - 0.1, 14, 0.45); } }
      // ghost lines until the axis unrolls
      if (t < p.axisAt) { g.fillStyle = theme.paperShade; for (let i = 0; i < 3; i++) { rr(g, x0 + 50, y0 + 300 + i * 70, (w - 100) * (i === 1 ? 0.7 : 0.95), 20, 8); g.fill(); } }
      // axis
      { const ay = y0 + 380, ax = clamp(lin(t, p.axisAt, p.axisAt + 0.7)), xl = -w * 0.36, xr = w * 0.36;
        if (ax > 0) { g.save(); g.strokeStyle = theme.ink; g.lineWidth = 8; g.lineCap = 'round'; g.beginPath(); g.moveTo(xl, ay); g.lineTo(lerp(xl, xr, ease.out(ax)), ay); g.stroke();
          g.fillStyle = theme.ink; for (const [x, c] of [[xl, theme.badInk], [xr, theme.badInk]]) { if ((x === xl) || ax > 0.95) { g.fillStyle = c; g.beginPath(); g.arc(x, ay, 16, 0, 7); g.fill(); } }
          txt(g, p.yearL, xl, ay + 58, F.hero(54), theme.badInk); txt(g, p.label, xl, ay - 150, F.mono(19), theme.inkSoft);
          // tiny bottle on the wrong end
          g.save(); g.translate(xl, ay - 70); g.scale(0.17, 0.17); g.translate(0, -250); B.shadowed(g, () => bpath(g), GLASS, 0.1); clay(g, -31, -350, 62, 86, 10, RED, { shadowK: 0.2 }); g.restore();
          if (ax > 0.95) { txt(g, p.yearR, xr, ay + 58, F.hero(54), theme.badInk); txt(g, 'FIRST MADE', xr, ay - 44, F.mono(19), theme.inkSoft); }
          g.restore(); } }
      // bracket
      { const bt = t - p.bracketAt; if (bt > -0.01) { const k = ease.out(clamp(bt / 0.35)), by = y0 + 470, xl = -w * 0.36, xr = w * 0.36; g.save(); g.strokeStyle = theme.badInk; g.lineWidth = 7; g.lineCap = 'round'; g.lineJoin = 'round';
          g.beginPath(); g.moveTo(xl, by - 16); g.lineTo(xl, by); g.lineTo(lerp(xl, xr, k), by); if (k > 0.97) g.lineTo(xr, by - 16); g.stroke();
          const s = 1 + 0.16 * hit(bt - 0.3, 7) * (bt > 0.3 ? 1 : 0); g.translate(0, by + 70); g.scale(s, s); const f = F.hero(94); txt(g, p.yearsText, 0, 0, f, theme.badInk); if (bt > 0.3) marker(g, -mw(p.yearsText, f) / 2, 52, mw(p.yearsText, f), 8, theme.badInk, clamp((bt - 0.3) / 0.3), 0.9); g.restore(); burst(g, 0, y0 + 540, 260, theme.bad, bt - 0.3, 14, 0.5); } }
      txt(g, p.sub, 0, y0 + h - 28, F.mono(17), theme.inkSoft);
      g.restore();
    },
  });

  // ---------- bench: kitchen-sink "blending" bench (ILLUSTRATION). Two jugs -> funnel -> bottle -> cork -> label; label printer spits labels ----------
  B.register('bench', {
    defaults: { w: 920, h: 780, pourAt: 99999, corkAt: 99999, labelAt: 99999, printAt: 99999, printDur: 1.6, tagAt: 99999, tag: 'PROSECUTORS SAID' }, ownEnter: true,
    size: p => [p.w, p.h],
    anchors: p => ({ jugs: [0, -170, 700, 280], bottle: [0, 190, 240, 330], printer: [300, 240, 300, 300], tag: [230, -330, 400, 80] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, sp = spring(Math.max(0, lt), 'snappy');
      g.save(); g.globalAlpha *= clamp(lt / 0.08 + 0.4); g.scale(0.92 + 0.08 * sp, 0.92 + 0.08 * sp);
      paper(g, x0, y0, w, h, 26, { lift });
      g.save(); rr(g, x0, y0, w, h, 26); g.clip();
      g.fillStyle = '#E7E2D6'; g.fillRect(x0, y0, w, h); g.strokeStyle = '#D8D3C7'; g.lineWidth = 3; for (let x = x0; x < x0 + w; x += 90) { g.beginPath(); g.moveTo(x, y0); g.lineTo(x, y0 + h); g.stroke(); } for (let y = y0; y < y0 + h; y += 90) { g.beginPath(); g.moveTo(x0, y); g.lineTo(x0 + w, y); g.stroke(); }
      g.fillStyle = theme.manila; g.fillRect(x0, y0 + 480, w, h - 480); g.fillStyle = 'rgba(0,0,0,.12)'; g.fillRect(x0, y0 + 480, w, 10); g.restore();
      // tap
      clay(g, x0 + 60, y0 + 70, 24, 120, 8, '#c9ccd2', { shadowK: 0.3 }); clay(g, x0 + 60, y0 + 62, 120, 24, 10, '#c9ccd2', { shadowK: 0.3 }); clay(g, x0 + 160, y0 + 76, 22, 36, 6, '#c9ccd2', { shadowK: 0.2 });
      txt(g, 'ILLUSTRATION · KITCHEN BENCH', x0 + 34, y0 + h - 26, F.mono(18), theme.inkSoft, 'left');
      // jugs
      const pt = t - p.pourAt, pk = ease.inOut(clamp(pt / 0.45)) * (1 - ease.inOut(clamp((pt - 1.1) / 0.4)));
      const jug = (cx, cy, col, dir, name) => { g.save(); g.translate(cx, cy); g.rotate(dir * 0.9 * pk); clay(g, -62, -95, 124, 190, 26, col, { shadowK: 0.5 }); clay(g, -26, -135, 52, 50, 10, col, { shadowK: 0.3 }); g.strokeStyle = 'rgba(0,0,0,.25)'; g.lineWidth = 12; g.beginPath(); g.arc(dir * 62, 0, 40, -1.2, 1.2, dir < 0); g.stroke(); g.restore(); txt(g, name, cx, cy + 128, F.mono(22), theme.ink); };
      jug(x0 + 250, y0 + 250, '#8A5A2B', 1, 'OLD WINE'); jug(x0 + w - 250, y0 + 250, '#6A1E3A', -1, 'NEWER WINE');
      // funnel
      g.save(); g.translate(0, y0 + 300); B.shadowed(g, () => { g.beginPath(); g.moveTo(-90, -70); g.lineTo(90, -70); g.lineTo(18, 40); g.lineTo(18, 90); g.lineTo(-18, 90); g.lineTo(-18, 40); g.closePath(); }, '#c9ccd2', 0.1); g.restore();
      // streams
      if (pk > 0.3 && pt < 1.5) { for (const [sxx, col] of [[x0 + 250 + 120, '#8A5A2B'], [x0 + w - 250 - 120, '#6A1E3A']]) { g.save(); g.strokeStyle = col; g.lineWidth = 12; g.lineCap = 'round'; g.setLineDash([22, 14]); g.lineDashOffset = -pt * 160; g.beginPath(); g.moveTo(sxx, y0 + 270); g.quadraticCurveTo(lerp(sxx, 0, 0.6), y0 + 280, 0, y0 + 250); g.stroke(); g.restore(); } }
      // bottle (mini) at the bench
      const fill = clamp(pt / 1.3); g.save(); g.translate(0, y0 + 540); g.scale(0.5, 0.5);
      B.shadowed(g, () => bpath(g), 'rgba(80,100,90,.55)', 0.1); g.save(); bpath(g); g.clip(); g.fillStyle = '#5a1e34'; g.fillRect(-90, 340 - 470 * fill * 0.9, 180, 470); g.restore();
      { const ct = t - p.corkAt; if (ct > -0.01) { const cy = lerp(-700, -310, ease.out(clamp(ct / 0.22))); clay(g, -26, cy, 52, 80, 12, '#B9955A', { shadowK: 0.3 }); burst(g, 0, -330, 150, theme.gold, ct - 0.2, 10, 0.4); } else clay(g, -31, -350, 62, 40, 10, '#5a1e34', { shadowK: 0.0 });
      }
      { const lt2 = t - p.labelAt; if (lt2 > -0.01) { const sc = 1 + 0.9 * (1 - ease.out(clamp(lt2 / 0.16))); g.save(); g.translate(0, 120); g.scale(sc, sc); paper(g, -82, -50, 164, 190, 8, { lift: 0.1 }); txt(g, 'LABEL', 0, 30, F.hero(44), theme.ink); txt(g, 'GENERIC', 0, 90, F.mono(15), theme.inkSoft); g.restore(); burst(g, 0, 160, 220, theme.paper, lt2 - 0.1, 10, 0.4); } }
      g.restore();
      // corks + wax
      for (let i = 0; i < 4; i++) { g.save(); g.translate(x0 + 120 + i * 62, y0 + 620 + (i % 2) * 22); g.rotate(hash(i) * 3); clay(g, -14, -22, 28, 44, 8, '#B9955A', { shadowK: 0.3 }); g.restore(); }
      g.save(); g.translate(x0 + 380, y0 + 640); g.fillStyle = RED; g.beginPath(); g.ellipse(0, 0, 44, 28, 0, 0, 7); g.fill(); g.restore();
      // label printer + spitting labels
      { const px = x0 + w - 270, py = y0 + 560; clay(g, px - 120, py - 70, 240, 140, 18, '#59606B', { shadowK: 0.6 }); g.fillStyle = '#0B0F14'; rr(g, px - 100, py + 8, 200, 12, 5); g.fill(); clay(g, px - 90, py - 56, 90, 22, 8, '#c9ccd2', { shadowK: 0.1 });
        const n = 16; for (let i = 0; i < n; i++) { const ti = p.printAt + (i / n) * p.printDur, k = clamp((t - ti) / 0.4); if (k <= 0) continue; const e = ease.out(k), lx = lerp(px, px - 60 - (i % 5) * 70 - hash(i + 3) * 70, e), ly = lerp(py + 14, py + 120 + (i % 3) * 40, e) - Math.sin(Math.PI * e) * 60;
          g.save(); g.translate(lx, ly); g.rotate((hash(i + 9) - 0.5) * 1.4 * e); paper(g, -34, -24, 68, 48, 4, { lift: 0.05 }); g.fillStyle = theme.ink; g.fillRect(-22, -12, 44, 5); g.fillRect(-22, 0, 30, 5); g.restore(); } }
      // tag
      { const r = rise(t, p.tagAt, 24); if (r.on) { g.save(); g.globalAlpha = r.a; g.translate(x0 + w - 240, y0 + 70 + r.y); paper(g, -200, -34, 400, 68, 12, { fill: theme.paper }); g.strokeStyle = theme.badInk; g.lineWidth = 4; rr(g, -183, -27, 366, 54, 8); g.stroke(); txt(g, p.tag, 0, 3, F.cap(26), theme.badInk); g.restore(); } }
      g.restore();
    },
  });

  // ---------- paddle: auction paddle. Raises at `at` ----------
  B.register('paddle', {
    defaults: { at: 0 }, ownEnter: true, size: () => [300, 560],
    draw(g, p, env) {
      const { t, theme, lift } = env, k = spring(Math.max(0, t - p.at), 'bouncy'), sw = Math.sin(clamp(t - p.at, 0, 1.2) * 11) * 0.12 * (1 - clamp((t - p.at) / 1.2));
      g.save(); g.translate(0, (1 - k) * 260); g.rotate(sw);
      clay(g, -26, 20, 52, 250, 16, '#B9955A', { shadowK: 0.5 }); B.shadowed(g, () => { g.beginPath(); g.arc(0, -90, 125, 0, 7); }, theme.paper, lift);
      g.strokeStyle = theme.ink; g.lineWidth = 8; g.beginPath(); g.arc(0, -90, 108, 0, 7); g.stroke(); txt(g, 'BID', 0, -86, F.hero(96), theme.ink); txt(g, 'GENERIC PADDLE', 0, -22, F.mono(14), theme.inkSoft);
      g.restore();
    },
  });

  // ---------- lotpage: auction catalogue page (ILLUSTRATION). One lot line is dated 1945 ----------
  B.register('lotpage', {
    defaults: { w: 640, h: 780, yearAt: 99999, flipDur: 0.4 }, ownEnter: true, size: p => [p.w, p.h],
    anchors: p => ({ lot: [0, 20, p.w * 0.92, 150], year: [150, 20, 230, 130], head: [0, -p.h / 2 + 80, p.w, 150] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, fl = ease.out(clamp(lt / p.flipDur));
      g.save(); g.scale(Math.max(0.02, Math.cos((1 - fl) * 1.45)), 1); g.rotate(-0.02 * (1 - fl));
      paper(g, x0, y0, w, h, 22, { lift }); g.save(); rr(g, x0, y0, w, h, 22); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 130); g.restore();
      txt(g, 'AUCTION CATALOGUE', x0 + 36, y0 + 52, F.hero(50), theme.paper, 'left'); txt(g, 'NEW YORK · APRIL 2008', x0 + 36, y0 + 98, F.mono(24), 'rgba(245,243,238,.85)', 'left'); txt(g, 'ILLUSTRATION', x0 + w - 28, y0 + 28, F.mono(15), 'rgba(245,243,238,.7)', 'right');
      for (let i = 0; i < 5; i++) { if (i === 2) continue; const y = y0 + 190 + i * 118; g.fillStyle = theme.paperShade; rr(g, x0 + 36, y, w - 72, 22, 8); g.fill(); rr(g, x0 + 36, y + 40, (w - 72) * 0.62, 18, 8); g.fill(); }
      { const y = y0 + 190 + 2 * 118 - 18; g.fillStyle = 'rgba(255,214,10,.28)'; rr(g, x0 + 24, y - 4, w - 48, 110, 12); g.fill(); txt(g, 'LOT · ONE FRENCH WINE', x0 + 40, y + 28, F.mono(24), theme.ink, 'left'); txt(g, 'SOME BOTTLES DATED', x0 + 40, y + 72, F.mono(20), theme.inkSoft, 'left');
        const yt = t - p.yearAt; if (yt > -0.01) { const sc = 1 + 0.5 * (1 - ease.out(clamp(yt / 0.18))); g.save(); g.translate(x0 + w - 130, y + 52); g.scale(sc, sc); marker(g, -92, -46, 184, 92, theme.badInk, clamp(yt / 0.3), 0.2); txt(g, '1945', 0, 4, F.hero(86), theme.badInk); g.restore(); burst(g, x0 + w - 130, y + 52, 200, theme.bad, yt - 0.1, 12, 0.45); } }
      g.restore();
    },
  });

  // ---------- silh: winemaker silhouette card. NO likeness, no name ----------
  B.register('silh', {
    defaults: { w: 480, h: 560, name: 'THE WINEMAKER', sub: 'ILLUSTRATION · NO LIKENESS' }, size: p => [p.w, p.h],
    draw(g, p, env) {
      const { theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 24, { lift });
      g.save(); rr(g, x0, y0, w, h, 24); g.clip(); const bg = g.createLinearGradient(0, y0, 0, y0 + h); bg.addColorStop(0, '#E7E2D6'); bg.addColorStop(1, '#D8D3C7'); g.fillStyle = bg; g.fillRect(x0, y0, w, h);
      const sg = g.createLinearGradient(0, y0 + 280, 0, y0 + 440); sg.addColorStop(0, '#6a7282'); sg.addColorStop(1, '#3a4350'); g.fillStyle = sg; rr(g, -170, y0 + 290, 340, 280, 120); g.fill(); g.fillStyle = '#59606B'; g.fillRect(-26, y0 + 225, 52, 80); const hg = g.createLinearGradient(-70, y0 + 90, 70, y0 + 240); hg.addColorStop(0, '#7c8596'); hg.addColorStop(1, '#4a5260'); g.fillStyle = hg; g.beginPath(); g.ellipse(0, y0 + 170, 78, 94, 0, 0, 7); g.fill();
      g.fillStyle = theme.navy; g.fillRect(x0, y0 + h - 110, w, 110); g.restore();
      txt(g, p.sub, x0 + 22, y0 + 30, F.mono(16), theme.inkSoft, 'left'); txt(g, p.name, 0, y0 + h - 62, F.hero(48), theme.paper); txt(g, 'OF THE FRENCH WINE · HIS FAMILY', 0, y0 + h - 24, F.mono(15), 'rgba(245,243,238,.8)');
    },
  });

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

  // ---------- cheque on a crate (ILLUSTRATION): the frame-0 slam for TikTok / IG ----------
  B.register('cheque', {
    defaults: { amount: '$2.1 MILLION', top: 'PAY TO THE SELLER', note: 'TOLD THE JURY', n: 5 }, ownEnter: true, size: () => [880, 760],
    anchors: () => ({ amount: [0, -160, 700, 150], crate: [0, 190, 820, 360], cheque: [0, -150, 720, 320] }),
    draw(g, p, env) {
      const { lt, theme } = env, k0 = hit(lt, 8), s = 1 + 0.15 * k0; g.save(); g.scale(s, s); g.rotate(-0.025 * k0);
      // crate with bottle necks
      for (let i = 0; i < p.n; i++) { const x = -330 + i * 165; g.save(); g.translate(x, 20); clay(g, -30, -110, 60, 150, 14, GLASS, { shadowK: 0.4 }); clay(g, -20, -148, 40, 56, 8, RED, { shadowK: 0.3 }); g.restore(); }
      clay(g, -420, 40, 840, 330, 22, '#B9955A', { shadowK: 0.8 }); g.save(); rr(g, -420, 40, 840, 330, 22); g.clip(); g.strokeStyle = 'rgba(70,45,15,.35)'; g.lineWidth = 5; for (const y of [120, 200, 280]) { g.beginPath(); g.moveTo(-420, y); g.lineTo(420, y); g.stroke(); } g.restore();
      txt(g, 'ILLUSTRATION · GENERIC CRATE', 0, 335, F.mono(18), 'rgba(40,25,5,.7)');
      // cheque
      g.save(); g.translate(0, -170); g.rotate(-0.045); paper(g, -360, -150, 720, 300, 16, { lift: 0.3 });
      txt(g, 'CHEQUE · ILLUSTRATION', -336, -118, F.mono(17), theme.inkSoft, 'left'); txt(g, p.top, -336, -78, F.mono(22), theme.inkSoft, 'left');
      txt(g, p.amount, 0, 18, F.hero(128), theme.ink); g.strokeStyle = theme.badInk; g.lineWidth = 7; g.beginPath(); g.moveTo(-290, 84); g.lineTo(290, 84); g.stroke(); txt(g, p.note, 0, 118, F.cap(30), theme.badInk); g.restore();
      g.restore(); burst(g, 0, 40, 520, theme.dust || '#d8cdb8', lt - 0.02, 16, 0.5);
    },
  });

  // ---------- scorecard: taste-test scorecard with a red X ----------
  B.register('scorecard', {
    defaults: { w: 640, h: 700, xAt: 99999 }, ownEnter: true, size: p => [p.w, p.h],
    anchors: p => ({ x: [0, 40, 420, 420], head: [0, -p.h / 2 + 60, p.w, 120] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, sp = spring(Math.max(0, lt), 'snappy'); g.save(); g.scale(0.92 + 0.08 * sp, 0.92 + 0.08 * sp); g.rotate(-0.02);
      paper(g, x0, y0, w, h, 24, { lift }); g.save(); rr(g, x0, y0, w, h, 24); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 120); g.restore(); txt(g, 'TASTE TEST', x0 + 34, y0 + 62, F.hero(66), theme.paper, 'left'); txt(g, 'ILLUSTRATION', x0 + w - 26, y0 + 28, F.mono(15), 'rgba(245,243,238,.7)', 'right');
      for (let i = 0; i < 5; i++) { const y = y0 + 190 + i * 96; g.fillStyle = theme.paperShade; rr(g, x0 + 40, y, w - 220, 22, 8); g.fill(); g.strokeStyle = theme.rule; g.lineWidth = 4; rr(g, x0 + w - 130, y - 14, 74, 50, 10); g.stroke(); }
      const xt = t - p.xAt; if (xt > -0.01) { const k = ease.out(clamp(xt / 0.22)); g.save(); g.translate(0, 70); g.strokeStyle = theme.badInk; g.lineWidth = 34; g.lineCap = 'round'; g.beginPath(); g.moveTo(-200, -200); g.lineTo(lerp(-200, 200, Math.min(1, k * 2)), lerp(-200, 200, Math.min(1, k * 2))); g.stroke(); if (k > 0.5) { g.beginPath(); g.moveTo(200, -200); g.lineTo(lerp(200, -200, (k - 0.5) * 2), lerp(-200, 200, (k - 0.5) * 2)); g.stroke(); } g.restore(); burst(g, 0, 70, 380, theme.bad, xt - 0.2, 14, 0.5); }
      g.restore();
    },
  });

  // ---------- wverdict: case-file verdict card. CONVICTED 2013 · 10 YEARS · (PAY BACK $28.4 MILLION) ----------
  B.register('wverdict', {
    defaults: { w: 740, h: 860, convAt: 99999, yearsAt: 99999, payAt: 99999, pay: true, barsAt: 99999 }, ownEnter: true, size: p => [p.w, p.h],
    anchors: p => { const y0 = -p.h / 2; return { head: [0, y0 + 80, p.w, 160], conv: [0, y0 + 250, p.w * 0.92, 190], years: [0, y0 + 450, p.w * 0.92, 190], pay: [0, y0 + 660, p.w * 0.92, 200] }; },
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, sp = spring(Math.max(0, lt), 'bouncy');
      g.save(); g.scale(0.85 + 0.15 * sp, 0.85 + 0.15 * sp);
      clay(g, x0 + 30, y0 - 46, 260, 70, 16, theme.manila, { shadowK: 0.4 }); txt(g, 'CASE FILE', x0 + 160, y0 - 10, F.mono(26), theme.ink);
      paper(g, x0, y0, w, h, 26, { lift }); g.save(); rr(g, x0, y0, w, h, 26); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 150); g.restore(); txt(g, 'THE VERDICT', x0 + 40, y0 + 76, F.hero(80), theme.paper, 'left');
      const ga = p.convAt, ang = t < ga - 0.3 ? -0.95 : t < ga ? lerp(-0.95, 0.1, ease.in(lin(t, ga - 0.3, ga))) : 0.1 - 0.35 * hit(t - ga, 9) * Math.max(0, Math.sin((t - ga) * 18));
      g.save(); g.translate(x0 + w - 120, y0 + 108); clay(g, -62, 6, 124, 22, 8, theme.manila, { shadowK: 0.3 }); g.translate(0, -2); g.rotate(ang); clay(g, -9, -118, 18, 124, 8, theme.manila, { shadowK: 0.3 }); clay(g, -50, -150, 100, 58, 12, '#B9955A', { shadowK: 0.3 }); g.restore();
      const dash = y => { g.strokeStyle = theme.rule; g.lineWidth = 3; g.setLineDash([10, 9]); g.beginPath(); g.moveTo(x0 + 40, y); g.lineTo(x0 + w - 40, y); g.stroke(); g.setLineDash([]); };
      { const gt = t - ga; if (gt > 0) { const sc = 1 + 1.3 * (1 - ease.expo(gt / 0.2)), a = clamp(gt / 0.08), hot = env.hot === 'conv' ? 0.03 * env.hotK : 0; g.save(); g.globalAlpha = a; g.translate(0, y0 + 250); g.rotate(-0.04); g.scale(sc + hot, sc + hot); marker(g, -300, -80, 600, 140, theme.badInk, clamp((gt - 0.1) / 0.3), 0.16); txt(g, 'CONVICTED', 0, 0, F.hero(124), theme.badInk); g.restore(); txt(g, '2013 · JURY, MANHATTAN FEDERAL COURT', 0, y0 + 325, F.mono(22), theme.inkSoft); burst(g, 0, y0 + 250, 300, theme.bad, gt - 0.1, 20, 0.55); } }
      dash(y0 + 370);
      { const mt = t - p.yearsAt; if (mt > -0.01) { const v = countAt(Math.max(0, mt), 0.6, 0, 10), land = mt - 0.6, s = 1 + (land > 0 ? 0.16 * hit(land, 6) : 0) + (env.hot === 'years' ? 0.03 * env.hotK : 0), o = { font: F.hero(140), size: 140, color: theme.ink, speed: mt < 0.6 ? 10 / 0.4 : 0 };
          const nw = B.rollWidth(g, 10, o).w, sw = mw(' YEARS', F.hero(140)), tot = nw + sw; g.save(); g.translate(0, y0 + 470); g.scale(s, s); roll(g, v, -tot / 2, 0, { ...o, align: 'left' }); txt(g, ' YEARS', -tot / 2 + nw, 0, F.hero(140), theme.badInk, 'left'); if (land > 0) marker(g, -tot / 2, 92, tot, 9, theme.badInk, clamp(land / 0.3), 0.9); g.restore(); burst(g, 0, y0 + 470, 300, theme.bad, land, 18, 0.55); } }
      if (p.pay) { dash(y0 + 590);
        { const mt = t - p.payAt; if (mt > -0.01) { const v = countAt(Math.max(0, mt), 0.9, 0, 28.4, ease.expo), land = mt - 0.9, s = 1 + (land > 0 ? 0.14 * hit(land, 6) : 0) + (env.hot === 'pay' ? 0.03 * env.hotK : 0), o = { font: F.hero(112), size: 112, color: theme.ink, prefix: '$', decimals: 1, speed: mt < 0.9 ? 30 : 0 };
            txt(g, 'PAY BACK', 0, y0 + 640, F.cap(34), theme.inkSoft); const nw = B.rollWidth(g, 28.4, o).w, sw = mw(' MILLION', F.hero(112)), tot = nw + sw; g.save(); g.translate(0, y0 + 740); g.scale(s, s); roll(g, v, -tot / 2, 0, { ...o, align: 'left' }); txt(g, ' MILLION', -tot / 2 + nw, 0, F.hero(112), theme.badInk, 'left'); if (land > 0) marker(g, -tot / 2, 78, tot, 8, theme.badInk, clamp(land / 0.3), 0.9); g.restore(); txt(g, 'RESTITUTION · PER DOJ', 0, y0 + 826, F.mono(22), theme.inkSoft); burst(g, 0, y0 + 740, 300, theme.bad, land, 18, 0.55); } } }
      g.restore();
    },
  });

  // ---------- cellbars: prison bars slide across a card (IG verdict) ----------
  B.register('cellbars', {
    defaults: { at: 99999, w: 700, h: 560 }, ownEnter: true, size: p => [p.w, p.h],
    draw(g, p, env) {
      const { t, theme } = env, k = ease.out(clamp((t - p.at) / 0.45)); if (k <= 0) return; const w = p.w, h = p.h;
      g.save(); rr(g, -w / 2, -h / 2, w, h, 22); g.clip(); for (let i = 0; i < 7; i++) { const x = lerp(-w / 2 - 80, -w / 2 + 60 + i * ((w - 120) / 6), k); clay(g, x - 14, -h / 2, 28, h, 12, '#59606B', { shadowK: 0.5 }); } clay(g, -w / 2, -h / 2 + 40, w, 26, 8, '#59606B', { shadowK: 0.3 }); clay(g, -w / 2, h / 2 - 66, w, 26, 8, '#59606B', { shadowK: 0.3 }); g.restore();
    },
  });

  // ---------- glass (screen): swirling wine glass that the paper plane leaves ----------
  B.register('glass', {
    defaults: { s: 1 }, size: () => [10, 10],
    draw(g, p, env) {
      const lt = env.lt, sw = Math.sin(lt * 14) * 0.18 * (1 - clamp(lt / 1.0)), a = clamp(lt / 0.12), th = env.theme; g.save(); g.globalAlpha *= a; g.scale(p.s * (0.7 + 0.3 * spring(lt, 'snappy')), p.s * (0.7 + 0.3 * spring(lt, 'snappy'))); g.rotate(sw);
      B.shadowed(g, () => { g.beginPath(); g.moveTo(-70, -80); g.lineTo(70, -80); g.bezierCurveTo(70, 20, 30, 40, 0, 40); g.bezierCurveTo(-30, 40, -70, 20, -70, -80); g.closePath(); }, 'rgba(245,243,238,.35)', 0.2);
      g.save(); g.beginPath(); g.moveTo(-70, -80); g.lineTo(70, -80); g.bezierCurveTo(70, 20, 30, 40, 0, 40); g.bezierCurveTo(-30, 40, -70, 20, -70, -80); g.clip(); g.fillStyle = '#6A1E3A'; g.fillRect(-80, -34 + Math.sin(lt * 14) * 6, 160, 100); g.restore();
      clay(g, -8, 40, 16, 70, 4, 'rgba(245,243,238,.6)', { shadowK: 0.2 }); clay(g, -50, 106, 100, 12, 6, 'rgba(245,243,238,.6)', { shadowK: 0.2 }); g.restore();
    },
  });

  // ---------- plane / heart / mag (screen) ----------
  B.register('plane', {
    defaults: { dur: 1.9, from: [-420, 330], to: [440, -360], s: 2.2 }, size: () => [10, 10],
    draw(g, p, env) {
      const lt = env.lt, u = ease.out(lin(lt, 0, p.dur)), pos = k => [lerp(p.from[0], p.to[0], k), lerp(p.from[1], p.to[1], k) - Math.sin(Math.PI * k) * 150], [px, py] = pos(u), [qx, qy] = pos(Math.min(1, u + 0.02)), a = Math.atan2(qy - py, qx - px) || -0.6;
      g.save(); g.strokeStyle = rgba(env.theme.accent, 0.85); g.lineWidth = 6; g.lineCap = 'round'; g.setLineDash([2, 22]); g.beginPath(); for (let i = 0; i <= 30; i++) { const [x, y] = pos(u * i / 30); i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); g.setLineDash([]); g.restore();
      g.save(); g.translate(px, py); g.rotate(a); const s = p.s * (0.7 + 0.3 * spring(lt, 'snappy')); g.scale(s, s);
      g.shadowColor = 'rgba(2,4,9,.4)'; g.shadowBlur = 24; g.shadowOffsetY = 14; g.fillStyle = env.theme.paper; g.beginPath(); g.moveTo(70, 0); g.lineTo(-56, -38); g.lineTo(-30, 0); g.lineTo(-56, 38); g.closePath(); g.fill(); g.shadowColor = 'transparent';
      g.fillStyle = '#D8D3C7'; g.beginPath(); g.moveTo(70, 0); g.lineTo(-30, 0); g.lineTo(-56, 38); g.closePath(); g.fill(); g.fillStyle = 'rgba(255,255,255,.7)'; g.beginPath(); g.moveTo(70, 0); g.lineTo(-56, -38); g.lineTo(-30, -2); g.closePath(); g.fill(); g.strokeStyle = 'rgba(0,0,0,.25)'; g.lineWidth = 2; g.beginPath(); g.moveTo(70, 0); g.lineTo(-30, 0); g.stroke(); g.restore();
    },
  });
  B.register('heart', {
    defaults: { s: 1 }, size: () => [10, 10],
    draw(g, p, env) {
      const lt = env.lt, k = spring(lt, 'bouncy'), pulse = 1 + 0.3 * Math.max(0, Math.sin(lt * Math.PI * 2 / 0.4 - 0.4)) * (lt < 0.8 ? 1 : 0), sc = (0.4 + 0.6 * k) * pulse * p.s * 1.3, th = env.theme;
      g.save(); g.scale(sc, sc); const path = () => { g.beginPath(); g.moveTo(0, 62); g.bezierCurveTo(-120, -10, -78, -86, 0, -34); g.bezierCurveTo(78, -86, 120, -10, 0, 62); g.closePath(); };
      B.shadowed(g, path, th.bad, 0.2); g.save(); path(); g.clip(); const lg = g.createLinearGradient(0, -80, 0, 70); lg.addColorStop(0, 'rgba(255,255,255,.3)'); lg.addColorStop(0.4, 'rgba(255,255,255,0)'); lg.addColorStop(1, 'rgba(0,0,0,.22)'); g.fillStyle = lg; g.fillRect(-130, -90, 260, 170); g.restore();
      g.strokeStyle = th.paper; g.lineWidth = 8; path(); g.stroke(); g.restore(); burst(g, 0, 0, 90 * p.s, th.bad, lt - 0.05, 8, 0.4);
    },
  });
  B.register('mag', {
    defaults: { press: 0.5, from: [-170, 120] }, size: () => [10, 10],
    draw(g, p, env) {
      const lt = env.lt, u = ease.out(clamp(lt / 0.4)), dip = lt > p.press ? 0.14 * hit(lt - p.press, 9) : 0, th = env.theme, x = lerp(p.from[0], 70, u), y = lerp(p.from[1], 40, u);
      g.save(); g.translate(x, y); g.rotate(-0.25); g.scale(0.8 - dip, 0.8 - dip); g.fillStyle = 'rgba(245,243,238,.2)'; g.beginPath(); g.arc(0, 0, 58, 0, 7); g.fill(); g.strokeStyle = th.gold; g.lineWidth = 15; g.beginPath(); g.arc(0, 0, 58, 0, 7); g.stroke();
      g.strokeStyle = 'rgba(255,255,255,.55)'; g.lineWidth = 6; g.beginPath(); g.arc(0, 0, 40, 3.5, 4.6); g.stroke(); g.strokeStyle = th.ink; g.lineWidth = 18; g.lineCap = 'round'; g.beginPath(); g.moveTo(42, 42); g.lineTo(96, 100); g.stroke(); g.restore();
    },
  });

  // ---------- folder: closed case folder (the verdict is inside) ----------
  B.register('folder', {
    defaults: { w: 740, h: 860, q: 'WHAT DID IT COST HIM?' }, ownEnter: true, size: p => [p.w, p.h],
    anchors: p => ({ face: [0, 0, p.w, p.h * 0.7] }),
    draw(g, p, env) {
      const { lt, theme } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, sp = spring(Math.max(0, lt), 'snappy'); g.save(); g.scale(0.9 + 0.1 * sp, 0.9 + 0.1 * sp); g.rotate(-0.015);
      clay(g, x0 + 30, y0 - 56, 270, 80, 18, theme.manila, { shadowK: 0.4 }); clay(g, x0, y0, w, h, 26, theme.manila, { shadowK: 0.8 });
      g.strokeStyle = 'rgba(70,45,15,.3)'; g.lineWidth = 4; g.beginPath(); g.moveTo(x0 + 30, y0 + 130); g.lineTo(x0 + w - 30, y0 + 130); g.stroke();
      txt(g, 'CASE FILE', x0 + 165, y0 - 14, F.mono(28), theme.ink); txt(g, 'THE VERDICT', 0, y0 + 80, F.hero(80), theme.ink);
      g.save(); g.translate(0, 40); g.rotate(-0.04); paper(g, -300, -140, 600, 280, 16, { lift: 0.2 }); txt(g, p.q, 0, -40, F.hero(66), theme.ink); txt(g, 'SEALED', 0, 50, F.mono(30), theme.badInk); g.restore();
      g.restore();
    },
  });

  // =================== v3 (REBUILD-LONGER) recipes ===================
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

  // ---------- auction: generic auction scene (ILLUSTRATION): a lot bottle, paddles popping up, bids climbing ----------
  B.register('auction', {
    defaults: { w: 900, h: 780, bids: [99999, 99999, 99999], head: 'AUCTION' }, ownEnter: true, size: p => [p.w, p.h],
    anchors: p => ({ head: [0, -p.h / 2 + 65, p.w, 130], bottle: [0, -50, 300, 300], bars: [0, 220, p.w * 0.8, 230], pads: [0, -40, p.w * 0.95, 300] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, sp = spring(Math.max(0, lt), 'snappy');
      g.save(); g.scale(0.92 + 0.08 * sp, 0.92 + 0.08 * sp); g.globalAlpha *= clamp(lt / 0.08 + 0.4);
      paper(g, x0, y0, w, h, 26, { lift }); g.save(); rr(g, x0, y0, w, h, 26); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 130); g.restore();
      txt(g, p.head, x0 + 40, y0 + 66, F.hero(76), theme.paper, 'left'); txt(g, 'ILLUSTRATION', x0 + w - 28, y0 + 28, F.mono(15), 'rgba(245,243,238,.7)', 'right');
      g.save(); g.translate(0, -52); g.scale(0.38, 0.38); bottleBody(g, { dust: true }, theme, 0.1, () => labelDraw(g, { year: 'LOT' }, theme)); g.restore();
      const pad = (x, y, s, at, rot) => { if (t < at - 0.01) return; const k = spring(Math.max(0, t - at), 'bouncy'); g.save(); g.translate(x, y + (1 - k) * 260 * s); g.rotate(rot); g.scale(s, s);
        clay(g, -26, 20, 52, 250, 16, '#B9955A', { shadowK: 0.5 }); B.shadowed(g, () => { g.beginPath(); g.arc(0, -90, 125, 0, 7); }, theme.paper, 0.1); g.strokeStyle = theme.ink; g.lineWidth = 8; g.beginPath(); g.arc(0, -90, 108, 0, 7); g.stroke(); txt(g, 'BID', 0, -86, F.hero(96), theme.ink); g.restore(); };
      pad(-300, 10, 0.5, p.bids[0], -0.12); pad(300, -20, 0.5, p.bids[1], 0.1); pad(-170, 70, 0.42, p.bids[2], 0.05);
      const by = y0 + h - 140; g.strokeStyle = theme.rule; g.lineWidth = 4; g.beginPath(); g.moveTo(-250, by); g.lineTo(250, by); g.stroke();
      [[-150, 56, p.bids[0]], [0, 100, p.bids[1]], [150, 146, p.bids[2]]].forEach(([x, hh, at], i) => { const k = spring(Math.max(0, t - at), 'snappy'); if (t < at) return; clay(g, x - 45, by - hh * k, 90, hh * k, 10, i === 2 ? theme.good : theme.gold, { shadowK: 0.4 }); });
      txt(g, 'HIGHEST BID WINS THE BOTTLE', 0, by + 44, F.cap(30), theme.ink); txt(g, 'EXAMPLE BIDS · NO REAL PRICES', 0, by + 78, F.mono(15), theme.inkSoft);
      g.restore();
    },
  });

  // ---------- calendar: chips of $1,000 fill the days, the years counter rolls to 95 ----------
  B.register('calendar', {
    defaults: { w: 780, h: 900, at: 99999, dur: 1.7, yrsAt: 99999, yrsDur: 0.9, to: 95 }, ownEnter: true, size: p => [p.w, p.h],
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
      txt(g, 'OUR MATH: ≈$35M ÷ $1,000 A DAY ≈ 95 YEARS', 0, y0 + h - 34, F.mono(18), theme.inkSoft);
      g.restore();
    },
  });

  // ---------- factory: the 3-step "wine factory" diagram (PROSECUTORS SAID). rows light up at s1 / s2 / s3 ----------
  B.register('factory', {
    defaults: { w: 920, h: 920, s1: 99999, s2: 99999, s3: 99999, head: 'THE “WINE FACTORY”', sub: 'PROSECUTORS SAID · ILLUSTRATION', t1: 'MIX', d1: 'OLDER WINE + NEWER WINE', t2: 'REBOTTLE', d2: 'OLD BOTTLES · NEW CORKS + WAX', t3: 'LABEL', d3: 'THOUSANDS OF LABELS' }, ownEnter: true, size: p => [p.w, p.h],
    anchors: p => ({ head: [0, -p.h / 2 + 70, p.w, 140], r1: [0, -p.h / 2 + 270, p.w * 0.94, 210], r2: [0, -p.h / 2 + 500, p.w * 0.94, 210], r3: [0, -p.h / 2 + 730, p.w * 0.94, 210] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, sp = spring(Math.max(0, lt), 'snappy');
      g.save(); g.scale(0.92 + 0.08 * sp, 0.92 + 0.08 * sp); g.globalAlpha *= clamp(lt / 0.08 + 0.4);
      paper(g, x0, y0, w, h, 26, { lift }); g.save(); rr(g, x0, y0, w, h, 26); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 140); g.restore();
      txt(g, p.head, 0, y0 + 74, F.hero(70), theme.paper); txt(g, p.sub, 0, y0 + 120, F.mono(19), 'rgba(245,243,238,.8)');
      const rows = [[p.s1, p.t1, p.d1], [p.s2, p.t2, p.d2], [p.s3, p.t3, p.d3]];
      rows.forEach(([at, tt, dd], i) => { const cy = y0 + 270 + i * 230, on = t - at, k = spring(Math.max(0, on), 'snappy'), act = on > -0.01;
        g.fillStyle = theme.paperShade; rr(g, x0 + 36, cy - 90, w - 72, 180, 18); g.fill(); if (!act) { g.fillStyle = theme.rule; for (let j = 0; j < 2; j++) { rr(g, x0 + 200, cy - 20 + j * 40, (w - 440) * (j ? 0.6 : 0.9), 18, 8); g.fill(); } return; }
        g.save(); g.translate(0, (1 - k) * 22); g.globalAlpha *= clamp(on / 0.1 + 0.2);
        marker(g, x0 + 36, cy - 90, w - 72, 180, theme.gold, clamp(on / 0.35), 0.2);
        g.save(); g.translate(x0 + 110, cy); g.scale(0.5 + 0.5 * k, 0.5 + 0.5 * k); g.fillStyle = theme.badInk; g.beginPath(); g.arc(0, 0, 56, 0, 7); g.fill(); txt(g, String(i + 1), 0, 24, F.hero(76), theme.paper); g.restore();
        txt(g, tt, x0 + 190, cy - 18, F.hero(66), theme.ink, 'left'); txt(g, dd, x0 + 190, cy + 40, F.mono(22), theme.inkSoft, 'left');
        const ix = x0 + w - 170;
        if (i === 0) { const pk = clamp(on / 0.8); for (const [dx, col] of [[-52, '#8A5A2B'], [52, '#6A1E3A']]) { g.save(); g.translate(ix + dx, cy - 30); g.rotate(-Math.sign(dx) * 0.8 * Math.min(1, pk * 2)); clay(g, -26, -34, 52, 68, 12, col, { shadowK: 0.4 }); g.restore(); }
          g.fillStyle = '#5a1e34'; g.beginPath(); g.moveTo(ix - 40, cy + 6); g.lineTo(ix + 40, cy + 6); g.lineTo(ix + 26, cy + 60); g.lineTo(ix - 26, cy + 60); g.closePath(); g.fill();
          g.strokeStyle = '#6A1E3A'; g.lineWidth = 8; g.setLineDash([10, 8]); g.lineDashOffset = -on * 80; g.beginPath(); g.moveTo(ix + 24, cy - 8); g.lineTo(ix + 6, cy + 10); g.stroke(); g.beginPath(); g.moveTo(ix - 24, cy - 8); g.lineTo(ix - 6, cy + 10); g.stroke(); g.setLineDash([]); }
        else if (i === 1) { g.save(); g.translate(ix, cy + 6); g.scale(0.17, 0.17); B.shadowed(g, () => bpath(g), GLASS, 0.1); const ck = ease.out(clamp(on / 0.3)); clay(g, -26, lerp(-480, -340, ck), 52, 80, 12, '#B9955A', { shadowK: 0.3 }); if (on > 0.35) { g.fillStyle = RED; g.beginPath(); g.ellipse(0, -330, 56, 30, 0, 0, 7); g.fill(); } g.restore(); }
        else { for (let j = 0; j < 5; j++) { g.save(); g.translate(ix - 60 + j * 30, cy + 8); g.rotate((j - 2) * 0.22 * ease.out(clamp(on / 0.4))); paper(g, -28, -42, 56, 84, 5, { lift: 0.05 }); g.fillStyle = theme.ink; g.fillRect(-18, -26, 36, 5); g.fillRect(-18, -12, 26, 5); g.fillRect(-18, 2, 30, 5); g.restore(); } }
        g.restore(); });
      for (const yy of [y0 + 380 + 0, y0 + 610]) { g.fillStyle = theme.inkSoft; g.beginPath(); g.moveTo(-18, yy); g.lineTo(18, yy); g.lineTo(0, yy + 16); g.closePath(); g.fill(); }
      g.restore();
    },
  });

  // ---------- bgrid: $2.1 MILLION ÷ 219 BOTTLES = about $9,600 each (our math) ----------
  B.register('bgrid', {
    defaults: { w: 880, h: 920, at: 99999, dur: 1.5, valAt: 99999, valDur: 0.9 }, ownEnter: true, size: p => [p.w, p.h],
    anchors: p => ({ head: [0, -p.h / 2 + 70, p.w, 140], grid: [0, -40, p.w * 0.92, 420], each: [0, p.h / 2 - 200, p.w * 0.9, 220] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, sp = spring(Math.max(0, lt), 'snappy');
      g.save(); g.scale(0.92 + 0.08 * sp, 0.92 + 0.08 * sp); g.globalAlpha *= clamp(lt / 0.08 + 0.4); g.rotate(-0.01);
      paper(g, x0, y0, w, h, 26, { lift }); g.save(); rr(g, x0, y0, w, h, 26); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 130); g.restore();
      txt(g, '$2.1M ÷ 219 BOTTLES', 0, y0 + 80, F.hero(70), theme.paper); txt(g, 'ILLUSTRATION', x0 + w - 28, y0 + 24, F.mono(14), 'rgba(245,243,238,.75)', 'right');
      const cols = 20, rows = 11, cw = 39, ch = 39, gx = x0 + (w - cols * cw) / 2, gy = y0 + 160, N = 219, n = clamp(lin(t, p.at, p.at + p.dur)) * N;
      for (let i = 0; i < N; i++) { if (i >= n) { g.fillStyle = theme.paperShade; g.fillRect(gx + (i % cols) * cw + 13, gy + Math.floor(i / cols) * ch + 6, 12, 28); continue; }
        const cx = gx + (i % cols) * cw + cw / 2, cy = gy + Math.floor(i / cols) * ch + ch / 2, k = clamp((n - i) / 8); g.save(); g.translate(cx, cy); g.scale(0.5 + 0.5 * k, 0.5 + 0.5 * k); g.fillStyle = i === N - 1 ? theme.badInk : GLASS; rr(g, -9, -4, 18, 24, 5); g.fill(); g.fillRect(-4, -18, 8, 16); g.fillStyle = RED; g.fillRect(-5, -20, 10, 5); g.restore(); }
      const mt = t - p.valAt; txt(g, 'EACH ≈', 0, y0 + h - 270, F.cap(34), theme.inkSoft);
      if (mt > -0.01) { const o = { font: F.hero(140), size: 140, color: theme.ink, prefix: '$', speed: mt < p.valDur ? 9600 / p.valDur * 0.4 : 0 }, v = countAt(Math.max(0, mt), p.valDur, 0, 9600), land = mt - p.valDur, nw = B.rollWidth(g, 9600, o).w, s = 1 + (land > 0 ? 0.14 * hit(land, 6) : 0);
        g.save(); g.translate(0, y0 + h - 150); g.scale(s, s); roll(g, v, -nw / 2, 0, { ...o, align: 'left', color: theme.badInk }); if (land > 0) marker(g, -nw / 2, 18, nw, 9, theme.badInk, clamp(land / 0.3), 0.9); g.restore(); burst(g, 0, y0 + h - 150, 300, theme.bad, land, 18, 0.55); }
      txt(g, 'OUR MATH: $2.1 MILLION ÷ 219 ≈ $9,600', 0, y0 + h - 34, F.mono(18), theme.inkSoft);
      g.restore();
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
// ===== Bad Math engine v2 — crime-show HUD (beat label pill + live number chip), screen layer =====
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, countAt, hash, hit } = B;
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
// YouTube cut v3 (chronological). World: row0 hook(0,0) board(1800,0) auction(3600,0) sale(5400,0) · row1 calendar(5400,1800) record(3600,1800) lot(1800,1800) timeline(0,1800) · row2 door(0,3600) bench(1800,3600) factory(3600,3600) cheque(5400,3600) · folder/verdict(5400,5400)
const SB = 'side-by-side', GH = 'graphic-hero', ZN = 'zoom-on-number', PF = 'presenter-front', PK = 'peek';
const ICE = 'brand/photos/rudy-kurniawan/2.jpg', KIT = 'brand/photos/rudy-kurniawan/3.jpg';
BM2.scene({
  series: 'decoded', title: 'CASE FILE Nº 027 · KURNIAWAN', duration: 86.5,
  footnote: ['CONVICTED 2013 · 10 YEARS · $28.4M BACK · SOURCES: DOJ SDNY · TRIAL REPORTS', 'ILLUSTRATIONS: BOTTLE, LABELS, AUCTION, BENCH, CATALOGUE, WINEMAKER (GENERIC)', 'PHOTOS: U.S. ICE; U.S. GOVERNMENT TRIAL EXHIBIT · PUBLIC DOMAIN VIA WIKIMEDIA COMMONS'],
  elements: [
    // ---- S0 frame 0 ----
    { id: 'hook', type: 'text', at: [0, -430], in: -1, props: { lines: [[['COLLECTORS PAID', 'paper']], [['MILLIONS', 'gold']], [['BOTTLED AT HOME', 'bad']]], size: 80, per: 0 } },
    { id: 'sus0', type: 'suspect', at: [-205, 15], in: -1, props: { src: ICE, crop: [0.12, 0, 0.76, 1], fx: 0.5, fy: 0.3, aspect: 1.0, w: 380, name: 'RUDY KURNIAWAN', nick: '“THE COLLECTOR”', flash: false, tilt: -0.02, stamps: [{ text: 'FRAUD', at: -0.3, size: 70, x: 0, y: 70, rot: -0.1 }] } },
    { id: 'kit0', type: 'photo', at: [225, 50], in: -1, props: { src: KIT, name: '', credit: 'U.S. GOVERNMENT TRIAL EXHIBIT · PUBLIC DOMAIN', treatment: 'paper', w: 400, aspect: 0.68, fx: 0.5, fy: 0.5, tilt: 0.035, tape: true } },
    // ---- S1 case board ----
    { id: 'tag', type: 'suspect', at: [1560, 20], in: '@wait-0.35', props: { src: ICE, crop: [0.12, 0, 0.76, 1], fx: 0.5, fy: 0.3, aspect: 1.0, variant: 'card', file: true, caseNo: 'CASE FILE Nº 027', w: 450, name: 'RUDY KURNIAWAN', nick: '“THE COLLECTOR”', tag: 'WINE COLLECTOR · CALIFORNIA', credit: 'U.S. ICE · PUBLIC DOMAIN', tilt: -0.03, push: { at: '@wait', dur: 5.5, to: 1.5 }, stringTo: [640, 330], stringAt: '@a-0.4', ring: '@rudy+0.2' } },
    { id: 'wc', type: 'text', at: [2190, 40], in: '@a-0.1', props: { lines: [[['WINE', 'paper']], [['COLLECTOR', 'gold']], [['CALIFORNIA', 'paper']]], size: 84 } },
    // ---- S2 auction ----
    { id: 'auc', type: 'auction', at: [3600, 0], in: '@rare-0.4', props: { bids: ['@bid', '@against', '@other'] } },
    { id: 'vcol', type: 'victim', at: [4560, 40], in: '@rich-0.3', props: { kind: 'collector', label: 'THE COLLECTORS', sub: 'RICH BIDDERS', w: 320, h: 420, tape: 'BUYERS', reactAt: '@bid', labelSize: 32 } },
    // ---- S3 sale ----
    { id: 'gav', type: 'gavel', at: [5240, -300], in: '@2006-0.4', props: { at: '@2006' } },
    { id: 'cellar', type: 'counter', at: [5400, 90], in: '@2006-0.3', props: { label: 'HIS COLLECTION SOLD', sub: '2006 · 2 AUCTIONS', to: 35, prefix: '≈$', suffix: ' MILLION', at: '@$35', dur: 1.0, tone: 'good', size: 120, w: 800 } },
    // ---- S4 calendar ----
    { id: 'cal', type: 'calendar', at: [5400, 1800], in: "@that's-0.4", props: { at: "@that's", dur: 1.5, yrsAt: '@for#4', yrsDur: 0.9 } },
    // ---- S5 record ----
    { id: 'sus7', type: 'suspect', at: [3650, 1840], in: '@one#2-0.3', props: { src: ICE, crop: [0.12, 0, 0.76, 1], fx: 0.5, fy: 0.3, aspect: 1.0, variant: 'side', noquote: true, w: 980, pw: 420, aspect: 1.1, name: 'RUDY KURNIAWAN', nick: '“THE COLLECTOR”', quote: [['WORLD', 'bad'], ['RECORD', 'bad']], quoteAt: '@record-0.4', quoteSize: 96, quoteSub: 'ONE OF HIS SALES', tilt: 0.0, push: { at: '@one#2', dur: 3.5, to: 1.45 }, stamps: [{ text: 'WORLD RECORD', at: '@record', size: 56, x: -190, y: 170, rot: -0.1 }] } },
    // ---- S6 catalogue / winemaker ----
    { id: 'lot', type: 'lotpage', at: [1650, 1800], in: '@then-0.4', props: { yearAt: '@1945' } },
    { id: 'vwm', type: 'victim', at: [2330, 1850], rot: -0.03, in: '@winemaker-0.3', props: { kind: 'winemaker', label: 'THE WINEMAKER', sub: 'HIS NAME ON THE LABEL', w: 340, h: 440, tape: 'WITNESS', reactAt: '@objected', labelSize: 34 } },
    { id: 'wd', type: 'stamp', at: [1720, 2090], rot: -0.1, in: '@objected', props: { text: 'WITHDRAWN', tone: 'bad', size: 84 } },
    // ---- S7 timeline ----
    { id: 'tl2', type: 'wintl', at: [0, 1800], in: '@family-0.5', props: { headNote: "THE WINE'S TIMELINE", firstAt: '@1982', axisAt: '@family', bracketAt: '@37', sub: 'HIS FAMILY STARTED IN 1982 · TRIAL TESTIMONY' } },
    // ---- S8 arrest ----
    { id: 'sus8', type: 'suspect', at: [0, 3600], in: '@2012-0.3', props: { src: ICE, crop: [0.12, 0, 0.76, 1], fx: 0.5, fy: 0.3, aspect: 1.0, w: 470, name: 'RUDY KURNIAWAN', nick: '“THE COLLECTOR”', tilt: 0.02, mono: true, heights: '@2012+0.4', push: { at: '@2012', dur: 3.5, to: 1.3 }, stamps: [{ text: 'ARRESTED', at: '@arrested', size: 66, x: 0, y: 20, rot: -0.1 }] } },
    // ---- S9 bench + kitchen photo ----
    { id: 'kit', type: 'photo', at: [1800, 3008], in: '@prosecutors-0.1', props: { src: KIT, name: '', credit: 'U.S. GOVERNMENT TRIAL EXHIBIT · PUBLIC DOMAIN', treatment: 'paper', w: 460, aspect: 0.68, fx: 0.5, fy: 0.5, tilt: 0.025 } },
    { id: 'bench', type: 'bench', at: [1800, 3600], in: '@prosecutors-0.3', props: { tagAt: '@prosecutors', tag: 'PROSECUTORS: “WINE FACTORY”', printAt: '@factory', printDur: 1.4 } },
    // ---- S10 the three steps ----
    { id: 'fac', type: 'factory', at: [3600, 3600], in: '@worked-0.3', props: { s1: '@first', s2: '@then#2', s3: '@then#3' } },
    // ---- S11 cheque ----
    { id: 'chq', type: 'cheque', at: [5400, 3660], in: '@billionaire-0.3', props: { amount: '$2.1 MILLION', top: 'PAID BY A BILLIONAIRE', note: 'HE TOLD THE JURY' } },
    { id: 'vbill', type: 'victim', at: [4790, 3720], in: '@billionaire-0.3', props: { kind: 'billionaire', label: 'THE BILLIONAIRE', sub: 'TOLD THE JURY', w: 340, h: 440, reactAt: '@fakes', labelSize: 34 } },
    { id: 'fk', type: 'text', at: [5400, 3120], in: '@fakes-0.25', props: { lines: [[['“FAKES”', 'bad']]], size: 110 } },
    // ---- S12 folder -> verdict ----
    { id: 'brd', type: 'board', at: [5400, 5400], in: '@what-0.4', out: '@convicted-0.02', props: { title: 'EVIDENCE BOARD', caseNo: 'CASE FILE Nº 027', tightAt: '@2013', items: [
      { id: 'ph', k: 'photo', src: ICE, crop: [0.12, 0, 0.76, 1], fx: 0.5, fy: 0.3, x: 0, y: -300, w: 330, h: 390, name: 'RUDY KURNIAWAN', nameSize: 26, at: '@what-0.1', rot: -0.02, push: 0.3 },
      { id: 'kt', k: 'photo', src: KIT, x: -290, y: 80, w: 390, h: 300, name: '', at: '@what+0.5', rot: -0.04 },
      { id: 'bt', k: 'note', x: 70, y: 90, w: 220, h: 290, icon: 'bottle', size: 28, lines: [['MIXED WINE', 'bad']], at: '@what+0.8', rot: 0.03 },
      { id: 'lb', k: 'note', x: 310, y: 100, w: 230, h: 290, icon: 'labels', size: 26, lines: [['THOUSANDS', 'ink'], ['OF LABELS', 'bad']], at: '@what+1.1', rot: 0.05 },
      { id: 'ck', k: 'note', x: -200, y: 410, w: 360, h: 270, icon: 'cheque', iconS: 130, size: 54, lines: [['$2.1M', 'bad']], at: '@follow-0.3', rot: -0.03, stamp: { text: 'JURY HEARD', at: '@follow', y: 70, size: 28, rot: -0.05 } },
      { id: 'cv', k: 'note', x: 210, y: 410, w: 360, h: 270, size: 60, lines: [['CONVICTED', 'bad', 48], ['2013', 'ink', 90]], at: '@2013-0.2', rot: 0.03 } ],
      strings: [[0, 1, '@what+0.7'], [0, 2, '@what+1.0'], [0, 3, '@what+1.3'], [1, 4, '@follow'], [2, 4, '@follow+0.1'], [3, 4, '@follow+0.2'], [0, 5, '@2013'], [4, 5, '@2013+0.2']] } },
    { id: 'sv', type: 'suspect', at: [4990, 5400], in: '@convicted-0.1', props: { src: ICE, crop: [0.12, 0, 0.76, 1], fx: 0.5, fy: 0.3, aspect: 1.0, w: 440, name: 'RUDY KURNIAWAN', nick: '“THE COLLECTOR”', tilt: -0.02, mono: true, push: { at: '@convicted', dur: 3.6, to: 1.4 }, stamps: [{ text: 'CONVICTED', at: '@convicted', size: 54, x: 0, y: -10, rot: -0.1 }], bars: '@10' } },
    { id: 'verdict', type: 'wverdict', at: [5760, 5400], scale: 0.8, in: '@convicted-0.1', props: { convAt: '@convicted', yearsAt: '@10', payAt: '@$28' } },
    // ---- screen micro-moments ----
    { id: 'tw', type: 'text', layer: 'screen', at: [540, 365], in: '@wait', out: '@name', props: { lines: [[['WAIT, WHO IS HE?', 'paper']]], size: 76 } },
    { id: 'pip1', type: 'suspect', layer: 'screen', at: [880, 1130], in: '@then+0.3', out: '@send-0.25', props: { src: ICE, crop: [0.12, 0, 0.76, 1], fx: 0.5, fy: 0.3, aspect: 1.0, variant: 'pip', w: 200, label: 'HIS LABELS', tilt: 0.03, arrow: { at: '@then+0.6', to: [-400, -330] } } },
    { id: 'dc1', type: 'datecard', layer: 'screen', at: [340, 480], in: '@name', out: '@a+0.5', props: { kicker: 'CASE FILE Nº 027 · THE PITCH', big: 'CALIFORNIA', small: 'WINE COLLECTOR · 2006' } },
    { id: 'dc3', type: 'datecard', layer: 'screen', at: [340, 480], in: '@then-0.1', out: '@then+1.4', props: { kicker: 'NEW YORK AUCTION', big: 'APRIL 2008', small: 'THE LABEL TRICK' } },
    { id: 'dc4', type: 'datecard', layer: 'screen', at: [340, 480], in: '@2012-0.2', out: '@arrested+1.2', props: { kicker: 'THE CATCH', big: 'ARRESTED', small: 'AT HOME · 2012 · PER DOJ' } },
    { id: 'dc5', type: 'datecard', layer: 'screen', at: [340, 480], in: '@2013-0.1', out: '@convicted+0.3', props: { kicker: 'FEDERAL COURT · SDNY', big: 'THE VERDICT', small: 'PER DOJ' } },
    { id: 'hud', type: 'hud', layer: 'screen', at: [0, 0], in: -1, props: { labels: [{ at: -1, text: 'THE PITCH' }, { at: '@then-0.25', text: 'THE LABEL TRICK' }, { at: '@2012-0.25', text: 'THE CATCH' }, { at: '@worked-0.3', text: 'THE FACTORY' }, { at: '@what-0.2', text: 'THE SENTENCE' }], items: [{ at: '@$35', label: 'COLLECTION SOLD (2006)', from: 0, to: 35, dur: 1.0, prefix: '≈$', suffix: 'M' }, { at: '@37', label: 'LABEL OLDER THAN WINE', from: 0, to: 37, dur: 0.8, suffix: ' YEARS' }, { at: '@10', label: 'YEARS IN PRISON', from: 0, to: 10, dur: 0.7 }] } },
    { id: 'auct', type: 'text', layer: 'screen', at: [540, 400], in: '@gets+0.1', out: '@where', props: { lines: [[['WHAT’S AN AUCTION?', 'gold']]], size: 70 } },
    { id: 'club', type: 'text', layer: 'screen', at: [540, 400], in: '@hit+0.1', out: '@hit+1.6', props: { lines: [[['$12 CLUB', 'gold']]], size: 84 } },
    { id: 'sb', type: 'bottle', layer: 'screen', at: [790, 1090], scale: 0.46, in: '@hit', out: '@hit+1.6', props: { sticker: '$12', screw: true, dust: false } },
    { id: 'heart', type: 'heart', layer: 'screen', at: [800, 830], in: '@like-0.05', out: '@like+1.15', props: { s: 1 } },
    { id: 'gl', type: 'glass', layer: 'screen', at: [330, 1190], in: '@send-0.1', out: '@send+1.25', props: { s: 0.8 } },
    { id: 'plane', type: 'plane', layer: 'screen', at: [540, 960], in: '@send-0.05', out: '@send+1.2', props: { dur: 0.9, from: [-230, 250], to: [280, -330], s: 1.5 } },
    { id: 'sendtx', type: 'text', layer: 'screen', at: [820, 400], in: '@send+0.15', out: '@send+1.2', props: { lines: [[['SEND', 'gold']]], size: 70 } },
    { id: 'how', type: 'text', layer: 'screen', at: [540, 400], in: '@and#1+0.0', out: '@first-0.2', props: { lines: [[['HOW IT WORKED', 'gold']]], size: 76 } },
    { id: 'mag', type: 'mag', layer: 'screen', at: [830, 1010], in: '@follow-0.05', out: '@follow+1.45', props: { press: 0.5 } },
    { id: 'btn', type: 'follow', layer: 'screen', at: [830, 1010], scale: 0.8, in: '@follow-0.05', out: '@follow+1.45', props: { press: 0.5 } },
    { id: 'ask', type: 'bubble', layer: 'screen', at: [600, 1090], in: '@would', out: '@wine#10+0.7', props: { l1: 'WOULD YOU HAVE', l2: 'PAID?', size: 54, tail: 'left' } },
  ],
  beats: [
    { at: 0, beat: SB, focus: ['hook', 'sus0', 'kit0'], sx: 540, sy: 870, fill: 0.98, maxH: 900, st: { x: 925, y: 1395, s: 0.85 }, pose: 'shock' },
    { at: '@millions', beat: ZN, focus: 'hook', fill: 0.86, maxH: 600, sy: 720, st: 'corner', pose: 'shock', dur: 0.45 },
    { at: '@bottled', beat: SB, focus: 'kit0', fill: 0.85, maxH: 900, sy: 830, st: 'corner-left', pose: 'point', dur: 0.8 },
    { at: '@wait', beat: SB, focus: 'tag', move: 'whip', sx: 540, sy: 960, fill: 0.62, maxH: 680, st: { x: 930, y: 1390, s: 0.85 }, pose: 'shock' },
    { at: '@rudy', beat: ZN, focus: 'tag', fill: 0.62, maxH: 680, sy: 960, st: { x: 930, y: 1390, s: 0.85 }, pose: 'point', dur: 0.45 },
    { at: '@a', beat: SB, focus: ['tag', 'wc'], sx: 540, sy: 790, fill: 0.95, maxH: 1100, st: 'corner', pose: 'point', dur: 0.8 },
    { at: '@rare', beat: SB, focus: 'auc', move: 'whip', sx: 540, sy: 880, fill: 0.8, maxH: 820, st: 'left', pose: 'point' },
    { at: '@auctions', beat: ZN, focus: 'auc.head', fill: 0.8, maxH: 300, sy: 560, st: 'corner', pose: 'point', dur: 0.45 },
    { at: '@rich', beat: PK, focus: ['auc', 'vcol'], fill: 0.95, maxH: 820, sy: 880, pose: 'point', dur: 0.8 },
    { at: '@bid', beat: ZN, focus: 'auc.pads', fill: 0.9, maxH: 420, sy: 800, st: 'corner-left', pose: 'shock', dur: 0.45 },
    { at: '@other', beat: GH, focus: 'auc.bars', fill: 0.8, maxH: 420, sy: 800, st: 'corner-left', dur: 0.6 },
    { at: '@bottle', beat: ZN, focus: 'auc.bottle', fill: 0.5, maxH: 600, sy: 790, st: 'corner', pose: 'point', dur: 0.5 },
    { at: '@2006', beat: SB, focus: ['gav', 'cellar'], move: 'whip', sx: 540, sy: 790, fill: 0.88, maxH: 1100, st: 'corner-left', pose: 'point' },
    { at: '@$35', beat: ZN, focus: 'cellar.value', fill: 0.78, maxH: 520, sy: 800, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@million', beat: GH, focus: ['gav', 'cellar'], sy: 790, fill: 0.9, maxH: 1100, st: 'corner-left', dur: 0.7 },
    { at: "@that's", beat: SB, focus: 'cal', move: 'whip', sx: 540, sy: 880, fill: 0.78, maxH: 850, st: 'left', pose: 'point' },
    { at: '@000', beat: ZN, focus: 'cal.head', fill: 0.8, maxH: 300, sy: 560, st: 'corner', pose: 'point', dur: 0.45 },
    { at: '@for#4', beat: ZN, focus: 'cal.years', fill: 0.8, maxH: 420, sy: 850, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@years+0.2', beat: GH, focus: 'cal', sy: 880, fill: 0.8, maxH: 850, st: 'corner-left', dur: 0.8 },
    { at: '@hit', beat: PF, focus: 'cal', sy: 760, pose: 'talk' },
    { at: '@12', beat: PF, focus: 'cal', sy: 760, zoom: 1.08, pose: 'you', dur: 0.4 },
    { at: '@one#2', beat: SB, focus: 'sus7', move: 'whip', sx: 540, sy: 880, fill: 0.9, maxH: 780, st: 'corner', pose: 'point' },
    { at: '@record', beat: ZN, focus: 'sus7', fill: 0.9, maxH: 780, sy: 880, st: 'corner', pose: 'shock', dur: 0.45 },
    { at: '@then', beat: SB, focus: 'lot', move: 'whip', sx: 540, sy: 880, fill: 0.66, maxH: 800, st: 'right', pose: 'point' },
    { at: '@french', beat: GH, focus: 'lot', sy: 880, fill: 0.7, maxH: 800, st: 'corner', dur: 0.7 },
    { at: '@1945', beat: ZN, focus: 'lot.year', fill: 0.4, maxH: 520, sy: 840, st: 'corner', pose: 'shock', dur: 0.5 },
    { at: '@but', beat: SB, focus: ['lot', 'vwm', 'wd'], sx: 540, sy: 880, fill: 0.92, maxH: 900, st: 'corner', pose: 'point', dur: 0.8 },
    { at: '@objected', beat: ZN, focus: 'wd', fill: 0.62, maxH: 520, sy: 790, st: 'corner', pose: 'shock', dur: 0.4 },
    { at: '@family', beat: GH, focus: 'tl2', move: 'whip', sx: 560, sy: 800, fill: 0.78, maxH: 1000, st: 'corner-left', pose: 'point' },
    { at: '@1982', beat: ZN, focus: 'tl2.first', fill: 0.9, maxH: 700, sy: 780, st: 'corner', pose: 'shock', dur: 0.45 },
    { at: '@so', beat: GH, focus: 'tl2', sy: 800, fill: 0.8, maxH: 1000, st: 'corner-left', dur: 0.7 },
    { at: '@37', beat: ZN, focus: 'tl2.bracket', fill: 0.62, maxH: 700, sy: 950, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@older', beat: PK, focus: 'tl2', fill: 0.8, sy: 880, pose: 'talk', dur: 0.8 },
    { at: '@send', beat: PF, focus: 'tl2', sy: 770, pose: 'talk' },
    { at: '@sniffs', beat: PF, focus: 'tl2', sy: 770, zoom: 1.0, pose: 'shrug', dur: 0.6 },
    { at: '@2012', beat: GH, focus: 'sus8', move: 'whip', sx: 540, sy: 960, fill: 0.62, maxH: 700, st: 'corner', pose: 'shock' },
    { at: '@arrested', beat: ZN, focus: 'sus8', fill: 0.62, maxH: 700, sy: 960, st: 'corner', pose: 'shock', dur: 0.5 },
    { at: '@prosecutors', beat: SB, focus: ['bench', 'kit'], move: 'whip', sx: 540, sy: 905, fill: 0.92, maxH: 880, st: 'corner-left', pose: 'point', dur: 0.9 },
    { at: '@factory', beat: ZN, focus: 'bench.tag', fill: 0.5, maxH: 300, sy: 700, st: 'corner-left', pose: 'shock', dur: 0.45 },
    { at: '@and#1', beat: PK, focus: ['bench', 'kit'], fill: 0.9, maxH: 880, sy: 905, pose: 'talk', dur: 0.8 },
    { at: '@worked-0.2', beat: GH, focus: 'fac', move: 'whip', sx: 540, sy: 870, fill: 0.78, maxH: 820, st: 'left', pose: 'point' },
    { at: '@first', beat: ZN, focus: 'fac.r1', fill: 0.9, maxH: 420, sy: 900, st: 'corner', pose: 'point', dur: 0.5 },
    { at: '@then#2', beat: ZN, focus: 'fac.r2', fill: 0.75, maxH: 420, sy: 820, st: 'corner-left', pose: 'point', dur: 0.5 },
    { at: '@wax', beat: PK, focus: 'fac', fill: 0.75, maxH: 820, sy: 870, pose: 'talk', dur: 0.8 },
    { at: '@then#3', beat: ZN, focus: 'fac.r3', fill: 0.62, maxH: 420, sy: 900, st: 'corner', pose: 'point', dur: 0.5 },
    { at: '@thousands', beat: ZN, focus: 'fac.r3', fill: 0.7, maxH: 320, sy: 900, st: 'corner-left', pose: 'shock', dur: 0.45 },
    { at: '@labels#2+0.2', beat: GH, focus: 'fac', sy: 870, fill: 0.78, maxH: 820, st: 'corner', dur: 0.8 },
    { at: '@billionaire', beat: SB, focus: ['chq', 'vbill'], move: 'whip', sx: 540, sy: 820, fill: 0.95, maxH: 1000, st: 'left', pose: 'point' },
    { at: '@$2', beat: ZN, focus: 'chq.amount', fill: 0.86, maxH: 520, sy: 800, st: 'corner', pose: 'shock', dur: 0.45 },
    { at: '@fakes', beat: GH, focus: ['chq', 'fk', 'vbill'], sy: 850, fill: 0.9, maxH: 1200, st: 'corner-left', dur: 0.7 },
    { at: '@what', beat: SB, focus: 'brd', move: 'whip', sx: 540, sy: 790, fill: 0.7, maxH: 960, st: 'left', pose: 'point' },
    { at: '@follow', beat: GH, focus: 'brd', sy: 790, fill: 0.7, maxH: 960, st: 'corner-left', dur: 0.8 },
    { at: '@verdicts', beat: PF, focus: 'brd', sy: 790, pose: 'talk', dur: 0.6 },
    { at: '@2013', beat: ZN, focus: 'brd', fill: 0.9, maxH: 900, sy: 790, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@convicted', beat: ZN, focus: ['sv', 'verdict.conv'], fill: 0.92, maxH: 900, sy: 880, st: 'corner', pose: 'shock', dur: 0.4 },
    { at: '@10', beat: ZN, focus: ['sv', 'verdict.years'], fill: 0.92, maxH: 900, sy: 880, st: 'corner', pose: 'shock', dur: 0.45 },
    { at: '@back', beat: GH, focus: ['sv', 'verdict'], fill: 0.94, maxH: 900, sy: 880, st: 'corner', pose: 'idle', dur: 0.8 },
    { at: '@$28', beat: ZN, focus: ['sv', 'verdict.pay'], fill: 0.92, maxH: 900, sy: 900, rot: 0.02, st: { x: 140, y: 1500, s: 0.85 }, pose: 'shock', dur: 0.45 },
    { at: '@million#3+0.9', beat: 'pull-back', focus: ['sv', 'verdict'], fill: 0.94, maxH: 900, sy: 880, st: 'corner', pose: 'idle' },
    { at: '@would', beat: PF, focus: ['sv', 'verdict'], sy: 860, pose: 'talk' },
    { at: '@wine#10+0.75', beat: SB, focus: ['hook', 'sus0', 'kit0'], move: 'whip', sx: 540, sy: 870, fill: 0.98, maxH: 900, st: { x: 925, y: 1395, s: 0.85 }, pose: 'shock' },
  ],
  poses: [['@follow-0.1', 'follow', { target: [830, 1010] }], ['@follow+1.5', 'talk']],
  shakes: [[0.05, 14], ['@2006', 8], ['@set', 8], ['@1982', 12], ['@convicted', 18], ['@10', 12], ['@$28', 14]],
  captions: {
    gap: 16,
    emph: { '$35': 'good', '$35.': 'good', 'million': 'good', '95': 'bad', '$12': 'accent', '1945.': 'bad', '1982.': 'bad', '37': 'bad', FBI: 'accent', convicted: 'bad', '10': 'bad', '$28': 'bad', fakes: 'bad', fraud: 'bad' },
    fix: [['Rudy Kernioan,', 'Rudy Kurniawan,'], ['costs 12', 'costs $12'], ["That's 1,000", "That's $1,000"]],
  },
  bed: { name: 'jazz_bed_1', gain: -1 },
  sfx: [
    { at: 0.05, name: 'camera_shutter_1', gain: -12, dur: 0.4 }, { at: '@wait', name: 'camera_shutter_2', gain: -12, dur: 0.4 }, { at: '@one#2', name: 'camera_shutter_1', gain: -12, dur: 0.4 }, { at: '@then', name: 'typewriter_2', gain: -12, dur: 0.8 }, { at: '@2012', name: 'camera_shutter_2', gain: -12, dur: 0.4 }, { at: '@arrested', name: 'rubber_stamp_2', gain: -9, dur: 0.5 }, { at: '@what-0.1', name: 'camera_shutter_1', gain: -12, dur: 0.4 }, { at: '@follow', name: 'paper_slam_1', gain: -12, dur: 0.4 }, { at: '@2013-0.2', name: 'typewriter_1', gain: -12, dur: 0.7 }, { at: '@convicted', name: 'camera_shutter_2', gain: -12, dur: 0.4 }, { at: '@10', name: 'cell_door_1', gain: -10, dur: 0.9 }, { at: '@worked-0.2', name: 'suspense_drone_1', gain: -14, dur: 3.0 },
    { at: 0, name: 'deep_boom_2', gain: -3, dur: 0.5 }, { at: 0.04, name: 'rubber_stamp_2', gain: -7, dur: 0.5 }, { at: 0.1, name: 'thud_1', gain: -9, dur: 0.4 },
    { at: '@wait', name: 'record_scratch_stop_1', gain: -12, dur: 0.6 }, { at: '@wait+0.3', name: 'paper_slam_2', gain: -10, dur: 0.5 },
    { at: '@rare', name: 'swipe_2', gain: -12, dur: 0.4 }, { at: '@bid', name: 'pop_2', gain: -9, dur: 0.3 }, { at: '@against', name: 'pop_2', gain: -10, dur: 0.3 }, { at: '@other', name: 'pop_2', gain: -9, dur: 0.3 },
    { at: '@2006', name: 'gavel_1', gain: -6, dur: 0.8 }, { at: '@$35', name: 'money_counter_2', gain: -10, dur: 1.2 }, { at: '@$35+1.0', name: 'ding_2', gain: -8, dur: 0.7 },
    { at: "@that's", name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@for#4', name: 'money_counter_2', gain: -12, dur: 0.9 }, { at: '@years+0.2', name: 'cash_register_1', gain: -10, dur: 0.9 },
    { at: '@like', name: 'heartbeat_1', gain: -8, dur: 0.9 },
    { at: '@set', name: 'gavel_2', gain: -6, dur: 0.8 }, { at: '@record', name: 'rubber_stamp_2', gain: -5, dur: 0.5 },
    { at: '@then', name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@1945', name: 'pop_2', gain: -9, dur: 0.3 }, { at: '@1945', name: 'ding_2', gain: -10, dur: 0.7 },
    { at: '@winemaker', name: 'swipe_2', gain: -12, dur: 0.4 }, { at: '@objected', name: 'rubber_stamp_2', gain: -4, dur: 0.5 }, { at: '@objected', name: 'deep_boom_2', gain: -9, dur: 0.36 },
    { at: '@family', name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@1982', name: 'rubber_stamp_2', gain: -5, dur: 0.5 }, { at: '@1982', name: 'deep_boom_1', gain: -6, dur: 1.2 }, { at: '@37', name: 'rubber_stamp_2', gain: -6, dur: 0.5 },
    { at: '@send', name: 'swoosh_2', gain: -9, dur: 1.0 },
    { at: '@2012', name: 'door_slam_1', gain: -8, dur: 0.6 }, { at: '@prosecutors', name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@factory', name: 'typewriter_1', gain: -12, dur: 1.4 },
    { at: '@first', name: 'pop_1', gain: -9, dur: 0.4 }, { at: '@then#2', name: 'click_1', gain: -8, dur: 0.3 }, { at: '@then#3', name: 'paper_slam_2', gain: -9, dur: 0.5 }, { at: '@thousands', name: 'typewriter_1', gain: -11, dur: 1.2 },
    { at: '@billionaire', name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@$2', name: 'money_counter_2', gain: -11, dur: 0.8 }, { at: '@fakes', name: 'rubber_stamp_2', gain: -7, dur: 0.5 },
    { at: '@what', name: 'swipe_2', gain: -11, dur: 0.4 }, { at: '@follow+0.5', name: 'click_1', gain: -8, dur: 0.3 }, { at: '@follow+0.58', name: 'success_chime_1', gain: -12, dur: 1.0 },
    { at: '@convicted-0.9', name: 'riser_2', gain: -14, dur: 0.9 }, { at: '@convicted', name: 'gavel_1', gain: -3, dur: 0.8 }, { at: '@convicted', name: 'cinematic_hit_1', gain: -3, dur: 1.2 }, { at: '@convicted', name: 'deep_boom_1', gain: -3, dur: 1.4 },
    { at: '@10', name: 'rubber_stamp_2', gain: -5, dur: 0.5 }, { at: '@10', name: 'cell_door_1', gain: -8, dur: 1.0 },
    { at: '@$28', name: 'money_counter_2', gain: -10, dur: 0.9 }, { at: '@$28+0.9', name: 'cash_register_1', gain: -8, dur: 0.9 },
    { at: '@would', name: 'pop_1', gain: -9, dur: 0.5 }, { at: '@wine#10+0.75', name: 'rewind_2', gain: -11, dur: 0.7 },
  ],
});
