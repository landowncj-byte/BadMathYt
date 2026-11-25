// Bad Math engine v2 — 3D PAPER SETS (three.js). Pop-up dioramas built from folded card: slabs with thickness, one lamp, hard cast shadows.
// Needs window.THREE (vendor/three.cjs). World units are the same pixels as the 2D rig: x right, y UP, z toward the camera; characters stand on y = 0, lane l -> z = l * 64.
//   BM2.Sets3D.define('kitchen', { marks:{A:-260, B:260, door:-900}, build(ctx) { ... return { update(t) } } })
//   ctx = { T (THREE), g (THREE.Group to add to), K (theme colours), theme ('night'|'day'), slab(), disc(), plane(), text(canvasPainter) , light (key DirectionalLight, set position/colour/intensity here) }
// Themes follow SHOW-BIBLE §1.4: night (Decoded: Ink, Midnight, Oxblood, Manila, Smoke, Slate; hard long lamp shadows) and day (What If: Cream, Sky, Tangerine, Grape, Mint, Plum; short soft shadows).
(function () {
  const B = window.BM2; if (!window.THREE) return; const T = window.THREE, TAU = Math.PI * 2, hash = B.hash, S = (B.Sets3D = { sets: {}, props: {} });
  S.define = (name, def) => (S.sets[name] = def); S.defineProp = (kind, fn) => (S.props[kind] = fn);
  // colour roles: bg = void colour, A = backdrop, B = wall paper, C = accent wall, D = furniture, E = floor, F = darkest, G = highlight paper, lamp, accent (series accent: used sparingly)
  S.themes = {
    night: { bg: '#0B0F14', A: '#34465e', B: '#5E1F1B', C: '#C9A66B', D: '#6b7482', E: '#3a4a60', F: '#10151d', G: '#F5F3EE', lamp: '#F4D9A0', accent: '#FF3B30', amb: 1.0, key: 2.3, elev: 0.6, soft: 1 },
    day: { bg: '#FFF4DC', A: '#7FCDEB', B: '#F58A2E', C: '#9BE3C0', D: '#5A3FA0', E: '#FFF4DC', F: '#3D2A73', G: '#F5F3EE', lamp: '#FFF4DC', accent: '#FFD60A', amb: 1.15, key: 1.7, elev: 1.0, soft: 3 },
  };
  const matCache = {}; const mat = (c, o = {}) => { const k = c + JSON.stringify(o); return matCache[k] || (matCache[k] = new T.MeshLambertMaterial(Object.assign({ color: c }, o))); };
  function ctxFor(group, theme, palette) {
    const K = Object.assign({}, S.themes[theme] || S.themes.night, palette || {});
    const slab = (w, h, d, x, y, z, col, o = {}) => { const m = new T.Mesh(new T.BoxGeometry(w, h, d), o.mat || mat(col)); m.position.set(x, y + h / 2, z); m.castShadow = o.cast !== false; m.receiveShadow = o.recv !== false; if (o.ry) m.rotation.y = o.ry; group.add(m); return m; };
    const cyl = (r, h, x, y, z, col, o = {}) => { const m = new T.Mesh(new T.CylinderGeometry(o.r2 == null ? r : o.r2, r, h, o.seg || 28), mat(col)); m.position.set(x, y + h / 2, z); m.castShadow = o.cast !== false; m.receiveShadow = true; group.add(m); return m; };
    const disc = (r, x, y, z, col, o = {}) => { const m = new T.Mesh(new T.CircleGeometry(r, 48), mat(col)); m.rotation.x = -Math.PI / 2; m.position.set(x, y, z); m.receiveShadow = true; group.add(m); return m; };
    const floor = (col, w = 7000, d = 5000, z = 0) => { const m = new T.Mesh(new T.PlaneGeometry(w, d), mat(col)); m.rotation.x = -Math.PI / 2; m.position.set(0, 0, z); m.receiveShadow = true; group.add(m); return m; };
    const text = (w, h, px, paint, x, y, z, o = {}) => { const cv = document.createElement('canvas'); cv.width = Math.round(w * px); cv.height = Math.round(h * px); const g = cv.getContext('2d'); g.scale(px, px); paint(g, w, h); const tex = new T.CanvasTexture(cv); tex.colorSpace = T.SRGBColorSpace; tex.anisotropy = 4; const m = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({ map: tex })); m.position.set(x, y, z); if (o.ry) m.rotation.y = o.ry; group.add(m); m.userData = { tex, cv, g, px, w, h }; return m; };
    const token = (x, y, z, col, s = 1, o = {}) => { const gp = new T.Group(); const body = new T.Mesh(new T.CylinderGeometry(22 * s, 34 * s, 80 * s, 14), mat(col)), head = new T.Mesh(new T.SphereGeometry(26 * s, 14, 10), mat(o.head || B.shade ? '#F5F3EE' : '#F5F3EE')); body.position.y = 40 * s; head.position.y = 104 * s; body.castShadow = head.castShadow = true; gp.add(body, head); gp.position.set(x, y, z); group.add(gp); return gp; };
    return { T, g: group, K, theme, slab, cyl, disc, floor, text, token, mat };
  }
  S.ctxFor = ctxFor;
  const R = (a, b, n) => { const o = []; for (let i = 0; i < n; i++) o.push(a + ((b - a) * i) / Math.max(1, n - 1)); return o; };

  // ---- void: a lit disc on nothing (comparison gags, host asides, CTAs)
  S.define('void', { marks: { A: -220, B: 220, centre: 0 }, build(c) { const { K } = c; c.floor(K.bg, 9000, 9000); c.disc(820, 0, 0.5, 0, K.E); c.disc(560, 0, 1, 0, c.theme === 'night' ? '#3a4658' : '#FFFFFF'); return { bg: K.bg, update() {} }; } });

  // ---- desk: Decoded home base. Blinds gobo wall, case desk with lamp, case board with pins and red string, filing cabinets
  S.define('desk', { marks: { A: -230, B: 230, desk: 150 }, build(c) { const { K, slab, floor, cyl, text } = c; floor(K.E);
    slab(4200, 1100, 30, 0, 0, -560, K.A); // back wall
    for (let i = 0; i < 12; i++) slab(520, 14, 40, -700, 280 + i * 40, -470, K.D, { cast: true }); // venetian blind slats: the gobo (stripes on the wall)
    slab(540, 480, 6, -700, 240, -520, c.theme === 'night' ? '#E9D9A6' : '#BDE7F7', { cast: false }); // lit window paper behind the slats
    slab(440, 320, 14, 760, 300, -530, K.C); text(380, 270, 1.5, (g, w, h) => { g.fillStyle = '#E6D3A6'; g.fillRect(0, 0, w, h); g.strokeStyle = 'rgba(0,0,0,.2)'; g.strokeRect(2, 2, w - 4, h - 4); g.fillStyle = '#fff'; for (const [x, y, ww, hh] of [[30, 30, 90, 110], [160, 50, 80, 100], [270, 30, 80, 120]]) { g.fillRect(x, y, ww, hh); } g.strokeStyle = '#FF3B30'; g.lineWidth = 3; g.beginPath(); g.moveTo(75, 60); g.lineTo(200, 100); g.lineTo(310, 70); g.stroke(); g.fillStyle = '#FF3B30'; for (const [x, y] of [[75, 60], [200, 100], [310, 70]]) { g.beginPath(); g.arc(x, y, 6, 0, TAU); g.fill(); } }, 760, 460, -520);
    for (const x of [-1100, -960, -820]) slab(130, 300 + (x % 3) * 20, 90, x, 0, -480, K.D);
    slab(560, 30, 190, 300, 150, -250, K.C); for (const x of [40, 560]) slab(30, 150, 160, x, 0, -250, K.D); // desk
    cyl(8, 120, 470, 180, -250, K.F); cyl(50, 40, 470, 290, -250, K.lamp, { r2: 22 }); return { bg: K.bg, update(t) {} }; } });

  // ---- auction: panelled wall + tote board, podium, lot pedestal, bidder flanks
  S.define('auction', { marks: { A: -300, B: 300, podium: -100 }, build(c) { const { K, slab, floor, token, text, cyl } = c; floor(K.E);
    slab(4200, 1000, 30, 0, 0, -520, K.B); for (const x of R(-1700, 1700, 15)) slab(60, 780, 10, x, 80, -498, K.C, { cast: false });
    const board = text(900, 300, 1, (g, w, h) => { g.fillStyle = '#0B0F14'; g.fillRect(0, 0, w, h); g.fillStyle = '#F5F3EE'; g.font = '84px Anton, Impact, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('COLLECTORS PAID MILLIONS', w / 2, h / 2); }, 0, 640, -490); slab(940, 340, 30, 0, 470, -508, K.F, { cast: false });
    slab(150, 190, 110, -100, 0, -250, K.D); slab(190, 20, 140, -100, 190, -250, K.C); // podium
    cyl(60, 150, 320, 0, -210, K.G); // lot pedestal
    for (const [x0, dir] of [[-760, 1], [760, -1]]) for (let r = 0; r < 3; r++) for (let i = 0; i < 4; i++) token(x0 + dir * i * 140, 0, 80 + r * 130, i % 2 ? K.D : K.E, 1.2);
    return { bg: K.bg, update(t) { } }; } });

  // ---- kitchen: tiled wall, window, cabinets, counter + sink, fridge, island
  S.define('kitchen', { marks: { A: -250, B: 250, door: -900, counter: -150 }, build(c) { const { K, slab, floor, cyl } = c; floor(K.E);
    slab(4200, 1000, 30, 0, 0, -540, c.theme === 'night' ? K.A : K.G); for (const y of R(0, 600, 8)) slab(4200, 3, 6, 0, y, -520, K.F, { cast: false });
    slab(520, 360, 10, 150, 300, -520, c.theme === 'night' ? '#E9D9A6' : '#BDE7F7', { cast: false }); slab(560, 18, 30, 150, 280, -510, K.C); slab(560, 18, 30, 150, 650, -510, K.C);
    for (const x of R(-900, 900, 6)) if (Math.abs(x - 150) > 330) slab(150, 160, 90, x, 560, -480, K.B);
    slab(1250, 95, 150, -300, 0, -430, K.D); slab(1250, 14, 160, -300, 95, -430, K.C); slab(150, 340, 130, -1100, 0, -430, K.G); // counter + fridge
    slab(150, 22, 90, -300, 100, -430, K.F); cyl(8, 60, -300, 100, -470, K.F); // sink + tap
    slab(420, 20, 170, 330, 92, -80, K.C); for (const x of [150, 510]) slab(24, 92, 150, x, 0, -80, K.D); // island / table
    return { bg: K.bg, update() {} }; } });

  // ---- court: bench, seal, witness stand, jury box, defence table, public rail
  S.define('court', { marks: { A: -300, B: 300, bench: 0, stand: 520 }, build(c) { const { K, slab, floor, token, cyl } = c; floor(K.E);
    slab(4200, 1000, 30, 0, 0, -560, K.A); cyl(150, 8, 0, 500, -540, K.C, { seg: 40 }).rotation.x = Math.PI / 2; // seal (plain round shape)
    slab(640, 190, 140, 0, 0, -400, K.F); slab(700, 26, 170, 0, 190, -400, K.C); slab(150, 120, 130, 560, 0, -280, K.D); // bench + stand
    for (let r = 0; r < 2; r++) for (let i = 0; i < 4; i++) { token(-880 + i * 130, 40 + r * 40, -300 + r * 90, K.D, 1.1); } slab(560, 50, 100, -740, 0, -210, K.F); slab(560, 50, 100, -740, 40, -300, K.F);
    slab(520, 24, 150, -230, 100, 60, K.C); for (const x of [-460, 0]) slab(22, 100, 120, x, 0, 60, K.D); slab(2400, 90, 20, 0, 0, 420, K.F); return { bg: K.bg, update() {} }; } });

  // ---- street: night skyline, house front with door, pavement, kerb, street lamp (the key light)
  S.define('street', { marks: { A: -300, B: 300, door: -250 }, build(c) { const { K, slab, floor, cyl, T } = c; floor(c.theme === 'night' ? '#161d29' : K.E, 8000, 6000, 600); slab(7000, 24, 700, 0, 0, 120, K.D); // pavement
    slab(7000, 30, 40, 0, 0, 480, K.C); // kerb
    for (const x of R(-2600, 2600, 14)) { const h = 500 + 700 * hash(x * 0.013); slab(260, h, 200, x, 0, -1500, c.theme === 'night' ? K.A : K.C); }
    for (const x of R(-1800, 1800, 6)) { const h = 380 + 120 * hash(x * 0.021); slab(420, h, 260, x, 0, -700, i2(x) ? K.B : K.D); for (let r = 0; r < 4; r++) for (let q = 0; q < 2; q++) { const m = new T.Mesh(new T.PlaneGeometry(70, 80), new T.MeshBasicMaterial({ color: hash(x + r * 3 + q * 7) > 0.35 ? (c.theme === 'night' ? '#F4D9A0' : '#FFFFFF') : K.F })); m.position.set(x - 100 + q * 200, 120 + r * 85, -569); c.g.add(m); } }
    slab(300, 340, 40, -300, 0, -520, K.D); slab(90, 220, 12, -300, 0, -495, K.F); // house front + door
    cyl(9, 520, 520, 0, -200, K.F); slab(110, 36, 60, 520, 520, -200, '#F4D9A0', { cast: false });
    if (c.theme === 'night') { const m = new T.Mesh(new T.SphereGeometry(90, 24, 16), new T.MeshBasicMaterial({ color: '#E9E6CF' })); m.position.set(900, 1100, -2200); c.g.add(m); }
    return { bg: c.theme === 'night' ? '#10162d' : K.A, update() {} }; } });
  const i2 = x => Math.floor(Math.abs(x) / 100) % 2;

  // ---- map: a paper map on a table, shot from above (TOP). Pins and tokens stand on it.
  S.define('map', { marks: { A: -300, B: 300 }, top: true, build(c) { const { K, slab, floor, text } = c; floor(K.F, 9000, 9000); slab(1600, 40, 1100, 0, -40, 0, K.C);
    text(1500, 1000, 0.6, (g, w, h) => { g.fillStyle = '#E8DCB8'; g.fillRect(0, 0, w, h); g.fillStyle = '#B9C99C'; g.beginPath(); g.moveTo(120, 80); g.lineTo(700, 60); g.lineTo(860, 380); g.lineTo(520, 900); g.lineTo(160, 760); g.closePath(); g.fill(); g.strokeStyle = '#8a7a50'; g.lineWidth = 4; g.stroke(); g.strokeStyle = '#FF3B30'; g.setLineDash([14, 12]); g.lineWidth = 5; g.beginPath(); g.moveTo(300, 600); g.quadraticCurveTo(500, 300, 760, 340); g.stroke(); }, 0, 2, 0).rotation.x = -Math.PI / 2; return { bg: K.F, update() {} }; } });

  // ---- 3D versions of the hero props (everything else is a paper standee made from the 2D art in props.js)
  S.defineProp('table', (c, o) => { const g = new T.Group(), w = o.w || 360, col = o.color || '#9a6a3f', m = (b, p) => { const x = new T.Mesh(b, mat(col)); x.position.set(...p); x.castShadow = x.receiveShadow = true; g.add(x); }; m(new T.BoxGeometry(w, 20, 150), [0, 105, 0]); for (const x of [-w / 2 + 24, w / 2 - 24]) m(new T.BoxGeometry(20, 96, 120), [x, 48, 0]); return g; });
  S.defineProp('barrel', (c, o) => { const g = new T.Group(), col = o.color || '#9a6335', b = new T.Mesh(new T.CylinderGeometry(62, 62, 168, 24), mat(col)); b.position.y = 84; b.castShadow = b.receiveShadow = true; g.add(b); for (const y of [40, 130]) { const r = new T.Mesh(new T.CylinderGeometry(65, 65, 12, 24), mat('#3d3a3a')); r.position.y = y; g.add(r); } return g; });
  S.defineProp('crate', (c, o) => { const g = new T.Group(), b = new T.Mesh(new T.BoxGeometry(130, 110, 120), mat(o.color || '#c79559')); b.position.y = 55; b.castShadow = b.receiveShadow = true; g.add(b); return g; });
  S.defineProp('podium', (c, o) => { const g = new T.Group(), b = new T.Mesh(new T.BoxGeometry(150, 190, 110), mat(o.color || '#6c4a33')), t2 = new T.Mesh(new T.BoxGeometry(190, 18, 140), mat('#8a6446')); b.position.y = 95; t2.position.y = 199; b.castShadow = t2.castShadow = true; g.add(b, t2); return g; });
})();
