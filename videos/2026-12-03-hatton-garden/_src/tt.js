// Hatton Garden 2015 · YouTube · DECODED crime-show. Stations row-major, 5 per row, 1900 apart.
const SB = 'side-by-side', GH = 'graphic-hero', ZN = 'zoom-on-number', PF = 'presenter-front', PK = 'peek', PB = 'pull-back';
const IMG = 'videos/2026-12-03-hatton-garden/_src/img/', CREW = IMG + 'crew.png', TECH = IMG + 'tech.png', STREET = 'brand/photos/hatton-garden/2.jpg';
const ST = i => [(i % 5) * 1900, Math.floor(i / 5) * 1900], A = (i, dx = 0, dy = 0) => [ST(i)[0] + dx, ST(i)[1] + dy];
const F0 = { sx: 540, sy: 850, fill: 0.98, maxH: 960, st: { x: 915, y: 1395, s: 0.85 } };
const G = (o) => Object.assign({ src: CREW, crop: [0, 0, 1, 1], fx: 0.5, fy: 0.45, aspect: 0.78, name: 'THE HATTON GARDEN CREW', nameSize: 27, tag: 'ILLUSTRATION', flash: false }, o);
const ILL = 'ILLUSTRATION';
const HK = [[['THEY DRILLED A VAULT', 'paper']], [['THEN SNITCHED IN THE CAR', 'bad']]];
const els = [], beats = [], sfx = [], poses = [], shakes = [];
const E_ = (id, type, at, o) => els.push(Object.assign({ id, type, at }, o));
// ---- S0 frame 0 ----
E_('hook', 'hook', A(0, 0, -450), { in: 0, out: SW(0,11) + 0.4, props: { lines: HK, sizes: [62, 60] } });
E_('hook2', 'hook', A(0, 0, -450), { in: E(21) + 0.3, props: { lines: HK, sizes: [62, 60] } });
E_('c14', 'counter', A(0, 0, -130), { in: -1, props: { to: 14000000, prefix: '£', suffix: '+', at: 0.15, dur: 1.9, size: 118, tone: 'good', label: 'STOLEN · MORE THAN', w: 880 } });
E_('cr0', 'prop', A(0, 280, 290), { in: -1, props: { icon: 'carrec', caption: 'THEIR CAR', cap: 34, w: 400, h: 340, iconS: 220, slam: true, tilt: 0.04 } });
E_('gg0', 'suspect', A(0, -260, 290), { in: -1, props: G({ w: 400, nick: 'IN THE CAR', tilt: -0.03 }) });
// ---- S1 street ----
E_('st', 'photo', A(1, 0, 30), { in: SW(4,0) - 0.3, props: { src: STREET, name: 'HATTON GARDEN', role: 'LONDON', credit: 'PHOTO: PUBLIC DOMAIN VIA WIKIMEDIA COMMONS', tag: 'EASTER 2015', w: 800, aspect: 0.74, tilt: -0.02, treatment: 'paper', fx: 0.5, fy: 0.5 } });
// ---- S2 jewelry district ----
E_('pn', 'prop', A(2, -260, 20), { in: SW(4,3) - 0.3, props: { icon: 'pin', caption: 'HATTON GARDEN', cap: 34, w: 420, h: 460, iconS: 270, tilt: -0.03 } });
E_('gm', 'prop', A(2, 240, 20), { in: SW(4,4) - 0.2, props: { icon: 'gem', caption: 'JEWELRY DISTRICT', cap: 32, w: 400, h: 400, iconS: 240, tilt: 0.04 } });
// ---- S3 vault ----
E_('bld', 'prop', A(3, -430, 20), { in: S(5) - 0.3, props: { icon: 'building', caption: 'ONE BUILDING', cap: 30, w: 300, h: 360, iconS: 190, tilt: -0.03 } });
E_('drw', 'drawers', A(3, 190, 0), { in: SW(5,5) - 0.2, props: { w: 760, h: 660, cols: 6, rows: 5, open: { 14: SW(5,10) + 0.05 } } });
// ---- S4 ★ meet the gang ----
E_('gg4', 'suspect', A(4, -170, 20), { in: SW(6,3) - 0.35, props: G({ variant: 'card', file: true, caseNo: 'CASE FILE Nº 4', w: 560, nick: '“THE CREW”', tag: ILL, tilt: -0.03, push: { at: SW(6,3), dur: 3.0, to: 1.3 }, stringTo: [650, 50], stringAt: SW(6,8) - 0.2, ring: SW(6,4) + 0.2 }) });
E_('led', 'text', A(4, 540, 40), { in: SW(6,8) - 0.2, props: { lines: [[['MOSTLY', 'paper']], [['OLDER MEN', 'gold']]], size: 76 } });
// ---- S5 step 1 / S7 step 2 ----
E_('s1', 'prop', A(5, 0, 0), { in: S(8) - 0.3, props: { icon: 'lift', caption: 'STEP 1: DOWN THE LIFT SHAFT', cap: 32, w: 600, h: 540, iconS: 340, tilt: -0.02 } });
E_('s2', 'prop', A(7, 0, 0), { in: S(9) - 0.3, props: { icon: 'drill', caption: 'STEP 2: DRILL THROUGH CONCRETE', cap: 30, w: 620, h: 540, iconS: 340, tilt: 0.02, wobble: true } });
// ---- S8 drawers ----
E_('drw2', 'drawers', A(8, 0, 0), { in: SW(10,2) - 0.3, props: { w: 880, h: 760, cols: 6, rows: 5, label: 'BOX AFTER BOX', sub: 'DRILLED AND OPENED', open: Object.fromEntries(Array.from({ length: 30 }, (_, i) => [i, SW(10,3) + 0.15 + i * 0.05])) } });
// ---- S9 haul ----
E_('c9', 'counter', A(9, 0, 0), { in: SW(10,6) - 0.3, props: { to: 14000000, prefix: '£', suffix: '+', at: SW(10,9), dur: 1.4, size: 130, tone: 'bad', label: 'MORE THAN · THE HAUL', w: 880 } });
// ---- S10 years ----
E_('jr', 'prop', A(10, -300, 20), { in: S(11) - 0.3, props: { icon: 'jar', caption: '£1,000 A MONTH', cap: 34, w: 400, h: 440, iconS: 250, tilt: -0.03 } });
E_('yrs', 'counter', A(10, 260, 20), { in: SW(11,7) - 0.2, props: { to: 1100, suffix: '+ YRS', at: SW(11,11), dur: 1.4, size: 110, tone: 'bad', label: 'OF SAVING', w: 460 } });
// ---- S11/12 cameras ----
E_('cams', 'camwall', A(11, 0, 0), { in: S(12) - 0.3, props: { w: 900, h: 780, at: SW(12,1) - 0.2, circleAt: SW(14,5) } });
// ---- S14 ★ bugged car ----
E_('gg14', 'suspect', A(14, -270, 20), { in: S(1) - 0.3, props: G({ w: 440, nick: 'IN THE CAR', tilt: -0.03, flash: true }) });
E_('cr14', 'prop', A(14, 250, -90), { in: SW(1,7) - 0.2, props: { icon: 'carrec', caption: '', w: 400, h: 240, iconS: 190, tilt: 0.03 } });
E_('mc', 'prop', A(14, 250, 230), { in: SW(2,6) - 0.2, props: { icon: 'mic', caption: 'LISTENING DEVICES', cap: 28, w: 400, h: 300, iconS: 170, tilt: -0.03 } });
// ---- S15 recordings ----
E_('wv', 'prop', A(15, 0, -30), { in: S(15) - 0.3, props: { icon: 'wave', caption: 'POLICE RECORDINGS', sub: 'PARAPHRASED · NOT QUOTES', cap: 38, w: 560, h: 420, iconS: 280, tilt: -0.02 } });
E_('arg', 'text', A(15, 0, 380), { in: SW(15,9) - 0.2, props: { lines: [[['ARGUING', 'bad'], [' ABOUT WHAT WENT WRONG', 'paper']], [['SPLITTING THE LOOT', 'gold']]], size: 50 } });
// ---- S16 ★ evidence board ----
E_('brd', 'board', A(16, 0, 0), { in: SW(14,10) - 0.35, props: { title: 'EVIDENCE BOARD', caseNo: 'CASE FILE Nº 4', w: 980, h: 1140, tightAt: SW(14,14), items: [
  { id: 'ph', k: 'photo', src: CREW, crop: [0, 0, 1, 1], fx: 0.5, fy: 0.45, x: 0, y: -270, w: 400, h: 400, name: 'THE HATTON GARDEN CREW', nameSize: 22, at: SW(14,10) - 0.1, rot: -0.02, push: 0.3 },
  { id: 'ca', k: 'note', x: -300, y: 120, w: 290, h: 340, icon: 'carrec', iconS: 150, size: 32, lines: [['THEIR CARS', 'bad', 30]], at: SW(14,1), rot: -0.05 },
  { id: 'rc', k: 'note', x: 0, y: 150, w: 270, h: 320, icon: 'wave', iconS: 140, size: 34, lines: [['RECORDINGS', 'bad', 30]], at: SW(14,4), rot: 0.03, stamp: { text: 'EVERY WORD', at: SW(14,14), size: 28, y: 70, rot: -0.06 } },
  { id: 'bl', k: 'note', x: 300, y: 120, w: 290, h: 340, icon: 'building', iconS: 150, size: 34, lines: [['THE VAULT', 'bad', 30]], at: SW(14,5), rot: 0.05 },
  { id: 'rt', k: 'note', x: 0, y: 440, w: 640, h: 220, icon: 'mic', iconS: 80, iconY: 70, size: 50, lines: [['EVERY WORD RECORDED', 'bad', 42]], at: SW(14,14) - 0.1, rot: -0.02 } ],
  strings: [[0, 1, SW(14,1)], [0, 2, SW(14,4)], [0, 3, SW(14,5)], [1, 4, SW(14,10)], [2, 4, SW(14,14)]] } });
