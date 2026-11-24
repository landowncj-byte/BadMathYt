// CHAPTER 2 — MORE OIL THAN AMERICA (P21-P33). Dark case-file, oil gold / water blue. All beats keyed to W(paragraph, word).
Engine.chapter(2, () => {
  const OIL1 = '#FFC83D', OIL2 = '#D98A00', WAT1 = '#2B8CE0', WAT2 = '#0A3460';
  const GOLDT = 'rgba(255,200,61,.05)', BLUET = 'rgba(43,140,224,.10)', REDT = 'rgba(255,59,48,.06)';
  const fmtN = n => Math.round(n).toLocaleString('en-US');

  // ---------- local drawing helpers (ported from the salad-oil short, re-laid-out) ----------
  function ctank(c, x, y, w, h, o = {}) { // cutaway tank, (x,y) = top-left. fill = liquid level 0..1, oil = fraction of liquid that is oil
    const { fill = 1, oil = 1, xray = 0, t = 0, label = null, glw = 0, compartment = 0, bubbles = 1, labelColor = PAPER } = o;
    c.save();
    if (glw > 0) glow(c, x + w / 2, y + h / 2, w * 1.1, 'rgba(255,200,61,1)', .35 * glw);
    const r = w * .1, sg = c.createLinearGradient(x, 0, x + w, 0);
    sg.addColorStop(0, '#2a323d'); sg.addColorStop(.18, '#5b6573'); sg.addColorStop(.5, '#3a434f'); sg.addColorStop(.85, '#5b6573'); sg.addColorStop(1, '#1d232b');
    rr(c, x, y, w, h, [r * 1.6, r * 1.6, r * .4, r * .4]); c.fillStyle = sg; c.fill();
    const ix = x + w * .07, iy = y + h * .06, iw = w * .86, ih = h * .9;
    c.save(); rr(c, ix, iy, iw, ih, [r, r, r * .3, r * .3]); c.clip(); c.fillStyle = '#0d1117'; c.fillRect(ix, iy, iw, ih);
    const lvl = iy + ih * (1 - fill), oilTop = lvl, oilBot = lvl + ih * fill * oil;
    const wave = (px, amp, ph) => Math.sin(px * .018 + t * 3.1 + ph) * amp + Math.sin(px * .041 - t * 2.3) * amp * .5;
    if (oil < 1 && fill > 0) {
      const wg = c.createLinearGradient(0, oilBot, 0, iy + ih); wg.addColorStop(0, WAT1); wg.addColorStop(1, WAT2);
      c.fillStyle = wg; c.beginPath(); c.moveTo(ix, iy + ih); for (let px = 0; px <= iw; px += 12) c.lineTo(ix + px, oilBot + wave(px, 4, 1.7)); c.lineTo(ix + iw, iy + ih); c.closePath(); c.fill();
      if (bubbles) for (let i = 0; i < 24; i++) { const bx = ix + hash(i) * iw, sp = 40 + hash(i + 9) * 80, by = iy + ih - ((t * sp + hash(i + 3) * ih) % Math.max(10, iy + ih - oilBot)); if (by > oilBot + 6) { c.beginPath(); c.arc(bx + Math.sin(t * 3 + i) * 5, by, 3 + hash(i + 5) * 6, 0, 7); c.strokeStyle = 'rgba(200,235,255,.55)'; c.lineWidth = 2; c.stroke(); } }
    }
    if (oil > 0 && fill > 0) {
      const og = c.createLinearGradient(0, oilTop, 0, oilBot + 2); og.addColorStop(0, OIL1); og.addColorStop(1, OIL2);
      c.fillStyle = og; c.beginPath(); c.moveTo(ix, oilBot + wave(0, 4, 1.7));
      for (let px = 0; px <= iw; px += 12) c.lineTo(ix + px, oilTop + wave(px, 6, 0));
      for (let px = iw; px >= 0; px -= 12) c.lineTo(ix + px, oilBot + (oil < 1 ? wave(px, 4, 1.7) : 40));
      c.closePath(); c.fill();
      c.globalAlpha = .35; c.fillStyle = '#fff6d0'; for (let i = 0; i < 4; i++) c.fillRect(ix + iw * (.1 + i * .22) + Math.sin(t * 2 + i) * 14, oilTop + 12 + i * 6, iw * .1, 4); c.globalAlpha = 1;
    }
    if (compartment > 0) {
      const cw = iw * .26, cx = ix + iw / 2 - cw / 2;
      c.globalAlpha = compartment; c.fillStyle = OIL2; c.fillRect(cx, iy, cw, ih * .55); c.fillStyle = OIL1; c.fillRect(cx + 6, iy, cw - 12, ih * .55);
      c.setLineDash([18, 12]); c.lineDashOffset = -t * 60; c.strokeStyle = RED; c.lineWidth = 7; c.strokeRect(cx - 4, iy - 8, cw + 8, ih * .55 + 12); c.setLineDash([]); c.globalAlpha = 1;
    }
    if (xray > 0) { c.globalAlpha = xray * .22; c.fillStyle = '#7fd4ff'; for (let yy = iy; yy < iy + ih; yy += 10) c.fillRect(ix, yy + (t * 80 % 10), iw, 2); c.globalAlpha = 1; }
    c.restore();
    c.strokeStyle = '#8b96a5'; c.lineWidth = 5; rr(c, x, y, w, h, [r * 1.6, r * 1.6, r * .4, r * .4]); c.stroke();
    c.fillStyle = '#1d232b'; for (let i = 0; i < 6; i++) { c.beginPath(); c.arc(x + w * .035, y + h * (.12 + i * .14), 4, 0, 7); c.fill(); c.beginPath(); c.arc(x + w * .965, y + h * (.12 + i * .14), 4, 0, 7); c.fill(); }
    rr(c, x + w * .38, y - h * .045, w * .24, h * .06, 8); c.fillStyle = '#5b6573'; c.fill();
    if (label) { const fs = Math.max(20, Math.round(w * .085)); c.font = `800 ${fs}px JBM`; const tw = c.measureText(label).width + 30; rr(c, x + w / 2 - tw / 2, y + h + 14, tw, fs * 1.7, 10); c.fillStyle = 'rgba(11,15,20,.88)'; c.fill(); txt(c, label, x + w / 2, y + h + 14 + fs * .85, `800 ${fs}px JBM`, labelColor); }
    c.restore();
  }
  function bankIc(c, x, y, s, color) {
    c.fillStyle = color; c.beginPath(); c.moveTo(x - s * .55, y - s * .25); c.lineTo(x, y - s * .55); c.lineTo(x + s * .55, y - s * .25); c.closePath(); c.fill();
    for (let i = 0; i < 4; i++) c.fillRect(x - s * .42 + i * s * .26, y - s * .2, s * .1, s * .5);
    c.fillRect(x - s * .55, y + s * .32, s * 1.1, s * .1);
  }
  function bill(c, x, y, w, rot, a = 1) { c.save(); c.translate(x, y); c.rotate(rot); c.globalAlpha = a; rr(c, -w / 2, -w * .21, w, w * .42, 4); c.fillStyle = '#cfe3c6'; c.fill(); c.strokeStyle = '#2f6a3a'; c.lineWidth = w * .05; c.stroke(); c.beginPath(); c.ellipse(0, 0, w * .12, w * .15, 0, 0, 7); c.fillStyle = '#3d7a46'; c.fill(); c.restore(); }
  function person(c, x, y, s, color, light = 0, t = 0, dir = 1) { // inspector silhouette (x,y = feet). dir=1 beam to the right, -1 to the left
    c.save(); c.translate(x, y); c.scale(dir, 1); x = 0; y = 0;
    c.fillStyle = color; c.beginPath(); c.arc(x, y - s * .78, s * .16, 0, 7); c.fill(); rr(c, x - s * .22, y - s * .58, s * .44, s * .58, s * .12); c.fill();
    c.fillRect(x - s * .2, y - s * .04, s * .14, s * .36); c.fillRect(x + s * .06, y - s * .04, s * .14, s * .36);
    rr(c, x - s * .26, y - s * .92, s * .52, s * .08, 4); c.fill(); rr(c, x - s * .16, y - s * 1.02, s * .32, s * .14, 6); c.fill();
    if (light > 0) { c.globalAlpha = light * .55; const g = c.createLinearGradient(x, y - s * .3, x + s * 1.4, y + s * 1.6); g.addColorStop(0, 'rgba(255,240,180,.95)'); g.addColorStop(1, 'rgba(255,240,180,0)'); c.fillStyle = g; c.beginPath(); c.moveTo(x + s * .25, y - s * .35); c.lineTo(x + s * 1.6 + Math.sin(t * 2) * 20, y - s * 1.2); c.lineTo(x + s * 1.7, y - s * .2); c.closePath(); c.fill(); }
    c.restore();
  }
  function check(c, x, y, s, col, k = 1) { if (k <= 0) return; c.save(); c.strokeStyle = col; c.lineWidth = s * .16; c.lineCap = 'round'; c.lineJoin = 'round'; c.beginPath(); c.moveTo(x - s * .5, y); const a = Math.min(1, k * 2), b = Math.max(0, k * 2 - 1); c.lineTo(lerp(x - s * .5, x - s * .15, a), lerp(y, y + s * .4, a)); if (b > 0) c.lineTo(lerp(x - s * .15, x + s * .55, b), lerp(y + s * .4, y - s * .5, b)); c.stroke(); c.restore(); }
  function cross(c, x, y, s, col, k = 1) { if (k <= 0) return; c.save(); c.strokeStyle = col; c.lineWidth = s * .2; c.lineCap = 'round'; const a = Math.min(1, k * 2), b = Math.max(0, k * 2 - 1); c.beginPath(); c.moveTo(x - s / 2, y - s / 2); c.lineTo(lerp(x - s / 2, x + s / 2, a), lerp(y - s / 2, y + s / 2, a)); c.stroke(); if (b > 0) { c.beginPath(); c.moveTo(x + s / 2, y - s / 2); c.lineTo(lerp(x + s / 2, x - s / 2, b), lerp(y - s / 2, y + s / 2, b)); c.stroke(); } c.restore(); }
  function pill(c, s, x, y, size, bg, fg, a = 1) { c.save(); c.globalAlpha = a; c.font = `800 ${size}px JBM`; const w = c.measureText(s).width + size * 1.1; rr(c, x - w / 2, y - size * .85, w, size * 1.7, size * .35); c.fillStyle = bg; c.fill(); txt(c, s, x, y + 1, `800 ${size}px JBM`, fg); c.restore(); }
  function arrowR(c, x0, x1, y, col, k = 1, lw = 8) { if (k <= 0) return; const x = lerp(x0, x1, k); c.strokeStyle = col; c.fillStyle = col; c.lineWidth = lw; c.lineCap = 'round'; c.beginPath(); c.moveTo(x0, y); c.lineTo(x - 6, y); c.stroke(); if (k > .9) { c.beginPath(); c.moveTo(x1, y); c.lineTo(x1 - 22, y - 16); c.lineTo(x1 - 22, y + 16); c.closePath(); c.fill(); } }
  function receiptDoc(c, w, h, o = {}) { // small warehouse receipt drawn inside paper()
    txt(c, 'WAREHOUSE RECEIPT', 0, -h / 2 + h * .16, `400 ${h * .12}px Elite`, '#1c1c1c'); c.fillStyle = '#1c1c1c'; c.fillRect(-w / 2 + w * .08, -h / 2 + h * .26, w * .84, 2);
    for (let i = 0; i < 4; i++) { c.fillStyle = 'rgba(28,28,28,.35)'; c.fillRect(-w / 2 + w * .1, -h / 2 + h * (.36 + i * .13), w * (.7 - i * .1), h * .05); }
    if (o.sig) { c.strokeStyle = '#1b3a8a'; c.lineWidth = 3; c.beginPath(); c.moveTo(-w * .3, h * .35); c.bezierCurveTo(-w * .2, h * .2, -w * .1, h * .5, 0, h * .3); c.stroke(); }
  }
  const SPOT = (c, t, tint) => { bgGrid(c, t, tint); glow(c, 840, 480, 900, 'rgba(255,200,61,1)', .06); };

  // =====================================================================================
  // P21 — chapter card with red string
  // =====================================================================================
  Engine.hit(P('P21').start + .05, { shake: 14, punch: .04 }); Engine.cue(P('P21').start + .05, 'paper-slam');
  Engine.scene('P21', 'P21', (c, t, lt) => {
    SPOT(c, t, REDT);
    const tM = W('P21', 'more'), tT = W('P21', 'than'), tA = W('P21', 'america');
    const slide = Math.max(.7, eo(lin(lt, 0, .35))); txt(c, 'CHAPTER TWO', 840 - (1 - slide) * 200, 290, '800 40px JBM', RED); c.globalAlpha = slide;
    c.fillStyle = RED; c.fillRect(840 - 130, 322, 260 * slide, 5); c.globalAlpha = 1;
    // string with pins sweeping across
    const sk = eio(lin(lt, .1, 1.5)); c.save(); c.strokeStyle = RED; c.lineWidth = 5; c.beginPath();
    const pts = [[110, 470], [560, 410], [1020, 560], [1500, 440]]; c.moveTo(...pts[0]); const n = sk * (pts.length - 1);
    for (let i = 1; i < pts.length; i++) { const k = clamp(n - (i - 1)); if (k > 0) c.lineTo(lerp(pts[i - 1][0], pts[i][0], k), lerp(pts[i - 1][1], pts[i][1], k)); } c.stroke();
    c.fillStyle = RED; pts.forEach((p, i) => { if (n >= i) { c.beginPath(); c.arc(p[0], p[1], 10, 0, 7); c.fill(); } }); c.restore();
    const k1 = 1 + .14 * (1 - eo(lin(t, tM - .12, tM + .3))), k2 = 1 + .14 * (1 - eo(lin(t, tT - .12, tT + .3))); c.font = '400 200px Anton'; c.letterSpacing = '4px';
    if (k1 > 0) { c.save(); c.translate(840, 480); c.scale(k1, k1); txt(c, 'MORE OIL', 0, 0, '400 200px Anton', PAPER); c.restore(); }
    if (k2 > 0) { c.font = '400 200px Anton'; const w1 = c.measureText('THAN ').width, w2 = c.measureText('AMERICA').width, x0 = 840 - (w1 + w2) / 2, ka = lin(t, tA - .1, tA + .15);
      c.save(); c.translate(840, 690); c.scale(k2, k2); c.translate(-840, -690); txt(c, 'THAN ', x0, 690, '400 200px Anton', PAPER, 'left'); txt(c, 'AMERICA', x0 + w1, 690, '400 200px Anton', lerpCol(PAPER, HL, ka), 'left'); c.restore(); }
    c.letterSpacing = '0px';
    const ul = eo(lin(t, tA, tA + .5)); c.fillStyle = HL; c.fillRect(840 - 520 * ul, 815, 1040 * ul, 10);
    tank(c, 1480, 860, 150, 180, { fill: .7 }); // little tank silhouette corner accent
  });
  function lerpCol(a, b, k) { return k > .5 ? b : a; }

  // =====================================================================================
  // P22 — New Jersey map pin, Tino card, tank farm in Bayonne
  // =====================================================================================
  const tTino = W('P22', 'Tino'), tTank = W('P22', 'tank'), tBay = W('P22', 'Bayonne');
  Engine.hit(W('P22', 'Jersey'), { shake: 10, punch: .02 });
  Engine.scene('P22', 'P22', (c, t, lt) => { // A: map + pin
    bgGrid(c, t, BLUET); const k = eo(lin(lt, 0, .4)), px = 560, py = 480;
    c.save(); c.translate(px, py); c.scale(.96 * k + .04, .96 * k + .04); c.globalAlpha = k;
    const NJ = [[0, -300], [70, -300], [110, -220], [170, -120], [150, -40], [190, 60], [170, 160], [110, 230], [60, 300], [-20, 270], [-80, 200], [-120, 120], [-90, 40], [-140, -40], [-100, -140], [-40, -220]];
    c.fillStyle = '#1b2a3a'; c.beginPath(); NJ.forEach((p, i) => i ? c.lineTo(...p) : c.moveTo(...p)); c.closePath(); c.fill(); c.strokeStyle = '#4f7aa6'; c.lineWidth = 5; c.stroke();
    for (let i = 0; i < 4; i++) { c.strokeStyle = 'rgba(79,122,166,.25)'; c.lineWidth = 3; c.beginPath(); c.moveTo(-100, -140 + i * 110); c.lineTo(160, -120 + i * 100); c.stroke(); }
    // ocean waves right of coast
    c.strokeStyle = 'rgba(43,140,224,.35)'; c.lineWidth = 4; for (let j = 0; j < 5; j++) { c.beginPath(); for (let x = 230; x < 420; x += 12) c.lineTo(x, -200 + j * 120 + Math.sin(x * .05 + t * 2 + j) * 8); c.stroke(); }
    // pin dropping
    const pk = bounce(lin(lt, .25, .8)), pinY = lerp(-420, -110, pk); c.fillStyle = RED; c.beginPath(); c.arc(150, pinY - 30, 26, 0, 7); c.fill(); c.beginPath(); c.moveTo(130, pinY - 18); c.lineTo(150, pinY + 24); c.lineTo(170, pinY - 18); c.fill(); c.fillStyle = INK; c.beginPath(); c.arc(150, pinY - 30, 9, 0, 7); c.fill();
    const rp = (t * 1.2) % 1; if (pk >= 1) { c.strokeStyle = `rgba(255,59,48,${1 - rp})`; c.lineWidth = 4; c.beginPath(); c.arc(150, -110 + 24, 20 + rp * 70, 0, 7); c.stroke(); }
    c.restore();
    txt(c, 'NEW JERSEY', 1100, 330, '400 130px Anton', PAPER); const y60 = back(lin(t, W('P22', '1960s') - .1, W('P22', '1960s') + .25));
    c.save(); c.translate(1100, 470); c.scale(y60, y60); txt(c, 'EARLY 1960s', 0, 0, '400 100px Anton', HL); c.restore();
    c.fillStyle = RED; c.fillRect(1100 - 360 * eo(lin(lt, .3, 1)), 560, 720 * eo(lin(lt, .3, 1)), 8);
  });
  Engine.sceneAt(tTino - .1, (c, t, lt) => { // B: case-file card + tank farm
    bgGrid(c, t, GOLDT);
    const ck = back(lin(lt, 0, .45));
    if (ck > 0) paper(c, lerp(-400, 450, ck), 500, 600, 700, -.045, '#efe6cf', (p, w, h) => {
      p.fillStyle = '#d8c79c'; p.fillRect(-w / 2, -h / 2, w, 80); txt(p, 'CASE FILE', -w / 2 + 30, -h / 2 + 42, '400 44px Elite', '#3a2c12', 'left');
      p.fillStyle = '#1c1c1c'; p.beginPath(); p.arc(0, -70, 105, 0, 7); p.fill(); rr(p, -145, 50, 290, 170, 70); p.fill(); txt(p, '?', 0, -66, '400 130px Anton', '#efe6cf');
      const n1 = 'TINO DE ANGELIS'; txt(p, n1.slice(0, Math.floor(lin(t, tTino, tTino + .8) * n1.length + .01)), -w / 2 + 30, 255, '400 40px Elite', '#1c1c1c', 'left');
      const n2 = 'ALLIED CRUDE'; txt(p, n2.slice(0, Math.floor(lin(t, W('P22', 'Allied'), W('P22', 'Allied') + .6) * n2.length + .01)), -w / 2 + 30, 300, '400 34px Elite', '#7a1a14', 'left');
      txt(p, lt > 0 && t >= W('P22', 'vegetable') ? 'VEGETABLE OIL CO.' : '', -w / 2 + 30, 335, '400 26px Elite', '#5a4a2a', 'left');
    });
    // sign board
    const sk = eo(lin(t, W('P22', 'Allied'), W('P22', 'Allied') + .4)); if (sk > 0) { c.save(); c.globalAlpha = sk; rr(c, 920, 190, 640, 74, 10); c.fillStyle = '#2a2018'; c.fill(); c.strokeStyle = '#8a6a30'; c.lineWidth = 4; c.stroke(); txt(c, 'ALLIED CRUDE VEGETABLE OIL CO.', 1240, 228, '700 28px JBM', OIL1); c.restore(); }
    // tank farm
    const specs = [[880, 330, .5], [1030, 390, .7], [1180, 300, .35], [1330, 370, .6], [1480, 320, .45]];
    specs.forEach(([x, h, f], i) => { const rk = eo(lin(t, tTank - .1 + i * .1, tTank + .45 + i * .1)); const yy = lerp(1100, 780 - h, rk); ctank(c, x - 65, yy, 130, h, { fill: f, oil: 1, t: t + i, bubbles: 0, xray: .15 }); });
    c.fillStyle = '#2a323d'; c.fillRect(840, 786, 740, 10);
    const bk = back(lin(t, tBay - .1, tBay + .3)); if (bk > 0) { c.save(); c.translate(1180, 330 + (1 - bk) * -40); c.scale(bk, bk); pill(c, 'BAYONNE, N.J.', 0, 0, 30, RED, PAPER); c.restore(); c.strokeStyle = RED; c.lineWidth = 4; c.setLineDash([8, 8]); c.beginPath(); c.moveTo(1180, 360); c.lineTo(1180, 420); c.stroke(); c.setLineDash([]); }
    const rs = eio(lin(t, W('P22', 'out'), W('P22', 'out') + .8)); if (rs > 0) { c.strokeStyle = RED; c.lineWidth = 5; c.beginPath(); c.moveTo(640, 360); c.quadraticCurveTo(900, 120, lerp(640, 1000, rs), lerp(360, 300, rs)); c.stroke(); c.fillStyle = RED; c.beginPath(); c.arc(640, 360, 10, 0, 7); c.fill(); }
  });
  Engine.hit(tTino, { shake: 8, punch: .02 }); Engine.cue(tTino, 'camera-flash'); Engine.hit(tTank, { shake: 12 }); Engine.cue(tTank, 'pipes');

  // =====================================================================================
  // P23 — flow diagram TANK -> INSPECTOR -> RECEIPT -> BANK -> $
  // =====================================================================================
  const FL = [[W('P23', 'tank'), 'OIL SITS IN A TANK'], [W('P23', 'warehouse'), 'WAREHOUSE CO. CHECKS'], [W('P23', 'receipt'), 'WRITES A RECEIPT'], [W('P23', 'banks'), 'BANKS LEND'], [W('P23', 'money'), 'CASH OUT']];
  const FLLB = ['TANK', 'INSPECTOR', 'RECEIPT', 'BANK', '$'];
  FL.forEach(([tl_]) => Engine.hit(tl_, { shake: 6 }));
  Engine.scene('P23', 'P23', (c, t, lt) => {
    SPOT(c, t, GOLDT); const hk = eo(lin(lt, 0, .4)); c.save(); c.globalAlpha = hk; txt(c, 'HIS BUSINESS: A SIMPLE LOAN', 840, 190, '400 78px Anton', PAPER); c.restore();
    const bw = 250, bh = 280, by = 500;
    for (let i = 0; i < 5; i++) {
      const x = 220 + i * 310, tl_ = FL[i][0], k = lin(t, tl_ - .1, tl_ + .3), lit = t >= tl_ - .05; const ent = eo(lin(lt, .15 + i * .08, .6 + i * .08));
      c.save(); c.translate(x, by + (1 - ent) * 60); c.globalAlpha = ent; const sc = 1 + (lit ? .08 * (1 - lin(t, tl_, tl_ + .35)) : 0); c.scale(sc, sc);
      const col = [OIL1, PAPER, '#efe6cf', GREEN, GREEN][i]; if (lit) glow(c, 0, 0, 260, col, .22);
      rr(c, -bw / 2, -bh / 2, bw, bh, 18); c.fillStyle = lit ? '#161e28' : '#0f151d'; c.fill(); c.strokeStyle = lit ? col : '#2f3a47'; c.lineWidth = lit ? 7 : 4; c.stroke();
      c.save(); c.globalAlpha = lit ? 1 : .35;
      if (i === 0) ctank(c, -50, -105, 100, 140, { fill: .8, oil: 1, t, bubbles: 0 });
      else if (i === 1) person(c, 0, 20, 120, PAPER, 0, t);
      else if (i === 2) { paper(c, 0, -30, 130, 160, .04, '#efe6cf', (p, w, h) => receiptDoc(p, w, h)); }
      else if (i === 3) bankIc(c, 0, -20, 130, PAPER);
      else txt(c, '$', 0, -20, '400 190px Anton', GREEN);
      c.restore();
      txt(c, FLLB[i], 0, 98, '400 40px Anton', lit ? PAPER : GREY); c.restore();
      if (i > 0) { const ak = eo(lin(t, tl_ - .3, tl_ + .1)); arrowR(c, x - 310 + bw / 2 + 12, x - bw / 2 - 12, by, GOLD, ak, 8); }
      const sk = eo(lin(t, tl_ + .05, tl_ + .4)); if (sk > 0) { c.save(); c.globalAlpha = sk; txt(c, FL[i][1], x, by + 190 + (1 - sk) * 16, '700 24px JBM', col); c.restore(); }
    }
    // travelling token after everything lit
    const t5 = FL[4][0]; if (t > t5 + .3) { const k = ((t - t5 - .3) * .45) % 1; const x = lerp(220, 1460, k); glow(c, x, by, 70, OIL1, .5); c.fillStyle = OIL1; c.beginPath(); c.arc(x, by - 150 - Math.sin(k * Math.PI) * 30, 10, 0, 7); c.fill(); }
  });

  // =====================================================================================
  // P24 — warehouse receipt, American Express warehousing, CERTIFIED, banks pay
  // =====================================================================================
  const tV = W('P24', 'vouched'), tAm = W('P24', 'American'), tBk = W('P24', 'banks'), tPd = W('P24', 'paid');
  Engine.hit(P('P24').start + .15, { shake: 12, punch: .03 }); Engine.cue(P('P24').start + .15, 'paper-slam');
  Engine.hit(tV, { shake: 18, punch: .05, flash: .6 }); Engine.cue(tV, 'stamp');
  Engine.scene('P24', 'P24', (c, t, lt) => {
    bgGrid(c, t, GOLDT);
    paperSlam(c, t, P('P24').start, 600, 490, 760, 660, .025, '#efe6cf', (p, w, h) => {
      txt(p, 'WAREHOUSE RECEIPT', 0, -h / 2 + 62, '400 54px Elite', '#1c1c1c'); p.fillStyle = '#1c1c1c'; p.fillRect(-w / 2 + 40, -h / 2 + 108, w - 80, 3);
      ['STORED: VEGETABLE OIL', 'TANK FARM: BAYONNE, N.J.', 'WAREHOUSEMAN:'].forEach((s, i) => txt(p, s.slice(0, Math.floor(lin(t, P('P24').start + .15 + i * .3, P('P24').start + .9 + i * .3) * s.length + .01)), -w / 2 + 50, -h / 2 + 165 + i * 52, '400 33px Elite', '#2a2a2a', 'left'));
      const hl = eo(lin(t, tAm - .05, tAm + .5)); p.fillStyle = 'rgba(255,214,10,.65)'; p.fillRect(-w / 2 + 40, -h / 2 + 285, (w - 80) * hl, 62);
      if (t >= tAm - .05) txt(p, 'AMERICAN EXPRESS WAREHOUSING', -w / 2 + 50, -h / 2 + 316, '400 32px Elite', '#1c1c1c', 'left');
      p.fillStyle = 'rgba(28,28,28,.3)'; for (let i = 0; i < 4; i++) p.fillRect(-w / 2 + 50, -h / 2 + 390 + i * 40, w * (.8 - i * .12), 14);
      stamp(p, 'CERTIFIED', 120, 190, 96, '#1f8a46', -.14, lin(t, tV, tV + .15));
    });
    const uk = back(lin(t, W('P24', 'unit') - .1, W('P24', 'unit') + .3)); if (uk > 0) { c.save(); c.translate(1260, 290); c.scale(uk, uk); rr(c, -270, -80, 540, 160, 16); c.fillStyle = '#12202f'; c.fill(); c.strokeStyle = WAT1; c.lineWidth = 5; c.stroke(); txt(c, 'A UNIT OF', 0, -36, '700 28px JBM', GREY); txt(c, 'AMERICAN EXPRESS', 0, 22, '400 66px Anton', PAPER); c.restore(); }
    const bk = eo(lin(t, tBk - .1, tBk + .3)); if (bk > 0) { c.save(); c.globalAlpha = bk; bankIc(c, 1260, 640 + (1 - bk) * 80, 230, PAPER); txt(c, 'BANKS', 1260, 790, '400 46px Anton', PAPER); c.restore(); }
    const ct = t - tPd; if (ct > 0) for (let i = 0; i < 28; i++) { const a = ct - i * .035; if (a < 0 || a > 1.6) continue; const q = eo(a / 1.3); bill(c, lerp(1260, 760, q) + Math.sin(i * 7 + a * 6) * 40 * (1 - q), lerp(640, 300, q) - Math.sin(q * Math.PI) * 120, 110, Math.sin(i + a * 8) * 1.1, 1 - lin(a, 1.3, 1.6)); }
    if (t >= tV) { c.save(); c.globalAlpha = lin(t, tV + .3, tV + .6) * (1 - lin(t, tPd + 1, tPd + 1.4)); txt(c, 'AMEX VOUCHES  =  BANKS PAY', 1260, 450, '700 30px JBM', HL); c.restore(); }
  });

  // =====================================================================================
  // P25 — receipts multiply, tank level stays the same: RECEIPT OIL
  // =====================================================================================
  const tMore = W('P25', 'more'), tRec = W('P25', 'receipt'), tNot = W('P25', 'Not');
  Engine.hit(tMore, { shake: 8, punch: .03 }); Engine.cue(tMore, 'copier'); Engine.hit(tRec, { shake: 16, punch: .04, glitch: .4, glitchDur: .25 }); Engine.cue(tRec, 'stamp');
  Engine.scene('P25', 'P25', (c, t, lt) => {
    bgGrid(c, t, GOLDT);
    ctank(c, 130, 200, 360, 540, { fill: .6, oil: 1, t, label: 'REAL OIL: 1 TANK' }); const lvY = 200 + 540 * .06 + 540 * .9 * .4;
    c.setLineDash([14, 10]); c.strokeStyle = HL; c.lineWidth = 4; c.beginPath(); c.moveTo(110, lvY); c.lineTo(540, lvY); c.stroke(); c.setLineDash([]); txt(c, 'LEVEL: SAME', 310, lvY - 24, '800 26px JBM', HL);
    // copier
    const cx = 760, cy = 470; rr(c, cx - 150, cy - 70, 300, 170, 14); c.fillStyle = '#2a323d'; c.fill(); c.strokeStyle = '#8b96a5'; c.lineWidth = 5; c.stroke(); rr(c, cx - 120, cy - 100, 240, 36, 8); c.fillStyle = '#5b6573'; c.fill();
    const run = t >= tMore - .1; const flash = run && Math.floor(t * 10) % 2 === 0; c.fillStyle = flash ? 'rgba(255,255,255,.9)' : '#3a4350'; c.fillRect(cx - 100, cy - 30, 200, 10);
    txt(c, 'COPY', cx, cy + 60, '400 40px Anton', GREY);
    const n = run ? Math.floor(1 + 60 * Math.pow(Math.max(0, t - tMore + .1), 1.6)) : 1, maxShow = 28;
    for (let i = 0; i < Math.min(n, maxShow); i++) { const born = tMore - .1 + Math.pow(i / 60, 1 / 1.6) + 0 ; const a = eo(lin(t, born, born + .4)); const px = lerp(cx + 60, 900 + (i % 6) * 95 + 30, a), py = lerp(cy + 20, 400 + Math.floor(i / 6) * 100 + (i % 3) * 10, a) + (1 - a) * -80; if (a <= 0) continue; paper(c, px + 90, py, 150, 100, ((i * 37) % 11 - 5) * .01 + (1 - a) * .6, '#efe6cf', (p, w, h) => receiptDoc(p, w, h)); }
    const cnt = Math.min(n, 99); const ck = run ? 1 : 0; if (ck) { txt(c, 'RECEIPTS', 1130, 175, '800 30px JBM', GREY); txt(c, '×' + fmtN(Math.min(n, 999)), 1130, 235, '800 80px JBM', n > 1 ? HL : PAPER); }
    c.save(); c.globalAlpha = .9 * lin(t, tNot - .1, tNot + .2); cross(c, 310, 600, 80, RED, lin(t, tNot, tNot + .3)); c.restore();
    stamp(c, 'RECEIPT OIL', 1130, 770, 90, RED, -.07, lin(t, tRec, tRec + .15));
    txt(c, 'SAME TANK. MORE PAPER.', 700, 720, '700 30px JBM', 'rgba(245,243,238,.7)');
  });

  // =====================================================================================
  // P26 — hidden compartment / water / dipstick
  // =====================================================================================
  const tHid = W('P26', 'hidden'), tIns = W('P26', 'inspectors'), tOil1 = W('P26', 'oil'), tOth = W('P26', 'Others'), tWat = W('P26', 'water'), tFl = W('P26', 'floats'), tIns2 = W('P26', 'Inspectors', 2) || W('P26', 'inspectors', 2), tSig = W('P26', 'signed');
  Engine.hit(tHid, { shake: 8, punch: .03 }); Engine.cue(tHid, 'sonar');
  Engine.hit(tOil1, { shake: 10 }); Engine.cue(tOil1, 'stamp');
  Engine.scene('P26', 'P26', (c, t, lt) => { // A: x-ray, hidden compartment, flashlight
    bgGrid(c, t, BLUET); const zk = eo(lin(lt, 0, 1.2)), TX = 330, TY = 190, TW = 480, TH = 600;
    c.save(); c.translate(TX + TW / 2, 500); c.scale(lerp(1.08, 1, zk), lerp(1.08, 1, zk)); c.translate(-TX - TW / 2, -500);
    ctank(c, TX, TY, TW, TH, { fill: .9, oil: .08, xray: .9, t, compartment: eo(lin(t, tHid, tHid + .5)) }); c.restore();
    
    // catwalk + inspector w/ flashlight
    c.fillStyle = '#5b6573'; c.fillRect(840, 262, 520, 14); const ik = eo(lin(t, tIns, tIns + .6)); person(c, lerp(1500, 1020, ik), 262, 190, PAPER, lin(t, W('P26', 'saw') - .1, W('P26', 'saw') + .3), t, -1);
    c.save(); c.globalAlpha = lin(t, tIns + .3, tIns + .6); txt(c, 'INSPECTOR AT THE HATCH', 1190, 380 + 12, '700 26px JBM', GREY); c.restore();
    const sk = lin(t, tOil1, tOil1 + .15); stamp(c, 'OIL', 1160, 560, 110, GREEN, -.08, sk); if (sk > 0) check(c, 1370, 560, 90, GREEN, lin(t, tOil1 + .1, tOil1 + .35));
    const hk = eo(lin(t, tHid + .25, tHid + .6)); if (hk > 0) { c.save(); c.globalAlpha = hk; c.strokeStyle = RED; c.lineWidth = 5; c.beginPath(); c.moveTo(TX + TW / 2, 172); c.lineTo(TX + TW / 2, 215); c.stroke(); pill(c, 'HIDDEN COMPARTMENT', TX + TW / 2, 142, 30, RED, PAPER); c.restore(); }
  });
  Engine.sceneAt(tOth - .05, (c, t, lt) => { // B: mostly water, oil floats
    bgGrid(c, t, BLUET); const TX = 330, TY = 190, TW = 480, TH = 600, ok = eio(lin(t, tOth, tOth + .6));
    ctank(c, TX, TY, TW, TH, { fill: .95, oil: lerp(.1, .08, ok), xray: 1, t });
    const wk = back(lin(t, tWat, tWat + .3)); if (wk > 0) { c.save(); c.translate(570 + Math.sin(t * 3) * 6, 530); c.rotate(Math.sin(t * 2) * .04 - .04); c.scale(wk, wk); c.shadowColor = 'rgba(0,30,80,.8)'; c.shadowBlur = 30; txt(c, 'WATER', 0, 0, '400 150px Anton', 'rgba(225,242,255,.96)'); c.restore(); }
    pill(c, 'OTHERS: MOSTLY WATER', 1180, 300, 32, '#12385f', PAPER, eo(lin(t, tOth, tOth + .3)));
    const fk = eo(lin(t, W('P26', 'because'), W('P26', 'because') + .3)); if (fk > 0) { c.save(); c.globalAlpha = fk; txt(c, 'OIL FLOATS', 1180, 440, '400 90px Anton', OIL1); for (let i = 0; i < 5; i++) { const y = 540 - ((t * 60 + i * 40) % 160); c.fillStyle = OIL1; c.beginPath(); c.ellipse(1070 + i * 55, y + 100, 14, 10, 0, 0, 7); c.fill(); c.globalAlpha = fk * (.3 + .7 * (1 - ((t * 60 + i * 40) % 160) / 160)); } c.restore(); c.strokeStyle = OIL1; c.lineWidth = 6; c.beginPath(); c.moveTo(900, 250); c.lineTo(840, 262 + 22); c.stroke(); txt(c, '← THIN LAYER ON TOP', 1180, 640, '800 28px JBM', HL); }
    Engine.cue; 
  });
  Engine.hit(tWat, { shake: 20, punch: .05, glitch: .4, glitchDur: .2 }); Engine.cue(tWat, 'sub-boom');
  Engine.sceneAt(tIns2 - .05, (c, t, lt) => { // C: dipstick, saw oil, signed
    bgGrid(c, t, GOLDT); const TX = 330, TY = 300, TW = 480, TH = 500; c.save(); c.translate(570, 300); const z = lerp(1, 1.1, eo(lin(lt, 0, 1))); c.scale(z, z); c.translate(-570, -300);
    ctank(c, TX, TY, TW, TH, { fill: .95, oil: .08, xray: .5, t, bubbles: 1 });
    const dk = eio(lin(t, tIns2 + .3, tIns2 + .9)), sty = TY - 150 + dk * 200; c.fillStyle = '#c9ced6'; c.fillRect(560, sty - 130, 14, 330); c.fillStyle = OIL1; c.fillRect(560, sty + 140, 14, 60 * dk); c.restore();
    c.fillStyle = '#5b6573'; c.fillRect(850, 300, 520, 14); const ik = eo(lin(t, tIns2 - .05, tIns2 + .5)); person(c, lerp(1500, 1000, ik), 300, 200, PAPER, 0, t, -1);
    txt(c, 'LOOKS AT THE TOP', 1180, 400, '700 30px JBM', GREY);
    const sk2 = eo(lin(t, W('P26', 'saw', 2), W('P26', 'saw', 2) + .3)); c.save(); c.globalAlpha = sk2; txt(c, 'SEES OIL', 1180, 470, '400 80px Anton', OIL1); c.restore();
    const cb = back(lin(t, tSig - .5, tSig - .2)); if (cb > 0) { c.save(); c.translate(1180, 640); c.scale(cb, cb); paper(c, 0, 0, 380, 190, -.03, '#efe6cf', (p, w, h) => { receiptDoc(p, w, h, { sig: lin(t, tSig - .1, tSig + .3) }); }); c.restore(); }
    const sg = lin(t, tSig, tSig + .15); stamp(c, 'OIL', 1100, 740, 70, GREEN, -.1, sg); if (sg > 0) check(c, 1260, 740, 60, GREEN, lin(t, tSig + .1, tSig + .3));
  });
  Engine.hit(tSig, { shake: 12, punch: .03 }); Engine.cue(tSig, 'stamp');

  // =====================================================================================
  // P27 — 4 tanks + pipes: same oil counted x1..x4
  // =====================================================================================
  const T27 = [P('P27').start + .35, W('P27', 'ahead'), W('P27', 'counted'), W('P27', 'again')];
  T27.forEach((tt, i) => i && Engine.hit(tt, { shake: 6 + i * 2, punch: .015 }));
  Engine.scene('P27', 'P27', (c, t, lt) => {
    bgGrid(c, t, BLUET); const xs = [270, 650, 1030, 1410], tw = 230, th = 380, ty = 330, pipeY = 800;
    c.strokeStyle = '#3a434f'; c.lineWidth = 34; c.lineCap = 'butt'; c.beginPath(); c.moveTo(xs[0], pipeY); c.lineTo(xs[3], pipeY); c.stroke(); c.strokeStyle = '#5b6573'; c.lineWidth = 6; c.beginPath(); c.moveTo(xs[0], pipeY - 10); c.lineTo(xs[3], pipeY - 10); c.stroke();
    for (let i = 0; i < 4; i++) { c.fillStyle = '#3a434f'; c.fillRect(xs[i] - 14, ty + th, 28, pipeY - ty - th); }
    const hoz = [[T27[0] + .4, T27[1] - .2], [T27[1] + .4, T27[2] - .3], [T27[2] + .3, T27[3] - .1]];
    for (let i = 0; i < 4; i++) {
      const enter = eo(lin(lt, .02 + i * .1, .4 + i * .1)); const a = lin(t, T27[i] - .5, T27[i] - .1) * (1 - lin(t, T27[i] + .8, T27[i] + 1.2)) * (i === 3 ? 1 : 1) + (i === 3 ? 0 : 0);
      const aa = i === 3 ? lin(t, T27[i] - .4, T27[i] - .1) : a;
      ctank(c, xs[i] - tw / 2, ty + (1 - enter) * 700, tw, th, { fill: .9, oil: lerp(0, .24, aa), t: t + i, bubbles: 0, xray: .6 });
      if (t >= T27[i] + .1) { stamp(c, '×' + (i + 1), xs[i], ty - 50, 56, HL, 0, lin(t, T27[i] + .1, T27[i] + .28), 'JBM'); }
    }
    for (let i = 0; i < 3; i++) { const k = lin(t, hoz[i][0], hoz[i][1]); if (k > 0 && k < 1) { const bx = lerp(xs[i], xs[i + 1], eio(k)); glow(c, bx, pipeY, 90, OIL1, .5); c.fillStyle = OIL1; c.beginPath(); c.ellipse(bx, pipeY, 50, 16, 0, 0, 7); c.fill(); } }
    // inspector walks along ground
    const stops = [xs[0] - 120, xs[0] - 120, xs[1] - 120, xs[2] - 120, xs[3] - 120]; let ix; const tt = [P('P27').start - 1, T27[0] + .3, T27[1], T27[2], T27[3]];
    ix = stops[0]; for (let i = 1; i < 5; i++) ix = lerp(ix, stops[i], 0); let seg = 0; for (let i = 1; i < 5; i++) if (t >= tt[i - 1]) seg = i; const a0 = tt[seg - 1] ?? tt[0], a1 = tt[seg] ?? a0 + 1;
    ix = lerp(stops[Math.max(0, seg - 1)], stops[seg], eio(lin(t, a0 + 0.2, a1))); if (seg === 0) ix = stops[0];
    person(c, lerp(-100, ix, eo(lin(lt, 0, .5))), 740, 150, PAPER, 0, t);
    const n = T27.filter(x => t >= x + .1).length; if (n > 0) { const k = back(lin(t, T27[n - 1] + .1, T27[n - 1] + .35)); c.save(); c.translate(840, 150); c.scale(.85 + .15 * k, .85 + .15 * k); c.font = '400 70px Anton'; txt(c, 'SAME OIL · COUNTED', -50, 0, '400 70px Anton', n > 1 ? HL : PAPER); txt(c, '×' + n, 335, 0, '800 80px JBM', n > 1 ? RED : PAPER); c.restore(); }
  });

  // =====================================================================================
  // P28 — "By 1963, Allied claimed more oil than existed in the entire United States"
  // =====================================================================================
  const tImp = W('P28', 'impossible'), tY63 = W('P28', '1963'), tCl = W('P28', 'claimed'), tSoy = W('P28', 'soybean'), tEx = W('P28', 'existed'), tEnt = W('P28', 'entire');
  Engine.hit(tImp, { shake: 22, punch: .06, glitch: .8, glitchDur: .3 }); Engine.cue(tImp, 'sub-boom');
  Engine.hit(tEnt, { shake: 28, punch: .06, flash: .7 }); Engine.cue(tEnt, 'sub-boom');
  Engine.scene('P28', 'P28', (c, t, lt) => {
    bgGrid(c, t, REDT); glow(c, 840, 440, 800, RED, .14);
    const k = back(lin(t, W('P28', 'the'), W('P28', 'the') + .3)), k2 = back(lin(t, tImp, tImp + .3));
    c.save(); c.translate(840, 330); c.scale(k, k); txt(c, "HERE'S", 0, -110, '800 44px JBM', GREY); c.restore();
    c.save(); c.translate(840, 440); c.scale(k2, k2); c.font = '400 150px Anton'; c.letterSpacing = '4px'; txt(c, 'THE IMPOSSIBLE', 0, -40, '400 150px Anton', PAPER); txt(c, 'NUMBER', 0, 110, '400 150px Anton', RED); c.letterSpacing = '0px'; c.restore();
    const yk = back(lin(t, tY63 - .1, tY63 + .3)); if (yk > 0) { c.save(); c.translate(840, 735); c.scale(yk, yk); txt(c, 'BY 1963', 0, 0, '800 80px JBM', HL); c.restore(); }
  });
  Engine.sceneAt(tCl - .1, (c, t, lt) => {
    bgGrid(c, t, GOLDT); const TW = 330, TH = 520, TY = 220, ka = eio(lin(t, tCl, tEx + .2)), ent = eo(lin(lt, 0, .4));
    const usK = eo(lin(t, tSoy - .1, tSoy + .4)); // US tank pops in
    c.save(); c.globalAlpha = usK; ctank(c, 1020, TY, TW, TH, { fill: .7, oil: 1, t: t + 2, label: 'ALL OF THE U.S.', labelColor: PAPER }); c.restore();
    c.save(); c.globalAlpha = usK; txt(c, 'SOYBEAN + COTTONSEED OIL', 1185, 160, '700 24px JBM', GREY); c.restore();
    const fill = Math.min(1, ka * 1.35), ov = clamp((ka * 1.35 - 1) * 3);
    c.save(); c.translate(0, (1 - ent) * 50); c.globalAlpha = ent; ctank(c, 400, TY, TW, TH, { fill, oil: 1, t, label: "ALLIED'S RECEIPTS", labelColor: RED, glw: ov });
    if (ov > 0) { c.fillStyle = OIL1; for (let i = 0; i < 5; i++) { const ox = 430 + i * 62, L = 120 + hash(i) * 120; c.fillRect(ox, TY - 10, 16, 20); c.beginPath(); c.moveTo(ox, TY); c.quadraticCurveTo(ox - 14, TY - L * ov, ox - 40 + i * 10, TY - L * ov * .6); c.lineTo(ox + 14, TY - L * ov * .6); c.quadraticCurveTo(ox + 26, TY - L * ov, ox + 16, TY); c.fill(); } }
    c.restore();
    // level marker of the whole US across both tanks
    const my = TY + TH * .06 + TH * .9 * (1 - .7); if (usK > .05) { c.setLineDash([12, 10]); c.strokeStyle = HL; c.lineWidth = 4; c.globalAlpha = usK; c.beginPath(); c.moveTo(740, my); c.lineTo(1020, my); c.stroke(); c.setLineDash([]); c.globalAlpha = 1; }
    { if (usK > .5) txt(c, 'US TOTAL', 880, my + 24, '800 24px JBM', HL); }
    const gt = back(lin(t, tEx, tEx + .3)); if (gt > 0) { c.save(); c.translate(880, 250); c.scale(gt, gt); c.globalAlpha = 1 - lin(t, tEnt + .6, tEnt + 1.1); txt(c, '>', 0, 0, '400 220px Anton', RED); c.restore(); }
    const en = eo(lin(t, tEnt, tEnt + .25)); if (en > 0) { c.save(); c.globalAlpha = en; c.strokeStyle = HL; c.lineWidth = 6; rr(c, 1000, 190, 370, 600, 14); c.stroke(); pill(c, 'ENTIRE UNITED STATES', 1185, 120, 28, HL, INK); c.restore(); }
  });

  // =====================================================================================
  // P29 — 900,000 on paper vs ~55,000 real, 94% never existed
  // =====================================================================================
  const t900 = W('P29', '900'), tAct = W('P29', 'Actually'), t55 = W('P29', '55'), t90 = W('P29', '90'), tNev = W('P29', 'never');
  Engine.hit(t55 + .5, { shake: 10, punch: .03 }); Engine.hit(tNev, { shake: 26, punch: .06, flash: .7, glitch: .5, glitchDur: .25 }); Engine.cue(tNev, 'stamp');
  Engine.scene('P29', 'P29', (c, t, lt) => {
    bgGrid(c, t, GOLDT); const baseY = 800, maxH = 560, a = eio(lin(t, W('P29', 'paper'), t900 + 1.0)), b = eio(lin(t, tAct, t55 + .8));
    txt(c, 'TONS OF OIL', 520, 125, '700 34px JBM', 'rgba(245,243,238,.7)');
    const h1 = maxH * a; rr(c, 200, baseY - h1, 300, Math.max(0, h1), 12); c.fillStyle = '#efe6cf'; c.fill(); c.strokeStyle = 'rgba(0,0,0,.2)'; c.lineWidth = 2; for (let y = baseY - h1 + 28; y < baseY; y += 28) { c.beginPath(); c.moveTo(220, y); c.lineTo(480, y); c.stroke(); }
    txt(c, 'ON PAPER', 350, baseY + 36, '400 44px Anton', PAPER); if (a > 0) txt(c, fmtN(900000 * a), 350, baseY - h1 - 40, '800 56px JBM', GREEN);
    const h2 = maxH * 55000 / 900000 * b, ry = baseY - h2; if (b > 0) { rr(c, 620, ry, 300, Math.max(h2, 5), 8); const og = c.createLinearGradient(0, ry, 0, baseY); og.addColorStop(0, OIL1); og.addColorStop(1, OIL2); c.fillStyle = og; c.fill(); txt(c, fmtN(55000 * b), 770, ry - 40, '800 56px JBM', RED); }
    txt(c, 'ACTUALLY THERE', 770, baseY + 36, '400 44px Anton', PAPER);
    // over 90% bracket
    const bk = eo(lin(t, t90 - .05, t90 + .35)); if (bk > 0) { c.save(); c.globalAlpha = bk; c.strokeStyle = RED; c.lineWidth = 6; c.setLineDash([14, 10]); c.strokeRect(570, baseY - maxH + 40, 400, maxH - h2 - 40); c.setLineDash([]); txt(c, 'OVER 90%', 1230, 260, '400 100px Anton', RED); txt(c, 'GONE', 1230, 340, '400 50px Anton', PAPER); c.restore(); }
    stamp(c, '94% NEVER EXISTED', 1230, 470, 70, RED, -.1, lin(t, tNev, tNev + .15));
    txt(c, '(900,000 − 55,000) ÷ 900,000', 1230, 570, '700 24px JBM', 'rgba(245,243,238,.6)');
  });

  // =====================================================================================
  // P30 — futures chart rises then crashes, crack, margin call, somebody looked inside
  // =====================================================================================
  const tCor = W('P30', 'corner'), tFu = W('P30', 'futures'), tCr = W('P30', 'cracked'), tNov = W('P30', 'November'), tMg = W('P30', 'margin'), tSom = W('P30', 'somebody'), tInside = W('P30', 'inside'), tTanks = W('P30', 'tanks');
  Engine.hit(tCr, { shake: 34, punch: .07, glitch: 1, glitchDur: .4, flash: .8 }); Engine.cue(tCr, 'glass-crack');
  Engine.hit(tMg, { shake: 16, punch: .04 }); Engine.cue(tMg, 'phone-ring'); Engine.hit(tInside, { shake: 10 });
  const CRACK = (() => { const L = []; for (let i = 0; i < 14; i++) { let a = i / 14 * Math.PI * 2 + hash(i) * .4, x = 1040, y = 520, seg = [[x, y]]; for (let j = 0; j < 8; j++) { a += (hash(i * 9 + j) - .5) * .8; x += Math.cos(a) * (40 + hash(i + j) * 55); y += Math.sin(a) * (40 + hash(i + j) * 55); seg.push([x, y]); } L.push(seg); } return L; })();
  Engine.scene('P30', 'P30', (c, t, lt) => {
    bgGrid(c, t, GOLDT); const X0 = 150, X1 = 1550, Y0 = 200, Y1 = 790;
    c.strokeStyle = 'rgba(245,243,238,.35)'; c.lineWidth = 4; c.beginPath(); c.moveTo(X0, Y0); c.lineTo(X0, Y1); c.lineTo(X1, Y1); c.stroke();
    txt(c, 'OIL FUTURES  ·  PRICE', 160, 165, '800 30px JBM', GREY, 'left');
    const N = 70, cr = eio(lin(t, tCr, tCr + .55)), pts = []; for (let i = 0; i <= N; i++) { const x = lerp(X0 + 20, X1 - 20, i / N), base = Y1 - 60 - (i / N) * 330 - Math.sin(i * .8) * 18 - Math.pow(i / N, 3) * 120; const crash = i > 50 ? Math.pow((i - 50) / 20, 1.3) * 430 * cr : 0; pts.push([x, base + crash]); }
    const n = Math.floor(lerp(2, 52, lin(t, tCor, tCr)) ) + (t >= tCr ? Math.floor(20 * cr) : 0); c.strokeStyle = t >= tCr ? RED : GREEN; c.lineWidth = 12; c.lineJoin = 'round'; c.lineCap = 'round'; c.beginPath(); pts.slice(0, Math.min(N + 1, n)).forEach((p, i) => i ? c.lineTo(...p) : c.moveTo(...p)); c.stroke();
    const tip = pts[Math.min(N, Math.max(0, n - 1))]; glow(c, tip[0], tip[1], 70, t >= tCr ? RED : GREEN, .6);
    const ck = lin(t, tCor, tCor + .4); if (ck > 0 && t < tCr) { c.save(); c.globalAlpha = ck; pill(c, 'HE TRIES TO CORNER THE MARKET', 560, 260, 30, '#1b2a1f', GREEN); c.restore(); }
    if (t >= tNov) { const k = back(lin(t, tNov, tNov + .3)); c.save(); c.translate(1240, 260); c.scale(k, k); pill(c, 'NOVEMBER 1963', 0, 0, 38, RED, PAPER); c.restore(); }
    if (t >= tCr) { const k = eo(lin(t, tCr, tCr + .15)); c.strokeStyle = 'rgba(255,255,255,.85)'; c.lineWidth = 3; for (const seg of CRACK) { c.beginPath(); const m = Math.max(2, Math.ceil(seg.length * k)); seg.slice(0, m).forEach((p, i) => i ? c.lineTo(...p) : c.moveTo(...p)); c.stroke(); } }
  });
  Engine.sceneAt(tMg - .1, (c, t, lt) => { // margin calls + tank looked inside
    bgGrid(c, t, REDT);
    { const pk = Math.max(.5, eo(lin(lt, 0, .3))) * (1 - lin(t, tSom - .1, tSom + .3)); if (pk > 0) { c.save(); c.globalAlpha = pk; const sh = Math.sin(t * 45) * 6; c.translate(1200 + sh, 420); c.rotate(Math.sin(t * 45) * .06); rr(c, -90, -170, 180, 340, 28); c.fillStyle = '#1b222c'; c.fill(); c.strokeStyle = RED; c.lineWidth = 8; c.stroke(); c.fillStyle = '#0d1117'; rr(c, -70, -140, 140, 250, 10); c.fill(); txt(c, 'CALLING', 0, -60, '800 22px JBM', RED); txt(c, '51', 0, 10, '400 80px Anton', PAPER); c.restore(); c.save(); c.globalAlpha = pk; for (let i = 0; i < 3; i++) { c.strokeStyle = `rgba(255,59,48,${.9 - i * .25})`; c.lineWidth = 6; c.beginPath(); c.arc(1200, 420, 150 + i * 40 + ((t * 80) % 40), -.6, .6); c.stroke(); c.beginPath(); c.arc(1200, 420, 150 + i * 40 + ((t * 80) % 40), Math.PI - .6, Math.PI + .6); c.stroke(); } txt(c, 'LENDERS WANT THEIR MONEY', 1200, 700, '800 26px JBM', GREY); c.restore(); } } stamp(c, 'MARGIN CALL', 470, 200, 100, RED, -.06, lin(t, tMg - .1, tMg + .05));
    for (let i = 0; i < 4; i++) { const k = back(lin(t, tMg + .15 + i * .22, tMg + .5 + i * .22)); if (k <= 0) continue; paper(c, 330 + (i % 2) * 300 + (i > 1 ? 40 : 0), lerp(-200, 420 + Math.floor(i / 2) * 200, k), 270, 150, (i - 1.5) * .06, '#efe6cf', (p, w, h) => { txt(p, 'MARGIN CALL', 0, -h * .28, '400 38px Elite', '#7a1a14'); txt(p, 'PAY NOW', 0, h * .05, '400 30px Elite', '#1c1c1c'); p.fillStyle = 'rgba(28,28,28,.3)'; p.fillRect(-w * .35, h * .25, w * .7, 10); }); }
    const tk = eo(lin(t, tSom - .1, tSom + .4)); c.save(); c.globalAlpha = tk; const rev = eio(lin(t, tInside, tTanks + .4));
    if (tk > 0) ctank(c, 1020, 230, 380, 540, { fill: .95, oil: lerp(1, .08, rev), xray: rev, t, label: rev > .5 ? 'NOT OIL' : 'TANK', labelColor: rev > .5 ? RED : PAPER }); c.restore();
    if (tk > 0) { const mx = lerp(1100, 1240, eio(lin(t, tSom, tInside))), my = lerp(330, 480, eio(lin(t, tSom, tInside))); c.save(); c.globalAlpha = tk; c.strokeStyle = HL; c.lineWidth = 12; c.beginPath(); c.arc(mx, my, 90, 0, 7); c.stroke(); c.lineWidth = 16; c.lineCap = 'round'; c.beginPath(); c.moveTo(mx + 64, my + 64); c.lineTo(mx + 130, my + 130); c.stroke(); c.restore(); }
    c.save(); c.globalAlpha = lin(t, tSom, tSom + .3); txt(c, 'SOMEBODY LOOKED INSIDE', 1210, 150, '400 54px Anton', HL); c.restore();
  }, { whip: false });

  // =====================================================================================
  // P31 — 51 lenders turn red, $180,000,000+, AMEX unit bankrupt, brokerage under
  // =====================================================================================
  const t51 = P('P31').start + .05, tLd = W('P31', 'lenders'), tMor = W('P31', 'more'), tLos = W('P31', 'losses'), tAmx = W('P31', 'American'), tBr = W('P31', 'bankrupt'), tWall = W('P31', 'Wall'), tUnd = W('P31', 'under');
  Engine.hit(tLd, { shake: 14, punch: .04 }); Engine.hit(tLos, { shake: 24, punch: .06, glitch: .5, glitchDur: .25 }); Engine.cue(tLos, 'demolition');
  Engine.hit(tBr, { shake: 30, punch: .07, flash: .6 }); Engine.cue(tBr, 'stamp'); Engine.hit(tUnd, { shake: 20, punch: .04 }); Engine.cue(tUnd, 'demolition');
  Engine.scene('P31', 'P31', (c, t, lt) => {
    bgGrid(c, t, REDT); const gx = 130, gy = 240, sx = 92, sy = 96;
    for (let i = 0; i < 51; i++) { const col = i % 9, row = Math.floor(i / 9), k = eo(lin(lt, .05 + i * .012, .3 + i * .012)); if (k <= 0) continue; const redAt = tLd + .1 + i * .022, red = t > redAt; c.save(); c.translate(gx + col * sx, gy + row * sy); c.scale(k, k); if (red && t < redAt + .25) c.translate(Math.sin(t * 90) * 3, 0); bankIc(c, 0, 0, 62, red ? RED : PAPER); c.restore(); }
    const lk = back(lin(lt, .1, .4)); c.save(); c.translate(1240, 250); c.scale(lk, lk); txt(c, '51', -150, 0, '400 220px Anton', HL); txt(c, 'LENDERS', 110, 20, '400 80px Anton', PAPER); c.restore();
    const v = roll(t, W('P31', '180') - .1, W('P31', 'million') + .5, 180e6, 0, eio); if (t >= tMor - .1) { const landed = t >= W('P31', 'million') + .5, pop = landed ? 1 + .1 * (1 - lin(t, W('P31', 'million') + .5, W('P31', 'million') + .8)) : 1; c.save(); c.translate(1240, 520); c.scale(pop, pop); txt(c, '$' + fmtN(v) + (landed ? '+' : ''), 0, 0, '800 64px JBM', RED); c.restore(); txt(c, 'IN LOSSES', 1240, 600, '400 54px Anton', PAPER); }
    c.fillStyle = RED; c.fillRect(gx - 50, gy + 6 * sy - 30, 51 * 0 + 0, 0);
  });
  Engine.sceneAt(tAmx - .1, (c, t, lt) => {
    bgGrid(c, t, REDT); const lk = back(lin(lt, 0, .4)), crumble = eio(lin(t, tBr - .3, tBr + .6));
    c.save(); c.translate(440, 400 + crumble * 40); c.rotate(crumble * .05); c.scale(lk, lk); rr(c, -290, -170, 580, 340, 18); c.fillStyle = '#12202f'; c.fill(); c.strokeStyle = crumble > .1 ? RED : WAT1; c.lineWidth = 6; c.stroke();
    txt(c, 'A UNIT OF', 0, -110, '700 26px JBM', GREY); txt(c, 'AMERICAN EXPRESS', 0, -50, '400 58px Anton', PAPER); txt(c, 'WAREHOUSE UNIT', 0, 30, '400 54px Anton', OIL1);
    bankIc(c, 0, 105, 90, crumble > .1 ? RED : PAPER); c.restore();
    stamp(c, 'AMEX WAREHOUSE UNIT: BANKRUPT', 840, 700, 66, RED, -.05, lin(t, tBr, tBr + .15));
    const wk = back(lin(t, tWall - .1, tWall + .3)), sink = eio(lin(t, tUnd - .1, tUnd + .7)); if (wk > 0) { c.save(); c.translate(1230, 400); c.scale(wk, wk); rr(c, -290, -170, 580, 340, 18); c.fillStyle = '#12202f'; c.fill(); c.strokeStyle = sink > .1 ? RED : GREY; c.lineWidth = 6; c.stroke(); txt(c, 'A WALL STREET', 0, -112, '400 46px Anton', PAPER); txt(c, 'BROKERAGE', 0, -64, '400 46px Anton', PAPER);
      c.save(); c.beginPath(); c.rect(-290, -30, 580, 190); c.clip(); c.translate(0, sink * 150); c.fillStyle = sink > .1 ? RED : '#8b96a5'; for (let i = 0; i < 5; i++) { const h = 90 + hash(i + 4) * 60; c.fillRect(-200 + i * 85, 160 - h, 60, h); } c.restore(); c.restore(); }
    stamp(c, 'WENT UNDER', 1230, 560, 54, RED, .06, lin(t, tUnd, tUnd + .15));
  });

  // =====================================================================================
  // P32 — prison bars; 20 years struck -> 7
  // =====================================================================================
  const tGu = W('P32', 'guilty'), tTw = W('P32', '20'), tOut = W('P32', 'out'), tSv = W('P32', 'seven');
  Engine.hit(P('P32').start + .1, { shake: 30, punch: .05, flash: .5 }); Engine.cue(P('P32').start + .1, 'cell-door');
  Engine.hit(tTw, { shake: 18, punch: .05 }); Engine.hit(tOut, { shake: 8 }); Engine.hit(tSv, { shake: 16, punch: .05, flash: .5 }); Engine.cue(tOut, 'cell-door');
  Engine.scene('P32', 'P32', (c, t, lt) => {
    bgGrid(c, t, REDT); const down = 1 - eo(lin(t, P('P32').start, P('P32').start + .28)) * (1 - eio(lin(t, tOut, tSv + .2)));
    const plateK = 1;
    c.save(); c.translate(0, -down * 1000); for (let i = 0; i < 11; i++) { const bx = 100 + i * 148; const g = c.createLinearGradient(bx, 0, bx + 40, 0); g.addColorStop(0, '#2a323d'); g.addColorStop(.5, '#a7b1bf'); g.addColorStop(1, '#2a323d'); c.fillStyle = g; rr(c, bx, -40, 40, 960, 18); c.fill(); } c.fillStyle = '#5b6573'; c.fillRect(60, 180, 1560, 24); c.fillRect(60, 800, 1560, 24); c.restore();
    c.save(); rr(c, 360, 260, 960, 470, 24); c.fillStyle = 'rgba(11,15,20,.88)'; c.fill(); c.restore();
    const kT = back(lin(t, tTw, tTw + .25)); if (kT > 0) { c.save(); c.translate(760, 430); c.scale(kT, kT); txt(c, '20', 0, 0, '400 340px Anton', HL); c.restore(); txt(c, 'YEARS', 1070, 470, '400 110px Anton', PAPER); }
    const st = eio(lin(t, tOut, tOut + .3)); if (st > 0) { c.lineCap = 'round'; for (const [col, lw] of [['#000', 46], [RED, 30]]) { c.strokeStyle = col; c.lineWidth = lw; c.beginPath(); c.moveTo(540, 620); c.lineTo(lerp(540, 980, st), lerp(620, 250, st)); c.stroke(); } }
    const sk = back(lin(t, tSv, tSv + .25)); if (sk > 0) { c.save(); c.translate(1130, 330); c.rotate(.1); c.scale(sk, sk); glow(c, 0, 0, 260, GREEN, .35); c.beginPath(); c.arc(0, 0, 140, 0, 7); c.fillStyle = INK; c.fill(); c.strokeStyle = GREEN; c.lineWidth = 14; c.stroke(); txt(c, '7', 0, 10, '400 220px Anton', GREEN); c.restore(); txt(c, 'OUT IN 7', 1130, 550, '400 52px Anton', GREEN); }
    if (t < tOut) stamp(c, 'PLEADED GUILTY', 840, 650, 64, RED, -.04, lin(t, tGu, tGu + .15));
  });

  // =====================================================================================
  // P33 — re-hook: COUPONS x, OIL x, then locked third panel "A PERFECT RECORD?"
  // =====================================================================================
  const tCo = W('P33', 'Coupons'), tTk = W('P33', 'tanks'), tBoth = W('P33', 'both'), tBig = W('P33', 'biggest'), tRar = W('P33', 'rarer'), tPerf = W('P33', 'perfect');
  Engine.hit(tCo, { shake: 12, punch: .03 }); Engine.hit(tTk, { shake: 12, punch: .03 }); Engine.hit(tBig, { shake: 8 }); Engine.cue(tBig, 'heartbeat');
  Engine.hit(tPerf, { glitch: 1.2, glitchDur: .6, shake: 26, punch: .06, flash: 1 }); Engine.cue(tPerf, 'sub-boom');
  Engine.scene('P33', 'P33', (c, t, lt) => {
    bgGrid(c, t, REDT); const PW = 460, PH = 580, PY = 190, xs = [100, 590, 1080];
    const hk = eo(lin(t, tBoth, tBoth + .3)); c.save(); c.globalAlpha = hk; txt(c, 'BOTH NEEDED MORE THAN THE WORLD HAD', 840, 140, '800 32px JBM', HL); c.restore();
    for (let i = 0; i < 3; i++) {
      const ts = [P('P33').start, tTk - .3, tBig][i], k = back(lin(t, ts, ts + .4)), x = xs[i]; if (i < 2 && lt < .01) { }
      const kk = i === 0 ? Math.max(k, lin(lt, 0, .35)) : k; if (kk <= 0) continue;
      c.save(); c.translate(x + PW / 2, PY + PH / 2); c.scale(kk, kk); c.translate(-PW / 2, -PH / 2);
      rr(c, 0, 0, PW, PH, 18); c.fillStyle = i === 2 ? '#0c1016' : '#10161e'; c.fill(); c.strokeStyle = i === 2 ? '#3a4656' : '#2f3a47'; c.lineWidth = 5; c.stroke();
      if (i === 0) { coupon(c, PW / 2, 230, 270, -.1); txt(c, 'COUPONS', PW / 2, 450, '400 74px Anton', PAPER); const xk = lin(t, tCo + .15, tCo + .5); cross(c, PW / 2, 300, 160, RED, xk); }
      if (i === 1) { tank(c, PW / 2, 330, 190, 250, { fill: .75 }); txt(c, 'OIL', PW / 2, 450, '400 74px Anton', PAPER); cross(c, PW / 2, 300, 160, RED, lin(t, tTk + .15, tTk + .5)); }
      if (i === 2) {
        const unlock = lin(t, tPerf, tPerf + .35); const shake = t > tRar && t < tPerf ? Math.sin(t * 60) * 4 : 0;
        // the glowing straight line
        const ln = eio(lin(t, tPerf - .05, tPerf + .6)); c.save(); c.beginPath(); rr(c, 0, 0, PW, PH, 18); c.clip(); const lg = .25 + .75 * unlock;
        if (ln > 0) { c.shadowColor = GREEN; c.shadowBlur = 40; c.strokeStyle = GREEN; c.lineWidth = 10; c.lineCap = 'round'; c.beginPath(); c.moveTo(40, PH - 150); c.lineTo(lerp(40, PW - 40, ln), lerp(PH - 150, 150, ln)); c.stroke(); c.shadowBlur = 0; }
        c.restore();
        c.save(); c.translate(PW / 2 + shake, 230); padlock(c, 0, 20, 190, lin(t, tPerf + .1, tPerf + .45)); c.restore();
        const qk = 1 + .06 * Math.sin(t * 6); c.save(); c.translate(PW / 2, 400); c.scale(qk, qk); txt(c, 'A PERFECT', 0, 0, '400 60px Anton', PAPER); txt(c, 'RECORD?', 0, 66, '400 76px Anton', t >= tPerf ? GREEN : RED); c.restore();
      }
      c.restore();
    }
  });
});
