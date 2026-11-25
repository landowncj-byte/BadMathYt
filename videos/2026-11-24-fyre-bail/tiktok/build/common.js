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
const GRN = ['$90,000,000', '$60,000', '$12,000', 'yes'], REDW = ['fraud', 'bail', 'guilty', 'fake', 'tents', 'prison', 'wire', 'sandwich', 'no', 'clown', 'absolute', 'scammed', 'caught', 'years'],
  YEL = ['follow', 'send', 'fyre', 'festival', '2', '2?', '2017', 'billy', 'mcfarland', 'met', 'gala', 'comment', 'tickets', 'ticket', 'go'];
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
  ['JBM', 'node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-800-normal.woff2', '800'], ['JBM', 'node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff2', '700'],
  ['Elite', 'node_modules/@fontsource/special-elite/files/special-elite-latin-400-normal.woff2', '400']];
const loadFonts = first => Promise.all(FONTS.map(([f, u, w]) => new FontFace(f, `url(${u})`, { weight: w }).load().then(ff => document.fonts.add(ff)))).then(() => { window.render(first); return true; });

// ---------- Fyre drawn assets (reused from the YouTube build) ----------
const mix = (a, b, x) => a + (b - a) * x;
function steelGrad(c, x0, y0, x1, y1) { const g = c.createLinearGradient(x0, y0, x1, y1); g.addColorStop(0, '#eef2f7'); g.addColorStop(.45, '#a9b4c2'); g.addColorStop(1, '#5b6573'); return g; }
function cuffRing(c, cx, cy, R, gap, flip) {
  c.save(); c.translate(cx, cy); if (flip) c.scale(-1, 1);
  c.lineCap = 'butt'; c.strokeStyle = '#3a434f'; c.lineWidth = 40; c.beginPath(); c.arc(0, 0, R, Math.PI + gap / 2, 3 * Math.PI - gap / 2); c.stroke();
  c.strokeStyle = steelGrad(c, -R, -R, R, R); c.lineWidth = 30; c.beginPath(); c.arc(0, 0, R, Math.PI + gap / 2, 3 * Math.PI - gap / 2); c.stroke();
  c.strokeStyle = 'rgba(255,255,255,.55)'; c.lineWidth = 6; c.beginPath(); c.arc(0, 0, R + 6, Math.PI * 1.15, Math.PI * 1.65); c.stroke();
  // jaw teeth
  for (const s of [-1, 1]) { const a = Math.PI + s * gap / 2; c.save(); c.translate(Math.cos(a) * R, Math.sin(a) * R); c.rotate(a); c.fillStyle = '#6b7685'; c.fillRect(-8, -18, 16, 36); c.restore(); }
  // lock block
  rr(c, R - 40, -52, 100, 104, 16); c.fillStyle = steelGrad(c, R - 40, -52, R + 60, 52); c.fill(); c.strokeStyle = '#2a323d'; c.lineWidth = 6; c.stroke();
  c.fillStyle = '#2a323d'; c.beginPath(); c.arc(R + 10, -6, 12, 0, 7); c.fill(); c.fillRect(R + 6, -6, 8, 30);
  c.restore();
}
function cuffs(c, cx, cy, gap, t) {
  c.save(); c.translate(cx, cy); c.rotate(Math.sin(t * 2.6) * .045);
  const L = -210, Rr = 210, R = 96;
  // chain
  for (let i = 0; i < 4; i++) { const x = L + 150 + i * 70, even = i % 2 === 0; c.save(); c.translate(x, Math.sin(t * 3 + i) * 4 + 18); c.strokeStyle = '#2a323d'; c.lineWidth = 22; c.beginPath(); c.ellipse(0, 0, even ? 40 : 26, even ? 20 : 20, 0, 0, 7); c.stroke(); c.strokeStyle = steelGrad(c, -40, -20, 40, 20); c.lineWidth = 14; c.beginPath(); c.ellipse(0, 0, even ? 40 : 26, 20, 0, 0, 7); c.stroke(); c.restore(); }
  cuffRing(c, L, 0, R, gap, false); cuffRing(c, Rr, 0, R, gap, true);
  c.restore();
}
function palm(c, x, y, h, lean, t, ph) {
  c.save(); c.strokeStyle = '#7a5230'; c.lineWidth = h * .075; c.lineCap = 'round'; c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + lean * .1, y - h * .55, x + lean, y - h); c.stroke();
  c.strokeStyle = 'rgba(0,0,0,.18)'; c.lineWidth = h * .02; for (let i = 1; i < 6; i++) { const f = i / 6; const px = mix(x, x + lean, f * f * .8 + f * .2), py = y - h * f; c.beginPath(); c.moveTo(px - h * .04, py); c.lineTo(px + h * .04, py - 3); c.stroke(); }
  const tx = x + lean, ty = y - h;
  for (let i = 0; i < 8; i++) { const a = -Math.PI / 2 + (i - 3.5) * .62 + Math.sin(t * 1.7 + ph + i * .7) * .06; const L = h * .62; const ex = tx + Math.cos(a) * L, ey = ty + Math.sin(a) * L * .55 + L * .42;
    c.fillStyle = i % 2 ? '#169b57' : '#2fc46d'; c.beginPath(); c.moveTo(tx, ty); c.quadraticCurveTo(tx + Math.cos(a) * L * .55, ty + Math.sin(a) * L * .9 - 14, ex, ey); c.quadraticCurveTo(tx + Math.cos(a) * L * .5 - Math.sin(a) * 12, ty + Math.sin(a) * L * .7 + 10, tx, ty); c.fill(); }
  c.fillStyle = '#5b3a1e'; c.beginPath(); c.arc(tx - 6, ty + 8, h * .04, 0, 7); c.arc(tx + 7, ty + 10, h * .04, 0, 7); c.fill(); c.restore();
}
function yacht(c, x, y, s, t) {
  c.save(); c.translate(x, y + Math.sin(t * 2.2) * 3); c.scale(s, s);
  c.fillStyle = 'rgba(255,255,255,.55)'; c.beginPath(); c.moveTo(-80, 24); c.quadraticCurveTo(-170, 30, -250, 26); c.quadraticCurveTo(-170, 38, -80, 36); c.fill();
  c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(-120, 0); c.lineTo(130, 0); c.quadraticCurveTo(150, 0, 138, 18); c.lineTo(100, 36); c.lineTo(-100, 36); c.quadraticCurveTo(-130, 20, -120, 0); c.fill();
  c.fillStyle = '#0b3d91'; c.fillRect(-114, 12, 240, 6);
  c.fillStyle = '#eef3f8'; rr(c, -60, -34, 130, 34, 8); c.fill(); rr(c, -30, -62, 70, 30, 8); c.fill();
  c.fillStyle = '#2aa9d6'; for (let i = 0; i < 4; i++) c.fillRect(-52 + i * 30, -24, 20, 14); c.fillRect(-20, -54, 50, 14);
  c.strokeStyle = '#ffffff'; c.lineWidth = 3; c.beginPath(); c.moveTo(5, -62); c.lineTo(5, -92); c.stroke(); c.fillStyle = RED; c.beginPath(); c.moveTo(5, -92); c.lineTo(28, -85); c.lineTo(5, -78); c.fill();
  c.restore();
}
function drawPromo(c, t, W0, H0) {
  c.save();
  let g = c.createLinearGradient(0, 0, 0, 340); g.addColorStop(0, '#3fb6f5'); g.addColorStop(.55, '#ffd9a8'); g.addColorStop(1, '#ff9a6c'); c.fillStyle = g; c.fillRect(0, 0, W0, 340);
  const sg = c.createRadialGradient(610, 255, 10, 610, 255, 200); sg.addColorStop(0, 'rgba(255,255,220,1)'); sg.addColorStop(.25, 'rgba(255,230,150,.9)'); sg.addColorStop(1, 'rgba(255,200,120,0)'); c.fillStyle = sg; c.fillRect(300, 40, 600, 400);
  for (let i = 0; i < 3; i++) { const cx = ((i * 330 + t * 14) % 1000) - 100; c.fillStyle = 'rgba(255,255,255,.75)'; c.beginPath(); c.ellipse(cx, 70 + i * 40, 90, 22, 0, 0, 7); c.ellipse(cx + 50, 60 + i * 40, 60, 26, 0, 0, 7); c.fill(); }
  g = c.createLinearGradient(0, 335, 0, 600); g.addColorStop(0, '#22e0cf'); g.addColorStop(.5, '#0fb1c4'); g.addColorStop(1, '#075e8f'); c.fillStyle = g; c.fillRect(0, 335, W0, 265);
  c.strokeStyle = 'rgba(255,255,255,.35)'; c.lineWidth = 3; for (let r = 0; r < 7; r++) { c.beginPath(); for (let x = 0; x <= W0; x += 14) { const y = 360 + r * 36 + Math.sin(x * .03 + t * 2.4 + r * 1.3) * 5; x ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke(); }
  // sun glitter
  for (let i = 0; i < 14; i++) { const k = (Math.sin(t * 5 + i * 2.3) + 1) / 2; c.fillStyle = `rgba(255,255,255,${.25 + .7 * k})`; const gx = 540 + hash(i) * 150, gy = 350 + hash(i + 9) * 120; c.fillRect(gx, gy, 14 * k + 3, 3); }
  // island
  c.fillStyle = '#f2d99a'; c.beginPath(); c.ellipse(250, 352, 270, 46, 0, Math.PI, 0); c.fill(); c.fillStyle = '#e1c37a'; c.beginPath(); c.ellipse(250, 355, 270, 18, 0, 0, Math.PI); c.fill();
  c.fillStyle = '#35b36a'; c.beginPath(); c.ellipse(260, 330, 150, 36, 0, Math.PI, 0); c.fill();
  palm(c, 150, 345, 190, -30, t, 0); palm(c, 300, 340, 230, 36, t, 2); palm(c, 400, 346, 160, 28, t, 4);
  yacht(c, mix(900, -80, lin(t, 0, 5.3)), 470, 1.05, t);
  // glossy sheen
  g = c.createLinearGradient(0, 0, W0, H0); g.addColorStop(0, 'rgba(255,255,255,.28)'); g.addColorStop(.35, 'rgba(255,255,255,0)'); g.addColorStop(1, 'rgba(255,255,255,.06)'); c.fillStyle = g; c.fillRect(0, 0, W0, H0);
  c.fillStyle = 'rgba(11,15,20,.72)'; c.fillRect(0, 502, W0, 98);
  c.font = '400 54px Anton'; let s = '#'; const str = 'FYRE FESTIVAL · BAHAMAS · 2017'; const tw = c.measureText(str).width; const f = Math.min(1, 780 / tw);
  c.save(); c.translate(W0 / 2, 552); c.scale(f, f); txt(c, str, 0, 0, '400 54px Anton', PAPER); c.restore();
  if (t > .3) { const k = back(lin(t, .3, .6)); c.save(); c.translate(120, 120); c.rotate(-.18); c.scale(k, k); c.fillStyle = '#ffd60a'; c.beginPath(); for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2, r = i % 2 ? 62 : 78; c.lineTo(Math.cos(a) * r, Math.sin(a) * r); } c.closePath(); c.fill(); txt(c, 'LUXURY', 0, -2, '400 30px Anton', INK); c.restore(); }
  c.restore();
}
function pen(c, x, y) { c.save(); c.translate(x, y); c.rotate(-.95); c.fillStyle = '#7a1c16'; c.beginPath(); c.moveTo(0, 0); c.lineTo(34, -9); c.lineTo(34, 9); c.closePath(); c.fill(); rr(c, 34, -12, 150, 24, 8); c.fillStyle = RED; c.fill(); rr(c, 184, -14, 46, 28, 8); c.fillStyle = '#e8e8e8'; c.fill(); c.restore(); }
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

