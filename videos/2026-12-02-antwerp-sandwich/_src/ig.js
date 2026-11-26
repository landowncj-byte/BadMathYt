// Antwerp sandwich · YouTube cut · CRIME-SHOW (RULES 112). Stations: row-major, 5 per row, 1900 px apart.
const SB = 'side-by-side', GH = 'graphic-hero', ZN = 'zoom-on-number', PF = 'presenter-front', PK = 'peek', PB = 'pull-back';
const DEAL = 'videos/2026-12-02-antwerp-sandwich/_src/img/dealer.png', CREW = 'videos/2026-12-02-antwerp-sandwich/_src/img/crew.png', STREET = 'brand/photos/leonardo-notarbartolo/1.jpg';
const ST = i => [(i % 5) * 1900, Math.floor(i / 5) * 1900], A = (i, dx = 0, dy = 0) => [ST(i)[0] + dx, ST(i)[1] + dy];
const NAME = "name: 'LEONARDO NOTARBARTOLO', nameSize: 30, nick: '“THE FAKE DEALER”', tag: 'ILLUSTRATION'";
const SUS = "src: DEAL, crop: [0, 0, 1, 1], fx: 0.5, fy: 0.4, aspect: 1.0";
const F0 = { sx: 540, sy: 865, fill: 0.98, maxH: 900, st: { x: 915, y: 1395, s: 0.85 } };
const D = (o) => Object.assign({ src: DEAL, crop: [0, 0, 1, 1], fx: 0.5, fy: 0.4, aspect: 1.0 }, o);
const ILL = 'ILLUSTRATION';
const els = [], beats = [], sfx = [], poses = [], shakes = [];
const E_ = (id, type, at, o) => els.push(Object.assign({ id, type, at }, o));
// ---------- S0 frame 0 ----------
E_('hook', 'hook', A(0, 0, -450), { in: 0, out: ((SE(0,10)+0.1)+0.3), props: { lines: [[['THESE CLOWNS STOLE $100M', 'paper']], [['SUNK BY LUNCH', 'bad']]], sizes: [58, 84] } });
E_('hook2', 'hook', A(0, 0, -450), { in: E(22) + 0.0, props: { lines: [[['THESE CLOWNS STOLE $100M', 'paper']], [['SUNK BY LUNCH', 'bad']]], sizes: [58, 84] } });
E_('cnt0', 'counter', A(0, 0, -125), { in: -1, props: { to: 100000000, prefix: '$', at: 0.15, dur: 1.9, size: 128, tone: 'good', label: 'IN DIAMONDS · BY ESTIMATES', w: 900 } });
E_('sus0', 'suspect', A(0, -255, 300), { in: -1, props: D({ w: 380, name: 'THE FAKE DEALER', tag: ILL, flash: false, tilt: -0.03, stringTo: [510, 20], stringAt: 0.9 }) });
E_('sand0', 'prop', A(0, 270, 300), { in: -1, props: { icon: 'sandwich', caption: 'SALAMI SANDWICH', cap: 34, w: 340, h: 380, iconS: 200, slam: true, tilt: 0.04 } });
// ---------- S1 place ----------
E_('plc', 'photo', A(1, 0, 40), { in: S(1) - 0.35, props: { src: STREET, name: 'HOVENIERSSTRAAT', role: "ANTWERP'S DIAMOND STREET", credit: 'PHOTO: THORSTEN1997 · PUBLIC DOMAIN', tag: 'BELGIUM', w: 800, aspect: 0.74, tilt: -0.02, treatment: 'paper', fx: 0.5, fy: 0.5 } });
// ---------- S2 building + vault layers ----------
E_('bld', 'prop', A(2, -380, -30), { in: S(2) - 0.3, props: { icon: 'building', caption: 'DIAMOND CENTRE', cap: 32, w: 300, h: 360, iconS: 190, tilt: -0.03 } });
E_('lck', 'locks', A(2, 260, 20), { in: (SW(2,7)-0.3), props: { at: [SW(2,7) + 0.1, SW(2,9), SW(2,12)], w: 600, h: 820 } });
// ---------- S3 drawers + box owners ----------
E_('drw', 'drawers', A(3, -190, 0), { in: S(3) - 0.3, props: { w: 800, h: 700, cols: 6, rows: 5, open: { 14: SW(3,5) + 0.05 } } });
E_('own', 'victim', A(3, 520, 40), { in: (SW(3,7)-0.2), props: { kind: 'collector', label: 'THE BOX OWNERS', sub: 'PEOPLE WHO RENT THEM', w: 340, h: 440, tape: 'RENTERS', labelSize: 34 } });
// ---------- S4 ★ case file intro ----------
E_('sus4', 'suspect', A(4, -150, 20), { in: S(4) - 0.35, props: D({ variant: 'card', file: true, caseNo: 'CASE FILE Nº 1', w: 500, name: 'LEONARDO NOTARBARTOLO', nameSize: 31, nick: '“THE FAKE DEALER”', tag: ILL + ' · NOT A PHOTO', tilt: -0.03, push: { at: S(4), dur: 3.6, to: 1.5 }, stringTo: [620, 50], stringAt: SW(4,8) - 0.2, ring: SW(4,3) + 0.1 }) });
E_('cover', 'text', A(4, 520, 60), { in: (SW(4,8)-0.2), props: { lines: [[['A COVER', 'paper']], [['STORY', 'gold']]], size: 104 } });
// ---------- S5 ★ the pitch ----------
E_('sus5', 'suspect', A(5, 0, -120), { in: SW(4,4) - 0.3, props: D({ variant: 'side', w: 1000, pw: 430, aspect: 1.12, name: 'THE FAKE DEALER', tag: ILL, quote: [["I'M A", 'ink'], ['DIAMOND', 'ink'], ['DEALER', 'bad']], quoteAt: SW(4,10) - 0.6, quoteSize: 76, quoteSub: 'HIS CLAIM · NOT TRUE', push: { at: SW(4,4), dur: 3, to: 1.35 }, stamps: [{ text: 'NOT TRUE', at: SE(4,10) + 0.2, size: 56, x: -200, y: 170, rot: -0.12 }] }) });
E_('off5', 'prop', A(5, 0, 600), { in: (SW(5,2)-0.2), props: { icon: 'building', caption: 'AN OFFICE IN THE BUILDING', cap: 34, w: 640, h: 280, iconS: 130, tilt: 0.02 } });
// ---------- S6 in and out ----------
E_('swp', 'swipe', A(6, 0, 0), { in: SW(5,0) - 0.3, props: { at: SW(5,10) - 0.2, flipAt: SW(5,11), head: 'IN AND OUT', foot: 'STROLL IN, STROLL OUT' } });
// ---------- S8 weekend + crew ----------
E_('cal', 'prop', A(8, -380, -20), { in: S(7) - 0.3, props: { icon: 'calIcon', caption: 'SAT 15 · SUN 16', sub: 'FEBRUARY 2003', cap: 40, w: 420, h: 560, iconS: 250, tilt: -0.03 } });
E_('crw', 'suspect', A(8, 250, 20), { in: (SW(7,6)-0.3), props: { src: CREW, crop: [0, 0, 1, 1], fx: 0.5, fy: 0.5, aspect: 0.78, w: 560, name: 'HIS CREW', nick: '3 MEN · BEANIES', tag: ILL, flash: true, tilt: 0.03 } });
// ---------- S9 domino drawers ----------
E_('drw2', 'drawers', A(9, 0, 0), { in: S(8) - 0.3, props: { w: 880, h: 760, cols: 6, rows: 5, label: 'BOX AFTER BOX', sub: 'BROKEN OPEN', open: Object.fromEntries(Array.from({ length: 30 }, (_, i) => [i, SW(8,1) + 0.15 + i * 0.045])) } });
// ---------- S10 haul ----------
E_('pil', 'pile', A(10, 0, 0), { in: S(9) - 0.3, props: { w: 800, h: 640, at: SW(9,3) - 0.1, dur: 1.6, n: 48, tag: 'ESTIMATE', label: 'DIAMONDS (ILLUSTRATION)' } });
E_('cnt10', 'counter', A(10, 0, -560), { in: (SW(9,3)-0.2), props: { to: 100000000, prefix: '$', at: (SW(9,6)), dur: 1.0, size: 120, tone: 'bad', label: 'THE HAUL · BY ESTIMATES', w: 880 } });
// ---------- S11 paychecks ----------
E_('pay', 'paygrid', A(11, 0, 0), { in: S(10) - 0.3, props: { w: 860, h: 800, at: SW(10,1) + 0.2, dur: 1.9, n: 1000, head: '$100K A YEAR', unit: 'YEARS OF PAYCHECKS', numAt: SW(10,1) + 0.2 } });
// ---------- S12 checklist + trash ----------
E_('chk', 'checklist', A(12, -120, 0), { in: S(11) - 0.3, props: { w: 780, h: 700, head: 'THE PLAN', icon: 'trashbag', iconAt: (SW(11,8)-0.2), crackAt: SW(17,9), rows: [{ t: 'GET IN', at: S(11) + 0.2, show: S(11) }, { t: 'GET OUT', at: S(11) + 0.7, show: S(11) + 0.4 }, { t: 'BURN THE TRASH', at: SW(17,6), todo: true, show: SW(11,4) + 0.0, size: 60 }] } });
E_('mt', 'prop', A(12, 540, -210), { in: (SW(11,6)-0.1), props: { icon: 'match', caption: 'LAST STEP', cap: 28, w: 230, h: 300, iconS: 150, tilt: 0.05 } });
// ---------- S14 dumped ----------
E_('road', 'prop', A(14, -270, 20), { in: S(14) - 0.3, props: { icon: 'bag2', caption: 'THE BAG', cap: 40, w: 440, h: 520, iconS: 270, tilt: -0.03, wobble: true, stamp: 'DUMPED', stampAt: SW(14,3) + 0.1, stampSize: 54 } });
E_('brx', 'prop', A(14, 280, 20), { in: (SW(14,6)-0.2), props: { icon: 'pin', caption: 'NEAR BRUSSELS', cap: 38, w: 380, h: 520, iconS: 240, tilt: 0.04, sub: 'ROADSIDE' } });
E_('nb', 'nope', A(14, 0, -420), { rot: -0.04, in: (SW(12,4)-0.1), props: { text: 'BURN IT', at: SW(12,4) + 0.1, w: 460 } });
// ---------- S15 evidence ----------
E_('spill', 'prop', A(15, -250, 10), { in: SW(14,9) - 0.3, props: { icon: 'sandwich_full', caption: 'HALF-EATEN', cap: 36, sub: 'SALAMI SANDWICH', w: 440, h: 540, iconS: 290, tilt: -0.04, slam: true } });
E_('evi', 'text', A(15, 290, 10), { in: (SW(14,9)-0.1), props: { lines: [[['EVIDENCE', 'gold']], [['IN THE BAG', 'paper']]], size: 100 } });
// ---------- S16 ★ evidence board ----------
E_('brd', 'board', A(16, 0, 0), { in: S(15) - 0.35, props: { title: 'EVIDENCE BOARD', caseNo: 'CASE FILE Nº 1', w: 980, h: 1140, tightAt: SW(15,6) - 0.1, items: [
  { id: 'ph', k: 'photo', src: DEAL, crop: [0, 0, 1, 1], fx: 0.5, fy: 0.4, x: 0, y: -270, w: 340, h: 420, name: 'THE FAKE DEALER', nameSize: 26, at: S(15) - 0.1, rot: -0.02, push: 0.3 },
  { id: 'sw', k: 'note', x: -300, y: 120, w: 280, h: 330, icon: 'sandwich', iconS: 130, size: 34, lines: [['SANDWICH', 'bad']], at: (SW(15,3)-0.1), rot: -0.05, stamp: { text: 'POLICE SAY: HIS DNA', at: SW(15,6), size: 24, y: 70, rot: -0.06 } },
  { id: 'bg', k: 'note', x: 0, y: 150, w: 270, h: 320, icon: 'bag2', iconS: 120, size: 34, lines: [['TRASH BAG', 'bad']], at: (SW(15,3)+0.2), rot: 0.03 },
  { id: 'br', k: 'note', x: 300, y: 120, w: 280, h: 330, icon: 'pin', iconS: 120, size: 32, lines: [['BRUSSELS', 'bad']], at: (SW(15,3)+0.4), rot: 0.05 },
  { id: 'dn', k: 'note', x: 0, y: 440, w: 640, h: 220, icon: 'helix', iconS: 90, iconY: 70, size: 56, lines: [['SAID TO CARRY HIS DNA', 'bad', 44]], at: (SW(15,6)-0.1), rot: -0.02 } ],
  strings: [[0, 1, SW(15,0) + 0.1], [0, 2, SW(15,0) + 0.35], [0, 3, SW(15,0) + 0.55], [1, 4, SW(15,6)], [2, 4, SW(15,6) + 0.1]] } });
