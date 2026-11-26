// Great Train Robbery (Monopoly) · YouTube · DECODED crime-show. Stations: row-major, 5 per row, 1900 apart.
const SB = 'side-by-side', GH = 'graphic-hero', ZN = 'zoom-on-number', PF = 'presenter-front', PK = 'peek', PB = 'pull-back';
const GANG = 'videos/2026-12-02-train-robbery-monopoly/_src/img/gang.png';
const ST = i => [(i % 5) * 1900, Math.floor(i / 5) * 1900], A = (i, dx = 0, dy = 0) => [ST(i)[0] + dx, ST(i)[1] + dy];
const F0 = { sx: 540, sy: 850, fill: 0.98, maxH: 960, st: { x: 915, y: 1395, s: 0.85 } };
const G = (o) => Object.assign({ src: GANG, crop: [0, 0, 1, 1], fx: 0.5, fy: 0.45, aspect: 0.78, name: 'THE MONOPOLY GANG', tag: 'ILLUSTRATION', flash: false }, o);
const ILL = 'ILLUSTRATION';
const HK = [[['THEY PLAYED MONOPOLY', 'paper']], [['WITH THE REAL CASH', 'bad']]];
const els = [], beats = [], sfx = [], poses = [], shakes = [];
const E_ = (id, type, at, o) => els.push(Object.assign({ id, type, at }, o));
// ---- S0 frame 0 ----
E_('hook', 'hook', A(0, 0, -440), { in: 0, out: SW(0,11) + 0.3, props: { lines: HK, sizes: [66, 76] } });
E_('hook2', 'hook', A(0, 0, -440), { in: E(23) + 0.6, props: { lines: HK, sizes: [66, 76] } });
E_('bd0', 'prop', A(0, 140, 60), { in: -1, props: { icon: 'board', caption: 'BOARD GAME', cap: 34, w: 470, h: 500, iconS: 330, slam: true, tilt: 0.03 } });
E_('bn0', 'prop', A(0, 340, 370), { in: -1, props: { icon: 'bundle', caption: 'REAL CASH', cap: 30, w: 260, h: 250, iconS: 150, tilt: -0.05 } });
E_('gg0', 'suspect', A(0, -300, 250), { in: -1, props: G({ w: 400, nick: '≈15 MEN', tilt: -0.03 }) });
// ---- S1 date ----
E_('eng', 'text', A(1, 0, 0), { in: S(1) - 0.2, props: { lines: [[['ENGLAND', 'paper']], [['AUGUST 1963', 'gold']]], size: 112 } });
// ---- S2 train ----
E_('trn', 'trainscene', A(2, 0, 0), { in: S(2) - 0.3, props: { w: 940, h: 600, at: SW(2,9) - 0.5, stopAt: SW(7,1) + 0.3, rigAt: SW(5,5), head: 'ROYAL MAIL TRAIN · NIGHT' } });
// ---- S3 sacks ----
E_('sck', 'prop', A(3, -260, 40), { in: S(3) - 0.3, props: { icon: 'sack', caption: 'SACKS OF USED NOTES', cap: 30, w: 420, h: 480, iconS: 300, tilt: -0.04 } });
E_('q3', 'text', A(3, 330, 20), { in: SW(3,7) - 0.2, props: { lines: [[['WHO WANTS', 'paper']], [['THEM?', 'gold']]], size: 120 } });
// ---- S4 intro ★ ----
E_('gg4', 'suspect', A(4, -150, 20), { in: S(4) - 0.35, props: G({ variant: 'card', file: true, caseNo: 'CASE FILE Nº 2', w: 560, aspect: 0.78, nick: '“THE GANG”', tag: ILL, tilt: -0.03, push: { at: S(4), dur: 3, to: 1.3 }, stringTo: [600, 60], stringAt: SW(4,4) - 0.2, ring: SW(4,3) + 0.2 }) });
E_('c15', 'counter', A(4, 520, 60), { in: SW(4,3) - 0.2, props: { to: 15, prefix: '≈', at: SW(4,4), dur: 0.7, size: 170, tone: 'bad', label: 'MEN IN THE GANG', w: 440 } });
// ---- S5 step 1 / S7 stops are on the train; step cards ----
E_('s1', 'prop', A(5, 0, 0), { in: S(5) - 0.3, props: { icon: 'signal', caption: 'STEP 1: RIG THE SIGNAL', cap: 38, w: 560, h: 520, iconS: 300, tilt: -0.02 } });
// ---- S8 step 2 ----
E_('s2', 'prop', A(8, -280, 20), { in: S(8) - 0.3, props: { icon: 'sack', caption: 'STEP 2', cap: 40, w: 400, h: 460, iconS: 280, tilt: -0.04 } });
E_('c120', 'counter', A(8, 300, 20), { in: SW(8,3) - 0.2, props: { to: 120, at: SW(8,4), dur: 0.9, size: 180, tone: 'bad', label: 'MAIL SACKS', w: 460 } });
// ---- S9 money ----
E_('c26', 'counter', A(9, 0, 0), { in: S(9) - 0.3, props: { to: 2.6, prefix: '£', suffix: ' MILLION', decimals: 1, at: SW(9,3), dur: 1.0, size: 150, tone: 'bad', label: 'ABOUT · STOLEN', w: 860 } });
// ---- S10 scale ----
E_('scl', 'scale', A(10, 0, 0), { in: S(10) - 0.3, props: { w: 920, h: 660, at: SW(10,6), a: 'bundle', b: 'car', la: '2.5 TONS OF CASH', lb: 'A CAR' } });
// ---- S11 farmhouse ----
E_('frm', 'prop', A(11, 0, 0), { in: S(11) - 0.3, props: { icon: 'farm', caption: 'STEP 3: HIDE AT A FARMHOUSE', cap: 34, w: 600, h: 520, iconS: 330, tilt: 0.02 } });
// ---- S12 game night ★ ----
E_('gg12', 'suspect', A(12, -330, 20), { in: S(12) - 0.3, props: G({ w: 420, nick: 'GAME NIGHT', tilt: -0.03, flash: true }) });
E_('bd12', 'prop', A(12, 190, -10), { in: SW(12,6) - 0.2, props: { icon: 'board', caption: 'MONOPOLY, WITH REAL MONEY', cap: 24, w: 460, h: 460, iconS: 300, tilt: 0.04 } });
E_('bn12', 'prop', A(12, 440, 330), { in: SW(12,9), props: { icon: 'bundle', caption: 'THE BANK', cap: 28, w: 250, h: 240, iconS: 140, tilt: -0.05 } });
// ---- S14/15 checklist ----
E_('chk', 'checklist', A(14, 0, 0), { in: S(14) - 0.3, props: { w: 800, h: 640, head: 'LEAVE NO TRACE', icon: 'cloth', iconAt: SW(14,7) - 0.2, crackAt: 99999, rows: [{ t: 'WIPE THE PLACE', at: SW(14,7) + 0.3, show: S(14) }, { t: 'BURN THE FARMHOUSE', at: SW(15,8), todo: true, show: SW(15,3) - 0.4, size: 50 }] } });
E_('nb', 'nope', A(14, 0, 400), { rot: -0.03, in: SW(15,7) - 0.1, props: { text: 'REPORTEDLY NOBODY DID', at: SW(15,8), w: 760 } });
// ---- S16 tip ----
E_('cop', 'prop', A(16, -250, 40), { in: S(16) - 0.3, props: { icon: 'copcar', caption: 'POLICE', cap: 36, w: 420, h: 380, iconS: 300, tilt: -0.04 } });
E_('tp', 'prop', A(16, 230, -10), { in: SW(16,2) - 0.2, props: { icon: 'tip', caption: 'THE FARM', cap: 34, w: 360, h: 400, iconS: 230, tilt: 0.05 } });
// ---- S17 almost everything ----
E_('alm', 'text', A(17, 0, -120), { in: S(17) - 0.2, props: { lines: [[['WIPED', 'paper']], [['ALMOST', 'bad']], [['EVERYTHING', 'paper']]], size: 112 } });
E_('bd17', 'prop', A(17, 0, 380), { in: SW(17,4) - 0.2, props: { icon: 'board', caption: '…WELL, ALMOST', cap: 32, w: 420, h: 330, iconS: 190, tilt: 0.03 } });
// ---- S18 evidence board ★ ----
E_('brd', 'board', A(18, 0, 0), { in: S(18) - 0.35, props: { title: 'EVIDENCE BOARD', caseNo: 'CASE FILE Nº 2', w: 980, h: 1140, tightAt: SW(18,11), items: [
  { id: 'ph', k: 'photo', src: GANG, crop: [0, 0, 1, 1], fx: 0.5, fy: 0.45, x: 0, y: -270, w: 400, h: 400, name: 'THE MONOPOLY GANG', nameSize: 26, at: S(18) - 0.1, rot: -0.02, push: 0.3 },
  { id: 'bo', k: 'note', x: -300, y: 120, w: 290, h: 340, icon: 'board', iconS: 150, size: 32, lines: [['MONOPOLY BOARD', 'bad', 28]], at: SW(18,5) - 0.1, rot: -0.05, stamp: { text: 'PRINTS', at: SW(18,7), size: 30, y: 70, rot: -0.06 } },
  { id: 'fp', k: 'note', x: 0, y: 150, w: 270, h: 320, icon: 'finger', iconS: 130, size: 34, lines: [['FINGERPRINTS', 'bad', 30]], at: SW(18,3) - 0.1, rot: 0.03 },
  { id: 'ke', k: 'note', x: 300, y: 120, w: 290, h: 340, icon: 'ketchup', iconS: 150, size: 34, lines: [['KETCHUP BOTTLE', 'bad', 28]], at: SW(18,11) - 0.1, rot: 0.05, stamp: { text: 'PRINTS', at: SW(18,12), size: 30, y: 70, rot: 0.06 } } ],
  strings: [[0, 2, SW(18,3)], [2, 1, SW(18,5)], [2, 3, SW(18,11)], [0, 1, SW(18,6)], [0, 3, SW(18,12)]] } });
