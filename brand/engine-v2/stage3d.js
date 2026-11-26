// Bad Math engine v2 — 3D STAGE: "2D paper characters in a real 3D paper set" (three.js, deterministic, seek(t)-pure).
//   * Sets/props are 3D meshes (sets3d.js). Characters are camera-facing paper cards textured from the 2D puppet rig every frame (body on twos, faces on frames).
//   * One DirectionalLight (the lamp) casts hard shadows. Cards cast a floor shadow through an invisible proxy card facing the lamp, and RECEIVE the set's shadows
//     (blinds / bars / door frames) through a separate "gobo mask" pass: the set is rendered once from the lamp into a depth texture that the card shader samples.
//   * Depth of field + rack focus: the scene renders into a depth-texture target and a gather-blur pass blurs by distance from the focus point (shots with s.dof).
//   * The camera is a real perspective camera: story.js converts the 2D-style shot framing {x, y, zoom, roll, sx, sy} + {az, el, tz, fov} (or an explicit 3D path) into it.
// stage.render(sc, t, s, vp) returns the WebGL canvas (scaled by stage.k); story.js drops it into the 2D frame so captions / plates / impact / freeze / transitions are plain 2D.
(function () {
  const B = window.BM2, C = B.Cast; if (!window.THREE) { B.Stage3D = null; return; } const T = window.THREE, { clamp, hash } = B;
  const VFOV = 44; // vertical field of view (deg)
  const PLANE_W = 600, PLANE_H = 640, FEET = 0.93; // character card size (native px at scale 1) and where the feet sit in it
  const CARD_VS = 'varying vec2 vUv; varying vec3 vWorld; void main(){ vUv = uv; vec4 w = modelMatrix * vec4(position, 1.0); vWorld = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }';
  const CARD_FS = `#include <packing>
    uniform sampler2D map; uniform sampler2D maskMap; uniform mat4 maskMatrix; uniform float darkness; uniform vec3 tint; uniform float maskOn; uniform vec2 texel; uniform float bw; uniform vec2 drop; uniform vec3 lampPos; uniform vec3 lampDir; uniform float poolCos; uniform float poolMin; varying vec2 vUv; varying vec3 vWorld;
    void main(){ vec4 c = texture2D(map, vUv); float vis = 1.0;
      if (maskOn > 0.5) { vec4 lp = maskMatrix * vec4(vWorld, 1.0); vec3 n = lp.xyz / lp.w; vec2 uv = n.xy * 0.5 + 0.5; float d = n.z * 0.5 + 0.5; vis = 0.0; for (int i = -1; i <= 1; i++) for (int j = -1; j <= 1; j++) { float s = unpackRGBAToDepth(texture2D(maskMap, uv + vec2(float(i), float(j)) / 1024.0)); vis += (d - 0.0012 > s) ? 0.0 : 1.0; } vis /= 9.0; }
      // paper cut-out border (white card around the printed figure) + a tiny drop shadow offset down-right: alpha dilation by taps on two rings
      float a = c.a, m = a, sh = 0.0;
      if (bw > 0.0) { vec2 r1 = texel * bw, r2 = texel * bw * 0.5;
        for (int i = 0; i < 8; i++) { float an = float(i) * 0.7853982; vec2 o = vec2(cos(an), sin(an)); m = max(m, texture2D(map, vUv + o * r1).a); m = max(m, texture2D(map, vUv + o * r2).a); }
        if (m < 0.5) { vec2 dd = drop * texel; for (int i = 0; i < 8; i++) { float an = float(i) * 0.7853982; sh = max(sh, texture2D(map, vUv - dd + vec2(cos(an), sin(an)) * r1).a); } sh = max(sh, texture2D(map, vUv - dd).a); } }
      vec3 paper = vec3(0.961, 0.953, 0.933); vec3 col = c.rgb; float oa = a;
      if (bw > 0.0) { float bm = smoothstep(0.35, 0.8, m); col = mix(paper, c.rgb, smoothstep(0.55, 0.95, a)); oa = max(a, bm); if (m < 0.5 && sh > 0.4) { col = vec3(0.02, 0.03, 0.05); oa = 0.34 * sh; } }
      float att = 1.0; if (poolMin < 0.999) { float cs = dot(normalize(vWorld - lampPos), lampDir); att = mix(poolMin, 1.0, smoothstep(poolCos, 1.0, cs)); }
      gl_FragColor = vec4(col * tint * mix(darkness, 1.0, vis) * att, oa);
      #include <colorspace_fragment>
    }`;
  const DOF_VS = 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }';
  const DOF_FS = `uniform sampler2D tColor; uniform sampler2D tDepth; uniform float near; uniform float far; uniform float focus; uniform float sharp; uniform float falloff; uniform float maxBlur; uniform vec2 res; varying vec2 vUv;
    float lin(float d){ float z = d * 2.0 - 1.0; return 2.0 * near * far / (far + near - z * (far - near)); }
    float coc(vec2 uv){ float z = lin(texture2D(tDepth, uv).x); float k = clamp((abs(z - focus) - sharp) / falloff, 0.0, 1.0); return maxBlur * k; }
    void main(){ float c0 = coc(vUv); vec4 acc = texture2D(tColor, vUv); float wsum = 1.0;
      for (int i = 0; i < 16; i++) { float fi = float(i) + 0.5; float r = sqrt(fi / 16.0); float a = fi * 2.39996; vec2 o = vec2(cos(a), sin(a)) * r; float distPx = r * max(c0, 1.0); vec2 uv = vUv + o * c0 / res; float cs = coc(uv); float w = (cs >= distPx * 0.8 || c0 >= distPx) ? 1.0 : 0.0; if (c0 < 0.4) w = (cs >= distPx) ? 1.0 : 0.0; acc += texture2D(tColor, uv) * w; wsum += w; }
      gl_FragColor = vec4((acc / wsum).rgb, 1.0);
    }`;
  const DOF2_FS = `uniform sampler2D tColor; uniform sampler2D tBlur; uniform sampler2D tDepth; uniform float near; uniform float far; uniform float focus; uniform float sharp; uniform float falloff; uniform float maxBlur; varying vec2 vUv;
    float lin(float d){ float z = d * 2.0 - 1.0; return 2.0 * near * far / (far + near - z * (far - near)); }
    void main(){ float z = lin(texture2D(tDepth, vUv).x); float c0 = maxBlur * clamp((abs(z - focus) - sharp) / falloff, 0.0, 1.0); vec3 s = texture2D(tColor, vUv).rgb; vec3 b = texture2D(tBlur, vUv).rgb; gl_FragColor = vec4(mix(s, b, smoothstep(0.3, 2.5, c0)), 1.0);
      #include <colorspace_fragment>
    }`;
  B.Stage3D = {
    create(W, H) {
      const K = B.Stage3D.scale || 0.75, GW = Math.round(W * K), GH = Math.round(H * K), cv = document.createElement('canvas'); cv.width = GW; cv.height = GH;
      const r = new T.WebGLRenderer({ canvas: cv, antialias: B.Stage3D.aa !== false, alpha: false, preserveDrawingBuffer: true, powerPreference: 'high-performance' });
      r.setPixelRatio(1); r.setSize(GW, GH, false); r.shadowMap.enabled = true; r.shadowMap.type = T.PCFShadowMap; r.setScissorTest(true);
      const camera = new T.PerspectiveCamera(VFOV, W / H, 5, 14000), st = { prof: { chars: 0, gl: 0, allocs: 0, redraws: 0, shadow: 0 }, canvas: cv, renderer: r, camera, W, H, k: K };
      const mkTex = c => { const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.anisotropy = 4; t.generateMipmaps = false; t.minFilter = T.LinearFilter; t.magFilter = T.LinearFilter; return t; };
      const maskRT = new T.WebGLRenderTarget(1024, 1024, { minFilter: T.NearestFilter, magFilter: T.NearestFilter }), maskCam = new T.OrthographicCamera(-1500, 1500, 1500, -1500, 100, 6000), maskMat = new T.MeshDepthMaterial({ depthPacking: T.RGBADepthPacking });
      let dofRT = null, dofQuad = null, dofScene = null, dofCam = null;
      let blurRT = null, blurQuad = null, blurScene = null;
      function ensureDof() { if (dofRT) return; const dt = new T.DepthTexture(GW, GH); dt.type = T.UnsignedIntType; dofRT = new T.WebGLRenderTarget(GW, GH, { type: T.HalfFloatType, depthTexture: dt, samples: B.Stage3D.dofSamples ?? 4 }); blurRT = new T.WebGLRenderTarget(Math.ceil(GW / 2), Math.ceil(GH / 2), { type: T.HalfFloatType });
        const U = () => ({ tColor: { value: dofRT.texture }, tDepth: { value: dt }, tBlur: { value: blurRT.texture }, near: { value: 5 }, far: { value: 14000 }, focus: { value: 1000 }, sharp: { value: 100 }, falloff: { value: 500 }, maxBlur: { value: 10 }, res: { value: new T.Vector2(GW, GH) } });
        dofCam = new T.OrthographicCamera(-1, 1, 1, -1, 0, 1); dofScene = new T.Scene(); blurScene = new T.Scene();
        dofQuad = new T.Mesh(new T.PlaneGeometry(2, 2), new T.ShaderMaterial({ vertexShader: DOF_VS, fragmentShader: DOF2_FS, uniforms: U(), depthTest: false, depthWrite: false })); dofScene.add(dofQuad);
        blurQuad = new T.Mesh(new T.PlaneGeometry(2, 2), new T.ShaderMaterial({ vertexShader: DOF_VS, fragmentShader: DOF_FS, uniforms: U(), depthTest: false, depthWrite: false })); blurScene.add(blurQuad); }
      st.build = function (sc, theme, setKind, palette) {
        const def = B.Sets3D.sets[setKind]; if (!def) throw new Error(`scene ${sc.id}: no 3D set "${setKind}". 3D sets: ${Object.keys(B.Sets3D.sets).join(', ')}`);
        const scene = new T.Scene(); let group = new T.Group(), K2, built; scene.add(group);
        // SET REUSE: a set (kind + theme + palette + lamp) is built ONCE per page; every later scene that uses it (cutting back to the auction, kitchen, ...) gets a cheap clone that shares geometry, materials and textures. Fast cuts cost no set setup.
        const ckey = [setKind, theme, JSON.stringify(palette || null), JSON.stringify(sc.src.lamp || null)].join('|'); st.setCache = st.setCache || {}; let base = st.setCache[ckey];
        if (!base) { const ctx0 = B.Sets3D.ctxFor(group, theme, palette, sc.src.lamp); K2 = ctx0.K; built = def.build(ctx0) || {}; group.traverse(m => { if (m.isMesh) m.layers.enable(2); }); base = st.setCache[ckey] = { pristine: group.clone(true), K2, built }; } // layer 2 = set casters (the gobo mask)
        else { group = base.pristine.clone(true); scene.remove(scene.children[0]); scene.add(group); K2 = base.K2; built = Object.assign({}, base.built, { update: base.built.update }); }
        scene.background = new T.Color(built.bg || K2.bg);
        const poolOn = K2.pool > 0 && def.pool !== false, dirL = sc.src.lamp || [-0.75, K2.elev, 0.55], pc = sc.src.pool || (def.pool && def.pool.length ? def.pool : [0, 0, -100]), poolAng = K2.poolAngle || 0.78, key = poolOn ? new T.SpotLight(K2.lamp, K2.key, 6500, poolAng, 1, 0) : new T.DirectionalLight(K2.lamp, K2.key);
        const dn = new T.Vector3(...dirL).normalize(); key.target.position.set(pc[0], pc[1], pc[2]); key.position.copy(key.target.position).add(dn.clone().multiplyScalar(2400)); key.castShadow = true; key.shadow.mapSize.set(B.Stage3D.shadowSize || 1024, B.Stage3D.shadowSize || 1024); const sh = key.shadow.camera; if (!poolOn) { sh.left = -1500; sh.right = 1500; sh.top = 1500; sh.bottom = -1500; } sh.near = 300; sh.far = 6000; key.shadow.bias = -0.0008; key.shadow.radius = K2.soft; key.shadow.normalBias = 1; scene.add(key, key.target);
        scene.add(new T.HemisphereLight('#ffffff', theme === 'day' ? '#cfc4ff' : '#34415a', K2.amb));
        const o = { scene, group, key, dn, built, K: K2, def, chars: {}, props: [], theme, lamp0: dn.clone(), pc, poolOn, lampAxis: dn.clone().negate(), poolCos: Math.cos(poolAng), poolMin: poolOn ? K2.pool : 1 };
        for (const ch of Object.values(sc.chars)) o.chars[ch.id] = makeChar(o, ch);
        for (const p of sc.props) o.props.push(makeProp(o, p));
        return (sc.o3 = o);
      };
      function makeChar(o, ch) {
        const geo = new T.PlaneGeometry(1, 1), dark = o.theme === 'night' ? 0.6 : 0.78;
        const cardMat = new T.ShaderMaterial({ vertexShader: CARD_VS, fragmentShader: CARD_FS, side: T.DoubleSide, transparent: false, uniforms: { map: { value: null }, maskMap: { value: maskRT.texture }, maskMatrix: { value: new T.Matrix4() }, darkness: { value: dark }, tint: { value: new T.Color(1, 1, 1) }, maskOn: { value: 1 }, texel: { value: new T.Vector2(1, 1) }, bw: { value: B.Stage3D.border === false ? 0 : 1 }, drop: { value: new T.Vector2(1, 1) }, lampPos: { value: o.key.position }, lampDir: { value: o.lampAxis }, poolCos: { value: o.poolCos }, poolMin: { value: o.poolMin } } }); cardMat.alphaToCoverage = true;
        const card = new T.Mesh(geo, cardMat), proxy = new T.Mesh(geo, new T.MeshBasicMaterial({ colorWrite: false, depthWrite: false, side: T.DoubleSide })); proxy.castShadow = true;
        proxy.customDepthMaterial = new T.MeshDepthMaterial({ depthPacking: T.RGBADepthPacking, alphaTest: 0.35 }); proxy.frustumCulled = false; card.frustumCulled = false; o.group.add(card, proxy); // chars stay off layer 2: they do not feed the gobo mask
        return { ch, card, proxy, cache: null };
      }
      function makeProp(o, p) {
        const mk3 = B.Sets3D.props[p.kind], item = { p, obj: null, proxy: null }; let obj;
        if (mk3) { obj = mk3({ T, theme: o.theme, K: o.K }, p); obj.traverse(m => { if (m.isMesh) { m.castShadow = m.castShadow !== false && !(m.userData && m.userData.noCast); m.receiveShadow = true; m.layers.enable(2); } }); item.update = obj.userData.update; }
        else {
          const [w, h] = B.Props.size(p.kind), pad = 24, dens = 2, cw = Math.ceil((w + pad * 2) * dens), chh = Math.ceil((h + pad * 2) * dens), c = document.createElement('canvas'); c.width = cw; c.height = chh; const g = c.getContext('2d'); g.setTransform(dens, 0, 0, dens, 0, 0); g.translate(w / 2 + pad, h + pad); B.Props.draw(g, p.kind, p, 0);
          const tex = mkTex(c), geo = new T.PlaneGeometry(w + pad * 2, h + pad * 2), m = new T.Mesh(geo, new T.MeshBasicMaterial({ map: tex, transparent: false, alphaTest: 0.4, side: T.DoubleSide })); m.material.alphaToCoverage = true; m.position.y = (h + pad * 2) / 2 - pad; const prox = new T.Mesh(geo, new T.MeshBasicMaterial({ colorWrite: false, depthWrite: false, side: T.DoubleSide })); prox.position.copy(m.position); prox.castShadow = true; prox.customDepthMaterial = new T.MeshDepthMaterial({ depthPacking: T.RGBADepthPacking, map: tex, alphaTest: 0.4 }); obj = new T.Group(); obj.add(m); item.proxy = prox; obj.add(prox); item.standee = true;
        }
        o.group.add(obj); item.obj = obj; return item;
      }
      // Paper cut-out border, BAKED into the card texture when the figure is redrawn (pose step / face change), not per pixel per frame: a white dilated silhouette of the figure (12 offset blits) under it, plus a tiny dark drop offset.
      // Dilation = the white silhouette blitted at 8 offsets on a ring + 4 on an inner ring; cost only on redraw (15 / s), unlike a per-pixel shader gather.
      const mkc = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
      function addBorder(cc, bw) {
        const w = cc.w, h = cc.h; if (!cc.O || cc.O.width !== w || cc.O.height !== h) { cc.O = mkc(w, h); cc.W = mkc(w, h); cc.F = mkc(w, h); cc.og = cc.O.getContext('2d'); cc.wg = cc.W.getContext('2d'); cc.fg = cc.F.getContext('2d'); }
        const { og, wg, fg } = cc, g = cc.g; og.globalCompositeOperation = 'copy'; og.drawImage(cc.c, 0, 0); og.globalCompositeOperation = 'source-over';
        fg.globalCompositeOperation = 'copy'; fg.drawImage(cc.O, 0, 0); fg.globalCompositeOperation = 'source-in'; fg.fillStyle = '#F5F3EE'; fg.fillRect(0, 0, w, h); fg.globalCompositeOperation = 'source-over'; // white silhouette
        wg.clearRect(0, 0, w, h); for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2 + 0.2; wg.drawImage(cc.F, Math.cos(a) * bw, Math.sin(a) * bw); } for (let i = 0; i < 4; i++) { const a = (i / 4) * Math.PI * 2 + 0.6; wg.drawImage(cc.F, Math.cos(a) * bw * 0.5, Math.sin(a) * bw * 0.5); } wg.drawImage(cc.F, 0, 0);
        fg.globalCompositeOperation = 'copy'; fg.drawImage(cc.W, 0, 0); fg.globalCompositeOperation = 'source-in'; fg.fillStyle = '#05080D'; fg.fillRect(0, 0, w, h); fg.globalCompositeOperation = 'source-over'; // dark copy for the drop offset
        g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, w, h); g.globalAlpha = 0.34; g.drawImage(cc.F, bw * 0.6, bw * 0.6); g.globalAlpha = 1; g.drawImage(cc.W, 0, 0); g.drawImage(cc.O, 0, 0);
      }
      function drawShadowTex(e, ch, P, tPose, tFace) {
        if (!e.shadowTex) { const c = document.createElement('canvas'); c.width = 300; c.height = 320; e.shadowCv = c; e.shadowG = c.getContext('2d'); e.shadowTex = mkTex(c); e.proxy.customDepthMaterial.map = e.shadowTex; e.proxy.customDepthMaterial.needsUpdate = true; }
        const g = e.shadowG; g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, 300, 320); g.setTransform(0.5, 0, 0, 0.5, 0, 0); C.draw(g, ch, Object.assign({}, P, { x: PLANE_W / 2, y: PLANE_H * FEET, sc: 1 }), tPose); e.shadowTex.needsUpdate = true; e.shadowKey = tPose + '|' + P.face.id;
      }
      st.render = function (sc, t, s, vp) {
        const o = sc.o3, ctx = sc.ctx, tPose = Math.floor(t * 15 + 1e-6) / 15, tFace = Math.floor(t * 30 + 1e-6) / 30;
        const dn = s.lamp ? new T.Vector3(...s.lamp).normalize() : o.lamp0; o.dn.copy(dn); o.lampAxis.copy(dn).negate(); o.key.position.copy(o.key.target.position).add(dn.clone().multiplyScalar(2400)); // per-shot lamp = aimed long shadows
        const aspect = vp.w / vp.h; let cp, tgt, vf;
        if (s.cam3) { cp = new T.Vector3(...s.cam3.pos); tgt = new T.Vector3(...s.cam3.look); vf = (s.cam3.fov || s.fov || VFOV) * Math.PI / 180; }
        else { vf = (s.fov || VFOV) * Math.PI / 180; const viewW = vp.w / s.z, D = viewW / (2 * Math.tan(vf / 2) * aspect), az = (s.az || 0) * Math.PI / 180, el = (s.el == null ? 2 : s.el) * Math.PI / 180; tgt = new T.Vector3(s.x, -s.y, s.tz || 0); cp = new T.Vector3(tgt.x + D * Math.sin(az) * Math.cos(el), tgt.y + D * Math.sin(el), tgt.z + D * Math.cos(az) * Math.cos(el)); }
        camera.up.set(Math.sin(-s.r), Math.cos(s.r), 0); camera.fov = vf * 180 / Math.PI; camera.aspect = aspect; camera.position.copy(cp); camera.lookAt(tgt); camera.setViewOffset(vp.w, vp.h, vp.w / 2 - (s.sx - vp.x), vp.h / 2 - (s.sy - vp.y), vp.w, vp.h); camera.updateProjectionMatrix(); camera.updateMatrixWorld(true);
        o.built.update && o.built.update(t, o); for (const it of o.props) it.update && it.update(t, o); o.key.intensity = o.K.key * (o.theme === 'night' ? 1 - 0.05 * hash(Math.floor(t * 10) * 3.7) : 1);
        const tP0 = performance.now();
        for (const id in o.chars) {
          const e = o.chars[id], ch = e.ch, vis = t >= ch.inT && t <= ch.outT; e.card.visible = e.proxy.visible = vis; if (!vis) continue;
          const P = C.pose(ch, tPose, Object.assign({}, ctx, { tFace })), pos = C.moveAt(ch, tPose), z = pos.lane * C.LANE, sc2 = ch.scale, cyC = PLANE_H * (FEET - 0.5) * sc2, ctr = new T.Vector3(pos.x, cyC, z), dist = cp.distanceTo(ctr);
          const ppuS = (vp.h / (2 * Math.tan(vf / 2) * dist)), sp = ctr.clone().project(camera), csx = vp.x + ((sp.x + 1) / 2) * vp.w, csy = vp.y + ((1 - sp.y) / 2) * vp.h, m = 40;
          let u0 = (vp.x - m - csx) / ppuS / sc2, u1 = (vp.x + vp.w + m - csx) / ppuS / sc2, v0 = -(vp.y + vp.h + m - csy) / ppuS / sc2, v1 = -(vp.y - m - csy) / ppuS / sc2;
          u0 = Math.max(u0, -PLANE_W / 2); u1 = Math.min(u1, PLANE_W / 2); v0 = Math.max(v0, -PLANE_H / 2); v1 = Math.min(v1, PLANE_H / 2);
          e.proxy.scale.set(PLANE_W * sc2, PLANE_H * sc2, 1); e.proxy.position.set(pos.x, cyC, z); e.proxy.rotation.set(0, Math.atan2(o.dn.x, o.dn.z), 0);
          if (u1 <= u0 || v1 <= v0 || sp.z > 1) { e.card.visible = false; if (!e.shadowTex) drawShadowTex(e, ch, P, tPose, tFace); continue; }
          u0 = Math.max(-PLANE_W / 2, Math.floor(u0 / 40) * 40); u1 = Math.min(PLANE_W / 2, Math.ceil(u1 / 40) * 40); v0 = Math.max(-PLANE_H / 2, Math.floor(v0 / 40) * 40); v1 = Math.min(PLANE_H / 2, Math.ceil(v1 / 40) * 40); // snapped crop: stable texture size while the camera moves
          const cw = u1 - u0, chh = v1 - v0, ppu = ppuS * sc2, dens = Math.min(4, Math.max(1, ppu * 1.1 * st.k)), qd = [1, 1.5, 2, 3, 4].find(d => d >= dens) || 4, tw = Math.max(8, Math.min(1400, Math.ceil(cw * qd))), th = Math.max(8, Math.min(1500, Math.ceil(chh * qd)));
          const Fc = P.face, key = tPose + '|' + Fc.id + '|' + Fc.eyes.mode + '|' + Fc.sx + '|' + (P.talk ? P.talk.level : 'x') + '|' + [u0, u1, v0, v1].join(',') + '|' + qd; // redraw only when something visible can have changed (pose step, face swap / blink / squash, crop)
          if (!e.cache || e.cache.w !== tw || e.cache.h !== th) { st.prof.allocs++; if (e.cache) e.cache.tex.dispose(); const c = document.createElement('canvas'); c.width = tw; c.height = th; e.cache = { w: tw, h: th, c, g: c.getContext('2d'), tex: mkTex(c), key: null, dens: qd }; e.card.material.uniforms.map.value = e.cache.tex; }
          if (e.cache.key !== key) { st.prof.redraws++; const g = e.cache.g, kx = tw / cw, ky = th / chh; g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, tw, th); g.setTransform(kx, 0, 0, ky, -(u0 + PLANE_W / 2) * kx, -(PLANE_H - (v1 + PLANE_H / 2)) * ky); P.sc = 1; P.x = PLANE_W / 2; P.y = PLANE_H * FEET; C.draw(g, ch, P, tPose); if (B.Stage3D.border !== false) addBorder(e.cache, (B.Stage3D.borderW || 5) * Math.min(kx, ky)); e.cache.tex.needsUpdate = true; e.cache.key = key; }
          const cuC = (u0 + u1) / 2, cvC = (v0 + v1) / 2; e.card.scale.set(cw * sc2, chh * sc2, 1); e.card.position.set(pos.x, cyC + cvC * sc2, z); e.card.rotation.set(0, Math.atan2(cp.x - pos.x, cp.z - z), 0); e.card.translateX(cuC * sc2); { const U = e.card.material.uniforms, q = e.cache.dens; U.texel.value.set(1 / e.cache.w, 1 / e.cache.h); U.bw.value = 0; }
          e.lastP = { x: pos.x, z }; if (!e.shadowTex || e.shadowKey !== tPose + '|' + P.face.id) drawShadowTex(e, ch, P, tPose, tFace);
        }
        st.prof.chars += performance.now() - tP0;
        for (const it of o.props) { const p = it.p, pp = sc.propPos(p, t); let hop = 0; for (const j of p.jolts) { const d = t - j; if (d >= 0 && d < 0.6) hop = Math.exp(-9 * d) * Math.sin(d * 50) * -(p.joltAmp || 9); }
          const vis = t >= p.inT && t <= p.outT + 0.25 && !(p.hidden && p.hidden.some(([a, b]) => t >= a && t <= b)); it.obj.visible = vis; if (!vis) continue; const pop = p.inT > -1e8 ? 0.6 + 0.4 * B.spring(t - p.inT, 'snappy') : 1;
          it.obj.position.set(pp.x, (pp.arc || 0) + (p.y || 0) + hop + (p.anim === 'bob' ? Math.sin(t * 2.2 + p.seed) * 4 : 0), pp.lane * C.LANE); it.obj.scale.setScalar(p.scale * pop); it.obj.rotation.y = (p.yaw || 0) * Math.PI / 180; it.obj.rotation.z = p.rot + (p.anim === 'sway' ? Math.sin(t * 1.4 + p.seed) * 0.03 : 0); }
        // gobo mask: the set's casters (layer 2) seen from the lamp, as a depth texture the cards sample
        maskCam.position.copy(o.key.position); maskCam.up.set(0, 1, 0); if (Math.abs(o.dn.y) > 0.98) maskCam.up.set(0, 0, 1); maskCam.lookAt(o.pc[0], o.pc[1], o.pc[2]); maskCam.updateMatrixWorld(true); maskCam.updateProjectionMatrix();
        const bg = o.scene.background; o.scene.background = null; r.setRenderTarget(maskRT); r.setScissorTest(false); r.setViewport(0, 0, 1024, 1024); const oc = r.getClearColor(new T.Color()), oa = r.getClearAlpha(); r.setClearColor(0xffffff, 1); r.clear(); maskCam.layers.set(2); o.scene.overrideMaterial = maskMat; r.render(o.scene, maskCam); o.scene.overrideMaterial = null; r.setClearColor(oc, oa); r.setRenderTarget(null); r.setScissorTest(true); o.scene.background = bg;
        const mm = new T.Matrix4().multiplyMatrices(maskCam.projectionMatrix, maskCam.matrixWorldInverse); for (const id in o.chars) o.chars[id].card.material.uniforms.maskMatrix.value.copy(mm);
        const tG0 = performance.now(), kk = st.k, vx = vp.x * kk, vy = (H - vp.y - vp.h) * kk, vw = vp.w * kk, vh = vp.h * kk, dof = s.dof;
        if (dof && dof.blur > 0.5 && vp.w === W && vp.h === H) {
          ensureDof(); const fp = new T.Vector3(...dof.pt), focus = Math.max(50, fp.sub(cp).dot(new T.Vector3().subVectors(tgt, cp).normalize()));
          r.setRenderTarget(dofRT); r.setScissorTest(false); r.setViewport(0, 0, GW, GH); r.render(o.scene, camera);
          for (const q of [blurQuad, dofQuad]) { const u = q.material.uniforms; u.near.value = camera.near; u.far.value = camera.far; u.focus.value = focus; u.sharp.value = dof.sharp ?? 140; u.falloff.value = dof.falloff ?? 700; u.maxBlur.value = dof.blur * kk; }
          r.setRenderTarget(blurRT); r.setViewport(0, 0, blurRT.width, blurRT.height); r.render(blurScene, dofCam); // half-res gather blur
          r.setRenderTarget(null); r.setScissorTest(true); r.setViewport(vx, vy, vw, vh); r.setScissor(vx, vy, vw, vh); r.render(dofScene, dofCam); // composite sharp / blurred by circle of confusion
        } else { r.setViewport(vx, vy, vw, vh); r.setScissor(vx, vy, vw, vh); r.render(o.scene, camera); }
        st.prof.gl += performance.now() - tG0; st.last = { camera, vp, o }; return cv;
      };
      st.project = function (x, yDown, z) { const v = new T.Vector3(x, -yDown, z || 0).project(camera), vp = st.last.vp; return [vp.x + ((v.x + 1) / 2) * vp.w, vp.y + ((1 - v.y) / 2) * vp.h]; };
      return st;
    },
  };
})();
