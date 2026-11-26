import sys; sys.path.insert(0,'.')
from crime_edit import *
c=Cut('tt.js')
c.r("title: 'CASE: FAKE PRINCE · 2017'","title: 'CASE FILE Nº 026 · FAKE PRINCE'")
c.r("const F0 = { sx: 540, sy: 930, fill: 0.98, maxH: 960, st: { x: 540, y: 1400, s: 0.8 } };","const F0 = { sx: 540, sy: 865, fill: 0.98, maxH: 920, st: { x: 915, y: 1395, s: 0.85 } };")
c.delete('tally0'); c.delete('tally3')
c.repl('mug0',"    { id: 'mug0', type: 'suspect', at: [0, 30], in: -0.12, props: { %s, w: 460, %s, %s, flash: false, tilt: 0.02, stamps: [{ text: 'ARRESTED', at: '@11', size: 66, x: 0, y: 40, rot: -0.1 }] } },"%(SUS,NAME,NICK))
c.repl('mug3',"    { id: 'mug3', type: 'suspect', at: [0, 30], in: '@times#3-0.15', props: { %s, w: 460, %s, %s, flash: false, tilt: 0.02, stamps: [{ text: 'ARRESTED', at: '@times#3+0.2', size: 66, x: 0, y: 40, rot: -0.1 }] } },"%(SUS,NAME,NICK))
c.repl('mug2',"    { id: 'mug2', type: 'suspect', at: [1700, 30], in: '@Okay-0.35', props: { %s, variant: 'card', file: true, caseNo: 'CASE FILE Nº 026', w: 480, %s, %s, credit: 'MIAMI-DADE COUNTY BOOKING PHOTO · PUBLIC DOMAIN', tilt: -0.03, push: { at: '@Okay', dur: 4.5, to: 1.55 }, stringTo: [660, 330], stringAt: '@rewind+0.4', ring: '@Anthony+0.2' } },"%(SUS,NAME,NICK))
c.repl('quote',"    { id: 'quote', type: 'text', at: [5400, -420], in: '@Saudi-0.3', out: \"@You'd-0.1\", props: { lines: [[['HIS LIE:', 'gold']]], size: 64 } },")
c.repl('pc',"    { id: 'sus3', type: 'suspect', at: [5400, 40], in: '@His-0.3', props: { %s, variant: 'side', w: 1000, pw: 430, aspect: 1.12, %s, %s, quote: [['I\\'M A', 'ink'], ['SAUDI', 'ink'], ['PRINCE', 'bad']], quoteAt: '@Saudi', quoteSize: 74, quoteSub: 'HIS LIE · NOT TRUE', push: { at: '@Saudi-0.3', dur: 2.6, to: 1.5 }, crownAt: '@prince', stamps: [{ text: 'NOT TRUE', at: '@prince+0.5', size: 60, x: -190, y: 150, rot: -0.12 }] } },"%(SUS,NAME,NICK))
c.after('stepB',"    { id: 'pip1', type: 'suspect', layer: 'screen', at: [880, 1130], in: '@Step-0.3', out: '@Tap-0.25', props: { %s, variant: 'pip', w: 200, label: 'HIS TRICK', tilt: 0.03, arrow: { at: '@Step+0.2', to: [-400, -330] } } },"%SUS)
c.repl('inv',"    { id: 'vinv', type: 'victim', at: [3330, 1800], in: '@So#2-0.3', props: { kind: 'investor', label: 'THE INVESTORS', sub: 'THE PEOPLE WHO LOST', reactAt: '@money#2+0.4' } },\n    { id: 'def', type: 'text', at: [3950, 1790], in: '@trust-0.2', props: { lines: [[['LOOKS RICH', 'gold']], [['= TRUST', 'paper']], [['= THEIR MONEY', 'bad']]], size: 58 } },")
c.repl('cos',"    { id: 'cos', type: 'suspect', at: [-250, 3600], in: '@But#2-0.3', props: { %s, w: 470, %s, %s, tilt: -0.02, crownAt: '@But#2-0.1', stamps: [{ text: 'FAKE PLATES', at: '@plates#3', size: 54, x: 0, y: -60, rot: -0.12 }, { text: 'FAKE BADGES', at: '@badges#2', size: 54, x: 0, y: 80, rot: 0.1 }] } },\n    { id: 'tplate', type: 'tile', at: [200, 3470], in: '@But#2', props: { icon: 'plate', caption: 'CAR PLATE', stamp: 'FAKE', stampAt: '@plates#3', tilt: 0.05 } },\n    { id: 'tbadge', type: 'tile', at: [200, 3790], in: '@But#2+0.2', props: { icon: 'badge', caption: 'BADGE', stamp: 'FAKE', stampAt: '@badges#2', tilt: -0.04 } },"%(SUS,NAME,NICK))
c.repl('tally2',"""    { id: 'board', type: 'board', at: [3600, 3600], in: '@Remember-0.4', props: { title: 'EVIDENCE BOARD', caseNo: 'CASE FILE Nº 026', tightAt: '@royalty', items: [
      { id: 'ph', k: 'photo', src: MUG, crop: [0.5, 0, 0.5, 1], fx: 0.5, fy: 0.42, x: 0, y: -280, w: 330, h: 400, name: 'ANTHONY GIGNAC', nameSize: 26, at: '@Remember-0.2', rot: -0.02, push: 0.3 },
      { id: 'pl', k: 'note', x: -300, y: 120, w: 270, h: 290, icon: 'plate', size: 34, lines: [['FAKE PLATES', 'bad']], at: '@Remember+0.3', rot: -0.05 },
      { id: 'bg', k: 'note', x: 0, y: 150, w: 270, h: 290, icon: 'badge', size: 34, lines: [['FAKE BADGES', 'bad']], at: '@Remember+0.6', rot: 0.03 },
      { id: 'ca', k: 'note', x: 300, y: 120, w: 270, h: 290, icon: 'cash', size: 34, lines: [['$8M+ LOST', 'bad']], at: '@Remember+0.9', rot: 0.05 },
      { id: 'n11', k: 'note', x: 0, y: 440, w: 640, h: 270, size: 150, lines: [['11×', 'bad', 150]], at: '@arrested-0.1', rot: -0.02, stamp: { text: 'PROSECUTORS SAID', at: '@said', y: 82, size: 30, rot: -0.04 } } ],
      strings: [[0, 1, '@Remember+0.5'], [0, 2, '@Remember+0.8'], [0, 3, '@Remember+1.1'], [0, 4, '@arrested+0.2'], [1, 4, '@royalty-0.2'], [2, 4, '@royalty-0.1'], [3, 4, '@royalty']] } },""")
