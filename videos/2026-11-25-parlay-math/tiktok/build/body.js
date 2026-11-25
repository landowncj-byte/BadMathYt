// TikTok cut (28.33 s): hard cuts, comment bait
const ST_POS = {}; const ST_OFF = null; const HARD = true;
const ST_CFG = { timeline: [[0, 'you'], [3.2, 'point'], [7.13, 'shock'], [8.4, 'point'], [10.85, 'chin'], [13.25, 'point'], [16.65, 'chin'], [19.15, 'shrug'], [22.9, 'you'], [26.2, 'follow']],
  bubbles: [[24.9, 26.15, 'MOST LEGS YOU’VE HIT?', 'COMMENT', [700, 1100]]], follow: [26.3, 28.25], followAt: [640, 1105], enterAt: -1 };
const CAP = { x: 420, y: 1345, size: 68, maxw: 600, lh: 76 };
const roll = v => fmt(v);
function hookBg(c, t, col = '255,59,48') {
  c.fillStyle = INK; c.fillRect(0, 0, W, H);
  const g = c.createRadialGradient(540, 760, 40, 540, 760, 950); g.addColorStop(0, `rgba(${col},.38)`); g.addColorStop(1, `rgba(${col},0)`); c.fillStyle = g; c.fillRect(0, 0, W, H);
  c.save(); c.translate(540, 760); c.globalAlpha = .1; c.fillStyle = `rgb(${col})`; for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + t * .35; c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, 1500, a, a + .15); c.closePath(); c.fill(); } c.restore();
}
function bigText(c, lines, y, size, cols, k = 1) { c.save(); c.translate(540, y); c.scale(k, k); lines.forEach((l, i) => { const yy = (i - (lines.length - 1) / 2) * size * 1.05; c.font = `400 ${size}px Anton`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineJoin = 'round'; c.lineWidth = size * .14; c.strokeStyle = 'rgba(0,0,0,.92)'; c.strokeText(l, 0, yy); c.fillStyle = cols[i % cols.length]; c.fillText(l, 0, yy); }); c.restore(); }
const BX = 120, BW = 780, FR = 643 / 1024;
function s1(c, t) { hookBg(c, t); const s = 1 + .3 * (1 - back(clamp(t / .14)));
  slip(c, { cx: 540, top: 350 - (s - 1) * 300, s, rot: -.03, n: 10 }); bigText(c, ['IMAGINE THINKING', 'THIS IS A', 'GOOD BET'], 640, 112, [PAPER, HL, PAPER], .85 + .15 * back(clamp(t / .2))); }
function s2(c, t) { bg(c, t, 'rgba(255,59,48,.14)'); const n = lin(t, 1.95, 2.5) * 10;
  slip(c, { cx: 540, top: 350, n, s: 1 + .03 * Math.sin(t * 9), rot: .02 }); stamp(c, 'GOOD BET?', 520, 740, 120, HL, -.14, lin(t, 2.4, 2.5), 'rgba(11,15,20,.8)');
  if (t > 2.8) { const k = lin(t, 2.8, 2.95); c.save(); xmark(c, 540, 740, 4.6 * back(k), RED, k); c.restore(); } }
function s3(c, t) { bg(c, t); const k = back(lin(t, 3.2, 3.45)); slip(c, { cx: 540, top: 350 - (1 - k) * 80, s: .95, n: lin(t, 3.25, 3.5), rows: 1, hdr: 'ONE LEG', foot: 'PAYS 1.91×', rot: -.02 });
  chip(c, 'EACH LEG', 540, 700, '400 80px Anton', INK, HL, 40, 120); if (t > 3.9) { c.save(); c.translate(540, 900); const kk = back(lin(t, 3.9, 4.15)); c.scale(kk, kk); txt(c, 'BOOK TAKES A BITE', 0, 0, '400 80px Anton', PAPER); c.restore(); } }
function s4(c, t) { bg(c, t); const fr = .045 * eio(lin(t, 4.7, 5.5)), pull = 34 * eio(lin(t, 4.7, 5.0));
  pie(c, 440, 790, 230, fr, pull); txt(c, 'YOUR SHARE', 440, 810, '400 54px Anton', INK);
  c.save(); c.strokeStyle = RED; c.lineWidth = 6; c.beginPath(); c.moveTo(480, 548); c.lineTo(560, 470); c.lineTo(640, 470); c.stroke(); c.restore();
  txt(c, 'BOOK KEEPS', 650, 420, '800 30px JBM', 'rgba(245,243,238,.9)', 'left'); txt(c, (4.5 * eo(lin(t, 4.77, 5.5))).toFixed(1) + '%', 650, 505, '400 125px Anton', RED, 'left'); }
function s5(c, t) { bg(c, t); const n = clamp((t - 6.05) / .1, 0, 10);
  slip(c, { cx: 380, top: 340, n, foot: n >= 10 ? 'RISK $10 · PAYS $6,431' : 'RISK $10 · PAYS . . .' });
  house(c, 835, 590, .5 + .075 * n, RED, 1); txt(c, 'LEGS', 835, 800, '800 28px JBM', HL); txt(c, String(Math.max(1, Math.ceil(n - .05))), 835, 900, '400 170px Anton', PAPER); }
