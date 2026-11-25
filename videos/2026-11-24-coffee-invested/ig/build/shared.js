const hero = (c, s, x, y, size, col, maxW = 940, fam = 'Anton', wt = 400, rot = 0) => { c.save(); c.font = `${wt} ${size}px ${fam}`; const w = c.measureText(s).width; if (w > maxW) size *= maxW / w; c.translate(x, y); c.rotate(rot);
  c.font = `${wt} ${size}px ${fam}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineJoin = 'round'; c.lineWidth = size * .09; c.strokeStyle = 'rgba(0,0,0,.85)'; c.strokeText(s, 0, 0); c.fillStyle = col; c.fillText(s, 0, 0); c.restore(); };
const slam = (c, k, x, y, f) => { const s = lerp(1.12, 1, eo(k)); c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(k * 4 + .35); f(); c.restore(); };
function rays(c, t, col = '255,59,48') { const g = c.createRadialGradient(540, 860, 40, 540, 860, 950); g.addColorStop(0, `rgba(${col},.42)`); g.addColorStop(1, `rgba(${col},0)`); c.fillStyle = g; c.fillRect(0, 0, W, H);
  c.save(); c.translate(540, 880); c.globalAlpha = .1; c.fillStyle = `rgb(${col})`; for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + t * .25; c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, 1500, a, a + .15); c.closePath(); c.fill(); } c.restore(); }
function rain(c, t, t0, n = 80) { for (let i = 0; i < n; i++) { const ts = t0 + hash(i) * 1.5, d = t - ts; if (d < 0) continue; const y = -60 + d * (700 + hash(i + 3) * 500); if (y > 2000) continue; const x = hash(i + 1) * 1100 - 10 + Math.sin(d * 3 + i) * 40;
  if (i % 5 === 0) coin(c, x, y, 20, d * 6, Math.abs(Math.cos(d * 8 + i))); else bill(c, x, y, Math.sin(d * 2.5 + i) * .9, .9, Math.abs(Math.cos(d * 5 + i)) * .85 + .15); } }

const CX0 = 110, CX1 = 930, CY0 = 990, CYT = 660;
function chart(c, t, Y, o = {}) {
  const V = FV(Y); bg(c, t, 'rgba(0,210,106,.12)');
  const xmax = Math.max(10, Y * 1.08), ymax = Math.max(7000, V * 1.32); const X_ = yr => CX0 + (CX1 - CX0) * yr / xmax, Yp = v => CY0 - (CY0 - CYT) * v / ymax;
  const ca = o.ca ?? 1; c.save(); c.globalAlpha = ca; txt(c, 'YEARS', 90, 376, '800 30px JBM', 'rgba(245,243,238,.7)', 'left');
  let ky = 1; if (o.pulse) ky = 1 + .22 * Math.exp(-(t - o.pulse) * 9); c.save(); c.translate(90, 465); c.scale(ky, ky); txt(c, String(Math.round(Y)), 0, 0, '400 140px Anton', PAPER, 'left'); c.restore();
  c.save(); c.translate(90, 585); c.scale(ky, ky); c.shadowColor = GREEN; c.shadowBlur = 24; txt(c, '$' + fmt(V), 0, 0, '800 96px JBM', GREEN, 'left'); c.restore(); c.restore();
  c.save(); c.globalAlpha = ca; jar(c, t, 800, 640, .52, clamp(V / 437201), false); c.restore();
  c.save(); c.beginPath(); c.rect(CX0 - 14, CYT - 40, CX1 - CX0 + 28, CY0 - CYT + 90); c.clip();
  c.strokeStyle = 'rgba(245,243,238,.09)'; c.lineWidth = 2; for (let i = 1; i <= 4; i++) { const gy = CY0 - (CY0 - CYT) * i / 4; c.beginPath(); c.moveTo(CX0, gy); c.lineTo(CX1, gy); c.stroke(); }
  c.strokeStyle = 'rgba(245,243,238,.55)'; c.lineWidth = 4; c.beginPath(); c.moveTo(CX0, CYT - 20); c.lineTo(CX0, CY0); c.lineTo(CX1, CY0); c.stroke();
  for (let k = 0; k <= 40; k += 10) { const px = X_(k); if (px > CX1 + 4) continue; txt(c, k ? k + 'Y' : '0', px, CY0 + 24, '700 22px JBM', 'rgba(245,243,238,.6)'); }
  const end = Math.min(Y, 40), cEnd = o.cEnd ?? end;
  c.save(); if (o.hl) { c.shadowColor = HL; c.shadowBlur = 20; } c.setLineDash([12, 12]); c.strokeStyle = o.hl ? HL : 'rgba(245,243,238,.55)'; c.lineWidth = o.hl ? 8 : 4; c.beginPath(); for (let q = 0; q <= cEnd + .01; q += .5) c.lineTo(X_(q), Yp(2190 * q)); c.stroke(); c.restore();
  const pts = []; for (let q = 0; q <= end + .001; q += .2) pts.push([X_(q), Yp(FV(q))]); pts.push([X_(end), Yp(FV(end))]);
  const fg = c.createLinearGradient(0, CYT, 0, CY0); fg.addColorStop(0, 'rgba(0,210,106,.35)'); fg.addColorStop(1, 'rgba(0,210,106,0)'); c.beginPath(); c.moveTo(pts[0][0], CY0); for (const p of pts) c.lineTo(p[0], p[1]); c.lineTo(pts[pts.length - 1][0], CY0); c.closePath(); c.fillStyle = fg; c.fill();
  c.save(); c.shadowColor = GREEN; c.shadowBlur = 18; c.strokeStyle = GREEN; c.lineWidth = 11; c.lineJoin = 'round'; c.lineCap = 'round'; c.beginPath(); pts.forEach((p, i) => i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.stroke(); c.restore();
  const ep = pts[pts.length - 1]; c.fillStyle = PAPER; c.beginPath(); c.arc(ep[0], ep[1], 14 + 3 * Math.sin(t * 8), 0, 7); c.fill(); c.restore();
  if (o.chip && t >= o.chip) { const px = X_(10), py = Yp(FV(10)); const k = back(lin(t, o.chip, o.chip + .2)); c.fillStyle = HL; c.beginPath(); c.arc(px, py, 13 * (1 + .28 * Math.exp(-(t - o.chip) * 8)), 0, 7); c.fill();
    const a = '10 YRS', b = '$30,258'; c.font = '800 36px JBM'; const wa = c.measureText(a).width, wb = c.measureText(b).width, w = wa + wb + 128; c.save(); c.translate(clamp(px + 40, 90 + w / 2, 930 - w / 2), Math.min(py - 80, CY0 - 40)); c.scale(k, k);
    shadowBox(c, -w / 2, -34, w, 68, 16, '#101923', HL); txt(c, a, -w / 2 + 22, 2, '800 36px JBM', PAPER, 'left'); arrowR(c, -w / 2 + 22 + wa + 14, 2, 52, HL, 6); txt(c, b, w / 2 - 20, 2, '800 36px JBM', GREEN, 'right'); c.restore(); }
  return { X_, Yp, ep };
}