c.repl('verdict',"""    { id: 'sv', type: 'suspect', at: [5080, 3600], in: '@pleaded-0.4', props: { %s, w: 470, %s, %s, tilt: -0.02, mono: true, push: { at: '@pleaded', dur: 3.2, to: 1.4 }, stamps: [{ text: 'GUILTY', at: '@guilty', size: 74, x: 0, y: -30, rot: -0.1 }], bars: '@sentenced' } },
    { id: 'vc', type: 'counter', at: [5780, 3560], in: '@pleaded-0.3', props: { to: 18, at: '@18', dur: 0.7, suffix: '+', size: 170, tone: 'bad', label: 'YEARS IN PRISON', sub: 'MAY 31, 2019', w: 460 } },"""%(SUS,NAME,NICK))
c.after('cloche2',"    { id: 'sus15', type: 'suspect', at: [8500, 3700], in: '@So#4-0.4', props: { %s, w: 330, name: 'THE PRINCE', tilt: -0.03, crownAt: '@So#4-0.3', ring: '@pork+0.3', nameSize: 38 } },"%SUS)
c.repl('pc2',"    { id: 'sus17', type: 'suspect', at: [12450, 3600], in: '@victim-0.55', props: { %s, w: 400, %s, %s, tilt: -0.03, crownAt: 0, crownOff: '@suspicious', stamps: [{ text: 'OUT OF CHARACTER', at: '@victim-0.1', size: 40, x: 0, y: 40, rot: -0.1 }], stringTo: [700, 90], stringAt: '@victim' } },"%(SUS,NAME,NICK))
c.repl('diner',"    { id: 'diner', type: 'victim', at: [13200, 3640], in: '@victim-0.5', props: { kind: 'diner', label: 'THE VICTIM', sub: 'AT THE DINNER', reactAt: '@suspicious', w: 380, h: 480, tape: 'WITNESS' } },")
c.r("in: \"@you'd\", out: '@So#2-0.2'","in: \"@you'd#2\", out: '@So#2-0.2'")
c.r("in: '@rewind', out: '@Now-0.1'","in: '@rewind', out: '@Anthony-0.1'")
c.after('pip1',"""    { id: 'dc1', type: 'datecard', layer: 'screen', at: [340, 480], in: '@Anthony-0.1', out: '@Anthony+1.4', props: { kicker: 'CASE FILE Nº 026 · THE PITCH', big: 'FLORIDA', small: 'THE ACT: 1988 → 2017' } },
    { id: 'dc3', type: 'datecard', layer: 'screen', at: [340, 480], in: '@Remember-0.15', out: '@Remember+1.1', props: { kicker: 'CHAPTER 3', big: 'THE FALLOUT', small: 'MONEY · ARRESTS' } },
    { id: 'dc4', type: 'datecard', layer: 'screen', at: [340, 480], in: '@pleaded-0.1', out: '@guilty+0.1', props: { kicker: 'S.D. FLORIDA · FEDERAL COURT', big: 'THE VERDICT', small: 'PER DOJ' } },""")
