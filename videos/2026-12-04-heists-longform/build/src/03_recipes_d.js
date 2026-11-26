// ===== part D: CTA micro-moments (screen layer): heart pulse, paper-plane flick =====
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, clay, burst, hit } = B;
  const heartPath = (g, s) => { g.beginPath(); g.moveTo(0, s * 0.35); g.bezierCurveTo(-s * 1.1, -s * 0.25, -s * 0.55, -s * 0.95, 0, -s * 0.4); g.bezierCurveTo(s * 0.55, -s * 0.95, s * 1.1, -s * 0.25, 0, s * 0.35); g.closePath(); };
  // heart: pops, pulses twice, three small hearts float up, fades. Total ~1.4 s. (v2 look: clay red, soft shadow, no glow)
  B.register('heart', { defaults: { s: 70 }, ownEnter: true, size: p => [p.s * 3, p.s * 3],
    draw(g, p, env) { const { lt } = env, d = 1.4; if (lt < 0 || lt > d) return; const k = clamp(spring(lt, 'bouncy'), 0, 1.3), pul = 1 + 0.22 * hit(lt - 0.35, 9) * (lt > 0.35 ? 1 : 0) + 0.18 * hit(lt - 0.75, 9) * (lt > 0.75 ? 1 : 0), a = 1 - ease.in(lin(lt, 1.1, d));
      g.save(); g.globalAlpha = a; g.translate(0, -26 * ease.out(lin(lt, 0, d))); g.scale(k * pul, k * pul);
      B.shadowed(g, () => heartPath(g, p.s), '#FF3B30', 0.3); g.save(); heartPath(g, p.s); g.clip(); const lg = g.createLinearGradient(-p.s, -p.s, p.s, p.s); lg.addColorStop(0, 'rgba(255,255,255,.35)'); lg.addColorStop(0.5, 'rgba(255,255,255,0)'); lg.addColorStop(1, 'rgba(0,0,0,.22)'); g.fillStyle = lg; g.fillRect(-p.s * 1.3, -p.s, p.s * 2.6, p.s * 1.6); g.restore(); g.restore();
      for (let i = 0; i < 3; i++) { const u = lin(lt, 0.3 + i * 0.12, 1.3 + i * 0.05); if (u <= 0 || u >= 1) continue; g.save(); g.globalAlpha = Math.sin(Math.PI * u); g.translate((i - 1) * p.s * 0.9 + Math.sin(u * 5 + i) * 10, -p.s * 0.9 - u * 120); g.scale(0.28, 0.28); heartPath(g, p.s); g.fillStyle = '#FF3B30'; g.fill(); g.restore(); }
      burst(g, 0, 0, p.s * 1.1, '#FF3B30', lt - 0.3, 10, 0.4); } });
  // plane: a paper plane is flicked from his hand and flies off up-right (path in screen px). ~1.3 s
  B.register('plane', { defaults: { dx: 230, dy: -360 }, ownEnter: true, size: () => [200, 200],
    draw(g, p, env) { const { lt, theme } = env, d = 1.3; if (lt < 0 || lt > d) return; const u = ease.out(lin(lt, 0, d)), x = p.dx * u, y = p.dy * u + 120 * Math.sin(Math.PI * u) * (1 - u) * -1 * -1 - 80 * Math.sin(Math.PI * u), ang = Math.atan2(p.dy - 160 * (1 - 2 * u), p.dx), sc = 1 + 0.5 * (1 - u) * 0 - 0.35 * u, a = 1 - ease.in(lin(lt, 1.0, d));
      g.save(); g.globalAlpha = a * 0.5; g.strokeStyle = theme.paper; g.lineWidth = 4; g.lineCap = 'round'; g.setLineDash([2, 16]); g.beginPath(); for (let i = 0; i <= 20; i++) { const v = u * i / 20, xx = p.dx * v, yy = p.dy * v - 80 * Math.sin(Math.PI * v); i ? g.lineTo(xx, yy) : g.moveTo(xx, yy); } g.stroke(); g.restore();
      g.save(); g.globalAlpha = a; g.translate(x, y); g.rotate(ang + Math.sin(lt * 9) * 0.12); g.scale(sc * 1.6, sc * 1.6); const path = () => { g.beginPath(); g.moveTo(34, 0); g.lineTo(-30, -22); g.lineTo(-14, 0); g.lineTo(-30, 22); g.closePath(); };
      B.shadowed(g, path, theme.paper, 0.4); g.fillStyle = 'rgba(20,24,30,.16)'; g.beginPath(); g.moveTo(34, 0); g.lineTo(-14, 0); g.lineTo(-30, 22); g.closePath(); g.fill(); g.strokeStyle = 'rgba(11,15,20,.25)'; g.lineWidth = 2; g.beginPath(); g.moveTo(34, 0); g.lineTo(-14, 0); g.stroke(); g.restore(); } });
})();
