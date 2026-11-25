import re
s=open('shared.js').read()
def rep(a,b,cnt=1):
    global s
    assert s.count(a)==cnt,(a[:60],s.count(a))
    s=s.replace(a,b)
rep("txt(g, '$500/MONTH × 40 YEARS', x0 + 36, y0 + 52, F.monoX(28), theme.paper, 'left'); txt(g, 'HYPOTHETICAL · 7% ASSUMED', x0 + 38, y0 + 96, F.mono(21), rgba(theme.paper, 0.75), 'left');",
    "txt(g, 'TWO IDENTICAL FUNDS', x0 + 36, y0 + 52, F.hero(40), theme.paper, 'left'); txt(g, 'HYPOTHETICAL · NO REAL FUNDS', x0 + 38, y0 + 96, F.mono(21), rgba(theme.paper, 0.75), 'left');")
rep("defaults: { w: 900, h: 1100, ticker: [[0, 0]], gaps: [], ghostAt: 99999, tagFinal: false },",
    "defaults: { w: 900, h: 1100, ticker: [[0, 0]], gaps: [], ghostAt: 99999, tagFinal: false, feeTagAt: -1, ripAt: 99999, depAt: -1, rateAt: -1, bpAt: -1, bpOut: 99999, coinAt: -1 },")
rep("tag: [0, -300, 840, 110],","tag: [0, -300, 840, 110], btag: [185, 507, 340, 100],")
rep("      // ghost block: what the fee takes from fund B\n",
"""      // blueprint columns (same fund, same size) before the money flows
      if (p.bpAt > -0.5 && t >= p.bpAt && t < p.bpOut + 0.4) { const bt = t - p.bpAt, k = Math.max(0, spring(bt, 'bouncy')), kb = Math.max(0, spring(bt - 0.12, 'bouncy')), fo = 1 - ease.in(lin(t, p.bpOut, p.bpOut + 0.35)), bh = 330, wob = 1 + 0.025 * Math.sin(bt * 14) * Math.exp(-bt * 3);
        g.save(); g.globalAlpha *= clamp(bt / 0.1) * fo; for (const [cx, kk, c] of [[ax, k, theme.good], [bx, kb, theme.gold]]) { const hh = bh * kk * wob; g.fillStyle = rgba(c, 0.22); rr(g, cx - cw / 2, baseY - hh, cw, hh, 14); g.fill(); g.strokeStyle = c; g.lineWidth = 5; g.setLineDash([16, 10]); rr(g, cx - cw / 2, baseY - hh, cw, hh, 14); g.stroke(); g.setLineDash([]); }
        if (bt > 0.3) txt(g, '= SAME', 0, baseY - bh * 0.5, F.hero(64), theme.ink); g.restore(); }
      // coins dripping into both columns while the clock runs
      if (speed > 0.25 || (p.coinAt > -0.5 && t >= p.coinAt && t < p.coinAt + 3)) for (let i = 0; i < 10; i++) { const ph = ((t * 1.7 + i / 10) % 1), cx = (i % 2 ? bx : ax) + (hash(i * 3.3) - 0.5) * 140, cy = lerp(baseY - 640, baseY - Math.max(40, (i % 2 ? hB : hA)) - 20, ph * ph); g.save(); g.globalAlpha *= Math.min(1, ph * 6) * (1 - lin(ph, 0.9, 1)); g.translate(cx, cy); g.scale(1, 0.55); g.fillStyle = '#8a6408'; g.beginPath(); g.arc(0, 8, 17, 0, 7); g.fill(); g.fillStyle = '#F2B705'; g.beginPath(); g.arc(0, 0, 17, 0, 7); g.fill(); g.strokeStyle = 'rgba(138,100,8,.7)'; g.lineWidth = 3; g.beginPath(); g.arc(0, 0, 10, 0, 7); g.stroke(); g.restore(); }
      // ghost block: what the fee takes from fund B
      g.save(); { const ru = lin(t, p.ripAt, p.ripAt + 0.5); if (ru > 0) { g.translate(bx, baseY - hA); g.rotate(0.28 * ru); g.translate(-bx + 330 * ru, -baseY + hA - 900 * ru * ru); g.globalAlpha *= 1 - ease.in(lin(ru, 0.6, 1)); } }
""")
rep("g.fillStyle = theme.bad; g.fillRect(bx - cw / 2, Math.max(gyTop, gyBot - 4), cw, Math.min(4, Math.max(gapH, 3))); }",
    "g.fillStyle = theme.bad; g.fillRect(bx - cw / 2, Math.max(gyTop, gyBot - 4), cw, Math.min(4, Math.max(gapH, 3))); }\n      g.restore();")
