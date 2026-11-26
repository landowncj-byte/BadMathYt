// Instagram/Facebook cut v3 (opens on the PORK order). World (px): row0 hook comp(0,0)+why(1300,190) pcard(3100,0) mug(4700,30) con(6700,0) span(8500,0)
// row1 (y1800) q(8500) plates(6700) guards(4900) investors(3100) taken(1300) calendar(-500) · row2 (y3600) costume(-500) tally(1300) dinner(3100) verdict(4900) ruler(6700) finale(8500)
const SB = 'side-by-side', GH = 'graphic-hero', ZN = 'zoom-on-number', PF = 'presenter-front', PK = 'peek', PB = 'pull-back';
const MUG = 'brand/photos/anthony-gignac/1.jpg';
const HOOK = { lines: [[['FAKE SAUDI PRINCE', 'paper']], [['THEN ORDERED PORK', 'bad']]], sizes: [96, 96] };
const F0 = { sx: 540, sy: 895, fill: 0.98, maxH: 940, st: { x: 540, y: 1405, s: 0.7 } };
BM2.scene({
  series: 'decoded', title: 'CASE FILE Nº 026 · FAKE PRINCE', duration: 84.13,
  footnote: ['PLEADED GUILTY 2018 · SENTENCED MAY 31, 2019 · SOURCES: DOJ S.D. FLORIDA, AP', 'ABOUT 30 YEARS = 1988 TO THE 2017 ARREST · ILLUSTRATIONS / PROPS (GENERIC)', 'PHOTO: MIAMI-DADE COUNTY BOOKING PHOTO · PUBLIC DOMAIN VIA WIKIMEDIA COMMONS'],
  elements: [
    // ---- S0 frame 0 (loop target): crown + PORK ticket ----
    { id: 'hook', type: 'hook', at: [0, -430], in: 0, out: '@dinner+0.05', props: HOOK },
    { id: 'hook2', type: 'hook', at: [0, -430], in: '@noticed-0.15', props: HOOK },
    { id: 'sus0', type: 'suspect', at: [-235, 205], in: -1, props: { src: MUG, crop: [0.5, 0, 0.5, 1], fx: 0.5, fy: 0.42, aspect: 1.0, w: 410, name: 'ANTHONY GIGNAC', nick: '“THE FAKE PRINCE”', flash: false, tilt: -0.02, crownAt: 0, crownOff: 60, crownRe: '@noticed-0.1' } },
    { id: 'spike', type: 'spike', at: [300, 235], scale: 0.62, in: -1, props: { slamIn: false } },
    { id: 'spike2', type: 'spike', at: [300, 235], scale: 0.62, in: '@noticed-0.1', props: { slamIn: true } },
    // ---- S1 why it matters (beside the ticket) ----
    { id: 'why', type: 'whycard', at: [1300, 190], in: '@But-0.4', props: { head: 'THE PROBLEM', a1: '@Saudi#2', a2: '@Islam', a3: '@So', r3: ['SO ONE ORDER', 'BLEW UP HIS STORY'] } },
    // ---- S2 the PRINCE card cracks ----
    { id: 'suspc', type: 'suspect', at: [3100, 40], in: '@made-0.5', props: { src: MUG, crop: [0.5, 0, 0.5, 1], fx: 0.5, fy: 0.42, aspect: 1.0, variant: 'side', w: 1000, pw: 430, aspect: 1.12, name: 'ANTHONY GIGNAC', nick: '“THE FAKE PRINCE”', quote: [['I\'M A', 'ink'], ['SAUDI', 'ink'], ['PRINCE', 'bad']], quoteAt: '@made', quoteSize: 74, quoteSub: 'HIS ACT · ONE ORDER BLEW IT', push: { at: '@made', dur: 3.2, to: 1.5 }, crownAt: 0, crownOff: '@damn', stamps: [{ text: 'SUSPICIOUS', at: '@suspicious', size: 60, x: -190, y: 150, rot: -0.12 }] } },
    // ---- S3 who ----
    { id: 'mug', type: 'suspect', at: [4600, 30], in: "@He's-0.35", props: { src: MUG, crop: [0.5, 0, 0.5, 1], fx: 0.5, fy: 0.42, aspect: 1.0, variant: 'card', file: true, caseNo: 'CASE FILE Nº 026', w: 480, name: 'ANTHONY GIGNAC', nick: '“THE FAKE PRINCE”', credit: 'MIAMI-DADE COUNTY BOOKING PHOTO · PUBLIC DOMAIN', tilt: -0.03, push: { at: "@He's", dur: 4.5, to: 1.55 }, stringTo: [660, 330], stringAt: '@zero-0.3', ring: '@Anthony+0.2' } },
    { id: 'zero', type: 'text', at: [5270, 20], in: '@zero-0.2', props: { lines: [[['ZERO', 'bad']], [['ROYAL', 'paper']], [['BLOOD', 'paper']]], size: 104 } },
    // ---- S4 con man ----
    { id: 'con', type: 'defcard', at: [6700, 0], in: "@He's#2-0.2", props: { head: "WHAT'S A CON MAN?", term: 'CON MAN', d1: 'LIES TO PEOPLE TO TAKE', d2: 'THEIR MONEY', icon: 'conman', defAt: '@meaning', iconAt: '@lies' } },
    // ---- S5 thirty years / you vs him ----
    { id: 'span', type: 'span', at: [8500, 0], in: '@kept-0.6', props: { head: 'THE PRINCE ACT', at: '@kept', dur: 1.6, cmpAt: "@can't" } },
    // ---- S6 how the hell ----
    { id: 'qm', type: 'text', at: [8500, 1830], rot: 0.12, in: '@So#2-0.2', props: { lines: [[['?', 'gold']]], size: 560 } },
    // ---- props ----
    { id: 'plates', type: 'plates', at: [6700, 1800], in: '@First-0.5', props: { rollAt: '@Ferrari+0.1', checkAt: '@plates', peelAt: 99999, fakeAt: 99999 } },
    { id: 'guards', type: 'guards', at: [4900, 1800], in: '@Then#2-0.5', props: { flipAt: '@diplomatic#2', checkAt: '@badges', fakeAt: 99999 } },
    { id: 'vinv', type: 'victim', at: [3050, 1800], in: '@Now#2-0.3', props: { kind: 'investor', label: 'THE INVESTORS', sub: 'THE PEOPLE WHO LOST', reactAt: '@trusted+0.4' } },
    { id: 'def', type: 'text', at: [3670, 1790], in: '@legit-0.2', props: { lines: [[['LOOKED LEGIT', 'gold']], [['= TRUSTED HIM', 'paper']], [['WITH MONEY', 'bad']]], size: 58 } },
    { id: 'taken', type: 'taken', at: [1300, 1800], in: '@lost-0.4', props: { at: '@8', dur: 1.3, brickAt: '@lost+0.2' } },
    { id: 'cal', type: 'calendar', at: [-500, 1800], in: '@Spend-0.4', props: { at: '@Spend+0.2', dur: 1.7, yrsAt: '@22', yrsDur: 0.9, to: 22 } },
    { id: 'cos', type: 'suspect', at: [-750, 3600], in: '@But#3-0.3', props: { src: MUG, crop: [0.5, 0, 0.5, 1], fx: 0.5, fy: 0.42, aspect: 1.0, w: 470, name: 'ANTHONY GIGNAC', nick: '“THE FAKE PRINCE”', tilt: -0.02, crownAt: '@But#3-0.1', stamps: [{ text: 'FAKE PLATES', at: '@plates#3', size: 54, x: 0, y: -60, rot: -0.12 }, { text: 'FAKE BADGES', at: '@badges#2', size: 54, x: 0, y: 80, rot: 0.1 }] } },
    { id: 'tplate', type: 'tile', at: [-300, 3470], in: '@But#3', props: { icon: 'plate', caption: 'CAR PLATE', stamp: 'FAKE', stampAt: '@plates#3', tilt: 0.05 } },
    { id: 'tbadge', type: 'tile', at: [-300, 3790], in: '@But#3+0.2', props: { icon: 'badge', caption: 'BADGE', stamp: 'FAKE', stampAt: '@badges#2', tilt: -0.04 } },
    { id: 'board', type: 'board', at: [1300, 3600], in: '@gets-0.4', props: { title: 'EVIDENCE BOARD', caseNo: 'CASE FILE Nº 026', tightAt: '@royalty', items: [
      { id: 'ph', k: 'photo', src: MUG, crop: [0.5, 0, 0.5, 1], fx: 0.5, fy: 0.42, x: 0, y: -280, w: 330, h: 400, name: 'ANTHONY GIGNAC', nameSize: 26, at: '@gets-0.2', rot: -0.02, push: 0.3 },
      { id: 'pl', k: 'note', x: -300, y: 120, w: 270, h: 290, icon: 'plate', size: 34, lines: [['FAKE PLATES', 'bad']], at: '@gets+0.3', rot: -0.05 },
      { id: 'bg', k: 'note', x: 0, y: 150, w: 270, h: 290, icon: 'badge', size: 34, lines: [['FAKE BADGES', 'bad']], at: '@gets+0.6', rot: 0.03 },
      { id: 'ca', k: 'note', x: 300, y: 120, w: 270, h: 290, icon: 'cash', size: 34, lines: [['$8M+ LOST', 'bad']], at: '@gets+0.9', rot: 0.05 },
      { id: 'n11', k: 'note', x: 0, y: 440, w: 640, h: 270, size: 150, lines: [['11×', 'bad', 150]], at: '@arrested-0.1', rot: -0.02, stamp: { text: 'PROSECUTORS SAID', at: '@said', y: 82, size: 30, rot: -0.04 } } ],
      strings: [[0, 1, '@gets+0.5'], [0, 2, '@gets+0.8'], [0, 3, '@gets+1.1'], [0, 4, '@arrested+0.2'], [1, 4, '@royalty-0.2'], [2, 4, '@royalty-0.1'], [3, 4, '@royalty']] } },
    // ---- dinner (back at the table) ----
    { id: 'susd', type: 'suspect', at: [2650, 3760], in: '@dinner#2-0.5', props: { src: MUG, crop: [0.5, 0, 0.5, 1], fx: 0.5, fy: 0.42, aspect: 1.0, w: 400, name: 'ANTHONY GIGNAC', nick: '“THE FAKE PRINCE”', tilt: -0.03, crownAt: '@dinner#2-0.2', crownOff: '@suspicious#2+0.2', stamps: [{ text: 'OUT OF CHARACTER', at: '@victim-0.1', size: 40, x: 0, y: 40, rot: -0.1 }] } },
    { id: 'spike3', type: 'spike', at: [3250, 3370], scale: 0.6, in: '@order#2-0.2', props: { slamIn: true } },
    { id: 'diner', type: 'victim', at: [3640, 3820], in: '@victim-0.5', props: { kind: 'diner', label: 'THE VICTIM', sub: 'AT THE DINNER', reactAt: '@suspicious#2', w: 380, h: 480, tape: 'WITNESS' } },
    // ---- verdict + 18 years ----
    { id: 'sv', type: 'suspect', at: [4680, 3600], in: '@Then#4-0.4', props: { src: MUG, crop: [0.5, 0, 0.5, 1], fx: 0.5, fy: 0.42, aspect: 1.0, w: 470, name: 'ANTHONY GIGNAC', nick: '“THE FAKE PRINCE”', tilt: -0.02, mono: true, push: { at: '@pleaded', dur: 3.2, to: 1.4 }, stamps: [{ text: 'GUILTY', at: '@guilty', size: 74, x: 0, y: -30, rot: -0.1 }], bars: '@sentenced' } },
    { id: 'vc', type: 'counter', at: [5380, 3560], in: '@Then#4-0.3', props: { to: 18, at: '@18', dur: 0.7, suffix: '+', size: 170, tone: 'bad', label: 'YEARS IN PRISON', sub: 'MAY 31, 2019', w: 460 } },
    { id: 'rul', type: 'ruler18', at: [6700, 3600], in: "@That's-0.4", props: { at: '@newborn', dur: 2.0, toy: 'rattle' } },
    // ---- finale ----
    { id: 'fin', type: 'text', at: [8500, 3450], in: '@30#3-0.2', props: { lines: [[['30 YEARS A PRINCE', 'paper']], [['ONE PORK ORDER', 'bad']]], size: 90 } },
    { id: 'tip', type: 'slamstamp', at: [8500, 3900], rot: -0.06, in: '@tipped-0.1', props: { text: 'TIPPED OFF', tone: 'bad', size: 112 } },
    // ---- screen overlays ----
    { id: 'hell', type: 'text', layer: 'screen', at: [540, 440], in: '@So#2', out: '@Look-0.1', props: { lines: [[['HOW THE HELL DID', 'paper']], [['ANYBODY BELIEVE HIM?', 'gold']]], size: 66 } },
    { id: 'props', type: 'text', layer: 'screen', at: [540, 440], in: '@Look', out: '@First-0.15', props: { lines: [[['LOOK AT', 'paper']], [['THE PROPS', 'gold']]], size: 80 } },
    { id: 'stepA', type: 'text', layer: 'screen', at: [540, 440], in: '@First', out: '@Then#2-0.15', props: { lines: [[['STEP 1 · THE PLATES', 'gold']], [['FOREIGN OFFICIALS GET THESE', 'paper']]], size: 46 } },
    { id: 'stepB', type: 'text', layer: 'screen', at: [540, 440], in: '@Then#2', out: '@Now#2-0.15', props: { lines: [[['STEP 2 · THE BADGES', 'gold']], [['LIKE REAL GOVERNMENT AGENTS', 'paper']]], size: 46 } },
    { id: 'pip1', type: 'suspect', layer: 'screen', at: [880, 1130], in: '@First-0.3', out: '@Now#2-0.3', props: { src: MUG, crop: [0.5, 0, 0.5, 1], fx: 0.5, fy: 0.42, aspect: 1.0, variant: 'pip', w: 200, label: 'HIS TRICK', tilt: 0.03, arrow: { at: '@First+0.2', to: [-400, -330] } } },
    { id: 'dc1', type: 'datecard', layer: 'screen', at: [340, 480], in: "@He's-0.05", out: '@Anthony+0.9', props: { kicker: 'CASE FILE Nº 026 · THE PITCH', big: 'FLORIDA', small: 'THE ACT: 1988 → 2017' } },
    { id: 'dc3', type: 'datecard', layer: 'screen', at: [340, 480], in: '@gets-0.15', out: '@gets+1.1', props: { kicker: 'CHAPTER 3', big: 'THE FALLOUT', small: 'MONEY · ARRESTS' } },
    { id: 'dc4', type: 'datecard', layer: 'screen', at: [340, 480], in: '@pleaded-0.1', out: '@guilty+0.1', props: { kicker: 'S.D. FLORIDA · FEDERAL COURT', big: 'THE VERDICT', small: 'PER DOJ' } },
    { id: 'legit', type: 'text', layer: 'screen', at: [540, 440], in: '@legit-0.2', out: '@Send-0.1', props: { lines: [[['LOOKED ', 'paper'], ['LEGIT', 'gold']]], size: 84 } },
    { id: 'back', type: 'text', layer: 'screen', at: [540, 440], in: '@but#2', out: "@He's+0.1", props: { lines: [[['BUT BACK UP…', 'gold']]], size: 84 } },
    { id: 'heart', type: 'heart', layer: 'screen', at: [800, 930], in: '@tap-0.05', out: '@tap+1.15', props: { s: 1 } },
    { id: 'plane', type: 'plane', layer: 'screen', at: [540, 960], in: '@Send-0.05', out: '@Send+1.2', props: { dur: 0.9, from: [-230, 250], to: [280, -330], s: 1.5 } },
    { id: 'sendtx', type: 'text', layer: 'screen', at: [820, 440], in: '@Send+0.15', out: '@Send+1.2', props: { lines: [[['SEND', 'gold']]], size: 70 } },
    { id: 'mag', type: 'mag', layer: 'screen', at: [830, 1010], in: '@Follow-0.05', out: '@Follow+1.45', props: { press: 0.5 } },
    { id: 'btn', type: 'follow', layer: 'screen', at: [830, 1010], scale: 0.8, in: '@Follow-0.05', out: '@Follow+1.45', props: { press: 0.5 } },
    { id: 'ended', type: 'text', layer: 'screen', at: [540, 440], in: '@how#2-0.05', out: '@Then#4-0.1', props: { lines: [[['HOW IT ENDED…', 'gold']]], size: 92 } },
    { id: 'ask', type: 'bubble', layer: 'screen', at: [600, 1090], in: '@Would', out: '@noticed+0.45', props: { l1: 'WOULD YOU', l2: 'HAVE NOTICED?', size: 52, tail: 'left' } },
    { id: 'hud', type: 'hud', layer: 'screen', at: [0, 0], in: -1, props: {
      labels: [{ at: -1, text: 'THE SLIP' }, { at: '@but#2-0.1', text: 'THE PITCH' }, { at: '@Look-0.1', text: 'THE TRICK' }, { at: '@Now#2-0.2', text: 'THE MONEY' }, { at: '@gets-0.25', text: 'THE FALLOUT' }, { at: '@Then#3-0.2', text: 'THE CATCH' }, { at: '@Then#4-0.2', text: 'THE SENTENCE' }],
      items: [{ at: 0, label: 'PORK ORDERS THAT BLEW IT', from: 0, to: 1, dur: 0.9 }, { at: '@zero', label: 'ROYAL BLOOD', to: 0, dur: 0.5 }, { at: '@kept', label: 'YEARS OF THE ACT', from: 0, to: 30, dur: 1.7, prefix: '~' },
        { at: '@First', label: 'PROPS SO FAR', from: 0, to: 1, dur: 0.4 }, { at: '@Then#2', label: 'PROPS SO FAR', to: 2, dur: 0.4 },
        { at: '@lost', label: 'INVESTORS LOST (MORE THAN)', from: 0, to: 8000000, dur: 1.4, prefix: '$' }, { at: '@Spend+0.2', label: 'DAYS AT $1,000', from: 0, to: 8000, dur: 1.9, suffix: ' DAYS' }, { at: '@22', label: 'THAT IS', to: 22, dur: 0.8, suffix: ' YEARS' },
        { at: '@fake', label: 'PROPS THAT WERE REAL', to: 0, dur: 0.5 }, { at: '@arrested', label: 'ARRESTED OR CONVICTED', from: 0, to: 11, dur: 1.0, suffix: '×' }, { at: '@order#2', label: 'DINNER ORDERS THAT TIPPED IT', to: 1, dur: 0.4 },
        { at: '@18', label: 'YEARS IN PRISON', from: 0, to: 18, dur: 0.7, suffix: '+' }, { at: '@30#3', label: 'YEARS AS A PRINCE', to: 30, dur: 0.8, prefix: '~' }, { at: '@noticed-0.2', label: 'PORK ORDERS THAT BLEW IT', to: 1, dur: 0.5 }] } },
  ],
  beats: [
    { at: 0, beat: SB, focus: ['hook', 'sus0', 'spike'], ...F0, pose: 'shock' },
    { at: '@pork', beat: ZN, focus: ['hook', 'sus0', 'spike'], sx: 540, sy: 930, fill: 1.06, maxH: 960, st: F0.st, dur: 0.45 },
    { at: '@dinner', beat: SB, focus: ['hook', 'sus0', 'spike'], ...F0, pose: 'shock', dur: 0.6 },
    // the problem
    { at: '@But', beat: SB, focus: 'why', move: 'whip', sx: 540, sy: 880, fill: 0.9, maxH: 940, st: 'corner-left', pose: 'point' },
    { at: '@Saudi#2', beat: ZN, focus: 'why.r1', fill: 0.84, maxH: 320, sy: 780, st: 'corner-left', pose: 'point', dur: 0.45 },
    { at: '@Islam', beat: ZN, focus: 'why.r2', fill: 0.84, maxH: 320, sy: 800, st: 'corner-left', pose: 'point', dur: 0.45 },
    { at: '@pork#2', beat: GH, focus: 'why', sy: 880, fill: 0.9, maxH: 940, st: 'corner-left', pose: 'talk', dur: 0.7 },
    { at: '@So', beat: ZN, focus: 'why.r3', fill: 0.7, maxH: 320, sy: 1000, st: 'corner-left', pose: 'shock', dur: 0.45 },
    // the card cracks
    { at: '@made', beat: SB, focus: 'suspc', move: 'whip', sx: 540, sy: 880, fill: 0.86, maxH: 780, st: 'corner', pose: 'shock' },
    { at: '@suspicious', beat: ZN, focus: 'suspc', fill: 0.86, maxH: 780, sy: 880, st: 'corner', pose: 'shock', dur: 0.45 },
    // rewind: whole world, then who
    { at: '@but#2', beat: 'wide', st: 'corner', pose: 'shrug', dur: 0.8 },
    { at: "@He's", beat: SB, focus: ['mug', 'zero'], move: 'whip', sx: 540, sy: 950, fill: 0.9, maxH: 900, st: 'corner', pose: 'shrug' },
    { at: '@Anthony', beat: ZN, focus: 'mug', fill: 0.62, maxH: 680, sy: 960, st: 'corner', pose: 'point', dur: 0.45 },
    { at: '@zero', beat: SB, focus: ['mug', 'zero'], sx: 540, sy: 800, fill: 0.95, maxH: 1000, st: 'corner', pose: 'shock', dur: 0.8 },
    // con man
    { at: "@He's#2", beat: SB, focus: 'con', move: 'whip', sx: 540, sy: 880, fill: 0.74, maxH: 880, st: 'left', pose: 'point' },
    { at: '@con', beat: ZN, focus: 'con.term', fill: 0.8, maxH: 300, sy: 680, st: 'corner-left', pose: 'point', dur: 0.45 },
    { at: '@meaning', beat: GH, focus: 'con', sy: 880, fill: 0.78, maxH: 880, st: 'corner-left', pose: 'talk', dur: 0.7 },
    { at: '@lies', beat: ZN, focus: 'con.icon', fill: 0.78, maxH: 380, sy: 840, st: 'corner', pose: 'point', dur: 0.5 },
    { at: '@money', beat: GH, focus: 'con', fill: 0.78, maxH: 880, sy: 880, st: 'peek', pose: 'chin', dur: 0.8 },
    // thirty years
    { at: '@kept', beat: SB, focus: 'span', move: 'whip', sx: 540, sy: 860, fill: 0.84, maxH: 760, st: 'left', pose: 'point' },
    { at: '@30', beat: ZN, focus: 'span.num', fill: 0.8, maxH: 420, sy: 800, st: 'corner', pose: 'shock', dur: 0.5 },
    { at: '@years', beat: GH, focus: 'span', sy: 860, fill: 0.84, maxH: 760, st: 'corner-left', pose: 'idle', dur: 0.8 },
    { at: '@Double', beat: GH, focus: 'span', sy: 860, fill: 0.84, maxH: 760, st: 'corner-left', pose: 'you', dur: 0.6 },
    { at: '@30#2', beat: ZN, focus: 'span.cmp', fill: 0.84, maxH: 420, sy: 940, st: 'corner', pose: 'shrug', dur: 0.5 },
    // how the hell / props
    { at: '@So#2', beat: PF, focus: 'qm', move: 'whip', sy: 800, pose: 'you' },
    { at: '@Look', beat: ZN, focus: 'qm', fill: 0.62, maxH: 700, sy: 800, st: 'corner-left', pose: 'point', dur: 0.5 },
    { at: '@First', beat: SB, focus: 'plates', move: 'whip', sx: 540, sy: 840, fill: 0.84, maxH: 800, st: 'corner-left', pose: 'point' },
    { at: '@Ferrari', beat: ZN, focus: 'plates.car', fill: 0.42, maxH: 400, sy: 990, st: 'corner-left', pose: 'point', dur: 0.5 },
    { at: '@diplomatic', beat: ZN, focus: 'plates.plate', fill: 0.4, maxH: 440, sy: 990, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@Now', beat: GH, focus: 'plates', sy: 840, fill: 0.84, maxH: 800, st: 'corner-left', pose: 'talk', dur: 0.7 },
    { at: '@Then#2', beat: SB, focus: 'guards', move: 'whip', sx: 540, sy: 840, fill: 0.84, maxH: 800, st: 'corner-left', pose: 'point' },
    { at: '@bodyguards', beat: ZN, focus: 'guards', fill: 0.84, maxH: 640, sy: 900, st: 'corner-left', pose: 'point', dur: 0.5 },
    { at: '@badges', beat: ZN, focus: 'guards.badges', fill: 0.8, maxH: 480, sy: 960, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@real', beat: GH, focus: 'guards', sy: 840, fill: 0.84, maxH: 800, st: 'corner', pose: 'talk', dur: 0.7 },
    // legit + investors
    { at: '@Now#2', beat: SB, focus: ['vinv', 'def'], move: 'whip', sx: 540, sy: 860, fill: 0.86, maxH: 860, st: 'left', pose: 'point' },
    { at: '@legit', beat: ZN, focus: 'def', fill: 0.62, maxH: 400, sy: 900, st: 'corner-left', pose: 'shock', dur: 0.45 },
    { at: '@investors', beat: ZN, focus: 'vinv.face', fill: 0.62, maxH: 520, sy: 920, st: 'corner', pose: 'point', dur: 0.5 },
    { at: '@trusted', beat: GH, focus: ['vinv', 'def'], sy: 860, fill: 0.86, maxH: 860, st: 'corner-left', pose: 'talk', dur: 0.7 },
    { at: '@Send', beat: PF, focus: ['vinv', 'def'], sy: 790, pose: 'shrug' },
    // $8M
    { at: '@lost', beat: SB, focus: 'taken', move: 'whip', sx: 540, sy: 800, fill: 0.9, maxH: 900, st: 'corner-left', pose: 'point' },
    { at: '@8', beat: ZN, focus: 'taken.value', fill: 0.9, maxH: 560, sy: 780, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@bucks', beat: GH, focus: 'taken', sy: 800, fill: 0.9, maxH: 900, st: 'corner-left', pose: 'shock', dur: 0.8 },
    // $1,000 a day
    { at: '@Spend', beat: SB, focus: 'cal', move: 'whip', sx: 540, sy: 860, fill: 0.72, maxH: 850, st: 'left', pose: 'point' },
    { at: '@grand', beat: ZN, focus: 'cal.head', fill: 0.8, maxH: 300, sy: 600, st: 'corner', pose: 'point', dur: 0.45 },
    { at: '@every', beat: GH, focus: 'cal', sy: 860, fill: 0.72, maxH: 850, st: 'corner-left', dur: 0.7 },
    { at: '@22', beat: ZN, focus: 'cal.years', fill: 0.8, maxH: 420, sy: 850, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@years#2+0.25', beat: GH, focus: 'cal', sy: 860, fill: 0.72, maxH: 850, st: 'corner-left', pose: 'idle', dur: 0.8 },
    // costume: fake
    { at: '@But#3', beat: SB, focus: ['cos', 'tplate', 'tbadge'], move: 'whip', sx: 540, sy: 860, fill: 0.84, maxH: 880, st: 'corner', pose: 'point' },
    { at: '@plates#3', beat: ZN, focus: 'tplate', fill: 0.34, maxH: 520, sy: 930, st: 'corner', pose: 'point', dur: 0.45 },
    { at: '@badges#2', beat: ZN, focus: 'tbadge', fill: 0.34, maxH: 520, sy: 930, st: 'corner-left', pose: 'shock', dur: 0.45 },
    { at: '@badges#2+0.7', beat: GH, focus: ['cos', 'tplate', 'tbadge'], sy: 860, fill: 0.8, maxH: 880, st: 'corner', pose: 'idle', dur: 0.8 },
    // eleven
    { at: '@gets', beat: PK, focus: 'board', move: 'whip', sy: 800, fill: 0.9, maxH: 860, pose: 'chin' },
    { at: '@Prosecutors', beat: GH, focus: 'board', sy: 800, fill: 0.9, maxH: 860, st: 'corner-left', pose: 'point', dur: 0.7 },
    { at: '@11', beat: ZN, focus: 'board.n11', fill: 0.62, maxH: 520, sy: 880, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@royalty', beat: PB, focus: 'board', fill: 0.86, maxH: 860, sy: 800, st: 'corner-left', dur: 0.6 },
    // that dinner
    { at: '@Then#3', beat: SB, focus: ['susd', 'spike3', 'diner'], move: 'whip', sx: 540, sy: 860, fill: 0.94, maxH: 1000, st: 'corner', pose: 'shock' },
    { at: '@victim', beat: ZN, focus: 'diner', fill: 0.62, maxH: 640, sy: 900, st: 'corner-left', pose: 'shock', dur: 0.45 },
    { at: '@order#2', beat: ZN, focus: 'spike3', fill: 0.6, maxH: 640, sy: 800, st: 'corner-left', pose: 'shock', dur: 0.4 },
    { at: '@suspicious#2', beat: SB, focus: ['susd', 'spike3', 'diner'], sx: 540, sy: 860, fill: 0.94, maxH: 1000, st: 'corner', pose: 'shock', dur: 0.7 },
    { at: '@Follow', beat: PF, focus: ['susd', 'spike3', 'diner'], sy: 840, pose: 'talk' },
    { at: '@how#2', beat: PK, focus: ['susd', 'spike3', 'diner'], sy: 880, fill: 0.9, maxH: 1000, pose: 'idle', dur: 0.8 },
    // verdict (payoff)
    { at: '@Then#4', beat: SB, focus: ['sv', 'vc'], move: 'whip', sx: 540, sy: 880, fill: 0.9, maxH: 920, st: 'corner', pose: 'shock' },
    { at: '@pleaded', beat: GH, focus: ['sv', 'vc'], sy: 880, fill: 0.9, maxH: 920, st: 'corner', pose: 'point', dur: 0.6 },
    { at: '@guilty', beat: ZN, focus: 'sv', fill: 0.8, maxH: 780, sy: 800, st: 'corner', pose: 'shock', dur: 0.45 },
    { at: '@18', beat: ZN, focus: 'vc.value', fill: 0.62, maxH: 560, sy: 900, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@prison', beat: GH, focus: ['sv', 'vc'], sy: 880, fill: 0.9, maxH: 920, st: 'corner', pose: 'idle', dur: 0.8 },
    // newborn -> graduate
    { at: "@That's", beat: SB, focus: 'rul', move: 'whip', sx: 540, sy: 860, fill: 0.84, maxH: 760, st: 'left', pose: 'point' },
    { at: '@growing', beat: ZN, focus: 'rul.num', fill: 0.7, maxH: 420, sy: 760, st: 'corner', pose: 'point', dur: 0.5 },
    { at: '@high', beat: GH, focus: 'rul', sy: 860, fill: 0.84, maxH: 760, st: 'corner-left', pose: 'shock', dur: 0.7 },
    // finale + loop
    { at: '@30#3', beat: SB, focus: ['fin', 'tip'], move: 'whip', sx: 540, sy: 880, fill: 0.78, maxH: 1000, st: 'corner-left', pose: 'idle' },
    { at: '@tipped', beat: ZN, focus: 'tip', fill: 0.6, maxH: 420, sy: 900, st: 'corner-left', pose: 'shock', dur: 0.4 },
    { at: '@Would', beat: PF, focus: ['fin', 'tip'], sy: 880, pose: 'talk' },
    { at: '@noticed', beat: SB, focus: ['hook2', 'sus0', 'spike2'], move: 'whip', ...F0, pose: 'shock' },
  ],
  poses: [['@Follow-0.1', 'follow', { target: [830, 1010] }], ['@Follow+1.5', 'talk']],
  shakes: [[0.05, 14], ['@8+1.3', 10], ['@fake', 8], ['@11', 14], ['@guilty', 12], ['@18', 20], ['@order#2', 14], ['@tipped', 12]],
  captions: {
    emph: { '8': 'bad', million: 'bad', fake: 'bad', '11': 'bad', '18': 'bad', pork: 'bad', '30': 'accent', '22': 'accent', royalty: 'accent', dumber: 'bad', dumbass: 'bad', 'dumbest': 'bad' },
    fix: [['than 8 million', 'than $8 million']],
    gap: 16,
  },
  bed: { name: 'tense_bed_2', gain: -1 },
  sfx: [
    { at: 0.05, name: 'camera_shutter_1', gain: -8, dur: 0.4 }, { at: '@made', name: 'camera_shutter_2', gain: -9, dur: 0.4 }, { at: "@He's", name: 'camera_shutter_1', gain: -8, dur: 0.4 }, { at: '@First', name: 'typewriter_2', gain: -12, dur: 0.8 }, { at: '@But#3', name: 'camera_shutter_2', gain: -9, dur: 0.4 }, { at: '@gets-0.2', name: 'camera_shutter_1', gain: -8, dur: 0.4 }, { at: '@Then#4', name: 'camera_shutter_2', gain: -8, dur: 0.4 }, { at: '@sentenced', name: 'cell_door_1', gain: -6, dur: 0.9 }, { at: '@guilty', name: 'rubber_stamp_1', gain: -4, dur: 0.5 }, { at: '@Then#3-0.1', name: 'suspense_drone_1', gain: -14, dur: 3.0 }, { at: '@dinner#2-0.2', name: 'camera_shutter_1', gain: -9, dur: 0.4 }, { at: '@gets+0.3', name: 'paper_slam_1', gain: -12, dur: 0.4 }, { at: '@arrested', name: 'rubber_stamp_2', gain: -7, dur: 0.5 },
    { at: 0, name: 'deep_boom_2', gain: -3, dur: 0.5 }, { at: 0.06, name: 'rubber_stamp_2', gain: -6, dur: 0.5 }, { at: 0.16, name: 'paper_slam_2', gain: -8, dur: 0.5 },
    { at: '@pork', name: 'thud_1', gain: -9, dur: 0.4 },
    { at: '@But', name: 'swipe_2', gain: -11, dur: 0.4 }, { at: '@Saudi#2', name: 'pop_1', gain: -10, dur: 0.4 }, { at: '@Islam', name: 'pop_1', gain: -10, dur: 0.4 }, { at: '@So', name: 'click_1', gain: -9, dur: 0.3 },
    { at: '@damn', name: 'rubber_stamp_2', gain: -6, dur: 0.5 }, { at: '@suspicious', name: 'rubber_stamp_2', gain: -6, dur: 0.5 }, { at: '@but#2', name: 'rewind_2', gain: -11, dur: 0.7 },
    { at: "@He's", name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@zero', name: 'rubber_stamp_2', gain: -7, dur: 0.5 },
    { at: "@He's#2", name: 'swipe_2', gain: -11, dur: 0.4 }, { at: '@lies', name: 'pop_1', gain: -9, dur: 0.4 },
    { at: '@kept', name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@30', name: 'deep_boom_2', gain: -7, dur: 0.4 }, { at: "@can't", name: 'pop_2', gain: -10, dur: 0.4 },
    { at: '@tap', name: 'heartbeat_1', gain: -8, dur: 0.9 }, { at: '@So#2', name: 'pop_1', gain: -8, dur: 0.5 },
    { at: '@Ferrari+0.1', name: 'swoosh_2', gain: -10, dur: 0.9 }, { at: '@plates', name: 'ding_2', gain: -10, dur: 0.6 }, { at: '@diplomatic#2', name: 'click_2', gain: -8, dur: 0.3 }, { at: '@badges', name: 'ding_2', gain: -10, dur: 0.6 },
    { at: '@legit', name: 'money_counter_2', gain: -13, dur: 0.8 }, { at: '@investors', name: 'pop_2', gain: -10, dur: 0.4 },
    { at: '@Send', name: 'swoosh_2', gain: -9, dur: 1.0 },
    { at: '@lost+0.2', name: 'coins_drop_1', gain: -12, dur: 1.2 }, { at: '@8', name: 'money_counter_2', gain: -10, dur: 1.3 }, { at: '@8+1.3', name: 'cash_register_1', gain: -8, dur: 0.9 },
    { at: '@Spend+0.2', name: 'money_counter_2', gain: -13, dur: 1.2 }, { at: '@22', name: 'ding_2', gain: -9, dur: 0.7 },
    { at: '@But#3', name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@fake', name: 'rubber_stamp_2', gain: -5, dur: 0.5 }, { at: '@badges#2', name: 'rubber_stamp_2', gain: -5, dur: 0.5 },
    { at: '@gets', name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@arrested', name: 'typewriter_1', gain: -12, dur: 1.0 }, { at: '@11', name: 'deep_boom_2', gain: -6, dur: 0.4 }, { at: '@said', name: 'rubber_stamp_2', gain: -8, dur: 0.5 },
    { at: '@Then#3', name: 'swipe_2', gain: -11, dur: 0.4 }, { at: '@order#2', name: 'cinematic_hit_1', gain: -4, dur: 1.2 }, { at: '@victim', name: 'pop_1', gain: -8, dur: 0.5 }, { at: '@suspicious#2+0.2', name: 'thud_1', gain: -8, dur: 0.4 },
    { at: '@Follow+0.5', name: 'click_1', gain: -8, dur: 0.3 }, { at: '@Follow+0.58', name: 'success_chime_1', gain: -12, dur: 1.0 },
    { at: '@Then#4-0.9', name: 'riser_2', gain: -14, dur: 0.9 }, { at: '@guilty', name: 'gavel_1', gain: -4, dur: 0.8 }, { at: '@18', name: 'gavel_2', gain: -3, dur: 0.8 }, { at: '@18', name: 'cinematic_hit_1', gain: -3, dur: 1.2 }, { at: '@18', name: 'deep_boom_1', gain: -3, dur: 1.4 }, { at: '@18+0.7', name: 'cell_door_1', gain: -8, dur: 1.0 },
    { at: "@That's", name: 'swipe_2', gain: -11, dur: 0.4 }, { at: '@high+0.3', name: 'success_chime_1', gain: -14, dur: 1.0 },
    { at: '@30#3', name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@tipped', name: 'rubber_stamp_2', gain: -5, dur: 0.5 }, { at: '@tipped', name: 'deep_boom_2', gain: -8, dur: 0.5 },
    { at: '@Would', name: 'pop_1', gain: -9, dur: 0.5 }, { at: '@noticed', name: 'thud_1', gain: -8, dur: 0.4 }, { at: '@noticed', name: 'paper_slam_2', gain: -8, dur: 0.5 },
  ],
});
