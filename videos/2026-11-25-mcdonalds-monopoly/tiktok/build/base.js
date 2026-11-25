// Shared drawn assets for the FTX cuts (re-used from the YouTube build). Every frame is a pure function of t.
const W = 1080, H = 1920;
const C = document.getElementById('c'), X = C.getContext('2d');
const OFF = document.createElement('canvas'); OFF.width = W; OFF.height = H; const O = OFF.getContext('2d');
const TMP = document.createElement('canvas'); TMP.width = W; TMP.height = H; const T = TMP.getContext('2d');
const INK = '#0B0F14', RED = '#FF3B30', GREEN = '#00D26A', PAPER = '#F5F3EE', HL = '#FFD60A', STEEL = '#5b6573', DARK = '#151b23';
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const lin = (t, a, b) => clamp((t - a) / (b - a));
const eo = x => 1 - Math.pow(1 - clamp(x), 3), ei = x => Math.pow(clamp(x), 3);
const eio = x => { x = clamp(x); return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
const back = x => { x = clamp(x); const c1 = 1.9, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
const lerp = (a, b, x) => a + (b - a) * x;
const hash = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
const fmt = n => Math.round(n).toLocaleString('en-US');

// ---------- primitives ----------
function rr(c, x, y, w, h, r) { c.beginPath(); c.roundRect(x, y, w, h, r); }
function txt(c, s, x, y, font, color, align = 'center', base = 'middle') { c.font = font; c.fillStyle = color; c.textAlign = align; c.textBaseline = base; c.fillText(s, x, y); }
function glowTxt(c, s, x, y, font, color, blur) { c.save(); c.shadowColor = color; c.shadowBlur = blur; txt(c, s, x, y, font, color); c.restore(); }
function stamp(c, s, x, y, size, color, rot, k) {
  if (k <= 0) return;
  const sc = lerp(2.6, 1, back(k)); c.save(); c.translate(x, y); c.rotate(rot); c.scale(sc, sc); c.globalAlpha = clamp(k * 3);
  c.font = `400 ${size}px Anton`; const w = c.measureText(s).width + size * .6, h = size * 1.25;
  c.fillStyle = 'rgba(11,15,20,.78)'; rr(c, -w / 2, -h / 2, w, h, size * .12); c.fill();
  c.strokeStyle = color; c.lineWidth = size * .09; rr(c, -w / 2, -h / 2, w, h, size * .12); c.stroke();
  c.fillStyle = color; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(s, 0, size * .04); c.restore();
}
function bgGrid(c, t, tint = 'rgba(255,59,48,.05)') { c.fillStyle = INK; c.fillRect(0, 0, W, H); c.strokeStyle = tint; c.lineWidth = 2; const o = (t * 30) % 90; for (let x = -90 + o; x < W; x += 90) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke(); } for (let y = -90 + o; y < H; y += 90) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); } }
function vignette(c, a = .7) { const g = c.createRadialGradient(540, 900, 300, 540, 900, 1250); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(0,0,0,${a})`); c.fillStyle = g; c.fillRect(0, 0, W, H); }
function bill(c, x, y, w, rot, a = 1) { c.save(); c.translate(x, y); c.rotate(rot); c.globalAlpha = a; rr(c, -w / 2, -w * .24, w, w * .48, 5); c.fillStyle = '#1f8f55'; c.fill(); c.strokeStyle = '#7ef0b0'; c.lineWidth = 3; c.stroke(); c.beginPath(); c.arc(0, 0, w * .13, 0, 7); c.stroke(); c.restore(); }
function silhouette(c, cx, cy, s, color) { c.save(); c.fillStyle = color; c.beginPath(); c.arc(cx, cy - s * .55, s * .26, 0, 7); c.fill(); c.beginPath(); c.moveTo(cx - s * .6, cy + s * .55); c.quadraticCurveTo(cx - s * .6, cy - s * .15, cx, cy - s * .2); c.quadraticCurveTo(cx + s * .6, cy - s * .15, cx + s * .6, cy + s * .55); c.closePath(); c.fill(); c.restore(); }
function building(c, x, y, w, h, label, col, t, lit = 1) {
  c.save(); const g = c.createLinearGradient(x, y, x + w, y); g.addColorStop(0, '#1d242e'); g.addColorStop(.5, '#2f3946'); g.addColorStop(1, '#1d242e'); rr(c, x, y, w, h, 10); c.fillStyle = g; c.fill();
  c.strokeStyle = col; c.lineWidth = 4; rr(c, x, y, w, h, 10); c.stroke();
  for (let r = 0; r < 7; r++) for (let q = 0; q < 3; q++) { const on = hash(r * 3 + q + Math.floor(t * 2 + r) * .3) > .35; c.fillStyle = on ? `rgba(255,214,10,${.75 * lit})` : 'rgba(255,255,255,.07)'; c.fillRect(x + 30 + q * ((w - 60) / 3), y + 90 + r * ((h - 130) / 7), (w - 60) / 3 - 14, (h - 130) / 7 - 16); }
  rr(c, x - 6, y - 56, w + 12, 66, 8); c.fillStyle = col; c.fill(); txt(c, label, x + w / 2, y - 22, '400 44px Anton', INK); c.restore();
}
function vault(c, x, y, w, h, level, label, t, labelCol = PAPER) {
  c.save(); const sg = c.createLinearGradient(x, y, x + w, y + h); sg.addColorStop(0, '#46505d'); sg.addColorStop(.5, '#2b333d'); sg.addColorStop(1, '#4a5461');
  rr(c, x, y, w, h, 28); c.fillStyle = sg; c.fill(); c.strokeStyle = '#7d8896'; c.lineWidth = 5; c.stroke();
  const ix = x + w * .08, iy = y + h * .2, iw = w * .84, ih = h * .66;
  rr(c, ix, iy, iw, ih, 14); c.fillStyle = '#080b0f'; c.fill(); c.save(); rr(c, ix, iy, iw, ih, 14); c.clip();
  const top = iy + ih * (1 - level); const cols = 5, bw = iw / cols;
  for (let q = 0; q < cols; q++) for (let r = 0; r < 12; r++) { const by = iy + ih - (r + 1) * (ih / 12); if (by + ih / 12 <= top - 2) continue; const wob = Math.sin(t * 6 + q * 2 + r) * 1.5; c.fillStyle = (r + q) % 2 ? '#1f8f55' : '#27a862'; c.fillRect(ix + q * bw + 4 + wob, Math.max(by, top) + 3, bw - 8, ih / 12 - 6); }
  c.restore();
  for (const [bx, by] of [[x + 22, y + 22], [x + w - 22, y + 22], [x + 22, y + h - 22], [x + w - 22, y + h - 22]]) { c.fillStyle = '#9aa5b3'; c.beginPath(); c.arc(bx, by, 8, 0, 7); c.fill(); }
  rr(c, x + w * .12, y - 26, w * .76, 62, 8); c.fillStyle = '#0B0F14'; c.fill(); c.strokeStyle = labelCol; c.lineWidth = 4; c.stroke(); txt(c, label, x + w / 2, y + 6, '400 40px Anton', labelCol);
  c.restore();
}
function plane(c, x, y, ang, s) { c.save(); c.translate(x, y); c.rotate(ang); c.scale(s, s); c.fillStyle = PAPER; c.beginPath(); c.moveTo(40, 0); c.lineTo(-36, -26); c.lineTo(-14, 0); c.lineTo(-36, 26); c.closePath(); c.fill(); c.strokeStyle = '#9aa5b3'; c.lineWidth = 3; c.beginPath(); c.moveTo(40, 0); c.lineTo(-14, 0); c.lineTo(-24, 14); c.stroke(); c.restore(); }
function heart(c, x, y, s, col, a = 1) { c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = a; c.fillStyle = col; c.beginPath(); c.moveTo(0, 30); c.bezierCurveTo(-60, -10, -30, -52, 0, -22); c.bezierCurveTo(30, -52, 60, -10, 0, 30); c.fill(); c.restore(); }
const mix = (a, b, x) => a + (b - a) * x;
function steelGrad(c, x0, y0, x1, y1) { const g = c.createLinearGradient(x0, y0, x1, y1); g.addColorStop(0, '#eef2f7'); g.addColorStop(.45, '#a9b4c2'); g.addColorStop(1, '#5b6573'); return g; }
function ticket(c, x, y, w, h, rot, sc, body, ink, notchCol) {
  c.save(); c.translate(x, y); c.rotate(rot); c.scale(sc, sc);
  c.shadowColor = 'rgba(0,0,0,.5)'; c.shadowBlur = 30; c.shadowOffsetY = 12; rr(c, -w / 2, -h / 2, w, h, 22); c.fillStyle = body; c.fill(); c.shadowBlur = 0; c.shadowOffsetY = 0;
  c.strokeStyle = ink; c.lineWidth = 4; c.setLineDash([10, 9]); c.beginPath(); c.moveTo(w / 2 - w * .26, -h / 2 + 18); c.lineTo(w / 2 - w * .26, h / 2 - 18); c.stroke(); c.setLineDash([]);
  c.fillStyle = notchCol; for (const sx of [-w / 2, w / 2]) { c.beginPath(); c.arc(sx, 0, h * .075, 0, 7); c.fill(); }
  c.beginPath(); c.arc(w / 2 - w * .26, -h / 2, h * .06, 0, 7); c.arc(w / 2 - w * .26, h / 2, h * .06, 0, 7); c.fill();
  c.restore();
}
function barcode(c, x, y, w, h, col) { c.fillStyle = col; let px = x; let i = 0; while (px < x + w) { const bw = 3 + hash(i++ * 1.7) * 7; c.fillRect(px, y, bw, h); px += bw + 3 + hash(i * 3.1) * 4; } }
function crack(c, cx, cy, n, len, k, seed) { c.save(); c.strokeStyle = 'rgba(11,15,20,.9)'; c.lineWidth = 5; c.lineCap = 'round'; c.lineJoin = 'round'; for (let i = 0; i < n; i++) { const a0 = hash(i + seed) * 6.28; let x = cx, y = cy, a = a0; c.beginPath(); c.moveTo(x, y); const steps = Math.floor(10 * k); for (let s = 0; s < steps; s++) { a += (hash(i * 7 + s + seed) - .5) * 1.1; x += Math.cos(a) * len / 10; y += Math.sin(a) * len / 10; c.lineTo(x, y); } c.stroke(); } c.restore(); }
const goldG = (c, x0, y0, x1, y1) => { const g = c.createLinearGradient(x0, y0, x1, y1); g.addColorStop(0, '#ffe27a'); g.addColorStop(.5, '#f2b705'); g.addColorStop(1, '#c98f00'); return g; };
// big Anton text with ink outline, slam-in scale; maxW fits the width
function big(c, s, x, y, size, col, k = 1, rot = 0, glow = 0, maxW = 0) {
  if (k <= 0) return; c.save(); c.font = `400 ${size}px Anton`; if (maxW) { const w = c.measureText(s).width; if (w > maxW) size = Math.floor(size * maxW / w); }
  c.globalAlpha = clamp(k * 2.5); const sc = lerp(1.4, 1, back(k)); c.translate(x, y); c.rotate(rot); c.scale(sc, sc);
  if (glow) { c.shadowColor = col; c.shadowBlur = glow; } c.lineJoin = 'round'; c.lineWidth = size * .13; c.strokeStyle = 'rgba(0,0,0,.85)'; c.font = `400 ${size}px Anton`; c.textAlign = 'center'; c.textBaseline = 'middle';
  c.strokeText(s, 0, 0); c.shadowBlur = glow ? glow : 0; c.fillStyle = col; c.fillText(s, 0, 0); c.restore();
}
// VIP package ticket (800x380 design space) drawn at (x,y) with scale s
const paperPlane = (c, p, P0, P1, P2, sz = 1.1) => { const bz = u => [(1 - u) * (1 - u) * P0[0] + 2 * (1 - u) * u * P1[0] + u * u * P2[0], (1 - u) * (1 - u) * P0[1] + 2 * (1 - u) * u * P1[1] + u * u * P2[1]]; const e = eo(p); const [x, y] = bz(e), [x2, y2] = bz(Math.min(1, e + .02));
  c.save(); c.strokeStyle = 'rgba(245,243,238,.5)'; c.lineWidth = 4; c.setLineDash([4, 14]); c.lineCap = 'round'; c.beginPath(); for (let i = 0; i <= 20; i++) { const [tx, ty] = bz(e * i / 20); i ? c.lineTo(tx, ty) : c.moveTo(tx, ty); } c.stroke(); c.restore();
  c.save(); c.globalAlpha = 1 - lin(p, .8, 1); plane(c, x, y, Math.atan2(y2 - y, x2 - x), sz); c.restore(); };
function jailBars(c, drop, bt = 300, bb = 1180, x0 = 90, x1 = 990) { // bars slam down
  c.save(); const rail = (bb - bt) * drop; const n = 9, gap = (x1 - x0) / (n - 1); for (let i = 0; i < n; i++) { const bx = x0 + i * gap; const g = c.createLinearGradient(bx - 20, 0, bx + 20, 0); g.addColorStop(0, '#2a323d'); g.addColorStop(.5, '#a7b1bf'); g.addColorStop(1, '#2a323d'); c.fillStyle = g; rr(c, bx - 20, bt, 40, rail, 18); c.fill(); }
  c.fillStyle = '#5b6573'; if (drop > 0) { c.fillRect(x0 - 40, bt, x1 - x0 + 80, 26); c.fillRect(x0 - 40, bt + rail - 26, x1 - x0 + 80, 26); } c.restore(); }
