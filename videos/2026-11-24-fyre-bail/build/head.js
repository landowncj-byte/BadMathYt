<!doctype html>
<html><head><meta charset="utf-8"><title>Decoded: Fyre Bail</title>
<style>html,body{margin:0;background:#0B0F14;overflow:hidden}canvas{display:block}</style></head>
<body><canvas id="c" width="1080" height="1920"></canvas>
<script src="../../../brand/storyteller.js"></script>
<script src="words.js"></script>
<script>
// Bad Math — DECODED: FYRE FESTIVAL founder on bail. Every frame is a pure function of t.
const W = 1080, H = 1920, DUR = 53.33;
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

