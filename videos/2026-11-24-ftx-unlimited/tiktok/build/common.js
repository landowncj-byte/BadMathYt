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
function toggle(c, t, k, topLabel, flick) {
  c.save(); const x = 260, y = 520, w = 560, h = 240;
  const g = c.createRadialGradient(540, 640, 60, 540, 640, 520); g.addColorStop(0, `rgba(255,59,48,${.35 * k + .08})`); g.addColorStop(1, 'rgba(255,59,48,0)'); c.fillStyle = g; c.fillRect(0, 300, W, 700);
  rr(c, x, y, w, h, 120); c.fillStyle = '#2a323d'; c.fill();
  c.save(); c.shadowColor = RED; c.shadowBlur = 70 * k; c.globalAlpha = k; rr(c, x, y, w, h, 120); c.fillStyle = RED; c.fill(); c.restore();
  const kx = x + 120 + (w - 240) * k; c.save(); c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 20; c.fillStyle = PAPER; c.beginPath(); c.arc(kx, y + 120, 100, 0, 7); c.fill(); c.restore();
  txt(c, 'LIMITED', 330, 840, '400 56px Anton', k < .5 ? PAPER : 'rgba(245,243,238,.3)'); txt(c, 'UNLIMITED', 760, 840, '400 56px Anton', k >= .5 ? RED : 'rgba(245,243,238,.3)');
  const fl = flick ? (Math.sin(t * 60) > .2 ? 1 : .55) : 1; c.globalAlpha = fl; txt(c, topLabel, 540, 410, '400 96px Anton', PAPER); c.restore();
}
const CODE = [[['# credit limits', '#6b7686']], [['account = ', PAPER], ['"ALAMEDA"', HL]], [['credit_line = ', PAPER], ['UNLIMITED', RED]], [['collateral = ', PAPER], ['NONE', RED]], [['margin_call = ', PAPER], ['False', '#7ef0b0']]];
function codeWin(c, t, x, y, w, h, t0, t1, size, lh, hi) {
  c.save(); rr(c, x, y, w, h, 18); c.fillStyle = '#0d1219'; c.fill(); c.strokeStyle = '#3a434f'; c.lineWidth = 3; c.stroke();
  rr(c, x, y, w, 56, [18, 18, 0, 0]); c.fillStyle = '#1a212b'; c.fill(); ['#ff5f57', '#febc2e', '#28c840'].forEach((col, i) => { c.fillStyle = col; c.beginPath(); c.arc(x + 34 + i * 34, y + 28, 10, 0, 7); c.fill(); });
  txt(c, 'credit_engine.py', x + w - 30, y + 29, '700 24px JBM', 'rgba(245,243,238,.55)', 'right');
  const total = CODE.reduce((a, l) => a + l.reduce((b, p) => b + p[0].length, 0), 0); let n = Math.floor(lin(t, t0, t1) * total);
  CODE.forEach((ln, i) => { const ly = y + 110 + i * lh; if (hi[i]) { const hk = lin(t, hi[i], hi[i] + .2); c.fillStyle = `rgba(255,59,48,${.28 * hk})`; c.fillRect(x + 10, ly - lh / 2 + 6, w - 20, lh - 6); }
    let px = x + 34; for (const [s, col] of ln) { const m = Math.max(0, Math.min(s.length, n)); n -= s.length; c.font = `700 ${size}px JBM`; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillStyle = col; c.fillText(s.slice(0, m), px, ly); px += s.length * size * .6; } });
  c.restore();
}

// ---------- captions (from words.json, Whisper mistakes fixed per cut) ----------
// fix(tokens) -> tokens; cfg {max, w, size, x, y, lh}
const GRN = ['billion', 'million', 'credit', '25', 'eight', 'money'], REDW = ['fraud', 'bankrupt', 'no', 'collateral', 'guilty', 'unlimited', 'took', 'empty', 'gone', 'thief', 'sh*t', 'f***ing', 'dumbass', 'worse', 'dumb'],
  YEL = ['like', 'send', 'follow', 'engineer', 'testified', 'seven', 'counts', 'limit', 'genius', 'comments', 'twenty-five'];
