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
      if (bt > 0.35) { const sk = spring(bt - 0.35, 'bouncy'); g.save(); g.translate(250, 20); g.rotate(-0.07); g.scale(clamp(sk, 0.3, 1.1), clamp(sk, 0.3, 1.1)); clay(g, -210, -44, 420, 88, 22, th.accent, { shadowK: 0.7 }); txt(g, 'DAY 30', 0, 4, F.hero(70), th.ink); g.restore(); burst(g, 250, 20, 260, th.accent, bt - 0.4, 14, 0.45); }
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
      { id: 'btn', type: 'follow', layer: 'screen', at: [650, 1120], in: Q.follow + '+0.05', out: Q.follow + '+1.45', props: { press: 0.55 } },
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
      bd(Q.like, 'presenter-front', 'dbl', { sy: 885, st: undefined, pose: 'you' }),
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
      elements: els, beats, poses: [[Q.follow, 'follow', { target: [650, 1120] }], ...(c.poses || [])], shakes: c.shakes, captions: c.captions, bed: c.bed || { name: 'upbeat_bed_2', gain: -1 }, sfx: c.sfx,
    };
  };
})();
