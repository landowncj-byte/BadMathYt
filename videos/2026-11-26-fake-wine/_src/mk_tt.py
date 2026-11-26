import sys; sys.path.insert(0,'.')
from crime_edit import *
from _board import BOARD, make
c=Cut('tt.js')
c.r("title: 'CASE: KURNIAWAN · 2013'","title: 'CASE FILE Nº 027 · KURNIAWAN'")
c.r("size: 66, per: 0","size: 66, per: 0")
c.r("{ id: 'hook', type: 'text', at: [0, -520],","{ id: 'hook', type: 'text', at: [0, -450],")
c.r("{ id: 'cheque', type: 'cheque', at: [0, 20], in: -1,","{ id: 'cheque', type: 'cheque', at: [290, 70], scale: 0.58, in: -1,")
c.r("{ id: 'fake', type: 'slamstamp', at: [210, 250], rot: 0.1, in: -1, props: { text: 'FAKE?', tone: 'bad', size: 130 } },","{ id: 'fake', type: 'slamstamp', at: [330, 290], rot: 0.1, in: -1, props: { text: 'FAKE?', tone: 'bad', size: 100 } },\n    { id: 'sus0', type: 'suspect', at: [-190, 30], in: -1, props: { %s, w: 380, %s, %s, flash: false, tilt: -0.02, stamps: [{ text: 'THE SELLER', at: -0.3, size: 44, x: 0, y: 70, rot: -0.08 }] } },"%(SUS,NAME,NICK))
c.repl('tag',"    { id: 'tag', type: 'suspect', at: [1560, 20], in: '@so#1-0.1', props: { %s, variant: 'card', file: true, caseNo: 'CASE FILE Nº 027', w: 450, %s, %s, tag: 'WINE COLLECTOR · CALIFORNIA', credit: 'U.S. ICE · PUBLIC DOMAIN', tilt: -0.03, push: { at: '@so#1', dur: 5.5, to: 1.5 }, stringTo: [640, 330], stringAt: '@a#4-0.4', ring: '@rudy#1+0.2' } },"%(SUS,NAME,NICK))
c.repl('gav2',"    { id: 'sus7', type: 'suspect', at: [3650, 1840], in: '@one#1-0.3', props: { %s, variant: 'side', noquote: true, w: 980, pw: 420, aspect: 1.1, %s, %s, quote: [['WORLD', 'bad'], ['RECORD', 'bad']], quoteAt: '@record-0.4', quoteSize: 96, quoteSub: 'ONE OF HIS SALES', push: { at: '@one#1', dur: 3.5, to: 1.45 }, stamps: [{ text: 'WORLD RECORD', at: '@record', size: 56, x: -190, y: 170, rot: -0.1 }] } },"%(SUS,NAME,NICK))
c.delete('rtx'); c.delete('rec')
c.repl('silh',"    { id: 'vwm', type: 'victim', at: [2330, 3650], rot: -0.03, in: '@actual-0.3', props: { kind: 'winemaker', label: 'THE WINEMAKER', sub: 'HIS NAME ON THE LABEL', w: 340, h: 440, tape: 'WITNESS', reactAt: '@objected', labelSize: 34 } },")
c.after('auc',"    { id: 'vcol', type: 'victim', at: [4560, 40], in: '@rich-0.3', props: { kind: 'collector', label: 'THE COLLECTORS', sub: 'RICH BIDDERS', w: 320, h: 420, tape: 'BUYERS', reactAt: '@bid', labelSize: 32 } },")
c.repl('door',make(bx=5100,by=3300,bin="@fbi-0.5",bout="@convicted+0.5",tight="@convicted",t0="@fbi-0.3",tx="@fbi+0.1",t1="@fbi+0.35",t2="@fbi+0.6",t3="@fbi+0.85",t4="@fbi+1.1",t5="@convicted-0.2"))
c.repl('verdict',"""    { id: 'sv', type: 'suspect', at: [4990, 4150], in: '@he#6-0.3', props: { %s, w: 440, %s, %s, tilt: -0.02, mono: true, push: { at: '@he#6', dur: 3.6, to: 1.4 }, stamps: [{ text: 'CONVICTED', at: '@he#6', size: 54, x: 0, y: -10, rot: -0.1 }], bars: '@10' } },
    { id: 'verdict', type: 'wverdict', at: [5760, 4150], scale: 0.8, in: '@he#6-0.3', props: { h: 860, convAt: '@he#6', yearsAt: '@10', payAt: '@$28' } },"""%(SUS,NAME,NICK))