function drawVilla(c, t) {
  let g = c.createLinearGradient(0, 0, 0, 440); g.addColorStop(0, '#47b9f7'); g.addColorStop(1, '#cdeeff'); c.fillStyle = g; c.fillRect(0, 0, 840, 600);
  c.fillStyle = '#ffe9a0'; c.beginPath(); c.arc(700, 100, 50, 0, 7); c.fill();
  c.fillStyle = '#3fbf6f'; c.fillRect(0, 400, 840, 200);
  c.fillStyle = '#fff'; rr(c, 120, 230, 420, 190, 6); c.fill(); rr(c, 190, 150, 290, 90, 6); c.fill(); c.fillStyle = '#d8dee6'; c.fillRect(110, 222, 440, 14); c.fillRect(180, 142, 310, 12);
  c.fillStyle = '#ffd27a'; for (let i = 0; i < 4; i++) c.fillRect(145 + i * 98, 262, 72, 120); for (let i = 0; i < 3; i++) c.fillRect(215 + i * 90, 172, 62, 52);
  g = c.createLinearGradient(0, 430, 0, 580); g.addColorStop(0, '#2fe0d2'); g.addColorStop(1, '#0d9fc4'); c.fillStyle = g; c.beginPath(); c.moveTo(150, 440); c.lineTo(700, 440); c.lineTo(760, 575); c.lineTo(90, 575); c.fill();
  c.strokeStyle = 'rgba(255,255,255,.6)'; c.lineWidth = 3; for (let r = 0; r < 4; r++) { c.beginPath(); for (let x = 130; x < 730; x += 10) { const y = 465 + r * 28 + Math.sin(x * .05 + t * 3 + r) * 3; x > 130 ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke(); }
  palm(c, 60, 420, 230, 30, t, 0); palm(c, 790, 420, 210, -30, t, 3);
  c.strokeStyle = 'rgba(0,0,0,.35)'; c.lineWidth = 2; c.beginPath(); c.moveTo(0, 40); c.quadraticCurveTo(420, 100, 840, 40); c.stroke(); for (let i = 0; i < 9; i++) { const x = i * 105, y = 40 + Math.sin(i / 8 * Math.PI) * 30 + 0; c.fillStyle = Math.sin(t * 6 + i) > 0 ? '#fff1a8' : '#ffd24a'; c.beginPath(); c.arc(x, 44 + Math.sin(i / 8 * Math.PI) * 28, 7, 0, 7); c.fill(); }
  rr(c, 24, 24, 230, 52, 12); c.fillStyle = '#f2b705'; c.fill(); txt(c, 'EXPECTATION', 139, 51, '800 28px JBM', INK);
}
function drawTents(c, t) {
  let g = c.createLinearGradient(0, 0, 0, 380); g.addColorStop(0, '#5c6672'); g.addColorStop(1, '#a3adb9'); c.fillStyle = g; c.fillRect(0, 0, 840, 600);
  c.fillStyle = '#6a5a46'; c.fillRect(0, 380, 840, 220); c.fillStyle = 'rgba(180,200,220,.55)'; c.beginPath(); c.ellipse(220, 520, 130, 22, 0, 0, 7); c.ellipse(600, 550, 160, 24, 0, 0, 7); c.fill();
  const tent = (x, y, w, h, col) => { c.fillStyle = col; c.beginPath(); c.moveTo(x - w / 2, y); c.lineTo(x, y - h); c.lineTo(x + w / 2, y); c.closePath(); c.fill(); c.strokeStyle = 'rgba(0,0,0,.35)'; c.lineWidth = 4; c.stroke(); c.fillStyle = 'rgba(0,0,0,.45)'; c.beginPath(); c.moveTo(x - w * .1, y); c.lineTo(x, y - h * .5); c.lineTo(x + w * .1, y); c.fill();
    c.strokeStyle = 'rgba(255,255,255,.6)'; c.lineWidth = 2; c.beginPath(); c.moveTo(x - w / 2, y); c.lineTo(x - w / 2 - 34, y + 26); c.moveTo(x + w / 2, y); c.lineTo(x + w / 2 + 34, y + 26); c.stroke(); };
  tent(170, 430, 240, 170, '#d8d2bd'); tent(440, 460, 300, 210, '#c9d1ad'); tent(700, 430, 230, 160, '#d8d2bd');
  c.strokeStyle = 'rgba(210,225,245,.65)'; c.lineWidth = 3; for (let i = 0; i < 46; i++) { const x = (hash(i) * 960 + t * 140) % 960 - 60, y = (hash(i + 50) * 700 + t * 640) % 700 - 60; c.beginPath(); c.moveTo(x, y); c.lineTo(x - 20, y + 52); c.stroke(); }
  rr(c, 24, 24, 200, 52, 12); c.fillStyle = RED; c.fill(); txt(c, 'REALITY', 124, 51, '800 28px JBM', PAPER);
}
function sandwich(c, t, k, dr = 0) {
  const droop = clamp(dr); c.save(); c.scale(k, k);
  const bread = (y, rot) => { c.save(); c.translate(0, y); c.rotate(rot); rr(c, -150, -24, 300, 48, 20); c.fillStyle = '#e2a65e'; c.fill(); c.strokeStyle = '#a8662a'; c.lineWidth = 8; c.stroke(); c.restore(); };
  bread(26, 0);
  c.fillStyle = '#ffd23c'; c.beginPath(); c.moveTo(-165, 0); c.lineTo(165, 0); c.lineTo(165 + 14, 10); c.lineTo(175, 34 + droop * 40); c.lineTo(150, 14 + droop * 30); c.lineTo(-150, 12); c.lineTo(-178, 22 + droop * 34); c.lineTo(-170, 10); c.closePath(); c.fill(); c.strokeStyle = '#d9a300'; c.lineWidth = 3; c.stroke();
  bread(-26 - droop * -6, -.02 - droop * .05);
  c.save(); c.translate(0, -26); c.rotate(-.02 - droop * .05);
  for (const s of [-1, 1]) { c.fillStyle = INK; c.beginPath(); c.arc(s * 48, 0, 8, 0, 7); c.fill(); c.strokeStyle = INK; c.lineWidth = 5; c.lineCap = 'round'; c.beginPath(); c.moveTo(s * 30, -18 - droop * 2); c.lineTo(s * 66, -26 + droop * 10 * s * -1 * -1); c.stroke(); }
  c.strokeStyle = INK; c.lineWidth = 5; c.beginPath(); c.arc(0, 24, 18, 1.15 * Math.PI, 1.85 * Math.PI); c.stroke();
  const tp = (t * .9) % 1; c.fillStyle = '#5ac8fa'; c.beginPath(); c.arc(-48 + 0, 12 + tp * 60, 6 * (1 - tp * .3), 0, 7); c.fill(); c.restore();
  c.restore();
}
function ankle(c, t, x, y, s) {
  c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = '#aab4c0'; rr(c, -62, -260, 124, 380, 40); c.fill(); c.fillStyle = '#eef2f7'; rr(c, -64, -250, 128, 70, 20); c.fill();
  c.fillStyle = '#8f9aa8'; c.beginPath(); c.moveTo(-64, 100); c.quadraticCurveTo(-60, 190, -20, 200); c.lineTo(150, 200); c.quadraticCurveTo(190, 200, 190, 160); c.lineTo(190, 130); c.lineTo(62, 110); c.lineTo(62, 60); c.lineTo(-64, 60); c.fill();
  c.fillStyle = '#f5f3ee'; c.fillRect(-60, 170, 230, 24);
  c.fillStyle = '#1c2128'; rr(c, -70, -30, 140, 50, 8); c.fill(); c.strokeStyle = '#4a5563'; c.lineWidth = 3; c.setLineDash([8, 8]); c.beginPath(); c.moveTo(-60, -5); c.lineTo(60, -5); c.stroke(); c.setLineDash([]);
  rr(c, 28, -64, 120, 112, 14); c.fillStyle = '#10151c'; c.fill(); c.strokeStyle = '#6b7685'; c.lineWidth = 5; c.stroke();
  const on = (t * 2) % 1 < .5; c.fillStyle = on ? RED : '#4a1612'; if (on) { c.shadowColor = RED; c.shadowBlur = 30; } c.beginPath(); c.arc(88, -26, 12, 0, 7); c.fill(); c.shadowBlur = 0;
  txt(c, 'GPS', 88, 18, '800 22px JBM', 'rgba(245,243,238,.7)');
  for (let i = 0; i < 3; i++) { const p = ((t * 1.2) + i / 3) % 1; c.strokeStyle = `rgba(255,59,48,${(1 - p) * .8})`; c.lineWidth = 6; c.beginPath(); c.arc(88, -26, 30 + p * 110, -Math.PI * .85, -Math.PI * .15); c.stroke(); }
  c.restore();
}

// ---------- shared scene helpers for the TikTok + IG cuts ----------
const goldG = (c, x0, y0, x1, y1) => { const g = c.createLinearGradient(x0, y0, x1, y1); g.addColorStop(0, '#ffe27a'); g.addColorStop(.5, '#f2b705'); g.addColorStop(1, '#c98f00'); return g; };
// big Anton text with ink outline, slam-in scale; maxW fits the width
function big(c, s, x, y, size, col, k = 1, rot = 0, glow = 0, maxW = 0) {
  if (k <= 0) return; c.save(); c.font = `400 ${size}px Anton`; if (maxW) { const w = c.measureText(s).width; if (w > maxW) size = Math.floor(size * maxW / w); }
  c.globalAlpha = clamp(k * 2.5); const sc = lerp(1.4, 1, back(k)); c.translate(x, y); c.rotate(rot); c.scale(sc, sc);
  if (glow) { c.shadowColor = col; c.shadowBlur = glow; } c.lineJoin = 'round'; c.lineWidth = size * .13; c.strokeStyle = 'rgba(0,0,0,.85)'; c.font = `400 ${size}px Anton`; c.textAlign = 'center'; c.textBaseline = 'middle';
  c.strokeText(s, 0, 0); c.shadowBlur = glow ? glow : 0; c.fillStyle = col; c.fillText(s, 0, 0); c.restore();
}
// VIP package ticket (800x380 design space) drawn at (x,y) with scale s
function vipTicket(c, t, x, y, s, rot, label = 'VIP PACKAGE') {
  c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s);
  ticket(c, 0, 0, 800, 380, 0, 1, goldG(c, -400, -190, 400, 190), 'rgba(11,15,20,.55)', INK);
  txt(c, 'FYRE FESTIVAL · BAHAMAS', -70, -140, '800 24px JBM', 'rgba(11,15,20,.7)'); txt(c, label, -70, -62, '400 104px Anton', INK);
  rr(c, -330, 8, 520, 150, 18); c.fillStyle = INK; c.fill(); txt(c, '$12,000', -70, 86, '400 118px Anton', GREEN);
  barcode(c, 260, -130, 100, 150, 'rgba(11,15,20,.8)'); txt(c, 'ADMIT 1', 312, 70, '800 24px JBM', 'rgba(11,15,20,.8)'); txt(c, '★ VIP ★', 312, 118, '400 34px Anton', INK); c.restore();
}
// cheese sandwich in a foam box (origin = box centre), sandwich drawn with our own shapes
function mealBox(c, t, k, dr = 0, label = true) {
  c.save(); c.translate(0, -78); c.rotate(-.03); rr(c, -260, -110, 520, 130, 24); c.fillStyle = '#f6f2e8'; c.fill(); c.strokeStyle = '#cdc5b0'; c.lineWidth = 6; c.stroke(); c.restore();
  rr(c, -280, -60, 560, 190, 34); const fg = c.createLinearGradient(0, -60, 0, 130); fg.addColorStop(0, '#fbf8ef'); fg.addColorStop(1, '#ddd6c2'); c.fillStyle = fg; c.fill(); c.strokeStyle = '#bdb59e'; c.lineWidth = 6; c.stroke();
  rr(c, -250, -40, 500, 90, 22); c.fillStyle = '#cfc7b1'; c.fill();
  c.save(); sandwich(c, t, k, dr); c.restore();
  if (label) { c.save(); c.translate(0, 92); c.rotate(-.015); rr(c, -190, -28, 380, 56, 8); c.fillStyle = '#fff'; c.fill(); txt(c, 'GOURMET MEAL*', 0, -6, '400 34px Anton', INK); txt(c, '*1 CHEESE SLICE', 0, 16, '800 17px JBM', '#6b7685'); c.restore(); }
}
// founder card (the drawn McFarland card; 620x520, origin = centre)
function founderCard(c, k = 1, name = 'BILLY McFARLAND') {
  c.save(); c.scale(k, k); c.shadowColor = 'rgba(0,0,0,.55)'; c.shadowBlur = 28; rr(c, -310, -260, 620, 520, 24); c.fillStyle = PAPER; c.fill(); c.shadowBlur = 0;
  rr(c, -310, -260, 620, 16, [24, 24, 0, 0]); c.fillStyle = RED; c.fill();
  c.save(); c.beginPath(); c.rect(-310, -260, 620, 520); c.clip(); silhouette(c, 0, -60, 170, '#2a323d'); c.restore();
  txt(c, name, 0, 135, '400 60px Anton', INK); rr(c, -80, 180, 160, 46, 10); c.fillStyle = RED; c.fill(); txt(c, 'FOUNDER', 0, 203, '800 26px Inter', PAPER); c.restore();
}
// court document with stamps
function docCard(c, t, t0, head, sub) {
  const sl = back(lin(t, t0, t0 + .36)); c.save(); c.translate(540, 700 + (1 - sl) * 700); c.rotate(-.03 + (1 - sl) * .1);
  c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 30; rr(c, -310, -330, 620, 680, 12); c.fillStyle = PAPER; c.fill(); c.shadowBlur = 0;
  txt(c, 'UNITED STATES · CRIMINAL CASE', 0, -290, '800 22px JBM', '#6b7685'); txt(c, head, 0, -240, '400 52px Anton', INK);
  c.fillStyle = '#c3c9d1'; for (let i = 0; i < 9; i++) { const w = 500 * lin(t, t0 + .3 + i * .06, t0 + .4 + i * .06) * (i % 3 === 2 ? .6 : 1); c.fillRect(-250, -170 + i * 36, w, 14); }
  txt(c, sub, 0, 250, '800 26px JBM', '#6b7685'); c.restore();
}
const paperPlane = (c, p, P0, P1, P2, sz = 1.1) => { const bz = u => [(1 - u) * (1 - u) * P0[0] + 2 * (1 - u) * u * P1[0] + u * u * P2[0], (1 - u) * (1 - u) * P0[1] + 2 * (1 - u) * u * P1[1] + u * u * P2[1]]; const e = eo(p); const [x, y] = bz(e), [x2, y2] = bz(Math.min(1, e + .02));
  c.save(); c.strokeStyle = 'rgba(245,243,238,.5)'; c.lineWidth = 4; c.setLineDash([4, 14]); c.lineCap = 'round'; c.beginPath(); for (let i = 0; i <= 20; i++) { const [tx, ty] = bz(e * i / 20); i ? c.lineTo(tx, ty) : c.moveTo(tx, ty); } c.stroke(); c.restore();
  c.save(); c.globalAlpha = 1 - lin(p, .8, 1); plane(c, x, y, Math.atan2(y2 - y, x2 - x), sz); c.restore(); };
function jailBars(c, drop, bt = 300, bb = 1180, x0 = 90, x1 = 990) { // bars slam down
  c.save(); const rail = (bb - bt) * drop; const n = 9, gap = (x1 - x0) / (n - 1); for (let i = 0; i < n; i++) { const bx = x0 + i * gap; const g = c.createLinearGradient(bx - 20, 0, bx + 20, 0); g.addColorStop(0, '#2a323d'); g.addColorStop(.5, '#a7b1bf'); g.addColorStop(1, '#2a323d'); c.fillStyle = g; rr(c, bx - 20, bt, 40, rail, 18); c.fill(); }
  c.fillStyle = '#5b6573'; if (drop > 0) { c.fillRect(x0 - 40, bt, x1 - x0 + 80, 26); c.fillRect(x0 - 40, bt + rail - 26, x1 - x0 + 80, 26); } c.restore(); }
