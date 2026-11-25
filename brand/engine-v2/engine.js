// Bad Math engine v2 — scene compiler + renderer. Load order: primitives.js, camera.js, storyteller-v2.js, charts.js, engine.js.
// A scene is plain data (see README.md): elements placed in one continuous WORLD, plus BEATS that move the camera
// and the storyteller on spoken words. BM2.scene(spec) compiles it and installs window.render(t) + window.ready.
(function () {
  const B = window.BM2, { W, H, clamp, lerp, lin, ease, spring, rgba, rr, txt, F } = B;
  // ---------- brand-locked themes (same Ink / Paper / Green / series accents as v1; no glow) ----------
  const THEMES = {
    whatif: { name: 'WHAT IF', pill: '#FFD60A', pillInk: '#0B0F14', accent: '#FFD60A', ink: '#0B0F14', paper: '#F5F3EE', paperShade: '#E7E2D6', good: '#00D26A', bad: '#FF3B30', goodInk: '#00A152', badInk: '#E0281E', accentInk: '#B88700', gold: '#F2B705', inkSoft: '#59606B', rule: '#D8D3C7', navy: '#2c3e66',
      stage: ['#2A3647', '#161E2A', '#0B0F14'], light: [330, 430], blobs: [['#1F5F6A', 0.62], ['#6A4A1E', 0.5], ['#2A4278', 0.6], ['#1F5F6A', 0.45]], dust: '#FFE9C2', shadow: '#020409' },
    decoded: { name: 'DECODED', pill: '#FF3B30', pillInk: '#F5F3EE', accent: '#FF3B30', ink: '#0B0F14', paper: '#F5F3EE', paperShade: '#E7E2D6', good: '#00D26A', bad: '#FF3B30', goodInk: '#00A152', badInk: '#E0281E', accentInk: '#E0281E', gold: '#F2B705', inkSoft: '#59606B', rule: '#D8D3C7', navy: '#2c3e66', manila: '#E2C48D',
      stage: ['#33292B', '#1B1719', '#0B0F14'], light: [300, 380], blobs: [['#6A221C', 0.6], ['#57431F', 0.5], ['#1E2A3C', 0.55], ['#6A221C', 0.4]], dust: '#FFD9B0', shadow: '#030203' },
  };
  B.themes = THEMES; B.theme = THEMES.whatif;
  const tone = (name, onPaper = true) => { const T = B.theme; return { good: onPaper ? T.goodInk : T.good, bad: onPaper ? T.badInk : T.bad, accent: onPaper ? T.accentInk : T.accent, ink: T.ink, paper: T.paper, gold: T.gold, navy: T.navy, soft: T.inkSoft }[name] || name || T.ink; };
  B.tone = tone;

  // ---------- time references: seconds, or '@word' against words.json ----------
  // '@$34' first time "$34" is spoken (word start) · '@$34#2' second time · '@cents>' word END · '@math+0.3' / '@math-0.2' offset.
  const norm = w => String(w).toLowerCase().replace(/^[^\w$%¢]+|[^\w$%¢]+$/g, '');
  // Long-form refs (voice.paragraphs present): '@P15' paragraph start · '@P15>' paragraph end · '@P15:20' first "20" spoken inside P15 ·
  // '@P15:20#2' second · '@P15:twenty' (spelled numbers match their digits) · '@P15:#3' third word · '@P15:20>' word end · any ref takes +/-seconds.
  const NUMW = { zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90 };
  const alias = k => { if (k in NUMW) return [String(NUMW[k])]; const m = k.match(/^(twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)-(one|two|three|four|five|six|seven|eight|nine)$/); return m ? [String(NUMW[m[1]] + NUMW[m[2]])] : []; };
  function makeT(words, paras) {
    const byP = {}; for (const p of paras || []) byP[p.id] = { ...p, ws: words.filter(w => w.p === p.id) };
    return function T(ref) {
      if (typeof ref === 'number') return ref; if (typeof ref !== 'string' || ref[0] !== '@') throw new Error('bad time ref: ' + JSON.stringify(ref));
      const pm = ref.slice(1).match(/^(P\d+)(?::(.*?))?(?:#(\d+))?(>)?([+-]\d*\.?\d+)?$/);
      if (pm && byP[pm[1]]) { const P = byP[pm[1]], off = +(pm[5] || 0);
        if (pm[2] == null) return (pm[4] ? P.end : P.start) + off;
        if (pm[2][0] === '#' || pm[2] === '') { const w = P.ws[(+(pm[2].slice(1) || pm[3] || 1)) - 1]; if (!w) throw new Error(`time ref ${ref}: paragraph has ${P.ws.length} words`); return (pm[4] ? w.e : w.s) + off; }
        const key = norm(pm[2]), keys = [key, ...alias(key)], n = +(pm[3] || 1); let c = 0;
        for (const w of P.ws) if (keys.includes(norm(w.w)) && ++c === n) return (pm[4] ? w.e : w.s) + off;
        throw new Error(`time ref ${ref}: "${key}" #${n} not in ${pm[1]}. Words: ${P.ws.map(w => norm(w.w)).join(' ')}`); }
      const m = ref.slice(1).match(/^(.+?)(?:#(\d+))?(>)?([+-]\d*\.?\d+)?$/), key = norm(m[1]), n = +(m[2] || 1); let c = 0;
      for (const w of words) if (norm(w.w) === key && ++c === n) return (m[3] ? w.e : w.s) + (+m[4] || 0);
      throw new Error(`time ref ${ref}: word "${key}" #${n} not in words.json. Spoken words: ${words.map(w => norm(w.w)).join(' ')}`);
    };
  }
  const deepT = (v, T) => (typeof v === 'string' && v[0] === '@' ? T(v) : Array.isArray(v) ? v.map(x => deepT(x, T)) : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, deepT(x, T)])) : v);

  // ---------- choreography beats (camera + storyteller + focus presets) ----------
  // Every preset can be overridden per beat: fill, zoom, rot, sx, sy, dur, ease, lead, st, stDur, pose, point, blur, dim, keep, drift, arc.
  const BEATS = {
    'graphic-hero':    { fill: 0.8,  st: 'corner',   others: [3, 0.15], pose: 'point', dur: 0.9, ease: 'glide' },  // graphic owns the frame; he steps aside
    'zoom-on-number':  { fill: 0.62, st: 'corner',   others: [8, 0.35], pose: 'point', dur: 0.6, ease: 'push', rot: -0.012, maxH: 520 }, // camera flies into the number
    'pull-back':       { fill: 0.82, st: 'corner',   others: [0, 0],    pose: 'idle',  dur: 1.0, ease: 'glide' },  // reveal the context after a push
    'presenter-front': { fill: 0.72, st: 'front',    all: [7, 0.38],    pose: 'talk',  dur: 0.8, ease: 'glide', zoom: 0.9, lift: 0 }, // he walks in front and talks; graphic defocuses
    'side-by-side':    { fill: 0.6,  st: 'left',     others: [5, 0.25], pose: 'point', dur: 0.85, ease: 'glide', sx: 690 },           // him on one third, graphic on two
    'over-shoulder':   { fill: 0.78, st: 'shoulder', others: [5, 0.25], pose: 'idle',  dur: 0.9, ease: 'glide', sx: 610, sy: 700 },   // big soft foreground figure looking at it
    'peek':            { fill: 0.8,  st: 'peek',     others: [3, 0.15], pose: 'idle',  dur: 0.9, ease: 'glide' },  // graphic in front of HIM: he peeks over its top edge
    'wide':            { fill: 0.9,  st: 'corner',   others: [0, 0],    pose: 'idle',  dur: 1.1, ease: 'glide', lift: 0 },            // everything at once (endings, context)
  };
  const ST_SPOTS = { // feet position on screen, scale, depth layer. Captions sit under his feet (y >= 1375).
    corner: { x: 852, y: 1330, s: 0.95, layer: 'front', blur: 0, dim: 0 }, 'corner-left': { x: 200, y: 1330, s: 0.95, layer: 'front', blur: 0, dim: 0 },
    front: { x: 540, y: 1330, s: 1.8, layer: 'front', blur: 0, dim: 0 }, left: { x: 215, y: 1330, s: 1.4, layer: 'front', blur: 0, dim: 0 }, right: { x: 818, y: 1330, s: 1.4, layer: 'front', blur: 0, dim: 0 },
    shoulder: { x: 205, y: 1800, s: 2.7, layer: 'front', blur: 5, dim: 0.28 }, off: { x: 1290, y: 1330, s: 1, layer: 'front', blur: 0, dim: 0 }, 'off-left': { x: -210, y: 1330, s: 1, layer: 'front', blur: 0, dim: 0 },
  };
  if (B.LAND) { // 1920x1080: he roams the right/left edges; fill = share of the 1920 width
    Object.assign(BEATS, {
      'graphic-hero': { fill: 0.56, st: 'corner', others: [3, 0.15], pose: 'point', dur: 0.9, ease: 'glide', sx: 880 },
      'zoom-on-number': { fill: 0.46, st: 'corner', others: [8, 0.35], pose: 'point', dur: 0.6, ease: 'push', rot: -0.01, maxH: 430, sx: 880 },
      'pull-back': { fill: 0.58, st: 'corner', others: [0, 0], pose: 'idle', dur: 1.0, ease: 'glide', sx: 880 },
      'presenter-front': { fill: 0.5, st: 'front', all: [7, 0.38], pose: 'talk', dur: 0.8, ease: 'glide', zoom: 0.9, lift: 0, sx: 820 },
      'side-by-side': { fill: 0.52, st: 'left', others: [5, 0.25], pose: 'point', dur: 0.85, ease: 'glide', sx: 1100 },
      'over-shoulder': { fill: 0.56, st: 'shoulder', others: [5, 0.25], pose: 'idle', dur: 0.9, ease: 'glide', sx: 1060, sy: 450 },
      'peek': { fill: 0.56, st: 'peek', others: [3, 0.15], pose: 'idle', dur: 0.9, ease: 'glide', sx: 880, sy: 520 },
      'wide': { fill: 0.92, st: 'corner', others: [0, 0], pose: 'idle', dur: 1.1, ease: 'glide', lift: 0, sx: 880 },
    });
    Object.assign(ST_SPOTS, {
      corner: { x: 1760, y: 1064, s: 0.9, layer: 'front', blur: 0, dim: 0 }, 'corner-left': { x: 170, y: 1064, s: 0.9, layer: 'front', blur: 0, dim: 0 },
      front: { x: 1620, y: 1100, s: 1.5, layer: 'front', blur: 0, dim: 0 }, left: { x: 190, y: 1075, s: 1.15, layer: 'front', blur: 0, dim: 0 }, right: { x: 1700, y: 1075, s: 1.15, layer: 'front', blur: 0, dim: 0 },
      shoulder: { x: 230, y: 1230, s: 2.2, layer: 'front', blur: 5, dim: 0.28 }, off: { x: 2250, y: 1064, s: 1, layer: 'front', blur: 0, dim: 0 }, 'off-left': { x: -330, y: 1064, s: 1, layer: 'front', blur: 0, dim: 0 },
    });
  }
  B.BEATS = BEATS; B.ST_SPOTS = ST_SPOTS;

  B.scene = function (spec) {
    const voice = spec.voice || window.BM2_VOICE || { words: [], mouth: [] }, T = makeT(voice.words || [], voice.paragraphs), fps = spec.fps || 30;
    const theme = (B.theme = { ...THEMES[spec.series || 'whatif'], ...(spec.theme || {}) });
    const C = document.getElementById('c') || document.body.appendChild(Object.assign(document.createElement('canvas'), { id: 'c' })); C.width = W; C.height = H; const X = C.getContext('2d');
    const mk = () => { const c = document.createElement('canvas'); c.width = W; c.height = H; return [c, c.getContext('2d')]; };
    const [SCR, S] = mk(), [WLD, WG] = mk(), [ACC, AG] = mk();
    let err = null;
    function build() { try {
      // ----- elements -----
      const els = (spec.elements || []).map((e, i) => { const def = B.elements[e.type]; if (!def) throw new Error(`element "${e.id}": unknown type "${e.type}". Types: ${Object.keys(B.elements).join(', ')}`);
        const props = deepT({ ...(def.defaults || {}), ...(e.props || {}) }, T); return { scale: 1, rot: 0, layer: 'mid', enter: def.enter || 'pop', z: i, ...e, at: e.at || [0, 0], in: T(e.in ?? 0), out: e.out == null ? Infinity : T(e.out), props, def }; });
      const byId = Object.fromEntries(els.map(e => [e.id, e]));
      const boxOf = ref => { // 'id' | 'id.anchor' | [ids...] | {x,y,w,h} -> world box (centre + size)
        if (Array.isArray(ref)) { const bs = ref.map(boxOf), x0 = Math.min(...bs.map(b => b.x - b.w / 2)), x1 = Math.max(...bs.map(b => b.x + b.w / 2)), y0 = Math.min(...bs.map(b => b.y - b.h / 2)), y1 = Math.max(...bs.map(b => b.y + b.h / 2)); return { x: (x0 + x1) / 2, y: (y0 + y1) / 2, w: x1 - x0, h: y1 - y0 }; }
        if (typeof ref === 'object') return ref; const [id, an] = ref.split('.'), e = byId[id]; if (!e) throw new Error(`focus "${ref}": no element with id "${id}"`);
        let [w, h] = e.def.size(e.props), cx = 0, cy = 0; if (an) { const a = (e.def.anchors ? e.def.anchors(e.props) : {})[an]; if (!a) throw new Error(`focus "${ref}": element type "${e.type}" has no anchor "${an}". Anchors: ${Object.keys(e.def.anchors ? e.def.anchors(e.props) : {}).join(', ')}`); [cx, cy, w, h] = a; }
        const c = Math.cos(e.rot), s = Math.sin(e.rot); return { x: e.at[0] + (cx * c - cy * s) * e.scale, y: e.at[1] + (cx * s + cy * c) * e.scale, w: w * e.scale, h: h * e.scale };
      };
      // ----- beats -> camera keys, storyteller keys, focus keys, pose timeline -----
      const beats = (spec.beats || []).map(b => ({ ...BEATS[b.beat || 'graphic-hero'], ...b, t: T(b.at) })).sort((a, b) => a.t - b.t);
      if (!beats.length) throw new Error('scene needs at least one beat');
      const camKeys = [], stKeys = [], focusKeys = [], poseTL = [], sfx = [];
      const worldIds = els.filter(e => e.layer === 'mid').map(e => e.id);
      beats.forEach((b, i) => {
        if (!BEATS[b.beat || 'graphic-hero']) throw new Error(`beat "${b.beat}" unknown. Beats: ${Object.keys(BEATS).join(', ')}`);
        const whip = b.move === 'whip', lead = b.lead ?? (i === 0 ? 0 : whip ? 0.3 : 0.2), dur = b.dur0 ?? (whip ? 0.5 : b.dur), t0 = i === 0 ? -1 : b.t - lead;
        const focus = b.focus ?? (b.beat === 'wide' ? worldIds : beats[i - 1] && beats[i - 1].focus), box = boxOf(focus); b.focus = focus;
        const to = B.Camera.frame(box, b.fill, { zoom: b.zoom, rot: b.rot, sx: b.sx, sy: b.sy, maxH: b.maxH });
        camKeys.push({ t: t0, dur: i === 0 ? 0 : dur, to, ease: whip ? 'inOut' : b.ease, arc: b.arc ?? (whip ? 0.12 : undefined), drift: b.drift });
        // storyteller placement
        let spot = b.st; if (typeof spot === 'string') { if (spot === 'peek') { const zs = to.z, top = to.sy - (box.h / 2) * zs, right = to.sx + (box.w / 2) * zs, left = to.sx - (box.w / 2) * zs, s = b.stScale || 1.15, side = b.side === 'left' ? -1 : 1; spot = { x: clamp(side > 0 ? right - 150 : left + 150, B.L.peek.xmin, B.L.peek.xmax), y: Math.max(top + 100 * s, B.L.peek.top + 285 * s), s, layer: 'back', blur: 0, dim: 0.12 }; } else { if (!ST_SPOTS[spot]) throw new Error(`beat st "${spot}" unknown. Spots: peek, ${Object.keys(ST_SPOTS).join(', ')}`); spot = { ...ST_SPOTS[spot] }; if (b.side === 'right' && b.st === 'left') spot = { ...ST_SPOTS.right }; if (b.stScale) spot.s = b.stScale; } }
        else spot = { blur: 0, dim: 0, layer: 'front', ...spot };
        stKeys.push({ t: i === 0 ? -1 : t0 + (b.stDelay || 0), dur: i === 0 ? 0 : b.stDur ?? 0.75, to: spot, hop: b.hop });
        // focus (what is sharp / lifted toward the camera)
        const ids = (Array.isArray(focus) ? focus : [focus]).filter(f => typeof f === 'string').map(f => f.split('.')[0]), hot = typeof focus === 'string' && focus.includes('.') ? focus.split('.') : null;
        const keep = new Set([...(b.keep || []), ...(b.all ? [] : ids)]), oth = b.all || b.others || [0, 0];
        focusKeys.push({ t: t0, dur: Math.max(0.35, dur * 0.8), blur: b.blur ?? oth[0], dim: b.dim ?? oth[1], keep, lift: b.lift ?? 1, ids: new Set(ids), hot, at: b.t });
        const tgt = b.point ?? (typeof focus === 'string' ? focus : null); poseTL.push([i === 0 ? -1 : b.t - 0.12, b.pose, (b.pose === 'point' || b.look || b.point) && tgt ? { targetRef: b.look || tgt } : {}]);
        if (b.sfx) sfx.push({ at: b.t - (whip ? lead : 0), ...(typeof b.sfx === 'string' ? { name: b.sfx } : b.sfx) }); else if (spec.autoSfx !== false && i > 0) { if (whip) sfx.push({ at: t0, name: 'whoosh_2', gain: -10, dur: 0.7 }); else if (b.beat === 'zoom-on-number') sfx.push({ at: t0, name: 'swipe_2', gain: -13, dur: 0.45 }); }
      });
      for (const p of spec.poses || []) poseTL.push([T(p[0]), p[1], p[2] && p[2].target ? (Array.isArray(p[2].target) ? { target: p[2].target } : { targetRef: p[2].target }) : {}]);
      poseTL.sort((a, b) => a[0] - b[0]);
      for (const s of spec.sfx || []) sfx.push({ ...s, at: T(s.at) });
      for (const e of els) if (e.sfx) sfx.push({ at: e.in, ...(typeof e.sfx === 'string' ? { name: e.sfx } : e.sfx) });
      const shakes = (spec.shakes || []).map(s => (Array.isArray(s) ? [T(s[0]), s[1]] : [T(s)]));
      const cam = B.Camera.make(camKeys, { shakes, float: spec.float }), stTrack = B.Storyteller.track(stKeys);
      window.BM2_SFX = { duration: spec.duration, sfx: sfx.sort((a, b) => a.at - b.at).map(s => ({ gain: -8, dur: 1, ...s, at: +Math.max(0, s.at).toFixed(3) })), bed: spec.bed || null };
      // focus state for an element at time t (blend from the previous beat)
      const focusOf = (k, id) => (k.keep.has(id) ? { blur: 0, dim: 0, lift: k.ids.has(id) ? k.lift : 0 } : { blur: k.blur, dim: k.dim, lift: 0 });
      function focusAt(t, id) { let i = 0; for (let j = 0; j < focusKeys.length; j++) if (t >= focusKeys[j].t) i = j; const k = focusKeys[i], a = focusOf(k, id); if (i === 0) return { ...a, hot: k.hot && k.hot[0] === id ? k.hot[1] : null, hotK: 1, hotT: t - k.at };
        const p0 = focusKeys[i - 1], b0 = focusOf(p0, id), u = ease.inOut(lin(t, k.t, k.t + k.dur));
        return { blur: lerp(b0.blur, a.blur, u), dim: lerp(b0.dim, a.dim, u), lift: lerp(b0.lift, a.lift, clamp(spring(t - k.t, 'soft'), 0, 1.1)), hot: k.hot && k.hot[0] === id ? k.hot[1] : null, hotK: clamp(spring(t - k.at + 0.1, 'snappy'), 0, 1.2), hotT: t - k.at }; }

      // ----- captions (screen-fixed, built from words.json) -----
      const capO = spec.captions === false ? null : { ...B.L.cap, emph: {}, fix: [], hide: [], ...(spec.captions || {}) }, CAPPAPER = '#F5F3EE';
      let chunks = [];
      if (capO) {
        let toks = (voice.words || []).map(w => ({ ...w }));
        for (let i = 1; i < toks.length; i++) if (/^[,%.¢]/.test(toks[i].w) && toks[i].w.length > 1 || /^[%¢]$/.test(toks[i].w) || /^-\w/.test(toks[i].w)) { toks[i - 1].w += toks[i].w; toks[i - 1].e = toks[i].e; toks.splice(i--, 1); } // "17" + ",000" + "%" -> "17,000%"
        for (const [from, to] of capO.fix) { const seq = from.split(' '); for (let i = 0; i + seq.length <= toks.length; i++) if (seq.every((s, j) => toks[i + j].w === s)) toks.splice(i, seq.length, { w: to, s: toks[i].s, e: toks[i + seq.length - 1].e }); }
        let cur = []; const flush = () => { if (cur.length) chunks.push(cur); cur = []; };
        toks.forEach((w, i) => { const len = cur.reduce((a, x) => a + x.w.length + 1, 0); if (cur.length && (len + w.w.length > capO.maxChars || cur.length >= capO.maxWords)) flush(); cur.push(w); const nx = toks[i + 1]; if (/[.?!]$/.test(w.w) || (nx && nx.s - w.e > 0.35)) flush(); }); flush();
        chunks = chunks.map((ws, i, all) => { const nx = all[i + 1], end = ws[ws.length - 1].e; return { s: ws[0].s, e: nx && nx[0].s - end < 0.5 ? nx[0].s : end + 0.3, ws }; });
      }
      const emphOf = w => { const k = norm(w); for (const [key, tn] of Object.entries(capO.emph)) if (norm(key) === k) return { good: theme.good, bad: theme.bad, accent: theme.accent }[tn] || tn; return null; };
      function captions(g, t) {
        if (!capO || capO.hide.some(([a, b]) => t >= T(a) && t < T(b))) return; const ch = chunks.find(c => t >= c.s && t < c.e); if (!ch) return;
        const k = clamp(spring(t - ch.s + 0.12, 'stiff'), 0, 1.15); g.save(); g.font = F.cap(capO.size); const sp = g.measureText(' ').width, lines = [[]]; let lw = 0;
        for (const w of ch.ws) { const s = w.w.toUpperCase(), ww = g.measureText(s).width; if (lw + ww > capO.width && lines[lines.length - 1].length) { lines.push([]); lw = 0; } lines[lines.length - 1].push({ s, ww, w }); lw += ww + sp; }
        g.translate(W / 2, capO.y - ((lines.length - 1) * capO.lh) / 2); g.scale(0.86 + 0.14 * k, 0.86 + 0.14 * k); g.globalAlpha = clamp(k * 1.6); g.textAlign = 'center'; g.textBaseline = 'middle'; g.lineJoin = 'round';
        lines.forEach((ln, li) => { const tw = ln.reduce((a, p) => a + p.ww, 0) + sp * (ln.length - 1); let px = -tw / 2;
          for (const p of ln) { const act = t >= p.w.s - 0.05, pk = act ? clamp(spring(t - p.w.s + 0.03, 'snappy'), 0, 1.2) : 0, em = emphOf(p.w.w), col = em || (act && t < p.w.e + 0.05 ? theme.accent : CAPPAPER);
            g.save(); g.translate(px + p.ww / 2, li * capO.lh - 5 * Math.sin(Math.PI * clamp(pk)) * (pk < 1 ? 1 : 0)); const sc = 1 + 0.07 * (pk - (act ? 1 : 0)) + (em && act ? 0.05 : 0); g.scale(sc, sc);
            g.lineWidth = 15; g.strokeStyle = 'rgba(6,8,11,.94)'; g.strokeText(p.s, 0, 0); g.fillStyle = act ? col : rgba(CAPPAPER, 0.62); g.fillText(p.s, 0, 0); g.restore(); px += p.ww + sp; } });
        g.restore();
      }

      // ----- layers -----
      const grain = B.makeGrain(256); B.grainPattern = X.createPattern(grain, 'repeat');
      function background(g, s, t) {
        const [lx, ly] = (B.L.light && !theme.lightSet) ? B.L.light : theme.light, bg = g.createRadialGradient(lx, ly, 60, lx + 120, ly + 260, B.L.bgR); bg.addColorStop(0, theme.stage[0]); bg.addColorStop(0.5, theme.stage[1]); bg.addColorStop(1, theme.stage[2]); g.fillStyle = bg; g.fillRect(0, 0, W, H);
        // far layer (parallax 0.3): big soft colour fields, tiled every 2600 world px so long flights always have something drifting by
        g.save(); const z = B.Camera.apply(g, s, 0.3), cx = s.x * 0.3, cy = s.y * 0.3, per = 1500;
        for (let i = Math.floor((cx - B.L.farX) / per); i <= Math.floor((cx + B.L.farX) / per); i++) for (let j = Math.floor((cy - B.L.farY) / per); j <= Math.floor((cy + B.L.farY) / per); j++) {
          const h = B.hash(i * 7.3 + j * 13.1), [col, a] = theme.blobs[Math.floor(h * theme.blobs.length) % theme.blobs.length], bx = (i + 0.2 + 0.6 * B.hash(i + j * 3.7)) * per, by = (j + 0.2 + 0.6 * B.hash(i * 2.1 - j)) * per, r = 520 + 380 * h;
          const rg = g.createRadialGradient(bx, by, 0, bx, by, r); rg.addColorStop(0, rgba(col, a)); rg.addColorStop(1, rgba(col, 0)); g.fillStyle = rg; g.fillRect(bx - r, by - r, r * 2, r * 2); }
        g.restore();
        // mid-far layer (parallax 0.55): ledger dot grid, the motion cue that makes camera travel readable
        g.save(); const z2 = B.Camera.apply(g, s, 0.55), gx = s.x * 0.55, gy = s.y * 0.55, step = 96, rx = B.L.dotX / z2 + step, ry = 1500 / z2 + step; g.fillStyle = rgba(theme.paper, 0.075);
        for (let x = Math.floor((gx - rx) / step) * step; x <= gx + rx; x += step) for (let y = Math.floor((gy - ry) / step) * step; y <= gy + ry; y += step) { const big = (Math.round(x / step) % 4 === 0) && (Math.round(y / step) % 4 === 0); g.beginPath(); g.arc(x, y, big ? 4.2 : 2.4, 0, 7); g.fill(); }
        g.restore();
      }
      function foreground(g, s, t) { // parallax 1.4: a few soft out-of-focus motes close to the lens
        g.save(); const z = B.Camera.apply(g, s, 1.4), cx = s.x * 1.4, cy = s.y * 1.4, per = 900;
        for (let i = Math.floor((cx - B.L.fgX) / per); i <= Math.floor((cx + B.L.fgX) / per); i++) for (let j = Math.floor((cy - B.L.fgY) / per); j <= Math.floor((cy + B.L.fgY) / per); j++) {
          const h = B.hash(i * 3.1 + j * 17.7 + 5), x = (i + h) * per, y = (j + B.hash(i * 9.2 - j * 1.3)) * per + Math.sin(t * 0.4 + h * 9) * 22, r = 26 + 60 * B.hash(i - j * 4.4);
          const rg = g.createRadialGradient(x, y, 0, x, y, r); rg.addColorStop(0, rgba(theme.dust, 0.085)); rg.addColorStop(0.7, rgba(theme.dust, 0.05)); rg.addColorStop(1, rgba(theme.dust, 0)); g.fillStyle = rg; g.fillRect(x - r, y - r, 2 * r, 2 * r); }
        g.restore();
      }
      function drawEl(g, e, t, s) {
        const lt = t - e.in; if (lt < 0 || t > e.out + 0.3) return; const f = e.layer === 'screen' ? { blur: 0, dim: 0, lift: 0, hot: null, hotK: 0, hotT: -1 } : focusAt(t, e.id);
        const [w, h] = e.def.size(e.props);
        if (e.layer !== 'screen') { const [px, py] = B.Camera.toScreen(s, e.at[0], e.at[1]), rad = Math.hypot(w, h) * 0.5 * e.scale * s.z + 200; if (px < -rad || px > W + rad || py < -rad || py > H + rad) return; }
        const off = f.blur > 0.4 || f.dim > 0.02, G = off ? S : g;
        if (off) { S.setTransform(1, 0, 0, 1, 0, 0); S.clearRect(0, 0, W, H); }
        G.save(); let zoom = 1; if (e.layer !== 'screen') zoom = B.Camera.apply(G, s, e.layer === 'fg' ? 1.25 : 1); B.zoomNow = zoom * e.scale;
        let sc = e.scale * (1 + 0.045 * f.lift), a = 1, dy = -10 * f.lift;
        if (!e.def.ownEnter) { if (e.enter === 'pop') { sc *= 0.55 + 0.45 * spring(lt, 'snappy'); a = clamp(lt / 0.1); } else if (e.enter === 'rise') { dy += 140 * (1 - spring(lt, 'soft')); a = clamp(lt / 0.14); } else if (e.enter === 'drop') { dy -= 520 * (1 - spring(lt, { f: 2.1, z: 0.55 })); a = clamp(lt / 0.08); } else if (e.enter === 'slam') { sc *= 1 + 1.6 * (1 - ease.expo(lt / 0.22)) - 0.06 * B.wobble(lt - 0.2, 5, 9); a = clamp(lt / 0.06); } }
        if (t > e.out) { const x = ease.in(lin(t, e.out, e.out + 0.28)); a *= 1 - x; sc *= 1 - 0.1 * x; dy += 50 * x; }
        G.translate(e.at[0], e.at[1] + dy); G.rotate(e.rot); G.scale(sc, sc); G.globalAlpha = a;
        e.def.draw(G, e.props, { t, lt, T, theme, lift: f.lift, hot: f.hot, hotK: f.hotK, hotT: f.hotT, id: e.id, w, h, mouth: 0 }); G.restore(); B.zoomNow = 1;
        if (off) { if (f.dim > 0.02) { S.save(); S.setTransform(1, 0, 0, 1, 0, 0); S.globalCompositeOperation = 'source-atop'; S.fillStyle = rgba(theme.stage[1], f.dim); S.fillRect(0, 0, W, H); S.restore(); }
          g.save(); g.setTransform(1, 0, 0, 1, 0, 0); if (f.blur > 0.4) g.filter = `blur(${f.blur.toFixed(2)}px)`; g.drawImage(SCR, 0, 0); g.restore(); }
      }
      const mouthAt = t => (voice.mouth || [])[Math.min((voice.mouth || []).length - 1, Math.max(0, Math.floor(t * 30)))] || 0;
      function drawST(g, t, s, st) {
        if (spec.storyteller === false) return; const tl = poseTL.map(p => (p[2].targetRef ? [p[0], p[1], { target: (b => B.Camera.toScreen(s, b.x, b.y))(boxOf(p[2].targetRef)) }] : p));
        const v = cam.base(t).x - cam.base(t - 1 / fps).x, lean = clamp(-v * s.z * 0.0022, -0.16, 0.16), off = st.blur > 0.4 || st.dim > 0.02, G = off ? S : g;
        if (off) { S.setTransform(1, 0, 0, 1, 0, 0); S.clearRect(0, 0, W, H); }
        B.Storyteller.draw(G, t, st, { mouth: mouthAt(t), timeline: tl, lean, enterAt: spec.stEnter });
        if (off) { if (st.dim > 0.02) { S.save(); S.globalCompositeOperation = 'source-atop'; S.fillStyle = rgba(theme.stage[1], st.dim); S.fillRect(0, 0, W, H); S.restore(); } g.save(); if (st.blur > 0.4) g.filter = `blur(${st.blur.toFixed(2)}px)`; g.drawImage(SCR, 0, 0); g.restore(); }
      }
      const order = els.slice().sort((a, b) => a.z - b.z);
      function world(g, t) { // everything the camera sees
        const s = cam.at(t), st = stTrack.at(t); g.setTransform(1, 0, 0, 1, 0, 0); background(g, s, t);
        if (st.layer === 'back') drawST(g, t, s, st);
        for (const e of order) if (e.layer === 'mid') drawEl(g, e, t, s);
        if (st.layer !== 'back') drawST(g, t, s, st);
        for (const e of order) if (e.layer === 'fg') drawEl(g, e, t, s);
        foreground(g, s, t); return s;
      }
      function hud(g, t) { // brand-locked series pill, top-left (same as v1)
        if (spec.pill === false) return; const [px, py, ph, pf, tf] = B.L.pill; g.save(); g.font = F.cap(pf); const pw = g.measureText(theme.name).width + 44;
        rr(g, px, py, pw, ph, 8); g.fillStyle = theme.pill; g.fill(); txt(g, theme.name, px + pw / 2, py + ph / 2 + 1, F.cap(pf), theme.pillInk); if (spec.title) { if (B.L.land) { g.font = F.mono(tf); const tw = g.measureText(spec.title).width; g.fillStyle = 'rgba(11,15,20,.8)'; rr(g, px + pw + 8, py + 2, tw + 28, ph - 4, 8); g.fill(); } txt(g, spec.title, px + pw + 20, py + ph / 2 + 1, F.mono(tf), rgba(theme.paper, 0.9), 'left'); } g.restore();
      }
      const vig = (() => { const g = X.createRadialGradient(...B.L.vig); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.5)'); return g; })();
      // ----- stage palettes over time (rooms): spec.stages = [{at, dur, theme:{stage, blobs, dust, paper, paperShade, rule}}] crossfade between rooms -----
      const hx = c => B.hex(c), hmix = (a, b, x) => '#' + hx(a).map((v, i) => Math.round(v + (hx(b)[i] - v) * x).toString(16).padStart(2, '0')).join('');
      const PAL = ['stage', 'blobs', 'dust', 'paper', 'paperShade', 'rule', 'inkSoft'], basePal = Object.fromEntries(PAL.map(k => [k, theme[k]]));
      const stageKeys = (spec.stages || []).map(k => ({ t: T(k.at), dur: k.dur ?? 1.0, pal: { ...basePal, ...k.theme } })).sort((a, b) => a.t - b.t);
      function palAt(t) { let i = -1; for (let j = 0; j < stageKeys.length; j++) if (t >= stageKeys[j].t) i = j; if (i < 0) return basePal; const k = stageKeys[i], p0 = i ? stageKeys[i - 1].pal : basePal, u = ease.inOut(lin(t, k.t, k.t + k.dur)); if (u >= 1) return k.pal;
        const o = {}; for (const f of PAL) { const a = p0[f], b = k.pal[f]; o[f] = Array.isArray(a) ? a.map((v, n) => (Array.isArray(v) ? [hmix(v[0], b[n][0], u), lerp(v[1], b[n][1], u)] : hmix(v, b[n], u))) : hmix(a, b, u); } return o; }
      window.render = function (t) {
        if (stageKeys.length) Object.assign(theme, palAt(t));
        // motion blur: when the camera travels fast, average sub-frame exposures of the world (shutter ~ 0.6 frame)
        const sp = cam.speed(t, fps), n = spec.motionBlur === false ? 1 : sp > 260 ? 14 : sp > 150 ? 10 : sp > 70 ? 6 : sp > 34 ? 3 : 1;
        if (n === 1) world(X, t); else { for (let k = 0; k < n; k++) { world(WG, t - (k / n) * (0.75 / fps)); AG.globalAlpha = 1 / (k + 1); AG.setTransform(1, 0, 0, 1, 0, 0); AG.drawImage(WLD, 0, 0); } X.setTransform(1, 0, 0, 1, 0, 0); X.drawImage(ACC, 0, 0); }
        X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = vig; X.fillRect(0, 0, W, H);
        const s = cam.at(t); for (const e of order) if (e.layer === 'screen') drawEl(X, e, t, s);
        const hudOn = !(spec.hudOff || []).some(([a, b]) => t >= T(a) && t < T(b)); if (hudOn) hud(X, t); captions(X, t);
        const fa = (hudOn ? 1 : 0) * (B.L.land ? clamp((stTrack.at(t).x - 380) / 220) : 1); X.save(); X.globalAlpha = fa; [].concat(spec.footnote || []).forEach((ln, i) => txt(X, ln, B.L.foot.x, B.L.foot.y + i * B.L.foot.dy, F.mono(B.L.foot.size), rgba(CAPPAPER, 0.6 - 0.1 * i), 'left')); X.restore();
        X.save(); X.globalAlpha = 0.5; X.globalCompositeOperation = 'multiply'; X.fillStyle = B.grainPattern; X.fillRect(0, 0, W, H); X.restore(); // paper tooth over the whole frame
      };
      B.debug = { cam, stTrack, els, beats, chunks, T, boxOf };
    } catch (e) { err = e; console.error('BM2 scene error: ' + e.message); window.render = () => { X.fillStyle = '#300'; X.fillRect(0, 0, W, H); X.fillStyle = '#fff'; X.font = '28px monospace'; X.textBaseline = 'top'; let y = 300; for (const ln of ('BM2 SCENE ERROR\n' + e.message).match(/.{1,56}/g)) { X.fillText(ln, 60, y); y += 40; } }; } }
    const base = B.base || (document.currentScript ? document.currentScript.src.replace(/[^/]*$/, '') : ''), fonts = [['Anton', 'anton-latin-400-normal.woff2', '400'], ['Inter', 'inter-latin-600-normal.woff2', '600'], ['Inter', 'inter-latin-800-normal.woff2', '800'], ['JBM', 'jetbrains-mono-latin-700-normal.woff2', '700'], ['JBM', 'jetbrains-mono-latin-800-normal.woff2', '800']];
    window.ready = Promise.all(fonts.map(([f, u, w]) => new FontFace(f, `url(${base}fonts/${u})`, { weight: w }).load().then(ff => document.fonts.add(ff)))).then(() => { build(); window.render(0); if (err) throw err; });
  };
  B.base = document.currentScript ? document.currentScript.src.replace(/[^/]*$/, '') : '';
})();
