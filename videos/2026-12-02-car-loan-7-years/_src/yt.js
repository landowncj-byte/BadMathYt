// Car loan 7 years · YouTube cut · WHAT IF · YOU character + cartoon sedan. Stations row-major, 5 per row, 1900 apart.
const SB = 'side-by-side', GH = 'graphic-hero', ZN = 'zoom-on-number', PF = 'presenter-front', PK = 'peek', PB = 'pull-back';
const YOU = 'videos/2026-12-02-car-loan-7-years/_src/img/you.png';
const ST = i => [(i % 5) * 1900, Math.floor(i / 5) * 1900], A = (i, dx = 0, dy = 0) => [ST(i)[0] + dx, ST(i)[1] + dy];
const F0 = { sx: 540, sy: 860, fill: 0.98, maxH: 940, st: { x: 915, y: 1395, s: 0.85 } };
const Y = (o) => Object.assign({ src: YOU, crop: [0, 0, 1, 1], fx: 0.5, fy: 0.4, aspect: 1.0, name: 'YOU', tag: 'ILLUSTRATION', flash: false }, o);
const els = [], beats = [], sfx = [], poses = [], shakes = [];
const E_ = (id, type, at, o) => els.push(Object.assign({ id, type, at }, o));
const HK = [[['LOW PAYMENT?', 'paper']], [['COSTS $5,287 MORE', 'bad']]];
// ---- S0 frame 0 ----
E_('hook', 'hook', A(0, 0, -440), { in: 0, out: SW(0,9) + 0.8, props: { lines: HK, sizes: [70, 76] } });
E_('hook2', 'hook', A(0, 0, -440), { in: E(19) - 0.9, props: { lines: HK, sizes: [70, 76] } });
E_('c395', 'counter', A(0, -250, -70), { in: -1, props: { to: 395, prefix: '−$', suffix: '/MO', at: 0.1, dur: 0.9, size: 112, tone: 'good', label: 'PAYMENT DROPS', w: 520 } });
E_('c5287', 'counter', A(0, 280, -70), { in: -1, props: { to: 5287, prefix: '+$', at: 0.7, dur: 0.8, size: 112, tone: 'bad', label: 'EXTRA INTEREST', w: 520 } });
E_('you0', 'suspect', A(0, -230, 250), { in: -1, props: Y({ w: 330, nick: 'HOLDING THE KEYS', tilt: -0.03, mono: false }) });
E_('car0', 'prop', A(0, 270, 260), { in: -1, props: { icon: 'car0', caption: 'NEW CAR', cap: 34, w: 360, h: 380, iconS: 250, slam: true, tilt: 0.04 } });
// ---- S1 borrow ----
E_('chk', 'prop', A(1, -260, 160), { in: S(1) - 0.3, props: { icon: 'check', caption: 'LOAN CHECK', cap: 34, w: 400, h: 340, iconS: 250, tilt: -0.05 } });
E_('car1', 'prop', A(1, 250, 160), { in: S(1) - 0.2, props: { icon: 'car0', caption: 'NEW CAR', cap: 34, w: 400, h: 340, iconS: 250, tilt: 0.04 } });
E_('cnt44', 'counter', A(1, 0, -280), { in: S(1) - 0.2, props: { to: 44664, prefix: '$', at: SW(1,3), dur: 1.3, size: 130, tone: 'good', label: 'YOU BORROW (ASSUMES)', w: 820 } });
// ---- S2 source ----
E_('src', 'card', A(2, 0, 0), { in: S(2) - 0.3, props: { w: 780, h: 380, fill: 'paper', pad: 40, lines: [{ t: 'AVERAGE NEW-CAR LOAN', size: 64, font: 'hero', tone: 'ink' }, { t: 'SOURCE: EDMUNDS · Q3 2026', size: 34, font: 'mono', tone: 'soft', gap: 20 }, { t: 'ASSUMES 7% A YEAR · SAME RATE', size: 30, font: 'mono', tone: 'soft', gap: 10 }] } });
// ---- S3 bank + 7% ----
E_('bank', 'prop', A(3, -270, 120), { in: S(3) - 0.3, props: { icon: 'bank', caption: 'THE BANK', cap: 40, w: 400, h: 420, iconS: 260, tilt: -0.03 } });
E_('int7', 'counter', A(3, 230, -120), { in: SW(3,2) - 0.2, props: { to: 7, suffix: '% A YEAR', at: SW(3,3), dur: 0.6, size: 120, tone: 'bad', label: 'INTEREST = THE FEE FOR BORROWING', w: 640 } });
E_('you3', 'suspect', A(3, 230, 330), { in: SW(3,9), props: Y({ w: 260, name: 'YOU', tilt: 0.03 }) });
// ---- S4 fork ----
E_('fork', 'split', A(4, 0, 0), { in: S(4) - 0.3, props: { w: 900, h: 640, a: { icon: 'clock', label: '4 YEARS', size: 52 }, b: { icon: 'clock', label: '7 YEARS', size: 52 }, vsAt: SW(4,8) } });
// ---- S5/S6 payment slips ----
E_('rcA', 'receipt', A(5, 0, 0), { in: S(5) - 0.3, props: { title: '4-YEAR LOAN', w: 620, rowH: 110, rows: [{ id: 'm', k: 'MONTHS', v: '48', at: S(5) + 0.2, tone: 'ink' }, { id: 'pay', k: 'PAYMENT', v: '$1,070/MO', at: SW(5,4), tone: 'bad' }], foot: 'ASSUMES $44,664 AT 7%' } });
E_('rcB', 'receipt', A(6, 0, 0), { in: S(6) - 0.3, props: { title: '7-YEAR LOAN', w: 620, rowH: 110, rows: [{ id: 'm', k: 'MONTHS', v: '84', at: S(6) + 0.2, tone: 'ink' }, { id: 'pay', k: 'PAYMENT', v: '$674/MO', at: SW(6,4), tone: 'good' }], foot: 'ASSUMES $44,664 AT 7%' } });
// ---- S8 $395 back ----
E_('bar8', 'bars', A(8, -170, 0), { in: S(8) - 0.3, props: { h: 700, barW: 190, gap: 110, max: 1070, items: [{ id: 'a', label: '4 YEARS', sub: '$1,070/MO', value: 1070, show: 1070, display: { prefix: '$' }, tone: 'bad', at: S(8) }, { id: 'b', label: '7 YEARS', sub: '$674/MO', value: 674, show: 674, display: { prefix: '$' }, tone: 'good', at: S(8) + 0.4 }] } });
E_('c395b', 'counter', A(8, 400, 0), { in: SW(8,1) - 0.2, props: { to: 395, prefix: '$', at: SW(8,1), dur: 0.7, size: 130, tone: 'good', label: 'BACK EVERY MONTH', w: 480 } });
E_('you8', 'suspect', A(8, 400, 330), { in: SW(8,3), props: Y({ w: 260, name: 'YOU', tilt: -0.03 }) });
// ---- S9 months ----
E_('mon', 'months', A(9, 0, 0), { in: S(9) - 0.3, props: { w: 920, h: 780, at: SW(9,4), dur: 2.6 } });
// ---- S10-S13 interest ----
E_('int', 'bars', A(10, -240, 0), { in: S(10) - 0.3, props: { h: 760, barW: 220, gap: 120, max: 12000, items: [{ id: 'a', label: '4 YEARS', sub: 'INTEREST', value: 6674, show: 6674, display: { prefix: '$' }, tone: 'good', at: SW(10,4), dur: 1.2 }, { id: 'b', label: '7 YEARS', sub: 'INTEREST', value: 11960, show: 11960, display: { prefix: '$' }, tone: 'bad', at: SW(11,2), dur: 1.5 }] } });
E_('diff', 'counter', A(10, 520, -120), { in: S(13) - 0.3, props: { to: 5287, prefix: '+$', at: SW(13,4), dur: 0.8, size: 120, tone: 'bad', label: 'SAME CAR · SAME RATE', w: 560 } });
E_('xtra', 'stamp', A(10, 520, 140), { rot: -0.07, in: SW(13,4) + 0.8, props: { text: '36 EXTRA MONTHS', tone: 'bad', size: 52 } });
// ---- S14/S15 work hours ----
E_('wk', 'weeks', A(14, 0, 0), { in: S(14) - 0.3, props: { w: 880, h: 720, at: SW(14,5) - 0.2, dur: 2.4, hours: 216 } });
// ---- S16 price tag ----
E_('tag', 'prop', A(16, -260, 0), { in: S(16) - 0.3, props: { icon: 'tag', caption: 'THE PRICE TAG', cap: 36, w: 400, h: 400, iconS: 250, tilt: -0.05 } });
E_('rcp', 'prop', A(16, 250, 0), { in: SW(16,6), props: { icon: 'slip', caption: 'THE BILL BEHIND IT', cap: 30, w: 400, h: 400, iconS: 250, tilt: 0.05 } });
// ---- S17 car ages ----
E_('ca0', 'prop', A(17, -480, 0), { in: S(17) - 0.3, props: { icon: 'car0', caption: 'YEAR 0', cap: 36, w: 330, h: 330, iconS: 230, tilt: -0.03 } });
E_('ca1', 'prop', A(17, 0, 0), { in: SW(17,5), props: { icon: 'car1', caption: 'YEAR 3', cap: 36, w: 330, h: 330, iconS: 230, tilt: 0.02 } });
E_('ca2', 'prop', A(17, 480, 0), { in: SW(17,8), props: { icon: 'car2', caption: 'YEAR 7', cap: 36, w: 330, h: 330, iconS: 230, tilt: -0.02, stamp: 'PAID OFF', stampAt: SW(17,4), stampSize: 44 } });
E_('you17', 'suspect', A(17, 0, 430), { in: SW(17,3), props: Y({ w: 250, name: 'YOU', tilt: 0.03 }) });
// ---- S18 seesaw / S19 chips ----
E_('see', 'seesaw', A(18, 0, 0), { in: S(18) - 0.3, props: { w: 920, h: 660, at: SW(18,4), l: 'PAYMENT', r: 'PRICE', lt: '↓', rt: '↑' } });
E_('chips', 'text', A(19, 0, -250), { in: S(19) - 0.2, props: { lines: [[['4 · 5 · 6 · 7', 'gold']], [['YEARS?', 'paper']]], size: 150 } });
E_('you19', 'suspect', A(19, 0, 250), { in: S(19), props: Y({ w: 340, nick: 'YOUR TERM?', tilt: -0.02 }) });
// ---- screen overlays ----
E_('dc1', 'datecard', [340, 480], { layer: 'screen', in: S(5) - 0.1, out: S(5) + 1.9, props: { kicker: 'STEP 1 · THE DEAL', big: '4 YEARS', small: 'VS 7 YEARS' } });
E_('dc2', 'datecard', [340, 480], { layer: 'screen', in: S(9) - 0.1, out: S(9) + 2.3, props: { kicker: 'THE CATCH', big: 'INTEREST', small: 'EVERY MONTH YOU OWE' } });
E_('dc3', 'datecard', [340, 480], { layer: 'screen', in: S(14) - 0.1, out: S(14) + 2.3, props: { kicker: 'THE BILL', big: 'IN HOURS', small: 'AT $24.51/HR · BLS MEDIAN' } });
E_('heart', 'heart', [800, 930], { layer: 'screen', in: SW(7,1) - 0.05, out: SW(7,1) + 1.15, props: { s: 1 } });
E_('plane', 'plane', [540, 960], { layer: 'screen', in: SW(12,0) - 0.05, out: SW(12,0) + 1.2, props: { dur: 0.9, from: [-230, 250], to: [280, -330], s: 1.5 } });
E_('sendtx', 'text', [830, 360], { layer: 'screen', in: SW(12,0) + 0.15, out: SW(12,0) + 1.2, props: { lines: [[['SEND', 'gold']]], size: 70 } });
E_('btn', 'follow', [830, 1010], { layer: 'screen', scale: 0.8, in: SW(16,0) - 0.05, out: SW(16,0) + 1.45, props: { press: 0.5 } });
E_('ask', 'bubble', [600, 1090], { layer: 'screen', in: SW(19,0) - 0.1, out: E(19) + 0.2, props: { l1: "WHAT'S YOUR", l2: 'LOAN TERM?', size: 52, tail: 'left' } });
E_('hud', 'hud', [0, 0], { layer: 'screen', in: -1, props: { labels: [{ at: -1, text: 'THE HOOK' }, { at: S(1) - 0.1, text: 'THE LOAN' }, { at: S(5) - 0.1, text: 'THE DEAL' }, { at: S(9) - 0.1, text: 'THE CATCH' }, { at: S(14) - 0.1, text: 'THE BILL' }, { at: S(17) - 0.1, text: 'THE CAR' }], items: [] } });
const B_ = (at, beat, focus, o) => beats.push(Object.assign({ at, beat, focus }, o || {}));
B_(0, SB, ['hook', 'c395', 'c5287', 'you0', 'car0'], Object.assign({ pose: 'talk' }, F0));
B_(SW(0,7), ZN, 'c5287.value', { fill: 0.7, maxH: 460, sy: 800, st: 'corner' });
B_(SW(0,9) + 0.5, PB, ['hook', 'c395', 'c5287', 'you0', 'car0'], Object.assign({}, F0, { pose: 'shock' }));
B_(S(1) - 0.05, GH, ['cnt44', 'chk', 'car1'], { move: 'whip', fill: 0.98, maxH: 860, sy: 830, st: 'corner' });
B_(SW(1,3), ZN, 'cnt44.value', { fill: 0.84, maxH: 440, sy: 800 });
B_(S(2) - 0.05, GH, 'src', { move: 'whip', fill: 0.9, sy: 830 });
B_(S(3) - 0.05, SB, ['bank', 'int7', 'you3'], { move: 'whip', fill: 0.98, maxH: 880, sy: 830 });
B_(SW(3,3), ZN, 'int7.value', { fill: 0.7, maxH: 440, sy: 780 });
B_(S(4) - 0.05, PF, 'fork', { move: 'whip', fill: 0.98, sy: 800, pose: 'you' });
B_(S(5) - 0.05, GH, 'rcA', { move: 'whip', fill: 0.8, maxH: 800, sy: 830 });
B_(SW(5,4), ZN, 'rcA.pay', { fill: 0.7, maxH: 400, sy: 820 });
B_(S(6) - 0.05, GH, 'rcB', { move: 'whip', fill: 0.8, maxH: 800, sy: 830 });
B_(SW(6,4), ZN, 'rcB.pay', { fill: 0.7, maxH: 400, sy: 820, pose: 'shock', st: 'corner' });
B_(S(7), PF, 'rcB', { pose: 'shrug', sy: 830 });
B_(S(8) - 0.05, SB, ['bar8', 'c395b', 'you8'], { move: 'whip', fill: 1.0, maxH: 880, sy: 830 });
B_(SW(8,1), ZN, 'c395b.value', { fill: 0.66, maxH: 440, sy: 800 });
B_(S(9) - 0.05, GH, 'mon', { move: 'whip', fill: 0.98, maxH: 860, sy: 830, st: 'corner' });
B_(SW(9,4), GH, 'mon', { fill: 0.98, maxH: 860, sy: 830 });
B_(S(10) - 0.05, SB, ['int', 'diff'], { move: 'whip', fill: 1.0, maxH: 880, sy: 830 });
B_(SW(10,4), ZN, 'int.a_top', { fill: 0.5, maxH: 420, sy: 760 });
B_(SW(11,2), ZN, 'int.b_top', { fill: 0.5, maxH: 520, sy: 800, pose: 'shock', st: 'corner' });
B_(S(12), PF, 'int', { sy: 830 });
B_(S(13) - 0.05, SB, ['int', 'diff', 'xtra'], { fill: 1.0, maxH: 880, sy: 830 });
B_(SW(13,4), ZN, 'diff.value', { fill: 0.66, maxH: 440, sy: 800 });
B_(S(14) - 0.05, GH, 'wk', { move: 'whip', fill: 0.98, maxH: 900, sy: 830 });
B_(SW(14,5), ZN, 'wk.num', { fill: 0.8, maxH: 430, sy: 790 });
B_(SW(15,2), ZN, 'wk.bars', { fill: 0.8, maxH: 560, sy: 840, pose: 'shock', st: 'corner' });
B_(S(16) - 0.05, SB, ['tag', 'rcp'], { move: 'whip', fill: 0.98, maxH: 800, sy: 830 });
B_(S(17) - 0.05, SB, ['ca0', 'ca1', 'ca2', 'you17'], { move: 'whip', fill: 1.02, maxH: 880, sy: 830 });
B_(SW(17,8), ZN, 'ca2', { fill: 0.5, maxH: 520, sy: 790 });
B_(S(18) - 0.05, GH, 'see', { move: 'whip', fill: 0.98, maxH: 760, sy: 830 });
B_(S(19) - 0.05, PF, 'chips', { move: 'whip', fill: 0.9, sy: 790 });
B_(E(19) - 0.55, SB, ['hook2', 'c395', 'c5287', 'you0', 'car0'], Object.assign({ move: 'whip', pose: 'talk' }, F0));
poses.push([SW(16,0), 'follow', { target: [830, 1010] }]);
shakes.push([SW(0,7), 14], [SW(13,4) + 0.1, 14], [SW(14,5) + 0.1, 12], [SW(11,2) + 0.8, 10]);
const SX = (at, name, gain, dur, offset) => sfx.push({ at, name, gain, dur, offset: offset || 0 });
SX(0, 'deep_boom_2', -4, 0.4); SX(0.1, 'money_counter_1', -11, 0.9); SX(1.3, 'rubber_stamp_1', -7, 0.5); SX(SW(0,7), 'cinematic_hit_1', -9, 1.0);
SX(S(1), 'paper_slam_1', -9, 0.5); SX(SW(1,3), 'money_counter_1', -11, 1.3); SX(S(2), 'click_1', -8, 0.3); SX(SW(3,3), 'riser_1', -12, 0.7);
SX(SW(4,8), 'pop_2', -9, 0.3); SX(SW(5,4), 'cash_register_1', -9, 0.9); SX(SW(6,4), 'ding_2', -8, 0.7); SX(SW(7,1), 'pop_2', -9, 0.3);
SX(SW(8,1), 'coins_drop_1', -9, 1.2); SX(SW(9,4), 'clock_ticking_1', -11, 2.4); SX(SW(10,4), 'cash_rustle_1', -10, 1.2); SX(SW(11,2), 'cash_rustle_1', -10, 1.4);
SX(SW(12,0), 'swoosh_1', -9, 0.6); SX(SW(13,4), 'rubber_stamp_2', -6, 0.5); SX(SW(14,5), 'clock_ticking_2', -11, 2.0); SX(SW(14,5) + 2.2, 'cash_register_2', -9, 1.0);
SX(SW(16,0) + 0.5, 'click_1', -8, 0.3); SX(SW(17,4), 'rubber_stamp_1', -7, 0.5); SX(SW(18,4), 'sad_trombone_1', -12, 1.2); SX(SW(19,0), 'pop_1', -9, 0.3);
BM2.scene({ series: 'whatif', title: 'HYPOTHETICAL · 7-YEAR CAR LOAN', duration: SENT[SENT.length - 1][1] + 0.4,
  footnote: ['ASSUMES $44,664 AT 7% A YEAR, FIXED · SAME RATE BOTH TERMS · NO FEES · NO EARLY PAYOFF', '4 YR $1,069.54/MO, $6,674 INTEREST · 7 YR $674.10/MO, $11,960 · SOURCES: EDMUNDS Q3 2026, BLS $24.51/HR', 'HYPOTHETICAL · NOT FINANCIAL ADVICE · ILLUSTRATIONS'],
  elements: els, beats: beats.sort((a, b) => a.at - b.at), poses, shakes, sfx,
  captions: { emph: { '$5,287': 'bad', interest: 'bad', '$395': 'good', seven: 'accent', four: 'good' }, gap: 16 }, bed: { name: 'funk_bed_2', gain: -1 } });
