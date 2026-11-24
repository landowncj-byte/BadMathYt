// BAD MATH — "The Impossible Number" engine. 1920x1080, every frame a pure function of t. See ENGINE.md.
'use strict';
const VW = 1920, VH = 1080, FPS = 30; // NOTE: W() is the word-time helper, so the canvas size is VW/VH.
const INK = '#0B0F14', RED = '#FF3B30', GREEN = '#00D26A', PAPER = '#F5F3EE', HL = '#FFD60A', GOLD = '#F2B705', GREY = '#8b96a5';
const SEP = '#E6D5B0', SEP2 = '#C9B07E', BRN = '#2B1D0E', BRN2 = '#5A3F1E';
const SAFE = { x0: 80, x1: 1600, y0: 110, y1: 880, cx: 840, cy: 495 };
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const lin = (t, a, b) => clamp((t - a) / (b - a));
const eo = x => 1 - Math.pow(1 - clamp(x), 3);
const ei = x => { x = clamp(x); return x * x * x; };
const eio = x => { x = clamp(x); return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
const back = x => { x = clamp(x); const c1 = 1.9, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
const bounce = x => { x = clamp(x); const n = 7.5625, d = 2.75; if (x < 1 / d) return n * x * x; if (x < 2 / d) return n * (x -= 1.5 / d) * x + .75; if (x < 2.5 / d) return n * (x -= 2.25 / d) * x + .9375; return n * (x -= 2.625 / d) * x + .984375; };
const lerp = (a, b, x) => a + (b - a) * x;
const hash = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
const fmt = n => Math.round(n).toLocaleString('en-US');
const money = n => '$' + fmt(n);
const roll = (t, t0, t1, to, from = 0, ease = eo) => lerp(from, to, ease(lin(t, t0, t1))); // rolling counter value
function rr(c, x, y, w, h, r) { c.beginPath(); c.roundRect(x, y, w, h, r); }
function txt(c, s, x, y, font, color, align = 'center', base = 'middle') { c.font = font; c.fillStyle = color; c.textAlign = align; c.textBaseline = base; c.fillText(s, x, y); }
function stamp(c, s, x, y, size, color, rot, k, font = 'Anton') { // rubber stamp, k 0..1 = slam progress
  if (k <= 0) return; const sc = lerp(2.6, 1, back(k)); c.save(); c.translate(x, y); c.rotate(rot); c.scale(sc, sc); c.globalAlpha = clamp(k * 3);
  c.font = `400 ${size}px ${font}`; const w = c.measureText(s).width + size * .6, h = size * 1.25;
  c.strokeStyle = color; c.lineWidth = size * .09; rr(c, -w / 2, -h / 2, w, h, size * .12); c.stroke();
  c.fillStyle = color; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(s, 0, size * .04); c.restore();
}
function paper(c, x, y, w, h, rot, col, f) { c.save(); c.translate(x, y); c.rotate(rot); c.shadowColor = 'rgba(0,0,0,.55)'; c.shadowBlur = 40; c.shadowOffsetY = 18; c.fillStyle = col; c.fillRect(-w / 2, -h / 2, w, h); c.shadowColor = 'transparent'; if (f) f(c, w, h); c.restore(); }
// paper that slams in at t0 (scale 1.35 -> 1, drop shadow). At t0 it is already visible (frame 0 is never empty).
function paperSlam(c, t, t0, x, y, w, h, rot, col, f, d = .22) { const k = lin(t, t0, t0 + d); const s = lerp(1.35, 1, eo(k)); c.save(); c.translate(x, y); c.scale(s, s); c.translate(-x, -y); paper(c, x, y, w, h, rot, col, f); c.restore(); }
function bgGrid(c, t, tint = 'rgba(255,59,48,.05)', step = 90) { c.fillStyle = INK; c.fillRect(0, 0, VW, VH); c.strokeStyle = tint; c.lineWidth = 2; const o = (t * 20) % step; for (let x = -step + o; x < VW; x += step) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, VH); c.stroke(); } for (let y = -step + o; y < VH; y += step) { c.beginPath(); c.moveTo(0, y); c.lineTo(VW, y); c.stroke(); } }
function glow(c, x, y, r, col, a = .5) { const g = c.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, col); g.addColorStop(1, 'rgba(0,0,0,0)'); c.save(); c.globalAlpha = a; c.fillStyle = g; c.fillRect(x - r, y - r, r * 2, r * 2); c.restore(); }
function sepiaBg(c) { const g = c.createRadialGradient(VW / 2, 540, 200, VW / 2, 540, 1200); g.addColorStop(0, '#3a2a14'); g.addColorStop(1, '#120c05'); c.fillStyle = g; c.fillRect(0, 0, VW, VH); }
function film(c, t, a = 1) { // grain, scratches, flicker over sepia scenes (scene opt {film:true} applies it automatically)
  const f = Math.floor(t * 24); c.save(); c.globalAlpha = a;
  c.fillStyle = `rgba(255,240,200,${.04 + .04 * hash(f)})`; c.fillRect(0, 0, VW, VH);
  for (let i = 0; i < 3; i++) if (hash(f * 3 + i) > .5) { const x = hash(f * 7 + i) * VW; c.fillStyle = 'rgba(255,245,220,.25)'; c.fillRect(x, 0, 2, VH); }
  for (let i = 0; i < 160; i++) { c.fillStyle = `rgba(0,0,0,${hash(f * 11 + i) * .25})`; c.fillRect(hash(f * 13 + i) * VW, hash(f * 17 + i) * VH, 3, 3); }
  if (hash(f * 5) > .85) { c.fillStyle = 'rgba(20,10,0,.6)'; c.beginPath(); c.arc(hash(f * 19) * VW, hash(f * 23) * VH, 6 + hash(f) * 14, 0, 7); c.fill(); }
  c.restore();
}
// typed text. Centered text is laid out on its full width so it does not jump. Returns number of chars shown.
function typedText(c, s, x, y, font, color, t, t0, t1, align = 'center', cursor = true) {
  const n = Math.floor(s.length * lin(t, t0, t1) + 1e-6); if (t < t0) return 0; c.font = font; c.textBaseline = 'middle'; c.textAlign = 'left';
  const w = c.measureText(s).width, x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x;
  c.fillStyle = color; c.fillText(s.slice(0, n), x0, y); const sw = c.measureText(s.slice(0, n)).width;
  const done = t > t1 + .8; if (cursor && !done && Math.floor(t * 2.5) % 2 === 0) { const m = parseInt(font.match(/(\d+)px/)[1]); c.fillRect(x0 + sw + 4, y - m * .4, Math.max(3, m * .07), m * .8); }
  return n;
}
// camera slow push: wrap a scene's drawing: c.save(); push(c, lt, dur, 1, 1.06); ... c.restore();
function push(c, lt, dur, z0 = 1, z1 = 1.06, cx = SAFE.cx, cy = SAFE.cy) { const z = lerp(z0, z1, lin(lt, 0, dur)); c.translate(cx, cy); c.scale(z, z); c.translate(-cx, -cy); }

