// Bad Math — IG/FB Reels cut of "Your coffee, invested". Pure function of t. Content kept in y 250-1250.
const ST_CFG = { pos: { x: 850, y: 1330, s: .88 }, timeline: [[0, 'shock'], [2.1, 'point'], [3.5, 'shock'], [4.4, 'chin'], [7.7, 'point'], [8.58, 'shock'], [11.8, 'idle'], [14.4, 'you'], [15.4, 'point']], enterAt: -1 };
function bookmark(c, x, y, s, col, k) { c.save(); c.translate(x, y); c.scale(s * k, s * k); c.shadowColor = 'rgba(0,0,0,.5)'; c.shadowBlur = 24; c.beginPath(); c.moveTo(-90, -150); c.lineTo(90, -150); c.lineTo(90, 150); c.lineTo(0, 80); c.lineTo(-90, 150); c.closePath(); c.fillStyle = col; c.fill(); c.shadowBlur = 0; c.lineWidth = 8; c.strokeStyle = 'rgba(11,15,20,.85)'; c.lineJoin = 'round'; c.stroke(); c.restore(); }
const ZZ = ['$6', '$6', '$', '$400K', '$', '$6', '$', '$400K'];

// ---- 0–2.0 frame 0
function sHook(c, t) {
  c.fillStyle = INK; c.fillRect(0, 0, W, H); rays(c, t);
  slam(c, lin(t, 0, .12), 540, 370, () => hero(c, 'YOUR $6 COFFEE', 0, 0, 120, PAPER, 940));
  slam(c, lin(t, .06, .16), 540, 470, () => hero(c, '=', 0, 0, 70, HL));
  slam(c, lin(t, .1, .22), 540, 610, () => hero(c, 'A $400,000', 0, 0, 190, GREEN, 940, 'Anton', 400, -.02));
  slam(c, lin(t, .14, .26), 540, 835, () => hero(c, 'F*CK UP', 0, 0, 235, RED, 940, 'Anton', 400, .02));
  const s = 1 + .35 * (1 - back(clamp(t / .14)));
  cup(c, t, { x: 540, y: 1080, s: .37 * s, rot: -.07 + Math.sin(t * 2.2) * .03, steam: 1 });
}
// ---- 2.0–4.38 $400,000, cup breaks, F*CK UP stamp
function sBig(c, t) {
  c.fillStyle = INK; c.fillRect(0, 0, W, H); rays(c, t);
  slam(c, lin(t, 2.0, 2.14), 540, 400, () => hero(c, '$400,000', 0, 0, 260, GREEN, 960, 'Anton', 400, -.03));
  const ck = lin(t, 3.4, 3.5), sp = back(lin(t, 3.5, 3.85)) * .6;
  cup(c, t, { x: 540, y: 890, s: .55, rot: -.07 + Math.sin(t * 2.2) * .03 * (1 - sp), crack: ck, split: sp, steam: 1 });
  stamp(c, 'IDIOT TAX', 560, 900, 110, RED, -.2, lin(t, 2.12, 2.22), 'rgba(11,15,20,.6)');
  if (t >= 3.5) { spill(c, t, 3.52); stamp(c, 'F*CK UP', 540, 660, 210, RED, -.07, lin(t, 3.5, 3.6), 'rgba(11,15,20,.92)'); }
}
// ---- 4.38–6.3 $6 a day -> jar
const JX = 560, JYB = 1050;
function sJar(c, t) {
  bg(c, t, 'rgba(0,210,106,.12)'); const lvl = .08 + .55 * lin(t, 4.7, 6.3);
  slam(c, lin(t, 4.38, 4.52), 540, 385, () => hero(c, '$6 A DAY', 0, 0, 230, HL, 940, 'Anton', 400, -.02));
  jar(c, t, JX, JYB, .72, lvl); const sc = .72;
  const enter = eio(lin(t, 4.38, 4.65)), tilt = 1.9 * eio(lin(t, 4.65, 4.95)) * (1 - eio(lin(t, 6.0, 6.25)));
  const cx = lerp(-150, 300, enter), cy = 640; cup(c, t, { x: cx, y: cy, s: .4, rot: tilt, steam: 1 - lin(t, 4.7, 4.85) });
  const mx = cx + 95 * Math.sin(tilt), my = cy - 95 * Math.cos(tilt);
  for (let k = 0; k < 30; k++) { const te = 4.75 + k * .05; const u = (t - te) / .45; if (u < 0 || u > 1) continue; const tx = JX - 60 + hash(k) * 120, ty = JYB - 60 - hash(k + 5) * 120;
    coin(c, lerp(mx, tx, u), lerp(my, ty, u * u) - Math.sin(u * Math.PI) * 60, 17, u * 8 + k, Math.abs(Math.cos(u * 9 + k))); }
}
// ---- 6.3–7.7 assumed 7%
function sAssume(c, t) {
  bg(c, t, 'rgba(255,214,10,.14)'); const k = 1 - back(lin(t, 6.3, 6.6)); c.save(); c.translate(0, k * 500);
  shadowBox(c, 90, 390, 860, 440, 26, '#141b24', HL); c.fillStyle = HL; rr(c, 90, 390, 860, 60, [26, 26, 0, 0]); c.fill();
  txt(c, 'ASSUMED', 130, 421, '800 30px JBM', INK, 'left'); txt(c, 'NOT A GUARANTEE', 910, 421, '800 24px JBM', 'rgba(11,15,20,.65)', 'right');
  const pk = t >= 6.8 ? 1 + .14 * Math.exp(-(t - 6.8) * 8) : 1; c.save(); c.translate(130, 640); c.scale(pk, pk); txt(c, '7%', 0, 0, '400 330px Anton', PAPER, 'left'); c.font = '400 330px Anton'; const w = c.measureText('7%').width; txt(c, '/ YR', w + 20, 100, '400 100px Anton', HL, 'left'); c.restore(); c.restore();
  stamp(c, 'NOT A PROMISE', 540, 900 + k * 500, 76, RED, -.05, lin(t, 7.25, 7.37), 'rgba(11,15,20,.88)');
}
// ---- 7.7–8.58 chart rockets, 8.58–11.8 payoff (MEME #1 boom zoom + cash rain)
function sRise(c, t) { const u = eio(lin(t, 7.7, 8.55)); chart(c, t, 40 * u, {}); }
function sPay(c, t) {
  chart(c, t, 40, { ca: 1 - lin(t, 8.58, 8.8) }); c.fillStyle = `rgba(11,15,20,${.7 * lin(t, 8.58, 8.9)})`; c.fillRect(0, 0, W, H); rain(c, t, 8.58, 90); if (t > 10.2) rain(c, t, 10.2, 40);
  const k = back(lin(t, 8.58, 8.78)); const b = t < 9.6 ? 1 + .05 * Math.sin((t - 8.58) * 26) * Math.exp(-(t - 8.58) * 3) : 1;
  c.save(); c.translate(540, 560); c.scale(k * b, k * b); c.shadowColor = GREEN; c.shadowBlur = 50; hero(c, '$437,201', 0, 0, 170, GREEN, 980, 'JBM', 800); c.restore();
  const k2 = back(lin(t, 10.54, 10.74)); if (k2 > 0) { c.save(); c.translate(540, 790); c.scale(k2, k2); c.rotate(-.03); hero(c, 'IN 40 YRS', 0, 0, 200, PAPER, 940); c.restore(); }
  else hero(c, 'FROM $6 A DAY', 540, 790, 70, HL, 800, 'Anton');
}
// ---- 11.8–14.4 deadpan + 4:00 timer
function sFor(c, t) {
  c.fillStyle = INK; c.fillRect(0, 0, W, H); const g = c.createRadialGradient(540, 700, 40, 540, 700, 800); g.addColorStop(0, 'rgba(245,243,238,.1)'); g.addColorStop(1, 'rgba(245,243,238,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  const ck = back(lin(t, 11.8, 12.0)); c.save(); c.translate(540, 560); c.scale(ck, ck); c.rotate(-.012); shadowBox(c, -440, -250, 880, 500, 10, CREAM);
  const L = [['FOR COFFEE.', 11.82, 12.5, 112, -130], ['THAT YOU DRINK', 12.78, 13.4, 84, 20], ['IN 4 MINUTES.', 13.3, 14.0, 84, 120]];
  for (const [s, a, b, sz, y] of L) { const n = Math.min(s.length, Math.floor(lin(t, a, b) * (s.length + .99))); if (n <= 0) continue; c.font = `400 ${sz}px "Special Elite"`; c.textAlign = 'left'; c.textBaseline = 'middle'; const full = c.measureText(s).width; const sub = s.slice(0, n);
    c.fillStyle = INK; c.fillText(sub, -full / 2, y); if (n < s.length || (s === 'IN 4 MINUTES.' && Math.floor(t * 2.6) % 2 === 0)) { const cw = c.measureText(sub).width; c.fillRect(-full / 2 + cw + 6, y - sz * .5, 10, sz); } }
  c.restore();
  // timer 4:00 -> 0:00 (ticks down fast)
  const u = lin(t, 12.9, 14.35), sec = Math.max(0, Math.round(240 * (1 - u))); const mm = Math.floor(sec / 60), ss = sec % 60, str = mm + ':' + String(ss).padStart(2, '0');
  const tk = back(lin(t, 12.75, 12.95)), low = sec < 60 && u > 0; const flick = low && Math.floor(t * 8) % 2 === 0;
  c.save(); c.translate(540, 940); c.scale(tk, tk); shadowBox(c, -300, -90, 600, 180, 30, '#101923', low ? RED : 'rgba(245,243,238,.3)');
  c.save(); c.shadowColor = low ? RED : GREEN; c.shadowBlur = 30; txt(c, str, 0, 4, '800 130px JBM', flick ? PAPER : (low ? RED : GREEN)); c.restore(); txt(c, 'TO DRINK IT', 0, -66, '800 22px JBM', 'rgba(245,243,238,.6)'); c.restore();
}
// ---- 14.4–15.4 SAVE (bookmark) ; 15.4–18.0 SEND (paper plane)
function sSave(c, t) {
  bg(c, t, 'rgba(255,214,10,.14)'); const k = back(lin(t, 14.48, 14.72)); const wob = Math.sin((t - 14.48) * 14) * .08 * Math.exp(-(t - 14.48) * 3);
  c.save(); c.translate(540, 590); c.rotate(wob); bookmark(c, 0, 0, 1.6, HL, k); const fl = lin(t, 14.74, 14.95); if (fl > 0) { c.fillStyle = INK; c.globalAlpha = fl; c.beginPath(); c.moveTo(0, -60); c.lineTo(15, -20); c.lineTo(58, -14); c.lineTo(26, 18); c.lineTo(34, 62); c.lineTo(0, 40); c.lineTo(-34, 62); c.lineTo(-26, 18); c.lineTo(-58, -14); c.lineTo(-15, -20); c.closePath(); c.fill(); } c.restore();
  slam(c, lin(t, 14.5, 14.66), 540, 940, () => hero(c, 'SAVE THIS', 0, 0, 190, HL, 940, 'Anton', 400, -.02));
}
function sSend(c, t) {
  bg(c, t, 'rgba(0,210,106,.10)'); const h1 = lin(t, 15.4, 15.55);
  slam(c, h1, 540, 340, () => hero(c, 'SAVE THIS ·', 0, 0, 120, HL, 940)); slam(c, lin(t, 15.5, 15.66), 540, 470, () => hero(c, 'SEND TO YOUR', 0, 0, 120, PAPER, 940)); slam(c, lin(t, 15.9, 16.06), 540, 610, () => hero(c, 'LATTE FRIEND', 0, 0, 150, GREEN, 940));
  bookmark(c, 190, 850, 1.0, HL, 1);
  const hk = bounce(lin(t, 16.08, 16.55)); c.save(); c.translate(480, lerp(1500, 830, hk)); c.scale(.48, .48); latteHand(c, t, 0, 0); c.restore();
  const k = back(lin(t, 16.5, 16.75)); if (k > 0) { c.save(); c.translate(760, 740); c.rotate(.05); c.scale(k, k); shadowBox(c, -190, -50, 380, 100, 50, GREEN); hero(c, 'SENT ✓', 0, 3, 56, INK, 330, 'Anton'); c.restore(); }
}
const SCENES = [[0, 2.0, sHook], [2.0, 4.38, sBig], [4.38, 6.3, sJar], [6.3, 7.7, sAssume], [7.7, 8.58, sRise], [8.58, 10.54, sPay], [10.54, 11.8, sPay], [11.8, 14.4, sFor], [14.4, 15.4, sSave], [15.4, 18.0, sSend]];
function overlays(c, t) {
  if (t >= 15.48 && t < 16.5) { const u = eo(lin(t, 15.48, 16.4)); const P = (a, b, cc) => (1 - u) * (1 - u) * a + 2 * u * (1 - u) * b + u * u * cc;
    const px = P(840, 800, 760), py = P(1050, 700, 740), tx = 2 * (1 - u) * (800 - 840) + 2 * u * (760 - 800), ty = 2 * (1 - u) * (700 - 1050) + 2 * u * (740 - 700);
    c.save(); c.globalAlpha = 1 - lin(t, 16.3, 16.5); c.strokeStyle = 'rgba(245,243,238,.5)'; c.lineWidth = 4; c.setLineDash([12, 14]); c.beginPath(); for (let k = 0; k <= u; k += .04) { const x = (1 - k) * (1 - k) * 840 + 2 * k * (1 - k) * 800 + k * k * 760, y = (1 - k) * (1 - k) * 1050 + 2 * k * (1 - k) * 700 + k * k * 740; k ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke(); c.setLineDash([]);
    plane(c, px, py, Math.atan2(ty, tx), .6 * (1 - .3 * u)); c.restore(); }
}
const CAPCFG = { x: 430, y: 1125, w: 680, size: 74 };
function caption(c, t) {
  let it = null; for (const cp of CAPS) if (t >= cp[0] && t < cp[1]) it = cp; if (!it) return;
  const k = eo(lin(t, it[0], it[0] + .1)); const parts = it[2].map(([w, col]) => [w, col === 'g' ? GREEN : col === 'r' ? RED : col === 'y' ? HL : PAPER]);
  c.save(); c.font = `800 ${CAPCFG.size}px Inter`; const sp = c.measureText(' ').width; const lines = [[]]; let lw = 0;
  for (const p of parts) { const w = c.measureText(p[0]).width; if (lw + w > CAPCFG.w && lines[lines.length - 1].length) { lines.push([]); lw = 0; } lines[lines.length - 1].push([...p, w]); lw += w + sp; }
  c.translate(CAPCFG.x, CAPCFG.y - (lines.length - 1) * 42); c.scale(.82 + .18 * k, .82 + .18 * k); c.globalAlpha = k;
  lines.forEach((ln, li) => { const tw = ln.reduce((a, p) => a + p[2], 0) + sp * (ln.length - 1); let px = -tw / 2;
    for (const [w, col, ww] of ln) { c.textAlign = 'left'; c.textBaseline = 'middle'; c.lineWidth = 14; c.strokeStyle = 'rgba(0,0,0,.9)'; c.lineJoin = 'round'; c.strokeText(w, px, li * 84); c.fillStyle = col; c.fillText(w, px, li * 84); px += ww + sp; } });
  c.restore();
}
function hud(c, t) {
  c.save(); txt(c, 'BAD', 90, 266, '400 44px Anton', PAPER, 'left'); c.font = '400 44px Anton'; txt(c, 'MATH', 90 + c.measureText('BAD ').width, 266, '400 44px Anton', RED, 'left');
  txt(c, 'ASSUMES 7%/YR · NOT ADVICE', 90, 1232, '700 22px JBM', 'rgba(245,243,238,.7)', 'left'); c.restore();
}
function storyteller(c, t) { Storyteller.draw(c, t, { ...ST_CFG, mouth: MOUTH[Math.min(MOUTH.length - 1, Math.floor(t * 30))] || 0 }); }
const GLITCH = [[0, .4, 1, 'd'], [2.0, 2.2, .8], [3.5, 3.75, .9], [6.3, 6.4, .3], [8.58, 8.85, .9], [10.54, 10.68, .4], [11.8, 11.95, .4], [14.48, 14.6, .5], [15.48, 15.6, .4], [17.7, 18.0, 1, 'r']];
const SHAKE = [[0, .45, 30], [2.0, .3, 22], [3.5, .5, 34], [4.38, .2, 12], [6.8, .25, 14], [8.58, .55, 36], [10.54, .3, 22], [11.8, .2, 12], [14.48, .3, 16]];
const PZ = [[0, .06], [2.0, .07], [3.5, .09], [6.8, .05], [8.58, .26], [10.54, .08], [14.48, .06]];
window.render = function (t) {
  const sc = SCENES.find(s => t >= s[0] && t < s[1]) || SCENES[SCENES.length - 1];
  O.save(); sc[2](O, t); O.restore(); overlays(O, t); hud(O, t); storyteller(O, t); caption(O, t);
  const g = O.createRadialGradient(540, 900, 450, 540, 900, 1300); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.5)'); O.fillStyle = g; O.fillRect(0, 0, W, H);
  let wx = 0; const into = t - sc[0]; if (sc[0] > 0 && into < .12) wx = (1 - eo(into / .12)) * 150;
  let sx = 0, sy = 0; for (const [s0, d, amp] of SHAKE) if (t >= s0 && t < s0 + d) { const k = 1 - (t - s0) / d; sx += Math.sin(t * 97) * amp * k; sy += Math.cos(t * 83) * amp * k; }
  let pz = 1; for (const [s0, amp] of PZ) { const k = t - s0; if (k >= 0 && k < 1) pz += amp * clamp(k / .067) * (1 - eo(clamp((k - .067) / .4))); }
  X.fillStyle = INK; X.fillRect(0, 0, W, H); X.save(); X.translate(540 + sx + wx, 960 + sy); X.scale(pz, pz); X.translate(-540, -960); X.drawImage(OFF, 0, 0); X.restore();
  for (const [g0, g1, amt, mode] of GLITCH) if (t >= g0 && t < g1) {
    const u = lin(t, g0, g1), k = mode === 'd' ? amt * (1 - u * .8) : mode === 'r' ? amt * u : amt * Math.sin(u * Math.PI), f = Math.floor(t * 30);
    X.save(); X.globalCompositeOperation = 'screen'; X.globalAlpha = .55 * k;
    for (const [col, dx] of [['#ff0000', 26], ['#00ffff', -26]]) { T.clearRect(0, 0, W, H); T.drawImage(OFF, 0, 0); T.globalCompositeOperation = 'multiply'; T.fillStyle = col; T.fillRect(0, 0, W, H); T.globalCompositeOperation = 'source-over'; X.drawImage(TMP, dx * k, 0); }
    X.restore(); for (let i = 0; i < 10; i++) { const y = hash(f * 13 + i) * H, h = 20 + hash(f * 7 + i) * 130, dx = (hash(f * 3 + i) - .5) * 280 * k; X.drawImage(OFF, 0, y, W, h, dx, y, W, h); }
  }
};
window.DUR = DUR;
const FONTS = [['Anton', 'node_modules/@fontsource/anton/files/anton-latin-400-normal.woff2', '400'], ['Inter', 'node_modules/@fontsource/inter/files/inter-latin-800-normal.woff2', '800'],
  ['JBM', 'node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-800-normal.woff2', '800'], ['JBM', 'node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff2', '700'],
  ['Special Elite', 'node_modules/@fontsource/special-elite/files/special-elite-latin-400-normal.woff2', '400']];
window.ready = Promise.all(FONTS.map(([f, u, w]) => new FontFace(f, `url(${u})`, { weight: w }).load().then(ff => document.fonts.add(ff)))).then(() => { window.render(0); return true; });