rep("""      txt(g, 'FUND A · 7%', ax, baseY + 62, F.cap(40), theme.ink); txt(g, 'FEE ≈ 0%', ax, baseY + 108, F.monoX(26), theme.goodInk);
      txt(g, 'FUND B · 6%', bx, baseY + 62, F.cap(40), theme.ink); txt(g, '(1% FEE)', bx, baseY + 108, F.monoX(26), theme.badInk);""",
"""      txt(g, 'FUND A', ax, baseY + 54, F.cap(40), theme.ink); txt(g, 'FEE ≈ 0%', ax, baseY + 100, F.monoX(26), theme.goodInk);
      txt(g, 'FUND B', bx, baseY + 54, F.cap(40), theme.ink);
      if (p.feeTagAt > -0.5 && t >= p.feeTagAt) { const ft = t - p.feeTagAt, k = spring(ft, 'bouncy'); g.save(); g.translate(bx, baseY + 107); g.rotate(-0.07 * (1 - k)); g.scale(0.3 + 0.7 * k, 0.3 + 0.7 * k); g.globalAlpha *= clamp(ft / 0.06); const f = F.monoX(30), tw = mw('+1% A YEAR', f) + 56; clay(g, -tw / 2, -27, tw, 54, 27, theme.bad, { shadowK: 0.6 }); g.fillStyle = theme.paper; g.beginPath(); g.arc(-tw / 2 + 24, 0, 7, 0, 7); g.fill(); txt(g, '+1% A YEAR', 10, 2, f, theme.paper); g.restore(); burst(g, bx, baseY + 107, 130, theme.bad, ft - 0.04, 12, 0.4); }""")
rep("      let cur = null; for (const gp of p.gaps) if (t >= gp.at) cur = gp;\n",
"""      let cur = null; for (const gp of p.gaps) if (t >= gp.at) cur = gp;
      if (!cur) for (const [at, s1] of [[p.depAt, '$500 / MONTH × 40 YEARS'], [p.rateAt, 'ASSUMES 7% BEFORE FEES · NOT A FORECAST']]) { if (at > -0.5 && t >= at) { const ct = t - at, k = spring(ct, 'bouncy'), f = F.monoX(s1[0] === '$' ? 38 : 27), tw = mw(s1, f) + 60; if (s1[0] === '$' && p.rateAt > -0.5 && t >= p.rateAt) continue;
        g.save(); g.translate(0, -300); g.scale(0.55 + 0.45 * k, 0.55 + 0.45 * k); g.globalAlpha *= clamp(ct / 0.08); clay(g, -tw / 2, -44, tw, 88, 44, s1[0] === '$' ? theme.ink : theme.navy, { shadowK: 0.6 }); txt(g, s1, 0, 2, f, s1[0] === '$' ? theme.accent : theme.paper); g.restore(); burst(g, 0, -300, 260, theme.accent, ct - 0.05, 12, 0.35); } }
""")
rep("if (fo > 0) { g.save(); g.globalAlpha *= clamp(fo / 0.1); txt(g, 'THE 1% FEE COST'",
    "if (fo > 0) { g.save(); g.translate(0, -650 * (1 - Math.min(1.06, spring(fo, { f: 2.1, z: 0.55 })))); g.globalAlpha *= clamp(fo / 0.06); txt(g, 'THE 1% FEE COST'")
open('shared2.js','w').write(s)
