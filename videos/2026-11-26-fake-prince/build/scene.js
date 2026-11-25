// ===== fake-prince — shared custom recipes (all generic props; no real emblems, flags, logos, photos) =====
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, countAt, hash, hit } = B;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const rise = (t, at, d = 18) => { const o = t - at; return { a: clamp(o / 0.12), y: (1 - spring(Math.max(0, o), 'snappy')) * d, on: o > 0 }; };
  const band = (g, th, x0, y0, w, h, r, title, size) => { g.save(); rr(g, x0, y0, w, h, r); g.clip(); g.fillStyle = th.navy; g.fillRect(x0, y0, w, 120); g.restore(); txt(g, title, x0 + 36, y0 + 62, F.hero(size || 62), th.paper, 'left'); };
  const tag = (g, s, x, y, col, al) => txt(g, s, x, y, F.mono(19), col || 'rgba(245,243,238,.75)', al || 'center');
  const check = (g, t, at, x, y, th) => { const k = clamp((t - at) / 0.16); if (k <= 0) return; const p = 1 + 0.3 * hit(t - at, 11); g.save(); g.translate(x, y); g.scale(p, p); g.strokeStyle = '#00A152'; g.lineWidth = 11; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); g.moveTo(-18, 2); g.lineTo(-5, 16); g.lineTo(k >= 1 ? 20 : lerp(-5, 20, clamp((k - 0.5) * 2)), k >= 1 ? -18 : lerp(16, -18, clamp((k - 0.5) * 2))); g.stroke(); g.restore(); };
  const fakeStamp = (g, t, at, x, y, rot, size, col) => { const k = t - at; if (k < 0) return; const sc = 1 + 1.1 * (1 - ease.expo(clamp(k / 0.2))), w = mw('FAKE', F.hero(size)) + size * 0.8, h = size * 1.4;
    g.save(); g.globalAlpha = clamp(k / 0.05); g.translate(x, y); g.rotate(rot); g.scale(sc, sc); g.fillStyle = 'rgba(245,243,238,.9)'; rr(g, -w / 2, -h / 2, w, h, size * 0.14); g.fill(); g.strokeStyle = col; g.lineWidth = size * 0.09; rr(g, -w / 2, -h / 2, w, h, size * 0.14); g.stroke(); txt(g, 'FAKE', 0, size * 0.05, F.hero(size), col); g.restore(); burst(g, x, y, w * 0.6, col, k - 0.14, 14, 0.4); };

  // ---------- hook: frame-0 text, fully drawn at t=0 (no stagger). lines: [[[text,tone],..],..]; sizes per line ----------
  B.register('hook', {
    defaults: { lines: [], sizes: [], size: 96, lh: 1.1 }, ownEnter: true,
    size: p => [980, p.lines.length * p.size * p.lh],
    draw(g, p, env) {
      const { lt } = env, k0 = hit(lt, 8), n = p.lines.length; g.save(); g.scale(1 + 0.1 * k0, 1 + 0.1 * k0); g.rotate(-0.018 * k0);
      let y = -(p.lines.reduce((a, _, i) => a + (p.sizes[i] || p.size) * p.lh, 0)) / 2;
      p.lines.forEach((segs, i) => { const sz = p.sizes[i] || p.size; y += sz * p.lh / 2; const f = F.hero(sz), tw = segs.reduce((a, s) => a + mw(s[0], f), 0); let x = -tw / 2;
        g.save(); g.shadowColor = 'rgba(0,0,0,.5)'; g.shadowBlur = 18 * B.zoomNow; g.shadowOffsetY = 8 * B.zoomNow; for (const [s, tn] of segs) { txt(g, s, x, y, f, B.tone(tn, false), 'left'); x += mw(s, f); } g.restore(); y += sz * p.lh / 2; });
      g.restore();
    },
  });

  // ---------- royal: clay silhouette + paper crown (ILLUSTRATION). crown drops at crownAt, slides off at offAt, re-drops at reAt, squash intervals ----------
  B.register('royal', {
    defaults: { w: 520, h: 600, crownAt: 0, offAt: 99999, reAt: 99999, sq: [], bodyless: false, label: 'ILLUSTRATION' }, size: p => [p.w, p.h],
    anchors: p => ({ crown: [0, -190, 300, 200], head: [0, -60, 300, 360], stage: [130, 60, 800, 620] }),
    draw(g, p, env) {
      const { t, theme } = env;
      if (!p.bodyless) { clay(g, -185, 40, 370, 260, 120, '#59647a', { shadowK: 0.5 }); clay(g, -34, -30, 68, 90, 22, '#6d778c', { shadowK: 0.3 }); clay(g, -92, -190, 184, 214, 92, '#8c96aa', { shadowK: 0.5 });
        g.fillStyle = 'rgba(11,15,20,.5)'; g.fillRect(-60, -108, 120, 20); }
      // crown pose
      let y = 0, x = 0, rot = 0, sx = 1, sy = 1, a = 1; const d = t - p.crownAt;
      const kd = dd => 1 - spring(Math.max(0, dd), { f: 2.5, z: 0.5 }), drop = dd => kd(dd) * -45;
      if (t >= p.reAt) { y = drop(t - p.reAt); a = clamp((t - p.reAt) / 0.05); }
      else if (t >= p.offAt) { const u = lin(t, p.offAt, p.offAt + 0.8), e = ease.out(u); x = 300 * e; rot = 1.1 * e; const f = ease.in(clamp(u * 1.15)); y = 330 * f - (u > 0.8 ? 18 * Math.abs(Math.sin((u - 0.8) * 30)) : 0); a = 1 - clamp((t - p.offAt - 1.4) / 0.3); }
      else y = d < 1.2 ? drop(d) : 0;
      let sq = 0; for (const [s0, s1] of p.sq) { if (t >= s0 && t < s1) sq = Math.max(sq, ease.out(clamp((t - s0) / 0.1))); else if (t >= s1 && t < s1 + 0.5) sq = Math.max(sq, 1 - spring(t - s1, 'snappy')); }
      sx = 1 + 0.32 * sq; sy = 1 - 0.58 * sq; { const dk = t >= p.reAt ? kd(t - p.reAt) : (t < p.offAt && d < 1.2 ? kd(d) : 0); sx *= 1 + 0.12 * dk; sy *= 1 + 0.12 * dk; }
      if (a > 0.01) { g.save(); g.globalAlpha *= a; g.translate(x, -168 + y + 18 * sq + (t >= p.offAt && t < p.reAt ? 0 : 0)); g.rotate(rot); g.scale(sx, sy);
        const path = () => { g.beginPath(); g.moveTo(-112, 0); g.lineTo(-118, -112); g.lineTo(-58, -58); g.lineTo(0, -138); g.lineTo(58, -58); g.lineTo(118, -112); g.lineTo(112, 0); g.closePath(); };
        B.shadowed(g, path, theme.gold, 0.3); g.save(); path(); g.clip(); const lg = g.createLinearGradient(0, -140, 0, 0); lg.addColorStop(0, 'rgba(255,255,255,.35)'); lg.addColorStop(0.5, 'rgba(255,255,255,0)'); lg.addColorStop(1, 'rgba(0,0,0,.25)'); g.fillStyle = lg; g.fillRect(-130, -150, 260, 160); g.fillStyle = 'rgba(0,0,0,.18)'; g.fillRect(-120, -26, 240, 26); g.restore();
        g.fillStyle = theme.gold; for (const [cx, cy] of [[-118, -116], [0, -142], [118, -116]]) { g.beginPath(); g.arc(cx, cy, 13, 0, 7); g.fill(); g.strokeStyle = 'rgba(0,0,0,.25)'; g.lineWidth = 3; g.stroke(); }
        g.restore(); }
      tag(g, p.label, 0, p.h / 2 - 10);
    },
  });

  // ---------- cloche: dinner plate with a covered dish; lid flies up at liftAt -> PORK order ticket springs out; closeAt drops it shut ----------
  B.register('cloche', {
    defaults: { w: 640, h: 560, slamIn: false, liftAt: 99999, closeAt: 99999, head: 'HE ORDERED', tagText: 'PORK' }, size: p => [p.w, p.h],
    anchors: p => ({ ticket: [0, -30, 500, 280], dish: [0, 60, 600, 440] }),
    draw(g, p, env) {
      const { t, lt, theme } = env; let jump = 0, lidY = 0, lidR = 0, lidA = 1;
      if (p.slamIn && lt < 0.7) { const u = clamp(lt / 0.18); lidY = -200 * (1 - ease.in(u)); jump = lt > 0.16 ? -22 * hit(lt - 0.16, 9) : 0; }
      if (t >= p.closeAt) { const u = clamp((t - p.closeAt) / 0.22); lidY = -320 * (1 - ease.in(u)); lidA = clamp((t - p.closeAt) / 0.04); jump = t - p.closeAt > 0.2 ? -18 * hit(t - p.closeAt - 0.2, 9) : 0; }
      else if (t >= p.liftAt) { const u = lin(t, p.liftAt, p.liftAt + 0.45); lidY = -620 * ease.out(u); lidR = 0.5 * u; lidA = 1 - clamp((t - p.liftAt - 0.25) / 0.25); }
      g.save(); g.translate(0, jump * 0.5);
      // plate
      g.save(); g.fillStyle = 'rgba(2,4,9,.42)'; g.beginPath(); g.ellipse(0, 196, 290, 52, 0, 0, 7); g.fill(); const pg = g.createLinearGradient(0, 120, 0, 200); pg.addColorStop(0, '#f3efe6'); pg.addColorStop(1, '#cfc9ba'); g.fillStyle = pg; g.beginPath(); g.ellipse(0, 172, 290, 54, 0, 0, 7); g.fill(); g.fillStyle = '#e4dfd2'; g.beginPath(); g.ellipse(0, 168, 220, 34, 0, 0, 7); g.fill(); g.restore();
      // ticket
      if (t >= p.liftAt && !(t >= p.closeAt)) { const k = spring(t - p.liftAt - 0.06, 'bouncy'), r = clamp((t - p.liftAt - 0.04) / 0.08); if (r > 0) { const hs = env.hot === 'ticket' ? 1 + 0.04 * env.hotK : 1; g.save(); g.globalAlpha *= r; g.translate(0, lerp(110, -30, k)); g.rotate(lerp(0.3, -0.045, k)); g.scale((0.3 + 0.7 * k) * hs, (0.3 + 0.7 * k) * hs);
        paper(g, -240, -130, 480, 260, 18, { lift: env.lift }); g.fillStyle = theme.rule; for (const hx of [-200, 200]) { g.beginPath(); g.arc(hx, -92, 11, 0, 7); g.fill(); } g.strokeStyle = theme.rule; g.lineWidth = 3; g.setLineDash([9, 8]); g.beginPath(); g.moveTo(-210, -62); g.lineTo(210, -62); g.stroke(); g.setLineDash([]);
        txt(g, p.head, 0, -92, F.cap(36), theme.inkSoft); txt(g, p.tagText, 0, 22, F.hero(170), theme.badInk); marker(g, -170, 92, 340, 9, theme.badInk, clamp((t - p.liftAt - 0.3) / 0.3), 0.9); g.restore(); burst(g, 0, -30, 330, theme.bad, t - p.liftAt - 0.1, 18, 0.55); } }
      // dome
      if (lidA > 0.01) { g.save(); g.globalAlpha *= lidA; g.translate(0, 150 + lidY); g.rotate(lidR); const dome = () => { g.beginPath(); g.ellipse(0, 0, 236, 270, 0, Math.PI, 0); g.lineTo(236, 12); g.quadraticCurveTo(0, 36, -236, 12); g.closePath(); };
        B.shadowed(g, dome, '#b9bfc9', 0.35); g.save(); dome(); g.clip(); const sg = g.createLinearGradient(-236, 0, 236, 0); sg.addColorStop(0, 'rgba(0,0,0,.28)'); sg.addColorStop(0.3, 'rgba(255,255,255,.55)'); sg.addColorStop(0.6, 'rgba(255,255,255,.05)'); sg.addColorStop(1, 'rgba(0,0,0,.35)'); g.fillStyle = sg; g.fillRect(-240, -280, 480, 320); g.restore();
        g.fillStyle = '#d7dbe2'; g.beginPath(); g.ellipse(0, -266, 34, 30, 0, 0, 7); g.fill(); g.fillStyle = '#9aa1ad'; g.fillRect(-14, -258, 28, 16); g.restore(); }
      g.restore(); tag(g, 'ILLUSTRATION', 0, 174, '#8a8f98');
    },
  });

  // ---------- spike: brass ticket spike with the PORK ticket slammed on (TikTok hook) ----------
  B.register('spike', {
    defaults: { w: 520, h: 600, slamIn: true, tagText: 'PORK', head: 'ORDER' }, size: p => [p.w, p.h],
    draw(g, p, env) {
      const { t, lt, theme } = env, k = p.slamIn ? ease.in(clamp(lt / 0.16)) : 1, ty = lerp(-260, 60, k), sh = p.slamIn && lt > 0.14 ? hit(lt - 0.14, 9) : 0;
      g.save(); g.translate(0, 0);
      clay(g, -150, 210, 300, 56, 28, '#B08A32', { shadowK: 0.5 }); g.save(); g.fillStyle = '#d9b44f'; g.beginPath(); g.moveTo(-14, 218); g.lineTo(-6, -200); g.lineTo(0, -250); g.lineTo(6, -200); g.lineTo(14, 218); g.closePath(); g.fill(); g.fillStyle = 'rgba(255,255,255,.4)'; g.fillRect(-8, -190, 5, 400); g.restore();
      g.save(); g.translate(0, ty + 20 * sh); g.rotate(-0.07 - 0.12 * (1 - k)); paper(g, -230, -135, 460, 270, 16, { lift: env.lift }); g.strokeStyle = theme.rule; g.lineWidth = 3; g.setLineDash([9, 8]); g.beginPath(); g.moveTo(-200, -70); g.lineTo(200, -70); g.stroke(); g.setLineDash([]);
      txt(g, p.head, 0, -100, F.cap(34), theme.inkSoft); txt(g, p.tagText, 0, 28, F.hero(180), theme.badInk); g.restore();
      g.restore(); tag(g, 'ILLUSTRATION', 0, p.h / 2 - 6);
    },
  });

  // ---------- idcard: paper "ROYAL" ID (generic PROP), swings in; pin tag; FAKE stamp ----------
  B.register('idcard', {
    defaults: { w: 700, h: 470, pinAt: 99999, pin: 'MIAMI', fakeAt: 99999 }, ownEnter: true, size: p => [p.w, p.h + 120],
    anchors: p => ({ card: [0, 0, p.w, p.h] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, k = spring(lt, { f: 2.2, z: 0.5 }), a = clamp(lt / 0.08);
      g.save(); g.globalAlpha *= a; g.translate(0, (1 - k) * -520); g.rotate(0.1 * Math.exp(-lt * 3.2) * Math.cos(lt * 13));
      paper(g, x0, y0, w, h, 24, { lift }); g.save(); rr(g, x0, y0, w, h, 24); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 112); g.restore();
      txt(g, 'ROYAL', x0 + 36, y0 + 58, F.hero(76), theme.paper, 'left'); txt(g, 'ID CARD', x0 + w - 36, y0 + 58, F.cap(34), 'rgba(245,243,238,.8)', 'right');
      // portrait slot
      g.fillStyle = '#D8D3C7'; rr(g, x0 + 36, y0 + 146, 190, 230, 14); g.fill(); g.save(); rr(g, x0 + 36, y0 + 146, 190, 230, 14); g.clip(); g.fillStyle = '#8c96aa'; g.beginPath(); g.arc(x0 + 131, y0 + 235, 52, 0, 7); g.fill(); g.fillStyle = '#59647a'; rr(g, x0 + 51, y0 + 296, 160, 140, 70); g.fill(); g.restore();
      g.fillStyle = theme.gold; g.beginPath(); g.moveTo(x0 + 98, y0 + 200); g.lineTo(x0 + 98, y0 + 176); g.lineTo(x0 + 114, y0 + 190); g.lineTo(x0 + 131, y0 + 168); g.lineTo(x0 + 148, y0 + 190); g.lineTo(x0 + 164, y0 + 176); g.lineTo(x0 + 164, y0 + 200); g.closePath(); g.fill();
      g.fillStyle = theme.paperShade || '#E7E2D6'; for (const [yy, ww] of [[160, 360], [214, 300], [268, 330], [322, 220]]) { rr(g, x0 + 262, y0 + yy, ww, 28, 8); g.fill(); }
      tag(g, 'ILLUSTRATION · PROP · NOT A REAL ID', x0 + w / 2, y0 + h - 22, theme.inkSoft);
      fakeStamp(g, t, p.fakeAt, 60, 70, -0.12, 100, theme.badInk);
      g.restore();
      // pin note
      { const r = rise(t, p.pinAt, 30); if (r.on) { g.save(); g.globalAlpha = r.a; g.translate(x0 + w - 150, y0 + h + 62 + r.y); g.rotate(0.05); paper(g, -150, -42, 300, 84, 12, { fill: '#F5E6A8' }); txt(g, p.pin, 0, 4, F.cap(44), theme.ink);
        g.fillStyle = theme.bad; g.beginPath(); g.arc(-122, -42, 15, 0, 7); g.fill(); g.fillStyle = 'rgba(255,255,255,.5)'; g.beginPath(); g.arc(-127, -47, 5, 0, 7); g.fill(); g.restore(); } }
    },
  });

  // ---------- plates: paper card, generic sports car rolls in, generic DIPLOMAT plate peels at a corner -> FAKE ----------
  B.register('plates', {
    defaults: { w: 820, h: 520, rollAt: 99999, checkAt: 99999, peelAt: 99999, fakeAt: 99999 }, size: p => [p.w, p.h],
    anchors: p => ({ plate: [150, 70, 340, 190], car: [-190, 70, 360, 190], head: [0, -p.h / 2 + 60, p.w, 120] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift }); band(g, theme, x0, y0, w, h, 26, 'DIPLOMATIC PLATES', 56); check(g, t, p.checkAt, x0 + w - 70, y0 + 60, theme);
      tag(g, 'ILLUSTRATION · PROP · GENERIC PLATE', x0 + w / 2, y0 + h - 20, theme.inkSoft);
      // ground
      g.fillStyle = '#E7E2D6'; g.fillRect(x0 + 30, y0 + 395, w - 60, 8);
      // car (generic, no badge)
      const u = ease.out(lin(t, p.rollAt, p.rollAt + 0.7)), cx = lerp(x0 - 240, x0 + 215, u), cy = y0 + 330; g.save(); g.translate(cx, cy); g.scale(0.6, 0.6); g.fillStyle = 'rgba(0,0,0,.25)'; g.beginPath(); g.ellipse(0, 86, 250, 16, 0, 0, 7); g.fill();
      const bp = () => { g.beginPath(); g.moveTo(-225, 44); g.lineTo(-225, 0); g.quadraticCurveTo(-210, -22, -160, -26); g.lineTo(-72, -30); g.lineTo(-28, -82); g.quadraticCurveTo(14, -94, 44, -62); g.lineTo(76, -28); g.lineTo(196, -14); g.quadraticCurveTo(236, 0, 236, 44); g.closePath(); };
      bp(); g.fillStyle = theme.bad; g.fill(); g.save(); bp(); g.clip(); const lg = g.createLinearGradient(0, -90, 0, 50); lg.addColorStop(0, 'rgba(255,255,255,.32)'); lg.addColorStop(0.4, 'rgba(255,255,255,0)'); lg.addColorStop(1, 'rgba(0,0,0,.28)'); g.fillStyle = lg; g.fillRect(-240, -100, 490, 160); g.restore();
      g.fillStyle = '#1B2430'; g.beginPath(); g.moveTo(-20, -72); g.lineTo(28, -72); g.lineTo(58, -34); g.lineTo(-42, -34); g.closePath(); g.fill();
      for (const wx of [-142, 138]) { g.save(); g.translate(wx, 44); g.fillStyle = '#12161c'; g.beginPath(); g.arc(0, 0, 40, 0, 7); g.fill(); g.rotate(-cx / 40); g.fillStyle = '#c9ccd2'; g.beginPath(); g.arc(0, 0, 22, 0, 7); g.fill(); g.strokeStyle = '#59606B'; g.lineWidth = 4; for (let i = 0; i < 5; i++) { g.rotate(Math.PI * 2 / 5); g.beginPath(); g.moveTo(0, 0); g.lineTo(20, 0); g.stroke(); } g.restore(); }
      g.restore();
      // the plate (big, so the number can be read), right side
      const px = x0 + w - 230, py = y0 + 290, pw = 330, ph = 170, pk = clamp((t - p.peelAt) / 0.5), pe = ease.out(pk) * 120;
      g.save(); g.translate(px, py); g.rotate(-0.02); g.shadowColor = 'rgba(2,4,9,.4)'; g.shadowBlur = 14; g.shadowOffsetY = 8; g.fillStyle = '#d6d2c6'; rr(g, -pw / 2, -ph / 2, pw, ph, 16); g.fill(); g.shadowColor = 'transparent';
      txt(g, 'PLAIN PLATE', 0, 0, F.mono(34), '#8a8f98'); g.strokeStyle = '#8a8f98'; g.lineWidth = 4; rr(g, -pw / 2 + 8, -ph / 2 + 8, pw - 16, ph - 16, 10); g.stroke();
      g.save(); g.beginPath(); g.moveTo(-pw / 2, -ph / 2); g.lineTo(pw / 2, -ph / 2); g.lineTo(pw / 2, ph / 2 - pe); g.lineTo(pw / 2 - pe, ph / 2); g.lineTo(-pw / 2, ph / 2); g.closePath(); g.clip();
      g.fillStyle = '#F5F3EE'; rr(g, -pw / 2, -ph / 2, pw, ph, 16); g.fill(); g.strokeStyle = theme.navy; g.lineWidth = 6; rr(g, -pw / 2 + 8, -ph / 2 + 8, pw - 16, ph - 16, 10); g.stroke(); g.fillStyle = theme.navy; g.fillRect(-pw / 2 + 14, -ph / 2 + 14, pw - 28, 46); txt(g, 'DIPLOMAT', 0, -ph / 2 + 38, F.cap(32), theme.paper); txt(g, 'D 0 0 0 0', 0, 34, F.monoX ? F.monoX(56) : F.mono(56), theme.navy); g.restore();
      if (pe > 1) { g.fillStyle = '#e8e4da'; g.strokeStyle = 'rgba(0,0,0,.25)'; g.lineWidth = 2; g.beginPath(); g.moveTo(pw / 2, ph / 2 - pe); g.lineTo(pw / 2 - pe, ph / 2); g.lineTo(pw / 2 - pe * 0.1, ph / 2 - pe * 0.1); g.closePath(); g.fill(); g.stroke(); }
      g.restore();
      fakeStamp(g, t, p.fakeAt, px - 20, py + 5, -0.14, 96, theme.badInk);
    },
  });

  // ---------- guards: two faceless clay bodyguards flip generic badges -> FAKE ----------
  B.register('guards', {
    defaults: { w: 820, h: 520, flipAt: 99999, checkAt: 99999, fakeAt: 99999 }, size: p => [p.w, p.h],
    anchors: p => ({ badges: [0, 20, 520, 260], head: [0, -p.h / 2 + 60, p.w, 120] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift }); band(g, theme, x0, y0, w, h, 26, 'SECURITY BADGES', 56); check(g, t, p.checkAt, x0 + w - 70, y0 + 60, theme);
      tag(g, 'ILLUSTRATION · PROP · GENERIC BADGE', x0 + w / 2, y0 + h - 20, theme.inkSoft);
      [-1, 1].forEach((s, i) => { const cx = s * 190, base = y0 + 470, br = ease.out(lin(t, p.flipAt + i * 0.18 - 0.5, p.flipAt + i * 0.18 - 0.1));
        clay(g, cx - 92, base - 250, 184, 250, 70, '#1B2430', { shadowK: 0.4 }); g.fillStyle = theme.paper; g.beginPath(); g.moveTo(cx - 24, base - 250); g.lineTo(cx, base - 190); g.lineTo(cx + 24, base - 250); g.closePath(); g.fill(); g.fillStyle = theme.bad; g.beginPath(); g.moveTo(cx - 8, base - 232); g.lineTo(cx + 8, base - 232); g.lineTo(cx + 5, base - 170); g.lineTo(cx - 5, base - 170); g.closePath(); g.fill();
        clay(g, cx - 56, base - 340, 112, 112, 56, '#8c96aa', { shadowK: 0.4 }); g.fillStyle = '#0B0F14'; rr(g, cx - 44, base - 300, 88, 24, 10); g.fill();
        // badge on a raised hand
        const fu = clamp((t - (p.flipAt + i * 0.18)) / 0.5), flipX = Math.cos(Math.PI * ease.inOut(fu)), back = fu > 0.5, bx = cx + s * 112, by = base - 215 - br * 40 - 20 * (1 - br);
        g.save(); g.translate(bx, by); g.fillStyle = '#1B2430'; g.beginPath(); g.arc(-s * 36, 66 + 10, 24, 0, 7); g.fill(); g.scale(Math.max(0.06, Math.abs(flipX)), 1); g.shadowColor = 'rgba(2,4,9,.4)'; g.shadowBlur = 10; g.shadowOffsetY = 6;
        const sp = () => { g.beginPath(); g.moveTo(-48, -56); g.lineTo(48, -56); g.lineTo(48, 12); g.quadraticCurveTo(48, 58, 0, 74); g.quadraticCurveTo(-48, 58, -48, 12); g.closePath(); };
        g.fillStyle = back ? '#b9bfc9' : theme.gold; sp(); g.fill(); g.shadowColor = 'transparent'; g.strokeStyle = back ? '#8a8f98' : '#8a6a10'; g.lineWidth = 5; sp(); g.stroke();
        if (!back) { txt(g, 'SECURITY', 0, -12, F.cap(15), '#5a3f08'); g.fillStyle = '#8a6a10'; g.beginPath(); g.arc(0, 26, 18, 0, 7); g.fill(); } else txt(g, 'PROP', 0, 6, F.mono(22), '#59606B');
        g.restore(); });
      fakeStamp(g, t, p.fakeAt, 0, y0 + 250, -0.1, 104, theme.badInk);
    },
  });

  // ---------- taken: "$8 MILLION TAKEN · PER DOJ" counter on a paper card, cash bricks slide in ----------
  B.register('taken', {
    defaults: { w: 880, h: 700, at: 99999, dur: 1.4, brickAt: 99999 }, size: p => [p.w, p.h],
    anchors: p => ({ value: [0, 20, p.w * 0.95, 250], head: [0, -p.h / 2 + 60, p.w, 120] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift }); band(g, theme, x0, y0, w, h, 26, 'TAKEN FROM INVESTORS', 58);
      txt(g, 'MORE THAN', 0, y0 + 190, F.cap(48), theme.inkSoft);
      const rt = t - p.at, v = t < p.at ? 0 : countAt(rt, p.dur, 0, 8000000), land = rt - p.dur, spd = rt > 0 && rt < p.dur ? Math.abs(countAt(rt + 0.02, p.dur, 0, 8000000) - v) / 0.02 : 0;
      const s = 1 + (land > 0 ? 0.13 * hit(land, 6) : 0) + (env.hot === 'value' ? 0.03 * env.hotK : 0), o = { font: F.hero(150), size: 150, color: t >= p.at ? theme.badInk : theme.inkSoft, prefix: '$', speed: spd }, rw = B.rollWidth(g, 8000000, o).w;
      g.save(); g.translate(0, y0 + 360); g.scale(s, s); if (t < p.at - 0.05) txt(g, '$ — — —', 0, 0, F.hero(150), theme.rule); else roll(g, v, 0, 0, o); if (land > 0) marker(g, -rw / 2, 98, rw, 10, theme.badInk, clamp(land / 0.3), 0.9); g.restore(); if (land > -0.1) burst(g, 0, y0 + 360, 360, theme.bad, land, 20, 0.55);
      // bricks
      for (let i = 0; i < 6; i++) { const bl = t - (p.brickAt + i * 0.07); if (bl <= 0) continue; const k = spring(bl, { f: 3, z: 0.55 }), side = i % 2 ? 1 : -1, row = Math.floor(i / 2), bx = side * (w / 2 - 130), by = y0 + h - 70 - row * 56;
        g.save(); g.globalAlpha = clamp(bl / 0.06); g.translate(bx + side * (1 - k) * 260, by); clay(g, -90, -26, 180, 52, 10, '#1FA366', { shadowK: 0.5 }); g.fillStyle = theme.paper; g.fillRect(-18, -26, 36, 52); txt(g, '$', 0, 2, F.hero(30), '#1FA366'); g.restore(); }
      { const r = rise(t, p.at + 0.2, 16); if (r.on) { g.save(); g.globalAlpha = r.a; g.translate(0, y0 + h - 110 + r.y); marker(g, -150, -34, 300, 68, theme.accentInk, clamp((t - p.at - 0.2) / 0.3), 0.18); txt(g, 'PER DOJ', 0, 4, F.cap(46), theme.ink); g.restore(); } }
    },
  });

  // ---------- tally: ARRESTED OR CONVICTED n× · SINCE 1988 · PROSECUTORS SAID (ticks 1..11) ----------
  B.register('tally', {
    defaults: { w: 800, h: 680, at: 99999, dur: 1.0, tabAt: 99999, srcAt: 99999 }, size: p => [p.w, p.h],
    anchors: p => ({ num: [0, 30, p.w * 0.9, 300], head: [0, -p.h / 2 + 60, p.w, 120] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift }); band(g, theme, x0, y0, w, h, 26, 'ARRESTED OR CONVICTED', 56);
      const rt = t - p.at, u = clamp(rt / p.dur), n = t < p.at ? 1 : Math.min(11, 1 + Math.floor(u * 11 * 0.9999)), land = rt - p.dur;
      const s = 1 + (rt > 0 ? 0.05 * hit(rt * 11 % 1, 8) * (u < 1 ? 1 : 0) : 0) + (land > 0 ? 0.14 * hit(land, 6) : 0) + (env.hot === 'num' ? 0.03 * env.hotK : 0), o = { font: F.hero(240), size: 240, color: u >= 1 ? theme.badInk : theme.ink, suffix: '×', speed: 0 };
      g.save(); g.translate(0, y0 + 285); g.scale(s, s); roll(g, n, 0, 0, o); if (land > 0) { const rw = B.rollWidth(g, 11, o).w; marker(g, -rw / 2, 150, rw, 12, theme.badInk, clamp(land / 0.3), 0.9); } g.restore(); if (land > -0.05) burst(g, 0, y0 + 285, 380, theme.bad, land, 20, 0.55);
      // tick strip
      for (let i = 0; i < 11; i++) { const on = n > i && t >= p.at; g.fillStyle = on ? theme.badInk : theme.rule; g.fillRect(x0 + 60 + i * ((w - 120) / 11), y0 + 612, (w - 120) / 11 - 8, 16); }
      { const r = rise(t, p.tabAt, 30); if (r.on) { g.save(); g.globalAlpha = r.a; g.translate(215, y0 + 430 + r.y); g.rotate(-0.03); paper(g, -150, -38, 300, 76, 10, { fill: '#F5E6A8' }); txt(g, 'SINCE 1988', 0, 4, F.cap(42), theme.ink); g.restore(); } }
      { const r = rise(t, p.srcAt, 20); if (r.on) { g.save(); g.globalAlpha = r.a; g.translate(190, y0 + 525 + r.y); g.rotate(0.02); paper(g, -200, -38, 400, 76, 10, { fill: theme.paper }); g.strokeStyle = theme.badInk; g.lineWidth = 4; rr(g, -193, -31, 386, 62, 6); g.stroke(); txt(g, 'PROSECUTORS SAID', 0, 4, F.cap(34), theme.badInk); g.restore(); } }
      
    },
  });

  // ---------- verdict: case card with the surname as plain text; gavel; PLEADED GUILTY + MORE THAN 18 YEARS ----------
  B.register('verdict', {
    defaults: { w: 800, h: 760, guiltyAt: 99999, yearsAt: 99999, subAt: 99999, name: true }, size: p => [p.w, p.h],
    anchors: p => ({ guilty: [0, -p.h / 2 + 250, p.w * 0.92, 160], years: [0, 110, p.w * 0.92, 330], head: [0, -p.h / 2 + 60, p.w, 120] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift });
      g.save(); rr(g, x0, y0, w, h, 26); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 130); g.restore();
      txt(g, p.name ? 'CASE: ANTHONY GIGNAC' : 'THE VERDICT', x0 + 36, y0 + 58, F.hero(p.name ? 56 : 66), theme.paper, 'left'); txt(g, 'U.S. DISTRICT COURT · S.D. FLORIDA', x0 + 36, y0 + 104, F.mono(22), 'rgba(245,243,238,.75)', 'left');
      const ga = p.guiltyAt, ang = t < ga - 0.3 ? -0.95 : t < ga ? lerp(-0.95, 0.1, ease.in(lin(t, ga - 0.3, ga))) : 0.1 - 0.35 * hit(t - ga, 9) * Math.max(0, Math.sin((t - ga) * 18));
      g.save(); g.translate(x0 + w - 100, y0 + 80); g.scale(0.62, 0.62); clay(g, -62, 6, 124, 22, 8, theme.manila, { shadowK: 0.3 }); g.translate(0, -2); g.rotate(ang); clay(g, -9, -118, 18, 124, 8, theme.manila, { shadowK: 0.3 }); clay(g, -50, -150, 100, 58, 12, '#B9955A', { shadowK: 0.3 }); g.restore();
      { const gt = t - ga; if (gt > 0) { const sc = 1 + 1.2 * (1 - ease.expo(gt / 0.2)), hot = env.hot === 'guilty' ? 0.03 * env.hotK : 0; g.save(); g.globalAlpha = clamp(gt / 0.08); g.translate(0, y0 + 250); g.rotate(-0.04); g.scale(sc + hot, sc + hot); marker(g, -340, -78, 680, 140, theme.badInk, clamp((gt - 0.1) / 0.3), 0.16); txt(g, 'PLEADED GUILTY', 0, 0, F.hero(104), theme.badInk); g.restore(); burst(g, 0, y0 + 250, 330, theme.bad, gt - 0.1, 20, 0.55); } }
      g.strokeStyle = theme.rule; g.lineWidth = 3; g.setLineDash([10, 9]); g.beginPath(); g.moveTo(x0 + 40, y0 + 340); g.lineTo(x0 + w - 40, y0 + 340); g.stroke(); g.setLineDash([]);
      txt(g, 'MORE THAN', 0, y0 + 385, F.cap(44), theme.inkSoft);
      { const yt = t - p.yearsAt; if (yt > -0.01) { const v = countAt(Math.max(0, yt), 0.7, 0, 18), land = yt - 0.7, s = 1 + (land > 0 ? 0.16 * hit(land, 6) : 0) + (env.hot === 'years' ? 0.03 * env.hotK : 0), o = { font: F.hero(200), size: 200, color: theme.ink, suffix: '+', speed: yt < 0.7 ? 18 / 0.5 : 0 }, rw = B.rollWidth(g, 18, o).w;
        g.save(); g.translate(0, y0 + 540); g.scale(s, s); roll(g, v, 0, 0, o); if (land > 0) marker(g, -rw / 2, 118, rw, 10, theme.badInk, clamp(land / 0.3), 0.9); g.restore(); burst(g, 0, y0 + 540, 330, theme.bad, land, 18, 0.55);
        txt(g, 'YEARS IN PRISON', 0, y0 + 700, F.hero(62), theme.badInk); } }
      { const r = rise(t, p.subAt, 18); if (r.on) { g.save(); g.globalAlpha = r.a; g.translate(x0 + w - 36, y0 + h - 26 + r.y); txt(g, 'SENTENCED MAY 31, 2019 · PER DOJ', 0, 0, F.mono(24), theme.inkSoft, 'right'); g.restore(); } }
    },
  });

  // ---------- diner: faceless silhouette, a question mark pops, "A VICTIM NOTICED" ----------
  B.register('diner', {
    defaults: { w: 640, h: 640, at: 99999, tagAt: 99999 }, size: p => [p.w, p.h],
    draw(g, p, env) {
      const { t, theme } = env; clay(g, -180, 40, 360, 250, 120, '#59647a', { shadowK: 0.5 }); clay(g, -34, -20, 68, 80, 22, '#6d778c', { shadowK: 0.3 }); clay(g, -92, -180, 184, 214, 92, '#8c96aa', { shadowK: 0.5 });
      { const k = spring(t - p.at, 'bouncy'), a = clamp((t - p.at) / 0.06); if (a > 0) { g.save(); g.globalAlpha *= a; g.translate(-170, -230); g.scale(0.4 + 0.6 * k, 0.4 + 0.6 * k); g.rotate(0.12); B.shadowed(g, () => { g.beginPath(); g.arc(0, 0, 86, 0, 7); }, theme.gold, 0.3); txt(g, '?', 0, 8, F.hero(150), '#5a3f08'); g.restore(); burst(g, -170, -230, 160, theme.gold, t - p.at - 0.05, 10, 0.4); } }
      { const r = rise(t, p.tagAt, 26); if (r.on) { g.save(); g.globalAlpha = r.a; g.translate(0, 250 + r.y); paper(g, -270, -52, 540, 104, 14, { fill: theme.paper }); txt(g, 'A VICTIM NOTICED', 0, -8, F.hero(58), theme.badInk); txt(g, 'PER AP', 0, 36, F.mono(22), theme.inkSoft); g.restore(); } }
      tag(g, 'ILLUSTRATION · FACELESS', 0, p.h / 2 - 6);
    },
  });
})();
// reused CTA micro-moment recipes (from Tucker payday): plane, heart, mag
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, countAt, hash, hit } = B;
  B.register('plane', {
    defaults: { dur: 1.9, from: [-420, 330], to: [440, -360], s: 2.2 }, size: () => [10, 10],
    draw(g, p, env) {
      const lt = env.lt, u = ease.out(lin(lt, 0, p.dur)), pos = k => [lerp(p.from[0], p.to[0], k), lerp(p.from[1], p.to[1], k) - Math.sin(Math.PI * k) * 150], [px, py] = pos(u), [qx, qy] = pos(Math.min(1, u + 0.02)), a = Math.atan2(qy - py, qx - px) || -0.6;
      g.save(); g.strokeStyle = rgba(env.theme.accent, 0.85); g.lineWidth = 6; g.lineCap = 'round'; g.setLineDash([2, 22]); g.beginPath(); for (let i = 0; i <= 30; i++) { const [x, y] = pos(u * i / 30); i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); g.setLineDash([]); g.restore();
      g.save(); g.translate(px, py); g.rotate(a); const s = p.s * (0.7 + 0.3 * spring(lt, 'snappy')), sh = B.zoomNow || 1; g.scale(s, s);
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
})();
// YouTube cut. Stations: hook (0,0) · ID card (1700,-60) · plates+guards (3400,0) · taken (5100,0) · tally (6800,0) · verdict (8500,0) · diner (0,1500)
BM2.scene({
  series: 'decoded', title: 'CASE: FAKE PRINCE · 2017', duration: 45.53,
  footnote: ['PLEADED GUILTY 2018 · SENTENCED MAY 31, 2019 · SOURCES: DOJ S.D. FLORIDA, AP', 'ABOUT 30 YEARS = 1988 TO 2017 ARREST · ILLUSTRATIONS / PROPS (GENERIC)'],
  elements: [
    { id: 'hook', type: 'hook', at: [0, -430], in: 0, out: 4.45, props: { lines: [[['FAKE PRINCE · ', 'paper'], ['~30 YEARS', 'gold']], [['ONE DINNER ORDER', 'bad']], [['ENDED IT', 'bad']]], sizes: [74, 74, 74] } },
    { id: 'hook2', type: 'hook', at: [0, -430], in: 44.42, props: { lines: [[['FAKE PRINCE · ', 'paper'], ['~30 YEARS', 'gold']], [['ONE DINNER ORDER', 'bad']], [['ENDED IT', 'bad']]], sizes: [74, 74, 74] } },
    { id: 'royal', type: 'royal', at: [-200, 105], in: -1, props: { crownAt: 0, offAt: '@royal', reAt: 44.62 } },
    { id: 'cloche', type: 'cloche', at: [330, 145], in: -1, props: { slamIn: true, liftAt: '@ordered', closeAt: 44.55 } },
    { id: 'quote', type: 'text', at: [1700, -480], in: '@tells', out: '@So-0.1', props: { lines: [[['“I\'M A SAUDI PRINCE”', 'paper']]], size: 66 } },
    { id: 'idc', type: 'idcard', at: [1700, -60], in: '@He-0.05', props: { pinAt: '@Miami', fakeAt: 99999 } },
    { id: 'qm', type: 'text', at: [1950, 40], rot: 0.12, in: '@how', out: '@Ferrari-0.2', props: { lines: [[['?', 'gold']]], size: 520 } },
    { id: 'check', type: 'text', layer: 'screen', at: [540, 345], in: '@how', out: '@Ferrari-0.2', props: { lines: [[['HOW DO YOU CHECK?', 'paper']]], size: 78 } },
    { id: 'plates', type: 'plates', at: [3400, -290], in: '@Ferrari-0.5', props: { rollAt: '@Ferrari+0.25', checkAt: '@plates', peelAt: '@plates#2', fakeAt: '@fake' } },
    { id: 'guards', type: 'guards', at: [3400, 290], in: '@Ferrari-0.5', props: { flipAt: '@diplomatic#2', checkAt: '@badges', fakeAt: '@fake#2' } },
    { id: 'believe', type: 'text', layer: 'screen', at: [540, 345], in: "@you'd", out: '@Investors#2-0.2', props: { lines: [[["YOU'D HAVE ", 'paper'], ['BELIEVED HIM', 'gold']]], size: 62 } },
    { id: 'heart', type: 'heart', layer: 'screen', at: [800, 930], in: '@heart-0.05', out: '@heart+1.15', props: { s: 1 } },
    { id: 'taken', type: 'taken', at: [5100, 0], in: '@Investors#2-0.4', props: { at: '@$8', dur: 1.3, brickAt: '@Investors#2+0.35' } },
    { id: 'plane', type: 'plane', layer: 'screen', at: [540, 960], in: '@Send-0.05', out: '@Send+1.2', props: { dur: 0.9, from: [-230, 250], to: [280, -330], s: 1.5 } },
    { id: 'sendtx', type: 'text', layer: 'screen', at: [820, 400], in: '@Send+0.15', out: '@Send+1.2', props: { lines: [[['SEND', 'gold']]], size: 70 } },
    { id: 'tally', type: 'tally', at: [6800, 0], in: '@gets-0.5', props: { at: '@arrested', dur: 1.05, tabAt: '@Prosecutors', srcAt: '@said' } },
    { id: 'verdict', type: 'verdict', at: [8500, 0], in: '@He#2-0.5', props: { guiltyAt: '@got', yearsAt: '@18', subAt: '@years#2' } },
    { id: 'diner', type: 'diner', at: [0, 2600], in: '@victim-0.4', props: { at: '@victim', tagAt: '@noticed' }, out: 44.6 },
    { id: 'wc', type: 'text', layer: 'screen', at: [540, 345], in: '@what', out: '@Follow-0.15', props: { lines: [[['WHAT CRACKED IT?', 'gold']]], size: 78 } },
    { id: 'mag', type: 'mag', layer: 'screen', at: [830, 1010], in: '@Follow-0.05', out: '@Follow+1.45', props: { press: 0.5 } },
    { id: 'btn', type: 'follow', layer: 'screen', at: [830, 1010], scale: 0.8, in: '@Follow-0.05', out: '@Follow+1.45', props: { press: 0.5 } },
    { id: 'tell', type: 'text', layer: 'screen', at: [540, 345], in: '@tell-0.1', out: '@Then-0.1', props: { lines: [[['THE TELL…', 'gold']]], size: 92 } },
    { id: 'wouldnt', type: 'text', layer: 'screen', at: [540, 345], in: '@royal', out: '@victim-0.25', props: { lines: [[['HIS CHARACTER ', 'paper'], ["WOULDN'T", 'bad']]], size: 62 } },
    { id: 'ask', type: 'bubble', layer: 'screen', at: [600, 1090], in: '@which', out: '@order#2+0.4', props: { l1: 'PLATES OR', l2: 'DINNER ORDER?', size: 52, tail: 'left' } },
  ],
  beats: [
    { at: 0, beat: 'side-by-side', focus: ['hook', 'royal', 'cloche'], sx: 540, sy: 790, fill: 0.98, maxH: 900, st: { x: 130, y: 1350, s: 1.1 }, pose: 'shock' },
    { at: '@30', beat: 'zoom-on-number', focus: ['hook', 'royal', 'cloche'], fill: 1.05, maxH: 960, sx: 540, sy: 800, zoom: 1.0, st: { x: 130, y: 1350, s: 1.1 }, dur: 0.45 },
    { at: '@One', beat: 'side-by-side', focus: ['hook', 'royal', 'cloche'], sx: 540, sy: 800, fill: 1.05, maxH: 960, st: { x: 130, y: 1350, s: 1.1 }, pose: 'shock', dur: 0.6 },
    { at: '@He', beat: 'side-by-side', focus: ['idc', 'quote'], move: 'whip', sx: 540, sy: 800, fill: 0.7, maxH: 960, st: 'corner-left', pose: 'point' },
    { at: '@how', beat: 'presenter-front', focus: 'idc', sy: 800, pose: 'talk', keep: ['qm'] },
    { at: '@Ferrari-0.1', beat: 'side-by-side', focus: ['plates', 'guards'], move: 'whip', sx: 540, sy: 830, fill: 0.84, maxH: 900, st: 'corner-left', pose: 'point' },
    { at: '@plates', beat: 'zoom-on-number', focus: 'plates.plate', fill: 0.42, maxH: 420, sy: 820, st: 'corner-left', dur: 0.5 },
    { at: '@bodyguards', beat: 'zoom-on-number', focus: 'guards', fill: 0.9, maxH: 700, sy: 820, st: 'corner-left', pose: 'point', dur: 0.5 },
    { at: '@Tap', beat: 'presenter-front', focus: ['plates', 'guards'], sy: 790, pose: 'shrug' },
    { at: '@Investors#2', beat: 'side-by-side', focus: 'taken', move: 'whip', sx: 540, sy: 800, fill: 0.9, maxH: 900, st: 'corner-left', pose: 'point' },
    { at: '@$8', beat: 'zoom-on-number', focus: 'taken.value', fill: 0.9, maxH: 560, sy: 780, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@But', beat: 'side-by-side', focus: ['plates', 'guards'], move: 'whip', sx: 540, sy: 830, fill: 0.84, maxH: 900, st: 'corner-left', pose: 'point' },
    { at: '@plates#2', beat: 'zoom-on-number', focus: 'plates.plate', fill: 0.44, maxH: 440, sy: 820, st: 'corner-left', dur: 0.5 },
    { at: '@badges#2', beat: 'zoom-on-number', focus: 'guards', fill: 0.9, maxH: 700, sy: 820, st: 'corner-left', dur: 0.5 },
    { at: '@Send', beat: 'side-by-side', focus: ['plates', 'guards'], sx: 540, sy: 830, fill: 0.84, maxH: 900, st: 'corner-left', pose: 'you', dur: 0.8 },
    { at: '@gets', beat: 'peek', focus: 'tally', move: 'whip', sy: 800, fill: 0.9, maxH: 860, pose: 'chin' },
    { at: '@11', beat: 'zoom-on-number', focus: 'tally.num', fill: 0.84, maxH: 520, sy: 780, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: 30.6, beat: 'pull-back', focus: 'tally', fill: 0.86, maxH: 860, sy: 800, st: 'corner-left', dur: 0.6 },
    { at: '@He#2', beat: 'side-by-side', focus: 'verdict', move: 'whip', sx: 540, sy: 880, fill: 0.9, maxH: 920, st: 'corner-left', pose: 'shock' },
    { at: '@18', beat: 'zoom-on-number', focus: 'verdict.years', fill: 0.72, maxH: 640, sy: 900, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@what', beat: 'side-by-side', focus: 'cloche', move: 'whip', sx: 540, sy: 840, fill: 0.8, maxH: 700, st: 'corner-left', pose: 'chin', blur: 7, dim: 0.4 },
    { at: '@Follow', beat: 'presenter-front', focus: 'cloche', sy: 820, pose: 'talk' },
    { at: 35.18, beat: 'peek', focus: 'cloche', sy: 860, fill: 0.84, maxH: 700, pose: 'idle' },
    { at: '@Then', beat: 'graphic-hero', focus: 'cloche', fill: 0.88, maxH: 760, sy: 840, st: 'corner-left', pose: 'idle', dur: 1.0 },
    { at: '@pork', beat: 'zoom-on-number', focus: 'cloche.ticket', fill: 0.92, maxH: 700, sy: 800, st: 'corner-left', pose: 'shock', dur: 0.45 },
    { at: '@royal', beat: 'zoom-on-number', focus: 'royal.stage', fill: 0.98, maxH: 760, sy: 890, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@victim-0.1', beat: 'peek', focus: 'diner', move: 'whip', sy: 820, fill: 0.76, maxH: 760 },
    { at: '@which', beat: 'presenter-front', focus: 'diner', sy: 800, pose: 'you', dur: 0.8 },
    { at: 44.2, beat: 'side-by-side', focus: ['hook2', 'royal', 'cloche'], move: 'whip', sx: 540, sy: 770, fill: 0.96, maxH: 1060, st: { x: 130, y: 1350, s: 1.1 }, pose: 'shock' },
  ],
  poses: [['@Follow-0.1', 'follow', { target: [830, 1010] }], ['@Follow+1.5', 'talk']],
  shakes: [[0.05, 14], ['@plates#2', 8], ['@$8+1.3', 10], ['@fake', 8], ['@11', 14], ['@got', 14], ['@ordered', 14], ['@pork', 26], ['@royal', 10]],
  captions: {
    emph: { '$8': 'bad', million: 'bad', fake: 'bad', '11': 'bad', '18': 'bad', pork: 'bad', thirty: 'accent', '30': 'accent', royalty: 'accent', 'dumber': 'bad' },
    fix: [],
    gap: 16,
  },
  bed: { name: 'tense_bed_2', gain: -1 },
  sfx: [
    { at: 0, name: 'deep_boom_2', gain: -3, dur: 0.5 }, { at: 0.1, name: 'paper_slam_2', gain: -7, dur: 0.5 },
    { at: '@One', name: 'thud_1', gain: -9, dur: 0.4 },
    { at: '@He', name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@Miami', name: 'click_1', gain: -8, dur: 0.3 }, { at: '@how', name: 'pop_1', gain: -8, dur: 0.5 },
    { at: '@Ferrari+0.25', name: 'swoosh_2', gain: -10, dur: 0.9 }, { at: '@plates', name: 'ding_2', gain: -10, dur: 0.6 }, { at: '@diplomatic#2', name: 'click_2', gain: -8, dur: 0.3 }, { at: '@badges', name: 'ding_2', gain: -10, dur: 0.6 },
    { at: '@heart', name: 'heartbeat_1', gain: -8, dur: 0.9 },
    { at: '@Investors#2+0.35', name: 'coins_drop_1', gain: -12, dur: 1.2 }, { at: '@$8', name: 'money_counter_2', gain: -10, dur: 1.3 }, { at: '@$8+1.3', name: 'cash_register_1', gain: -8, dur: 0.9 },
    { at: '@plates#2', name: 'swipe_2', gain: -10, dur: 0.5 }, { at: '@fake', name: 'rubber_stamp_2', gain: -6, dur: 0.5 }, { at: '@fake#2', name: 'rubber_stamp_2', gain: -6, dur: 0.5 },
    { at: '@Send', name: 'swoosh_2', gain: -9, dur: 1.0 },
    { at: '@gets', name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@arrested', name: 'typewriter_1', gain: -12, dur: 1.0 }, { at: '@11', name: 'deep_boom_2', gain: -6, dur: 0.4 }, { at: '@11', name: 'ding_2', gain: -9, dur: 0.6 }, { at: '@said', name: 'rubber_stamp_2', gain: -8, dur: 0.5 },
    { at: '@got', name: 'gavel_1', gain: -4, dur: 0.8 }, { at: '@18', name: 'money_counter_2', gain: -11, dur: 0.7 }, { at: '@18+0.7', name: 'thud_1', gain: -8, dur: 0.4 },
    { at: '@what', name: 'riser_2', gain: -13, dur: 1.4 }, { at: '@Follow+0.5', name: 'click_1', gain: -8, dur: 0.3 }, { at: '@Follow+0.58', name: 'success_chime_1', gain: -12, dur: 1.0 },
    { at: '@ordered', name: 'cinematic_hit_1', gain: -3, dur: 1.2 }, { at: '@pork', name: 'deep_boom_1', gain: -3, dur: 1.4 },
    { at: '@royal', name: 'thud_1', gain: -8, dur: 0.4 }, { at: '@royal+0.6', name: 'coin_single_2', gain: -8, dur: 0.6 },
    { at: '@victim', name: 'pop_1', gain: -8, dur: 0.5 }, { at: '@which', name: 'pop_1', gain: -9, dur: 0.5 }, { at: 44.55, name: 'thud_1', gain: -8, dur: 0.4 },
  ],
});
