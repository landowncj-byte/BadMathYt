// ---------------- COLD OPEN (P001-P008): the farmhouse table, real money ----------------
// P001: frame 0 — top-down table, banknote bundles thud onto the board, £2.6M counter, the gang card
pr('b1', 'board', R0(0) + 190, 110, -1, { w: 860, h: 540, drops: [0.15, 0.4, 0.65, 0.9], flip: '@P001:real' }, { out: '@P002-0.2' });
el('c1', 'counter', R0(0) + 190, -290, -1, { label: 'STOLEN FROM THE TRAIN', to: 2.6, decimals: 1, prefix: '£', suffix: ' MILLION', at: 0.15, dur: 0.85, tone: 'bad', size: 96, w: 700 }, { out: '@P002-0.2' });
con('k1', 'mono', R0(0) - 560, 60, 0.3, { w: 400, variant: 'card', file: true, caseNo: 'CASE Nº 1', flash: true }, { out: '@P002-0.2' });
bt(0, 'graphic-hero', ['b1', 'k1', 'c1'], { fill: 0.95, sy: 470, pose: 'point' }); for (const [i, t] of [0.15, 0.4, 0.65, 0.9].entries()) sf(t, 'thud_1', -7 - i * 0.5, 0.5); sf(0.15, 'money_counter_1', -11, 1.0); sf(0.3, 'camera_flash_1', -9, 0.6);
bt('@P001:farmhouse', 'graphic-hero', ['b1', 'c1'], { fill: 0.78, sy: 480, pose: 'chin' });
bt('@P001:monopoly', 'graphic-hero', ['b1', 'c1'], { fill: 0.66, maxH: 780, sy: 470, pose: 'point' });
bt('@P001:real', 'zoom-on-number', 'c1.value', { fill: 0.4, maxH: 400, sy: 470, pose: 'shock' }); sf('@P001:real', 'cash_register_1', -8, 1.0);
// P002: play money X, real notes check; a train passes behind
pr('t2', 'train', R0(1), -330, '@P002-0.3', { w: 1500, h: 170, cars: 4, a: '@P002:train-1.0', b: '@P002:train+0.8' }, { out: '@P003-0.2' });
pr('n2a', 'notes', R0(1) - 480, 90, '@P002-0.3', { w: 560, h: 420, mode: 'play' }, { out: '@P003-0.2' });
pr('n2b', 'notes', R0(1) + 420, 90, '@P002:real-0.3', { w: 560, h: 420, mode: 'real' }, { out: '@P003-0.2' });
el('s2a', 'stamp', R0(1) - 480, 100, '@P002:paper+0.3', { text: 'NOT THESE', tone: 'bad', size: 84 }, { rot: -0.1, out: '@P003-0.2' });
el('s2b', 'stamp', R0(1) + 420, 100, '@P002:notes', { text: 'THESE', tone: 'good', size: 96 }, { rot: -0.08, out: '@P003-0.2' });
bt('@P002', 'graphic-hero', ['n2a', 'n2b', 't2'], { move: 'whip', fill: 0.86, sy: 470, pose: 'point' }); sf('@P002-0.3', 'swoosh_2', -11, 0.5);
bt('@P002:paper', 'zoom-on-number', 'n2a', { fill: 0.34, maxH: 520, sy: 480, pose: 'shrug' }); sf('@P002:paper+0.3', 'rubber_stamp_2', -8, 0.5);
bt('@P002:real', 'zoom-on-number', 'n2b', { fill: 0.34, maxH: 520, sy: 480, pose: 'point' }); sf('@P002:notes', 'rubber_stamp_2', -8, 0.5); sf('@P002:train-0.6', 'whoosh_2', -12, 1.4);
bt('@P002:stolen', 'graphic-hero', ['t2', 'n2b'], { fill: 0.7, sy: 450, pose: 'chin' });
// P003: the board game is part of how they got caught (magnifier sweeps the board, a print glows; no ketchup yet)
pr('b3', 'board', R0(2), 60, '@P003-0.3', { w: 1100, h: 640, mag: ['@P003:board', '@P003:caught+0.3'], fp: '@P003:part' }, { out: '@P004-0.2' });
bt('@P003', 'graphic-hero', 'b3', { move: 'whip', fill: 0.6, maxH: 780, sy: 480, pose: 'point' }); sf('@P003-0.3', 'swoosh_2', -11, 0.5);
bt('@P003:part', 'zoom-on-number', 'b3', { fill: 0.56, maxH: 760, sy: 480, pose: 'shock' }); sf('@P003:part', 'suspense_drone_1', -12, 2.0);
// P004: the plans are huge, the mistakes are tiny
pr('bp4', 'blueprint', R0(3), 60, '@P004-0.3', { w: 1300, h: 640, a: '@P004', dot: '@P004:mistakes' }, { out: '@P005-0.2' });
el('h4', 'text', R0(3), -400, '@P004:plans', { lines: [[['THE PLANS ARE ', 'paper'], ['HUGE', 'good']]], size: 84 }, { out: '@P004:mistakes' });
el('t4', 'text', R0(3), -400, '@P004:mistakes', { lines: [[['THE MISTAKES ARE ', 'paper'], ['TINY', 'bad']]], size: 84 }, { out: '@P005-0.2' });
bt('@P004', 'graphic-hero', ['bp4', 'h4'], { move: 'whip', fill: 0.78, sy: 480, pose: 'chin' }); sf('@P004-0.3', 'swoosh_2', -11, 0.5); sf('@P004:plans', 'paper_rustle_2', -9, 1.2);
bt('@P004:huge', 'graphic-hero', 'bp4', { fill: 0.74, sy: 500, pose: 'point' });
bt('@P004:tiny', 'zoom-on-number', 'bp4.dot', { fill: 0.2, maxH: 600, sx: 960, sy: 480, pose: 'shock' }); sf('@P004:tiny', 'pop_2', -6, 0.4); sk('@P004:tiny', 8);
// P005 / P006: five case folders fan out, one opens per item on its word
const FK = [['board', 'THE BOARD GAME'], ['sandwich', 'THE SANDWICH'], ['car', 'THE LISTENING CAR'], ['cell', 'THE PARTNER'], ['hedge', 'THE DOG']];
const FW = ['board', 'sandwich', 'car', 'partner', 'pickles'];
FK.forEach(([k, t], i) => el('f' + i, 'casefolder', R0(4) + (i - 2) * 370, 40 + Math.abs(i - 2) * 24, `@P005:five+${(i * 0.13).toFixed(2)}`, { n: i + 1, title: t, kind: k, src: IMG('specs_stripes'), openAt: `@P006:${FW[i]}`, tilt: (i - 2) * 0.05 }, { out: '@P007-0.2' }));
el('fiveT', 'text', R0(4), -420, '@P005-0.2', { lines: [[['FIVE ', 'accent'], ['ROBBERIES', 'paper']]], size: 100 }, { out: '@P007-0.2' });
bt('@P005', 'graphic-hero', ['fiveT', 'f0', 'f4'], { move: 'whip', fill: 0.92, sy: 480, pose: 'point' }); sf('@P005-0.3', 'swoosh_2', -11, 0.5); for (let i = 0; i < 5; i++) sf(`@P005:five+${(i * 0.13).toFixed(2)}`, 'pop_2', -9, 0.3);
bt('@P005:famous', 'graphic-hero', ['f0', 'f4'], { fill: 0.9, sy: 500, pose: 'chin' });
bt('@P005:dumb', 'zoom-on-number', 'f2', { fill: 0.28, maxH: 560, sy: 500, pose: 'shock' }); sf('@P005:dumb', 'pop_2', -8, 0.4);
FW.forEach((w, i) => { bt(`@P006:${w}`, 'graphic-hero', 'f' + i, { fill: 0.3, maxH: 600, sy: 500, pose: i % 2 ? 'point' : 'chin' }); sf(`@P006:${w}`, 'paper_fold_1', -9, 0.6); });
con('pk6', 'pick', R0(4) + 2 * 370 + 20, -340, '@P006:pickles', { w: 250, variant: 'pip', label: 'PICKLES', aspect: 0.9 }, { out: '@P007-0.2' });
// P007: five folders line up as rising steps 1 to 5
for (let i = 0; i < 5; i++) { const h = 270 + i * 46; el('st' + i, 'casefolder', R0(5) + (i - 2) * 330, 330 - h / 2, `@P007+${(i * 0.14).toFixed(2)}`, { n: i + 1, title: FK[i][1], kind: FK[i][0], src: IMG('specs_stripes'), w: 290, h, openAt: -1e9 }, { out: '@P008-0.2' }); }
bt('@P007', 'graphic-hero', ['st0', 'st4'], { move: 'whip', fill: 0.9, sy: 500, pose: 'point' }); sf('@P007-0.3', 'swoosh_2', -11, 0.5); for (let i = 0; i < 5; i++) sf(`@P007+${(i * 0.14).toFixed(2)}`, 'pop_2', -9 + i * 0.6, 0.3);
bt('@P007:bigger', 'zoom-on-number', 'st4', { fill: 0.24, maxH: 700, sy: 480, pose: 'shock' }); sf('@P007:bigger', 'riser_1', -12, 1.4);
// P008: whip back to the farmhouse; the title lands at the end
pr('b8', 'board', R0(6) + 190, 110, '@P008-0.3', { w: 860, h: 540, drops: ['@P008', '@P008+0.2', '@P008+0.4', '@P008+0.6'] }, { out: '@P009-0.2' });
con('k8', 'mono', R0(6) - 560, 60, '@P008-0.2', { w: 400, variant: 'card', file: true, caseNo: 'CASE Nº 1' }, { out: '@P009-0.2' });
el('ttl', 'headline', R0(7), 60, '@P008:farmhouse-0.1', { kicker: 'A BAD MATH CASE FILE', lines: [[['5 HEISTS', 'accent']], [['1 DUMB MISTAKE EACH', 'paper']]], size: 150, underAt: 0.7 }, { out: '@P009-0.2' });
bt('@P008', 'graphic-hero', ['b8', 'k8'], { move: 'whip', fill: 0.9, sy: 470, pose: 'point' }); sf('@P008-0.3', 'swoosh_2', -11, 0.5); sf('@P008', 'thud_1', -8, 0.5);
bt('@P008:farmhouse', 'graphic-hero', 'ttl', { move: 'whip', fill: 0.84, sy: 470, pose: 'shock', dur: 0.5 }); sf('@P008:farmhouse-0.1', 'deep_boom_1', -4, 2.0); sk('@P008:farmhouse', 12);
