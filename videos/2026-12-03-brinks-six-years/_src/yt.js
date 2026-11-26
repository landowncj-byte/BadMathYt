// Brink's 1950 · "six years" · YouTube · DECODED crime-show. Stations: row-major, 5 per row, 1900 apart.
const SB = 'side-by-side', GH = 'graphic-hero', ZN = 'zoom-on-number', PF = 'presenter-front', PK = 'peek', PB = 'pull-back';
const IMG = 'videos/2026-12-03-brinks-six-years/_src/img/', GANG = IMG + 'gang.png', SPECS = IMG + 'specs.png', SPECS2 = IMG + 'specs_stripes.png', CAP = 'brand/photos/brinks-robbery-boston-1950/1.jpg';
const ST = i => [(i % 5) * 1900, Math.floor(i / 5) * 1900], A = (i, dx = 0, dy = 0) => [ST(i)[0] + dx, ST(i)[1] + dy];
const F0 = { sx: 540, sy: 850, fill: 0.98, maxH: 960, st: { x: 915, y: 1395, s: 0.85 } };
const G = (o) => Object.assign({ src: GANG, crop: [0, 0, 1, 1], fx: 0.5, fy: 0.45, aspect: 0.78, name: "THE BRINK'S GANG", tag: 'ILLUSTRATION', flash: false }, o);
const SP = (o) => Object.assign({ src: SPECS, crop: [0, 0, 1, 1], fx: 0.5, fy: 0.4, aspect: 1.0, name: "JOSEPH “SPECS” O'KEEFE", nameSize: 27, nick: '“SPECS”', tag: 'ILLUSTRATION', flash: false }, o);
const ILL = 'ILLUSTRATION';
const HK = [[['$2.7 MILLION', 'paper']], [['NEARLY BEAT THE CLOCK', 'bad']]];
const els = [], beats = [], sfx = [], poses = [], shakes = [];
const E_ = (id, type, at, o) => els.push(Object.assign({ id, type, at }, o));
// ---- S0 frame 0 ----
E_('hook', 'hook', A(0, 0, -450), { in: 0, out: SW(0,9) + 0.4, props: { lines: HK, sizes: [74, 66] } });
E_('hook2', 'hook', A(0, 0, -450), { in: E(23) + 0.2, props: { lines: HK, sizes: [74, 66] } });
E_('clk0', 'bigclock', A(0, 0, -60), { in: -1, props: { w: 480, h: 480, a: '6 YEARS', b: '< 1 WEEK', flipAt: SW(0,7), speed: 3 } });
E_('cap0', 'photo', A(0, 310, 340), { in: -1, props: { src: CAP, name: 'FBI EVIDENCE', role: "A CHAUFFEUR'S CAP", credit: 'PHOTO: FBI · PUBLIC DOMAIN', w: 360, aspect: 0.62, tilt: 0.05, treatment: 'paper', fx: 0.5, fy: 0.5 } });
E_('gg0', 'suspect', A(0, -310, 300), { in: -1, props: G({ w: 380, nick: 'MASKED MEN', tilt: -0.03 }) });
// ---- S1 date ----
E_('bos', 'text', A(1, 0, 0), { in: S(1) - 0.2, props: { lines: [[['BOSTON', 'paper']], [['JANUARY 1950', 'gold']]], size: 120 } });
// ---- S2 armored trucks ----
E_('atr', 'prop', A(2, -250, 40), { in: S(2) - 0.3, props: { icon: 'armtruck', caption: 'ARMORED TRUCKS', cap: 34, w: 440, h: 420, iconS: 300, tilt: -0.03 } });
E_('cash2', 'prop', A(2, 240, 40), { in: SW(2,5) - 0.2, props: { icon: 'bundle', caption: 'MOVING CASH', cap: 34, w: 380, h: 380, iconS: 230, tilt: 0.04 } });
// ---- S3 ★ masked men enter ----
E_('gg3', 'suspect', A(3, -190, 20), { in: S(3) - 0.35, props: G({ variant: 'card', file: true, caseNo: 'CASE FILE Nº 3', w: 560, nick: 'MASKED MEN', tag: ILL, tilt: -0.03, push: { at: S(3), dur: 2.6, to: 1.3 }, stringTo: [640, 60], stringAt: SW(3,6), ring: SW(3,1) + 0.2 }) });
E_('dep', 'prop', A(3, 450, 40), { in: SW(3,5), props: { icon: 'building', caption: "BRINK'S BUILDING", sub: 'BOSTON', cap: 30, w: 380, h: 420, iconS: 250, tilt: 0.04 } });
// ---- S4 mask / cap / shoes ----
E_('mk', 'prop', A(4, -480, 20), { in: SW(4,2) - 0.3, props: { icon: 'mask', caption: 'RUBBER MASKS', cap: 30, w: 330, h: 380, iconS: 220, tilt: -0.04 } });
E_('cp', 'prop', A(4, 0, 20), { in: SW(4,5) - 0.3, props: { icon: 'capicon', caption: 'CHAUFFEUR CAPS', cap: 28, w: 330, h: 380, iconS: 220, tilt: 0.02 } });
E_('sh', 'prop', A(4, 480, 20), { in: SW(4,8) - 0.3, props: { icon: 'shoe', caption: 'RUBBER SOLES', cap: 30, w: 330, h: 380, iconS: 220, tilt: 0.04 } });
// ---- S5 tie up / walk out ----
E_('rp', 'prop', A(5, -260, 40), { in: SW(5,1) - 0.2, props: { icon: 'rope', caption: 'TIED UP THE WORKERS', cap: 28, w: 420, h: 420, iconS: 260, tilt: -0.03 } });
E_('bg5', 'prop', A(5, 240, 40), { in: SW(5,6) - 0.2, props: { icon: 'bundle', caption: 'OUT WITH THE MONEY', cap: 28, w: 420, h: 420, iconS: 260, tilt: 0.03 } });
// ---- S7 haul ----
E_('c27', 'counter', A(7, 0, 0), { in: S(7) - 0.3, props: { to: 2700000, prefix: '$', suffix: '+', at: SW(7,4), dur: 1.3, size: 130, tone: 'bad', label: 'CASH · CHECKS · MONEY ORDERS · MORE', w: 880 } });
// ---- S8 dead ends ----
E_('map', 'deadends', A(8, 0, 0), { in: S(8) - 0.3, props: { w: 880, h: 700, at: SW(8,2), n: 14, head: 'BOSTON · THE CHASE' } });
E_('dend', 'text', A(8, 0, -480), { in: SW(8,2), props: { lines: [[['HUNDREDS OF', 'paper']], [['DEAD ENDS', 'bad']]], size: 76 } });
// ---- S9 FBI cap ----
E_('capb', 'photo', A(9, 0, 20), { in: S(9) - 0.3, props: { src: CAP, name: 'FBI EVIDENCE', role: "A CHAUFFEUR'S CAP · KEPT BY THE FBI", credit: 'PHOTO: FBI · PUBLIC DOMAIN (WIKIMEDIA COMMONS)', w: 820, aspect: 0.6, tilt: -0.02, treatment: 'paper', fx: 0.5, fy: 0.5 } });
// ---- S10 ★ the plan ----
E_('gg10', 'suspect', A(10, -300, 20), { in: S(10) - 0.3, props: G({ w: 440, nick: 'THE PLAN: SHH', tilt: -0.03, flash: true }) });
E_('ys', 'yearstrip', A(10, 330, 20), { in: SW(10,6) - 0.3, props: { w: 760, h: 360, at: SW(10,6), dur: 2.3, head: 'STAY QUIET 6 YEARS' } });
// ---- S11 statute ----
E_('lg', 'prop', A(11, -250, 20), { in: S(11) - 0.3, props: { icon: 'scales', caption: 'STATUTE OF LIMITATIONS', cap: 24, w: 420, h: 420, iconS: 250, tilt: -0.03 } });
E_('lgt', 'text', A(11, 280, 20), { in: SW(11,2) - 0.1, props: { lines: [[['= A LEGAL', 'paper']], [['DEADLINE', 'gold']]], size: 100 } });
// ---- S12 wait out the clock ----
E_('clk12', 'bigclock', A(12, 0, 0), { in: S(12) - 0.3, props: { w: 560, h: 560, a: 'AFTER 6 YEARS', b: 'NO CHARGES', flipAt: SW(12,6), speed: 5 } });
// ---- S13 whisper ----
E_('wh', 'prop', A(13, 0, 0), { in: S(13) - 0.3, props: { icon: 'whisper', caption: "CAN'T KEEP A SECRET", cap: 34, w: 480, h: 440, iconS: 290, tilt: -0.03, wobble: true } });
// ---- S14 ★ Specs jailed ----
E_('sp14', 'suspect', A(14, 0, 20), { in: S(14) - 0.3, props: SP({ w: 500, tilt: -0.02, flash: true, bars: SW(14,10), stamps: [{ text: 'OTHER BURGLARY', at: SW(14,12), size: 38, x: 0, y: 120, rot: -0.08 }] }) });
// ---- S15 cheated ----
E_('sp15', 'suspect', A(15, -130, 20), { in: S(15) - 0.3, props: SP({ w: 460, tilt: 0.02, xmark: SW(15,6), stamps: [{ text: 'REPORTEDLY CHEATED', at: SW(15,5), size: 32, x: 0, y: 120, rot: -0.07 }] }) });
E_('bn15', 'prop', A(15, 420, 80), { in: SW(15,6) - 0.2, props: { icon: 'bundle', caption: 'HIS SHARE', cap: 30, w: 330, h: 330, iconS: 190, tilt: 0.04 } });
// ---- S16 ★ he talks ----
E_('sp16', 'suspect', A(16, -190, 20), { in: S(16) - 0.3, props: SP({ w: 480, tilt: -0.02, flash: true, stringTo: [640, 60], stringAt: SW(16,5), stamps: [{ text: 'HE TALKS', at: SW(16,10), size: 56, x: 0, y: -40, rot: -0.1 }] }) });
E_('wv', 'prop', A(16, 450, 40), { in: SW(16,8), props: { icon: 'wave', caption: 'YEAH, HE TALKS', cap: 28, w: 380, h: 340, iconS: 230, tilt: 0.04 } });
// ---- S17 under a week ----
E_('clk17', 'bigclock', A(17, -280, 0), { in: S(17) - 0.3, props: { w: 520, h: 520, a: 'JAN 1956', b: '< 1 WEEK LEFT', flipAt: SW(17,2), speed: 6 } });
E_('gg17', 'suspect', A(17, 330, 40), { in: SW(17,7) - 0.2, props: G({ w: 420, nick: '11 MEN', tilt: 0.03, flash: true, stamps: [{ text: 'CHARGED', at: SW(17,11), size: 56, x: 0, y: 20, rot: -0.1 }] }) });
// ---- S18 2,190 days ----
E_('pay', 'paygrid', A(18, 0, 0), { in: S(18) - 0.3, props: { w: 880, h: 800, at: SW(18,2) - 0.1, dur: 1.7, n: 2190, cols: 60, head: '6 YEARS', unit: 'DAYS MISSED BY LESS THAN 7', numAt: SW(18,2) - 0.1 } });
// ---- S20 ★ life ----
E_('gg20', 'suspect', A(20, -190, 20), { in: S(20) - 0.3, props: G({ w: 480, nick: '8 MEN', tilt: -0.02, mono: true, flash: true, bars: SW(20,5), stamps: [{ text: 'LIFE IN PRISON', at: SW(20,5), size: 46, x: 0, y: -40, rot: -0.1 }] }) });
E_('c8', 'counter', A(20, 440, 0), { in: SW(20,0) - 0.2, props: { to: 8, at: SW(20,0), dur: 0.6, suffix: ' MEN', size: 150, tone: 'bad', label: 'SENTENCED', w: 440 } });
// ---- S21 ★ Specs 4 years ----
E_('sp21', 'suspect', A(21, 0, 20), { in: S(21) - 0.3, props: SP({ src: SPECS2, w: 500, tilt: -0.02, flash: true, mono: false, stamps: [{ text: '4 YEARS', at: SW(21,6), size: 64, x: 0, y: -30, rot: -0.1 }, { text: 'PLEADED GUILTY', at: SW(21,1), size: 34, x: 0, y: 150, rot: 0.05 }] }) });
// ---- S22 recovered ----
E_('rcv', 'bars', A(22, 0, 0), { in: S(22) - 0.3, props: { h: 760, barW: 220, gap: 140, max: 2700, items: [{ id: 'a', label: 'STOLEN', sub: '$2.7M+', value: 2700, show: 2.7, display: { prefix: '$', suffix: 'M+', decimals: 1 }, tone: 'bad', at: S(22) }, { id: 'b', label: 'FOUND', sub: 'ABOUT $60,000', value: 60, show: 60, display: { prefix: '$', suffix: 'K', decimals: 0 }, tone: 'good', at: SW(22,5) }] } });
// ---- S23 two cents ----
E_('dl', 'prop', A(23, -230, 30), { in: S(23) - 0.3, props: { icon: 'dollar', caption: 'ONE DOLLAR', cap: 34, w: 420, h: 360, iconS: 250, tilt: -0.03 } });
E_('c2', 'counter', A(23, 280, 20), { in: SW(23,1) - 0.2, props: { to: 2, at: SW(23,1), dur: 0.5, suffix: '¢', size: 200, tone: 'good', label: 'OF EVERY DOLLAR', w: 440 } });
// ---- S24 ----
E_('clk24', 'bigclock', A(24, 0, 0), { in: S(24) - 0.3, props: { w: 560, h: 560, a: '6 YEARS', b: 'TIME UP', flipAt: SW(24,8), speed: 4 } });
// ---- screen overlays ----
E_('dc1', 'datecard', [340, 480], { layer: 'screen', in: S(1), out: S(1) + 2.3, props: { kicker: 'CASE FILE Nº 3 · THE SETUP', big: 'BOSTON', small: 'JANUARY 1950' } });
E_('dc2', 'datecard', [340, 480], { layer: 'screen', in: S(10) - 0.1, out: S(10) + 2.4, props: { kicker: 'CHAPTER 2', big: 'THE PLAN', small: 'STAY QUIET 6 YEARS' } });
E_('dc3', 'datecard', [340, 480], { layer: 'screen', in: S(14) - 0.1, out: S(14) + 2.2, props: { kicker: 'CHAPTER 3', big: 'THE LEAK', small: 'ONE OF THEM TALKS' } });
E_('dc4', 'datecard', [340, 480], { layer: 'screen', in: S(17) - 0.1, out: S(17) + 2.4, props: { kicker: 'BOSTON · JAN 1956', big: 'THE CATCH', small: 'LESS THAN A WEEK LEFT' } });
E_('heart', 'heart', [800, 930], { layer: 'screen', in: SW(6,1) - 0.05, out: SW(6,1) + 1.15, props: { s: 1 } });
E_('plane', 'plane', [540, 960], { layer: 'screen', in: SW(13,0) - 0.05, out: SW(13,0) + 1.2, props: { dur: 0.9, from: [-230, 250], to: [280, -330], s: 1.5 } });
E_('sendtx', 'text', [830, 360], { layer: 'screen', in: SW(13,0) + 0.15, out: SW(13,0) + 1.2, props: { lines: [[['SEND', 'gold']]], size: 70 } });
E_('btn', 'follow', [830, 1010], { layer: 'screen', scale: 0.8, in: SW(19,0) - 0.05, out: SW(19,0) + 1.45, props: { press: 0.5 } });
E_('ask', 'bubble', [600, 1090], { layer: 'screen', in: SW(24,0) - 0.1, out: E(24) + 0.2, props: { l1: 'COULD YOU STAY', l2: 'QUIET 6 YEARS?', size: 48, tail: 'left' } });
E_('hud', 'hud', [0, 0], { layer: 'screen', in: -1, props: { labels: [{ at: -1, text: 'THE HOOK' }, { at: S(1) - 0.1, text: 'THE SETUP' }, { at: S(3) - 0.1, text: 'THE GANG' }, { at: S(10) - 0.1, text: 'THE PLAN' }, { at: S(14) - 0.1, text: 'THE LEAK' }, { at: S(17) - 0.1, text: 'THE CATCH' }, { at: S(20) - 0.1, text: 'THE SENTENCE' }], items: [] } });
const B_ = (at, beat, focus, o) => beats.push(Object.assign({ at, beat, focus }, o || {}));
B_(0, SB, ['hook', 'clk0', 'cap0', 'gg0'], Object.assign({ pose: 'talk' }, F0));
B_(SW(0,7), GH, ['hook', 'clk0', 'cap0', 'gg0'], { fill: 0.98, maxH: 960, sy: 850, pose: 'shock', st: 'corner' });
B_(S(1) - 0.05, GH, 'bos', { move: 'whip', fill: 0.9, sy: 830 });
B_(S(2) - 0.05, SB, ['atr', 'cash2'], { move: 'whip', fill: 0.98, maxH: 800, sy: 830 });
B_(S(3) - 0.05, GH, ['gg3', 'dep'], { move: 'whip', fill: 1.0, maxH: 880, sy: 830, st: 'corner' });
B_(S(4) - 0.05, SB, ['mk', 'cp', 'sh'], { move: 'whip', fill: 1.05, maxH: 700, sy: 830 });
B_(S(5) - 0.05, SB, ['rp', 'bg5'], { move: 'whip', fill: 0.98, maxH: 800, sy: 830 });
B_(S(6), PF, 'bg5', { pose: 'shrug', sy: 830 });
B_(S(7) - 0.05, GH, 'c27', { move: 'whip', fill: 0.98, sy: 800, maxH: 460 });
B_(SW(7,4), ZN, 'c27.value', { fill: 0.9, maxH: 380, sy: 800, pose: 'shock', st: 'corner' });
B_(S(8) - 0.05, GH, ['map', 'dend'], { move: 'whip', fill: 0.98, maxH: 960, sy: 830, st: 'corner' });
B_(S(9) - 0.05, GH, 'capb', { move: 'whip', fill: 0.95, maxH: 800, sy: 830 });
B_(S(10) - 0.05, SB, ['gg10', 'ys'], { move: 'whip', fill: 1.02, maxH: 880, sy: 830 });
B_(SW(10,9), ZN, 'ys.bar', { fill: 0.8, maxH: 360, sy: 800 });
B_(S(11) - 0.05, SB, ['lg', 'lgt'], { move: 'whip', fill: 0.98, maxH: 800, sy: 830 });
B_(S(12) - 0.05, GH, 'clk12', { move: 'whip', fill: 0.8, maxH: 800, sy: 830 });
B_(SW(12,6), ZN, 'clk12.label', { fill: 0.7, maxH: 300, sy: 900, pose: 'shock', st: 'corner' });
B_(S(13) - 0.05, GH, 'wh', { move: 'whip', fill: 0.78, maxH: 760, sy: 830 });
B_(S(14) - 0.05, GH, 'sp14', { move: 'whip', fill: 0.78, maxH: 880, sy: 830, st: 'corner' });
B_(S(15) - 0.05, SB, ['sp15', 'bn15'], { move: 'whip', fill: 1.0, maxH: 860, sy: 830 });
B_(S(16) - 0.05, GH, ['sp16', 'wv'], { move: 'whip', fill: 1.0, maxH: 880, sy: 830, st: 'corner' });
B_(S(17) - 0.05, SB, ['clk17', 'gg17'], { move: 'whip', fill: 1.0, maxH: 780, sy: 830 });
B_(SW(17,2), ZN, 'clk17.label', { fill: 0.6, maxH: 300, sy: 900 });
B_(S(18) - 0.05, GH, 'pay', { move: 'whip', fill: 0.98, maxH: 900, sy: 830 });
B_(SW(18,2), ZN, 'pay.num', { fill: 0.7, maxH: 400, sy: 930 });
B_(S(19), PF, 'pay', { pose: 'you', sy: 830, fill: 0.9 });
B_(S(20) - 0.05, GH, ['gg20', 'c8'], { move: 'whip', fill: 1.0, maxH: 820, sy: 830, st: 'corner' });
B_(S(21) - 0.05, GH, 'sp21', { move: 'whip', fill: 0.8, maxH: 900, sy: 830, st: 'corner' });
B_(S(22) - 0.05, GH, 'rcv', { move: 'whip', fill: 0.98, maxH: 900, sy: 830 });
B_(SW(22,5), ZN, 'rcv.b_base', { fill: 0.5, maxH: 400, sy: 830 });
B_(S(23) - 0.05, SB, ['dl', 'c2'], { move: 'whip', fill: 1.0, maxH: 700, sy: 830 });
B_(SW(23,1), ZN, 'c2.value', { fill: 0.6, maxH: 440, sy: 800 });
B_(S(24) - 0.05, PF, 'clk24', { move: 'whip', fill: 0.8, sy: 790, maxH: 760 });
B_(E(24) - 0.55, SB, ['hook2', 'clk0', 'cap0', 'gg0'], Object.assign({ move: 'whip', pose: 'talk' }, F0));
poses.push([SW(19,0), 'follow', { target: [830, 1010] }]);
shakes.push([SW(0,7), 14], [SW(7,4) + 0.1, 12], [SW(12,6) + 0.05, 14], [SW(17,2) + 0.05, 14], [SW(20,5) + 0.05, 16], [SW(21,6) + 0.05, 12]);
const SX = (at, name, gain, dur, offset) => sfx.push({ at, name, gain, dur, offset: offset || 0 });
SX(0, 'deep_boom_2', -4, 0.4); SX(0.1, 'clock_ticking_1', -10, 2.8); SX(SW(0,7), 'dramatic_sting_1', -8, 0.8); SX(S(1), 'typewriter_1', -12, 1.6); SX(S(3), 'camera_shutter_1', -8, 0.4); SX(S(3) + 0.3, 'typewriter_1', -12, 1.6);
SX(SW(4,2), 'pop_2', -9, 0.3); SX(SW(4,5), 'pop_2', -9, 0.3); SX(SW(4,8), 'pop_2', -9, 0.3); SX(SW(5,1), 'paper_rustle_1', -9, 0.8); SX(SW(7,4), 'cash_register_1', -8, 1.0); SX(SW(8,2), 'wrong_buzzer_1', -11, 0.5); SX(SW(8,2) + 1.0, 'wrong_buzzer_2', -11, 0.5);
SX(S(9), 'camera_shutter_2', -8, 0.4); SX(S(10), 'camera_shutter_1', -8, 0.4); SX(SW(10,6), 'clock_ticking_2', -11, 2.4); SX(SW(11,2), 'paper_slam_1', -8, 0.5); SX(SW(12,6), 'rubber_stamp_1', -7, 0.5);
SX(SW(6,1), 'pop_2', -9, 0.3); SX(SW(13,0), 'swoosh_1', -9, 0.6); SX(S(14), 'camera_shutter_2', -8, 0.4); SX(SW(14,10), 'cell_door_1', -8, 1.2); SX(S(16), 'suspense_drone_1', -13, 3.0); SX(SW(16,10), 'rubber_stamp_2', -7, 0.5);
SX(SW(17,2), 'alarm_1', -12, 0.7); SX(SW(17,2) + 0.1, 'deep_boom_1', -7, 1.4); SX(SW(17,11), 'rubber_stamp_1', -7, 0.5); SX(SW(18,2), 'clock_ticking_1', -11, 1.8); SX(SW(19,0) + 0.5, 'click_1', -8, 0.3);
SX(SW(20,5), 'gavel_1', -5, 0.8); SX(SW(20,5) + 0.1, 'cell_door_2', -7, 1.2); SX(SW(21,6), 'rubber_stamp_2', -7, 0.5); SX(SW(22,5), 'sad_trombone_1', -13, 1.2); SX(SW(23,1), 'coin_single_1', -8, 0.6);
BM2.scene({ series: 'decoded', title: "CASE FILE Nº 3 · BRINK'S · 1950", duration: SENT[SENT.length - 1][1] + 0.4,
  footnote: ['11 MEN CHARGED JAN 1956 · 8 SENTENCED TO LIFE · "SPECS" O\'KEEFE PLEADED GUILTY, TESTIFIED: 4 YEARS', "MORE THAN $2.7M STOLEN 1950 · ONLY ABOUT $60,000 RECOVERED · CHEATED = REPORTEDLY", 'PHOTO: FBI EVIDENCE PHOTO OF A CHAUFFEUR\'S CAP · PUBLIC DOMAIN VIA WIKIMEDIA COMMONS · CARDS = ILLUSTRATION'],
  elements: els, beats: beats.sort((a, b) => a.at - b.at), poses, shakes, sfx,
  captions: { emph: { million: 'bad', clock: 'bad', 'cap': 'bad', talks: 'bad', charged: 'bad' }, gap: 16, fix: [] }, bed: { name: 'mystery_bed_3', gain: -1 } });
