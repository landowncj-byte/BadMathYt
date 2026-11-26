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
    // the penny in his hand
    g.save(); g.translate(104, 150); g.rotate(-0.28); g.fillStyle = SK; g.beginPath(); g.arc(0, 52, 24, 0, 7); g.fill(); stroke(g, 4); g.fillStyle = '#1FA366'; rr(g, -62, -34, 124, 78, 10); g.fill(); stroke(g, 4.5); g.fillStyle = '#F2B705'; g.fillRect(-62, -14, 124, 14); g.fillStyle = '#F5F3EE'; g.fillRect(-48, 12, 60, 8); txt(g, 'GIFT', 18, -22, F.hero(18), INK); g.restore();
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
// ===== million-vs-billion v5 — ONE clean idea at a time. Full-screen stage ('mstage') drawn in screen space (camera can never crop it).
// Layout (1080x1920): pill y238-290 | counter card y322-552 | scene zone y590-1085 | row y1100-1335 (YOU left, chip middle, storyteller right) | captions y~1432.
// Math (beats-v3.md): $1,000,000 / $1,000 per day = 1,000 days = 2.74 yrs; $1B = 1,000,000 days = 2,737.85 yrs; 2026 - 2738 ~ 712 BC;
// 1,000,000 s = 11.57 days; 1,000,000,000 s = 31.69 yrs. Everything below is computed in code from those definitions.
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, burst, hash, hit } = B;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const fmt = (v, d = 0) => B.fmtNum(v, d, true);
  window.MV5 = { h: {} };
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

  // ---------- scene painters (absolute screen coordinates; lt = scene-local time) ----------
  function hookText(g, p, t, th) {
    const H = p.hook; if (!H || t > H.until + 0.35) return; const T = TONE(th), k = Math.min(1.06, 0.88 + 0.12 * Math.min(1.1, spring(t + 0.12, { f: 2.6, z: 0.5 }))), fade = 1 - lin(t, H.until, H.until + 0.3);
    let size = H.size; for (const ln of H.lines) { const s = ln.map(x => x[0]).join(''); size = fit(s, F.hero, 920, size, 40); }
    g.save(); g.globalAlpha *= fade; g.translate(540, H.y); g.scale(k, k);
    const lh = size * 1.1; H.lines.forEach((ln, i) => { const s = ln.map(x => x[0]).join(''); let x = -mw(s, F.hero(size)) / 2; const y = (i - (H.lines.length - 1) / 2) * lh; for (const [w, tn] of ln) { const ww = mw(w, F.hero(size)); stk(g, w, x + ww / 2, y, F.hero(size), T[tn] || th.paper, 'center', 16); x += ww; } });
    g.restore();
  }
  function cards2(g, p, lt, t, th, S) {
    (S.cards || []).forEach(c => {
      const on = t - c.at; if (on <= 0) return; const k = Math.min(1.08, spring(on, 'bouncy'));
      g.save(); g.translate(540, c.y + (1 - Math.min(1, k)) * 60); g.scale(0.85 + 0.15 * k, 0.85 + 0.15 * k); g.globalAlpha *= clamp(on / 0.07);
      gift(g, c.w, 98, c.col, c.amount, th, 58); g.restore(); if (on < 0.5) burst(g, 540, c.y, 260, c.col, on - 0.04, 10, 0.4);
    });
  }
  function gcard(g, p, lt, t, th, S, x) {
    const k = Math.min(1.08, spring(lt, 'bouncy')), bal = Math.max(0, S.cap - 1000 * x), cx = 540, cy = 826;
    g.save(); g.translate(cx, cy); g.scale(0.78 + 0.22 * k, 0.78 + 0.22 * k);
    const empty = bal <= 0;
    gift(g, 880, 400, S.col, '$' + fmt(Math.round(bal)), th, 150, empty ? 'EMPTY' : 'BALANCE');
    // the daily spend tag
    const fl = (t * 2.6) % 1; g.save(); g.globalAlpha *= (1 - fl) * (empty ? 0 : 1); stk(g, '-$1,000', 300, -178 - fl * 40, F.hero(54), th.bad, 'center', 10); g.restore();
    g.restore();
    chip(g, 'SPEND $1,000 EVERY DAY', 540, 1058, empty ? 'bad' : 'ink', th, 36, 900, k);
  }
  function pile(g, p, lt, t, th, S, x) {
    const N = 1000, rem = Math.max(0, Math.round(N - x)), cols = 50, pw = 18, ph = 15, x0 = 90, y0 = 650;
    for (let i = 0; i < N; i++) { const cx = x0 + (i % cols) * pw, cy = y0 + Math.floor(i / cols) * ph; const alive = i < rem; if (!alive) { g.fillStyle = 'rgba(245,243,238,.07)'; g.fillRect(cx + 1, cy + 1, pw - 2, ph - 2); continue; } const last = i === rem - 1 || (rem - i) < 6 && x > 1; blk(g, cx + 1, cy + 1, pw - 2, ph - 2, last ? '#E5534B' : '#1FA366', last ? '#ff9a93' : '#7fe0b0'); }
    label(g, 'EACH BLOCK = $1,000 = ONE DAY', 540, 978, 'rgba(245,243,238,.85)', 26);
    const bal = '$' + fmt(rem * 1000) + ' LEFT'; chip(g, bal, 540, 1040, rem === 0 ? 'bad' : 'ink', th, 40, 900);
    if (rem === 0) { stamp(g, 'BROKE', 540, 790, 'bad', th, 130, -0.05, spring(t - S.zeroAt, 'bouncy')); }
  }
  function vs(g, p, lt, t, th, S) {
    const rows = [S.a, S.b], max = S.max || 4.6, W = 900;
    rows.forEach((r, i) => {
      const on = t - r.at; if (on <= 0) return; const k = ease.out(clamp(on / 0.9)), y = 730 + i * 215;
      g.save(); g.globalAlpha *= clamp(on / 0.15);
      label(g, r.label, 90, y - 8, 'rgba(245,243,238,.9)', 28, 'left'); stk(g, r.text, 990, y - 6, F.hero(fit(r.text, F.hero, 440, 56)), i === 0 ? th.bad : th.accent, 'right', 10);
      g.fillStyle = 'rgba(245,243,238,.14)'; rr(g, 90, y + 30, W, 74, 37); g.fill();
      g.save(); rr(g, 90, y + 30, W, 74, 37); g.clip(); clay(g, 90, y + 30, Math.max(74, W * (r.yrs / max) * k), 74, 37, i === 0 ? th.bad : th.accent, { shadowK: 0.3 }); g.restore(); g.restore();
    });
    if (S.chip && t >= S.chip.at) chip(g, S.chip.text, 540, 1060, 'good', th, 40, 900, spring(t - S.chip.at, 'bouncy'));
  }
  function list(g, p, lt, t, th, S) {
    (S.items || []).forEach((c, i) => { const on = t - c.at; if (on <= 0) return; const k = Math.min(1.08, spring(on, 'bouncy')), y = 690 + i * 118;
      g.save(); g.translate(540, y + (1 - Math.min(1, k)) * 40); g.scale(0.85 + 0.15 * k, 0.85 + 0.15 * k); g.globalAlpha *= clamp(on / 0.07);
      clay(g, -450, -48, 900, 96, 48, c.col, { shadowK: 0.6 }); txt(g, c.text, 0, 3, F.hero(fit(c.text, F.hero, 820, 62)), c.ink || '#0B0F14'); g.restore(); });
  }
  function bignum(g, p, lt, t, th, S) {
    const u = ease.out(clamp((t - S.at) / S.dur)), v = Math.round(S.num * u), s = fmt(v), k = Math.min(1.08, spring(lt, 'bouncy'));
    g.save(); g.translate(540, 780); g.scale(0.85 + 0.15 * k, 0.85 + 0.15 * k); stk(g, s, 0, 0, F.hero(fit(fmt(S.num), F.hero, 860, 260)), th.accent, 'center', 18); g.restore();
    stk(g, S.l1, 540, 930, F.hero(fit(S.l1, F.hero, 860, 100)), th.paper, 'center', 12);
    if (S.chip && t >= S.chip.at) chip(g, S.chip.text, 540, 1040, 'accent', th, 42, 900, spring(t - S.chip.at, 'bouncy'));
  }
  function tline(g, p, lt, t, th, S, x) {
    const yb = x / YR, v = 2026 - yb, mx = vv => 90 + (vv + 800) / 2826 * 900, ay = 905, fade = clamp(lt / 0.2);
    g.fillStyle = 'rgba(245,243,238,.75)'; g.fillRect(90, ay, 900, 6);
    [[0, '1 AD'], [1000, '1000 AD']].forEach(([vv, l]) => { g.fillStyle = 'rgba(245,243,238,.75)'; g.fillRect(mx(vv) - 2, ay - 12, 4, 30); label(g, l, mx(vv), ay + 44, 'rgba(245,243,238,.85)', 24); });
    g.fillStyle = th.paper; g.fillRect(mx(2026) - 2, ay - 16, 4, 38); label(g, 'TODAY', 990, ay + 44, th.paper, 24, 'right');
    // travelled path
    const mxp = mx(v); g.fillStyle = th.accent; rr(g, mxp, ay - 4, mx(2026) - mxp, 14, 7); g.fill();
    // little Rome
    if (t >= S.romeAt) { const k = Math.min(1.1, spring(t - S.romeAt, 'bouncy')), rx = mx(-753), ry = ay - 6; g.save(); g.translate(rx + 22, ry); g.scale(k, k);
      [[-18, 30, 22], [4, 40, 30], [30, 28, 20]].forEach(([dx, w, h], i) => { g.fillStyle = ['#C98B5A', '#D9A25B', '#B97848'][i]; g.fillRect(dx - w / 2, -h, w, h); g.fillStyle = '#7a3e22'; g.beginPath(); g.moveTo(dx - w / 2 - 4, -h); g.lineTo(dx, -h - 16); g.lineTo(dx + w / 2 + 4, -h); g.closePath(); g.fill(); });
      g.restore(); g.save(); g.globalAlpha *= clamp((t - S.romeAt) / 0.2); label(g, 'ROME: A BRAND-NEW', 90, ay - 104, th.gold, 28, 'left'); label(g, 'LITTLE TOWN', 90, ay - 70, th.gold, 28, 'left'); g.restore(); }
    // moving marker
    g.save(); g.translate(mxp, ay + 3); g.fillStyle = '#0B0F14'; g.beginPath(); g.arc(0, 0, 24, 0, 7); g.fill(); g.fillStyle = th.accent; g.beginPath(); g.arc(0, 0, 18, 0, 7); g.fill(); g.restore();
    stk(g, yearLabel(yb), 540, 712, F.hero(fit('2026 AD', F.hero, 700, 112)), v < 1 ? th.accent : th.paper, 'center', 14);
    label(g, 'YEAR YOU HAVE TO START', 540, 612, 'rgba(245,243,238,.85)', 26);
    if (S.pinAt && t >= S.pinAt) { const k = spring(t - S.pinAt, 'bouncy'); g.save(); g.globalAlpha *= clamp(k * 2); chip(g, 'START HERE · ~700 BC', 540, 1040, 'accent', th, 42, 900, k); g.restore(); }
  }
  function stack(g, p, lt, t, th, S) {
    const cols = 50, x0 = 90, y0 = 650, pw0 = 18, ph0 = 15, N = 1000;
    let cnt = 0, txtS = ''; for (const s of S.steps) if (t >= s.at) { cnt = s.n; txtS = s.text; }
    const mu = S.mergeAt ? ease.inOut(clamp((t - S.mergeAt) / 0.9)) : 0;
    for (let i = 0; i < N; i++) {
      let tin = -1; for (let s = 0; s < S.steps.length; s++) { const st = S.steps[s], prev = s ? S.steps[s - 1].n : 0; if (i >= prev && i < st.n) tin = st.at + 0.35 * (i - prev) / Math.max(1, st.n - prev); }
      if (tin < 0 || t < tin) continue; const k = Math.min(1.1, spring(t - tin, 'snappy')), cx = x0 + (i % cols) * pw0, cy = y0 + Math.floor(i / cols) * ph0, gap = 1 - mu;
      g.save(); g.globalAlpha *= clamp((t - tin) / 0.05); g.translate(cx + pw0 / 2, cy + ph0 / 2); g.scale(k, k); blk(g, -pw0 / 2 + gap, -ph0 / 2 + gap, pw0 - 2 * gap, ph0 - 2 * gap, '#1FA366', '#7fe0b0'); g.restore();
    }
    if (mu > 0.95) { const k = spring(t - S.mergeAt - 0.8, 'bouncy'); g.save(); g.globalAlpha *= clamp(k * 2); g.translate(540, 800); g.scale(0.8 + 0.2 * Math.min(1.08, k), 0.8 + 0.2 * Math.min(1.08, k)); clay(g, -300, -64, 600, 128, 22, '#F5F3EE', { shadowK: 0.6 }); txt(g, '$1,000,000,000', 0, 4, F.hero(fit('$1,000,000,000', F.hero, 540, 80)), '#0B0F14'); g.restore(); }
    if (txtS) chip(g, mu > 0.95 ? '1,000 MILLIONS = ONE BILLION' : txtS, 540, 1040, 'ink', th, 38, 900);
    label(g, 'EACH BLOCK = ONE $1,000,000 PILE', 540, 988, 'rgba(245,243,238,.85)', 24);
  }
  function calendar(g, p, lt, t, th, S, x) {
    const days = x / DAY, cw = 118, ch = 118, gap = 10, x0 = 97, y0 = 652;
    label(g, 'TWO WEEKS ON A CALENDAR', 540, 622, 'rgba(245,243,238,.85)', 26);
    for (let i = 0; i < 14; i++) { const cx = x0 + (i % 7) * (cw + gap), cy = y0 + 30 + Math.floor(i / 7) * (ch + gap), f = clamp(days - i);
      g.fillStyle = 'rgba(245,243,238,.14)'; rr(g, cx, cy, cw, ch, 14); g.fill(); if (f > 0) { g.save(); rr(g, cx, cy, cw, ch, 14); g.clip(); clay(g, cx, cy + ch * (1 - f), cw, ch * f, 8, th.accent, { shadowK: 0.2 }); g.restore(); }
      g.strokeStyle = 'rgba(245,243,238,.5)'; g.lineWidth = 3; rr(g, cx, cy, cw, ch, 14); g.stroke(); txt(g, String(i + 1), cx + cw / 2, cy + ch / 2 + 2, F.hero(54), f > 0.5 ? '#0B0F14' : th.paper); }
    chip(g, '1,000,000 SECONDS = ' + days.toFixed(1) + ' DAYS', 540, 1040, 'ink', th, 38, 900);
  }
  function life(g, p, lt, t, th, S, x) {
    const yrs = x / (DAY * YR), mxA = 80, bx = 90, bw = 900, by = 790, bh = 80, f = yrs / mxA;
    label(g, 'YOUR LIFE', 90, 700, 'rgba(245,243,238,.9)', 30, 'left'); label(g, 'AGE 0 → ' + Math.round(yrs), 990, 700, th.accent, 30, 'right');
    g.fillStyle = 'rgba(245,243,238,.14)'; rr(g, bx, by, bw, bh, 40); g.fill();
    g.save(); rr(g, bx, by, bw, bh, 40); g.clip(); clay(g, bx, by, Math.max(bh, bw * f), bh, 40, th.bad, { shadowK: 0.3 }); g.restore();
    g.strokeStyle = 'rgba(245,243,238,.7)'; g.lineWidth = 3; rr(g, bx, by, bw, bh, 40); g.stroke();
    [0, 20, 40, 60, 80].forEach(a => { const ax = bx + bw * a / mxA; g.fillStyle = 'rgba(245,243,238,.8)'; g.fillRect(ax - 2, by + bh + 8, 4, 18); label(g, String(a), Math.min(990 - 14, Math.max(104, ax)), by + bh + 52, 'rgba(245,243,238,.85)', 26); });
    chip(g, 'COUNTING NON-STOP · NO SLEEP', 540, 1040, 'ink', th, 38, 900);
  }
  function duo(g, p, lt, t, th, S) {
    [S.a, S.b].forEach((c, i) => { const on = t - c.at; if (on <= 0) return; const k = spring(on, 'bouncy'), y = 720 + i * 224, bw = 920, bh = 196, col = c.col;
      g.save(); g.translate(540, y + (1 - Math.min(1, k)) * 70); g.scale(0.85 + 0.15 * Math.min(1.06, k), 0.85 + 0.15 * Math.min(1.06, k)); g.globalAlpha *= clamp(on / 0.07);
      clay(g, -bw / 2, -bh / 2 + 16, bw, bh - 16, 48, B.shade(col, -0.38), { shadowK: 0.8 }); clay(g, -bw / 2, -bh / 2, bw, bh - 14, 48, col, { shadowK: 0.3 });
      const sz = fit(c.l1, F.hero, 840, 82, 36); txt(g, c.l1, 0, -34, F.hero(sz), '#0B0F14'); const s2 = fit(c.l2, F.hero, 840, 74, 36); txt(g, c.l2, 0, 44, F.hero(s2), '#0B0F14'); g.restore(); });
  }
  function ask(g, p, lt, t, th, S) {
    const k = spring(lt, 'bouncy'); g.save(); g.translate(540, 800); g.scale(0.7 + 0.3 * Math.min(1.06, k), 0.7 + 0.3 * Math.min(1.06, k)); g.globalAlpha *= clamp(k * 2);
    const sz = Math.min(fit(S.l1, F.hero, 900, 112), fit(S.l2, F.hero, 900, 112)); stk(g, S.l1, 0, -62, F.hero(sz), th.accent, 'center', 16); stk(g, S.l2, 0, 62, F.hero(sz), th.good, 'center', 16); g.restore();
  }

  Object.assign(window.MV5.h, { fit, stk, chip, stamp, label, mw, TONE });
  // ---------- the stage ----------
  B.register('mstage', {
    defaults: { K: [[0, 0]], C: [], scenes: [], hook: null, hideCounter: [], beats: [], notes: [] }, ownEnter: true, size: () => [1080, 1920],
    draw(g, p, env) {
      const { t, theme: th } = env; g.translate(-540, -960);
      const x = xAt(t, p.K);
      let bl = ''; for (const b of p.beats) if (t >= b[0]) bl = b[1]; if (bl) { const k = spring(t - (p.beats.find(b => b[1] === bl)[0]), 'snappy'); g.save(); g.globalAlpha *= clamp(k * 2); label(g, bl, 990, 264, th.accent, 26, 'right'); g.restore(); }
      // counter card (live from frame 0)
      let seg = p.C[0]; for (const s of p.C) if (t >= s.from) seg = s; const hid = p.hideCounter.some(([a, b]) => t >= a && t < b), segT = t - seg.from, pop = 1 + 0.05 * hit(Math.min(0.5, Math.max(0, segT)), 8);
      if (!hid) {
        g.save(); g.translate(540, 437); g.scale(pop, pop); g.translate(-540, -437); paper(g, 70, 322, 940, 230, 26, { lift: 0.3 });
        let L, R, fr; const m = seg.mode;
        if (m === 'm' || m === 'b') { const days = Math.floor(x + 1e-6); L = ['DAY', fmt(days)]; R = ['YEARS', fmt(x / YR, m === 'm' ? 2 : (x / YR < 100 ? 1 : 0))]; fr = x / seg.max; }
        else if (m === 'y') { L = ['YEARS BACK', fmt(Math.floor(x / YR))]; R = ['YEAR', yearLabel(x / YR)]; fr = x / seg.max; }
        else if (m === 'n') { L = ['PILES OF $1M', fmt(Math.floor(x + 1e-6))]; R = ['TOTAL', '$' + fmt(Math.round(x) * 1e6)]; fr = x / seg.max; }
        else { L = ['SECONDS COUNTED', fmt(Math.floor(x))]; R = [seg.u === 'y' ? 'YEARS' : 'DAYS', seg.u === 'y' ? (x / (DAY * YR)).toFixed(1) : (x / DAY).toFixed(1)]; fr = x / seg.max; }
        g.fillStyle = 'rgba(11,15,20,.14)'; rr(g, 98, 344, 884, 22, 11); g.fill(); const fw = clamp(fr) * 884; if (fw > 4) { g.fillStyle = m === 'y' ? th.gold : fr >= 0.999 ? th.bad : th.gold; rr(g, 98, 344, Math.max(22, fw), 22, 11); g.fill(); }
        label(g, L[0], 100, 398, th.inkSoft, 28, 'left'); label(g, R[0], 980, 398, th.inkSoft, 28, 'right');
        const sL = fit(L[1], F.hero, 430, 118, 40), sR = fit(R[1], F.hero, 430, 118, 40);
        txt(g, L[1], 100, 484, F.hero(sL), th.ink, 'left'); txt(g, R[1], 980, 484, F.hero(sR), m === 'y' ? th.bad : th.ink, 'right');
        g.restore();
      }
      hookText(g, p, t, th);
      for (const S of p.scenes) {
        if (t < S.from - 0.02 || t > S.to + 0.02) continue; const lt = t - S.from, kin = spring(lt + 0.08, { f: 2.4, z: 0.7 }), a = clamp(lt / 0.12) * (1 - lin(t, S.to - 0.12, S.to)), sc = (S.pop === false ? 1 : 0.94 + 0.06 * Math.min(1.05, kin));
        g.save(); g.globalAlpha *= a; g.translate(540, 840); g.scale(sc, sc); g.translate(-540, -840);
        const T = S.type;
        if (T === 'cards2') cards2(g, p, lt, t, th, S); else if (T === 'gcard') gcard(g, p, lt, t, th, S, x); else if (T === 'pile') pile(g, p, lt, t, th, S, x); else if (T === 'vs') vs(g, p, lt, t, th, S);
        else if (T === 'list') list(g, p, lt, t, th, S); else if (T === 'bignum') bignum(g, p, lt, t, th, S); else if (T === 'tline') tline(g, p, lt, t, th, S, x); else if (T === 'stack') stack(g, p, lt, t, th, S);
        else if (T === 'calendar') calendar(g, p, lt, t, th, S, x); else if (T === 'life') life(g, p, lt, t, th, S, x); else if (T === 'duo') duo(g, p, lt, t, th, S); else if (T === 'ask') ask(g, p, lt, t, th, S);
        g.restore();
      }
      for (const n of p.notes) if (t >= n.at && t < n.out + 0.2) { const nt = t - n.at, k = Math.min(1.08, spring(nt, 'bouncy')), fo = 1 - lin(t, n.out - 0.15, n.out + 0.05); g.save(); g.globalAlpha *= clamp(nt / 0.06) * fo; if (n.stamp) stamp(g, n.text, 540, n.y || 598, n.tone || 'good', th, n.size || 62, n.rot || -0.04, k); else chip(g, n.text, 540, n.y || 598, n.tone || 'bad', th, n.size || 44, 900, k); g.restore(); }
    },
  });
  B.register('hypo', {
    defaults: { text: 'HYPOTHETICAL · $1,000 A DAY · NO INTEREST' }, ownEnter: true, size: () => [10, 10],
    draw(g, p, env) { const s = p.text, f = F.monoX(21), w = mw(s, f) + 36; g.globalAlpha *= 0.9; g.fillStyle = 'rgba(11,15,20,.78)'; rr(g, -w / 2, -18, w, 36, 18); g.fill(); g.strokeStyle = env.theme.accent; g.lineWidth = 2; rr(g, -w / 2, -18, w, 36, 18); g.stroke(); txt(g, s, 0, 1, f, env.theme.accent); },
  });
})();
(function () {
  const ST = { x: 905, y: 1338, s: 0.8, layer: 'front', blur: 0, dim: 0 };
  const DX = [0, 420, -380, 300, -300, 380, -420, 260];
  window.MV5.make = function (c) {
    const els = [];
    const extra = c.sfx2 || [], auto = [];
    c.scenes.forEach((sc, i) => { if (i > 0) auto.push({ at: sc.from, name: i % 2 ? 'whoosh_1' : 'whoosh_2', gain: -10, dur: 0.6 });
      if (sc.type === 'cards2') (sc.cards || []).forEach((cd, j) => auto.push({ at: cd.at, name: j ? 'pop_1' : 'pop_2', gain: -9, dur: 0.4 }));
      if (sc.type === 'duo' || sc.type === 'vs') [sc.a, sc.b].forEach((cd, j) => auto.push({ at: cd.at, name: j ? 'pop_1' : 'pop_2', gain: -9, dur: 0.4 }));
      if (sc.type === 'vs' && sc.chip) auto.push({ at: sc.chip.at, name: 'success_chime_1', gain: -11, dur: 1.0 });
      if (sc.type === 'list') sc.items.forEach((cd, j) => auto.push({ at: cd.at, name: j % 2 ? 'pop_1' : 'pop_2', gain: -9, dur: 0.4 }));
      if (sc.type === 'pile') { auto.push({ at: sc.zeroAt, name: 'thud_1', gain: -8, dur: 0.4 }); auto.push({ at: sc.zeroAt, name: 'rubber_stamp_2', gain: -6, dur: 0.5 }); }
      if (sc.type === 'bignum') { auto.push({ at: sc.at, name: 'deep_boom_1', gain: -4, dur: 1.6 }); auto.push({ at: sc.at, name: 'cinematic_hit_1', gain: -7, dur: 1.2 }); auto.push({ at: sc.chip.at, name: 'rubber_stamp_1', gain: -7, dur: 0.5 }); }
      if (sc.type === 'tline') { auto.push({ at: sc.romeAt, name: 'pop_2', gain: -8, dur: 0.4 }); if (sc.pinAt) auto.push({ at: sc.pinAt, name: 'pop_1', gain: -9, dur: 0.5 }); auto.push({ at: sc.from, name: 'rewind_1', gain: -10, dur: 1.4 }); }
      if (sc.type === 'stack') { sc.steps.forEach((st, j) => auto.push({ at: st.at, name: j % 2 ? 'pop_2' : 'pop_1', gain: -9, dur: 0.3 })); auto.push({ at: sc.mergeAt, name: 'swoosh_2', gain: -9, dur: 0.8 });  }
      if (sc.type === 'calendar') auto.push({ at: sc.from, name: 'money_counter_1', gain: -13, dur: 2.4 });
      if (sc.type === 'life') auto.push({ at: sc.from, name: 'riser_1', gain: -13, dur: 2.2 });
      if (sc.type === 'ask') auto.push({ at: sc.from, name: 'pop_1', gain: -9, dur: 0.4 }); });
    if (c.sfx0) auto.push(...c.sfx0);
    els.push({ id: 'stage', type: 'mstage', layer: 'screen', at: [540, 960], in: -1, z: 10, props: { K: c.K, C: c.C, scenes: c.scenes, hook: c.hook, hideCounter: c.hideCounter || [], beats: c.labels, notes: c.notes || [] } });
    els.push({ id: 'you', type: 'you', layer: 'screen', at: [150, 1213], scale: 0.82, in: -1, z: 20, props: { keys: c.you } });
    els.push({ id: 'hypo', type: 'hypo', layer: 'screen', at: [545, 1316], in: 0.2, z: 20, props: { text: 'HYPOTHETICAL · $1,000 A DAY · NO INTEREST' } });
    if (c.cta.like) els.push({ id: 'heart', type: 'heart', layer: 'screen', at: [520, 1205], in: c.cta.like, z: 30, props: { s: 1, dur: 1.0 } });
    if (c.cta.send) els.push({ id: 'plane', type: 'plane', layer: 'screen', at: [0, 0], in: c.cta.send, z: 30, props: { from: [330, 1275], to: [760, 1160], dur: 1.2, s: 0.7 }, out: c.cta.send + '+1.5' });
    if (c.cta.follow) els.push({ id: 'follow', type: 'follow', layer: 'screen', at: [520, 1215], in: c.cta.follow, out: c.cta.followOut, z: 30, props: { press: 0.75 } });
    if (c.cta.bubble) els.push({ id: 'bubble', type: 'bubble', layer: 'screen', at: [520, 1205], in: c.cta.bubble.at, z: 30, props: { l1: c.cta.bubble.l1, l2: c.cta.bubble.l2, size: 40, tail: 'left' } });
    const beats = c.scenes.map((s, i) => ({ at: s.from, beat: 'wide', focus: { x: 540 + DX[i % DX.length], y: 740 + (i % 2 ? 90 : -60), w: 1080, h: 300 }, fill: 1, dur: 0.8, st: ST, pose: s.pose || 'talk' }));
    beats.unshift({ at: 0, beat: 'wide', focus: { x: 540, y: 740, w: 1080, h: 300 }, fill: 1, st: ST, pose: 'shock' });
    return {
      series: 'whatif', title: 'MILLION × BILLION', duration: c.dur,
      footnote: ['ASSUMES: $1,000 SPENT EVERY DAY · NO INTEREST · 1 YEAR = 365.25 DAYS', 'HYPOTHETICAL · OUR MATH · NOT FINANCIAL ADVICE'],
      elements: els, beats, poses: [...(c.cta.follow ? [[c.cta.follow, 'follow', { target: [520, 1215] }]] : []), ...(c.poses || [])], shakes: c.shakes, captions: c.captions, bed: c.bed || { name: 'jazz_bed_2', gain: -1 }, sfx: [...auto, ...extra],
    };
  };
})();
// IG/FB cut — profane hook: a billion breaks your brain. Car-loan comparison, spending list.
const hookEnd = "@let's-0.12";
const K = [[0, 0], ['@brain+0.8', 1e6], [hookEnd, 1e6], [hookEnd, 0], ['@every', 5], ['@start', 5], ['@months', 1000],
  ['@now-0.1', 1000], ['@now-0.1', 0], ['@how', 2], ['@years#2+0.2', 1e6],
  ['@to#2-0.1', 1e6], ['@to#2-0.1', 0], ['@bc+0.1', 1e6],
  ['@seriously-0.1', 1e6], ['@seriously-0.1', 0], ['@10-0.1', 0], ['@10+0.25', 10], ['@100-0.1', 10], ['@100+0.4', 100], ['@thousand#3-0.1', 100], ['@thousand#3+0.6', 1000],
  ['@still-0.1', 1000], ['@still-0.1', 0], ['@count', 0], ['@sleep', 3], ['@seconds-0.3', 3], ['@days+0.2', 1e6], ['@seconds#2-0.4', 1e6], ['@years#3+0.1', 1e9]];
