const ST_CFG = { timeline: [[0, 'you'], [4.4, 'point'], [9.4, 'chin'], [16.3, 'you'], [18.9, 'point'], [24.6, 'you'], [27.2, 'point'], [30.9, 'follow'], [34.0, 'shock'], [38.0, 'chin'], [39.6, 'you']],
  bubbles: [[36.5, 40.5, 'HOW MUCH DO YOU', 'SPEND A DAY? COMMENT', [700, 1085]]], follow: [31.0, 33.95], enterAt: -1 };
const COFFEE = '#C47F4A', COFFEE_D = '#7a4a24', CREAM = '#F7F0DC';
const FV = y => 2190 * (Math.pow(1.07, y) - 1) / .07;

// ---------- drawings ----------
// takeaway cup (our drawing, no brand). origin = cup center. split 0..1 cracks it into halves.
function cupBody(c, price) {
  const hw = y => 165 - 45 * (y + 190) / 420;
  // body
  const g = c.createLinearGradient(-165, 0, 165, 0); g.addColorStop(0, '#FFFFFF'); g.addColorStop(.55, PAPER); g.addColorStop(1, '#cfc9ba');
  c.beginPath(); c.moveTo(-165, -190); c.lineTo(165, -190); c.lineTo(120, 230); c.lineTo(-120, 230); c.closePath(); c.fillStyle = g; c.fill();
  // sleeve
  c.beginPath(); c.moveTo(-hw(-30), -30); c.lineTo(hw(-30), -30); c.lineTo(hw(125), 125); c.lineTo(-hw(125), 125); c.closePath(); c.fillStyle = COFFEE; c.fill();
  c.fillStyle = 'rgba(0,0,0,.14)'; c.beginPath(); c.moveTo(hw(-30) * .35, -30); c.lineTo(hw(-30), -30); c.lineTo(hw(125), 125); c.lineTo(hw(125) * .35, 125); c.closePath(); c.fill();
  txt(c, price || '$6', 0, 52, '400 112px Anton', PAPER);
  c.strokeStyle = 'rgba(11,15,20,.85)'; c.lineWidth = 7; c.lineJoin = 'round'; c.beginPath(); c.moveTo(-165, -190); c.lineTo(165, -190); c.lineTo(120, 230); c.lineTo(-120, 230); c.closePath(); c.stroke();
  // lid
  c.fillStyle = '#3b2a20'; rr(c, -188, -250, 376, 62, 22); c.fill(); c.strokeStyle = 'rgba(11,15,20,.85)'; c.stroke();
  c.fillStyle = '#4d3829'; rr(c, -150, -292, 300, 50, 18); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.22)'; rr(c, -130, -280, 90, 12, 6); c.fill();
  c.fillStyle = INK; rr(c, 40, -266, 56, 12, 6); c.fill();
}
const ZIG = [[0, -310], [34, -230], [-26, -150], [38, -60], [-30, 30], [32, 120], [-22, 200], [10, 260]];
function cup(c, t, o) {
  const { x, y, s = 1, rot = 0, split = 0, crack = 0, steam = 1, price } = o;
  c.save(); c.translate(x, y); c.scale(s, s); c.rotate(rot);
  if (split > 0) {
    const gl = c.createRadialGradient(0, 0, 10, 0, 0, 340); gl.addColorStop(0, `rgba(255,214,10,${.9 * split})`); gl.addColorStop(1, 'rgba(255,214,10,0)'); c.fillStyle = gl; c.fillRect(-400, -400, 800, 800);
    for (const sg of [-1, 1]) { c.save(); c.translate(sg * split * 95, split * 30); c.rotate(sg * split * .38);
      c.beginPath(); c.moveTo(sg * 500, -400); for (const [zx, zy] of ZIG) c.lineTo(zx, zy); c.lineTo(sg * 500, 400); c.closePath(); c.clip(); cupBody(c, price); c.restore(); }
  } else cupBody(c, price);
  if (crack > 0 && split <= 0) { c.strokeStyle = '#000'; c.lineWidth = 9; c.lineCap = 'round'; c.lineJoin = 'round'; c.shadowColor = HL; c.shadowBlur = 24; c.beginPath(); const n = Math.floor(crack * (ZIG.length - 1)); c.moveTo(ZIG[0][0], ZIG[0][1]);
    for (let i = 1; i <= n; i++) c.lineTo(ZIG[i][0], ZIG[i][1]); if (n < ZIG.length - 1) { const f = crack * (ZIG.length - 1) - n; c.lineTo(lerp(ZIG[n][0], ZIG[n + 1][0], f), lerp(ZIG[n][1], ZIG[n + 1][1], f)); } c.stroke(); }
  if (steam > 0 && split <= 0) for (let i = 0; i < 3; i++) { const ph = (t * .55 + i * .33) % 1; c.save(); c.globalAlpha = steam * .55 * Math.sin(ph * Math.PI); c.strokeStyle = PAPER; c.lineWidth = 12; c.lineCap = 'round';
    c.beginPath(); const bx = -70 + i * 70, by = -300 - ph * 120; c.moveTo(bx, by + 90); c.bezierCurveTo(bx - 30, by + 60, bx + 30, by + 30, bx, by); c.stroke(); c.restore(); }
  c.restore();
}
const SPILL = ['$6', '$6', '365', '$2,190', '$6', '×365', '$', '$6', '$', '$2,190', '7%', '$6', '365', '$'];
function spill(c, t, t0) {
  for (let i = 0; i < SPILL.length; i++) { const d = t - t0 - hash(i) * .08; if (d < 0) continue; const a = -Math.PI / 2 + (hash(i + 4) - .5) * 2.6, v = 520 + hash(i + 2) * 700;
    const x = 540 + Math.cos(a) * v * d, y = 860 + Math.sin(a) * v * d + 1700 * d * d; if (y > 2100) continue;
    c.save(); c.translate(x, y); c.rotate((hash(i + 8) - .5) * 1.2 + d * (hash(i) - .5) * 6); const col = [GREEN, HL, PAPER, GREEN][i % 4];
    c.lineWidth = 10; c.strokeStyle = 'rgba(0,0,0,.8)'; c.lineJoin = 'round'; c.font = `800 ${58 + hash(i + 1) * 40}px JBM`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.strokeText(SPILL[i], 0, 0); c.fillStyle = col; c.fillText(SPILL[i], 0, 0); c.restore(); }
}
function coin(c, x, y, r, rot = 0, sq = 1) { c.save(); c.translate(x, y); c.rotate(rot); c.scale(1, sq); c.fillStyle = '#F2B705'; c.beginPath(); c.arc(0, 0, r, 0, 7); c.fill(); c.strokeStyle = '#a87a00'; c.lineWidth = r * .14; c.stroke();
  c.strokeStyle = '#ffe27a'; c.lineWidth = r * .1; c.beginPath(); c.arc(0, 0, r * .68, 0, 7); c.stroke(); txt(c, '$', 0, r * .05, `800 ${r * 1.0}px JBM`, '#a87a00'); c.restore(); }
