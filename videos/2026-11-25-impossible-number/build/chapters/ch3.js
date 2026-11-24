// CHAPTER 3 — THE FUND THAT ALMOST NEVER LOST (P34-P50). Clean modern finance-UI look. Everything keyed to paragraph ids / words.
Engine.chapter(3, () => {
  const PANEL = '#111a24', EDGE = '#2b3a4c', DIM = 'rgba(245,243,238,.62)';
  const TINT = 'rgba(0,210,106,.05)', RTINT = 'rgba(255,59,48,.06)';
  const S = (spec, fn, opts) => Engine.scene(spec, typeof spec === 'string' ? spec : spec[0], fn, opts);

  // ---------------------------------------------------------------- local helpers
  function pill(c, s, x, y, font, fg, o = {}) {
    const k = o.k === undefined ? 1 : o.k; if (k <= 0) return 0;
    c.font = font; const w = c.measureText(s).width + (o.px === undefined ? 44 : o.px), h = o.h || 76;
    c.save(); c.translate(x, y); if (o.rot) c.rotate(o.rot); c.scale(k, k); c.globalAlpha = o.a === undefined ? 1 : o.a;
    c.fillStyle = o.bg || PANEL; rr(c, -w / 2, -h / 2, w, h, o.r === undefined ? h / 2 : o.r); c.fill();
    c.strokeStyle = o.stroke || fg; c.lineWidth = o.lw || 4; c.stroke(); txt(c, s, 0, 3, font, fg); c.restore(); return w;
  }
  const popK = (t, t0, d = .3) => back(lin(t, t0, t0 + d));
  function poly(c, pts, f, col, lw, gl) {
    const n = pts.length - 1, k = clamp(f) * n, i = Math.floor(k); c.save(); c.lineJoin = 'round'; c.lineCap = 'round';
    if (gl) { c.shadowColor = col; c.shadowBlur = gl; } c.strokeStyle = col; c.lineWidth = lw; c.beginPath(); c.moveTo(pts[0][0], pts[0][1]);
    for (let j = 1; j <= Math.min(i, n); j++) c.lineTo(pts[j][0], pts[j][1]);
    let last = pts[Math.min(i, n)]; if (i < n) { const a = pts[i], b = pts[i + 1], u = k - i; last = [lerp(a[0], b[0], u), lerp(a[1], b[1], u)]; c.lineTo(last[0], last[1]); }
    c.stroke(); c.restore(); return last;
  }
  function bust(c, x, y, s, col, o = {}) { // silhouette, x centre, y bottom, s height
    c.save(); c.fillStyle = col; c.beginPath(); c.moveTo(x - s * .5, y); c.quadraticCurveTo(x - s * .5, y - s * .4, x - s * .14, y - s * .44);
    c.lineTo(x + s * .14, y - s * .44); c.quadraticCurveTo(x + s * .5, y - s * .4, x + s * .5, y); c.closePath(); c.fill();
    c.fillRect(x - s * .09, y - s * .55, s * .18, s * .16); c.beginPath(); c.arc(x, y - s * .72, s * .19, 0, 7); c.fill();
    if (o.collar) { c.fillStyle = o.collar; c.beginPath(); c.moveTo(x - s * .12, y - s * .44); c.lineTo(x, y - s * .28); c.lineTo(x + s * .12, y - s * .44); c.closePath(); c.fill(); }
    if (o.glasses) { c.strokeStyle = o.glasses; c.lineWidth = Math.max(2, s * .012); c.beginPath(); c.arc(x - s * .075, y - s * .73, s * .05, 0, 7); c.moveTo(x + s * .125, y - s * .73); c.arc(x + s * .075, y - s * .73, s * .05, 0, 7); c.moveTo(x - s * .025, y - s * .73); c.lineTo(x + s * .025, y - s * .73); c.stroke(); }
    c.restore();
  }
  function spot(c, x, y, w, h, label, o = {}) { // silhouette card
    c.save(); c.translate(x, y); if (o.rot) c.rotate(o.rot); c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 40; c.shadowOffsetY = 16;
    c.fillStyle = PANEL; rr(c, -w / 2, -h / 2, w, h, 20); c.fill(); c.shadowColor = 'transparent'; c.strokeStyle = o.stroke || EDGE; c.lineWidth = 4; c.stroke();
    c.save(); rr(c, -w / 2 + 6, -h / 2 + 6, w - 12, h - 12, 16); c.clip();
    const g = c.createRadialGradient(0, -h * .2, 10, 0, -h * .1, h * .7); g.addColorStop(0, '#34475c'); g.addColorStop(1, '#0d141c'); c.fillStyle = g; c.fillRect(-w / 2, -h / 2, w, h);
    bust(c, 0, h / 2 - 78, h * .78, '#04070a', o); c.restore();
    c.fillStyle = 'rgba(0,0,0,.72)'; c.fillRect(-w / 2 + 6, h / 2 - 82, w - 12, 76); txt(c, label, 0, h / 2 - 42, o.font || '400 40px Anton', PAPER);
    if (o.sub) txt(c, o.sub, 0, -h / 2 + 34, '700 20px JBM', DIM); c.restore();
  }
  function wallst(c, x, y, w, h, col, edge) { // x centre, y base
    const top = y - h; c.save(); c.fillStyle = col; c.beginPath(); c.moveTo(x - w / 2, top + h * .22); c.lineTo(x, top); c.lineTo(x + w / 2, top + h * .22); c.closePath(); c.fill();
    c.fillRect(x - w / 2, top + h * .22, w, h * .06); const n = 8, cw = w * .075, gap = (w * .9 - n * cw) / (n - 1);
    for (let i = 0; i < n; i++) c.fillRect(x - w * .45 + i * (cw + gap), top + h * .3, cw, h * .52);
    c.fillRect(x - w * .52, y - h * .14, w * 1.04, h * .05); c.fillRect(x - w * .56, y - h * .09, w * 1.12, h * .05); c.fillRect(x - w * .6, y - h * .04, w * 1.2, h * .04);
    if (edge) { c.strokeStyle = edge; c.lineWidth = 3; c.beginPath(); c.moveTo(x - w / 2, top + h * .22); c.lineTo(x, top); c.lineTo(x + w / 2, top + h * .22); c.stroke(); for (let i = 0; i < n; i++) { const cx = x - w * .45 + i * (cw + gap) + cw; c.beginPath(); c.moveTo(cx, top + h * .3); c.lineTo(cx, top + h * .82); c.stroke(); } }
    c.restore();
  }
  function magnifier(c, x, y, r, col, lw = 12, a = 1) {
    c.save(); c.globalAlpha = a; c.strokeStyle = col; c.lineWidth = lw; c.lineCap = 'round'; c.fillStyle = 'rgba(245,243,238,.08)'; c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(x + r * .72, y + r * .72); c.lineTo(x + r * 1.55, y + r * 1.55); c.lineWidth = lw * 1.5; c.stroke(); c.restore();
  }
  function shield(c, x, y, s, col, fillc) {
    c.save(); c.translate(x, y); c.beginPath(); c.moveTo(0, -s * .5); c.bezierCurveTo(s * .25, -s * .38, s * .45, -s * .36, s * .45, -s * .36); c.lineTo(s * .45, s * .05);
    c.bezierCurveTo(s * .45, s * .3, s * .15, s * .45, 0, s * .52); c.bezierCurveTo(-s * .15, s * .45, -s * .45, s * .3, -s * .45, s * .05); c.lineTo(-s * .45, -s * .36); c.bezierCurveTo(-s * .45, -s * .36, -s * .25, -s * .38, 0, -s * .5); c.closePath();
    c.fillStyle = fillc; c.fill(); c.strokeStyle = col; c.lineWidth = s * .05; c.stroke(); c.lineWidth = s * .08; c.lineCap = 'round'; c.lineJoin = 'round'; c.beginPath(); c.moveTo(-s * .18, 0); c.lineTo(-s * .04, s * .15); c.lineTo(s * .22, -s * .16); c.stroke(); c.restore();
  }
  function stopwatch(c, x, y, r, ang, col, o = {}) {
    c.save(); c.translate(x, y); c.fillStyle = '#3a4656'; rr(c, -18, -r - 46, 36, 36, 6); c.fill(); rr(c, -42, -r - 56, 84, 18, 6); c.fill();
    c.fillStyle = '#0c131b'; c.beginPath(); c.arc(0, 0, r + 18, 0, 7); c.fill(); c.strokeStyle = col; c.lineWidth = 10; c.beginPath(); c.arc(0, 0, r, 0, 7); c.stroke();
    if (o.wedge) { c.fillStyle = col; c.globalAlpha = .22; c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, r - 8, -Math.PI / 2, -Math.PI / 2 + o.wedge); c.closePath(); c.fill(); c.globalAlpha = 1; }
    c.strokeStyle = 'rgba(245,243,238,.5)'; c.lineWidth = 3; for (let i = 0; i < 60; i++) { const a = i / 60 * Math.PI * 2 - Math.PI / 2, l = i % 5 === 0 ? 30 : 13, ca = Math.cos(a), sa = Math.sin(a); c.beginPath(); c.moveTo(ca * (r - 12), sa * (r - 12)); c.lineTo(ca * (r - 12 - l), sa * (r - 12 - l)); c.stroke(); }
    c.save(); c.rotate(ang); c.strokeStyle = col; c.lineWidth = 9; c.lineCap = 'round'; c.beginPath(); c.moveTo(0, 26); c.lineTo(0, -(r - 52)); c.stroke(); c.restore();
    c.fillStyle = col; c.beginPath(); c.arc(0, 0, 16, 0, 7); c.fill(); c.restore();
  }
  function bars(c, t, t0, y0 = 100, y1 = 880, n = 11) {
    const cx = 840, span = 1500;
    for (let i = 0; i < n; i++) { const x = cx - span / 2 + i * span / (n - 1), k = lin(t, t0 + i * .03, t0 + i * .03 + .2); if (k <= 0) continue; const dy = (1 - ei(k)) * -900;
      const g = c.createLinearGradient(x - 15, 0, x + 15, 0); g.addColorStop(0, '#2a323d'); g.addColorStop(.35, '#8b96a5'); g.addColorStop(1, '#1d242d'); c.fillStyle = g; c.fillRect(x - 15, y0 + dy, 30, y1 - y0); }
    for (const yy of [y0 + 70, y1 - 70]) { const k = lin(t, t0 + .25, t0 + .5); if (k <= 0) continue; c.fillStyle = '#4a5563'; c.fillRect(cx - span / 2 - 30, yy - 14, (span + 60) * eo(k), 28); }
  }
  function calendar(c, x, y, w, h, day, mon, o = {}) {
    c.save(); c.translate(x, y); c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 40; c.shadowOffsetY = 18; c.fillStyle = PAPER; rr(c, -w / 2, -h / 2, w, h, 22); c.fill(); c.shadowColor = 'transparent';
    c.fillStyle = RED; rr(c, -w / 2, -h / 2, w, 96, [22, 22, 0, 0]); c.fill(); txt(c, mon, 0, -h / 2 + 50, '400 52px Anton', PAPER);
    c.fillStyle = '#cfcabd'; for (let i = 0; i < 5; i++) { c.beginPath(); c.arc(-w / 2 + 70 + i * (w - 140) / 4, -h / 2, 10, 0, 7); c.fill(); }
    c.save(); c.translate(0, 30); c.scale(1, Math.max(.05, o.flip === undefined ? 1 : o.flip)); txt(c, String(day), 0, 0, `400 ${o.size || 260}px Anton`, INK); c.restore();
    txt(c, o.yr || '2008', 0, h / 2 - 54, '800 52px JBM', 'rgba(11,15,20,.55)'); c.restore();
  }
  function cuffs(c, x, y, s, a = 1) {
    c.save(); c.translate(x, y); c.globalAlpha = a; c.strokeStyle = '#c7ced8'; c.lineWidth = s * .09; c.lineCap = 'round';
    for (const dx of [-1, 1]) { c.save(); c.translate(dx * s * .5, 0); c.rotate(dx * -.15); c.beginPath(); c.ellipse(0, 0, s * .3, s * .38, 0, 0, 7); c.stroke(); c.fillStyle = '#c7ced8'; rr(c, -s * .12, -s * .52, s * .24, s * .14, 4); c.fill(); c.restore(); }
    c.lineWidth = s * .05; for (let i = 0; i < 4; i++) { c.beginPath(); c.ellipse(-s * .12 + i * s * .08, 0, s * .045, s * .03, 0, 0, 7); c.stroke(); } c.restore();
  }
  // seeded market path (0 low .. 1 high)
  const MK = []; { const n = 72; for (let i = 0; i < n; i++) { const u = i / (n - 1); let v = .05 + .78 * u + (hash(i * 1.73 + 4) + hash(i * 2.91 + 9) - 1) * .1 + Math.sin(i * .9) * .025;
      if (i >= 24 && i <= 31) v -= .2 * Math.sin((i - 24) / 7 * Math.PI) * 1; if (i >= 46 && i <= 56) v -= .26 * Math.sin((i - 46) / 10 * Math.PI); if (i === 12 || i === 38) v -= .08; MK.push(Math.max(.02, v)); } }
  const CR = []; { const n = 64; for (let i = 0; i < n; i++) { const u = i / (n - 1); CR.push(.18 + .72 * (u * .55 + u * u * u * .45) + (hash(i * 3.3 + 1) - .5) * .09); } }

  // ================================================================ P34 chapter card
  S('P34', (c, t, lt) => {
    bgGrid(c, t, TINT); glow(c, 840, 440, 800, 'rgba(0,210,106,.4)', .22);
    const pts = []; for (let i = 0; i < 40; i++) pts.push([100 + i * 40, 820 - i * 11 - Math.abs(Math.sin(i * 1.3)) * 30 * (i % 3 === 0 ? 1 : .4)]);
    c.save(); c.globalAlpha = .35; poly(c, pts, lin(lt, 0, 2.4), GREEN, 5, 18); c.restore();
    c.save(); c.globalAlpha = eo(lin(lt, .1, .4)); txt(c, 'CHAPTER THREE', 840, 250, '800 40px JBM', GREEN); c.restore();
    const jx = lt < .35 ? (hash(Math.floor(t * 30)) - .5) * 36 * (1 - lt / .35) : 0;
    for (const [s, y, a0, col] of [['THE FUND THAT', 400, W('P34', 'fund') - .25, PAPER], ['ALMOST NEVER LOST', 560, W('P34', 'almost') - .2, GREEN]]) { const k = back(lin(t, a0, a0 + .35)); if (k <= 0) continue; c.save(); c.translate(840 + jx, y); c.scale(k, k); txt(c, s, 0, 0, '400 150px Anton', col); c.restore(); }
    const u = eo(lin(t, W('P34', 'never') - .1, W('P34', 'lost') + .3)); c.fillStyle = GREEN; c.fillRect(840 - 560 * u, 660, 1120 * u, 10);
  });

  // ================================================================ P35 Madoff wasn't a nobody
  const tChair = W('P35', 'chairman'), tNob = W('P35', 'nobody');
  Engine.hit(tNob, { shake: 8, punch: .02 }); Engine.cue(tNob, 'stamp');
  S('P35', (c, t, lt) => {
    bgGrid(c, t, TINT); glow(c, 600, 480, 700, 'rgba(0,210,106,.3)', .2);
    c.save(); push(c, lt, 7, 1, 1.04, 840, 480); c.globalAlpha = .9 * eo(lin(lt, .05, .5));
    wallst(c, 620, 830, 980, 640, '#16212d', '#2f4358'); c.restore();
    const k = lin(t, W('P35', 'Bernie') - .1, W('P35', 'Bernie') + .3); if (k > 0) { c.save(); c.globalAlpha = k; c.translate((1 - eo(k)) * -120, 0); spot(c, 560, 490, 420, 560, 'BERNIE MADOFF', { collar: '#e9edf2', }); c.restore(); }
    stamp(c, 'NOT A NOBODY', 1300, 250, 56, GREEN, .07, lin(t, tNob, tNob + .15));
    const bk = back(lin(t, tChair - .12, tChair + .3)); if (bk > 0) { c.save(); c.translate(1230 + (1 - eo(lin(t, tChair - .12, tChair + .3))) * 500, 520); c.fillStyle = PANEL; rr(c, -330, -62, 660, 124, 18); c.fill(); c.strokeStyle = GREEN; c.lineWidth = 5; c.stroke();
      txt(c, 'FORMER', -160, -26, '800 22px JBM', GREEN); txt(c, 'NASDAQ CHAIRMAN', -10, 14, '400 52px Anton', PAPER); c.fillStyle = GREEN; c.beginPath(); c.arc(-290, 0, 14, 0, 7); c.fill(); c.restore(); }
  }, { name: 'ch3a' });
  const tHis = W('P35', 'His') - .08, tBig = W('P35', 'biggest'), tWall = W('P35', 'Wall');
  Engine.hit(tBig, { punch: .03 });
  S(['P35', 'His', 1, -.08], (c, t, lt) => {
    bgGrid(c, t, TINT);
    const bk = popK(t, tHis + .1); if (bk > 0) pill(c, 'TOP WALL ST MARKET MAKER', 840, 215, '400 56px Anton', GREEN, { k: bk, h: 104, px: 90, bg: '#0f1b17', lw: 5 });
    c.save(); c.fillStyle = '#0c131b'; c.fillRect(0, 740, 1700, 64); c.beginPath(); c.rect(0, 740, 1700, 64); c.clip(); const off = (t * 160) % 520, sy = ['AAPL', 'MSFT', 'IBM', 'GE', 'XOM', 'KO', 'PG', 'JNJ'];
    for (let i = -1; i < 5; i++) for (let j = 0; j < 3; j++) { const k = (i * 3 + j + 8) % 8, up = hash(k * 2.3) > .4; txt(c, `${sy[k]} ${up ? '▲' : '▼'}`, i * 520 + j * 173 - off + 40, 773, '700 26px JBM', up ? GREEN : RED, 'left'); } c.restore();
    const nodes = [[330, 'SELLERS'], [1350, 'BUYERS']]; const mk = eo(lin(t, tHis + .2, tHis + .6));
    c.save(); c.globalAlpha = mk; for (const [x, l] of nodes) { c.fillStyle = PANEL; rr(c, x - 150, 400, 300, 140, 16); c.fill(); c.strokeStyle = EDGE; c.lineWidth = 4; c.stroke(); txt(c, l, x, 470, '400 52px Anton', PAPER); }
    c.strokeStyle = 'rgba(0,210,106,.5)'; c.lineWidth = 4; c.setLineDash([14, 10]); c.beginPath(); c.moveTo(480, 470); c.lineTo(660, 470); c.moveTo(1020, 470); c.lineTo(1200, 470); c.stroke(); c.setLineDash([]);
    const pulse = 1 + .03 * Math.sin(t * 6); c.save(); c.translate(840, 470); c.scale(pulse, pulse); glow(c, 0, 0, 280, GREEN, .3); c.fillStyle = '#0f1b17'; rr(c, -190, -90, 380, 180, 20); c.fill(); c.strokeStyle = GREEN; c.lineWidth = 6; c.stroke();
    txt(c, "MADOFF'S FIRM", 0, -18, '400 50px Anton', GREEN); txt(c, 'MARKET MAKER', 0, 38, '800 26px JBM', DIM); c.restore();
    for (let i = 0; i < 6; i++) { const u = ((t * .5 + i / 6) % 1); c.fillStyle = GREEN; c.beginPath(); c.arc(lerp(480, 650, u), 470, 9, 0, 7); c.fill(); c.fillStyle = HL; c.beginPath(); c.arc(lerp(1030, 1200, u), 470, 9, 0, 7); c.fill(); }
    c.restore();
    const ws = popK(t, tWall - .1); if (ws > 0) { c.save(); c.translate(840, 640); c.scale(ws, ws); c.fillStyle = '#0b5a37'; rr(c, -170, -42, 340, 84, 8); c.fill(); c.strokeStyle = PAPER; c.lineWidth = 4; rr(c, -160, -34, 320, 68, 5); c.stroke(); txt(c, 'WALL ST', 0, 3, '400 50px Anton', PAPER); c.restore(); }
  });

  // ================================================================ P36 boring pitch -> bars
  S('P36', (c, t, lt) => {
    bgGrid(c, t, TINT); const k = back(lin(t, P('P36').start + .1, P('P36').start + .5));
    c.save(); c.translate(840, 440); c.scale(k, k); c.fillStyle = PANEL; rr(c, -420, -200, 840, 400, 22); c.fill(); c.strokeStyle = EDGE; c.lineWidth = 4; c.stroke();
    txt(c, 'THE PITCH', -300, -140, '800 30px JBM', DIM, 'left'); txt(c, 'ALMOST BORING', 0, -20, '400 110px Anton', PAPER);
    c.strokeStyle = GREEN; c.lineWidth = 6; c.beginPath(); c.moveTo(-360, 110); for (let x = -360; x <= 360; x += 8) c.lineTo(x, 110 + Math.sin(x * .02 + t * 2) * 6); c.stroke();
    const zz = t * 1.2; for (let i = 0; i < 3; i++) { const u = (zz + i / 3) % 1; c.globalAlpha = 1 - u; txt(c, 'z', 360 + u * 60, -150 - u * 90, `800 ${34 + i * 12}px JBM`, GREY); } c.globalAlpha = 1; c.restore();
  });
  const tNo = W('P36', 'No') - .05, tFifty = W('P36', 'fifty'), tStrike = W('P36', 'just') - .05;
  Engine.hit(tFifty, { shake: 10, punch: .03 });
  S(['P36', 'No', 1, -.05], (c, t, lt) => {
    bgGrid(c, t, RTINT);
    const k = back(lin(t, tNo, tNo + .3)); c.save(); c.translate(840, 440); c.scale(k, k); glow(c, 0, 0, 450, RED, .3); txt(c, '50%', 0, 0, '800 330px JBM', RED);
    const s = eo(lin(t, tStrike, tStrike + .3)); c.strokeStyle = PAPER; c.lineWidth = 22; c.lineCap = 'round'; c.beginPath(); c.moveTo(-420, 0); c.lineTo(-420 + 840 * s, 0); c.stroke(); c.restore();
    txt(c, 'NO', 840, 190, '400 80px Anton', PAPER);
    const st = back(lin(t, W('P36', 'steady') - .1, W('P36', 'steady') + .3)); if (st > 0) pill(c, 'STEADY RETURNS', 840, 730, '400 60px Anton', GREEN, { k: st, h: 100, px: 80, bg: '#0f1b17' });
  });
  const yrs = []; for (let i = 0; i < 17; i++) yrs.push(10 + (hash(i * 4.1 + 2) - .5) * 3.2);
  S(['P36', 'around', 1, -.05], (c, t, lt) => {
    bgGrid(c, t, TINT); const bx0 = 194, base = 780, sc = 28;
    txt(c, 'RETURN PER YEAR', 120, 160, '800 28px JBM', DIM, 'left');
    c.strokeStyle = 'rgba(245,243,238,.18)'; c.lineWidth = 2; c.beginPath(); c.moveTo(150, base); c.lineTo(1530, base); c.stroke();
    const t0 = W('P36', 'ten') - .2;
    for (let i = 0; i < 17; i++) { const a = t0 + i * .15, k = lin(t, a, a + .22); if (k <= 0) continue; const h = yrs[i] * sc * eo(k), x = bx0 + i * 76;
      c.save(); c.shadowColor = GREEN; c.shadowBlur = 14 * (1 - k); c.fillStyle = GREEN; rr(c, x, base - h, 56, h, [8, 8, 0, 0]); c.fill(); c.restore(); }
    const dl = eo(lin(t, t0 + .5, t0 + 1.2)); c.setLineDash([16, 12]); c.strokeStyle = HL; c.lineWidth = 3; c.beginPath(); c.moveTo(150, base - 10 * sc); c.lineTo(150 + 1380 * dl, base - 10 * sc); c.stroke(); c.setLineDash([]);
    pill(c, '~10% / YEAR', 1290, 270, '800 64px JBM', HL, { k: popK(t, t0 + .6), h: 110, px: 70, bg: '#1b1a08' });
    const ya = lin(t, W('P36', 'year', 3) - .05, W('P36', 'year', 3) + .3); if (ya > 0) { c.save(); c.globalAlpha = ya; txt(c, 'YEAR AFTER YEAR AFTER YEAR', 840, 830, '400 44px Anton', PAPER); c.restore(); }
  });

  // ================================================================ P37 greed vs safety
  const tPz = W('P37', 'Ponzi'), tMd = W('P37', 'Madoff');
  Engine.hit(tPz, { punch: .03 }); Engine.hit(tMd, { punch: .03 });
  S('P37', (c, t, lt) => {
    bgGrid(c, t, 'rgba(255,255,255,.03)');
    const g = back(lin(t, P('P37').start + .05, P('P37').start + .4)); txt(c, 'THE GENIUS OF IT', 840, 140, '800 34px JBM', HL);
    for (const [side, x, col, tw, title, tag] of [[0, 450, RED, tPz, 'PONZI SOLD GREED', '50% ROCKET'], [1, 1230, GREEN, tMd, 'MADOFF SOLD SAFETY', 'CALM & STEADY']]) {
      const lit = lin(t, tw - .1, tw + .25); c.save(); c.translate(x, 470); c.scale(g, g); c.globalAlpha = .35 + .65 * lit; c.fillStyle = PANEL; rr(c, -360, -290, 720, 580, 22); c.fill(); c.strokeStyle = lit > 0 ? col : EDGE; c.lineWidth = 5; c.stroke();
      txt(c, title, 0, -225, '400 56px Anton', PAPER);
      const pts = []; for (let i = 0; i <= 40; i++) { const u = i / 40; pts.push(side === 0 ? [-300 + u * 600, 200 - Math.pow(u, 3.2) * 320 - Math.abs(Math.sin(i * 1.7)) * 8] : [-300 + u * 600, 200 - u * 105 - Math.sin(i * .9) * 4]); }
      c.strokeStyle = 'rgba(245,243,238,.12)'; c.lineWidth = 2; c.beginPath(); c.moveTo(-320, 210); c.lineTo(320, 210); c.stroke();
      poly(c, pts, eo(lin(t, tw, tw + 1.0)), col, 8, 16);
      if (side === 0) { if (eo(lin(t, tw + .8, tw + 1.1)) > 0) txt(c, '▲ 50%', -170, -110, '800 60px JBM', RED); } else { c.save(); c.globalAlpha = lit; shield(c, -190, -80, 170, GREEN, 'rgba(0,210,106,.14)'); c.restore(); }
      txt(c, tag, 0, 255, '800 26px JBM', col); c.restore(); }
  });

  // ================================================================ P38 10.5% x 17 YEARS, then 2008
  const t10 = W('P38', 'ten'), t17 = W('P38', 'seventeen');
  S('P38', (c, t, lt) => {
    bgGrid(c, t, TINT); glow(c, 840, 440, 800, 'rgba(0,210,106,.35)', .2);
    txt(c, 'REPORTED RETURNS', 840, 160, '800 32px JBM', DIM);
    const t5 = W('P38', 'five') + .35, v = roll(t, t10 - .05, t5, 10.5, 0, eio), k = 1 + .08 * (1 - lin(t, t5, t5 + .35)) * (t > t5 ? 1 : 0);
    c.save(); c.translate(840, 350); c.scale(k, k); c.globalAlpha = lin(t, t10 - .2, t10); txt(c, v.toFixed(1) + '% / YR', 0, 0, '800 190px JBM', GREEN); c.restore();
    const ky = lin(t, t17 - .15, t17 + .2); if (ky > 0) { const y = Math.round(roll(t, t17 - .05, t17 + .45, 17, 0, eo)); c.save(); c.translate(840, 565); c.scale(back(ky), back(ky)); txt(c, '× ' + y + ' YEARS', 0, 0, '800 150px JBM', PAPER); c.restore();
      for (let i = 0; i < 17; i++) { const on = y > i; c.fillStyle = on ? GREEN : 'rgba(245,243,238,.12)'; rr(c, 840 - 17 * 25 + i * 50, 680, 40, 40, 6); c.fill(); } }
  });
  const tLate = W('P38', 'late') - .05, tCrash = W('P38', 'crashing'), tStill = W('P38', 'still');
  Engine.hit(tCrash, { shake: 14, glitch: .6, glitchDur: .3 }); Engine.hit(tStill, { punch: .03 }); Engine.cue(tCrash, 'crash');
  const mkt = [], fnd = []; { const n = CR.length; for (let i = 0; i < n; i++) { const u = i / (n - 1); mkt.push([220 + u * 900, 270 + CR[i] * 520 - 10]); fnd.push([220 + u * 900, 330 - u * 70 + Math.sin(i * 1.1) * 3]); } }
  S(['P38', 'late', 1, -.05], (c, t, lt) => {
    bgGrid(c, t, RTINT); c.fillStyle = PANEL; rr(c, 150, 170, 1000, 640, 18); c.fill(); c.strokeStyle = EDGE; c.lineWidth = 3; c.stroke();
    txt(c, 'LATE 2008', 190, 215, '800 30px JBM', DIM, 'left'); c.strokeStyle = 'rgba(245,243,238,.08)'; c.lineWidth = 2; for (let y = 280; y < 790; y += 100) { c.beginPath(); c.moveTo(170, y); c.lineTo(1130, y); c.stroke(); }
    c.setLineDash([10, 10]); c.strokeStyle = 'rgba(245,243,238,.3)'; c.beginPath(); c.moveTo(170, 330); c.lineTo(1130, 330); c.stroke(); c.setLineDash([]);
    poly(c, mkt, lin(t, tLate + .2, tCrash + .4), RED, 8, 14);
    pill(c, 'MARKET, 2008', 1350, 650, '800 44px JBM', RED, { k: popK(t, tCrash - .3), h: 90, bg: '#1d0d0c' });
    const fk = lin(t, tStill - .1, tStill + 1.0); if (fk > 0) { poly(c, fnd, eo(fk), GREEN, 10, 22); pill(c, 'FUND: STILL UP', 1350, 280, '800 44px JBM', GREEN, { k: popK(t, tStill + .5), h: 90, bg: '#0d1d15' }); stamp(c, '✓ UP', 1350, 420, 70, GREEN, -.06, lin(t, tStill + .7, tStill + .85), 'JBM'); }
  });

  // ================================================================ P39 THE KEY VISUAL
  const tDrops = W('P39', 'drops'), tBadY = W('P39', 'bad', 2), tMad = W('P39', "Madoff's"), tPerf = W('P39', 'perfect'), t45 = W('P39', '45'), tDeg = W('P39', 'degree');
  Engine.hit(tPerf, { glitch: 1.1, glitchDur: .5, shake: 26, punch: .06, flash: 1 }); Engine.cue(tPerf, 'sub-boom');
  S('P39', (c, t, lt) => {
    bgGrid(c, t, TINT); c.save(); push(c, lt, 10, 1, 1.035, 700, 500);
    const X0 = 200, Y0 = 810, D = 640; // plot is square so the straight line is a true 45 deg
    c.fillStyle = 'rgba(17,26,36,.9)'; rr(c, X0 - 50, Y0 - D - 50, D + 110, D + 100, 14); c.fill(); c.strokeStyle = EDGE; c.lineWidth = 3; c.stroke();
    c.strokeStyle = 'rgba(245,243,238,.07)'; c.lineWidth = 2; for (let i = 1; i < 8; i++) { c.beginPath(); c.moveTo(X0, Y0 - i * D / 8); c.lineTo(X0 + D, Y0 - i * D / 8); c.moveTo(X0 + i * D / 8, Y0); c.lineTo(X0 + i * D / 8, Y0 - D); c.stroke(); }
    c.strokeStyle = 'rgba(245,243,238,.45)'; c.lineWidth = 4; c.beginPath(); c.moveTo(X0, Y0 - D); c.lineTo(X0, Y0); c.lineTo(X0 + D + 30, Y0); c.stroke();
    txt(c, 'VALUE', X0 + 6, Y0 - D - 24, '700 20px JBM', DIM, 'left'); txt(c, 'TIME →', X0 + D, Y0 + 24, '700 20px JBM', DIM, 'right');
    const pts = MK.map((v, i) => [X0 + i / (MK.length - 1) * D, Y0 - 14 - v * (D - 200)]);
    const dim = 1 - .62 * eo(lin(t, tPerf, tPerf + .4));
    c.save(); c.globalAlpha = dim; poly(c, pts, lin(t, P('P39').start + .35, tBadY + .7), RED, 6, 0); c.restore();
    let i1 = 28, i2 = 52, m1 = 9, m2 = 9; for (let i = 22; i < 34; i++) if (MK[i] < m1) { m1 = MK[i]; i1 = i; } for (let i = 44; i < 60; i++) if (MK[i] < m2) { m2 = MK[i]; i2 = i; }
    c.save(); c.globalAlpha = dim; for (const [i, tt, lab, dx, dy] of [[i1, tDrops, 'BAD MONTH', 60, -116], [i2, tBadY, 'BAD YEAR', 220, 140]]) { const k = popK(t, tt - .1, .25); if (k <= 0) continue; const p = pts[i];
      c.strokeStyle = RED; c.lineWidth = 3; c.beginPath(); c.moveTo(p[0], p[1]); c.lineTo(p[0] + dx * .5 * k, p[1] + dy * .5 * k); c.stroke(); c.fillStyle = RED; c.beginPath(); c.arc(p[0], p[1], 9, 0, 7); c.fill();
      pill(c, lab, p[0] + dx * .5, p[1] + dy * .5, '800 24px JBM', RED, { k, h: 46, px: 30, bg: '#1d0d0c', lw: 3 }); } c.restore();
    const mf = lin(t, tMad, tPerf - .05); if (mf > 0) { const e = eio(mf); const ex = X0 + D * e, ey = Y0 - D * e; c.save(); c.shadowColor = GREEN; c.shadowBlur = 36; c.strokeStyle = GREEN; c.lineWidth = 12; c.lineCap = 'round'; c.beginPath(); c.moveTo(X0, Y0); c.lineTo(ex, ey); c.stroke(); c.shadowBlur = 0; c.strokeStyle = '#c9ffe2'; c.lineWidth = 4; c.stroke(); c.restore(); glow(c, ex, ey, 70, GREEN, .7); }
    const pk = eo(lin(t, t45 - .1, t45 + .5)); if (pk > 0) { c.save(); c.translate(X0, Y0); const R = 190; c.fillStyle = 'rgba(255,214,10,.14)'; c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, R, 0, -Math.PI / 4 * pk, true); c.closePath(); c.fill();
      c.strokeStyle = HL; c.lineWidth = 6; c.beginPath(); c.arc(0, 0, R, 0, -Math.PI / 4 * pk, true); c.stroke(); c.lineWidth = 3; for (let d = 0; d <= 45 * pk; d += 5) { const a = -d * Math.PI / 180, l = d % 15 === 0 ? 26 : 14; c.beginPath(); c.moveTo(Math.cos(a) * R, Math.sin(a) * R); c.lineTo(Math.cos(a) * (R - l), Math.sin(a) * (R - l)); c.stroke(); }
      c.setLineDash([10, 8]); c.strokeStyle = 'rgba(245,243,238,.6)'; c.beginPath(); c.moveTo(0, 0); c.lineTo(R + 60, 0); c.stroke(); c.setLineDash([]); c.restore(); }
    const lk = popK(t, tDeg - .05, .3); if (lk > 0) { c.save(); c.translate(X0 + 112, Y0 - 50); c.scale(lk, lk); c.fillStyle = 'rgba(11,15,20,.9)'; rr(c, -68, -38, 136, 76, 12); c.fill(); txt(c, '45°', 0, 4, '800 62px JBM', HL); c.restore(); }
    c.restore();
    const lg = eo(lin(t, P('P39').start + .3, P('P39').start + .7)); c.save(); c.globalAlpha = lg;
    c.fillStyle = RED; c.fillRect(960, 158, 36, 8); txt(c, 'A REAL MARKET', 1010, 162, '800 28px JBM', RED, 'left'); txt(c, 'BAD MONTHS · BAD YEARS', 1010, 196, '700 22px JBM', DIM, 'left'); c.restore();
    c.save(); c.globalAlpha = eo(lin(t, tMad, tMad + .3)); c.fillStyle = GREEN; c.fillRect(960, 258, 36, 8); txt(c, "MADOFF'S FUND", 1010, 262, '800 28px JBM', GREEN, 'left'); txt(c, 'A RULER-STRAIGHT LINE', 1010, 296, '700 22px JBM', DIM, 'left'); c.restore();
    stamp(c, 'TOO PERFECT', 1185, 520, 118, RED, -.1, lin(t, tPerf, tPerf + .16));
    c.save(); c.globalAlpha = eo(lin(t, tPerf + .9, tPerf + 1.4)); txt(c, "REAL MONEY DOESN'T DO THIS", 1185, 680, '800 30px JBM', PAPER); c.restore();
  });

  // ================================================================ P40 Markopolos card, stopwatch
  const tHarry = W('P40', 'Harry'), tCopy = W('P40', 'copy');
  Engine.hit(tHarry, { punch: .03, flash: .6 }); Engine.cue(tHarry, 'camera-flash');
  S('P40', (c, t, lt) => {
    bgGrid(c, t, TINT); const k = lin(t, tHarry - .1, tHarry + .35);
    if (k < 1) { c.save(); c.globalAlpha = 1 - k; c.setLineDash([16, 12]); c.strokeStyle = EDGE; c.lineWidth = 5; rr(c, 300, 200, 440, 580, 20); c.stroke(); c.setLineDash([]); txt(c, '?', 520, 470, '800 260px JBM', EDGE); txt(c, 'WHO IS THIS?', 520, 700, '800 30px JBM', DIM); c.restore(); }
    if (k > 0) { c.save(); c.globalAlpha = k; c.translate((1 - eo(k)) * -140, 0); spot(c, 520, 490, 440, 580, 'HARRY MARKOPOLOS', { glasses: '#9fb0c3', collar: '#e9edf2', font: '400 36px Anton' }); c.restore(); }
    typedText(c, 'FINANCIAL ANALYST', 1000, 300, '800 44px JBM', GREEN, t, P('P40').start + .1, P('P40').start + 1.2, 'left');
    const ck = lin(t, tCopy - .15, tCopy + .3); if (ck > 0) { c.save(); c.globalAlpha = ck; txt(c, 'ASSIGNMENT:', 1000, 420, '800 28px JBM', DIM, 'left'); txt(c, "COPY MADOFF'S STRATEGY", 1000, 480, '400 58px Anton', PAPER, 'left');
      c.fillStyle = PANEL; rr(c, 1000, 540, 230, 190, 14); c.fill(); c.strokeStyle = GREEN; c.lineWidth = 4; c.stroke(); chartIcon(c, 1115, 640, 170, 110, GREEN, 8); txt(c, 'MADOFF', 1115, 706, '800 22px JBM', GREEN);
      c.fillStyle = PANEL; rr(c, 1330, 540, 230, 190, 14); c.fill(); c.setLineDash([12, 8]); c.strokeStyle = HL; c.stroke(); c.setLineDash([]); txt(c, '?', 1445, 625, '800 100px JBM', HL); txt(c, 'THE COPY', 1445, 706, '800 22px JBM', HL);
      txt(c, '→', 1280, 635, '800 52px JBM', PAPER); c.restore(); }
  });
  const tHe = W('P40', 'later') - .2, tFive = W('P40', 'five'), tAdd = W('P40', 'numbers'), tFour = W('P40', 'four'), tProve = W('P40', 'prove');
  Engine.hit(tFive, { punch: .03 }); Engine.cue(tFive, 'stopwatch-tick'); Engine.hit(tFour, { punch: .04, shake: 8 }); Engine.hit(tProve, { shake: 14, flash: .7 });
  S(['P40', 'later', 1, -.2], (c, t, lt) => {
    bgGrid(c, t, TINT); const cx = 840, cy = 460, r = 200;
    const sh = eo(lin(t, tHe, tHe + .3)); c.save(); c.globalAlpha = sh; c.translate(0, (1 - sh) * 40);
    let ang, col, wedge = 0; const spin = lin(t, tFour - .05, tFour + 1.3);
    if (t < tFour - .05) { ang = lin(t, tFive - .3, tFive + .5) * (Math.PI * 2 * 5 / 60) + Math.sin(t * 40) * .01 * lin(t, tFive, tFive + 2); col = HL; wedge = ang; }
    else { ang = Math.PI * 2 * 5 / 60 + spin * Math.PI * 2 * 6 * eio(spin); col = GREEN; wedge = Math.PI * 2 * 5 / 60; }
    stopwatch(c, cx, cy, r, ang, col, { wedge }); c.restore();
    txt(c, 'HARRY MARKOPOLOS', 140, 150, '800 26px JBM', DIM, 'left');
    if (t < tFour) { if (popK(t, tFive - .1) > 0) txt(c, '5 MIN', cx, cy + 90, '800 76px JBM', HL); } else txt(c, '4 HOURS', cx, cy + 90, '800 62px JBM', GREEN);
    const c1 = popK(t, tFive + .2); if (c1 > 0) pill(c, '5 MIN = DOUBT', 400, 740, '800 38px JBM', HL, { k: c1, h: 80, bg: '#1b1a08' });
    const c2 = popK(t, tFour + .2); if (c2 > 0) pill(c, '4 HOURS = PROOF', 1280, 740, '800 38px JBM', GREEN, { k: c2, h: 80, bg: '#0d1d15' });
    const ad = lin(t, tAdd - .1, tAdd + .3) * (1 - lin(t, tFour - .2, tFour)); if (ad > 0) { c.save(); c.globalAlpha = ad; txt(c, "NUMBERS DON'T ADD UP", 1270, 430, '400 56px Anton', RED); c.restore(); }
    stamp(c, 'PROVED', 1330, 330, 80, GREEN, .09, lin(t, tProve, tProve + .15));
  });

  // ================================================================ P41 losing months grid
  const REDC = [17, 42, 68, 89];
  S('P41', (c, t, lt) => {
    bgGrid(c, t, RTINT); const a = back(lin(t, P('P41').start + .1, P('P41').start + .45)); c.save(); c.translate(840, 300); c.scale(a, a);
    c.save(); c.translate(-330, 0); for (let i = 0; i < 4; i++) { const wv = Math.sin(t * 5 + i) * .06; c.save(); c.translate(i * 220 - 20, 0); c.rotate(wv); c.fillStyle = PAPER; c.fillRect(-4, -70, 8, 190); c.fillStyle = RED; c.beginPath(); c.moveTo(4, -70); c.lineTo(110, -35); c.lineTo(4, 0); c.closePath(); c.fill(); c.restore(); } c.restore();
    txt(c, 'RED FLAGS', 0, 250, '400 120px Anton', PAPER); c.restore();
    const wm = lin(t, W('P41', 'math') - .1, W('P41', 'math') + .25); if (wm > 0) { c.save(); c.translate(840, 730); c.scale(back(wm), back(wm)); txt(c, '= MATH', 0, 0, '800 100px JBM', GREEN); c.restore(); }
  });
  const tMadr = W('P41', 'reported') - .2, tFour41 = W('P41', 'four'), tReal41 = W('P41', 'Real');
  Engine.hit(tFour41, { punch: .04, shake: 8 }); Engine.hit(tReal41, { shake: 10 });
  S(['P41', 'Madoff', 1, -.05], (c, t, lt) => {
    bgGrid(c, t, 'rgba(255,255,255,.03)'); const cell = 56, gap = 10, gx = 150, gy = 175; const jig = Math.max(0, 1 - lin(t, tReal41, tReal41 + .5)) * (t > tReal41 ? 1 : 0);
    c.save(); c.translate(Math.sin(t * 60) * 6 * jig, 0);
    for (let i = 0; i < 100; i++) { const r = Math.floor(i / 10), q = i % 10, a0 = tMadr + i * .022, k = back(lin(t, a0, a0 + .2)); if (k <= 0) continue; const isR = REDC.indexOf(i) >= 0, fl = isR ? popK(t, tFour41 + REDC.indexOf(i) * .13, .25) : 0;
      const x = gx + q * (cell + gap), y = gy + r * (cell + gap); c.save(); c.translate(x + cell / 2, y + cell / 2); c.scale(k * (1 + (fl > 0 ? .25 * (1 - lin(fl, .6, 1)) : 0)), k); const col = (isR && fl > .02) ? RED : GREEN;
      if (isR && fl > .02) { c.shadowColor = RED; c.shadowBlur = 24; } c.fillStyle = col; c.globalAlpha = (isR && fl > .02) ? 1 : .85; rr(c, -cell / 2, -cell / 2, cell, cell, 8); c.fill(); c.restore(); }
    c.restore();
    txt(c, 'EACH CELL = ONE MONTH', gx, 150, '800 22px JBM', DIM, 'left');
    const rk = lin(t, tFour41 - .3, tFour41 + .3); c.save(); c.globalAlpha = rk; txt(c, 'LOSING MONTHS', 1230, 300, '400 74px Anton', PAPER);
    c.save(); c.translate(1230, 450); const sp = 1 + .1 * (1 - lin(t, tFour41, tFour41 + .4)); c.scale(sp, sp); glow(c, 0, 0, 280, RED, .3); txt(c, '≈ 4%', 0, 0, '800 190px JBM', RED); c.restore(); c.restore();
    c.fillStyle = GREEN; rr(c, 960, 640, 30, 30, 6); c.fill(); txt(c, 'WINNING MONTH', 1006, 656, '700 24px JBM', DIM, 'left'); c.fillStyle = RED; rr(c, 960, 690, 30, 30, 6); c.fill(); txt(c, 'LOSING MONTH', 1006, 706, '700 24px JBM', DIM, 'left');
    stamp(c, 'NOT HOW MARKETS MOVE', 1250, 790, 46, RED, -.05, lin(t, W('P41', 'that'), W('P41', 'that') + .15));
  });

  // ================================================================ P42 options that existed vs needed
  const tImpossible = W('P42', 'impossible'), tMake = W('P42', 'make') - .05;
  Engine.hit(tImpossible, { glitch: .8, glitchDur: .3, shake: 14, punch: .04 });
  S('P42', (c, t, lt) => {
    bgGrid(c, t, TINT); const a = eo(lin(t, P('P42').start + .1, P('P42').start + .4)); c.save(); c.globalAlpha = a; txt(c, 'THE STRATEGY ITSELF', 840, 210, '400 96px Anton', PAPER); c.restore();
    const k = back(lin(t, tImpossible - .05, tImpossible + .3)); if (k > 0) { c.save(); c.translate(840, 340); c.scale(k, k); glow(c, 0, 0, 380, RED, .3); txt(c, 'WAS IMPOSSIBLE', 0, 0, '400 130px Anton', RED); c.restore(); }
    const lk = eo(lin(t, tMake, tMake + .35)); if (lk > 0) { c.save(); c.globalAlpha = lk; c.fillStyle = PANEL; rr(c, 380, 470, 920, 340, 16); c.fill(); c.strokeStyle = EDGE; c.lineWidth = 3; c.stroke(); txt(c, "MADOFF'S CLAIMED TRADES", 840, 505, '800 24px JBM', HL);
      c.save(); c.beginPath(); c.rect(380, 525, 920, 280); c.clip(); const rows = ['BUY CALLS', 'SELL PUTS', 'BUY STOCK', 'SELL CALLS', 'BUY PUTS', 'BUY STOCK'], off = (t * 90) % 70;
      for (let i = -1; i < 6; i++) { const ri = ((i + Math.floor(t * 90 / 70)) % 6 + 6) % 6, y = 560 + i * 70 + off; txt(c, rows[ri], 430, y, '800 34px JBM', ri % 2 ? RED : GREEN, 'left'); txt(c, '× ' + '▮'.repeat(1 + ri % 3 + (i & 1)), 1250, y, '700 30px JBM', DIM, 'right'); c.strokeStyle = 'rgba(245,243,238,.07)'; c.beginPath(); c.moveTo(400, y + 35); c.lineTo(1280, y + 35); c.stroke(); } c.restore(); c.restore(); }
  });
  const tNeeded = W('P42', 'needed'), tChi = W('P42', 'Chicago'), tThan = W('P42', 'than'), tExist = W('P42', 'existed');
  const tPunch = tNeeded + .5;
  Engine.hit(tPunch, { shake: 22, punch: .05 }); Engine.cue(tPunch, 'crash'); Engine.hit(tExist, { shake: 10, flash: .8, glitch: .6, glitchDur: .25 });
  S(['P42', 'needed', 1, -.2], (c, t, lt) => {
    bgGrid(c, t, TINT); const base = 750, ceil = 510, x1 = 560, x2 = 1050, bw = 200;
    const bk = eo(lin(t, tNeeded - .2, tNeeded + .3));
    c.strokeStyle = 'rgba(245,243,238,.35)'; c.lineWidth = 4; c.beginPath(); c.moveTo(380, base); c.lineTo(1300, base); c.stroke();
    c.fillStyle = 'rgba(0,210,106,.95)'; rr(c, x1 - bw / 2, base - (base - ceil) * bk, bw, (base - ceil) * bk, [10, 10, 0, 0]); c.fill();
    const nh = (base - 135) * eo(lin(t, tNeeded, tPunch + .45));
    c.fillStyle = '#4a5563'; c.fillRect(380, ceil - 20, 920, 20); c.fillStyle = '#2e3743'; c.fillRect(380, ceil, 920, 8);
    c.save(); c.shadowColor = RED; c.shadowBlur = 24; c.fillStyle = RED; rr(c, x2 - bw / 2, base - nh, bw, nh, [10, 10, 0, 0]); c.fill(); c.restore();
    c.setLineDash([14, 10]); c.strokeStyle = HL; c.lineWidth = 3; c.beginPath(); c.moveTo(x1 + bw / 2, ceil - 30); c.lineTo(x2 - bw / 2 - 20, ceil - 30); c.stroke(); c.setLineDash([]); txt(c, 'CEILING', 1300, ceil - 40, '800 22px JBM', HL, 'right');
    for (let i = 0; i < 16; i++) { const u = lin(t, tPunch, tPunch + 1.0), a = hash(i * 2.1) * Math.PI; if (u <= 0 || u >= 1) continue; const d = 40 + hash(i) * 150 * u; c.fillStyle = i % 2 ? '#8b96a5' : RED; c.save(); c.translate(x2 + Math.cos(a) * d * 1.5, ceil - Math.sin(a) * d * .8 + 300 * u * u); c.rotate(u * 6 + i); c.fillRect(-7, -7, 14, 14); c.restore(); }
    const cb = popK(t, tChi - .1, .35); if (cb > 0) { c.save(); c.translate(430, 160); c.scale(cb, cb); c.fillStyle = '#0f1b2b'; rr(c, 0, -46, 520, 92, 14); c.fill(); c.strokeStyle = '#4fa3ff'; c.lineWidth = 4; c.stroke(); txt(c, 'CBOE', 100, 4, '400 62px Anton', '#7cc0ff'); txt(c, 'CHICAGO BOARD', 330, -12, '800 24px JBM', PAPER); txt(c, 'OPTIONS EXCHANGE', 330, 20, '800 24px JBM', PAPER); c.restore(); }
    const l1 = popK(t, tNeeded - .1); if (l1 > 0) pill(c, 'OPTIONS MADOFF NEEDED', x2, 800, '800 28px JBM', RED, { k: l1, h: 52, px: 34, bg: '#1d0d0c' });
    const l2 = popK(t, tThan - .1); if (l2 > 0) pill(c, 'OPTIONS THAT EXISTED', x1, 800, '800 28px JBM', GREEN, { k: l2 * (1 + .06 * Math.sin(t * 10) * (t < tExist + .6 ? 1 : 0)), h: 52, px: 34, bg: '#0d1d15' });
    stamp(c, 'IMPOSSIBLE', 1400, 560, 74, RED, -.11, lin(t, tExist, tExist + .15));
  });

  // ================================================================ P43 ticket callback
  const t123 = W('P43', '123'), t20 = W('P43', 'twenty');
  Engine.hit(P('P43').start + .05, { shake: 14, punch: .03, glitch: .5, glitchDur: .2 }); Engine.hit(t123, { punch: .03 }); Engine.hit(t20, { shake: 12, punch: .04, glitch: .5, glitchDur: .2 });
  S('P43', (c, t, lt) => {
    bgGrid(c, t, 'rgba(255,59,48,.05)');
    c.save(); c.translate(560, 490); c.scale(.74, .74); c.translate(-840, -490); paperSlam(c, t, P('P43').start + .05, 840, 490, 960, 620, -.025, '#EFE7D2', (c2, w, h) => ticketContent(c2, w, h, { pop: Math.max(0, 1 - lin(t, t123, t123 + .4)) * (t > t123 - .05 ? 1 : 0) })); c.restore();
    stamp(c, 'SAME PATTERN', 1200, 230, 58, HL, .05, lin(t, W('P43', 'pattern'), W('P43', 'pattern') + .15));
    const k1 = popK(t, t123, .3); if (k1 > 0) { c.save(); c.translate(1230, 440); c.scale(k1, k1); c.fillStyle = PANEL; rr(c, -250, -110, 500, 220, 18); c.fill(); c.strokeStyle = GREEN; c.lineWidth = 5; c.stroke(); txt(c, '123', -60, -5, '800 150px JBM', GREEN); txt(c, 'CLAIMED', 140, 0, '800 26px JBM', GREEN); c.restore(); }
    const k2 = popK(t, t20, .3); if (k2 > 0) { c.save(); c.translate(1230, 680); c.scale(k2, k2); c.fillStyle = PANEL; rr(c, -250, -110, 500, 220, 18); c.fill(); c.strokeStyle = RED; c.lineWidth = 5; c.stroke(); txt(c, '20', -60, -5, '800 150px JBM', RED); txt(c, 'TRADED', 140, 0, '800 26px JBM', RED); c.restore(); }
  });

  // ================================================================ P44 SEC + memo
  const tSEC = W('P44', 'SEC'), t2000 = W('P44', '2000'), tAgain = W('P44', 'again'), t2005 = W('P44', '2005'), tMemo = W('P44', 'memo'), tTitled = W('P44', 'titled'), tFraud = W('P44', 'fraud'), tMath = W('P44', 'math');
  Engine.hit(tSEC, { punch: .03 }); Engine.hit(tMemo, { shake: 16, punch: .04 }); Engine.cue(tMemo, 'paper-slam'); Engine.hit(tFraud, { shake: 18, glitch: .7, glitchDur: .3, flash: .6 });
  function timeline2000(c, t, y, tA) {
    const x0 = 260, x1 = 1420; c.strokeStyle = 'rgba(245,243,238,.35)'; c.lineWidth = 5; c.beginPath(); c.moveTo(x0, y); c.lineTo(x0 + (x1 - x0) * eo(lin(t, tA, tA + .5)), y); c.stroke();
    for (let i = 0; i <= 5; i++) { const x = x0 + i * (x1 - x0) / 5, k = eo(lin(t, tA + i * .05, tA + i * .05 + .3)); c.fillStyle = PAPER; c.globalAlpha = k; c.fillRect(x - 3, y - 12, 6, 24); txt(c, String(2000 + i), x, y + 38, '700 24px JBM', DIM); c.globalAlpha = 1; }
    for (const [tt, yr, lab, col] of [[t2000, 0, 'TIP 1', HL], [tAgain + .1, 2, 'AGAIN', HL], [t2005, 5, 'MEMO', RED]]) { const k = popK(t, tt - .05, .3); if (k <= 0) continue; const x = x0 + yr * (x1 - x0) / 5; c.save(); c.translate(x, y - 50); c.scale(k, k); c.fillStyle = col; c.beginPath(); c.moveTo(0, 36); c.lineTo(-16, 8); c.lineTo(16, 8); c.closePath(); c.fill(); pill(c, lab, 0, -10, '800 26px JBM', col, { h: 50, bg: PANEL, px: 30 }); c.restore(); }
  }
  S('P44', (c, t, lt) => {
    bgGrid(c, t, TINT); const bk = eo(lin(t, P('P44').start + .1, P('P44').start + .6)); c.save(); c.globalAlpha = bk; const sx = 560 + (1 - bk) * 120;
    wallst(c, sx, 600, 560, 380, '#18242f', '#35506a'); c.fillStyle = '#0f1b2b'; rr(c, sx - 140, 255, 280, 74, 12); c.fill(); c.strokeStyle = '#4fa3ff'; c.lineWidth = 4; c.stroke(); txt(c, 'SEC', sx, 293, '400 60px Anton', '#7cc0ff'); c.restore();
    const fl = lin(t, tMath - .1, tMath + .5); if (fl > 0 && fl < 1) { const x = lerp(1050, 760, fl), y = 470 - Math.sin(fl * Math.PI) * 60; c.save(); c.translate(x, y); c.rotate(-.2 + fl * .5); c.fillStyle = PAPER; c.fillRect(-60, -80, 120, 160); txt(c, 'MATH', 0, 0, '400 34px Anton', INK); c.restore(); }
    if (t > tMath + .5) { txt(c, 'THE MATH', 1000, 410, '400 70px Anton', PAPER, 'left'); txt(c, 'SENT TO THE SEC', 1000, 480, '800 30px JBM', GREEN, 'left'); }
    timeline2000(c, t, 780, t2000 - .4);
  });
  S(['P44', 'sent', 1, -.1], (c, t, lt) => {
    bgGrid(c, t, RTINT); timeline2000(c, t, 220, W('P44', 'sent') - .1);
    paperSlam(c, t, tMemo - .05, 840, 570, 900, 560, -.012, '#EFE7D2', (c2, w, h) => { const ink = '#1d1a14';
      txt(c2, 'MEMORANDUM', -w / 2 + 40, -h / 2 + 48, '400 36px Elite', ink, 'left'); txt(c2, 'TO: SEC · 2005', w / 2 - 40, -h / 2 + 48, '400 28px Elite', 'rgba(29,26,20,.6)', 'right'); c2.fillStyle = ink; c2.fillRect(-w / 2 + 40, -h / 2 + 78, w - 80, 4);
      const full = "THE WORLD'S LARGEST HEDGE FUND IS A FRAUD"; const words = full.split(' '), n = Math.floor(words.length * lin(t, tTitled, tFraud + .1) + 1e-6);
      txt(c2, words.slice(0, Math.min(n, 5)).join(' '), 0, -60, '400 46px Elite', ink); if (n > 5) txt(c2, words.slice(5, n).join(' '), 0, 10, '400 46px Elite', RED);
      c2.fillStyle = 'rgba(29,26,20,.18)'; for (let i = 0; i < 6; i++) c2.fillRect(-w / 2 + 60, 80 + i * 36, (w - 120) * (i % 3 === 2 ? .6 : 1), 10); });
    stamp(c, '21 PAGES', 1400, 400, 62, RED, .1, lin(t, tTitled + .2, tTitled + .35)); stamp(c, 'FRAUD', 1360, 650, 80, RED, -.08, lin(t, tFraud, tFraud + .15));
  });

  // ================================================================ P45 8 magnifying glasses
  const tLooked = W('P45', 'looked'), tEight = W('P45', 'eight'), tNot = W('P45', "didn't");
  Engine.hit(tNot + .3, { punch: .03 });
  S('P45', (c, t, lt) => {
    bgGrid(c, t, TINT); const y = 490, x0 = 160, x1 = 1540; const ak = eo(lin(t, P('P45').start + .05, P('P45').start + .5));
    txt(c, '16 YEARS · REGULATORS LOOKED', 840, 140, '800 34px JBM', DIM);
    c.strokeStyle = 'rgba(245,243,238,.4)'; c.lineWidth = 6; c.beginPath(); c.moveTo(x0, y); c.lineTo(x0 + (x1 - x0) * ak, y); c.stroke();
    for (let i = 0; i <= 16; i++) { const x = x0 + i * (x1 - x0) / 16; c.fillStyle = PAPER; c.globalAlpha = ak; c.fillRect(x - 2, y - (i % 4 ? 9 : 16), 4, i % 4 ? 18 : 32); if (i % 4 === 0) txt(c, String(1992 + i), x, y + 50, '700 24px JBM', DIM); c.globalAlpha = 1; }
    const fr = [.04, .17, .29, .42, .55, .68, .81, .94]; const grey = lin(t, tNot, tNot + .5); let cnt = 0;
    for (let i = 0; i < 8; i++) { const ta = lerp(tLooked - .1, tEight - .05, i / 7), k = popK(t, ta, .3); if (k <= 0) continue; cnt++; const x = x0 + fr[i] * (x1 - x0), up = i % 2 === 0, gy = up ? 365 : 615;
      c.save(); c.translate(x, gy); c.scale(k, k); magnifier(c, 0, 0, 38, grey > .5 ? '#5d6877' : HL, 12); c.restore();
      c.strokeStyle = 'rgba(245,243,238,.18)'; c.lineWidth = 2; c.beginPath(); c.moveTo(x, up ? gy + 55 : gy - 55); c.lineTo(x, y); c.stroke();
      const tk = popK(t, ta + .2, .3); if (tk > 0) pill(c, 'NO FRAUD FOUND', x, up ? gy - 90 : gy + 90, '800 20px JBM', '#8794a5', { k: tk, h: 42, px: 26, bg: PANEL, lw: 3 }); }
    txt(c, 'LOOKS: ' + cnt + ' / 8', 840, 205, '800 56px JBM', cnt >= 8 ? RED : PAPER);
    const dk = lin(t, tNot, tNot + .3); if (dk > 0) { c.save(); c.globalAlpha = dk; txt(c, "THEY DIDN'T FIND IT", 840, 805, '400 64px Anton', PAPER); c.restore(); }
  });

  // ================================================================ P46 2008 crash, withdrawals
  const t2008 = W('P46', '2008'), tCr = W('P46', 'crashed'), tInv = W('P46', 'investors') - .1, tAbout = W('P46', 'seven') - .1, tBil = W('P46', 'billion');
  Engine.hit(tCr, { shake: 18, glitch: .8, glitchDur: .35 }); Engine.cue(tCr, 'crash');
  S('P46', (c, t, lt) => {
    bgGrid(c, t, RTINT); glow(c, 840, 440, 800, 'rgba(255,59,48,.4)', .22); const k = back(lin(t, P('P46').start + .05, P('P46').start + .4));
    c.save(); c.translate(400, 330); c.scale(k, k); txt(c, '2008', 0, 0, '400 260px Anton', PAPER); c.restore();
    const pts = CR.map((v, i) => [820 + i / (CR.length - 1) * 700, 220 + v * 520]); c.fillStyle = PANEL; rr(c, 780, 180, 820, 620, 16); c.fill(); poly(c, pts, lin(t, t2008, tCr + .3), RED, 9, 18);
    txt(c, 'MARKETS', 1190, 780, '800 24px JBM', DIM);
    const cr = lin(t, tCr, tCr + .3); if (cr > 0) pill(c, 'CRASH', 400, 590, '400 80px Anton', RED, { k: cr, h: 120, px: 90, bg: '#1d0d0c', lw: 6 });
  });
  S(['P46', 'investors', 1, -.1], (c, t, lt) => {
    bgGrid(c, t, RTINT); const vx = 1420, vy = 600;
    c.save(); c.translate(vx, vy); c.fillStyle = '#26303c'; rr(c, -130, -150, 260, 300, 18); c.fill(); c.strokeStyle = '#4a5a6d'; c.lineWidth = 6; c.stroke(); c.fillStyle = '#18202a'; c.beginPath(); c.arc(0, 0, 70, 0, 7); c.fill(); c.strokeStyle = GREY; c.lineWidth = 6; c.stroke(); for (let i = 0; i < 8; i++) { const a = i / 8 * 6.28 + t * .5; c.beginPath(); c.moveTo(Math.cos(a) * 30, Math.sin(a) * 30); c.lineTo(Math.cos(a) * 60, Math.sin(a) * 60); c.stroke(); } c.restore();
    for (let i = 0; i < 16; i++) { const a = tInv + .1 + i * .13, u = lin(t, a, a + 1.0); if (u <= 0 || u >= 1) continue; const x = lerp(140, vx - 120, eio(u)), y = vy + Math.sin(u * 6 + i) * 30 - (i % 3 - 1) * 55; c.save(); c.translate(x, y); c.rotate((u - .5) * .6 + i); c.globalAlpha = 1 - ei(lin(u, .85, 1)); c.fillStyle = PAPER; c.fillRect(-60, -34, 120, 68); c.fillStyle = RED; c.fillRect(-48, -22, 70, 8); c.fillStyle = 'rgba(11,15,20,.4)'; c.fillRect(-48, -4, 90, 6); c.fillRect(-48, 10, 60, 6); c.restore(); }
    txt(c, 'WITHDRAWAL REQUESTS', 780, 190, '800 36px JBM', DIM);
    const v = roll(t, tAbout, tBil + .1, 7e9, 0, eio), landed = t >= tBil + .1; c.save(); c.translate(780, 360); const pk = landed ? 1 + .1 * (1 - lin(t, tBil + .1, tBil + .45)) : 1; c.scale(pk, pk); glow(c, 0, 0, 500, RED, .25); txt(c, '$' + fmt(v), 0, 0, '800 150px JBM', RED); c.restore();
    txt(c, 'INVESTORS ASKED FOR THEIR MONEY BACK', 780, 470, '400 52px Anton', PAPER);
  });
  Engine.hit(tBil + .1, { shake: 18, punch: .04 });

  // ================================================================ P47 bank draining
  const tHad = W('P47', 'held') - .1, tFive47 = W('P47', 'five'), tDown = W('P47', 'down'), t234 = W('P47', '234');
  Engine.hit(tDown, { shake: 8 }); Engine.hit(t234 + .9, { shake: 14, punch: .04 }); Engine.cue(tDown, 'drain');
  S('P47', (c, t, lt) => {
    bgGrid(c, t, TINT); txt(c, "MADOFF'S BANK ACCOUNT", 840, 160, '800 34px JBM', DIM);
    const x0 = 160, w = 1320, y0 = 470, h = 130; const fill = eo(lin(t, tHad, tHad + .8)) * (1 - (1 - 234e6 / 5e9) * eio(lin(t, tDown, t234 + .9)));
    c.fillStyle = PANEL; rr(c, x0 - 8, y0 - 8, w + 16, h + 16, 18); c.fill(); c.strokeStyle = EDGE; c.lineWidth = 4; c.stroke();
    const dr = lin(t, tDown, t234 + .9); c.fillStyle = dr > .02 ? `rgb(${Math.round(lerp(0, 255, dr))},${Math.round(lerp(210, 59, dr))},${Math.round(lerp(106, 48, dr))})` : GREEN; rr(c, x0, y0, Math.max(6, w * fill), h, 12); c.fill();
    if (dr > 0 && dr < 1) for (let i = 0; i < 10; i++) { const u = (t * 1.8 + i / 10) % 1; c.save(); c.globalAlpha = 1 - u; txt(c, '$', x0 + w * fill + 10 + hash(i) * 40, y0 + h / 2 + u * 280, '800 44px JBM', GREEN); c.restore(); }
    const val = t < tDown ? 5e9 : lerp(5e9, 234e6, eio(lin(t, tDown, t234 + .9))); const k = popK(t, tFive47 - .1, .3);
    if (k > 0) { c.save(); c.translate(840, 330); c.scale(k, k); txt(c, '$' + fmt(val) + (t < tDown ? '+' : ''), 0, 0, '800 130px JBM', dr > .5 ? RED : GREEN); c.restore(); }
    const et = lin(t, W('P47', 'earlier') - .1, W('P47', 'earlier') + .3); if (et > 0 && t < tDown) pill(c, 'EARLIER THAT YEAR', 840, 700, '800 34px JBM', DIM, { k: et, h: 64, bg: PANEL, stroke: EDGE });
    const dn = lin(t, t234 + .8, t234 + 1.1); if (dn > 0) pill(c, 'DRAINED', 840, 700, '400 64px Anton', RED, { k: back(dn), h: 100, px: 80, bg: '#1d0d0c' });
  });

  // ================================================================ P48 Dec 10 -> Dec 11, arrested
  const tDec = W('P48', 'December'), tFin = W('P48', 'finished'), tPz48 = W('P48', 'Ponzi'), tAuth = W('P48', 'authorities'), tNext = W('P48', 'next') - .05, tArr = W('P48', 'arrested');
  Engine.hit(tArr, { shake: 34, punch: .08, glitch: 1.2, glitchDur: .5, flash: 1 }); Engine.cue(tArr, 'handcuffs'); Engine.hit(tPz48, { punch: .03 });
  S('P48', (c, t, lt) => {
    bgGrid(c, t, TINT); const ck = back(lin(t, tDec - .1, tDec + .3)); if (ck > 0) { c.save(); c.translate(400, 470); c.scale(ck, ck); c.translate(-400, -470); calendar(c, 400, 470, 420, 480, 10, 'DECEMBER', { size: 250 }); c.restore(); }
    const gk = lin(t, W('P48', 'sons') - .3, W('P48', 'sons') + .2); if (gk > 0) { c.save(); c.globalAlpha = gk; c.shadowColor = 'rgba(245,243,238,.35)'; c.shadowBlur = 10;
      bust(c, 900, 760, 340, '#5a6573', { collar: '#e9edf2' }); bust(c, 1100, 760, 270, '#4a5461'); bust(c, 1240, 760, 270, '#4a5461'); c.shadowBlur = 0; txt(c, 'MADOFF', 900, 800, '800 20px JBM', DIM); txt(c, 'HIS SONS', 1170, 800, '800 20px JBM', DIM); c.restore(); }
    const lc = eo(lin(t, W('P48', 'sons') - .3, W('P48', 'sons') + .2)); if (lc > 0) { c.save(); c.globalAlpha = lc; c.fillStyle = PANEL; rr(c, 760, 190, 740, 270, 18); c.fill(); c.strokeStyle = EDGE; c.lineWidth = 4; c.stroke();
      txt(c, 'CONFESSES TO HIS SONS', 800, 228, '800 24px JBM', DIM, 'left');
      const f = lin(t, tFin - .05, tFin + .25), q = lin(t, tPz48 - .05, tPz48 + .25);
      if (f > 0) { c.globalAlpha = lc * f; txt(c, 'HE WAS "FINISHED"', 800, 310, '400 64px Anton', PAPER, 'left'); }
      if (q > 0) { c.globalAlpha = lc * q; txt(c, 'THE FUND = A PONZI SCHEME', 800, 400, '400 52px Anton', RED, 'left'); } c.restore(); }
    const ak = lin(t, tAuth - .2, tAuth + .3); if (ak > 0) { c.save(); c.globalAlpha = ak; wallst(c, 1500, 700, 230, 230, '#18242f', '#35506a'); txt(c, 'AUTHORITIES', 1500, 760, '800 22px JBM', '#7cc0ff'); c.strokeStyle = '#7cc0ff'; c.lineWidth = 5; c.setLineDash([12, 10]); c.beginPath(); c.moveTo(1300, 640); c.lineTo(1300 + 90 * eo(ak), 640); c.stroke(); c.setLineDash([]); c.restore(); }
  });
  S(['P48', 'next', 1, -.05], (c, t, lt) => {
    bgGrid(c, t, RTINT); const fl = lin(t, tNext + .15, tNext + .65), day = fl < .5 ? 10 : 11, fy = fl <= 0 || fl >= 1 ? 1 : Math.abs(Math.cos(Math.PI * fl));
    calendar(c, 520, 480, 460, 520, day, 'DECEMBER', { size: 280, flip: fy });
    txt(c, 'THE NEXT MORNING', 520, 175, '800 30px JBM', DIM);
    const ck = popK(t, tArr - .1, .35); if (ck > 0) { c.save(); c.translate(1230, 520); c.scale(ck, ck); glow(c, 0, 0, 340, RED, .3); cuffs(c, 0, 0, 300); c.restore(); }
    stamp(c, 'ARRESTED', 1230, 270, 120, RED, -.09, lin(t, tArr, tArr + .15));
  });

  // ================================================================ P49 $64.8B
  const t64 = W('P49', 'sixty-four'), tBil49 = W('P49', 'billion'), tFake = W('P49', 'fake'), tEst = W('P49', 'estimated'), t35 = W('P49', '35'), t55 = W('P49', '55'), tNever = W('P49', 'never'), tBased = W('P49', 'based');
  Engine.hit(tBil49 + .1, { shake: 30, punch: .07, glitch: .8, glitchDur: .3, flash: .8 }); Engine.cue(tBil49, 'sub-boom'); Engine.hit(tFake, { shake: 10 });
  S('P49', (c, t, lt) => {
    bgGrid(c, t, RTINT); glow(c, 840, 440, 900, 'rgba(255,59,48,.5)', .22);
    c.save(); c.globalAlpha = eo(lin(t, P('P49').start + .3, P('P49').start + .7)); txt(c, 'PROSECUTORS PUT THE FRAUD AT', 840, 230, '800 38px JBM', DIM); c.restore();
    const v = roll(t, t64 - .1, tBil49 + .1, 64.8, 0, eio), landed = t >= tBil49 + .1, pk = landed ? 1 + .12 * (1 - lin(t, tBil49 + .1, tBil49 + .5)) : 1;
    c.save(); c.translate(840, 440); c.scale(pk, pk); c.shadowColor = RED; c.shadowBlur = 50; txt(c, '$' + v.toFixed(1) + 'B', 0, 0, '800 250px JBM', RED); c.restore();
  });
  const col49 = { x: 770, w: 130, base: 790, h: 560 };
  S(['P49', 'based', 1, -.05], (c, t, lt) => {
    bgGrid(c, t, RTINT); const sh = eo(lin(t, tBased - .05, tBased + .4)), cx = lerp(840, 400, sh), cy = lerp(440, 330, sh), sc = lerp(1, .62, sh);
    glow(c, 500, 440, 700, 'rgba(255,59,48,.5)', .18);
    c.save(); c.translate(cx, cy); c.scale(sc, sc); c.shadowColor = RED; c.shadowBlur = 40; txt(c, '$64.8B', 0, 0, '800 250px JBM', RED); c.restore();
    c.save(); c.globalAlpha = sh; txt(c, "PROSECUTORS' FIGURE", 400, 470, '800 28px JBM', DIM);
    for (let i = 0; i < 4; i++) { const k = back(lin(t, tBased + .1 + i * .12, tBased + .45 + i * .12)); if (k <= 0) continue; c.save(); c.translate(1000 + i * 110, 480 + i * 22); c.rotate(-.08 + i * .05); c.scale(k, k); c.fillStyle = '#EFE7D2'; c.shadowColor = 'rgba(0,0,0,.5)'; c.shadowBlur = 24; c.fillRect(-150, -190, 300, 380); c.shadowColor = 'transparent'; txt(c, 'ACCOUNT STATEMENT', 0, -150, '400 26px Elite', '#1d1a14');
      c.strokeStyle = GREEN; c.lineWidth = 6; c.beginPath(); c.moveTo(-110, 90); c.lineTo(-40, 20); c.lineTo(10, 50); c.lineTo(110, -60); c.stroke(); c.fillStyle = 'rgba(29,26,20,.2)'; for (let j = 0; j < 3; j++) c.fillRect(-110, 110 + j * 20, 220 - j * 40, 8); c.restore(); }
    c.restore(); stamp(c, 'FAKE', 1100, 380, 120, RED, -.12, lin(t, tFake + .1, tFake + .25));
    txt(c, 'BASED ON FAKE STATEMENTS', 400, 560, '400 46px Anton', PAPER);
  });
  S(['P49', 'estimated', 1, -.4], (c, t, lt) => {
    bgGrid(c, t, RTINT); const K = col49, yv = v => K.base - v / 64.8 * K.h;
    glow(c, 400, 400, 600, 'rgba(255,59,48,.4)', .15); c.save(); c.translate(400, 330); c.scale(.62, .62); c.shadowColor = RED; c.shadowBlur = 40; txt(c, '$64.8B', 0, 0, '800 250px JBM', RED); c.restore(); txt(c, "PROSECUTORS' FIGURE", 400, 470, '800 28px JBM', DIM);
    const ck = eo(lin(t, tEst - .3, tEst + .3)); c.save(); c.globalAlpha = Math.min(1, ck * 2);
    c.fillStyle = RED; rr(c, K.x, K.base - K.h * ck, K.w, K.h * ck, [8, 8, 0, 0]); c.fill();
    const never = eo(lin(t, tNever - .05, tNever + .6)); const bt = yv(55), bb = yv(35);
    c.save(); c.globalAlpha = (1 - .85 * never) * ck; c.fillStyle = INK; c.fillRect(K.x, bt, K.w, bb - bt); c.strokeStyle = RED; c.lineWidth = 3; c.setLineDash([12, 8]); c.strokeRect(K.x, bt, K.w, bb - bt); c.setLineDash([]); c.restore();
    c.save(); c.beginPath(); c.rect(K.x, bt, K.w, bb - bt); c.clip(); c.strokeStyle = 'rgba(255,59,48,.4)'; c.lineWidth = 4; for (let i = -10; i < 30; i++) { c.beginPath(); c.moveTo(K.x + i * 24 - 100, bb + 40); c.lineTo(K.x + i * 24 + 100, bt - 40); c.stroke(); } c.restore();
    c.restore();
    const bk = eo(lin(t, tEst + .4, t35 + .1)); if (bk > 0) { c.save(); c.globalAlpha = bk; c.strokeStyle = HL; c.lineWidth = 8; c.lineCap = 'round'; const bx = K.x + K.w + 26, my = (bt + bb) / 2; c.beginPath(); c.moveTo(bx, bt); c.quadraticCurveTo(bx + 36, bt, bx + 36, bt + 36); c.lineTo(bx + 36, my - 24); c.quadraticCurveTo(bx + 36, my, bx + 70, my); c.moveTo(bx + 36, my + 24); c.lineTo(bx + 36, bb - 36); c.quadraticCurveTo(bx + 36, bb, bx, bb); c.stroke(); c.restore(); }
    const lk = popK(t, t35 - .05, .3); if (lk > 0) { c.save(); c.translate(1010, 300); c.scale(lk, lk); txt(c, '$35–55B', 0, 0, '800 120px JBM', HL, 'left'); c.restore(); }
    const nk = lin(t, tNever - .1, tNever + .3); if (nk > 0) { c.save(); c.globalAlpha = nk; txt(c, 'NEVER EXISTED', 1010, 430, '400 96px Anton', PAPER, 'left'); const u = eo(lin(t, tNever + .2, tNever + .8)); c.strokeStyle = RED; c.lineWidth = 8; c.beginPath(); c.moveTo(1010, 492); c.lineTo(1010 + 560 * u, 492); c.stroke(); c.restore(); }
    const mk = lin(t, W('P49', 'profit') - .1, W('P49', 'profit') + .3); if (mk > 0) { c.save(); c.globalAlpha = mk; txt(c, '(MARKOPOLOS ESTIMATE)', 1010, 540, '800 32px JBM', GREY, 'left'); txt(c, 'PROFIT THAT NEVER EXISTED AT ALL', 1010, 590, '700 24px JBM', DIM, 'left'); c.restore(); }
  });

  // ================================================================ P50 11 felonies · 150 years
  const tGuilty = W('P50', 'guilty'), t11 = W('P50', '11'), tSent = W('P50', 'sentenced') - .1, t150 = W('P50', '150'), tYears = W('P50', 'years'), tDied = W('P50', 'died'), t2021 = W('P50', '2021');
  Engine.hit(tGuilty, { shake: 16, punch: .04 }); Engine.hit(t11, { punch: .04 }); Engine.hit(tSent + .1, { shake: 32, punch: .06, flash: .7 }); Engine.cue(tSent + .1, 'cell-door'); Engine.hit(tDied, { glitch: .7, glitchDur: .4 });
  S('P50', (c, t, lt) => {
    bgGrid(c, t, RTINT); stamp(c, 'GUILTY', 640, 250, 130, RED, -.07, lin(t, tGuilty, tGuilty + .15));
    txt(c, 'PLEADED GUILTY TO', 640, 130, '800 30px JBM', DIM);
    const k = back(lin(t, t11 - .05, t11 + .3)); if (k > 0) { c.save(); c.translate(840, 530); c.scale(k, k); glow(c, 0, 0, 500, RED, .25); txt(c, '11', -330, 0, '800 330px JBM', RED); txt(c, 'FEDERAL', 140, -70, '400 100px Anton', PAPER); txt(c, 'FELONIES', 140, 50, '400 130px Anton', RED); c.restore();
      for (let i = 0; i < 11; i++) { const a = t11 + .1 + i * .06, q = lin(t, a, a + .2); c.fillStyle = RED; c.globalAlpha = q; rr(c, 840 - 11 * 36 + i * 72, 740, 52, 52, 8); c.fill(); c.globalAlpha = 1; } }
  });
  S(['P50', 'sentenced', 1, -.1], (c, t, lt) => {
    bgGrid(c, t, RTINT); const dark = lin(t, tDied - .2, tDied + .6);
    glow(c, 840, 520, 700, 'rgba(255,255,255,.25)', .2 * (1 - dark)); bust(c, 840, 900, 640, '#05080b', { collar: '#222b36' });
    bars(c, t, tSent); c.fillStyle = `rgba(0,0,0,${.5 * dark})`; c.fillRect(0, 0, VW, VH);
    const v = Math.round(roll(t, t150 - .1, t150 + .5, 150, 0, eo)), ck = back(lin(t, t150 - .15, t150 + .3));
    if (dark < .5) { if (ck > 0) { c.save(); c.translate(840, 250); c.scale(ck, ck); c.fillStyle = 'rgba(11,15,20,.82)'; rr(c, -430, -110, 860, 220, 20); c.fill(); txt(c, v + ' YEARS', 0, 0, '800 190px JBM', RED); c.restore(); }
      stamp(c, '11 FELONIES · 150 YEARS', 840, 560, 92, RED, -.04, lin(t, tYears, tYears + .15)); }
    if (dark > 0) { c.save(); c.globalAlpha = dark; typedText(c, 'DIED IN PRISON, 2021', 840, 430, '400 120px Anton', PAPER, t, tDied, t2021 + .6, 'center', false); c.restore(); }
  });
});
