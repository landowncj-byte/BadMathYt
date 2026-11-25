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
// ===== penny-doubled v3 (65 s re-edit) — new recipes: live (real doubling HUD), blabel, assumes, dbl (baby-level 1->2->4 demo),
// pile (counted coins/blocks vs the million), boom (day-30 explosion) + the scene factory PDS.make(cfg) used by yt.js / tt.js / ig.js.
// Every draw is a pure function of env.t. Amount on day n = 1 cent x 2^(n-1) (research.md), computed live everywhere.
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, burst, roll, hash, hit, shade } = B;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const NEVER = 99000;
  const cents = d => Math.pow(2, d - 1), dol = d => cents(d) / 100;
  const money = d => '$' + B.fmtNum(dol(d), 2, true);
  const fmtRatio = r => r >= 1e6 ? (r < 1e7 ? (r / 1e6).toFixed(1) : Math.round(r / 1e6)) + 'M×' : r >= 1000 ? B.fmtNum(Math.round(r), 0, true) + '×' : r >= 10 ? Math.round(r) + '×' : r.toFixed(2) + '×';

  // day ticker: K = [[t, day], ...] eased between keyframes (same rule as the board)
  function dayAt(t, K) {
    let day = K[0][1];
    for (let i = 0; i < K.length - 1; i++) { const a = K[i], b = K[i + 1]; if (t >= b[0]) day = b[1]; else if (t > a[0]) { day = lerp(a[1], b[1], ease.inOut(lin(t, a[0], b[0]))); break; } else break; }
    return day;
  }
  const dayInt = (t, K) => Math.max(1, Math.floor(dayAt(t, K) + 0.001));
  function dayAge(t, K) { const d = dayInt(t, K); for (let i = 1; i <= 24; i++) if (dayInt(t - i * 0.05, K) !== d) return i * 0.05; return 9; }
  function dayRate(t, K) { return Math.abs(dayAt(t + 0.05, K) - dayAt(t - 0.05, K)) / 0.1; }
  window.PDS = { dayAt, dayInt, money };

  const coin = (g, x, y, r, hi) => {
    g.fillStyle = '#8a6408'; g.beginPath(); g.arc(x, y + r * 0.14, r, 0, 7); g.fill();
    g.fillStyle = hi ? '#FFE98A' : '#F2B705'; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill();
    g.strokeStyle = 'rgba(138,100,8,.75)'; g.lineWidth = Math.max(1.5, r * 0.13); g.beginPath(); g.arc(x, y, r * 0.7, 0, 7); g.stroke();
  };
  const bigCoin = (g, r, th, lbl) => { // face-on clay penny with a label
    coin(g, 0, 0, r, false); if (lbl) txt(g, lbl, 0, r * 0.04, F.hero(r * 0.82), '#7a5806');
  };

  // ---------- live: always-on HUD (screen layer). DAY n / amount (doubled live) / how much bigger the million still is ----------
  B.register('live', {
    defaults: { K: [[0, 1]] }, ownEnter: true, size: () => [960, 96],
    draw(g, p, env) {
      const { t, theme: th } = env, d = dayInt(t, p.K), a = dol(d), age = dayAge(t, p.K), pulse = 1 + 0.16 * Math.exp(-age * 9) * (age < 1 ? 1 : 0), W = 960, H = 96;
      g.save(); g.translate(-W / 2, -H / 2);
      B.shadowed(g, () => rr(g, 0, 0, W, H, 22), '#0B0F14', 0.5); rr(g, 0, 0, W, H, 22); g.fillStyle = 'rgba(11,15,20,.94)'; g.fill(); g.strokeStyle = rgba(th.paper, 0.22); g.lineWidth = 2; g.stroke();
      txt(g, 'DAY', 24, 24, F.monoX(17), rgba(th.paper, 0.65), 'left');
      g.save(); g.translate(24, 60); g.scale(pulse, pulse); txt(g, String(d).padStart(2, '0'), 0, 3, F.monoX(42), th.paper, 'left'); g.restore(); txt(g, '/ 30', 96, 64, F.monoX(18), rgba(th.paper, 0.6), 'left');
      txt(g, 'YOU HOLD', 250, 24, F.monoX(17), rgba(th.paper, 0.65), 'left');
      g.save(); g.translate(250, 60); g.scale(pulse, pulse); txt(g, '$' + B.fmtNum(a, 2, true), 0, 3, F.monoX(a >= 1e6 ? 34 : 40), a >= 1e6 ? th.good : th.gold, 'left'); g.restore();
      const ahead = a >= 1e6, r = ahead ? a / 1e6 : 1e6 / a;
      txt(g, ahead ? 'PENNY IS AHEAD' : 'THE MILLION IS STILL', 640, 24, F.monoX(17), rgba(th.paper, 0.65), 'left');
      txt(g, ahead ? fmtRatio(r) + ' THE MILLION' : fmtRatio(r) + ' BIGGER', 640, 60, F.monoX(32), ahead ? th.good : '#FF6B5E', 'left');
      for (let i = 1; i <= 30; i++) { g.fillStyle = i <= d ? (i >= 28 ? th.good : th.gold) : rgba(th.paper, 0.14); g.fillRect(24 + (i - 1) * 30.8, H - 11, 25, 5); }
      g.restore();
    },
  });

  // ---------- blabel: pinned beat label. props: labels [[at, 'THE DEAL'], ...] ----------
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

  // ---------- assumes: pinned screen chip ----------
  B.register('assumes', {
    defaults: { text: 'NO TAXES · DOUBLES EVERY DAY · 30 DAYS', size: 20 }, ownEnter: true, size: p => [mw(p.text, F.monoX(p.size)) + mw('ASSUMES', F.monoX(p.size)) + 90, p.size * 2.3],
    draw(g, p, env) { const f = F.monoX(p.size), lw = mw('ASSUMES', f) + 36, w = lw + mw(p.text, f) + 40, h = p.size * 2.3, k = spring(env.lt, 'bouncy'); g.translate(-w / 2, 0); g.scale(0.6 + 0.4 * k, 0.6 + 0.4 * k); g.globalAlpha *= clamp(env.lt / 0.1);
      clay(g, 0, -h / 2, w, h, h / 2, '#0B0F14', { shadowK: 0.5 }); g.strokeStyle = env.theme.accent; g.lineWidth = 3; rr(g, 0, -h / 2, w, h, h / 2); g.stroke();
      g.fillStyle = env.theme.accent; rr(g, 6, -h / 2 + 6, lw, h - 12, (h - 12) / 2); g.fill(); txt(g, 'ASSUMES', 6 + lw / 2, 2, f, env.theme.ink); txt(g, p.text, lw + 26, 2, f, env.theme.paper, 'left'); },
  });

  // ---------- dbl: baby-level doubling, three numbered steps that open one at a time (1 -> 2 -> 4) ----------
  B.register('dbl', {
    defaults: { t2: NEVER, t3: NEVER, t4: NEVER, title: 'DOUBLING' }, size: () => [940, 940],
    anchors: () => ({ all: [0, 0, 940, 940], head: [0, -410, 900, 110], r1: [0, -190, 900, 220], r2: [0, 50, 900, 220], r3: [0, 290, 900, 220], tail: [0, 430, 900, 90] }),
    draw(g, p, env) {
      const { t, theme: th } = env, lt = env.lt, k0 = spring(lt, 'soft');
      g.save(); g.globalAlpha *= clamp(lt / 0.1); g.scale(0.94 + 0.06 * clamp(k0, 0, 1.05), 0.94 + 0.06 * clamp(k0, 0, 1.05));
      paper(g, -470, -470, 940, 940, 28, {}); g.save(); rr(g, -470, -470, 940, 940, 28); g.clip(); g.fillStyle = th.navy; g.fillRect(-470, -470, 940, 120); g.restore();
      txt(g, p.title + ' = THE SAME AMOUNT AGAIN', -440, -428, F.hero(46), th.paper, 'left'); txt(g, 'BABY-LEVEL MATH · EACH COIN MAKES ONE MORE', -440, -384, F.monoX(20), th.accent, 'left');
      const rows = [[-190, 1, 0, '1¢'], [50, 2, p.t2, '2¢'], [290, 4, p.t3, '4¢']];
      rows.forEach(([y, n, at, val], ri) => {
        const T = t - (ri === 0 ? 0 : at); const open = ri === 0 || T > 0; const act = ri === 0 ? (t < p.t2 - 0.05) : (ri === 1 ? (t >= p.t2 && t < p.t3 - 0.05) : t >= p.t3);
        g.save(); g.translate(0, y);
        g.fillStyle = open ? th.paper : th.paperShade; rr(g, -430, -100, 860, 200, 18); g.fill(); g.strokeStyle = act ? th.accent : th.rule; g.lineWidth = act ? 6 : 3; rr(g, -430, -100, 860, 200, 18); g.stroke();
        const sk = open ? clamp(spring(Math.max(0, T), 'bouncy'), 0, 1.15) : 1; g.save(); g.translate(-370, 0); g.scale(sk, sk); clay(g, -44, -44, 88, 88, 44, open ? th.accent : th.rule, { shadowK: 0.5 }); txt(g, String(ri + 1), 0, 4, F.hero(64), th.ink); g.restore();
        if (!open) { txt(g, 'STEP ' + (ri + 1) + ' · ?', 0, 0, F.hero(52), th.inkSoft); g.restore(); return; }
        txt(g, 'DAY ' + (ri + 1), -300, -52, F.monoX(24), th.inkSoft, 'left');
        // coins: each new coin is a copy that slides out of its parent
        const cs = [], R = 52, gap = 128, x0 = -(n - 1) * gap / 2 + 20;
        for (let i = 0; i < n; i++) {
          const pos = x0 + i * gap; let x = pos, sc = 1;
          if (ri > 0) { const parent = ri === 1 ? 0 : Math.floor(i / 2), isCopy = i % 2 === 1, pgap = ri === 1 ? 0 : 1; const px = ri === 1 ? 20 : (-(2 - 1) * 128 / 2 + 20 + parent * 128); const u = ease.out(lin(T, 0.05, 0.55)); x = isCopy ? lerp(px, pos, u) : lerp(px, pos, u); sc = isCopy ? clamp(spring(T - 0.05, { f: 2.4, z: 0.42 }), 0, 1.12) : 1; }
          cs.push([x, sc]);
        }
        cs.forEach(([x, sc], i) => { g.save(); g.translate(x, 6); g.scale(sc, sc); bigCoin(g, R, th, '1¢'); g.restore(); if (ri > 0 && i % 2 === 1 && T < 0.7) burst(g, x, 6, 70, th.accent, T - 0.1, 8, 0.4); });
        if (ri > 0) { const ak = spring(T - 0.25, 'bouncy'); g.save(); g.translate(-190, -48); g.scale(clamp(ak, 0, 1.1), clamp(ak, 0, 1.1)); clay(g, -46, -20, 92, 40, 14, th.accent, { shadowK: 0.5 }); txt(g, '× 2', 0, 3, F.hero(34), th.ink); g.restore(); }
        const vk = ri === 0 ? 1 : spring(T - 0.35, 'bouncy'); g.save(); g.translate(350, 4); g.scale(clamp(vk, 0, 1.1), clamp(vk, 0, 1.1)); txt(g, val, 0, 0, F.hero(100), th.ink); g.restore();
        g.restore();
      });
      const tl = t - p.t4; if (tl > 0) { const k = spring(tl, 'bouncy'); g.save(); g.translate(0, 430); g.scale(clamp(k, 0.3, 1.05), clamp(k, 0.3, 1.05)); g.globalAlpha *= clamp(tl / 0.1);
        clay(g, -400, -40, 800, 80, 26, th.gold, { shadowK: 0.6 }); txt(g, '…AND AGAIN EVERY DAY FOR 30 DAYS', 0, 3, F.hero(38), th.ink); g.restore(); }
      g.restore();
    },
  });

  // ---------- pile: the actual counted heap. 1 coin = 1¢ (days 1-10), 1 stack = $10 (11-20), 1 block = $1,000 (21-28), 1 block = $10,000 (29-30).
  // Left panel = the penny's units (count = floor(cents / unit)), right = the million in the same unit. Newest doubled half is lighter. ----------
  const UNITS = [{ c: 1, nm: 'COIN', per: '1¢' }, { c: 1000, nm: 'STACK', per: '$10' }, { c: 100000, nm: 'BLOCK', per: '$1,000' }, { c: 1000000, nm: 'BLOCK', per: '$10,000' }];
  const tierOf = d => d <= 10 ? 0 : d <= 20 ? 1 : d <= 28 ? 2 : 3;
  function mosaic(g, x0, bot, n, cell, cols, coinMode, base, hiFrom, age) {
    const ch = coinMode ? cell * 0.93 : cell * 0.66;
    for (let i = 0; i < n; i++) {
      const r = Math.floor(i / cols), c = i % cols, x = x0 + c * cell + cell / 2 + (coinMode && (r & 1) ? cell * 0.5 : 0), y = bot - r * ch - ch / 2, nw = i >= hiFrom;
      let a = 1; if (nw && age < 0.7) a = clamp((age - ((i - hiFrom) / Math.max(1, n - hiFrom)) * 0.35) / 0.18); if (a <= 0) continue;
      if (a < 1) g.globalAlpha = a;
      if (coinMode) coin(g, x, y, cell * 0.45, nw && age < 2.5);
      else { g.fillStyle = nw && age < 2.5 ? shade(base, 0.28) : base; g.fillRect(x - cell * 0.46, y - ch * 0.44, cell * 0.92, ch * 0.88); g.fillStyle = 'rgba(0,0,0,.2)'; g.fillRect(x - cell * 0.46, y + ch * 0.28, cell * 0.92, ch * 0.16); }
      if (a < 1) g.globalAlpha = 1;
    }
  }
  B.register('pile', {
    defaults: { K: [[0, 1]] }, size: () => [940, 960],
    anchors: () => ({ all: [0, 0, 940, 960], head: [0, -425, 900, 110], pen: [-232, -90, 440, 560], mil: [232, -90, 440, 560], count: [-232, 270, 440, 130], mcount: [232, 270, 440, 130], ratio: [0, 410, 900, 100] }),
    draw(g, p, env) {
      const { t, theme: th } = env, lt = env.lt, d = dayInt(t, p.K), age = dayAge(t, p.K), tier = tierOf(d), U = UNITS[tier], cs = cents(d);
      const n = tier === 0 ? cs : Math.floor(cs / U.c), m = Math.round(1e8 / U.c), coinMode = tier === 0, k0 = spring(lt, 'soft');
      g.save(); g.globalAlpha *= clamp(lt / 0.1); g.scale(0.95 + 0.05 * clamp(k0, 0, 1.05), 0.95 + 0.05 * clamp(k0, 0, 1.05));
      paper(g, -470, -480, 940, 960, 28, {}); g.save(); rr(g, -470, -480, 940, 112, 28); g.clip(); g.fillStyle = th.navy; g.fillRect(-470, -480, 940, 112); g.restore();
      g.save(); rr(g, -470, -480, 940, 960, 28); g.clip(); g.fillStyle = th.navy; g.fillRect(-470, -480, 940, 112); g.restore();
      txt(g, 'THE PILE, COUNTED', -440, -446, F.hero(46), th.paper, 'left'); txt(g, 'OUR MATH · REAL COUNTS · 1¢ × 2^(DAY−1)', -440, -404, F.monoX(19), rgba(th.paper, 0.78), 'left');
      const flip = (d === 1 || d === 11 || d === 21 || d === 29) && age < 0.8, uk = flip ? 0.6 + 0.4 * clamp(spring(age, 'bouncy'), 0, 1.1) : 1, uf = F.monoX(23), us = '1 ' + U.nm + ' = ' + U.per, uw = mw(us, uf) + 44;
      g.save(); g.translate(250, -423); g.scale(uk, uk); clay(g, -uw / 2, -22, uw, 44, 22, th.accent, { shadowK: 0.5 }); txt(g, us, 0, 2, uf, th.ink); g.restore();
      const PW = 440, TOP = -352, PH = 560, bot = TOP + PH - 12, L = -452, Rr = 12;
      for (const x of [L, Rr]) { g.fillStyle = th.paperShade; rr(g, x, TOP, PW + 20, PH, 16); g.fill(); g.strokeStyle = th.rule; g.lineWidth = 2.5; rr(g, x, TOP, PW + 20, PH, 16); g.stroke(); }
      txt(g, 'THE PENNY', L + 24, TOP + 28, F.monoX(22), th.badInk, 'left'); txt(g, 'THE MILLION', Rr + 24, TOP + 28, F.monoX(22), th.goodInk, 'left');
      const cell = tier <= 1 ? 20 : clamp(Math.sqrt(PW * 470 / Math.max(1, Math.max(n, m))), 7, 20), cols = Math.max(2, Math.floor(PW / cell) - (coinMode ? 1 : 0));
      g.save(); rr(g, L, TOP, PW + 20, PH, 16); g.clip(); mosaic(g, L + 16, bot, n, cell, cols, coinMode, '#F2B705', n >= 2 ? Math.max(1, Math.floor(n / 2)) : 99, age); g.restore();
      g.save(); rr(g, Rr, TOP, PW + 20, PH, 16); g.clip();
      if (tier >= 2) mosaic(g, Rr + 16, bot, m, cell, cols, false, '#1FA366', 1e9, 9);
      else { const fc = 20, fcols = Math.floor(PW / fc); mosaic(g, Rr + 16, bot, fcols * 26, fc, fcols, false, '#1FA366', 1e9, 9); g.fillStyle = 'rgba(11,15,20,.5)'; g.fillRect(Rr, TOP, PW + 20, PH); }
      g.restore();
      if (tier < 2) { g.save(); g.translate(Rr + 230, TOP + 250); clay(g, -200, -62, 400, 124, 28, '#0B0F14', { shadowK: 0.6 }); txt(g, '= ' + B.fmtNum(m, 0, true), 0, -14, F.hero(62), th.paper); txt(g, tier === 0 ? 'COINS · ONE BIG SLAB OF CASH' : 'STACKS OF $10', 0, 38, F.monoX(19), th.accent); g.restore(); }
      else { g.save(); g.translate(Rr + 230, TOP + 52); clay(g, -150, -24, 300, 48, 16, '#0B0F14', { shadowK: 0.5 }); txt(g, B.fmtNum(m, 0, true) + ' BLOCKS = $1M', 0, 2, F.monoX(21), th.paper); g.restore(); }
      if (n >= 2) { const add = Math.floor(n / 2), top = bot - Math.ceil(n / cols) * (coinMode ? cell * 0.93 : cell * 0.66); g.save(); g.globalAlpha *= clamp(age / 0.2) * (1 - lin(age, 2.0, 2.6)); txt(g, '+' + B.fmtNum(add, 0, true) + ' TODAY', L + 240, Math.max(TOP + 60, top - 24), F.monoX(24), th.goodInk); g.restore(); }
      const pop = 1 + 0.12 * Math.exp(-age * 9) * (age < 1 ? 1 : 0), RY = TOP + PH + 46;
      g.save(); g.translate(-232, RY); g.scale(pop, pop); txt(g, B.fmtNum(n, 0, true) + ' ' + U.nm + (n === 1 ? '' : 'S'), 0, 0, F.hero(56), th.ink); g.restore();
      txt(g, 'DAY ' + d + ' = ' + money(d), -232, RY + 44, F.monoX(26), th.inkSoft);
      txt(g, tier >= 2 ? B.fmtNum(m, 0, true) + ' BLOCKS' : B.fmtNum(m, 0, true) + (tier === 0 ? ' COINS' : ' STACKS'), 232, RY, F.hero(42), th.ink); txt(g, '$1,000,000 = 100,000,000¢', 232, RY + 44, F.monoX(22), th.inkSoft);
      const a = dol(d), ahead = a >= 1e6, rr2 = ahead ? a / 1e6 : 1e6 / a, rs = ahead ? 'PENNY AHEAD · ' + fmtRatio(rr2) + ' THE MILLION' : 'BEHIND · MILLION IS ' + fmtRatio(rr2) + ' BIGGER', rf = F.hero(44), rw = mw(rs, rf) + 60;
      g.save(); g.translate(0, RY + 128); g.scale(pop, pop); clay(g, -rw / 2, -34, rw, 68, 24, ahead ? th.good : th.bad, { shadowK: 0.6 }); txt(g, rs, 0, 4, rf, ahead ? th.ink : th.paper); g.restore();
      g.restore();
    },
  });

  // ---------- boom: day 30. The counter doubles (K), the stage erupts coins + bills, a heap buries the $1M brick ----------
  const HEAP = (() => { const a = []; for (let i = 0; i < 230; i++) a.push({ x: -420 + hash(i * 3.3 + 0.7) * 840, y: 0, u: hash(i * 1.9 + 5.1), s: 0.8 + hash(i * 2.7) * 0.5, r: i % 3 }); return a; })();
  const PART = (() => { const a = []; for (let i = 0; i < 110; i++) { const ang = -Math.PI / 2 + (hash(i * 4.7 + 1.1) - 0.5) * 2.7, sp = 480 + hash(i * 2.3 + 8.8) * 1000; a.push({ vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, rot: (hash(i * 6.1) - 0.5) * 12, bill: i % 4 === 0, d: hash(i * 9.1) * 0.12 }); } return a; })();
  B.register('boom', {
    defaults: { K: [[0, 29]], boomAt: NEVER, shown: true }, size: () => [940, 960],
    anchors: () => ({ all: [0, 0, 940, 960], num: [0, -150, 900, 220], heap: [0, 300, 900, 360], brick: [-300, 300, 280, 260], cap: [0, 40, 900, 90] }),
    draw(g, p, env) {
      const { t, theme: th } = env, lt = env.lt, bt = t - p.boomAt, k0 = spring(lt, 'soft'), d = dayAt(t, p.K), v = Math.pow(2, d - 1) / 100, rate = Math.abs(dayAt(t + 0.05, p.K) - dayAt(t - 0.05, p.K)) / 0.1;
      g.save(); g.globalAlpha *= clamp(lt / 0.1); g.scale(0.95 + 0.05 * clamp(k0, 0, 1.05), 0.95 + 0.05 * clamp(k0, 0, 1.05));
      paper(g, -470, -480, 940, 960, 28, {}); g.save(); rr(g, -470, -480, 940, 960, 28); g.clip(); g.fillStyle = th.navy; g.fillRect(-470, -480, 940, 112); g.restore();
      txt(g, 'DAY ' + Math.max(1, Math.round(d)) + ' · THE LAST DOUBLING', -440, -446, F.hero(46), th.paper, 'left'); txt(g, 'OUR MATH · HYPOTHETICAL · NO TAXES', -440, -404, F.monoX(19), rgba(th.paper, 0.78), 'left');
      // the million brick (stays on the floor, then gets buried)
      const base = 430; g.save(); g.translate(-250, base);
      for (let b = 0; b < 12; b++) { g.save(); g.translate((hash(b * 7.7) - 0.5) * 8, -(b + 0.5) * 24); clay(g, -150, -11, 300, 22, 5, '#1FA366', { shadowK: 0.4 }); g.fillStyle = 'rgba(245,243,238,.8)'; g.fillRect(-18, -10, 36, 20); g.restore(); }
      clay(g, -130, -168, 260, 66, 10, '#F5F3EE', { shadowK: 0.5 }); txt(g, '$1,000,000', 0, -134, F.hero(46), '#0B0F14'); g.restore();
      // the number
      const shake = bt > 0 && bt < 0.5 ? Math.sin(bt * 90) * 7 * (1 - bt / 0.5) : 0, big = v >= 1e6;
      g.save(); g.translate(shake, -190); const pk = bt > 0 ? 1 + 0.2 * Math.exp(-bt * 5) : 1; g.scale(pk, pk);
      roll(g, v, 0, 0, { font: F.hero(v >= 1e6 ? 132 : 120), size: 130, color: big ? th.goodInk : th.ink, prefix: '$', decimals: 2, speed: rate > 0.05 ? v * Math.LN2 * rate : 0 }); g.restore();
      txt(g, big ? 'THE PENNY IS ' + (v / 1e6).toFixed(2) + '× THE MILLION' : 'DOUBLING AGAIN…', 0, -90, F.monoX(26), big ? th.goodInk : th.inkSoft);
      if (bt > 0.35) { const sk = spring(bt - 0.35, 'bouncy'); g.save(); g.translate(170, 20); g.rotate(-0.07); g.scale(clamp(sk, 0.3, 1.1), clamp(sk, 0.3, 1.1)); clay(g, -210, -44, 420, 88, 22, th.accent, { shadowK: 0.7 }); txt(g, 'DAY 30', 0, 4, F.hero(70), th.ink); g.restore(); burst(g, 170, 20, 260, th.accent, bt - 0.4, 14, 0.45); }
      // heap
      if (bt > 0.5) {
        const grow = ease.out(clamp((bt - 0.5) / 2.2)), top = base - 40 - 360 * grow, items = HEAP.map(h => ({ ...h, y: top + (base + 20 - top) * (1 - h.u * h.u) })); items.sort((a, b) => a.y - b.y);
        g.save(); rr(g, -470, -480, 940, 960, 28); g.clip();
        for (const h of items) { const ap = clamp((bt - 0.5 - (1 - h.u) * 1.3) / 0.2); if (ap <= 0) continue; g.globalAlpha = ap; if (h.r === 0) { clay(g, h.x - 38 * h.s, h.y - 12 * h.s, 76 * h.s, 24 * h.s, 4, '#1FA366', { shadowK: 0.25 }); } else coin(g, h.x, h.y, 22 * h.s, h.r === 2); }
        g.restore();
      }
      g.restore();
      // the eruption (flying coins and bills, drawn over everything)
      if (bt > 0) {
        for (const q of PART) { const tau = bt - q.d; if (tau <= 0 || tau > 2.6) continue; const x = q.vx * tau, y = -100 + q.vy * tau + 0.5 * 2100 * tau * tau; if (y > 620) continue;
          g.save(); g.globalAlpha *= clamp(1 - (tau - 1.9) / 0.7); g.translate(x, y); g.rotate(q.rot * tau); if (q.bill) clay(g, -34, -14, 68, 28, 5, '#1FA366', { shadowK: 0.3 }); else coin(g, 0, 0, 20, false); g.restore(); }
        burst(g, 0, -190, 300, th.accent, bt - 0.02, 20, 0.7); burst(g, 0, -190, 520, th.paper, bt - 0.12, 16, 0.6);
      }
    },
  });


  // ---------- cup: generic everyday-comparison sticker (screen layer). kind 'coffee' | 'sandwich'. Always labelled ILLUSTRATION ----------
  B.register('cup', {
    defaults: { kind: 'coffee', label: 'ONE COFFEE' }, ownEnter: true, size: () => [260, 300],
    draw(g, p, env) {
      const th = env.theme, lt = env.lt, k = clamp(spring(lt, 'bouncy'), 0, 1.1); g.save(); g.scale(k, k); g.rotate(-0.06); g.globalAlpha *= clamp(lt / 0.08);
      clay(g, -125, -140, 250, 290, 24, '#F5F3EE', { shadowK: 0.7 });
      if (p.kind === 'coffee') {
        g.strokeStyle = '#9a6b3b'; g.lineWidth = 14; g.beginPath(); g.arc(56, -22, 30, -1.2, 1.2); g.stroke();
        clay(g, -58, -62, 116, 104, 14, '#C9A27A', { shadowK: 0.4 }); clay(g, -68, -82, 136, 28, 10, '#8a5a2b', { shadowK: 0.3 }); g.fillStyle = th.bad; g.fillRect(-58, -30, 116, 22);
        g.strokeStyle = 'rgba(11,15,20,.28)'; g.lineWidth = 6; g.lineCap = 'round'; for (const sx of [-24, 6, 34]) { g.beginPath(); g.moveTo(sx, -98); g.quadraticCurveTo(sx + 10, -116, sx, -134 + 10 * Math.sin(env.t * 3 + sx)); g.stroke(); }
      } else {
        clay(g, -84, -56, 168, 34, 17, '#D9A55B', { shadowK: 0.35 }); g.fillStyle = '#1FA366'; rr(g, -92, -26, 184, 14, 7); g.fill(); g.fillStyle = th.bad; rr(g, -84, -14, 168, 14, 7); g.fill(); g.fillStyle = '#F2B705'; rr(g, -88, -2, 176, 12, 6); g.fill(); clay(g, -84, 8, 168, 34, 17, '#D9A55B', { shadowK: 0.35 });
      }
      txt(g, p.label, 0, 84, F.hero(34), th.ink); txt(g, 'ILLUSTRATION', 0, 124, F.monoX(17), th.inkSoft); g.restore();
    },
  });

  // ================== the scene factory ==================
  // cfg: { dur, hook:{variant,lines,size,y,drop}, stamp, cues:{...word refs...}, K (day ticker), captions, sfx tweaks, ... } -> scene object
  window.PDS.make = function (c) {
    const Q = c.q, ST = { x: 105, y: 1335, s: 0.74, layer: 'front' }, F0 = { x: 0, y: 15, w: 900, h: 900 }, FR = { fill: 0.83, maxH: 920, sx: 600, sy: 888 };
    window.PDS.F0 = F0; window.PDS.FR = FR;
    const K = c.K, HOOK = c.hook.text, ART = { variant: c.hook.variant, drop: c.hook.drop };
    const els = [
      { id: 'hook', type: 'text', at: [0, c.hook.y ?? -330], in: -1, out: Q.hookEnd, props: HOOK },
      { id: 'art', type: 'hookart', at: [0, c.hook.ay ?? 150], in: -1, out: Q.hookEnd2, props: { ...ART } },
      ...(c.stamps || []),
      { id: 'endt', type: 'text', at: [0, c.hook.y ?? -330], in: Q.loop, props: HOOK },
      { id: 'art2', type: 'hookart', at: [0, (c.hook.ay ?? 150) + 2300], in: -1, props: { ...ART, reAt: Q.loopArt } },
      // station 1: the deal (A / B)
      { id: 'ab', type: 'ab', at: [1750, -60], in: Q.abIn, out: Q.abOut, props: { aAt: Q.a, bAt: Q.b, splitAt: Q.doubles, wiggleAt: Q.wiggle ?? NEVER } },
      // station 2: baby-level doubling
      { id: 'dbl', type: 'dbl', at: [3500, 0], in: Q.dblIn, out: Q.dblOut, props: { t2: Q.two, t3: Q.four, t4: Q.dblTail } },
      // station 3: the 30-day calendar board (doubling computed live) + the $1M bar beside the penny stack
      { id: 'board', type: 'board', at: [5250, 0], in: Q.boardIn, props: { unrollAt: Q.unroll, ticker: K, glow: c.glow || [], flash: c.flash || [], rainAt: NEVER, rainEnd: NEVER, notes: c.notes || [] } },
      // station 4: the counted pile
      { id: 'pile', type: 'pile', at: [7000, 0], in: Q.boardIn, props: { K } },
      // station 5: the 7/8 pie
      { id: 'pie', type: 'pie', at: [8750, -130], in: Q.pieIn, out: Q.pieOut, props: { r: 230, center: { size: 92, to: 87.5, suffix: '%', decimals: 1, at: Q.seven, dur: 0.9, label: 'LAST 3 DAYS', tone: 'paper' },
        slices: [{ value: 12.5, tone: 'soft', label: 'DAYS 1–27', at: Q.pieIn }, { value: 87.5, tone: 'accent', label: 'DAYS 28–30', at: Q.seven + '-0.1' }] } },
      { id: 'pieT', type: 'text', at: [8750, 178], in: Q.seven + '-0.1', out: Q.pieOut, props: { lines: [[['DAYS 28–30 = ', 'paper'], ['7/8', 'accent'], [' OF IT', 'paper']]], size: 54 } },
      // station 6: day 30
      { id: 'boom', type: 'boom', at: [10500, 0], in: Q.boomIn, props: { K, boomAt: Q.boom } },
      // screen-fixed
      { id: 'live', type: 'live', layer: 'screen', at: [540, 342], in: -1, props: { K } },
      { id: 'lab', type: 'blabel', layer: 'screen', at: [830, 264], in: -1, props: { labels: [[0, 'THE DEAL'], [Q.lWait, 'THE WAIT'], [Q.lTurn, 'THE TURN'], [Q.lAns, 'THE ANSWER']] } },
      { id: 'hyp', type: 'chip', layer: 'screen', at: [540, 416], in: 0.5, out: Q.abOut, props: { text: 'HYPOTHETICAL', size: 22 } },
      { id: 'asm', type: 'assumes', layer: 'screen', at: [540, 416], in: Q.taxes, props: { text: 'NO TAXES · DOUBLES EVERY DAY · 30 DAYS', size: 18 } },
      { id: 'heart', type: 'heart', layer: 'screen', at: [800, 900], in: Q.like, props: { s: 1, dur: 0.9 } },
      { id: 'plane', type: 'plane', layer: 'screen', at: [0, 0], in: Q.send + '-0.05', out: Q.send + '+1.0', props: { from: [470, 1000], to: [1150, 520], dur: 0.85, s: 0.62 } },
      ...(Q.follow ? [{ id: 'btn', type: 'follow', layer: 'screen', at: [650, 1120], in: Q.follow + '+0.05', out: Q.follow + '+1.45', props: { press: 0.55 } }] : []),
      { id: 'ask', type: 'bubble', layer: 'screen', at: [690, 800], in: Q.ask, out: Q.loop, props: c.bubble },
      ...(c.extra || []),
    ];
    const SB = { st: ST };
    const bd = (at, beat, focus, o) => Object.assign({ at, beat, focus, st: ST }, o);
    const beats = [
      { at: 0, beat: 'side-by-side', focus: F0, ...FR, pose: 'shock', keep: ['hook', 'art', 'endt', 'stamp'] },
      ...(c.hookBeats || []),
      // THE DEAL — A/B buttons
      bd(Q.abBeat, 'graphic-hero', 'ab', { move: 'whip', fill: 0.9, maxH: 900, sy: 840, pose: 'shrug', blur: 9, dim: 0.5 }),
      bd(Q.a, 'zoom-on-number', 'ab.a', { fill: 0.86, sy: 760, rot: -0.01, pose: 'point' }),
      bd(Q.b, 'zoom-on-number', 'ab.b', { fill: 0.86, sy: 760, rot: 0.01, pose: 'point' }),
      bd(Q.doubles, 'graphic-hero', 'ab', { fill: 0.9, maxH: 900, sy: 840, pose: 'shock', blur: 3 }),
      bd(Q.thirty, 'zoom-on-number', 'ab.b', { fill: 0.86, sy: 760, rot: -0.01, pose: 'point', dur: 0.5 }),
      bd(Q.taxes, 'graphic-hero', 'ab', { fill: 0.9, maxH: 900, sy: 840, pose: 'chin', blur: 3 }),
      // doubling explained
      bd(Q.dblIn, 'graphic-hero', 'dbl', { move: 'whip', fill: 0.92, maxH: 880, sy: 885, st: 'corner-left', pose: 'idle' }),
      bd(Q.two, 'zoom-on-number', 'dbl.r2', { fill: 0.98, sy: 800, rot: 0.008, st: 'corner-left', pose: 'point' }),
      bd(Q.four, 'zoom-on-number', 'dbl.r3', { fill: 0.98, sy: 800, rot: -0.008, st: 'corner-left', pose: 'shock' }),
      bd(Q.dblTail, 'graphic-hero', 'dbl', { fill: 0.92, maxH: 880, sy: 885, st: 'corner-left', pose: 'chin' }),
      ...(c.line5 ? c.line5(bd) : []),
      bd(Q.like, 'presenter-front', c.likeFocus || 'dbl', { sy: 885, st: undefined, pose: 'you' }),
      // THE WAIT — week, day 10, day 20
      ...c.waitBeats(bd),
      // THE TURN
      ...c.turnBeats(bd),
      // THE ANSWER
      ...c.answerBeats(bd),
      { at: Q.loop, beat: 'side-by-side', focus: F0, move: 'whip', ...FR, pose: 'shock', keep: ['hook', 'art', 'art2', 'endt'] },
    ];
    for (const b of beats) { if (b.st === undefined && b.beat !== 'presenter-front' && b.beat !== 'side-by-side') delete b.st; if (b.st === undefined) delete b.st; }
    return {
      series: 'whatif', title: 'PENNY × 30 DAYS', duration: c.dur,
      footnote: ['ASSUMES: 1¢ ON DAY 1 · WHAT YOU HOLD DOUBLES EVERY DAY · 30 DAYS', 'NO TAXES, NO INTEREST · HYPOTHETICAL · OUR MATH · NOT FINANCIAL ADVICE'],
      elements: els, beats, poses: [...(Q.follow ? [[Q.follow, 'follow', { target: [650, 1120] }]] : []), ...(c.poses || [])], shakes: c.shakes, captions: c.captions, bed: c.bed || { name: 'upbeat_bed_2', gain: -1 }, sfx: c.sfx,
    };
  };
})();
// Instagram/Facebook cut — v3 re-edit (65 s). Hook = "taking the million costs you over $4 million". No follow line in the script.
const Q = {
  hookEnd: '@Here\'s-0.12', hookEnd2: '@Here\'s-0.02', abBeat: '@Here\'s-0.05', loopArt: '@million#7+0.4', abIn: '@Here\'s-0.1', a: '@million#3', b: '@penny', doubles: '@doubles', thirty: '@30', taxes: '@taxes',
  dblIn: '@Doubling\'s-0.3', two: '@two#2', four: '@four', dblTail: '@four+0.5', dblOut: '@So#2-0.15', likeFocus: 'pile', like: '@Double', abOut: '@Doubling\'s-0.4',
  boardIn: '@Doubling\'s-0.8', unroll: '@Cause-0.1', lWait: '@Cause-0.1', lTurn: '@Three-0.2', lAns: '@30#2-0.4',
  send: '@Send', follow: null, seven: '@seven', pieIn: '@Almost-0.2', pieOut: '@So#3-0.2', boomIn: '@past', boom: '@5', ask: '@penny#4-0.2', loop: '@million#7+0.2',
};
const K = [[0, 1], ['@two#2-0.25', 1], ['@two#2+0.05', 2], ['@four-0.25', 2], ['@four+0.05', 3], ['@twice', 3], ['@before-0.1', 3], ['@before+0.2', 4],
  ['@weekend-0.3', 3], ['@64', 7], ['@10-0.45', 7], ['@10+0.1', 10], ['@20-0.35', 10], ['@20+0.1', 20],
  ['@day#6-0.4', 20], ['@27+0.0', 27], ['@28-0.15', 27], ['@28+0.15', 28], ['@29-0.15', 28], ['@29+0.15', 29], ['@5-0.55', 29], ['@5-0.05', 30],
  ['@So#3-0.05', 30], ['@So#3+0.45', 20], ['@million#7+0.1', 20], ['@million#7+0.6', 1]];
