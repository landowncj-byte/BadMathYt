import sys; sys.path.insert(0,'.')
from crime_edit import *
c=Cut('yt.js')
c.r("title: 'CASE: KURNIAWAN · 2013'","title: 'CASE FILE Nº 027 · KURNIAWAN'")
c.r("const ICE =","const ICE =")
c.r("size: 92, per: 0","size: 80, per: 0")
c.repl('pad1',"    { id: 'sus0', type: 'suspect', at: [-205, 15], in: -1, props: { %s, w: 380, %s, %s, flash: false, tilt: -0.02, stamps: [{ text: 'FRAUD', at: -0.3, size: 70, x: 0, y: 70, rot: -0.1 }] } },"%(SUS,NAME,NICK))
c.delete('pad2')
c.repl('bench0',"    { id: 'kit0', type: 'photo', at: [225, 50], in: -1, props: { src: KIT, name: '', credit: 'U.S. GOVERNMENT TRIAL EXHIBIT · PUBLIC DOMAIN', treatment: 'paper', w: 400, aspect: 0.68, fx: 0.5, fy: 0.5, tilt: 0.035, tape: true } },")
c.delete('fraud')
c.repl('tag',"    { id: 'tag', type: 'suspect', at: [1560, 20], in: '@wait-0.35', props: { %s, variant: 'card', file: true, caseNo: 'CASE FILE Nº 027', w: 450, %s, %s, tag: 'WINE COLLECTOR · CALIFORNIA', credit: 'U.S. ICE · PUBLIC DOMAIN', tilt: -0.03, push: { at: '@wait', dur: 5.5, to: 1.5 }, stringTo: [640, 330], stringAt: '@a-0.4', ring: '@rudy+0.2' } },"%(SUS,NAME,NICK))
c.repl('gav2',"    { id: 'sus7', type: 'suspect', at: [3650, 1840], in: '@one#2-0.3', props: { %s, variant: 'side', noquote: true, w: 980, pw: 420, aspect: 1.1, %s, %s, quote: [['WORLD', 'bad'], ['RECORD', 'bad']], quoteAt: '@record-0.4', quoteSize: 96, quoteSub: 'ONE OF HIS SALES', tilt: 0.0, push: { at: '@one#2', dur: 3.5, to: 1.45 }, stamps: [{ text: 'WORLD RECORD', at: '@record', size: 56, x: -190, y: 170, rot: -0.1 }] } },"%(SUS,NAME,NICK))
c.delete('rtx'); c.delete('rec')
c.repl('silh',"    { id: 'vwm', type: 'victim', at: [2330, 1850], rot: -0.03, in: '@winemaker-0.3', props: { kind: 'winemaker', label: 'THE WINEMAKER', sub: 'HIS NAME ON THE LABEL', w: 340, h: 440, tape: 'WITNESS', reactAt: '@objected', labelSize: 34 } },")
c.repl('door',"    { id: 'sus8', type: 'suspect', at: [0, 3600], in: '@2012-0.3', props: { %s, w: 470, %s, %s, tilt: 0.02, mono: true, heights: '@2012+0.4', push: { at: '@2012', dur: 3.5, to: 1.3 }, stamps: [{ text: 'ARRESTED', at: '@arrested', size: 66, x: 0, y: 20, rot: -0.1 }] } },"%(SUS,NAME,NICK))
c.after('chq',"    { id: 'vbill', type: 'victim', at: [4790, 3720], in: '@billionaire-0.3', props: { kind: 'billionaire', label: 'THE BILLIONAIRE', sub: 'TOLD THE JURY', w: 340, h: 440, reactAt: '@fakes', labelSize: 34 } },")
c.after('auc',"    { id: 'vcol', type: 'victim', at: [4560, 40], in: '@rich-0.3', props: { kind: 'collector', label: 'THE COLLECTORS', sub: 'RICH BIDDERS', w: 320, h: 420, tape: 'BUYERS', reactAt: '@bid', labelSize: 32 } },")
c.repl('folder',"""    { id: 'brd', type: 'board', at: [5400, 5400], in: '@what-0.4', out: '@convicted-0.02', props: { title: 'EVIDENCE BOARD', caseNo: 'CASE FILE Nº 027', tightAt: '@2013', items: [
      { id: 'ph', k: 'photo', src: ICE, crop: [0.12, 0, 0.76, 1], fx: 0.5, fy: 0.3, x: 0, y: -300, w: 330, h: 390, name: 'RUDY KURNIAWAN', nameSize: 26, at: '@what-0.1', rot: -0.02, push: 0.3 },
      { id: 'kt', k: 'photo', src: KIT, x: -290, y: 80, w: 390, h: 300, name: '', at: '@what+0.5', rot: -0.04 },
      { id: 'bt', k: 'note', x: 70, y: 90, w: 220, h: 290, icon: 'bottle', size: 28, lines: [['MIXED WINE', 'bad']], at: '@what+0.8', rot: 0.03 },
      { id: 'lb', k: 'note', x: 310, y: 100, w: 230, h: 290, icon: 'labels', size: 26, lines: [['THOUSANDS', 'ink'], ['OF LABELS', 'bad']], at: '@what+1.1', rot: 0.05 },
      { id: 'ck', k: 'note', x: -200, y: 410, w: 360, h: 270, icon: 'cheque', iconS: 130, size: 54, lines: [['$2.1M', 'bad']], at: '@follow-0.3', rot: -0.03, stamp: { text: 'JURY HEARD', at: '@follow', y: 70, size: 28, rot: -0.05 } },
      { id: 'cv', k: 'note', x: 210, y: 410, w: 360, h: 270, size: 60, lines: [['CONVICTED', 'bad', 48], ['2013', 'ink', 90]], at: '@2013-0.2', rot: 0.03 } ],
      strings: [[0, 1, '@what+0.7'], [0, 2, '@what+1.0'], [0, 3, '@what+1.3'], [1, 4, '@follow'], [2, 4, '@follow+0.1'], [3, 4, '@follow+0.2'], [0, 5, '@2013'], [4, 5, '@2013+0.2']] } },""")
