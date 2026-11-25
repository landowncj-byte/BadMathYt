// Instagram/Facebook cut v3 (opens on the PORK order). World (px): row0 hook comp(0,0)+why(1300,190) pcard(3100,0) mug(4700,30) con(6700,0) span(8500,0)
// row1 (y1800) q(8500) plates(6700) guards(4900) investors(3100) taken(1300) calendar(-500) · row2 (y3600) costume(-500) tally(1300) dinner(3100) verdict(4900) ruler(6700) finale(8500)
const SB = 'side-by-side', GH = 'graphic-hero', ZN = 'zoom-on-number', PF = 'presenter-front', PK = 'peek', PB = 'pull-back';
const MUG = 'brand/photos/anthony-gignac/1.jpg';
const HOOK = { lines: [[['FAKE SAUDI PRINCE', 'paper']], [['THEN ORDERED PORK', 'bad']]], sizes: [96, 96] };
const F0 = { sx: 540, sy: 930, fill: 0.98, maxH: 960, st: { x: 130, y: 1350, s: 1.1 } };
BM2.scene({
  series: 'decoded', title: 'CASE: FAKE PRINCE · 2017', duration: 87.08,
  footnote: ['PLEADED GUILTY 2018 · SENTENCED MAY 31, 2019 · SOURCES: DOJ S.D. FLORIDA, AP', 'ABOUT 30 YEARS = 1988 TO THE 2017 ARREST · ILLUSTRATIONS / PROPS (GENERIC)', 'PHOTO: MIAMI-DADE COUNTY BOOKING PHOTO · PUBLIC DOMAIN VIA WIKIMEDIA COMMONS'],
  elements: [
    // ---- S0 frame 0 (loop target): crown + PORK ticket ----
    { id: 'hook', type: 'hook', at: [0, -430], in: 0, out: '@dinner+0.05', props: HOOK },
    { id: 'hook2', type: 'hook', at: [0, -430], in: '@noticed-0.15', props: HOOK },
    { id: 'royal', type: 'royal', at: [-250, 170], in: -1, props: { crownAt: 0, offAt: 60, reAt: '@noticed-0.1' } },
    { id: 'spike', type: 'spike', at: [300, 190], scale: 0.85, in: -1, props: { slamIn: false } },
    { id: 'spike2', type: 'spike', at: [300, 190], scale: 0.85, in: '@noticed-0.1', props: { slamIn: true } },
    // ---- S1 why it matters (beside the ticket) ----
    { id: 'why', type: 'whycard', at: [1300, 190], in: '@But-0.4', props: { head: 'THE PROBLEM', a1: '@Saudi#2', a2: '@Islam', a3: '@So', r3: ['SO ONE ORDER', 'BLEW UP HIS STORY'] } },
    // ---- S2 the PRINCE card cracks ----
    { id: 'pc', type: 'pcard', at: [3100, 80], in: '@made-0.5', props: { sub: 'HIS CHARACTER', crackAt: '@damn', stampAt: '@suspicious' } },
    // ---- S3 who ----
    { id: 'mug', type: 'photo', at: [4600, 30], in: "@He's-0.35", props: { src: MUG, name: 'ANTHONY GIGNAC', role: 'FLORIDA · MIAMI BOOKING PHOTO', credit: 'MIAMI-DADE COUNTY · PUBLIC DOMAIN', treatment: 'mugshot', w: 450, aspect: 1.02, fx: 0.74, fy: 0.4, tilt: -0.03 } },
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
    { id: 'inv', type: 'investors', at: [3100, 1800], in: '@Now#2-0.3', props: { head: 'INVESTORS', figAt: '@investors', meter: 'LEGIT', meterAt: '@legit', mdur: 0.8 } },
    { id: 'taken', type: 'taken', at: [1300, 1800], in: '@lost-0.4', props: { at: '@8', dur: 1.3, brickAt: '@lost+0.2' } },
    { id: 'cal', type: 'calendar', at: [-500, 1800], in: '@Spend-0.4', props: { at: '@Spend+0.2', dur: 1.7, yrsAt: '@22', yrsDur: 0.9, to: 22 } },
    { id: 'cos', type: 'costume', at: [-500, 3600], in: '@But#3-0.3', props: { plateAt: '@But#3', badgeAt: '@But#3+0.3', fakeAt: '@fake#2', fake2At: '@badges#2' } },
    { id: 'tally', type: 'tally', at: [1300, 3600], in: '@gets-0.5', props: { at: '@arrested', dur: 1.05, tabAt: '@Prosecutors', srcAt: '@said' } },
    // ---- dinner (back at the table) ----
    { id: 'royal2', type: 'royal', at: [2750, 3760], scale: 0.7, in: '@dinner#2-0.5', props: { crownAt: '@dinner#2-0.2', offAt: '@suspicious#2+0.2', reAt: 99999 } },
    { id: 'spike3', type: 'spike', at: [3250, 3370], scale: 0.6, in: '@order#2-0.2', props: { slamIn: true } },
    { id: 'diner', type: 'diner', at: [3600, 3820], scale: 0.8, in: '@victim-0.5', props: { at: '@victim', tagAt: '@watched' } },
    // ---- verdict + 18 years ----
    { id: 'verdict', type: 'verdict', at: [4900, 3600], in: '@Then#4-0.4', props: { guiltyAt: '@guilty', yearsAt: '@18', subAt: '@prison' } },
    { id: 'rul', type: 'ruler18', at: [6700, 3600], in: "@That's-0.4", props: { at: '@newborn', dur: 2.0, toy: 'rattle' } },
    // ---- finale ----
    { id: 'fin', type: 'text', at: [8500, 3450], in: '@30#3-0.2', props: { lines: [[['30 YEARS A PRINCE', 'paper']], [['ONE PORK ORDER', 'bad']]], size: 90 } },
    { id: 'tip', type: 'slamstamp', at: [8500, 3900], rot: -0.06, in: '@tipped-0.1', props: { text: 'TIPPED OFF', tone: 'bad', size: 112 } },
    // ---- screen overlays ----
    { id: 'hell', type: 'text', layer: 'screen', at: [540, 440], in: '@So#2', out: '@Look-0.1', props: { lines: [[['HOW THE HELL DID', 'paper']], [['ANYBODY BELIEVE HIM?', 'gold']]], size: 66 } },
    { id: 'props', type: 'text', layer: 'screen', at: [540, 440], in: '@Look', out: '@First-0.15', props: { lines: [[['LOOK AT', 'paper']], [['THE PROPS', 'gold']]], size: 80 } },
    { id: 'stepA', type: 'text', layer: 'screen', at: [540, 440], in: '@First', out: '@Then#2-0.15', props: { lines: [[['PROP 1', 'gold']], [['PLATES ONLY FOREIGN OFFICIALS GET', 'paper']]], size: 50 } },
    { id: 'stepB', type: 'text', layer: 'screen', at: [540, 440], in: '@Then#2', out: '@Now#2-0.15', props: { lines: [[['PROP 2', 'gold']], [['LIKE REAL GOVERNMENT AGENTS', 'paper']]], size: 56 } },
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
      labels: [{ at: -1, text: 'THE SLIP' }, { at: '@but#2-0.1', text: 'THE PITCH' }, { at: '@Look-0.1', text: 'THE PROPS' }, { at: '@Now#2-0.2', text: 'THE MONEY' }, { at: '@Then#3-0.2', text: 'THE SLIP' }, { at: '@Then#4-0.2', text: 'THE SENTENCE' }],
      items: [{ at: 0, label: 'PORK ORDERS THAT BLEW IT', from: 0, to: 1, dur: 0.9 }, { at: '@zero', label: 'ROYAL BLOOD', to: 0, dur: 0.5 }, { at: '@kept', label: 'YEARS OF THE ACT', from: 0, to: 30, dur: 1.7, prefix: '~' },
        { at: '@First', label: 'PROPS SO FAR', from: 0, to: 1, dur: 0.4 }, { at: '@Then#2', label: 'PROPS SO FAR', to: 2, dur: 0.4 },
        { at: '@lost', label: 'INVESTORS LOST (MORE THAN)', from: 0, to: 8000000, dur: 1.4, prefix: '$' }, { at: '@Spend+0.2', label: 'DAYS AT $1,000', from: 0, to: 8000, dur: 1.9, suffix: ' DAYS' }, { at: '@22', label: 'THAT IS', to: 22, dur: 0.8, suffix: ' YEARS' },
        { at: '@fake#2', label: 'PROPS THAT WERE REAL', to: 0, dur: 0.5 }, { at: '@arrested', label: 'ARRESTED OR CONVICTED', from: 0, to: 11, dur: 1.0, suffix: '×' }, { at: '@order#2', label: 'DINNER ORDERS THAT TIPPED IT', to: 1, dur: 0.4 },
        { at: '@18', label: 'YEARS IN PRISON', from: 0, to: 18, dur: 0.7, suffix: '+' }, { at: '@30#3', label: 'YEARS AS A PRINCE', to: 30, dur: 0.8, prefix: '~' }, { at: '@noticed-0.2', label: 'PORK ORDERS THAT BLEW IT', to: 1, dur: 0.5 }] } },
  ],
  beats: [
    { at: 0, beat: SB, focus: ['hook', 'royal', 'spike'], ...F0, pose: 'shock' },
    { at: '@pork', beat: ZN, focus: ['hook', 'royal', 'spike'], sx: 540, sy: 930, fill: 1.06, maxH: 960, st: F0.st, dur: 0.45 },
    { at: '@dinner', beat: SB, focus: ['hook', 'royal', 'spike'], ...F0, pose: 'shock', dur: 0.6 },
    // the problem
    { at: '@But', beat: SB, focus: 'why', move: 'whip', sx: 540, sy: 880, fill: 0.9, maxH: 940, st: 'corner-left', pose: 'point' },
    { at: '@Saudi#2', beat: ZN, focus: 'why.r1', fill: 0.84, maxH: 320, sy: 780, st: 'corner-left', pose: 'point', dur: 0.45 },
    { at: '@Islam', beat: ZN, focus: 'why.r2', fill: 0.84, maxH: 320, sy: 800, st: 'corner-left', pose: 'point', dur: 0.45 },
    { at: '@pork#2', beat: GH, focus: 'why', sy: 880, fill: 0.9, maxH: 940, st: 'corner-left', pose: 'talk', dur: 0.7 },
    { at: '@So', beat: ZN, focus: 'why.r3', fill: 0.7, maxH: 320, sy: 1000, st: 'corner-left', pose: 'shock', dur: 0.45 },
    // the card cracks
    { at: '@made', beat: SB, focus: 'pc', move: 'whip', sx: 540, sy: 860, fill: 0.86, maxH: 700, st: 'corner-left', pose: 'shock' },
    { at: '@suspicious', beat: ZN, focus: 'pc', fill: 0.9, maxH: 640, sy: 880, st: 'corner-left', pose: 'shock', dur: 0.45 },
    // rewind: whole world, then who
    { at: '@but#2', beat: 'wide', st: 'corner', pose: 'shrug', dur: 0.8 },
    { at: "@He's", beat: SB, focus: ['mug', 'zero'], move: 'whip', sx: 540, sy: 850, fill: 0.9, maxH: 1000, st: 'corner-left', pose: 'shrug' },
    { at: '@Anthony', beat: ZN, focus: 'mug.name', fill: 0.5, maxH: 300, sy: 1010, st: 'corner-left', pose: 'point', dur: 0.45 },
    { at: '@zero', beat: SB, focus: ['mug', 'zero'], sx: 540, sy: 800, fill: 0.95, maxH: 1000, st: 'corner-left', pose: 'shock', dur: 0.8 },
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
    { at: '@Now#2', beat: SB, focus: 'inv', move: 'whip', sx: 540, sy: 860, fill: 0.86, maxH: 860, st: 'left', pose: 'point' },
    { at: '@legit', beat: ZN, focus: 'inv.meter', fill: 0.8, maxH: 300, sy: 900, st: 'corner-left', pose: 'shock', dur: 0.45 },
    { at: '@investors', beat: ZN, focus: 'inv.figs', fill: 0.9, maxH: 440, sy: 920, st: 'corner', pose: 'point', dur: 0.5 },
    { at: '@trusted', beat: GH, focus: 'inv', sy: 860, fill: 0.86, maxH: 860, st: 'corner-left', pose: 'talk', dur: 0.7 },
    { at: '@Send', beat: PF, focus: 'inv', sy: 790, pose: 'shrug' },
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
    { at: '@But#3', beat: SB, focus: 'cos', move: 'whip', sx: 540, sy: 860, fill: 0.84, maxH: 880, st: 'left', pose: 'point' },
    { at: '@plates#3', beat: ZN, focus: 'cos.plate', fill: 0.28, maxH: 520, sy: 930, st: 'corner', pose: 'point', dur: 0.45 },
    { at: '@badges#2', beat: ZN, focus: 'cos.badge', fill: 0.28, maxH: 520, sy: 930, st: 'corner-left', pose: 'shock', dur: 0.45 },
    { at: '@badges#2+0.7', beat: GH, focus: 'cos', sy: 860, fill: 0.8, maxH: 880, st: 'corner-left', pose: 'idle', dur: 0.8 },
    // eleven
    { at: '@gets', beat: PK, focus: 'tally', move: 'whip', sy: 800, fill: 0.9, maxH: 860, pose: 'chin' },
    { at: '@Prosecutors', beat: GH, focus: 'tally', sy: 800, fill: 0.9, maxH: 860, st: 'corner-left', pose: 'point', dur: 0.7 },
    { at: '@11', beat: ZN, focus: 'tally.num', fill: 0.8, maxH: 520, sy: 880, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@royalty', beat: PB, focus: 'tally', fill: 0.86, maxH: 860, sy: 800, st: 'corner-left', dur: 0.6 },
    // that dinner
    { at: '@Then#3', beat: SB, focus: ['royal2', 'spike3', 'diner'], move: 'whip', sx: 540, sy: 860, fill: 0.94, maxH: 1000, st: 'corner-left', pose: 'shock' },
    { at: '@victim', beat: ZN, focus: 'diner', fill: 0.62, maxH: 640, sy: 900, st: 'corner-left', pose: 'shock', dur: 0.45 },
    { at: '@order#2', beat: ZN, focus: 'spike3', fill: 0.6, maxH: 640, sy: 800, st: 'corner-left', pose: 'shock', dur: 0.4 },
    { at: '@suspicious#2', beat: SB, focus: ['royal2', 'spike3', 'diner'], sx: 540, sy: 860, fill: 0.94, maxH: 1000, st: 'corner-left', pose: 'shock', dur: 0.7 },
    { at: '@Follow', beat: PF, focus: ['royal2', 'spike3', 'diner'], sy: 840, pose: 'talk' },
    { at: '@how#2', beat: PK, focus: ['royal2', 'spike3', 'diner'], sy: 880, fill: 0.9, maxH: 1000, pose: 'idle', dur: 0.8 },
    // verdict (payoff)
    { at: '@Then#4', beat: SB, focus: 'verdict', move: 'whip', sx: 540, sy: 880, fill: 0.9, maxH: 920, st: 'corner-left', pose: 'shock' },
    { at: '@pleaded', beat: GH, focus: 'verdict', sy: 880, fill: 0.9, maxH: 920, st: 'corner-left', pose: 'point', dur: 0.6 },
    { at: '@guilty', beat: ZN, focus: 'verdict.guilty', fill: 0.85, maxH: 420, sy: 800, st: 'corner-left', pose: 'shock', dur: 0.45 },
    { at: '@18', beat: ZN, focus: 'verdict.years', fill: 0.72, maxH: 640, sy: 900, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@prison', beat: GH, focus: 'verdict', sy: 880, fill: 0.9, maxH: 920, st: 'corner-left', pose: 'idle', dur: 0.8 },
    // newborn -> graduate
    { at: "@That's", beat: SB, focus: 'rul', move: 'whip', sx: 540, sy: 860, fill: 0.84, maxH: 760, st: 'left', pose: 'point' },
    { at: '@growing', beat: ZN, focus: 'rul.num', fill: 0.7, maxH: 420, sy: 760, st: 'corner', pose: 'point', dur: 0.5 },
    { at: '@high', beat: GH, focus: 'rul', sy: 860, fill: 0.84, maxH: 760, st: 'corner-left', pose: 'shock', dur: 0.7 },
    // finale + loop
    { at: '@30#3', beat: SB, focus: ['fin', 'tip'], move: 'whip', sx: 540, sy: 880, fill: 0.78, maxH: 1000, st: 'corner-left', pose: 'idle' },
    { at: '@tipped', beat: ZN, focus: 'tip', fill: 0.6, maxH: 420, sy: 900, st: 'corner-left', pose: 'shock', dur: 0.4 },
    { at: '@Would', beat: PF, focus: ['fin', 'tip'], sy: 880, pose: 'talk' },
    { at: '@noticed', beat: SB, focus: ['hook2', 'royal', 'spike2'], move: 'whip', ...F0, pose: 'shock' },
  ],
  poses: [['@Follow-0.1', 'follow', { target: [830, 1010] }], ['@Follow+1.5', 'talk']],
  shakes: [[0.05, 14], ['@8+1.3', 10], ['@fake#2', 8], ['@11', 14], ['@guilty', 12], ['@18', 20], ['@order#2', 14], ['@tipped', 12]],
  captions: {
    emph: { '8': 'bad', million: 'bad', fake: 'bad', '11': 'bad', '18': 'bad', pork: 'bad', '30': 'accent', '22': 'accent', royalty: 'accent', dumber: 'bad', dumbass: 'bad', 'dumbest': 'bad' },
    fix: [],
    gap: 16,
  },
  bed: { name: 'tense_bed_2', gain: -1 },
  sfx: [
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
    { at: '@But#3', name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@fake#2', name: 'rubber_stamp_2', gain: -5, dur: 0.5 }, { at: '@badges#2', name: 'rubber_stamp_2', gain: -5, dur: 0.5 },
    { at: '@gets', name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@arrested', name: 'typewriter_1', gain: -12, dur: 1.0 }, { at: '@11', name: 'deep_boom_2', gain: -6, dur: 0.4 }, { at: '@said', name: 'rubber_stamp_2', gain: -8, dur: 0.5 },
    { at: '@Then#3', name: 'swipe_2', gain: -11, dur: 0.4 }, { at: '@order#2', name: 'cinematic_hit_1', gain: -4, dur: 1.2 }, { at: '@victim', name: 'pop_1', gain: -8, dur: 0.5 }, { at: '@suspicious#2+0.2', name: 'thud_1', gain: -8, dur: 0.4 },
    { at: '@Follow+0.5', name: 'click_1', gain: -8, dur: 0.3 }, { at: '@Follow+0.58', name: 'success_chime_1', gain: -12, dur: 1.0 },
    { at: '@Then#4-0.9', name: 'riser_2', gain: -14, dur: 0.9 }, { at: '@guilty', name: 'gavel_1', gain: -4, dur: 0.8 }, { at: '@18', name: 'gavel_2', gain: -3, dur: 0.8 }, { at: '@18', name: 'cinematic_hit_1', gain: -3, dur: 1.2 }, { at: '@18', name: 'deep_boom_1', gain: -3, dur: 1.4 }, { at: '@18+0.7', name: 'cell_door_1', gain: -8, dur: 1.0 },
    { at: "@That's", name: 'swipe_2', gain: -11, dur: 0.4 }, { at: '@high+0.3', name: 'success_chime_1', gain: -14, dur: 1.0 },
    { at: '@30#3', name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@tipped', name: 'rubber_stamp_2', gain: -5, dur: 0.5 }, { at: '@tipped', name: 'deep_boom_2', gain: -8, dur: 0.5 },
    { at: '@Would', name: 'pop_1', gain: -9, dur: 0.5 }, { at: '@noticed', name: 'thud_1', gain: -8, dur: 0.4 }, { at: '@noticed', name: 'paper_slam_2', gain: -8, dur: 0.5 },
  ],
});
