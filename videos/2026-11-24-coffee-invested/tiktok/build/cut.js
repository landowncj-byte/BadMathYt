// Bad Math — TikTok cut of "Your coffee, invested". Every frame is a pure function of t.
const ST_CFG = { timeline: [[0, 'you'], [3.2, 'point'], [7.7, 'chin'], [11.4, 'point'], [14.22, 'shock'], [17.86, 'point'], [19.98, 'shrug'], [21.5, 'point'], [24.06, 'follow'], [26.0, 'you']],
  bubbles: [[21.5, 24.0, 'WHAT DOES YOUR COFFEE', 'COST? COMMENT', [690, 1085]]], follow: [24.08, 26.05], enterAt: -1 };
const hero = (c, s, x, y, size, col, maxW = 940, fam = 'Anton', wt = 400, rot = 0) => { c.save(); c.font = `${wt} ${size}px ${fam}`; const w = c.measureText(s).width; if (w > maxW) size *= maxW / w; c.translate(x, y); c.rotate(rot);
  c.font = `${wt} ${size}px ${fam}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineJoin = 'round'; c.lineWidth = size * .09; c.strokeStyle = 'rgba(0,0,0,.85)'; c.strokeText(s, 0, 0); c.fillStyle = col; c.fillText(s, 0, 0); c.restore(); };
const slam = (c, k, x, y, f) => { const s = lerp(1.12, 1, eo(k)); c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(k * 4 + .35); f(); c.restore(); };
function rays(c, t, col = '255,59,48') { const g = c.createRadialGradient(540, 860, 40, 540, 860, 950); g.addColorStop(0, `rgba(${col},.42)`); g.addColorStop(1, `rgba(${col},0)`); c.fillStyle = g; c.fillRect(0, 0, W, H);
  c.save(); c.translate(540, 880); c.globalAlpha = .1; c.fillStyle = `rgb(${col})`; for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + t * .25; c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, 1500, a, a + .15); c.closePath(); c.fill(); } c.restore(); }
function rain(c, t, t0, n = 80) { for (let i = 0; i < n; i++) { const ts = t0 + hash(i) * 1.5, d = t - ts; if (d < 0) continue; const y = -60 + d * (700 + hash(i + 3) * 500); if (y > 2000) continue; const x = hash(i + 1) * 1100 - 10 + Math.sin(d * 3 + i) * 40;
  if (i % 5 === 0) coin(c, x, y, 20, d * 6, Math.abs(Math.cos(d * 8 + i))); else bill(c, x, y, Math.sin(d * 2.5 + i) * .9, .9, Math.abs(Math.cos(d * 5 + i)) * .85 + .15); } }

// ---- 0–3.18 hook: cup slam + "$400,000 COFFEE?" (frame 0 shows the whole thing)
function sHook(c, t) {
  c.fillStyle = INK; c.fillRect(0, 0, W, H); rays(c, t);
  const cut2 = t >= 1.96;
  slam(c, lin(t, 0, .14), 540, 405, () => hero(c, '$400,000', 0, 0, 250, GREEN, 940, 'Anton', 400, -.02));
  slam(c, lin(t, .06, .2), 540, 620, () => hero(c, 'COFFEE?', 0, 0, 260, PAPER, 940, 'Anton', 400, .015));
  const s = 1 + .25 * (1 - back(clamp(t / .14))); const wob = Math.sin(t * 2.2) * .03;
  const ck = lin(t, 2.0, 2.1), sp = back(lin(t, 2.08, 2.4)) * .6;
  cup(c, t, { x: 500, y: 1010, s: .92 * s, rot: -.07 + wob * (1 - sp), crack: cut2 ? ck : 0, split: cut2 ? sp : 0, steam: 1 });
  if (!cut2) { c.save(); stamp(c, 'IDIOT TAX', 560, 1030, 150, RED, -.2, lin(t, 1.16, 1.26), 'rgba(11,15,20,.6)'); c.restore(); }
  else spill(c, t, 2.02);
}
// ---- 3.18–4.7 the math (calculator)
function sMath(c, t) {
  bg(c, t); const u = t - 3.18;
  slam(c, lin(t, 3.18, 3.34), 540, 370, () => hero(c, "LET'S DO", 0, 0, 130, PAPER));
  slam(c, lin(t, 3.5, 3.66), 540, 610, () => hero(c, 'THE MATH', 0, 0, 230, HL, 940, 'Anton', 400, -.03));
  const k = back(lin(t, 3.3, 3.6)); c.save(); c.translate(540, 880); c.scale(k, k); shadowBox(c, -330, -140, 660, 420, 30, '#141b24', 'rgba(245,243,238,.3)');
  rr(c, -300, -112, 600, 120, 14); c.fillStyle = '#05080b'; c.fill(); const s = '6 × 365 = ?'.slice(0, Math.floor(lin(t, 3.9, 4.5) * 12)); txt(c, s, 280, -50, '800 64px JBM', GREEN, 'right');
  for (let r = 0; r < 3; r++) for (let q = 0; q < 4; q++) { const pr = (Math.floor(t * 9) % 12 === r * 4 + q); rr(c, -300 + q * 152, 30 + r * 78, 136, 64, 12); c.fillStyle = pr ? HL : (q === 3 ? RED : '#2a323d'); c.fill(); }
  c.restore();
}
// ---- 4.7–6.0 $6 a day tag
function sTag(c, t) {
  bg(c, t); const swing = Math.sin((t - 4.8) * 7) * .13 * Math.exp(-Math.max(0, t - 4.8) * 1.4);
  tag(c, 540, 760, back(lin(t, 4.7, 5.0)), swing);
  slam(c, lin(t, 5.1, 5.25), 540, 1100, () => hero(c, 'EVERY. SINGLE. DAY.', 0, 0, 96, PAPER));
  if (t < 5.6) spill(c, t, 4.7);
}
// ---- 6.0–7.7 calendar
function sCal(c, t) {
  bg(c, t); const ck = eio(lin(t, 6.0, 6.25)); c.save(); c.translate((1 - ck) * 1100, 0);
  shadowBox(c, 90, 392, 850, 700, 26, '#101923', 'rgba(245,243,238,.25)'); c.fillStyle = RED; rr(c, 90, 392, 850, 74, [26, 26, 0, 0]); c.fill();
  txt(c, '× 365 DAYS', 920, 430, '800 36px JBM', PAPER, 'right'); txt(c, 'A YEAR OF COFFEE', 300, 430, '800 28px JBM', 'rgba(245,243,238,.9)');
  const n = Math.floor(365 * lin(t, 6.1, 6.9) + .0001); const flash = lin(t, 6.92, 7.2);
  for (let i = 0; i < 365; i++) { const col = i % 24, row = Math.floor(i / 24), cx = 129 + col * 33, cy = 504 + row * 36; const pk = i < n ? back(lin(t, 6.1 + i / 365 * .8, 6.1 + i / 365 * .8 + .1)) : 0;
    c.fillStyle = 'rgba(245,243,238,.07)'; rr(c, cx - 13, cy - 13, 26, 26, 6); c.fill();
    if (pk > 0) { const gr = clamp(flash * 2 - (i / 365)); c.fillStyle = gr > 0 ? GREEN : COFFEE; c.save(); c.translate(cx, cy); c.scale(pk, pk); rr(c, -13, -13, 26, 26, 6); c.fill(); c.restore(); } }
  c.restore(); const val = 6 * n; const kk = t >= 6.92 ? 1 + .16 * Math.exp(-(t - 6.92) * 9) : 1; c.save(); c.translate(90, 1175); c.scale(kk, kk); c.shadowColor = GREEN; c.shadowBlur = t >= 6.92 ? 30 : 0; txt(c, '$' + fmt(val), 0, 0, '800 100px JBM', GREEN, 'left'); c.restore();
  stamp(c, '$2,190 / YEAR', 540, 780, 100, GREEN, -.06, lin(t, 6.58, 6.7), 'rgba(11,15,20,.9)');
}
// ---- 7.7–9.3 invest: cup pours into the jar
const JX = 560, JYB = 960;
function sPour(c, t) {
  bg(c, t, 'rgba(0,210,106,.12)'); const lvl = .1 + .5 * lin(t, 8.0, 9.3);
  jar(c, t, JX, JYB, 1, lvl); hero(c, 'INVEST IT', 540, 400, 160, GREEN, 940, 'Anton', 400, -.02);
  const enter = eio(lin(t, 7.7, 7.95)), tilt = 1.9 * eio(lin(t, 7.95, 8.2)); const cx = lerp(-200, 330, enter), cy = 560;
  cup(c, t, { x: cx, y: cy, s: .42, rot: tilt, steam: 1 - lin(t, 8.0, 8.15) });
  const mx = cx + 100 * Math.sin(tilt), my = cy - 100 * Math.cos(tilt);
  for (let k = 0; k < 30; k++) { const te = 8.0 + k * .045; const u = (t - te) / .45; if (u < 0 || u > 1) continue; const tx = JX - 70 + hash(k) * 140, ty = JYB - 60 - hash(k + 5) * 160;
    const x = lerp(mx, tx, u), y = lerp(my, ty, u * u) - Math.sin(u * Math.PI) * 60; coin(c, x, y, 17, u * 8 + k, Math.abs(Math.cos(u * 9 + k))); }
}
// ---- 9.3–11.4 assumption card, 7%
function sAssume(c, t) {
  bg(c, t, 'rgba(255,214,10,.14)'); jar(c, t, 480, 1230, .62, .6 + .1 * lin(t, 9.3, 11.4), false);
  if (t > 9.68) for (let i = 0; i < 4; i++) { const u = ((t - 9.68) * .6 + i * .25) % 1; c.save(); c.globalAlpha = Math.sin(u * Math.PI) * .9; txt(c, '+', 380 + i * 70 + Math.sin(u * 7 + i) * 14, 930 - u * 110, '800 54px JBM', GREEN); c.restore(); }
  const k = 1 - back(lin(t, 9.3, 9.62)); c.save(); c.translate(0, k * 500); shadowBox(c, 90, 400, 860, 380, 26, '#141b24', HL); c.fillStyle = HL; rr(c, 90, 400, 860, 60, [26, 26, 0, 0]); c.fill();
  txt(c, 'ASSUMPTION', 130, 431, '800 30px JBM', INK, 'left'); txt(c, 'NOT A GUARANTEE', 910, 431, '800 24px JBM', 'rgba(11,15,20,.65)', 'right');
  const pk = t >= 9.68 ? 1 + .14 * Math.exp(-(t - 9.68) * 8) : 1; c.save(); c.translate(130, 600); c.scale(pk, pk); c.textAlign = 'left'; txt(c, '7%', 0, 0, '400 270px Anton', PAPER, 'left'); txt(c, '/ YEAR', 400, 70, '400 90px Anton', HL, 'left'); c.restore();
  if (t >= 10.3) c.fillStyle = RED, c.fillRect(130, 730, 700 * eo(lin(t, 10.3, 10.9)), 8); c.restore();
  stamp(c, 'NOT A PROMISE', 540, 760 + k * 500, 90, RED, -.05, lin(t, 10.9, 11.02), 'rgba(11,15,20,.88)');
}
// ---- chart (11.4–14.22) + payoff (14.22–16.5) + "put in" tease (16.5–17.86)
const YK = [[11.45, 0], [11.92, 10], [13.1, 10], [14.22, 40]];
function Yat(t) { if (t <= YK[0][0]) return 0; for (let i = 1; i < YK.length; i++) if (t < YK[i][0]) { const [t0, y0] = YK[i - 1], [t1, y1] = YK[i]; const u = lin(t, t0, t1); return y0 + (y1 - y0) * ((y1 - y0) >= 6 ? eio(u) : u); } return 40; }
const CX0 = 110, CX1 = 930, CY0 = 990, CYT = 660;
function chart(c, t, Y, o = {}) {
  const V = FV(Y); bg(c, t, 'rgba(0,210,106,.12)');
  const xmax = Math.max(10, Y * 1.08), ymax = Math.max(7000, V * 1.32); const X_ = yr => CX0 + (CX1 - CX0) * yr / xmax, Yp = v => CY0 - (CY0 - CYT) * v / ymax;
  const ca = o.ca ?? 1; c.save(); c.globalAlpha = ca; txt(c, 'YEARS', 90, 376, '800 30px JBM', 'rgba(245,243,238,.7)', 'left');
  let ky = 1; if (o.pulse) ky = 1 + .22 * Math.exp(-(t - o.pulse) * 9); c.save(); c.translate(90, 465); c.scale(ky, ky); txt(c, String(Math.round(Y)), 0, 0, '400 140px Anton', PAPER, 'left'); c.restore();
  c.save(); c.translate(90, 585); c.scale(ky, ky); c.shadowColor = GREEN; c.shadowBlur = 24; txt(c, '$' + fmt(V), 0, 0, '800 96px JBM', GREEN, 'left'); c.restore(); c.restore();
  c.save(); c.globalAlpha = ca; jar(c, t, 800, 640, .52, clamp(V / 437201), false); c.restore();
  c.save(); c.beginPath(); c.rect(CX0 - 14, CYT - 40, CX1 - CX0 + 28, CY0 - CYT + 90); c.clip();
  c.strokeStyle = 'rgba(245,243,238,.09)'; c.lineWidth = 2; for (let i = 1; i <= 4; i++) { const gy = CY0 - (CY0 - CYT) * i / 4; c.beginPath(); c.moveTo(CX0, gy); c.lineTo(CX1, gy); c.stroke(); }
  c.strokeStyle = 'rgba(245,243,238,.55)'; c.lineWidth = 4; c.beginPath(); c.moveTo(CX0, CYT - 20); c.lineTo(CX0, CY0); c.lineTo(CX1, CY0); c.stroke();
  for (let k = 0; k <= 40; k += 10) { const px = X_(k); if (px > CX1 + 4) continue; txt(c, k ? k + 'Y' : '0', px, CY0 + 24, '700 22px JBM', 'rgba(245,243,238,.6)'); }
  const end = Math.min(Y, 40), cEnd = o.cEnd ?? end;
  c.save(); if (o.hl) { c.shadowColor = HL; c.shadowBlur = 20; } c.setLineDash([12, 12]); c.strokeStyle = o.hl ? HL : 'rgba(245,243,238,.55)'; c.lineWidth = o.hl ? 8 : 4; c.beginPath(); for (let q = 0; q <= cEnd + .01; q += .5) c.lineTo(X_(q), Yp(2190 * q)); c.stroke(); c.restore();
  const pts = []; for (let q = 0; q <= end + .001; q += .2) pts.push([X_(q), Yp(FV(q))]); pts.push([X_(end), Yp(FV(end))]);
  const fg = c.createLinearGradient(0, CYT, 0, CY0); fg.addColorStop(0, 'rgba(0,210,106,.35)'); fg.addColorStop(1, 'rgba(0,210,106,0)'); c.beginPath(); c.moveTo(pts[0][0], CY0); for (const p of pts) c.lineTo(p[0], p[1]); c.lineTo(pts[pts.length - 1][0], CY0); c.closePath(); c.fillStyle = fg; c.fill();
  c.save(); c.shadowColor = GREEN; c.shadowBlur = 18; c.strokeStyle = GREEN; c.lineWidth = 11; c.lineJoin = 'round'; c.lineCap = 'round'; c.beginPath(); pts.forEach((p, i) => i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.stroke(); c.restore();
  const ep = pts[pts.length - 1]; c.fillStyle = PAPER; c.beginPath(); c.arc(ep[0], ep[1], 14 + 3 * Math.sin(t * 8), 0, 7); c.fill(); c.restore();
  if (o.chip && t >= o.chip) { const px = X_(10), py = Yp(FV(10)); const k = back(lin(t, o.chip, o.chip + .2)); c.fillStyle = HL; c.beginPath(); c.arc(px, py, 13 * (1 + .28 * Math.exp(-(t - o.chip) * 8)), 0, 7); c.fill();
    const a = '10 YRS', b = '$30,258'; c.font = '800 36px JBM'; const wa = c.measureText(a).width, wb = c.measureText(b).width, w = wa + wb + 128; c.save(); c.translate(clamp(px + 40, 90 + w / 2, 930 - w / 2), Math.min(py - 80, CY0 - 40)); c.scale(k, k);
    shadowBox(c, -w / 2, -34, w, 68, 16, '#101923', HL); txt(c, a, -w / 2 + 22, 2, '800 36px JBM', PAPER, 'left'); arrowR(c, -w / 2 + 22 + wa + 14, 2, 52, HL, 6); txt(c, b, w / 2 - 20, 2, '800 36px JBM', GREEN, 'right'); c.restore(); }
  return { X_, Yp, ep };
}
function sChart(c, t) { const Y = Yat(t); chart(c, t, Y, { chip: 11.92, pulse: t >= 11.92 && t < 13.0 ? 11.92 : (t >= 13.1 ? 13.1 : 0) }); if (t >= 13.1 && t < 14.22) hero(c, '30 MORE YEARS', 540, 1090, 70, HL, 760, 'Anton'); }
function sBoom(c, t) {
  chart(c, t, 40, { ca: 1 - lin(t, 14.22, 14.4) }); c.fillStyle = `rgba(11,15,20,${.55 * lin(t, 14.22, 14.5)})`; c.fillRect(0, 0, W, H); rain(c, t, 14.22);
  const k = back(lin(t, 14.22, 14.42)); const b = t < 15.2 ? 1 + .05 * Math.sin((t - 14.22) * 26) * Math.exp(-(t - 14.22) * 3) : 1; c.save(); c.translate(540, 800); c.scale(k * b, k * b);
  c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 40; rr(c, -430, -210, 860, 420, 34); c.fillStyle = 'rgba(11,15,20,.94)'; c.fill(); c.shadowBlur = 0; c.strokeStyle = GREEN; c.lineWidth = 8; c.stroke();
  c.font = '400 120px Anton'; const wa = c.measureText('40 YRS').width; txt(c, '40 YRS', -wa / 2 - 60, -110, '400 120px Anton', PAPER); arrowR(c, wa / 2 - 30, -110, 110, HL, 14);
  c.save(); c.shadowColor = GREEN; c.shadowBlur = 40; txt(c, '$437,201', 0, 30, '800 140px JBM', GREEN); c.restore(); txt(c, 'FROM $6 A DAY', 0, 140, '800 38px JBM', 'rgba(245,243,238,.85)'); c.restore();
}
function sTease(c, t) { const u = lin(t, 16.56, 17.8); chart(c, t, 40, { ca: 1, cEnd: 40 * u, hl: true }); hero(c, 'BUT WHAT DID YOU', 540, 1100, 74, PAPER, 900); hero(c, 'ACTUALLY PUT IN?', 540, 1190, 74, HL, 900);
  const k = back(lin(t, 16.6, 16.8)); c.save(); c.translate(720, 850); c.scale(k, k); c.rotate(-.05); txt(c, '?', 0, 0, '400 280px Anton', 'rgba(255,214,10,.9)'); c.restore(); }
// ---- 17.86–19.98 side by side
function sVsBars(c, t) {
  bg(c, t, 'rgba(255,59,48,.08)'); const k1 = back(lin(t, 17.86, 18.08)), k2 = back(lin(t, 18.0, 18.22)), cnt = eo(lin(t, 17.9, 18.5));
  c.save(); c.translate(300, 0); c.scale(k1, k1); c.translate(-300, 0); shadowBox(c, 70, 420, 440, 660, 26, '#141b24', 'rgba(245,243,238,.4)'); txt(c, 'YOU PUT IN', 290, 478, '800 34px JBM', 'rgba(245,243,238,.85)');
  txt(c, '$' + fmt(87600 * cnt), 290, 560, '800 66px JBM', PAPER); c.fillStyle = '#9aa3ad'; rr(c, 180, 1030 - 90 * eo(lin(t, 18.1, 18.7)), 220, 90 * eo(lin(t, 18.1, 18.7)), 8); c.fill(); c.restore();
  c.save(); c.translate(790, 0); c.scale(k2, k2); c.translate(-790, 0); shadowBox(c, 570, 420, 440, 660, 26, '#0e2a1c', GREEN); txt(c, "YOU'D HAVE", 790, 478, '800 34px JBM', GREEN);
  c.save(); c.shadowColor = GREEN; c.shadowBlur = 24; txt(c, '$' + fmt(437201 * eo(lin(t, 18.0, 18.7))), 790, 560, '800 66px JBM', GREEN); c.restore(); c.fillStyle = GREEN; const bh = 470 * eo(lin(t, 18.1, 18.9)); rr(c, 680, 1030 - bh, 220, bh, 8); c.fill(); c.restore();
  stamp(c, 'VS', 540, 740, 110, RED, -.1, lin(t, 18.2, 18.3), 'rgba(11,15,20,.85)');
  if (t >= 18.9) { const k = back(lin(t, 18.9, 19.1)); c.save(); c.translate(540, 1130); c.scale(k, k); hero(c, '5× THE MONEY', 0, 0, 84, HL, 700, 'Anton', 400, -.02); c.restore(); }
}
// ---- 19.98–24.06 worth it or not
function btn(c, x, y, w, h, label, col, k, pulse) { c.save(); c.translate(x, y); c.scale(k * (1 + pulse), k * (1 + pulse)); shadowBox(c, -w / 2, -h / 2, w, h, h / 2.6, col); c.lineWidth = 6; c.strokeStyle = 'rgba(255,255,255,.35)'; rr(c, -w / 2 + 8, -h / 2 + 8, w - 16, h - 16, h / 2.6); c.stroke(); hero(c, label, 0, 4, h * .52, PAPER, w - 70); c.restore(); }
function sWorth(c, t) {
  bg(c, t, 'rgba(255,214,10,.12)'); const big = t < 21.5; const ph = Math.floor((t - 19.98) / .35) % 2;
  const m = eio(lin(t, 21.5, 21.8)); const y1 = lerp(560, 400, m), y2 = lerp(860, 400, m);
  const bw = lerp(860, 440, m), bh = lerp(250, 130, m); const x1 = lerp(540, 300, m), x2 = lerp(540, 790, m);
  const pulse = (Math.max(0, 1 - ((t - 19.98) % .35) / .35)) * .04;
  btn(c, x1, y1, bw, bh, 'WORTH IT', '#0c8a4a', back(lin(t, 19.98, 20.2)), ph === 0 ? pulse : 0); btn(c, x2, y2, bw, bh, 'NOT WORTH IT', '#c4281f', back(lin(t, 20.15, 20.35)), ph === 1 ? pulse : 0);
  if (t < 21.5) hero(c, 'YOU DECIDE', 540, 1120, 96, HL, 800, 'Anton', 400, -.02);
  else { const hk = bounce(lin(t, 21.5, 22.0)); c.save(); c.translate(300, lerp(1500, 820, hk)); c.scale(.8, .8); latteHand(c, t, 0, 0); c.restore();
    const px = 640; for (let i = 0; i < 3; i++) { const u = ((t - 21.9) * .7 + i * .33) % 1; if (t > 21.9) { c.save(); c.globalAlpha = Math.sin(u * Math.PI); hero(c, ['$4', '$7', '$12'][i], px + 60 + (i - 1) * 170 + Math.sin(u * 5 + i) * 10, 790 - u * 100 + (i % 2) * 120, 110, [GREEN, HL, PAPER][i], 300, 'JBM', 800); c.restore(); } }
  }
}
// ---- 24.06–26.46 follow + loop into frame 0
function sOutro(c, t) {
  c.fillStyle = INK; c.fillRect(0, 0, W, H); rays(c, t, '255,214,10');
  slam(c, lin(t, 24.06, 24.22), 540, 400, () => hero(c, 'MORE', 0, 0, 170, PAPER)); slam(c, lin(t, 24.5, 24.66), 540, 590, () => hero(c, 'MONEY MATH', 0, 0, 190, HL, 940, 'Anton', 400, -.02));
  cup(c, t, { x: 460, y: 960, s: .62 + .02 * Math.sin(t * 3), rot: -.07 + Math.sin(t * 2.2) * .03, steam: 1 });
  stamp(c, 'IDIOT TAX', 520, 980, 110, RED, -.2, lin(t, 25.0, 25.1), 'rgba(11,15,20,.6)');
}
const SCENES = [[0, 3.18, sHook], [3.18, 4.7, sMath], [4.7, 6.0, sTag], [6.0, 7.7, sCal], [7.7, 9.3, sPour], [9.3, 11.42, sAssume], [11.42, 13.1, sChart], [13.1, 14.22, sChart], [14.22, 16.56, sBoom], [16.56, 17.86, sTease], [17.86, 19.98, sVsBars], [19.98, 21.5, sWorth], [21.5, 24.06, sWorth], [24.06, 26.46, sOutro]];

function overlays(c, t) {
  if (t >= 14.3 && t < 16.5) { const ph = ((t - 14.5) * 2.4) % 1; const out = 1 - eo(lin(t, 16.3, 16.5)); c.save(); c.globalAlpha = out; heart(c, 790, 1120, 1.05 * (1 + .3 * Math.exp(-ph * 6)), RED); c.restore(); }
}
function caption(c, t) {
  let it = null; for (const cp of CAPS) if (t >= cp[0] && t < cp[1]) it = cp; if (!it) return;
  const k = eo(lin(t, it[0], it[0] + .1)); const parts = it[2].map(([w, col]) => [w, col === 'g' ? GREEN : col === 'r' ? RED : col === 'y' ? HL : PAPER]);
  c.save(); c.font = '800 68px Inter'; const sp = c.measureText(' ').width; const lines = [[]]; let lw = 0;
  for (const p of parts) { const w = c.measureText(p[0]).width; if (lw + w > 600 && lines[lines.length - 1].length) { lines.push([]); lw = 0; } lines[lines.length - 1].push([...p, w]); lw += w + sp; }
  c.translate(420, 1345 - (lines.length - 1) * 38); c.scale(.82 + .18 * k, .82 + .18 * k); c.globalAlpha = k;
  lines.forEach((ln, li) => { const tw = ln.reduce((a, p) => a + p[2], 0) + sp * (ln.length - 1); let px = -tw / 2;
    for (const [w, col, ww] of ln) { c.textAlign = 'left'; c.textBaseline = 'middle'; c.lineWidth = 14; c.strokeStyle = 'rgba(0,0,0,.88)'; c.lineJoin = 'round'; c.strokeText(w, px, li * 76); c.fillStyle = col; c.fillText(w, px, li * 76); px += ww + sp; } });
  c.restore();
}
function hud(c, t) {
  rr(c, 90, 238, 170, 52, 8); c.fillStyle = HL; c.fill(); txt(c, 'WHAT IF', 175, 265, '800 30px Inter', INK);
  txt(c, 'YOUR COFFEE, INVESTED', 280, 265, '700 26px JBM', 'rgba(245,243,238,.9)', 'left');
  c.fillStyle = 'rgba(245,243,238,.15)'; c.fillRect(90, 306, 900, 6); c.fillStyle = HL; c.fillRect(90, 306, 900 * t / DUR, 6);
  txt(c, 'ASSUMES 7%/YR · NOT INFLATION-ADJUSTED · NOT ADVICE', 90, 1498, '700 19px JBM', 'rgba(245,243,238,.75)', 'left');
}
function storyteller(c, t) { Storyteller.draw(c, t, { ...ST_CFG, mouth: MOUTH[Math.min(MOUTH.length - 1, Math.floor(t * 30))] || 0 }); }

const GLITCH = [[0, .4, 1, 'd'], [1.16, 1.3, .5], [1.96, 2.2, .8], [4.7, 4.85, .4], [6.58, 6.7, .4], [10.9, 11.0, .4], [14.22, 14.5, .8], [17.86, 18.0, .5], [19.98, 20.12, .4], [24.06, 24.2, .5], [25.96, 26.46, 1, 'r']];
const SHAKE = [[0, .4, 26], [1.16, .3, 30], [1.96, .4, 26], [4.7, .25, 14], [6.58, .3, 18], [10.9, .3, 18], [11.92, .2, 10], [14.22, .5, 34], [17.86, .3, 20], [19.98, .3, 16], [24.06, .25, 12]];
const PZ = [[1.16, .07], [1.96, .08], [4.7, .05], [6.58, .06], [11.92, .04], [14.22, .25], [17.86, .06], [19.98, .05]];

window.render = function (t) {
  const sc = SCENES.find(s => t >= s[0] && t < s[1]) || SCENES[SCENES.length - 1];
  O.save(); sc[2](O, t); O.restore(); overlays(O, t); hud(O, t); storyteller(O, t); caption(O, t);
  const g = O.createRadialGradient(540, 900, 450, 540, 900, 1300); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.5)'); O.fillStyle = g; O.fillRect(0, 0, W, H);
  let wx = 0; const into = t - sc[0]; if (sc[0] > 0 && into < .14) wx = (1 - eo(into / .14)) * 150;
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
