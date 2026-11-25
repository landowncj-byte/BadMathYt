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
// TikTok cut v3 (mystery-first). World: cheque(0,0) seller(1800,0) auction(3600,0) sale(5400,0) · calendar(5400,1800) record(3600,1800) bench+kit(1800,1800) factory(0,1800) · scorecard(0,3600) catalogue+winemaker(1800,3600) timeline(3600,3600) verdict(5400,3600)
const SB = 'side-by-side', GH = 'graphic-hero', ZN = 'zoom-on-number', PF = 'presenter-front', PK = 'peek';
const ICE = 'brand/photos/rudy-kurniawan/2.jpg', KIT = 'brand/photos/rudy-kurniawan/3.jpg';
BM2.scene({
  series: 'decoded', title: 'CASE: KURNIAWAN · 2013', duration: 89.69,
  footnote: ['CONVICTED 2013 · 10 YEARS · $28.4M BACK · SOURCES: DOJ SDNY · TRIAL REPORTS', 'ILLUSTRATIONS: CHEQUE, CRATE, AUCTION, BENCH, BOTTLE, LABELS (GENERIC)', 'PHOTOS: U.S. ICE; U.S. GOVERNMENT TRIAL EXHIBIT · PUBLIC DOMAIN VIA WIKIMEDIA COMMONS'],
  elements: [
    { id: 'hook', type: 'text', at: [0, -520], in: -1, props: { lines: [[['A BILLIONAIRE TOLD A JURY', 'paper']], [['HE PAID $2 MILLION', 'gold']], [['FOR FAKE WINE', 'bad']]], size: 66, per: 0 } },
    { id: 'cheque', type: 'cheque', at: [0, 20], in: -1, props: { amount: '$2.1 MILLION', top: 'PAID BY A BILLIONAIRE', note: 'HE TOLD THE JURY' } },
    { id: 'fake', type: 'slamstamp', at: [210, 250], rot: 0.1, in: -1, props: { text: 'FAKE?', tone: 'bad', size: 130 } },
    // seller
    { id: 'tag', type: 'photo', at: [1560, 20], in: '@so#1-0.1', props: { src: ICE, name: 'RUDY KURNIAWAN', role: 'THE SELLER', credit: 'U.S. ICE · PUBLIC DOMAIN', treatment: 'paper', w: 420, aspect: 0.86, fx: 0.5, fy: 0.3, tilt: -0.03 } },
    { id: 'wc', type: 'text', at: [2190, 40], in: '@a#3-0.1', props: { lines: [[['WINE', 'paper']], [['COLLECTOR', 'gold']], [['CALIFORNIA', 'paper']]], size: 84 } },
    // auction + sale
    { id: 'auc', type: 'auction', at: [3600, 0], in: '@now-0.3', props: { bids: ['@bid', '@highest', '@wins'] } },
    { id: 'gav', type: 'gavel', at: [5240, -300], in: '@2006-0.4', props: { at: '@2006' } },
    { id: 'cellar', type: 'counter', at: [5400, 90], in: '@2006-0.3', props: { label: "RUDY'S COLLECTION SOLD", sub: '2006 · 2 AUCTIONS', to: 35, prefix: '≈$', suffix: ' MILLION', at: '@$35', dur: 1.0, tone: 'good', size: 120, w: 800 } },
    { id: 'cal', type: 'calendar', at: [5400, 1800], in: "@that's-0.4", props: { at: "@that's", dur: 1.5, yrsAt: '@for#3', yrsDur: 0.9 } },
    { id: 'gav2', type: 'gavel', at: [3380, 1560], in: '@one#1-0.3', props: { at: '@set' } },
    { id: 'rtx', type: 'text', at: [3600, 1330], in: '@one#1', out: '@but', props: { lines: [[['ONE OF HIS SALES', 'paper']]], size: 62 } },
    { id: 'rec', type: 'stamp', at: [3650, 1900], rot: -0.06, in: '@world-0.15', props: { text: 'WORLD RECORD', tone: 'bad', size: 120 } },
    // house: bench + photo, then the 3 steps
    { id: 'kit', type: 'photo', at: [1800, 1208], in: '@prosecutors#1-0.2', props: { src: KIT, name: '', credit: 'U.S. GOVERNMENT TRIAL EXHIBIT · PUBLIC DOMAIN', treatment: 'paper', w: 460, aspect: 0.68, fx: 0.5, fy: 0.5, tilt: 0.025 } },
    { id: 'bench', type: 'bench', at: [1800, 1800], in: '@but-0.3', props: { tagAt: '@prosecutors#1', tag: 'PROSECUTORS SAID…', printAt: '@house', printDur: 1.0 } },
    { id: 'fac', type: 'factory', at: [0, 1800], in: '@step#1-0.5', props: { s1: '@step#1', s2: '@step#2', s3: '@step#3', t1: 'STEP 1', t2: 'STEP 2', t3: 'STEP 3', d1: 'MIX OLD WINE + NEWER WINE', d2: 'OLD BOTTLES · FRESH CORKS + WAX', d3: 'A LABEL · THOUSANDS OF LABELS' } },
    { id: 'wf', type: 'stamp', at: [0, 1280], rot: -0.05, in: '@factory#1-0.3', props: { text: 'A WINE FACTORY', tone: 'bad', size: 88 } },
    // caught how
    { id: 'score', type: 'scorecard', at: [0, 3600], in: '@so#2-0.3', props: { xAt: '@nope' } },
    { id: 'nt', type: 'text', at: [0, 3040], in: '@nope', props: { lines: [[['NOT A', 'paper']], [['TASTE TEST', 'bad']]], size: 100 } },
    { id: 'lot', type: 'lotpage', at: [1650, 3600], in: '@a#12-0.4', props: { yearAt: '@1945' } },
    { id: 'silh', type: 'silh', at: [2330, 3650], rot: -0.03, in: '@actual-0.3', props: {} },
    { id: 'tl2', type: 'wintl', at: [3600, 3600], in: '@family-0.4', props: { headNote: "THE WINE'S TIMELINE", firstAt: '@1982', axisAt: '@made', bracketAt: '@37', sub: 'FIRST MADE IN 1982 · TRIAL TESTIMONY' } },
    { id: 'door', type: 'card', at: [5100, 3300], rot: 0.02, in: '@fbi-0.3', props: { w: 600, h: 330, lines: [{ t: 'ARRESTED 2012', size: 62, font: 'hero', tone: 'ink', gap: 100 }, { t: 'CONVICTED OF FRAUD', size: 44, font: 'hero', tone: 'bad', at: '@convicted', mark: 'bad', gap: 80 }, { t: 'PER DOJ', size: 26, font: 'mono', tone: 'soft' }] } },
    { id: 'verdict', type: 'wverdict', at: [5400, 4150], in: '@he#5-0.3', props: { h: 860, convAt: '@he#5', yearsAt: '@10', payAt: '@$28' } },
    // screen micro-moments
    { id: 'sec', type: 'text', layer: 'screen', at: [540, 365], in: '@so#1', out: '@a#4', props: { lines: [[['THE SELLER?', 'paper']]], size: 76 } },
    { id: 'club', type: 'text', layer: 'screen', at: [540, 400], in: '@tap+0.1', out: '@tap+1.7', props: { lines: [[['SCREW CAP GANG', 'gold']]], size: 76 } },
    { id: 'sb', type: 'bottle', layer: 'screen', at: [790, 1090], scale: 0.46, in: '@tap', out: '@tap+1.7', props: { sticker: '$10', screw: true, dust: false } },
    { id: 'heart', type: 'heart', layer: 'screen', at: [800, 830], in: '@heart-0.05', out: '@heart+1.15', props: { s: 1 } },
    { id: 'gl', type: 'glass', layer: 'screen', at: [330, 1190], in: '@send-0.1', out: '@send+1.25', props: { s: 0.8 } },
    { id: 'plane', type: 'plane', layer: 'screen', at: [540, 960], in: '@send-0.05', out: '@send+1.2', props: { dur: 0.9, from: [-230, 250], to: [280, -330], s: 1.5 } },
    { id: 'sendtx', type: 'text', layer: 'screen', at: [820, 400], in: '@send+0.15', out: '@send+1.2', props: { lines: [[['SEND', 'gold']]], size: 70 } },
    { id: 'cq', type: 'text', layer: 'screen', at: [540, 365], in: '@how', out: '@some', props: { lines: [[['CAUGHT HOW?', 'gold']]], size: 84 } },
    { id: 'mag', type: 'mag', layer: 'screen', at: [830, 1010], in: '@follow-0.05', out: '@follow+1.45', props: { press: 0.5 } },
    { id: 'btn', type: 'follow', layer: 'screen', at: [830, 1010], scale: 0.8, in: '@follow-0.05', out: '@follow+1.45', props: { press: 0.5 } },
    { id: 'ask', type: 'bubble', layer: 'screen', at: [600, 1090], in: '@could', out: '@wine#11+0.7', props: { l1: 'COULD YOU', l2: 'TASTE IT?', size: 54, tail: 'left' } },
  ],
  beats: [
    { at: 0, beat: SB, focus: ['hook', 'cheque', 'fake'], sx: 540, sy: 800, fill: 0.9, maxH: 1300, st: { x: 130, y: 1350, s: 1.05 }, pose: 'shock' },
    { at: '@$2', beat: ZN, focus: 'cheque.amount', fill: 0.86, maxH: 520, sy: 800, st: 'corner-left', pose: 'shock', dur: 0.45 },
    { at: '@fake', beat: GH, focus: ['cheque', 'fake'], sy: 850, fill: 0.9, maxH: 1050, st: 'corner-left', pose: 'point', dur: 0.6 },
    { at: '@so#1', beat: SB, focus: 'tag', move: 'whip', sx: 540, sy: 900, fill: 0.58, maxH: 820, st: { x: 930, y: 1390, s: 0.85 }, pose: 'shock' },
    { at: '@rudy#1', beat: ZN, focus: 'tag.name', fill: 0.8, maxH: 300, sy: 800, st: { x: 930, y: 1390, s: 0.85 }, pose: 'point', dur: 0.45 },
    { at: '@a#3', beat: SB, focus: ['tag', 'wc'], sx: 540, sy: 790, fill: 0.95, maxH: 1100, st: 'corner-left', pose: 'point', dur: 0.8 },
    { at: '@now', beat: SB, focus: 'auc', move: 'whip', sx: 540, sy: 880, fill: 0.8, maxH: 820, st: 'left', pose: 'point' },
    { at: '@auctions', beat: ZN, focus: 'auc.head', fill: 0.8, maxH: 300, sy: 560, st: 'corner', pose: 'point', dur: 0.45 },
    { at: '@rich', beat: PK, focus: 'auc', fill: 0.75, maxH: 820, sy: 880, pose: 'point', dur: 0.8 },
    { at: '@bid', beat: ZN, focus: 'auc.pads', fill: 0.9, maxH: 420, sy: 800, st: 'corner-left', pose: 'shock', dur: 0.45 },
    { at: '@wins', beat: GH, focus: 'auc.bars', fill: 0.8, maxH: 420, sy: 800, st: 'corner-left', dur: 0.6 },
    { at: '@2006', beat: SB, focus: ['gav', 'cellar'], move: 'whip', sx: 540, sy: 790, fill: 0.88, maxH: 1100, st: 'corner-left', pose: 'point' },
    { at: '@$35', beat: ZN, focus: 'cellar.value', fill: 0.78, maxH: 520, sy: 800, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@million#2', beat: GH, focus: ['gav', 'cellar'], sy: 790, fill: 0.9, maxH: 1100, st: 'corner-left', dur: 0.7 },
    { at: "@that's", beat: SB, focus: 'cal', move: 'whip', sx: 540, sy: 880, fill: 0.78, maxH: 850, st: 'left', pose: 'point' },
    { at: '@thousand', beat: ZN, focus: 'cal.head', fill: 0.8, maxH: 300, sy: 600, st: 'corner', pose: 'point', dur: 0.45 },
    { at: '@for#3', beat: ZN, focus: 'cal.years', fill: 0.8, maxH: 420, sy: 880, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@years+0.2', beat: GH, focus: 'cal', sy: 880, fill: 0.8, maxH: 850, st: 'corner-left', dur: 0.8 },
    { at: '@tap', beat: PF, focus: 'cal', sy: 760, pose: 'talk' },
    { at: '@screw', beat: PF, focus: 'cal', sy: 760, zoom: 1.08, pose: 'you', dur: 0.4 },
    { at: '@one#1', beat: SB, focus: ['gav2', 'rtx', 'rec'], move: 'whip', sx: 540, sy: 800, fill: 0.9, maxH: 1100, st: 'corner-left', pose: 'point' },
    { at: '@record', beat: ZN, focus: 'rec', fill: 0.8, maxH: 500, sy: 800, st: 'corner-left', pose: 'shock', dur: 0.45 },
    { at: '@but', beat: SB, focus: ['bench', 'kit'], move: 'whip', sx: 540, sy: 905, fill: 0.92, maxH: 880, st: 'corner-left', pose: 'point', dur: 0.9 },
    { at: '@prosecutors#1', beat: ZN, focus: 'bench.tag', fill: 0.5, maxH: 300, sy: 700, st: 'corner-left', pose: 'shock', dur: 0.45 },
    { at: '@house', beat: PK, focus: ['bench', 'kit'], fill: 0.9, maxH: 880, sy: 905, pose: 'talk', dur: 0.8 },
    { at: '@step#1', beat: GH, focus: 'fac', move: 'whip', sx: 540, sy: 870, fill: 0.78, maxH: 820, st: 'left', pose: 'point' },
    { at: '@mixed', beat: ZN, focus: 'fac.r1', fill: 0.9, maxH: 420, sy: 900, st: 'corner', pose: 'point', dur: 0.5 },
    { at: '@step#2', beat: ZN, focus: 'fac.r2', fill: 0.75, maxH: 420, sy: 820, st: 'corner-left', pose: 'point', dur: 0.5 },
    { at: '@wax', beat: PK, focus: 'fac', fill: 0.75, maxH: 820, sy: 870, pose: 'talk', dur: 0.8 },
    { at: '@step#3', beat: ZN, focus: 'fac.r3', fill: 0.62, maxH: 420, sy: 900, st: 'corner', pose: 'point', dur: 0.5 },
    { at: '@thousands', beat: ZN, focus: 'fac.r3', fill: 0.7, maxH: 320, sy: 900, st: 'corner-left', pose: 'shock', dur: 0.45 },
    { at: '@yeah', beat: GH, focus: ['fac', 'wf'], sy: 860, fill: 0.78, maxH: 1000, st: 'corner-left', dur: 0.8 },
    { at: '@factory#1', beat: ZN, focus: 'wf', fill: 0.8, maxH: 400, sy: 800, st: 'corner', pose: 'shock', dur: 0.45 },
    { at: '@send', beat: PF, focus: 'fac', sy: 760, pose: 'talk' },
    { at: '@swirls', beat: PF, focus: 'fac', sy: 760, zoom: 1.0, pose: 'shrug', dur: 0.6 },
    { at: '@so#2', beat: SB, focus: ['score', 'nt'], move: 'whip', sx: 540, sy: 860, fill: 0.62, maxH: 1200, st: 'corner-left', pose: 'shrug' },
    { at: '@nope', beat: ZN, focus: 'score.x', fill: 0.8, maxH: 640, sy: 800, st: 'corner-left', pose: 'point', dur: 0.5 },
    { at: '@a#12', beat: SB, focus: 'lot', move: 'whip', sx: 540, sy: 880, fill: 0.66, maxH: 800, st: 'right', pose: 'point' },
    { at: '@some', beat: GH, focus: 'lot', sy: 880, fill: 0.7, maxH: 800, st: 'corner', dur: 0.7 },
    { at: '@1945', beat: ZN, focus: 'lot.year', fill: 0.4, maxH: 520, sy: 840, st: 'corner', pose: 'shock', dur: 0.5 },
    { at: '@dumbest', beat: PF, focus: 'lot', sy: 800, pose: 'talk', dur: 0.6 },
    { at: '@follow', beat: GH, focus: 'lot', sy: 880, fill: 0.7, maxH: 800, st: 'corner-left', dur: 0.8 },
    { at: '@actual', beat: SB, focus: ['lot', 'silh'], sx: 540, sy: 880, fill: 0.92, maxH: 900, st: 'corner', pose: 'point', dur: 0.8 },
    { at: '@objected', beat: ZN, focus: 'silh', fill: 0.62, maxH: 640, sy: 840, st: 'corner', pose: 'shock', dur: 0.4 },
    { at: '@family', beat: GH, focus: 'tl2', move: 'whip', sx: 560, sy: 800, fill: 0.78, maxH: 1000, st: 'corner-left', pose: 'point' },
    { at: '@1982', beat: ZN, focus: 'tl2.first', fill: 0.9, maxH: 700, sy: 780, st: 'corner', pose: 'shock', dur: 0.45 },
    { at: '@so#4', beat: GH, focus: 'tl2', sy: 800, fill: 0.8, maxH: 1000, st: 'corner-left', dur: 0.7 },
    { at: '@37', beat: ZN, focus: 'tl2.bracket', fill: 0.62, maxH: 700, sy: 950, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@older', beat: PK, focus: 'tl2', fill: 0.8, sy: 880, pose: 'talk', dur: 0.8 },
    { at: '@fbi', beat: GH, focus: 'door', move: 'whip', sx: 540, sy: 790, fill: 0.9, maxH: 700, st: 'corner-left', pose: 'shock' },
    { at: '@convicted', beat: ZN, focus: 'door', fill: 1.0, maxH: 600, sy: 790, st: 'corner-left', pose: 'shock', dur: 0.45 },
    { at: '@he#5', beat: SB, focus: 'verdict', move: 'whip', sx: 540, sy: 960, fill: 0.78, maxH: 1000, st: 'corner-left', pose: 'idle' },
    { at: '@10', beat: ZN, focus: 'verdict.years', fill: 0.8, maxH: 560, sy: 940, st: 'corner-left', pose: 'shock', dur: 0.45 },
    { at: '@back', beat: GH, focus: 'verdict', fill: 0.72, maxH: 950, sy: 880, st: 'corner-left', pose: 'idle', dur: 0.8 },
    { at: '@$28', beat: ZN, focus: 'verdict.pay', fill: 0.8, maxH: 640, sy: 1010, st: { x: 140, y: 1500, s: 0.85 }, pose: 'shock', dur: 0.45 },
    { at: '@million#3+0.9', beat: 'pull-back', focus: 'verdict', fill: 0.7, maxH: 900, sy: 880, st: 'corner-left', pose: 'idle' },
    { at: '@could', beat: PF, focus: 'verdict', sy: 860, pose: 'talk' },
    { at: '@wine#11+0.75', beat: SB, focus: ['hook', 'cheque', 'fake'], move: 'whip', sx: 540, sy: 800, fill: 0.9, maxH: 1300, st: { x: 130, y: 1350, s: 1.05 }, pose: 'shock' },
  ],
  poses: [['@follow-0.1', 'follow', { target: [830, 1010] }], ['@follow+1.5', 'talk']],
  shakes: [[0.05, 14], ['@fake', 8], ['@set', 8], ['@1982', 16], ['@convicted', 12], ['@10', 12], ['@$28', 14]],
  captions: {
    gap: 16,
    emph: { '$2': 'bad', fake: 'bad', '$35': 'good', '95': 'bad', '1945.': 'bad', '1982.': 'bad', '37': 'bad', convicted: 'bad', fraud: 'bad', '10': 'bad', '$28': 'bad', FBI: 'accent' },
    fix: [['Rudy Kerniawin', 'Rudy Kurniawan']],
  },
  bed: { name: 'tense_bed_2', gain: -1 },
  sfx: [
    { at: 0, name: 'deep_boom_2', gain: -3, dur: 0.5 }, { at: 0.04, name: 'rubber_stamp_2', gain: -6, dur: 0.5 }, { at: 0.1, name: 'thud_1', gain: -9, dur: 0.4 },
    { at: '@$2', name: 'money_counter_2', gain: -11, dur: 0.8 },
    { at: '@so#1', name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@now', name: 'swipe_2', gain: -12, dur: 0.4 },
    { at: '@bid', name: 'pop_2', gain: -9, dur: 0.3 }, { at: '@highest', name: 'pop_2', gain: -10, dur: 0.3 }, { at: '@wins', name: 'pop_2', gain: -9, dur: 0.3 },
    { at: '@2006', name: 'gavel_1', gain: -6, dur: 0.8 }, { at: '@$35', name: 'money_counter_2', gain: -10, dur: 1.2 }, { at: '@$35+1.0', name: 'ding_2', gain: -8, dur: 0.7 },
    { at: "@that's", name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@for#3', name: 'money_counter_2', gain: -12, dur: 0.9 }, { at: '@years+0.2', name: 'cash_register_1', gain: -10, dur: 0.9 },
    { at: '@heart', name: 'heartbeat_1', gain: -8, dur: 0.9 },
    { at: '@set', name: 'gavel_2', gain: -6, dur: 0.8 }, { at: '@record', name: 'rubber_stamp_2', gain: -5, dur: 0.5 },
    { at: '@but', name: 'door_slam_1', gain: -9, dur: 0.6 }, { at: '@prosecutors#1', name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@house', name: 'typewriter_1', gain: -12, dur: 1.0 },
    { at: '@step#1', name: 'pop_1', gain: -9, dur: 0.4 }, { at: '@step#2', name: 'click_1', gain: -8, dur: 0.3 }, { at: '@step#3', name: 'paper_slam_2', gain: -9, dur: 0.5 }, { at: '@thousands', name: 'typewriter_1', gain: -11, dur: 1.2 },
    { at: '@factory#1', name: 'rubber_stamp_2', gain: -5, dur: 0.5 }, { at: '@send', name: 'swoosh_2', gain: -9, dur: 1.0 },
    { at: '@so#2', name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@nope', name: 'wrong_buzzer_1', gain: -11, dur: 0.6 },
    { at: '@a#12', name: 'swipe_2', gain: -11, dur: 0.4 }, { at: '@1945', name: 'pop_2', gain: -9, dur: 0.3 }, { at: '@1945', name: 'ding_2', gain: -10, dur: 0.7 },
    { at: '@follow+0.5', name: 'click_1', gain: -8, dur: 0.3 }, { at: '@follow+0.58', name: 'success_chime_1', gain: -12, dur: 1.0 },
    { at: '@objected', name: 'rubber_stamp_2', gain: -4, dur: 0.5 }, { at: '@family', name: 'paper_slam_2', gain: -10, dur: 0.5 },
    { at: '@1982', name: 'rubber_stamp_2', gain: -4, dur: 0.5 }, { at: '@1982', name: 'deep_boom_1', gain: -3, dur: 1.4 }, { at: '@37', name: 'rubber_stamp_2', gain: -6, dur: 0.5 },
    { at: '@fbi', name: 'door_slam_1', gain: -8, dur: 0.6 }, { at: '@convicted', name: 'gavel_1', gain: -4, dur: 0.8 }, { at: '@convicted', name: 'rubber_stamp_2', gain: -7, dur: 0.5 },
    { at: '@he#5-0.9', name: 'riser_2', gain: -14, dur: 0.9 }, { at: '@10', name: 'rubber_stamp_2', gain: -5, dur: 0.5 }, { at: '@10', name: 'cell_door_1', gain: -8, dur: 1.0 },
    { at: '@$28', name: 'money_counter_2', gain: -10, dur: 0.9 }, { at: '@$28+0.9', name: 'cash_register_1', gain: -8, dur: 0.9 },
    { at: '@could', name: 'pop_1', gain: -9, dur: 0.5 }, { at: '@wine#11+0.75', name: 'rewind_2', gain: -11, dur: 0.7 },
  ],
});
