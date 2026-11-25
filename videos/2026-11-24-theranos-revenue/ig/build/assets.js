// Theranos drawn assets re-used from the YouTube build (verbatim)
function wordmark(c, x, y, size, k = 1, col = PAPER) { c.save(); c.translate(x, y); const sc = lerp(2.4, 1, back(k)); c.scale(sc, sc); c.globalAlpha = clamp(k * 3); c.letterSpacing = (size * .12) + 'px'; txt(c, 'THERANOS', 0, 0, `400 ${size}px Anton`, col); c.letterSpacing = '0px'; c.restore(); }
function mstamp(c, lines, x, y, size, color, rot, k) { // multi-line stamp
  if (k <= 0) return; const sc = lerp(2.6, 1, back(k)); c.save(); c.translate(x, y); c.rotate(rot); c.scale(sc, sc); c.globalAlpha = clamp(k * 3); c.font = `400 ${size}px Anton`;
  const w = Math.max(...lines.map(l => c.measureText(l).width)) + size * .7, h = lines.length * size * 1.12 + size * .35;
  c.fillStyle = 'rgba(11,15,20,.82)'; rr(c, -w / 2, -h / 2, w, h, size * .12); c.fill(); c.strokeStyle = color; c.lineWidth = size * .08; rr(c, -w / 2, -h / 2, w, h, size * .12); c.stroke();
  c.fillStyle = color; c.textAlign = 'center'; c.textBaseline = 'middle'; lines.forEach((l, i) => c.fillText(l, 0, (i - (lines.length - 1) / 2) * size * 1.12 + size * .03)); c.restore();
}
function edison(c, x, y, w, h, t, o = {}) { // sleek box machine
  c.save(); c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 40; c.shadowOffsetY = 18;
  const g = c.createLinearGradient(x, y, x + w, y + h); g.addColorStop(0, '#f4f6f9'); g.addColorStop(.55, '#cfd6df'); g.addColorStop(1, '#8f9aa8'); rr(c, x, y, w, h, 36); c.fillStyle = g; c.fill(); c.restore();
  c.save(); rr(c, x + w * .3, y - 10, w * .4, 22, 10); c.fillStyle = '#10151c'; c.fill(); c.restore(); // slot
  rr(c, x + w * .1, y + h * .12, w * .8, h * .22, 14); c.fillStyle = '#10151c'; c.fill(); txt(c, 'EDISON', x + w / 2, y + h * .23, `400 ${Math.round(h * .16)}px Anton`, o.hi ? HL : PAPER);
  rr(c, x + w * .12, y + h * .42, w * .5, h * .4, 16); c.fillStyle = '#0a2a2a'; c.fill(); c.strokeStyle = '#37505a'; c.lineWidth = 3; c.stroke();
  txt(c, o.screen || 'READY', x + w * .37, y + h * .62, `800 ${Math.round(h * .09)}px JBM`, o.scol || GREEN);
  c.fillStyle = (Math.sin(t * 8) > 0 ? GREEN : '#1f6f45'); c.beginPath(); c.arc(x + w * .78, y + h * .52, 10, 0, 7); c.fill(); c.fillStyle = '#6b7684'; c.beginPath(); c.arc(x + w * .78, y + h * .68, 10, 0, 7); c.fill();
}
function stack(c, x, y, s, a = 1) { c.save(); c.globalAlpha = a; for (let i = 0; i < 3; i++) bill(c, x, y - i * 14 * s, 96 * s, (i - 1) * .05, 1); c.fillStyle = '#e8efe9'; c.fillRect(x - 10 * s, y - 36 * s, 20 * s, 44 * s); c.restore(); }
function magnifier(c, x, y, r) { c.save(); c.lineCap = 'round'; c.strokeStyle = '#5b3a1c'; c.lineWidth = 34; c.beginPath(); c.moveTo(x + r * .72, y + r * .72); c.lineTo(x + r * 1.55, y + r * 1.55); c.stroke(); c.strokeStyle = '#c3cad4'; c.lineWidth = 20; c.beginPath(); c.arc(x, y, r, 0, 7); c.stroke(); c.restore(); }
function hlabel(c, s, x, y, col = 'rgba(245,243,238,.8)', size = 30) { txt(c, s, x, y, `700 ${size}px JBM`, col); }
function labMachine(c, x, y, w, h, t, i, name) {
  rr(c, x, y, w, h, 14); c.fillStyle = '#9aa3ad'; c.fill(); c.strokeStyle = '#59636f'; c.lineWidth = 4; c.stroke(); rr(c, x + 14, y + 14, w - 28, h * .28, 8); c.fillStyle = '#10222a'; c.fill();
  txt(c, name, x + w / 2, y + 14 + h * .14, '700 18px JBM', '#7ef0b0'); c.save(); c.translate(x + w / 2, y + h * .66); c.rotate(t * (3 + i)); c.strokeStyle = '#3a434f'; c.lineWidth = 8; c.lineCap = 'round'; c.beginPath(); c.arc(0, 0, h * .17, 0, 7); c.stroke(); for (let a = 0; a < 4; a++) { c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.cos(a * 1.57) * h * .17, Math.sin(a * 1.57) * h * .17); c.stroke(); } c.restore();
}
function report(c, x, y, rot, i, t, k) { c.save(); c.translate(x, y); c.rotate(rot); rr(c, -150, -190, 300, 380, 8); c.fillStyle = '#efeadd'; c.fill(); c.strokeStyle = '#a79f8c'; c.lineWidth = 3; c.stroke(); txt(c, 'EDISON RESULTS', 0, -150, '700 22px JBM', '#14181e'); c.strokeStyle = '#0f8f4d'; c.lineWidth = 5; c.beginPath(); for (let q = 0; q < 9; q++) { const yy = -70 + Math.sin(q * 1.3 + i) * 30; q ? c.lineTo(-120 + q * 30, yy) : c.moveTo(-120, yy); } c.stroke(); for (let q = 0; q < 5; q++) { c.fillStyle = 'rgba(20,24,30,.3)'; c.fillRect(-120, 10 + q * 30, q % 2 ? 160 : 240, 10); } c.restore(); }

