// ---------- McDonald's Monopoly heist: shared drawn assets, captions, compositor ----------
// No logos, no board art, no mascot, no real game pieces: everything is generic "PEEL-OFF GAME PIECE" art in the Bad Math style.
const GOLD = '#F2B705', SKIN = '#f0c39a', NAVY = '#2c3e66', NAVY2 = '#6f86b8';
const ang2 = (a) => [Math.cos(a), Math.sin(a)];
function lerpC(a, b, x) { return a + (b - a) * x; }
const pad2 = n => String(n).padStart(2, '0');

// ---------- captions ----------
const GRN = ['$13,000,000+', '$24,000,000+', '37', 'months', 'yes'], REDW = ['stealing', 'fake', 'arrested', 'convicted', 'thief', 'never', 'dumba**', 'rigged', 'victim', 'no', 'nobody', 'watching'],
  YEL = ['like', 'send', 'follow', "mcdonald's", 'monopoly', 'jacobson', 'security', 'fbi', "'90s", 'comment', 'jerome', 'sept', '50'];
const SEPT_RE = /^sept/i;
function buildCaps(words, fix, max) {
  let toks = fix(words.map(w => ({ w: w.w, s: w.s, e: w.e })));
  const groups = []; let g = [];
  for (const k of toks) { const prev = g[g.length - 1]; if (g.length && (g.length >= max || /[,.?!]$/.test(prev.w) || k.s - prev.e > .5)) { groups.push(g); g = []; } g.push(k); }
  if (g.length) groups.push(g);
  return groups.map((gr, i) => ({
    s: gr[0].s - .03, e: groups[i + 1] ? Math.min(groups[i + 1][0].s - .03, gr[gr.length - 1].e + .6) : gr[gr.length - 1].e + .3,
    parts: gr.map(k => { let raw = k.w.replace(/[,.?!]+$/, '').toUpperCase().replace(/'90S/g, "'90s"); const lo = raw.toLowerCase().replace(/'s$/, '').split(' ')[0]; const col = (raw.startsWith('$') || GRN.includes(lo)) ? GREEN : REDW.includes(lo) ? RED : YEL.includes(lo) ? HL : PAPER; return [raw, col]; })
  }));
}
// generic token-merge helper: merge consecutive tokens whose lowercase words match `seq` into one token with text `out`
function mergeSeq(toks, seq, out, keepPunct = true) {
  const r = []; for (let i = 0; i < toks.length; i++) {
    let ok = i + seq.length <= toks.length; for (let j = 0; ok && j < seq.length; j++) ok = toks[i + j].w.toLowerCase().replace(/[,.?!]+$/, '') === seq[j];
    if (ok) { const last = toks[i + seq.length - 1]; r.push({ w: out + (keepPunct ? (last.w.match(/[,.?!]+$/) || [''])[0] : ''), s: toks[i].s, e: last.e }); i += seq.length - 1; } else r.push(toks[i]);
  } return r;
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

// ---------- compositor ----------
function compose(t, SC, o) {
  const sc = SC.find(s => t >= s[0] && t < s[1]) || SC[SC.length - 1];
  O.save(); sc[2](O, t); O.restore(); vignette(O, .65);
  if (o.over) o.over(O, t);
  o.hud(O, t);
  const hide = (o.hideSt || []).some(([a, b]) => t >= a && t < b);
  if (!hide) Storyteller.draw(O, t, { ...o.st, mouth: MOUTH[Math.min(MOUTH.length - 1, Math.floor(t * 30))] || 0 });
  if (o.top) o.top(O, t);
  drawCaption(O, t, o.caps, o.cap);
  let sx = 0, sy = 0; for (const [s0, d, amp] of o.shake) if (t >= s0 && t < s0 + d) { const k = 1 - (t - s0) / d; sx += Math.sin(t * 97) * amp * k; sy += Math.cos(t * 83) * amp * k; }
  let pz = 1; for (const [s0, d, a] of o.punch) if (t >= s0 && t < s0 + d) pz += a * (1 - (t - s0) / d);
  if (o.boom) for (const b of [].concat(o.boom)) if (t >= b && t < b + .5) pz += .25 * (t < b + .06 ? lin(t, b, b + .06) : 1 - eo(lin(t, b + .06, b + .5)));   // MEME #1 boom zoom
  if (!o.noCutPunch) for (const s of SC) if (s[0] > 0 && t >= s[0] && t < s[0] + .12) pz += .07 * (1 - (t - s[0]) / .12);
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

// ---------- HUD pieces ----------
const CASE_TXT = "CASE: McDONALD'S MONOPOLY · 1995–2001", FOOT_TXT = 'PLEADED GUILTY · 37 MONTHS · SOURCES: DOJ 2001, FBI';
function hudTop(c, y = 238) { c.save(); rr(c, 90, y, 196, 52, 8); c.fillStyle = RED; c.fill(); txt(c, 'DECODED', 188, y + 27, '800 30px Inter', PAPER); txt(c, CASE_TXT, 306, y + 27, '700 25px JBM', 'rgba(245,243,238,.82)', 'left'); c.restore(); }
function footnote(c, y) { txt(c, FOOT_TXT, 90, y, '700 22px JBM', 'rgba(245,243,238,.62)', 'left'); }
// the "victim" line, shown once per cut
function victimLine(c, t, t0, t1, y = 1075, x = 510) {
  if (t < t0 || t >= t1) return; const k = eo(lin(t, t0, t0 + .25)) * (1 - eo(lin(t, t1 - .25, t1)));
  c.save(); c.globalAlpha = k; c.translate(x, y + (1 - k) * 14); c.font = '800 23px JBM'; const s = "McDONALD'S WAS THE VICTIM · IT COOPERATED WITH THE FBI"; const w = c.measureText(s).width + 36;
  rr(c, -w / 2, -26, w, 52, 10); c.fillStyle = 'rgba(11,15,20,.82)'; c.fill(); c.strokeStyle = 'rgba(245,243,238,.5)'; c.lineWidth = 2; c.stroke(); txt(c, s, 0, 2, '800 23px JBM', PAPER); c.restore();
}

// ---------- the generic PEEL-OFF GAME PIECE ----------
// front art drawn in local coords (centered), w×h
function pieceFront(c, w, h, l1, l2, o = {}) {
  const g = c.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2); g.addColorStop(0, '#ffe27a'); g.addColorStop(.5, GOLD); g.addColorStop(1, '#c98f00');
  rr(c, -w / 2, -h / 2, w, h, 22); c.fillStyle = o.fill || g; c.fill();
  c.strokeStyle = INK; c.lineWidth = Math.max(5, w * .012); rr(c, -w / 2 + w * .025, -h / 2 + w * .025, w * .95, h - w * .05, 16); c.stroke();
  // top band: PEEL-OFF GAME PIECE with diagonal stripes
  const bh = h * .17; c.save(); rr(c, -w / 2 + w * .025, -h / 2 + w * .025, w * .95, bh, 14); c.clip(); c.fillStyle = INK; c.fillRect(-w / 2, -h / 2, w, bh + w * .03);
  c.fillStyle = 'rgba(255,214,10,.2)'; for (let i = -20; i < 30; i++) { c.beginPath(); c.moveTo(-w / 2 + i * 40, -h / 2); c.lineTo(-w / 2 + i * 40 + 20, -h / 2); c.lineTo(-w / 2 + i * 40 - 20 + bh, -h / 2 + bh + 30); c.lineTo(-w / 2 + i * 40 - 40 + bh, -h / 2 + bh + 30); c.fill(); } c.restore();
  txt(c, 'PEEL-OFF GAME PIECE', 0, -h / 2 + w * .025 + bh / 2, `800 ${Math.round(Math.min(w * .06, bh * .5))}px Inter`, HL);
  const ty = -h / 2 + w * .025 + bh; const ch = h - bh - w * .05;
  if (l2) { c.save(); c.font = `400 ${Math.round(ch * .5)}px Anton`; let s1 = ch * .5; const mw = c.measureText(l1).width; if (mw > w * .86) s1 = s1 * w * .86 / mw; c.restore();
    txt(c, l1, 0, ty + ch * .38, `400 ${Math.round(s1)}px Anton`, INK); txt(c, l2, 0, ty + ch * .78, `400 ${Math.round(ch * .24)}px Anton`, o.c2 || '#9b1c14'); }
  else txt(c, l1, 0, ty + ch * .5, `400 ${Math.round(ch * .4)}px Anton`, INK);
  if (!o.noCorner) { c.save(); c.translate(w / 2 - w * .1, h / 2 - w * .07); c.rotate(-.78); txt(c, 'PEEL ▸', 0, 0, `800 ${Math.round(w * .042)}px Inter`, 'rgba(11,15,20,.55)'); c.restore(); }
}
function pieceUnder(c, w, h, l1, l2, col = RED) {
  rr(c, -w / 2, -h / 2, w, h, 22); c.fillStyle = '#f2efe6'; c.fill(); c.strokeStyle = 'rgba(11,15,20,.25)'; c.lineWidth = 3; c.setLineDash([10, 8]); rr(c, -w / 2 + 14, -h / 2 + 14, w - 28, h - 28, 14); c.stroke(); c.setLineDash([]);
  let s = Math.round(h * .46); c.font = `400 ${s}px Anton`; const mw = c.measureText(l1).width; if (mw > w * .86) s = Math.floor(s * w * .86 / mw);
  txt(c, l1, 0, l2 ? -h * .06 : 0, `400 ${s}px Anton`, col); if (l2) txt(c, l2, 0, h * .3, `800 ${Math.round(h * .1)}px Inter`, 'rgba(11,15,20,.55)');
}
// peel: p 0 intact → 1 fully removed. Returns the local position of the pinched corner (after reflection) for the hand.
function peelPiece(c, cx, cy, w, h, rot, p, front, under, o = {}) {
  c.save(); c.translate(cx, cy); c.rotate(rot); if (o.scale) c.scale(o.scale, o.scale);
  if (o.shadow !== false) { c.shadowColor = 'rgba(0,0,0,.55)'; c.shadowBlur = 36; c.shadowOffsetY = 14; rr(c, -w / 2, -h / 2, w, h, 22); c.fillStyle = '#f2efe6'; c.fill(); c.shadowBlur = 0; c.shadowOffsetY = 0; }
  c.save(); rr(c, -w / 2, -h / 2, w, h, 22); c.clip(); under(c); c.restore();
  const a = o.ang ?? Math.atan2(h, w) * .9, nx = Math.cos(a), ny = Math.sin(a), mx = -ny, my = nx;
  const E = (w / 2) * nx + (h / 2) * ny, s = E - p * (2 * E) * 1.04;
  const poly = (sgn) => { c.beginPath(); const L = 3000; const px = s * nx, py = s * ny; c.moveTo(px + mx * L, py + my * L); c.lineTo(px - mx * L, py - my * L); c.lineTo(px - mx * L + sgn * nx * L, py - my * L + sgn * ny * L); c.lineTo(px + mx * L + sgn * nx * L, py + my * L + sgn * ny * L); c.closePath(); };
  if (p < 1) { c.save(); rr(c, -w / 2, -h / 2, w, h, 22); c.clip(); poly(-1); c.clip(); front(c);
    const sh = c.createLinearGradient(s * nx - nx * 120, s * ny - ny * 120, s * nx, s * ny); sh.addColorStop(0, 'rgba(0,0,0,0)'); sh.addColorStop(1, `rgba(0,0,0,${.38 * Math.min(1, p * 8)})`); c.fillStyle = sh; c.fillRect(-w, -h, 2 * w, 2 * h); c.restore(); }
  let pin = null;
  if (p < 1) { const cx0 = w / 2 - 20, cy0 = h / 2 - 20, d = (cx0 * nx + cy0 * ny) - s; pin = [cx0 - 2 * d * nx, cy0 - 2 * d * ny]; }
  const fl = 1 - .62 * p, spx = s * nx, spy = s * ny;
  if (pin) { const vx = pin[0] - spx, vy = pin[1] - spy, vn = vx * nx + vy * ny, vm = vx * mx + vy * my; pin = [spx + vn * fl * nx + vm * mx, spy + vn * fl * ny + vm * my]; }
  if (p > 0 && p < 1) { c.save(); c.globalAlpha = 1 - lin(p, .88, 1); c.translate(spx, spy); c.rotate(a); c.scale(fl, 1); c.rotate(-a); c.translate(-spx, -spy); c.transform(1 - 2 * nx * nx, -2 * nx * ny, -2 * nx * ny, 1 - 2 * ny * ny, 2 * s * nx, 2 * s * ny); rr(c, -w / 2, -h / 2, w, h, 22); c.clip(); poly(1); c.clip();
    const bg = c.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2); bg.addColorStop(0, '#fff7da'); bg.addColorStop(1, '#d9c58a'); c.fillStyle = bg; c.fillRect(-w, -h, 2 * w, 2 * h);
    c.fillStyle = 'rgba(11,15,20,.07)'; for (let i = -10; i < 20; i++) c.fillRect(-w / 2 + i * 34, -h, 10, 2 * h); c.restore();
    // fold crease highlight
    c.strokeStyle = 'rgba(255,255,255,.55)'; c.lineWidth = 3; c.beginPath(); c.moveTo(s * nx + mx * 700, s * ny + my * 700); c.lineTo(s * nx - mx * 700, s * ny - my * 700); c.save(); rr(c, -w / 2, -h / 2, w, h, 22); c.clip(); c.stroke(); c.restore(); }
  if (o.hand && pin) o.hand(c, pin[0], pin[1]);
  c.restore(); return pin;
}
// a cartoon hand pinching at (x,y); the arm comes from the lower right
function hand(c, x, y, k = 1, ang = .9) {
  c.save(); c.translate(x, y); c.scale(k, k); const d = [Math.cos(ang), Math.sin(ang)], pr = [-d[1], d[0]];
  const P = (r, o) => [d[0] * r + pr[0] * o, d[1] * r + pr[1] * o];
  const line = (a, b, w, col) => { c.lineCap = 'round'; c.strokeStyle = col; c.lineWidth = w; c.beginPath(); c.moveTo(...a); c.lineTo(...b); c.stroke(); };
  line(P(130, 0), P(900, 0), 150, INK); line(P(130, 0), P(900, 0), 128, NAVY);
  line(P(120, 0), P(420, 0), 118, INK); line(P(120, 0), P(420, 0), 96, SKIN);
  line(P(330, 0), P(560, 0), 160, INK); line(P(330, 0), P(560, 0), 138, NAVY);
  c.fillStyle = INK; c.beginPath(); c.ellipse(...P(130, 0), 74, 66, ang, 0, 7); c.fill(); c.fillStyle = SKIN; c.beginPath(); c.ellipse(...P(130, 0), 62, 54, ang, 0, 7); c.fill();
  for (const [o, off] of [[-1, 20], [1, 20]]) { const a0 = P(120, o * 26), a1 = P(8, o * 8); line(a0, a1, 50, INK); line(a0, a1, 34, SKIN); }
  c.restore();
}

// ---------- security guard (back → front turn), silhouette ----------
function guardFig(c, x, y, s, turn, stack, t) {
  const th = turn * Math.PI, sx = Math.max(.07, Math.abs(Math.cos(th))), front = turn > .5;
  c.save(); c.translate(x, y); c.scale(s, s);
  const sway = Math.sin(t * 3) * 3; c.translate(0, sway);
  c.save(); c.scale(sx, 1);
  const body = '#1c2536', edge = '#5b6f95';
  // legs
  c.fillStyle = body; c.strokeStyle = edge; c.lineWidth = 6; rr(c, -78, -190, 70, 190, 14); c.fill(); c.stroke(); rr(c, 8, -190, 70, 190, 14); c.fill(); c.stroke();
  // torso
  c.beginPath(); c.moveTo(-130, -190); c.lineTo(-150, -470); c.quadraticCurveTo(-150, -510, -100, -515); c.lineTo(100, -515); c.quadraticCurveTo(150, -510, 150, -470); c.lineTo(130, -190); c.closePath(); c.fillStyle = body; c.fill(); c.stroke();
  c.fillStyle = '#2b3a57'; c.fillRect(-132, -300, 264, 22);   // belt
  // arms
  if (!stack || !front) { c.fillStyle = body; rr(c, -190, -500, 52, 250, 24); c.fill(); c.stroke(); rr(c, 138, -500, 52, 250, 24); c.fill(); c.stroke(); }
  // head + cap
  c.fillStyle = '#10151f'; c.beginPath(); c.arc(0, -570, 62, 0, 7); c.fill(); c.strokeStyle = edge; c.stroke();
  c.fillStyle = body; c.beginPath(); c.moveTo(-70, -590); c.quadraticCurveTo(0, -690, 70, -590); c.closePath(); c.fill(); c.stroke(); c.fillStyle = '#10151f'; rr(c, -78, -596, 156, 18, 8); c.fill(); c.stroke();
  c.restore();
  // SECURITY on back / badge on front (not squashed text when edge-on)
  if (!front) { if (sx > .35) { c.save(); c.scale(sx, 1); txt(c, 'SECURITY', 0, -410, '400 62px Anton', HL); c.restore(); } }
  else if (sx > .25) { c.save(); c.scale(sx, 1);
    c.save(); c.translate(70, -440); c.fillStyle = GOLD; c.beginPath(); c.moveTo(-30, -34); c.lineTo(30, -34); c.lineTo(30, 6); c.quadraticCurveTo(30, 34, 0, 46); c.quadraticCurveTo(-30, 34, -30, 6); c.closePath(); c.fill(); c.strokeStyle = INK; c.lineWidth = 4; c.stroke(); txt(c, '★', 0, -4, '800 28px Inter', INK); c.restore();
    rr(c, -120, -445, 140, 44, 8); c.fillStyle = HL; c.fill(); txt(c, 'SECURITY', -50, -422, '800 25px Inter', INK); c.restore(); }
  c.restore();
  if (stack && front) { const k = back(stack); c.save(); c.translate(x, y + sway * s); c.scale(s * k, s * k);
    c.fillStyle = '#1c2536'; c.strokeStyle = '#5b6f95'; c.lineWidth = 6; rr(c, -215, -480, 56, 190, 26); c.fill(); c.stroke(); rr(c, 159, -480, 56, 190, 26); c.fill(); c.stroke();
    for (let i = 0; i < 6; i++) { c.save(); c.translate((i % 2 ? 8 : -8) + hash(i) * 6, -330 - i * 26); c.rotate((hash(i + 3) - .5) * .12); pieceFront(c, 250, 120, i === 5 ? '$1M' : '', null, { noCorner: true }); c.restore(); }
    c.restore(); }
}

// ---------- ID card (silhouette, no photo) ----------
function idCard(c, k, name, role, sub, o = {}) {
  c.save(); c.scale(k, k); const w = o.w || 640, h = o.h || 520;
  c.shadowColor = 'rgba(0,0,0,.55)'; c.shadowBlur = 28; rr(c, -w / 2, -h / 2, w, h, 24); c.fillStyle = PAPER; c.fill(); c.shadowBlur = 0;
  rr(c, -w / 2, -h / 2, w, 20, [24, 24, 0, 0]); c.fillStyle = RED; c.fill();
  rr(c, -w / 2 + 30, -h / 2 + 52, 200, 230, 14); c.fillStyle = '#c9ced6'; c.fill(); c.save(); rr(c, -w / 2 + 30, -h / 2 + 52, 200, 230, 14); c.clip(); silhouette(c, -w / 2 + 130, -h / 2 + 150, 150, '#2a323d'); c.restore();
  txt(c, 'NO PHOTO', -w / 2 + 130, -h / 2 + 300, '800 18px JBM', 'rgba(11,15,20,.45)');
  txt(c, name, -w / 2 + 260, -h / 2 + 105, `400 ${o.ns || 52}px Anton`, INK, 'left'); rr(c, -w / 2 + 260, -h / 2 + 150, 190, 46, 10); c.fillStyle = INK; c.fill(); txt(c, role, -w / 2 + 355, -h / 2 + 174, '800 26px Inter', HL);
  txt(c, 'EMPLOYEE · SECURITY DEPT.', -w / 2 + 260, -h / 2 + 232, '800 20px JBM', 'rgba(11,15,20,.6)', 'left'); if (o.l3) txt(c, o.l3, -w / 2 + 260, -h / 2 + 262, '800 20px JBM', 'rgba(11,15,20,.6)', 'left');
  rr(c, -w / 2 + 30, h / 2 - 100, w - 60, 70, 12); c.fillStyle = INK; c.fill(); txt(c, sub, 0, h / 2 - 65, `800 ${o.ss || 30}px Inter`, PAPER);
  barcode(c, -w / 2 + 260, -h / 2 + 285, 200, 14, 'rgba(11,15,20,.5)');
  c.restore();
}

// ---------- briefcase handcuffed to a wrist ----------
function briefcase(c, t, k, tagK) {
  c.save(); c.translate(0, 0);
  // arm from above
  c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 150; c.beginPath(); c.moveTo(0, -520); c.lineTo(0, -150); c.stroke(); c.strokeStyle = NAVY; c.lineWidth = 128; c.beginPath(); c.moveTo(0, -520); c.lineTo(0, -170); c.stroke();
  c.strokeStyle = INK; c.lineWidth = 104; c.beginPath(); c.moveTo(0, -190); c.lineTo(0, -108); c.stroke(); c.strokeStyle = SKIN; c.lineWidth = 82; c.beginPath(); c.moveTo(0, -190); c.lineTo(0, -108); c.stroke();
  // handle
  c.strokeStyle = '#2a323d'; c.lineWidth = 26; c.beginPath(); c.moveTo(-120, -20); c.lineTo(-120, -80); c.quadraticCurveTo(0, -150, 120, -80); c.lineTo(120, -20); c.stroke();
  // fist
  c.fillStyle = INK; rr(c, -74, -126, 148, 96, 36); c.fill(); c.fillStyle = SKIN; rr(c, -62, -118, 124, 80, 30); c.fill(); c.strokeStyle = INK; c.lineWidth = 4; for (const fx of [-30, 0, 30]) { c.beginPath(); c.moveTo(fx, -112); c.lineTo(fx, -54); c.stroke(); }
  // case
  c.shadowColor = 'rgba(0,0,0,.5)'; c.shadowBlur = 30; c.shadowOffsetY = 14; rr(c, -250, -20, 500, 340, 26); c.fillStyle = '#5a3a22'; c.fill(); c.shadowBlur = 0; c.shadowOffsetY = 0; c.strokeStyle = INK; c.lineWidth = 6; c.stroke();
  rr(c, -250, 120, 500, 14, 4); c.fillStyle = '#3a2413'; c.fill();
  for (const sx of [-250, 250]) for (const sy of [-20, 320]) { c.fillStyle = '#c9a13a'; c.beginPath(); c.arc(sx, sy, 20, 0, 7); c.fill(); }
  for (const lx of [-130, 130]) { rr(c, lx - 40, 100, 80, 56, 8); c.fillStyle = '#e7c457'; c.fill(); c.strokeStyle = INK; c.lineWidth = 4; c.stroke(); c.fillStyle = INK; c.beginPath(); c.arc(lx, 128, 7, 0, 7); c.fill(); }
  // cuffs: wrist ring + handle ring + chain
  const sn = (cx, cy, r) => { c.save(); c.strokeStyle = '#2a323d'; c.lineWidth = 24; c.beginPath(); c.ellipse(cx, cy, r, r * .55, 0, 0, 7); c.stroke(); c.strokeStyle = steelGrad(c, cx - r, cy - r, cx + r, cy + r); c.lineWidth = 16; c.beginPath(); c.ellipse(cx, cy, r, r * .55, 0, 0, 7); c.stroke(); c.restore(); };
  sn(0, -205, 62); sn(0, -62, 84);
  c.strokeStyle = '#2a323d'; c.lineWidth = 12; for (let i = 0; i < 3; i++) { c.beginPath(); c.ellipse(-92, -160 + i * 28 + Math.sin(t * 3 + i) * 2, 13, 19, 0, 0, 7); c.stroke(); }
  const snap = lin(t, 0, .0);
  c.restore();
  // luggage tag
  if (tagK > 0) { c.save(); c.translate(300, 120); c.rotate(Math.sin(t * 2.4) * .06 - .05); c.scale(tagK, tagK); c.strokeStyle = PAPER; c.lineWidth = 4; c.beginPath(); c.moveTo(-220, -60); c.lineTo(-120, -20); c.stroke();
    rr(c, -120, -20, 300, 150, 12); c.fillStyle = HL; c.fill(); c.strokeStyle = INK; c.lineWidth = 5; c.stroke(); c.fillStyle = INK; c.beginPath(); c.arc(-100, -2, 8, 0, 7); c.fill();
    txt(c, 'WINNING PIECES', 30, 30, '400 40px Anton', INK); txt(c, '→ FACTORY', 30, 85, '400 46px Anton', RED); c.restore(); }
}

// ---------- tamper-proof seals sheet ----------
function sealSheet(c, t, p, peeled = 0) {
  c.save(); const k = eo(p); c.translate(540 + (1 - k) * 1000, 720); c.rotate(-.05 + (1 - k) * .25); c.translate(-540, -720);
  c.shadowColor = 'rgba(0,0,0,.55)'; c.shadowBlur = 34; c.shadowOffsetY = 16; rr(c, 190, 360, 700, 720, 24); c.fillStyle = '#eceae2'; c.fill(); c.shadowBlur = 0; c.shadowOffsetY = 0;
  rr(c, 190, 360, 700, 84, [24, 24, 0, 0]); c.fillStyle = INK; c.fill(); txt(c, 'TAMPER-PROOF SEALS', 540, 402, '400 46px Anton', HL);
  c.strokeStyle = 'rgba(11,15,20,.2)'; c.lineWidth = 3; c.setLineDash([8, 8]); c.strokeRect(215, 470, 650, 580); c.setLineDash([]);
  let n = 0; for (let r = 0; r < 4; r++) for (let q = 0; q < 4; q++) { const x = 290 + q * 167, y = 560 + r * 150; n++; if (n <= peeled) { c.strokeStyle = 'rgba(11,15,20,.25)'; c.lineWidth = 3; c.beginPath(); c.arc(x, y, 56, 0, 7); c.stroke(); continue; }
    c.fillStyle = RED; c.beginPath(); c.arc(x, y, 60, 0, 7); c.fill(); c.strokeStyle = PAPER; c.lineWidth = 4; c.beginPath(); c.arc(x, y, 50, 0, 7); c.stroke(); c.save(); c.translate(x, y); c.rotate(-.4); txt(c, 'SEAL', 0, -9, '400 26px Anton', PAPER); txt(c, '✓ OK', 0, 15, '800 15px Inter', PAPER); c.restore(); }
  c.restore();
}
function sealDot(c, x, y, r, k = 1) { c.save(); c.translate(x, y); c.scale(k, k); c.fillStyle = RED; c.beginPath(); c.arc(0, 0, r, 0, 7); c.fill(); c.strokeStyle = PAPER; c.lineWidth = 4; c.beginPath(); c.arc(0, 0, r * .82, 0, 7); c.stroke(); c.save(); c.rotate(-.4); txt(c, 'SEAL', 0, -r * .15, `400 ${Math.round(r * .44)}px Anton`, PAPER); txt(c, '✓ OK', 0, r * .26, `800 ${Math.round(r * .26)}px Inter`, PAPER); c.restore(); c.restore(); }

// ---------- envelope swap ----------
// t0 = scene time reference; every param is a pure function of absolute t using `T` timeline object
function envelopeScene(c, t, tl) {
  const ew = 620, eh = 400;
  const open = eo(lin(t, tl.open0, tl.open1)) * (1 - eo(lin(t, tl.close0, tl.close1)));
  const rise = eo(lin(t, tl.rise0, tl.rise1)), out = eo(lin(t, tl.out0, tl.out1)), inb = eo(lin(t, tl.in0, tl.in1)), tuck = eo(lin(t, tl.tuck0, tl.tuck1));
  c.save(); c.translate(540, tl.y || 820);
  c.shadowColor = 'rgba(0,0,0,.55)'; c.shadowBlur = 32; c.shadowOffsetY = 16; rr(c, -ew / 2, -eh / 2, ew, eh, 18); c.fillStyle = '#c9b680'; c.fill(); c.shadowBlur = 0; c.shadowOffsetY = 0;
  const fa = 1 - 2 * open, fh = 230;
  const flap = () => { c.save(); c.translate(0, -eh / 2); c.scale(1, fa); c.beginPath(); c.moveTo(-ew / 2, 0); c.lineTo(ew / 2, 0); c.lineTo(0, fh); c.closePath(); c.fillStyle = fa >= 0 ? '#e0cf9e' : '#b09c64'; c.fill(); c.strokeStyle = 'rgba(11,15,20,.5)'; c.lineWidth = 4; c.stroke(); c.restore(); };
  if (fa < 0) flap();
  // gold winner piece
  if (t >= tl.rise0 && out < 1) { c.save(); c.translate(-640 * out, lerpC(30, -250, rise) + 90 * out); c.rotate(-.35 * out); pieceFront(c, 420, 190, '$1,000,000', 'WINNER', { noCorner: true }); c.restore(); }
  // blank swapped in
  if (t >= tl.in0) { c.save(); c.translate(lerpC(700, 0, inb), lerpC(-250, 30, tuck)); c.rotate((1 - inb) * .3); rr(c, -210, -95, 420, 190, 16); c.fillStyle = '#e9e7df'; c.fill(); c.strokeStyle = 'rgba(11,15,20,.3)'; c.lineWidth = 4; c.stroke(); txt(c, 'PEEL-OFF GAME PIECE', 0, -62, '800 22px Inter', 'rgba(11,15,20,.45)'); txt(c, 'BLANK', 0, 8, '400 70px Anton', 'rgba(11,15,20,.28)'); c.restore(); }
  // envelope front with V pocket
  c.beginPath(); c.moveTo(-ew / 2, -eh / 2 + 4); c.lineTo(0, 30); c.lineTo(ew / 2, -eh / 2 + 4); c.lineTo(ew / 2, eh / 2); c.lineTo(-ew / 2, eh / 2); c.closePath(); c.fillStyle = '#e6d6a9'; c.fill(); c.strokeStyle = 'rgba(11,15,20,.45)'; c.lineWidth = 4; c.stroke();
  c.beginPath(); c.moveTo(-ew / 2, eh / 2); c.lineTo(-40, 50); c.moveTo(ew / 2, eh / 2); c.lineTo(40, 50); c.stroke();
  if (fa >= 0) flap();
  rr(c, -ew / 2 + 24, eh / 2 - 74, 180, 50, 8); c.fillStyle = INK; c.fill(); txt(c, 'SECURITY', -ew / 2 + 114, eh / 2 - 49, '800 26px Inter', HL);
  const sk = back(lin(t, tl.seal0, tl.seal0 + .18)); if (sk > 0) sealDot(c, 0, 40, 62, sk);
  c.restore();
}
// MEME #3 red circle + arrow
function redCircle(c, x, y, r, p, label) {
  if (p <= 0) return; c.save(); c.strokeStyle = RED; c.lineWidth = 9; c.lineCap = 'round'; c.beginPath(); const a1 = -Math.PI * .7 + p * Math.PI * 2.15; for (let a = -Math.PI * .7; a <= a1; a += .06) { const rr0 = r * (1 + .08 * Math.sin(a * 2)) * (1 + (a - -Math.PI * .7) * .008); const px = x + Math.cos(a) * rr0 * 1.12, py = y + Math.sin(a) * rr0 * .92; a === -Math.PI * .7 ? c.moveTo(px, py) : c.lineTo(px, py); } c.stroke();
  const ap = lin(p, .8, 1); if (ap > 0 && label) { c.save(); c.globalAlpha = ap; c.translate(x + r * 1.5, y - r * 1.55); c.scale(.85 + .15 * back(ap), .85 + .15 * back(ap)); c.strokeStyle = RED; c.lineWidth = 8; c.beginPath(); c.moveTo(-100, 70); c.lineTo(-6, 6); c.stroke(); c.fillStyle = RED; c.beginPath(); c.moveTo(-20, -2); c.lineTo(-62, 4); c.lineTo(-30, 38); c.closePath(); c.fill(); txt(c, label, 0, -10, '400 48px Anton', RED); c.restore(); }
  c.restore();
}

// ---------- US map (generic outline) + string network ----------
const US = [[-124.7, 48.4], [-123, 48.3], [-122.8, 49], [-95.2, 49], [-94.6, 48.7], [-93, 48.6], [-89.6, 48], [-84.8, 46.9], [-83.5, 46], [-82.5, 45.3], [-82.4, 43], [-83, 42], [-79, 42.8], [-79, 43.3], [-76, 43.6], [-75, 45], [-71.5, 45], [-70.7, 45.4], [-69.2, 47.4], [-67.8, 47.1], [-67, 44.8], [-70, 43.7], [-70.7, 42.7], [-70, 41.7], [-71.5, 41.3], [-74, 40.6], [-74, 39.5], [-75.5, 38.5], [-76, 37], [-75.5, 35.3], [-77, 34.5], [-79, 33.5], [-81, 31.8], [-81.3, 30], [-80, 27], [-80.4, 25.2], [-81.2, 25.2], [-82.7, 27.5], [-82.8, 29.2], [-84, 30], [-85.3, 29.7], [-87.5, 30.3], [-89, 30.2], [-89.4, 29.1], [-91, 29.2], [-93.8, 29.7], [-95.5, 28.8], [-97.2, 27.5], [-97.2, 25.9], [-99.1, 26.4], [-100.5, 28.5], [-101.4, 29.8], [-102.7, 29.7], [-104.5, 29.6], [-106.5, 31.8], [-108.2, 31.8], [-108.2, 31.3], [-111, 31.3], [-114.8, 32.5], [-117.1, 32.5], [-118.5, 34], [-120.6, 34.6], [-121.9, 36.6], [-122.5, 37.8], [-123.8, 39.5], [-124.4, 40.4], [-124.2, 43], [-124.1, 46.2]];
const CITIES = [[-122.3, 47.6], [-118.2, 34], [-112, 33.4], [-105, 39.7], [-96.8, 32.8], [-93.3, 45], [-87.6, 41.9], [-83, 42.3], [-74, 40.7], [-71, 42.4], [-80.2, 25.8], [-90, 30], [-94.6, 39.1], [-86, 36], [-77, 38.9], [-117, 32.7]];
const GA = [-84, 33.95];
const mapXY = (lon, lat, mx, my, k) => [mx + (lon + 125) * .788 * k, my + (49 - lat) * k];
function usMap(c, t, mx, my, k, t0, t1, tStr, o = {}) {
  c.save(); c.beginPath(); US.forEach(([lo, la], i) => { const [x, y] = mapXY(lo, la, mx, my, k); i ? c.lineTo(x, y) : c.moveTo(x, y); }); c.closePath();
  c.fillStyle = '#1a222d'; c.fill(); c.strokeStyle = '#4a5666'; c.lineWidth = 4; c.lineJoin = 'round'; c.stroke();
  const [gx, gy] = mapXY(GA[0], GA[1], mx, my, k); const n = CITIES.length; const lit = i => lin(t, t0 + i * (t1 - t0) / n, t0 + i * (t1 - t0) / n + .2);
  // strings
  CITIES.forEach(([lo, la], i) => { const l = lit(i), sl = lin(t, tStr + i * (o.strGap ?? .09), tStr + i * (o.strGap ?? .09) + .35); if (sl <= 0) return; const [x, y] = mapXY(lo, la, mx, my, k); const mxp = (x + gx) / 2, myp = (y + gy) / 2 + 40 + Math.abs(x - gx) * .08;
    c.strokeStyle = RED; c.lineWidth = 5; c.lineCap = 'round'; c.beginPath(); for (let u = 0; u <= sl + .001; u += .04) { const uu = Math.min(u, sl); const px = (1 - uu) * (1 - uu) * x + 2 * (1 - uu) * uu * mxp + uu * uu * gx, py = (1 - uu) * (1 - uu) * y + 2 * (1 - uu) * uu * myp + uu * uu * gy; u === 0 ? c.moveTo(px, py) : c.lineTo(px, py); } c.stroke();
    if (o.cash && t >= o.cash) { const cp = ((t - o.cash) * 1.3 + i * .17) % 1; if (sl >= 1) { const px = (1 - cp) * (1 - cp) * gx + 2 * (1 - cp) * cp * mxp + cp * cp * x, py = (1 - cp) * (1 - cp) * gy + 2 * (1 - cp) * cp * myp + cp * cp * y; /* cash travels from the winner to the one man */ const q = 1 - cp; const bx = (1 - q) * (1 - q) * x + 2 * (1 - q) * q * mxp + q * q * gx, by = (1 - q) * (1 - q) * y + 2 * (1 - q) * q * myp + q * q * gy; bill(c, bx, by, 46, Math.sin(i + t * 6) * .4); } } });
  // winner dots
  CITIES.forEach(([lo, la], i) => { const l = lit(i); if (l <= 0) return; const [x, y] = mapXY(lo, la, mx, my, k); const pulse = 1 + .25 * Math.max(0, 1 - (t - (t0 + i * (t1 - t0) / n)) * 3); c.save(); c.translate(x, y); c.scale(pulse * back(l), pulse * back(l)); c.shadowColor = GREEN; c.shadowBlur = 24; c.fillStyle = GREEN; c.beginPath(); c.arc(0, 0, 18, 0, 7); c.fill(); c.shadowBlur = 0; c.strokeStyle = INK; c.lineWidth = 3; c.stroke();
    if (i % 3 === 0 || o.allTags) { c.font = '800 25px JBM'; const w0 = c.measureText('WINNER').width + 20; rr(c, -w0 / 2, -62, w0, 36, 6); c.fillStyle = GREEN; c.fill(); txt(c, 'WINNER', 0, -43, '800 25px JBM', INK); } c.restore(); });
  // the one man in Georgia
  const gk = back(lin(t, o.gaAt ?? t0, (o.gaAt ?? t0) + .3)); if (gk > 0) { c.save(); c.translate(gx, gy); c.scale(gk, gk); c.fillStyle = RED; c.beginPath(); c.arc(0, 0, 24, 0, 7); c.fill(); c.strokeStyle = PAPER; c.lineWidth = 5; c.stroke(); silhouette(c, 0, 6, 30, PAPER);
    rr(c, 10, 22, 230, 50, 10); c.fillStyle = INK; c.fill(); c.strokeStyle = RED; c.lineWidth = 4; c.stroke(); txt(c, 'ONE MAN · GEORGIA', 125, 47, '800 22px JBM', PAPER); c.restore(); }
  c.restore();
}

// ---------- counters / calendar / misc ----------
function countUp(c, t, t0, dur, target, x, y, size, col, prefix = '$', suffix = '+') {
  const k = eo(lin(t, t0, t0 + dur)); const v = Math.round(target * k); const s = prefix + fmt(v) + (k >= 1 ? suffix : '');
  const pop = t >= t0 + dur ? 1 + .12 * Math.max(0, 1 - (t - t0 - dur) / .3) : 1; c.save(); c.translate(x, y); c.scale(pop, pop); c.font = `400 ${size}px Anton`; const w = c.measureText(prefix + fmt(target) + suffix).width; const f = Math.min(1, 900 / w);
  c.scale(f, f); c.lineJoin = 'round'; c.lineWidth = size * .12; c.strokeStyle = 'rgba(0,0,0,.85)'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.strokeText(s, 0, 0); c.shadowColor = col; c.shadowBlur = 40; c.fillStyle = col; c.fillText(s, 0, 0); c.restore();
}
function calendar(c, t, flip0, flip1, x, y, s = 1, dayA = '10', dowA = 'MONDAY', dayB = '11', dowB = 'TUESDAY') {
  c.save(); c.translate(x, y); c.scale(s, s);
  const w = 600, h = 640;
  c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 36; c.shadowOffsetY = 16; rr(c, -w / 2, -h / 2, w, h, 26); c.fillStyle = '#d6d2c6'; c.fill(); c.shadowBlur = 0; c.shadowOffsetY = 0;
  const f = eio(lin(t, flip0, flip1));
  const page = (day, dow, ph) => { c.save(); c.translate(0, -h / 2 + 100); c.scale(1, Math.max(.02, ph)); c.translate(0, -(-h / 2 + 100)); rr(c, -w / 2 + 14, -h / 2 + 14, w - 28, h - 28, 20); c.fillStyle = PAPER; c.fill();
    rr(c, -w / 2 + 14, -h / 2 + 14, w - 28, 110, [20, 20, 0, 0]); c.fillStyle = RED; c.fill(); txt(c, 'SEPTEMBER 2001', 0, -h / 2 + 70, '400 54px Anton', PAPER);
    for (const sx of [-170, 170]) { c.fillStyle = INK; c.beginPath(); c.arc(sx, -h / 2 + 14, 14, 0, 7); c.fill(); }
    txt(c, day, 0, 30, '400 330px Anton', INK); txt(c, dow, 0, 235, '800 44px JBM', 'rgba(11,15,20,.6)'); c.restore(); };
  if (f < .5) page(dayA, dowA, 1 - f * 2); else page(dayB, dowB, (f - .5) * 2);
  c.restore();
}
function clockFace(c, t, x, y, r, spin = 1) { c.save(); c.translate(x, y); c.fillStyle = PAPER; c.beginPath(); c.arc(0, 0, r, 0, 7); c.fill(); c.strokeStyle = INK; c.lineWidth = 10; c.stroke(); for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283; c.strokeStyle = INK; c.lineWidth = 6; c.beginPath(); c.moveTo(Math.cos(a) * r * .82, Math.sin(a) * r * .82); c.lineTo(Math.cos(a) * r * .94, Math.sin(a) * r * .94); c.stroke(); }
  c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 12; const a1 = t * spin * 3 - 1.57, a2 = t * spin * .25 - 1.57; c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.cos(a1) * r * .75, Math.sin(a1) * r * .75); c.stroke(); c.lineWidth = 16; c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.cos(a2) * r * .5, Math.sin(a2) * r * .5); c.stroke(); c.fillStyle = RED; c.beginPath(); c.arc(0, 0, 12, 0, 7); c.fill(); c.restore(); }
