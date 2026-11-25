// YouTube cut v3 (chronological). World (px): row0 hook(0,0) who(1800,0) con(3600,0) pitch(5400,0) q(7200,0) · row1 plates(7200,1800) guards(5400,1800) investors(3600,1800) taken(1800,1800) calendar(0,1800)
// row2 costume(0,3600) tally(1800,3600) verdict(3600,3600) ruler(5400,3600) cloche+notes(7200,3600) why(9100,3600) pcard+diner(11000,3600) red flag(12700,3600)
const SB = 'side-by-side', GH = 'graphic-hero', ZN = 'zoom-on-number', PF = 'presenter-front', PK = 'peek', PB = 'pull-back';
const MUG = 'brand/photos/anthony-gignac/1.jpg';
BM2.scene({
  series: 'decoded', title: 'CASE: FAKE PRINCE · 2017', duration: 86.99,
  footnote: ['PLEADED GUILTY 2018 · SENTENCED MAY 31, 2019 · SOURCES: DOJ S.D. FLORIDA, AP', 'ABOUT 30 YEARS = 1988 TO THE 2017 ARREST · ILLUSTRATIONS / PROPS (GENERIC)', 'PHOTO: MIAMI-DADE COUNTY BOOKING PHOTO · PUBLIC DOMAIN VIA WIKIMEDIA COMMONS'],
  elements: [
    // ---- S0 frame 0 (loop target) ----
    { id: 'hook', type: 'hook', at: [0, -430], in: 0, out: '@dinner+0.05', props: { lines: [[['FAKE PRINCE · ', 'paper'], ['~30 YEARS', 'gold']], [['THEN HE ORDERED DINNER', 'bad']]], sizes: [74, 74] } },
    { id: 'hook2', type: 'hook', at: [0, -430], in: '@Would#3+0.3', props: { lines: [[['FAKE PRINCE · ', 'paper'], ['~30 YEARS', 'gold']], [['THEN HE ORDERED DINNER', 'bad']]], sizes: [74, 74] } },
    { id: 'royal', type: 'royal', at: [-200, 105], in: -1, props: { crownAt: 0, offAt: 60, reAt: '@Would#3+0.3' } },
    { id: 'cloche', type: 'cloche', at: [330, 145], in: -1, props: { slamIn: true, liftAt: 61, closeAt: '@Would#3+0.3' } },
    // ---- S1 who ----
    { id: 'mug', type: 'photo', at: [1700, 30], in: '@So-0.35', props: { src: MUG, name: 'ANTHONY GIGNAC', role: 'FLORIDA · MIAMI BOOKING PHOTO', credit: 'MIAMI-DADE COUNTY · PUBLIC DOMAIN', treatment: 'mugshot', w: 450, aspect: 1.02, fx: 0.74, fy: 0.4, tilt: -0.03 } },
    { id: 'zero', type: 'text', at: [2370, 20], in: '@zero-0.2', props: { lines: [[['ZERO', 'bad']], [['ROYAL', 'paper']], [['BLOOD', 'paper']]], size: 104 } },
    // ---- S2 con man ----
    { id: 'con', type: 'defcard', at: [3600, 0], in: '@Actually-0.2', props: { head: "WHAT'S A CON MAN?", term: 'CON MAN', d1: 'LIES TO TAKE', d2: "PEOPLE'S MONEY", icon: 'conman', defAt: '@guy', iconAt: '@lies' } },
    // ---- S3 his lie ----
    { id: 'quote', type: 'text', at: [5400, -400], in: '@said-0.1', out: '@So#2-0.1', props: { lines: [[['HE SAID:', 'gold']], [['“I\'M A SAUDI PRINCE”', 'paper']]], size: 64 } },
    { id: 'pc', type: 'pcard', at: [5400, 70], in: '@But-0.3', props: { sub: 'HIS CLAIM · NOT TRUE' } },
    { id: 'qm', type: 'text', at: [7200, 40], rot: 0.12, in: '@So#2-0.2', props: { lines: [[['?', 'gold']]], size: 560 } },
    // ---- S4 step 1 / S5 step 2 ----
    { id: 'plates', type: 'plates', at: [7200, 1800], in: '@First-0.5', props: { rollAt: '@Ferrari+0.1', checkAt: '@plates', peelAt: 99999, fakeAt: 99999 } },
    { id: 'guards', type: 'guards', at: [5400, 1800], in: '@Then#2-0.5', props: { flipAt: '@diplomatic#2', checkAt: '@badges', fakeAt: 99999 } },
    // ---- S6 investors / S7 $8M / S8 calendar ----
    { id: 'inv', type: 'investors', at: [3600, 1800], in: '@Okay-0.3', props: { figAt: '@investors', defAt: "@That's" } },
    { id: 'taken', type: 'taken', at: [1800, 1800], in: '@lost-0.4', props: { at: '@$8', dur: 1.3, brickAt: '@lost+0.2' } },
    { id: 'cal', type: 'calendar', at: [0, 1800], in: '@Spend-0.4', props: { at: '@Spend+0.2', dur: 1.7, yrsAt: '@22', yrsDur: 0.9, to: 22 } },
    // ---- S9 costume ----
    { id: 'cos', type: 'costume', at: [0, 3600], in: '@But#2-0.3', props: { plateAt: '@But#2', badgeAt: '@But#2+0.3', fakeAt: '@fake#2', fake2At: '@badges#2' } },
    // ---- S10 tally / S11 verdict / S12 18 years ----
    { id: 'tally', type: 'tally', at: [1800, 3600], in: '@gets-0.5', props: { at: '@arrested', dur: 1.05, tabAt: '@Prosecutors', srcAt: '@said#2' } },
    { id: 'verdict', type: 'verdict', at: [3600, 3600], in: '@pleaded-0.4', props: { guiltyAt: '@guilty', yearsAt: '@18', subAt: '@prison' } },
    { id: 'rul', type: 'ruler18', at: [5400, 3600], in: "@That's#2-0.4", props: { at: '@newborn', dur: 2.0, toy: 'rattle' } },
    // ---- S13 the slip: cloche + notes ----
    { id: 'cloche2', type: 'cloche', at: [7200, 3640], in: '@After-0.4', props: { liftAt: '@ordered#2+0.2', closeAt: 99999 } },
    { id: 'nocar', type: 'nope', at: [6830, 3150], rot: -0.03, in: '@not-0.1', out: '@Follow-0.2', props: { text: 'NOT THE CAR', at: '@car' } },
    { id: 'nobadge', type: 'nope', at: [7570, 3150], rot: 0.03, in: '@not-0.1', out: '@Follow-0.2', props: { text: 'NOT THE BADGES', at: '@badges#3' } },
    // ---- S14 why / S15 out of character ----
    { id: 'why', type: 'whycard', at: [9100, 3600], in: "@Here's-0.4", props: { head: 'WHY IT MATTERS', a1: '@Saudi#3', a2: '@Islam', a3: '@So#4', r3: ['SO HIS CHARACTER', 'WOULD NEVER ORDER IT'] } },
    { id: 'pc2', type: 'pcard', at: [10780, 3480], in: '@victim-0.55', props: { sub: 'HIS CHARACTER', stampAt: '@victim-0.1', dropAt: '@suspicious' } },
    { id: 'diner', type: 'diner', at: [11520, 3820], scale: 0.8, in: '@victim-0.5', props: { at: '@victim', tagAt: '@noticed' } },
    // ---- S16 red flag ----
    { id: 'fl', type: 'text', at: [12700, 3420], in: '@30#3-0.2', props: { lines: [[['30 YEARS OF LIES', 'paper']], [['ONE DINNER ORDER', 'bad']]], size: 92 } },
    { id: 'flag', type: 'slamstamp', at: [12700, 3920], rot: -0.06, in: '@flag-0.1', props: { text: 'RED FLAG', tone: 'bad', size: 120 } },
    // ---- screen overlays ----
    { id: 'who', type: 'text', layer: 'screen', at: [540, 440], in: '@So', out: '@A', props: { lines: [[['WHO WAS HE?', 'paper']]], size: 78 } },
    { id: 'why1', type: 'text', layer: 'screen', at: [540, 440], in: '@So#2', out: '@First-0.2', props: { lines: [[['WHY WOULD ANYBODY', 'paper']], [['BELIEVE THAT?', 'gold']]], size: 74 } },
    { id: 'stepA', type: 'text', layer: 'screen', at: [540, 440], in: '@First', out: '@Then#2-0.15', props: { lines: [[['STEP 1', 'gold']], [['PLATES FOREIGN OFFICIALS GET', 'paper']]], size: 56 } },
    { id: 'stepB', type: 'text', layer: 'screen', at: [540, 440], in: '@Then#2', out: '@Tap-0.15', props: { lines: [[['STEP 2', 'gold']], [['LIKE REAL GOVERNMENT AGENTS', 'paper']]], size: 56 } },
    { id: 'believe', type: 'text', layer: 'screen', at: [540, 440], in: "@you'd", out: '@Okay-0.2', props: { lines: [[["YOU'D HAVE ", 'paper'], ['BELIEVED HIM', 'gold']]], size: 62 } },
    { id: 'heart', type: 'heart', layer: 'screen', at: [800, 930], in: '@heart-0.05', out: '@heart+1.15', props: { s: 1 } },
    { id: 'plane', type: 'plane', layer: 'screen', at: [540, 960], in: '@Send-0.05', out: '@Send+1.2', props: { dur: 0.9, from: [-230, 250], to: [280, -330], s: 1.5 } },
    { id: 'sendtx', type: 'text', layer: 'screen', at: [820, 440], in: '@Send+0.15', out: '@Send+1.2', props: { lines: [[['SEND', 'gold']]], size: 70 } },
    { id: 'wc', type: 'text', layer: 'screen', at: [540, 440], in: '@what', out: '@Follow-0.15', props: { lines: [[['WHAT TIPPED', 'paper']], [['SOMEBODY OFF?', 'gold']]], size: 74 } },
    { id: 'mag', type: 'mag', layer: 'screen', at: [830, 1010], in: '@Follow-0.05', out: '@Follow+1.45', props: { press: 0.5 } },
    { id: 'btn', type: 'follow', layer: 'screen', at: [830, 1010], scale: 0.8, in: '@Follow-0.05', out: '@Follow+1.45', props: { press: 0.5 } },
    { id: 'slip', type: 'text', layer: 'screen', at: [540, 440], in: '@never-0.2', out: '@At-0.05', props: { lines: [[['THE SLIP-UP…', 'gold']]], size: 92 } },
    { id: 'ask', type: 'bubble', layer: 'screen', at: [600, 1090], in: '@Would#3', out: '@caught+0.5', props: { l1: 'WOULD YOU HAVE', l2: 'CAUGHT IT?', size: 52, tail: 'left' } },
    { id: 'hud', type: 'hud', layer: 'screen', at: [0, 0], in: -1, props: {
      labels: [{ at: -1, text: 'THE PITCH' }, { at: '@First-0.25', text: 'THE PROPS' }, { at: '@Okay-0.2', text: 'THE MONEY' }, { at: '@gets-0.25', text: 'THE SENTENCE' }, { at: '@After-0.2', text: 'THE SLIP' }],
      items: [{ at: 0, label: 'THE ACT · YEAR', from: 1988, to: 2017, dur: 2.4, commas: false }, { at: '@zero', label: 'ROYAL BLOOD', to: 0, dur: 0.5 }, { at: '@First', label: 'PROPS SO FAR', to: 1, dur: 0.4 }, { at: '@Then#2', label: 'PROPS SO FAR', to: 2, dur: 0.4 },
        { at: '@lost', label: 'INVESTORS LOST (MORE THAN)', from: 0, to: 8000000, dur: 1.4, prefix: '$' }, { at: '@Spend+0.2', label: 'DAYS AT $1,000', from: 0, to: 8000, dur: 1.9, suffix: ' DAYS' }, { at: '@22', label: 'THAT IS', to: 22, dur: 0.8, suffix: ' YEARS' },
        { at: '@fake#2', label: 'PROPS THAT WERE REAL', to: 0, dur: 0.5 }, { at: '@arrested', label: 'ARRESTED OR CONVICTED', from: 0, to: 11, dur: 1.05, suffix: '×' }, { at: '@18', label: 'YEARS IN PRISON', from: 0, to: 18, dur: 0.7, suffix: '+' },
        { at: '@After', label: 'YEARS OF THE ACT', to: 30, dur: 0.8, prefix: '~' }, { at: '@pork', label: 'DINNER ORDERS THAT BLEW IT', to: 1, dur: 0.4 }, { at: '@30#3', label: 'YEARS OF LIES', to: 30, dur: 0.8, prefix: '~' }, { at: '@caught', label: 'THE ACT · YEAR', to: 1988, dur: 0.45, commas: false }] } },
  ],
  beats: [
    { at: 0, beat: SB, focus: ['hook', 'royal', 'cloche'], sx: 540, sy: 930, fill: 0.98, maxH: 960, st: { x: 130, y: 1350, s: 1.1 }, pose: 'shock' },
    { at: '@30', beat: ZN, focus: ['hook', 'royal', 'cloche'], fill: 1.05, maxH: 960, sx: 540, sy: 930, st: { x: 130, y: 1350, s: 1.1 }, dur: 0.45 },
    { at: '@then', beat: SB, focus: ['hook', 'royal', 'cloche'], sx: 540, sy: 930, fill: 1.05, maxH: 960, st: { x: 130, y: 1350, s: 1.1 }, pose: 'shock', dur: 0.6 },
    { at: '@dinner', beat: ZN, focus: 'cloche', fill: 0.62, maxH: 600, sy: 800, st: { x: 130, y: 1350, s: 1.1 }, pose: 'shock', dur: 0.4 },
    // who
    { at: '@So', beat: SB, focus: 'mug', move: 'whip', sx: 540, sy: 900, fill: 0.62, maxH: 860, st: { x: 930, y: 1390, s: 0.85 }, pose: 'shrug' },
    { at: '@Anthony', beat: ZN, focus: 'mug.name', fill: 0.5, maxH: 300, sy: 1010, st: { x: 930, y: 1390, s: 0.85 }, pose: 'point', dur: 0.45 },
    { at: '@zero', beat: SB, focus: ['mug', 'zero'], sx: 540, sy: 800, fill: 0.95, maxH: 1000, st: 'corner-left', pose: 'shock', dur: 0.8 },
    // con man
    { at: '@Actually', beat: SB, focus: 'con', move: 'whip', sx: 540, sy: 880, fill: 0.74, maxH: 880, st: 'left', pose: 'point' },
    { at: '@con', beat: ZN, focus: 'con.term', fill: 0.8, maxH: 300, sy: 680, st: 'corner-left', pose: 'point', dur: 0.45 },
    { at: '@guy', beat: GH, focus: 'con', sy: 880, fill: 0.78, maxH: 880, st: 'corner-left', pose: 'talk', dur: 0.7 },
    { at: '@lies', beat: ZN, focus: 'con.icon', fill: 0.78, maxH: 380, sy: 840, st: 'corner', pose: 'point', dur: 0.5 },
    { at: '@money', beat: GH, focus: 'con', fill: 0.78, maxH: 880, sy: 880, st: 'peek', pose: 'chin', dur: 0.8 },
    // the pitch
    { at: '@But', beat: SB, focus: ['pc', 'quote'], move: 'whip', sx: 540, sy: 820, fill: 0.78, maxH: 1000, st: 'left', pose: 'shock' },
    { at: '@said', beat: ZN, focus: 'quote', fill: 0.9, maxH: 300, sy: 640, st: 'corner-left', pose: 'point', dur: 0.45 },
    { at: '@Saudi#2', beat: ZN, focus: 'pc.name', fill: 0.8, maxH: 360, sy: 860, st: 'corner-left', pose: 'shock', dur: 0.45 },
    { at: '@prince#2', beat: GH, focus: ['pc', 'quote'], sy: 800, fill: 0.78, maxH: 1000, st: 'corner-left', dur: 0.7 },
    // why believe
    { at: '@So#2', beat: PF, focus: 'qm', move: 'whip', sy: 790, pose: 'you' },
    { at: '@believe', beat: ZN, focus: 'qm', fill: 0.62, maxH: 700, sy: 790, st: 'corner-left', pose: 'shrug', dur: 0.5 },
    // step 1 plates
    { at: '@First', beat: SB, focus: 'plates', move: 'whip', sx: 540, sy: 840, fill: 0.84, maxH: 800, st: 'corner-left', pose: 'point' },
    { at: '@Ferrari', beat: ZN, focus: 'plates.car', fill: 0.42, maxH: 400, sy: 990, st: 'corner-left', pose: 'point', dur: 0.5 },
    { at: '@diplomatic', beat: ZN, focus: 'plates.plate', fill: 0.4, maxH: 440, sy: 990, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@special', beat: GH, focus: 'plates', sy: 840, fill: 0.84, maxH: 800, st: 'corner-left', pose: 'talk', dur: 0.7 },
    // step 2 guards
    { at: '@Then#2', beat: SB, focus: 'guards', move: 'whip', sx: 540, sy: 840, fill: 0.84, maxH: 800, st: 'corner-left', pose: 'point' },
    { at: '@bodyguards', beat: ZN, focus: 'guards', fill: 0.84, maxH: 640, sy: 900, st: 'corner-left', pose: 'point', dur: 0.5 },
    { at: '@badges', beat: ZN, focus: 'guards.badges', fill: 0.8, maxH: 480, sy: 960, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@real', beat: GH, focus: 'guards', sy: 840, fill: 0.84, maxH: 800, st: 'corner', pose: 'talk', dur: 0.7 },
    { at: '@Tap', beat: PF, focus: 'guards', sy: 790, pose: 'shrug' },
    // investors
    { at: '@Okay', beat: SB, focus: 'inv', move: 'whip', sx: 540, sy: 860, fill: 0.86, maxH: 860, st: 'left', pose: 'point' },
    { at: '@investors', beat: ZN, focus: 'inv.figs', fill: 0.9, maxH: 440, sy: 900, st: 'corner', pose: 'point', dur: 0.5 },
    { at: "@That's", beat: GH, focus: 'inv', sy: 860, fill: 0.86, maxH: 860, st: 'corner-left', pose: 'talk', dur: 0.7 },
    { at: '@hoping', beat: ZN, focus: 'inv.def', fill: 0.84, maxH: 400, sy: 680, st: 'corner', pose: 'point', dur: 0.5 },
    // $8M
    { at: '@lost', beat: SB, focus: 'taken', move: 'whip', sx: 540, sy: 800, fill: 0.9, maxH: 900, st: 'corner-left', pose: 'point' },
    { at: '@$8', beat: ZN, focus: 'taken.value', fill: 0.9, maxH: 560, sy: 780, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@million', beat: GH, focus: 'taken', sy: 800, fill: 0.9, maxH: 900, st: 'corner-left', pose: 'shock', dur: 0.8 },
    // $1,000 a day
    { at: '@Spend', beat: SB, focus: 'cal', move: 'whip', sx: 540, sy: 860, fill: 0.72, maxH: 850, st: 'left', pose: 'point' },
    { at: '@thousand', beat: ZN, focus: 'cal.head', fill: 0.8, maxH: 300, sy: 600, st: 'corner', pose: 'point', dur: 0.45 },
    { at: '@every', beat: GH, focus: 'cal', sy: 860, fill: 0.72, maxH: 850, st: 'corner-left', dur: 0.7 },
    { at: '@22', beat: ZN, focus: 'cal.years', fill: 0.8, maxH: 420, sy: 850, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@years#2+0.25', beat: GH, focus: 'cal', sy: 860, fill: 0.72, maxH: 850, st: 'corner-left', pose: 'idle', dur: 0.8 },
    // costume: fake
    { at: '@But#2', beat: SB, focus: 'cos', move: 'whip', sx: 540, sy: 860, fill: 0.84, maxH: 880, st: 'left', pose: 'point' },
    { at: '@plates#3', beat: ZN, focus: 'cos.plate', fill: 0.28, maxH: 520, sy: 930, st: 'corner', pose: 'point', dur: 0.45 },
    { at: '@were', beat: ZN, focus: 'cos.plate', fill: 0.3, maxH: 520, sy: 930, st: 'corner', pose: 'shock', dur: 0.4 },
    { at: '@badges#2', beat: ZN, focus: 'cos.badge', fill: 0.28, maxH: 520, sy: 930, st: 'corner-left', pose: 'shock', dur: 0.45 },
    { at: '@badges#2+0.7', beat: GH, focus: 'cos', sy: 860, fill: 0.8, maxH: 880, st: 'corner-left', pose: 'idle', dur: 0.8 },
    { at: '@Send', beat: PF, focus: 'cos', sy: 790, pose: 'talk' },
    { at: '@thinks', beat: PF, focus: 'cos', sy: 790, zoom: 1.06, pose: 'shrug', dur: 0.5 },
    // eleven times
    { at: '@gets', beat: PK, focus: 'tally', move: 'whip', sy: 800, fill: 0.9, maxH: 860, pose: 'chin' },
    { at: '@Prosecutors', beat: GH, focus: 'tally', sy: 800, fill: 0.9, maxH: 860, st: 'corner-left', pose: 'point', dur: 0.7 },
    { at: '@11', beat: ZN, focus: 'tally.num', fill: 0.8, maxH: 520, sy: 880, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@royalty', beat: PB, focus: 'tally', fill: 0.86, maxH: 860, sy: 800, st: 'corner-left', dur: 0.6 },
    // verdict
    { at: '@pleaded', beat: SB, focus: 'verdict', move: 'whip', sx: 540, sy: 880, fill: 0.9, maxH: 920, st: 'corner-left', pose: 'shock' },
    { at: '@guilty', beat: ZN, focus: 'verdict.guilty', fill: 0.85, maxH: 420, sy: 800, st: 'corner-left', pose: 'shock', dur: 0.45 },
    { at: '@18', beat: ZN, focus: 'verdict.years', fill: 0.72, maxH: 640, sy: 900, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@prison', beat: GH, focus: 'verdict', sy: 880, fill: 0.9, maxH: 920, st: 'corner-left', pose: 'idle', dur: 0.8 },
    // 18 years = newborn -> graduate
    { at: "@That's#2", beat: SB, focus: 'rul', move: 'whip', sx: 540, sy: 860, fill: 0.84, maxH: 760, st: 'left', pose: 'point' },
    { at: '@growing', beat: ZN, focus: 'rul.num', fill: 0.7, maxH: 420, sy: 760, st: 'corner', pose: 'point', dur: 0.5 },
    { at: '@high', beat: GH, focus: 'rul', sy: 860, fill: 0.84, maxH: 760, st: 'corner-left', pose: 'shock', dur: 0.7 },
    // the slip
    { at: '@After', beat: SB, focus: ['cloche2', 'nocar', 'nobadge'], move: 'whip', sx: 540, sy: 800, fill: 0.9, maxH: 1000, st: 'corner-left', pose: 'chin' },
    { at: '@what', beat: GH, focus: ['cloche2', 'nocar', 'nobadge'], sy: 800, fill: 0.92, maxH: 1000, st: 'corner-left', dur: 0.8 },
    { at: '@car', beat: ZN, focus: 'nocar', fill: 0.62, maxH: 300, sy: 760, st: 'corner-left', pose: 'point', dur: 0.4 },
    { at: '@badges#3', beat: ZN, focus: 'nobadge', fill: 0.62, maxH: 300, sy: 760, st: 'corner-left', pose: 'point', dur: 0.4 },
    { at: '@Follow', beat: PF, focus: 'cloche2', sy: 820, pose: 'talk' },
    { at: '@slip', beat: PK, focus: 'cloche2', sy: 860, fill: 0.84, maxH: 760, pose: 'idle', dur: 0.8 },
    { at: '@At', beat: GH, focus: 'cloche2', fill: 0.88, maxH: 760, sy: 840, st: 'corner-left', pose: 'idle', dur: 1.0 },
    { at: '@pork', beat: ZN, focus: 'cloche2.ticket', fill: 0.78, maxH: 600, sy: 900, st: 'corner-left', pose: 'shock', dur: 0.45 },
    // why
    { at: "@Here's", beat: SB, focus: 'why', move: 'whip', sx: 540, sy: 880, fill: 0.9, maxH: 940, st: 'left', pose: 'point' },
    { at: '@Saudi#3', beat: ZN, focus: 'why.r1', fill: 0.84, maxH: 320, sy: 780, st: 'corner-left', pose: 'point', dur: 0.45 },
    { at: '@Islam', beat: ZN, focus: 'why.r2', fill: 0.84, maxH: 320, sy: 800, st: 'corner-left', pose: 'point', dur: 0.45 },
    { at: '@eating', beat: GH, focus: 'why', sy: 880, fill: 0.9, maxH: 940, st: 'corner-left', pose: 'talk', dur: 0.7 },
    { at: '@So#4', beat: ZN, focus: 'why.r3', fill: 0.7, maxH: 320, sy: 1000, st: 'corner-left', pose: 'point', dur: 0.45 },
    // victim noticed
    { at: '@victim-0.15', beat: SB, focus: ['pc2', 'diner'], move: 'whip', sx: 540, sy: 860, fill: 0.92, maxH: 920, st: 'corner-left', pose: 'shock' },
    { at: '@suspicious', beat: ZN, focus: 'pc2', fill: 0.78, maxH: 520, sy: 800, st: 'corner-left', pose: 'shock', dur: 0.45 },
    // red flag
    { at: '@30#3-0.1', beat: SB, focus: ['fl', 'flag'], move: 'whip', sx: 540, sy: 880, fill: 0.78, maxH: 1000, st: 'corner-left', pose: 'idle' },
    { at: '@flag', beat: ZN, focus: 'flag', fill: 0.6, maxH: 420, sy: 900, st: 'corner-left', pose: 'shock', dur: 0.4 },
    { at: '@Would#3', beat: PF, focus: ['fl', 'flag'], sy: 880, pose: 'talk' },
    { at: '@caught', beat: SB, focus: ['hook2', 'royal', 'cloche'], move: 'whip', sx: 540, sy: 930, fill: 0.98, maxH: 960, st: { x: 130, y: 1350, s: 1.1 }, pose: 'shock' },
  ],
  poses: [['@Follow-0.1', 'follow', { target: [830, 1010] }], ['@Follow+1.5', 'talk']],
  shakes: [[0.05, 14], ['@$8+1.3', 10], ['@fake#2', 8], ['@11', 14], ['@guilty', 14], ['@18', 12], ['@pork', 26], ['@flag', 12]],
  captions: {
    emph: { '$8': 'bad', million: 'bad', fake: 'bad', '11': 'bad', '18': 'bad', pork: 'bad', '30': 'accent', '22': 'accent', royalty: 'accent', dumber: 'bad' },
    fix: [['the slip up.', 'the slip-up.']],
    gap: 16,
  },
  bed: { name: 'tense_bed_2', gain: -1 },
  sfx: [
    { at: 0, name: 'deep_boom_2', gain: -3, dur: 0.5 }, { at: 0.1, name: 'paper_slam_2', gain: -7, dur: 0.5 },
    { at: '@30', name: 'thud_1', gain: -9, dur: 0.4 }, { at: '@dinner', name: 'cinematic_hit_1', gain: -8, dur: 0.8 },
    { at: '@So', name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@zero', name: 'rubber_stamp_2', gain: -7, dur: 0.5 },
    { at: '@Actually', name: 'swipe_2', gain: -11, dur: 0.4 }, { at: '@lies', name: 'pop_1', gain: -9, dur: 0.4 },
    { at: '@But', name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@Saudi#2', name: 'click_1', gain: -8, dur: 0.3 },
    { at: '@So#2', name: 'pop_1', gain: -8, dur: 0.5 },
    { at: '@Ferrari+0.1', name: 'swoosh_2', gain: -10, dur: 0.9 }, { at: '@plates', name: 'ding_2', gain: -10, dur: 0.6 }, { at: '@diplomatic#2', name: 'click_2', gain: -8, dur: 0.3 }, { at: '@badges', name: 'ding_2', gain: -10, dur: 0.6 },
    { at: '@heart', name: 'heartbeat_1', gain: -8, dur: 0.9 },
    { at: '@investors', name: 'pop_2', gain: -10, dur: 0.4 }, { at: "@That's", name: 'swipe_2', gain: -11, dur: 0.4 },
    { at: '@lost+0.2', name: 'coins_drop_1', gain: -12, dur: 1.2 }, { at: '@$8', name: 'money_counter_2', gain: -10, dur: 1.3 }, { at: '@$8+1.3', name: 'cash_register_1', gain: -8, dur: 0.9 },
    { at: '@Spend+0.2', name: 'money_counter_2', gain: -13, dur: 1.2 }, { at: '@22', name: 'ding_2', gain: -9, dur: 0.7 },
    { at: '@But#2', name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@fake#2', name: 'rubber_stamp_2', gain: -5, dur: 0.5 }, { at: '@badges#2', name: 'rubber_stamp_2', gain: -5, dur: 0.5 },
    { at: '@Send', name: 'swoosh_2', gain: -9, dur: 1.0 },
    { at: '@gets', name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@arrested', name: 'typewriter_1', gain: -12, dur: 1.0 }, { at: '@11', name: 'deep_boom_2', gain: -6, dur: 0.4 }, { at: '@said#2', name: 'rubber_stamp_2', gain: -8, dur: 0.5 },
    { at: '@guilty', name: 'gavel_1', gain: -4, dur: 0.8 }, { at: '@18', name: 'money_counter_2', gain: -11, dur: 0.7 }, { at: '@18+0.7', name: 'thud_1', gain: -8, dur: 0.4 },
    { at: "@That's#2", name: 'swipe_2', gain: -11, dur: 0.4 }, { at: '@high+0.3', name: 'success_chime_1', gain: -14, dur: 1.0 },
    { at: '@After', name: 'riser_2', gain: -13, dur: 1.4 }, { at: '@car', name: 'rubber_stamp_2', gain: -9, dur: 0.5 }, { at: '@badges#3', name: 'rubber_stamp_2', gain: -9, dur: 0.5 },
    { at: '@Follow+0.5', name: 'click_1', gain: -8, dur: 0.3 }, { at: '@Follow+0.58', name: 'success_chime_1', gain: -12, dur: 1.0 },
    { at: '@ordered#2+0.2', name: 'cinematic_hit_1', gain: -3, dur: 1.2 }, { at: '@pork', name: 'deep_boom_1', gain: -3, dur: 1.4 },
    { at: "@Here's", name: 'swipe_2', gain: -11, dur: 0.4 }, { at: '@Saudi#3', name: 'pop_1', gain: -10, dur: 0.4 }, { at: '@Islam', name: 'pop_1', gain: -10, dur: 0.4 }, { at: '@So#4', name: 'click_1', gain: -9, dur: 0.3 },
    { at: '@victim-0.1', name: 'rubber_stamp_2', gain: -7, dur: 0.5 }, { at: '@victim', name: 'pop_1', gain: -8, dur: 0.5 }, { at: '@suspicious', name: 'thud_1', gain: -8, dur: 0.4 },
    { at: '@flag', name: 'rubber_stamp_2', gain: -5, dur: 0.5 }, { at: '@flag', name: 'deep_boom_2', gain: -8, dur: 0.5 },
    { at: '@Would#3', name: 'pop_1', gain: -9, dur: 0.5 }, { at: '@caught', name: 'thud_1', gain: -8, dur: 0.4 },
  ],
});
