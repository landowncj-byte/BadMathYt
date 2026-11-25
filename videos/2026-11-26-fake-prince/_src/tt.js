// TikTok cut v3 (opens on the 11 arrests). World (px): row0 hook comp(0,0) who(1800,0) con(3600,0) pitch(5400,0) skyline(7200,0) · row1 plates(7200,1800) guards(5400,1800) investors(3600,1800) taken(1800,1800) calendar(0,1800)
// row2 costume(0,3600) span(1800,3600) tally2(3600,3600) verdict(5400,3600) ruler(7200,3600) cloche(9000,3600) why(10800,3600) pcard+diner(12600,3600)
const SB = 'side-by-side', GH = 'graphic-hero', ZN = 'zoom-on-number', PF = 'presenter-front', PK = 'peek', PB = 'pull-back';
const MUG = 'brand/photos/anthony-gignac/1.jpg';
const HOOK = { lines: [[['BUSTED ', 'paper'], ['11 TIMES', 'bad']], [['FOR THE SAME LIE', 'paper']], [['PROSECUTORS SAID', 'gold']]], sizes: [104, 76, 46] };
const MUGP = { src: MUG, name: '', credit: 'MIAMI-DADE COUNTY · PUBLIC DOMAIN', treatment: 'mugshot', w: 420, aspect: 1.0, fx: 0.74, fy: 0.4, tilt: 0.04 };
const F0 = { sx: 540, sy: 930, fill: 0.98, maxH: 960, st: { x: 540, y: 1400, s: 0.8 } };
BM2.scene({
  series: 'decoded', title: 'CASE: FAKE PRINCE · 2017', duration: 87.27,
  footnote: ['PLEADED GUILTY 2018 · SENTENCED MAY 31, 2019 · SOURCES: DOJ S.D. FLORIDA, AP', 'ABOUT 30 YEARS = 1988 TO THE 2017 ARREST · ILLUSTRATIONS / PROPS (GENERIC)', 'PHOTO: MIAMI-DADE COUNTY BOOKING PHOTO · PUBLIC DOMAIN VIA WIKIMEDIA COMMONS'],
  elements: [
    // ---- S0 frame 0 (loop target) ----
    { id: 'hook', type: 'hook', at: [0, -430], in: 0, out: '@lie+0.05', props: HOOK },
    { id: 'hook2', type: 'hook', at: [0, -430], in: '@times#3-0.2', props: HOOK },
    { id: 'tally0', type: 'tally', at: [-250, 190], scale: 0.62, in: 0, props: { at: -5, dur: 1.0 } },
    { id: 'tally3', type: 'tally', at: [-250, 190], scale: 0.62, in: '@times#3-0.2', props: { at: -5, dur: 1.0 } },
    { id: 'mug0', type: 'photo', at: [300, 210], scale: 0.8, in: 0, props: MUGP },
    { id: 'mug3', type: 'photo', at: [300, 210], scale: 0.8, in: '@times#3-0.15', props: MUGP },
    // ---- S1 who ----
    { id: 'mug2', type: 'photo', at: [1700, 30], in: '@Okay-0.35', props: { ...MUGP, name: 'ANTHONY GIGNAC', role: 'FLORIDA CON MAN', w: 450, aspect: 1.02, tilt: -0.03 } },
    { id: 'rw', type: 'text', at: [2400, 20], in: '@rewind-0.1', props: { lines: [[['REWIND', 'gold']], [['FLORIDA', 'paper']], [['CON MAN', 'bad']]], size: 96 } },
    // ---- S2 con man ----
    { id: 'con', type: 'defcard', at: [3600, 0], in: '@Now-0.2', props: { head: "WHAT'S A CON MAN?", term: 'CON MAN', d1: 'LIES SO YOU HAND OVER', d2: 'YOUR MONEY', icon: 'conman', defAt: '@lies', iconAt: '@hand' } },
    // ---- S3 his lie ----
    { id: 'quote', type: 'text', at: [5400, -400], in: '@Saudi-0.3', out: "@You'd-0.1", props: { lines: [[['HIS LIE:', 'gold']], [['“I\'M A SAUDI PRINCE”', 'paper']]], size: 64 } },
    { id: 'pc', type: 'pcard', at: [5400, 70], in: '@His-0.3', props: { sub: 'HIS LIE · NOT TRUE' } },
    // ---- S4 Miami ----
    { id: 'sky', type: 'skyline', at: [7200, 0], in: "@You'd-0.4", props: { lampAt: '@Miami' } },
    // ---- steps ----
    { id: 'plates', type: 'plates', at: [7200, 1800], in: '@Step-0.5', props: { rollAt: '@Ferrari+0.1', checkAt: '@plates', peelAt: 99999, fakeAt: 99999 } },
    { id: 'guards', type: 'guards', at: [5400, 1800], in: '@Step#2-0.5', props: { flipAt: '@diplomatic#2', checkAt: '@badges', fakeAt: 99999 } },
    { id: 'inv', type: 'investors', at: [3600, 1800], in: '@So#2-0.3', props: { head: 'STEP 3 · INVESTORS', figAt: '@investors', meter: 'TRUST', meterAt: '@trust', mdur: 0.9 } },
    { id: 'taken', type: 'taken', at: [1800, 1800], in: '@ended-0.4', props: { at: '@8', dur: 1.3, brickAt: '@ended' } },
    { id: 'cal', type: 'calendar', at: [0, 1800], in: '@Blow-0.4', props: { at: '@Blow+0.2', dur: 1.7, yrsAt: '@22', yrsDur: 0.9, to: 22 } },
    // ---- costume ----
    { id: 'cos', type: 'costume', at: [0, 3600], in: '@But#2-0.3', props: { plateAt: '@But#2', badgeAt: '@But#2+0.3', fakeAt: '@fake', fake2At: '@badges#2' } },
    // ---- 30 years / cakes ----
    { id: 'span', type: 'span', at: [1800, 3600], in: '@kept-0.5', props: { head: 'HE KEPT IT GOING', at: '@kept', dur: 1.6, cakesAt: '@Yes+0.2' } },
    // ---- recount, verdict, 18 years ----
    { id: 'tally2', type: 'tally', at: [3600, 3600], in: '@Remember-0.4', props: { at: '@arrested', dur: 1.0, tabAt: '@prosecutors#2', srcAt: '@said' } },
    { id: 'verdict', type: 'verdict', at: [5400, 3600], in: '@pleaded-0.4', props: { guiltyAt: '@guilty', yearsAt: '@18', subAt: '@prison' } },
    { id: 'rul', type: 'ruler18', at: [7200, 3600], in: "@That's-0.4", props: { at: '@baby', dur: 2.0, toy: 'bottle' } },
    // ---- the slip ----
    { id: 'cloche2', type: 'cloche', at: [9000, 3640], in: '@So#4-0.4', props: { liftAt: '@ordered+0.2', closeAt: 99999 } },
    { id: 'why', type: 'whycard', at: [10800, 3600], in: '@Problem-0.4', props: { head: 'THE PROBLEM', a1: '@Saudi#2', a2: '@Islam', a3: '@So#6', r3: ['SO HIS CHARACTER', 'WOULD NEVER TOUCH IT'] } },
    { id: 'pc2', type: 'pcard', at: [12580, 3480], in: '@victim-0.55', props: { sub: 'HIS CHARACTER', stampAt: '@victim-0.1', dropAt: '@suspicious' } },
    { id: 'diner', type: 'diner', at: [13320, 3820], scale: 0.8, in: '@victim-0.5', props: { at: '@victim', tagAt: '@noticed' } },
    // ---- screen overlays ----
    { id: 'rwt', type: 'text', layer: 'screen', at: [540, 440], in: '@rewind', out: '@Now-0.1', props: { lines: [[['OKAY, REWIND', 'gold']]], size: 78 } },
    { id: 'nobuy', type: 'text', layer: 'screen', at: [540, 440], in: "@You'd", out: '@look-0.1', props: { lines: [[['NOBODY BUYS THAT…', 'paper']], [['RIGHT?', 'gold']]], size: 74 } },
    { id: 'miami', type: 'text', layer: 'screen', at: [540, 440], in: '@look', out: '@Step-0.15', props: { lines: [[['LOOK WHAT', 'paper']], [['MIAMI SAW', 'gold']]], size: 74 } },
    { id: 'stepA', type: 'text', layer: 'screen', at: [540, 440], in: '@Step', out: '@Step#2-0.15', props: { lines: [[['STEP 1', 'gold']], [['PLATES FOREIGN OFFICIALS GET', 'paper']]], size: 56 } },
    { id: 'stepB', type: 'text', layer: 'screen', at: [540, 440], in: '@Step#2', out: '@Tap-0.15', props: { lines: [[['STEP 2', 'gold']], [['LIKE ACTUAL GOVERNMENT AGENTS', 'paper']]], size: 56 } },
    { id: 'bought', type: 'text', layer: 'screen', at: [540, 440], in: "@you'd", out: '@So#2-0.2', props: { lines: [[["YOU'D HAVE ", 'paper'], ['BOUGHT IT', 'gold']]], size: 66 } },
    { id: 'heart', type: 'heart', layer: 'screen', at: [800, 930], in: '@heart-0.05', out: '@heart+1.15', props: { s: 1 } },
    { id: 'plane', type: 'plane', layer: 'screen', at: [540, 960], in: '@Send-0.05', out: '@Send+1.2', props: { dur: 0.9, from: [-230, 250], to: [280, -330], s: 1.5 } },
    { id: 'sendtx', type: 'text', layer: 'screen', at: [820, 440], in: '@Send+0.15', out: '@Send+1.2', props: { lines: [[['SEND', 'gold']]], size: 70 } },
    { id: 'slipq', type: 'text', layer: 'screen', at: [540, 440], in: '@So#4', out: '@Follow-0.1', props: { lines: [[['SO HOW DID HE', 'paper']], [['FINALLY SLIP UP?', 'gold']]], size: 74 } },
    { id: 'mag', type: 'mag', layer: 'screen', at: [830, 1010], in: '@Follow-0.05', out: '@Follow+1.45', props: { press: 0.5 } },
    { id: 'btn', type: 'follow', layer: 'screen', at: [830, 1010], scale: 0.8, in: '@Follow-0.05', out: '@Follow+1.45', props: { press: 0.5 } },
    { id: 'dumbtx', type: 'text', layer: 'screen', at: [540, 440], in: '@answer-0.1', out: '@At-0.05', props: { lines: [[['THE ANSWER IS', 'paper']], [['SO DUMB…', 'bad']]], size: 84 } },
    { id: 'ask', type: 'bubble', layer: 'screen', at: [600, 1090], in: '@dumber', out: '@times#3-0.3', props: { l1: "WHAT'S DUMBER?", l2: 'PORK OR 11 TIMES?', size: 46, tail: 'left' } },
    { id: 'hud', type: 'hud', layer: 'screen', at: [0, 0], in: -1, props: {
      labels: [{ at: -1, text: 'THE PITCH' }, { at: '@Step-0.25', text: 'THE PROPS' }, { at: '@So#2-0.2', text: 'THE MONEY' }, { at: '@kept-0.25', text: 'THE SENTENCE' }, { at: '@So#4-0.2', text: 'THE SLIP' }],
      items: [{ at: 0, label: 'ARRESTED OR CONVICTED', from: 0, to: 11, dur: 0.9, suffix: '×' }, { at: '@Okay', label: 'ROYAL BLOOD', to: 0, dur: 0.5 }, { at: '@Step', label: 'PROPS SO FAR', to: 1, dur: 0.4 }, { at: '@Step#2', label: 'PROPS SO FAR', to: 2, dur: 0.4 },
        { at: '@ended', label: 'INVESTORS LOST (MORE THAN)', from: 0, to: 8000000, dur: 1.5, prefix: '$' }, { at: '@Blow+0.2', label: 'DAYS AT $1,000', from: 0, to: 8000, dur: 1.9, suffix: ' DAYS' }, { at: '@22', label: 'THAT IS', to: 22, dur: 0.8, suffix: ' YEARS' },
        { at: '@fake', label: 'PROPS THAT WERE REAL', to: 0, dur: 0.5 }, { at: '@kept', label: 'YEARS OF THE ACT', from: 0, to: 30, dur: 1.7, prefix: '~' }, { at: '@arrested', label: 'ARRESTED OR CONVICTED', from: 0, to: 11, dur: 1.0, suffix: '×' }, { at: '@18', label: 'YEARS IN PRISON', from: 0, to: 18, dur: 0.7, suffix: '+' },
        { at: '@pork', label: 'DINNER ORDERS THAT BLEW IT', to: 1, dur: 0.4 }, { at: '@times#3-0.2', label: 'ARRESTED OR CONVICTED', to: 11, dur: 0.5, suffix: '×' }] } },
  ],
  beats: [
    { at: 0, beat: SB, focus: ['hook', 'tally0', 'mug0'], ...F0, pose: 'shock' },
    { at: '@11', beat: ZN, focus: ['hook', 'tally0', 'mug0'], sx: 540, sy: 930, fill: 1.06, maxH: 960, st: F0.st, dur: 0.45 },
    { at: '@same', beat: SB, focus: ['hook', 'tally0', 'mug0'], ...F0, pose: 'shock', dur: 0.6 },
    // rewind: who
    { at: '@Okay', beat: SB, focus: ['mug2', 'rw'], move: 'whip', sx: 540, sy: 850, fill: 0.9, maxH: 1000, st: 'corner-left', pose: 'shrug' },
    { at: '@Anthony', beat: ZN, focus: 'mug2.name', fill: 0.8, maxH: 300, sy: 800, st: 'corner-left', pose: 'point', dur: 0.45 },
    // con man
    { at: '@Now', beat: SB, focus: 'con', move: 'whip', sx: 540, sy: 880, fill: 0.74, maxH: 880, st: 'left', pose: 'point' },
    { at: '@con#2', beat: ZN, focus: 'con.term', fill: 0.8, maxH: 300, sy: 680, st: 'corner-left', pose: 'point', dur: 0.45 },
    { at: '@lies', beat: GH, focus: 'con', sy: 880, fill: 0.78, maxH: 880, st: 'corner-left', pose: 'talk', dur: 0.7 },
    { at: '@hand', beat: ZN, focus: 'con.icon', fill: 0.78, maxH: 380, sy: 840, st: 'corner', pose: 'point', dur: 0.5 },
    { at: '@money', beat: GH, focus: 'con', fill: 0.78, maxH: 880, sy: 880, st: 'peek', pose: 'chin', dur: 0.8 },
    // his lie
    { at: '@His', beat: SB, focus: ['pc', 'quote'], move: 'whip', sx: 540, sy: 820, fill: 0.78, maxH: 1000, st: 'left', pose: 'shock' },
    { at: '@Saudi', beat: ZN, focus: 'quote', fill: 0.9, maxH: 300, sy: 640, st: 'corner-left', pose: 'point', dur: 0.45 },
    { at: '@prince', beat: GH, focus: ['pc', 'quote'], sy: 800, fill: 0.78, maxH: 1000, st: 'corner-left', pose: 'idle', dur: 0.7 },
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
    { at: '@So#2', beat: SB, focus: 'inv', move: 'whip', sx: 540, sy: 860, fill: 0.86, maxH: 860, st: 'left', pose: 'point' },
    { at: '@investors', beat: ZN, focus: 'inv.figs', fill: 0.9, maxH: 440, sy: 920, st: 'corner', pose: 'point', dur: 0.5 },
    { at: '@trust', beat: ZN, focus: 'inv.meter', fill: 0.8, maxH: 300, sy: 900, st: 'corner-left', pose: 'point', dur: 0.45 },
    { at: '@money#2', beat: GH, focus: 'inv', sy: 860, fill: 0.86, maxH: 860, st: 'corner-left', pose: 'talk', dur: 0.7 },
    // $8M
    { at: '@ended', beat: SB, focus: 'taken', move: 'whip', sx: 540, sy: 800, fill: 0.9, maxH: 900, st: 'corner-left', pose: 'point' },
    { at: '@8', beat: ZN, focus: 'taken.value', fill: 0.9, maxH: 560, sy: 780, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@bucks', beat: GH, focus: 'taken', sy: 800, fill: 0.9, maxH: 900, st: 'corner-left', pose: 'shock', dur: 0.8 },
    // $1,000 a day
    { at: '@Blow', beat: SB, focus: 'cal', move: 'whip', sx: 540, sy: 860, fill: 0.72, maxH: 850, st: 'left', pose: 'point' },
    { at: '@grand', beat: ZN, focus: 'cal.head', fill: 0.8, maxH: 300, sy: 600, st: 'corner', pose: 'point', dur: 0.45 },
    { at: '@every', beat: GH, focus: 'cal', sy: 860, fill: 0.72, maxH: 850, st: 'corner-left', dur: 0.7 },
    { at: '@22', beat: ZN, focus: 'cal.years', fill: 0.8, maxH: 420, sy: 850, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@years+0.25', beat: GH, focus: 'cal', sy: 860, fill: 0.72, maxH: 850, st: 'corner-left', pose: 'idle', dur: 0.8 },
    // costume: fake
    { at: '@But#2', beat: SB, focus: 'cos', move: 'whip', sx: 540, sy: 860, fill: 0.84, maxH: 880, st: 'left', pose: 'point' },
    { at: '@plates#3', beat: ZN, focus: 'cos.plate', fill: 0.28, maxH: 520, sy: 930, st: 'corner', pose: 'point', dur: 0.45 },
    { at: '@badges#2', beat: ZN, focus: 'cos.badge', fill: 0.28, maxH: 520, sy: 930, st: 'corner-left', pose: 'shock', dur: 0.45 },
    { at: '@badges#2+0.7', beat: GH, focus: 'cos', sy: 860, fill: 0.8, maxH: 880, st: 'corner-left', pose: 'idle', dur: 0.8 },
    { at: '@Send', beat: PF, focus: 'cos', sy: 790, pose: 'talk' },
    { at: '@trusts', beat: PF, focus: 'cos', sy: 790, zoom: 1.06, pose: 'shrug', dur: 0.5 },
    // thirty years + cakes
    { at: '@kept', beat: SB, focus: 'span', move: 'whip', sx: 540, sy: 860, fill: 0.84, maxH: 760, st: 'left', pose: 'point' },
    { at: '@30', beat: ZN, focus: 'span.num', fill: 0.8, maxH: 420, sy: 800, st: 'corner', pose: 'shock', dur: 0.5 },
    { at: '@years#2+0.3', beat: GH, focus: 'span', sy: 860, fill: 0.84, maxH: 760, st: 'corner-left', pose: 'idle', dur: 0.8 },
    { at: '@Yes', beat: GH, focus: 'span', sy: 860, fill: 0.84, maxH: 760, st: 'corner-left', pose: 'you', dur: 0.6 },
    { at: '@alive-0.3', beat: ZN, focus: 'span.strip', fill: 0.9, maxH: 420, sy: 900, st: 'corner', pose: 'shrug', dur: 0.5 },
    // recount 11
    { at: '@Remember', beat: PK, focus: 'tally2', move: 'whip', sy: 800, fill: 0.9, maxH: 860, pose: 'chin' },
    { at: '@arrested', beat: GH, focus: 'tally2', sy: 800, fill: 0.9, maxH: 860, st: 'corner-left', pose: 'point', dur: 0.7 },
    { at: '@11#2', beat: ZN, focus: 'tally2.num', fill: 0.8, maxH: 520, sy: 880, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@royalty', beat: PB, focus: 'tally2', fill: 0.86, maxH: 860, sy: 800, st: 'corner-left', dur: 0.6 },
    // verdict
    { at: '@pleaded', beat: SB, focus: 'verdict', move: 'whip', sx: 540, sy: 880, fill: 0.9, maxH: 920, st: 'corner-left', pose: 'shock' },
    { at: '@guilty', beat: ZN, focus: 'verdict.guilty', fill: 0.85, maxH: 420, sy: 800, st: 'corner-left', pose: 'shock', dur: 0.45 },
    { at: '@18', beat: ZN, focus: 'verdict.years', fill: 0.72, maxH: 640, sy: 900, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@prison', beat: GH, focus: 'verdict', sy: 880, fill: 0.9, maxH: 920, st: 'corner-left', pose: 'idle', dur: 0.8 },
    // baby -> graduation
    { at: "@That's", beat: SB, focus: 'rul', move: 'whip', sx: 540, sy: 860, fill: 0.84, maxH: 760, st: 'left', pose: 'point' },
    { at: '@growing', beat: ZN, focus: 'rul.num', fill: 0.7, maxH: 420, sy: 760, st: 'corner', pose: 'point', dur: 0.5 },
    { at: '@graduation', beat: GH, focus: 'rul', sy: 860, fill: 0.84, maxH: 760, st: 'corner-left', pose: 'shock', dur: 0.7 },
    // the slip
    { at: '@So#4', beat: SB, focus: 'cloche2', move: 'whip', sx: 540, sy: 850, fill: 0.8, maxH: 760, st: 'corner-left', pose: 'chin' },
    { at: '@finally', beat: GH, focus: 'cloche2', sy: 850, fill: 0.84, maxH: 760, st: 'corner-left', pose: 'point', dur: 0.8 },
    { at: '@Follow', beat: PF, focus: 'cloche2', sy: 820, pose: 'talk' },
    { at: '@answer', beat: GH, focus: 'cloche2', sy: 860, fill: 0.84, maxH: 760, st: 'peek', pose: 'idle', dur: 0.8 },
    { at: '@At', beat: GH, focus: 'cloche2', fill: 0.88, maxH: 760, sy: 840, st: 'corner-left', pose: 'idle', dur: 1.0 },
    { at: '@pork', beat: ZN, focus: 'cloche2.ticket', fill: 0.78, maxH: 600, sy: 900, st: 'corner-left', pose: 'shock', dur: 0.45 },
    // why
    { at: '@Problem', beat: SB, focus: 'why', move: 'whip', sx: 540, sy: 880, fill: 0.9, maxH: 940, st: 'left', pose: 'point' },
    { at: '@Saudi#2', beat: ZN, focus: 'why.r1', fill: 0.84, maxH: 320, sy: 780, st: 'corner-left', pose: 'point', dur: 0.45 },
    { at: '@Islam', beat: ZN, focus: 'why.r2', fill: 0.84, maxH: 320, sy: 800, st: 'corner-left', pose: 'point', dur: 0.45 },
    { at: '@forbids', beat: GH, focus: 'why', sy: 880, fill: 0.9, maxH: 940, st: 'corner-left', pose: 'talk', dur: 0.7 },
    { at: '@So#6', beat: ZN, focus: 'why.r3', fill: 0.7, maxH: 320, sy: 1000, st: 'corner-left', pose: 'point', dur: 0.45 },
    // victim
    { at: '@victim-0.15', beat: SB, focus: ['pc2', 'diner'], move: 'whip', sx: 540, sy: 860, fill: 0.92, maxH: 920, st: 'corner-left', pose: 'shock' },
    { at: '@suspicious', beat: ZN, focus: 'pc2', fill: 0.78, maxH: 520, sy: 800, st: 'corner-left', pose: 'shock', dur: 0.45 },
    { at: "@what's", beat: PF, focus: ['pc2', 'diner'], sy: 860, pose: 'talk' },
    { at: '@times#3-0.1', beat: SB, focus: ['hook2', 'tally3', 'mug3'], move: 'whip', ...F0, pose: 'shock' },
  ],
  poses: [['@Follow-0.1', 'follow', { target: [830, 1010] }], ['@Follow+1.5', 'talk']],
  shakes: [[0.05, 14], ['@8+1.3', 10], ['@fake', 8], ['@11#2', 14], ['@guilty', 14], ['@18', 12], ['@pork', 26], ['@suspicious', 10]],
  captions: {
    emph: { '8': 'bad', million: 'bad', fake: 'bad', '11': 'bad', '18': 'bad', pork: 'bad', '30': 'accent', '22': 'accent', royalty: 'accent', dumber: 'bad', dumb: 'bad', 'dumbest': 'bad' },
    fix: [['than 8 million', 'than $8 million'], ["how'd he how this dumbest", "how'd he— how'd this dumbass"], ['Follow the', 'Follow, the'], ['answer so dumb.', "answer's so dumb."], ['dumber the pork', 'dumber, the pork']],
    gap: 16,
  },
  bed: { name: 'tense_bed_2', gain: -1 },
  sfx: [
    { at: 0, name: 'deep_boom_2', gain: -3, dur: 0.5 }, { at: 0.06, name: 'rubber_stamp_2', gain: -6, dur: 0.5 }, { at: 0.16, name: 'paper_slam_2', gain: -8, dur: 0.5 },
    { at: '@11', name: 'thud_1', gain: -9, dur: 0.4 },
    { at: '@Okay', name: 'rewind_2', gain: -11, dur: 0.7 }, { at: '@Anthony', name: 'click_1', gain: -8, dur: 0.3 },
    { at: '@Now', name: 'swipe_2', gain: -11, dur: 0.4 }, { at: '@lies', name: 'pop_1', gain: -9, dur: 0.4 },
    { at: '@His', name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@Saudi', name: 'click_1', gain: -8, dur: 0.3 },
    { at: "@You'd", name: 'swipe_2', gain: -11, dur: 0.4 }, { at: '@Miami', name: 'pop_2', gain: -9, dur: 0.4 },
    { at: '@Ferrari+0.1', name: 'swoosh_2', gain: -10, dur: 0.9 }, { at: '@plates', name: 'ding_2', gain: -10, dur: 0.6 }, { at: '@diplomatic#2', name: 'click_2', gain: -8, dur: 0.3 }, { at: '@badges', name: 'ding_2', gain: -10, dur: 0.6 },
    { at: '@heart', name: 'heartbeat_1', gain: -8, dur: 0.9 },
    { at: '@investors', name: 'pop_2', gain: -10, dur: 0.4 }, { at: '@trust', name: 'money_counter_2', gain: -13, dur: 0.9 },
    { at: '@ended', name: 'coins_drop_1', gain: -12, dur: 1.2 }, { at: '@8', name: 'money_counter_2', gain: -10, dur: 1.3 }, { at: '@8+1.3', name: 'cash_register_1', gain: -8, dur: 0.9 },
    { at: '@Blow+0.2', name: 'money_counter_2', gain: -13, dur: 1.2 }, { at: '@22', name: 'ding_2', gain: -9, dur: 0.7 },
    { at: '@But#2', name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@fake', name: 'rubber_stamp_2', gain: -5, dur: 0.5 }, { at: '@badges#2', name: 'rubber_stamp_2', gain: -5, dur: 0.5 },
    { at: '@Send', name: 'swoosh_2', gain: -9, dur: 1.0 },
    { at: '@kept', name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@30', name: 'deep_boom_2', gain: -7, dur: 0.4 }, { at: '@Yes+0.2', name: 'pop_2', gain: -10, dur: 0.4 },
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