function bill(c, x, y, rot, s, sq = 1) { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s * sq); c.fillStyle = '#2fbf71'; rr(c, -52, -26, 104, 52, 6); c.fill(); c.strokeStyle = '#0a7a40'; c.lineWidth = 4; c.stroke();
  c.strokeStyle = 'rgba(255,255,255,.55)'; c.lineWidth = 2.5; rr(c, -44, -19, 88, 38, 4); c.stroke(); c.fillStyle = '#d9ffe8'; c.beginPath(); c.arc(0, 0, 14, 0, 7); c.fill(); txt(c, '$', 0, 1, '800 20px JBM', '#0a7a40'); c.restore(); }
// glass jar: origin = bottom center. level 0..1
function jar(c, t, x, yb, s, level, label = true) {
  c.save(); c.translate(x, yb); c.scale(s, s);
  const bw = 280, bh = 400; const glow = c.createRadialGradient(0, -200, 40, 0, -200, 330); glow.addColorStop(0, `rgba(0,210,106,${.16 + .22 * level})`); glow.addColorStop(1, 'rgba(0,210,106,0)'); c.fillStyle = glow; c.fillRect(-340, -560, 680, 700);
  c.fillStyle = 'rgba(245,243,238,.08)'; rr(c, -bw / 2, -bh, bw, bh, 44); c.fill();
  c.save(); rr(c, -bw / 2, -bh, bw, bh, 44); c.clip();
  const lvH = level * (bh - 24); if (level > 0) { const top = -lvH; const gg = c.createLinearGradient(0, top, 0, 0); gg.addColorStop(0, '#d49a08'); gg.addColorStop(1, '#7a5400'); c.fillStyle = gg; c.fillRect(-bw / 2, top + 14, bw, lvH);
    const n = Math.ceil(lvH / 30) + 1; for (let r = 0; r < n; r++) for (let k = 0; k < 8; k++) { const cx = -bw / 2 + 24 + k * 33 + (r % 2) * 14 + (hash(r * 8 + k) - .5) * 6, cy = -18 - r * 30; if (cy < top + 12) continue; coin(c, cx, cy, 17, hash(r * 9 + k) * 1.6 - .8, .8); } }
  c.restore();
  // shine + glass edge
  c.fillStyle = 'rgba(255,255,255,.18)'; rr(c, -bw / 2 + 18, -bh + 30, 26, bh - 90, 13); c.fill(); c.fillStyle = 'rgba(255,255,255,.08)'; rr(c, -bw / 2 + 52, -bh + 50, 10, bh - 150, 5); c.fill();
  c.strokeStyle = 'rgba(245,243,238,.7)'; c.lineWidth = 7; rr(c, -bw / 2, -bh, bw, bh, 44); c.stroke();
  // lid rim
  c.fillStyle = '#2e3846'; rr(c, -116, -bh - 44, 232, 44, 12); c.fill(); c.strokeStyle = 'rgba(245,243,238,.7)'; c.lineWidth = 5; c.stroke();
  if (label) { c.save(); c.translate(0, -190); c.rotate(-.04); shadowBox(c, -118, -42, 236, 84, 14, PAPER); txt(c, 'INVESTED', 0, 3, '400 56px Anton', INK); c.restore(); }
  c.restore();
}

