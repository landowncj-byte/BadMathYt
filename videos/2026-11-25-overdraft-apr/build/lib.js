// Bad Math What If engine: overdraft-apr. Shared by the YouTube, TikTok and IG/FB cuts. Pure functions of t.
const W = 1080, H = 1920;
const C = document.getElementById('c'), X = C.getContext('2d');
const OFF = document.createElement('canvas'); OFF.width = W; OFF.height = H; const O = OFF.getContext('2d');
const TMP = document.createElement('canvas'); TMP.width = W; TMP.height = H; const T = TMP.getContext('2d');
const INK = '#0B0F14', RED = '#FF3B30', GREEN = '#00D26A', PAPER = '#F5F3EE', HL = '#FFD60A', GOLD = '#F2B705';
const NAVY = '#14305C', BLUE = '#2F6BFF', SCR = '#F1F4F9';
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const lin = (t, a, b) => clamp((t - a) / (b - a));
const eo = x => 1 - Math.pow(1 - clamp(x), 3);
const eio = x => { x = clamp(x); return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
const back = x => { x = clamp(x); const c1 = 1.9, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
const lerp = (a, b, x) => a + (b - a) * x;
const hash = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
const fmt = n => Math.round(n).toLocaleString('en-US');
function rr(c, x, y, w, h, r) { c.beginPath(); c.roundRect(x, y, w, h, r); }
function txt(c, s, x, y, font, color, align = 'center', base = 'middle') { c.font = font; c.fillStyle = color; c.textAlign = align; c.textBaseline = base; c.fillText(s, x, y); }
function stamp(c, s, x, y, size, color, rot, k, fill) {
  if (k <= 0) return; const sc = lerp(2.6, 1, back(k)); c.save(); c.translate(x, y); c.rotate(rot); c.scale(sc, sc); c.globalAlpha = clamp(k * 3);
  c.font = `400 ${size}px Anton`; const w = c.measureText(s).width + size * .6, h = size * 1.25;
  if (fill) { rr(c, -w / 2, -h / 2, w, h, size * .12); c.fillStyle = fill; c.fill(); }
  c.strokeStyle = color; c.lineWidth = size * .09; rr(c, -w / 2, -h / 2, w, h, size * .12); c.stroke();
  c.fillStyle = color; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(s, 0, size * .04); c.restore();
}
// multi-line stamp: lines = [[text,size],...]
function stampN(c, lines, x, y, color, rot, k, fill, maxW = 900) {
  if (k <= 0) return; const sc = lerp(2.4, 1, back(k)); c.save(); c.translate(x, y); c.rotate(rot); c.scale(sc, sc); c.globalAlpha = clamp(k * 3);
  let w = 0, h = 0; for (const [s, sz] of lines) { c.font = `400 ${sz}px Anton`; w = Math.max(w, c.measureText(s).width); h += sz * 1.12; } w += 70; h += 40;
  if (w > maxW) { const f = maxW / w; c.scale(f, f); }
  if (fill) { rr(c, -w / 2, -h / 2, w, h, 18); c.fillStyle = fill; c.fill(); } c.strokeStyle = color; c.lineWidth = 12; rr(c, -w / 2, -h / 2, w, h, 18); c.stroke();
  let yy = -h / 2 + 20; for (const [s, sz] of lines) { txt(c, s, 0, yy + sz * .56, `400 ${sz}px Anton`, color); yy += sz * 1.12; } c.restore();
}
function bg(c, t, glow = 'rgba(255,214,10,.13)') {
  c.fillStyle = INK; c.fillRect(0, 0, W, H);
  const g = c.createRadialGradient(540, 760, 50, 540, 760, 950); g.addColorStop(0, glow); g.addColorStop(1, 'rgba(255,214,10,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  c.strokeStyle = 'rgba(245,243,238,.045)'; c.lineWidth = 2; const o = (t * 18) % 80;
  for (let x = -80 + o; x < W + 80; x += 80) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke(); }
  for (let y = -80 + o; y < H + 80; y += 80) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
}
function rays(c, t, col = '255,59,48') { const g = c.createRadialGradient(540, 760, 40, 540, 760, 950); g.addColorStop(0, `rgba(${col},.42)`); g.addColorStop(1, `rgba(${col},0)`); c.fillStyle = g; c.fillRect(0, 0, W, H);
  c.save(); c.translate(540, 780); c.globalAlpha = .1; c.fillStyle = `rgb(${col})`; for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + t * .25; c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, 1500, a, a + .15); c.closePath(); c.fill(); } c.restore(); }
