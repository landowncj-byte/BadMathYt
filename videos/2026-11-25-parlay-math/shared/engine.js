// ---------- shared engine tail: caption, storyteller, render ----------
// body.js must define: ST_CFG, ST_POS, CAP{x,y,size,maxw,lh,minus}, SCENES, overlays(c,t), hud(c,t), GLITCH, SHAKE, PZ, HARD, ZOOMS(optional fn t->extra zoom)
function caption(c, t) {
  let it = null; for (const cp of CAPS) if (t >= cp[0] && t < cp[1]) it = cp; if (!it) return;
  const k = eo(lin(t, it[0], it[0] + .12)); const parts = it[2].map(([w, col]) => [w, col === 'g' ? GREEN : col === 'r' ? RED : col === 'y' ? HL : PAPER]);
  c.save(); c.font = `800 ${CAP.size}px Inter`; const sp = c.measureText(' ').width; const lines = [[]]; let lw = 0;
  for (const p of parts) { const w = c.measureText(p[0]).width; if (lw + w > CAP.maxw && lines[lines.length - 1].length) { lines.push([]); lw = 0; } lines[lines.length - 1].push([...p, w]); lw += w + sp; }
  c.translate(CAP.x, CAP.y - (lines.length - 1) * CAP.lh / 2); c.scale(.82 + .18 * k, .82 + .18 * k); c.globalAlpha = k;
  lines.forEach((ln, li) => { const tw = ln.reduce((a, p) => a + p[2], 0) + sp * (ln.length - 1); let px = -tw / 2;
    for (const [w, col, ww] of ln) { c.textAlign = 'left'; c.textBaseline = 'middle'; c.lineWidth = CAP.size * .2; c.strokeStyle = 'rgba(0,0,0,.9)'; c.lineJoin = 'round'; c.strokeText(w, px, li * CAP.lh); c.fillStyle = col; c.fillText(w, px, li * CAP.lh); px += ww + sp; } });
  c.restore();
}
function storyteller(c, t) { if (ST_OFF && ST_OFF(t)) return; Storyteller.draw(c, t, { ...ST_CFG, pos: ST_POS, mouth: MOUTH[Math.min(MOUTH.length - 1, Math.floor(t * 30))] || 0 }); }
window.render = function (t) {
  const sc = SCENES.find(s => t >= s[0] && t < s[1]) || SCENES[SCENES.length - 1];
  O.save(); sc[2](O, t, t - sc[0]); O.restore(); overlays(O, t); hud(O, t); storyteller(O, t); caption(O, t); if (typeof TOP === 'function') TOP(O, t);
  const g = O.createRadialGradient(540, 900, 450, 540, 900, 1300); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.5)'); O.fillStyle = g; O.fillRect(0, 0, W, H);
  let wx = 0; const into = t - sc[0];
  if (!HARD && sc[0] > 0 && into < .16) wx = (1 - eo(into / .16)) * 160;
  if (HARD && sc[0] > 0 && into < .08) { O.fillStyle = `rgba(245,243,238,${.4 * (1 - into / .08)})`; O.fillRect(0, 0, W, H); }
  let sx = 0, sy = 0; for (const [s0, d, amp] of SHAKE) if (t >= s0 && t < s0 + d) { const k = 1 - (t - s0) / d; sx += Math.sin(t * 97) * amp * k; sy += Math.cos(t * 83) * amp * k; }
  let pz = 1; for (const [s0, amp] of PZ) { const k = t - s0; if (k >= 0 && k < 1) pz += amp * clamp(k / .067) * (1 - eo(clamp((k - .067) / .4))); }
  if (typeof ZOOMS === 'function') pz += ZOOMS(t);
  X.fillStyle = INK; X.fillRect(0, 0, W, H); X.save(); X.translate(540 + sx + wx, 960 + sy); X.scale(pz, pz); X.translate(-540, -960); X.drawImage(OFF, 0, 0); X.restore();
  for (const [g0, g1, amt, mode] of GLITCH) if (t >= g0 && t < g1) {
    const u = lin(t, g0, g1), k = mode === 'd' ? amt * (1 - u * .8) : mode === 'r' ? amt * u : amt * Math.sin(u * Math.PI), f = Math.floor(t * 30);
    X.save(); X.globalCompositeOperation = 'screen'; X.globalAlpha = .55 * k;
    for (const [col, dx] of [['#ff0000', 26], ['#00ffff', -26]]) { T.clearRect(0, 0, W, H); T.drawImage(OFF, 0, 0); T.globalCompositeOperation = 'multiply'; T.fillStyle = col; T.fillRect(0, 0, W, H); T.globalCompositeOperation = 'source-over'; X.drawImage(TMP, dx * k, 0); }
    X.restore(); for (let i = 0; i < 10; i++) { const y = hash(f * 13 + i) * H, h = 20 + hash(f * 7 + i) * 130, dx = (hash(f * 3 + i) - .5) * 280 * k; X.drawImage(OFF, 0, y, W, h, dx, y, W, h); }
  }
};
window.DUR = DUR;
const FONTS = [['Anton', 'node_modules/@fontsource/anton/files/anton-latin-400-normal.woff2', '400'], ['Inter', 'node_modules/@fontsource/inter/files/inter-latin-800-normal.woff2', '800'],
  ['JBM', 'node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-800-normal.woff2', '800'], ['JBM', 'node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff2', '700'],
  ['Special Elite', 'node_modules/@fontsource/special-elite/files/special-elite-latin-400-normal.woff2', '400']];
window.ready = Promise.all(FONTS.map(([f, u, w]) => new FontFace(f, `url(${u})`, { weight: w }).load().then(ff => document.fonts.add(ff)))).then(() => { window.render(0); return true; });
