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
// recipes copied from videos/2026-11-26-fake-wine/_src/shared.js (slamstamp, gavel, calendar; calendar adapted: p.foot, to=22)
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, countAt, hash, hit } = B;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const rise = (t, at, d = 18) => { const o = t - at; return { a: clamp(o / 0.12), y: (1 - spring(Math.max(0, o), 'snappy')) * d, on: o > 0 }; };
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
  // ---------- calendar: chips of $1,000 fill the days, the years counter rolls to 95 ----------
  B.register('calendar', {
    defaults: { w: 780, h: 900, at: 99999, dur: 1.7, yrsAt: 99999, yrsDur: 0.9, to: 22, foot: 'OUR MATH: $8M ÷ $1,000 A DAY ≈ 22 YEARS' }, ownEnter: true, size: p => [p.w, p.h],
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
      txt(g, p.foot, 0, y0 + h - 34, F.mono(18), theme.inkSoft);
      g.restore();
    },
  });
})();
// ===== fake-prince v3 (REBUILD-LONGER) — extra recipes. All generic props: no real emblems, flags, logos. Prepended after shared.js/reuse.js/wine_bits.js =====
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, countAt, hash, hit } = B;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const rise = (t, at, d = 18) => { const o = t - at; return { a: clamp(o / 0.12), y: (1 - spring(Math.max(0, o), 'snappy')) * d, on: o > 0 }; };
  const band = (g, th, x0, y0, w, h, r, title, size) => { g.save(); rr(g, x0, y0, w, h, r); g.clip(); g.fillStyle = th.navy; g.fillRect(x0, y0, w, 120); g.restore(); txt(g, title, x0 + 36, y0 + 62, F.hero(size || 62), th.paper, 'left'); };
  const tag = (g, s, x, y, col, al) => txt(g, s, x, y, F.mono(19), col || 'rgba(245,243,238,.75)', al || 'center');
  const crownPath = g => { g.beginPath(); g.moveTo(-112, 0); g.lineTo(-118, -112); g.lineTo(-58, -58); g.lineTo(0, -138); g.lineTo(58, -58); g.lineTo(118, -112); g.lineTo(112, 0); g.closePath(); };
  const drawCrown = (g, th, s) => { g.save(); g.scale(s, s); B.shadowed(g, () => crownPath(g), th.gold, 0.3); g.fillStyle = th.gold; for (const [cx, cy] of [[-118, -116], [0, -142], [118, -116]]) { g.beginPath(); g.arc(cx, cy, 13, 0, 7); g.fill(); g.strokeStyle = 'rgba(0,0,0,.25)'; g.lineWidth = 3; g.stroke(); } g.restore(); };
  const sil = (g, x, y, s) => { g.save(); g.translate(x, y); g.scale(s, s); clay(g, -180, 40, 360, 250, 120, '#59647a', { shadowK: 0.5 }); clay(g, -34, -20, 68, 80, 22, '#6d778c', { shadowK: 0.3 }); clay(g, -92, -180, 184, 214, 92, '#8c96aa', { shadowK: 0.5 }); g.restore(); };
  const stampT = (g, t, at, x, y, rot, size, col, text) => { const k = t - at; if (k < 0) return; const sc = 1 + 1.1 * (1 - ease.expo(clamp(k / 0.2))), w = mw(text, F.hero(size)) + size * 0.8, h = size * 1.4;
    g.save(); g.globalAlpha = clamp(k / 0.05); g.translate(x, y); g.rotate(rot); g.scale(sc, sc); g.fillStyle = 'rgba(245,243,238,.92)'; rr(g, -w / 2, -h / 2, w, h, size * 0.14); g.fill(); g.strokeStyle = col; g.lineWidth = size * 0.09; rr(g, -w / 2, -h / 2, w, h, size * 0.14); g.stroke(); txt(g, text, 0, size * 0.05, F.hero(size), col); g.restore(); burst(g, x, y, w * 0.6, col, k - 0.14, 14, 0.4); };
  const drawCar = (g, th, rot) => { g.fillStyle = 'rgba(0,0,0,.25)'; g.beginPath(); g.ellipse(0, 86, 250, 16, 0, 0, 7); g.fill();
    const bp = () => { g.beginPath(); g.moveTo(-225, 44); g.lineTo(-225, 0); g.quadraticCurveTo(-210, -22, -160, -26); g.lineTo(-72, -30); g.lineTo(-28, -82); g.quadraticCurveTo(14, -94, 44, -62); g.lineTo(76, -28); g.lineTo(196, -14); g.quadraticCurveTo(236, 0, 236, 44); g.closePath(); };
    bp(); g.fillStyle = th.bad; g.fill(); g.save(); bp(); g.clip(); const lg = g.createLinearGradient(0, -90, 0, 50); lg.addColorStop(0, 'rgba(255,255,255,.32)'); lg.addColorStop(0.4, 'rgba(255,255,255,0)'); lg.addColorStop(1, 'rgba(0,0,0,.28)'); g.fillStyle = lg; g.fillRect(-240, -100, 490, 160); g.restore();
    g.fillStyle = '#1B2430'; g.beginPath(); g.moveTo(-20, -72); g.lineTo(28, -72); g.lineTo(58, -34); g.lineTo(-42, -34); g.closePath(); g.fill();
    for (const wx of [-142, 138]) { g.save(); g.translate(wx, 44); g.fillStyle = '#12161c'; g.beginPath(); g.arc(0, 0, 40, 0, 7); g.fill(); g.rotate(rot || 0); g.fillStyle = '#c9ccd2'; g.beginPath(); g.arc(0, 0, 22, 0, 7); g.fill(); g.strokeStyle = '#59606B'; g.lineWidth = 4; for (let i = 0; i < 5; i++) { g.rotate(Math.PI * 2 / 5); g.beginPath(); g.moveTo(0, 0); g.lineTo(20, 0); g.stroke(); } g.restore(); } };
  const shield = (g, th, s) => { g.save(); g.scale(s, s); g.shadowColor = 'rgba(2,4,9,.4)'; g.shadowBlur = 10; g.shadowOffsetY = 6; const sp = () => { g.beginPath(); g.moveTo(-48, -56); g.lineTo(48, -56); g.lineTo(48, 12); g.quadraticCurveTo(48, 58, 0, 74); g.quadraticCurveTo(-48, 58, -48, 12); g.closePath(); };
    g.fillStyle = th.gold; sp(); g.fill(); g.shadowColor = 'transparent'; g.strokeStyle = '#8a6a10'; g.lineWidth = 5; sp(); g.stroke(); txt(g, 'SECURITY', 0, -12, F.cap(15), '#5a3f08'); g.fillStyle = '#8a6a10'; g.beginPath(); g.arc(0, 26, 18, 0, 7); g.fill(); g.restore(); };
  // seed -> plant of coins (the "hoping it grows" icon). k = local time since it appeared
  const plant = (g, th, k, s) => { g.save(); g.scale(s, s); g.fillStyle = '#5b4330'; g.beginPath(); g.ellipse(0, 90, 120, 26, 0, 0, 7); g.fill(); const u = ease.out(clamp((k - 0.1) / 0.7)), hh = 170 * u;
    g.strokeStyle = '#2E8B57'; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); g.moveTo(0, 86); g.lineTo(0, 86 - hh); g.stroke();
    for (const [f, sd] of [[0.45, -1], [0.65, 1]]) { const lu = clamp((u - f) / 0.3); if (lu > 0) { g.save(); g.translate(0, 86 - hh * f); g.rotate(sd * 0.7); g.fillStyle = '#2E8B57'; g.beginPath(); g.ellipse(sd * 30 * lu, -6, 36 * lu, 14 * lu, 0, 0, 7); g.fill(); g.restore(); } }
    [[-70, -62, 0.7], [0, -106, 0.85], [70, -62, 1.0]].forEach(([cx, cy, d]) => { const c = spring(Math.max(0, k - d), 'bouncy'); if (k > d) { g.save(); g.translate(cx, 86 - 170 + 70 + cy + 62 - 62); g.scale(c, c); g.fillStyle = th.gold; g.beginPath(); g.arc(0, 0, 34, 0, 7); g.fill(); g.strokeStyle = '#8a6a10'; g.lineWidth = 4; g.beginPath(); g.arc(0, 0, 26, 0, 7); g.stroke(); txt(g, '$', 0, 3, F.hero(34), '#5a3f08'); g.restore(); } });
    g.restore(); };

  // ---------- defcard: a plain-words definition card (term, "= definition", a tiny icon). icon 'conman' | 'investor' ----------
  B.register('defcard', {
    defaults: { w: 860, h: 860, head: "WHAT'S A CON MAN?", term: 'CON MAN', d1: 'LIES TO TAKE', d2: "PEOPLE'S MONEY", icon: 'conman', defAt: 99999, iconAt: 99999 }, size: p => [p.w, p.h],
    anchors: p => ({ head: [0, -p.h / 2 + 65, p.w, 130], term: [0, -p.h / 2 + 250, p.w * 0.9, 170], def: [0, -p.h / 2 + 470, p.w * 0.9, 200], icon: [0, p.h / 2 - 150, p.w * 0.85, 300] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift }); band(g, theme, x0, y0, w, h, 26, p.head, 56);
      const tw = mw(p.term, F.hero(150)); txt(g, p.term, 0, y0 + 255, F.hero(150), theme.ink); marker(g, -tw / 2, y0 + 335, tw, 10, theme.badInk, clamp(lt / 0.5), 0.9);
      { const r = rise(t, p.defAt, 22); if (r.on) { g.save(); g.globalAlpha = r.a; g.translate(0, r.y); txt(g, '= ' + p.d1, 0, y0 + 440, F.hero(64), theme.ink); g.restore(); } }
      { const r = rise(t, p.defAt + 0.3, 22); if (r.on) { g.save(); g.globalAlpha = r.a; g.translate(0, r.y); txt(g, p.d2, 0, y0 + 520, F.hero(76), theme.badInk); g.restore(); } }
      const ik = t - p.iconAt; if (ik > 0) { const k = spring(ik, 'bouncy'); g.save(); g.translate(0, y0 + h - 150); g.globalAlpha *= clamp(ik / 0.1);
        if (p.icon === 'conman') { g.save(); g.translate(-190, 0); g.scale(0.7 + 0.3 * k, 0.7 + 0.3 * k); B.shadowed(g, () => { g.beginPath(); g.arc(0, 0, 90, 0, 7); }, theme.paper, 0.3); g.fillStyle = '#0B0F14'; for (const ex of [-33, 33]) { g.beginPath(); g.ellipse(ex, -18, 15, 11, 0, 0, 7); g.fill(); } g.strokeStyle = '#0B0F14'; g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); g.arc(0, 4, 50, 0.25, Math.PI - 0.25); g.stroke(); g.strokeStyle = theme.rule; g.lineWidth = 4; g.beginPath(); g.arc(0, 0, 90, 0, 7); g.stroke(); g.restore();
          const u = ease.inOut(clamp((ik - 0.35) / 0.9)), wx = lerp(250, 60, u); g.save(); g.translate(wx, 14); clay(g, -78, -50, 156, 100, 16, '#7a5230', { shadowK: 0.4 }); g.fillStyle = '#93663c'; rr(g, -78, -50, 156, 44, 14); g.fill(); g.fillStyle = theme.gold; g.beginPath(); g.arc(0, -6, 12, 0, 7); g.fill();
          g.fillStyle = '#E8B98A'; g.beginPath(); g.arc(104, 12, 36, 0, 7); g.fill(); for (const fy of [-22, 4, 30]) { g.beginPath(); g.arc(86, 12 + fy * 0.8, 15, 0, 7); g.fill(); } g.restore();
          for (let i = 0; i < 3; i++) { const cu = clamp((ik - 0.9 - i * 0.2) / 0.55); if (cu > 0 && cu < 1) { const cx = lerp(wx, -120, cu), cy = -Math.sin(Math.PI * cu) * 110; g.save(); g.translate(cx, cy); g.fillStyle = theme.gold; g.beginPath(); g.arc(0, 0, 22, 0, 7); g.fill(); g.strokeStyle = '#8a6a10'; g.lineWidth = 3; g.beginPath(); g.arc(0, 0, 16, 0, 7); g.stroke(); txt(g, '$', 0, 2, F.hero(22), '#5a3f08'); g.restore(); } } }
        else { g.translate(0, 8); plant(g, theme, ik, 0.82); }
        g.restore(); tag(g, 'ILLUSTRATION', 0, y0 + h - 18, theme.inkSoft); }
    },
  });

  // ---------- investors: faceless clay figures hand envelopes toward a crown; optional TRUST/LEGIT meter; optional plain-words tag ----------
  B.register('investors', {
    defaults: { w: 920, h: 800, head: 'INVESTORS', figAt: 99999, defAt: 99999, meter: '', meterAt: 99999, mdur: 1.0, sub: 'ILLUSTRATION · FACELESS' }, size: p => [p.w, p.h],
    anchors: p => ({ head: [0, -p.h / 2 + 65, p.w, 130], figs: [0, 130, p.w * 0.9, 300], def: [0, -p.h / 2 + 260, p.w * 0.85, 240], meter: [0, -p.h / 2 + 250, p.w * 0.85, 140] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift }); band(g, theme, x0, y0, w, h, 26, p.head, 62);
      g.save(); g.translate(0, y0 + 500); drawCrown(g, theme, 0.55); g.restore();
      [-300, 0, 300].forEach((fx, i) => { const k = ease.out(clamp((t - (p.figAt + i * 0.18)) / 0.5)), a = clamp((t - (p.figAt + i * 0.18) + 0.3) / 0.2); if (a <= 0) return; g.save(); g.globalAlpha *= a; sil(g, fx, y0 + 640, 0.5);
        const ex = lerp(fx + 80, (i - 1) * 24, k), ey = lerp(y0 + 620, y0 + 500 - 20 + i * 4, k) - Math.sin(Math.PI * k) * 60; g.save(); g.translate(ex, ey); g.rotate((1 - k) * 0.3); paper(g, -42, -29, 84, 58, 6, { lift: 0.2 }); g.strokeStyle = theme.rule; g.lineWidth = 3; g.beginPath(); g.moveTo(-42, -29); g.lineTo(0, 2); g.lineTo(42, -29); g.stroke(); g.restore(); g.restore(); });
      if (p.meter) { const mk = ease.out(clamp((t - p.meterAt) / p.mdur)), mx = x0 + 70, mww = w - 140; txt(g, p.meter, mx, y0 + 215, F.hero(64), theme.ink, 'left'); g.fillStyle = theme.rule; rr(g, mx, y0 + 260, mww, 64, 32); g.fill(); if (mk > 0.01) { g.fillStyle = theme.gold; rr(g, mx, y0 + 260, Math.max(64, mww * mk), 64, 32); g.fill(); } if (mk >= 1) txt(g, 'FULL', x0 + w - 110, y0 + 292, F.cap(34), theme.ink); }
      { const r = rise(t, p.defAt, 26); if (r.on) { g.save(); g.globalAlpha = r.a; g.translate(0, y0 + 280 + r.y); g.rotate(-0.025); paper(g, -420, -105, 840, 210, 14, { fill: '#F5E6A8' }); txt(g, 'PEOPLE WHO HAND OVER MONEY', 80, -42, F.cap(34), theme.ink); txt(g, 'HOPING IT GROWS', 80, 28, F.hero(70), theme.badInk); g.save(); g.translate(-310, -4); plant(g, theme, t - p.defAt - 0.2, 0.42); g.restore(); g.restore(); } }
      tag(g, p.sub, 0, y0 + h - 20, theme.inkSoft);
    },
  });

  // ---------- ruler18: an 18-notch ruler; a clay head travels from NEWBORN to GRADUATE while AGE rolls 0 -> 18. toy: 'rattle' | 'bottle' ----------
  B.register('ruler18', {
    defaults: { w: 940, h: 640, at: 99999, dur: 1.9, toy: 'rattle', head: '18 YEARS IS…' }, size: p => [p.w, p.h],
    anchors: p => ({ num: [0, -p.h / 2 + 235, p.w * 0.8, 200], ruler: [0, 60, p.w * 0.9, 240], head: [0, -p.h / 2 + 65, p.w, 130] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift }); band(g, theme, x0, y0, w, h, 26, p.head, 60);
      const u = ease.inOut(clamp((t - p.at) / p.dur)), age = t < p.at ? 0 : Math.round(18 * u), done = t - p.at - p.dur, rx0 = -380, rx1 = 380, ry = y0 + 440;
      const o = { font: F.hero(190), size: 190, color: theme.ink, align: 'left', speed: u > 0 && u < 1 ? 8 : 0 }, nw = B.rollWidth(g, 18, o).w, sw = mw(' YEARS OLD', F.hero(60)); g.save(); g.translate(0, y0 + 270); const s = 1 + (done > 0 ? 0.1 * hit(done, 6) : 0); g.scale(s, s);
      txt(g, 'AGE', -(nw + sw) / 2 - 10, -10, F.cap(40), theme.inkSoft, 'right'); roll(g, age, -(nw + sw) / 2 + 20, 0, o); txt(g, ' YEARS', -(nw + sw) / 2 + 20 + nw, 38, F.hero(60), theme.badInk, 'left'); g.restore();
      g.strokeStyle = theme.ink; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.moveTo(rx0, ry); g.lineTo(rx1, ry); g.stroke(); for (let i = 0; i <= 18; i++) { const x = lerp(rx0, rx1, i / 18); g.strokeStyle = i <= age && t >= p.at ? theme.badInk : theme.ink; g.lineWidth = i % 6 === 0 ? 7 : 4; g.beginPath(); g.moveTo(x, ry); g.lineTo(x, ry - (i % 6 === 0 ? 40 : 24)); g.stroke(); }
      g.fillStyle = theme.badInk; rr(g, rx0, ry - 6, (rx1 - rx0) * u, 12, 6); g.fill();
      // left toy + right cap
      g.save(); g.translate(rx0 - 10, ry + 78); if (p.toy === 'bottle') { clay(g, -22, -34, 44, 72, 14, theme.paper, { shadowK: 0.3 }); g.fillStyle = theme.gold; g.beginPath(); g.ellipse(0, -44, 14, 12, 0, 0, 7); g.fill(); g.fillStyle = '#6aa0d8'; g.fillRect(-18, -4, 36, 22); } else { clay(g, -4, -10, 8, 54, 4, theme.gold, { shadowK: 0.2 }); g.fillStyle = theme.badInk; g.beginPath(); g.arc(0, -26, 28, 0, 7); g.fill(); g.fillStyle = 'rgba(255,255,255,.4)'; g.beginPath(); g.arc(-8, -34, 8, 0, 7); g.fill(); } g.restore();
      txt(g, 'NEWBORN', rx0 + 40, ry + 82, F.cap(30), theme.ink, 'left');
      g.save(); g.translate(rx1 - 6, ry + 80); { const ck = t >= p.at + p.dur - 0.1 ? spring(t - p.at - p.dur + 0.1, 'bouncy') : 0.7; g.scale(ck, ck); g.fillStyle = '#1B2430'; g.beginPath(); g.moveTo(0, -34); g.lineTo(60, -10); g.lineTo(0, 14); g.lineTo(-60, -10); g.closePath(); g.fill(); g.fillStyle = '#2c3e66'; rr(g, -32, 6, 64, 26, 8); g.fill(); g.strokeStyle = theme.gold; g.lineWidth = 4; g.beginPath(); g.moveTo(52, -8); g.lineTo(52, 30); g.stroke(); g.fillStyle = theme.gold; g.beginPath(); g.arc(52, 34, 7, 0, 7); g.fill(); } g.restore();
      txt(g, 'HIGH SCHOOL GRADUATE', rx1 - 60, ry + 82, F.cap(30), theme.ink, 'right');
      // travelling head
      { const hx = lerp(rx0, rx1, u), hy = ry - 78 - Math.abs(Math.sin(u * 30)) * (u > 0 && u < 1 ? 6 : 0); g.save(); g.translate(hx, hy); B.shadowed(g, () => { g.beginPath(); g.arc(0, 0, 38, 0, 7); }, '#E8B98A', 0.3); g.fillStyle = '#0B0F14'; for (const ex of [-13, 13]) { g.beginPath(); g.arc(ex, -4, 4.5, 0, 7); g.fill(); } g.strokeStyle = '#0B0F14'; g.lineWidth = 4; g.lineCap = 'round'; g.beginPath(); g.arc(0, 8, 13, 0.3, Math.PI - 0.3); g.stroke();
        if (u < 0.9) { g.strokeStyle = '#5a3f08'; g.lineWidth = 5; g.beginPath(); g.moveTo(0, -37); g.quadraticCurveTo(10, -58, -4, -60); g.stroke(); } else { const hk = spring(Math.max(0, (u - 0.9) / 0.1 * 0.4), 'bouncy'); g.save(); g.translate(0, -36 - 16 * (1 - hk)); g.fillStyle = '#1B2430'; g.beginPath(); g.moveTo(0, -18); g.lineTo(48, -2); g.lineTo(0, 12); g.lineTo(-48, -2); g.closePath(); g.fill(); g.fillStyle = '#2c3e66'; rr(g, -26, 6, 52, 18, 6); g.fill(); g.restore(); }
        g.restore(); }
      tag(g, 'A COMPARISON OF LENGTH ONLY · ILLUSTRATION', 0, y0 + h - 22, theme.inkSoft);
    },
  });

  // ---------- span: 1988 -> 2017 paper timeline, a crown rides it, ~30 YEARS rolls. cakesAt: birthday cakes pop along it; cmpAt: YOU 30 MINUTES vs HIM 30 YEARS bars ----------
  B.register('span', {
    defaults: { w: 960, h: 660, at: 99999, dur: 1.6, head: 'THE PRINCE ACT', cakesAt: 99999, cmpAt: 99999 }, size: p => [p.w, p.h],
    anchors: p => ({ num: [0, -p.h / 2 + 215, p.w * 0.85, 190], strip: [0, 20, p.w * 0.9, 170], cmp: [0, p.h / 2 - 140, p.w * 0.85, 200], head: [0, -p.h / 2 + 65, p.w, 130] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift }); band(g, theme, x0, y0, w, h, 26, p.head, 60);
      const sx0 = -390, sx1 = 390, sy = y0 + 345, u = ease.inOut(clamp((t - p.at) / p.dur)), done = t - p.at - p.dur;
      const o = { font: F.hero(180), size: 180, color: u >= 1 ? theme.badInk : theme.ink, prefix: '~', align: 'left', speed: u > 0 && u < 1 ? 14 : 0 }, v = t < p.at ? 0 : Math.round(30 * u), nw = B.rollWidth(g, 30, o).w, sw = mw(' YEARS', F.hero(70)), tot = nw + sw, s = 1 + (done > 0 ? 0.12 * hit(done, 6) : 0);
      g.save(); g.translate(0, y0 + 250); g.scale(s, s); roll(g, v, -tot / 2, 0, o); txt(g, ' YEARS', -tot / 2 + nw, 36, F.hero(70), theme.badInk, 'left'); if (done > 0) marker(g, -tot / 2, 80, tot, 9, theme.badInk, clamp(done / 0.3), 0.9); g.restore(); if (done > -0.05) burst(g, 0, y0 + 250, 300, theme.bad, done, 16, 0.5);
      g.strokeStyle = theme.ink; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.moveTo(sx0, sy); g.lineTo(sx1, sy); g.stroke(); for (let i = 0; i <= 29; i++) { const x = lerp(sx0, sx1, i / 29); g.lineWidth = i % 5 === 0 ? 6 : 3; g.beginPath(); g.moveTo(x, sy); g.lineTo(x, sy - (i % 5 === 0 ? 26 : 14)); g.stroke(); }
      g.fillStyle = theme.badInk; rr(g, sx0, sy - 5, (sx1 - sx0) * u, 10, 5); g.fill();
      txt(g, '1988', sx0, sy + 36, F.hero(44), theme.ink, 'center'); txt(g, '2017', sx1, sy + 36, F.hero(44), theme.ink, 'center'); txt(g, 'ARRESTED', sx1, sy + 70, F.mono(16), theme.inkSoft, 'center');
      { const cx = lerp(sx0, sx1, u); g.save(); g.translate(cx, sy - 40 - (u > 0 && u < 1 ? Math.abs(Math.sin(u * 40)) * 8 : 0)); drawCrown(g, theme, 0.28); g.restore(); }
      // birthday cakes (TikTok): stop at ~2/3 of the strip
      if (t > p.cakesAt) { const n = 8; for (let i = 0; i < n; i++) { const k = spring(Math.max(0, t - p.cakesAt - i * 0.09), 'bouncy'); if (t < p.cakesAt + i * 0.09) continue; const cx = lerp(sx0 + 20, sx0 + (sx1 - sx0) * 0.66, i / (n - 1)), cy = sy + 118; g.save(); g.translate(cx, cy); g.scale(k, k); clay(g, -24, -14, 48, 32, 6, theme.paper, { shadowK: 0.3 }); g.fillStyle = '#E86A92'; rr(g, -24, -14, 48, 12, 6); g.fill(); g.fillStyle = theme.gold; g.fillRect(-3, -34, 6, 20); g.fillStyle = theme.bad; g.beginPath(); g.ellipse(0, -39, 5, 7, 0, 0, 7); g.fill(); g.restore(); }
        const r = rise(t, p.cakesAt + 0.8, 20); if (r.on) { const ex = sx0 + (sx1 - sx0) * 0.66; g.save(); g.globalAlpha = r.a; g.translate(ex, sy + 185 + r.y); paper(g, -170, -28, 340, 56, 10, { fill: '#F5E6A8' }); txt(g, 'A LOT OF YOU: YOUR WHOLE LIFE', 0, 3, F.cap(22), theme.ink); g.restore(); } }
      // compare bars (Instagram)
      if (t > p.cmpAt) { const bx = x0 + 70, k1 = ease.out(clamp((t - p.cmpAt) / 0.3)), k2 = ease.out(clamp((t - p.cmpAt - 0.5) / 0.9)); txt(g, 'YOU', bx, sy + 118, F.hero(40), theme.ink, 'left'); g.fillStyle = theme.good; rr(g, bx + 130, sy + 98, 22 * k1, 38, 6); g.fill(); txt(g, '30 MINUTES', bx + 170, sy + 118, F.cap(30), theme.goodInk, 'left');
        txt(g, 'HIM', bx, sy + 178, F.hero(40), theme.ink, 'left'); g.fillStyle = theme.bad; rr(g, bx + 130, sy + 158, Math.max(0, (w - 340) * k2), 38, 6); g.fill(); if (k2 > 0.95) txt(g, '30 YEARS', bx + 130 + (w - 340) - 14, sy + 178, F.hero(36), theme.paper, 'right'); }
      tag(g, 'ABOUT 30 YEARS = 1988 TO THE 2017 ARREST · PER DOJ DATES', 0, y0 + h - 22, theme.inkSoft);
    },
  });

  // ---------- costume: "what a prince wears" diagram: clay silhouette + crown, a car-plate tile and a badge tile pinned on strings, FAKE stamps ----------
  B.register('costume', {
    defaults: { w: 980, h: 900, plateAt: 99999, badgeAt: 99999, fakeAt: 99999, fake2At: 99999 }, size: p => [p.w, p.h],
    anchors: p => ({ plate: [-300, 60, 300, 340], badge: [300, 60, 300, 340], fig: [0, 80, 300, 600], head: [0, -p.h / 2 + 65, p.w, 130] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift }); band(g, theme, x0, y0, w, h, 26, 'HIS COSTUME', 68);
      txt(g, 'WHAT A “PRINCE” WEARS', x0 + w - 36, y0 + 62, F.mono(24), 'rgba(245,243,238,.8)', 'right');
      const cy = y0 + 560; sil(g, 0, cy, 0.82); g.save(); g.translate(0, cy - 150 * 0.82 + 8); drawCrown(g, theme, 0.7); g.restore(); txt(g, 'NOT A PRINCE', 0, y0 + h - 80, F.mono(22), theme.inkSoft);
      const tile = (cx, at, draw, label) => { const r = t - at; if (r < -0.01) return false; const k = spring(Math.max(0, r), 'snappy'); g.save(); g.globalAlpha *= clamp(r / 0.08 + 0.2); g.translate(cx, cy - 20); g.scale(0.6 + 0.4 * k, 0.6 + 0.4 * k); paper(g, -150, -170, 300, 340, 18, { lift }); g.fillStyle = theme.bad; g.beginPath(); g.arc(0, -170, 13, 0, 7); g.fill(); draw(); txt(g, label, 0, 136, F.cap(30), theme.ink); g.restore(); return true; };
      tile(-300, p.plateAt, () => { g.save(); g.translate(0, -82); g.scale(0.3, 0.3); drawCar(g, theme, 0); g.restore(); g.save(); g.translate(0, 28); g.fillStyle = '#F5F3EE'; g.strokeStyle = theme.navy; g.lineWidth = 6; rr(g, -115, -56, 230, 112, 12); g.fill(); rr(g, -115, -56, 230, 112, 12); g.stroke(); g.fillStyle = theme.navy; g.fillRect(-109, -50, 218, 34); txt(g, 'DIPLOMAT', 0, -33, F.cap(24), theme.paper); txt(g, 'D 0 0 0 0', 0, 22, F.mono(40), theme.navy); g.restore(); txt(g, 'GENERIC PLATE', 0, 154, F.mono(13), theme.inkSoft); }, 'CAR PLATE');
      tile(300, p.badgeAt, () => { g.save(); g.translate(0, -10); shield(g, theme, 1.5); g.restore(); txt(g, 'GENERIC BADGE', 0, 154, F.mono(13), theme.inkSoft); }, 'SECURITY BADGE');
      stampT(g, t, p.fakeAt, -300, cy + 10, -0.14, 92, theme.badInk, 'FAKE'); stampT(g, t, p.fake2At, 300, cy + 10, 0.1, 92, theme.badInk, 'FAKE'); tag(g, 'ILLUSTRATION · PROPS', 0, y0 + h - 30, theme.inkSoft);
    },
  });

  // ---------- whycard: a calm, plain 3-step "why" (numbered boxes open one at a time). No art, no jokes ----------
  B.register('whycard', {
    defaults: { w: 960, h: 840, head: 'WHY IT MATTERS', sub: 'IN PLAIN WORDS', r1: ['SAUDI ROYALS', 'ARE MUSLIM'], r2: ['ISLAM FORBIDS', 'EATING PORK'], r3: ['SO HIS CHARACTER', 'WOULD NEVER ORDER IT'], a1: 99999, a2: 99999, a3: 99999 }, size: p => [p.w, p.h],
    anchors: p => ({ r1: [0, -p.h / 2 + 260, p.w * 0.9, 190], r2: [0, -p.h / 2 + 470, p.w * 0.9, 190], r3: [0, -p.h / 2 + 680, p.w * 0.9, 190], head: [0, -p.h / 2 + 65, p.w, 130] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift }); band(g, theme, x0, y0, w, h, 26, p.head, 62); txt(g, p.sub, x0 + w - 36, y0 + 62, F.mono(24), 'rgba(245,243,238,.8)', 'right');
      [[p.r1, p.a1], [p.r2, p.a2], [p.r3, p.a3]].forEach(([ls, at], i) => { const r = rise(t, at, 34); if (!r.on) return; const ry = y0 + 165 + i * 210, last = i === 2; g.save(); g.globalAlpha = r.a; g.translate(0, r.y);
        if (i > 0) { g.fillStyle = theme.inkSoft; g.beginPath(); g.moveTo(-18, ry - 30); g.lineTo(18, ry - 30); g.lineTo(0, ry - 8); g.closePath(); g.fill(); }
        paper(g, x0 + 44, ry, w - 88, 170, 16, { fill: last ? '#FBEDEB' : theme.paperShade }); if (last) { g.strokeStyle = theme.badInk; g.lineWidth = 4; rr(g, x0 + 48, ry + 4, w - 96, 162, 14); g.stroke(); }
        g.fillStyle = last ? theme.badInk : theme.navy; g.beginPath(); g.arc(x0 + 128, ry + 85, 44, 0, 7); g.fill(); txt(g, String(i + 1), x0 + 128, ry + 90, F.hero(56), theme.paper);
        txt(g, ls[0], x0 + 200, ry + 64, F.hero(56), last ? theme.badInk : theme.ink, 'left'); txt(g, ls[1], x0 + 200, ry + 126, F.hero(56), theme.ink, 'left'); g.restore(); });
    },
  });

  // ---------- pcard: gold-edged PRINCE name card (his claim). crackAt: splits down the middle; dropAt: crown slides off; stampAt: OUT OF CHARACTER stamp ----------
  B.register('pcard', {
    defaults: { w: 780, h: 500, sub: 'HIS CLAIM', crackAt: 99999, dropAt: 99999, stampAt: 99999, stampText: 'OUT OF CHARACTER' }, size: p => [p.w, p.h],
    anchors: p => ({ name: [0, 40, p.w * 0.9, 200], crown: [0, -p.h / 2 + 50, 300, 130] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, ck = t >= p.crackAt ? ease.out(clamp((t - p.crackAt) / 0.25)) : 0, split = 14 * ck;
      const card = () => { paper(g, x0, y0, w, h, 24, { lift }); g.strokeStyle = theme.gold; g.lineWidth = 16; rr(g, x0 + 16, y0 + 16, w - 32, h - 32, 14); g.stroke(); txt(g, 'PRINCE', 0, y0 + 285, F.hero(210), theme.ink); txt(g, p.sub, 0, y0 + h - 56, F.mono(26), theme.inkSoft); tag(g, 'ILLUSTRATION · PROP · NOT A REAL TITLE', 0, y0 + h - 28, theme.inkSoft);
        const du = t >= p.dropAt ? clamp((t - p.dropAt) / 0.9) : 0; if (du < 1) { const dy = 460 * ease.in(du), dx = 220 * ease.out(du), cr = 1.2 * du; g.save(); g.translate(dx, y0 + 108 + dy - (du > 0.85 ? 14 * Math.abs(Math.sin((du - 0.85) * 40)) : 0)); g.rotate(cr); drawCrown(g, theme, 0.5); g.restore(); } };
      if (ck > 0) { for (const s of [-1, 1]) { g.save(); g.translate(s * split, 0); g.rotate(s * 0.018 * ck); g.beginPath(); g.rect(s < 0 ? x0 - 40 : 0, y0 - 40, w / 2 + 40, h + 80); g.clip(); card(); g.restore(); }
        g.strokeStyle = theme.badInk; g.lineWidth = 5; g.beginPath(); g.moveTo(0, y0 + 6); for (let i = 1; i <= 8; i++) g.lineTo((i % 2 ? 1 : -1) * 16, y0 + 6 + (h - 12) * Math.min(1, ck * 8 / 8 + 0) * i / 8); g.stroke(); } else card();
      stampT(g, t, p.stampAt, 40, 30, -0.1, 86, theme.badInk, p.stampText);
    },
  });

  // ---------- skyline: paper Miami skyline, a spotlight swings to a dust-sheeted shape ----------
  B.register('skyline', {
    defaults: { w: 940, h: 640, lampAt: 99999, label: 'MIAMI' }, size: p => [p.w, p.h],
    anchors: p => ({ cover: [250, 140, 300, 220], head: [0, -p.h / 2 + 65, p.w, 130] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift }); band(g, theme, x0, y0, w, h, 26, p.label, 72);
      const base = y0 + h - 70; [[-400, 90, 250], [-300, 70, 330], [-215, 90, 210], [-120, 80, 380], [-30, 100, 290], [70, 70, 240], [150, 60, 330]].forEach(([bx, bw, bh], i) => { clay(g, bx, base - bh, bw, bh, 8, i % 2 ? '#59647a' : '#6d778c', { shadowK: 0.4 }); g.fillStyle = 'rgba(245,243,238,.5)'; for (let r = 0; r < Math.floor(bh / 46); r++) for (let c = 0; c < Math.floor(bw / 30); c++) g.fillRect(bx + 12 + c * 26, base - bh + 18 + r * 40, 10, 14); });
      const u = ease.inOut(clamp((t - p.lampAt + 0.9) / 1.3)), sx = lerp(-380, 250, u), shimmer = t > p.lampAt ? 1 : 0; g.save(); g.fillStyle = 'rgba(255,248,220,.2)'; g.beginPath(); g.moveTo(sx - 12, y0 + 130); g.lineTo(sx + 12, y0 + 130); g.lineTo(sx + 150, base); g.lineTo(sx - 150, base); g.closePath(); g.fill(); g.restore();
      // sheeted shape
      g.save(); g.translate(250, base - 4); g.fillStyle = theme.paper; g.strokeStyle = theme.rule; g.lineWidth = 3; g.beginPath(); g.moveTo(-150, 0); g.quadraticCurveTo(-150, -70, -90, -90); g.quadraticCurveTo(-30, -130, 40, -100); g.quadraticCurveTo(130, -90, 150, 0); g.closePath(); g.fill(); g.stroke(); g.strokeStyle = 'rgba(0,0,0,.12)'; for (const fx of [-70, -10, 60]) { g.beginPath(); g.moveTo(fx, -92); g.quadraticCurveTo(fx - 8, -40, fx - 4, 0); g.stroke(); } txt(g, '?', 0, -36 - 6 * Math.sin(t * 5) * shimmer, F.hero(90), theme.badInk); g.restore();
      tag(g, 'ILLUSTRATION · GENERIC SKYLINE', 0, y0 + h - 24, theme.inkSoft);
    },
  });

  // ---------- nope: a sticky note with a red X (NOT THE CAR / NOT THE BADGES) ----------
  B.register('nope', {
    defaults: { text: 'NOT THE CAR', at: 99999, w: 520 }, size: p => [p.w, 140],
    draw(g, p, env) {
      const { t, theme } = env, w = p.w; paper(g, -w / 2, -62, w, 124, 12, { fill: '#F5E6A8' }); const k = clamp((t - p.at) / 0.18); txt(g, p.text, -30, 4, F.hero(60), theme.ink);
      if (k > 0) { const s = 1 + 0.3 * hit(t - p.at, 10); g.save(); g.translate(w / 2 - 70, 0); g.scale(s, s); g.strokeStyle = theme.badInk; g.lineWidth = 14; g.lineCap = 'round'; g.beginPath(); g.moveTo(-26, -26); g.lineTo(-26 + 52 * Math.min(1, k * 2), -26 + 52 * Math.min(1, k * 2)); g.stroke(); if (k > 0.5) { g.beginPath(); g.moveTo(26, -26); g.lineTo(26 - 52 * Math.min(1, (k - 0.5) * 2), -26 + 52 * Math.min(1, (k - 0.5) * 2)); g.stroke(); } g.restore();
        g.strokeStyle = theme.badInk; g.lineWidth = 7; g.beginPath(); g.moveTo(-w / 2 + 34, 6); g.lineTo(-w / 2 + 34 + (w - 190) * clamp((t - p.at) / 0.25), 6); g.stroke(); }
    },
  });

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
// TikTok cut v3 (opens on the 11 arrests). World (px): row0 hook comp(0,0) who(1800,0) con(3600,0) pitch(5400,0) skyline(7200,0) · row1 plates(7200,1800) guards(5400,1800) investors(3600,1800) taken(1800,1800) calendar(0,1800)
// row2 costume(0,3600) span(1800,3600) tally2(3600,3600) verdict(5400,3600) ruler(7200,3600) cloche(9000,3600) why(10800,3600) pcard+diner(12600,3600)
const SB = 'side-by-side', GH = 'graphic-hero', ZN = 'zoom-on-number', PF = 'presenter-front', PK = 'peek', PB = 'pull-back';
const MUG = 'brand/photos/anthony-gignac/1.jpg';
const HOOK = { lines: [[['BUSTED ', 'paper'], ['11 TIMES', 'bad']], [['FOR THE SAME LIE', 'paper']], [['PROSECUTORS SAID', 'gold']]], sizes: [104, 76, 46] };
const MUGP = { src: MUG, name: '', credit: 'MIAMI-DADE COUNTY · PUBLIC DOMAIN', treatment: 'mugshot', w: 420, aspect: 1.0, fx: 0.74, fy: 0.4, tilt: 0.04 };
const F0 = { sx: 540, sy: 930, fill: 0.98, maxH: 960, st: { x: 540, y: 1400, s: 0.8 } };
BM2.scene({
  series: 'decoded', title: 'CASE: FAKE PRINCE · 2017', duration: 85.86,
  footnote: ['PLEADED GUILTY 2018 · SENTENCED MAY 31, 2019 · SOURCES: DOJ S.D. FLORIDA, AP', 'ABOUT 30 YEARS = 1988 TO THE 2017 ARREST · ILLUSTRATIONS / PROPS (GENERIC)', 'PHOTO: MIAMI-DADE COUNTY BOOKING PHOTO · PUBLIC DOMAIN VIA WIKIMEDIA COMMONS'],
  elements: [
    // ---- S0 frame 0 (loop target) ----
    { id: 'hook', type: 'hook', at: [0, -430], in: 0, out: '@lie+0.05', props: HOOK },
    { id: 'hook2', type: 'hook', at: [0, -430], in: '@times#3-0.2', props: HOOK },
    { id: 'tally0', type: 'tally', at: [-250, 190], scale: 0.62, in: -0.12, props: { at: -5, dur: 1.0 } },
    { id: 'tally3', type: 'tally', at: [-250, 190], scale: 0.62, in: '@times#3-0.2', props: { at: -5, dur: 1.0 } },
    { id: 'mug0', type: 'photo', at: [300, 210], scale: 0.8, in: -0.12, props: MUGP },
    { id: 'mug3', type: 'photo', at: [300, 210], scale: 0.8, in: '@times#3-0.15', props: MUGP },
    // ---- S1 who ----
    { id: 'mug2', type: 'photo', at: [1700, 30], in: '@Okay-0.35', props: { ...MUGP, name: 'ANTHONY GIGNAC', role: 'FLORIDA CON MAN', w: 450, aspect: 1.02, tilt: -0.03 } },
    { id: 'rw', type: 'text', at: [2400, 20], in: '@rewind-0.1', props: { lines: [[['REWIND', 'gold']], [['FLORIDA', 'paper']], [['CON MAN', 'bad']]], size: 96 } },
    // ---- S2 con man ----
    { id: 'con', type: 'defcard', at: [3600, 0], in: '@Now-0.2', props: { head: "WHAT'S A CON MAN?", term: 'CON MAN', d1: 'LIES SO YOU HAND OVER', d2: 'YOUR MONEY', icon: 'conman', defAt: '@lies', iconAt: '@hand' } },
    // ---- S3 his lie ----
    { id: 'quote', type: 'text', at: [5400, -400], in: '@Saudi-0.3', out: "@You'd-0.1", props: { lines: [[['HIS LIE:', 'gold']], [['“I\'M A SAUDI PRINCE”', 'paper']]], size: 64 } },
    { id: 'pc', type: 'pcard', at: [5400, 70], in: '@His-0.3', props: { sub: 'HIS LIE · NOT TRUE' } },
    // ---- S4 Miami ----
    { id: 'sky', type: 'skyline', at: [7200, 0], in: "@You'd-0.4", props: { lampAt: '@Miami' } },
    // ---- steps ----
    { id: 'plates', type: 'plates', at: [7200, 1800], in: '@Step-0.5', props: { rollAt: '@Ferrari+0.1', checkAt: '@plates', peelAt: 99999, fakeAt: 99999 } },
    { id: 'guards', type: 'guards', at: [5400, 1800], in: '@Step#2-0.5', props: { flipAt: '@diplomatic#2', checkAt: '@badges', fakeAt: 99999 } },
    { id: 'inv', type: 'investors', at: [3600, 1800], in: '@So#2-0.3', props: { head: 'STEP 3 · INVESTORS', figAt: '@investors', meter: 'TRUST', meterAt: '@trust', mdur: 0.9 } },
    { id: 'taken', type: 'taken', at: [1800, 1800], in: '@ended-0.4', props: { at: '@8', dur: 1.3, brickAt: '@ended' } },
    { id: 'cal', type: 'calendar', at: [0, 1800], in: '@Blow-0.4', props: { at: '@Blow+0.2', dur: 1.7, yrsAt: '@22', yrsDur: 0.9, to: 22 } },
    // ---- costume ----
    { id: 'cos', type: 'costume', at: [0, 3600], in: '@But#2-0.3', props: { plateAt: '@But#2', badgeAt: '@But#2+0.3', fakeAt: '@fake', fake2At: '@badges#2' } },
    // ---- 30 years / cakes ----
    { id: 'span', type: 'span', at: [1800, 3600], in: '@kept-0.5', props: { head: 'HE KEPT IT GOING', at: '@kept', dur: 1.6, cakesAt: '@Yes+0.2' } },
    // ---- recount, verdict, 18 years ----
    { id: 'tally2', type: 'tally', at: [3600, 3600], in: '@Remember-0.4', props: { at: '@arrested', dur: 1.0, tabAt: '@prosecutors#2', srcAt: '@said' } },
    { id: 'verdict', type: 'verdict', at: [5400, 3600], in: '@pleaded-0.4', props: { guiltyAt: '@guilty', yearsAt: '@18', subAt: '@prison' } },
    { id: 'rul', type: 'ruler18', at: [7200, 3600], in: "@That's-0.4", props: { at: '@baby', dur: 2.0, toy: 'bottle' } },
    // ---- the slip ----
    { id: 'cloche2', type: 'cloche', at: [9000, 3640], in: '@So#4-0.4', props: { liftAt: '@ordered+0.2', closeAt: 99999 } },
    { id: 'why', type: 'whycard', at: [10800, 3600], in: '@Problem-0.4', props: { head: 'THE PROBLEM', a1: '@Saudi#2', a2: '@Islam', a3: '@So#6', r3: ['SO HIS CHARACTER', 'WOULD NEVER TOUCH IT'] } },
    { id: 'pc2', type: 'pcard', at: [12580, 3480], in: '@victim-0.55', props: { sub: 'HIS CHARACTER', stampAt: '@victim-0.1', dropAt: '@suspicious' } },
    { id: 'diner', type: 'diner', at: [13320, 3820], scale: 0.8, in: '@victim-0.5', props: { at: '@victim', tagAt: '@noticed' } },
    // ---- screen overlays ----
    { id: 'rwt', type: 'text', layer: 'screen', at: [540, 440], in: '@rewind', out: '@Now-0.1', props: { lines: [[['OKAY, REWIND', 'gold']]], size: 78 } },
    { id: 'nobuy', type: 'text', layer: 'screen', at: [540, 440], in: "@You'd", out: '@look-0.1', props: { lines: [[['NOBODY BUYS THAT…', 'paper']], [['RIGHT?', 'gold']]], size: 74 } },
    { id: 'miami', type: 'text', layer: 'screen', at: [540, 440], in: '@look', out: '@Step-0.15', props: { lines: [[['LOOK WHAT', 'paper']], [['MIAMI SAW', 'gold']]], size: 74 } },
    { id: 'stepA', type: 'text', layer: 'screen', at: [540, 440], in: '@Step', out: '@Step#2-0.15', props: { lines: [[['STEP 1', 'gold']], [['PLATES FOREIGN OFFICIALS GET', 'paper']]], size: 56 } },
    { id: 'stepB', type: 'text', layer: 'screen', at: [540, 440], in: '@Step#2', out: '@Tap-0.15', props: { lines: [[['STEP 2', 'gold']], [['LIKE ACTUAL GOVERNMENT AGENTS', 'paper']]], size: 56 } },
    { id: 'bought', type: 'text', layer: 'screen', at: [540, 440], in: "@you'd", out: '@So#2-0.2', props: { lines: [[["YOU'D HAVE ", 'paper'], ['BOUGHT IT', 'gold']]], size: 66 } },
    { id: 'heart', type: 'heart', layer: 'screen', at: [800, 930], in: '@hard-0.05', out: '@hard+1.15', props: { s: 1 } },
    { id: 'plane', type: 'plane', layer: 'screen', at: [540, 960], in: '@Send-0.05', out: '@Send+1.2', props: { dur: 0.9, from: [-230, 250], to: [280, -330], s: 1.5 } },
    { id: 'sendtx', type: 'text', layer: 'screen', at: [820, 440], in: '@Send+0.15', out: '@Send+1.2', props: { lines: [[['SEND', 'gold']]], size: 70 } },
    { id: 'slipq', type: 'text', layer: 'screen', at: [540, 440], in: '@So#4', out: '@Follow-0.1', props: { lines: [[['SO HOW DID HE', 'paper']], [['FINALLY SLIP UP?', 'gold']]], size: 74 } },
    { id: 'mag', type: 'mag', layer: 'screen', at: [830, 1010], in: '@Follow-0.05', out: '@Follow+1.45', props: { press: 0.5 } },
    { id: 'btn', type: 'follow', layer: 'screen', at: [830, 1010], scale: 0.8, in: '@Follow-0.05', out: '@Follow+1.45', props: { press: 0.5 } },
    { id: 'dumbtx', type: 'text', layer: 'screen', at: [540, 440], in: '@answers-0.1', out: '@At-0.05', props: { lines: [[['THE ANSWER IS', 'paper']], [['SO DUMB…', 'bad']]], size: 84 } },
    { id: 'ask', type: 'bubble', layer: 'screen', at: [600, 1090], in: '@dumber', out: '@times#3-0.3', props: { l1: "WHAT'S DUMBER?", l2: 'PORK OR 11 TIMES?', size: 46, tail: 'left' } },
    { id: 'hud', type: 'hud', layer: 'screen', at: [0, 0], in: -1, props: {
      labels: [{ at: -1, text: 'THE PITCH' }, { at: '@Step-0.25', text: 'THE PROPS' }, { at: '@So#2-0.2', text: 'THE MONEY' }, { at: '@kept-0.25', text: 'THE SENTENCE' }, { at: '@So#4-0.2', text: 'THE SLIP' }],
      items: [{ at: 0, label: 'ARRESTED OR CONVICTED', from: 0, to: 11, dur: 0.9, suffix: '×' }, { at: '@Okay', label: 'ROYAL BLOOD', to: 0, dur: 0.5 }, { at: '@Step', label: 'PROPS SO FAR', to: 1, dur: 0.4 }, { at: '@Step#2', label: 'PROPS SO FAR', to: 2, dur: 0.4 },
        { at: '@ended', label: 'INVESTORS LOST (MORE THAN)', from: 0, to: 8000000, dur: 1.5, prefix: '$' }, { at: '@Blow+0.2', label: 'DAYS AT $1,000', from: 0, to: 8000, dur: 1.9, suffix: ' DAYS' }, { at: '@22', label: 'THAT IS', to: 22, dur: 0.8, suffix: ' YEARS' },
        { at: '@fake', label: 'PROPS THAT WERE REAL', to: 0, dur: 0.5 }, { at: '@kept', label: 'YEARS OF THE ACT', from: 0, to: 30, dur: 1.7, prefix: '~' }, { at: '@arrested', label: 'ARRESTED OR CONVICTED', from: 0, to: 11, dur: 1.0, suffix: '×' }, { at: '@18', label: 'YEARS IN PRISON', from: 0, to: 18, dur: 0.7, suffix: '+' },
        { at: '@pork', label: 'DINNER ORDERS THAT BLEW IT', to: 1, dur: 0.4 }, { at: '@times#3-0.2', label: 'ARRESTED OR CONVICTED', to: 11, dur: 0.5, suffix: '×' }] } },
  ],
  beats: [
    { at: 0, beat: SB, focus: ['hook', 'tally0', 'mug0'], ...F0, pose: 'shock' },
    { at: '@11', beat: ZN, focus: ['hook', 'tally0', 'mug0'], sx: 540, sy: 930, fill: 1.06, maxH: 960, st: F0.st, dur: 0.45 },
    { at: '@same', beat: SB, focus: ['hook', 'tally0', 'mug0'], ...F0, pose: 'shock', dur: 0.6 },
    // rewind: who
    { at: '@Okay', beat: SB, focus: ['mug2', 'rw'], move: 'whip', sx: 540, sy: 850, fill: 0.9, maxH: 1000, st: 'corner-left', pose: 'shrug' },
    { at: '@Anthony', beat: ZN, focus: 'mug2.name', fill: 0.5, maxH: 300, sy: 1010, st: 'corner-left', pose: 'point', dur: 0.45 },
    // con man
    { at: '@Now', beat: SB, focus: 'con', move: 'whip', sx: 540, sy: 880, fill: 0.74, maxH: 880, st: 'left', pose: 'point' },
    { at: '@con#2', beat: ZN, focus: 'con.term', fill: 0.8, maxH: 300, sy: 680, st: 'corner-left', pose: 'point', dur: 0.45 },
    { at: '@lies', beat: GH, focus: 'con', sy: 880, fill: 0.78, maxH: 880, st: 'corner-left', pose: 'talk', dur: 0.7 },
    { at: '@hand', beat: ZN, focus: 'con.icon', fill: 0.78, maxH: 380, sy: 840, st: 'corner', pose: 'point', dur: 0.5 },
    { at: '@money', beat: GH, focus: 'con', fill: 0.78, maxH: 880, sy: 880, st: 'peek', pose: 'chin', dur: 0.8 },
    // his lie
    { at: '@His', beat: SB, focus: ['pc', 'quote'], move: 'whip', sx: 540, sy: 820, fill: 0.78, maxH: 1000, st: 'left', pose: 'shock' },
    { at: '@Saudi', beat: ZN, focus: 'quote', fill: 0.9, maxH: 300, sy: 640, st: 'corner-left', pose: 'point', dur: 0.45 },
    { at: '@prince', beat: GH, focus: ['pc', 'quote'], sy: 800, fill: 0.78, maxH: 1000, st: 'corner-left', pose: 'idle', dur: 0.7 },
    // miami
    { at: "@You'd", beat: SB, focus: 'sky', move: 'whip', sx: 540, sy: 880, fill: 0.78, maxH: 800, st: 'left', pose: 'shrug' },
    { at: '@look', beat: ZN, focus: 'sky.cover', fill: 0.5, maxH: 420, sy: 930, st: 'corner-left', pose: 'point', dur: 0.5 },
    { at: '@Miami', beat: GH, focus: 'sky', sy: 880, fill: 0.8, maxH: 800, st: 'corner-left', pose: 'shock', dur: 0.7 },
    // step 1
    { at: '@Step', beat: SB, focus: 'plates', move: 'whip', sx: 540, sy: 840, fill: 0.84, maxH: 800, st: 'corner-left', pose: 'point' },
    { at: '@Ferrari', beat: ZN, focus: 'plates.car', fill: 0.42, maxH: 400, sy: 990, st: 'corner-left', pose: 'point', dur: 0.5 },
    { at: '@diplomatic', beat: ZN, focus: 'plates.plate', fill: 0.4, maxH: 440, sy: 990, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@special', beat: GH, focus: 'plates', sy: 840, fill: 0.84, maxH: 800, st: 'corner-left', pose: 'talk', dur: 0.7 },
    // step 2
    { at: '@Step#2', beat: SB, focus: 'guards', move: 'whip', sx: 540, sy: 840, fill: 0.84, maxH: 800, st: 'corner-left', pose: 'point' },
    { at: '@bodyguards', beat: ZN, focus: 'guards', fill: 0.84, maxH: 640, sy: 900, st: 'corner-left', pose: 'point', dur: 0.5 },
    { at: '@badges', beat: ZN, focus: 'guards.badges', fill: 0.8, maxH: 480, sy: 960, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@actual', beat: GH, focus: 'guards', sy: 840, fill: 0.84, maxH: 800, st: 'corner', pose: 'talk', dur: 0.7 },
    { at: '@Tap', beat: PF, focus: 'guards', sy: 790, pose: 'shrug' },
    // step 3 investors trust
    { at: '@So#2', beat: SB, focus: 'inv', move: 'whip', sx: 540, sy: 860, fill: 0.86, maxH: 860, st: 'left', pose: 'point' },
    { at: '@investors', beat: ZN, focus: 'inv.figs', fill: 0.9, maxH: 440, sy: 920, st: 'corner', pose: 'point', dur: 0.5 },
    { at: '@trust', beat: ZN, focus: 'inv.meter', fill: 0.8, maxH: 300, sy: 900, st: 'corner-left', pose: 'point', dur: 0.45 },
    { at: '@money#2', beat: GH, focus: 'inv', sy: 860, fill: 0.86, maxH: 860, st: 'corner-left', pose: 'talk', dur: 0.7 },
    // $8M
    { at: '@ended', beat: SB, focus: 'taken', move: 'whip', sx: 540, sy: 800, fill: 0.9, maxH: 900, st: 'corner-left', pose: 'point' },
    { at: '@8', beat: ZN, focus: 'taken.value', fill: 0.9, maxH: 560, sy: 780, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@bucks', beat: GH, focus: 'taken', sy: 800, fill: 0.9, maxH: 900, st: 'corner-left', pose: 'shock', dur: 0.8 },
    // $1,000 a day
    { at: '@Blow', beat: SB, focus: 'cal', move: 'whip', sx: 540, sy: 860, fill: 0.72, maxH: 850, st: 'left', pose: 'point' },
    { at: '@grand', beat: ZN, focus: 'cal.head', fill: 0.8, maxH: 300, sy: 600, st: 'corner', pose: 'point', dur: 0.45 },
    { at: '@every', beat: GH, focus: 'cal', sy: 860, fill: 0.72, maxH: 850, st: 'corner-left', dur: 0.7 },
    { at: '@22', beat: ZN, focus: 'cal.years', fill: 0.8, maxH: 420, sy: 850, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@years+0.25', beat: GH, focus: 'cal', sy: 860, fill: 0.72, maxH: 850, st: 'corner-left', pose: 'idle', dur: 0.8 },
    // costume: fake
    { at: '@But#2', beat: SB, focus: 'cos', move: 'whip', sx: 540, sy: 860, fill: 0.84, maxH: 880, st: 'left', pose: 'point' },
    { at: '@plates#3', beat: ZN, focus: 'cos.plate', fill: 0.28, maxH: 520, sy: 930, st: 'corner', pose: 'point', dur: 0.45 },
    { at: '@badges#2', beat: ZN, focus: 'cos.badge', fill: 0.28, maxH: 520, sy: 930, st: 'corner-left', pose: 'shock', dur: 0.45 },
    { at: '@badges#2+0.7', beat: GH, focus: 'cos', sy: 860, fill: 0.8, maxH: 880, st: 'corner-left', pose: 'idle', dur: 0.8 },
    { at: '@Send', beat: PF, focus: 'cos', sy: 790, pose: 'talk' },
    { at: '@trusts', beat: PF, focus: 'cos', sy: 790, zoom: 1.06, pose: 'shrug', dur: 0.5 },
    // thirty years + cakes
    { at: '@kept', beat: SB, focus: 'span', move: 'whip', sx: 540, sy: 860, fill: 0.84, maxH: 760, st: 'left', pose: 'point' },
    { at: '@30', beat: ZN, focus: 'span.num', fill: 0.8, maxH: 420, sy: 800, st: 'corner', pose: 'shock', dur: 0.5 },
    { at: '@years#2+0.3', beat: GH, focus: 'span', sy: 860, fill: 0.84, maxH: 760, st: 'corner-left', pose: 'idle', dur: 0.8 },
    { at: '@Yes', beat: GH, focus: 'span', sy: 860, fill: 0.84, maxH: 760, st: 'corner-left', pose: 'you', dur: 0.6 },
    { at: '@alive-0.3', beat: ZN, focus: 'span.strip', fill: 0.9, maxH: 420, sy: 900, st: 'corner', pose: 'shrug', dur: 0.5 },
    // recount 11
    { at: '@Remember', beat: PK, focus: 'tally2', move: 'whip', sy: 800, fill: 0.9, maxH: 860, pose: 'chin' },
    { at: '@arrested', beat: GH, focus: 'tally2', sy: 800, fill: 0.9, maxH: 860, st: 'corner-left', pose: 'point', dur: 0.7 },
    { at: '@11#2', beat: ZN, focus: 'tally2.num', fill: 0.8, maxH: 520, sy: 880, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@royalty', beat: PB, focus: 'tally2', fill: 0.86, maxH: 860, sy: 800, st: 'corner-left', dur: 0.6 },
    // verdict
    { at: '@pleaded', beat: SB, focus: 'verdict', move: 'whip', sx: 540, sy: 880, fill: 0.9, maxH: 920, st: 'corner-left', pose: 'shock' },
    { at: '@guilty', beat: ZN, focus: 'verdict.guilty', fill: 0.85, maxH: 420, sy: 800, st: 'corner-left', pose: 'shock', dur: 0.45 },
    { at: '@18', beat: ZN, focus: 'verdict.years', fill: 0.72, maxH: 640, sy: 900, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@prison', beat: GH, focus: 'verdict', sy: 880, fill: 0.9, maxH: 920, st: 'corner-left', pose: 'idle', dur: 0.8 },
    // baby -> graduation
    { at: "@That's", beat: SB, focus: 'rul', move: 'whip', sx: 540, sy: 860, fill: 0.84, maxH: 760, st: 'left', pose: 'point' },
    { at: '@growing', beat: ZN, focus: 'rul.num', fill: 0.7, maxH: 420, sy: 760, st: 'corner', pose: 'point', dur: 0.5 },
    { at: '@graduation', beat: GH, focus: 'rul', sy: 860, fill: 0.84, maxH: 760, st: 'corner-left', pose: 'shock', dur: 0.7 },
    // the slip
    { at: '@So#4', beat: SB, focus: 'cloche2', move: 'whip', sx: 540, sy: 850, fill: 0.8, maxH: 760, st: 'corner-left', pose: 'chin' },
    { at: '@finally', beat: GH, focus: 'cloche2', sy: 850, fill: 0.84, maxH: 760, st: 'corner-left', pose: 'point', dur: 0.8 },
    { at: '@Follow', beat: PF, focus: 'cloche2', sy: 820, pose: 'talk' },
    { at: '@answers', beat: GH, focus: 'cloche2', sy: 860, fill: 0.84, maxH: 760, st: 'peek', pose: 'idle', dur: 0.8 },
    { at: '@At', beat: GH, focus: 'cloche2', fill: 0.88, maxH: 760, sy: 840, st: 'corner-left', pose: 'idle', dur: 1.0 },
    { at: '@pork', beat: ZN, focus: 'cloche2.ticket', fill: 0.78, maxH: 600, sy: 900, st: 'corner-left', pose: 'shock', dur: 0.45 },
    // why
    { at: '@Problem', beat: SB, focus: 'why', move: 'whip', sx: 540, sy: 880, fill: 0.9, maxH: 940, st: 'left', pose: 'point' },
    { at: '@Saudi#2', beat: ZN, focus: 'why.r1', fill: 0.84, maxH: 320, sy: 780, st: 'corner-left', pose: 'point', dur: 0.45 },
    { at: '@Islam', beat: ZN, focus: 'why.r2', fill: 0.84, maxH: 320, sy: 800, st: 'corner-left', pose: 'point', dur: 0.45 },
    { at: '@forbids', beat: GH, focus: 'why', sy: 880, fill: 0.9, maxH: 940, st: 'corner-left', pose: 'talk', dur: 0.7 },
    { at: '@So#6', beat: ZN, focus: 'why.r3', fill: 0.7, maxH: 320, sy: 1000, st: 'corner-left', pose: 'point', dur: 0.45 },
    // victim
    { at: '@victim-0.15', beat: SB, focus: ['pc2', 'diner'], move: 'whip', sx: 540, sy: 860, fill: 0.92, maxH: 920, st: 'corner-left', pose: 'shock' },
    { at: '@suspicious', beat: ZN, focus: 'pc2', fill: 0.78, maxH: 520, sy: 800, st: 'corner-left', pose: 'shock', dur: 0.45 },
    { at: "@what's", beat: PF, focus: ['pc2', 'diner'], sy: 860, pose: 'talk' },
    { at: '@times#3-0.1', beat: SB, focus: ['hook2', 'tally3', 'mug3'], move: 'whip', ...F0, pose: 'shock' },
  ],
  poses: [['@Follow-0.1', 'follow', { target: [830, 1010] }], ['@Follow+1.5', 'talk']],
  shakes: [[0.05, 14], ['@8+1.3', 10], ['@fake', 8], ['@11#2', 14], ['@guilty', 14], ['@18', 12], ['@pork', 26], ['@suspicious', 10]],
  captions: {
    emph: { '8': 'bad', million: 'bad', fake: 'bad', '11': 'bad', '18': 'bad', pork: 'bad', '30': 'accent', '22': 'accent', royalty: 'accent', dumber: 'bad', dumb: 'bad', 'dumbest': 'bad' },
    fix: [['than 8 million', 'than $8 million'], ["how'd he how this dumbest", "how'd he— how'd this dumbass"], ['Follow the', 'Follow, the'], ['answer so dumb.', "answer's so dumb."], ['dumber the pork', 'dumber, the pork']],
    gap: 16,
  },
  bed: { name: 'tense_bed_2', gain: -1 },
  sfx: [
    { at: 0, name: 'deep_boom_2', gain: -3, dur: 0.5 }, { at: 0.06, name: 'rubber_stamp_2', gain: -6, dur: 0.5 }, { at: 0.16, name: 'paper_slam_2', gain: -8, dur: 0.5 },
    { at: '@11', name: 'thud_1', gain: -9, dur: 0.4 },
    { at: '@Okay', name: 'rewind_2', gain: -11, dur: 0.7 }, { at: '@Anthony', name: 'click_1', gain: -8, dur: 0.3 },
    { at: '@Now', name: 'swipe_2', gain: -11, dur: 0.4 }, { at: '@lies', name: 'pop_1', gain: -9, dur: 0.4 },
    { at: '@His', name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@Saudi', name: 'click_1', gain: -8, dur: 0.3 },
    { at: "@You'd", name: 'swipe_2', gain: -11, dur: 0.4 }, { at: '@Miami', name: 'pop_2', gain: -9, dur: 0.4 },
    { at: '@Ferrari+0.1', name: 'swoosh_2', gain: -10, dur: 0.9 }, { at: '@plates', name: 'ding_2', gain: -10, dur: 0.6 }, { at: '@diplomatic#2', name: 'click_2', gain: -8, dur: 0.3 }, { at: '@badges', name: 'ding_2', gain: -10, dur: 0.6 },
    { at: '@hard', name: 'heartbeat_1', gain: -8, dur: 0.9 },
    { at: '@investors', name: 'pop_2', gain: -10, dur: 0.4 }, { at: '@trust', name: 'money_counter_2', gain: -13, dur: 0.9 },
    { at: '@ended', name: 'coins_drop_1', gain: -12, dur: 1.2 }, { at: '@8', name: 'money_counter_2', gain: -10, dur: 1.3 }, { at: '@8+1.3', name: 'cash_register_1', gain: -8, dur: 0.9 },
    { at: '@Blow+0.2', name: 'money_counter_2', gain: -13, dur: 1.2 }, { at: '@22', name: 'ding_2', gain: -9, dur: 0.7 },
    { at: '@But#2', name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@fake', name: 'rubber_stamp_2', gain: -5, dur: 0.5 }, { at: '@badges#2', name: 'rubber_stamp_2', gain: -5, dur: 0.5 },
    { at: '@Send', name: 'swoosh_2', gain: -9, dur: 1.0 },
    { at: '@kept', name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@30', name: 'deep_boom_2', gain: -7, dur: 0.4 }, { at: '@Yes+0.2', name: 'pop_2', gain: -10, dur: 0.4 },
    { at: '@Remember', name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@arrested', name: 'typewriter_1', gain: -12, dur: 1.0 }, { at: '@11#2', name: 'deep_boom_2', gain: -6, dur: 0.4 }, { at: '@said', name: 'rubber_stamp_2', gain: -8, dur: 0.5 },
    { at: '@guilty', name: 'gavel_1', gain: -4, dur: 0.8 }, { at: '@18', name: 'money_counter_2', gain: -11, dur: 0.7 }, { at: '@18+0.7', name: 'thud_1', gain: -8, dur: 0.4 },
    { at: "@That's", name: 'swipe_2', gain: -11, dur: 0.4 }, { at: '@graduation', name: 'success_chime_1', gain: -14, dur: 1.0 },
    { at: '@So#4', name: 'riser_2', gain: -13, dur: 1.4 },
    { at: '@Follow+0.5', name: 'click_1', gain: -8, dur: 0.3 }, { at: '@Follow+0.58', name: 'success_chime_1', gain: -12, dur: 1.0 },
    { at: '@ordered+0.2', name: 'cinematic_hit_1', gain: -3, dur: 1.2 }, { at: '@pork', name: 'deep_boom_1', gain: -3, dur: 1.4 },
    { at: '@Problem', name: 'swipe_2', gain: -11, dur: 0.4 }, { at: '@Saudi#2', name: 'pop_1', gain: -10, dur: 0.4 }, { at: '@Islam', name: 'pop_1', gain: -10, dur: 0.4 }, { at: '@So#6', name: 'click_1', gain: -9, dur: 0.3 },
    { at: '@victim-0.1', name: 'rubber_stamp_2', gain: -7, dur: 0.5 }, { at: '@victim', name: 'pop_1', gain: -8, dur: 0.5 }, { at: '@suspicious', name: 'thud_1', gain: -8, dur: 0.4 },
    { at: '@dumber', name: 'pop_1', gain: -9, dur: 0.5 }, { at: '@times#3-0.1', name: 'thud_1', gain: -8, dur: 0.4 }, { at: '@times#3-0.1', name: 'paper_slam_2', gain: -8, dur: 0.5 },
  ],
});
