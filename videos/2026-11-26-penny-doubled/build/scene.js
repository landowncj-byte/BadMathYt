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
    defaults: { variant: 'brick', reAt: 99999 },
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
        const dk = ease.in(clamp((te + 0.1) / 0.14)), dy = -300 * (1 - dk), sq = 1 - 0.07 * hit(te - 0.04, 7), u = te - 0.04;
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
const ST = { x: 125, y: 1330, s: 0.9, layer: 'front' };
const F0 = { x: 0, y: -100, w: 780, h: 1020 };   // frame 0 and the loop frame share this framing
const FR = { fill: 0.82, maxH: 1010, sx: 600, sy: 830 };
const HOOK = { lines: [[['PENNY vs', 'paper']], [['$1,000,000', 'good']], [['LOSES FOR 27 DAYS', 'accent']]], size: 112 };
BM2.scene({
  series: 'whatif', title: 'PENNY × 30 DAYS', duration: 44.75,
  footnote: ['ASSUMES: 1¢ ON DAY 1 · WHAT YOU HOLD DOUBLES EVERY DAY · 30 DAYS', 'NO TAXES, NO INTEREST · HYPOTHETICAL · OUR MATH · NOT FINANCIAL ADVICE'],
  elements: [
    // --- station 1: frame-0 slam + loop frame ---
    { id: 'hook', type: 'text', at: [0, -420], in: -1, out: 4.3, props: HOOK },
    { id: 'art', type: 'hookart', at: [0, 80], in: -1, props: { variant: 'brick', reAt: 44.4 } },
    { id: 'stp', type: 'stamp', at: [-60, 130], rot: -0.08, in: '@27', out: 4.3, props: { text: '27 DAYS', tone: 'bad', size: 96 } },
    { id: 'endt', type: 'text', at: [0, -420], in: 44.1, props: HOOK },
    // --- station 2: the A/B buttons (the calendar unrolls behind them) and the board ---
    { id: 'board', type: 'board', at: [1750, 0], in: '@doubles', props: { unrollAt: '@doubles+0.15',
      ticker: [[0, 0], [11.8, 0], [13.0, 10], [16.0, 10], [17.35, 20], [21.0, 20], [24.9, 27], [36.5, 27], [36.95, 28], [38.45, 28], [39.5, 30], [41.0, 30], [42.3, 20]],
      glow: [[27.7, 28], [28.0, 29], [28.3, 30]], flash: [[24.95, 27]], rainAt: 39.45, rainEnd: 41.4,
      notes: [{ at: '@190-0.2', out: '@Send+0.3', text: 'A IS STILL ≈190× BIGGER', tone: 'bad' }, { at: '@still#2-0.1', out: '@Cause', text: '3 DAYS LEFT · STILL BEHIND', tone: 'bad' }, { at: '@math', out: 36.5, text: 'DAY 28…', tone: 'ink', fg: '#FFD60A' }] } },
    { id: 'ab', type: 'ab', at: [1750, -60], in: 4.4, out: '@Okay-0.05', props: { aAt: '@million#2', bAt: '@penny#2', splitAt: '@doubles', wiggleAt: '@Everybody+0.25' } },
    { id: 'pie', type: 'pie', at: [1750, -130], in: '@Cause-0.1', out: '@Follow-0.1', props: { r: 230, center: { to: 87.5, suffix: '%', decimals: 1, at: '@seven', dur: 0.9, label: 'IN THE LAST 3 DAYS', tone: 'accent' },
      slices: [{ value: 12.5, tone: 'soft', label: 'DAYS 1–27', at: '@Cause' }, { value: 87.5, tone: 'accent', label: 'DAYS 28–30', at: '@seven-0.1' }] } },
    // --- screen-fixed ---
    { id: 'hyp', type: 'chip', layer: 'screen', at: [850, 264], in: 0.4, props: { text: 'HYPOTHETICAL', size: 24 } },
    { id: 'tEv', type: 'text', layer: 'screen', at: [540, 440], in: '@Everybody', out: '@Okay-0.1', props: { lines: [['EVERYBODY:'], [['“PENNY”', 'accent']]], size: 96 } },
    { id: 'tWhen', type: 'text', layer: 'screen', at: [540, 640], in: '@Okay', out: 11.8, props: { lines: [['BUT WHEN'], [['DOES IT WIN?', 'accent']]], size: 96 } },
    { id: 'heart', type: 'heart', layer: 'screen', at: [800, 900], in: '@like', props: { s: 1, dur: 0.9 } },
    { id: 'plane', type: 'plane', layer: 'screen', at: [0, 0], in: '@Send-0.05', out: '@Send+1.0', props: { from: [470, 1000], to: [1150, 420], dur: 0.85, s: 0.62 } },
    { id: 'btn', type: 'follow', layer: 'screen', at: [650, 1120], in: '@Follow+0.05', out: '@Follow+1.45', props: { press: 0.55 } },
    { id: 'ask', type: 'bubble', layer: 'screen', at: [690, 720], in: '@holding-0.3', out: 44.1, props: { l1: 'DAY 20 · STILL HOLDING?', l2: 'YES / NO · COMMENT', size: 44, tail: 'left' } },
  ],
  beats: [
    { at: 0, beat: 'side-by-side', focus: F0, ...FR, pose: 'shock', keep: ['hook', 'art', 'endt', 'stp'] },
    { at: 0.5, beat: 'zoom-on-number', focus: 'art.penny', fill: 0.62, sy: 900, rot: 0.008, pose: 'point', keep: ['hook', 'art'] },
    { at: 1.3, beat: 'zoom-on-number', focus: 'art.brick', fill: 0.7, sy: 900, rot: -0.008, pose: 'point', keep: ['hook', 'art'] },
    { at: '@27', beat: 'zoom-on-number', focus: 'stp', fill: 0.9, sy: 780, rot: 0.01, pose: 'shock', keep: ['hook', 'art', 'stp'] },
    { at: '@straight', beat: 'pull-back', focus: F0, ...FR, pose: 'talk', keep: ['hook', 'art', 'stp'] },
    // A / B
    { at: 4.45, beat: 'graphic-hero', focus: 'ab', move: 'whip', fill: 0.9, maxH: 900, sy: 840, st: ST, pose: 'shrug' },
    { at: '@million#2', beat: 'zoom-on-number', focus: 'ab.a', fill: 0.86, sy: 760, rot: -0.01, st: ST, pose: 'point' },
    { at: '@penny#2', beat: 'zoom-on-number', focus: 'ab.b', fill: 0.86, sy: 760, rot: 0.01, st: ST, pose: 'point' },
    { at: '@doubles', beat: 'graphic-hero', focus: 'ab', fill: 0.9, maxH: 900, sy: 840, st: ST, pose: 'shock', blur: 3 },
    { at: '@30', beat: 'zoom-on-number', focus: 'ab.b', fill: 0.86, sy: 760, rot: -0.01, st: ST, pose: 'point', dur: 0.5 },
    { at: '@Everybody', beat: 'graphic-hero', focus: 'ab', fill: 0.9, maxH: 900, sy: 930, st: ST, pose: 'chin' },
    // the board
    { at: '@Okay', beat: 'graphic-hero', focus: 'board', move: 'whip', fill: 0.9, maxH: 1020, sy: 830, st: ST, pose: 'shrug' },
    { at: '@10', beat: 'zoom-on-number', focus: 'board.t10', fill: 0.5, sy: 760, rot: 0.01, st: ST, pose: 'point', dur: 0.5 },
    { at: '@$5', beat: 'graphic-hero', focus: 'board.pile', fill: 0.9, maxH: 700, sy: 800, st: ST, pose: 'shock' },
    { at: '@Hit', beat: 'presenter-front', focus: 'board', sy: 820, pose: 'shrug' },
    { at: '@20', beat: 'zoom-on-number', focus: 'board.t20', fill: 0.5, sy: 760, rot: -0.01, st: ST, pose: 'point', dur: 0.5 },
    { at: '@five', beat: 'graphic-hero', focus: 'board.pile', fill: 0.92, maxH: 700, sy: 800, st: ST, pose: 'shock' },
    { at: '@190', beat: 'zoom-on-number', focus: 'board.mil', fill: 0.62, sy: 760, rot: 0.01, st: ST, pose: 'point', dur: 0.5 },
    { at: '@Send', beat: 'presenter-front', focus: 'board', sy: 820, pose: 'you' },
    { at: '@bail', beat: 'graphic-hero', focus: 'board', fill: 0.9, maxH: 1020, sy: 830, st: ST, pose: 'shock' },
    { at: '@27#2', beat: 'zoom-on-number', focus: 'board.t27', fill: 0.5, sy: 760, rot: 0.01, st: ST, pose: 'shock', dur: 0.5 },
    { at: '@671', beat: 'graphic-hero', focus: 'board.pile', fill: 0.92, maxH: 700, sy: 800, st: ST, pose: 'shock' },
    { at: '@Three', beat: 'graphic-hero', focus: 'board', fill: 0.9, maxH: 1020, sy: 830, st: ST, pose: 'chin' },
    { at: '@still#2', beat: 'zoom-on-number', focus: 'board.meter', fill: 0.9, sy: 700, rot: -0.01, st: ST, pose: 'shrug', dur: 0.5 },
    // pie
    { at: '@Cause', beat: 'graphic-hero', focus: 'pie', fill: 0.78, sy: 780, st: ST, pose: 'point', blur: 9, dim: 0.6 },
    { at: '@last', beat: 'zoom-on-number', focus: 'pie.center', fill: 0.6, sy: 760, rot: 0.01, st: ST, pose: 'shock', dur: 0.5, blur: 9, dim: 0.6 },
    // follow -> payoff
    { at: '@Follow', beat: 'presenter-front', focus: 'board', sy: 820, pose: 'follow' },
    { at: '@math', beat: 'graphic-hero', focus: 'board', fill: 0.9, maxH: 1020, sy: 830, st: ST, pose: 'point', dur: 1.0 },
    { at: '@28', beat: 'zoom-on-number', focus: 'board.t28', fill: 0.5, sy: 760, rot: -0.01, st: ST, pose: 'shock', dur: 0.5 },
    { at: '@1', beat: 'graphic-hero', focus: 'board.pile', fill: 0.92, maxH: 700, sy: 800, st: ST, pose: 'shock' },
    { at: 38.45, beat: 'zoom-on-number', focus: 'board.day', fill: 0.62, sy: 640, rot: 0.01, st: ST, pose: 'shock', dur: 0.5 },
    { at: '@5', beat: 'zoom-on-number', focus: 'board.stack', fill: 0.9, maxH: 570, sy: 700, rot: -0.01, st: ST, pose: 'shock', dur: 0.55 },
    { at: 40.6, beat: 'graphic-hero', focus: 'board', fill: 0.9, maxH: 1020, sy: 830, st: ST, pose: 'idle', dur: 1.1 },
    { at: '@So#2', beat: 'presenter-front', focus: 'board', sy: 820, pose: 'chin' },
    { at: '@20#2', beat: 'zoom-on-number', focus: 'board.t20', fill: 0.5, sy: 760, rot: 0.01, st: ST, pose: 'point', dur: 0.5 },
    { at: '@holding', beat: 'presenter-front', focus: 'board', sy: 820, pose: 'you' },
    { at: 44.1, beat: 'side-by-side', focus: F0, move: 'whip', ...FR, pose: 'shock', keep: ['hook', 'art', 'endt', 'stp'] },
  ],
  poses: [['@Follow', 'follow', { target: [650, 1120] }]],
  shakes: [[0.1, 8], ['@27', 8], ['@5', 20], ['@28', 10]],
  captions: { emph: { '27': 'bad', 'million': 'good', penny: 'accent', 'grand.': 'accent', '190': 'bad', '671,000.': 'bad', 'losing.': 'bad', 'seven': 'accent', 'eighths': 'accent', '28,': 'good', '30,': 'good' }, fix: [['Cause', "'Cause"], ['671,000.', '$671,000.'], ['1.3', '$1.3'], ['5.37', '$5.37']] },
  bed: { name: 'upbeat_bed_2', gain: -1 },
  sfx: [
    { at: 0.04, name: 'deep_boom_2', gain: -4, dur: 0.36 }, { at: 0.06, name: 'paper_slam_1', gain: -7, dur: 0.5 },
    { at: '@27', name: 'rubber_stamp_2', gain: -5, dur: 0.5 },
    { at: '@million#2', name: 'pop_2', gain: -9, dur: 0.3 }, { at: '@penny#2', name: 'pop_1', gain: -9, dur: 0.4 }, { at: '@doubles', name: 'coin_single_1', gain: -9, dur: 0.5 },
    { at: '@doubles+0.15', name: 'paper_slam_2', gain: -12, dur: 0.5 }, { at: '@Everybody+0.25', name: 'cartoon_boing_1', gain: -14, dur: 0.6 },
    { at: 11.8, name: 'money_counter_1', gain: -13, dur: 1.3 }, { at: '@10', name: 'ding_2', gain: -9, dur: 0.6 },
    { at: '@like', name: 'pop_2', gain: -9, dur: 0.3 },
    { at: 16.0, name: 'money_counter_1', gain: -12, dur: 1.4 }, { at: '@20', name: 'ding_2', gain: -8, dur: 0.6 },
    { at: '@190-0.2', name: 'click_1', gain: -9, dur: 0.25 },
    { at: '@Send-0.05', name: 'swoosh_1', gain: -9, dur: 0.9 },
    { at: 21.0, name: 'money_counter_2', gain: -13, dur: 3.9 },
    { at: 24.95, name: 'wrong_buzzer_1', gain: -14, dur: 0.6 }, { at: 24.95, name: 'thud_1', gain: -8, dur: 0.4 },
    { at: 27.7, name: 'click_1', gain: -9, dur: 0.2 }, { at: 28.0, name: 'click_1', gain: -9, dur: 0.2 }, { at: 28.3, name: 'click_1', gain: -9, dur: 0.2 },
    { at: '@Cause', name: 'pop_1', gain: -9, dur: 0.4 }, { at: '@seven-0.1', name: 'pop_2', gain: -9, dur: 0.3 }, { at: '@eighths+0.4', name: 'ding_1', gain: -10, dur: 0.6 },
    { at: '@Follow+0.05', name: 'pop_1', gain: -9, dur: 0.5 }, { at: '@Follow+0.6', name: 'click_1', gain: -8, dur: 0.3 }, { at: '@Follow+0.7', name: 'success_chime_1', gain: -12, dur: 1.2 },
    { at: 36.5, name: 'money_counter_1', gain: -12, dur: 0.6 }, { at: 36.95, name: 'ding_2', gain: -8, dur: 0.6 },
    { at: 38.45, name: 'riser_1', gain: -12, dur: 1.1 },
    { at: 39.5, name: 'deep_boom_1', gain: -2, dur: 1.6 }, { at: 39.5, name: 'cinematic_hit_1', gain: -6, dur: 1.2 }, { at: 39.5, name: 'coins_drop_1', gain: -8, dur: 1.8 },
    { at: 41.0, name: 'rewind_1', gain: -13, dur: 1.3 },
    { at: '@holding-0.3', name: 'pop_1', gain: -9, dur: 0.5 },
  ],
});
