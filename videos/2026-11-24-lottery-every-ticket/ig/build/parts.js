// ===== shared drawn assets (re-timed per cut) =====
function fit(c, s, font, maxW) { // font like '400 {S}px Anton'
  let sz = 200; for (; sz > 20; sz -= 4) { c.font = font.replace('{S}', sz); if (c.measureText(s).width <= maxW) break; } return sz; }
function big(c, s, x, y, font, col, maxW, k = 1, stroke) { // slam-in text, k = 0..1 progress
  if (k <= 0) return; const sz = fit(c, s, font, maxW); const sc = lerp(1.9, 1, back(k)); c.save(); c.translate(x, y); c.scale(sc, sc); c.globalAlpha = clamp(k * 4);
  c.font = font.replace('{S}', sz); c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineJoin = 'round';
  if (stroke) { c.lineWidth = sz * .12; c.strokeStyle = stroke; c.strokeText(s, 0, 0); } c.fillStyle = col; c.fillText(s, 0, 0); c.restore(); }
function pin(c, x, y, s, col = RED) { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = col; c.beginPath(); c.arc(0, -60, 44, Math.PI * .8, Math.PI * .2); c.lineTo(0, 0); c.closePath(); c.fill(); c.fillStyle = PAPER; c.beginPath(); c.arc(0, -60, 17, 0, 7); c.fill(); c.restore(); }
function hookBg(c, t, col = '255,59,48') { c.fillStyle = INK; c.fillRect(0, 0, W, H); const g = c.createRadialGradient(540, 860, 40, 540, 860, 950); g.addColorStop(0, `rgba(${col},.42)`); g.addColorStop(1, `rgba(${col},0)`); c.fillStyle = g; c.fillRect(0, 0, W, H);
  c.save(); c.translate(540, 880); c.globalAlpha = .1; c.fillStyle = RED; for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + t * .25; c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, 1500, a, a + .15); c.closePath(); c.fill(); } c.restore(); }
function rays(c, t, cx, cy, col1, col2) { c.save(); c.translate(cx, cy); for (let i = 0; i < 16; i++) { const a = i / 16 * 6.283 + t * .5; c.fillStyle = i % 2 ? col1 : col2; c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, 1400, a, a + .2); c.closePath(); c.fill(); } c.restore(); }
function dark(c, a0 = .55, a1 = .3) { const dk = c.createLinearGradient(0, 0, 0, H); dk.addColorStop(0, `rgba(11,15,20,${a0})`); dk.addColorStop(1, `rgba(11,15,20,${a1})`); c.fillStyle = dk; c.fillRect(0, 0, W, H); }

// ticket avalanche. t0 start, span seconds to fill, count NT. y from 1420 up to ytop
function makeAval(t0, span, NT, ytop = 250, ybot = 1420) { const a = []; for (let i = 0; i < NT; i++) { const f = i / NT; a.push({ ts: t0 + span * Math.pow(f, .9) + hash(i) * .06, ry: lerp(ybot, ytop, Math.pow(f, .85)) + (hash(i + 5) - .5) * 70, x: hash(i + 2) * 1100 - 10, rot: (hash(i + 7) - .5) * 1.6, w: 120 + hash(i + 11) * 80, seed: i }); } return a; }
function drawAval(c, t, AV, burstAt, ctr = [540, 930], showSingle = true) {
  c.fillStyle = INK; c.fillRect(0, 0, W, H);
  const gg = c.createRadialGradient(540, 700, 40, 540, 700, 900); gg.addColorStop(0, 'rgba(255,214,10,.22)'); gg.addColorStop(1, 'rgba(255,214,10,0)'); c.fillStyle = gg; c.fillRect(0, 0, W, H);
  if (showSingle && t < burstAt + .15) { const k = lin(t, burstAt, burstAt + .15); ticket(c, ctr[0], ctr[1], 660 * (1 + .6 * k), -.07 + k * .3, 5, { nums: [3, 17, 22, 31, 38, 41] }); }
  for (let i = 0; i < 70; i++) { const d = t - burstAt; if (d < 0 || d > 1) continue; const a = hash(i) * 6.283, v = 300 + hash(i + 1) * 900; ticket(c, ctr[0] + Math.cos(a) * v * d, ctr[1] + Math.sin(a) * v * d + 500 * d * d, 90 + hash(i + 4) * 60, d * (hash(i + 6) - .5) * 12, i + 900, { mini: true }); }
  for (const k of AV) { const d = t - k.ts; if (d < 0) continue; const y = Math.min(k.ry, -150 + 5200 * d * d); ticket(c, k.x, y, k.w, k.rot + (y < k.ry ? Math.sin(d * 9 + k.seed) * .25 : 0), k.seed, { mini: true }); }
  dark(c);
  if (t > burstAt && t < burstAt + .18) { c.fillStyle = `rgba(255,255,255,${.8 * (1 - lin(t, burstAt, burstAt + .18))})`; c.fillRect(0, 0, W, H); } }