// ---- parameterised versions of the YouTube scene drawings (u = seconds since the scene started) ----
function revBars(c, t, o) { // $100,000,000 vs $100,000 bars. o: {cx, base, h, k, labelSize, crashAt}
  const { cx = 540, base = 1000, h = 520, k = 1, ls = 46 } = o, bw = 230, gap = 140;
  const lx = cx - gap - bw / 2 + 40 - 40, rx = cx + gap - bw / 2 + 0;
  c.save(); c.strokeStyle = 'rgba(245,243,238,.25)'; c.lineWidth = 4; c.beginPath(); c.moveTo(cx - 470, base); c.lineTo(cx + 470, base); c.stroke();
  const gh = h * eo(k); c.save(); c.shadowColor = GREEN; c.shadowBlur = 36; const g = c.createLinearGradient(0, base - gh, 0, base); g.addColorStop(0, '#7ef0b0'); g.addColorStop(1, '#0f8f4d'); c.fillStyle = g; rr(c, cx - gap - bw / 2 - 20, base - gh, bw, gh, 10); c.fill(); c.restore();
  const rh = Math.max(8, 8 * eo(k)); c.save(); c.shadowColor = RED; c.shadowBlur = 26; c.fillStyle = RED; rr(c, cx + gap - bw / 2 + 20, base - rh, bw, rh, 3); c.fill(); c.restore();
  c.globalAlpha = clamp(k * 2); glowTxt(c, '$100,000,000', cx - gap - 20, base - gh - 44, `800 ${ls}px JBM`, GREEN, 18); glowTxt(c, '$100,000', cx + gap + 20, base - rh - 44, `800 ${ls}px JBM`, RED, 18);
  txt(c, 'CLAIMED', cx - gap - 20, base + 36, '700 30px JBM', GREEN); txt(c, 'REAL', cx + gap + 20, base + 36, '700 30px JBM', RED); c.restore();
}
function holmesCard(c, x, y, k, rot = -.03) { // illustrated founder card
  if (k <= 0) return; c.save(); c.translate(x, y); c.rotate(rot); c.scale(k, k); rr(c, -190, -150, 380, 300, 22); c.fillStyle = '#1a212b'; c.fill(); c.strokeStyle = '#3a434f'; c.lineWidth = 4; c.stroke();
  rr(c, -150, -125, 300, 140, 16); c.fillStyle = '#232c38'; c.fill(); silhouette(c, 0, -35, 112, '#4a5565'); txt(c, 'ELIZABETH HOLMES', 0, 44, '400 38px Anton', PAPER); txt(c, 'FOUNDER', 0, 88, '700 30px JBM', HL); txt(c, 'NO PHOTO · ILLUSTRATION', 0, 124, '700 17px JBM', 'rgba(245,243,238,.45)'); c.restore();
}
function magCard(c, u, x, y, sc = 1) { // generic magazine, u = time since the card started (lines at .9/1.7/2.5/3.0)
  const k = eo(lin(u, 0, .45));
  c.save(); c.translate(x, y + (1 - k) * 900); c.rotate(-.04 + (1 - k) * .1); c.scale(sc, sc);
  c.save(); c.shadowColor = 'rgba(0,0,0,.7)'; c.shadowBlur = 50; c.shadowOffsetY = 20; rr(c, -250, -380, 500, 740, 12); c.fillStyle = '#f2efe6'; c.fill(); c.restore();
  c.fillStyle = '#c9211b'; c.fillRect(-250, -380, 500, 100); txt(c, 'MONEY WEEKLY', 0, -330, '400 62px Anton', PAPER); txt(c, 'THE BILLIONAIRES ISSUE', 0, -295, '700 17px JBM', 'rgba(245,243,238,.85)');
  const gp = c.createLinearGradient(0, -270, 0, 60); gp.addColorStop(0, '#26364f'); gp.addColorStop(1, '#101a2b'); c.fillStyle = gp; c.fillRect(-250, -280, 500, 330); silhouette(c, 0, -90, 250, '#4c5d79'); txt(c, 'NO PHOTO · ILLUSTRATION', 0, 24, '700 15px JBM', 'rgba(245,243,238,.45)');
  [[.5, 'YOUNGEST', '#0B0F14'], [1.1, 'SELF-MADE FEMALE', '#0B0F14'], [1.7, 'BILLIONAIRE', '#c9211b']].forEach(([ts, s, col], i) => { const q = eo(lin(u, ts, ts + .2)); c.save(); c.globalAlpha = q; c.translate((1 - q) * -60, 0); txt(c, s, 0, 100 + i * 66, `400 ${i === 1 ? 52 : 66}px Anton`, col); c.restore(); });
  const q2 = back(lin(u, 2.2, 2.5)); c.save(); c.translate(0, 318); c.scale(q2, q2); txt(c, 'IN AMERICA · 2015', 0, 0, '800 26px JBM', '#0B0F14'); c.restore();
  c.restore();
}
function badge9B(c, u, x, y) { const bd = back(lin(u, 0, .3)); if (bd <= 0) return; c.save(); c.translate(x, y); c.rotate(.12); c.scale(bd, bd); c.fillStyle = HL; c.beginPath(); c.arc(0, 0, 80, 0, 7); c.fill(); txt(c, '$9B', 0, -8, '400 58px Anton', INK); txt(c, 'VALUED', 0, 38, '800 20px JBM', INK); c.restore(); }
function newsCard(c, u, x, y, sc = 1) { // WSJ-style headline, u since start (yellow highlight at 2.2)
  const nk = eo(lin(u, 0, .35)); if (nk <= 0) return;
  c.save(); c.translate(x, y + (1 - nk) * 1100); c.rotate(.025 - (1 - nk) * .15 + Math.sin(u * 1.3) * .004); c.scale(sc * (1 + .02 * u), sc * (1 + .02 * u));
  c.save(); c.shadowColor = 'rgba(0,0,0,.7)'; c.shadowBlur = 40; c.shadowOffsetY = 16; rr(c, -400, -330, 800, 700, 8); c.fillStyle = '#e9e3d2'; c.fill(); c.restore();
  txt(c, 'THE FINANCIAL PAGE', 0, -285, '400 52px Anton', '#14181e'); c.fillStyle = '#14181e'; c.fillRect(-370, -250, 740, 4); c.fillRect(-370, -240, 740, 2);
  txt(c, 'WSJ, OCT 2015', 370, -262, '700 18px JBM', '#5a5448', 'right');
  ['REPORT: DEVICE', 'GAVE INACCURATE', 'RESULTS'].forEach((l, i) => { const y2 = -170 + i * 90; if (i === 1) { const hk = lin(u, NEWS_HL, NEWS_HL + .5); c.font = '400 76px Anton'; c.fillStyle = `rgba(255,214,10,${.95 * hk})`; const w = c.measureText('INACCURATE').width; c.fillRect(-c.measureText(l).width / 2 + c.measureText('GAVE ').width, y2 - 40, w, 80 * hk); } txt(c, l, 0, y2, '400 76px Anton', '#14181e'); });
  for (let i = 0; i < 7; i++) { c.fillStyle = 'rgba(20,24,30,.35)'; c.fillRect(-370, 130 + i * 28, i % 3 === 2 ? 240 : 380, 12); } c.fillStyle = '#d4cfbd'; c.fillRect(30, 125, 340, 220); edison(c, 100, 150, 200, 150, u, { screen: 'ERR', scol: RED });
  const xk = back(lin(u, 1.6, 1.9)); c.save(); c.translate(200, 225); c.scale(xk, xk); c.strokeStyle = RED; c.lineWidth = 16; c.lineCap = 'round'; c.beginPath(); c.moveTo(-60, -60); c.lineTo(60, 60); c.moveTo(60, -60); c.lineTo(-60, 60); c.stroke(); c.restore();
  c.restore();
}
function cellBars(c, drop, bt, bb) { const rail = (bb - bt) * drop; for (let i = 0; i < 9; i++) { const bx = 110 + i * 105; const g = c.createLinearGradient(bx - 20, 0, bx + 20, 0); g.addColorStop(0, '#2a323d'); g.addColorStop(.5, '#a7b1bf'); g.addColorStop(1, '#2a323d'); c.fillStyle = g; rr(c, bx - 20, bt, 40, rail, 18); c.fill(); } c.fillStyle = '#5b6573'; if (drop > 0) { c.fillRect(70, bt, 940, 26); c.fillRect(70, bt + rail - 26, 940, 26); } }
function gavel(c, u, x, y, s = 1) { // u since start; strike at .3
  const sl = ei(lin(u, .1, .3)); const bounce = u > .3 ? Math.exp(-(u - .3) * 9) * Math.sin((u - .3) * 40) * .1 : 0; const ang = lerp(-1.0, .05, sl) + bounce;
  c.save(); c.translate(x, y); c.scale(s, s); rr(c, -160, 15, 320, 46, 10); c.fillStyle = '#6a4a2c'; c.fill();
  c.save(); c.translate(0, 0); c.rotate(ang); c.fillStyle = '#8a6a44'; rr(c, -14, -250, 28, 260, 8); c.fill(); rr(c, -110, -290, 220, 90, 14); c.fillStyle = '#a07a4e'; c.fill(); c.strokeStyle = '#4a3320'; c.lineWidth = 5; c.stroke(); c.restore(); c.restore();
}
function meter(c, t, vv, mx, my0, my1) { // valuation meter 0..1
  rr(c, mx, my0, 90, my1 - my0, 45); c.fillStyle = '#1b2430'; c.fill(); c.strokeStyle = '#3a434f'; c.lineWidth = 4; c.stroke();
  const fh = (my1 - my0 - 16) * vv; c.save(); rr(c, mx + 8, my0 + 8, 74, my1 - my0 - 16, 37); c.clip(); const mg = c.createLinearGradient(0, my1, 0, my0); mg.addColorStop(0, '#0f8f4d'); mg.addColorStop(.7, GREEN); mg.addColorStop(1, HL); c.fillStyle = mg; c.fillRect(mx + 8, my1 - 8 - fh, 74, fh); c.restore();
  const ry = my1 - 8 - fh; c.save(); c.translate(mx + 45, ry - 14); c.fillStyle = PAPER; c.beginPath(); c.moveTo(0, -34); c.lineTo(20, 14); c.lineTo(-20, 14); c.closePath(); c.fill(); c.fillStyle = RED; c.beginPath(); c.moveTo(-10, 14); c.lineTo(0, 14 + 16 + 10 * Math.sin(t * 40)); c.lineTo(10, 14); c.fill(); c.restore();
  for (let i = 0; i < 4; i++) txt(c, ['$0', '$3B', '$6B', '$9B'][i], mx - 14, my1 - 20 - i * ((my1 - my0 - 60) / 3), '700 22px JBM', 'rgba(245,243,238,.55)', 'right');
}
function stacksFly(c, t, t0, n, tx, ty, y0 = 450) { for (let i = 0; i < n; i++) { const a = t0 + i * .15, k = lin(t, a, a + .5); if (k <= 0 || k >= 1) continue; const sx = 120 + hash(i) * 740, sy = y0 - hash(i + 4) * 80; const x = lerp(sx, tx, ei(k)), y = lerp(sy, ty, ei(k)) - Math.sin(k * Math.PI) * 60; stack(c, x, y, lerp(1.2, .6, k), 1); } }
const bigT = (c, s, x, y, size, col, k, rot = 0, glow = 0) => { if (k <= 0) return; c.save(); c.globalAlpha = clamp(k * 3); const s2 = lerp(1.5, 1, back(k)); c.translate(x, y); c.rotate(rot); c.scale(s2, s2); if (glow) glowTxt(c, s, 0, 0, `400 ${size}px Anton`, col, glow); else txt(c, s, 0, 0, `400 ${size}px Anton`, col); c.restore(); };
