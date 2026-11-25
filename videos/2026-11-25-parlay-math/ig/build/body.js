// IG/FB cut (18.96 s): muted-first, huge text, content inside y 250-1250
const ST_POS = { x: 915, y: 1255, s: .62 }; const ST_OFF = null; const HARD = true;
const ST_CFG = { timeline: [[0, 'you'], [3.55, 'point'], [9.6, 'shock'], [12.0, 'shrug'], [14.2, 'you'], [17.2, 'wave']], enterAt: -1 };
const CAP = { x: 400, y: 1170, size: 58, maxw: 620, lh: 64 };
const roll = v => fmt(v);
function hookBg(c, t, col = '255,59,48') {
  c.fillStyle = INK; c.fillRect(0, 0, W, H);
  const g = c.createRadialGradient(540, 760, 40, 540, 760, 950); g.addColorStop(0, `rgba(${col},.4)`); g.addColorStop(1, `rgba(${col},0)`); c.fillStyle = g; c.fillRect(0, 0, W, H);
  c.save(); c.translate(540, 760); c.globalAlpha = .1; c.fillStyle = `rgb(${col})`; for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + t * .35; c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, 1500, a, a + .15); c.closePath(); c.fill(); } c.restore();
}
function big(c, s, x, y, size, col, k = 1, rot = 0) { c.save(); c.translate(x, y); c.rotate(rot); c.scale(k, k); c.font = `400 ${size}px Anton`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineJoin = 'round'; c.lineWidth = size * .13; c.strokeStyle = 'rgba(0,0,0,.92)'; c.strokeText(s, 0, 0); c.fillStyle = col; c.fillText(s, 0, 0); c.restore(); }
function sA(c, t) {
  hookBg(c, t); const P = 1.1, ph = (t % P) / P, hit = ph > .62 ? 1 : 0; const kk = t < .02 ? 1 : 1;
  const sh = t => { let s = 0; for (const h of [0.68, 1.78, 2.88]) if (t > h && t < h + .25) s += Math.sin(t * 90) * 10 * (1 - (t - h) / .25); return s; };
  const bx = 540 + sh(t); donationBox(c, bx, 950, .93, 0);
  // slip falls into the slot (clipped at box top)
  c.save(); c.beginPath(); c.rect(0, 0, W, 840); c.clip(); const u = clamp(ph / .62), y = lerp(560, 900, u * u), rot = lerp(-.4, .05, u); const sy = lerp(.5, .38, u);
  slip(c, { cx: bx, top: y - 100, s: .42, rot, n: 10, foot: 'RISK $10' }); c.restore();
  const k = back(clamp(t / .15)); big(c, '10-LEG PARLAYS =', 540, 365, 112, PAPER, .85 + .15 * k);
  const f2 = t > 2.13 ? 1 + .12 * Math.exp(-(t - 2.13) * 9) : 1; big(c, 'F*CKING', 540, 520, 200, RED, f2 * (.85 + .15 * k)); big(c, 'DONATIONS', 540, 700, 190, HL, (t > 2.33 ? 1 + .1 * Math.exp(-(t - 2.33) * 9) : 1) * (.85 + .15 * k)); }
function sB(c, t) { hookBg(c, t, '255,214,10'); const k1 = back(lin(t, 3.7, 3.95)); c.save(); c.translate(540, 400); c.scale(k1, k1); txt(c, 'REAL ODDS', 0, 0, '800 54px JBM', HL); c.restore();
  const k2 = back(lin(t, 4.9, 5.1)); const v = Math.max(1, 1024 * eo(lin(t, 4.9, 6.3)));
  c.save(); c.translate(540, 590); const pk = t > 6.1 ? 1 + .08 * Math.exp(-(t - 6.1) * 9) : 1; c.scale(k2 * pk, k2 * pk); big(c, '1 IN ' + roll(v), 0, 0, 190, RED); c.restore();
  const k3 = back(lin(t, 6.93, 7.15)); c.save(); c.translate(540, 770); c.scale(k3, k3); txt(c, 'VS  THEY PAY', 0, 0, '800 54px JBM', PAPER); c.restore();
  const k4 = back(lin(t, 7.73, 7.95)); c.save(); c.translate(540, 990); const bz = t > 8.83 ? 1 + .12 * Math.exp(-(t - 8.83) * 8) : 1; c.scale(k4 * bz, k4 * bz); big(c, roll(643 * eo(lin(t, 7.73, 9.1))) + '×', 0, 0, 290, GREEN); c.restore(); }
function sC(c, t) { hookBg(c, t); const fr = .372 * eo(lin(t, 10.47, 11.3)), k = back(lin(t, 10.13, 10.4));
  pie(c, 540, 640, 230, fr, 36 * eo(lin(t, 10.47, 11.0))); txt(c, 'YOUR SHARE', 470, 700, '400 54px Anton', INK);
  c.save(); c.translate(540, 1000); const pk = t > 11.37 ? 1 + .1 * Math.exp(-(t - 11.37) * 9) : 1; c.scale(k * pk, k * pk); big(c, Math.round(37 * eo(lin(t, 10.47, 11.3))) + '% CUT', 0, 0, 200, RED); c.restore(); }
