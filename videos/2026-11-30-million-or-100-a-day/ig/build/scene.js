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
    // the $100 bill in his hand
    g.save(); g.translate(104, 150); g.rotate(-0.28); g.fillStyle = SK; g.beginPath(); g.arc(0, 52, 24, 0, 7); g.fill(); stroke(g, 4);
    g.fillStyle = '#1FA366'; g.beginPath(); g.moveTo(-62, -52); g.lineTo(62, -52); g.lineTo(62, 28); g.lineTo(-62, 28); g.closePath(); g.fill(); stroke(g, 4.5); g.strokeStyle = '#F5F3EE'; g.lineWidth = 3; g.strokeRect(-54, -44, 108, 64); g.fillStyle = '#F5F3EE'; g.beginPath(); g.arc(0, -12, 20, 0, 7); g.fill(); txt(g, '$100', 0, -10, F.hero(20), '#0B0F14'); g.restore();
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
  window.M5 = { h: {} };
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
  // ---------- shared bits ----------
  const bill = (g, x, y, w, h, lab) => { clay(g, x, y, w, h, 10, '#1FA366', { shadowK: 0.5 }); g.strokeStyle = 'rgba(245,243,238,.7)'; g.lineWidth = 3; rr(g, x + 8, y + 8, w - 16, h - 16, 6); g.stroke(); g.fillStyle = 'rgba(245,243,238,.9)'; g.beginPath(); g.arc(x + w / 2, y + h / 2, h * 0.3, 0, 7); g.fill(); txt(g, lab, x + w / 2, y + h / 2 + 2, F.hero(h * 0.3), '#0B0F14'); };
  const pk = (t, at, o = 'bouncy') => Math.min(1.1, spring(t - at, o));
  const sub = (g, s, x, y, col, size = 24, al = 'center') => txt(g, s, x, y, F.monoX(size), col, al);
  const bottomChip = (g, S, t, th) => { let ch = null; for (const c of (S.chips || (S.chip ? [S.chip] : []))) if (t >= c.at) ch = c; if (ch && !(S.chipOut && t >= S.chipOut)) chip(g, ch.text, 540, ch.y || 1062, ch.tone || 'ink', th, ch.size || 38, 900, spring(t - ch.at, 'bouncy')); };
  const tagsOf = (g, S, t, th) => { for (const nt of S.tags || []) if (t >= nt.at && (!nt.out || t < nt.out)) chip(g, nt.text, 540, nt.y || 640, nt.tone || 'ink', th, nt.size || 38, 900, spring(t - nt.at, 'bouncy')); };
  const bundle = (g, x, y, w, h) => { clay(g, x, y, w, h, 8, '#1FA366', { shadowK: 0.4 }); g.fillStyle = 'rgba(245,243,238,.9)'; g.fillRect(x + w * 0.4, y + 2, w * 0.2, h - 4); txt(g, '$', x + w * 0.5, y + h * 0.54, F.hero(h * 0.5), '#0B0F14'); g.fillStyle = 'rgba(0,0,0,.15)'; g.fillRect(x, y + h - 5, w, 3); };
  // the million: a pyramid of 10 banded bundles (4-3-2-1) with its base at baseY
  function brick(g, cx, baseY, s, vis) {
    const w = 104 * s, h = 54 * s; let i = 0; for (let r = 0; r < 4; r++) { const n = 4 - r; for (let c = 0; c < n; c++, i++) { if (vis != null && i >= vis) continue; bundle(g, cx - n * w / 2 + c * w + 1, baseY - (r + 1) * h, w - 2, h - 2); } }
  }
  function car(g, x, y, s, k, col) { g.save(); g.translate(x, y); g.scale(s * k, s * k); g.fillStyle = col || '#2c3e66'; g.beginPath(); g.moveTo(-90, 0); g.lineTo(-86, -34); g.quadraticCurveTo(-60, -40, -44, -66); g.lineTo(34, -66); g.quadraticCurveTo(58, -42, 84, -34); g.lineTo(92, 0); g.closePath(); g.fill(); g.strokeStyle = '#0B0F14'; g.lineWidth = 4; g.stroke(); g.fillStyle = '#9ad7ff'; g.beginPath(); g.moveTo(-36, -58); g.lineTo(-24, -34); g.lineTo(-4, -34); g.lineTo(-4, -58); g.closePath(); g.moveTo(8, -58); g.lineTo(8, -34); g.lineTo(52, -34); g.lineTo(36, -58); g.closePath(); g.fill(); for (const wx of [-52, 52]) { g.fillStyle = '#0B0F14'; g.beginPath(); g.arc(wx, 4, 20, 0, 7); g.fill(); g.fillStyle = '#c9ccd2'; g.beginPath(); g.arc(wx, 4, 9, 0, 7); g.fill(); } g.restore(); }
  const sun = (g, x, y, r, t) => { g.save(); g.translate(x, y); g.rotate(t * 0.5); g.strokeStyle = '#F2B705'; g.lineWidth = 7; g.lineCap = 'round'; for (let i = 0; i < 10; i++) { const a = i / 10 * 6.2832; g.beginPath(); g.moveTo(Math.cos(a) * r * 1.3, Math.sin(a) * r * 1.3); g.lineTo(Math.cos(a) * r * 1.75, Math.sin(a) * r * 1.75); g.stroke(); } g.fillStyle = '#FFD60A'; g.beginPath(); g.arc(0, 0, r, 0, 7); g.fill(); g.strokeStyle = '#0B0F14'; g.lineWidth = 4; g.stroke(); g.restore(); };
  const dayAt = (t, p) => Math.max(0, xAt(t, p.K));
  const yrs = d => (d / 365).toFixed(1);
  // ---------- scenes ----------
  function piles(g, p, lt, t, th, S) {
    const cards = [[90, S.leftAt ?? -1, 0], [580, S.rightAt ?? -1, 1]];
    cards.forEach(([x0, at, i]) => { const st = at < 0, on = st ? 1 : t - at; if (on <= 0) return; const k = st ? 1 : Math.min(1.08, spring(on, 'bouncy')), picked = S.pick != null && t >= S.pick && i === 0, ps = picked ? 1 + 0.04 * Math.sin(Math.min(1, (t - S.pick) * 3) * 3.14) : 1, dim = S.dimLeft && i === 0 && t >= S.dimLeft;
      g.save(); g.translate(x0 + 205, 800 + (1 - Math.min(1, k)) * 60); g.scale((0.85 + 0.15 * k) * ps, (0.85 + 0.15 * k) * ps); g.globalAlpha *= st ? 1 : clamp(on / 0.07); if (dim) g.globalAlpha *= 0.55;
      paper(g, -205, -215, 410, 430, 22, { lift: 0.5 }); if (picked) { g.strokeStyle = th.accent; g.lineWidth = 9; rr(g, -205, -215, 410, 430, 22); g.stroke(); }
      if (i === 0) { g.save(); g.translate(0, 20); brick(g, 0, 80, 1.15); g.restore(); txt(g, '$1,000,000', 0, 120, F.hero(66), '#0B0F14'); txt(g, 'CASH · TODAY', 0, 176, F.monoX(22), '#59606B'); }
      else { sun(g, 120, -150, 24, t); g.save(); g.translate(-8, -30); g.rotate(-0.08 + 0.02 * Math.sin(t * 2)); bill(g, -125, -52, 250, 104, '$100'); g.restore(); txt(g, '$100 A DAY', 0, 112, F.hero(66), '#0B0F14'); txt(g, 'EVERY SINGLE DAY', 0, 176, F.monoX(22), '#59606B'); }
      g.restore(); });
    if (S.orAt != null && t >= S.orAt) { const k = Math.min(1.1, spring(t - S.orAt, 'bouncy')); g.save(); g.translate(540, 800); g.scale(k, k); g.fillStyle = '#0B0F14'; g.beginPath(); g.arc(0, 0, 46, 0, 7); g.fill(); g.strokeStyle = th.accent; g.lineWidth = 5; g.stroke(); txt(g, 'OR', 0, 3, F.hero(44), th.accent); g.restore(); }
    tagsOf(g, S, t, th); bottomChip(g, S, t, th);
  }
  function drip(g, p, lt, t, th, S) {
    const D = dayAt(t, p), n = Math.floor(D + 1e-6), f = D - n, k = pk(lt, 0);
    g.save(); g.translate(300, 830); g.scale(0.9 + 0.1 * Math.min(1, k), 0.9 + 0.1 * Math.min(1, k)); paper(g, -190, -200, 380, 400, 20, { lift: 0.5 }); g.fillStyle = th.bad; rr(g, -190, -200, 380, 84, 20); g.fill(); txt(g, 'EVERY MORNING', 0, -158, F.hero(40), th.paper); txt(g, 'DAY', 0, -88, F.monoX(26), '#59606B'); txt(g, fmt(n), 0, 38, F.hero(fit(fmt(n), F.hero, 330, 160)), '#0B0F14'); txt(g, '+$100', 0, 150, F.hero(54), '#1FA366'); g.restore();
    const layers = Math.min(26, n), top = 1040 - layers * 15; g.save(); for (let i = 0; i < layers; i++) { g.save(); g.translate(790 + ((i % 3) - 1) * 4, 1040 - i * 15); g.rotate(((i % 5) - 2) * 0.012); bill(g, -150, -26, 300, 40, ''); g.restore(); }
    if (n < 400) { const u = ease.in(clamp(f / 0.9)), y = lerp(Math.max(640, top - 200), top - 18, u); g.save(); g.globalAlpha *= clamp(f / 0.1); g.translate(790, y); g.rotate(-0.15 + 0.15 * u); bill(g, -150, -40, 300, 80, '$100'); g.restore(); } g.restore();
    stk(g, '$' + fmt(100 * n), 790, top - 70 < 640 ? 640 : top - 70, F.hero(64), th.good, 'center', 10);
    bottomChip(g, S, t, th);
  }
  function rent(g, p, lt, t, th, S) {
    const k = pk(lt, 0); g.save(); g.translate(540, 760); g.scale(0.85 + 0.15 * Math.min(1, k), 0.85 + 0.15 * Math.min(1, k));
    const v = Math.round(3042 * ease.out(clamp((t - S.numAt) / 0.9))); stk(g, t >= S.numAt - 0.1 ? '$' + fmt(v) : '$100 × 30', 0, 0, F.hero(fit('$3,042', F.hero, 700, 190)), th.good, 'center', 16); sub(g, '$100 A DAY · PER MONTH', 0, 112, th.paper, 26); g.restore();
    // house + basket
    const h0 = S.rentAt != null ? t - S.rentAt : -1; if (h0 > 0) { const kk = pk(t, S.rentAt); g.save(); g.translate(310, 960); g.scale(kk, kk); paper(g, -190, -90, 380, 190, 18, { lift: 0.4 }); g.save(); g.translate(-90, 6); g.fillStyle = '#E8590C'; g.beginPath(); g.moveTo(-60, -10); g.lineTo(0, -66); g.lineTo(60, -10); g.closePath(); g.fill(); g.strokeStyle = '#0B0F14'; g.lineWidth = 4; g.stroke(); g.fillStyle = '#F5E6C8'; g.fillRect(-46, -10, 92, 66); g.strokeRect(-46, -10, 92, 66); g.fillStyle = '#7a3b1d'; g.fillRect(-12, 14, 24, 42); g.restore(); txt(g, 'RENT', 70, -8, F.hero(60), '#0B0F14'); sub(g, 'PAID', 70, 40, '#59606B', 22); g.restore(); }
    const g0 = S.grocAt != null ? t - S.grocAt : -1; if (g0 > 0) { const kk = pk(t, S.grocAt); g.save(); g.translate(770, 960); g.scale(kk, kk); paper(g, -190, -90, 380, 190, 18, { lift: 0.4 }); g.save(); g.translate(-96, 10); g.fillStyle = '#D9A441'; g.beginPath(); g.moveTo(-54, -20); g.lineTo(54, -20); g.lineTo(42, 52); g.lineTo(-42, 52); g.closePath(); g.fill(); g.strokeStyle = '#0B0F14'; g.lineWidth = 4; g.stroke(); g.strokeStyle = '#0B0F14'; g.beginPath(); g.arc(0, -20, 34, 3.14, 0); g.stroke(); g.fillStyle = '#d9422f'; g.beginPath(); g.arc(-16, -30, 15, 0, 7); g.fill(); g.fillStyle = '#6dbf3a'; g.beginPath(); g.arc(18, -34, 14, 0, 7); g.fill(); g.restore(); txt(g, 'GROCERIES', 66, -8, F.hero(40), '#0B0F14'); sub(g, 'COVERED', 66, 40, '#59606B', 22); g.restore(); }
    bottomChip(g, S, t, th);
  }
  function year(g, p, lt, t, th, S) {
    const n = S.n || 1, u = ease.inOut(clamp((t - S.at) / (S.dur || 1.6))), tot = 36500 * n, v = Math.round(tot * u);
    sub(g, n === 1 ? 'ONE YEAR · 365 DAYS · $100 EACH' : 'TEN YEARS · 3,650 DAYS', 540, 622, th.paper, 26);
    if (n === 1) { const cols = 30, P = 19, x0 = 540 - cols * P / 2, y0 = 650; for (let i = 0; i < 365; i++) { const c = i % cols, r = Math.floor(i / cols), lit = i < 365 * u; g.fillStyle = lit ? '#1FA366' : 'rgba(245,243,238,.16)'; g.beginPath(); g.arc(x0 + (c + 0.5) * P, y0 + (r + 0.5) * P, lit ? 7 : 5, 0, 7); g.fill(); } }
    else { for (let i = 0; i < 10; i++) { const c = i % 5, r = Math.floor(i / 5), x = 100 + c * 180, y = 650 + r * 96, q = clamp(u * 10 - i); clay(g, x, y, 168, 82, 14, 'rgba(245,243,238,.14)', { shadowK: 0 }); if (q > 0) { g.save(); rr(g, x, y, 168, 82, 14); g.clip(); g.fillStyle = '#1FA366'; g.fillRect(x, y, 168 * q, 82); g.restore(); } txt(g, 'YEAR ' + (i + 1), x + 84, y + 41, F.hero(30), q > 0.5 ? '#0B0F14' : th.paper); } }
    stk(g, '$' + fmt(v), 540, n === 1 ? 960 : 910, F.hero(120), th.good, 'center', 14);
    // against the million
    const by = n === 1 ? 1016 : 1000, bw = 780, bx = 150; g.fillStyle = 'rgba(245,243,238,.16)'; rr(g, bx, by, bw, 28, 14); g.fill(); g.fillStyle = th.gold; rr(g, bx, by, Math.max(28, bw * tot / 1e6 * u), 28, 14); g.fill(); sub(g, '$1,000,000', bx + bw, by + 52, th.paper, 22, 'right'); sub(g, 'YOUR PILE', bx, by + 52, th.gold, 22, 'left');
    bottomChip(g, S, t, th);
  }
  function race(g, p, lt, t, th, S) {
    const D = dayAt(t, p), pile = 100 * D, max = Math.max(1e6, pile * 1.04), x0 = 90, W = 900, caught = S.catchAt != null && t >= S.catchAt, k = pk(lt, 0);
    const bar = (y, lab, val, col, txCol, str) => { sub(g, lab, x0, y - 30, th.paper, 24, 'left'); g.fillStyle = 'rgba(245,243,238,.12)'; rr(g, x0, y, W, 84, 20); g.fill(); const w = Math.max(16, W * val / max); clay(g, x0, y, w, 84, 20, col, { shadowK: 0.4 }); const inside = w > 440; txt(g, str, inside ? x0 + w - 22 : x0 + w + 20, y + 44, F.hero(60), inside ? '#0B0F14' : th.paper, inside ? 'right' : 'left'); };
    g.save(); g.globalAlpha *= clamp(k * 2); bar(722, 'OPTION A · THE MILLION', 1e6, th.gold, '#0B0F14', '$1,000,000'); bar(850, 'OPTION B · $100 A DAY', pile, caught ? th.good : '#1FA366', '#0B0F14', '$' + fmt(Math.round(pile))); g.restore();
    stk(g, 'DAY ' + fmt(Math.round(D)), 540, 985, F.hero(fit('DAY 20,000', F.hero, 560, 80)), caught ? th.good : th.paper, 'center', 12); sub(g, '= ' + yrs(D) + ' YEARS OF CHECKS', 540, 1036, th.paper, 24);
    if (caught) { const o = t - S.catchAt; for (let q = 0; q < 2; q++) { const u = ((o * 1.1 + q / 2) % 1); g.strokeStyle = 'rgba(0,210,106,' + (1 - u) * 0.9 + ')'; g.lineWidth = 6; rr(g, x0 - u * 14, 850 - u * 14, W + u * 28, 84 + u * 28, 20 + u * 10); g.stroke(); } if (o < 0.5) burst(g, x0 + W * 0.97 * (1e6 / max), 892, 220, th.good, o - 0.02, 14, 0.4); if (S.catchStamp !== false) { g.save(); g.translate(540, 626); stamp(g, 'CAUGHT UP · DAY 10,000', 0, 0, 'good', th, 50, -0.03, pk(t, S.catchAt)); g.restore(); } }
    tagsOf(g, S, t, th); bottomChip(g, S, t, th);
  }
  function years27(g, p, lt, t, th, S) {
    const u = ease.inOut(clamp((t - S.at) / (S.dur || 2))), n = 27.4 * u; sub(g, '10,000 DAYS ÷ 365 = 27.4 YEARS', 540, 628, th.paper, 28);
    for (let i = 0; i < 28; i++) { const c = i % 7, r = Math.floor(i / 7), x = 150 + c * 118, y = 640 + r * 72, q = clamp(n - i), part = i === 27; if (!part || q > 0 || true) { clay(g, x, y, 106, 60, 14, q > 0 ? (part ? th.good : '#E8590C') : 'rgba(245,243,238,.12)', { shadowK: q > 0 ? 0.4 : 0 }); if (part) { g.fillStyle = 'rgba(11,15,20,.55)'; rr(g, x + 106 * 0.4, y, 106 * 0.6, 60, 14); g.fill(); } txt(g, 'Y' + (i + 1), x + 53, y + 30, F.hero(34), q > 0 ? '#0B0F14' : 'rgba(245,243,238,.55)'); } }
    stk(g, n.toFixed(1) + ' YEARS', 540, 985, F.hero(80), th.accent, 'center', 12);
    bottomChip(g, S, t, th);
  }
  function blow(g, p, lt, t, th, S) {
    const u = clamp((t - S.at) / (S.dur || 1.2)), vis = Math.ceil(10 * (1 - u)), k = pk(lt, 0);
    g.save(); g.globalAlpha *= clamp(k * 2); g.save(); g.translate(0, 0); brick(g, 330, 960, 1.55, vis); g.restore();
    for (let i = 0; i < 10; i++) { const a = S.at + i * (S.dur || 1.2) / 10, o = t - a; if (o > 0 && o < 0.9) { const w = o / 0.9; g.save(); g.globalAlpha *= 1 - w; g.translate(330 + w * 520, 800 - Math.sin(w * 3.14) * 150 + w * 200); g.rotate(w * 5); bill(g, -60, -28, 120, 56, '$'); g.restore(); } }
    if (S.cars) { S.cars.forEach((c, i) => { const o = t - c; if (o <= 0) return; const kk = pk(t, c, 'snappy'); g.save(); g.translate(660 + (1 - Math.min(1, kk)) * 260 + (i % 2) * 60, 840 + i * 70); car(g, 0, 0, 0.8, 1, ['#d9422f', '#2c3e66', '#F2B705'][i % 3]); g.restore(); }); }
    g.restore(); stk(g, '$' + fmt(Math.round(1e6 * (1 - ease.inOut(u)))), 540, 650, F.hero(110), u > 0.98 ? th.bad : th.good, 'center', 14);
    bottomChip(g, S, t, th);
  }
  function life(g, p, lt, t, th, S) {
    const px = a => 110 + (a - 20) / 75 * 860, k = pk(lt, 0); g.save(); g.globalAlpha *= clamp(k * 2);
    sub(g, S.head || 'THE DAILY MONEY NEEDS 27.4 YEARS TO CATCH UP', 540, 612, th.gold, 24); sub(g, '◆ = WHERE YOUR PILE PASSES $1,000,000', 540, 640, th.paper, 18);
    g.strokeStyle = 'rgba(245,243,238,.55)'; g.lineWidth = 4; g.beginPath(); g.moveTo(px(20), 1008); g.lineTo(px(95), 1008); g.stroke(); for (const a of [25, 40, 60, 80]) { g.beginPath(); g.moveTo(px(a), 996); g.lineTo(px(a), 1020); g.stroke(); sub(g, 'AGE ' + a, px(a), 1046, a === 80 ? th.bad : th.paper, 22); }
    g.setLineDash([10, 10]); g.strokeStyle = th.bad; g.lineWidth = 4; g.beginPath(); g.moveTo(px(80), 664); g.lineTo(px(80), 1000); g.stroke(); g.setLineDash([]); sub(g, 'AGE 80', px(80), 660, th.bad, 20);
    (S.rows || []).forEach((r, i) => { const y = 706 + i * 100, st = r.at < 0, on = st ? 99 : t - r.at; if (on < -0.0001) return; const u = st ? 1 : ease.out(clamp(on / (r.dur || 1.3))), x0 = px(r.age), x1 = x0 + (px(80) - x0) * u, win = r.win, res = r.resAt != null ? t >= r.resAt : st;
      g.save(); g.globalAlpha *= st ? 1 : clamp(on / 0.1); clay(g, x0, y, Math.max(20, x1 - x0), 56, 16, res ? (win ? th.good : th.bad) : th.gold, { shadowK: 0.4 }); B.you(g, x0 - 34, y + 38, 0.2, res ? (win ? 'happy' : 'angry') : 'neutral', t);
      sub(g, 'AGE ' + r.age + ' → 80 · ' + (80 - r.age) + ' YEARS', x0, y - 18, th.paper, 22, 'left'); if (res) { g.save(); const kk = st ? 1 : pk(t, r.resAt); g.translate(990, y - 18); g.scale(kk, kk); txt(g, win ? 'WINS' : 'LOSES', 0, 0, F.monoX(22), win ? th.good : th.bad, 'right'); g.restore(); }
      const cx = px(r.age + 27.4); g.save(); g.translate(cx, y + 28); g.rotate(0.785); if (x1 >= cx || r.age + 27.4 > 80) { g.fillStyle = r.age + 27.4 > 80 ? 'rgba(11,15,20,.0)' : '#0B0F14'; g.strokeStyle = r.age + 27.4 > 80 ? th.bad : th.gold; g.lineWidth = 4; g.fillRect(-11, -11, 22, 22); g.strokeRect(-11, -11, 22, 22); } g.restore(); 
      const v = Math.round(r.total * ease.out(clamp((t - (r.numAt ?? r.at)) / 0.9))); if (x1 - x0 > 190) txt(g, '$' + fmt(st ? r.total : v), x0 + 20, y + 30, F.hero(42), '#0B0F14', 'left'); g.restore(); });
    g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th);
  }
  function vs(g, p, lt, t, th, S) {
    const base = 985, MH = 320, mx = S.max || 2.2e6, k = pk(lt, 0); const mil = 1e6;
    S.items.forEach((it, i) => { const x = i ? 770 : 310, on = t - it.at; if (on <= 0) return; const kk = Math.min(1.08, spring(on, 'bouncy')), u = ease.out(clamp(on / 0.9)), h = MH * it.val / mx * u, v = Math.round(it.val * u);
      g.save(); g.globalAlpha *= clamp(on / 0.08); clay(g, x - 130, base - Math.max(16, h), 260, Math.max(16, h), 16, it.col, { shadowK: 0.5 }); g.restore(); stk(g, '$' + fmt(v), x, base - Math.max(16, h) - 46, F.hero(fit('$2,007,500', F.hero, 330, 78)), it.col === th.bad ? th.bad : th.paper, 'center', 10); txt(g, it.label, x, base + 36, F.hero(34), th.paper); sub(g, it.sub, x, base + 68, th.gold, 20); });
    g.setLineDash([12, 10]); g.strokeStyle = th.paper; g.lineWidth = 4; g.beginPath(); g.moveTo(130, base - MH * mil / mx); g.lineTo(950, base - MH * mil / mx); g.stroke(); g.setLineDash([]);
    g.strokeStyle = 'rgba(245,243,238,.6)'; g.lineWidth = 4; g.beginPath(); g.moveTo(130, base); g.lineTo(950, base); g.stroke();
    if (S.gap && t >= S.gap.at) { const kk = pk(t, S.gap.at); g.save(); g.translate(540, 614); g.scale(kk, kk); stamp(g, S.gap.text, 0, 0, S.gap.tone || 'bad', th, 42, -0.03, kk); g.restore(); }
    tagsOf(g, S, t, th); bottomChip(g, { ...S, chips: (S.chips || []).map(c => ({ ...c, y: 1088 })) }, t, th);
  }
  function ask(g, p, lt, t, th, S) {
    const k = spring(lt, 'bouncy'); g.save(); g.translate(540, 800); g.scale(0.7 + 0.3 * Math.min(1.06, k), 0.7 + 0.3 * Math.min(1.06, k)); g.globalAlpha *= clamp(k * 2);
    const sz = Math.min(fit(S.l1, F.hero, 900, 112), fit(S.l2, F.hero, 900, 112)); stk(g, S.l1, 0, -62, F.hero(sz), th.accent, 'center', 16); stk(g, S.l2, 0, 62, F.hero(sz), th.good, 'center', 16); g.restore();
  }
  const SC = { piles, drip, rent, year, race, years27, blow, life, vs, ask };
  Object.assign(window.M5.h, { fit, stk, chip, stamp, label, mw, TONE });
  const val = (v, t, p) => { if (typeof v === 'string') { if (v === '~pile') return '$' + fmt(Math.round(100 * dayAt(t, p))); if (v === '~dayl') return 'THE PILE · DAY ' + fmt(Math.round(dayAt(t, p))); return v; } if (v && typeof v === 'object') { const u = ease.out(clamp((t - v.at) / (v.dur || 1))), x = lerp(v.from || 0, v.to, u); return (v.pre || '') + fmt(Math.round(x)) + (v.suf || ''); } return v; };
  B.register('mstage', {
    defaults: { K: [[0, 0]], C: [], scenes: [], hook: null, hideCounter: [], beats: [], notes: [] }, ownEnter: true, size: () => [1080, 1920],
    draw(g, p, env) {
      const { t, theme: th } = env; g.translate(-540, -960);
      let bl = ''; for (const b of p.beats) if (t >= b[0]) bl = b[1]; if (bl) { const k = spring(t - (p.beats.find(b => b[1] === bl)[0]), 'snappy'); g.save(); g.globalAlpha *= clamp(k * 2); label(g, bl, 990, 264, th.accent, 26, 'right'); g.restore(); }
      let seg = p.C[0]; for (const s of p.C) if (t >= s.from) seg = s; const hid = p.hideCounter.some(([a, b]) => t >= a && t < b), segT = t - seg.from, pop = 1 + 0.05 * hit(Math.min(0.5, Math.max(0, segT)), 8);
      if (!hid) {
        g.save(); g.translate(540, 437); g.scale(pop, pop); g.translate(-540, -437); paper(g, 70, 322, 940, 230, 26, { lift: 0.3 });
        const L = [val(seg.L[0], t, p), val(seg.L[1], t, p)], R = [val(seg.R[0], t, p), val(seg.R[1], t, p)]; g.fillStyle = 'rgba(11,15,20,.14)'; rr(g, 98, 344, 884, 22, 11); g.fill();
        const fr = seg.bar === 'pile' ? clamp(100 * dayAt(t, p) / 1e6) : seg.bar === 'fall' ? 0 : 0; if (fr > 0.003) { g.fillStyle = fr >= 1 ? th.good : th.gold; rr(g, 98, 344, Math.max(22, fr * 884), 22, 11); g.fill(); }
        label(g, L[0], 100, 398, th.inkSoft, 26, 'left'); label(g, R[0], 980, 398, th.inkSoft, 26, 'right');
        const sL = fit(L[1], F.hero, 430, 118, 40), sR = fit(R[1], F.hero, 430, 118, 40), cc = c => c === 'bad' ? th.bad : c === 'good' ? '#0E9F55' : c === 'gold' ? '#B88700' : th.ink;
        txt(g, L[1], 100, 484, F.hero(sL), cc(seg.Lc), 'left'); txt(g, R[1], 980, 484, F.hero(sR), cc(seg.Rc), 'right');
        g.restore();
      }
      hookText(g, p, t, th);
      for (const S of p.scenes) {
        if (t < S.from - 0.02 || t > S.to + 0.02) continue; const lt = t - S.from, kin = spring(lt + 0.08, { f: 2.4, z: 0.7 }), a = clamp(lt / 0.12) * (1 - lin(t, S.to - 0.12, S.to)), sc = (S.pop === false ? 1 : 0.94 + 0.06 * Math.min(1.05, kin)) * (S.sc || 1);
        g.save(); g.globalAlpha *= a; g.translate(540, 840 + (S.dy || 0)); g.scale(sc, sc); g.translate(-540, -840);
        const fn = SC[S.type]; if (!fn) throw new Error('unknown scene type ' + S.type); fn(g, p, lt, t, th, S);
        g.restore();
      }
      for (const n of p.notes) if (t >= n.at && t < n.out + 0.2) { const nt = t - n.at, k = Math.min(1.08, spring(nt, 'bouncy')), fo = 1 - lin(t, n.out - 0.15, n.out + 0.05); g.save(); g.globalAlpha *= clamp(nt / 0.06) * fo; chip(g, n.text, 540, n.y || 598, n.tone || 'bad', th, n.size || 44, 900, k); g.restore(); }
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
  window.M5.make = function (c0) {
    const B = window.BM2, T = B.makeT((window.BM2_VOICE || {}).words || []), c = B.deepT(c0, T);
    const els = [], extra = c.sfx2 || [], auto = [];
    const A = (at, name, gain = -9, dur = 0.5) => { if (at != null && at >= 0) auto.push({ at, name, gain, dur }); };
    c.scenes.forEach((sc, i) => { if (i > 0) A(sc.from, i % 2 ? 'whoosh_1' : 'whoosh_2', -11, 0.6);
      switch (sc.type) {
        case 'piles': A(sc.leftAt, 'pop_2'); A(sc.rightAt, 'pop_1'); A(sc.orAt, 'pop_1', -10, 0.4); A(sc.pick, 'success_chime_1', -12, 0.9); (sc.tags || []).forEach(tg => A(tg.at, 'pop_1', -10, 0.4)); break;
        case 'drip': for (let k = 0; k < 8; k++) A(sc.from + 0.2 + k * 0.28, 'cash_rustle_1', -16, 0.3); break;
        case 'rent': A(sc.numAt, 'money_counter_2', -12, 1.1); A(sc.rentAt, 'pop_2'); A(sc.grocAt, 'pop_1'); break;
        case 'year': A(sc.at, 'money_counter_2', -12, sc.dur || 1.6); A(sc.at + (sc.dur || 1.6), 'success_chime_1', -11, 0.9); break;
        case 'race': A(sc.from, 'riser_1', -16, 1.6); if (sc.catchAt != null) { A(sc.catchAt, 'deep_boom_1', -5, 1.4); A(sc.catchAt, 'cinematic_hit_1', -8, 1.2); A(sc.catchAt + 0.2, 'rubber_stamp_1', -8, 0.5); } break;
        case 'years27': A(sc.at, 'clock_ticking_1', -14, sc.dur || 2); A(sc.at + (sc.dur || 2), 'ding_2', -9, 0.6); break;
        case 'blow': A(sc.at, 'cash_rustle_1', -12, sc.dur || 1.2); A(sc.at + (sc.dur || 1.2), 'sad_trombone_1', -12, 1.2); (sc.cars || []).forEach(cr => A(cr, 'car_stop_1', -12, 0.6)); break;
        case 'life': (sc.rows || []).forEach(r => { if (r.at >= 0) { A(r.at, 'swipe_1', -12, 0.4); A(r.numAt ?? r.at, 'money_counter_1', -14, 0.9); } if (r.resAt != null && r.at >= 0) A(r.resAt, r.win ? 'success_chime_1' : 'wrong_buzzer_1', r.win ? -10 : -12, 0.9); }); (sc.tags || []).forEach(tg => A(tg.at, 'pop_1', -10, 0.4)); break;
        case 'vs': sc.items.forEach(it => A(it.at, 'pop_2')); if (sc.gap) A(sc.gap.at, 'rubber_stamp_1', -7, 0.5); break;
        case 'ask': A(sc.from, 'pop_1'); break;
      } (sc.chips || []).forEach(ch => A(ch.at, 'pop_1', -11, 0.4)); });
    els.push({ id: 'stage', type: 'mstage', layer: 'screen', at: [540, 960], in: -1, z: 10, props: { K: c.K, C: c.C, scenes: c.scenes, hook: c.hook, hideCounter: c.hideCounter || [], beats: c.labels, notes: c.notes || [] } });
    els.push({ id: 'you', type: 'you', layer: 'screen', at: [150, 1213], scale: 0.82, in: -1, z: 20, props: { keys: c.you } });
    els.push({ id: 'hypo', type: 'hypo', layer: 'screen', at: [545, 1316], in: 0.2, z: 20, props: { text: 'HYPOTHETICAL · NO TAX · NO INTEREST' } });
    if (c.cta.like) els.push({ id: 'heart', type: 'heart', layer: 'screen', at: [520, 1205], in: c.cta.like, z: 30, props: { s: 1, dur: 1.0 } });
    if (c.cta.send) els.push({ id: 'plane', type: 'plane', layer: 'screen', at: [0, 0], in: c.cta.send, z: 30, props: { from: [330, 1275], to: [760, 1160], dur: 1.2, s: 0.7 }, out: c.cta.send + 1.5 });
    if (c.cta.follow) els.push({ id: 'follow', type: 'follow', layer: 'screen', at: [520, 1215], in: c.cta.follow, out: c.cta.followOut, z: 30, props: { press: 0.75 } });
    if (c.cta.bubble) els.push({ id: 'bubble', type: 'bubble', layer: 'screen', at: [520, 1205], in: c.cta.bubble.at, z: 30, props: { l1: c.cta.bubble.l1, l2: c.cta.bubble.l2, size: 40, tail: 'left' } });
    const beats = c.scenes.map((s, i) => ({ at: s.from, beat: 'wide', focus: { x: 540 + DX[i % DX.length], y: 740 + (i % 2 ? 90 : -60), w: 1080, h: 300 }, fill: 1, dur: 0.8, st: ST, pose: s.pose || 'talk' }));
    beats.unshift({ at: 0, beat: 'wide', focus: { x: 540, y: 740, w: 1080, h: 300 }, fill: 1, st: ST, pose: 'shock' });
    return {
      series: 'whatif', title: 'A MILLION OR $100 A DAY', duration: c.dur,
      footnote: ['ASSUMES: $100 EVERY DAY (365 DAYS) · NO TAX · NO INTEREST · NO INFLATION · AGES ARE EXAMPLES', 'HYPOTHETICAL · OUR MATH · NOT FINANCIAL ADVICE'],
      elements: els, beats, poses: [...(c.cta.follow ? [[c.cta.follow, 'follow', { target: [520, 1215] }]] : []), ...(c.poses || [])], shakes: c.shakes, captions: c.captions, bed: c.bed || { name: 'funk_bed_1', gain: -1 }, sfx: [...auto, ...extra],
    };
  };
})();
// IG cut — WHAT IF: "A hundred bucks a day beats a million. Unless you're old as hell." Hook = bars: the million vs the 55-year daily pile ($2,007,500). Order: bars · piles · rules · instinct · rent · year 1 · day 10,000 · 27 yrs · friend + cars · 25 · double · 40 · follow · 60 · verdict · 27 yrs · ask
const th0 = k => ({ gold: '#FFD60A', good: '#00D26A', bad: '#FF3B30' })[k];
const H = { until: '@the#1-0.1', y: 668, size: 64, lines: [[['$100 A DAY', 'good']], [['BEATS A MILLION', 'paper']], [['UNLESS YOU’RE OLD', 'bad']]] };
const S = M5.make({
  dur: 71.33,
  K: [[0, 0], ['@year#1-0.1', 0], ['@dollars#4', 365], ['@then#1', 365], ['@thousand#3+0.05', 10000], [99, 10000]],
  C: [
    { from: 0, L: ['THE MILLION', '$1,000,000'], R: ['$100/DAY · 55 YEARS', { from: 0, to: 2007500, at: 0.8, dur: 1.4, pre: '$' }], Lc: 'gold', Rc: 'good' },
    { from: '@the#1-0.1', L: ['THE MILLION', '$1,000,000'], R: ['OR, EVERY DAY', '$100'], Lc: 'gold', Rc: 'good' },
    { from: '@but#1-0.1', L: ['A DAY', '$100'], R: ['A MONTH, ABOUT', { from: 0, to: 3042, at: '@three', dur: 0.9, pre: '$' }], Rc: 'good' },
    { from: '@year#1-0.1', L: ['THE MILLION', '$1,000,000'], R: ['~dayl', '~pile'], bar: 'pile', Lc: 'gold', Rc: 'good' },
    { from: '@send-0.1', L: ['THE MILLION', { from: 1000000, to: 0, at: '@spend', dur: 1.1, pre: '$' }], R: ['BY FRIDAY', '$0'], Lc: 'bad', Rc: 'bad' },
    { from: '@start#1-0.1', L: ['YOU START AT', 'AGE 25'], R: ['BY AGE 80, YOU GET', { from: 0, to: 2007500, at: '@collect', dur: 1.2, pre: '$' }], Rc: 'good' },
    { from: '@start#2-0.1', L: ['YOU START AT', 'AGE 40'], R: ['BY AGE 80, YOU GET', { from: 0, to: 1460000, at: '@forty', dur: 1.2, pre: '$' }], Rc: 'good' },
    { from: '@but#2-0.1', L: ['YOU START AT', 'AGE 60'], R: ['BY AGE 80, YOU GET', { from: 0, to: 730000, at: '@seven#2', dur: 1.2, pre: '$' }], Rc: 'bad' },
    { from: '@the#8-0.1', L: ['THE MILLION', '$1,000,000'], R: ['$100 A DAY · AGE 60', '$730,000'], Lc: 'good', Rc: 'bad' },
    { from: '@so#2-0.1', L: ['THE MILLION', '$1,000,000'], R: ['DAILY CASH WINS AFTER', '27.4 YEARS'], Lc: 'gold', Rc: 'good' },
  ],
  hook: H,
  scenes: [
    { type: 'vs', from: 0, to: '@the#1-0.1', pose: 'shock', sc: 0.62, dy: 70, max: 2.2e6, items: [{ label: 'THE MILLION', sub: 'CASH TODAY', val: 1e6, col: th0('gold'), at: 0.3 }, { label: '$100 A DAY', sub: 'AGE 25 → 80', val: 2007500, col: th0('good'), at: 0.8 }] },
    { type: 'piles', from: '@the#1-0.1', to: '@or-0.1', pose: 'talk', leftAt: '@a#4', chips: [{ at: '@cash', text: 'A MILLION · CASH · TODAY', tone: 'ink' }] },
    { type: 'piles', from: '@or-0.1', to: '@no#1-0.1', pose: 'shock', leftAt: -1, rightAt: '@a#5', orAt: '@or', chips: [{ at: '@every#1', text: '$100 · EVERY SINGLE DAY', tone: 'good' }, { at: '@until', text: 'UNTIL YOU DIE', tone: 'bad' }] },
    { type: 'piles', from: '@no#1-0.1', to: '@and#1-0.1', pose: 'chin', leftAt: -1, rightAt: -1, tags: [{ at: '@taxes', text: 'NO TAXES', tone: 'bad', y: 618 }, { at: '@interest', text: 'NO INTEREST', tone: 'bad', y: 618 }, { at: '@bullshit', text: 'NO BS', tone: 'bad', y: 618 }] },
    { type: 'piles', from: '@and#1-0.1', to: '@double-0.1', pose: 'you', leftAt: -1, rightAt: -1, pick: '@give', chips: [{ at: '@instinct', text: 'FIRST INSTINCT: GIVE ME THE MILLION', tone: 'accent', size: 34 }] },
    { type: 'ask', from: '@double-0.1', to: '@but#1-0.1', pose: 'you', l1: 'SNATCH THE MILLION', l2: 'IN HALF A SECOND?' },
    { type: 'rent', from: '@but#1-0.1', to: '@after#1-0.1', pose: 'shock', numAt: '@three', rentAt: '@rent', grocAt: '@forever', chips: [{ at: '@without', text: 'WITHOUT LIFTING A FINGER', tone: 'good' }] },
    { type: 'year', from: '@after#1-0.1', to: '@then#1-0.1', pose: 'shock', n: 1, at: '@year#1', dur: 1.6, chips: [{ at: '@dollars#4', text: 'ONE YEAR · $36,500', tone: 'good' }] },
    { type: 'race', from: '@then#1-0.1', to: "@that's#3-0.1", pose: 'shock', catchAt: '@thousand#3+0.05' },
    { type: 'years27', from: "@that's#3-0.1", to: '@send-0.1', pose: 'chin', at: "@that's#3", dur: 1.8, chips: [{ at: '@years#2', text: 'ABOUT 27 YEARS', tone: 'accent' }, { at: '@age#1', text: 'NOW IT’S ALL ABOUT YOUR AGE', tone: 'bad', size: 34 }] },
    { type: 'blow', from: '@send-0.1', to: '@start#1-0.1', pose: 'you', at: '@spend', dur: 1.1, cars: ['@cars', '@friday'], chips: [{ at: '@friend', text: 'THE FRIEND WITH THE NEW CARS', tone: 'bad' }] },
    { type: 'life', from: '@start#1-0.1', to: "@that's#4-0.1", pose: 'shock', rows: [{ age: 25, at: '@start#1', dur: 1.5, total: 2007500, numAt: '@collect', win: true, resAt: '@million#6' }] },
    { type: 'vs', from: "@that's#4-0.1", to: '@start#2-0.1', pose: 'shock', max: 2.2e6, items: [{ label: 'THE MILLION', sub: 'CASH TODAY', val: 1e6, col: th0('gold'), at: "@that's#4" }, { label: '$100 A DAY', sub: 'AGE 25 → 80', val: 2007500, col: th0('good'), at: '@double#2' }], chips: [{ at: '@waking', text: 'DOUBLE · JUST FOR WAKING UP', tone: 'good' }] },
    { type: 'life', from: '@start#2-0.1', to: '@follow-0.1', pose: 'chin', rows: [{ age: 25, at: -1, total: 2007500, win: true, resAt: 0 }, { age: 40, at: '@start#2', dur: 1.4, total: 1460000, numAt: '@forty', win: true, resAt: '@win#1' }] },
    { type: 'ask', from: '@follow-0.1', to: '@but#2-0.1', pose: 'you', l1: 'THE PART', l2: 'THAT STINGS' },
    { type: 'life', from: '@but#2-0.1', to: '@the#8-0.1', pose: 'shock', rows: [{ age: 25, at: -1, total: 2007500, win: true, resAt: 0 }, { age: 40, at: -1, total: 1460000, win: true, resAt: 0 }, { age: 60, at: '@start#3', dur: 1.4, total: 730000, numAt: '@seven#2', win: false, resAt: '@thousand#4' }] },
    { type: 'vs', from: '@the#8-0.1', to: '@so#2-0.1', pose: 'shock', max: 1.45e6, items: [{ label: 'THE MILLION', sub: 'CASH TODAY', val: 1e6, col: th0('gold'), at: '@million#7' }, { label: '$100 A DAY', sub: 'AGE 60 → 80', val: 730000, col: th0('bad'), at: '@the#8' }], gap: { at: '@seventy#1', text: 'MILLION WINS BY $270,000', tone: 'bad' } },
    { type: 'years27', from: '@so#2-0.1', to: '@million#8-0.1', pose: 'chin', at: '@twenty#3-0.3', dur: 1.6, chips: [{ at: '@brutal', text: 'BRUTAL, RIGHT?', tone: 'bad' }] },
    { type: 'ask', from: '@million#8-0.1', to: 99, pose: 'you', l1: 'MILLION OR', l2: '$100 A DAY?' },
  ],
  hideCounter: [['@million#8-0.1', 99]],
  labels: [[0, 'THE TWIST'], ['@the#1-0.1', 'THE TWO PILES'], ['@but#1-0.1', 'THE DAILY CASH'], ['@then#1-0.1', 'THE CATCH-UP'], ['@send-0.1', 'THE TRAP'], ['@start#1-0.1', 'YOUR AGE'], ['@but#2-0.1', 'AGE 60'], ['@the#8-0.1', 'THE VERDICT']],
  notes: [],
  you: [{ at: 0, mood: 'smirk', text: 'YOU: A MILLION?' }, { at: '@a#4', mood: 'neutral', text: 'THE CHOICE' }, { at: '@or', mood: 'worried', text: 'OR $100 A DAY?' }, { at: '@give', mood: 'smirk', text: 'GIVE ME THE MILLION' }, { at: '@three', mood: 'wow', text: '$3,000 A MONTH' }, { at: '@dollars#4', mood: 'happy', text: 'YEAR 1: $36,500' }, { at: '@thousand#3', mood: 'wow', text: 'DAY 10,000!' }, { at: '@send', mood: 'smirk', text: 'FRIEND + CARS' }, { at: '@start#1', mood: 'neutral', text: 'YOU: AGE 25' }, { at: '@collect', mood: 'happy', text: '~$2 MILLION' }, { at: '@start#2', mood: 'neutral', text: 'YOU: AGE 40' }, { at: '@win#1', mood: 'happy', text: 'STILL WIN' }, { at: '@but#2', mood: 'worried', text: 'YOU: AGE 60' }, { at: '@seven#2', mood: 'angry', text: '$730,000' }, { at: '@the#8', mood: 'angry', text: 'MILLION WINS' }, { at: '@so#2', mood: 'neutral', text: '27.4 YEARS' }, { at: '@million#8', mood: 'smirk', text: 'YOUR CALL' }],
  cta: { like: '@tap-0.1', send: '@send', follow: '@follow+0.05', followOut: '@follow+1.9', bubble: { at: '@one#2', l1: 'MILLION OR $100/DAY?', l2: 'COMMENT BELOW' } },
  poses: [['@tap', 'you'], ['@send', 'you']],
  shakes: [[0.1, 8], ['@thousand#3+0.05', 12], ['@seventy#1', 10]],
  captions: { gap: 16, emph: { 'million': 'good', 'million.': 'good', 'million?': 'good', 'hell.': 'bad', 'day': 'accent', 'rent': 'accent', 'forever.': 'good', 'age.': 'accent', 'stings.': 'bad', 'brutal,': 'bad', 'wins': 'bad' }, fix: [] },
  sfx2: [
    { at: 0.04, name: 'deep_boom_2', gain: -4, dur: 0.36 },
    { at: '@tap', name: 'pop_2', gain: -9, dur: 0.3 }, { at: '@send-0.05', name: 'swoosh_1', gain: -9, dur: 0.9 },
    { at: '@follow+0.05', name: 'pop_1', gain: -9, dur: 0.5 }, { at: '@follow+0.8', name: 'click_1', gain: -8, dur: 0.3 }, { at: '@follow+0.9', name: 'success_chime_1', gain: -12, dur: 1.2 }, { at: '@one#2', name: 'pop_1', gain: -9, dur: 0.5 },
  ],
});
BM2.scene(S);