// ---- S19 magnifier ----
E_('spl', 'split', A(19, 0, 0), { in: S(19) - 0.3, props: { w: 920, h: 640, a: { icon: 'board', label: 'A BOARD GAME', size: 38 }, b: { icon: 'ketchup', label: 'AND KETCHUP', size: 38 }, vsAt: SW(19,4) } });
E_('mg', 'prop', A(19, 0, 440), { in: SW(19,6), props: { icon: 'mag', caption: 'HELPED CRACK THE CASE', cap: 30, w: 520, h: 250, iconS: 150, tilt: -0.02 } });
// ---- S21 court ★ ----
E_('crt', 'prop', A(21, 330, -20), { in: S(21) - 0.3, props: { icon: 'court', caption: 'APRIL 1964', cap: 40, w: 380, h: 440, iconS: 230, tilt: 0.03 } });
E_('gg21', 'suspect', A(21, -200, 20), { in: SW(21,3) - 0.3, props: G({ w: 480, nick: 'MOST OF THE GANG', tilt: -0.02, mono: true, flash: true, stamps: [{ text: 'CONVICTED', at: SW(21,5), size: 64, x: 0, y: -50, rot: -0.1 }] }) });
E_('gv', 'gavel', A(21, 300, 320), { in: SW(21,4), props: { at: SW(21,5) + 0.05 } });
// ---- S22 verdict ★ ----
E_('gg22', 'suspect', A(22, -200, 20), { in: S(22) - 0.3, props: G({ w: 480, nick: 'THE MAIN MEN', tilt: -0.02, mono: true, flash: true, push: { at: S(22), dur: 2.6, to: 1.35 }, bars: SW(22,8), stamps: [{ text: 'UP TO 30 YEARS', at: SW(22,8), size: 48, x: 0, y: -40, rot: -0.1 }] }) });
E_('c30', 'counter', A(22, 450, 0), { in: SW(22,6) - 0.2, props: { to: 30, prefix: 'UP TO ', at: SW(22,8), dur: 0.7, suffix: ' YRS', size: 120, tone: 'bad', label: 'IN PRISON', w: 520 } });
// ---- S23 recap ★ ----
E_('rec', 'board', A(23, 0, 0), { in: S(23) - 0.35, props: { title: 'CASE CLOSED?', caseNo: 'CASE FILE Nº 2', w: 980, h: 900, tightAt: SW(23,7) - 0.1, items: [
  { id: 'ph', k: 'photo', src: GANG, crop: [0, 0, 1, 1], fx: 0.5, fy: 0.45, x: 0, y: -170, w: 380, h: 380, name: 'THE MONOPOLY GANG', nameSize: 26, at: S(23) - 0.1, rot: -0.02, push: 0.3 },
  { id: 'mn', k: 'note', x: -290, y: 200, w: 300, h: 320, icon: 'bundle', iconS: 140, size: 34, lines: [['2.5 TONS', 'bad', 40], ['OF CASH', 'ink', 30]], at: S(23) + 0.2, rot: -0.05 },
  { id: 'bg', k: 'note', x: 280, y: 200, w: 300, h: 320, icon: 'board', iconS: 140, size: 34, lines: [['A BOARD GAME', 'bad', 30]], at: SW(23,7) - 0.1, rot: 0.05, stamp: { text: 'UNDONE', at: SW(23,7) + 0.2, size: 36, y: 60, rot: -0.05 } } ],
  strings: [[0, 1, S(23) + 0.4], [0, 2, SW(23,7)], [1, 2, SW(23,7) + 0.2]] } });
