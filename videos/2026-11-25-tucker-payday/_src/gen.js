// ===== Tucker payday — CRIME-SHOW generator (RULES 112). One story, three cuts: each cut passes a cfg of word refs (cfg.R) + order. =====
// Appended after: shared.js (loanbox, paycal, rate, crowd, car, verdict, ticks, renew, heart/plane/mag...), wine_bits.js, shared2.js (hud), crime.js (suspect, board, victim, datecard, tile)
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, burst, hit } = B;
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };

  // ---------- claw: a crane claw drops on a payday tile of the paycheck calendar and lifts the $150 away (world overlay, same centre as paycal) ----------
  B.register('claw', {
    defaults: { w: 800, h: 940, grabs: [], fee: 150 }, ownEnter: true, size: p => [p.w, p.h],
    draw(g, p, env) {
      const { t, theme } = env, x0 = -p.w / 2, y0 = -p.h / 2;
      p.grabs.forEach((gt, i) => {
        const o = t - gt; if (o < -0.05 || o > 1.1) return;
        const tx = x0 + 40 + (i % 3) * 250 + 110, ty = y0 + 160 + Math.floor(i / 3) * 250 + 140;
        const down = ease.out(lin(o, -0.05, 0.28)), up = ease.in(lin(o, 0.5, 1.05)), k = down - up, top = y0 + 130, cy = lerp(top, ty - 40, k);
        g.save(); g.globalAlpha = clamp((o + 0.05) / 0.08) * clamp((1.1 - o) / 0.15);
        g.strokeStyle = '#0B0F14'; g.lineWidth = 8; g.beginPath(); g.moveTo(tx, top - 60); g.lineTo(tx, cy - 30); g.stroke();
        const open = o < 0.3 ? 1 : 0.15;
        g.translate(tx, cy); g.fillStyle = '#59647a'; g.strokeStyle = '#0B0F14'; g.lineWidth = 5; rr(g, -26, -34, 52, 34, 8); g.fill(); g.stroke();
        for (const s of [-1, 1]) { g.save(); g.rotate(s * 0.55 * open + s * 0.1); g.fillStyle = '#C9CED6'; g.beginPath(); g.moveTo(s * 6, -4); g.quadraticCurveTo(s * 52, 8, s * 30, 52); g.lineTo(s * 20, 46); g.quadraticCurveTo(s * 34, 12, s * 2, 8); g.closePath(); g.fill(); g.stroke(); g.restore(); }
        if (o > 0.28) { g.save(); g.translate(0, 48); g.rotate(-0.05); clay(g, -64, -26, 128, 52, 8, theme.good || '#00A152', { shadowK: 0.3 }); txt(g, '$' + p.fee, 0, 0, F.hero(34), theme.paper); g.restore(); }
        g.restore();
      });
    },
  });

  // ---------- tribe: the "shield" claim: OWNED BY A TRIBE -> STATES CAN'T SUE -> cracked, SHAM (prosecutors) ----------
  B.register('tribe', {
    defaults: { w: 860, h: 920, claimAt: 99999, sueAt: 99999, crackAt: 99999, shamAt: 99999 }, size: p => [p.w, p.h],
    anchors: p => ({ shield: [0, -40, 520, 560], sham: [0, 270, 700, 220], head: [0, -p.h / 2 + 65, p.w, 130] }),
    draw(g, p, env) {
      const { t, theme, lift } = env; p.in0 = t - env.lt; const w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift });
      g.save(); rr(g, x0, y0, w, h, 26); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 124); g.restore();
      txt(g, 'THE "SHIELD"', x0 + 40, y0 + 62, F.hero(66), theme.paper, 'left'); txt(g, 'HIS CLAIM', x0 + w - 34, y0 + 32, F.mono(20), 'rgba(245,243,238,.75)', 'right');
      if (t < p.claimAt + 0.15) { const fa = clamp((p.claimAt + 0.15 - t) / 0.2) * clamp((t - p.in0) / 0.15); g.save(); g.globalAlpha = fa; txt(g, 'STATES', 0, -140, F.hero(130), theme.ink); txt(g, 'COME AFTER HIS LOANS', 0, -50, F.cap(38), theme.inkSoft);
        for (let i = 0; i < 3; i++) { const o = clamp((t - p.in0 - 0.25 - i * 0.18) / 0.2), k2 = spring(Math.max(0, t - p.in0 - 0.25 - i * 0.18), 'snappy'); if (o <= 0) continue; g.save(); g.translate(-230 + i * 230, 90 + (1 - k2) * 40); g.rotate((i - 1) * 0.07); g.globalAlpha *= o; paper(g, -90, -60, 180, 120, 10, { lift: 0.4 }); txt(g, 'LAWSUIT', 0, -18, F.cap(24), theme.badInk); g.fillStyle = theme.rule; for (let j = 0; j < 3; j++) g.fillRect(-64, 6 + j * 16, 128, 6); g.restore(); } g.restore(); }
      const ck = t >= p.claimAt ? spring(t - p.claimAt, 'heavy') : 0, cr = ease.out(lin(t, p.crackAt, p.crackAt + 0.3));
      g.save(); g.translate(0, -50 + (1 - ck) * -160); g.globalAlpha = clamp((t - p.claimAt) / 0.1 + (t >= p.claimAt ? 0 : -9));
      const sh = () => { g.beginPath(); g.moveTo(-170, -190); g.quadraticCurveTo(0, -240, 170, -190); g.lineTo(170, 20); g.quadraticCurveTo(160, 150, 0, 240); g.quadraticCurveTo(-160, 150, -170, 20); g.closePath(); };
      B.shadowed(g, sh, '#1E7D4F', 0.5); const lg = g.createLinearGradient(-170, -200, 170, 240); lg.addColorStop(0, '#2FB872'); lg.addColorStop(1, '#16603B'); g.fillStyle = lg; sh(); g.fill(); g.strokeStyle = '#0B0F14'; g.lineWidth = 8; g.stroke();
      g.strokeStyle = 'rgba(255,255,255,.35)'; g.lineWidth = 6; g.beginPath(); g.moveTo(-136, -160); g.quadraticCurveTo(0, -200, 136, -160); g.stroke();
      txt(g, 'OWNED BY', 0, -86, F.cap(34), theme.paper); txt(g, 'A TRIBE', 0, -20, F.hero(86), theme.paper); txt(g, '(HIS CLAIM)', 0, 52, F.mono(24), 'rgba(245,243,238,.85)');
      if (cr > 0) { g.save(); sh(); g.clip(); g.strokeStyle = '#0B0F14'; g.lineWidth = 11; g.lineJoin = 'round'; g.lineCap = 'round'; const pts = [[-30, -200], [-6, -110], [-40, -50], [8, 20], [-24, 90], [30, 160], [10, 240]], n = Math.max(2, Math.floor(pts.length * cr)); g.beginPath(); pts.slice(0, n).forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.stroke(); g.restore(); }
      g.restore();
      { const o = t - p.sueAt; if (o > 0) { const k = spring(o, 'snappy'); g.save(); g.globalAlpha = clamp(o / 0.1); g.translate(0, y0 + h - 120 + (1 - k) * 30); txt(g, "STATES CAN'T SUE TRIBES", 0, 0, F.hero(52), theme.ink); g.restore(); } }
      { const o = t - p.shamAt; if (o > 0) { const sc = 1 + 1.2 * (1 - ease.expo(clamp(o / 0.2))); g.save(); g.globalAlpha = clamp(o / 0.06); g.translate(0, 190); g.rotate(-0.08); g.scale(sc, sc); const W = 560; paper(g, -W / 2, -78, W, 156, 14, { fill: theme.paper, lift: 0.5 }); g.strokeStyle = theme.badInk; g.lineWidth = 8; rr(g, -W / 2 + 10, -68, W - 20, 136, 10); g.stroke(); txt(g, 'A SHAM', 0, -8, F.hero(110), theme.badInk); txt(g, 'PROSECUTORS SAID', 0, 54, F.mono(22), theme.inkSoft); g.restore(); } }
    },
  });

  // ============================================================== scene builder ==============================================================
  const SB = 'side-by-side', GH = 'graphic-hero', ZN = 'zoom-on-number', PF = 'presenter-front', PK = 'peek', PB = 'pull-back';
  const PHOTO = 'brand/photos/scott-tucker/1.jpg';
  const SUS = { src: PHOTO, crop: [0, 0, 1, 1], fx: 0.5, fy: 0.34, aspect: 1.22 };
  const NAME = { name: 'SCOTT TUCKER', nick: '“THE PAYDAY LENDER”' };
  const CRED = 'PHOTO: LEVEL 5 MOTORSPORTS · CC BY-SA 2.0';
  const STK = { x: 915, y: 1385, s: 0.95 };

  window.TUCKER = function (cfg) {
    const R = cfg.R, E = [], T = [], S = [], HL = [], HI = [], SH = [], PO = [];
    const stn = i => [(i % 6) * 1950, Math.floor(i / 6) * 1950];
    let si = 1; const seg = () => { const o = stn(si); si++; return o; };
    const b = (at, beat, focus, o = {}) => T.push(Object.assign({ at, beat, focus }, o));
    const sfx = (at, name, gain = -9, dur = 0.5) => S.push({ at, name, gain, dur });
    const bad = s => [[s, 'bad']];
    const O = (r, d) => { d = parseFloat(d); if (typeof r === 'number') return r + d; const m = String(r).match(/^(.*?)([+-]\d*\.?\d+)?$/), q = (m[2] ? parseFloat(m[2]) : 0) + d; return m[1] + (q ? (q > 0 ? '+' : '') + (+q.toFixed(3)) : ''); };

    // ---- S0 frame 0 (loop target) ----
    E.push({ id: 'hook', type: 'text', at: [0, -400], in: -1, out: R.hookEnd, props: { lines: cfg.hook.lines, size: cfg.hook.size || 92 } });
    E.push({ id: 'hook2', type: 'text', at: [0, -400], in: R.loopIn, props: { lines: cfg.hook.lines, size: cfg.hook.size || 92 } });
    E.push({ id: 'sus0', type: 'suspect', at: [0, 190], in: -1, props: Object.assign({}, SUS, NAME, { w: 440, flash: false, tilt: -0.02, credit: CRED, ring: R.hookRing || 99999 }) });
    E.push({ id: 'tl0', type: 'tile', at: [370, 420], in: -1, props: { icon: 'cash', caption: cfg.hook.tile, w: 250, h: 280, cap: 30, tilt: 0.06 } });
    const F0 = ['hook', 'sus0', 'tl0'];
    b(0, SB, F0, { sx: 540, sy: 880, fill: 0.98, maxH: 900, st: STK, pose: 'shock' });
    cfg.hookBeats.forEach(([at, extra]) => b(at, ZN, extra.focus || F0, Object.assign({ fill: 1.0, maxH: 900, sx: 540, sy: 880, st: STK, dur: 0.45 }, extra)));
    sfx(0, 'deep_boom_2', -3); sfx(0.05, 'camera_shutter_1', -8, 0.4); sfx(0.1, 'paper_slam_2', -7);

    // ---- WHO ----
    { const [x, y] = seg();
      E.push({ id: 'mug', type: 'suspect', at: [x, y + 20], in: O(R.who, '-0.3'), props: Object.assign({}, SUS, NAME, { variant: 'card', file: true, caseNo: 'CASE FILE Nº 027', w: 480, credit: CRED, tilt: -0.03, push: { at: R.who, dur: 5.0, to: 1.3 }, stringTo: [690, 330], stringAt: R.whoString, ring: R.whoRing }) });
      E.push({ id: 'ol', type: 'text', at: [x + 720, y + 10], in: R.onlineIn, props: { lines: [[['ONLINE', 'paper']], [['PAYDAY', 'gold']], [['LOANS', 'paper']]], size: 100 } });
      E.push({ id: 'dc1', type: 'datecard', layer: 'screen', at: [340, 480], in: O(R.who, '-0.1'), out: O(R.who, '+0.7'), props: { kicker: 'CASE FILE Nº 027 · THE LOANS', big: 'KANSAS', small: 'ONLINE PAYDAY LOANS' } });
      b(R.who, SB, 'mug', { move: 'whip', sx: 540, sy: 960, fill: 0.62, maxH: 700, st: { x: 930, y: 1390, s: 0.85 }, pose: 'shrug' });
      b(R.whoName, ZN, 'mug', { fill: 0.7, maxH: 760, sy: 930, st: 'corner', pose: 'point', dur: 0.5 });
      b(R.onlineIn, SB, ['mug', 'ol'], { sx: 540, sy: 840, fill: 0.95, maxH: 1000, st: 'corner', pose: 'shock', dur: 0.8 });
      sfx(R.who, 'camera_shutter_2', -8, 0.4); sfx(O(R.who, '+0.2'), 'paper_slam_2', -10); sfx(R.onlineIn, 'typewriter_2', -12, 0.8); }

    // ---- WHAT'S A PAYDAY LOAN ----
    { const [x, y] = seg();
      E.push({ id: 'bor', type: 'victim', at: [x - 320, y], in: O(R.def, '-0.3'), props: { kind: 'diner', label: 'THE BORROWER', sub: 'NEEDS CASH TILL PAYDAY', labelSize: 40, reactAt: R.defPay, w: 400, h: 500, tape: 'BORROWER' } });
      E.push({ id: 'dtx', type: 'text', at: [x + 330, y - 10], in: R.def, props: { lines: [[['A SMALL LOAN', 'gold']], [['PAID BACK ON', 'paper']], [['YOUR NEXT', 'paper']], [['PAYDAY', 'gold']]], size: 66, per: 0.1 } });
      b(R.def, SB, ['bor', 'dtx'], { move: 'whip', sx: 540, sy: 860, fill: 0.95, maxH: 860, st: 'left', pose: 'point' });
      b(R.defLoan, ZN, ['bor', 'dtx'], { fill: 0.9, maxH: 900, sy: 860, st: 'corner', pose: 'point', dur: 0.5 });
      b(R.defPay, GH, ['bor', 'dtx'], { fill: 0.95, maxH: 860, sy: 860, st: 'corner-left', pose: 'talk', dur: 0.7 });
      if (R.defMid) b(R.defMid, GH, ['bor', 'dtx'], { sx: 520, fill: 0.86, maxH: 860, sy: 860, st: 'corner-left', pose: 'chin', dur: 0.8 });
      if (R.defExtra) b(R.defExtra, ZN, 'bor', { fill: 0.5, maxH: 700, sy: 880, st: 'corner', pose: 'shrug', dur: 0.5 });
      sfx(R.def, 'swipe_2', -11, 0.4); sfx(R.defLoan, 'pop_1', -9, 0.4); }

    // ---- THE PITCH (paperwork box) ----
    { const [x, y] = seg();
      E.push({ id: 'lb', type: 'loanbox', at: [x, y], in: O(R.pitch, '-0.4'), props: { at: 99999, amountAt: R.borrow, totalAt: R.p650 } });
      E.push({ id: 'pip1', type: 'suspect', layer: 'screen', at: [880, 1130], in: O(R.pitch, '-0.3'), out: R.p650, props: Object.assign({}, SUS, { variant: 'pip', w: 200, aspect: 1.0, label: 'HIS FORM', flash: true, tilt: 0.03, arrow: { at: O(R.pitch, '+0.2'), to: [-400, -330] } }) });
      b(R.pitch, GH, 'lb', { move: 'whip', sx: 430, sy: 830, fill: 0.66, maxH: 800, st: 'corner-left', pose: 'point' });
      b(R.borrow, ZN, 'lb.amount', { sx: 430, fill: 0.7, maxH: 300, sy: 760, st: 'corner-left', dur: 0.45 });
      b(R.p650, ZN, 'lb.total', { sx: 430, fill: 0.72, maxH: 460, sy: 980, st: 'corner-left', pose: 'shock', dur: 0.5 });
      b(O(R.p650, '+0.9'), PB, 'lb', { sx: 430, fill: 0.66, maxH: 800, sy: 830, st: 'corner', dur: 0.7 });
      sfx(R.pitch, 'paper_slam_2', -10); sfx(R.borrow, 'pop_2', -9, 0.3); sfx(R.p650, 'ding_2', -9, 0.7); }

    // ---- THE TRICK: auto-renew ----
    { const [x, y] = seg();
      E.push({ id: 'rn', type: 'renew', at: [x, y], in: O(R.trick, '-0.4'), props: { at: R.renewed } });
      b(R.trick, SB, 'rn', { move: 'whip', sx: 540, sy: 850, fill: 0.74, maxH: 800, st: 'corner-left', pose: 'point' });
      b(R.renewed, ZN, 'rn', { fill: 0.85, maxH: 700, sy: 850, st: 'corner-left', pose: 'shock', dur: 0.5 });
      b(R.every, GH, 'rn', { fill: 0.78, maxH: 800, sy: 850, st: 'corner', pose: 'talk', dur: 0.8 });
      sfx(R.trick, 'paper_slam_2', -10); sfx(R.renewed, 'swoosh_2', -10, 0.9); }

    // ---- THE TRICK: the claw takes $150 every payday, the $500 never moves ----
    { const [x, y] = seg();
      E.push({ id: 'pc', type: 'paycal', at: [x, y], in: O(R.cal, '-0.5'), props: { paydays: R.pd, owedAt: [R.never, R.neverB || R.never], neverAt: R.never } });
      E.push({ id: 'cw', type: 'claw', at: [x, y], in: O(R.cal, '-0.5'), props: { grabs: R.pd } });
      E.push({ id: 'pipc', type: 'suspect', layer: 'screen', at: [880, 1130], in: R.cal, out: R.fee, props: Object.assign({}, SUS, { variant: 'pip', w: 200, aspect: 1.0, label: 'HIS FEES', flash: true, tilt: 0.03, arrow: { at: O(R.cal, '+0.3'), to: [-420, -300] } }) });
      b(R.cal, SB, 'pc', { move: 'whip', sx: 450, sy: 820, fill: 0.66, maxH: 930, st: 'corner-left', pose: 'point' });
      b(R.fee, ZN, 'pc', { sx: 540, fill: 0.8, maxH: 880, sy: 860, st: 'corner-left', dur: 0.5 });
      b(R.pdEnd, PB, 'pc', { fill: 0.72, maxH: 880, sx: 540, sy: 860, st: 'corner-left', dur: 0.8 });
      b(R.never, ZN, 'pc', { fill: 0.86, maxH: 880, sy: 860, st: 'corner', pose: 'shock', dur: 0.6 });
      b(R.neverEnd, GH, 'pc', { fill: 0.72, maxH: 880, sx: 540, sy: 860, st: 'corner-left', dur: 0.8 });
      R.pd.forEach(p => sfx(p, 'thud_1', -10, 0.4)); sfx(R.fee, 'coin_single_2', -10, 0.6); sfx(R.never, 'rubber_stamp_2', -5); sfx(R.never, 'deep_boom_2', -8, 0.4); }

    // ---- RENT ON YOUR OWN DEBT ----
    { const [x, y] = seg();
      E.push({ id: 'rb', type: 'victim', at: [x - 320, y + 10], in: O(R.rent, '-0.4'), props: { kind: 'diner', label: 'THE BORROWER', sub: 'EVERY 2 WEEKS', labelSize: 40, reactAt: R.rentWord, w: 400, h: 500, tape: 'BORROWER' } });
      E.push({ id: 'rtx', type: 'text', at: [x + 330, y], in: R.rent, props: { lines: [[['RENT', 'bad']], [['ON YOUR', 'paper']], [['OWN DEBT', 'gold']]], size: 92, per: 0.12 } });
      b(R.rent, SB, ['rb', 'rtx'], { move: 'whip', sx: 540, sy: 860, fill: 0.95, maxH: 860, st: 'left', pose: 'you' });
      b(R.rentWord, ZN, ['rb', 'rtx'], { fill: 0.9, maxH: 900, sy: 860, st: 'corner', pose: 'point', dur: 0.5 });
      sfx(R.rent, 'swipe_2', -11, 0.4); sfx(R.rentWord, 'thud_1', -8, 0.4); }

    // ---- ONE BORROWER PAID $1,925 (the box rolls up) ----
    { const [x, y] = seg();
      E.push({ id: 'lb2', type: 'loanbox', at: [x - 100, y], in: O(R.doj, '-0.4'), props: { from: 650, to: 1925, at: R.dojNum, dur: 1.4, amountAt: R.doj, totalAt: O(R.doj, '+0.2'), head: 'LOAN DISCLOSURE' } });
      E.push({ id: 'sp2', type: 'suspect', at: [x + 560, y + 250], in: R.doj, props: Object.assign({}, SUS, { variant: 'pip', w: 230, aspect: 1.0, label: 'HIS LOAN', flash: true, tilt: 0.04, arrow: { at: O(R.doj, '+0.2'), to: [-300, -160] } }) });
      b(R.doj, SB, ['lb2', 'sp2'], { move: 'whip', sx: 560, sy: 840, fill: 0.9, maxH: 900, st: 'corner-left', pose: 'point' });
      b(R.dojNum, ZN, 'lb2.total', { fill: 0.7, maxH: 520, sy: 990, st: 'corner-left', pose: 'shock', dur: 0.5, lead: 0.1 });
      b(O(R.dojNum, '+1.5'), PB, ['lb2', 'sp2'], { fill: 0.86, maxH: 900, sx: 560, sy: 840, st: 'corner', dur: 0.7 });
      sfx(R.doj, 'paper_slam_2', -10); sfx(R.dojNum, 'money_counter_1', -10, 1.5); sfx(O(R.dojNum, '+1.4'), 'cash_register_1', -8, 0.9); SH.push([O(R.dojNum, '+1.4'), 10]); }

    // ---- ~700% ----
    { const [x, y] = seg();
      E.push({ id: 'rt', type: 'rate', at: [x, y], in: O(R.rate, '-0.4'), props: { at: R.p700 } });
      b(R.rate, SB, 'rt', { move: 'whip', sx: 540, sy: 840, fill: 0.84, maxH: 800, st: 'corner-left', pose: 'point' });
      b(R.p700, ZN, 'rt.hero', { fill: 0.7, maxH: 520, sy: 840, st: 'corner-left', pose: 'shock', dur: 0.5 });
      if (R.rateAfter) b(R.rateAfter, PF, 'rt', { sy: 820, pose: 'talk' });
      sfx(R.rate, 'paper_slam_2', -10); sfx(R.p700, 'cinematic_hit_1', -8, 0.8); SH.push([O(R.p700, '+1.0'), 10]); }

    // ---- 4.5 MILLION ----
    { const [x, y] = seg();
      E.push({ id: 'cr', type: 'crowd', at: [x, y], in: O(R.crowd, '-0.4'), props: { at: R.four, dur: 1.0, gridAt: O(R.four, '+0.6'), gridDur: 1.1 } });
      b(R.crowd, GH, 'cr', { move: 'whip', sy: 920, fill: 0.84, maxH: 880, st: 'corner-left', pose: 'point' });
      b(R.four, ZN, 'cr.borrowers', { fill: 0.8, sy: 900, st: 'corner-left', pose: 'shock', dur: 0.5 });
      b(O(R.four, '+1.6'), PB, 'cr', { fill: 0.84, maxH: 880, sy: 920, st: 'corner', dur: 0.8 });
      sfx(R.crowd, 'paper_slam_2', -10); sfx(R.four, 'money_counter_1', -11, 1.0); sfx(O(R.four, '+1.0'), 'ding_2', -9, 0.7); }

    // ---- $3.5 BILLION ----
    { const [x, y] = seg();
      E.push({ id: 'rv', type: 'counter', at: [x, y - 60], in: O(R.rev, '-0.4'), props: { from: 0, to: 3.5, decimals: 1, prefix: '$', suffix: ' BILLION', at: R.rev3, dur: 1.3, size: 160, tone: 'bad', label: 'HIS BUSINESS MADE (OVER)', sub: '2008 → JUNE 2013 · PER DOJ', w: 900 } });
      E.push({ id: 'cs', type: 'cashStack', at: [x, y + 420], in: R.rev3, props: { count: 36, at: R.rev3, per: 0.04, each: 1, prefix: '', label: '' } });
      b(R.rev, SB, ['rv', 'cs'], { move: 'whip', sx: 540, sy: 820, fill: 0.9, maxH: 1000, st: 'corner-left', pose: 'point' });
      b(R.rev3, ZN, 'rv.value', { fill: 0.84, maxH: 560, sy: 940, st: 'corner-left', pose: 'shock', dur: 0.5 });
      b(O(R.rev3, '+1.8'), PB, ['rv', 'cs'], { fill: 0.88, maxH: 1000, sy: 820, st: 'corner', dur: 0.8 });
      sfx(R.rev, 'paper_slam_2', -10); sfx(R.rev3, 'money_counter_2', -10, 1.3); sfx(O(R.rev3, '+1.3'), 'cash_register_1', -8, 0.9); SH.push([O(R.rev3, '+1.3'), 10]); }

    // ---- RACE TEAM ----
    if (R.race0) { const [x, y] = seg();
      E.push({ id: 'car', type: 'car', at: [x, y], in: O(R.race0, '-0.4'), props: { driveAt: R.raceDrive, ownAt: R.raceOwn } });
      E.push({ id: 'spc', type: 'suspect', at: [x + 560, y + 330], in: R.race0, props: Object.assign({}, SUS, { variant: 'pip', w: 230, aspect: 1.0, label: 'HIS TEAM', flash: true, tilt: 0.04, arrow: { at: O(R.race0, '+0.3'), to: [-280, -150] } }) });
      b(R.race0, SB, ['car', 'spc'], { move: 'whip', sx: 560, sy: 840, fill: 0.9, maxH: 800, st: 'corner-left', pose: 'chin' });
      b(R.raceOwn, ZN, 'car.car', { fill: 0.8, maxH: 420, sy: 880, st: 'corner-left', pose: 'point', dur: 0.5 });
      b(O(R.raceOwn, '+0.6'), GH, ['car', 'spc'], { fill: 0.9, maxH: 800, sx: 560, sy: 840, st: 'corner', dur: 0.7 });
      sfx(R.race0, 'swoosh_2', -10, 0.9); sfx(R.raceDrive, 'riser_2', -14, 1.2); sfx(R.raceOwn, 'pop_1', -9, 0.4); }

    // ---- THE SHIELD ----
    { const [x, y] = seg();
      E.push({ id: 'tr', type: 'tribe', at: [x - 80, y], in: O(R.shield, '-0.4'), props: { claimAt: R.claimed, sueAt: R.sue, crackAt: O(R.shamAt, '-0.3'), shamAt: R.shamAt } });
      E.push({ id: 'sps', type: 'suspect', at: [x + 570, y + 300], in: R.shield, props: Object.assign({}, SUS, { variant: 'pip', w: 230, aspect: 1.0, label: 'HIS SHIELD', flash: true, tilt: 0.04, arrow: { at: O(R.shield, '+0.3'), to: [-300, -140] } }) });
      b(R.shield, SB, ['tr', 'sps'], { move: 'whip', sx: 540, sy: 860, fill: 0.9, maxH: 960, st: 'corner-left', pose: 'point' });
      b(R.claimed, ZN, 'tr', { fill: 0.84, maxH: 900, sy: 900, st: 'corner-left', pose: 'shock', dur: 0.5 });
      b(R.sue, ZN, 'tr', { fill: 0.86, maxH: 940, sy: 880, st: 'corner-left', pose: 'point', dur: 0.5 });
      b(R.shamAt, ZN, 'tr', { fill: 0.9, maxH: 940, sy: 900, st: 'corner-left', pose: 'shock', dur: 0.4 });
      if (!R.noShamPB) b(O(R.shamAt, '+1.0'), PB, ['tr', 'sps'], { fill: 0.9, maxH: 960, sx: 540, sy: 860, st: 'corner', dur: 0.7 });
      sfx(R.shield, 'paper_slam_2', -10); sfx(R.claimed, 'click_1', -8, 0.3); sfx(R.sue, 'pop_1', -9, 0.4); sfx(O(R.shamAt, '-0.3'), 'thud_1', -8, 0.4); sfx(R.shamAt, 'rubber_stamp_2', -5); SH.push([R.shamAt, 12]); }

    // ---- EVIDENCE BOARD ----
    { const [x, y] = seg(), bd = R.board;
      E.push({ id: 'board', type: 'board', at: [x, y], in: O(bd, '-0.4'), props: { title: 'EVIDENCE BOARD', caseNo: 'CASE FILE Nº 027', tightAt: R.boardTight, items: [
        { id: 'ph', k: 'photo', src: PHOTO, crop: [0, 0, 1, 1], fx: 0.5, fy: 0.34, x: 0, y: -280, w: 330, h: 410, name: 'SCOTT TUCKER', nameSize: 26, at: O(bd, '-0.2'), rot: -0.02, push: 0.3 },
        { id: 'n1', k: 'note', x: -300, y: 120, w: 270, h: 290, icon: 'cash', size: 40, lines: [['$1,925', 'bad']], at: O(bd, '+0.3'), rot: -0.05 },
        { id: 'n2', k: 'note', x: 0, y: 150, w: 270, h: 290, size: 46, lines: [['4.5M', 'bad'], ['BORROWERS', 'ink', 24]], at: O(bd, '+0.6'), rot: 0.03 },
        { id: 'n3', k: 'note', x: 300, y: 120, w: 270, h: 290, icon: 'cash', size: 40, lines: [['$3.5B', 'bad']], at: O(bd, '+0.9'), rot: 0.05 },
        { id: 'n4', k: 'note', x: 0, y: 440, w: 640, h: 270, size: 120, lines: [['SHAM', 'bad', 120]], at: O(bd, '+1.2'), rot: -0.02, stamp: { text: 'PROSECUTORS SAID', at: O(bd, '+1.5'), y: 82, size: 30, rot: -0.04 } } ],
        strings: [[0, 1, O(bd, '+0.5')], [0, 2, O(bd, '+0.8')], [0, 3, O(bd, '+1.1')], [0, 4, O(bd, '+1.4')], [1, 4, O(R.boardTight, '-0.2')], [2, 4, O(R.boardTight, '-0.1')], [3, 4, R.boardTight]] } });
      b(bd, PK, 'board', { move: 'whip', sy: 800, fill: 0.9, maxH: 860, pose: 'chin' });
      b(O(bd, '+0.9'), GH, 'board', { sy: 800, fill: 0.9, maxH: 860, st: 'corner-left', pose: 'point', dur: 0.7 });
      b(R.boardTight, PB, 'board', { fill: 0.86, maxH: 860, sy: 800, st: 'corner-left', dur: 0.6 });
      sfx(bd, 'paper_slam_2', -10); sfx(O(bd, '+0.3'), 'camera_shutter_1', -9, 0.4); sfx(R.boardTight, 'typewriter_1', -12, 1.0); }

    // ---- ARRESTED + VERDICT ----
    { const [x, y] = seg();
      E.push({ id: 'sa', type: 'suspect', at: [x - 380, y + 20], in: O(R.arrest, '-0.5'), out: R.jury, props: Object.assign({}, SUS, NAME, { w: 450, flash: true, tilt: -0.02, credit: CRED, mono: true, xmark: O(R.arrest, '+0.2'), stamps: [{ text: 'ARRESTED 2016', at: O(R.arrest, '+0.5'), size: 52, x: 0, y: 40, rot: -0.1 }] }) });
      E.push({ id: 'vd', type: 'verdict', at: [x + 420, y - 30], in: O(R.jury, '-0.5'), props: { guiltyAt: R.convicted, countsAt: R.c14, monthsAt: R.m200, subAt: R.y16 } });
      E.push({ id: 'tk', type: 'ticks', at: [x + 420, y + 440], in: O(R.jury, '-0.5'), out: O(R.m200, '-0.2'), props: { at: R.c14, dur: 0.9 } });
      E.push({ id: 'sv', type: 'suspect', at: [x - 380, y + 20], in: R.jury, props: Object.assign({}, SUS, NAME, { w: 450, flash: false, tilt: -0.02, credit: CRED, mono: true, stamps: [{ text: 'GUILTY', at: R.convicted, size: 74, x: 0, y: -30, rot: -0.1 }], bars: R.sentenced }) });
      b(R.arrest, SB, ['sa', 'vd', 'tk'], { move: 'whip', sx: 540, sy: 880, fill: 0.96, maxH: 1120, st: 'corner', pose: 'shock' });
      b(O(R.arrest, '+0.7'), ZN, 'sa', { fill: 0.6, maxH: 700, sy: 870, st: 'corner', pose: 'shock', dur: 0.5 });
      b(R.jury, SB, ['sv', 'vd', 'tk'], { sx: 540, sy: 880, fill: 0.96, maxH: 1120, st: 'corner', pose: 'point', dur: 0.8 });
      b(R.convicted, ZN, 'vd', { fill: 0.84, maxH: 900, sy: 940, st: 'corner-left', pose: 'shock', dur: 0.45 });
      b(R.c14, GH, ['vd', 'tk'], { fill: 0.82, maxH: 900, sy: 940, st: 'corner-left', pose: 'point', dur: 0.7 });
      b(R.sentenced, GH, ['sv', 'vd'], { sx: 540, sy: 880, fill: 0.96, maxH: 1120, st: 'corner', pose: 'talk', dur: 0.7 });
      b(R.m200, ZN, 'vd', { fill: 0.86, maxH: 900, sy: 900, rot: 0.02, st: 'off', pose: 'shock', dur: 0.4, lead: 0.15 });
      b(R.y16, GH, ['sv', 'vd'], { sx: 540, sy: 880, fill: 0.96, maxH: 1120, st: 'corner', pose: 'idle', dur: 0.8 });
      sfx(R.arrest, 'camera_shutter_1', -8, 0.4); sfx(O(R.arrest, '+0.2'), 'thud_1', -8, 0.4); sfx(O(R.arrest, '+0.5'), 'rubber_stamp_2', -6);
      sfx(R.convicted, 'gavel_1', -4, 0.8); sfx(R.convicted, 'rubber_stamp_2', -6); sfx(R.c14, 'typewriter_1', -12, 0.9);
      sfx(R.sentenced, 'cell_door_1', -7, 1.0); sfx(R.m200, 'cinematic_hit_1', -3, 1.2); sfx(R.m200, 'deep_boom_1', -4, 1.4); sfx(O(R.m200, '+0.1'), 'money_counter_2', -11, 0.8);
      SH.push([R.arrest, 12], [R.convicted, 16], [R.m200, 26]); }

    // ---- his lawyer (TikTok only) ----
    if (R.lawyer) { const [x, y] = seg();
      E.push({ id: 'lw', type: 'text', at: [x, y], in: O(R.lawyer, '-0.3'), props: { lines: [[['HIS OWN LAWYER:', 'gold']], [['7 YEARS', 'bad']], [['(84 MONTHS)', 'paper']]], size: 90, per: 0.12 } });
      b(R.lawyer, SB, 'lw', { move: 'whip', sx: 540, sy: 840, fill: 0.7, maxH: 700, st: 'corner-left', pose: 'shock' });
      sfx(R.lawyer, 'rubber_stamp_2', -8); }

    // ---- screen micro-moments (CTAs) + comment bubble ----
    cfg.cta.forEach(c => {
      if (c.k === 'heart') { E.push({ id: 'heart', type: 'heart', layer: 'screen', at: [800, 930], in: O(c.at, '-0.05'), out: O(c.at, '+1.15'), props: { s: 1 } }); sfx(c.at, 'heartbeat_1', -8, 0.9); }
      if (c.k === 'sig') { E.push({ id: 'sig', type: 'sig', layer: 'screen', at: [420, 640], in: O(c.at, '+0.1'), out: O(c.at, '+1.5'), props: { dur: 0.8, label: 'SIGNED WITHOUT READING?' } }); sfx(O(c.at, '+0.1'), 'pop_1', -10, 0.4); }
      if (c.k === 'send') { E.push({ id: 'plane', type: 'plane', layer: 'screen', at: [540, 960], in: O(c.at, '-0.05'), out: O(c.at, '+1.2'), props: { dur: 0.9, from: [-230, 250], to: [280, -330], s: 1.5 } }, { id: 'sendtx', type: 'text', layer: 'screen', at: [820, 440], in: O(c.at, '+0.15'), out: O(c.at, '+1.2'), props: { lines: [[['SEND', 'gold']]], size: 70 } }); sfx(c.at, 'swoosh_2', -9, 1.0); }
      if (c.k === 'follow') { E.push({ id: 'mag', type: 'mag', layer: 'screen', at: [830, 1010], in: O(c.at, '-0.05'), out: O(c.at, '+1.45'), props: { press: 0.5 } }, { id: 'btn', type: 'follow', layer: 'screen', at: [830, 1010], scale: 0.8, in: O(c.at, '-0.05'), out: O(c.at, '+1.45'), props: { press: 0.5 } }); PO.push([O(c.at, '-0.1'), 'follow', { target: [830, 1010] }], [O(c.at, '+1.5'), 'talk']); sfx(O(c.at, '+0.5'), 'click_1', -8, 0.3); sfx(O(c.at, '+0.58'), 'success_chime_1', -12, 1.0); }
    });
    E.push({ id: 'ask', type: 'bubble', layer: 'screen', at: [600, 1090], in: R.ask, out: R.askEnd, props: { l1: cfg.ask[0], l2: cfg.ask[1], size: 52, tail: 'left' } });
    b(R.loop, SB, ['hook2', 'sus0', 'tl0'], { move: 'whip', sx: 540, sy: 880, fill: 0.98, maxH: 900, st: STK, pose: 'shock' });
    b(R.ask, PF, ['hook2', 'sus0'], { sy: 880, pose: 'talk' });
    sfx(R.loop, 'rewind_2', -11, 0.9); sfx(R.ask, 'pop_1', -9, 0.5);

    // ---- HUD ----
    E.push({ id: 'hud', type: 'hud', layer: 'screen', at: [0, 0], in: -1, props: { labels: cfg.labels, items: cfg.items } });

    const lab = cfg.labels || [{ at: -1, text: 'THE LOAN' }, { at: R.pitch, text: 'THE PITCH' }, { at: O(R.trick, '-0.25'), text: 'THE TRICK' }, { at: O(R.doj, '-0.2'), text: 'THE MATH' }, { at: O(R.crowd, '-0.2'), text: 'THE SCALE' }, { at: O(R.shield, '-0.2'), text: 'THE SHIELD' }, { at: O(R.board, '+0.2'), text: 'THE EVIDENCE' }, { at: O(R.arrest, '-0.2'), text: 'THE SENTENCE' }];
    const itm = cfg.items || [{ at: 0, label: 'BORROWED', to: 500, prefix: '$', dur: 0.6 }, { at: R.p650, label: 'PAPERWORK SAID', to: 650, prefix: '$', dur: 0.5 }, { at: R.fee, label: 'FEE EVERY PAYDAY', to: 150, prefix: '$', dur: 0.5 }, { at: R.never, label: 'STILL OWED', to: 500, prefix: '$', dur: 0.5 }, { at: R.dojNum, label: 'ONE BORROWER PAID', to: 1925, prefix: '$', dur: 1.3 }, { at: R.p700, label: 'RATE A YEAR (ABOUT)', to: 700, suffix: '%', prefix: '~', dur: 0.9 }, { at: R.four, label: 'BORROWERS (AT LEAST)', to: 4500000, dur: 1.0 }, { at: R.rev3, label: 'REVENUE (OVER)', to: 3500000000, prefix: '$', dur: 1.3 }, { at: R.shamAt, label: 'TRIBE-OWNED FOR REAL', to: 0, dur: 0.4 }, { at: R.board, label: 'PIECES OF EVIDENCE', to: 4, dur: 0.6 }, { at: R.arrest, label: 'YEAR ARRESTED', to: 2016, commas: false, dur: 0.6 }, { at: R.c14, label: 'COUNTS: GUILTY ON', to: 14, dur: 0.6 }, { at: R.m200, label: 'MONTHS IN PRISON', to: 200, dur: 0.7 }, { at: R.loop, label: 'BORROWED', to: 500, prefix: '$', dur: 0.5 }];
    E.find(e => e.id === 'hud').props = { labels: lab, items: itm };
    BM2.scene({
      series: 'decoded', title: 'CASE FILE Nº 027 · TUCKER', duration: cfg.duration,
      footnote: ['CONVICTED OCT 2017 · SENTENCED JAN 2018 · SOURCES: DOJ SDNY', 'ILLUSTRATIONS: LOAN FORM · CALENDAR · RACE CAR · CLAW (GENERIC)', 'PHOTO: LEVEL 5 MOTORSPORTS · CC BY-SA 2.0 · VIA WIKIMEDIA COMMONS'],
      elements: E, beats: T, poses: PO, shakes: SH, captions: cfg.captions,
      bed: { name: 'verdict_bed_2', gain: -1 }, sfx: S,
    });
  };
})();