// ---------- 0–4.4 hook / 39.6–end outro ----------
function hookScene(c, t, o) {
  const { t0, stampAt, sc0, l1, l2, crack, cs = 1, cy = 860 } = o;
  c.fillStyle = INK; c.fillRect(0, 0, W, H);
  const g = c.createRadialGradient(540, 860, 40, 540, 860, 950); g.addColorStop(0, 'rgba(255,59,48,.42)'); g.addColorStop(1, 'rgba(255,59,48,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  c.save(); c.translate(540, 880); c.globalAlpha = .1; c.fillStyle = RED; for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + t * .25; c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, 1500, a, a + .15); c.closePath(); c.fill(); } c.restore();
  txt(c, l1, 540, 372, '400 128px Anton', PAPER); txt(c, l2, 540, 498, '400 150px Anton', HL);
  const d = t - t0; const s = sc0 + (1 - sc0) * back(clamp(d / .14)); const wob = Math.sin(t * 2.2) * .03;
  const ck = crack ? lin(t, 4.0, 4.1) : 0, sp = crack ? back(lin(t, 4.08, 4.4)) * .6 : 0;
  if (sp > 0) { c.save(); c.globalAlpha = .9; c.restore(); }
  cup(c, t, { x: 500, y: cy, s: s * .98 * cs, rot: -.07 + wob * (1 - sp), crack: ck, split: sp, steam: 1 });
  if (stampAt < 99) { c.save(); if (crack) c.globalAlpha = 1 - lin(t, 3.9, 4.05); stamp(c, 'IDIOT TAX', 560, cy + 20, 168, RED, -.2, lin(t, stampAt, stampAt + .1), 'rgba(11,15,20,.6)'); c.restore(); }
  txt(c, '$6 / DAY', 130, 1135, '800 34px JBM', 'rgba(245,243,238,.5)', 'left');
  if (crack) spill(c, t, 4.02);
}
function sHook(c, t) { hookScene(c, t, { t0: 0, stampAt: .7, sc0: 1.2, l1: '$6 COFFEE', l2: 'EVERY DAY?', crack: true }); }
function sOutro(c, t) { hookScene(c, t, { t0: 39.6, stampAt: 40.22, sc0: 1.2, l1: 'STILL WANT', l2: 'THAT LATTE?', crack: false, cs: .86, cy: 800 });
  if (t < 39.75) { c.fillStyle = `rgba(245,243,238,${.5 * (1 - (t - 39.6) / .15)})`; c.fillRect(0, 0, W, H); } }

// ---------- 4.4–9.4 price tag + calendar ----------
function tag(c, x, y, s, rot) { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s); c.strokeStyle = '#c9ced6'; c.lineWidth = 6; c.beginPath(); c.moveTo(0, -330); c.lineTo(0, -120); c.stroke();
  c.save(); c.shadowColor = 'rgba(0,0,0,.55)'; c.shadowBlur = 26; c.shadowOffsetY = 12; c.fillStyle = HL; c.beginPath(); c.moveTo(-190, -110); c.lineTo(190, -110); c.lineTo(190, 160); c.lineTo(-190, 160); c.closePath(); c.fill(); c.restore();
  c.fillStyle = INK; c.beginPath(); c.arc(0, -78, 15, 0, 7); c.fill(); txt(c, '$6', 0, 22, '400 200px Anton', INK); txt(c, '/ DAY', 0, 128, '800 54px JBM', 'rgba(11,15,20,.8)'); c.restore(); }
function sCal(c, t) {
  bg(c, t);
  const swing = Math.sin((t - 4.5) * 7) * .13 * Math.exp(-Math.max(0, t - 4.5) * 1.4); if (t < 5.6) spill(c, t, 4.02);
  const mv = eio(lin(t, 6.2, 6.8)); const tk = back(lin(t, 4.5, 5.0));
  if (t >= 4.5) tag(c, 540, lerp(640, -260, mv), tk, swing);
  if (t < 6.4 && t > 5.9) { const k = back(lin(t, 5.9, 6.1)); c.save(); c.translate(540, 1000); c.scale(k, k); txt(c, '× 365 DAYS', 0, 0, '400 100px Anton', PAPER); c.restore(); }
  if (t >= 6.45) { const ck = eio(lin(t, 6.45, 6.85)); c.save(); c.translate((1 - ck) * 1100, 0);
    shadowBox(c, 90, 392, 850, 700, 26, '#101923', 'rgba(245,243,238,.25)'); c.fillStyle = RED; rr(c, 90, 392, 850, 74, [26, 26, 0, 0]); c.fill();
    txt(c, '× 365 DAYS', 920, 430, '800 36px JBM', PAPER, 'right'); txt(c, 'A YEAR OF COFFEE', 300, 430, '800 28px JBM', 'rgba(245,243,238,.9)');
    const n = Math.floor(365 * lin(t, 6.56, 8.1) + .0001); const flash = lin(t, 8.14, 8.5);
    for (let i = 0; i < 365; i++) { const col = i % 24, row = Math.floor(i / 24), cx = 129 + col * 33, cy = 504 + row * 36;
      const pk = i < n ? back(lin(t, 6.56 + i / 365 * 1.54, 6.56 + i / 365 * 1.54 + .12)) : 0;
      c.fillStyle = 'rgba(245,243,238,.07)'; rr(c, cx - 13, cy - 13, 26, 26, 6); c.fill();
      if (pk > 0) { const gr = clamp(flash * 2 - (i / 365)); c.fillStyle = gr > 0 ? GREEN : COFFEE; c.save(); c.translate(cx, cy); c.scale(pk, pk); rr(c, -13, -13, 26, 26, 6); c.fill(); c.restore(); } }
    c.restore();
    const val = 6 * n; const kk = t >= 8.14 ? 1 + .16 * Math.exp(-(t - 8.14) * 9) : 1; c.save(); c.translate(540, 1170); c.scale(kk, kk); c.shadowColor = GREEN; c.shadowBlur = t >= 8.14 ? 30 : 0; txt(c, '$' + fmt(val), 0, 0, '800 112px JBM', GREEN); c.restore(); }
  stamp(c, '$2,190 / YEAR', 540, 780, 100, GREEN, -.06, lin(t, 8.84, 8.96), 'rgba(11,15,20,.9)');
}

