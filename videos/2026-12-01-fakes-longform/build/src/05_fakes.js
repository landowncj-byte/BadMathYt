// ===== Fakes That Fooled the Experts — new recipes: wall (empty hooks), notebooks (plain black, FH initials), gallery, brushframe =====
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, marker, burst } = B;
  const pop = (t, o = 'snappy') => clamp(spring(t, o), 0, 1.25);
  const bad = '#E0281E';
  const cover = (g, img, x, y, w, h) => { const sc = Math.max(w / img.width, h / img.height), dw = img.width * sc, dh = img.height * sc; g.drawImage(img, x + (w - dw) / 2, y + (h - dh) * 0.3, dw, dh); };

  // wall: a gallery wall. The painting hangs there until goneAt; then four empty hooks are ringed one by one.
  B.register('wall', {
    defaults: { w: 820, h: 760, src: '', goneAt: 99999, hooksAt: 99999, label: 'FOUR EMPTY HOOKS', labelAt: 99999, name: 'THE LOUVRE · SALON CARRÉ', nameAt: -1 }, size: p => [p.w, p.h],
    anchors: p => ({ hooks: [0, -p.h * 0.1, p.w * 0.62, p.h * 0.5], wall: [0, 0, p.w, p.h] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2, k = spring(lt, 'heavy'); const img = p.src && B.images[p.src];
      g.save(); g.translate(0, (1 - k) * 200); g.rotate((1 - k) * 0.05); g.globalAlpha *= clamp(lt / 0.1);
      paper(g, x0, y0, w, h, 22, { lift, fill: '#CFC3AC' }); g.save(); rr(g, x0, y0, w, h, 22); g.clip();
      const lg = g.createLinearGradient(0, y0, 0, y0 + h); lg.addColorStop(0, '#5a4a3a'); lg.addColorStop(1, '#3e3226'); g.fillStyle = lg; g.fillRect(x0, y0, w, h);
      g.fillStyle = 'rgba(255,255,255,.05)'; for (let i = 0; i < 9; i++) g.fillRect(x0 + i * w / 9 + 6, y0, 3, h);   // wallpaper stripes
      g.fillStyle = '#2a2018'; g.fillRect(x0, y0 + h - 120, w, 120); g.fillStyle = 'rgba(255,255,255,.12)'; g.fillRect(x0, y0 + h - 124, w, 5);
      const fw = w * 0.5, fh = h * 0.58, fx = -fw / 2, fy = y0 + h * 0.14, gone = t - p.goneAt;
      if (gone < 0 || gone < 0.5) { const drop = gone > 0 ? ease.in(clamp(gone / 0.5)) * (h * 0.5) : 0; g.save(); g.translate(0, drop); g.globalAlpha *= gone > 0 ? 1 - clamp(gone / 0.5) : 1; g.rotate(gone > 0 ? 0.12 * clamp(gone / 0.5) : 0);
        B.shadowed(g, () => rr(g, fx - 18, fy - 18, fw + 36, fh + 36, 8), '#8a6a1f', 0.4); g.fillStyle = '#B88A2B'; rr(g, fx - 18, fy - 18, fw + 36, fh + 36, 8); g.fill(); g.fillStyle = '#E3B94E'; rr(g, fx - 10, fy - 10, fw + 20, fh + 20, 5); g.fill();
        g.save(); rr(g, fx, fy, fw, fh, 3); g.clip(); if (img) cover(g, img, fx, fy, fw, fh); else { g.fillStyle = '#6b5a3a'; g.fillRect(fx, fy, fw, fh); } g.restore(); g.restore(); }
      else { g.fillStyle = 'rgba(255,255,255,.07)'; rr(g, fx - 18, fy - 18, fw + 36, fh + 36, 8); g.fill(); }
      const hk = [[fx + 28, fy + 6], [fx + fw - 28, fy + 6], [fx + 28, fy + fh - 6], [fx + fw - 28, fy + fh - 6]];
      hk.forEach(([hx, hy], i) => { if (gone > 0.35 || gone > 0.2 && i === 0) { g.fillStyle = '#d9d2c3'; g.beginPath(); g.arc(hx, hy, 9, 0, 7); g.fill(); g.strokeStyle = '#2a2018'; g.lineWidth = 3; g.stroke();
        const on = t - p.hooksAt - i * 0.35; if (on > 0) { const u = pop(on, 'bouncy'); g.strokeStyle = bad; g.lineWidth = 6; g.beginPath(); g.arc(hx, hy, 34 * u, 0, 7); g.stroke(); txt(g, String(i + 1), hx + (i % 2 ? 56 : -56), hy + (i < 2 ? -40 : 44), F.hero(40), bad); } } });
      g.restore();
      if (p.name && t >= p.nameAt) txt(g, p.name, 0, y0 + 46, F.monoX(24), '#E9DFC9');
      const lb = t - p.labelAt; if (lb > 0) { g.save(); g.translate(0, h / 2 - 70 + (1 - pop(lb)) * 30); g.globalAlpha *= clamp(lb / 0.1); g.fillStyle = bad; rr(g, -250, -40, 500, 80, 10); g.fill(); txt(g, p.label, 0, 3, F.hero(48), theme.paper); g.restore(); }
      g.restore();
    },
  });

  // notebooks: plain black notebooks (a stack, "dozens"), plastic letters F H on the cover. fixAt: ring on the letters + "SHOULD SAY A H".
  B.register('notebook', {
    defaults: { w: 600, h: 700, n: 5, lettersAt: -1, ringAt: 99999, shouldAt: 99999, stampText: '', stampAt: 99999, count: '' }, size: p => [p.w, p.h],
    anchors: p => ({ letters: [0, -p.h * 0.02, 360, 190], book: [0, 20, p.w * 0.7, p.h * 0.7] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, k = spring(lt, 'bouncy'); g.save(); g.globalAlpha *= clamp(lt / 0.1); g.translate(0, (1 - k) * 160);
      const bw = w * 0.62, bh = h * 0.66, n = p.n;
      for (let i = n - 1; i >= 0; i--) { const on = lt - 0.06 * (n - 1 - i), kk = pop(on, 'bouncy'); if (on < 0) continue; g.save(); g.translate((i - (n - 1) / 2) * 38 * (i ? 1 : 0.0) + (i ? (i % 2 ? 1 : -1) * 18 * i : 0), -i * 14 + (1 - kk) * 70); g.rotate((i ? (i % 2 ? 0.05 : -0.05) * i * 0.6 : 0) * 1);
        const bk = i === 0; B.shadowed(g, () => rr(g, -bw / 2, -bh / 2, bw, bh, 16), '#0b0f14', bk ? lift : 0.15); const cg = g.createLinearGradient(-bw / 2, -bh / 2, bw / 2, bh / 2); cg.addColorStop(0, i ? '#222a35' : '#2b3441'); cg.addColorStop(1, '#10151d'); g.fillStyle = cg; rr(g, -bw / 2, -bh / 2, bw, bh, 16); g.fill();
        g.fillStyle = 'rgba(255,255,255,.10)'; rr(g, -bw / 2 + 4, -bh / 2 + 4, bw * 0.09, bh - 8, 10); g.fill(); g.strokeStyle = 'rgba(255,255,255,.18)'; g.lineWidth = 3; rr(g, -bw / 2, -bh / 2, bw, bh, 16); g.stroke();
        if (bk) { g.fillStyle = '#7a1b1b'; g.fillRect(-bw / 2 + bw * 0.14, -bh / 2 + 4, 10, bh - 8); }   // ribbon, not a symbol
        g.restore(); }
      // plastic letters F H on the front notebook
      const on = lt - 0.1 - p.lettersAt * 0 ; const la = t - p.lettersAt;
      if (p.lettersAt >= 0 ? la > -0.01 : on > 0) { ['F', 'H'].forEach((c, i) => { const q = pop((p.lettersAt >= 0 ? la : on) - i * 0.18, 'bouncy'); if (q <= 0) return; g.save(); g.translate((i - 0.5) * 130, -h * 0.02 + (1 - q) * -50); g.scale(q, q);
          g.fillStyle = 'rgba(0,0,0,.45)'; g.beginPath(); g.roundRect(-52 + 5, -80 + 8, 104, 160, 12); g.fill(); const lg = g.createLinearGradient(0, -80, 0, 80); lg.addColorStop(0, '#F2E3A0'); lg.addColorStop(1, '#C9A640'); g.fillStyle = lg; g.beginPath(); g.roundRect(-52, -80, 104, 160, 12); g.fill(); g.strokeStyle = 'rgba(0,0,0,.35)'; g.lineWidth = 3; g.stroke();
          txt(g, c, 0, 6, F.hero(124), '#2a1d0a'); g.restore(); }); }
      const rg = t - p.ringAt; if (rg > 0) { const u = ease.out(clamp(rg / 0.35)); g.strokeStyle = bad; g.lineWidth = 9; g.beginPath(); g.ellipse(0, -h * 0.02, 190 * (2 - u), 120 * (2 - u), 0, 0, 7); g.save(); g.globalAlpha *= u; g.stroke(); g.restore(); }
      const sh = t - p.shouldAt; if (sh > 0) { g.save(); g.translate(0, h * 0.40 + (1 - pop(sh)) * 40); g.globalAlpha *= clamp(sh / 0.1); g.fillStyle = theme.paper; rr(g, -250, -62, 500, 124, 14); g.fill(); g.strokeStyle = theme.good; g.lineWidth = 7; rr(g, -244, -56, 488, 112, 10); g.stroke(); txt(g, 'THE NAME STARTS WITH', 0, -26, F.mono(22), theme.inkSoft); txt(g, 'A   H', 0, 22, F.hero(66), theme.goodInk || '#188a56'); g.restore(); }
      if (p.count) { g.save(); g.translate(w * 0.34, -h * 0.4); g.rotate(0.1); g.fillStyle = bad; rr(g, -120, -34, 240, 68, 8); g.fill(); txt(g, p.count, 0, 3, F.hero(38), theme.paper); g.restore(); }
      if (p.stampText && t >= p.stampAt) B.crimeStamp(g, theme, t, { text: p.stampText, at: p.stampAt, tone: 'bad', size: 60, rot: -0.1, x: 0, y: h * 0.12 });
      g.restore();
    },
  });

  // gallery: a row of framed pictures labelled with the dealer/expert/owner "BOUGHT IT" (Vermeers that were fakes) -> each gets FAKE tape at fakeAt
  B.register('gallery', {
    defaults: { items: [], w: 1300, h: 520, fakeAt: 99999, tape: 'ALL FAKES', head: '' }, size: p => [p.w, p.h],
    anchors: p => Object.fromEntries(p.items.map((it, i) => ['f' + i, [(i - (p.items.length - 1) / 2) * 320, 10, 270, 340]])),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, n = p.items.length, fk = clamp((t - p.fakeAt) / 0.3);
      paper(g, -w / 2, -h / 2, w, h, 24, { lift, fill: '#2a2018', grain: false }); if (p.head) txt(g, p.head, 0, -h / 2 + 40, F.monoX(24), '#E9DFC9');
      p.items.forEach((it, i) => { const on = t - it.at; if (on < 0) return; const kk = pop(on, 'bouncy'), x = (i - (n - 1) / 2) * 320; g.save(); g.translate(x, 20); g.scale(0.6 + 0.4 * kk, 0.6 + 0.4 * kk); g.globalAlpha *= clamp(on / 0.1);
        B.shadowed(g, () => rr(g, -138, -178, 276, 356, 6), '#000', 0.3); g.fillStyle = '#B88A2B'; rr(g, -138, -178, 276, 356, 6); g.fill(); g.fillStyle = '#E3B94E'; rr(g, -128, -168, 256, 336, 4); g.fill();
        const cl = ['#4a5a6a', '#6a5a3a', '#3a4a4a', '#5a4a5a', '#58603a'][i % 5]; const pg = g.createLinearGradient(0, -150, 0, 150); pg.addColorStop(0, cl); pg.addColorStop(1, '#1b1b1b'); g.fillStyle = pg; g.fillRect(-114, -154, 228, 308);
        g.fillStyle = 'rgba(240,230,200,.55)'; g.beginPath(); g.arc(0, -40, 42, 0, 7); g.fill(); g.beginPath(); g.moveTo(-70, 150); g.quadraticCurveTo(0, 20, 70, 150); g.fill(); g.fillStyle = 'rgba(255,255,255,.14)'; g.fillRect(-114, -154, 228, 10);
        g.fillStyle = '#EFE6CF'; rr(g, -100, 112, 200, 40, 4); g.fill(); txt(g, it.label || 'VERMEER?', 0, 133, F.monoX(20), '#2a1d0a');
        if (fk > 0) { g.fillStyle = 'rgba(224,40,30,' + 0.25 * fk + ')'; g.fillRect(-114, -154, 228, 308); g.save(); g.rotate(-0.12); g.scale(pop(t - p.fakeAt - i * 0.12), pop(t - p.fakeAt - i * 0.12)); g.fillStyle = bad; rr(g, -92, -26, 184, 52, 8); g.fill(); txt(g, 'FAKE', 0, 3, F.hero(40), theme.paper); g.restore(); }
        g.restore(); });
    },
  });
})();
