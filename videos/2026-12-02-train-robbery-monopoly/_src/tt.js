// Great Train Robbery (Monopoly) · YouTube · DECODED crime-show. Stations: row-major, 5 per row, 1900 apart.
const SB = 'side-by-side', GH = 'graphic-hero', ZN = 'zoom-on-number', PF = 'presenter-front', PK = 'peek', PB = 'pull-back';
const GANG = 'videos/2026-12-02-train-robbery-monopoly/_src/img/gang.png';
const ST = i => [(i % 5) * 1900, Math.floor(i / 5) * 1900], A = (i, dx = 0, dy = 0) => [ST(i)[0] + dx, ST(i)[1] + dy];
const F0 = { sx: 540, sy: 850, fill: 0.98, maxH: 960, st: { x: 915, y: 1395, s: 0.85 } };
const G = (o) => Object.assign({ src: GANG, crop: [0, 0, 1, 1], fx: 0.5, fy: 0.45, aspect: 0.78, name: 'THE MONOPOLY GANG', tag: 'ILLUSTRATION', flash: false }, o);
const ILL = 'ILLUSTRATION';
const HK = [[['2.5 TONS OF CASH', 'paper']], [['CAUGHT BY KETCHUP', 'bad']]];
const els = [], beats = [], sfx = [], poses = [], shakes = [];
const E_ = (id, type, at, o) => els.push(Object.assign({ id, type, at }, o));
// ---- S0 frame 0 ----
E_('hook', 'hook', A(0, 0, -440), { in: 0, out: SW(0,11) + 0.3, props: { lines: HK, sizes: [66, 76] } });
E_('hook2', 'hook', A(0, 0, -440), { in: E(21) + 0.6, props: { lines: HK, sizes: [66, 76] } });
E_('bd0', 'prop', A(0, 140, 60), { in: -1, props: { icon: 'ketchup', caption: 'KETCHUP', cap: 34, w: 470, h: 500, iconS: 330, slam: true, tilt: 0.03 } });
E_('bn0', 'prop', A(0, 340, 370), { in: -1, props: { icon: 'bundle', caption: '2.5 TONS', cap: 30, w: 260, h: 250, iconS: 150, tilt: -0.05 } });
E_('gg0', 'suspect', A(0, -300, 250), { in: -1, props: G({ w: 400, nick: '≈15 MEN', tilt: -0.03 }) });
// ---- S1 date ----
E_('eng', 'text', A(1, 0, 0), { in: SW(1,4) - 0.2, props: { lines: [[['ENGLAND', 'paper']], [['AUGUST 1963', 'gold']]], size: 112 } });
// ---- S2 train ----
E_('trn', 'trainscene', A(2, 0, 0), { in: SW(4,0) - 0.3, props: { w: 940, h: 600, at: SW(4,2) - 0.5, stopAt: SW(5,13) + 0.3, rigAt: SW(5,9), head: 'ROYAL MAIL TRAIN · NIGHT' } });
// ---- S3 sacks ----
E_('sck', 'prop', A(3, -260, 40), { in: SW(4,10) - 0.3, props: { icon: 'sack', caption: 'SACKS OF USED NOTES', cap: 30, w: 420, h: 480, iconS: 300, tilt: -0.04 } });
// ---- S4 intro ★ ----
E_('gg4', 'suspect', A(4, -150, 20), { in: SW(5,0) - 0.35, props: G({ variant: 'card', file: true, caseNo: 'CASE FILE Nº 2', w: 560, aspect: 0.78, nick: '“THE GANG”', tag: ILL, tilt: -0.03, push: { at: SW(5,0), dur: 3, to: 1.3 }, stringTo: [600, 60], stringAt: SW(5,4) - 0.2, ring: SW(5,3) + 0.2 }) });
E_('c15', 'counter', A(4, 520, 60), { in: SW(5,3) - 0.2, props: { to: 15, prefix: '≈', at: SW(5,4), dur: 0.7, size: 170, tone: 'bad', label: 'MEN IN THE GANG', w: 440 } });
// ---- S5 step 1 / S7 stops are on the train; step cards ----
E_('s1', 'prop', A(5, 0, 0), { in: SW(5,6) - 0.3, props: { icon: 'signal', caption: 'STEP 1: RIG THE SIGNAL', cap: 38, w: 560, h: 520, iconS: 300, tilt: -0.02 } });
// ---- S8 step 2 ----
E_('s2', 'prop', A(8, -280, 20), { in: S(7) - 0.3, props: { icon: 'sack', caption: 'STEP 2', cap: 40, w: 400, h: 460, iconS: 280, tilt: -0.04 } });
E_('c120', 'counter', A(8, 300, 20), { in: SW(7,3) - 0.2, props: { to: 120, at: SW(7,4), dur: 0.9, size: 180, tone: 'bad', label: 'MAIL SACKS', w: 460 } });
// ---- S9 money ----
E_('c26', 'counter', A(9, 0, 0), { in: S(8) - 0.3, props: { to: 2.6, prefix: '£', suffix: ' MILLION', decimals: 1, at: SW(8,3), dur: 1.0, size: 150, tone: 'bad', label: 'ABOUT · STOLEN', w: 860 } });
// ---- S10 scale ----
E_('scl', 'scale', A(10, 0, 0), { in: S(9) - 0.3, props: { w: 920, h: 660, at: SW(9,5), a: 'bundle', b: 'car', la: '2.5 TONS OF CASH', lb: 'A CAR' } });
// ---- S11 farmhouse ----
E_('frm', 'prop', A(11, 0, 0), { in: S(1) - 0.3, props: { icon: 'farm', caption: 'STEP 3: HIDE AT A FARMHOUSE', cap: 34, w: 600, h: 520, iconS: 330, tilt: 0.02 } });
// ---- S12 game night ★ ----
E_('gg12', 'suspect', A(12, -330, 20), { in: S(2) - 0.3, props: G({ w: 420, nick: 'GAME NIGHT', tilt: -0.03, flash: true }) });
E_('bd12', 'prop', A(12, 190, -10), { in: SW(2,4) - 0.2, props: { icon: 'board', caption: 'MONOPOLY, WITH REAL MONEY', cap: 24, w: 460, h: 460, iconS: 300, tilt: 0.04 } });
E_('bn12', 'prop', A(12, 440, 330), { in: SW(2,8), props: { icon: 'bundle', caption: 'THE BANK', cap: 28, w: 250, h: 240, iconS: 140, tilt: -0.05 } });
// ---- S14/15 checklist ----
E_('chk', 'checklist', A(14, 0, 0), { in: S(11) - 0.3, props: { w: 800, h: 640, head: 'LEAVE NO TRACE', icon: 'cloth', iconAt: SW(11,7) - 0.2, crackAt: 99999, rows: [{ t: 'WIPE THE PLACE', at: SW(11,7) + 0.3, show: S(11) }, { t: 'BURN THE FARMHOUSE', at: SW(13,9), todo: true, show: SW(13,4) - 0.4, size: 50 }] } });
E_('nb', 'nope', A(14, 0, 400), { rot: -0.03, in: SW(13,8) - 0.1, props: { text: 'REPORTEDLY NOBODY DID', at: SW(13,9), w: 760 } });
// ---- S16 tip ----
E_('cop', 'prop', A(16, -250, 40), { in: S(14) - 0.3, props: { icon: 'copcar', caption: 'POLICE', cap: 36, w: 420, h: 380, iconS: 300, tilt: -0.04 } });
E_('tp', 'prop', A(16, 230, -10), { in: SW(14,2) - 0.2, props: { icon: 'tip', caption: 'THE FARM', cap: 34, w: 360, h: 400, iconS: 230, tilt: 0.05 } });
// ---- S17 almost everything ----
E_('alm', 'text', A(17, 0, -120), { in: S(15) - 0.2, props: { lines: [[['WIPED', 'paper']], [['ALMOST', 'bad']], [['EVERYTHING', 'paper']]], size: 112 } });
E_('bd17', 'prop', A(17, 0, 380), { in: SW(15,7) - 0.2, props: { icon: 'board', caption: '…WELL, ALMOST', cap: 32, w: 420, h: 330, iconS: 190, tilt: 0.03 } });
// ---- S18 evidence board ★ ----
E_('brd', 'board', A(18, 0, 0), { in: S(16) - 0.35, props: { title: 'EVIDENCE BOARD', caseNo: 'CASE FILE Nº 2', w: 980, h: 1140, tightAt: SW(16,11), items: [
  { id: 'ph', k: 'photo', src: GANG, crop: [0, 0, 1, 1], fx: 0.5, fy: 0.45, x: 0, y: -270, w: 400, h: 400, name: 'THE MONOPOLY GANG', nameSize: 26, at: S(16) - 0.1, rot: -0.02, push: 0.3 },
  { id: 'bo', k: 'note', x: -300, y: 120, w: 290, h: 340, icon: 'board', iconS: 150, size: 32, lines: [['MONOPOLY BOARD', 'bad', 28]], at: SW(16,5) - 0.1, rot: -0.05, stamp: { text: 'PRINTS', at: SW(16,7), size: 30, y: 70, rot: -0.06 } },
  { id: 'fp', k: 'note', x: 0, y: 150, w: 270, h: 320, icon: 'finger', iconS: 130, size: 34, lines: [['FINGERPRINTS', 'bad', 30]], at: SW(16,3) - 0.1, rot: 0.03 },
  { id: 'ke', k: 'note', x: 300, y: 120, w: 290, h: 340, icon: 'ketchup', iconS: 150, size: 34, lines: [['KETCHUP BOTTLE', 'bad', 28]], at: SW(16,11) - 0.1, rot: 0.05, stamp: { text: 'PRINTS', at: SW(16,12), size: 30, y: 70, rot: 0.06 } } ],
  strings: [[0, 2, SW(16,3)], [2, 1, SW(16,5)], [2, 3, SW(16,11)], [0, 1, SW(16,6)], [0, 3, SW(16,12)]] } });