// ---------- S17 arrest ----------
E_('dys', 'counter', A(17, 250, -330), { in: (SW(16,4)-0.1), out: SW(16,16) - 0.2, props: { to: 5, at: (SW(16,4)), dur: 0.8, suffix: ' DAYS', size: 100, tone: 'bad', label: 'LATER', w: 420 } });
E_('arr', 'suspect', A(17, -130, 40), { in: (SW(16,9)-0.3), props: D({ w: 480, name: 'THE FAKE DEALER', tag: ILL + ' · 21 FEB 2003', tilt: -0.02, mono: true, flash: true, push: { at: (SW(16,9)), dur: 3, to: 1.3 }, xmark: SW(16,16) - 0.05, stamps: [{ text: 'ARRESTED', at: SW(16,16), size: 72, x: 0, y: -20, rot: -0.1 }] }) });
E_('cuff', 'prop', A(17, 420, 350), { in: (SW(16,16)-0.1), props: { icon: 'cuffs', caption: '', w: 260, h: 220, iconS: 170, tilt: 0.06 } });
// ---------- S19 court ----------
E_('gvl', 'gavel', A(19, -240, 80), { in: S(18) - 0.3, props: { at: SW(18,6) + 0.05 } });
E_('crt', 'prop', A(19, 330, -10), { in: (SW(18,5)-0.3), props: { icon: 'court', caption: 'ANTWERP COURT', cap: 34, sub: '2005', w: 400, h: 460, iconS: 230, tilt: 0.03, stamp: 'THE PLANNER', stampAt: SW(18,10) + 0.05, stampSize: 40 } });
// ---------- S20 ★ verdict ----------
E_('ver', 'suspect', A(20, -180, 20), { in: S(19) - 0.3, props: D({ w: 480, name: 'THE FAKE DEALER', tag: ILL, tilt: -0.02, mono: true, flash: true, push: { at: S(19), dur: 2.4, to: 1.4 }, bars: SW(19,5) - 0.05, stamps: [{ text: 'SENTENCED', at: SW(19,2), size: 64, x: 0, y: -40, rot: -0.1 }] }) });
E_('v10', 'counter', A(20, 440, -20), { in: (SW(19,4)-0.2), props: { to: 10, at: (SW(19,4)), dur: 0.6, suffix: ' YRS', size: 140, tone: 'bad', label: 'IN PRISON', w: 420 } });
// ---------- S21 crew years ----------
E_('cw2', 'suspect', A(21, 0, 20), { in: S(20) - 0.3, props: { src: CREW, crop: [0, 0, 1, 1], fx: 0.5, fy: 0.5, aspect: 0.78, w: 620, name: 'THREE OF HIS CREW', tag: ILL, flash: false, tilt: -0.02, stamps: [{ text: '5 YEARS', at: SW(20,5) - 0.05, size: 54, x: -170, y: -90, rot: -0.12 }, { text: '5 YEARS', at: SW(20,5) + 0.15, size: 54, x: 20, y: 40, rot: 0.1 }, { text: '5 YEARS', at: SW(20,7) - 0.1, size: 54, x: 180, y: -70, rot: -0.07 }] } });
// ---------- S22 missing diamonds ----------
E_('pil2', 'pile', A(22, 0, 0), { in: S(21) - 0.3, props: { w: 760, h: 600, at: S(21) - 0.5, dur: 0.3, n: 40, tag: 'MISSING', fadeAt: SW(21,5) - 0.2, label: 'MOST WERE NEVER FOUND' } });
// ---------- S23 ★ recap board ----------
E_('rec', 'board', A(23, 0, 0), { in: S(22) - 0.35, props: { title: 'CASE CLOSED?', caseNo: 'CASE FILE Nº 1', w: 980, h: 900, tightAt: SW(22,7) - 0.1, items: [
  { id: 'ph', k: 'photo', src: DEAL, crop: [0, 0, 1, 1], fx: 0.5, fy: 0.4, x: 0, y: -170, w: 320, h: 400, name: 'THE FAKE DEALER', nameSize: 26, at: S(22) - 0.1, rot: -0.02, push: 0.3 },
  { id: 'mn', k: 'note', x: -290, y: 200, w: 300, h: 320, icon: 'gem', iconS: 110, size: 40, lines: [['$100M', 'bad', 56]], at: S(22) + 0.2, rot: -0.05 },
  { id: 'tr', k: 'note', x: 280, y: 200, w: 300, h: 320, icon: 'bag2', iconS: 110, size: 34, lines: [['HIS TRASH', 'bad']], at: (SW(22,3)-0.1), rot: 0.05, stamp: { text: 'TIED HIM TO IT', at: SW(22,7), size: 26, y: 60, rot: -0.05 } } ],
  strings: [[0, 1, S(22) + 0.4], [0, 2, SW(22,3) + 0.1], [1, 2, SW(22,7) - 0.1]] } });