function s6(c, t) { hookBg(c, t, '255,59,48'); const k = back(lin(t, 7.13, 7.35)); const fr = .372 * eo(lin(t, 7.13, 7.9));
  pie(c, 540, 700, 250, fr, 40 * eo(lin(t, 7.13, 7.6))); txt(c, 'YOUR SHARE', 470, 780, '400 54px Anton', INK);
  c.save(); c.translate(540, 1050); c.scale(k, k); txt(c, 'BOOK KEEPS ' + Math.round(37 * eo(lin(t, 7.13, 7.9))) + '%', 0, 0, '400 112px Anton', RED); c.restore(); }
const LAND = i => 8.85 + .145 * i;
function s7(c, t) { bg(c, t, 'rgba(255,214,10,.12)'); let landed = 0;
  for (let i = 0; i < 10; i++) { const x = 240 + (i % 5) * 150, y = 470 + Math.floor(i / 5) * 160, L = LAND(i), u = (t - (L - .45)) / .45;
    if (u < 0) { c.strokeStyle = 'rgba(245,243,238,.3)'; c.lineWidth = 6; c.setLineDash([10, 10]); c.beginPath(); c.arc(x, y, 58, 0, 7); c.stroke(); c.setLineDash([]); }
    else if (u < 1) coinFlip(c, x, y, 58, u, 90, 4, true); else { landed++; coinFace(c, x, y, 58, 1, true, clamp(1 - (t - L) / .5)); } }
  txt(c, 'ALL 10 MUST HIT', 540, 830, '400 96px Anton', t > 10.1 ? GREEN : PAPER); txt(c, landed + ' / 10', 540, 960, '400 150px Anton', PAPER); }
function s8(c, t) { hookBg(c, t, '255,214,10'); const v = 1024 * eo(lin(t, 10.87, 12.5)), k = back(lin(t, 10.87, 11.05));
  c.save(); c.translate(540, 560); c.scale(k, k); txt(c, 'REAL ODDS', 0, -150, '800 44px JBM', HL); txt(c, '1 IN', 0, 0, '400 200px Anton', PAPER); c.restore();
  c.save(); c.translate(540, 800); const pk = t > 12.33 ? 1 + .1 * Math.exp(-(t - 12.33) * 8) : 1; c.scale(k * pk, k * pk); txt(c, roll(Math.max(1, v)), 0, 0, '400 300px Anton', RED); c.restore(); }
function pays(c, t) { return 643 * eo(lin(t, 14.17, 15.43)); }
function s9(c, t) { bg(c, t); const k = back(lin(t, 13.25, 13.5)); c.save(); c.translate(540, 450); c.scale(k, k); txt(c, 'THEY PAY YOU', 0, 0, '400 100px Anton', PAPER); c.restore();
  slip(c, { cx: 540, top: 560, s: .62, n: 10, foot: 'RISK $10 · PAYS ???', rot: -.03 }); c.save(); c.translate(540, 1080); txt(c, 'ABOUT…', 0, 0, '800 40px JBM', HL); c.restore(); }
function s10(c, t) { hookBg(c, t, '47,191,113'); const k = back(lin(t, 15.0, 15.2)) , v = pays(c, t);
  for (let i = 0; i < 14; i++) { const u = ((t - 15.0) * .7 + i * .11) % 1, x = 120 + hash(i * 3) * 800, y = 330 + u * 800; if (t > 15.0) money(c, x, y, Math.sin(t * 3 + i) * .6, 1.2); }
  c.save(); c.translate(540, 680); const nk = t > 15.43 ? 1 + .1 * Math.exp(-(t - 15.43) * 8) : 1; c.scale(k * nk, k * nk); txt(c, roll(v) + '×', 0, 0, '400 270px Anton', GREEN); txt(c, 'YOUR MONEY', 0, 150, '800 44px JBM', PAPER); c.restore(); }
function s11(c, t) { bg(c, t); const fill = eo(lin(t, 16.8, 19.03));
  txt(c, 'FAIR PRICE', 540, 400, '800 40px JBM', HL); txt(c, roll(fill * 1024) + '×', 540, 540, '400 190px Anton', GREEN);
  hbar(c, BX, 640, BW, 120, fill, GREEN); c.strokeStyle = INK; c.lineWidth = 6; rr(c, BX, 640, BW, 120, 60); c.stroke();
  c.save(); c.setLineDash([14, 12]); c.strokeStyle = 'rgba(245,243,238,.7)'; c.lineWidth = 4; const x643 = BX + BW * FR; c.beginPath(); c.moveTo(x643, 620); c.lineTo(x643, 780); c.stroke(); c.restore(); txt(c, 'THEY PAY: 643×', x643, 825, '800 26px JBM', 'rgba(245,243,238,.8)'); }
