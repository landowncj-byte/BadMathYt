const W = 1080, H = 1920, DUR = /*DUR*/0;
const MOUTH = /*MOUTH*/[];
const CAPS = /*CAPS*/[];
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
function heart(c, x, y, s, col) { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = col; c.beginPath(); c.moveTo(0, 30); c.bezierCurveTo(-60, -10, -40, -55, 0, -22); c.bezierCurveTo(40, -55, 60, -10, 0, 30); c.fill(); c.restore(); }
function plane(c, x, y, rot, s, col = PAPER) { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s); c.fillStyle = col; c.strokeStyle = 'rgba(11,15,20,.35)'; c.lineWidth = 2;
  c.beginPath(); c.moveTo(60, 0); c.lineTo(-50, -34); c.lineTo(-26, 0); c.lineTo(-50, 34); c.closePath(); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(60, 0); c.lineTo(-26, 0); c.lineTo(-34, 14); c.closePath(); c.fillStyle = '#c9c4b6'; c.fill(); c.restore(); }
function rolling(v) { return fmt(v); }
function check(c, x, y, s, col, k) { c.save(); c.translate(x, y); c.scale(s, s); c.strokeStyle = col; c.lineWidth = 16; c.lineCap = 'round'; c.lineJoin = 'round'; c.beginPath(); c.moveTo(-34, 2); c.lineTo(-10, 28); c.lineTo(36, -26); c.setLineDash([140]); c.lineDashOffset = 140 * (1 - k); c.stroke(); c.restore(); }