// ------------------------------------------------------------------ shared icons / props
function coupon(c, x, y, w, rot = 0, a = 1, col = SEP) { // international reply coupon (stylized)
  c.save(); c.translate(x, y); c.rotate(rot); c.globalAlpha = a; const h = w * .62;
  c.fillStyle = col; c.fillRect(-w / 2, -h / 2, w, h); c.strokeStyle = BRN2; c.lineWidth = Math.max(1, w * .03); c.setLineDash([w * .05, w * .04]); c.strokeRect(-w / 2 + w * .05, -h / 2 + w * .05, w - w * .1, h - w * .1); c.setLineDash([]);
  if (w > 60) { txt(c, 'REPLY', 0, -h * .14, `400 ${w * .17}px Rye`, BRN); txt(c, 'COUPON', 0, h * .16, `400 ${w * .13}px Rye`, BRN); }
  c.restore();
}
function tank(c, x, y, w, h, o = {}) { // side view storage tank, (x,y) = bottom centre. o: {fill:0..1, oil:'#E0A526', body:'#3b4655'}
  const { fill = 0, oil = '#E0A526', body = '#3b4655', edge = '#8b96a5' } = o; c.save(); c.translate(x, y);
  const g = c.createLinearGradient(-w / 2, 0, w / 2, 0); g.addColorStop(0, body); g.addColorStop(.35, '#5b6879'); g.addColorStop(1, '#2a323d');
  c.fillStyle = g; c.fillRect(-w / 2, -h, w, h); c.beginPath(); c.ellipse(0, 0, w / 2, h * .07, 0, 0, Math.PI); c.fill();
  if (fill > 0) { c.save(); c.beginPath(); c.rect(-w / 2, -h, w, h + h * .07); c.clip(); c.fillStyle = oil; c.globalAlpha = .9; c.fillRect(-w / 2, -h * fill, w, h * fill + h * .07); c.restore(); }
  c.fillStyle = '#6b7a8d'; c.beginPath(); c.ellipse(0, -h, w / 2, h * .07, 0, 0, 7); c.fill(); c.strokeStyle = edge; c.lineWidth = 4; c.stroke();
  c.strokeStyle = 'rgba(255,255,255,.12)'; c.lineWidth = 3; for (let i = 1; i < 4; i++) { c.beginPath(); c.moveTo(-w / 2, -h * i / 4); c.lineTo(w / 2, -h * i / 4); c.stroke(); }
  c.strokeStyle = edge; c.lineWidth = 4; c.strokeRect(-w / 2, -h, w, h); c.restore();
}
function chartIcon(c, x, y, w, h, col = GREEN, lw = 10) { // straight rising line on axes, centred
  c.save(); c.translate(x - w / 2, y - h / 2); c.strokeStyle = 'rgba(245,243,238,.5)'; c.lineWidth = 4; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, h); c.lineTo(w, h); c.stroke();
  c.strokeStyle = col; c.lineWidth = lw; c.lineCap = 'round'; c.beginPath(); c.moveTo(w * .06, h * .92); c.lineTo(w * .96, h * .08); c.stroke(); c.restore();
}
function padlock(c, x, y, s, open = 0, col = RED) { // s = body width. open 0..1
  c.save(); c.translate(x, y); const lift = eo(open);
  c.save(); c.translate(s * .28, -s * .02); c.rotate(-lift * .7); c.translate(-s * .28, s * .02); c.translate(0, -lift * s * .12);
  c.strokeStyle = '#b8c0cc'; c.lineWidth = s * .13; c.lineCap = 'butt'; c.beginPath(); c.moveTo(-s * .28, -s * .02); c.lineTo(-s * .28, -s * .36); c.arc(0, -s * .36, s * .28, Math.PI, 0); c.lineTo(s * .28, -s * .02); c.stroke(); c.restore();
  c.fillStyle = '#2a323d'; rr(c, -s * .5, -s * .06, s, s * .8, s * .1); c.fill(); c.strokeStyle = '#8b96a5'; c.lineWidth = s * .04; c.stroke();
  const k = open > .5 ? GREEN : col; glow(c, 0, s * .3, s * .5, k, .35);
  c.fillStyle = k; c.beginPath(); c.arc(0, s * .27, s * .09, 0, 7); c.fill(); c.fillRect(-s * .035, s * .3, s * .07, s * .22); c.restore();
}
function checkbox(c, x, y, s, k = 0, col = RED) { // empty box that ticks (k 0..1)
  c.save(); c.translate(x, y); c.strokeStyle = INK; c.lineWidth = s * .09; rr(c, -s / 2, -s / 2, s, s, s * .12); c.stroke();
  if (k > 0) { const p = lin(k, 0, 1); c.strokeStyle = col; c.lineWidth = s * .17; c.lineCap = 'round'; c.lineJoin = 'round'; const pts = [[-s * .3, 0], [-s * .08, s * .24], [s * .38, -s * .32]];
    const l1 = Math.hypot(pts[1][0] - pts[0][0], pts[1][1] - pts[0][1]), l2 = Math.hypot(pts[2][0] - pts[1][0], pts[2][1] - pts[1][1]), d = p * (l1 + l2);
    c.beginPath(); c.moveTo(...pts[0]); if (d <= l1) c.lineTo(lerp(pts[0][0], pts[1][0], d / l1), lerp(pts[0][1], pts[1][1], d / l1)); else { c.lineTo(...pts[1]); const q = (d - l1) / l2; c.lineTo(lerp(pts[1][0], pts[2][0], q), lerp(pts[1][1], pts[2][1], q)); } c.stroke(); }
  c.restore();
}
// THE IMPOSSIBLE NUMBER TEST card. o: {title, rows:[{label,reveal 0..1,tick 0..1}], k (0..1 slide-in), rot}
function checklist(c, x, y, o = {}) {
  const { w = 760, h = 640, rot = -.02, k = 1, rows = [] } = o; const sl = eo(k); c.save(); c.globalAlpha = clamp(k * 4); c.translate(x, y + (1 - sl) * 120); c.rotate(rot);
  c.shadowColor = 'rgba(0,0,0,.55)'; c.shadowBlur = 40; c.shadowOffsetY = 18; c.fillStyle = PAPER; rr(c, -w / 2, -h / 2, w, h, 18); c.fill(); c.shadowColor = 'transparent';
  c.fillStyle = RED; rr(c, -w / 2, -h / 2, w, 34, [18, 18, 0, 0]); c.fill(); txt(c, 'CASE FILE · DECODED', 0, -h / 2 + 17, '800 20px Inter', PAPER);
  txt(c, o.title || 'THE IMPOSSIBLE NUMBER TEST', 0, -h / 2 + 100, '400 54px Anton', INK);
  c.fillStyle = RED; c.fillRect(-w / 2 + 50, -h / 2 + 142, w - 100, 6);
  rows.forEach((r, i) => { const ry = -h / 2 + 230 + i * 130; checkbox(c, -w / 2 + 90, ry, 76, r.tick || 0);
    c.fillStyle = 'rgba(11,15,20,.82)'; const rev = r.reveal == null ? 0 : r.reveal;
    if (rev < 1) { c.globalAlpha = clamp(k * 4) * (1 - rev); for (const [j, ww] of [[0, 430 - i * 40], [1, 300 - i * 30]]) { c.fillStyle = 'rgba(11,15,20,.82)'; rr(c, -w / 2 + 160, ry - 24 + j * 30, ww, 18, 4); c.fill(); } c.globalAlpha = clamp(k * 4); }
    if (rev > 0 && r.label) { c.globalAlpha = clamp(k * 4) * rev; txt(c, r.label, -w / 2 + 160, ry, '400 38px Anton', INK, 'left'); c.globalAlpha = clamp(k * 4); }
  });
  c.restore();
}
function folder(c, x, y, w, h, tabText, o = {}) { // manila case folder, centre (x,y). o: {k:1 scale, rot, draw:(c,w,h)=>{}}
  const { rot = 0, draw, col = '#C8A96A', dark = '#8d733b' } = o; c.save(); c.translate(x, y); c.rotate(rot);
  c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 36; c.shadowOffsetY = 16; c.fillStyle = dark; rr(c, -w / 2, -h / 2 - 34, w * .42, 50, [14, 14, 0, 0]); c.fill();
  c.fillStyle = col; rr(c, -w / 2, -h / 2, w, h, [0, 14, 14, 14]); c.fill(); c.shadowColor = 'transparent';
  c.fillStyle = 'rgba(255,255,255,.12)'; c.fillRect(-w / 2, -h / 2, w, h * .06);
  if (tabText) txt(c, tabText, -w / 2 + w * .21, -h / 2 - 9, '800 22px JBM', BRN);
  if (draw) draw(c, w, h); c.restore();
}
// the 1991 trade ticket (used in the cold open and again in P43). k = slam progress handled by paperSlam; this draws contents.
function ticketContent(c, w, h, o = {}) {
  const ink = '#1d1a14'; c.strokeStyle = 'rgba(29,26,20,.08)'; c.lineWidth = 2; for (let y = -h / 2 + 40; y < h / 2; y += 34) { c.beginPath(); c.moveTo(-w / 2 + 20, y); c.lineTo(w / 2 - 20, y); c.stroke(); }
  txt(c, 'TRADE TICKET', -w / 2 + 40, -h / 2 + 50, '400 40px Elite', ink, 'left'); txt(c, 'CONFIRMATION', w / 2 - 40, -h / 2 + 50, '400 26px Elite', 'rgba(29,26,20,.6)', 'right');
  c.fillStyle = ink; c.fillRect(-w / 2 + 40, -h / 2 + 82, w - 80, 4);
  txt(c, 'DATE: APR 16, 1991', -w / 2 + 40, -h / 2 + 130, '400 44px Elite', ink, 'left');
  c.fillStyle = INK; rr(c, -w / 2 + 40, -h / 2 + 175, w - 80, h * .42, 10); c.fill();
  txt(c, 'BUY', -w / 2 + 100, -h / 2 + 175 + h * .21, '400 56px Elite', PAPER, 'left');
  const pz = o.pop || 0; c.save(); c.translate(0, -h / 2 + 175 + h * .21); c.scale(1 + pz * .08, 1 + pz * .08); glow(c, 0, 0, 260, GREEN, .25); txt(c, o.qty || '123', 0, 0, '800 210px JBM', GREEN); c.restore();
  txt(c, 'CALLS', w / 2 - 100, -h / 2 + 175 + h * .21, '400 56px Elite', PAPER, 'right');
  txt(c, 'PROCTER & GAMBLE', 0, h / 2 - 80, '400 52px Elite', ink);
  c.setLineDash([10, 8]); c.strokeStyle = 'rgba(29,26,20,.5)'; c.lineWidth = 3; c.beginPath(); c.moveTo(-w / 2 + 40, h / 2 - 40); c.lineTo(w / 2 - 40, h / 2 - 40); c.stroke(); c.setLineDash([]);
}
function placeholder(c, t, lt, title, sub) { bgGrid(c, t); txt(c, title, SAFE.cx, 420, '400 90px Anton', PAPER); txt(c, sub || 'PLACEHOLDER · CHAPTER NOT BUILT YET', SAFE.cx, 520, '700 30px JBM', HL); c.fillStyle = RED; c.fillRect(SAFE.cx - 300, 560, 600 * lin(lt % 4, 0, 3), 8); }