// ---------- 9.4–16.3 invest jar ----------
const JX = 560, JYB = 900;
function sJar(c, t) {
  bg(c, t, 'rgba(0,210,106,.12)');
  const lvl = .55 * lin(t, 10.0, 12.6) + .2 * lin(t, 12.6, 16.3);
  jar(c, t, JX, JYB, 1, lvl);
  // pouring cup
  const enter = eio(lin(t, 9.4, 9.75)), exit = eio(lin(t, 12.7, 13.1)); const tilt = 1.9 * eio(lin(t, 9.75, 10.1)) * (1 - eio(lin(t, 12.5, 12.8)));
  const cx = lerp(-200, 336, enter) + exit * -500, cy = 410;
  if (t < 13.2) { cup(c, t, { x: cx, y: cy, s: .5, rot: tilt, steam: 1 - lin(t, 9.9, 10.1) }); }
  // coin stream from cup mouth to jar
  const mx = cx + 230 * Math.sin(tilt) * .5, my = cy - 230 * Math.cos(tilt) * .5;
  for (let k = 0; k < 40; k++) { const te = 10.0 + k * .066; const u = (t - te) / .55; if (u < 0 || u > 1 || t > 13.0) continue; const tx = JX - 70 + hash(k) * 140, ty = JYB - 60 - hash(k + 5) * 120;
    const x = lerp(mx, tx, u), y = lerp(my, ty, u * u) - Math.sin(u * Math.PI) * 60; coin(c, x, y, 17, u * 8 + k, Math.abs(Math.cos(u * 9 + k))); }
  // 7% pop
  if (t >= 11.88 && t < 13.2) { const k = back(lin(t, 11.88, 12.06)) * (1 - eo(lin(t, 12.8, 13.2))); c.save(); c.translate(820, 600); c.rotate(.08); c.scale(k, k); c.shadowColor = HL; c.shadowBlur = 30; txt(c, '+7%', 0, 0, '400 170px Anton', HL); c.restore(); }
  // growth plusses
  if (t > 12.6) for (let i = 0; i < 4; i++) { const u = ((t - 12.6) * .5 + i * .25) % 1; c.save(); c.globalAlpha = Math.sin(u * Math.PI) * .9; txt(c, '+', JX - 120 + i * 80 + Math.sin(u * 7 + i) * 14, JYB - 440 - u * 130, '800 54px JBM', GREEN); c.restore(); }
  // assumption card
  if (t >= 11.46) { const k = 1 - back(lin(t, 11.46, 11.78)); const out = eio(lin(t, 16.05, 16.3)); c.save(); c.translate(0, k * 420 + out * 420);
    shadowBox(c, 90, 960, 780, 210, 26, '#141b24', HL); c.fillStyle = HL; rr(c, 90, 960, 780, 56, [26, 26, 0, 0]); c.fill(); txt(c, 'ASSUMPTION', 130, 989, '800 30px JBM', INK, 'left'); txt(c, 'NOT A GUARANTEE', 830, 989, '800 24px JBM', 'rgba(11,15,20,.65)', 'right');
    const pk = t >= 11.88 ? 1 + .12 * Math.exp(-(t - 11.88) * 8) : 1; c.save(); c.translate(130, 1090); c.scale(pk, pk); txt(c, '7% AVG / YEAR', 0, 0, '400 100px Anton', PAPER, 'left'); c.restore();
    if (t >= 14.54) { const u = lin(t, 14.54, 15.32); c.fillStyle = RED; c.fillRect(130, 1140, 560 * eo(u), 6); }
    c.restore(); stamp(c, 'NOT A PROMISE', 450, 1212 + (k * 420 + out * 420), 70, RED, -.05, lin(t, 15.32, 15.44), 'rgba(11,15,20,.88)'); }
}
// ---------- 16.3–18.9 cup vs jar (like moment) ----------
function sVs(c, t) {
  bg(c, t, 'rgba(0,210,106,.12)');
  const k1 = back(lin(t, 16.3, 16.65)), k2 = back(lin(t, 16.4, 16.75));
  c.save(); c.translate(250, 810); c.scale(k1, k1); c.translate(0, Math.sin(t * 3) * 6); cup(c, t, { x: 0, y: 0, s: .62, rot: -.05, steam: 1 }); c.restore();
  c.save(); c.translate(690, 0); c.scale(1, 1); jar(c, t, 0, 960, .82 * k2, .75 + .02 * Math.sin(t * 4)); c.restore();
  txt(c, '$6 LATTE', 250, 1040, '800 38px JBM', 'rgba(245,243,238,.8)'); txt(c, 'THE JAR', 690, 1040, '800 38px JBM', GREEN);
  stamp(c, 'VS', 470, 760, 120, RED, -.1, lin(t, 16.7, 16.82), 'rgba(11,15,20,.8)');
  for (let i = 0; i < 5; i++) { const u = ((t - 16.8) * .6 + i * .2) % 1; if (t > 16.8) { c.save(); c.globalAlpha = Math.sin(u * Math.PI); coin(c, 600 + hash(i) * 180, 640 - u * 130, 14, u * 6, Math.abs(Math.cos(u * 8 + i))); c.restore(); } }
}

