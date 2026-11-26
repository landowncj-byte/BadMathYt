// ===== v2 additions: hook slam art (3 variants), chip, heart pulse =====
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, clay, burst, hash } = B;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const bill = (g, x, y, w, h) => { clay(g, x, y, w, h - 2, 6, '#1FA366', { shadowK: 0.45 }); g.fillStyle = 'rgba(245,243,238,.82)'; g.fillRect(x + w * 0.42, y + 1, w * 0.16, h - 4); g.fillStyle = 'rgba(0,0,0,.16)'; g.fillRect(x, y + h - 4, w, 2); };
  const tag = (g, th, w, h, label, fs) => { clay(g, -w / 2, -h / 2, w, h, 30, th.bad, { shadowK: 0.7 }); g.fillStyle = '#0B0F14'; g.beginPath(); g.arc(-w / 2 + 44, 0, 15, 0, 7); g.fill(); g.strokeStyle = th.paper; g.lineWidth = 5; g.beginPath(); g.arc(-w / 2 + 44, 0, 15, 0, 7); g.stroke(); txt(g, label, 34, 6, F.hero(fs), th.paper); };

  // slam: the frame-0 pattern break. variant 'stack' (tag drops, cash stack tips), 'mouth' (tag opens, swallows cash), 'wallet' (tag lifts a bill out of a wallet in slow motion)
  B.register('slam', {
    defaults: { variant: 'stack', reAt: 99999 },
    size: () => [760, 760],
    anchors: () => ({ tag: [20, -90, 520, 330], stack: [0, 170, 640, 400], all: [0, 30, 760, 760] }),
    draw(g, p, env) {
      const { t, theme } = env, rk = t >= p.reAt ? ease.inOut(lin(t, p.reAt, p.reAt + 0.8)) : 0;
      if (p.variant === 'stack') {
        const n = 14, bh = 32, w = 520, base = 300, ti = 0.26, tipK = t > ti ? spring(t - ti, { f: 2.0, z: 0.5 }) * (1 - rk) : 0, slide = ease.out(lin(t, ti, ti + 0.6)) * (1 - rk), sq = 1 - 0.05 * B.hit(t - ti, 9) * (rk > 0 ? 0 : 1);
        g.save(); g.translate(w / 2, base); g.rotate(-0.36 * tipK); g.translate(-w / 2, -base); g.translate(0, base); g.scale(1, sq); g.translate(0, -base);
        g.fillStyle = rgba(theme.paper, 0.3); rr(g, -w / 2 - 40, base, w + 80, 6, 3); g.fill();
        for (let b = 0; b < n; b++) { const y = base - (b + 1) * bh, jx = (hash(b * 7.7) - 0.5) * 14 + (b > 6 ? (b - 6) * 20 * slide : 0); g.save(); g.translate(jx, y + bh / 2); g.rotate((hash(b * 3.1) - 0.5) * 0.04 + (b > 6 ? 0.05 * (b - 6) * slide : 0)); bill(g, -w / 2, -bh / 2, w, bh); g.restore(); }
        const rest = base - n * bh - 70, ty = lerp(rest - 300, rest, ease.in(clamp(t / ti))) + (t > ti ? 0 : 0), up = rk;
        g.save(); g.translate(40 - 20 * slide, lerp(ty, rest - 300, up)); g.rotate(-0.12 + 0.08 * Math.sin(t * 20) * Math.exp(-Math.max(0, t - ti) * 6)); tag(g, theme, 400, 230, '1%', 168); g.restore();
        g.restore(); if (t > ti && rk === 0) burst(g, 40, base - n * bh - 20, 300, theme.bad, t - ti - 0.02, 16, 0.5);
      } else if (p.variant === 'mouth') {
        const te = t >= p.reAt ? t - p.reAt : t, open = te < 2.7 ? 56 + 50 * Math.abs(Math.sin(te * 8.2)) : 6 + 40 * Math.exp(-(te - 2.7) * 3), tw = 470, th2 = 250, cy = 20;
        for (let i = 0; i < 9; i++) { const u0 = ((te * 1.25 + i / 9) % 1); if (te >= 2.9) continue; const u = ease.in(u0), x = lerp(-340, -10, u), y = lerp(230 + (hash(i * 2.3) - 0.5) * 100, cy + 10, u), s = lerp(1, 0.35, u);
          g.save(); g.globalAlpha *= (te < 2.7 ? 1 : clamp(1 - (te - 2.7) / 0.2)); g.translate(x, y); g.rotate(-0.7 * u + (hash(i) - 0.5) * 0.4); g.scale(s, s); bill(g, -90, -26, 180, 52); g.restore(); }
        g.save(); g.translate(40, cy); g.save(); g.translate(0, -open / 2); g.beginPath(); g.moveTo(-tw / 2, 0); g.lineTo(-tw / 2, -th2 / 2 + 30); g.quadraticCurveTo(-tw / 2, -th2 / 2, -tw / 2 + 40, -th2 / 2); g.lineTo(tw / 2 - 40, -th2 / 2); g.quadraticCurveTo(tw / 2, -th2 / 2, tw / 2, -th2 / 2 + 30); g.lineTo(tw / 2, 0); g.closePath();
        B.shadowed(g, () => { g.beginPath(); g.rect(-tw / 2, -th2 / 2, tw, th2 / 2); }, theme.bad, 0.4); g.fillStyle = theme.bad; g.fill(); g.fillStyle = theme.paper; for (let k = 0; k < 6; k++) { const x = -tw / 2 + 36 + k * (tw - 72) / 5; g.beginPath(); g.moveTo(x - 24, 0); g.lineTo(x + 24, 0); g.lineTo(x, 34 * (open > 12 ? 1 : 0.3)); g.fill(); }
        txt(g, '1%', 0, -th2 / 4 - 4, F.hero(130), theme.paper); g.restore();
        g.save(); g.translate(0, open / 2); g.beginPath(); g.moveTo(-tw / 2, 0); g.lineTo(-tw / 2, th2 / 2 - 30); g.quadraticCurveTo(-tw / 2, th2 / 2, -tw / 2 + 40, th2 / 2); g.lineTo(tw / 2 - 40, th2 / 2); g.quadraticCurveTo(tw / 2, th2 / 2, tw / 2, th2 / 2 - 30); g.lineTo(tw / 2, 0); g.closePath(); g.fillStyle = '#B3221A'; g.fill(); g.fillStyle = theme.paper; for (let k = 0; k < 5; k++) { const x = -tw / 2 + 60 + k * (tw - 120) / 4; g.beginPath(); g.moveTo(x - 24, 0); g.lineTo(x + 24, 0); g.lineTo(x, -30 * (open > 12 ? 1 : 0.3)); g.fill(); } g.restore(); g.restore();
      } else { // wallet
        const rise = (ease.inOut(lin(t, 0.0, 3.6)) * 0.85 + 0.15 * lin(t, 0, 3.6)) * (1 - rk), wob = Math.sin(t * 5) * 0.04;
        g.save(); g.translate(0, 180);
        for (let i = 0; i < 3; i++) { g.save(); g.translate(-100 + i * 100, -140 - (i === 1 ? 70 * rise + 60 : 20)); g.rotate((i - 1) * 0.1 + (i === 1 ? wob : 0)); bill(g, -75, -90, 150, 190); g.restore(); }
        clay(g, -290, -120, 580, 360, 40, '#2c3e66', { shadowK: 0.8 }); g.fillStyle = 'rgba(0,0,0,.18)'; rr(g, -290, -120, 580, 90, 40); g.fill(); g.strokeStyle = 'rgba(111,134,184,.85)'; g.lineWidth = 5; g.setLineDash([14, 10]); rr(g, -262, -92, 524, 304, 28); g.stroke(); g.setLineDash([]);
        clay(g, 140, 20, 190, 110, 30, '#1f2d4d', { shadowK: 0.6 }); g.fillStyle = theme.gold; g.beginPath(); g.arc(235, 75, 20, 0, 7); g.fill();
        g.save(); g.translate(0, -230 - 150 * rise); g.rotate(0.12 + wob); tag(g, theme, 330, 190, '1%', 130); g.strokeStyle = theme.paper; g.lineWidth = 6; g.beginPath(); g.moveTo(-110, 70); g.lineTo(-100, 140 + 150 * rise); g.stroke(); g.restore(); g.restore();
      }
    },
  });

  // chip: a small pill label (screen layer for the always-on HYPOTHETICAL chip)
  B.register('chip', {
    defaults: { text: 'HYPOTHETICAL', size: 28, tone: 'paper' }, ownEnter: true, size: p => [mw(p.text, F.monoX(p.size)) + 56, p.size * 2],
    draw(g, p, env) { const [w, h] = this.size(p), k = spring(env.lt, 'bouncy'), th = env.theme; g.scale(0.6 + 0.4 * k, 0.6 + 0.4 * k); g.globalAlpha *= clamp(env.lt / 0.1);
      clay(g, -w / 2, -h / 2, w, h, h / 2, '#0B0F14', { shadowK: 0.5 }); g.strokeStyle = th.accent; g.lineWidth = 3; rr(g, -w / 2, -h / 2, w, h, h / 2); g.stroke(); txt(g, p.text, 0, 2, F.monoX(p.size), th.accent); },
  });

  // heart: one small pulse beside the storyteller (<= 1 s). screen layer.
  B.register('heart', {
    defaults: { s: 1, dur: 0.9 }, ownEnter: true, size: () => [160, 160],
    draw(g, p, env) { const lt = env.lt, k = spring(lt, { f: 2.6, z: 0.38 }), beat = 1 + 0.22 * Math.max(0, Math.sin((lt - 0.28) * 14)) * Math.exp(-(lt - 0.28) * 3) * (lt > 0.28 ? 1 : 0), fade = 1 - lin(lt, p.dur - 0.25, p.dur), s = p.s * (0.2 + 0.8 * k) * beat;
      g.globalAlpha *= clamp(lt / 0.06) * fade; g.rotate(-0.12); g.scale(s, s);
      const path = () => { g.beginPath(); g.moveTo(0, 56); g.bezierCurveTo(-90, -4, -62, -74, 0, -30); g.bezierCurveTo(62, -74, 90, -4, 0, 56); g.closePath(); };
      B.shadowed(g, path, '#FF3B30', 0.4); g.fillStyle = '#FF3B30'; path(); g.fill(); g.fillStyle = 'rgba(255,255,255,.35)'; g.beginPath(); g.ellipse(-34, -26, 14, 9, -0.6, 0, 7); g.fill();
      const r = lin(lt, 0.25, 0.8); if (r > 0 && r < 1) { g.strokeStyle = rgba('#FF3B30', 1 - r); g.lineWidth = 6; path(); g.save(); g.scale(1 + 0.8 * ease.out(r), 1 + 0.8 * ease.out(r)); path(); g.stroke(); g.restore(); } },
  });
})();
(function () {
const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, hash, hit } = B;
  // ---------- plane: the "send this" paper plane (screen layer) ----------
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
// ===== Penny doubled — shared custom recipes (hookart, ab, board, dealchips). Prepended to each cut's scene.js =====
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst, roll, hash, hit, wobble } = B;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  // research.md: amount on day n = $0.01 x 2^(n-1)  (cents on day n = 2^(n-1), exact in doubles up to day 30)
  const cents = n => Math.pow(2, n - 1), dol = n => cents(n) / 100;
  const money = n => '$' + B.fmtNum(dol(n), 2, true);
  window.PD = { dol, money };
  const bill = (g, x, y, w, h) => { clay(g, x, y, w, h - 2, 6, '#1FA366', { shadowK: 0.45 }); g.fillStyle = 'rgba(245,243,238,.82)'; g.fillRect(x + w * 0.42, y + 1, w * 0.16, h - 4); g.fillStyle = 'rgba(0,0,0,.16)'; g.fillRect(x, y + h - 4, w, 2); };

  // a clay penny (gold, brand colour) drawn face-on at the origin; sx squashes it for a spin
  function penny(g, r, sx, th, lbl = true) {
    sx = Math.max(0.1, Math.min(1, sx));
    g.save(); g.scale(sx, 1);
    g.fillStyle = '#8a6408'; g.beginPath(); g.arc(0, r * 0.14, r, 0, 7); g.fill();
    const hg = g.createRadialGradient(-r * 0.32, -r * 0.34, r * 0.1, 0, 0, r); hg.addColorStop(0, '#ffe27a'); hg.addColorStop(1, '#F2B705');
    g.fillStyle = hg; g.beginPath(); g.arc(0, 0, r, 0, 7); g.fill();
    g.strokeStyle = 'rgba(138,100,8,.75)'; g.lineWidth = Math.max(3, r * 0.05); g.beginPath(); g.arc(0, 0, r * 0.82, 0, 7); g.stroke();
    if (lbl && sx > 0.3) txt(g, '1¢', 0, r * 0.04, F.hero(r * 0.95), '#7a5806');
    g.restore();
  }

  // ---------- hookart: the frame-0 slam. 'brick' = cash brick drops beside a bouncing penny; 'slap' = penny slapped down, brick yanked off on a string ----------
  B.register('hookart', {
    defaults: { variant: 'brick', reAt: 99999, drop: 300 },
    size: () => [760, 760],
    anchors: () => ({ brick: [-150, 170, 470, 400], penny: [215, 190, 300, 320], all: [0, 40, 760, 700] }),
    draw(g, p, env) {
      const { t, theme } = env, te = t >= p.reAt ? t - p.reAt : t, base = 300;
      g.fillStyle = rgba(theme.paper, 0.28); rr(g, -360, base, 720, 6, 3); g.fill();
      const drawBrick = (cx, dy, rot, sq) => {
        const n = 13, bh = 30, w = 440;
        g.save(); g.translate(cx, base + dy); g.rotate(rot); g.scale(1, sq);
        for (let b = 0; b < n; b++) { const y = -(b + 1) * bh, jx = (hash(b * 7.7) - 0.5) * 12; g.save(); g.translate(jx, y + bh / 2); g.rotate((hash(b * 3.1) - 0.5) * 0.035); bill(g, -w / 2, -bh / 2, w, bh); g.restore(); }
        const by = -n * bh * 0.5; clay(g, -165, by - 46, 330, 92, 12, '#F5F3EE', { shadowK: 0.5 }); txt(g, '$1,000,000', 0, by + 2, F.hero(64), '#0B0F14');
        g.restore();
      };
      if (p.variant === 'brick') {
        const dk = ease.in(clamp((te + 0.1) / 0.14)), dy = -p.drop * (1 - dk), sq = 1 - 0.07 * hit(te - 0.04, 7), u = te - 0.04;
        drawBrick(-150, dy, 0, sq);
        // penny: sits, then hops and spins when the brick lands
        const hop = u > 0 ? 150 * Math.abs(Math.sin(u * 6.5)) * Math.exp(-u * 1.6) : 0, ang = 0.6 + (u > 0 ? 11 * (1 - Math.exp(-u * 1.1)) : 0), sx = Math.abs(Math.cos(ang)) * 0.88 + 0.12;
        g.fillStyle = 'rgba(2,4,9,.28)'; g.beginPath(); g.ellipse(215, base + 4, 100 * (1 - hop / 400), 14, 0, 0, 7); g.fill();
        g.save(); g.translate(215, base - 118 - hop); penny(g, 118, sx, theme); g.restore();
        if (u > 0) burst(g, -150, base - 6, 300, theme.accent, u - 0.02, 16, 0.5);
      } else { // slap
        const dk = ease.in(clamp((te + 0.1) / 0.14)), dy = -420 * (1 - dk), u = te - 0.04, sq = 1 - 0.1 * hit(u, 8);
        const pull = ease.in(lin(te, 0.5, 1.0)); // brick yanked away on a string
        const bx = -150 - 120 * 1250 * pull, by = -430 * pull, rot = 0.5 * pull;
        if (pull > 0) { g.strokeStyle = rgba(theme.paper, 0.7); g.lineWidth = 5; g.beginPath(); g.moveTo(bx, base + by - 200); g.lineTo(bx + 700, base - 900); g.stroke(); }
        drawBrick(bx, by, rot, 1);
        g.fillStyle = 'rgba(2,4,9,.3)'; g.beginPath(); g.ellipse(80, base + 4, 120, 16, 0, 0, 7); g.fill();
        g.save(); g.translate(80, base - 150 + dy + 150 * (1 - sq)); g.rotate(-0.1 * hit(u, 6) * Math.sin(u * 30)); g.scale(1, sq); penny(g, 150, 1, theme); g.restore();
        if (u > 0) { burst(g, 80, base - 150, 330, theme.accent, u - 0.02, 18, 0.55); }
      }
    },
  });

  // ---------- ab: two big clay buttons, A over B ----------
  B.register('ab', {
    defaults: { aAt: -1, bAt: -1, splitAt: 99999, wiggleAt: 99999, w: 900, h: 560, settle: false },
    size: p => [p.w, p.h],
    anchors: p => ({ a: [0, -150, p.w, 240], b: [0, 150, p.w, 240], all: [0, 0, p.w, p.h] }),
    draw(g, p, env) {
      const { t, theme } = env, bw = p.w - 20, bh = 240;
      const btn = (i, at, yc, col, letter, l1, l2) => {
        const on = t - at, k = at < -0.5 ? (p.settle ? 1 + 0.035 * wobble(t, 5, 5) : 1) : Math.min(1.08, spring(on, { f: 2.4, z: 0.5 }));
        if (at > -0.5 && on <= 0) return;
        g.save(); g.translate(0, yc); if (i === 1 && t >= p.wiggleAt) g.rotate(0.035 * wobble(t - p.wiggleAt, 5, 3.5));
        g.scale(1, Math.max(0.05, k)); g.globalAlpha *= at < -0.5 ? 1 : clamp(on / 0.06);
        clay(g, -bw / 2, -bh / 2 + 18, bw, bh - 18, 52, B.shade(col, -0.38), { shadowK: 0.8 });   // lip
        clay(g, -bw / 2, -bh / 2, bw, bh - 14, 52, col, { shadowK: 0.3 });                        // face
        g.fillStyle = '#0B0F14'; g.beginPath(); g.arc(-bw / 2 + 100, -7, 66, 0, 7); g.fill(); g.strokeStyle = theme.paper; g.lineWidth = 6; g.beginPath(); g.arc(-bw / 2 + 100, -7, 66, 0, 7); g.stroke();
        txt(g, letter, -bw / 2 + 100, -2, F.hero(104), theme.paper);
        txt(g, l1, -bw / 2 + 200, -34, F.hero(100), '#0B0F14', 'left'); txt(g, l2, -bw / 2 + 204, 62, F.monoX(40), 'rgba(11,15,20,.78)', 'left');
        if (i === 0) { for (let b = 0; b < 3; b++) { g.save(); g.translate(bw / 2 - 130, -20 - b * 26 + 26); g.rotate(-0.06 + b * 0.05); bill(g, -70, -20, 140, 40); g.restore(); } }
        else { const sp = t >= p.splitAt ? spring(t - p.splitAt, 'bouncy') : 0; g.save(); g.translate(bw / 2 - 140, -8); penny(g, 40, 1, theme); g.restore();
          if (sp > 0) { g.save(); g.translate(bw / 2 - 140 + 82 * Math.min(1.1, sp), -8); g.scale(Math.min(1.1, sp), Math.min(1.1, sp)); penny(g, 40, 1, theme); g.restore(); burst(g, bw / 2 - 100, -8, 100, theme.accent, t - p.splitAt - 0.03, 12, 0.4); } }
        g.restore();
      };
      btn(0, p.aAt, -150, theme.good, 'A', '$1,000,000', 'NOW');
      btn(1, p.bAt, 150, theme.gold, 'B', '1¢ DOUBLED', '× 30 DAYS');
    },
  });

  // ---------- dealchips: the deal terms as four paper chips ----------
  B.register('dealchips', {
    defaults: { items: [], w: 900 },
    size: p => [p.w, 400],
    anchors: p => ({ all: [0, 0, p.w, 520], c0: [-215, -80, 420, 130], c1: [215, -80, 420, 130], c2: [-215, 80, 420, 130], c3: [215, 80, 420, 130] }),
    draw(g, p, env) {
      const { t, theme } = env;
      if (p.items.length && t >= p.items[0].at) { const ho = t - p.items[0].at, hk = Math.min(1.08, spring(ho, 'bouncy')), f = F.monoX(30), tw2 = mw('ASSUMES · HYPOTHETICAL', f) + 56; g.save(); g.translate(0, -200); g.scale(0.6 + 0.4 * hk, 0.6 + 0.4 * hk); g.globalAlpha *= clamp(ho / 0.06); clay(g, -tw2 / 2, -30, tw2, 60, 30, '#0B0F14', { shadowK: 0.5 }); g.strokeStyle = theme.accent; g.lineWidth = 3; rr(g, -tw2 / 2, -30, tw2, 60, 30); g.stroke(); txt(g, 'ASSUMES · HYPOTHETICAL', 0, 3, f, theme.accent); g.restore(); }
      p.items.forEach((it, i) => {
        const on = t - it.at; if (on <= 0) return; const k = spring(on, 'bouncy'), cx = (i % 2 ? 215 : -215), cy = (i < 2 ? -80 : 80) + 0;
        g.save(); g.translate(cx, cy); g.scale(0.5 + 0.5 * Math.min(1.08, k), 0.5 + 0.5 * Math.min(1.08, k)); g.globalAlpha *= clamp(on / 0.06);
        clay(g, -205, -62, 410, 124, 62, B.tone(it.tone || 'paper', false), { shadowK: 0.7 }); txt(g, it.text, 0, 4, F.hero(it.size || 62), '#0B0F14'); g.restore(); burst(g, cx, cy, 170, theme.accent, on - 0.04, 12, 0.4);
      });
    },
  });

  // ---------- board: 30-day calendar (tiles flip to values) + penny stack vs the static $1,000,000 bar + PENNY vs MILLION meter ----------
  B.register('board', {
    defaults: { w: 940, h: 1290, ticker: [[0, 0]], unrollAt: -1, glow: [], flash: [], rainAt: 99999, rainEnd: 99999, notes: [] },
    size: p => [p.w, p.h],
    anchors: p => {
      const y0 = -p.h / 2, a = { head: [0, y0 + 56, p.w, 112], day: [p.w / 2 - 200, y0 + 56, 360, 100], cal: [0, y0 + 396, 900, 540], pile: [0, y0 + 900, p.w - 40, 400], mil: [-220, y0 + 930, 300, 340], stack: [190, y0 + 930, 330, 340], meter: [0, y0 + 1215, p.w - 40, 110], mtop: [0, y0 + 1190, p.w - 40, 70] };
      for (let i = 1; i <= 30; i++) { const c = (i - 1) % 5, r = Math.floor((i - 1) / 5); a['t' + i] = [-356 + c * 178, y0 + 171 + r * 90, 170, 82]; }
      return a;
    },
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, K = p.ticker;
      // day ticker: eased between keyframes
      let day = K[0][1]; for (let i = 0; i < K.length - 1; i++) { const a = K[i], b = K[i + 1]; if (t >= b[0]) day = b[1]; else if (t > a[0]) { day = lerp(a[1], b[1], ease.inOut(lin(t, a[0], b[0]))); break; } else break; }
      const speed = (() => { for (let i = 0; i < K.length - 1; i++) if (t > K[i][0] && t < K[i + 1][0]) return Math.abs(K[i + 1][1] - K[i][1]) / (K[i + 1][0] - K[i][0]); return 0; })();
      paper(g, x0, y0, w, h, 28, { lift });
      g.save(); rr(g, x0, y0, w, h, 28); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 112); const hg = g.createLinearGradient(0, y0, 0, y0 + 112); hg.addColorStop(0, 'rgba(255,255,255,.12)'); hg.addColorStop(1, 'rgba(0,0,0,.14)'); g.fillStyle = hg; g.fillRect(x0, y0, w, 124); g.restore();
      txt(g, 'PENNY vs $1,000,000', x0 + 36, y0 + 44, F.hero(44), theme.paper, 'left'); txt(g, 'OUR MATH · HYPOTHETICAL · 1¢ × 2^(DAY−1)', x0 + 38, y0 + 86, F.mono(20), rgba(theme.paper, 0.78), 'left');
      txt(g, 'DAY', x0 + w - 210, y0 + 60, F.hero(36), rgba(theme.paper, 0.8), 'right'); roll(g, Math.round(day), x0 + w - 36, y0 + 58, { font: F.hero(80), size: 80, color: theme.accent, align: 'right', speed: speed > 6 ? speed * 0.4 : 0 });
      // ---- calendar ----
      for (let i = 1; i <= 30; i++) {
        const c = (i - 1) % 5, r = Math.floor((i - 1) / 5), cx = -356 + c * 178, cy = y0 + 171 + r * 90;
        let po = 1; if (p.unrollAt > -0.5) { const on = t - p.unrollAt - i * 0.022; if (on <= 0) continue; po = Math.min(1.06, spring(on, 'snappy')); }
        const k = clamp((day - (i - 0.6)) / 0.6), sy = Math.max(0.05, Math.abs(Math.cos(Math.PI * k))), face = k >= 0.5, glow = p.glow.some(([gt, gi]) => gi === i && t >= gt), fl = p.flash.find(([ft, fi]) => fi === i && t >= ft);
        g.save(); g.translate(cx, cy); g.scale(po, po * sy);
        if (!face) { g.fillStyle = glow ? rgba(theme.accent, 0.5) : theme.paperShade; rr(g, -85, -41, 170, 82, 16); g.fill(); g.strokeStyle = glow ? theme.accentInk : theme.rule; g.lineWidth = glow ? 6 : 2.5; rr(g, -85, -41, 170, 82, 16); g.stroke(); txt(g, String(i), 0, 3, F.hero(42), glow ? theme.ink : theme.inkSoft); }
        else { const col = i >= 28 ? theme.good : theme.gold; clay(g, -85, -41, 170, 82, 16, col, { shadowK: 0.5 }); txt(g, 'DAY ' + i, -72, -25, F.monoX(17), 'rgba(11,15,20,.7)', 'left');
          const s = money(i); let fs = 30; while (fs > 14 && mw(s, F.monoX(fs)) > 150) fs--; txt(g, s, 0, 12, F.monoX(fs), '#0B0F14'); }
        g.restore();
        if (fl) { const ft = t - fl[0]; burst(g, cx, cy, 120, theme.bad, ft - 0.03, 12, 0.45); if (ft < 1.2) { g.save(); g.strokeStyle = rgba(theme.bad, 0.9 * (1 - lin(ft, 0.6, 1.2))); g.lineWidth = 7; rr(g, cx - 89, cy - 45, 178, 90, 18); g.stroke(); g.restore(); } }
      }
      // ---- pile vs bar ----
      const baseY = y0 + 1100, H = 280, dd = Math.max(day, 1), v = dol(1) * Math.pow(2, dd - 1), vmax = Math.max(1e6, v), hm = 1e6 / vmax * H, hp = day < 0.99 ? 0 : Math.max(14, v / vmax * H), mx = -220, px = 190, bw = 290, pw = 240;
      g.fillStyle = theme.ink; g.fillRect(x0 + 40, baseY, w - 80, 6);
      if (hm > 1) { clay(g, mx - bw / 2, baseY - hm, bw, hm, 14, '#1FA366', { shadowK: 0.6 }); g.save(); rr(g, mx - bw / 2, baseY - hm, bw, hm, 14); g.clip(); g.fillStyle = 'rgba(0,0,0,.13)'; for (let y = baseY - 18; y > baseY - hm; y -= 18) g.fillRect(mx - bw / 2, y, bw, 2.5); g.fillStyle = 'rgba(245,243,238,.82)'; g.fillRect(mx - 24, baseY - hm, 48, hm); g.restore(); }
      txt(g, '$1,000,000', mx, baseY - hm - 38, F.hero(54), theme.goodInk);
      if (hp > 0) { // penny stack
        g.save(); const top = baseY - hp, ry = 24;
        g.fillStyle = '#8a6408'; rr(g, px - pw / 2, top, pw, hp, 8); g.fill();
        const cg = g.createLinearGradient(px - pw / 2, 0, px + pw / 2, 0); cg.addColorStop(0, '#d9a406'); cg.addColorStop(0.35, '#ffe27a'); cg.addColorStop(1, '#b88700'); g.fillStyle = cg; rr(g, px - pw / 2, top, pw, hp, 8); g.fill();
        g.save(); rr(g, px - pw / 2, top, pw, hp, 8); g.clip(); g.fillStyle = 'rgba(100,70,0,.35)'; for (let y = baseY - 9; y > top; y -= 9) g.fillRect(px - pw / 2, y, pw, 2); g.restore();
        g.fillStyle = '#ffe27a'; g.beginPath(); g.ellipse(px, top, pw / 2, ry, 0, 0, 7); g.fill(); g.strokeStyle = 'rgba(138,100,8,.8)'; g.lineWidth = 4; g.beginPath(); g.ellipse(px, top, pw / 2 - 16, ry - 7, 0, 0, 7); g.stroke();
        g.restore();
        roll(g, v, px, top - 56, { font: F.hero(hp > 240 ? 66 : 60), size: 62, color: v >= 1e6 ? theme.goodInk : theme.badInk, prefix: '$', decimals: 2, speed: speed > 0 ? Math.max(30, v * Math.LN2 * speed) : 0 });
      }
      // the $1M line across
      g.save(); g.strokeStyle = rgba(theme.ink, 0.55); g.lineWidth = 3; g.setLineDash([12, 9]); g.beginPath(); g.moveTo(mx + bw / 2 - 4, baseY - hm); g.lineTo(x0 + w - 40, baseY - hm); g.stroke(); g.restore();
      txt(g, 'A · TAKE THE MILLION', mx, baseY + 40, F.mono(21), theme.inkSoft); txt(g, 'B · THE PENNY', px, baseY + 40, F.mono(21), theme.inkSoft);
      // rain of coins burying the bar
      if (t >= p.rainAt && t < p.rainEnd) { const rt = t - p.rainAt; for (let i = 0; i < 34; i++) { const ph = ((rt * 1.6 + hash(i * 1.7)) % 1), x = lerp(mx - 140, mx + 150, hash(i * 4.1)), y = lerp(baseY - H - 330, baseY - 30, ph * ph);
        g.save(); g.globalAlpha *= clamp(ph * 8) * (1 - lin(ph, 0.92, 1)); g.translate(x, y); g.scale(1, 0.55); penny(g, 22, 1, theme, false); g.restore(); } }
      // callout chips in the slot between calendar and pile
      for (const n of p.notes) if (t >= n.at && t < n.out) { const nt = t - n.at, k = Math.min(1.08, spring(nt, 'bouncy')), f = F.hero(38), tw2 = mw(n.text, f) + 56;
        g.save(); g.translate(0, y0 + 700); g.scale(0.6 + 0.4 * k, 0.6 + 0.4 * k); g.globalAlpha *= clamp(nt / 0.06) * (1 - lin(t, n.out - 0.2, n.out)); clay(g, -tw2 / 2, -29, tw2, 58, 29, B.tone(n.tone || 'bad', false), { shadowK: 0.6 }); txt(g, n.text, 0, 3, f, n.fg || theme.paper); g.restore(); burst(g, 0, y0 + 700, tw2 * 0.55, theme.bad, nt - 0.04, 12, 0.4); }
      // ---- meter ----
      const pct = v / 1e6 * 100, my = y0 + 1215, tx0 = x0 + 40, tw = w - 80, over = pct > 100, shown = day < 0.99 ? 0 : pct;
      txt(g, 'PENNY vs MILLION', tx0 + tw * 0.42, my - 40, F.monoX(24), theme.inkSoft, 'center');
      const ps = shown >= 100 ? B.fmtNum(Math.round(shown), 0, true) + '%' : (shown < 0.1 ? '<0.1' : shown < 10 ? shown.toFixed(1) : String(Math.floor(shown))) + '%', st = shown >= 100 ? 'AHEAD' : shown > 0 ? 'BEHIND' : '';
      txt(g, st ? ps + ' · ' + st : '', tx0 + tw, my - 42, F.hero(44), over ? theme.goodInk : theme.badInk, 'right');
      g.fillStyle = theme.paperShade; rr(g, tx0, my - 6, tw, 46, 23); g.fill(); g.strokeStyle = theme.rule; g.lineWidth = 2.5; rr(g, tx0, my - 6, tw, 46, 23); g.stroke();
      const main = tw * 0.72, fr = Math.min(shown, 100) / 100 * main + (over ? Math.min(1, (shown - 100) / 437) * (tw - main) : 0);
      if (fr > 4) { g.save(); rr(g, tx0, my - 6, tw, 46, 23); g.clip(); clay(g, tx0, my - 6, Math.max(fr, 46), 46, 23, over ? theme.good : theme.bad, { shadowK: 0.3 }); g.restore(); }
      g.strokeStyle = theme.ink; g.lineWidth = 4; g.beginPath(); g.moveTo(tx0 + main, my - 16); g.lineTo(tx0 + main, my + 50); g.stroke();
    },
  });
})();
// ===== What If: "YOU" — the recurring cartoon player (RULES 112 / CRIME-SHOW §4). Same design every time, moods keyed to the story. =====
(function () {
  const B = window.BM2, { clamp, ease, spring, rr, txt, F, paper } = B;
  const INK = '#1a1210', SK = '#F0BE94', MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const stroke = (g, w = 5) => { g.strokeStyle = INK; g.lineWidth = w; g.lineJoin = 'round'; g.lineCap = 'round'; g.stroke(); };
  const you = (g, cx, cy, s, mood, t) => {
    g.save(); g.translate(cx, cy); g.scale(s, s);
    const bob = Math.sin(t * 3) * (mood === 'wow' || mood === 'happy' ? 6 : 2); g.translate(0, bob);
    // hoodie body
    g.fillStyle = '#E8590C'; g.beginPath(); g.moveTo(-140, 200); g.quadraticCurveTo(-138, 100, -56, 84); g.lineTo(56, 84); g.quadraticCurveTo(138, 100, 140, 200); g.closePath(); g.fill(); stroke(g, 5);
    g.fillStyle = '#C94A08'; g.beginPath(); g.ellipse(0, 90, 62, 26, 0, 0, 7); g.fill(); stroke(g, 4);
    g.strokeStyle = '#F5F3EE'; g.lineWidth = 5; g.beginPath(); g.moveTo(-18, 98); g.lineTo(-20, 150); g.moveTo(18, 98); g.lineTo(20, 150); g.stroke();
    // head
    g.fillStyle = SK; g.beginPath(); g.ellipse(0, -8, 74, 88, 0, 0, 7); g.fill(); stroke(g, 5);
    g.fillStyle = '#F5F3EE'; for (const sx of [-1, 1]) { g.fillStyle = SK; g.beginPath(); g.ellipse(sx * 75, 6, 12, 20, 0, 0, 7); g.fill(); stroke(g, 4); }
    // gold cap
    g.fillStyle = '#F2B705'; g.beginPath(); g.moveTo(-78, -30); g.bezierCurveTo(-84, -112, 84, -112, 78, -30); g.closePath(); g.fill(); stroke(g, 5); g.beginPath(); g.moveTo(-70, -34); g.quadraticCurveTo(0, -20, 100, -38); g.quadraticCurveTo(110, -50, 90, -52); g.lineTo(-70, -50); g.closePath(); g.fillStyle = '#D99A00'; g.fill(); stroke(g, 4); txt(g, '¢', 0, -78, F.hero(34), INK);
    // eyes / brows / mouth by mood
    const E = { neutral: 6, smirk: 6, worried: 7, angry: 6, wow: 11, happy: 6 }[mood] || 6, bl = (t % 3.3) > 3.2 ? 0.15 : 1;
    for (const x of [-30, 30]) { if (mood === 'wow') { g.fillStyle = '#fff'; g.beginPath(); g.ellipse(x, -6, 17, 18, 0, 0, 7); g.fill(); stroke(g, 3.5); } g.fillStyle = INK; g.beginPath(); g.ellipse(x, -4, E, E * bl, 0, 0, 7); g.fill(); }
    g.beginPath(); if (mood === 'worried') { g.moveTo(-52, -26); g.lineTo(-12, -38); g.moveTo(52, -26); g.lineTo(12, -38); } else if (mood === 'angry') { g.moveTo(-52, -40); g.lineTo(-12, -26); g.moveTo(52, -40); g.lineTo(12, -26); } else if (mood === 'wow') { g.moveTo(-52, -42); g.lineTo(-12, -46); g.moveTo(52, -46); g.lineTo(12, -42); } else { g.moveTo(-52, -34); g.lineTo(-12, -36); g.moveTo(12, -36); g.lineTo(52, -34); } stroke(g, 5.5);
    g.beginPath(); g.moveTo(-3, 6); g.quadraticCurveTo(-10, 24, 4, 26); stroke(g, 3.5);
    g.beginPath();
    if (mood === 'worried') { g.moveTo(-22, 52); g.quadraticCurveTo(0, 40, 22, 52); stroke(g, 5); }
    else if (mood === 'angry') { g.moveTo(-26, 54); g.lineTo(26, 50); stroke(g, 5.5); g.beginPath(); g.moveTo(-14, 54); g.lineTo(-12, 46); g.moveTo(0, 53); g.lineTo(0, 46); g.moveTo(14, 52); g.lineTo(12, 46); stroke(g, 3); }
    else if (mood === 'wow') { g.ellipse(0, 54, 15, 20, 0, 0, 7); g.fillStyle = '#7a1f12'; g.fill(); stroke(g, 4.5); }
    else if (mood === 'happy') { g.moveTo(-34, 44); g.quadraticCurveTo(0, 82, 34, 44); g.closePath(); g.fillStyle = '#7a1f12'; g.fill(); stroke(g, 4.5); g.fillStyle = '#fff'; g.fillRect(-24, 46, 48, 10); }
    else if (mood === 'smirk') { g.moveTo(-26, 50); g.quadraticCurveTo(8, 66, 34, 42); stroke(g, 5); }
    else { g.moveTo(-24, 52); g.quadraticCurveTo(0, 60, 24, 52); stroke(g, 5); }
    if (mood === 'worried') { const dy = (t * 40) % 28; g.fillStyle = '#7CC8FF'; g.beginPath(); g.moveTo(88, -60 + dy); g.quadraticCurveTo(104, -34 + dy, 88, -28 + dy); g.quadraticCurveTo(72, -34 + dy, 88, -60 + dy); g.fill(); stroke(g, 3); }
    // the penny in his hand
    g.save(); g.translate(112, 150); g.rotate(-0.3); g.fillStyle = SK; g.beginPath(); g.arc(0, 46, 24, 0, 7); g.fill(); stroke(g, 4); g.fillStyle = '#C9852B'; g.beginPath(); g.arc(0, 0, 40, 0, 7); g.fill(); stroke(g, 4.5); g.fillStyle = '#E6A04A'; g.beginPath(); g.arc(-6, -6, 26, 0, 7); g.fill(); txt(g, '1¢', 0, 2, F.hero(28), INK); g.restore();
    g.restore();
  };
  B.you = you;
  B.register('you', {
    defaults: { keys: [], text: 'YOU' }, ownEnter: true, size: () => [230, 330],
    anchors: () => ({ face: [0, -40, 200, 240] }),
    draw(g, p, env) {
      const { lt, t, theme } = env, k = spring(lt, 'snappy'); let K = { mood: 'neutral', text: 'YOU', at: -1 }; for (const q of p.keys) if (t >= q.at) K = q;
      const o = t - K.at, pop = 1 + 0.07 * Math.exp(-o * 7) * Math.cos(o * 22);
      g.save(); g.translate((1 - k) * -300, 0); g.scale(pop, pop); g.rotate(-0.03); g.globalAlpha *= clamp(lt / 0.08);
      paper(g, -100, -150, 200, 262, 14, { lift: 0.5 }); g.save(); rr(g, -90, -140, 180, 190, 12); g.clip(); const bg = g.createRadialGradient(0, -40, 10, 0, -20, 150); bg.addColorStop(0, '#7FD6C9'); bg.addColorStop(1, '#2E9C8E'); g.fillStyle = bg; g.fillRect(-90, -140, 180, 190);
      you(g, 0, -34, 0.62, K.mood, t); g.restore(); g.strokeStyle = INK; g.lineWidth = 4; rr(g, -90, -140, 180, 190, 12); g.stroke();
      g.fillStyle = '#E8590C'; rr(g, -90, 56, 180, 28, 8); g.fill(); txt(g, 'YOU · ILLUSTRATION', 0, 70, F.cap(13), '#F5F3EE');
      const w = Math.max(196, mw(K.text, F.cap(22)) + 22); g.save(); g.translate(0, 120); g.fillStyle = theme.ink; rr(g, -w / 2, -20, w, 40, 10); g.fill(); g.strokeStyle = K.tone === 'bad' ? '#FF3B30' : K.tone === 'good' ? '#00D26A' : '#FFD60A'; g.lineWidth = 3; rr(g, -w / 2, -20, w, 40, 10); g.stroke(); txt(g, K.text, 0, 2, F.cap(22), g.strokeStyle); g.restore();
      g.restore();
    },
  });
})();
// ===== penny-doubled v5 — ONE clean idea at a time. Full-screen stage ('pstage') drawn in screen space (camera can never crop it).
// Layout (1080x1920): pill y238-290 | counter card y322-552 | scene zone y590-1085 | row y1100-1335 (YOU left, CTA/chip middle, storyteller right) | captions y~1432.
// Every number is fitted to the zone width (margin >= 70 px). Doubling math: day n = 0.01 x 2^(n-1) dollars (research.md), computed in code.
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, burst, hash, hit } = B;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const dol = n => Math.pow(2, n - 1) / 100, fmt = (v, d = 2) => B.fmtNum(v, d, true), money = n => '$' + fmt(dol(n), 2);
  window.PD5 = { dol, money, h: {} };
  const fit = (s, ff, maxW, size, min = 18) => { while (size > min && mw(s, ff(size)) > maxW) size -= 2; return size; };
  const stk = (g, s, x, y, font, col, al = 'center', lw = 12) => { g.save(); g.font = font; g.textAlign = al; g.textBaseline = 'middle'; g.lineJoin = 'round'; g.lineWidth = lw; g.strokeStyle = 'rgba(6,8,11,.92)'; g.strokeText(s, x, y); g.fillStyle = col; g.fillText(s, x, y); g.restore(); };
  const TONE = th => ({ paper: th.paper, accent: th.accent, good: th.good, bad: th.bad, gold: th.gold, ink: '#0B0F14' });

  // ---------- coins ----------
  const cache = {};
  function sprite(r) {
    const R = Math.max(2, Math.round(r * 2) / 2); if (cache[R]) return cache[R];
    const pad = 4, th = Math.max(2, R * 0.13), c = document.createElement('canvas'); c.width = Math.ceil(2 * R + 2 * pad); c.height = Math.ceil(2 * R + th + 2 * pad); const g = c.getContext('2d'), cx = c.width / 2, cy = pad + R;
    g.fillStyle = '#7a5806'; g.beginPath(); g.arc(cx, cy + th, R, 0, 7); g.fill();
    const hg = g.createRadialGradient(cx - R * 0.32, cy - R * 0.34, R * 0.1, cx, cy, R); hg.addColorStop(0, '#ffe58a'); hg.addColorStop(1, '#E3A400'); g.fillStyle = hg; g.beginPath(); g.arc(cx, cy, R, 0, 7); g.fill();
    g.strokeStyle = 'rgba(122,88,6,.85)'; g.lineWidth = Math.max(1, R * 0.07); g.beginPath(); g.arc(cx, cy, R * 0.8, 0, 7); g.stroke();
    g.strokeStyle = 'rgba(60,40,0,.55)'; g.lineWidth = Math.max(1, R * 0.05); g.beginPath(); g.arc(cx, cy, R - 0.5, 0, 7); g.stroke();
    if (R >= 20) txt(g, '1¢', cx, cy + R * 0.03, F.hero(R * 0.9), '#6b4d05');
    return (cache[R] = { c, cx, cy });
  }
  const coin = (g, x, y, r, a = 1) => { const s = sprite(r); g.globalAlpha = a; g.drawImage(s.c, x - s.cx, y - s.cy); g.globalAlpha = 1; };
  const dims = m => [1 << Math.ceil(m / 2), 1 << Math.floor(m / 2)];
  const cell = (i, m) => { let cx = 0, cy = 0; for (let b = 0; b < m; b++) if ((i >> b) & 1) { if (b % 2 === 0) cx += 1 << (b >> 1); else cy += 1 << (b >> 1); } return [cx, cy]; };
  const BOX = { x: 90, y: 612, w: 900, h: 388 };
  const radius = m => { const [c, r] = dims(m); return Math.min(100, BOX.w / (c * 2.14), BOX.h / (r * 2.14)); };
  const place = (i, m) => { const [c, r] = dims(m), R = radius(m), pit = 2.14 * R, ci = cell(i, m); return [BOX.x + BOX.w / 2 - (c * pit) / 2 + (ci[0] + 0.5) * pit + (hash(i * 3.1) - 0.5) * R * 0.1, BOX.y + BOX.h / 2 - (r * pit) / 2 + (ci[1] + 0.5) * pit + (hash(i * 5.3) - 0.5) * R * 0.1]; };

  // ---------- small helpers ----------
  const dayAt = (t, K) => { let day = K[0][1]; for (let i = 0; i < K.length - 1; i++) { const a = K[i], b = K[i + 1]; if (t >= b[0]) day = b[1]; else if (t > a[0]) { day = lerp(a[1], b[1], ease.inOut(lin(t, a[0], b[0]))); break; } else break; } return day; };
  const label = (g, s, x, y, col, size = 26, al = 'center') => txt(g, s, x, y, F.monoX(size), col, al);
  function chip(g, s, x, y, tone, th, size = 44, maxW = 900, k = 1) {
    const sz = fit(s, F.hero, maxW - 70, size), w = mw(s, F.hero(sz)) + 70, h = sz * 1.45; g.save(); g.translate(x, y); g.scale(0.7 + 0.3 * k, 0.7 + 0.3 * k);
    clay(g, -w / 2, -h / 2, w, h, h / 2, TONE(th)[tone] || tone, { shadowK: 0.6 }); txt(g, s, 0, 3, F.hero(sz), tone === 'bad' || tone === 'ink' ? th.paper : '#0B0F14'); g.restore();
  }
  function stamp(g, s, x, y, tone, th, size, rot, k) {
    const sz = fit(s, F.hero, 840, size), w = mw(s, F.hero(sz)) + 60, h = sz * 1.4, col = TONE(th)[tone] || tone; g.save(); g.translate(x, y); g.rotate(rot); g.scale(1.5 - 0.5 * Math.min(1.05, k), 1.5 - 0.5 * Math.min(1.05, k)); g.globalAlpha *= clamp(k * 3);
    g.fillStyle = 'rgba(11,15,20,.88)'; rr(g, -w / 2, -h / 2, w, h, 14); g.fill(); g.strokeStyle = col; g.lineWidth = 7; rr(g, -w / 2 + 5, -h / 2 + 5, w - 10, h - 10, 10); g.stroke(); txt(g, s, 0, 3, F.hero(sz), col); g.restore();
  }

  // ---------- scene painters (each draws in absolute screen coordinates; `a` = scene alpha, lt = scene-local time) ----------
  function hookText(g, p, t, th) {
    const H = p.hook; if (!H || t > H.until + 0.35) return; const T = TONE(th), k = Math.min(1.06, 0.88 + 0.12 * Math.min(1.1, spring(t + 0.12, { f: 2.6, z: 0.5 }))), fade = 1 - lin(t, H.until, H.until + 0.3);
    let size = H.size; for (const ln of H.lines) { const s = ln.map(x => x[0]).join(''); size = fit(s, F.hero, 920, size, 40); }
    g.save(); g.globalAlpha *= fade; g.translate(540, H.y); g.scale(k, k);
    const lh = size * 1.1; H.lines.forEach((ln, i) => { const s = ln.map(x => x[0]).join(''); let x = -mw(s, F.hero(size)) / 2; const y = (i - (H.lines.length - 1) / 2) * lh; for (const [w, tn] of ln) { const ww = mw(w, F.hero(size)); stk(g, w, x + ww / 2, y, F.hero(size), T[tn] || th.paper, 'center', 16); x += ww; } });
    if (H.sub && t >= H.sub.at) { const kk = spring(t - H.sub.at, 'snappy'); g.globalAlpha *= clamp(kk * 2); const sz = fit(H.sub.text, F.cap, 900, 40, 22); stk(g, H.sub.text, 0, (H.lines.length / 2) * lh + 10 + (1 - kk) * 14, F.cap(sz), th.bad, 'center', 10); }
    g.restore();
  }
  function deal(g, p, lt, t, th, a) {
    const D = p.deal, bw = 920, bh = 196, ys = [712, 936];
    D.cards.forEach((c, i) => {
      const on = t - c.at; if (on <= 0) return; const k = spring(on, 'bouncy'), y = ys[i];
      g.save(); g.translate(540, y + (1 - Math.min(1, k)) * 70); g.scale(0.85 + 0.15 * Math.min(1.06, k), 0.85 + 0.15 * Math.min(1.06, k)); g.globalAlpha *= clamp(on / 0.07);
      clay(g, -bw / 2, -bh / 2 + 16, bw, bh - 16, 48, B.shade(c.col, -0.38), { shadowK: 0.8 }); clay(g, -bw / 2, -bh / 2, bw, bh - 14, 48, c.col, { shadowK: 0.3 });
      g.fillStyle = '#0B0F14'; g.beginPath(); g.arc(-bw / 2 + 98, -6, 62, 0, 7); g.fill(); g.strokeStyle = th.paper; g.lineWidth = 6; g.beginPath(); g.arc(-bw / 2 + 98, -6, 62, 0, 7); g.stroke(); txt(g, c.letter, -bw / 2 + 98, -3, F.hero(96), th.paper);
      const mx = c.icon ? 440 : 640, sz = fit(c.l1, F.hero, mx, 92, 40); txt(g, c.l1, -bw / 2 + 190, -36, F.hero(sz), '#0B0F14', 'left'); const s2 = fit(c.l2, F.monoX, mx, 38, 20); txt(g, c.l2, -bw / 2 + 192, 52, F.monoX(s2), 'rgba(11,15,20,.8)', 'left');
      if (c.icon === 'bill') for (let b = 0; b < 3; b++) { g.save(); g.translate(bw / 2 - 100, 10 - b * 24); g.rotate(-0.06 + b * 0.05); clay(g, -62, -20, 124, 40, 6, '#1FA366', { shadowK: 0.45 }); g.fillStyle = 'rgba(245,243,238,.8)'; g.fillRect(-10, -19, 20, 36); g.restore(); }
      if (c.icon === 'coin') { coin(g, bw / 2 - 70, -6, 50); if (c.dbl) { const sp = spring(t - c.dbl, 'bouncy'); if (sp > 0) { coin(g, bw / 2 - 70 - 110 * Math.min(1.1, sp), -6, 50 * Math.min(1, sp)); } } }
      g.restore(); burst(g, 540, y, 300, c.col, on - 0.04, 12, 0.4);
    });
    if (D.chip && t >= D.chip.at) { const k = spring(t - D.chip.at, 'bouncy'); chip(g, D.chip.text, 540, 1068, 'ink', th, 34, 900, k); }
  }
  function coins(g, p, lt, t, th, dd) {
    const mf = clamp(dd - 1, 0, 9), m = Math.min(9, Math.floor(mf + 1e-4)), fr = Math.max(0, mf - m), u = m >= 9 ? 0 : ease.out(clamp(fr / 0.85)), N = 1 << m, R = lerp(radius(m), radius(m + 1), u);
    for (let i = 0; i < N; i++) { const a0 = place(i, m), a1 = place(i, m + 1); coin(g, lerp(a0[0], a1[0], u), lerp(a0[1], a1[1], u), R); }
    if (u > 0.001) for (let i = N; i < 2 * N; i++) {
      const [x1, y1] = place(i, m + 1), bit = Math.floor(Math.log2(i)), horiz = bit % 2 === 0, ui = ease.out(clamp((fr - 0.3 * hash(i * 1.7)) / 0.7)); if (ui <= 0) continue;
      const ox = horiz ? 560 * (1 - ui) : 0, oy = horiz ? 0 : 440 * (1 - ui), arc = -Math.sin(Math.PI * ui) * 70; coin(g, x1 + ox, y1 + oy + arc, R, clamp(ui * 4)); }
    const dn = Math.floor(dd + 1e-4), n = 1 << (dn - 1), s = n === 1 ? '1 COIN' : fmt(n, 0) + ' COINS', pk = 1 + 0.07 * hit(fr < 0.9 ? fr : 0, 6);
    g.save(); g.translate(540, 1050); g.scale(pk, pk); chip(g, s, 0, 0, 'accent', th, 42, 560); if (fr > 0.02 && fr < 0.95 && m < 9) stk(g, '×2', 300, -2, F.hero(60), th.good, 'center', 12); g.restore();
  }
  function item(g, p, lt, t, th, S) {
    const k = Math.min(1.08, spring(lt, 'bouncy')), cx = 540, cy = 790; g.save(); g.translate(cx, cy); g.scale(0.7 + 0.3 * k, 0.7 + 0.3 * k);
    if (S.kind === 'coffee') {
      for (let i = 0; i < 3; i++) { g.strokeStyle = 'rgba(245,243,238,.7)'; g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); const x = -50 + i * 50, ph = t * 3 + i * 1.7; g.moveTo(x, -150); g.bezierCurveTo(x + 22 * Math.sin(ph), -180, x - 22 * Math.sin(ph), -205, x + 8 * Math.sin(ph + 1), -240); g.stroke(); }
      const cup = () => { g.beginPath(); g.moveTo(-130, -120); g.lineTo(130, -120); g.lineTo(104, 150); g.quadraticCurveTo(100, 176, 76, 176); g.lineTo(-76, 176); g.quadraticCurveTo(-100, 176, -104, 150); g.closePath(); };
      B.shadowed(g, cup, '#F5F3EE', 0.5); g.fillStyle = '#F5F3EE'; cup(); g.fill(); g.fillStyle = '#C48A4A'; g.beginPath(); g.moveTo(-122, -40); g.lineTo(122, -40); g.lineTo(112, 80); g.lineTo(-112, 80); g.closePath(); g.fill();
      g.fillStyle = '#EDE7DA'; rr(g, -146, -150, 292, 40, 16); g.fill(); g.strokeStyle = '#0B0F14'; g.lineWidth = 4; rr(g, -146, -150, 292, 40, 16); g.stroke(); txt(g, '1', 0, 20, F.hero(70), '#3b2410');
      g.strokeStyle = '#F5F3EE'; g.lineWidth = 22; g.beginPath(); g.arc(150, 20, 52, -1.1, 1.1); g.stroke();
    } else {
      const sl = (y, col) => { clay(g, -190, y, 380, 56, 28, col, { shadowK: 0.5 }); };
      sl(40, '#D9A25B'); g.fillStyle = '#7BC74D'; for (let i = 0; i < 8; i++) { g.beginPath(); g.ellipse(-168 + i * 48, 28, 30, 18, 0, 0, 7); g.fill(); } clay(g, -180, -24, 360, 44, 14, '#E8553D', { shadowK: 0.4 }); clay(g, -176, -62, 352, 40, 14, '#F2D064', { shadowK: 0.4 }); sl(-130, '#E0AE6B');
      g.fillStyle = '#F5F3EE'; for (let i = 0; i < 5; i++) { g.beginPath(); g.ellipse(-100 + i * 50, -112, 6, 3.5, 0.4, 0, 7); g.fill(); }
      g.strokeStyle = '#0B0F14'; g.lineWidth = 5; g.beginPath(); g.arc(-70, 40, 6, 0, 7); g.stroke();
    }
    g.restore();
    const kk = spring(lt - 0.25, 'snappy'); g.save(); g.globalAlpha *= clamp(kk * 2); stk(g, S.l1, 540, 1000 + (1 - kk) * 16, F.hero(fit(S.l1, F.hero, 880, 100, 40)), th.accent, 'center', 14); g.restore();
  }
  function bars(g, p, lt, t, th, dd, S) {
    const base = 1032, maxH = 300, v = dol(1) * Math.pow(2, dd - 1), vm = Math.max(1e6, v), hm = (1e6 / vm) * maxH, hp = Math.max(5, (v / vm) * maxH), mx = 300, px = 760, bw = 300;
    g.fillStyle = 'rgba(245,243,238,.75)'; g.fillRect(90, base, 900, 5);
    // million brick (stacked bills)
    clay(g, mx - bw / 2, base - hm, bw, hm, 12, '#1FA366', { shadowK: 0.6 }); g.save(); rr(g, mx - bw / 2, base - hm, bw, hm, 12); g.clip(); g.fillStyle = 'rgba(0,0,0,.14)'; for (let y = base - 15; y > base - hm; y -= 15) g.fillRect(mx - bw / 2, y, bw, 2.5); g.fillStyle = 'rgba(245,243,238,.5)'; g.fillRect(mx - 18, base - hm, 36, hm); g.restore();
    const ml = '$1,000,000'; txt(g, ml, mx, base - hm - 36, F.hero(fit(ml, F.hero, 360, 62)), th.good);
    // dashed million line
    g.save(); g.strokeStyle = 'rgba(245,243,238,.55)'; g.lineWidth = 3; g.setLineDash([12, 9]); g.beginPath(); g.moveTo(mx + bw / 2, base - hm); g.lineTo(px + bw / 2 + 10, base - hm); g.stroke(); g.restore();
    // penny tower
    const top = base - hp, pw = bw; g.save(); const gg = g.createLinearGradient(px - pw / 2, 0, px + pw / 2, 0); gg.addColorStop(0, '#c58f00'); gg.addColorStop(0.4, '#ffe27a'); gg.addColorStop(1, '#b88700'); g.fillStyle = gg; rr(g, px - pw / 2, top, pw, hp, 6); g.fill();
    g.save(); rr(g, px - pw / 2, top, pw, hp, 6); g.clip(); g.fillStyle = 'rgba(100,70,0,.42)'; for (let y = base - 8; y > top; y -= 8) g.fillRect(px - pw / 2, y, pw, 2); g.restore();
    g.fillStyle = '#ffe58a'; g.beginPath(); g.ellipse(px, top, pw / 2, 12, 0, 0, 7); g.fill(); g.strokeStyle = 'rgba(122,88,6,.85)'; g.lineWidth = 3; g.beginPath(); g.ellipse(px, top, pw / 2 - 12, 7, 0, 0, 7); g.stroke(); g.restore();
    const pl = money(Math.floor(dd + 1e-4)); txt(g, pl, px, top - 38, F.hero(fit(pl, F.hero, 430, 62)), v >= 1e6 ? th.good : th.accent);
    label(g, 'A · TAKE THE MILLION', mx, base + 30, 'rgba(245,243,238,.8)', 21); label(g, 'B · YOUR PENNY PILE', px, base + 30, 'rgba(245,243,238,.8)', 21);
    if (v < 1e6 * 0.02) { g.save(); g.strokeStyle = th.accent; g.fillStyle = th.accent; g.lineWidth = 4; const ax = px - bw / 2 - 40; g.beginPath(); g.moveTo(ax - 50, base - 60); g.lineTo(ax, base - 14); g.stroke(); g.beginPath(); g.moveTo(ax + 4, base - 8); g.lineTo(ax - 16, base - 18); g.lineTo(ax - 4, base - 32); g.closePath(); g.fill(); g.restore(); }
  }
  function meter(g, p, lt, t, th, dd, S) {
    const v = dol(1) * Math.pow(2, dd - 1), pct = (v / 1e6) * 100, ds = Math.floor(dd + 1e-4), vs = money(ds), pc = dol(ds) / 1e6 * 100;
    const ps = pc >= 100 ? fmt(Math.round(pc), 0) + '%' : pc < 1 ? pc.toFixed(2) + '%' : pc < 10 ? pc.toFixed(1) + '%' : Math.round(pc) + '%', over = pc >= 100;
    label(g, 'YOUR PENNY PILE vs THE MILLION', 540, 618, 'rgba(245,243,238,.85)', 27);
    const sz = fit(ps, F.hero, 800, 190); stk(g, ps, 540, 770, F.hero(sz), over ? th.good : th.bad, 'center', 16);
    label(g, over ? 'AHEAD OF THE MILLION' : 'STILL BEHIND THE MILLION', 540, 876, over ? th.good : th.bad, 30);
    const x0 = 90, w = 900, y = 922, h = 54; g.fillStyle = 'rgba(245,243,238,.18)'; rr(g, x0, y, w, h, 27); g.fill(); g.strokeStyle = 'rgba(245,243,238,.7)'; g.lineWidth = 3; rr(g, x0, y, w, h, 27); g.stroke();
    const main = w * 0.74, fr = Math.min(pc, 100) / 100 * main + (over ? Math.min(1, (pc - 100) / 437) * (w - main) : 0);
    if (fr > 3) { g.save(); rr(g, x0, y, w, h, 27); g.clip(); clay(g, x0, y, Math.max(fr, 54), h, 27, over ? th.good : th.bad, { shadowK: 0.3 }); g.restore(); }
    g.strokeStyle = th.paper; g.lineWidth = 5; g.beginPath(); g.moveTo(x0 + main, y - 12); g.lineTo(x0 + main, y + h + 12); g.stroke(); label(g, '$1,000,000', x0 + main, y + h + 32, th.paper, 22);
    (S.ticks || []).forEach((tk, i) => { const on = t >= tk.at, cx = 330 + i * 210, k = on ? spring(t - tk.at, 'bouncy') : 0; g.save(); g.translate(cx, 1072); g.scale(0.8 + 0.2 * Math.min(1.1, k), 0.8 + 0.2 * Math.min(1.1, k)); clay(g, -85, -24, 170, 48, 24, on ? th.accent : 'rgba(245,243,238,.18)', { shadowK: 0.4 }); txt(g, 'DAY ' + tk.d, 0, 2, F.monoX(24), on ? '#0B0F14' : 'rgba(245,243,238,.7)'); g.restore(); });
  }
  function boom(g, p, lt, t, th, S) {
    const final = money(30), mid = S.revealAt, k = spring(t - mid, { f: 2.2, z: 0.5 }), pre = t < mid;
    label(g, 'DAY 30 · THE LAST DAY', 540, 632, th.paper, 30);
    const s = pre ? '$?,???,???.??' : final, sz = fit(final, F.hero, 920, 150), sc = pre ? 1 : 0.8 + 0.2 * Math.min(1.08, k);
    g.save(); g.translate(540, 745); g.scale(sc, sc); stk(g, s, 0, 0, F.hero(sz), pre ? 'rgba(245,243,238,.55)' : th.good, 'center', 18); g.restore();
    if (t >= S.chipAt) { const kk = spring(t - S.chipAt, 'bouncy'); chip(g, '5.37× THE MILLION', 540, 840, 'good', th, 52, 860, kk); }
    // coin mound at the bottom (falls in after the reveal)
    const R = 22; for (let row = 0; row < 4; row++) { const n = 12 - row * 2; for (let c = 0; c < n; c++) { const idx = row * 20 + c, dt = t - (mid + 0.04 * idx * 0.35 + 0.1 * hash(idx)), f = ease.out(clamp(dt / 0.45)); if (pre || f <= 0) continue; const x = 540 + (c - (n - 1) / 2) * 2.12 * R, y = 1056 - row * 1.78 * R; coin(g, x, lerp(y - 320, y, f), R, clamp(f * 3)); } }
    if (!pre) burst(g, 540, 745, 380, th.gold, t - mid - 0.02, 22, 0.6);
  }
  function pie(g, p, lt, t, th, S) {
    const cx = 540, cy = 826, r = 214, th2 = 92, f = ease.out(clamp((lt - 0.2) / 1.0)), a0 = -Math.PI / 2, last = 0.875;
    g.save(); g.lineCap = 'butt'; g.lineWidth = th2; g.strokeStyle = 'rgba(245,243,238,.28)'; g.beginPath(); g.arc(cx, cy, r - th2 / 2, a0, a0 + Math.PI * 2 * (1 - last) * f); g.stroke();
    g.strokeStyle = th.gold; g.beginPath(); g.arc(cx, cy, r - th2 / 2, a0 + Math.PI * 2 * (1 - last) * f, a0 + Math.PI * 2 * (1 - last) * f + Math.PI * 2 * last * f); g.stroke(); g.restore();
    const k = spring(t - S.centerAt, 'bouncy'); g.save(); g.globalAlpha *= clamp(k * 2); g.translate(cx, cy); g.scale(0.7 + 0.3 * Math.min(1.08, k), 0.7 + 0.3 * Math.min(1.08, k)); stk(g, '7/8', 0, -6, F.hero(150), th.accent, 'center', 14); g.restore();
    const kk = spring(t - S.centerAt - 0.15, 'snappy'); g.save(); g.globalAlpha *= clamp(kk * 2); chip(g, 'CAME IN THE LAST 3 DAYS', 540, 1062, 'accent', th, 38, 900, kk); g.restore();
  }
  function ask(g, p, lt, t, th, S0) { let S = S0;
    const sw = S0.swap && t >= S0.swap.at, k = spring(sw ? t - S0.swap.at : lt, 'bouncy'); if (sw) S = S0.swap; g.save(); g.translate(540, 672); g.scale(0.7 + 0.3 * Math.min(1.06, k), 0.7 + 0.3 * Math.min(1.06, k)); g.globalAlpha *= clamp(k * 2);
    const l1 = S.l1, l2 = S.l2, sz = Math.min(fit(l1, F.hero, 900, 112), fit(l2, F.hero, 900, 112)); stk(g, l1, 0, -62, F.hero(sz), th.accent, 'center', 16); stk(g, l2, 0, 62, F.hero(sz), th.good, 'center', 16); g.restore();
  }

  Object.assign(window.PD5.h, { fit, stk, chip, stamp, label, coin, mw, TONE });
  // ---------- the stage ----------
  B.register('pstage', {
    defaults: { K: [[0, 1]], scenes: [], hook: null, deal: null, counterIn: 0, hideCounter: [], beats: [], notes: [] }, ownEnter: true, size: () => [1080, 1920],
    draw(g, p, env) {
      const { t, theme: th } = env; g.translate(-540, -960);
      const dd = dayAt(t, p.K), ds = Math.floor(dd + 1e-4), pm = dd - ds;
      // beat label (top right)
      let bl = ''; for (const b of p.beats) if (t >= b[0]) bl = b[1]; if (bl) { const k = spring(t - (p.beats.find(b => b[1] === bl)[0]), 'snappy'); g.save(); g.globalAlpha *= clamp(k * 2); label(g, bl, 990, 264, th.accent, 26, 'right'); g.restore(); }
      // counter card
      const hid = p.hideCounter.some(([a, b]) => t >= a && t < b), ca = clamp((t - p.counterIn) / 0.25) * (hid ? 0 : 1);
      if (ca > 0.01) {
        g.save(); g.globalAlpha *= ca; g.translate(0, (1 - ease.out(clamp((t - p.counterIn) / 0.4))) * -30); paper(g, 70, 322, 940, 230, 26, { lift: 0.3 });
        for (let i = 1; i <= 30; i++) { const x = 98 + (i - 1) * 29.7, on = i <= ds; g.fillStyle = on ? (i >= 28 ? th.good : th.gold) : 'rgba(11,15,20,.14)'; rr(g, x, 342, 24, 22, 6); g.fill(); }
        txt(g, 'DAY', 100, 400, F.monoX(30), th.inkSoft, 'left'); const pk = 1 + 0.12 * Math.exp(-Math.max(0, pm) * 0) * hit(pm > 0.5 ? 0 : pm, 9); txt(g, String(ds), 188, 398, F.hero(64), th.ink, 'left'); txt(g, '/ 30', 188 + mw(String(ds), F.hero(64)) + 14, 404, F.monoX(28), th.inkSoft, 'left');
        label(g, 'YOUR PENNY PILE', 982, 400, th.inkSoft, 26, 'right');
        const vs = money(ds), v = dol(ds), sz = fit(vs, F.hero, 860, 112); g.save(); g.translate(540, 494); const pp = 1 + 0.045 * hit(Math.min(0.5, pm < 0.5 ? pm + 0.001 : 0), 8); g.scale(pp, pp); txt(g, vs, 0, 0, F.hero(sz), v >= 1e6 ? th.goodInk : th.ink); g.restore();
        g.restore();
      }
      // hook text
      hookText(g, p, t, th);
      // scenes
      for (const S of p.scenes) {
        if (t < S.from - 0.02 || t > S.to + 0.02) continue; const lt = t - S.from, kin = spring(lt + 0.08, { f: 2.4, z: 0.7 }), a = clamp(lt / 0.12) * (1 - lin(t, S.to - 0.12, S.to)), sc = (S.pop === false ? 1 : 0.94 + 0.06 * Math.min(1.05, kin));
        g.save(); g.globalAlpha *= a; g.translate(540, 840); g.scale(sc, sc); g.translate(-540, -840);
        if (S.type === 'deal') deal(g, p, lt, t, th, a); else if (S.type === 'coins') coins(g, p, lt, t, th, dd); else if (S.type === 'item') item(g, p, lt, t, th, S); else if (S.type === 'bars') bars(g, p, lt, t, th, dd, S);
        else if (S.type === 'meter') meter(g, p, lt, t, th, dd, S); else if (S.type === 'boom') boom(g, p, lt, t, th, S); else if (S.type === 'pie') pie(g, p, lt, t, th, S); else if (S.type === 'ask') ask(g, p, lt, t, th, S);
        g.restore();
      }
      // notes (chips / stamps)
      for (const n of p.notes) if (t >= n.at && t < n.out + 0.2) { const nt = t - n.at, k = Math.min(1.08, spring(nt, 'bouncy')), fo = 1 - lin(t, n.out - 0.15, n.out + 0.05); g.save(); g.globalAlpha *= clamp(nt / 0.06) * fo; if (n.stamp) stamp(g, n.text, 540, n.y || 598, n.tone || 'good', th, n.size || 62, n.rot || -0.04, k); else chip(g, n.text, 540, n.y || 598, n.tone || 'bad', th, n.size || 44, 900, k); g.restore(); }
    },
  });
  // small always-on chip row element: HYPOTHETICAL
  B.register('hypo', {
    defaults: { text: 'HYPOTHETICAL · NOT FINANCIAL ADVICE' }, ownEnter: true, size: () => [10, 10],
    draw(g, p, env) { const s = p.text, f = F.monoX(21), w = mw(s, f) + 36; g.globalAlpha *= 0.9; g.fillStyle = 'rgba(11,15,20,.78)'; rr(g, -w / 2, -18, w, 36, 18); g.fill(); g.strokeStyle = env.theme.accent; g.lineWidth = 2; rr(g, -w / 2, -18, w, 36, 18); g.stroke(); txt(g, s, 0, 1, f, env.theme.accent); },
  });
})();
// ===== scene factory for penny-doubled v5: PD5.make(cfg) -> BM2.scene spec. All three cuts are data. =====
(function () {
  const ST = { x: 905, y: 1338, s: 0.8, layer: 'front', blur: 0, dim: 0 };
  const DX = [0, 420, -380, 300, -300, 380, -420, 260];
  window.PD5.make = function (c) {
    const els = [];
    els.push({ id: 'stage', type: 'pstage', layer: 'screen', at: [540, 960], in: -1, z: 10, props: { K: c.K, scenes: c.scenes, hook: c.hook, deal: c.deal, counterIn: c.counterIn, hideCounter: c.hideCounter || [], beats: c.labels, notes: c.notes || [] } });
    els.push({ id: 'art', type: 'hookart', layer: 'screen', at: [540, 745], in: -1, out: c.hook.until, z: 9, props: { variant: c.hook.variant || 'brick', drop: c.hook.drop || 90 } });
    els.push({ id: 'art2', type: 'hookart', layer: 'screen', at: [540, 872], scale: 0.5, in: c.scenes.find(s => s.type === 'ask').from, z: 9, props: { variant: 'brick', reAt: c.scenes.find(s => s.type === 'ask').from, drop: 200 } });
    els.push({ id: 'you', type: 'you', layer: 'screen', at: [150, 1213], scale: 0.82, in: -1, z: 20, props: { keys: c.you } });
    els.push({ id: 'hypo', type: 'hypo', layer: 'screen', at: [545, 1316], in: 0.2, z: 20, props: { text: 'HYPOTHETICAL · NOT FINANCIAL ADVICE' } });
    if (c.cta.like) els.push({ id: 'heart', type: 'heart', layer: 'screen', at: [520, 1205], in: c.cta.like, z: 30, props: { s: 1, dur: 1.0 } });
    if (c.cta.send) els.push({ id: 'plane', type: 'plane', layer: 'screen', at: [0, 0], in: c.cta.send, z: 30, props: { from: [330, 1275], to: [760, 1160], dur: 1.2, s: 0.7 } , out: c.cta.send + '+1.5' });
    if (c.cta.follow) els.push({ id: 'follow', type: 'follow', layer: 'screen', at: [520, 1215], in: c.cta.follow, out: c.cta.followOut, z: 30, props: { press: 0.75 } });
    if (c.cta.bubble) els.push({ id: 'bubble', type: 'bubble', layer: 'screen', at: [520, 1205], in: c.cta.bubble.at, z: 30, props: { l1: c.cta.bubble.l1, l2: c.cta.bubble.l2, size: 40, tail: 'left' } });
    const beats = c.scenes.map((s, i) => ({ at: s.from, beat: 'wide', focus: { x: 540 + DX[i % DX.length], y: 740 + (i % 2 ? 90 : -60), w: 1080, h: 300 }, fill: 1, dur: 0.8, st: ST, pose: s.pose || 'talk' }));
    beats.unshift({ at: 0, beat: 'wide', focus: { x: 540, y: 740, w: 1080, h: 300 }, fill: 1, st: ST, pose: 'shock' });
    return {
      series: 'whatif', title: 'PENNY × 30 DAYS', duration: c.dur,
      footnote: ['ASSUMES: 1¢ ON DAY 1 · WHAT YOU HOLD DOUBLES EVERY DAY · 30 DAYS', 'NO TAXES, NO INTEREST · HYPOTHETICAL · OUR MATH · NOT FINANCIAL ADVICE'],
      elements: els, beats, poses: [...(c.cta.follow ? [[c.cta.follow, 'follow', { target: [520, 1215] }]] : []), ...(c.poses || [])], shakes: c.shakes, captions: c.captions, bed: c.bed || { name: 'upbeat_bed_2', gain: -1 }, sfx: c.sfx,
    };
  };
})();
// IG/FB cut — v5. Hook = taking the million costs you over $4,000,000. No coffee/sandwich, no follow ask in the script.
const Q = { hookEnd: '@here\'s-0.12' };
const K = [[0, 1], ['@two#2-0.25', 1], ['@two#2+0.05', 2], ['@four-0.25', 2], ['@four+0.05', 3], ['@twice-0.3', 3], ['@twice+0.05', 4], ['@week-0.3', 4], ['@64', 7], ['@10-0.6', 7], ['@10+0.2', 10], ['@20-0.2', 10], ['@20+0.3', 20],
  ['@day#6-0.1', 20], ['@27+0.0', 27], ['@28-0.2', 27], ['@28+0.25', 28], ['@29-0.2', 28], ['@29+0.25', 29], ['@and#4', 29], ['@day#9+0.4', 30]];