function drawMap(c, t, tPin, label, x0 = 90, y0 = 350) { // map card of Virginia (static position), pin drops at tPin
  c.save(); c.translate(x0 - 90, y0 - 350);
  shadowBox(c, 90, 350, 900, 620, 30, '#101923', 'rgba(245,243,238,.25)');
  c.save(); rr(c, 90, 350, 900, 620, 30); c.clip(); c.strokeStyle = 'rgba(77,163,255,.14)'; c.lineWidth = 2; for (let x = 90; x < 990; x += 60) { c.beginPath(); c.moveTo(x, 350); c.lineTo(x, 970); c.stroke(); } for (let y = 350; y < 970; y += 60) { c.beginPath(); c.moveTo(90, y); c.lineTo(990, y); c.stroke(); }
  c.fillStyle = '#1e3042'; c.beginPath(); c.moveTo(90, 350); c.lineTo(560, 350); c.bezierCurveTo(600, 450, 680, 500, 700, 560); c.bezierCurveTo(660, 620, 760, 660, 770, 720); c.bezierCurveTo(740, 800, 700, 850, 620, 880); c.lineTo(560, 970); c.lineTo(90, 970); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(245,243,238,.5)'; c.lineWidth = 4; c.stroke();
  for (let i = 0; i < 3; i++) { const d = ((t - tPin) * .9 + i * .33) % 1; if (t > tPin) { c.strokeStyle = `rgba(255,59,48,${.7 * (1 - d)})`; c.lineWidth = 5; c.beginPath(); c.ellipse(700, 650, 20 + d * 120, 8 + d * 48, 0, 0, 7); c.stroke(); } }
  c.restore();
  const pk = bounce(lin(t, tPin, tPin + .35)); pin(c, 700, lerp(-200, 650, pk), 1.5);
  const lk = back(lin(t, tPin + .25, tPin + .5)); c.save(); c.translate(400, 700); c.scale(lk, lk); rr(c, -250, -50, 500, 100, 22); c.fillStyle = RED; c.fill(); txt(c, label, 0, 3, '800 46px JBM', PAPER); c.restore(); c.restore(); }

function drawSlip6(c, t, marks, cx = 540, top = 350, s = 1) { // PICK 6 slip; marks [[n, time]...]
  c.save(); c.translate(cx, top); c.scale(s, s); c.translate(-540, -350);
  shadowBox(c, 160, 350, 760, 470, 22, '#F7F0DC'); c.fillStyle = HL; rr(c, 160, 350, 760, 104, [22, 22, 0, 0]); c.fill(); txt(c, 'PICK 6 OF 44', 540, 404, '400 80px Anton', INK);
  for (let n = 1; n <= 44; n++) { const col = (n - 1) % 11, row = Math.floor((n - 1) / 11), x = 230 + col * 62, y = 500 + row * 78; const mk = marks.find(m => m[0] === n); const mk2 = mk ? back(lin(t, mk[1], mk[1] + .18)) : 0;
    c.beginPath(); c.arc(x, y, 25, 0, 7); c.strokeStyle = 'rgba(11,15,20,.5)'; c.lineWidth = 2; c.stroke(); if (mk2 > 0) { c.fillStyle = RED; c.beginPath(); c.arc(x, y, 25 * mk2, 0, 7); c.fill(); } txt(c, String(n), x, y + 1, '800 22px JBM', mk2 > .5 ? PAPER : 'rgba(11,15,20,.8)'); }
  c.restore(); }

