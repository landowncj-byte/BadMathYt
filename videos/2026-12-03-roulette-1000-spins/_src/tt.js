// $1 on red x 1,000 · YouTube · WHAT IF · YOU + generic wheel. Stations row-major, 5 per row, 1900 apart.
const SB = 'side-by-side', GH = 'graphic-hero', ZN = 'zoom-on-number', PF = 'presenter-front', PK = 'peek', PB = 'pull-back';
const YOU = 'videos/2026-12-02-car-loan-7-years/_src/img/you.png';
const ST = i => [(i % 5) * 1900, Math.floor(i / 5) * 1900], A = (i, dx = 0, dy = 0) => [ST(i)[0] + dx, ST(i)[1] + dy];
const F0 = { sx: 540, sy: 850, fill: 0.98, maxH: 960, st: { x: 915, y: 1395, s: 0.85 } };
const Y = (o) => Object.assign({ src: YOU, crop: [0, 0, 1, 1], fx: 0.5, fy: 0.4, aspect: 1.0, name: 'YOU', tag: 'ILLUSTRATION', flash: false }, o);
const HK = [[['1,000 SPINS OF RED', 'paper']], [['95% END UP BEHIND', 'bad']]];
const els = [], beats = [], sfx = [], poses = [], shakes = [];
const E_ = (id, type, at, o) => els.push(Object.assign({ id, type, at }, o));
// ---- S0 frame 0 ----
E_('hook', 'hook', A(0, 0, -450), { in: 0, out: SW(0,10) + 0.4, props: { lines: HK, sizes: [66, 76] } });
E_('hook2', 'hook', A(0, 0, -450), { in: E(17) + 0.3, props: { lines: HK, sizes: [66, 76] } });
E_('wh0', 'wheel', A(0, -250, -40), { in: -1, props: { w: 430, spin: 1.5 } });
E_('sp0', 'counter', A(0, 280, -130), { in: -1, props: { to: 1000, at: 0.2, dur: 3.6, size: 120, tone: 'bad', label: 'SPINS', w: 460 } });
E_('yu0', 'suspect', A(0, 280, 140), { in: -1, props: Y({ w: 300, nick: 'ONE CHIP', tilt: 0.02 }) });
E_('cl0', 'classrow', A(0, 0, 450), { in: -1, props: { w: 920, h: 250, at: SW(0,5), head: 'EVERY 22 PLAYERS' } });
// ---- S1-S3 wheel ----
E_('wh', 'wheel', A(1, 0, 40), { in: SW(5,0) - 0.3, props: { w: 680, spin: 0.6, countAt: SW(5,4) - 0.2, countDur: 1.0, redAt: SW(5,8), blackAt: SW(6,3), greenAt: SW(6,7) } });
E_('t38', 'text', A(1, 0, -470), { in: SW(5,0), out: SW(5,7) - 0.05, props: { lines: [[['38 SLOTS', 'paper']]], size: 110 } });
E_('t18', 'text', A(1, 0, -470), { in: SW(5,7), out: SW(6,5) - 0.05, props: { lines: [[['18 ', 'bad'], ['RED', 'bad'], [' · 18 BLACK', 'paper']]], size: 84 } });
E_('t2', 'text', A(1, 0, -470), { in: SW(6,5), out: SW(1,3) - 0.05, props: { lines: [[['2 GREEN: ', 'good'], ['0 AND 00', 'gold']]], size: 84 } });
// ---- S4 bet ----
E_('chp', 'prop', A(4, -300, 20), { in: SW(1,3) - 0.3, props: { icon: 'chip', caption: '$1 ON RED', cap: 40, w: 340, h: 400, iconS: 240, tilt: -0.04 } });
E_('win', 'counter', A(4, 230, -140), { in: SW(2,3) - 0.2, props: { to: 1, prefix: '+$', at: SW(2,3), dur: 0.4, size: 120, tone: 'good', label: 'WIN', w: 340 } });
E_('lose', 'counter', A(4, 230, 150), { in: SW(2,4) - 0.2, props: { to: 1, prefix: '−$', at: SW(2,4), dur: 0.4, size: 120, tone: 'bad', label: 'LOSE: GONE', w: 340 } });
E_('yu4', 'suspect', A(4, 0, 430), { in: SW(1,3), props: Y({ w: 240, name: 'YOU', tilt: 0.02 }) });
// ---- S5 coin flip ----
E_('cf', 'prop', A(5, 0, 0), { in: S(3) - 0.3, props: { icon: 'coinflip', caption: 'A COIN FLIP?', cap: 46, w: 520, h: 500, iconS: 330, tilt: -0.03, wobble: true, stamp: 'ALMOST', stampAt: SW(3,6), stampSize: 56 } });
// ---- S7 gap ----
E_('gap', 'bars', A(7, 0, 0), { in: S(7) - 0.3, props: { h: 720, barW: 230, gap: 130, max: 55, items: [{ id: 'a', label: 'FAIR COIN', sub: '50%', value: 50, show: 50, display: { suffix: '%', decimals: 1 }, tone: 'good', at: S(7) }, { id: 'b', label: 'RED', sub: '18 OF 38', value: 47.4, show: 47.4, display: { suffix: '%', decimals: 1 }, tone: 'bad', at: SW(7,3) }] } });
// ---- S8 house edge / S9 5 cents ----
E_('dl', 'prop', A(8, 0, 0), { in: S(8) - 0.3, props: { icon: 'dollar', caption: "THE HOUSE EDGE", sub: "THE CASINO'S BUILT-IN CUT", cap: 44, w: 560, h: 480, iconS: 320, tilt: -0.02, stamp: 'HOUSE EDGE', stampAt: SW(8,5), stampSize: 44 } });
// ---- S10-S15 crowd ----
E_('crd', 'crowd', A(10, 0, 0), { in: S(9) - 0.3, props: { w: 940, h: 800, head: 'PLAYERS · $1 ON RED EACH SPIN', stages: [{ at: 0, pct: 1 }, { at: SW(11,4), pct: 0.314 }, { at: SW(12,1), pct: 0.265 }, { at: SW(13,1), pct: 0.111 }, { at: SW(14,4), pct: 0.0448 }] } });
E_('pa', 'text', A(10, 0, -520), { in: SW(11,1), out: SW(12,1) - 0.05, props: { lines: [[['10 SPINS', 'paper']]], size: 96 } });
E_('pb', 'text', A(10, 0, -520), { in: SW(12,1), out: SW(13,1) - 0.05, props: { lines: [[['100 SPINS', 'paper']]], size: 96 } });
E_('pc', 'text', A(10, 0, -520), { in: SW(13,1), out: SW(14,1) - 0.05, props: { lines: [[['500 SPINS', 'paper']]], size: 96 } });
E_('pd', 'text', A(10, 0, -520), { in: SW(14,1), props: { lines: [[['1,000 SPINS', 'bad']]], size: 96 } });
// ---- S17 class of 22 ----
E_('cls', 'classrow', A(17, 0, 0), { in: SW(14,6) - 0.3, props: { w: 960, h: 330, at: SW(14,9), head: 'ONE KID IN A CLASS OF 22' } });
E_('c22', 'counter', A(17, 0, -350), { in: SW(14,6) - 0.2, props: { to: 22, prefix: '1 IN ', at: SW(14,9), dur: 0.7, size: 150, tone: 'bad', label: 'ENDS UP AHEAD', w: 700 } });
// ---- S18 average ----
E_('yu18', 'suspect', A(18, -290, 30), { in: S(16) - 0.3, props: Y({ w: 360, nick: 'THE AVERAGE PLAYER', tilt: -0.03 }) });
E_('stk', 'prop', A(18, 120, 280), { in: SW(16,6) - 0.3, props: { icon: 'stack', caption: '', w: 250, h: 220, iconS: 150, tilt: 0.04 } });
E_('c53', 'counter', A(18, 290, -80), { in: SW(16,6) - 0.3, props: { to: 52.63, prefix: '−$', decimals: 2, at: SW(16,8), dur: 1.0, size: 120, tone: 'bad', label: 'AVERAGE AFTER 1,000', w: 560 } });
// ---- S19 dent ----
E_('dnt', 'bars', A(19, 0, 0), { in: S(17) - 0.3, props: { h: 740, barW: 230, gap: 130, max: 52.63, items: [{ id: 'a', label: 'ONE SPIN', sub: 'ALMOST FAIR', value: 0.0526, show: 0.05, display: { prefix: '−$', decimals: 2 }, tone: 'good', at: SW(17,2) }, { id: 'b', label: '1,000 SPINS', sub: 'ON AVERAGE', value: 52.63, show: 52.63, display: { prefix: '−$', decimals: 2 }, tone: 'bad', at: SW(17,5), dur: 1.4 }] } });
// ---- S20 ----
E_('wh20', 'wheel', A(20, 0, 0), { in: S(18) - 0.3, props: { w: 520, spin: 1.0, center: 'HOW MANY SPINS?' } });
// ---- screen overlays ----
E_('dc1', 'datecard', [340, 480], { layer: 'screen', in: SW(5,0), out: SW(5,0) + 2.0, props: { kicker: 'STEP 1 · THE WHEEL', big: '38 SLOTS', small: 'AMERICAN WHEEL' } });
E_('dc2', 'datecard', [340, 480], { layer: 'screen', in: S(7) - 0.1, out: S(7) + 2.2, props: { kicker: 'STEP 2 · THE GAP', big: '47.4%', small: 'RED WINS 18 OF 38' } });
E_('dc3', 'datecard', [340, 480], { layer: 'screen', in: S(9) - 0.1, out: S(9) + 1.9, props: { kicker: 'STEP 3 · TIME', big: 'MORE SPINS', small: 'FEWER PLAYERS AHEAD' } });
E_('dc4', 'datecard', [340, 480], { layer: 'screen', in: SW(14,6) - 0.1, out: SW(14,6) + 1.9, props: { kicker: 'THE VERDICT', big: '1 IN 22', small: 'EXACT BINOMIAL' } });
E_('heart', 'heart', [800, 930], { layer: 'screen', in: SW(4,1) - 0.05, out: SW(4,1) + 1.15, props: { s: 1 } });
E_('plane', 'plane', [540, 960], { layer: 'screen', in: SW(10,0) - 0.05, out: SW(10,0) + 1.2, props: { dur: 0.9, from: [-230, 250], to: [280, -330], s: 1.5 } });
E_('sendtx', 'text', [830, 360], { layer: 'screen', in: SW(10,0) + 0.15, out: SW(10,0) + 1.2, props: { lines: [[['SEND', 'gold']]], size: 70 } });
E_('more', 'bubble', [560, 1000], { layer: 'screen', in: SW(10,8) - 0.1, out: SW(10,9) + 0.5, props: { l1: "I'M DUE", l2: 'ONE MORE', size: 52, tail: 'right' } });
E_('btn', 'follow', [830, 1010], { layer: 'screen', scale: 0.8, in: SW(15,0) - 0.05, out: SW(15,0) + 1.45, props: { press: 0.5 } });
E_('ask', 'bubble', [600, 1090], { layer: 'screen', in: SW(18,0) - 0.1, out: E(18) + 0.2, props: { l1: 'HOW MANY SPINS', l2: 'BEFORE YOU WALK?', size: 46, tail: 'left' } });
E_('hud', 'hud', [0, 0], { layer: 'screen', in: -1, props: { labels: [{ at: -1, text: 'THE HOOK' }, { at: SW(5,0) - 0.1, text: 'THE WHEEL' }, { at: SW(1,3) - 0.1, text: 'THE BET' }, { at: S(7) - 0.1, text: 'THE GAP' }, { at: S(9) - 0.1, text: 'OVER TIME' }, { at: SW(14,6) - 0.1, text: 'THE VERDICT' }], items: [] } });
const B_ = (at, beat, focus, o) => beats.push(Object.assign({ at, beat, focus }, o || {}));
B_(0, SB, ['hook', 'wh0', 'sp0', 'yu0', 'cl0'], Object.assign({ pose: 'talk' }, F0));
B_(SW(0,5), GH, ['hook', 'wh0', 'sp0', 'yu0', 'cl0'], Object.assign({}, F0, { pose: 'shock', st: 'corner' }));
B_(SW(5,0) - 0.05, GH, ['wh', 't38'], { move: 'whip', fill: 0.98, maxH: 960, sy: 830 });
B_(SW(5,4), ZN, 'wh.wheel', { fill: 0.8, maxH: 700, sy: 850 });
B_(SW(5,7) - 0.05, GH, ['wh', 't18'], { fill: 0.98, maxH: 960, sy: 830 });
B_(SW(6,5) - 0.05, GH, ['wh', 't2'], { fill: 0.98, maxH: 960, sy: 830, pose: 'shock', st: 'corner' });
B_(SW(1,3) - 0.05, SB, ['chp', 'win', 'lose', 'yu4'], { move: 'whip', fill: 1.02, maxH: 960, sy: 830 });
B_(S(3) - 0.05, GH, 'cf', { move: 'whip', fill: 0.78, maxH: 800, sy: 830 });
B_(S(4), PF, 'cf', { pose: 'shrug', sy: 830 });
B_(S(7) - 0.05, GH, 'gap', { move: 'whip', fill: 0.98, maxH: 880, sy: 830 });
B_(SW(7,9), ZN, 'gap.b_top', { fill: 0.5, maxH: 500, sy: 760 });
B_(S(8) - 0.05, GH, 'dl', { move: 'whip', fill: 0.8, maxH: 800, sy: 830 });
B_(S(9) - 0.05, GH, ['crd', 'pa'], { move: 'whip', fill: 1.0, maxH: 960, sy: 830, st: 'corner' });
B_(S(10), PF, 'crd', { sy: 830, fill: 0.9 });
B_(SW(11,4), ZN, 'crd.crowd', { fill: 0.9, maxH: 700, sy: 880 });
B_(SW(14,4), ZN, 'pd', { fill: 0.7, maxH: 420, sy: 800, pose: 'shock', st: 'corner' });
B_(SW(14,4) + 1.4, GH, ['crd', 'pd'], { fill: 1.0, maxH: 960, sy: 830 });
B_(SW(14,6) - 0.05, GH, ['cls', 'c22'], { move: 'whip', fill: 1.0, maxH: 800, sy: 830, st: 'corner' });
B_(SW(14,9), ZN, 'cls.row', { fill: 0.98, maxH: 340, sy: 860 });
B_(S(16) - 0.05, SB, ['yu18', 'c53', 'stk'], { move: 'whip', fill: 1.0, maxH: 880, sy: 830 });
B_(SW(16,8), ZN, 'c53.value', { fill: 0.6, maxH: 400, sy: 800 });
B_(S(17) - 0.05, GH, 'dnt', { move: 'whip', fill: 0.98, maxH: 900, sy: 830 });
B_(SW(17,5), ZN, 'dnt.b_top', { fill: 0.5, maxH: 520, sy: 780, pose: 'shock', st: 'corner' });
B_(S(18) - 0.05, PF, 'wh20', { move: 'whip', fill: 0.8, sy: 790, maxH: 700 });
B_(E(18) - 0.55, SB, ['hook2', 'wh0', 'sp0', 'yu0', 'cl0'], Object.assign({ move: 'whip', pose: 'talk' }, F0));
poses.push([SW(15,0), 'follow', { target: [830, 1010] }]);
shakes.push([SW(0,5), 12], [SW(8,5) + 0.1, 12], [SW(14,4) + 0.1, 14], [SW(16,8) + 0.1, 12]);
const SX = (at, name, gain, dur, offset) => sfx.push({ at, name, gain, dur, offset: offset || 0 });
SX(0, 'deep_boom_2', -4, 0.4); SX(0.2, 'clock_ticking_1', -12, 3.4); SX(SW(0,5), 'rubber_stamp_1', -8, 0.5); SX(SW(5,4), 'click_1', -8, 0.3); SX(SW(5,8), 'ding_1', -9, 0.6); SX(SW(6,7), 'ding_2', -7, 0.7);
SX(SW(2,3), 'success_chime_1', -9, 0.8); SX(SW(2,4), 'wrong_buzzer_1', -10, 0.5); SX(SW(3,6), 'rubber_stamp_2', -7, 0.5); SX(SW(4,1), 'pop_2', -9, 0.3); SX(SW(8,5), 'rubber_stamp_1', -7, 0.5); SX(SW(8,5), 'coin_single_1', -8, 0.6);
SX(SW(10,0), 'swoosh_1', -9, 0.6); SX(SW(11,4), 'cash_rustle_1', -10, 0.8); SX(SW(12,1), 'cash_rustle_1', -10, 0.8); SX(SW(13,1), 'cash_rustle_1', -10, 0.8); SX(SW(14,4), 'sad_trombone_1', -12, 1.2); SX(SW(14,4) + 0.1, 'deep_boom_1', -8, 1.4);
SX(SW(15,0) + 0.5, 'click_1', -8, 0.3); SX(SW(14,9), 'level_up_1', -10, 0.8); SX(SW(16,8), 'coins_drop_1', -9, 1.4); SX(SW(17,5), 'sub_drop_1', -9, 0.8); SX(SW(18,0), 'pop_1', -9, 0.3);
BM2.scene({ series: 'whatif', title: 'HYPOTHETICAL · $1 ON RED × 1,000', duration: SENT[SENT.length - 1][1] + 0.4,
  footnote: ['ASSUMES AMERICAN WHEEL: 18 RED · 18 BLACK · 2 GREEN · $1 ON RED, EVEN MONEY, INDEPENDENT SPINS', '"AHEAD" = MORE THAN $0 AFTER EXACTLY 1,000 SPINS · 4.48% = 1 IN 22 · AVERAGE −$52.63 · EXACT BINOMIAL', 'HYPOTHETICAL · NOT BETTING ADVICE · ILLUSTRATIONS (GENERIC WHEEL)'],
  elements: els, beats: beats.sort((a, b) => a.at - b.at), poses, shakes, sfx,
  captions: { emph: { red: 'bad', green: 'good', house: 'bad', ahead: 'good', '22': 'bad' }, gap: 16 }, bed: { name: 'electronic_bed_1', gain: -1 } });
