// ===== What If recurring cast (CRIME-SHOW pass, RULES 112) — registered via BM2.register; prepended to each cut's scene.js =====
// char      : cartoon bust. who = 'you' (orange hoodie player) | 'host' (tux + red bow tie game-show host) | 'stranger' (top hat + monocle rich weirdo)
//             moods: [{t, m, look:[dx,dy]}]  mood = neutral smug think shock worried grin greed wrong
//             tag: small name plate shown for tagDur seconds after entering.  s: scale.  Same design every appearance.
// beatlabel : small pinned mono pill in the HUD row (THE BET · THE TWIST · THE ANSWER), items: [{t, text}]
// window.BMCHAR(g, th, who, mood, tt, o): draw a bust inside other recipes (origin = bottom centre of the torso, figure grows up, ~270 px tall)
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, clay, burst, shade, mix } = B;
  const INK = '#0B0F14';
  const MOODS = {
    neutral: { bl: 0, br: 0, ti: 0, mouth: 'smile', eyes: 'norm' },
    smug: { bl: -4, br: 6, ti: -0.12, mouth: 'smirk', eyes: 'half' },
    think: { bl: 8, br: -2, ti: 0.1, mouth: 'flat', eyes: 'norm', look: [-1, -1] },
    shock: { bl: 14, br: 14, ti: 0, mouth: 'o', eyes: 'wide' },
    worried: { bl: 10, br: 10, ti: 0.28, mouth: 'wobble', eyes: 'norm', sweat: true },
    grin: { bl: 4, br: 4, ti: 0, mouth: 'grin', eyes: 'norm', blush: true },
    greed: { bl: 6, br: 6, ti: 0, mouth: 'grin', eyes: 'dollar' },
    wrong: { bl: -6, br: -6, ti: -0.25, mouth: 'frown', eyes: 'squint', sweat: true },
  };
  const LOOK = { 'you': { skin: '#F1C29A', skinS: '#D9A47C' }, 'host': { skin: '#D8A27C', skinS: '#BE8A64' }, 'stranger': { skin: '#F2D6BE', skinS: '#D9B99F' } };
  const NAMES = { you: ['YOU', 'THE PLAYER'], host: ['THE HOST', 'KNOWS WHERE THE MONEY IS'], stranger: ['THE STRANGER', 'RICH · FREE CASH'] };

  function face(g, who, m, tt, look) {
    const L = LOOK[who], cy = -190, R = 66;
    // head
    g.save(); g.fillStyle = L.skin; g.strokeStyle = INK; g.lineWidth = 5;
    g.beginPath(); g.ellipse(0, cy, R * 0.94, R, 0, 0, 7); g.fill(); g.stroke();
    g.fillStyle = rgba(L.skinS, 0.55); g.beginPath(); g.ellipse(0, cy + R * 0.78, R * 0.6, R * 0.22, 0, 0, 7); g.fill();
    for (const s of [-1, 1]) { g.fillStyle = L.skin; g.beginPath(); g.ellipse(s * R * 0.94, cy + 4, 11, 16, 0, 0, 7); g.fill(); g.stroke(); }
    g.restore();
  }
  function hairBack(g, who) {
    g.save(); g.fillStyle = who === 'you' ? '#5A3A22' : INK; g.strokeStyle = INK; g.lineWidth = 5;
    if (who === 'you') { // hood bunched behind the head
      g.fillStyle = '#C9511F'; g.beginPath(); g.ellipse(0, -128, 96, 40, 0, 0, 7); g.fill(); g.stroke(); }
    g.restore();
  }
  function hairFront(g, who) {
    const cy = -190; g.save(); g.strokeStyle = INK; g.lineWidth = 5; g.lineJoin = 'round';
    if (who === 'you') { g.fillStyle = '#5A3A22'; g.beginPath(); g.moveTo(-64, cy - 8); g.lineTo(-70, cy - 40); g.lineTo(-48, cy - 36); g.lineTo(-52, cy - 76); g.lineTo(-26, cy - 58); g.lineTo(-16, cy - 92); g.lineTo(6, cy - 66); g.lineTo(26, cy - 94); g.lineTo(38, cy - 60); g.lineTo(62, cy - 70); g.lineTo(58, cy - 36); g.lineTo(70, cy - 30); g.lineTo(62, cy - 8); g.quadraticCurveTo(44, cy - 58, 0, cy - 56); g.quadraticCurveTo(-44, cy - 58, -64, cy - 8); g.closePath(); g.fill(); g.stroke(); }
    else if (who === 'host') { g.fillStyle = '#16181F'; g.beginPath(); g.moveTo(-64, cy - 6); g.quadraticCurveTo(-76, cy - 70, -10, cy - 76); g.quadraticCurveTo(60, cy - 84, 66, cy - 8); g.quadraticCurveTo(50, cy - 58, 14, cy - 62); g.quadraticCurveTo(-30, cy - 56, -64, cy - 6); g.closePath(); g.fill(); g.stroke();
      g.strokeStyle = 'rgba(255,255,255,.5)'; g.lineWidth = 4; g.beginPath(); g.moveTo(-34, cy - 62); g.quadraticCurveTo(0, cy - 74, 34, cy - 62); g.stroke(); }
    else { // top hat
      g.fillStyle = '#14171E'; g.beginPath(); g.ellipse(0, cy - 52, 96, 20, 0, 0, 7); g.fill(); g.stroke(); rr(g, -58, cy - 160, 116, 112, 10); g.fill(); g.stroke();
      g.fillStyle = '#F2B705'; g.fillRect(-57, cy - 82, 114, 22); g.strokeRect(-57, cy - 82, 114, 22);
      g.fillStyle = '#14171E'; g.beginPath(); g.ellipse(0, cy - 52, 96, 20, 0, 0, Math.PI); g.fill(); g.stroke(); }
    g.restore();
  }
  function body(g, who, arms) {
    const col = who === 'you' ? '#F26B3A' : who === 'host' ? '#1E2638' : '#33333D';
    g.save();
    // arms (behind torso edges)
    const armCol = shade(col, -0.1);
    if (arms === 'spread') for (const s of [-1, 1]) { g.save(); g.translate(s * 92, -92); g.rotate(-s * 1.05); clay(g, -20, -10, 40, 150, 20, armCol, { shadowK: 0.4 }); g.fillStyle = LOOK[who].skin; g.strokeStyle = INK; g.lineWidth = 4; g.beginPath(); g.arc(0, 150, 26, 0, 7); g.fill(); g.stroke(); g.restore(); }
    clay(g, -100, -126, 200, 128, 40, col, { shadowK: 0.6 });
    g.fillStyle = LOOK[who].skin; g.strokeStyle = INK; g.lineWidth = 4; g.beginPath(); g.moveTo(-30, -130); g.lineTo(30, -130); g.lineTo(18, -112); g.lineTo(-18, -112); g.closePath(); g.fill();
    if (who === 'you') { // hoodie: neckline, drawstrings, pocket
      g.fillStyle = '#C9511F'; g.beginPath(); g.moveTo(-46, -128); g.quadraticCurveTo(0, -92, 46, -128); g.lineTo(34, -122); g.quadraticCurveTo(0, -108, -34, -122); g.fill();
      g.strokeStyle = '#F5F3EE'; g.lineWidth = 5; g.lineCap = 'round'; g.beginPath(); g.moveTo(-14, -104); g.lineTo(-16, -66); g.moveTo(14, -104); g.lineTo(16, -62); g.stroke();
      g.fillStyle = 'rgba(0,0,0,.14)'; rr(g, -52, -48, 104, 34, 12); g.fill(); }
    else if (who === 'host') { // white shirt V, red bow tie, pocket square
      g.fillStyle = '#F5F3EE'; g.beginPath(); g.moveTo(-38, -128); g.lineTo(38, -128); g.lineTo(0, -52); g.closePath(); g.fill();
      g.fillStyle = '#E4572E'; g.beginPath(); g.moveTo(0, -112); g.lineTo(-34, -132); g.lineTo(-34, -98); g.closePath(); g.fill(); g.beginPath(); g.moveTo(0, -112); g.lineTo(34, -132); g.lineTo(34, -98); g.closePath(); g.fill(); g.beginPath(); g.arc(0, -114, 9, 0, 7); g.fill();
      g.fillStyle = '#F2B705'; g.beginPath(); g.moveTo(54, -86); g.lineTo(76, -86); g.lineTo(76, -70); g.lineTo(54, -70); g.fill(); }
    else { // cravat + gold buttons
      g.fillStyle = '#F2B705'; g.beginPath(); g.moveTo(-22, -128); g.lineTo(22, -128); g.lineTo(14, -78); g.lineTo(-14, -78); g.closePath(); g.fill(); g.strokeStyle = INK; g.lineWidth = 3; g.stroke();
      for (const y of [-56, -30]) { g.fillStyle = '#F2B705'; g.beginPath(); g.arc(0, y, 7, 0, 7); g.fill(); } }
    g.restore();
  }
  function features(g, who, mood, tt, lookOv) {
    const M = MOODS[mood] || MOODS.neutral, cy = -190, blink = (tt % 3.6) < 0.11 || (tt % 5.3) > 5.22;
    const lk = lookOv || M.look || [0, 0];
    g.save(); g.strokeStyle = INK; g.lineCap = 'round'; g.lineJoin = 'round';
    for (const s of [-1, 1]) {
      const ex = s * 25, ey = cy - 6; const er = M.eyes === 'wide' ? 19 : M.eyes === 'squint' ? 0 : 15;
      if (M.eyes === 'dollar') { g.fillStyle = '#F5F3EE'; g.lineWidth = 4; g.beginPath(); g.arc(ex, ey, 19, 0, 7); g.fill(); g.stroke(); txt(g, '$', ex, ey + 2, F.hero(30), '#1FA366'); }
      else if (blink || M.eyes === 'squint') { g.lineWidth = 5; g.beginPath(); g.moveTo(ex - 13, ey + (M.eyes === 'squint' ? -4 : 0)); g.lineTo(ex + 13, ey + (M.eyes === 'squint' ? 4 : 0) * s); g.stroke(); }
      else { g.fillStyle = '#F5F3EE'; g.lineWidth = 4; g.beginPath(); g.ellipse(ex, ey, er, er * (M.eyes === 'half' ? 0.72 : 1.08), 0, 0, 7); g.fill(); g.stroke();
        g.fillStyle = INK; g.beginPath(); g.arc(ex + lk[0] * 5, ey + lk[1] * 5 + (M.eyes === 'half' ? 3 : 0), M.eyes === 'wide' ? 5 : 7, 0, 7); g.fill();
        if (M.eyes === 'half') { g.fillStyle = LOOK[who].skin; g.fillRect(ex - er - 2, ey - er * 1.1, er * 2 + 4, er * 0.55); g.lineWidth = 4; g.beginPath(); g.moveTo(ex - er, ey - er * 0.45); g.lineTo(ex + er, ey - er * 0.45); g.stroke(); } }
    }
    // tilted brows overlay (inner ends up when worried; down when smug/wrong)
    g.lineWidth = 7; g.strokeStyle = who === 'you' ? '#5A3A22' : who === 'stranger' ? '#B9B9C2' : INK;
    // (clear the straight brows by redrawing skin patch first would be heavy: instead brows above are short; tilt drawn here)
    for (const s of [-1, 1]) { const ex = s * 25, ey = cy - 6, bk = (s < 0 ? M.bl : M.br), t = M.ti * s * -1; g.beginPath(); g.moveTo(ex - 15 * s, ey - 30 - bk * 0.5 + 15 * t * -1); g.lineTo(ex + 15 * s, ey - 30 - bk * 0.5 + 15 * t); g.stroke(); }
    // mouth
    g.lineWidth = 5; g.strokeStyle = INK; const my = cy + 34;
    if (M.mouth === 'smile') { g.beginPath(); g.arc(0, my - 8, 20, 0.25, Math.PI - 0.25); g.stroke(); }
    else if (M.mouth === 'grin') { g.fillStyle = '#7A1F1F'; g.beginPath(); g.moveTo(-28, my - 8); g.quadraticCurveTo(0, my + 36, 28, my - 8); g.closePath(); g.fill(); g.stroke(); g.fillStyle = '#F5F3EE'; g.beginPath(); g.moveTo(-22, my - 6); g.lineTo(22, my - 6); g.lineTo(18, my + 3); g.lineTo(-18, my + 3); g.closePath(); g.fill(); }
    else if (M.mouth === 'smirk') { g.beginPath(); g.moveTo(-18, my); g.quadraticCurveTo(6, my + 10, 26, my - 12); g.stroke(); }
    else if (M.mouth === 'o') { g.fillStyle = '#7A1F1F'; g.beginPath(); g.ellipse(0, my + 4, 12, 17, 0, 0, 7); g.fill(); g.stroke(); }
    else if (M.mouth === 'flat') { g.beginPath(); g.moveTo(-14, my + 2); g.lineTo(14, my - 2); g.stroke(); }
    else if (M.mouth === 'frown') { g.beginPath(); g.arc(0, my + 18, 20, Math.PI + 0.3, -0.3); g.stroke(); }
    else if (M.mouth === 'wobble') { g.beginPath(); g.moveTo(-20, my + 8); g.quadraticCurveTo(-10, my - 4, 0, my + 8); g.quadraticCurveTo(10, my + 20, 20, my + 8); g.stroke(); }
    if (M.blush) { g.fillStyle = 'rgba(230,90,90,.35)'; for (const s of [-1, 1]) { g.beginPath(); g.ellipse(s * 44, cy + 22, 13, 8, 0, 0, 7); g.fill(); } }
    if (M.sweat) { const wob = (tt * 1.6) % 1; g.fillStyle = '#7FD6FF'; g.strokeStyle = INK; g.lineWidth = 3; g.save(); g.translate(62, cy - 36 + wob * 14); g.beginPath(); g.moveTo(0, -16); g.quadraticCurveTo(14, 4, 0, 12); g.quadraticCurveTo(-14, 4, 0, -16); g.fill(); g.stroke(); g.restore(); }
    if (who === 'stranger') { g.strokeStyle = '#F2B705'; g.lineWidth = 5; g.beginPath(); g.arc(25, cy - 6, 24, 0, 7); g.stroke(); g.beginPath(); g.moveTo(25, cy + 18); g.quadraticCurveTo(34, cy + 60, 50, cy + 76); g.stroke();
      g.fillStyle = '#E8E8EE'; g.strokeStyle = INK; g.lineWidth = 3; g.beginPath(); g.moveTo(0, cy + 22); g.quadraticCurveTo(-30, cy + 14, -42, cy + 28); g.quadraticCurveTo(-24, cy + 38, 0, cy + 30); g.quadraticCurveTo(24, cy + 38, 42, cy + 28); g.quadraticCurveTo(30, cy + 14, 0, cy + 22); g.fill(); g.stroke(); }
    g.restore();
  }
  window.BMCHAR = function (g, th, who, mood, tt, o) {
    o = o || {}; g.save();
    if (o.s) g.scale(o.s, o.s);
    const bob = Math.sin(tt * 2.6) * 2.5; g.translate(0, bob);
    hairBack(g, who); body(g, who, o.arms); face(g, who, mood, tt, o.look); features(g, who, mood, tt, o.look); hairFront(g, who);
    g.restore();
  };
  const moodAt = (K, t) => { let c = { m: 'neutral', t: -1 }; for (const k of K || []) if (t >= k.t && k.t >= c.t) c = k; return c; };

  B.register('char', {
    defaults: { who: 'you', moods: [], s: 1, tag: true, tagDur: 1.9, flip: false }, ownEnter: true, size: p => [250 * p.s, 290 * p.s],
    anchors: () => ({ head: [0, -40, 170, 150], all: [0, 0, 250, 290] }),
    draw(g, p, env) {
      const { t, lt, theme } = env, k = Math.max(0, spring(lt, { f: 2.3, z: 0.5 })), mk = moodAt(p.moods, t), since = t - Math.max(0, mk.t);
      const jump = mk.t >= 0 && since < 0.35 ? 1 + 0.07 * Math.sin(since / 0.35 * Math.PI) : 1;
      g.save(); g.globalAlpha *= clamp(lt / 0.07); g.translate(0, 135 + 320 * (1 - Math.min(1.05, k)));
      g.scale(p.s * jump, p.s * jump); if (p.flip) g.scale(-1, 1);
      window.BMCHAR(g, theme, p.who, mk.m, t, { look: mk.look, arms: p.arms });
      g.restore();
      if (p.tag && lt < p.tagDur + 0.3) { const a = clamp(lt / 0.2) * (1 - clamp((lt - p.tagDur) / 0.3)), [n, sub] = NAMES[p.who];
        g.save(); g.globalAlpha *= a; g.translate(0, -148 * p.s - 6 + (1 - ease.out(clamp(lt / 0.3))) * 14);         clay(g, -96, -22, 192, 44, 14, theme.paper, { shadowK: 0.5 }); txt(g, n, 0, 2, F.hero(28), theme.ink); g.restore(); }
    },
  });

  B.register('beatlabel', {
    defaults: { items: [] }, ownEnter: true, size: () => [320, 52],
    draw(g, p, env) {
      const { t, theme } = env; let cur = null, idx = -1; p.items.forEach((it, i) => { if (t >= it.t) { cur = it; idx = i; } }); if (!cur) return;
      const s = t - cur.t, k = Math.max(0, spring(s, { f: 2.6, z: 0.45 })); const MC = document.createElement('canvas').getContext('2d'); MC.font = F.monoX(22); const w = MC.measureText(cur.text).width + 74, h = 44;
      g.save(); g.translate(w / 2, (1 - Math.min(1, k)) * -24); g.globalAlpha *= clamp(s / 0.08);
      clay(g, -w / 2, -h / 2, w, h, h / 2, INK, { shadowK: 0.5 }); g.strokeStyle = theme.gold; g.lineWidth = 3; rr(g, -w / 2, -h / 2, w, h, h / 2); g.stroke();
      g.fillStyle = theme.gold; g.beginPath(); g.arc(-w / 2 + 24, 0, 7, 0, 7); g.fill(); txt(g, cur.text, 14, 2, F.monoX(22), theme.paper); g.restore();
    },
  });
})();
// ===== Lottery Part 2 — shared custom recipes (registered via BM2.register; prepended to each cut's scene.js) =====
// Generic paper-and-clay art only: no real lottery logos, no people, no real documents (every prop is labelled ILLUSTRATION in the footnote).
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, countAt, hash, hit, wobble } = B;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const zn = () => B.zoomNow || 1;
  const STRIPE = ['#2c3e66', '#F2B705', '#1FA366', '#E0281E'];
  const BODY = ['#F5F3EE', '#EFE6CF', '#F5F3EE', '#E7E2D6'];
  const rise = (t, at, d = 18) => { const o = t - at; return { a: clamp(o / 0.12), y: (1 - spring(Math.max(0, o), 'snappy')) * d, on: o > 0 }; };

  // generic paper ticket (no logo, no digits): stripe, perforation, grey number bars
  function ticket(g, cx, cy, w, h, rot, i, o = {}) {
    g.save(); g.translate(cx, cy); g.rotate(rot); if (o.s && o.s !== 1) g.scale(o.s, o.s);
    const nr = h * 0.13, r = 8, hw = w / 2, hh = h / 2;
    const path = () => { g.beginPath(); g.moveTo(-hw + r, -hh); g.lineTo(hw - r, -hh); g.quadraticCurveTo(hw, -hh, hw, -hh + r); g.lineTo(hw, -nr); g.arc(hw, 0, nr, -Math.PI / 2, Math.PI / 2, true); g.lineTo(hw, hh - r); g.quadraticCurveTo(hw, hh, hw - r, hh); g.lineTo(-hw + r, hh); g.quadraticCurveTo(-hw, hh, -hw, hh - r); g.lineTo(-hw, nr); g.arc(-hw, 0, nr, Math.PI / 2, -Math.PI / 2, true); g.lineTo(-hw, -hh + r); g.quadraticCurveTo(-hw, -hh, -hw + r, -hh); g.closePath(); };
    const sh = (o.sh == null ? 10 : o.sh) * zn(); g.shadowColor = 'rgba(2,4,9,.38)'; g.shadowBlur = sh; g.shadowOffsetY = sh * 0.5;
    g.fillStyle = o.fill || BODY[i % 4]; path(); g.fill(); g.shadowColor = 'transparent';
    g.save(); path(); g.clip();
    g.fillStyle = STRIPE[(i * 7 + 1) % 4]; g.fillRect(-hw, -hh, w * 0.16, h);
    g.strokeStyle = 'rgba(89,96,107,.55)'; g.lineWidth = Math.max(2, h * 0.025); g.setLineDash([h * 0.07, h * 0.06]); g.beginPath(); g.moveTo(hw - w * 0.27, -hh); g.lineTo(hw - w * 0.27, hh); g.stroke(); g.setLineDash([]);
    g.fillStyle = 'rgba(89,96,107,.42)';
    for (let k = 0; k < 3; k++) { const ww = w * (0.22 + 0.2 * hash(i * 3.1 + k)); rr(g, -hw + w * 0.22, -h * 0.26 + k * h * 0.24, ww, h * 0.1, h * 0.04); g.fill(); }
    g.fillStyle = 'rgba(89,96,107,.55)'; rr(g, hw - w * 0.22, -h * 0.26, w * 0.14, h * 0.1, h * 0.04); g.fill();
    if (o.label) txt(g, o.label, -hw + w * 0.2, -h * 0.34, F.monoX(h * 0.15), 'rgba(11,15,20,.7)', 'left');
    g.restore();
    g.strokeStyle = o.edge || 'rgba(0,0,0,.2)'; g.lineWidth = o.edgeW || 2; path(); g.stroke(); g.restore();
  }
  B.ticket = ticket;

  // ---------- mountain: a pile of paper tickets. Rises (ticket by ticket) from `in`; thumps on thumpAt; one ticket lifts out (hero) ----------
  const mdims = p => [(p.rows - 1) * p.dx + p.tw, (p.rows - 1) * p.dy + p.th];
  B.register('mountain', {
    defaults: { rows: 10, tw: 170, th: 80, dx: 98, dy: 48, thumpAt: 99999, thump2At: 99999, heroAt: 99999, heroOut: 99999, seed: 1, label: '' }, ownEnter: true,
    size: p => mdims(p),
    anchors: p => { const [w, h] = mdims(p); return { top: [0, -h / 2 + 90, w * 0.45, 190], hero: [0, -h / 2 - 60, 440, 260], base: [0, h / 2 - 60, w, 120], whole: [0, -40, w, h + 200] }; },
    draw(g, p, env) {
      const { t, lt } = env, [w, h] = mdims(p), base = (p.rows - 1) * p.dy / 2; let idx = 0; const heroOn = t >= p.heroAt && t < p.heroOut;
      for (let r = 0; r < p.rows; r++) { const n = p.rows - r; for (let c = 0; c < n; c++) { const i = idx++, hh = hash(i * 7.3 + p.seed), isHero = r === p.rows - 1 && c === 0; if (isHero && heroOn) continue;
        const x = (c - (n - 1) / 2) * p.dx + (hash(i * 2.1 + p.seed) - 0.5) * 14, y = base - r * p.dy + (hash(i * 5.7 + p.seed) - 0.5) * 8, o = lt - r * 0.07 - hh * 0.15; if (o <= 0) continue;
        const k = spring(o, 'snappy'); let jump = 0; for (const tt of [p.thumpAt, p.thump2At]) { const tj = t - tt; if (tj > 0 && tj < 1.2) jump += Math.abs(Math.sin(tj * 11)) * Math.exp(-5 * tj) * (24 + hh * 46); }
        ticket(g, x, y + (1 - k) * 170 - jump, p.tw * (0.5 + 0.5 * k), p.th * (0.5 + 0.5 * k), (hash(i * 3.9 + p.seed) - 0.5) * 0.34, i, { sh: 8 }); } }
      if (heroOn || (t >= p.heroOut && t < p.heroOut + 0.5)) { const u = heroOn ? spring(t - p.heroAt, 'snappy') : 1 - ease.out(lin(t, p.heroOut, p.heroOut + 0.4)), bx = 0, by = base - (p.rows - 1) * p.dy;
        if (u > 0) { const y = by - u * 125, s = 1 + 0.55 * u; g.save(); g.globalAlpha = 0.28 * u; g.fillStyle = '#F5F3EE'; rr(g, -p.tw * s * 0.62, y - p.th * s * 0.8, p.tw * s * 1.24, p.th * s * 1.6, 26); g.fill(); g.restore();
          ticket(g, bx, y, p.tw, p.th, -0.05 * u, 0, { s, sh: 22, edge: '#F2B705', edgeW: 6, label: 'TICKET' }); } }
    },
  });

  // ---------- cheque: prize cheque with an odometer amount and an optional red record rosette ----------
  B.register('cheque', {
    defaults: { w: 800, h: 350, to: 27000000, from: 0, at: 0, dur: 1.3, rosetteAt: 99999, rosette: ['STATE', 'RECORD'], payee: 'AN AUSTRALIAN FUND', src: 'PER UPI · MAR 10, 1992', head: 'PRIZE CHEQUE', prefix: '$', suffix: '', size: 108 },
    size: p => [p.w, p.h], anchors: p => ({ amount: [0, 38, p.w * 0.92, 160], rosette: [p.w / 2 - 70, -p.h / 2 + 10, 200, 200] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 20, { lift });
      g.strokeStyle = theme.rule; g.lineWidth = 3; rr(g, x0 + 14, y0 + 14, w - 28, h - 28, 12); g.stroke();
      txt(g, p.head, x0 + 40, y0 + 46, F.monoX(24), theme.navy, 'left'); txt(g, 'ILLUSTRATION', x0 + 40, y0 + 76, F.mono(17), theme.inkSoft, 'left');
      txt(g, 'PAY TO', x0 + 40, y0 + 122, F.mono(20), theme.inkSoft, 'left'); txt(g, p.payee, x0 + 140, y0 + 122, F.cap(30), theme.ink, 'left');
      g.strokeStyle = theme.ink; g.lineWidth = 2; g.beginPath(); g.moveTo(x0 + 136, y0 + 144); g.lineTo(x0 + w * 0.68, y0 + 144); g.stroke();
      const lt = t - p.at, dur = p.dur, v = lt < 0 ? p.from : countAt(Math.max(0, lt), dur, p.from, p.to), land = lt - dur, s = 1 + (land > 0 ? 0.1 * (1 - spring(land, { f: 2.4, z: 0.42 })) : 0.03 * lin(lt, 0, dur)) + (env.hot === 'amount' ? 0.03 * env.hotK : 0);
      const o = { font: F.hero(p.size), size: p.size, color: theme.goodInk, prefix: p.prefix, suffix: p.suffix, decimals: 0, align: 'left', speed: lt > 0 && lt < dur ? Math.abs(countAt(lt + 0.02, dur, p.from, p.to) - v) / 0.02 : 0 };
      const nw = B.rollWidth(g, p.to, o).w; g.save(); g.translate(0, y0 + h * 0.66); g.scale(s, s); if (land > 0) marker(g, -nw / 2, p.size * 0.6, nw, p.size * 0.07, theme.goodInk, clamp(land / 0.35), 0.9); roll(g, v, -nw / 2, 0, o); g.restore(); burst(g, 0, y0 + h * 0.66, nw * 0.6, theme.good, land, 18, 0.55);
      txt(g, p.src, x0 + 40, y0 + h - 34, F.mono(18), theme.inkSoft, 'left');
      const rt = t - p.rosetteAt; if (rt > 0) { const k = spring(rt, 'bouncy'), cx = w / 2 - 70, cy = -h / 2 + 18; g.save(); g.translate(cx, cy); g.rotate(0.18); g.scale(0.3 + 0.7 * k, 0.3 + 0.7 * k); g.globalAlpha = clamp(rt / 0.1);
        g.shadowColor = 'rgba(2,4,9,.4)'; g.shadowBlur = 16 * zn(); g.shadowOffsetY = 8 * zn(); g.fillStyle = theme.badInk; g.beginPath(); for (let i = 0; i < 28; i++) { const a = i / 28 * Math.PI * 2, rad = i % 2 ? 84 : 98; g.lineTo(Math.cos(a) * rad, Math.sin(a) * rad); } g.closePath(); g.fill(); g.shadowColor = 'transparent';
        g.strokeStyle = theme.paper; g.lineWidth = 4; g.beginPath(); g.arc(0, 0, 70, 0, 7); g.stroke(); txt(g, p.rosette[0], 0, -22, F.hero(40), theme.paper); txt(g, p.rosette[1], 0, 24, F.hero(40), theme.paper); g.restore(); burst(g, cx, cy, 110, theme.bad, rt - 0.05, 14, 0.5); }
    },
  });

  // ---------- rulebook: Virginia rulebook card. Opens, red pencil underlines the rule, fresh red-ink rule slides in, EMERGENCY RULES stamp ----------
  B.register('rulebook', {
    defaults: { w: 700, h: 900, ulAt: 99999, lineAt: 99999, newAt: 99999, stampAt: 99999, dimAt: 99999, src: 'PER UPI · WASHINGTON POST, 1992', lineText: ['TICKETS MUST BE BOUGHT', 'AT A LICENSED RETAILER'], newText: ['NEW: NO BULK BUYING'], stamp: 'EMERGENCY RULES' }, ownEnter: true,
    size: p => [p.w, p.h], anchors: p => ({ head: [0, -p.h / 2 + 75, p.w, 150], rule: [0, -p.h / 2 + 300, p.w * 0.9, 190], news: [0, 60, p.w * 0.9, 150], stamp: [0, 150, p.w * 0.98, 230] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, k = spring(lt, 'snappy'), sx = 0.06 + 0.94 * k;
      g.save(); g.translate(x0, 0); g.scale(sx, 1); g.translate(-x0, 0);
      clay(g, x0 - 12, y0 + 10, w + 24, h, 26, theme.navy, { lift: 0.2 }); paper(g, x0, y0, w, h, 22, { lift });
      g.save(); rr(g, x0, y0, w, h, 22); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 150); g.restore();
      txt(g, 'VIRGINIA LOTTERY', x0 + 36, y0 + 58, F.hero(62), theme.paper, 'left'); txt(g, 'RULES', x0 + 36, y0 + 114, F.hero(46), theme.gold, 'left'); txt(g, 'ILLUSTRATION', x0 + w - 28, y0 + 30, F.mono(17), 'rgba(245,243,238,.7)', 'right');
      g.fillStyle = theme.paperShade; for (let i = 0; i < 4; i++) { rr(g, x0 + 40, y0 + 190 + i * 40, w * (0.5 + 0.38 * hash(i * 5.5)), 18, 9); g.fill(); }
      const ry = y0 + 420, ltm = t - p.lineAt;
      if (ltm > 0) { const r = rise(t, p.lineAt, 22); g.save(); g.globalAlpha = r.a; g.translate(0, r.y); txt(g, p.lineText[0], 0, ry - 22, F.cap(40), theme.ink); txt(g, p.lineText[1], 0, ry + 28, F.cap(40), theme.ink);
        const u = ease.out(clamp((t - p.ulAt) / 0.5)); if (u > 0) { g.strokeStyle = theme.badInk; g.lineWidth = 8; g.lineCap = 'round'; g.beginPath(); const x1 = -w * 0.4, x2 = x1 + w * 0.8 * u; for (let i = 0; i <= 24; i++) { const xx = lerp(x1, x2, i / 24), yy = ry + 62 + Math.sin(i * 1.3) * 4; i ? g.lineTo(xx, yy) : g.moveTo(xx, yy); } g.stroke(); } g.restore(); }
      else { g.fillStyle = theme.paperShade; for (let i = 0; i < 2; i++) { rr(g, x0 + 40, ry - 30 + i * 52, w * 0.75, 22, 11); g.fill(); } }
      g.fillStyle = theme.paperShade; for (let i = 0; i < 3; i++) { rr(g, x0 + 40, y0 + 560 + i * 40, w * (0.45 + 0.4 * hash(i * 9.1)), 18, 9); g.fill(); }
      const nt = t - p.newAt; if (nt > -0.01) { const u = ease.out(clamp(nt / 0.4)); g.save(); g.translate((1 - u) * w * 0.9, 0); g.shadowColor = 'rgba(2,4,9,.3)'; g.shadowBlur = 14 * zn(); g.shadowOffsetY = 6 * zn(); g.fillStyle = '#FBE9E6'; rr(g, x0 + 24, y0 + 520, w - 48, 150, 12); g.fill(); g.shadowColor = 'transparent';
        g.strokeStyle = theme.badInk; g.lineWidth = 4; rr(g, x0 + 24, y0 + 520, w - 48, 150, 12); g.stroke(); txt(g, p.newText[0], 0, y0 + 595, F.cap(44), theme.badInk); g.restore(); }
      txt(g, p.src, 0, y0 + h - 34, F.mono(18), theme.inkSoft);
      g.restore();
      const st = t - p.stampAt; if (st > 0) { const k2 = ease.expo(clamp(st / 0.2)), sc = 1 + 1.3 * (1 - k2) - 0.05 * wobble(st - 0.2, 6, 9), sf = F.hero(84), sw = mw(p.stamp, sf) + 80; g.save(); g.translate(0, y0 + h * 0.8); g.rotate(-0.1); g.scale(sc, sc); g.globalAlpha = clamp(st / 0.06) * 0.97;
        g.fillStyle = 'rgba(245,243,238,.9)'; rr(g, -sw / 2, -70, sw, 140, 14); g.fill(); g.strokeStyle = theme.badInk; g.lineWidth = 10; rr(g, -sw / 2 + 8, -62, sw - 16, 124, 10); g.stroke(); txt(g, p.stamp, 0, 4, sf, theme.badInk); g.restore(); burst(g, 0, y0 + h * 0.8, sw * 0.55, theme.bad, st - 0.16, 16, 0.45); }
    },
  });

  // ---------- datecal: 1992 calendar. FEB 15 page tears off, MAR 10 underneath, ticks, NO BROKEN RULE PROVEN ----------
  B.register('datecal', {
    defaults: { w: 640, h: 760, tearAt: 99999, tick1At: 99999, tick2At: 99999, provedAt: 99999, proved: 'NO BROKEN RULE PROVEN', src: 'PER UPI · WASHINGTON POST, 1992' },
    size: p => [p.w, p.h], anchors: p => ({ date: [0, -20, p.w * 0.9, 330], proved: [0, p.h / 2 - 110, p.w * 0.94, 120], head: [0, -p.h / 2 + 60, p.w, 120] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 24, { lift });
      g.save(); rr(g, x0, y0, w, h, 24); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 130); g.restore();
      txt(g, '1992', 0, y0 + 68, F.hero(92), theme.paper); for (let i = 0; i < 5; i++) { g.fillStyle = theme.ink; g.beginPath(); g.arc(x0 + 90 + i * (w - 180) / 4, y0 + 8, 11, 0, 7); g.fill(); }
      const page = (mon, day, lab, ty, tt) => { txt(g, mon, 0, y0 + 205, F.monoX(58), theme.inkSoft); txt(g, day, 0, y0 + 360, F.hero(280), theme.ink); txt(g, lab, 0, y0 + 520, F.cap(34), theme.inkSoft);
        const k = clamp((t - tt) / 0.25); if (k > 0) { const s = spring(t - tt, 'bouncy'); g.save(); g.translate(w * 0.3, y0 + 360); g.scale(s, s); g.strokeStyle = theme.goodInk; g.lineWidth = 22; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); g.moveTo(-50, 0); g.lineTo(-12, 42); g.lineTo(58, -48); g.stroke(); g.restore(); burst(g, w * 0.3, y0 + 360, 90, theme.good, t - tt - 0.05, 10, 0.4); } };
      page('MAR', '10', 'PAYOUT DECISION', 0, p.tick2At);
      const tr = t - p.tearAt; if (tr < 0.7) { const u = tr > 0 ? ease.in(clamp(tr / 0.55)) : 0; g.save(); g.translate(x0, y0 + 130); g.rotate(u * -0.35); g.translate(-x0, -(y0 + 130)); g.translate(-u * 160, u * 900); g.globalAlpha = 1 - clamp((tr - 0.3) / 0.35);
        g.shadowColor = 'rgba(2,4,9,.3)'; g.shadowBlur = 12 * zn(); g.shadowOffsetY = 6 * zn(); g.fillStyle = theme.paper; g.fillRect(x0, y0 + 130, w, h - 130 - 10); g.shadowColor = 'transparent'; page('FEB', '15', 'THE DRAWING', 0, p.tick1At); g.restore(); }
      const pr = t - p.provedAt; if (pr > -0.01) { const r = rise(t, p.provedAt, 20); g.save(); g.globalAlpha = r.a; g.translate(0, y0 + h - 118 + r.y); marker(g, -w * 0.45, -34, w * 0.9, 70, theme.goodInk, clamp(pr / 0.3), 0.18); txt(g, p.proved, 0, 2, F.cap(38), theme.goodInk); g.restore(); }
      txt(g, p.src, 0, y0 + h - 30, F.mono(17), theme.inkSoft);
    },
  });

  // ---------- yearcal: calendar year rolls (odometer) with a place label swap. flipAt: year starts to roll ----------
  B.register('yearcal', {
    defaults: { w: 680, h: 780, from: 1992, to: 2023, flipAt: 99999, labelAt: null, dur: 1.0, a: 'VIRGINIA', b: 'TEXAS', yearsAt: 99999, years: '31 YEARS LATER' },
    size: p => [p.w, p.h], anchors: p => ({ year: [0, -80, p.w * 0.9, 250], head: [0, -p.h / 2 + 65, p.w, 130], years: [0, p.h / 2 - 140, p.w * 0.9, 110] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, ft = t - p.flipAt, u = ft < 0 ? 0 : ease.expo(clamp(ft / p.dur)), lt2 = t - (p.labelAt == null ? p.flipAt : p.labelAt); paper(g, x0, y0, w, h, 24, { lift });
      g.save(); rr(g, x0, y0, w, h, 24); g.clip(); g.fillStyle = B.mix(theme.navy, theme.badInk, clamp(lt2 / 0.5)); g.fillRect(x0, y0, w, 130); g.restore();
      const sw = clamp(lt2 / 0.35); g.save(); g.beginPath(); g.rect(x0, y0 + 10, w, 120); g.clip(); txt(g, p.a, 0, y0 + 68 - sw * 120, F.hero(80), theme.paper); txt(g, p.b, 0, y0 + 68 + (1 - sw) * 120, F.hero(80), theme.paper); g.restore();
      for (let i = 0; i < 5; i++) { g.fillStyle = theme.ink; g.beginPath(); g.arc(x0 + 90 + i * (w - 180) / 4, y0 + 8, 11, 0, 7); g.fill(); }
      const v = lerp(p.from, p.to, u), yr = Math.round(v), moving = ft > 0 && ft < p.dur * 0.8, s = 1 + (ft > p.dur ? 0.1 * (1 - spring(ft - p.dur, { f: 2.4, z: 0.42 })) : 0);
      g.save(); g.translate(0, y0 + 300); g.scale(s, s);
      if (moving) { g.globalAlpha = 0.35; txt(g, String(yr - 7), 0, -70, F.hero(240), theme.ink); txt(g, String(yr + 7), 0, 70, F.hero(240), theme.ink); g.globalAlpha = 1; }
      txt(g, String(yr), 0, 0, F.hero(240), ft > p.dur * 0.8 ? theme.badInk : theme.ink); g.restore(); burst(g, 0, y0 + 300, 300, theme.bad, ft - p.dur, 18, 0.55);
      g.fillStyle = theme.paperShade; for (let r = 0; r < 4; r++) for (let c = 0; c < 7; c++) { rr(g, x0 + 62 + c * 83, y0 + 470 + r * 46, 62, 30, 8); g.fill(); }
      const yt = t - p.yearsAt; if (yt > -0.01) { const r = rise(t, p.yearsAt, 20); g.save(); g.globalAlpha = r.a; g.translate(0, y0 + h - 70 + r.y); marker(g, -w * 0.4, -34, w * 0.8, 68, theme.badInk, clamp(yt / 0.3), 0.2); txt(g, p.years, 0, 2, F.cap(40), theme.badInk); g.restore(); }
    },
  });

  // ---------- paystamp: PAY / DON'T PAY stamp hovering and wobbling; slams to PAID ✓ on slamAt; lifts back on liftAt ----------
  B.register('paystamp', {
    defaults: { slamAt: 99999, liftAt: 99999, w: 540, h: 250 }, ownEnter: true,
    size: p => [p.w, p.h + 140], anchors: p => ({ face: [0, 60, p.w, p.h] }),
    draw(g, p, env) {
      const { t, lt, theme } = env, w = p.w, h = p.h, sl = t - p.slamAt, li = t - p.liftAt, slammed = sl > 0 && li < 0;
      let dy = Math.sin(t * 2.3) * 10, rot = Math.sin(t * 1.7) * 0.05; if (slammed) { const k = ease.in(clamp(sl / 0.14)); dy = lerp(dy, 120, k); rot = lerp(rot, -0.04, k); } else if (li > 0 && li < 0.6) { const k = ease.out(clamp(li / 0.5)); dy = lerp(120, Math.sin(t * 2.3) * 10, k); rot = lerp(-0.04, Math.sin(t * 1.7) * 0.05, k); }
      const sc = lt < 0.4 ? 0.6 + 0.4 * spring(lt, 'bouncy') : 1; g.save(); g.translate(0, dy); g.rotate(rot); g.scale(sc, sc);
      clay(g, -34, -h / 2 - 110, 68, 68, 34, theme.ink, { lift: 0.3 }); clay(g, -16, -h / 2 - 50, 32, 60, 8, theme.gold, { lift: 0.2 });
      const res = slammed || (li > 0 && li < 0.15 ? 0 : 0) ? 1 : 0, col = res ? theme.goodInk : theme.ink; paper(g, -w / 2, -h / 2, w, h, 20, { lift: 0.5 }); g.strokeStyle = res ? theme.goodInk : theme.badInk; g.lineWidth = 9; rr(g, -w / 2 + 14, -h / 2 + 14, w - 28, h - 28, 12); g.stroke();
      if (res) { txt(g, 'PAID', -34, 6, F.hero(130), col); g.strokeStyle = theme.goodInk; g.lineWidth = 20; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); g.moveTo(w * 0.22 - 0, 8); g.lineTo(w * 0.22 + 30, 46); g.lineTo(w * 0.22 + 88, -30); g.stroke(); }
      else { txt(g, 'PAY', 0, -h * 0.2, F.hero(88), theme.goodInk); txt(g, "DON'T PAY", 0, h * 0.2, F.hero(88), theme.badInk); g.fillStyle = theme.inkSoft; g.fillRect(-w * 0.35, -4, w * 0.7, 5); }
      g.restore(); if (sl > 0 && li < 0) burst(g, 0, 120, w * 0.6, theme.good, sl - 0.1, 18, 0.5);
    },
  });

  // ---------- chequefan: 20 small cheques fan out one by one with ticks; amount text above ----------
  B.register('chequefan', {
    defaults: { n: 20, at: 99999, per: 0.045, w: 900, h: 860, valAt: 99999, yearAt: 99999, nAt: 99999, val: '≈ $1.3M', sub: 'A YEAR', times: '× 20 YEARS', src: 'PER VIRGINIAN-PILOT, 1997' }, ownEnter: true,
    size: p => [p.w, p.h], anchors: p => ({ value: [0, -p.h / 2 + 130, p.w * 0.9, 190], fan: [0, 120, p.w, 560], times: [0, -p.h / 2 + 330, p.w * 0.8, 90] }),
    draw(g, p, env) {
      const { t, theme } = env, w = p.w, h = p.h, y0 = -h / 2; let landed = 0;
      for (let i = 0; i < p.n; i++) { const ti = p.at + i * p.per, o = t - ti; if (o <= 0) continue; landed++; const k = spring(o, 'snappy'), f = i / (p.n - 1), ang = lerp(-0.85, 0.85, f), R = 520;
        g.save(); g.translate(0, y0 + 760); g.rotate(ang * k); g.translate(0, -R); const cw = 300, ch = 130; g.globalAlpha = clamp(o / 0.08);
        g.shadowColor = 'rgba(2,4,9,.4)'; g.shadowBlur = 12 * zn(); g.shadowOffsetY = 6 * zn(); g.fillStyle = theme.paper; rr(g, -cw / 2, -ch / 2, cw, ch, 12); g.fill(); g.shadowColor = 'transparent';
        g.strokeStyle = theme.rule; g.lineWidth = 3; rr(g, -cw / 2 + 8, -ch / 2 + 8, cw - 16, ch - 16, 8); g.stroke(); g.fillStyle = theme.paperShade; rr(g, -cw / 2 + 24, -8, cw * 0.5, 14, 7); g.fill(); rr(g, -cw / 2 + 24, 18, cw * 0.32, 14, 7); g.fill();
        txt(g, '≈ $1.3M', cw / 2 - 28, -26, F.monoX(20), theme.goodInk, 'right');
        const tk = clamp((o - 0.1) / 0.2); if (tk > 0) { g.strokeStyle = theme.goodInk; g.lineWidth = 8; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); g.moveTo(cw / 2 - 90, 20); g.lineTo(cw / 2 - 72, 38); g.lineTo(cw / 2 - 40, 0); g.stroke(); } g.restore(); }
      paper(g, -w * 0.46, y0 + 20, w * 0.92, 330, 24, { lift: env.lift });
      const vr = t - p.valAt; if (vr > -0.01) { const k = spring(Math.max(0, vr), { f: 2.4, z: 0.5 }); g.save(); g.translate(0, y0 + 130); g.scale(0.7 + 0.3 * k, 0.7 + 0.3 * k); g.globalAlpha = clamp(vr / 0.1); txt(g, p.val, 0, 0, F.hero(172), theme.goodInk); g.restore(); burst(g, 0, y0 + 130, 260, theme.good, vr - 0.05, 16, 0.5); }
      const yr = t - p.yearAt; if (yr > -0.01) { const r = rise(t, p.yearAt, 18); g.save(); g.globalAlpha = r.a; txt(g, p.sub, -w * 0.12 - 40, y0 + 250 + r.y, F.cap(46), theme.ink); g.restore(); }
      const nr = t - p.nAt; if (nr > -0.01) { const r = rise(t, p.nAt, 18); g.save(); g.globalAlpha = r.a; txt(g, p.times, w * 0.14, y0 + 250 + r.y, F.cap(46), theme.badInk); g.restore(); }
      txt(g, p.src, 0, y0 + 332, F.mono(18), theme.inkSoft);
    },
  });

  // ---------- sign: office sign "TEXAS / LOTTERY COMMISSION" swings on two chains, unhooks, drops; SHUT DOWN tag flips on ----------
  B.register('sign', {
    defaults: { dropAt: 99999, tagAt: 99999, fall: 520, src: 'PER KUT · HOUSTON CHRONICLE', w: 760 }, ownEnter: true,
    size: p => [p.w, 640], anchors: p => ({ board: [0, 40 + 0, p.w, 260], tag: [0, 120, 560, 150] }),
    draw(g, p, env) {
      const { t, lt, theme } = env, w = p.w, dt = t - p.dropAt, dropped = dt > 0, bw = 700, bh = 240; let bx = 0, by = 20, rot = Math.sin(t * 2.4) * 0.05 * (dropped ? 0 : 1);
      const k0 = spring(lt, 'snappy'); if (!dropped) rot += 0.16 * wobble(lt, 2.1, 1.2) * 0; else { const f = ease.in(clamp(dt / 0.55)); by += f * p.fall; rot = lerp(rot, 0.42, clamp(dt / 0.3)) + (dt > 0.55 ? lerp(0.42, 0.06, ease.out(clamp((dt - 0.55) / 0.35))) - 0.42 : 0) + 0.03 * wobble(dt - 0.55, 5, 7); }
      // bracket + chains
      clay(g, -w / 2, -300, w, 46, 14, '#59606B', { shadowK: 0.5 }); g.strokeStyle = '#59606B'; g.lineWidth = 9; g.lineCap = 'round';
      if (!dropped) for (const sx of [-290, 290]) { g.beginPath(); g.moveTo(sx, -254); g.lineTo(sx * Math.cos(rot) - (by - 120) * Math.sin(rot) * 0, -90); g.stroke(); }
      else for (const sx of [-290, 290]) { g.beginPath(); g.moveTo(sx, -254); g.lineTo(sx + Math.sin(dt * 9) * 6, -254 + Math.min(110, dt * 400)); g.stroke(); }
      g.save(); g.translate(0, -100); g.rotate(rot); g.translate(0, by + 100); g.globalAlpha = clamp(lt / 0.1);
      B.shadowed(g, () => rr(g, -bw / 2, -bh / 2, bw, bh, 18), theme.navy, 0.6); g.strokeStyle = theme.paper; g.lineWidth = 5; rr(g, -bw / 2 + 12, -bh / 2 + 12, bw - 24, bh - 24, 10); g.stroke();
      txt(g, 'TEXAS', 0, -62, F.monoX(34), theme.gold); txt(g, 'LOTTERY COMMISSION', 0, 20, F.hero(76), theme.paper); txt(g, 'ILLUSTRATION', bw / 2 - 28, bh / 2 - 26, F.mono(16), 'rgba(245,243,238,.6)', 'right');
      g.restore();
      const tg = t - p.tagAt; if (tg > 0) { const f = ease.out(clamp(tg / 0.35)), sc = Math.abs(Math.cos((1 - f) * Math.PI / 2)); g.save(); g.translate(0, by + 150 + 30); g.rotate(-0.07); g.scale(1, 0.1 + 0.9 * f); g.shadowColor = 'rgba(2,4,9,.4)'; g.shadowBlur = 14 * zn(); g.shadowOffsetY = 8 * zn(); g.fillStyle = theme.paper; rr(g, -270, -56, 540, 112, 14); g.fill(); g.shadowColor = 'transparent'; g.strokeStyle = theme.badInk; g.lineWidth = 8; rr(g, -262, -48, 524, 96, 10); g.stroke(); txt(g, 'SHUT DOWN', 0, 4, F.hero(80), theme.badInk); g.restore(); burst(g, 0, by + 180, 330, theme.bad, tg - 0.2, 18, 0.5); }
      const sr = t - p.tagAt; if (sr > 0.2) { g.save(); g.globalAlpha = clamp((sr - 0.2) / 0.3); txt(g, p.src, 0, by + 262, F.mono(20), 'rgba(245,243,238,.8)'); g.restore(); }
    },
  });

  // ---------- glass: paper magnifier that sweeps across a world area (from -> to) ----------
  B.register('glass', {
    defaults: { from: [-300, 0], to: [300, 0], dur: 1.2, r: 90, at: 0 }, size: () => [10, 10],
    draw(g, p, env) {
      const lt = env.t - p.at, u = ease.inOut(clamp(lt / p.dur)), x = lerp(p.from[0], p.to[0], u), y = lerp(p.from[1], p.to[1], u) + Math.sin(u * Math.PI * 3) * 24, th = env.theme, r = p.r;
      g.save(); g.translate(x, y); g.rotate(-0.3); g.shadowColor = 'rgba(2,4,9,.4)'; g.shadowBlur = 16 * zn(); g.shadowOffsetY = 10 * zn(); g.fillStyle = 'rgba(245,243,238,.18)'; g.beginPath(); g.arc(0, 0, r, 0, 7); g.fill(); g.shadowColor = 'transparent';
      g.strokeStyle = th.gold; g.lineWidth = r * 0.24; g.beginPath(); g.arc(0, 0, r, 0, 7); g.stroke(); g.strokeStyle = 'rgba(255,255,255,.55)'; g.lineWidth = r * 0.09; g.beginPath(); g.arc(0, 0, r * 0.68, 3.5, 4.7); g.stroke();
      g.strokeStyle = th.ink; g.lineWidth = r * 0.3; g.lineCap = 'round'; g.beginPath(); g.moveTo(r * 0.72, r * 0.72); g.lineTo(r * 1.55, r * 1.62); g.stroke(); g.restore();
    },
  });

  // ---------- hook: frame-0 slam card. PART 2 stamp + the full hook text, visible from the first frame (thumps at lt 0) ----------
  B.register('hook', {
    defaults: { stamp: 'PART 2', lines: [[['5,000,000+ ', 'gold'], ['TICKETS', 'paper']], [['THEY WON', 'good']]], size: 112, sub: '' }, ownEnter: true,
    size: p => [980, 190 + p.lines.length * p.size * 1.08],
    anchors: p => { const hh = 190 + p.lines.length * p.size * 1.08; return { stamp: [0, -hh / 2 + 80, 560, 170], lines: [0, 95, 980, p.lines.length * p.size * 1.1], l1: [0, -hh / 2 + 190 + p.size * 0.55, 980, p.size * 1.1], l2: [0, -hh / 2 + 190 + p.size * 1.6, 980, p.size * 1.1] }; },
    draw(g, p, env) {
      const { lt, theme } = env, hh = 190 + p.lines.length * p.size * 1.08, k0 = hit(lt, 7), s = 1 + 0.16 * k0; g.save(); g.scale(s, s); g.rotate(-0.02 * k0);
      g.save(); g.translate(0, -hh / 2 + 80); g.rotate(-0.045); const sf = F.hero(104), sw = mw(p.stamp, sf) + 90; paper(g, -sw / 2, -70, sw, 140, 18, { lift: 0.5, fill: theme.paper }); g.strokeStyle = theme.badInk; g.lineWidth = 9; rr(g, -sw / 2 + 12, -58, sw - 24, 116, 12); g.stroke(); txt(g, p.stamp, 0, 6, sf, theme.badInk); g.restore();
      p.lines.forEach((segs, li) => { const f = F.hero(p.size), tw = segs.reduce((a, sg) => a + mw(sg[0], f), 0), y = -hh / 2 + 190 + (li + 0.55) * p.size * 1.08; let x = -tw / 2; g.save(); g.shadowColor = 'rgba(0,0,0,.5)'; g.shadowBlur = 18 * zn(); g.shadowOffsetY = 8 * zn(); for (const [s0, tn] of segs) { txt(g, s0, x, y, f, B.tone(tn, false), 'left'); x += mw(s0, f); } g.restore(); });
      g.restore(); burst(g, 0, 0, 480, theme.bad, lt + 0.1, 20, 0.6);
    },
  });
})();