// cup (generic fast-food cup) with a sticker
function cup(c, x, y, s, rot, stickerFn) {
  c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s);
  c.shadowColor = 'rgba(0,0,0,.5)'; c.shadowBlur = 30; c.shadowOffsetY = 14; c.beginPath(); c.moveTo(-170, -230); c.lineTo(170, -230); c.lineTo(125, 250); c.quadraticCurveTo(0, 270, -125, 250); c.closePath(); c.fillStyle = PAPER; c.fill(); c.shadowBlur = 0; c.shadowOffsetY = 0; c.strokeStyle = INK; c.lineWidth = 7; c.stroke();
  c.save(); c.clip(); c.fillStyle = RED; c.fillRect(-200, 150, 400, 56); c.fillStyle = 'rgba(11,15,20,.08)'; c.fillRect(-200, -230, 60, 500); c.restore();
  rr(c, -190, -290, 380, 74, 20); c.fillStyle = '#c9ced6'; c.fill(); c.strokeStyle = INK; c.lineWidth = 7; c.stroke(); c.strokeStyle = RED; c.lineWidth = 22; c.lineCap = 'round'; c.beginPath(); c.moveTo(50, -290); c.lineTo(110, -480); c.stroke();
  if (stickerFn) stickerFn(c); c.restore();
}
// big slammed text with ink outline, supports 2 colors per line
function slam(c, s, x, y, size, col, k, rot = 0, maxW = 900) { big(c, s, x, y, size, col, k, rot, 0, maxW); }
function silRow8(c, t, t0, step, x0, y0, dx, dy, sSize) { for (let i = 0; i < 8; i++) { const col = i % 4, row = Math.floor(i / 4); const x = x0 + col * dx, y = y0 + row * dy; const a = eo(lin(t, t0 - .2 + i * .04, t0 + i * .04)); c.save(); c.globalAlpha = a; silhouette(c, x, y, sSize, '#3b4656'); c.restore(); stamp(c, 'ARRESTED', x, y + sSize * .1, 34, RED, -.18 + (i % 3) * .1, lin(t, t0 + i * step, t0 + i * step + .12)); } }

function bgGlow(c, x, y, r, col) { const g = c.createRadialGradient(x, y, 30, x, y, r); g.addColorStop(0, col); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 250, W, 1000); }
const MCD_PIECE = (c, w, h, p) => {};