c.repl('verdict',"""    { id: 'sv', type: 'suspect', at: [4990, 5400], in: '@convicted-0.1', props: { %s, w: 440, %s, %s, tilt: -0.02, mono: true, push: { at: '@convicted', dur: 3.6, to: 1.4 }, stamps: [{ text: 'CONVICTED', at: '@convicted', size: 54, x: 0, y: -10, rot: -0.1 }], bars: '@10' } },
    { id: 'verdict', type: 'wverdict', at: [5760, 5400], scale: 0.8, in: '@convicted-0.1', props: { convAt: '@convicted', yearsAt: '@10', payAt: '@$28' } },"""%(SUS,NAME,NICK))
c.after('tw',"""    { id: 'pip1', type: 'suspect', layer: 'screen', at: [880, 1130], in: '@then+0.3', out: '@send-0.25', props: { %s, variant: 'pip', w: 200, label: 'HIS LABELS', tilt: 0.03, arrow: { at: '@then+0.6', to: [-400, -330] } } },
    { id: 'dc1', type: 'datecard', layer: 'screen', at: [340, 480], in: '@name', out: '@a+0.5', props: { kicker: 'CASE FILE Nº 027 · THE PITCH', big: 'CALIFORNIA', small: 'WINE COLLECTOR · 2006' } },
    { id: 'dc3', type: 'datecard', layer: 'screen', at: [340, 480], in: '@then-0.1', out: '@then+1.4', props: { kicker: 'NEW YORK AUCTION', big: 'APRIL 2008', small: 'THE LABEL TRICK' } },
    { id: 'dc4', type: 'datecard', layer: 'screen', at: [340, 480], in: '@2012-0.2', out: '@arrested+1.2', props: { kicker: 'THE CATCH', big: 'ARRESTED', small: 'AT HOME · 2012 · PER DOJ' } },
    { id: 'dc5', type: 'datecard', layer: 'screen', at: [340, 480], in: '@2013-0.1', out: '@convicted+0.3', props: { kicker: 'FEDERAL COURT · SDNY', big: 'THE VERDICT', small: 'PER DOJ' } },
    { id: 'hud', type: 'hud', layer: 'screen', at: [0, 0], in: -1, props: { labels: [{ at: -1, text: 'THE PITCH' }, { at: '@then-0.25', text: 'THE LABEL TRICK' }, { at: '@2012-0.25', text: 'THE CATCH' }, { at: '@worked-0.3', text: 'THE FACTORY' }, { at: '@what-0.2', text: 'THE SENTENCE' }], items: [{ at: '@$35', label: 'COLLECTION SOLD (2006)', from: 0, to: 35, dur: 1.0, prefix: '≈$', suffix: 'M' }, { at: '@37', label: 'LABEL OLDER THAN WINE', from: 0, to: 37, dur: 0.8, suffix: ' YEARS' }, { at: '@10', label: 'YEARS IN PRISON', from: 0, to: 10, dur: 0.7 }] } },"""%SUS)