stepfix(c)
hudlabels(c,[('-1',"THE PITCH"),("'@Step-0.25'","THE TRICK"),("'@So#2-0.2'","THE MONEY"),("'@kept-0.25'","THE FALLOUT"),("'@pleaded-0.1'","THE SENTENCE"),("'@So#4-0.2'","THE CATCH")])
# ids in labels: first at is number -1, rest quoted; fix quoting of -1 handled by caller
tail_beats(c,[("['hook', 'tally0', 'mug0']","['hook', 'mug0']"),("['hook2', 'tally3', 'mug3']","['hook2', 'mug3']"),
("focus: ['mug2', 'rw']","focus: ['mug2', 'rw']"),("focus: 'mug2.name', fill: 0.5, maxH: 300, sy: 1010","focus: 'mug2.face', fill: 0.55, maxH: 520, sy: 990"),
("focus: ['pc', 'quote']","focus: 'sus3'"),("focus: 'quote', fill: 0.9","focus: 'sus3.quote', fill: 0.55"),
("focus: 'inv', move","focus: ['vinv', 'def'], move"),("focus: 'inv.figs', fill: 0.9, maxH: 440","focus: 'vinv.face', fill: 0.62, maxH: 520"),("focus: 'inv.meter', fill: 0.8, maxH: 300","focus: 'def', fill: 0.62, maxH: 400"),("focus: 'inv', sy","focus: ['vinv', 'def'], sy"),
("focus: 'cos', move","focus: ['cos', 'tplate', 'tbadge'], move"),("focus: 'cos.plate', fill: 0.28, maxH: 520","focus: 'tplate', fill: 0.34, maxH: 520"),("focus: 'cos.badge', fill: 0.28, maxH: 520","focus: 'tbadge', fill: 0.34, maxH: 520"),("focus: 'cos', sy","focus: ['cos', 'tplate', 'tbadge'], sy"),
("focus: 'tally2', move","focus: 'board', move"),("focus: 'tally2', sy","focus: 'board', sy"),("focus: 'tally2.num', fill: 0.8, maxH: 520","focus: 'board.n11', fill: 0.62, maxH: 520"),("focus: 'tally2', fill","focus: 'board', fill"),
("focus: 'verdict', move","focus: ['sv', 'vc'], move"),("focus: 'verdict.guilty', fill: 0.85, maxH: 420","focus: 'sv', fill: 0.8, maxH: 780"),("focus: 'verdict.years', fill: 0.72, maxH: 640","focus: 'vc.value', fill: 0.62, maxH: 560"),("focus: 'verdict', sy","focus: ['sv', 'vc'], sy"),
("focus: ['pc2', 'diner']","focus: ['sus17', 'diner']"),("focus: 'pc2', fill: 0.78","focus: 'sus17', fill: 0.62"),
("focus: 'cloche2', move","focus: ['cloche2', 'sus15'], move"),("focus: 'cloche2', sy","focus: ['cloche2', 'sus15'], sy"),("focus: 'cloche2', fill","focus: ['cloche2', 'sus15'], fill"),
("focus: 'sus3', move: 'whip', sx: 540, sy: 820, fill: 0.78, maxH: 1000, st: 'left'","focus: 'sus3', move: 'whip', sx: 540, sy: 820, fill: 0.78, maxH: 1000, st: { x: 905, y: 1385, s: 0.9 }"),
("focus: 'mug2', 'rw'","focus: 'mug2', 'rw'",) if False else ("focus: ['mug2', 'rw'], move: 'whip', sx: 540, sy: 850, fill: 0.9, maxH: 1000","focus: ['mug2', 'rw'], move: 'whip', sx: 540, sy: 950, fill: 0.9, maxH: 900"),
])
fixfocus(c)
storyright(c,['mug','mug2','sus3','suspc','sv','cos','sus17','sus15','susd','sus0','mug0'])
add_sfx(c,[(0.05,'camera_shutter_1',-12,0.4),("'@Okay'",'camera_shutter_2',-12,0.4),("'@His'",'camera_shutter_1',-12,0.4),("'@Step'",'typewriter_2',-12,0.8),("'@But#2'",'camera_shutter_2',-12,0.4),("'@Remember-0.2'",'camera_shutter_1',-12,0.4),("'@pleaded'",'camera_shutter_2',-12,0.4),("'@sentenced'",'cell_door_1',-10,0.9),("'@guilty'",'rubber_stamp_1',-10,0.5),("'@So#4-0.1'",'suspense_drone_1',-14,3.0),("'@victim-0.5'",'camera_shutter_1',-12,0.4),("'@Remember+0.3'",'paper_slam_1',-12,0.4),("'@arrested'",'rubber_stamp_2',-11,0.5)])
c.save('tt.crime.js')
