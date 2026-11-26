// ===== recap: scale vs tape measure side by side (the recap line) =====
// props: lbAt (199 LB of $20s pops), inAt (69 IN of $100s pops), vsAt (VS badge), lb, inch
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, burst, roll } = B;
  const GREEN = '#1FA366', HUN = '#3BBE86';
  const pop = (t, a) => (t < a ? 0 : Math.max(0, spring(t - a, 'bouncy')));
  B.register('recap', {
    defaults: { lbAt: 99999, inAt: 99999, vsAt: 99999, lb: 199, inch: 69, head: 'THE MATCHUP' }, ownEnter: true, size: () => [980, 760],
    anchors: () => ({ l: [-235, 30, 400, 560], r: [235, 30, 400, 560], vs: [0, 30, 160, 160], all: [0, 0, 980, 760] }),
    draw(g, p, env) {
      const { t, theme, lt } = env; const k = Math.max(0, spring(lt, { f: 2.1, z: 0.55 }));
      g.save(); g.globalAlpha *= clamp(lt / 0.06); g.translate(0, 600 * (1 - Math.min(1.06, k)));
      paper(g, -490, -380, 980, 760, 28, { lift: env.lift }); g.save(); rr(g, -490, -380, 980, 760, 28); g.clip(); g.fillStyle = theme.navy; g.fillRect(-490, -380, 980, 100); g.restore();
      txt(g, p.head, 0, -330, F.hero(52), theme.paper);
      g.fillStyle = theme.paperShade; rr(g, -465, -260, 440, 560, 22); g.fill(); rr(g, 25, -260, 440, 560, 22); g.fill();
      // left: scale with $20 pile
      { const s = t - p.lbAt, kk = pop(t, p.lbAt); if (t >= p.lbAt) { g.save(); g.translate(-245, 0); g.scale(0.7 + 0.3 * kk, 0.7 + 0.3 * kk); g.globalAlpha *= clamp(s / 0.08);
          clay(g, -170, 120, 340, 50, 20, theme.navy, { shadowK: 0.7 });
          for (let r = 0; r < 6; r++) for (let c = 0; c < 7 - r; c++) { g.save(); g.translate((c - (7 - r - 1) / 2) * 40, 100 - r * 16); clay(g, -19, -8, 38, 16, 4, GREEN, { shadowK: 0.3 }); g.fillStyle = 'rgba(245,243,238,.8)'; g.fillRect(-4, -7, 7, 13); g.restore(); }
          g.fillStyle = theme.paper; g.beginPath(); g.arc(0, -70, 62, 0, 7); g.fill(); g.strokeStyle = theme.ink; g.lineWidth = 4; g.stroke();
          const a = -Math.PI * 1.1 + ease.out(clamp(s / 0.8)) * Math.PI * 1.25; g.save(); g.translate(0, -70); g.rotate(a); g.fillStyle = theme.bad; g.beginPath(); g.moveTo(-6, -4); g.lineTo(46, 0); g.lineTo(-6, 4); g.fill(); g.restore();
          roll(g, p.lb * ease.expo(clamp(s / 0.7)), 0, -190, { font: F.hero(92), size: 92, color: theme.goodInk, suffix: ' LB', speed: s < 0.7 ? 400 : 0 });
          txt(g, 'OF $20s', 0, 225, F.hero(50), theme.ink); g.restore(); burst(g, -245, -190, 200, theme.good, s - 0.05, 12, 0.4); } }
      // right: tape measure + $100 stack
      { const s = t - p.inAt, kk = pop(t, p.inAt); if (t >= p.inAt) { g.save(); g.translate(245, 0); g.scale(0.7 + 0.3 * kk, 0.7 + 0.3 * kk); g.globalAlpha *= clamp(s / 0.08);
          const hh = 300 * ease.out(clamp(s / 0.8)); clay(g, -150, 170 - hh, 70, Math.max(10, hh), 8, '#F2B705', { shadowK: 0.5 });
          g.save(); rr(g, -150, 170 - hh, 70, Math.max(10, hh), 8); g.clip(); g.fillStyle = '#0B0F14'; for (let y = 170; y > 170 - hh; y -= 14) g.fillRect(-90 - ((Math.round((170 - y) / 14) % 5 === 0) ? 30 : 16), y, ((Math.round((170 - y) / 14) % 5 === 0) ? 30 : 16), 2); g.restore();
          clay(g, -50, 170 - hh, 130, Math.max(10, hh), 8, HUN, { shadowK: 0.6 }); g.save(); rr(g, -50, 170 - hh, 130, Math.max(10, hh), 8); g.clip(); g.fillStyle = 'rgba(11,15,20,.16)'; for (let y = 166; y > 170 - hh; y -= 7) g.fillRect(-50, y, 130, 2); g.restore();
          clay(g, -170, 170, 280, 24, 10, theme.navy, { shadowK: 0.6 });
          roll(g, p.inch * ease.expo(clamp(s / 0.7)), 0, -190, { font: F.hero(92), size: 92, color: theme.accentInk || theme.ink, suffix: ' IN', speed: s < 0.7 ? 400 : 0 });
          txt(g, 'OF $100s', 0, 225, F.hero(50), theme.ink); g.restore(); burst(g, 245, -190, 200, theme.accent, s - 0.05, 12, 0.4); } }
      if (t >= p.vsAt) { const kk = pop(t, p.vsAt); g.save(); g.translate(0, 20); g.scale(0.3 + 0.7 * kk, 0.3 + 0.7 * kk); g.rotate(-0.08 * (1 - kk)); clay(g, -62, -48, 124, 96, 24, theme.ink, { shadowK: 0.8 }); txt(g, 'VS', 0, 4, F.hero(64), theme.accent); g.restore(); }
      txt(g, 'AVG US MAN · CDC · HYPOTHETICAL', 0, 340, F.mono(20), theme.inkSoft);
      g.restore();
    },
  });
})();
