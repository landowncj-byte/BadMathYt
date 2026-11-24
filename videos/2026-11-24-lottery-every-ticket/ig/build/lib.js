const C = document.getElementById('c'), X = C.getContext('2d');
const OFF = document.createElement('canvas'); OFF.width = W; OFF.height = H; const O = OFF.getContext('2d');
const TMP = document.createElement('canvas'); TMP.width = W; TMP.height = H; const T = TMP.getContext('2d');
const INK = '#0B0F14', RED = '#FF3B30', GREEN = '#00D26A', PAPER = '#F5F3EE', HL = '#FFD60A', GOLD = '#F2B705';
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const lin = (t, a, b) => clamp((t - a) / (b - a));
const eo = x => 1 - Math.pow(1 - clamp(x), 3);
const eio = x => { x = clamp(x); return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
const back = x => { x = clamp(x); const c1 = 1.9, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
const bounce = x => { x = clamp(x); const n = 7.5625, d = 2.75; if (x < 1 / d) return n * x * x; if (x < 2 / d) return n * (x -= 1.5 / d) * x + .75; if (x < 2.5 / d) return n * (x -= 2.25 / d) * x + .9375; return n * (x -= 2.625 / d) * x + .984375; };
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
function bg(c, t, glow = 'rgba(255,214,10,.13)') {
  c.fillStyle = INK; c.fillRect(0, 0, W, H);
  const g = c.createRadialGradient(540, 760, 50, 540, 760, 950); g.addColorStop(0, glow); g.addColorStop(1, 'rgba(255,214,10,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  c.strokeStyle = 'rgba(245,243,238,.045)'; c.lineWidth = 2; const o = (t * 18) % 80;
  for (let x = -80 + o; x < W + 80; x += 80) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke(); }
  for (let y = -80 + o; y < H + 80; y += 80) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
}
function shadowBox(c, x, y, w, h, r, fill, stroke) { c.save(); c.shadowColor = 'rgba(0,0,0,.5)'; c.shadowBlur = 24; c.shadowOffsetY = 10; rr(c, x, y, w, h, r); c.fillStyle = fill; c.fill(); c.restore(); if (stroke) { rr(c, x, y, w, h, r); c.strokeStyle = stroke; c.lineWidth = 4; c.stroke(); } }
const HC = ['#FFD60A', '#00D26A', '#FF6B3D', '#4DA3FF', '#C77DFF'];
// lottery ticket (h = .53 w). nums: array of 6 for the featured row
function ticket(c, x, y, w, rot, seed, o = {}) {
  const h = w * .53; c.save(); c.translate(x, y); c.rotate(rot);
  if (!o.mini) { c.fillStyle = 'rgba(0,0,0,.4)'; rr(c, -w / 2 + 10, -h / 2 + 16, w, h, w * .03); c.fill(); }
  const hc = o.band || HC[Math.floor(hash(seed) * 5)];
  c.fillStyle = '#F7F0DC'; rr(c, -w / 2, -h / 2, w, h, w * .03); c.fill();
  c.fillStyle = hc; rr(c, -w / 2, -h / 2, w, h * .27, [w * .03, w * .03, 0, 0]); c.fill();
  if (o.mini) { c.fillStyle = 'rgba(11,15,20,.55)'; c.fillRect(-w * .42, -h * .17, w * .5, h * .09); c.fillRect(-w * .42, h * .0, w * .8, h * .08); c.fillRect(-w * .42, h * .2, w * .62, h * .08); c.restore(); return; }
  txt(c, 'LOTTO', -w / 2 + w * .05, -h / 2 + h * .135, `400 ${h * .21}px Anton`, INK, 'left'); txt(c, '$1', w / 2 - w * .05, -h / 2 + h * .135, `400 ${h * .21}px Anton`, INK, 'right');
  const nums = o.nums; const r = h * .075;
  for (let row = 0; row < 3; row++) for (let k = 0; k < 6; k++) {
    const cx = -w * .38 + k * w * .152, cy = -h * .1 + row * h * .2;
    const hit = o.hit && o.hit[k] != null && row === 1;
    c.beginPath(); c.arc(cx, cy, r, 0, 7); c.fillStyle = hit ? GREEN : 'rgba(11,15,20,.1)'; c.fill(); c.strokeStyle = hit ? '#00893f' : 'rgba(11,15,20,.5)'; c.lineWidth = 2; c.stroke();
    const n = row === 1 && nums ? nums[k] : 1 + Math.floor(hash(seed * 7 + row * 11 + k) * 44);
    txt(c, String(n).padStart(2, '0'), cx, cy + 1, `800 ${r * 1.15}px JBM`, hit ? INK : 'rgba(11,15,20,.8)');
  }
  c.fillStyle = INK; for (let k = 0; k < 38; k++) c.fillRect(-w * .42 + k * w * .0215, h * .36, 1.5 + hash(k + seed) * 3, h * .1);
  c.restore();
}
function heart(c, x, y, s, col) { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = col; c.beginPath(); c.moveTo(0, 30); c.bezierCurveTo(-60, -10, -40, -55, 0, -22); c.bezierCurveTo(40, -55, 60, -10, 0, 30); c.fill(); c.restore(); }
function plane(c, x, y, rot, s, col = PAPER) { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s); c.fillStyle = col; c.strokeStyle = 'rgba(11,15,20,.35)'; c.lineWidth = 2;
  c.beginPath(); c.moveTo(60, 0); c.lineTo(-50, -34); c.lineTo(-26, 0); c.lineTo(-50, 34); c.closePath(); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(60, 0); c.lineTo(-26, 0); c.lineTo(-34, 14); c.closePath(); c.fillStyle = '#c9c4b6'; c.fill(); c.restore(); }
function jet(c, x, y, rot, s) { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s); c.fillStyle = PAPER; c.strokeStyle = INK; c.lineWidth = 3;
  c.beginPath(); c.ellipse(0, 0, 70, 14, 0, 0, 7); c.fill(); c.stroke(); c.beginPath(); c.moveTo(10, 0); c.lineTo(-30, -62); c.lineTo(-10, -62); c.lineTo(40, 0); c.lineTo(-10, 62); c.lineTo(-30, 62); c.closePath(); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(-58, -4); c.lineTo(-76, -30); c.lineTo(-64, -30); c.lineTo(-44, -4); c.fill(); c.stroke(); c.restore(); }
