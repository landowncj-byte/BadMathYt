import sys; sys.path.insert(0,'.')
from crime_edit import *
from _board import make
c=Cut('ig.js')
c.r("title: 'CASE: KURNIAWAN · 2013'","title: 'CASE FILE Nº 027 · KURNIAWAN'")
c.r("{ id: 'hook', type: 'text', at: [20, -330],","{ id: 'hook', type: 'text', at: [20, -420],")
c.r("{ id: 'bottle', type: 'bottle', at: [-300, 110], in: -1,","{ id: 'bottle', type: 'bottle', at: [-330, 20], scale: 0.8, in: -1,")
c.r("{ id: 'card', type: 'wintl', at: [330, 150], in: -1,","{ id: 'card', type: 'wintl', at: [250, 40], scale: 0.8, in: -1,")
c.after('card',"    { id: 'sus0', type: 'suspect', at: [0, 560], in: -1, props: { %s, w: 340, %s, %s, flash: false, tilt: -0.02, stamps: [{ text: 'FAKE LABELS', at: -0.3, size: 40, x: 0, y: 60, rot: -0.08 }] } },"%(SUS,NAME,NICK))
c.repl('rk',"    { id: 'rk', type: 'suspect', at: [1560, 20], in: '@so#1-0.1', props: { %s, variant: 'card', file: true, caseNo: 'CASE FILE Nº 027', w: 450, %s, %s, tag: 'WINE COLLECTOR · CALIFORNIA', credit: 'U.S. ICE · PUBLIC DOMAIN', tilt: -0.03, push: { at: '@so#1', dur: 5.5, to: 1.5 }, stringTo: [640, 330], stringAt: '@a#2-0.4', ring: '@rudy+0.2' } },"%(SUS,NAME,NICK))
c.repl('gav2',"    { id: 'sus7', type: 'suspect', at: [3650, 1840], in: '@one#2-0.3', props: { %s, variant: 'side', noquote: true, w: 980, pw: 420, aspect: 1.1, %s, %s, quote: [['WORLD', 'bad'], ['RECORD', 'bad']], quoteAt: '@record-0.4', quoteSize: 96, quoteSub: 'ONE OF HIS SALES', push: { at: '@one#2', dur: 3.5, to: 1.45 }, stamps: [{ text: 'WORLD RECORD', at: '@record', size: 56, x: -190, y: 170, rot: -0.1 }] } },"%(SUS,NAME,NICK))
c.delete('rtx'); c.delete('rec')
c.repl('silh',"    { id: 'vwm', type: 'victim', at: [2330, 1850], rot: -0.03, in: '@guy#2-0.3', props: { kind: 'winemaker', label: 'THE WINEMAKER', sub: 'HIS NAME ON THE LABEL', w: 340, h: 440, tape: 'WITNESS', reactAt: '@objected', labelSize: 34 } },")
c.repl('door',"    { id: 'sus8', type: 'suspect', at: [0, 3600], in: '@2012-0.3', props: { %s, w: 470, %s, %s, tilt: 0.02, mono: true, heights: '@2012+0.4', push: { at: '@2012', dur: 3.5, to: 1.3 }, stamps: [{ text: 'ARRESTED', at: '@arrested', size: 66, x: 0, y: 20, rot: -0.1 }] } },"%(SUS,NAME,NICK))
c.after('chq',"    { id: 'vbill', type: 'victim', at: [4790, 3720], in: '@billionaire-0.3', props: { kind: 'billionaire', label: 'THE BILLIONAIRE', sub: 'TOLD THE JURY', w: 340, h: 440, reactAt: '@fake', labelSize: 34 } },")
c.after('auc',"    { id: 'vcol', type: 'victim', at: [4560, 40], in: '@rich-0.3', props: { kind: 'collector', label: 'THE COLLECTORS', sub: 'RICH BIDDERS', w: 320, h: 420, tape: 'BUYERS', reactAt: '@outbid', labelSize: 32 } },")
c.repl('folder',make(bx=3600,by=5400,bin="@follow-0.6",bout="@convicted-0.02",tight="@convicted",t0="@follow-0.4",tx="@2012",t1="@follow-0.1",t2="@follow+0.2",t3="@follow+0.5",t4="@follow+0.8",t5="@convicted-0.2"))
c.r("tightAt: '@convicted'","tightAt: '@convicted'")
c.repl('verdict',"""    { id: 'sv', type: 'suspect', at: [3190, 5400], in: '@convicted-0.1', props: { %s, w: 440, %s, %s, tilt: -0.02, mono: true, push: { at: '@convicted', dur: 3.6, to: 1.4 }, stamps: [{ text: 'CONVICTED', at: '@convicted', size: 54, x: 0, y: -10, rot: -0.1 }], bars: '@10#2' } },
    { id: 'verdict', type: 'wverdict', at: [3960, 5400], scale: 0.8, in: '@convicted-0.1', props: { convAt: '@convicted', yearsAt: '@10#2', payAt: '@$28' } },"""%(SUS,NAME,NICK))
