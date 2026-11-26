// TikTok cut v3 (opens on the 11 arrests). World (px): row0 hook comp(0,0) who(1800,0) con(3600,0) pitch(5400,0) skyline(7200,0) · row1 plates(7200,1800) guards(5400,1800) investors(3600,1800) taken(1800,1800) calendar(0,1800)
// row2 costume(0,3600) span(1800,3600) tally2(3600,3600) verdict(5400,3600) ruler(7200,3600) cloche(9000,3600) why(10800,3600) pcard+diner(12600,3600)
const SB = 'side-by-side', GH = 'graphic-hero', ZN = 'zoom-on-number', PF = 'presenter-front', PK = 'peek', PB = 'pull-back';
const MUG = 'brand/photos/anthony-gignac/1.jpg';
const HOOK = { lines: [[['BUSTED ', 'paper'], ['11 TIMES', 'bad']], [['FOR THE SAME LIE', 'paper']], [['PROSECUTORS SAID', 'gold']]], sizes: [104, 76, 46] };
const MUGP = { src: MUG, name: '', credit: 'MIAMI-DADE COUNTY · PUBLIC DOMAIN', treatment: 'mugshot', w: 420, aspect: 1.0, fx: 0.74, fy: 0.4, tilt: 0.04 };
const F0 = { sx: 540, sy: 865, fill: 0.98, maxH: 920, st: { x: 915, y: 1395, s: 0.85 } };
BM2.scene({
  series: 'decoded', title: 'CASE FILE Nº 026 · FAKE PRINCE', duration: 85.63,
  footnote: ['PLEADED GUILTY 2018 · SENTENCED MAY 31, 2019 · SOURCES: DOJ S.D. FLORIDA, AP', 'ABOUT 30 YEARS = 1988 TO THE 2017 ARREST · ILLUSTRATIONS / PROPS (GENERIC)', 'PHOTO: MIAMI-DADE COUNTY BOOKING PHOTO · PUBLIC DOMAIN VIA WIKIMEDIA COMMONS'],
  elements: [
    // ---- S0 frame 0 (loop target) ----
    { id: 'hook', type: 'hook', at: [0, -430], in: 0, out: '@lie+0.05', props: HOOK },
    { id: 'hook2', type: 'hook', at: [0, -430], in: '@times#3-0.2', props: HOOK },
    { id: 'mug0', type: 'suspect', at: [0, 30], in: -0.12, props: { src: MUG, crop: [0.5, 0, 0.5, 1], fx: 0.5, fy: 0.42, aspect: 1.0, w: 460, name: 'ANTHONY GIGNAC', nick: '“THE FAKE PRINCE”', flash: false, tilt: 0.02, stamps: [{ text: 'ARRESTED', at: '@11', size: 66, x: 0, y: 40, rot: -0.1 }] } },
    { id: 'mug3', type: 'suspect', at: [0, 30], in: '@times#3-0.15', props: { src: MUG, crop: [0.5, 0, 0.5, 1], fx: 0.5, fy: 0.42, aspect: 1.0, w: 460, name: 'ANTHONY GIGNAC', nick: '“THE FAKE PRINCE”', flash: false, tilt: 0.02, stamps: [{ text: 'ARRESTED', at: '@times#3+0.2', size: 66, x: 0, y: 40, rot: -0.1 }] } },
    // ---- S1 who ----
    { id: 'mug2', type: 'suspect', at: [1700, 30], in: '@Okay-0.35', props: { src: MUG, crop: [0.5, 0, 0.5, 1], fx: 0.5, fy: 0.42, aspect: 1.0, variant: 'card', file: true, caseNo: 'CASE FILE Nº 026', w: 480, name: 'ANTHONY GIGNAC', nick: '“THE FAKE PRINCE”', credit: 'MIAMI-DADE COUNTY BOOKING PHOTO · PUBLIC DOMAIN', tilt: -0.03, push: { at: '@Okay', dur: 4.5, to: 1.55 }, stringTo: [660, 330], stringAt: '@rewind+0.4', ring: '@Anthony+0.2' } },
    { id: 'rw', type: 'text', at: [2400, 20], in: '@rewind-0.1', props: { lines: [[['REWIND', 'gold']], [['FLORIDA', 'paper']], [['CON MAN', 'bad']]], size: 96 } },
    // ---- S2 con man ----
    { id: 'con', type: 'defcard', at: [3600, 0], in: '@Now-0.2', props: { head: "WHAT'S A CON MAN?", term: 'CON MAN', d1: 'LIES SO YOU HAND OVER', d2: 'YOUR MONEY', icon: 'conman', defAt: '@lies', iconAt: '@hand' } },
    // ---- S3 his lie ----
    { id: 'quote', type: 'text', at: [5400, -420], in: '@Saudi-0.3', out: "@You'd-0.1", props: { lines: [[['HIS LIE:', 'gold']]], size: 64 } },
    { id: 'sus3', type: 'suspect', at: [5400, 40], in: '@His-0.3', props: { src: MUG, crop: [0.5, 0, 0.5, 1], fx: 0.5, fy: 0.42, aspect: 1.0, variant: 'side', w: 1000, pw: 430, aspect: 1.12, name: 'ANTHONY GIGNAC', nick: '“THE FAKE PRINCE”', quote: [['I\'M A', 'ink'], ['SAUDI', 'ink'], ['PRINCE', 'bad']], quoteAt: '@Saudi', quoteSize: 74, quoteSub: 'HIS LIE · NOT TRUE', push: { at: '@Saudi-0.3', dur: 2.6, to: 1.5 }, crownAt: '@prince', stamps: [{ text: 'NOT TRUE', at: '@prince+0.5', size: 60, x: -190, y: 150, rot: -0.12 }] } },
    // ---- S4 Miami ----
    { id: 'sky', type: 'skyline', at: [7200, 0], in: "@You'd-0.4", props: { lampAt: '@Miami' } },
    // ---- steps ----
    { id: 'plates', type: 'plates', at: [7200, 1800], in: '@Step-0.5', props: { rollAt: '@Ferrari+0.1', checkAt: '@plates', peelAt: 99999, fakeAt: 99999 } },
    { id: 'guards', type: 'guards', at: [5400, 1800], in: '@Step#2-0.5', props: { flipAt: '@diplomatic#2', checkAt: '@badges', fakeAt: 99999 } },
    { id: 'vinv', type: 'victim', at: [3330, 1800], in: '@So#2-0.3', props: { kind: 'investor', label: 'THE INVESTORS', sub: 'THE PEOPLE WHO LOST', reactAt: '@money#2+0.4' } },
    { id: 'def', type: 'text', at: [3950, 1790], in: '@trust-0.2', props: { lines: [[['LOOKS RICH', 'gold']], [['= TRUST', 'paper']], [['= THEIR MONEY', 'bad']]], size: 58 } },
    { id: 'taken', type: 'taken', at: [1800, 1800], in: '@ended-0.4', props: { at: '@eight', dur: 1.3, brickAt: '@ended' } },
    { id: 'cal', type: 'calendar', at: [0, 1800], in: '@Blow-0.4', props: { at: '@Blow+0.2', dur: 1.7, yrsAt: '@22', yrsDur: 0.9, to: 22 } },
    // ---- costume ----
    { id: 'cos', type: 'suspect', at: [-250, 3600], in: '@But#2-0.3', props: { src: MUG, crop: [0.5, 0, 0.5, 1], fx: 0.5, fy: 0.42, aspect: 1.0, w: 470, name: 'ANTHONY GIGNAC', nick: '“THE FAKE PRINCE”', tilt: -0.02, crownAt: '@But#2-0.1', stamps: [{ text: 'FAKE PLATES', at: '@plates#3', size: 54, x: 0, y: -60, rot: -0.12 }, { text: 'FAKE BADGES', at: '@badges#2', size: 54, x: 0, y: 80, rot: 0.1 }] } },
    { id: 'tplate', type: 'tile', at: [200, 3470], in: '@But#2', props: { icon: 'plate', caption: 'CAR PLATE', stamp: 'FAKE', stampAt: '@plates#3', tilt: 0.05 } },
    { id: 'tbadge', type: 'tile', at: [200, 3790], in: '@But#2+0.2', props: { icon: 'badge', caption: 'BADGE', stamp: 'FAKE', stampAt: '@badges#2', tilt: -0.04 } },
    // ---- 30 years / cakes ----
    { id: 'span', type: 'span', at: [1800, 3600], in: '@kept-0.5', props: { head: 'HE KEPT IT GOING', at: '@kept', dur: 1.6, cakesAt: '@Yeah+0.2' } },
    // ---- recount, verdict, 18 years ----
    { id: 'board', type: 'board', at: [3600, 3600], in: '@Remember-0.4', props: { title: 'EVIDENCE BOARD', caseNo: 'CASE FILE Nº 026', tightAt: '@royalty', items: [
      { id: 'ph', k: 'photo', src: MUG, crop: [0.5, 0, 0.5, 1], fx: 0.5, fy: 0.42, x: 0, y: -280, w: 330, h: 400, name: 'ANTHONY GIGNAC', nameSize: 26, at: '@Remember-0.2', rot: -0.02, push: 0.3 },
      { id: 'pl', k: 'note', x: -300, y: 120, w: 270, h: 290, icon: 'plate', size: 34, lines: [['FAKE PLATES', 'bad']], at: '@Remember+0.3', rot: -0.05 },
      { id: 'bg', k: 'note', x: 0, y: 150, w: 270, h: 290, icon: 'badge', size: 34, lines: [['FAKE BADGES', 'bad']], at: '@Remember+0.6', rot: 0.03 },
      { id: 'ca', k: 'note', x: 300, y: 120, w: 270, h: 290, icon: 'cash', size: 34, lines: [['$8M+ LOST', 'bad']], at: '@Remember+0.9', rot: 0.05 },
      { id: 'n11', k: 'note', x: 0, y: 440, w: 640, h: 270, size: 150, lines: [['11×', 'bad', 150]], at: '@arrested-0.1', rot: -0.02, stamp: { text: 'PROSECUTORS SAID', at: '@said', y: 82, size: 30, rot: -0.04 } } ],
      strings: [[0, 1, '@Remember+0.5'], [0, 2, '@Remember+0.8'], [0, 3, '@Remember+1.1'], [0, 4, '@arrested+0.2'], [1, 4, '@royalty-0.2'], [2, 4, '@royalty-0.1'], [3, 4, '@royalty']] } },
    { id: 'sv', type: 'suspect', at: [5080, 3600], in: '@pleaded-0.4', props: { src: MUG, crop: [0.5, 0, 0.5, 1], fx: 0.5, fy: 0.42, aspect: 1.0, w: 470, name: 'ANTHONY GIGNAC', nick: '“THE FAKE PRINCE”', tilt: -0.02, mono: true, push: { at: '@pleaded', dur: 3.2, to: 1.4 }, stamps: [{ text: 'GUILTY', at: '@guilty', size: 74, x: 0, y: -30, rot: -0.1 }], bars: '@sentenced' } },
    { id: 'vc', type: 'counter', at: [5780, 3560], in: '@pleaded-0.3', props: { to: 18, at: '@18', dur: 0.7, suffix: '+', size: 170, tone: 'bad', label: 'YEARS IN PRISON', sub: 'MAY 31, 2019', w: 460 } },
    { id: 'rul', type: 'ruler18', at: [7200, 3600], in: "@That's-0.4", props: { at: '@baby', dur: 2.0, toy: 'bottle' } },
    // ---- the slip ----
    { id: 'cloche2', type: 'cloche', at: [9000, 3640], in: '@So#4-0.4', props: { liftAt: '@ordered+0.2', closeAt: 99999 } },
    { id: 'sus15', type: 'suspect', at: [8500, 3700], in: '@So#4-0.4', props: { src: MUG, crop: [0.5, 0, 0.5, 1], fx: 0.5, fy: 0.42, aspect: 1.0, w: 330, name: 'THE PRINCE', tilt: -0.03, crownAt: '@So#4-0.3', ring: '@pork+0.3', nameSize: 38 } },
    { id: 'why', type: 'whycard', at: [10800, 3600], in: '@Problem-0.4', props: { head: 'THE PROBLEM', a1: '@Saudi#2', a2: '@Islam', a3: '@So#6', r3: ['SO HIS CHARACTER', 'WOULD NEVER TOUCH IT'] } },
    { id: 'sus17', type: 'suspect', at: [12450, 3600], in: '@victim-0.55', props: { src: MUG, crop: [0.5, 0, 0.5, 1], fx: 0.5, fy: 0.42, aspect: 1.0, w: 400, name: 'ANTHONY GIGNAC', nick: '“THE FAKE PRINCE”', tilt: -0.03, crownAt: 0, crownOff: '@suspicious', stamps: [{ text: 'OUT OF CHARACTER', at: '@victim-0.1', size: 40, x: 0, y: 40, rot: -0.1 }], stringTo: [700, 90], stringAt: '@victim' } },
    { id: 'diner', type: 'victim', at: [13200, 3640], in: '@victim-0.5', props: { kind: 'diner', label: 'THE VICTIM', sub: 'AT THE DINNER', reactAt: '@suspicious', w: 380, h: 480, tape: 'WITNESS' } },
    // ---- screen overlays ----
    { id: 'rwt', type: 'text', layer: 'screen', at: [540, 440], in: '@rewind', out: '@Anthony-0.1', props: { lines: [[['OKAY, REWIND', 'gold']]], size: 78 } },
    { id: 'nobuy', type: 'text', layer: 'screen', at: [540, 440], in: "@You'd", out: '@look-0.1', props: { lines: [[['NOBODY BUYS THAT…', 'paper']], [['RIGHT?', 'gold']]], size: 74 } },
    { id: 'miami', type: 'text', layer: 'screen', at: [540, 440], in: '@look', out: '@Step-0.15', props: { lines: [[['LOOK WHAT', 'paper']], [['MIAMI SAW', 'gold']]], size: 74 } },
    { id: 'stepA', type: 'text', layer: 'screen', at: [540, 440], in: '@Step', out: '@Step#2-0.15', props: { lines: [[['STEP 1 · THE PLATES', 'gold']], [['FOREIGN OFFICIALS GET THESE', 'paper']]], size: 46 } },
    { id: 'stepB', type: 'text', layer: 'screen', at: [540, 440], in: '@Step#2', out: '@Tap-0.15', props: { lines: [[['STEP 2 · THE BADGES', 'gold']], [['LIKE REAL GOVERNMENT AGENTS', 'paper']]], size: 46 } },
    { id: 'pip1', type: 'suspect', layer: 'screen', at: [880, 1130], in: '@Step-0.3', out: '@Tap-0.25', props: { src: MUG, crop: [0.5, 0, 0.5, 1], fx: 0.5, fy: 0.42, aspect: 1.0, variant: 'pip', w: 200, label: 'HIS TRICK', tilt: 0.03, arrow: { at: '@Step+0.2', to: [-400, -330] } } },
    { id: 'dc1', type: 'datecard', layer: 'screen', at: [340, 480], in: '@Anthony-0.1', out: '@Anthony+1.4', props: { kicker: 'CASE FILE Nº 026 · THE PITCH', big: 'FLORIDA', small: 'THE ACT: 1988 → 2017' } },
    { id: 'dc3', type: 'datecard', layer: 'screen', at: [340, 480], in: '@Remember-0.15', out: '@Remember+1.1', props: { kicker: 'CHAPTER 3', big: 'THE FALLOUT', small: 'MONEY · ARRESTS' } },
    { id: 'dc4', type: 'datecard', layer: 'screen', at: [340, 480], in: '@pleaded-0.1', out: '@guilty+0.1', props: { kicker: 'S.D. FLORIDA · FEDERAL COURT', big: 'THE VERDICT', small: 'PER DOJ' } },
    { id: 'bought', type: 'text', layer: 'screen', at: [540, 440], in: "@you'd#2", out: '@So#2-0.2', props: { lines: [[["YOU'D HAVE ", 'paper'], ['BOUGHT IT', 'gold']]], size: 66 } },
    { id: 'heart', type: 'heart', layer: 'screen', at: [800, 930], in: '@heart-0.05', out: '@heart+1.15', props: { s: 1 } },
    { id: 'plane', type: 'plane', layer: 'screen', at: [540, 960], in: '@Send-0.05', out: '@Send+1.2', props: { dur: 0.9, from: [-230, 250], to: [280, -330], s: 1.5 } },
    { id: 'sendtx', type: 'text', layer: 'screen', at: [820, 440], in: '@Send+0.15', out: '@Send+1.2', props: { lines: [[['SEND', 'gold']]], size: 70 } },
    { id: 'slipq', type: 'text', layer: 'screen', at: [540, 440], in: '@So#4', out: '@Follow-0.1', props: { lines: [[['SO HOW DID HE', 'paper']], [['FINALLY SLIP UP?', 'gold']]], size: 74 } },
    { id: 'mag', type: 'mag', layer: 'screen', at: [830, 1010], in: '@Follow-0.05', out: '@Follow+1.45', props: { press: 0.5 } },
    { id: 'btn', type: 'follow', layer: 'screen', at: [830, 1010], scale: 0.8, in: '@Follow-0.05', out: '@Follow+1.45', props: { press: 0.5 } },
    { id: 'dumbtx', type: 'text', layer: 'screen', at: [540, 440], in: "@answer's-0.1", out: '@At-0.05', props: { lines: [[['THE ANSWER IS', 'paper']], [['SO DUMB…', 'bad']]], size: 84 } },
    { id: 'ask', type: 'bubble', layer: 'screen', at: [600, 1090], in: '@dumber', out: '@times#3-0.3', props: { l1: "WHAT'S DUMBER?", l2: 'PORK OR 11 TIMES?', size: 46, tail: 'left' } },
    { id: 'hud', type: 'hud', layer: 'screen', at: [0, 0], in: -1, props: {
      labels: [{ at: -1, text: 'THE PITCH' }, { at: '@Step-0.25', text: 'THE TRICK' }, { at: '@So#2-0.2', text: 'THE MONEY' }, { at: '@kept-0.25', text: 'THE FALLOUT' }, { at: '@pleaded-0.1', text: 'THE SENTENCE' }, { at: '@So#4-0.2', text: 'THE CATCH' }],
      items: [{ at: 0, label: 'ARRESTED OR CONVICTED', from: 0, to: 11, dur: 0.9, suffix: '×' }, { at: '@Okay', label: 'ROYAL BLOOD', to: 0, dur: 0.5 }, { at: '@Step', label: 'PROPS SO FAR', to: 1, dur: 0.4 }, { at: '@Step#2', label: 'PROPS SO FAR', to: 2, dur: 0.4 },
        { at: '@ended', label: 'INVESTORS LOST (MORE THAN)', from: 0, to: 8000000, dur: 1.5, prefix: '$' }, { at: '@Blow+0.2', label: 'DAYS AT $1,000', from: 0, to: 8000, dur: 1.9, suffix: ' DAYS' }, { at: '@22', label: 'THAT IS', to: 22, dur: 0.8, suffix: ' YEARS' },
        { at: '@fake', label: 'PROPS THAT WERE REAL', to: 0, dur: 0.5 }, { at: '@kept', label: 'YEARS OF THE ACT', from: 0, to: 30, dur: 1.7, prefix: '~' }, { at: '@arrested', label: 'ARRESTED OR CONVICTED', from: 0, to: 11, dur: 1.0, suffix: '×' }, { at: '@18', label: 'YEARS IN PRISON', from: 0, to: 18, dur: 0.7, suffix: '+' },
        { at: '@pork', label: 'DINNER ORDERS THAT BLEW IT', to: 1, dur: 0.4 }, { at: '@times#3-0.2', label: 'ARRESTED OR CONVICTED', to: 11, dur: 0.5, suffix: '×' }] } },
  ],
  beats: [
    { at: 0, beat: SB, focus: ['hook', 'mug0'], ...F0, pose: 'shock' },
    { at: '@11', beat: ZN, focus: ['hook', 'mug0'], sx: 540, sy: 930, fill: 1.06, maxH: 960, st: F0.st, dur: 0.45 },
    { at: '@same', beat: SB, focus: ['hook', 'mug0'], ...F0, pose: 'shock', dur: 0.6 },
    // rewind: who
    { at: '@Okay', beat: SB, focus: ['mug2', 'rw'], move: 'whip', sx: 540, sy: 950, fill: 0.9, maxH: 900, st: 'corner', pose: 'shrug' },
    { at: '@Anthony', beat: ZN, focus: 'mug2', fill: 0.62, maxH: 680, sy: 960, st: 'corner', pose: 'point', dur: 0.45 },
    // con man
    { at: '@Now', beat: SB, focus: 'con', move: 'whip', sx: 540, sy: 880, fill: 0.74, maxH: 880, st: 'left', pose: 'point' },
    { at: '@con#2', beat: ZN, focus: 'con.term', fill: 0.8, maxH: 300, sy: 680, st: 'corner-left', pose: 'point', dur: 0.45 },
    { at: '@lies', beat: GH, focus: 'con', sy: 880, fill: 0.78, maxH: 880, st: 'corner-left', pose: 'talk', dur: 0.7 },
    { at: '@hand', beat: ZN, focus: 'con.icon', fill: 0.78, maxH: 380, sy: 840, st: 'corner', pose: 'point', dur: 0.5 },
    { at: '@money', beat: GH, focus: 'con', fill: 0.78, maxH: 880, sy: 880, st: 'peek', pose: 'chin', dur: 0.8 },
    // his lie
    { at: '@His', beat: SB, focus: 'sus3', move: 'whip', sx: 540, sy: 880, fill: 0.86, maxH: 780, st: { x: 905, y: 1385, s: 0.9 }, pose: 'shock' },
    { at: '@Saudi', beat: ZN, focus: 'sus3', fill: 0.86, maxH: 780, sy: 880, st: 'corner', pose: 'point', dur: 0.45 },
    { at: '@prince', beat: GH, focus: 'sus3', sy: 880, fill: 0.86, maxH: 780, st: 'corner', pose: 'idle', dur: 0.7 },
    // miami
    { at: "@You'd", beat: SB, focus: 'sky', move: 'whip', sx: 540, sy: 880, fill: 0.78, maxH: 800, st: 'left', pose: 'shrug' },
    { at: '@look', beat: ZN, focus: 'sky.cover', fill: 0.5, maxH: 420, sy: 930, st: 'corner-left', pose: 'point', dur: 0.5 },
    { at: '@Miami', beat: GH, focus: 'sky', sy: 880, fill: 0.8, maxH: 800, st: 'corner-left', pose: 'shock', dur: 0.7 },
    // step 1
    { at: '@Step', beat: SB, focus: 'plates', move: 'whip', sx: 540, sy: 840, fill: 0.84, maxH: 800, st: 'corner-left', pose: 'point' },
    { at: '@Ferrari', beat: ZN, focus: 'plates.car', fill: 0.42, maxH: 400, sy: 990, st: 'corner-left', pose: 'point', dur: 0.5 },
    { at: '@diplomatic', beat: ZN, focus: 'plates.plate', fill: 0.4, maxH: 440, sy: 990, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@special', beat: GH, focus: 'plates', sy: 840, fill: 0.84, maxH: 800, st: 'corner-left', pose: 'talk', dur: 0.7 },
    // step 2
    { at: '@Step#2', beat: SB, focus: 'guards', move: 'whip', sx: 540, sy: 840, fill: 0.84, maxH: 800, st: 'corner-left', pose: 'point' },
    { at: '@bodyguards', beat: ZN, focus: 'guards', fill: 0.84, maxH: 640, sy: 900, st: 'corner-left', pose: 'point', dur: 0.5 },
    { at: '@badges', beat: ZN, focus: 'guards.badges', fill: 0.8, maxH: 480, sy: 960, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@actual', beat: GH, focus: 'guards', sy: 840, fill: 0.84, maxH: 800, st: 'corner', pose: 'talk', dur: 0.7 },
    { at: '@Tap', beat: PF, focus: 'guards', sy: 790, pose: 'shrug' },
    // step 3 investors trust
    { at: '@So#2', beat: SB, focus: ['vinv', 'def'], move: 'whip', sx: 540, sy: 860, fill: 0.86, maxH: 860, st: 'left', pose: 'point' },
    { at: '@investors', beat: ZN, focus: 'vinv.face', fill: 0.62, maxH: 520, sy: 920, st: 'corner', pose: 'point', dur: 0.5 },
    { at: '@trust', beat: ZN, focus: 'def', fill: 0.62, maxH: 400, sy: 900, st: 'corner-left', pose: 'point', dur: 0.45 },
    { at: '@money#2', beat: GH, focus: ['vinv', 'def'], sy: 860, fill: 0.86, maxH: 860, st: 'corner-left', pose: 'talk', dur: 0.7 },
    // $8M
    { at: '@ended', beat: SB, focus: 'taken', move: 'whip', sx: 540, sy: 800, fill: 0.9, maxH: 900, st: 'corner-left', pose: 'point' },
    { at: '@eight', beat: ZN, focus: 'taken.value', fill: 0.9, maxH: 560, sy: 780, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@bucks', beat: GH, focus: 'taken', sy: 800, fill: 0.9, maxH: 900, st: 'corner-left', pose: 'shock', dur: 0.8 },
    // $1,000 a day
    { at: '@Blow', beat: SB, focus: 'cal', move: 'whip', sx: 540, sy: 860, fill: 0.72, maxH: 850, st: 'left', pose: 'point' },
    { at: '@grand', beat: ZN, focus: 'cal.head', fill: 0.8, maxH: 300, sy: 600, st: 'corner', pose: 'point', dur: 0.45 },
    { at: '@every', beat: GH, focus: 'cal', sy: 860, fill: 0.72, maxH: 850, st: 'corner-left', dur: 0.7 },
    { at: '@22', beat: ZN, focus: 'cal.years', fill: 0.8, maxH: 420, sy: 850, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@years+0.25', beat: GH, focus: 'cal', sy: 860, fill: 0.72, maxH: 850, st: 'corner-left', pose: 'idle', dur: 0.8 },
    // costume: fake
    { at: '@But#2', beat: SB, focus: ['cos', 'tplate', 'tbadge'], move: 'whip', sx: 540, sy: 860, fill: 0.84, maxH: 880, st: 'corner', pose: 'point' },
    { at: '@plates#3', beat: ZN, focus: 'tplate', fill: 0.34, maxH: 520, sy: 930, st: 'corner', pose: 'point', dur: 0.45 },
    { at: '@badges#2', beat: ZN, focus: 'tbadge', fill: 0.34, maxH: 520, sy: 930, st: 'corner-left', pose: 'shock', dur: 0.45 },
    { at: '@badges#2+0.7', beat: GH, focus: ['cos', 'tplate', 'tbadge'], sy: 860, fill: 0.8, maxH: 880, st: 'corner', pose: 'idle', dur: 0.8 },
    { at: '@Send', beat: PF, focus: ['cos', 'tplate', 'tbadge'], sy: 790, pose: 'talk' },
    { at: '@trusts', beat: PF, focus: ['cos', 'tplate', 'tbadge'], sy: 790, zoom: 1.06, pose: 'shrug', dur: 0.5 },
    // thirty years + cakes
    { at: '@kept', beat: SB, focus: 'span', move: 'whip', sx: 540, sy: 860, fill: 0.84, maxH: 760, st: 'left', pose: 'point' },
    { at: '@30', beat: ZN, focus: 'span.num', fill: 0.8, maxH: 420, sy: 800, st: 'corner', pose: 'shock', dur: 0.5 },
    { at: '@years#2+0.3', beat: GH, focus: 'span', sy: 860, fill: 0.84, maxH: 760, st: 'corner-left', pose: 'idle', dur: 0.8 },
    { at: '@Yeah', beat: GH, focus: 'span', sy: 860, fill: 0.84, maxH: 760, st: 'corner-left', pose: 'you', dur: 0.6 },
    { at: '@alive-0.3', beat: ZN, focus: 'span.strip', fill: 0.9, maxH: 420, sy: 900, st: 'corner', pose: 'shrug', dur: 0.5 },
    // recount 11
    { at: '@Remember', beat: PK, focus: 'board', move: 'whip', sy: 800, fill: 0.9, maxH: 860, pose: 'chin' },
    { at: '@arrested', beat: GH, focus: 'board', sy: 800, fill: 0.9, maxH: 860, st: 'corner-left', pose: 'point', dur: 0.7 },
    { at: '@11#2', beat: ZN, focus: 'board.n11', fill: 0.62, maxH: 520, sy: 880, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@royalty', beat: PB, focus: 'board', fill: 0.86, maxH: 860, sy: 800, st: 'corner-left', dur: 0.6 },
    // verdict
    { at: '@pleaded', beat: SB, focus: ['sv', 'vc'], move: 'whip', sx: 540, sy: 880, fill: 0.9, maxH: 920, st: 'corner', pose: 'shock' },
    { at: '@guilty', beat: ZN, focus: 'sv', fill: 0.8, maxH: 780, sy: 800, st: 'corner', pose: 'shock', dur: 0.45 },
    { at: '@18', beat: ZN, focus: 'vc.value', fill: 0.62, maxH: 560, sy: 900, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@prison', beat: GH, focus: ['sv', 'vc'], sy: 880, fill: 0.9, maxH: 920, st: 'corner', pose: 'idle', dur: 0.8 },
    // baby -> graduation
    { at: "@That's", beat: SB, focus: 'rul', move: 'whip', sx: 540, sy: 860, fill: 0.84, maxH: 760, st: 'left', pose: 'point' },
    { at: '@growing', beat: ZN, focus: 'rul.num', fill: 0.7, maxH: 420, sy: 760, st: 'corner', pose: 'point', dur: 0.5 },
    { at: '@graduation', beat: GH, focus: 'rul', sy: 860, fill: 0.84, maxH: 760, st: 'corner-left', pose: 'shock', dur: 0.7 },
    // the slip
    { at: '@So#4', beat: SB, focus: ['cloche2', 'sus15'], move: 'whip', sx: 540, sy: 850, fill: 0.8, maxH: 760, st: 'corner', pose: 'chin' },
    { at: '@finally', beat: GH, focus: ['cloche2', 'sus15'], sy: 850, fill: 0.84, maxH: 760, st: 'corner', pose: 'point', dur: 0.8 },
    { at: '@Follow', beat: PF, focus: ['cloche2', 'sus15'], sy: 820, pose: 'talk' },
    { at: "@answer's", beat: GH, focus: ['cloche2', 'sus15'], sy: 860, fill: 0.84, maxH: 760, st: 'peek', pose: 'idle', dur: 0.8 },
    { at: '@At', beat: GH, focus: ['cloche2', 'sus15'], fill: 0.88, maxH: 760, sy: 840, st: 'corner', pose: 'idle', dur: 1.0 },
    { at: '@pork', beat: ZN, focus: 'cloche2.ticket', fill: 0.78, maxH: 600, sy: 900, st: 'corner-left', pose: 'shock', dur: 0.45 },
    // why
    { at: '@Problem', beat: SB, focus: 'why', move: 'whip', sx: 540, sy: 880, fill: 0.9, maxH: 940, st: 'left', pose: 'point' },
    { at: '@Saudi#2', beat: ZN, focus: 'why.r1', fill: 0.84, maxH: 320, sy: 780, st: 'corner-left', pose: 'point', dur: 0.45 },
    { at: '@Islam', beat: ZN, focus: 'why.r2', fill: 0.84, maxH: 320, sy: 800, st: 'corner-left', pose: 'point', dur: 0.45 },
    { at: '@forbids', beat: GH, focus: 'why', sy: 880, fill: 0.9, maxH: 940, st: 'corner-left', pose: 'talk', dur: 0.7 },
    { at: '@So#6', beat: ZN, focus: 'why.r3', fill: 0.7, maxH: 320, sy: 1000, st: 'corner-left', pose: 'point', dur: 0.45 },
    // victim
    { at: '@victim-0.15', beat: SB, focus: ['sus17', 'diner'], move: 'whip', sx: 540, sy: 860, fill: 0.92, maxH: 920, st: 'corner', pose: 'shock' },
    { at: '@suspicious', beat: ZN, focus: 'sus17', fill: 0.62, maxH: 520, sy: 800, st: 'corner', pose: 'shock', dur: 0.45 },
    { at: "@what's", beat: PF, focus: ['sus17', 'diner'], sy: 860, pose: 'talk' },
    { at: '@times#3-0.1', beat: SB, focus: ['hook2', 'mug3'], move: 'whip', ...F0, pose: 'shock' },
  ],
  poses: [['@Follow-0.1', 'follow', { target: [830, 1010] }], ['@Follow+1.5', 'talk']],
  shakes: [[0.05, 14], ['@eight+1.3', 10], ['@fake', 8], ['@11#2', 14], ['@guilty', 14], ['@18', 12], ['@pork', 26], ['@suspicious', 10]],
  captions: {
    emph: { '8': 'bad', million: 'bad', fake: 'bad', '11': 'bad', '18': 'bad', pork: 'bad', '30': 'accent', '22': 'accent', royalty: 'accent', dumber: 'bad', dumb: 'bad', 'dumbest': 'bad' },
    fix: [['than eight million', 'than $8 million']],
    gap: 16,
  },
  bed: { name: 'tense_bed_2', gain: -1 },
  sfx: [
    { at: 0.05, name: 'camera_shutter_1', gain: -12, dur: 0.4 }, { at: '@Okay', name: 'camera_shutter_2', gain: -12, dur: 0.4 }, { at: '@His', name: 'camera_shutter_1', gain: -12, dur: 0.4 }, { at: '@Step', name: 'typewriter_2', gain: -12, dur: 0.8 }, { at: '@But#2', name: 'camera_shutter_2', gain: -12, dur: 0.4 }, { at: '@Remember-0.2', name: 'camera_shutter_1', gain: -12, dur: 0.4 }, { at: '@pleaded', name: 'camera_shutter_2', gain: -12, dur: 0.4 }, { at: '@sentenced', name: 'cell_door_1', gain: -10, dur: 0.9 }, { at: '@guilty', name: 'rubber_stamp_1', gain: -10, dur: 0.5 }, { at: '@So#4-0.1', name: 'suspense_drone_1', gain: -14, dur: 3.0 }, { at: '@victim-0.5', name: 'camera_shutter_1', gain: -12, dur: 0.4 }, { at: '@Remember+0.3', name: 'paper_slam_1', gain: -12, dur: 0.4 }, { at: '@arrested', name: 'rubber_stamp_2', gain: -11, dur: 0.5 },
    { at: 0, name: 'deep_boom_2', gain: -3, dur: 0.5 }, { at: 0.06, name: 'rubber_stamp_2', gain: -6, dur: 0.5 }, { at: 0.16, name: 'paper_slam_2', gain: -8, dur: 0.5 },
    { at: '@11', name: 'thud_1', gain: -9, dur: 0.4 },
    { at: '@Okay', name: 'rewind_2', gain: -11, dur: 0.7 }, { at: '@Anthony', name: 'click_1', gain: -8, dur: 0.3 },
    { at: '@Now', name: 'swipe_2', gain: -11, dur: 0.4 }, { at: '@lies', name: 'pop_1', gain: -9, dur: 0.4 },
    { at: '@His', name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@Saudi', name: 'click_1', gain: -8, dur: 0.3 },
    { at: "@You'd", name: 'swipe_2', gain: -11, dur: 0.4 }, { at: '@Miami', name: 'pop_2', gain: -9, dur: 0.4 },
    { at: '@Ferrari+0.1', name: 'swoosh_2', gain: -10, dur: 0.9 }, { at: '@plates', name: 'ding_2', gain: -10, dur: 0.6 }, { at: '@diplomatic#2', name: 'click_2', gain: -8, dur: 0.3 }, { at: '@badges', name: 'ding_2', gain: -10, dur: 0.6 },
    { at: '@heart', name: 'heartbeat_1', gain: -8, dur: 0.9 },
    { at: '@investors', name: 'pop_2', gain: -10, dur: 0.4 }, { at: '@trust', name: 'money_counter_2', gain: -13, dur: 0.9 },
    { at: '@ended', name: 'coins_drop_1', gain: -12, dur: 1.2 }, { at: '@eight', name: 'money_counter_2', gain: -10, dur: 1.3 }, { at: '@eight+1.3', name: 'cash_register_1', gain: -8, dur: 0.9 },
    { at: '@Blow+0.2', name: 'money_counter_2', gain: -13, dur: 1.2 }, { at: '@22', name: 'ding_2', gain: -9, dur: 0.7 },
    { at: '@But#2', name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@fake', name: 'rubber_stamp_2', gain: -5, dur: 0.5 }, { at: '@badges#2', name: 'rubber_stamp_2', gain: -5, dur: 0.5 },
    { at: '@Send', name: 'swoosh_2', gain: -9, dur: 1.0 },
    { at: '@kept', name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@30', name: 'deep_boom_2', gain: -7, dur: 0.4 }, { at: '@Yeah+0.2', name: 'pop_2', gain: -10, dur: 0.4 },
    { at: '@Remember', name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@arrested', name: 'typewriter_1', gain: -12, dur: 1.0 }, { at: '@11#2', name: 'deep_boom_2', gain: -6, dur: 0.4 }, { at: '@said', name: 'rubber_stamp_2', gain: -8, dur: 0.5 },
    { at: '@guilty', name: 'gavel_1', gain: -4, dur: 0.8 }, { at: '@18', name: 'money_counter_2', gain: -11, dur: 0.7 }, { at: '@18+0.7', name: 'thud_1', gain: -8, dur: 0.4 },
    { at: "@That's", name: 'swipe_2', gain: -11, dur: 0.4 }, { at: '@graduation', name: 'success_chime_1', gain: -14, dur: 1.0 },
    { at: '@So#4', name: 'riser_2', gain: -13, dur: 1.4 },
    { at: '@Follow+0.5', name: 'click_1', gain: -8, dur: 0.3 }, { at: '@Follow+0.58', name: 'success_chime_1', gain: -12, dur: 1.0 },
    { at: '@ordered+0.2', name: 'cinematic_hit_1', gain: -3, dur: 1.2 }, { at: '@pork', name: 'deep_boom_1', gain: -3, dur: 1.4 },
    { at: '@Problem', name: 'swipe_2', gain: -11, dur: 0.4 }, { at: '@Saudi#2', name: 'pop_1', gain: -10, dur: 0.4 }, { at: '@Islam', name: 'pop_1', gain: -10, dur: 0.4 }, { at: '@So#6', name: 'click_1', gain: -9, dur: 0.3 },
    { at: '@victim-0.1', name: 'rubber_stamp_2', gain: -7, dur: 0.5 }, { at: '@victim', name: 'pop_1', gain: -8, dur: 0.5 }, { at: '@suspicious', name: 'thud_1', gain: -8, dur: 0.4 },
    { at: '@dumber', name: 'pop_1', gain: -9, dur: 0.5 }, { at: '@times#3-0.1', name: 'thud_1', gain: -8, dur: 0.4 }, { at: '@times#3-0.1', name: 'paper_slam_2', gain: -8, dur: 0.5 },
  ],
});