function drawSign(c, t, tShow, tLit, cy = 330, s = 1) { // jackpot sign
  const lit = lin(t, tLit, tLit + .06); c.save(); c.translate(540, cy - 330 + 330); c.save(); c.translate(0, 430 * (1 - s)); c.scale(s, s);
  shadowBox(c, -400, 330, 800, 200, 28, '#141b24', lit > 0 ? GREEN : 'rgba(245,243,238,.25)');
  for (let i = 0; i < 26; i++) { const a = i / 26; let bx, by; const p = a * 4; if (p < 1) { bx = -380 + p * 760; by = 345; } else if (p < 2) { bx = 380; by = 345 + (p - 1) * 170; } else if (p < 3) { bx = 380 - (p - 2) * 760; by = 515; } else { bx = -380; by = 515 - (p - 3) * 170; }
    const on = lit > 0 && (Math.floor(t * 8) + i) % 3 !== 0; c.fillStyle = on ? HL : '#3a4350'; c.beginPath(); c.arc(bx, by, 7, 0, 7); c.fill(); if (on) { c.fillStyle = 'rgba(255,214,10,.25)'; c.beginPath(); c.arc(bx, by, 15, 0, 7); c.fill(); } }
  if (lit > 0) { const v = 27e6 * eo(lin(t, tLit, tLit + .55)); c.save(); c.shadowColor = GREEN; c.shadowBlur = 36; txt(c, '$' + fmt(v), 0, 448, '800 100px JBM', GREEN); c.restore(); txt(c, 'JACKPOT', 0, 372, '400 40px Anton', HL); }
  else { txt(c, '$ ? ? ? ? ? ? ?', 0, 448, '800 80px JBM', 'rgba(245,243,238,.2)'); txt(c, 'THE JACKPOT?', 0, 372, '400 40px Anton', 'rgba(245,243,238,.5)'); }
  c.restore(); c.restore(); }

function drawClockBar(c, t, t0, stop, total = 5.5e6) { // clock + progress bar; stops at 77.9%
  const ct = Math.min(t - t0, stop - t0) + t0;
  c.save(); c.translate(540, 470); const shake = t > stop && t < stop + .3 ? Math.sin(t * 90) * 8 : 0; c.translate(shake, 0);
  c.fillStyle = PAPER; c.beginPath(); c.arc(0, 0, 112, 0, 7); c.fill(); c.strokeStyle = t > stop ? RED : INK; c.lineWidth = 12; c.stroke();
  for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283; c.strokeStyle = INK; c.lineWidth = 5; c.beginPath(); c.moveTo(Math.cos(a) * 90, Math.sin(a) * 90); c.lineTo(Math.cos(a) * 102, Math.sin(a) * 102); c.stroke(); }
  const q = (ct - t0) * 17, ma = q - Math.PI / 2, ha = q / 12 - Math.PI / 2; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 9; c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.cos(ha) * 54, Math.sin(ha) * 54); c.stroke(); c.lineWidth = 6; c.strokeStyle = RED; c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.cos(ma) * 84, Math.sin(ma) * 84); c.stroke(); c.fillStyle = INK; c.beginPath(); c.arc(0, 0, 10, 0, 7); c.fill(); c.restore();
  const x0 = 100, bw = 820, by = 680, bh = 84, p = .779 * lin(t, t0, stop), bought = total * lin(t, t0, stop);
  txt(c, 'TICKETS BOUGHT', 100, 612, '700 28px JBM', 'rgba(245,243,238,.7)', 'left'); txt(c, fmt(bought) + ' / 7,059,052', 920, 612, '800 34px JBM', GREEN, 'right');
  shadowBox(c, x0 - 8, by - 8, bw + 16, bh + 16, 24, '#141b24', 'rgba(245,243,238,.4)');
  c.save(); rr(c, x0, by, bw, bh, 16); c.clip();
  if (t > stop) { c.fillStyle = `rgba(255,59,48,${.55 + .35 * Math.sin(t * 8)})`; c.fillRect(x0 + bw * .779, by, bw * .221, bh); }
  const gg = c.createLinearGradient(x0, 0, x0 + bw, 0); gg.addColorStop(0, '#00893f'); gg.addColorStop(1, GREEN); c.fillStyle = gg; c.fillRect(x0, by, bw * p, bh);
  c.fillStyle = 'rgba(255,255,255,.18)'; for (let i = 0; i < 20; i++) { const sx = x0 + ((i * 60 + t * 120) % (bw * Math.max(.001, p))); c.fillRect(sx, by, 18, bh); } c.restore();
  txt(c, Math.round(p * 100) + '%', x0 + bw * p - 14, by + bh / 2 + 2, '800 40px JBM', INK, 'right'); }

