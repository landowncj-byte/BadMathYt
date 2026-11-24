// ================= IG/FB REELS CUT: 22.83 s, huge muted-readable text, safe zone y 250-1250 =================
const DUR = 22.83;
const ST_CFG = { timeline: [[0, 'you'], [1.9, 'shock'], [4.2, 'point'], [5.9, 'shock'], [7.6, 'chin'], [9.9, 'shrug'], [14.0, 'shock'], [16.2, 'you'], [18.2, 'chin'], [19.9, 'wave']], bubbles: [], enterAt: -1, pos: { x: 190, y: 1530, s: .78 } };
const HOOK_NUMS = [3, 17, 22, 31, 38, 41];
const SAFE = 1;
function sHook(c, t) {
  hookBg(c, t); const kk = clamp(.62 + t / .15);
  big(c, 'STILL BUYING', 540, 365, '400 150px Anton', PAPER, 0, kk, INK); big(c, 'LOTTERY', 540, 530, '400 210px Anton', HL, 0, kk, INK); big(c, 'TICKETS?', 540, 710, '400 190px Anton', '#FF5A4F', 0, kk, INK);
  const s = 1 + .45 * (1 - back(clamp(t / .18))); ticket(c, 540, 975, 560 * s, -.07 + Math.sin(t * 2.4) * .03, 5, { nums: HOOK_NUMS });
  stamp(c, 'BAD MATH', 560, 985, 130, RED, -.2, clamp(.4 + t / .15), 'rgba(11,15,20,.6)');
}
function wallet(c, t, cx, cy) { c.save(); c.translate(cx, cy); c.fillStyle = '#7a4a24'; rr(c, -170, -100, 340, 220, 26); c.fill(); c.strokeStyle = '#4b2c12'; c.lineWidth = 8; c.stroke(); c.fillStyle = '#9a6030'; rr(c, -170, -100, 340, 80, [26, 26, 0, 0]); c.fill(); c.fillStyle = HL; c.beginPath(); c.arc(120, 20, 22, 0, 7); c.fill(); c.restore(); }
function bill(c, x, y, rot, s) { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s); c.fillStyle = '#6fd08c'; rr(c, -70, -36, 140, 72, 8); c.fill(); c.strokeStyle = '#1f7a3d'; c.lineWidth = 4; c.stroke(); c.beginPath(); c.arc(0, 0, 20, 0, 7); c.stroke(); txt(c, '$', 0, 2, '800 30px JBM', '#1f7a3d'); c.restore(); }
function sRob(c, t) {
  bg(c, t, 'rgba(255,59,48,.16)'); wallet(c, t, 540, 960); big(c, "YOU'RE GETTING", 540, 375, '400 112px Anton', PAPER, 0, lin(t, 1.95, 2.07), INK);
  const k = lin(t, 2.4, 2.52); if (k > 0) { c.save(); c.font = '400 150px Anton'; const parts = [['YOUR ', PAPER], ['A**', '#FF3B30'], [' ROBBED', PAPER]]; const ws = parts.map(p => c.measureText(p[0]).width); const tw = ws.reduce((a, b) => a + b, 0); const fs = Math.min(1, 980 / tw);
    c.translate(540, 525); const sc = lerp(1.9, 1, back(k)) * fs; c.scale(sc, sc); c.globalAlpha = clamp(k * 4); let px = -tw / 2; c.textAlign = 'left'; c.textBaseline = 'middle'; c.lineJoin = 'round'; parts.forEach((p, i) => { c.lineWidth = 18; c.strokeStyle = INK; c.strokeText(p[0], px, 0); c.fillStyle = p[1]; c.fillText(p[0], px, 0); px += ws[i]; }); c.restore(); }
  big(c, 'BY MATH', 540, 690, '400 170px Anton', HL, 0, lin(t, 3.32, 3.44), INK);
  for (let i = 0; i < 9; i++) { const d = t - 2.4 - i * .1; if (d < 0) continue; bill(c, 540 + Math.sin(i * 2.3) * 120 + d * (i % 2 ? 260 : -260), Math.max(835, 900 - d * 520), d * (i % 2 ? 3 : -3), 1 + d * .3); }
}
function sPBodds(c, t) { bg(c, t); big(c, 'POWERBALL', 540, 372, '400 150px Anton', HL, 0, lin(t, 4.02, 4.14), INK); big(c, 'ODDS', 540, 515, '400 150px Anton', PAPER, 0, lin(t, 4.56, 4.68), INK); drawPBslip(c, t, 4.05, 99, 540, 850, 1.35); }
function sNum(c, t) {
  bg(c, t, 'rgba(255,59,48,.15)'); big(c, '1 IN', 540, 440, '400 260px Anton', PAPER, 0, lin(t, 5.36, 5.48), INK);
  const v = 292201338 * eo(lin(t, 5.4, 5.9)); const k = t > 5.9 ? 1 + .12 * Math.exp(-(t - 5.9) * 10) : 1;
  c.save(); c.translate(540, 700); c.scale(k, k); c.shadowColor = GREEN; c.shadowBlur = 40; txt(c, fmt(v), 0, 0, '800 136px JBM', GREEN); c.restore();
  big(c, '292.2 MILLION', 540, 880, '400 118px Anton', HL, 0, lin(t, 6.66, 6.78), INK);
  if (t > 5.9) txt(c, 'TO WIN THE JACKPOT', 540, 1010, '800 40px Inter', 'rgba(245,243,238,.8)');
}
function sFund(c, t) {
  bg(c, t); big(c, 'IN', 540, 355, '400 110px Anton', PAPER, 0, lin(t, 7.66, 7.76), INK); big(c, '1992', 540, 560, '400 380px Anton', HL, 0, lin(t, 7.76, 7.9), INK);
  const k = back(lin(t, 9.22, 9.45)); if (k > 0) { c.save(); c.translate(540, 860); c.scale(k, k); c.fillStyle = '#6b4a2b'; rr(c, -190, -90, 380, 250, 26); c.fill(); c.strokeStyle = '#3d2a17'; c.lineWidth = 10; c.stroke(); c.strokeStyle = '#3d2a17'; c.lineWidth = 22; rr(c, -70, -150, 140, 70, 20); c.stroke(); c.fillStyle = HL; c.beginPath(); c.arc(0, 30, 62, 0, 7); c.fill(); txt(c, '$', 0, 34, '800 84px JBM', INK); c.restore(); big(c, 'A FUND', 540, 1040, '400 120px Anton', PAPER, 0, lin(t, 9.22, 9.34), INK); }
}
const AV = makeAval(9.9, 1.9, 380, 250, 1250);
function sScrew(c, t) {
  drawAval(c, t, AV, 9.8, [540, 800], true);
  stamp(c, 'SCREW IT', 540, 480, 190, RED, -.08, lin(t, 9.88, 10.0), 'rgba(11,15,20,.9)');
  if (t >= 11.12) { const v = 5.5e6 * eo(lin(t, 11.12, 12.0)); const k = t > 12.0 ? 1 + .15 * Math.exp(-(t - 12.0) * 10) : 1; const e = back(lin(t, 11.12, 11.3)); c.save(); c.translate(540, 860); c.scale(e * k, e * k); shadowBox(c, -440, -120, 880, 240, 30, 'rgba(11,15,20,.92)', GREEN); txt(c, fmt(v) + (t > 12.0 ? '+' : ''), 0, 0, '800 130px JBM', GREEN); c.restore(); }
  big(c, 'TICKETS', 540, 1075, '400 150px Anton', PAPER, 0, lin(t, 12.34, 12.46), INK);
}
function sVa(c, t) { bg(c, t); drawMap(c, t, 12.95, 'VIRGINIA'); big(c, 'IN VIRGINIA', 540, 1075, '400 150px Anton', HL, 0, lin(t, 13.08, 13.2), INK); }
function sWin(c, t) { drawWin(c, t, 14.0, 1000, 760, 480); big(c, 'THEY WON', 540, 300, '400 100px Anton', PAPER, 0, lin(t, 14.0, 14.1), INK); }
function sSend(c, t) {
  bg(c, t); big(c, 'SEND THIS TO', 540, 365, '400 130px Anton', PAPER, 0, lin(t, 16.12, 16.24), INK); big(c, 'THAT FRIEND', 540, 500, '400 130px Anton', HL, 0, lin(t, 17.18, 17.3), INK);
  drawBirthday(c, t, 17.5, 540, 850, .72, 18.22);
  if (t >= 18.96) { const k = back(lin(t, 18.96, 19.1)); c.save(); c.translate(540, 1020); c.rotate(-.06); c.scale(k, k); rr(c, -250, -50, 500, 100, 16); c.fillStyle = RED; c.fill(); txt(c, 'EVERY WEEK', 0, 4, '400 80px Anton', PAPER); c.restore(); }
}
function sEnd(c, t) {
  bg(c, t, 'rgba(255,214,10,.16)'); const k0 = back(lin(t, 19.9, 20.05));
  c.save(); c.translate(540, 360); c.scale(k0, k0); txt(c, 'SEND THIS', 0, 0, '400 190px Anton', PAPER); c.restore(); plane(c, 540 + Math.sin(t * 5) * 8, 560 - Math.sin(t * 3) * 10, -.3, 2.4);
  big(c, 'SAVE THIS', 540, 800, '400 190px Anton', HL, 0, lin(t, 19.92, 20.04), INK); bookmark(c, 540, 1010, 1.3, RED, lin(t, 19.92, 20.2));
  if (t >= 21.46) { const k = back(lin(t, 21.46, 21.62)); c.save(); c.translate(860, 1030); c.rotate(.2); c.scale(k, k); ticket(c, 0, 0, 200, 0, 11, { nums: HOOK_NUMS }); c.strokeStyle = RED; c.lineWidth = 16; c.lineCap = 'round'; c.beginPath(); c.moveTo(-80, -50); c.lineTo(80, 50); c.moveTo(80, -50); c.lineTo(-80, 50); c.stroke(); c.restore(); }
}
const SCENES = [[0, 1.9, sHook], [1.9, 4.0, sRob], [4.0, 5.3, sPBodds], [5.3, 7.4, sNum], [7.4, 9.8, sFund], [9.8, 12.9, sScrew], [12.9, 14.0, sVa], [14.0, 16.1, sWin], [16.1, 19.9, sSend], [19.9, 99, sEnd]];
function overlays(c, t) {
  if (t >= 16.2 && t < 17.4) { const u = eo(lin(t, 16.2, 17.2)); const P = (a, b, cc) => (1 - u) * (1 - u) * a + 2 * u * (1 - u) * b + u * u * cc; const px = P(120, 400, 1000), py = P(1050, 520, 330), tx = 2 * (1 - u) * (400 - 120) + 2 * u * (1000 - 400), ty = 2 * (1 - u) * (520 - 1050) + 2 * u * (330 - 520);
    c.save(); c.globalAlpha = 1 - lin(t, 17.0, 17.4); c.strokeStyle = 'rgba(245,243,238,.5)'; c.lineWidth = 4; c.setLineDash([12, 14]); c.beginPath(); for (let k = 0; k <= u; k += .04) { const x = (1 - k) * (1 - k) * 120 + 2 * k * (1 - k) * 400 + k * k * 1000, y = (1 - k) * (1 - k) * 1050 + 2 * k * (1 - k) * 520 + k * k * 330; k ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke(); c.setLineDash([]); plane(c, px, py, Math.atan2(ty, tx), 1.4); c.restore(); }
  if (t >= 20.5 && t < 21.4) { /* save icon pings */ }
}
const CAPCFG = { x: 540, y: 1195, size: 76, maxW: 900, step: 80 };
function caption(c, t) {
  let it = null; for (const cp of CAPS) if (t >= cp[0] && t < cp[1]) it = cp; if (!it) return;
  const k = eo(lin(t, it[0], it[0] + .1)); const parts = it[2].map(([w, col]) => [w, col === 'g' ? GREEN : col === 'r' ? RED : col === 'y' ? HL : PAPER]);
  c.save(); c.font = `800 ${CAPCFG.size}px Inter`; const sp = c.measureText(' ').width; const tw = parts.reduce((a, p) => a + c.measureText(p[0]).width, 0) + sp * (parts.length - 1); const fs = Math.min(1, CAPCFG.maxW / tw);
  c.translate(CAPCFG.x, CAPCFG.y); c.scale((.82 + .18 * k) * fs, (.82 + .18 * k) * fs); c.globalAlpha = k; let px = -tw / 2;
  for (const [w, col] of parts) { const ww = c.measureText(w).width; c.textAlign = 'left'; c.textBaseline = 'middle'; c.lineWidth = 14; c.strokeStyle = 'rgba(0,0,0,.9)'; c.lineJoin = 'round'; c.strokeText(w, px, 0); c.fillStyle = col; c.fillText(w, px, 0); px += ww + sp; }
  c.restore();
}
function hud(c, t) {
  txt(c, 'BAD MATH', 60, 262, '400 36px Anton', PAPER, 'left'); c.fillStyle = RED; c.fillRect(60, 284, 104, 5);
  txt(c, 'VIRGINIA LOTTERY 1992 · POWERBALL ODDS 1 IN 292.2M', 540, 1266, '700 20px JBM', 'rgba(245,243,238,.7)');
}
function storyteller(c, t) { Storyteller.draw(c, t, { ...ST_CFG, mouth: MOUTH[Math.min(MOUTH.length - 1, Math.floor(t * 30))] || 0 }); }
const GLITCH = [[0, .4, 1, 'd'], [2.4, 2.55, .6], [5.9, 6.05, .5], [9.88, 10.05, .6], [14.0, 14.15, .6], [18.22, 18.36, .6], [22.5, 22.84, 1, 'r']];
const SHAKE = [[0, .4, 26], [.15, .3, 30], [2.4, .3, 22], [3.32, .15, 12], [5.9, .4, 34], [9.88, .3, 24], [11.12, .2, 12], [14.0, .3, 22], [14.32, .25, 18], [18.22, .3, 22], [19.92, .25, 16], [21.46, .2, 14]];
const PZ = [[.15, .08], [2.4, .07], [5.9, .25], [9.88, .08], [14.0, .06], [14.32, .08], [18.22, .06], [19.92, .07]];
window.render = function (t) {
  const sc = SCENES.find(s => t >= s[0] && t < s[1]) || SCENES[SCENES.length - 1];
  O.save(); sc[2](O, t); O.restore(); overlays(O, t); hud(O, t); storyteller(O, t); caption(O, t);
  const g = O.createRadialGradient(540, 900, 450, 540, 900, 1300); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.5)'); O.fillStyle = g; O.fillRect(0, 0, W, H);
  const into = t - sc[0]; let cutz = 0; if (sc[0] > 0 && into < .14) cutz = .1 * (1 - eo(into / .14));
  let sx = 0, sy = 0; for (const [s0, d, amp] of SHAKE) if (t >= s0 && t < s0 + d) { const k = 1 - (t - s0) / d; sx += Math.sin(t * 97) * amp * k; sy += Math.cos(t * 83) * amp * k; }
  let pz = 1 + cutz; for (const [s0, amp] of PZ) { const k = t - s0; if (k >= 0 && k < 1) pz += amp * clamp(k / .067) * (1 - eo(clamp((k - .067) / .4))); }
  X.fillStyle = INK; X.fillRect(0, 0, W, H); X.save(); X.translate(540 + sx, 960 + sy); X.scale(pz, pz); X.translate(-540, -960); X.drawImage(OFF, 0, 0); X.restore();
  if (sc[0] > 0 && into < .06) { X.fillStyle = `rgba(255,255,255,${.35 * (1 - into / .06)})`; X.fillRect(0, 0, W, H); }
  for (const [g0, g1, amt, mode] of GLITCH) if (t >= g0 && t < g1) {
    const u = lin(t, g0, g1), k = mode === 'd' ? amt * (1 - u * .8) : mode === 'r' ? amt * u : amt * Math.sin(u * Math.PI), f = Math.floor(t * 30);
    X.save(); X.globalCompositeOperation = 'screen'; X.globalAlpha = .55 * k;
    for (const [col, dx] of [['#ff0000', 26], ['#00ffff', -26]]) { T.clearRect(0, 0, W, H); T.drawImage(OFF, 0, 0); T.globalCompositeOperation = 'multiply'; T.fillStyle = col; T.fillRect(0, 0, W, H); T.globalCompositeOperation = 'source-over'; X.drawImage(TMP, dx * k, 0); }
    X.restore(); for (let i = 0; i < 10; i++) { const y = hash(f * 13 + i) * H, h = 20 + hash(f * 7 + i) * 130, dx = (hash(f * 3 + i) - .5) * 280 * k; X.drawImage(OFF, 0, y, W, h, dx, y, W, h); }
  }
};
window.DUR = DUR;
