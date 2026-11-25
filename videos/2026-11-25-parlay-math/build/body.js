// YouTube cut: "YOUR PARLAY, DECODED" (57.86 s)
const ST_POS = {}; const ST_OFF = null; const HARD = false;
const ST_CFG = { timeline: [[0, 'you'], [2.2, 'point'], [5.5, 'chin'], [10.3, 'point'], [14.3, 'you'], [16.7, 'shock'], [19.3, 'point'], [25.5, 'point'], [29.3, 'chin'], [31.23, 'shock'], [32.1, 'you'], [35.3, 'point'], [38.97, 'shock'], [40.6, 'follow'], [44.0, 'point'], [54.1, 'shock'], [55.5, 'you']],
  bubbles: [[55.7, 57.7, 'MOST LEGS YOU\u2019VE HIT?', 'COMMENT', [700, 1110]]], follow: [40.8, 43.9], followAt: [640, 1105], enterAt: -1 };
const CAP = { x: 420, y: 1345, size: 68, maxw: 600, lh: 76 };
const roll = v => fmt(v);
function hookBg(c, t) {
  c.fillStyle = INK; c.fillRect(0, 0, W, H);
  const g = c.createRadialGradient(540, 760, 40, 540, 760, 950); g.addColorStop(0, 'rgba(255,59,48,.38)'); g.addColorStop(1, 'rgba(255,59,48,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  c.save(); c.translate(540, 760); c.globalAlpha = .1; c.fillStyle = RED; for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + t * .25; c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, 1500, a, a + .15); c.closePath(); c.fill(); } c.restore();
}
function sHook(c, t) {
  hookBg(c, t); const s = 1 + .28 * (1 - back(clamp(t / .14)));
  slip(c, { cx: 540, top: 350 - (s - 1) * 300, s, rot: -.03 + Math.sin(t * 2.2) * .012, n: 10, foot: 'RISK $10 \u00b7 PAYS $6,431' });
  stamp(c, 'IDIOT TAX', 520, 790, 150, RED, -.2, lin(t, .8, .9), 'rgba(11,15,20,.65)');
}
function sFine(c, t) {
  bg(c, t, 'rgba(255,214,10,.1)'); const f = eio(lin(t, 3.35, 4.05)); const pop = 1 + .06 * Math.sin(f * Math.PI);
  slip(c, { cx: 540, top: 350, s: pop, rot: -.02 * (1 - f) + .015 * f, n: 10, flip: f });
  if (t > 4.15) { const k = back(lin(t, 4.15, 4.4)); c.save(); c.translate(790, 330); c.rotate(.12); c.scale(k, k); chip(c, 'READ THIS PART', 0, 0, '800 26px JBM', INK, HL); c.restore(); }
}
function sSingle(c, t) {
  bg(c, t); const k = back(lin(t, 5.5, 5.75)), n = lin(t, 5.55, 5.8);
  slip(c, { cx: 540, top: 340 - (1 - k) * 60, s: .9 + .1 * k, n, rows: 1, hdr: 'SINGLE BET \u00b7 1 LEG', foot: 'PAYS 1.91\u00d7', rot: -.02 });
  const ck = lin(t, 6.57, 7.25); if (ck > 0) { c.save(); c.strokeStyle = RED; c.lineWidth = 7; c.lineCap = 'round'; c.beginPath(); c.ellipse(728, 449, 72, 32, -.05, -Math.PI / 2, -Math.PI / 2 + ck * Math.PI * 2.15); c.stroke(); c.restore(); }
  const tag2 = (x, label, val, col, k0, vtxt) => { const k = back(lin(t, k0, k0 + .22)); if (k <= 0) return; c.save(); c.translate(x, 800); c.scale(k, k); shadowBox(c, -170, -110, 340, 220, 26, 'rgba(11,15,20,.8)', col); txt(c, label, 0, -66, '800 32px JBM', col); txt(c, vtxt, 0, 20, '400 126px Anton', PAPER); c.restore(); };
  tag2(270, 'RISK', 110, RED, 8.07, '$' + roll(110 * eo(lin(t, 8.1, 9.0))));
  tag2(710, 'TO WIN', 100, GREEN, 9.30, '$' + roll(100 * eo(lin(t, 9.32, 9.85))));
  const ak = lin(t, 8.9, 9.2); if (ak > 0) arrowR(c, 456, 800, 90 * eo(ak), PAPER, 10);
  const k2 = back(lin(t, 9.6, 9.85)); if (k2 > 0) { c.save(); c.translate(540, 1000); c.scale(k2, k2); chip(c, 'ONE LEG \u00b7 PAYS 1.91\u00d7', 0, 0, '800 30px JBM', INK, HL, 26, 62); c.restore(); }
}
function sCoin(c, t) {
  bg(c, t, 'rgba(255,214,10,.16)'); const u = lin(t, 10.3, 11.55);
  const k = back(lin(t, 10.3, 10.5)); c.save(); c.translate(540, 520); c.scale(k, k); txt(c, '50 / 50', 0, 0, '400 230px Anton', HL); c.restore();
  coinFlip(c, 540, 880, 165, u, 130, 8, true);
  const k2 = back(lin(t, 10.9, 11.15)); if (k2 > 0) { c.save(); c.translate(540, 1050); c.scale(k2, k2); chip(c, 'TRUE ODDS: 1 IN 2', 0, 0, '800 34px JBM', INK, PAPER, 28, 66); c.restore(); }
}
function sPie(c, t) {
  bg(c, t); const fr = .045 * eio(lin(t, 12.3, 13.6)), pull = 34 * eio(lin(t, 12.3, 12.9)), s = .85 + .15 * back(lin(t, 11.97, 12.2));
  c.save(); c.translate(440, 790); c.scale(s, s); c.translate(-440, -790); pie(c, 440, 790, 230, fr, pull); txt(c, 'YOUR SHARE', 440, 810, '400 54px Anton', INK); c.restore();
  const k = lin(t, 12.5, 12.9); if (k > 0) { c.save(); c.globalAlpha = k; c.strokeStyle = RED; c.lineWidth = 6; c.beginPath(); c.moveTo(480, 548); c.lineTo(560, 470); c.lineTo(640, 470); c.stroke(); c.restore();
    txt(c, 'BOOK KEEPS', 650, 420, '800 30px JBM', 'rgba(245,243,238,.9)', 'left'); txt(c, roll2(4.5 * eo(lin(t, 12.7, 13.6))) + '%', 650, 505, '400 125px Anton', RED, 'left'); }
}
const roll2 = v => v.toFixed(1);
function sStack(c, t) {
  bg(c, t); const n = clamp((t - 14.43) / .17, 0, 10), nn = Math.floor(n + .001);
  slip(c, { cx: 380, top: 340, n, foot: n >= 10 ? 'RISK $10 \u00b7 PAYS $6,431' : 'RISK $10 \u00b7 PAYS . . .' });
  const hk = back(lin(t, 14.3, 14.55)); house(c, 835, 590, .5 + .075 * n, RED, hk);
  txt(c, 'THE HOUSE', 835, 730, '800 26px JBM', 'rgba(245,243,238,.8)'); txt(c, 'LEGS', 835, 800, '800 28px JBM', HL); txt(c, String(Math.max(1, nn + (n % 1 > .1 ? 1 : 0))), 835, 900, '400 170px Anton', PAPER);
}
function sLike(c, t) {
  bg(c, t); const hits = i => ({ v: i < 9 ? 1 : (t >= 17.6 ? -1 : 0), k: i < 9 ? lin(t, 16.8 + i * .08, 17.05 + i * .08) : lin(t, 17.6, 17.95) });
  slip(c, { cx: 380, top: 340, n: 10, res: hits }); let h = 0; for (let i = 0; i < 9; i++) if (t >= 16.8 + i * .08 + .1) h++;
  txt(c, h + '/10', 835, 560, '400 140px Anton', t >= 17.6 ? RED : GREEN);
  if (t >= 17.6) { const k = back(lin(t, 17.6, 17.85)); c.save(); c.translate(835, 760); c.rotate(-.12); c.scale(k, k); stamp(c, 'LOST', 0, 0, 100, RED, 0, 1, 'rgba(11,15,20,.6)'); c.restore(); }
}
const LAND = i => 19.9 + (23.2 - 19.9) / 9 * i;
function sCoins(c, t) {
  bg(c, t, 'rgba(255,214,10,.12)'); let landed = 0;
  for (let i = 0; i < 10; i++) { const x = 240 + (i % 5) * 150, y = 470 + Math.floor(i / 5) * 160, L = LAND(i), u = (t - (L - .55)) / .55;
    if (u < 0) { c.strokeStyle = 'rgba(245,243,238,.3)'; c.lineWidth = 6; c.setLineDash([10, 10]); c.beginPath(); c.arc(x, y, 58, 0, 7); c.stroke(); c.setLineDash([]); }
    else if (u < 1) coinFlip(c, x, y, 58, u, 90, 4, true); else { landed++; coinFace(c, x, y, 58, 1, true, clamp(1 - (t - L) / .5)); } }
  txt(c, 'YOUR REAL CHANCE OF ALL 10', 540, 790, '800 32px JBM', 'rgba(245,243,238,.85)');
  const since = t - (landed ? LAND(landed - 1) : 0), pu = 1 + .12 * Math.exp(-since * 9), fin = t >= 23.2;
  c.save(); c.translate(540, 930); c.scale(pu * (fin ? 1 + .08 * Math.exp(-(t - 23.2) * 8) : 1), pu); txt(c, '1 IN ' + roll(Math.pow(2, landed)), 0, 0, '400 175px Anton', fin ? RED : PAPER); c.restore();
}
const BX = 120, BW = 780, FR = 643 / 1024;
function sBars(c, t) {
  bg(c, t); const fill = eo(lin(t, 25.57, 28.0)), drop = eio(lin(t, 30.27, 31.23)); const fr = fill * (1 - drop * (1 - FR));
  const val = fill * 1024 - drop * (1024 - 643) * fill; const dropped = t >= 30.27;
  const l1 = t < 29.63 ? 'FAIR PAYOUT' : 'WHAT THE BOOK PAYS'; txt(c, l1, 540, 375, '800 36px JBM', HL);
  const nk = t >= 31.23 ? 1 + .12 * Math.exp(-(t - 31.23) * 9) : 1; c.save(); c.translate(540, 520); c.scale(nk, nk); txt(c, roll(val) + '\u00d7', 0, 0, '400 185px Anton', dropped ? PAPER : GREEN); c.restore();
  // ghost of the fair bar
  hbar(c, BX, 620, BW, 120, 0, GREEN); if (dropped) { c.save(); c.strokeStyle = 'rgba(245,243,238,.7)'; c.lineWidth = 4; c.setLineDash([14, 12]); rr(c, BX + BW * FR, 620, BW * (1 - FR), 120, 60); c.stroke(); c.restore(); }
  hbar(c, BX, 620, BW, 120, fr, dropped ? '#cfd6df' : GREEN, 'rgba(245,243,238,.1)');
  // gap fill
  const gk = t >= 36.03 ? lin(t, 36.03, 36.3) : 0, yk = t >= 35.43 && t < 36.03 ? .55 + .3 * Math.sin((t - 35.43) * 22) : 0;
  if (gk > 0 || yk > 0) { c.save(); rr(c, BX, 620, BW, 120, 60); c.clip(); c.fillStyle = gk > 0 ? `rgba(255,59,48,${gk})` : `rgba(255,214,10,${yk})`; c.fillRect(BX + BW * FR, 620, BW * (1 - FR), 120); c.restore(); }
  c.strokeStyle = INK; c.lineWidth = 6; rr(c, BX, 620, BW, 120, 60); c.stroke();
  for (const [v, l] of [[0, '0'], [512, '512'], [1024, '1,024\u00d7']]) txt(c, l, BX + BW * v / 1024, 782, '700 22px JBM', 'rgba(245,243,238,.55)', v === 1024 ? 'right' : v ? 'center' : 'left');
  if (t >= 35.43 && t < 38.9) { const gx = BX + BW * (FR + 1) / 2; const k = back(lin(t, 35.43, 35.7)); c.save(); c.translate(gx, 830); c.scale(k, k); const cut = t >= 36.03; c.fillStyle = cut ? RED : HL; c.beginPath(); c.moveTo(0, -48); c.lineTo(-18, -22); c.lineTo(18, -22); c.closePath(); c.fill(); chip(c, cut ? 'THE CUT' : 'THE GAP', 0, 0, '400 44px Anton', cut ? PAPER : INK, cut ? RED : HL, 26, 62); c.restore(); }
  if (t >= 38.97) { const k = back(lin(t, 38.97, 39.2)); c.save(); c.translate(540, 920); c.scale(k, k); txt(c, 'THE CUT: ' + Math.round(37 * eo(lin(t, 38.97, 39.8))) + '%', 0, 0, '400 150px Anton', RED); c.restore(); txt(c, 'OF THE FAIR PAYOUT', 540, 1000, '800 30px JBM', 'rgba(245,243,238,.8)'); }
  if (t >= 31.23 && t < 32.3) { const k = back(lin(t, 31.23, 31.4)) * (1 - lin(t, 32.1, 32.3)); c.save(); c.globalAlpha = clamp(k); xmark(c, BX + BW * (FR + 1) / 2, 680, 2.3 * k, RED, lin(t, 31.23, 31.4)); c.restore(); }
}
function sFriend(c, t) {
  bg(c, t); c.save(); c.translate(250, 600); c.fillStyle = '#8aa0c8'; c.beginPath(); c.arc(0, -40, 58, 0, 7); c.fill(); c.beginPath(); c.moveTo(-100, 120); c.quadraticCurveTo(-100, 40, 0, 40); c.quadraticCurveTo(100, 40, 100, 120); c.closePath(); c.fill(); c.restore();
  txt(c, 'THE FRIEND', 250, 740, '800 24px JBM', 'rgba(245,243,238,.7)');
  const k = back(lin(t, 32.9, 33.15)); if (k > 0) { c.save(); c.translate(600, 560); c.scale(k, k); shadowBox(c, -290, -100, 580, 200, 40, PAPER); c.fillStyle = PAPER; c.beginPath(); c.moveTo(-250, 90); c.lineTo(-300, 140); c.lineTo(-190, 98); c.fill();
    txt(c, 'I\u2019M ONE LEG AWAY', 0, -22, '400 70px Anton', INK); txt(c, '9 OF 10 HIT', 0, 40, '800 32px JBM', '#0aa850'); c.restore(); }
  slip(c, { cx: 540, top: 800, s: .46, n: 10, res: i => ({ v: i < 9 ? 1 : 0, k: 1 }), foot: 'RISK $10 \u00b7 PAYS $6,431' });
}
function sDay(c, t) {
  bg(c, t); const A = t < 44.9;
  if (A) { const k = back(lin(t, 41.95, 42.2)); c.save(); c.translate(540, 435); c.scale(k, k); txt(c, '$10 / DAY', 0, 0, '400 150px Anton', HL); c.restore();
    const cnt = Math.floor(365 * lin(t, 42.1, 44.0)); for (let i = 0; i < 390; i++) { const x = 164 + (i % 26) * 28, y = 565 + Math.floor(i / 26) * 28; c.fillStyle = i < cnt ? GREEN : 'rgba(245,243,238,.1)'; c.beginPath(); c.arc(x, y, 10, 0, 7); c.fill(); }
    txt(c, 'DAY ' + Math.min(365, cnt) + (t > 44.0 ? ' \u00b7 $3,650 STAKED' : ''), 540, 1000, '400 66px Anton', t > 44.0 ? GREEN : PAPER); }
  else { const k = lin(t, 44.9, 45.1); c.save(); c.globalAlpha = k;
    chip(c, '$10/DAY \u00d7 365 = $3,650 STAKED', 540, 400, '800 30px JBM', INK, PAPER, 26, 60);
    const row = (y, label, val, vmax, col, t0, t1) => { const v = val * eo(lin(t, t0, t1)); txt(c, label, 90, y, '800 30px JBM', 'rgba(245,243,238,.9)', 'left'); txt(c, MINUS + '$' + roll(v), 900, y + 6, '400 100px Anton', col, 'right'); hbar(c, 90, y + 50, 810, 70, v / vmax, col); };
    row(560, 'SINGLE BETS', 166, 1358, '#ff8a80', 45.33, 48.87); row(780, '10-LEG PARLAYS', 1358, 1358, RED, 49.63, 52.77);
    c.restore(); if (t > 45.2) { const ek = back(lin(t, 45.2, 45.45)); c.save(); c.translate(540, 1000); c.scale(ek, ek); chip(c, 'EXPECTED VALUE \u00b7 NOT A PREDICTION', 0, 0, '800 28px JBM', INK, HL, 26, 60); c.restore(); }
    if (t >= 54.1) stamp(c, '8\u00d7', 540, 800, 380, RED, -.12, lin(t, 54.1, 54.2), 'rgba(11,15,20,.78)'); }
}
function sOutro(c, t) {
  hookBg(c, t); const k = back(lin(t, 55.4, 55.6));
  slip(c, { cx: 420, top: 330, s: .92 * (.9 + .1 * k), rot: -.02, n: 10, res: i => ({ v: i < 9 ? 1 : 0, k: 1 }), foot: 'RISK $10 \u00b7 ONE LEG TO GO' });
  stamp(c, 'ONE LEG AWAY?', 430, 700, 104, HL, -.14, lin(t, 56.0, 56.1), 'rgba(11,15,20,.8)');
}
const SCENES = [[0, 2.2, sHook], [2.2, 5.4, sFine], [5.4, 10.3, sSingle], [10.3, 11.97, sCoin], [11.97, 14.2, sPie], [14.2, 16.55, sStack], [16.55, 19.2, sLike], [19.2, 25.4, sCoins], [25.4, 32.3, sBars], [32.3, 35.1, sFriend], [35.1, 41.9, sBars], [41.9, 55.4, sDay], [55.4, 99, sOutro]];
function overlays(c, t) {
  if (t >= 16.73 && t < 19.1) { const ph = ((t - 16.9) * 2.4) % 1, ph0 = t < 16.9 ? 0 : ph; const s = (t < 16.9 ? back(lin(t, 16.73, 16.9)) : 1) * (1 + .3 * Math.exp(-ph0 * 6)); const out = 1 - eo(lin(t, 18.9, 19.1));
    c.save(); c.globalAlpha = out; heart(c, 790, 1145, 1.15 * s, RED); for (let i = 0; i < 3; i++) { const u = ((t - 16.9) * .9 + i * .33) % 1; if (t > 16.9) { c.globalAlpha = out * (1 - u); heart(c, 790 + (i - 1) * 50 + Math.sin(u * 6 + i) * 10, 1100 - u * 130, .4, '#ff7a72'); } } c.restore(); }
  if (t >= 32.1 && t < 33.1) { const u = eo(lin(t, 32.1, 32.95)); const P = (a, b, cc) => (1 - u) * (1 - u) * a + 2 * u * (1 - u) * b + u * u * cc;
    const px = P(790, 760, 360), py = P(1330, 650, 600), tx = 2 * (1 - u) * (760 - 790) + 2 * u * (360 - 760), ty = 2 * (1 - u) * (650 - 1330) + 2 * u * (600 - 650);
    c.save(); c.globalAlpha = 1 - lin(t, 32.9, 33.1); c.strokeStyle = 'rgba(245,243,238,.5)'; c.lineWidth = 4; c.setLineDash([12, 14]); c.beginPath(); for (let k = 0; k <= u; k += .04) { const x = (1 - k) * (1 - k) * 790 + 2 * k * (1 - k) * 760 + k * k * 360, y = (1 - k) * (1 - k) * 1330 + 2 * k * (1 - k) * 650 + k * k * 600; k ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke(); c.setLineDash([]);
    plane(c, px, py, Math.atan2(ty, tx), .55 * (1 - .4 * u)); c.restore(); }
}
function hud(c, t) {
  rr(c, 90, 238, 170, 52, 8); c.fillStyle = HL; c.fill(); txt(c, 'WHAT IF', 175, 265, '800 30px Inter', INK);
  txt(c, 'YOUR PARLAY, DECODED', 280, 265, '700 26px JBM', 'rgba(245,243,238,.9)', 'left');
  c.fillStyle = 'rgba(245,243,238,.15)'; c.fillRect(90, 306, 900, 6); c.fillStyle = HL; c.fillRect(90, 306, 900 * t / DUR, 6);
  txt(c, 'ASSUMES 50/50 LEGS AT ' + MINUS + '110 \u00b7 EXPECTED VALUE \u00b7 NOT ADVICE', 90, 1492, '700 19px JBM', 'rgba(245,243,238,.75)', 'left');
  txt(c, '10 LEGS: 1.91^10 = 643\u00d7 PAID vs 2^10 = 1,024\u00d7 FAIR', 90, 1518, '700 17px JBM', 'rgba(245,243,238,.5)', 'left');
}
const GLITCH = [[0, .4, 1, 'd'], [.8, .95, .5], [3.35, 3.5, .35], [23.2, 23.32, .4], [31.23, 31.4, .5], [38.97, 39.2, .7], [54.1, 54.22, .4], [57.3, 57.86, 1, 'r']];
const SHAKE = [[0, .4, 26], [.8, .3, 30], [23.2, .25, 14], [31.23, .3, 16], [38.97, .5, 34], [54.1, .3, 24]];
const PZ = [[.8, .07], [23.2, .06], [31.23, .06], [38.97, .25], [54.1, .08]];
