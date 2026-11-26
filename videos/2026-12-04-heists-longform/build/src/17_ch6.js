// ---------------- CH6 · THE EVIDENCE BOARD (P112-P120) — cork board in the detective room, back to the farmhouse table ----------------
// P112 the MISTAKE TRAY becomes the cork evidence board with the villain cards
pr('cb112', 'cork', R6(0) + 2800 * 0, 40, '@P112-0.3', { w: 1600, h: 900, imgs: [IMG('monopoly'), IMG('dealer'), IMG('hatton'), IMG('specs'), IMG('pickles')], card: '@P112:pin', pins: ['@P113:ketchup', '@P113:sandwich', '@P113:car', '@P113:partner', '@P113:dog'], strings: ['@P113:ketchup+0.3', '@P113:sandwich+0.3', '@P113:car+0.3', '@P113:partner+0.3', '@P113:dog+0.3'] }, { out: '@P114-0.2' });
bt('@P112', 'graphic-hero', 'cb112', { move: 'whip', fill: 0.74, maxH: 900, sy: 500, pose: 'point' }); sf('@P112-0.3', 'swoosh_2', -11, 0.5); sf('@P112:pin', 'paper_slam_2', -8, 0.5); for (let i = 0; i < 5; i++) sf(`@P112:pin+${(0.3 + i * 0.1).toFixed(2)}`, 'pop_2', -10, 0.3);
bt('@P112:evidence', 'zoom-on-number', 'cb112', { fill: 0.8, maxH: 940, sy: 500, pose: 'chin' });
// P113 one exhibit pinned per item, red string pulls tight to each villain card
const PW = [['ketchup', 'e0'], ['sandwich', 'e1'], ['car', 'e2'], ['partner', 'e3'], ['dog', 'e4']];
PW.forEach(([w, a], i) => { bt(`@P113:${w}`, 'zoom-on-number', 'cb112.' + a, { fill: 0.3, maxH: 520, sy: 500, pose: i % 2 ? 'chin' : 'point' }); sf(`@P113:${w}`, 'pop_2', -8, 0.4); sf(`@P113:${w}+0.3`, 'tape_zip_2', -11, 0.6); });
bt('@P113>-0.5', 'graphic-hero', 'cb112', { fill: 0.78, maxH: 900, sy: 500, pose: 'shock' });
// P114 the hard part: signal, vault, drill, masks all stamped PLANNED
el('h114', 'text', R6(1), -330, '@P114-0.3', { lines: [[['THE ', 'paper'], ['HARD', 'accent'], [' PART', 'paper']]], size: 100 }, { out: '@P115-0.2' });
pr('sg114', 'signal', R6(1) - 640, 60, '@P114+0.0', { w: 260, h: 400 }, { out: '@P115-0.2' });
pr('vl114', 'vault', R6(1) - 210, 60, '@P114+0.15', { w: 380, h: 330, layers: ['@P114:vault', '@P114:vault', '@P114:vault', '@P114:vault', '@P114:vault'] }, { out: '@P115-0.2' });
pr('dr114', 'drill', R6(1) + 270, 60, '@P114+0.3', { w: 460, h: 300, a: '@P114:drill', b: '@P114:drill+1.5' }, { out: '@P115-0.2' });
pr('mk114', 'gear', R6(1) + 700, 60, '@P114+0.45', { w: 480, h: 300, items: ['mask'], times: ['@P114:masks'] }, { out: '@P115-0.2' });
for (const [i, [w, x]] of [['signal', -640], ['vault', -210], ['drill', 270], ['masks', 700]].entries()) { el('pl114' + i, 'stamp', R6(1) + x, 110, `@P114:${w}+0.3`, { text: 'PLANNED', tone: 'good', size: 60 }, { rot: -0.08 + i * 0.04, out: '@P115-0.2' }); sf(`@P114:${w}+0.3`, 'rubber_stamp_2', -9, 0.5); }
bt('@P114', 'graphic-hero', ['h114', 'sg114', 'mk114'], { move: 'whip', fill: 0.9, sy: 480, pose: 'point' }); sf('@P114-0.3', 'swoosh_2', -11, 0.5);
for (const [w, f] of [['signal', 'sg114'], ['vault', 'vl114'], ['drill', 'dr114'], ['masks', 'mk114']]) bt(`@P114:${w}`, 'graphic-hero', ['h114', f], { fill: 0.56, maxH: 760, sy: 480, pose: 'point' });
// P115 the easy part: game, trash, chat, share, hedge stamped LOST, one per word
el('h115', 'text', R6(2), -330, '@P115-0.3', { lines: [[['THE ', 'paper'], ['EASY', 'bad'], [' PART', 'paper']]], size: 100 }, { out: '@P116-0.2' });
const LOST = [['game', 'board', 330, 220], ['trash', 'bag', 330, 250], ['chat', 'car', 330, 220], ['share', 'moneybag', 260, 260], ['hedge', 'hedge', 400, 250]];
LOST.forEach(([w, k, pw, ph], i) => { const x = R6(2) + (i - 2) * 400; pr('ls115' + i, k, x, 60, `@P115+${(i * 0.14).toFixed(2)}`, { w: pw, h: ph, ...(k === 'board' ? { drops: [], fp: 1e9 } : {}), ...(k === 'bag' ? { a: -9 } : {}), ...(k === 'car' ? { a: -9, b: 1e9, c: 1e9 } : {}), ...(k === 'moneybag' ? { a: '@P115:share' } : {}), ...(k === 'hedge' ? { a: -9 } : {}), label: w.toUpperCase(), labelAt: `@P115:${w}` }, { out: '@P116-0.2' }); el('lx115' + i, 'stamp', x, 70, `@P115:${w}+0.2`, { text: 'LOST', tone: 'bad', size: 64 }, { rot: -0.08 + i * 0.04, out: '@P116-0.2' }); sf(`@P115:${w}+0.2`, 'rubber_stamp_2', -9, 0.5); });
bt('@P115', 'graphic-hero', ['h115', 'ls1150', 'ls1154'], { move: 'whip', fill: 0.94, sy: 480, pose: 'point' }); sf('@P115-0.3', 'swoosh_2', -11, 0.5);
for (const [i, [w]] of LOST.entries()) bt(`@P115:${w}`, 'graphic-hero', ['h115', 'ls115' + i], { fill: 0.5, maxH: 700, sy: 480, pose: i % 2 ? 'chin' : 'shock' });
// P116 big things vs tiny things: the tiny pan sinks
pr('sc116', 'scale', R6(3), 20, '@P116-0.3', { w: 1000, h: 560, a: '@P116:careless-0.3', dir: 1, l: { icon: 'big', label: 'BIG THINGS', size: 36 }, r: { icon: 'tiny', label: 'TINY THINGS', size: 36 } }, { out: '@P117-0.2' });
bt('@P116', 'graphic-hero', 'sc116', { move: 'whip', fill: 0.62, maxH: 860, sy: 500, pose: 'point' }); sf('@P116-0.3', 'swoosh_2', -11, 0.5);
bt('@P116:careful', 'zoom-on-number', 'sc116', { fill: 0.7, maxH: 700, sy: 500, pose: 'chin' });
bt('@P116:careless', 'graphic-hero', 'sc116', { fill: 0.74, maxH: 760, sy: 500, pose: 'shock' }); sf('@P116:careless-0.1', 'thud_2', -8, 0.8);
// P117-P119 back to the farmhouse table: same top-down shot as frame 0 (board, banknotes, the gang card), then the jail corner and the long way round
pr('b117', 'board', R6(4) + 190, 110, '@P117-0.3', { w: 860, h: 540, drops: ['@P117', '@P117+0.15', '@P117+0.3', '@P117+0.45'], jail: '@P119:jail-0.3', walk: ['@P119:they', '@P119>-0.1'] }, { out: '@P120-0.2' });
el('c118', 'counter', R6(4) + 190, -290, '@P118:tons-0.3', { label: 'STOLEN CASH', to: 2.5, decimals: 1, suffix: ' TONS', at: '@P118:half-0.3', dur: 0.9, tone: 'bad', size: 96, w: 700 }, { out: '@P119-0.2' });
con('k117', 'mono', R6(4) - 560, 60, '@P117-0.2', { w: 400, variant: 'card', file: true, caseNo: 'CASE Nº 1', flash: true }, { out: '@P120-0.2' });
bt('@P117', 'graphic-hero', ['b117', 'k117'], { move: 'whip', fill: 0.9, sy: 470, pose: 'point', dur: 0.7 }); sf('@P117-0.3', 'swoosh_2', -11, 0.5); for (let i = 0; i < 4; i++) sf(`@P117+${(i * 0.15).toFixed(2)}`, 'thud_1', -9, 0.5);
bt('@P117:farmhouse', 'graphic-hero', ['b117', 'k117'], { fill: 0.78, sy: 480, pose: 'chin' });
bt('@P118:gang', 'graphic-hero', ['b117', 'k117', 'c118'], { fill: 0.95, sy: 470, pose: 'point' });
bt('@P118:tons', 'zoom-on-number', 'c118.value', { fill: 0.4, maxH: 400, sy: 470, pose: 'shock' }); sf('@P118:half-0.3', 'money_counter_1', -12, 1.0); sf('@P118:monopoly', 'pop_2', -8, 0.4);
bt('@P118:monopoly', 'zoom-on-number', 'b117', { fill: 0.54, maxH: 640, sy: 480, pose: 'point' });
bt('@P119:game', 'zoom-on-number', 'b117', { fill: 0.56, maxH: 660, sy: 480, pose: 'chin' }); sf('@P119:jail-0.3', 'cell_door_2', -9, 1.0);
bt('@P119:they', 'graphic-hero', 'b117', { fill: 0.62, maxH: 700, sy: 480, pose: 'shrug' }); sf('@P119:they', 'footsteps_wood_1', -10, 2.4);
bt('@P119:long', 'zoom-on-number', 'b117', { fill: 0.58, maxH: 680, sy: 480, pose: 'point' });
// P120 comment question: sandwich, board game or car?
pr('sw120', 'sandwich', R6(5) - 520, 60, '@P120:sandwich-0.5', { w: 320, h: 240, bite: false, label: 'THE SANDWICH', labelAt: '@P120:sandwich' }, { out: '@P120>+0.1' });
pr('bd120', 'board', R6(5), 60, '@P120:board-0.5', { w: 440, h: 280, drops: [], label: 'THE BOARD GAME', labelAt: '@P120:board' }, { out: '@P120>+0.1' });
pr('cr120', 'car', R6(5) + 520, 60, '@P120:car-0.5', { w: 400, h: 250, a: -9, b: 1e9, c: 1e9, label: 'THE CAR', labelAt: '@P120:car#1' }, { out: '@P120>+0.1' });
el('bb120', 'bubble', 1470, 700, '@P120:comments-0.2', { l1: 'WHICH MISTAKE WAS', l2: 'THE DUMBEST?', tail: 'right', size: 38 }, { layer: 'screen', out: '@P120>+0.1' });
bt('@P120', 'graphic-hero', ['sw120', 'cr120'], { move: 'whip', fill: 0.9, sy: 460, pose: 'point' }); sf('@P120-0.3', 'swoosh_2', -11, 0.5);
bt('@P120:sandwich', 'zoom-on-number', 'sw120', { fill: 0.3, maxH: 480, sy: 460, pose: 'point' }); bt('@P120:board', 'zoom-on-number', 'bd120', { fill: 0.32, maxH: 480, sy: 460, pose: 'chin' }); bt('@P120:car#1', 'zoom-on-number', 'cr120', { fill: 0.3, maxH: 480, sy: 460, pose: 'shock' });
for (const w of ['sandwich', 'board', 'car#1']) sf(`@P120:${w}`, 'pop_2', -9, 0.3);
bt('@P120:tell', 'presenter-front', ['sw120', 'cr120'], { fill: 0.9, sy: 460, pose: 'talk' }); sf('@P120:comments-0.2', 'pop_2', -9, 0.3); sf('@P120:comments', 'notification_chime_1', -12, 1.0);
// END CARD (12 s after the last word): wordmark, YouTube end-screen slots, storyteller waving, music only
el('wm', 'text', 960, 140, '@P120>+0.2', { lines: [[['BAD MATH', 'paper']]], size: 150, shadow: true }, { layer: 'screen' });
el('slots', 'endslots', 0, 0, '@P120>+0.4', { rl: 'WATCH NEXT', cl: 'SUBSCRIBE' }, { layer: 'screen' });
bt('@P120>+0.3', 'wide', { x: RM[7], y: 0, w: 1000, h: 600 }, { move: 'whip', dur0: 0.9, fill: 0.5, sy: 470, st: { x: 1075, y: 1064, s: 1.05, layer: 'front' }, pose: 'wave', stDur: 0.9, arc: 0.2 }); sf('@P120>+0.1', 'swoosh_2', -9, 0.8); sf('@P120>+0.7', 'success_chime_2', -12, 1.4);