function drawBallsDrum(c, t, sp, cy = 520, r = 190) { drum(c, t, 540, cy, r, sp, 0); }
function drawWin(c, t, t0, ticketY = 1110, textY = 840, stampY = 560) { // WINNER stamp + ticket + $ + confetti
  const gg = c.createRadialGradient(540, 760, 40, 540, 760, 900); gg.addColorStop(0, 'rgba(0,210,106,.35)'); gg.addColorStop(1, 'rgba(0,210,106,0)'); c.fillStyle = INK; c.fillRect(0, 0, W, H); c.fillStyle = gg; c.fillRect(0, 0, W, H);
  rays(c, t, 540, 760, 'rgba(255,214,10,.1)', 'rgba(0,210,106,.1)');
  const hk = [8, 11, 13, 15, 19, 20]; const tk = back(lin(t, t0 + .12, t0 + .45)); c.save(); c.translate(540, ticketY); c.scale(tk, tk); ticket(c, 0, 0, 560, -.04, 9, { nums: hk, hit: hk, band: GREEN }); c.restore();
  const nv0 = t0 + .45; if (t > nv0) { const nv = t < nv0 + .35 ? 27e6 * lin(t, nv0, nv0 + .35) : 27e6; const k = t < nv0 + .35 ? 1 : 1 + .25 * Math.exp(-(t - nv0 - .35) * 12); c.save(); c.translate(540, textY); c.scale(k, k); c.shadowColor = GREEN; c.shadowBlur = 40; txt(c, '$' + fmt(nv), 0, 0, '800 124px JBM', GREEN); c.restore(); }
  stamp(c, 'WINNER', 540, stampY, 210, GREEN, -.07, lin(t, t0, t0 + .12), 'rgba(11,15,20,.7)');
  confetti(c, t, t0, 160, 540, 700); confetti(c, t, t0 + .8, 120, 540, 800, 1.4); }
function drawPBslip(c, t, tIn, tStop, cx = 540, cy = 645, s = 1, labelSz = 70) { // POWERBALL slip with rolling balls
  const k = back(lin(t, tIn, tIn + .25)); if (k <= 0) return; const rf = t < tStop ? Math.floor(t * 12) : 99;
  c.save(); c.translate(cx, cy); c.scale(s * k, s * k); c.translate(0, -645);
  shadowBox(c, -330, 480, 660, 330, 22, '#F7F0DC'); c.fillStyle = RED; rr(c, -330, 480, 660, 92, [22, 22, 0, 0]); c.fill(); txt(c, 'POWERBALL', 0, 526, `400 ${labelSz}px Anton`, PAPER);
  for (let q = 0; q < 6; q++) { const bx = -250 + q * 100; const nn = t < tStop ? 1 + Math.floor(hash(rf * 7 + q) * 69) : [4, 19, 28, 33, 61, 12][q]; c.fillStyle = q < 5 ? '#fff' : RED; c.strokeStyle = 'rgba(11,15,20,.7)'; c.lineWidth = 3; c.beginPath(); c.arc(bx, 660, 38, 0, 7); c.fill(); c.stroke(); txt(c, String(nn).padStart(2, '0'), bx, 662, '800 34px JBM', q < 5 ? INK : PAPER); }
  txt(c, 'PICK 5 + 1', 0, 748, '800 28px JBM', 'rgba(11,15,20,.55)'); c.restore(); }
