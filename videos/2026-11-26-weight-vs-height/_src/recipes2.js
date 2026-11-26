// ===== Weight vs height — recipes 2 (re-edit, long cut). Appended after recipes.js =====
// offer    : two trays slide in (A twenties pile, B hundreds stack), KEEP ONE tag
// gram     : tiny balance, $20 vs $100 settle level, 1 G tags, SAME WEIGHT ribbon
// rows     : POUNDS bar (long) vs INCHES bar (short)
// calendar : $100-a-day months filling up, years counter
// totals   : two columns $1.6M (hundreds) vs $1.8M (twenties) + gap tag
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, burst, roll } = B;
  const GREEN = '#1FA366', HUN = '#3BBE86';
  const bill = (g, x, y, w, h, c) => { clay(g, x, y, w, h - 1, Math.min(5, h / 3), c || GREEN, { shadowK: 0.4 }); g.fillStyle = 'rgba(245,243,238,.8)'; g.fillRect(x + w * 0.42, y + 1, w * 0.16, h - 3); };
  const pop = (t, a) => (t < a ? 0 : Math.max(0, spring(t - a, 'bouncy')));

  // ---------- offer ----------
  B.register('offer', {
    defaults: { keepAt: 99999 }, ownEnter: true, size: () => [1180, 700],
    anchors: () => ({ a: [-330, 60, 420, 440], b: [330, 60, 420, 440], keep: [0, -345, 500, 120], all: [0, -40, 1180, 700] }),
    draw(g, p, env) {
      const { t, theme, lt } = env; const k1 = ease.out(clamp(lt / 0.45)), k2 = ease.out(clamp((lt - 0.12) / 0.45));
      g.save(); g.globalAlpha *= clamp(lt / 0.06);
      // THE STRANGER stands between the two piles, arms out to both
      { const ks = ease.out(clamp((lt - 0.05) / 0.5)); g.save(); g.translate(0, 235 + 300 * (1 - ks)); g.scale(1.25, 1.25); window.BMCHAR(g, theme, 'stranger', t >= p.keepAt ? 'smug' : 'grin', t, { arms: 'spread' }); g.restore();
        if (lt < 2.0) { g.save(); g.globalAlpha *= clamp((lt - 0.3) / 0.2) * (1 - clamp((lt - 1.7) / 0.3)); g.translate(0, 270); clay(g, -150, -28, 300, 56, 16, theme.paper, { shadowK: 0.5 }); txt(g, 'THE STRANGER', 0, 3, F.hero(36), theme.ink); g.restore(); } }
      // A tray from left
      g.save(); g.translate(lerp(-900, -330, k1), 60);
      clay(g, -210, 120, 420, 60, 24, theme.navy, { shadowK: 0.8 });
      for (let r = 0; r < 7; r++) for (let c = 0; c < 8 - r; c++) { g.save(); g.translate((c - (8 - r - 1) / 2) * 44, 104 - r * 17); bill(g, -22, -10, 44, 20, GREEN); g.restore(); }
      clay(g, -130, -220, 260, 84, 24, theme.good, { shadowK: 0.6 }); txt(g, 'A', -80, -178, F.hero(60), '#0B0F14'); txt(g, '$20s', 30, -176, F.hero(46), '#0B0F14');
      g.restore();
      // B tray from right
      g.save(); g.translate(lerp(900, 330, k2), 60);
      clay(g, -210, 120, 420, 60, 24, theme.navy, { shadowK: 0.8 });
      clay(g, -75, -90, 150, 205, 8, HUN, { shadowK: 0.7 }); g.save(); rr(g, -75, -90, 150, 205, 8); g.clip(); g.fillStyle = 'rgba(11,15,20,.16)'; for (let y = 110; y > -90; y -= 7) g.fillRect(-75, y, 150, 2); g.fillStyle = 'rgba(245,243,238,.55)'; g.fillRect(-12, -90, 24, 205); g.restore();
      clay(g, -130, -220, 260, 84, 24, theme.accent, { shadowK: 0.6 }); txt(g, 'B', -80, -178, F.hero(60), '#0B0F14'); txt(g, '$100s', 30, -176, F.hero(46), '#0B0F14');
      g.restore();
      // KEEP ONE tag
      if (t >= p.keepAt) { const s = t - p.keepAt, kk = pop(t, p.keepAt); g.save(); g.translate(0, -345); g.rotate(-0.04 * (1 - kk)); g.scale(0.4 + 0.6 * kk, 0.4 + 0.6 * kk); clay(g, -260, -52, 520, 104, 26, theme.paper, { shadowK: 0.7 }); txt(g, 'KEEP ONE', 0, 4, F.hero(72), theme.ink); g.restore(); }
      g.restore();
    },
  });

  // ---------- gram ----------
  B.register('gram', {
    defaults: { gAt: 99999, sameAt: 99999, dropAt: 0 }, ownEnter: true, size: () => [960, 640],
    anchors: () => ({ l: [-300, 40, 300, 300], r: [300, 40, 300, 300], same: [0, 270, 700, 110], all: [0, 0, 960, 640] }),
    draw(g, p, env) {
      const { t, theme, lt } = env; const k = Math.max(0, spring(lt, { f: 2.1, z: 0.55 }));
      g.save(); g.globalAlpha *= clamp(lt / 0.06); g.translate(0, -500 * (1 - Math.min(1.06, k)));
      paper(g, -480, -320, 960, 640, 28, { lift: env.lift });
      const settle = Math.exp(-(t - p.dropAt) * 3.2) * Math.cos((t - p.dropAt) * 9), tilt = t < p.dropAt ? 0.16 : 0.16 * settle; // radians
      // post
      clay(g, -20, -70, 40, 330, 10, theme.navy, { shadowK: 0.6 }); clay(g, -150, 250, 300, 36, 14, theme.navy, { shadowK: 0.6 });
      g.save(); g.translate(0, -80); g.rotate(tilt);
      clay(g, -380, -12, 760, 24, 12, theme.ink, { shadowK: 0.5 });
      const pan = (x, label, c, tc) => { g.save(); g.translate(x, 0); g.rotate(-tilt); g.strokeStyle = theme.ink; g.lineWidth = 4; g.beginPath(); g.moveTo(0, 0); g.lineTo(-90, 150); g.moveTo(0, 0); g.lineTo(90, 150); g.stroke(); clay(g, -110, 150, 220, 26, 12, theme.navy, { shadowK: 0.6 });
        const by = 150 - 40 - 20; g.save(); g.translate(0, by); const drop = ease.out(clamp((t - p.dropAt) / 0.3)); g.translate(0, -160 * (1 - drop)); g.rotate(x < 0 ? -0.05 : 0.05); bill(g, -90, -40, 180, 80, c); txt(g, label, 0, 4, F.hero(48), tc); g.restore();
        if (t >= p.gAt) { const kk = pop(t, p.gAt); g.save(); g.translate(0, 220); g.scale(0.4 + 0.6 * kk, 0.4 + 0.6 * kk); clay(g, -90, -34, 180, 68, 22, theme.ink, { shadowK: 0.6 }); txt(g, '1 GRAM', 0, 3, F.monoX(30), theme.accent); g.restore(); }
        g.restore(); };
      pan(-300, '$20', GREEN, '#F5F3EE'); pan(300, '$100', '#5BD6A0', '#0B0F14');
      g.restore();
      clay(g, -14, -100, 28, 28, 14, theme.accent, { shadowK: 0.4 });
      if (t >= p.sameAt) { const kk = pop(t, p.sameAt); g.save(); g.translate(0, 265); g.scale(0.5 + 0.5 * kk, 0.5 + 0.5 * kk); clay(g, -330, -50, 660, 100, 26, theme.good, { shadowK: 0.7 }); txt(g, 'SAME WEIGHT', 0, 4, F.hero(64), '#0B0F14'); g.restore(); }
      g.restore();
    },
  });

  // ---------- rows ----------
  B.register('rows', {
    defaults: { lbAt: 99999, inAt: 99999, moreAt: 99999 }, ownEnter: true, size: () => [980, 760],
    anchors: () => ({ lb: [0, -110, 900, 220], inch: [0, 140, 900, 220], more: [0, 300, 700, 110], all: [0, 0, 980, 760] }),
    draw(g, p, env) {
      const { t, theme, lt } = env; const k = Math.max(0, spring(lt, { f: 2.1, z: 0.55 }));
      g.save(); g.globalAlpha *= clamp(lt / 0.06); g.translate(0, 600 * (1 - Math.min(1.06, k)));
      paper(g, -490, -380, 980, 760, 28, { lift: env.lift }); g.save(); rr(g, -490, -380, 980, 760, 28); g.clip(); g.fillStyle = theme.navy; g.fillRect(-490, -380, 980, 100); g.restore();
      txt(g, 'AVERAGE MAN: WHICH IS BIGGER?', 0, -330, F.hero(48), theme.paper);
      const row = (y, at, label, val, full, col, unit, tickEvery) => {
        txt(g, label, -430, y - 78, F.hero(44), theme.ink, 'left');
        g.fillStyle = theme.paperShade; rr(g, -430, y - 50, 860, 90, 20); g.fill();
        if (t >= at) { const s = t - at, w = 860 * full * ease.out(clamp(s / 0.9)); clay(g, -430, y - 50, Math.max(30, w), 90, 20, col, { shadowK: 0.5 });
          g.save(); rr(g, -430, y - 50, Math.max(30, w), 90, 20); g.clip(); g.strokeStyle = 'rgba(11,15,20,.28)'; g.lineWidth = 3; for (let i = 1; i * tickEvery * 860 / 200 < w; i++) { const x = -430 + i * tickEvery * 860 / 200; g.beginPath(); g.moveTo(x, y - 50); g.lineTo(x, y + (i % 5 === 0 ? 40 : 4)); g.stroke(); } g.restore();
          roll(g, val * ease.out(clamp(s / 0.9)), 410, y - 78, { font: F.hero(60), size: 60, color: theme.ink, suffix: unit, align: 'right', speed: s < 0.9 ? 300 : 0 }); }
      };
      row(-130, p.lbAt, 'POUNDS HE WEIGHS', 199, 199 / 200, theme.good, ' LB', 10);
      row(100, p.inAt, 'INCHES HE STANDS', 69, 69 / 200, theme.accent, ' IN', 10);
      if (t >= p.moreAt) { const kk = pop(t, p.moreAt); g.save(); g.translate(0, 290); g.scale(0.5 + 0.5 * kk, 0.5 + 0.5 * kk); g.rotate(-0.03 * (1 - kk)); clay(g, -360, -56, 720, 112, 26, theme.good, { shadowK: 0.7 }); txt(g, 'WAY MORE POUNDS', 0, 5, F.hero(66), '#0B0F14'); g.restore(); }
      g.restore();
    },
  });

  // ---------- calendar ----------
  B.register('calendar', {
    defaults: { at: 99999, dur: 2.2, doneAt: 99999 }, ownEnter: true, size: () => [900, 940],
    anchors: () => ({ head: [0, -400, 860, 120], grid: [0, 0, 820, 640], days: [0, 400, 820, 130], all: [0, 0, 900, 940] }),
    draw(g, p, env) {
      const { t, theme, lt } = env; const k = Math.max(0, spring(lt, { f: 2.1, z: 0.55 }));
      g.save(); g.globalAlpha *= clamp(lt / 0.06); g.translate(0, 700 * (1 - Math.min(1.06, k)));
      paper(g, -450, -470, 900, 940, 28, { lift: env.lift }); g.save(); rr(g, -450, -470, 900, 940, 28); g.clip(); g.fillStyle = theme.navy; g.fillRect(-450, -470, 900, 120); g.restore();
      txt(g, '$100 A DAY', -400, -420, F.hero(54), theme.paper, 'left'); txt(g, 'EACH SQUARE = ONE MONTH', -398, -376, F.mono(22), rgba(theme.paper, 0.78), 'left');
      const u = ease.inOut(clamp((t - p.at) / p.dur)), months = 67 * u, cols = 7, cw = 104, gx = -(cols * cw) / 2 + cw / 2;
      for (let i = 0; i < 70; i++) { const c = i % cols, r = Math.floor(i / cols), x = gx + c * cw, y = -250 + r * 62, on = i < months;
        if (!on) { g.fillStyle = theme.paperShade; rr(g, x - 45, y - 24, 90, 48, 10); g.fill(); }
        else { const pk = i > months - 3 ? 1 + 0.15 * Math.sin((months - i) * 3) : 1; g.save(); g.translate(x, y); g.scale(pk, pk); bill(g, -45, -24, 90, 48, HUN); txt(g, '$', 0, 3, F.hero(30), '#0B0F14'); g.restore(); } }
      const days = Math.round(2030 * u); roll(g, days, -110, 410, { font: F.hero(96), size: 96, color: theme.ink, align: 'right', speed: u > 0 && u < 1 ? 2000 : 0 });
      txt(g, 'DAYS', -90, 420, F.hero(48), theme.inkSoft, 'left');
      if (t >= p.doneAt) { const kk = pop(t, p.doneAt); g.save(); g.translate(250, 410); g.rotate(-0.06); g.scale(0.4 + 0.6 * kk, 0.4 + 0.6 * kk); clay(g, -170, -62, 340, 124, 26, theme.accent, { shadowK: 0.7 }); txt(g, '5½ YEARS', 0, 6, F.hero(66), '#0B0F14'); g.restore(); burst(g, 250, 410, 260, theme.accent, t - p.doneAt - 0.05, 16, 0.5); }
      g.restore();
    },
  });

  // ---------- totals ----------
  B.register('totals', {
    defaults: { hAt: 99999, wAt: 99999, gapAt: 99999 }, ownEnter: true, size: () => [980, 900],
    anchors: () => ({ h: [-230, 80, 380, 700], w: [230, 80, 380, 700], hv: [-230, -330, 420, 110], wv: [230, -330, 420, 110], gap: [0, 360, 780, 130], all: [0, 0, 980, 900] }),
    draw(g, p, env) {
      const { t, theme, lt } = env; const k = Math.max(0, spring(lt, { f: 2.1, z: 0.55 }));
      g.save(); g.globalAlpha *= clamp(lt / 0.06); g.translate(0, 700 * (1 - Math.min(1.06, k)));
      paper(g, -490, -450, 980, 900, 28, { lift: env.lift }); g.save(); rr(g, -490, -450, 980, 900, 28); g.clip(); g.fillStyle = theme.navy; g.fillRect(-490, -450, 980, 96); g.restore();
      txt(g, 'SIDE BY SIDE (AVG MAN)', 0, -402, F.hero(46), theme.paper);
      const base = 250, top = 480;
      const col = (x, at, v, col2, label, vcol) => { const u = t >= at ? ease.expo(clamp((t - at) / 1.0)) : 0, h = (v / 1.8e6) * top * u; clay(g, x - 120, base - h, 240, Math.max(4, h), 14, col2, { shadowK: 0.6 }); g.save(); rr(g, x - 120, base - h, 240, Math.max(4, h), 14); g.clip(); g.fillStyle = 'rgba(11,15,20,.14)'; for (let y = base - 4; y > base - h; y -= 9) g.fillRect(x - 120, y, 240, 2); g.restore();
        txt(g, label, x, base + 36, F.hero(44), theme.ink); roll(g, v * u, x, -300, { font: F.hero(78), size: 78, color: vcol, prefix: '$', speed: u > 0 && u < 1 ? 1800000 : 0 }); };
      g.fillStyle = rgba(theme.ink, 0.4); rr(g, -440, base, 880, 6, 3); g.fill();
      col(-230, p.hAt, 1602300, HUN, 'HEIGHT IN $100s', theme.goodInk); col(230, p.wAt, 1805280, GREEN, 'WEIGHT IN $20s', theme.goodInk);
      if (t >= p.gapAt) { const kk = pop(t, p.gapAt); g.save(); g.translate(0, 360); g.scale(0.4 + 0.6 * kk, 0.4 + 0.6 * kk); clay(g, -380, -56, 760, 112, 28, theme.good, { shadowK: 0.8 }); txt(g, '$20s WIN BY $202,980', 0, 6, F.hero(60), '#0B0F14'); g.restore(); burst(g, 0, 360, 380, theme.good, t - p.gapAt - 0.05, 18, 0.6); }
      g.restore();
    },
  });
})();
