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
