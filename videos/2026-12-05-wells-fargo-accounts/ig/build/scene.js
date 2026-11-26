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
      default: if (B.extraIcons && B.extraIcons[kind]) B.extraIcons[kind](g, th); break;
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
// ===== Bad Math crime-show / What-If screen-space stage "CS" (2026-11-26 night builder) =====
// One screen-layer element 'csstage' draws scene after scene (sentence-aligned) from a declarative scene list.
// Scenes are lists of ITEMS (text, card, chip, stamp, person, photo, count, bars, icon, cal, arrow, ...).
// Persistent: beat-label pill (y 318), "pip" character card bottom-left (the villain in Decoded, YOU in What If), hook text on frame 0.
// Layout: pill y238-290 | label y318-364 | zone y 390-1090 | pip row y 1080-1335 (x < 330) | storyteller bottom-right | captions y>1340.
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, burst, hit, hash } = B;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const CS = (window.CS = { ITEM: {}, WHO: {}, ICON: {} });
  const pk = (t, o = 'bouncy') => Math.min(1.12, Math.max(0, spring(t, o)));
  const fit = (s, ff, maxW, size, min = 16) => { while (size > min && mw(s, ff(size)) > maxW) size -= 2; return size; };
  const stk = (g, s, x, y, font, col, al = 'center', lw = 12) => { g.save(); g.font = font; g.textAlign = al; g.textBaseline = 'middle'; g.lineJoin = 'round'; g.lineWidth = lw; g.strokeStyle = 'rgba(6,8,11,.92)'; g.strokeText(s, x, y); g.fillStyle = col; g.fillText(s, x, y); g.restore(); };
  const TN = (tn, th, onPaper) => B.tone(tn || (onPaper ? 'ink' : 'paper'), onPaper);
  const INK = '#0B0F14';
  CS.fit = fit; CS.stk = stk; CS.pk = pk;
  const sub = (g, s, x, y, col, size = 22, al = 'center') => txt(g, s, x, y, F.monoX(size), col, al);

  // ---------------------------------------------------------------- characters (busts in a 360x360 box centred at 0,0)
  const head = (g, o) => { // o: {y, r, skin, hair, style, hat, hatCol, glasses, mouth, brow, look, cheeks}
    const y = o.y ?? -40, r = o.r ?? 62; g.save(); g.translate(0, y);
    if (o.hair && o.style !== 'bald') { g.fillStyle = o.hair; g.beginPath(); g.arc(0, -4, r + 5, Math.PI * 0.98, Math.PI * 2.02); g.fill(); if (o.style === 'long') { g.fillRect(-r - 6, -6, 22, r + 50); g.fillRect(r - 16, -6, 22, r + 50); } }
    g.fillStyle = o.skin || '#E8C9A0'; g.beginPath(); g.arc(0, 0, r, 0, 7); g.fill();
    g.fillStyle = 'rgba(224,120,100,.4)'; if (o.cheeks !== false) { g.beginPath(); g.arc(-r * 0.58, r * 0.28, r * 0.17, 0, 7); g.arc(r * 0.58, r * 0.28, r * 0.17, 0, 7); g.fill(); }
    if (o.hair && o.style !== 'bald' && o.style !== 'long') { g.fillStyle = o.hair; g.beginPath(); g.arc(0, -r * 0.2, r + 1, Math.PI * 1.05, Math.PI * 1.95); g.quadraticCurveTo(r * 0.3, -r * 0.55, -r * 0.9, -r * 0.2); g.fill(); }
    if (o.style === 'long') { g.fillStyle = o.hair; g.beginPath(); g.arc(0, -r * 0.15, r + 2, Math.PI * 1.02, Math.PI * 1.98); g.lineTo(r * 0.4, -r * 0.35); g.quadraticCurveTo(0, -r * 0.7, -r * 0.7, -r * 0.2); g.fill(); }
    const ey = -r * 0.06, ex = r * 0.36, sq = o.mouth === 'o' ? 1.15 : 1;
    if (o.glasses === 'shades') { g.fillStyle = '#10161f'; rr(g, -ex - 21, ey - 15, 42, 28, 9); g.fill(); rr(g, ex - 21, ey - 15, 42, 28, 9); g.fill(); g.fillRect(-ex + 14, ey - 8, 2 * ex - 28, 5); g.fillStyle = 'rgba(255,255,255,.28)'; g.fillRect(-ex - 15, ey - 11, 12, 5); g.fillRect(ex - 15, ey - 11, 12, 5); }
    else { g.fillStyle = '#fff'; for (const q of [-1, 1]) { g.beginPath(); g.arc(q * ex, ey, 12 * sq, 0, 7); g.fill(); } g.fillStyle = INK; const lx = (o.look || 0) * 4; for (const q of [-1, 1]) { g.beginPath(); g.arc(q * ex + lx, ey + 1, 5.5, 0, 7); g.fill(); }
      if (o.glasses === 'round') { g.strokeStyle = INK; g.lineWidth = 4; for (const q of [-1, 1]) { g.beginPath(); g.arc(q * ex, ey, 17, 0, 7); g.stroke(); } g.beginPath(); g.moveTo(-ex + 17, ey); g.lineTo(ex - 17, ey); g.stroke(); } }
    g.strokeStyle = o.brow || '#4a3210'; g.lineWidth = 5; g.lineCap = 'round'; const bi = o.angry ? -4 : (o.worried ? 6 : 0);
    for (const q of [-1, 1]) { g.beginPath(); g.moveTo(q * (ex - 14), ey - 25 + bi); g.lineTo(q * (ex + 14), ey - 25 - bi); g.stroke(); }
    g.fillStyle = '#7a2b25'; g.strokeStyle = '#7a2b25'; g.lineWidth = 4; const my = r * 0.5;
    if (o.mouth === 'o') { g.beginPath(); g.ellipse(0, my, 9, 12, 0, 0, 7); g.fill(); } else if (o.mouth === 'smirk') { g.beginPath(); g.moveTo(-14, my + 3); g.quadraticCurveTo(4, my + 14, 22, my - 4); g.stroke(); } else if (o.mouth === 'flat') { g.beginPath(); g.moveTo(-14, my + 4); g.lineTo(14, my + 4); g.stroke(); } else { g.beginPath(); g.arc(0, my - 4, 15, 0.25, Math.PI - 0.25); g.stroke(); }
    if (o.stubble) { g.fillStyle = 'rgba(40,30,20,.22)'; g.beginPath(); g.arc(0, r * 0.3, r * 0.82, 0.15, Math.PI - 0.15); g.lineTo(-r * 0.7, r * 0.3); g.fill(); }
    if (o.hat === 'cap') { g.fillStyle = o.hatCol || '#3b4a63'; g.beginPath(); g.arc(0, -r * 0.18, r + 3, Math.PI * 1.02, Math.PI * 1.98); g.fill(); g.beginPath(); g.ellipse(r * 0.55, -r * 0.2, r * 0.7, 10, 0.06, 0, 7); g.fill(); g.fillStyle = 'rgba(255,255,255,.15)'; g.fillRect(-r, -r * 0.24, 2 * r, 6); }
    if (o.hat === 'fedora') { g.fillStyle = o.hatCol || '#3a2a25'; g.beginPath(); g.ellipse(0, -r * 0.42, r * 1.45, 15, 0, 0, 7); g.fill(); g.beginPath(); g.moveTo(-r * 0.8, -r * 0.42); g.quadraticCurveTo(-r * 0.8, -r * 1.3, 0, -r * 1.3); g.quadraticCurveTo(r * 0.8, -r * 1.3, r * 0.8, -r * 0.42); g.closePath(); g.fill(); g.fillStyle = '#E0281E'; g.fillRect(-r * 0.8, -r * 0.62, r * 1.6, 11); }
    if (o.hat === 'hard') { g.fillStyle = o.hatCol || '#F2B705'; g.beginPath(); g.arc(0, -r * 0.2, r + 3, Math.PI, 2 * Math.PI); g.fill(); g.fillRect(-r - 10, -r * 0.24, 2 * r + 20, 12); g.fillRect(-9, -r - 8, 18, 22); }
    if (o.hat === 'cowboy') { g.fillStyle = o.hatCol || '#7a4b24'; g.beginPath(); g.ellipse(0, -r * 0.4, r * 1.7, 15, 0, 0, 7); g.fill(); g.beginPath(); g.moveTo(-r * 0.85, -r * 0.4); g.quadraticCurveTo(-r * 0.9, -r * 1.35, 0, -r * 1.2); g.quadraticCurveTo(r * 0.9, -r * 1.35, r * 0.85, -r * 0.4); g.closePath(); g.fill(); }
    g.restore();
  };
  const body = (g, o) => { // shoulders + shirt + tie
    const by = o.by ?? 40, w = o.w ?? 128; g.save(); g.translate(0, by);
    g.fillStyle = o.suit || '#2c3e66'; g.beginPath(); g.moveTo(-w, 150); g.quadraticCurveTo(-w, -4, 0, -14); g.quadraticCurveTo(w, -4, w, 150); g.closePath(); g.fill(); g.fillStyle = 'rgba(0,0,0,.14)'; g.beginPath(); g.moveTo(0, -14); g.quadraticCurveTo(w, -4, w, 150); g.lineTo(0, 150); g.closePath(); g.fill();
    if (o.shirt !== null) { g.fillStyle = o.shirt || '#F5F3EE'; g.beginPath(); g.moveTo(-34, -12); g.lineTo(0, 56); g.lineTo(34, -12); g.closePath(); g.fill(); }
    if (o.tie) { g.fillStyle = o.tie; g.beginPath(); g.moveTo(-9, 2); g.lineTo(9, 2); g.lineTo(7, 60); g.lineTo(0, 72); g.lineTo(-7, 60); g.closePath(); g.fill(); }
    if (o.lanyard) { g.strokeStyle = o.lanyard; g.lineWidth = 6; g.beginPath(); g.moveTo(-30, -10); g.lineTo(-6, 70); g.moveTo(30, -10); g.lineTo(6, 70); g.stroke(); g.fillStyle = '#F5F3EE'; rr(g, -26, 66, 52, 38, 5); g.fill(); g.fillStyle = INK; g.fillRect(-18, 76, 36, 5); g.fillRect(-18, 86, 26, 4); }
    if (o.vest) { g.fillStyle = o.vest; g.beginPath(); g.moveTo(-w + 20, 150); g.quadraticCurveTo(-w + 14, 20, -34, -8); g.lineTo(-20, 150); g.closePath(); g.fill(); g.beginPath(); g.moveTo(w - 20, 150); g.quadraticCurveTo(w - 14, 20, 34, -8); g.lineTo(20, 150); g.closePath(); g.fill(); g.fillStyle = 'rgba(245,243,238,.8)'; g.fillRect(-w + 24, 70, 36, 8); g.fillRect(w - 60, 70, 36, 8); }
    g.restore();
  };
  CS.head = head; CS.body = body;
  const person = (hd, bd, extra) => (g, t, th, o) => { body(g, bd); head(g, { ...hd, ...(o.hd || {}) }); if (extra) extra(g, t, th, o); };
  // WHO[name] = {bg:[c1,c2], draw(g,t,th,o)}  — drawn centred at (0,0) in a 360x360 panel
  const W = CS.WHO;
  const note = (g, x, y, rot, s = 1, txtLines = ['PAY', 'OR', 'NEVER']) => { g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s); g.fillStyle = '#F5F3EE'; g.fillRect(-48, -58, 96, 116); g.fillStyle = 'rgba(0,0,0,.12)'; g.fillRect(-48, 40, 96, 18); g.fillStyle = INK; g.font = F.hero(22); g.textAlign = 'center'; g.textBaseline = 'middle'; txtLines.forEach((l, i) => g.fillText(l, 0, -30 + i * 30)); g.restore(); };
  W.middleman = { bg: ['#F7C948', '#E5A100'], draw: person({ hat: 'cap', hatCol: '#27374f', hair: '#4b3320', skin: '#E0B88F', mouth: 'smirk', stubble: true, look: -1 }, { suit: '#5b6b7d', shirt: '#cfd8e0', tie: null, vest: '#F2B705' }, (g) => note(g, 112, 120, 0.2, 1.1)) };
  W.thief = { bg: ['#8e1f1a', '#4a0f0d'], draw: (g, t, th) => { g.fillStyle = '#12090b'; g.beginPath(); g.moveTo(-135, 160); g.quadraticCurveTo(-135, 20, 0, 6); g.quadraticCurveTo(135, 20, 135, 160); g.closePath(); g.fill(); g.beginPath(); g.arc(0, -36, 66, 0, 7); g.fill(); g.fillStyle = '#12090b'; g.beginPath(); g.ellipse(0, -76, 112, 17, 0, 0, 7); g.fill(); g.beginPath(); g.moveTo(-64, -76); g.quadraticCurveTo(-64, -150, 0, -150); g.quadraticCurveTo(64, -150, 64, -76); g.closePath(); g.fill(); g.fillStyle = '#E0281E'; g.fillRect(-64, -96, 128, 12);
    g.save(); g.translate(0, -26 + 3 * Math.sin(t * 3)); g.font = F.hero(104); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = '#F2B705'; g.fillText('?', 0, 0); g.restore(); } };
  W.banker = { bg: ['#56a7c9', '#2b6f93'], draw: person({ hair: '#3a2a1a', style: 'short', skin: '#E8C9A0', mouth: 'smirk', hat: 'cowboy', hatCol: '#7a4b24' }, { suit: '#1d2c4d', shirt: '#F5F3EE', tie: '#E0281E' }) };
  W.you = { bg: ['#6fd0a6', '#2f9a74'], draw: person({ hair: '#5a3a22', style: 'short', skin: '#E8C9A0', mouth: 'smile' }, { suit: '#e28a2b', shirt: '#F5F3EE', tie: null, lanyard: '#2c3e66' }) };
  W.youPhone = { bg: ['#6fd0a6', '#2f9a74'], draw: (g, t, th, o) => { person({ hair: '#5a3a22', style: 'short', skin: '#E8C9A0', mouth: 'o' }, { suit: '#e28a2b', shirt: '#F5F3EE', tie: null, lanyard: '#2c3e66' })(g, t, th, o); g.save(); g.translate(112, 92); g.rotate(0.14); CS.ICON.phone(g, 0.95); g.restore(); } };
  W.youWorry = { bg: ['#6fd0a6', '#2f9a74'], draw: person({ hair: '#5a3a22', style: 'short', skin: '#E8C9A0', mouth: 'o', worried: true }, { suit: '#e28a2b', shirt: '#F5F3EE', tie: null, lanyard: '#2c3e66' }) };
  W.walker = { bg: ['#9ad66a', '#5fa83c'], draw: person({ hair: '#6a4a2a', style: 'short', skin: '#E8C9A0', mouth: 'smile', hat: 'cap', hatCol: '#a44a3a' }, { suit: '#6e8f4e', shirt: '#F5F3EE', tie: null }, (g) => { g.strokeStyle = '#E0281E'; g.lineWidth = 6; g.beginPath(); g.moveTo(-100, 150); g.quadraticCurveTo(-130, 110, -118, 60); g.stroke(); }) };
  W.server = { bg: ['#f2a65a', '#d9772b'], draw: person({ hair: '#2a1d15', style: 'long', skin: '#D9A87A', mouth: 'smile' }, { suit: '#F5F3EE', shirt: '#2a1d15', tie: null, vest: '#2c3e66' }) };
  W.police = { bg: ['#7fa6e8', '#3f6bc4'], draw: person({ hair: '#3a2a1a', style: 'short', skin: '#E0B88F', mouth: 'flat', hat: 'cap', hatCol: '#1d2c4d' }, { suit: '#2a4a8f', shirt: '#cfe0f5', tie: '#10161f' }, (g) => { g.fillStyle = '#F2B705'; g.beginPath(); g.moveTo(-64, 96); g.lineTo(-44, 86); g.lineTo(-24, 96); g.lineTo(-30, 126); g.lineTo(-44, 134); g.lineTo(-58, 126); g.closePath(); g.fill(); }) };
  W.exec = { bg: ['#7a5ccf', '#432a8c'], draw: person({ hair: '#b9b3a9', style: 'short', skin: '#E8C9A0', mouth: 'flat', glasses: 'round' }, { suit: '#2b2d3f', shirt: '#F5F3EE', tie: '#E0281E', lanyard: '#59606B' }, (g) => { g.save(); g.translate(104, 108); g.rotate(0.12); g.fillStyle = '#6b4423'; rr(g, -42, -52, 84, 104, 6); g.fill(); g.fillStyle = '#F5F3EE'; g.fillRect(-34, -40, 68, 86); g.strokeStyle = '#E0281E'; g.lineWidth = 5; g.beginPath(); g.moveTo(-26, 30); g.lineTo(-10, 4); g.lineTo(6, 16); g.lineTo(26, -26); g.stroke(); g.restore(); }) };
  W.worker = { bg: ['#a0b4c9', '#6a86a6'], draw: person({ hair: '#3a2a1a', style: 'short', skin: '#C99E78', mouth: 'o', worried: true }, { suit: '#7b8794', shirt: '#F5F3EE', tie: null, lanyard: '#2c3e66' }) };
  W.swindler = { bg: ['#b8323a', '#6d1a2a'], draw: person({ hair: '#16100c', style: 'short', skin: '#DDB28A', mouth: 'smirk', glasses: 'shades', stubble: true }, { suit: '#16213d', shirt: '#F5F3EE', tie: null }, (g, t) => { g.fillStyle = '#F2B705'; g.beginPath(); g.arc(-96, 132, 20, 0, 7); g.fill(); g.strokeStyle = '#7a5806'; g.lineWidth = 4; g.stroke(); g.save(); g.translate(112, 112); g.rotate(0.14); g.fillStyle = '#10161f'; rr(g, -26, -50, 52, 100, 9); g.fill(); g.fillStyle = '#F5F3EE'; for (let i = 0; i < 3; i++) { rr(g, -19 + (i % 2) * 10, -38 + i * 24, 28, 17, 6); g.fill(); } g.restore(); }) };
  W.woman = tone => ({ bg: tone, draw: person({ hair: '#5a3524', style: 'long', skin: '#E8C9A0', mouth: 'smile' }, { suit: '#ce5d86', shirt: '#F5F3EE', tie: null }) });
  W.womanA = { bg: ['#f5a3c0', '#d0587f'], draw: person({ hair: '#5a3524', style: 'long', skin: '#E8C9A0', mouth: 'smile' }, { suit: '#8e2a54', shirt: '#F5F3EE', tie: null }) };
  W.womanB = { bg: ['#9fd3f5', '#4f94c9'], draw: person({ hair: '#2a1d15', style: 'long', skin: '#D2A276', mouth: 'smile' }, { suit: '#2b5b8a', shirt: '#F5F3EE', tie: null }) };
  W.womanC = { bg: ['#c9b6f5', '#8062c9'], draw: person({ hair: '#8a5a2a', style: 'long', skin: '#F0D2B0', mouth: 'smile' }, { suit: '#5b3d9e', shirt: '#F5F3EE', tie: null }) };
  W.dog = { bg: ['#c8e58a', '#7fb842'], draw: (g, t, th, o) => { const sn = o.sniff ? 1 : 0, bob = Math.sin(t * 6) * 4 * sn; g.save(); g.translate(0, 30);
    g.fillStyle = '#c98f4d'; g.beginPath(); g.ellipse(40, 70, 118, 70, 0, 0, 7); g.fill(); g.fillStyle = '#F5F3EE'; g.beginPath(); g.ellipse(100, 92, 48, 46, 0, 0, 7); g.fill();
    g.strokeStyle = '#c98f4d'; g.lineWidth = 22; g.lineCap = 'round'; g.beginPath(); g.moveTo(-70, 40); g.quadraticCurveTo(-120, -10 + Math.sin(t * 9) * 12, -110, -44); g.stroke();
    g.fillStyle = '#c98f4d'; g.beginPath(); g.ellipse(-20, 132, 17, 30, 0, 0, 7); g.ellipse(112, 136, 17, 30, 0, 0, 7); g.fill();
    g.translate(110, -26 + bob); g.rotate(sn ? 0.5 : 0); g.fillStyle = '#c98f4d'; g.beginPath(); g.arc(0, 0, 66, 0, 7); g.fill(); g.fillStyle = '#F5F3EE'; g.beginPath(); g.ellipse(34, 26, 46, 38, 0.3, 0, 7); g.fill(); g.fillStyle = '#8a5a2b'; g.beginPath(); g.ellipse(-44, 8, 24, 52, 0.25, 0, 7); g.fill();
    g.fillStyle = INK; g.beginPath(); g.ellipse(68, 20, 17, 13, 0.3, 0, 7); g.fill(); g.fillStyle = '#fff'; g.beginPath(); g.arc(14, -14, 13, 0, 7); g.fill(); g.fillStyle = INK; g.beginPath(); g.arc(18, -12, 6.5, 0, 7); g.fill(); g.strokeStyle = '#5a3f08'; g.lineWidth = 5; g.beginPath(); g.moveTo(0, -34); g.lineTo(28, -30); g.stroke(); g.restore(); } };
  W.bank = { bg: ['#d9d2c2', '#9d957f'], draw: (g, t, th, o) => { g.fillStyle = '#F5F3EE'; g.beginPath(); g.moveTo(-140, -40); g.lineTo(0, -140); g.lineTo(140, -40); g.closePath(); g.fill(); g.strokeStyle = '#59606B'; g.lineWidth = 5; g.stroke(); g.fillStyle = '#F5F3EE'; g.fillRect(-140, -40, 280, 24); for (let i = 0; i < 5; i++) { g.fillStyle = '#e9e3d3'; g.fillRect(-122 + i * 56, -14, 30, 140); g.fillStyle = 'rgba(0,0,0,.12)'; g.fillRect(-100 + i * 56 - 8, -14, 8, 140); } g.fillStyle = '#c9c1ac'; g.fillRect(-150, 126, 300, 22); g.fillRect(-160, 148, 320, 18);
    g.save(); g.translate(0, -78); g.fillStyle = '#E0281E'; rr(g, -88, -22, 176, 44, 6); g.fill(); txt(g, 'QUOTA', 0, 1, F.hero(32), '#F5F3EE'); g.restore(); } };
  CS.whoNames = () => Object.keys(W);

  // ---------------------------------------------------------------- icons (centre origin, ~120 box, scale s)
  const I = CS.ICON;
  I.phone = (g, s, lt) => { g.save(); g.scale(s, s); g.fillStyle = '#10161f'; rr(g, -42, -78, 84, 156, 14); g.fill(); g.fillStyle = '#26324a'; rr(g, -35, -68, 70, 136, 8); g.fill(); g.fillStyle = '#2c3e66'; g.fillRect(-35, -68, 70, 136); g.fillStyle = '#6f86b8'; g.beginPath(); g.arc(0, -10, 22, 0, 7); g.fill(); g.fillStyle = 'rgba(255,255,255,.25)'; g.fillRect(-35, -68, 20, 136); g.fillStyle = '#10161f'; rr(g, -14, -76, 28, 6, 3); g.fill(); g.restore(); };
  I.bill = (g, s) => { g.save(); g.scale(s, s); clay(g, -62, -32, 124, 64, 7, '#1FA366', { shadowK: 0.4 }); g.strokeStyle = 'rgba(245,243,238,.75)'; g.lineWidth = 3; rr(g, -54, -25, 108, 50, 5); g.stroke(); g.fillStyle = 'rgba(245,243,238,.9)'; g.beginPath(); g.arc(0, 0, 17, 0, 7); g.fill(); txt(g, '$', 0, 2, F.hero(24), '#188a56'); g.restore(); };
  I.stack = (g, s, lt, o) => { const n = o.n || 5; g.save(); g.scale(s, s); for (let i = 0; i < n; i++) { g.save(); g.translate((i % 2 ? 4 : -4), 40 - i * 17); clay(g, -62, -22, 124, 40, 6, i % 2 ? '#1FA366' : '#188a56', { shadowK: 0.2 }); g.fillStyle = 'rgba(245,243,238,.8)'; g.fillRect(-9, -22, 18, 40); g.restore(); } g.restore(); };
  I.coin = (g, s) => { g.save(); g.scale(s, s); const lg = g.createRadialGradient(-12, -14, 4, 0, 0, 52); lg.addColorStop(0, '#ffe27a'); lg.addColorStop(1, '#F2B705'); g.fillStyle = lg; g.beginPath(); g.arc(0, 0, 50, 0, 7); g.fill(); g.strokeStyle = '#a97e04'; g.lineWidth = 5; g.stroke(); g.beginPath(); g.arc(0, 0, 36, 0, 7); g.stroke(); txt(g, '$', 0, 3, F.hero(48), '#a97e04'); g.restore(); };
  I.clock = (g, s, lt, o) => { g.save(); g.scale(s, s); g.fillStyle = '#F5F3EE'; g.strokeStyle = INK; g.lineWidth = 7; g.beginPath(); g.arc(0, 0, 58, 0, 7); g.fill(); g.stroke(); for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; g.beginPath(); g.moveTo(Math.sin(a) * 46, -Math.cos(a) * 46); g.lineTo(Math.sin(a) * 54, -Math.cos(a) * 54); g.lineWidth = 3; g.stroke(); } const a1 = (o.t || 0) * 2.4, a2 = a1 / 12; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.moveTo(0, 0); g.lineTo(Math.sin(a1) * 44, -Math.cos(a1) * 44); g.stroke(); g.lineWidth = 8; g.beginPath(); g.moveTo(0, 0); g.lineTo(Math.sin(a2) * 28, -Math.cos(a2) * 28); g.stroke(); g.fillStyle = '#E0281E'; g.beginPath(); g.arc(0, 0, 6, 0, 7); g.fill(); g.restore(); };
  I.calendar = (g, s, lt, o) => { g.save(); g.scale(s, s); g.fillStyle = '#F5F3EE'; rr(g, -58, -62, 116, 124, 10); g.fill(); g.strokeStyle = INK; g.lineWidth = 4; g.stroke(); g.fillStyle = '#E0281E'; g.fillRect(-58, -62, 116, 28); g.fillStyle = '#F5F3EE'; for (const q of [-30, 30]) g.fillRect(q - 3, -72, 6, 18); txt(g, o.mon || 'MAR', 0, -47, F.hero(22), '#F5F3EE'); if (o.day !== '') txt(g, o.day || '20', 0, 14, F.hero(62), INK); else { g.fillStyle = '#E0281E'; g.beginPath(); g.arc(0, 12, 20, 0, 7); g.fill(); } g.restore(); };
  I.house = (g, s) => { g.save(); g.scale(s, s); g.fillStyle = '#E0281E'; g.beginPath(); g.moveTo(-70, -8); g.lineTo(0, -64); g.lineTo(70, -8); g.closePath(); g.fill(); g.fillStyle = '#F5F3EE'; g.fillRect(-52, -8, 104, 66); g.fillStyle = '#6b4423'; g.fillRect(-12, 16, 26, 42); g.fillStyle = '#6fa8dc'; g.fillRect(-44, 4, 24, 22); g.fillRect(26, 4, 24, 22); g.fillStyle = '#9a8f7c'; g.fillRect(34, -52, 16, 30); g.restore(); };
  I.key = (g, s) => { g.save(); g.scale(s, s); g.rotate(-0.5); g.fillStyle = '#F2B705'; g.beginPath(); g.arc(-34, 0, 26, 0, 7); g.fill(); g.fillStyle = '#a97e04'; g.beginPath(); g.arc(-34, 0, 11, 0, 7); g.fill(); g.fillStyle = '#F2B705'; g.fillRect(-10, -8, 76, 16); g.fillRect(40, 8, 12, 20); g.fillRect(24, 8, 10, 14); g.restore(); };
  I.car = (g, s) => { g.save(); g.scale(s, s); g.fillStyle = '#E0281E'; rr(g, -78, -8, 156, 44, 14); g.fill(); g.beginPath(); g.moveTo(-46, -8); g.lineTo(-28, -42); g.lineTo(30, -42); g.lineTo(54, -8); g.closePath(); g.fill(); g.fillStyle = '#9fd3f5'; g.beginPath(); g.moveTo(-36, -10); g.lineTo(-22, -34); g.lineTo(-2, -34); g.lineTo(-2, -10); g.closePath(); g.fill(); g.beginPath(); g.moveTo(6, -10); g.lineTo(6, -34); g.lineTo(26, -34); g.lineTo(44, -10); g.closePath(); g.fill(); g.fillStyle = '#10161f'; for (const q of [-46, 46]) { g.beginPath(); g.arc(q, 36, 19, 0, 7); g.fill(); g.fillStyle = '#9aa3b0'; g.beginPath(); g.arc(q, 36, 8, 0, 7); g.fill(); g.fillStyle = '#10161f'; } g.restore(); };
  I.glasscase = (g, s, lt, o) => { g.save(); g.scale(s, s); g.fillStyle = '#6b4423'; rr(g, -92, 56, 184, 24, 5); g.fill(); g.fillStyle = 'rgba(159,211,245,.28)'; rr(g, -86, -78, 172, 138, 8); g.fill(); g.strokeStyle = 'rgba(245,243,238,.8)'; g.lineWidth = 5; rr(g, -86, -78, 172, 138, 8); g.stroke(); g.fillStyle = 'rgba(255,255,255,.22)'; g.beginPath(); g.moveTo(-74, -70); g.lineTo(-40, -70); g.lineTo(-74, -10); g.closePath(); g.fill();
    if (!o.empty) { g.save(); g.translate(0, 10); I.trophy(g, 0.62, lt, o); g.restore(); } else { g.fillStyle = 'rgba(11,15,20,.28)'; g.beginPath(); g.ellipse(0, 52, 44, 8, 0, 0, 7); g.fill(); g.save(); g.translate(0, 8); g.globalAlpha *= 0.55; g.setLineDash([7, 6]); g.strokeStyle = '#F5F3EE'; g.lineWidth = 4; g.scale(0.62, 0.62); g.beginPath(); g.moveTo(-34, -60); g.quadraticCurveTo(-34, 20, -8, 24); g.lineTo(-10, 60); g.lineTo(-30, 60); g.lineTo(-30, 76); g.lineTo(30, 76); g.lineTo(30, 60); g.lineTo(10, 60); g.lineTo(8, 24); g.quadraticCurveTo(34, 20, 34, -60); g.closePath(); g.stroke(); g.restore(); } g.restore(); };
  I.trophy = (g, s) => { g.save(); g.scale(s, s); const lg = g.createLinearGradient(-50, 0, 50, 0); lg.addColorStop(0, '#ffe27a'); lg.addColorStop(0.5, '#F2B705'); lg.addColorStop(1, '#b88700'); g.fillStyle = lg; g.beginPath(); g.moveTo(-34, -60); g.quadraticCurveTo(-34, 20, -8, 24); g.lineTo(-10, 60); g.lineTo(-30, 60); g.lineTo(-30, 76); g.lineTo(30, 76); g.lineTo(30, 60); g.lineTo(10, 60); g.lineTo(8, 24); g.quadraticCurveTo(34, 20, 34, -60); g.closePath(); g.fill(); g.strokeStyle = '#a97e04'; g.lineWidth = 3; g.stroke(); g.strokeStyle = '#d9a406'; g.lineWidth = 8; g.beginPath(); g.arc(-40, -34, 20, Math.PI * 0.5, Math.PI * 1.5); g.stroke(); g.beginPath(); g.arc(40, -34, 20, -Math.PI * 0.5, Math.PI * 0.5); g.stroke(); g.fillStyle = '#7a5806'; g.fillRect(-26, 66, 52, 10); g.restore(); };
  I.medal = (g, s) => { g.save(); g.scale(s, s); g.fillStyle = '#E0281E'; g.beginPath(); g.moveTo(-26, -70); g.lineTo(0, -10); g.lineTo(26, -70); g.lineTo(10, -70); g.lineTo(0, -48); g.lineTo(-10, -70); g.closePath(); g.fill(); g.fillStyle = '#2c3e66'; g.beginPath(); g.moveTo(-26, -70); g.lineTo(-6, -30); g.lineTo(6, -30); g.lineTo(26, -70); g.lineTo(14, -70); g.lineTo(0, -44); g.lineTo(-14, -70); g.closePath(); g.fill(); I.coin(g, 0.52); g.restore(); };
  I.ransom = (g, s, lt, o) => { g.save(); g.scale(s, s); g.rotate(-0.05); g.fillStyle = '#F5F3EE'; g.fillRect(-90, -66, 180, 132); g.fillStyle = 'rgba(0,0,0,.1)'; g.fillRect(-90, 50, 180, 16);
    const L = o.lines || ['PAY US', 'OR NEVER', 'SEE IT AGAIN']; const n = Math.floor(clamp(lt / 0.2) * L.length * 1.0 + 0.001); L.forEach((l, i) => { if (i >= Math.max(1, n)) return; [...l].forEach((ch, k) => { const w = 18; const sp = Math.min(15.5, 150 / l.length); g.save(); g.translate(-72 + k * sp + (150 - sp * l.length) / 2 + 6, -34 + i * 36); g.fillStyle = ['#F5F3EE', '#E0281E', '#2c3e66', '#F2B705'][(k + i) % 4]; g.fillRect(-8, -14, 17, 26); g.fillStyle = (k + i) % 4 === 0 ? INK : '#F5F3EE'; g.font = '800 ' + (18 + (k % 3) * 2) + 'px Inter'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(ch, 0, 0); g.restore(); }); }); g.restore(); };
  I.lining = (g, s) => { g.save(); g.scale(s, s); g.fillStyle = '#c9a227'; g.beginPath(); g.moveTo(-60, -30); g.lineTo(-14, -52); g.lineTo(30, -34); g.lineTo(58, -10); g.lineTo(40, 30); g.lineTo(6, 46); g.lineTo(-30, 36); g.lineTo(-56, 14); g.closePath(); g.fill(); g.strokeStyle = '#7a5806'; g.lineWidth = 4; g.setLineDash([8, 6]); g.stroke(); g.setLineDash([]); g.fillStyle = 'rgba(255,255,255,.25)'; g.beginPath(); g.moveTo(-50, -26); g.lineTo(-10, -44); g.lineTo(-18, -4); g.closePath(); g.fill(); g.restore(); };
  I.bundle = (g, s, lt, o) => { g.save(); g.scale(s, s); g.fillStyle = '#e7e0cd'; rr(g, -62, -42, 124, 90, 8); g.fill(); g.strokeStyle = '#9a8f7c'; g.lineWidth = 3; g.stroke(); g.fillStyle = '#59606B'; for (let i = 0; i < 5; i++) g.fillRect(-48, -28 + i * 14, i % 2 ? 80 : 96, 5); g.fillStyle = INK; g.fillRect(-48, -34, 50, 10); g.strokeStyle = '#8a5a2b'; g.lineWidth = 5; g.beginPath(); g.moveTo(-62, 2); g.lineTo(62, 2); g.moveTo(0, -42); g.lineTo(0, 48); g.stroke(); g.restore(); };
  I.hedge = (g, s) => { g.save(); g.scale(s, s); g.fillStyle = '#2f7d3a'; for (let i = 0; i < 7; i++) { g.beginPath(); g.arc(-90 + i * 30, 10 + (i % 2) * -10, 34, 0, 7); g.fill(); } g.fillStyle = '#3f9a4c'; for (let i = 0; i < 6; i++) { g.beginPath(); g.arc(-75 + i * 30, -8 + (i % 2) * 8, 22, 0, 7); g.fill(); } g.fillStyle = '#245f2d'; g.fillRect(-110, 34, 220, 16); g.restore(); };
  I.cuffs = (g, s) => { g.save(); g.scale(s, s); B.crimeIcon(g, 'cuffs', 140, B.theme); g.restore(); };
  I.gavel = (g, s) => { g.save(); g.scale(s, s); B.crimeIcon(g, 'gavel', 140, B.theme); g.restore(); };
  I.tape = (g, s, lt, o) => { g.save(); g.scale(s, s); for (let i = 0; i < 3; i++) { g.save(); g.rotate(-0.3 + i * 0.3); g.fillStyle = '#F2B705'; g.fillRect(-110, -14 + i * 4, 220, 28); g.fillStyle = INK; for (let k = -6; k < 6; k++) { g.beginPath(); g.moveTo(k * 20, -14 + i * 4); g.lineTo(k * 20 + 14, -14 + i * 4); g.lineTo(k * 20 + 4, 14 + i * 4); g.lineTo(k * 20 - 10, 14 + i * 4); g.closePath(); g.fill(); } g.restore(); } g.restore(); };
  I.scale = (g, s) => { g.save(); g.scale(s, s); g.strokeStyle = '#59606B'; g.lineWidth = 8; g.beginPath(); g.moveTo(0, -60); g.lineTo(0, 54); g.moveTo(-60, -40); g.lineTo(60, -40); g.stroke(); g.fillStyle = '#F2B705'; g.fillRect(-26, 54, 52, 10); for (const q of [-60, 60]) { g.beginPath(); g.moveTo(q, -40); g.lineTo(q - 24, 4); g.lineTo(q + 24, 4); g.closePath(); g.stroke(); g.fillStyle = '#F5F3EE'; g.beginPath(); g.ellipse(q, 6, 28, 8, 0, 0, 7); g.fill(); } g.restore(); };
  I.jury = (g, s) => { g.save(); g.scale(s, s); for (let i = 0; i < 6; i++) { const x = -90 + (i % 3) * 90, y = -34 + Math.floor(i / 3) * 74; g.fillStyle = ['#6fa8dc', '#e28a2b', '#8062c9', '#2f9a74', '#d0587f', '#c9a227'][i]; g.beginPath(); g.moveTo(x - 26, y + 36); g.quadraticCurveTo(x - 26, y, x, y - 2); g.quadraticCurveTo(x + 26, y, x + 26, y + 36); g.closePath(); g.fill(); g.fillStyle = '#E8C9A0'; g.beginPath(); g.arc(x, y - 18, 17, 0, 7); g.fill(); } g.restore(); };
  I.lock = (g, s) => { g.save(); g.scale(s, s); g.strokeStyle = '#59606B'; g.lineWidth = 14; g.beginPath(); g.arc(0, -22, 28, Math.PI, 0); g.stroke(); g.fillStyle = '#F2B705'; rr(g, -44, -22, 88, 70, 10); g.fill(); g.fillStyle = '#7a5806'; g.beginPath(); g.arc(0, 8, 9, 0, 7); g.fill(); g.fillRect(-4, 8, 8, 24); g.restore(); };
  I.piggy = (g, s) => { g.save(); g.scale(s, s); g.fillStyle = '#f2a0b8'; g.beginPath(); g.ellipse(0, 6, 62, 46, 0, 0, 7); g.fill(); g.beginPath(); g.ellipse(58, 10, 18, 22, 0, 0, 7); g.fill(); g.fillStyle = '#d9788f'; g.beginPath(); g.ellipse(70, 10, 6, 10, 0, 0, 7); g.fill(); g.fillStyle = '#f2a0b8'; g.beginPath(); g.moveTo(24, -36); g.lineTo(36, -62); g.lineTo(50, -32); g.closePath(); g.fill(); g.fillRect(-36, 40, 16, 26); g.fillRect(14, 40, 16, 26); g.fillStyle = INK; g.fillRect(-12, -42, 36, 7); g.beginPath(); g.arc(40, -6, 5, 0, 7); g.fill(); g.restore(); };
  I.cert = (g, s) => { g.save(); g.scale(s, s); g.fillStyle = '#F5F3EE'; rr(g, -66, -50, 132, 100, 6); g.fill(); g.strokeStyle = '#B88700'; g.lineWidth = 5; rr(g, -58, -42, 116, 84, 4); g.stroke(); g.fillStyle = '#2c3e66'; g.fillRect(-44, -26, 88, 8); g.fillStyle = '#9aa3b0'; g.fillRect(-44, -8, 70, 5); g.fillRect(-44, 4, 56, 5); g.fillStyle = '#E0281E'; g.beginPath(); g.arc(34, 26, 14, 0, 7); g.fill(); g.restore(); };
  I.balloon = (g, s, lt, o) => { g.save(); g.scale(s, s); const k = o.k ?? 1; g.fillStyle = '#E0281E'; g.beginPath(); g.ellipse(0, -10, 44 * k, 54 * k, 0, 0, 7); g.fill(); g.fillStyle = 'rgba(255,255,255,.3)'; g.beginPath(); g.ellipse(-14 * k, -26 * k, 10 * k, 16 * k, -0.4, 0, 7); g.fill(); g.strokeStyle = '#59606B'; g.lineWidth = 3; g.beginPath(); g.moveTo(0, 44 * k - 10); g.quadraticCurveTo(10, 70, -4, 96); g.stroke(); g.restore(); };
  I.island = (g, s) => { g.save(); g.scale(s, s); g.fillStyle = '#4fb3e8'; g.fillRect(-100, 10, 200, 60); g.fillStyle = '#f2d28b'; g.beginPath(); g.ellipse(0, 18, 80, 26, 0, Math.PI, 0); g.fill(); g.strokeStyle = '#6b4423'; g.lineWidth = 8; g.beginPath(); g.moveTo(14, 12); g.quadraticCurveTo(24, -26, 10, -52); g.stroke(); g.fillStyle = '#2f7d3a'; for (const a of [-2.6, -1.9, -1.2, -0.5]) { g.save(); g.translate(10, -52); g.rotate(a); g.beginPath(); g.ellipse(26, 0, 30, 9, 0, 0, 7); g.fill(); g.restore(); } g.restore(); };
  I.skyscraper = (g, s) => { g.save(); g.scale(s, s); [[-70, 70, 40], [-24, 130, 44], [24, 100, 40], [68, 56, 36]].forEach(([x, h, w], i) => { g.fillStyle = ['#59606B', '#6f86b8', '#4a5568', '#7a8aa6'][i]; g.fillRect(x - w / 2, 56 - h, w, h); g.fillStyle = 'rgba(245,243,238,.55)'; for (let r = 0; r < h / 20 - 1; r++) for (let c = 0; c < 2; c++) g.fillRect(x - w / 2 + 8 + c * 16, 56 - h + 10 + r * 20, 8, 10); }); g.fillStyle = '#10161f'; g.fillRect(-100, 56, 200, 8); g.restore(); };
  I.envelope = (g, s) => { g.save(); g.scale(s, s); g.fillStyle = '#F5F3EE'; rr(g, -62, -42, 124, 84, 6); g.fill(); g.strokeStyle = '#9aa3b0'; g.lineWidth = 3; rr(g, -62, -42, 124, 84, 6); g.stroke(); g.beginPath(); g.moveTo(-62, -42); g.lineTo(0, 8); g.lineTo(62, -42); g.stroke(); g.fillStyle = '#E0281E'; g.beginPath(); g.arc(0, 8, 9, 0, 7); g.fill(); g.restore(); };
  I.receipt = (g, s, lt, o) => { g.save(); g.scale(s, s); g.fillStyle = '#FBFAF4'; g.beginPath(); g.moveTo(-50, -70); g.lineTo(50, -70); g.lineTo(50, 70); for (let i = 0; i < 8; i++) { g.lineTo(50 - (i + 0.5) * 12.5, i % 2 ? 70 : 82); } g.lineTo(-50, 70); g.closePath(); g.fill(); g.strokeStyle = '#c9c4b4'; g.lineWidth = 2; g.stroke(); g.fillStyle = '#59606B'; for (let i = 0; i < 4; i++) { g.fillRect(-36, -50 + i * 16, 50 - i * 6, 5); g.fillRect(24, -50 + i * 16, 14, 5); } g.fillStyle = INK; g.fillRect(-36, 20, 72, 3); g.fillStyle = '#E0281E'; g.fillRect(-36, 34, 72, 24); txt(g, o.tipLabel || 'TIP', 0, 47, F.hero(18), '#F5F3EE'); g.restore(); };
  I.plate = (g, s) => { g.save(); g.scale(s, s); g.fillStyle = '#F5F3EE'; g.beginPath(); g.ellipse(0, 6, 64, 30, 0, 0, 7); g.fill(); g.strokeStyle = '#c9c4b4'; g.lineWidth = 4; g.stroke(); g.fillStyle = '#e8e4d8'; g.beginPath(); g.ellipse(0, 4, 40, 17, 0, 0, 7); g.fill(); g.fillStyle = '#c98f4d'; g.beginPath(); g.ellipse(-6, -4, 24, 14, 0, 0, 7); g.fill(); g.fillStyle = '#5fa83c'; g.beginPath(); g.ellipse(14, 0, 12, 8, 0, 0, 7); g.fill(); g.restore(); };
  I.chat = (g, s, lt, o) => { g.save(); g.scale(s, s); g.fillStyle = '#10161f'; rr(g, -60, -92, 120, 184, 18); g.fill(); g.fillStyle = '#F5F3EE'; rr(g, -52, -78, 104, 156, 8); g.fill(); const M = [[-1, '#d0587f', 'HEY'], [1, '#2c3e66', 'MY JET'], [-1, '#d0587f', 'WOW'], [1, '#2c3e66', 'SEND $']]; M.forEach(([sd, col, tx], i) => { const on = clamp((lt - i * 0.35) / 0.2); if (on <= 0) return; g.save(); g.globalAlpha = on; g.fillStyle = col; rr(g, sd < 0 ? -46 : 4, -66 + i * 36, 42, 26, 9); g.fill(); txt(g, tx, sd < 0 ? -25 : 25, -53 + i * 36, F.cap(11), '#F5F3EE'); g.restore(); }); g.fillStyle = '#E0281E'; g.beginPath(); g.moveTo(0, 66); g.bezierCurveTo(-24, 50, -16, 36, 0, 46); g.bezierCurveTo(16, 36, 24, 50, 0, 66); g.fill(); g.restore(); };
  I.jet = (g, s) => { g.save(); g.scale(s, s); g.rotate(-0.12); g.fillStyle = '#F5F3EE'; g.beginPath(); g.moveTo(-90, 0); g.quadraticCurveTo(-80, -26, -20, -24); g.lineTo(80, -18); g.quadraticCurveTo(110, -8, 80, 8); g.lineTo(-40, 14); g.quadraticCurveTo(-80, 16, -90, 0); g.closePath(); g.fill(); g.strokeStyle = '#59606B'; g.lineWidth = 3; g.stroke(); g.fillStyle = '#9fd3f5'; for (let i = 0; i < 6; i++) g.fillRect(-14 + i * 14, -14, 9, 8); g.fillStyle = '#2c3e66'; g.beginPath(); g.moveTo(-70, -10); g.lineTo(-96, -50); g.lineTo(-58, -14); g.closePath(); g.fill(); g.beginPath(); g.moveTo(-6, 6); g.lineTo(-44, 52); g.lineTo(30, 6); g.closePath(); g.fill(); g.restore(); };
  I.jar = (g, s, lt, o) => { g.save(); g.scale(s, s); g.fillStyle = 'rgba(159,211,245,.3)'; rr(g, -48, -52, 96, 112, 18); g.fill(); g.strokeStyle = 'rgba(245,243,238,.8)'; g.lineWidth = 5; rr(g, -48, -52, 96, 112, 18); g.stroke(); g.fillStyle = '#b88700'; rr(g, -40, -72, 80, 22, 6); g.fill(); const n = o.n ?? 6; for (let i = 0; i < n; i++) { g.save(); g.translate(-22 + (i % 3) * 22, 44 - Math.floor(i / 3) * 16); g.rotate((hash(i) - 0.5) * 0.5); clay(g, -20, -8, 40, 16, 4, '#1FA366', { shadowK: 0.1 }); g.restore(); } g.restore(); };
  I.tree = (g, s, lt, o) => { const k = o.k ?? 1; g.save(); g.scale(s, s); g.fillStyle = '#6b4423'; g.fillRect(-9, 4, 18, 62); g.fillStyle = '#2f9a4c'; for (const [x, y, r] of [[-30, -10, 34 * k], [30, -10, 34 * k], [0, -36, 40 * k], [0, 4, 36 * k]]) { g.beginPath(); g.arc(x * k, y * k, r, 0, 7); g.fill(); } g.fillStyle = '#F2B705'; for (const [x, y] of [[-24, -14], [20, -34], [30, 0], [-4, -4]]) { g.beginPath(); g.arc(x * k, y * k, 7, 0, 7); g.fill(); } g.fillStyle = '#7a4b24'; g.fillRect(-38, 66, 76, 10); g.restore(); };
  I.snowball = (g, s, lt, o) => { const k = o.k ?? 1; g.save(); g.scale(s, s); const r = 24 + 38 * k; const lg = g.createRadialGradient(-r * 0.3, -r * 0.3, 2, 0, 0, r); lg.addColorStop(0, '#fff'); lg.addColorStop(1, '#bcd7ee'); g.fillStyle = lg; g.beginPath(); g.arc(0, 56 - r, r, 0, 7); g.fill(); g.fillStyle = '#10161f33'; g.beginPath(); g.ellipse(0, 60, r * 0.9, 6, 0, 0, 7); g.fill(); g.restore(); };
  I.mailbox = (g, s) => { g.save(); g.scale(s, s); g.fillStyle = '#6b4423'; g.fillRect(-6, 0, 12, 70); g.fillStyle = '#2c3e66'; rr(g, -50, -44, 100, 56, 28); g.fill(); g.fillStyle = '#10161f'; g.fillRect(-30, -4, 56, 6); g.fillStyle = '#E0281E'; g.fillRect(40, -66, 8, 36); g.fillRect(40, -66, 24, 12); g.restore(); };
  I.speech = (g, s, lt, o) => { g.save(); g.scale(s, s); g.fillStyle = '#F5F3EE'; rr(g, -70, -44, 140, 78, 18); g.fill(); g.beginPath(); g.moveTo(-20, 30); g.lineTo(-34, 58); g.lineTo(8, 32); g.closePath(); g.fill(); txt(g, o.say || '“...”', 0, -4, F.hero(34), INK); g.restore(); };
  I.pickle = (g, s) => { g.save(); g.scale(s, s); g.rotate(-0.4); g.fillStyle = '#6aa84f'; rr(g, -26, -70, 52, 140, 26); g.fill(); g.fillStyle = '#4d8a37'; for (let i = 0; i < 7; i++) { g.beginPath(); g.arc(-10 + (i % 2) * 18, -48 + i * 18, 4, 0, 7); g.fill(); } g.restore(); };
  I.worldmap = (g, s) => { g.save(); g.scale(s, s); g.fillStyle = '#4fb3e8'; rr(g, -90, -56, 180, 112, 12); g.fill(); g.fillStyle = '#7bc65a'; for (const [x, y, w, h] of [[-60, -20, 44, 30], [-40, 14, 22, 30], [4, -30, 36, 28], [14, 4, 34, 36], [52, -26, 28, 24]]) { g.beginPath(); g.ellipse(x, y, w / 2, h / 2, 0.2, 0, 7); g.fill(); } g.restore(); };
  I.pin = (g, s) => { g.save(); g.scale(s, s); g.fillStyle = '#E0281E'; g.beginPath(); g.arc(0, -20, 28, Math.PI * 0.85, Math.PI * 0.15, false); g.lineTo(0, 52); g.closePath(); g.fill(); g.fillStyle = '#F5F3EE'; g.beginPath(); g.arc(0, -20, 11, 0, 7); g.fill(); g.restore(); };
  I.hand = (g, s) => { g.save(); g.scale(s, s); g.fillStyle = '#E8C9A0'; rr(g, -38, -10, 76, 56, 14); g.fill(); for (let i = 0; i < 4; i++) { rr(g, -36 + i * 19, -52, 15, 56, 7); g.fill(); } g.fillStyle = '#E8C9A0'; g.beginPath(); g.ellipse(-44, 24, 14, 26, 0.5, 0, 7); g.fill(); g.restore(); };
  I.x = (g, s) => { g.save(); g.scale(s, s); g.strokeStyle = '#E0281E'; g.lineWidth = 22; g.lineCap = 'round'; g.beginPath(); g.moveTo(-50, -50); g.lineTo(50, 50); g.moveTo(50, -50); g.lineTo(-50, 50); g.stroke(); g.restore(); };
  I.check = (g, s) => { g.save(); g.scale(s, s); g.strokeStyle = '#00A152'; g.lineWidth = 22; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); g.moveTo(-50, 4); g.lineTo(-16, 40); g.lineTo(52, -44); g.stroke(); g.restore(); };

  // ---------------------------------------------------------------- item kinds
  // every item: {k, x, y, at, out?, rot?, sc?, ...kind props}; drawn in local coords (origin = item centre)
  const IT = CS.ITEM;
  IT.text = (g, o, lt, t, th) => { const L = o.lines.map(l => typeof l === 'string' ? [l, o.tone || 'paper'] : l), size = o.size || 76; let sz = size; for (const l of L) sz = Math.min(sz, fit(l[0], F.hero, o.maxW || 940, size, 30)); const lh = sz * 1.08;
    L.forEach((l, i) => { const y = (i - (L.length - 1) / 2) * lh, col = TN(l[1], th, false); const on = clamp((lt - i * 0.12) / 0.12); g.save(); g.globalAlpha *= on; g.translate(0, (1 - on) * 14); stk(g, l[0], 0, y, F.hero(sz), col, 'center', Math.max(8, sz * 0.16)); g.restore(); }); };
  IT.chip = (g, o, lt, t, th) => { const s = o.text, sz = fit(s, F.hero, o.maxW || 900, o.size || 44), w = mw(s, F.hero(sz)) + 70, h = sz * 1.45, col = TN(o.tone || 'gold', th, false); clay(g, -w / 2, -h / 2, w, h, h / 2, col, { shadowK: 0.6 }); txt(g, s, 0, 3, F.hero(sz), (o.tone === 'bad' || o.tone === 'ink' || o.tone === 'navy') ? th.paper : INK); };
  IT.stamp = null; // handled in drawItem (own animation)
  IT.card = (g, o, lt, t, th) => { const w = o.w || 700, h = o.h || 360, hd = o.head ? 84 : 0; paper(g, -w / 2, -h / 2, w, h, 18, { lift: 0.5 });
    if (o.head) { g.fillStyle = TN(o.headTone || 'navy', th, false); rr(g, -w / 2, -h / 2, w, hd, 18); g.fill(); g.fillRect(-w / 2, -h / 2 + hd - 18, w, 18); const sz = fit(o.head, F.hero, w - 50, o.headSize || 50); txt(g, o.head, 0, -h / 2 + hd / 2 + 2, F.hero(sz), o.headTone === 'gold' ? INK : th.gold); }
    if (o.icon) { g.save(); g.translate(o.iconX ?? -w * 0.28, o.iconY ?? (hd / 2 + 6)); (I[o.icon] || I.coin)(g, o.iconS || 1.6, lt, o); g.restore(); }
    const L = (o.lines || []).map(l => typeof l === 'string' ? [l, 'ink'] : l), cx = o.icon ? (o.textX ?? w * 0.17) : 0, sz0 = o.size || 54, szs = L.map(l => fit(l[0], F.hero, (o.icon ? w * 0.52 : w - 60), l[2] || sz0, 22)), tot = szs.reduce((a, s) => a + s * 1.14, 0); let y = (o.textY ?? (hd / 2 + 4)) - tot / 2;
    L.forEach((l, i) => { const sz = szs[i], yy = y + sz * 0.57; y += sz * 1.14; const on = clamp((lt - (l[3] != null ? l[3] : 0.15 + i * 0.18)) / 0.12); if (on <= 0) return; g.save(); g.globalAlpha *= on; g.translate((1 - on) * 24, 0); txt(g, l[0], cx, yy, F.hero(sz), TN(l[1], th, true)); g.restore(); }); };
  IT.person = (g, o, lt, t, th) => { const w = o.w || 400, pw = w - 40, ph = o.ph || pw * 0.98, plate = o.name ? (o.nick ? 118 : 86) : 0, h = 20 + ph + 16 + plate + 18, y0 = -h / 2, who = W[o.who]; if (!who) throw new Error('unknown who ' + o.who);
    g.save(); g.rotate(o.tilt || 0); paper(g, -w / 2, y0, w, h, 16, { lift: 0.55 }); const px = -pw / 2, py = y0 + 20;
    g.save(); rr(g, px, py, pw, ph, 8); g.clip(); const bg = g.createLinearGradient(0, py, 0, py + ph); bg.addColorStop(0, who.bg[0]); bg.addColorStop(1, who.bg[1]); g.fillStyle = bg; g.fillRect(px, py, pw, ph);
    g.save(); g.translate(0, py + ph * 0.52); const sc = (pw / 360) * (o.fig || 1); g.scale(sc, sc); who.draw(g, t, th, { sniff: o.sniff, hd: o.hd }); g.restore();
    if (o.tint) { g.fillStyle = o.tint; g.fillRect(px, py, pw, ph); } if (o.mono) { g.globalCompositeOperation = 'saturation'; g.fillStyle = '#808080'; g.fillRect(px, py, pw, ph); g.globalCompositeOperation = 'source-over'; }
    const f = hit(lt - 0.04, 14) * (lt > 0.04 ? 1 : 0); if (f > 0.01 && o.flash !== false) { g.fillStyle = 'rgba(255,255,255,' + 0.8 * f + ')'; g.fillRect(px, py, pw, ph); }
    if (o.bars != null && t >= o.bars) { const u = ease.in(lin(t, o.bars, o.bars + 0.3)); for (let i = 0; i < 7; i++) { const bx = px + (i + 0.5) * pw / 7; g.fillStyle = '#10161f'; g.fillRect(bx - 8, py, 16, ph * u); g.fillStyle = 'rgba(255,255,255,.2)'; g.fillRect(bx - 8, py, 4, ph * u); } }
    g.restore(); g.strokeStyle = 'rgba(11,15,20,.3)'; g.lineWidth = 2; rr(g, px, py, pw, ph, 8); g.stroke();
    sub(g, 'ILLUSTRATION', px + pw - 8, py + ph - 14, 'rgba(245,243,238,.9)', 14, 'right');
    if (o.xmark != null && t >= o.xmark) { const u = ease.out(lin(t, o.xmark, o.xmark + 0.3)), r = pw * 0.3; g.strokeStyle = '#E0281E'; g.lineWidth = pw * 0.1; g.lineCap = 'round'; const a = clamp(u * 2), b2 = clamp(u * 2 - 1); const cx = 0, cy = py + ph / 2; g.beginPath(); g.moveTo(cx - r, cy - r); g.lineTo(cx - r + 2 * r * a, cy - r + 2 * r * a); g.stroke(); if (b2 > 0) { g.beginPath(); g.moveTo(cx + r, cy - r); g.lineTo(cx + r - 2 * r * b2, cy - r + 2 * r * b2); g.stroke(); } }
    if (o.name) { const ty = py + ph + 14; g.fillStyle = th.navy; rr(g, px, ty, pw, plate, 10); g.fill(); const nsz = fit(o.name, F.hero, pw - 24, o.nameSize || 44); txt(g, o.name, 0, ty + (o.nick ? 32 : plate / 2), F.hero(nsz), th.paper); if (o.nick) { const ksz = fit(o.nick, F.monoX, pw - 24, 21, 12); txt(g, o.nick, 0, ty + 78, F.monoX(ksz), o.nickCol || th.gold); } }
    if (o.pin) { B.crimeIcon && 0; g.fillStyle = '#E0281E'; g.beginPath(); g.arc(0, y0 + 4, 11, 0, 7); g.fill(); }
    for (const s of (o.stamps || [])) B.crimeStamp(g, th, t, { x: 0, y: 0, ...s }); g.restore(); };
  IT.photo = (g, o, lt, t, th) => { const w = o.w || 560, pw = w - 36, ph = o.ph || pw * (o.aspect || 0.8), lab = o.label ? 56 : 0, cr = o.credit ? 24 : 0, h = 18 + ph + 12 + lab + cr + 14, y0 = -h / 2, img = B.images[o.src]; if (!img) throw new Error('photo not preloaded ' + o.src);
    g.save(); g.rotate(o.tilt || 0); paper(g, -w / 2, y0, w, h, 12, { lift: 0.5, fill: '#F5F3EE' }); const px = -pw / 2, py = y0 + 18; g.save(); rr(g, px, py, pw, ph, 6); g.clip(); const z = (o.zoom || 1) + (o.push ? o.push * lin(lt, 0, 5) : 0); B.drawPhoto(g, img, px, py, pw, ph, { crop: o.crop, fx: o.fx, fy: o.fy, zoom: z });
    if (o.mono) { g.globalCompositeOperation = 'saturation'; g.fillStyle = '#808080'; g.fillRect(px, py, pw, ph); g.globalCompositeOperation = 'source-over'; } const f = hit(lt - 0.04, 14) * (lt > 0.04 ? 1 : 0); if (f > 0.01) { g.fillStyle = 'rgba(255,255,255,' + 0.8 * f + ')'; g.fillRect(px, py, pw, ph); } g.restore(); g.strokeStyle = 'rgba(11,15,20,.3)'; g.lineWidth = 2; rr(g, px, py, pw, ph, 6); g.stroke();
    if (o.label) { const ty = py + ph + 12; g.fillStyle = o.labelFill || th.navy; rr(g, px, ty, pw, 46, 8); g.fill(); const sz = fit(o.label, F.hero, pw - 20, 34); txt(g, o.label, 0, ty + 24, F.hero(sz), th.paper); }
    if (o.credit) sub(g, o.credit, 0, y0 + h - 14, th.inkSoft, 12);
    if (o.tag) { g.save(); g.translate(-pw / 2 + 70, py + 38); g.rotate(-0.14); g.fillStyle = '#E0281E'; g.fillRect(-64, -18, 128, 36); txt(g, o.tag, 0, 1, F.hero(26), '#F5F3EE'); g.restore(); }
    for (const s of (o.stamps || [])) B.crimeStamp(g, th, t, { x: 0, y: 0, ...s }); g.restore(); };
  IT.count = (g, o, lt, t, th) => { const u = ease.out(clamp(lt / (o.dur || 1.0))), v = lerp(o.from || 0, o.to, u), s = (o.pre || '') + B.fmtNum(o.dec ? v : Math.round(v), o.dec || 0, o.commas !== false) + (o.suf || ''), sz = fit(s, F.hero, o.maxW || 900, o.size || 190), col = TN(o.tone || 'gold', th, o.card);
    if (o.card) { const w = mw(s, F.hero(sz)) + 90, h = sz * 1.5 + (o.label ? 50 : 0); paper(g, -w / 2, -h / 2, w, h, 20, { lift: 0.5 }); if (o.label) sub(g, o.label, 0, -h / 2 + 30, th.inkSoft, 22); txt(g, s, 0, (o.label ? 24 : 0) + 4, F.hero(sz), col); }
    else { if (o.label) sub(g, o.label, 0, -sz * 0.72, th.paper, 24); stk(g, s, 0, 0, F.hero(sz), col, 'center', Math.max(10, sz * 0.12)); } if (o.sub) sub(g, o.sub, 0, sz * 0.78 + (o.card ? 14 : 0), th.paper, 24); };
  IT.bars = (g, o, lt, t, th) => { const n = o.items.length, w = o.w || 820, h = o.h || 460, gap = 40, bw = (w - gap * (n + 1)) / n, mx = o.max || Math.max(...o.items.map(i => i.value)); paper(g, -w / 2 - 20, -h / 2 - 46, w + 40, h + 124, 18, { lift: 0.4 }); if (o.title) sub(g, o.title, 0, -h / 2 - 16, th.inkSoft, 22);
    o.items.forEach((it, i) => { const at = it.at != null ? it.at - o.at : 0.2 + i * 0.4, on = clamp((lt - at) / 0.9), e = ease.out(on); if (lt < at) return; const bh = Math.max(6, (it.value / mx) * h * e), bx = -w / 2 + gap + i * (bw + gap); clay(g, bx, h / 2 - bh, bw, bh, 8, TN(it.tone || 'navy', th, true), { shadowK: 0.3 }); const s = it.show != null ? it.show : B.fmtNum(it.value * e, 0, true); const sz = fit(String(s), F.hero, bw + gap - 6, 46, 20); txt(g, s, bx + bw / 2, h / 2 - bh - 30, F.hero(sz), TN(it.tone === 'bad' ? 'bad' : 'ink', th, true)); const lsz = fit(it.label, F.monoX, bw + gap - 4, 20, 11); txt(g, it.label, bx + bw / 2, h / 2 + 28, F.monoX(lsz), th.ink); if (it.sub) sub(g, it.sub, bx + bw / 2, h / 2 + 56, th.inkSoft, 15); }); };
  IT.icon = (g, o, lt, t, th) => { (I[o.name] || (() => { throw new Error('unknown icon ' + o.name); }))(g, o.s || 1.5, lt, { ...o, t }); };
  IT.cal = (g, o, lt, t, th) => { const cols = o.cols || 7, rows = o.rows || 5, cw = o.cw || 72, ch = o.ch || 62, w = cols * cw + 40, h = rows * ch + 110; paper(g, -w / 2, -h / 2, w, h, 16, { lift: 0.45 }); g.fillStyle = th.navy; rr(g, -w / 2, -h / 2, w, 66, 16); g.fill(); g.fillRect(-w / 2, -h / 2 + 40, w, 26); txt(g, o.head || 'CALENDAR', 0, -h / 2 + 33, F.hero(38), th.gold);
    const n = o.n ?? cols * rows; for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const i = r * cols + c; if (i >= (o.total ?? cols * rows)) continue; const x = -w / 2 + 20 + c * cw, y = -h / 2 + 84 + r * ch; const fa = (o.fillAt ?? 0.3) + i * (o.per ?? 0.1); const on = i < n && lt >= fa, k = on ? pk(lt - fa, 'snappy') : 0; g.fillStyle = on ? TN((o.tones && o.tones[i]) || o.tone || 'bad', th, true) : th.paperShade; const lb = o.labels ? o.labels[i] : String(i + 1); rr(g, x + 4, y + 4, cw - 8, ch - 8, 8); g.fill(); if (on) { g.fillStyle = rgba('#fff', 0.2 * (1 - k)); rr(g, x + 4, y + 4, cw - 8, ch - 8, 8); g.fill(); txt(g, lb, x + cw / 2, y + ch / 2 + 2, F.hero(o.labels ? 26 : 30), th.paper); } else txt(g, lb, x + cw / 2, y + ch / 2 + 2, F.monoX(o.labels ? 17 : 20), th.inkSoft); } };
  IT.progress = (g, o, lt, t, th) => { const w = o.w || 820, h = 70, u = ease.out(clamp(lt / (o.dur || 1.2))), v = (o.from || 0) + ((o.to ?? 1) - (o.from || 0)) * u; paper(g, -w / 2 - 20, -h / 2 - 66, w + 40, h + 130, 16, { lift: 0.4 }); if (o.label) sub(g, o.label, 0, -h / 2 - 30, th.inkSoft, 22); g.fillStyle = th.paperShade; rr(g, -w / 2, -h / 2, w, h, 16); g.fill(); (o.segs || [[1, o.tone || 'good']]).reduce((acc, [frac, tn]) => { const a = acc, b = acc + frac; const wv = clamp((v - a) / (b - a)) * (b - a) * w; if (wv > 0) clay(g, -w / 2 + a * w, -h / 2, wv, h, 14, TN(tn, th, true), { shadowK: 0.2 }); return b; }, 0); if (o.sub) sub(g, o.sub, 0, h / 2 + 34, th.inkSoft, 22); };
  IT.arrow = (g, o, lt, t, th) => { const [x0, y0] = o.from, [x1, y1] = o.to, u = ease.out(clamp(lt / (o.dur || 0.5))), ex = lerp(x0, x1, u), ey = lerp(y0, y1, u); g.save(); g.translate(-(o.x || 0), -(o.y || 0)); g.strokeStyle = TN(o.tone || 'bad', th, false); g.fillStyle = g.strokeStyle; g.lineWidth = o.lw || 12; g.lineCap = 'round'; g.beginPath(); g.moveTo(x0, y0); g.quadraticCurveTo((x0 + ex) / 2 + (o.bend || 0), (y0 + ey) / 2 - (o.lift ?? 30), ex, ey); g.stroke(); const a = Math.atan2(ey - y0, ex - x0); if (u > 0.6) { g.translate(ex, ey); g.rotate(a); g.beginPath(); g.moveTo(10, 0); g.lineTo(-28, -22); g.lineTo(-28, 22); g.closePath(); g.fill(); } g.restore(); };
  IT.row = (g, o, lt, t, th) => { /* a horizontal strip of sub-items drawn small: o.items [{icon,label,tone,at}] */ const n = o.items.length, cw = o.cw || 230, w = n * cw; o.items.forEach((it, i) => { const at = it.at != null ? it.at - o.at : 0.2 + i * 0.3; if (lt < at) return; const k = pk(lt - at); g.save(); g.translate(-w / 2 + cw / 2 + i * cw, 0); g.scale(0.6 + 0.4 * k, 0.6 + 0.4 * k); const ch = o.ch || 280; paper(g, -cw / 2 + 8, -ch / 2, cw - 16, ch, 14, { lift: 0.4 }); if (it.who) { const who = W[it.who]; g.save(); rr(g, -cw / 2 + 18, -ch / 2 + 12, cw - 36, ch - 100, 8); g.clip(); const bg = g.createLinearGradient(0, -ch / 2, 0, ch / 2); bg.addColorStop(0, who.bg[0]); bg.addColorStop(1, who.bg[1]); g.fillStyle = bg; g.fillRect(-cw, -ch, 2 * cw, 2 * ch); g.translate(0, -ch / 2 + 12 + (ch - 100) * 0.55); const s = (cw - 36) / 360; g.scale(s, s); who.draw(g, t, th, {}); g.restore(); } else { g.save(); g.translate(0, -ch / 2 + 12 + (ch - 100) / 2); (I[it.icon] || I.coin)(g, it.s || 1.1, lt - at, it); g.restore(); } const lsz = fit(it.label, F.hero, cw - 36, 34, 16); txt(g, it.label, 0, ch / 2 - 56, F.hero(lsz), TN(it.tone || 'ink', th, true)); if (it.sub) sub(g, it.sub, 0, ch / 2 - 24, th.inkSoft, 16); g.restore(); }); };
  IT.board = (g, o, lt, t, th) => { const w = o.w || 960, h = o.h || 640; B.shadowed(g, () => rr(g, -w / 2, -h / 2, w, h, 22), '#5a3a1e', 0.4); g.save(); rr(g, -w / 2, -h / 2, w, h, 22); g.clip(); const lg = g.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2); lg.addColorStop(0, '#b98650'); lg.addColorStop(1, '#8c5f33'); g.fillStyle = lg; g.fillRect(-w / 2, -h / 2, w, h); for (let i = 0; i < 200; i++) { g.fillStyle = 'rgba(' + (hash(i * 3.1) > 0.5 ? '60,35,10' : '230,190,130') + ',' + (0.06 + 0.1 * hash(i * 7.7)) + ')'; g.beginPath(); g.arc(-w / 2 + hash(i * 1.3) * w, -h / 2 + hash(i * 2.9) * h, 2 + 5 * hash(i * 5.1), 0, 7); g.fill(); } g.restore(); g.strokeStyle = '#4a2f17'; g.lineWidth = 14; rr(g, -w / 2, -h / 2, w, h, 22); g.stroke();
    g.fillStyle = th.paper; rr(g, -220, -h / 2 - 8, 440, 56, 10); g.fill(); txt(g, o.title || 'EVIDENCE BOARD', 0, -h / 2 + 20, F.hero(34), th.ink);
    const P = []; (o.pins || []).forEach((p, i) => { const at = p.at != null ? p.at - o.at : 0.3 + i * 0.35; P[i] = { x: p.x, y: p.y, on: lt >= at, k: pk(lt - at), lt: lt - at }; }); const tight = ease.out(clamp((lt - (o.tightAt ?? 99)) / 0.5));
    (o.strings || []).forEach(([a, b]) => { const A = P[a], Bq = P[b]; if (!A || !Bq || !A.on || !Bq.on) return; const u = ease.out(clamp((Math.min(A.lt, Bq.lt)) / 0.5)); const x = lerp(A.x, Bq.x, u), y = lerp(A.y, Bq.y, u), sag = lerp(30, 2, tight); g.strokeStyle = 'rgba(2,4,9,.35)'; g.lineWidth = 8; g.lineCap = 'round'; g.beginPath(); g.moveTo(A.x + 2, A.y + 5); g.quadraticCurveTo((A.x + x) / 2, (A.y + y) / 2 + sag + 5, x + 2, y + 5); g.stroke(); g.strokeStyle = '#E0281E'; g.lineWidth = 5; g.beginPath(); g.moveTo(A.x, A.y); g.quadraticCurveTo((A.x + x) / 2, (A.y + y) / 2 + sag, x, y); g.stroke(); });
    (o.pins || []).forEach((p, i) => { const q = P[i]; if (!q.on) return; g.save(); g.translate(p.x, p.y); g.rotate((p.rot || 0) + (1 - Math.min(1, q.k)) * 0.3); g.scale(0.5 + 0.5 * q.k, 0.5 + 0.5 * q.k); const pw = p.w || 200, ph = p.h || 200; paper(g, -pw / 2, -ph / 2, pw, ph, 10, { lift: 0.25 });
      if (p.who) { const who = W[p.who]; g.save(); rr(g, -pw / 2 + 10, -ph / 2 + 10, pw - 20, ph - 56, 6); g.clip(); const bg = g.createLinearGradient(0, -ph / 2, 0, ph / 2); bg.addColorStop(0, who.bg[0]); bg.addColorStop(1, who.bg[1]); g.fillStyle = bg; g.fillRect(-pw, -ph, 2 * pw, 2 * ph); g.translate(0, -ph / 2 + 10 + (ph - 56) * 0.55); const s = (pw - 20) / 360; g.scale(s, s); who.draw(g, t, th, {}); g.restore(); } else if (p.icon) { g.save(); g.translate(0, -ph / 2 + 10 + (ph - 56) / 2); (I[p.icon] || I.coin)(g, p.s || 0.9, q.lt, p); g.restore(); }
      const sz = fit(p.label || '', F.hero, pw - 18, p.size || 26, 12); g.fillStyle = TN(p.tone || 'navy', th, false); rr(g, -pw / 2 + 10, ph / 2 - 42, pw - 20, 32, 6); g.fill(); txt(g, p.label || '', 0, ph / 2 - 26, F.hero(sz), p.tone === 'gold' ? INK : th.paper); if (p.stamp && lt >= p.stamp.at - o.at) B.crimeStamp(g, th, t, { x: 0, y: 0, size: 30, rot: -0.14, tone: 'bad', ...p.stamp }); g.restore(); g.fillStyle = '#E0281E'; g.beginPath(); g.arc(p.x, p.y - (p.h || 200) / 2 + 6, 9 * Math.min(1, q.k), 0, 7); g.fill(); }); };

  // ---------------------------------------------------------------- scene drawing
  function drawItem(g, it, t, th, S) {
    if (t < it.at) return; const lt = t - it.at; let fo = 1; if (it.out != null) { if (t > it.out + 0.2) return; fo = 1 - lin(t, it.out, it.out + 0.2); }
    g.save(); g.globalAlpha *= fo;
    if (it.k === 'stamp') { g.translate(it.x, it.y); B.crimeStamp(g, th, t, { text: it.text, at: it.at, tone: it.tone || 'bad', size: it.size || 76, rot: it.rot ?? -0.1, x: 0, y: 0 }); g.restore(); return; }
    const k = pk(lt, it.spring || 'bouncy'), fn = IT[it.k]; if (!fn) throw new Error('unknown item kind ' + it.k);
    g.translate(it.x, it.y + (it.k === 'person' || it.k === 'photo' || it.k === 'card' || it.k === 'board' || it.k === 'bars' ? (1 - Math.min(1, k)) * 90 : (1 - Math.min(1, k)) * 40));
    const sc = (it.sc || 1) * (0.78 + 0.22 * k); g.scale(sc, sc); g.rotate((it.rot || 0) + (1 - Math.min(1, k)) * (it.k === 'chip' ? 0 : -0.05)); g.globalAlpha *= clamp(lt / 0.08); fn(g, { ...it, at: it.at }, lt, t, th, S); g.restore();
  }
  const pipDraw = (g, p, t, th) => {
    const keys = p.pip || []; let key = null; for (const k of keys) if (t >= k.at) key = k; if (!key) return; const who = W[p.pipWho]; const lt = t - key.at, w = 250, ph = 196, h = ph + 62, x0 = 24, y0 = 1090;
    g.save(); g.translate(x0 + w / 2, y0 + h / 2); const k = pk(lt, 'snappy'); g.scale(0.92 + 0.08 * k, 0.92 + 0.08 * k); g.rotate(-0.03); paper(g, -w / 2, -h / 2, w, h, 12, { lift: 0.5 });
    const px = -w / 2 + 10, py = -h / 2 + 10, pw = w - 20; g.save(); rr(g, px, py, pw, ph, 6); g.clip(); const bg = g.createLinearGradient(0, py, 0, py + ph); bg.addColorStop(0, who.bg[0]); bg.addColorStop(1, who.bg[1]); g.fillStyle = bg; g.fillRect(px, py, pw, ph);
    g.save(); g.translate(0, py + ph * 0.55); const s = (pw / 360) * (1 + (key.zoom || 0) * clamp(lt / 2)); g.scale(s, s); who.draw(g, t, th, { sniff: key.sniff, hd: key.hd }); g.restore();
    if (key.tint) { g.fillStyle = key.tint; g.fillRect(px, py, pw, ph); } if (key.mono) { g.globalCompositeOperation = 'saturation'; g.fillStyle = '#808080'; g.fillRect(px, py, pw, ph); g.globalCompositeOperation = 'source-over'; }
    if (key.bars) { const u = ease.in(clamp(lt / 0.3)); for (let i = 0; i < 6; i++) { const bx = px + (i + 0.5) * pw / 6; g.fillStyle = '#10161f'; g.fillRect(bx - 5, py, 10, ph * u); } } if (lt < 0.2) { g.fillStyle = 'rgba(255,255,255,' + 0.8 * hit(lt, 14) + ')'; g.fillRect(px, py, pw, ph); }
    g.restore(); if (key.x) { const r = pw * 0.26; g.strokeStyle = '#E0281E'; g.lineWidth = 16; g.lineCap = 'round'; g.beginPath(); g.moveTo(-r, py + ph / 2 - r); g.lineTo(r, py + ph / 2 + r); g.moveTo(r, py + ph / 2 - r); g.lineTo(-r, py + ph / 2 + r); g.stroke(); }
    sub(g, 'ILLUSTRATION', px + pw - 5, py + ph - 9, 'rgba(245,243,238,.9)', 11, 'right');
    const sz = fit(key.text, F.hero, pw - 8, 28, 14); g.fillStyle = TN(key.tone === 'bad' ? 'bad' : key.tone === 'good' ? 'good' : 'navy', th, true); if (key.tone === 'gold') g.fillStyle = th.navy; rr(g, px, py + ph + 6, pw, 40, 7); g.fill(); txt(g, key.text, 0, py + ph + 27, F.hero(sz), key.tone === 'gold' ? th.gold : th.paper);
    if (key.stamp) B.crimeStamp(g, th, t, { text: key.stamp, at: key.at + 0.1, tone: key.stampTone || 'bad', size: 30, rot: -0.16, x: 0, y: py + ph * 0.5 });
    g.restore();
  };
  const hookDraw = (g, p, t, th) => { const H = p.hook; if (!H || t > H.until + 0.3) return; const k = Math.min(1.06, 0.9 + 0.1 * Math.min(1.1, spring(t + 0.1, { f: 2.6, z: 0.5 }))), fade = 1 - lin(t, H.until, H.until + 0.3); let size = H.size || 66; for (const ln of H.lines) size = fit(ln.map(x => x[0]).join(''), F.hero, 960, size, 36);
    g.save(); g.globalAlpha *= fade; g.translate(540, H.y || 470); g.scale(k, k); const lh = size * 1.1; H.lines.forEach((ln, i) => { const s = ln.map(x => x[0]).join(''); let x = -mw(s, F.hero(size)) / 2; const y = (i - (H.lines.length - 1) / 2) * lh; for (const [w, tn] of ln) { const ww = mw(w, F.hero(size)); stk(g, w, x + ww / 2, y, F.hero(size), TN(tn, th, false), 'center', 16); x += ww; } }); g.restore(); };
  const labelDraw = (g, p, t, th) => { let L = null; for (const l of p.labels) if (t >= l.at) L = l; if (!L) return; const lt = t - L.at, k = ease.out(clamp(lt / 0.25)), f = F.cap(26); g.font = f; const nw = g.measureText(L.text).width + 58; g.save(); g.translate(90, 318); g.fillStyle = 'rgba(11,15,20,.82)'; rr(g, 0, 0, nw, 44, 10); g.fill(); g.fillStyle = th.gold; g.beginPath(); g.arc(22, 22, 7, 0, 7); g.fill(); g.save(); rr(g, 0, 0, nw, 44, 10); g.clip(); g.globalAlpha = 0.4 + 0.6 * k; txt(g, L.text, 38, 24 + (1 - k) * 14, f, th.paper, 'left'); g.restore(); g.restore(); };

  B.register('csstage', {
    defaults: { scenes: [], hook: null, labels: [], pip: [], pipWho: 'thief', chip: null }, ownEnter: true, size: () => [1080, 1920],
    draw(g, p, env) {
      const { t, theme: th } = env; g.translate(-540, -960);
      labelDraw(g, p, t, th);
      for (const S of p.scenes) {
        if (t < S.from - 0.02 || t > S.to + 0.02) continue; const lt = t - S.from, a = clamp(lt / 0.1) * (1 - lin(t, S.to - 0.1, S.to)), kin = spring(lt + 0.08, { f: 2.4, z: 0.7 }), dr = 1 + 0.03 * lin(lt, 0, 6);
        g.save(); g.globalAlpha *= a; g.translate(540, 740 + (S.dy || 0)); g.scale((0.95 + 0.05 * Math.min(1.05, kin)) * dr * (S.sc || 1), (0.95 + 0.05 * Math.min(1.05, kin)) * dr * (S.sc || 1)); g.translate(-540, -740);
        for (const it of S.items) drawItem(g, it, t, th, S); g.restore();
      }
      hookDraw(g, p, t, th); pipDraw(g, p, t, th);
      for (const n of (p.notes || [])) if (t >= n.at && t < n.out + 0.2) { const nt = t - n.at, k = Math.min(1.08, spring(nt, 'bouncy')), fo = 1 - lin(t, n.out - 0.15, n.out + 0.05); g.save(); g.globalAlpha *= clamp(nt / 0.06) * fo; g.translate(n.x || 540, n.y || 1060); g.scale(0.7 + 0.3 * k, 0.7 + 0.3 * k); IT.chip(g, n, 0, t, th); g.restore(); }
    },
  });
  B.register('hypo', {
    defaults: { text: '' }, ownEnter: true, size: () => [10, 10],
    draw(g, p, env) { const s = p.text, f = F.monoX(21), w = mw(s, f) + 36; g.globalAlpha *= 0.9; g.fillStyle = 'rgba(11,15,20,.78)'; rr(g, -w / 2, -18, w, 36, 18); g.fill(); g.strokeStyle = env.theme.accent; g.lineWidth = 2; rr(g, -w / 2, -18, w, 36, 18); g.stroke(); txt(g, s, 0, 1, f, env.theme.accent); },
  });
})();
// CS builder: topic definition (CS_TOPIC) + cut definition (CS_CUT) -> BM2 scene spec. Runs in the browser (scene.js), words from window.BM2_VOICE.
(function () {
  const B = window.BM2;
  const ST = { x: 905, y: 1338, s: 0.8, layer: 'front', blur: 0, dim: 0 };
  const DX = [0, 420, -380, 300, -300, 380, -420, 260];
  const POSES = ['talk', 'chin', 'shock', 'point', 'talk', 'chin'];
  const norm = s => String(s).toLowerCase().replace(/[^a-z0-9$%']/g, '');
  const TIMEKEY = /^(at|out|xmark|bars|fillAt|tightAt|[a-z0-9]*At)$/;
  window.CS.make = function (TOPIC, CUT) {
    const V = window.BM2_VOICE, words = V.words, sents = V.sentences, dur = CUT.dur, th = TOPIC;
    const W = words.map(w => ({ n: norm(w.w), s: w.s, e: w.e }));
    // ---- sentence -> scene key
    const keys = []; const used = new Set();
    sents.forEach((s, i) => { let k = (CUT.force || {})[i]; if (i === 0 && k == null) k = CUT.first; if (k == null) { for (const [re, key] of TOPIC.rules) { if (re.test(s.text) && !used.has(key + '@' + 0)) { k = key; break; } } } if (k != null && k !== '-') used.add(k + '@0'); keys.push(k); });
    keys[0] = (CUT.force || {})[0] ?? CUT.first ?? keys[0] ?? 'hook';
    const segs = []; sents.forEach((s, i) => { if (keys[i] != null && keys[i] !== '-') segs.push({ key: keys[i], i, from: i === 0 ? 0 : Math.max(0, s.start - 0.08) }); });
    segs.forEach((g, j) => { g.to = j + 1 < segs.length ? segs[j + 1].from : dur + 1; g.iEnd = j + 1 < segs.length ? segs[j + 1].i : sents.length; });
    const scenes = [], sfx = [], labels = [], pipk = [];
    const A = (at, name, gain = -9, d = 0.5) => { if (at != null && at >= 0) sfx.push({ at, name, gain, dur: d }); };
    const SFXK = { chip: ['pop_1', -11], card: ['pop_2', -10], person: ['camera_shutter_1', -8], photo: ['camera_shutter_2', -9], stamp: ['rubber_stamp_1', -7], count: ['pop_2', -10], bars: ['pop_1', -10], icon: ['pop_1', -12], cal: ['pop_1', -11], board: ['pop_2', -10], row: ['pop_1', -10], progress: ['pop_1', -11], arrow: ['swipe_1', -12] };
    segs.forEach((sg, j) => {
      const def = TOPIC.scenes[sg.key]; if (!def) throw new Error('no scene ' + sg.key + ' (sentence ' + sg.i + ')'); const from = sg.from, to = Math.min(sg.to, dur + 0.4), len = to - from, ww = W.filter(w => w.s >= from - 0.05 && w.s < to);
      const rel = (v, i, n) => { // time ref -> absolute
        if (typeof v === 'number') return from + v;
        if (typeof v === 'string' && v[0] === '~') { let q = v.slice(1), nth = 1, off = 0; const mo = q.match(/([+-]\d+(\.\d+)?)$/); if (mo && q.length > mo[0].length) { off = parseFloat(mo[1]); q = q.slice(0, q.length - mo[0].length); } const m = q.match(/#(\d+)$/); if (m) { nth = +m[1]; q = q.replace(/#\d+$/, ''); } if (q[0] === '%') return from + len * parseFloat(q.slice(1)); if (q[0] === '+') return from + parseFloat(q.slice(1)); for (const alt of q.split('|')) { const hit = ww.filter(w => w.n === norm(alt)); if (hit[nth - 1]) return hit[nth - 1].s + off; } for (const alt of q.split('|')) { const hit2 = ww.filter(w => w.n.startsWith(norm(alt))); if (hit2[nth - 1]) return hit2[nth - 1].s + off; } console.warn('CS: word "' + q + '" not in scene ' + sg.key + '@' + from.toFixed(1)); return from + 0.5; }
        return v; };
      const walk = (o, ctx) => { if (Array.isArray(o)) return o.map(x => walk(x, ctx)); if (o && typeof o === 'object') { const r = {}; for (const [k, v] of Object.entries(o)) r[k] = TIMEKEY.test(k) && (typeof v === 'number' || (typeof v === 'string' && v[0] === '~')) ? rel(v) : walk(v, ctx); return r; } return o; };
      const n = def.items.length; const auto = Math.min(0.55, Math.max(0.2, (len - 0.8) / Math.max(1, n + 1)));
      let ai = 0; const items = def.items.map((it0, i) => { const it = walk(it0); if (it.at == null) { it.at = from + 0.05 + ai * auto; ai++; } else if (it0.at === 0 || it0.at === undefined) {} it.x = it.x ?? 540; it.y = it.y ?? 740; return it; });
      items.forEach(it => { const d = SFXK[it.k]; if (it.sfx === false) return; if (it.sfx) A(it.at, it.sfx, -9); else if (d && !(it.k === 'text')) A(it.at, d[0], d[1], 0.6); });
      if (j > 0) A(from, j % 2 ? 'whoosh_1' : 'whoosh_2', -12, 0.6);
      if (def.lab) labels.push({ at: from, text: def.lab });
      if (def.pip) pipk.push({ at: Math.max(0, from + 0.05), ...def.pip });
      scenes.push({ from, to, items, pose: def.pose || POSES[j % POSES.length], dy: def.dy || 0, sc: def.sc || 1, key: sg.key });
    });
    // ---- CTA from sentence text
    const cta = {}; sents.forEach((s, i) => { const tx = s.text; if (!cta.like && /\blike\b/i.test(tx) && /(hit|smash|drop|tap).*like|like if/i.test(tx)) cta.like = s.start + 0.1; else if (!cta.send && /\bsend this\b|\bshare this\b/i.test(tx)) cta.send = s.start + 0.1; else if (!cta.follow && /^follow\b|\bfollow if\b/i.test(tx)) { cta.follow = s.start + 0.1; cta.followOut = s.end + 0.1; } });
    const last = sents[sents.length - 1]; if (CUT.bubble) cta.bubble = { at: last.start + 0.25, ...CUT.bubble };
    if (CUT.hook && scenes[1]) CUT.hook.until = Math.min(CUT.hook.until, scenes[1].from - 0.3);
    const els = [];
    els.push({ id: 'stage', type: 'csstage', layer: 'screen', at: [540, 960], in: -1, z: 10, props: { scenes, hook: CUT.hook, labels, pip: CUT.pip || pipk, pipWho: TOPIC.pipWho, notes: CUT.notes || [] } });
    els.push({ id: 'hypo', type: 'hypo', layer: 'screen', at: [545, 1316], in: 0.2, z: 20, props: { text: TOPIC.hypo } });
    if (cta.like) els.push({ id: 'heart', type: 'heart', layer: 'screen', at: [520, 1205], in: cta.like, z: 30, props: { s: 1, dur: 1.0 } });
    if (cta.send) els.push({ id: 'plane', type: 'plane', layer: 'screen', at: [0, 0], in: cta.send, z: 30, props: { from: [330, 1275], to: [760, 1160], dur: 1.2, s: 0.7 }, out: cta.send + 1.5 });
    if (cta.follow) els.push({ id: 'follow', type: 'follow', layer: 'screen', at: [520, 1215], in: cta.follow, out: cta.followOut, z: 30, props: { press: 0.75 } });
    if (cta.bubble) els.push({ id: 'bubble', type: 'bubble', layer: 'screen', at: [520, 1205], in: cta.bubble.at, z: 30, props: { l1: cta.bubble.l1, l2: cta.bubble.l2, size: 40, tail: 'left' } });
    if (CUT.hook) { A(0.04, 'deep_boom_2', -6, 0.5); }
    if (cta.like) A(cta.like, 'pop_2', -9, 0.4); if (cta.send) A(cta.send, 'swoosh_1', -9, 0.9); if (cta.follow) { A(cta.follow, 'pop_1', -9, 0.5); A(cta.follow + 0.75, 'click_1', -8, 0.3); A(cta.follow + 0.85, 'success_chime_1', -12, 1.2); } if (cta.bubble) A(cta.bubble.at, 'pop_1', -9, 0.5);
    (CUT.sfx || []).forEach(x => sfx.push(x));
    const beats = scenes.map((s, i) => ({ at: s.from, beat: 'wide', focus: { x: 540 + DX[i % DX.length], y: 740 + (i % 2 ? 90 : -60), w: 1080, h: 300 }, fill: 1, dur: 0.8, st: ST, pose: s.pose }));
    beats.unshift({ at: 0, beat: 'wide', focus: { x: 540, y: 740, w: 1080, h: 300 }, fill: 1, st: ST, pose: 'shock' });
    const poses = []; if (cta.follow) poses.push([cta.follow, 'follow', { target: [520, 1215] }]); if (cta.like) poses.push([cta.like + 0.1, 'you']); if (cta.send) poses.push([cta.send + 0.1, 'you']);
    const shakes = (CUT.shakes || []);
    window.CS_DEBUG = scenes.map(s => s.key + '@' + s.from.toFixed(1)).join(' ');
    return { series: TOPIC.series, title: TOPIC.title, duration: dur, footnote: TOPIC.footnote, elements: els, beats, poses, shakes, captions: CUT.captions || { gap: 16 }, bed: { name: CUT.bed, gain: -1 }, sfx };
  };
})();
// Wells Fargo accounts (Decoded). NO logos / branding / signage photos: only drawn ILLUSTRATION cards (generic bank with a QUOTA board; the executive).
const BANK = { k: 'person', who: 'bank', name: 'THE BANK', nick: 'WELLS FARGO · ILLUSTRATION' };
const EXEC = { k: 'person', who: 'exec', name: 'CARRIE TOLSTEDT', nick: 'THE EXECUTIVE IN CHARGE' };
const CS_TOPIC = {
  series: 'decoded', title: 'CASE FILE · FAKE ACCOUNTS', pipWho: 'bank', hypo: 'TRUE STORY · DOJ 2020 · PLEA 2023',
  footnote: ['SOURCES: DOJ STATEMENT OF FACTS (2002–2016) · 2016 REGULATOR FINES · 2020 $3B SETTLEMENT (DEFERRED PROSECUTION) · TOLSTEDT PLEA & SENTENCE 2023', '“ABOUT SIX PRODUCTS PER CUSTOMER” = THE BANK’S PUBLIC FIGURE · “UNREALISTIC GOALS” = PROSECUTORS’ WORDS', 'NO LOGOS OR BRANDING SHOWN · THE BANK, THE EXECUTIVE AND EMPLOYEES ARE DRAWN ILLUSTRATIONS, NOT PHOTOS'],
  rules: [
    [/^(Hit|Smash) like|^Send this|^Follow if/i, '-'],
    [/executive in charge/i, 'exec'], [/probation|sentenced/i, 'prob'], [/deferred prosecution/i, 'dpa'], [/three billion/i, 'settle'], [/top managers knew|admitted/i, 'admit'],
    [/own review/i, 'review'], [/hundred eighty-five/i, 'fine'], [/fifty-three hundred|fifty-three/i, 'fired'], [/every minute|a minute/i, 'minute'],
    [/open an account the customer never|Step one/i, 'step1'], [/PIN/, 'step2'], [/customer's (own )?money/i, 'step3'], [/faked|can't hit/i, 'faked'], [/unrealistic/i, 'goals'],
    [/pitch|selling every|wanted every customer/i, 'cross'], [/biggest|here's the bank/i, 'bank'],
  ],
  scenes: {
    hookW: { pip: { text: 'THE BANK', tone: 'gold' }, items: [{ ...BANK, w: 400, x: 540, y: 935, at: 0, flash: false, nameSize: 40 }, { k: 'stamp', text: 'NEVER ASKED FOR', tone: 'bad', size: 64, x: 540, y: 880, rot: -0.1, at: '~never' }] },
    hookF: { pip: { text: 'THE BANK', tone: 'gold' }, items: [{ ...EXEC, w: 380, x: 300, y: 930, at: 0, flash: false, nameSize: 32 }, { k: 'count', to: 5300, from: 0, size: 130, card: true, label: 'EMPLOYEES FIRED', tone: 'bad', x: 770, y: 880, at: 0.05, dur: 0.9 }] },
    hookS: { pip: { text: 'THE BANK', tone: 'gold' }, items: [{ ...BANK, w: 400, x: 540, y: 935, at: 0, flash: false, nameSize: 40 }, { k: 'stamp', text: 'QUOTA!', tone: 'bad', size: 80, x: 540, y: 880, rot: -0.1, at: '~sales|opened' }] },
    crime: { lab: 'THE CRIME', pip: { text: 'THE CRIME', tone: 'bad' }, items: [{ k: 'card', head: 'THE CRIME', w: 880, h: 400, icon: 'envelope', iconS: 1.6, lines: [['ACCOUNTS CUSTOMERS', 'ink', 54], ['NEVER ASKED FOR', 'bad', 74]], x: 540, y: 740, at: 0 }] },
    bank: { lab: 'THE BANK', pip: { text: 'THE BANK', tone: 'gold' }, items: [{ ...BANK, w: 430, x: 540, y: 780, at: 0 }, { k: 'chip', text: 'ONE OF THE BIGGEST IN AMERICA', tone: 'gold', size: 34, x: 540, y: 1070, at: '~biggest|America' }] },
    review: { lab: 'THE NUMBERS', pip: { text: '2 MILLION+', tone: 'bad' }, items: [{ k: 'card', head: 'THE BANK’S OWN REVIEW', w: 880, h: 440, icon: 'envelope', iconS: 1.4, iconX: -290, lines: [['2 MILLION+', 'bad', 130], ['ACCOUNTS THAT MAY NOT HAVE BEEN AUTHORIZED', 'soft', 28]], textX: 90, x: 540, y: 740, at: 0 }] },
    cross: { lab: 'THE PITCH', pip: { text: 'SELL MORE', tone: 'gold' }, items: [{ k: 'card', head: 'THE PITCH: SELL MORE', w: 880, h: 420, icon: 'cert', iconS: 1.6, iconX: -290, lines: [['≈ 6 PRODUCTS', 'gold', 110], ['PER CUSTOMER (THE BANK’S PUBLIC NUMBER)', 'soft', 26]], textX: 90, x: 540, y: 740, at: 0 }] },
    goals: { lab: 'THE PRESSURE', pip: { text: 'QUOTA', tone: 'bad' }, items: [{ ...BANK, w: 340, x: 290, y: 790, at: 0, nameSize: 34 }, { k: 'card', head: 'PROSECUTORS SAY', w: 520, h: 400, lines: [['2002–2016', 'gold', 100], ['SALES GOALS WERE', 'ink', 40], ['UNREALISTIC', 'bad', 70]], x: 780, y: 780, at: '~prosecutors|unrealistic' }] },
    faked: { lab: 'THE PRESSURE', pip: { text: 'FAKED IT', tone: 'bad' }, items: [{ k: 'person', who: 'worker', w: 400, name: 'AN EMPLOYEE', nick: 'UNDER PRESSURE', x: 540, y: 770, at: 0 }, { k: 'stamp', text: 'FAKED IT', tone: 'bad', size: 84, x: 540, y: 690, rot: -0.1, at: '~faked' }] },
    step1: { lab: 'THE TRICK · STEP 1', pip: { text: 'STEP 1', tone: 'bad' }, items: [{ k: 'card', head: 'STEP 1', w: 880, h: 420, icon: 'envelope', iconS: 1.7, lines: [['OPEN AN ACCOUNT', 'ink', 62], ['THE CUSTOMER NEVER ASKED FOR', 'bad', 42]], x: 540, y: 740, at: 0 }] },
    step2: { lab: 'THE TRICK · STEP 2', pip: { text: 'STEP 2', tone: 'bad' }, items: [{ k: 'card', head: 'STEP 2', w: 880, h: 420, icon: 'lock', iconS: 1.7, lines: [['MAKE UP A PIN', 'ink', 70], ['OR FORGE A SIGNATURE', 'bad', 62]], x: 540, y: 740, at: 0 }, { k: 'stamp', text: 'FORGED', tone: 'bad', size: 60, x: 700, y: 960, rot: -0.12, at: '~forge|signature' }] },
    step3: { lab: 'THE TRICK · STEP 3', pip: { text: 'STEP 3', tone: 'bad' }, items: [{ k: 'card', head: 'STEP 3', w: 880, h: 420, icon: 'stack', iconS: 1.6, lines: [['MOVE THE CUSTOMER’S', 'ink', 54], ['OWN MONEY IN', 'bad', 74]], x: 540, y: 740, at: 0 }, { k: 'chip', text: 'SO IT LOOKS REAL', tone: 'gold', size: 42, x: 540, y: 1030, at: '~real|legit' }] },
    minute: { lab: 'THE MATH', pip: { text: '1 A MINUTE', tone: 'bad' }, items: [{ k: 'icon', name: 'clock', s: 1.8, x: 250, y: 640, at: 0 }, { k: 'card', head: 'ONE ACCOUNT A MINUTE, NONSTOP', headSize: 38, w: 880, h: 400, lines: [['2 MILLION ÷ 525,600 / YEAR', 'ink', 52], ['≈ 3.8 YEARS', 'bad', 130]], x: 540, y: 860, at: 0.2 }] },
    fine: { lab: 'THE FINE', pip: { text: 'FINED', tone: 'bad', stamp: 'FINED' }, items: [{ k: 'card', head: 'REGULATORS’ FINE · 2016', w: 880, h: 400, icon: 'gavel', iconS: 1.5, iconX: -290, lines: [['$185', 'bad', 150], ['MILLION', 'ink', 70]], textX: 90, x: 540, y: 740, at: 0 }] },
    fired: { lab: 'THE FALLOUT', pip: { text: '5,300 FIRED', tone: 'bad' }, items: [{ k: 'person', who: 'worker', w: 330, name: 'EMPLOYEES', nick: 'FIRED', x: 290, y: 790, at: 0, nameSize: 34 }, { k: 'count', to: 5300, from: 0, pre: '≈ ', size: 120, card: true, label: 'EMPLOYEES FIRED', tone: 'bad', x: 770, y: 780, at: '~fifty|53', dur: 1.0 }] },
    settle: { lab: 'THE SETTLEMENT', pip: { text: '$3 BILLION', tone: 'bad' }, items: [{ k: 'card', head: 'SETTLEMENT · 2020', w: 880, h: 440, icon: 'gavel', iconS: 1.5, iconX: -290, lines: [['$3 BILLION', 'bad', 120], ['TO RESOLVE CRIMINAL + CIVIL INVESTIGATIONS', 'soft', 24]], textX: 90, x: 540, y: 740, at: 0 }] },
    admit: { lab: 'THE SETTLEMENT', pip: { text: 'ADMITTED', tone: 'bad', stamp: 'ADMITTED' }, items: [{ ...BANK, w: 400, x: 540, y: 770, at: 0, nameSize: 40 }, { k: 'stamp', text: 'ADMITTED', tone: 'bad', size: 78, x: 540, y: 690, rot: -0.1, at: '~admitted|managers' }, { k: 'chip', text: 'TOP MANAGERS KNEW', tone: 'gold', size: 40, x: 540, y: 1075, at: '~managers|knew' }] },
    dpa: { lab: 'THE DEAL', pip: { text: 'DEFERRED', tone: 'gold' }, items: [{ k: 'card', head: 'DEFERRED PROSECUTION DEAL', headSize: 38, w: 880, h: 420, icon: 'lock', iconS: 1.5, iconX: -290, lines: [['BEHAVE 3 YEARS', 'gold', 92], ['THE CHARGE GOES AWAY', 'bad', 62]], textX: 90, x: 540, y: 740, at: 0 }] },
    exec: { lab: 'THE EXECUTIVE', pip: { text: 'THE EXECUTIVE', tone: 'bad' }, items: [{ ...EXEC, w: 430, x: 540, y: 770, at: 0, nameSize: 38 }, { k: 'stamp', text: 'PLEADED GUILTY', tone: 'bad', size: 54, x: 540, y: 690, rot: -0.1, at: '~pleaded' }, { k: 'chip', text: 'OBSTRUCTING A BANK EXAMINATION', tone: 'gold', size: 28, x: 540, y: 1080, at: '~obstructing' }] },
    prob: { lab: 'THE SENTENCE', pip: { text: 'PROBATION', tone: 'good', stamp: 'PROBATION', stampTone: 'good' }, items: [{ ...EXEC, w: 340, x: 290, y: 790, at: 0, nameSize: 28 }, { k: 'text', lines: [['3 YEARS', 'gold'], ['PROBATION', 'paper']], size: 100, x: 770, y: 650, at: '~three' }, { k: 'stamp', text: 'NO PRISON', tone: 'good', size: 60, x: 770, y: 860, rot: -0.08, at: '~probation|prison|Rough' }, { k: 'chip', text: 'INCL. 6 MONTHS AT HOME', tone: 'gold', size: 28, x: 770, y: 1000, at: '~six|months' }] },
    q: { lab: 'YOUR CALL', pip: { text: 'WOULD YOU NOTICE?', tone: 'gold' }, items: [{ k: 'card', head: 'AN ACCOUNT YOU NEVER OPENED', headSize: 38, w: 880, h: 400, icon: 'envelope', iconS: 1.6, lines: [['WOULD YOU', 'ink', 70], ['EVEN NOTICE?', 'bad', 90]], x: 540, y: 720, at: 0 }] },
  },
};
const CS_CUT = { dur: 94.18, first: 'hookS', bed: 'ambient_bed_2', bubble: { l1: 'WOULD YOU EVEN', l2: 'NOTICE?' },
  hook: { until: 3.6, y: 520, size: 68, lines: [[['THIS BANK WAS SO', 'paper']], [['SALES-OBSESSED', 'bad']], [['IT OPENED FAKE ACCOUNTS', 'gold']]] },
  force: { 19: 'q' }, shakes: [[0.1, 8], [80, 12]], captions: { gap: 16, emph: { 'fired': 'bad', 'fraud.': 'bad', 'probation.': 'bad' } } };
BM2.scene(CS.make(CS_TOPIC, CS_CUT));
