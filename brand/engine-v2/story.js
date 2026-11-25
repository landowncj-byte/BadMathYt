// Bad Math engine v2 — STORY: scene/sequence compiler + shot/camera system for animated story scenes.
// Load order: primitives.js, camera.js, faces.js, cast.js, props.js, sets.js, engine.js (exports makeT), story.js, voice.js, scene.js
//   BM2.story({ cast, scenes:[ {id, at, set, props, blocking, actions, shots, fx, transition} ], duration, captions, sfx, bed })
// Authoring format and every verb are documented in brand/engine-v2/CHARACTERS.md. Everything is a pure function of time (seek(t)).
(function () {
  const B = window.BM2, C = B.Cast, SETS = B.Sets, { W, H, clamp, lerp, hash, ease } = B, TAU = Math.PI * 2, eio = C.eio, eout = C.eout, ss = C.ss;
  const sgn = v => (v < 0 ? -1 : 1);
  // ----------------------------------------------------------------- shot library
  // w = world px visible across the frame (before character scale), a = height of the framed point above the ground as a share of the standing height,
  // dy = where the framed point lands on screen as a share of H. Add or tweak sizes here (art direction hook).
  const SHOT = B.SHOTS = {
    wide:    { home: true, dy: 0.47 },
    full:    { w: 560, a: 0.5, dy: 0.5 },
    medium:  { w: 430, a: 0.66, dy: 0.44 },
    cu:      { w: 270, a: 0.8, dy: 0.4 },       // head and shoulders
    ecu:     { w: 150, a: 0.82, dy: 0.4 },      // eyes / mouth
    reaction:{ w: 250, a: 0.8, dy: 0.4, punch: 0.1 }, // fast cut-in close-up with a little push-in
    two:     { fit: true, dy: 0.45 },
    ots:     { w: 330, a: 0.8, dy: 0.4, ots: true },
    pov:     { w: 520, a: 0.55, dy: 0.45, pov: true },
    prop:    { w: 380, a: 0.5, dy: 0.42, prop: true },
    custom:  { dy: 0.45 },
  };
  B.story = function (spec) {
    const voice = spec.voice || window.BM2_VOICE || { words: [], mouth: [] }, T = B.makeT(voice.words || [], voice.paragraphs), fps = spec.fps || 30;
    if (spec.style) { Object.assign(B.Style, spec.style); C.clearFaceCache(); }
    const Cv = document.getElementById('c') || document.body.appendChild(Object.assign(document.createElement('canvas'), { id: 'c' })); Cv.width = W; Cv.height = H; const X = Cv.getContext('2d');
    const mk = () => { const c = document.createElement('canvas'); c.width = W; c.height = H; return [c, c.getContext('2d')]; };
    const [SCR, S1] = mk(), [SCB, S2] = mk(), [ACC, AG] = mk(), [FRM, FG] = mk(), [FRM2, FG2] = mk();
    let err = null;
    const mouthSeries = id => (voice.mouths && voice.mouths[id]) || voice.mouth || [];
    const mouthAt = (id, t) => { const m = mouthSeries(id); if (!m.length) return 0; const f = t * 30, i = Math.floor(f), u = f - i; return lerp(m[clamp(i, 0, m.length - 1)] || 0, m[clamp(i + 1, 0, m.length - 1)] || 0, u); };
    const visemeAt = t => { const ws = voice.words || []; for (const w of ws) if (t >= w.s && t <= w.e) { const s = B.norm(w.w), i = Math.min(s.length - 1, Math.floor(((t - w.s) / Math.max(0.01, w.e - w.s)) * s.length)), ch = s[i] || 'a'; return { round: /[ouwq]/.test(ch) ? 1 : 0, wide: /[ei]/.test(ch) ? 1 : 0 }; } return null; };
    function build() { try {
      const sfx = [], rows = []; // rows = storyboard rows
      const tt = v => (v == null ? null : T(v));
      const scenesIn = spec.scenes || []; if (!scenesIn.length) throw new Error('story needs at least one scene');
      const scenes = scenesIn.map((s, si) => compileScene(s, si));
      // scene time ranges (a scene runs until the next one starts)
      scenes.forEach((sc, i) => { sc.t1 = scenes[i + 1] ? scenes[i + 1].t0 : spec.duration; });
      scenes.forEach((sc, i) => { const next = scenes[i + 1]; sc.trans = next ? Object.assign({ type: 'cut', dur: 0 }, next.src.transition || {}) : null; if (sc.trans && sc.trans.type === 'cut') sc.trans.dur = 0; });
      scenes.forEach(sc => { sc.shots.forEach((sh, i) => { sh.t1 = sc.shots[i + 1] ? sc.shots[i + 1].t0 : sc.t1; }); });

      // ------------------------------------------------------------ scene compile
      function compileScene(s, si) {
        const sc = { src: s, id: s.id || 's' + (si + 1), t0: tt(s.at ?? 0), chars: {}, props: [], shots: [], fx: [], bubbles: [], overlays: [], propHide: [] };
        const setDef = typeof s.set === 'string' ? { kind: s.set } : (s.set || { kind: 'studio' }), kind = SETS.sets[setDef.kind]; if (!kind) throw new Error(`scene ${sc.id}: unknown set "${setDef.kind}". Sets: ${Object.keys(SETS.sets).join(', ')}`);
        sc.set = { def: kind, pal: Object.assign({}, kind.palette, spec.setPalette && spec.setPalette[setDef.kind], setDef.palette), home: setDef.home || kind.home, wideW: setDef.wideW || kind.wideW };
        // cast + blocking
        const decl = Object.assign({}, spec.cast, s.cast), blocking = s.blocking || {};
        for (const id of Object.keys(Object.assign({}, blocking, s.cast || {}))) { const d = decl[id] || {}, ch = C.make(id, d.base || id, d); const bl = blocking[id] || {}; ch.init = { x: Array.isArray(bl.at) ? bl.at[0] : (bl.at ?? 0), lane: Array.isArray(bl.at) ? bl.at[1] || 0 : bl.lane || 0 };
          if (bl.face != null) ch.facing0 = dirVal(bl.face, 1); if (bl.expr || bl.is) ch.face0 = bl.expr || bl.is; ch.inT = bl.in != null ? tt(bl.in) : -1e9; ch.outT = bl.out != null ? tt(bl.out) : 1e9; ch.z = bl.z || 0; ch.cursor = { x: ch.init.x, lane: ch.init.lane }; sc.chars[id] = ch; }
        // set props
        (s.props || []).forEach((p, i) => { const k = B.Props.kinds[p.kind]; if (!k) throw new Error(`scene ${sc.id}: prop "${p.id || i}" unknown kind "${p.kind}". Props: ${Object.keys(B.Props.kinds).join(', ')}`); sc.props.push({ id: p.id || 'p' + i, ...p, scale: p.scale || 1, x: p.x || 0, lane: p.lane || 0, z: p.z || 'back', inT: p.in != null ? tt(p.in) : -1e9, outT: p.out != null ? tt(p.out) : 1e9, jolts: [], moves: [], rot: p.rot || 0, seed: i }); });
        const propById = id => sc.props.find(p => p.id === id);
        // actions
        const acts = (s.actions || []).map((a, i) => ({ ...a, t: tt(a.at), _i: i })).sort((a, b) => a.t - b.t || a._i - b._i);
        const GEST = Object.keys(C.gestures), MOVE = { walk: 'walk', run: 'run', sneak: 'sneak', stomp: 'stomp' }, DEFDUR = { point: 1.8, shrug: 1.1, facepalm: 1.6, count: 2.2, hold: 99, armsUp: 1.3, slam: 1.0, wave: 1.5, think: 2.2, cover: 1.6, hug: 1.6, clap: 1.4, 'hands-up': 1.5, 'shake-fist': 1.4, peek: 2.0 };
        const turns = []; // phase-2 facing keys that need positions
        for (const a of acts) {
          const who = a.who, ch = sc.chars[who];
          if (a.do === 'prop' || (!who && a.prop)) { const p = propById(a.id || a.prop); if (!p) throw new Error(`scene ${sc.id}: action prop "${a.id || a.prop}" not found`); if (a.to) { const to = Array.isArray(a.to) ? a.to : [a.to, p.lane]; p.moves.push({ t0: a.t, t1: a.until != null ? tt(a.until) : a.t + (a.dur || 0.6), from: null, to, arc: a.arc || 0 }); } if (a.jolt) p.jolts.push(a.t); if (a.show != null) { if (a.show) p.inT = a.t; else p.outT = a.t; } if (a.sfx) sfx.push({ at: a.t, ...(typeof a.sfx === 'string' ? { name: a.sfx } : a.sfx) }); rows.push({ t: a.t, scene: sc.id, who: a.id || a.prop, text: `prop ${a.to ? 'moves' : a.jolt ? 'jolts' : a.show === false ? 'leaves' : 'appears'}` }); continue; }
          if (a.do === 'bubble' || a.bubble) { sc.bubbles.push({ t0: a.t, t1: a.until != null ? tt(a.until) : a.t + (a.dur || 2), who, text: a.text || a.bubble, style: a.style || 'speech', words: a.words }); rows.push({ t: a.t, scene: sc.id, who, text: `bubble "${a.text || a.bubble}"` }); continue; }
          if (!ch) throw new Error(`scene ${sc.id}: action at ${a.at} refers to unknown character "${who}". Cast: ${Object.keys(sc.chars).join(', ')}`);
          const desc = [];
          if (a.face || a.is) { ch.faces.push({ t: a.t, name: a.face || a.is }); desc.push(`face: ${a.face || a.is}`); }
          if (MOVE[a.do]) { // walk / run / sneak / stomp: to a point or a path
            const gait = MOVE[a.do], g = C.gaits[gait], raw = a.path || (Array.isArray(a.to) && Array.isArray(a.to[0]) ? a.to : [a.to]), pts = [[ch.cursor.x, ch.cursor.lane]].concat(raw.map(p => (Array.isArray(p) ? [p[0], p[1] ?? ch.cursor.lane] : [p, ch.cursor.lane])));
            let len = 0; for (let i = 1; i < pts.length; i++) len += Math.hypot(pts[i][0] - pts[i - 1][0], (pts[i][1] - pts[i - 1][1]) * C.LANE);
            const speed = a.speed || { walk: 190, run: 520, sneak: 110, stomp: 170 }[gait], t1 = a.until != null ? tt(a.until) : a.t + (a.dur || len / speed + 0.5);
            if (t1 <= a.t + 0.05) throw new Error(`scene ${sc.id}: ${who} ${a.do} at ${a.at} ends before it starts`);
            const seg = C.compileSeg({ t0: a.t, t1, pts, gait, ta: a.ease || 0.32 }); ch.moves.push(seg); const dx = pts[pts.length - 1][0] - pts[0][0] || pts[1][0] - pts[0][0]; if (a.strafe !== true) ch.facing.push({ t: a.t - 0.02, v: Math.abs(dx) > 1 ? sgn(dx) * (gait === 'sneak' ? 0.95 : 1) : ch.facing0 || 1, dur: 0.2, _auto: true });
            ch.cursor = { x: pts[pts.length - 1][0], lane: pts[pts.length - 1][1] }; desc.push(`${a.do} to ${JSON.stringify(raw)} (${(t1 - a.t).toFixed(1)} s)`);
            if (a.then) turns.push({ ch, t: t1 + 0.05, to: a.then, dur: 0.3 });
          }
          if (a.do === 'turn' || a.turn != null) { turns.push({ ch, t: a.t, to: a.to != null && a.do === 'turn' ? a.to : a.turn, dur: a.dur || 0.3 }); desc.push(`turn to ${a.to ?? a.turn}`); }
          if (a.do === 'look' || a.look !== undefined) { ch.looks.push({ t: a.t, v: a.do === 'look' ? (a.at_ ?? a.target ?? a.to ?? null) : a.look }); desc.push(`look at ${a.target ?? a.to ?? a.look ?? 'front'}`); }
          if (a.do === 'talk' || a.talk) { const t1 = a.until != null ? tt(a.until) : a.t + (a.dur || (typeof a.talk === 'number' ? a.talk : 1.5)); ch.talks.push([a.t, t1]); if (a.audio) ch.talkDrive = 'audio'; desc.push('mimes talking'); }
          if (a.do === 'crouch' || a.crouch != null) { ch.crouch.push({ t: a.t, v: a.do === 'crouch' ? (a.v ?? 1) : a.crouch, dur: a.dur || 0.3 }); desc.push(`crouch ${a.v ?? a.crouch ?? 1}`); }
          if (GEST.includes(a.do)) {
            const t1 = a.until != null ? tt(a.until) : a.t + (a.dur || DEFDUR[a.do] || 1.5), gs = { kind: a.do, t0: a.t, t1, target: a.target, arm: a.arm, n: a.n, step: a.step, prop: a.prop, rot: a.rot, propScale: a.propScale, rampIn: a.rampIn, rampOut: a.rampOut };
            if (a.do === 'hold' && a.take) { const p = propById(a.take); if (p) { p.hidden = (p.hidden || []).concat([[a.t, t1]]); gs.prop = gs.prop || p.kind; ch.propOpts = Object.assign({}, p); } }
            ch.gestures.push(gs); desc.push(a.do + (a.target ? ` at ${a.target}` : '') + (a.prop ? ` (${a.prop})` : ''));
            if (a.do === 'slam') { const ti = a.t + 0.44; sc.fx.push({ t: ti, type: 'shake', amp: a.amp || 16, dur: 0.5 }); const p = a.prop && propById(a.prop); if (p) p.jolts.push(ti); sfx.push({ at: ti, name: 'thud_1', gain: -4, dur: 0.5 }); }
          }
          if (a.sfx) sfx.push({ at: a.t, ...(typeof a.sfx === 'string' ? { name: a.sfx } : a.sfx) });
          if (a.snap != null) ch.snapOverride = a.snap;
          if (desc.length) rows.push({ t: a.t, scene: sc.id, who, text: desc.join(' + ') });
        }
        // phase 2: resolve turns toward characters / props now that all moves exist
        for (const tr of turns) { let v = dirVal(tr.to, 1, (id) => { const o = sc.chars[id]; if (o) return C.moveAt(o, tr.t).x; const p = propById(id); return p ? p.x : null; }, C.moveAt(tr.ch, tr.t).x); if (typeof tr.to === 'string' && sc.chars[tr.to]) v *= 0.8; tr.ch.facing.push({ t: tr.t, v, dur: tr.dur }); }
        for (const ch of Object.values(sc.chars)) { for (const k of ['facing', 'faces', 'looks', 'crouch']) ch[k].sort((a, b) => a.t - b.t); ch.moves.sort((a, b) => a.t0 - b.t0); ch.gestures.sort((a, b) => a.t0 - b.t0); }
        // shots
        const shots = (s.shots && s.shots.length ? s.shots : [{ at: sc.t0, shot: 'wide' }]).map((h, i) => compileShot(h, sc, i)).sort((a, b) => a.t0 - b.t0); sc.shots = shots;
        // scene fx
        for (const f of s.fx || []) { const o = { ...f, t: tt(f.at), dur: f.dur ?? ({ impact: 0.1, flash: 0.18, shake: 0.5, punch: 0.3 }[f.type] || 0.3) }; sc.fx.push(o); rows.push({ t: o.t, scene: sc.id, who: '', text: `fx ${f.type}` }); if (f.sfx) sfx.push({ at: o.t, ...(typeof f.sfx === 'string' ? { name: f.sfx } : f.sfx) }); else if (f.type === 'impact') sfx.push({ at: o.t, name: 'deep_boom_1', gain: -4, dur: 1.2 }); }
        for (const o of s.overlays || []) sc.overlays.push({ ...o, t0: tt(o.at ?? o.from ?? sc.t0), t1: o.until != null ? tt(o.until) : o.to != null ? tt(o.to) : 1e9 });
        for (const f of sc.fx) f.t = tt(f.t); sc.src = s; return sc;
      }
      function dirVal(v, def, posOf, selfX) { if (v == null) return def; if (typeof v === 'number') return v; if (v === 'right') return 1; if (v === 'left') return -1; if (v === 'camera' || v === 'front') return 0; if (v === 'away') return 0; if (typeof v === 'string' && posOf) { const x = posOf(v); if (x != null && selfX != null) return sgn(x - selfX) || def; } return def; }
      function compileShot(h, sc, i) {
        const kind = h.shot || h.kind || (h.card ? 'card' : h.freeze ? 'freeze' : h.split ? 'split' : 'wide'), t0 = tt(h.at ?? sc.t0), base = SHOT[kind];
        if (!base && !['card', 'freeze', 'split'].includes(kind)) throw new Error(`scene ${sc.id}: shot "${kind}" unknown. Shots: ${Object.keys(SHOT).join(', ')}, card, freeze, split`);
        const sh = { ...h, kind, t0, base: base || {}, on: h.on, move: h.move || 'cut', push: h.push == null ? 0.05 : h.push, i };
        if (h.pan) sh.pan = { ...h.pan, t0: h.pan.at != null ? tt(h.pan.at) : t0, t1: h.pan.until != null ? tt(h.pan.until) : h.pan.dur ? (h.pan.at != null ? tt(h.pan.at) : t0) + h.pan.dur : null };
        if (kind === 'split') { sh.split = { dir: 'v', gap: 10, ...h.split }; sh.parts = [h.split.a, h.split.b].map(x => ({ ...x, kind: x.shot, base: SHOT[x.shot] || SHOT.medium, t0, push: x.push ?? 0.03 })); }
        if (h.freeze) sh.freeze = { dur: 1.2, ...h.freeze };
        if (kind === 'freeze') sh.freezeT = t0;
        if (h.sfx) sfx.push({ at: t0, ...(typeof h.sfx === 'string' ? { name: h.sfx } : h.sfx) }); else if (h.move === 'whip' && spec.autoSfx !== false) sfx.push({ at: t0 - 0.15, name: 'whoosh_2', gain: -8, dur: 0.6 });
        const desc = kind === 'card' ? `card "${(h.card && h.card.title) || ''}"` : kind === 'freeze' ? `freeze "${h.label || ''}"` : `${kind}${h.on ? ' on ' + [].concat(h.on).join('+') : ''}${h.over ? ' over ' + h.over : ''}`;
        rows.push({ t: t0, scene: sc.id, who: '', text: `SHOT ${desc}${h.move && h.move !== 'cut' ? ' (' + h.move + ')' : ''}${h.cam ? ' [' + h.cam + ']' : ''}${h.push > 0.1 ? ' push-in' : ''}`, shot: true });
        return sh;
      }

      // ------------------------------------------------------------ queries
      const charAt = (sc, id, t) => { const ch = sc.chars[id]; if (!ch) return null; const m = C.moveAt(ch, t); return { ch, x: m.x, lane: m.lane, gy: C.laneY(m.lane), sc: ch.scale * C.laneS(m.lane) }; };
      function targetPoint(sc, ref, t, frac = 0.62) { // world point of a character (frac of height), prop, set marker or [x, y]
        if (Array.isArray(ref)) return { x: ref[0], y: ref[1], sc: 1 }; const c = charAt(sc, ref, t); if (c) return { x: c.x, y: c.gy - frac * 410 * c.sc, sc: c.sc, gy: c.gy, ch: c.ch };
        const p = sc.props.find(q => q.id === ref); if (p) { const pp = propPos(sc, p, t), sz = B.Props.size(p.kind); return { x: pp.x, y: pp.y - sz[1] * 0.5 * p.scale, sc: p.scale, gy: pp.y }; }
        throw new Error(`scene ${sc.id}: target "${ref}" is not a character, prop or [x, y]`);
      }
      function propPos(sc, p, t) { let x = p.x, lane = p.lane, hop = 0; for (const m of p.moves) { if (t >= m.t1) { x = m.to[0]; lane = m.to[1] ?? lane; } else if (t >= m.t0) { const u = eio((t - m.t0) / (m.t1 - m.t0)); x = lerp(x, m.to[0], u); lane = lerp(lane, m.to[1] ?? lane, u); hop = (m.arc || 0) * Math.sin(Math.PI * u); break; } else break; } return { x, y: C.laneY(lane) - hop, lane }; }
      const ctxFor = sc => ({ fps, mouthAt, visemeAt,
        gx: (ch, P, t) => ({ dirTo: (ref) => { const tp = ref ? targetPoint(sc, ref, t) : null; if (!tp) return { th: 1.6 }; const shy = P.y - (138 + 108) * P.sc, dx = ((tp.x - P.x) * P.mir) / P.sc - 24, dy = (tp.y - shy) / P.sc; return { th: clamp(Math.atan2(dx, dy), -0.6, 3.05) }; } }),
        lookVec: (ch, P, ref, t) => { if (ref === 'camera') return [0, 0.05]; const tp = targetPoint(sc, ref, t, 0.8); const hx = P.x, hy = P.y - 330 * P.sc, dx = ((tp.x - hx) * P.mir) / P.sc, dy = (tp.y - hy) / P.sc; return [clamp(dx / 170, -1, 1), clamp(dy / 200, -1, 1)]; } });
      for (const sc of scenes) sc.ctx = ctxFor(sc);

      // ------------------------------------------------------------ camera
      // frame(sc, shotSpec, t, vp) -> {x, y, z, r, sx, sy}. Characters are followed with a trailing average (pure function: samples of the past), clamped to the shot start.
      function follow(sc, ref, t, t0, frac) { const N = 5; let ax = 0, ay = 0, sc2 = 1, gy = 0; for (let k = 0; k < N; k++) { const tp = targetPoint(sc, ref, Math.max(t0, t - k * 0.09), frac); ax += tp.x; ay += tp.y; sc2 = tp.sc; gy = tp.gy; } return { x: ax / N, y: ay / N, sc: sc2, gy }; }
      function frame(sc, sh, t, vp) {
        const b = sh.base || {}, dy = sh.dy ?? b.dy ?? 0.45, cx = vp.x + vp.w / 2, cy = vp.y + vp.h * dy; let x, y, z, sx = sh.sx ?? cx + (sh.side === 'left' ? -vp.w * 0.1 : sh.side === 'right' ? vp.w * 0.1 : 0) + (sh.offx || 0), sy = sh.sy ?? cy, vw;
        const lock = sh.lock === true, t0 = sh.t0;
        if (b.home || sh.kind === 'wide') { x = sh.x ?? sc.set.home.x; y = sh.y ?? sc.set.home.y; vw = sh.w || sc.set.wideW; if (sh.on) { const p = lock ? targetPoint(sc, [].concat(sh.on)[0], t0) : follow(sc, [].concat(sh.on)[0], t, t0, 0.5); x = p.x; } }
        else if (sh.kind === 'custom') { x = sh.x; y = sh.y; vw = sh.w || 600; }
        else if (b.fit) { const ids = [].concat(sh.on), pa = ids.map(id => (lock ? targetPoint(sc, id, t0) : follow(sc, id, t, t0, 0.55))); x = (Math.min(...pa.map(p => p.x)) + Math.max(...pa.map(p => p.x))) / 2; y = pa.reduce((s, p) => s + p.y, 0) / pa.length; const span = Math.max(...pa.map(p => p.x)) - Math.min(...pa.map(p => p.x)); vw = Math.max(sh.w || 0, (span + 340) * Math.max(...pa.map(p => p.sc))); if (!sh.w) vw = Math.max(vw, 520 * pa[0].sc); y = Math.min(...pa.map(p => p.gy)) - 0.52 * 410 * pa[0].sc; }
        else if (b.pov) { const who = sh.of || sh.on, tgt = sh.at_ ?? sh.target ?? sh.look; const eye = targetPoint(sc, who, t0, 0.8), p = lock ? targetPoint(sc, tgt, t0, 0.55) : follow(sc, tgt, t, t0, 0.55); x = p.x; y = p.y; vw = sh.w || b.w * (p.sc || 1); }
        else if (b.ots) { const B2 = sh.on, A2 = sh.over, pb = follow(sc, B2, t, t0, b.a), pa = targetPoint(sc, A2, t, 0.8); vw = (sh.w || b.w) * pb.sc; x = pb.x; y = pb.y; const left = pa.x < pb.x; sx = sh.sx ?? (left ? cx + vp.w * 0.17 : cx - vp.w * 0.17); }
        else if (b.prop) { const p = follow(sc, sh.on, t, t0, 0.5); x = p.x; y = p.y; vw = (sh.w || b.w) * (p.sc || 1); }
        else { const ids = [].concat(sh.on); const p = lock ? targetPoint(sc, ids[0], t0, b.a) : follow(sc, ids[0], t, t0, b.a); x = p.x; y = p.y; vw = (sh.w || b.w) * p.sc; }
        if (sh.ox) x += sh.ox; if (sh.oy) y += sh.oy; // world nudges
        // slow push-in over the shot, optional punch-in at the start, optional pan
        const dur = Math.max(0.1, (sh.t1 ?? t0 + 3) - t0), u = clamp((t - t0) / dur); let zk = 1 + (sh.push || 0) * (sh.pushEase === 'out' ? eout(u) : u);
        const punch = sh.punch ?? b.punch ?? 0; if (punch) zk *= 1 + punch * (1 - eout((t - t0) / 0.28)) * -1 + 0; // start slightly wide, ease in
        z = (vp.w / vw) * zk;
        if (sh.pan) { const p = sh.pan, pu = p.t1 ? eio((t - p.t0) / (p.t1 - p.t0)) : eio((t - p.t0) / 2.2); let tx, ty; if (p.to) { const q = Array.isArray(p.to) ? { x: p.to[0], y: p.to[1] } : targetPoint(sc, p.to, t, 0.6); tx = q.x; ty = q.y; } else { tx = x + (p.by ? p.by[0] : 0); ty = y + (p.by ? p.by[1] : 0); } x = lerp(x, tx, pu); y = lerp(y, ty, pu); if (p.zoom) z *= Math.pow(p.zoom, pu); }
        let r = sh.r || 0; const hand = sh.hand == null ? 1 : sh.hand; r += Math.sin(t * 0.7 + 1) * 0.0025 * hand; x += (Math.sin(t * 1.1) * 3 * hand) / z; y += (Math.cos(t * 0.8) * 2.5 * hand) / z;
        if (b.pov) { r += Math.sin(t * 2.1) * 0.006; y += (Math.sin(t * 5.3) * 4) / z; } // walking bob in POV
        return { x, y, z, r, sx, sy };
      }
      const FULL = { x: 0, y: 0, w: W, h: H };
      function shotAt(sc, t) { let k = sc.shots[0]; for (const s of sc.shots) if (t >= s.t0) k = s; return k; }
      function camAt(sc, t) { // whole-scene camera (adds whip / shake / punch fx)
        const sh = shotAt(sc, t); if (sh.kind === 'card') return { x: 0, y: 0, z: 1, r: 0, sx: W / 2, sy: H / 2, sh };
        let f; if (sh.kind === 'freeze') { const prev = sc.shots[sh.i - 1] || sc.shots[0]; f = frame(sc, prev.kind === 'freeze' || prev.kind === 'card' || prev.kind === 'split' ? { ...SHOT_FALLBACK(sc), t0: sc.t0 } : prev, sh.t0, FULL); }
        else if (sh.kind === 'split') f = frame(sc, SHOT_FALLBACK(sc, sh), t, FULL); else f = frame(sc, sh, t, FULL);
        // whip: previous shot sweeps away (ease-in), new shot sweeps in (ease-out)
        if (sh.move === 'whip' && sh.i > 0) { const dir = sh.dir === 'left' ? -1 : 1, K = (sh.whipDist || 1900) / f.z, wIn = sh.whipIn ?? 0.2, d = t - sh.t0; if (d >= 0 && d < wIn) { f.x -= dir * K * Math.pow(1 - eout(d / wIn), 1.0); f.r += dir * 0.012 * (1 - d / wIn); } }
        const nx = sc.shots[sh.i + 1]; if (nx && nx.move === 'whip' && nx.kind !== 'card') { const dir = nx.dir === 'left' ? -1 : 1, wOut = nx.whipOut ?? 0.14, d = t - (nx.t0 - wOut); if (d > 0) { const K = (nx.whipDist || 1900) / f.z; f.x += dir * K * Math.pow(eio(clamp(d / wOut)), 2.2); f.r -= dir * 0.012 * clamp(d / wOut); } }
        for (const fx of sc.fx) { const d = t - fx.t; if (fx.type === 'shake' && d >= 0 && d < fx.dur) { const e = Math.exp(-7 * d) * (fx.amp || 14); f.sx += Math.sin(d * 61) * e; f.sy += Math.cos(d * 47) * e * 0.85; f.r += Math.sin(d * 39) * e * 0.0005; } if (fx.type === 'punch' && d >= 0 && d < fx.dur) f.z *= 1 + (fx.amp || 0.08) * (1 - eout(d / fx.dur)); }
        f.sh = sh; return f;
      }
      const SHOT_FALLBACK = (sc, sh) => ({ ...(sh && sh.parts ? sh.parts[0] : {}), kind: 'wide', base: SHOT.wide, i: 0, t0: sc.t0, t1: sc.t1, push: 0 });

      // ------------------------------------------------------------ world rendering
      const fonts = [['Anton', 'anton-latin-400-normal.woff2', '400'], ['Inter', 'inter-latin-600-normal.woff2', '600'], ['Inter', 'inter-latin-800-normal.woff2', '800'], ['JBM', 'jetbrains-mono-latin-700-normal.woff2', '700'], ['JBM', 'jetbrains-mono-latin-800-normal.woff2', '800']];
      function drawProp(g, sc, p, t) {
        if (t < p.inT || t > p.outT + 0.25) return; if (p.hidden && p.hidden.some(([a, b]) => t >= a && t <= b)) return; const pp = propPos(sc, p, t); let hop = 0; for (const j of p.jolts) { const d = t - j; if (d >= 0 && d < 0.6) hop = Math.exp(-9 * d) * Math.sin(d * 50) * -(p.joltAmp || 9); }
        const lt = t - p.inT, pop = p.inT > -1e8 ? 0.6 + 0.4 * B.spring(lt, 'snappy') : 1, fo = t > p.outT ? 1 - clamp((t - p.outT) / 0.25) : 1;
        g.save(); g.translate(pp.x, pp.y + hop); const s = p.scale * C.laneS(pp.lane) * pop; g.scale(s, s); g.rotate(p.rot + (p.anim === 'sway' ? Math.sin(t * 1.4 + p.seed) * 0.03 : 0)); g.globalAlpha = fo * (p.alpha ?? 1); if (p.anim === 'bob') g.translate(0, Math.sin(t * 2.2 + p.seed) * 4); B.Props.draw(g, p.kind, p, t); g.restore();
      }
      function layerEnv(sc, s, p, t, vp) { const zl = Math.pow(s.z, p), cxl = s.x * p, cyl = s.y * p, pad = 260; return { t, pal: sc.set.pal, z: zl, gy: -SETS.HOME_Y * (1 - p), x0: cxl - (s.sx - vp.x + pad) / zl, x1: cxl + (vp.x + vp.w - s.sx + pad) / zl, y0: cyl - (s.sy - vp.y + pad) / zl, y1: cyl + (vp.y + vp.h - s.sy + pad) / zl }; }
      function drawWorld(g, sc, t, s, vp, o = {}) { // s = camera state; vp = viewport rect (full frame, or half for split-screen)
        g.save(); if (vp !== FULL) { g.beginPath(); g.rect(vp.x, vp.y, vp.w, vp.h); g.clip(); }
        const layers = sc.set.def.layers; g.fillStyle = sc.set.pal.bg || '#000'; g.fillRect(vp.x, vp.y, vp.w, vp.h);
        const nearIdx = layers.findIndex(l => l.p === 1), blurK = clamp((s.z - 1.5) * 2.2, 0, 9);
        layers.forEach((L, li) => { if (li > nearIdx && L.id === 'fg') return; const env = layerEnv(sc, s, L.p, t, vp);
          if (blurK > 0.8 && L.p < 0.9) { S2.setTransform(1, 0, 0, 1, 0, 0); S2.clearRect(0, 0, W, H); S2.save(); B.Camera.apply(S2, s, L.p); L.draw(S2, env); S2.restore(); g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.filter = `blur(${(blurK * (1 - L.p)).toFixed(1)}px)`; g.drawImage(SCB, 0, 0); g.restore(); }
          else { g.save(); B.Camera.apply(g, s, L.p); L.draw(g, env); g.restore(); } });
        // stage: props + characters depth-sorted by lane
        g.save(); B.Camera.apply(g, s, 1); const items = [];
        for (const p of sc.props) items.push({ k: p.z === 'front' ? 50 : p.z === 'back' ? -50 : p.lane, f: () => drawProp(g, sc, p, t) });
        for (const ch of Object.values(sc.chars)) { if (t < ch.inT || t > ch.outT || (o.hide && o.hide.includes(ch.id))) continue; const P = C.pose(ch, t, sc.ctx); items.push({ k: P.lane + ch.z * 0.01 + 0.001, f: () => C.draw(g, ch, P, t) }); }
        items.sort((a, b) => a.k - b.k); for (const it of items) it.f(); g.restore();
        const fgL = layers.find(l => l.id === 'fg'); if (fgL) { g.save(); B.Camera.apply(g, s, fgL.p); fgL.draw(g, layerEnv(sc, s, fgL.p, t, vp)); g.restore(); }
        g.restore();
      }
      const toScreen = (s, x, y) => B.Camera.toScreen(s, x, y);

      // overlays that live in screen space: simple bubbles, OTS foreground figure, peek occluders, labels
      function bubble(g, sc, s, t, b) {
        const ch = sc.chars[b.who], k = clamp(B.spring(t - b.t0 + 0.12, 'snappy'), 0, 1.15) * (1 - clamp((t - (b.t1 - 0.15)) / 0.15)); if (k <= 0.01) return; const P = C.pose(ch, t, sc.ctx), hp = C.headWorld(ch, P), [px, py] = toScreen(s, hp.x, hp.y - 80 * P.sc);
        g.save(); g.font = '800 46px Inter, sans-serif'; const words = String(b.text).split(' '), max = 560, lines = []; let cur = ''; for (const w of words) { const nx = cur ? cur + ' ' + w : w; if (g.measureText(nx).width > max && cur) { lines.push(cur); cur = w; } else cur = nx; } lines.push(cur);
        const lw = Math.max(...lines.map(l => g.measureText(l).width)), bw = lw + 70, bh = lines.length * 56 + 44, bx = clamp(px - bw / 2, 24, W - bw - 24), by = clamp(py - bh - 50, 80, H - 500);
        g.translate(bx + bw / 2, by + bh); g.scale(k, k); g.translate(-(bx + bw / 2), -(by + bh)); g.beginPath(); g.roundRect(bx, by, bw, bh, b.style === 'thought' ? 44 : 28); g.fillStyle = '#fffdf6'; g.fill(); g.lineWidth = 8; g.strokeStyle = B.Style.ink; g.lineJoin = 'round'; g.stroke();
        const tx = clamp(px, bx + 40, bx + bw - 40); g.beginPath(); if (b.style === 'thought') { for (const [r, f] of [[14, 0.35], [9, 0.65], [6, 0.9]]) { g.moveTo(lerp(tx, px, f) + r, lerp(by + bh, py - 20, f)); g.arc(lerp(tx, px, f), lerp(by + bh + 14, py - 20, f), r, 0, TAU); } g.fillStyle = '#fffdf6'; g.fill(); g.stroke(); } else { g.moveTo(tx - 24, by + bh - 3); g.lineTo(px, py - 8); g.lineTo(tx + 24, by + bh - 3); g.closePath(); g.fillStyle = '#fffdf6'; g.fill(); g.stroke(); g.beginPath(); g.moveTo(tx - 20, by + bh - 4); g.lineTo(tx + 20, by + bh - 4); g.lineWidth = 12; g.strokeStyle = '#fffdf6'; g.stroke(); }
        g.fillStyle = B.Style.ink; g.textAlign = 'center'; g.textBaseline = 'middle'; lines.forEach((l, i) => g.fillText(l, bx + bw / 2, by + 22 + 28 + i * 56)); g.restore();
      }
      function foregroundOts(g, sc, sh, s, t) { // over-the-shoulder: the other character, big, soft and dark in the near corner
        const A = sc.chars[sh.over], pa = charAt(sc, sh.over, t), pb = charAt(sc, sh.on, t); if (!A) return; const left = pa.x < pb.x, P = C.pose(A, t, sc.ctx); P.x = 0; P.y = 0; P.sc = 1; P.mir = left ? 1 : -1; P.a = 0.6;
        S2.setTransform(1, 0, 0, 1, 0, 0); S2.clearRect(0, 0, W, H); S2.save(); S2.translate(left ? -40 : W + 40, H * 0.98 + 20); const k = sh.fgScale || 2.5; S2.scale(k, k); C.draw(S2, A, P, t, { back: true, noShadow: true }); S2.restore();
        S2.globalCompositeOperation = 'source-atop'; S2.fillStyle = 'rgba(8,6,10,.42)'; S2.fillRect(0, 0, W, H); S2.globalCompositeOperation = 'source-over';
        g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.filter = 'blur(5px)'; g.drawImage(SCB, 0, 0); g.restore();
      }
      function peekOccluder(g, sc, sh, t) { // eyewitness: we watch from behind a big foreground object (barrel, plant, crate...)
        const pk = sh.peek || {}, kind = pk.prop || 'barrel', side = pk.side || 'left', sz = B.Props.size(kind), k = pk.scale || 4.2; S2.setTransform(1, 0, 0, 1, 0, 0); S2.clearRect(0, 0, W, H); S2.save();
        const sway = Math.sin(t * 0.9) * 4; S2.translate(side === 'left' ? W * 0.02 + sway : side === 'right' ? W * 0.98 - sway : W / 2, side === 'bottom' ? H * 1.04 : H * 1.02 + (pk.y || 0)); if (side === 'right') S2.scale(-1, 1); S2.scale(k, k); B.Props.draw(S2, kind, { color: pk.color }, t); S2.restore(); S2.globalCompositeOperation = 'source-atop'; S2.fillStyle = `rgba(6,5,10,${pk.dark ?? 0.62})`; S2.fillRect(0, 0, W, H); S2.globalCompositeOperation = 'source-over';
        g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.filter = `blur(${pk.blur ?? 7}px)`; g.drawImage(SCB, 0, 0); g.restore();
        const vg = g.createRadialGradient(W / 2, H * 0.42, W * 0.35, W / 2, H * 0.42, W * 0.95); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.55)'); g.fillStyle = vg; g.fillRect(0, 0, W, H);
      }
      function povMask(g, sh, t) { const m = sh.mask || 'eyes'; if (m === 'none') return; g.save(); g.setTransform(1, 0, 0, 1, 0, 0); const cx = W / 2, cy = H * 0.45; if (m === 'binoc') { g.fillStyle = '#000'; g.beginPath(); g.rect(0, 0, W, H); g.arc(cx - 250, cy, 330, 0, TAU); g.moveTo(cx + 580, cy); g.arc(cx + 250, cy, 330, 0, TAU); g.fill('evenodd'); } else { const vg = g.createRadialGradient(cx, cy, W * 0.28, cx, cy, W * 0.85); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(0.7, 'rgba(0,0,0,.55)'); vg.addColorStop(1, 'rgba(0,0,0,.92)'); g.fillStyle = vg; g.fillRect(0, 0, W, H); } g.restore(); }
      function secCamOverlay(g, sh, t, sc) {
        const o = sh.camOpts || {}; g.save(); g.setTransform(1, 0, 0, 1, 0, 0);
        // tint + desaturate + contrast (via filter copy), grain, scanlines, timestamp, REC
        S2.setTransform(1, 0, 0, 1, 0, 0); S2.drawImage(Cv, 0, 0); g.globalCompositeOperation = 'source-over'; g.filter = 'grayscale(0.9) contrast(1.25) brightness(0.82) sepia(0.35) hue-rotate(60deg)'; g.drawImage(SCB, 0, 0); g.filter = 'none';
        const q = Math.floor(t * 12); g.fillStyle = 'rgba(0,0,0,.18)'; for (let y = 0; y < H; y += 6) g.fillRect(0, y, W, 2);
        for (let i = 0; i < 520; i++) { const h1 = hash(q * 17.3 + i * 1.77), h2 = hash(q * 3.1 + i * 9.13); g.fillStyle = `rgba(255,255,255,${0.05 + 0.1 * hash(i + q)})`; g.fillRect(h1 * W, h2 * H, 3 + hash(i * 2.2) * 6, 2); }
        const gl = hash(Math.floor(t * 3) * 5.1); if (gl > 0.86) { const y = hash(Math.floor(t * 3) * 1.3) * H; g.drawImage(SCB, 0, y, W, 60, 24, y, W, 60); g.fillStyle = 'rgba(255,255,255,.1)'; g.fillRect(0, y, W, 60); }
        const vg = g.createRadialGradient(W / 2, H / 2, W * 0.3, W / 2, H / 2, W * 0.95); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.6)'); g.fillStyle = vg; g.fillRect(0, 0, W, H);
        g.font = '800 40px JBM, monospace'; g.textBaseline = 'top'; g.fillStyle = '#e8f5e0'; g.shadowColor = 'rgba(0,0,0,.8)'; g.shadowBlur = 4; const base = o.start != null ? o.start : 3600 * 2 + 14 * 60 + 7, sec = Math.floor(base + t), pad = n => String(n).padStart(2, '0'), ts = `${o.date || '2026-11-26'}  ${pad(Math.floor(sec / 3600) % 24)}:${pad(Math.floor(sec / 60) % 60)}:${pad(sec % 60)}`;
        g.textAlign = 'left'; g.fillText(o.label || 'CAM 03', 54, 150); g.fillText(ts, 54, H - 250 - 20); g.textAlign = 'right'; if (Math.floor(t * 1.6) % 2 === 0) { g.fillStyle = '#ff3b30'; g.beginPath(); g.arc(W - 200, 170, 14, 0, TAU); g.fill(); } g.fillStyle = '#e8f5e0'; g.fillText('REC', W - 54, 150);
        g.strokeStyle = 'rgba(232,245,224,.85)'; g.lineWidth = 5; g.shadowBlur = 0; for (const [x, y, dx, dy] of [[40, 110, 1, 1], [W - 40, 110, -1, 1], [40, H - 120, 1, -1], [W - 40, H - 120, -1, -1]]) { g.beginPath(); g.moveTo(x, y + dy * 60); g.lineTo(x, y); g.lineTo(x + dx * 60, y); g.stroke(); }
        g.restore();
      }
      function impactFrame(g, f, t, fx, sc, s) { // 2-3 frames of high-contrast inverted frame with radial speed lines: the "impact frame"
        const d = t - fx.t, n = Math.floor(d * fps + 1e-6), inv = n % 2 === 0;
        S2.setTransform(1, 0, 0, 1, 0, 0); S2.drawImage(Cv, 0, 0); g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.filter = `grayscale(1) contrast(6) brightness(${inv ? 1.0 : 1.15})${inv ? ' invert(1)' : ''}`; g.drawImage(SCB, 0, 0); g.filter = 'none';
        let cx = W / 2, cy = H * 0.42; if (fx.on) { const tp = targetPoint(sc, fx.on, t, 0.7), p = toScreen(s, tp.x, tp.y); cx = p[0]; cy = p[1]; } g.fillStyle = inv ? '#fff' : '#000'; const N = 34;
        for (let i = 0; i < N; i++) { const a = (i / N) * TAU + hash(i * 3.3) * 0.15, w = 0.02 + 0.03 * hash(i * 7.7), r0 = 130 + 160 * hash(i * 1.9), r1 = 2200; g.beginPath(); g.moveTo(cx + Math.cos(a - w) * r0, cy + Math.sin(a - w) * r0); g.lineTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1); g.lineTo(cx + Math.cos(a + w) * r0, cy + Math.sin(a + w) * r0); g.closePath(); g.fill(); }
        if (fx.text) { g.font = '220px Anton, Impact, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.lineWidth = 26; g.lineJoin = 'round'; g.strokeStyle = inv ? '#000' : '#fff'; g.save(); g.translate(cx, cy + 420); g.rotate(-0.08); g.strokeText(fx.text, 0, 0); g.fillStyle = inv ? '#fff' : '#000'; g.fillText(fx.text, 0, 0); g.restore(); }
        g.restore();
      }
      function card(g, sh, t) { // full-screen title card: kinetic words pop in
        const c = sh.card || {}, u = t - sh.t0, pal = Object.assign({ bg: '#16110e', fg: '#fffdf6', accent: '#f2c230' }, c); g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = pal.bg; g.fillRect(0, 0, W, H);
        if (pal.stripe !== false) { g.fillStyle = pal.accent; g.fillRect(0, H * 0.5 - 6 + 150, W, 12); }
        const words = String(c.title || '').split(' '), size = c.size || 190, lines = []; g.font = `${size}px Anton, Impact, sans-serif`; let cur = ''; for (const w of words) { const nx = cur ? cur + ' ' + w : w; if (g.measureText(nx).width > W - 160 && cur) { lines.push(cur); cur = w; } else cur = nx; } lines.push(cur);
        g.textAlign = 'center'; g.textBaseline = 'middle'; lines.forEach((l, i) => { const k = clamp(B.spring(u - i * 0.12, 'snappy'), 0, 1.2); g.save(); g.translate(W / 2, H * 0.42 + (i - (lines.length - 1) / 2) * size * 1.05); g.scale(0.7 + 0.3 * k, 0.7 + 0.3 * k); g.globalAlpha = clamp(k * 3); g.fillStyle = i === lines.length - 1 && c.accentLast ? pal.accent : pal.fg; g.fillText(l, 0, 0); g.restore(); });
        if (c.sub) { const k = clamp(B.spring(u - 0.35, 'snappy'), 0, 1.1); g.font = '800 54px Inter, sans-serif'; g.fillStyle = pal.accent; g.globalAlpha = clamp(k * 2); g.fillText(String(c.sub).toUpperCase(), W / 2, H * 0.5 + 250 + (1 - k) * 20); }
        g.restore();
      }
      function freezeOverlay(g, sh, sc, s, t) { // freeze-frame: white photo flash, border, sticker label with an arrow to the subject
        const u = t - sh.t0, fr = sh.freeze, F = fr.flash === false ? 0 : Math.exp(-u * 16); g.save(); g.setTransform(1, 0, 0, 1, 0, 0);
        if (fr.style !== 'plain') { g.fillStyle = 'rgba(0,0,0,.18)'; g.fillRect(0, 0, W, H); g.lineWidth = 34; g.strokeStyle = '#fffdf6'; g.strokeRect(17, 17, W - 34, H - 34); }
        const label = sh.label || fr.label; if (label) { const k = clamp(B.spring(u - 0.12, { f: 2.4, z: 0.5 }), 0, 1.25); let tx = W / 2, ty = H * 0.62; if (sh.on) { const tp = targetPoint(sc, sh.on, sh.freezeT, 0.85), p = toScreen(s, tp.x, tp.y); tx = p[0]; ty = p[1]; }
          const lines = String(label).split('\n'), size = fr.size || 92; g.font = `${size}px Anton, Impact, sans-serif`; const bw = Math.max(...lines.map(l => g.measureText(l).width)) + 80, bh = lines.length * size * 1.05 + 40, bx = clamp(fr.x ?? W / 2, bw / 2 + 30, W - bw / 2 - 30), by = fr.y ?? H * 0.2;
          g.translate(bx, by); g.scale(k, k); g.rotate(-0.04); g.beginPath(); g.roundRect(-bw / 2, -bh / 2, bw, bh, 10); g.fillStyle = fr.color || '#f2c230'; g.fill(); g.lineWidth = 9; g.strokeStyle = B.Style.ink; g.lineJoin = 'round'; g.stroke(); g.fillStyle = B.Style.ink; g.textAlign = 'center'; g.textBaseline = 'middle'; lines.forEach((l, i) => g.fillText(l, 0, (i - (lines.length - 1) / 2) * size * 1.05 + 4));
          g.setTransform(1, 0, 0, 1, 0, 0); if (sh.on && fr.arrow !== false) { const ax = bx, ay = by + bh / 2 * k + 8, ex = tx, ey = ty - 150, mid = [(ax + ex) / 2 + 60, (ay + ey) / 2]; const kk = clamp((u - 0.25) / 0.2); if (kk > 0) { g.beginPath(); g.moveTo(ax, ay); g.quadraticCurveTo(mid[0], mid[1], lerp(ax, ex, kk), lerp(ay, ey, kk)); g.lineWidth = 12; g.strokeStyle = B.Style.ink; g.lineCap = 'round'; g.stroke(); g.lineWidth = 6; g.strokeStyle = fr.color || '#f2c230'; g.stroke(); if (kk >= 1) { const an = Math.atan2(ey - mid[1], ex - mid[0]); g.beginPath(); g.moveTo(ex, ey); g.lineTo(ex - Math.cos(an - 0.5) * 38, ey - Math.sin(an - 0.5) * 38); g.lineTo(ex - Math.cos(an + 0.5) * 38, ey - Math.sin(an + 0.5) * 38); g.closePath(); g.fillStyle = fr.color || '#f2c230'; g.fill(); g.lineWidth = 7; g.strokeStyle = B.Style.ink; g.stroke(); } } } }
        if (F > 0.02) { g.fillStyle = `rgba(255,255,255,${F})`; g.fillRect(0, 0, W, H); } g.restore();
      }

      // renders one scene at time t into g (full frame). Returns nothing; handles shot kinds.
      function drawScene(g, sc, t) {
        const sh = shotAt(sc, t); let tw = t; if (sh.cam === 'security') tw = Math.floor(t * (sh.camOpts && sh.camOpts.fps || 8)) / (sh.camOpts && sh.camOpts.fps || 8);
        if (sh.kind === 'card') { card(g, sh, t); return; }
        if (sh.kind === 'split') { const sp = sh.split, v = sp.dir === 'v', gap = sp.gap; const vps = v ? [{ x: 0, y: 0, w: (W - gap) / 2, h: H }, { x: (W + gap) / 2, y: 0, w: (W - gap) / 2, h: H }] : [{ x: 0, y: 0, w: W, h: (H - gap) / 2 }, { x: 0, y: (H + gap) / 2, w: W, h: (H - gap) / 2 }];
          sh.parts.forEach((p, i) => { p.t1 = sh.t1; const f = frame(sc, { ...p, t0: sh.t0 }, tw, vps[i]); f.z *= 1; drawWorld(g, sc, tw, f, vps[i]); }); g.save(); g.fillStyle = sp.color || '#fffdf6'; if (v) g.fillRect((W - gap) / 2, 0, gap, H); else g.fillRect(0, (H - gap) / 2, W, gap); g.restore(); return; }
        const s = camAt(sc, tw), tFrame = sh.kind === 'freeze' ? sh.freezeT : tw;
        drawWorld(g, sc, tFrame, s, FULL, { hide: sh.hide });
        if (sh.ots || sh.base.ots) foregroundOts(g, sc, sh, s, tFrame); if (sh.peek) peekOccluder(g, sc, sh, tFrame); if (sh.base.pov) povMask(g, sh, t);
        for (const b of sc.bubbles) if (t >= b.t0 - 0.1 && t <= b.t1) bubble(g, sc, s, t, b);
        for (const o of sc.overlays) if (t >= o.t0 && t <= o.t1) drawOverlay(g, o, sc, s, t);
        if (sh.kind === 'freeze') freezeOverlay(g, sh, sc, s, t);
        for (const fx of sc.fx) { const d = t - fx.t; if (fx.type === 'flash' && d >= 0 && d < fx.dur) { g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = fx.color || '#fff'; g.globalAlpha = (1 - d / fx.dur) * (fx.amp ?? 0.9); g.fillRect(0, 0, W, H); g.restore(); } if (fx.type === 'vignette' && d >= 0 && d < fx.dur) { g.save(); const vg = g.createRadialGradient(W / 2, H / 2, W * 0.25, W / 2, H / 2, W * 0.9); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, `rgba(120,0,0,${0.7 * Math.sin(Math.PI * d / fx.dur)})`); g.fillStyle = vg; g.fillRect(0, 0, W, H); g.restore(); } }
        if (sh.cam === 'security') secCamOverlay(g, sh, t, sc);
        for (const fx of sc.fx) if (fx.type === 'impact' && t >= fx.t && t < fx.t + fx.dur) impactFrame(g, fx, t, fx, sc, s);
      }
      function drawOverlay(g, o, sc, s, t) { // generic screen text / sticker overlays (scene.overlays: [{at, until, text, x, y, size, color}])
        const k = clamp(B.spring(t - o.t0, 'snappy'), 0, 1.15); g.save(); g.translate(o.x ?? W / 2, o.y ?? H * 0.2); g.scale(k, k); g.rotate(o.rot || 0); g.font = `${o.size || 80}px ${o.font || 'Anton, Impact, sans-serif'}`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.lineJoin = 'round'; g.lineWidth = 14; g.strokeStyle = B.Style.ink; g.strokeText(o.text, 0, 0); g.fillStyle = o.color || '#fffdf6'; g.fillText(o.text, 0, 0); g.restore(); }

      // ------------------------------------------------------------ transitions + frame
      function sceneIdx(t) { let i = 0; for (let j = 0; j < scenes.length; j++) if (t >= scenes[j].t0) i = j; return i; }
      function composite(g, t) {
        const i = sceneIdx(t), sc = scenes[i], nx = scenes[i + 1], pv = scenes[i - 1];
        // transition window: [boundary - d/2 .. boundary + d/2] around scene starts
        let tr = null; if (nx && nx.src.transition && (nx.src.transition.dur || 0) > 0 && nx.src.transition.type !== 'cut') { const d = nx.src.transition.dur, b = nx.t0; if (t >= b - d / 2 && t < b) tr = { a: sc, b: nx, u: (t - (b - d / 2)) / d, def: nx.src.transition, d }; }
        if (!tr && pv && sc.src.transition && (sc.src.transition.dur || 0) > 0 && sc.src.transition.type !== 'cut') { const d = sc.src.transition.dur; if (t < sc.t0 + d / 2) tr = { a: pv, b: sc, u: (t - (sc.t0 - d / 2)) / d, def: sc.src.transition, d }; }
        if (!tr) { drawScene(g, sc, t); return; }
        const u = clamp(tr.u), type = tr.def.type; drawScene(g, tr.a, t);
        if (type === 'fade') { FG2.setTransform(1, 0, 0, 1, 0, 0); drawScene(FG2, tr.b, t); g.save(); g.globalAlpha = eio(u); g.drawImage(FRM2, 0, 0); g.restore(); }
        else if (type === 'dip' || type === 'flash') { const col = tr.def.color || (type === 'flash' ? '#fff' : '#000'), k = u < 0.5 ? u * 2 : 2 - u * 2; if (u >= 0.5) { g.fillStyle = '#000'; drawScene(g, tr.b, t); } g.save(); g.fillStyle = col; g.globalAlpha = eio(k) * (type === 'flash' ? 1 : 1); g.fillRect(0, 0, W, H); g.restore(); }
        else if (type === 'whip' || type === 'slide') { const dir = tr.def.dir === 'right' ? 1 : -1, e = eio(u), dist = (tr.def.dist || 1.15) * W; FG2.setTransform(1, 0, 0, 1, 0, 0); drawScene(FG2, tr.b, t); FG.setTransform(1, 0, 0, 1, 0, 0); FG.clearRect(0, 0, W, H); FG.drawImage(Cv, 0, 0);
          g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = '#000'; g.fillRect(0, 0, W, H); g.drawImage(FRM, dir * e * dist, 0); g.drawImage(FRM2, dir * (e - 1) * dist, 0); g.restore(); }
        else if (type === 'wipe') { FG2.setTransform(1, 0, 0, 1, 0, 0); drawScene(FG2, tr.b, t); g.save(); g.beginPath(); g.rect(0, 0, W * eio(u), H); g.clip(); g.drawImage(FRM2, 0, 0); g.restore(); g.fillStyle = B.Style.ink; g.fillRect(W * eio(u) - 6, 0, 12, H); }
        else if (type === 'iris') { FG2.setTransform(1, 0, 0, 1, 0, 0); drawScene(FG2, tr.b, t); g.save(); g.beginPath(); g.arc(tr.def.x ?? W / 2, tr.def.y ?? H * 0.45, eio(u) * 1500, 0, TAU); g.clip(); g.drawImage(FRM2, 0, 0); g.restore(); }
        else { drawScene(FG2, tr.b, t); }
      }
      // note: FG2 draws into FRM2; the whip uses Cv content (outgoing) copied into FRM first. Drawing target aliasing handled by always calling composite(X, t) on the visible canvas.
      // ------------------------------------------------------------ captions (same look as the infographic engine: Anton/Inter, 3 words at a time)
      const capO = spec.captions === false ? null : { size: 66, y: B.L.cap.y, maxWords: B.L.cap.maxWords, maxChars: B.L.cap.maxChars, width: B.L.cap.width, lh: B.L.cap.lh, emph: {}, hide: [], ...(spec.captions || {}) }; let chunks = [];
      if (capO) { const toks = (voice.words || []).map(w => ({ ...w })); let cur = []; const flush = () => { if (cur.length) chunks.push(cur); cur = []; };
        toks.forEach((w, i) => { const len = cur.reduce((a, x) => a + x.w.length + 1, 0); if (cur.length && (len + w.w.length > capO.maxChars || cur.length >= capO.maxWords)) flush(); cur.push(w); const nx = toks[i + 1]; if (/[.?!]$/.test(w.w) || (nx && nx.s - w.e > 0.35)) flush(); }); flush(); chunks = chunks.map((ws, i, all) => { const nx = all[i + 1], end = ws[ws.length - 1].e; return { s: ws[0].s, e: nx && nx[0].s - end < 0.5 ? nx[0].s : end + 0.3, ws }; }); }
      function captions(g, t) {
        if (!capO || capO.hide.some(([a, b]) => t >= T(a) && t < T(b))) return; const sc = scenes[sceneIdx(t)], sh = shotAt(sc, t); if (sh.nocaps) return; const ch = chunks.find(c => t >= c.s && t < c.e); if (!ch) return;
        const k = clamp(B.spring(t - ch.s + 0.12, 'stiff'), 0, 1.15); g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.font = B.F.cap(capO.size); const sp = g.measureText(' ').width, lines = [[]]; let lw = 0;
        for (const w of ch.ws) { const s = w.w.toUpperCase(), ww = g.measureText(s).width; if (lw + ww > capO.width && lines[lines.length - 1].length) { lines.push([]); lw = 0; } lines[lines.length - 1].push({ s, ww, w }); lw += ww + sp; }
        g.translate(W / 2, capO.y - ((lines.length - 1) * capO.lh) / 2); g.scale(0.86 + 0.14 * k, 0.86 + 0.14 * k); g.globalAlpha = clamp(k * 1.6); g.textAlign = 'center'; g.textBaseline = 'middle'; g.lineJoin = 'round';
        lines.forEach((ln, li) => { const tw = ln.reduce((a, p) => a + p.ww, 0) + sp * (ln.length - 1); let px = -tw / 2; for (const p of ln) { const act = t >= p.w.s - 0.05, em = capO.emph[B.norm(p.w.w)]; g.save(); g.translate(px + p.ww / 2, li * capO.lh); g.lineWidth = 15; g.strokeStyle = 'rgba(6,8,11,.94)'; g.strokeText(p.s, 0, 0); g.fillStyle = act ? (em || (t < p.w.e + 0.05 ? '#f2c230' : '#F5F3EE')) : 'rgba(245,243,238,.62)'; g.fillText(p.s, 0, 0); g.restore(); px += p.ww + sp; } });
        g.restore();
      }

      // ------------------------------------------------------------ frame
      // How much is the picture moving (screen px / frame)? Drives the sub-frame motion blur (whip-pans, whip transitions, impact shakes).
      function speed(t) { const sc = scenes[sceneIdx(t)]; const a = camAt(sc, t), b = camAt(sc, t - 1 / fps); let sp = Math.hypot((a.x - b.x) * a.z + (a.sx - b.sx), (a.y - b.y) * a.z + (a.sy - b.sy)) + Math.abs(Math.log(a.z / b.z)) * 700;
        const nx = scenes[sceneIdx(t) + 1]; for (const q of [sc, nx]) { if (!q || !q.src.transition) continue; const d = q.src.transition.dur || 0, ty = q.src.transition.type; if ((ty === 'whip' || ty === 'slide') && d > 0 && Math.abs(t - q.t0) < d / 2 + 0.05) sp = Math.max(sp, 380); } return sp; }
      window.render = function (t) {
        const sp = spec.motionBlur === false ? 0 : speed(t), n = sp > 260 ? 12 : sp > 150 ? 8 : sp > 70 ? 5 : sp > 34 ? 3 : 1, sc = scenes[sceneIdx(t)];
        const needsAlias = n > 1;
        if (n === 1) { X.setTransform(1, 0, 0, 1, 0, 0); composite(X, t); }
        else { for (let k = 0; k < n; k++) { AG.setTransform(1, 0, 0, 1, 0, 0); S1.setTransform(1, 0, 0, 1, 0, 0); composite(S1, t - (k / n) * (0.9 / fps)); AG.globalAlpha = 1 / (k + 1); AG.drawImage(SCR, 0, 0); } AG.globalAlpha = 1; X.setTransform(1, 0, 0, 1, 0, 0); X.drawImage(ACC, 0, 0); }
        void needsAlias; void sc;
        X.save(); const vg = X.createRadialGradient(W / 2, H * 0.44, W * 0.5, W / 2, H * 0.5, H * 0.75); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, `rgba(0,0,0,${spec.vignette ?? 0.28})`); X.fillStyle = vg; X.fillRect(0, 0, W, H); X.restore();
        captions(X, t);
        if (spec.grain !== false && B.makeGrain) { if (!B.grainPattern) B.grainPattern = X.createPattern(B.makeGrain(256), 'repeat'); X.save(); X.globalAlpha = spec.grain ?? 0.3; X.globalCompositeOperation = 'multiply'; X.fillStyle = B.grainPattern; X.fillRect(0, 0, W, H); X.restore(); }
      };
      // sfx + debug for bm2.cjs check / render / mix.py
      for (const s of spec.sfx || []) sfx.push({ ...s, at: T(s.at) });
      window.BM2_SFX = { duration: spec.duration, sfx: sfx.sort((a, b) => a.at - b.at).map(s => ({ gain: -8, dur: 1, ...s, at: +Math.max(0, s.at).toFixed(3) })), bed: spec.bed || null };
      rows.sort((a, b) => a.t - b.t);
      B.debug = { scenes, rows, T, chunks, beats: rows.filter(r => r.shot).map(r => ({ t: r.t, beat: r.text.replace(/^SHOT /, ''), focus: '', st: r.scene, pose: '' })), cam: camAt, shotAt };
    } catch (e) { err = e; console.error('BM2 story error: ' + e.message + '\n' + (e.stack || '').split('\n').slice(0, 3).join(' | ')); window.render = () => { X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = '#300'; X.fillRect(0, 0, W, H); X.fillStyle = '#fff'; X.font = '28px monospace'; X.textBaseline = 'top'; let y = 300; for (const ln of ('BM2 STORY ERROR\n' + e.message).match(/.{1,56}/g)) { X.fillText(ln, 60, y); y += 40; } }; } }
    const base = B.base || '', fontList = [['Anton', 'anton-latin-400-normal.woff2', '400'], ['Inter', 'inter-latin-600-normal.woff2', '600'], ['Inter', 'inter-latin-800-normal.woff2', '800'], ['JBM', 'jetbrains-mono-latin-700-normal.woff2', '700'], ['JBM', 'jetbrains-mono-latin-800-normal.woff2', '800']];
    window.ready = Promise.all(fontList.map(([f, u, w]) => new FontFace(f, `url(${base}fonts/${u})`, { weight: w }).load().then(ff => document.fonts.add(ff)))).then(() => { build(); window.render(0); if (err) throw err; });
  };
  // Storyboard table (markdown) from the compiled scene: one row per scene action / shot. `node bm2.cjs board <dir>` prints it.
  B.storyBoard = function () { const d = B.debug; if (!d) return ''; const f = t => t.toFixed(2).padStart(5); const out = ['| time | scene | who | action / shot |', '|---|---|---|---|']; for (const r of d.rows) out.push(`| ${f(r.t)} | ${r.scene} | ${r.who || ''} | ${r.text} |`); return out.join('\n'); };
})();
