// ---------------- CH5 · THE LESSON: 3 CHECKS (P77-P88) — steel room, evidence board with all four faces ----------------
const R5 = k => K(RM[5], k);
el('ch5', 'headline', R5(0) - 300, -250, '@P77-0.3', { kicker: 'CHAPTER FIVE', lines: [[['THE ', 'paper'], ['LESSON', 'accent']]], size: 150, underAt: 1.0 }, { out: '@P78-0.2' });
// the board: four faces on the top row, four clues underneath, strings pull face -> clue and go tight
const BX = R5(0) + 200, BY = 40;
const faces = [['per', -540], ['mee', -180], ['kuj', 180], ['kur', 540]];
const clues = [
  { id: 'cl1', x: -540, y: 300, icon: 'cash', lines: [['A LETTER', 'bad', 32], ['ASKING FOR MONEY', 'ink', 22]], at: '@P79:letter' },
  { id: 'cl2', x: -180, y: 300, lines: [['ONE MORE', 'bad', 34], ['FAKE PAINTED', 'bad', 34], ['TO PROVE THE REST', 'ink', 22]], at: '@P80:paint' },
  { id: 'cl3', x: 180, y: 300, lines: [['F  H', 'bad', 74], ['TWO PLASTIC LETTERS', 'ink', 22]], at: '@P81:plastic' },
  { id: 'cl4', x: 540, y: 300, icon: 'labels', lines: [['37 YEARS', 'bad', 34], ['TOO EARLY', 'ink', 26]], at: '@P82:37' },
];
el('bd5', 'board', BX, BY, '@P77-0.2', { w: 1500, h: 860, title: 'THE EVIDENCE BOARD', caseNo: '4 CASES · 1 PATTERN', items: [
  ...faces.map(([w, x], i) => ({ k: 'photo', src: CON[w].src, crop: CON[w].crop, x, y: -170, w: 250, h: 290, name: CON[w].name.split(' ').pop(), nameSize: 28, at: `@P77+${(0.1 + i * 0.2).toFixed(2)}`, rot: [-0.04, 0.03, -0.02, 0.04][i], fx: CON[w].fx, fy: CON[w].fy })),
  ...clues.map(c => ({ ...c, w: 270, h: 250, size: 28, rot: 0.02 * (c.x > 0 ? -1 : 1) })),
], strings: [[0, 4, '@P79:letter'], [1, 5, '@P80:paint'], [2, 6, '@P81:plastic'], [3, 7, '@P82:37']], tightAt: '@P83:detail' }, { out: '@P84-0.2' });
bt('@P77', 'graphic-hero', ['ch5', 'bd5'], { move: 'whip', dur0: 0.7, fill: 0.86, sy: 500, pose: 'shrug', arc: 0.2 }); sf('@P77-0.6', 'tape_stop_1', -8, 1.0); sf('@P77-0.1', 'cinematic_hit_1', -9, 1.5);
for (let i = 0; i < 4; i++) sf(`@P77+${(0.1 + i * 0.2).toFixed(2)}`, 'camera_flash_1', -12, 0.4);
bt('@P77:common', 'zoom-on-number', 'ch5', { fill: 0.4, maxH: 520, sy: 400, pose: 'point' });
bt('@P78', 'graphic-hero', 'bd5', { fill: 0.84, sy: 500, pose: 'point' });
bt('@P78:gave', 'graphic-hero', ['bd5.i0', 'bd5.i3'], { fill: 0.84, sy: 480, pose: 'chin' });
bt('@P79', 'zoom-on-number', ['bd5.i0', 'bd5.cl1'], { fill: 0.34, maxH: 640, sy: 560, pose: 'point' }); sf('@P79:letter', 'paper_slam_2', -10, 0.5); sf('@P79:letter', 'pop_2', -8, 0.4);
bt('@P80', 'zoom-on-number', ['bd5.i1', 'bd5.cl2'], { fill: 0.34, maxH: 640, sy: 560, pose: 'point' }); sf('@P80:paint', 'paper_slam_2', -10, 0.5);
bt('@P81', 'zoom-on-number', ['bd5.i2', 'bd5.cl3'], { fill: 0.34, maxH: 640, sy: 560, pose: 'point' }); sf('@P81:plastic', 'paper_slam_2', -10, 0.5);
bt('@P82', 'zoom-on-number', ['bd5.i3', 'bd5.cl4'], { fill: 0.34, maxH: 640, sy: 560, pose: 'shock' }); sf('@P82:37', 'paper_slam_2', -10, 0.5); sk('@P82:37', 10);
el('x37', 'counter', R5(0) + 1300, -250, '@P82:37-0.2', { label: 'YEARS TOO EARLY', to: 37, at: '@P82:37', dur: 0.7, tone: 'bad', size: 170, w: 560 }, { out: '@P83-0.2' });
bt('@P82:37', 'zoom-on-number', 'x37.value', { fill: 0.3, maxH: 420, sx: 1000, sy: 460, pose: 'shock' }); sf('@P82:37', 'rubber_stamp_2', -5, 0.5);
// P83 none took a genius detective; one detail anyone could check
el('mg83', 'icon', R5(1) + 100, -40, '@P83-0.3', { kind: 'magnifier', s: 360, col: 'paper' }, { out: '@P84-0.2' });
el('h83', 'headline', R5(1) + 100, 280, '@P83:detail-0.1', { lines: [[['ONE DETAIL. ', 'paper'], ['ANYONE CAN CHECK.', 'bad']]], size: 96, under: 'bad', underAt: 0.8 }, { out: '@P84-0.2' });
bt('@P83', 'graphic-hero', ['bd5'], { fill: 0.86, sy: 500, pose: 'point' });
bt('@P83:genius', 'graphic-hero', ['mg83'], { move: 'whip', fill: 0.22, maxH: 520, sy: 440, pose: 'chin' }); sf('@P83:genius', 'swoosh_2', -11, 0.5);
bt('@P83:detail', 'graphic-hero', ['mg83', 'h83'], { fill: 0.68, sy: 500, pose: 'point' }); sf('@P83:detail', 'typewriter_2', -11, 1.4);
bt('@P83:check', 'graphic-hero', 'h83', { fill: 0.9, maxH: 300, sy: 470, pose: 'shock' }); sf('@P83:check', 'rubber_stamp_2', -5, 0.5); sk('@P83:check', 10);
// P84-P86 the three checks, each lands on its number
el('cl84', 'checklist', R5(2), 20, '@P84-0.3', { title: 'THE 3 CHECKS ANYONE CAN DO', lockOpen: '@P86>', rows: [{ show: '@P84:one', t: 'READ THE BORING DETAILS', size: 44 }, { show: '@P85:two', t: 'ASK WHERE IT CAME FROM', size: 44 }, { show: '@P86:three', t: 'CHECK IT BEFORE YOU PAY', size: 44 }] }, { out: '@P87-0.2' });
const chip = (id, p, inn, text, tone, out) => el(id, 'badge', R5(2) + p, 450, inn, { text, tone, size: 32, tcol: 'paper' }, { out });
chip('c841', -420, '@P84:date-0.1', 'THE DATE', 'navy', '@P85-0.2'); chip('c842', 0, '@P84:spelling-0.1', 'THE SPELLING', 'navy', '@P85-0.2'); chip('c843', 440, '@P84:name-0.1', 'THE NAME ON THE FRONT', 'navy', '@P85-0.2');
chip('c851', -300, '@P85:secret-0.1', 'A SECRET SELLER', 'bad', '@P86-0.2'); chip('c852', 220, '@P85:lost-0.1', 'A LOST TREASURE THAT JUST SHOWED UP', 'bad', '@P86-0.2');
chip('c861', -300, '@P86:paid-0.1', 'THE MAGAZINE PAID FIRST', 'bad', '@P87-0.2'); chip('c862', 240, '@P86:tested-0.1', 'AND TESTED LATER', 'bad', '@P87-0.2');
bt('@P84', 'graphic-hero', 'cl84', { move: 'whip', fill: 0.62, maxH: 800, sy: 480, pose: 'point' }); sf('@P84-0.3', 'paper_slam_2', -10, 0.5); sf('@P84-0.3', 'swoosh_2', -11, 0.5);
bt('@P84:one', 'graphic-hero', ['cl84'], { fill: 0.5, maxH: 780, sy: 500 }); sf('@P84:one', 'pop_2', -9, 0.3);
bt('@P84:date', 'graphic-hero', ['cl84', 'c841', 'c843'], { fill: 0.7, sy: 500, pose: 'chin' }); sf('@P84:date', 'pop_2', -9, 0.3); sf('@P84:spelling', 'pop_2', -9, 0.3); sf('@P84:name', 'pop_2', -9, 0.3);
bt('@P85:two', 'graphic-hero', ['cl84'], { fill: 0.5, maxH: 780, sy: 500, pose: 'point' }); sf('@P85:two', 'pop_2', -9, 0.3);
bt('@P85:secret', 'graphic-hero', ['cl84', 'c851', 'c852'], { fill: 0.7, sy: 500, pose: 'chin' }); sf('@P85:secret', 'pop_2', -9, 0.3); sf('@P85:lost', 'pop_2', -9, 0.3);
bt('@P85:slow', 'zoom-on-number', 'c852', { fill: 0.4, maxH: 200, sx: 1000, sy: 640, pose: 'shock' });
bt('@P86:three', 'graphic-hero', ['cl84'], { fill: 0.5, maxH: 780, sy: 500, pose: 'chin' }); sf('@P86:three', 'pop_2', -9, 0.3);
bt('@P86:paid', 'graphic-hero', ['cl84', 'c861', 'c862'], { fill: 0.7, sy: 500, pose: 'point' }); sf('@P86:paid', 'cash_register_1', -10, 0.9); sf('@P86:tested', 'pop_2', -9, 0.3);
bt('@P86:cost', 'zoom-on-number', ['c861', 'c862'], { fill: 0.5, maxH: 200, sy: 640, pose: 'shock' }); sf('@P86:cost', 'rubber_stamp_2', -7, 0.5);
// P87 all four fail the test
for (let i = 0; i < 4; i++) con('fl' + i, ['per', 'mee', 'kuj', 'kur'][i], R5(3) + (i - 1.5) * 440, 40, `@P87:three+${(i * 0.15).toFixed(2)}`, { w: 340, variant: 'card', flash: false, credit: '', stamps: [{ text: 'FAILED', at: `@P87:caught+${(i * 0.25).toFixed(2)}`, tone: 'bad', size: 70, rot: -0.12, y: 20 }] }, { out: '@P88-0.2' });
bt('@P87', 'graphic-hero', ['fl0', 'fl3'], { move: 'whip', fill: 0.94, sy: 500, pose: 'point' }); sf('@P87-0.3', 'swoosh_2', -11, 0.5);
for (let i = 0; i < 4; i++) sf(`@P87:caught+${(i * 0.25).toFixed(2)}`, 'rubber_stamp_2', -6 + (i === 3 ? 2 : 0), 0.5);
bt('@P87:caught', 'graphic-hero', ['fl0', 'fl3'], { fill: 0.94, sy: 500, pose: 'shock' }); sk('@P87:caught+0.8', 12);
// P88 SUBSCRIBE moment, then END CARD
el('sub88', 'follow', 1480, 880, '@P88:subscribe-0.2', { press: 0.7, labels: ['SUBSCRIBE', '✓ SUBSCRIBED'] }, { layer: 'screen', out: '@P88:subscribe+1.6' });
sf('@P88:subscribe-0.15', 'pop_2', -9, 0.3); sf('@P88:subscribe+0.55', 'click_1', -8, 0.3); sf('@P88:subscribe+0.6', 'success_chime_1', -12, 1.2);
el('end88', 'headline', R5(4), 40, '@P88-0.3', { kicker: 'A NEW CASE EVERY WEEK', lines: [[['ONE TINY DETAIL', 'paper']], [['SINKS A ', 'paper'], ['GIANT LIE', 'bad']]], size: 130, underAt: 1.0 }, { out: '@P88>' });
bt('@P88', 'graphic-hero', 'end88', { move: 'whip', fill: 0.7, maxH: 640, sx: 860, sy: 480, st: 'corner', pose: 'point' }); sf('@P88-0.3', 'swoosh_2', -11, 0.5);
bt('@P88:tiny', 'zoom-on-number', 'end88', { fill: 0.7, maxH: 640, sx: 860, sy: 480, st: 'corner', pose: 'shock' });
bt('@P88:subscribe', 'graphic-hero', 'end88', { fill: 0.72, maxH: 640, sx: 860, sy: 480, st: 'corner', pose: 'follow' }); po('@P88:subscribe', 'follow', [1480, 880]); po('@P88:subscribe+1.2', 'point');
// END CARD (12 s after the last word): wordmark, YouTube end-screen slots, storyteller waving, music only
el('wm', 'text', 960, 140, '@P88>+0.2', { lines: [[['BAD MATH', 'paper']]], size: 150, shadow: true }, { layer: 'screen' });
el('slots', 'endslots', 0, 0, '@P88>+0.4', { rl: 'WATCH NEXT', cl: 'SUBSCRIBE' }, { layer: 'screen' });
bt('@P88>+0.3', 'wide', { x: RM[6], y: 0, w: 1000, h: 600 }, { move: 'whip', dur0: 0.9, fill: 0.5, sy: 470, st: { x: 1075, y: 1064, s: 1.05, layer: 'front' }, pose: 'wave', stDur: 0.9, arc: 0.2 }); sf('@P88>+0.1', 'swoosh_2', -9, 0.8); sf('@P88>+0.7', 'success_chime_2', -12, 1.4);
