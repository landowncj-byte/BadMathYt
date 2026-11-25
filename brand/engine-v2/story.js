// Bad Math engine v2 — STORY: scene/sequence compiler + shot/camera system for animated story scenes (SHOW-BIBLE format).
// Load order: primitives.js, camera.js, faces.js, cast.js, looks.js, props.js, sets.js, [three + sets3d.js + stage3d.js], engine.js (exports makeT), story.js, voice.js, scene.js
//   BM2.story({ look, theme, cast, scenes:[ {id, at, set, props, blocking, actions, shots, fx, transition} ]  |  shots:[ {id, at, set, mark, size, observer, cast, faces, cam, key, ...} ], duration, captions, sfx, bed })
// Two authoring styles compile to the same thing: scenes[] (set + blocking + actions + shots) or the flat bible form shots[] (one storyboard row = one entry; scenes are grouped by set).
// Stage: '3d' (default when three.js is loaded: 2D paper characters in a 3D paper set) or '2d' (parallax fallback). Everything is a pure function of time (seek(t)).
(function () {
  const B = window.BM2, C = B.Cast, { W, H, clamp, lerp, hash } = B, TAU = Math.PI * 2, eio = C.eio, eout = C.eout, ss = C.ss, sgn = v => (v < 0 ? -1 : 1);
  // ----------------------------------------------------------------- shot library (size codes from the bible: WS FS MS CU ECU INS TOP SPLIT)
  // w = world px visible across the frame (x character scale), a = height of the framed point above the ground (share of standing height), dy = where that point lands on screen (share of H).
  const SHOT = B.SHOTS = {
    wide: { home: true, dy: 0.47, el: 5 }, full: { w: 600, a: 0.5, dy: 0.5, el: 3 }, medium: { w: 470, a: 0.66, dy: 0.44, el: 2 }, cu: { w: 300, a: 0.8, dy: 0.4, el: 0 }, ecu: { w: 170, a: 0.82, dy: 0.4, el: 0 },
    reaction: { w: 280, a: 0.8, dy: 0.4, punch: 0.1, el: 0 }, two: { fit: true, dy: 0.45, el: 3 }, ots: { w: 360, a: 0.8, dy: 0.4, ots: true, el: 2 }, pov: { w: 560, a: 0.55, dy: 0.45, pov: true, el: 0 },
    prop: { w: 420, a: 0.5, dy: 0.42, prop: true, el: 4 }, top: { w: 1500, a: 0, dy: 0.45, prop: true, el: 86, top: true }, custom: { dy: 0.45 },
  };
  const SIZE = { WS: 'wide', FS: 'full', MS: 'medium', CU: 'cu', ECU: 'ecu', INS: 'prop', TOP: 'top', SPLIT: 'split' };
  const norm = B.norm;

  // ----------------------------------------------------------------- flat bible form -> scenes
  // shots:[{id, at, set, theme, mark, size:'MS', observer:'peek', cast:[{who, look, at:'left'|'A'|[x,lane], dir, face, pose, target, hold, walk:{to}, layer}], faces:[[@word, who, 'F12']], actions:[...], cam:'push-in'|{...}, key, narration}]
  const MARKS = { left: -230, centre: 0, center: 0, right: 230, far_left: -480, far_right: 480 };
  function expandShots(spec, T) {
    const scenes = []; let cur = null, lastSet = null;
    for (const sh of spec.shots) {
      const setKind = typeof sh.set === 'string' ? sh.set : (sh.set && sh.set.kind) || lastSet || 'void', sk = sh.scene || setKind + '|' + (sh.theme || spec.theme || '');
      if (!cur || cur.key !== sk) { cur = { key: sk, id: sh.scene || 'S' + (scenes.length + 1), at: T(sh.at), set: typeof sh.set === 'object' ? sh.set : { kind: setKind }, theme: sh.theme || spec.theme, cast: {}, blocking: {}, actions: [], shots: [], fx: [], props: sh.props || [], transition: sh.transition, lamp: sh.lamp }; if (typeof sh.set === 'object') cur.set = { ...sh.set }; scenes.push(cur); }
      lastSet = setKind; if (sh.props && cur.props !== sh.props) cur.props = cur.props.concat(sh.props.filter(p => !cur.props.some(q => q.id === p.id)));
      const t0 = T(sh.at), marks = B.Sets3D && B.Sets3D.sets[setKind] ? B.Sets3D.sets[setKind].marks || {} : {}, mx = v => (typeof v === 'number' ? v : marks[v] ?? MARKS[v] ?? 0);
      let focus = null;
      for (const e of sh.cast || []) {
        const who = e.who, look = e.look || (spec.look && spec.look[who]) || who; if (!cur.cast[who]) cur.cast[who] = { base: look, ...(e.override || {}) };
        if (!cur.blocking[who]) cur.blocking[who] = { at: [e.at != null ? (Array.isArray(e.at) ? e.at[0] : mx(e.at)) : 0, Array.isArray(e.at) ? e.at[1] || 0 : e.lane || 0], face: e.dir };
        const a = { at: t0, who };
        if (e.at != null) a.place = Array.isArray(e.at) ? e.at : [mx(e.at), e.lane || 0]; if (e.dir != null) a.turn = e.dir; if (e.face) a.face = e.face; if (e.look_at !== undefined) a.look = e.look_at; if (e.crouch != null) a.crouch = e.crouch; if (e.talk) a.talk = e.talk === true ? 1.5 : e.talk;
        cur.actions.push(a);
        if (e.pose) cur.actions.push({ at: t0 + (e.pose_at || 0.12), who, do: e.pose, target: e.target, prop: e.hold || e.prop, n: e.n, dur: e.pose_dur });
        if (e.hold && !e.pose) cur.actions.push({ at: t0, who, do: 'hold', prop: e.hold, take: e.take, dur: sh.dur || 4 });
        if (e.walk) cur.actions.push({ at: e.walk.at != null ? e.walk.at : t0, who, do: e.walk.gait || 'walk', to: e.walk.to, until: e.walk.until, dur: e.walk.dur, speed: e.walk.speed, then: e.walk.then });
        if (e.focus || (!focus && !e.bg)) focus = focus && !e.focus ? focus : who;
      }
      for (const f of sh.faces || []) cur.actions.push({ at: f[0], who: f[1], face: f[2] });
      for (const a of sh.actions || []) cur.actions.push(a);
      const obs = sh.observer ? String(sh.observer).toLowerCase().replace(/[^a-z-]/g, '') : '', size = SIZE[String(sh.size || 'MS').toUpperCase()] || sh.size || 'medium', row = { id: sh.id, at: t0, key: sh.key, label: sh.label, narration: sh.narration, mark: sh.mark, ...sh.shot };
      row.shot = sh.shotKind || (obs === 'reaction' || obs === 'reactioncu' ? 'reaction' : obs === 'ots' ? 'ots' : obs === 'pov' ? 'pov' : size);
      if (size === 'split' || sh.split) { row.shot = 'split'; row.split = sh.split; } else if (row.shot !== 'wide' || sh.on) row.on = sh.on || (sh.cast && sh.cast.length === 2 && row.shot === 'two' ? sh.cast.map(c => c.who) : focus);
      if (size === 'wide' && sh.mark) row.x = mx(sh.mark); if (sh.over) row.over = sh.over; if (sh.of) row.of = sh.of; if (sh.target) row.target = sh.target;
      if (obs === 'peek') row.peek = typeof sh.peek === 'object' ? sh.peek : { prop: sh.peek || 'crate', side: sh.peekSide || 'left' }; if (obs === 'security' || obs === 'securitycam') { row.cam = 'security'; row.camOpts = sh.camOpts; } if (obs === 'courtsketch') row.cam = 'sketch'; if (obs === 'overcrowd') row.overcrowd = true; if (obs === 'window') row.window = true;
      if (sh.freeze) { row.shot = 'freeze'; row.freeze = sh.freeze; row.label = sh.freeze.label; row.role = sh.freeze.role; row.on = sh.on || focus; } if (sh.card) { row.shot = 'card'; row.card = sh.card; }
      Object.assign(row, camWords(sh.cam), sh.camera || {}); if (sh.move) row.move = sh.move; if (sh.dir) row.dir = sh.dir; if (sh.az != null) row.az = sh.az; if (sh.el != null) row.el = sh.el; if (sh.fx) for (const f of [].concat(sh.fx)) cur.fx.push({ ...f, at: f.at ?? t0 }); if (sh.sfx) row.sfx = sh.sfx; if (sh.dutch) row.r = sh.dutch * Math.PI / 180;
      cur.shots.push(row);
      if (sh.sfxs) for (const x of sh.sfxs) (spec.sfx = spec.sfx || []).push(x);
    }
    return scenes;
  }
  function camWords(c) { // bible 5.3 move names -> shot parameters
    if (!c) return {}; if (typeof c === 'object' && !Array.isArray(c)) return c; const o = {}; for (const w of [].concat(c)) { if (w === 'creep') o.push = 0.015; else if (w === 'push-in') { o.zoomMoves = [{ at: 0, dur: 0.55, to: 1.25 }]; } else if (w === 'crash') o.zoomMoves = [{ at: 0, dur: 0.2, to: 1.6, over: 0.04 }]; else if (w === 'pull-back') o.zoomMoves = [{ at: 0, dur: 0.8, to: 0.8 }]; else if (w === 'whip') o.move = 'whip'; else if (w === 'truck') o.pan = { by: [220, 0], dur: 2.0 }; else if (w === 'orbit') o.orbit = 18; else if (w === 'dutch') o.r = 0.07; else if (w === 'crane') o.el = [4, 24]; } return o;
  }

  B.story = function (spec) {
    const voice = spec.voice || window.BM2_VOICE || { words: [], mouth: [] }, T = B.makeT(voice.words || [], voice.paragraphs), fps = spec.fps || 30, hasMouth = !!((voice.mouth && voice.mouth.length) || voice.mouths);
    if (spec.style) { Object.assign(B.Style, spec.style); C.clearFaceCache(); }
    const Cv = document.getElementById('c') || document.body.appendChild(Object.assign(document.createElement('canvas'), { id: 'c' })); Cv.width = W; Cv.height = H; const X = Cv.getContext('2d');
    const mk = () => { const c = document.createElement('canvas'); c.width = W; c.height = H; return [c, c.getContext('2d')]; };
    const [SCR, S1] = mk(), [SCB, S2] = mk(), [ACC, AG] = mk(), [FRM, FG] = mk(), [FRM2, FG2] = mk();
    const use3d = (spec.stage || (B.Stage3D ? '3d' : '2d')) === '3d' && !!B.Stage3D; let stage = null, err = null; if (use3d) { C.laneS = () => 1; C.laneY = () => 0; }
    const laneS = l => (use3d ? 1 : C.laneS(l));
    const mouthSeries = id => (voice.mouths && voice.mouths[id]) || voice.mouth || [];
    const mouthAt = (id, t) => { const m = mouthSeries(id); if (!m.length) return 0; const f = t * 30, i = Math.floor(f), u = f - i; return lerp(m[clamp(i, 0, m.length - 1)] || 0, m[clamp(i + 1, 0, m.length - 1)] || 0, u); };
    function build() { try {
      const sfx = [], rows = [], warns = []; const tt = v => (v == null ? null : T(v));
      if (use3d) stage = B.Stage3D.create(W, H);
      const dirVal = (v, def, posOf, selfX) => { if (v == null) return def; if (typeof v === 'number') return v; if (v === 'right') return 1; if (v === 'left') return -1; if (v === 'camera' || v === 'front' || v === 'away') return 0; if (typeof v === 'string' && posOf) { const x = posOf(v); if (x != null && selfX != null) return sgn(x - selfX) * 0.85 || def; } return def; };
      const scenesIn = spec.scenes && spec.scenes.length ? spec.scenes : spec.shots ? expandShots(spec, T) : []; if (!scenesIn.length) throw new Error('story needs scenes[] or shots[]');
      const scenes = scenesIn.map((s, si) => compileScene(s, si));
      scenes.forEach((sc, i) => { sc.t1 = scenes[i + 1] ? scenes[i + 1].t0 : spec.duration; sc.shots.forEach((sh, k) => { sh.t1 = sc.shots[k + 1] ? sc.shots[k + 1].t0 : sc.t1; }); });
      function compileScene(s, si) {
        const sc = { src: s, id: s.id || 's' + (si + 1), t0: tt(s.at ?? 0), chars: {}, props: [], shots: [], fx: [], bubbles: [], overlays: [] };
        const setDef = typeof s.set === 'string' ? { kind: s.set } : (s.set || { kind: 'void' }); sc.theme = s.theme || setDef.theme || spec.theme || 'night';
        if (use3d) { if (!B.Sets3D.sets[setDef.kind]) throw new Error(`scene ${sc.id}: unknown 3D set "${setDef.kind}". Sets: ${Object.keys(B.Sets3D.sets).join(', ')}`); sc.set = { kind: setDef.kind, home: setDef.home || { x: 0, y: -300 }, wideW: setDef.wideW || 950, palette: setDef.palette }; }
        else { const k2 = B.Sets.sets[setDef.kind] || B.Sets.sets.studio; sc.set = { def: k2, pal: Object.assign({}, k2.palette, setDef.palette), home: setDef.home || k2.home, wideW: setDef.wideW || k2.wideW }; }
        const decl = Object.assign({}, spec.cast, s.cast), blocking = s.blocking || {};
        for (const id of Object.keys(Object.assign({}, blocking, s.cast || {}))) { const d = decl[id] || {}, ch = C.make(id, d.base || (spec.look && spec.look[id]) || id, d), bl = blocking[id] || {}; ch.init = { x: Array.isArray(bl.at) ? bl.at[0] : (bl.at ?? 0), lane: Array.isArray(bl.at) ? bl.at[1] || 0 : bl.lane || 0 };
          if (bl.face != null) ch.facing0 = dirVal(bl.face, 1); if (bl.expr || bl.is) ch.face0 = bl.expr || bl.is; ch.inT = bl.in != null ? tt(bl.in) : -1e9; ch.outT = bl.out != null ? tt(bl.out) : 1e9; ch.z = bl.z || 0; ch.cursor = { x: ch.init.x, lane: ch.init.lane }; sc.chars[id] = ch; }
        (s.props || []).forEach((p, i) => { if (!B.Props.kinds[p.kind]) throw new Error(`scene ${sc.id}: prop "${p.id || i}" unknown kind "${p.kind}". Props: ${Object.keys(B.Props.kinds).join(', ')}`); sc.props.push({ id: p.id || 'p' + i, ...p, scale: p.scale || 1, x: p.x || 0, lane: p.lane || 0, z: p.z || 'back', inT: p.in != null ? tt(p.in) : -1e9, outT: p.out != null ? tt(p.out) : 1e9, jolts: [], moves: [], rot: p.rot || 0, seed: i }); });
        const propById = id => sc.props.find(p => p.id === id);
        const acts = (s.actions || []).map((a, i) => ({ ...a, t: tt(a.at), _i: i })).sort((a, b) => a.t - b.t || a._i - b._i), GEST = Object.keys(C.gestures), MOVE = { walk: 1, run: 1, sneak: 1, stomp: 1 };
        const DEFDUR = { point: 1.8, shrug: 1.1, facepalm: 1.6, count: 2.2, hold: 99, present: 2, armsUp: 1.3, slam: 1.0, wave: 1.5, think: 2.2, cover: 1.6, clap: 1.4, 'hands-up': 1.5, 'shake-fist': 1.4, crossed: 2, behind: 3, 'lean-in': 1.6, recoil: 1.0, clutch: 3, 'raise-paddle': 1.6, peek: 2.0 }, turns = [];
        for (const a of acts) {
          const ch = sc.chars[a.who];
          if (a.do === 'prop') { const p = propById(a.id || a.prop); if (!p) throw new Error(`scene ${sc.id}: action prop "${a.id || a.prop}" not found`); if (a.to) p.moves.push({ t0: a.t, t1: a.until != null ? tt(a.until) : a.t + (a.dur || 0.6), to: Array.isArray(a.to) ? a.to : [a.to, p.lane], arc: a.arc || 0 }); if (a.jolt) p.jolts.push(a.t); if (a.show != null) { if (a.show) p.inT = a.t; else p.outT = a.t; } if (a.sfx) sfx.push({ at: a.t, ...(typeof a.sfx === 'string' ? { name: a.sfx } : a.sfx) }); rows.push({ t: a.t, scene: sc.id, who: a.id || a.prop, text: `prop ${a.to ? 'moves' : a.jolt ? 'jolts' : a.show === false ? 'leaves' : 'appears'}` }); continue; }
          if (a.do === 'bubble') { sc.bubbles.push({ t0: a.t, t1: a.until != null ? tt(a.until) : a.t + (a.dur || 2), who: a.who, text: a.text, style: a.style || 'speech' }); rows.push({ t: a.t, scene: sc.id, who: a.who, text: `sign gag "${a.text}"` }); continue; }
          if (!ch) throw new Error(`scene ${sc.id}: action at ${a.at} refers to unknown character "${a.who}". Cast: ${Object.keys(sc.chars).join(', ')}`);
          const desc = [], tf = Math.round(a.t * fps) / fps;
          if (a.face || a.is) { ch.faces.push({ t: tf, name: a.face || a.is }); const id = B.Faces.resolve(a.face || a.is); desc.push(`face ${id || '??'}${id ? ' ' + B.Faces.library[id].name : ''}`); }
          if (a.place || a.do === 'place') { const pl = a.place || a.to, x = Array.isArray(pl) ? pl[0] : pl, lane = Array.isArray(pl) ? pl[1] || 0 : 0; ch.timeline.push({ t0: a.t, place: { x, lane } }); ch.cursor = { x, lane }; desc.push(`stands at ${x}`); }
          if (MOVE[a.do]) {
            const gait = a.do, g = C.gaits[gait], raw = a.path || (Array.isArray(a.to) && Array.isArray(a.to[0]) ? a.to : [a.to]), pts = [[ch.cursor.x, ch.cursor.lane]].concat(raw.map(p => (Array.isArray(p) ? [p[0], p[1] ?? ch.cursor.lane] : [p, ch.cursor.lane])));
            let len = 0; for (let i = 1; i < pts.length; i++) len += Math.hypot(pts[i][0] - pts[i - 1][0], (pts[i][1] - pts[i - 1][1]) * C.LANE);
            const speed = a.speed || (g.S / g.cycle) * ch.scale, ta = a.ease || 0.3, t1 = a.until != null ? tt(a.until) : a.t + (a.dur || len / speed + ta); if (t1 <= a.t + 0.05) throw new Error(`scene ${sc.id}: ${a.who} ${a.do} at ${a.at} ends before it starts`);
            const seg = C.compileSeg({ t0: a.t, t1, pts, gait, ta }, ch.b); ch.timeline.push(seg); const dx = pts[pts.length - 1][0] - pts[0][0] || pts[1][0] - pts[0][0]; if (a.strafe !== true) ch.facing.push({ t: a.t - 0.02, v: Math.abs(dx) > 1 ? sgn(dx) : ch.facing0 || 1, dur: 0.18 });
            ch.cursor = { x: pts[pts.length - 1][0], lane: pts[pts.length - 1][1] }; desc.push(`${a.do} to ${JSON.stringify(raw)} (${(t1 - a.t).toFixed(1)} s, stride ${seg.S.toFixed(0)})`); if (a.then) turns.push({ ch, t: t1 + 0.05, to: a.then, dur: 0.3 });
          }
          if (a.do === 'turn' || (a.turn != null && !a.do)) { turns.push({ ch, t: a.t, to: a.do === 'turn' ? a.to : a.turn, dur: a.dur || 0.3 }); desc.push(`turns ${a.do === 'turn' ? a.to : a.turn}`); }
          if (a.do === 'look' || (a.look !== undefined && !a.do)) { ch.looks.push({ t: a.t, v: a.do === 'look' ? (a.target ?? a.to ?? null) : a.look }); desc.push(`looks ${a.target ?? a.to ?? a.look ?? 'ahead'}`); }
          if (a.do === 'talk' || a.talk) { const t1 = a.until != null ? tt(a.until) : a.t + (a.dur || (typeof a.talk === 'number' ? a.talk : 1.5)); ch.talks.push([a.t, t1]); desc.push('mimes talking'); }
          if (a.do === 'crouch' || a.crouch != null) { ch.crouch.push({ t: a.t, v: a.do === 'crouch' ? (a.v ?? 1) : a.crouch, dur: a.dur || 0.3 }); desc.push(`crouch ${a.v ?? a.crouch ?? 1}`); }
          if (GEST.includes(a.do)) {
            const t1 = a.until != null ? tt(a.until) : a.t + (a.dur || DEFDUR[a.do] || 1.5), gs = { kind: a.do, t0: a.t, t1, target: a.target, arm: a.arm, n: a.n, step: a.step, prop: a.prop, rot: a.rot, propScale: a.propScale, rampIn: a.rampIn, rampOut: a.rampOut };
            if (a.do === 'hold' && a.take) { const p = propById(a.take); if (p) { p.hidden = (p.hidden || []).concat([[a.t, t1]]); gs.prop = gs.prop || p.kind; ch.propOpts = Object.assign({}, p); } }
            ch.gestures.push(gs); desc.push(a.do + (a.target ? ` at ${a.target}` : '') + (a.prop ? ` (${a.prop})` : ''));
            if (a.do === 'slam') { const ti = a.t + 0.44; sc.fx.push({ t: ti, type: 'shake', amp: a.amp || 16, dur: 0.5 }); const p = a.prop && propById(a.prop); if (p) p.jolts.push(ti); sfx.push({ at: ti, name: 'thud_1', gain: -4, dur: 0.5 }); }
          }
          if (a.sfx) sfx.push({ at: a.t, ...(typeof a.sfx === 'string' ? { name: a.sfx } : a.sfx) });
          if (desc.length) rows.push({ t: a.t, scene: sc.id, who: a.who, text: desc.join(' + ') });
        }
        for (const tr of turns) { let v = dirVal(tr.to, 1, id => { const o = sc.chars[id]; if (o) return C.moveAt(o, tr.t).x; const p = propById(id); return p ? p.x : null; }, C.moveAt(tr.ch, tr.t).x); tr.ch.facing.push({ t: tr.t, v, dur: tr.dur }); }
        for (const ch of Object.values(sc.chars)) { ch.facing.sort((a, b) => a.t - b.t); ch.faces.sort((a, b) => a.t - b.t); ch.looks.sort((a, b) => a.t - b.t); ch.crouch.sort((a, b) => a.t - b.t); ch.timeline.sort((a, b) => (a.t0 ?? 0) - (b.t0 ?? 0)); ch.gestures.sort((a, b) => a.t0 - b.t0);
          for (let i = 1; i < ch.faces.length; i++) if (ch.faces[i].t - ch.faces[i - 1].t < 8 / fps - 1e-6) warns.push(`WARN scene ${sc.id} ${ch.id}: face ${ch.faces[i - 1].name} -> ${ch.faces[i].name} held only ${((ch.faces[i].t - ch.faces[i - 1].t) * fps).toFixed(0)} frames (bible: >= 8)`); }
        sc.shots = (s.shots && s.shots.length ? s.shots : [{ at: sc.t0, shot: 'wide' }]).map((h, i) => compileShot(h, sc, i)).sort((a, b) => a.t0 - b.t0);
        for (const f of s.fx || []) { const o = { ...f, t: tt(f.at), dur: f.dur ?? ({ impact: 2 / fps, flash: 0.18, shake: 0.5, punch: 0.3, speedlines: 0.2, tension: 0.7 }[f.type] || 0.3) }; sc.fx.push(o); rows.push({ t: o.t, scene: sc.id, who: '', text: `fx ${f.type}` }); if (f.sfx) sfx.push({ at: o.t, ...(typeof f.sfx === 'string' ? { name: f.sfx } : f.sfx) }); else if (f.type === 'impact') sfx.push({ at: o.t, name: 'deep_boom_1', gain: -4, dur: 1.2 }); }
        for (const o of s.overlays || []) sc.overlays.push({ ...o, t0: tt(o.at ?? o.from ?? sc.t0), t1: o.until != null ? tt(o.until) : 1e9 });
        sc.propPos = (p, t) => propPos(sc, p, t); sc.ctx = ctxFor(sc);
        if (use3d) stage.build(sc, sc.theme, sc.set.kind, sc.set.palette); return sc;
      }
      function compileShot(h, sc, i) {
        const kind = h.shot || h.kind || (h.card ? 'card' : h.freeze ? 'freeze' : h.split ? 'split' : 'wide'), t0 = tt(h.at ?? sc.t0), base = SHOT[kind];
        if (!base && !['card', 'freeze', 'split'].includes(kind)) throw new Error(`scene ${sc.id}: shot "${kind}" unknown. Shots: ${Object.keys(SHOT).join(', ')}, card, freeze, split`);
        const sh = { ...h, kind, t0, base: base || {}, on: h.on, move: h.move || 'cut', push: h.push == null ? 0.045 : h.push, i, key: h.key != null ? tt(h.key) : null };
        if (h.pan) sh.pan = { ...h.pan, t0: h.pan.at != null ? tt(h.pan.at) : t0, t1: h.pan.until != null ? tt(h.pan.until) : h.pan.dur ? (h.pan.at != null ? tt(h.pan.at) : t0) + h.pan.dur : null };
        if (h.zoomMoves) sh.zoomMoves = h.zoomMoves.map(z => ({ ...z, t0: t0 + (typeof z.at === 'number' ? z.at : tt(z.at) - t0) }));
        if (kind === 'split') { const parts = h.split.panels || [h.split.a, h.split.b]; sh.split = { dir: 'v', gap: 10, ...h.split }; sh.parts = parts.map(x => ({ ...x, kind: x.shot, base: SHOT[x.shot] || SHOT.medium, t0, push: x.push ?? 0.03 })); }
        if (h.freeze) sh.freeze = { dur: 1.2, ...h.freeze }; if (kind === 'freeze') sh.freezeT = t0;
        if (h.sfx) sfx.push({ at: t0, ...(typeof h.sfx === 'string' ? { name: h.sfx } : h.sfx) }); else if (h.move === 'whip' && spec.autoSfx !== false) sfx.push({ at: t0 - 0.15, name: 'whoosh_2', gain: -8, dur: 0.6 }); else if (kind === 'freeze') sfx.push({ at: t0, name: 'camera_shutter_1', gain: -6, dur: 0.5 });
        const desc = kind === 'card' ? `card "${(h.card && h.card.title) || ''}"` : kind === 'freeze' ? `freeze "${h.label || ''}"` : `${kind}${h.on ? ' on ' + [].concat(h.on).join('+') : ''}${h.over ? ' over ' + h.over : ''}`;
        rows.push({ t: t0, scene: sc.id, who: '', id: h.id, text: `SHOT ${h.id || i + 1} ${desc}${h.move && h.move !== 'cut' ? ' (' + h.move + ')' : ''}${h.cam ? ' [' + (h.cam.camOpts || h.cam) + ']' : ''}${h.peek ? ' [peek]' : ''}`, shot: true });
        return sh;
      }

      // ------------------------------------------------------------ queries
      const charAt = (sc, id, t) => { const ch = sc.chars[id]; if (!ch) return null; const m = C.moveAt(ch, t); return { ch, x: m.x, lane: m.lane, gy: C.laneY(m.lane), z: m.lane * C.LANE, sc: ch.scale * laneS(m.lane) }; };
      function targetPoint(sc, ref, t, frac = 0.62) {
        if (Array.isArray(ref)) return { x: ref[0], y: ref[1], z: ref[2] || 0, sc: 1 }; const c = charAt(sc, ref, t); if (c) return { x: c.x, y: c.gy - frac * C.standH(c.ch.b) * c.sc, z: c.z, sc: c.sc, gy: c.gy, ch: c.ch };
        const p = sc.props.find(q => q.id === ref); if (p) { const pp = propPos(sc, p, t), sz = B.Props.size(p.kind); return { x: pp.x, y: pp.y - sz[1] * 0.5 * p.scale, z: pp.lane * C.LANE, sc: p.scale, gy: pp.y }; }
        throw new Error(`scene ${sc.id}: target "${ref}" is not a character, prop or [x, y]`);
      }
      function propPos(sc, p, t) { let x = p.x, lane = p.lane, arc = 0; for (const m of p.moves) { if (t >= m.t1) { x = m.to[0]; lane = m.to[1] ?? lane; } else if (t >= m.t0) { const u = eio((t - m.t0) / (m.t1 - m.t0)); x = lerp(x, m.to[0], u); lane = lerp(lane, m.to[1] ?? lane, u); arc = (m.arc || 0) * Math.sin(Math.PI * u); break; } else break; } return { x, y: C.laneY(lane) - arc, lane, arc }; }
      function ctxFor(sc) { return { fps, mouthAt, hasMouth, gx: (ch, P, t) => ({ dirTo: ref => { const tp = ref ? targetPoint(sc, ref, t) : null; if (!tp) return { th: 1.6 }; const hip = ch.b.legL * 1.9, shy = P.y - (hip + ch.b.th - 26) * P.sc, dx = ((tp.x - P.x) * P.mir) / P.sc - 24, dy = (tp.y - shy) / P.sc; return { th: clamp(Math.atan2(dx, dy), -0.6, 3.05) }; } }),
        lookVec: (ch, P, ref, t) => { if (ref === 'camera') return [0, 0.05]; const tp = targetPoint(sc, ref, t, 0.8), hx = P.x, hy = P.y - 300 * P.sc, dx = ((tp.x - hx) * P.mir) / P.sc, dy = (tp.y - hy) / P.sc; return [clamp(dx / 170, -1, 1), clamp(dy / 200, -1, 1)]; } }; }

      // ------------------------------------------------------------ camera: shot -> {x, y (world, y down), z (zoom), r, sx, sy, az, el, tz, fov}
      function follow(sc, ref, t, t0, frac) { const N = 5; let ax = 0, ay = 0, az = 0, s2 = 1, gy = 0; for (let k = 0; k < N; k++) { const tp = targetPoint(sc, ref, Math.max(t0, t - k * 0.09), frac); ax += tp.x; ay += tp.y; az += tp.z || 0; s2 = tp.sc; gy = tp.gy; } return { x: ax / N, y: ay / N, z: az / N, sc: s2, gy }; }
      const eas = (v, u) => (Array.isArray(v) ? lerp(v[0], v[1], eio(u)) : v);
      function frame(sc, sh, t, vp) {
        const b = sh.base || {}, dy = sh.dy ?? b.dy ?? 0.45, cx = vp.x + vp.w / 2, cy = vp.y + vp.h * dy; let x, y, tz = 0, sx = sh.sx ?? cx + (sh.side === 'left' ? -vp.w * 0.1 : sh.side === 'right' ? vp.w * 0.1 : 0) + (sh.offx || 0), sy = sh.sy ?? cy, vw; const lock = sh.lock === true, t0 = sh.t0, first = [].concat(sh.on || [])[0];
        const pt = (id, frac) => (lock ? targetPoint(sc, id, t0, frac) : follow(sc, id, t, t0, frac));
        if (b.home || sh.kind === 'wide') { x = sh.x ?? sc.set.home.x; y = sh.y ?? sc.set.home.y; vw = sh.w || sc.set.wideW; if (first) { const p = pt(first, 0.5); x = p.x; } }
        else if (sh.kind === 'custom') { x = sh.x; y = sh.y; vw = sh.w || 600; }
        else if (b.fit) { const ids = [].concat(sh.on), pa = ids.map(id => pt(id, 0.55)), xs = pa.map(p => p.x); x = (Math.min(...xs) + Math.max(...xs)) / 2; tz = pa.reduce((s, p) => s + p.z, 0) / pa.length; const span = Math.max(...xs) - Math.min(...xs); vw = Math.max(sh.w || 0, (span + 360) * Math.max(...pa.map(p => p.sc)), 560 * pa[0].sc); y = Math.min(...pa.map(p => p.gy)) - 0.5 * 400 * pa[0].sc; }
        else if (b.pov) { const tgt = sh.target ?? sh.look ?? first, p = pt(tgt, 0.55); x = p.x; y = p.y; tz = p.z; vw = sh.w || b.w * (p.sc || 1); }
        else if (b.ots) { const pb = pt(sh.on, b.a), pa = targetPoint(sc, sh.over, t, 0.8); vw = (sh.w || b.w) * pb.sc; x = pb.x; y = pb.y; tz = pb.z; sx = sh.sx ?? (pa.x < pb.x ? cx + vp.w * 0.17 : cx - vp.w * 0.17); }
        else if (b.prop) { const p = pt(first, 0.5); x = p.x; y = p.y; tz = p.z; vw = (sh.w || b.w) * (p.sc || 1); }
        else { const p = pt(first, b.a); x = p.x; y = p.y; tz = p.z; vw = (sh.w || b.w) * p.sc; }
        if (sh.ox) x += sh.ox; if (sh.oy) y += sh.oy;
        const dur = Math.max(0.1, (sh.t1 ?? t0 + 3) - t0), u = clamp((t - t0) / dur); let zk = 1 + (sh.push || 0) * u; const punch = sh.punch ?? b.punch ?? 0; if (punch) zk *= 1 - punch * (1 - eout((t - t0) / 0.28));
        for (const zm of sh.zoomMoves || []) { const d = (t - zm.t0) / zm.dur; if (d > 0) { const e = eout(d), ov = zm.over ? Math.sin(Math.PI * clamp((d - 1) / 0.5)) * zm.over * (d > 1 ? 1 : 0) : 0; zk *= Math.pow(zm.to, Math.min(1, e)) * (1 + ov); } }
        let z = (vp.w / vw) * zk;
        if (sh.pan) { const p = sh.pan, pu = p.t1 ? eio((t - p.t0) / (p.t1 - p.t0)) : eio((t - p.t0) / 2.2); let tx, ty; if (p.to) { const q = Array.isArray(p.to) ? { x: p.to[0], y: p.to[1] } : targetPoint(sc, p.to, t, 0.6); tx = q.x; ty = q.y; } else { tx = x + (p.by ? p.by[0] : 0); ty = y + (p.by ? p.by[1] : 0); } x = lerp(x, tx, pu); y = lerp(y, ty, pu); if (p.zoom) z *= Math.pow(p.zoom, pu); }
        let r = sh.r || 0; const hand = sh.hand == null ? 1 : sh.hand; r += Math.sin(t * 0.7 + 1) * 0.0025 * hand; x += (Math.sin(t * 1.1) * 3 * hand) / z; y += (Math.cos(t * 0.8) * 2.5 * hand) / z; if (b.pov) { r += Math.sin(t * 2.1) * 0.006; y += (Math.sin(t * 5.3) * 4) / z; }
        const orb = typeof sh.orbit === 'number' ? [-sh.orbit / 2, sh.orbit / 2] : sh.orbit; let az = sh.az != null ? eas(sh.az, u) : 0; if (orb) az += eas(orb, u); az += Math.sin(t * 0.5) * 0.6 * hand; const el = eas(sh.el != null ? sh.el : b.el ?? 3, u);
        return { x, y, z, r, sx, sy, az, el, tz, fov: sh.fov };
      }
      const FULL = { x: 0, y: 0, w: W, h: H };
      function shotAt(sc, t) { let k = sc.shots[0]; for (const s of sc.shots) if (t >= s.t0) k = s; return k; }
      const SHOT_FALLBACK = (sc) => ({ kind: 'wide', base: SHOT.wide, i: 0, t0: sc.t0, t1: sc.t1, push: 0 });
      function camAt(sc, t) {
        const sh = shotAt(sc, t); if (sh.kind === 'card') return { x: 0, y: 0, z: 1, r: 0, sx: W / 2, sy: H / 2, az: 0, el: 0, tz: 0, sh };
        let f; if (sh.kind === 'freeze') { const prev = sc.shots[sh.i - 1] || SHOT_FALLBACK(sc); f = frame(sc, ['freeze', 'card', 'split'].includes(prev.kind) ? SHOT_FALLBACK(sc) : prev, sh.t0, FULL); } else if (sh.kind === 'split') f = frame(sc, SHOT_FALLBACK(sc), t, FULL); else f = frame(sc, sh, t, FULL);
        if (sh.move === 'whip' && sh.i > 0) { const dir = sh.dir === 'left' ? -1 : 1, K = (sh.whipDist || 1500) / f.z, wIn = sh.whipIn ?? 0.2, d = t - sh.t0; if (d >= 0 && d < wIn) { f.x -= dir * K * (1 - eout(d / wIn)); f.r += dir * 0.012 * (1 - d / wIn); f.az -= dir * 14 * (1 - eout(d / wIn)); } }
        const nx = sc.shots[sh.i + 1]; if (nx && nx.move === 'whip' && nx.kind !== 'card') { const dir = nx.dir === 'left' ? -1 : 1, wOut = nx.whipOut ?? 0.14, d = t - (nx.t0 - wOut); if (d > 0) { const K = (nx.whipDist || 1500) / f.z, e = Math.pow(eio(clamp(d / wOut)), 2.2); f.x += dir * K * e; f.r -= dir * 0.012 * clamp(d / wOut); f.az += dir * 14 * e; } }
        for (const fx of sc.fx) { const d = t - fx.t; if (fx.type === 'shake' && d >= 0 && d < fx.dur) { const e = Math.exp(-7 * d) * (fx.amp || 14); f.sx += Math.sin(d * 61) * e * (fx.dur < 0.5 ? 1 : 1); f.sy += Math.cos(d * 47) * e * 0.85; f.r += Math.sin(d * 39) * e * 0.0005; } if (fx.type === 'punch' && d >= 0 && d < fx.dur) f.z *= 1 + (fx.amp || 0.08) * (1 - eout(d / fx.dur)); }
        f.sh = sh; return f;
      }

      // ------------------------------------------------------------ world rendering
      const scr = (sc, s, x, yDown, z) => (use3d ? stage.project(x, yDown, z || 0) : B.Camera.toScreen(s, x, yDown));
      function drawWorld(g, sc, t, s, vp, o = {}) {
        if (use3d) { const cv = stage.render(sc, t, s, vp); const k = stage.k; g.drawImage(cv, vp.x * k, vp.y * k, vp.w * k, vp.h * k, vp.x, vp.y, vp.w, vp.h); return; }
        drawWorld2D(g, sc, t, s, vp, o);
      }
      function drawProp2D(g, sc, p, t) { if (t < p.inT || t > p.outT + 0.25) return; if (p.hidden && p.hidden.some(([a, b]) => t >= a && t <= b)) return; const pp = propPos(sc, p, t); let hop = 0; for (const j of p.jolts) { const d = t - j; if (d >= 0 && d < 0.6) hop = Math.exp(-9 * d) * Math.sin(d * 50) * -(p.joltAmp || 9); }
        const pop = p.inT > -1e8 ? 0.6 + 0.4 * B.spring(t - p.inT, 'snappy') : 1; g.save(); g.translate(pp.x, pp.y + hop); const s2 = p.scale * C.laneS(pp.lane) * pop; g.scale(s2, s2); g.rotate(p.rot); B.Props.draw(g, p.kind, p, t); g.restore(); }
      function layerEnv(sc, s, p, t, vp) { const zl = Math.pow(s.z, p), cxl = s.x * p, cyl = s.y * p, pad = 260; return { t, pal: sc.set.pal, z: zl, gy: -B.Sets.HOME_Y * (1 - p), x0: cxl - (s.sx - vp.x + pad) / zl, x1: cxl + (vp.x + vp.w - s.sx + pad) / zl, y0: cyl - (s.sy - vp.y + pad) / zl, y1: cyl + (vp.y + vp.h - s.sy + pad) / zl }; }
      function drawWorld2D(g, sc, t, s, vp) { // fallback: 4-layer parallax set
        g.save(); if (vp !== FULL) { g.beginPath(); g.rect(vp.x, vp.y, vp.w, vp.h); g.clip(); } const layers = sc.set.def.layers; g.fillStyle = sc.set.pal.bg || '#000'; g.fillRect(vp.x, vp.y, vp.w, vp.h);
        layers.forEach(L => { if (L.id === 'fg') return; g.save(); B.Camera.apply(g, s, L.p); L.draw(g, layerEnv(sc, s, L.p, t, vp)); g.restore(); });
        g.save(); B.Camera.apply(g, s, 1); const items = []; const tP = Math.floor(t * 15 + 1e-6) / 15;
        for (const p of sc.props) items.push({ k: p.z === 'front' ? 50 : p.z === 'back' ? -50 : p.lane, f: () => drawProp2D(g, sc, p, t) });
        for (const ch of Object.values(sc.chars)) { if (t < ch.inT || t > ch.outT) continue; const P = C.pose(ch, tP, Object.assign({}, sc.ctx, { tFace: t })); items.push({ k: P.lane + 0.001, f: () => C.draw(g, ch, P, tP) }); }
        items.sort((a, b) => a.k - b.k); for (const it of items) it.f(); g.restore();
        const fgL = layers.find(l => l.id === 'fg'); if (fgL) { g.save(); B.Camera.apply(g, s, fgL.p); fgL.draw(g, layerEnv(sc, s, fgL.p, t, vp)); g.restore(); } g.restore();
      }
      // ---- observer treatments + overlays (screen space, drawn over the 2D or 3D render)
      function bubble(g, sc, s, t, b) { // the one allowed sign gag per video
        const ch = sc.chars[b.who], k = clamp(B.spring(t - b.t0 + 0.12, 'snappy'), 0, 1.15) * (1 - clamp((t - (b.t1 - 0.15)) / 0.15)); if (k <= 0.01) return; const P = C.pose(ch, t, sc.ctx), hp = C.headWorld(ch, P), [px, py] = scr(sc, s, hp.x, hp.y - 80, P.lane * C.LANE);
        g.save(); g.font = '800 46px Inter, sans-serif'; const words = String(b.text).split(' '), max = 560, lines = []; let cur = ''; for (const w of words) { const nx = cur ? cur + ' ' + w : w; if (g.measureText(nx).width > max && cur) { lines.push(cur); cur = w; } else cur = nx; } lines.push(cur);
        const lw = Math.max(...lines.map(l => g.measureText(l).width)), bw = lw + 70, bh = lines.length * 56 + 44, bx = clamp(px - bw / 2, 24, W - bw - 24), by = clamp(py - bh - 50, 80, H - 500);
        g.translate(bx + bw / 2, by + bh); g.scale(k, k); g.translate(-(bx + bw / 2), -(by + bh)); g.beginPath(); g.roundRect(bx, by, bw, bh, b.style === 'thought' ? 44 : 28); g.fillStyle = '#fffdf6'; g.fill(); g.lineWidth = 8; g.strokeStyle = B.Style.ink; g.lineJoin = 'round'; g.stroke();
        const tx = clamp(px, bx + 40, bx + bw - 40); g.beginPath(); g.moveTo(tx - 24, by + bh - 3); g.lineTo(px, py - 8); g.lineTo(tx + 24, by + bh - 3); g.closePath(); g.fillStyle = '#fffdf6'; g.fill(); g.stroke(); g.beginPath(); g.moveTo(tx - 20, by + bh - 4); g.lineTo(tx + 20, by + bh - 4); g.lineWidth = 12; g.strokeStyle = '#fffdf6'; g.stroke();
        g.fillStyle = B.Style.ink; g.textAlign = 'center'; g.textBaseline = 'middle'; lines.forEach((l, i) => g.fillText(l, bx + bw / 2, by + 50 + i * 56)); g.restore(); }
      function dimBlur(g, blur, dark) { g.save(); g.setTransform(1, 0, 0, 1, 0, 0); S2.globalCompositeOperation = 'source-atop'; S2.fillStyle = `rgba(6,5,10,${dark})`; S2.fillRect(0, 0, W, H); S2.globalCompositeOperation = 'source-over'; g.filter = `blur(${blur}px)`; g.drawImage(SCB, 0, 0); g.restore(); }
      function foregroundOts(g, sc, sh, s, t) { const A = sc.chars[sh.over]; if (!A) return; const pa = charAt(sc, sh.over, t), pb = charAt(sc, sh.on, t), left = pa.x < pb.x, P = C.pose(A, Math.floor(t * 15 + 1e-6) / 15, Object.assign({}, sc.ctx, { tFace: t })); P.x = 0; P.y = 0; P.sc = 1; P.mir = left ? 1 : -1; P.a = 0.6;
        S2.setTransform(1, 0, 0, 1, 0, 0); S2.clearRect(0, 0, W, H); S2.save(); S2.translate(left ? -30 : W + 30, H * 0.99 + 40); const k = sh.fgScale || 2.6; S2.scale(k, k); C.draw(S2, A, P, t, { back: true }); S2.restore(); dimBlur(g, 6, 0.42); }
      function peekOccluder(g, sc, sh, t) { const pk = sh.peek || {}, kind = pk.prop || 'barrel', side = pk.side || 'left', k = pk.scale || 4.2; S2.setTransform(1, 0, 0, 1, 0, 0); S2.clearRect(0, 0, W, H); S2.save(); const sway = Math.sin(t * 0.9) * 4 + (pk.creep ? (t - sh.t0) * 40 : 0); S2.translate(side === 'left' ? W * 0.02 + sway : side === 'right' ? W * 0.98 - sway : W / 2, side === 'bottom' ? H * 1.04 : H * 1.02 + (pk.y || 0)); if (side === 'right') S2.scale(-1, 1); S2.scale(k, k); B.Props.draw(S2, kind, { color: pk.color }, t); S2.restore(); dimBlur(g, pk.blur ?? 7, pk.dark ?? 0.62);
        const vg = g.createRadialGradient(W / 2, H * 0.42, W * 0.35, W / 2, H * 0.42, W * 0.95); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.5)'); g.fillStyle = vg; g.fillRect(0, 0, W, H); }
      function overCrowd(g, sc, sh, t) { S2.setTransform(1, 0, 0, 1, 0, 0); S2.clearRect(0, 0, W, H); for (let i = 0; i < 5; i++) { const x = ((i + 0.5) / 5) * W + (hash(i * 3.1) - 0.5) * 90, y = H * (1.0 - 0.02 * hash(i)) + Math.sin(Math.floor(t * 15) * 0.5 + i) * 3, r = 150 + 40 * hash(i + 4); S2.beginPath(); S2.ellipse(x, y, r * 1.3, r * 1.5, 0, 0, TAU); S2.fillStyle = '#10141b'; S2.fill(); S2.beginPath(); S2.arc(x, y - r * 1.55, r * 0.75, 0, TAU); S2.fill(); } dimBlur(g, 7, 0.25); }
      function windowFrame(g, sc, sh, t) { g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = '#0B0F14'; g.beginPath(); g.rect(0, 0, W, H); g.roundRect(120, 360, W - 240, 900, 18); g.fill('evenodd'); g.strokeStyle = '#2A3647'; g.lineWidth = 16; g.beginPath(); g.roundRect(120, 360, W - 240, 900, 18); g.moveTo(W / 2, 360); g.lineTo(W / 2, 1260); g.stroke(); g.fillStyle = 'rgba(11,15,20,.35)'; for (let y = 380; y < 1260; y += 28) g.fillRect(130, y, W - 260, 12); g.restore(); }
      function povMask(g, sh) { const m = sh.mask || 'eyes'; if (m === 'none') return; g.save(); g.setTransform(1, 0, 0, 1, 0, 0); const cx = W / 2, cy = H * 0.45; if (m === 'binoc') { g.fillStyle = '#000'; g.beginPath(); g.rect(0, 0, W, H); g.arc(cx - 250, cy, 330, 0, TAU); g.moveTo(cx + 580, cy); g.arc(cx + 250, cy, 330, 0, TAU); g.fill('evenodd'); } else if (m === 'ring') { g.fillStyle = '#0B0F14'; g.beginPath(); g.rect(0, 0, W, H); g.arc(cx, cy, 470, 0, TAU); g.fill('evenodd'); g.lineWidth = 22; g.strokeStyle = '#8a6a3a'; g.beginPath(); g.arc(cx, cy, 480, 0, TAU); g.stroke(); } else { const vg = g.createRadialGradient(cx, cy, W * 0.28, cx, cy, W * 0.85); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(0.7, 'rgba(0,0,0,.55)'); vg.addColorStop(1, 'rgba(0,0,0,.92)'); g.fillStyle = vg; g.fillRect(0, 0, W, H); } g.restore(); }
      function filterOverlay(g, css) { S2.setTransform(1, 0, 0, 1, 0, 0); S2.drawImage(Cv === g.canvas ? Cv : g.canvas, 0, 0); g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.filter = css; g.drawImage(SCB, 0, 0); g.restore(); }
      function secCamOverlay(g, sh, t) { const o = sh.camOpts || {}; g.save(); g.setTransform(1, 0, 0, 1, 0, 0); S2.setTransform(1, 0, 0, 1, 0, 0); S2.drawImage(g.canvas, 0, 0); g.filter = 'grayscale(0.4) contrast(1.15) brightness(0.9)'; g.drawImage(SCB, 0, 0); g.filter = 'none';
        const q = Math.floor(t * 12); g.fillStyle = 'rgba(0,0,0,.14)'; for (let y = 0; y < H; y += 6) g.fillRect(0, y, W, 2); for (let i = 0; i < 380; i++) { g.fillStyle = `rgba(255,255,255,${0.05 + 0.1 * hash(i + q)})`; g.fillRect(hash(q * 17.3 + i * 1.77) * W, hash(q * 3.1 + i * 9.13) * H, 3 + hash(i * 2.2) * 6, 2); }
        const gl = hash(Math.floor(t * 3) * 5.1); if (gl > 0.86) { const y = hash(Math.floor(t * 3) * 1.3) * H; g.drawImage(SCB, 0, y, W, 60, 24, y, W, 60); }
        g.strokeStyle = '#0B0F14'; g.lineWidth = 8; g.beginPath(); g.roundRect(4, 4, W - 8, H - 8, 22); g.stroke(); g.font = '800 34px JBM, monospace'; g.textBaseline = 'top'; g.fillStyle = '#e8f5e0'; g.shadowColor = 'rgba(0,0,0,.8)'; g.shadowBlur = 4; g.textAlign = 'left'; g.fillText(o.label || 'CAM 2 · ILLUSTRATION', 56, 300); g.shadowBlur = 0; g.restore(); }
      function sketchFilter(g, t) { g.save(); g.setTransform(1, 0, 0, 1, 0, 0); S2.setTransform(1, 0, 0, 1, 0, 0); S2.drawImage(g.canvas, 0, 0); g.fillStyle = '#d9c6a0'; g.fillRect(0, 0, W, H); g.globalCompositeOperation = 'multiply'; g.filter = 'grayscale(1) contrast(3.2) brightness(1.25)'; g.drawImage(SCB, 0, 0); g.filter = 'none'; g.globalCompositeOperation = 'source-over'; g.fillStyle = 'rgba(210,190,150,.25)'; g.fillRect(0, 0, W, H); g.fillStyle = 'rgba(200,170,120,.9)'; g.fillRect(W / 2 - 150, 24, 300, 56); g.fillStyle = '#0B0F14'; g.font = '800 26px JBM, monospace'; g.textAlign = 'center'; g.fillText('COURT SKETCH', W / 2, 52); g.restore(); }
      function impactFrame(g, fx, t, sc, s) { // bible: 2 frames. A = Paper full frame + Ink silhouette + torn wedges; B = series accent + Paper silhouette. Max 3 per Short.
        const n = Math.floor((t - fx.t) * fps + 1e-6), A = n % 2 === 0, bg = A ? '#F5F3EE' : (fx.accent || '#FF3B30'), fgc = A ? '#0B0F14' : '#F5F3EE'; let cx = W / 2, cy = H * 0.42, sil = null;
        if (fx.on) { const tp = targetPoint(sc, fx.on, t, 0.5), p = scr(sc, s, tp.x, tp.y, tp.z); cx = p[0]; cy = p[1]; sil = sc.o3 && sc.o3.chars[fx.on]; }
        g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = bg; g.fillRect(0, 0, W, H);
        if (sil && sil.cache && sil.lastP) { const ch = sil.ch, f = stage.project(sil.lastP.x, 0, sil.lastP.z), top = stage.project(sil.lastP.x, -C.standH(ch.b) * ch.scale, sil.lastP.z), hpx = Math.abs(f[1] - top[1]) * (640 / (C.standH(ch.b) * 0.93 * 1.0)) / (640 / (C.standH(ch.b))), k = Math.abs(f[1] - top[1]) / (C.standH(ch.b) * ch.scale) * ch.scale; void hpx; S2.setTransform(1, 0, 0, 1, 0, 0); S2.clearRect(0, 0, W, H); const cw = sil.cache.c.width / sil.cache.dens * k, chh = sil.cache.c.height / sil.cache.dens * k; S2.drawImage(sil.cache.c, f[0] - cw / 2, f[1] - chh * 0.93, cw, chh); S2.globalCompositeOperation = 'source-in'; S2.fillStyle = fgc; S2.fillRect(0, 0, W, H); S2.globalCompositeOperation = 'source-over'; g.drawImage(SCB, 0, 0); }
        g.fillStyle = fgc; const N = 16; for (let i = 0; i < N; i++) { const a = (i / N) * TAU + (hash(i * 3.3) - 0.5) * 0.3, w = 0.03 + 0.05 * hash(i * 7.7), r0 = 200 + 220 * hash(i * 1.9), r1 = 2400; g.beginPath(); g.moveTo(cx + Math.cos(a - w) * r0, cy + Math.sin(a - w) * r0); for (let k = 1; k < 6; k++) { const rr = r0 + ((r1 - r0) * k) / 6, jig = (hash(i * 5 + k) - 0.5) * 18; g.lineTo(cx + Math.cos(a - w * (1 - k / 6)) * rr + jig, cy + Math.sin(a - w * (1 - k / 6)) * rr + jig); } g.lineTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1); g.lineTo(cx + Math.cos(a + w) * r0, cy + Math.sin(a + w) * r0); g.closePath(); g.fill(); }
        g.restore(); }
      function speedLines(g, fx, t) { const k = 1 - (t - fx.t) / fx.dur; g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = 'rgba(245,243,238,.8)'; const dir = fx.dir === 'left' ? -1 : 1; for (let i = 0; i < 16; i++) { const y = hash(i * 2.1) * H, len = 400 + 600 * hash(i * 7.3), x = ((hash(i * 4.4) * W * 1.4) + (t - fx.t) * 2600 * dir) % (W * 1.4) - 200; g.fillRect(dir > 0 ? x : W - x - len, y, len, 4 + 5 * hash(i)); } g.globalAlpha = k; g.restore(); }
      function tensionLines(g, fx, t) { g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = 'rgba(11,15,20,.55)'; const q = Math.floor(t * 15); for (let i = 0; i < 40; i++) { const x = (i + 0.5) * (W / 40) + (hash(q * 0.7 + i) - 0.5) * 12; g.fillRect(x, 0, 3 + 4 * hash(i * 3.1), H * (0.35 + 0.4 * hash(q + i))); g.fillRect(x, H * (1 - 0.35 - 0.4 * hash(q + i * 2)), 3 + 4 * hash(i * 1.1), H); } g.restore(); }
      function card(g, sh, t) { const c = sh.card || {}, u = t - sh.t0, pal = Object.assign({ bg: '#0B0F14', fg: '#F5F3EE', accent: '#F2B705' }, c); g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = pal.bg; g.fillRect(0, 0, W, H);
        if (c.tag) { g.font = '800 40px JBM, monospace'; g.fillStyle = pal.accent; g.textAlign = 'center'; g.fillText(c.tag, W / 2, H * 0.3); }
        const words = String(c.title || '').split(' '), size = c.size || 190, lines = []; g.font = `${size}px Anton, Impact, sans-serif`; let cur = ''; for (const w of words) { const nx = cur ? cur + ' ' + w : w; if (g.measureText(nx).width > W - 160 && cur) { lines.push(cur); cur = w; } else cur = nx; } lines.push(cur);
        g.textAlign = 'center'; g.textBaseline = 'middle'; lines.forEach((l, i) => { const k = clamp(B.spring(u - i * 0.12, 'snappy'), 0, 1.2); g.save(); g.translate(W / 2, H * 0.42 + (i - (lines.length - 1) / 2) * size * 1.05); g.scale(0.7 + 0.3 * k, 0.7 + 0.3 * k); g.globalAlpha = clamp(k * 3); g.fillStyle = pal.fg; g.fillText(l, 0, 0); g.restore(); });
        if (c.sub) { const k = clamp(B.spring(u - 0.35, 'snappy'), 0, 1.1); g.font = '800 54px Inter, sans-serif'; g.fillStyle = pal.accent; g.globalAlpha = clamp(k * 2); g.fillText(String(c.sub).toUpperCase(), W / 2, H * 0.5 + 250); } g.restore(); }
      function freezeOverlay(g, sh, sc, s, t) { // bible 5.4: picture desaturated to 30 %, 14 px Paper border, Anton name plate + mono role tag slam in with a shutter flash
        const u = t - sh.t0, fr = sh.freeze || {}; g.save(); g.setTransform(1, 0, 0, 1, 0, 0); S2.setTransform(1, 0, 0, 1, 0, 0); S2.drawImage(g.canvas, 0, 0); g.filter = 'saturate(0.3)'; g.drawImage(SCB, 0, 0); g.filter = 'none';
        g.lineWidth = 28; g.strokeStyle = '#F5F3EE'; g.strokeRect(14, 14, W - 28, H - 28); const label = sh.label || fr.label, role = sh.role || fr.role;
        if (label) { const k = clamp(B.spring(u - 0.1, { f: 2.4, z: 0.5 }), 0, 1.25), size = fr.size || 120; g.font = `${size}px Anton, Impact, sans-serif`; const bw = g.measureText(label).width + 90, bh = size * 1.15 + (role ? 70 : 30), bx = fr.x ?? W / 2, by = fr.y ?? H * 0.3;
          g.translate(bx, by); g.scale(k, k); g.rotate(-0.03); g.beginPath(); g.roundRect(-bw / 2, -bh / 2, bw, bh, 8); g.fillStyle = '#F5F3EE'; g.fill(); g.lineWidth = 7; g.strokeStyle = '#0B0F14'; g.stroke(); g.fillStyle = '#0B0F14'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(label, 0, role ? -22 : 4); if (role) { g.font = '800 34px JBM, monospace'; g.fillStyle = '#FF3B30'; g.fillText(role, 0, bh / 2 - 36); } }
        const F = Math.exp(-u * 18); if (F > 0.02) { g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = `rgba(255,255,255,${F})`; g.fillRect(0, 0, W, H); } g.restore(); }
      function drawOverlay(g, o, t) { const k = clamp(B.spring(t - o.t0, 'snappy'), 0, 1.15); g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.translate(o.x ?? W / 2, o.y ?? H * 0.2); g.scale(k, k); g.rotate(o.rot || 0); g.font = `${o.size || 80}px ${o.font || 'Anton, Impact, sans-serif'}`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.lineJoin = 'round'; g.lineWidth = 14; g.strokeStyle = B.Style.ink; g.strokeText(o.text, 0, 0); g.fillStyle = o.color || '#fffdf6'; g.fillText(o.text, 0, 0); g.restore(); }

      function drawScene(g, sc, t) {
        const sh = shotAt(sc, t); let tw = t; if (sh.cam === 'security') { const f2 = (sh.camOpts && sh.camOpts.fps) || 12; tw = Math.floor(t * f2) / f2; }
        if (sh.kind === 'card') { card(g, sh, t); return; }
        if (sh.kind === 'split') { const sp = sh.split, v = sp.dir === 'v', gap = sp.gap, n = sh.parts.length; const vps = []; for (let i = 0; i < n; i++) { const a = Math.round(((v ? W : H) - gap * (n - 1)) / n); vps.push(v ? { x: i * (a + gap), y: 0, w: a, h: H } : { x: 0, y: i * (a + gap), w: W, h: a }); }
          sh.parts.forEach((p, i) => { const f = frame(sc, { ...p, t0: sh.t0, t1: sh.t1 }, tw, vps[i]); drawWorld(g, sc, tw, f, vps[i]); }); g.save(); g.fillStyle = sp.color || '#0B0F14'; vps.slice(1).forEach(vp => { if (v) g.fillRect(vp.x - gap, 0, gap, H); else g.fillRect(0, vp.y - gap, W, gap); }); if (sp.badges) { g.font = '120px Anton, Impact, sans-serif'; g.textAlign = 'center'; g.fillStyle = '#F5F3EE'; vps.forEach((vp, i) => { g.strokeStyle = '#0B0F14'; g.lineWidth = 12; g.strokeText(String(i + 1), vp.x + 90, vp.y + 130); g.fillText(String(i + 1), vp.x + 90, vp.y + 130); }); } g.restore(); return; }
        const s = camAt(sc, tw), tFrame = sh.kind === 'freeze' ? sh.freezeT : tw; drawWorld(g, sc, tFrame, s, FULL);
        if (sh.base.ots) foregroundOts(g, sc, sh, s, tFrame); if (sh.peek) peekOccluder(g, sc, sh, tFrame); if (sh.overcrowd) overCrowd(g, sc, sh, tFrame); if (sh.window) windowFrame(g, sc, sh, tFrame); if (sh.base.pov) povMask(g, sh);
        for (const b of sc.bubbles) if (t >= b.t0 - 0.1 && t <= b.t1) bubble(g, sc, s, t, b); for (const o of sc.overlays) if (t >= o.t0 && t <= o.t1) drawOverlay(g, o, t);
        for (const fx of sc.fx) { const d = t - fx.t; if (d < 0 || d >= fx.dur) continue; if (fx.type === 'flash') { g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = fx.color || '#fff'; g.globalAlpha = (1 - d / fx.dur) * (fx.amp ?? 0.9); g.fillRect(0, 0, W, H); g.restore(); } if (fx.type === 'speedlines') speedLines(g, fx, t); if (fx.type === 'tension') tensionLines(g, fx, t); }
        if (sh.kind === 'freeze') freezeOverlay(g, sh, sc, s, t); if (sh.cam === 'security') secCamOverlay(g, sh, t); if (sh.cam === 'sketch') sketchFilter(g, t);
        for (const fx of sc.fx) if (fx.type === 'impact' && t >= fx.t && t < fx.t + fx.dur - 1e-6) impactFrame(g, fx, t, sc, s);
      }
      function sceneIdx(t) { let i = 0; for (let j = 0; j < scenes.length; j++) if (t >= scenes[j].t0) i = j; return i; }
      function composite(g, t) {
        const i = sceneIdx(t), sc = scenes[i], nx = scenes[i + 1], pv = scenes[i - 1]; let tr = null;
        if (nx && nx.src.transition && (nx.src.transition.dur || 0) > 0 && nx.src.transition.type !== 'cut') { const d = nx.src.transition.dur, b = nx.t0; if (t >= b - d / 2 && t < b) tr = { a: sc, b: nx, u: (t - (b - d / 2)) / d, def: nx.src.transition }; }
        if (!tr && pv && sc.src.transition && (sc.src.transition.dur || 0) > 0 && sc.src.transition.type !== 'cut') { const d = sc.src.transition.dur; if (t < sc.t0 + d / 2) tr = { a: pv, b: sc, u: (t - (sc.t0 - d / 2)) / d, def: sc.src.transition }; }
        if (!tr) { drawScene(g, sc, t); return; }
        const u = clamp(tr.u), type = tr.def.type; drawScene(g, tr.a, t);
        const second = () => { FG2.setTransform(1, 0, 0, 1, 0, 0); drawScene(FG2, tr.b, t); };
        if (type === 'fade') { second(); g.save(); g.globalAlpha = eio(u); g.drawImage(FRM2, 0, 0); g.restore(); }
        else if (type === 'dip' || type === 'flash') { const col = tr.def.color || (type === 'flash' ? '#fff' : '#000'), k = u < 0.5 ? u * 2 : 2 - u * 2; if (u >= 0.5) drawScene(g, tr.b, t); g.save(); g.fillStyle = col; g.globalAlpha = eio(k); g.fillRect(0, 0, W, H); g.restore(); }
        else if (type === 'whip' || type === 'slide') { // 2D smear: both scenes are rendered once, then N shifted copies are averaged (cheap directional motion blur)
          const dir = tr.def.dir === 'right' ? 1 : -1, dist = (tr.def.dist || 1.15) * W, N = tr.def.blur ?? 8, span = tr.def.smear ?? 0.22; second(); FG.setTransform(1, 0, 0, 1, 0, 0); FG.clearRect(0, 0, W, H); FG.drawImage(g.canvas, 0, 0);
          S2.setTransform(1, 0, 0, 1, 0, 0); S2.globalAlpha = 1; S2.clearRect(0, 0, W, H);
          for (let j = 0; j < N; j++) { const uj = clamp(u + (N > 1 ? (j / (N - 1) - 0.5) * span : 0)), e = eio(uj); S1.setTransform(1, 0, 0, 1, 0, 0); S1.globalAlpha = 1; S1.fillStyle = '#000'; S1.fillRect(0, 0, W, H); S1.drawImage(FRM, dir * e * dist, 0); S1.drawImage(FRM2, dir * (e - 1) * dist, 0); S2.globalAlpha = 1 / (j + 1); S2.drawImage(SCR, 0, 0); }
          S2.globalAlpha = 1; g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.drawImage(SCB, 0, 0); g.restore(); }
        else if (type === 'wipe') { second(); g.save(); g.beginPath(); g.rect(0, 0, W * eio(u), H); g.clip(); g.drawImage(FRM2, 0, 0); g.restore(); g.fillStyle = B.Style.ink; g.fillRect(W * eio(u) - 6, 0, 12, H); }
        else if (type === 'iris') { second(); g.save(); g.beginPath(); g.arc(tr.def.x ?? W / 2, tr.def.y ?? H * 0.45, eio(u) * 1500, 0, TAU); g.clip(); g.drawImage(FRM2, 0, 0); g.restore(); }
        else { second(); }
      }
      // ------------------------------------------------------------ captions (same look as the infographic engine)
      const capO = spec.captions === false ? null : { size: 66, y: B.L.cap.y, maxWords: B.L.cap.maxWords, maxChars: B.L.cap.maxChars, width: B.L.cap.width, lh: B.L.cap.lh, emph: {}, hide: [], ...(spec.captions || {}) }; let chunks = [];
      if (capO) { const toks = (voice.words || []).map(w => ({ ...w })); let cur = []; const flush = () => { if (cur.length) chunks.push(cur); cur = []; };
        toks.forEach((w, i) => { const len = cur.reduce((a, x) => a + x.w.length + 1, 0); if (cur.length && (len + w.w.length > capO.maxChars || cur.length >= capO.maxWords)) flush(); cur.push(w); const nx = toks[i + 1]; if (/[.?!]$/.test(w.w) || (nx && nx.s - w.e > 0.35)) flush(); }); flush(); chunks = chunks.map((ws, i, all) => { const nx = all[i + 1], end = ws[ws.length - 1].e; return { s: ws[0].s, e: nx && nx[0].s - end < 0.5 ? nx[0].s : end + 0.3, ws }; }); }
      function captions(g, t) {
        if (!capO || capO.hide.some(([a, b]) => t >= T(a) && t < T(b))) return; const sc = scenes[sceneIdx(t)], sh = shotAt(sc, t); if (sh.nocaps || sh.kind === 'card') return; const ch = chunks.find(c => t >= c.s && t < c.e); if (!ch) return;
        const k = clamp(B.spring(t - ch.s + 0.12, 'stiff'), 0, 1.15); g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.font = B.F.cap(capO.size); const sp = g.measureText(' ').width, lines = [[]]; let lw = 0;
        for (const w of ch.ws) { const s = w.w.toUpperCase(), ww = g.measureText(s).width; if (lw + ww > capO.width && lines[lines.length - 1].length) { lines.push([]); lw = 0; } lines[lines.length - 1].push({ s, ww, w }); lw += ww + sp; }
        g.translate(W / 2, capO.y - ((lines.length - 1) * capO.lh) / 2); g.scale(0.86 + 0.14 * k, 0.86 + 0.14 * k); g.globalAlpha = clamp(k * 1.6); g.textAlign = 'center'; g.textBaseline = 'middle'; g.lineJoin = 'round';
        lines.forEach((ln, li) => { const tw = ln.reduce((a, p) => a + p.ww, 0) + sp * (ln.length - 1); let px = -tw / 2; for (const p of ln) { const act = t >= p.w.s - 0.05, em = capO.emph[norm(p.w.w)]; g.save(); g.translate(px + p.ww / 2, li * capO.lh); g.lineWidth = 15; g.strokeStyle = 'rgba(6,8,11,.94)'; g.strokeText(p.s, 0, 0); g.fillStyle = act ? (em || (t < p.w.e + 0.05 ? '#FFD60A' : '#F5F3EE')) : 'rgba(245,243,238,.62)'; g.fillText(p.s, 0, 0); g.restore(); px += p.ww + sp; } });
        g.restore(); }
      function inTransition(t) { const i = sceneIdx(t), sc = scenes[i], nx = scenes[i + 1]; for (const q of [sc, nx]) { if (!q || !q.src.transition) continue; const d = q.src.transition.dur || 0; if (d > 0 && q.src.transition.type !== 'cut' && Math.abs(t - q.t0) < d / 2) return true; } return false; }
      function speed(t) { if (inTransition(t)) return 0; const sc = scenes[sceneIdx(t)], a = camAt(sc, t), b = camAt(sc, t - 1 / fps); let sp = Math.hypot((a.x - b.x) * a.z + (a.sx - b.sx), (a.y - b.y) * a.z + (a.sy - b.sy)) + Math.abs(Math.log(a.z / b.z)) * 700 + Math.abs(a.az - b.az) * 40; const nx = scenes[sceneIdx(t) + 1]; for (const q of [sc, nx]) { if (!q || !q.src.transition) continue; const d = q.src.transition.dur || 0, ty = q.src.transition.type; if ((ty === 'whip' || ty === 'slide') && d > 0 && Math.abs(t - q.t0) < d / 2 + 0.05) sp = Math.max(sp, 380); } return sp; }
      window.render = function (t) {
        const sp = spec.motionBlur === false ? 0 : speed(t), n = sp > 260 ? 6 : sp > 150 ? 4 : sp > 70 ? 3 : sp > 40 ? 2 : 1;
        if (n === 1) { X.setTransform(1, 0, 0, 1, 0, 0); composite(X, t); } else { for (let k = 0; k < n; k++) { S1.setTransform(1, 0, 0, 1, 0, 0); composite(S1, t - (k / n) * (0.9 / fps)); AG.globalAlpha = 1 / (k + 1); AG.setTransform(1, 0, 0, 1, 0, 0); AG.drawImage(SCR, 0, 0); } AG.globalAlpha = 1; X.setTransform(1, 0, 0, 1, 0, 0); X.drawImage(ACC, 0, 0); }
        X.save(); X.setTransform(1, 0, 0, 1, 0, 0); const vg = X.createRadialGradient(W / 2, H * 0.44, W * 0.5, W / 2, H * 0.5, H * 0.75); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, `rgba(0,0,0,${spec.vignette ?? 0.22})`); X.fillStyle = vg; X.fillRect(0, 0, W, H); X.restore();
        captions(X, t); hud(X, t);
        if (spec.grain !== false && B.makeGrain) { if (!B.grainPattern) B.grainPattern = X.createPattern(B.makeGrain(256), 'repeat'); X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.globalAlpha = spec.grain ?? 0.18; X.globalCompositeOperation = 'multiply'; X.fillStyle = B.grainPattern; X.fillRect(0, 0, W, H); X.restore(); }
      };
      function hud(g, t) { const h = spec.hud; if (!h) return; g.save(); g.setTransform(1, 0, 0, 1, 0, 0); if (h.pill) { const [px, py, ph, pf] = B.L.pill; g.font = B.F.cap(pf); const pw = g.measureText(h.pill).width + 44; B.rr(g, px, py, pw, ph, 8); g.fillStyle = h.pillColor || '#FF3B30'; g.fill(); B.txt(g, h.pill, px + pw / 2, py + ph / 2 + 1, B.F.cap(pf), h.pillInk || '#F5F3EE'); if (h.title) B.txt(g, h.title, px + pw + 20, py + ph / 2 + 1, B.F.mono(26), 'rgba(245,243,238,.9)', 'left'); } if (h.footnote) [].concat(h.footnote).forEach((ln, i) => B.txt(g, ln, B.L.foot.x, B.L.foot.y + i * B.L.foot.dy, B.F.mono(B.L.foot.size), 'rgba(245,243,238,.6)', 'left')); g.restore(); }
      for (const s of spec.sfx || []) sfx.push({ ...s, at: T(s.at) });
      window.BM2_SFX = { duration: spec.duration, sfx: sfx.sort((a, b) => a.at - b.at).map(s => ({ gain: -8, dur: 1, ...s, at: +Math.max(0, s.at).toFixed(3) })), bed: spec.bed || null };
      rows.sort((a, b) => a.t - b.t);
      const shotList = []; scenes.forEach(sc => sc.shots.forEach(sh => shotList.push({ id: sh.id || `${sc.id}.${sh.i + 1}`, scene: sc.id, t0: sh.t0, t1: sh.t1, key: sh.key != null ? sh.key : sh.t0 + 0.6 * (sh.t1 - sh.t0), kind: sh.kind, on: sh.on, text: (voice.words || []).filter(w => w.s >= sh.t0 - 1e-6 && w.s < sh.t1).map(w => w.w).join(' ') })));
      B.debug = { stage, scenes, rows, warns, T, chunks, shots: shotList, beats: rows.filter(r => r.shot).map(r => ({ t: r.t, beat: r.text.replace(/^SHOT /, ''), focus: '', st: r.scene, pose: '' })), cam: camAt, shotAt };
      B.boardInfo = () => shotList; warns.forEach(w => console.warn(w));
    } catch (e) { err = e; console.error('BM2 story error: ' + e.message + '\n' + (e.stack || '').split('\n').slice(0, 3).join(' | ')); window.render = () => { X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = '#300'; X.fillRect(0, 0, W, H); X.fillStyle = '#fff'; X.font = '28px monospace'; X.textBaseline = 'top'; let y = 300; for (const ln of ('BM2 STORY ERROR\n' + e.message).match(/.{1,56}/g)) { X.fillText(ln, 60, y); y += 40; } }; } }
    const base = B.base || '', fontList = [['Anton', 'anton-latin-400-normal.woff2', '400'], ['Inter', 'inter-latin-600-normal.woff2', '600'], ['Inter', 'inter-latin-800-normal.woff2', '800'], ['JBM', 'jetbrains-mono-latin-700-normal.woff2', '700'], ['JBM', 'jetbrains-mono-latin-800-normal.woff2', '800']];
    window.ready = Promise.all(fontList.map(([f, u, w]) => new FontFace(f, `url(${base}fonts/${u})`, { weight: w }).load().then(ff => document.fonts.add(ff)))).then(() => { build(); window.render(0); if (err) throw err; });
  };
  // Storyboard table (markdown) from the compiled story: one row per action / shot. `node bm2.cjs board <dir>` also writes keyframe contact sheets.
  B.storyBoard = function () { const d = B.debug; if (!d) return ''; const f = t => t.toFixed(2).padStart(5); const out = ['| time | scene | who | action / shot |', '|---|---|---|---|']; for (const r of d.rows) out.push(`| ${f(r.t)} | ${r.scene} | ${r.who || ''} | ${r.text} |`); return out.join('\n'); };
})();
