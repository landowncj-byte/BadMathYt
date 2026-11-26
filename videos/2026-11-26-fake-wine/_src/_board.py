BOARD = "    { id: 'brd', type: 'board', at: [%(bx)s, %(by)s], in: '%(bin)s', out: '%(bout)s', props: { title: 'EVIDENCE BOARD', caseNo: 'CASE FILE N\\u00ba 027', tightAt: '%(tight)s', items: [\n      { id: 'ph', k: 'photo', src: ICE, crop: [0.12, 0, 0.76, 1], fx: 0.5, fy: 0.3, x: 0, y: -300, w: 330, h: 390, name: 'RUDY KURNIAWAN', nameSize: 26, at: '%(t0)s', rot: -0.02, push: 0.3, xmark: '%(tx)s' },\n      { id: 'kt', k: 'photo', src: KIT, x: -290, y: 80, w: 390, h: 300, name: '', at: '%(t1)s', rot: -0.04 },\n      { id: 'bt', k: 'note', x: 70, y: 90, w: 220, h: 290, icon: 'bottle', size: 28, lines: [['MIXED WINE', 'bad']], at: '%(t2)s', rot: 0.03 },\n      { id: 'lb', k: 'note', x: 310, y: 100, w: 230, h: 290, icon: 'labels', size: 26, lines: [['THOUSANDS', 'ink'], ['OF LABELS', 'bad']], at: '%(t3)s', rot: 0.05 },\n      { id: 'ck', k: 'note', x: -200, y: 410, w: 360, h: 270, icon: 'cheque', iconS: 130, size: 54, lines: [['$2.1M', 'bad']], at: '%(t4)s', rot: -0.03, stamp: { text: 'JURY HEARD', at: '%(t4)s+0.3', y: 70, size: 28, rot: -0.05 } },\n      { id: 'cv', k: 'note', x: 210, y: 410, w: 360, h: 270, size: 60, lines: [['CONVICTED', 'bad', 48], ['2013', 'ink', 90]], at: '%(t5)s', rot: 0.03 } ],\n      strings: [[0, 1, '%(t1)s+0.2'], [0, 2, '%(t2)s+0.2'], [0, 3, '%(t3)s+0.2'], [1, 4, '%(t4)s+0.2'], [2, 4, '%(t4)s+0.3'], [3, 4, '%(t4)s+0.4'], [0, 5, '%(tight)s'], [4, 5, '%(tight)s+0.2']] } },"

import re
def off(ref,d):
    m=re.match(r"^(.*?)([+-][0-9.]+)?$",ref); base=m.group(1); o=float(m.group(2) or 0)+d
    return "%s%+.2f"%(base,o)
def make(**k):
    for n in ('t1','t2','t3'): k[n+'s']=off(k[n],0.2)
    k['t4a']=off(k['t4'],0.2); k['t4b']=off(k['t4'],0.3); k['t4c']=off(k['t4'],0.4); k['t4s']=off(k['t4'],0.3); k['tightb']=off(k['tight'],0.2)
    return BOARD2%k
BOARD2 = BOARD.replace("%(t4)s+0.3","%(t4s)s").replace("'%(t1)s+0.2'","'%(t1s)s'").replace("'%(t2)s+0.2'","'%(t2s)s'").replace("'%(t3)s+0.2'","'%(t3s)s'").replace("'%(t4)s+0.2'","'%(t4a)s'").replace("'%(t4)s+0.3'","'%(t4b)s'").replace("'%(t4)s+0.4'","'%(t4c)s'").replace("'%(tight)s+0.2'","'%(tightb)s'")