// ---- S19 magnifier ----
// ---- S21 court ★ ----
E_('crt', 'prop', A(21, 330, -20), { in: S(18) - 0.3, props: { icon: 'court', caption: 'APRIL 1964', cap: 40, w: 380, h: 440, iconS: 230, tilt: 0.03 } });
E_('gg21', 'suspect', A(21, -200, 20), { in: SW(18,3) - 0.3, props: G({ w: 480, nick: 'MOST OF THE GANG', tilt: -0.02, mono: true, flash: true, stamps: [{ text: 'CONVICTED', at: SW(18,5), size: 64, x: 0, y: -50, rot: -0.1 }] }) });
E_('gv', 'gavel', A(21, 300, 320), { in: SW(18,4), props: { at: SW(18,5) + 0.05 } });
// ---- S22 verdict ★ ----
E_('gg22', 'suspect', A(22, -200, 20), { in: S(19) - 0.3, props: G({ w: 480, nick: 'THE MAIN MEN', tilt: -0.02, mono: true, flash: true, push: { at: S(19), dur: 2.6, to: 1.35 }, bars: SW(19,8), stamps: [{ text: 'UP TO 30 YEARS', at: SW(19,8), size: 48, x: 0, y: -40, rot: -0.1 }] }) });
E_('c30', 'counter', A(22, 450, 0), { in: SW(19,6) - 0.2, props: { to: 30, prefix: 'UP TO ', at: SW(19,8), dur: 0.7, suffix: ' YRS', size: 120, tone: 'bad', label: 'IN PRISON', w: 520 } });
// ---- S23 recap ★ ----
E_('rec', 'board', A(23, 0, 0), { in: S(21) - 0.35, props: { title: 'CASE CLOSED?', caseNo: 'CASE FILE Nº 2', w: 980, h: 900, tightAt: SW(21,7) - 0.1, items: [
  { id: 'ph', k: 'photo', src: GANG, crop: [0, 0, 1, 1], fx: 0.5, fy: 0.45, x: 0, y: -170, w: 380, h: 380, name: 'THE MONOPOLY GANG', nameSize: 26, at: S(21) - 0.1, rot: -0.02, push: 0.3 },
  { id: 'mn', k: 'note', x: -290, y: 200, w: 300, h: 320, icon: 'bundle', iconS: 140, size: 34, lines: [['2.5 TONS', 'bad', 40], ['OF CASH', 'ink', 30]], at: S(21) + 0.2, rot: -0.05 },
  { id: 'bg', k: 'note', x: 280, y: 200, w: 300, h: 320, icon: 'ketchup', iconS: 140, size: 34, lines: [['A KETCHUP BOTTLE', 'bad', 26]], at: SW(21,7) - 0.1, rot: 0.05, stamp: { text: 'UNDONE', at: SW(21,7) + 0.2, size: 36, y: 60, rot: -0.05 } } ],
  strings: [[0, 1, S(21) + 0.4], [0, 2, SW(21,7)], [1, 2, SW(21,7) + 0.2]] } });
