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
function tag(c, x, y, s, rot) { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s); c.strokeStyle = '#c9ced6'; c.lineWidth = 6; c.beginPath(); c.moveTo(0, -330); c.lineTo(0, -120); c.stroke();
  c.save(); c.shadowColor = 'rgba(0,0,0,.55)'; c.shadowBlur = 26; c.shadowOffsetY = 12; c.fillStyle = HL; c.beginPath(); c.moveTo(-190, -110); c.lineTo(190, -110); c.lineTo(190, 160); c.lineTo(-190, 160); c.closePath(); c.fill(); c.restore();
  c.fillStyle = INK; c.beginPath(); c.arc(0, -78, 15, 0, 7); c.fill(); txt(c, '$6', 0, 22, '400 200px Anton', INK); txt(c, '/ DAY', 0, 128, '800 54px JBM', 'rgba(11,15,20,.8)'); c.restore(); }
function arrowR(c, x, y, len, col, w = 6) { c.save(); c.strokeStyle = col; c.fillStyle = col; c.lineWidth = w; c.lineCap = 'round'; c.beginPath(); c.moveTo(x, y); c.lineTo(x + len - 6, y); c.stroke(); c.beginPath(); c.moveTo(x + len, y); c.lineTo(x + len - 18, y - 13); c.lineTo(x + len - 18, y + 13); c.closePath(); c.fill(); c.restore(); }
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