// ---------- S24 comment ----------
E_('spl', 'split', A(24, 0, 0), { in: S(23) - 0.3, props: { w: 900, h: 640, vsAt: (SW(23,3)) } });
// ---------- screen overlays ----------
E_('dc1', 'datecard', [340, 480], { layer: 'screen', in: S(1), out: S(1) + 2.8, props: { kicker: 'CASE FILE Nº 1 · THE SETUP', big: 'ANTWERP', small: 'BELGIUM · DIAMOND CAPITAL' } });
E_('dc2', 'datecard', [340, 480], { layer: 'screen', in: S(7) - 0.1, out: S(7) + 2.2, props: { kicker: 'CHAPTER 3', big: 'THE TRICK', small: 'FEB 2003 · ONE WEEKEND' } });
E_('dc3', 'datecard', [340, 480], { layer: 'screen', in: S(14) - 0.1, out: S(14) + 2.4, props: { kicker: 'CHAPTER 4', big: 'THE CATCH', small: 'NEAR BRUSSELS' } });
E_('dc4', 'datecard', [340, 480], { layer: 'screen', in: S(18) - 0.1, out: S(18) + 2.4, props: { kicker: 'ANTWERP · COURT', big: '2005', small: 'THE VERDICT' } });
E_('heart', 'heart', [800, 930], { layer: 'screen', in: (SW(6,1)-0.05), out: (SW(6,1)+1.15), props: { s: 1 } });
E_('plane', 'plane', [540, 960], { layer: 'screen', in: (SW(13,1)-0.05), out: (SW(13,1)+1.2), props: { dur: 0.9, from: [-230, 250], to: [280, -330], s: 1.5 } });
E_('sendtx', 'text', [820, 440], { layer: 'screen', in: (SW(13,1)+0.15), out: (SW(13,1)+1.2), props: { lines: [[['SEND', 'gold']]], size: 70 } });
E_('btn', 'follow', [830, 1010], { layer: 'screen', scale: 0.8, in: (SW(17,0)-0.05), out: (SW(17,0)+1.45), props: { press: 0.5 } });
E_('ask', 'bubble', [600, 1090], { layer: 'screen', in: (SW(23,0)-0.1), out: E(23) + 0.2, props: { l1: 'BURN THE BAG', l2: 'OR EAT IT?', size: 52, tail: 'left' } });
E_('hud', 'hud', [0, 0], { layer: 'screen', in: -1, props: { labels: [{ at: -1, text: 'THE HOOK' }, { at: S(1) - 0.1, text: 'THE SETUP' }, { at: S(4) - 0.1, text: 'THE MAN' }, { at: SW(4,4) - 0.1, text: 'THE PITCH' }, { at: S(7) - 0.1, text: 'THE TRICK' }, { at: S(14) - 0.1, text: 'THE CATCH' }, { at: S(18) - 0.1, text: 'THE SENTENCE' }],
  items: [] } });