// ---- S17 ★ arrests ----
E_('gg17', 'suspect', A(17, -160, 20), { in: S(17) - 0.3, props: G({ w: 480, nick: '19 MAY 2015', tilt: -0.02, mono: true, flash: true, xmark: SW(17,5), stamps: [{ text: 'ARRESTED', at: SW(17,5), size: 66, x: 0, y: -40, rot: -0.1 }] }) });
E_('c9n', 'counter', A(17, 430, -120), { in: SW(17,6) - 0.2, props: { to: 9, at: SW(17,6), dur: 0.5, suffix: ' PEOPLE', size: 120, tone: 'bad', label: 'ARRESTED', w: 470 } });
E_('cf', 'prop', A(17, 430, 200), { in: SW(17,5), props: { icon: 'cuffs9', caption: '', w: 260, h: 220, iconS: 170, tilt: 0.05 } });
// ---- S19 judge ----
E_('jg', 'text', A(19, -60, 0), { in: S(18) - 0.3, props: { lines: [[['THE JUDGE CALLED IT', 'gold']], [['“THE BIGGEST BURGLARY', 'paper']], [['IN ENGLISH LEGAL HISTORY”', 'bad']]], size: 72 } });
E_('gv', 'gavel', A(19, 330, 330), { in: SW(18,3), props: { at: SW(18,5) } });
// ---- S20 ★ seven years ----
E_('gg20', 'suspect', A(20, -190, 20), { in: S(19) - 0.3, props: G({ w: 480, nick: '4 MEN', tilt: -0.02, mono: true, flash: true, bars: SW(19,5), stamps: [{ text: '7 YEARS', at: SW(19,5), size: 60, x: 0, y: -40, rot: -0.1 }] }) });
E_('c7', 'counter', A(20, 440, 0), { in: SW(19,0) - 0.2, props: { to: 7, at: SW(19,5), dur: 0.5, suffix: ' YRS', size: 150, tone: 'bad', label: 'EACH · 4 MEN', w: 460 } });
// ---- S21 two others / S22 electronics man ----
E_('gg21', 'suspect', A(21, 0, 20), { in: S(20) - 0.3, props: G({ w: 520, name: 'TWO OTHERS', nick: 'ABOUT 6 YEARS EACH', tilt: -0.02, flash: true, stamps: [{ text: '≈ 6 YEARS EACH', at: SW(20,4), size: 50, x: 0, y: -50, rot: -0.08 }] }) });
E_('tc', 'suspect', A(22, 0, 20), { in: S(21) - 0.3, props: { src: TECH, crop: [0, 0, 1, 1], fx: 0.5, fy: 0.4, aspect: 1.0, name: 'THE ELECTRONICS MAN', nameSize: 30, nick: 'SENTENCED LATER', tag: ILL, w: 500, flash: true, tilt: 0.02, stamps: [{ text: '10 YEARS · 2019', at: SW(21,7), size: 46, x: 0, y: -30, rot: -0.08 }] } });
// ---- S23 ★ recap ----
E_('rec', 'board', A(23, 0, 0), { in: SW(21,9) - 0.35, props: { title: 'CASE CLOSED?', caseNo: 'CASE FILE Nº 4', w: 980, h: 900, tightAt: SW(22,5), items: [
  { id: 'ph', k: 'photo', src: CREW, crop: [0, 0, 1, 1], fx: 0.5, fy: 0.45, x: 0, y: -170, w: 380, h: 380, name: 'THE HATTON GARDEN CREW', nameSize: 22, at: SW(21,9) - 0.1, rot: -0.02, push: 0.3 },
  { id: 'mn', k: 'note', x: -290, y: 200, w: 300, h: 320, icon: 'gem', iconS: 130, size: 34, lines: [['£14M', 'bad', 50]], at: SW(21,9) + 0.2, rot: -0.05 },
  { id: 'cr', k: 'note', x: 280, y: 200, w: 300, h: 320, icon: 'carrec', iconS: 150, size: 34, lines: [['THE CAR', 'bad', 34]], at: SW(22,3), rot: 0.05, stamp: { text: 'CAUGHT TALKING', at: SW(22,6), size: 24, y: 60, rot: -0.05 } } ],
  strings: [[0, 1, SW(21,9) + 0.4], [0, 2, SW(22,3)], [1, 2, SW(22,6)]] } });