tail_beats(c,[("['hook', 'pad1', 'bench0', 'fraud']","['hook', 'sus0', 'kit0']"),("['bench0', 'fraud']","'kit0'"),
("sx: 540, sy: 840, fill: 0.9, maxH: 1150","sx: 540, sy: 870, fill: 0.98, maxH: 900"),("st: { x: 920, y: 1350, s: 1.0 }","st: { x: 925, y: 1395, s: 0.85 }"),
("focus: 'tag', move: 'whip', sx: 540, sy: 900, fill: 0.58, maxH: 820","focus: 'tag', move: 'whip', sx: 540, sy: 960, fill: 0.62, maxH: 680"),("focus: 'tag.name', fill: 0.8, maxH: 300, sy: 800","focus: 'tag', fill: 0.62, maxH: 680, sy: 960"),
("focus: ['gav2', 'rtx', 'rec'], move: 'whip', sx: 540, sy: 800, fill: 0.9, maxH: 1100","focus: 'sus7', move: 'whip', sx: 540, sy: 880, fill: 0.9, maxH: 780"),("focus: ['rtx', 'rec'], fill: 0.85, maxH: 700, sy: 800","focus: 'sus7', fill: 0.9, maxH: 780, sy: 880"),
("['lot', 'silh', 'wd']","['lot', 'vwm', 'wd']"),
("focus: 'door', move: 'whip', sx: 540, sy: 790, fill: 0.88, maxH: 700","focus: 'sus8', move: 'whip', sx: 540, sy: 960, fill: 0.62, maxH: 700"),("focus: 'door', fill: 0.95, maxH: 640, sy: 790","focus: 'sus8', fill: 0.62, maxH: 700, sy: 960"),
("focus: 'chq', move: 'whip', sx: 540, sy: 820, fill: 0.88, maxH: 1000","focus: ['chq', 'vbill'], move: 'whip', sx: 540, sy: 820, fill: 0.95, maxH: 1000"),("focus: ['chq', 'fk']","focus: ['chq', 'fk', 'vbill']"),
("focus: 'folder'","focus: 'brd'"),
("focus: 'verdict', fill: 0.72, maxH: 950, sy: 880","focus: ['sv', 'verdict'], fill: 0.94, maxH: 900, sy: 880"),("focus: 'verdict', sy: 860","focus: ['sv', 'verdict'], sy: 860"),("beat: 'pull-back', focus: 'verdict', fill: 0.7, maxH: 900","beat: 'pull-back', focus: ['sv', 'verdict'], fill: 0.94, maxH: 900"),
("focus: 'auc', fill: 0.75, maxH: 820","focus: ['auc', 'vcol'], fill: 0.95, maxH: 820"),("focus: 'verdict.conv', fill: 0.8, maxH: 600, sy: 900","focus: ['sv', 'verdict.conv'], fill: 0.92, maxH: 900, sy: 880"),("focus: 'verdict.years', fill: 0.8, maxH: 560, sy: 920","focus: ['sv', 'verdict.years'], fill: 0.92, maxH: 900, sy: 880"),("focus: 'verdict.pay', fill: 0.8, maxH: 640, sy: 1010","focus: ['sv', 'verdict.pay'], fill: 0.92, maxH: 900, sy: 900"),
])
storyright(c,['tag','sus7','sus8','sv','sus0'])
add_sfx(c,[(0.05,'camera_shutter_1',-12,0.4),("'@wait'",'camera_shutter_2',-12,0.4),("'@one#2'",'camera_shutter_1',-12,0.4),("'@then'",'typewriter_2',-12,0.8),("'@2012'",'camera_shutter_2',-12,0.4),("'@arrested'",'rubber_stamp_2',-9,0.5),("'@what-0.1'",'camera_shutter_1',-12,0.4),("'@follow'",'paper_slam_1',-12,0.4),("'@2013-0.2'",'typewriter_1',-12,0.7),("'@convicted'",'camera_shutter_2',-12,0.4),("'@10'",'cell_door_1',-10,0.9),("'@worked-0.2'",'suspense_drone_1',-14,3.0)])
c.save('yt.crime.js')