c.after('sec',"""    { id: 'pip1', type: 'suspect', layer: 'screen', at: [880, 1130], in: '@a#12+0.2', out: '@fbi-0.5', props: { %s, variant: 'pip', w: 200, label: 'HIS LABELS', tilt: 0.03, arrow: { at: '@a#12+0.5', to: [-400, -330] } } },
    { id: 'dc1', type: 'datecard', layer: 'screen', at: [340, 480], in: '@rudy#1-0.2', out: '@a#4+0.6', props: { kicker: 'CASE FILE Nº 027 · THE PITCH', big: 'CALIFORNIA', small: 'WINE COLLECTOR · 2006' } },
    { id: 'dc3', type: 'datecard', layer: 'screen', at: [340, 480], in: '@a#12-0.1', out: '@a#12+1.4', props: { kicker: 'NEW YORK AUCTION', big: 'APRIL 2008', small: 'THE LABEL TRICK' } },
    { id: 'dc4', type: 'datecard', layer: 'screen', at: [340, 480], in: '@fbi-0.2', out: '@fbi+1.4', props: { kicker: 'THE CATCH', big: 'ARRESTED', small: '2012 · PER DOJ' } },
    { id: 'dc5', type: 'datecard', layer: 'screen', at: [340, 480], in: '@he#6-0.1', out: '@he#6+1.4', props: { kicker: 'FEDERAL COURT · SDNY', big: 'THE VERDICT', small: 'PER DOJ' } },
    { id: 'hud', type: 'hud', layer: 'screen', at: [0, 0], in: -1, props: { labels: [{ at: -1, text: 'THE PITCH' }, { at: '@but-0.3', text: 'THE FACTORY' }, { at: '@so#2-0.3', text: 'THE CATCH' }, { at: '@fbi-0.3', text: 'THE SENTENCE' }], items: [{ at: '@$35', label: 'COLLECTION SOLD (2006)', from: 0, to: 35, dur: 1.0, prefix: '≈$', suffix: 'M' }, { at: '@37', label: 'LABEL OLDER THAN WINE', from: 0, to: 37, dur: 0.8, suffix: ' YEARS' }, { at: '@10', label: 'YEARS IN PRISON', from: 0, to: 10, dur: 0.7 }] } },"""%SUS)
tail_beats(c,[("['hook', 'cheque', 'fake']","['hook', 'sus0', 'cheque', 'fake']"),
("sx: 540, sy: 910, fill: 0.8, maxH: 1150","sx: 540, sy: 880, fill: 0.98, maxH: 920"),("st: { x: 130, y: 1350, s: 1.05 }","st: { x: 925, y: 1395, s: 0.85 }"),
("focus: 'cheque.amount', fill: 0.86, maxH: 520, sy: 800","focus: 'cheque', fill: 0.62, maxH: 520, sy: 900"),
("focus: 'tag', move: 'whip', sx: 540, sy: 900, fill: 0.58, maxH: 820","focus: 'tag', move: 'whip', sx: 540, sy: 960, fill: 0.62, maxH: 680"),("focus: 'tag.name', fill: 0.8, maxH: 300, sy: 800","focus: 'tag', fill: 0.62, maxH: 680, sy: 960"),
("focus: 'auc', fill: 0.75, maxH: 820","focus: ['auc', 'vcol'], fill: 0.95, maxH: 820"),
("focus: ['gav2', 'rtx', 'rec'], move: 'whip', sx: 540, sy: 800, fill: 0.9, maxH: 1100","focus: 'sus7', move: 'whip', sx: 540, sy: 880, fill: 0.9, maxH: 780"),("focus: 'rec', fill: 0.8, maxH: 500, sy: 800","focus: 'sus7', fill: 0.9, maxH: 780, sy: 880"),
("focus: ['lot', 'silh']","focus: ['lot', 'vwm']"),("focus: 'silh', fill: 0.62, maxH: 640, sy: 840","focus: 'vwm', fill: 0.62, maxH: 640, sy: 840"),
("focus: 'door', move: 'whip', sx: 540, sy: 790, fill: 0.9, maxH: 700","focus: 'brd', move: 'whip', sx: 540, sy: 880, fill: 0.9, maxH: 900"),("focus: 'door', fill: 1.0, maxH: 600, sy: 790","focus: 'brd', fill: 0.9, maxH: 900, sy: 880"),
("focus: 'verdict', move: 'whip', sx: 540, sy: 960, fill: 0.78, maxH: 1000","focus: ['sv', 'verdict'], move: 'whip', sx: 540, sy: 960, fill: 0.94, maxH: 900"),
("focus: 'verdict.years', fill: 0.8, maxH: 560, sy: 940","focus: ['sv', 'verdict.years'], fill: 0.92, maxH: 900, sy: 900"),("focus: 'verdict', fill: 0.72, maxH: 950, sy: 880","focus: ['sv', 'verdict'], fill: 0.94, maxH: 900, sy: 880"),("focus: 'verdict.pay', fill: 0.8, maxH: 640, sy: 1010","focus: ['sv', 'verdict.pay'], fill: 0.92, maxH: 900, sy: 900"),("beat: 'pull-back', focus: 'verdict', fill: 0.7, maxH: 900","beat: 'pull-back', focus: ['sv', 'verdict'], fill: 0.94, maxH: 900"),("beat: PF, focus: 'verdict', sy: 860","beat: PF, focus: ['sv', 'verdict'], sy: 860"),
])
storyright(c,['tag','sus7','sv','sus0'])
add_sfx(c,[(0.05,'camera_shutter_1',-12,0.4),("'@so#1'",'camera_shutter_2',-12,0.4),("'@one#1'",'camera_shutter_1',-12,0.4),("'@a#12'",'typewriter_2',-12,0.8),("'@fbi-0.3'",'camera_shutter_2',-12,0.4),("'@fbi+0.1'",'rubber_stamp_2',-9,0.5),("'@he#6'",'camera_shutter_1',-12,0.4),("'@10'",'cell_door_1',-10,0.9),("'@step#1-0.2'",'suspense_drone_1',-14,3.0)])
c.save('tt.crime.js')