// ---- S24 ----
E_('spl', 'split', A(24, 0, 0), { in: SW(22,9) - 0.3, props: { w: 920, h: 640, a: { icon: 'carrec', label: 'KEEP QUIET', size: 40 }, b: { icon: 'mic', label: 'TALK', size: 40 }, vsAt: SW(22,12) } });
// ---- screen overlays ----
E_('dc1', 'datecard', [340, 480], { layer: 'screen', in: SW(4,0), out: SW(4,0) + 2.0, props: { kicker: 'CASE FILE Nº 4 · THE SETUP', big: 'LONDON', small: 'EASTER WEEKEND 2015' } });
E_('dc2', 'datecard', [340, 480], { layer: 'screen', in: S(8) - 0.1, out: S(8) + 2.2, props: { kicker: 'CHAPTER 2', big: 'THE JOB', small: 'STEP 1 · 2' } });
E_('dc3', 'datecard', [340, 480], { layer: 'screen', in: S(12) - 0.1, out: S(12) + 1.9, props: { kicker: 'CHAPTER 3', big: 'THE SLIP', small: 'CAMERAS EVERYWHERE' } });
E_('dc4', 'datecard', [340, 480], { layer: 'screen', in: S(18) - 0.1, out: S(18) + 2.4, props: { kicker: 'LONDON · COURT', big: 'THE VERDICT', small: 'JUDGE\'S WORDS' } });
E_('heart', 'heart', [800, 930], { layer: 'screen', in: SW(7,1) - 0.05, out: SW(7,1) + 1.15, props: { s: 1 } });
E_('plane', 'plane', [540, 960], { layer: 'screen', in: SW(13,1) - 0.05, out: SW(13,1) + 1.2, props: { dur: 0.9, from: [-230, 250], to: [280, -330], s: 1.5 } });
E_('sendtx', 'text', [830, 360], { layer: 'screen', in: SW(13,1) + 0.15, out: SW(13,1) + 1.2, props: { lines: [[['SEND', 'gold']]], size: 70 } });
E_('btn', 'follow', [830, 1010], { layer: 'screen', scale: 0.8, in: SW(16,0) - 0.05, out: SW(16,0) + 1.45, props: { press: 0.5 } });
E_('ask', 'bubble', [600, 1090], { layer: 'screen', in: SW(22,9) - 0.1, out: E(22) + 0.2, props: { l1: 'WOULD YOU HAVE', l2: 'STAYED QUIET?', size: 50, tail: 'left' } });
E_('hud', 'hud', [0, 0], { layer: 'screen', in: -1, props: { labels: [{ at: -1, text: 'THE HOOK' }, { at: SW(4,0) - 0.1, text: 'THE SETUP' }, { at: SW(6,3) - 0.1, text: 'THE CREW' }, { at: S(8) - 0.1, text: 'THE JOB' }, { at: S(12) - 0.1, text: 'THE SLIP' }, { at: S(1) - 0.1, text: 'THE BUGS' }, { at: S(18) - 0.1, text: 'THE VERDICT' }], items: [] } });
const B_ = (at, beat, focus, o) => beats.push(Object.assign({ at, beat, focus }, o || {}));
B_(0, SB, ['hook', 'c14', 'cr0', 'gg0'], Object.assign({ pose: 'talk' }, F0));
B_(SW(0,8), GH, ['hook', 'c14', 'cr0', 'gg0'], Object.assign({}, F0, { pose: 'shock', st: 'corner' }));
B_(SW(4,0) - 0.05, GH, 'st', { move: 'whip', fill: 0.92, maxH: 860, sy: 830 });
B_(SW(4,3) - 0.05, SB, ['pn', 'gm'], { move: 'whip', fill: 0.98, maxH: 800, sy: 830 });
B_(S(5) - 0.05, SB, ['bld', 'drw'], { move: 'whip', fill: 1.02, maxH: 800, sy: 830 });
B_(SW(5,10), ZN, 'drw.wall', { fill: 0.7, maxH: 560, sy: 860 });
B_(SW(6,3) - 0.05, GH, ['gg4', 'led'], { move: 'whip', fill: 1.0, maxH: 880, sy: 830, st: 'corner' });
B_(SW(6,9), ZN, 'gg4.face', { fill: 0.42, maxH: 520, sy: 840 });
B_(S(8) - 0.05, GH, 's1', { move: 'whip', fill: 0.72, maxH: 800, sy: 830 });
B_(S(7), PF, 's1', { pose: 'shrug', sy: 830 });
B_(S(9) - 0.05, GH, 's2', { move: 'whip', fill: 0.74, maxH: 800, sy: 830 });
B_(SW(10,2) - 0.05, GH, 'drw2', { move: 'whip', fill: 0.98, maxH: 860, sy: 830 });
B_(SW(10,6) - 0.05, GH, 'c9', { move: 'whip', fill: 0.98, sy: 800, maxH: 460 });
B_(SW(10,9), ZN, 'c9.value', { fill: 0.9, maxH: 380, sy: 800, pose: 'shock', st: 'corner' });
B_(S(11) - 0.05, SB, ['jr', 'yrs'], { move: 'whip', fill: 0.98, maxH: 760, sy: 830 });
B_(SW(11,11), ZN, 'yrs.value', { fill: 0.6, maxH: 440, sy: 800 });
B_(S(12) - 0.05, GH, 'cams', { move: 'whip', fill: 0.98, maxH: 900, sy: 830 });
B_(S(14) - 0.05, GH, 'cams', { fill: 0.98, maxH: 900, sy: 830 });
B_(SW(14,5), ZN, 'cams.feed', { fill: 0.5, maxH: 520, sy: 830, st: 'corner' });
B_(S(13), PF, 'cams', { sy: 830, fill: 0.9 });
B_(S(1) - 0.05, SB, ['gg14', 'cr14', 'mc'], { move: 'whip', fill: 1.0, maxH: 900, sy: 830 });
B_(S(15) - 0.05, GH, ['wv', 'arg'], { move: 'whip', fill: 0.98, maxH: 880, sy: 830 });
B_(SW(14,10) - 0.05, GH, 'brd', { move: 'whip', fill: 0.98, maxH: 900, sy: 830, st: 'corner' });
B_(SW(14,14), ZN, 'brd.rt', { fill: 0.82, maxH: 460, sy: 900 });
B_(S(17) - 0.05, SB, ['gg17', 'c9n', 'cf'], { move: 'whip', fill: 1.0, maxH: 880, sy: 830 });
B_(SW(17,5), ZN, 'gg17.face', { fill: 0.42, maxH: 520, sy: 840, pose: 'shock', st: 'corner' });
B_(S(16), PF, 'brd', { move: 'whip', fill: 0.9, maxH: 900, sy: 830 });
B_(S(18) - 0.05, SB, ['jg', 'gv'], { move: 'whip', fill: 1.0, maxH: 800, sy: 830 });
B_(S(19) - 0.05, GH, ['gg20', 'c7'], { move: 'whip', fill: 1.0, maxH: 820, sy: 830, st: 'corner' });
B_(S(20) - 0.05, GH, 'gg21', { move: 'whip', fill: 0.8, maxH: 880, sy: 830, st: 'corner' });
B_(S(21) - 0.05, GH, 'tc', { move: 'whip', fill: 0.8, maxH: 880, sy: 830, st: 'corner' });
B_(SW(21,9) - 0.05, GH, 'rec', { move: 'whip', fill: 0.98, maxH: 900, sy: 830, st: 'corner' });
B_(SW(22,6), ZN, 'rec.cr', { fill: 0.6, maxH: 460, sy: 860 });
B_(E(22) - 0.55, SB, ['hook2', 'c14', 'cr0', 'gg0'], Object.assign({ move: 'whip', pose: 'talk' }, F0));
poses.push([SW(16,0), 'follow', { target: [830, 1010] }]);
shakes.push([SW(0,8), 14], [SW(10,9) + 0.1, 12], [SW(17,5) + 0.05, 14], [SW(19,5) + 0.05, 16], [SW(21,7) + 0.05, 12]);
const SX = (at, name, gain, dur, offset) => sfx.push({ at, name, gain, dur, offset: offset || 0 });
SX(0, 'deep_boom_2', -4, 0.4); SX(0.15, 'money_counter_1', -11, 1.9); SX(SW(0,8), 'thud_1', -6, 0.6); SX(SW(4,0), 'typewriter_1', -12, 1.6); SX(SW(5,10), 'click_1', -7, 0.3); SX(SW(6,3), 'camera_shutter_1', -8, 0.4); SX(SW(6,3) + 0.3, 'typewriter_1', -12, 1.6);
SX(S(8), 'paper_slam_1', -9, 0.5); SX(S(9), 'explosion_small_1', -14, 1.2); SX(SW(10,3), 'door_bang_1', -9, 1.2); SX(SW(10,9), 'cash_register_1', -8, 1.0); SX(SW(11,11), 'clock_ticking_1', -11, 1.6); SX(SW(7,1), 'pop_2', -9, 0.3);
SX(SW(12,1), 'click_2', -9, 1.2); SX(SW(14,5), 'dramatic_sting_1', -9, 0.8); SX(SW(13,1), 'swoosh_1', -9, 0.6); SX(S(1), 'camera_shutter_2', -8, 0.4); SX(S(15), 'static_1', -16, 1.6); SX(SW(14,10), 'suspense_drone_1', -13, 3.0);
SX(SW(14,14), 'rubber_stamp_1', -7, 0.5); SX(SW(14,14) + 0.1, 'deep_boom_1', -7, 1.4); SX(SW(17,5), 'camera_shutter_1', -7, 0.4); SX(SW(17,5) + 0.1, 'handcuff_click_1', -6, 0.5); SX(SW(16,0) + 0.5, 'click_1', -8, 0.3);
SX(SW(18,5), 'gavel_1', -5, 0.8); SX(SW(19,5), 'rubber_stamp_2', -6, 0.6); SX(SW(19,5) + 0.2, 'cell_door_1', -7, 1.2); SX(SW(20,4), 'rubber_stamp_1', -7, 0.5); SX(SW(21,7), 'rubber_stamp_2', -7, 0.5);
BM2.scene({ series: 'decoded', title: 'CASE FILE Nº 4 · LONDON · 2015', duration: SENT[SENT.length - 1][1] + 0.4,
  footnote: ['FIRST BATCH: 4 MEN 7 YEARS · 2 OTHERS ABOUT 6 · ELECTRONICS MAN 10 YEARS (2019)', "MORE THAN £14M · 9 ARRESTED 19 MAY 2015 · JUDGE'S WORDS ATTRIBUTED · RECORDINGS PARAPHRASED", 'PHOTO: HATTON GARDEN, LONDON · PUBLIC DOMAIN VIA WIKIMEDIA COMMONS · CREW CARDS = ILLUSTRATION'],
  elements: els, beats: beats.sort((a, b) => a.at - b.at), poses, shakes, sfx,
  captions: { emph: { million: 'bad', cars: 'bad', recorded: 'bad', arrested: 'bad', '14': 'good' }, gap: 16 }, bed: { name: 'synth_bed_2', gain: -1 } });