function shadowBox(c, x, y, w, h, r, fill, stroke) { c.save(); c.shadowColor = 'rgba(0,0,0,.5)'; c.shadowBlur = 24; c.shadowOffsetY = 10; rr(c, x, y, w, h, r); c.fillStyle = fill; c.fill(); c.restore(); if (stroke) { rr(c, x, y, w, h, r); c.strokeStyle = stroke; c.lineWidth = 4; c.stroke(); } }
// big outlined hero text; shrinks to maxW
const hero = (c, s, x, y, size, col, maxW = 940, fam = 'Anton', wt = 400, rot = 0, lw = .09) => { c.save(); c.font = `${wt} ${size}px ${fam}`; const w = c.measureText(s).width; if (w > maxW) size *= maxW / w; c.translate(x, y); c.rotate(rot);
  c.font = `${wt} ${size}px ${fam}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineJoin = 'round'; c.lineWidth = size * lw; c.strokeStyle = 'rgba(0,0,0,.88)'; c.strokeText(s, 0, 0); c.fillStyle = col; c.fillText(s, 0, 0); c.restore(); };
const slam = (c, k, x, y, f) => { if (k <= 0) return; const s = lerp(1.25, 1, eo(k)); c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(k * 4 + .2); f(); c.restore(); };
const HC = ['#FFD60A', '#00D26A', '#FF6B3D', '#4DA3FF', '#C77DFF'];
function heart(c, x, y, s, col) { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = col; c.beginPath(); c.moveTo(0, 30); c.bezierCurveTo(-60, -10, -40, -55, 0, -22); c.bezierCurveTo(40, -55, 60, -10, 0, 30); c.fill(); c.restore(); }
function plane(c, x, y, rot, s, col = PAPER) { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s); c.fillStyle = col; c.strokeStyle = 'rgba(11,15,20,.35)'; c.lineWidth = 2;
  c.beginPath(); c.moveTo(60, 0); c.lineTo(-50, -34); c.lineTo(-26, 0); c.lineTo(-50, 34); c.closePath(); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(60, 0); c.lineTo(-26, 0); c.lineTo(-34, 14); c.closePath(); c.fillStyle = '#c9c4b6'; c.fill(); c.restore(); }
function bookmark(c, x, y, s, col, k) { c.save(); c.translate(x, y); c.scale(s * k, s * k); c.shadowColor = 'rgba(0,0,0,.5)'; c.shadowBlur = 24; c.beginPath(); c.moveTo(-90, -150); c.lineTo(90, -150); c.lineTo(90, 150); c.lineTo(0, 80); c.lineTo(-90, 150); c.closePath(); c.fillStyle = col; c.fill(); c.shadowBlur = 0; c.lineWidth = 8; c.strokeStyle = 'rgba(11,15,20,.85)'; c.lineJoin = 'round'; c.stroke(); c.restore(); }
function coin(c, x, y, r, rot = 0, sq = 1, label = '$') { c.save(); c.translate(x, y); c.rotate(rot); c.scale(1, sq); c.fillStyle = '#F2B705'; c.beginPath(); c.arc(0, 0, r, 0, 7); c.fill(); c.strokeStyle = '#a87a00'; c.lineWidth = r * .14; c.stroke();
  c.strokeStyle = '#ffe27a'; c.lineWidth = r * .1; c.beginPath(); c.arc(0, 0, r * .68, 0, 7); c.stroke(); txt(c, label, 0, r * .05, `800 ${r * (label.length > 1 ? .8 : 1.0)}px JBM`, '#a87a00'); c.restore(); }
function bill(c, x, y, rot, s, sq = 1) { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s * sq); c.fillStyle = '#2fbf71'; rr(c, -52, -26, 104, 52, 6); c.fill(); c.strokeStyle = '#0a7a40'; c.lineWidth = 4; c.stroke();
  c.strokeStyle = 'rgba(255,255,255,.55)'; c.lineWidth = 2.5; rr(c, -44, -19, 88, 38, 4); c.stroke(); c.fillStyle = '#d9ffe8'; c.beginPath(); c.arc(0, 0, 14, 0, 7); c.fill(); txt(c, '$', 0, 1, '800 20px JBM', '#0a7a40'); c.restore(); }
function rain(c, t, t0, n = 60) { for (let i = 0; i < n; i++) { const ts = t0 + hash(i) * 1.2, d = t - ts; if (d < 0) continue; const y = -60 + d * (700 + hash(i + 3) * 500); if (y > 2000) continue; const x = hash(i + 1) * 1100 - 10 + Math.sin(d * 3 + i) * 40;
  if (i % 4 === 0) coin(c, x, y, 20, d * 6, Math.abs(Math.cos(d * 8 + i))); else bill(c, x, y, Math.sin(d * 2.5 + i) * .9, .9, Math.abs(Math.cos(d * 5 + i)) * .85 + .15); } }
function finger(c, x, y, rot = -.38, press = 0) { // (x,y) = fingertip
  c.save(); c.translate(x, y + press * 10); c.rotate(rot); c.lineJoin = 'round'; c.lineWidth = 6; c.strokeStyle = 'rgba(11,15,20,.9)';
  c.fillStyle = '#3a4a6b'; rr(c, -78, 330, 156, 260, 14); c.fill(); c.stroke();
  c.fillStyle = '#EDB98F'; rr(c, -70, 180, 140, 190, 46); c.fill(); c.stroke();
  rr(c, -26, 0, 52, 260, 26); c.fill(); c.stroke(); c.fillStyle = 'rgba(255,255,255,.25)'; rr(c, -14, 12, 14, 70, 7); c.fill();
  c.strokeStyle = 'rgba(11,15,20,.45)'; c.lineWidth = 4; for (const dx of [-40, -14]) { c.beginPath(); c.moveTo(dx + 22, 190); c.lineTo(dx + 22, 232); c.stroke(); } c.restore(); }
function ripple(c, x, y, k, col = 'rgba(255,255,255,') { if (k <= 0 || k >= 1) return; c.save(); c.strokeStyle = `${col}${1 - k})`; c.lineWidth = 8; c.beginPath(); c.arc(x, y, 20 + 90 * k, 0, 7); c.stroke(); c.restore(); }
function toggle(c, x, y, k, w = 150, h = 78) { // x,y = center; k 0..1 (on)
  c.save(); c.translate(x, y); rr(c, -w / 2, -h / 2, w, h, h / 2); c.fillStyle = k > .5 ? GREEN : '#9aa5b5'; c.fill();
  c.fillStyle = '#fff'; c.shadowColor = 'rgba(0,0,0,.35)'; c.shadowBlur = 8; c.beginPath(); c.arc(lerp(-w / 2 + h / 2, w / 2 - h / 2, eo(k)), 0, h / 2 - 7, 0, 7); c.fill(); c.restore(); }
// phone: draws body then calls fn(c, sw, sh) in screen coordinates
function phone(c, cx, cy, w, h, fn, rot = 0, sc = 1) {
  c.save(); c.translate(cx, cy); c.rotate(rot); c.scale(sc, sc); c.translate(-w / 2, -h / 2);
  c.save(); c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 40; c.shadowOffsetY = 18; rr(c, 0, 0, w, h, 64); c.fillStyle = '#222b38'; c.fill(); c.restore();
  rr(c, 0, 0, w, h, 64); c.strokeStyle = '#5b6b82'; c.lineWidth = 6; c.stroke();
  c.save(); c.translate(14, 14); const sw = w - 28, sh = h - 28; rr(c, 0, 0, sw, sh, 52); c.clip(); c.fillStyle = SCR; c.fillRect(0, 0, sw, sh); fn(c, sw, sh); c.restore();
  c.fillStyle = '#0b0f14'; rr(c, w / 2 - 60, 22, 120, 30, 15); c.fill(); c.restore(); }
// generic bank app screen. o: {toggle (0..1), bal, balCol, label, hi}
function bankScreen(c, t, sw, sh, o = {}) {
  c.fillStyle = NAVY; c.fillRect(0, 0, sw, 150);
  c.fillStyle = '#fff'; c.beginPath(); c.arc(54, 98, 22, 0, 7); c.fill(); c.strokeStyle = NAVY; c.lineWidth = 5; c.beginPath(); c.arc(54, 98, 12, 0, 7); c.stroke(); for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2 + Math.PI / 4; c.beginPath(); c.moveTo(54 + Math.cos(a) * 12, 98 + Math.sin(a) * 12); c.lineTo(54 + Math.cos(a) * 19, 98 + Math.sin(a) * 19); c.stroke(); }
  txt(c, 'BANK', 92, 99, '800 38px Inter', '#fff', 'left');
  txt(c, 'AVAILABLE BALANCE', 36, 200, '800 21px JBM', '#6b7a90', 'left'); txt(c, o.bal || '$1,240.18', 36, 252, '800 62px JBM', o.balCol || INK, 'left');
  for (let i = 0; i < 2; i++) { c.fillStyle = '#dfe5ee'; rr(c, 36, 316 + i * 62, sw * .55 - i * 40, 22, 11); c.fill(); c.fillStyle = '#e9edf4'; rr(c, 36, 346 + i * 62, sw * .3, 16, 8); c.fill(); }
  const ry = 470, hi = o.hi || 0; shadowBox(c, 22, ry, sw - 44, 170, 24, '#fff', hi > 0 ? `rgba(255,59,48,${hi})` : '#dbe2ec');
  txt(c, o.label || 'OVERDRAFT PROTECTION:', 44, ry + 46, '800 22px JBM', NAVY, 'left');
  const on = o.toggle ?? 1; txt(c, on > .5 ? 'ON' : 'OFF', 44, ry + 112, '800 56px Inter', on > .5 ? GREEN : '#8793a6', 'left'); toggle(c, sw - 110, ry + 100, on, 130, 68);
  for (let i = 0; i < 2; i++) { c.fillStyle = '#e4e9f1'; rr(c, 36, 680 + i * 56, sw * .7 - i * 90, 20, 10); c.fill(); }
}
// receipt: paper hangs from a slot at (x,y). lines: [left,right,at,style] style: 'h' header, 'r' red fee, 'n' normal, 'd' dashes
function receipt(c, t, x, y, w, lines, rot = 0) {
  c.save(); c.translate(x, y); c.rotate(rot);
  let hh = 24, shown = [];
  for (const L of lines) { const k = lin(t, L[2], L[2] + .18); if (k <= 0) break; const lh = L[3] === 'r' ? 92 : L[3] === 'h' ? 74 : L[3] === 'd' ? 34 : 64; shown.push([L, k, hh, lh]); hh += lh; }
  const ph = hh + 36;
  c.save(); c.shadowColor = 'rgba(0,0,0,.55)'; c.shadowBlur = 26; c.shadowOffsetY = 12; c.fillStyle = '#F7F4EA'; c.beginPath(); c.moveTo(-w / 2, 0); c.lineTo(w / 2, 0); c.lineTo(w / 2, ph);
  const n = 18; for (let i = n; i >= 0; i--) c.lineTo(-w / 2 + w * i / n, ph + (i % 2 ? 0 : 16)); c.closePath(); c.fill(); c.restore();
  c.save(); c.beginPath(); c.rect(-w / 2, 0, w, ph + 20); c.clip();
  for (const [L, k, ly, lh] of shown) { const st = L[3]; const cy = ly + lh / 2;
    if (st === 'r') { c.fillStyle = 'rgba(255,59,48,.14)'; c.fillRect(-w / 2 + 14, ly + 4, w - 28, lh - 8); c.save(); txt(c, L[0], -w / 2 + 30, cy, '800 28px JBM', RED, 'left'); const kk = 1 + .25 * Math.exp(-(t - L[2]) * 8); c.translate(w / 2 - 28, cy); c.scale(kk, kk); txt(c, L[1], 0, 0, '800 54px JBM', RED, 'right'); c.restore(); }
    else if (st === 'h') txt(c, L[0], 0, cy, '800 34px JBM', INK);
    else if (st === 'd') { c.strokeStyle = 'rgba(11,15,20,.45)'; c.lineWidth = 3; c.setLineDash([10, 8]); c.beginPath(); c.moveTo(-w / 2 + 24, cy); c.lineTo(w / 2 - 24, cy); c.stroke(); c.setLineDash([]); }
    else { txt(c, L[0], -w / 2 + 30, cy, '700 30px JBM', INK, 'left'); txt(c, L[1], w / 2 - 28, cy, '800 34px JBM', INK, 'right'); } }
  c.restore(); c.fillStyle = '#1a222d'; rr(c, -w / 2 - 30, -26, w + 60, 38, 12); c.fill(); c.restore(); return ph; }
function shield(c, t, x, y, s, crack, split, face = 1) { // sarcastic shield. crack 0..1, split 0..1
  const path = () => { c.beginPath(); c.moveTo(-150, -190); c.quadraticCurveTo(0, -250, 150, -190); c.lineTo(150, -20); c.quadraticCurveTo(140, 130, 0, 230); c.quadraticCurveTo(-140, 130, -150, -20); c.closePath(); };
  const ZG = [[0, -230], [26, -150], [-22, -80], [30, -10], [-26, 60], [24, 130], [0, 230]];
  const body = () => { path(); const g = c.createLinearGradient(-150, -200, 150, 230); g.addColorStop(0, '#5C8BFF'); g.addColorStop(1, '#1a3f9a'); c.fillStyle = g; c.fill(); c.lineWidth = 12; c.strokeStyle = 'rgba(11,15,20,.9)'; c.lineJoin = 'round'; c.stroke();
    c.save(); c.scale(.8, .8); c.translate(0, -5); path(); c.strokeStyle = 'rgba(255,255,255,.55)'; c.lineWidth = 8; c.stroke(); c.restore();
    if (face) { for (const sx of [-1, 1]) { c.fillStyle = '#fff'; c.beginPath(); c.ellipse(sx * 52, -45, 26, 22, 0, 0, 7); c.fill(); c.fillStyle = INK; c.beginPath(); c.arc(sx * 52 + 12, -40, 11, 0, 7); c.fill();
      c.fillStyle = '#2a58c9'; c.fillRect(sx * 52 - 28, -70, 56, 28);
      c.strokeStyle = INK; c.lineWidth = 8; c.lineCap = 'round'; c.beginPath(); c.moveTo(sx * 52 - 26, -42); c.lineTo(sx * 52 + 26, -42); c.stroke(); }
      c.strokeStyle = INK; c.lineWidth = 8; c.beginPath(); c.moveTo(-86, -92); c.lineTo(-22, -84); c.stroke(); c.beginPath(); c.moveTo(22, -108); c.quadraticCurveTo(52, -128, 84, -100); c.stroke();
      c.lineWidth = 9; c.beginPath(); c.moveTo(-50, 52); c.quadraticCurveTo(10, 78, 62, 38); c.stroke(); c.beginPath(); c.moveTo(62, 38); c.lineTo(72, 28); c.stroke(); } };
  c.save(); c.translate(x, y); c.scale(s, s);
  if (split > 0) { const gl = c.createRadialGradient(0, 0, 10, 0, 0, 300); gl.addColorStop(0, `rgba(255,214,10,${.8 * split})`); gl.addColorStop(1, 'rgba(255,214,10,0)'); c.fillStyle = gl; c.fillRect(-400, -400, 800, 800);
    for (const sg of [-1, 1]) { c.save(); c.translate(sg * split * 70, split * 40); c.rotate(sg * split * .3); c.beginPath(); c.moveTo(sg * 400, -400); for (const [zx, zy] of ZG) c.lineTo(zx, zy); c.lineTo(sg * 400, 400); c.closePath(); c.clip(); body(); c.restore(); } }
  else { body(); if (crack > 0) { c.strokeStyle = '#000'; c.lineWidth = 9; c.lineCap = 'round'; c.lineJoin = 'round'; c.shadowColor = HL; c.shadowBlur = 22; c.beginPath(); const n = Math.floor(crack * (ZG.length - 1)); c.moveTo(ZG[0][0], ZG[0][1]); for (let i = 1; i <= n; i++) c.lineTo(ZG[i][0], ZG[i][1]);
    if (n < ZG.length - 1) { const f = crack * (ZG.length - 1) - n; c.lineTo(lerp(ZG[n][0], ZG[n + 1][0], f), lerp(ZG[n][1], ZG[n + 1][1], f)); } c.stroke(); } }
  c.restore(); }
function errorDialog(c, k, x, y, msg) { if (k <= 0) return; c.save(); c.translate(x, y); const s = back(k); c.scale(s, s); const w = 700, h = 270;
  shadowBox(c, -w / 2, -h / 2, w, h, 24, '#fff'); c.fillStyle = RED; rr(c, -w / 2, -h / 2, w, 70, [24, 24, 0, 0]); c.fill(); txt(c, 'ERROR', -w / 2 + 28, -h / 2 + 36, '800 34px JBM', '#fff', 'left'); txt(c, 'X', w / 2 - 40, -h / 2 + 36, '800 34px JBM', '#fff');
  const sz = Math.min(62, 640 / (c.measureText(msg).width / 62 + .01)); txt(c, msg, 0, 10, `400 ${Math.min(62, 620 / (msg.length * .5))}px Anton`, INK, 'center'); c.fillStyle = INK; rr(c, -70, 66, 140, 52, 12); c.fill(); txt(c, 'OK', 0, 93, '800 30px Inter', '#fff'); c.restore(); }
// red hand-drawn circle (MEME #3)
function redCircle(c, x, y, rx, ry, k) { if (k <= 0) return; c.save(); c.strokeStyle = RED; c.lineWidth = 12; c.lineCap = 'round'; c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 8; c.beginPath(); const n = 60 * k;
  for (let i = 0; i <= n; i++) { const a = -2.2 + i / 60 * Math.PI * 2.15, r = 1 + .05 * Math.sin(i * .3) + i / 60 * .06; const px = x + Math.cos(a) * rx * r, py = y + Math.sin(a) * ry * r; i ? c.lineTo(px, py) : c.moveTo(px, py); } c.stroke(); c.restore(); }
function arrowTo(c, x0, y0, x1, y1, k, col = RED) { if (k <= 0) return; const x = lerp(x0, x1, k), y = lerp(y0, y1, k); c.save(); c.strokeStyle = col; c.fillStyle = col; c.lineWidth = 12; c.lineCap = 'round'; c.beginPath(); c.moveTo(x0, y0); c.lineTo(x, y); c.stroke();
  const a = Math.atan2(y1 - y0, x1 - x0); c.beginPath(); c.moveTo(x, y); c.lineTo(x - Math.cos(a - .5) * 44, y - Math.sin(a - .5) * 44); c.lineTo(x - Math.cos(a + .5) * 44, y - Math.sin(a + .5) * 44); c.closePath(); c.fill(); c.restore(); }
// ---------- shared HUD pieces ----------
function footnote(c, y, size = 17, a = .7) {
  const l1 = 'CFPB EXAMPLE: $24 OVERDRAFT · 3 DAYS · $34 MEDIAN FEE (2014) ·', l2 = 'FEES VARY BY BANK';
  txt(c, l1, 90, y, `700 ${size}px JBM`, `rgba(245,243,238,${a})`, 'left'); txt(c, l2, 90, y + size + 8, `700 ${size}px JBM`, `rgba(245,243,238,${a * .8})`, 'left'); }
function whatIf(c, title) { rr(c, 90, 238, 170, 52, 8); c.fillStyle = HL; c.fill(); txt(c, 'WHAT IF', 175, 265, '800 30px Inter', INK); if (title) txt(c, title, 280, 265, '700 26px JBM', 'rgba(245,243,238,.9)', 'left'); }
function progress(c, t) { c.fillStyle = 'rgba(245,243,238,.15)'; c.fillRect(90, 306, 900, 6); c.fillStyle = HL; c.fillRect(90, 306, 900 * t / CFG.DUR, 6); }
function wordmark(c) { c.save(); txt(c, 'BAD', 90, 266, '400 44px Anton', PAPER, 'left'); c.font = '400 44px Anton'; txt(c, 'MATH', 90 + c.measureText('BAD ').width, 266, '400 44px Anton', RED, 'left'); c.restore(); }
function caption(c, t) {
  const K = CFG.cap; let it = null; for (const cp of CAPS) if (t >= cp[0] && t < cp[1]) it = cp; if (!it) return;
  const k = eo(lin(t, it[0], it[0] + .1)); const parts = it[2].map(([w, col]) => [w, col === 'g' ? GREEN : col === 'r' ? RED : col === 'y' ? HL : PAPER]);
  c.save(); c.font = `800 ${K.size}px Inter`; const sp = c.measureText(' ').width; const lines = [[]]; let lw = 0;
  for (const p of parts) { const w = c.measureText(p[0]).width; if (lw + w > K.w && lines[lines.length - 1].length) { lines.push([]); lw = 0; } lines[lines.length - 1].push([...p, w]); lw += w + sp; }
  c.translate(K.x, K.y - (lines.length - 1) * K.lh / 2); c.scale(.82 + .18 * k, .82 + .18 * k); c.globalAlpha = k;
  lines.forEach((ln, li) => { const tw = ln.reduce((a, p) => a + p[2], 0) + sp * (ln.length - 1); let px = -tw / 2;
    for (const [w, col, ww] of ln) { c.textAlign = 'left'; c.textBaseline = 'middle'; c.lineWidth = 14; c.strokeStyle = 'rgba(0,0,0,.9)'; c.lineJoin = 'round'; c.strokeText(w, px, li * K.lh); c.fillStyle = col; c.fillText(w, px, li * K.lh); px += ww + sp; } });
  c.restore();
}
function storyteller(c, t) { Storyteller.draw(c, t, { ...CFG.st, mouth: MOUTH[Math.min(MOUTH.length - 1, Math.floor(t * 30))] || 0 }); }
// ---------- render pipeline ----------
window.render = function (t) {
  const sc = CFG.SCENES.find(s => t >= s[0] && t < s[1]) || CFG.SCENES[CFG.SCENES.length - 1];
  O.save(); sc[2](O, t); O.restore(); if (CFG.overlays) CFG.overlays(O, t); CFG.hud(O, t); storyteller(O, t); caption(O, t);
  const g = O.createRadialGradient(540, 900, 450, 540, 900, 1300); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.5)'); O.fillStyle = g; O.fillRect(0, 0, W, H);
  let wx = 0; const into = t - sc[0]; if (sc[0] > 0 && into < .12) wx = (1 - eo(into / .12)) * 130;
  let sx = 0, sy = 0; for (const [s0, d, amp] of CFG.SHAKE) if (t >= s0 && t < s0 + d) { const k = 1 - (t - s0) / d; sx += Math.sin(t * 97) * amp * k; sy += Math.cos(t * 83) * amp * k; }
  let pz = 1; for (const [s0, amp] of CFG.PZ) { const k = t - s0; if (k >= 0 && k < 1) pz += amp * clamp(k / .067) * (1 - eo(clamp((k - .067) / .4))); }
  X.fillStyle = INK; X.fillRect(0, 0, W, H); X.save(); X.translate(540 + sx + wx, 960 + sy); X.scale(pz, pz); X.translate(-540, -960); X.drawImage(OFF, 0, 0); X.restore();
  for (const [g0, g1, amt, mode] of CFG.GLITCH) if (t >= g0 && t < g1) {
    const u = lin(t, g0, g1), k = mode === 'd' ? amt * (1 - u * .8) : mode === 'r' ? amt * u : amt * Math.sin(u * Math.PI), f = Math.floor(t * 30);
    X.save(); X.globalCompositeOperation = 'screen'; X.globalAlpha = .55 * k;
    for (const [col, dx] of [['#ff0000', 26], ['#00ffff', -26]]) { T.clearRect(0, 0, W, H); T.drawImage(OFF, 0, 0); T.globalCompositeOperation = 'multiply'; T.fillStyle = col; T.fillRect(0, 0, W, H); T.globalCompositeOperation = 'source-over'; X.drawImage(TMP, dx * k, 0); }
    X.restore(); for (let i = 0; i < 10; i++) { const y = hash(f * 13 + i) * H, h = 20 + hash(f * 7 + i) * 130, dx = (hash(f * 3 + i) - .5) * 280 * k; X.drawImage(OFF, 0, y, W, h, dx, y, W, h); }
  }
};
const FONTS = [['Anton', 'node_modules/@fontsource/anton/files/anton-latin-400-normal.woff2', '400'], ['Inter', 'node_modules/@fontsource/inter/files/inter-latin-800-normal.woff2', '800'],
  ['JBM', 'node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-800-normal.woff2', '800'], ['JBM', 'node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff2', '700']];
window.ready = Promise.all(FONTS.map(([f, u, w]) => new FontFace(f, `url(${u})`, { weight: w }).load().then(ff => document.fonts.add(ff)))).then(() => { window.render(0); return true; });
// ---------- extra shared drawings ----------
function cashStack(c, x, y, n, k, band = '$34') { // origin = bottom center
  c.save(); c.translate(x, y); for (let i = 0; i < n; i++) { const kk = back(lin(k, i / n * .7, i / n * .7 + .3)); if (kk <= 0) continue; const col = i % 2; c.save(); c.translate(0, -i * 26 - (1 - kk) * 260); c.rotate((hash(i + 40) - .5) * .08);
    c.fillStyle = col ? '#35c97a' : '#2fbf71'; rr(c, -130, -34, 260, 70, 8); c.fill(); c.strokeStyle = '#0a7a40'; c.lineWidth = 5; c.stroke(); c.strokeStyle = 'rgba(255,255,255,.5)'; c.lineWidth = 3; rr(c, -112, -22, 224, 46, 6); c.stroke(); c.fillStyle = '#d9ffe8'; c.beginPath(); c.arc(0, 1, 18, 0, 7); c.fill(); c.restore(); }
  if (k > .5) { c.translate(0, -n * 13); c.rotate(-.03); c.fillStyle = PAPER; rr(c, -70, -34, 140, 68, 8); c.fill(); c.strokeStyle = INK; c.lineWidth = 5; c.stroke(); txt(c, band, 0, 3, '400 52px Anton', RED); } c.restore(); }
function creditCard(c, x, y, s, rot = 0, pct = '22%') { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s); shadowBox(c, -170, -105, 340, 210, 22, '#3a4a6b', 'rgba(255,255,255,.35)'); c.fillStyle = '#e7b94c'; rr(c, -140, -50, 60, 44, 8); c.fill();
  txt(c, 'CREDIT CARD', 140, -66, '800 22px JBM', '#cfd8e8', 'right'); txt(c, pct + ' APR', -140, 56, '800 40px JBM', '#fff', 'left'); c.restore(); }
function docCard(c, x, y, w, h, rot, k) { c.save(); c.translate(x, y); c.rotate(rot); const s = lerp(.8, 1, back(k)); c.scale(s, s); c.globalAlpha = clamp(k * 4); shadowBox(c, -w / 2, -h / 2, w, h, 20, '#F7F4EA'); c.fillStyle = NAVY; rr(c, -w / 2, -h / 2, w, 110, [20, 20, 0, 0]); c.fill();
  txt(c, 'CFPB STUDY', -w / 2 + 36, -h / 2 + 46, '400 64px Anton', '#fff', 'left'); txt(c, 'DEBIT CARD OVERDRAFTS · 2014', -w / 2 + 36, -h / 2 + 90, '700 22px JBM', '#b9c8e6', 'left'); c.restore(); }
