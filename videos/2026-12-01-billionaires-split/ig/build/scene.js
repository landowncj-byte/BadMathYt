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
  const you = (g, cx, cy, s, mood, t, held) => {
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
    // held item: a check, a sandwich, or nothing
    if (held === 'check') { g.save(); g.translate(104, 150); g.rotate(-0.28); g.fillStyle = SK; g.beginPath(); g.arc(0, 52, 24, 0, 7); g.fill(); stroke(g, 4);
      g.fillStyle = '#F5F3EE'; g.beginPath(); g.moveTo(-70, -52); g.lineTo(70, -52); g.lineTo(70, 28); g.lineTo(-70, 28); g.closePath(); g.fill(); stroke(g, 4.5); g.strokeStyle = '#59606B'; g.lineWidth = 3; g.beginPath(); g.moveTo(-58, 14); g.lineTo(10, 14); g.stroke(); g.fillStyle = '#188a56'; g.fillRect(-60, -44, 36, 8); txt(g, '$2,451', 22, -14, F.hero(26), '#188a56'); g.restore(); }
    else if (held === 'sandwich') { g.save(); g.translate(104, 150); g.rotate(-0.2); g.fillStyle = SK; g.beginPath(); g.arc(0, 52, 24, 0, 7); g.fill(); stroke(g, 4);
      g.fillStyle = '#D9A441'; g.beginPath(); g.ellipse(0, -34, 62, 20, 0, Math.PI, 0); g.fill(); stroke(g, 4); g.fillStyle = '#4CAF50'; g.fillRect(-62, -34, 124, 8); g.fillStyle = '#E0281E'; g.fillRect(-58, -26, 116, 8); g.fillStyle = '#F2A0A0'; g.fillRect(-60, -18, 120, 8); g.fillStyle = '#D9A441'; rr(g, -62, -10, 124, 18, 8); g.fill(); stroke(g, 4); g.restore(); }
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
      you(g, 0, -34, 0.62, K.mood, t, K.held); g.restore(); g.strokeStyle = INK; g.lineWidth = 4; rr(g, -90, -140, 180, 190, 12); g.stroke();
      g.fillStyle = '#E8590C'; rr(g, -90, 56, 180, 28, 8); g.fill(); txt(g, 'YOU · ILLUSTRATION', 0, 70, F.cap(13), '#F5F3EE');
      const w = Math.max(196, mw(K.text, F.cap(22)) + 22); g.save(); g.translate(0, 120); g.fillStyle = theme.ink; rr(g, -w / 2, -20, w, 40, 10); g.fill(); g.strokeStyle = K.tone === 'bad' ? '#FF3B30' : K.tone === 'good' ? '#00D26A' : '#FFD60A'; g.lineWidth = 3; rr(g, -w / 2, -20, w, 40, 10); g.stroke(); txt(g, K.text, 0, 2, F.cap(22), g.strokeStyle); g.restore();
      g.restore();
    },
  });
})();
// ===== Billionaires split — What If stage (screen space). Layout: pill y238-290 | counter y322-552 | zone y590-1085 | row y1100-1335 | captions y~1432.
// Math (beats-v3.md): $20.1T / 3,428 = $5.86B avg; $20.1T / 8.2B = $2,451; /365 = $6.72/day; +$4T / 8.2B = $488; $5.863B / $2,451 = 2.39M checks.
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, burst, hash, hit } = B;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const fmt = (v, d = 0) => B.fmtNum(v, d, true);
  window.BQ = { h: {} };
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
  const pk = (t, at, o = 'bouncy') => Math.min(1.1, spring(t - at, o));
  const sub = (g, s, x, y, col, size = 24, al = 'center') => txt(g, s, x, y, F.monoX(size), col, al);
  const bottomChip = (g, S, t, th) => { let ch = null; for (const c of (S.chips || (S.chip ? [S.chip] : []))) if (t >= c.at) ch = c; if (ch && !(S.chipOut && t >= S.chipOut)) chip(g, ch.text, 540, ch.y || 1062, ch.tone || 'ink', th, ch.size || 38, 900, spring(t - ch.at, 'bouncy')); };
  const tagsOf = (g, S, t, th) => { for (const nt of S.tags || []) if (t >= nt.at && (!nt.out || t < nt.out)) chip(g, nt.text, nt.x || 540, nt.y || 640, nt.tone || 'ink', th, nt.size || 38, nt.w || 900, spring(t - nt.at, 'bouncy')); };
  const enter = (g, t, at, x, y, dy = 60) => { g.save(); const k = pk(t, at); g.translate(x, y + (1 - Math.min(1, k)) * dy); g.scale(0.9 + 0.1 * k, 0.9 + 0.1 * k); g.globalAlpha *= clamp((t - at) / 0.08); return k; };
  const GREEN = '#1FA366', GOLDC = '#F2B705';
  const bundle = (g, x, y, w, h, col) => { clay(g, x, y, w, h, 8, col || GREEN, { shadowK: 0.4 }); g.fillStyle = 'rgba(245,243,238,.9)'; g.fillRect(x + w * 0.4, y + 2, w * 0.2, h - 4); txt(g, '$', x + w * 0.5, y + h * 0.54, F.hero(h * 0.5), '#0B0F14'); g.fillStyle = 'rgba(0,0,0,.15)'; g.fillRect(x, y + h - 5, w, 4); };
  // generic person (illustration). kind: 'you' | 'baby' | 'grandma' | colour index
  const PCOL = ['#2c3e66', '#8a2f2f', '#2f6f4f', '#6b4a8a', '#a8741a', '#2b7a8a', '#7a4a2b'];
  function person(g, x, y, s, ci, kind) {
    g.save(); g.translate(x, y); g.scale(s, s); const INK = '#0B0F14', col = kind === 'you' ? '#E8590C' : kind === 'baby' ? '#9ad0f5' : kind === 'grandma' ? '#b05ca8' : PCOL[ci % PCOL.length];
    g.fillStyle = col; g.strokeStyle = INK; g.lineWidth = 2.2; g.beginPath(); g.roundRect(-9, -4, 18, 20, 6); g.fill(); g.stroke();
    g.fillStyle = '#F1C9A0'; g.beginPath(); g.arc(0, -12, 8, 0, 7); g.fill(); g.stroke();
    if (kind === 'you') { g.fillStyle = GOLDC; g.beginPath(); g.moveTo(-8.5, -14); g.bezierCurveTo(-9, -26, 9, -26, 8.5, -14); g.closePath(); g.fill(); g.stroke(); }
    else if (kind === 'grandma') { g.fillStyle = '#d8d8de'; g.beginPath(); g.arc(0, -17, 8.5, Math.PI, 0); g.fill(); g.beginPath(); g.arc(0, -25, 4.5, 0, 7); g.fill(); g.stroke(); g.lineWidth = 1.4; g.beginPath(); g.arc(-3, -12, 2.4, 0, 7); g.arc(3, -12, 2.4, 0, 7); g.stroke(); }
    else if (kind === 'baby') { g.fillStyle = '#F5F3EE'; g.beginPath(); g.arc(0, -19, 3, 0, 7); g.fill(); g.stroke(); }
    else { g.fillStyle = ['#3a2a1a', '#1a1a1a', '#7a4a2b', '#c9a24a'][ci % 4]; g.beginPath(); g.arc(0, -15, 8.5, Math.PI, 0); g.fill(); }
    g.restore(); }
  function check(g, w, h, th, amount, o = {}) { // centred paper check
    clay(g, -w / 2, -h / 2, w, h, 12, '#F5F3EE', { shadowK: 0.5 }); g.strokeStyle = '#2f6f4f'; g.lineWidth = Math.max(2, w * 0.006); rr(g, -w / 2 + w * 0.025, -h / 2 + h * 0.06, w * 0.95, h * 0.88, 8); g.stroke();
    g.fillStyle = '#d8efe2'; g.fillRect(-w / 2 + w * 0.03, -h / 2 + h * 0.1, w * 0.94, h * 0.14); txt(g, o.head || 'SPLIT CHECK', -w / 2 + w * 0.06, -h / 2 + h * 0.17, F.monoX(Math.max(10, h * 0.1)), '#14603f', 'left');
    if (o.to) { txt(g, 'PAY TO THE ORDER OF', -w / 2 + w * 0.06, -h * 0.06, F.monoX(Math.max(9, h * 0.07)), '#59606B', 'left'); txt(g, o.to, -w / 2 + w * 0.06, h * 0.1, F.hero(Math.max(14, h * 0.18)), '#0B0F14', 'left'); }
    txt(g, amount, o.to ? w * 0.16 : 0, o.to ? h * 0.12 : h * 0.05, F.hero(fit(amount, F.hero, w * (o.to ? 0.42 : 0.8), h * 0.42, 14)), '#188a56', o.to ? 'center' : 'center');
    g.strokeStyle = '#59606B'; g.lineWidth = Math.max(1.5, w * 0.004); g.beginPath(); g.moveTo(-w / 2 + w * 0.06, h * 0.34); g.lineTo(-w * 0.1, h * 0.34); g.stroke(); if (o.memo) txt(g, o.memo, -w / 2 + w * 0.06, h * 0.28, F.monoX(Math.max(8, h * 0.06)), '#59606B', 'left');
    g.strokeStyle = '#3a4a7a'; g.lineWidth = Math.max(1.5, w * 0.005); g.beginPath(); g.moveTo(w * 0.12, h * 0.3); g.bezierCurveTo(w * 0.2, h * 0.18, w * 0.26, h * 0.42, w * 0.32, h * 0.26); g.stroke(); }
  function pile(g, cx, baseY, s, vis, tFly) { // pyramid 5-4-3-2-1 of bundles; tFly(i) -> {x,y,k,a} overrides
    const w = 100 * s, h = 50 * s; let i = 0; for (let r = 0; r < 5; r++) { const n = 5 - r; for (let c = 0; c < n; c++, i++) { const hx = cx - n * w / 2 + c * w + 1, hy = baseY - (r + 1) * h; if (vis != null && i >= vis) continue; const f = tFly ? tFly(i, hx, hy, w, h) : null; if (f && f.a <= 0) continue; g.save(); if (f) { g.globalAlpha *= f.a; g.translate(f.x + w / 2, f.y + h / 2); g.scale(f.k, f.k); g.translate(-w / 2, -h / 2); bundle(g, 0, 0, w - 2, h - 2); } else bundle(g, hx, hy, w - 2, h - 2); g.restore(); } } }
  // ---------- scenes ----------
  function pile_(g, p, lt, t, th, S) { // the giant pile + 3,428 plate + crowd + optional YOU check
    const crowd = []; for (let i = 0; i < 26; i++) crowd.push([110 + i * 33.5, 1030 + (i % 2) * 4, i]);
    enter(g, t, S.at ?? 0, 0, 0, 0);
    if (S.pileAt == null || t >= S.pileAt) {
      const sl = S.sliceAt != null ? t - S.sliceAt : -1, fly = sl > 0 ? (i, hx, hy) => { const q = clamp((sl - i * 0.05) / 0.7), e = ease.in(q), tx = 120 + (i * 61) % 800, ty = 1030; return { x: lerp(hx, tx, e), y: lerp(hy, ty, e), k: lerp(1, 0.18, e), a: 1 - clamp((q - 0.85) / 0.15) }; } : null;
      pile(g, 540, 935, 1.04, null, fly);
      if (sl > 0) { for (let r = 1; r < 5; r++) { const u = clamp((sl + 0.2) / 0.3); g.strokeStyle = 'rgba(224,40,30,' + (1 - clamp((sl - 0.5) / 0.4)) * u + ')'; g.lineWidth = 4; g.setLineDash([12, 8]); g.beginPath(); g.moveTo(260, 935 - r * 52); g.lineTo(260 + 560 * u, 935 - r * 52); g.stroke(); g.setLineDash([]); } }
      const la = t - (S.labelAt ?? S.at ?? 0); if (la > 0 && !(S.labelOut != null && t > S.labelOut)) { const k = pk(t, S.labelAt ?? S.at ?? 0); g.save(); g.translate(540, 612); g.scale(0.85 + 0.15 * k, 0.85 + 0.15 * k); g.globalAlpha *= clamp(la / 0.08); stk(g, '$20.1 TRILLION', 0, 0, F.hero(fit('$20.1 TRILLION', F.hero, 780, 92)), th.good, 'center', 12); g.restore(); }
      const pa = t - (S.plateAt ?? 9999); if (pa > 0 && !(S.labelOut != null && t > S.labelOut)) { const k = pk(t, S.plateAt); g.save(); g.translate(540, 984); g.scale(0.85 + 0.15 * k, 0.85 + 0.15 * k); g.globalAlpha *= clamp(pa / 0.08); clay(g, -250, -26, 500, 52, 12, th.navy, { shadowK: 0.5 }); txt(g, '3,428 BILLIONAIRES', 0, 2, F.hero(36), th.gold); g.restore(); }
    }
    const ca = t - (S.crowdAt ?? 9999); if (ca > 0) { for (const [x, y, i] of crowd) { const q = clamp((ca - i * 0.012) / 0.2); if (q <= 0) continue; g.save(); g.globalAlpha *= q; person(g, x, y + 20, 1.05, i); g.restore(); } sub(g, '8.2 BILLION PEOPLE · DRAWN SMALL', 540, 1066, th.paper, 18); }
    const ya = t - (S.checkAt ?? 9999); if (ya > 0) { const k = pk(t, S.checkAt); g.save(); g.translate(870, 800); g.scale(0.6 + 0.4 * k, 0.6 + 0.4 * k); g.globalAlpha *= clamp(ya / 0.08); person(g, 0, 40, 4.4, 0, 'you'); g.translate(-30, 110); g.rotate(-0.06); check(g, 210, 100, th, '$2,451', { head: 'YOUR CHECK' }); g.restore(); }
    g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function assumes(g, p, lt, t, th, S) {
    enter(g, t, S.at, 540, 820); paper(g, -430, -230, 860, 460, 18, { lift: 0.6 }); g.fillStyle = th.navy; rr(g, -420, -220, 840, 62, 12); g.fill(); txt(g, 'ASSUMES', 0, -188, F.hero(46), th.gold);
    const rows = S.rows || []; rows.forEach((r, i) => { const o = t - r.at; if (o <= 0) return; const k = pk(t, r.at); g.save(); g.globalAlpha *= clamp(o / 0.1); g.translate(0, -112 + i * 56 + (1 - Math.min(1, k)) * 18); g.fillStyle = r.tone === 'bad' ? th.bad : '#188a56'; g.beginPath(); g.arc(-380, 0, 16, 0, 7); g.fill(); g.strokeStyle = '#F5F3EE'; g.lineWidth = 5; g.lineCap = 'round'; g.beginPath(); g.moveTo(-388, 1); g.lineTo(-381, 8); g.lineTo(-370, -7); g.stroke(); txt(g, r.text, -345, 2, F.hero(fit(r.text, F.hero, 740, 40)), r.tone === 'bad' ? th.badInk : th.ink, 'left'); g.restore(); });
    if (S.stampAt != null) stamp(g, 'WE PRETEND', 290, 196, 'accent', th, 38, -0.07, pk(t, S.stampAt)); g.restore(); bottomChip(g, S, t, th); }
  function trillion(g, p, lt, t, th, S) {
    enter(g, t, S.at, 540, 800); paper(g, -440, -215, 880, 430, 18, { lift: 0.5 }); g.fillStyle = th.navy; rr(g, -430, -205, 860, 56, 12); g.fill(); txt(g, 'WHAT’S A TRILLION?', 0, -177, F.hero(40), th.gold);
    const u = ease.inOut(clamp((t - (S.gridAt ?? S.at + 0.3)) / (S.dur || 1.6))), cols = 40, rows = 25, cw = 20, ch = 8.6, x0 = -cols * cw / 2, y0 = -115; for (let i = 0; i < 1000; i++) { const c = i % cols, r = Math.floor(i / cols), lit = i < 1000 * u; g.fillStyle = lit ? (i % 100 < 1 ? GOLDC : GREEN) : 'rgba(11,15,20,.1)'; g.fillRect(x0 + c * cw + 1, y0 + r * (ch + 0.4) + 1, cw - 2, ch - 1); }
    txt(g, '1 TRILLION', -250, 158, F.hero(60), th.badInk); const a = t - (S.eqAt ?? 9999); if (a > 0) { const k = pk(t, S.eqAt); g.save(); g.translate(140, 158); g.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k); g.globalAlpha *= clamp(a / 0.1); txt(g, '= 1,000 BILLIONS', 0, 0, F.hero(fit('= 1,000 BILLIONS', F.hero, 400, 60)), th.ink); g.restore(); }
    g.restore(); bottomChip(g, S, t, th); }
  function people(g, p, lt, t, th, S) { // 20x10 grid of figures; slices land on each; YOU highlighted
    const cols = 20, rows = 10, cw = 46, rh = 39, x0 = 540 - cols * cw / 2, y0 = 630, k = pk(t, S.at);
    g.save(); g.globalAlpha *= clamp((t - S.at) / 0.1); for (let i = 0; i < cols * rows; i++) { const c = i % cols, r = Math.floor(i / cols), isYou = i === S.you; const x = x0 + (c + 0.5) * cw, y = y0 + (r + 0.5) * rh; const q = clamp((t - (S.at + 0.1 + i * 0.004)) / 0.2); if (q <= 0) continue; g.save(); g.globalAlpha *= q; person(g, x, y + 8, 1.55, (c * 3 + r) % 7, isYou && S.youAt != null && t >= S.youAt ? 'you' : (c * 7 + r * 3) % 11 === 0 ? 'baby' : (c * 5 + r) % 13 === 0 ? 'grandma' : undefined);
      const sl = S.sliceAt != null ? t - S.sliceAt - (r * 0.07 + c * 0.012) : -1; if (sl > 0) { const u = ease.out(clamp(sl / 0.25)); g.fillStyle = GREEN; g.fillRect(x - 11, y + 14 - 3 * u, 22, 6 * u); g.fillStyle = '#F5F3EE'; g.fillRect(x - 2, y + 14 - 3 * u, 4, 6 * u); } g.restore(); }
    g.restore();
    if (S.youAt != null && t >= S.youAt) { const yy = Math.floor(S.you / cols), yc = S.you % cols, X = x0 + (yc + 0.5) * cw, Y = y0 + (yy + 0.5) * rh, u = ease.out(clamp((t - S.youAt) / 0.4)); g.strokeStyle = th.accent; g.lineWidth = 5; g.beginPath(); g.ellipse(X, Y + 4, 28 * (2 - u), 30 * (2 - u), 0, 0, 7); g.globalAlpha *= u; g.stroke(); g.globalAlpha = 1; const kk = pk(t, S.youAt + 0.1); g.save(); g.translate(X, Y - 62); g.scale(kk, kk); chip(g, 'YOU', 0, 0, 'accent', th, 34, 200, 1); g.restore(); }
    sub(g, 'EACH FIGURE ≈ 41 MILLION PEOPLE · 8.2 BILLION TOTAL', 540, 1044, th.paper, 20); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function samecheck(g, p, lt, t, th, S) {
    [['BABY', 'baby', 190, S.babyAt], ['GRANDMA', 'grandma', 540, S.grandAt], ['YOU', 'you', 890, S.youAt]].forEach(([nm, kind, x, at]) => { if (at == null || t < at) return; const k = pk(t, at); g.save(); g.translate(x, 800 + (1 - Math.min(1, k)) * 50); g.scale(0.88 + 0.12 * k, 0.88 + 0.12 * k); g.globalAlpha *= clamp((t - at) / 0.08); paper(g, -135, -205, 270, 410, 18, { lift: 0.5 }); g.fillStyle = th.navy; rr(g, -135, -205, 270, 52, 18); g.fill(); txt(g, nm, 0, -178, F.hero(36), th.gold); g.save(); g.translate(0, -30); person(g, 0, 20, 5.0, 0, kind); g.restore(); g.save(); g.translate(0, 125); check(g, 230, 108, th, '$2,451', {}); g.restore(); g.restore(); });
    if (S.eqAt != null && t >= S.eqAt) chip(g, 'THE SAME CHECK', 540, 1050, 'accent', th, 46, 800, pk(t, S.eqAt)); tagsOf(g, S, t, th); }
  function check_(g, p, lt, t, th, S) {
    enter(g, t, S.at, 540, 790); const v = Math.round(2451 * ease.out(clamp((t - (S.numAt ?? S.at)) / 1.0)));
    check(g, 860, 400, th, t < (S.numAt ?? S.at) ? '$ ? ? ?' : '$' + fmt(v), { head: 'THE SPLIT · ONE CHECK', to: 'YOU', memo: 'BILLIONAIRE LIST ÷ 8.2 BILLION' });
    if (S.stampAt != null) stamp(g, S.stampText || 'ONE TIME ONLY', 250, 172, 'bad', th, 46, -0.07, pk(t, S.stampAt)); sub(g, S.note || 'ABOUT $2,450', 0, 250, th.paper, 26); g.restore(); bottomChip(g, S, t, th); }
  function once(g, p, lt, t, th, S) {
    enter(g, t, S.at, 540, 800); const cols = 12, tw = 72, x0 = -cols * tw / 2; for (let r = 0; r < 2; r++) for (let c = 0; c < cols; c++) { const x = x0 + c * tw + 4, y = -150 + r * 100, first = r === 0 && c === 0; clay(g, x, y, tw - 8, 84, 10, first ? '#d8efe2' : 'rgba(245,243,238,.12)', { shadowK: first ? 0.4 : 0 }); if (first) { g.save(); g.translate(x + (tw - 8) / 2, y + 42); check(g, 56, 34, th, '$', {}); g.restore(); } else { g.strokeStyle = 'rgba(245,243,238,.35)'; g.lineWidth = 3; g.setLineDash([6, 6]); rr(g, x, y, tw - 8, 84, 10); g.stroke(); g.setLineDash([]); txt(g, '$0', x + (tw - 8) / 2, y + 42, F.hero(26), 'rgba(245,243,238,.5)'); } }
    sub(g, 'MONTH 1', x0 + 4 + 32, -166, th.paper, 14); sub(g, '24 MONTHS · 2 YEARS', 0, 66, th.paper, 20);
    const a = t - (S.onceAt ?? S.at + 0.3); if (a > 0) { const k = pk(t, S.onceAt ?? S.at + 0.3); g.save(); g.translate(0, 150); g.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k); stk(g, 'ONE TIME', 0, 0, F.hero(110), th.good, 'center', 14); g.restore(); }
    g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function vs(g, p, lt, t, th, S) { // $1,000,000 vs $2,451
    enter(g, t, S.at, 540, 800); paper(g, -440, -215, 880, 430, 18, { lift: 0.5 }); const H = 270, base = 150;
    const kb = S.bigAt != null ? clamp((t - S.bigAt) / 0.7) : 1; clay(g, -300, base - H * ease.out(kb), 220, H * ease.out(kb), 12, GOLDC, { shadowK: 0.4 }); if (kb > 0.9) { txt(g, '$1,000,000', -190, base - H - 36, F.hero(46), '#B88700'); txt(g, 'A MILLIONAIRE', -190, base + 32, F.monoX(20), th.inkSoft); }
    const ks = S.smallAt != null ? clamp((t - S.smallAt) / 0.4) : 0; if (ks > 0) { g.fillStyle = th.bad; g.fillRect(100, base - 3 * ks, 220, 3 * ks); txt(g, '$2,451', 210, base - 30, F.hero(46), th.badInk); txt(g, 'YOUR CHECK', 210, base + 32, F.monoX(20), th.inkSoft); const u = ease.out(clamp((t - S.smallAt - 0.3) / 0.4)); g.save(); g.globalAlpha *= u; g.strokeStyle = th.bad; g.lineWidth = 4; g.beginPath(); g.arc(210, base - 2, 58 * (2 - u), 0, 7); g.stroke(); g.restore(); txt(g, '0.25% OF A MILLION', 210, base - 100, F.hero(30), th.badInk); }
    g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function sandwich(g, x, y, s) { g.save(); g.translate(x, y); g.scale(s, s); g.strokeStyle = '#0B0F14'; g.lineWidth = 4; g.fillStyle = '#D9A441'; g.beginPath(); g.ellipse(0, -30, 70, 26, 0, Math.PI, 0); g.fill(); g.stroke(); g.fillStyle = '#4CAF50'; g.beginPath(); g.moveTo(-72, -30); for (let i = 0; i < 8; i++) g.lineTo(-72 + i * 20 + 10, -22 + (i % 2) * 8); g.lineTo(72, -30); g.closePath(); g.fill(); g.stroke(); g.fillStyle = '#E0281E'; rr(g, -66, -20, 132, 12, 4); g.fill(); g.stroke(); g.fillStyle = '#F2A0A0'; rr(g, -68, -8, 136, 12, 4); g.fill(); g.stroke(); g.fillStyle = '#D9A441'; rr(g, -70, 4, 140, 22, 10); g.fill(); g.stroke(); g.restore(); }
  function perday(g, p, lt, t, th, S) {
    enter(g, t, S.at, 540, 810); paper(g, -440, -225, 880, 450, 18, { lift: 0.5 }); const u = ease.inOut(clamp((t - S.gridAt) / (S.dur || 2.4))), cols = 73, cw = 11.2, x0 = -cols * cw / 2;
    sub(g, 'ONE YEAR · 365 DAYS · ONE CHECK SPREAD OUT', 0, -190, th.inkSoft, 22);
    for (let i = 0; i < 365; i++) { const c = i % cols, r = Math.floor(i / cols), lit = i < 365 * u; g.fillStyle = lit ? 'rgba(11,15,20,.1)' : GREEN; g.fillRect(x0 + c * cw + 1, -160 + r * 13, cw - 2, 11); }
    const left = Math.round(2451 * (1 - u)); txt(g, '$6.72', -230, -20, F.hero(150), th.badInk); txt(g, 'A DAY', -230, 70, F.hero(66), th.ink); g.save(); g.translate(250, 20); const k = pk(t, S.sandAt ?? S.at + 0.5); g.scale(k, k); sandwich(g, 0, 0, 1.5); g.restore();
    sub(g, 'LEFT IN YOUR CHECK: $' + fmt(left), 0, 160, th.inkSoft, 28); if (S.goneAt != null && t >= S.goneAt) stamp(g, 'THEN IT’S GONE', 0, 165, 'bad', th, 56, -0.06, pk(t, S.goneAt));
    g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function growth(g, p, lt, t, th, S) {
    enter(g, t, S.at, 540, 805); paper(g, -440, -225, 880, 450, 18, { lift: 0.5 }); const bh = 15, n = 20, base = 190; const ga = S.growAt != null ? clamp((t - S.growAt) / 0.8) : 0;
    for (let i = 0; i < 16; i++) { clay(g, -380, base - (i + 1) * (bh + 2), 250, bh, 4, GREEN, { shadowK: 0.15 }); }
    for (let i = 16; i < n; i++) { const q = clamp((ga * 4 - (i - 16))); if (q <= 0) continue; g.save(); g.globalAlpha *= q; clay(g, -380, base - (i + 1) * (bh + 2) - (1 - q) * 30, 250, bh, 4, GOLDC, { shadowK: 0.2 }); g.restore(); }
    txt(g, '$16.1T', -255, base + 28, F.monoX(22), th.inkSoft); if (ga > 0.9) { txt(g, '+$4 TRILLION', -105, -150, F.hero(46), '#B88700', 'left'); sub(g, 'IN ONE YEAR', -105, -112, th.inkSoft, 22, 'left'); }
    const ca = t - (S.checkAt ?? 9999); if (ca > 0) { const k = pk(t, S.checkAt); g.save(); g.translate(250, 40); g.scale(0.7 + 0.3 * k, 0.7 + 0.3 * k); g.globalAlpha *= clamp(ca / 0.08); check(g, 360, 175, th, '$488', { head: 'JUST THE GROWTH', memo: '$4T ÷ 8.2B' }); sub(g, 'EACH PERSON', 0, 125, th.inkSoft, 26); g.restore(); }
    g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function ratio(g, p, lt, t, th, S) {
    enter(g, t, S.at, 540, 805); paper(g, -440, -225, 880, 450, 18, { lift: 0.5 }); g.save(); g.translate(-270, 10); pile(g, 0, 110, 0.6); sub(g, 'ONE AVERAGE BILLIONAIRE', 0, -90, th.inkSoft, 17); txt(g, '$5.9B', 0, 160, F.hero(76), th.badInk); g.restore();
    const u = ease.inOut(clamp((t - (S.gridAt ?? S.at + 0.5)) / (S.dur || 1.8))), cols = 24, rows = 10, cw = 17.5, rh = 15; for (let i = 0; i < 240; i++) { const c = i % cols, r = Math.floor(i / cols), lit = i < 240 * u; g.fillStyle = lit ? '#e6f4ec' : 'rgba(11,15,20,.08)'; g.strokeStyle = lit ? '#2f6f4f' : 'rgba(0,0,0,0)'; g.lineWidth = 1.5; g.fillRect(-45 + c * cw + 1, -150 + r * (rh + 2), cw - 3, rh); if (lit) g.strokeRect(-45 + c * cw + 1, -150 + r * (rh + 2), cw - 3, rh); }
    txt(g, fmt(Math.round(2.4 * u * 10) / 10, 1) + ' MILLION CHECKS', 165, 100, F.hero(fit('2.4 MILLION CHECKS', F.hero, 410, 62)), th.ink); sub(g, 'EACH SQUARE = 10,000 CHECKS OF $2,451', 165, 150, th.inkSoft, 15);
    g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function ask(g, p, lt, t, th, S) {
    const k = spring(lt, 'bouncy'); g.save(); g.translate(540, 800); g.scale(0.7 + 0.3 * Math.min(1.06, k), 0.7 + 0.3 * Math.min(1.06, k)); g.globalAlpha *= clamp(k * 2);
    const sz = Math.min(fit(S.l1, F.hero, 900, 112), fit(S.l2, F.hero, 900, 112)); stk(g, S.l1, 0, -62, F.hero(sz), th.accent, 'center', 16); stk(g, S.l2, 0, 62, F.hero(sz), th.good, 'center', 16); g.restore(); }
  const SC = { pile: pile_, assumes, trillion, people, samecheck, check: check_, once, vs, perday, growth, ratio, ask };
  Object.assign(window.BQ.h, { fit, stk, chip, label, mw });
  // ---------- the stage ----------
  const val = (v, t) => { if (v && typeof v === 'object') { const u = ease.out(clamp((t - v.at) / (v.dur || 1))), x = lerp(v.from || 0, v.to, u); return (v.pre || '') + fmt(v.dec ? x : Math.round(x), v.dec || 0) + (v.suf || ''); } return v; };
  B.register('bstage', {
    defaults: { C: [], scenes: [], hook: null, hideCounter: [], beats: [], notes: [] }, ownEnter: true, size: () => [1080, 1920],
    draw(g, p, env) {
      const { t, theme: th } = env; g.translate(-540, -960);
      let bl = ''; for (const b of p.beats) if (t >= b[0]) bl = b[1]; if (bl) { const k = spring(t - (p.beats.find(b => b[1] === bl)[0]), 'snappy'); g.save(); g.globalAlpha *= clamp(k * 2); label(g, bl, 990, 264, th.accent, 26, 'right'); g.restore(); }
      let seg = p.C[0]; for (const s of p.C) if (t >= s.from) seg = s; const hid = p.hideCounter.some(([a, b]) => t >= a && t < b), segT = t - seg.from, pop = 1 + 0.05 * hit(Math.min(0.5, Math.max(0, segT)), 8);
      if (!hid) {
        g.save(); g.translate(540, 437); g.scale(pop, pop); g.translate(-540, -437); paper(g, 70, 322, 940, 230, 26, { lift: 0.3 });
        const L = [seg.L[0], val(seg.L[1], t)], R = [seg.R[0], val(seg.R[1], t)]; g.fillStyle = 'rgba(11,15,20,.14)'; rr(g, 98, 344, 884, 22, 11); g.fill();
        label(g, L[0], 100, 398, th.inkSoft, 26, 'left'); label(g, R[0], 980, 398, th.inkSoft, 26, 'right');
        const sL = fit(L[1], F.hero, 430, 118, 40), sR = fit(R[1], F.hero, 430, 118, 40), cc = c => c === 'bad' ? th.badInk : c === 'good' ? '#0E9F55' : c === 'gold' ? '#B88700' : th.ink;
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
  window.BQ.make = function (c0) {
    const B = window.BM2, T = B.makeT((window.BM2_VOICE || {}).words || []), c = B.deepT(c0, T);
    const els = [], extra = c.sfx2 || [], auto = [];
    const A = (at, name, gain = -9, dur = 0.5) => { if (at != null && at >= 0) auto.push({ at, name, gain, dur }); };
    c.scenes.forEach((sc, i) => { if (i > 0) A(sc.from, i % 2 ? 'whoosh_1' : 'whoosh_2', -11, 0.6);
      switch (sc.type) {
        case 'pile': A(sc.at ?? sc.from, 'pop_2'); A(sc.labelAt, 'pop_1', -10); A(sc.plateAt, 'pop_1', -10); A(sc.sliceAt, 'cash_rustle_1', -11, 1.2); A(sc.crowdAt, 'pop_1', -12, 0.5); A(sc.checkAt, 'success_chime_1', -11, 0.9); break;
        case 'assumes': A(sc.at, 'pop_2'); (sc.rows || []).forEach(r => A(r.at, 'typewriter_1', -11, 0.9)); A(sc.stampAt, 'rubber_stamp_1', -8); break;
        case 'trillion': A(sc.gridAt ?? sc.at + 0.3, 'money_counter_2', -13, sc.dur || 1.6); A(sc.eqAt, 'pop_1', -9); break;
        case 'people': A(sc.at, 'pop_2'); A(sc.sliceAt, 'cash_rustle_1', -11, 1.6); A(sc.youAt, 'success_chime_1', -11, 0.9); break;
        case 'samecheck': A(sc.babyAt, 'pop_2'); A(sc.grandAt, 'pop_2'); A(sc.youAt, 'pop_2'); A(sc.eqAt, 'rubber_stamp_1', -8); break;
        case 'check': A(sc.at, 'pop_2'); A(sc.numAt ?? sc.at, 'money_counter_2', -12, 1.1); A(sc.stampAt, 'rubber_stamp_1', -7); break;
        case 'once': A(sc.at, 'pop_2'); A(sc.onceAt ?? sc.at + 0.3, 'rubber_stamp_1', -8); break;
        case 'vs': A(sc.at, 'pop_2'); A(sc.bigAt, 'swipe_1', -11, 0.5); A(sc.smallAt, 'wrong_buzzer_1', -13, 0.8); break;
        case 'perday': A(sc.at, 'pop_2'); A(sc.gridAt, 'clock_ticking_1', -14, sc.dur || 2.4); A(sc.goneAt, 'rubber_stamp_1', -7); break;
        case 'growth': A(sc.at, 'pop_2'); A(sc.growAt, 'riser_1', -14, 1.0); A(sc.checkAt, 'success_chime_1', -11, 0.9); break;
        case 'ratio': A(sc.at, 'pop_2'); A(sc.gridAt ?? sc.at + 0.5, 'money_counter_2', -13, sc.dur || 1.8); break;
        case 'ask': A(sc.from, 'pop_1'); break;
      } (sc.chips || []).forEach(ch => A(ch.at, 'pop_1', -11, 0.4)); (sc.tags || []).forEach(tg => A(tg.at, 'pop_1', -11, 0.4)); });
    els.push({ id: 'stage', type: 'bstage', layer: 'screen', at: [540, 960], in: -1, z: 10, props: { C: c.C, scenes: c.scenes, hook: c.hook, hideCounter: c.hideCounter || [], beats: c.labels, notes: c.notes || [] } });
    els.push({ id: 'you', type: 'you', layer: 'screen', at: [150, 1213], scale: 0.82, in: -1, z: 20, props: { keys: c.you } });
    els.push({ id: 'hypo', type: 'hypo', layer: 'screen', at: [545, 1316], in: 0.2, z: 20, props: { text: 'HYPOTHETICAL · PRETEND IT’S ALL CASH · SPLIT ONCE' } });
    if (c.cta.like) els.push({ id: 'heart', type: 'heart', layer: 'screen', at: [520, 1205], in: c.cta.like, z: 30, props: { s: 1, dur: 1.0 } });
    if (c.cta.send) els.push({ id: 'plane', type: 'plane', layer: 'screen', at: [0, 0], in: c.cta.send, z: 30, props: { from: [330, 1275], to: [760, 1160], dur: 1.2, s: 0.7 }, out: c.cta.send + 1.5 });
    if (c.cta.follow) els.push({ id: 'follow', type: 'follow', layer: 'screen', at: [520, 1215], in: c.cta.follow, out: c.cta.followOut, z: 30, props: { press: 0.75 } });
    if (c.cta.bubble) els.push({ id: 'bubble', type: 'bubble', layer: 'screen', at: [520, 1205], in: c.cta.bubble.at, z: 30, props: { l1: c.cta.bubble.l1, l2: c.cta.bubble.l2, size: 40, tail: 'left' } });
    const beats = c.scenes.map((s, i) => ({ at: s.from, beat: 'wide', focus: { x: 540 + DX[i % DX.length], y: 740 + (i % 2 ? 90 : -60), w: 1080, h: 300 }, fill: 1, dur: 0.8, st: ST, pose: s.pose || 'talk' }));
    beats.unshift({ at: 0, beat: 'wide', focus: { x: 540, y: 740, w: 1080, h: 300 }, fill: 1, st: ST, pose: 'shock' });
    return {
      series: 'whatif', title: 'EVERY BILLIONAIRE, SPLIT', duration: c.dur,
      footnote: ['ASSUMES: MOSTLY COMPANY SHARES — WE PRETEND IT’S ALL CASH · SPLIT ONCE · NO PRICE DROP', 'FORBES MARCH 2026 LIST · 3,428 BILLIONAIRES · $20.1T · ~8.2B PEOPLE · HYPOTHETICAL · OUR MATH'],
      elements: els, beats, poses: [...(c.cta.follow ? [[c.cta.follow, 'follow', { target: [520, 1215] }]] : []), ...(c.poses || [])], shakes: c.shakes, captions: c.captions, bed: c.bed || { name: 'acoustic_bed_1', gain: -1 }, sfx: [...auto, ...extra],
    };
  };
})();
// IG cut — WHAT IF: billionaire split. Hook = 'your cut of $20T is smaller than you think' (pile, crowd, tiny check). Order: pile · 3,428 · $20.1T · trillion=1,000 billions · ASSUMES · double tap · people grid · same check · YOU check · not monthly · millionaires bar · $6.72/day · +$4T · $488 · average billionaire = 2.4M checks · pile sliced · ask
const H = { until: 3.7, y: 668, size: 58, lines: [[['YOUR CUT OF $20 TRILLION', 'paper']], [['IS SMALLER', 'bad']], [['THAN YOU THINK', 'accent']]] };
const S = BQ.make({
  dur: 73.27,
  C: [
    { from: 0, L: ['YOUR CUT OF', '$20.1 TRILLION'], R: ['BILLIONAIRES', '3,428'], Lc: 'good', Rc: 'gold' },
    { from: 4.2, L: ['BILLIONAIRES', { from: 0, to: 3428, at: 4.56, dur: 0.9 }], R: ['FORBES LIST', 'MARCH 2026'], Lc: 'gold' },
    { from: 7.7, L: ['ALTOGETHER', '$20.1 TRILLION'], R: ['BILLIONAIRES', '3,428'], Lc: 'good', Rc: 'gold' },
    { from: 11.2, L: ['1 TRILLION', '1,000 BILLIONS'], R: ['A BILLION IS', '1,000 MILLIONS'], Lc: 'good' },
    { from: 15.0, L: ['MOSTLY', 'COMPANY SHARES'], R: ['NOT', 'CASH'], Lc: 'gold', Rc: 'bad' },
    { from: 19.0, L: ['WE PRETEND', 'IT’S CASH'], R: ['SPLIT EVENLY', 'ONCE'], Lc: 'gold', Rc: 'good' },
    { from: 24.9, L: ['DIVIDED BY', '8.2 BILLION'], R: ['HUMANS', 'ALIVE'], Lc: 'good' },
    { from: 28.5, L: ['EVERY PERSON', 'THE SAME'], R: ['NEWBORN OR', 'GRANDMA'], Lc: 'gold' },
    { from: 33.0, L: ['YOUR CHECK', { from: 0, to: 2451, at: 34.08, dur: 1.0, pre: '$' }], R: ['$20.1T', '÷ 8.2B'], Lc: 'good' },
    { from: 36.4, L: ['YOUR CHECK', '$2,451'], R: ['HOW OFTEN', 'ONE TIME'], Lc: 'good', Rc: 'bad' },
    { from: 39.7, L: ['A MILLIONAIRE', '$1,000,000'], R: ['YOUR CHECK', '$2,451'], Lc: 'gold', Rc: 'bad' },
    { from: 43.2, L: ['PER DAY, ONE YEAR', '$6.72'], R: ['BASICALLY', 'A SANDWICH'], Lc: 'good', Rc: 'gold' },
    { from: 48.9, L: ['THE LIST GREW', '+$4 TRILLION'], R: ['IN', 'ONE YEAR'], Lc: 'gold' },
    { from: 53.0, L: ['GROWTH ALONE', '$488'], R: ['PER PERSON', 'ONE TIME'], Lc: 'good' },
    { from: 59.4, L: ['AVERAGE BILLIONAIRE', '$5.9B'], R: ['EQUALS', '2.4M CHECKS'], Lc: 'gold', Rc: 'good' },
    { from: 66.5, L: ['BIG PILE', 'SURE'], R: ['SLICES', '8.2 BILLION'], Lc: 'gold', Rc: 'good' },
  ],
  hook: H,
  scenes: [
    { type: 'pile', from: 0, to: 4.2, pose: 'shock', sc: 0.78, dy: 95, at: 0, labelAt: 3.95, plateAt: 0.4, sliceAt: 1.7, crowdAt: 1.5, checkAt: 2.3, labelOut: 99 },
    { type: 'pile', from: 4.2, to: 7.7, pose: 'talk', at: 4.2, plateAt: 4.25 },
    { type: 'pile', from: 7.7, to: 11.2, pose: 'talk', at: 7.7, plateAt: 7.75, labelAt: 8.82 },
    { type: 'trillion', from: 11.2, to: 15.0, pose: 'chin', at: 11.2, gridAt: 11.5, dur: 1.6, eqAt: 12.28 },
    { type: 'assumes', from: 15.0, to: 22.2, pose: 'chin', at: 15.0, rows: [{ at: 16.3, text: 'MOSTLY COMPANY SHARES', tone: 'bad' }, { at: 17.7, text: 'NOT CASH', tone: 'bad' }, { at: 19.3, text: 'WE PRETEND IT’S ALL CASH' }, { at: 20.3, text: 'SPLIT EVENLY, ONCE' }, { at: 21.0, text: 'FORBES MARCH 2026 LIST · ~8.2B PEOPLE' }], stampAt: 19.5 },
    { type: 'ask', from: 22.2, to: 24.9, pose: 'you', l1: 'ALREADY KNOW', l2: 'WHAT YOU’D BUY?' },
    { type: 'people', from: 24.9, to: 28.5, pose: 'shock', at: 25.0, sliceAt: 26.9, you: 109, youAt: 27.8 },
    { type: 'samecheck', from: 28.5, to: 33.0, pose: 'shock', babyAt: 28.6, grandAt: 29.86, youAt: 30.6, eqAt: 32.24 },
    { type: 'check', from: 33.0, to: 36.4, pose: 'shock', at: 33.1, numAt: 34.08, note: 'ABOUT $2,450' },
    { type: 'once', from: 36.4, to: 39.7, pose: 'chin', at: 36.5, onceAt: 37.7, tags: [{ at: 37.0, text: 'NOT MONTHLY', tone: 'bad', y: 612 }] },
    { type: 'vs', from: 39.7, to: 43.2, pose: 'you', at: 39.8, bigAt: 41.8, smallAt: 42.6, chips: [{ at: 41.6, text: 'WE’D ALL BE MILLIONAIRES?', tone: 'gold', y: 1050 }] },
    { type: 'perday', from: 43.2, to: 48.9, pose: 'shock', at: 43.3, gridAt: 43.6, dur: 4.6, sandAt: 46.8, goneAt: 47.95 },
    { type: 'growth', from: 48.9, to: 56.3, pose: 'shock', at: 49.0, growAt: 50.4, checkAt: 54.28, chips: [{ at: 51.8, text: 'GROWTH ALONE, ONE YEAR', tone: 'gold', y: 1062 }], chipOut: 54.1 },
    { type: 'ask', from: 56.3, to: 59.4, pose: 'you', l1: 'FOLLOW: THE LAST', l2: 'ONE’S THE CRAZIEST' },
    { type: 'ratio', from: 59.4, to: 66.5, pose: 'shock', at: 59.5, gridAt: 63.3, dur: 2.4 },
    { type: 'pile', from: 66.5, to: 70.7, pose: 'shock', at: 66.5, labelAt: 66.6, plateAt: 66.8, crowdAt: 68.0, sliceAt: 69.2, labelOut: 99 },
    { type: 'ask', from: 70.7, to: 99, pose: 'you', l1: 'WOULD YOUR CUT', l2: 'CHANGE YOUR YEAR?' },
  ],
  hideCounter: [[70.7, 99]],
  labels: [[0, 'THE PILE'], [4.2, 'THE LIST'], [11.2, 'THE TRILLION'], [15.0, 'THE ASSUMPTION'], [24.9, 'THE SPLIT'], [33.0, 'YOUR CHECK'], [39.7, 'THE REALITY'], [43.2, 'PER DAY'], [48.9, 'THE TWIST'], [59.4, 'THE AVERAGE']],
  notes: [],
  you: [{ at: 0, mood: 'wow', text: 'YOU: IN LINE' }, { at: 2.3, mood: 'worried', text: 'YOUR CUT', held: 'check' }, { at: 7.7, mood: 'neutral', text: '$20.1 TRILLION' }, { at: 15.0, mood: 'worried', text: 'ALL CASH?' }, { at: 25.0, mood: 'neutral', text: 'ONE OF 8.2B' }, { at: 30.6, mood: 'happy', text: 'SAME CHECK', held: 'check' },
    { at: 34.1, mood: 'wow', text: '$2,451', held: 'check' }, { at: 37.5, mood: 'worried', text: 'JUST ONCE', held: 'check' }, { at: 42.6, mood: 'angry', text: 'NOT A MILLION', held: 'check' }, { at: 44.0, mood: 'neutral', text: '$6.72 A DAY', held: 'check' }, { at: 46.8, mood: 'happy', text: 'A SANDWICH', held: 'sandwich' }, { at: 48.2, mood: 'worried', text: 'THEN IT’S GONE' },
    { at: 50.0, mood: 'wow', text: 'LIST GREW $4T' }, { at: 54.28, mood: 'happy', text: '$488 EACH', held: 'check' }, { at: 59.8, mood: 'neutral', text: 'THE AVERAGE' }, { at: 63.4, mood: 'wow', text: '2.4M CHECKS' }, { at: 68.0, mood: 'smirk', text: '8.2B SLICES' }, { at: 70.8, mood: 'neutral', text: 'YOUR CUT?', held: 'check' }],
  cta: { like: 22.26, send: 39.98, follow: 56.3, followOut: 58.1, bubble: { at: 71.5, l1: 'WOULD YOUR CUT', l2: 'CHANGE YOUR YEAR?' } },
  poses: [[22.3, 'you'], [40.0, 'you']],
  shakes: [[0.1, 8], [34.08, 10], [42.6, 10], [63.4, 10]],
  captions: { gap: 16, emph: { '$20': 'good', '.1': 'good', 'trillion.': 'good', 'check.': 'good', '$2': 'good', ',450.': 'good', 'once.': 'bad', 'sandwich': 'accent', 'day.': 'accent', '$488': 'good', 'billion': 'good' }, fix: [["it's 672 a", "it's $6.72 a"]] },
  sfx2: [
    { at: 0.04, name: 'deep_boom_2', gain: -4, dur: 0.36 }, { at: 22.26, name: 'pop_2', gain: -9, dur: 0.3 }, { at: 39.93, name: 'swoosh_1', gain: -9, dur: 0.9 },
    { at: 56.35, name: 'pop_1', gain: -9, dur: 0.5 }, { at: 57.1, name: 'click_1', gain: -8, dur: 0.3 }, { at: 57.2, name: 'success_chime_1', gain: -12, dur: 1.2 }, { at: 71.5, name: 'pop_1', gain: -9, dur: 0.5 },
  ],
});
BM2.scene(S);