// ------------------------------------------------------------------ Engine core
const Engine = {
  tl: null, mouthArr: null, scenes: [], chapterSetups: [], chapters: {}, fx: { glitch: [], shake: [], punch: [], flash: [], whip: [] }, cues: [], missing: [],
  poseList: [], st: { bubbles: [], follow: null, followLabel: null, followAt: null, followScale: 1, pos: { x: 1760, y: 1060, s: .95 } },
  endCardFn: null, NARR_END: 0, DUR: 0, endHold: 15,
  CH_NAMES: { 1: "THE COUPON THAT COULDN'T EXIST", 2: 'MORE OIL THAN AMERICA', 3: 'THE FUND THAT ALMOST NEVER LOST', 4: 'THE IMPOSSIBLE NUMBER TEST' },
};
const SPELL = { markopoulos: 'Markopolos', proctor: 'Procter', bayon: 'Bayonne', sec: 'SEC' };
const norm = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, '');
const NUMW = { zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90 };
function numVal(q) { if (q in NUMW) return NUMW[q]; const p = q.split('-'); if (p.length === 2 && NUMW[p[0]] >= 20 && NUMW[p[1]] > 0 && NUMW[p[1]] < 10) return NUMW[p[0]] + NUMW[p[1]]; return null; }
function wordEq(wn, q) { if (wn === norm(q)) return true; const v = numVal(q.replace(/[^a-z0-9-]/g, '')); if (v !== null && /^\d+$/.test(wn)) return new RegExp('^' + v + '(000|000000|000000000)?$').test(wn); return false; }
function matchAt(ws, i, qs) { let j = i; for (const q of qs) { if (j >= ws.length) return -1; if (wordEq(ws[j].n, q)) { j++; continue; } const parts = q.split('-'); if (parts.length > 1) { let ok = true; for (let k = 0; k < parts.length; k++) if (!ws[j + k] || !wordEq(ws[j + k].n, parts[k])) { ok = false; break; } if (ok) { j += parts.length; continue; } } return -1; } return j - 1; }