// ---- S24 chips ----
E_('spl2', 'split', A(24, 0, 0), { in: S(22) - 0.3, props: { w: 920, h: 640, a: { icon: 'board', label: 'MONOPOLY', size: 44 }, b: { icon: 'ketchup', label: 'KETCHUP', size: 44 }, vsAt: SW(22,1) } });
// ---- screen overlays ----
E_('bg20', 'suspect', A(20, 0, 20), { in: SW(20,4) - 0.3, props: G({ w: 520, nick: 'RONNIE BIGGS', tag: ILL + ' · NOT A PHOTO', tilt: -0.02, mono: true, flash: true, stamps: [{ text: 'ESCAPED · 1965', at: SW(20,6), size: 52, x: 0, y: -40, rot: -0.1 }] }) });
E_('dc1', 'datecard', [340, 480], { layer: 'screen', in: SW(1,4), out: SW(1,4) + 2.0, props: { kicker: 'CASE FILE Nº 2 · THE SETUP', big: 'ENGLAND', small: 'AUGUST 1963' } });
E_('dc2', 'datecard', [340, 480], { layer: 'screen', in: SW(5,6) - 0.1, out: SW(5,6) + 2.2, props: { kicker: 'CHAPTER 2', big: 'THE PLAN', small: 'STEP 1 · 2 · 3' } });
E_('dc3', 'datecard', [340, 480], { layer: 'screen', in: S(15) - 0.1, out: S(15) + 1.9, props: { kicker: 'CHAPTER 4', big: 'THE SLIP', small: 'ALMOST EVERYTHING' } });
E_('dc4', 'datecard', [340, 480], { layer: 'screen', in: S(18) - 0.1, out: S(18) + 2.4, props: { kicker: 'COURT · APRIL 1964', big: 'THE VERDICT', small: 'MOST OF THE GANG' } });
E_('heart', 'heart', [800, 930], { layer: 'screen', in: SW(6,1) - 0.05, out: SW(6,1) + 1.15, props: { s: 1 } });
E_('plane', 'plane', [540, 960], { layer: 'screen', in: SW(12,1) - 0.05, out: SW(12,1) + 1.2, props: { dur: 0.9, from: [-230, 250], to: [280, -330], s: 1.5 } });
E_('sendtx', 'text', [830, 360], { layer: 'screen', in: SW(12,1) + 0.15, out: SW(12,1) + 1.2, props: { lines: [[['SEND', 'gold']]], size: 70 } });
E_('btn', 'follow', [830, 1010], { layer: 'screen', scale: 0.8, in: SW(17,0) - 0.05, out: SW(17,0) + 1.45, props: { press: 0.5 } });
E_('ask', 'bubble', [600, 1090], { layer: 'screen', in: SW(22,0) - 0.1, out: E(22) + 0.2, props: { l1: 'THE SANDWICH-LEVEL', l2: 'DUMB: WHICH?', size: 52, tail: 'left' } });
E_('rew', 'text', [540, 440], { layer: 'screen', in: S(3) + 0.3, out: SW(3,8) - 0.1, props: { lines: [[["WHERE'D THE", 'paper']], [['REAL MONEY COME FROM?', 'gold']]], size: 60 } });
E_('hud', 'hud', [0, 0], { layer: 'screen', in: -1, props: { labels: [{ at: -1, text: 'THE HOOK' }, { at: SW(1,4) - 0.1, text: 'THE SETUP' }, { at: SW(5,0) - 0.1, text: 'THE GANG' }, { at: SW(5,6) - 0.1, text: 'THE PLAN' }, { at: S(11) - 0.1, text: 'THE COVER-UP' }, { at: S(15) - 0.1, text: 'THE SLIP' }, { at: S(18) - 0.1, text: 'THE SENTENCE' }], items: [] } });
const B_ = (at, beat, focus, o) => beats.push(Object.assign({ at, beat, focus }, o || {}));
B_(0, SB, ['hook', 'bd0', 'bn0', 'gg0'], Object.assign({ pose: 'talk' }, F0));
B_(SW(0,9), GH, ['hook', 'bd0', 'bn0', 'gg0'], { fill: 0.98, maxH: 960, sy: 850, pose: 'shock', st: 'corner' });
B_(SW(1,4) - 0.05, GH, 'eng', { move: 'whip', fill: 0.9, sy: 830 });
B_(SW(4,0) - 0.05, PK, 'trn', { move: 'whip', fill: 0.98, sy: 830, maxH: 700 });
B_(SW(5,0) - 0.05, GH, ['gg4', 'c15'], { move: 'whip', fill: 0.98, maxH: 860, sy: 830, st: 'corner' });
B_(SW(5,4), ZN, 'c15.value', { fill: 0.5, maxH: 400, sy: 800 });
B_(SW(5,6) - 0.05, GH, 's1', { move: 'whip', fill: 0.7, maxH: 800, sy: 830 });
B_(SW(5,9), GH, 'trn.signal', { move: 'whip', fill: 0.5, maxH: 520, sy: 830 });
B_(S(6), PF, 'trn', { pose: 'shrug', sy: 830, fill: 0.98 });
B_(SW(5,13) - 0.05, GH, 'trn', { fill: 0.98, maxH: 700, sy: 830, st: 'corner' });
B_(S(7) - 0.05, SB, ['s2', 'c120'], { move: 'whip', fill: 0.98, maxH: 800, sy: 830 });
B_(SW(7,4), ZN, 'c120.value', { fill: 0.6, maxH: 440, sy: 800 });
B_(S(8) - 0.05, GH, 'c26', { move: 'whip', fill: 0.98, sy: 800, maxH: 440 });
B_(SW(8,3), ZN, 'c26.value', { fill: 0.9, maxH: 380, sy: 800, pose: 'shock', st: 'corner' });
B_(S(9) - 0.05, GH, 'scl', { move: 'whip', fill: 0.98, maxH: 860, sy: 830 });
B_(SW(9,9), ZN, 'scl.a', { fill: 0.5, maxH: 420, sy: 820 });
B_(S(1) - 0.05, GH, 'frm', { move: 'whip', fill: 0.78, maxH: 800, sy: 830 });
B_(S(2) - 0.05, SB, ['gg12', 'bd12', 'bn12'], { move: 'whip', fill: 1.0, maxH: 880, sy: 830 });
B_(SW(2,5), ZN, 'bd12', { fill: 0.55, maxH: 520, sy: 800 });
B_(S(12), PF, 'bd12', { sy: 830 });
B_(S(11) - 0.05, GH, 'chk', { move: 'whip', fill: 0.9, maxH: 800, sy: 830 });
B_(SW(13,4), GH, ['chk', 'nb'], { fill: 0.98, maxH: 860, sy: 830, st: 'corner' });
B_(S(14) - 0.05, SB, ['cop', 'tp'], { move: 'whip', fill: 0.88, maxH: 800, sy: 830 });
B_(S(15) - 0.05, GH, ['alm', 'bd17'], { move: 'whip', fill: 0.98, maxH: 900, sy: 830 });
B_(S(16) - 0.05, GH, 'brd', { move: 'whip', fill: 0.98, maxH: 900, sy: 830, st: 'corner' });
B_(SW(16,12), ZN, 'brd.ke', { fill: 0.5, maxH: 520, sy: 830 });
B_(S(17) - 0.05, PF, 'brd', { move: 'whip', fill: 0.9, maxH: 900, sy: 830 });
B_(SW(20,4) - 0.05, GH, 'bg20', { move: 'whip', fill: 0.9, maxH: 820, sy: 830, st: 'corner' });
B_(S(18) - 0.05, GH, ['gg21', 'crt', 'gv'], { move: 'whip', fill: 0.86, maxH: 900, sy: 830 });
B_(S(19) - 0.05, GH, ['gg22', 'c30'], { move: 'whip', fill: 0.98, maxH: 820, sy: 830, st: 'corner' });
B_(SW(19,8), ZN, 'c30.value', { fill: 0.6, maxH: 420, sy: 800 });
B_(S(21) - 0.05, GH, 'rec', { move: 'whip', fill: 0.98, maxH: 900, sy: 830, st: 'corner' });
B_(SW(21,7), ZN, 'rec.bg', { fill: 0.6, maxH: 460, sy: 860 });
B_(S(22) - 0.05, PF, 'spl2', { move: 'whip', fill: 0.98, sy: 800, maxH: 700 });
B_(S(3), PF, 'bd12', { pose: 'shrug', sy: 830 });
B_(S(10) - 0.05, GH, 'frm', { move: 'whip', fill: 0.78, maxH: 800, sy: 830 });
B_(E(22) - 0.55, SB, ['hook2', 'bd0', 'bn0', 'gg0'], Object.assign({ move: 'whip', pose: 'talk' }, F0));
poses.push([SW(17,0), 'follow', { target: [830, 1010] }]);
shakes.push([SW(0,9), 14], [SW(8,3) + 0.1, 12], [SW(16,12) + 0.1, 12], [SW(18,5) + 0.05, 14], [SW(19,8) + 0.1, 16]);
const SX = (at, name, gain, dur, offset) => sfx.push({ at, name, gain, dur, offset: offset || 0 });
SX(0, 'deep_boom_2', -4, 0.4); SX(0.2, 'cash_rustle_1', -9, 1.2); SX(SW(0,9), 'thud_1', -5, 0.6); SX(SW(1,4), 'typewriter_1', -12, 1.6); SX(SW(4,2), 'car_stop_1', -14, 1.8);
SX(SW(4,10), 'cash_rustle_1', -10, 1.0); SX(SW(5,0), 'camera_shutter_1', -8, 0.4); SX(SW(5,0) + 0.3, 'typewriter_1', -12, 1.6); SX(SW(5,9), 'click_2', -7, 0.4); SX(SW(5,13), 'car_stop_2', -10, 1.4);
SX(SW(7,4), 'cash_count_1', -10, 1.2); SX(SW(8,3), 'cash_register_1', -8, 1.0); SX(SW(9,5), 'sub_drop_1', -9, 0.8); SX(S(2), 'camera_shutter_2', -8, 0.4); SX(SW(2,5), 'click_1', -8, 0.3);
SX(SW(6,1), 'pop_2', -9, 0.3); SX(SW(12,1), 'swoosh_1', -9, 0.6); SX(SW(11,7), 'paper_rustle_1', -9, 0.8); SX(SW(13,9), 'wrong_buzzer_1', -9, 0.5); SX(SW(14,2), 'siren_1', -14, 1.6);
SX(S(16), 'suspense_drone_1', -13, 3.0); SX(SW(16,7), 'rubber_stamp_1', -7, 0.5); SX(SW(16,12), 'rubber_stamp_2', -7, 0.5); SX(SW(16,12) + 0.1, 'deep_boom_1', -7, 1.4);
SX(SW(17,0) + 0.5, 'click_1', -8, 0.3); SX(SW(18,5), 'gavel_1', -5, 0.8); SX(SW(18,5) + 0.1, 'rubber_stamp_2', -6, 0.5); SX(SW(19,8), 'rubber_stamp_1', -6, 0.6); SX(SW(19,8) + 0.2, 'cell_door_1', -7, 1.2); SX(SW(21,7), 'rubber_stamp_2', -7, 0.5);
BM2.scene({ series: 'decoded', title: 'CASE FILE Nº 2 · ENGLAND · 1963', duration: SENT[SENT.length - 1][1] + 0.4,
  footnote: ['COURT CONVICTED MOST OF THE GANG · APRIL 1964 · MAIN MEN UP TO 30 YEARS', 'ABOUT 15 MEN · ABOUT £2.6M · ABOUT 2.5 TONS OF CASH · BURNING THE FARM: REPORTEDLY NEVER HAPPENED', 'ILLUSTRATIONS / PROPS (GENERIC): NO REAL PHOTOS OF THE GANG · NO BRAND LOGOS'],
  elements: els, beats: beats.sort((a, b) => a.at - b.at), poses, shakes, sfx,
  captions: { emph: { Monopoly: 'bad', ketchup: 'bad', fingerprints: 'bad', convicted: 'bad', million: 'good' }, gap: 16 }, bed: { name: 'orchestral_bed_3', gain: -1 } });