const S = MV5.make({
  dur: 71.63, K,
  C: [{ from: 0, mode: 'b', max: 1e6 }, { from: hookEnd, mode: 'm', max: 1000 }, { from: '@now-0.1', mode: 'b', max: 1e6 }, { from: '@to#2-0.1', mode: 'y', max: 1e6 }, { from: '@seriously-0.1', mode: 'n', max: 1000 },
    { from: '@still-0.1', mode: 's', u: 'd', max: 1e6 }, { from: '@seconds#2-0.4', mode: 's', u: 'y', max: 1e9 }],
  hook: { until: hookEnd, y: 690, size: 100, lines: [[['A BILLION DOLLARS', 'accent']], [['BREAKS YOUR BRAIN', 'paper']]] },
  scenes: [
    { type: 'cards2', from: 0, to: '@you-0.1', pose: 'shock', cards: [{ at: '@shrink', amount: '$1,000,000', col: '#00D26A', w: 560, y: 940 }, { at: 0.3, amount: '$1,000,000,000', col: '#FFD60A', w: 900, y: 1045 }] },
    { type: 'gcard', from: '@you-0.1', to: '@start-0.1', pose: 'talk', cap: 1e6, col: '#00D26A' },
    { type: 'pile', from: '@start-0.1', to: '@that\'s-0.1', pose: 'shock', zeroAt: '@months' },
    { type: 'vs', from: '@that\'s-0.1', to: '@fancy-0.1', pose: 'chin', max: 5.4, a: { at: '@that\'s', yrs: 2.74, label: 'YOUR $1,000,000 LASTS', text: '2.74 YEARS' }, b: { at: '@car-0.2', yrs: 5, label: 'A 5-YEAR CAR LOAN', text: '5 YEARS' }, chip: { at: '@loan', text: 'LESS THAN A CAR LOAN' } },
    { type: 'list', from: '@fancy-0.1', to: '@double-0.1', pose: 'shock', items: [{ at: '@fancy', col: '#FFD60A', text: 'FANCY DINNERS' }, { at: '@nice-0.2', col: '#00D26A', text: 'A NICE CAR' }, { at: '@two#2', col: '#7FD6C9', text: 'TWO BIG TRIPS' }, { at: '@poof', col: '#E5534B', text: 'POOF. IT\'S GONE.' }] },
    { type: 'ask', from: '@double-0.1', to: '@now-0.1', pose: 'you', l1: 'BLOW IT IN', l2: 'MONTH ONE?' },
    { type: 'gcard', from: '@now-0.1', to: '@2-0.1', pose: 'talk', cap: 1e9, col: '#FFD60A' },
    { type: 'bignum', from: '@2-0.1', to: '@to#2-0.1', pose: 'shock', at: '@2', dur: 2.2, l1: 'YEARS', chip: { at: '@damn', text: '= 27 CENTURIES' }, num: 2738 },
    { type: 'tline', from: '@to#2-0.1', to: '@seriously-0.1', pose: 'chin', romeAt: '@ancient-0.2', pinAt: '@700+0.5' },
    { type: 'stack', from: '@seriously-0.1', to: '@send+0.35', pose: 'shock', mergeAt: '@them-0.5', steps: [{ at: '@10-0.1', n: 10, text: '10 × $1M = $10M' }, { at: '@100-0.1', n: 100, text: '100 × $1M = $100M' }, { at: '@thousand#3-0.1', n: 1000, text: '1,000 × $1M = $1,000M' }] },
    { type: 'duo', from: '@send+0.35', to: '@still-0.1', pose: 'talk', a: { at: '@whoever', col: '#E5534B', l1: 'THEY SAY', l2: 'A BIG MILLION' }, b: { at: '@big#3', col: '#00D26A', l1: 'THE TRUTH', l2: '1,000 MILLIONS' } },
    { type: 'ask', from: '@still-0.1', to: '@seconds-0.35', pose: 'you', l1: 'ONE NUMBER', l2: 'EVERY SECOND' },
    { type: 'calendar', from: '@seconds-0.35', to: '@seconds#2-0.4', pose: 'chin' },
    { type: 'life', from: '@seconds#2-0.4', to: '@that\'s#2-0.1', pose: 'shock' },
    { type: 'ask', from: '@that\'s#2-0.1', to: '@so#3-0.1', pose: 'shock', l1: 'RICH vs', l2: 'RIDICULOUS' },
    { type: 'duo', from: '@so#3-0.1', to: '@million#4-0.1', pose: 'chin', a: { at: '@billionaire-0.1', col: '#FFD60A', l1: 'A BILLIONAIRE', l2: '= 1,000 MILLIONAIRES' }, b: { at: '@with#3-0.3', col: '#E5534B', l1: 'NOT A MILLIONAIRE', l2: 'WITH EXTRA STEPS' } },
    { type: 'ask', from: '@million#4-0.1', to: 99, pose: 'you', l1: 'HOW LONG', l2: 'WOULD YOU LAST?' },
  ],
  hideCounter: [['@million#4-0.1', 99]],
  labels: [[0, 'THE BRAIN BREAK'], ['@let\'s-0.12', 'THE RULE'], ['@start-0.1', 'THE MILLION'], ['@fancy-0.1', 'THE SPENDING'], ['@now-0.1', 'THE BILLION'], ['@2-0.1', 'THE ANSWER'], ['@to#2-0.1', 'THE PAST'], ['@seriously-0.1', 'THE STACK'], ['@still-0.1', 'THE SECONDS'], ['@that\'s#2-0.1', 'THE GAP']],
  notes: [{ at: '@about', out: '@that\'s-0.1', text: 'ABOUT 2 YRS 9 MONTHS', tone: 'bad', y: 606, size: 40 }],
  you: [{ at: 0, mood: 'wow', text: 'YOU: BRAIN BROKEN' }, { at: '@let\'s', mood: 'smirk', text: 'YOU GET A GIFT CARD' }, { at: '@start', mood: 'worried', text: 'SPENDING…' }, { at: '@months', mood: 'angry', text: 'BROKE' }, { at: '@fancy', mood: 'happy', text: 'LIVING LARGE' }, { at: '@poof', mood: 'angry', text: 'POOF' }, { at: '@now', mood: 'smirk', text: 'NOW A BILLION' },
    { at: '@2', mood: 'wow', text: 'WHAT?!' }, { at: '@ancient', mood: 'neutral', text: 'TINY ROME' }, { at: '@count', mood: 'worried', text: 'COUNTING…' }, { at: '@seconds#2', mood: 'wow', text: 'SO LONG' }, { at: '@million#4', mood: 'smirk', text: 'YOUR CALL' }],
  cta: { like: '@tap-0.1', send: '@send', follow: '@follow+0.05', followOut: '@follow+1.9', bubble: { at: '@number#2-0.3', l1: 'ONE NUMBER', l2: 'COMMENT BELOW' } },
  poses: [['@tap', 'you'], ['@send', 'you']],
  shakes: [[0.1, 8], ['@2', 14], ['@bc', 10], ['@them', 12]],
  captions: { gap: 16, emph: { 'million': 'good', 'billion': 'accent', 'million.': 'good', 'billion': 'accent', 'fucking': 'bad', 'damn': 'bad', 'years.': 'accent', '700': 'accent', 'BC.': 'accent', 'Rome': 'gold', 'gone.': 'bad', 'broke': 'bad', '32': 'bad', '11': 'good', 'ridiculous.': 'bad' }, fix: [['cause', '\'cause']] },
  bed: { name: 'jazz_bed_2', gain: -1 },
  sfx2: [
    { at: 0.04, name: 'deep_boom_2', gain: -4, dur: 0.36 }, { at: '@every', name: 'money_counter_2', gain: -13, dur: 3.2 }, { at: '@how', name: 'money_counter_1', gain: -13, dur: 3.0 },
    { at: '@tap', name: 'pop_2', gain: -9, dur: 0.3 }, { at: '@send-0.05', name: 'swoosh_1', gain: -9, dur: 0.9 }, { at: '@to#2', name: 'riser_1', gain: -13, dur: 2.8 }, { at: '@thousand#3', name: 'money_counter_2', gain: -13, dur: 1.2 },
    { at: '@follow+0.05', name: 'pop_1', gain: -9, dur: 0.5 }, { at: '@follow+0.8', name: 'click_1', gain: -8, dur: 0.3 }, { at: '@follow+0.9', name: 'success_chime_1', gain: -12, dur: 1.2 },
    { at: '@count', name: 'click_1', gain: -9, dur: 0.2 }, { at: '@count+1', name: 'click_1', gain: -9, dur: 0.2 }, { at: '@count+2', name: 'click_1', gain: -9, dur: 0.2 }, { at: '@days+0.2', name: 'ding_2', gain: -9, dur: 0.6 }, { at: '@number#2-0.3', name: 'pop_1', gain: -9, dur: 0.5 },
  ],
});
BM2.scene(S);