// ---------- beats ----------
const B_ = (at, beat, focus, o) => beats.push(Object.assign({ at, beat, focus }, o || {}));
B_(0, SB, ['hook', 'cnt0', 'sus0', 'sand0'], Object.assign({ pose: 'talk' }, F0));
B_((SW(0,3)), ZN, 'cnt0.value', { fill: 0.9, st: 'corner' });
B_((SW(0,10)), GH, ['hook', 'sand0', 'sus0'], { fill: 0.98, maxH: 960, sy: 835, pose: 'shock', st: 'corner' });
B_(S(1) - 0.05, PK, 'plc', { move: 'whip', sy: 830, maxH: 900, fill: 0.9 });
B_((SW(1,4)), ZN, 'plc.name', { fill: 0.6, maxH: 340, sy: 980 });
B_(S(2) - 0.05, SB, ['bld', 'lck'], { move: 'whip', fill: 0.98, maxH: 900, sy: 830 });
B_((SW(2,9)), ZN, 'lck.stack', { fill: 0.72, maxH: 760, sy: 880 });
B_(S(3) - 0.05, SB, ['drw', 'own'], { move: 'whip', fill: 1.02, sy: 830 });
B_((SW(3,5)), ZN, 'drw.wall', { fill: 0.82, maxH: 620, sy: 860 });
B_(S(4) - 0.05, GH, ['sus4', 'cover'], { move: 'whip', fill: 0.98, maxH: 900, sy: 830, st: 'corner' });
B_((SW(4,3)), ZN, 'sus4.face', { fill: 0.42, maxH: 540, sy: 830 });
B_(SW(4,4) - 0.05, GH, 'sus5', { move: 'whip', fill: 0.98, sy: 830, maxH: 700, st: 'corner' });
B_((SW(4,10)), ZN, 'sus5.quote', { fill: 0.6, maxH: 460, sy: 830 });
B_((SW(5,2)), GH, ['sus5', 'off5'], { fill: 0.95, maxH: 900, sy: 830, st: 'corner' });
B_(SW(5,0) - 0.05, PK, 'swp', { move: 'whip', fill: 0.98, sy: 830, maxH: 760 });
B_((SW(5,11)), ZN, 'swp.cal', { fill: 0.62, maxH: 480, sy: 820 });
B_(S(6), PF, 'swp', { pose: 'shrug', sy: 830 });
B_(S(7) - 0.05, SB, ['cal', 'crw'], { move: 'whip', fill: 1.0, maxH: 880, sy: 830 });
B_((SW(7,6)), ZN, 'crw.face', { fill: 0.42, maxH: 520, sy: 840 });
B_(S(8) - 0.05, GH, 'drw2', { move: 'whip', fill: 0.98, maxH: 860, sy: 830 });
B_(S(9) - 0.05, GH, ['cnt10', 'pil'], { move: 'whip', fill: 0.98, maxH: 900, sy: 830 });
B_((SW(9,6)), ZN, 'cnt10.value', { fill: 0.8, maxH: 440, sy: 880 });
B_((SW(9,7)+0.4), PB, 'pil', { fill: 0.95, maxH: 700, sy: 880 });
B_(S(10) - 0.05, GH, 'pay', { move: 'whip', fill: 0.98, sy: 830, maxH: 880 });
B_((SW(10,2)), ZN, 'pay.num', { fill: 0.7, maxH: 400, sy: 930, pose: 'shock', st: 'corner' });
B_(S(11) - 0.05, SB, ['chk', 'mt'], { move: 'whip', fill: 1.0, maxH: 900, sy: 830 });
B_((SW(11,8)), ZN, 'chk.last', { fill: 0.82, maxH: 380, sy: 880 });
B_(S(13), PF, 'chk', { sy: 830 });
B_(S(14) - 0.05, SB, ['road', 'brx', 'nb'], { move: 'whip', fill: 1.0, maxH: 900, sy: 830 });
B_((SW(14,3)), ZN, 'road', { fill: 0.6, maxH: 560, sy: 860, pose: 'shock', st: 'corner' });
B_(SW(14,9) - 0.05, GH, ['spill', 'evi'], { move: 'whip', fill: 0.84, maxH: 800, sy: 830 });
B_(S(15) - 0.05, GH, 'brd', { move: 'whip', fill: 0.98, maxH: 900, sy: 830, st: 'corner' });
B_((SW(15,6)), ZN, 'brd.dn', { fill: 0.7, maxH: 460, sy: 900 });
B_((SW(15,5)+0.3), ZN, 'brd.ph', { fill: 0.5, maxH: 520, sy: 830 });
B_(S(16) - 0.05, SB, ['arr', 'dys', 'cuff'], { move: 'whip', fill: 1.0, maxH: 900, sy: 830 });
B_((SW(16,16)), ZN, 'arr.face', { fill: 0.42, maxH: 560, sy: 840, pose: 'shock', st: 'corner' });
B_(S(17) - 0.05, PK, 'chk', { move: 'whip', fill: 0.7, sy: 740, maxH: 600 });
B_(S(18) - 0.05, SB, ['gvl', 'crt'], { move: 'whip', fill: 0.98, maxH: 760, sy: 820 });
B_(S(19) - 0.05, GH, ['ver', 'v10'], { fill: 0.98, maxH: 760, sy: 830, st: 'corner' });
B_((SW(19,4)), ZN, 'v10.value', { fill: 0.6, maxH: 420, sy: 830 });
B_(S(20) - 0.05, GH, 'cw2', { move: 'whip', fill: 0.98, maxH: 860, sy: 830, st: 'corner' });
B_(S(21) - 0.05, GH, 'pil2', { move: 'whip', fill: 0.98, maxH: 780, sy: 830 });
B_(S(22) - 0.05, GH, 'rec', { move: 'whip', fill: 0.98, maxH: 900, sy: 830, st: 'corner' });
B_((SW(22,7)), ZN, 'rec.tr', { fill: 0.66, maxH: 460, sy: 880 });
B_(S(23) - 0.05, PF, 'spl', { move: 'whip', fill: 0.98, sy: 830, maxH: 700 });
B_(E(23) - 0.55, SB, ['hook2', 'cnt0', 'sus0', 'sand0'], Object.assign({ move: 'whip', pose: 'talk' }, F0));
// ---------- poses / sfx ----------
poses.push([(SW(17,0)), 'follow', { target: [830, 1010] }]);
shakes.push([SW(0,7), 14], [SW(15,6) + 0.1, 12], [SW(16,16) + 0.05, 14], [SW(19,2) + 0.1, 16], [SW(22,7) + 0.1, 12]);
const SX = (at, name, gain, dur, offset) => sfx.push({ at, name, gain, dur, offset: offset || 0 });
SX(0, 'deep_boom_2', -4, 0.4); SX(0.15, 'money_counter_1', -11, 1.8); SX((SW(0,10)), 'thud_1', -5, 0.6); SX(0.9, 'camera_shutter_1', -9, 0.4);
SX(S(1), 'camera_shutter_2', -9, 0.4); SX((SW(2,7)), 'door_slam_1', -8, 0.6); SX((SW(3,5)), 'click_1', -7, 0.3);
SX(S(4), 'camera_shutter_1', -8, 0.4); SX(S(4) + 0.3, 'typewriter_1', -12, 1.6); SX((SW(4,10)), 'rubber_stamp_1', -9, 0.5);
SX((SW(5,10)), 'click_2', -8, 0.4); SX((SW(7,6)), 'camera_shutter_2', -9, 0.4); SX((SW(8,1)), 'door_bang_1', -9, 1.2);
SX((SW(9,3)), 'coins_drop_1', -9, 1.4); SX((SW(10,2)), 'cash_register_1', -8, 1.0); SX((SW(11,8)), 'dramatic_sting_1', -9, 0.8);
SX(S(14), 'suspense_drone_1', -13, 3.0); SX((SW(12,4)), 'wrong_buzzer_1', -9, 0.5); SX((SW(14,3)), 'thud_2', -6, 0.5);
SX((SW(15,6)), 'riser_1', -12, 0.7); SX((SW(15,6)+0.2), 'deep_boom_1', -6, 1.4); SX((SW(16,4)), 'clock_ticking_1', -11, 1.0);
SX((SW(16,16)), 'camera_shutter_1', -7, 0.4); SX((SW(16,16)+0.1), 'handcuff_click_1', -6, 0.5); SX((SW(18,6)+0.05), 'gavel_1', -5, 0.8);
SX((SW(19,2)), 'rubber_stamp_2', -6, 0.6); SX((SW(19,5)), 'cell_door_1', -7, 1.2); SX((SW(20,5)), 'rubber_stamp_1', -8, 0.5); SX((SW(22,7)), 'rubber_stamp_2', -7, 0.5);
SX((SW(6,1)), 'pop_2', -9, 0.3); SX((SW(13,1)), 'swoosh_1', -9, 0.6); SX((SW(17,0)+0.5), 'click_1', -8, 0.3);
BM2.scene({ series: 'decoded', title: 'CASE FILE Nº 1 · ANTWERP · 2003', duration: SENT[SENT.length - 1][1] + 0.4 + 0.0,
  footnote: ['CONVICTED 2005 · ANTWERP COURT · PLANNER 10 YRS, THREE CREW 5 YRS EACH', 'HAUL ABOUT $100M BY ESTIMATES · DNA CLAIM: POLICE SAID · ILLUSTRATIONS / PROPS (GENERIC)', 'PHOTO: HOVENIERSSTRAAT, ANTWERP — THORSTEN1997 · PUBLIC DOMAIN VIA WIKIMEDIA COMMONS'],
  elements: els, beats: beats.sort((a, b) => a.at - b.at), poses, shakes, sfx,
  captions: { emph: { sandwich: 'bad', 'DNA': 'bad', million: 'good', arrested: 'bad', '$100': 'good' }, gap: 16 }, bed: { name: 'heist_bed_3', gain: -1 } });
