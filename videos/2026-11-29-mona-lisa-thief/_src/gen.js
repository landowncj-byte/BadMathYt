// ===== Mona Lisa thief — CRIME-SHOW generator (RULES 112). One story, three cuts: each cut passes cfg (word refs in cfg.R). =====
// Appended after: tucker shared.js (heart/plane/mag...), wine_bits.js, shared2.js (hud), crime.js, lisa_bits.js
(function () {
  const B = window.BM2;
  const SB = 'side-by-side', GH = 'graphic-hero', ZN = 'zoom-on-number', PF = 'presenter-front', PK = 'peek', PB = 'pull-back';
  const P1 = 'brand/photos/vincenzo-peruggia/1.jpg', P2 = 'brand/photos/vincenzo-peruggia/2.jpg', ART = 'brand/photos/mona-lisa-painting/1.jpg';
  const SUS = { src: P1, crop: [0, 0, 1, 1], fx: 0.52, fy: 0.32, aspect: 1.1 };
  const SUS2 = { src: P2, crop: [0.47, 0.235, 0.44, 0.44], fx: 0.5, fy: 0.4, aspect: 1.05 };
  const SUSP = { src: P2, crop: [0.07, 0.197, 0.37, 0.48], fx: 0.5, fy: 0.4, aspect: 1.1 };
  const NAME = { name: 'VINCENZO PERUGGIA', nick: '“THE LOUVRE INSIDER”', nameSize: 38 };
  const CRED = 'PARIS POLICE · PUBLIC DOMAIN · VIA WIKIMEDIA COMMONS';
  const STK = { x: 915, y: 1385, s: 0.95 };

  window.LISA = function (cfg) {
    const R = cfg.R, E = [], T = [], S = [], SH = [], PO = [];
    const stn = i => [(i % 6) * 2100, Math.floor(i / 6) * 2100];
    let si = 1; const seg = () => { const o = stn(si); si++; return o; };
    const b = (at, beat, focus, o = {}) => T.push(Object.assign({ at, beat, focus }, o));
    const sfx = (at, name, gain = -9, dur = 0.5) => S.push({ at, name, gain, dur });
    const O = (r, d) => { d = parseFloat(d); if (typeof r === 'number') return r + d; const m = String(r).match(/^(.*?)([+-]\d*\.?\d+)?$/), q = (m[2] ? parseFloat(m[2]) : 0) + d; return m[1] + (q ? (q > 0 ? '+' : '') + (+q.toFixed(3)) : ''); };
    const pip = (id, at, out, label, to, o = {}, pos = [880, 1130]) => E.push({ id, type: 'suspect', layer: 'screen', at: pos, in: at, out, props: Object.assign({}, SUS, { variant: 'pip', w: 200, aspect: 1.0, label, flash: true, tilt: 0.03, arrow: { at: O(at, '+0.25'), to } }, o) });
    const LAY = { sx: 540, sy: 840, maxH: 880 };

    // ---- S0 frame 0 (loop target): empty frame + 4 hooks + MISSING stamp + his face ----
    E.push({ id: 'hook', type: 'text', at: [0, -350], in: -1, out: R.hookEnd, props: { lines: cfg.hook.lines, size: cfg.hook.size || 96 } });
    E.push({ id: 'hook2', type: 'text', at: [0, -350], in: R.loopIn, props: { lines: cfg.hook.lines, size: cfg.hook.size || 96 } });
    E.push({ id: 'w0', type: 'wall', at: [-170, 40], in: -1, scale: 0.5, props: { empty: true, art: ART, stampAt: 0.15, stampText: 'MISSING', stampSub: '21 AUG 1911', cap: 'THE LOUVRE · PARIS' } });
    E.push({ id: 'sus0', type: 'suspect', at: [190, 235], in: -1, props: Object.assign({}, SUS, NAME, { w: 330, flash: false, tilt: 0.03, credit: CRED, mono: true, ring: R.hookRing || 99999 }) });
    const F0 = ['hook', 'w0', 'sus0'];
    b(0, SB, F0, { sx: 540, sy: 850, fill: 0.98, maxH: 880, st: STK, pose: 'shock' });
    cfg.hookBeats.forEach(([at, extra]) => b(at, ZN, extra.focus || F0, Object.assign({ fill: 1.0, maxH: 900, sx: 540, sy: 850, st: STK, dur: 0.45 }, extra)));
    sfx(0, 'deep_boom_2', -3); sfx(0.05, 'camera_shutter_1', -8, 0.4); sfx(0.15, 'rubber_stamp_2', -5);

    // ---- WHO ----
    { const [x, y] = seg();
      E.push({ id: 'mug', type: 'suspect', at: [x - 30, y + 20], in: O(R.who, '-0.3'), props: Object.assign({}, SUS, NAME, { variant: 'card', file: true, caseNo: 'CASE FILE Nº 028', w: 500, credit: CRED, tilt: -0.03, push: { at: R.who, dur: 5.0, to: 1.3 }, stringTo: [700, 330], stringAt: R.whoString, ring: R.whoRing }) });
      E.push({ id: 'lv', type: 'text', at: [x + 700, y + 20], in: R.louvre, props: { lines: [[['USED TO', 'paper']], [['WORK AT', 'paper']], [['THE', 'paper']], [['LOUVRE', 'gold']]], size: 88 } });
      E.push({ id: 'dc1', type: 'datecard', layer: 'screen', at: [340, 480], in: O(R.who, '-0.1'), out: O(R.who, '+0.9'), props: { kicker: 'CASE FILE Nº 028 · THE THEFT', big: 'PARIS', small: '1911' } });
      b(R.who, SB, 'mug', { move: 'whip', sx: 540, sy: 960, fill: 0.62, maxH: 700, st: { x: 930, y: 1390, s: 0.85 }, pose: 'shrug' });
      b(R.whoName, ZN, 'mug', { fill: 0.7, maxH: 760, sy: 930, st: 'corner', pose: 'point', dur: 0.5 });
      b(R.louvre, SB, ['mug', 'lv'], { sx: 540, sy: 840, fill: 0.95, maxH: 1000, st: 'corner', pose: 'shock', dur: 0.8 });
      sfx(R.who, 'camera_shutter_2', -8, 0.4); sfx(O(R.who, '+0.2'), 'paper_slam_2', -10); sfx(R.louvre, 'typewriter_2', -12, 0.8); }

    // ---- THE THEFT: painting lifted off the wall ----
    { const [x, y] = seg();
      E.push({ id: 'wt', type: 'wall', at: [x, y], in: O(R.theft, '-0.4'), props: { art: ART, liftAt: R.lift, stampAt: R.stampT, stampText: 'MISSING', stampSub: '21 AUG 1911' } });
      E.push({ id: 'dc2', type: 'datecard', layer: 'screen', at: [340, 480], in: O(R.theft, '-0.1'), out: O(R.lift, '+0.4'), props: { kicker: cfg.dateKicker || 'THE LOUVRE · CLOSED DAY', big: 'MON 21 AUG', small: '1911 · PARIS' } });
      pip('pipt', R.theft, O(R.stampT, '+0.6'), 'INSIDER', [-400, -300]);
      b(R.theft, GH, 'wt', Object.assign({ move: 'whip', fill: 0.82, st: 'corner-left', pose: 'point' }, LAY, { sx: 450 }));
      b(R.lift, ZN, 'wt.frame', { fill: 0.8, maxH: 600, sy: 840, st: 'corner-left', pose: 'shock', dur: 0.5, sx: 450 });
      b(O(R.lift, '+1.0'), PB, 'wt', Object.assign({ fill: 0.82, st: 'corner', sx: 450 }, LAY));
      sfx(R.theft, 'paper_slam_2', -10); sfx(R.lift, 'swoosh_2', -8, 0.8); sfx(R.stampT, 'rubber_stamp_2', -5); SH.push([R.stampT, 14]); }

    // ---- NEXT DAY: a painter counts four empty hooks ----
    { const [x, y] = seg();
      E.push({ id: 'wd', type: 'wall', at: [x, y], in: O(R.painter, '-0.5'), props: { empty: true, art: ART, painterAt: R.painter, hooks: cfg.hk, stampAt: 99999, cap: 'THE NEXT DAY · THE LOUVRE' } });
      E.push({ id: 'dc3', type: 'datecard', layer: 'screen', at: [340, 480], in: O(R.painter, '-0.1'), out: O(R.painter, '+0.9'), props: { kicker: 'THE NEXT MORNING', big: 'TUE 22 AUG', small: '1911 · PARIS' } });
      b(R.painter, GH, 'wd', Object.assign({ move: 'whip', fill: 0.82, st: 'corner', pose: 'point' }, LAY));
      b(cfg.hk[0], ZN, 'wd.hooks', { fill: 0.8, maxH: 620, sy: 840, st: 'corner', pose: 'shock', dur: 0.5 });
      b(O(cfg.hk[3], '+0.7'), PB, 'wd', Object.assign({ fill: 0.82, st: 'corner' }, LAY));
      cfg.hk.forEach(h => sfx(h, 'pop_2', -9, 0.3)); sfx(R.painter, 'swipe_2', -11, 0.4); }

    // ---- NEWSPAPERS + CLOSED ----
    { const [x, y] = seg();
      E.push({ id: 'pr', type: 'press', at: [x, y], in: R.pressIn || O(R.press, '-0.5'), props: { at: R.press, closedAt: R.closed, closedText: 'CLOSED · 1 WEEK' } });
      b(R.pressIn || R.press, GH, 'pr', Object.assign({ move: 'whip', fill: 0.9, st: 'corner-left', pose: 'point' }, LAY));
      b(R.closed, ZN, 'pr', { fill: 0.8, maxH: 860, sy: 850, st: 'corner-left', pose: 'shock', dur: 0.5 });
      if (R.paper2) b(R.paper2, GH, 'pr', Object.assign({ fill: 0.9, st: 'corner' }, LAY, { dur: 0.7 }));
      sfx(R.closed, 'rubber_stamp_2', -6); for (let i = 0; i < 3; i++) sfx(O(R.press, '+' + (i * 0.42)), 'paper_slam_2', -11, 0.4); }

    // ---- CROWD STARES AT THE BLANK SPOT ----
    { const [x, y] = seg();
      E.push({ id: 'qu', type: 'queue', at: [x, y], in: O(R.queue, '-0.5'), props: { at: R.queue } });
      b(R.queue, GH, 'qu', Object.assign({ move: 'whip', fill: 0.9, st: 'corner-left', pose: 'shock' }, LAY));
      b(O(R.queue, '+1.4'), PB, 'qu', Object.assign({ fill: 0.9, st: 'corner' }, LAY, { dur: 0.8 }));
      sfx(R.queue, 'swoosh_2', -11, 0.9); }

    // ---- NO CLUE: calendar ticks 2 YEARS 4 MONTHS ----
    { const [x, y] = seg();
      E.push({ id: 'cl', type: 'cal2', at: [x - 60, y], in: O(R.cal, '-0.4'), props: { at: R.cal, dur: cfg.calDur, clueAt: R.clue } });
      pip('pipc', R.cal, O(R.clue, '+0.8'), 'NO SUSPECT', [-420, -250]);
      b(R.cal, SB, 'cl', Object.assign({ move: 'whip', fill: 0.84, st: 'corner-left', pose: 'chin' }, LAY, { sx: 500 }));
      b(R.clue, ZN, 'cl.clue', { fill: 0.8, maxH: 760, sy: 900, st: 'corner-left', pose: 'shock', dur: 0.5, sx: 500 });
      b(O(R.clue, '+0.9'), PB, 'cl', Object.assign({ fill: 0.84, st: 'corner', sx: 500 }, LAY));
      for (let i = 0; i < 8; i++) sfx(O(R.cal, '+' + (i * cfg.calDur / 8).toFixed(2)), 'click_1', -14, 0.2); sfx(R.clue, 'rubber_stamp_2', -4); sfx(R.clue, 'deep_boom_2', -8, 0.5); SH.push([R.clue, 12]); }
    if (R.zero) { const [x, y] = seg();
      E.push({ id: 'zl', type: 'text', at: [x, y], in: O(R.zero, '-0.3'), out: R.total, props: { lines: [[['ZERO', 'bad']], [['LEADS', 'paper']]], size: 150, per: 0.2 } });
      E.push({ id: 'zl2', type: 'text', at: [x, y], in: O(R.total, '-0.1'), props: { lines: [[['TOTAL', 'paper']], [['EMBARRASS-', 'gold', 80]], [['MENT', 'gold', 80]]], size: 140, per: 0.2 } });
      b(R.zero, SB, 'zl', { move: 'whip', sx: 540, sy: 840, fill: 0.9, maxH: 900, st: 'corner-left', pose: 'shock' });
      b(R.total, SB, 'zl2', { sx: 540, sy: 840, fill: 0.9, maxH: 900, st: 'corner-left', pose: 'talk', dur: 0.5 });
      sfx(R.zero, 'rubber_stamp_2', -8); sfx(R.total, 'thud_1', -8, 0.4); }

    // ---- HIS SMALL PARIS FLAT ----
    { const [x, y] = seg();
      E.push({ id: 'rm', type: 'room', at: [x, y], in: O(R.room, '-0.4'), props: { art: ART, peekAt: R.peek, cap: 'HIS TINY PARIS FLAT' } });
      pip('pipr', R.room, O(R.peek, '+1.2'), 'HIS FLAT', [-340, -150]);
      b(R.room, GH, 'rm', Object.assign({ move: 'whip', fill: 0.9, st: 'corner-left', pose: 'point' }, LAY));
      b(R.peek, ZN, 'rm.bundle', { fill: 0.4, maxH: 560, sy: 840, st: 'corner-left', pose: 'shock', dur: 0.5 });
      b(O(R.peek, '+1.2'), PB, 'rm', Object.assign({ fill: 0.9, st: 'corner' }, LAY));
      sfx(R.room, 'swoosh_2', -11, 0.8); sfx(R.peek, 'pop_1', -9, 0.4); sfx(R.peek, 'heartbeat_1', -9, 0.9); }

    if (R.twist) { const [x, y] = seg();
      E.push({ id: 'tw1', type: 'text', at: [x, y], in: O(R.twist[0], '-0.3'), out: R.twist[1], props: { lines: [[['SO HOW DID', 'paper']], [['THEY CATCH', 'paper']], [['HIM?', 'gold']]], size: 170, per: 0.15 } });
      E.push({ id: 'tw2', type: 'text', at: [x, y], in: O(R.twist[1], '-0.1'), props: { lines: [[['HE CAUGHT', 'paper']], [['HIMSELF', 'bad']]], size: 200, per: 0.25 } });
      b(R.twist[0], SB, 'tw1', { move: 'whip', sx: 540, sy: 840, fill: 0.9, maxH: 900, st: 'corner-left', pose: 'chin' });
      b(R.twist[1], ZN, 'tw2', { fill: 0.9, maxH: 900, sy: 840, st: 'corner-left', pose: 'shock', dur: 0.5 });
      sfx(R.twist[0], 'swipe_2', -11, 0.4); sfx(R.twist[1], 'cinematic_hit_1', -7, 0.8); SH.push([R.twist[1], 12]); }

    // ---- HE CAUGHT HIMSELF: the letter ----
    { const [x, y] = seg();
      E.push({ id: 'dc4', type: 'datecard', layer: 'screen', at: [340, 480], in: O(R.y13, '-0.1'), out: O(R.letter, '+0.5'), props: { kicker: 'CASE FILE Nº 028 · THE LETTER', big: 'NOV 1913', small: 'TO FLORENCE · ITALY' } });
      E.push({ id: 'lt', type: 'letter', at: [x, y], in: R.letterIn || O(R.letter, '-0.4'), props: { at: R.letterAt || R.letter, circleAt: R.circle, homeAt: R.home || 99999 } });
      pip('pipl', R.letter, O(R.circle, '+2.2'), 'HIS LETTER', [-420, -260]);
      b(R.letterIn || R.letter, GH, 'lt', Object.assign({ move: 'whip', fill: 0.84, st: 'corner-left', pose: 'point' }, LAY, { sx: 500 }));
      b(R.circle, ZN, 'lt.money', { fill: 0.5, maxH: 420, sy: 900, st: 'corner-left', pose: 'shock', dur: 0.5, sx: 520 });
      b(O(R.circle, '+1.6'), PB, 'lt', Object.assign({ fill: 0.84, st: 'corner', sx: 500 }, LAY));
      sfx(R.letter, 'typewriter_2', -11, 2.0); sfx(R.circle, 'paper_slam_2', -9); sfx(R.circle, 'cinematic_hit_1', -10, 0.8); }

    // ---- THE HOTEL: dealer + Uffizi director check the painting ----
    { const [x, y] = seg();
      E.push({ id: 'ck', type: 'checkers', at: [x, y], in: O(R.hotel, '-0.4'), props: { art: ART, at: R.hotel, realAt: R.real } });
      pip('pipk', R.hotel, O(R.real, '+0.8'), 'HIS HOTEL', [380, 250], {}, [190, 560]);
      b(R.hotel, SB, 'ck', Object.assign({ move: 'whip', fill: 0.92, st: 'corner-left', pose: 'point' }, LAY, { sx: 540 }));
      b(R.real, ZN, 'ck.stamp', { fill: 0.84, maxH: 760, sy: 900, st: 'corner-left', pose: 'shock', dur: 0.5 });
      b(O(R.real, '+0.9'), PB, 'ck', Object.assign({ fill: 0.92, st: 'corner' }, LAY));
      sfx(R.hotel, 'swoosh_2', -11, 0.8); sfx(R.real, 'rubber_stamp_2', -5); sfx(R.real, 'ding_2', -9, 0.7); }

    // ---- THE ARREST: cuffs + MID-DEC 1913 + his face X ----
    { const [x, y] = seg();
      E.push({ id: 'sa', type: 'suspect', at: [x - 410, y + 20], in: O(R.arrest, '-0.5'), props: Object.assign({}, SUS, NAME, { w: 440, flash: true, tilt: -0.02, credit: CRED, mono: true, xmark: O(R.arrest, '+0.6'), stamps: [{ text: 'CAUGHT', at: O(R.arrest, '+0.9'), size: 60, x: 0, y: 40, rot: -0.1 }] }) });
      E.push({ id: 'cf', type: 'cuffs', at: [x + 400, y], in: O(R.arrest, '-0.4'), props: { at: R.arrest, stampAt: O(R.arrest, '+0.8') } });
      b(R.arrest, SB, ['sa', 'cf'], { move: 'whip', sx: 540, sy: 860, fill: 0.98, maxH: 1000, st: 'corner', pose: 'shock' });
      b(O(R.arrest, '+0.7'), ZN, 'sa', { fill: 0.6, maxH: 700, sy: 870, st: 'corner', pose: 'shock', dur: 0.5 });
      b(O(R.arrest, '+2.0'), GH, ['sa', 'cf'], { sx: 540, sy: 860, fill: 0.98, maxH: 1000, st: 'corner', pose: 'talk', dur: 0.8 });
      sfx(R.arrest, 'camera_shutter_1', -8, 0.4); sfx(O(R.arrest, '+0.4'), 'thud_1', -8, 0.4); sfx(O(R.arrest, '+0.8'), 'rubber_stamp_2', -6); SH.push([O(R.arrest, '+0.8'), 14]); }

    // ---- EVIDENCE BOARD ----
    { const [x, y] = seg(), bd = R.board;
      E.push({ id: 'board', type: 'board', at: [x, y], in: O(bd, '-0.4'), props: { title: 'EVIDENCE BOARD', caseNo: 'CASE FILE Nº 028', tightAt: R.boardTight, items: [
        { id: 'ph', k: 'photo', src: P1, crop: [0, 0, 1, 1], fx: 0.52, fy: 0.32, x: 0, y: -280, w: 330, h: 410, name: 'VINCENZO PERUGGIA', nameSize: 24, at: O(bd, '-0.2'), rot: -0.02, push: 0.3 },
        { id: 'n1', k: 'note', x: -300, y: 120, w: 270, h: 290, icon: 'cheque', size: 34, lines: [['500,000', 'bad', 38], ['LIRE', 'ink', 28]], at: O(bd, '+0.3'), rot: -0.05 },
        { id: 'n2', k: 'note', x: 0, y: 150, w: 270, h: 290, icon: 'labels', size: 40, lines: [['2 YRS', 'bad'], ['NO CLUE', 'ink', 26]], at: O(bd, '+0.6'), rot: 0.03 },
        { id: 'n3', k: 'note', x: 300, y: 120, w: 270, h: 290, icon: 'cuffs', size: 36, lines: [['MID-DEC', 'bad', 38], ['1913', 'ink', 34]], at: O(bd, '+0.9'), rot: 0.05 },
        { id: 'n4', k: 'note', x: 0, y: 440, w: 700, h: 270, size: 82, lines: [['HIS OWN LETTER', 'bad', 76]], at: O(bd, '+1.2'), rot: -0.02, stamp: { text: 'CAUGHT HIMSELF', at: O(bd, '+1.5'), y: -86, size: 34, rot: -0.04 } } ],
        strings: [[0, 1, O(bd, '+0.5')], [0, 2, O(bd, '+0.8')], [0, 3, O(bd, '+1.1')], [0, 4, O(bd, '+1.4')], [1, 4, O(R.boardTight, '-0.2')], [2, 4, O(R.boardTight, '-0.1')], [3, 4, R.boardTight]] } });
      b(bd, PK, 'board', { move: 'whip', sy: 800, fill: 0.9, maxH: 860, pose: 'chin' });
      b(O(bd, '+0.9'), GH, 'board', { sy: 800, fill: 0.9, maxH: 860, st: 'corner-left', pose: 'point', dur: 0.7 });
      b(R.boardTight, PB, 'board', { fill: 0.86, maxH: 860, sy: 800, st: 'corner-left', dur: 0.6 });
      sfx(bd, 'paper_slam_2', -10); sfx(O(bd, '+0.3'), 'camera_shutter_1', -9, 0.4); sfx(R.boardTight, 'typewriter_1', -12, 1.0); }

    // ---- VERDICT ----
    { const [x, y] = seg();
      E.push({ id: 'sv', type: 'suspect', at: [x - 390, y + 20], in: O(R.verd, '-0.5'), props: Object.assign({}, SUS, NAME, { w: 440, flash: false, tilt: -0.02, credit: CRED, mono: true, stamps: [{ text: 'SENTENCED', at: R.guilty, size: 58, x: 0, y: -10, rot: -0.1 }], bars: R.served }) });
      E.push({ id: 'vd', type: 'verd2', at: [x + 410, y - 20], in: O(R.verd, '-0.5'), props: { guiltyAt: R.guilty, termAt: R.term, servedAt: R.served } });
      b(R.verd, SB, ['sv', 'vd'], { move: 'whip', sx: 540, sy: 860, fill: 0.98, maxH: 960, st: 'corner', pose: 'point' });
      b(R.term, ZN, 'vd.term', { fill: 0.84, maxH: 700, sy: 880, st: 'off', pose: 'shock', dur: 0.45, sx: 540 });
      b(R.served, GH, ['sv', 'vd'], { move: 'whip', sx: 540, sy: 860, fill: 0.98, maxH: 960, st: 'corner', pose: 'talk', dur: 0.8 });
      sfx(R.guilty, 'gavel_1', -4, 0.8); sfx(R.term, 'cinematic_hit_1', -4, 1.0); sfx(R.term, 'deep_boom_1', -5, 1.2); sfx(R.served, 'cell_door_1', -7, 1.0); sfx(R.served, 'rubber_stamp_2', -5); SH.push([R.term, 22], [R.guilty, 12]); }

    // ---- HIS EXCUSE: FOR ITALY (quote card with the front-view crop) ----
    { const [x, y] = seg();
      E.push({ id: 'qc', type: 'suspect', at: [x, y], in: O(R.excuse, '-0.4'), props: Object.assign({}, SUS2, { variant: 'side', w: 800, pw: 360, aspect: 1.1, name: '', quote: ['FOR', 'ITALY'], quoteAt: R.excuse, quoteSize: 120, quoteSub: 'HIS EXCUSE', flash: true, tilt: -0.02, credit: CRED, stamps: [{ text: 'HIS CLAIM', at: O(R.excuse, '+0.9'), size: 50, x: -120, y: 100, rot: -0.1 }], ring: O(R.excuse, '+0.3') }) });
      b(R.excuse, SB, 'qc', { move: 'whip', sx: 540, sy: 820, fill: 0.94, maxH: 640, st: 'corner', pose: 'shrug' });
      sfx(R.excuse, 'camera_shutter_2', -8, 0.4); sfx(O(R.excuse, '+0.3'), 'paper_slam_2', -10); sfx(O(R.excuse, '+0.9'), 'rubber_stamp_2', -7); }

    // ---- FAMOUS ----
    { const [x, y] = seg();
      E.push({ id: 'fm', type: 'famous', at: [x, y], in: O(R.famous, '-0.5'), props: { art: ART, at: R.famousWord } });
      b(R.famous, GH, 'fm', Object.assign({ move: 'whip', fill: 0.92, st: 'corner-left', pose: 'point' }, LAY, { maxH: 960, sy: 830 }));
      b(R.famousWord, ZN, 'fm.banner', { fill: 0.92, maxH: 780, sy: 880, st: 'corner-left', pose: 'shock', dur: 0.6 });
      sfx(R.famous, 'swoosh_2', -11, 0.9); sfx(R.famousWord, 'cinematic_hit_1', -6, 1.0); sfx(R.famousWord, 'camera_shutter_1', -9, 0.4); }
    if (R.recap) { const [x, y] = seg();
      E.push({ id: 'rc', type: 'text', at: [x, y], in: O(R.recap[0], '-0.2'), props: { lines: [[['2 YEARS', 'paper']], [['NO CLUE', 'bad']], [['1 LETTER', 'gold']]], size: 130, per: 0.35 } });
      b(R.recap[0], SB, 'rc', { move: 'whip', sx: 540, sy: 860, fill: 0.78, maxH: 620, st: 'corner-left', pose: 'talk' });
      sfx(R.recap[0], 'thud_1', -8, 0.4); sfx(R.recap[1], 'paper_slam_2', -8); }

    // ---- CTAs + comment bubble ----
    cfg.cta.forEach(c => {
      if (c.k === 'heart') { E.push({ id: 'heart', type: 'heart', layer: 'screen', at: [800, 930], in: O(c.at, '-0.05'), out: O(c.at, '+1.15'), props: { s: 1 } }); sfx(c.at, 'heartbeat_1', -8, 0.9); }
      if (c.k === 'send') { E.push({ id: 'plane', type: 'plane', layer: 'screen', at: [540, 960], in: O(c.at, '-0.05'), out: O(c.at, '+1.2'), props: { dur: 0.9, from: [-230, 250], to: [280, -330], s: 1.5 } }, { id: 'sendtx', type: 'text', layer: 'screen', at: [820, 440], in: O(c.at, '+0.15'), out: O(c.at, '+1.2'), props: { lines: [[['SEND', 'gold']]], size: 70 } }); sfx(c.at, 'swoosh_2', -9, 1.0); }
      if (c.k === 'follow') { E.push({ id: 'mag', type: 'mag', layer: 'screen', at: [830, 1010], in: O(c.at, '-0.05'), out: O(c.at, '+1.45'), props: { press: 0.5 } }, { id: 'btn', type: 'follow', layer: 'screen', at: [830, 1010], scale: 0.8, in: O(c.at, '-0.05'), out: O(c.at, '+1.45'), props: { press: 0.5 } }); PO.push([O(c.at, '-0.1'), 'follow', { target: [830, 1010] }], [O(c.at, '+1.5'), 'talk']); sfx(O(c.at, '+0.5'), 'click_1', -8, 0.3); sfx(O(c.at, '+0.58'), 'success_chime_1', -12, 1.0); }
    });
    E.push({ id: 'ask', type: 'bubble', layer: 'screen', at: [600, 1090], in: R.ask, out: R.askEnd, props: { l1: cfg.ask[0], l2: cfg.ask[1], size: 52, tail: 'left' } });
    b(R.loop, SB, ['hook2', 'w0', 'sus0'], { move: 'whip', sx: 540, sy: 850, fill: 0.98, maxH: 880, st: STK, pose: 'shock' });
    b(R.ask, PF, ['hook2', 'sus0'], { sy: 880, pose: 'talk' });
    sfx(R.loop, 'rewind_2', -11, 0.9); sfx(R.ask, 'pop_1', -9, 0.5);

    // ---- HUD ----
    const lab = [{ at: -1, text: 'THE THEFT' }, { at: O(R.painter, '-0.2'), text: 'THE ALARM' }, { at: O(R.press, '-0.2'), text: 'THE FALLOUT' }, { at: O(R.cal, '-0.2'), text: 'THE COLD TRAIL' }, { at: O(R.y13, '-0.2'), text: 'THE SLIP' }, { at: O(R.hotel, '-0.2'), text: 'THE TRAP' }, { at: O(R.verd, '-0.2'), text: 'THE SENTENCE' }, { at: O(R.famous, '-0.2'), text: 'THE AFTERMATH' }];
    const itm = [{ at: R.cal, label: 'MISSING (MONTHS)', to: 28, dur: cfg.calDur, from: 0 }, { at: R.circle, label: 'HIS ASKING PRICE', to: 500000, suffix: ' LIRE', dur: 0.9, from: 0 }];
    E.push({ id: 'hud', type: 'hud', layer: 'screen', at: [0, 0], in: -1, props: { labels: lab, items: itm } });
    B.scene({
      series: 'decoded', title: 'CASE FILE Nº 028 · PERUGGIA', duration: cfg.duration,
      footnote: ['SENTENCED IN FLORENCE, 1914 · SOURCES: SMITHSONIAN · HISTORY.COM · TIME', 'ILLUSTRATIONS: WALL · NEWSPAPERS · FLAT · LETTER · HOTEL · CUFFS (GENERIC)', 'PHOTOS: PARIS POLICE 1909 · PUBLIC DOMAIN · MONA LISA: PD REPRODUCTION · VIA WIKIMEDIA COMMONS'],
      elements: E, beats: T, poses: PO, shakes: SH, captions: cfg.captions,
      bed: { name: 'noir_bed_1', gain: -1 }, sfx: S,
    });
  };
})();
