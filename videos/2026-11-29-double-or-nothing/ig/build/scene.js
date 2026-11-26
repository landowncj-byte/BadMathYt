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
    // the coin in his hand
    g.save(); g.translate(104, 150); g.rotate(-0.28); g.fillStyle = SK; g.beginPath(); g.arc(0, 52, 24, 0, 7); g.fill(); stroke(g, 4);
    g.fillStyle = '#E3A400'; g.beginPath(); g.arc(0, -4, 52, 0, 7); g.fill(); stroke(g, 4.5); g.strokeStyle = '#7a5806'; g.lineWidth = 4; g.beginPath(); g.arc(0, -4, 40, 0, 7); g.stroke(); txt(g, '$', 0, -2, F.hero(48), '#6b4d05'); g.restore();
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
// ===== double-or-nothing — full-screen stage 'dstage' (screen space, camera can never crop). Layout: pill y238-290 | counter y322-552 | zone y590-1085 | row y1100-1335 | captions y~1432.
// Math (beats-v3.md): 1000 x 2^n; 10 wins = 1,024,000; chance 1/1024 = 0.0977%; 1,023 of 1,024 leave with 0; average payout = 1,024,000 / 1,024 = 1,000.
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, burst, hash, hit } = B;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const fmt = (v, d = 0) => B.fmtNum(v, d, true);
  window.DN5 = { h: {} };
  const fit = (s, ff, maxW, size, min = 18) => { while (size > min && mw(s, ff(size)) > maxW) size -= 2; return size; };
  const stk = (g, s, x, y, font, col, al = 'center', lw = 12) => { g.save(); g.font = font; g.textAlign = al; g.textBaseline = 'middle'; g.lineJoin = 'round'; g.lineWidth = lw; g.strokeStyle = 'rgba(6,8,11,.92)'; g.strokeText(s, x, y); g.fillStyle = col; g.fillText(s, x, y); g.restore(); };
  const TONE = th => ({ paper: th.paper, accent: th.accent, good: th.good, bad: th.bad, gold: th.gold, ink: '#0B0F14' });
  const label = (g, s, x, y, col, size = 26, al = 'center') => txt(g, s, x, y, F.monoX(size), col, al);
  const YR = 365.25, DAY = 86400;
  const xAt = (t, K) => { let v = K[0][1]; for (let i = 0; i < K.length - 1; i++) { const a = K[i], b = K[i + 1]; if (t >= b[0]) v = b[1]; else if (t > a[0]) { v = lerp(a[1], b[1], ease.inOut(lin(t, a[0], b[0]))); break; } else break; } return v; };
  const yearLabel = yrsBack => { const y = 2026 - yrsBack; if (y >= 1) return Math.floor(y) + ' AD'; return Math.max(1, Math.round(-y)) + ' BC'; };
  function chip(g, s, x, y, tone, th, size = 44, maxW = 900, k = 1) {
    const sz = fit(s, F.hero, maxW - 70, size), w = mw(s, F.hero(sz)) + 70, h = sz * 1.45; g.save(); g.translate(x, y); g.scale(0.7 + 0.3 * k, 0.7 + 0.3 * k);
    clay(g, -w / 2, -h / 2, w, h, h / 2, TONE(th)[tone] || tone, { shadowK: 0.6 }); txt(g, s, 0, 3, F.hero(sz), tone === 'bad' || tone === 'ink' ? th.paper : '#0B0F14'); g.restore();
  }
  function stamp(g, s, x, y, tone, th, size, rot, k) {
    const sz = fit(s, F.hero, 840, size), w = mw(s, F.hero(sz)) + 60, h = sz * 1.4, col = TONE(th)[tone] || tone; g.save(); g.translate(x, y); g.rotate(rot); g.scale(1.5 - 0.5 * Math.min(1.05, k), 1.5 - 0.5 * Math.min(1.05, k)); g.globalAlpha *= clamp(k * 3);
    g.fillStyle = 'rgba(11,15,20,.88)'; rr(g, -w / 2, -h / 2, w, h, 14); g.fill(); g.strokeStyle = col; g.lineWidth = 7; rr(g, -w / 2 + 5, -h / 2 + 5, w - 10, h - 10, 10); g.stroke(); txt(g, s, 0, 3, F.hero(sz), col); g.restore();
  }
  // a gift card centred at the origin
  function gift(g, w, h, col, amount, th, sz, sub) {
    clay(g, -w / 2, -h / 2 + 12, w, h - 12, 28, B.shade(col, -0.38), { shadowK: 0.8 }); clay(g, -w / 2, -h / 2, w, h - 12, 28, col, { shadowK: 0.3 });
    g.fillStyle = 'rgba(11,15,20,.82)'; g.fillRect(-w / 2 + 2, -h / 2 + h * 0.2, w - 4, h * 0.13);
    label(g, 'GIFT CARD', -w / 2 + 34, -h / 2 + h * 0.1, '#0B0F14', Math.max(18, Math.round(h * 0.11)), 'left');
    const s = fit(amount, F.hero, w - 70, sz, 24); txt(g, amount, 0, h * 0.14, F.hero(s), '#0B0F14');
    if (sub) label(g, sub, 0, h / 2 - h * 0.17, 'rgba(11,15,20,.75)', Math.max(16, Math.round(h * 0.075)));
  }
  // bill-stack block
  const blk = (g, x, y, w, h, col, top) => { g.fillStyle = col; g.fillRect(x, y, w, h); g.fillStyle = top; g.fillRect(x, y, w, Math.max(1.5, h * 0.28)); };
  function hookText(g, p, t, th) {
    const H = p.hook; if (!H || t > H.until + 0.35) return; const T = TONE(th), k = Math.min(1.06, 0.88 + 0.12 * Math.min(1.1, spring(t + 0.12, { f: 2.6, z: 0.5 }))), fade = 1 - lin(t, H.until, H.until + 0.3);
    let size = H.size; for (const ln of H.lines) { const s = ln.map(x => x[0]).join(''); size = fit(s, F.hero, 920, size, 40); }
    g.save(); g.globalAlpha *= fade; g.translate(540, H.y); g.scale(k, k);
    const lh = size * 1.1; H.lines.forEach((ln, i) => { const s = ln.map(x => x[0]).join(''); let x = -mw(s, F.hero(size)) / 2; const y = (i - (H.lines.length - 1) / 2) * lh; for (const [w, tn] of ln) { const ww = mw(w, F.hero(size)); stk(g, w, x + ww / 2, y, F.hero(size), T[tn] || th.paper, 'center', 16); x += ww; } });
    g.restore();
  }
  const bill = (g, x, y, w, h, lab) => { clay(g, x, y, w, h, 10, '#1FA366', { shadowK: 0.5 }); g.strokeStyle = 'rgba(245,243,238,.7)'; g.lineWidth = 3; rr(g, x + 8, y + 8, w - 16, h - 16, 6); g.stroke(); g.fillStyle = 'rgba(245,243,238,.9)'; g.beginPath(); g.arc(x + w / 2, y + h / 2, h * 0.3, 0, 7); g.fill(); txt(g, lab, x + w / 2, y + h / 2 + 2, F.hero(h * 0.3), '#0B0F14'); };
  // ---------- the coin: a real flip (toss, spin, land, tiny bounce). flips: [{at, dur, res:'H'|'T', spins}] ----------
  function coinBody(g, r, face) {
    g.fillStyle = '#7a5806'; g.beginPath(); g.arc(0, r * 0.12, r, 0, 7); g.fill();
    const rim = g.createRadialGradient(-r * 0.3, -r * 0.35, r * 0.1, 0, 0, r); rim.addColorStop(0, '#ffe58a'); rim.addColorStop(1, '#E3A400'); g.fillStyle = rim; g.beginPath(); g.arc(0, 0, r, 0, 7); g.fill();
    g.strokeStyle = 'rgba(122,88,6,.55)'; g.lineWidth = r * 0.05; for (let i = 0; i < 40; i++) { const a = i / 40 * 6.2832; g.beginPath(); g.moveTo(Math.cos(a) * r * 0.92, Math.sin(a) * r * 0.92); g.lineTo(Math.cos(a) * r * 0.99, Math.sin(a) * r * 0.99); g.stroke(); }
    g.strokeStyle = 'rgba(122,88,6,.9)'; g.lineWidth = r * 0.06; g.beginPath(); g.arc(0, 0, r * 0.8, 0, 7); g.stroke();
    txt(g, face, 0, r * 0.06, F.hero(r * 1.05), '#7a5806'); txt(g, face === 'H' ? 'HEADS' : 'TAILS', 0, -r * 0.6, F.monoX(Math.max(10, r * 0.15)), '#7a5806'); txt(g, '★  ★  ★', 0, r * 0.62, F.monoX(Math.max(10, r * 0.15)), '#7a5806');
  }
  function tossState(flips, t) {
    let a = 0, res = 'H';
    for (let q = 0; q < flips.length; q++) {
      const f = flips[q]; if (t < f.at) break; const dur = f.dur || 0.7, u = (t - f.at) / dur, delta = 2 * Math.PI * (f.spins || 2) + (f.res !== res ? Math.PI : 0);
      if (u < 1) { const e = ease.inOut(u); return { ang: a + delta * e, y: -4 * u * (1 - u), air: true }; }
      a += delta; res = f.res; const d = t - f.at - dur;
      if (q === flips.length - 1 || t < flips[q + 1].at) return { ang: a, y: d < 0.5 ? -Math.abs(Math.sin(d * 16)) * Math.exp(-d * 9) * 0.22 : 0, air: false };
    }
    return { ang: a, y: 0, air: false };
  }
  function drawCoin(g, cx, cy, r, flips, t, lift) {
    const s = tossState(flips, t), y = cy + s.y * lift, c = Math.cos(s.ang), sy = Math.max(0.07, Math.abs(c)), face = c >= 0 ? 'H' : 'T', hh = clamp(-s.y, 0, 1);
    g.save(); g.fillStyle = 'rgba(0,0,0,' + (0.24 * (1 - hh * 0.6)) + ')'; g.beginPath(); g.ellipse(cx, cy + r * 1.15, r * (1 - hh * 0.35), r * 0.2 * (1 - hh * 0.35), 0, 0, 7); g.fill(); g.restore();
    g.save(); g.translate(cx, y); g.scale(1, sy); coinBody(g, r, face); g.restore(); return s;
  }
  // ---------- scenes ----------
  function choice(g, p, lt, t, th, S) {
    g.save(); const sc0 = S.sc || 1, dy0 = S.dy || 0; g.translate(540, 800 + dy0); g.scale(sc0, sc0); g.translate(-540, -800);
    const cards = [[90, S.cash], [580, S.coin]];
    cards.forEach(([x0, c], i) => { const on = t - c.at; if (on <= 0) return; const k = Math.min(1.08, spring(on, 'bouncy')), picked = S.pick != null && t >= S.pick && i === 1, ps = picked ? 1 + 0.04 * Math.sin(Math.min(1, (t - S.pick) * 3) * 3.14) : 1;
      g.save(); g.translate(x0 + 205, 800 + (1 - Math.min(1, k)) * 60); g.scale((0.85 + 0.15 * k) * ps, (0.85 + 0.15 * k) * ps); g.globalAlpha *= clamp(on / 0.07);
      paper(g, -205, -215, 410, 430, 22, { lift: 0.5 }); if (picked) { g.strokeStyle = th.accent; g.lineWidth = 9; rr(g, -205, -215, 410, 430, 22); g.stroke(); }
      if (i === 0) { for (let b = 4; b >= 0; b--) { g.save(); g.translate(0, -40 + b * 18); g.rotate((b - 2) * 0.03); bill(g, -120, -42, 240, 100, '$' + (b < 4 ? '200' : '200')); g.restore(); } txt(g, '$1,000', 0, 120, F.hero(66), '#0B0F14'); txt(g, 'CASH · RIGHT NOW', 0, 176, F.monoX(22), '#59606B'); }
      else { g.save(); g.translate(0, -26); drawCoin(g, 0, 0, 100, c.flips || [], t, 55); g.restore(); txt(g, '×2  OR  $0', 0, 112, F.hero(70), '#0B0F14'); txt(g, 'FLIP A COIN', 0, 176, F.monoX(22), '#59606B'); }
      g.restore(); });
    if (S.or && t >= S.or) { const k = Math.min(1.1, spring(t - S.or, 'bouncy')); g.save(); g.translate(540, 800); g.scale(k, k); g.fillStyle = '#0B0F14'; g.beginPath(); g.arc(0, 0, 46, 0, 7); g.fill(); g.strokeStyle = th.accent; g.lineWidth = 5; g.stroke(); txt(g, 'OR', 0, 3, F.hero(44), th.accent); g.restore(); }
    g.restore(); if (S.chip && t >= S.chip.at) chip(g, S.chip.text, 540, 1062, S.chip.tone || 'ink', th, 38, 900, spring(t - S.chip.at, 'bouncy'));
  }
  function cash(g, p, lt, t, th, S) {
    const n = 10; for (let i = 0; i < n; i++) { const at = S.at + i * 0.09, on = t - at; if (on <= 0) continue; const k = Math.min(1.1, spring(on, 'snappy')); g.save(); g.globalAlpha *= clamp(on / 0.05); g.translate(540 + (i % 2 ? 6 : -6), 860 - i * 19 - (1 - Math.min(1, k)) * 90); g.rotate((i % 3 - 1) * 0.025); bill(g, -190, -56, 380, 118, '$100'); g.restore(); }
    if (t > S.at + 0.9) { const k = spring(t - S.at - 0.9, 'bouncy'); g.save(); g.globalAlpha *= clamp(k * 2); g.translate(540, 990); g.scale(0.8 + 0.2 * Math.min(1.08, k), 0.8 + 0.2 * Math.min(1.08, k)); stk(g, '$1,000', 0, 0, F.hero(150), th.good, 'center', 16); g.restore(); }
    if (S.chip && t >= S.chip.at) chip(g, S.chip.text, 540, 1062, 'ink', th, 38, 900, spring(t - S.chip.at, 'bouncy'));
  }
  function demo(g, p, lt, t, th, S) {
    const s = drawCoin(g, 540, 770, 130, S.flips, t, 70);
    S.flips.forEach((f, i) => { const L = f.at + (f.dur || 0.7), on = t - L; if (on < 0) return; const nxt = S.flips[i + 1]; if (nxt && t >= nxt.at) return; const k = Math.min(1.1, spring(on, 'bouncy')), H = f.res === 'H';
      g.save(); g.globalAlpha *= clamp(on / 0.06); g.translate(540, 985); g.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k);
      clay(g, -420, -52, 840, 104, 52, H ? th.good : th.bad, { shadowK: 0.6 }); txt(g, H ? 'HEADS: $1,000 → $2,000' : 'TAILS: $0', 0, 3, F.hero(fit(H ? 'HEADS: $1,000 → $2,000' : 'TAILS: $0', F.hero, 780, 60)), H ? '#0B0F14' : th.paper); g.restore(); if (on < 0.5) burst(g, 540, 985, 300, H ? th.good : th.bad, on - 0.03, 12, 0.4); });
  }
  function tenrow(g, p, lt, t, th, S) {
    stk(g, S.title || 'WIN 10 IN A ROW', 540, 640, F.hero(fit(S.title || 'WIN 10 IN A ROW', F.hero, 880, 74)), th.accent, 'center', 12);
    for (let i = 0; i < 10; i++) { const on = t - (S.at + i * 0.11); if (on <= 0) continue; const k = Math.min(1.12, spring(on, 'bouncy')), c = i % 5, r = Math.floor(i / 5), x = 540 + (c - 2) * 178, y = 755 + r * 150;
      g.save(); g.translate(x, y); g.scale(k, k); g.globalAlpha *= clamp(on / 0.05); coinBody(g, 62, 'H'); g.restore(); txt(g, String(i + 1), x + 58, y - 60, F.monoX(26), th.paper); }
    if (S.chip && t >= S.chip.at) chip(g, S.chip.text, 540, 1062, 'ink', th, 36, 900, spring(t - S.chip.at, 'bouncy'));
  }
  function bignum(g, p, lt, t, th, S) {
    const u = ease.out(clamp((t - S.at) / S.dur)), v = Math.round(S.num * u), s = (S.pre || '') + fmt(v), k = Math.min(1.08, spring(lt, 'bouncy')), big = (S.pre || '') + fmt(S.num);
    g.save(); g.translate(540, 790); g.scale(0.85 + 0.15 * k, 0.85 + 0.15 * k); stk(g, s, 0, 0, F.hero(fit(big, F.hero, 880, 210)), S.col || th.good, 'center', 18); g.restore();
    if (S.l1) stk(g, S.l1, 540, 930, F.hero(fit(S.l1, F.hero, 860, 80)), th.paper, 'center', 12);
    if (S.chip && t >= S.chip.at) chip(g, S.chip.text, 540, 1050, S.chip.tone || 'accent', th, 40, 900, spring(t - S.chip.at, 'bouncy'));
  }
  function big(g, p, lt, t, th, S) {
    const k = Math.min(1.1, spring(t - S.at, 'bouncy')); g.save(); g.globalAlpha *= clamp((t - S.at) / 0.08); g.translate(540, 790); g.scale(0.7 + 0.3 * k, 0.7 + 0.3 * k);
    stk(g, S.text, 0, S.car ? 70 : 0, F.hero(fit(S.text, F.hero, 880, S.size || 200)), S.col || th.good, 'center', 18); if (S.car) car(g, 0, -90, 1.7, 1); g.restore();
    if (S.l1) stk(g, S.l1, 540, 930, F.hero(fit(S.l1, F.hero, 860, 78)), th.paper, 'center', 12);
    if (S.chip && t >= S.chip.at) chip(g, S.chip.text, 540, 1050, S.chip.tone || 'accent', th, 38, 900, spring(t - S.chip.at, 'bouncy'));
  }
  const LAB = ['$2,000', '$4,000', '$8,000', '$16,000', '$32,000', '$64,000', '$128,000', '$256,000', '$512,000', '$1,024,000'];
  function car(g, x, y, s, k) { g.save(); g.translate(x, y); g.scale(s * k, s * k); g.fillStyle = '#2c3e66'; g.beginPath(); g.moveTo(-90, 0); g.lineTo(-86, -34); g.quadraticCurveTo(-60, -40, -44, -66); g.lineTo(34, -66); g.quadraticCurveTo(58, -42, 84, -34); g.lineTo(92, 0); g.closePath(); g.fill(); g.strokeStyle = '#0B0F14'; g.lineWidth = 4; g.stroke(); g.fillStyle = '#9ad7ff'; g.beginPath(); g.moveTo(-36, -58); g.lineTo(-24, -34); g.lineTo(-4, -34); g.lineTo(-4, -58); g.closePath(); g.moveTo(8, -58); g.lineTo(8, -34); g.lineTo(52, -34); g.lineTo(36, -58); g.closePath(); g.fill(); for (const wx of [-52, 52]) { g.fillStyle = '#0B0F14'; g.beginPath(); g.arc(wx, 4, 20, 0, 7); g.fill(); g.fillStyle = '#c9ccd2'; g.beginPath(); g.arc(wx, 4, 9, 0, 7); g.fill(); } g.restore(); }
  function ladder(g, p, lt, t, th, S) {
    const fl = S.flips, s = drawCoin(g, 540, 705, 88, fl, t, 50); let won = 0; fl.forEach(f => { if (t >= f.at + (f.dur || 0.55) - 0.02) won = Math.max(won, f.n); });
    for (let i = 0; i < 10; i++) { const c = i % 5, r = Math.floor(i / 5), x = 90 + c * 182, y = 842 + r * 92, lit = i < won, on = t - (S.lit[i] ?? 9999), k = lit ? Math.min(1.12, spring(on, 'bouncy')) : 0;
      g.save(); g.translate(x + 86, y + 38); const sc = lit ? 0.96 + 0.1 * Math.min(1, k) : 1; g.scale(sc, sc);
      clay(g, -86, -38, 172, 76, 16, lit ? (i === 9 ? th.good : th.gold) : 'rgba(245,243,238,.12)', { shadowK: lit ? 0.5 : 0 }); if (!lit) { g.strokeStyle = 'rgba(245,243,238,.35)'; g.lineWidth = 3; rr(g, -86, -38, 172, 76, 16); g.stroke(); }
      txt(g, 'FLIP ' + (i + 1), 0, -20, F.monoX(17), lit ? 'rgba(11,15,20,.7)' : 'rgba(245,243,238,.6)'); const lb = LAB[i]; txt(g, lb, 0, 12, F.hero(fit(lb, F.hero, 156, 34)), lit ? '#0B0F14' : 'rgba(245,243,238,.65)'); g.restore(); }
    if (S.car && t >= S.car.at) { const k = Math.min(1.1, spring(t - S.car.at, 'bouncy')); car(g, 190, 700, 0.95, k); g.save(); g.globalAlpha *= clamp(k); txt(g, 'A NICE CAR', 190, 766, F.monoX(20), th.gold); g.restore(); }
    let ch = null; for (const c of S.chips || []) if (t >= c.at) ch = c; if (ch && !(S.chipOut && t >= S.chipOut)) chip(g, ch.text, 540, 1062, ch.tone || 'ink', th, 38, 900, spring(t - ch.at, 'bouncy'));
  }
  // ---------- the crowd: 1,024 people, one flip at a time ----------
  const GN = 32, GP = 13.5, GX = 540 - GN * GP / 2, GY = 598, ORD = (() => { const o = Array.from({ length: 1024 }, (_, i) => i).sort((a, b) => hash(a * 12.9898 + 1.7) - hash(b * 12.9898 + 1.7)), c = 16 * 32 + 16, k = o.indexOf(c); o[k] = o[1023]; o[1023] = c; return o; })();
  const ELIM = (() => { const e = new Array(1024); const cuts = [512, 768, 896, 960, 992, 1008, 1016, 1020, 1022, 1023]; for (let k = 0; k < 1024; k++) { let f = 11; for (let j = 0; j < 10; j++) if (k < cuts[j]) { f = j + 1; break; } e[ORD[k]] = f; } return e; })();
  const RANK = (() => { const r = new Array(1024); ORD.forEach((idx, k) => { r[idx] = k; }); return r; })();
  const left = (t, F10) => { let n = 0; for (const f of F10) if (t >= f) n++; return n; };
  function crowd(g, p, lt, t, th, S) {
    const F10 = p.crowdFlips, n = left(t, F10), alive = 1024 >> n, appear = S.appear ?? S.from;
    g.save(); if (S.sc) { g.translate(540, 814 + (S.dy || 0)); g.scale(S.sc, S.sc); g.translate(-540, -814); }
    for (let i = 0; i < 1024; i++) {
      const c = i % GN, r = Math.floor(i / GN), x = GX + (c + 0.5) * GP, y = GY + (r + 0.5) * GP, e = ELIM[i], ft = S.sweep ? (RANK[i] < 1023 ? S.sweep[0] + RANK[i] / 1023 * (S.sweep[1] - S.sweep[0]) : 1e9) : (e <= 10 ? F10[e - 1] : 1e9), k = t - ft, ap = clamp((t - appear - (c + r) * 0.012) / 0.15);
      if (ap <= 0) continue; if (k < 0) { const sv = e === 11; g.fillStyle = sv && t >= (S.spotAt ?? 1e9) ? '#fff' : (hash(i * 3.7) > 0.5 ? '#F2B705' : '#FFD60A'); g.beginPath(); g.arc(x, y, 4.6 * ap * (sv && t >= (S.spotAt ?? 1e9) ? 2.4 : 1), 0, 7); g.fill(); }
      else if (k < 0.45) { const u = k / 0.45; g.fillStyle = 'rgba(229,83,75,' + (1 - u * 0.4) + ')'; g.beginPath(); g.arc(x, y, 4.6 * (1 + 0.5 * Math.sin(u * 3.1)) * (1 - u * 0.45), 0, 7); g.fill(); }
      else { g.fillStyle = 'rgba(245,243,238,.13)'; g.beginPath(); g.arc(x, y, 2.4, 0, 7); g.fill(); } }
    // side numbers
    if (!S.noSide) {
    label(g, 'FLIP', 90, 690, th.paper, 28, 'left'); stk(g, String(n), 90, 770, F.hero(96), th.accent, 'left', 12); label(g, 'OF 10', 90, 846, 'rgba(245,243,238,.8)', 24, 'left');
    label(g, 'LEFT', 990, 690, th.paper, 28, 'right'); stk(g, fmt(alive), 990, 770, F.hero(fit(fmt(alive), F.hero, 205, 96)), alive === 1 ? th.good : th.paper, 'right', 12);
    if (S.holds) label(g, 'EACH: $' + fmt(1000 * (1 << n)), 990, 846, th.gold, 20, 'right');
    }
    // the halving pop
    for (let j = 0; j < 10 && !S.sweep; j++) { const k = t - F10[j]; if (k > 0 && k < 0.7) { g.save(); g.globalAlpha *= 1 - k / 0.7; stk(g, '÷ 2', 540, 800 - k * 80, F.hero(110), th.bad, 'center', 14); g.restore(); } }
    // the one left
    if (S.spotAt != null && t >= S.spotAt) { const o = t - S.spotAt, cx = GX + (16 + 0.5) * GP, cy = GY + (16 + 0.5) * GP; for (let q = 0; q < 3; q++) { const u = ((o * 0.9 + q / 3) % 1); g.strokeStyle = 'rgba(0,210,106,' + (1 - u) + ')'; g.lineWidth = 5; g.beginPath(); g.arc(cx, cy, 14 + u * 70, 0, 7); g.stroke(); } if (o < 0.5) burst(g, cx, cy, 160, th.good, o - 0.02, 12, 0.4); }
    g.restore();
    for (const nt of S.tags || []) if (t >= nt.at && (!nt.out || t < nt.out)) { const k = spring(t - nt.at, 'bouncy'); chip(g, nt.text, 540, nt.y || 1062, nt.tone || 'ink', th, nt.size || 38, 900, k); }
  }
  function days(g, p, lt, t, th, S) {
    const cols = 64, rows = 16, P = 14, x0 = 540 - cols * P / 2, y0 = 640; label(g, '1,024 DAYS ≈ 2.8 YEARS OF DAYS', 540, 612, th.paper, 26);
    for (let i = 0; i < 1024; i++) { const c = i % cols, r = Math.floor(i / cols), ap = clamp((t - S.at - c * 0.01 - r * 0.02) / 0.15); if (ap <= 0) continue; const hit0 = i === 531 && t >= S.pickAt; g.fillStyle = hit0 ? th.good : 'rgba(245,243,238,.35)'; g.beginPath(); g.arc(x0 + (c + 0.5) * P, y0 + (r + 0.5) * P, hit0 ? 8 : 4.2 * ap, 0, 7); g.fill(); }
    if (t >= S.pickAt) { const o = t - S.pickAt, cx = x0 + (531 % cols + 0.5) * P, cy = y0 + (Math.floor(531 / cols) + 0.5) * P; for (let q = 0; q < 2; q++) { const u = ((o * 0.9 + q / 2) % 1); g.strokeStyle = 'rgba(0,210,106,' + (1 - u) + ')'; g.lineWidth = 4; g.beginPath(); g.arc(cx, cy, 10 + u * 50, 0, 7); g.stroke(); } }
    if (S.chip && t >= S.chip.at) chip(g, S.chip.text, 540, 1010, S.chip.tone || 'ink', th, 38, 900, spring(t - S.chip.at, 'bouncy'));
  }
  function odds(g, p, lt, t, th, S) {
    const k = Math.min(1.08, spring(lt, 'bouncy')); g.save(); g.translate(540, 700); g.scale(0.85 + 0.15 * k, 0.85 + 0.15 * k); stk(g, '1 IN 1,024', 0, 0, F.hero(fit('1 IN 1,024', F.hero, 880, 160)), th.accent, 'center', 16); g.restore();
    const bx = 90, bw = 900, by = 830; g.fillStyle = 'rgba(245,243,238,.16)'; rr(g, bx, by, bw, 64, 32); g.fill(); g.strokeStyle = 'rgba(245,243,238,.7)'; g.lineWidth = 3; rr(g, bx, by, bw, 64, 32); g.stroke();
    const on = t - S.at; if (on > 0) { const u = ease.out(clamp(on / 0.5)); g.fillStyle = th.bad; g.fillRect(bx + 4, by - 16, 7 * u, 96); const ax = bx + 60, ay = by + 128; g.save(); g.globalAlpha *= u; g.strokeStyle = th.bad; g.lineWidth = 5; g.beginPath(); g.moveTo(bx + 8, by + 82); g.lineTo(ax - 20, ay - 28); g.stroke(); stk(g, 'ABOUT 0.1%', ax + 20, ay + 6, F.hero(64), th.bad, 'left', 12); g.restore(); }
    label(g, '0%', bx, by + 98, 'rgba(245,243,238,.7)', 22, 'left'); label(g, '100%', bx + bw, by + 98, 'rgba(245,243,238,.7)', 22, 'right');
    if (S.chip && t >= S.chip.at) chip(g, S.chip.text, 540, 1050, S.chip.tone || 'ink', th, 38, 900, spring(t - S.chip.at, 'bouncy'));
  }
  function duo(g, p, lt, t, th, S) {
    [S.a, S.b].forEach((c, i) => { const on = t - c.at; if (on <= 0) return; const k = spring(on, 'bouncy'), y = 720 + i * 224, bw = 920, bh = 196, col = c.col;
      g.save(); g.translate(540, y + (1 - Math.min(1, k)) * 70); g.scale(0.85 + 0.15 * Math.min(1.06, k), 0.85 + 0.15 * Math.min(1.06, k)); g.globalAlpha *= clamp(on / 0.07);
      clay(g, -bw / 2, -bh / 2 + 16, bw, bh - 16, 48, B.shade(col, -0.38), { shadowK: 0.8 }); clay(g, -bw / 2, -bh / 2, bw, bh - 14, 48, col, { shadowK: 0.3 });
      const sz = fit(c.l1, F.hero, 840, 82, 36); txt(g, c.l1, 0, -34, F.hero(sz), c.ink || '#0B0F14'); const s2 = fit(c.l2, F.hero, 840, 74, 36); txt(g, c.l2, 0, 44, F.hero(s2), c.ink || '#0B0F14'); g.restore(); });
  }
  function eq(g, p, lt, t, th, S) {
    [S.a, S.b].forEach((c, i) => { const on = t - c.at; if (on <= 0) return; const k = spring(on, 'bouncy'), x = i ? 770 : 310; g.save(); g.translate(x, 800 + (1 - Math.min(1, k)) * 60); g.scale(0.85 + 0.15 * Math.min(1.06, k), 0.85 + 0.15 * Math.min(1.06, k)); g.globalAlpha *= clamp(on / 0.07);
      clay(g, -215, -190, 430, 380, 36, B.shade(c.col, -0.38), { shadowK: 0.8 }); clay(g, -215, -190, 430, 366, 36, c.col, { shadowK: 0.3 });
      txt(g, c.l1, 0, -110, F.hero(fit(c.l1, F.hero, 380, 54)), '#0B0F14'); txt(g, c.l2, 0, -20, F.hero(fit(c.l2, F.hero, 390, 84)), '#0B0F14'); txt(g, c.l3, 0, 100, F.hero(fit(c.l3, F.hero, 380, 46)), '#0B0F14'); g.restore(); });
    if (S.mid && t >= S.mid) { const k = Math.min(1.12, spring(t - S.mid, 'bouncy')); g.save(); g.translate(540, 800); g.scale(k, k); g.fillStyle = '#0B0F14'; g.beginPath(); g.arc(0, 0, 52, 0, 7); g.fill(); g.strokeStyle = th.good; g.lineWidth = 6; g.stroke(); txt(g, '=', 0, 3, F.hero(76), th.good); g.restore(); }
    if (S.chip && t >= S.chip.at) chip(g, S.chip.text, 540, 1062, S.chip.tone || 'ink', th, 36, 900, spring(t - S.chip.at, 'bouncy'));
  }
  function ask(g, p, lt, t, th, S) {
    const k = spring(lt, 'bouncy'); g.save(); g.translate(540, 800); g.scale(0.7 + 0.3 * Math.min(1.06, k), 0.7 + 0.3 * Math.min(1.06, k)); g.globalAlpha *= clamp(k * 2);
    const sz = Math.min(fit(S.l1, F.hero, 900, 112), fit(S.l2, F.hero, 900, 112)); stk(g, S.l1, 0, -62, F.hero(sz), th.accent, 'center', 16); stk(g, S.l2, 0, 62, F.hero(sz), th.good, 'center', 16); g.restore();
  }
  const SC = { choice, cash, demo, tenrow, bignum, big, ladder, crowd, days, odds, duo, eq, ask };
  Object.assign(window.DN5.h, { fit, stk, chip, stamp, label, mw, TONE });
  B.register('dstage', {
    defaults: { K: [[0, 0]], C: [], scenes: [], hook: null, hideCounter: [], beats: [], notes: [], crowdFlips: [] }, ownEnter: true, size: () => [1080, 1920],
    draw(g, p, env) {
      const { t, theme: th } = env; g.translate(-540, -960);
      const x = xAt(t, p.K);
      let bl = ''; for (const b of p.beats) if (t >= b[0]) bl = b[1]; if (bl) { const k = spring(t - (p.beats.find(b => b[1] === bl)[0]), 'snappy'); g.save(); g.globalAlpha *= clamp(k * 2); label(g, bl, 990, 264, th.accent, 26, 'right'); g.restore(); }
      let seg = p.C[0]; for (const s of p.C) if (t >= s.from) seg = s; const hid = p.hideCounter.some(([a, b]) => t >= a && t < b), segT = t - seg.from, pop = 1 + 0.05 * hit(Math.min(0.5, Math.max(0, segT)), 8);
      if (!hid) {
        g.save(); g.translate(540, 437); g.scale(pop, pop); g.translate(-540, -437); paper(g, 70, 322, 940, 230, 26, { lift: 0.3 });
        let L, R, fr; const m = seg.mode;
        if (m === 'f') { const pot = 1000 * Math.pow(2, x); L = ['FLIPS WON', String(Math.round(x))]; R = ['YOUR POT', '$' + fmt(Math.round(pot))]; fr = x / 10; }
        else if (m === 'c') { const n = left(t, p.crowdFlips); L = ['FLIP', n + ' / 10']; R = ['PEOPLE LEFT', fmt(1024 >> n)]; fr = (1024 >> n) / 1024; }
        else if (m === 'z') { const dead = clamp((t - seg.a) / (seg.b - seg.a)) * 1023; L = ['PEOPLE WHO GOT $0', fmt(Math.round(dead))]; R = ['STARTED WITH', '$1,000']; fr = dead / 1023; }
        else { L = ['PEOPLE', '1,024']; R = ['AVERAGE PAYOUT', x < 1 ? '?' : '$' + fmt(Math.round(x))]; fr = x / 1000; }
        g.fillStyle = 'rgba(11,15,20,.14)'; rr(g, 98, 344, 884, 22, 11); g.fill(); const fw = clamp(m === 'c' ? 1 - fr : fr) * 884; if (fw > 4) { g.fillStyle = (m === 'c' || m === 'z') ? th.bad : th.gold; rr(g, 98, 344, Math.max(22, fw), 22, 11); g.fill(); }
        label(g, L[0], 100, 398, th.inkSoft, 28, 'left'); label(g, R[0], 980, 398, th.inkSoft, 28, 'right');
        const sL = fit(L[1], F.hero, 430, 118, 40), sR = fit(R[1], F.hero, 430, 118, 40);
        txt(g, L[1], 100, 484, F.hero(sL), th.ink, 'left'); txt(g, R[1], 980, 484, F.hero(sR), m === 'c' && 1024 >> left(t, p.crowdFlips) === 1 ? th.good : th.ink, 'right');
        g.restore();
      }
      hookText(g, p, t, th);
      for (const S of p.scenes) {
        if (t < S.from - 0.02 || t > S.to + 0.02) continue; const lt = t - S.from, kin = spring(lt + 0.08, { f: 2.4, z: 0.7 }), a = clamp(lt / 0.12) * (1 - lin(t, S.to - 0.12, S.to)), sc = (S.pop === false ? 1 : 0.94 + 0.06 * Math.min(1.05, kin));
        g.save(); g.globalAlpha *= a; g.translate(540, 840); g.scale(sc, sc); g.translate(-540, -840);
        const fn = SC[S.type]; if (!fn) throw new Error('unknown scene type ' + S.type); fn(g, p, lt, t, th, S);
        g.restore();
      }
      for (const n of p.notes) if (t >= n.at && t < n.out + 0.2) { const nt = t - n.at, k = Math.min(1.08, spring(nt, 'bouncy')), fo = 1 - lin(t, n.out - 0.15, n.out + 0.05); g.save(); g.globalAlpha *= clamp(nt / 0.06) * fo; if (n.stamp) stamp(g, n.text, 540, n.y || 598, n.tone || 'good', th, n.size || 62, n.rot || -0.04, k); else chip(g, n.text, 540, n.y || 598, n.tone || 'bad', th, n.size || 44, 900, k); g.restore(); }
    },
  });
  B.register('hypo', {
    defaults: { text: 'HYPOTHETICAL' }, ownEnter: true, size: () => [10, 10],
    draw(g, p, env) { const s = p.text, f = F.monoX(21), w = mw(s, f) + 36; g.globalAlpha *= 0.9; g.fillStyle = 'rgba(11,15,20,.78)'; rr(g, -w / 2, -18, w, 36, 18); g.fill(); g.strokeStyle = env.theme.accent; g.lineWidth = 2; rr(g, -w / 2, -18, w, 36, 18); g.stroke(); txt(g, s, 0, 1, f, env.theme.accent); },
  });
})();
(function () {
  const ST = { x: 905, y: 1338, s: 0.8, layer: 'front', blur: 0, dim: 0 };
  const DX = [0, 420, -380, 300, -300, 380, -420, 260];
  window.DN5.make = function (c0) {
    const B = window.BM2, T = B.makeT((window.BM2_VOICE || {}).words || []), c = B.deepT(c0, T);
    const els = [], extra = c.sfx2 || [], auto = [];
    c.scenes.forEach((sc, i) => { if (i > 0) auto.push({ at: sc.from, name: i % 2 ? 'whoosh_1' : 'whoosh_2', gain: -11, dur: 0.6 });
      const fl = (sc.flips || (sc.coin && sc.coin.flips) || []); fl.forEach((f, j) => { auto.push({ at: f.at, name: 'swipe_1', gain: -14, dur: 0.3 }); auto.push({ at: f.at + (f.dur || 0.7), name: 'coin_single_1', gain: -9, dur: 0.5 }); });
      if (sc.type === 'demo') sc.flips.forEach(f => auto.push({ at: f.at + (f.dur || 0.7) + 0.05, name: f.res === 'H' ? 'success_chime_1' : 'wrong_buzzer_1', gain: f.res === 'H' ? -11 : -12, dur: 0.9 }));
      if (sc.type === 'choice') { [sc.cash, sc.coin].forEach((cd, j) => auto.push({ at: cd.at, name: j ? 'pop_1' : 'pop_2', gain: -9, dur: 0.4 })); }
      if (sc.type === 'cash') { auto.push({ at: sc.at, name: 'cash_count_1', gain: -12, dur: 1.2 }); }
      if (sc.type === 'tenrow') for (let k = 0; k < 10; k += 2) auto.push({ at: sc.at + k * 0.11, name: 'pop_2', gain: -12, dur: 0.25 });
      if (sc.type === 'bignum') { auto.push({ at: sc.at, name: 'money_counter_2', gain: -12, dur: 1.4 }); auto.push({ at: sc.at + sc.dur * 0.8, name: 'deep_boom_1', gain: -5, dur: 1.4 }); auto.push({ at: sc.at + sc.dur * 0.8, name: 'cinematic_hit_1', gain: -8, dur: 1.2 }); if (sc.chip) auto.push({ at: sc.chip.at, name: 'rubber_stamp_1', gain: -8, dur: 0.5 }); }
      if (sc.type === 'big') { auto.push({ at: sc.at, name: 'success_chime_1', gain: -9, dur: 1.2 }); }
      if (sc.type === 'ladder') (sc.chips || []).forEach(ch => auto.push({ at: ch.at, name: 'pop_1', gain: -10, dur: 0.4 })), sc.car && auto.push({ at: sc.car.at, name: 'pop_2', gain: -9, dur: 0.4 });
      if (sc.type === 'crowd') { if (!sc.noSfx) c.flips10.forEach((f, j) => { if (f >= sc.from && f <= sc.to) auto.push({ at: f, name: 'click_1', gain: -10, dur: 0.2 }); }); if (sc.spotAt != null) { auto.push({ at: sc.spotAt, name: 'success_chime_1', gain: -9, dur: 1.2 }); auto.push({ at: sc.spotAt, name: 'sub_drop_1', gain: -9, dur: 0.8 }); } (sc.tags || []).forEach(tg => auto.push({ at: tg.at, name: 'pop_1', gain: -10, dur: 0.4 })); }
      if (sc.type === 'days') auto.push({ at: sc.pickAt, name: 'ding_2', gain: -9, dur: 0.6 });
      if (sc.type === 'odds') auto.push({ at: sc.at, name: 'thud_1', gain: -9, dur: 0.4 });
      if (sc.type === 'duo') [sc.a, sc.b].forEach((cd, j) => auto.push({ at: cd.at, name: j ? 'pop_1' : 'pop_2', gain: -9, dur: 0.4 }));
      if (sc.type === 'eq') { [sc.a, sc.b].forEach((cd, j) => auto.push({ at: cd.at, name: j ? 'pop_1' : 'pop_2', gain: -9, dur: 0.4 })); if (sc.mid) auto.push({ at: sc.mid, name: 'success_chime_1', gain: -10, dur: 1.0 }); }
      if (sc.type === 'ask') auto.push({ at: sc.from, name: 'pop_1', gain: -9, dur: 0.4 }); });
    els.push({ id: 'stage', type: 'dstage', layer: 'screen', at: [540, 960], in: -1, z: 10, props: { K: c.K, C: c.C, scenes: c.scenes, hook: c.hook, hideCounter: c.hideCounter || [], beats: c.labels, notes: c.notes || [], crowdFlips: c.flips10 } });
    els.push({ id: 'you', type: 'you', layer: 'screen', at: [150, 1213], scale: 0.82, in: -1, z: 20, props: { keys: c.you } });
    els.push({ id: 'hypo', type: 'hypo', layer: 'screen', at: [545, 1316], in: 0.2, z: 20, props: { text: 'HYPOTHETICAL · FAIR COIN · NO TAX' } });
    if (c.cta.like) els.push({ id: 'heart', type: 'heart', layer: 'screen', at: [520, 1205], in: c.cta.like, z: 30, props: { s: 1, dur: 1.0 } });
    if (c.cta.send) els.push({ id: 'plane', type: 'plane', layer: 'screen', at: [0, 0], in: c.cta.send, z: 30, props: { from: [330, 1275], to: [760, 1160], dur: 1.2, s: 0.7 }, out: c.cta.send + 1.5 });
    if (c.cta.follow) els.push({ id: 'follow', type: 'follow', layer: 'screen', at: [520, 1215], in: c.cta.follow, out: c.cta.followOut, z: 30, props: { press: 0.75 } });
    if (c.cta.bubble) els.push({ id: 'bubble', type: 'bubble', layer: 'screen', at: [520, 1205], in: c.cta.bubble.at, z: 30, props: { l1: c.cta.bubble.l1, l2: c.cta.bubble.l2, size: 40, tail: 'left' } });
    const beats = c.scenes.map((s, i) => ({ at: s.from, beat: 'wide', focus: { x: 540 + DX[i % DX.length], y: 740 + (i % 2 ? 90 : -60), w: 1080, h: 300 }, fill: 1, dur: 0.8, st: ST, pose: s.pose || 'talk' }));
    beats.unshift({ at: 0, beat: 'wide', focus: { x: 540, y: 740, w: 1080, h: 300 }, fill: 1, st: ST, pose: 'shock' });
    return {
      series: 'whatif', title: 'DOUBLE OR NOTHING', duration: c.dur,
      footnote: ['ASSUMES: FAIR COIN · WIN 10 FLIPS IN A ROW · NO TAX · $1,000 × 2^10 = $1,024,000', 'HYPOTHETICAL · OUR MATH · NOT FINANCIAL ADVICE'],
      elements: els, beats, poses: [...(c.cta.follow ? [[c.cta.follow, 'follow', { target: [520, 1215] }]] : []), ...(c.poses || [])], shakes: c.shakes, captions: c.captions, bed: c.bed || { name: 'synth_bed_1', gain: -1 }, sfx: [...auto, ...extra],
    };
  };
})();
// IG cut — "This coin flip makes a million look easy." Different order: cash · coin demo · 10 in a row · prize · ladder (3 heads, 5 heads, car) · send · crowd · odds · one right day in 2.8 years · follow · winner · twist · same as cash · ask
const H = { until: '@take-0.1', y: 700, size: 66, lines: [[['THIS COIN FLIP MAKES', 'paper']], [['A MILLION LOOK EASY', 'good']], [["IT'S NOT", 'bad']]] };
const F10 = [43.4, 43.85, 44.25, 44.6, 44.9, 45.2, 45.5, 45.75, 46.0, 46.3];
const lf = (at, n, dur = 0.45) => ({ at, dur, res: 'H', n });
const S = DN5.make({
  dur: 71.70, flips10: F10,
  K: [[0, 0], ['@coin#1', 0], ['@million', 10], ['@not-0.05', 10], ['@not+0.2', 0], ['@$1#2', 0], ['@000#2', 10], ['@double-0.3', 10], ['@double-0.1', 0],
    [22.0, 0], [22.4, 1], [22.45, 1], [22.85, 2], [22.9, 2], [23.25, 3], [26.3, 3], [26.7, 4], [26.8, 4], [27.25, 5], [62.1, 0], ['@000#5', 1000]],
  C: [{ from: 0, mode: 'f' }, { from: "@here's-0.1", mode: 'c' }, { from: '@spread-0.1', mode: 'a' }],
  hook: H,
  scenes: [
    { type: 'choice', from: 0, to: '@take-0.1', pose: 'shock', sc: 0.5, dy: 215, cash: { at: 0.25 }, coin: { at: 0.4, flips: [{ at: 0.9, dur: 0.8, res: 'H' }, { at: 2.3, dur: 0.8, res: 'H' }] } },
    { type: 'cash', from: '@take-0.1', to: '@or-0.1', pose: 'talk', at: '@take', chip: { at: '@cash', text: 'CASH · RIGHT NOW' } },
    { type: 'demo', from: '@or-0.1', to: '@and#1-0.1', pose: 'shock', flips: [{ at: 7.75, dur: 0.7, res: 'H' }, { at: 9.0, dur: 0.6, res: 'T' }] },
    { type: 'tenrow', from: '@and#1-0.1', to: '@with-0.1', pose: 'chin', at: '@10-0.05', title: '10 HEADS IN A ROW', chip: { at: '@no', text: 'NO BAILING EARLY' } },
    { type: 'bignum', from: '@with-0.1', to: '@double-0.1', pose: 'shock', at: '@$1#2', dur: 1.05, num: 1024000, pre: '$', col: '#00D26A', chip: { at: '@000#2+0.35', text: "THAT'S 1,024 × THE CASH" } },
    { type: 'ask', from: '@double-0.1', to: 21.85, pose: 'you', l1: 'WOULD YOU FLIP', l2: 'WITHOUT THINKING?' },
    { type: 'ladder', from: 21.85, to: '@send-0.1', pose: 'shock', flips: [lf(21.95, 1), lf(22.4, 2), lf(22.8, 3), lf(26.2, 4, 0.5), lf(26.75, 5, 0.5)], lit: [22.4, 22.85, 23.25, 26.7, 27.25], car: { at: '@real-0.3' }, chipOut: '@send-0.15',
      chips: [{ at: 23.25, text: 'WON 3 · POT $8,000', tone: 'good' }, { at: '@eight', text: 'ONLY 1 IN 8 GETS THERE', tone: 'bad' }, { at: 27.3, text: 'WON 5 · POT $32,000', tone: 'good' }, { at: '@32#1', text: "NOW IT'S 1 IN 32", tone: 'bad' }, { at: '@everyone', text: 'EVERYONE ELSE: $0', tone: 'bad' }] },
    { type: 'ask', from: '@send-0.1', to: "@here's-0.1", pose: 'you', l1: 'FRIEND WHO BETS', l2: 'THE RENT ON ONE FLIP' },
    { type: 'crowd', from: "@here's-0.1", to: '@your#2-0.1', pose: 'shock', appear: '@line', holds: true, spotAt: '@one#4',
      tags: [{ at: '@line+0.5', out: '@every#2', text: '1,024 PEOPLE · ONE LINE', tone: 'ink' }, { at: '@every#2', out: '@after', text: 'EVERY FLIP: HALF WIPED OUT', tone: 'bad' }, { at: '@after', out: '@one#4', text: 'AFTER 10 FLIPS…', tone: 'ink' }, { at: '@one#4', text: 'ONE PERSON LEFT', tone: 'good' }] },
    { type: 'odds', from: '@your#2-0.1', to: "@that's-0.1", pose: 'chin', at: '@about#1', chip: { at: '@1#2', text: 'ONE IN 1,024 · ABOUT 0.1%', tone: 'ink' } },
    { type: 'days', from: "@that's-0.1", to: '@follow-0.1', pose: 'chin', at: "@that's+0.2", pickAt: '@day', chip: { at: '@years', text: 'RIGHT DAY OUT OF ~3 YEARS', tone: 'accent' } },
    { type: 'ask', from: '@follow-0.1', to: '@the#6-0.1', pose: 'you', l1: 'THE ENDING', l2: 'FLIPS THIS WHOLE THING' },
    { type: 'crowd', from: '@the#6-0.1', to: '@spread-0.1', pose: 'shock', appear: 40.62, holds: false, spotAt: 46.66, noSfx: true, pop: false,
      tags: [{ at: '@million#2-0.3', out: '@other', text: '1 WINNER · $1,024,000', tone: 'good' }, { at: '@023', text: '1,023 PEOPLE · $0 EACH', tone: 'bad' }] },
    { type: 'duo', from: '@spread-0.1', to: '@same-0.1', pose: 'chin', a: { at: '@spread', col: '#FFD60A', l1: '$1,024,000', l2: 'SPREAD ACROSS 1,024' }, b: { at: "@it's#3-0.1", col: '#00D26A', l1: 'EACH GETS', l2: '$1,000' } },
    { type: 'eq', from: '@same-0.1', to: '@so#1-0.1', pose: 'talk', a: { at: '@same', col: '#00D26A', l1: 'THE BORING CASH', l2: '$1,000', l3: 'FOR SURE' }, b: { at: '@boring', col: '#FFD60A', l1: 'THE COIN', l2: '$1,000', l3: 'ON AVERAGE' }, mid: '@as', chip: { at: '@hides', text: 'THE COIN HIDES THE LOSERS', tone: 'accent' } },
    { type: 'ask', from: '@so#1-0.1', to: 99, pose: 'you', l1: 'CASH OR COIN?', l2: 'ONE WORD' },
  ],
  hideCounter: [['@so#1-0.1', 99]],
  labels: [[0, 'THE BAIT'], ['@take-0.1', 'THE CASH'], ['@or-0.1', 'THE COIN'], ['@and#1-0.1', 'THE CATCH'], ['@with-0.1', 'THE PRIZE'], ['@double-0.1', 'THE GUT CALL'], ['@three-0.1', 'THE LADDER'], ["@here's-0.1", 'THE CROWD'], ['@your#2-0.1', 'THE ODDS'], ['@the#6-0.1', 'THE WINNER'], ['@spread-0.1', 'THE TWIST']],
  notes: [],
  you: [{ at: 0, mood: 'smirk', text: 'YOU: EASY MILLION?' }, { at: '@take', mood: 'neutral', text: 'CASH: $1,000' }, { at: '@or', mood: 'smirk', text: 'OR A COIN…' }, { at: '@tails', mood: 'angry', text: 'TAILS = $0' }, { at: '@and#1', mood: 'worried', text: '10 IN A ROW' }, { at: '@$1#2', mood: 'wow', text: '$1,024,000!' }, { at: '@double', mood: 'smirk', text: 'FLIP, NO THINKING' },
    { at: '@three', mood: 'happy', text: 'HEADS!' }, { at: '@crying', mood: 'worried', text: 'CRYING IN LOT' }, { at: "@here's", mood: 'worried', text: 'IN THE LINE' }, { at: '@one#4', mood: 'wow', text: 'JUST ONE' }, { at: '@the#6', mood: 'angry', text: 'YOU: $0' }, { at: '@spread', mood: 'neutral', text: 'THE TWIST' }, { at: '@same', mood: 'smirk', text: 'SAME AS CASH' }, { at: '@so#1', mood: 'smirk', text: 'YOUR CALL' }],
  cta: { like: '@tap-0.1', send: '@send', follow: '@follow+0.05', followOut: '@follow+1.9', bubble: { at: '@coin#5', l1: 'CASH OR COIN?', l2: 'COMMENT BELOW' } },
  poses: [['@tap', 'you'], ['@send', 'you']],
  shakes: [[0.1, 8], ['@$1#2+0.8', 12], ['@one#4', 12]],
  captions: { gap: 16, emph: { 'coin': 'accent', 'coin.': 'accent', 'coin?': 'accent', 'million': 'good', 'million.': 'good', 'fucking': 'bad', 'damn': 'bad', 'tails,': 'bad', 'nothing.': 'bad', 'cash.': 'good', 'losers.': 'bad' }, fix: [] },
  sfx2: [
    { at: 0.04, name: 'deep_boom_2', gain: -4, dur: 0.36 }, { at: '@coin#1', name: 'money_counter_2', gain: -13, dur: 2.4 },
    { at: '@tap', name: 'pop_2', gain: -9, dur: 0.3 }, { at: '@send-0.05', name: 'swoosh_1', gain: -9, dur: 0.9 },
    { at: '@follow+0.05', name: 'pop_1', gain: -9, dur: 0.5 }, { at: '@follow+0.8', name: 'click_1', gain: -8, dur: 0.3 }, { at: '@follow+0.9', name: 'success_chime_1', gain: -12, dur: 1.2 },
    { at: '@000#5', name: 'money_counter_1', gain: -13, dur: 1.2 }, { at: '@coin#5', name: 'pop_1', gain: -9, dur: 0.5 },
  ],
});
BM2.scene(S);