// ---- S24 chips ----
E_('spl2', 'split', A(24, 0, 0), { in: S(24) - 0.3, props: { w: 920, h: 640, a: { icon: 'board', label: 'MONOPOLY', size: 44 }, b: { icon: 'ketchup', label: 'KETCHUP', size: 44 }, vsAt: SW(24,2) } });
// ---- screen overlays ----
E_('dc1', 'datecard', [340, 480], { layer: 'screen', in: S(1), out: S(1) + 2.0, props: { kicker: 'CASE FILE Nº 2 · THE SETUP', big: 'ENGLAND', small: 'AUGUST 1963' } });
E_('dc2', 'datecard', [340, 480], { layer: 'screen', in: S(5) - 0.1, out: S(5) + 2.2, props: { kicker: 'CHAPTER 2', big: 'THE PLAN', small: 'STEP 1 · 2 · 3' } });
E_('dc3', 'datecard', [340, 480], { layer: 'screen', in: S(17) - 0.1, out: S(17) + 1.9, props: { kicker: 'CHAPTER 4', big: 'THE SLIP', small: 'ALMOST EVERYTHING' } });
E_('dc4', 'datecard', [340, 480], { layer: 'screen', in: S(21) - 0.1, out: S(21) + 2.4, props: { kicker: 'COURT · APRIL 1964', big: 'THE VERDICT', small: 'MOST OF THE GANG' } });
E_('heart', 'heart', [800, 930], { layer: 'screen', in: SW(6,1) - 0.05, out: SW(6,1) + 1.15, props: { s: 1 } });
E_('plane', 'plane', [540, 960], { layer: 'screen', in: SW(13,1) - 0.05, out: SW(13,1) + 1.2, props: { dur: 0.9, from: [-230, 250], to: [280, -330], s: 1.5 } });
E_('sendtx', 'text', [830, 360], { layer: 'screen', in: SW(13,1) + 0.15, out: SW(13,1) + 1.2, props: { lines: [[['SEND', 'gold']]], size: 70 } });
E_('btn', 'follow', [830, 1010], { layer: 'screen', scale: 0.8, in: SW(20,0) - 0.05, out: SW(20,0) + 1.45, props: { press: 0.5 } });
E_('ask', 'bubble', [600, 1090], { layer: 'screen', in: SW(24,0) - 0.1, out: E(24) + 0.2, props: { l1: 'MONOPOLY', l2: 'OR KETCHUP?', size: 52, tail: 'left' } });
E_('hud', 'hud', [0, 0], { layer: 'screen', in: -1, props: { labels: [{ at: -1, text: 'THE HOOK' }, { at: S(1) - 0.1, text: 'THE SETUP' }, { at: S(4) - 0.1, text: 'THE GANG' }, { at: S(5) - 0.1, text: 'THE PLAN' }, { at: S(14) - 0.1, text: 'THE COVER-UP' }, { at: S(17) - 0.1, text: 'THE SLIP' }, { at: S(21) - 0.1, text: 'THE SENTENCE' }], items: [] } });
const B_ = (at, beat, focus, o) => beats.push(Object.assign({ at, beat, focus }, o || {}));
B_(0, SB, ['hook', 'bd0', 'bn0', 'gg0'], Object.assign({ pose: 'talk' }, F0));
B_(SW(0,8), GH, ['hook', 'bd0', 'bn0', 'gg0'], { fill: 0.98, maxH: 960, sy: 850, pose: 'shock', st: 'corner' });
B_(S(1) - 0.05, GH, 'eng', { move: 'whip', fill: 0.9, sy: 830 });
B_(S(2) - 0.05, PK, 'trn', { move: 'whip', fill: 0.98, sy: 830, maxH: 700 });
B_(S(3) - 0.05, SB, ['sck', 'q3'], { move: 'whip', fill: 0.98, maxH: 860, sy: 830 });
B_(S(4) - 0.05, GH, ['gg4', 'c15'], { move: 'whip', fill: 0.98, maxH: 860, sy: 830, st: 'corner' });
B_(SW(4,4), ZN, 'c15.value', { fill: 0.5, maxH: 400, sy: 800 });
B_(S(5) - 0.05, GH, 's1', { move: 'whip', fill: 0.7, maxH: 800, sy: 830 });
B_(SW(5,5), GH, 'trn.signal', { move: 'whip', fill: 0.5, maxH: 520, sy: 830 });
B_(S(6), PF, 'trn', { pose: 'shrug', sy: 830, fill: 0.98 });
B_(S(7) - 0.05, GH, 'trn', { fill: 0.98, maxH: 700, sy: 830, st: 'corner' });
B_(S(8) - 0.05, SB, ['s2', 'c120'], { move: 'whip', fill: 0.98, maxH: 800, sy: 830 });
B_(SW(8,4), ZN, 'c120.value', { fill: 0.6, maxH: 440, sy: 800 });
B_(S(9) - 0.05, GH, 'c26', { move: 'whip', fill: 0.98, sy: 800, maxH: 440 });
B_(SW(9,3), ZN, 'c26.value', { fill: 0.9, maxH: 380, sy: 800, pose: 'shock', st: 'corner' });
B_(S(10) - 0.05, GH, 'scl', { move: 'whip', fill: 0.98, maxH: 860, sy: 830 });
B_(SW(10,9), ZN, 'scl.a', { fill: 0.5, maxH: 420, sy: 820 });
B_(S(11) - 0.05, GH, 'frm', { move: 'whip', fill: 0.78, maxH: 800, sy: 830 });
B_(S(12) - 0.05, SB, ['gg12', 'bd12', 'bn12'], { move: 'whip', fill: 1.0, maxH: 880, sy: 830 });
B_(SW(12,7), ZN, 'bd12', { fill: 0.55, maxH: 520, sy: 800 });
B_(S(13), PF, 'bd12', { sy: 830 });
B_(S(14) - 0.05, GH, 'chk', { move: 'whip', fill: 0.9, maxH: 800, sy: 830 });
B_(SW(15,3), GH, ['chk', 'nb'], { fill: 0.98, maxH: 860, sy: 830, st: 'corner' });
B_(S(16) - 0.05, SB, ['cop', 'tp'], { move: 'whip', fill: 0.88, maxH: 800, sy: 830 });
B_(S(17) - 0.05, GH, ['alm', 'bd17'], { move: 'whip', fill: 0.98, maxH: 900, sy: 830 });
B_(S(18) - 0.05, GH, 'brd', { move: 'whip', fill: 0.98, maxH: 900, sy: 830, st: 'corner' });
B_(SW(18,12), ZN, 'brd.ke', { fill: 0.5, maxH: 520, sy: 830 });
B_(SW(18,12) + 1.2, GH, 'brd', { fill: 0.98, maxH: 900, sy: 830 });
B_(S(19) - 0.05, GH, ['spl', 'mg'], { move: 'whip', fill: 0.98, maxH: 900, sy: 830 });
B_(S(20) - 0.05, PF, 'brd', { move: 'whip', fill: 0.9, maxH: 900, sy: 830 });
B_(S(21) - 0.05, GH, ['gg21', 'crt', 'gv'], { move: 'whip', fill: 0.86, maxH: 900, sy: 830 });
B_(S(22) - 0.05, GH, ['gg22', 'c30'], { move: 'whip', fill: 0.98, maxH: 820, sy: 830, st: 'corner' });
B_(SW(22,8), ZN, 'c30.value', { fill: 0.6, maxH: 420, sy: 800 });
B_(S(23) - 0.05, GH, 'rec', { move: 'whip', fill: 0.98, maxH: 900, sy: 830, st: 'corner' });
B_(SW(23,7), ZN, 'rec.bg', { fill: 0.6, maxH: 460, sy: 860 });
B_(S(24) - 0.05, PF, 'spl2', { move: 'whip', fill: 0.98, sy: 800, maxH: 700 });
B_(E(24) - 0.55, SB, ['hook2', 'bd0', 'bn0', 'gg0'], Object.assign({ move: 'whip', pose: 'talk' }, F0));
poses.push([SW(20,0), 'follow', { target: [830, 1010] }]);
shakes.push([SW(0,8), 14], [SW(9,3) + 0.1, 12], [SW(18,12) + 0.1, 12], [SW(21,5) + 0.05, 14], [SW(22,8) + 0.1, 16]);
const SX = (at, name, gain, dur, offset) => sfx.push({ at, name, gain, dur, offset: offset || 0 });
SX(0, 'deep_boom_2', -4, 0.4); SX(0.2, 'cash_rustle_1', -9, 1.2); SX(SW(0,8), 'thud_1', -5, 0.6); SX(S(1), 'typewriter_1', -12, 1.6); SX(SW(2,9), 'car_stop_1', -14, 1.8);
SX(S(3), 'cash_rustle_1', -10, 1.0); SX(S(4), 'camera_shutter_1', -8, 0.4); SX(S(4) + 0.3, 'typewriter_1', -12, 1.6); SX(SW(5,5), 'click_2', -7, 0.4); SX(SW(7,1), 'car_stop_2', -10, 1.4);
SX(SW(8,4), 'cash_count_1', -10, 1.2); SX(SW(9,3), 'cash_register_1', -8, 1.0); SX(SW(10,6), 'sub_drop_1', -9, 0.8); SX(S(12), 'camera_shutter_2', -8, 0.4); SX(SW(12,7), 'click_1', -8, 0.3);
SX(SW(6,1), 'pop_2', -9, 0.3); SX(SW(13,1), 'swoosh_1', -9, 0.6); SX(SW(14,7), 'paper_rustle_1', -9, 0.8); SX(SW(15,8), 'wrong_buzzer_1', -9, 0.5); SX(SW(16,2), 'siren_1', -14, 1.6);
SX(S(18), 'suspense_drone_1', -13, 3.0); SX(SW(18,7), 'rubber_stamp_1', -7, 0.5); SX(SW(18,12), 'rubber_stamp_2', -7, 0.5); SX(SW(18,12) + 0.1, 'deep_boom_1', -7, 1.4);
SX(SW(20,0) + 0.5, 'click_1', -8, 0.3); SX(SW(21,5), 'gavel_1', -5, 0.8); SX(SW(21,5) + 0.1, 'rubber_stamp_2', -6, 0.5); SX(SW(22,8), 'rubber_stamp_1', -6, 0.6); SX(SW(22,8) + 0.2, 'cell_door_1', -7, 1.2); SX(SW(23,7), 'rubber_stamp_2', -7, 0.5);
BM2.scene({ series: 'decoded', title: 'CASE FILE Nº 2 · ENGLAND · 1963', duration: SENT[SENT.length - 1][1] + 0.4,
  footnote: ['COURT CONVICTED MOST OF THE GANG · APRIL 1964 · MAIN MEN UP TO 30 YEARS', 'ABOUT 15 MEN · ABOUT £2.6M · ABOUT 2.5 TONS OF CASH · BURNING THE FARM: REPORTEDLY NEVER HAPPENED', 'ILLUSTRATIONS / PROPS (GENERIC): NO REAL PHOTOS OF THE GANG · NO BRAND LOGOS'],
  elements: els, beats: beats.sort((a, b) => a.at - b.at), poses, shakes, sfx,
  captions: { emph: { Monopoly: 'bad', ketchup: 'bad', fingerprints: 'bad', convicted: 'bad', million: 'good' }, gap: 16 }, bed: { name: 'orchestral_bed_3', gain: -1 } });
