// Bad Math engine v2 — 3D PAPER SETS (three.js). Pop-up dioramas built from folded card: slabs with thickness, one lamp, hard cast shadows.
// Needs window.THREE (vendor/three.cjs). World units are the same pixels as the 2D rig: x right, y UP, z toward the camera; characters stand on y = 0, lane l -> z = l * 64.
//   BM2.Sets3D.define('kitchen', { marks:{A:-260, B:260, door:-900}, pool:[x,y,z], build(ctx) { ... return { update(t) } } })
//   ctx = { T (THREE), g (THREE.Group to add to), K (theme colours + palette overrides), theme ('night'|'day'), slab(), wall(), floor(), cyl(), disc(), text(), sign(), seal(), frame(), curtain(), cupboard(), hangLamp(), chairs(), band(), gobo(), mat() }
// Paper look (paper.js): every slab face is a procedural card texture with grain, fibres and a lighter cut-edge strip; thin slabs (cards) get a lighter THICKNESS edge on the sides; walls carry fold creases; floors are ledger / receipt paper;
// trim is banknote guilloche. Colour is baked per texture and cached, so cost is the same as flat colour.
// Themes follow SHOW-BIBLE §1.4: night (Decoded: Ink, Midnight, Oxblood, Manila, Smoke, Slate; hard long lamp shadows, one lamp POOL with falloff) and day (What If: Cream, Sky, Tangerine, Grape, Mint, Plum; short soft shadows, bright daylight).
// Depth zones in every set (front to back): FAR (z < -450: wall, skyline), MID (z -450 .. -120: furniture, shop fronts, hero dressing), STAGE (z -120 .. 120: where the cast walks), NEAR (z > 250: dark foreground cut-outs the camera peeks past).
(function () {
  const B = window.BM2; if (!window.THREE) return; const T = window.THREE, TAU = Math.PI * 2, hash = B.hash, S = (B.Sets3D = { sets: {}, props: {} });
  const PP = () => B.Paper;
  S.define = (name, def) => (S.sets[name] = def); S.defineProp = (kind, fn) => (S.props[kind] = fn);
  // colour roles: bg = void colour, A = backdrop, B = wall paper, C = accent wall, D = furniture, E = floor, F = darkest, G = highlight paper, lamp, accent (series accent: used sparingly)
  S.themes = {
    night: { bg: '#0B0F14', A: '#40546f', B: '#6a2420', C: '#C9A66B', D: '#7a8494', E: '#475b78', F: '#10151d', G: '#F5F3EE', lamp: '#F4D9A0', accent: '#FF3B30', amb: 0.78, key: 3.8, elev: 0.6, soft: 1, pool: 0.7, vig: 0.34 },
    day: { bg: '#FFF4DC', A: '#7FCDEB', B: '#F58A2E', C: '#9BE3C0', D: '#5A3FA0', E: '#FFF4DC', F: '#3D2A73', G: '#F5F3EE', lamp: '#FFF4DC', accent: '#FFD60A', amb: 1.15, key: 1.7, elev: 1.0, soft: 3, pool: 0, vig: 0.08 },
  };
  const matCache = {}; const mat = (c, o = {}) => { const k = c + JSON.stringify(o); return matCache[k] || (matCache[k] = new T.MeshLambertMaterial(Object.assign({ color: c }, o))); };
  const panelCache = {};
  // one card face texture of w x h world units (colour baked, grain + fibres + lighter cut edge on the top/left rim and a darker hairline bottom/right)
  function panelTex(w, h, col, seed) {
    const P = PP(); const key = Math.round(w) + 'x' + Math.round(h) + col + seed; if (panelCache[key]) return panelCache[key];
    const px = Math.min(1, 600 / Math.max(w, h)), cw = Math.max(4, Math.ceil(w * px)), ch = Math.max(4, Math.ceil(h * px)), c = document.createElement('canvas'); c.width = cw; c.height = ch; const g = c.getContext('2d');
    g.fillStyle = col; g.fillRect(0, 0, cw, ch); P.grain(g, cw, ch, seed, 1.2, P.shade(col, -0.7), P.shade(col, 0.9));
    const e = Math.max(1.5, 4 * px); g.fillStyle = P.shade(col, 0.34); g.fillRect(0, 0, cw, e); g.fillRect(0, 0, e, ch); g.fillStyle = P.shade(col, -0.3); g.fillRect(0, ch - e * 0.6, cw, e * 0.6); g.fillRect(cw - e * 0.6, 0, e * 0.6, ch);
    const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.anisotropy = 4; return (panelCache[key] = t);
  }
  const pmat = (tex) => new T.MeshLambertMaterial({ map: tex }); const pmatCache = new Map(); const pm = tex => pmatCache.get(tex) || (pmatCache.set(tex, pmat(tex)), pmatCache.get(tex));
  function ctxFor(group, theme, palette, lamp) {
    const K = Object.assign({}, S.themes[theme] || S.themes.night, palette || {}); const P = PP();
    // slab(w, h, d, x, bottomY, z, colour, {front: texture for the +z face, card: force card/block, edge: false, cast, recv})
    const slab = (w, h, d, x, y, z, col, o = {}) => {
      let m; const dims = [w, h, d], mn = Math.min(w, h, d), ta = dims.indexOf(mn), mid = dims.slice().sort((a, b) => a - b)[1], card = o.card != null ? o.card : mn <= 0.42 * mid;
      if (o.mat) m = new T.Mesh(new T.BoxGeometry(w, h, d), o.mat);
      else if (!P) m = new T.Mesh(new T.BoxGeometry(w, h, d), mat(col));
      else {
        const seed = 1 + Math.floor(hash(x * 0.013 + y * 0.31 + z * 0.0071 + w) * 40), fm = (a, b) => pm(panelTex(a, b, col, seed)), faceDims = [[d, h], [d, h], [w, d], [w, d], [w, h], [w, h]], edgeCol = P.shade(col, 0.3), em = mat(edgeCol), mats = [];
        for (let i = 0; i < 6; i++) { const ax = i >> 1; let mm; if (i === 4 && o.front) mm = o.frontMat || (o.frontMat = pm(o.front)); else if (card && ax !== ta && o.edge !== false) mm = em; else if (!card && i === 2) mm = pm(panelTex(w, d, P.shade(col, 0.1), seed)); else mm = fm(faceDims[i][0], faceDims[i][1]); mats.push(mm); }
        m = new T.Mesh(new T.BoxGeometry(w, h, d), mats);
      }
      m.position.set(x, y + h / 2, z); m.castShadow = o.cast !== false; m.receiveShadow = o.recv !== false; if (o.ry) m.rotation.y = o.ry; if (o.rz) m.rotation.z = o.rz; group.add(m); return m; };
    const wall = (w, h, d, x, y, z, col, o = {}) => slab(w, h, d, x, y, z, col, Object.assign({ front: P ? P.wall(w, h, col, o) : null }, o));
    const cyl = (r, h, x, y, z, col, o = {}) => { const m = new T.Mesh(new T.CylinderGeometry(o.r2 == null ? r : o.r2, r, h, o.seg || 28), mat(col)); m.position.set(x, y + h / 2, z); m.castShadow = o.cast !== false; m.receiveShadow = true; group.add(m); return m; };
    const disc = (r, x, y, z, col, o = {}) => { const m = new T.Mesh(new T.CircleGeometry(r, 48), o.map ? new T.MeshLambertMaterial({ map: o.map }) : mat(col)); m.rotation.x = -Math.PI / 2; m.position.set(x, y, z); m.receiveShadow = true; group.add(m); return m; };
    // floor(colour, w, d, z, {kind: 'ledger'|'receipt'|'card'|'plain'}): paper floor; ledger rules run away from the lens
    const floor = (col, w = 7000, d = 5000, z = 0, o = {}) => { let mt; const kind = o.kind || 'ledger'; if (!P || kind === 'plain') mt = mat(col); else { const t = P.tex(kind, col, Object.assign({ seed: 11 }, o.tex || {})).clone(); t.needsUpdate = true; t.repeat.set(w / (kind === 'ledger' ? 1024 : 512), d / (kind === 'ledger' ? 1024 : 512)); t.offset.set(0.13, 0.31); mt = new T.MeshLambertMaterial({ map: t }); }
      const m = new T.Mesh(new T.PlaneGeometry(w, d), mt); m.rotation.x = -Math.PI / 2; m.position.set(0, 0, z); m.receiveShadow = true; group.add(m); return m; };
    // unlit painted plane (a sign face, a picture): signs lit from the side go grey, so faces are unlit (SHOW-BIBLE 1.5)
    const text = (w, h, px, paint, x, y, z, o = {}) => { const cv = document.createElement('canvas'); cv.width = Math.round(w * px); cv.height = Math.round(h * px); const g = cv.getContext('2d'); g.scale(px, px); paint(g, w, h); const tex = new T.CanvasTexture(cv); tex.colorSpace = T.SRGBColorSpace; tex.anisotropy = 4; const m = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({ map: tex, color: o.dim || '#ffffff' })); m.position.set(x, y, z); if (o.ry) m.rotation.y = o.ry; group.add(m); m.tex = tex; m.cv = cv; m.g = g; return m; };
    const token = (x, y, z, col, s = 1, o = {}) => { const gp = new T.Group(); const body = new T.Mesh(new T.CylinderGeometry(22 * s, 34 * s, 80 * s, 14), mat(col)), head = new T.Mesh(new T.SphereGeometry(26 * s, 14, 10), mat(o.head || '#F5F3EE')); body.position.y = 40 * s; head.position.y = 104 * s; body.castShadow = head.castShadow = true; gp.add(body, head); gp.position.set(x, y, z); group.add(gp); return gp; };
    // sign(text, w, h, x, y, z, {plate, ink}): a SHORT world label (SHOW-BIBLE S7/S8: names a place, never tells). Card plate with banknote trim, unlit face.
    const sign = (str, w, h, x, y, z, o = {}) => { const plate = o.plate || (theme === 'night' ? '#C9A66B' : '#FFF4DC'), ink = o.ink || (theme === 'night' ? '#10151d' : K.F); slab(w + 28, h + 28, 14, x, y - 14, z - 9, o.back || K.F);
      return text(w, h, 1.4, (g, ww, hh) => { g.fillStyle = plate; g.fillRect(0, 0, ww, hh); if (P) { P.grain(g, ww, hh, 9, 1, P.shade(plate, -0.7), P.shade(plate, 0.9)); P.band(g, 0, 0, ww, hh, P.shade(plate, -0.4), 4, { lines: 5, cycles: Math.round(ww / 60), alpha: 0.35, lw: 0.7 }); g.fillStyle = plate; g.fillRect(8, 8, ww - 16, hh - 16); } g.fillStyle = ink; g.textAlign = 'center'; g.textBaseline = 'middle'; let fs = Math.round(hh * (theme === 'night' ? 0.5 : 0.62)); const fnt = n => o.font || (theme === 'night' ? '800 ' + n + 'px JBM, monospace' : n + 'px Anton, Impact, sans-serif'); g.font = fnt(fs); while (fs > 10 && g.measureText(str).width > ww - 44) { fs -= 2; g.font = fnt(fs); } g.fillText(str, ww / 2, hh / 2 + 2); }, x, y + h / 2, z + 1); };
    // seal: round paper crest with a guilloche rosette and a star (no real emblem). Lies flat on a wall / podium front.
    const seal = (r, x, y, z, col, ink, o = {}) => { const m = new T.Mesh(new T.CircleGeometry(r, 48), new T.MeshBasicMaterial({ map: P ? P.seal(r, col, ink, o) : null, color: P ? 0xffffff : col })); m.position.set(x, y, z); group.add(m); const back = new T.Mesh(new T.CylinderGeometry(r + 6, r + 6, 8, 40), mat(P ? P.shade(col, -0.25) : col)); back.rotation.x = Math.PI / 2; back.position.set(x, y, z - 4); back.castShadow = true; group.add(back); return m; };
    const frame = (w, h, x, y, z, paint, o = {}) => { const fc = o.frame || K.F, b = o.border || 22; slab(w, h, 16, x, y, z, fc); const m = text(w - b * 2, h - b * 2, 1.2, paint, x, y + h / 2, z + 9); return m; };
    // curtain: a pleated paper drape (sine-folded plane), top rod. Silhouette interest + shadow.
    const curtain = (w, h, x, y, z, col, o = {}) => { const folds = o.folds || Math.round(w / 40), geo = new T.PlaneGeometry(w, h, folds * 6, 1), p = geo.attributes.position; for (let i = 0; i < p.count; i++) { const u = p.getX(i) / w + 0.5; p.setZ(i, Math.sin(u * folds * TAU) * (o.depth || 16) * (1 - 0.35 * (p.getY(i) / h + 0.5))); } geo.computeVertexNormals();
      const m = new T.Mesh(geo, new T.MeshLambertMaterial({ map: P ? P.tex('card', col, { seed: 6 }) : null, color: P ? 0xffffff : col, side: T.DoubleSide })); m.position.set(x, y + h / 2, z); m.castShadow = m.receiveShadow = true; group.add(m); if (o.rod !== false) slab(w + 40, 12, 14, x, y + h, z, P ? P.shade(col, -0.45) : col); return m; };
    // cupboard: carcass + two door panels with handles
    const cupboard = (x, y, z, w, h, col, o = {}) => { const d = o.d || 90; slab(w, h, d, x, y, z, P ? P.shade(col, -0.12) : col); const dc = o.door || col; const n = o.doors || 2, dw = (w - 14) / n; for (let i = 0; i < n; i++) { const dx = x - w / 2 + 7 + i * dw + (dw - 6) / 2; slab(dw - 6, h - 16, 8, dx, y + 8, z + d / 2, dc); slab(8, 34, 8, i % 2 ? dx - (dw - 6) / 2 + 14 : dx + (dw - 6) / 2 - 14, y + h * 0.4, z + d / 2 + 9, o.handle || K.G, { cast: false }); } };
    // hangLamp: a cone shade on a cord. The bulb is a flat cream disc (never an emissive glow).
    const hangLamp = (x, yShade, z, o = {}) => { const top = o.top || 1700, col = o.col || K.F; cyl(3.5, top - yShade, x, yShade, z, '#10151d', { cast: false, seg: 6 }); const r1 = o.r || 90; const sh = new T.Mesh(new T.CylinderGeometry(r1 * 0.28, r1, o.h || 78, 28, 1, true), new T.MeshLambertMaterial({ color: col, side: T.DoubleSide })); sh.position.set(x, yShade + (o.h || 78) / 2, z); sh.castShadow = true; group.add(sh);
      const lip = new T.Mesh(new T.TorusGeometry(r1, 3.5, 6, 32), mat(P ? P.shade(col, 0.35) : col)); lip.rotation.x = Math.PI / 2; lip.position.set(x, yShade, z); group.add(lip); const bulb = new T.Mesh(new T.CircleGeometry(r1 * 0.72, 28), new T.MeshBasicMaterial({ color: K.lamp })); bulb.rotation.x = Math.PI / 2; bulb.position.set(x, yShade - 1, z); group.add(bulb); return sh; };
    // chairs: a row of chair backs seen from behind, x0..x1, at depth z (n chairs)
    const chairs = (x0, x1, z, n, col, o = {}) => { const h = o.h || 96, w = o.w || 62; for (let i = 0; i < n; i++) { const x = n === 1 ? x0 : x0 + ((x1 - x0) * i) / (n - 1); slab(w, h, 10, x, o.y || 0, z, col); slab(w - 10, 10, 8, x, (o.y || 0) + h, z, P ? P.shade(col, 0.12) : col); slab(w - 14, 40, 48, x, (o.y || 0) + 44, z + 28, P ? P.shade(col, -0.1) : col, { cast: o.cast }); } };
    // band: a banknote-guilloche strip (trim) on a slab face
    const band = (w, h, x, y, z, col, ink, o = {}) => text(w, h, 1.2, (g, ww, hh) => { g.fillStyle = col; g.fillRect(0, 0, ww, hh); if (P) P.band(g, 0, 0, ww, hh, ink, o.seed || 3, { lines: o.lines || 8, cycles: Math.round(ww / (o.period || 70)), alpha: 0.55, lw: 0.8 }); }, x, y + h / 2, z, o);
    // gobo: INVISIBLE shadow casters (blinds / bars / window cross) placed between the lamp and `at`, so their stripes fall on the floor, walls AND character cards.
    const gobo = (kind, at, dist = 800, w = 700, h = 700, o = {}) => { const dn = new T.Vector3(...(lamp || [-0.75, K.elev, 0.55])).normalize(), g = new T.Group(), im = new T.MeshBasicMaterial({ colorWrite: false, depthWrite: false }), add = (bw, bh) => { const m = new T.Mesh(new T.BoxGeometry(bw, bh, 8), im); m.castShadow = true; m.userData.noVis = true; return m; };
      if (kind === 'blinds') for (let y = -h / 2; y <= h / 2; y += o.pitch || 46) { const m = add(w, o.slat || 20); m.position.y = y; g.add(m); } else if (kind === 'bars') for (let x = -w / 2; x <= w / 2; x += o.pitch || 60) { const m = add(o.slat || 20, h); m.position.x = x; g.add(m); } else if (kind === 'cross') { const a = add(w, 26), b = add(26, h); g.add(a, b); const fr = [add(w, 30), add(w, 30), add(30, h), add(30, h)]; fr[0].position.y = h / 2; fr[1].position.y = -h / 2; fr[2].position.x = -w / 2; fr[3].position.x = w / 2; fr.forEach(m => g.add(m)); }
      g.position.set(at[0], at[1], at[2]).add(dn.clone().multiplyScalar(dist)); group.add(g); g.lookAt(g.position.clone().add(dn)); g.traverse(m => { if (m.isMesh) m.layers.enable(2); }); return g; };
    return { T, g: group, K, theme, slab, wall, cyl, disc, floor, text, token, mat, gobo, sign, seal, frame, curtain, cupboard, hangLamp, chairs, band, P, lamp: lamp || [-0.75, K.elev, 0.55] };
  }
  S.ctxFor = ctxFor;
  const R = (a, b, n) => { const o = []; for (let i = 0; i < n; i++) o.push(a + ((b - a) * i) / Math.max(1, n - 1)); return o; };
  const night = c => c.theme === 'night';

  // ---- void: a lit disc on nothing (comparison gags, host asides, CTAs)
  S.define('void', { marks: { A: -220, B: 220, centre: 0 }, build(c) { const { K } = c; c.floor(K.bg, 9000, 9000, 0, { kind: 'plain' }); c.disc(820, 0, 0.5, 0, K.E); c.disc(560, 0, 1, 0, c.theme === 'night' ? '#3a4658' : '#FFFFFF'); return { bg: K.bg, update() {} }; } });

  // ---- desk: Decoded home base. FAR: blinds-gobo wall with window + case board; MID: filing cabinets, hanging lamp; STAGE: case desk with lamp; NEAR: dark stack of case files + chair back
  S.define('desk', { marks: { A: -230, B: 230, desk: 150 }, pool: [120, 0, -150], build(c) { const { K, slab, wall, floor, cyl, text, T } = c, N = night(c); floor(K.E, 7000, 5000, 0, { kind: 'ledger' });
    wall(4200, 1100, 30, 0, 0, -600, K.A, { seed: 4, dado: { h: 110, col: N ? '#2A3647' : K.F } }); // FAR: back wall with a banknote dado
    for (let i = 0; i < 12; i++) slab(520, 14, 40, -700, 280 + i * 40, -500, K.D, { cast: true }); // venetian blind slats: the gobo (stripes on the wall)
    slab(540, 480, 6, -700, 240, -552, N ? '#E9D9A6' : '#BDE7F7', { cast: false, card: false }); slab(570, 16, 40, -700, 700, -540, K.F); slab(570, 16, 40, -700, 222, -540, K.F);
    slab(520, 360, 14, 760, 300, -560, K.C); text(460, 300, 1.5, (g, w, h) => { g.fillStyle = '#E6D3A6'; g.fillRect(0, 0, w, h); if (c.P) c.P.grain(g, w, h, 8, 1, '#000', '#fff'); g.strokeStyle = 'rgba(0,0,0,.2)'; g.strokeRect(2, 2, w - 4, h - 4); g.fillStyle = '#fff'; for (const [x, y, ww, hh] of [[34, 34, 100, 120], [180, 56, 90, 112], [310, 34, 100, 130]]) { g.fillRect(x, y, ww, hh); g.fillStyle = '#9aa'; g.fillRect(x + 8, y + 8, ww - 16, hh * 0.55); g.fillStyle = '#fff'; } g.strokeStyle = '#FF3B30'; g.lineWidth = 3; g.beginPath(); g.moveTo(84, 66); g.lineTo(225, 112); g.lineTo(360, 74); g.stroke(); g.fillStyle = '#FF3B30'; for (const [x, y] of [[84, 66], [225, 112], [360, 74]]) { g.beginPath(); g.arc(x, y, 7, 0, TAU); g.fill(); } }, 760, 480, -550);
    c.hangLamp(120, 640, -150, { r: 110, col: N ? '#2A3647' : K.F, top: 1500 }); // MID: pendant over the desk
    for (const [x, hh] of [[-1160, 330], [-1010, 300], [-860, 350]]) { slab(130, hh, 90, x, 0, -490, K.D); for (let k = 0; k < 3; k++) { slab(112, hh / 3 - 12, 6, x + 9, 6 + k * (hh / 3), -444, c.P ? c.P.shade(K.D, 0.12) : K.D); slab(40, 8, 8, x + 45, hh / 3 / 2 - 4 + k * (hh / 3), -438, K.G, { cast: false }); } } // filing cabinets
    slab(620, 30, 200, -10, 150, -250, K.C); slab(560, 4, 150, 20, 180, -250, '#2e3a2c', { cast: false }); for (const x of [-30, 570]) slab(30, 150, 180, x, 0, -250, K.D); // STAGE: desk + blotter
    c.band(520, 10, 20, 184, -176, '#2e3a2c', '#8DB08A', { seed: 6 }); const lg = [[60, 214, -300], [100, 214, -310]]; for (const [x, y, z] of lg) slab(44, 10 + (x % 3) * 5, 56, x - 22, y - 30, z, '#C9A66B'); // case files stacked
    cyl(8, 120, 470, 180, -250, K.F); cyl(55, 44, 470, 290, -250, K.lamp, { r2: 22 }); // desk lamp (flat shade, no glow)
    for (const [x, hh] of [[-420, 70], [-360, 46]]) slab(90, hh, 60, x, 0, 150, '#C9A66B'); // NEAR: stacked manila case files
    slab(70, 150, 12, 640, 0, 330, K.F); slab(66, 14, 60, 640, 70, 350, K.F); slab(58, 14, 8, 644, 150, 330, K.F); // NEAR: chair back silhouette
    return { bg: K.bg, update(t) {} }; } });

  // ---- auction: FAR panelled wall, sign plate, pilasters + drapes, pendant lamps; MID: dais, podium with crest, lot pedestal; STAGE aisle; NEAR: rows of chair backs and bidder shoulders
  S.define('auction', { marks: { A: -300, B: 300, podium: -100 }, pool: [60, 0, -120], build(c) { const { K, slab, wall, floor, token, text, cyl, T } = c, N = night(c); floor(K.E, 7000, 5000, 0, { kind: 'ledger' });
    wall(4400, 1000, 30, 0, 0, -520, K.B, { seed: 2, dado: { h: 150, col: K.dado || (N ? '#4a1815' : K.D), ink: N ? '#C9A66B' : K.C }, folds: 7 });
    for (const x of R(-1700, 1700, 15)) slab(60, 720, 10, x, 170, -498, K.C, { cast: false }); // panelling strips
    slab(460, 200, 30, 0, 580, -500, K.F); c.sign(K.sign || 'AUCTION · NEW YORK', 860, 170, 0, 560, -478); // FAR: the one short world label
    for (const x of [-900, 900]) { slab(120, 860, 60, x - 60, 0, -480, K.pil || (N ? '#6f2823' : K.D)); slab(150, 40, 80, x - 75, 820, -475, K.C); slab(150, 40, 80, x - 75, 0, -475, K.C); } // pilasters
    c.curtain(300, 700, -1130, 90, -440, K.curt || (N ? '#3a1210' : K.F), { folds: 8, depth: 26 }); c.curtain(300, 700, 1130, 90, -440, K.curt || (N ? '#3a1210' : K.F), { folds: 8, depth: 26 });
    for (const x of [-520, 520]) c.hangLamp(x, 790, -380, { r: 80, col: N ? '#10151d' : K.F, top: 1500 }); // pendant lamps
    slab(780, 28, 380, -100, 0, -320, N ? '#2a3647' : K.D); slab(740, 12, 340, -100, 28, -320, K.C, { card: false }); // MID: dais (ledger-ish step)
    slab(190, 200, 110, -100, 40, -300, N ? '#6b7482' : K.D); slab(230, 20, 140, -100, 240, -300, K.C); c.seal(40, -100, 160, -243, '#C9A66B', '#5E1F1B'); // podium + crest
    cyl(60, 150, 400, 0, -210, K.G, { seg: 32 }); slab(130, 12, 130, 335, 150, -275, K.cloth || '#a43b2f', { card: false }); // lot pedestal with a cloth
    for (const [x0, dir] of [[-760, 1], [760, -1]]) for (let r = 0; r < 3; r++) for (let i = 0; i < 4; i++) token(x0 + dir * i * 140, 0, 130 + r * 130, i % 2 ? K.D : K.E, 1.2); // bidder crowd mass
    for (const [r, z] of [[0, 90], [1, 220], [2, 350]]) { c.chairs(-1300, -450, z, 6, N ? '#1a2230' : K.F, { h: 100 + r * 10 }); c.chairs(450, 1300, z, 6, N ? '#1a2230' : K.F, { h: 100 + r * 10 }); } // NEAR: chair backs, aisle in the middle
    return { bg: K.bg, update(t) { } }; } });

  // ---- kitchen: FAR wall + window with curtains and a framed picture; MID: cupboards, counter + sink, fridge, hanging lamp, island; NEAR: chair back and door frame
  S.define('kitchen', { marks: { A: -250, B: 250, door: -900, counter: -150 }, pool: [120, 0, -150], build(c) { const { K, slab, wall, floor, cyl, text } = c, N = night(c); floor(K.E, 7000, 5000, 0, { kind: 'ledger' });
    wall(4400, 1000, 30, 0, 0, -540, N ? K.A : K.G, { seed: 5, dado: { h: 130, col: K.dado || (N ? '#2A3647' : K.D), ink: N ? '#8d9bb0' : K.G }, folds: 7, paint: (g, w, h, px) => { g.strokeStyle = 'rgba(0,0,0,.07)'; g.lineWidth = 1; for (let y = 140; y < 1000; y += 80) { g.beginPath(); g.moveTo(0, h - y * px); g.lineTo(w, h - y * px); g.stroke(); } } });
    slab(520, 380, 8, -110, 290, -516, N ? '#E9D9A6' : '#BDE7F7', { cast: false, card: false }); slab(560, 20, 40, -130, 280, -510, K.C); slab(560, 20, 40, -130, 660, -510, K.C); slab(18, 380, 40, -140, 290, -510, K.C); // window (FAR)
    c.curtain(150, 420, -440, 270, -498, N ? '#5E1F1B' : K.F, { folds: 4, depth: 20 }); c.curtain(150, 420, 130, 270, -498, N ? '#5E1F1B' : K.F, { folds: 4, depth: 20 });
    c.frame(210, 270, 620, 340, -520, (g, w, h) => { g.fillStyle = N ? '#C9A66B' : '#BDE7F7'; g.fillRect(0, 0, w, h); g.fillStyle = N ? '#5E1F1B' : '#9BE3C0'; g.beginPath(); g.moveTo(0, h); g.lineTo(w * 0.35, h * 0.45); g.lineTo(w * 0.7, h); g.fill(); g.fillStyle = '#F5F3EE'; g.beginPath(); g.arc(w * 0.72, h * 0.28, 22, 0, TAU); g.fill(); }, { frame: K.F, border: 14 }); // framed picture
    for (const x of [-1000, -720]) c.cupboard(x, 520, -470, 250, 180, K.B, { door: N ? '#6b2a24' : K.B }); c.cupboard(780, 520, -470, 220, 180, K.B, { door: N ? '#6b2a24' : K.B }); // wall cupboards
    slab(1300, 95, 150, -700, 0, -430, K.D); slab(1300, 14, 165, -700, 95, -430, K.C); for (const x of [-1100, -820, -540]) { slab(210, 70, 6, x - 105 + 100, 12, -354, c.P ? c.P.shade(K.D, 0.1) : K.D); slab(30, 8, 8, x + 40, 50, -348, K.G, { cast: false }); } // counter + drawer fronts
    slab(150, 22, 90, -480, 106, -430, K.F); cyl(8, 60, -480, 100, -470, K.F); slab(40, 8, 60, -480, 160, -450, K.F); slab(170, 360, 140, -1460, 0, -430, K.G); slab(10, 150, 6, -1380, 160, -355, K.F, { cast: false }); // sink + tap, fridge
    c.hangLamp(330, 640, -80, { r: 100, col: N ? '#10151d' : K.F, top: 1600 }); // hanging lamp over the island
    slab(450, 20, 180, 330, 92, -80, K.C); for (const x of [130, 510]) slab(24, 92, 160, x, 0, -80, K.D); // island / table
    slab(80, 160, 10, 780, 0, 330, K.F); slab(76, 14, 60, 780, 80, 350, K.F); slab(66, 14, 8, 784, 160, 330, K.F); // NEAR: chair back silhouette
    slab(60, 760, 60, 640, 0, 340, K.F); slab(60, 760, 60, 1180, 0, 340, K.F); slab(660, 70, 70, 640, 760, 340, K.F); // NEAR: door frame (we look in from the hall)
    if (N) c.gobo('blinds', [160, 260, -120], 900, 1500, 900, { pitch: 52, slat: 24 }); // lamp through venetian blinds: stripes on the floor, walls and the cards
    return { bg: K.bg, update() {} }; } });

  // ---- court: FAR wall with the big crest, pilasters; MID: judge's bench with seal, flags-free dais, jury box; STAGE: witness stand + defence table; NEAR: public rail with balusters
  S.define('court', { marks: { A: -300, B: 300, bench: 0, stand: 520 }, pool: [0, 0, -150], build(c) { const { K, slab, wall, floor, token, cyl, T } = c, N = night(c); floor(K.E, 7000, 5000, 0, { kind: 'ledger' });
    wall(4400, 1100, 30, 0, 0, -600, K.A, { seed: 8, dado: { h: 220, col: K.dado || (N ? '#4a1815' : K.D), ink: N ? '#C9A66B' : K.G }, folds: 8 });
    for (const x of [-840, 840]) { slab(110, 900, 60, x - 55, 0, -570, K.pil || (N ? '#59606B' : K.D)); slab(150, 38, 80, x - 75, 880, -565, K.C); } // pilasters
    c.seal(150, 0, 640, -565, '#C9A66B', '#5E1F1B', { star: 6 }); // FAR: the crest
    for (const x of [-460, 460]) c.hangLamp(x, 900, -420, { r: 85, col: N ? '#10151d' : K.F, top: 1500 });
    slab(900, 70, 330, 0, 0, -400, N ? '#2a3647' : K.D, { card: false }); // MID: dais step
    slab(700, 200, 140, 0, 70, -430, N ? '#4a1815' : K.F); c.band(640, 70, 0, 100, -359, N ? '#4a1815' : K.F, '#C9A66B', { seed: 5 }); slab(780, 26, 190, 0, 270, -430, K.C); c.seal(34, 0, 190, -359, '#C9A66B', '#10151d'); // bench + banknote front panel + seal
    slab(190, 150, 160, 600, 0, -280, K.D); slab(210, 20, 180, 600, 150, -280, K.C); slab(170, 70, 12, 600, 150, -190, K.F); // witness stand
    for (let r = 0; r < 2; r++) { slab(560, 56, 110, -840, r * 56, -300 + r * -120, N ? '#59606B' : K.D); for (let i = 0; i < 4; i++) token(-1010 + i * 120, 56 + r * 56, -300 + r * -120, i % 2 ? K.D : K.E, 1.0); } // jury box, 2 rows
    slab(540, 24, 160, -230, 100, 60, K.C); for (const x of [-460, 0]) slab(22, 100, 140, x, 0, 60, K.D); // defence table
    slab(2800, 24, 20, 0, 150, 440, K.F); for (const x of R(-1300, 1300, 22)) slab(18, 150, 18, x, 0, 440, K.F); slab(2800, 20, 30, 0, 0, 440, K.F); // NEAR: public-gallery rail with balusters
    c.chairs(-1200, -500, 620, 5, '#10151d', { h: 90 }); c.chairs(500, 1200, 620, 5, '#10151d', { h: 90 });
    return { bg: K.bg, update() {} }; } });

  // ---- street: FAR skyline + moon + cloud strips; MID: shop fronts with awnings and signs, house door, street lamp; STAGE: pavement; NEAR: dark lamp post and bollards, parked car
  S.define('street', { marks: { A: -300, B: 300, door: -250 }, pool: [-50, 0, -50], build(c) { const { K, slab, floor, cyl, T, text } = c, N = night(c); floor(N ? '#26324a' : '#E9DFC4', 8000, 6000, 600, { kind: N ? 'receipt' : 'receipt', tex: N ? { seed: 3 } : {} }); slab(7400, 24, 700, 0, 0, 120, N ? K.D : '#C9BDA0'); // pavement
    slab(7400, 30, 40, 0, 0, 480, K.C); // kerb
    slab(7400, 3, 24, 0, 24, 330, N ? '#E9D9A6' : '#fff', { cast: false }); // dashed-line stand-in: pavement edge stripe
    for (const x of R(-2800, 2800, 16)) { const h = 520 + 760 * hash(x * 0.013); slab(260, h, 200, x, 0, -1700, N ? K.A : K.C); } // FAR: skyline
    for (const x of R(-2400, 2400, 8)) { const h = 560 + 500 * hash(x * 0.021 + 3); slab(300, h, 150, x + 50, 0, -2300, N ? '#2a3a52' : '#BCE6F2'); }
    for (const [x, y, w] of [[-1200, 1100, 600], [200, 1300, 700], [1400, 1000, 520]]) slab(w, 40, 20, x, y, -3000, N ? '#2a3a52' : '#FFFFFF', { cast: false }); // paper cloud strips
    const shops = [[-1150, 420, 'WINE', K.B], [-300, 500, 'BANK', K.D], [550, 440, 'PAWN', K.C]];
    for (const [x, h, label, col] of shops) { const w = 560; slab(w, h + 220, 220, x, 0, -700, col); slab(w - 80, 190, 6, x, 40, -586, N ? '#F4D9A0' : '#fff', { cast: false, card: false }); slab(w + 40, 22, 120, x, 250, -640, K.F, { rz: 0.12 }); // shop front: lit window + awning
      slab(w + 10, 92, 24, x, h + 20, -590, K.F); c.sign(label, w - 120, 64, x, h + 30, -576, { back: K.F }); // short world label
      for (let q = 0; q < 3; q++) slab(14, 70, 6, x - 120 + q * 120, 120, -580, N ? '#10151d' : K.F, { cast: false }); for (let r = 0; r < 2; r++) for (let q = 0; q < 4; q++) slab(60, 60, 5, x - w / 2 + 60 + q * 130, h + 150, -586, hash(x + q * 3 + r) > 0.35 ? (N ? '#F4D9A0' : '#fff') : K.F, { cast: false }); }
    slab(110, 250, 30, -300, 0, -560, K.F); // door recess on the middle front
    cyl(9, 540, 920, 0, -200, K.F); slab(120, 36, 70, 880, 520, -200, '#F4D9A0', { cast: false, card: false }); slab(150, 10, 20, 860, 560, -200, K.F); // MID: lamp post (key light)
    cyl(11, 640, -760, 0, 330, K.F, { cast: true }); slab(150, 40, 70, -835, 640, 330, K.F); slab(22, 60, 22, -772, 600, 330, K.F); // NEAR: dark lamp post
    for (const x of [-420, 1000]) cyl(26, 70, x, 0, 380, K.F); // NEAR: bollards
    if (N) { const m = new T.Mesh(new T.CircleGeometry(110, 36), new T.MeshBasicMaterial({ color: '#E9E6CF' })); m.position.set(900, 1250, -3300); c.g.add(m); } else { const m = new T.Mesh(new T.CircleGeometry(150, 36), new T.MeshBasicMaterial({ color: '#FFD60A' })); m.position.set(900, 1250, -3300); c.g.add(m); }
    return { bg: N ? '#10162d' : K.A, update() {} }; } });
  const i2 = x => Math.floor(Math.abs(x) / 100) % 2;

  // ---- map: a folded paper map on a table, shot from above (TOP). The map has fold creases, a coast, dotted route, compass rose and a banknote legend; pop-up trees, houses and pins stand on it (near / mid / far in depth).
  S.define('map', { marks: { A: -300, B: 300 }, top: true, pool: false, build(c) { const { K, slab, floor, text, cyl, T, P } = c, N = night(c); floor(N ? '#2d3a4e' : K.F, 9000, 9000, 0, { kind: 'card' }); slab(1680, 36, 1180, 0, -34, 0, K.C);
    const mp = text(1560, 1060, 0.75, (g, w, h) => { g.fillStyle = '#E8DCB8'; g.fillRect(0, 0, w, h); if (P) P.grain(g, w, h, 12, 1.4, '#000', '#fff'); g.fillStyle = '#B9C99C'; g.beginPath(); g.moveTo(120, 80); g.lineTo(700, 60); g.lineTo(880, 380); g.lineTo(540, 920); g.lineTo(160, 790); g.closePath(); g.fill(); g.strokeStyle = '#8a7a50'; g.lineWidth = 4; g.stroke(); g.fillStyle = '#8fb1c9'; g.beginPath(); g.moveTo(0, 0); g.lineTo(120, 80); g.lineTo(160, 790); g.lineTo(0, 1060); g.fill(); // sea + land
      if (P) { for (let i = 0; i < 8; i++) { g.strokeStyle = 'rgba(80,110,130,.35)'; g.lineWidth = 1; g.beginPath(); g.moveTo(20, 90 + i * 110); g.quadraticCurveTo(70, 130 + i * 110, 110, 100 + i * 110); g.stroke(); } P.rosette(g, 1250, 780, 150, '#6b5a30', 9, { rings: 3, alpha: 0.5 }); g.fillStyle = '#E8DCB8'; g.beginPath(); g.arc(1250, 780, 56, 0, TAU); g.fill(); g.fillStyle = '#7a1f1a'; g.beginPath(); for (let i = 0; i < 8; i++) { const a = -Math.PI / 2 + (i * Math.PI) / 4, rr = i % 2 ? 22 : 54; g.lineTo(1250 + Math.cos(a) * rr, 780 + Math.sin(a) * rr); } g.fill(); P.band(g, 1020, 80, 440, 90, '#6b5a30', 2, { lines: 7, cycles: 6, alpha: 0.5 }); }
      g.strokeStyle = '#FF3B30'; g.setLineDash([14, 12]); g.lineWidth = 5; g.beginPath(); g.moveTo(300, 600); g.quadraticCurveTo(500, 300, 760, 340); g.stroke(); g.setLineDash([]);
      g.strokeStyle = 'rgba(0,0,0,.10)'; g.lineWidth = 2; for (const x of [w / 4, w / 2, (3 * w) / 4]) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, h); g.stroke(); g.strokeStyle = 'rgba(255,255,255,.28)'; g.beginPath(); g.moveTo(x + 2.5, 0); g.lineTo(x + 2.5, h); g.stroke(); g.strokeStyle = 'rgba(0,0,0,.10)'; } g.beginPath(); g.moveTo(0, h / 2); g.lineTo(w, h / 2); g.stroke(); // fold creases of a folded map
    }, 0, 2, 0); mp.rotation.x = -Math.PI / 2;
    const tree = (x, z, s, col) => { cyl(7 * s, 30 * s, x, 0, z, K.F); for (let i = 0; i < 3; i++) cyl((46 - i * 11) * s, 40 * s, x, (26 + i * 30) * s, z, col, { r2: 0, seg: 6 }); }; // pop-up pine
    const house = (x, z, s, col) => { slab(64 * s, 46 * s, 56 * s, x - 32 * s, 0, z, col); const rf = new T.Mesh(new T.CylinderGeometry(0, 52 * s, 34 * s, 4), c.mat(K.B)); rf.rotation.y = Math.PI / 4; rf.position.set(x, 63 * s, z + 28 * s); rf.castShadow = true; c.g.add(rf); rf.position.z = z; }; // pop-up house
    const pin = (x, z, col) => { cyl(3, 80, x, 0, z, '#2A3647'); const fl = new T.Mesh(new T.CylinderGeometry(0, 20, 28, 3), c.mat(col)); fl.rotation.z = Math.PI / 2; fl.position.set(x + 14, 66, z); fl.castShadow = true; c.g.add(fl); }; // pin flag
    tree(-540, -100, 1.5, '#4a7a4a'); tree(-470, 120, 1.1, '#3f6e45'); tree(180, -420, 1.3, '#4a7a4a'); tree(-200, 230, 1, '#3f6e45'); house(-120, -230, 1.5, K.G); house(260, -130, 1.2, K.D); house(-330, 160, 1.0, K.G);
    pin(-380, -260, '#FF3B30'); pin(230, 80, '#FF3B30'); pin(-60, -60, '#F2B705');
    slab(1700, 120, 18, 0, 0, -600, K.C); slab(1700, 120, 18, 0, 0, 600, K.C); // pop-up border flaps (folded card, near/far edges)
    return { bg: K.F, update() {} }; } });

  // ---- 3D versions of the hero props (everything else is a paper standee made from the 2D art in props.js)
  S.defineProp('table', (c, o) => { const g = new T.Group(), w = o.w || 360, col = o.color || '#9a6a3f', m = (b, p) => { const x = new T.Mesh(b, mat(col)); x.position.set(...p); x.castShadow = x.receiveShadow = true; g.add(x); }; m(new T.BoxGeometry(w, 20, 150), [0, 105, 0]); for (const x of [-w / 2 + 24, w / 2 - 24]) m(new T.BoxGeometry(20, 96, 120), [x, 48, 0]); return g; });
  S.defineProp('barrel', (c, o) => { const g = new T.Group(), col = o.color || '#9a6335', b = new T.Mesh(new T.CylinderGeometry(62, 62, 168, 24), mat(col)); b.position.y = 84; b.castShadow = b.receiveShadow = true; g.add(b); for (const y of [40, 130]) { const r = new T.Mesh(new T.CylinderGeometry(65, 65, 12, 24), mat('#3d3a3a')); r.position.y = y; g.add(r); } return g; });
  S.defineProp('crate', (c, o) => { const g = new T.Group(), b = new T.Mesh(new T.BoxGeometry(130, 110, 120), mat(o.color || '#c79559')); b.position.y = 55; b.castShadow = b.receiveShadow = true; g.add(b); return g; });
  S.defineProp('podium', (c, o) => { const g = new T.Group(), b = new T.Mesh(new T.BoxGeometry(150, 190, 110), mat(o.color || '#6c4a33')), t2 = new T.Mesh(new T.BoxGeometry(190, 18, 140), mat('#8a6446')); b.position.y = 95; t2.position.y = 199; b.castShadow = t2.castShadow = true; g.add(b, t2); return g; });

  // ---- hero props with real 3D models (orbit-safe)
  S.defineProp('bottle', (c, o) => { const g = new T.Group(), s = o.size || 1, col = o.color || '#2f6a3b', pts = [[0, 0], [19, 0], [19, 92], [16, 102], [9, 114], [8, 146], [10, 150], [0, 150]].map(([r, y]) => new T.Vector2(r * s, y * s));
    const body = new T.Mesh(new T.LatheGeometry(pts, 28), new T.MeshLambertMaterial({ color: col })); g.add(body);
    const label = new T.Mesh(new T.CylinderGeometry(19.6 * s, 19.6 * s, 40 * s, 28, 1, true), new T.MeshLambertMaterial({ color: o.label || '#F4ECD6', side: T.DoubleSide })); label.position.y = 58 * s; g.add(label);
    const band = new T.Mesh(new T.CylinderGeometry(19.8 * s, 19.8 * s, 5 * s, 28, 1, true), new T.MeshLambertMaterial({ color: o.ink2 || '#A43B2F', side: T.DoubleSide })); band.position.y = 52 * s; g.add(band);
    const cork = new T.Mesh(new T.CylinderGeometry(8 * s, 8 * s, 9 * s, 14), new T.MeshLambertMaterial({ color: o.cork || '#C9A15A' })); cork.position.y = 152 * s; g.add(cork); return g; });
  S.defineProp('jug', (c, o) => { const g = new T.Group(), col = o.color || '#B88A4A', pts = [[0, 0], [38, 0], [46, 40], [46, 90], [26, 120], [16, 132], [18, 150], [0, 150]].map(([r, y]) => new T.Vector2(r, y)); g.add(new T.Mesh(new T.LatheGeometry(pts, 24), new T.MeshLambertMaterial({ color: col }))); const h = new T.Mesh(new T.TorusGeometry(22, 5, 8, 16, Math.PI), new T.MeshLambertMaterial({ color: col })); h.position.set(48, 85, 0); h.rotation.z = -Math.PI / 2; g.add(h); return g; });
  S.defineProp('bars', (c, o) => { const g = new T.Group(), n = o.n || 7, pitch = o.pitch || 40, h = o.h || 380, m = new T.MeshLambertMaterial({ color: o.color || '#2A3647' }); for (let i = 0; i < n; i++) { const b = new T.Mesh(new T.CylinderGeometry(7, 7, h, 10), m); b.position.set((i - (n - 1) / 2) * pitch, h / 2, 0); g.add(b); } for (const y of [10, h - 10]) { const r = new T.Mesh(new T.BoxGeometry(pitch * n, 16, 22), m); r.position.y = y; g.add(r); } return g; });
  S.defineProp('coinstack', (c, o) => { const g = new T.Group(), n = o.n || 24, cols = o.cols || 1, m = [new T.MeshLambertMaterial({ color: '#F2B705' }), new T.MeshLambertMaterial({ color: '#E8A800' })]; for (let k = 0; k < cols; k++) for (let i = 0; i < n; i++) { const ci = new T.Mesh(new T.CylinderGeometry(34, 34, 8, 24), m[i % 2]); ci.position.set((k - (cols - 1) / 2) * 84 + (hash(i * 3.1 + k) - 0.5) * 3, 4 + i * 8.4, (hash(i + k * 5) - 0.5) * 3); g.add(ci); } return g; });
  S.defineProp('yearrack', (c, o) => { const g = new T.Group(), cols = o.cols || 19, rows = o.rows || 2, w = cols * 52 + 20, h = rows * 58 + 20, wood = new T.Mesh(new T.BoxGeometry(w, h, 60), new T.MeshLambertMaterial({ color: '#8c5a35' })); wood.position.y = h / 2; g.add(wood); let k = 0; for (let r = 0; r < rows; r++) for (let i = 0; i < cols; i++, k++) { const d = new T.Mesh(new T.CylinderGeometry(20, 20, 8, 16), new T.MeshLambertMaterial({ color: k === (o.hl ?? -1) ? '#FF3B30' : (k % 3 ? '#2e1f2c' : '#7d2b3a') })); d.rotation.x = Math.PI / 2; d.position.set(-w / 2 + 36 + i * 52, 40 + r * 58, 32); g.add(d); } return g; });
  S.defineProp('torch', (c, o) => { const g = new T.Group(), h = new T.Mesh(new T.CylinderGeometry(7, 9, 70, 12), new T.MeshLambertMaterial({ color: '#2A3647' })); h.position.y = 35; g.add(h); const head = new T.Mesh(new T.CylinderGeometry(16, 10, 30, 14), new T.MeshLambertMaterial({ color: '#59606B' })); head.position.y = 84; g.add(head);
    const beam = new T.Mesh(new T.CylinderGeometry(14, o.spread || 130, o.len || 620, 24, 1, true), new T.MeshBasicMaterial({ color: c.theme === 'night' ? '#F4D9A0' : '#FFF4DC', transparent: true, opacity: 0.2, depthWrite: false, side: T.DoubleSide })); beam.userData.noCast = true; const pivot = new T.Group(); pivot.position.y = 90; beam.position.y = (o.len || 620) / 2; pivot.add(beam); g.add(pivot); pivot.rotation.z = -(o.tilt ?? 1.2);
    g.userData.update = t => { pivot.rotation.y = o.sweep ? Math.sin(t * (o.sweepSpeed || 1.2)) * o.sweep : 0; }; g.rotation.y = 0; return g; });
})();