function sD(c, t) { hookBg(c, t); stamp(c, 'THE BOOK', 500, 470, 150, PAPER, -.04, lin(t, 12.13, 12.25), 'rgba(11,15,20,.8)'); stamp(c, 'ISN’T GAMBLING.', 520, 680, 130, PAPER, .03, lin(t, 12.37, 12.5), 'rgba(11,15,20,.8)');
  stamp(c, 'YOU ARE.', 470, 940, 225, RED, -.08, lin(t, 13.33, 13.45), 'rgba(11,15,20,.88)'); }
function sE(c, t) { bg(c, t, 'rgba(0,210,106,.14)'); const k = back(lin(t, 14.27, 14.5)); big(c, 'SEND THIS', 540, 480, 210, HL, k);
  const u = lin(t, 14.27, 15.6); const x = lerp(-100, 1150, eio(u)), y = lerp(950, 620, eo(u)) + Math.sin(u * 10) * 18; if (u < 1) { c.save(); c.strokeStyle = 'rgba(245,243,238,.4)'; c.lineWidth = 6; c.setLineDash([16, 16]); c.beginPath(); for (let q = 0; q <= u; q += .03) { const xx = lerp(-100, 1150, eio(q)), yy = lerp(950, 620, eo(q)) + Math.sin(q * 10) * 18; q ? c.lineTo(xx, yy) : c.moveTo(xx, yy); } c.stroke(); c.restore(); plane(c, x, y, -.35, 2.3); }
  const k2 = back(lin(t, 14.9, 15.15)); big(c, 'TO THE FRIEND WHO’S', 540, 800, 76, PAPER, k2); const k3 = back(lin(t, 15.8, 16.05)); big(c, 'ALWAYS ONE LEG AWAY', 540, 900, 76, PAPER, k3);
  if (t > 16.1) plane(c, 540 + (t - 16.1) * 400, 1030 - (t - 16.1) * 200, -.35, 1.2); }
function bookmark(c, x, y, s, col) { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 10; c.lineJoin = 'round'; c.beginPath(); c.moveTo(-90, -150); c.lineTo(90, -150); c.lineTo(90, 150); c.lineTo(0, 80); c.lineTo(-90, 150); c.closePath(); c.fill(); c.stroke(); c.restore(); }
function sF(c, t) { hookBg(c, t, '255,214,10'); const k = back(lin(t, 17.27, 17.5)); bookmark(c, 540, 560, 1.5 * k, HL);
  for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2, u = lin(t, 17.3, 17.8); if (u <= 0 || u >= 1) continue; c.save(); c.globalAlpha = 1 - u; c.strokeStyle = HL; c.lineWidth = 10; c.lineCap = 'round'; c.beginPath(); c.moveTo(540 + Math.cos(a) * (300 + u * 80), 560 + Math.sin(a) * (300 + u * 80)); c.lineTo(540 + Math.cos(a) * (340 + u * 110), 560 + Math.sin(a) * (340 + u * 110)); c.stroke(); c.restore(); }
  big(c, 'SEND THIS ·', 540, 860, 105, PAPER, 1); big(c, 'SAVE IT BEFORE SUNDAY', 540, 980, 86, HL, 1); }
const SCENES = [[0, 3.55, sA], [3.55, 9.9, sB], [9.9, 12.0, sC], [12.0, 14.2, sD], [14.2, 17.2, sE], [17.2, 99, sF]];
function overlays(c, t) {}
function hud(c, t) {
  rr(c, 90, 262, 160, 46, 8); c.fillStyle = HL; c.fill(); txt(c, 'WHAT IF', 170, 286, '800 27px Inter', INK);
  c.save(); c.letterSpacing = '6px'; txt(c, 'BAD MATH', 990, 286, '800 24px JBM', 'rgba(245,243,238,.75)', 'right'); c.restore();
  txt(c, 'ASSUMES 50/50 LEGS AT ' + MINUS + '110 · EXPECTED VALUE · NOT ADVICE', 90, 1232, '700 18px JBM', 'rgba(245,243,238,.75)', 'left');
}
const GLITCH = [[0, .4, 1, 'd'], [2.13, 2.3, .6], [4.9, 5.0, .4], [8.83, 9.05, .8], [10.47, 10.6, .5], [13.33, 13.5, .7], [14.27, 14.4, .4], [18.5, 18.96, 1, 'r']];
const SHAKE = [[0, .4, 26], [2.13, .3, 22], [4.9, .25, 14], [8.83, .5, 34], [13.33, .4, 30], [17.27, .25, 14]];
const PZ = [[2.13, .08], [4.9, .06], [8.83, .25], [10.47, .08], [13.33, .1]];
