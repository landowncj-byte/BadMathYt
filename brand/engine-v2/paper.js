// Bad Math engine v2 — PAPER MATERIALS. Procedural, deterministic canvas textures for the 3D pop-up sets (no external images):
// card / kraft grain + fibres, creased walls, ledger floors, receipt paper, banknote guilloche trim, round seals.
//   BM2.Paper.tex(kind, colour, {seed, w, h, ...})   -> cached THREE.CanvasTexture (colour is BAKED into the texture; the material colour stays white)
//   kinds: card | ledger | receipt | bank | wall (sized: w, h in world units) | seal (sized) | edge
//   BM2.Paper.mat(kind, colour, opts)                -> cached MeshLambertMaterial using it
// Everything is seeded (mulberry32) and built once per page load, then reused by every scene, so render cost is the same as flat colours.
(function () {
  const B = window.BM2; if (!window.THREE) return; const T = window.THREE, TAU = Math.PI * 2, P = (B.Paper = {});
  const rng = seed => { let a = (Math.floor(seed * 1000) + 0x9e3779b9) >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
  const hex = c => { const m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(c); return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : [200, 200, 200]; };
  const toHex = a => '#' + a.map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
  // shade(col, k): k > 0 lightens toward Paper white, k < 0 darkens toward ink
  const shade = (c, k) => { const a = hex(c); return toHex(a.map(v => k >= 0 ? v + (255 - v) * k : v * (1 + k))); };
  const rgba = (c, a) => { const h = hex(c); return `rgba(${h[0]},${h[1]},${h[2]},${a})`; };
  P.shade = shade; P.rgba = rgba; P.rng = rng;
  const cache = {}, mcache = {};

  // ---- fibre grain: speckle + short curved fibres, seeded. `amt` scales the strength.
  P.grain = function (g, w, h, seed, amt = 1, dark = '#000000', light = '#ffffff') {
    const r = rng(seed), n = Math.round((w * h) / 70 * amt);
    for (let i = 0; i < n; i++) { const x = r() * w, y = r() * h, a = 0.02 + r() * 0.05; g.fillStyle = r() < 0.55 ? rgba(dark, a) : rgba(light, a * 1.1); const s = r() < 0.15 ? 2 : 1; g.fillRect(x, y, s, s); }
    const nf = Math.round((w * h) / 5200 * amt); g.lineWidth = 0.7;
    for (let i = 0; i < nf; i++) { const x = r() * w, y = r() * h, L = 6 + r() * 22, a0 = r() * TAU, bend = (r() - 0.5) * 1.4; g.strokeStyle = r() < 0.5 ? rgba(dark, 0.05 + r() * 0.05) : rgba(light, 0.07 + r() * 0.06); g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + Math.cos(a0) * L * 0.5 + bend * 4, y + Math.sin(a0) * L * 0.5 + bend * 4, x + Math.cos(a0 + bend) * L, y + Math.sin(a0 + bend) * L); g.stroke(); }
    // faint mottling: a few big soft blobs (paper is never perfectly even)
    const nb = Math.round((w * h) / 90000 * amt) + 2; for (let i = 0; i < nb; i++) { const x = r() * w, y = r() * h, R = 40 + r() * 120, gr = g.createRadialGradient(x, y, 0, x, y, R); const dk = r() < 0.5; gr.addColorStop(0, dk ? rgba(dark, 0.035) : rgba(light, 0.045)); gr.addColorStop(1, dk ? rgba(dark, 0) : rgba(light, 0)); g.fillStyle = gr; g.fillRect(x - R, y - R, R * 2, R * 2); }
  };

  // ---- guilloche: banknote-style fine line patterns. band(): interlaced sine families across a strip; rosette(): hypotrochoid seal.
  P.band = function (g, x, y, w, h, col, seed = 1, o = {}) {
    const r = rng(seed), n = o.lines || 9, cyc = o.cycles || Math.max(2, Math.round(w / (o.period || 90)));
    g.save(); g.beginPath(); g.rect(x, y, w, h); g.clip(); g.lineWidth = o.lw || 0.8;
    for (let fam = 0; fam < 2; fam++) for (let k = 0; k < n; k++) { const ph = (k / n) * TAU * 0.5 + fam * Math.PI, amp = h * 0.34 * (0.55 + 0.45 * Math.sin(k / n * Math.PI)); g.strokeStyle = rgba(col, (o.alpha || 0.5) * (fam ? 0.8 : 1)); g.beginPath(); for (let i = 0; i <= w; i += 2) { const u = i / w * TAU * cyc; const yy = y + h / 2 + Math.sin(u + ph) * amp * (0.35 + 0.65 * ((k + 1) / n)) + Math.sin(u * 3 + fam) * h * 0.04; i ? g.lineTo(x + i, yy) : g.moveTo(x + i, yy); } g.stroke(); }
    g.restore(); g.strokeStyle = rgba(col, (o.alpha || 0.5) * 0.9); g.lineWidth = (o.lw || 0.8) * 1.4; g.strokeRect(x + 1, y + 1, w - 2, h - 2); g.strokeRect(x + 4, y + 4, w - 8, h - 8);
  };
  P.rosette = function (g, cx, cy, R, col, seed = 1, o = {}) {
    const r = rng(seed); g.save(); g.lineWidth = o.lw || 0.9; const rings = o.rings || 3;
    for (let k = 0; k < rings; k++) { const a = R * (0.95 - k * 0.2), b = a * (0.28 + 0.1 * k) * (k % 2 ? -1 : 1), d = a * (0.55 + r() * 0.2), N = 7 + k * 3; g.strokeStyle = rgba(col, o.alpha || 0.55); g.beginPath(); for (let i = 0; i <= 720; i++) { const t = (i / 720) * TAU * N; const x = (a - b) * Math.cos(t) + d * Math.cos(((a - b) / b) * t), y = (a - b) * Math.sin(t) - d * Math.sin(((a - b) / b) * t); const s = R * 0.88 / (Math.abs(a - b) + Math.abs(d)); i ? g.lineTo(cx + x * s, cy + y * s) : g.moveTo(cx + x * s, cy + y * s); } g.stroke(); }
    g.strokeStyle = rgba(col, (o.alpha || 0.55) * 1.2); g.lineWidth = (o.lw || 0.9) * 1.6; for (const f of [1, 0.93, 0.5]) { g.beginPath(); g.arc(cx, cy, R * f, 0, TAU); g.stroke(); } g.restore();
  };

  const mk = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return [c, c.getContext('2d')]; };
  const toTex = (c, tile, aniso = 4) => { const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.anisotropy = aniso; if (tile) { t.wrapS = t.wrapT = T.RepeatWrapping; } t.generateMipmaps = true; t.minFilter = T.LinearMipmapLinearFilter; t.magFilter = T.LinearFilter; return t; };

  // ---- tiled kinds (512 px tile = 512 world units)
  P.tex = function (kind, col, o = {}) {
    const key = kind + '|' + col + '|' + JSON.stringify(o); if (cache[key]) return cache[key];
    const seed = o.seed || 1; let tex;
    if (kind === 'card' || kind === 'edge' || kind === 'kraft') {
      const [c, g] = mk(512, 512); g.fillStyle = col; g.fillRect(0, 0, 512, 512); P.grain(g, 512, 512, seed + (kind === 'kraft' ? 7 : 0), kind === 'kraft' ? 1.6 : kind === 'edge' ? 0.7 : 1, shade(col, -0.7), shade(col, 0.9)); tex = toTex(c, true);
    } else if (kind === 'ledger') { // floor: accounts-ledger paper, rules running away into the distance
      const [c, g] = mk(1024, 1024); g.fillStyle = col; g.fillRect(0, 0, 1024, 1024); const lite = o.lite != null ? o.lite : 0.1;
      g.strokeStyle = rgba(shade(col, lite > 0 ? 0.45 : -0.5), 0.75); g.lineWidth = 2.6; for (let y = 0; y < 1024; y += 64) { g.beginPath(); g.moveTo(0, y + 0.5); g.lineTo(1024, y + 0.5); g.stroke(); }
      g.strokeStyle = rgba(o.rule || '#C4504A', 0.5); g.lineWidth = 3.5; for (const x of [256, 262, 768]) { g.beginPath(); g.moveTo(x + 0.5, 0); g.lineTo(x + 0.5, 1024); g.stroke(); }
      g.strokeStyle = rgba(shade(col, 0.45), 0.4); g.lineWidth = 2; for (const x of [512, 640, 896]) { g.beginPath(); g.moveTo(x + 0.5, 0); g.lineTo(x + 0.5, 1024); g.stroke(); }
      P.grain(g, 1024, 1024, seed + 3, 1.3, shade(col, -0.7), shade(col, 0.9)); tex = toTex(c, true, 8);
    } else if (kind === 'receipt') { // cream thermal paper with faint printed lines
      const [c, g] = mk(512, 512); g.fillStyle = col; g.fillRect(0, 0, 512, 512); const r = rng(seed); g.font = '11px JBM, monospace'; g.fillStyle = rgba(shade(col, -0.75), 0.22);
      for (let y = 22; y < 512; y += 22) { const tx = (r() < 0.2) ? '-----------------------' : `${['COIN', 'BOTTLE', 'FEE', 'TAX', 'ITEM', 'TOTAL', 'CASH'][Math.floor(r() * 7)]} ${String(Math.floor(r() * 9000 + 100))}.${String(Math.floor(r() * 90 + 10))}`; g.textAlign = 'left'; g.fillText(tx.split(' ')[0], 28, y); g.textAlign = 'right'; g.fillText(tx.split(' ').slice(1).join(' ') || '', 484, y); }
      g.setLineDash([6, 6]); g.strokeStyle = rgba(shade(col, -0.6), 0.18); g.beginPath(); g.moveTo(14, 0); g.lineTo(14, 512); g.moveTo(498, 0); g.lineTo(498, 512); g.stroke(); P.grain(g, 512, 512, seed + 5, 0.9, shade(col, -0.7), shade(col, 0.9)); tex = toTex(c, true);
    } else if (kind === 'bank') { // banknote paper: guilloche band repeats every tile
      const [c, g] = mk(512, 256); g.fillStyle = col; g.fillRect(0, 0, 512, 256); const ink = o.ink || shade(col, o.dark ? 0.5 : -0.45);
      P.band(g, 0, 0, 512, 256, ink, seed, { lines: o.lines || 11, cycles: o.cycles || 4, alpha: o.alpha || 0.55, lw: 0.9 }); P.grain(g, 512, 256, seed + 2, 0.8, shade(col, -0.7), shade(col, 0.9)); tex = toTex(c, true);
    }
    return (cache[key] = tex);
  };

  // ---- sized: a whole wall (w x h world units) painted once: grain, vertical fold creases, optional skirting, banknote dado and wainscot line
  P.wall = function (w, h, col, o = {}) {
    const key = 'wall|' + w + '|' + h + '|' + col + '|' + JSON.stringify(o); if (cache[key]) return cache[key];
    const px = Math.min(0.6, 2048 / w, 1024 / h), cw = Math.ceil(w * px), ch = Math.ceil(h * px), [c, g] = mk(cw, ch), seed = o.seed || 3, r = rng(seed);
    g.fillStyle = col; g.fillRect(0, 0, cw, ch);
    P.grain(g, cw, ch, seed, 2.4, shade(col, -0.7), shade(col, 0.9));
    // creases: valley folds (a dark hairline with a light twin and a wide soft shadow) at jittered x, a few shorter horizontal kinks
    const nf = o.folds != null ? o.folds : Math.max(2, Math.round(w / 520));
    for (let i = 0; i < nf; i++) { const x = ((i + 0.5 + (r() - 0.5) * 0.5) / nf) * cw, tilt = (r() - 0.5) * 6, grd = g.createLinearGradient(x - 26, 0, x + 26, 0); grd.addColorStop(0, rgba(shade(col, 0.9), 0)); grd.addColorStop(0.5, rgba(shade(col, -0.8), 0.07)); grd.addColorStop(1, rgba(shade(col, 0.9), 0.0)); g.fillStyle = grd; g.beginPath(); g.moveTo(x - 26 + tilt, 0); g.lineTo(x + 26 + tilt, 0); g.lineTo(x + 26 - tilt, ch); g.lineTo(x - 26 - tilt, ch); g.fill();
      g.lineWidth = 1.5; g.strokeStyle = rgba(shade(col, -0.8), 0.22); g.beginPath(); g.moveTo(x + tilt, 0); g.lineTo(x - tilt, ch); g.stroke(); g.lineWidth = 1.2; g.strokeStyle = rgba(shade(col, 0.95), 0.3); g.beginPath(); g.moveTo(x + tilt + 2, 0); g.lineTo(x - tilt + 2, ch); g.stroke(); }
    for (let i = 0; i < Math.round(w / 900); i++) { const y = (0.2 + r() * 0.6) * ch, x0 = r() * cw * 0.8, L = 80 + r() * 260; g.strokeStyle = rgba(shade(col, -0.8), 0.1); g.lineWidth = 1; g.beginPath(); g.moveTo(x0, y); g.lineTo(x0 + L, y + (r() - 0.5) * 3); g.stroke(); }
    if (o.dado) { const dh = (o.dado.h || 120) * px; g.fillStyle = o.dado.col || shade(col, -0.18); g.fillRect(0, ch - dh, cw, dh); P.band(g, 0, ch - dh + 8 * px, cw, dh - 16 * px, o.dado.ink || shade(o.dado.col || col, 0.5), seed + 1, { lines: 9, cycles: Math.round(w / 100), alpha: 0.5, lw: 0.9 });
      g.fillStyle = shade(o.dado.col || col, 0.3); g.fillRect(0, ch - dh - 2, cw, 3); P.grain(g, cw, dh, seed + 6, 1, shade(col, -0.7), shade(col, 0.9)); }
    if (o.paint) o.paint(g, cw, ch, px);
    // a darker top-down falloff: the wall reads as lit from the lamp side, not flat
    const t = toTex(c, false, 4); t.wrapS = t.wrapT = T.ClampToEdgeWrapping; return (cache[key] = t);
  };

  // ---- sized: a round seal / crest (guilloche rosette inside rings, a star). Unlit; paper, no real emblem.
  P.seal = function (r, col, ink, o = {}) {
    const key = 'seal|' + r + '|' + col + '|' + ink + '|' + JSON.stringify(o); if (cache[key]) return cache[key];
    const S = Math.min(512, Math.ceil(r * 2 * 1.5)), [c, g] = mk(S, S), cx = S / 2; g.fillStyle = col; g.beginPath(); g.arc(cx, cx, cx - 1, 0, TAU); g.fill(); P.grain(g, S, S, 4, 1, shade(col, -0.7), shade(col, 0.9)); g.save(); g.beginPath(); g.arc(cx, cx, cx - 1, 0, TAU); g.clip();
    P.rosette(g, cx, cx, cx * 0.9, ink, o.seed || 5, { rings: 3, alpha: 0.6 }); g.fillStyle = col; g.beginPath(); g.arc(cx, cx, cx * 0.42, 0, TAU); g.fill(); g.strokeStyle = rgba(ink, 0.7); g.lineWidth = 2; g.beginPath(); g.arc(cx, cx, cx * 0.42, 0, TAU); g.stroke();
    g.fillStyle = ink; g.beginPath(); const n = o.star || 5; for (let i = 0; i < n * 2; i++) { const a = -Math.PI / 2 + (i * Math.PI) / n, rr = i % 2 ? cx * 0.17 : cx * 0.36; g.lineTo(cx + Math.cos(a) * rr, cx + Math.sin(a) * rr); } g.closePath(); g.fill(); g.restore();
    const t = toTex(c, false, 4); t.wrapS = t.wrapT = T.ClampToEdgeWrapping; return (cache[key] = t);
  };

  // ---- paper materials (Lambert, colour baked in the texture)
  P.mat = function (kind, col, o = {}) {
    const key = kind + '|' + col + '|' + (o.map ? '' : JSON.stringify(o)); if (!o.map && mcache[key]) return mcache[key];
    const m = new T.MeshLambertMaterial({ map: o.map || P.tex(kind, col, o), side: o.side }); return o.map ? m : (mcache[key] = m);
  };
})();