const _pc = {};
function P(id) { const p = _pc[id]; if (!p) throw new Error('unknown paragraph ' + id); return p; }
// W(id, 'word or phrase', nth=1) -> start time (s) of that word inside paragraph id. Wend(...) -> end time.
function Wr(id, q, nth = 1) {
  const p = P(id), qs = String(q).toLowerCase().split(/\s+/).filter(Boolean); let n = 0;
  for (let i = 0; i < p.ws.length; i++) { const e = matchAt(p.ws, i, qs); if (e >= 0 && ++n === nth) return { s: p.ws[i].s, e: p.ws[e].e }; }
  // fallback: position of the phrase in the script text
  const tx = p.text.toLowerCase(); let idx = -1; for (let k = 0; k < nth; k++) idx = tx.indexOf(qs.join(' '), idx + 1); Engine.missing.push(id + ' "' + q + '" #' + nth);
  const f = idx < 0 ? 0 : idx / tx.length, s = p.start + f * (p.end - p.start); return { s, e: s + .3 };
}
const W = (id, q, nth = 1) => Wr(id, q, nth).s;
const Wend = (id, q, nth = 1) => Wr(id, q, nth).e;
const N = Engine; // alias

function resolveT(spec) { if (typeof spec === 'number') return spec; if (typeof spec === 'string') return P(spec).start; if (Array.isArray(spec)) return W(spec[0], spec[1], spec[2] || 1) + (spec[3] || 0); throw new Error('bad time spec'); }
// Engine.scene('P01','P03', (c,t,lt)=>{...}, opts?)  ->  scene runs from start of P01 until the next scene starts (last one: end of narration).
// `from` may also be [id, 'word', nth, offset] to cut mid-paragraph. opts: {whip:true, film:false, vignette:.6, name, layers:{hud,cap,foot,st}}
Engine.scene = (from, to, fn, opts = {}) => { Engine.scenes.push({ start: resolveT(from), toId: to, fn, opts, order: Engine.scenes.length }); };
Engine.sceneAt = (t, fn, opts = {}) => Engine.scene(t, null, fn, opts);
Engine.endCard = fn => { Engine.endCardFn = fn; };
Engine.chapter = (n, setup) => { Engine.chapterSetups.push([n, setup]); }; // setup runs once the timeline is loaded
Engine.cue = (t, name, data) => { Engine.cues.push({ t, name, ...data }); };
Engine.glitch = (t0, t1, amt = 1) => { Engine.fx.glitch.push([t0, t1, amt]); Engine.cue(t0, 'glitch'); };
Engine.shake = (t0, d = .3, amp = 20) => { Engine.fx.shake.push([t0, d, amp]); Engine.cue(t0, 'shake'); };
Engine.punch = (t0, d = .3, amt = .06) => { Engine.fx.punch.push([t0, d, amt]); };
Engine.flash = (t0, d = .2, col = '255,250,235', a = .8) => { Engine.fx.flash.push([t0, d, col, a]); Engine.cue(t0, 'flash'); };
Engine.whip = t0 => { Engine.fx.whip.push(t0); Engine.cue(t0, 'whoosh'); };
Engine.hit = (t0, o = {}) => { if (o.shake) Engine.shake(t0, o.shakeDur || .3, o.shake); if (o.punch) Engine.punch(t0, .3, o.punch); if (o.glitch) Engine.glitch(t0, t0 + (o.glitchDur || .35), o.glitchAmt || 1); if (o.flash) Engine.flash(t0, .18); if (o.cue) Engine.cue(t0, o.cue); };
Engine.pose = (t, name) => { Engine.poseList.push([t, name]); };
Engine.bubble = (s, e, l1, l2, at) => Engine.st.bubbles.push(at ? [s, e, l1, l2, at] : [s, e, l1, l2]);
Engine.drawStoryteller = (c, t, extra = {}) => { const o = { timeline: Engine.poseList, mouth: mouthAt(t), enterAt: -1, bubbles: Engine.st.bubbles, follow: Engine.st.follow, followLabel: Engine.st.followLabel, followAt: Engine.st.followAt, followScale: Engine.st.followScale, pos: Engine.st.pos, ...extra }; Storyteller.draw(c, t, o); };
Engine.P = P; Engine.W = W;

