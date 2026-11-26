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
  window.DD = { h: {} };
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
  // ===== THE FAKE DIARIES — Decoded crime-show stage. NO portraits of the dictator, NO symbols: the "diaries" are plain black notebooks; the tell is the wrong initials on the cover (F H, should be A H). Neutral tone. =====
  // Facts (beats-v3 + research): Kujau (Stuttgart memorabilia dealer) wrote the notebooks, sold under a fake name via a middleman; Stern reporter Gerd Heidemann believed them; ~9 million marks; Heidemann secretly kept a chunk; April 1983 announcement; plastic letters F H instead of A H; national archives: modern paper and ink; crude forgery < 2 weeks; Hamburg 1985: ~4.5 years each.
  const PK = 'brand/photos/konrad-kujau/3.jpg', CROPK = { crop: [0, 0, 0.5, 0.78], fx: 0.5, fy: 0.36 };
  const cst = (g, th, t, o) => B.crimeStamp(g, th, t, o);
  function face(g, x, y, w, h, zoom = 1, mono = false) { g.save(); rr(g, x, y, w, h, 8); g.clip(); B.drawPhoto(g, B.images[PK], x, y, w, h, { ...CROPK, zoom }); if (mono) { g.globalCompositeOperation = 'saturation'; g.fillStyle = '#808080'; g.fillRect(x, y, w, h); g.globalCompositeOperation = 'source-over'; } g.restore(); g.strokeStyle = 'rgba(11,15,20,.45)'; g.lineWidth = 3; rr(g, x, y, w, h, 8); g.stroke(); }
  const pk = (t, at, o = 'bouncy') => Math.min(1.1, spring(t - at, o));
  const sub = (g, s, x, y, col, size = 24, al = 'center') => txt(g, s, x, y, F.monoX(size), col, al);
  const bottomChip = (g, S, t, th) => { let ch = null; for (const c of (S.chips || (S.chip ? [S.chip] : []))) if (t >= c.at) ch = c; if (ch && !(S.chipOut && t >= S.chipOut)) chip(g, ch.text, 540, ch.y || 1062, ch.tone || 'ink', th, ch.size || 38, 900, spring(t - ch.at, 'bouncy')); };
  const pop0 = (g, t, at, y0 = 70, base = 0.88) => { const k = pk(t, at); g.translate(0, (1 - Math.min(1, k)) * y0); g.scale(base + (1 - base) * k, base + (1 - base) * k); g.globalAlpha *= clamp((t - at) / 0.08); return k; };
  const billD = (g, x, y, w, h, lab = 'DM') => { clay(g, x, y, w, h, 8, '#3F8F6B', { shadowK: 0.4 }); g.strokeStyle = 'rgba(245,243,238,.7)'; g.lineWidth = 3; rr(g, x + 7, y + 7, w - 14, h - 14, 5); g.stroke(); g.fillStyle = 'rgba(245,243,238,.9)'; g.beginPath(); g.arc(x + w / 2, y + h / 2, h * 0.28, 0, 7); g.fill(); txt(g, lab, x + w / 2, y + h / 2 + 2, F.hero(h * 0.26), '#0B0F14'); };
  // ---------- a plain black notebook (no symbols). letters: ['F','H'] gold plastic tiles ----------
  function notebook(g, x, y, w, h, rot, th, o = {}) {
    g.save(); g.translate(x, y); g.rotate(rot); B.shadowed(g, () => rr(g, -w / 2, -h / 2, w, h, 14), '#14171d', 0.5);
    const gr = g.createLinearGradient(-w / 2, 0, w / 2, 0); gr.addColorStop(0, '#0e1013'); gr.addColorStop(0.08, '#262a31'); gr.addColorStop(0.5, '#1a1d22'); gr.addColorStop(1, '#101216'); g.fillStyle = gr; rr(g, -w / 2, -h / 2, w, h, 14); g.fill();
    g.fillStyle = '#07080a'; g.fillRect(-w / 2, -h / 2, w * 0.07, h); g.strokeStyle = 'rgba(255,255,255,.08)'; g.lineWidth = 3; rr(g, -w / 2 + 6, -h / 2 + 6, w - 12, h - 12, 10); g.stroke();
    g.fillStyle = '#7a1b1b'; g.fillRect(w * 0.34, -h / 2, w * 0.05, h); // elastic band
    if (o.letters) { const n = o.letters.length, tw = w * 0.22, th2 = tw * 1.2; o.letters.forEach((ch, i) => { const at = (o.lAt ?? 0) + i * 0.25, k = o.t == null ? 1 : Math.min(1.1, spring(o.t - at, 'bouncy')); if (o.t != null && o.t < at) return; const lx = (i - (n - 1) / 2) * (tw * 1.25) - w * 0.04, ly = h * 0.22; g.save(); g.translate(lx, ly - (1 - Math.min(1, k)) * -60); g.scale(0.7 + 0.3 * Math.min(1.1, k), 0.7 + 0.3 * Math.min(1.1, k)); g.globalAlpha *= clamp(((o.t ?? 1e9) - at) / 0.06 + (o.t == null ? 1 : 0)); clay(g, -tw / 2, -th2 / 2, tw, th2, 8, o.lcol || '#E0B63C', { shadowK: 0.4 }); txt(g, ch, 0, 4, F.hero(th2 * 0.78), '#5b4408'); g.restore(); }); }
    sub(g, 'DIARY', -w * 0.04, -h * 0.28, 'rgba(235,225,200,.5)', Math.max(14, w * 0.06));
    g.restore();
  }
  function reporter(g, x, y, s, th, o = {}) { // ILLUSTRATION card of the Stern reporter: coloured, not gray
    g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = '#C9A46A'; g.beginPath(); g.moveTo(-120, 190); g.quadraticCurveTo(-118, 80, -50, 70); g.lineTo(50, 70); g.quadraticCurveTo(118, 80, 120, 190); g.closePath(); g.fill(); g.strokeStyle = '#1a1210'; g.lineWidth = 5; g.stroke();
    g.fillStyle = '#F5F3EE'; g.beginPath(); g.moveTo(-30, 70); g.lineTo(0, 130); g.lineTo(30, 70); g.closePath(); g.fill(); g.stroke(); g.fillStyle = '#9B2A2A'; g.beginPath(); g.moveTo(-8, 92); g.lineTo(8, 92); g.lineTo(12, 160); g.lineTo(0, 172); g.lineTo(-12, 160); g.closePath(); g.fill();
    g.fillStyle = '#E8B98F'; g.beginPath(); g.ellipse(0, -10, 62, 76, 0, 0, 7); g.fill(); g.stroke(); g.fillStyle = '#6b5a45'; g.beginPath(); g.ellipse(0, -62, 62, 30, 0, Math.PI, 0); g.fill(); g.stroke();
    g.strokeStyle = '#1a1210'; g.lineWidth = 5; for (const q of [-26, 26]) { g.fillStyle = 'rgba(210,235,255,.6)'; g.beginPath(); g.ellipse(q, -8, 20, 15, 0, 0, 7); g.fill(); g.stroke(); } g.beginPath(); g.moveTo(-6, -8); g.lineTo(6, -8); g.stroke(); g.fillStyle = '#1a1210'; for (const q of [-26, 26]) { g.beginPath(); g.arc(q, -8, 4, 0, 7); g.fill(); }
    g.beginPath(); if (o.mood === 'worried') { g.moveTo(-18, 38); g.quadraticCurveTo(0, 28, 18, 38); } else { g.moveTo(-18, 32); g.quadraticCurveTo(0, 46, 18, 32); } g.stroke();
    g.fillStyle = '#F2B705'; rr(g, 50, 96, 54, 40, 6); g.fill(); g.lineWidth = 3; g.stroke(); txt(g, 'PRESS', 77, 117, F.hero(15), '#0B0F14'); g.restore();
  }
  function middleman(g, x, y, s) { g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = '#5B3FA8'; g.beginPath(); g.moveTo(-100, 170); g.quadraticCurveTo(-96, 70, -40, 56); g.lineTo(40, 56); g.quadraticCurveTo(96, 70, 100, 170); g.closePath(); g.fill(); g.strokeStyle = '#1a1210'; g.lineWidth = 5; g.stroke(); g.fillStyle = '#D9A87E'; g.beginPath(); g.ellipse(0, -8, 54, 66, 0, 0, 7); g.fill(); g.stroke(); g.fillStyle = '#2b2118'; g.beginPath(); g.ellipse(0, -38, 82, 18, 0, 0, 7); g.fill(); g.beginPath(); g.ellipse(0, -52, 50, 36, 0, Math.PI, 0); g.fill(); g.fillStyle = '#1a1210'; for (const q of [-20, 20]) { g.beginPath(); g.arc(q, -6, 5, 0, 7); g.fill(); } g.beginPath(); g.moveTo(-14, 30); g.lineTo(14, 30); g.stroke(); g.restore(); }
  function labeled(g, th, x, y, w, h, title, k = 1) { g.save(); g.translate(x, y); g.scale(k, k); paper(g, -w / 2, -h / 2, w, h, 14, { lift: 0.4 }); g.fillStyle = th.navy; rr(g, -w / 2, -h / 2, w, 44, 14); g.fill(); txt(g, title, 0, -h / 2 + 23, F.monoX(20), th.gold); g.restore(); }
  // ================= scenes =================
  function nb(g, p, lt, t, th, S) { // one notebook, letters drop in, red circle, stamp
    g.save(); g.translate(540, 830 + (S.dy || 0)); if (S.sc) g.scale(S.sc, S.sc); const k = pop0(g, t, S.at, 70);
    notebook(g, 0, 0, 340, 440, -0.04, th, { letters: S.letters || ['F', 'H'], lAt: S.lAt ?? S.at + 0.4, t });
    if (S.circleAt != null && t >= S.circleAt) { const u = ease.out(clamp((t - S.circleAt) / 0.45)); g.save(); g.strokeStyle = '#E0281E'; g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); g.ellipse(-14, 98, 150, 80, -0.04, -2.2, -2.2 + 6.9 * u); g.stroke(); g.restore(); }
    if (S.stampAt != null) cst(g, th, t, { text: S.stampText || 'WRONG INITIALS', at: S.stampAt, tone: 'bad', size: 58, rot: -0.1, x: 0, y: -150 });
    g.restore(); bottomChip(g, S, t, th);
  }
  function stack(g, p, lt, t, th, S) { // a pile of black notebooks
    const n = S.n || 12; g.save(); g.translate(0, 0); for (let i = 0; i < n; i++) { const at = S.at + i * (S.per || 0.12), o = t - at; if (o <= 0) continue; const k = Math.min(1.05, spring(o, 'snappy')), c = i % 4, r = Math.floor(i / 4), x = 260 + c * 190 + (r % 2 ? 40 : 0) + (hash(i * 3.1) - 0.5) * 24, y = 740 + r * 130 + (hash(i * 7.7) - 0.5) * 16; g.save(); g.globalAlpha *= clamp(o / 0.05); notebook(g, x, y - (1 - Math.min(1, k)) * 90, 150, 190, (hash(i * 1.3) - 0.5) * 0.35, th); g.restore(); } g.restore();
    if (S.tag) { const kk = pk(t, S.tagAt ?? S.at); g.save(); g.globalAlpha *= clamp(kk * 2); g.translate(540, 640); g.scale(0.8 + 0.2 * Math.min(1.08, kk), 0.8 + 0.2 * Math.min(1.08, kk)); stk(g, S.tag, 0, 0, F.hero(fit(S.tag, F.hero, 880, 78)), th.gold, 'center', 14); g.restore(); }
    bottomChip(g, S, t, th);
  }
  function casefile(g, p, lt, t, th, S) { // CASE FILE card with the forger's photo (small), name plate, role
    g.save(); g.translate(540, 835 + (S.dy || 0)); if (S.sc) g.scale(S.sc, S.sc); pop0(g, t, S.at, 90);
    paper(g, -440, -235, 880, 470, 18, { lift: 0.6 }); g.strokeStyle = th.gold; g.lineWidth = 6; rr(g, -424, -219, 848, 438, 12); g.stroke();
    g.fillStyle = th.navy; rr(g, -424, -219, 848, 52, 12); g.fill(); txt(g, S.head || 'CASE FILE Nº 1983 · WEST GERMANY', 0, -192, F.monoX(24), th.gold);
    face(g, -400, -140, 260, 300, 1 + 0.05 * lin(t, S.at, S.at + 6)); if (S.flash && lt < 0.4) { g.fillStyle = 'rgba(255,255,255,' + 0.8 * hit(lt, 12) + ')'; rr(g, -400, -140, 260, 300, 8); g.fill(); }
    sub(g, 'PHOTO: TELEPHIL · CC BY-SA 3.0', -270, 190, th.inkSoft, 11);
    const nm = t - (S.nameAt ?? S.at + 0.3); if (nm > 0) { g.save(); g.globalAlpha *= clamp(nm / 0.1); txt(g, 'KONRAD KUJAU', 150, -95, F.hero(76), th.ink); g.restore(); }
    const rl = t - (S.roleAt ?? S.at + 0.6); if (rl > 0) { g.save(); g.globalAlpha *= clamp(rl / 0.1); g.translate(150, -20); g.scale(0.8 + 0.2 * Math.min(1.1, spring(rl, 'bouncy')), 0.8 + 0.2 * Math.min(1.1, spring(rl, 'bouncy'))); clay(g, -250, -34, 500, 68, 14, th.gold, { shadowK: 0.4 }); txt(g, S.role || 'OLD WAR SOUVENIR DEALER', 0, 3, F.hero(fit(S.role || 'OLD WAR SOUVENIR DEALER', F.hero, 470, 40)), '#0B0F14'); g.restore(); }
    const pl = t - (S.placeAt ?? 9999); if (pl > 0) { g.save(); g.globalAlpha *= clamp(pl / 0.1); txt(g, S.place || 'STUTTGART · WEST GERMANY', 150, 60, F.monoX(28), th.inkSoft); g.fillStyle = th.navy; rr(g, -90, 90, 480, 6, 3); g.fill(); g.restore(); }
    for (const q of S.stamps || []) cst(g, th, t, { size: 70, rot: -0.1, x: 170, y: 150, ...q });
    g.restore(); bottomChip(g, S, t, th);
  }
  function souvenirs(g, p, lt, t, th, S) { // old war souvenirs: letters, map, medals, tin (generic, no symbols)
    const items = [['LETTERS', 300, 800, -0.1], ['OLD MAP', 540, 770, 0.05], ['MEDALS', 780, 810, 0.1]];
    items.forEach(([lab, x, y, r], i) => { const at = S.at + i * 0.25, o = t - at; if (o <= 0) return; const k = pk(t, at); g.save(); g.translate(x, y + (1 - Math.min(1, k)) * 70); g.rotate(r); g.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k); g.globalAlpha *= clamp(o / 0.08); paper(g, -110, -130, 220, 260, 8, { lift: 0.4, fill: '#E9DDBF' });
      if (i === 0) { for (let q = 0; q < 6; q++) { g.fillStyle = 'rgba(70,50,30,.55)'; g.fillRect(-80, -90 + q * 26, 160 - (q % 3) * 24, 5); } g.fillStyle = '#B03A2E'; g.beginPath(); g.arc(50, 80, 22, 0, 7); g.fill(); }
      if (i === 1) { g.strokeStyle = 'rgba(70,50,30,.6)'; g.lineWidth = 3; g.beginPath(); g.moveTo(-90, -60); g.quadraticCurveTo(-20, -110, 20, -40); g.quadraticCurveTo(60, 20, 90, -20); g.moveTo(-80, 40); g.quadraticCurveTo(0, 80, 80, 50); g.stroke(); g.fillStyle = '#B03A2E'; g.beginPath(); g.arc(20, -40, 8, 0, 7); g.fill(); }
      if (i === 2) { for (const [dx, col] of [[-50, '#C9A227'], [0, '#9aa2ad'], [50, '#B5651D']]) { g.fillStyle = col === '#9aa2ad' ? '#4a6fa5' : '#8b2d2d'; g.fillRect(dx - 12, -100, 24, 70); g.fillStyle = col; g.beginPath(); g.arc(dx, -10, 28, 0, 7); g.fill(); g.strokeStyle = 'rgba(0,0,0,.35)'; g.lineWidth = 3; g.stroke(); } }
      txt(g, lab, 0, 100, F.hero(34), th.ink); g.restore(); });
    const kk = pk(t, S.at); g.save(); g.globalAlpha *= clamp(kk * 2); g.translate(540, 640); stk(g, 'OLD WAR SOUVENIRS', 0, 0, F.hero(fit('OLD WAR SOUVENIRS', F.hero, 880, 84)), th.gold, 'center', 14); g.restore();
    bottomChip(g, S, t, th);
  }
  function forging(g, p, lt, t, th, S) { // an open notebook, handwriting appears line by line
    g.save(); g.translate(540, 840); pop0(g, t, S.at, 70); paper(g, -420, -230, 840, 440, 12, { lift: 0.5, fill: '#2a2e36' }); g.fillStyle = '#EFE6CF'; rr(g, -400, -210, 390, 400, 6); g.fill(); rr(g, 10, -210, 390, 400, 6); g.fill(); g.fillStyle = 'rgba(0,0,0,.18)'; g.fillRect(-4, -210, 8, 400);
    const lines = 14; g.strokeStyle = 'rgba(40,30,20,.7)'; g.lineWidth = 3; g.lineCap = 'round'; for (let i = 0; i < lines; i++) { const u = clamp((t - S.at - 0.2 - i * 0.14) / 0.3); if (u <= 0) continue; const sx = i < 7 ? -370 : 40, y = -170 + (i % 7) * 52, wlen = (240 + 60 * hash(i * 2.7)) * u; g.beginPath(); g.moveTo(sx, y); for (let q = 0; q <= 14; q++) { const xx = sx + wlen * q / 14; g.lineTo(xx, y + Math.sin(q * 2.1 + i) * 6 * (q % 2 ? 1 : -1)); } g.stroke(); }
    const pi = clamp((t - S.at - 0.2) / (lines * 0.14)); const pxp = (pi < 0.5 ? -370 + 300 * (pi * 2) : 40 + 300 * ((pi - 0.5) * 2)), pyp = -170 + (Math.floor(pi * 14) % 7) * 52; g.save(); g.translate(pxp, pyp); g.rotate(0.6); g.fillStyle = '#C9A227'; rr(g, -4, -90, 8, 90, 3); g.fill(); g.fillStyle = '#1a1210'; g.beginPath(); g.moveTo(-4, 0); g.lineTo(4, 0); g.lineTo(0, 14); g.fill(); g.restore();
    g.restore(); if (S.tag) { const kk = pk(t, S.tagAt ?? S.at + 0.4); g.save(); g.globalAlpha *= clamp(kk * 2); g.translate(540, 626); stk(g, S.tag, 0, 0, F.hero(fit(S.tag, F.hero, 880, 70)), th.gold, 'center', 12); g.restore(); }
    if (S.stampAt != null) cst(g, th, t, { text: S.stampText || 'ALL FAKE', at: S.stampAt, tone: 'bad', size: 70, rot: -0.1, x: 540, y: 1010 });
    bottomChip(g, S, t, th);
  }
  function alias(g, p, lt, t, th, S) { // name tag swap + chain forger -> middleman -> magazine
    g.save(); g.translate(540, 700); pop0(g, t, S.at, 60); g.fillStyle = th.navy; rr(g, -380, -80, 760, 150, 16); g.fill(); sub(g, 'HELLO MY NAME IS', 0, -52, th.gold, 22); txt(g, 'KONRAD KUJAU', 0, 2, F.hero(76), th.paper);
    if (S.strikeAt != null && t >= S.strikeAt) { const u = ease.out(clamp((t - S.strikeAt) / 0.3)); g.strokeStyle = th.bad; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); g.moveTo(-250, 4); g.lineTo(-250 + 500 * u, -6); g.stroke(); }
    g.restore();
    const rv = t - (S.revealAt ?? 9999); if (rv > 0) { g.save(); g.translate(540, 810); g.scale(0.8 + 0.2 * Math.min(1.1, spring(rv, 'bouncy')), 0.8 + 0.2 * Math.min(1.1, spring(rv, 'bouncy'))); g.globalAlpha *= clamp(rv / 0.1); g.fillStyle = th.paper; rr(g, -330, -42, 660, 84, 14); g.fill(); g.strokeStyle = th.bad; g.lineWidth = 5; rr(g, -330, -42, 660, 84, 14); g.stroke(); txt(g, 'KONRAD FISCHER', 0, 4, F.hero(60), th.badInk); g.restore(); sub(g, 'A FAKE NAME', 540, 872, th.gold, 22); }
    const ch = [[200, 'FORGER'], [540, 'MIDDLEMAN'], [880, 'BUYER']]; ch.forEach(([x, l], i) => { const at = S.chainAt + i * 0.35, o = t - at; if (o <= 0) return; const k = pk(t, at); g.save(); g.translate(x, 990); g.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k); g.globalAlpha *= clamp(o / 0.08); paper(g, -90, -70, 180, 140, 10, { lift: 0.3 }); if (i === 0) notebook(g, 0, -12, 70, 90, -0.1, th); if (i === 1) { g.save(); rr(g, -80, -62, 160, 100, 8); g.clip(); middleman(g, 0, -20, 0.38); g.restore(); } if (i === 2) { g.fillStyle = th.navy; rr(g, -60, -52, 120, 100, 6); g.fill(); txt(g, 'MAGAZINE', 0, -14, F.hero(24), th.gold); txt(g, '?', 0, 22, F.hero(46), th.paper); } txt(g, l, 0, 52, F.monoX(17), th.ink); g.restore();
      if (i < 2 && t >= at + 0.25) { const u = ease.out(clamp((t - at - 0.25) / 0.3)); g.strokeStyle = th.gold; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.moveTo(x + 100, 990); g.lineTo(x + 100 + 150 * u, 990); g.stroke(); if (u > 0.9) { g.fillStyle = th.gold; g.beginPath(); g.moveTo(x + 260, 990); g.lineTo(x + 242, 978); g.lineTo(x + 242, 1002); g.fill(); } } });
    bottomChip(g, S, t, th);
  }
  function magazine(g, x, y, w, h, th, o = {}) { g.save(); g.translate(x, y); paper(g, -w / 2, -h / 2, w, h, 6, { lift: 0.4, fill: '#F1EEE6' }); g.fillStyle = '#B3261E'; g.fillRect(-w / 2 + 10, -h / 2 + 10, w - 20, h * 0.16); txt(g, o.mast || 'THE MAGAZINE', 0, -h / 2 + 10 + h * 0.08, F.hero(h * 0.11), '#F5F3EE'); g.fillStyle = '#C8C2B4'; g.fillRect(-w / 2 + 14, -h / 2 + h * 0.26, w - 28, h * 0.32); g.fillStyle = 'rgba(40,36,30,.5)'; for (let i = 0; i < 4; i++) g.fillRect(-w / 2 + 16, h * 0.14 + i * h * 0.075, (w - 32) * (0.9 - i * 0.12), h * 0.03); if (o.head) txt(g, o.head, 0, -h / 2 + h * 0.42, F.hero(fit(o.head, F.hero, w - 30, h * 0.12)), '#0B0F14'); g.restore(); }
  function reportercard(g, p, lt, t, th, S) { // Stern + the reporter believes the notebooks
    g.save(); g.translate(260, 825); g.scale(0.86, 0.86); pop0(g, t, S.at, 70); magazine(g, 0, 0, 340, 440, th, { mast: 'STERN', head: 'BIG SCOOP' }); sub(g, 'GERMAN NEWS MAGAZINE', 0, 246, th.paper, 18); g.restore();
    const b = t - (S.rAt ?? S.at + 0.4); if (b > 0) { const kk = Math.min(1.1, spring(b, 'bouncy')); g.save(); g.translate(790, 825 + (1 - Math.min(1, kk)) * 70); g.scale(0.86, 0.86); g.rotate(0.03); g.globalAlpha *= clamp(b / 0.08); paper(g, -215, -245, 430, 490, 18, { lift: 0.5 });
      const bg = g.createLinearGradient(0, -220, 0, 110); bg.addColorStop(0, '#CFE3F0'); bg.addColorStop(1, '#9FC2D8'); g.fillStyle = bg; rr(g, -190, -220, 380, 330, 12); g.fill(); g.save(); rr(g, -190, -220, 380, 330, 12); g.clip(); reporter(g, 0, -40, 1.05, th, { mood: S.mood }); g.restore(); g.strokeStyle = 'rgba(11,15,20,.45)'; g.lineWidth = 3; rr(g, -190, -220, 380, 330, 12); g.stroke();
      g.fillStyle = th.navy; rr(g, -190, 124, 380, 96, 10); g.fill(); txt(g, 'GERD HEIDEMANN', 0, 156, F.hero(40), th.paper); sub(g, 'STAR REPORTER · ILLUSTRATION', 0, 198, th.gold, 16); g.restore(); }
    const bl = t - (S.believeAt ?? 9999); if (bl > 0) { const k = pk(t, S.believeAt); g.save(); g.translate(540, 780); g.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k); g.globalAlpha *= clamp(k * 2); g.save(); g.rotate(-0.05); notebook(g, 0, 0, 120, 150, 0, th); g.restore(); g.strokeStyle = th.good; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); g.moveTo(-34, 84); g.lineTo(-6, 112); g.lineTo(44, 58); g.stroke(); g.restore(); }
    bottomChip(g, S, t, th);
  }
  function pay(g, p, lt, t, th, S) { // the magazine pays ~9 million marks
    for (let st = 0; st < 4; st++) { const at = S.at + st * 0.25, o = t - at; if (o <= 0) continue; const k = pk(t, at, 'snappy'); for (let b = 0; b < 4 + st; b++) { g.save(); g.globalAlpha *= clamp(o / 0.05); g.translate(200 + st * 227, 1010 - b * 26 - (1 - Math.min(1, k)) * 80); g.rotate(((b + st) % 3 - 1) * 0.03); billD(g, -95, -30, 190, 62); g.restore(); } }
    const k = pk(t, S.at); g.save(); g.translate(540, 700); g.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k); g.globalAlpha *= clamp((t - S.at) / 0.08); const v = Math.round(9 * ease.out(clamp((t - S.at) / (S.dur || 1.3))) * 10) / 10; if (S.noNum) { stk(g, S.numText || 'A FORTUNE', 0, 0, F.hero(fit(S.numText || 'A FORTUNE', F.hero, 880, 120)), th.gold, 'center', 14); } else { stk(g, 'ABOUT ' + v.toFixed(1) + ' MILLION', 0, -10, F.hero(fit('ABOUT 9.0 MILLION', F.hero, 880, 104)), th.gold, 'center', 14); sub(g, 'MARKS · WEST GERMAN MONEY', 0, 62, th.paper, 24); } g.restore();
    if (S.stampAt != null) cst(g, th, t, { text: S.stampText || 'A FORTUNE', at: S.stampAt, tone: 'bad', size: 70, rot: -0.08, x: 540, y: 880 });
    bottomChip(g, S, t, th);
  }
  function skim(g, p, lt, t, th, S) { // the reporter secretly keeps a chunk
    g.save(); g.translate(300, 840); pop0(g, t, S.at, 60); paper(g, -170, -190, 340, 380, 14, { lift: 0.4 }); g.save(); rr(g, -150, -170, 300, 270, 8); g.clip(); const bg = g.createLinearGradient(0, -170, 0, 100); bg.addColorStop(0, '#CFE3F0'); bg.addColorStop(1, '#9FC2D8'); g.fillStyle = bg; g.fillRect(-150, -170, 300, 270); reporter(g, 0, -30, 0.95, th, { mood: 'worried' }); g.restore(); txt(g, 'HEIDEMANN', 0, 140, F.hero(40), th.ink); g.restore();
    for (let b = 0; b < 8; b++) { const own = b >= 5, u = own ? ease.inOut(clamp((t - S.moveAt - (b - 5) * 0.12) / 0.7)) : 0; const x = lerp(790, 520, u), y = lerp(990 - b * 26, 990 - (b - 5) * 24, u); const at = S.at + b * 0.07; if (t < at) continue; g.save(); g.globalAlpha *= clamp((t - at) / 0.05); g.translate(x, y); g.rotate(own ? u * -0.2 : ((b % 3) - 1) * 0.03); billD(g, -95, -30, 190, 62); g.restore(); }
    stk(g, 'THE MAGAZINE’S MONEY', 790, 700, F.hero(fit('THE MAGAZINE’S MONEY', F.hero, 400, 46)), th.paper, 'center', 10);
    if (S.stampAt != null) cst(g, th, t, { text: S.stampText || 'SECRETLY KEPT A CHUNK', at: S.stampAt, tone: 'bad', size: 40, rot: -0.05, x: 540, y: 622 });
    bottomChip(g, S, t, th);
  }
  function defcard(g, p, lt, t, th, S) {
    g.save(); g.translate(540, 830); pop0(g, t, S.at, 70, 0.9); paper(g, -430, -210, 860, 420, 18, { lift: 0.5 }); g.fillStyle = th.navy; rr(g, -430, -210, 860, 78, 18); g.fill(); txt(g, S.head || 'WHAT IT MEANS', 0, -170, F.hero(48), th.gold);
    g.save(); g.translate(-250, 30); const ia = t - (S.iconAt ?? S.at + 0.3); if (ia > 0) { g.globalAlpha *= clamp(ia / 0.1); g.scale(0.7 + 0.3 * Math.min(1.1, spring(ia, 'bouncy')), 0.7 + 0.3 * Math.min(1.1, spring(ia, 'bouncy'))); ICON[S.icon || 'cash'](g, th, t); } g.restore();
    const da = t - (S.defAt ?? S.at + 0.4); if (da > 0) { g.save(); g.globalAlpha *= clamp(da / 0.12); g.translate((1 - Math.min(1, spring(da, 'snappy'))) * 50, 0); txt(g, S.term, 120, -75, F.hero(fit(S.term, F.hero, 520, 78)), th.badInk); txt(g, S.d1, 120, 5, F.hero(fit(S.d1, F.hero, 520, 50)), th.ink); txt(g, S.d2, 120, 65, F.hero(fit(S.d2, F.hero, 520, 50)), th.ink); if (S.d3) txt(g, S.d3, 120, 125, F.hero(fit(S.d3, F.hero, 520, 50)), th.ink); g.restore(); }
    g.restore(); bottomChip(g, S, t, th);
  }
  const ICON = { cash(g, th) { B.crimeIcon(g, 'cash', 230, th); }, gavel(g, th) { B.crimeIcon(g, 'gavel', 230, th); }, book(g, th) { notebook(g, 0, 0, 150, 190, -0.06, th); }, fake(g, th) { notebook(g, 0, 0, 150, 190, -0.06, th); g.strokeStyle = th.bad; g.lineWidth = 14; g.lineCap = 'round'; g.beginPath(); g.moveTo(-70, -70); g.lineTo(70, 70); g.moveTo(70, -70); g.lineTo(-70, 70); g.stroke(); } };
  function press(g, p, lt, t, th, S) { // April 1983: the announcement - lectern, mics, camera flashes
    g.save(); g.translate(540, 840); pop0(g, t, S.at, 70); g.fillStyle = th.navy; rr(g, -420, -240, 840, 90, 12); g.fill(); txt(g, 'WORLD EXCLUSIVE · APRIL 1983', 0, -195, F.hero(52), th.gold);
    g.fillStyle = '#5B3A1F'; g.beginPath(); g.moveTo(-130, 200); g.lineTo(-100, -40); g.lineTo(100, -40); g.lineTo(130, 200); g.closePath(); g.fill(); g.strokeStyle = '#2a1a0c'; g.lineWidth = 5; g.stroke(); for (const q of [-50, 0, 50]) { g.strokeStyle = '#59606B'; g.lineWidth = 6; g.beginPath(); g.moveTo(q, -40); g.lineTo(q * 1.2, -110); g.stroke(); g.fillStyle = '#12171f'; g.beginPath(); g.arc(q * 1.2, -118, 15, 0, 7); g.fill(); }
    notebook(g, 0, 40, 110, 140, 0.05, th, { letters: ['F', 'H'] }); g.restore();
    for (let i = 0; i < 7; i++) { const ft = S.flashAt + i * 0.28, k = t - ft; if (k > 0 && k < 0.3) { const x = 120 + hash(i * 5.3) * 840, y = 700 + hash(i * 8.1) * 340; g.fillStyle = 'rgba(255,255,255,' + 0.9 * (1 - k / 0.3) + ')'; g.beginPath(); g.arc(x, y, 60 * (0.4 + k * 3), 0, 7); g.fill(); } }
    bottomChip(g, S, t, th);
  }
  function cover(g, p, lt, t, th, S) { // nobody checked the cover: magnifier + checklist
    g.save(); g.translate(330, 850); pop0(g, t, S.at, 60); notebook(g, 0, 0, 300, 390, -0.04, th, { letters: ['F', 'H'] }); const u = clamp((t - S.at) / 0.8), mx = lerp(120, -10, ease.out(u)) + Math.sin(t * 2) * 6, my = lerp(-160, 100, ease.out(u)); g.strokeStyle = '#C9A227'; g.lineWidth = 12; g.beginPath(); g.arc(mx, my, 62, 0, 7); g.stroke(); g.fillStyle = 'rgba(200,230,255,.25)'; g.beginPath(); g.arc(mx, my, 62, 0, 7); g.fill(); g.beginPath(); g.moveTo(mx + 44, my + 44); g.lineTo(mx + 100, my + 100); g.lineWidth = 16; g.stroke(); g.restore();
    const items = [['PAPER TEST', 'NOT DONE'], ['INK TEST', 'NOT DONE'], ['COVER CHECK', 'NOBODY']]; items.forEach(([a, b], i) => { const at = S.listAt + i * 0.4, o = t - at; if (o <= 0) return; const k = pk(t, at); g.save(); g.translate(790, 700 + i * 130); g.scale(0.85 + 0.15 * k, 0.85 + 0.15 * k); g.globalAlpha *= clamp(o / 0.08); paper(g, -190, -48, 380, 96, 12, { lift: 0.3 }); txt(g, a, -170, -10, F.hero(34), th.ink, 'left'); sub(g, b, -170, 24, th.badInk, 20, 'left'); g.strokeStyle = th.bad; g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); g.moveTo(130, -20); g.lineTo(166, 16); g.moveTo(166, -20); g.lineTo(130, 16); g.stroke(); g.restore(); });
    bottomChip(g, S, t, th);
  }
  function compare(g, p, lt, t, th, S) { // what it said (F H) vs what it should say (A H)
    [[300, 'WHAT IT SAID', ['F', 'H'], th.bad], [780, 'IT SHOULD SAY', ['A', 'H'], th.good]].forEach(([x, l, lt2, col], i) => { const at = S.at + i * (S.gap ?? 0.8), o = t - at; if (o <= 0) return; const k = pk(t, at); g.save(); g.translate(x, 840); g.scale(0.85 + 0.15 * k, 0.85 + 0.15 * k); g.globalAlpha *= clamp(o / 0.08); if (i === 1) g.globalAlpha *= 0.92; notebook(g, 0, 0, 280, 360, i ? 0.05 : -0.05, th, { letters: lt2, lcol: i ? '#7BC96F' : '#E0B63C' }); stk(g, l, 0, -228, F.hero(44), col, 'center', 10);
      if (!i) { const u = ease.out(clamp((t - at - 0.5) / 0.3)); g.save(); g.strokeStyle = '#E0281E'; g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); g.ellipse(-12, 80, 120, 62, -0.04, 0, 6.28 * u); g.stroke(); g.restore(); } else { const u = ease.out(clamp((t - at - 0.5) / 0.3)); g.save(); g.strokeStyle = th.good; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); g.moveTo(-40, 214); g.lineTo(-10, 244 * u + 0); g.lineTo(50, 190); g.stroke(); g.restore(); } g.restore(); });
    if (S.vsAt != null && t >= S.vsAt) { const k = pk(t, S.vsAt); g.save(); g.translate(540, 860); g.scale(k, k); g.fillStyle = '#0B0F14'; g.beginPath(); g.arc(0, 0, 40, 0, 7); g.fill(); g.strokeStyle = th.gold; g.lineWidth = 5; g.stroke(); txt(g, 'VS', 0, 3, F.hero(42), th.gold); g.restore(); }
    bottomChip(g, S, t, th);
  }
  function lab(g, p, lt, t, th, S) { // national archives lab: paper + ink under test, MODERN
    g.save(); g.translate(540, 840); pop0(g, t, S.at, 60); g.fillStyle = th.navy; rr(g, -440, -240, 880, 70, 12); g.fill(); txt(g, 'NATIONAL ARCHIVES · LAB TEST', 0, -205, F.hero(44), th.gold);
    paper(g, -420, -150, 400, 330, 14, { lift: 0.4 }); txt(g, 'PAPER', -220, -118, F.hero(42), th.ink); g.fillStyle = '#EFE6CF'; rr(g, -330, -85, 220, 150, 6); g.fill(); g.fillStyle = 'rgba(120,150,255,.28)'; rr(g, -330, -85, 220, 150, 6); g.fill();
    paper(g, 20, -150, 400, 330, 14, { lift: 0.4 }); txt(g, 'INK', 220, -118, F.hero(42), th.ink); g.strokeStyle = '#1a2a6b'; g.lineWidth = 8; g.lineCap = 'round'; g.beginPath(); g.moveTo(80, -30); g.quadraticCurveTo(140, -80, 200, -30); g.quadraticCurveTo(260, 20, 320, -30); g.stroke(); g.restore();
    [[S.paperAt, 'MODERN', -220], [S.inkAt, 'MODERN', 220]].forEach(([at, w, x]) => { if (at != null) cst(g, th, t, { text: w, at, tone: 'bad', size: 66, rot: x < 0 ? -0.1 : 0.08, x: 540 + x, y: 960 }); });
    if (S.lampAt != null && t >= S.lampAt) { const u = clamp((t - S.lampAt) / 0.4); g.save(); g.globalAlpha *= u * 0.5; const lg = g.createRadialGradient(540, 700, 10, 540, 840, 360); lg.addColorStop(0, 'rgba(180,200,255,.5)'); lg.addColorStop(1, 'rgba(180,200,255,0)'); g.fillStyle = lg; g.fillRect(100, 600, 880, 460); g.restore(); }
    bottomChip(g, S, t, th);
  }
  function days(g, p, lt, t, th, S) { // < 2 weeks: calendar of 14 days between announcement and the lab verdict
    g.save(); g.translate(540, 840); pop0(g, t, S.at, 60); paper(g, -440, -230, 880, 460, 16, { lift: 0.5 }); g.fillStyle = th.navy; rr(g, -440, -230, 880, 64, 16); g.fill(); txt(g, 'ANNOUNCEMENT  →  LAB VERDICT', 0, -198, F.hero(40), th.gold);
    for (let i = 0; i < 14; i++) { const c = i % 7, r = Math.floor(i / 7), x = -340 + c * 112, y = -110 + r * 130, o = t - (S.tickAt + i * (S.step ?? 0.12)), done = o > 0; g.save(); g.translate(x + 45, y + 50); g.fillStyle = done ? '#F3D9D6' : '#EEEBE2'; rr(g, -45, -50, 90, 100, 10); g.fill(); g.strokeStyle = 'rgba(11,15,20,.35)'; g.lineWidth = 3; rr(g, -45, -50, 90, 100, 10); g.stroke(); txt(g, String(i + 1), -22, -28, F.monoX(20), th.inkSoft); if (done) { const k = Math.min(1.1, spring(o, 'snappy')); g.strokeStyle = th.bad; g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); g.moveTo(-26, -20); g.lineTo(-26 + 52 * k, -20 + 52 * k); g.moveTo(26, -20); g.lineTo(26 - 52 * k, -20 + 52 * k); g.stroke(); } g.restore(); }
    g.restore(); if (S.stampAt != null) cst(g, th, t, { text: S.stampText || 'LESS THAN 2 WEEKS', at: S.stampAt, tone: 'bad', size: 56, rot: -0.05, x: 540, y: 1034 });
    bottomChip(g, S, t, th);
  }
  function crude(g, p, lt, t, th, S) { // CRUDE FORGERY stamp over the notebook
    g.save(); g.translate(540, 830); pop0(g, t, S.at, 60); notebook(g, 0, 0, 330, 430, -0.05, th, { letters: ['F', 'H'] }); g.restore(); if (S.stampAt != null) cst(g, th, t, { text: 'CRUDE FORGERY', at: S.stampAt, tone: 'bad', size: 74, rot: -0.1, x: 540, y: 840 }); bottomChip(g, S, t, th);
  }
  function court(g, p, lt, t, th, S) { // Hamburg court: columns + gavel + two defendants
    g.save(); g.translate(540, 830); pop0(g, t, S.at, 70); g.fillStyle = '#D9D2C0'; g.beginPath(); g.moveTo(-300, -120); g.lineTo(0, -230); g.lineTo(300, -120); g.closePath(); g.fill(); g.strokeStyle = '#6b6350'; g.lineWidth = 5; g.stroke(); for (let i = -2; i <= 2; i++) { g.fillStyle = '#E9E3D3'; g.fillRect(i * 110 - 28, -110, 56, 250); g.strokeRect(i * 110 - 28, -110, 56, 250); } g.fillStyle = '#C9C2AE'; g.fillRect(-340, 140, 680, 40); txt(g, 'HAMBURG · 1985', 0, -150, F.hero(40), '#3a3320'); g.restore();
    g.save(); g.translate(540, 1010); g.scale(0.9, 0.9); B.crimeIcon(g, 'gavel', 120, th); g.restore();
    const gk = S.gavelAt != null ? t - S.gavelAt : -1; if (gk > 0 && gk < 0.5) { g.save(); g.globalAlpha *= 1 - gk / 0.5; g.strokeStyle = th.gold; g.lineWidth = 6; g.beginPath(); g.arc(540, 1030, 40 + gk * 260, 0, 7); g.stroke(); g.restore(); }
    bottomChip(g, S, t, th);
  }
  function sentence(g, p, lt, t, th, S) { // two defendants, bars come down, ~4.5 years each
    [[320, 'KUJAU', 'photo'], [760, 'HEIDEMANN', 'rep']].forEach(([x, nm, kind], i) => { const at = S.at + i * 0.3, o = t - at; if (o <= 0) return; const k = pk(t, at); g.save(); g.translate(x, 760 + (1 - Math.min(1, k)) * 60); g.globalAlpha *= clamp(o / 0.08); paper(g, -200, -170, 400, 340, 14, { lift: 0.5 }); g.save(); rr(g, -180, -150, 360, 250, 8); g.clip(); if (kind === 'photo') { face(g, -180, -150, 360, 250, 1.05, true); } else { const bg = g.createLinearGradient(0, -150, 0, 100); bg.addColorStop(0, '#BFC9D2'); bg.addColorStop(1, '#8C99A6'); g.fillStyle = bg; g.fillRect(-180, -150, 360, 250); reporter(g, 0, -30, 0.95, th, { mood: 'worried' }); g.globalCompositeOperation = 'saturation'; g.fillStyle = '#808080'; g.fillRect(-180, -150, 360, 250); g.globalCompositeOperation = 'source-over'; }
      const bu = ease.in(clamp((t - S.barsAt - i * 0.3) / 0.35)); for (let b = 0; b < 7; b++) { const bx = -180 + (b + 0.5) * 360 / 7; g.fillStyle = '#10161f'; g.fillRect(bx - 10, -150, 20, 250 * bu); g.fillStyle = 'rgba(255,255,255,.22)'; g.fillRect(bx - 10, -150, 5, 250 * bu); } g.restore(); g.fillStyle = th.navy; rr(g, -180, 108, 360, 48, 8); g.fill(); txt(g, nm, 0, 133, F.hero(34), th.paper); g.restore(); });
    const ya = t - S.yrsAt; if (ya > 0) { const kk = Math.min(1.1, spring(ya, 'bouncy')); g.save(); g.translate(540, 1000); g.scale(0.8 + 0.2 * kk, 0.8 + 0.2 * kk); g.globalAlpha *= clamp(ya / 0.08); stk(g, 'ABOUT 4½ YEARS EACH', 0, -10, F.hero(fit('ABOUT 4½ YEARS EACH', F.hero, 880, 92)), th.bad, 'center', 14); g.restore(); }
    if (ya > 0.2) { const w = 840 / 9; for (let i = 0; i < 9; i++) { const u = ease.out(clamp((ya - 0.2 - i * 0.04) / 0.3)); g.fillStyle = i < 4.5 ? th.bad : 'rgba(255,59,48,.3)'; rr(g, 120 + i * w + 2, 1056, w - 4, 18 * u, 4); g.fill(); } }
    bottomChip(g, S, t, th);
  }
  function board(g, p, lt, t, th, S) { // evidence board
    g.save(); g.translate(540, 830); pop0(g, t, S.at, 60); const lg = g.createLinearGradient(-450, -230, 450, 230); lg.addColorStop(0, '#b98650'); lg.addColorStop(1, '#8c5f33'); g.fillStyle = lg; rr(g, -450, -240, 900, 480, 18); g.fill(); g.strokeStyle = '#4a2f17'; g.lineWidth = 14; rr(g, -450, -240, 900, 480, 18); g.stroke();
    for (let i = 0; i < 140; i++) { g.fillStyle = 'rgba(' + (hash(i * 3.1) > 0.5 ? '60,35,10' : '230,190,130') + ',' + (0.06 + 0.1 * hash(i * 7.7)) + ')'; g.beginPath(); g.arc(-440 + hash(i * 1.3) * 880, -230 + hash(i * 2.9) * 460, 2 + 4 * hash(i * 5.1), 0, 7); g.fill(); }
    const items = [{ x: 0, y: -60, w: 190, h: 215, kind: 'photo' }, { x: -310, y: -100, w: 170, h: 150, k: 'nb', txt: 'F H' }, { x: -310, y: 100, w: 170, h: 150, k: 'mag', txt: 'STERN' }, { x: 310, y: -100, w: 170, h: 150, icon: 'cash', txt: '~9M MARKS' }, { x: 310, y: 100, w: 170, h: 150, icon: 'gavel', txt: '~4½ YRS' }];
    const pins = items.map(it => [it.x, it.y - it.h / 2 + 8]), tight = ease.out(clamp((t - S.tightAt) / 0.5));
    items.forEach((it, i) => { if (i) { const at = S.at + 0.3 + (i - 1) * 0.25, u = ease.out(clamp((t - at - 0.1) / 0.4)); if (u > 0) { const a = pins[0], b = pins[i]; g.strokeStyle = '#E0281E'; g.lineWidth = 5; g.lineCap = 'round'; g.beginPath(); g.moveTo(a[0], a[1]); const ex = lerp(a[0], b[0], u), ey = lerp(a[1], b[1], u); g.quadraticCurveTo((a[0] + ex) / 2, (a[1] + ey) / 2 + 36 * (1 - tight), ex, ey); g.stroke(); } } });
    items.forEach((it, i) => { const at = i ? S.at + 0.3 + (i - 1) * 0.25 : S.at, o = t - at; if (o < 0) return; const kk = Math.min(1.1, spring(o, 'bouncy')); g.save(); g.translate(it.x, it.y); g.rotate((i - 2) * 0.03 + (1 - Math.min(1, kk)) * 0.2); g.scale(0.6 + 0.4 * kk, 0.6 + 0.4 * kk); paper(g, -it.w / 2, -it.h / 2, it.w, it.h, 8, { lift: 0.3, fill: it.kind ? '#EDE7D8' : th.paper });
      if (it.kind) { face(g, -it.w / 2 + 10, -it.h / 2 + 10, it.w - 20, it.h - 64, 1.0); g.fillStyle = th.navy; rr(g, -it.w / 2 + 10, it.h / 2 - 48, it.w - 20, 38, 6); g.fill(); txt(g, 'KUJAU', 0, it.h / 2 - 29, F.hero(26), th.paper); } else { g.save(); g.translate(0, -26); if (it.k === 'nb') notebook(g, 0, 0, 70, 90, -0.06, th, { letters: ['F', 'H'] }); else if (it.k === 'mag') magazine(g, 0, 0, 80, 100, th, { mast: 'STERN' }); else B.crimeIcon(g, it.icon, 80, th); g.restore(); txt(g, it.txt, 0, it.h / 2 - 22, F.hero(fit(it.txt, F.hero, it.w - 16, 30)), th.ink); } g.restore(); g.fillStyle = '#c4231a'; g.beginPath(); g.arc(pins[i][0], pins[i][1], 10, 0, 7); g.fill(); });
    g.restore(); if (S.stampAt != null) { g.save(); g.translate(540, 840); cst(g, th, t, { text: S.stampText || 'NOBODY CHECKED TWO LETTERS', at: S.stampAt, tone: 'bad', size: 44, rot: -0.07, x: 0, y: 190 }); g.restore(); }
    bottomChip(g, S, t, th);
  }
  function ask(g, p, lt, t, th, S) { const k = spring(lt, 'bouncy'); g.save(); g.translate(540, 800); g.scale(0.7 + 0.3 * Math.min(1.06, k), 0.7 + 0.3 * Math.min(1.06, k)); g.globalAlpha *= clamp(k * 2); const sz = Math.min(fit(S.l1, F.hero, 900, 112), fit(S.l2, F.hero, 900, 112)); stk(g, S.l1, 0, -62, F.hero(sz), th.gold, 'center', 16); stk(g, S.l2, 0, 62, F.hero(sz), th.bad, 'center', 16); g.restore(); }
  const SC = { nb, stack, casefile, souvenirs, forging, alias, reportercard, pay, skim, defcard, press, cover, compare, lab, days, crude, court, sentence, board, ask };
  // ---------- suspect card (always on, bottom-left): the forger's face, a different treatment every beat ----------
  function pip(g, p, env) {
    const { t, theme: th } = env; let K = p.keys[0]; for (const q of p.keys) if (t >= q.at) K = q; const o = t - K.at, pop = 1 + 0.07 * Math.exp(-o * 7) * Math.cos(o * 22);
    g.save(); g.scale(pop, pop); g.rotate(-0.03); paper(g, -100, -150, 200, 262, 14, { lift: 0.5 }); face(g, -90, -140, 180, 190, 1 + 0.05 * Math.min(1, o / 3), !!K.mono);
    if (K.tint) { g.fillStyle = K.tint; rr(g, -90, -140, 180, 190, 8); g.fill(); }
    if (K.x) { const u = ease.out(clamp(o / 0.3)); g.strokeStyle = th.bad; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); g.moveTo(-60, -110); g.lineTo(-60 + 120 * u, -110 + 120 * u); g.moveTo(60, -110); g.lineTo(60 - 120 * u, -110 + 120 * u); g.stroke(); }
    if (K.bars) { const u = ease.in(clamp(o / 0.3)); for (let i = 0; i < 6; i++) { const bx = -90 + (i + 0.5) * 30; g.fillStyle = '#10161f'; g.fillRect(bx - 5, -140, 10, 190 * u); } }
    g.fillStyle = th.bad; rr(g, -90, 56, 180, 28, 8); g.fill(); txt(g, 'KUJAU · FORGER', 0, 70, F.cap(13), th.paper);
    const w = Math.max(196, mw(K.text, F.cap(21)) + 22); g.save(); g.translate(0, 120); g.fillStyle = th.ink; rr(g, -w / 2, -20, w, 40, 10); g.fill(); g.strokeStyle = K.tone === 'bad' ? '#FF3B30' : K.tone === 'good' ? '#00D26A' : '#F2B705'; g.lineWidth = 3; rr(g, -w / 2, -20, w, 40, 10); g.stroke(); txt(g, K.text, 0, 2, F.cap(21), g.strokeStyle); g.restore();
    if (K.stamp) cst(g, th, t, { text: K.stamp, at: K.at + 0.1, tone: K.tone || 'bad', size: 30, rot: -0.2, x: 0, y: -40 });
    g.restore();
  }
  B.register('apip', { defaults: { keys: [] }, ownEnter: true, size: () => [230, 330], anchors: () => ({ face: [0, -40, 200, 240] }), draw(g, p, env) { g.globalAlpha *= clamp(env.lt / 0.08); pip(g, p, env); } });
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
      for (const S of p.scenes) {
        if (t < S.from - 0.02 || t > S.to + 0.02) continue; const lt = t - S.from, kin = spring(lt + 0.08, { f: 2.4, z: 0.7 }), a = clamp(lt / 0.12) * (1 - lin(t, S.to - 0.12, S.to)), sc = (S.pop === false ? 1 : 0.94 + 0.06 * Math.min(1.05, kin));
        g.save(); g.globalAlpha *= a; g.translate(540, 840 + (S.gdy || 0)); g.scale(sc * (S.gsc || 1), sc * (S.gsc || 1)); g.translate(-540, -840);
        const fn = SC[S.type]; if (!fn) throw new Error('unknown scene type ' + S.type); fn(g, p, lt, t, th, S);
        g.restore();
      }
      hookText(g, p, t, th);
      for (const n of p.notes) if (t >= n.at && t < n.out + 0.2) { const nt = t - n.at, k = Math.min(1.08, spring(nt, 'bouncy')), fo = 1 - lin(t, n.out - 0.15, n.out + 0.05); g.save(); g.globalAlpha *= clamp(nt / 0.06) * fo; chip(g, n.text, 540, n.y || 598, n.tone || 'bad', th, n.size || 44, 900, k); g.restore(); }
    },
  });
  B.register('hypo', {
    defaults: { text: '' }, ownEnter: true, size: () => [10, 10],
    draw(g, p, env) { const s = p.text, f = F.monoX(21), w = mw(s, f) + 36; g.globalAlpha *= 0.9; g.fillStyle = 'rgba(11,15,20,.78)'; rr(g, -w / 2, -18, w, 36, 18); g.fill(); g.strokeStyle = env.theme.accent; g.lineWidth = 2; rr(g, -w / 2, -18, w, 36, 18); g.stroke(); txt(g, s, 0, 1, f, env.theme.accent); },
  });
  Object.assign(window.DD.h, { fit, stk, chip, label, mw });
})();
(function () {
  const ST = { x: 905, y: 1338, s: 0.8, layer: 'front', blur: 0, dim: 0 };
  const DX = [0, 420, -380, 300, -300, 380, -420, 260];
  window.DD.make = function (c0) {
    const B = window.BM2, T = B.makeT((window.BM2_VOICE || {}).words || []), c = B.deepT(c0, T), els = [], extra = c.sfx2 || [], auto = [];
    const A = (at, name, gain = -9, dur = 0.5) => { if (at != null) auto.push({ at, name, gain, dur }); };
    c.scenes.forEach((sc, i) => { if (i > 0) A(sc.from, i % 2 ? 'whoosh_1' : 'whoosh_2', -12, 0.6);
      switch (sc.type) {
        case 'nb': A(sc.at, 'pop_2'); A(sc.lAt ?? sc.at + 0.4, 'click_1', -9, 0.3); A((sc.lAt ?? sc.at + 0.4) + 0.25, 'click_1', -9, 0.3); A(sc.circleAt, 'pen_scratch_1', -8, 0.6); A(sc.stampAt, 'rubber_stamp_1', -7); break;
        case 'stack': A(sc.at, 'paper_rustle_1', -11, 1.2); for (let k = 0; k < (sc.n || 12); k += 3) A(sc.at + k * (sc.per || 0.12), 'pop_1', -12, 0.3); break;
        case 'casefile': A(sc.at, 'camera_shutter_1', -8, 0.5); A(sc.nameAt, 'pop_1', -10); break;
        case 'souvenirs': A(sc.at, 'pop_2'); A(sc.at + 0.25, 'pop_1', -10); A(sc.at + 0.5, 'pop_1', -10); break;
        case 'forging': A(sc.at + 0.2, 'pen_scratch_1', -8, 2.0); A(sc.at + 1.3, 'pen_scratch_2', -9, 1.2); A(sc.stampAt, 'rubber_stamp_1', -7); break;
        case 'alias': A(sc.at, 'pop_2'); A(sc.strikeAt, 'pen_scratch_1', -8, 0.5); A(sc.revealAt, 'typewriter_1', -9, 0.8); A(sc.chainAt, 'pop_1', -10); A(sc.chainAt + 0.35, 'pop_1', -10); A(sc.chainAt + 0.7, 'pop_1', -10); break;
        case 'reportercard': A(sc.at, 'pop_2'); A(sc.rAt ?? sc.at + 0.4, 'camera_shutter_2', -9); A(sc.believeAt, 'success_chime_1', -11, 0.9); break;
        case 'pay': A(sc.at, 'cash_count_1', -11, 1.5); A(sc.at + 1.1, 'deep_boom_1', -7, 1.2); A(sc.stampAt, 'rubber_stamp_1', -7); break;
        case 'skim': A(sc.at, 'pop_2'); A(sc.moveAt, 'swipe_1', -9, 0.5); A(sc.stampAt, 'rubber_stamp_1', -7); break;
        case 'defcard': A(sc.at, 'pop_2'); A(sc.defAt ?? sc.at + 0.4, 'pop_1', -10); break;
        case 'press': A(sc.at, 'pop_2'); for (let k = 0; k < 7; k++) A(sc.flashAt + k * 0.28, 'camera_flash_1', -10, 0.4); break;
        case 'cover': A(sc.at, 'pop_2'); [0, 1, 2].forEach(k => A(sc.listAt + k * 0.4, 'wrong_buzzer_1', -13, 0.5)); break;
        case 'compare': A(sc.at, 'pop_2'); A(sc.at + 0.5, 'pen_scratch_1', -9, 0.5); A(sc.at + (sc.gap ?? 0.8), 'pop_1', -10); A(sc.at + (sc.gap ?? 0.8) + 0.5, 'success_chime_1', -11, 0.9); break;
        case 'lab': A(sc.at, 'pop_2'); A(sc.lampAt, 'riser_1', -14, 1.2); A(sc.paperAt, 'rubber_stamp_1', -7); A(sc.inkAt, 'rubber_stamp_2', -7); break;
        case 'days': A(sc.at, 'pop_2'); for (let k = 0; k < 14; k++) A(sc.tickAt + k * (sc.step ?? 0.12), 'click_1', -13, 0.2); A(sc.stampAt, 'rubber_stamp_1', -6); A(sc.stampAt, 'cinematic_hit_1', -9, 1.0); break;
        case 'crude': A(sc.at, 'pop_2'); A(sc.stampAt, 'rubber_stamp_1', -6); A(sc.stampAt, 'cinematic_hit_1', -9, 1.0); break;
        case 'court': A(sc.at, 'pop_2'); A(sc.gavelAt, 'gavel_1', -6, 0.6); break;
        case 'sentence': A(sc.at, 'pop_2'); A(sc.barsAt, 'cell_door_1', -8, 1.2); A(sc.yrsAt, 'deep_boom_1', -5, 1.4); break;
        case 'board': A(sc.at, 'pop_2'); for (let k = 1; k < 5; k++) A(sc.at + 0.3 + (k - 1) * 0.25, 'pop_1', -10, 0.4); A(sc.tightAt, 'riser_1', -14, 1.6); A(sc.stampAt, 'rubber_stamp_1', -7); break;
        case 'ask': A(sc.from, 'pop_1'); break;
      }
      if (sc.chip) A(sc.chip.at, 'pop_1', -11, 0.4); (sc.chips || []).forEach(ch => A(ch.at, 'pop_1', -11, 0.4)); });
    els.push({ id: 'stage', type: 'astage', layer: 'screen', at: [540, 960], in: -1, z: 10, props: { C: c.C, scenes: c.scenes, hook: c.hook, hideCounter: c.hideCounter || [], beats: c.labels, notes: c.notes || [], photos: ['brand/photos/konrad-kujau/3.jpg'] } });
    els.push({ id: 'pip', type: 'apip', layer: 'screen', at: [150, 1213], scale: 0.82, in: -1, z: 20, props: { keys: c.pip } });
    els.push({ id: 'hypo', type: 'hypo', layer: 'screen', at: [545, 1316], in: 0.2, z: 20, props: { text: 'TRUE STORY · HAMBURG COURT 1985' } });
    if (c.cta.like) els.push({ id: 'heart', type: 'heart', layer: 'screen', at: [520, 1205], in: c.cta.like, z: 30, props: { s: 1, dur: 1.0 } });
    if (c.cta.send) els.push({ id: 'plane', type: 'plane', layer: 'screen', at: [0, 0], in: c.cta.send, z: 30, props: { from: [330, 1275], to: [760, 1160], dur: 1.2, s: 0.7 }, out: c.cta.send + 1.5 });
    if (c.cta.follow) els.push({ id: 'follow', type: 'follow', layer: 'screen', at: [520, 1215], in: c.cta.follow, out: c.cta.followOut, z: 30, props: { press: 0.75 } });
    const beats = c.scenes.map((s, i) => ({ at: s.from, beat: 'wide', focus: { x: 540 + DX[i % DX.length], y: 740 + (i % 2 ? 90 : -60), w: 1080, h: 300 }, fill: 1, dur: 0.8, st: ST, pose: s.pose || 'talk' }));
    beats.unshift({ at: 0, beat: 'wide', focus: { x: 540, y: 740, w: 1080, h: 300 }, fill: 1, st: ST, pose: 'shock' });
    return {
      series: 'decoded', title: 'CASE FILE · FAKE DIARIES', duration: c.dur,
      footnote: ['PHOTO: TELEPHIL (CC BY-SA 3.0), VIA WIKIMEDIA COMMONS · REPORTER & MIDDLEMAN = ILLUSTRATIONS', 'PRICE ~9 MILLION DEUTSCHE MARKS · SENTENCES (HAMBURG, JULY 1985) ~4½ YEARS EACH', 'SOURCES: BRITANNICA · CHRISTIAN SCIENCE MONITOR 1985 · ENCYCLOPEDIA.COM · TIME'],
      elements: els, beats, poses: [...(c.cta.follow ? [[c.cta.follow, 'follow', { target: [520, 1215] }]] : []), ...(c.poses || [])], shakes: c.shakes, captions: c.captions, bed: c.bed || { name: 'orchestral_bed_1', gain: -1 }, sfx: [...auto, ...extra],
    };
  };
})();
// TikTok cut — DECODED: the fake diaries. Hook: black notebook with F H (wrong letters) then the magazine's fortune. Neutral cards only: no portraits, no symbols.
const H = { until: "@here's-0.1", y: 690, size: 60, lines: [[['THE FAKE DIARIES HAD', 'paper']], [['THE WRONG LETTERS', 'bad']], [['AND A MAGAZINE PAID', 'paper']], [['A FORTUNE', 'gold']]] };
const S = DD.make({
  dur: 86.56,
  C: [
    { from: 0, L: ['THE PAYOUT', 'A FORTUNE'], R: ['THE COVER', 'WRONG LETTERS'], Lc: 'gold', Rc: 'bad' },
    { from: "@here's-0.1", L: ['PLACE', 'WEST GERMANY'], R: ['WHEN', 'EARLY 1980s'] },
    { from: '@a#3-0.1', L: ['THE FORGER', 'KONRAD KUJAU'], R: ['HIS JOB', 'SOUVENIR DEALER'] },
    { from: '@then-0.1', L: ['THE FORGERY', 'HANDWRITTEN'], R: ['CLAIMED TO BE', 'SECRET DIARIES'], Rc: 'bad' },
    { from: '@but-0.1', L: ['THE BUYER', 'STERN REPORTER'], R: ['HE FELL FOR', 'IT HARD'] },
    { from: '@and#3-0.1', L: ['HIS NAME', 'HEIDEMANN'], R: ['HE GOT HIS BOSSES TO', 'PAY'] },
    { from: '@pay-0.3', L: ['THE MAGAZINE PAID', { from: 0, to: 9, at: '@pay', dur: 1.3, suf: ' MILLION' }], R: ['CURRENCY', 'MARKS'], Lc: 'gold' },
    { from: '@marks#2-0.1', L: ['MARKS WERE', 'GERMAN MONEY'], R: ['FOR NOTEBOOKS', 'A FORTUNE'], Rc: 'bad' },
    { from: '@and#4-0.1', L: ['HEIDEMANN KEPT', 'A BIG CHUNK'], R: ['HOW', 'SECRETLY'], Lc: 'bad', Rc: 'bad' },
    { from: '@in#1-0.1', L: ['DATE', 'APRIL 1983'], R: ['TOLD TO', 'THE WHOLE WORLD'] },
    { from: '@so#1-0.1', L: ['THE COVER', 'THE INITIALS'], R: ['MADE OF', 'PLASTIC LETTERS'], Lc: 'bad' },
    { from: '@and#5-0.1', L: ['IT SAID', 'F H'], R: ['IT SHOULD SAY', 'A H'], Lc: 'bad', Rc: 'gold' },
    { from: '@send-0.1', L: ['SEND THIS TO', 'THE FRIEND'], R: ['WHO NEVER', 'PROOFREADS'] },
    { from: '@then#3-0.1', L: ['NATIONAL ARCHIVES', 'RUN TESTS'], R: ['ON THE', 'PAPER & INK'] },
    { from: '@both-0.1', L: ['THE PAPER', 'MODERN'], R: ['THE INK', 'MODERN'], Lc: 'bad', Rc: 'bad' },
    { from: '@less-0.1', L: ['TIME TO EXPOSE IT', '< 2 WEEKS'], R: ['VERDICT', 'CRUDE FORGERY'], Lc: 'bad', Rc: 'bad' },
    { from: '@follow-0.1', L: ['A SCAM DIES', 'ON ONE TYPO'], R: ['TWO LETTERS', 'F H'], Lc: 'bad' },
    { from: '@in#3-0.1', L: ['COURT', 'HAMBURG 1985'], R: ['CONVICTED', 'BOTH MEN'], Lc: 'bad' },
    { from: '@each-0.1', L: ['SENTENCE', '~4½ YEARS'], R: ['EACH', 'KUJAU · HEIDEMANN'], Lc: 'bad' },
    { from: '@nine#2-0.1', L: ['NINE MILLION MARKS', 'SUNK'], R: ['BY TWO', 'LITTLE LETTERS'], Lc: 'gold', Rc: 'bad' },
  ],
  hook: H,
  scenes: [
    { type: 'nb', from: 0, to: '@and-0.1', pose: 'shock', at: 0.1, lAt: 0.3, circleAt: '@letters', stampAt: '@cover', stampText: 'WRONG LETTERS', sc: 0.62, dy: 135 },
    { type: 'pay', from: '@and-0.1', to: "@here's-0.1", pose: 'shock', at: '@huge', noNum: true, sc: 0.62, dy: 135, stampAt: '@fortune', stampText: 'A FORTUNE' },
    { type: 'defcard', from: "@here's-0.1", to: '@a#3-0.1', pose: 'talk', at: "@here's-0.1", head: 'CASE FILE Nº 1983', term: 'WEST GERMANY', d1: 'THE EARLY', d2: '1980s', icon: 'book', defAt: '@germany-0.2', iconAt: '@west' },
    { type: 'casefile', from: '@a#3-0.1', to: '@old-0.1', pose: 'chin', at: '@a#3-0.1', nameAt: '@konrad', roleAt: '@sells', head: 'CASE FILE Nº 1983 · THE FORGER', flash: true },
    { type: 'souvenirs', from: '@old-0.1', to: '@then-0.1', pose: 'point', at: '@old' },
    { type: 'forging', from: '@then-0.1', to: '@and#2-0.1', pose: 'chin', at: '@then-0.1', tag: 'HAND-WRITTEN NOTEBOOKS', tagAt: '@handwriting' },
    { type: 'stack', from: '@and#2-0.1', to: '@but-0.1', pose: 'shock', at: '@says', n: 12, per: 0.14, tag: '“SECRET DIARIES”', tagAt: '@secret', chip: { at: '@diaries#2', text: 'ALL OF THEM FAKE', tone: 'bad' } },
    { type: 'reportercard', from: '@but-0.1', to: '@and#3-0.1', pose: 'shock', at: '@but-0.1', rAt: '@reporter', believeAt: '@fell', chips: [{ at: '@fell', text: 'BELIEVES THEY’RE REAL', tone: 'bad' }, { at: '@saw', text: 'SAW THAT COMING?', tone: 'ink' }] },
    { type: 'pay', from: '@and#3-0.1', to: '@marks#2-0.1', pose: 'shock', at: '@pay', stampAt: '@marks', stampText: 'ABOUT 9 MILLION MARKS' },
    { type: 'defcard', from: '@marks#2-0.1', to: '@and#4-0.1', pose: 'chin', at: '@marks#2-0.1', head: 'WHAT’S A MARK?', term: 'DEUTSCHE MARK', d1: 'GERMAN MONEY', d2: 'BACK THEN', icon: 'cash', defAt: '@german#2-0.2', iconAt: '@marks#2', chip: { at: '@fortune#2', text: 'A FORTUNE FOR NOTEBOOKS', tone: 'bad' } },
    { type: 'skim', from: '@and#4-0.1', to: '@in#1-0.1', pose: 'chin', at: '@and#4-0.1', moveAt: '@kept', stampAt: '@chunk' },
    { type: 'press', from: '@in#1-0.1', to: '@so#1-0.1', pose: 'shock', at: '@in#1-0.1', flashAt: '@magazine#3' },
    { type: 'nb', from: '@so#1-0.1', to: '@and#5-0.1', pose: 'point', at: '@so#1-0.1', lAt: '@plastic', circleAt: '@shop+0.3', chips: [{ at: '@initials', text: 'THE INITIALS?', tone: 'ink' }, { at: '@plastic', text: 'PLASTIC LETTERS FROM A SHOP', tone: 'ink' }] },
    { type: 'compare', from: '@and#5-0.1', to: '@send-0.1', pose: 'shock', at: '@and#5-0.1', gap: 4.1, chip: { at: '@starts#2', text: 'FIRST NAME STARTS WITH “A”', tone: 'accent' } },
    { type: 'ask', from: '@send-0.1', to: '@then#3-0.1', pose: 'you', l1: 'SEND THIS TO THE FRIEND', l2: 'WHO NEVER PROOFREADS' },
    { type: 'lab', from: '@then#3-0.1', to: '@less-0.1', pose: 'chin', at: '@then#3-0.1', lampAt: '@tested', paperAt: '@both', inkAt: '@modern' },
    { type: 'days', from: '@less-0.1', to: '@they#3-0.1', pose: 'shock', at: '@less-0.1', tickAt: '@less', step: 0.08, stampAt: '@weeks' },
    { type: 'crude', from: '@they#3-0.1', to: '@in#2-0.1', pose: 'shock', at: '@they#3-0.1', stampAt: '@crude' },
    { type: 'defcard', from: '@in#2-0.1', to: '@follow-0.1', pose: 'chin', at: '@in#2-0.1', head: 'IN PLAIN WORDS', term: 'CRUDE FORGERY', d1: 'A CHEAP,', d2: 'OBVIOUS FAKE', icon: 'fake', defAt: '@plain', iconAt: '@in#2' },
    { type: 'nb', from: '@follow-0.1', to: '@in#3-0.1', pose: 'shock', at: '@follow-0.1', lAt: '@follow-0.1', circleAt: '@typo-0.3', stampAt: '@typo', stampText: 'ONE TYPO' },
    { type: 'court', from: '@in#3-0.1', to: '@kuyau#2-0.1', pose: 'talk', at: '@in#3-0.1', gavelAt: '@convicted' },
    { type: 'sentence', from: '@kuyau#2-0.1', to: '@nine#2-0.1', pose: 'shock', at: '@kuyau#2-0.1', barsAt: '@each', yrsAt: '@about#2' },
    { type: 'board', from: '@nine#2-0.1', to: '@would-0.1', pose: 'chin', at: '@nine#2-0.1', tightAt: '@sunk', stampAt: '@two#2', stampText: 'SUNK BY 2 LETTERS' },
    { type: 'ask', from: '@would-0.1', to: 99, pose: 'you', l1: 'WOULD YOU', l2: 'HAVE SPOTTED IT?' },
  ],
  labels: [[0, 'THE TELL'], ["@here's-0.1", 'CASE FILE'], ['@a#3-0.1', 'THE FORGER'], ['@then-0.1', 'THE FORGERY'], ['@but-0.1', 'THE BUYER'], ['@and#3-0.1', 'THE PRICE'], ['@and#4-0.1', 'THE SKIM'], ['@in#1-0.1', 'THE SCOOP'], ['@so#1-0.1', 'THE COVER'], ['@then#3-0.1', 'THE TESTS'], ['@less-0.1', 'THE CATCH'], ['@in#3-0.1', 'THE VERDICT'], ['@nine#2-0.1', 'THE RECAP']],
  notes: [],
  pip: [{ at: 0, text: 'THE FORGER', tone: 'gold' }, { at: '@west', text: 'WEST GERMANY', tone: 'gold' }, { at: '@a#3', text: 'KONRAD KUJAU', tone: 'gold' }, { at: '@then', text: 'HAND-WRITING IT', tone: 'gold' }, { at: '@but', text: 'SELLING TO STERN', tone: 'gold' }, { at: '@pay', text: 'GETS PAID', tone: 'gold' }, { at: '@and#4', text: 'REPORTER SKIMS', tone: 'gold' }, { at: '@in#1', text: 'APRIL 1983', tone: 'gold' }, { at: '@so#1', text: 'THE COVER: F H', tone: 'bad' }, { at: '@and#5', text: 'WRONG LETTER', tone: 'bad', x: true }, { at: '@then#3', text: 'LAB TESTING', tone: 'gold', mono: true }, { at: '@both', text: 'TOO MODERN', tone: 'bad', stamp: 'MODERN' }, { at: '@they#3', text: 'CRUDE FORGERY', tone: 'bad', stamp: 'FAKE' }, { at: '@in#3', text: 'HAMBURG 1985', tone: 'bad', mono: true }, { at: '@each', text: '~4½ YEARS', tone: 'bad', bars: true, mono: true }, { at: '@nine#2', text: 'BUSTED', tone: 'bad', stamp: 'CONVICTED' }, { at: '@would', text: 'YOUR CALL', tone: 'gold' }],
  cta: { like: '@tap-0.1', send: '@send', follow: '@follow+0.05', followOut: '@follow+1.9' },
  poses: [['@tap', 'you'], ['@send', 'you']],
  shakes: [[0.1, 8], ['@modern', 12], ['@crude', 12], ['@each', 12]],
  captions: { gap: 16, emph: { 'million': 'good', 'marks': 'good', 'fake': 'bad', 'fake.': 'bad', 'forgery.': 'bad', 'modern.': 'bad', 'years': 'bad', 'cover.': 'accent', 'fortune.': 'good' }, fix: [['Kuyau', 'Kujau'], ['Gert', 'Gerd']] },
  sfx2: [
    { at: '@tap', name: 'pop_2', gain: -9, dur: 0.3 }, { at: '@send-0.05', name: 'swoosh_1', gain: -9, dur: 0.9 },
    { at: '@follow+0.05', name: 'pop_1', gain: -9, dur: 0.5 }, { at: '@follow+0.8', name: 'click_1', gain: -8, dur: 0.3 }, { at: '@follow+0.9', name: 'success_chime_1', gain: -12, dur: 1.2 },
    { at: 0.04, name: 'deep_boom_2', gain: -4, dur: 0.36 },
  ],
});
BM2.scene(S);