const HOOK = { lines: [[['TAKING THE MILLION', 'paper']], [['COSTS YOU ', 'paper'], ['OVER $4,000,000', 'bad']]], size: 84 };
const S = PDS.make({
  dur: 65.66, K, q: Q, hook: { variant: 'brick', text: HOOK, y: -330, ay: 150, drop: 110 },
  stamps: [{ id: 'stamp', type: 'stamp', at: [-40, 230], rot: -0.08, in: '@$4', out: Q.hookEnd, props: { text: 'OVER $4M LOST', tone: 'bad', size: 72 } }],
  hookBeats: [
    { at: 0.45, beat: 'zoom-on-number', focus: 'hook', fill: 0.82, sy: 570, rot: 0.008, pose: 'point', keep: ['hook', 'art', 'endt'] },
    { at: '@$4', beat: 'zoom-on-number', focus: 'stamp', fill: 0.86, sy: 800, rot: 0.01, pose: 'shock', keep: ['hook', 'art', 'stamp'] },
    { at: '@million#2+0.3', beat: 'pull-back', focus: PDS.F0, ...PDS.FR, pose: 'talk', keep: ['hook', 'art', 'stamp'] },
  ],
  glow: [['@Three+0.1', 28], ['@Three+0.4', 29], ['@Three+0.7', 30]], flash: [['@27+0.05', 27]],
  notes: [{ at: '@190-0.2', out: '@Send+0.3', text: '≈190× BIGGER · STILL', tone: 'bad' }, { at: '@Three', out: '@nuts', text: '3 DAYS LEFT · STILL BEHIND', tone: 'bad' }],
  line5: bd => [
    bd('@So#2-0.1', 'graphic-hero', 'pile', { move: 'whip', fill: 0.92, maxH: 860, sy: 900, pose: 'point' }),
    bd('@twice', 'zoom-on-number', 'pile.count', { fill: 0.7, sy: 900, rot: -0.01, pose: 'shock', dur: 0.5 }),
    bd('@before', 'graphic-hero', 'pile.pen', { fill: 0.7, maxH: 760, sy: 900, pose: 'shock' }),
  ],
  waitBeats: bd => [
    bd('@Cause', 'graphic-hero', 'board', { move: 'whip', fill: 0.9, maxH: 1010, sy: 860, pose: 'shrug' }),
    bd('@weekend', 'zoom-on-number', 'board.t7', { fill: 0.4, sy: 700, rot: 0.01, pose: 'point', dur: 0.5 }),
    bd('@64+0.05', 'graphic-hero', 'pile', { move: 'whip', fill: 0.92, maxH: 860, sy: 900, pose: 'shock' }),
    bd('@10-0.1', 'graphic-hero', 'pile.pen', { fill: 0.7, maxH: 760, sy: 900, pose: 'point' }),
    bd('@five', 'zoom-on-number', 'pile.count', { fill: 0.7, sy: 900, rot: -0.01, pose: 'shock', dur: 0.5 }),
    bd('@idiot', 'graphic-hero', 'pile', { fill: 0.92, maxH: 860, sy: 900, pose: 'chin' }),
    bd('@day#5', 'graphic-hero', 'board', { move: 'whip', fill: 0.9, maxH: 1010, sy: 860, pose: 'shrug' }),
    bd('@20', 'zoom-on-number', 'board.t20', { fill: 0.4, sy: 700, rot: 0.01, pose: 'point', dur: 0.5 }),
    bd('@five#2', 'graphic-hero', 'board.pile', { fill: 0.9, maxH: 720, sy: 860, pose: 'shock' }),
    bd('@190', 'zoom-on-number', 'board.pile', { fill: 0.92, maxH: 720, sy: 860, rot: -0.01, pose: 'point', dur: 0.5 }),
    bd('@Send', 'presenter-front', 'board', { sy: 860, pose: 'you' }),
  ],
  turnBeats: bd => [
    bd('@day#6-0.4', 'graphic-hero', 'board', { fill: 0.9, maxH: 1010, sy: 860, pose: 'shock' }),
    bd('@27', 'zoom-on-number', 'board.t27', { fill: 0.4, sy: 700, rot: -0.01, pose: 'shock', dur: 0.5 }),
    bd('@671', 'graphic-hero', 'pile', { move: 'whip', fill: 0.92, maxH: 860, sy: 900, pose: 'shock' }),
    bd('@fucking', 'zoom-on-number', 'pile.ratio', { fill: 0.9, sy: 800, rot: 0.01, pose: 'shrug', dur: 0.5 }),
    bd('@Three', 'graphic-hero', 'board', { move: 'whip', fill: 0.9, maxH: 1010, sy: 860, pose: 'chin' }),
    bd('@nuts-0.3', 'zoom-on-number', 'board.meter', { fill: 0.9, sy: 760, rot: -0.01, pose: 'shock', dur: 0.5 }),
  ],
  answerBeats: bd => [
    bd('@28', 'graphic-hero', 'pile', { move: 'whip', fill: 0.92, maxH: 860, sy: 900, pose: 'shock' }),
    bd('@past', 'zoom-on-number', 'pile.ratio', { fill: 0.9, sy: 800, rot: 0.01, pose: 'shock', dur: 0.5 }),
    bd('@29', 'zoom-on-number', 'pile.count', { fill: 0.7, sy: 900, rot: -0.01, pose: 'shock', dur: 0.5 }),
    bd('@30#2-0.4', 'graphic-hero', 'boom', { move: 'whip', fill: 0.92, maxH: 860, sy: 900, pose: 'chin' }),
    bd('@5-0.1', 'zoom-on-number', 'boom.num', { fill: 0.96, sy: 760, rot: 0.012, pose: 'shock', dur: 0.4 }),
    bd('@5+1.6', 'graphic-hero', 'boom', { fill: 0.92, maxH: 860, sy: 900, pose: 'shock', dur: 0.9 }),
    bd('@Almost-0.1', 'graphic-hero', ['pie', 'pieT'], { move: 'whip', st: { x: 955, y: 1330, s: 0.8, layer: 'front' }, fill: 0.7, maxH: 800, sy: 850, pose: 'point', blur: 9, dim: 0.6, keep: ['pieT'] }),
    bd('@last#2', 'zoom-on-number', 'pie.center', { fill: 0.5, sy: 800, rot: 0.01, pose: 'shock', dur: 0.5, blur: 9, dim: 0.6, keep: ['pieT'] }),
    bd('@So#3', 'presenter-front', 'board', { move: 'whip', sy: 860, pose: 'shock' }),
    bd('@penny#4-0.3', 'graphic-hero', 'board', { fill: 0.9, maxH: 1010, sy: 860, pose: 'you' }),
  ],
  bubble: { l1: 'PENNY or MILLION?', l2: 'ONE WORD · COMMENT', size: 48, tail: 'left' },
  extra: [
    { id: 'twice', type: 'text', layer: 'screen', at: [540, 560], in: '@twice-0.3', out: '@Double-0.1', props: { lines: [[['EVERY DAY =', 'paper']], [['2× THE DAY BEFORE', 'accent']]], size: 64 } },
    { id: 'pass', type: 'stamp', layer: 'screen', at: [540, 470], rot: -0.06, in: '@past', out: '@29', props: { text: 'PASSES THE MILLION', tone: 'good', size: 66 } },
    { id: 'extra4', type: 'stamp', layer: 'screen', at: [540, 480], rot: 0.05, in: '@four#2', out: Q.loop, props: { text: '+$4,368,709.12 EXTRA', tone: 'good', size: 48 } },
  ],
  shakes: [[0.1, 8], ['@$4', 8], ['@5', 26], ['@past', 12], ['@27', 8], ['@64', 6]],
  poses: [['@Double', 'you'], ['@Send', 'you']],
  captions: { gap: 16, emph: { '64': 'good', 'cents.': 'good', million: 'good', '190': 'bad', '27,': 'bad', 'losing.': 'bad', 'fucking': 'bad', '28,': 'good', '30,': 'good', 'seven': 'accent', 'eighths': 'accent', 'penny': 'accent', 'grand.': 'accent', 'nuts.': 'accent', 'idiot.': 'bad' },
    fix: [['$5 .37', '$5.37'], ['5 .37', '$5.37'], ['671', '$671'], ["Cause yeah,", "'Cause yeah,"], ['Cause', "'Cause"]] },
  sfx: [
    { at: 0.04, name: 'deep_boom_2', gain: -4, dur: 0.36 }, { at: 0.06, name: 'paper_slam_1', gain: -7, dur: 0.5 },
    { at: '@$4', name: 'rubber_stamp_2', gain: -5, dur: 0.5 },
    { at: '@million#3', name: 'pop_2', gain: -9, dur: 0.3 }, { at: '@penny', name: 'pop_1', gain: -9, dur: 0.4 }, { at: '@doubles', name: 'coin_single_1', gain: -9, dur: 0.5 },
    { at: '@taxes', name: 'click_2', gain: -10, dur: 0.3 },
    { at: '@Doubling\'s-0.3', name: 'swoosh_1', gain: -9, dur: 0.8 }, { at: '@two#2', name: 'pop_1', gain: -8, dur: 0.4 }, { at: '@two#2+0.1', name: 'coin_single_1', gain: -9, dur: 0.5 }, { at: '@four', name: 'pop_2', gain: -8, dur: 0.4 }, { at: '@four+0.12', name: 'coin_single_1', gain: -9, dur: 0.5 },
    { at: '@twice', name: 'pop_2', gain: -9, dur: 0.4 }, { at: '@before', name: 'ding_2', gain: -9, dur: 0.6 },
    { at: '@four+0.5', name: 'ding_1', gain: -11, dur: 0.6 }, { at: '@Double', name: 'pop_2', gain: -9, dur: 0.3 },
    { at: '@weekend-0.3', name: 'money_counter_1', gain: -13, dur: 1.0 }, { at: '@64', name: 'ding_2', gain: -9, dur: 0.6 },
    { at: '@10-0.45', name: 'money_counter_1', gain: -13, dur: 0.9 }, { at: '@10+0.1', name: 'ding_2', gain: -8, dur: 0.6 },
    { at: '@20-0.35', name: 'money_counter_2', gain: -13, dur: 1.4 }, { at: '@20+0.1', name: 'ding_2', gain: -8, dur: 0.6 },
    { at: '@190-0.2', name: 'click_1', gain: -9, dur: 0.25 }, { at: '@Send-0.05', name: 'swoosh_1', gain: -9, dur: 0.9 },
    { at: '@day#6-0.4', name: 'money_counter_2', gain: -13, dur: 1.9 }, { at: '@27+0.05', name: 'wrong_buzzer_1', gain: -14, dur: 0.6 }, { at: '@27+0.05', name: 'thud_1', gain: -8, dur: 0.4 },
    { at: '@Three+0.1', name: 'click_1', gain: -9, dur: 0.2 }, { at: '@Three+0.4', name: 'click_1', gain: -9, dur: 0.2 }, { at: '@Three+0.7', name: 'click_1', gain: -9, dur: 0.2 },
    { at: '@28+0.1', name: 'success_chime_1', gain: -10, dur: 1.0 }, { at: '@past', name: 'rubber_stamp_2', gain: -6, dur: 0.5 }, { at: '@29+0.15', name: 'ding_1', gain: -10, dur: 0.6 },
    { at: '@30#2-0.4', name: 'riser_1', gain: -12, dur: 1.4 },
    { at: '@5', name: 'deep_boom_1', gain: -2, dur: 1.6 }, { at: '@5', name: 'cinematic_hit_1', gain: -6, dur: 1.2 }, { at: '@5+0.1', name: 'coins_drop_1', gain: -8, dur: 1.8 },
    { at: '@Almost+0.3', name: 'pop_1', gain: -9, dur: 0.4 }, { at: '@seven-0.1', name: 'pop_2', gain: -9, dur: 0.3 }, { at: '@eighths+0.4', name: 'ding_1', gain: -10, dur: 0.6 },
    { at: '@So#3-0.05', name: 'rewind_1', gain: -13, dur: 1.0 }, { at: '@four#2', name: 'cinematic_hit_2', gain: -8, dur: 1.0 }, { at: '@four#2', name: 'rubber_stamp_1', gain: -6, dur: 0.5 }, { at: '@penny#4-0.2', name: 'pop_1', gain: -9, dur: 0.5 },
    { at: '@million#7+0.2', name: 'deep_boom_2', gain: -6, dur: 0.36 },
  ],
});
BM2.scene(S);
