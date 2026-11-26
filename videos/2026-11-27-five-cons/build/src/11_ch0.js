// ---------------- COLD OPEN (P01-P06): three faces, three numbers ----------------
const R0 = k => K(RM[0], k);
// P01: the wine con — Kurniawan photo + $2.1M + bottles tagged FAKE on "kitchen"
con('k0', 'kur', R0(0) - 640, 60, -3, { w: 440, variant: 'card', stamps: [{ text: 'FAKE WINE', at: '@P01:kitchen', tone: 'bad', size: 60, rot: -0.1, y: 40 }], file: true, caseNo: 'CASE Nº 1' }, { out: '@P02-0.2' });
el('c21', 'counter', R0(0) + 330, -60, -3, { label: 'A BILLIONAIRE PAID', sub: 'FOR "RARE" WINE', to: 2100000, prefix: '$', at: '@P01:$2', dur: 1.3, tone: 'bad', size: 150, w: 900 }, { out: '@P02-0.2' });
el('b0', 'bottles', R0(0) + 330, 280, '@P01:wine-0.1', { items: [{ label: '1945', at: '@P01:wine' }, { label: '1982', at: '@P01:wine+0.12' }, { label: '1990', at: '@P01:wine+0.24' }], fakeAt: '@P01:kitchen', gap: 170 }, { out: '@P02-0.2' });
bt(0, 'graphic-hero', ['k0', 'c21'], { fill: 0.74, sy: 480, pose: 'point' }); sf(0, 'paper_slam_2', -9, 0.5); sf(0.05, 'camera_flash_1', -9, 0.6);
bt('@P01:$2', 'zoom-on-number', 'c21.value', { fill: 0.42, sy: 520 }); sf('@P01:$2', 'money_counter_2', -12, 1.4); sf('@P01:million+0.2', 'deep_boom_1', -6, 1.0); sk('@P01:million+0.2', 12);
bt('@P01:wine', 'graphic-hero', ['k0', 'c21', 'b0'], { fill: 0.78, sy: 500, pose: 'point' });
bt('@P01:kitchen', 'zoom-on-number', 'k0', { fill: 0.3, maxH: 760, sy: 520, pose: 'shock' }); sf('@P01:kitchen', 'rubber_stamp_2', -5, 0.5);
// P02: the bank con — 4,000,000 customers who did not exist, Javice small, $175M
el('bank', 'icon', R0(1) - 560, 20, '@P02-0.3', { kind: 'building', s: 380, col: 'paper' }, { out: '@P03-0.2' });
el('c175', 'counter', R0(1) + 160, -170, '@P02-0.3', { label: 'A BANK PAID', to: 175000000, prefix: '$', at: '@P02:$175', dur: 1.5, tone: 'bad', size: 130, w: 980 }, { out: '@P03-0.2' });
el('c4m', 'counter', R0(1) + 160, 150, '@P02:4-0.1', { label: 'FOR CUSTOMERS', to: 4000000, at: '@P02:4', dur: 1.2, tone: 'good', size: 130, w: 980, card: true }, { out: '@P03-0.2' });
con('j0', 'jav', R0(1) + 720, 340, '@P02:did-0.2', { w: 250, variant: 'pip', label: 'NEVER EXISTED', flash: false, xmark: '@P02:exist' }, { out: '@P03-0.2' });
bt('@P02', 'graphic-hero', ['bank', 'c175', 'c4m'], { move: 'whip', fill: 0.72, sy: 500, pose: 'point' }); sf('@P02-0.3', 'swoosh_2', -11, 0.5);
bt('@P02:$175', 'zoom-on-number', 'c175.value', { fill: 0.5, sy: 500 }); sf('@P02:$175', 'money_counter_1', -12, 1.6); sf('@P02:million+0.2', 'cash_register_1', -9, 0.9);
bt('@P02:4', 'zoom-on-number', 'c4m.value', { fill: 0.5, sy: 500 });
bt('@P02:did', 'graphic-hero', ['c4m', 'j0'], { fill: 0.6, sy: 500, pose: 'shock' }); sf('@P02:exist', 'glitch_1', -9, 0.6); sk('@P02:exist', 12);
// P03: the lottery con — $16.5M jackpot rigged by the man whose job was to protect it
con('t0', 'tip', R0(2) - 640, 60, '@P03-0.3', { w: 440, variant: 'card', file: true, caseNo: 'CASE Nº 3', stamps: [{ text: 'RIGGED IT', at: '@P03:rigged', tone: 'bad', size: 60, rot: -0.1, y: 40 }] }, { out: '@P04-0.2' });
el('lt0', 'lotto', R0(2) + 330, 0, '@P03-0.2', { w: 760, h: 440, amount: '$16.5 MILLION', ballsAt: '@P03:$16', stamp: 'RIGGED', stampAt: '@P03:rigged' }, { out: '@P04-0.2' });
el('lk', 'icon', R0(2) + 330, -330, '@P03:protect-0.3', { kind: 'lock', s: 180, col: 'paper' }, { out: '@P04-0.2' });
bt('@P03', 'graphic-hero', ['t0', 'lt0'], { move: 'whip', fill: 0.78, sy: 500, pose: 'point' }); sf('@P03-0.3', 'swoosh_2', -11, 0.5); sf('@P03-0.1', 'camera_flash_1', -9, 0.6);
bt('@P03:$16', 'zoom-on-number', 'lt0.amount', { fill: 0.42, sy: 500 }); sf('@P03:$16', 'money_counter_2', -12, 1.2);
bt('@P03:rigged', 'zoom-on-number', 'lt0', { fill: 0.4, maxH: 640, sy: 520, pose: 'shock' }); sf('@P03:rigged', 'rubber_stamp_2', -5, 0.5); sk('@P03:rigged', 12);
bt('@P03:protect', 'graphic-hero', ['t0', 'lt0', 'lk'], { fill: 0.78, sy: 540, pose: 'chin' });
// P04: five real cons, every one ended in a courtroom, caught the same way
for (const [i, w] of ['kur', 'gig', 'tip', 'tuc', 'jav'].entries()) con('f' + i, w, R0(3) + (i - 2) * 420, 60 + (i % 2) * 24, `@P04:five+${(i * 0.14).toFixed(2)}`, { w: 330, variant: 'card', tilt: (i - 2) * 0.03, flash: i < 2, credit: '' }, { out: '@P05-0.2' });
el('fiveT', 'text', R0(3), -400, '@P04-0.2', { lines: [[['FIVE REAL CONS', 'paper']]], size: 96 }, { out: '@P05-0.2' });
el('gav', 'icon', R0(3) + 960, -330, '@P04:courtroom-0.2', { kind: 'cuffs', s: 200, col: 'paper' }, { out: '@P05-0.2' });
bt('@P04', 'graphic-hero', ['fiveT', 'f0', 'f4'], { move: 'whip', fill: 0.9, sy: 470, pose: 'point' }); sf('@P04-0.3', 'swoosh_2', -11, 0.5);
for (let i = 0; i < 5; i++) sf(`@P04:five+${(i * 0.14).toFixed(2)}`, 'pop_2', -9, 0.3);
bt('@P04:every', 'zoom-on-number', 'f0', { fill: 0.22, maxH: 520, sy: 500 }); bt('@P04:courtroom', 'graphic-hero', ['f0', 'f4', 'gav'], { fill: 0.95, sy: 520, pose: 'shock' }); sf('@P04:courtroom', 'gavel_1', -6, 0.8);
bt('@P04:same', 'zoom-on-number', 'fiveT', { fill: 0.5, maxH: 300, sy: 360, pose: 'chin' });
// P05: not a genius detective — one small number that did not add up
el('q5', 'text', R0(4), -40, '@P05-0.3', { lines: [[['?', 'accent']]], size: 560 }, { out: '@P05:by-0.1' });
el('one', 'counter', R0(4), 20, '@P05:by-0.1', { label: 'ONE SMALL NUMBER', sub: 'THAT DID NOT ADD UP', to: 1, at: '@P05:one', dur: 0.4, tone: 'accent', size: 330, w: 900 }, { out: '@P06-0.2' });
el('mag', 'icon', R0(4) + 480, -140, '@P05:small-0.1', { kind: 'magnifier', s: 280, col: 'paper' }, { out: '@P06-0.2' });
bt('@P05', 'graphic-hero', 'q5', { move: 'whip', fill: 0.3, maxH: 700, sy: 480, pose: 'chin' }); sf('@P05-0.2', 'suspense_drone_1', -18, 3, 0);
bt('@P05:by', 'graphic-hero', ['one', 'mag'], { fill: 0.58, sy: 480, pose: 'point' }); sf('@P05:one', 'pop_2', -8, 0.4); bt('@P05:small', 'zoom-on-number', 'one.value', { fill: 0.34, maxH: 480, sy: 480, pose: 'shock' }); sf('@P05:did', 'wrong_buzzer_2', -12, 0.6);
// P06: stick around — the pattern board teaser, then the title
el('bt', 'board', R0(5), 40, '@P06-0.3', { w: 1300, h: 760, title: 'THE PATTERN', caseNo: '5 CASES · 1 CLUE', items: [
  { k: 'photo', src: CON.kur.src, x: -480, y: -150, w: 230, h: 260, name: 'KURNIAWAN', at: '@P06+0.1', rot: -0.05, fx: 0.49, fy: 0.4 }, { k: 'photo', src: CON.gig.src, crop: [0.5, 0, 0.5, 1], x: -240, y: -130, w: 230, h: 260, name: 'GIGNAC', at: '@P06+0.25', rot: 0.04, fx: 0.46, fy: 0.4 },
  { k: 'photo', src: CON.tip.src, x: 0, y: -150, w: 230, h: 260, name: 'TIPTON', at: '@P06+0.4', rot: -0.03 }, { k: 'photo', src: CON.tuc.src, x: 240, y: -130, w: 230, h: 260, name: 'TUCKER', at: '@P06+0.55', rot: 0.05 }, { k: 'photo', src: CON.jav.src, x: 480, y: -150, w: 230, h: 260, name: 'JAVICE', at: '@P06+0.7', rot: -0.04 },
  { x: 0, y: 190, w: 420, h: 150, lines: [['?', 'bad', 90]], at: '@P06:pattern', rot: 0.02 }], strings: [[0, 1, '@P06+0.9'], [1, 2, '@P06+1.1'], [2, 3, '@P06+1.3'], [3, 4, '@P06+1.5'], [0, 5, '@P06:pattern'], [4, 5, '@P06:pattern+0.2']], tightAt: 99999 }, { out: '@P06>-0.2' });
el('ttl', 'headline', R0(6), 40, '@P06>-0.1', { kicker: 'A BAD MATH CASE FILE', lines: [[['5 ', 'accent'], ['CONS', 'paper']]], size: 260, underAt: 0.9 });
bt('@P06', 'graphic-hero', 'bt', { move: 'whip', fill: 0.7, sy: 470, pose: 'point' }); sf('@P06-0.3', 'swoosh_2', -11, 0.5);
for (let i = 0; i < 5; i++) sf(`@P06+${(0.1 + i * 0.15).toFixed(2)}`, 'camera_flash_1', -14, 0.4);
bt('@P06:pattern', 'zoom-on-number', 'bt', { fill: 0.62, maxH: 780, sy: 470, pose: 'shock' }); sf('@P06:pattern', 'heartbeat_1', -10, 2);
bt('@P06>-0.1', 'graphic-hero', 'ttl', { move: 'whip', fill: 0.72, sy: 470, pose: 'shock', dur: 0.5 }); sf('@P06>-0.2', 'deep_boom_1', -3, 2.0); sk('@P06>-0.1', 12);
