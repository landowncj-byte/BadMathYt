// ---------- parlay drawing library (shared by the three cuts) ----------
const MINUS = '−';
const LEGS = ['TEAM A ' + MINUS + '3.5', 'OVER 214.5', 'TEAM B +6', 'UNDER 44.5', 'TEAM C ' + MINUS + '1.5', 'OVER 8.5', 'TEAM D +2.5', 'UNDER 5.5', 'TEAM E ' + MINUS + '7', 'OVER 52.5'];
const SW = 640, RH = 56, SHD = 84, SFT = 96;
const slipH = rows => SHD + rows * RH + SFT;
function xmark(c, x, y, s, col, k = 1) { c.save(); c.translate(x, y); c.scale(s, s); c.strokeStyle = col; c.lineWidth = 14; c.lineCap = 'round'; c.setLineDash([60]); c.lineDashOffset = 60 * (1 - k);
  c.beginPath(); c.moveTo(-24, -24); c.lineTo(24, 24); c.stroke(); c.lineDashOffset = 60 * (1 - clamp(k * 2 - 1)); c.beginPath(); c.moveTo(24, -24); c.lineTo(-24, 24); c.stroke(); c.restore(); }
function tick(c, x, y, s, col, k = 1) { c.save(); c.translate(x, y); c.scale(s * .8, s * .8); c.strokeStyle = col; c.lineWidth = 14; c.lineCap = 'round'; c.lineJoin = 'round'; c.beginPath(); c.moveTo(-26, 2); c.lineTo(-8, 22); c.lineTo(28, -22); c.setLineDash([110]); c.lineDashOffset = 110 * (1 - k); c.stroke(); c.restore(); }
// generic betting slip. o: cx, top, s, rot, n (rows shown, fractional), rows, res(fn i->{k,v}), foot, hdr, flip 0..1, flash
function slip(c, o) {
  const { cx = 540, top = 350, s = 1, rot = 0, n = 10, rows = 10, res = null, foot = 'RISK $10 · PAYS $6,431', hdr = null, flip = 0, tm = 0, back: backTxt = null, offs = 0 } = o;
  const h = slipH(rows), sx = Math.max(.03, Math.abs(Math.cos(flip * Math.PI)));
  c.save(); c.translate(cx, top + h * s / 2); c.rotate(rot); c.scale(s * sx, s); c.translate(-SW / 2, -h / 2);
  c.save(); c.shadowColor = 'rgba(0,0,0,.55)'; c.shadowBlur = 36; c.shadowOffsetY = 16; c.fillStyle = PAPER; c.beginPath(); c.moveTo(0, 0); c.lineTo(SW, 0); c.lineTo(SW, h - 16);
  for (let x = SW, i = 0; x >= 0; x -= 20, i++) c.lineTo(x, h - (i % 2 ? 0 : 16)); c.closePath(); c.fill(); c.restore();
  c.save(); c.beginPath(); c.moveTo(0, 0); c.lineTo(SW, 0); c.lineTo(SW, h - 16); for (let x = SW, i = 0; x >= 0; x -= 20, i++) c.lineTo(x, h - (i % 2 ? 0 : 16)); c.closePath(); c.clip();
  c.fillStyle = INK; c.fillRect(0, 0, SW, SHD);
  if (flip < .5) {
    c.save(); c.letterSpacing = '6px'; txt(c, 'SPORTSBOOK', 30, 44, '400 40px Anton', PAPER, 'left'); c.restore();
    const nn = Math.min(rows, Math.max(1, Math.round(n)));
    txt(c, hdr || ('PARLAY · ' + nn + ' LEGS'), SW - 28, 44, '800 24px JBM', HL, 'right');
    for (let i = 0; i < rows; i++) {
      const k = clamp(n - i), y = SHD + i * RH;
      if (k <= 0) { c.strokeStyle = 'rgba(11,15,20,.14)'; c.lineWidth = 3; c.setLineDash([10, 10]); c.beginPath(); c.moveTo(24, y + RH / 2); c.lineTo(SW - 24, y + RH / 2); c.stroke(); c.setLineDash([]); continue; }
      const dx = (1 - eo(k)) * (i % 2 ? 460 : -460), r = res ? res(i) : null;
      c.save(); c.translate(dx, 0); c.globalAlpha = clamp(k * 3);
      c.fillStyle = r && r.v < 0 ? 'rgba(255,59,48,.18)' : (i % 2 ? 'rgba(11,15,20,.06)' : 'rgba(11,15,20,0)'); c.fillRect(0, y, SW, RH);
      if (k < 1) { c.fillStyle = `rgba(255,214,10,${.7 * (1 - k)})`; c.fillRect(0, y, SW, RH); }
      c.fillStyle = INK; c.beginPath(); c.arc(40, y + RH / 2, 17, 0, 7); c.fill(); txt(c, String(i + 1), 40, y + RH / 2 + 1, '800 20px JBM', PAPER);
      txt(c, LEGS[i], 76, y + RH / 2 + 1, '800 28px Inter', INK, 'left'); txt(c, MINUS + '110', SW - 100, y + RH / 2 + 1, '800 26px JBM', 'rgba(11,15,20,.7)', 'right');
      if (r && r.v > 0) tick(c, SW - 50, y + RH / 2, .8, '#0aa850', r.k); else if (r && r.v < 0) xmark(c, SW - 50, y + RH / 2, .62, RED, r.k);
      c.restore();
    }
    const fy = SHD + rows * RH; c.strokeStyle = INK; c.lineWidth = 3; c.setLineDash([12, 10]); c.beginPath(); c.moveTo(24, fy + 6); c.lineTo(SW - 24, fy + 6); c.stroke(); c.setLineDash([]);
    txt(c, foot, SW / 2, fy + 52, '400 44px Anton', INK);
  } else {
    c.save(); c.letterSpacing = '6px'; txt(c, 'FINE PRINT', 30, 44, '400 40px Anton', HL, 'left'); c.restore(); txt(c, 'SPORTSBOOK', SW - 28, 44, '800 22px JBM', 'rgba(245,243,238,.6)', 'right');
    const L = [['EACH LEG PAYS 1.91× AT ' + MINUS + '110', 0], ['EACH LEG IS A COIN FLIP: 1 IN 2', 0], ['10 LEGS PAY', 1], ['10 LEGS REALLY HIT', 1], ['BOOK’S CUT ON 10 LEGS', 2]];
    let y = SHD + 62; L.forEach(([s0, kind], i) => { txt(c, '•', 34, y, '800 26px JBM', INK, 'left'); txt(c, s0, 62, y, '800 25px JBM', 'rgba(11,15,20,.8)', 'left');
      if (kind) { const w = c.measureText(s0).width; c.fillStyle = kind === 2 ? RED : INK; c.fillRect(62 + w + 16, y - 16, 150, 32); if (kind === 2) txt(c, '??%', 62 + w + 91, y + 1, '400 32px Anton', PAPER); }
      for (let q = 0; q < 2; q++) { c.fillStyle = 'rgba(11,15,20,.14)'; c.fillRect(62, y + 26 + q * 14, 300 + hash(i * 5 + q) * 230, 6); } y += 106; });
    txt(c, 'THE MATH THEY LEFT OFF THE AD', SW / 2, SHD + rows * RH + 52, '400 38px Anton', 'rgba(11,15,20,.8)');
  }
  c.restore(); c.restore();
}
function coinFace(c, x, y, r, sq, win, ring) { c.save(); c.translate(x, y); c.scale(1, Math.max(.04, sq));
  c.fillStyle = '#F2B705'; c.beginPath(); c.arc(0, 0, r, 0, 7); c.fill(); c.strokeStyle = '#a87a00'; c.lineWidth = r * .1; c.stroke();
  c.strokeStyle = '#ffe27a'; c.lineWidth = r * .08; c.beginPath(); c.arc(0, 0, r * .72, 0, 7); c.stroke();
  txt(c, win ? 'W' : 'L', 0, r * .04, `400 ${r * 1.05}px Anton`, win ? '#0a7a40' : '#9b1c14');
  if (ring) { c.strokeStyle = GREEN; c.lineWidth = 8; c.globalAlpha = ring; c.beginPath(); c.arc(0, 0, r + 12, 0, 7); c.stroke(); } c.restore(); }
