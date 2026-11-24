// ================= TIKTOK CUT: 32.32 s, hard cuts, comment bait =================
const DUR = 32.32;
const ST_CFG = { timeline: [[0, 'you'], [2.5, 'shock'], [5.0, 'point'], [7.1, 'chin'], [10.2, 'shock'], [12.0, 'point'], [14.46, 'shock'], [16, 'chin'], [18.1, 'you'], [22.1, 'shock'], [23.4, 'chin'], [25.3, 'shock'], [27.3, 'you'], [28.9, 'shrug'], [30.1, 'follow']],
  bubbles: [[27.3, 30.0, 'WOULD YOU TRY IT?', 'COMMENT']], follow: [30.1, 32.32], enterAt: -1 };
const HOOK_NUMS = [3, 17, 22, 31, 38, 41];

function sHook(c, t) {
  hookBg(c, t);
  const kk = clamp(.62 + t / .15);
  big(c, 'THE LOTTERY =', 540, 335, '400 104px Anton', PAPER, 0, kk); big(c, 'A TAX ON', 540, 462, '400 168px Anton', HL, 0, kk); big(c, 'PEOPLE WHO', 540, 604, '400 122px Anton', PAPER, 0, kk); big(c, "CAN'T DO MATH", 540, 738, '400 136px Anton', '#FF5A4F', 0, kk, INK);
  const s = 1 + .4 * (1 - back(clamp(t / .18))); const wob = Math.sin(t * 2.4) * .03;
  ticket(c, 540, 1060, 580 * s, -.07 + wob, 5, { nums: HOOK_NUMS });
  stamp(c, 'TAX', 575, 1075, 250, RED, -.2, clamp(.45 + t / .15), 'rgba(11,15,20,.55)');
  if (t > 2.1) { c.fillStyle = `rgba(255,59,48,${.35 * (1 - lin(t, 2.1, 2.3))})`; c.fillRect(0, 0, W, H); }
}
function sMath(c, t) {
  bg(c, t);
  const sy = ['+', '−', '×', '÷', '=', '%', '√', 'π', '+', '×']; for (let i = 0; i < sy.length; i++) { const a = t * (.5 + hash(i) * .6) + i * 2.1; const x = 540 + Math.cos(a) * (330 + hash(i + 3) * 160), y = 760 + Math.sin(a * 1.2) * (420 + hash(i + 8) * 120); c.globalAlpha = .2; txt(c, sy[i], x, y, '400 150px Anton', i % 2 ? HL : GREEN); c.globalAlpha = 1; }
  if (t < 3.32) { c.globalAlpha = .9; txt(c, '?', 540, 760 + Math.sin(t * 6) * 10, '400 560px Anton', 'rgba(245,243,238,.16)'); c.globalAlpha = 1; }
  big(c, 'THESE GUYS', 540, 520, '400 150px Anton', PAPER, 0, lin(t, 3.32, 3.44), INK); big(c, 'DID THE MATH', 540, 690, '400 150px Anton', HL, 0, lin(t, 3.68, 3.8), INK);
  const k = lin(t, 4.1, 4.4); if (k > 0) { c.save(); c.translate(540, 1010); const e = back(lin(t, 4.1, 4.3)); c.scale(e, e); c.fillStyle = 'rgba(0,210,106,.2)'; c.beginPath(); c.arc(0, 0, 150, 0, 7); c.fill(); check(c, 0, 0, 2.6, GREEN, k); c.restore(); }
}
function sVA(c, t) {
  bg(c, t); drawMap(c, t, 5.0, 'VIRGINIA');
  big(c, '1992', 540, 1140, '400 270px Anton', HL, 0, lin(t, 5.4, 5.52), INK);
}
const MARKS = [[2, 7.2], [10, 7.38], [16, 7.56], [25, 7.74], [31, 7.92], [39, 8.1]];
function sSlip(c, t) {
  bg(c, t); const top = lerp(-520, 350, bounce(lin(t, 7.1, 7.4))); drawSlip6(c, t, MARKS, 540, top, 1);
  const cp = 7059052 * eo(lin(t, 7.16, 8.0)); const kk = t > 8.0 ? 1 + .18 * Math.exp(-(t - 8.0) * 12) : 1;
  if (t >= 7.16) { c.save(); c.translate(540, 940); c.scale(kk, kk); txt(c, fmt(cp), 0, 0, '800 112px JBM', GREEN); c.restore(); }
  big(c, 'COMBINATIONS', 540, 1052, '400 92px Anton', PAPER, 0, lin(t, 8.0, 8.12));
  if (t >= 8.8) { const k = back(lin(t, 8.8, 9.0)); c.save(); c.translate(540, 1180); c.rotate(-.05); c.scale(k, k); shadowBox(c, -190, -62, 380, 124, 18, HL); txt(c, '$1 EACH', 0, 4, '400 90px Anton', INK); c.restore(); }
}
function sJack(c, t) {
  bg(c, t, t > 10.52 ? 'rgba(0,210,106,.18)' : 'rgba(255,214,10,.13)'); c.save(); c.translate(540, 780); c.scale(1.18, 1.18); c.translate(-540, -430); drawSign(c, t, 9.9, 10.52); c.restore();
  for (let i = 0; i < 46; i++) { const d = t - 10.52 - hash(i) * .6; if (d < 0) continue; const x = hash(i + 4) * 1000 + 40, y = 330 + 1100 * d * d + 0 * d; if (y > 1300) continue; c.save(); c.translate(x, y); c.scale(Math.cos(d * 9 + i), 1); c.fillStyle = HL; c.beginPath(); c.arc(0, 0, 26, 0, 7); c.fill(); c.strokeStyle = '#b8860b'; c.lineWidth = 4; c.stroke(); txt(c, '$', 0, 2, '800 30px JBM', '#8a6408'); c.restore(); }
  big(c, 'JACKPOT', 540, 1120, '400 190px Anton', t > 10.52 ? GREEN : 'rgba(245,243,238,.35)', 0, lin(t, 10.16, 10.28), INK);
}
const AV = makeAval(12.0, 1.9, 380);
function sAval(c, t) {
  drawAval(c, t, AV, 11.9, [540, 930], true);
  big(c, 'TRY TO BUY', 540, 340, '400 130px Anton', HL, 0, lin(t, 12.0, 12.12), INK); big(c, 'THEM ALL', 540, 480, '400 150px Anton', PAPER, 0, lin(t, 12.3, 12.42), INK);
  stamp(c, 'EVERY SINGLE ONE', 540, 800, 112, RED, -.08, lin(t, 13.3, 13.42), 'rgba(11,15,20,.85)');
}
function sClock(c, t) {
  bg(c, t, t > 15.3 ? 'rgba(255,59,48,.16)' : 'rgba(255,214,10,.13)'); drawClockBar(c, t, 14.3, 15.3);
  if (t < 15.3) txt(c, t < 14.9 ? 'there is no time.' : 'tick. tick. tick.', 540, 826, '400 34px "Special Elite"', 'rgba(245,243,238,.75)');
  stamp(c, "TIME'S UP", 540, 1070, 150, RED, -.07, lin(t, 15.3, 15.42), 'rgba(11,15,20,.85)');
}
function sCount(c, t) {
  bg(c, t); for (let i = 0; i < 26; i++) { const y = ((t * 260 + hash(i) * 2400) % 2300) - 200; ticket(c, hash(i + 1) * 1080, y, 150 + hash(i + 2) * 60, Math.sin(t + i) * .5, i + 300, { mini: true }); } dark(c, .7, .6);
  const v = 5.5e6 * eo(lin(t, 15.92, 17.08)); const k = t > 17.08 ? 1 + .16 * Math.exp(-(t - 17.08) * 11) : 1;
  c.save(); c.translate(540, 650); c.scale(k, k); c.shadowColor = GREEN; c.shadowBlur = 30; txt(c, fmt(v) + (t > 17.08 ? '+' : ''), 0, 0, '800 150px JBM', GREEN); c.restore();
  big(c, 'TICKETS', 540, 850, '400 200px Anton', PAPER, 0, lin(t, 15.92, 16.04), INK);
  stamp(c, '1.5M SHORT', 540, 1090, 128, RED, -.06, lin(t, 17.4, 17.52), 'rgba(11,15,20,.88)');
}
const DRAWT = [[8, 18.86], [11, 19.42], [13, 19.80], [15, 20.22], [19, 20.78], [20, 21.32]];
function sDraw(c, t) {
  bg(c, t, 'rgba(255,59,48,.12)'); drum(c, t, 540, 520, 190, (t - 18.1) * 9 + (t - 18.1) * (t - 18.1) * .6, 0);
  shadowBox(c, 90, 880, 900, 160, 30, '#141b24', 'rgba(245,243,238,.35)');
  big(c, 'THE DRAW', 540, 335, '400 120px Anton', HL, 0, lin(t, 18.1, 18.22), INK);
  let last = -1;
  DRAWT.forEach(([num, tw], i) => { const cx = 190 + i * 140, cy = 960; c.strokeStyle = 'rgba(245,243,238,.3)'; c.lineWidth = 4; c.setLineDash([8, 8]); c.beginPath(); c.arc(cx, cy, 58, 0, 7); c.stroke(); c.setLineDash([]);
    const u = lin(t, tw, tw + .22); if (t < tw) return; last = i;
    const ex = eo(u), x = lerp(540, cx, ex), y = lerp(690, cy, u * u * (3 - 2 * u)) - Math.sin(u * Math.PI) * 60; const land = t >= tw + .22 ? clamp((t - tw - .22) / .22) : 0;
    const sc = u < 1 ? lerp(.5, 1.25, eo(Math.min(1, u * 2))) * lerp(1, .85, u) : 1 + .28 * Math.exp(-land * 9) * Math.cos(land * 14);
    if (t >= tw + .22) { c.save(); c.globalAlpha = .6 * (1 - land); c.strokeStyle = HL; c.lineWidth = 8; c.beginPath(); c.arc(cx, cy, 58 + land * 60, 0, 7); c.stroke(); c.restore(); }
    const glow = t >= 21.32 ? .5 + .5 * Math.sin(t * 9) : 0; c.save(); if (glow) { c.shadowColor = HL; c.shadowBlur = 30 * glow; } ball(c, x, y, 58 * sc, BC[i % 6], num); c.restore(); });
  if (last >= 0) { const [num, tw] = DRAWT[last]; const d = t - tw; if (d < .5) { c.save(); c.globalAlpha = Math.exp(-d * 7) * .9; c.translate(540, 1170); c.scale(1 + d * .6, 1 + d * .6); txt(c, String(num), 0, 0, '400 330px Anton', HL); c.restore(); } }
  if (t >= 21.74) { const k = back(lin(t, 21.74, 21.9)); c.save(); c.translate(540, 1150); c.scale(k, k); txt(c, 'ONE TICKET MATCHES…', 0, 0, '400 66px Anton', PAPER); c.restore(); }
  const v = lin(t, 18.1, 22.0), g = c.createRadialGradient(540, 700, 300 - v * 120, 540, 700, 1200); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(0,0,0,${.35 + .4 * v})`); c.fillStyle = g; c.fillRect(0, 0, W, H);
}
function sWin(c, t) { drawWin(c, t, 22.1, 1110, 850, 580); big(c, 'THEY HAD IT', 540, 365, '400 150px Anton', HL, 0, lin(t, 22.1, 22.2), INK); }
function sPB(c, t) { bg(c, t); drawPBslip(c, t, 23.4, 99, 540, 740, 1.3); big(c, 'TODAY?', 540, 390, '400 200px Anton', HL, 0, lin(t, 23.78, 23.9), INK); }
function sPBnum(c, t) {
  bg(c, t, 'rgba(255,59,48,.12)'); drawPBslip(c, t, 24.7, 24.7, 540, 480, .8);
  const v = 292201338 * eo(lin(t, 24.78, 25.4)); const k = t > 25.4 ? 1 + .18 * Math.exp(-(t - 25.4) * 12) : 1;
  c.save(); c.translate(540, 840); c.scale(k, k); c.shadowColor = GREEN; c.shadowBlur = 30; txt(c, fmt(v), 0, 0, '800 124px JBM', GREEN); c.restore();
  big(c, 'COMBINATIONS', 540, 990, '400 100px Anton', PAPER, 0, lin(t, 25.96, 26.08), INK);
  stamp(c, 'TAX', 570, 1120, 190, RED, -.2, lin(t, 26.7, 26.8), 'rgba(11,15,20,.6)');
}
function sAsk(c, t) {
  bg(c, t); big(c, 'WOULD YOU TRY IT?', 540, 415, '400 {S}px Anton', PAPER, 940, lin(t, 27.26, 27.38), INK);
  const pu = [[28.10, 0], [28.76, 1]]; const bt = (k, y, col, tc, lab, tp, ph) => { const e = back(lin(t, 27.3 + k * .12, 27.55 + k * .12)); const pulse = 1 + .14 * Math.exp(-Math.max(0, t - tp) * 9) * (t >= tp ? 1 : 0); const r = Math.sin(t * 3 + ph) * .012;
    c.save(); c.translate(540, y); c.rotate(r); c.scale(e * pulse, e * pulse); shadowBox(c, -400, -92, 800, 184, 44, col); if (t >= tp) { c.strokeStyle = PAPER; c.lineWidth = 8; rr(c, -400, -92, 800, 184, 44); c.stroke(); } txt(c, lab, 0, 6, '400 130px Anton', tc); c.restore(); };
  bt(0, 650, GREEN, INK, 'YES', 28.10, 0); bt(1, 870, RED, PAPER, 'NO', 28.76, 2);
}
function sFollow(c, t) {
  hookBg(c, t, '255,214,10'); big(c, 'YOUR MOVE.', 540, 410, '400 170px Anton', HL, 0, lin(t, 30.0, 30.12), INK);
  ticket(c, 540, 740, 520, -.07 + Math.sin(t * 2.4) * .03, 5, { nums: HOOK_NUMS }); stamp(c, 'TAX', 575, 755, 210, RED, -.2, lin(t, 30.25, 30.35), 'rgba(11,15,20,.55)');
}
const SCENES = [[0, 2.5, sHook], [2.5, 4.7, sMath], [4.7, 7.1, sVA], [7.1, 9.9, sSlip], [9.9, 11.9, sJack], [11.9, 14.3, sAval], [14.3, 15.9, sClock], [15.9, 18.1, sCount], [18.1, 22.04, sDraw], [22.04, 23.4, sWin], [23.4, 24.7, sPB], [24.7, 27.2, sPBnum], [27.2, 30.0, sAsk], [30.0, 99, sFollow]];

function overlays(c, t) {
  if (t >= 30.4) { const k = back(lin(t, 30.4, 30.6)); c.save(); c.translate(690, 960); c.rotate(-.07); c.scale(k, k); rr(c, -92, -28, 184, 56, 12); c.fillStyle = HL; c.fill(); txt(c, 'PART 2', 0, 3, '400 40px Anton', INK); c.restore(); }
}
const CAPCFG = { x: 420, y: 1345, size: 68, maxW: 600, step: 76 };
function caption(c, t) {
  let it = null; for (const cp of CAPS) if (t >= cp[0] && t < cp[1]) it = cp; if (!it) return;
  const k = eo(lin(t, it[0], it[0] + .12)); const parts = it[2].map(([w, col]) => [w, col === 'g' ? GREEN : col === 'r' ? RED : col === 'y' ? HL : PAPER]);
  c.save(); c.font = `800 ${CAPCFG.size}px Inter`; const sp = c.measureText(' ').width; const lines = [[]]; let lw = 0;
  for (const p of parts) { const w = c.measureText(p[0]).width; if (lw + w > CAPCFG.maxW && lines[lines.length - 1].length) { lines.push([]); lw = 0; } lines[lines.length - 1].push([...p, w]); lw += w + sp; }
  c.translate(CAPCFG.x, CAPCFG.y - (lines.length - 1) * CAPCFG.step / 2); c.scale(.82 + .18 * k, .82 + .18 * k); c.globalAlpha = k;
  lines.forEach((ln, li) => { const tw = ln.reduce((a, p) => a + p[2], 0) + sp * (ln.length - 1); let px = -tw / 2;
    for (const [w, col, ww] of ln) { c.textAlign = 'left'; c.textBaseline = 'middle'; c.lineWidth = 14; c.strokeStyle = 'rgba(0,0,0,.88)'; c.lineJoin = 'round'; c.strokeText(w, px, li * CAPCFG.step); c.fillStyle = col; c.fillText(w, px, li * CAPCFG.step); px += ww + sp; } });
  c.restore();
}
function hud(c, t) {
  rr(c, 90, 238, 170, 52, 8); c.fillStyle = HL; c.fill(); txt(c, 'WHAT IF', 175, 265, '800 30px Inter', INK);
  txt(c, 'VIRGINIA LOTTERY · FEB 15, 1992 · TIME, ROANOKE TIMES', 90, 1500, '700 20px JBM', 'rgba(245,243,238,.62)', 'left');
}
function storyteller(c, t) { Storyteller.draw(c, t, { ...ST_CFG, mouth: MOUTH[Math.min(MOUTH.length - 1, Math.floor(t * 30))] || 0 }); }

const GLITCH = [[0, .4, 1, 'd'], [2.1, 2.25, .5], [4.1, 4.25, .4], [8.0, 8.12, .4], [10.52, 10.7, .5], [13.3, 13.45, .5], [15.3, 15.5, .7], [21.32, 21.45, .5], [22.1, 22.25, .7], [26.7, 26.85, .5], [31.95, 32.33, 1, 'r']];
const SHAKE = [[0, .4, 26], [.15, .3, 30], [2.1, .25, 14], [3.32, .15, 10], [3.68, .15, 10], [5.4, .25, 16], [8.0, .25, 14], [10.52, .3, 20], [13.3, .3, 20], [15.3, .35, 26], [18.86, .15, 8], [19.42, .15, 8], [19.8, .15, 8], [20.22, .15, 8], [20.78, .15, 8], [21.32, .2, 14], [22.1, .3, 24], [22.55, .25, 18], [25.4, .25, 16], [26.7, .3, 22], [27.3, .2, 12], [30.25, .3, 18]];
const PZ = [[.15, .07], [5.4, .06], [8.0, .08], [10.52, .12], [13.3, .06], [15.3, .06], [17.08, .08], [18.86, .05], [19.42, .05], [19.8, .05], [20.22, .05], [20.78, .05], [21.32, .08], [22.1, .06], [22.55, .08], [25.3, .22], [26.7, .06]];

window.render = function (t) {
  const sc = SCENES.find(s => t >= s[0] && t < s[1]) || SCENES[SCENES.length - 1];
  O.save(); sc[2](O, t); O.restore(); overlays(O, t); hud(O, t); storyteller(O, t); caption(O, t);
  const g = O.createRadialGradient(540, 900, 450, 540, 900, 1300); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.5)'); O.fillStyle = g; O.fillRect(0, 0, W, H);
  const into = t - sc[0]; let cutz = 0; if (sc[0] > 0 && into < .14) cutz = .09 * (1 - eo(into / .14));
  let sx = 0, sy = 0; for (const [s0, d, amp] of SHAKE) if (t >= s0 && t < s0 + d) { const k = 1 - (t - s0) / d; sx += Math.sin(t * 97) * amp * k; sy += Math.cos(t * 83) * amp * k; }
  let pz = 1 + cutz; for (const [s0, amp] of PZ) { const k = t - s0; if (k >= 0 && k < 1) pz += amp * clamp(k / .067) * (1 - eo(clamp((k - .067) / .4))); }
  if (t >= 18.1 && t < 22.0) pz += .05 * eio(lin(t, 18.1, 22.0));
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
