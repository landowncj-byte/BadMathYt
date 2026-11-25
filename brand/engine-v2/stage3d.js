// Bad Math engine v2 — 3D STAGE: "2D paper characters in a real 3D paper set" (three.js, deterministic, seek(t)-pure).
//   * Sets/props are 3D meshes (sets3d.js). Characters are camera-facing paper cards textured from the 2D puppet rig every frame (on twos for the body, per frame for face snaps).
//   * One DirectionalLight (the lamp) casts hard shadows; cards cast a floor shadow through an invisible proxy card that faces the light.
//   * The camera is a real perspective camera; story.js converts its 2D shot framing {x, y, zoom, roll, sx, sy} + {az, el, tz} into a 3D camera.
// stage.render(sc, t, s, vp) returns a canvas (the WebGL canvas); story.js drops it into the 2D frame so captions / labels / impact frames / transitions work unchanged.
(function () {
  const B = window.BM2, C = B.Cast; if (!window.THREE) { B.Stage3D = null; return; } const T = window.THREE, TAU = Math.PI * 2, { clamp, hash } = B;
  const VFOV = 44; // vertical field of view (deg). Wider = more parallax / perspective
  const PLANE_W = 600, PLANE_H = 640, FEET = 0.93; // character card size (native px at scale 1) and where the feet sit in it
  B.Stage3D = {
    create(W, H) {
      const cv = document.createElement('canvas'); cv.width = Math.round(W * (B.Stage3D.scale || 0.8)); cv.height = Math.round(H * (B.Stage3D.scale || 0.8));
      const r = new T.WebGLRenderer({ canvas: cv, antialias: B.Stage3D.aa !== false, alpha: false, preserveDrawingBuffer: true, powerPreference: 'high-performance' });
      const K = B.Stage3D.scale || 0.8; r.setPixelRatio(1); r.setSize(Math.round(W * K), Math.round(H * K), false); r.shadowMap.enabled = true; r.shadowMap.type = T.PCFShadowMap; r.setScissorTest(true);
      const camera = new T.PerspectiveCamera(VFOV, W / H, 5, 14000), st = { prof: { chars: 0, gl: 0, copy: 0, props: 0 }, canvas: cv, renderer: r, camera, W, H, k: K };
      const mkTex = c => { const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.anisotropy = 4; t.generateMipmaps = false; t.minFilter = T.LinearFilter; t.magFilter = T.LinearFilter; return t; };
      // ------------------------------------------------------------ build one story scene's THREE.Scene
      st.build = function (sc, theme, setKind, palette) {
        const def = B.Sets3D.sets[setKind]; if (!def) throw new Error(`scene ${sc.id}: no 3D set "${setKind}". 3D sets: ${Object.keys(B.Sets3D.sets).join(', ')}`);
        const scene = new T.Scene(), group = new T.Group(); scene.add(group); const ctx = B.Sets3D.ctxFor(group, theme, palette), K = ctx.K;
        const built = def.build(ctx) || {}; scene.background = new T.Color(built.bg || K.bg);
        const key = new T.DirectionalLight(K.lamp, K.key), el = K.elev, dirL = sc.src.lamp || [-0.75, el, 0.55]; // direction FROM the origin TO the lamp
        const dn = new T.Vector3(...dirL).normalize(); key.position.copy(dn.clone().multiplyScalar(2400)); key.target.position.set(0, 0, 0); key.castShadow = true; key.shadow.mapSize.set(B.Stage3D.shadowSize || 1024, B.Stage3D.shadowSize || 1024); const sh = key.shadow.camera; sh.left = -1500; sh.right = 1500; sh.top = 1500; sh.bottom = -1500; sh.near = 100; sh.far = 6000; key.shadow.bias = -0.0008; key.shadow.radius = K.soft; key.shadow.normalBias = 1; scene.add(key, key.target);
        scene.add(new T.HemisphereLight('#ffffff', theme === 'day' ? '#cfc4ff' : '#34415a', K.amb));
        const o = { scene, group, key, dn, built, K, def, chars: {}, props: [], theme };
        for (const ch of Object.values(sc.chars)) o.chars[ch.id] = makeChar(o, ch);
        for (const p of sc.props) o.props.push(makeProp(o, p));
        return (sc.o3 = o);
      };
      function makeChar(o, ch) {
        const geo = new T.PlaneGeometry(PLANE_W, PLANE_H), cardMat = new T.MeshBasicMaterial({ transparent: false, alphaTest: 0.35, side: T.DoubleSide, color: '#ffffff' }); cardMat.alphaToCoverage = true;
        const card = new T.Mesh(geo, cardMat), proxy = new T.Mesh(geo, new T.MeshBasicMaterial({ colorWrite: false, depthWrite: false, side: T.DoubleSide })); proxy.castShadow = true;
        proxy.customDepthMaterial = new T.MeshDepthMaterial({ depthPacking: T.RGBADepthPacking, alphaTest: 0.35 }); proxy.frustumCulled = false; card.frustumCulled = false; o.group.add(card, proxy);
        return { ch, card, proxy, cache: null };
      }
      function drawShadowTex(e, ch, P, ctx, tPose, tFace) { // low-res full-figure silhouette for the floor shadow (independent of the camera crop)
        if (!e.shadowTex) { const c = document.createElement('canvas'); c.width = 300; c.height = 320; e.shadowCv = c; e.shadowG = c.getContext('2d'); e.shadowTex = mkTex(c); e.proxy.customDepthMaterial.map = e.shadowTex; e.proxy.customDepthMaterial.needsUpdate = true; }
        const g = e.shadowG; g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, 300, 320); g.setTransform(0.5, 0, 0, 0.5, 0, 0); const P2 = Object.assign({}, P, { x: PLANE_W / 2, y: PLANE_H * FEET, sc: 1 }); C.draw(g, ch, P2, tPose); e.shadowTex.needsUpdate = true; e.shadowKey = tPose + '|' + Math.floor(tFace * 30 + 0.5);
      }
      function makeProp(o, p) {
        const mk3 = B.Sets3D.props[p.kind], item = { p, obj: null, proxy: null }; let obj;
        if (mk3) { obj = mk3({ T }, p); obj.traverse(m => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } }); }
        else { // paper standee from the 2D art
          const [w, h] = B.Props.size(p.kind), pad = 24, dens = 2, cw = Math.ceil((w + pad * 2) * dens), chh = Math.ceil((h + pad * 2) * dens), c = document.createElement('canvas'); c.width = cw; c.height = chh; const g = c.getContext('2d'); g.setTransform(dens, 0, 0, dens, 0, 0); g.translate(w / 2 + pad, h + pad); B.Props.draw(g, p.kind, p, 0);
          const tex = mkTex(c), geo = new T.PlaneGeometry(w + pad * 2, h + pad * 2), m = new T.Mesh(geo, new T.MeshBasicMaterial({ map: tex, transparent: false, alphaTest: 0.4, side: T.DoubleSide })); m.material.alphaToCoverage = true; m.position.y = (h + pad * 2) / 2 - pad; const prox = new T.Mesh(geo, new T.MeshBasicMaterial({ colorWrite: false, depthWrite: false, side: T.DoubleSide })); prox.position.copy(m.position); prox.castShadow = true; prox.customDepthMaterial = new T.MeshDepthMaterial({ depthPacking: T.RGBADepthPacking, map: tex, alphaTest: 0.4 }); obj = new T.Group(); obj.add(m); item.proxy = prox; obj.add(prox); item.standee = true;
        }
        o.group.add(obj); item.obj = obj; return item;
      }
      // ------------------------------------------------------------ per-frame update + render
      st.render = function (sc, t, s, vp, opt = {}) {
        const o = sc.o3, ctx = sc.ctx, tPose = Math.floor(t * 15 + 1e-6) / 15, tFace = Math.floor(t * 30 + 1e-6) / 30;
        // ---- camera from the 2D-style state
        const aspect = vp.w / vp.h, vf = (s.fov || VFOV) * Math.PI / 180, viewW = vp.w / s.z, D = viewW / (2 * Math.tan(vf / 2) * aspect), az = (s.az || 0) * Math.PI / 180, el = (s.el == null ? 2 : s.el) * Math.PI / 180;
        const tgt = new T.Vector3(s.x, -s.y, s.tz || 0), cp = new T.Vector3(tgt.x + D * Math.sin(az) * Math.cos(el), tgt.y + D * Math.sin(el), tgt.z + D * Math.cos(az) * Math.cos(el));
        camera.fov = s.fov || VFOV; camera.aspect = aspect; camera.position.copy(cp); camera.up.set(Math.sin(-s.r), Math.cos(s.r), 0); camera.lookAt(tgt); camera.setViewOffset(vp.w, vp.h, vp.w / 2 - (s.sx - vp.x), vp.h / 2 - (s.sy - vp.y), vp.w, vp.h); camera.updateProjectionMatrix(); camera.updateMatrixWorld(true);
        // ---- set ambient motion + lamp (flicker on 10 fps steps in Night)
        o.built.update && o.built.update(t, o); o.key.intensity = o.K.key * (o.theme === 'night' ? 1 - 0.05 * hash(Math.floor(t * 10) * 3.7) : 1);
        // ---- characters: pose on twos, face on frames -> card texture. The texture only covers the part of the card that is on screen (crop), at the density the screen needs.
        const tP0 = performance.now();
        for (const id in o.chars) {
          const e = o.chars[id], ch = e.ch, vis = t >= ch.inT && t <= ch.outT; e.card.visible = e.proxy.visible = vis; if (!vis) continue;
          const P = C.pose(ch, tPose, Object.assign({}, ctx, { tFace })), pos = C.moveAt(ch, tPose), z = pos.lane * C.LANE, sc2 = ch.scale, cyC = PLANE_H * (FEET - 0.5) * sc2, ctr = new T.Vector3(pos.x, cyC, z), dist = cp.distanceTo(ctr);
          // crop: which part of the card (card units, y up from the ground-plane bottom) is inside the viewport?
          const ppuS = (vp.h / (2 * Math.tan(vf / 2) * dist)), sp = ctr.clone().project(camera), csx = vp.x + ((sp.x + 1) / 2) * vp.w, csy = vp.y + ((1 - sp.y) / 2) * vp.h, m = 40;
          let u0 = (vp.x - m - csx) / ppuS / sc2, u1 = (vp.x + vp.w + m - csx) / ppuS / sc2, v0 = -(vp.y + vp.h + m - csy) / ppuS / sc2, v1 = -(vp.y - m - csy) / ppuS / sc2;
          u0 = Math.max(u0, -PLANE_W / 2); u1 = Math.min(u1, PLANE_W / 2); v0 = Math.max(v0, -PLANE_H / 2); v1 = Math.min(v1, PLANE_H / 2); if (u1 <= u0 || v1 <= v0) { e.card.visible = e.proxy.visible = e.lastVis = false; if (!e.keepProxy) { /* off-screen: still cast a shadow */ e.proxy.visible = true; } }
          const cw = u1 - u0, chh = v1 - v0, ppu = ppuS * sc2, dens = Math.min(4, Math.max(1, ppu * 1.1 * st.k)), qd = Math.ceil(dens * 4) / 4, tw = Math.max(8, Math.min(1400, Math.ceil(cw * qd))), th = Math.max(8, Math.min(1500, Math.ceil(chh * qd)));
          const key = tPose + '|' + Math.floor(tFace * 30 + 0.5) + '|' + [u0, u1, v0, v1].map(v => Math.round(v)).join(',') + '|' + qd; if (!e.cache || e.cache.w !== tw || e.cache.h !== th) { if (e.cache) e.cache.tex.dispose(); const c = document.createElement('canvas'); c.width = tw; c.height = th; e.cache = { w: tw, h: th, c, g: c.getContext('2d'), tex: mkTex(c), key: null, dens: qd }; e.card.material.map = e.cache.tex; e.card.material.needsUpdate = true; }
          if (e.cache.key !== key) { const g = e.cache.g, kx = tw / cw, ky = th / chh; g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, tw, th); g.setTransform(kx, 0, 0, ky, -(u0 + PLANE_W / 2) * kx, -(PLANE_H - (v1 + PLANE_H / 2)) * ky); P.sc = 1; P.x = PLANE_W / 2; P.y = PLANE_H * FEET; C.draw(g, ch, P, tPose); e.cache.tex.needsUpdate = true; e.cache.key = key; e.cache.crop = [u0, u1, v0, v1]; }
          const cuC = (u0 + u1) / 2, cvC = (v0 + v1) / 2; e.card.scale.set(cw * sc2, chh * sc2, 1); e.card.position.set(pos.x, cyC + cvC * sc2, z); e.card.rotation.set(0, Math.atan2(cp.x - pos.x, cp.z - z), 0); e.card.translateX(cuC * sc2);
          // the shadow proxy always uses the FULL silhouette card; it reuses the on-screen crop only when the whole card is visible (otherwise a low-res full proxy texture)
          e.proxy.scale.set(PLANE_W * sc2, PLANE_H * sc2, 1); e.proxy.position.set(pos.x, cyC, z); e.proxy.rotation.set(0, Math.atan2(o.dn.x, o.dn.z), 0); e.lastP = { x: pos.x, z, head: C.headWorld(ch, Object.assign({}, P, { x: pos.x, y: 0, sc: sc2 })) };
          if (!e.shadowTex || e.shadowKey !== tPose + '|' + Math.floor(tFace * 30 + 0.5)) { drawShadowTex(e, ch, P, ctx, tPose, tFace); }
        }
        st.prof.chars += performance.now() - tP0;
        // ---- props (moves, jolts, hops, time windows)
        for (const it of o.props) { const p = it.p, pp = sc.propPos(p, t); let hop = 0; for (const j of p.jolts) { const d = t - j; if (d >= 0 && d < 0.6) hop = Math.exp(-9 * d) * Math.sin(d * 50) * -(p.joltAmp || 9); }
          const vis = t >= p.inT && t <= p.outT + 0.25 && !(p.hidden && p.hidden.some(([a, b]) => t >= a && t <= b)); it.obj.visible = vis; if (!vis) continue; const pop = p.inT > -1e8 ? 0.6 + 0.4 * B.spring(t - p.inT, 'snappy') : 1;
          it.obj.position.set(pp.x, (pp.arc || 0) + hop + (p.anim === 'bob' ? Math.sin(t * 2.2 + p.seed) * 4 : 0), pp.lane * C.LANE); it.obj.scale.setScalar(p.scale * pop); it.obj.rotation.y = (p.yaw || 0) * Math.PI / 180; it.obj.rotation.z = p.rot + (p.anim === 'sway' ? Math.sin(t * 1.4 + p.seed) * 0.03 : 0); }
        // ---- render into the viewport rect
        const tG0 = performance.now(); const kk = st.k; r.setViewport(vp.x * kk, (H - vp.y - vp.h) * kk, vp.w * kk, vp.h * kk); r.setScissor(vp.x * kk, (H - vp.y - vp.h) * kk, vp.w * kk, vp.h * kk); r.render(o.scene, camera); st.prof.gl += performance.now() - tG0; st.last = { camera, vp, o };
        return cv;
      };
      // project a world point (x, y UP as in 3D? no: story-world y is DOWN) to screen pixels using the camera of the last render
      st.project = function (x, yDown, z) { const v = new T.Vector3(x, -yDown, z || 0).project(camera), vp = st.last.vp; return [vp.x + ((v.x + 1) / 2) * vp.w, vp.y + ((1 - v.y) / 2) * vp.h]; };
      return st;
    },
  };
})();
