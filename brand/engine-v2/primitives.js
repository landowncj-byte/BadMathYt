// Bad Math engine v2 — primitives: math, easing, springs, text, tactile surfaces, number roll.
// Everything is a pure function of its arguments (deterministic). Loaded first; creates window.BM2.
(function () {
  const BM2 = (window.BM2 = window.BM2 || {});
  // format: portrait Shorts by default; set window.BM2_FORMAT = '16:9' (before this file loads) for 1920x1080 landscape.
  const LAND = window.BM2_FORMAT === '16:9';
  const W = LAND ? 1920 : 1080, H = LAND ? 1080 : 1920;
  // layout tokens: every position that used to be a literal 1080x1920 number lives here (portrait values are unchanged).
  const L = LAND ? {
    land: true, stage: { sx: 960, sy: 470 }, maxH: 760, pill: [64, 40, 46, 28, 24], pillTitleY: 23, cap: { y: 945, size: 58, maxChars: 26, maxWords: 5, width: 1300, lh: 70 },
    foot: { x: 64, y: 1036, dy: 22, size: 16 }, light: [620, 260], bgR: 2100, vig: [W / 2, H * 0.5, 760, W / 2, H * 0.5, 1260],
    dotX: 1.0, farX: 2300, farY: 1500, fgX: 1300, fgY: 800, stFirst: { x: 1740, y: 1062, s: 0.9 }, peek: { top: 96, xmin: 150, xmax: W - 150 }, bubble: [1500, 520], follow: [1500, 700] } : {
    land: false, stage: { sx: 540, sy: 740 }, maxH: 980, pill: [90, 238, 52, 30, 26], pillTitleY: 27, cap: { y: 1432, size: 66, maxChars: 15, maxWords: 3, width: 800, lh: 80 },
    foot: { x: 90, y: 1500, dy: 25, size: 17 }, light: null, bgR: 1750, vig: [W / 2, H * 0.44, 520, W / 2, H * 0.5, 1280],
    dotX: 900, farX: 1400, farY: 2000, fgX: 700, fgY: 1100, stFirst: { x: 842, y: 1345, s: 1.12 }, peek: { top: 250, xmin: 150, xmax: 880 }, bubble: [560, 650], follow: [650, 1120] };
  const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  const lerp = (a, b, x) => a + (b - a) * x;
  const lin = (t, a, b) => (b === a ? (t >= b ? 1 : 0) : clamp((t - a) / (b - a)));
  const hash = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };

  // ---- easing (never linear for anything the eye reads as an event) ----
  const bez = (x1, y1, x2, y2) => u => { // cubic-bezier solver (Newton), CSS-compatible
    u = clamp(u); if (u === 0 || u === 1) return u; let s = u;
    for (let i = 0; i < 8; i++) { const x = 3 * (1 - s) * (1 - s) * s * x1 + 3 * (1 - s) * s * s * x2 + s * s * s - u; const d = 3 * (1 - s) * (1 - s) * x1 + 6 * (1 - s) * s * (x2 - x1) + 3 * s * s * (1 - x2); if (Math.abs(d) < 1e-6) break; s = clamp(s - x / d); }
    return 3 * (1 - s) * (1 - s) * s * y1 + 3 * (1 - s) * s * s * y2 + s * s * s;
  };
  const ease = {
    out: bez(0.16, 1, 0.3, 1),        // enter: fast start, long settle
    in: bez(0.7, 0, 0.84, 0),         // exit: accelerate away
    inOut: bez(0.65, 0, 0.35, 1),     // reposition on screen
    glide: bez(0.45, 0, 0.15, 1),     // camera travel: soft start, long landing
    push: bez(0.22, 1, 0.36, 1),      // camera push-in: lands early, drifts
    pop: bez(0.34, 1.56, 0.64, 1),    // overshoot
    antic: bez(0.5, -0.35, 0.2, 1),   // anticipation: dips back first
    expo: u => (u >= 1 ? 1 : 1 - Math.pow(2, -10 * clamp(u))),
    cubicOut: u => 1 - Math.pow(1 - clamp(u), 3),
  };
  // Analytic damped spring step response: 0 -> 1. f = frequency (Hz), z = damping ratio (<1 overshoots).
  // Presets below. Deterministic: no simulation state.
  function spring(t, o) {
    if (t <= 0) return 0; const p = typeof o === 'string' ? SPRINGS[o] : (o || SPRINGS.snappy);
    const w = 2 * Math.PI * p.f, z = p.z;
    if (z >= 1) return 1 - Math.exp(-w * t) * (1 + w * t);
    const wd = w * Math.sqrt(1 - z * z);
    return 1 - Math.exp(-z * w * t) * (Math.cos(wd * t) + (z * w / wd) * Math.sin(wd * t));
  }
  const SPRINGS = {
    snappy: { f: 2.6, z: 0.62 },  // default: one small overshoot (~8%), settles in ~0.45 s
    soft: { f: 1.7, z: 0.8 },     // heavy things, camera-adjacent, almost no overshoot
    bouncy: { f: 3.0, z: 0.4 },   // light things: coins, pops (2 visible bounces)
    heavy: { f: 1.3, z: 0.9 },    // big cards, slow settle
    stiff: { f: 4.2, z: 0.7 },    // tiny UI ticks
  };
  // stagger: local time for item i (start offset per item, capped total)
  const stagger = (lt, i, n, per = 0.06, cap = 0.7) => lt - i * Math.min(per, cap / Math.max(1, n));
  // decaying hit: 1 at t=0, back to 0; use for squash, shake, flashes
  const hit = (t, decay = 8) => (t < 0 ? 0 : Math.exp(-decay * t));
  const wobble = (t, f = 9, decay = 6) => (t < 0 ? 0 : Math.exp(-decay * t) * Math.sin(2 * Math.PI * f * t));

  // ---- colour ----
  const hex = h => { h = h.replace('#', ''); if (h.length === 3) h = [...h].map(c => c + c).join(''); return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16)); };
  const rgba = (h, a = 1) => { const [r, g, b] = hex(h); return `rgba(${r},${g},${b},${a})`; };
  const mix = (a, b, x) => { const A = hex(a), B = hex(b); return `rgb(${A.map((v, i) => Math.round(Math.sqrt(lerp(v * v, B[i] * B[i], x)))).join(',')})`; }; // gamma-aware mix (no muddy midpoints)
  const shade = (h, k) => (k >= 0 ? mix(h, '#ffffff', k) : mix(h, '#000000', -k));

  // ---- drawing helpers ----
  function rr(g, x, y, w, h, r) { g.beginPath(); g.roundRect(x, y, w, h, Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2)); }
  function txt(g, s, x, y, font, color, align = 'center', base = 'middle') { g.font = font; g.fillStyle = color; g.textAlign = align; g.textBaseline = base; g.fillText(s, x, y); }
  const F = { // brand type (locked): Anton hooks/hero numbers, Inter captions/labels, JetBrains Mono math
    hero: s => `400 ${s}px Anton`, cap: s => `800 ${s}px Inter`, label: s => `600 ${s}px Inter`, mono: s => `700 ${s}px JBM`, monoX: s => `800 ${s}px JBM`,
  };
  // Soft two-part shadow (contact + ambient). lift 0..1 raises the object toward the camera: the shadow gets longer and softer.
  // Shadows are in screen px, so they are scaled by the live camera zoom (BM2.zoomNow) to stay consistent.
  function shadowed(g, pathFn, fill, lift = 0, o = {}) {
    const z = BM2.zoomNow || 1, col = o.shadow || BM2.theme.shadow, k = o.k ?? 1;
    g.save(); g.fillStyle = fill;
    g.shadowColor = rgba(col, (0.34 + 0.1 * lift) * k); g.shadowBlur = (34 + 60 * lift) * z; g.shadowOffsetX = (8 + 14 * lift) * z; g.shadowOffsetY = (18 + 34 * lift) * z; pathFn(); g.fill();
    g.shadowColor = rgba(col, 0.42 * k); g.shadowBlur = 7 * z; g.shadowOffsetX = 1.5 * z; g.shadowOffsetY = 4 * z; pathFn(); g.fill();
    g.restore();
  }
  // Paper card: soft shadow, top-left light, faint edge highlight, paper tooth. The basic tactile surface of v2.
  function paper(g, x, y, w, h, r = 22, o = {}) {
    const fill = o.fill || BM2.theme.paper, lift = o.lift || 0;
    shadowed(g, () => rr(g, x, y, w, h, r), fill, lift, o);
    g.save(); rr(g, x, y, w, h, r); g.clip();
    const lg = g.createLinearGradient(x, y, x + w * 0.6, y + h); lg.addColorStop(0, 'rgba(255,255,255,.22)'); lg.addColorStop(0.5, 'rgba(255,255,255,0)'); lg.addColorStop(1, 'rgba(40,24,10,.10)'); g.fillStyle = lg; g.fillRect(x, y, w, h);
    if (BM2.grainPattern && o.grain !== false) { g.globalAlpha = 0.5; g.globalCompositeOperation = 'multiply'; g.fillStyle = BM2.grainPattern; g.fillRect(x, y, w, h); }
    g.restore();
    g.save(); g.strokeStyle = 'rgba(255,255,255,.55)'; g.lineWidth = 1.5; rr(g, x + 1, y + 1, w - 2, h - 2, r); g.stroke(); g.restore();
  }
  // Clay shape: a matte solid with a soft top highlight and bottom shade (for bars, pills, coins, buttons).
  function clay(g, x, y, w, h, r, color, o = {}) {
    shadowed(g, () => rr(g, x, y, w, h, r), color, o.lift || 0, { k: o.shadowK ?? 0.8 });
    g.save(); rr(g, x, y, w, h, r); g.clip();
    const lg = g.createLinearGradient(x, y, x, y + h); lg.addColorStop(0, 'rgba(255,255,255,.26)'); lg.addColorStop(0.35, 'rgba(255,255,255,0)'); lg.addColorStop(1, 'rgba(0,0,0,.20)'); g.fillStyle = lg; g.fillRect(x, y, w, h);
    const sg = g.createLinearGradient(x, y, x + w, y); sg.addColorStop(0, 'rgba(255,255,255,.10)'); sg.addColorStop(1, 'rgba(0,0,0,.10)'); g.fillStyle = sg; g.fillRect(x, y, w, h);
    g.restore();
  }
  // Marker swipe behind a value (the v2 replacement for a neon glow): k 0..1 wipes left to right.
  function marker(g, x, y, w, h, color, k, a = 0.3) {
    if (k <= 0) return; g.save(); g.fillStyle = rgba(color, a); g.beginPath();
    const ww = w * ease.out(k); g.moveTo(x - 6, y + 3); g.lineTo(x + ww + 4, y - 2); g.lineTo(x + ww + 8, y + h - 3); g.lineTo(x - 3, y + h + 2); g.closePath(); g.fill(); g.restore();
  }
  // Tick burst: short radiating strokes that fly out and fade (landing accent; not a glow).
  function burst(g, x, y, r, color, lt, n = 14, dur = 0.5) {
    if (lt <= 0 || lt >= dur) return; const k = ease.out(lt / dur); g.save(); g.strokeStyle = rgba(color, 1 - k); g.lineCap = 'round'; g.lineWidth = 7 * (1 - k * 0.6);
    for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2 + 0.2, r0 = r * (0.75 + 0.55 * k), r1 = r0 + r * 0.22 * (1 - k) + 6; g.beginPath(); g.moveTo(x + Math.cos(a) * r0, y + Math.sin(a) * r0 * 0.8); g.lineTo(x + Math.cos(a) * r1, y + Math.sin(a) * r1 * 0.8); g.stroke(); }
    g.restore();
  }

  // ---- number roll (odometer with tabular digits) ----
  // Draws value v with per-digit vertical rolling. Digits keep a fixed cell width so nothing jitters.
  // o: {font, size, color, prefix, suffix, decimals, align:'center'|'left'|'right', commas, speed (units/s, for smear)}
  function fmtNum(v, dec = 0, commas = true) { const s = Math.abs(v).toFixed(dec); const [a, b] = s.split('.'); const A = commas ? a.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : a; return (v < 0 ? '-' : '') + A + (b ? '.' + b : ''); }
  function rollWidth(g, v, o) { g.font = o.font; let cw = 0; for (let d = 0; d < 10; d++) cw = Math.max(cw, g.measureText(String(d)).width); const s = fmtNum(Math.floor(v * Math.pow(10, o.decimals || 0)) / Math.pow(10, o.decimals || 0), o.decimals || 0, o.commas !== false); let w = g.measureText(o.prefix || '').width + g.measureText(o.suffix || '').width; for (const ch of s) w += /\d/.test(ch) ? cw : g.measureText(ch).width; return { w, cw, s }; }
  function roll(g, v, x, y, o) {
    const dec = o.decimals || 0, scale = Math.pow(10, dec), iv = v * scale; // work in integer units of the last shown place
    const { w, cw, s } = rollWidth(g, v, o); const size = o.size, colr = o.color;
    let px = o.align === 'left' ? x : o.align === 'right' ? x - w : x - w / 2;
    g.save(); g.font = o.font; g.textBaseline = 'middle'; g.textAlign = 'left'; g.fillStyle = colr;
    if (o.prefix) { g.fillText(o.prefix, px, y); px += g.measureText(o.prefix).width; }
    const digits = s.replace(/[^\d]/g, '').length; let di = 0;
    for (const ch of s) {
      if (!/\d/.test(ch)) { g.fillText(ch, px, y); px += g.measureText(ch).width; continue; }
      const place = digits - 1 - di; di++; const unit = Math.pow(10, place);
      // odometer: a place only turns while the places below it roll over
      const base = Math.floor(iv / unit), low = place === 0 ? iv - Math.floor(iv) : (iv - base * unit) / unit;
      const carry = place === 0 ? low : clamp((low * unit - (unit - 1)), 0, 1), d = ((base % 10) + 10) % 10, nx = (d + 1) % 10;
      const fast = (o.speed || 0) * scale / unit > 14; // digits turning faster than ~14/s smear instead of strobing
      g.save(); g.beginPath(); g.rect(px - 2, y - size * 0.68, cw + 4, size * 1.36); g.clip(); g.textAlign = 'center';
      if (fast) { const ph = (iv / unit * 0.37) % 1; g.globalAlpha = 0.5; for (let k = -1; k < 3; k++) g.fillText(String((d + k + 10) % 10), px + cw / 2, y + (k - ph) * size * 1.3); }
      else { const c = ease.inOut(carry); g.fillText(String(d), px + cw / 2, y - c * size * 1.4); g.fillText(String(nx), px + cw / 2, y + (1 - c) * size * 1.4); }
      g.restore(); px += cw;
    }
    if (o.suffix) g.fillText(o.suffix, px, y);
    g.restore(); return w;
  }
  // Count progress for counters: ease-out expo by default so the big digits land softly on the final value.
  const countAt = (lt, dur, from, to, e = ease.expo) => (lt >= dur ? to : from + (to - from) * e(lt / dur));

  // ---- grain (static paper tooth; built once, deterministic) ----
  function makeGrain(size = 256) {
    const cv = document.createElement('canvas'); cv.width = cv.height = size; const g = cv.getContext('2d'), im = g.createImageData(size, size);
    for (let i = 0; i < size * size; i++) { const n = hash(i * 1.37 + 9.1), n2 = hash(i * 0.11 + 3.3); const v = 255 - Math.floor(34 * n * n2); im.data[i * 4] = im.data[i * 4 + 1] = im.data[i * 4 + 2] = v; im.data[i * 4 + 3] = 255; }
    g.putImageData(im, 0, 0); return cv;
  }

  Object.assign(BM2, { W, H, L, LAND, clamp, lerp, lin, hash, bez, ease, spring, SPRINGS, stagger, hit, wobble, hex, rgba, mix, shade, rr, txt, F, shadowed, paper, clay, marker, burst, fmtNum, roll, rollWidth, countAt, makeGrain, zoomNow: 1 });
})();