function buildCaps(words, fix, max) {
  let toks = words.map(w => ({ w: w.w, s: w.s, e: w.e })); toks = fix(toks);
  const groups = []; let g = [];
  for (const k of toks) { const prev = g[g.length - 1]; if (g.length && (g.length >= max || /[,.?!]$/.test(prev.w) || k.s - prev.e > .5)) { groups.push(g); g = []; } g.push(k); }
  if (g.length) groups.push(g);
  return groups.map((gr, i) => ({
    s: gr[0].s - .03, e: groups[i + 1] ? Math.min(groups[i + 1][0].s - .03, gr[gr.length - 1].e + .6) : gr[gr.length - 1].e + .3,
    parts: gr.map(k => { const raw = k.w.replace(/[,.?!]+$/, '').toUpperCase(); const lo = raw.toLowerCase().replace(/'s$/, ''); const col = (raw.startsWith('$') || GRN.includes(lo)) ? GREEN : REDW.includes(lo) ? RED : YEL.includes(lo) ? HL : PAPER; return [raw, col]; })
  }));
}
function drawCaption(c, t, CAPS, cfg) {
  const cp = CAPS.find(x => t >= x.s && t < x.e); if (!cp) return;
  const k = eo(lin(t, cp.s, cp.s + .1)), parts = cp.parts;
  c.save(); c.font = `800 ${cfg.size}px Inter`; const sp = c.measureText(' ').width;
  const lines = [[]]; let lw = 0; for (const p of parts) { const w = c.measureText(p[0]).width; if (lw + w > cfg.w && lines[lines.length - 1].length) { lines.push([]); lw = 0; } lines[lines.length - 1].push([...p, w]); lw += w + sp; }
  const y0 = cfg.y - (lines.length - 1) * cfg.lh / 2; c.translate(cfg.x, y0); c.scale(.8 + .2 * k, .8 + .2 * k); c.globalAlpha = k;
  lines.forEach((ln, li) => { const tw = ln.reduce((a, p) => a + p[2], 0) + sp * (ln.length - 1); let px = -tw / 2;
    for (const [w, col, ww] of ln) { c.textAlign = 'left'; c.textBaseline = 'middle'; c.lineWidth = cfg.size * .2; c.strokeStyle = 'rgba(0,0,0,.88)'; c.lineJoin = 'round'; c.strokeText(w, px, li * cfg.lh); c.fillStyle = col; c.fillText(w, px, li * cfg.lh); px += ww + sp; } });
  c.restore();
}
const mergeBF = toks => { const o = []; for (const k of toks) { const p = o[o.length - 1]; if (/^fried/i.test(k.w) && p && /^bankman/i.test(p.w)) { p.w = 'BANKMAN-FRIED' + (k.w.match(/[,.?!]+$/) || [''])[0]; p.e = k.e; } else o.push({ ...k }); } return o; };
// full-frame compositor: scene -> OFF, then zoom/shake/glitch -> main canvas
function compose(t, SC, o) {
  const sc = SC.find(s => t >= s[0] && t < s[1]) || SC[SC.length - 1];
  O.save(); sc[2](O, t); O.restore(); vignette(O, .65); o.hud(O, t); Storyteller.draw(O, t, { ...o.st, mouth: MOUTH[Math.min(MOUTH.length - 1, Math.floor(t * 30))] || 0 }); drawCaption(O, t, o.caps, o.cap);
  let sx = 0, sy = 0; for (const [s0, d, amp] of o.shake) if (t >= s0 && t < s0 + d) { const k = 1 - (t - s0) / d; sx += Math.sin(t * 97) * amp * k; sy += Math.cos(t * 83) * amp * k; }
  let pz = 1; for (const [s0, d, a] of o.punch) if (t >= s0 && t < s0 + d) pz += a * (1 - (t - s0) / d);
  if (o.boom && t >= o.boom && t < o.boom + .5) pz += .25 * (t < o.boom + .06 ? lin(t, o.boom, o.boom + .06) : 1 - eo(lin(t, o.boom + .06, o.boom + .5)));   // MEME #1 boom zoom
  for (const s of SC) if (s[0] > 0 && t >= s[0] && t < s[0] + .12) pz += .07 * (1 - (t - s[0]) / .12);   // hard-cut punch-in
  X.fillStyle = INK; X.fillRect(0, 0, W, H); X.save(); X.translate(540 + sx, 960 + sy); X.scale(pz, pz); X.translate(-540, -960); X.drawImage(OFF, 0, 0); X.restore();
  for (const [g0, g1, amt] of o.glitch) if (t >= g0 && t < g1) {
    const k = amt * Math.sin(lin(t, g0, g1) * Math.PI) ** .5, f = Math.floor(t * 30);
    X.save(); X.globalCompositeOperation = 'screen'; X.globalAlpha = .55 * k;
    T.clearRect(0, 0, W, H); T.drawImage(OFF, 0, 0); T.globalCompositeOperation = 'multiply'; T.fillStyle = '#ff0000'; T.fillRect(0, 0, W, H); T.globalCompositeOperation = 'source-over';
    X.drawImage(TMP, 24 * k, 0); T.clearRect(0, 0, W, H); T.drawImage(OFF, 0, 0); T.globalCompositeOperation = 'multiply'; T.fillStyle = '#00ffff'; T.fillRect(0, 0, W, H); T.globalCompositeOperation = 'source-over';
    X.drawImage(TMP, -24 * k, 0); X.restore();
    for (let i = 0; i < 9; i++) { const y = hash(f * 13 + i) * H, h = 20 + hash(f * 7 + i) * 120, dx = (hash(f * 3 + i) - .5) * 260 * k; X.drawImage(OFF, 0, y, W, h, dx, y, W, h); }
    X.fillStyle = `rgba(255,255,255,${.14 * k * (f % 2)})`; X.fillRect(0, 0, W, H);
  }
}
const FONTS = [['Anton', 'node_modules/@fontsource/anton/files/anton-latin-400-normal.woff2', '400'], ['Inter', 'node_modules/@fontsource/inter/files/inter-latin-800-normal.woff2', '800'],
  ['JBM', 'node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-800-normal.woff2', '800'], ['JBM', 'node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff2', '700']];
const loadFonts = first => Promise.all(FONTS.map(([f, u, w]) => new FontFace(f, `url(${u})`, { weight: w }).load().then(ff => document.fonts.add(ff)))).then(() => { window.render(first); return true; });
