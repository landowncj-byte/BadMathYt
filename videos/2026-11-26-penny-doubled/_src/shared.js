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