function mouthAt(t) {
  const m = Engine.mouthArr; if (m) { const i = Math.floor(t * (Engine.mouthFps || 30)); return i >= 0 && i < m.length ? m[i] : 0; }
  const ws = Engine.allWords || []; for (const w of ws) if (t >= w.s && t < w.e) return .35 + .45 * Math.abs(Math.sin((t - w.s) * 24)); return 0;
}

// ------------------------------------------------------------------ captions
const CAP_GREEN = new Set(['percent', 'dollars', 'dollar', 'billion', 'million', 'thousand', 'hundred', 'tons', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety', 'seventeen', 'sixteen']);
const CAP_RED = new Set(['lost', 'lose', 'losing', 'losses', 'loss', 'fake', 'fraud', 'frauds', 'fraudulent', 'crashed', 'crash', 'crashing', 'collapsed', 'bankrupt', 'broke', 'died', 'prison', 'arrested', 'impossible', 'never', 'cannot', "can't", 'water', 'guilty', 'swindle', 'crimes', 'felonies', 'down', 'run', 'scam', 'cracked', 'overflow']);
const CAP_YEL = new Set(['perfect', 'smooth', 'ponzi', 'madoff', 'subscribe', 'test', 'question', 'math', 'number', 'exist', 'existed', 'exists', 'wiggles', 'receipt', 'receipts']);
function capColor(w) { const n = w.toLowerCase().replace(/[^a-z0-9$'.,%]/g, '').replace(/[.,]+$/, ''); const a = n.replace(/[^a-z0-9']/g, '');
  if (/\d/.test(n) || CAP_GREEN.has(a)) return GREEN; if (CAP_RED.has(a)) return RED; if (CAP_YEL.has(a)) return HL; return PAPER; }
function buildCaptions() {
  const words = Engine.allWords, groups = []; let cur = [];
  const flush = () => { if (cur.length) groups.push({ words: cur, s: cur[0].s, e: cur[cur.length - 1].e }); cur = []; };
  for (let i = 0; i < words.length; i++) { const w = words[i]; cur.push(w); const nx = words[i + 1], gap = nx ? nx.s - w.e : 9, sent = /[.?!]["')]*$/.test(w.w), clause = /[,;:—-]["')]*$/.test(w.w);
    if (cur.length >= 7 || (cur.length >= 2 && sent) || (cur.length >= 3 && (clause || gap >= .28))) flush(); }
  flush();
  for (let i = groups.length - 1; i > 0; i--) if (groups[i].words.length < 2 && groups[i - 1].words.length + 1 <= 7 && groups[i].s - groups[i - 1].e < .6) { groups[i - 1].words.push(...groups[i].words); groups[i - 1].e = groups[i].e; groups.splice(i, 1); }
  groups.forEach((g, i) => { g.vs = g.s - .05; const nx = groups[i + 1]; g.ve = Math.min(g.e + .45, nx ? nx.s - .05 : 1e9); if (nx && nx.s - g.e < .45) g.ve = nx.s - .05; });
  Engine.caps = groups;
}
function drawCaptions(c, t) {
  const gs = Engine.caps; let g = null; for (let i = 0; i < gs.length; i++) { if (t >= gs[i].vs && t < gs[i].ve) { g = gs[i]; break; } if (gs[i].vs > t) break; } if (!g) return;
  const k = eo(lin(t, g.vs, g.vs + .1)); c.save(); c.font = '800 58px Inter'; const sp = c.measureText(' ').width, MAXW = 1300;
  const parts = g.words.map(w => { const s = w.w.toUpperCase(); return [s, capColor(w.w), c.measureText(s).width]; });
  const lines = [[]]; let lw = 0; for (const p of parts) { if (lw + p[2] > MAXW && lines[lines.length - 1].length) { lines.push([]); lw = 0; } lines[lines.length - 1].push(p); lw += p[2] + sp; }
  if (lines.length > 2) { const all = parts.slice(), h = Math.ceil(all.length / 2); lines.length = 0; lines.push(all.slice(0, h), all.slice(h)); }
  const base = lines.length === 1 ? 945 : 912; c.translate(960, base - 20); c.scale(.92 + .08 * k, .92 + .08 * k); c.translate(-960, -(base - 20)); c.globalAlpha = k;
  lines.forEach((ln, li) => { const tw = ln.reduce((a, p) => a + p[2], 0) + sp * (ln.length - 1); let px = 960 - tw / 2;
    for (const [w, col, ww] of ln) { c.textAlign = 'left'; c.textBaseline = 'alphabetic'; c.lineWidth = 12; c.strokeStyle = 'rgba(0,0,0,.9)'; c.lineJoin = 'round'; c.strokeText(w, px, base + li * 66); c.fillStyle = col; c.fillText(w, px, base + li * 66); px += ww + sp; } });
  c.restore();
}

// ------------------------------------------------------------------ HUD / footnote
function drawHud(c, t) {
  c.fillStyle = 'rgba(245,243,238,.12)'; c.fillRect(0, 0, VW, 6); c.fillStyle = RED; c.fillRect(0, 0, VW * clamp(t / Engine.DUR), 6);
  rr(c, 40, 28, 150, 44, 8); c.fillStyle = RED; c.fill(); txt(c, 'DECODED', 115, 51, '800 24px Inter', PAPER);
  txt(c, 'CASE FILE: THE IMPOSSIBLE NUMBER', 208, 51, '700 22px JBM', 'rgba(245,243,238,.85)', 'left');
  const ch = Engine.chapterAt(t); if (ch) { const a = eo(lin(t, ch.start, ch.start + .5)); c.save(); c.globalAlpha = a; txt(c, 'CH ' + ch.n + ' · ' + Engine.CH_NAMES[ch.n], 1880, 51, '700 22px JBM', 'rgba(245,243,238,.8)', 'right'); c.restore(); }
}
function drawFoot(c) { txt(c, 'DOCUMENTED CASES · SOURCES IN DESCRIPTION · NOT FINANCIAL ADVICE', 40, 1052, '700 20px JBM', 'rgba(255,255,255,.6)', 'left'); }
Engine.chapterAt = t => { let r = null; for (const n of [1, 2, 3, 4]) { const ch = Engine.chapters[n]; if (ch && t >= ch.start) r = ch; } return r; };

// ------------------------------------------------------------------ boot
function vignette(c, a = .6) { const g = c.createRadialGradient(VW / 2, 540, 420, VW / 2, 540, 1250); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(0,0,0,${a})`); c.fillStyle = g; c.fillRect(0, 0, VW, VH); }
async function loadJSON(u) { try { const r = await fetch(u); return r.ok ? await r.json() : null; } catch (e) { return null; } }
const OFF = document.createElement('canvas'); OFF.width = VW; OFF.height = VH; const O = OFF.getContext('2d');
const TMP = document.createElement('canvas'); TMP.width = VW; TMP.height = VH; const T = TMP.getContext('2d');
const NOISE = []; // deterministic grain tiles
function makeNoise() { for (let k = 0; k < 6; k++) { const cv = document.createElement('canvas'); cv.width = cv.height = 256; const x = cv.getContext('2d'), id = x.createImageData(256, 256); for (let i = 0; i < 65536; i++) { const v = hash(i * .37 + k * 91.7) * 255; id.data[i * 4] = id.data[i * 4 + 1] = id.data[i * 4 + 2] = v; id.data[i * 4 + 3] = 255; } x.putImageData(id, 0, 0); NOISE.push(cv); } }

const POSES = [ // [paragraph, word|null, pose]  (DIRECTION.md pose timeline)
  ['P01', null, 'point'], ['P02', 'twenty', 'shock'], ['P03', null, 'point'], ['P05', null, 'chin'], ['P06', null, 'point'], ['P08', null, 'shrug'], ['P09', null, 'point'], ['P15', 'twenty-seven', 'shock'], ['P16', null, 'point'],
  ['P20', null, 'chin'], ['P21', null, 'point'], ['P26', 'water', 'shock'], ['P27', null, 'point'], ['P28', 'entire', 'shock'], ['P29', null, 'point'], ['P33', null, 'chin'], ['P34', null, 'point'], ['P39', 'perfect', 'shock'],
  ['P40', null, 'point'], ['P42', 'existed', 'shock'], ['P43', null, 'point'], ['P48', 'arrested', 'shock'], ['P49', null, 'point'], ['P51', null, 'you'], ['P52', null, 'point'], ['P56', null, 'chin'], ['P57', null, 'follow']];

Engine.start = async function () {
  const D = window.__DATA__ || {};
  const fonts = [['Anton', 'anton/files/anton-latin-400-normal.woff2', '400'], ['Inter', 'inter/files/inter-latin-800-normal.woff2', '800'], ['Inter', 'inter/files/inter-latin-700-normal.woff2', '700'], ['JBM', 'jetbrains-mono/files/jetbrains-mono-latin-800-normal.woff2', '800'], ['JBM', 'jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff2', '700'], ['Elite', 'special-elite/files/special-elite-latin-400-normal.woff2', '400'], ['Rye', 'rye/files/rye-latin-400-normal.woff2', '400']];
  await Promise.all(fonts.map(([f, u, w]) => new FontFace(f, `url(node_modules/@fontsource/${u})`, { weight: w }).load().then(ff => document.fonts.add(ff))));
  const tl = D.timeline || await loadJSON('../voice/timeline.json') || await loadJSON('timeline.stub.json'); if (!tl) throw new Error('no timeline');
  let mj = D.mouth || await loadJSON('../voice/mouth.json'); if (mj && !Array.isArray(mj)) { Engine.mouthFps = mj.fps || 30; mj = mj.mouth || mj.values || mj.data || mj.loudness || null; } Engine.mouthArr = mj;
  Engine.tl = tl; Engine.allWords = [];
  tl.paragraphs.forEach((p, pi) => { // caption spelling fixes on Whisper words
    p.words.forEach((w, i) => { const core = w.w.replace(/[^A-Za-z]/g, '').toLowerCase(); if (SPELL[core]) w.w = w.w.replace(new RegExp(core, 'i'), SPELL[core]); else if (core === 'count' && p.id === 'P27' && norm((p.words[i + 1] || {}).w || '') === 'again') w.w = w.w.replace(/count/i, 'counted'); });
    p.ws = p.words.map(w => ({ n: norm(w.w), s: w.s, e: w.e })); _pc[p.id] = p; Engine.allWords.push(...p.words); });
  Engine.allWords.sort((a, b) => a.s - b.s);
  for (const p of tl.paragraphs) { const c = Engine.chapters[p.chapter]; if (p.chapter >= 1 && !c) Engine.chapters[p.chapter] = { n: p.chapter, start: p.start }; }
  Engine.NARR_END = Math.max(tl.duration, P('P57').end); Engine.DUR = Engine.NARR_END + Engine.endHold; window.DUR = Engine.DUR;
  for (const [n, fn] of Engine.chapterSetups) fn();
  // poses
  Engine.poseList.unshift([0, 'idle']); for (const [id, w, pose] of POSES) Engine.poseList.push([w ? W(id, w) : P(id).start, pose]); Engine.poseList.push([Engine.NARR_END, 'wave']); Engine.poseList.sort((a, b) => a[0] - b[0]);
  // scenes: each runs until the next starts
  const sc = Engine.scenes.slice().sort((a, b) => a.start - b.start || a.order - b.order); if (sc.length) sc[0].start = 0;
  if (Engine.endCardFn) sc.push({ start: Engine.NARR_END, fn: Engine.endCardFn, opts: { layers: { hud: false, cap: false, foot: false, st: false }, vignette: .45, name: 'endcard' }, order: 1e9 });
  sc.forEach((s, i) => { s.end = sc[i + 1] ? sc[i + 1].start : Engine.DUR; }); Engine.sorted = sc;
  buildCaptions(); makeNoise();
  window.render(0); return true;
};

Engine.sceneFor = t => { const sc = Engine.sorted; let r = sc[0]; for (const s of sc) if (t >= s.start) r = s; return r; };
const _err = {};
window.render = function (t) {
  t = clamp(t, 0, Engine.DUR - 1e-4); const sc = Engine.sceneFor(t), lt = t - (sc ? sc.start : 0), o = (sc && sc.opts) || {}, L = { hud: true, cap: true, foot: true, st: true, ...(o.layers || {}) };
  Engine.cur = sc; O.save(); O.fillStyle = INK; O.fillRect(0, 0, VW, VH);
  if (sc) { try { O.save(); sc.fn(O, t, lt); O.restore(); } catch (e) { O.restore(); if (!_err[sc.start]) { _err[sc.start] = 1; console.error('scene@' + sc.start.toFixed(2) + ': ' + e.stack); } txt(O, 'SCENE ERROR: ' + e.message, 960, 400, '700 28px JBM', RED); } }
  if (o.film) film(O, t); vignette(O, o.vignette == null ? .6 : o.vignette);
  if (L.cap || L.st) { const g = O.createLinearGradient(0, 820, 0, 1080); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.6)'); O.fillStyle = g; O.fillRect(0, 820, VW, 260); }
  if (L.hud) drawHud(O, t); if (L.foot) drawFoot(O); if (L.st) Engine.drawStoryteller(O, t); if (L.cap) drawCaptions(O, t);
  O.restore();
  // ---- post: whip, shake, punch zoom, glitch, flash, grain
  const X = window.__X || (window.__X = document.getElementById('c').getContext('2d')), F = Engine.fx;
  let wx = 0; const into = sc ? t - sc.start : 9; if (sc && sc.start > 0 && o.whip !== false && into < .16) wx = (1 - eo(into / .16)) * 380; for (const w0 of F.whip) if (t >= w0 && t < w0 + .16) wx = Math.max(wx, (1 - eo((t - w0) / .16)) * 380);
  let sx = 0, sy = 0; for (const [s0, d, amp] of F.shake) if (t >= s0 && t < s0 + d) { const k = 1 - (t - s0) / d; sx += Math.sin(t * 97) * amp * k; sy += Math.cos(t * 83) * amp * k; }
  let pz = 1; for (const [s0, d, a] of F.punch) if (t >= s0 && t < s0 + d) pz += a * (1 - (t - s0) / d);
  if (o.film) { sx += Math.sin(t * 13) * 2; sy += Math.sin(t * 7.3) * 3; }
  X.fillStyle = INK; X.fillRect(0, 0, VW, VH); X.save(); X.translate(960 + sx + wx, 540 + sy); X.scale(pz, pz); X.translate(-960, -540); X.drawImage(OFF, 0, 0);
  if (wx > 2) { X.globalAlpha = .3; X.drawImage(OFF, wx * .5, 0); X.globalAlpha = .15; X.drawImage(OFF, wx, 0); } X.restore();
  for (const [g0, g1, amt] of F.glitch) if (t >= g0 && t < g1) {
    const k = amt * Math.sin(lin(t, g0, g1) * Math.PI), f = Math.floor(t * 30);
    X.save(); X.globalCompositeOperation = 'screen'; X.globalAlpha = .55 * k;
    for (const [col, dx] of [['#ff0000', 36], ['#00ffff', -36]]) { T.clearRect(0, 0, VW, VH); T.drawImage(OFF, 0, 0); T.globalCompositeOperation = 'multiply'; T.fillStyle = col; T.fillRect(0, 0, VW, VH); T.globalCompositeOperation = 'source-over'; X.drawImage(TMP, dx * k, 0); }
    X.restore(); for (let i = 0; i < 11; i++) { const y = hash(f * 13 + i) * VH, h = 14 + hash(f * 7 + i) * 90, dx = (hash(f * 3 + i) - .5) * 400 * k; X.drawImage(OFF, 0, y, VW, h, dx, y, VW, h); }
    X.fillStyle = `rgba(255,255,255,${.14 * k * (f % 2)})`; X.fillRect(0, 0, VW, VH);
  }
  for (const [f0, d, col, a] of F.flash) if (t >= f0 && t < f0 + d) { X.fillStyle = `rgba(${col},${a * (1 - (t - f0) / d)})`; X.fillRect(0, 0, VW, VH); }
  // film grain (overlay-ish): deterministic tiles
  if (NOISE.length) { const f = Math.floor(t * 24); X.save(); X.globalAlpha = o.film ? .07 : .045; X.globalCompositeOperation = 'overlay'; const nz = NOISE[f % NOISE.length]; const ox = Math.floor(hash(f) * 256), oy = Math.floor(hash(f + 77) * 256);
    for (let y = -oy; y < VH; y += 256) for (let x = -ox; x < VW; x += 256) X.drawImage(nz, x, y); X.restore(); }
};