function ball(c, x, y, r, col, num, ptxt = INK) { c.save(); c.translate(x, y); const g = c.createRadialGradient(-r * .35, -r * .4, r * .1, 0, 0, r); g.addColorStop(0, '#fff'); g.addColorStop(.25, col); g.addColorStop(1, col); c.fillStyle = col; c.beginPath(); c.arc(0, 0, r, 0, 7); c.fill();
  const g2 = c.createRadialGradient(-r * .4, -r * .45, 1, -r * .2, -r * .2, r * 1.1); g2.addColorStop(0, 'rgba(255,255,255,.75)'); g2.addColorStop(.35, 'rgba(255,255,255,0)'); g2.addColorStop(1, 'rgba(0,0,0,.35)'); c.fillStyle = g2; c.beginPath(); c.arc(0, 0, r, 0, 7); c.fill();
  if (num != null) { c.fillStyle = 'rgba(255,255,255,.92)'; c.beginPath(); c.arc(0, 0, r * .55, 0, 7); c.fill(); txt(c, String(num), 0, 2, `800 ${r * .72}px JBM`, ptxt); } c.restore(); }
const BC = ['#FF3B30', '#FFD60A', '#4DA3FF', '#00D26A', '#FF8A3D', '#C77DFF', '#F5F3EE'];
function drum(c, t, cx, cy, r, spin, hideSome = 0) {
  c.save(); c.translate(cx, cy);
  const g = c.createRadialGradient(-r * .3, -r * .3, r * .1, 0, 0, r); g.addColorStop(0, 'rgba(255,255,255,.16)'); g.addColorStop(1, 'rgba(255,255,255,.04)'); c.fillStyle = g; c.beginPath(); c.arc(0, 0, r, 0, 7); c.fill();
  for (let i = 0; i < 26 - hideSome; i++) { const a = spin * (1.3 + hash(i) * 1.4) * (i % 2 ? 1 : -1) + i * 2.4, rad = (r - 34) * (.25 + .75 * Math.abs(Math.sin(spin * .7 + i * 1.7)));
    ball(c, Math.cos(a) * rad, Math.sin(a * 1.3 + i) * rad * .9, r * .115, BC[i % 7], null); }
  c.save(); c.rotate(spin * 2.2); c.strokeStyle = 'rgba(245,243,238,.55)'; c.lineWidth = 8; c.lineCap = 'round'; c.beginPath(); c.moveTo(-r * .55, 0); c.lineTo(r * .55, 0); c.moveTo(0, -r * .55); c.lineTo(0, r * .55); c.stroke(); c.restore();
  c.strokeStyle = PAPER; c.lineWidth = 10; c.beginPath(); c.arc(0, 0, r, 0, 7); c.stroke(); c.strokeStyle = 'rgba(255,255,255,.35)'; c.lineWidth = 5; c.beginPath(); c.arc(0, 0, r - 12, -2.6, -1.6); c.stroke();
  c.restore();
  // stand
  c.fillStyle = '#2e3846'; c.beginPath(); c.moveTo(cx - r * .45, cy + r); c.lineTo(cx + r * .45, cy + r); c.lineTo(cx + r * .6, cy + r + 90); c.lineTo(cx - r * .6, cy + r + 90); c.closePath(); c.fill(); c.fillStyle = RED; c.fillRect(cx - r * .7, cy + r + 90, r * 1.4, 26);
}
function confetti(c, t, t0, n, ox, oy, spread = 1) { for (let i = 0; i < n; i++) { const d = t - t0 - hash(i) * .12; if (d < 0 || d > 2.6) continue; const a = -Math.PI / 2 + (hash(i + 9) - .5) * 2.4 * spread, v = 500 + hash(i + 3) * 900;
  const x = ox + Math.cos(a) * v * d * (1 - .25 * d), y = oy + Math.sin(a) * v * d + 900 * d * d; c.save(); c.translate(x, y); c.rotate(d * (4 + hash(i) * 8)); c.globalAlpha = 1 - lin(d, 1.9, 2.6); c.scale(1, Math.cos(d * 9 + i)); c.fillStyle = [GREEN, HL, RED, '#4DA3FF', PAPER, '#C77DFF'][i % 6]; c.fillRect(-9, -5, 18, 10); c.restore(); } }
function rolling(v) { return fmt(v); }
function check(c, x, y, s, col, k) { c.save(); c.translate(x, y); c.scale(s, s); c.strokeStyle = col; c.lineWidth = 16; c.lineCap = 'round'; c.lineJoin = 'round'; c.beginPath(); c.moveTo(-34, 2); c.lineTo(-10, 28); c.lineTo(36, -26); c.setLineDash([140]); c.lineDashOffset = 140 * (1 - k); c.stroke(); c.restore(); }
