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
// ===== Victor Lustig — Decoded crime-show stage (screen space). Layout: pill y238-290 | live card y322-552 | zone y590-1085 | row y1100-1335 | captions ~1432.
// Facts: voice/beats-v3.md + research/2026-11-27/victor-lustig-eiffel-tower. Eiffel Tower sale = LEGEND (sepia stamps); arrest/escape/plea/20 yrs = FACT / COURT RECORD (green).
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, burst, hash, hit } = B;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const fmt = (v, d = 0) => B.fmtNum(v, d, true);
  window.V5 = { h: {} };
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
  // ===== Victor Lustig — Decoded stage. LEGEND (sepia) vs FACT (green) stamps. Photos: DOJ record 1931 (2.jpg), 1935 clipping (1.jpg), both PD.
  const P2 = 'brand/photos/victor-lustig/2.jpg', P1 = 'brand/photos/victor-lustig/1.jpg';
  const LEG = '#8A5217', LEGB = '#E8D9B8';
  const cst = (g, th, t, o) => B.crimeStamp(g, th, t, o);
  const img = s => B.images[s];
  const KIND = { a: { src: P2, crop: [0.04, 0.15, 0.27, 0.35], fx: 0.5, fy: 0.48 }, p: { src: P2, crop: [0.36, 0.16, 0.22, 0.34], fx: 0.49, fy: 0.48 }, c: { src: P1, crop: [0.36, 0.07, 0.22, 0.28], fx: 0.49, fy: 0.51 } };
  // his face in a rect. o: k 'a' (DOJ front) | 'p' (DOJ profile) | 'c' (1935 clipping); zoom; mono; sepia
  function face(g, x, y, w, h, o = {}) { const K = KIND[o.k || 'a']; g.save(); rr(g, x, y, w, h, 8); g.clip(); B.drawPhoto(g, img(K.src), x, y, w, h, { crop: K.crop, fx: K.fx + (o.fx || 0), fy: K.fy + (o.fy || 0), zoom: o.zoom || 1 });
    if (o.mono) { g.globalCompositeOperation = 'saturation'; g.fillStyle = '#808080'; g.fillRect(x, y, w, h); g.globalCompositeOperation = 'source-over'; }
    if (o.sepia) { g.globalCompositeOperation = 'multiply'; g.fillStyle = 'rgba(232,196,140,.75)'; g.fillRect(x, y, w, h); g.globalCompositeOperation = 'source-over'; }
    g.restore(); g.strokeStyle = 'rgba(11,15,20,.45)'; g.lineWidth = 3; rr(g, x, y, w, h, 8); g.stroke(); }
  const pk = (t, at, o = 'bouncy') => Math.min(1.1, spring(t - at, o));
  const sub = (g, s, x, y, col, size = 24, al = 'center') => txt(g, s, x, y, F.monoX(size), col, al);
  const bottomChip = (g, S, t, th) => { let ch = null; for (const c of (S.chips || (S.chip ? [S.chip] : []))) if (t >= c.at) ch = c; if (ch && !(S.chipOut && t >= S.chipOut)) chip(g, ch.text, 540, ch.y || 1062, ch.tone || 'ink', th, ch.size || 38, 900, spring(t - ch.at, 'bouncy')); };
  const enter = (g, t, at, x, y, dy = 70, rot = 0) => { g.save(); const k = pk(t, at); g.translate(x, y + (1 - Math.min(1, k)) * dy); g.rotate(rot); g.scale(0.9 + 0.1 * k, 0.9 + 0.1 * k); g.globalAlpha *= clamp((t - at) / 0.08); return k; };
  const hdr = (g, th, w, y0, s, h = 52, col) => { g.fillStyle = col || th.navy; rr(g, -w / 2 + 10, y0, w - 20, h, 12); g.fill(); txt(g, s, 0, y0 + h / 2 + 2, F.monoX(24), th.gold); };
  const strike = (g, th, x0, x1, y, u) => { g.strokeStyle = th.bad; g.lineWidth = 14; g.lineCap = 'round'; g.beginPath(); g.moveTo(x0, y + 10); g.lineTo(x0 + (x1 - x0) * u, y - 10 * u); g.stroke(); };
  const bigX = (g, cx, cy, r, u, lw = 22) => { g.save(); g.strokeStyle = '#E0281E'; g.lineWidth = lw; g.lineCap = 'round'; const a = clamp(u * 2), b = clamp(u * 2 - 1); g.beginPath(); g.moveTo(cx - r, cy - r); g.lineTo(cx - r + 2 * r * a, cy - r + 2 * r * a); g.stroke(); if (b > 0) { g.beginPath(); g.moveTo(cx + r, cy - r); g.lineTo(cx + r - 2 * r * b, cy - r + 2 * r * b); g.stroke(); } g.restore(); };
  const legendStamp = (g, th, t, at, text = 'LEGEND', o = {}) => { if (at != null) cst(g, th, t, { text, at, tone: LEG, size: 60, rot: -0.1, x: 0, y: 0, ...o }); };
  const factStamp = (g, th, t, at, text = 'FACT', o = {}) => { if (at != null) cst(g, th, t, { text, at, tone: 'good', size: 60, rot: -0.08, x: 0, y: 0, ...o }); };
  // ---- the tower, line art, centred, height 300*s
  function tower(g, s, col, lw = 7) {
    g.save(); g.scale(s, s); g.strokeStyle = col; g.fillStyle = col; g.lineCap = 'round'; g.lineJoin = 'round'; const W = y => 5 + 86 * Math.pow((y + 150) / 300, 2.1);
    g.lineWidth = lw; g.beginPath(); for (let y = -150; y <= 150; y += 10) { y === -150 ? g.moveTo(-W(y), y) : g.lineTo(-W(y), y); } g.stroke(); g.beginPath(); for (let y = -150; y <= 150; y += 10) { y === -150 ? g.moveTo(W(y), y) : g.lineTo(W(y), y); } g.stroke();
    g.lineWidth = lw * 0.9; g.beginPath(); g.moveTo(0, -150); g.lineTo(0, -190); g.stroke();
    g.lineWidth = lw * 0.7; const plat = [-60, 14, 96]; for (const y of plat) { g.beginPath(); g.moveTo(-W(y) - 10, y); g.lineTo(W(y) + 10, y); g.stroke(); }
    g.lineWidth = lw * 0.4; const zig = (ya, yb, n) => { for (let i = 0; i < n; i++) { const y0 = lerp(ya, yb, i / n), y1 = lerp(ya, yb, (i + 1) / n); g.beginPath(); g.moveTo(-W(y0), y0); g.lineTo(W(y1), y1); g.moveTo(W(y0), y0); g.lineTo(-W(y1), y1); g.stroke(); } };
    zig(-150, -60, 3); zig(-60, 14, 2); zig(14, 96, 2);
    g.lineWidth = lw * 0.9; g.beginPath(); g.moveTo(-W(150) + 6, 150); g.quadraticCurveTo(0, 20, W(150) - 6, 150); g.stroke(); g.restore();
  }
  // ---- coloured illustration bust (dealers): hat, face, suit
  function bust(g, x, y, s, col, o = {}) { g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = col; g.strokeStyle = '#0B0F14'; g.lineWidth = 5; g.beginPath(); g.moveTo(-50, 70); g.quadraticCurveTo(-50, 8, 0, 8); g.quadraticCurveTo(50, 8, 50, 70); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = '#F1C9A0'; g.beginPath(); g.arc(0, -22, 30, 0, 7); g.fill(); g.stroke(); g.fillStyle = o.hat || '#3a3f4a'; g.beginPath(); g.ellipse(0, -40, 44, 10, 0, 0, 7); g.fill(); g.stroke(); g.beginPath(); g.roundRect(-26, -72, 52, 36, 8); g.fill(); g.stroke();
    g.fillStyle = '#0B0F14'; g.beginPath(); g.arc(-10, -22, 3.5, 0, 7); g.arc(10, -22, 3.5, 0, 7); g.fill(); g.lineWidth = 4; g.beginPath(); if (o.sad) { g.arc(0, -4, 8, 3.5, 5.9); } else g.arc(0, -10, 9, 0.2, 2.9); g.stroke();
    if (o.blush) { g.fillStyle = 'rgba(224,40,30,.45)'; g.beginPath(); g.arc(-19, -12, 7, 0, 7); g.arc(19, -12, 7, 0, 7); g.fill(); } g.restore(); }
  function bill(g, x, y, w, h, fake, th, rot = 0) { g.save(); g.translate(x, y); g.rotate(rot); clay(g, -w / 2, -h / 2, w, h, 8, '#1FA366', { shadowK: 0.5 }); g.strokeStyle = 'rgba(245,243,238,.8)'; g.lineWidth = 4; rr(g, -w / 2 + 8, -h / 2 + 8, w - 16, h - 16, 5); g.stroke(); g.fillStyle = '#F5F3EE'; g.beginPath(); g.arc(0, 0, h * 0.27, 0, 7); g.fill(); txt(g, '$', 0, 3, F.hero(h * 0.36), '#188a56'); txt(g, '100', -w / 2 + 34, -h / 2 + 24, F.hero(h * 0.2), '#F5F3EE'); txt(g, '100', w / 2 - 34, h / 2 - 24, F.hero(h * 0.2), '#F5F3EE'); if (fake) { g.save(); g.rotate(-0.3); g.globalAlpha *= 0.9; txt(g, 'FAKE', 0, 4, F.hero(h * 0.5), th.bad); g.restore(); } g.restore(); }
  const ICON = {
    scrap(g, th) { g.lineCap = 'round'; const bars = [[-70, 30, 0.1], [-10, 40, -0.15], [60, 24, 0.05], [-40, -10, -0.05], [30, -6, 0.2]]; bars.forEach(([x, y, r], i) => { g.save(); g.translate(x, y); g.rotate(r); clay(g, -52, -14, 104, 28, 6, i % 2 ? '#8892a0' : '#a9b2bf', { shadowK: 0.4 }); g.restore(); }); g.strokeStyle = th.bad; g.lineWidth = 10; g.beginPath(); g.arc(0, -52, 36, 0.4, 5.6); g.stroke(); g.fillStyle = th.bad; g.beginPath(); g.moveTo(32, -76); g.lineTo(58, -48); g.lineTo(20, -46); g.closePath(); g.fill(); },
    badge(g, th) { B.crimeIcon(g, 'badge', 230, th); }, cuffs(g, th) { B.crimeIcon(g, 'cuffs', 230, th); }, gavel(g, th) { B.crimeIcon(g, 'gavel', 230, th); }, cash(g, th) { B.crimeIcon(g, 'cash', 230, th); },
    fake(g, th) { bill(g, 0, 0, 210, 110, true, th, -0.1); },
  };
  // ---------- scenes ----------
  function tower_(g, p, lt, t, th, S) { // sepia card, tower + FOR SALE tag + LEGEND stamp (+ X = never charged)
    enter(g, t, S.at, 540, 840); paper(g, -380, -235, 760, 470, 18, { lift: 0.6, fill: LEGB }); hdr(g, th, 760, -224, S.head || 'THE STORY GOES', 46, '#6a4216');
    g.save(); g.translate(-170, 30); tower(g, 0.78, '#4a3418', 7); g.restore();
    const ta = t - (S.tagAt ?? S.at + 0.3); if (ta > 0) { const k = pk(t, S.tagAt ?? S.at + 0.3); g.save(); g.translate(160, -40); g.rotate(0.07 + 0.05 * Math.sin(t * 3) * Math.exp(-ta * 1.5)); g.scale(0.7 + 0.3 * k, 0.7 + 0.3 * k); g.strokeStyle = '#4a3418'; g.lineWidth = 4; g.beginPath(); g.moveTo(-40, -120); g.lineTo(0, -70); g.stroke(); clay(g, -150, -70, 300, 160, 16, th.paper, { shadowK: 0.5 }); txt(g, 'FOR SALE', 0, -20, F.hero(70), th.badInk); txt(g, S.tagText || '“SCRAP”', 0, 52, F.hero(66), th.ink); g.restore(); }
    legendStamp(g, th, t, S.stampAt, S.stampText || 'LEGEND', { x: 130, y: 150, size: 54 });
    if (S.xAt != null && t >= S.xAt) { const u = ease.out(clamp((t - S.xAt) / 0.35)); bigX(g, -170, 20, 120, u, 24); }
    sub(g, S.foot || 'NO COURT EVER PROVED IT', 0, 214, th.inkSoft, 18); g.restore(); bottomChip(g, S, t, th); }
  function split(g, p, lt, t, th, S) { // hook: LEGEND panel vs RECORD panel
    const Lp = S.L, Rp = S.R;
    for (const [P, x, at] of [[Lp, 295, S.at], [Rp, 785, S.at2 ?? S.at + 0.25]]) { enter(g, t, at, x, 800, 60, P === Lp ? -0.02 : 0.02); paper(g, -240, -230, 480, 460, 18, { lift: 0.5, fill: P.kind === 'tower' ? LEGB : undefined }); hdr(g, th, 480, -222, P.head, 46, P.kind === 'tower' ? '#6a4216' : th.navy);
      if (P.kind === 'tower') { g.save(); g.translate(-60, 36); tower(g, 0.66, '#4a3418', 7); g.restore(); const k = pk(t, at + 0.2); g.save(); g.translate(110, -40); g.rotate(0.08); g.scale(k, k); clay(g, -90, -50, 180, 100, 12, th.paper, { shadowK: 0.4 }); txt(g, 'FOR SALE', 0, -14, F.hero(38), th.badInk); txt(g, '“SCRAP”', 0, 28, F.hero(36), th.ink); g.restore(); }
      else { face(g, -190, -150, 380, 240, { k: P.k || 'a', zoom: 1.0, mono: P.mono }); if (P.bars) { const bu = ease.in(clamp((t - P.bars) / 0.35)); for (let i = 0; i < 9; i++) { const bx = -190 + (i + 0.5) * 380 / 9; g.fillStyle = '#10161f'; g.fillRect(bx - 8, -150, 16, 240 * bu); g.fillStyle = 'rgba(255,255,255,.2)'; g.fillRect(bx - 8, -150, 4, 240 * bu); } }
        txt(g, P.line1 || 'VICTOR LUSTIG', 0, 128, F.hero(fit(P.line1 || 'VICTOR LUSTIG', F.hero, 430, 50)), th.ink); sub(g, P.line2 || '', 0, 168, th.badInk, 22); }
      if (P.stamp) (P.kind === 'tower' ? legendStamp : factStamp)(g, th, t, P.stampAt, P.stamp, { x: 0, y: 170, size: 46 });
      g.restore(); }
    tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  const tagsOf = (g, S, t, th) => { for (const nt of S.tags || []) if (t >= nt.at && (!nt.out || t < nt.out)) chip(g, nt.text, nt.x || 540, nt.y || 625, nt.tone || 'ink', th, nt.size || 36, nt.w || 900, spring(t - nt.at, 'bouncy')); };
  function intro(g, p, lt, t, th, S) {
    enter(g, t, S.at, 540, 835 + (S.dy0 || 0), 90, -0.02); paper(g, -440, -235, 880, 470, 18, { lift: 0.6 }); hdr(g, th, 880, -219, S.head || 'CASE FILE · THE CON MAN', 52);
    face(g, -400, -140, 300, 340, { k: S.k || 'a', zoom: 1 + 0.07 * lin(t, S.at, S.at + 6) }); if (S.flash && lt < 0.4) { g.fillStyle = 'rgba(255,255,255,' + 0.8 * hit(lt, 12) + ')'; rr(g, -400, -140, 300, 340, 8); g.fill(); }
    g.fillStyle = '#c4231a'; g.beginPath(); g.arc(-250, -150, 12, 0, 7); g.fill();
    const nm = t - (S.nameAt ?? S.at + 0.3); if (nm > 0) { g.save(); g.globalAlpha *= clamp(nm / 0.1); txt(g, 'VICTOR LUSTIG', -70, -105, F.hero(fit('VICTOR LUSTIG', F.hero, 480, 66)), th.ink, 'left'); g.restore(); }
    const rl = t - (S.roleAt ?? S.at + 0.6); if (rl > 0) { const k = Math.min(1.1, spring(rl, 'bouncy')); g.save(); g.globalAlpha *= clamp(rl / 0.1); g.translate(130, -30); g.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k); clay(g, -230, -34, 460, 68, 14, th.gold, { shadowK: 0.4 }); txt(g, S.role || 'CON MAN', 0, 3, F.hero(44), '#0B0F14'); g.restore(); }
    const tr = t - (S.line2At ?? 9999); if (tr > 0) { g.save(); g.globalAlpha *= clamp(tr / 0.1); txt(g, S.line2 || '', 130, 52, F.monoX(26), th.inkSoft); g.fillStyle = th.navy; rr(g, -50, 80, 360, 6, 3); g.fill(); g.restore(); }
    sub(g, 'PHOTO: U.S. DEPT. OF JUSTICE, 1931 · PUBLIC DOMAIN', -250, 222, th.inkSoft, 12);
    for (const q of S.stamps || []) cst(g, th, t, { size: 66, rot: -0.1, x: 150, y: 110, ...q });
    g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function titleStrike(g, p, lt, t, th, S) { // "COUNT" struck out -> MADE UP
    enter(g, t, S.at, 540, 800, 60); paper(g, -430, -200, 860, 400, 18, { lift: 0.5 }); hdr(g, th, 860, -190, 'HIS TITLE', 60); txt(g, '“COUNT”', 0, -30, F.hero(130), th.ink);
    if (S.strikeAt != null && t >= S.strikeAt) strike(g, th, -330, 330, -30, ease.out(clamp((t - S.strikeAt) / 0.3)));
    const rv = t - (S.revealAt ?? 9999); if (rv > 0) { const k = pk(t, S.revealAt); g.save(); g.translate(0, 88); g.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k); g.globalAlpha *= clamp(rv / 0.08); g.fillStyle = th.paperShade; rr(g, -330, -48, 660, 96, 14); g.fill(); g.strokeStyle = th.bad; g.lineWidth = 5; rr(g, -330, -48, 660, 96, 14); g.stroke(); txt(g, 'MADE UP', 0, 4, F.hero(82), th.badInk); g.restore(); }
    if (S.noble != null && t >= S.noble) { g.save(); g.globalAlpha *= clamp((t - S.noble) / 0.1); sub(g, 'A NOBLE TITLE · LIKE “PRINCE”', 0, 172, th.inkSoft, 22); g.restore(); }
    g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function date(g, p, lt, t, th, S) {
    enter(g, t, S.at, 540, 800, 60); paper(g, -400, -215, 800, 430, 18, { lift: 0.5, fill: LEGB }); hdr(g, th, 800, -205, S.head || 'THE STORY GOES', 56, '#6a4216');
    g.save(); g.translate(250, 20); tower(g, 0.5, '#4a3418', 8); g.restore();
    const a = t - (S.l1At ?? S.at + 0.3); if (a > 0) { g.save(); g.globalAlpha *= clamp(a / 0.1); txt(g, S.l1 || 'PARIS', -380, -50, F.hero(fit(S.l1 || 'PARIS', F.hero, 500, 140)), th.ink, 'left'); g.restore(); }
    const b = t - (S.l2At ?? S.at + 0.6); if (b > 0) { const k = pk(t, S.l2At ?? S.at + 0.6); g.save(); g.globalAlpha *= clamp(b / 0.1); g.translate(-380, 90); g.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k); txt(g, S.l2 || '1925', 0, 0, F.hero(150), th.badInk, 'left'); g.restore(); }
    legendStamp(g, th, t, S.stampAt, 'LEGEND', { x: 140, y: 150, size: 54 }); g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function official(g, p, lt, t, th, S) {
    enter(g, t, S.at, 540, 815, 70); paper(g, -400, -215, 800, 430, 18, { lift: 0.5 }); hdr(g, th, 800, -205, S.head || 'THE STORY GOES · HIS ACT', 52, '#6a4216');
    face(g, -360, -130, 250, 300, { k: 'c', zoom: 1.0 + 0.1 * lin(t, S.at, S.at + 4), sepia: true });
    const ba = t - (S.badgeAt ?? S.at + 1); if (ba > 0) { const k = pk(t, S.badgeAt ?? S.at + 1); g.save(); g.translate(-120, 100); g.scale(k * 0.7, k * 0.7); B.crimeIcon(g, 'badge', 200, th); g.restore(); }
    const ca = t - (S.claimAt ?? S.at + 1.3); if (ca > 0) { const k = pk(t, S.claimAt ?? S.at + 1.3); g.save(); g.globalAlpha *= clamp(ca / 0.1); g.translate(130, -20); g.scale(0.85 + 0.15 * k, 0.85 + 0.15 * k); txt(g, 'HE POSES AS', 0, -70, F.monoX(26), th.inkSoft); txt(g, 'A GOVERNMENT', 0, -10, F.hero(60), th.ink); txt(g, 'OFFICIAL', 0, 52, F.hero(78), th.badInk); sub(g, '(HE WASN’T ONE)', 0, 108, th.inkSoft, 22); g.restore(); }
    legendStamp(g, th, t, S.stampAt, 'LEGEND', { x: 200, y: 160, size: 46 }); g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function dealers(g, p, lt, t, th, S) {
    enter(g, t, S.at, 540, 810, 60); paper(g, -440, -230, 880, 450, 18, { lift: 0.5, fill: LEGB }); hdr(g, th, 880, -220, S.head || 'FIVE SCRAP-METAL DEALERS', 52, '#6a4216');
    // hotel table
    g.fillStyle = '#8a5a2b'; g.beginPath(); g.ellipse(0, 110, 380, 50, 0, 0, 7); g.fill(); g.strokeStyle = '#4a2f17'; g.lineWidth = 5; g.stroke();
    const cols = ['#2c3e66', '#8a2f2f', '#2f6f4f', '#6b4a8a', '#a8741a'], xs = [-300, -150, 0, 150, 300];
    xs.forEach((x, i) => { const at = (S.times || [])[i] ?? S.at + 0.3 + i * 0.2, o = t - at; if (o < 0) return; const k = pk(t, at), isP = i === 2 && S.poissonAt != null && t >= S.poissonAt, big = isP ? 1 + 0.18 * pk(t, S.poissonAt) : 1; g.save(); g.globalAlpha *= clamp(o / 0.08); g.translate(x, 20 + (1 - Math.min(1, k)) * 40); g.scale(big, big); bust(g, 0, 8, 1.45, cols[i], { hat: i % 2 ? '#2b2f36' : '#5a4a3a' }); if (isP) { g.strokeStyle = th.bad; g.lineWidth = 6; g.beginPath(); g.arc(0, -10, 78, 0, 7); g.stroke(); } g.restore(); });
    if (S.poissonAt != null && t >= S.poissonAt) { const k = pk(t, S.poissonAt); g.save(); g.translate(0, -100); g.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k); clay(g, -150, -26, 300, 52, 26, th.bad, { shadowK: 0.5 }); txt(g, 'POISSON', 0, 3, F.hero(36), th.paper); g.restore(); }
    sub(g, 'ILLUSTRATION · NO REAL FACES', 0, 196, th.inkSoft, 14); legendStamp(g, th, t, S.stampAt, 'LEGEND', { x: 330, y: -90, size: 40 }); g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function defcard(g, p, lt, t, th, S) {
    enter(g, t, S.at, 540, 830, 70); paper(g, -430, -210, 860, 420, 18, { lift: 0.5 }); g.fillStyle = th.navy; rr(g, -430, -210, 860, 78, 18); g.fill(); txt(g, S.head || 'WHAT IT MEANS', 0, -170, F.hero(48), th.gold);
    g.save(); g.translate(-250, 30); const ia = t - (S.iconAt ?? S.at + 0.3); if (ia > 0) { const k = Math.min(1.1, spring(ia, 'bouncy')); g.globalAlpha *= clamp(ia / 0.1); g.scale(0.7 + 0.3 * k, 0.7 + 0.3 * k); ICON[S.icon](g, th); } g.restore();
    const da = t - (S.defAt ?? S.at + 0.4); if (da > 0) { g.save(); g.globalAlpha *= clamp(da / 0.12); g.translate((1 - Math.min(1, spring(da, 'snappy'))) * 50, 0); txt(g, S.term, 120, -75, F.hero(fit(S.term, F.hero, 520, 78)), th.badInk); txt(g, S.d1, 120, 5, F.hero(fit(S.d1, F.hero, 520, 50)), th.ink); txt(g, S.d2, 120, 65, F.hero(fit(S.d2, F.hero, 520, 50)), th.ink); if (S.d3) txt(g, S.d3, 120, 125, F.hero(fit(S.d3, F.hero, 520, 50)), th.ink); g.restore(); }
    if (S.factAt != null) factStamp(g, th, t, S.factAt, S.factText || 'FACT', { x: 250, y: 160, size: 40 }); g.restore(); bottomChip(g, S, t, th); }
  function whisper(g, p, lt, t, th, S) {
    enter(g, t, S.at, 540, 810, 70); paper(g, -440, -230, 880, 460, 18, { lift: 0.5, fill: LEGB }); hdr(g, th, 880, -220, S.head || 'THE STORY GOES · HE WHISPERS', 52, '#6a4216');
    face(g, -410, -150, 250, 300, { k: 'p', zoom: 1.1 - 0.1 * ease.out(clamp((t - S.at) / 1.5)), sepia: true }); txt(g, '“', -152, -98, F.hero(100), th.bad, 'left');
    (S.lines || []).forEach((ln, i) => { const o = t - ln.at; if (o <= 0) return; const s = ln.text, n = Math.min(s.length, Math.floor(o * 26)); txt(g, s.slice(0, n), -105, -70 + i * 90, F.hero(fit(s, F.hero, 540, 70)), ln.tone === 'bad' ? th.badInk : th.ink, 'left'); });
    if (S.quietAt != null && t >= S.quietAt) { const k = pk(t, S.quietAt); g.save(); g.translate(-285, 190); g.scale(k, k); clay(g, -125, -20, 250, 40, 20, th.navy, { shadowK: 0.4 }); txt(g, 'KEEP IT QUIET', 0, 2, F.hero(24), th.gold); g.restore(); }
    legendStamp(g, th, t, S.stampAt, 'LEGEND', { x: 230, y: 160, size: 50 }); g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function paid(g, p, lt, t, th, S) {
    enter(g, t, S.at, 300, 800, 60); paper(g, -230, -230, 460, 440, 18, { lift: 0.5, fill: LEGB }); hdr(g, th, 460, -220, 'THE BUYER', 46, '#6a4216'); bust(g, 0, -20, 1.8, '#2f6f4f', { hat: '#5a4a3a' }); txt(g, 'POISSON', 0, 150, F.hero(52), th.ink); sub(g, 'ONE SCRAP DEALER', 0, 188, th.inkSoft, 16); g.restore();
    const ca = t - (S.cashAt ?? 9999); if (ca > 0) { g.save(); const k = pk(t, S.cashAt); g.translate(770, 800); g.scale(0.7 + 0.3 * k, 0.7 + 0.3 * k); g.globalAlpha *= clamp(ca / 0.08); for (let i = 0; i < 4; i++) bill(g, 0, 70 - i * 46, 300, 130, false, th, (i - 1.5) * 0.04); g.restore(); const u = ease.out(clamp(ca / 0.35)); g.save(); g.strokeStyle = th.gold; g.fillStyle = th.gold; g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); g.moveTo(560, 800); g.lineTo(560 + 80 * u, 800); g.stroke(); if (u > 0.9) { g.beginPath(); g.moveTo(650, 800); g.lineTo(624, 784); g.lineTo(624, 816); g.closePath(); g.fill(); } g.restore(); }
    if (S.stampAt != null) cst(g, th, t, { text: S.stampText || 'REPORTEDLY', at: S.stampAt, tone: LEG, size: 46, rot: -0.1, x: 790, y: 965 });
    tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function noreport(g, p, lt, t, th, S) {
    enter(g, t, S.at, 300, 800, 60); paper(g, -230, -230, 460, 440, 18, { lift: 0.5, fill: LEGB }); hdr(g, th, 460, -220, 'THE BUYER, LATER', 46, '#6a4216'); bust(g, 0, -20, 1.8, '#2f6f4f', { hat: '#5a4a3a', sad: true, blush: true }); txt(g, 'POISSON', 0, 150, F.hero(52), th.ink); sub(g, 'TOO EMBARRASSED', 0, 188, th.badInk, 18); g.restore();
    enter(g, t, S.docAt ?? S.at + 0.3, 770, 800, 60, 0.03); paper(g, -200, -230, 400, 440, 12, { lift: 0.5 }); hdr(g, th, 400, -220, 'POLICE REPORT', 46); g.strokeStyle = 'rgba(11,15,20,.25)'; g.lineWidth = 6; for (let i = 0; i < 5; i++) { g.beginPath(); g.moveTo(-150, -130 + i * 36); g.lineTo(150 - (i % 2) * 60, -130 + i * 36); g.stroke(); }
    if (S.noneAt != null) cst(g, th, t, { text: 'NONE FILED', at: S.noneAt, tone: 'bad', size: 54, rot: -0.12, x: 0, y: 70 }); g.restore();
    legendStamp(g, th, t, S.stampAt, 'THE STORY GOES', { x: 540, y: 1045, size: 40 }); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function again(g, p, lt, t, th, S) {
    enter(g, t, S.at, 540, 800, 60); paper(g, -420, -210, 840, 420, 18, { lift: 0.5, fill: LEGB }); hdr(g, th, 840, -200, 'THE STORY GOES', 52, '#6a4216');
    g.save(); g.translate(-230, 40); g.strokeStyle = th.bad; g.lineWidth = 22; g.lineCap = 'round'; const u = ease.out(clamp((t - (S.at + 0.2)) / 1.0)); g.beginPath(); g.arc(0, 0, 90, -1.2, -1.2 + 5.2 * u); g.stroke(); const a = -1.2 + 5.2 * u; g.fillStyle = th.bad; g.save(); g.translate(Math.cos(a) * 90, Math.sin(a) * 90); g.rotate(a + Math.PI / 2); g.beginPath(); g.moveTo(0, -24); g.lineTo(26, 14); g.lineTo(-26, 14); g.closePath(); g.fill(); g.restore(); g.restore();
    const ba = t - (S.backAt ?? S.at + 0.5); if (ba > 0) { const k = pk(t, S.backAt ?? S.at + 0.5); g.save(); g.globalAlpha *= clamp(ba / 0.1); g.translate(120, -10); g.scale(0.85 + 0.15 * k, 0.85 + 0.15 * k); txt(g, 'HE CAME BACK', 0, -70, F.hero(64), th.ink); txt(g, 'AND TRIED', 0, -5, F.hero(64), th.ink); txt(g, 'AGAIN', 0, 75, F.hero(88), th.badInk); g.restore(); }
    g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function unproven(g, p, lt, t, th, S) {
    enter(g, t, S.at, 540, 805, 60); paper(g, -430, -215, 860, 430, 18, { lift: 0.5 }); hdr(g, th, 860, -205, S.head || 'THE EIFFEL TOWER SALE (LEGEND)', 58);
    g.save(); g.translate(-250, 40); B.crimeIcon(g, 'gavel', 230, th); const xa = t - (S.xAt ?? 9999); if (xa > 0) bigX(g, 0, 0, 90, ease.out(clamp(xa / 0.4)), 26); g.restore();
    const q = t - (S.qAt ?? S.at + 0.3); if (q > 0) { g.save(); g.globalAlpha *= clamp(q / 0.1); txt(g, 'PROVEN', 130, -70, F.hero(82), th.ink); txt(g, 'IN COURT?', 130, 5, F.hero(82), th.ink); g.restore(); }
    const no = t - (S.noAt ?? 9999); if (no > 0) { const k = pk(t, S.noAt); g.save(); g.translate(100, 110); g.scale(0.7 + 0.3 * k, 0.7 + 0.3 * k); g.globalAlpha *= clamp(no / 0.08); clay(g, -110, -42, 220, 84, 18, th.bad, { shadowK: 0.5 }); txt(g, 'NEVER', 0, 5, F.hero(66), th.paper); g.restore(); }
    legendStamp(g, th, t, S.stampAt, 'LEGEND', { x: 330, y: 150, size: 40 }); g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function record(g, p, lt, t, th, S) { // ON THE RECORD file with FACT stamp
    enter(g, t, S.at, 540, 800, 60); paper(g, -430, -200, 860, 400, 18, { lift: 0.5 }); hdr(g, th, 860, -190, 'CASE FILE · COURT RECORD', 60, '#14603f');
    face(g, -390, -110, 230, 260, { k: 'a', zoom: 1.0 + 0.1 * lin(t, S.at, S.at + 4) }); txt(g, S.l1 || 'ON THE RECORD', 130, -70, F.hero(fit(S.l1 || 'ON THE RECORD', F.hero, 470, 76)), th.ink); const b = t - (S.l2At ?? 9999); if (b > 0) { const k = pk(t, S.l2At); g.save(); g.translate(130, 30); g.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k); g.globalAlpha *= clamp(b / 0.08); txt(g, S.l2 || 'FAKE MONEY', 0, 0, F.hero(fit(S.l2 || 'FAKE MONEY', F.hero, 470, 100)), th.badInk); g.restore(); }
    factStamp(g, th, t, S.factAt, 'FACT', { x: 250, y: 140, size: 56 }); g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function fakecash(g, p, lt, t, th, S) {
    enter(g, t, S.at, 540, 815, 70); paper(g, -430, -215, 860, 430, 18, { lift: 0.5 }); hdr(g, th, 860, -205, 'COUNTERFEITING', 60, '#14603f');
    const k = pk(t, S.billAt ?? S.at); g.save(); g.translate(-190, 20); g.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k); bill(g, 0, 0, 380, 190, S.fakeAt != null && t >= S.fakeAt, th, -0.06); g.restore();
    const d = t - (S.defAt ?? 9999); if (d > 0) { g.save(); g.globalAlpha *= clamp(d / 0.12); g.translate((1 - Math.min(1, spring(d, 'snappy'))) * 40, 0); txt(g, 'MAKING', 230, -50, F.hero(70), th.ink); txt(g, 'FAKE CASH', 230, 30, F.hero(80), th.badInk); sub(g, 'THEN PASSING IT OFF AS REAL', 230, 100, th.inkSoft, 18); g.restore(); }
    factStamp(g, th, t, S.factAt, 'FACT', { x: 230, y: 160, size: 46 }); g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function moneybox(g, p, lt, t, th, S) { // IG: reportedly a box that "printed" $100 bills
    enter(g, t, S.at, 540, 815, 70); paper(g, -430, -215, 860, 430, 18, { lift: 0.5, fill: LEGB }); hdr(g, th, 860, -205, 'HE REPORTEDLY SOLD A “MONEY BOX”', 52, '#6a4216');
    g.save(); g.translate(-200, 60); clay(g, -150, -40, 300, 150, 16, '#5a4a3a', { shadowK: 0.5 }); g.fillStyle = '#2b2f36'; g.fillRect(-120, -20, 240, 14); const u = ease.out(clamp((t - (S.billAt ?? S.at + 0.5)) / 0.9)); g.save(); rr(g, -150, -150, 300, 118, 4); g.clip(); bill(g, 0, -110 + 90 * (1 - u) * -1 + 20, 220, 108, false, th, 0.04); g.restore(); txt(g, '$100 MAKER?', 0, 70, F.hero(40), th.paper); g.restore();
    const d = t - (S.defAt ?? 9999); if (d > 0) { g.save(); g.globalAlpha *= clamp(d / 0.12); txt(g, 'A BOX THAT', 220, -55, F.hero(54), th.ink); txt(g, '“PRINTED”', 220, 10, F.hero(64), th.badInk); txt(g, '$100 BILLS', 220, 72, F.hero(54), th.ink); g.restore(); }
    legendStamp(g, th, t, S.stampAt, 'REPORTEDLY', { x: 240, y: 165, size: 46 }); g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function arrest(g, p, lt, t, th, S) { // 1935 clipping, push-in on his face
    const w = 470, h = Math.round(w * 469 / 460), z = 1 + (S.push || 0.12) * ease.inOut(clamp((t - (S.pushAt ?? S.at)) / (S.pushDur || 3.5)));
    enter(g, t, S.at, 540, 825, 70, -0.012); paper(g, -w / 2 - 16, -h / 2 - 16, w + 32, h + 70, 10, { lift: 0.6 }); g.save(); rr(g, -w / 2, -h / 2, w, h, 4); g.clip(); const u = ease.inOut(clamp((t - (S.pushAt ?? S.at)) / (S.pushDur || 3.5))); B.drawPhoto(g, img(P1), -w / 2, -h / 2, w, h, { zoom: z, fx: 0.5 + (0.47 - 0.5) * u, fy: 0.5 - 0.06 * u }); g.restore();
    if (S.flash && lt < 0.4) { g.fillStyle = 'rgba(255,255,255,' + 0.8 * hit(lt, 12) + ')'; rr(g, -w / 2, -h / 2, w, h, 4); g.fill(); }
    sub(g, '1935 NEWSPAPER · PUBLIC DOMAIN', 0, h / 2 + 30, th.inkSoft, 14);
    const c = S.callout; if (c && t >= c.at) { const k = pk(t, c.at); g.save(); g.translate(0, h / 2 - 20); g.scale(k, k); clay(g, -250, -30, 500, 60, 30, th.navy, { shadowK: 0.5 }); txt(g, c.text, 0, 3, F.hero(34), th.gold); g.restore(); }
    if (S.stampAt != null) cst(g, th, t, { text: 'ARRESTED', at: S.stampAt, tone: 'bad', size: 74, rot: -0.12, x: -60, y: -40 }); factStamp(g, th, t, S.factAt, 'FACT', { x: 200, y: 110, size: 44 });
    g.restore(); bottomChip(g, S, t, th); }
  function escape(g, p, lt, t, th, S) {
    enter(g, t, S.at, 540, 800, 60); paper(g, -430, -230, 860, 460, 18, { lift: 0.5 }); hdr(g, th, 860, -220, 'FEDERAL JAIL · 1935', 52);
    g.fillStyle = '#59606B'; rr(g, -300, -150, 280, 330, 8); g.fill(); g.fillStyle = '#10161f'; rr(g, -240, -110, 160, 200, 6); g.fill(); g.fillStyle = '#0B0F14'; for (let i = 0; i < 4; i++) g.fillRect(-224 + i * 44, -110, 10, 200);
    const ea = t - (S.escAt ?? 9999); if (ea > 0) { const u = ease.out(clamp(ea / 0.9)); g.strokeStyle = '#b8863b'; g.lineWidth = 9; g.lineCap = 'round'; g.setLineDash([16, 8]); g.beginPath(); g.moveTo(-160, -20); g.quadraticCurveTo(-190, 60, -130 + 10 * u, -20 + 230 * u); g.stroke(); g.setLineDash([]); const k = pk(t, S.escAt); g.save(); g.translate(-180 + 60 * u, -10 + 220 * u); g.scale(0.8, 0.8); bust(g, 0, 0, 0.7, '#59606B', { hat: '#1a1f27' }); g.restore(); cst(g, th, t, { text: 'ESCAPED', at: S.escAt + 0.1, tone: 'bad', size: 58, rot: -0.1, x: 170, y: -90 }); }
    const ca = t - (S.caughtAt ?? 9999); if (ca > 0) { g.save(); const k = pk(t, S.caughtAt); g.translate(190, 60); g.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k); g.globalAlpha *= clamp(ca / 0.1); clay(g, -190, -44, 380, 88, 18, th.navy, { shadowK: 0.5 }); txt(g, S.caughtText || 'CAUGHT AGAIN', 0, 4, F.hero(fit(S.caughtText || 'CAUGHT AGAIN', F.hero, 340, 54)), th.gold); g.restore(); }
    factStamp(g, th, t, S.factAt, 'FACT', { x: 280, y: 190, size: 40 }); g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function sentence(g, p, lt, t, th, S) { // pleaded guilty: 15 + 5
    enter(g, t, S.at, 540, 800, 60); paper(g, -430, -220, 860, 440, 18, { lift: 0.5 }); hdr(g, th, 860, -210, 'FEDERAL COURT · COURT RECORD', 56, '#14603f');
    face(g, -390, -130, 230, 260, { k: 'a', mono: true, zoom: 1.0 }); sub(g, 'VICTOR LUSTIG', -275, 160, th.ink, 22);
    const a = t - (S.guiltyAt ?? S.at + 0.3); if (a > 0) cst(g, th, t, { text: 'PLEADED GUILTY', at: S.guiltyAt ?? S.at + 0.3, tone: 'bad', size: 52, rot: -0.07, x: 130, y: -120 });
    const f1 = t - (S.fifteenAt ?? 9999); if (f1 > 0) { const k = pk(t, S.fifteenAt); g.save(); g.translate(60, 0); g.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k); g.globalAlpha *= clamp(f1 / 0.08); txt(g, '15 YRS', 0, 0, F.hero(96), th.badInk); sub(g, 'FAKE MONEY', 0, 56, th.inkSoft, 20); g.restore(); }
    const f2 = t - (S.fiveAt ?? 9999); if (f2 > 0) { const k = pk(t, S.fiveAt); g.save(); g.translate(290, 0); g.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k); g.globalAlpha *= clamp(f2 / 0.08); txt(g, '+ 5', 0, 0, F.hero(96), th.badInk); sub(g, 'THE ESCAPE', 0, 56, th.inkSoft, 20); g.restore(); }
    g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function verdict(g, p, lt, t, th, S) {
    enter(g, t, S.at, 540, 760, 60); paper(g, -300, -140, 600, 280, 16, { lift: 0.5 }); face(g, -270, -110, 260, 220, { k: 'p', mono: true, zoom: 1.1 });
    const bu = ease.in(clamp((t - (S.barsAt ?? S.at)) / 0.35)); for (let i = 0; i < 5; i++) { const bx = -270 + (i + 0.5) * 260 / 5; g.fillStyle = '#10161f'; g.fillRect(bx - 8, -110, 16, 220 * bu); g.fillStyle = 'rgba(255,255,255,.22)'; g.fillRect(bx - 8, -110, 4, 220 * bu); }
    txt(g, 'LUSTIG', 150, -60, F.hero(70), th.ink); sub(g, 'GUILTY · 1935', 150, 0, th.badInk, 22); factStamp(g, th, t, S.factAt, 'COURT RECORD', { x: 150, y: 70, size: 30 }); g.restore();
    const ya = t - S.yrsAt; if (ya > 0) { const kk = Math.min(1.1, spring(ya, 'bouncy')); g.save(); g.translate(540, 990); g.scale(0.8 + 0.2 * kk, 0.8 + 0.2 * kk); g.globalAlpha *= clamp(ya / 0.08); stk(g, '20 YEARS', 0, -6, F.hero(130), th.bad, 'center', 16); g.restore(); const w = 840 / 20; for (let i = 0; i < 20; i++) { const u = ease.out(clamp((ya - 0.2 - i * 0.025) / 0.3)); g.fillStyle = th.bad; rr(g, 120 + i * w + 2, 1062, w - 4, 20 * u, 3); g.fill(); } }
    const al = t - (S.alcAt ?? 9999); if (al > 0) { const k = pk(t, S.alcAt); chip(g, 'ALCATRAZ · ISLAND PRISON', 540, 1112, 'ink', th, 34, 900, k); }
    tagsOf(g, S, t, th); }
  function island(g, p, lt, t, th, S) {
    enter(g, t, S.at, 540, 810, 60); paper(g, -430, -210, 860, 420, 18, { lift: 0.5 }); hdr(g, th, 860, -200, 'THE FAMOUS ISLAND PRISON', 56, '#14603f');
    g.save(); rr(g, -410, -130, 400, 320, 10); g.clip(); const sk = g.createLinearGradient(0, -130, 0, 40); sk.addColorStop(0, '#9cc7ea'); sk.addColorStop(1, '#dcebf5'); g.fillStyle = sk; g.fillRect(-410, -130, 400, 170); g.fillStyle = '#2f6fb0'; g.fillRect(-410, 40, 400, 150);
    g.fillStyle = '#8a7a63'; g.beginPath(); g.moveTo(-340, 50); g.lineTo(-300, -10); g.lineTo(-150, -20); g.lineTo(-70, 50); g.closePath(); g.fill(); g.strokeStyle = '#0B0F14'; g.lineWidth = 4; g.stroke();
    g.fillStyle = '#d8d0bd'; g.fillRect(-270, -62, 110, 46); g.strokeStyle = '#0B0F14'; g.strokeRect(-270, -62, 110, 46); g.fillStyle = '#0B0F14'; for (let i = 0; i < 6; i++) g.fillRect(-258 + i * 17, -50, 8, 14); g.fillStyle = '#d8d0bd'; g.fillRect(-150, -90, 16, 74); g.strokeRect(-150, -90, 16, 74);
    g.strokeStyle = 'rgba(255,255,255,.7)'; g.lineWidth = 4; for (let r = 0; r < 4; r++) { g.beginPath(); for (let x = -410; x <= -10; x += 20) { const y = 80 + r * 30 + 5 * Math.sin(x * 0.05 + t * 2 + r); x === -410 ? g.moveTo(x, y) : g.lineTo(x, y); } g.stroke(); } g.restore(); g.strokeStyle = 'rgba(11,15,20,.4)'; g.lineWidth = 3; rr(g, -410, -130, 400, 320, 10); g.stroke();
    const a = t - (S.l1At ?? S.at + 0.3); if (a > 0) { g.save(); g.globalAlpha *= clamp(a / 0.1); txt(g, 'ALCATRAZ', 220, -50, F.hero(96), th.badInk); txt(g, 'ISLAND PRISON', 220, 30, F.hero(50), th.ink); sub(g, 'SAN FRANCISCO BAY', 220, 90, th.inkSoft, 24); g.restore(); }
    factStamp(g, th, t, S.factAt, 'COURT RECORD', { x: 230, y: 150, size: 34 }); g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function child(g, p, lt, t, th, S) { // 20 years vs a whole childhood (0-18)
    enter(g, t, S.at, 540, 810, 60); paper(g, -440, -200, 880, 400, 18, { lift: 0.5 }); hdr(g, th, 880, -190, '20 YEARS vs A WHOLE CHILDHOOD', 54);
    const W = 780, x0 = -390, cw = W / 20; for (let i = 0; i < 20; i++) { const u = ease.out(clamp((t - S.at - 0.2 - i * 0.04) / 0.3)); g.fillStyle = i < 18 ? '#2f6fb0' : th.bad; rr(g, x0 + i * cw + 2, -20 - 60 * u + 60, cw - 4, 60 * u, 4); g.fill(); }
    const a = t - (S.kidAt ?? S.at + 1.0); if (a > 0) { g.save(); g.globalAlpha *= clamp(a / 0.1); g.strokeStyle = '#2f6fb0'; g.lineWidth = 5; g.beginPath(); g.moveTo(x0, 90); g.lineTo(x0 + cw * 18, 90); g.stroke(); txt(g, 'BORN → 18: A WHOLE CHILDHOOD', x0 + cw * 9, 128, F.hero(36), '#1f5a99'); g.restore(); }
    const b = t - (S.longAt ?? 9999); if (b > 0) { g.save(); g.globalAlpha *= clamp(b / 0.1); const k = pk(t, S.longAt); g.translate(0, -88); g.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k); txt(g, 'HIS SENTENCE: LONGER', 0, 0, F.hero(56), th.badInk); g.restore(); }
    g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function board(g, p, lt, t, th, S) {
    const k = pk(t, S.at); g.save(); g.translate(540, 830 + (1 - Math.min(1, k)) * 60); g.globalAlpha *= clamp((t - S.at) / 0.08);
    const lg = g.createLinearGradient(-450, -230, 450, 230); lg.addColorStop(0, '#b98650'); lg.addColorStop(1, '#8c5f33'); g.fillStyle = lg; rr(g, -450, -240, 900, 480, 18); g.fill(); g.strokeStyle = '#4a2f17'; g.lineWidth = 14; rr(g, -450, -240, 900, 480, 18); g.stroke();
    for (let i = 0; i < 160; i++) { g.fillStyle = 'rgba(' + (hash(i * 3.1) > 0.5 ? '60,35,10' : '230,190,130') + ',' + (0.06 + 0.1 * hash(i * 7.7)) + ')'; g.beginPath(); g.arc(-440 + hash(i * 1.3) * 880, -230 + hash(i * 2.9) * 460, 2 + 4 * hash(i * 5.1), 0, 7); g.fill(); }
    const items = [{ x: 0, y: -60, w: 200, h: 230, kind: 'photo' }, { x: -310, y: -100, w: 190, h: 150, kind: 'tower', txt: 'EIFFEL TOWER', tag: 'LEGEND' }, { x: -310, y: 100, w: 190, h: 150, icon: 'cash', txt: 'FAKE MONEY', tag: 'FACT' }, { x: 310, y: -100, w: 190, h: 150, icon: 'cuffs', txt: 'ARRESTED 1935', tag: 'FACT' }, { x: 310, y: 100, w: 190, h: 150, icon: 'gavel', txt: '20 YEARS', tag: 'COURT RECORD' }];
    const pins = items.map(it => [it.x, it.y - it.h / 2 + 8]), tight = ease.out(clamp((t - S.tightAt) / 0.5)), step = S.step || 0.25;
    items.forEach((it, i) => { if (i) { const at = S.at + 0.3 + (i - 1) * step, u = ease.out(clamp((t - at - 0.1) / 0.4)); if (u > 0) { const a = pins[0], b = pins[i]; g.strokeStyle = '#E0281E'; g.lineWidth = 5; g.lineCap = 'round'; g.beginPath(); g.moveTo(a[0], a[1]); const ex = lerp(a[0], b[0], u), ey = lerp(a[1], b[1], u); g.quadraticCurveTo((a[0] + ex) / 2, (a[1] + ey) / 2 + 36 * (1 - tight), ex, ey); g.stroke(); } } });
    items.forEach((it, i) => { const at = i ? S.at + 0.3 + (i - 1) * step : S.at, o = t - at; if (o < 0) return; const kk = Math.min(1.1, spring(o, 'bouncy')); g.save(); g.translate(it.x, it.y); g.rotate((i - 2) * 0.03 + (1 - Math.min(1, kk)) * 0.2); g.scale(0.6 + 0.4 * kk, 0.6 + 0.4 * kk); paper(g, -it.w / 2, -it.h / 2, it.w, it.h, 8, { lift: 0.3, fill: it.kind === 'photo' ? '#EDE7D8' : it.kind === 'tower' ? LEGB : th.paper });
      if (it.kind === 'photo') { face(g, -it.w / 2 + 10, -it.h / 2 + 10, it.w - 20, it.h - 64, { k: 'a', zoom: 1.0 }); g.fillStyle = th.navy; rr(g, -it.w / 2 + 10, it.h / 2 - 48, it.w - 20, 38, 6); g.fill(); txt(g, 'LUSTIG', 0, it.h / 2 - 29, F.hero(26), th.paper); }
      else if (it.kind === 'tower') { g.save(); g.translate(0, -14); tower(g, 0.28, '#4a3418', 8); g.restore(); txt(g, it.txt, 0, it.h / 2 - 26, F.hero(fit(it.txt, F.hero, it.w - 16, 26)), th.ink); }
      else { g.save(); g.translate(0, -26); B.crimeIcon(g, it.icon, 80, th); g.restore(); txt(g, it.txt, 0, it.h / 2 - 28, F.hero(fit(it.txt, F.hero, it.w - 16, 28)), th.ink); }
      if (it.tag) { const lg2 = it.tag === 'LEGEND'; g.save(); g.translate(0, -it.h / 2 - 2); g.rotate(-0.06); const tw = mw(it.tag, F.hero(24)) + 24; g.fillStyle = lg2 ? LEG : '#14603f'; rr(g, -tw / 2, -16, tw, 32, 6); g.fill(); txt(g, it.tag, 0, 2, F.hero(24), '#F5F3EE'); g.restore(); }
      g.restore(); g.fillStyle = '#c4231a'; g.beginPath(); g.arc(pins[i][0], pins[i][1], 10, 0, 7); g.fill(); });
    g.restore(); if (S.stampAt != null) { g.save(); g.translate(540, 840); cst(g, th, t, { text: S.stampText || 'FAKE CASH LOCKED HIM UP', at: S.stampAt, tone: 'bad', size: 44, rot: -0.06, x: 0, y: 190 }); g.restore(); }
    bottomChip(g, S, t, th); }
  function ask(g, p, lt, t, th, S) {
    const k = spring(lt, 'bouncy'); g.save(); g.translate(540, 800); g.scale(0.7 + 0.3 * Math.min(1.06, k), 0.7 + 0.3 * Math.min(1.06, k)); g.globalAlpha *= clamp(k * 2);
    const sz = Math.min(fit(S.l1, F.hero, 900, 112), fit(S.l2, F.hero, 900, 112)); stk(g, S.l1, 0, -62, F.hero(sz), th.gold, 'center', 16); stk(g, S.l2, 0, 62, F.hero(sz), th.bad, 'center', 16); if (S.stampAt != null) cst(g, th, t, { text: S.stampText || 'LEGEND', at: S.stampAt, tone: LEG, size: 40, rot: -0.07, x: 0, y: 160 }); g.restore(); }
  const SC = { tower: tower_, split, intro, titleStrike, date, official, dealers, defcard, whisper, paid, noreport, again, unproven, record, fakecash, moneybox, arrest, escape, sentence, verdict, island, child, board, ask };
  // ---------- suspect card (always on, bottom-left): his face, different treatment at every beat ----------
  function pip(g, p, env) {
    const { t, theme: th } = env; let K = p.keys[0]; for (const q of p.keys) if (t >= q.at) K = q; const o = t - K.at, pop = 1 + 0.07 * Math.exp(-o * 7) * Math.cos(o * 22);
    g.save(); g.scale(pop, pop); g.rotate(-0.03); paper(g, -100, -150, 200, 262, 14, { lift: 0.5 }); face(g, -90, -140, 180, 190, { k: K.k || 'a', zoom: 1 + 0.06 * Math.min(1, o / 3) + (K.zoom || 0), mono: !!K.mono, sepia: !!K.sepia, fx: K.fx || 0, fy: K.fy || 0 });
    if (K.tint) { g.fillStyle = K.tint; rr(g, -90, -140, 180, 190, 8); g.fill(); }
    if (K.x) { const u = ease.out(clamp(o / 0.3)); g.strokeStyle = th.bad; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); g.moveTo(-60, -110); g.lineTo(-60 + 120 * u, -110 + 120 * u); g.moveTo(60, -110); g.lineTo(60 - 120 * u, -110 + 120 * u); g.stroke(); }
    if (K.bars) { const u = ease.in(clamp(o / 0.3)); for (let i = 0; i < 6; i++) { const bx = -90 + (i + 0.5) * 30; g.fillStyle = '#10161f'; g.fillRect(bx - 5, -140, 10, 190 * u); } }
    g.fillStyle = th.bad; rr(g, -90, 56, 180, 28, 8); g.fill(); txt(g, 'VICTOR LUSTIG', 0, 70, F.cap(14), th.paper);
    const w = Math.max(196, mw(K.text, F.cap(21)) + 22); g.save(); g.translate(0, 120); g.fillStyle = th.ink; rr(g, -w / 2, -20, w, 40, 10); g.fill(); const sc = K.tone === 'bad' ? '#FF3B30' : K.tone === 'good' ? '#00D26A' : K.tone === 'leg' ? '#D9A55B' : '#F2B705'; g.strokeStyle = sc; g.lineWidth = 3; rr(g, -w / 2, -20, w, 40, 10); g.stroke(); txt(g, K.text, 0, 2, F.cap(21), sc); g.restore();
    if (K.stamp) cst(g, th, t, { text: K.stamp, at: K.at + 0.1, tone: K.tone === 'leg' ? LEG : K.tone || 'bad', size: 28, rot: -0.2, x: 0, y: -40 });
    g.restore();
  }
  B.register('vpip', { defaults: { keys: [] }, ownEnter: true, size: () => [230, 330], anchors: () => ({ face: [0, -40, 200, 240] }), draw(g, p, env) { g.globalAlpha *= clamp(env.lt / 0.08); pip(g, p, env); } });
  Object.assign(window.V5.h, { fit, stk, chip, label, mw });
  // ---------- the stage ----------
  const val = (v, t) => { if (v && typeof v === 'object') { const u = ease.out(clamp((t - v.at) / (v.dur || 1))), x = lerp(v.from || 0, v.to, u); return (v.pre || '') + fmt(v.dec ? x : Math.round(x), v.dec || 0) + (v.suf || ''); } return v; };
  B.register('vstage', {
    defaults: { C: [], scenes: [], hook: null, hideCounter: [], beats: [], notes: [] }, ownEnter: true, size: () => [1080, 1920],
    draw(g, p, env) {
      const { t, theme: th } = env; g.translate(-540, -960);
      let bl = ''; for (const b of p.beats) if (t >= b[0]) bl = b[1]; if (bl) { const k = spring(t - (p.beats.find(b => b[1] === bl)[0]), 'snappy'); g.save(); g.globalAlpha *= clamp(k * 2); label(g, bl, 990, 264, th.accent, 26, 'right'); g.restore(); }
      let seg = p.C[0]; for (const s of p.C) if (t >= s.from) seg = s; const hid = p.hideCounter.some(([a, b]) => t >= a && t < b), segT = t - seg.from, pop = 1 + 0.05 * hit(Math.min(0.5, Math.max(0, segT)), 8);
      if (!hid) {
        g.save(); g.translate(540, 437); g.scale(pop, pop); g.translate(-540, -437); paper(g, 70, 322, 940, 230, 26, { lift: 0.3 });
        const L = [seg.L[0], val(seg.L[1], t)], R = [seg.R[0], val(seg.R[1], t)]; g.fillStyle = 'rgba(11,15,20,.14)'; rr(g, 98, 344, 884, 22, 11); g.fill();
        label(g, L[0], 100, 398, th.inkSoft, 26, 'left'); label(g, R[0], 980, 398, th.inkSoft, 26, 'right');
        const sL = fit(L[1], F.hero, 415, 100, 22), sR = fit(R[1], F.hero, 415, 100, 22), cc = c => c === 'bad' ? th.badInk : c === 'gold' ? '#B88700' : c === 'leg' ? LEG : c === 'good' ? '#14803f' : th.ink;
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
  window.V5.make = function (c0) {
    const B = window.BM2, T = B.makeT((window.BM2_VOICE || {}).words || []), c = B.deepT(c0, T), els = [], extra = c.sfx2 || [], auto = [];
    const A = (at, name, gain = -9, dur = 0.5) => { if (at != null && at >= 0) auto.push({ at, name, gain, dur }); };
    c.scenes.forEach((sc, i) => { if (i > 0) A(sc.from, i % 2 ? 'whoosh_1' : 'whoosh_2', -11, 0.6);
      switch (sc.type) {
        case 'tower': A(sc.at, 'pop_2'); A(sc.tagAt, 'pop_1', -10); A(sc.stampAt, 'rubber_stamp_1', -7); A(sc.xAt, 'pen_scratch_1', -8, 0.5); break;
        case 'split': A(sc.at, 'pop_2'); A(sc.at2 ?? sc.at + 0.25, 'pop_1', -10); A(sc.L.stampAt, 'rubber_stamp_1', -7); A(sc.R.stampAt, 'rubber_stamp_2', -7); A(sc.R.bars, 'cell_door_1', -9, 1.0); break;
        case 'intro': A(sc.at, 'camera_shutter_1', -8, 0.5); A(sc.nameAt, 'pop_1', -10); (sc.stamps || []).forEach(s => A(s.at, 'rubber_stamp_1', -7)); break;
        case 'titleStrike': A(sc.at, 'pop_2'); A(sc.strikeAt, 'pen_scratch_1', -8, 0.5); A(sc.revealAt, 'typewriter_1', -8, 0.9); break;
        case 'date': A(sc.at, 'pop_2'); A(sc.l1At, 'pop_1', -10); A(sc.stampAt, 'rubber_stamp_1', -7); break;
        case 'official': A(sc.at, 'camera_shutter_1', -9, 0.5); A(sc.badgeAt, 'pop_1', -10); A(sc.stampAt, 'rubber_stamp_1', -7); break;
        case 'dealers': A(sc.at, 'pop_2'); (sc.times || []).forEach(x => A(x, 'pop_1', -11, 0.4)); A(sc.poissonAt, 'pop_2', -8); A(sc.stampAt, 'rubber_stamp_1', -7); break;
        case 'defcard': A(sc.at, 'pop_2'); A(sc.defAt, 'pop_1', -10); A(sc.factAt, 'rubber_stamp_1', -7); break;
        case 'whisper': A(sc.at, 'pop_2'); (sc.lines || []).forEach(l => A(l.at, 'typewriter_1', -10, 1.0)); A(sc.stampAt, 'rubber_stamp_1', -7); break;
        case 'paid': A(sc.at, 'pop_2'); A(sc.cashAt, 'cash_register_1', -10, 1.0); A(sc.stampAt, 'rubber_stamp_1', -7); break;
        case 'noreport': A(sc.at, 'pop_2'); A(sc.docAt, 'pop_1', -10); A(sc.noneAt, 'rubber_stamp_1', -7); A(sc.stampAt, 'rubber_stamp_2', -8); break;
        case 'again': A(sc.at, 'pop_2'); A(sc.backAt, 'pop_1', -10); break;
        case 'unproven': A(sc.at, 'pop_2'); A(sc.xAt, 'pen_scratch_1', -8, 0.5); A(sc.noAt, 'pop_1', -9); A(sc.stampAt, 'rubber_stamp_1', -7); break;
        case 'record': A(sc.at, 'pop_2'); A(sc.l2At, 'typewriter_1', -10, 0.9); A(sc.factAt, 'rubber_stamp_1', -7); break;
        case 'fakecash': A(sc.at, 'pop_2'); A(sc.fakeAt, 'pen_scratch_1', -8, 0.5); A(sc.factAt, 'rubber_stamp_1', -7); break;
        case 'moneybox': A(sc.at, 'pop_2'); A(sc.billAt, 'swoosh_1', -10, 0.6); A(sc.stampAt, 'rubber_stamp_1', -7); break;
        case 'arrest': A(sc.at, 'camera_flash_1', -8, 0.6); A(sc.stampAt, 'rubber_stamp_1', -6); A(sc.stampAt, 'cinematic_hit_1', -9, 1.0); A(sc.factAt, 'rubber_stamp_2', -8); break;
        case 'escape': A(sc.at, 'pop_2'); A(sc.escAt, 'swoosh_1', -9, 0.8); A(sc.escAt + 0.1, 'rubber_stamp_1', -8); A(sc.caughtAt, 'handcuff_click_1', -8); break;
        case 'sentence': A(sc.at, 'pop_2'); A(sc.guiltyAt ?? sc.at + 0.3, 'rubber_stamp_1', -7); A(sc.fifteenAt, 'pop_1', -9); A(sc.fiveAt, 'pop_1', -9); break;
        case 'verdict': A(sc.at, 'pop_2'); A(sc.barsAt, 'cell_door_1', -8, 1.2); A(sc.yrsAt, 'gavel_1', -6, 0.6); A(sc.yrsAt, 'deep_boom_1', -5, 1.4); A(sc.alcAt, 'pop_1', -9); break;
        case 'island': A(sc.at, 'pop_2'); A(sc.l1At ?? sc.at + 0.3, 'pop_1', -10); A(sc.factAt, 'rubber_stamp_1', -7); break;
        case 'child': A(sc.at, 'pop_2'); A(sc.kidAt, 'pop_1', -10); A(sc.longAt, 'pop_2', -9); break;
        case 'board': A(sc.at, 'pop_2'); for (let k = 1; k < 5; k++) A(sc.at + 0.3 + (k - 1) * (sc.step || 0.25), 'pop_1', -10, 0.4); A(sc.tightAt, 'riser_1', -14, 1.6); A(sc.stampAt, 'rubber_stamp_1', -7); break;
        case 'ask': A(sc.from, 'pop_1'); A(sc.stampAt, 'rubber_stamp_1', -8); break;
      } (sc.chips || []).forEach(ch => A(ch.at, 'pop_1', -11, 0.4)); (sc.tags || []).forEach(tg => A(tg.at, 'pop_1', -11, 0.4)); });
    els.push({ id: 'stage', type: 'vstage', layer: 'screen', at: [540, 960], in: -1, z: 10, props: { C: c.C, scenes: c.scenes, hook: c.hook, hideCounter: c.hideCounter || [], beats: c.labels, notes: c.notes || [], photos: ['brand/photos/victor-lustig/2.jpg', 'brand/photos/victor-lustig/1.jpg'] } });
    els.push({ id: 'pip', type: 'vpip', layer: 'screen', at: [150, 1213], scale: 0.82, in: -1, z: 20, props: { keys: c.pip } });
    els.push({ id: 'hypo', type: 'hypo', layer: 'screen', at: [545, 1316], in: 0.2, z: 20, props: { text: 'TOWER SALE = LEGEND · 20 YEARS = COURT RECORD' } });
    if (c.cta.like) els.push({ id: 'heart', type: 'heart', layer: 'screen', at: [520, 1205], in: c.cta.like, z: 30, props: { s: 1, dur: 1.0 } });
    if (c.cta.send) els.push({ id: 'plane', type: 'plane', layer: 'screen', at: [0, 0], in: c.cta.send, z: 30, props: { from: [330, 1275], to: [760, 1160], dur: 1.2, s: 0.7 }, out: c.cta.send + 1.5 });
    if (c.cta.follow) els.push({ id: 'follow', type: 'follow', layer: 'screen', at: [520, 1215], in: c.cta.follow, out: c.cta.followOut, z: 30, props: { press: 0.75 } });
    if (c.cta.bubble) els.push({ id: 'bubble', type: 'bubble', layer: 'screen', at: [520, 1205], in: c.cta.bubble.at, z: 30, props: { l1: c.cta.bubble.l1, l2: c.cta.bubble.l2, size: 40, tail: 'left' } });
    const beats = c.scenes.map((s, i) => ({ at: s.from, beat: 'wide', focus: { x: 540 + DX[i % DX.length], y: 740 + (i % 2 ? 90 : -60), w: 1080, h: 300 }, fill: 1, dur: 0.8, st: ST, pose: s.pose || 'talk' }));
    beats.unshift({ at: 0, beat: 'wide', focus: { x: 540, y: 740, w: 1080, h: 300 }, fill: 1, st: ST, pose: 'shock' });
    return {
      series: 'decoded', title: 'CASE FILE · THE COUNT', duration: c.dur,
      footnote: ['PHOTOS: U.S. DEPT. OF JUSTICE ID RECORD 1931 · 1935 NEWSPAPER · PUBLIC DOMAIN · WIKIMEDIA COMMONS', 'EIFFEL TOWER SALE = LEGEND, NEVER PROVEN IN COURT · ARREST, ESCAPE, PLEA, 20 YEARS = RECORD', 'ILLUSTRATIONS / PROPS ARE GENERIC · THE DEALERS ARE DRAWN, NOT REAL FACES'],
      elements: els, beats, poses: [...(c.cta.follow ? [[c.cta.follow, 'follow', { target: [520, 1215] }]] : []), ...(c.poses || [])], shakes: c.shakes, captions: c.captions, bed: c.bed || { name: 'noir_bed_2', gain: -1 }, sfx: [...auto, ...extra],
    };
  };
})();
// IG cut — DECODED: Victor Lustig. Hook = his 1935 newspaper photo + the tower tag stamped SUPPOSEDLY/LEGEND. Order: hook · case file · fake title · Paris 1925 legend · official/hotel · dealers · scrap · whisper · double tap · paid (reportedly) · no police · again · unproven · send · record · fake cash · money box (reportedly) · arrest · secret service · escape + caught · follow · plea · 20 years · island · never charged · board · ask
const H = { until: 3.5, y: 668, size: 62, lines: [[['HE SUPPOSEDLY SOLD', 'paper']], [['THE EIFFEL TOWER', 'gold']], [['(LEGEND)', 'bad']]] };
const LG = ['STATUS', 'LEGEND'], FC = ['STATUS', 'COURT RECORD'];
const S = V5.make({
  dur: 91.25,
  C: [
    { from: 0, L: ['THE CLAIM', 'A TOWER SALE'], R: ['STATUS', 'SUPPOSEDLY'], Lc: 'gold', Rc: 'leg' },
    { from: 3.7, L: ['THE CON MAN', 'VICTOR LUSTIG'], R: ['CALLED HIMSELF', 'A COUNT'], Rc: 'gold' },
    { from: 7.6, L: ['THE TITLE', 'MADE UP'], R: ['HIS JOB', 'CON MAN'], Lc: 'bad' },
    { from: 10.9, L: ['YEAR', '1925'], R: LG, Lc: 'gold', Rc: 'leg' },
    { from: 14.8, L: ['HIS ACT', '“OFFICIAL”'], R: LG, Lc: 'bad', Rc: 'leg' },
    { from: 18.2, L: ['THE MARKS', '5 DEALERS'], R: LG, Lc: 'gold', Rc: 'leg' },
    { from: 20.6, L: ['SCRAP', 'OLD METAL'], R: ['MELTED DOWN', '+ SOLD AGAIN'], Lc: 'gold' },
    { from: 22.7, L: ['THE PITCH', 'TOWER FOR SCRAP'], R: LG, Lc: 'bad', Rc: 'leg' },
    { from: 28.8, L: ['THE BUYER', 'POISSON'], R: ['STATUS', 'REPORTEDLY'], Lc: 'gold', Rc: 'leg' },
    { from: 33.6, L: ['POLICE REPORT', 'NONE'], R: LG, Lc: 'bad', Rc: 'leg' },
    { from: 37.7, L: ['ROUND', '2'], R: LG, Lc: 'bad', Rc: 'leg' },
    { from: 41.4, L: ['PROVEN IN COURT?', 'ZERO'], R: LG, Lc: 'bad', Rc: 'leg' },
    { from: 47.8, L: ['WHAT’S PROVEN', 'COUNTERFEITING'], R: ['STATUS', 'FACT'], Lc: 'bad', Rc: 'good' },
    { from: 50.2, L: ['COUNTERFEITING', 'FAKE MONEY'], R: ['STATUS', 'FACT'], Lc: 'bad', Rc: 'good' },
    { from: 53.4, L: ['THE MONEY BOX', '$100 BILLS?'], R: ['STATUS', 'REPORTEDLY'], Lc: 'gold', Rc: 'leg' },
    { from: 57.4, L: ['DATE', 'MAY 1935'], R: FC, Lc: 'gold', Rc: 'good' },
    { from: 61.9, L: ['WHO GOT HIM', 'SECRET SERVICE'], R: FC, Rc: 'good' },
    { from: 64.6, L: ['STATUS', 'ESCAPED'], R: ['CAUGHT', 'WEEKS LATER'], Lc: 'bad', Rc: 'gold' },
    { from: 74.3, L: ['HIS PLEA', 'GUILTY'], R: FC, Lc: 'bad', Rc: 'good' },
    { from: 75.9, L: ['FAKE MONEY', '15 YEARS'], R: FC, Lc: 'bad', Rc: 'good' },
    { from: 77.3, L: ['THE ESCAPE', '+ 5 YEARS'], R: FC, Lc: 'bad', Rc: 'good' },
    { from: 79.0, L: ['TOTAL YEARS', { from: 0, to: 20, at: 79.02, dur: 0.8 }], R: ['PRISON', 'ALCATRAZ'], Lc: 'bad', Rc: 'bad' },
    { from: 81.0, L: ['THE PRISON', 'ALCATRAZ'], R: ['WHERE', 'SF BAY'], Lc: 'bad', Rc: 'gold' },
    { from: 83.2, L: ['CHARGED FOR IT', 'NEVER'], R: LG, Lc: 'bad', Rc: 'leg' },
    { from: 85.6, L: ['THE FAKE CASH', 'GOT HIM'], R: FC, Lc: 'bad', Rc: 'good' },
  ],
  hook: H,
  scenes: [
    { type: 'split', from: 0, to: 3.7, pose: 'shock', sc: 0.7, dy: 130, at: 0.05, at2: 0.3, L: { kind: 'face', head: 'THE CON MAN', k: 'c', line1: 'REAL PERSON', line2: '1935 NEWSPAPER' }, R: { kind: 'tower', head: 'THE LEGEND', stamp: 'SUPPOSEDLY', stampAt: 1.4 } },
    { type: 'intro', from: 3.7, to: 7.6, pose: 'talk', at: 3.7, nameAt: 4.58, roleAt: 5.4, flash: true, line2At: 7.0, line2: 'CALLED HIMSELF “COUNT”' },
    { type: 'titleStrike', from: 7.6, to: 10.9, pose: 'chin', at: 7.6, noble: 8.3, strikeAt: 9.4, revealAt: 9.6 },
    { type: 'date', from: 10.9, to: 14.8, pose: 'chin', at: 10.9, l1At: 12.88, l2At: 13.32, stampAt: 11.9 },
    { type: 'official', from: 14.8, to: 18.2, pose: 'talk', at: 14.8, claimAt: 15.0, badgeAt: 15.9, stampAt: 16.4 },
    { type: 'dealers', from: 18.2, to: 20.6, pose: 'shock', at: 18.25, times: [18.46, 18.6, 18.75, 18.9, 19.05], stampAt: 19.4, chips: [{ at: 19.9, text: 'IN A FANCY HOTEL', tone: 'gold' }] },
    { type: 'defcard', from: 20.6, to: 22.7, pose: 'chin', at: 20.6, head: 'WHAT’S SCRAP?', term: 'SCRAP', d1: 'OLD METAL', d2: 'MELTED DOWN', icon: 'scrap', defAt: 20.8, iconAt: 20.68 },
    { type: 'whisper', from: 22.7, to: 27.0, pose: 'shock', at: 22.7, quietAt: 23.84, lines: [{ at: 24.7, text: 'THE TOWER’S BEING' }, { at: 25.5, text: 'SOLD FOR SCRAP.', tone: 'bad' }], stampAt: 26.2 },
    { type: 'ask', from: 27.0, to: 28.8, pose: 'you', l1: 'WOULD YOU LAUGH HIM', l2: 'OUT OF THE ROOM?' },
    { type: 'paid', from: 28.8, to: 33.6, pose: 'shock', at: 28.9, cashAt: 30.74, stampAt: 30.74, chips: [{ at: 32.2, text: 'LUSTIG WAS GONE', tone: 'gold' }] },
    { type: 'noreport', from: 33.6, to: 37.7, pose: 'chin', at: 33.7, docAt: 35.0, noneAt: 36.5, stampAt: 34.9 },
    { type: 'again', from: 37.7, to: 41.4, pose: 'shock', at: 37.8, backAt: 39.3 },
    { type: 'unproven', from: 41.4, to: 44.8, pose: 'shock', at: 41.5, qAt: 41.6, xAt: 42.1, noAt: 42.5, stampAt: 43.3 },
    { type: 'ask', from: 44.8, to: 47.8, pose: 'you', l1: 'THE FRIEND WHO’D', l2: 'FALL FOR THIS' },
    { type: 'record', from: 47.8, to: 50.2, pose: 'chin', at: 47.9, l1: 'WHAT’S PROVEN?', factAt: 48.5, l2At: 49.4, l2: 'COUNTERFEITING' },
    { type: 'fakecash', from: 50.2, to: 53.4, pose: 'shock', at: 50.3, billAt: 50.4, factAt: 52.5, defAt: 50.56, fakeAt: 51.08 },
    { type: 'moneybox', from: 53.4, to: 57.4, pose: 'shock', at: 53.5, billAt: 55.0, defAt: 55.3, stampAt: 54.0 },
    { type: 'arrest', from: 57.4, to: 61.9, pose: 'shock', at: 57.5, flash: true, stampAt: 60.42, factAt: 61.1, callout: { at: 57.9, text: 'MAY 1935 · NEW YORK' } },
    { type: 'defcard', from: 61.9, to: 64.6, pose: 'chin', at: 62.0, head: 'WHO ARRESTED HIM', term: 'SECRET SERVICE', d1: 'THE AGENCY THAT', d2: 'CHASES FAKE CASH', icon: 'badge', defAt: 62.3, iconAt: 62.1, factAt: 63.7 },
    { type: 'escape', from: 64.6, to: 71.5, pose: 'shock', at: 64.7, escAt: 65.5, caughtAt: 69.9, caughtText: 'CAUGHT WEEKS LATER', factAt: 70.8 },
    { type: 'ask', from: 71.5, to: 74.3, pose: 'you', l1: 'HERE’S WHAT', l2: '20 YEARS LOOKS LIKE' },
    { type: 'sentence', from: 74.3, to: 79.0, pose: 'shock', at: 74.4, guiltyAt: 74.6, fifteenAt: 76.1, fiveAt: 77.5 },
    { type: 'verdict', from: 79.0, to: 81.0, pose: 'shock', at: 79.0, barsAt: 79.0, yrsAt: 79.02, alcAt: 80.1, factAt: 79.6 },
    { type: 'island', from: 81.0, to: 83.2, pose: 'chin', at: 81.05, l1At: 81.3, factAt: 82.4 },
    { type: 'tower', from: 83.2, to: 85.6, pose: 'shock', at: 83.3, tagAt: 83.4, stampAt: 84.9, xAt: 84.2, chips: [{ at: 84.2, text: 'NEVER CHARGED FOR IT', tone: 'bad', y: 1108 }], foot: 'THE STORY · NEVER PROVEN IN COURT' },
    { type: 'board', from: 85.6, to: 87.9, pose: 'shock', at: 85.65, step: 0.2, tightAt: 86.7, stampAt: 87.2 },
    { type: 'ask', from: 87.9, to: 99, pose: 'you', l1: 'REAL CON OR', l2: 'BULLSHIT LEGEND?' },
  ],
  hideCounter: [[87.9, 99]],
  labels: [[0, 'THE LEGEND'], [3.7, 'THE CON MAN'], [10.9, 'THE STORY'], [18.2, 'THE MARKS'], [22.7, 'THE PITCH'], [28.8, 'THE MISTAKE'], [41.4, 'THE DOUBT'], [47.8, 'THE RECORD'], [57.4, 'THE CATCH'], [64.6, 'THE ESCAPE'], [74.3, 'THE SENTENCE'], [83.2, 'THE TWIST']],
  notes: [],
  pip: [{ at: 0, text: 'THE CON MAN', tone: 'leg', sepia: true }, { at: 4.6, text: 'VICTOR LUSTIG', tone: 'gold', zoom: 0.08 }, { at: 6.9, text: 'A “COUNT”?', tone: 'gold', k: 'c', zoom: 0.1 }, { at: 9.5, text: 'TITLE: FAKE', tone: 'bad', k: 'c', x: true },
    { at: 12.9, text: 'PARIS · 1925', tone: 'leg', k: 'p', sepia: true }, { at: 15.0, text: 'POSES AS OFFICIAL', tone: 'leg', k: 'c', sepia: true, zoom: 0.15 }, { at: 22.9, text: 'THE WHISPER', tone: 'leg', k: 'p', sepia: true, zoom: 0.1 }, { at: 32.2, text: 'GONE WITH CASH', tone: 'leg', sepia: true, fy: 0.03 },
    { at: 39.3, text: 'CAME BACK', tone: 'leg', k: 'c', sepia: true, stamp: 'ROUND 2' }, { at: 42.1, text: 'NEVER PROVEN', tone: 'bad', sepia: true, x: true }, { at: 48.5, text: 'THE RECORD', tone: 'good', stamp: 'FACT' }, { at: 50.6, text: 'FAKE MONEY', tone: 'good', k: 'c', zoom: 0.12 },
    { at: 54.5, text: 'THE MONEY BOX', tone: 'leg', k: 'p', sepia: true }, { at: 60.2, text: 'ARRESTED', tone: 'bad', stamp: 'ARRESTED', tint: 'rgba(224,40,30,.18)' }, { at: 65.6, text: 'ESCAPED', tone: 'bad', k: 'p', tint: 'rgba(224,40,30,.22)' }, { at: 69.4, text: 'CAUGHT AGAIN', tone: 'bad', k: 'c', mono: true },
    { at: 74.6, text: 'GUILTY', tone: 'bad', mono: true, stamp: 'GUILTY' }, { at: 79.1, text: '20 YEARS', tone: 'bad', mono: true, bars: true, k: 'p' }, { at: 83.4, text: 'NEVER CHARGED', tone: 'leg', k: 'c', sepia: true, zoom: 0.2 },
    { at: 85.8, text: 'LOCKED UP', tone: 'good', mono: true, bars: true }, { at: 88.0, text: 'REAL OR LEGEND?', tone: 'gold', zoom: 0.12 }],
  cta: { like: 27.0, send: 44.86, follow: 71.66, followOut: 73.6, bubble: { at: 90.12, l1: 'REAL CON OR', l2: 'BULLSHIT LEGEND?' } },
  poses: [[27.1, 'you'], [44.9, 'you']],
  shakes: [[0.1, 8], [60.42, 12], [79.02, 12], [87.2, 8]],
  captions: { gap: 16, emph: { 'legend': 'gold', 'legend,': 'gold', 'legend?': 'gold', 'reportedly': 'gold', 'supposedly': 'gold', 'fake': 'bad', 'scrap.': 'gold', '20': 'bad', 'arrested': 'bad', 'escaped': 'bad', 'guilty.': 'bad', 'alcatraz,': 'bad' }, fix: [] },
  sfx2: [
    { at: 0.04, name: 'deep_boom_2', gain: -5, dur: 0.36 }, { at: 27.0, name: 'pop_2', gain: -9, dur: 0.3 }, { at: 44.86, name: 'swoosh_1', gain: -9, dur: 0.9 },
    { at: 71.7, name: 'pop_1', gain: -9, dur: 0.5 }, { at: 72.4, name: 'click_1', gain: -8, dur: 0.3 }, { at: 72.5, name: 'success_chime_1', gain: -12, dur: 1.2 }, { at: 90.12, name: 'pop_1', gain: -9, dur: 0.5 }, { at: 87.2, name: 'dramatic_sting_1', gain: -10, dur: 1.2 },
  ],
});
BM2.scene(S);