function drawBirthday(c, t, tIn, cx, cy, s, xAt) { // birthday slip, red X at xAt
  const k = back(lin(t, tIn, tIn + .35)); if (k <= 0) return; const wob = Math.sin(t * 3) * .015;
  c.save(); c.translate(cx, cy); c.rotate(wob); c.scale(k * s, k * s);
  shadowBox(c, -300, -380, 600, 760, 24, '#F7F0DC'); c.fillStyle = '#FF6B9A'; rr(c, -300, -380, 600, 96, [24, 24, 0, 0]); c.fill(); txt(c, 'MY LUCKY NUMBERS', 0, -332, '400 58px Anton', PAPER);
  c.fillStyle = '#c47f4a'; rr(c, -150, -80, 300, 90, 12); c.fill(); c.fillStyle = '#ff9fc0'; rr(c, -110, -150, 220, 76, 12); c.fill(); c.fillStyle = PAPER; for (let i = -2; i <= 2; i++) { c.beginPath(); c.arc(i * 50, -78, 14, 0, Math.PI); c.fill(); }
  for (let i = -1; i <= 1; i++) { c.fillStyle = [RED, '#4DA3FF', GREEN][i + 1]; c.fillRect(i * 62 - 6, -204, 12, 54); const fl = 1 + Math.sin(t * 17 + i * 2) * .18; c.fillStyle = HL; c.beginPath(); c.ellipse(i * 62, -218, 9 * fl, 15 * fl, 0, 0, 7); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.ellipse(i * 62, -214, 4, 7, 0, 0, 7); c.fill(); }
  c.fillStyle = '#8b5a33'; c.fillRect(-190, 10, 380, 14);
  txt(c, 'BIRTHDAY', 0, 72, '400 64px Anton', 'rgba(11,15,20,.75)'); txt(c, '12·25·07·…', 0, 150, '800 76px JBM', INK);
  txt(c, 'ALL ≤ 31', 0, 238, '800 34px JBM', 'rgba(11,15,20,.55)'); txt(c, 'THE BALLS GO TO 44', 0, 292, '800 34px JBM', 'rgba(11,15,20,.55)');
  if (t >= xAt) { const kk = lin(t, xAt, xAt + .12); c.save(); c.translate(0, 70); const sc = lerp(2.4, 1, back(kk)); c.scale(sc, sc); c.globalAlpha = clamp(kk * 3); c.strokeStyle = RED; c.lineWidth = 40; c.lineCap = 'round'; c.beginPath(); c.moveTo(-170, -100); c.lineTo(170, 120); c.moveTo(170, -100); c.lineTo(-170, 120); c.stroke(); c.restore(); }
  c.restore(); }
function bookmark(c, x, y, s, col, k) { if (k <= 0) return; const sc = s * lerp(.2, 1, back(k)); c.save(); c.translate(x, y); c.scale(sc, sc); c.globalAlpha = clamp(k * 4); c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 8; c.lineJoin = 'round'; c.beginPath(); c.moveTo(-60, -90); c.lineTo(60, -90); c.lineTo(60, 90); c.lineTo(0, 45); c.lineTo(-60, 90); c.closePath(); c.fill(); c.stroke(); c.fillStyle = PAPER; c.beginPath(); c.moveTo(0, -50); c.lineTo(12, -22); c.lineTo(42, -20); c.lineTo(19, 0); c.lineTo(27, 30); c.lineTo(0, 14); c.lineTo(-27, 30); c.lineTo(-19, 0); c.lineTo(-42, -20); c.lineTo(-12, -22); c.closePath(); c.fill(); c.restore(); }