function s12(c, t) { bg(c, t, 'rgba(255,59,48,.14)'); hbar(c, BX, 560, BW, 110, FR, '#cfd6df');
  c.save(); rr(c, BX, 560, BW, 110, 55); c.clip(); c.fillStyle = `rgba(255,59,48,${.6 + .4 * Math.sin(t * 14)})`; c.fillRect(BX + BW * FR, 560, BW * (1 - FR), 110); c.restore(); c.strokeStyle = INK; c.lineWidth = 6; rr(c, BX, 560, BW, 110, 55); c.stroke();
  txt(c, 'MISSING', 540, 400, '800 40px JBM', HL); const v = 381 * eo(lin(t, 19.4, 21.0)); txt(c, roll(v), 540, 840, '400 320px Anton', RED);
  const k = back(lin(t, 19.6, 19.9)); c.save(); c.translate(540, 1060); c.scale(k, k); txt(c, '1,024 − 643 = 381', 0, 0, '800 38px JBM', 'rgba(245,243,238,.85)'); c.restore(); }
function s13(c, t) { hookBg(c, t, '255,214,10'); const open = eio(lin(t, 21.0, 21.35)) * (1 - eio(lin(t, 22.4, 22.6))), sh = t > 22.4 && t < 22.7 ? Math.sin(t * 90) * 12 * (1 - (t - 22.4) / .3) : 0;
  vault(c, 740, 760, .85, open, sh); slip(c, { cx: 250, top: 420, s: .5, n: 10, foot: 'THE SLIP', rot: -.1 });
  for (let i = 0; i < 16; i++) { const u0 = 21.1 + i * .09, u = lin(t, u0, u0 + .55); if (u <= 0 || u >= 1) continue; const e = eio(u), x = lerp(260, 740, e), y = lerp(560, 740, e) - Math.sin(u * Math.PI) * 230, a = e * 6; money(c, x, y, a, 1.1 * (1 - .4 * u)); }
  stamp(c, 'THEIR POCKET', 500, 1090, 100, RED, -.08, lin(t, 22.4, 22.5), 'rgba(11,15,20,.85)'); }
function s14(c, t) { bg(c, t, 'rgba(255,214,10,.14)'); const v = 1 + Math.floor(9.99 * lin(t, 23.3, 25.2)); const pk = 1 + .08 * Math.exp(-((t * 5) % 1) * 5);
  txt(c, 'MOST LEGS YOU’VE EVER HIT?', 540, 410, '800 34px JBM', HL); c.save(); c.translate(540, 760); c.scale(pk, pk); txt(c, String(v), 0, 0, '400 560px Anton', v >= 10 ? GREEN : PAPER); c.restore(); }
function s15(c, t) { s14(c, t); }
function s16(c, t) { hookBg(c, t); const s = .8; slip(c, { cx: 420, top: 350, s, rot: -.03, n: 10, res: i => ({ v: i < 9 ? 1 : 0, k: 1 }), foot: 'ONE LEG AWAY' });
  stamp(c, 'MORE MATH THEY HATE', 470, 650, 78, HL, -.1, lin(t, 26.5, 26.6), 'rgba(11,15,20,.82)'); }
const SCENES = [[0, 1.95, s1], [1.95, 3.2, s2], [3.2, 4.6, s3], [4.6, 6.0, s4], [6.0, 7.13, s5], [7.13, 8.4, s6], [8.4, 10.85, s7], [10.85, 13.25, s8], [13.25, 15.0, s9], [15.0, 16.65, s10], [16.65, 19.15, s11], [19.15, 21.0, s12], [21.0, 22.9, s13], [22.9, 24.6, s14], [24.6, 26.2, s15], [26.2, 99, s16]];
function overlays(c, t) {}
function hud(c, t) {
  rr(c, 90, 238, 170, 52, 8); c.fillStyle = HL; c.fill(); txt(c, 'WHAT IF', 175, 265, '800 30px Inter', INK);
  txt(c, '10-LEG PARLAY MATH', 280, 265, '700 26px JBM', 'rgba(245,243,238,.9)', 'left');
  c.fillStyle = 'rgba(245,243,238,.15)'; c.fillRect(90, 306, 900, 6); c.fillStyle = HL; c.fillRect(90, 306, 900 * t / DUR, 6);
  txt(c, 'ASSUMES 50/50 LEGS AT ' + MINUS + '110 · EXPECTED VALUE · NOT ADVICE', 90, 1492, '700 19px JBM', 'rgba(245,243,238,.75)', 'left');
}
const GLITCH = [[0, .4, 1, 'd'], [2.8, 2.95, .5], [7.13, 7.35, .8], [10.87, 11.0, .5], [14.17, 14.3, .3], [19.15, 19.3, .4], [22.4, 22.55, .6], [27.95, 28.33, 1, 'r']];
const SHAKE = [[0, .4, 26], [2.8, .3, 20], [7.13, .5, 34], [10.87, .3, 24], [22.4, .3, 24]];
const PZ = [[2.8, .06], [7.13, .25], [10.87, .1], [22.4, .08]];
