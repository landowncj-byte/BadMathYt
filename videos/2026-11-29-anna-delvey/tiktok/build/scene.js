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
// ===== Bad Math engine v2 — CRIME-SHOW recipes (RULES 112, brand/CRIME-SHOW.md) =====
// suspect  : the con's real licensed photo in a crime-show treatment (file card + red string, quote card, picture-in-picture,
//            arrested X / stamps, jail bars, mugshot height chart, verdict) with an optional slow push-in on the face
// board    : cork evidence board, pinned photo + evidence notes, red string that pulls tight
// victim   : coloured, consistent victim character card (investors, collectors, billionaire, diner)
// datecard : date / location / chapter slate (screen layer)
// All images must sit under brand/ or videos/ (repo-relative) so a fresh clone renders.
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, burst, hit, wobble } = B;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const pop = (t, o = 'snappy') => clamp(spring(t, o), 0, 1.25);
  const RED = '#E0281E';

  // ---- photo drawn into a rect: crop = [x,y,w,h] fractions of the source (region of interest); fx,fy = focal point inside it; zoom >= 1 pushes in
  function drawPhoto(g, img, x, y, w, h, o) {
    const [cx, cy, cw, ch] = o.crop || [0, 0, 1, 1]; let sw = cw * img.width, sh = ch * img.height; const ta = w / h;
    if (sw / sh > ta) sw = sh * ta; else sh = sw / ta; const z = o.zoom || 1; sw /= z; sh /= z;
    const ccx = (cx + cw * (o.fx ?? 0.5)) * img.width, ccy = (cy + ch * (o.fy ?? 0.5)) * img.height;
    const sx = clamp(ccx - sw / 2, 0, img.width - sw), sy = clamp(ccy - sh / 2, 0, img.height - sh);
    g.drawImage(img, sx, sy, sw, sh, x, y, w, h);
  }
  function bigX(g, cx, cy, r, col, u, lw) { g.save(); g.strokeStyle = col; g.lineWidth = lw; g.lineCap = 'round'; const a = clamp(u * 2), b2 = clamp(u * 2 - 1); g.beginPath(); g.moveTo(cx - r, cy - r); g.lineTo(cx - r + 2 * r * a, cy - r + 2 * r * a); g.stroke(); if (b2 > 0) { g.beginPath(); g.moveTo(cx + r, cy - r); g.lineTo(cx + r - 2 * r * b2, cy - r + 2 * r * b2); g.stroke(); } g.restore(); }
  const imgOf = src => { const im = B.images && B.images[src]; if (!im) throw new Error('crime: image not preloaded: ' + src); return im; };
  B.drawPhoto = drawPhoto;

  function stamp(g, th, t, s) { // s: {text, at, tone, size, rot, x, y}
    const k = t - s.at; if (k < 0) return; const size = s.size || 70, f = F.hero(size), w = mw(s.text, f) + size * 0.8, h = size * 1.4, col = B.tone(s.tone || 'bad', true);
    const sc = 1 + 1.1 * (1 - ease.expo(clamp(k / 0.2))) - 0.05 * wobble(k - 0.2, 5, 9);
    g.save(); g.globalAlpha = clamp(k / 0.05); g.translate(s.x || 0, s.y || 0); g.rotate(s.rot ?? -0.1); g.scale(sc, sc);
    g.fillStyle = 'rgba(245,243,238,.92)'; rr(g, -w / 2, -h / 2, w, h, size * 0.14); g.fill(); g.strokeStyle = col; g.lineWidth = size * 0.09; rr(g, -w / 2 + size * 0.06, -h / 2 + size * 0.06, w - size * 0.12, h - size * 0.12, size * 0.1); g.stroke();
    txt(g, s.text, 0, size * 0.05, f, col); g.restore(); burst(g, s.x || 0, s.y || 0, w * 0.5, col, k - 0.12, 14, 0.45);
  }
  B.crimeStamp = stamp;

  function crown(g, th, t, c, cx, cy, scale) { // c: {at, off, re}; sits at (cx, cy) = top-centre of photo
    const kd = dd => 1 - spring(Math.max(0, dd), { f: 2.5, z: 0.5 }); let y = 0, x = 0, rot = 0, a = 1;
    if (c.re != null && t >= c.re) { y = kd(t - c.re) * -60; a = clamp((t - c.re) / 0.05); }
    else if (c.off != null && t >= c.off) { const u = lin(t, c.off, c.off + 0.8), e = ease.out(u); x = 320 * e; rot = 1.1 * e; y = 380 * ease.in(clamp(u * 1.15)); a = 1 - clamp((t - c.off - 1.2) / 0.25); }
    else y = (t - c.at) < 1.2 ? kd(t - c.at) * -60 : 0;
    if (t < c.at || a < 0.01) return; g.save(); g.globalAlpha *= a * clamp((t - c.at) / 0.05 + (c.re != null && t >= c.re ? 1 : 0)); g.translate(cx + x, cy + y); g.rotate(rot); g.scale(scale, scale);
    const path = () => { g.beginPath(); g.moveTo(-112, 0); g.lineTo(-118, -112); g.lineTo(-58, -58); g.lineTo(0, -138); g.lineTo(58, -58); g.lineTo(118, -112); g.lineTo(112, 0); g.closePath(); };
    B.shadowed(g, path, th.gold, 0.3); g.save(); path(); g.clip(); const lg = g.createLinearGradient(0, -140, 0, 0); lg.addColorStop(0, 'rgba(255,255,255,.35)'); lg.addColorStop(0.5, 'rgba(255,255,255,0)'); lg.addColorStop(1, 'rgba(0,0,0,.25)'); g.fillStyle = lg; g.fillRect(-130, -150, 260, 160); g.restore();
    g.fillStyle = th.gold; for (const [qx, qy] of [[-118, -116], [0, -142], [118, -116]]) { g.beginPath(); g.arc(qx, qy, 13, 0, 7); g.fill(); g.strokeStyle = 'rgba(0,0,0,.25)'; g.lineWidth = 3; g.stroke(); } g.restore();
  }

  function pin(g, x, y, r = 13) { g.save(); g.fillStyle = 'rgba(2,4,9,.4)'; g.beginPath(); g.ellipse(x + 3, y + 6, r, r * 0.7, 0, 0, 7); g.fill(); const lg = g.createRadialGradient(x - r * 0.35, y - r * 0.4, 1, x, y, r); lg.addColorStop(0, '#ff8a80'); lg.addColorStop(1, '#b3160f'); g.fillStyle = lg; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); g.restore(); }
  function string(g, a, b, k, sag, w = 5) { if (k <= 0) return; const x = lerp(a[0], b[0], k), y = lerp(a[1], b[1], k), mx = (a[0] + x) / 2, my = (a[1] + y) / 2 + sag * Math.sin(Math.PI * Math.min(1, k)); g.save(); g.strokeStyle = 'rgba(2,4,9,.35)'; g.lineWidth = w + 2; g.lineCap = 'round'; g.beginPath(); g.moveTo(a[0] + 2, a[1] + 5); g.quadraticCurveTo(mx + 2, my + 5, x + 2, y + 5); g.stroke(); g.strokeStyle = RED; g.lineWidth = w; g.beginPath(); g.moveTo(a[0], a[1]); g.quadraticCurveTo(mx, my, x, y); g.stroke(); g.restore(); }

  // ================= suspect =================
  B.register('suspect', {
    defaults: {
      src: '', crop: [0, 0, 1, 1], fx: 0.5, fy: 0.4, w: 460, aspect: 1.05, pw: 0, variant: 'card', name: '', nick: '', credit: '', tag: '', caseNo: '', tilt: 0.0, file: false, pinned: false,
      push: null, flash: true, xmark: null, bars: null, heights: null, stamps: [], crownAt: null, crownOff: null, crownRe: null, quote: null, quoteAt: 0, quoteSize: 62, quoteSub: '', label: '', arrow: null, stringTo: null, stringAt: 0, dim: null, ring: null, mono: false,
    }, ownEnter: true,
    size(p) { const pip = p.variant === 'pip', side = p.variant === 'side', pw = side ? (p.pw || p.w * 0.46) : p.w - 44, ph = pw * p.aspect, plate = p.name ? (p.nick ? 124 : 90) : 0;
      return [p.w, 22 + ph + 22 + (pip ? (p.label ? 56 : 0) : plate ? plate + 14 : 0)]; },
    anchors(p) { const [w, h] = this.size(p), side = p.variant === 'side', pw = side ? (p.pw || p.w * 0.46) : p.w - 44, ph = pw * p.aspect, px = -w / 2 + 22, py = -h / 2 + 22;
      return { face: [px + pw / 2, py + ph * 0.42, pw * 0.8, ph * 0.62], photo: [px + pw / 2, py + ph / 2, pw, ph], name: [0, h / 2 - 22 - 60, w, 130], quote: [w * 0.22, -h * 0.1, w * 0.5, h * 0.7] }; },
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, th = theme, img = imgOf(p.src), [w, h] = this.size(p), pip = p.variant === 'pip', side = p.variant === 'side';
      const pw = side ? (p.pw || p.w * 0.46) : p.w - 44, ph = pw * p.aspect, x0 = -w / 2, y0 = -h / 2, px = x0 + 22, py = y0 + 22, k = spring(lt, 'heavy');
      g.save(); g.translate(0, (pip ? 0 : (1 - k) * 220)); g.rotate(p.tilt + (pip ? 0 : (1 - k) * -0.1)); g.globalAlpha *= clamp(lt / 0.1);
      // case-file folder behind the card
      if (p.file) { const M = th.manila || '#E2C48D', fx0 = x0 - 16, fy0 = y0 - 36, fw = w + 32, fh = h + 52; const body = () => { g.beginPath(); g.moveTo(fx0, fy0 + 36); g.lineTo(fx0 + fw * 0.12, fy0 + 36); g.lineTo(fx0 + fw * 0.17, fy0 + 6); g.lineTo(fx0 + fw * 0.52, fy0 + 6); g.lineTo(fx0 + fw * 0.57, fy0 + 36); g.lineTo(fx0 + fw, fy0 + 36); g.lineTo(fx0 + fw, fy0 + fh); g.lineTo(fx0, fy0 + fh); g.closePath(); };
        B.shadowed(g, body, M, lift); g.save(); body(); g.clip(); const lg = g.createLinearGradient(fx0, fy0, fx0 + fw * 0.7, fy0 + fh); lg.addColorStop(0, 'rgba(255,255,255,.28)'); lg.addColorStop(0.5, 'rgba(255,255,255,0)'); lg.addColorStop(1, 'rgba(80,50,10,.18)'); g.fillStyle = lg; g.fillRect(fx0, fy0, fw, fh); g.restore();
        if (p.caseNo) txt(g, p.caseNo, fx0 + fw * 0.345, fy0 + 24, F.monoX(20), '#5a4010'); }
      paper(g, x0, y0, w, h, pip ? 12 : 16, { lift, fill: p.file ? th.paper : th.paper });
      // photo
      let zoom = 1; if (p.push) zoom = 1 + (p.push.to - 1) * ease.inOut(lin(t, p.push.at, p.push.at + p.push.dur)); else zoom = 1 + 0.045 * lin(lt, 0, 6);
      g.save(); rr(g, px, py, pw, ph, 6); g.clip(); drawPhoto(g, img, px, py, pw, ph, { crop: p.crop, fx: p.fx, fy: p.fy, zoom });
      if (p.mono) { g.globalCompositeOperation = 'saturation'; g.fillStyle = '#808080'; g.fillRect(px, py, pw, ph); g.globalCompositeOperation = 'source-over'; }
      const vg = g.createLinearGradient(px, py, px + pw, py + ph); vg.addColorStop(0, 'rgba(255,255,255,.08)'); vg.addColorStop(0.55, 'rgba(255,255,255,0)'); vg.addColorStop(1, 'rgba(0,0,0,.2)'); g.fillStyle = vg; g.fillRect(px, py, pw, ph);
      // dim photo while an X / bars are shown
      if (p.xmark != null && t >= p.xmark) { g.fillStyle = 'rgba(40,0,0,' + (0.38 * clamp((t - p.xmark) / 0.2)) + ')'; g.fillRect(px, py, pw, ph); }
      // height chart: horizontal measuring lines + ticks
      if (p.heights != null && t >= p.heights) { const u = ease.out(lin(t, p.heights, p.heights + 0.5)); g.strokeStyle = 'rgba(245,243,238,.78)'; g.lineWidth = 3; for (let i = 0; i < 16; i++) { const yy = py + ph - (i + 1) * ph / 17 * u - (1 - u) * 0, big = i % 5 === 4; g.beginPath(); g.moveTo(px + pw - (big ? 150 : 70), yy); g.lineTo(px + pw, yy); g.stroke(); if (big) txt(g, String((i + 1) / 5 * 1 | 0), px + pw - 170, yy, F.mono(22), 'rgba(245,243,238,.9)', 'right'); }
        g.fillStyle = 'rgba(245,243,238,.2)'; g.fillRect(px + pw - 150, py, 2, ph); }
      // jail bars
      if (p.bars != null && t >= p.bars) { const u = ease.in(lin(t, p.bars, p.bars + 0.3)), n = 7; for (let i = 0; i < n; i++) { const bx = px + (i + 0.5) * pw / n, bh = ph * u; g.fillStyle = '#10161f'; g.fillRect(bx - 9, py, 18, bh); g.fillStyle = 'rgba(255,255,255,.22)'; g.fillRect(bx - 9, py, 5, bh); } g.fillStyle = '#10161f'; g.fillRect(px, py, pw, 14 * u); g.fillRect(px, py + ph - 14 * u, pw, 14 * u); if (t - p.bars - 0.28 > 0 && t - p.bars < 0.5) { g.fillStyle = 'rgba(255,255,255,' + 0.5 * hit(t - p.bars - 0.28, 16) + ')'; g.fillRect(px, py, pw, ph); } }
      // shutter flash on the reveal
      if (p.flash) { const f = hit(lt - 0.05, 14) * (lt > 0.05 ? 1 : 0); if (f > 0.01) { g.fillStyle = 'rgba(255,255,255,' + 0.85 * f + ')'; g.fillRect(px, py, pw, ph); } }
      // red ring around the face
      if (p.ring != null && t >= p.ring) { const u = ease.out(lin(t, p.ring, p.ring + 0.35)); g.strokeStyle = RED; g.lineWidth = 7; g.beginPath(); g.ellipse(px + pw * (side ? 0.5 : 0.5), py + ph * 0.42, pw * 0.3 * (2 - u), ph * 0.34 * (2 - u), 0, 0, 7); g.globalAlpha *= u; g.stroke(); }
      g.restore(); g.strokeStyle = 'rgba(11,15,20,.3)'; g.lineWidth = 2; rr(g, px, py, pw, ph, 6); g.stroke();
      if (p.xmark != null && t >= p.xmark) { const u = ease.out(lin(t, p.xmark, p.xmark + 0.3)); bigX(g, px + pw / 2, py + ph / 2, pw * 0.3, RED, u, pw * 0.1); }
      // plate: name + nickname
      if (!pip && p.name) { const ty = y0 + 22 + ph + 14, tw = pw + (side ? 0 : 0), ph2 = p.nick ? 124 : 90; g.fillStyle = th.navy; rr(g, px, ty, tw, ph2, 10); g.fill(); txt(g, p.name, px + tw / 2, ty + 32, F.hero(p.nameSize || (side ? 34 : 44)), th.paper);
        if (p.nick) txt(g, p.nick, px + tw / 2, ty + 74, F.monoX(side ? 17 : 22), th.gold); if (p.tag) txt(g, p.tag, px + tw / 2, ty + ph2 - 16, F.mono(15), rgba(th.paper, 0.7)); }
      if (pip && p.label) { const ty = y0 + 22 + ph + 6; g.fillStyle = RED; rr(g, px, ty, pw, 40, 8); g.fill(); txt(g, p.label, px + pw / 2, ty + 21, F.cap(22), th.paper); }
      if (p.credit) txt(g, p.credit, 0, y0 + h - 9, F.mono(12), th.inkSoft);
      // side layout: quote text on the right
      if (side && p.quote) { const qx = x0 + 22 + pw + 26, qw = w - 22 - pw - 26 - 24, on = t - p.quoteAt; if (on > -0.3) { const a = clamp((on + 0.3) / 0.25), pr = pop(on + 0.2); g.save(); g.globalAlpha *= a; g.translate((1 - pr) * 60, 0);
          if (!p.noquote) { g.fillStyle = th.gold; g.font = F.hero(190); g.textAlign = 'left'; g.textBaseline = 'middle'; g.fillText('“', qx - 4, y0 + 110); } let y = y0 + (p.noquote ? 90 : 190); const f = F.hero(p.quoteSize), lh = p.quoteSize * 1.12;
          p.quote.forEach(seg => { const lines = typeof seg === 'string' ? [[seg, 'ink']] : [seg]; for (const [s, tn] of lines) { txt(g, s, qx, y + lh / 2, f, B.tone(tn || 'ink', true), 'left'); y += lh; } });
          if (p.quoteSub) txt(g, p.quoteSub, qx, y + 22, F.mono(22), th.inkSoft, 'left'); g.restore(); } }
      for (const s of p.stamps) stamp(g, th, t, { ...s, x: s.x ?? 0, y: s.y ?? 0 });
      if (p.crownAt != null) crown(g, th, t, { at: p.crownAt, off: p.crownOff, re: p.crownRe }, px + pw / 2, py + 22, pw / 420);
      if (p.pinned || p.stringTo) { const pk = pop(lt - 0.1); pin(g, 0, y0 + 4 - (p.file ? 22 : 0), 13 * pk); if (p.stringTo) string(g, [0, y0 + 4 - (p.file ? 22 : 0)], p.stringTo, ease.out(lin(t, p.stringAt, p.stringAt + 0.6)), 40); }
      if (pip && p.arrow) { const u = ease.out(lin(t, p.arrow.at ?? 0, (p.arrow.at ?? 0) + 0.4)), [ax, ay] = p.arrow.to, sx = 0, sy = y0 + h * 0.5; if (u > 0) { g.save(); g.strokeStyle = RED; g.fillStyle = RED; g.lineWidth = 8; g.lineCap = 'round'; const ex = lerp(sx, ax, u), ey = lerp(sy, ay, u); g.beginPath(); g.moveTo(sx, sy); g.quadraticCurveTo((sx + ex) / 2, Math.min(sy, ey) - 60 * u, ex, ey); g.stroke(); const an = Math.atan2(ey - Math.min(sy, ey) + 60 * u, ex - (sx + ex) / 2); g.translate(ex, ey); g.rotate(an); g.beginPath(); g.moveTo(0, 0); g.lineTo(-30, -16); g.lineTo(-30, 16); g.closePath(); g.fill(); g.restore(); } }
      g.restore();
    },
  });

  // ================= mini icons for the board =================
  function bi(g, kind, s, th) {
    g.save(); const u = s / 100; g.scale(u, u); g.lineCap = 'round'; g.lineJoin = 'round';
    switch (kind) {
      case 'plate': g.fillStyle = '#f4f0e4'; g.beginPath(); g.roundRect(-52, -26, 104, 52, 7); g.fill(); g.strokeStyle = '#2c3e66'; g.lineWidth = 5; g.beginPath(); g.roundRect(-47, -21, 94, 42, 4); g.stroke(); g.fillStyle = '#2c3e66'; g.fillRect(-36, -14, 72, 8); txt(g, 'CD 000', 0, 10, F.monoX(22), '#0B0F14'); break;
      case 'badge': g.fillStyle = '#2c3e66'; g.beginPath(); g.moveTo(0, -48); g.lineTo(38, -34); g.lineTo(36, 8); g.quadraticCurveTo(30, 34, 0, 48); g.quadraticCurveTo(-30, 34, -36, 8); g.lineTo(-38, -34); g.closePath(); g.fill(); g.strokeStyle = th.gold; g.lineWidth = 5; g.stroke(); g.fillStyle = th.gold; g.beginPath(); g.arc(0, -4, 14, 0, 7); g.fill(); break;
      case 'cash': for (let i = 2; i >= 0; i--) { g.fillStyle = i ? '#188a56' : '#1FA366'; g.beginPath(); g.roundRect(-46 + i * 6, -22 - i * 9, 92, 44, 5); g.fill(); } g.fillStyle = '#F5F3EE'; g.beginPath(); g.arc(0, -4, 13, 0, 7); g.fill(); txt(g, '$', 0, -2, F.hero(22), '#188a56'); break;
      case 'cuffs': g.strokeStyle = '#59606B'; g.lineWidth = 9; for (const q of [-1, 1]) { g.beginPath(); g.arc(q * 28, 6, 22, 0, 7); g.stroke(); } g.setLineDash([6, 5]); g.beginPath(); g.moveTo(-8, 6); g.lineTo(8, 6); g.stroke(); g.setLineDash([]); break;
      case 'bottle': g.fillStyle = '#1d2a1f'; g.beginPath(); g.roundRect(-16, -10, 32, 62, 8); g.fill(); g.beginPath(); g.roundRect(-7, -50, 14, 46, 4); g.fill(); g.fillStyle = '#7a1b1b'; g.fillRect(-8, -52, 16, 8); g.fillStyle = '#efe6cf'; g.beginPath(); g.roundRect(-14, 6, 28, 28, 3); g.fill(); g.fillStyle = '#0B0F14'; g.fillRect(-9, 12, 18, 3); g.fillRect(-9, 19, 14, 3); break;
      case 'labels': for (let i = 2; i >= 0; i--) { g.save(); g.translate(i * 8 - 8, -i * 6 + 6); g.rotate(i * 0.07 - 0.07); g.fillStyle = i ? '#d8cfb5' : '#efe6cf'; g.beginPath(); g.roundRect(-34, -26, 68, 52, 4); g.fill(); g.restore(); } g.fillStyle = '#0B0F14'; g.fillRect(-18, -10, 34, 4); g.fillRect(-18, -2, 26, 4); g.fillRect(-18, 6, 30, 4); break;
      case 'paddle': g.fillStyle = '#8a5a2b'; g.fillRect(-5, 6, 10, 46); g.fillStyle = '#F5F3EE'; g.beginPath(); g.arc(0, -16, 34, 0, 7); g.fill(); g.strokeStyle = '#E0281E'; g.lineWidth = 5; g.stroke(); txt(g, '42', 0, -14, F.hero(34), '#0B0F14'); break;
      case 'cheque': g.fillStyle = '#F5F3EE'; g.beginPath(); g.roundRect(-52, -28, 104, 56, 5); g.fill(); g.strokeStyle = '#59606B'; g.lineWidth = 3; g.beginPath(); g.moveTo(-40, 8); g.lineTo(20, 8); g.stroke(); g.fillStyle = '#188a56'; g.fillRect(-46, -22, 30, 8); txt(g, '$', 34, 8, F.hero(30), '#188a56'); break;
      case 'gavel': g.save(); g.rotate(-0.5); g.fillStyle = '#6b4423'; g.beginPath(); g.roundRect(-34, -30, 68, 30, 6); g.fill(); g.fillRect(-5, -2, 10, 60); g.restore(); g.fillStyle = '#2b2f36'; g.beginPath(); g.roundRect(-46, 36, 92, 14, 5); g.fill(); break;
      case 'crown': g.fillStyle = th.gold; g.beginPath(); g.moveTo(-44, 24); g.lineTo(-50, -26); g.lineTo(-22, -4); g.lineTo(0, -40); g.lineTo(22, -4); g.lineTo(50, -26); g.lineTo(44, 24); g.closePath(); g.fill(); break;
      case 'fork': g.strokeStyle = '#59606B'; g.lineWidth = 7; g.beginPath(); g.moveTo(0, 50); g.lineTo(0, -4); for (const q of [-14, 0, 14]) { g.moveTo(q, -4); g.lineTo(q, -44); } g.moveTo(-14, -4); g.lineTo(14, -4); g.stroke(); break;
    }
    g.restore();
  }
  B.crimeIcon = bi;

  // ================= board =================
  B.register('board', {
    defaults: { w: 980, h: 1140, title: 'EVIDENCE BOARD', caseNo: '', items: [], strings: [], tightAt: 99999 }, size: p => [p.w, p.h],
    anchors: p => Object.fromEntries(p.items.map((it, i) => [it.id || ('i' + i), [it.x, it.y, it.w, it.h || it.w]])),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, th = theme, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2;
      B.shadowed(g, () => rr(g, x0, y0, w, h, 22), '#5a3a1e', lift);
      g.save(); rr(g, x0, y0, w, h, 22); g.clip(); const lg = g.createLinearGradient(x0, y0, x0 + w, y0 + h); lg.addColorStop(0, '#b98650'); lg.addColorStop(1, '#8c5f33'); g.fillStyle = lg; g.fillRect(x0, y0, w, h);
      for (let i = 0; i < 320; i++) { g.fillStyle = 'rgba(' + (B.hash(i * 3.1) > 0.5 ? '60,35,10' : '230,190,130') + ',' + (0.06 + 0.1 * B.hash(i * 7.7)) + ')'; g.beginPath(); g.arc(x0 + B.hash(i * 1.3) * w, y0 + B.hash(i * 2.9) * h, 2 + 5 * B.hash(i * 5.1), 0, 7); g.fill(); } g.restore();
      g.strokeStyle = '#4a2f17'; g.lineWidth = 16; rr(g, x0, y0, w, h, 22); g.stroke(); g.strokeStyle = 'rgba(255,255,255,.12)'; g.lineWidth = 3; rr(g, x0 + 9, y0 + 9, w - 18, h - 18, 16); g.stroke();
      // title strip
      g.fillStyle = th.paper; rr(g, -270, y0 - 6, 540, 64, 10); g.fill(); txt(g, p.title, 0, y0 + 27, F.hero(36), th.ink); if (p.caseNo) txt(g, p.caseNo, 0, y0 + 50, F.mono(14), th.inkSoft);
      const pins = []; const tight = ease.out(lin(t, p.tightAt, p.tightAt + 0.5));
      p.items.forEach((it, i) => { const at = it.at ?? -1, on = t - at; pins[i] = [it.x, it.y - (it.h || it.w) / 2 + 10]; if (on < 0) return; const k = pop(on, 'bouncy'), rot = (it.rot || 0) + (1 - k) * 0.25, iw = it.w, ih = it.h || it.w;
        g.save(); g.translate(it.x, it.y); g.rotate(rot); g.scale(0.55 + 0.45 * k, 0.55 + 0.45 * k); g.globalAlpha = clamp(on / 0.08);
        paper(g, -iw / 2, -ih / 2, iw, ih, 10, { lift: 0.2, fill: it.k === 'photo' ? '#EDE7D8' : (it.fill || th.paper) });
        if (it.k === 'photo') { const pw = iw - 24, ph = ih - (it.name ? 66 : 24); g.save(); rr(g, -iw / 2 + 12, -ih / 2 + 12, pw, ph, 4); g.clip(); drawPhoto(g, imgOf(it.src), -iw / 2 + 12, -ih / 2 + 12, pw, ph, { crop: it.crop, fx: it.fx, fy: it.fy, zoom: 1 + (it.push ? it.push * ease.out(lin(on, 0, 3)) : 0) }); g.restore();
          if (it.xmark != null && t >= it.xmark) { const u = ease.out(lin(t, it.xmark, it.xmark + 0.3)); bigX(g, 0, -ih / 2 + 12 + ph / 2, pw * 0.28, RED, u, pw * 0.09); }
          if (it.name) { g.fillStyle = th.navy; rr(g, -iw / 2 + 12, ih / 2 - 52, iw - 24, 40, 6); g.fill(); txt(g, it.name, 0, ih / 2 - 31, F.hero(it.nameSize || 28), th.paper); } }
        else { // note: icon on top, text lines below
          if (it.icon) { g.save(); g.translate(0, -ih / 2 + (it.iconY ?? 62)); bi(g, it.icon, it.iconS || 96, th); g.restore(); }
          const ls = it.lines || []; let y = ih / 2 - 24 - (ls.length - 1) * ((it.size || 38) * 1.05) - (it.size || 38) * 0.5;
          ls.forEach(l => { const [s, tn, sz] = typeof l === 'string' ? [l, 'ink'] : l; txt(g, s, 0, y, F.hero(sz || it.size || 38), B.tone(tn || 'ink', true)); y += (sz || it.size || 38) * 1.05; });
          if (it.stamp && t >= it.stamp.at) { g.save(); g.translate(0, it.stamp.y ?? 0); stamp(g, th, t, { text: it.stamp.text, at: it.stamp.at, tone: it.stamp.tone, size: it.stamp.size || 34, rot: it.stamp.rot ?? -0.12 }); g.restore(); } }
        g.restore(); });
      for (const [a, b, sat] of p.strings) { if (!pins[a] || !pins[b]) continue; const ia = p.items[a], ib = p.items[b]; if (t < Math.max(ia.at ?? -1, ib.at ?? -1)) continue; string(g, pins[a], pins[b], ease.out(lin(t, sat, sat + 0.45)), lerp(34, 3, tight)); }
      p.items.forEach((it, i) => { if (t - (it.at ?? -1) > 0.05) pin(g, pins[i][0], pins[i][1], 11 * pop(t - (it.at ?? -1) - 0.05)); });
    },
  });

  // ================= victim =================
  B.register('victim', {
    defaults: { kind: 'investor', label: 'THE INVESTORS', sub: '', w: 400, h: 500, reactAt: 99999, tape: 'VICTIMS', suit: '#1FA366' }, size: p => [p.w, p.h],
    anchors: p => ({ face: [0, -p.h * 0.12, p.w * 0.6, p.h * 0.45], label: [0, p.h / 2 - 70, p.w, 120] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, th = theme, w = p.w, h = p.h, k = spring(lt, 'heavy'), shock = clamp((t - p.reactAt) / 0.12), by = h / 2 - 150;
      g.save(); g.translate(0, (1 - k) * 200); g.rotate((1 - k) * 0.08); g.globalAlpha *= clamp(lt / 0.1);
      paper(g, -w / 2, -h / 2, w, h, 20, { lift }); g.save(); rr(g, -w / 2 + 18, -h / 2 + 18, w - 36, h - 160, 12); g.clip(); const bg = g.createLinearGradient(0, -h / 2, 0, h / 2); bg.addColorStop(0, '#CFE8DA'); bg.addColorStop(1, '#9FD0B6'); g.fillStyle = bg; g.fillRect(-w / 2, -h / 2, w, h);
      const sw = 1 + 0.03 * Math.sin(t * 2.2); // body
      g.fillStyle = p.suit; g.beginPath(); g.moveTo(-w * 0.34, by + 90); g.quadraticCurveTo(-w * 0.34, by - 30, 0, by - 40); g.quadraticCurveTo(w * 0.34, by - 30, w * 0.34, by + 90); g.closePath(); g.fill(); g.fillStyle = 'rgba(0,0,0,.14)'; g.beginPath(); g.moveTo(0, by - 40); g.quadraticCurveTo(w * 0.34, by - 30, w * 0.34, by + 90); g.lineTo(0, by + 90); g.closePath(); g.fill();
      g.fillStyle = '#F5F3EE'; g.beginPath(); g.moveTo(-26, by - 36); g.lineTo(0, by + 14); g.lineTo(26, by - 36); g.closePath(); g.fill(); g.fillStyle = '#E0281E'; g.beginPath(); g.moveTo(-8, by - 14); g.lineTo(8, by - 14); g.lineTo(5, by + 36); g.lineTo(0, by + 44); g.lineTo(-5, by + 36); g.closePath(); g.fill();
      const hy = by - 100 + (shock * -8); g.fillStyle = '#E8C9A0'; g.beginPath(); g.arc(0, hy, 56, 0, 7); g.fill(); g.fillStyle = 'rgba(224,120,100,.45)'; g.beginPath(); g.arc(-34, hy + 14, 10, 0, 7); g.arc(34, hy + 14, 10, 0, 7); g.fill();
      const ey = hy - 6 - shock * 3; g.fillStyle = '#fff'; for (const q of [-1, 1]) { g.beginPath(); g.arc(q * 20, ey, 11 + shock * 3, 0, 7); g.fill(); } g.fillStyle = '#0B0F14'; for (const q of [-1, 1]) { g.beginPath(); g.arc(q * 20, ey + 1, 5 - shock * 1.5, 0, 7); g.fill(); }
      g.strokeStyle = '#5a3f08'; g.lineWidth = 5; g.lineCap = 'round'; for (const q of [-1, 1]) { g.beginPath(); g.moveTo(q * 8, ey - 20 - shock * 8); g.lineTo(q * 32, ey - 22 - shock * 12 + (1 - shock) * 4); g.stroke(); }
      g.fillStyle = '#7a2b25'; g.beginPath(); if (shock > 0.2) g.ellipse(0, hy + 32, 9, 12 * shock, 0, 0, 7); else { g.arc(0, hy + 30, 14, 0.2, Math.PI - 0.2); } g.fill();
      if (p.kind === 'investor') { g.fillStyle = '#6b4423'; g.beginPath(); g.roundRect(w * 0.12, by + 34, 98, 68, 8); g.fill(); g.strokeStyle = '#4a2f17'; g.lineWidth = 6; g.beginPath(); g.arc(w * 0.12 + 49, by + 34, 20, Math.PI, 0); g.stroke(); g.fillStyle = th.gold; g.fillRect(w * 0.12 + 42, by + 62, 14, 12); }
      if (p.kind === 'collector') { g.fillStyle = '#16202e'; g.beginPath(); g.ellipse(0, hy - 54, 68, 12, 0, 0, 7); g.fill(); g.beginPath(); g.roundRect(-40, hy - 112, 80, 62, 8); g.fill(); g.fillStyle = th.gold; g.fillRect(-40, hy - 66, 80, 10);
        g.strokeStyle = th.gold; g.lineWidth = 5; g.beginPath(); g.arc(20, ey, 17, 0, 7); g.stroke(); g.beginPath(); g.moveTo(32, ey + 12); g.lineTo(44, by + 20); g.stroke(); bi(g, 'paddle', 150, th); }
      if (p.kind === 'billionaire') { g.fillStyle = '#0B0F14'; g.beginPath(); g.roundRect(-46, ey - 12, 40, 22, 6); g.roundRect(6, ey - 12, 40, 22, 6); g.fill(); g.fillRect(-8, ey - 6, 16, 5); g.save(); g.translate(w * 0.2, by + 52); g.rotate(-0.2); bi(g, 'cheque', 120, th); g.restore(); }
      if (p.kind === 'winemaker') { g.fillStyle = '#8a5a2b'; g.beginPath(); g.moveTo(-40, by - 34); g.lineTo(40, by - 34); g.lineTo(54, by + 90); g.lineTo(-54, by + 90); g.closePath(); g.fill(); g.fillStyle = '#16202e'; g.beginPath(); g.ellipse(0, hy - 52, 62, 10, 0, 0, 7); g.fill(); g.beginPath(); g.arc(0, hy - 56, 40, Math.PI, 0); g.fill(); g.save(); g.translate(w * 0.27, by + 36); g.rotate(0.15); bi(g, 'bottle', 120, th); g.restore(); }
      if (p.kind === 'diner') { g.fillStyle = '#F5F3EE'; g.beginPath(); g.moveTo(-40, by - 34); g.lineTo(40, by - 34); g.lineTo(52, by + 70); g.lineTo(-52, by + 70); g.closePath(); g.fill(); g.strokeStyle = '#E0281E'; g.lineWidth = 4; g.beginPath(); g.moveTo(-34, by + 6); g.lineTo(34, by + 6); g.moveTo(-40, by + 30); g.lineTo(40, by + 30); g.stroke(); g.save(); g.translate(w * 0.26, by + 30); g.rotate(0.25); bi(g, 'fork', 100, th); g.restore(); }
      g.restore();
      g.fillStyle = '#188a56'; rr(g, -w / 2 + 18, h / 2 - 130, w - 36, 110, 10); g.fill(); txt(g, p.label, 0, h / 2 - 92, F.hero(p.labelSize || 44), th.paper); if (p.sub) txt(g, p.sub, 0, h / 2 - 48, F.mono(19), rgba(th.paper, 0.85));
      g.save(); g.translate(-w * 0.22, -h / 2 + 4); g.rotate(-0.1); g.fillStyle = '#188a56'; g.fillRect(-60, -16, 120, 32); txt(g, p.tape, 0, 1, F.monoX(17), th.paper); g.restore();
      g.restore();
    },
  });

  // ================= datecard (screen layer slate) =================
  B.register('datecard', {
    defaults: { big: '1988', small: 'FLORIDA', kicker: '', w: 560, tone: 'gold' }, ownEnter: true, size: p => [p.w, 150],
    draw(g, p, env) {
      const { t, lt, theme } = env, th = theme, w = p.w, h = p.kicker ? 170 : 140, k = spring(lt, 'snappy'), a = clamp(lt / 0.1); g.save(); g.globalAlpha *= a; g.translate((1 - k) * -w * 0.6, 0);
      B.shadowed(g, () => rr(g, -w / 2, -h / 2, w, h, 10), '#12171f', 0.4); g.fillStyle = '#12171f'; rr(g, -w / 2, -h / 2, w, h, 10); g.fill(); g.fillStyle = RED; g.fillRect(-w / 2, -h / 2, 12, h);
      const n = Math.floor(lin(lt, 0.1, 0.1 + 0.035 * p.big.length) * p.big.length); let y = -h / 2 + 30; if (p.kicker) { txt(g, p.kicker, -w / 2 + 40, y, F.monoX(20), th.gold, 'left'); y += 40; }
      txt(g, p.big.slice(0, n) + (n < p.big.length && Math.floor(lt * 10) % 2 ? '_' : ''), -w / 2 + 40, y + 36, F.hero(78), th.paper, 'left'); txt(g, p.small, -w / 2 + 40, h / 2 - 28, F.monoX(26), B.tone(p.tone, false), 'left'); g.restore();
    },
  });

  // ================= tile: small evidence tile (icon + caption + optional stamp) =================
  B.register('tile', {
    defaults: { icon: 'plate', caption: '', w: 270, h: 300, iconS: 150, stamp: '', stampAt: 99999, tone: 'bad', tilt: 0 }, size: p => [p.w, p.h],
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, k = spring(lt, 'bouncy'); g.save(); g.translate(0, (1 - k) * 120); g.rotate(p.tilt + (1 - k) * 0.15); g.globalAlpha *= clamp(lt / 0.1);
      paper(g, -p.w / 2, -p.h / 2, p.w, p.h, 16, { lift }); g.save(); g.translate(0, -p.h * 0.1); bi(g, p.icon, p.iconS, theme); g.restore();
      txt(g, p.caption, 0, p.h / 2 - 40, F.hero(p.cap || 34), theme.ink); if (p.stamp) stamp(g, theme, t, { text: p.stamp, at: p.stampAt, tone: p.tone, size: p.stampSize || 46, rot: -0.14, y: -p.h * 0.08 }); g.restore();
    },
  });
})();
// ===== Anna Delvey — Decoded crime-show stage 'astage' (screen space). Layout: pill y238-290 | live card y322-552 | zone y590-1085 | row y1100-1335 (suspect card left, storyteller right) | captions ~1432.
// Facts: voice/beats-v3.md + research/2026-11-27/anna-delvey-fake-heiress (don't-say list respected: no $22M loan, no firm/bank/hotel names, no 'stole from Rachel').
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, burst, hash, hit } = B;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const fmt = (v, d = 0) => B.fmtNum(v, d, true);
  window.AN5 = { h: {} };
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
  const PA = 'brand/photos/anna-sorokin/2.jpg', PB = 'brand/photos/anna-sorokin/4.jpg';
  const cst = (g, th, t, o) => B.crimeStamp(g, th, t, o);
  const img = s => B.images[s];
  const CROP = { [PA]: { crop: [0, 0, 1, 0.66], fx: 0.45, fy: 0.4 }, [PB]: { crop: [0, 0, 1, 0.72], fx: 0.55, fy: 0.36 } };
  function face(g, src, x, y, w, h, zoom = 1, mono = false) { const c = CROP[src]; g.save(); rr(g, x, y, w, h, 8); g.clip(); B.drawPhoto(g, img(src), x, y, w, h, { crop: c.crop, fx: c.fx, fy: c.fy, zoom }); if (mono) { g.globalCompositeOperation = 'saturation'; g.fillStyle = '#808080'; g.fillRect(x, y, w, h); g.globalCompositeOperation = 'source-over'; } g.restore(); g.strokeStyle = 'rgba(11,15,20,.45)'; g.lineWidth = 3; rr(g, x, y, w, h, 8); g.stroke(); }
  const pk = (t, at, o = 'bouncy') => Math.min(1.1, spring(t - at, o));
  const on = (t, at) => t >= at;
  const bubbleTxt = (g, s, x, y, size, col) => txt(g, s, x, y, F.hero(size), col);
  const crown = (g, x, y, s, th) => { g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = th.gold; g.beginPath(); g.moveTo(-60, 0); g.lineTo(-64, -60); g.lineTo(-30, -30); g.lineTo(0, -76); g.lineTo(30, -30); g.lineTo(64, -60); g.lineTo(60, 0); g.closePath(); g.fill(); g.strokeStyle = 'rgba(0,0,0,.3)'; g.lineWidth = 4; g.stroke(); g.restore(); };
  const billS = (g, x, y, w, h, lab) => { clay(g, x, y, w, h, 8, '#1FA366', { shadowK: 0.4 }); g.strokeStyle = 'rgba(245,243,238,.7)'; g.lineWidth = 3; rr(g, x + 7, y + 7, w - 14, h - 14, 5); g.stroke(); g.fillStyle = 'rgba(245,243,238,.9)'; g.beginPath(); g.arc(x + w / 2, y + h / 2, h * 0.28, 0, 7); g.fill(); txt(g, lab, x + w / 2, y + h / 2 + 2, F.hero(h * 0.3), '#0B0F14'); };
  const sub = (g, s, x, y, col, size = 24, al = 'center') => txt(g, s, x, y, F.monoX(size), col, al);
  const bottomChip = (g, S, t, th) => { let ch = null; for (const c of (S.chips || (S.chip ? [S.chip] : []))) if (t >= c.at) ch = c; if (ch && !(S.chipOut && t >= S.chipOut)) chip(g, ch.text, 540, ch.y || 1062, ch.tone || 'ink', th, ch.size || 38, 900, spring(t - ch.at, 'bouncy')); };
  // ---------- scenes ----------
  function society(g, p, lt, t, th, S) {
    const k = pk(t, S.at); g.save(); g.translate(540, 835 + (S.dy || 0) + (1 - Math.min(1, k)) * 90); if (S.sc) g.scale(S.sc, S.sc); g.scale(0.88 + 0.12 * k, 0.88 + 0.12 * k); g.rotate(-0.018 * (1 - Math.min(1, k)) * 4); g.globalAlpha *= clamp((t - S.at) / 0.08);
    paper(g, -440, -235, 880, 470, 18, { lift: 0.6 }); g.strokeStyle = th.gold; g.lineWidth = 6; rr(g, -424, -219, 848, 438, 12); g.stroke(); g.lineWidth = 2; rr(g, -414, -209, 828, 418, 8); g.stroke();
    g.fillStyle = th.navy; rr(g, -424, -219, 848, 52, 12); g.fill(); txt(g, 'THE NEW YORK SOCIETY PAGE', 0, -192, F.monoX(24), th.gold);
    face(g, PA, -400, -140, 300, 340, 1 + 0.05 * lin(t, S.at, S.at + 6)); if (S.flash && lt < 0.4) { g.fillStyle = 'rgba(255,255,255,' + 0.8 * hit(lt, 12) + ')'; rr(g, -400, -140, 300, 340, 8); g.fill(); }
    if (S.crownAt != null && t >= S.crownAt) crown(g, -250, -138 + Math.max(0, 1 - (t - S.crownAt) * 5) * -60, 1.1, th);
    const nm = t - (S.nameAt ?? S.at + 0.3); if (nm > 0) { g.save(); g.globalAlpha *= clamp(nm / 0.1); txt(g, 'ANNA DELVEY', 130, -105, F.hero(76), th.ink); g.restore(); }
    const rl = t - (S.roleAt ?? S.at + 0.6); if (rl > 0) { g.save(); g.globalAlpha *= clamp(rl / 0.1); g.translate(130, -30); g.scale(0.8 + 0.2 * Math.min(1.1, spring(rl, 'bouncy')), 0.8 + 0.2 * Math.min(1.1, spring(rl, 'bouncy'))); clay(g, -230, -34, 460, 68, 14, th.gold, { shadowK: 0.4 }); txt(g, 'GERMAN HEIRESS', 0, 3, F.hero(44), '#0B0F14'); g.restore(); }
    const tr = t - (S.trustAt ?? 9999); if (tr > 0) { g.save(); g.globalAlpha *= clamp(tr / 0.1); txt(g, 'TRUST FUND · OVERSEAS', 130, 52, F.monoX(26), th.inkSoft); g.fillStyle = th.navy; rr(g, -50, 80, 360, 6, 3); g.fill(); g.restore(); }
    sub(g, S.credit || '', 0, 222, th.inkSoft, 12);
    if (S.stampAt != null) cst(g, th, t, { text: 'HEIRESS', at: S.stampAt, tone: 'gold', size: 80, rot: -0.12, x: 150, y: 120 });
    for (const q of S.stamps || []) cst(g, th, t, { size: 80, rot: -0.12, x: 150, y: 120, ...q });
    g.restore(); bottomChip(g, S, t, th);
  }
  function defcard(g, p, lt, t, th, S) {
    const k = pk(t, S.at); g.save(); g.translate(540, 830 + (1 - Math.min(1, k)) * 70); g.scale(0.9 + 0.1 * k, 0.9 + 0.1 * k); g.globalAlpha *= clamp((t - S.at) / 0.08);
    paper(g, -430, -210, 860, 420, 18, { lift: 0.5 }); g.fillStyle = th.navy; rr(g, -430, -210, 860, 78, 18); g.fill(); txt(g, S.head || 'WHAT IT MEANS', 0, -170, F.hero(48), th.gold);
    g.save(); g.translate(-250, 30); const ia = t - (S.iconAt ?? S.at + 0.3); if (ia > 0) { g.globalAlpha *= clamp(ia / 0.1); g.scale(0.7 + 0.3 * Math.min(1.1, spring(ia, 'bouncy')), 0.7 + 0.3 * Math.min(1.1, spring(ia, 'bouncy'))); ICON[S.icon || 'vault'](g, th, t); } g.restore();
    const da = t - (S.defAt ?? S.at + 0.4); if (da > 0) { g.save(); g.globalAlpha *= clamp(da / 0.12); g.translate((1 - Math.min(1, spring(da, 'snappy'))) * 50, 0); txt(g, S.term, 120, -75, F.hero(fit(S.term, F.hero, 520, 78)), th.badInk); txt(g, S.d1, 120, 5, F.hero(fit(S.d1, F.hero, 520, 50)), th.ink); txt(g, S.d2, 120, 65, F.hero(fit(S.d2, F.hero, 520, 50)), th.ink); if (S.d3) txt(g, S.d3, 120, 125, F.hero(fit(S.d3, F.hero, 520, 50)), th.ink); g.restore(); }
    g.restore(); bottomChip(g, S, t, th);
  }
  const ICON = {
    vault(g, th) { g.fillStyle = '#59606B'; rr(g, -110, -110, 220, 220, 20); g.fill(); g.strokeStyle = '#0B0F14'; g.lineWidth = 6; g.stroke(); g.fillStyle = '#7b8492'; rr(g, -92, -92, 184, 184, 12); g.fill(); g.fillStyle = th.gold; g.beginPath(); g.arc(0, 0, 54, 0, 7); g.fill(); g.strokeStyle = '#0B0F14'; g.lineWidth = 5; g.stroke(); for (let i = 0; i < 8; i++) { const a = i / 8 * 6.2832; g.beginPath(); g.moveTo(Math.cos(a) * 18, Math.sin(a) * 18); g.lineTo(Math.cos(a) * 44, Math.sin(a) * 44); g.stroke(); } g.fillStyle = '#0B0F14'; g.beginPath(); g.arc(0, 0, 12, 0, 7); g.fill(); },
    cash(g, th) { B.crimeIcon(g, 'cash', 230, th); }, gavel(g, th) { B.crimeIcon(g, 'gavel', 230, th); }, cuffs(g, th) { B.crimeIcon(g, 'cuffs', 230, th); },
  };
  function claim(g, p, lt, t, th, S) {
    for (let st = 0; st < 3; st++) { const at = S.at + st * 0.25, o = t - at; if (o <= 0) continue; const k = pk(t, at, 'snappy'); for (let b = 0; b < 4 + st * 2; b++) { g.save(); g.globalAlpha *= clamp(o / 0.05); g.translate(250 + st * 290, 1010 - b * 26 - (1 - Math.min(1, k)) * 80); g.rotate(((b + st) % 3 - 1) * 0.03); billS(g, -105, -30, 210, 62, '$'); g.restore(); } }
    const k = pk(t, S.at); g.save(); g.translate(540, 700); g.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k); g.globalAlpha *= clamp((t - S.at) / 0.08); stk(g, 'TENS OF MILLIONS', 0, 0, F.hero(fit('TENS OF MILLIONS', F.hero, 880, 110)), th.gold, 'center', 14); sub(g, 'WHAT SHE SAID HER TRUST FUND WAS WORTH', 0, 76, th.paper, 22); g.restore();
    if (S.stampAt != null && t >= S.stampAt) { g.save(); g.translate(540, 880); g.scale(1, 1); cst(g, th, t, { text: 'NEVER EXISTED', at: S.stampAt, tone: 'bad', size: 78, rot: -0.08, x: 0, y: 0 }); g.restore(); }
    bottomChip(g, S, t, th);
  }
  function nameswap(g, p, lt, t, th, S) {
    const k = pk(t, S.at); g.save(); g.translate(540, 835 + (1 - Math.min(1, k)) * 80); g.globalAlpha *= clamp((t - S.at) / 0.08);
    paper(g, -440, -230, 880, 460, 18, { lift: 0.5 }); face(g, PB, -405, -195, 300, 360, 1.06 - 0.06 * ease.out(clamp((t - S.at) / 1.2))); sub(g, 'PHOTO: MARK MINTON · CC BY-SA 4.0', -255, 192, th.inkSoft, 13);
    g.fillStyle = th.navy; rr(g, -70, -190, 480, 120, 14); g.fill(); sub(g, 'HELLO MY NAME IS', 170, -168, th.gold, 20); txt(g, 'ANNA DELVEY', 170, -112, F.hero(66), th.paper);
    if (S.strikeAt != null && t >= S.strikeAt) { const u = ease.out(clamp((t - S.strikeAt) / 0.3)); g.strokeStyle = th.bad; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); g.moveTo(-60, -108); g.lineTo(-60 + 460 * u, -118); g.stroke(); }
    const rv = t - (S.revealAt ?? 9999); if (rv > 0) { const s = 'ANNA SOROKIN', n = Math.min(s.length, Math.floor(rv * 18)); g.fillStyle = th.paperShade; rr(g, -70, -50, 480, 100, 14); g.fill(); g.strokeStyle = th.bad; g.lineWidth = 4; rr(g, -70, -50, 480, 100, 14); g.stroke(); txt(g, s.slice(0, n), 170, 2, F.hero(66), th.ink); sub(g, 'HER REAL NAME', 170, 66, th.badInk, 20); }
    const c1 = t - (S.c1 ?? 9999); if (c1 > 0) { g.save(); g.globalAlpha *= clamp(c1 / 0.1); clay(g, -70, 90, 230, 56, 28, th.gold, { shadowK: 0.3 }); txt(g, 'FROM RUSSIA', 45, 120, F.hero(30), '#0B0F14'); g.restore(); }
    const c2 = t - (S.c2 ?? 9999); if (c2 > 0) { g.save(); g.globalAlpha *= clamp(c2 / 0.1); clay(g, 175, 90, 235, 56, 28, th.gold, { shadowK: 0.3 }); txt(g, 'RAISED IN GERMANY', 292, 120, F.hero(26), '#0B0F14'); g.restore(); }
    if (S.stampAt != null) cst(g, th, t, { text: 'NO FORTUNE', at: S.stampAt, tone: 'bad', size: 70, rot: -0.1, x: 130, y: 180 });
    g.restore(); bottomChip(g, S, t, th);
  }
  function receipt(g, x, y, w, h, rot, th, title, lines, k, total, stampT, t, stampAt) {
    g.save(); g.translate(x, y); g.rotate(rot); g.scale(k, k); paper(g, -w / 2, -h / 2, w, h, 6, { lift: 0.35, fill: '#FBFAF4' }); txt(g, title, 0, -h / 2 + 30, F.monoX(20), th.ink); g.strokeStyle = '#999'; g.lineWidth = 2; g.setLineDash([6, 6]); g.beginPath(); g.moveTo(-w / 2 + 16, -h / 2 + 52); g.lineTo(w / 2 - 16, -h / 2 + 52); g.stroke(); g.setLineDash([]);
    lines.forEach((l, i) => { sub(g, l, -w / 2 + 18, -h / 2 + 82 + i * 30, th.inkSoft, 17, 'left'); g.fillStyle = '#d6d2c6'; g.fillRect(w / 2 - 80, -h / 2 + 76 + i * 30, 60, 8); }); txt(g, 'TOTAL', -w / 2 + 52, h / 2 - 36, F.monoX(22), th.ink); txt(g, total, w / 2 - 70, h / 2 - 34, F.hero(30), th.ink);
    if (stampAt != null) cst(g, th, t, { text: stampT, at: stampAt, tone: 'bad', size: 36, rot: -0.2, x: 0, y: 20 }); g.restore();
  }
  function keycard(g, x, y, rot, th, k, label) { g.save(); g.translate(x, y); g.rotate(rot); g.scale(k, k); B.shadowed(g, () => rr(g, -130, -80, 260, 160, 14), '#12171f', 0.45); g.fillStyle = '#12171f'; rr(g, -130, -80, 260, 160, 14); g.fill(); g.fillStyle = th.gold; g.fillRect(-130, -30, 260, 16); g.fillStyle = '#2b3342'; rr(g, 70, 24, 40, 38, 6); g.fill(); txt(g, label, -60, -52, F.monoX(16), th.gold); txt(g, 'NEW YORK', -60, 24, F.hero(32), th.paper); sub(g, 'KEY CARD', -60, 56, '#8c93a1', 16); g.restore(); }
  function luxe(g, p, lt, t, th, S) {
    [[390, 800, -0.16, 'SUITE'], [540, 760, 0.04, 'SUITE'], [690, 810, 0.2, 'SUITE']].forEach(([x, y, r, l], i) => { const at = S.keysAt + i * 0.2; if (t < at) return; g.save(); g.globalAlpha *= clamp((t - at) / 0.06); keycard(g, x, y - (1 - Math.min(1, pk(t, at))) * -80, r, th, 0.9 * pk(t, at), l); g.restore(); });
    if (t >= S.rcptAt) { receipt(g, 270, 960, 280, 250, -0.07, th, 'ROOM SERVICE', ['CHAMPAGNE', 'SUITE DINNER', 'LATE SNACK'], pk(t, S.rcptAt), '$$$$', 'UNPAID', t, S.stampAt); receipt(g, 810, 960, 280, 250, 0.07, th, 'RESTAURANT', ['TABLE FOR 6', 'COCKTAILS', 'TIP'], pk(t, S.rcptAt + 0.25), '$$$$', 'UNPAID', t, S.stampAt != null ? S.stampAt + 0.3 : null); }
    bottomChip(g, S, t, th);
  }
  function terminal(g, p, lt, t, th, S) {
    g.save(); g.translate(540, 850); B.shadowed(g, () => rr(g, -190, -250, 380, 500, 34), '#12171f', 0.6); g.fillStyle = '#1b2230'; rr(g, -190, -250, 380, 500, 34); g.fill(); g.strokeStyle = '#2f3a50'; g.lineWidth = 4; g.stroke();
    // phase
    let ph = 0, since = 0; const cy = S.cycles; for (let i = 0; i < cy.length; i++) if (t >= cy[i]) { ph = i + 1; since = t - cy[i]; }
    const declined = ph > 0 && since > 0.32 && since < 1.05; const flash = declined ? 0.65 + 0.35 * Math.sin(since * 30) : 0;
    g.fillStyle = declined ? 'rgb(' + Math.round(150 + 80 * flash) + ',24,24)' : '#0f2a22'; rr(g, -156, -216, 312, 150, 12); g.fill();
    txt(g, declined ? 'DECLINED' : (since < 0.32 && ph > 0 ? 'PROCESSING…' : 'INSERT CARD'), 0, -150, F.hero(declined ? 64 : 40), declined ? th.paper : '#7be3b0'); if (declined) sub(g, 'CARD NOT ACCEPTED', 0, -100, th.paper, 18);
    for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) { g.fillStyle = '#323d55'; rr(g, -98 + c * 70, -30 + r * 52, 56, 38, 8); g.fill(); }
    g.fillStyle = '#0B0F14'; rr(g, -120, 200, 240, 18, 6); g.fill();
    if (ph > 0 && since < 0.5) { const u = ease.out(clamp(since / 0.3)); g.save(); g.translate(0, 200 - 330 * (1 - u)); clay(g, -90, -50, 180, 110, 12, th.gold, { shadowK: 0.4 }); g.fillStyle = '#7a5806'; g.fillRect(-90, -24, 180, 22); txt(g, 'HER CARD', 0, 30, F.hero(22), '#0B0F14'); g.restore(); }
    g.restore();
    // AGAIN counter (no number: she was declined again and again)
    const n = cy.filter(c => t >= c).length; if (n > 1) { g.save(); g.translate(540 - 260 + 10, 700); const k = Math.min(1.1, spring(t - cy[n - 1], 'bouncy')); g.scale(k, k); txt(g, n > 2 ? 'AGAIN. AND AGAIN.' : 'AGAIN.', 0, 0, F.hero(56), th.bad); g.restore(); }
    for (let i = 0; i < n; i++) { const c = cy[i], u = t - c - 0.32; if (u > 0 && u < 0.5) { g.save(); g.globalAlpha *= 1 - u / 0.5; stk(g, 'DECLINED', 540 + (i % 2 ? 260 : -260), 800 - u * 90, F.hero(52), th.bad, 'center', 8); g.restore(); } }
    bottomChip(g, S, t, th);
  }
  function bankIcon(g, x, y, s, th, col) { g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = col; g.beginPath(); g.moveTo(-90, -30); g.lineTo(0, -90); g.lineTo(90, -30); g.closePath(); g.fill(); for (let i = -2; i <= 2; i++) g.fillRect(i * 34 - 10, -20, 20, 80); g.fillRect(-100, 66, 200, 18); g.strokeStyle = '#0B0F14'; g.lineWidth = 4; g.stroke(); g.restore(); }
  function cover(g, p, lt, t, th, S) {
    const a = pk(t, S.at); g.save(); g.translate(250, 820); g.scale(0.8 + 0.2 * a, 0.8 + 0.2 * a); g.globalAlpha *= clamp((t - S.at) / 0.08); paper(g, -190, -190, 380, 380, 20, { lift: 0.4 }); bankIcon(g, 0, -20, 1.35, th, '#8aa0c8'); txt(g, 'HER BANK', 0, 150, F.hero(44), th.ink); g.restore();
    if (t >= S.blameAt) { const u = ease.out(clamp((t - S.blameAt) / 0.35)); g.save(); g.strokeStyle = th.bad; g.fillStyle = th.bad; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); g.moveTo(130, 600); g.quadraticCurveTo(250, 560, 250 + 20 * u, 660 - 40 * u); g.stroke(); g.restore(); g.save(); g.translate(250, 640); g.scale(pk(t, S.blameAt), pk(t, S.blameAt)); clay(g, -150, -34, 300, 68, 34, th.bad, { shadowK: 0.5 }); txt(g, 'SHE BLAMES IT', 0, 3, F.hero(36), th.paper); g.restore(); }
    if (t >= S.billAt) { const k = pk(t, S.billAt); g.save(); g.translate(790, 790); g.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k); g.globalAlpha *= clamp((t - S.billAt) / 0.08); receipt(g, 0, 0, 300, 300, 0.05, th, 'THE BILL', ['DINNER', 'DRINKS', 'TIP'], 1, '$$$$', 'PAID', t, S.paidAt); g.restore(); }
    if (t >= S.paidAt) { const u = pk(t, S.paidAt); g.save(); g.translate(790, 1010); g.scale(0.7 + 0.3 * u, 0.7 + 0.3 * u); clay(g, -150, -50, 300, 100, 14, th.navy, { shadowK: 0.5 }); txt(g, 'SOMEONE ELSE’S CARD', 0, -8, F.hero(26), th.paper); sub(g, 'COVERS THE BILL', 0, 26, th.gold, 20); g.restore(); }
    bottomChip(g, S, t, th);
  }
  function phone(g, p, lt, t, th, S) {
    const k = pk(t, S.at); g.save(); g.translate(540, 835 + (1 - Math.min(1, k)) * 80); g.scale(0.9 + 0.1 * k, 0.9 + 0.1 * k); g.globalAlpha *= clamp((t - S.at) / 0.08);
    B.shadowed(g, () => rr(g, -250, -235, 500, 470, 40), '#12171f', 0.6); g.fillStyle = '#1b2230'; rr(g, -250, -235, 500, 470, 40); g.fill(); g.fillStyle = '#e9eef7'; rr(g, -230, -215, 460, 430, 26); g.fill(); g.fillStyle = th.navy; rr(g, -230, -215, 460, 64, 26); g.fill(); txt(g, 'MESSAGES', 0, -184, F.monoX(22), th.paper);
    const mb = t - S.msgAt; if (mb > 0) { const kk = Math.min(1.1, spring(mb, 'bouncy')); g.save(); g.translate(-210, -105); g.scale(0.7 + 0.3 * kk, 0.7 + 0.3 * kk); g.globalAlpha *= clamp(mb / 0.08); clay(g, 0, 0, 360, 84, 26, th.badInk, { shadowK: 0.3 }); txt(g, '“THE WIRE IS COMING”', 180, 44, F.hero(32), th.paper); g.restore(); sub(g, 'HER EXCUSE', -210, -122, th.badInk, 18, 'left'); }
    const dt = (t - S.at) * 3; if (!(S.neverAt != null && t >= S.neverAt)) { g.fillStyle = '#c9d2e3'; rr(g, 50, -10, 150, 54, 24); g.fill(); for (let i = 0; i < 3; i++) { g.fillStyle = 'rgba(11,15,20,' + (0.3 + 0.5 * Math.max(0, Math.sin(dt * 3 - i))) + ')'; g.beginPath(); g.arc(88 + i * 36, 17, 8, 0, 7); g.fill(); } }
    // transfer bar that never fills
    txt(g, 'WIRE TRANSFER', 0, 80, F.monoX(22), th.ink); g.fillStyle = '#c9d2e3'; rr(g, -190, 100, 380, 36, 18); g.fill(); const sh = (Math.sin((t - S.at) * 2.4) * 0.5 + 0.5) * 0.14 + 0.02; g.fillStyle = th.gold; rr(g, -190, 100, Math.max(36, 380 * sh), 36, 18); g.fill();
    sub(g, S.neverAt != null && t >= S.neverAt ? 'STILL PENDING…' : 'ARRIVING SOON…', 0, 168, th.inkSoft, 20);
    if (S.neverAt != null) cst(g, th, t, { text: 'NEVER CAME', at: S.neverAt, tone: 'bad', size: 74, rot: -0.1, x: 0, y: 40 });
    g.restore(); bottomChip(g, S, t, th);
  }
  function wiredef(g, p, lt, t, th, S) {
    const k = pk(t, S.at); g.save(); g.globalAlpha *= clamp((t - S.at) / 0.08); g.translate(0, (1 - Math.min(1, k)) * 50);
    paper(g, -0 + 70, 620, 940, 330, 20, { lift: 0.4 }); bankIcon(g, 220, 800, 1.0, th, '#8aa0c8'); bankIcon(g, 860, 800, 1.0, th, '#8aa0c8'); txt(g, 'BANK', 220, 900, F.hero(34), th.ink); txt(g, 'BANK', 860, 900, F.hero(34), th.ink);
    g.strokeStyle = th.ink; g.lineWidth = 6; g.setLineDash([14, 12]); g.beginPath(); g.moveTo(330, 800); g.lineTo(750, 800); g.stroke(); g.setLineDash([]);
    const u = t - S.coinAt, stop = S.xAt != null && t >= S.xAt; if (u > 0) { const q = stop ? 0.5 : (u * 0.6) % 1, x = 330 + 420 * q; g.save(); g.globalAlpha *= stop ? Math.max(0, 1 - (t - S.xAt) / 0.3) : 1; g.fillStyle = th.gold; g.beginPath(); g.arc(x, 800, 24, 0, 7); g.fill(); g.strokeStyle = '#7a5806'; g.lineWidth = 4; g.stroke(); txt(g, '$', x, 802, F.hero(28), '#7a5806'); g.restore(); }
    if (stop) { const xx = pk(t, S.xAt); g.save(); g.translate(540, 800); g.scale(xx, xx); g.strokeStyle = th.bad; g.lineWidth = 16; g.lineCap = 'round'; g.beginPath(); g.moveTo(-50, -50); g.lineTo(50, 50); g.moveTo(50, -50); g.lineTo(-50, 50); g.stroke(); g.restore(); }
    txt(g, 'A WIRE = BANK-TO-BANK TRANSFER', 540, 668, F.hero(fit('A WIRE = BANK-TO-BANK TRANSFER', F.hero, 860, 50)), th.ink);
    g.restore(); bottomChip(g, S, t, th);
  }
  function hotels(g, p, lt, t, th, S) {
    const dk = pk(t, S.at); g.save(); g.translate(540 - 340 + (1 - Math.min(1, dk)) * -300, 650); g.globalAlpha *= clamp((t - S.at) / 0.08); B.shadowed(g, () => rr(g, -190, -60, 380, 120, 10), '#12171f', 0.4); g.fillStyle = '#12171f'; rr(g, -190, -60, 380, 120, 10); g.fill(); g.fillStyle = th.bad; g.fillRect(-190, -60, 12, 120); sub(g, 'NEW YORK CITY', -160, -30, th.gold, 20, 'left'); txt(g, '2017', -160, 20, F.hero(64), th.paper, 'left'); g.restore();
    [[320, 'HOTEL 1', S.s1], [760, 'HOTEL 2', S.s2]].forEach(([x, l, at], i) => { const k = pk(t, S.at + 0.3 + i * 0.35); if (t < S.at + 0.3 + i * 0.35) return; g.save(); g.translate(x, 880); g.rotate(i ? 0.06 : -0.06); g.scale(1.25 * k, 1.25 * k); g.globalAlpha *= clamp((t - S.at - 0.3 - i * 0.35) / 0.08); keycard(g, 0, 0, 0, th, 1, l); if (at != null) cst(g, th, t, { text: 'UNPAID', at, tone: 'bad', size: 44, rot: -0.15, x: 10, y: 20 }); g.restore(); });
    bottomChip(g, S, t, th);
  }
  function friend(g, p, lt, t, th, S) {
    const a = pk(t, S.at); g.save(); g.translate(300, 835 + (1 - Math.min(1, a)) * 70); g.rotate(-0.03); g.globalAlpha *= clamp((t - S.at) / 0.08); paper(g, -215, -245, 430, 490, 18, { lift: 0.5 }); face(g, PA, -190, -220, 380, 330, 1.0); g.fillStyle = th.navy; rr(g, -190, 124, 380, 96, 10); g.fill(); txt(g, 'ANNA DELVEY', 0, 156, F.hero(44), th.paper); sub(g, 'THE “HEIRESS”', 0, 196, th.gold, 20); g.restore();
    const b = t - (S.rAt ?? S.at + 0.5); if (b > 0) { const kk = Math.min(1.1, spring(b, 'bouncy')); g.save(); g.translate(790, 835 + (1 - Math.min(1, kk)) * 70); g.rotate(0.03); g.globalAlpha *= clamp(b / 0.08); paper(g, -215, -245, 430, 490, 18, { lift: 0.5 });
      const bg = g.createLinearGradient(0, -220, 0, 110); bg.addColorStop(0, '#CFE8DA'); bg.addColorStop(1, '#9FD0B6'); g.fillStyle = bg; rr(g, -190, -220, 380, 330, 12); g.fill(); g.save(); rr(g, -190, -220, 380, 330, 12); g.clip();
      g.fillStyle = '#1FA366'; g.beginPath(); g.moveTo(-150, 120); g.quadraticCurveTo(-140, 0, 0, -20); g.quadraticCurveTo(140, 0, 150, 120); g.fill(); g.fillStyle = '#6b3b1d'; g.beginPath(); g.ellipse(0, -100, 70, 80, 0, 0, 7); g.fill(); g.fillStyle = '#E8C9A0'; g.beginPath(); g.ellipse(0, -80, 52, 62, 0, 0, 7); g.fill(); g.fillStyle = '#0B0F14'; for (const q of [-1, 1]) { g.beginPath(); g.arc(q * 20, -84, 5, 0, 7); g.fill(); } g.strokeStyle = '#7a2b25'; g.lineWidth = 5; g.beginPath(); g.arc(0, -58, 16, 0.2, 2.9); g.stroke();
      g.fillStyle = '#2b2f36'; rr(g, 40, 10, 110, 76, 10); g.fill(); g.fillStyle = '#59606B'; g.beginPath(); g.arc(95, 48, 26, 0, 7); g.fill(); g.fillStyle = '#9ad7ff'; g.beginPath(); g.arc(95, 48, 16, 0, 7); g.fill(); g.restore();
      g.fillStyle = '#188a56'; rr(g, -190, 124, 380, 96, 10); g.fill(); txt(g, 'RACHEL WILLIAMS', 0, 156, F.hero(38), th.paper); sub(g, 'MAGAZINE PHOTO EDITOR', 0, 196, th.paper, 18); sub(g, 'ILLUSTRATION', 0, -232, th.inkSoft, 13); g.restore(); }
    if (S.strAt != null && t >= S.strAt) { const u = ease.out(clamp((t - S.strAt) / 0.5)); g.save(); g.strokeStyle = th.badInk; g.lineWidth = 7; g.lineCap = 'round'; g.beginPath(); g.moveTo(420, 640); g.quadraticCurveTo(540, 600 + 60 * Math.sin(3.14 * u), 420 + 240 * u, 640); g.stroke(); g.restore(); const k2 = pk(t, S.strAt); g.save(); g.translate(540, 612); g.scale(k2, k2); clay(g, -110, -26, 220, 52, 26, th.bad, { shadowK: 0.4 }); txt(g, 'HER FRIEND', 0, 2, F.hero(30), th.paper); g.restore(); }
    bottomChip(g, S, t, th);
  }
  function morocco(g, p, lt, t, th, S) {
    const a = pk(t, S.at); g.save(); g.translate(540, 650 + (1 - Math.min(1, a)) * -50); g.globalAlpha *= clamp((t - S.at) / 0.08); clay(g, -400, -48, 800, 96, 24, th.navy, { shadowK: 0.5 }); g.fillStyle = th.gold; g.beginPath(); g.arc(-330, 0, 26, 0, 7); g.fill(); for (let i = 0; i < 8; i++) { const an = i / 8 * 6.28; g.strokeStyle = th.gold; g.lineWidth = 4; g.beginPath(); g.moveTo(-330 + Math.cos(an) * 34, Math.sin(an) * 34); g.lineTo(-330 + Math.cos(an) * 44, Math.sin(an) * 44); g.stroke(); }
    txt(g, 'THE MOROCCO TRIP', 20, 3, F.hero(54), th.paper); g.restore();
    if (t >= S.billAt) { const u = ease.out(clamp((t - S.billAt) / 0.5)), k = pk(t, S.billAt), v = Math.round(62000 * ease.out(clamp((t - S.numAt) / 0.9))); g.save(); g.translate(300 + 0 * u, 900 - (1 - u) * 140); g.rotate(-0.05); g.globalAlpha *= clamp((t - S.billAt) / 0.08); g.scale(k, k); paper(g, -190, -200, 380, 400, 8, { lift: 0.5, fill: '#FBFAF4' }); txt(g, 'MOROCCO TRIP', 0, -168, F.monoX(22), th.ink); g.strokeStyle = '#999'; g.setLineDash([6, 6]); g.lineWidth = 2; g.beginPath(); g.moveTo(-170, -140); g.lineTo(170, -140); g.stroke(); g.setLineDash([]); ['HOTEL', 'TRANSPORT', 'DINNERS', 'ACTIVITIES'].forEach((l, i) => { sub(g, l, -165, -108 + i * 34, th.inkSoft, 18, 'left'); g.fillStyle = '#d6d2c6'; g.fillRect(90, -114 + i * 34, 70, 8); }); txt(g, 'TOTAL', 0, 60, F.monoX(24), th.ink); txt(g, '$' + fmt(v), 0, 128, F.hero(fit('$62,000', F.hero, 330, 88)), th.badInk); g.restore(); }
    if (t >= S.cardAt) { const u = ease.out(clamp((t - S.cardAt) / 0.5)), k = pk(t, S.cardAt); g.save(); g.translate(780 + (1 - u) * -120, 880); g.rotate(0.06); g.scale(k, k); g.globalAlpha *= clamp((t - S.cardAt) / 0.08); clay(g, -190, -118, 380, 236, 22, '#2c3e66', { shadowK: 0.6 }); g.fillStyle = th.gold; rr(g, -150, -64, 60, 46, 8); g.fill(); sub(g, '•••• •••• •••• ••••', 0, 20, th.paper, 24); txt(g, 'RACHEL', -120, 78, F.hero(36), th.paper, 'left'); if (S.chargedAt != null) cst(g, th, t, { text: 'CHARGED', at: S.chargedAt, tone: 'bad', size: 52, rot: -0.14, x: 0, y: -10 }); g.restore(); }
    bottomChip(g, S, t, th);
  }
  function pay(g, p, lt, t, th, S) {
    [['THE BILL', '$62,000', th.bad, 0.0], ['A YEAR OF PAY', 'FOR A LOT OF PEOPLE', th.gold, 0.25]].forEach(([l, v, col, d], i) => { const at = S.at + d, o = t - at; if (o <= 0) return; const u = ease.out(clamp(o / 0.9)), y = 700 + i * 190; g.save(); g.globalAlpha *= clamp(o / 0.1); sub(g, l, 90, y - 12, th.paper, 28, 'left'); stk(g, v, 990, y - 12, F.hero(fit(v, F.hero, 520, 54)), col, 'right', 9); g.fillStyle = 'rgba(245,243,238,.14)'; rr(g, 90, y + 24, 900, 76, 38); g.fill(); g.save(); rr(g, 90, y + 24, 900, 76, 38); g.clip(); clay(g, 90, y + 24, Math.max(76, 880 * u), 76, 38, col, { shadowK: 0.3 }); g.restore(); g.restore(); });
    bottomChip(g, S, t, th);
  }
  function arrest(g, p, lt, t, th, S) {
    const k = pk(t, S.at); g.save(); g.translate(540, 830 + (1 - Math.min(1, k)) * 70); g.scale(0.9 + 0.1 * k, 0.9 + 0.1 * k); g.globalAlpha *= clamp((t - S.at) / 0.08); paper(g, -300, -240, 600, 480, 16, { lift: 0.6 }); face(g, PA, -270, -210, 540, 330, 1 + 0.12 * ease.out(clamp((t - S.at) / 3)), false);
    if (S.flash && lt < 0.4) { g.fillStyle = 'rgba(255,255,255,' + 0.9 * hit(lt, 12) + ')'; rr(g, -270, -210, 540, 330, 8); g.fill(); }
    if (S.xAt != null && t >= S.xAt) { g.fillStyle = 'rgba(40,0,0,.35)'; rr(g, -270, -210, 540, 330, 8); g.fill(); }
    g.fillStyle = th.navy; rr(g, -270, 130, 540, 90, 10); g.fill(); txt(g, 'ANNA DELVEY', -240, 170, F.hero(48), th.paper, 'left'); sub(g, 'ARRESTED · OCT 2017', -240, 204, th.gold, 20, 'left');
    const cu = t - (S.cuffAt ?? 9999); if (cu > 0) { g.save(); g.translate(205, 168); g.rotate(-0.2); const kk = Math.min(1.1, spring(cu, 'bouncy')); g.scale(kk * 0.7, kk * 0.7); B.crimeIcon(g, 'cuffs', 150, th); g.restore(); }
    if (S.stampAt != null) cst(g, th, t, { text: 'ARRESTED', at: S.stampAt, tone: 'bad', size: 84, rot: -0.12, x: 0, y: -40 });
    g.restore(); bottomChip(g, S, t, th);
  }
  function verdict(g, p, lt, t, th, S) {
    const k = pk(t, S.at); g.save(); g.globalAlpha *= clamp((t - S.at) / 0.08); g.translate(0, (1 - Math.min(1, k)) * 50);
    paper(g, 90, 610, 270, 360, 16, { lift: 0.5 }); face(g, PA, 108, 628, 234, 250, 1.05, true); g.fillStyle = th.navy; rr(g, 108, 886, 234, 66, 8); g.fill(); txt(g, 'ANNA DELVEY', 225, 910, F.hero(30), th.paper); sub(g, 'MANHATTAN JURY · 2019', 225, 940, th.gold, 13);
    for (let i = 0; i < 8; i++) { const c = i % 2, r = Math.floor(i / 2), x = 395 + c * 300, y = 625 + r * 90, at = S.countAt + i * (S.countStep || 0.22); g.fillStyle = th.paper; rr(g, x, y, 280, 78, 10); g.fill(); g.strokeStyle = '#59606B'; g.lineWidth = 2; rr(g, x, y, 280, 78, 10); g.stroke(); sub(g, 'COUNT ' + (i + 1), x + 16, y + 26, th.inkSoft, 20, 'left'); txt(g, i === S.larcenyIdx ? 'GRAND LARCENY' : (i % 2 ? 'THEFT OF SERVICES' : 'LARCENY CHARGE'), x + 16, y + 56, F.hero(24), th.ink, 'left'); if (t >= at) { g.save(); g.translate(x + 215, y + 40); const kk = 1 + 1.0 * (1 - ease.expo(clamp((t - at) / 0.15))); g.rotate(-0.12); g.scale(kk, kk); g.globalAlpha *= clamp((t - at) / 0.04); g.strokeStyle = th.badInk; g.lineWidth = 5; rr(g, -56, -22, 112, 44, 6); g.stroke(); txt(g, 'GUILTY', 0, 2, F.hero(30), th.badInk); g.restore(); } }
    g.restore(); bottomChip(g, S, t, th);
  }
  function sentence(g, p, lt, t, th, S) {
    const k = pk(t, S.at); g.save(); g.translate(540, 775 + (1 - Math.min(1, k)) * 60); g.globalAlpha *= clamp((t - S.at) / 0.08); paper(g, -300, -170, 600, 340, 16, { lift: 0.5 }); face(g, PA, -270, -140, 540, 280, 1.1, true);
    const bu = ease.in(clamp((t - (S.barsAt ?? S.at)) / 0.35)); for (let i = 0; i < 8; i++) { const bx = -270 + (i + 0.5) * 540 / 8; g.fillStyle = '#10161f'; g.fillRect(bx - 9, -140, 18, 280 * bu); g.fillStyle = 'rgba(255,255,255,.22)'; g.fillRect(bx - 9, -140, 5, 280 * bu); } g.restore();
    const ya = t - S.yrsAt; if (ya > 0) { const kk = Math.min(1.1, spring(ya, 'bouncy')); g.save(); g.translate(540, 1000); g.scale(0.8 + 0.2 * kk, 0.8 + 0.2 * kk); g.globalAlpha *= clamp(ya / 0.08); stk(g, '4 TO 12 YEARS', 0, -20, F.hero(fit('4 TO 12 YEARS', F.hero, 860, 120)), th.bad, 'center', 14); g.restore(); }
    if (ya > 0.2) { const w = 840 / 12; for (let i = 0; i < 12; i++) { const u = ease.out(clamp((ya - 0.2 - i * 0.04) / 0.3)); g.fillStyle = i < 4 ? th.bad : 'rgba(255,59,48,.35)'; rr(g, 120 + i * w + 2, 1060, w - 4, 18 * u, 4); g.fill(); } }
    bottomChip(g, S, t, th);
  }
  function repay(g, p, lt, t, th, S) {
    const k = pk(t, S.at); for (let b = 0; b < 8; b++) { const o = t - (S.at + b * 0.07); if (o <= 0) continue; g.save(); g.globalAlpha *= clamp(o / 0.05); g.translate(540 + (b % 2 ? 8 : -8), 940 - b * 24 - (1 - Math.min(1, pk(t, S.at + b * 0.07, 'snappy'))) * 80); g.rotate((b % 3 - 1) * 0.025); billS(g, -190, -40, 380, 96, '$'); g.restore(); }
    const v = Math.round(200000 * ease.out(clamp((t - S.numAt) / 0.9))); g.save(); g.translate(540, 690); g.scale(0.85 + 0.15 * k, 0.85 + 0.15 * k); g.globalAlpha *= clamp((t - S.numAt + 0.3) / 0.2); stk(g, 'ABOUT $' + fmt(v), 0, 0, F.hero(fit('ABOUT $200,000', F.hero, 880, 120)), th.good, 'center', 14); g.restore();
    bottomChip(g, S, t, th);
  }
  function board(g, p, lt, t, th, S) {
    const k = pk(t, S.at); g.save(); g.translate(540, 830 + (1 - Math.min(1, k)) * 60); g.globalAlpha *= clamp((t - S.at) / 0.08);
    const lg = g.createLinearGradient(-450, -230, 450, 230); lg.addColorStop(0, '#b98650'); lg.addColorStop(1, '#8c5f33'); g.fillStyle = lg; rr(g, -450, -240, 900, 480, 18); g.fill(); g.strokeStyle = '#4a2f17'; g.lineWidth = 14; rr(g, -450, -240, 900, 480, 18); g.stroke();
    for (let i = 0; i < 160; i++) { g.fillStyle = 'rgba(' + (hash(i * 3.1) > 0.5 ? '60,35,10' : '230,190,130') + ',' + (0.06 + 0.1 * hash(i * 7.7)) + ')'; g.beginPath(); g.arc(-440 + hash(i * 1.3) * 880, -230 + hash(i * 2.9) * 460, 2 + 4 * hash(i * 5.1), 0, 7); g.fill(); }
    const items = [{ x: 0, y: -70, w: 190, h: 215, kind: 'photo' }, { x: -310, y: -100, w: 170, h: 150, icon: 'cash', txt: 'DECLINED', col: th.badInk, at: 0 }, { x: -310, y: 100, w: 170, h: 150, icon: 'cheque', txt: 'THE WIRE', col: th.ink, at: 1 }, { x: 310, y: -100, w: 170, h: 150, icon: 'cash', txt: '$62,000', col: th.badInk, at: 2 }, { x: 310, y: 100, w: 170, h: 150, icon: 'gavel', txt: '8 COUNTS', col: th.ink, at: 3 }];
    const pins = items.map(it => [it.x, it.y - it.h / 2 + 8]), tight = ease.out(clamp((t - S.tightAt) / 0.5));
    items.forEach((it, i) => { if (i) { const at = S.at + 0.3 + (i - 1) * 0.25, u = ease.out(clamp((t - at - 0.1) / 0.4)); if (u > 0) { const a = pins[0], b = pins[i]; g.strokeStyle = '#E0281E'; g.lineWidth = 5; g.lineCap = 'round'; g.beginPath(); g.moveTo(a[0], a[1]); const ex = lerp(a[0], b[0], u), ey = lerp(a[1], b[1], u); g.quadraticCurveTo((a[0] + ex) / 2, (a[1] + ey) / 2 + 36 * (1 - tight), ex, ey); g.stroke(); } } });
    items.forEach((it, i) => { const at = i ? S.at + 0.3 + (i - 1) * 0.25 : S.at, o = t - at; if (o < 0) return; const kk = Math.min(1.1, spring(o, 'bouncy')); g.save(); g.translate(it.x, it.y); g.rotate((i - 2) * 0.03 + (1 - Math.min(1, kk)) * 0.2); g.scale(0.6 + 0.4 * kk, 0.6 + 0.4 * kk); paper(g, -it.w / 2, -it.h / 2, it.w, it.h, 8, { lift: 0.3, fill: it.kind ? '#EDE7D8' : th.paper });
      if (it.kind) { face(g, PA, -it.w / 2 + 10, -it.h / 2 + 10, it.w - 20, it.h - 64, 1.0); g.fillStyle = th.navy; rr(g, -it.w / 2 + 10, it.h / 2 - 48, it.w - 20, 38, 6); g.fill(); txt(g, 'DELVEY', 0, it.h / 2 - 29, F.hero(26), th.paper); } else { g.save(); g.translate(0, -26); B.crimeIcon(g, it.icon, 80, th); g.restore(); txt(g, it.txt, 0, it.h / 2 - 28, F.hero(fit(it.txt, F.hero, it.w - 16, 32)), it.col); } g.restore(); g.fillStyle = '#c4231a'; g.beginPath(); g.arc(pins[i][0], pins[i][1], 10, 0, 7); g.fill(); });
    g.restore(); if (S.stampAt != null) { g.save(); g.translate(540, 840); cst(g, th, t, { text: S.stampText || 'THE MONEY NEVER SHOWED UP', at: S.stampAt, tone: 'bad', size: 44, rot: -0.07, x: 0, y: 190 }); g.restore(); }
    bottomChip(g, S, t, th);
  }
  function ask(g, p, lt, t, th, S) {
    const k = spring(lt, 'bouncy'); g.save(); g.translate(540, 800); g.scale(0.7 + 0.3 * Math.min(1.06, k), 0.7 + 0.3 * Math.min(1.06, k)); g.globalAlpha *= clamp(k * 2);
    const sz = Math.min(fit(S.l1, F.hero, 900, 112), fit(S.l2, F.hero, 900, 112)); stk(g, S.l1, 0, -62, F.hero(sz), th.gold, 'center', 16); stk(g, S.l2, 0, 62, F.hero(sz), th.bad, 'center', 16); g.restore();
  }
  const SC = { society, defcard, claim, nameswap, luxe, terminal, cover, phone, wiredef, hotels, friend, morocco, pay, arrest, verdict, sentence, repay, board, ask };
  // ---------- suspect card (always on, bottom-left): her face in a different treatment at every beat ----------
  function pip(g, p, env) {
    const { t, theme: th } = env; let K = p.keys[0]; for (const q of p.keys) if (t >= q.at) K = q; const o = t - K.at, pop = 1 + 0.07 * Math.exp(-o * 7) * Math.cos(o * 22), src = K.src || PA;
    g.save(); g.scale(pop, pop); g.rotate(-0.03); paper(g, -100, -150, 200, 262, 14, { lift: 0.5 }); face(g, src, -90, -140, 180, 190, 1 + 0.05 * Math.min(1, o / 3), !!K.mono);
    if (K.tint) { g.fillStyle = K.tint; rr(g, -90, -140, 180, 190, 8); g.fill(); }
    if (K.x) { const u = ease.out(clamp(o / 0.3)); g.strokeStyle = th.bad; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); g.moveTo(-60, -110); g.lineTo(-60 + 120 * u, -110 + 120 * u); g.moveTo(60, -110); g.lineTo(60 - 120 * u, -110 + 120 * u); g.stroke(); }
    if (K.bars) { const u = ease.in(clamp(o / 0.3)); for (let i = 0; i < 6; i++) { const bx = -90 + (i + 0.5) * 30; g.fillStyle = '#10161f'; g.fillRect(bx - 5, -140, 10, 190 * u); } }
    g.fillStyle = th.bad; rr(g, -90, 56, 180, 28, 8); g.fill(); txt(g, 'ANNA · SUSPECT', 0, 70, F.cap(13), th.paper);
    const w = Math.max(196, mw(K.text, F.cap(21)) + 22); g.save(); g.translate(0, 120); g.fillStyle = th.ink; rr(g, -w / 2, -20, w, 40, 10); g.fill(); g.strokeStyle = K.tone === 'bad' ? '#FF3B30' : K.tone === 'good' ? '#00D26A' : '#F2B705'; g.lineWidth = 3; rr(g, -w / 2, -20, w, 40, 10); g.stroke(); txt(g, K.text, 0, 2, F.cap(21), g.strokeStyle); g.restore();
    if (K.stamp) cst(g, th, t, { text: K.stamp, at: K.at + 0.1, tone: K.tone || 'bad', size: 30, rot: -0.2, x: 0, y: -40 });
    g.restore();
  }
  B.register('apip', { defaults: { keys: [] }, ownEnter: true, size: () => [230, 330], anchors: () => ({ face: [0, -40, 200, 240] }), draw(g, p, env) { g.globalAlpha *= clamp(env.lt / 0.08); pip(g, p, env); } });
  Object.assign(window.AN5.h, { fit, stk, chip, label, mw });
  // ---------- the stage ----------
  const val = (v, t) => { if (v && typeof v === 'object') { const u = ease.out(clamp((t - v.at) / (v.dur || 1))), x = lerp(v.from || 0, v.to, u); return (v.pre || '') + fmt(v.dec ? x : Math.round(x), v.dec || 0) + (v.suf || ''); } return v; };
  B.register('astage', {
    defaults: { C: [], scenes: [], hook: null, hideCounter: [], beats: [], notes: [] }, ownEnter: true, size: () => [1080, 1920],
    draw(g, p, env) {
      const { t, theme: th } = env; g.translate(-540, -960);
      let bl = ''; for (const b of p.beats) if (t >= b[0]) bl = b[1]; if (bl) { const k = spring(t - (p.beats.find(b => b[1] === bl)[0]), 'snappy'); g.save(); g.globalAlpha *= clamp(k * 2); label(g, bl, 990, 264, th.accent, 26, 'right'); g.restore(); }
      let seg = p.C[0]; for (const s of p.C) if (t >= s.from) seg = s; const hid = p.hideCounter.some(([a, b]) => t >= a && t < b), segT = t - seg.from, pop = 1 + 0.05 * hit(Math.min(0.5, Math.max(0, segT)), 8);
      if (!hid) {
        g.save(); g.translate(540, 437); g.scale(pop, pop); g.translate(-540, -437); paper(g, 70, 322, 940, 230, 26, { lift: 0.3 });
        const L = [seg.L[0], val(seg.L[1], t)], R = [seg.R[0], val(seg.R[1], t)]; g.fillStyle = 'rgba(11,15,20,.14)'; rr(g, 98, 344, 884, 22, 11); g.fill();
        const fr = seg.bar ? clamp(seg.bar(t)) : 0; if (fr > 0.005) { g.fillStyle = th.bad; rr(g, 98, 344, Math.max(22, fr * 884), 22, 11); g.fill(); }
        label(g, L[0], 100, 398, th.inkSoft, 28, 'left'); label(g, R[0], 980, 398, th.inkSoft, 28, 'right');
        const sL = fit(L[1], F.hero, 410, 104, 22), sR = fit(R[1], F.hero, 410, 104, 22);
        txt(g, L[1], 100, 484, F.hero(sL), seg.Lc === 'bad' ? th.badInk : seg.Lc === 'gold' ? '#B88700' : th.ink, 'left'); txt(g, R[1], 980, 484, F.hero(sR), seg.Rc === 'bad' ? th.badInk : seg.Rc === 'gold' ? '#B88700' : th.ink, 'right');
        g.restore();
      }
      hookText(g, p, t, th);
      for (const S of p.scenes) {
        if (t < S.from - 0.02 || t > S.to + 0.02) continue; const lt = t - S.from, kin = spring(lt + 0.08, { f: 2.4, z: 0.7 }), a = clamp(lt / 0.12) * (1 - lin(t, S.to - 0.12, S.to)), sc = (S.pop === false ? 1 : 0.94 + 0.06 * Math.min(1.05, kin));
        g.save(); g.globalAlpha *= a; g.translate(540, 840 + (S.gdy || 0)); g.scale(sc * (S.gsc || 1), sc * (S.gsc || 1)); g.translate(-540, -840);
        const fn = SC[S.type]; if (!fn) throw new Error('unknown scene type ' + S.type); fn(g, p, lt, t, th, S);
        g.restore();
      }
      for (const n of p.notes) if (t >= n.at && t < n.out + 0.2) { const nt = t - n.at, k = Math.min(1.08, spring(nt, 'bouncy')), fo = 1 - lin(t, n.out - 0.15, n.out + 0.05); g.save(); g.globalAlpha *= clamp(nt / 0.06) * fo; chip(g, n.text, 540, n.y || 598, n.tone || 'bad', th, n.size || 44, 900, k); g.restore(); }
    },
  });
  B.register('hypo', {
    defaults: { text: '' }, ownEnter: true, size: () => [10, 10],
    draw(g, p, env) { const s = p.text, f = F.monoX(21), w = mw(s, f) + 36; g.globalAlpha *= 0.9; g.fillStyle = 'rgba(11,15,20,.78)'; rr(g, -w / 2, -18, w, 36, 18); g.fill(); g.strokeStyle = env.theme.accent; g.lineWidth = 2; rr(g, -w / 2, -18, w, 36, 18); g.stroke(); txt(g, s, 0, 1, f, env.theme.accent); },
  });
})();
(function () {
  const ST = { x: 905, y: 1338, s: 0.8, layer: 'front', blur: 0, dim: 0 };
  const DX = [0, 420, -380, 300, -300, 380, -420, 260];
  window.AN5.make = function (c0) {
    const B = window.BM2, T = B.makeT((window.BM2_VOICE || {}).words || []), c = B.deepT(c0, T), els = [], extra = c.sfx2 || [], auto = [];
    const A = (at, name, gain = -9, dur = 0.5) => { if (at != null) auto.push({ at, name, gain, dur }); };
    c.scenes.forEach((sc, i) => { if (i > 0) A(sc.from, i % 2 ? 'whoosh_1' : 'whoosh_2', -11, 0.6);
      switch (sc.type) {
        case 'society': A(sc.at, 'camera_shutter_1', -8, 0.5); A(sc.stampAt, 'rubber_stamp_1', -7); A(sc.nameAt, 'pop_1', -10); break;
        case 'defcard': A(sc.at, 'pop_2'); A(sc.defAt, 'pop_1', -10); break;
        case 'claim': A(sc.at, 'cash_count_1', -11, 1.4); A(sc.stampAt, 'rubber_stamp_1', -6); break;
        case 'nameswap': A(sc.at, 'camera_shutter_2', -9); A(sc.strikeAt, 'pen_scratch_1', -8, 0.5); A(sc.revealAt, 'typewriter_1', -8, 0.9); A(sc.stampAt, 'rubber_stamp_2', -7); break;
        case 'luxe': A(sc.keysAt, 'pop_2'); A(sc.keysAt + 0.4, 'pop_1'); A(sc.rcptAt, 'paper_slam_1', -9); A(sc.stampAt, 'rubber_stamp_1', -8); break;
        case 'terminal': sc.cycles.forEach(cy => { A(cy, 'click_1', -9, 0.2); A(cy + 0.32, 'wrong_buzzer_1', -11, 0.7); }); break;
        case 'cover': A(sc.at, 'pop_2'); A(sc.blameAt, 'swipe_1', -10, 0.4); A(sc.billAt, 'paper_slam_1', -10); A(sc.paidAt, 'success_chime_1', -12, 0.9); break;
        case 'phone': A(sc.msgAt, 'notification_chime_1', -9, 1.0); A(sc.neverAt, 'rubber_stamp_1', -7); break;
        case 'wiredef': A(sc.coinAt, 'coin_single_1', -10); A(sc.xAt, 'wrong_buzzer_1', -11, 0.7); break;
        case 'hotels': A(sc.at, 'pop_2'); A(sc.s1, 'rubber_stamp_1', -8); A(sc.s2, 'rubber_stamp_2', -8); break;
        case 'friend': A(sc.at, 'camera_shutter_1', -10); A(sc.rAt, 'pop_1', -9); A(sc.strAt, 'swipe_1', -10, 0.4); break;
        case 'morocco': A(sc.at, 'pop_2'); A(sc.billAt, 'paper_slam_1', -9); A(sc.numAt, 'money_counter_2', -12, 1.1); A(sc.cardAt, 'pop_1', -9); A(sc.chargedAt, 'rubber_stamp_1', -7); break;
        case 'pay': A(sc.at, 'pop_2'); A(sc.at + 0.25, 'pop_1'); break;
        case 'arrest': A(sc.at, 'camera_flash_1', -8, 0.6); A(sc.cuffAt, 'handcuff_click_1', -8); A(sc.stampAt, 'rubber_stamp_1', -6); A(sc.stampAt, 'cinematic_hit_1', -9, 1.0); break;
        case 'verdict': A(sc.at, 'pop_2'); for (let k = 0; k < 8; k++) A(sc.countAt + k * (sc.countStep || 0.22), 'rubber_stamp_2', -13, 0.4); A(sc.countAt, 'gavel_1', -7, 0.6); break;
        case 'sentence': A(sc.barsAt, 'cell_door_1', -8, 1.2); A(sc.yrsAt, 'deep_boom_1', -5, 1.4); break;
        case 'repay': A(sc.at, 'cash_count_1', -11, 1.2); break;
        case 'board': A(sc.at, 'pop_2'); for (let k = 1; k < 5; k++) A(sc.at + 0.3 + (k - 1) * 0.25, 'pop_1', -10, 0.4); A(sc.tightAt, 'riser_1', -14, 1.6); A(sc.stampAt, 'rubber_stamp_1', -7); break;
        case 'ask': A(sc.from, 'pop_1'); break;
      } });
    els.push({ id: 'stage', type: 'astage', layer: 'screen', at: [540, 960], in: -1, z: 10, props: { C: c.C, scenes: c.scenes, hook: c.hook, hideCounter: c.hideCounter || [], beats: c.labels, notes: c.notes || [], photos: ['brand/photos/anna-sorokin/2.jpg', 'brand/photos/anna-sorokin/4.jpg'] } });
    els.push({ id: 'pip', type: 'apip', layer: 'screen', at: [150, 1213], scale: 0.82, in: -1, z: 20, props: { keys: c.pip } });
    els.push({ id: 'hypo', type: 'hypo', layer: 'screen', at: [545, 1316], in: 0.2, z: 20, props: { text: 'TRUE STORY · JURY VERDICT 2019' } });
    if (c.cta.like) els.push({ id: 'heart', type: 'heart', layer: 'screen', at: [520, 1205], in: c.cta.like, z: 30, props: { s: 1, dur: 1.0 } });
    if (c.cta.send) els.push({ id: 'plane', type: 'plane', layer: 'screen', at: [0, 0], in: c.cta.send, z: 30, props: { from: [330, 1275], to: [760, 1160], dur: 1.2, s: 0.7 }, out: c.cta.send + 1.5 });
    if (c.cta.follow) els.push({ id: 'follow', type: 'follow', layer: 'screen', at: [520, 1215], in: c.cta.follow, out: c.cta.followOut, z: 30, props: { press: 0.75 } });
    if (c.cta.bubble) els.push({ id: 'bubble', type: 'bubble', layer: 'screen', at: [520, 1205], in: c.cta.bubble.at, z: 30, props: { l1: c.cta.bubble.l1, l2: c.cta.bubble.l2, size: 40, tail: 'left' } });
    const beats = c.scenes.map((s, i) => ({ at: s.from, beat: 'wide', focus: { x: 540 + DX[i % DX.length], y: 740 + (i % 2 ? 90 : -60), w: 1080, h: 300 }, fill: 1, dur: 0.8, st: ST, pose: s.pose || 'talk' }));
    beats.unshift({ at: 0, beat: 'wide', focus: { x: 540, y: 740, w: 1080, h: 300 }, fill: 1, st: ST, pose: 'shock' });
    return {
      series: 'decoded', title: 'CASE FILE · FAKE HEIRESS', duration: c.dur,
      footnote: ['PHOTOS: PHILIP ROMANO (CC BY 4.0) · MARK MINTON (CC BY-SA 4.0), VIA WIKIMEDIA COMMONS', 'CONVICTED APR 2019 (8 COUNTS) · SENTENCED MAY 2019 · SOURCES: AP, UPI, NBC NEWS, ROLLING STONE', 'ILLUSTRATIONS / PROPS ARE GENERIC · “ANNA DELVEY” WAS HER FALSE NAME'],
      elements: els, beats, poses: [...(c.cta.follow ? [[c.cta.follow, 'follow', { target: [520, 1215] }]] : []), ...(c.poses || [])], shakes: c.shakes, captions: c.captions, bed: c.bed || { name: 'mystery_bed_1', gain: -1 }, sfx: [...auto, ...extra],
    };
  };
})();
// TikTok cut — DECODED: Anna Sorokin. Cold open = the DECLINED machine; her face (suspect card) on screen the whole video, big treatments: card machine, fancy hotels, society card, name swap, wire, hotels, Rachel + Morocco, arrest, verdict, sentence, board.
const H = { until: '@and#1-0.1', y: 690, size: 66, lines: [[['EVERY TIME THE BILL CAME', 'paper']], [['HER CARD GOT DECLINED', 'bad']]] };
const S = AN5.make({
  dur: 92.06,
  C: [
    { from: 0, L: ['THE CARD', 'DECLINED'], R: ['THE BILL', 'UNPAID'], Lc: 'bad', Rc: 'bad' },
    { from: '@and#1-0.1', L: ['WHERE SHE LIVED', 'FANCIEST HOTELS'], R: ['CITY', 'NEW YORK'] },
    { from: '@she#2-0.1', L: ['SHE WENT BY', 'ANNA DELVEY'], R: ['SO-CALLED', 'HEIRESS'], Rc: 'gold' },
    { from: "@that's#1-0.1", L: ['AN HEIRESS', 'GETS A FORTUNE'], R: ['WHEN?', 'ONE DAY'] },
    { from: '@tens-0.1', L: ['SHE SAID IT WAS WORTH', 'TENS OF MILLIONS'], R: ['WHERE?', 'OVERSEAS'], Lc: 'gold' },
    { from: '@her#2-0.1', L: ['HER REAL NAME', 'SOROKIN'], R: ['THE MONEY', 'NOT REAL'], Rc: 'bad' },
    { from: '@so#2-0.1', L: ['HER MOVE', 'SAME EVERY TIME'], R: ['WHO PAID?', 'OTHERS'], Rc: 'bad' },
    { from: '@first-0.1', L: ['STEP 1', 'CARD FAILS'], R: ['RESULT', 'DECLINED'], Rc: 'bad' },
    { from: '@then#1-0.1', L: ['STEP 2', 'BLAME THE BANK'], R: ['WHO PAYS?', 'SOMEONE ELSE'], Rc: 'bad' },
    { from: '@and#5-0.1', L: ['STEP 3', 'A WIRE IS COMING'], R: ['A WIRE =', 'BANK TRANSFER'] },
    { from: '@in#4-0.1', L: ['YEAR', '2017'], R: ['NEW YORK HOTELS', 'TWO'] },
    { from: '@then#2-0.1', L: ['HER FRIEND', 'RACHEL WILLIAMS'], R: ['JOB', 'MAGAZINE EDITOR'] },
    { from: '@on#1-0.1', L: ['BILL ON RACHEL’S CARD', { from: 0, to: 62000, at: '@$62-0.1', dur: 1.0, pre: '$' }], R: ['THE TRIP', 'MOROCCO'], Lc: 'bad' },
    { from: '@rachel#2-0.1', L: ['RACHEL KEPT ASKING', 'AND ASKING'], R: ['THE ANSWER', 'WIRE IS COMING'], Rc: 'bad' },
    { from: '@in#6-0.1', L: ['ARRESTED', 'OCT 2017'], R: ['BY', 'POLICE'], Lc: 'bad' },
    { from: '@in#7-0.1', L: ['MANHATTAN JURY', 'GUILTY'], R: ['COUNTS', { from: 0, to: 8, at: '@guilty+0.2', dur: 1.5 }], Lc: 'bad', Rc: 'bad' },
    { from: '@she#9-0.1', L: ['SENTENCE', '4 TO 12 YRS'], R: ['WHERE', 'PRISON'], Lc: 'bad' },
    { from: '@she#10-0.1', L: ['ORDERED TO REPAY', 'ABOUT $200,000'], R: ['BY', 'THE COURT'] },
    { from: '@all-0.1', L: ['FAKE MONEY', 'UNDONE'], R: ['BY', 'A CARD'], Lc: 'bad' },
  ],
  hook: H,
  scenes: [
    { type: 'terminal', from: 0, to: '@and#1-0.1', pose: 'shock', gsc: 0.68, gdy: 85, cycles: [0.5, 1.2, 1.9] },
    { type: 'luxe', from: '@and#1-0.1', to: '@she#2-0.1', pose: 'talk', keysAt: '@still', rcptAt: '@lived', chips: [{ at: '@fanciest', text: 'THE FANCIEST HOTELS IN NEW YORK', tone: 'ink' }] },
    { type: 'society', from: '@she#2-0.1', to: "@that's#1-0.1", pose: 'shock', at: '@she#2-0.1', nameAt: '@anna#1', roleAt: '@german', crownAt: '@german', credit: 'PHOTO: PHILIP ROMANO · CC BY 4.0', flash: true, stamps: [{ text: 'SO-CALLED HEIRESS', at: '@heiress', tone: 'gold', size: 52 }] },
    { type: 'defcard', from: "@that's#1-0.1", to: '@tens-0.1', pose: 'chin', at: "@that's#1-0.1", head: 'WHAT’S AN HEIRESS?', term: 'HEIRESS', d1: 'GETS A FAMILY', d2: 'FORTUNE', d3: 'ONE DAY', icon: 'vault', defAt: '@family-0.1', iconAt: "@that's#1" },
    { type: 'claim', from: '@tens-0.1', to: '@her#2-0.1', pose: 'shock', at: '@tens-0.3', chips: [{ at: '@trust', text: 'IN A TRUST FUND OVERSEAS', tone: 'ink' }] },
    { type: 'nameswap', from: '@her#2-0.1', to: '@tap-0.1', pose: 'chin', at: '@her#2-0.1', strikeAt: '@real', revealAt: '@anna#2', stampAt: "@wasn't" },
    { type: 'ask', from: '@tap-0.1', to: '@so#2-0.1', pose: 'you', l1: 'TALKS RICH,', l2: 'NEVER PAYS?' },
    { type: 'ask', from: '@so#2-0.1', to: '@first-0.1', pose: 'chin', l1: 'HOW DID SHE', l2: 'PULL IT OFF?' },
    { type: 'terminal', from: '@first-0.1', to: '@then#1-0.1', pose: 'shock', cycles: [29.5, 30.2, 30.8], chips: [{ at: '@first', text: 'STEP 1 · HER CARD FAILS', tone: 'bad' }] },
    { type: 'cover', from: '@then#1-0.1', to: '@and#5-0.1', pose: 'chin', at: '@then#1-0.1', blameAt: '@blames', billAt: '@someone#3-0.25', paidAt: '@pays#2-0.2', chips: [{ at: '@then#1', text: 'STEP 2 · SOMEONE ELSE PAYS', tone: 'ink' }] },
    { type: 'phone', from: '@and#5-0.1', to: "@that's#2-0.1", pose: 'shock', at: '@and#5-0.1', msgAt: '@wire#1-0.3', chips: [{ at: '@and#5', text: 'STEP 3 · A WIRE IS COMING', tone: 'bad' }] },
    { type: 'wiredef', from: "@that's#2-0.1", to: '@in#4-0.1', pose: 'chin', at: "@that's#2-0.1", coinAt: '@bank#2', xAt: '@never#2', chips: [{ at: '@spoiler', text: 'SPOILER: IT NEVER COMES', tone: 'bad' }] },
    { type: 'hotels', from: '@in#4-0.1', to: '@send-0.1', pose: 'talk', at: '@in#4-0.1', s1: '@walked', s2: '@paying', chips: [{ at: '@hotels#2', text: 'TWO HOTELS SAID SHE WALKED OUT', tone: 'bad' }] },
    { type: 'ask', from: '@send-0.1', to: '@then#2-0.1', pose: 'you', l1: 'FRIEND WHO SAYS', l2: '“I’LL PAY YOU BACK”' },
    { type: 'friend', from: '@then#2-0.1', to: '@on#1-0.1', pose: 'talk', at: '@then#2-0.1', rAt: '@magazine', strAt: '@rachel#1' },
    { type: 'morocco', from: '@on#1-0.1', to: '@more-0.1', pose: 'shock', at: '@on#1-0.1', billAt: '@bill#2-0.15', cardAt: '@landed-0.3', numAt: '@$62-0.1', chargedAt: '@000#1+0.2', chips: [{ at: '@landed', text: 'THE BILL LANDED ON RACHEL’S CARD', tone: 'bad' }] },
    { type: 'pay', from: '@more-0.1', to: '@rachel#2-0.1', pose: 'chin', at: '@more-0.1', chips: [{ at: '@year', text: 'MORE THAN MANY MAKE IN A YEAR', tone: 'bad' }] },
    { type: 'phone', from: '@rachel#2-0.1', to: '@in#6-0.1', pose: 'shock', at: '@rachel#2-0.1', msgAt: '@wire#2-0.3', neverAt: '@coming#2+0.4', chips: [{ at: '@rachel#2', text: 'RACHEL KEPT ASKING', tone: 'ink' }] },
    { type: 'arrest', from: '@in#6-0.1', to: '@in#7-0.1', pose: 'shock', at: '@in#6-0.1', flash: true, cuffAt: '@police', xAt: '@arrested', stampAt: '@arrested' },
    { type: 'verdict', from: '@in#7-0.1', to: "@that's#3-0.1", pose: 'shock', at: '@in#7-0.1', countAt: '@guilty', countStep: 0.2, larcenyIdx: 0, chips: [{ at: '@eight', text: 'GUILTY ON EIGHT COUNTS', tone: 'bad' }] },
    { type: 'defcard', from: "@that's#3-0.1", to: '@follow-0.1', pose: 'chin', at: "@that's#3-0.1", head: 'WHAT’S GRAND LARCENY?', term: 'GRAND LARCENY', d1: 'THE LEGAL NAME', d2: 'FOR STEALING BIG', icon: 'cash', defAt: '@grand-0.1', iconAt: "@that's#3" },
    { type: 'ask', from: '@follow-0.1', to: '@she#9-0.1', pose: 'you', l1: 'LOVE WHEN THE FAKE', l2: 'RICH GET CAUGHT?' },
    { type: 'sentence', from: '@she#9-0.1', to: '@she#10-0.1', pose: 'shock', at: '@she#9-0.1', barsAt: '@sentenced', yrsAt: '@four-0.1' },
    { type: 'repay', from: '@she#10-0.1', to: '@all-0.1', pose: 'chin', at: '@she#10-0.1', numAt: '@$200-0.2', chips: [{ at: '@pay#2', text: 'ORDERED TO PAY BACK', tone: 'ink' }] },
    { type: 'board', from: '@all-0.1', to: '@harris-0.1', pose: 'shock', at: '@all-0.1', tightAt: '@card#4-0.2', stampAt: '@said#3', stampText: 'UNDONE BY A CARD THAT SAID NO' },
    { type: 'ask', from: '@harris-0.1', to: 99, pose: 'you', l1: 'HEIRESS OR', l2: 'HUSTLER?' },
  ],
  hideCounter: [['@harris-0.1', 99]],
  labels: [[0, 'THE DECLINE'], ['@and#1-0.1', 'THE LIFESTYLE'], ['@she#2-0.1', 'THE HEIRESS'], ['@tens-0.1', 'THE FORTUNE'], ['@her#2-0.1', 'THE TRUTH'], ['@so#2-0.1', 'THE METHOD'], ['@in#4-0.1', 'THE HOTELS'], ['@then#2-0.1', 'THE FRIEND'], ['@in#6-0.1', 'THE CATCH'], ['@in#7-0.1', 'THE VERDICT'], ['@she#9-0.1', 'THE SENTENCE'], ['@all-0.1', 'THE RECAP']],
  notes: [],
  pip: [{ at: 0, text: 'DECLINED', tone: 'bad', x: true }, { at: '@and#1', text: 'FANCY LIFE', tone: 'gold' }, { at: '@she#2', text: 'THE “HEIRESS”', tone: 'gold' }, { at: '@her#2', text: 'REAL: SOROKIN', tone: 'bad', src: 'brand/photos/anna-sorokin/4.jpg', stamp: 'FAKE NAME' }, { at: '@so#2', text: 'SAME MOVE', tone: 'gold' }, { at: '@first', text: 'DECLINED AGAIN', tone: 'bad', x: true }, { at: '@and#5', text: 'THE WIRE…', tone: 'bad', tint: 'rgba(224,40,30,.22)', src: 'brand/photos/anna-sorokin/4.jpg' },
    { at: '@in#4', text: 'WALKED OUT', tone: 'bad', stamp: 'UNPAID' }, { at: '@then#2', text: 'THE FRIEND’S BILL', tone: 'gold' }, { at: '@in#6', text: 'ARRESTED', tone: 'bad', stamp: 'ARRESTED', tint: 'rgba(224,40,30,.18)' }, { at: '@in#7', text: 'GUILTY', tone: 'bad', mono: true, stamp: 'GUILTY' }, { at: '@she#9', text: '4 TO 12 YEARS', tone: 'bad', mono: true, bars: true }, { at: '@all', text: 'NO MONEY', tone: 'bad', src: 'brand/photos/anna-sorokin/4.jpg' }, { at: '@harris', text: 'HEIRESS OR HUSTLER?', tone: 'gold' }],
  cta: { like: '@heart-0.1', send: '@send', follow: '@follow+0.05', followOut: '@follow+1.9', bubble: { at: '@harris', l1: 'HEIRESS OR HUSTLER?', l2: 'COMMENT BELOW' } },
  poses: [['@heart', 'you'], ['@send', 'you']],
  shakes: [[0.1, 8], ['@wasn\'t', 10], ['@arrested', 12], ['@sentenced', 12]],
  captions: { gap: 16, emph: { 'declined.': 'bad', 'never': 'bad', 'comes.': 'bad', 'guilty': 'bad', 'arrested': 'bad', 'prison.': 'bad', '$62': 'bad', 'heiress.': 'gold', 'no.': 'bad' }, fix: [['Delvi,', 'Delvey,'], ['Sorekin.', 'Sorokin.'], ['Harris', 'Heiress']] },
  sfx2: [
    { at: 0.04, name: 'deep_boom_2', gain: -5, dur: 0.36 }, { at: '@heart', name: 'pop_2', gain: -9, dur: 0.3 }, { at: '@send-0.05', name: 'swoosh_1', gain: -9, dur: 0.9 },
    { at: '@follow+0.05', name: 'pop_1', gain: -9, dur: 0.5 }, { at: '@follow+0.8', name: 'click_1', gain: -8, dur: 0.3 }, { at: '@follow+0.9', name: 'success_chime_1', gain: -12, dur: 1.2 }, { at: '@harris', name: 'pop_1', gain: -9, dur: 0.5 }, { at: '@guilty', name: 'dramatic_sting_1', gain: -10, dur: 1.2 },
  ],
});
BM2.scene(S);
