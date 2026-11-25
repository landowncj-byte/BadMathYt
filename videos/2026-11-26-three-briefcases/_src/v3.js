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
