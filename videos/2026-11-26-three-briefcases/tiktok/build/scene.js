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
// ===== three-briefcases — shared custom recipes (registered via BM2.register; prepended to each cut's scene.js) =====
// table3 (three clay briefcases + host hand + odds bars + 50/50 + STAY/SWITCH), fan100 (100-case payoff), mail (letter avalanche),
// tally (bar race of simulated rounds "OUR MATH" / kitchen-table tally), assumes (pinned chip), chip, heart, plane.
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, hash, hit, shade, mix } = B;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const STEEL = '#7f8fa6', GOLD = '#F2B705', BLUEBAR = '#6f86b8';
  const NEVER = 99000;

  // ---------- a clay briefcase (local origin = centre; 270 x 190) ----------
  function bcase(g, th, o) {
    const w = o.w || 270, h = o.h || 190, x0 = -w / 2, y0 = -h / 2, k = o.open || 0, col = o.col || STEEL;
    g.save();
    if (k > 0.02) { // lid swung up behind the body
      const lh = h * 0.8 * k; clay(g, x0 + 8, y0 - lh + 10, w - 16, lh, 18, shade(col, -0.22), { shadowK: 0.5 });
      g.fillStyle = 'rgba(0,0,0,.22)'; rr(g, x0 + 30, y0 - lh + 30, w - 60, Math.max(2, lh - 40), 10); g.fill();
    }
    g.save(); g.globalAlpha *= 1 - clamp(k * 6);
    g.strokeStyle = '#2d3646'; g.lineWidth = 15; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); g.moveTo(-52, y0 + 4); g.lineTo(-52, y0 - 24); g.quadraticCurveTo(-52, y0 - 42, -34, y0 - 42); g.lineTo(34, y0 - 42); g.quadraticCurveTo(52, y0 - 42, 52, y0 - 24); g.lineTo(52, y0 + 4); g.stroke(); g.restore();
    clay(g, x0, y0, w, h, 24, col, { shadowK: 0.75, lift: o.lift || 0 });
    if (k > 0.02) {
      g.save(); g.globalAlpha *= clamp(k * 3); g.fillStyle = '#222a37'; rr(g, x0 + 14, y0 + 12, w - 28, h - 24, 14); g.fill();
      g.fillStyle = th.paperShade; rr(g, x0 + 24, y0 + 22, w - 48, h - 44, 10); g.fill();
      txt(g, 'EMPTY', 0, 4, F.monoX(36), th.inkSoft); g.restore();
    }
    g.save(); g.globalAlpha *= 1 - clamp(k * 3);
    g.fillStyle = 'rgba(0,0,0,.20)'; g.fillRect(x0 + 6, y0 + h * 0.34, w - 12, 5); g.fillStyle = 'rgba(255,255,255,.16)'; g.fillRect(x0 + 6, y0 + h * 0.34 + 5, w - 12, 2);
    for (const sx of [-0.3, 0.3]) clay(g, sx * w - 20, y0 + h * 0.34 - 15, 40, 30, 8, GOLD, { shadowK: 0.4 });
    clay(g, -24, y0 + h * 0.34 - 12, 48, 24, 8, shade(GOLD, -0.1), { shadowK: 0.3 });
    g.restore(); g.restore();
  }
  window.__bcase = bcase;
  function pillTag(g, th, s, x, y, col, fs, k, tc) { // clay pill with a label, landed with a squash. k = 0..1 spring progress
    const f = F.hero(fs), w = mw(s, f) + 56, h = fs + 34; g.save(); g.translate(x, y); g.scale(0.55 + 0.45 * k, 0.55 + 0.45 * k); g.globalAlpha *= clamp(k * 3);
    clay(g, -w / 2, -h / 2, w, h, h / 2.6, col, { shadowK: 0.7 }); txt(g, s, 0, 3, f, tc || th.ink); g.restore(); return w;
  }
  function glove(g, th) { // pointing down; origin = fingertips centre
    const P = th.paper, S = th.paperShade;
    clay(g, -62, -300, 124, 120, 18, th.navy, { shadowK: 0.4 }); g.fillStyle = 'rgba(255,255,255,.18)'; g.fillRect(-62, -186, 124, 6);
    clay(g, -56, -190, 112, 100, 24, P, { shadowK: 0.5 });
    const fl = [60, 74, 70, 58];
    fl.forEach((L, i) => { const x = -43 + i * 29; clay(g, x - 12, -100, 25, L + 80 - 80 + 100, 12, P, { shadowK: 0.3 }); });
    g.save(); g.translate(-58, -130); g.rotate(0.9); clay(g, -13, -8, 26, 70, 13, P, { shadowK: 0.3 }); g.restore();
    g.strokeStyle = S; g.lineWidth = 3; for (let i = 1; i < 4; i++) { g.beginPath(); g.moveTo(-43 + i * 29 - 14, -96); g.lineTo(-43 + i * 29 - 14, -30); g.stroke(); }
  }
  function diploma(g, th, s, stampT, out, y1) { // s = seconds since it was released
    if (s < 0) return; const u = ease.out(lin(s, 0, 1.5)), sway = Math.sin(s * 5.2) * (1 - u), xr = 300, yr = y1;
    let x = xr + 70 * sway, y = lerp(-1100, yr, u), rot = 0.45 * sway + 0.16 * u, a = 1;
    if (out > -9) { const o = ease.in(lin(out, 0, 0.7)); y += 700 * o; x += 120 * o; rot += 0.6 * o; a = 1 - clamp((out - 0.3) / 0.4); } if (a <= 0) return;
    g.save(); g.globalAlpha *= a; g.translate(x, y); g.rotate(rot);
    clay(g, -150, -96, 300, 192, 12, '#EFE6CF', { shadowK: 0.6 }); for (const sx of [-1, 1]) clay(g, sx * 150 - 12, -104, 24, 208, 12, '#D9CDAE', { shadowK: 0.3 });
    g.strokeStyle = 'rgba(11,15,20,.22)'; g.lineWidth = 3; for (let i = 0; i < 3; i++) { g.beginPath(); g.moveTo(-100, 40 + i * 18); g.lineTo(60, 40 + i * 18); g.stroke(); }
    txt(g, 'PhD', -20, -30, F.hero(104), th.ink); g.fillStyle = th.gold; g.beginPath(); g.arc(98, 52, 30, 0, 7); g.fill(); g.fillStyle = th.bad; g.beginPath(); g.moveTo(80, 76); g.lineTo(68, 118); g.lineTo(90, 106); g.lineTo(104, 120); g.lineTo(106, 76); g.fill();
    if (stampT > 0) { const k = ease.expo(lin(stampT, 0, 0.14)), sc = 1 + 1.8 * (1 - k); g.save(); g.translate(10, 6); g.rotate(-0.22); g.scale(sc, sc); g.globalAlpha *= clamp(stampT / 0.05);
      g.strokeStyle = th.bad; g.lineWidth = 9; rr(g, -150, -50, 300, 100, 10); g.stroke(); txt(g, 'WRONG', 0, 4, F.hero(86), th.bad); g.restore(); burst(g, 10, 6, 220, th.bad, stampT - 0.1, 12, 0.4); }
    g.restore();
  }

  // ---------- table3: the whole three-case stage ----------
  B.register('table3', {
    defaults: { reAt: NEVER, slam: [0, 0.14, 0.28], alt: false, relAt: NEVER, opens: [], tagIdx: 1, tagIn: -1, tagAway: NEVER, numAt: NEVER, pickAt: NEVER, pickIdx: 0, handAt: NEVER, flipAt: NEVER, handIdx: 2, xrayAt: NEVER,
      pullAt: NEVER, pullOut: NEVER, swapAt: NEVER, fiftyAt: NEVER, crackAt: NEVER, btnAt: NEVER, lockAt: NEVER, slideAt: NEVER, tag2At: NEVER, bars2At: NEVER, bars2Gap: 0.28, winAt: NEVER, diploma: [], fiftyLabel: false, btnLabels: ['STAY', 'SWITCH'] },
    size: () => [1000, 760],
    anchors: () => ({ all: [0, -90, 1000, 760], row: [0, 0, 960, 300], c0: [-310, 0, 290, 280], c1: [0, 0, 290, 280], c2: [310, 0, 290, 280], pick: [-310, 20, 270, 190], tag: [0, -30, 360, 300], cash: [0, -30, 360, 300],
      bar0: [-310, -300, 260, 340], bar1: [0, -300, 260, 340], bars: [0, -300, 900, 360], fifty: [0, -300, 740, 260], btn: [0, 206, 780, 100], desk: [0, 135, 1000, 150], hand: [310, -190, 300, 400], diploma: [300, -150, 360, 260], pulled: [0, 0, 560, 300] }),
    draw(g, p, env) {
      const { t, theme: th } = env, T = t >= p.reAt ? t - p.reAt : t, loop = t >= p.reAt, el = a => (a > NEVER - 1 ? -9 : T - a), CY = 0;
      // positions
      const stdX = [-310, 0, 310], altX = [-330, 330, 0], altY = [0, 0, -70], altS = [1, 1, 0.9];
      const ru = p.alt ? 1 - ease.inOut(lin(T, p.relAt, p.relAt + 0.5)) : 0;
      const pk = ease.inOut(lin(T, p.pullAt, p.pullAt + 0.5)) * (1 - ease.inOut(lin(T, p.pullOut, p.pullOut + 0.5)));
      const X = [0, 1, 2].map(i => lerp(stdX[i], altX[i], ru)), Yc = [0, 1, 2].map(i => lerp(0, altY[i], ru)), Sc = [0, 1, 2].map(i => lerp(1, altS[i], ru));
      X[0] = lerp(X[0], -140, pk); X[1] = lerp(X[1], 140, pk); X[2] = lerp(X[2], 560, pk);
      const openK = i => { let k = 0; for (const [ci, a, b] of p.opens) if (ci === i) { const bb = loop && b < NEVER ? NEVER : b; k = Math.max(k, ease.out(lin(T, a, a + 0.38)) * (1 - ease.in(lin(T, bb, bb + 0.3)))); } return k; };
      // desk
      g.save(); const dg = g.createLinearGradient(0, 100, 0, 172); dg.addColorStop(0, shade(th.navy, 0.22)); dg.addColorStop(1, shade(th.navy, -0.12));
      B.shadowed(g, () => rr(g, -500, 100, 1000, 74, 22), th.navy, 0.2); rr(g, -500, 100, 1000, 74, 22); g.fillStyle = dg; g.fill(); g.fillStyle = 'rgba(255,255,255,.22)'; g.fillRect(-488, 102, 976, 3); g.restore();
      // cases
      const order = p.alt && ru > 0.5 ? [2, 0, 1] : [0, 1, 2];
      for (const i of order) {
        const ls = p.slam[i] < -0.5 ? 9 : T - p.slam[i]; if (ls < 0) continue; const drop = ls < 0.16 ? ease.in(clamp(ls / 0.16)) : 1, land = ls - 0.16;
        const sq = land > 0 ? 1 - 0.1 * hit(land, 9) * Math.cos(land * 24) : 1;
        g.save(); g.translate(X[i], Yc[i] + (1 - drop) * -520); g.scale(Sc[i] * (1 + (1 - sq) * 0.6), Sc[i] * sq); g.translate(0, (1 - sq) * 80);
        const dim = i === 2 ? clamp(1 - 0.55 * pk) : 1; g.globalAlpha *= dim;
        bcase(g, th, { open: openK(i), lift: land > 0 ? 0 : 0.4 });
        // number disc
        const nk = spring(T - p.numAt - i * 0.12, 'bouncy'); if (T - p.numAt - i * 0.12 > 0) { g.save(); g.translate(-96, -66); g.scale(nk, nk); clay(g, -29, -29, 58, 58, 29, th.paper, { shadowK: 0.5 }); txt(g, String(i + 1), 0, 3, F.hero(44), th.ink); g.restore(); }
        // YOUR PICK tag
        if (i === p.pickIdx) { const pt = T - p.pickAt; if (pt > 0) { const k = spring(pt, { f: 2.4, z: 0.42 }), sq2 = 1 + 0.5 * hit(pt, 6); g.save(); g.translate(0, 38); g.rotate(-0.07 + 0.2 * (1 - k)); g.scale(0.5 + 0.5 * k, (0.5 + 0.5 * k) / (pt < 0.12 ? 1 : 1)); g.globalAlpha *= clamp(pt / 0.06);
          clay(g, -118, -36, 236, 72, 16, th.accent, { shadowK: 0.7 }); g.fillStyle = th.ink; g.beginPath(); g.arc(-92, 0, 9, 0, 7); g.fill(); txt(g, 'YOUR PICK', 14, 3, F.hero(44), th.ink); g.restore(); burst(g, 0, 38, 190, th.accent, pt - 0.05, 12, 0.4); } }
        g.restore();
        if (land > 0 && land < 0.4 && !loop) burst(g, X[i], 98, 230, th.paper, land, 12, 0.38);
      }
      // $1,000,000 tag swinging off a handle, then settling on the desk
      const tIn = p.tagIn < -0.5 ? 9 : T - p.tagIn;
      if (tIn > 0) { const away = ease.inOut(lin(T, p.tagAway, p.tagAway + 0.55)), hx = X[p.tagIdx], hy = Yc[p.tagIdx] - 138 + 6, ang = 0.34 * Math.exp(-0.18 * T) * Math.sin(T * 5.6 + 0.4) + 0.05 * Math.sin(T * 1.9);
        g.save(); const bx = hx, by = hy; const dx = lerp(bx, -395, away), dy = lerp(by, 126, away), rr0 = lerp(ang, -0.09, away), sc = lerp(1, 0.62, away); g.translate(dx, dy); g.rotate(rr0); g.scale(sc, sc);
        g.strokeStyle = rgba(th.paper, 0.9); g.lineWidth = 4; g.beginPath(); g.moveTo(0, 0); g.lineTo(0, 54 * (1 - away)); g.stroke();
        g.translate(0, 54 * (1 - away) + 46); clay(g, -165, -46, 330, 92, 20, th.good, { shadowK: 0.7 }); g.fillStyle = th.ink; g.beginPath(); g.arc(0, -30, 9, 0, 7); g.fill(); txt(g, '$1,000,000', 0, 8, F.hero(62), th.ink); g.restore(); }
      // host hand + x-ray
      const hs = T - p.handAt;
      if (hs > 0) { const hi = p.handIdx, fs = T - p.flipAt, ok = ease.out(lin(fs, 0, 0.38)), x = X[hi] + 40, tipHover = -118, tipFlip = -88 - 152 * ok;
        const ap = ease.out(lin(hs, 0, 0.6)), wd = ease.in(lin(fs, 1.15, 1.75)), tipY = (fs > 0 ? lerp(tipHover, tipFlip, 1) : tipHover + 8 * Math.sin(hs * 6) * ap);
        const hx = lerp(X[hi] + 520, x, ap) + wd * 560, hy = lerp(-560, tipY, ap) - wd * 360 + (fs > 0 && fs < 0.38 ? 0 : 0);
        g.save(); g.translate(hx, hy); g.rotate(-0.12 + 0.12 * ap); glove(g, th); g.restore(); }
      const xs = T - p.xrayAt; if (xs > 0 && xs < 1.1) { const u = ease.inOut(xs / 1.1), bxp = lerp(-640, 640, u), bw = 150;
        g.save(); g.beginPath(); g.rect(bxp - bw / 2, -230, bw, 480); g.clip(); g.fillStyle = 'rgba(11,15,20,.88)'; g.fillRect(bxp - bw / 2, -230, bw, 480);
        g.strokeStyle = rgba(th.paper, 0.9); g.lineWidth = 4; g.setLineDash([12, 9]); for (let i = 0; i < 3; i++) { g.save(); g.translate(X[i], 0); rr(g, -135, -95, 270, 190, 24); g.stroke(); g.setLineDash([]); if (i === 1) { for (let b = 0; b < 3; b++) { g.fillStyle = th.good; rr(g, -70 + b * 12, -34 + b * 20, 130, 34, 5); g.fill(); } txt(g, '$', 0, -4, F.hero(60), th.ink); } else txt(g, '—', 0, 0, F.hero(50), rgba(th.paper, 0.6)); g.setLineDash([12, 9]); g.restore(); }
        g.restore(); g.save(); g.strokeStyle = th.accent; g.lineWidth = 6; g.beginPath(); g.moveTo(bxp, -230); g.lineTo(bxp, 250); g.stroke(); g.restore(); }
      // swap arrows + 50/50
      const sw = T - p.swapAt, ck = T - p.crackAt;
      if (sw > 0 && ck < 0.9) { const k = spring(sw, 'bouncy'), bob = Math.sin(sw * 9) * 8; g.save(); g.globalAlpha *= clamp(1 - ck * 3); g.translate(0, -170 + bob); g.scale(0.5 + 0.5 * k, 0.5 + 0.5 * k); g.strokeStyle = th.accent; g.lineWidth = 18; g.lineCap = 'round'; g.lineJoin = 'round';
        g.beginPath(); g.moveTo(-125, 24); g.quadraticCurveTo(0, -70, 125, 24); g.stroke(); g.beginPath(); g.moveTo(125, 24); g.lineTo(96, -2); g.moveTo(125, 24); g.lineTo(100, 52); g.stroke();
        g.beginPath(); g.moveTo(-125, 24); g.lineTo(-96, -2); g.moveTo(-125, 24); g.lineTo(-100, 52); g.stroke(); g.restore(); }
      const fo = T - p.fiftyAt;
      if (fo > 0 && ck < 0.95) { const k = spring(fo, { f: 2.5, z: 0.36 }), s = 0.25 + 0.75 * k; const f = F.hero(215), half = (side, fall) => { g.save(); g.translate(0, -330); if (fall) { const q = fall; g.translate(side * 90 * q, 420 * q * q); g.rotate(side * 0.7 * q); g.globalAlpha *= clamp(1 - (q - 0.5) * 1.6); } g.scale(s, s);
          g.beginPath(); if (side < 0) { g.moveTo(-600, -300); g.lineTo(-12, -300); g.lineTo(12, -90); g.lineTo(-18, 20); g.lineTo(6, 160); g.lineTo(-600, 160); } else { g.moveTo(600, -300); g.lineTo(-12, -300); g.lineTo(12, -90); g.lineTo(-18, 20); g.lineTo(6, 160); g.lineTo(600, 160); } g.closePath(); g.clip();
          marker(g, -250, -100, 500, 200, th.accent, clamp(fo / 0.35), 0.38); txt(g, '50/50?', 0, 0, f, th.paper); g.restore(); };
        const fall = ck > 0 ? clamp(ck / 0.9) : 0; g.save(); g.globalAlpha *= clamp(fo / 0.06); half(-1, fall); half(1, fall); g.restore();
        if (p.fiftyLabel && ck < 0.1) { g.save(); g.globalAlpha *= clamp(fo / 0.1); txt(g, 'STAY or SWITCH?', 0, -498, F.cap(46), th.paper); g.restore(); }
        if (ck > 0 && ck < 0.35) { g.save(); g.translate(0, -330); g.strokeStyle = th.ink; g.lineWidth = 7; g.lineCap = 'round'; g.beginPath(); g.moveTo(-6, -130 * lin(ck, 0, 0.12)); g.lineTo(12, -90 * lin(ck, 0, 0.1)); g.lineTo(-18, 20 * lin(ck, 0.05, 0.2)); g.lineTo(6, 130 * lin(ck, 0.1, 0.3)); g.stroke(); g.restore(); }
        burst(g, 0, -330, 420, th.accent, fo - 0.05, 16, 0.5); }
      // odds bars
      const base = -150, full = 300, bar = (x, h, col, top) => { if (h < 1) return; clay(g, x - 58, base - h, 116, h, 14, col, { shadowK: 0.55 }); g.save(); rr(g, x - 58, base - h, 116, h, 14); g.clip(); g.fillStyle = 'rgba(0,0,0,.09)'; for (let y = base - 24; y > base - h; y -= 24) g.fillRect(x - 58, y, 116, 3); g.restore(); };
      const track = (x, a) => { g.save(); g.globalAlpha *= a; g.strokeStyle = rgba(th.paper, 0.28); g.lineWidth = 3; g.setLineDash([9, 9]); rr(g, x - 62, base - full - 4, 124, full + 8, 16); g.stroke(); g.setLineDash([]); g.restore(); };
      const l0 = T - p.lockAt, s0 = T - p.slideAt, b2 = T - p.bars2At;
      if (b2 > 0) { // payoff bars (IG): stay 1/3, switch 2/3
        const k0 = spring(b2, { f: 2.2, z: 0.5 }), k1 = spring(b2 - p.bars2Gap, { f: 2.2, z: 0.5 }), t1 = b2 - p.bars2Gap; track(X[0], 1); track(X[1], 1);
        g.save(); g.translate(0, -(1 - clamp(k0, 0, 1.2)) * 80); bar(X[0], full / 3 * clamp(k0, 0, 1.15), th.gold); g.restore(); g.save(); if (t1 > 0) { bar(X[1], full * 2 / 3 * clamp(k1, 0, 1.15), th.good); } g.restore();
        if (b2 > 0.12) pillTag(g, th, 'STAY · 1 IN 3', X[0], base - full / 3 - 56, th.gold, 44, spring(b2 - 0.12, 'bouncy'), th.ink);
        if (t1 > 0.12) { pillTag(g, th, 'SWITCH · 2 IN 3', X[1], base - full * 2 / 3 - 56, th.good, 44, spring(t1 - 0.12, 'bouncy'), th.ink); burst(g, X[1], base - full * 2 / 3, 300, th.good, t1 - 0.1, 16, 0.5); }
        if (b2 > 0.4) { g.save(); g.globalAlpha *= clamp((b2 - 0.4) / 0.2); txt(g, '= 33.33%', X[0], base + 8 + 6, F.monoX(26), th.paper); if (t1 > 0.4) txt(g, '= 66.67%', X[1], base + 8 + 6, F.monoX(26), th.paper); g.restore(); }
      }
      if (l0 > 0) {
        const k0 = clamp(spring(l0, 'bouncy'), 0, 1.15), sl = s0 > 0 ? ease.inOut(lin(s0, 0, 0.55)) : 0, arrived = s0 > 0.5, st1 = s0 - 0.5;
        track(X[0], 1); bar(X[0], full / 3 * k0, th.gold);
        const tg0 = spring(l0 - 0.12, 'bouncy'); pillTag(g, th, '1 IN 3', X[0], base - full / 3 * k0 - 52, th.gold, 56, tg0, th.ink);
        if (l0 > 0.3) { const lk = l0 - 0.3, sq = 1 - 0.18 * hit(lk, 10); g.save(); g.translate(X[0] + 86, base - 22); g.scale(1, sq); clay(g, -26, -4, 52, 40, 8, th.ink, { shadowK: 0.4 }); g.strokeStyle = th.paper; g.lineWidth = 8; g.beginPath(); g.arc(0, -4, 15, Math.PI, 0); g.stroke(); g.fillStyle = th.gold; g.beginPath(); g.arc(0, 16, 6, 0, 7); g.fill(); g.restore(); burst(g, X[0] + 86, base - 22, 120, th.paper, lk - 0.02, 10, 0.3); }
        const e1 = l0 - 0.5, e2 = l0 - 0.7; track(X[1], clamp(e1 / 0.2)); track(X[2], clamp(e2 / 0.2));
        if (e1 > 0) { const h1 = full / 3 * clamp(spring(e1, 'bouncy'), 0, 1.1) + (arrived ? full / 3 * clamp(spring(st1, 'bouncy'), 0, 1.1) : 0); const c1 = arrived ? mix(BLUEBAR, th.good, clamp(st1 / 0.2)) : BLUEBAR; bar(X[1], h1, c1); }
        if (e2 > 0 && sl < 1) { const h2 = full / 3 * clamp(spring(e2, 'bouncy'), 0, 1.1), xx = lerp(X[2], X[1], sl), yy = -Math.sin(Math.PI * sl) * 150; g.save(); g.translate(0, yy); g.globalAlpha *= 1 - 0.0; bar(xx, h2, sl > 0 ? shade(BLUEBAR, 0.1) : BLUEBAR); g.restore(); }
        if (s0 > 0.45) { const tk = spring(s0 - 0.45, { f: 2.4, z: 0.45 }); pillTag(g, th, '2 IN 3', X[1], base - full * 2 / 3 - 56, th.good, 64, tk, th.ink); burst(g, X[1], base - full * 2 / 3, 300, th.good, s0 - 0.5, 16, 0.5);
          g.save(); g.globalAlpha *= clamp((s0 - 0.7) / 0.2); txt(g, '= 66.67%', X[1], base + 14, F.monoX(26), th.paper); g.restore(); }
        else if (e1 > 0.3) { g.save(); g.globalAlpha *= clamp((e1 - 0.3) / 0.2); txt(g, '= 33.33%', X[0], base + 14, F.monoX(26), th.paper); g.restore(); }
      }
      // STAY / SWITCH buttons
      const bt = T - p.btnAt;
      if (bt > 0) { const win = T - p.winAt; [0, 1].forEach(i => { const k = spring(bt - i * 0.1, 'bouncy'), isSw = i === 1, won = win > 0 && isSw, lost = win > 0 && !isSw; if (bt - i * 0.1 <= 0) return;
          g.save(); g.translate(X[i], 206 + (1 - clamp(k, 0, 1)) * 40); g.scale(clamp(k, 0.2, 1.1), clamp(k, 0.2, 1.1)); const pr = won ? 1 - 0.1 * hit(win, 9) : 1; g.scale(pr, pr); g.globalAlpha *= (lost ? 0.5 : 1) * clamp(k * 3);
          clay(g, -115, -36, 230, 72, 36, won ? th.good : isSw ? th.accent : th.paper, { shadowK: 0.7 }); txt(g, (won ? '✓ ' : '') + p.btnLabels[i], 0, 3, F.hero(44), th.ink); g.restore(); }); }
      // diplomas
      for (const [at, st, out, yr] of p.diploma) { if (loop && at > 2) continue; diploma(g, th, T - at, st > NEVER - 1 ? -9 : T - st, out > NEVER - 1 ? -9 : T - out, yr == null ? -150 : yr); }
    },
  });

  // ---------- fan100: 100 briefcases deal out, 98 pop open in a wave, one closed case left ----------
  B.register('fan100', {
    defaults: { dealAt: -1, pickAt: NEVER, waveAt: NEVER, stampAt: NEVER, awayAt: NEVER, pickIdx: 23, keepIdx: 67 }, size: () => [1000, 1000],
    anchors: p => { const s = i => [(i % 10 - 4.5) * 92, (Math.floor(i / 10) - 4.5) * 80 + 40]; return { all: [0, 0, 1000, 1000], pick: [...s(p.pickIdx), 200, 160], keep: [...s(p.keepIdx), 200, 160], count: [0, -440, 520, 130], grid: [0, 40, 940, 800] }; },
    draw(g, p, env) {
      const { t, theme: th } = env, slot = i => [(i % 10 - 4.5) * 92, (Math.floor(i / 10) - 4.5) * 80 + 40], pxy = slot(p.pickIdx), maxd = 12.5;
      const wt = i => p.waveAt + 1.0 * Math.hypot(slot(i)[0] - pxy[0], slot(i)[1] - pxy[1]) / 720 * (maxd / maxd);
      let opened = 0; for (let i = 0; i < 100; i++) if (i !== p.pickIdx && i !== p.keepIdx && t >= wt(i) + 0.1) opened++;
      const ks = t - p.stampAt, as = t - p.awayAt;
      const mini = (g, i, open, col, dim) => { g.save(); g.globalAlpha *= dim; const w = 74, h = 52;
        if (open > 0.02) { const lh = 40 * open; g.fillStyle = shade(col, -0.25); rr(g, -w / 2 + 3, -h / 2 - lh + 4, w - 6, lh, 7); g.fill(); }
        g.fillStyle = 'rgba(2,4,9,.4)'; rr(g, -w / 2 + 3, -h / 2 + 7, w, h, 9); g.fill();
        g.strokeStyle = '#2d3646'; g.lineWidth = 5; g.lineCap = 'round'; if (open < 0.15) { g.beginPath(); g.moveTo(-14, -h / 2 + 1); g.lineTo(-14, -h / 2 - 9); g.lineTo(14, -h / 2 - 9); g.lineTo(14, -h / 2 + 1); g.stroke(); }
        const lg = g.createLinearGradient(0, -h / 2, 0, h / 2); lg.addColorStop(0, shade(col, 0.22)); lg.addColorStop(1, shade(col, -0.2)); g.fillStyle = lg; rr(g, -w / 2, -h / 2, w, h, 9); g.fill();
        if (open > 0.05) { g.fillStyle = '#222a37'; rr(g, -w / 2 + 6, -h / 2 + 5, w - 12, h - 10, 5); g.fill(); g.fillStyle = th.paperShade; rr(g, -w / 2 + 10, -h / 2 + 9, w - 20, h - 18, 4); g.fill(); }
        else { g.fillStyle = 'rgba(0,0,0,.2)'; g.fillRect(-w / 2 + 2, -h / 2 + 17, w - 4, 2); g.fillStyle = GOLD; g.fillRect(-22, -h / 2 + 12, 11, 9); g.fillRect(11, -h / 2 + 12, 11, 9); }
        g.restore(); };
      for (let i = 0; i < 100; i++) {
        const [sx, sy] = slot(i), dl = t - p.dealAt - i * 0.011; if (dl < 0) continue; const u = ease.out(clamp(dl / 0.5)), fan = (i / 99 - 0.5) * 1.6;
        let x = lerp(0, sx, u), y = lerp(560, sy, u) - 90 * Math.sin(Math.PI * u), rot = lerp(fan, (hash(i * 5.3) - 0.5) * 0.06, u), s = lerp(0.45, 1, u), dim = 1, open = 0;
        const isP = i === p.pickIdx, isK = i === p.keepIdx; if (!isP && !isK) { open = ease.out(lin(t, wt(i), wt(i) + 0.22)); dim = 1 - 0.5 * open; }
        if (isK) { const kk = spring(t - (p.waveAt + 1.35), { f: 2.2, z: 0.5 }); if (t > p.waveAt + 1.35) s *= 1 + 0.5 * kk; }
        if (as > 0 && !isP && !isK) { const aa = ease.in(clamp((as - (i % 17) * 0.012) / 0.5)), ang = Math.atan2(sy, sx); x += Math.cos(ang) * 900 * aa; y += Math.sin(ang) * 900 * aa; dim *= 1 - aa; }
        g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s); mini(g, i, open, STEEL, dim);
        if (isP && t > p.pickAt) { const k = spring(t - p.pickAt, 'bouncy'); g.save(); g.translate(0, -52 * k - 20); g.scale(k, k); clay(g, -62, -22, 124, 44, 12, th.accent, { shadowK: 0.5 }); txt(g, 'YOUR PICK', 0, 2, F.hero(26), th.ink); g.restore(); }
        if (isK && ks > 0) { const k = ease.expo(lin(ks, 0, 0.14)), sc = 1 + 1.6 * (1 - k); g.save(); g.translate(0, -70); g.rotate(-0.1); g.scale(sc, sc); clay(g, -92, -50, 184, 100, 20, th.good, { shadowK: 0.8 }); txt(g, '99%', 0, 4, F.hero(86), th.ink); g.restore(); burst(g, 0, -70, 240, th.good, ks - 0.1, 16, 0.5); }
        if (isP && ks > 0.5) { const k = spring(ks - 0.5, 'bouncy'); g.save(); g.translate(0, 56); g.scale(k, k); clay(g, -40, -22, 80, 44, 12, th.bad, { shadowK: 0.5 }); txt(g, '1%', 0, 2, F.hero(34), th.paper); g.restore(); }
        g.restore();
      }
      if (t > p.waveAt) { const k = spring(t - p.waveAt, 'bouncy'), cx = 0, cy = -440; g.save(); g.translate(cx, cy); g.scale(0.5 + 0.5 * k, 0.5 + 0.5 * k); g.globalAlpha *= clamp((t - p.waveAt) / 0.08) * (1 - ease.in(clamp(as / 0.3)));
        paper(g, -250, -56, 500, 112, 22, {}); txt(g, String(opened), -150, 4, F.hero(88), th.badInk); txt(g, 'OPENED · ALL EMPTY', 48, 6, F.monoX(30), th.ink); g.restore(); }
    },
  });

  // ---------- mail: the letter avalanche ----------
  B.register('mail', {
    defaults: { t0: -1, t1: 1, n: 64, countAt: NEVER, stampAt: NEVER }, size: () => [900, 1000],
    anchors: () => ({ all: [0, 0, 900, 1000], head: [0, -440, 760, 120], count: [0, -270, 760, 220], pile: [0, 330, 820, 460] }),
    draw(g, p, env) {
      const { t, theme: th } = env, lt = env.lt;
      for (let i = 0; i < p.n; i++) {
        const ts = p.t0 + i * (p.t1 - p.t0) / p.n, fl = t - ts; if (fl < 0) continue; const u = ease.in(clamp(fl / 0.5)), rest = i / p.n, x = (hash(i * 3.3) - 0.5) * 2 * 330 * (1 - 0.45 * Math.pow(rest, 0.8)), mound = 340 * (1 - Math.pow(x / 400, 2)) * (0.25 + 0.75 * Math.pow(rest, 0.7)), yr = 450 - mound + (hash(i * 7.1) - 0.5) * 34;
        const y = lerp(-1200, yr, u), rot = (hash(i * 1.7) - 0.5) * 1.0 * (1 - 0.3 * u) + (1 - u) * 1.2, sq = fl > 0.5 ? 1 - 0.12 * hit(fl - 0.5, 10) : 1; g.save(); g.translate(x, y); g.rotate(rot); g.scale(1, sq);
        paper(g, -76, -50, 152, 100, 8, { lift: 0 }); g.strokeStyle = 'rgba(11,15,20,.22)'; g.lineWidth = 3; g.beginPath(); g.moveTo(-76, -50); g.lineTo(0, 6); g.lineTo(76, -50); g.stroke();
        if (i % 5 === 1 && t > p.stampAt + (i % 15) * 0.03) { const ss = t - p.stampAt - (i % 15) * 0.03, k = ease.expo(lin(ss, 0, 0.12)); g.save(); g.translate(30, 18); g.rotate(-0.3); g.scale(1 + 1.4 * (1 - k), 1 + 1.4 * (1 - k)); g.fillStyle = th.bad; g.beginPath(); g.arc(0, 0, 26, 0, 7); g.fill(); txt(g, 'PhD', 0, 2, F.hero(24), th.paper); g.restore(); }
        else { g.fillStyle = th.rule; g.fillRect(-52, 14, 70, 7); g.fillRect(-52, 28, 48, 7); }
        g.restore();
      }
      // header + counter cards
      const k = spring(lt, 'snappy'); g.save(); g.globalAlpha *= clamp(lt / 0.1); g.translate(0, -440 + (1 - k) * -40);
      paper(g, -380, -56, 760, 112, 22, {}); g.save(); rr(g, -380, -56, 760, 112, 22); g.clip(); g.fillStyle = th.navy; g.fillRect(-380, -56, 760, 112); g.restore(); txt(g, 'MAGAZINE COLUMN · 1990', 0, -4, F.hero(56), th.paper); txt(g, 'ILLUSTRATION · LETTERS NOT REAL', 0, 36, F.mono(21), rgba(th.paper, 0.7)); g.restore();
      const cs = t - p.countAt; if (cs > -0.1) { const kk = spring(cs + 0.1, 'bouncy'); g.save(); g.translate(0, -270); g.scale(0.6 + 0.4 * kk, 0.6 + 0.4 * kk); g.globalAlpha *= clamp((cs + 0.1) / 0.1);
        paper(g, -380, -100, 760, 200, 24, {}); const cu = ease.expo(lin(cs, 0, 1.3)); roll(g, Math.round(1000 * cu), 335, -6, { font: F.hero(150), size: 150, color: th.badInk, align: 'right', speed: cu < 1 ? 900 : 0 });
        txt(g, 'NEARLY', -340, -52, F.monoX(30), th.inkSoft, 'left'); txt(g, 'PhD LETTERS', -340, -8, F.hero(46), th.ink, 'left'); txt(g, 'BY HER COUNT · OF ≈10,000 TOTAL', 0, 74, F.monoX(24), th.inkSoft); g.restore(); }
    },
  });

  // ---------- tally: simulated rounds as a bar race (OUR MATH) / kitchen-table tally marks ----------
  const SIM = (() => { // seeded simulation of the real game (host always opens an empty case): stay wins iff the first pick was the money
    const N = 300; let best = null; for (let seed = 1; seed < 400; seed++) { let sw = 0; const cum = [0]; for (let r = 0; r < N; r++) { const car = Math.floor(hash(r * 7.31 + seed * 131.7) * 3), pick = Math.floor(hash(r * 3.77 + seed * 71.3 + 0.5) * 3); sw += car === pick ? 0 : 1; cum.push(sw); } if (!best || Math.abs(sw - 200) < Math.abs(best.sw - 200)) best = { seed, sw, cum }; if (sw === 200) break; } return best; })();
  B.SIM = SIM;
  B.register('tally', {
    defaults: { variant: 'race', t0: -1, t1: 1, doneAt: NEVER, markAt: NEVER, hostAt: NEVER }, size: p => (p.variant === 'race' ? [900, 760] : [920, 1000]),
    anchors: p => (p.variant === 'race' ? { all: [0, 0, 900, 760], head: [0, -310, 800, 120], stay: [0, -40, 820, 150], sw: [0, 130, 820, 150], bars: [0, 45, 820, 330], done: [0, 300, 820, 150] } : { all: [0, 0, 920, 1000], board: [0, -230, 860, 460], host: [0, 250, 700, 520], sw: [215, -200, 400, 360] }),
    draw(g, p, env) {
      const { t, theme: th } = env, lt = env.lt;
      if (p.variant === 'race') {
        const u = ease.inOut(lin(t, p.t0, p.t1)), n = Math.round(300 * u), sw = SIM.cum[n], st = n - sw, mx = Math.max(sw, st, 1), k = spring(lt, 'snappy'); g.save(); g.scale(0.9 + 0.1 * k, 0.9 + 0.1 * k);
        paper(g, -450, -380, 900, 760, 28, {}); g.save(); rr(g, -450, -380, 900, 760, 28); g.clip(); g.fillStyle = th.navy; g.fillRect(-450, -380, 900, 130); g.restore();
        txt(g, 'OUR MATH', -410, -330, F.hero(60), th.paper, 'left'); txt(g, '300 SIMULATED ROUNDS · HOST ALWAYS OPENS AN EMPTY CASE', -408, -282, F.mono(20), rgba(th.paper, 0.75), 'left');
        txt(g, 'ROUND', 285, -335, F.monoX(24), rgba(th.paper, 0.8), 'right'); roll(g, n, 410, -312, { font: F.hero(96), size: 96, color: th.accent, align: 'right', speed: u > 0 && u < 1 ? 420 : 0 });
        const row = (y, label, val, col, lead) => { const bw = 520 * (val / Math.max(mx, 1)) * (n ? 1 : 0); txt(g, label, -400, y, F.hero(54), th.ink, 'left'); clay(g, -240, y - 38, Math.max(10, bw * 0.92), 76, 16, col, { shadowK: 0.6 }); roll(g, val, -240 + Math.max(10, bw * 0.92) + 20, y + 2, { font: F.hero(60), size: 60, color: th.ink, align: 'left', speed: u > 0 && u < 1 ? 160 : 0 }); };
        row(-120, 'STAY', st, th.gold); row(50, 'SWITCH', sw, th.good);
        g.strokeStyle = th.rule; g.lineWidth = 3; g.setLineDash([10, 9]); g.beginPath(); g.moveTo(-410, 138); g.lineTo(410, 138); g.stroke(); g.setLineDash([]);
        const dn = t - p.doneAt; if (dn > 0) { const dk = spring(dn, 'bouncy'); g.save(); g.translate(0, 232); g.scale(0.5 + 0.5 * dk, 0.5 + 0.5 * dk); g.globalAlpha *= clamp(dn / 0.08); clay(g, -330, -62, 660, 124, 26, th.good, { shadowK: 0.7 }); txt(g, 'SWITCH WINS ≈ 2 OUT OF 3', 0, -10, F.hero(62), th.ink); txt(g, '1,000,000 GAMES (OUR SIM): SWITCH WON 66.59%', 0, 38, F.monoX(21), th.ink); g.restore(); burst(g, 0, 232, 360, th.good, dn - 0.05, 16, 0.5); }
        else { txt(g, 'WINS SO FAR', 0, 232, F.monoX(26), th.inkSoft); }
        g.restore();
      } else { // kitchen: paper host silhouette (no likeness) + tally board
        const k = spring(lt, 'soft'); g.save(); g.translate(0, (1 - k) * -700); const seq = [1, 1, 0, 1, 1, 1, 0, 1, 1, 1]; // 1 = switch won
        paper(g, -430, -460, 860, 460, 26, {}); g.save(); rr(g, -430, -460, 860, 460, 26); g.clip(); g.fillStyle = th.navy; g.fillRect(-430, -460, 860, 90); g.restore();
        txt(g, 'HIS KITCHEN-TABLE TRIAL', -400, -415, F.hero(46), th.paper, 'left'); txt(g, 'ILLUSTRATION', 400, -415, F.monoX(24), th.accent, 'right');
        g.strokeStyle = th.rule; g.lineWidth = 3; g.beginPath(); g.moveTo(0, -360); g.lineTo(0, -30); g.stroke(); txt(g, 'STAY', -215, -335, F.hero(52), th.ink); txt(g, 'SWITCH', 215, -335, F.hero(52), th.goodInk);
        const cnt = [0, 0]; for (let i = 0; i < 10; i++) { const at = p.markAt + i * 0.3, col = seq[i] ? 1 : 0, idx = cnt[col]++; if (t < at) continue; const m = spring(t - at, 'bouncy'), grp = Math.floor(idx / 5), pos = idx % 5, ox = col ? 215 : -215, gx = ox - 70 + grp * 150, gy = -200;
          g.save(); g.strokeStyle = col ? th.goodInk : th.badInk; g.lineWidth = 11; g.lineCap = 'round'; g.globalAlpha *= clamp((t - at) / 0.05);
          const mm = clamp(m, 0, 1.08); if (pos < 4) { const x = gx + pos * 26; g.beginPath(); g.moveTo(x, gy - 60); g.lineTo(x, gy - 60 + 120 * mm); g.stroke(); }
          else { g.beginPath(); g.moveTo(gx - 16, gy + 52); g.lineTo(gx - 16 + 124 * mm, gy + 52 - 104 * mm); g.stroke(); }
          g.restore(); if (t - at < 0.3) burst(g, gx + pos * 26, gy, 90, col ? th.good : th.bad, t - at - 0.02, 8, 0.25); }
        g.restore();
        // the table + host silhouette
        g.save(); const hk = spring(t - p.hostAt, 'soft'); if (t > p.hostAt - 0.01) { g.translate(0, (1 - clamp(hk, 0, 1.1)) * 600);
          g.fillStyle = '#9aa3b2'; g.beginPath(); g.arc(0, 90, 74, 0, 7); g.fill(); g.beginPath(); g.moveTo(-170, 330); g.quadraticCurveTo(-170, 190, 0, 190); g.quadraticCurveTo(170, 190, 170, 330); g.closePath(); g.fill(); g.fillStyle = 'rgba(11,15,20,.1)'; g.fillRect(-170, 190, 340, 10);
          clay(g, -330, 320, 660, 60, 18, shade(th.navy, 0.12), { shadowK: 0.7 }); clay(g, -250, 258, 150, 66, 14, STEEL, { shadowK: 0.5 }); clay(g, 100, 258, 150, 66, 14, STEEL, { shadowK: 0.5 });
          txt(g, 'ILLUSTRATION · NO LIKENESS', 0, 440, F.monoX(22), th.accent); }
        g.restore();
        const dn = t - p.doneAt; if (dn > 0) { const dk = spring(dn, 'bouncy'); g.save(); g.translate(215, -120); g.scale(0.5 + 0.5 * dk, 0.5 + 0.5 * dk); g.rotate(-0.05); clay(g, -190, -60, 380, 120, 24, th.good, { shadowK: 0.8 }); txt(g, 'SWITCHING WON', 0, 4, F.hero(60), th.ink); g.restore(); burst(g, 215, -120, 330, th.good, dn - 0.05, 16, 0.5); }
      }
    },
  });

  // ---------- assumes: pinned screen chip ----------
  B.register('assumes', {
    defaults: { text: 'HOST KNOWS · ALWAYS OPENS AN EMPTY CASE', size: 22 }, ownEnter: true, size: p => [mw(p.text, F.monoX(p.size)) + mw('ASSUMES', F.monoX(p.size)) + 90, p.size * 2.3],
    draw(g, p, env) { const f = F.monoX(p.size), lw = mw('ASSUMES', f) + 36, w = lw + mw(p.text, f) + 40, h = p.size * 2.3, k = spring(env.lt, 'bouncy'); g.translate(-w / 2, 0); g.scale(0.6 + 0.4 * k, 0.6 + 0.4 * k); g.globalAlpha *= clamp(env.lt / 0.1);
      clay(g, 0, -h / 2, w, h, h / 2, '#0B0F14', { shadowK: 0.5 }); g.strokeStyle = env.theme.accent; g.lineWidth = 3; rr(g, 0, -h / 2, w, h, h / 2); g.stroke();
      g.fillStyle = env.theme.accent; rr(g, 6, -h / 2 + 6, lw, h - 12, (h - 12) / 2); g.fill(); txt(g, 'ASSUMES', 6 + lw / 2, 2, f, env.theme.ink); txt(g, p.text, lw + 26, 2, f, env.theme.paper, 'left'); },
  });
  B.register('chip', {
    defaults: { text: 'HYPOTHETICAL', size: 28, tone: 'paper' }, ownEnter: true, size: p => [mw(p.text, F.monoX(p.size)) + 56, p.size * 2],
    draw(g, p, env) { const [w, h] = this.size(p), k = spring(env.lt, 'bouncy'), th = env.theme; g.scale(0.6 + 0.4 * k, 0.6 + 0.4 * k); g.globalAlpha *= clamp(env.lt / 0.1);
      clay(g, -w / 2, -h / 2, w, h, h / 2, '#0B0F14', { shadowK: 0.5 }); g.strokeStyle = th.accent; g.lineWidth = 3; rr(g, -w / 2, -h / 2, w, h, h / 2); g.stroke(); txt(g, p.text, 0, 2, F.monoX(p.size), th.accent); },
  });
  B.register('heart', {
    defaults: { s: 1, dur: 0.9 }, ownEnter: true, size: () => [160, 160],
    draw(g, p, env) { const lt = env.lt, k = B.spring(lt, { f: 2.6, z: 0.38 }), beat = 1 + 0.22 * Math.max(0, Math.sin((lt - 0.28) * 14)) * Math.exp(-(lt - 0.28) * 3) * (lt > 0.28 ? 1 : 0), fade = 1 - lin(lt, p.dur - 0.25, p.dur), s = p.s * (0.2 + 0.8 * k) * beat;
      g.globalAlpha *= clamp(lt / 0.06) * fade; g.rotate(-0.12); g.scale(s, s);
      const path = () => { g.beginPath(); g.moveTo(0, 56); g.bezierCurveTo(-90, -4, -62, -74, 0, -30); g.bezierCurveTo(62, -74, 90, -4, 0, 56); g.closePath(); };
      B.shadowed(g, path, '#FF3B30', 0.4); g.fillStyle = '#FF3B30'; path(); g.fill(); g.fillStyle = 'rgba(255,255,255,.35)'; g.beginPath(); g.ellipse(-34, -26, 14, 9, -0.6, 0, 7); g.fill();
      const r = lin(lt, 0.25, 0.8); if (r > 0 && r < 1) { g.strokeStyle = rgba('#FF3B30', 1 - r); g.lineWidth = 6; g.save(); g.scale(1 + 0.8 * ease.out(r), 1 + 0.8 * ease.out(r)); path(); g.stroke(); g.restore(); } },
  });
  B.register('plane', {
    defaults: { from: [120, 1050], to: [1180, 300], dur: 1.5, s: 1 }, ownEnter: true, size: () => [10, 10],
    draw(g, p, env) { const lt = env.lt, u = clamp(lt / p.dur), e = ease.inOut(u), [x0, y0] = p.from, [x1, y1] = p.to, cx = (x0 + x1) / 2 - 80, cy = Math.max(y0, y1) + 160;
      const P = k => { const a = (1 - k) * (1 - k), b = 2 * (1 - k) * k, c = k * k; return [a * x0 + b * cx + c * x1, a * y0 + b * cy + c * y1]; };
      g.strokeStyle = rgba(env.theme.paper, 0.5); g.lineWidth = 5; g.setLineDash([4, 18]); g.lineCap = 'round'; g.beginPath(); for (let i = 0; i <= 24; i++) { const [px, py] = P(e * i / 24); i ? g.lineTo(px, py) : g.moveTo(px, py); } g.stroke(); g.setLineDash([]);
      const [px, py] = P(e), [qx, qy] = P(Math.min(1, e + 0.02)), a = Math.atan2(qy - py, qx - px), s = p.s * (1 + 0.35 * Math.sin(Math.PI * u) - 0.25 * u);
      g.save(); g.translate(px, py); g.rotate(a); g.scale(s, s); const sh = () => { g.beginPath(); g.moveTo(70, 0); g.lineTo(-60, -44); g.lineTo(-34, 0); g.lineTo(-60, 44); g.closePath(); };
      B.shadowed(g, sh, '#F5F3EE', 0.5); g.fillStyle = '#F5F3EE'; sh(); g.fill(); g.fillStyle = '#D8D3C7'; g.beginPath(); g.moveTo(70, 0); g.lineTo(-34, 0); g.lineTo(-60, 44); g.closePath(); g.fill(); g.strokeStyle = 'rgba(11,15,20,.35)'; g.lineWidth = 2; g.beginPath(); g.moveTo(70, 0); g.lineTo(-34, 0); g.stroke(); g.restore(); },
  });
})();
// ===== three-briefcases v3 (63-66 s re-edit) — extra recipes: live (real seeded 1,000-game tally HUD), blabel (beat label),
// board3 (the three possible starts, numbered boxes that open one at a time), calendar ($100 a day), column (1990 magazine column).
// Registered after cases.js; every draw is a pure function of env.t (the simulation is precomputed once, deterministic).
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, hash, hit, shade, mix } = B;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const NEVER = 99000;

  // ---------- the real simulation: 1,000 seeded games of the actual rules (host knows, always opens an empty case) ----------
  const SIM1K = (() => {
    const N = 1000; let best = null;
    for (let seed = 1; seed < 300; seed++) {
      let sw = 0; const cum = [0];
      for (let r = 0; r < N; r++) {
        const money = Math.floor(hash(r * 7.31 + seed * 131.7) * 3), pick = Math.floor(hash(r * 3.77 + seed * 71.3 + 0.5) * 3);
        // host opens an empty case that is neither the pick nor the money, then offers the swap: switching wins iff the first pick was empty
        sw += pick === money ? 0 : 1; cum.push(sw);
      }
      const early = cum[60] / 60, pen = Math.abs(early - 0.667) > 0.15 ? 50 : 0, score = Math.abs(sw - 667) + pen;
      if (!best || score < best.score) best = { seed, sw, cum, score };
      if (best.score <= 1) break;
    }
    return best;
  })();
  B.SIM1K = SIM1K;

  // ---------- live: always-on tally card (screen layer). props: end (seconds when game 1,000 is played) ----------
  B.register('live', {
    defaults: { end: 60, n0: 14, title: 'LIVE SIM · REAL RULES' }, ownEnter: true, size: () => [940, 104],
    draw(g, p, env) {
      const { t, theme: th } = env, N = 1000, u = clamp(t / p.end), n = Math.min(N, Math.floor(p.n0 + (N - p.n0) * (u * (1.15 - 0.15 * u)))), sw = SIM1K.cum[n], st = n - sw;
      const W = 940, H = 100; g.save(); g.translate(-W / 2, -H / 2);
      B.shadowed(g, () => rr(g, 0, 0, W, H, 22), '#0B0F14', 0.5); rr(g, 0, 0, W, H, 22); g.fillStyle = 'rgba(11,15,20,.93)'; g.fill(); g.strokeStyle = rgba(th.paper, 0.22); g.lineWidth = 2; g.stroke();
      txt(g, p.title, 26, 24, F.monoX(17), rgba(th.paper, 0.7), 'left');
      txt(g, 'GAME', 26, 62, F.monoX(18), rgba(th.paper, 0.6), 'left'); txt(g, String(n).padStart(4, '0'), 108, 66, F.monoX(40), th.paper, 'left');
      txt(g, '/ 1,000', 232, 70, F.monoX(18), rgba(th.paper, 0.6), 'left');
      const pc = x => (n ? (100 * x / n).toFixed(1) + '%' : '0%');
      txt(g, 'STAY', 380, 28, F.hero(26), th.gold, 'left'); txt(g, String(st), 380, 66, F.monoX(34), th.paper, 'left'); txt(g, pc(st), 478, 68, F.monoX(22), th.gold, 'left');
      txt(g, 'SWITCH', 650, 28, F.hero(26), th.good, 'left'); txt(g, String(sw), 650, 66, F.monoX(34), th.paper, 'left'); txt(g, pc(sw), 748, 68, F.monoX(22), th.good, 'left');
      const bx = 26, bw = W - 52, by = H - 16; g.fillStyle = rgba(th.paper, 0.12); rr(g, bx, by, bw, 8, 4); g.fill();
      const f = n ? st / n : 0.5; g.fillStyle = th.gold; rr(g, bx, by, Math.max(8, bw * f), 8, 4); g.fill(); g.fillStyle = th.good; rr(g, bx + bw * f + 2, by, Math.max(8, bw * (1 - f) - 2), 8, 4); g.fill();
      g.fillStyle = th.paper; g.fillRect(bx + bw * 0.3333 - 1, by - 4, 3, 16);
      g.restore();
    },
  });

  // ---------- blabel: the pinned beat label. props: labels [[at, 'THE BET'], ...] ----------
  B.register('blabel', {
    defaults: { labels: [], size: 25 }, ownEnter: true, size: () => [10, 10],
    draw(g, p, env) {
      const { t, theme: th } = env; let idx = -1; p.labels.forEach((l, i) => { if (t >= l[0] - 0.01) idx = i; }); if (idx < 0) return;
      const at = p.labels[idx][0], s = p.labels[idx][1], k = spring(t - at, 'bouncy'), f = F.monoX(p.size), w = mw(s, f) + 64, h = p.size * 2.1;
      g.save(); g.translate(-w / 2, 0); g.scale(0.7 + 0.3 * clamp(k, 0, 1.1), 0.7 + 0.3 * clamp(k, 0, 1.1)); g.globalAlpha *= clamp((t - at) / 0.08 + (at < 0.1 ? 1 : 0));
      clay(g, -w / 2, -h / 2, w, h, h / 2, '#0B0F14', { shadowK: 0.5 }); g.strokeStyle = th.accent; g.lineWidth = 3; rr(g, -w / 2, -h / 2, w, h, h / 2); g.stroke();
      g.fillStyle = th.accent; g.beginPath(); g.arc(-w / 2 + 28, 0, 8, 0, 7); g.fill(); txt(g, s, 14, 2, f, th.paper);
      if (t - at < 0.35) burst(g, 0, 0, 120, th.accent, t - at - 0.02, 8, 0.25); g.restore();
    },
  });

  // ---------- board3: the three possible starts (numbered boxes that open one at a time) ----------
  // rows: [[at, pickIdx, openIdx, verdictAt, hostOpenOffset], ...]  (money in case p.money, default index 1 = case 2)
  const mcase = (g, th, x, y, open, col) => { g.save(); g.translate(x, y); g.scale(0.56, 0.56); window.__bcase(g, th, { open, col }); g.restore(); };
  B.register('board3', {
    defaults: { rows: [], sumAt: NEVER, title: 'EVERY POSSIBLE START', sub: 'THE MONEY IS IN CASE 2', money: 1, boxAt: -1 }, size: () => [1000, 1160],
    anchors: () => ({ all: [0, 0, 1000, 1160], head: [0, -535, 980, 90], row0: [0, -345, 980, 262], row1: [0, -60, 980, 262], row2: [0, 225, 980, 262], v0: [400, -345, 160, 200], v1: [400, -60, 160, 200], v2: [400, 225, 160, 200], sum: [0, 470, 980, 180], rows: [0, -60, 980, 840] }),
    draw(g, p, env) {
      const { t, theme: th } = env, lt = t - p.boxAt, CY = [-345, -60, 225], X = [-230, -60, 110]; const kk = spring(lt, 'soft');
      g.save(); g.translate(0, (1 - clamp(kk, 0, 1.05)) * -500); g.globalAlpha *= clamp(lt / 0.1);
      paper(g, -490, -580, 980, 1160, 28, {}); g.save(); rr(g, -490, -580, 980, 1160, 28); g.clip(); g.fillStyle = th.navy; g.fillRect(-490, -580, 980, 90); g.restore();
      txt(g, p.title, -460, -548, F.hero(52), th.paper, 'left'); txt(g, p.sub, -460, -512, F.monoX(20), th.accent, 'left');
      txt(g, 'OUR MATH', 460, -535, F.monoX(20), rgba(th.paper, 0.7), 'right');
      p.rows.forEach((R, i) => {
        const [at, pick, opn, vAt] = R, oAt = R[4] != null ? R[4] : 0.9, T = t - at, y = CY[i], k = clamp(spring(T, { f: 2.3, z: 0.55 }), 0, 1.08), isOpen = T > 0;
        const target = [0, 1, 2].find(c => c !== pick && c !== opn), win = target === p.money;
        g.save(); g.translate(0, y);
        const act = isOpen && !(p.rows[i + 1] && t > p.rows[i + 1][0] + 0.2) ? 1 : 0;
        g.fillStyle = isOpen ? th.paper : th.paperShade; rr(g, -462, -131, 924, 262, 18); g.fill();
        g.strokeStyle = act ? th.accent : th.rule; g.lineWidth = act ? 6 : 3; rr(g, -462, -131, 924, 262, 18); g.stroke();
        const dk = isOpen ? clamp(spring(T, 'bouncy'), 0, 1.15) : 1; g.save(); g.translate(-396, 0); g.scale(dk, dk); clay(g, -50, -50, 100, 100, 50, isOpen ? th.accent : th.rule, { shadowK: 0.5 }); txt(g, String(i + 1), 0, 5, F.hero(80), th.ink); g.restore();
        if (!isOpen) txt(g, 'START ' + (i + 1) + '  ·  ?', 40, 0, F.hero(60), th.inkSoft);
        else {
          g.save(); g.globalAlpha *= clamp(T / 0.15);
          for (let c = 0; c < 3; c++) {
            const ok = c === opn ? ease.out(lin(T, oAt, oAt + 0.38)) : 0;
            g.save(); g.translate(X[c], -4); g.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k); mcase(g, th, 0, 0, ok, '#7f8fa6');
            g.fillStyle = th.paper; g.beginPath(); g.arc(-52, -26, 14, 0, 7); g.fill(); txt(g, String(c + 1), -52, -25, F.hero(21), th.ink); g.restore();
          }
          const mk = spring(T - 0.2, 'bouncy'); if (T > 0.2) { g.save(); g.translate(X[p.money], -88); g.scale(clamp(mk, 0, 1.1), clamp(mk, 0, 1.1)); clay(g, -50, -19, 100, 38, 12, th.good, { shadowK: 0.4 }); txt(g, '$1M', 0, 2, F.hero(26), th.ink); g.restore(); }
          const pt = T - 0.5; if (pt > 0) { const pk = spring(pt, { f: 2.4, z: 0.42 }); g.save(); g.translate(X[pick], 70); g.rotate(-0.05 + 0.2 * (1 - clamp(pk, 0, 1))); g.scale(clamp(pk, 0.3, 1.1), clamp(pk, 0.3, 1.1)); clay(g, -72, -20, 144, 40, 12, th.accent, { shadowK: 0.5 }); txt(g, 'YOUR PICK', 0, 2, F.hero(24), th.ink); g.restore(); burst(g, X[pick], 70, 120, th.accent, pt - 0.03, 8, 0.3); }
          if (T > oAt + 0.3 && t < vAt + 0.05) { g.save(); g.globalAlpha *= clamp((T - oAt - 0.3) / 0.2); txt(g, 'HOST OPENS #' + (opn + 1), X[opn] + 24, 70, F.monoX(17), th.inkSoft); g.restore(); }
          const vt = t - vAt; if (vt > 0) {
            const ak = ease.out(lin(vt, 0, 0.4)), col = win ? th.goodInk : th.badInk; g.save(); g.strokeStyle = col; g.lineWidth = 9; g.lineCap = 'round'; g.lineJoin = 'round';
            const x0 = X[pick], x1 = X[target], up = -118 - Math.abs(x1 - x0) * 0.1; g.beginPath(); const N = 18; for (let s = 0; s <= N * ak; s++) { const u = s / N, xx = lerp(x0, x1, u), yy = -62 + (up + 62) * 4 * u * (1 - u); s ? g.lineTo(xx, yy) : g.moveTo(xx, yy); } g.stroke();
            if (ak > 0.95) { const dirx = Math.sign(x1 - x0); g.beginPath(); g.moveTo(x1, -62); g.lineTo(x1 - dirx * 22 - 4, -62 - 24); g.moveTo(x1, -62); g.lineTo(x1 - dirx * 22 + 12, -62 + 20); g.stroke(); } g.restore();
            if (vt > 0.2) { const vk = spring(vt - 0.2, { f: 2.5, z: 0.4 }), sc = clamp(vk, 0, 1.15); g.save(); g.translate(398, -22); g.scale(sc, sc); g.fillStyle = win ? th.good : th.bad; g.beginPath(); g.arc(0, 0, 52, 0, 7); g.fill(); g.strokeStyle = th.paper; g.lineWidth = 13; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath();
              if (win) { g.moveTo(-24, 2); g.lineTo(-6, 22); g.lineTo(28, -20); } else { g.moveTo(-22, -22); g.lineTo(22, 22); g.moveTo(22, -22); g.lineTo(-22, 22); } g.stroke(); g.restore();
              g.save(); g.globalAlpha *= clamp((vt - 0.3) / 0.15); txt(g, 'SWITCH', 398, 54, F.monoX(17), th.inkSoft); txt(g, win ? 'WINS' : 'LOSES', 398, 88, F.hero(40), win ? th.goodInk : th.badInk); g.restore(); burst(g, 398, -22, 200, win ? th.good : th.bad, vt - 0.25, 12, 0.4); }
          }
          g.restore();
        }
        g.restore();
      });
      const sm = t - p.sumAt; if (sm > 0) { const k = spring(sm, 'bouncy'); g.save(); g.translate(0, 470); g.scale(clamp(k, 0.3, 1.05), clamp(k, 0.3, 1.05)); g.globalAlpha *= clamp(sm / 0.1);
        clay(g, -462, -78, 924, 156, 26, th.good, { shadowK: 0.7 });
        [0, 1, 2].forEach(i => { const x = -380 + i * 88, kk2 = spring(sm - 0.1 - i * 0.12, 'bouncy'); g.save(); g.translate(x, 0); g.scale(clamp(kk2, 0, 1.1), clamp(kk2, 0, 1.1)); g.fillStyle = i ? th.paper : th.bad; g.beginPath(); g.arc(0, 0, 34, 0, 7); g.fill(); g.strokeStyle = i ? th.good : th.paper; g.lineWidth = 9; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); if (i) { g.moveTo(-15, 1); g.lineTo(-3, 14); g.lineTo(18, -12); } else { g.moveTo(-13, -13); g.lineTo(13, 13); g.moveTo(13, -13); g.lineTo(-13, 13); } g.stroke(); g.restore(); });
        txt(g, 'SWITCH WINS', 150, -22, F.hero(54), th.ink); txt(g, '2 OUT OF 3', 150, 36, F.hero(70), th.ink); g.restore(); burst(g, 0, 470, 420, th.good, sm - 0.05, 16, 0.5); }
      g.restore();
    },
  });

  // ---------- calendar: $100 a day for 27 years ----------
  B.register('calendar', {
    defaults: { t0: -1, t1: 1, doneAt: NEVER }, size: () => [840, 700],
    anchors: () => ({ all: [0, 0, 840, 700], head: [0, -280, 780, 110], cal: [-210, 20, 340, 400], years: [190, 10, 360, 330], pile: [-210, 190, 340, 160], sub: [0, 285, 780, 90] }),
    draw(g, p, env) {
      const { t, theme: th } = env, lt = env.lt, u = ease.inOut(lin(t, p.t0, p.t1)), days = Math.round(10000 * u), yrs = days / 365.25, k = spring(lt, 'snappy'), run = u > 0 && u < 1;
      g.save(); g.scale(0.92 + 0.08 * k, 0.92 + 0.08 * k); paper(g, -420, -340, 840, 680, 28, {});
      g.save(); rr(g, -420, -340, 840, 120, 28); g.clip(); g.fillStyle = th.navy; g.fillRect(-420, -340, 840, 120); g.restore();
      txt(g, '$100 A DAY', -380, -296, F.hero(70), th.paper, 'left'); txt(g, 'ONE NEW BILL EVERY MORNING', -380, -245, F.monoX(21), th.accent, 'left');
      g.save(); g.translate(-210, 20); clay(g, -150, -170, 300, 340, 16, th.paper, { shadowK: 0.5 }); g.fillStyle = th.bad; rr(g, -150, -170, 300, 62, 16); g.fill(); g.fillRect(-150, -130, 300, 22);
      for (const sx of [-80, 80]) { g.fillStyle = th.ink; g.beginPath(); g.arc(sx, -172, 9, 0, 7); g.fill(); }
      if (run) for (let i = 0; i < 3; i++) { const q = (days * 0.37 + i / 3) % 1; g.save(); g.translate(0, -108); g.rotate(-q * 1.2); g.globalAlpha *= 1 - q; g.fillStyle = th.paperShade; rr(g, -140, 0, 280, 250, 8); g.fill(); g.restore(); }
      txt(g, 'DAY', 0, -139, F.monoX(24), th.paper); txt(g, String(Math.max(1, days)), 0, -10, F.hero(days > 999 ? 120 : 150), th.ink); txt(g, 'OF 10,000', 0, 110, F.monoX(22), th.inkSoft); g.restore();
      const pileH = 18 + 110 * u; g.save(); g.translate(-210, 215);
      if (run) for (let i = 0; i < 9; i++) { const cyc = (t * 3.2 + i * 0.37) % 1; g.save(); g.translate((hash(i + 4.1 + Math.floor(t * 3.2 + i * 0.37)) - 0.5) * 120, -150 + cyc * 120); g.rotate((hash(i * 2.2) - 0.5) * 0.8); g.globalAlpha *= 1 - 0.7 * cyc; clay(g, -34, -16, 68, 32, 6, th.good, { shadowK: 0.2 }); txt(g, '$100', 0, 1, F.hero(18), th.ink); g.restore(); }
      for (let i = 0; i < 7; i++) { const w = 220 - i * 8; g.save(); g.translate((hash(i * 3.1) - 0.5) * 14, -i * pileH / 7); clay(g, -w / 2, -9, w, 22, 6, th.good, { shadowK: 0.25 }); g.fillStyle = 'rgba(11,15,20,.18)'; g.fillRect(-w / 2 + 10, -2, w - 20, 4); g.restore(); }
      g.restore();
      g.save(); g.translate(190, 10); paper(g, -170, -165, 340, 330, 22, { lift: 0 }); txt(g, 'YEARS', 0, -120, F.monoX(30), th.inkSoft);
      roll(g, Math.round(yrs), 100, 28, { font: F.hero(210), size: 210, color: th.goodInk, align: 'right', speed: run ? 240 : 0 });
      txt(g, '≈ 27.4', 0, 134, F.monoX(26), th.inkSoft); g.restore();
      txt(g, '10,000 DAYS × $100 = $1,000,000 · OUR MATH', 0, 290, F.monoX(22), th.inkSoft);
      const dn = t - p.doneAt; if (dn > 0) { const dk = spring(dn, 'bouncy'); g.save(); g.translate(190, -150); g.rotate(-0.08); g.scale(clamp(dk, 0.3, 1.1), clamp(dk, 0.3, 1.1)); clay(g, -150, -38, 300, 76, 18, th.accent, { shadowK: 0.7 }); txt(g, '27 YEARS', 0, 3, F.hero(56), th.ink); g.restore(); burst(g, 190, -150, 260, th.accent, dn - 0.05, 14, 0.45); }
      g.restore();
    },
  });

  // ---------- column: the 1990 magazine column with SWITCH circled ----------
  B.register('column', {
    defaults: { stampAt: NEVER, circleAt: NEVER }, size: () => [780, 860],
    anchors: () => ({ all: [0, 0, 780, 860], head: [0, -340, 740, 150], ans: [0, 20, 640, 220], stamp: [230, -330, 260, 160], body: [0, 270, 700, 300] }),
    draw(g, p, env) {
      const { t, theme: th } = env, lt = env.lt, k = spring(lt, 'soft'); g.save(); g.translate(0, (1 - clamp(k, 0, 1.05)) * -600); g.rotate((1 - clamp(k, 0, 1)) * 0.25 - 0.02);
      paper(g, -390, -430, 780, 860, 22, {}); g.save(); rr(g, -390, -430, 780, 130, 22); g.clip(); g.fillStyle = th.navy; g.fillRect(-390, -430, 780, 130); g.restore();
      txt(g, 'THE MAGAZINE COLUMN', -350, -392, F.hero(54), th.paper, 'left'); txt(g, 'ILLUSTRATION · NOT A REAL PAGE', -350, -338, F.monoX(20), rgba(th.paper, 0.7), 'left');
      g.strokeStyle = th.rule; g.lineWidth = 3; for (let i = 0; i < 4; i++) { g.beginPath(); g.moveTo(-340, -262 + i * 30); g.lineTo(i === 3 ? 60 : 340, -262 + i * 30); g.stroke(); }
      txt(g, 'THE ANSWER:', -340, -118, F.monoX(30), th.inkSoft, 'left'); txt(g, 'SWITCH.', -10, 20, F.hero(190), th.ink);
      const cs = t - p.circleAt; if (cs > 0) { const u = ease.out(lin(cs, 0, 0.55)); g.save(); g.strokeStyle = th.bad; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); const N = 60; for (let s = 0; s <= N * u; s++) { const a = -2.6 + s / N * 6.9, wob = 1 + 0.04 * Math.sin(a * 3); const x = -8 + Math.cos(a) * 345 * wob, y = 22 + Math.sin(a) * 118 * wob; s ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); g.restore(); }
      g.strokeStyle = th.rule; g.lineWidth = 3; for (let i = 0; i < 6; i++) { g.beginPath(); g.moveTo(-340, 170 + i * 36); g.lineTo(i % 3 === 2 ? 100 : 340, 170 + i * 36); g.stroke(); }
      const ss = t - p.stampAt; if (ss > 0) { const u = ease.expo(lin(ss, 0, 0.14)), sc = 1 + 2.0 * (1 - u); g.save(); g.translate(230, -330); g.rotate(-0.16); g.scale(sc, sc); g.globalAlpha *= clamp(ss / 0.05); g.strokeStyle = '#B88700'; g.lineWidth = 7; g.fillStyle = 'rgba(245,243,238,.92)'; rr(g, -110, -48, 220, 96, 8); g.fill(); g.stroke(); txt(g, '1990', 0, 4, F.hero(78), '#B88700'); g.restore(); burst(g, 230, -330, 200, th.accent, ss - 0.1, 12, 0.4); }
      g.restore();
    },
  });
})();
// TikTok cut — v3 re-edit (64 s). Stations (world x): 0 table3 (+ giant 50/50 hook) · 1750 calendar · 3500 100 cases · 5250 the three starts · 7000 column · 8750 letters
const F0 = { x: 0, y: 40, w: 900, h: 1340 };      // frame 0 and the loop frame share this framing
const ST = { sx: 560, sy: 930, maxH: 1000 };
const ST0 = { x: 930, y: 1340, s: 1.15, layer: 'front' };   // storyteller stands between the two closed cases
const H1 = { lines: [[['THE ', 'paper'], ['$1,000,000', 'good']], [['QUESTION', 'paper']]], size: 110 };
const LOOP = '@So#4-0.45';  // whip lead/dur shortened below to avoid a blank travel frame
const P = 'brand/photos/stock/briefcase-cash/7.jpg';
BM2.scene({
  series: 'whatif', title: 'THREE BRIEFCASES', duration: 64.99,
  footnote: ['ASSUMES: 1 CASE HAS $1,000,000 (AT RANDOM) · HOST KNOWS WHERE', 'HE ALWAYS OPENS AN EMPTY CASE YOU DIDN\'T PICK + OFFERS THE SWAP', 'HYPOTHETICAL · NOT FINANCIAL ADVICE · NO REAL GAME SHOW', 'PHOTO: SEMTRIO · CC BY 2.0 · VIA FLICKR'],
  elements: [
    { id: 'you1', type: 'char', layer: 'screen', at: [140, 1212], in: -1, props: { who: 'you', s: 0.82, moods: [{ t: 0, m: 'think' }, { t: '@wrong', m: 'shock' }, { t: '@three', m: 'think' }, { t: '@million#2', m: 'greed' }, { t: '@two', m: 'neutral' }, { t: '@that\'s', m: 'think' }, { t: '@27', m: 'shock' }, { t: '@pick', m: 'smug' }, { t: '@host', m: 'worried' }, { t: '@opens', m: 'shock' }, { t: '@wanna', m: 'think', look: [1, -1] }, { t: '@tap', m: 'smug' }, { t: '@nah', m: 'shock' }, { t: '@try', m: 'think' }, { t: '@98', m: 'shock' }, { t: '@skipped', m: 'worried' }, { t: '@99', m: 'shock' }, { t: '@send', m: 'smug' }, { t: '@three#2', m: 'think' }, { t: '@pick#4', m: 'worried' }, { t: '@wins', m: 'grin' }, { t: '@second', m: 'think' }, { t: '@same#2', m: 'grin' }, { t: '@staying', m: 'worried' }, { t: '@doubles', m: 'shock' }, { t: '@columnist', m: 'shock' }, { t: '@by', m: 'think' }, { t: '@wrong#2', m: 'wrong' }, { t: '@so#4', m: 'worried' }], tagDur: 2.2 } },
    { id: 'host1', type: 'char', layer: 'screen', at: [540, 1212], in: '@then-0.1', out: '@tap-0.1', props: { who: 'host', s: 0.82, tag: true, moods: [{ t: 0, m: 'smug' }, { t: '@opens', m: 'grin' }, { t: '@asks', m: 'smug' }] } },
    { id: 'host2', type: 'char', layer: 'screen', at: [540, 1212], in: '@he#2-0.3', out: '@your-0.1', props: { who: 'host', s: 0.82, tag: false, moods: [{ t: 0, m: 'smug' }, { t: '@98', m: 'grin' }] } },
    { id: 'host3', type: 'char', layer: 'screen', at: [540, 1212], in: '@so#4-0.1', props: { who: 'host', s: 0.82, tag: false, moods: [{ t: 0, m: 'smug' }] } },
    { id: 'hook1', type: 'text', at: [0, -440], in: -1, out: '@Three-0.15', props: H1 },
    { id: 'ws', type: 'stamp', at: [0, 20], rot: -0.08, in: '@wrong', out: '@Three-0.15', props: { text: 'WRONG', tone: 'bad', size: 140 } },
    { id: 'endt', type: 'text', at: [0, -440], in: LOOP, props: H1 },
    { id: 'tbl', type: 'table3', at: [0, 330], in: -1, props: { reAt: LOOP, slam: [-0.36, -0.29, -0.22], alt: true, relAt: '@Three', opens: [[2, -5, '@Three'], [2, '@opens', 99999]], tagIn: -1, tagIdx: 1, tagAway: '@pick', numAt: '@Three+0.45', pickAt: '@pick', pickIdx: 0,
      handAt: '@host', handIdx: 2, xrayAt: '@two', flipAt: '@opens', fiftyAt: -0.1, crackAt: '@wrong+0.1', pullAt: '@Now', swapAt: '@switch', btnAt: '@switch+0.15' } },
    { id: 'cash', type: 'photo', at: [0, 70], in: '@million#2-0.3', out: '@two+0.6', props: { src: P, name: 'CASH', role: 'STOCK PHOTO', credit: 'PHOTO: SEMTRIO · CC BY 2.0', w: 230, aspect: 0.8, tilt: -0.05, fx: 0.5, fy: 0.5 } },
    { id: 'coin', type: 'stamp', at: [0, 140], rot: 0.07, in: '@coin', out: '@Nah+0.15', props: { text: 'COIN FLIP?', tone: 'accent', size: 100 } },
    { id: 'cal', type: 'calendar', at: [1750, 330], in: '@That\'s-0.9', out: '@You+0.3', props: { t0: '@That\'s-0.1', t1: '@27+0.25', doneAt: '@years' } },
    { id: 'fan', type: 'fan100', at: [3500, 330], in: '@Nah-0.6', out: '@Three#2-0.1', props: { dealAt: '@try', pickAt: '@pick#2', waveAt: '@98', stampAt: '@99', awayAt: '@Send+1.3', pickIdx: 23, keepIdx: 67 } },
    { id: 'brd', type: 'board3', at: [5250, 330], in: '@Three#2-0.7', out: '@columnist-0.5', props: { boxAt: '@Three#2-0.1', rows: [['@pick#4-0.3', 1, 2, '@loses', 1.1], ['@pick#5-0.1', 0, 2, '@wins', 1.9], ['@second-0.2', 2, 0, '@deal', 1.0]], sumAt: '@Switching#3' } },
    { id: 'st13', type: 'stamp', at: [5250, 250], rot: -0.07, in: '@Staying', out: '@doubles-0.1', props: { text: 'STAY: 1 IN 3', tone: 'bad', size: 90 } },
    { id: 'sw2x', type: 'stamp', at: [5250, 250], rot: 0.06, in: '@doubles', out: '@columnist-0.5', props: { text: 'SWITCH: 2X', tone: 'good', size: 100 } },
    { id: 'col', type: 'column', at: [7000, 330], in: '@columnist-0.7', out: '@By-0.2', props: { stampAt: '@1990', circleAt: '@printed' } },
    { id: 'mail', type: 'mail', at: [8750, 330], in: '@By-0.6', out: '@So#4-0.1', props: { t0: '@By+0.1', t1: '@wrote', n: 64, countAt: '@nearly+0.2', stampAt: '@PhDs' } },
    { id: 'live', type: 'live', layer: 'screen', at: [540, 342], in: -1, props: { end: '@So#4-0.3', n0: 14 } },
    { id: 'lab', type: 'blabel', layer: 'screen', at: [830, 264], in: -1, props: { labels: [[0, 'THE BET'], ['@Nah-0.1', 'THE TWIST'], ['@Three#2-0.2', 'THE CHECK'], ['@Switching#3-0.2', 'THE ANSWER']] } },
    { id: 'hyp', type: 'chip', layer: 'screen', at: [540, 416], in: '@Three+0.3', out: '@host+0.1', props: { text: 'HYPOTHETICAL', size: 22 } },
    { id: 'asm', type: 'assumes', layer: 'screen', at: [540, 416], in: '@host+0.3', props: { text: 'HYPOTHETICAL · HOST KNOWS · ALWAYS OPENS AN EMPTY CASE', size: 17 } },
    { id: 'heart', type: 'heart', layer: 'screen', at: [800, 900], in: '@heart', props: { s: 1, dur: 0.9 } },
    { id: 'plane', type: 'plane', layer: 'screen', at: [0, 0], in: '@Send-0.05', out: '@Send+1.0', props: { from: [470, 1000], to: [1150, 520], dur: 0.85, s: 0.62 } },
    { id: 'btn', type: 'follow', layer: 'screen', at: [650, 1120], in: '@Follow+0.05', out: '@Follow+1.45', props: { press: 0.55 } },
    { id: 'ask', type: 'bubble', layer: 'screen', at: [800, 830], in: '@stay', out: 64.95, props: { l1: 'STAY OR SWITCH?', l2: 'ONE WORD', size: 50, tail: 'left' } },
  ],
  beats: [
    { at: 0, beat: 'side-by-side', focus: F0, fill: 0.85, maxH: ST.maxH, sx: ST.sx, sy: ST.sy, st: ST0, pose: 'shock', keep: ['hook1', 'ws', 'tbl', 'endt'] },
    { at: '@wrong', beat: 'zoom-on-number', focus: { x: 0, y: -190, w: 900, h: 700 }, fill: 0.8, maxH: 800, sy: 820, rot: -0.01, st: ST0, pose: 'shock', keep: ['hook1', 'ws', 'tbl'] },
    { at: '@million', beat: 'zoom-on-number', focus: 'hook1', fill: 0.8, sy: 760, rot: 0.01, st: ST0, pose: 'point', keep: ['hook1', 'ws', 'tbl'] },
    { at: '@question', beat: 'pull-back', focus: F0, fill: 0.85, maxH: ST.maxH, sx: ST.sx, sy: ST.sy, st: ST0, pose: 'talk', keep: ['hook1', 'ws', 'tbl'] },
    { at: '@Three', beat: 'graphic-hero', focus: 'tbl.row', fill: 0.92, sy: 860, st: 'corner', pose: 'idle', keep: ['cash'] },
    { at: '@million#2', beat: 'zoom-on-number', focus: 'tbl.tag', fill: 0.8, sy: 950, rot: 0.01, st: 'corner', pose: 'point', keep: ['cash'] },
    { at: '@two', beat: 'graphic-hero', focus: 'tbl.row', fill: 0.98, sy: 860, st: 'corner', pose: 'chin', keep: ['cash'] },
    { at: '@That\'s', beat: 'graphic-hero', focus: 'cal', move: 'whip', fill: 0.92, maxH: 800, sy: 880, st: 'corner', pose: 'idle' },
    { at: '@100', beat: 'zoom-on-number', focus: 'cal.cal', fill: 0.62, sy: 860, rot: 0.01, st: 'corner', pose: 'point' },
    { at: '@27', beat: 'zoom-on-number', focus: 'cal.years', fill: 0.72, sy: 860, rot: -0.01, st: 'corner', pose: 'shock' },
    { at: '@years+0.2', beat: 'pull-back', focus: 'cal', fill: 0.92, maxH: 800, sy: 880, st: 'corner', pose: 'shock' },
    { at: '@You', beat: 'graphic-hero', focus: 'tbl.row', move: 'whip', fill: 0.92, sy: 860, st: 'corner', pose: 'point', point: 'tbl.c0' },
    { at: '@host', beat: 'graphic-hero', focus: 'tbl', fill: 0.92, maxH: 800, sy: 880, st: 'corner', pose: 'point', point: 'tbl.hand' },
    { at: '@where', beat: 'zoom-on-number', focus: 'tbl.row', fill: 0.98, sy: 860, rot: 0.008, st: 'corner', pose: 'chin' },
    { at: '@always', beat: 'graphic-hero', focus: 'tbl', fill: 0.92, maxH: 800, sy: 880, st: 'corner', pose: 'point', point: 'tbl.hand' },
    { at: '@opens', beat: 'zoom-on-number', focus: 'tbl.c2', fill: 0.76, sy: 860, rot: -0.01, st: 'corner', pose: 'shock' },
    { at: '@Now', beat: 'graphic-hero', focus: 'tbl.pulled', fill: 0.72, sy: 860, st: 'corner', pose: 'idle' },
    { at: '@heart-0.2', beat: 'graphic-hero', focus: 'tbl', fill: 0.92, maxH: 800, sy: 880, st: 'corner', pose: 'chin' },
    { at: '@coin', beat: 'zoom-on-number', focus: 'coin', fill: 0.8, sy: 700, rot: 0.01, st: 'corner', pose: 'shrug' },
    { at: '@Nah-0.1', beat: 'graphic-hero', focus: 'fan.grid', move: 'whip', fill: 0.9, maxH: 800, sy: 880, st: 'corner', pose: 'shrug' },
    { at: '@pick#2', beat: 'zoom-on-number', focus: 'fan.pick', fill: 0.5, sy: 860, rot: 0.01, st: 'corner', pose: 'point' },
    { at: '@98', beat: 'zoom-on-number', focus: 'fan.count', fill: 0.8, sy: 560, rot: -0.01, st: 'corner', pose: 'shock', dur: 0.5 },
    { at: '@98+0.9', beat: 'pull-back', focus: 'fan.grid', fill: 0.9, maxH: 800, sy: 880, st: 'corner', pose: 'shock' },
    { at: '@skipped', beat: 'zoom-on-number', focus: 'fan.keep', fill: 0.5, maxH: 700, sy: 1030, rot: 0.01, st: 'corner', pose: 'point' },
    { at: '@100#3', beat: 'graphic-hero', focus: 'fan.pick', fill: 0.45, sy: 860, st: 'corner', pose: 'shrug' },
    { at: '@So', beat: 'pull-back', focus: 'fan.grid', fill: 0.9, maxH: 800, sy: 880, st: 'corner', pose: 'chin' },
    { at: '@99', beat: 'zoom-on-number', focus: 'fan.keep', fill: 0.5, maxH: 700, sy: 1030, rot: 0.012, st: 'corner', pose: 'shock', dur: 0.4 },
    { at: '@time', beat: 'pull-back', focus: 'fan.grid', fill: 0.9, maxH: 800, sy: 880, st: 'corner', pose: 'shrug' },
    { at: '@Send', beat: 'presenter-front', focus: 'fan.grid', sy: 860, pose: 'you' },
    { at: '@Three#2-0.1', beat: 'graphic-hero', focus: 'brd.rows', move: 'whip', fill: 0.98, maxH: 720, sy: 850, st: 'corner', pose: 'idle' },
    { at: '@pick#4-0.4', beat: 'graphic-hero', focus: 'brd.row0', fill: 0.98, sy: 800, st: 'corner', pose: 'point' },
    { at: '@money', beat: 'zoom-on-number', focus: 'brd.row0', fill: 1.0, sy: 800, rot: 0.01, st: 'corner', pose: 'chin' },
    { at: '@loses', beat: 'zoom-on-number', focus: 'brd.v0', fill: 0.42, maxH: 520, sy: 840, rot: -0.01, st: 'corner', pose: 'shock' },
    { at: '@pick#5-0.2', beat: 'graphic-hero', focus: 'brd.row1', fill: 0.98, sy: 800, st: 'corner', pose: 'point' },
    { at: '@open', beat: 'zoom-on-number', focus: 'brd.row1', fill: 1.0, sy: 800, rot: -0.01, st: 'corner', pose: 'chin' },
    { at: '@wins', beat: 'zoom-on-number', focus: 'brd.v1', fill: 0.42, maxH: 520, sy: 840, rot: 0.01, st: 'corner', pose: 'shock' },
    { at: '@And#4', beat: 'graphic-hero', focus: 'brd.row2', fill: 0.98, sy: 800, st: 'corner', pose: 'point' },
    { at: '@same#2', beat: 'zoom-on-number', focus: 'brd.v2', fill: 0.42, maxH: 520, sy: 840, rot: -0.01, st: 'corner', pose: 'shock' },
    { at: '@Follow-0.1', beat: 'graphic-hero', focus: 'brd.rows', fill: 0.98, maxH: 720, sy: 850, st: 'corner', pose: 'follow' },
    { at: '@Switching#3', beat: 'zoom-on-number', focus: 'brd.sum', fill: 0.92, sy: 860, rot: 0.01, st: 'corner', pose: 'shock' },
    { at: '@times', beat: 'pull-back', focus: 'brd.rows', fill: 0.98, maxH: 720, sy: 850, st: 'corner', pose: 'shock' },
    { at: '@Staying-0.1', beat: 'graphic-hero', focus: 'brd.row0', fill: 0.98, sy: 800, st: 'corner', pose: 'chin' },
    { at: '@time', beat: 'pull-back', focus: 'brd.rows', fill: 0.98, maxH: 720, sy: 850, st: 'corner', pose: 'point' },
    { at: '@doubles-0.2', beat: 'graphic-hero', focus: 'brd.rows', fill: 1.0, maxH: 760, sy: 850, rot: 0.01, st: 'corner', pose: 'shock' },
    { at: '@columnist-0.1', beat: 'peek', focus: 'col', move: 'whip', sy: 930, maxH: 800, pose: 'idle' },
    { at: '@1990', beat: 'zoom-on-number', focus: 'col.stamp', fill: 0.42, sy: 760, rot: 0.01, st: 'corner', pose: 'point' },
    { at: '@By', beat: 'graphic-hero', focus: 'mail', move: 'whip', fill: 0.9, maxH: 800, sy: 930, st: 'corner', pose: 'shock' },
    { at: '@nearly+0.2', beat: 'zoom-on-number', focus: 'mail.count', fill: 0.92, sy: 760, rot: -0.01, st: 'corner', pose: 'point' },
    { at: '@wrote', beat: 'pull-back', focus: 'mail', fill: 0.9, maxH: 800, sy: 930, st: 'corner', pose: 'shrug' },
    { at: '@wrong#2', beat: 'zoom-on-number', focus: 'mail.pile', fill: 0.9, sy: 980, rot: 0.01, st: 'corner', pose: 'shock' },
    { at: LOOP, beat: 'side-by-side', focus: F0, move: 'whip', lead: 0.22, dur0: 0.3, fill: 0.85, maxH: ST.maxH, sx: ST.sx, sy: ST.sy, st: ST0, pose: 'shock', keep: ['hook1', 'ws', 'tbl', 'endt'] },
  ],
  poses: [['@Follow', 'follow', { target: [650, 1120] }], ['@Send', 'you'], ['@stay', 'chin']],
  shakes: [[0.3, 10], ['@wrong', 12], ['@loses', 8], ['@years', 10], ['@98', 10], ['@99', 26], ['@Switching#3', 12], ['@So#4-0.3', 10]],
  captions: { gap: 16, emph: { '50': 'accent', '-50': 'accent', wrong: 'bad', 'question.': 'good', million: 'good', 'bucks,': 'good', '27': 'accent', 'empties.': 'accent', '99': 'good', 'loses.': 'bad', 'wins.': 'good', 'deal.': 'good', 'two': 'good', 'wrong.': 'bad', 'switch?': 'accent' }, fix: [['of your', 'if you\'re']] },
  bed: { name: 'lofi_bed_1', gain: -1 },
  sfx: [
    { at: 0, name: 'deep_boom_2', gain: -4, dur: 0.36 }, { at: 0.16, name: 'thud_1', gain: -8, dur: 0.4 }, { at: 0.3, name: 'thud_2', gain: -8, dur: 0.4 }, { at: 0.44, name: 'paper_slam_1', gain: -7, dur: 0.5 },
    { at: '@wrong', name: 'rubber_stamp_2', gain: -4, dur: 0.5 }, { at: '@wrong+0.1', name: 'glass_shatter_2', gain: -12, dur: 0.7 },
    { at: '@Three', name: 'pop_1', gain: -9, dur: 0.4 }, { at: '@Three+0.5', name: 'pop_1', gain: -10, dur: 0.4 }, { at: '@Three+0.62', name: 'pop_2', gain: -10, dur: 0.4 },
    { at: '@million#2', name: 'coin_single_1', gain: -9, dur: 0.6 }, { at: '@two', name: 'camera_flash_1', gain: -12, dur: 0.6 },
    { at: '@That\'s-0.1', name: 'swoosh_1', gain: -9, dur: 0.8 }, { at: '@That\'s', name: 'money_counter_2', gain: -13, dur: 2.2 }, { at: '@years', name: 'ding_2', gain: -8, dur: 0.6 }, { at: '@years', name: 'cinematic_hit_2', gain: -10, dur: 1.0 },
    { at: '@pick', name: 'paper_slam_2', gain: -7, dur: 0.5 }, { at: '@pick+0.02', name: 'click_1', gain: -9, dur: 0.3 },
    { at: '@host', name: 'swoosh_1', gain: -10, dur: 0.8 }, { at: '@where', name: 'riser_1', gain: -14, dur: 0.9 }, { at: '@host+0.3', name: 'click_2', gain: -9, dur: 0.2 },
    { at: '@opens', name: 'door_slam_1', gain: -11, dur: 0.45 }, { at: '@opens', name: 'pop_2', gain: -9, dur: 0.3 },
    { at: '@switch', name: 'swoosh_2', gain: -11, dur: 0.6 }, { at: '@heart', name: 'pop_2', gain: -9, dur: 0.3 }, { at: '@coin', name: 'coin_single_2', gain: -8, dur: 0.6 }, { at: '@coin', name: 'rubber_stamp_1', gain: -9, dur: 0.5 },
    { at: '@Nah-0.1', name: 'whoosh_1', gain: -9, dur: 0.8 }, { at: '@Nah', name: 'record_scratch_stop_1', gain: -14, dur: 0.6 },
    { at: '@try+0.3', name: 'pop_1', gain: -12, dur: 0.4 }, { at: '@try+0.8', name: 'pop_2', gain: -12, dur: 0.4 }, { at: '@pick#2', name: 'click_1', gain: -9, dur: 0.3 },
    { at: '@98', name: 'pop_2', gain: -11, dur: 0.3 }, { at: '@98+0.2', name: 'pop_1', gain: -11, dur: 0.3 }, { at: '@98+0.4', name: 'pop_2', gain: -11, dur: 0.3 }, { at: '@98+0.6', name: 'pop_1', gain: -11, dur: 0.3 }, { at: '@98+0.8', name: 'pop_2', gain: -11, dur: 0.3 },
    { at: '@99', name: 'rubber_stamp_2', gain: -3, dur: 0.5 }, { at: '@99', name: 'deep_boom_1', gain: -2, dur: 1.6 }, { at: '@99', name: 'cinematic_hit_1', gain: -6, dur: 1.2 },
    { at: '@Three#2-0.1', name: 'whoosh_1', gain: -9, dur: 0.8 }, { at: '@Three#2+0.3', name: 'paper_slam_1', gain: -9, dur: 0.5 },
    { at: '@pick#4-0.3', name: 'click_1', gain: -8, dur: 0.3 }, { at: '@loses', name: 'wrong_buzzer_1', gain: -14, dur: 0.6 },
    { at: '@pick#5-0.1', name: 'click_1', gain: -8, dur: 0.3 }, { at: '@wins', name: 'success_chime_1', gain: -12, dur: 1.0 }, { at: '@wins', name: 'pop_1', gain: -8, dur: 0.4 },
    { at: '@second-0.2', name: 'click_2', gain: -8, dur: 0.3 }, { at: '@deal', name: 'success_chime_1', gain: -12, dur: 1.0 }, { at: '@deal', name: 'pop_2', gain: -8, dur: 0.4 },
    { at: '@Follow+0.05', name: 'pop_1', gain: -9, dur: 0.5 }, { at: '@Follow+0.6', name: 'click_1', gain: -8, dur: 0.3 }, { at: '@Follow+0.7', name: 'success_chime_1', gain: -12, dur: 1.2 },
    { at: '@Switching#3', name: 'cinematic_hit_2', gain: -8, dur: 1.0 }, { at: '@Switching#3', name: 'rubber_stamp_2', gain: -6, dur: 0.5 },
    { at: '@columnist-0.2', name: 'whoosh_2', gain: -10, dur: 0.6 }, { at: '@1990', name: 'rubber_stamp_1', gain: -5, dur: 0.5 }, { at: '@printed', name: 'swoosh_2', gain: -10, dur: 0.6 },
    { at: '@By', name: 'whoosh_2', gain: -10, dur: 0.6 }, { at: '@By+0.2', name: 'thud_1', gain: -12, dur: 0.5 }, { at: '@By+1.0', name: 'thud_2', gain: -12, dur: 0.5 }, { at: '@By+1.8', name: 'thud_1', gain: -12, dur: 0.5 },
    { at: '@nearly+0.2', name: 'money_counter_1', gain: -13, dur: 1.4 }, { at: '@PhDs', name: 'rubber_stamp_1', gain: -5, dur: 0.5 },
    { at: LOOP, name: 'deep_boom_2', gain: -6, dur: 0.36 }, { at: '@stay-0.05', name: 'pop_1', gain: -9, dur: 0.5 },
  ],
});