// ---------- chart (18.9–24.6, 27.2–38.0) ----------
const YK = [[19.16, 0], [20.48, 10], [22.16, 10], [23.26, 20], [27.26, 20], [29.0, 30], [30.9, 30], [34.0, 33.5], [34.24, 33.5], [35.44, 40]];
function Yat(t) { if (t <= YK[0][0]) return 0; for (let i = 1; i < YK.length; i++) if (t < YK[i][0]) { const [t0, y0] = YK[i - 1], [t1, y1] = YK[i]; const u = lin(t, t0, t1); return y0 + (y1 - y0) * ((y1 - y0) >= 6 ? eio(u) : u); } return 40; }
const MS = [{ y: 10, t: 20.48, a: '10 YRS', b: '$30,258' }, { y: 20, t: 23.26, a: '20 YRS', b: '$89,780' }, { y: 30, t: 29.0, a: '30 YRS', b: '$206,869' }];
const CX0 = 110, CX1 = 930, CY0 = 990, CYT = 660;
function arrowR(c, x, y, len, col, w = 6) { c.save(); c.strokeStyle = col; c.fillStyle = col; c.lineWidth = w; c.lineCap = 'round'; c.beginPath(); c.moveTo(x, y); c.lineTo(x + len - 6, y); c.stroke(); c.beginPath(); c.moveTo(x + len, y); c.lineTo(x + len - 18, y - 13); c.lineTo(x + len - 18, y + 13); c.closePath(); c.fill(); c.restore(); }
function sChart(c, t) {
  const Y = Yat(t), V = FV(Y);
  const tense = lin(t, 30.9, 34.0);
  bg(c, t, t >= 33 && t < 35.44 ? `rgba(255,59,48,${.1 + .14 * tense})` : 'rgba(0,210,106,.12)');
  const xm0 = Math.max(10, Y * 1.08), xmax = t >= 30.9 ? lerp(xm0, 40, eio(lin(t, 30.9, 32.0))) : xm0, ymax = Math.max(7000, V * 1.32);
  const X_ = yr => CX0 + (CX1 - CX0) * yr / xmax, Yp = v => CY0 - (CY0 - CYT) * v / ymax;
  const sq = 1 - .9 * eio(lin(t, 35.95, 37.45)), xe = X_(40); const Xs = yr => xe - (xe - X_(yr)) * sq;
  // counters
  const cAlpha = 1 - lin(t, 35.44, 35.62);
  c.save(); c.globalAlpha = cAlpha; txt(c, 'YEARS', 90, 376, '800 30px JBM', 'rgba(245,243,238,.7)', 'left');
  const yr = Math.round(Y); let ky = 1; for (const m of MS) if (t >= m.t) ky = Math.max(ky, 1 + .22 * Math.exp(-(t - m.t) * 9)); c.save(); c.translate(90, 465); c.scale(ky, ky); txt(c, String(yr), 0, 0, '400 140px Anton', PAPER, 'left'); c.restore();
  let kv = 1; for (const m of MS) if (t >= m.t) kv = Math.max(kv, 1 + .18 * Math.exp(-(t - m.t) * 9)); c.save(); c.translate(90, 585); c.scale(kv, kv); c.shadowColor = GREEN; c.shadowBlur = 24; txt(c, '$' + fmt(V), 0, 0, '800 96px JBM', GREEN, 'left'); c.restore(); c.restore();
  if (t < 19.16) { }
  // small jar
  c.save(); c.globalAlpha = cAlpha; jar(c, t, 800, 640, .52, clamp(V / 437201), false); c.restore();
  // chart frame
  c.save(); c.beginPath(); c.rect(CX0 - 14, CYT - 40, CX1 - CX0 + 28, CY0 - CYT + 90); c.clip();
  c.strokeStyle = 'rgba(245,243,238,.09)'; c.lineWidth = 2; for (let i = 1; i <= 4; i++) { const gy = CY0 - (CY0 - CYT) * i / 4; c.beginPath(); c.moveTo(CX0, gy); c.lineTo(CX1, gy); c.stroke(); }
  c.strokeStyle = 'rgba(245,243,238,.55)'; c.lineWidth = 4; c.beginPath(); c.moveTo(CX0, CYT - 20); c.lineTo(CX0, CY0); c.lineTo(CX1, CY0); c.stroke();
  c.globalAlpha = 1 - lin(t, 35.9, 36.3);
  for (let k = 0; k <= 40; k += 10) { const px = Xs(k); if (px > CX1 + 4) continue; txt(c, k ? k + 'Y' : '0', px, CY0 + 24, '700 22px JBM', 'rgba(245,243,238,.6)'); }
  c.globalAlpha = 1;
  const end = Math.min(Y, 40);
  // contributions
  c.setLineDash([12, 12]); c.strokeStyle = 'rgba(245,243,238,.55)'; c.lineWidth = 4; c.beginPath(); c.moveTo(Xs(0), Yp(0)); for (let q = 0; q <= end + .01; q += .5) c.lineTo(Xs(q), Yp(2190 * q)); c.stroke(); c.setLineDash([]);
  // ghost projection (follow beat)
  if (t >= 30.9 && t < 35.5) { const ga = lin(t, 30.9, 31.5) * (1 - lin(t, 35.0, 35.44)); c.save(); c.globalAlpha = ga * (.55 + .25 * Math.sin(t * 9)); c.setLineDash([16, 14]); c.strokeStyle = HL; c.lineWidth = 7; c.beginPath(); for (let q = end; q <= 40.01; q += .25) { const px = Xs(q), py = Yp(FV(q)); q === end ? c.moveTo(px, py) : c.lineTo(px, py); } c.stroke(); c.restore(); }
  // curve
  const pts = []; for (let q = 0; q <= end + .001; q += .2) pts.push([Xs(q), Yp(FV(q))]); pts.push([Xs(end), Yp(FV(end))]);
  const fg = c.createLinearGradient(0, CYT, 0, CY0); fg.addColorStop(0, 'rgba(0,210,106,.35)'); fg.addColorStop(1, 'rgba(0,210,106,0)'); c.beginPath(); c.moveTo(pts[0][0], CY0); for (const p of pts) c.lineTo(p[0], p[1]); c.lineTo(pts[pts.length - 1][0], CY0); c.closePath(); c.fillStyle = fg; c.fill();
  c.save(); c.shadowColor = GREEN; c.shadowBlur = 18 + (t >= 31 && t < 35.4 ? 18 * (.5 + .5 * Math.sin(t * 8)) : 0); c.strokeStyle = GREEN; c.lineWidth = 11; c.lineJoin = 'round'; c.lineCap = 'round'; c.beginPath(); pts.forEach((p, i) => i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.stroke(); c.restore();
  const ep = pts[pts.length - 1]; c.fillStyle = PAPER; c.beginPath(); c.arc(ep[0], ep[1], 14 + 3 * Math.sin(t * 8), 0, 7); c.fill();
  // rocket streak (curve goes vertical)
  if (t >= 36.3) { const u = eio(lin(t, 36.3, 37.6)); const top = lerp(ep[1], CYT - 30, u); c.save(); c.shadowColor = GREEN; c.shadowBlur = 36; c.strokeStyle = GREEN; c.lineWidth = 12; c.lineCap = 'round'; c.beginPath(); c.moveTo(ep[0], ep[1]); c.lineTo(ep[0], top); c.stroke(); c.fillStyle = GREEN; c.beginPath(); c.moveTo(ep[0], top - 34); c.lineTo(ep[0] - 24, top + 8); c.lineTo(ep[0] + 24, top + 8); c.closePath(); c.fill(); c.restore(); }
  c.restore();
  // milestone chips attached to curve points
  for (const m of MS) { if (t < m.t) continue; const px = Xs(m.y), py = Yp(FV(m.y)); const k = back(lin(t, m.t, m.t + .2)); const fade = 1 - lin(t, 35.2, 35.5);
    const pulse = 1 + .28 * Math.exp(-(t - m.t) * 8); c.save(); c.globalAlpha = fade; c.fillStyle = HL; c.beginPath(); c.arc(px, py, 13 * pulse, 0, 7); c.fill();
    const ring = lin(t, m.t, m.t + .5); c.strokeStyle = `rgba(255,214,10,${1 - ring})`; c.lineWidth = 6; c.beginPath(); c.arc(px, py, 14 + ring * 70, 0, 7); c.stroke();
    c.font = '800 36px JBM'; const wa = c.measureText(m.a).width, wb = c.measureText(m.b).width, w = wa + wb + 128; const ccx = clamp(px - 40, 90 + w / 2, 930 - w / 2), ccy = Math.min(py - 70, CY0 - 40);
    c.translate(ccx, ccy); c.scale(k, k); shadowBox(c, -w / 2, -34, w, 68, 16, '#101923', HL); txt(c, m.a, -w / 2 + 22, 2, '800 36px JBM', PAPER, 'left'); arrowR(c, -w / 2 + 22 + wa + 14, 2, 52, HL, 6); txt(c, m.b, w / 2 - 20, 2, '800 36px JBM', GREEN, 'right'); c.restore(); }
  // follow beat label
  if (t >= 31.3 && t < 34.3) { const k = back(lin(t, 31.3, 31.55)) * (1 - lin(t, 34.0, 34.3)); c.save(); c.translate(90, 1062); c.scale(k, k); txt(c, 'THE LAST 10 YEARS', 0, 0, '400 54px Anton', HL, 'left'); c.restore(); }
  // vignette tension
  if (t >= 30.9 && t < 34.24) { const hb = Math.pow(Math.max(0, Math.sin((t - 30.9) * 7.2)), 8); const gv = c.createRadialGradient(540, 800, 300 - tense * 100, 540, 800, 1200); gv.addColorStop(0, 'rgba(0,0,0,0)'); gv.addColorStop(1, `rgba(0,0,0,${.2 + .35 * tense})`); c.fillStyle = gv; c.fillRect(0, 0, W, H); c.fillStyle = `rgba(255,59,48,${.07 * hb})`; c.fillRect(0, 0, W, H); }
  // payoff
  if (t >= 35.44) {
    const dim = .55 * lin(t, 35.44, 35.7); c.fillStyle = `rgba(11,15,20,${dim})`; c.fillRect(0, 0, W, H);
    for (let i = 0; i < 80; i++) { const ts = 35.44 + hash(i) * 1.5, d = t - ts; if (d < 0) continue; const y = -60 + d * (700 + hash(i + 3) * 500); if (y > 2000) continue; const x = hash(i + 1) * 1100 - 10 + Math.sin(d * 3 + i) * 40;
      if (i % 5 === 0) coin(c, x, y, 20, d * 6, Math.abs(Math.cos(d * 8 + i))); else bill(c, x, y, Math.sin(d * 2.5 + i) * .9, .9, Math.abs(Math.cos(d * 5 + i)) * .85 + .15); }
    const k = back(lin(t, 35.44, 35.64)); const b = t < 36.4 ? 1 + .05 * Math.sin((t - 35.44) * 26) * Math.exp(-(t - 35.44) * 3) : 1; c.save(); c.translate(540, 800); c.scale(k * b, k * b);
    c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 40; rr(c, -420, -200, 840, 400, 34); c.fillStyle = 'rgba(11,15,20,.94)'; c.fill(); c.shadowBlur = 0; c.strokeStyle = GREEN; c.lineWidth = 8; c.stroke();
    c.font = '400 120px Anton'; const wa = c.measureText('40 YRS').width; txt(c, '40 YRS', -wa / 2 - 60, -110, '400 120px Anton', PAPER); arrowR(c, wa / 2 - 30, -110, 110, HL, 14);
    c.save(); c.shadowColor = GREEN; c.shadowBlur = 40; txt(c, '$437,201', 0, 30, '800 140px JBM', GREEN); c.restore();
    txt(c, 'YOU PUT IN $87,600', 0, 140, '800 34px JBM', 'rgba(245,243,238,.8)'); c.restore();
  }
}

// ---------- 24.6–27.2 latte in a hand ----------
function skin(c, x, y, w, h, rot) { c.save(); c.translate(x, y); c.rotate(rot); rr(c, -w / 2, -h / 2, w, h, h / 2); c.fillStyle = '#F2C29B'; c.fill(); c.strokeStyle = 'rgba(11,15,20,.8)'; c.lineWidth = 6; c.stroke(); c.restore(); }
function latteHand(c, t, x, y) {
  c.save(); c.translate(x, y + Math.sin(t * 3) * 6);
  // sleeve + arm
  c.save(); c.rotate(.12); c.fillStyle = '#F2C29B'; c.strokeStyle = 'rgba(11,15,20,.8)'; c.lineWidth = 6; rr(c, -62, 90, 124, 360, 30); c.fill(); c.stroke(); c.fillStyle = '#2c3e66'; rr(c, -78, 300, 156, 200, 18); c.fill(); c.stroke(); c.fillStyle = PAPER; c.fillRect(-72, 300, 144, 26); c.restore();
  // glass
  c.beginPath(); c.moveTo(-100, -220); c.lineTo(100, -220); c.lineTo(76, 170); c.lineTo(-76, 170); c.closePath(); c.save(); c.clip();
  c.fillStyle = 'rgba(245,243,238,.12)'; c.fillRect(-120, -230, 240, 410); const L = [['#4a2c17', 100, 170], ['#b98350', -60, 100], ['#e8d3b0', -150, -60], [CREAM, -230, -150]];
  for (const [col, y0, y1] of L) { c.fillStyle = col; c.fillRect(-120, y0 < y1 ? y0 : y1, 240, Math.abs(y1 - y0) + 1); }
  c.fillStyle = '#4a2c17'; c.fillRect(-120, 90, 240, 90); c.fillStyle = '#b98350'; c.fillRect(-120, -50, 240, 140); c.fillStyle = '#ead7b6'; c.fillRect(-120, -150, 240, 100); c.fillStyle = CREAM; c.fillRect(-120, -230, 240, 80);
  c.fillStyle = 'rgba(255,255,255,.22)'; c.fillRect(-84, -210, 20, 360); c.restore();
  c.strokeStyle = 'rgba(11,15,20,.85)'; c.lineWidth = 7; c.beginPath(); c.moveTo(-100, -220); c.lineTo(100, -220); c.lineTo(76, 170); c.lineTo(-76, 170); c.closePath(); c.stroke();
  // foam dome
  c.fillStyle = CREAM; c.beginPath(); c.ellipse(0, -226, 104, 28, 0, 0, 7); c.fill(); c.stroke();
  // straw
  c.strokeStyle = RED; c.lineWidth = 16; c.lineCap = 'round'; c.beginPath(); c.moveTo(34, -240); c.lineTo(62, -330); c.stroke();
  // fingers wrap + thumb
  for (let i = 0; i < 4; i++) skin(c, -8 + i * 2, 20 + i * 46, 190 - i * 8, 40, -.06);
  skin(c, 96, 40, 40, 150, -.3); skin(c, 62, 190, 120, 80, 0);
  // steam
  for (let i = 0; i < 3; i++) { const ph = (t * .6 + i * .33) % 1; c.save(); c.globalAlpha = .5 * Math.sin(ph * Math.PI); c.strokeStyle = PAPER; c.lineWidth = 10; c.lineCap = 'round'; c.beginPath(); const bx = -50 + i * 50, by = -300 - ph * 110; c.moveTo(bx, by + 80); c.bezierCurveTo(bx - 26, by + 55, bx + 26, by + 28, bx, by); c.stroke(); c.restore(); }
  c.restore();
}
function sLatte(c, t) {
  bg(c, t, 'rgba(255,214,10,.13)');
  const k = bounce(lin(t, 24.6, 25.1)); latteHand(c, t, 480, lerp(1500, 760, k));
  if (t >= 25.7) { const kk = back(lin(t, 25.7, 25.95)); c.save(); c.translate(250, 520); c.scale(kk, kk); c.fillStyle = 'rgba(0,210,106,.2)'; c.beginPath(); c.arc(0, 0, 70, 0, 7); c.fill(); check(c, 0, 0, 1.2, GREEN, lin(t, 25.75, 26.05)); txt(c, 'SENT', 0, 96, '400 54px Anton', GREEN); c.restore(); }
  if (t >= 26.22) { const kk = back(lin(t, 26.22, 26.45)); c.save(); c.translate(720, 540); c.rotate(.06); c.scale(kk, kk); shadowBox(c, -190, -42, 380, 84, 16, RED); txt(c, 'THE LATTE FRIEND', 0, 3, '400 52px Anton', PAPER); c.beginPath(); c.moveTo(-60, 42); c.lineTo(-20, 100); c.lineTo(10, 42); c.fillStyle = RED; c.fill(); c.restore(); }
}
// ---------- 38.0–39.6 deadpan ----------
function sFor(c, t) {
  c.fillStyle = INK; c.fillRect(0, 0, W, H); const g = c.createRadialGradient(540, 760, 40, 540, 760, 800); g.addColorStop(0, 'rgba(245,243,238,.1)'); g.addColorStop(1, 'rgba(245,243,238,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  txt(c, '$437,201', 540, 520, '800 80px JBM', 'rgba(0,210,106,.45)');
  const ck = back(lin(t, 38.0, 38.2)); c.save(); c.translate(540, 800); c.scale(ck * (1 + .04 * lin(t, 38.2, 39.6)), ck * (1 + .04 * lin(t, 38.2, 39.6))); c.rotate(-.015);
  shadowBox(c, -400, -150, 800, 300, 10, CREAM);
  const s = 'FOR COFFEE.', n = Math.min(s.length, Math.floor(lin(t, 38.16, 38.95) * (s.length + .99))); c.font = '400 118px "Special Elite"'; c.textAlign = 'left'; c.textBaseline = 'middle'; const full = c.measureText(s).width; const sub = s.slice(0, n);
  c.fillStyle = INK; c.fillText(sub, -full / 2, 4); if (Math.floor(t * 2.6) % 2 === 0 || n < s.length) { const cw = c.measureText(sub).width; c.fillRect(-full / 2 + cw + 6, -62, 12, 124); }
  c.restore();
}
const SCENES = [[0, 4.4, sHook], [4.4, 9.4, sCal], [9.4, 16.3, sJar], [16.3, 18.9, sVs], [18.9, 24.6, sChart], [24.6, 27.2, sLatte], [27.2, 38.0, sChart], [38.0, 39.6, sFor], [39.6, 41.6, sOutro]];

// ---------- overlays ----------
function overlays(c, t) {
  if (t >= 16.46 && t < 18.95) { const ph = ((t - 16.62) * 2.4) % 1, ph0 = t < 16.62 ? 0 : ph; const s = (t < 16.62 ? back(lin(t, 16.46, 16.62)) : 1) * (1 + .3 * Math.exp(-ph0 * 6)); const out = 1 - eo(lin(t, 18.75, 18.95));
    c.save(); c.globalAlpha = out; heart(c, 790, 1145, 1.15 * s, RED); for (let i = 0; i < 3; i++) { const u = ((t - 16.62) * .9 + i * .33) % 1; if (t > 16.62) { c.globalAlpha = out * (1 - u); heart(c, 790 + (i - 1) * 50 + Math.sin(u * 6 + i) * 10, 1100 - u * 130, .4, '#ff7a72'); } } c.restore(); }
  if (t >= 24.6 && t < 25.9) { const u = eo(lin(t, 24.6, 25.7)); const P = (a, b, cc) => (1 - u) * (1 - u) * a + 2 * u * (1 - u) * b + u * u * cc;
    const px = P(790, 760, 520), py = P(1330, 650, 620), tx = 2 * (1 - u) * (760 - 790) + 2 * u * (520 - 760), ty = 2 * (1 - u) * (650 - 1330) + 2 * u * (620 - 650);
    c.save(); c.globalAlpha = 1 - lin(t, 25.6, 25.9); c.strokeStyle = 'rgba(245,243,238,.5)'; c.lineWidth = 4; c.setLineDash([12, 14]); c.beginPath(); for (let k = 0; k <= u; k += .04) { const x = (1 - k) * (1 - k) * 790 + 2 * k * (1 - k) * 760 + k * k * 520, y = (1 - k) * (1 - k) * 1330 + 2 * k * (1 - k) * 650 + k * k * 620; k ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke(); c.setLineDash([]);
    plane(c, px, py, Math.atan2(ty, tx), .55 * (1 - .4 * u)); c.restore(); }
}
// ---------- captions ----------
function caption(c, t) {
  let it = null; for (const cp of CAPS) if (t >= cp[0] && t < cp[1]) it = cp; if (!it) return;
  const k = eo(lin(t, it[0], it[0] + .12)); const parts = it[2].map(([w, col]) => [w, col === 'g' ? GREEN : col === 'r' ? RED : col === 'y' ? HL : PAPER]);
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
  txt(c, 'ASSUMES 7%/YR AVG RETURN · NOT INFLATION-ADJUSTED', 90, 1492, '700 19px JBM', 'rgba(245,243,238,.7)', 'left');
  txt(c, '· NOT ADVICE · FV = 2,190 × ((1.07^N − 1) ÷ 0.07)', 90, 1518, '700 17px JBM', 'rgba(245,243,238,.5)', 'left');
}
function storyteller(c, t) { Storyteller.draw(c, t, { ...ST_CFG, mouth: MOUTH[Math.min(MOUTH.length - 1, Math.floor(t * 30))] || 0 }); }

const GLITCH = [[0, .4, 1, 'd'], [.7, .85, .5], [4.0, 4.28, .8], [8.84, 8.96, .4], [20.48, 20.6, .3], [23.26, 23.38, .3], [29.0, 29.12, .3], [34.0, 34.15, .5], [35.44, 35.7, .7], [40.22, 40.4, .8], [41.2, 41.5, 1, 'r']];
const SHAKE = [[0, .4, 26], [.7, .3, 30], [4.0, .4, 26], [5.0, .25, 16], [8.84, .3, 20], [20.48, .2, 10], [23.26, .2, 10], [29.0, .2, 12], [34.0, .3, 12], [35.44, .5, 34], [40.22, .35, 30]];
const PZ = [[.7, .07], [4.0, .08], [8.84, .06], [20.48, .04], [23.26, .04], [29.0, .04], [35.44, .25], [40.22, .07]];

window.render = function (t) {
  const sc = SCENES.find(s => t >= s[0] && t < s[1]) || SCENES[SCENES.length - 1];
  O.save(); sc[2](O, t); O.restore(); overlays(O, t); hud(O, t); storyteller(O, t); caption(O, t);
  const g = O.createRadialGradient(540, 900, 450, 540, 900, 1300); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.5)'); O.fillStyle = g; O.fillRect(0, 0, W, H);
  let wx = 0; const into = t - sc[0]; if (sc[0] > 0 && into < .16) wx = (1 - eo(into / .16)) * 160;
  let sx = 0, sy = 0; for (const [s0, d, amp] of SHAKE) if (t >= s0 && t < s0 + d) { const k = 1 - (t - s0) / d; sx += Math.sin(t * 97) * amp * k; sy += Math.cos(t * 83) * amp * k; }
  let pz = 1; for (const [s0, amp] of PZ) { const k = t - s0; if (k >= 0 && k < 1) pz += amp * clamp(k / .067) * (1 - eo(clamp((k - .067) / .4))); }
  if (t >= 30.9 && t < 34.0) pz += .05 * eio(lin(t, 30.9, 34.0));
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