// coin in flight: u 0..1 over a flight, returns drawn state
function coinFlip(c, x, y, r, u, lift, turns, landWin = true, ring = 0) {
  const arc = Math.sin(clamp(u) * Math.PI) * lift, ph = clamp(u) * turns, sq = Math.abs(Math.cos(ph * Math.PI)), win = (Math.floor(ph + .5) % 2 === 0) === landWin;
  c.save(); c.fillStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.ellipse(x, y + r * .95, r * (1 - .3 * Math.sin(clamp(u) * Math.PI)), r * .22, 0, 0, 7); c.fill(); c.restore();
  coinFace(c, x, y - arc, r, sq, win, ring); }
function pie(c, x, y, r, frac, pull, labelCol) {
  c.save(); c.translate(x, y); c.shadowColor = 'rgba(0,0,0,.5)'; c.shadowBlur = 30; c.shadowOffsetY = 14; c.fillStyle = '#2fbf71'; c.beginPath(); c.arc(0, 0, r, 0, 7); c.fill(); c.restore();
  c.save(); c.translate(x, y); const a0 = -Math.PI / 2, a1 = a0 + frac * Math.PI * 2, am = (a0 + a1) / 2; c.translate(Math.cos(am) * pull, Math.sin(am) * pull);
  c.fillStyle = RED; c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, r, a0, a1); c.closePath(); c.fill(); c.strokeStyle = INK; c.lineWidth = 6; c.stroke(); c.restore();
  c.save(); c.translate(x, y); c.strokeStyle = INK; c.lineWidth = 6; c.beginPath(); c.arc(0, 0, r, 0, 7); c.stroke(); c.restore(); }