// ---- copied micro-moment recipes (heart, plane) from tucker-payday ----
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, countAt, hash, hit } = B;
  B.register('plane', {
    defaults: { dur: 1.9, from: [-420, 330], to: [440, -360], s: 2.2 }, size: () => [10, 10],
    draw(g, p, env) {
      const lt = env.lt, u = ease.out(lin(lt, 0, p.dur)), pos = k => [lerp(p.from[0], p.to[0], k), lerp(p.from[1], p.to[1], k) - Math.sin(Math.PI * k) * 150], [px, py] = pos(u), [qx, qy] = pos(Math.min(1, u + 0.02)), a = Math.atan2(qy - py, qx - px) || -0.6;
      g.save(); g.strokeStyle = rgba(env.theme.accent, 0.85); g.lineWidth = 6; g.lineCap = 'round'; g.setLineDash([2, 22]); g.beginPath(); for (let i = 0; i <= 30; i++) { const [x, y] = pos(u * i / 30); i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); g.setLineDash([]); g.restore();
      g.save(); g.translate(px, py); g.rotate(a); const s = p.s * (0.7 + 0.3 * spring(lt, 'snappy')), sh = B.zoomNow || 1; g.scale(s, s);
      g.shadowColor = 'rgba(2,4,9,.4)'; g.shadowBlur = 24; g.shadowOffsetY = 14; g.fillStyle = env.theme.paper; g.beginPath(); g.moveTo(70, 0); g.lineTo(-56, -38); g.lineTo(-30, 0); g.lineTo(-56, 38); g.closePath(); g.fill(); g.shadowColor = 'transparent';
      g.fillStyle = '#D8D3C7'; g.beginPath(); g.moveTo(70, 0); g.lineTo(-30, 0); g.lineTo(-56, 38); g.closePath(); g.fill(); g.fillStyle = 'rgba(255,255,255,.7)'; g.beginPath(); g.moveTo(70, 0); g.lineTo(-56, -38); g.lineTo(-30, -2); g.closePath(); g.fill(); g.strokeStyle = 'rgba(0,0,0,.25)'; g.lineWidth = 2; g.beginPath(); g.moveTo(70, 0); g.lineTo(-30, 0); g.stroke(); g.restore();
    },
  });
  B.register('heart', {
    defaults: { s: 1 }, size: () => [10, 10],
    draw(g, p, env) {
      const lt = env.lt, k = spring(lt, 'bouncy'), pulse = 1 + 0.3 * Math.max(0, Math.sin(lt * Math.PI * 2 / 0.4 - 0.4)) * (lt < 0.8 ? 1 : 0), sc = (0.4 + 0.6 * k) * pulse * p.s * 1.3, th = env.theme;
      g.save(); g.scale(sc, sc); const path = () => { g.beginPath(); g.moveTo(0, 62); g.bezierCurveTo(-120, -10, -78, -86, 0, -34); g.bezierCurveTo(78, -86, 120, -10, 0, 62); g.closePath(); };
      B.shadowed(g, path, th.bad, 0.2); g.save(); path(); g.clip(); const lg = g.createLinearGradient(0, -80, 0, 70); lg.addColorStop(0, 'rgba(255,255,255,.3)'); lg.addColorStop(0.4, 'rgba(255,255,255,0)'); lg.addColorStop(1, 'rgba(0,0,0,.22)'); g.fillStyle = lg; g.fillRect(-130, -90, 260, 170); g.restore();
      g.strokeStyle = th.paper; g.lineWidth = 8; path(); g.stroke(); g.restore(); burst(g, 0, 0, 90 * p.s, th.bad, lt - 0.05, 8, 0.4);
    },
  });
})();
// ===== Bad Math engine v2 — CRIME-SHOW recipes (RULES 112, brand/CRIME-SHOW.md) =====
// suspect  : the con's real licensed photo in a crime-show treatment (file card + red string, quote card, picture-in-picture,
//            arrested X / stamps, jail bars, mugshot height chart, verdict) with an optional slow push-in on the face
// board    : cork evidence board, pinned photo + evidence notes, red string that pulls tight
// victim   : coloured, consistent victim character card (investors, collectors, billionaire, diner)
// datecard : date / location / chapter slate (screen layer)
// All images must sit under brand/ or videos/ (repo-relative) so a fresh clone renders.
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, burst, hit, wobble } = B;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const pop = (t, o = 'snappy') => clamp(spring(t, o), 0, 1.25);
  const RED = '#E0281E';

  // ---- photo drawn into a rect: crop = [x,y,w,h] fractions of the source (region of interest); fx,fy = focal point inside it; zoom >= 1 pushes in
  function drawPhoto(g, img, x, y, w, h, o) {
    const [cx, cy, cw, ch] = o.crop || [0, 0, 1, 1]; let sw = cw * img.width, sh = ch * img.height; const ta = w / h;
    if (sw / sh > ta) sw = sh * ta; else sh = sw / ta; const z = o.zoom || 1; sw /= z; sh /= z;
    const ccx = (cx + cw * (o.fx ?? 0.5)) * img.width, ccy = (cy + ch * (o.fy ?? 0.5)) * img.height;
    const sx = clamp(ccx - sw / 2, 0, img.width - sw), sy = clamp(ccy - sh / 2, 0, img.height - sh);
    g.drawImage(img, sx, sy, sw, sh, x, y, w, h);
  }
  function bigX(g, cx, cy, r, col, u, lw) { g.save(); g.strokeStyle = col; g.lineWidth = lw; g.lineCap = 'round'; const a = clamp(u * 2), b2 = clamp(u * 2 - 1); g.beginPath(); g.moveTo(cx - r, cy - r); g.lineTo(cx - r + 2 * r * a, cy - r + 2 * r * a); g.stroke(); if (b2 > 0) { g.beginPath(); g.moveTo(cx + r, cy - r); g.lineTo(cx + r - 2 * r * b2, cy - r + 2 * r * b2); g.stroke(); } g.restore(); }
  const imgOf = src => { const im = B.images && B.images[src]; if (!im) throw new Error('crime: image not preloaded: ' + src); return im; };
  B.drawPhoto = drawPhoto;

  function stamp(g, th, t, s) { // s: {text, at, tone, size, rot, x, y}
    const k = t - s.at; if (k < 0) return; const size = s.size || 70, f = F.hero(size), w = mw(s.text, f) + size * 0.8, h = size * 1.4, col = B.tone(s.tone || 'bad', true);
    const sc = 1 + 1.1 * (1 - ease.expo(clamp(k / 0.2))) - 0.05 * wobble(k - 0.2, 5, 9);
    g.save(); g.globalAlpha = clamp(k / 0.05); g.translate(s.x || 0, s.y || 0); g.rotate(s.rot ?? -0.1); g.scale(sc, sc);
    g.fillStyle = 'rgba(245,243,238,.92)'; rr(g, -w / 2, -h / 2, w, h, size * 0.14); g.fill(); g.strokeStyle = col; g.lineWidth = size * 0.09; rr(g, -w / 2 + size * 0.06, -h / 2 + size * 0.06, w - size * 0.12, h - size * 0.12, size * 0.1); g.stroke();
    txt(g, s.text, 0, size * 0.05, f, col); g.restore(); burst(g, s.x || 0, s.y || 0, w * 0.5, col, k - 0.12, 14, 0.45);
  }
  B.crimeStamp = stamp;

  function crown(g, th, t, c, cx, cy, scale) { // c: {at, off, re}; sits at (cx, cy) = top-centre of photo
    const kd = dd => 1 - spring(Math.max(0, dd), { f: 2.5, z: 0.5 }); let y = 0, x = 0, rot = 0, a = 1;
    if (c.re != null && t >= c.re) { y = kd(t - c.re) * -60; a = clamp((t - c.re) / 0.05); }
    else if (c.off != null && t >= c.off) { const u = lin(t, c.off, c.off + 0.8), e = ease.out(u); x = 320 * e; rot = 1.1 * e; y = 380 * ease.in(clamp(u * 1.15)); a = 1 - clamp((t - c.off - 1.2) / 0.25); }
    else y = (t - c.at) < 1.2 ? kd(t - c.at) * -60 : 0;
    if (t < c.at || a < 0.01) return; g.save(); g.globalAlpha *= a * clamp((t - c.at) / 0.05 + (c.re != null && t >= c.re ? 1 : 0)); g.translate(cx + x, cy + y); g.rotate(rot); g.scale(scale, scale);
    const path = () => { g.beginPath(); g.moveTo(-112, 0); g.lineTo(-118, -112); g.lineTo(-58, -58); g.lineTo(0, -138); g.lineTo(58, -58); g.lineTo(118, -112); g.lineTo(112, 0); g.closePath(); };
    B.shadowed(g, path, th.gold, 0.3); g.save(); path(); g.clip(); const lg = g.createLinearGradient(0, -140, 0, 0); lg.addColorStop(0, 'rgba(255,255,255,.35)'); lg.addColorStop(0.5, 'rgba(255,255,255,0)'); lg.addColorStop(1, 'rgba(0,0,0,.25)'); g.fillStyle = lg; g.fillRect(-130, -150, 260, 160); g.restore();
    g.fillStyle = th.gold; for (const [qx, qy] of [[-118, -116], [0, -142], [118, -116]]) { g.beginPath(); g.arc(qx, qy, 13, 0, 7); g.fill(); g.strokeStyle = 'rgba(0,0,0,.25)'; g.lineWidth = 3; g.stroke(); } g.restore();
  }

  function pin(g, x, y, r = 13) { g.save(); g.fillStyle = 'rgba(2,4,9,.4)'; g.beginPath(); g.ellipse(x + 3, y + 6, r, r * 0.7, 0, 0, 7); g.fill(); const lg = g.createRadialGradient(x - r * 0.35, y - r * 0.4, 1, x, y, r); lg.addColorStop(0, '#ff8a80'); lg.addColorStop(1, '#b3160f'); g.fillStyle = lg; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); g.restore(); }
  function string(g, a, b, k, sag, w = 5) { if (k <= 0) return; const x = lerp(a[0], b[0], k), y = lerp(a[1], b[1], k), mx = (a[0] + x) / 2, my = (a[1] + y) / 2 + sag * Math.sin(Math.PI * Math.min(1, k)); g.save(); g.strokeStyle = 'rgba(2,4,9,.35)'; g.lineWidth = w + 2; g.lineCap = 'round'; g.beginPath(); g.moveTo(a[0] + 2, a[1] + 5); g.quadraticCurveTo(mx + 2, my + 5, x + 2, y + 5); g.stroke(); g.strokeStyle = RED; g.lineWidth = w; g.beginPath(); g.moveTo(a[0], a[1]); g.quadraticCurveTo(mx, my, x, y); g.stroke(); g.restore(); }

  // ================= suspect =================
  B.register('suspect', {
    defaults: {
      src: '', crop: [0, 0, 1, 1], fx: 0.5, fy: 0.4, w: 460, aspect: 1.05, pw: 0, variant: 'card', name: '', nick: '', credit: '', tag: '', caseNo: '', tilt: 0.0, file: false, pinned: false,
      push: null, flash: true, xmark: null, bars: null, heights: null, stamps: [], crownAt: null, crownOff: null, crownRe: null, quote: null, quoteAt: 0, quoteSize: 62, quoteSub: '', label: '', arrow: null, stringTo: null, stringAt: 0, dim: null, ring: null, mono: false,
    }, ownEnter: true,
    size(p) { const pip = p.variant === 'pip', side = p.variant === 'side', pw = side ? (p.pw || p.w * 0.46) : p.w - 44, ph = pw * p.aspect, plate = p.name ? (p.nick ? 124 : 90) : 0;
      return [p.w, 22 + ph + 22 + (pip ? (p.label ? 56 : 0) : plate ? plate + 14 : 0)]; },
    anchors(p) { const [w, h] = this.size(p), side = p.variant === 'side', pw = side ? (p.pw || p.w * 0.46) : p.w - 44, ph = pw * p.aspect, px = -w / 2 + 22, py = -h / 2 + 22;
      return { face: [px + pw / 2, py + ph * 0.42, pw * 0.8, ph * 0.62], photo: [px + pw / 2, py + ph / 2, pw, ph], name: [0, h / 2 - 22 - 60, w, 130], quote: [w * 0.22, -h * 0.1, w * 0.5, h * 0.7] }; },
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, th = theme, img = imgOf(p.src), [w, h] = this.size(p), pip = p.variant === 'pip', side = p.variant === 'side';
      const pw = side ? (p.pw || p.w * 0.46) : p.w - 44, ph = pw * p.aspect, x0 = -w / 2, y0 = -h / 2, px = x0 + 22, py = y0 + 22, k = spring(lt, 'heavy');
      g.save(); g.translate(0, (pip ? 0 : (1 - k) * 220)); g.rotate(p.tilt + (pip ? 0 : (1 - k) * -0.1)); g.globalAlpha *= clamp(lt / 0.1);
      // case-file folder behind the card
      if (p.file) { const M = th.manila || '#E2C48D', fx0 = x0 - 16, fy0 = y0 - 36, fw = w + 32, fh = h + 52; const body = () => { g.beginPath(); g.moveTo(fx0, fy0 + 36); g.lineTo(fx0 + fw * 0.12, fy0 + 36); g.lineTo(fx0 + fw * 0.17, fy0 + 6); g.lineTo(fx0 + fw * 0.52, fy0 + 6); g.lineTo(fx0 + fw * 0.57, fy0 + 36); g.lineTo(fx0 + fw, fy0 + 36); g.lineTo(fx0 + fw, fy0 + fh); g.lineTo(fx0, fy0 + fh); g.closePath(); };
        B.shadowed(g, body, M, lift); g.save(); body(); g.clip(); const lg = g.createLinearGradient(fx0, fy0, fx0 + fw * 0.7, fy0 + fh); lg.addColorStop(0, 'rgba(255,255,255,.28)'); lg.addColorStop(0.5, 'rgba(255,255,255,0)'); lg.addColorStop(1, 'rgba(80,50,10,.18)'); g.fillStyle = lg; g.fillRect(fx0, fy0, fw, fh); g.restore();
        if (p.caseNo) txt(g, p.caseNo, fx0 + fw * 0.345, fy0 + 24, F.monoX(20), '#5a4010'); }
      paper(g, x0, y0, w, h, pip ? 12 : 16, { lift, fill: p.file ? th.paper : th.paper });
      // photo
      let zoom = 1; if (p.push) zoom = 1 + (p.push.to - 1) * ease.inOut(lin(t, p.push.at, p.push.at + p.push.dur)); else zoom = 1 + 0.045 * lin(lt, 0, 6);
      g.save(); rr(g, px, py, pw, ph, 6); g.clip(); drawPhoto(g, img, px, py, pw, ph, { crop: p.crop, fx: p.fx, fy: p.fy, zoom });
      if (p.mono) { g.globalCompositeOperation = 'saturation'; g.fillStyle = '#808080'; g.fillRect(px, py, pw, ph); g.globalCompositeOperation = 'source-over'; }
      const vg = g.createLinearGradient(px, py, px + pw, py + ph); vg.addColorStop(0, 'rgba(255,255,255,.08)'); vg.addColorStop(0.55, 'rgba(255,255,255,0)'); vg.addColorStop(1, 'rgba(0,0,0,.2)'); g.fillStyle = vg; g.fillRect(px, py, pw, ph);
      // dim photo while an X / bars are shown
      if (p.xmark != null && t >= p.xmark) { g.fillStyle = 'rgba(40,0,0,' + (0.38 * clamp((t - p.xmark) / 0.2)) + ')'; g.fillRect(px, py, pw, ph); }
      // height chart: horizontal measuring lines + ticks
      if (p.heights != null && t >= p.heights) { const u = ease.out(lin(t, p.heights, p.heights + 0.5)); g.strokeStyle = 'rgba(245,243,238,.78)'; g.lineWidth = 3; for (let i = 0; i < 16; i++) { const yy = py + ph - (i + 1) * ph / 17 * u - (1 - u) * 0, big = i % 5 === 4; g.beginPath(); g.moveTo(px + pw - (big ? 150 : 70), yy); g.lineTo(px + pw, yy); g.stroke(); if (big) txt(g, String((i + 1) / 5 * 1 | 0), px + pw - 170, yy, F.mono(22), 'rgba(245,243,238,.9)', 'right'); }
        g.fillStyle = 'rgba(245,243,238,.2)'; g.fillRect(px + pw - 150, py, 2, ph); }
      // jail bars
      if (p.bars != null && t >= p.bars) { const u = ease.in(lin(t, p.bars, p.bars + 0.3)), n = 7; for (let i = 0; i < n; i++) { const bx = px + (i + 0.5) * pw / n, bh = ph * u; g.fillStyle = '#10161f'; g.fillRect(bx - 9, py, 18, bh); g.fillStyle = 'rgba(255,255,255,.22)'; g.fillRect(bx - 9, py, 5, bh); } g.fillStyle = '#10161f'; g.fillRect(px, py, pw, 14 * u); g.fillRect(px, py + ph - 14 * u, pw, 14 * u); if (t - p.bars - 0.28 > 0 && t - p.bars < 0.5) { g.fillStyle = 'rgba(255,255,255,' + 0.5 * hit(t - p.bars - 0.28, 16) + ')'; g.fillRect(px, py, pw, ph); } }
      // shutter flash on the reveal
      if (p.flash) { const f = hit(lt - 0.05, 14) * (lt > 0.05 ? 1 : 0); if (f > 0.01) { g.fillStyle = 'rgba(255,255,255,' + 0.85 * f + ')'; g.fillRect(px, py, pw, ph); } }
      // red ring around the face
      if (p.ring != null && t >= p.ring) { const u = ease.out(lin(t, p.ring, p.ring + 0.35)); g.strokeStyle = RED; g.lineWidth = 7; g.beginPath(); g.ellipse(px + pw * (side ? 0.5 : 0.5), py + ph * 0.42, pw * 0.3 * (2 - u), ph * 0.34 * (2 - u), 0, 0, 7); g.globalAlpha *= u; g.stroke(); }
      g.restore(); g.strokeStyle = 'rgba(11,15,20,.3)'; g.lineWidth = 2; rr(g, px, py, pw, ph, 6); g.stroke();
      if (p.xmark != null && t >= p.xmark) { const u = ease.out(lin(t, p.xmark, p.xmark + 0.3)); bigX(g, px + pw / 2, py + ph / 2, pw * 0.3, RED, u, pw * 0.1); }
      // plate: name + nickname
      if (!pip && p.name) { const ty = y0 + 22 + ph + 14, tw = pw + (side ? 0 : 0), ph2 = p.nick ? 124 : 90; g.fillStyle = th.navy; rr(g, px, ty, tw, ph2, 10); g.fill(); txt(g, p.name, px + tw / 2, ty + 32, F.hero(p.nameSize || (side ? 34 : 44)), th.paper);
        if (p.nick) txt(g, p.nick, px + tw / 2, ty + 74, F.monoX(side ? 17 : 22), th.gold); if (p.tag) txt(g, p.tag, px + tw / 2, ty + ph2 - 16, F.mono(15), rgba(th.paper, 0.7)); }
      if (pip && p.label) { const ty = y0 + 22 + ph + 6; g.fillStyle = RED; rr(g, px, ty, pw, 40, 8); g.fill(); txt(g, p.label, px + pw / 2, ty + 21, F.cap(22), th.paper); }
      if (p.credit) txt(g, p.credit, 0, y0 + h - 9, F.mono(12), th.inkSoft);
      // side layout: quote text on the right
      if (side && p.quote) { const qx = x0 + 22 + pw + 26, qw = w - 22 - pw - 26 - 24, on = t - p.quoteAt; if (on > -0.3) { const a = clamp((on + 0.3) / 0.25), pr = pop(on + 0.2); g.save(); g.globalAlpha *= a; g.translate((1 - pr) * 60, 0);
          if (!p.noquote) { g.fillStyle = th.gold; g.font = F.hero(190); g.textAlign = 'left'; g.textBaseline = 'middle'; g.fillText('“', qx - 4, y0 + 110); } let y = y0 + (p.noquote ? 90 : 190); const f = F.hero(p.quoteSize), lh = p.quoteSize * 1.12;
          p.quote.forEach(seg => { const lines = typeof seg === 'string' ? [[seg, 'ink']] : [seg]; for (const [s, tn] of lines) { txt(g, s, qx, y + lh / 2, f, B.tone(tn || 'ink', true), 'left'); y += lh; } });
          if (p.quoteSub) txt(g, p.quoteSub, qx, y + 22, F.mono(22), th.inkSoft, 'left'); g.restore(); } }
      for (const s of p.stamps) stamp(g, th, t, { ...s, x: s.x ?? 0, y: s.y ?? 0 });
      if (p.crownAt != null) crown(g, th, t, { at: p.crownAt, off: p.crownOff, re: p.crownRe }, px + pw / 2, py + 22, pw / 420);
      if (p.pinned || p.stringTo) { const pk = pop(lt - 0.1); pin(g, 0, y0 + 4 - (p.file ? 22 : 0), 13 * pk); if (p.stringTo) string(g, [0, y0 + 4 - (p.file ? 22 : 0)], p.stringTo, ease.out(lin(t, p.stringAt, p.stringAt + 0.6)), 40); }
      if (pip && p.arrow) { const u = ease.out(lin(t, p.arrow.at ?? 0, (p.arrow.at ?? 0) + 0.4)), [ax, ay] = p.arrow.to, sx = 0, sy = y0 + h * 0.5; if (u > 0) { g.save(); g.strokeStyle = RED; g.fillStyle = RED; g.lineWidth = 8; g.lineCap = 'round'; const ex = lerp(sx, ax, u), ey = lerp(sy, ay, u); g.beginPath(); g.moveTo(sx, sy); g.quadraticCurveTo((sx + ex) / 2, Math.min(sy, ey) - 60 * u, ex, ey); g.stroke(); const an = Math.atan2(ey - Math.min(sy, ey) + 60 * u, ex - (sx + ex) / 2); g.translate(ex, ey); g.rotate(an); g.beginPath(); g.moveTo(0, 0); g.lineTo(-30, -16); g.lineTo(-30, 16); g.closePath(); g.fill(); g.restore(); } }
      g.restore();
    },
  });

  // ================= mini icons for the board =================
  function bi(g, kind, s, th) {
    g.save(); const u = s / 100; g.scale(u, u); g.lineCap = 'round'; g.lineJoin = 'round';
    switch (kind) {
      case 'plate': g.fillStyle = '#f4f0e4'; g.beginPath(); g.roundRect(-52, -26, 104, 52, 7); g.fill(); g.strokeStyle = '#2c3e66'; g.lineWidth = 5; g.beginPath(); g.roundRect(-47, -21, 94, 42, 4); g.stroke(); g.fillStyle = '#2c3e66'; g.fillRect(-36, -14, 72, 8); txt(g, 'CD 000', 0, 10, F.monoX(22), '#0B0F14'); break;
      case 'badge': g.fillStyle = '#2c3e66'; g.beginPath(); g.moveTo(0, -48); g.lineTo(38, -34); g.lineTo(36, 8); g.quadraticCurveTo(30, 34, 0, 48); g.quadraticCurveTo(-30, 34, -36, 8); g.lineTo(-38, -34); g.closePath(); g.fill(); g.strokeStyle = th.gold; g.lineWidth = 5; g.stroke(); g.fillStyle = th.gold; g.beginPath(); g.arc(0, -4, 14, 0, 7); g.fill(); break;
      case 'cash': for (let i = 2; i >= 0; i--) { g.fillStyle = i ? '#188a56' : '#1FA366'; g.beginPath(); g.roundRect(-46 + i * 6, -22 - i * 9, 92, 44, 5); g.fill(); } g.fillStyle = '#F5F3EE'; g.beginPath(); g.arc(0, -4, 13, 0, 7); g.fill(); txt(g, '$', 0, -2, F.hero(22), '#188a56'); break;
      case 'cuffs': g.strokeStyle = '#59606B'; g.lineWidth = 9; for (const q of [-1, 1]) { g.beginPath(); g.arc(q * 28, 6, 22, 0, 7); g.stroke(); } g.setLineDash([6, 5]); g.beginPath(); g.moveTo(-8, 6); g.lineTo(8, 6); g.stroke(); g.setLineDash([]); break;
      case 'bottle': g.fillStyle = '#1d2a1f'; g.beginPath(); g.roundRect(-16, -10, 32, 62, 8); g.fill(); g.beginPath(); g.roundRect(-7, -50, 14, 46, 4); g.fill(); g.fillStyle = '#7a1b1b'; g.fillRect(-8, -52, 16, 8); g.fillStyle = '#efe6cf'; g.beginPath(); g.roundRect(-14, 6, 28, 28, 3); g.fill(); g.fillStyle = '#0B0F14'; g.fillRect(-9, 12, 18, 3); g.fillRect(-9, 19, 14, 3); break;
      case 'labels': for (let i = 2; i >= 0; i--) { g.save(); g.translate(i * 8 - 8, -i * 6 + 6); g.rotate(i * 0.07 - 0.07); g.fillStyle = i ? '#d8cfb5' : '#efe6cf'; g.beginPath(); g.roundRect(-34, -26, 68, 52, 4); g.fill(); g.restore(); } g.fillStyle = '#0B0F14'; g.fillRect(-18, -10, 34, 4); g.fillRect(-18, -2, 26, 4); g.fillRect(-18, 6, 30, 4); break;
      case 'paddle': g.fillStyle = '#8a5a2b'; g.fillRect(-5, 6, 10, 46); g.fillStyle = '#F5F3EE'; g.beginPath(); g.arc(0, -16, 34, 0, 7); g.fill(); g.strokeStyle = '#E0281E'; g.lineWidth = 5; g.stroke(); txt(g, '42', 0, -14, F.hero(34), '#0B0F14'); break;
      case 'cheque': g.fillStyle = '#F5F3EE'; g.beginPath(); g.roundRect(-52, -28, 104, 56, 5); g.fill(); g.strokeStyle = '#59606B'; g.lineWidth = 3; g.beginPath(); g.moveTo(-40, 8); g.lineTo(20, 8); g.stroke(); g.fillStyle = '#188a56'; g.fillRect(-46, -22, 30, 8); txt(g, '$', 34, 8, F.hero(30), '#188a56'); break;
      case 'gavel': g.save(); g.rotate(-0.5); g.fillStyle = '#6b4423'; g.beginPath(); g.roundRect(-34, -30, 68, 30, 6); g.fill(); g.fillRect(-5, -2, 10, 60); g.restore(); g.fillStyle = '#2b2f36'; g.beginPath(); g.roundRect(-46, 36, 92, 14, 5); g.fill(); break;
      case 'crown': g.fillStyle = th.gold; g.beginPath(); g.moveTo(-44, 24); g.lineTo(-50, -26); g.lineTo(-22, -4); g.lineTo(0, -40); g.lineTo(22, -4); g.lineTo(50, -26); g.lineTo(44, 24); g.closePath(); g.fill(); break;
      case 'fork': g.strokeStyle = '#59606B'; g.lineWidth = 7; g.beginPath(); g.moveTo(0, 50); g.lineTo(0, -4); for (const q of [-14, 0, 14]) { g.moveTo(q, -4); g.lineTo(q, -44); } g.moveTo(-14, -4); g.lineTo(14, -4); g.stroke(); break;
    }
    g.restore();
  }
  B.crimeIcon = bi;

  // ================= board =================
  B.register('board', {
    defaults: { w: 980, h: 1140, title: 'EVIDENCE BOARD', caseNo: '', items: [], strings: [], tightAt: 99999 }, size: p => [p.w, p.h],
    anchors: p => Object.fromEntries(p.items.map((it, i) => [it.id || ('i' + i), [it.x, it.y, it.w, it.h || it.w]])),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, th = theme, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2;
      B.shadowed(g, () => rr(g, x0, y0, w, h, 22), '#5a3a1e', lift);
      g.save(); rr(g, x0, y0, w, h, 22); g.clip(); const lg = g.createLinearGradient(x0, y0, x0 + w, y0 + h); lg.addColorStop(0, '#b98650'); lg.addColorStop(1, '#8c5f33'); g.fillStyle = lg; g.fillRect(x0, y0, w, h);
      for (let i = 0; i < 320; i++) { g.fillStyle = 'rgba(' + (B.hash(i * 3.1) > 0.5 ? '60,35,10' : '230,190,130') + ',' + (0.06 + 0.1 * B.hash(i * 7.7)) + ')'; g.beginPath(); g.arc(x0 + B.hash(i * 1.3) * w, y0 + B.hash(i * 2.9) * h, 2 + 5 * B.hash(i * 5.1), 0, 7); g.fill(); } g.restore();
      g.strokeStyle = '#4a2f17'; g.lineWidth = 16; rr(g, x0, y0, w, h, 22); g.stroke(); g.strokeStyle = 'rgba(255,255,255,.12)'; g.lineWidth = 3; rr(g, x0 + 9, y0 + 9, w - 18, h - 18, 16); g.stroke();
      // title strip
      g.fillStyle = th.paper; rr(g, -270, y0 - 6, 540, 64, 10); g.fill(); txt(g, p.title, 0, y0 + 27, F.hero(36), th.ink); if (p.caseNo) txt(g, p.caseNo, 0, y0 + 50, F.mono(14), th.inkSoft);
      const pins = []; const tight = ease.out(lin(t, p.tightAt, p.tightAt + 0.5));
      p.items.forEach((it, i) => { const at = it.at ?? -1, on = t - at; pins[i] = [it.x, it.y - (it.h || it.w) / 2 + 10]; if (on < 0) return; const k = pop(on, 'bouncy'), rot = (it.rot || 0) + (1 - k) * 0.25, iw = it.w, ih = it.h || it.w;
        g.save(); g.translate(it.x, it.y); g.rotate(rot); g.scale(0.55 + 0.45 * k, 0.55 + 0.45 * k); g.globalAlpha = clamp(on / 0.08);
        paper(g, -iw / 2, -ih / 2, iw, ih, 10, { lift: 0.2, fill: it.k === 'photo' ? '#EDE7D8' : (it.fill || th.paper) });
        if (it.k === 'photo') { const pw = iw - 24, ph = ih - (it.name ? 66 : 24); g.save(); rr(g, -iw / 2 + 12, -ih / 2 + 12, pw, ph, 4); g.clip(); drawPhoto(g, imgOf(it.src), -iw / 2 + 12, -ih / 2 + 12, pw, ph, { crop: it.crop, fx: it.fx, fy: it.fy, zoom: 1 + (it.push ? it.push * ease.out(lin(on, 0, 3)) : 0) }); g.restore();
          if (it.xmark != null && t >= it.xmark) { const u = ease.out(lin(t, it.xmark, it.xmark + 0.3)); bigX(g, 0, -ih / 2 + 12 + ph / 2, pw * 0.28, RED, u, pw * 0.09); }
          if (it.name) { g.fillStyle = th.navy; rr(g, -iw / 2 + 12, ih / 2 - 52, iw - 24, 40, 6); g.fill(); txt(g, it.name, 0, ih / 2 - 31, F.hero(it.nameSize || 28), th.paper); } }
        else { // note: icon on top, text lines below
          if (it.icon) { g.save(); g.translate(0, -ih / 2 + (it.iconY ?? 62)); bi(g, it.icon, it.iconS || 96, th); g.restore(); }
          const ls = it.lines || []; let y = ih / 2 - 24 - (ls.length - 1) * ((it.size || 38) * 1.05) - (it.size || 38) * 0.5;
          ls.forEach(l => { const [s, tn, sz] = typeof l === 'string' ? [l, 'ink'] : l; txt(g, s, 0, y, F.hero(sz || it.size || 38), B.tone(tn || 'ink', true)); y += (sz || it.size || 38) * 1.05; });
          if (it.stamp && t >= it.stamp.at) { g.save(); g.translate(0, it.stamp.y ?? 0); stamp(g, th, t, { text: it.stamp.text, at: it.stamp.at, tone: it.stamp.tone, size: it.stamp.size || 34, rot: it.stamp.rot ?? -0.12 }); g.restore(); } }
        g.restore(); });
      for (const [a, b, sat] of p.strings) { if (!pins[a] || !pins[b]) continue; const ia = p.items[a], ib = p.items[b]; if (t < Math.max(ia.at ?? -1, ib.at ?? -1)) continue; string(g, pins[a], pins[b], ease.out(lin(t, sat, sat + 0.45)), lerp(34, 3, tight)); }
      p.items.forEach((it, i) => { if (t - (it.at ?? -1) > 0.05) pin(g, pins[i][0], pins[i][1], 11 * pop(t - (it.at ?? -1) - 0.05)); });
    },
  });

  // ================= victim =================
  B.register('victim', {
    defaults: { kind: 'investor', label: 'THE INVESTORS', sub: '', w: 400, h: 500, reactAt: 99999, tape: 'VICTIMS', suit: '#1FA366' }, size: p => [p.w, p.h],
    anchors: p => ({ face: [0, -p.h * 0.12, p.w * 0.6, p.h * 0.45], label: [0, p.h / 2 - 70, p.w, 120] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, th = theme, w = p.w, h = p.h, k = spring(lt, 'heavy'), shock = clamp((t - p.reactAt) / 0.12), by = h / 2 - 150;
      g.save(); g.translate(0, (1 - k) * 200); g.rotate((1 - k) * 0.08); g.globalAlpha *= clamp(lt / 0.1);
      paper(g, -w / 2, -h / 2, w, h, 20, { lift }); g.save(); rr(g, -w / 2 + 18, -h / 2 + 18, w - 36, h - 160, 12); g.clip(); const bg = g.createLinearGradient(0, -h / 2, 0, h / 2); bg.addColorStop(0, '#CFE8DA'); bg.addColorStop(1, '#9FD0B6'); g.fillStyle = bg; g.fillRect(-w / 2, -h / 2, w, h);
      const sw = 1 + 0.03 * Math.sin(t * 2.2); // body
      g.fillStyle = p.suit; g.beginPath(); g.moveTo(-w * 0.34, by + 90); g.quadraticCurveTo(-w * 0.34, by - 30, 0, by - 40); g.quadraticCurveTo(w * 0.34, by - 30, w * 0.34, by + 90); g.closePath(); g.fill(); g.fillStyle = 'rgba(0,0,0,.14)'; g.beginPath(); g.moveTo(0, by - 40); g.quadraticCurveTo(w * 0.34, by - 30, w * 0.34, by + 90); g.lineTo(0, by + 90); g.closePath(); g.fill();
      g.fillStyle = '#F5F3EE'; g.beginPath(); g.moveTo(-26, by - 36); g.lineTo(0, by + 14); g.lineTo(26, by - 36); g.closePath(); g.fill(); g.fillStyle = '#E0281E'; g.beginPath(); g.moveTo(-8, by - 14); g.lineTo(8, by - 14); g.lineTo(5, by + 36); g.lineTo(0, by + 44); g.lineTo(-5, by + 36); g.closePath(); g.fill();
      const hy = by - 100 + (shock * -8); g.fillStyle = '#E8C9A0'; g.beginPath(); g.arc(0, hy, 56, 0, 7); g.fill(); g.fillStyle = 'rgba(224,120,100,.45)'; g.beginPath(); g.arc(-34, hy + 14, 10, 0, 7); g.arc(34, hy + 14, 10, 0, 7); g.fill();
      const ey = hy - 6 - shock * 3; g.fillStyle = '#fff'; for (const q of [-1, 1]) { g.beginPath(); g.arc(q * 20, ey, 11 + shock * 3, 0, 7); g.fill(); } g.fillStyle = '#0B0F14'; for (const q of [-1, 1]) { g.beginPath(); g.arc(q * 20, ey + 1, 5 - shock * 1.5, 0, 7); g.fill(); }
      g.strokeStyle = '#5a3f08'; g.lineWidth = 5; g.lineCap = 'round'; for (const q of [-1, 1]) { g.beginPath(); g.moveTo(q * 8, ey - 20 - shock * 8); g.lineTo(q * 32, ey - 22 - shock * 12 + (1 - shock) * 4); g.stroke(); }
      g.fillStyle = '#7a2b25'; g.beginPath(); if (shock > 0.2) g.ellipse(0, hy + 32, 9, 12 * shock, 0, 0, 7); else { g.arc(0, hy + 30, 14, 0.2, Math.PI - 0.2); } g.fill();
      if (p.kind === 'investor') { g.fillStyle = '#6b4423'; g.beginPath(); g.roundRect(w * 0.12, by + 34, 98, 68, 8); g.fill(); g.strokeStyle = '#4a2f17'; g.lineWidth = 6; g.beginPath(); g.arc(w * 0.12 + 49, by + 34, 20, Math.PI, 0); g.stroke(); g.fillStyle = th.gold; g.fillRect(w * 0.12 + 42, by + 62, 14, 12); }
      if (p.kind === 'collector') { g.fillStyle = '#16202e'; g.beginPath(); g.ellipse(0, hy - 54, 68, 12, 0, 0, 7); g.fill(); g.beginPath(); g.roundRect(-40, hy - 112, 80, 62, 8); g.fill(); g.fillStyle = th.gold; g.fillRect(-40, hy - 66, 80, 10);
        g.strokeStyle = th.gold; g.lineWidth = 5; g.beginPath(); g.arc(20, ey, 17, 0, 7); g.stroke(); g.beginPath(); g.moveTo(32, ey + 12); g.lineTo(44, by + 20); g.stroke(); bi(g, 'paddle', 150, th); }
      if (p.kind === 'billionaire') { g.fillStyle = '#0B0F14'; g.beginPath(); g.roundRect(-46, ey - 12, 40, 22, 6); g.roundRect(6, ey - 12, 40, 22, 6); g.fill(); g.fillRect(-8, ey - 6, 16, 5); g.save(); g.translate(w * 0.2, by + 52); g.rotate(-0.2); bi(g, 'cheque', 120, th); g.restore(); }
      if (p.kind === 'winemaker') { g.fillStyle = '#8a5a2b'; g.beginPath(); g.moveTo(-40, by - 34); g.lineTo(40, by - 34); g.lineTo(54, by + 90); g.lineTo(-54, by + 90); g.closePath(); g.fill(); g.fillStyle = '#16202e'; g.beginPath(); g.ellipse(0, hy - 52, 62, 10, 0, 0, 7); g.fill(); g.beginPath(); g.arc(0, hy - 56, 40, Math.PI, 0); g.fill(); g.save(); g.translate(w * 0.27, by + 36); g.rotate(0.15); bi(g, 'bottle', 120, th); g.restore(); }
      if (p.kind === 'diner') { g.fillStyle = '#F5F3EE'; g.beginPath(); g.moveTo(-40, by - 34); g.lineTo(40, by - 34); g.lineTo(52, by + 70); g.lineTo(-52, by + 70); g.closePath(); g.fill(); g.strokeStyle = '#E0281E'; g.lineWidth = 4; g.beginPath(); g.moveTo(-34, by + 6); g.lineTo(34, by + 6); g.moveTo(-40, by + 30); g.lineTo(40, by + 30); g.stroke(); g.save(); g.translate(w * 0.26, by + 30); g.rotate(0.25); bi(g, 'fork', 100, th); g.restore(); }
      g.restore();
      g.fillStyle = '#188a56'; rr(g, -w / 2 + 18, h / 2 - 130, w - 36, 110, 10); g.fill(); txt(g, p.label, 0, h / 2 - 92, F.hero(p.labelSize || 44), th.paper); if (p.sub) txt(g, p.sub, 0, h / 2 - 48, F.mono(19), rgba(th.paper, 0.85));
      g.save(); g.translate(-w * 0.22, -h / 2 + 4); g.rotate(-0.1); g.fillStyle = '#188a56'; g.fillRect(-60, -16, 120, 32); txt(g, p.tape, 0, 1, F.monoX(17), th.paper); g.restore();
      g.restore();
    },
  });

  // ================= datecard (screen layer slate) =================
  B.register('datecard', {
    defaults: { big: '1988', small: 'FLORIDA', kicker: '', w: 560, tone: 'gold' }, ownEnter: true, size: p => [p.w, 150],
    draw(g, p, env) {
      const { t, lt, theme } = env, th = theme, w = p.w, h = p.kicker ? 170 : 140, k = spring(lt, 'snappy'), a = clamp(lt / 0.1); g.save(); g.globalAlpha *= a; g.translate((1 - k) * -w * 0.6, 0);
      B.shadowed(g, () => rr(g, -w / 2, -h / 2, w, h, 10), '#12171f', 0.4); g.fillStyle = '#12171f'; rr(g, -w / 2, -h / 2, w, h, 10); g.fill(); g.fillStyle = RED; g.fillRect(-w / 2, -h / 2, 12, h);
      const n = Math.floor(lin(lt, 0.1, 0.1 + 0.035 * p.big.length) * p.big.length); let y = -h / 2 + 30; if (p.kicker) { txt(g, p.kicker, -w / 2 + 40, y, F.monoX(20), th.gold, 'left'); y += 40; }
      txt(g, p.big.slice(0, n) + (n < p.big.length && Math.floor(lt * 10) % 2 ? '_' : ''), -w / 2 + 40, y + 36, F.hero(78), th.paper, 'left'); txt(g, p.small, -w / 2 + 40, h / 2 - 28, F.monoX(26), B.tone(p.tone, false), 'left'); g.restore();
    },
  });

  // ================= tile: small evidence tile (icon + caption + optional stamp) =================
  B.register('tile', {
    defaults: { icon: 'plate', caption: '', w: 270, h: 300, iconS: 150, stamp: '', stampAt: 99999, tone: 'bad', tilt: 0 }, size: p => [p.w, p.h],
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, k = spring(lt, 'bouncy'); g.save(); g.translate(0, (1 - k) * 120); g.rotate(p.tilt + (1 - k) * 0.15); g.globalAlpha *= clamp(lt / 0.1);
      paper(g, -p.w / 2, -p.h / 2, p.w, p.h, 16, { lift }); g.save(); g.translate(0, -p.h * 0.1); bi(g, p.icon, p.iconS, theme); g.restore();
      txt(g, p.caption, 0, p.h / 2 - 40, F.hero(p.cap || 34), theme.ink); if (p.stamp) stamp(g, theme, t, { text: p.stamp, at: p.stampAt, tone: p.tone, size: p.stampSize || 46, rot: -0.14, y: -p.h * 0.08 }); g.restore();
    },
  });
})();
// ===== Bad Math engine v2 — crime-show HUD (beat label pill + live number chip), screen layer =====
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, countAt, hash, hit } = B;
  // ---------- hud (screen layer): pinned beat label + a LIVE REAL number chip that rolls to each new value on its trigger word ----------
  // labels: [{at, text}] · items: [{at, label, to, from?, dur?, prefix?, suffix?, commas?}]; `from` defaults to the previous item's `to`.
  B.register('hud', {
    defaults: { labels: [], items: [] }, ownEnter: true, size: () => [10, 10],
    draw(g, p, env) {
      const { t, theme } = env; let li = -1; p.labels.forEach((l, i) => { if (t >= l.at) li = i; });
      if (li >= 0) { const L = p.labels[li], lt = t - L.at, k = ease.out(clamp(lt / 0.3)), P = li > 0 ? p.labels[li - 1] : null, f = F.cap(27); g.font = f; const nw = g.measureText(L.text).width + 62;
        g.save(); g.translate(90, 318); if (P && lt < 0.3) { g.globalAlpha = 1 - k; txt(g, P.text, 38, -((k) * 18) + 22, f, theme.paper, 'left'); g.globalAlpha = 1; }
        g.fillStyle = 'rgba(11,15,20,.82)'; rr(g, 0, 0, nw, 46, 10); g.fill(); g.fillStyle = theme.gold; g.beginPath(); g.arc(22, 23, 7, 0, 7); g.fill(); g.save(); rr(g, 0, 0, nw, 46, 10); g.clip(); g.globalAlpha = lt < 0.3 ? k : 1; txt(g, L.text, 38, 24 + (1 - k) * 16, f, theme.paper, 'left'); g.restore(); g.restore(); }
      let ii = -1; p.items.forEach((it, i) => { if (t >= it.at) ii = i; }); if (ii < 0) return; const it = p.items[ii], prev = ii > 0 ? p.items[ii - 1] : null, from = it.from != null ? it.from : (prev ? prev.to : 0), dur = it.dur || 0.6, rt = t - it.at, v = countAt(Math.max(0, rt), dur, from, it.to), land = rt - dur;
      const sp = rt > 0 && rt < dur ? Math.min(40, Math.abs(countAt(rt + 0.02, dur, from, it.to) - v) / 0.02 / Math.max(1, Math.abs(it.to - from)) * 6) : 0, o = { font: F.hero(54), size: 54, color: it.tone ? B.tone(it.tone, false) : theme.paper, prefix: it.prefix || '', suffix: it.suffix || '', align: 'left', commas: it.commas !== false, decimals: 0, speed: sp };
      const lab = it.label; g.font = F.mono(19); const lw = g.measureText(lab).width, nw = B.rollWidth(g, it.to, o).w, cw = Math.max(lw, nw) + 44, x1 = 990, s = 1 + (land > 0 ? 0.08 * hit(land, 7) : 0);
      g.save(); g.translate(x1, 300); g.fillStyle = 'rgba(11,15,20,.82)'; rr(g, -cw, 0, cw, 92, 12); g.fill(); if (rt < 0.3 && prev) { g.globalAlpha = 1 - rt / 0.3; txt(g, prev.label, -cw + 22, 20, F.mono(19), rgba(theme.paper, 0.75), 'left'); g.globalAlpha = 1; }
      g.save(); rr(g, -cw, 0, cw, 92, 12); g.clip(); g.globalAlpha = clamp(rt / 0.25 + 0.4); txt(g, lab, -cw + 22, 20, F.mono(19), rgba(theme.gold, 0.95), 'left'); g.translate(-cw + 22, 64); g.scale(s, s); roll(g, v, 0, 0, o); g.restore(); g.restore();
    },
  });
})();
// ===== Lottery Part 2 v3 (CRIME-SHOW / What If pass) — recurring cast + new real-object recipes. Prepended after shared.js. =====
// crew     : THE AUSTRALIAN FUND (kind 'fund', green + gold blazers) / THE TEXAS GROUP (kind 'texas', navy + red). Same three faces every time. coloured ILLUSTRATION cards.
// official : THE STATE OF VIRGINIA — one consistent lottery official (grey suit, glasses, VA seal) with moods, a magnifier, a PAID stamp, a pen.
// bundles  : rubber-banded ticket bundles popping onto a printing belt.   salaries : 20 pay slips.   combos : a dot-grid of every combination.
// house    : "THE HOUSE" card with an ALWAYS WINS banner that gets crossed out.   qticket : a ticket with a "?" and a magnifier.
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, countAt, hash, hit, wobble } = B;
  const INK = '#0B0F14';
  const NOW = 1e9; const at0 = v => (v == null ? NOW : v);
  const zn = () => B.zoomNow || 1;

  // ---------------------------------------------------------------- bust helper (origin = bottom centre of torso, head centre ~ y -150)
  function bust(g, o) {
    const { skin, hair, suit, shirt = '#F5F3EE', tie = null, mood = 'neutral', tt = 0, glasses = false, hairStyle = 'short', s = 1, lapel = null, tint = null } = o;
    const blink = (tt % 3.4) < 0.1 || ((tt + 1.3) % 5.1) > 5.02;
    g.save(); g.scale(s, s); g.lineJoin = 'round'; g.lineCap = 'round';
    const bob = Math.sin(tt * 2.4 + (o.ph || 0)) * 2; g.translate(0, bob);
    // torso
    clay(g, -78, -104, 156, 106, 38, suit, { shadowK: 0.5 });
    g.fillStyle = shirt; g.beginPath(); g.moveTo(-24, -102); g.lineTo(24, -102); g.lineTo(0, -52); g.closePath(); g.fill();
    if (tie) { g.fillStyle = tie; g.beginPath(); g.moveTo(-8, -98); g.lineTo(8, -98); g.lineTo(11, -66); g.lineTo(0, -48); g.lineTo(-11, -66); g.closePath(); g.fill(); }
    if (lapel) { g.fillStyle = lapel; g.beginPath(); g.arc(36, -70, 8, 0, 7); g.fill(); g.strokeStyle = INK; g.lineWidth = 2.5; g.stroke(); }
    // neck + head
    g.fillStyle = B.shade ? B.shade(skin, -0.08) : skin; g.fillRect(-14, -112, 28, 16);
    const cy = -154, R = 50;
    if (hairStyle === 'long') { g.fillStyle = hair; g.strokeStyle = INK; g.lineWidth = 4; g.beginPath(); g.ellipse(0, cy + 8, R + 10, R + 18, 0, 0, 7); g.fill(); g.stroke(); }
    g.fillStyle = skin; g.strokeStyle = INK; g.lineWidth = 4.5; g.beginPath(); g.ellipse(0, cy, R * 0.94, R, 0, 0, 7); g.fill(); g.stroke();
    for (const q of [-1, 1]) { g.beginPath(); g.ellipse(q * R * 0.94, cy + 3, 8, 12, 0, 0, 7); g.fill(); g.stroke(); }
    // hair
    g.fillStyle = hair; g.lineWidth = 4;
    if (hairStyle === 'short') { g.beginPath(); g.moveTo(-R * 0.92, cy - 6); g.quadraticCurveTo(-R * 1.05, cy - R * 1.12, 0, cy - R * 1.08); g.quadraticCurveTo(R * 1.05, cy - R * 1.12, R * 0.92, cy - 6); g.quadraticCurveTo(R * 0.55, cy - R * 0.62, 0, cy - R * 0.66); g.quadraticCurveTo(-R * 0.55, cy - R * 0.62, -R * 0.92, cy - 6); g.fill(); g.stroke(); }
    else if (hairStyle === 'long') { g.beginPath(); g.moveTo(-R * 0.96, cy + 4); g.quadraticCurveTo(-R * 1.1, cy - R * 1.15, 0, cy - R * 1.1); g.quadraticCurveTo(R * 1.1, cy - R * 1.15, R * 0.96, cy + 4); g.quadraticCurveTo(R * 0.3, cy - R * 0.5, -R * 0.2, cy - R * 0.62); g.quadraticCurveTo(-R * 0.7, cy - R * 0.4, -R * 0.96, cy + 4); g.fill(); g.stroke(); }
    else if (hairStyle === 'cap') { g.fillStyle = o.cap || '#2c3e66'; g.beginPath(); g.moveTo(-R * 1.0, cy - 8); g.quadraticCurveTo(-R * 1.05, cy - R * 1.25, 0, cy - R * 1.2); g.quadraticCurveTo(R * 1.05, cy - R * 1.25, R * 1.0, cy - 8); g.closePath(); g.fill(); g.stroke(); g.fillRect(-R * 1.0, cy - 12, R * 2.0, 10); g.strokeRect(-R * 1.0, cy - 12, R * 2.0, 10); g.beginPath(); g.moveTo(R * 0.2, cy - 8); g.quadraticCurveTo(R * 1.1, cy - 4, R * 1.28, cy + 4); g.lineTo(R * 0.4, cy + 2); g.closePath(); g.fill(); g.stroke(); }
    else if (hairStyle === 'grey') { g.fillStyle = '#C9CCD3'; g.beginPath(); g.moveTo(-R * 0.94, cy - 4); g.quadraticCurveTo(-R * 1.06, cy - R * 0.95, -R * 0.4, cy - R * 1.04); g.quadraticCurveTo(0, cy - R * 0.92, R * 0.4, cy - R * 1.04); g.quadraticCurveTo(R * 1.06, cy - R * 0.95, R * 0.94, cy - 4); g.quadraticCurveTo(R * 0.7, cy - R * 0.55, 0, cy - R * 0.6); g.quadraticCurveTo(-R * 0.7, cy - R * 0.55, -R * 0.94, cy - 4); g.fill(); g.stroke(); }
    // face by mood
    const M = { neutral: { b: 0, t: 0, m: 'smile', e: 'n' }, cheer: { b: 12, t: 0, m: 'grin', e: 'arc' }, shock: { b: 16, t: 0, m: 'o', e: 'wide' }, think: { b: 8, t: 0.12, m: 'flat', e: 'n', look: [-1, -1] }, stern: { b: -4, t: 0.3, m: 'frown', e: 'n' }, smug: { b: -2, t: -0.1, m: 'smirk', e: 'half' }, worry: { b: 12, t: -0.3, m: 'wob', e: 'n', sweat: 1 }, tired: { b: -2, t: -0.2, m: 'flat', e: 'half' } }[mood] || { b: 0, t: 0, m: 'smile', e: 'n' };
    for (const q of [-1, 1]) {
      const ex = q * 20, ey = cy - 4;
      if (M.e === 'arc' || blink) { g.strokeStyle = INK; g.lineWidth = 4.5; g.beginPath(); if (M.e === 'arc') g.arc(ex, ey + 4, 10, Math.PI * 1.1, Math.PI * 1.9); else { g.moveTo(ex - 9, ey); g.lineTo(ex + 9, ey); } g.stroke(); }
      else { const er = M.e === 'wide' ? 13 : 10.5; g.fillStyle = '#F5F3EE'; g.strokeStyle = INK; g.lineWidth = 3.5; g.beginPath(); g.ellipse(ex, ey, er, er * (M.e === 'half' ? 0.7 : 1.05), 0, 0, 7); g.fill(); g.stroke(); const lk = M.look || [0.3 * Math.sin(tt * 0.9), 0]; g.fillStyle = INK; g.beginPath(); g.arc(ex + lk[0] * 3.5, ey + lk[1] * 3.5, M.e === 'wide' ? 3.6 : 5, 0, 7); g.fill();
        if (M.e === 'half') { g.fillStyle = skin; g.fillRect(ex - er - 1, ey - er * 1.1, er * 2 + 2, er * 0.55); g.strokeStyle = INK; g.lineWidth = 3; g.beginPath(); g.moveTo(ex - er, ey - er * 0.45); g.lineTo(ex + er, ey - er * 0.45); g.stroke(); } }
      g.strokeStyle = hairStyle === 'grey' ? '#8B8F99' : INK; g.lineWidth = 5; g.beginPath(); g.moveTo(ex - 11 * q, ey - 17 - M.b * 0.4 + M.t * 10 * q); g.lineTo(ex + 11 * q, ey - 17 - M.b * 0.4 - M.t * 10 * q); g.stroke();
    }
    if (glasses) { g.strokeStyle = '#2b2f36'; g.lineWidth = 3.5; for (const q of [-1, 1]) { g.beginPath(); g.rect(q * 20 - 15, cy - 20, 30, 24); g.stroke(); } g.beginPath(); g.moveTo(-5, cy - 10); g.lineTo(5, cy - 10); g.stroke(); }
    const my = cy + 28; g.strokeStyle = INK; g.lineWidth = 4;
    if (M.m === 'smile') { g.beginPath(); g.arc(0, my - 6, 14, 0.3, Math.PI - 0.3); g.stroke(); }
    else if (M.m === 'grin') { g.fillStyle = '#7A1F1F'; g.beginPath(); g.moveTo(-20, my - 8); g.quadraticCurveTo(0, my + 26, 20, my - 8); g.closePath(); g.fill(); g.stroke(); g.fillStyle = '#F5F3EE'; g.beginPath(); g.moveTo(-15, my - 6); g.lineTo(15, my - 6); g.lineTo(12, my + 2); g.lineTo(-12, my + 2); g.closePath(); g.fill(); }
    else if (M.m === 'o') { g.fillStyle = '#7A1F1F'; g.beginPath(); g.ellipse(0, my + 2, 9, 13, 0, 0, 7); g.fill(); g.stroke(); }
    else if (M.m === 'flat') { g.beginPath(); g.moveTo(-11, my); g.lineTo(11, my - 2); g.stroke(); }
    else if (M.m === 'frown') { g.beginPath(); g.arc(0, my + 12, 14, Math.PI + 0.35, -0.35); g.stroke(); }
    else if (M.m === 'smirk') { g.beginPath(); g.moveTo(-12, my); g.quadraticCurveTo(4, my + 8, 18, my - 9); g.stroke(); }
    else if (M.m === 'wob') { g.beginPath(); g.moveTo(-14, my + 4); g.quadraticCurveTo(-7, my - 5, 0, my + 4); g.quadraticCurveTo(7, my + 13, 14, my + 4); g.stroke(); }
    if (M.sweat) { const w = (tt * 1.5) % 1; g.fillStyle = '#7FD6FF'; g.strokeStyle = INK; g.lineWidth = 2.5; g.save(); g.translate(48, cy - 26 + w * 10); g.beginPath(); g.moveTo(0, -12); g.quadraticCurveTo(10, 2, 0, 9); g.quadraticCurveTo(-10, 2, 0, -12); g.fill(); g.stroke(); g.restore(); }
    g.restore();
  }
  window.BMBUST = bust;
  const moodAt = (K, t, d = 'neutral') => { let c = { m: d, t: -1e9 }; for (const k of K || []) if (t >= k.t && k.t >= c.t) c = k; return c; };

  // ---------------------------------------------------------------- crew card
  const CREWS = {
    fund: { bg0: '#BFE3F2', bg1: '#F7E7B0', ground: '#7FBF8F', suit: '#1FA366', lapel: '#F2B705', label: 'THE AUSTRALIAN FUND', sub: 'ILLUSTRATION · A GROUP OF INVESTORS',
      people: [{ x: -128, y: 0, s: 0.84, skin: '#E8C39A', hair: '#6B4423', hs: 'short' }, { x: 128, y: 0, s: 0.84, skin: '#C98E64', hair: '#16181F', hs: 'long' }, { x: 0, y: 14, s: 1.05, skin: '#F1CDA8', hair: '#B07A3A', hs: 'cap', cap: '#F2B705' }] },
    texas: { bg0: '#F3C9B5', bg1: '#F7E1B8', ground: '#C98F5A', suit: '#2c3e66', lapel: '#E0281E', label: 'THE TEXAS GROUP', sub: 'ILLUSTRATION · A GROUP OF BUYERS',
      people: [{ x: -128, y: 0, s: 0.84, skin: '#F1CDA8', hair: '#3a2a1a', hs: 'cap', cap: '#E0281E' }, { x: 128, y: 0, s: 0.84, skin: '#8D5A3B', hair: '#16181F', hs: 'short' }, { x: 0, y: 14, s: 1.05, skin: '#E8C39A', hair: '#8a6a3a', hs: 'long' }] },
  };
  B.register('crew', {
    defaults: { kind: 'fund', w: 520, h: 540, cheerAt: NOW, worryAt: NOW, calmAt: NOW, held: 'none', heldAt: NOW, label: null, sub: null, tilt: -0.02, tag: '', mono: false, stamps: [] }, ownEnter: true,
    size: p => [p.w, p.h], anchors: p => ({ face: [0, -p.h * 0.18, p.w * 0.82, p.h * 0.5], plate: [0, p.h / 2 - 70, p.w, 120], all: [0, 0, p.w, p.h] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, C = CREWS[p.kind], w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, k = spring(lt, 'heavy');
      g.save(); g.translate(0, (1 - k) * 230); g.rotate(p.tilt + (1 - k) * -0.1); g.globalAlpha *= clamp(lt / 0.1);
      paper(g, x0, y0, w, h, 18, { lift });
      const px = x0 + 20, py = y0 + 20, pw = w - 40, ph = h - 20 - 20 - 118;
      g.save(); rr(g, px, py, pw, ph, 10); g.clip(); const bg = g.createLinearGradient(0, py, 0, py + ph); bg.addColorStop(0, C.bg0); bg.addColorStop(1, C.bg1); g.fillStyle = bg; g.fillRect(px, py, pw, ph);
      g.fillStyle = C.ground; g.fillRect(px, py + ph - 56, pw, 60); g.fillStyle = 'rgba(0,0,0,.08)'; g.fillRect(px, py + ph - 56, pw, 6);
      const cheer = t >= p.cheerAt && t < p.calmAt, worry = t >= p.worryAt && t < p.cheerAt, since = t - p.cheerAt, by = py + ph - 40;
      const order = [0, 1, 2];
      for (const i of order) { const q = C.people[i]; const jump = cheer ? Math.abs(Math.sin(Math.max(0, since) * 7 + i * 1.7)) * Math.exp(-Math.max(0, since) * 0.9) * 34 : 0;
        g.save(); g.translate((px + pw / 2) + q.x * (pw / 520), by - jump + q.y); bust(g, { skin: q.skin, hair: q.hair, hairStyle: q.hs, cap: q.cap, suit: C.suit, tie: i === 2 ? C.lapel : null, lapel: C.lapel, s: q.s * (pw / 480), tt: t, ph: i * 1.3, mood: cheer ? 'cheer' : worry ? 'worry' : (i === 2 ? 'smug' : 'neutral') });
        if (cheer && i !== 2) { g.strokeStyle = INK; g.lineWidth = 4; g.fillStyle = q.skin; for (const sd of [-1, 1]) { g.beginPath(); g.moveTo(sd * 66 * q.s, -60 * q.s); g.lineTo(sd * 92 * q.s, -150 * q.s - jump * 0.3); g.stroke(); g.beginPath(); g.arc(sd * 92 * q.s, -154 * q.s - jump * 0.3, 11, 0, 7); g.fill(); g.stroke(); } }
        g.restore(); }
      // held object in front (tickets fan / cheque)
      const hn = t - p.heldAt; if (p.held !== 'none' && hn > -0.01) { const hk = spring(Math.max(0, hn), 'snappy'); g.save(); g.translate(px + pw / 2, by + 6 + (1 - hk) * 60); g.globalAlpha *= clamp(hn / 0.1);
        if (p.held === 'tickets') { for (let i = 0; i < 5; i++) { B.ticket(g, (i - 2) * 46, -14 + Math.abs(i - 2) * 6, 124, 58, (i - 2) * 0.16, i, { sh: 6 }); } }
        else { g.fillStyle = theme.paper; g.strokeStyle = theme.goodInk; g.lineWidth = 4; rr(g, -92, -44, 184, 80, 8); g.fill(); g.stroke(); txt(g, '$27,000,000', 0, -4, F.hero(34), theme.goodInk); }
        g.restore(); }
      if (p.mono) { g.globalCompositeOperation = 'saturation'; g.fillStyle = '#808080'; g.fillRect(px, py, pw, ph); g.globalCompositeOperation = 'source-over'; }
      g.restore(); g.strokeStyle = 'rgba(11,15,20,.3)'; g.lineWidth = 2; rr(g, px, py, pw, ph, 10); g.stroke();
      // name plate
      const ty = py + ph + 12; g.fillStyle = theme.navy; rr(g, px, ty, pw, 100, 10); g.fill(); txt(g, p.label || C.label, px + pw / 2, ty + 38, F.hero(p.labelSize || 42), theme.paper); txt(g, p.sub || C.sub, px + pw / 2, ty + 78, F.mono(14), theme.gold);
      for (const s of p.stamps) B.crimeStamp && B.crimeStamp(g, theme, t, { ...s, x: s.x ?? 0, y: s.y ?? 0 });
      if (p.tag) { g.save(); g.translate(-w * 0.26, y0 + 4); g.rotate(-0.1); g.fillStyle = C.suit; g.fillRect(-64, -15, 128, 30); txt(g, p.tag, 0, 1, F.monoX(16), theme.paper); g.restore(); }
      g.restore();
    },
  });

  // ---------------------------------------------------------------- the Virginia official
  B.register('official', {
    defaults: { w: 480, h: 560, moods: [], glassAt: NOW, glassDur: 1.4, stampAt: NOW, stampText: 'PAID', penAt: NOW, tilt: 0.02, label: 'THE STATE OF VIRGINIA', sub: 'ILLUSTRATION · LOTTERY OFFICIAL', mono: false, thought: '', thoughtAt: NOW, thoughtOut: NOW }, ownEnter: true,
    size: p => [p.w, p.h], anchors: p => ({ face: [0, -p.h * 0.17, p.w * 0.7, p.h * 0.45], plate: [0, p.h / 2 - 70, p.w, 120], all: [0, 0, p.w, p.h] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, k = spring(lt, 'heavy'), mk = moodAt(p.moods, t, 'neutral');
      g.save(); g.translate(0, (1 - k) * 230); g.rotate(p.tilt + (1 - k) * 0.1); g.globalAlpha *= clamp(lt / 0.1);
      paper(g, x0, y0, w, h, 18, { lift });
      const px = x0 + 20, py = y0 + 20, pw = w - 40, ph = h - 40 - 118;
      g.save(); rr(g, px, py, pw, ph, 10); g.clip(); const bg = g.createLinearGradient(0, py, 0, py + ph); bg.addColorStop(0, '#D9E6F2'); bg.addColorStop(1, '#F1E3C8'); g.fillStyle = bg; g.fillRect(px, py, pw, ph);
      // flag-ish backdrop stripes + wall clock
      g.fillStyle = 'rgba(44,62,102,.1)'; g.fillRect(px, py + ph * 0.55, pw, ph * 0.45); g.fillStyle = 'rgba(0,0,0,.07)'; g.fillRect(px, py + ph - 52, pw, 56);
      // seal
      g.save(); g.translate(px + 62, py + 66); g.fillStyle = theme.navy; g.beginPath(); g.arc(0, 0, 44, 0, 7); g.fill(); g.strokeStyle = theme.gold; g.lineWidth = 4; g.beginPath(); g.arc(0, 0, 36, 0, 7); g.stroke(); txt(g, 'VA', 0, 2, F.hero(36), theme.gold); g.restore();
      const cx = px + pw / 2, by = py + ph - 36;
      g.save(); g.translate(cx, by); const hs = (pw / 480) * 1.5;
      // arm holding a pen / stamp (right side)
      const sl = t - p.stampAt, stamping = sl > -0.4 && sl < 0.6, pen = t - p.penAt;
      bust(g, { skin: '#E9C6A0', hair: '#C9CCD3', hairStyle: 'grey', suit: '#59606B', tie: '#E0281E', lapel: theme.gold, glasses: true, s: hs, tt: t, mood: mk.m });
      // stamp tool (wooden) raised on the right, slams down at stampAt
      if (p.stampAt < NOW / 2) { const up = sl < 0 ? ease.out(clamp((sl + 0.4) / 0.4)) * 0 + 1 : 1, dy = sl < 0 ? -34 + 0 : (sl < 0.16 ? lerp(-34, 40, ease.in(clamp(sl / 0.16))) : lerp(40, -20, ease.out(clamp((sl - 0.5) / 0.5))));
        g.save(); g.translate(96 * hs * 0.72, -118 * hs * 0.72 + dy); g.fillStyle = '#8a5a2b'; rr(g, -14, -60, 28, 56, 8); g.fill(); g.strokeStyle = INK; g.lineWidth = 3; g.stroke(); g.fillStyle = '#59606B'; rr(g, -34, -6, 68, 22, 6); g.fill(); g.stroke(); g.restore(); }
      else if (p.penAt < NOW / 2) { const wr = pen > 0 ? Math.sin(pen * 14) * 3 : 0; g.save(); g.translate(92 * hs * 0.72, -102 * hs * 0.72); g.rotate(-0.6 + wr * 0.02); g.fillStyle = '#E0281E'; rr(g, -4, -52, 8, 60, 4); g.fill(); g.strokeStyle = INK; g.lineWidth = 2.5; g.stroke(); g.restore(); }
      g.restore();
      if (p.mono) { g.globalCompositeOperation = 'saturation'; g.fillStyle = '#808080'; g.fillRect(px, py, pw, ph); g.globalCompositeOperation = 'source-over'; }
      g.restore(); g.strokeStyle = 'rgba(11,15,20,.3)'; g.lineWidth = 2; rr(g, px, py, pw, ph, 10); g.stroke();
      // magnifier sweep over the photo area
      const gn = t - p.glassAt; if (gn > -0.05 && gn < p.glassDur + 0.5) { const u = ease.inOut(clamp(gn / p.glassDur)), gx = lerp(px + pw * 0.25, px + pw * 0.8, u), gy = py + ph * 0.55 + Math.sin(u * Math.PI * 3) * 22, r = 62, fa = clamp((gn + 0.05) / 0.12) * (1 - clamp((gn - p.glassDur) / 0.4));
        g.save(); g.globalAlpha *= fa; g.translate(gx, gy); g.rotate(-0.3); g.fillStyle = 'rgba(245,243,238,.2)'; g.beginPath(); g.arc(0, 0, r, 0, 7); g.fill(); g.strokeStyle = theme.gold; g.lineWidth = r * 0.24; g.beginPath(); g.arc(0, 0, r, 0, 7); g.stroke(); g.strokeStyle = INK; g.lineWidth = r * 0.3; g.beginPath(); g.moveTo(r * 0.72, r * 0.72); g.lineTo(r * 1.5, r * 1.55); g.stroke(); g.restore(); }
      // stamp result
      if (sl > 0.12) { const st = sl - 0.12, sc = 1 + 1.0 * (1 - ease.expo(clamp(st / 0.2))), sf = F.hero(86), sw = (p.stampText.length * 52) + 70; g.save(); g.translate(cx + 0, py + ph * 0.5); g.rotate(-0.12); g.scale(sc, sc); g.globalAlpha *= clamp(st / 0.05); const col = p.stampTone === 'bad' ? theme.badInk : theme.goodInk;
        g.fillStyle = 'rgba(245,243,238,.94)'; rr(g, -sw / 2, -62, sw, 124, 12); g.fill(); g.strokeStyle = col; g.lineWidth = 9; rr(g, -sw / 2 + 7, -55, sw - 14, 110, 9); g.stroke(); txt(g, p.stampText, 0, 4, sf, col); g.restore(); burst(g, cx, py + ph * 0.5, sw * 0.55, p.stampTone === 'bad' ? theme.bad : theme.good, st - 0.1, 14, 0.45); }
      // thought bubble
      if (p.thought && t >= p.thoughtAt && t < p.thoughtOut) { const tk = spring(t - p.thoughtAt, 'snappy'), fa = 1 - clamp((t - p.thoughtOut + 0.2) / 0.2); g.save(); g.globalAlpha *= fa; g.translate(px + pw * 0.62, py + 62); g.scale(0.5 + 0.5 * tk, 0.5 + 0.5 * tk); g.fillStyle = theme.paper; rr(g, -90, -44, 180, 88, 26); g.fill(); g.strokeStyle = INK; g.lineWidth = 3; g.stroke(); txt(g, p.thought, 0, 3, F.hero(54), theme.badInk); g.restore(); }
      const ty = py + ph + 12; g.fillStyle = theme.navy; rr(g, px, ty, pw, 100, 10); g.fill(); txt(g, p.label, px + pw / 2, ty + 38, F.hero(p.labelSize || 38), theme.paper); txt(g, p.sub, px + pw / 2, ty + 78, F.mono(14), theme.gold);
      g.restore();
    },
  });

  // ---------------------------------------------------------------- bundles on a printing belt
  B.register('bundles', {
    defaults: { cols: 6, rows: 3, at: NOW, per: 0.1, w: 900, label: 'PRINTED IN BULK', countTo: 0, countAt: NOW, countDur: 1.4, beltAt: NOW }, ownEnter: true,
    size: p => [p.w, p.rows * 150 + 170],
    anchors: p => ({ pile: [0, -30, p.w, p.rows * 150], belt: [0, p.rows * 75 + 30, p.w, 70] }),
    draw(g, p, env) {
      const { t, lt, theme } = env, w = p.w, rows = p.rows, h = rows * 150 + 170, y0 = -h / 2, beltY = y0 + rows * 150 + 70;
      // belt
      g.save(); g.globalAlpha *= clamp(lt / 0.1); const bk = spring(lt, 'snappy'); g.translate(0, (1 - bk) * 80);
      clay(g, -w / 2, beltY, w, 50, 22, '#3a4252', { lift: 0.4, shadowK: 0.6 }); g.save(); rr(g, -w / 2, beltY, w, 50, 22); g.clip(); g.fillStyle = 'rgba(245,243,238,.28)'; const off = (t * 120) % 60; for (let x = -w / 2 - 60 + off; x < w / 2 + 60; x += 60) { g.beginPath(); g.moveTo(x, beltY + 8); g.lineTo(x + 20, beltY + 8); g.lineTo(x + 8, beltY + 42); g.lineTo(x - 12, beltY + 42); g.closePath(); g.fill(); } g.restore(); g.restore();
      let i = 0; const cw = w / p.cols;
      for (let r = 0; r < rows; r++) for (let c = 0; c < p.cols; c++, i++) {
        const o = t - (p.at + i * p.per); if (o <= 0) continue; const k = spring(o, 'snappy'), cx = -w / 2 + cw * (c + 0.5), cy = y0 + (rows - 1 - r) * 150 + 80 + (1 - k) * -220 + (r === 0 ? 0 : 0);
        g.save(); g.translate(cx, cy); g.globalAlpha *= clamp(o / 0.08); g.rotate((hash(i * 3.3) - 0.5) * 0.06);
        for (let j = 3; j >= 0; j--) B.ticket(g, (hash(i + j) - 0.5) * 6, -j * 11 + 20, 150, 66, (hash(i * 2 + j * 5) - 0.5) * 0.08, i + j, { sh: j === 0 ? 8 : 0 });
        g.fillStyle = theme.badInk; rr(g, -14, -34, 28, 78, 4); g.fill(); g.strokeStyle = 'rgba(0,0,0,.25)'; g.lineWidth = 2; g.stroke(); g.restore();
      }
      const ln = t - p.at; if (p.label && ln > -0.2) { const r = (ln + 0.2); g.save(); g.globalAlpha *= clamp(r / 0.2); txt(g, p.label, 0, y0 - 40, F.hero(70), theme.paper); g.restore(); }
      if (p.countTo) { const cn = t - p.countAt, v = cn < 0 ? 0 : countAt(Math.max(0, cn), p.countDur, 0, p.countTo); g.save(); g.globalAlpha *= clamp((cn + 0.1) / 0.15); const o = { font: F.hero(120), size: 120, color: theme.gold, prefix: '', suffix: '+', decimals: 0, align: 'center' }; roll(g, v, 0, beltY + 150, o); g.restore(); }
    },
  });

  // ---------------------------------------------------------------- salaries: 20 pay slips
  B.register('salaries', {
    defaults: { at: NOW, per: 0.1, n: 20, w: 760, h: 760, each: '$65K', total: '$1.3M', totalAt: NOW }, size: p => [p.w, p.h],
    anchors: p => ({ count: [0, -p.h / 2 + 100, p.w * 0.8, 150], grid: [0, 30, p.w * 0.92, p.h * 0.58], total: [0, p.h / 2 - 90, p.w * 0.9, 120] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 22, { lift });
      g.save(); rr(g, x0, y0, w, h, 22); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 170); g.restore();
      let done = 0; for (let i = 0; i < p.n; i++) if (t >= p.at + i * p.per) done++;
      txt(g, 'NORMAL SALARIES', 0, y0 + 40, F.cap(34), rgba(theme.paper, 0.85));
      txt(g, String(done), -60, y0 + 112, F.hero(100), done >= p.n ? theme.gold : theme.paper); txt(g, '/ ' + p.n, 66, y0 + 124, F.hero(56), rgba(theme.paper, 0.7));
      const cols = 5, rows = 4, gw = (w - 80) / cols, gh = (h - 170 - 150) / rows;
      for (let i = 0; i < p.n; i++) { const o = t - (p.at + i * p.per); if (o <= 0) continue; const k = spring(o, 'bouncy'), c = i % cols, r = Math.floor(i / cols), cx = x0 + 40 + gw * (c + 0.5), cy = y0 + 170 + 26 + gh * (r + 0.5);
        g.save(); g.translate(cx, cy); g.scale(0.4 + 0.6 * k, 0.4 + 0.6 * k); g.globalAlpha *= clamp(o / 0.06); g.rotate((hash(i * 4.1) - 0.5) * 0.12); paper(g, -gw * 0.44, -gh * 0.42, gw * 0.88, gh * 0.84, 8, { lift: 0.15, fill: '#EFF6EC' });
        g.fillStyle = '#E8C39A'; g.beginPath(); g.arc(-gw * 0.2, -gh * 0.08, 14, 0, 7); g.fill(); g.fillStyle = '#1FA366'; g.beginPath(); g.moveTo(-gw * 0.2 - 22, gh * 0.3); g.quadraticCurveTo(-gw * 0.2, gh * 0.02, -gw * 0.2 + 22, gh * 0.3); g.closePath(); g.fill();
        txt(g, p.each, gw * 0.12, -gh * 0.06, F.hero(30), theme.goodInk); g.fillStyle = theme.paperShade; rr(g, -gw * 0.1 + 8, gh * 0.12, gw * 0.4, 8, 4); g.fill(); g.restore(); }
      const tn = t - p.totalAt; if (tn > -0.02) { const k = spring(Math.max(0, tn), 'snappy'); g.save(); g.translate(0, y0 + h - 82 + (1 - k) * 30); g.globalAlpha *= clamp(tn / 0.1); marker(g, -w * 0.43, -46, w * 0.86, 92, theme.goodInk, clamp(tn / 0.3), 0.18); txt(g, '≈ ' + p.total + ' A YEAR', 0, 4, F.hero(72), theme.goodInk); g.restore(); burst(g, 0, y0 + h - 82, 300, theme.good, tn - 0.05, 16, 0.5); }
      txt(g, 'ROUGH: ~$65K A TYPICAL US SALARY', 0, y0 + h - 22, F.mono(15), theme.inkSoft);
    },
  });

  // ---------------------------------------------------------------- combos: every lottery combination as a dot grid
  B.register('combos', {
    defaults: { at: NOW, dur: 2.4, w: 860, h: 720, cols: 20, rows: 14, missing: 3, pctAt: NOW, label: 'EVERY COMBINATION', sub: 'EACH DOT = ABOUT 92,000 COMBINATIONS', boughtLabel: 'BOUGHT', tone: 'good' },
    size: p => [p.w, p.h], anchors: p => ({ pct: [0, -p.h / 2 + 120, p.w * 0.8, 170], grid: [0, 40, p.w * 0.94, p.h * 0.62] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, N = p.cols * p.rows; paper(g, x0, y0, w, h, 22, { lift });
      g.save(); rr(g, x0, y0, w, h, 22); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 190); g.restore();
      txt(g, p.label, 0, y0 + 40, F.cap(34), rgba(theme.paper, 0.85));
      const u = t < p.at ? 0 : ease.inOut(clamp((t - p.at) / p.dur)), fill = Math.floor(u * (N - p.missing + 0.999)), pct = N ? (fill / N * 100) : 0, done = u >= 1;
      const o = { font: F.hero(120), size: 120, color: done ? theme.gold : theme.paper, prefix: '', suffix: '%', decimals: 0, align: 'center' }; roll(g, Math.min(99, pct), 0, y0 + 124, o);
      const gx = x0 + 44, gy = y0 + 220, cw = (w - 88) / p.cols, ch = (h - 220 - 70) / p.rows;
      for (let i = 0; i < N; i++) { const c = i % p.cols, r = Math.floor(i / p.cols), cx = gx + cw * (c + 0.5), cy = gy + ch * (r + 0.5), rad = Math.min(cw, ch) * 0.34, isMiss = i >= N - p.missing;
        if (i < fill) { const age = u < 1 ? 0 : 1; g.fillStyle = theme.good; g.beginPath(); g.arc(cx, cy, rad, 0, 7); g.fill(); }
        else { g.strokeStyle = isMiss && done ? theme.badInk : theme.rule; g.lineWidth = isMiss && done ? 4 : 2.5; g.beginPath(); g.arc(cx, cy, rad, 0, 7); g.stroke(); } }
      if (done) { const dn = t - p.at - p.dur, k = spring(Math.max(0, dn), 'bouncy'); g.save(); g.translate(0, y0 + h - 40); g.scale(0.6 + 0.4 * k, 0.6 + 0.4 * k); g.globalAlpha *= clamp(dn / 0.1); txt(g, 'NEARLY ALL ' + p.boughtLabel, 0, 0, F.hero(46), theme.badInk); g.restore(); burst(g, 0, y0 + 124, 280, theme.gold, dn - 0.05, 16, 0.5); }
      else txt(g, p.sub, 0, y0 + h - 30, F.mono(15), theme.inkSoft);
    },
  });

  // ---------------------------------------------------------------- house: THE HOUSE · ALWAYS WINS, crossed out
  B.register('house', {
    defaults: { xAt: NOW, w: 760, h: 700, winsAt: NOW }, size: p => [p.w, p.h], anchors: p => ({ sign: [0, -p.h * 0.22, p.w * 0.8, 120], roof: [0, -p.h * 0.1, p.w * 0.8, p.h * 0.5] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 22, { lift });
      g.save(); rr(g, x0, y0, w, h, 22); g.clip(); const bg = g.createLinearGradient(0, y0, 0, y0 + h); bg.addColorStop(0, '#CBE4F2'); bg.addColorStop(1, '#F6E8C0'); g.fillStyle = bg; g.fillRect(x0, y0, w, h); g.fillStyle = '#7FBF8F'; g.fillRect(x0, y0 + h - 120, w, 130); g.restore();
      // building
      clay(g, -200, y0 + 250, 400, 280, 12, '#C9511F', { shadowK: 0.6 }); g.fillStyle = '#8f3510'; g.beginPath(); g.moveTo(-240, y0 + 256); g.lineTo(0, y0 + 110); g.lineTo(240, y0 + 256); g.closePath(); g.fill(); g.strokeStyle = INK; g.lineWidth = 4; g.stroke();
      clay(g, -48, y0 + 380, 96, 150, 10, '#F2B705', { shadowK: 0.4 }); for (const q of [-1, 1]) clay(g, q * 128 - 36, y0 + 320, 72, 72, 8, '#CBE4F2', { shadowK: 0.3 });
      B.shadowed(g, () => rr(g, -190, y0 + 52, 380, 72), theme.navy, 0.4); g.fillStyle = theme.navy; rr(g, -190, y0 + 52, 380, 72, 12); g.fill(); txt(g, 'THE HOUSE', 0, y0 + 90, F.hero(56), theme.paper);
      const wn = t - p.winsAt; if (wn > -0.02) { const k = spring(Math.max(0, wn), 'snappy'); g.save(); g.translate(0, y0 + h - 70 + (1 - k) * 40); g.globalAlpha *= clamp(wn / 0.1); marker(g, -w * 0.42, -44, w * 0.84, 88, theme.gold, clamp(wn / 0.3), 0.5); txt(g, 'ALWAYS WINS', 0, 4, F.hero(72), theme.ink);
        const xn = t - p.xAt; if (xn > 0) { const u = ease.out(clamp(xn / 0.3)); g.strokeStyle = theme.badInk; g.lineWidth = 14; g.lineCap = 'round'; g.beginPath(); g.moveTo(-w * 0.4, 6); g.lineTo(-w * 0.4 + w * 0.8 * u, 6 - 10 * u); g.stroke(); } g.restore(); }
      const xn2 = t - p.xAt; if (xn2 > 0.25) { const k = spring(xn2 - 0.25, 'bouncy'); g.save(); g.translate(0, y0 + h * 0.46); g.rotate(-0.1); g.scale(k, k); g.fillStyle = 'rgba(245,243,238,.95)'; rr(g, -260, -60, 520, 120, 12); g.fill(); g.strokeStyle = theme.goodInk; g.lineWidth = 9; rr(g, -253, -53, 506, 106, 9); g.stroke(); txt(g, 'NOT THIS TIME', 0, 4, F.hero(68), theme.goodInk); g.restore(); }
    },
  });

  // ---------------------------------------------------------------- qticket: a ticket with a big "?"
  B.register('qticket', {
    defaults: { qAt: NOW, tagAt: NOW, tags: ['IN A STORE?', 'IN BULK?', 'HOW?'], w: 760, h: 540, stampAt: NOW, stampText: "CAN'T PROVE IT" }, size: p => [p.w, p.h],
    anchors: p => ({ ticket: [0, -p.h * 0.1, p.w * 0.8, p.h * 0.5], q: [0, -p.h * 0.1, 200, 220] }),
    draw(g, p, env) {
      const { t, lt, theme } = env, w = p.w, h = p.h; const k = spring(lt, 'snappy'); g.save(); g.globalAlpha *= clamp(lt / 0.1); g.translate(0, (1 - k) * 80);
      B.ticket(g, 0, -h * 0.1, 640, 290, -0.04, 1, { sh: 18, edge: theme.gold, edgeW: 6, label: 'THE WINNING TICKET' });
      const qn = t - p.qAt; if (qn > -0.02) { const qk = spring(Math.max(0, qn), 'bouncy'); g.save(); g.translate(120, -h * 0.1); g.scale(0.4 + 0.6 * qk, 0.4 + 0.6 * qk); g.rotate(0.08); g.globalAlpha *= clamp(qn / 0.1); g.fillStyle = theme.paper; g.beginPath(); g.arc(0, 0, 118, 0, 7); g.fill(); g.strokeStyle = theme.badInk; g.lineWidth = 12; g.stroke(); txt(g, '?', 0, 8, F.hero(190), theme.badInk); g.restore(); }
      p.tags.forEach((s, i) => { const tn = t - (p.tagAt + i * 0.32); if (tn < 0) return; const tk = spring(tn, 'bouncy'), x = (i - 1) * 245, y = h * 0.24; g.save(); g.translate(x, y); g.rotate((i - 1) * 0.05); g.scale(0.5 + 0.5 * tk, 0.5 + 0.5 * tk); g.globalAlpha *= clamp(tn / 0.08); paper(g, -112, -34, 224, 68, 12, { lift: 0.3 }); txt(g, s, 0, 3, F.cap(28), theme.ink); g.restore(); });
      const sn = t - p.stampAt; if (sn > 0) { const sc = 1 + 1.1 * (1 - ease.expo(clamp(sn / 0.2))), sf = F.hero(70), sw = p.stampText.length * 40 + 80; g.save(); g.translate(0, h * 0.4); g.rotate(-0.07); g.scale(sc, sc); g.globalAlpha *= clamp(sn / 0.05); g.fillStyle = 'rgba(245,243,238,.95)'; rr(g, -sw / 2, -56, sw, 112, 12); g.fill(); g.strokeStyle = theme.badInk; g.lineWidth = 8; rr(g, -sw / 2 + 6, -50, sw - 12, 100, 9); g.stroke(); txt(g, p.stampText, 0, 4, sf, theme.badInk); g.restore(); burst(g, 0, h * 0.4, sw * 0.5, theme.bad, sn - 0.1, 14, 0.45); }
      g.restore();
    },
  });

  // ---------------------------------------------------------------- oneticket: the friend who buys ONE ticket and prays
  B.register('oneticket', {
    defaults: { xAt: NOW, winsAt: NOW, w: 760, h: 700 }, size: p => [p.w, p.h], anchors: p => ({ sign: [0, -p.h * 0.2, p.w * 0.8, 130], ticket: [0, -p.h * 0.05, p.w * 0.8, p.h * 0.45] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 22, { lift });
      g.save(); rr(g, x0, y0, w, h, 22); g.clip(); const bg = g.createLinearGradient(0, y0, 0, y0 + h); bg.addColorStop(0, '#E6DDF4'); bg.addColorStop(1, '#F6E8C0'); g.fillStyle = bg; g.fillRect(x0, y0, w, h); g.restore();
      txt(g, 'THE FRIEND WHO BUYS', 0, y0 + 62, F.cap(40), theme.ink); txt(g, 'ONE TICKET', 0, y0 + 132, F.hero(92), theme.badInk);
      const wn = t - p.winsAt, k = wn > -0.2 ? ease.out(clamp((wn + 0.2) / 0.5)) : 0;
      g.save(); g.translate(0, y0 + 330); g.rotate(-0.05 + Math.sin(t * 1.3) * 0.015); B.ticket(g, 0, 0, 440, 200, 0, 1, { sh: 16, edge: theme.gold, edgeW: 6, label: 'ONE TICKET' }); g.restore();
      // sparkles = the prayer
      for (let i = 0; i < 10; i++) { const a = k * clamp((wn + 0.2) / 0.4 + i * 0.02); if (a <= 0) continue; const ang = i / 10 * Math.PI * 2 + t * 0.6, r = 190 + 30 * Math.sin(t * 3 + i), x = Math.cos(ang) * r * 1.2, y = y0 + 330 + Math.sin(ang) * r * 0.55; g.save(); g.translate(x, y); g.rotate(ang); g.globalAlpha *= a; g.fillStyle = theme.gold; g.beginPath(); for (let j = 0; j < 8; j++) { const rr2 = j % 2 ? 6 : 16, aa = j / 8 * Math.PI * 2; g.lineTo(Math.cos(aa) * rr2, Math.sin(aa) * rr2); } g.closePath(); g.fill(); g.restore(); }
      if (wn > -0.02) { const kk = spring(Math.max(0, wn), 'snappy'); g.save(); g.translate(0, y0 + h - 100 + (1 - kk) * 40); g.globalAlpha *= clamp(wn / 0.1); marker(g, -w * 0.4, -46, w * 0.8, 92, theme.gold, clamp(wn / 0.3), 0.5); txt(g, 'AND PRAYS', 0, 4, F.hero(76), theme.ink);
        const xn = t - p.xAt; if (xn > 0) { const u = ease.out(clamp(xn / 0.3)); g.strokeStyle = theme.badInk; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); g.moveTo(-w * 0.34, 6); g.lineTo(-w * 0.34 + w * 0.68 * u, 2); g.stroke(); } g.restore(); }
    },
  });
})();
// real month-by-month simulation: $5,000 @ 22.36% APR, min = max($35, 1% of balance + interest) · fixed $250 comparison
window.CM_SIM = {min:[[4950.0, 93.17, 143.17], [4900.5, 92.23, 141.73], [4851.49, 91.31, 140.32], [4802.98, 90.4, 138.91], [4754.95, 89.5, 137.53], [4707.4, 88.6, 136.15], [4660.33, 87.71, 134.79], [4613.72, 86.84, 133.44], [4567.59, 85.97, 132.11], [4521.91, 85.11, 130.79], [4476.69, 84.26, 129.48], [4431.92, 83.42, 128.18], [4387.61, 82.58, 126.9], [4343.73, 81.76, 125.63], [4300.29, 80.94, 124.38], [4257.29, 80.13, 123.13], [4214.72, 79.33, 121.9], [4172.57, 78.53, 120.68], [4130.84, 77.75, 119.47], [4089.53, 76.97, 118.28], [4048.64, 76.2, 117.1], [4008.15, 75.44, 115.93], [3968.07, 74.69, 114.77], [3928.39, 73.94, 113.62], [3889.11, 73.2, 112.48], [3850.22, 72.47, 111.36], [3811.71, 71.74, 110.24], [3773.6, 71.02, 109.14], [3735.86, 70.31, 108.05], [3698.5, 69.61, 106.97], [3661.52, 68.92, 105.9], [3624.9, 68.23, 104.84], [3588.65, 67.54, 103.79], [3552.77, 66.87, 102.76], [3517.24, 66.2, 101.73], [3482.07, 65.54, 100.71], [3447.25, 64.88, 99.7], [3412.77, 64.23, 98.71], [3378.65, 63.59, 97.72], [3344.86, 62.96, 96.74], [3311.41, 62.33, 95.77], [3278.3, 61.7, 94.82], [3245.51, 61.09, 93.87], [3213.06, 60.47, 92.93], [3180.93, 59.87, 92.0], [3149.12, 59.27, 91.08], [3117.63, 58.68, 90.17], [3086.45, 58.09, 89.27], [3055.59, 57.51, 88.38], [3025.03, 56.94, 87.49], [2994.78, 56.37, 86.62], [2964.83, 55.8, 85.75], [2935.18, 55.24, 84.89], [2905.83, 54.69, 84.04], [2876.77, 54.15, 83.2], [2848.01, 53.6, 82.37], [2819.53, 53.07, 81.55], [2791.33, 52.54, 80.73], [2763.42, 52.01, 79.93], [2735.78, 51.49, 79.13], [2708.43, 50.98, 78.33], [2681.34, 50.47, 77.55], [2654.53, 49.96, 76.78], [2627.98, 49.46, 76.01], [2601.7, 48.97, 75.25], [2575.69, 48.48, 74.5], [2549.93, 47.99, 73.75], [2524.43, 47.51, 73.01], [2499.19, 47.04, 72.28], [2474.19, 46.57, 71.56], [2449.45, 46.1, 70.84], [2424.96, 45.64, 70.14], [2400.71, 45.19, 69.43], [2376.7, 44.73, 68.74], [2352.93, 44.29, 68.05], [2329.4, 43.84, 67.37], [2306.11, 43.4, 66.7], [2283.05, 42.97, 66.03], [2260.22, 42.54, 65.37], [2237.62, 42.12, 64.72], [2215.24, 41.69, 64.07], [2193.09, 41.28, 63.43], [2171.16, 40.86, 62.8], [2149.45, 40.46, 62.17], [2127.95, 40.05, 61.55], [2106.67, 39.65, 60.93], [2085.6, 39.25, 60.32], [2064.75, 38.86, 59.72], [2044.1, 38.47, 59.12], [2023.66, 38.09, 58.53], [2003.42, 37.71, 57.94], [1983.39, 37.33, 57.36], [1963.56, 36.96, 56.79], [1943.92, 36.59, 56.22], [1924.48, 36.22, 55.66], [1905.24, 35.86, 55.1], [1886.18, 35.5, 54.55], [1867.32, 35.15, 54.01], [1848.65, 34.79, 53.47], [1830.16, 34.45, 52.93], [1811.86, 34.1, 52.4], [1793.74, 33.76, 51.88], [1775.8, 33.42, 51.36], [1758.05, 33.09, 50.85], [1740.47, 32.76, 50.34], [1723.06, 32.43, 49.84], [1705.83, 32.11, 49.34], [1688.77, 31.79, 48.84], [1671.88, 31.47, 48.36], [1655.17, 31.15, 47.87], [1638.61, 30.84, 47.39], [1622.23, 30.53, 46.92], [1606.01, 30.23, 46.45], [1589.95, 29.93, 45.99], [1574.05, 29.63, 45.53], [1558.31, 29.33, 45.07], [1542.72, 29.04, 44.62], [1527.3, 28.75, 44.17], [1512.02, 28.46, 43.73], [1496.9, 28.17, 43.29], [1481.93, 27.89, 42.86], [1467.11, 27.61, 42.43], [1452.44, 27.34, 42.01], [1437.92, 27.06, 41.59], [1423.54, 26.79, 41.17], [1409.3, 26.53, 40.76], [1395.21, 26.26, 40.35], [1381.26, 26.0, 39.95], [1367.45, 25.74, 39.55], [1353.77, 25.48, 39.15], [1340.23, 25.23, 38.76], [1326.83, 24.97, 38.38], [1313.56, 24.72, 37.99], [1300.43, 24.48, 37.61], [1287.42, 24.23, 37.24], [1274.55, 23.99, 36.86], [1261.8, 23.75, 36.49], [1249.19, 23.51, 36.13], [1236.69, 23.28, 35.77], [1224.33, 23.04, 35.41], [1212.08, 22.81, 35.06], [1199.67, 22.59, 35.0], [1187.02, 22.35, 35.0], [1174.14, 22.12, 35.0], [1161.02, 21.88, 35.0], [1147.65, 21.63, 35.0], [1134.04, 21.38, 35.0], [1120.17, 21.13, 35.0], [1106.04, 20.87, 35.0], [1091.65, 20.61, 35.0], [1076.99, 20.34, 35.0], [1062.06, 20.07, 35.0], [1046.85, 19.79, 35.0], [1031.35, 19.51, 35.0], [1015.57, 19.22, 35.0], [999.5, 18.92, 35.0], [983.12, 18.62, 35.0], [966.44, 18.32, 35.0], [949.45, 18.01, 35.0], [932.14, 17.69, 35.0], [914.51, 17.37, 35.0], [896.55, 17.04, 35.0], [878.25, 16.71, 35.0], [859.62, 16.36, 35.0], [840.63, 16.02, 35.0], [821.3, 15.66, 35.0], [801.6, 15.3, 35.0], [781.54, 14.94, 35.0], [761.1, 14.56, 35.0], [740.28, 14.18, 35.0], [719.08, 13.79, 35.0], [697.48, 13.4, 35.0], [675.47, 13.0, 35.0], [653.06, 12.59, 35.0], [630.23, 12.17, 35.0], [606.97, 11.74, 35.0], [583.28, 11.31, 35.0], [559.15, 10.87, 35.0], [534.57, 10.42, 35.0], [509.53, 9.96, 35.0], [484.02, 9.49, 35.0], [458.04, 9.02, 35.0], [431.58, 8.53, 35.0], [404.62, 8.04, 35.0], [377.16, 7.54, 35.0], [349.18, 7.03, 35.0], [320.69, 6.51, 35.0], [291.67, 5.98, 35.0], [262.1, 5.43, 35.0], [231.99, 4.88, 35.0], [201.31, 4.32, 35.0], [170.06, 3.75, 35.0], [138.23, 3.17, 35.0], [105.8, 2.58, 35.0], [72.77, 1.97, 35.0], [39.13, 1.36, 35.0], [4.86, 0.73, 35.0], [0.0, 0.09, 4.95]],fix:[4843.17, 4683.41, 4520.68, 4354.91, 4186.06, 4014.06, 3838.86, 3660.39, 3478.59, 3293.41, 3104.78, 2912.63, 2716.9, 2517.53, 2314.44, 2107.56, 1896.83, 1682.18, 1463.52, 1240.79, 1013.91, 782.8, 547.39, 307.59, 63.32, 0.0]};
// ---- custom recipes for the credit-card-minimum cuts (registered with BM2.register; same v2 look: paper, clay, no glow) ----
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, countAt, wobble, hit } = B;
  const tone = (n, p) => B.tone(n, p);
  const M = document.createElement('canvas').getContext('2d'); const measure = (s, f) => { M.font = f; return M.measureText(s).width; };
  const NOW = 1e9; const at0 = v => (v == null ? NOW : v);

  // plastic card: navy credit card (no bank names, no logos)
  B.register('plastic', {
    defaults: { w: 520, h: 320 }, size: p => [p.w, p.h],
    draw(g, p, env) { const w = p.w, h = p.h, th = env.theme;
      B.shadowed(g, () => rr(g, -w / 2, -h / 2, w, h, 30), th.navy, env.lift);
      g.save(); rr(g, -w / 2, -h / 2, w, h, 30); g.clip();
      const lg = g.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2); lg.addColorStop(0, '#4a64a0'); lg.addColorStop(0.55, '#2c3e66'); lg.addColorStop(1, '#1a2744'); g.fillStyle = lg; g.fillRect(-w / 2, -h / 2, w, h);
      g.strokeStyle = 'rgba(255,255,255,.07)'; g.lineWidth = 34; for (let i = 0; i < 3; i++) { g.beginPath(); g.arc(w * 0.55, h * 0.9, 150 + i * 70, 3.3, 5.0); g.stroke(); }
      g.restore();
      clay(g, -w / 2 + 52, -h / 2 + 96, 92, 68, 12, '#F2B705', { shadowK: 0.4 }); g.strokeStyle = 'rgba(90,63,8,.55)'; g.lineWidth = 3; g.beginPath(); g.moveTo(-w / 2 + 52, -h / 2 + 130); g.lineTo(-w / 2 + 144, -h / 2 + 130); g.moveTo(-w / 2 + 98, -h / 2 + 96); g.lineTo(-w / 2 + 98, -h / 2 + 164); g.stroke();
      txt(g, 'CREDIT CARD', -w / 2 + 52, -h / 2 + 52, F.cap(28), 'rgba(245,243,238,.85)', 'left');
      txt(g, '4821  0000  0000  0000'.replace(/0/g, '•'), -w / 2 + 52, h / 2 - 96, F.monoX(34), th.paper, 'left');
      txt(g, 'YOU', -w / 2 + 52, h / 2 - 48, F.mono(24), 'rgba(245,243,238,.7)', 'left');
      g.strokeStyle = 'rgba(255,255,255,.5)'; g.lineWidth = 1.5; rr(g, -w / 2 + 1, -h / 2 + 1, w - 2, h - 2, 30); g.stroke(); },
  });

  // stmt: the monthly statement with the MINIMUM PAYMENT DUE box and the fine print
  B.register('stmt', {
    defaults: { w: 640, h: 740, balAt: NOW, aprAt: NOW, dueAt: NOW, fineAt: NOW, fine1At: NOW, fine2At: NOW, due: '$143.17', bal: '$5,000.00', apr: '22.36%' },
    size: p => [p.w, p.h],
    anchors: p => { const t = -p.h / 2; return { head: [0, t + 55, p.w, 110], bal: [0, t + 170, p.w * 0.94, 64], apr: [0, t + 245, p.w * 0.94, 64], due: [0, t + 420, p.w * 0.92, 230], fine: [0, t + 630, p.w * 0.92, 150] }; },
    draw(g, p, env) { const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2;
      paper(g, x0, y0, w, h, 20, { lift });
      g.save(); rr(g, x0, y0, w, h, 20); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 110); const hg = g.createLinearGradient(0, y0, 0, y0 + 110); hg.addColorStop(0, 'rgba(255,255,255,.12)'); hg.addColorStop(1, 'rgba(0,0,0,.14)'); g.fillStyle = hg; g.fillRect(x0, y0, w, 110); g.restore();
      txt(g, 'CREDIT CARD STATEMENT', x0 + 36, y0 + 55, F.hero(42), theme.paper, 'left');
      const row = (lab, val, y, at, tn, id) => { const on = t - at, k = on > 0 ? spring(on, 'snappy') : 0, isHot = env.hot === id, s = 1 + 0.12 * k * (1 - clamp(on - 0.2)) * 0 + (isHot ? 0.07 * env.hotK : 0);
        txt(g, lab, x0 + 40, y, F.mono(26), theme.inkSoft, 'left'); const vf = F.monoX(40), shown = on > 0 ? val : '• • • • •', vw = measure(shown, vf);
        g.save(); g.translate(x0 + w - 40, y); g.scale(s, s); if (on > 0) marker(g, -vw - 10, -28, vw + 20, 56, tone(tn, true), clamp(on / 0.3), 0.24); txt(g, shown, 0, 2, vf, on > 0 ? tone(tn, true) : theme.rule, 'right'); g.restore(); };
      row('NEW BALANCE', p.bal, y0 + 170, p.balAt, 'ink', 'bal'); row('APR', p.apr, y0 + 245, p.aprAt, 'bad', 'apr');
      g.strokeStyle = theme.rule; g.lineWidth = 3; g.setLineDash([10, 9]); g.beginPath(); g.moveTo(x0 + 36, y0 + 298); g.lineTo(x0 + w - 36, y0 + 298); g.stroke(); g.setLineDash([]);
      // minimum payment due box
      const bw = w * 0.92, bh = 220, by = y0 + 420, don = t - p.dueAt, dk = don > 0 ? spring(don, 'snappy') : 0, hotS = env.hot === 'due' ? 0.04 * env.hotK : 0;
      g.save(); g.translate(0, by); g.scale(1 + hotS, 1 + hotS); g.fillStyle = rgba(theme.bad, 0.07 + 0.08 * clamp(don / 0.3)); rr(g, -bw / 2, -bh / 2, bw, bh, 14); g.fill(); g.strokeStyle = tone('bad', true); g.lineWidth = 6; rr(g, -bw / 2, -bh / 2, bw, bh, 14); g.stroke();
      txt(g, 'MINIMUM PAYMENT DUE', 0, -bh / 2 + 44, F.cap(30), theme.ink); const vf = F.hero(120), vw = measure(p.due, vf); g.save(); g.translate(0, 18); g.scale(1 + 0.12 * dk * (1 - clamp(don - 0.25)), 1 + 0.12 * dk * (1 - clamp(don - 0.25))); if (don > 0) marker(g, -vw / 2 - 12, -62, vw + 24, 124, tone('bad', true), clamp(don / 0.3), 0.22); txt(g, p.due, 0, 4, vf, tone('bad', true)); g.restore();
      txt(g, 'MONTH 1 · ' + p.balLabel, 0, bh / 2 - 26, F.mono(20), theme.inkSoft); g.restore();
      // fine print
      const fw = w * 0.92, fh = 150, fy = y0 + 630, fon = t - p.fineAt, fk = fon > 0 ? clamp(fon / 0.25) : 0;
      g.save(); g.translate(0, fy); g.fillStyle = rgba(theme.accent === '#FFD60A' ? '#FFD60A' : theme.accent, 0.16 * fk); rr(g, -fw / 2, -fh / 2, fw, fh, 10); g.fill(); g.strokeStyle = fk > 0 ? tone('accent', true) : theme.inkSoft; g.lineWidth = fk > 0 ? 4 : 2.5; g.setLineDash(fk > 0 ? [] : [8, 7]); rr(g, -fw / 2, -fh / 2, fw, fh, 10); g.stroke(); g.setLineDash([]);
      txt(g, 'THE FINE PRINT', -fw / 2 + 20, -fh / 2 + 20, F.mono(16), theme.inkSoft, 'left');
      const L = [['MINIMUM PAYMENT = 1% OF BALANCE', p.fine1At, 'accent', -20], ["+ THAT MONTH'S INTEREST", p.fine2At, 'bad', 14], ['(FLOOR: $35)', NOW, 'ink', 46]];
      L.forEach(([s, at, tn, y]) => { const on = t - at, f = F.monoX(22), tw = measure(s, f); if (on > 0) marker(g, -fw / 2 + 16, y - 15, tw + 20, 30, tone(tn, true), clamp(on / 0.3), 0.3); txt(g, s, -fw / 2 + 26, y, f, on > 0 ? theme.ink : theme.inkSoft, 'left'); });
      g.restore(); },
  });
  B.elements.stmt.defaults.balLabel = '$5,000 AT 22.36%';

  // paybar: the payment bar that splits into a big red INTEREST part and a green DEBT part (true proportions)
  B.register('paybar', {
    defaults: { w: 880, h: 140, total: 143.17, intr: 93.17, debt: 50, fillAt: NOW, splitAt: NOW, gap: 52, label: 'YOUR PAYMENT' },
    size: p => [p.w + 120, 560],
    anchors: p => { const wi = p.w * p.intr / p.total, wd = p.w * p.debt / p.total, g = p.gap; return { total: [0, -190, p.w * 0.8, 260], int: [-p.w / 2 + wi / 2 - g / 2, 120, wi + 80, 330], debt: [p.w / 2 - wd / 2 + g / 2, 110, wd + 120, 360], bar: [0, 60, p.w + 100, 400] }; },
    draw(g, p, env) { const { t, theme } = env, w = p.w, h = p.h, wi = w * p.intr / p.total, wd = w - wi, fon = t - p.fillAt, son = t - p.splitAt, fk = fon > 0 ? ease.out(lin(fon, 0, 0.8)) : 0, sk = son > 0 ? spring(son, { f: 2.2, z: 0.45 }) : 0, gap = p.gap * sk;
      txt(g, p.label, 0, -300, F.cap(32), rgba(theme.paper, 0.8));
      const tv = { font: F.hero(124), size: 124, color: theme.paper, prefix: '$', decimals: 2 }; roll(g, p.total, 0, -190, tv);
      const x0 = -w / 2, xi0 = x0 - gap / 2, xd0 = x0 + wi + gap / 2, by = -h / 2 + 60;
      // base bar (neutral clay) then the red fill sweeps over the interest share
      if (son <= 0) { clay(g, x0, by, w, h, 26, '#8190AD', { lift: 0.2 }); if (fk > 0) { g.save(); rr(g, x0, by, w, h, 26); g.clip(); clay(g, x0 - 40, by, 40 + wi * fk, h, 26, theme.bad, { shadowK: 0.3 }); g.restore(); } }
      else { clay(g, xi0, by, wi, h, 26, theme.bad, { shadowK: 0.7 });
        const lift = 44 * sk + 6 * wobble(son, 5, 6), sc = 1 + 0.07 * sk; g.save(); g.translate(xd0 + wd / 2, by + h / 2 - lift); g.scale(sc, sc); clay(g, -wd / 2, -h / 2, wd, h, 26, B.mix('#8190AD', theme.good, clamp(son / 0.2)), { lift: 0.5, shadowK: 0.8 }); g.restore(); }
      if (fon > 0) { const ix = (son > 0 ? xi0 : x0) + wi / 2, iv = countAt(fon, 0.8, 0, p.intr), isp = fon < 0.8 ? p.intr / 0.8 : 0;
        txt(g, 'INTEREST', ix, by + h + 56, F.cap(32), tone('bad', false)); roll(g, iv, ix, by + h + 132, { font: F.hero(96), size: 96, color: tone('bad', false), prefix: '$', decimals: 2, speed: isp }); burst(g, ix, by + h + 132, 110, tone('bad', false), fon - 0.8, 12, 0.45); }
      if (son > 0) { const dx = xd0 + wd / 2, dv = countAt(son, 0.6, 0, p.debt); g.save(); g.globalAlpha *= clamp(son / 0.12);
        txt(g, 'DEBT DROPS', dx, by + h + 56 - 44 * sk * 0, F.cap(32), tone('good', false)); roll(g, dv, dx, by + h + 132, { font: F.hero(96), size: 96, color: tone('good', false), prefix: '−$', decimals: 2, speed: son < 0.6 ? p.debt / 0.6 : 0 }); g.restore(); burst(g, dx, by + h / 2 - 40, 140, tone('good', false), son - 0.05, 16, 0.55); } },
  });

  // cal: a wall calendar whose pages flip fast, then the balance still owed
  B.register('cal', {
    defaults: { w: 620, h: 780, from: 2026, to: 2031, flipAt: NOW, per: 0.2, owedAt: NOW, owed: 2736, start: 5000, dur: 0.95 }, ownEnter: false,
    size: p => [p.w, p.h],
    anchors: p => ({ page: [0, -p.h / 2 + 250, p.w, 500], owed: [0, p.h / 2 - 140, p.w, 230] }),
    draw(g, p, env) { const { t, theme } = env, w = p.w, ph = 500, x0 = -w / 2, y0 = -p.h / 2, N = p.to - p.from, f = (t - p.flipAt) / p.per, idx = f < 0 ? 0 : Math.min(Math.floor(f), N), u = f < 0 || idx >= N ? 0 : f - idx;
      const page = (yr, n) => { paper(g, x0, y0, w, ph, 18, { lift: env.lift }); g.save(); rr(g, x0, y0, w, ph, 18); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 96); g.restore();
        for (let i = 0; i < 2; i++) { g.fillStyle = '#0B0F14'; g.beginPath(); g.arc(-110 + i * 220, y0 + 22, 11, 0, 7); g.fill(); }
        txt(g, (n ? 'YEAR ' + n : 'TODAY'), x0 + 34, y0 + 58, F.monoX(34), theme.paper, 'left'); txt(g, String(yr), 0, y0 + 270, F.hero(260), theme.ink);
        g.fillStyle = theme.rule; for (let r = 0; r < 3; r++) for (let c = 0; c < 10; c++) { g.beginPath(); g.arc(x0 + 70 + c * ((w - 140) / 9), y0 + 410 + r * 28, 5, 0, 7); g.fill(); } };
      const yr0 = p.from + idx; if (idx < N && u > 0) { page(yr0 + 1, idx + 1); g.save(); g.translate(0, y0); const c = Math.cos(u * Math.PI / 2); g.scale(1, Math.max(0.001, c)); g.translate(0, -y0); g.rotate(-0.015 * u); page(yr0, idx); g.fillStyle = 'rgba(0,0,0,' + (0.35 * u) + ')'; rr(g, x0, y0, w, ph, 18); g.fill(); g.restore(); }
      else { const lk = idx >= N ? spring(t - p.flipAt - N * p.per, { f: 3, z: 0.4 }) : 1; g.save(); g.translate(0, (1 - lk) * -10); page(yr0, idx); g.restore(); }
      // owed panel
      const oy = p.h / 2 - 140, oh = 210, on = t - p.owedAt, k = on > 0 ? spring(on, 'snappy') : 0; paper(g, x0, oy - oh / 2, w, oh, 18, { fill: theme.navy, lift: env.lift });
      txt(g, 'STILL OWED', 0, oy - 62, F.cap(34), rgba(theme.paper, 0.85)); const v = on > 0 ? countAt(on, p.dur, p.start, p.owed) : p.start, land = on - p.dur, s = 1 + (land > 0 ? 0.1 * (1 - spring(land, { f: 2.4, z: 0.42 })) : 0) + (env.hot === 'owed' ? 0.03 * env.hotK : 0);
      g.save(); g.translate(0, oy + 22); g.scale(s, s); roll(g, v, 0, 0, { font: F.hero(124), size: 124, color: land > 0 ? theme.bad : theme.paper, prefix: '$', decimals: 0, speed: on > 0 && land < 0 ? Math.abs(p.start - p.owed) / p.dur : 0 }); g.restore(); burst(g, 0, oy + 22, 190, theme.bad, land, 18, 0.55); },
  });

  // track: a 2026-2043 timeline strip that fills to the payoff, plus a ghost run for the fixed payment
  B.register('track', {
    defaults: { w: 940, years: 17, y0: 2026, months: 198, fillAt: NOW, fillDur: 1.2, ghostAt: NOW, ghostDur: 1.0, ghostMonths: 26, ghostLabel: 'FIXED $250 / MONTH → 26 MONTHS', tagAt: NOW, tag: 'SAME MATH, DIFFERENT PAYMENT', label: 'ONLY PAYING THE MINIMUM', big: 16.5 },
    size: p => [p.w + 100, 720],
    anchors: p => ({ years: [0, -190, p.w * 0.85, 250], strip: [0, 40, p.w + 60, 150], ghost: [0, 195, p.w + 40, 130], end: [p.w * 0.43, 40, 220, 160], tag: [0, 300, p.w, 90] }),
    draw(g, p, env) { const { t, theme } = env, w = p.w, span = p.years * 12, x0 = -w / 2, sy = 40, sh = 70, fon = t - p.fillAt, fp = fon > 0 ? ease.out(lin(fon, 0, p.fillDur)) : 0;
      txt(g, p.label, 0, -355, F.cap(32), rgba(theme.paper, 0.8));
      const v = p.big * fp; let fs = 210, cf = F.hero(fs); g.font = cf; let cw = B.rollWidth(g, p.big, { font: cf, decimals: 1 }).w + g.measureText(' YEARS').width; if (cw > w * 0.86) { fs = Math.floor(fs * w * 0.86 / cw); cf = F.hero(fs); g.font = cf; cw = B.rollWidth(g, p.big, { font: cf, decimals: 1 }).w + g.measureText(' YEARS').width; } roll(g, v, -cw / 2, -200, { font: cf, size: fs, color: tone('bad', false), decimals: 1, suffix: ' YEARS', align: 'left', speed: fp > 0 && fp < 0.98 ? p.big / p.fillDur : 0 });
      const lp = fon - p.fillDur; burst(g, 0, -200, 260, tone('bad', false), lp, 18, 0.55);
      g.fillStyle = rgba(theme.paper, 0.14); rr(g, x0, sy, w, sh, 20); g.fill();
      const fw = w * p.months / span * fp; if (fw > 4) { g.save(); rr(g, x0, sy, w, sh, 20); g.clip(); clay(g, x0 - 40, sy, 40 + fw, sh, 20, theme.bad, { shadowK: 0.3 }); g.restore(); const hx = x0 + fw; g.fillStyle = theme.paper; g.beginPath(); g.arc(hx, sy + sh / 2, 17, 0, 7); g.fill(); }
      for (let i = 0; i <= p.years; i++) { const x = x0 + w * i / p.years, big = i === 0 || i === p.years || [4, 9, 14].includes(i); g.strokeStyle = rgba(theme.paper, big ? 0.7 : 0.3); g.lineWidth = big ? 4 : 2.5; g.beginPath(); g.moveTo(x, sy + sh + 8); g.lineTo(x, sy + sh + (big ? 26 : 18)); g.stroke(); if (big) txt(g, String(p.y0 + i), x, sy + sh + 52, F.monoX(26), rgba(theme.paper, 0.9)); }
      const gon = t - p.ghostAt; if (gon > 0) { const gp = ease.out(lin(gon, 0, p.ghostDur)), gw = w * p.ghostMonths / span, gy = 205, gh = 36; g.save(); g.globalAlpha *= clamp(gon / 0.1); g.fillStyle = rgba(theme.paper, 0.1); rr(g, x0, gy, w, gh, 14); g.fill(); g.restore();
        clay(g, x0, gy, Math.max(8, gw * gp), gh, 14, theme.good, { shadowK: 0.4 }); const hx = x0 + gw * gp; g.fillStyle = theme.paper; g.beginPath(); g.arc(hx, gy + gh / 2, 15, 0, 7); g.fill();
        const ld = gon - p.ghostDur; g.save(); g.globalAlpha *= clamp(gon / 0.25); txt(g, p.ghostLabel, x0, gy + 78, F.cap(31), tone('good', false), 'left'); g.restore(); burst(g, x0 + gw, gy + gh / 2, 70, tone('good', false), ld, 12, 0.45);
        if (ld > 0) { const k = spring(ld, 'bouncy'); g.save(); g.translate(x0 + gw + 34, gy + gh / 2 + 2); g.scale(k, k); txt(g, '✓ DONE', 0, 0, F.cap(30), tone('good', false), 'left'); g.restore(); } }
      const ton = t - p.tagAt; if (ton > 0) { const k = spring(ton, 'snappy'), tw = measure(p.tag, F.cap(36)) + 60; g.save(); g.translate(0, 372 + (1 - k) * 30); g.globalAlpha *= clamp(ton / 0.12); paper(g, -tw / 2, -34, tw, 68, 12, { lift: env.lift }); txt(g, p.tag, 0, 2, F.cap(36), theme.ink); g.restore(); } },
  });

  // bigstamp: multi-line stamp (slams in)
  B.register('bigstamp', {
    defaults: { lines: ['STAMP'], tone: 'bad', size: 96, fill: 'paper' }, enter: 'slam',
    size: p => [Math.max(...p.lines.map(l => measure(l, F.hero(p.size)))) + p.size * 0.9, p.lines.length * p.size * 1.08 + p.size * 0.6],
    draw(g, p, { lt, lift }) { const [w, h] = this.size(p), col = tone(p.tone, true);
      paper(g, -w / 2, -h / 2, w, h, p.size * 0.14, { fill: tone(p.fill), lift }); g.strokeStyle = col; g.lineWidth = p.size * 0.07; rr(g, -w / 2 + 12, -h / 2 + 12, w - 24, h - 24, p.size * 0.09); g.stroke();
      p.lines.forEach((l, i) => txt(g, l, 0, (i - (p.lines.length - 1) / 2) * p.size * 1.08 + p.size * 0.04, F.hero(p.size), col)); burst(g, 0, 0, w * 0.62, tone(p.tone, false), lt - 0.16, 16, 0.45); },
  });

  // plane: paper plane flying across the screen (screen layer, absolute coordinates)
  B.register('plane', {
    defaults: { from: [120, 1050], to: [1180, 300], dur: 1.5, s: 1 }, ownEnter: true, size: () => [10, 10],
    draw(g, p, env) { const lt = env.lt, u = clamp(lt / p.dur), e = ease.inOut(u), [x0, y0] = p.from, [x1, y1] = p.to, cx = (x0 + x1) / 2 - 80, cy = Math.max(y0, y1) + 160;
      const P = k => { const a = (1 - k) * (1 - k), b = 2 * (1 - k) * k, c = k * k; return [a * x0 + b * cx + c * x1, a * y0 + b * cy + c * y1]; };
      g.strokeStyle = rgba(env.theme.paper, 0.5); g.lineWidth = 5; g.setLineDash([4, 18]); g.lineCap = 'round'; g.beginPath(); for (let i = 0; i <= 24; i++) { const [px, py] = P(e * i / 24); i ? g.lineTo(px, py) : g.moveTo(px, py); } g.stroke(); g.setLineDash([]);
      const [px, py] = P(e), [qx, qy] = P(Math.min(1, e + 0.02)), a = Math.atan2(qy - py, qx - px), s = p.s * (1 + 0.35 * Math.sin(Math.PI * u) - 0.25 * u);
      g.save(); g.translate(px, py); g.rotate(a); g.scale(s, s); const sh = () => { g.beginPath(); g.moveTo(70, 0); g.lineTo(-60, -44); g.lineTo(-34, 0); g.lineTo(-60, 44); g.closePath(); };
      B.shadowed(g, sh, '#F5F3EE', 0.5); g.fillStyle = '#F5F3EE'; sh(); g.fill(); g.fillStyle = '#D8D3C7'; g.beginPath(); g.moveTo(70, 0); g.lineTo(-34, 0); g.lineTo(-60, 44); g.closePath(); g.fill(); g.strokeStyle = 'rgba(11,15,20,.35)'; g.lineWidth = 2; g.beginPath(); g.moveTo(70, 0); g.lineTo(-34, 0); g.stroke(); g.restore(); },
  });

  // bookmark: save icon that fills gold when pressed (screen layer)
  B.register('bookmark', {
    defaults: { press: 0.6, label: 'SAVE' }, size: () => [200, 280],
    draw(g, p, env) { const lt = env.lt, on = lt - p.press, done = on > 0, k = done ? spring(on, 'bouncy') : 0, s = 1 + 0.18 * k * (1 - clamp(on - 0.3)) - 0.08 * hit(lt - p.press, 14) * (lt >= p.press ? 1 : 0);
      g.scale(s, s); const path = () => { g.beginPath(); g.moveTo(-70, -110); g.lineTo(70, -110); g.lineTo(70, 100); g.lineTo(0, 50); g.lineTo(-70, 100); g.closePath(); };
      B.shadowed(g, path, done ? '#F2B705' : '#F5F3EE', 0.5); g.fillStyle = done ? '#F2B705' : '#F5F3EE'; path(); g.fill(); g.save(); path(); g.clip(); const lg = g.createLinearGradient(-70, -110, 70, 100); lg.addColorStop(0, 'rgba(255,255,255,.3)'); lg.addColorStop(1, 'rgba(0,0,0,.14)'); g.fillStyle = lg; g.fillRect(-70, -110, 140, 220); g.restore();
      if (done) { g.strokeStyle = '#0B0F14'; g.lineWidth = 12; g.lineCap = 'round'; g.lineJoin = 'round'; const q = ease.out(lin(on, 0.05, 0.3)); g.beginPath(); g.moveTo(-28, -30); g.lineTo(-6 + 0 * q, -4); g.lineTo(-6 + 40 * q, -4 - 44 * q); g.stroke(); burst(g, 0, -10, 110, '#F2B705', on - 0.05, 14, 0.5); }
      txt(g, p.label, 0, 150, F.cap(36), env.theme.paper); },
  });
})();
// ===== Card minimum v3 (CRIME-SHOW / What If pass) — recurring YOU + live month strip + shrinking bars + flying calendar pages + the kid. =====
// you        : YOU (orange hoodie player from the What If cast) holding the credit card. moods [{t,m}], age 0..1 (grey temples, tired eyes), tag.
// monthstrip : LIVE number from frame 0 (screen layer): MONTH n · OWE $x + the payment bar split (red INTEREST vs thin green YOUR DEBT) from the real simulation;
//              clock knots [[t, month]]; optional fixed-$250 ghost row from fixedAt.
// shrink     : payment bars for months 1..60, each split red interest / green debt (true values) — the minimum shrinks as the balance does.
// pagesfly   : calendar pages flying off, 2026 -> 2043, with a 16.5 YEARS counter.   kid : the baby born that day grows to 16 and drives.   stuff : $5,000 of shopping bags.
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, countAt, hash, hit, wobble } = B;
  const INK = '#0B0F14', NOW = 1e9;
  const SIM = window.CM_SIM;
  const moodAt = (K, t, d = 'neutral') => { let c = { m: d, t: -1e9 }; for (const k of K || []) if (t >= k.t && k.t >= c.t) c = k; return c; };
  const money = (v, d = 0) => '$' + v.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });

  // ---------------------------------------------------------------- YOU holding the card
  B.register('you', {
    defaults: { w: 480, h: 560, moods: [], age: 0, tag: '', label: 'YOU', sub: 'ILLUSTRATION · HOLDING THE CARD', tilt: -0.02, bg: 0, cardAt: -1e9 }, ownEnter: true,
    size: p => [p.w, p.h], anchors: p => ({ face: [0, -p.h * 0.2, p.w * 0.6, p.h * 0.4], card: [p.w * 0.16, p.h * 0.08, p.w * 0.5, p.h * 0.3], all: [0, 0, p.w, p.h] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, k = spring(lt, 'heavy'), mk = moodAt(p.moods, t, 'neutral');
      g.save(); g.translate(0, (1 - k) * 230); g.rotate(p.tilt + (1 - k) * -0.1); g.globalAlpha *= clamp(lt / 0.1);
      paper(g, x0, y0, w, h, 18, { lift });
      const px = x0 + 20, py = y0 + 20, pw = w - 40, ph = h - 40 - 112;
      g.save(); rr(g, px, py, pw, ph, 10); g.clip(); const bgs = [['#F3E3C3', '#F7C9A0'], ['#D8E8F2', '#BCD7EA'], ['#E8DDF3', '#F3D5E3']][p.bg % 3]; const bg = g.createLinearGradient(0, py, 0, py + ph); bg.addColorStop(0, bgs[0]); bg.addColorStop(1, bgs[1]); g.fillStyle = bg; g.fillRect(px, py, pw, ph);
      g.fillStyle = 'rgba(0,0,0,.08)'; g.fillRect(px, py + ph - 50, pw, 54);
      const cx = px + pw / 2 - 20, by = py + ph - 26, s = pw / 480 * 1.22;
      g.save(); g.translate(cx, by - 135 * s * 0); g.scale(s, s); g.translate(0, 0); const bob = 0;
      // BMCHAR draws with torso bottom at y=0 (figure grows up)
      window.BMCHAR(g, theme, 'you', mk.m, t, { look: mk.look });
      if (p.age > 0) { const a = Math.min(1, p.age); g.fillStyle = rgba('#D9D9DE', 0.9 * a); for (const q of [-1, 1]) { g.beginPath(); g.ellipse(q * 60, -218, 9 + 5 * a, 20 + 8 * a, q * 0.3, 0, 7); g.fill(); } g.strokeStyle = 'rgba(70,40,20,' + 0.55 * a + ')'; g.lineWidth = 3.5; g.lineCap = 'round'; for (const q of [-1, 1]) { g.beginPath(); g.arc(q * 25, -172, 15, 0.25 * Math.PI, 0.75 * Math.PI); g.stroke(); } }
      g.restore();
      // the credit card he holds up (navy, no bank name)
      const cardIn = t - p.cardAt, ck = cardIn < -1e8 ? 1 : spring(Math.max(0, cardIn), 'bouncy');
      g.save(); g.translate(cx + 86 * s, by - 74 * s + (1 - ck) * 60); g.rotate(-0.18 + Math.sin(t * 1.4) * 0.025); g.scale(0.5 + 0.5 * ck, 0.5 + 0.5 * ck);
      const cw = 190 * s, ch = 120 * s; B.shadowed(g, () => rr(g, -cw / 2, -ch / 2, cw, ch, 14 * s), theme.navy, 0.4); const lg = g.createLinearGradient(-cw / 2, -ch / 2, cw / 2, ch / 2); lg.addColorStop(0, '#4a64a0'); lg.addColorStop(1, '#1a2744'); g.fillStyle = lg; rr(g, -cw / 2, -ch / 2, cw, ch, 14 * s); g.fill();
      clay(g, -cw / 2 + 18 * s, -ch / 2 + 30 * s, 34 * s, 26 * s, 5, '#F2B705', { shadowK: 0.3 }); txt(g, '•••• •••• ••••', -cw / 2 + 18 * s, ch / 2 - 30 * s, F.monoX(15 * s), theme.paper, 'left'); txt(g, 'YOU', cw / 2 - 18 * s, ch / 2 - 14 * s, F.mono(12 * s), rgba(theme.paper, 0.7), 'right');
      g.fillStyle = '#F1C29A'; g.strokeStyle = INK; g.lineWidth = 3; g.beginPath(); g.arc(-cw / 2 + 4 * s, ch / 2 - 6 * s, 20 * s, 0, 7); g.fill(); g.stroke(); g.restore();
      g.restore();
      g.strokeStyle = 'rgba(11,15,20,.3)'; g.lineWidth = 2; rr(g, px, py, pw, ph, 10); g.stroke();
      const ty = py + ph + 12; g.fillStyle = theme.navy; rr(g, px, ty, pw, 90, 10); g.fill(); txt(g, p.label, px + pw / 2, ty + 36, F.hero(p.labelSize || 46), theme.paper); txt(g, p.sub, px + pw / 2, ty + 70, F.mono(13), theme.gold);
      if (p.tag) { g.save(); g.translate(-w * 0.26, y0 + 6); g.rotate(-0.1); g.fillStyle = '#C9511F'; g.fillRect(-70, -15, 140, 30); txt(g, p.tag, 0, 1, F.monoX(16), theme.paper); g.restore(); }
      g.restore();
    },
  });

  // ---------------------------------------------------------------- live month strip (screen layer)
  const monthAt = (clock, t) => { let m = clock[0][1]; for (let i = 0; i < clock.length - 1; i++) { const [t0, m0] = clock[i], [t1, m1] = clock[i + 1]; if (t >= t0 && t < t1) { const u = ease.inOut(clamp((t - t0) / Math.max(1e-6, t1 - t0))); return lerp(m0, m1, u); } if (t >= t1) m = m1; } return m; };
  B.register('monthstrip', {
    defaults: { clock: [[0, 1]], fixedAt: NOW, fixedDur: 2.2, x: 360, y: 296, w: 630 }, ownEnter: true, size: () => [10, 10],
    draw(g, p, env) {
      const { t, theme } = env, mo = Math.max(0, Math.min(198, Math.round(monthAt(p.clock, t)))), row = SIM.min[Math.max(1, mo) - 1], bal = mo === 0 ? 5000 : SIM.min[mo - 1][0], intr = row[1], pay = row[2], debt = pay - intr, w = p.w, fx = t >= p.fixedAt;
      const h = fx ? 148 : 96; g.save(); g.translate(p.x, p.y); g.fillStyle = 'rgba(11,15,20,.84)'; rr(g, 0, 0, w, h, 12); g.fill();
      txt(g, 'MONTHS PAID', 18, 22, F.mono(15), rgba(theme.gold, 0.95), 'left'); txt(g, String(mo), 18, 60, F.hero(44), theme.paper, 'left');
      txt(g, 'STILL OWE', w - 18, 22, F.mono(15), rgba(theme.gold, 0.95), 'right'); txt(g, money(Math.round(bal)), w - 18, 58, F.hero(44), bal < 3000 ? theme.good : theme.paper, 'right');
      txt(g, 'PAYMENT ' + money(pay, 2), w / 2 + 40, 22, F.mono(15), rgba(theme.paper, 0.85));
      // bar split, true proportions
      const bx = 150, bw = w - 300, by = 40, bh = 22, ri = bw * intr / pay; g.fillStyle = 'rgba(245,243,238,.12)'; rr(g, bx, by, bw, bh, 11); g.fill();
      g.save(); rr(g, bx, by, bw, bh, 11); g.clip(); g.fillStyle = theme.bad; g.fillRect(bx, by, ri, bh); g.fillStyle = theme.good; g.fillRect(bx + ri + 2, by, bw - ri - 2, bh); g.restore();
      txt(g, 'INTEREST ' + money(intr, 2), bx - 8, by + 11, F.mono(13), theme.bad, 'right'); txt(g, 'DEBT −' + money(debt, 2), bx + bw + 8, by + 11, F.mono(13), theme.good, 'left');
      if (fx) { const u = ease.out(clamp((t - p.fixedAt) / 0.4)), fm = Math.max(0, Math.min(26, Math.round(lin(t, p.fixedAt, p.fixedAt + p.fixedDur) * 26))), fb = fm === 0 ? 5000 : SIM.fix[fm - 1]; g.save(); g.globalAlpha *= u; g.fillStyle = 'rgba(31,163,102,.18)'; rr(g, 8, 94, w - 16, 46, 10); g.fill(); txt(g, 'FIXED $250 · MONTH ' + fm, 22, 118, F.monoX(20), theme.good, 'left'); txt(g, fb === 0 ? '✓ PAID OFF' : money(Math.round(fb)), w - 22, 118, F.hero(32), fb === 0 ? theme.good : theme.paper, 'right'); g.restore(); }
      g.restore();
    },
  });

  // ---------------------------------------------------------------- shrinking payment bars
  const SHR = [1, 12, 24, 36, 48, 60];
  B.register('shrink', {
    defaults: { at: NOW, per: 0.42, w: 940, h: 700, labelAt: NOW }, size: p => [p.w, p.h],
    anchors: p => ({ bars: [0, 60, p.w * 0.94, p.h * 0.6], head: [0, -p.h / 2 + 70, p.w * 0.8, 110], last: [p.w * 0.36, 90, 150, p.h * 0.5] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 22, { lift });
      g.save(); rr(g, x0, y0, w, h, 22); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 130); g.restore();
      txt(g, 'THE MINIMUM SHRINKS', 0, y0 + 48, F.hero(56), theme.paper); txt(g, 'AS YOUR BALANCE SHRINKS', 0, y0 + 98, F.cap(30), theme.gold);
      const bw = (w - 120) / SHR.length, base = y0 + h - 100, maxBar = h - 130 - 100 - 70;
      SHR.forEach((mo, i) => { const o = t - (p.at + i * p.per); if (o <= 0) return; const k = spring(o, 'snappy'), row = SIM.min[mo - 1], pay = row[2], intr = row[1], bh = maxBar * pay / 143.17 * k, ih = bh * intr / pay, cx = x0 + 60 + bw * (i + 0.5);
        g.save(); g.globalAlpha *= clamp(o / 0.08); clay(g, cx - bw * 0.36, base - bh, bw * 0.72, bh, 10, theme.bad, { shadowK: 0.3 }); g.fillStyle = theme.good; g.save(); rr(g, cx - bw * 0.36, base - bh, bw * 0.72, bh, 10); g.clip(); g.fillRect(cx - bw * 0.36, base - bh + ih, bw * 0.72, bh - ih); g.restore();
        g.restore(); g.save(); g.globalAlpha *= clamp(o / 0.12); txt(g, money(pay, 0), cx, base - bh - 26, F.hero(40), i === SHR.length - 1 ? theme.badInk : theme.ink); txt(g, 'MO ' + mo, cx, base + 32, F.monoX(20), theme.inkSoft); g.restore(); });
      g.fillStyle = theme.rule; g.fillRect(x0 + 40, base + 2, w - 80, 4);
      const ln = t - p.labelAt; if (ln > -0.02) { const kk = spring(Math.max(0, ln), 'snappy'); g.save(); g.translate(0, y0 + h - 34 + (1 - kk) * 20); g.globalAlpha *= clamp(ln / 0.1); txt(g, '■ INTEREST   ■ YOUR DEBT', 0, 0, F.mono(17), theme.inkSoft); g.restore(); }
    },
  });

  // ---------------------------------------------------------------- calendar pages flying off, 2026 -> 2043
  B.register('pagesfly', {
    defaults: { at: NOW, per: 0.15, n: 17, y0: 2026, w: 760, h: 900, big: 16.5, endAt: NOW }, size: p => [p.w, p.h],
    anchors: p => ({ counter: [0, -p.h / 2 + 90, p.w * 0.9, 170], page: [0, 60, 560, 560], end: [0, p.h / 2 - 90, p.w * 0.9, 120] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, y0 = -h / 2, cur = t < p.at ? 0 : Math.min(p.n, Math.floor((t - p.at) / p.per) + 1);
      const page = (yr, ox, oy, rot, a, sc) => { g.save(); g.translate(ox, oy + 80); g.rotate(rot); g.scale(sc, sc); g.globalAlpha *= a; paper(g, -270, -270, 540, 540, 20, { lift: lift * (a > 0.9 ? 1 : 0.3) }); g.save(); rr(g, -270, -270, 540, 540, 20); g.clip(); g.fillStyle = theme.navy; g.fillRect(-270, -270, 540, 100); g.restore();
        for (let i = 0; i < 2; i++) { g.fillStyle = INK; g.beginPath(); g.arc(-90 + i * 180, -266, 10, 0, 7); g.fill(); } txt(g, yr === p.y0 ? 'TODAY' : 'YEAR ' + (yr - p.y0), -240, -220, F.monoX(30), theme.paper, 'left'); txt(g, String(yr), 0, 10, F.hero(210), yr === p.y0 + p.n ? theme.badInk : theme.ink); g.fillStyle = theme.rule; for (let r = 0; r < 3; r++) for (let c = 0; c < 9; c++) { g.beginPath(); g.arc(-200 + c * 50, 170 + r * 28, 5, 0, 7); g.fill(); } g.restore(); };
      // pages beneath (next two) then the top page and the flyers
      const topYr = p.y0 + Math.min(cur, p.n); for (let j = 2; j >= 1; j--) page(topYr + j, j * 10, -j * 12, j * 0.02, 1, 1 - j * 0.02);
      page(topYr, 0, 0, 0, 1, 1);
      for (let k = Math.max(0, cur - 4); k < cur; k++) { const u = clamp((t - (p.at + (k) * p.per)) / 0.55); if (u >= 1) continue; const e = ease.out(u); page(p.y0 + k, e * 620 * (k % 2 ? 1 : -1.05), -e * 920, e * (k % 2 ? 1.1 : -1.0), 1 - e, 1 + 0.15 * e); }
      // counter
      const yrs = Math.min(p.big, cur / p.n * p.big), done = cur >= p.n; g.save(); g.translate(0, y0 + 82); const cf = F.hero(150); g.font = cf; const cw = B.rollWidth(g, p.big, { font: cf, decimals: 1 }).w + g.measureText(' YEARS').width; g.shadowColor = 'rgba(0,0,0,.45)'; g.shadowBlur = 16; roll(g, yrs, -cw / 2, 0, { font: cf, size: 150, color: done ? theme.bad : theme.paper, decimals: 1, suffix: ' YEARS', align: 'left', speed: cur > 0 && !done ? 9 : 0 }); g.restore();
      if (done) { const dn = t - (p.at + p.n * p.per); burst(g, 0, y0 + 82, 280, theme.bad, dn - 0.05, 18, 0.55); }
    },
  });

  // ---------------------------------------------------------------- the kid born that day
  B.register('kid', {
    defaults: { w: 740, h: 700, growAt: NOW, growDur: 1.0, driveAt: NOW, label: 'BORN THE DAY YOU STARTED' }, size: p => [p.w, p.h],
    anchors: p => ({ age: [0, -p.h / 2 + 150, p.w * 0.6, 200], kid: [p.w * 0.14, 90, p.w * 0.4, p.h * 0.55] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, k = spring(lt, 'heavy'); g.save(); g.translate(0, (1 - k) * 160); g.globalAlpha *= clamp(lt / 0.1);
      paper(g, x0, y0, w, h, 22, { lift }); g.save(); rr(g, x0, y0, w, h, 22); g.clip(); const bg = g.createLinearGradient(0, y0, 0, y0 + h); bg.addColorStop(0, '#CFE8F5'); bg.addColorStop(1, '#F7E7B0'); g.fillStyle = bg; g.fillRect(x0, y0, w, h); g.fillStyle = '#7FBF8F'; g.fillRect(x0, y0 + h - 110, w, 120); g.restore();
      txt(g, p.label, 0, y0 + 50, F.cap(36), theme.ink);
      const gu = clamp((t - p.growAt) / p.growDur), age = Math.round(16 * ease.inOut(gu)), teen = gu > 0.55;
      g.save(); g.translate(0, y0 + 140); txt(g, 'AGE', -70, 36, F.cap(40), theme.inkSoft); txt(g, String(age), 70, 40, F.hero(130), age >= 16 ? theme.badInk : theme.ink); g.restore();
      // YOU (older) on the left
      g.save(); g.translate(x0 + 180, y0 + h - 70); g.scale(0.78, 0.78); window.BMCHAR(g, theme, 'you', age >= 16 ? 'worried' : 'think', t, {}); g.fillStyle = rgba('#D9D9DE', 0.85); for (const q of [-1, 1]) { g.beginPath(); g.ellipse(q * 60, -218, 14, 28, q * 0.3, 0, 7); g.fill(); } g.restore();
      txt(g, 'YOU', x0 + 180, y0 + h - 22, F.hero(34), theme.ink);
      // the kid
      g.save(); g.translate(x0 + w - 230, y0 + h - 70); const gs = lerp(0.62, 1.08, ease.inOut(gu)); g.scale(gs, gs);
      window.BMBUST(g, { skin: '#F1CDA8', hair: '#B07A3A', hairStyle: teen ? 'short' : 'short', suit: teen ? '#7B52C9' : '#9EDCF0', shirt: teen ? '#F5F3EE' : '#F5F3EE', tie: null, s: 1, tt: t, mood: age >= 16 ? 'cheer' : 'cheer' });
      if (!teen) { g.fillStyle = '#F2B705'; g.beginPath(); g.arc(34, -152, 12, 0, 7); g.fill(); g.strokeStyle = INK; g.lineWidth = 3; g.stroke(); }
      const dn = t - p.driveAt; if (dn > -0.05) { const dk = spring(Math.max(0, dn), 'bouncy'); g.save(); g.translate(0, -60); g.scale(0.4 + 0.6 * dk, 0.4 + 0.6 * dk); g.strokeStyle = '#2b2f36'; g.lineWidth = 14; g.beginPath(); g.arc(0, 0, 56, 0, 7); g.stroke(); g.lineWidth = 9; g.beginPath(); g.moveTo(-56, 0); g.lineTo(56, 0); g.moveTo(0, 0); g.lineTo(0, 56); g.stroke(); g.fillStyle = '#2b2f36'; g.beginPath(); g.arc(0, 0, 14, 0, 7); g.fill(); g.restore(); }
      g.restore();
      if (dn > 0) { const sk = spring(dn, 'bouncy'); g.save(); g.translate(x0 + w - 150, y0 + 220); g.rotate(0.1); g.scale(sk, sk); clay(g, -90, -26, 180, 52, 8, '#1FA366', { shadowK: 0.4 }); txt(g, 'LEARNING TO DRIVE', 0, 2, F.monoX(17), theme.paper); g.restore(); }
      g.restore();
    },
  });

  // ---------------------------------------------------------------- $5,000 of stuff (shopping bags)
  B.register('stuff', {
    defaults: { w: 460, h: 520, at: NOW, per: 0.1, label: '$5,000 OF STUFF' }, size: p => [p.w, p.h],
    anchors: p => ({ pile: [0, 20, p.w * 0.9, p.h * 0.6], label: [0, p.h / 2 - 70, p.w * 0.9, 100] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, k = spring(lt, 'heavy'); g.save(); g.translate(0, (1 - k) * 160); g.globalAlpha *= clamp(lt / 0.1);
      paper(g, x0, y0, w, h, 20, { lift }); g.save(); rr(g, x0, y0, w, h, 20); g.clip(); g.fillStyle = '#EFE6CF'; g.fillRect(x0, y0, w, h); g.fillStyle = 'rgba(0,0,0,.06)'; g.fillRect(x0, y0 + h - 170, w, 12); g.restore();
      const cols = ['#E0281E', '#2c3e66', '#F2B705', '#1FA366', '#7B52C9'], pos = [[-130, 90, 120, 150, 0], [0, 70, 130, 175, 1], [128, 96, 116, 140, 2], [-60, -50, 112, 140, 3], [60, -60, 108, 130, 4]];
      pos.forEach(([bx, by, bw, bh, ci], i) => { const o = t - (p.at + i * p.per); if (o <= 0) return; const kk = spring(o, 'bouncy'); g.save(); g.translate(bx, by + 60 + (1 - kk) * -240); g.rotate((hash(i * 3.3) - 0.5) * 0.12); g.globalAlpha *= clamp(o / 0.08); clay(g, -bw / 2, -bh / 2, bw, bh, 8, cols[ci], { shadowK: 0.5 });
        g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.arc(-bw * 0.2, -bh / 2, bw * 0.16, Math.PI, 0); g.arc(bw * 0.2, -bh / 2, bw * 0.16, Math.PI, 0); g.stroke(); g.fillStyle = 'rgba(245,243,238,.9)'; g.beginPath(); g.arc(0, 4, bw * 0.2, 0, 7); g.fill(); txt(g, '$', 0, 6, F.hero(bw * 0.28), cols[ci]); g.restore(); });
      txt(g, p.label, 0, y0 + 56, F.hero(60), theme.ink); g.restore();
    },
  });
})();
// ===== Card minimum v3 — scene builder shared by the three cuts: CM(W, V) -> BM2.scene spec =====
// Recurring character: YOU holding the card (you0 hook, you1 setup, you3 payment, you4 trap, you5 five years, you7 sixteen years, kid scene, you10 fixed, loop).
// Live number from frame 0: the monthstrip (MONTH n · STILL OWE · red INTEREST vs thin green DEBT bar, real simulation).
// Stations (world px): row0 y=0: hook(0) setup(1800) apr(3600) payment(5400) trap(7200) · row1 y=1800: fiveyears(0) sixteen(1800) kid(3600) total(5400) fixed(7200)
window.CM = function (W, V) {
  const SB = 'side-by-side', GH = 'graphic-hero', ZN = 'zoom-on-number', PF = 'presenter-front', PK = 'peek', PB = 'pull-back';
  const R = (ref, d) => (d == null ? ref : (typeof ref === 'number' ? ref + d : ref + (d >= 0 ? '+' : '') + d));
  const STL = { x: 120, y: 1410, s: 0.85 }, STR = { x: 940, y: 1410, s: 0.85 };
  const row = 1800, els = [], E = (...a) => els.push(...a);
  const has = k => W[k] != null;
  // ---------------------------------------------------------------- S0 hook (frame 0 + loop)
  E({ id: 'hook', type: 'text', at: [0, -470], in: -1, out: R(W.hookOut, -0.05), props: { lines: V.hook, size: V.hookSize || 124, per: 0.1 } },
    { id: 'you0', type: 'you', at: [0, 25], in: -3, props: { w: 480, h: 560, moods: [{ t: 0, m: 'worried' }, { t: V.shockAt || 99999, m: 'shock' }], tag: 'YEAR 1' } },
    { id: 'hook2', type: 'text', at: [0, -470], in: R(W.end, 0.05), props: { lines: V.hook, size: V.hookSize || 124, per: 0.1 } },
    { id: 'you0b', type: 'you', at: [0, 25], in: R(W.end, -0.15), props: { w: 480, h: 560, moods: [{ t: 0, m: 'think' }, { t: R(W.end, 0.4), m: 'worried' }], tag: 'YEAR 1' } });
  // ---------------------------------------------------------------- S1 setup: owe $5,000 + the minimum
  E({ id: 'you1', type: 'you', at: [1470, 40], in: R(W.s1, -0.3), props: { w: 400, h: 480, labelSize: 40, bg: 1, moods: [{ t: 0, m: 'think' }, { t: W.bal, m: 'worried' }], tag: 'OWES $5,000' } },
    { id: 'stmt', type: 'stmt', at: [2130, 20], scale: 0.84, in: R(W.s1, -0.1), props: { balAt: W.bal, aprAt: has('apr1') ? W.apr1 : 99999, dueAt: 99999, fineAt: 99999, fine1At: 99999, fine2At: 99999 } },
    { id: 'minT', type: 'text', layer: 'screen', at: [540, 478], in: W.minimum, out: R(W.s2 || W.s3, -0.15), props: { lines: V.minLines || [[['THE MINIMUM =', 'gold']], [['THE SMALLEST PAYMENT ALLOWED', 'paper']]], size: 54 } });
  // ---------------------------------------------------------------- S2 APR (skipped when the cut merges it into the statement)
  if (has('s2')) E({ id: 'plastic', type: 'plastic', at: [3600, -100], scale: 1.1, rot: -0.09, in: R(W.s2, -0.35) },
    { id: 'apr', type: 'counter', at: [3600, 330], in: R(W.s2, -0.2), props: { at: W.apr, dur: 1.1, to: 22.36, decimals: 2, suffix: '%', label: 'APR · A YEAR', sub: V.aprSub || 'AVERAGE · CARRYING A BALANCE', tone: 'bad', size: 170, w: 840 } });
  // ---------------------------------------------------------------- S3 month one: the payment splits
  E({ id: 'bar', type: 'paybar', at: [5400, -170], in: R(W.s3, -0.4), props: { fillAt: W.fillAt || W.intr, splitAt: W.drop } },
    { id: 'you3', type: 'you', at: [5400, 510], in: R(W.s3, -0.3), props: { w: 400, h: 440, labelSize: 40, bg: 2, moods: [{ t: 0, m: 'neutral' }, { t: R(W.intr, 0), m: 'worried' }, { t: W.drop, m: 'shock' }], tag: 'MONTH 1' } },
    { id: 'feeT', type: 'text', layer: 'screen', at: [540, 480], in: W.fee, out: R(W.drop, -0.15), props: { lines: V.feeLines || [[['INTEREST = ', 'bad'], ["THE BANK'S FEE", 'paper']], [['FOR LENDING YOU MONEY', 'gold']]], size: 50 } });
  // ---------------------------------------------------------------- S4 the trap: the minimum shrinks
  E({ id: 'shr', type: 'shrink', at: [7200, -90], in: R(W.s4, -0.4), props: { at: R(W.shrAt, 0), per: V.shrPer || 0.42, labelAt: R(W.shrAt, 0.1) } },
    { id: 'you4', type: 'you', at: [7200, 560], in: R(W.s4, -0.3), props: { w: 380, h: 420, labelSize: 38, bg: 0, moods: [{ t: 0, m: 'think' }, { t: R(W.shrAt, 0.2), m: 'wrong' }], tag: 'MONTH 60' } });
  // ---------------------------------------------------------------- S5 five years later (calendar pages) + the balance still owed
  E({ id: 'cal', type: 'cal', at: [180, row + 20], in: R(W.s5, -0.4), enter: 'rise', props: { flipAt: R(W.five, -0.05), owedAt: W.owe, dur: 1.0 } },
    { id: 'you5', type: 'you', at: [-520, row + 70], in: R(W.s5, -0.3), props: { w: 340, h: 410, labelSize: 36, bg: 1, age: 0.35, moods: [{ t: 0, m: 'think' }, { t: W.owe, m: 'wrong' }], tag: 'YEAR 5' } });
  // ---------------------------------------------------------------- S7 sixteen and a half years
  E({ id: 'pf', type: 'pagesfly', at: [1800 - 120, row + 20], in: R(W.s7, -0.4), props: { at: R(W.yrs, -0.1), per: V.pagePer || 0.16, endAt: R(W.yrs, 2.6) } },
    { id: 'you7', type: 'you', at: [1800 + 560, row + 120], in: R(W.s7, -0.3), props: { w: 340, h: 410, labelSize: 36, bg: 2, age: 0.8, moods: [{ t: 0, m: 'worried' }, { t: R(W.yrs, 1.6), m: 'wrong' }], tag: 'YEAR 16' } },
    );
  if (has('kid')) E({ id: 'kid', type: 'kid', at: [3600, row + 20], in: R(W.kid, -0.35), props: { growAt: W.growAt, growDur: V.growDur || 1.0, driveAt: W.drive } });
  // ---------------------------------------------------------------- S9 the total
  E({ id: 'stf', type: 'stuff', at: [5400 - 380, row + 60], in: R(W.s9, -0.4), props: { at: R(W.stuff, -0.2) } },
    { id: 'rcpt', type: 'receipt', at: [5400 + 330, row + 40], in: R(W.s9, -0.2), props: { title: 'THE FINAL RECEIPT', w: 600, rows: [
      { id: 'borrowed', k: 'YOU BORROWED', v: '$5,000', at: R(W.s9, 0.2), tone: 'good' }, { id: 'paid', k: 'YOU PAID', v: '$12,811', at: W.paid, tone: 'bad' }, { id: 'int', k: 'INTEREST', v: '$7,811', at: R(W.paid, 1.0), tone: 'bad' }], foot: '198 MONTHS = 16.5 YEARS' } });
  // ---------------------------------------------------------------- S10 fixed $250: the ghost counter
  E({ id: 'track', type: 'track', at: [7200, row - 90], in: R(W.s10, -0.4), props: { fillAt: R(W.s10, 0), fillDur: 1.0, ghostAt: W.fx250, ghostDur: V.ghostDur || 1.4, tagAt: W.same } },
    { id: 'you10', type: 'you', at: [7200, row + 560], in: R(W.fx250, -0.3), props: { w: 380, h: 420, labelSize: 38, bg: 1, moods: [{ t: 0, m: 'think' }, { t: W.m26, m: 'grin' }], tag: 'FIXED $250' } },
    { id: 'fast', type: 'bigstamp', at: [7200, row - 60], rot: -0.07, scale: 1.12, in: W.fast, props: { lines: ['14 YEARS', 'FASTER'], tone: 'good', size: 110 } });
  // ---------------------------------------------------------------- screen micro-moments + HUD
  E({ id: 'heart', type: 'heart', layer: 'screen', at: [800, 930], in: R(W.like, -0.05), out: R(W.like, 1.15), props: { s: 1 } },
    { id: 'liket', type: 'text', layer: 'screen', at: [800, 1190], in: R(W.like, 0.15), out: R(W.like, 1.2), props: { lines: [[[V.likeText || 'LIKE', 'gold']]], size: 60 } },
    { id: 'plane', type: 'plane', layer: 'screen', at: [0, 0], in: R(W.send, -0.05), out: R(W.send, 1.5), props: { from: [110, 900], to: [1150, 330], dur: 1.45 } },
    { id: 'btn', type: 'follow', layer: 'screen', at: [830, 1010], scale: 0.8, in: R(W.follow, -0.05), out: R(W.follow, 1.45), props: { press: 0.55 } },
    { id: 'ask', type: 'bubble', layer: 'screen', at: [600, 1090], in: R(W.q, 0.4), out: R(W.end, 0.3), props: { l1: V.askL1, l2: V.askL2, size: 44, tail: 'left' } },
    ...(V.extra || []),
    { id: 'strip', type: 'monthstrip', layer: 'screen', at: [0, 0], in: -1, props: { clock: V.clock, fixedAt: W.fx250 } },
    { id: 'hud', type: 'hud', layer: 'screen', at: [0, 0], in: -1, props: { labels: V.labels, items: [] } });
  // ================================================================ beats
  const beats = [], bt = (at, o) => { if (at == null || /undefined/.test(String(at))) return; beats.push({ at, ...o }); };
  const F0 = ['hook', 'you0'], F0e = ['hook2', 'you0b'];
  beats.push({ at: 0, beat: SB, focus: F0, fill: 0.9, maxH: 900, sx: 540, sy: 905, st: { x: 130, y: 1410, s: 0.85 }, pose: 'you', keep: ['hook', 'hook2'] });
  bt(W.hookZ, { beat: ZN, focus: 'hook', fill: 0.95, maxH: 400, sy: 700, st: { x: 130, y: 1410, s: 0.85 }, pose: 'shock', dur: 0.45 });
  bt(W.hookZ2, { beat: GH, focus: F0, fill: 0.9, maxH: 900, sx: 540, sy: 905, st: STR, pose: 'point', dur: 0.7, keep: ['hook', 'hook2'] });
  bt(R(W.s1, -0.25), { beat: GH, focus: ['you1', 'stmt'], move: 'whip', fill: 0.97, maxH: 760, sy: 880, st: STR, pose: 'idle' });
  bt(W.bal, { beat: ZN, focus: 'stmt.bal', fill: 0.8, sy: 780, st: STL, pose: 'point', dur: 0.5 });
  bt(W.apr1, { beat: ZN, focus: 'stmt.apr', fill: 0.8, sy: 780, st: STL, pose: 'point', dur: 0.5 });
  bt(W.minimum, { beat: GH, focus: ['you1', 'stmt'], fill: 0.97, maxH: 760, sy: 880, st: STR, pose: 'point', dur: 0.7 });
  if (has('s2')) { bt(R(W.s2, -0.25), { beat: GH, focus: ['plastic', 'apr'], move: 'whip', fill: 0.9, maxH: 860, sy: 880, st: STL, pose: 'idle' });
    bt(W.apr, { beat: ZN, focus: 'apr.value', fill: 0.84, sy: 800, st: STL, pose: 'shock', dur: 0.5 }); bt(W.avg, { beat: GH, focus: ['plastic', 'apr'], fill: 0.9, maxH: 860, sy: 880, st: STR, pose: 'point', dur: 0.7 }); }
  bt(R(W.s3, -0.25), { beat: GH, focus: ['bar', 'you3'], move: 'whip', fill: 0.9, maxH: 820, sy: 960, st: STR, pose: 'idle' });
  bt(W.pay, { beat: ZN, focus: 'bar.total', fill: 0.8, sy: 780, st: STL, pose: 'point', dur: 0.5 });
  bt(W.intr, { beat: GH, focus: ['bar', 'you3'], fill: 0.95, maxH: 820, sy: 960, st: STL, pose: 'shock', dur: 0.5 });
  bt(W.drop, { beat: ZN, focus: 'bar.debt', fill: 0.8, maxH: 520, sy: 800, st: STL, pose: 'shock', dur: 0.5 });
  bt(R(W.drop, 1.2), { beat: GH, focus: ['bar', 'you3'], fill: 0.9, maxH: 820, sy: 960, st: STR, pose: 'idle', dur: 0.7 });
  bt(W.five2, { beat: ZN, focus: 'cal.owed', fill: 0.56, sy: 1000, st: STR, pose: 'idle', dur: 0.5 });
  bt(R(W.s4, -0.25), { beat: GH, focus: ['shr', 'you4'], move: 'whip', fill: 0.9, maxH: 900, sy: 880, st: STR, pose: 'chin' });
  bt(R(W.shrAt, 1.3), { beat: ZN, focus: 'shr.bars', fill: 0.7, maxH: 560, sy: 860, st: STL, pose: 'point', dur: 0.6 });
  bt(W.shrB, { beat: ZN, focus: 'shr.last', fill: 0.6, maxH: 560, sy: 860, st: STL, pose: 'shock', dur: 0.5 });
  bt(W.shrC, { beat: GH, focus: ['shr', 'you4'], fill: 0.9, maxH: 900, sy: 880, st: STR, pose: 'idle', dur: 0.7 });
  bt(V.shrTail === false ? undefined : R(W.shrAt, 3.0), { beat: GH, focus: ['shr', 'you4'], fill: 0.9, maxH: 900, sy: 880, st: STR, pose: 'idle', dur: 0.7 });
  bt(R(W.s5, -0.25), { beat: GH, focus: ['cal', 'you5'], move: 'whip', fill: 0.97, maxH: 780, sy: 880, st: STR, pose: 'idle' });
  bt(W.owe, { beat: ZN, focus: 'cal.owed', fill: 0.56, sy: 1000, st: STR, pose: 'shock', dur: 0.5 });
  bt(W.send, { beat: PF, focus: 'cal', sy: 770, pose: 'you' });
  bt(R(W.s7, -0.25), { beat: GH, focus: ['pf', 'you7'], move: 'whip', fill: 0.97, maxH: 860, sy: 880, st: STL, pose: 'idle' });
  bt(R(W.yrs, 0.2), { beat: ZN, focus: 'pf.counter', fill: 0.84, maxH: 400, sy: 740, st: STL, pose: 'shock', dur: 0.5 });
  bt(R(W.yrs, 2.4), { beat: GH, focus: ['pf', 'you7'], fill: 0.97, maxH: 860, sy: 880, st: STL, pose: 'idle', dur: 0.7 });
  bt(R(W.kid, -0.25), { beat: GH, focus: 'kid', move: 'whip', fill: 0.94, maxH: 860, sy: 880, st: STL, pose: 'point' });
  bt(W.growAt, { beat: ZN, focus: 'kid.age', fill: 0.4, maxH: 300, sy: 800, st: STL, pose: 'shock', dur: 0.5 });
  bt(W.drive, { beat: GH, focus: 'kid', fill: 0.94, maxH: 860, sy: 880, st: STR, pose: 'shock', dur: 0.7 });
  bt(W.follow, { beat: PF, focus: V.followFocus || 'kid', sy: 800, pose: 'follow', zoom: 0.9 });
  bt(R(W.s9, -0.25), { beat: GH, focus: 'rcpt', move: 'whip', fill: 0.7, maxH: 760, sy: 880, st: STL, pose: 'idle' });
  bt(W.paid, { beat: ZN, focus: 'rcpt.paid', fill: 0.6, sy: 900, st: STL, pose: 'shock', dur: 0.5 });
  bt(R(W.stuff, -0.1), { beat: GH, focus: ['stf', 'rcpt'], fill: 0.97, maxH: 760, sy: 880, st: STR, pose: 'point', dur: 0.7 });
  bt(R(W.s10, -0.25), { beat: GH, focus: ['track', 'you10'], move: 'whip', fill: 0.94, maxH: 900, sy: 930, st: STL, pose: 'idle' });
  bt(W.fx250, { beat: ZN, focus: 'track.ghost', fill: 0.72, sy: 1080, st: STL, pose: 'point', dur: 0.5 });
  bt(W.m26, { beat: GH, focus: ['track', 'you10'], fill: 0.94, maxH: 900, sy: 930, st: STR, pose: 'shock', dur: 0.6 });
  bt(W.fast, { beat: ZN, focus: 'fast', fill: 0.62, maxH: 380, sy: 860, st: STL, pose: 'shock', dur: 0.45 });
  bt(R(W.q, -0.3), { beat: PF, focus: 'track', sy: 800, pose: 'talk', dur: 0.6 });
  bt(W.end, { beat: SB, focus: F0e, move: 'whip', fill: 0.9, maxH: 900, sx: 540, sy: 905, st: { x: 130, y: 1410, s: 0.85 }, pose: 'you', keep: ['hook', 'hook2'] });
  for (const b of beats) { if (b.beat === PF || b.beat === ZN || b.at === 0) continue; b.maxH = Math.min(b.maxH || 860, 860); const lo = 430 + b.maxH / 2, hi = 1330 - b.maxH / 2; b.sy = Math.min(hi, Math.max(lo, b.sy || 880)); }
  // ================================================================ sfx
  const S = [], sx_ = (at, name, gain, dur) => { if (at == null || /undefined/.test(String(at))) return; S.push({ at, name, gain, dur }); };
  S.push({ at: 0, name: 'deep_boom_2', gain: -5, dur: 0.4 }, { at: 0.05, name: 'typewriter_1', gain: -14, dur: 0.6 });
  sx_(W.hookZ, 'pop_2', -9, 0.3); sx_(R(W.s1, -0.25), 'paper_slam_2', -10, 0.5); sx_(W.bal, 'pop_2', -8, 0.3); sx_(W.apr1, 'pop_2', -8, 0.3); sx_(W.minimum, 'typewriter_2', -11, 0.6);
  sx_(R(W.s2, -0.25), 'paper_slam_2', -10, 0.5); sx_(W.apr, 'money_counter_1', -11, 1.1); sx_(R(W.apr, 1.1), 'ding_2', -9, 0.7);
  sx_(R(W.s3, -0.25), 'paper_slam_2', -10, 0.5); sx_(W.pay, 'cash_register_1', -9, 0.9); sx_(W.intr, 'money_counter_1', -11, 0.9); sx_(W.drop, 'rubber_stamp_2', -6, 0.5); sx_(W.drop, 'thud_1', -9, 0.4);
  sx_(W.like, 'heartbeat_1', -8, 0.9); sx_(R(W.s4, -0.25), 'paper_slam_2', -10, 0.5); sx_(W.shrAt, 'click_1', -9, 0.3); sx_(R(W.shrAt, 0.42), 'click_1', -9, 0.3); sx_(R(W.shrAt, 0.84), 'click_1', -9, 0.3); sx_(R(W.shrAt, 2.1), 'record_scratch_stop_1', -14, 0.6);
  sx_(R(W.s5, -0.25), 'paper_slam_2', -10, 0.5); sx_(R(W.five, -0.05), 'paper_slam_1', -9, 0.5); sx_(W.owe, 'cash_register_1', -9, 0.9); sx_(W.send, 'swoosh_2', -9, 1.0);
  sx_(R(W.s7, -0.25), 'paper_slam_2', -10, 0.5); sx_(R(W.yrs, -0.1), 'riser_2', -11, 1.2); sx_(R(W.yrs, 2.4), 'cinematic_hit_1', -6, 1.0);
  sx_(R(W.kid, -0.25), 'paper_slam_2', -10, 0.5); sx_(W.growAt, 'riser_2', -12, 1.0); sx_(W.drive, 'pop_2', -8, 0.3);
  sx_(R(W.follow, 0.5), 'click_1', -8, 0.3); sx_(R(W.follow, 0.58), 'success_chime_1', -12, 1.0);
  sx_(R(W.s9, -0.25), 'paper_slam_2', -10, 0.5); sx_(R(W.stuff, -0.2), 'coins_drop_1', -12, 1.0); sx_(W.paid, 'cash_register_1', -7, 0.9); sx_(W.paid, 'cinematic_hit_1', -6, 1.0);
  sx_(R(W.s10, -0.25), 'paper_slam_2', -10, 0.5); sx_(W.fx250, 'money_counter_2', -11, 1.2); sx_(W.m26, 'success_chime_1', -9, 1.0); sx_(W.fast, 'rubber_stamp_2', -5, 0.5); sx_(W.fast, 'deep_boom_1', -5, 1.0);
  sx_(W.q, 'pop_1', -9, 0.5); sx_(W.end, 'rewind_2', -11, 0.9);
  return {
    series: 'whatif', title: V.title || 'CARD MINIMUM', duration: V.duration,
    footnote: ['ASSUMES $5,000 · 22.36% APR · MIN = 1% + INTEREST ($35 FLOOR) · NO NEW PURCHASES · MATH, NOT ADVICE', 'MONTH-BY-MONTH SIMULATION · APR: FEDERAL RESERVE G.19 (Q3 2026, VIA LENDINGTREE) · ILLUSTRATIONS: YOU · CARD · BAGS'],
    elements: els, beats, poses: [[R(W.follow, -0.1), 'follow', { target: [830, 1010] }], [R(W.follow, 1.5), 'talk']], shakes: V.shakes, captions: V.captions, bed: V.bed || { name: 'upbeat_bed_2', gain: -1 }, sfx: S,
  };
};
// YouTube cut v3 (65.61 s narration)
BM2.scene(CM({
  hookOut: '@Say', hookZ: '@$12', s1: '@Say', bal: '@$5#2', minimum: '@minimum',
  s2: '@Your', apr: '@22', avg: '@average',
  s3: '@So', pay: '@$143', intr: '@$93', fee: '@fee', drop: '@$50', like: '@like',
  s4: '@trap', shrAt: '@As',
  s5: '@After', five: '@five', owe: '@$2', send: '@Send',
  s7: '@So#2', yrs: '@16', kid: '@kid', growAt: '@would', drive: '@learning', follow: '@Follow',
  s9: '@Ready', paid: '@$12#2', stuff: '@stuff', s10: '@Now', fx250: '@$250', m26: '@26', same: '@Same', fast: '@14', q: '@So#3', end: '@minimum#4',
}, {
  duration: 66.01, title: 'CARD MINIMUM', likeText: 'LIKE', shockAt: '@cost',
  hook: [[['$5,000 ', 'good'], ['OF DEBT', 'paper']], [['CAN COST ', 'paper'], ['$12,000', 'bad']]], hookSize: 118,
  askL1: 'STILL PAYING THE MINIMUM?', askL2: 'YES / NO',
  clock: [[0, 0], ['@As', 0], ['@As+3.2', 36], ['@five', 36], ['@five+1.6', 60], ['@16', 60], ['@16+2.4', 198], ['@minimum#4', 198], ['@minimum#4+0.9', 0]],
  labels: [{ at: -1, text: 'THE SETUP' }, { at: '@Your', text: 'THE RATE' }, { at: '@So', text: 'THE PAYMENT' }, { at: '@trap', text: 'THE TRAP' }, { at: '@After', text: 'THE YEARS' }, { at: '@Ready', text: 'THE TOTAL' }, { at: '@Now', text: 'THE FIX' }, { at: '@minimum#4', text: 'THE SETUP' }],
  shakes: [[0.05, 12], ['@$50', 14], ['@16', 14], ['@$12#2', 18], ['@14', 16]],
  captions: { gap: 16, emph: { '$5,000': 'good', '$143': 'bad', '$93': 'bad', '$50': 'good', '$12,811': 'bad', '$2,700': 'bad', '22%': 'bad', '16': 'bad', '$250': 'good', '26': 'good', '14': 'good', minimum: 'bad', interest: 'bad', trap: 'bad' }, fix: [] },
}));
