// ---------------- CH6 · THE PATTERN (P71-P81) — steel room, evidence board with all five faces ----------------
const R6 = k => K(RM[6], k);
el('ch6', 'headline', R6(0) - 300, -250, '@P71-0.3', { kicker: 'CHAPTER SIX', lines: [[['THE ', 'paper'], ['PATTERN', 'accent']]], size: 150, underAt: 1.0 }, { out: '@P72-0.2' });
// the board: five faces on the top row, five clues pinned underneath, strings pull face -> clue
const BX = R6(0) + 200, BY = 40;
const faces = [['kur', -560], ['gig', -280], ['tip', 0], ['tuc', 280], ['jav', 560]];
const clues = [
  { id: 'cl1', x: -560, y: 300, icon: 'labels', lines: [['37 YEARS OLDER', 'bad', 30], ['THAN THE WINE', 'ink', 24]], at: '@P73:label' },
  { id: 'cl2', x: -280, y: 300, icon: 'fork', lines: [['A PRINCE', 'bad', 30], ['WHO ATE PORK', 'ink', 24]], at: '@P74:prince' },
  { id: 'cl3', x: 0, y: 300, icon: 'cheque', lines: [['A JACKPOT NOBODY', 'bad', 28], ['COULD CLAIM', 'ink', 24]], at: '@P75:jackpot' },
  { id: 'cl4', x: 280, y: 300, icon: 'cash', lines: [['A BALANCE THAT', 'bad', 28], ['NEVER MOVED', 'ink', 24]], at: '@P76:loan' },
  { id: 'cl5', x: 560, y: 300, icon: 'crown', lines: [['A LIST 14×', 'bad', 30], ['TOO BIG', 'ink', 24]], at: '@P77:customer' },
];
el('bd6', 'board', BX, BY, '@P71-0.2', { w: 1500, h: 860, title: 'THE EVIDENCE BOARD', caseNo: '5 CASES · 1 PATTERN', items: [
  ...faces.map(([w, x], i) => ({ k: 'photo', src: CON[w].src, crop: CON[w].crop, x, y: -170, w: 250, h: 290, name: CON[w].name.split(' ')[1], nameSize: 28, at: `@P71+${(0.1 + i * 0.18).toFixed(2)}`, rot: [-0.04, 0.03, -0.02, 0.04, -0.03][i], fx: CON[w].fx, fy: CON[w].fy === 0.45 ? 0.4 : CON[w].fy, ...(i === 0 ? { xmark: '@P80:failed' } : {}) })),
  ...clues.map(c => ({ ...c, w: 250, h: 240, size: 28, rot: 0.02 * (c.x > 0 ? -1 : 1) })),
], strings: [[0, 5, '@P73:label'], [1, 6, '@P74:prince'], [2, 7, '@P75:jackpot'], [3, 8, '@P76:loan'], [4, 9, '@P77:customer']], tightAt: '@P78:caught' }, { out: '@P79-0.2' });
bt('@P71', 'graphic-hero', ['ch6', 'bd6'], { move: 'whip', dur0: 0.7, fill: 0.86, sy: 500, pose: 'shrug', arc: 0.2 }); sf('@P71-0.6', 'tape_stop_1', -8, 1.0); sf('@P71-0.1', 'cinematic_hit_1', -9, 1.5);
for (let i = 0; i < 5; i++) sf(`@P71+${(0.1 + i * 0.18).toFixed(2)}`, 'camera_flash_1', -12, 0.4);
bt('@P71:pattern', 'zoom-on-number', 'ch6', { fill: 0.4, maxH: 520, sy: 400, pose: 'point' });
bt('@P72', 'graphic-hero', 'bd6', { fill: 0.84, sy: 500, pose: 'point' });
bt('@P73', 'zoom-on-number', ['bd6.i0', 'bd6.cl1'], { fill: 0.34, maxH: 640, sy: 560, pose: 'point' }); sf('@P73:label', 'paper_slam_2', -10, 0.5); sf('@P73:label', 'pop_2', -8, 0.4);
bt('@P74', 'zoom-on-number', ['bd6.i1', 'bd6.cl2'], { fill: 0.34, maxH: 640, sy: 560, pose: 'point' }); sf('@P74:prince', 'paper_slam_2', -10, 0.5);
bt('@P75', 'zoom-on-number', ['bd6.i2', 'bd6.cl3'], { fill: 0.34, maxH: 640, sy: 560, pose: 'point' }); sf('@P75:jackpot', 'paper_slam_2', -10, 0.5);
bt('@P76', 'zoom-on-number', ['bd6.i3', 'bd6.cl4'], { fill: 0.34, maxH: 640, sy: 560, pose: 'point' }); sf('@P76:loan', 'paper_slam_2', -10, 0.5);
bt('@P77', 'zoom-on-number', ['bd6.i4', 'bd6.cl5'], { fill: 0.34, maxH: 640, sy: 560, pose: 'shock' }); sf('@P77:customer', 'paper_slam_2', -10, 0.5); sk('@P77:customer', 10);
// P77 "fourteen times too big" counter, P78 one number, one detail
el('x14b', 'counter', R6(0) + 1300, -250, '@P77:14-0.2', { label: 'TOO BIG', to: 14, suffix: '×', at: '@P77:14', dur: 0.7, tone: 'bad', size: 170, w: 560 }, { out: '@P78-0.2' });
bt('@P77:14', 'zoom-on-number', 'x14b.value', { fill: 0.3, maxH: 420, sx: 1000, sy: 460, pose: 'shock' }); sf('@P77:14', 'rubber_stamp_2', -5, 0.5);
el('mg78', 'icon', R6(1) + 100, -40, '@P78-0.3', { kind: 'magnifier', s: 360, col: 'paper' }, { out: '@P79-0.2' });
el('h78', 'headline', R6(1) + 100, 280, '@P78:checked-0.1', { lines: [[['ONE NUMBER. ', 'paper'], ['ONE DETAIL.', 'bad']]], size: 100, under: 'bad', underAt: 0.8 }, { out: '@P79-0.2' });
bt('@P78', 'graphic-hero', ['bd6'], { fill: 0.86, sy: 500, pose: 'point' });
bt('@P78:smarter', 'graphic-hero', ['mg78'], { move: 'whip', fill: 0.22, maxH: 520, sy: 440, pose: 'chin' }); sf('@P78:smarter', 'swoosh_2', -11, 0.5);
bt('@P78:checked', 'graphic-hero', ['mg78', 'h78'], { fill: 0.66, sy: 500, pose: 'point' }); sf('@P78:checked', 'typewriter_2', -11, 1.4); bt('@P78:didn\'t', 'zoom-on-number', 'h78', { fill: 0.6, maxH: 300, sy: 470, pose: 'shock' }); sf('@P78:didn\'t', 'rubber_stamp_2', -5, 0.5); sk('@P78:didn\'t', 10);
// P79 the three-question test card; each question lands on its number
el('cl79', 'checklist', R6(2), 40, '@P79-0.3', { title: 'THE 3-QUESTION TEST', lockOpen: '@P79>', rows: [{ show: '@P79:one', t: 'DOES THIS NUMBER MAKE SENSE?' }, { show: '@P79:two', t: 'CAN I CHECK IT MYSELF, TODAY?' }, { show: '@P79:three#2', t: 'WHAT IF I SAY, “SHOW ME”?' }] }, { out: '@P81-0.2' });
bt('@P79', 'graphic-hero', 'cl79', { move: 'whip', fill: 0.62, maxH: 800, sy: 500, pose: 'point' }); sf('@P79-0.3', 'paper_slam_2', -10, 0.5); sf('@P79-0.3', 'swoosh_2', -11, 0.5);
for (const w of ['one', 'two', 'three']) { sf(`@P79:${w}${w === 'three' ? '#2' : ''}`, 'pop_2', -9, 0.3); }
bt('@P79:one', 'zoom-on-number', 'cl79.r0', { fill: 0.6, maxH: 300, sy: 480 }); bt('@P79:two', 'zoom-on-number', 'cl79.r1', { fill: 0.6, maxH: 300, sy: 480 }); bt('@P79:three#2', 'zoom-on-number', 'cl79.r2', { fill: 0.6, maxH: 300, sy: 480, pose: 'chin' });
// P80 every con would have failed: the ticks, then five FAILED stamps
for (let i = 0; i < 5; i++) con('fl' + i, ['kur', 'gig', 'tip', 'tuc', 'jav'][i], R6(3) + (i - 2) * 400, 40, `@P80:every+${(i * 0.15).toFixed(2)}`, { w: 320, variant: 'card', flash: false, credit: '', stamps: [{ text: 'FAILED', at: `@P80:failed+${(i * 0.25).toFixed(2)}`, tone: 'bad', size: 70, rot: -0.12, y: 20 }] }, { out: '@P81-0.2' });
bt('@P80', 'graphic-hero', ['fl0', 'fl4'], { move: 'whip', fill: 0.94, sy: 500, pose: 'point' }); sf('@P80-0.3', 'swoosh_2', -11, 0.5);
for (let i = 0; i < 5; i++) sf(`@P80:failed+${(i * 0.25).toFixed(2)}`, 'rubber_stamp_2', -6 + (i === 4 ? 2 : 0), 0.5);
bt('@P80:failed', 'graphic-hero', ['fl0', 'fl4'], { fill: 0.94, sy: 500, pose: 'shock' }); sk('@P80:failed+1.0', 12);
// P81 SUBSCRIBE moment + comment bubble, then END CARD
el('sub81', 'follow', 1480, 880, '@P81:subscribe-0.2', { press: 0.7, labels: ['SUBSCRIBE', '✓ SUBSCRIBED'] }, { layer: 'screen', out: '@P81:subscribe+1.6' });
sf('@P81:subscribe-0.15', 'pop_2', -9, 0.3); sf('@P81:subscribe+0.55', 'click_1', -8, 0.3); sf('@P81:subscribe+0.6', 'success_chime_1', -12, 1.2);
el('end81', 'headline', R6(4), 40, '@P81-0.3', { kicker: 'NEW CASE EVERY WEEK', lines: [[['THE MATH ', 'paper'], ['CATCHES', 'bad']], [['THE BAD GUY', 'paper']]], size: 130, underAt: 1.0 }, { out: '@P81>' });
bt('@P81', 'graphic-hero', 'end81', { move: 'whip', fill: 0.7, maxH: 640, sx: 860, sy: 480, st: 'corner', pose: 'point' }); sf('@P81-0.3', 'swoosh_2', -11, 0.5);
bt('@P81:subscribe', 'graphic-hero', 'end81', { fill: 0.72, maxH: 640, sx: 860, sy: 480, st: 'corner', pose: 'follow' }); po('@P81:subscribe', 'follow', [1480, 880]); po('@P81:subscribe+1.2', 'point');
// END CARD (12 s after the last word): clean dark card with YouTube end-screen slots
el('endc', 'endslots', RM[7], 40, '@P81>+0.4', { at: '@P81>+0.4', rl: 'WATCH NEXT', cl: 'SUBSCRIBE' }, { layer: 'screen' });
el('endt', 'headline', RM[7], -380, '@P81>+0.2', { kicker: 'BAD MATH', lines: [[['5 CONS. ', 'paper'], ['1 PATTERN.', 'accent']]], size: 86, under: 'accent', underAt: 0.8 }, {});
bt('@P81>+0.1', 'graphic-hero', 'endt', { move: 'whip', fill: 0.4, maxH: 400, sy: 260, st: 'off', pose: 'wave' });
po('@P81>+0.5', 'wave');
