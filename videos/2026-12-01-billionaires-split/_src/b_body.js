  // ---------- shared bits ----------
  const pk = (t, at, o = 'bouncy') => Math.min(1.1, spring(t - at, o));
  const sub = (g, s, x, y, col, size = 24, al = 'center') => txt(g, s, x, y, F.monoX(size), col, al);
  const bottomChip = (g, S, t, th) => { let ch = null; for (const c of (S.chips || (S.chip ? [S.chip] : []))) if (t >= c.at) ch = c; if (ch && !(S.chipOut && t >= S.chipOut)) chip(g, ch.text, 540, ch.y || 1062, ch.tone || 'ink', th, ch.size || 38, 900, spring(t - ch.at, 'bouncy')); };
  const tagsOf = (g, S, t, th) => { for (const nt of S.tags || []) if (t >= nt.at && (!nt.out || t < nt.out)) chip(g, nt.text, nt.x || 540, nt.y || 640, nt.tone || 'ink', th, nt.size || 38, nt.w || 900, spring(t - nt.at, 'bouncy')); };
  const enter = (g, t, at, x, y, dy = 60) => { g.save(); const k = pk(t, at); g.translate(x, y + (1 - Math.min(1, k)) * dy); g.scale(0.9 + 0.1 * k, 0.9 + 0.1 * k); g.globalAlpha *= clamp((t - at) / 0.08); return k; };
  const GREEN = '#1FA366', GOLDC = '#F2B705';
  const bundle = (g, x, y, w, h, col) => { clay(g, x, y, w, h, 8, col || GREEN, { shadowK: 0.4 }); g.fillStyle = 'rgba(245,243,238,.9)'; g.fillRect(x + w * 0.4, y + 2, w * 0.2, h - 4); txt(g, '$', x + w * 0.5, y + h * 0.54, F.hero(h * 0.5), '#0B0F14'); g.fillStyle = 'rgba(0,0,0,.15)'; g.fillRect(x, y + h - 5, w, 4); };
  // generic person (illustration). kind: 'you' | 'baby' | 'grandma' | colour index
  const PCOL = ['#2c3e66', '#8a2f2f', '#2f6f4f', '#6b4a8a', '#a8741a', '#2b7a8a', '#7a4a2b'];
  function person(g, x, y, s, ci, kind) {
    g.save(); g.translate(x, y); g.scale(s, s); const INK = '#0B0F14', col = kind === 'you' ? '#E8590C' : kind === 'baby' ? '#9ad0f5' : kind === 'grandma' ? '#b05ca8' : PCOL[ci % PCOL.length];
    g.fillStyle = col; g.strokeStyle = INK; g.lineWidth = 2.2; g.beginPath(); g.roundRect(-9, -4, 18, 20, 6); g.fill(); g.stroke();
    g.fillStyle = '#F1C9A0'; g.beginPath(); g.arc(0, -12, 8, 0, 7); g.fill(); g.stroke();
    if (kind === 'you') { g.fillStyle = GOLDC; g.beginPath(); g.moveTo(-8.5, -14); g.bezierCurveTo(-9, -26, 9, -26, 8.5, -14); g.closePath(); g.fill(); g.stroke(); }
    else if (kind === 'grandma') { g.fillStyle = '#d8d8de'; g.beginPath(); g.arc(0, -17, 8.5, Math.PI, 0); g.fill(); g.beginPath(); g.arc(0, -25, 4.5, 0, 7); g.fill(); g.stroke(); g.lineWidth = 1.4; g.beginPath(); g.arc(-3, -12, 2.4, 0, 7); g.arc(3, -12, 2.4, 0, 7); g.stroke(); }
    else if (kind === 'baby') { g.fillStyle = '#F5F3EE'; g.beginPath(); g.arc(0, -19, 3, 0, 7); g.fill(); g.stroke(); }
    else { g.fillStyle = ['#3a2a1a', '#1a1a1a', '#7a4a2b', '#c9a24a'][ci % 4]; g.beginPath(); g.arc(0, -15, 8.5, Math.PI, 0); g.fill(); }
    g.restore(); }
  function check(g, w, h, th, amount, o = {}) { // centred paper check
    clay(g, -w / 2, -h / 2, w, h, 12, '#F5F3EE', { shadowK: 0.5 }); g.strokeStyle = '#2f6f4f'; g.lineWidth = Math.max(2, w * 0.006); rr(g, -w / 2 + w * 0.025, -h / 2 + h * 0.06, w * 0.95, h * 0.88, 8); g.stroke();
    g.fillStyle = '#d8efe2'; g.fillRect(-w / 2 + w * 0.03, -h / 2 + h * 0.1, w * 0.94, h * 0.14); txt(g, o.head || 'SPLIT CHECK', -w / 2 + w * 0.06, -h / 2 + h * 0.17, F.monoX(Math.max(10, h * 0.1)), '#14603f', 'left');
    if (o.to) { txt(g, 'PAY TO THE ORDER OF', -w / 2 + w * 0.06, -h * 0.06, F.monoX(Math.max(9, h * 0.07)), '#59606B', 'left'); txt(g, o.to, -w / 2 + w * 0.06, h * 0.1, F.hero(Math.max(14, h * 0.18)), '#0B0F14', 'left'); }
    txt(g, amount, o.to ? w * 0.16 : 0, o.to ? h * 0.12 : h * 0.05, F.hero(fit(amount, F.hero, w * (o.to ? 0.42 : 0.8), h * 0.42, 14)), '#188a56', o.to ? 'center' : 'center');
    g.strokeStyle = '#59606B'; g.lineWidth = Math.max(1.5, w * 0.004); g.beginPath(); g.moveTo(-w / 2 + w * 0.06, h * 0.34); g.lineTo(-w * 0.1, h * 0.34); g.stroke(); if (o.memo) txt(g, o.memo, -w / 2 + w * 0.06, h * 0.28, F.monoX(Math.max(8, h * 0.06)), '#59606B', 'left');
    g.strokeStyle = '#3a4a7a'; g.lineWidth = Math.max(1.5, w * 0.005); g.beginPath(); g.moveTo(w * 0.12, h * 0.3); g.bezierCurveTo(w * 0.2, h * 0.18, w * 0.26, h * 0.42, w * 0.32, h * 0.26); g.stroke(); }
  function pile(g, cx, baseY, s, vis, tFly) { // pyramid 5-4-3-2-1 of bundles; tFly(i) -> {x,y,k,a} overrides
    const w = 100 * s, h = 50 * s; let i = 0; for (let r = 0; r < 5; r++) { const n = 5 - r; for (let c = 0; c < n; c++, i++) { const hx = cx - n * w / 2 + c * w + 1, hy = baseY - (r + 1) * h; if (vis != null && i >= vis) continue; const f = tFly ? tFly(i, hx, hy, w, h) : null; if (f && f.a <= 0) continue; g.save(); if (f) { g.globalAlpha *= f.a; g.translate(f.x + w / 2, f.y + h / 2); g.scale(f.k, f.k); g.translate(-w / 2, -h / 2); bundle(g, 0, 0, w - 2, h - 2); } else bundle(g, hx, hy, w - 2, h - 2); g.restore(); } } }
  // ---------- scenes ----------
  function pile_(g, p, lt, t, th, S) { // the giant pile + 3,428 plate + crowd + optional YOU check
    const crowd = []; for (let i = 0; i < 26; i++) crowd.push([110 + i * 33.5, 1030 + (i % 2) * 4, i]);
    enter(g, t, S.at ?? 0, 0, 0, 0);
    if (S.pileAt == null || t >= S.pileAt) {
      const sl = S.sliceAt != null ? t - S.sliceAt : -1, fly = sl > 0 ? (i, hx, hy) => { const q = clamp((sl - i * 0.05) / 0.7), e = ease.in(q), tx = 120 + (i * 61) % 800, ty = 1030; return { x: lerp(hx, tx, e), y: lerp(hy, ty, e), k: lerp(1, 0.18, e), a: 1 - clamp((q - 0.85) / 0.15) }; } : null;
      pile(g, 540, 935, 1.04, null, fly);
      if (sl > 0) { for (let r = 1; r < 5; r++) { const u = clamp((sl + 0.2) / 0.3); g.strokeStyle = 'rgba(224,40,30,' + (1 - clamp((sl - 0.5) / 0.4)) * u + ')'; g.lineWidth = 4; g.setLineDash([12, 8]); g.beginPath(); g.moveTo(260, 935 - r * 52); g.lineTo(260 + 560 * u, 935 - r * 52); g.stroke(); g.setLineDash([]); } }
      const la = t - (S.labelAt ?? S.at ?? 0); if (la > 0 && !(S.labelOut != null && t > S.labelOut)) { const k = pk(t, S.labelAt ?? S.at ?? 0); g.save(); g.translate(540, 612); g.scale(0.85 + 0.15 * k, 0.85 + 0.15 * k); g.globalAlpha *= clamp(la / 0.08); stk(g, '$20.1 TRILLION', 0, 0, F.hero(fit('$20.1 TRILLION', F.hero, 780, 92)), th.good, 'center', 12); g.restore(); }
      const pa = t - (S.plateAt ?? 9999); if (pa > 0 && !(S.labelOut != null && t > S.labelOut)) { const k = pk(t, S.plateAt); g.save(); g.translate(540, 984); g.scale(0.85 + 0.15 * k, 0.85 + 0.15 * k); g.globalAlpha *= clamp(pa / 0.08); clay(g, -250, -26, 500, 52, 12, th.navy, { shadowK: 0.5 }); txt(g, '3,428 BILLIONAIRES', 0, 2, F.hero(36), th.gold); g.restore(); }
    }
    const ca = t - (S.crowdAt ?? 9999); if (ca > 0) { for (const [x, y, i] of crowd) { const q = clamp((ca - i * 0.012) / 0.2); if (q <= 0) continue; g.save(); g.globalAlpha *= q; person(g, x, y + 20, 1.05, i); g.restore(); } sub(g, '8.2 BILLION PEOPLE · DRAWN SMALL', 540, 1066, th.paper, 18); }
    const ya = t - (S.checkAt ?? 9999); if (ya > 0) { const k = pk(t, S.checkAt); g.save(); g.translate(870, 800); g.scale(0.6 + 0.4 * k, 0.6 + 0.4 * k); g.globalAlpha *= clamp(ya / 0.08); person(g, 0, 40, 4.4, 0, 'you'); g.translate(-30, 110); g.rotate(-0.06); check(g, 210, 100, th, '$2,451', { head: 'YOUR CHECK' }); g.restore(); }
    g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function assumes(g, p, lt, t, th, S) {
    enter(g, t, S.at, 540, 820); paper(g, -430, -230, 860, 460, 18, { lift: 0.6 }); g.fillStyle = th.navy; rr(g, -420, -220, 840, 62, 12); g.fill(); txt(g, 'ASSUMES', 0, -188, F.hero(46), th.gold);
    const rows = S.rows || []; rows.forEach((r, i) => { const o = t - r.at; if (o <= 0) return; const k = pk(t, r.at); g.save(); g.globalAlpha *= clamp(o / 0.1); g.translate(0, -112 + i * 56 + (1 - Math.min(1, k)) * 18); g.fillStyle = r.tone === 'bad' ? th.bad : '#188a56'; g.beginPath(); g.arc(-380, 0, 16, 0, 7); g.fill(); g.strokeStyle = '#F5F3EE'; g.lineWidth = 5; g.lineCap = 'round'; g.beginPath(); g.moveTo(-388, 1); g.lineTo(-381, 8); g.lineTo(-370, -7); g.stroke(); txt(g, r.text, -345, 2, F.hero(fit(r.text, F.hero, 740, 40)), r.tone === 'bad' ? th.badInk : th.ink, 'left'); g.restore(); });
    if (S.stampAt != null) stamp(g, 'WE PRETEND', 290, 196, 'accent', th, 38, -0.07, pk(t, S.stampAt)); g.restore(); bottomChip(g, S, t, th); }
  function trillion(g, p, lt, t, th, S) {
    enter(g, t, S.at, 540, 800); paper(g, -440, -215, 880, 430, 18, { lift: 0.5 }); g.fillStyle = th.navy; rr(g, -430, -205, 860, 56, 12); g.fill(); txt(g, 'WHAT’S A TRILLION?', 0, -177, F.hero(40), th.gold);
    const u = ease.inOut(clamp((t - (S.gridAt ?? S.at + 0.3)) / (S.dur || 1.6))), cols = 40, rows = 25, cw = 20, ch = 8.6, x0 = -cols * cw / 2, y0 = -115; for (let i = 0; i < 1000; i++) { const c = i % cols, r = Math.floor(i / cols), lit = i < 1000 * u; g.fillStyle = lit ? (i % 100 < 1 ? GOLDC : GREEN) : 'rgba(11,15,20,.1)'; g.fillRect(x0 + c * cw + 1, y0 + r * (ch + 0.4) + 1, cw - 2, ch - 1); }
    txt(g, '1 TRILLION', -250, 158, F.hero(60), th.badInk); const a = t - (S.eqAt ?? 9999); if (a > 0) { const k = pk(t, S.eqAt); g.save(); g.translate(140, 158); g.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k); g.globalAlpha *= clamp(a / 0.1); txt(g, '= 1,000 BILLIONS', 0, 0, F.hero(fit('= 1,000 BILLIONS', F.hero, 400, 60)), th.ink); g.restore(); }
    g.restore(); bottomChip(g, S, t, th); }
  function people(g, p, lt, t, th, S) { // 20x10 grid of figures; slices land on each; YOU highlighted
    const cols = 20, rows = 10, cw = 46, rh = 39, x0 = 540 - cols * cw / 2, y0 = 630, k = pk(t, S.at);
    g.save(); g.globalAlpha *= clamp((t - S.at) / 0.1); for (let i = 0; i < cols * rows; i++) { const c = i % cols, r = Math.floor(i / cols), isYou = i === S.you; const x = x0 + (c + 0.5) * cw, y = y0 + (r + 0.5) * rh; const q = clamp((t - (S.at + 0.1 + i * 0.004)) / 0.2); if (q <= 0) continue; g.save(); g.globalAlpha *= q; person(g, x, y + 8, 1.55, (c * 3 + r) % 7, isYou && S.youAt != null && t >= S.youAt ? 'you' : (c * 7 + r * 3) % 11 === 0 ? 'baby' : (c * 5 + r) % 13 === 0 ? 'grandma' : undefined);
      const sl = S.sliceAt != null ? t - S.sliceAt - (r * 0.07 + c * 0.012) : -1; if (sl > 0) { const u = ease.out(clamp(sl / 0.25)); g.fillStyle = GREEN; g.fillRect(x - 11, y + 14 - 3 * u, 22, 6 * u); g.fillStyle = '#F5F3EE'; g.fillRect(x - 2, y + 14 - 3 * u, 4, 6 * u); } g.restore(); }
    g.restore();
    if (S.youAt != null && t >= S.youAt) { const yy = Math.floor(S.you / cols), yc = S.you % cols, X = x0 + (yc + 0.5) * cw, Y = y0 + (yy + 0.5) * rh, u = ease.out(clamp((t - S.youAt) / 0.4)); g.strokeStyle = th.accent; g.lineWidth = 5; g.beginPath(); g.ellipse(X, Y + 4, 28 * (2 - u), 30 * (2 - u), 0, 0, 7); g.globalAlpha *= u; g.stroke(); g.globalAlpha = 1; const kk = pk(t, S.youAt + 0.1); g.save(); g.translate(X, Y - 62); g.scale(kk, kk); chip(g, 'YOU', 0, 0, 'accent', th, 34, 200, 1); g.restore(); }
    sub(g, 'EACH FIGURE ≈ 41 MILLION PEOPLE · 8.2 BILLION TOTAL', 540, 1044, th.paper, 20); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function samecheck(g, p, lt, t, th, S) {
    [['BABY', 'baby', 190, S.babyAt], ['GRANDMA', 'grandma', 540, S.grandAt], ['YOU', 'you', 890, S.youAt]].forEach(([nm, kind, x, at]) => { if (at == null || t < at) return; const k = pk(t, at); g.save(); g.translate(x, 800 + (1 - Math.min(1, k)) * 50); g.scale(0.88 + 0.12 * k, 0.88 + 0.12 * k); g.globalAlpha *= clamp((t - at) / 0.08); paper(g, -135, -205, 270, 410, 18, { lift: 0.5 }); g.fillStyle = th.navy; rr(g, -135, -205, 270, 52, 18); g.fill(); txt(g, nm, 0, -178, F.hero(36), th.gold); g.save(); g.translate(0, -30); person(g, 0, 20, 5.0, 0, kind); g.restore(); g.save(); g.translate(0, 125); check(g, 230, 108, th, '$2,451', {}); g.restore(); g.restore(); });
    if (S.eqAt != null && t >= S.eqAt) chip(g, 'THE SAME CHECK', 540, 1050, 'accent', th, 46, 800, pk(t, S.eqAt)); tagsOf(g, S, t, th); }
  function check_(g, p, lt, t, th, S) {
    enter(g, t, S.at, 540, 790); const v = Math.round(2451 * ease.out(clamp((t - (S.numAt ?? S.at)) / 1.0)));
    check(g, 860, 400, th, t < (S.numAt ?? S.at) ? '$ ? ? ?' : '$' + fmt(v), { head: 'THE SPLIT · ONE CHECK', to: 'YOU', memo: 'BILLIONAIRE LIST ÷ 8.2 BILLION' });
    if (S.stampAt != null) stamp(g, S.stampText || 'ONE TIME ONLY', 250, 172, 'bad', th, 46, -0.07, pk(t, S.stampAt)); sub(g, S.note || 'ABOUT $2,450', 0, 250, th.paper, 26); g.restore(); bottomChip(g, S, t, th); }
  function once(g, p, lt, t, th, S) {
    enter(g, t, S.at, 540, 800); const cols = 12, tw = 72, x0 = -cols * tw / 2; for (let r = 0; r < 2; r++) for (let c = 0; c < cols; c++) { const x = x0 + c * tw + 4, y = -150 + r * 100, first = r === 0 && c === 0; clay(g, x, y, tw - 8, 84, 10, first ? '#d8efe2' : 'rgba(245,243,238,.12)', { shadowK: first ? 0.4 : 0 }); if (first) { g.save(); g.translate(x + (tw - 8) / 2, y + 42); check(g, 56, 34, th, '$', {}); g.restore(); } else { g.strokeStyle = 'rgba(245,243,238,.35)'; g.lineWidth = 3; g.setLineDash([6, 6]); rr(g, x, y, tw - 8, 84, 10); g.stroke(); g.setLineDash([]); txt(g, '$0', x + (tw - 8) / 2, y + 42, F.hero(26), 'rgba(245,243,238,.5)'); } }
    sub(g, 'MONTH 1', x0 + 4 + 32, -166, th.paper, 14); sub(g, '24 MONTHS · 2 YEARS', 0, 66, th.paper, 20);
    const a = t - (S.onceAt ?? S.at + 0.3); if (a > 0) { const k = pk(t, S.onceAt ?? S.at + 0.3); g.save(); g.translate(0, 150); g.scale(0.8 + 0.2 * k, 0.8 + 0.2 * k); stk(g, 'ONE TIME', 0, 0, F.hero(110), th.good, 'center', 14); g.restore(); }
    g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function vs(g, p, lt, t, th, S) { // $1,000,000 vs $2,451
    enter(g, t, S.at, 540, 800); paper(g, -440, -215, 880, 430, 18, { lift: 0.5 }); const H = 270, base = 150;
    const kb = S.bigAt != null ? clamp((t - S.bigAt) / 0.7) : 1; clay(g, -300, base - H * ease.out(kb), 220, H * ease.out(kb), 12, GOLDC, { shadowK: 0.4 }); if (kb > 0.9) { txt(g, '$1,000,000', -190, base - H - 36, F.hero(46), '#B88700'); txt(g, 'A MILLIONAIRE', -190, base + 32, F.monoX(20), th.inkSoft); }
    const ks = S.smallAt != null ? clamp((t - S.smallAt) / 0.4) : 0; if (ks > 0) { g.fillStyle = th.bad; g.fillRect(100, base - 3 * ks, 220, 3 * ks); txt(g, '$2,451', 210, base - 30, F.hero(46), th.badInk); txt(g, 'YOUR CHECK', 210, base + 32, F.monoX(20), th.inkSoft); const u = ease.out(clamp((t - S.smallAt - 0.3) / 0.4)); g.save(); g.globalAlpha *= u; g.strokeStyle = th.bad; g.lineWidth = 4; g.beginPath(); g.arc(210, base - 2, 58 * (2 - u), 0, 7); g.stroke(); g.restore(); txt(g, '0.25% OF A MILLION', 210, base - 100, F.hero(30), th.badInk); }
    g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function sandwich(g, x, y, s) { g.save(); g.translate(x, y); g.scale(s, s); g.strokeStyle = '#0B0F14'; g.lineWidth = 4; g.fillStyle = '#D9A441'; g.beginPath(); g.ellipse(0, -30, 70, 26, 0, Math.PI, 0); g.fill(); g.stroke(); g.fillStyle = '#4CAF50'; g.beginPath(); g.moveTo(-72, -30); for (let i = 0; i < 8; i++) g.lineTo(-72 + i * 20 + 10, -22 + (i % 2) * 8); g.lineTo(72, -30); g.closePath(); g.fill(); g.stroke(); g.fillStyle = '#E0281E'; rr(g, -66, -20, 132, 12, 4); g.fill(); g.stroke(); g.fillStyle = '#F2A0A0'; rr(g, -68, -8, 136, 12, 4); g.fill(); g.stroke(); g.fillStyle = '#D9A441'; rr(g, -70, 4, 140, 22, 10); g.fill(); g.stroke(); g.restore(); }
  function perday(g, p, lt, t, th, S) {
    enter(g, t, S.at, 540, 810); paper(g, -440, -225, 880, 450, 18, { lift: 0.5 }); const u = ease.inOut(clamp((t - S.gridAt) / (S.dur || 2.4))), cols = 73, cw = 11.2, x0 = -cols * cw / 2;
    sub(g, 'ONE YEAR · 365 DAYS · ONE CHECK SPREAD OUT', 0, -190, th.inkSoft, 22);
    for (let i = 0; i < 365; i++) { const c = i % cols, r = Math.floor(i / cols), lit = i < 365 * u; g.fillStyle = lit ? 'rgba(11,15,20,.1)' : GREEN; g.fillRect(x0 + c * cw + 1, -160 + r * 13, cw - 2, 11); }
    const left = Math.round(2451 * (1 - u)); txt(g, '$6.72', -230, -20, F.hero(150), th.badInk); txt(g, 'A DAY', -230, 70, F.hero(66), th.ink); g.save(); g.translate(250, 20); const k = pk(t, S.sandAt ?? S.at + 0.5); g.scale(k, k); sandwich(g, 0, 0, 1.5); g.restore();
    sub(g, 'LEFT IN YOUR CHECK: $' + fmt(left), 0, 160, th.inkSoft, 28); if (S.goneAt != null && t >= S.goneAt) stamp(g, 'THEN IT’S GONE', 0, 165, 'bad', th, 56, -0.06, pk(t, S.goneAt));
    g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function growth(g, p, lt, t, th, S) {
    enter(g, t, S.at, 540, 805); paper(g, -440, -225, 880, 450, 18, { lift: 0.5 }); const bh = 15, n = 20, base = 190; const ga = S.growAt != null ? clamp((t - S.growAt) / 0.8) : 0;
    for (let i = 0; i < 16; i++) { clay(g, -380, base - (i + 1) * (bh + 2), 250, bh, 4, GREEN, { shadowK: 0.15 }); }
    for (let i = 16; i < n; i++) { const q = clamp((ga * 4 - (i - 16))); if (q <= 0) continue; g.save(); g.globalAlpha *= q; clay(g, -380, base - (i + 1) * (bh + 2) - (1 - q) * 30, 250, bh, 4, GOLDC, { shadowK: 0.2 }); g.restore(); }
    txt(g, '$16.1T', -255, base + 28, F.monoX(22), th.inkSoft); if (ga > 0.9) { txt(g, '+$4 TRILLION', -105, -150, F.hero(46), '#B88700', 'left'); sub(g, 'IN ONE YEAR', -105, -112, th.inkSoft, 22, 'left'); }
    const ca = t - (S.checkAt ?? 9999); if (ca > 0) { const k = pk(t, S.checkAt); g.save(); g.translate(250, 40); g.scale(0.7 + 0.3 * k, 0.7 + 0.3 * k); g.globalAlpha *= clamp(ca / 0.08); check(g, 360, 175, th, '$488', { head: 'JUST THE GROWTH', memo: '$4T ÷ 8.2B' }); sub(g, 'EACH PERSON', 0, 125, th.inkSoft, 26); g.restore(); }
    g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function ratio(g, p, lt, t, th, S) {
    enter(g, t, S.at, 540, 805); paper(g, -440, -225, 880, 450, 18, { lift: 0.5 }); g.save(); g.translate(-270, 10); pile(g, 0, 110, 0.6); sub(g, 'ONE AVERAGE BILLIONAIRE', 0, -90, th.inkSoft, 17); txt(g, '$5.9B', 0, 160, F.hero(76), th.badInk); g.restore();
    const u = ease.inOut(clamp((t - (S.gridAt ?? S.at + 0.5)) / (S.dur || 1.8))), cols = 24, rows = 10, cw = 17.5, rh = 15; for (let i = 0; i < 240; i++) { const c = i % cols, r = Math.floor(i / cols), lit = i < 240 * u; g.fillStyle = lit ? '#e6f4ec' : 'rgba(11,15,20,.08)'; g.strokeStyle = lit ? '#2f6f4f' : 'rgba(0,0,0,0)'; g.lineWidth = 1.5; g.fillRect(-45 + c * cw + 1, -150 + r * (rh + 2), cw - 3, rh); if (lit) g.strokeRect(-45 + c * cw + 1, -150 + r * (rh + 2), cw - 3, rh); }
    txt(g, fmt(Math.round(2.4 * u * 10) / 10, 1) + ' MILLION CHECKS', 165, 100, F.hero(fit('2.4 MILLION CHECKS', F.hero, 410, 62)), th.ink); sub(g, 'EACH SQUARE = 10,000 CHECKS OF $2,451', 165, 150, th.inkSoft, 15);
    g.restore(); tagsOf(g, S, t, th); bottomChip(g, S, t, th); }
  function ask(g, p, lt, t, th, S) {
    const k = spring(lt, 'bouncy'); g.save(); g.translate(540, 800); g.scale(0.7 + 0.3 * Math.min(1.06, k), 0.7 + 0.3 * Math.min(1.06, k)); g.globalAlpha *= clamp(k * 2);
    const sz = Math.min(fit(S.l1, F.hero, 900, 112), fit(S.l2, F.hero, 900, 112)); stk(g, S.l1, 0, -62, F.hero(sz), th.accent, 'center', 16); stk(g, S.l2, 0, 62, F.hero(sz), th.good, 'center', 16); g.restore(); }
  const SC = { pile: pile_, assumes, trillion, people, samecheck, check: check_, once, vs, perday, growth, ratio, ask };
  Object.assign(window.BQ.h, { fit, stk, chip, label, mw });
  // ---------- the stage ----------
  const val = (v, t) => { if (v && typeof v === 'object') { const u = ease.out(clamp((t - v.at) / (v.dur || 1))), x = lerp(v.from || 0, v.to, u); return (v.pre || '') + fmt(v.dec ? x : Math.round(x), v.dec || 0) + (v.suf || ''); } return v; };
  B.register('bstage', {
    defaults: { C: [], scenes: [], hook: null, hideCounter: [], beats: [], notes: [] }, ownEnter: true, size: () => [1080, 1920],
    draw(g, p, env) {
      const { t, theme: th } = env; g.translate(-540, -960);
      let bl = ''; for (const b of p.beats) if (t >= b[0]) bl = b[1]; if (bl) { const k = spring(t - (p.beats.find(b => b[1] === bl)[0]), 'snappy'); g.save(); g.globalAlpha *= clamp(k * 2); label(g, bl, 990, 264, th.accent, 26, 'right'); g.restore(); }
      let seg = p.C[0]; for (const s of p.C) if (t >= s.from) seg = s; const hid = p.hideCounter.some(([a, b]) => t >= a && t < b), segT = t - seg.from, pop = 1 + 0.05 * hit(Math.min(0.5, Math.max(0, segT)), 8);
      if (!hid) {
        g.save(); g.translate(540, 437); g.scale(pop, pop); g.translate(-540, -437); paper(g, 70, 322, 940, 230, 26, { lift: 0.3 });
        const L = [seg.L[0], val(seg.L[1], t)], R = [seg.R[0], val(seg.R[1], t)]; g.fillStyle = 'rgba(11,15,20,.14)'; rr(g, 98, 344, 884, 22, 11); g.fill();
        label(g, L[0], 100, 398, th.inkSoft, 26, 'left'); label(g, R[0], 980, 398, th.inkSoft, 26, 'right');
        const sL = fit(L[1], F.hero, 430, 118, 40), sR = fit(R[1], F.hero, 430, 118, 40), cc = c => c === 'bad' ? th.badInk : c === 'good' ? '#0E9F55' : c === 'gold' ? '#B88700' : th.ink;
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
    },
  });
  B.register('hypo', {
    defaults: { text: 'HYPOTHETICAL' }, ownEnter: true, size: () => [10, 10],
    draw(g, p, env) { const s = p.text, f = F.monoX(21), w = mw(s, f) + 36; g.globalAlpha *= 0.9; g.fillStyle = 'rgba(11,15,20,.78)'; rr(g, -w / 2, -18, w, 36, 18); g.fill(); g.strokeStyle = env.theme.accent; g.lineWidth = 2; rr(g, -w / 2, -18, w, 36, 18); g.stroke(); txt(g, s, 0, 1, f, env.theme.accent); },
  });
})();
