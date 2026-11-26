// ===== Javice / Frank — CRIME-SHOW generator (RULES 112). One story, three cuts; each cut passes a cfg of word refs (cfg.R). =====
// Appended after: shared_j.js (pitch, sheet, engineer, bank, permath, verdict, plane), wine_bits.js, shared2.js (hud), crime.js (suspect, board, victim, datecard, tile), + charts.js built-ins
(function () {
  const B = window.BM2, { clamp, lerp, lin, ease, spring, rgba, rr, txt, F, paper, clay, burst, hit } = B;

  // ---------- party: 14 guests were "invited", 1 showed up (ratio 4.25M : <300K) ----------
  B.register('party', {
    defaults: { w: 880, h: 760, nAt: 99999, oneAt: 99999 }, size: p => [p.w, p.h],
    anchors: p => ({ grid: [0, 20, p.w * 0.9, 420], big: [0, p.h / 2 - 130, p.w * 0.9, 190], head: [0, -p.h / 2 + 60, p.w, 120] }),
    draw(g, p, env) {
      const { t, theme, lift } = env, w = p.w, h = p.h, x0 = -w / 2, y0 = -h / 2; paper(g, x0, y0, w, h, 26, { lift });
      g.save(); rr(g, x0, y0, w, h, 26); g.clip(); g.fillStyle = theme.navy; g.fillRect(x0, y0, w, 120); g.restore();
      txt(g, 'THE PARTY MATH', x0 + 40, y0 + 62, F.hero(62), theme.paper, 'left'); txt(g, 'ILLUSTRATION', x0 + w - 34, y0 + 32, F.mono(18), 'rgba(245,243,238,.7)', 'right');
      const cols = 7, cw = 112, rh = 168, gx = -((cols - 1) * cw) / 2, gy = y0 + 270, fall = t >= p.oneAt, fk = ease.in(lin(t, p.oneAt, p.oneAt + 0.5));
      for (let i = 0; i < 14; i++) {
        const on = t - (p.nAt + i * 0.07); if (on < 0) continue; const k = spring(on, 'bouncy'), keep = i === 6, cx = gx + (i % cols) * cw, cy = gy + Math.floor(i / cols) * rh;
        let a = clamp(on / 0.1), sc = Math.min(1.15, k), dy = 0; if (fall && !keep) { a *= 1 - fk; sc *= 1 - 0.3 * fk; dy = 40 * fk; }
        g.save(); g.globalAlpha = a; g.translate(cx, cy + dy); g.scale(sc, sc); const col = keep ? '#E0281E' : '#59647a'; g.fillStyle = col; g.beginPath(); g.moveTo(-34, 62); g.quadraticCurveTo(-34, 6, 0, 2); g.quadraticCurveTo(34, 6, 34, 62); g.closePath(); g.fill(); g.strokeStyle = '#0B0F14'; g.lineWidth = 4; g.stroke();
        g.fillStyle = '#E8C9A0'; g.beginPath(); g.arc(0, -26, 26, 0, 7); g.fill(); g.stroke(); g.restore();
      }
      const n = t >= p.oneAt ? 1 : Math.min(14, Math.floor((t - p.nAt) / 0.07) + 1);
      if (t >= p.nAt) { const k = t >= p.oneAt ? spring(t - p.oneAt, 'snappy') : 1; g.save(); g.translate(0, y0 + h - 100); g.scale(0.85 + 0.15 * k, 0.85 + 0.15 * k); txt(g, t >= p.oneAt ? '1 SHOWED UP' : n + ' GUESTS SAID', 0, 0, F.hero(96), t >= p.oneAt ? theme.badInk : theme.ink); g.restore(); }
    },
  });


  // ---------- prof: the data-science professor victim-style character card (green card like the other cast; mortarboard + glasses + a tablet of 0s and 1s) ----------
  B.register('prof', {
    defaults: { label: 'THE PROFESSOR', sub: 'DATA SCIENCE', w: 340, h: 440, reactAt: 99999, tape: 'HIRED', labelSize: 38 }, size: p => [p.w, p.h],
    anchors: p => ({ face: [0, -p.h * 0.12, p.w * 0.6, p.h * 0.45], label: [0, p.h / 2 - 70, p.w, 120] }),
    draw(g, p, env) {
      const { t, lt, theme, lift } = env, w = p.w, h = p.h, k = spring(lt, 'heavy'), sh = clamp((t - p.reactAt) / 0.12), by = h / 2 - 150;
      g.save(); g.translate(0, (1 - k) * 200); g.rotate((1 - k) * 0.08); g.globalAlpha *= clamp(lt / 0.1);
      paper(g, -w / 2, -h / 2, w, h, 20, { lift }); g.save(); rr(g, -w / 2 + 18, -h / 2 + 18, w - 36, h - 160, 12); g.clip(); const bg = g.createLinearGradient(0, -h / 2, 0, h / 2); bg.addColorStop(0, '#CFEFDD'); bg.addColorStop(1, '#8FD1B0'); g.fillStyle = bg; g.fillRect(-w / 2, -h / 2, w, h);
      const sc = w / 400; g.translate(0, by + 20); g.scale(sc, sc); g.translate(0, -by);
      g.fillStyle = '#1FA366'; g.beginPath(); g.moveTo(-w * 0.34 / sc, by + 90); g.quadraticCurveTo(-w * 0.34 / sc, by - 30, 0, by - 40); g.quadraticCurveTo(w * 0.34 / sc, by - 30, w * 0.34 / sc, by + 90); g.closePath(); g.fill(); g.strokeStyle = '#0B0F14'; g.lineWidth = 5; g.stroke();
      g.fillStyle = '#F5F3EE'; g.beginPath(); g.moveTo(-26, by - 36); g.lineTo(0, by + 14); g.lineTo(26, by - 36); g.closePath(); g.fill();
      const hy = by - 100 - sh * 8; g.fillStyle = '#E8C9A0'; g.beginPath(); g.arc(0, hy, 56, 0, 7); g.fill(); g.stroke();
      g.strokeStyle = '#0B0F14'; g.lineWidth = 5; for (const q of [-1, 1]) { g.beginPath(); g.arc(q * 22, hy - 4, 17, 0, 7); g.stroke(); } g.beginPath(); g.moveTo(-5, hy - 4); g.lineTo(5, hy - 4); g.stroke();
      g.fillStyle = '#0B0F14'; for (const q of [-1, 1]) { g.beginPath(); g.arc(q * 22, hy - 4, 5 + sh * 2, 0, 7); g.fill(); }
      g.fillStyle = '#7a2b25'; g.beginPath(); if (sh > 0.2) g.ellipse(0, hy + 30, 9, 11 * sh, 0, 0, 7); else g.arc(0, hy + 28, 13, 0.2, Math.PI - 0.2); g.fill();
      g.fillStyle = '#14202e'; g.beginPath(); g.moveTo(-70, hy - 46); g.lineTo(0, hy - 74); g.lineTo(70, hy - 46); g.lineTo(0, hy - 24); g.closePath(); g.fill(); g.stroke(); g.fillRect(-36, hy - 40, 72, 18);
      g.strokeStyle = '#F2B705'; g.lineWidth = 5; g.beginPath(); g.moveTo(54, hy - 54); g.lineTo(62, hy - 6); g.stroke(); g.fillStyle = '#F2B705'; g.beginPath(); g.arc(62, hy - 2, 8, 0, 7); g.fill();
      g.fillStyle = '#16202e'; g.beginPath(); g.roundRect(w * 0.1 / sc, by + 18, 108, 78, 8); g.fill(); g.fillStyle = '#7CE0A6'; g.font = '700 16px "JetBrains Mono",monospace'; g.textAlign = 'left'; for (let i = 0; i < 4; i++) g.fillText(((i * 7 + Math.floor(t * 3)) % 3 ? '10110' : '01001') + (i % 2 ? '0' : '1'), w * 0.1 / sc + 12, by + 42 + i * 17);
      g.restore();
      g.fillStyle = '#188a56'; rr(g, -w / 2 + 18, h / 2 - 130, w - 36, 110, 10); g.fill(); txt(g, p.label, 0, h / 2 - 92, F.hero(p.labelSize), theme.paper); if (p.sub) txt(g, p.sub, 0, h / 2 - 48, F.mono(19), rgba(theme.paper, 0.85));
      g.save(); g.translate(-w * 0.22, -h / 2 + 4); g.rotate(-0.1); g.fillStyle = '#188a56'; g.fillRect(-60, -16, 120, 32); txt(g, p.tape, 0, 1, F.monoX(17), theme.paper); g.restore();
      g.restore();
    },
  });

  // ============================================================== scene builder ==============================================================
  const SB = 'side-by-side', GH = 'graphic-hero', ZN = 'zoom-on-number', PF = 'presenter-front', PK = 'peek', PB = 'pull-back';
  const PHOTO = 'brand/photos/charlie-javice-illustration/founder.png';
  const SUS = { src: PHOTO, crop: [0, 0, 1, 1], fx: 0.5, fy: 0.42, aspect: 1.1 };
  const NAME = { name: 'CHARLIE JAVICE', nick: '“THE FOUNDER”' };
  const CRED = 'ILLUSTRATION · NO LICENSED PHOTO';
  const STK = { x: 915, y: 1385, s: 0.95 };

  window.JAVICE = function (cfg) {
    const R = cfg.R, E = [], T = [], S = [], SH = [], PO = [];
    const stn = i => [(i % 6) * 1950, Math.floor(i / 6) * 1950];
    let si = 1; const seg = () => stn(si++);
    const O = (r, d) => { d = parseFloat(d); if (typeof r === 'number') return r + d; const m = String(r).match(/^(.*?)([+-]\d*\.?\d+)?$/), q = (m[2] ? parseFloat(m[2]) : 0) + d; return m[1] + (q ? (q > 0 ? '+' : '') + (+q.toFixed(3)) : ''); };
    const b = (at, beat, focus, o = {}) => T.push(Object.assign({ at, beat, focus }, o));
    const sfx = (at, name, gain = -9, dur = 0.5) => S.push({ at, name, gain, dur });
    const pip = (id, at0, out, label, to) => E.push({ id, type: 'suspect', layer: 'screen', at: [880, 1130], in: at0, out, props: Object.assign({}, SUS, { variant: 'pip', w: 200, aspect: 1.0, label, flash: true, tilt: 0.03, arrow: { at: O(at0, '+0.3'), to: to || [-420, -300] } }) });

    // ---- S0 frame 0 ----
    const hs = cfg.hook.side;
    E.push({ id: 'hook', type: 'text', at: [0, -400], in: -1, out: R.hookEnd, props: { lines: cfg.hook.lines, size: cfg.hook.size || 92 } });
    E.push({ id: 'hook2', type: 'text', at: [0, -400], in: R.loopIn, props: { lines: cfg.hook.lines, size: cfg.hook.size || 92 } });
    E.push({ id: 'sus0', type: 'suspect', at: [-230, 230], in: -1, props: Object.assign({}, SUS, NAME, { w: 420, flash: false, tilt: -0.02, credit: CRED, ring: R.hookRing || 99999 }) });
    E.push({ id: 'vs0', type: hs.kind === 'prof' ? 'prof' : 'victim', at: [300, 290], in: -1, props: { kind: hs.kind, label: hs.label, sub: hs.sub, labelSize: 34, w: 330, h: 430, tape: hs.tape || 'VICTIM', reactAt: R.hookReact || 99999 } });
    const F0 = ['hook', 'sus0', 'vs0'];
    b(0, SB, F0, { sx: 540, sy: 880, fill: 0.98, maxH: 900, st: STK, pose: 'shock' });
    cfg.hookBeats.forEach(([at, extra]) => b(at, ZN, extra.focus || F0, Object.assign({ fill: 1.0, maxH: 900, sx: 540, sy: 880, st: STK, dur: 0.45 }, extra)));
    sfx(0, 'deep_boom_2', -3); sfx(0.05, 'camera_shutter_1', -8, 0.4); sfx(0.1, 'paper_slam_2', -7);

    // ---- WHO + what Frank was ----
    { const [x, y] = seg();
      E.push({ id: 'mug', type: 'suspect', at: [x, y + 20], in: O(R.who, '-0.3'), props: Object.assign({}, SUS, NAME, { variant: 'card', file: true, caseNo: 'CASE FILE Nº 028', w: 480, credit: CRED, tilt: -0.03, push: { at: R.who, dur: 5.0, to: 1.3 }, stringTo: [690, 330], stringAt: R.whoString, ring: R.whoRing }) });
      E.push({ id: 'ftx', type: 'text', at: [x + 720, y + 10], in: R.frank, props: { lines: [[['FRANK', 'gold']], [['HELPS STUDENTS', 'paper']], [['FILL OUT THE', 'paper']], [['COLLEGE-AID FORM', 'gold']]], size: 62, per: 0.1 } });
      E.push({ id: 'dc1', type: 'datecard', layer: 'screen', at: [340, 480], in: O(R.who, '-0.1'), out: O(R.who, '+0.7'), props: { kicker: 'CASE FILE Nº 028 · THE PITCH', big: '2016', small: 'SHE LAUNCHES FRANK' } });
      b(R.who, SB, 'mug', { move: 'whip', sx: 540, sy: 960, fill: 0.62, maxH: 700, st: { x: 930, y: 1390, s: 0.85 }, pose: 'shrug' });
      b(R.whoName, ZN, 'mug', { fill: 0.7, maxH: 760, sy: 930, st: 'corner', pose: 'point', dur: 0.5 });
      b(R.frank, SB, ['mug', 'ftx'], { sx: 480, sy: 840, fill: 0.95, maxH: 1000, st: 'corner', pose: 'shock', dur: 0.8 });
      sfx(R.who, 'camera_shutter_2', -8, 0.4); sfx(O(R.who, '+0.2'), 'paper_slam_2', -10); sfx(R.frank, 'typewriter_2', -12, 0.8); }

    // ---- THE PITCH: 4.25M users -> SEC: fewer than 300,000 ----
    { const [x, y] = seg();
      E.push({ id: 'deck', type: 'pitch', at: [x - 60, y], in: O(R.pitch, '-0.4'), props: { t0: R.pitch, from: 3300000, upDur: cfg.deckDur, pulses: [R.claim], crackAt: O(R.real, '-0.1'), labelAt: O(R.real2, '+0.1'), reset: 99999 } });
      E.push({ id: 'spd', type: 'suspect', at: [x + 560, y + 280], in: R.pitch, props: Object.assign({}, SUS, { variant: 'pip', w: 230, aspect: 1.0, label: 'HER PITCH', flash: true, tilt: 0.04, arrow: { at: O(R.pitch, '+0.3'), to: [-300, -160] } }) });
      b(R.pitch, SB, ['deck', 'spd'], { move: 'whip', sx: 540, sy: 820, fill: 0.9, maxH: 800, st: 'corner-left', pose: 'point' });
      b(R.claim, ZN, 'deck.value', { fill: 0.8, maxH: 520, sy: 880, st: 'corner-left', pose: 'shock', dur: 0.5 });
      b(O(R.claim, '+1.0'), GH, ['deck', 'spd'], { fill: 0.9, maxH: 800, sx: 540, sy: 840, st: 'corner', dur: 0.7 });
      b(R.sec, GH, 'deck', { fill: 0.78, maxH: 800, sy: 840, st: 'corner-left', pose: 'talk', dur: 0.7 });
      b(R.real, ZN, 'deck.value', { fill: 0.8, maxH: 520, sy: 880, st: 'corner-left', pose: 'shock', dur: 0.5 });
      b(O(R.real2, '+0.8'), PB, 'deck', { fill: 0.8, maxH: 800, sy: 840, st: 'corner', dur: 0.7 });
      sfx(R.pitch, 'paper_slam_2', -10); sfx(R.claim, 'ding_2', -9, 0.7); sfx(O(R.real, '-0.1'), 'rubber_stamp_2', -5); sfx(R.real, 'deep_boom_2', -8, 0.4); SH.push([R.real, 12]); }

    // ---- 14 guests vs 1 (TikTok / IG) ----
    if (R.partyN) { const [x, y] = seg();
      E.push({ id: 'pty', type: 'party', at: [x, y], in: O(R.party, '-0.4'), props: { nAt: R.partyN, oneAt: R.partyOne } });
      b(R.party, SB, 'pty', { move: 'whip', sx: 540, sy: 920, fill: 0.9, maxH: 840, st: 'corner-left', pose: 'point' });
      b(R.partyN, ZN, 'pty', { fill: 0.96, maxH: 840, sy: 930, st: 'corner-left', pose: 'shock', dur: 0.5 });
      b(R.partyOne, ZN, 'pty', { fill: 0.92, maxH: 860, sy: 930, st: 'corner-left', pose: 'shock', dur: 0.45 });
      b(O(R.partyOne, '+1.1'), PB, 'pty', { fill: 0.9, maxH: 840, sy: 920, st: 'corner', dur: 0.7 });
      sfx(R.party, 'swipe_2', -11, 0.4); sfx(R.partyN, 'pop_2', -10, 0.4); sfx(R.partyOne, 'thud_1', -8, 0.4); }

    // ---- THE CHECK: the bank asks for the customer list ----
    { const [x, y] = seg();
      E.push({ id: 'vb', type: 'victim', at: [x - 300, y], in: O(R.bankAsk, '-0.3'), props: { kind: 'investor', label: 'JPMORGAN', sub: 'THE BANK', labelSize: 44, reactAt: R.listWord, w: 400, h: 500, tape: 'THE BANK' } });
      E.push({ id: 'btx', type: 'text', at: [x + 330, y - 10], in: R.askedWord, props: { lines: [[['ASKED TO SEE', 'paper']], [['THE CUSTOMER', 'gold']], [['LIST', 'gold']]], size: 76, per: 0.12 } });
      b(R.bankAsk, SB, ['vb', 'btx'], { move: 'whip', sx: 540, sy: 860, fill: 0.9, maxH: 860, st: 'left', pose: 'point' });
      b(R.listWord, ZN, ['vb', 'btx'], { fill: 0.9, maxH: 880, sy: 860, st: 'corner', pose: 'point', dur: 0.5 });
      sfx(R.bankAsk, 'swipe_2', -11, 0.4); sfx(R.askedWord, 'click_1', -8, 0.3); sfx(R.listWord, 'pop_1', -9, 0.4); }

    // ---- THE PROBLEM: there was no list ----
    { const [x, y] = seg();
      E.push({ id: 'sh0', type: 'sheet', at: [x, y], in: O(R.nolist0, '-0.4'), props: { fillAt: R.fillAt, fillDur: 1.8, tagAt: R.tagAt, fillTo: 4000000 } });
      E.push({ id: 'nol', type: 'slamstamp', at: [x, y + 20], rot: -0.07, in: R.noWord, props: { text: cfg.noText || 'NO LIST', tone: 'bad', size: 130 } });
      E.push({ id: 'sps2', type: 'suspect', at: [x + 540, y + 300], in: R.nolist0, props: Object.assign({}, SUS, { variant: 'pip', w: 230, aspect: 1.0, label: 'HER PROBLEM', flash: true, tilt: 0.04, arrow: { at: O(R.nolist0, '+0.3'), to: [-290, -150] } }) });
      b(R.nolist0, SB, ['sh0', 'sps2'], { move: 'whip', sx: 540, sy: 840, fill: 0.9, maxH: 940, st: 'corner-left', pose: 'shock' });
      b(R.noWord, ZN, 'sh0', { fill: 0.9, maxH: 900, sy: 880, st: 'corner-left', pose: 'shock', dur: 0.5 });
      sfx(R.nolist0, 'paper_slam_2', -10); sfx(R.noWord, 'rubber_stamp_2', -5); sfx(R.noWord, 'deep_boom_2', -8, 0.4); SH.push([R.noWord, 12]); }

    // ---- THE FAKE: the engineer says no ----
    { const [x, y] = seg();
      E.push({ id: 'eng', type: 'engineer', at: [x - 80, y], in: O(R.eng, '-0.4'), props: { askAt: R.engFake, noAt: R.engNo } });
      E.push({ id: 'stN', type: 'stamp', at: [x + 220, y + 40], rot: 0.1, in: R.engNo, props: { text: 'NO', tone: 'bad', size: 190 } });
      b(R.eng, SB, 'eng', { move: 'whip', sx: 540, sy: 880, fill: 0.62, maxH: 840, st: 'corner-left', pose: 'point' });
      b(R.engFake, ZN, 'eng', { fill: 0.7, maxH: 900, sy: 880, st: 'corner-left', pose: 'point', dur: 0.5 });
      b(R.engNo, ZN, ['eng', 'stN'], { fill: 0.92, maxH: 900, sy: 880, st: 'corner', pose: 'shock', dur: 0.4 });
      b(O(R.engNo, '+1.3'), GH, ['eng', 'stN'], { fill: 0.92, maxH: 900, sy: 880, st: 'corner-left', dur: 0.7 });
      sfx(R.eng, 'paper_slam_2', -10); sfx(R.engFake, 'typewriter_2', -12, 0.8); sfx(R.engNo, 'rubber_stamp_2', -4); sfx(R.engNo, 'deep_boom_2', -7, 0.4); SH.push([R.engNo, 14]); }

    // ---- THE FAKE: the professor generates 4 million fake people (list grows) ----
    { const [x, y] = seg();
      E.push({ id: 'prof', type: 'prof', at: [x - 470, y + 40], in: O(R.prof, '-0.3'), props: { label: 'THE PROFESSOR', sub: 'DATA SCIENCE', labelSize: 38, reactAt: R.profGen, w: 340, h: 440, tape: 'HIRED' } });
      E.push({ id: 'sh1', type: 'sheet', at: [x + 230, y], in: O(R.prof, '-0.2'), props: { fillAt: R.fillGo, fillDur: cfg.fillDur || 2.2, tagAt: R.tagAt2, fillTo: 4000000, w: 720, h: 860 } });
      E.push({ id: 'fk', type: 'slamstamp', at: [x + 230, y + 30], rot: -0.08, in: R.fakeWord, props: { text: 'FAKE', tone: 'bad', size: 150 } });
      pip('pipf', O(R.prof, '-0.1'), O(R.invoice, '-0.3'), 'HER DEAL', [-520, -330]);
      b(R.prof, SB, ['prof', 'sh1'], { move: 'whip', sx: 540, sy: 860, fill: 0.96, maxH: 920, st: 'corner', pose: 'point' });
      b(R.fillGo, ZN, 'sh1', { fill: 0.7, maxH: 900, sx: 620, sy: 880, st: 'corner-left', pose: 'shock', dur: 0.5 });
      b(O(R.fillGo, '+2.0'), GH, ['prof', 'sh1'], { fill: 0.96, maxH: 920, sy: 860, st: 'corner', pose: 'point', dur: 0.7 });
      sfx(R.prof, 'paper_slam_2', -10); sfx(R.profGen, 'pop_1', -9, 0.4); sfx(R.fillGo, 'money_counter_1', -12, 1.8); sfx(R.fakeWord, 'rubber_stamp_2', -5); SH.push([R.fakeWord, 12]); }

    // ---- $18,000 invoice ----
    { const [x, y] = seg();
      E.push({ id: 'inv', type: 'counter', at: [x, y], in: O(R.invoice0, '-0.4'), props: { from: 0, to: 18000, prefix: '$', at: R.invoice, dur: 1.0, size: 190, tone: 'bad', label: 'PAID TO THE PROFESSOR (ABOUT)', sub: "PER THE BANK'S LAWSUIT", w: 900 } });
      b(R.invoice0, SB, 'inv', { move: 'whip', sx: 540, sy: 880, fill: 0.9, maxH: 700, st: 'corner-left', pose: 'point' });
      b(R.invoice, ZN, 'inv.value', { fill: 0.84, maxH: 560, sy: 900, st: 'corner-left', pose: 'shock', dur: 0.5 });
      b(O(R.invoice, '+1.6'), PB, 'inv', { fill: 0.84, maxH: 700, sy: 880, st: 'corner', dur: 0.7 });
      sfx(R.invoice0, 'paper_slam_2', -10); sfx(R.invoice, 'money_counter_2', -11, 1.0); sfx(O(R.invoice, '+1.0'), 'cash_register_1', -9, 0.9); }

    // ---- THE DEAL: JPMorgan pays $175M ----
    { const [x, y] = seg();
      E.push({ id: 'bk', type: 'bank', at: [x, y - 40], in: O(R.deal, '-0.4'), props: { at: R.n175, dur: 1.1, pulses: [O(R.n175, '+1.2')] } });
      E.push({ id: 'vb2', type: 'victim', at: [x - 520, y + 330], in: O(R.deal, '-0.2'), props: { kind: 'investor', label: 'JPMORGAN', sub: 'THE BANK', labelSize: 34, reactAt: R.fellWord || 99999, w: 300, h: 380, tape: 'THE BANK' } });
      E.push({ id: 'sps3', type: 'suspect', at: [x + 570, y + 300], in: R.deal, props: Object.assign({}, SUS, { variant: 'pip', w: 230, aspect: 1.0, label: 'HER SALE', flash: true, tilt: 0.04, arrow: { at: O(R.deal, '+0.3'), to: [-300, -170] } }) });
      b(R.deal, SB, ['bk', 'vb2', 'sps3'], { move: 'whip', sx: 540, sy: 820, fill: 0.98, maxH: 940, st: 'corner', pose: 'point' });
      b(R.n175, ZN, 'bk.amount', { fill: 0.84, maxH: 520, sy: 860, st: 'corner-left', pose: 'shock', dur: 0.5 });
      b(O(R.n175, '+1.8'), PB, ['bk', 'vb2', 'sps3'], { fill: 0.98, maxH: 940, sy: 820, st: 'corner', dur: 0.7 });
      sfx(R.deal, 'paper_slam_2', -10); sfx(R.n175, 'money_counter_2', -10, 1.1); sfx(O(R.n175, '+1.1'), 'cash_register_1', -7, 0.9); SH.push([O(R.n175, '+1.1'), 12]); }

    // ---- $580 per real user (YT / IG) ----
    if (R.per) { const [x, y] = seg();
      E.push({ id: 'pm', type: 'permath', at: [x, y], in: O(R.per, '-0.4'), props: { at: R.n580, dur: 0.9 } });
      b(R.per, SB, 'pm', { move: 'whip', sx: 540, sy: 860, fill: 0.84, maxH: 760, st: 'corner-left', pose: 'point' });
      b(R.n580, ZN, 'pm.hero', { fill: 0.8, maxH: 520, sy: 880, st: 'corner-left', pose: 'shock', dur: 0.5 });
      b(O(R.n580, '+1.4'), PB, 'pm', { fill: 0.84, maxH: 760, sy: 860, st: 'corner', dur: 0.7 });
      sfx(R.per, 'paper_slam_2', -10); sfx(R.n580, 'ding_2', -9, 0.7); }

    // ---- THE COLLAPSE: the list falls apart ----
    { const [x, y] = seg();
      E.push({ id: 'sh2', type: 'sheet', at: [x + 120, y], in: O(R.fell0, '-0.4'), props: { fillAt: O(R.fell0, '-3'), fillDur: 0.1, tagAt: 99999, fillTo: 4000000, w: 720, h: 860 } });
      E.push({ id: 'vb3', type: 'victim', at: [x - 470, y + 40], in: O(R.fell0, '-0.3'), props: { kind: 'investor', label: 'JPMORGAN', sub: 'THE BANK', labelSize: 34, reactAt: R.fellWord, w: 340, h: 440, tape: 'THE BANK' } });
      E.push({ id: 'fa', type: 'slamstamp', at: [x + 120, y + 20], rot: -0.07, in: R.fellWord, props: { text: 'FELL APART', tone: 'bad', size: 120 } });
      b(R.fell0, SB, ['vb3', 'sh2'], { move: 'whip', sx: 540, sy: 860, fill: 0.98, maxH: 940, st: 'corner', pose: 'point' });
      b(R.fellWord, ZN, ['sh2', 'fa'], { fill: 0.78, maxH: 900, sy: 880, st: 'corner', pose: 'shock', dur: 0.4 });
      b(O(R.fellWord, '+1.2'), PB, ['vb3', 'sh2'], { fill: 0.98, maxH: 940, sy: 860, st: 'corner', dur: 0.7 });
      sfx(R.fell0, 'paper_slam_2', -10); sfx(R.fellWord, 'rubber_stamp_2', -5); sfx(R.fellWord, 'deep_boom_1', -5, 1.2); SH.push([R.fellWord, 16]); }

    // ---- EVIDENCE BOARD ----
    { const [x, y] = seg(), bd = R.board;
      E.push({ id: 'board', type: 'board', at: [x, y], in: O(bd, '-0.4'), props: { title: 'EVIDENCE BOARD', caseNo: 'CASE FILE Nº 028', tightAt: R.boardTight, items: [
        { id: 'ph', k: 'photo', src: PHOTO, crop: [0, 0, 1, 1], fx: 0.5, fy: 0.42, x: 0, y: -280, w: 330, h: 400, name: 'CHARLIE JAVICE', nameSize: 26, at: O(bd, '-0.2'), rot: -0.02, push: 0.3 },
        { id: 'n1', k: 'note', x: -300, y: 120, w: 270, h: 290, size: 44, lines: [['4.25M', 'bad'], ['CLAIMED', 'ink', 24]], at: O(bd, '+0.3'), rot: -0.05 },
        { id: 'n2', k: 'note', x: 0, y: 150, w: 270, h: 290, size: 44, lines: [['<300K', 'bad'], ['REAL (SEC)', 'ink', 24]], at: O(bd, '+0.6'), rot: 0.03 },
        { id: 'n3', k: 'note', x: 300, y: 120, w: 270, h: 290, icon: 'cash', size: 40, lines: [['$175M', 'bad']], at: O(bd, '+0.9'), rot: 0.05 },
        { id: 'n4', k: 'note', x: 0, y: 440, w: 640, h: 270, size: 96, lines: [['FAKE LIST', 'bad', 96]], at: O(bd, '+1.2'), rot: -0.02, stamp: { text: 'PER THE BANK', at: O(bd, '+1.5'), y: 82, size: 30, rot: -0.04 } } ],
        strings: [[0, 1, O(bd, '+0.5')], [0, 2, O(bd, '+0.8')], [0, 3, O(bd, '+1.1')], [0, 4, O(bd, '+1.4')], [1, 4, O(R.boardTight, '-0.2')], [2, 4, O(R.boardTight, '-0.1')], [3, 4, R.boardTight]] } });
      b(bd, PK, 'board', { move: 'whip', sy: 800, fill: 0.9, maxH: 860, pose: 'chin' });
      b(O(bd, '+0.9'), GH, 'board', { sy: 800, fill: 0.9, maxH: 860, st: 'corner-left', pose: 'point', dur: 0.7 });
      b(R.boardTight, PB, 'board', { fill: 0.86, maxH: 860, sy: 800, st: 'corner-left', dur: 0.6 });
      sfx(bd, 'paper_slam_2', -10); sfx(O(bd, '+0.3'), 'camera_shutter_1', -9, 0.4); sfx(R.boardTight, 'typewriter_1', -12, 1.0); }

    // ---- VERDICT ----
    { const [x, y] = seg();
      E.push({ id: 'sv', type: 'suspect', at: [x - 400, y + 20], in: R.jury0, props: Object.assign({}, SUS, NAME, { w: 440, flash: true, tilt: -0.02, credit: CRED, mono: true, stamps: [{ text: 'GUILTY', at: R.convicted, size: 74, x: 0, y: -30, rot: -0.1 }], bars: R.sentenced }) });
      E.push({ id: 'vd', type: 'verdict', at: [x + 400, y], in: O(R.jury0, '+0.0'), props: { guiltyAt: R.convicted, monthsAt: R.m85, restiAt: R.resti, restiDur: 1.6 } });
      b(R.jury0, SB, ['sv', 'vd'], { move: 'whip', sx: 540, sy: 880, fill: 0.98, maxH: 940, st: 'corner', pose: 'shock' });
      b(R.convicted, ZN, 'vd', { fill: 0.84, maxH: 900, sy: 900, st: 'corner-left', pose: 'shock', dur: 0.45 });
      b(R.sentenced, GH, ['sv', 'vd'], { sx: 540, sy: 880, fill: 0.98, maxH: 940, st: 'corner', pose: 'talk', dur: 0.7 });
      b(R.m85, ZN, 'vd', { fill: 0.86, maxH: 900, sy: 900, st: 'off', pose: 'shock', dur: 0.4 });
      b(R.resti, ZN, 'vd', { fill: 0.86, maxH: 900, sy: 900, st: 'off', pose: 'shock', dur: 0.5, move: R.extra ? 'whip' : undefined });
      b(O(R.resti, '+1.8'), GH, ['sv', 'vd'], { sx: 540, sy: 880, fill: 0.98, maxH: 940, st: 'corner', pose: 'idle', dur: 0.8 });
      sfx(R.jury0, 'camera_shutter_1', -8, 0.4); sfx(R.convicted, 'gavel_1', -4, 0.8); sfx(R.convicted, 'rubber_stamp_2', -6); sfx(R.sentenced, 'cell_door_1', -7, 1.0);
      sfx(R.m85, 'cinematic_hit_1', -3, 1.2); sfx(R.m85, 'deep_boom_1', -4, 1.4); sfx(R.resti, 'money_counter_2', -10, 1.6); sfx(O(R.resti, '+1.6'), 'cash_register_1', -8, 0.9);
      SH.push([R.convicted, 16], [R.m85, 20], [O(R.resti, '+1.6'), 14]); }

    // ---- extra line (coworker 68 months / prosecutors asked 12 years) ----
    if (R.extra) { const [x, y] = seg();
      E.push({ id: 'ex', type: 'text', at: [x, y], in: O(R.extra, '-0.3'), props: { lines: cfg.extraLines, size: cfg.extraSize || 82, per: 0.12 } });
      b(R.extra, SB, 'ex', { move: 'whip', sx: 540, sy: 840, fill: 0.9, maxH: 700, st: 'corner-left', pose: 'shock' });
      sfx(R.extra, 'rubber_stamp_2', -8); }

    // ---- CTAs + end ----
    cfg.cta.forEach(c => {
      if (c.k === 'heart') { E.push({ id: 'heart', type: 'heart', layer: 'screen', at: [800, 930], in: O(c.at, '-0.05'), out: O(c.at, '+1.15'), props: { s: 1 } }); sfx(c.at, 'heartbeat_1', -8, 0.9); }
      if (c.k === 'send') { E.push({ id: 'plane', type: 'plane', layer: 'screen', at: [540, 960], in: O(c.at, '-0.05'), out: O(c.at, '+1.2'), props: { dur: 0.9, from: [-230, 250], to: [280, -330], s: 1.5 } }, { id: 'sendtx', type: 'text', layer: 'screen', at: [820, 440], in: O(c.at, '+0.15'), out: O(c.at, '+1.2'), props: { lines: [[['SEND', 'gold']]], size: 70 } }); sfx(c.at, 'swoosh_2', -9, 1.0); }
      if (c.k === 'follow') { E.push({ id: 'mag', type: 'mag', layer: 'screen', at: [830, 1010], in: O(c.at, '-0.05'), out: O(c.at, '+1.45'), props: { press: 0.5 } }, { id: 'btn', type: 'follow', layer: 'screen', at: [830, 1010], scale: 0.8, in: O(c.at, '-0.05'), out: O(c.at, '+1.45'), props: { press: 0.5 } }); PO.push([O(c.at, '-0.1'), 'follow', { target: [830, 1010] }], [O(c.at, '+1.5'), 'talk']); sfx(O(c.at, '+0.5'), 'click_1', -8, 0.3); sfx(O(c.at, '+0.58'), 'success_chime_1', -12, 1.0); }
    });
    E.push({ id: 'ask', type: 'bubble', layer: 'screen', at: [600, 1090], in: R.ask, out: R.askEnd, props: { l1: cfg.ask[0], l2: cfg.ask[1], size: 52, tail: 'left' } });
    b(R.loop, SB, ['hook2', 'sus0', 'vs0'], { move: 'whip', sx: 540, sy: 880, fill: 0.98, maxH: 900, st: STK, pose: 'shock' });
    b(R.ask, PF, ['hook2', 'sus0'], { sy: 880, pose: 'talk' });
    sfx(R.loop, 'rewind_2', -11, 0.9); sfx(R.ask, 'pop_1', -9, 0.5);

    (cfg.extra || []).forEach(([at, beat, focus, o]) => b(at, beat, focus === 'F0' ? F0 : focus, Object.assign({ fill: 0.9, maxH: 860, sy: 860, st: 'corner-left', pose: 'talk', dur: 0.8 }, o || {})));

    // ---- HUD ----
    const lab = [{ at: -1, text: 'THE PITCH' }, { at: O(R.bankAsk, '-0.2'), text: 'THE CHECK' }, { at: O(R.eng, '-0.2'), text: 'THE FAKE' }, { at: O(R.deal, '-0.2'), text: 'THE DEAL' }, { at: O(R.fell0, '-0.2'), text: 'THE COLLAPSE' }, { at: O(R.board, '+0.2'), text: 'THE EVIDENCE' }, { at: O(R.jury0, '-0.2'), text: 'THE SENTENCE' }];
    const itm = [{ at: 0, label: 'CUSTOMERS SOLD (CLAIMED)', to: 4000000, dur: 1.2 }, { at: R.claim, label: 'USERS SHE CLAIMED', to: 4250000, dur: 0.8 }, { at: R.real, label: 'REAL USERS (SEC: UNDER)', to: 300000, dur: 0.9 }, { at: R.engNo, label: 'ENGINEERS WHO SAID YES', to: 0, dur: 0.4 }, { at: R.fillGo, label: 'FAKE CUSTOMERS MADE', from: 0, to: 4000000, dur: cfg.fillDur || 2.2 }, { at: R.invoice, label: 'PAID FOR THE LIST (ABOUT)', to: 18000, prefix: '$', dur: 1.0 }, { at: R.n175, label: 'JPMORGAN PAID', to: 175000000, prefix: '$', dur: 1.1 }]
      .concat(R.per ? [{ at: R.n580, label: 'PER REAL USER (OUR MATH)', to: 580, prefix: '$', dur: 0.9 }] : [])
      .concat([{ at: R.m85, label: 'MONTHS IN PRISON', to: 85, dur: 0.7 }, { at: R.resti, label: 'ORDERED TO PAY BACK', to: 287500000, prefix: '$', dur: 1.6 }, { at: R.loop, label: 'USERS SHE CLAIMED', to: 4250000, dur: 0.6 }]);
    E.push({ id: 'hud', type: 'hud', layer: 'screen', at: [0, 0], in: -1, props: { labels: lab, items: itm } });

    BM2.scene({
      series: 'decoded', title: 'CASE FILE Nº 028 · JAVICE', duration: cfg.duration,
      footnote: ['CONVICTED MARCH 2025 · SENTENCED SEPT 2025 · SOURCES: DOJ SDNY, SEC', 'OUR MATH: $175M ÷ ~300K REAL USERS ≈ $580 · FIGURES + LIST ARE ILLUSTRATIONS', 'FOUNDER, PROFESSOR, BANK CARDS = ILLUSTRATION (NO LICENSED PHOTO OF HER)'],
      elements: E, beats: T, poses: PO, shakes: SH, captions: cfg.captions,
      bed: { name: 'tense_bed_2', gain: -1 }, sfx: S,
    });
  };
})();