c.after('sec',"""    { id: 'pip1', type: 'suspect', layer: 'screen', at: [880, 1130], in: '@then#1+0.2', out: '@send-0.25', props: { %s, variant: 'pip', w: 200, label: 'HIS LABELS', tilt: 0.03, arrow: { at: '@then#1+0.5', to: [-400, -330] } } },
    { id: 'dc1', type: 'datecard', layer: 'screen', at: [340, 480], in: '@rudy-0.2', out: '@a#2+0.6', props: { kicker: 'CASE FILE Nº 027 · THE PITCH', big: 'CALIFORNIA', small: 'WINE COLLECTOR · 2006' } },
    { id: 'dc3', type: 'datecard', layer: 'screen', at: [340, 480], in: '@then#1-0.1', out: '@then#1+1.4', props: { kicker: 'NEW YORK AUCTION', big: 'APRIL 2008', small: 'THE LABEL TRICK' } },
    { id: 'dc4', type: 'datecard', layer: 'screen', at: [340, 480], in: '@2012-0.2', out: '@arrested+1.2', props: { kicker: 'THE CATCH', big: 'ARRESTED', small: 'AT HOME · 2012 · PER DOJ' } },
    { id: 'dc5', type: 'datecard', layer: 'screen', at: [340, 480], in: '@convicted-0.3', out: '@convicted+0.4', props: { kicker: 'FEDERAL COURT · SDNY', big: 'THE VERDICT', small: 'PER DOJ' } },
    { id: 'hud', type: 'hud', layer: 'screen', at: [0, 0], in: -1, props: { labels: [{ at: -1, text: 'THE LIE' }, { at: '@so#1-0.2', text: 'THE PITCH' }, { at: '@then#1-0.25', text: 'THE LABEL TRICK' }, { at: '@2012-0.25', text: 'THE CATCH' }, { at: '@they#2-0.3', text: 'THE FACTORY' }, { at: '@follow-0.5', text: 'THE SENTENCE' }], items: [{ at: '@1945', label: 'LABEL SAYS', from: 1945, to: 1945, dur: 0.1, commas: false }, { at: '@1982', label: 'MADE IN', from: 1945, to: 1982, dur: 0.7, commas: false }, { at: '@$35', label: 'COLLECTION SOLD (2006)', from: 0, to: 35, dur: 1.0, prefix: '≈$', suffix: 'M' }, { at: '@10#2', label: 'YEARS IN PRISON', from: 0, to: 10, dur: 0.7 }] } },"""%SUS)
tail_beats(c,[("['hook', 'bottle', 'card']","['hook', 'bottle', 'card', 'sus0']"),
("sx: 540, sy: 840, fill: 0.9, maxH: 1050","sx: 540, sy: 880, fill: 0.98, maxH: 950"),("st: { x: 900, y: 1350, s: 1.0 }","st: { x: 925, y: 1395, s: 0.8 }"),
("focus: 'rk', move: 'whip', sx: 540, sy: 900, fill: 0.58, maxH: 820","focus: 'rk', move: 'whip', sx: 540, sy: 960, fill: 0.62, maxH: 680"),("focus: 'rk.name', fill: 0.8, maxH: 300, sy: 800","focus: 'rk', fill: 0.62, maxH: 680, sy: 960"),
("focus: 'auc', fill: 0.75, maxH: 820","focus: ['auc', 'vcol'], fill: 0.95, maxH: 820"),
("focus: ['gav2', 'rtx', 'rec'], move: 'whip', sx: 540, sy: 800, fill: 0.9, maxH: 1100","focus: 'sus7', move: 'whip', sx: 540, sy: 880, fill: 0.9, maxH: 780"),("focus: 'rec', fill: 0.8, maxH: 500, sy: 800","focus: 'sus7', fill: 0.9, maxH: 780, sy: 880"),
("['lot', 'silh', 'wd']","['lot', 'vwm', 'wd']"),
("focus: 'door', move: 'whip', sx: 540, sy: 790, fill: 0.88, maxH: 700","focus: 'sus8', move: 'whip', sx: 540, sy: 960, fill: 0.62, maxH: 700"),("focus: 'door', fill: 0.95, maxH: 640, sy: 790","focus: 'sus8', fill: 0.62, maxH: 700, sy: 960"),
("focus: 'chq', move: 'whip', sx: 540, sy: 820, fill: 0.88, maxH: 1000","focus: ['chq', 'vbill'], move: 'whip', sx: 540, sy: 820, fill: 0.95, maxH: 1000"),("focus: ['chq', 'fk']","focus: ['chq', 'fk', 'vbill']"),
("focus: 'folder'","focus: 'brd'"),
("focus: 'verdict.conv', fill: 0.8, maxH: 600, sy: 900","focus: ['sv', 'verdict.conv'], fill: 0.92, maxH: 900, sy: 880"),("focus: 'verdict.years', fill: 0.8, maxH: 560, sy: 920","focus: ['sv', 'verdict.years'], fill: 0.92, maxH: 900, sy: 880"),("focus: 'verdict', fill: 0.72, maxH: 950, sy: 880","focus: ['sv', 'verdict'], fill: 0.94, maxH: 900, sy: 880"),("focus: 'verdict.pay', fill: 0.8, maxH: 640, sy: 1010","focus: ['sv', 'verdict.pay'], fill: 0.92, maxH: 900, sy: 900"),("beat: 'pull-back', focus: 'verdict', fill: 0.7, maxH: 900","beat: 'pull-back', focus: ['sv', 'verdict'], fill: 0.94, maxH: 900"),
])
storyright(c,['rk','sus7','sus8','sv','sus0'])
add_sfx(c,[(0.05,'camera_shutter_1',-12,0.4),("'@so#1'",'camera_shutter_2',-12,0.4),("'@one#2'",'camera_shutter_1',-12,0.4),("'@then#1'",'typewriter_2',-12,0.8),("'@2012'",'camera_shutter_2',-12,0.4),("'@arrested'",'rubber_stamp_2',-9,0.5),("'@follow-0.4'",'camera_shutter_1',-12,0.4),("'@convicted'",'camera_shutter_2',-12,0.4),("'@10#2'",'cell_door_1',-10,0.9),("'@they#2-0.2'",'suspense_drone_1',-14,3.0)])
c.save('ig.crime.js')
