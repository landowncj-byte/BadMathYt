// Bad Math engine v2 — virtual camera. State = {x, y, z, r, sx, sy}:
//   (x, y) world point being looked at · z zoom (1 = 1 world px per screen px) · r rotation (radians)
//   (sx, sy) the screen point that world point lands on (default 540, 740: the stage centre above the captions).
// A camera track is a list of keys {t, dur, to:{...}, ease, arc, drift}; each key eases from wherever the camera
// was at its start time to its target. Zoom interpolates in log space; long travels dip the zoom (arc) so the
// move reads as a flight, not a slide. After landing the camera keeps a slow push (drift) and a tiny float, so
// there is never a dead frame. Depth layers use parallax p: bg 0.3, mid 1, fg 1.4.
(function () {
  const B = window.BM2, { clamp, lerp, ease } = B;
  const STAGE = { sx: B.L.stage.sx, sy: B.L.stage.sy };
  function make(keys, o = {}) {
    keys = keys.slice().sort((a, b) => a.t - b.t);
    const first = { x: 0, y: 0, z: 1, r: 0, ...STAGE, ...(keys[0] ? keys[0].to : {}) };
    const starts = [];
    function evalKey(i, t) {
      const k = keys[i], from = i === 0 ? first : starts[i], to = { ...from, ...k.to };
      const u = k.dur > 0 ? clamp((t - k.t) / k.dur) : 1, p = (typeof k.ease === 'function' ? k.ease : ease[k.ease || 'glide'])(u);
      const dist = Math.hypot(to.x - from.x, to.y - from.y) * Math.min(from.z, to.z);
      const arc = (k.arc ?? clamp(dist / 5200, 0, 0.3)) * Math.sin(Math.PI * clamp(p));
      const s = { x: lerp(from.x, to.x, p), y: lerp(from.y, to.y, p), z: Math.exp(lerp(Math.log(from.z), Math.log(to.z), p)) * (1 - arc), r: lerp(from.r, to.r, p), sx: lerp(from.sx, to.sx, p), sy: lerp(from.sy, to.sy, p) };
      const held = Math.max(0, t - k.t - k.dur * 0.6); s.z *= 1 + (k.drift ?? 0.012) * held; // slow push while holding
      return s;
    }
    for (let i = 0; i < keys.length; i++) starts[i] = i === 0 ? first : evalKey(i - 1, keys[i].t);
    function base(t) { let i = 0; for (let j = 0; j < keys.length; j++) if (t >= keys[j].t) i = j; return keys.length ? evalKey(i, Math.max(t, keys[0].t)) : { ...first }; }
    function at(t) {
      const s = base(t), fl = o.float ?? 1;
      s.x += Math.sin(t * 0.71 + 1.3) * 5 * fl / s.z; s.y += Math.cos(t * 0.53) * 4 * fl / s.z; s.r += Math.sin(t * 0.37) * 0.0022 * fl;
      for (const [st, amp = 14] of o.shakes || []) { const d = t - st; if (d >= 0 && d < 0.6) { const e = Math.exp(-9 * d) * amp; s.sx += Math.sin(d * 58) * e; s.sy += Math.cos(d * 47) * e * 0.8; s.r += Math.sin(d * 40) * e * 0.0006; } }
      return s;
    }
    // screen-space speed in px per frame (drives motion blur)
    function speed(t, fps = 30) { const a = base(t), b = base(t - 1 / fps); return Math.hypot((a.x - b.x) * a.z + (a.sx - b.sx), (a.y - b.y) * a.z + (a.sy - b.sy)) + Math.abs(Math.log(a.z / b.z)) * 700; }
    return { at, base, speed, keys };
  }
  // Apply the camera to a context for a layer with parallax p (call inside save/restore).
  function apply(g, s, p = 1) { g.translate(s.sx, s.sy); g.rotate(s.r * p); const z = Math.pow(s.z, p); g.scale(z, z); g.translate(-s.x * p, -s.y * p); return z; }
  function toScreen(s, wx, wy) { const dx = (wx - s.x) * s.z, dy = (wy - s.y) * s.z, c = Math.cos(s.r), n = Math.sin(s.r); return [s.sx + dx * c - dy * n, s.sy + dx * n + dy * c]; }
  // Frame a world box {x, y, w, h} (centre + size): returns a camera target. fill = share of the 1080 width the box takes.
  function frame(box, fill = 0.8, o = {}) {
    const maxH = o.maxH || B.L.maxH; let z = (fill * B.W) / Math.max(1, box.w); if (box.h * z > maxH) z = maxH / box.h;
    return { x: box.x, y: box.y, z: z * (o.zoom || 1), r: o.rot || 0, sx: o.sx ?? STAGE.sx, sy: o.sy ?? STAGE.sy };
  }
  B.Camera = { make, apply, toScreen, frame, STAGE };
})();