function house(c, x, y, s, col = RED, k = 1) { c.save(); c.translate(x, y); c.scale(s * k, s * k); c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 7; c.lineJoin = 'round';
  c.beginPath(); c.moveTo(-90, -30); c.lineTo(0, -120); c.lineTo(90, -30); c.closePath(); c.fill(); c.stroke(); c.fillRect(-66, -30, 132, 100); c.strokeRect(-66, -30, 132, 100);
  c.fillStyle = INK; c.fillRect(-18, 10, 36, 60); c.fillStyle = HL; c.fillRect(-52, -12, 26, 26); c.fillRect(26, -12, 26, 26); c.restore(); }
function vault(c, x, y, s, open, shake = 0) { c.save(); c.translate(x + shake, y); c.scale(s, s);
  c.save(); c.shadowColor = 'rgba(0,0,0,.55)'; c.shadowBlur = 30; c.shadowOffsetY = 16; rr(c, -230, -230, 460, 440, 36); c.fillStyle = '#5b6672'; c.fill(); c.restore();
  rr(c, -230, -230, 460, 440, 36); c.strokeStyle = INK; c.lineWidth = 8; c.stroke(); rr(c, -200, -200, 400, 380, 24); c.fillStyle = '#2b333c'; c.fill();
  c.fillStyle = '#11161c'; rr(c, -160, -160, 320, 300, 18); c.fill();
  const dw = Math.cos(open * Math.PI * .5); c.save(); c.translate(-160, 0); c.scale(Math.max(.05, dw), 1); c.translate(160, 0);
  c.fillStyle = '#8a95a3'; rr(c, -160, -160, 320, 300, 18); c.fill(); c.strokeStyle = INK; c.lineWidth = 6; c.stroke();
  c.strokeStyle = '#5b6672'; c.lineWidth = 8; c.beginPath(); c.arc(0, -10, 96, 0, 7); c.stroke(); c.fillStyle = '#c4ccd6'; c.beginPath(); c.arc(0, -10, 34, 0, 7); c.fill(); c.strokeStyle = INK; c.lineWidth = 5; c.stroke();
  for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2 + open * 3; c.beginPath(); c.moveTo(Math.cos(a) * 34, -10 + Math.sin(a) * 34); c.lineTo(Math.cos(a) * 80, -10 + Math.sin(a) * 80); c.stroke(); } c.restore();
  rr(c, -130, 150, 260, 54, 10); c.fillStyle = HL; c.fill(); c.strokeStyle = INK; c.lineWidth = 5; c.stroke(); txt(c, 'THE BOOK', 0, 179, '400 40px Anton', INK); c.restore(); }
function donationBox(c, x, y, s, shake = 0) { c.save(); c.translate(x + shake, y); c.scale(s, s);
  c.save(); c.shadowColor = 'rgba(0,0,0,.5)'; c.shadowBlur = 26; c.shadowOffsetY = 14; rr(c, -210, -150, 420, 330, 16); c.fillStyle = '#e8e4d8'; c.fill(); c.restore();
  rr(c, -210, -150, 420, 330, 16); c.strokeStyle = INK; c.lineWidth = 8; c.stroke(); rr(c, -210, -150, 420, 70, 16); c.fillStyle = RED; c.fill(); c.stroke();
  c.fillStyle = INK; rr(c, -130, -126, 260, 22, 11); c.fill(); txt(c, 'DONATIONS', 0, 50, '400 84px Anton', INK); heart(c, 0, 128, .55, RED); c.restore(); }
function hbar(c, x, y, w, h, frac, col, back = 'rgba(245,243,238,.12)') { rr(c, x, y, w, h, h / 2); c.fillStyle = back; c.fill(); if (frac > 0) { c.save(); rr(c, x, y, w, h, h / 2); c.clip(); c.fillStyle = col; c.fillRect(x, y, Math.max(h, w * frac), h); c.restore(); } }
function chip(c, s, x, y, font, fg, bg, padX = 22, h = 52) { c.font = font; const w = c.measureText(s).width + padX * 2; rr(c, x - w / 2, y - h / 2, w, h, h / 2); c.fillStyle = bg; c.fill(); txt(c, s, x, y + 1, font, fg); return w; }
function money(c, x, y, rot, s) { bill(c, x, y, rot, s); }