const S = PD5.make({
  dur: 68.24, K, counterIn: '@here\'s-0.05',
  hook: { variant: 'brick', until: Q.hookEnd, y: 440, size: 100, lines: [[['TAKING THE MILLION', 'paper']], [['COSTS YOU ', 'paper'], ['OVER $4,000,000', 'bad']]] },
  deal: { cards: [{ at: '@million#3-0.1', letter: 'A', col: '#00D26A', l1: '$1,000,000', l2: 'RIGHT NOW · YOURS TODAY', icon: 'bill' }, { at: '@option#2-0.05', letter: 'B', col: '#FFD60A', l1: '1¢ DOUBLES DAILY', l2: 'FOR 30 DAYS', icon: 'coin', dbl: '@doubles' }], chip: { at: '@no', text: 'NO TAXES' } },
  scenes: [
    { type: 'deal', from: Q.hookEnd, to: '@doubling\'s-0.22', pose: 'talk' },
    { type: 'coins', from: '@doubling\'s-0.22', to: '@20-0.14', pose: 'shock' },
    { type: 'bars', from: '@20-0.14', to: '@three-0.15', pose: 'shock' },
    { type: 'meter', from: '@three-0.15', to: '@day#7-0.15', pose: 'chin', ticks: [{ d: 28, at: '@here\'s#2+0.0' }, { d: 29, at: '@where' }, { d: 30, at: '@nuts-0.2' }] },
    { type: 'bars', from: '@day#7-0.15', to: '@and#4-0.1', pose: 'shock' },
    { type: 'boom', from: '@and#4-0.1', to: '@almost-0.14', pose: 'shock', revealAt: '@5', chipAt: '@million#5-0.2' },
    { type: 'pie', from: '@almost-0.14', to: '@so#3-0.1', pose: 'chin', centerAt: '@seven-0.15' },
    { type: 'ask', from: '@so#3-0.1', to: 99, l1: '+$4,368,709.12', l2: 'EXTRA FOR NOT QUITTING', pose: 'you', swap: { at: '@penny#4-0.1', l1: 'PENNY OR', l2: 'MILLION?' } },
  ],
  hideCounter: [['@and#4-0.1', '@almost-0.14'], ['@so#3-0.1', 99]],
  labels: [[0, 'THE COST'], ['@here\'s-0.12', 'THE GAME'], ['@doubling\'s-0.22', 'THE DOUBLING'], ['@cause', 'THE WAIT'], ['@day#6-0.1', 'THE PAIN'], ['@three-0.15', 'THE TURN'], ['@and#4-0.1', 'THE ANSWER']],
  notes: [
    { at: '@twice-0.2', out: '@double-0.15', text: 'TWICE THE DAY BEFORE', tone: 'accent', y: 590 },
    { at: '@190-0.2', out: '@send+0.3', text: 'MILLION STILL ≈190× BIGGER', tone: 'bad' },
    { at: '@past-0.1', out: '@29-0.15', text: 'PASSES THE MILLION', tone: 'good', stamp: true, size: 60, rot: -0.04 },
    { at: '@29-0.1', out: '@and#4-0.15', text: 'DAY 29: DOUBLES AGAIN', tone: 'good', size: 40 },
  ],
  you: [{ at: 0, mood: 'smirk', text: 'YOU TOOK THE MILLION?' }, { at: '@here\'s', mood: 'neutral', text: 'YOU PICK ONE' }, { at: '@option#2', mood: 'smirk', text: 'YOU TAKE THE PENNY' }, { at: '@cause', mood: 'worried', text: 'SO TINY…' },
    { at: '@day#6', mood: 'angry', text: 'STILL LOSING' }, { at: '@29', mood: 'wow', text: 'WAIT…' }, { at: '@5', mood: 'happy', text: 'YES!!' }, { at: '@so#3', mood: 'smirk', text: 'YOUR CALL' }],
  cta: { like: '@tap-0.1', send: '@send', bubble: { at: '@penny#4', l1: 'ONE WORD', l2: 'PENNY or MILLION?' } },
  poses: [['@tap', 'you'], ['@send', 'you']],
  shakes: [[0.1, 8], ['@$4', 10], ['@5', 24], ['@past', 10]],
  captions: { gap: 16, emph: { '64': 'good', 'cents.': 'good', million: 'good', 'million.': 'good', '190': 'bad', '27,': 'bad', 'losing.': 'bad', 'fucking': 'bad', 'dumbass': 'bad', '28,': 'good', '30,': 'good', 'seven': 'accent', 'eighths,': 'accent', 'penny': 'accent', 'idiot.': 'bad', 'shit.': 'bad', 'nuts.': 'accent', 'grand.': 'accent' },
    fix: [['Cause', "'Cause"]] },
  sfx: [
    { at: 0.04, name: 'deep_boom_2', gain: -4, dur: 0.36 }, { at: 0.06, name: 'paper_slam_1', gain: -7, dur: 0.5 }, { at: '@$4', name: 'rubber_stamp_2', gain: -6, dur: 0.5 },
    { at: '@here\'s-0.1', name: 'whoosh_1', gain: -10, dur: 0.7 }, { at: '@million#3', name: 'pop_2', gain: -9, dur: 0.3 }, { at: '@option#2', name: 'pop_1', gain: -9, dur: 0.4 }, { at: '@doubles', name: 'coin_single_1', gain: -9, dur: 0.5 }, { at: '@no', name: 'click_2', gain: -10, dur: 0.3 },
    { at: '@doubling\'s-0.22', name: 'swoosh_1', gain: -9, dur: 0.8 }, { at: '@two#2', name: 'pop_1', gain: -8, dur: 0.4 }, { at: '@two#2+0.1', name: 'coin_single_1', gain: -9, dur: 0.5 }, { at: '@four', name: 'pop_2', gain: -8, dur: 0.4 }, { at: '@four+0.12', name: 'coin_single_1', gain: -9, dur: 0.5 },
    { at: '@twice', name: 'pop_2', gain: -9, dur: 0.4 }, { at: '@twice+0.05', name: 'ding_2', gain: -9, dur: 0.6 }, { at: '@tap', name: 'pop_2', gain: -9, dur: 0.3 },
    { at: '@week-0.3', name: 'money_counter_1', gain: -13, dur: 1.0 }, { at: '@64', name: 'ding_2', gain: -9, dur: 0.6 }, { at: '@10-0.6', name: 'money_counter_1', gain: -13, dur: 0.9 }, { at: '@10+0.2', name: 'ding_2', gain: -8, dur: 0.6 },
    { at: '@20-0.14', name: 'whoosh_2', gain: -10, dur: 0.6 }, { at: '@20-0.2', name: 'money_counter_2', gain: -13, dur: 1.4 }, { at: '@20+0.3', name: 'ding_2', gain: -8, dur: 0.6 },
    { at: '@190-0.2', name: 'click_1', gain: -9, dur: 0.25 }, { at: '@send-0.05', name: 'swoosh_1', gain: -9, dur: 0.9 },
    { at: '@day#6-0.1', name: 'money_counter_2', gain: -13, dur: 1.9 }, { at: '@27+0.05', name: 'wrong_buzzer_1', gain: -14, dur: 0.6 }, { at: '@27+0.05', name: 'thud_1', gain: -8, dur: 0.4 },
    { at: '@three-0.1', name: 'whoosh_2', gain: -10, dur: 0.6 }, { at: '@here\'s#2', name: 'click_1', gain: -9, dur: 0.2 }, { at: '@where', name: 'click_1', gain: -9, dur: 0.2 }, { at: '@nuts-0.2', name: 'click_1', gain: -9, dur: 0.2 },
    { at: '@28+0.25', name: 'success_chime_1', gain: -10, dur: 1.0 }, { at: '@past', name: 'rubber_stamp_2', gain: -6, dur: 0.5 }, { at: '@29+0.25', name: 'ding_1', gain: -10, dur: 0.6 },
    { at: '@and#4-0.1', name: 'riser_1', gain: -12, dur: 1.4 }, { at: '@5', name: 'deep_boom_1', gain: -2, dur: 1.6 }, { at: '@5', name: 'cinematic_hit_1', gain: -6, dur: 1.2 }, { at: '@5+0.1', name: 'coins_drop_1', gain: -8, dur: 1.8 },
    { at: '@almost-0.14', name: 'whoosh_2', gain: -10, dur: 0.6 }, { at: '@seven-0.1', name: 'pop_2', gain: -9, dur: 0.3 }, { at: '@eighths+0.4', name: 'ding_1', gain: -10, dur: 0.6 },
    { at: '@so#3-0.1', name: 'rewind_1', gain: -13, dur: 1.0 }, { at: '@extra', name: 'rubber_stamp_1', gain: -7, dur: 0.5 }, { at: '@penny#4-0.1', name: 'pop_1', gain: -9, dur: 0.5 }, { at: '@penny#4', name: 'deep_boom_2', gain: -8, dur: 0.36 },
  ],
});
BM2.scene(S);
