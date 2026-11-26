// World Cup trophy + Pickles (Decoded). Scenes are shared by the 3 cuts; sentences map to scenes by regex (rules), first match per key.
const R = 'brand/photos/jules-rimet-trophy/3.jpg';
const REPLICA = { k: 'photo', src: R, crop: [0.05, 0.0, 0.9, 0.78], fx: 0.5, fy: 0.3, label: 'REPLICA', credit: 'PHOTO: ABEL LAFLEUR · PUBLIC DOMAIN', aspect: 1.05 };
const CAL = (mon, x, y, at) => ({ k: 'icon', name: 'calendar', mon, day: '', s: 1.7, x, y, at });
const CS_TOPIC = {
  series: 'decoded', title: 'CASE FILE · 1966 WORLD CUP', pipWho: 'middleman', hypo: 'TRUE STORY · THIEF NEVER CONVICTED',
  footnote: ['PHOTO: REPLICA OF THE JULES RIMET TROPHY, ABEL LAFLEUR, PUBLIC DOMAIN, VIA WIKIMEDIA COMMONS', 'BETCHLEY: 2 YEARS (RANSOM DEMAND) · THE THIEF WAS NEVER CONVICTED · POLICE ARRESTED THE MIDDLEMAN', 'ILLUSTRATIONS: MIDDLEMAN, THIEF, PICKLES, WALKER ARE DRAWN, NOT REAL PHOTOS'],
  rules: [
    [/^(Hit|Smash) like|^Send this|^Follow if/i, '-'],
    [/ransom note/i, 'ransom'], [/piece of the trophy|lining/i, 'lining'], [/arrest|grab a dockworker|nab a/i, 'arrest'],
    [/middleman|someone else stole|thief is someone|excuse/i, 'claim'], [/^Who\?|never (tells|says)|who's the thief|who's that somebody/i, 'whoq'],
    [/police have a note|still no trophy/i, 'board'], [/one week after|Corbett (walks|takes)/i, 'walk'],
    [/sniffs out|nose first|Pickles.*(hedge|package)/i, 'sniff'], [/inside\?/i, 'found'], [/suspect/i, 'suspect'],
    [/convicted over the ransom|sentenced to two years/i, 'sentence'], [/actual thief/i, 'thiefnever'], [/that summer/i, 'hero'],
    [/London|England (is|hosts)/i, 'london'], [/glass case|stamp show/i, 'case'], [/Sunday|walks off|strolls/i, 'stolen'], [/^(Now the most famous|Yeah, the biggest)/i, 'gone'],
  ],
  scenes: {
    hook: { pip: { text: 'THE MIDDLEMAN', tone: 'gold' }, items: [
      { k: 'icon', name: 'glasscase', empty: true, s: 2.3, x: 310, y: 860, at: 0 }, { k: 'person', who: 'dog', sniff: true, w: 330, name: 'PICKLES', x: 780, y: 860, at: 0.05, tilt: 0.04, flash: false },
      { k: 'chip', text: 'STOLEN', tone: 'bad', size: 44, x: 310, y: 1040, at: '~stole' }, { k: 'chip', text: 'FOUND', tone: 'good', size: 44, x: 780, y: 1070, at: '~found' }] },
    hookT: { pip: { text: 'THE MIDDLEMAN', tone: 'gold' }, items: [
      { k: 'person', who: 'middleman', w: 380, name: 'EDWARD BETCLEY', nick: 'THE MIDDLEMAN', x: 540, y: 945, at: 0, flash: false, nameSize: 38 }, { k: 'stamp', text: '2 YEARS', tone: 'bad', size: 84, x: 540, y: 880, rot: -0.1, at: '~two' }] },
    hookI: { pip: { text: 'THE MIDDLEMAN', tone: 'gold' }, items: [
      { k: 'person', who: 'dog', sniff: true, w: 390, name: 'PICKLES', nick: 'THE DETECTIVE', x: 540, y: 880, at: 0, flash: false }, { k: 'stamp', text: 'POLICE: 0', tone: 'bad', size: 70, x: 540, y: 820, rot: -0.1, at: '~police' }] },
    rewind: { lab: 'OKAY, REWIND', items: [{ k: 'text', lines: [['1966', 'gold']], size: 170, x: 540, y: 520, at: 0 }, { ...REPLICA, w: 420, x: 540, y: 850, at: 0.3 }, { k: 'chip', text: '⏪ REWIND', tone: 'gold', size: 40, x: 540, y: 1090, at: '~rewind' }] },
    intro66: { lab: 'CASE FILE Nº 1966', items: [{ k: 'text', lines: [['1966', 'gold']], size: 170, x: 540, y: 520, at: 0 }, { ...REPLICA, w: 380, x: 340, y: 850, at: '~stole', tilt: -0.04 }, { k: 'person', who: 'dog', w: 320, name: 'PICKLES', x: 780, y: 850, at: '~Pickles', tilt: 0.04 }] },
    london: { lab: 'THE CASE · LONDON', pip: { text: 'THE CASE', tone: 'gold' }, items: [
      { k: 'card', head: 'LONDON · 1966', w: 840, h: 260, icon: 'worldmap', iconS: 1.5, lines: [['ENGLAND HOSTS', 'ink', 50], ['THE WORLD CUP', 'bad', 62]], x: 540, y: 560, at: 0 },
      CAL('MAR', 300, 900, '~months'), { k: 'arrow', from: [420, 900], to: [660, 900], tone: 'gold', x: 540, y: 900, at: '~months', bend: 0, lift: 0 }, CAL('JUL', 780, 900, '~months+0.5'), { k: 'chip', text: '4 MONTHS', tone: 'gold', size: 44, x: 540, y: 1040, at: '~months' }] },
    case: { lab: 'THE CASE · STAMP SHOW', pip: { text: 'NOT HIM… YET', tone: 'gold' }, items: [
      { k: 'icon', name: 'glasscase', s: 2.2, x: 300, y: 770, at: 0 }, { ...REPLICA, w: 380, x: 780, y: 790, at: '~golden|glass|where', tilt: 0.04 }, { k: 'chip', text: 'ON SHOW AT A STAMP EXHIBITION', tone: 'gold', size: 36, x: 540, y: 1040, at: '~stamp' }] },
    stolen: { lab: 'THE THEFT', pip: { text: 'WHO TOOK IT?', tone: 'bad' }, items: [
      { k: 'chip', text: 'SUN 20 MARCH 1966', tone: 'gold', size: 44, x: 540, y: 470, at: 0 }, { k: 'icon', name: 'glasscase', empty: true, s: 1.6, x: 230, y: 830, at: 0.1 },
      { k: 'person', who: 'thief', w: 420, name: 'THE THIEF', nick: 'NEVER IDENTIFIED', x: 650, y: 800, at: '~takes|walks|strolls|Sunday', tilt: 0.03 }, { k: 'stamp', text: 'STOLEN', tone: 'bad', size: 80, x: 660, y: 770, rot: -0.12, at: '~takes|walks|strolls|Sunday+0.9' }] },
    gone: { lab: 'THE THEFT', items: [{ k: 'text', lines: [['GONE', 'bad']], size: 200, x: 540, y: 520, at: 0 }, { k: 'icon', name: 'glasscase', empty: true, s: 2.6, x: 540, y: 850, at: 0.15 }, { k: 'icon', name: 'tape', s: 1.8, x: 540, y: 850, at: 0.6, rot: 0.1 }] },
    ransom: { lab: 'THE RANSOM', pip: { text: 'SENT A NOTE?', tone: 'gold' }, items: [
      { k: 'icon', name: 'ransom', s: 3.0, lines: ['PAY US', 'OR NEVER', 'SEE IT AGAIN'], x: 540, y: 700, at: 0, rot: -0.04 }, { k: 'chip', text: 'RANSOM = PAY, OR IT’S GONE', tone: 'bad', size: 40, x: 540, y: 1000, at: '~means|basically|Pay' }] },
    lining: { lab: 'THE RANSOM', pip: { text: '“JACKSON”?', tone: 'bad' }, items: [
      { k: 'icon', name: 'ransom', s: 2.0, lines: ['PAY US'], x: 300, y: 730, at: 0, rot: -0.06 }, { k: 'icon', name: 'lining', s: 2.4, x: 780, y: 730, at: '~piece' }, { k: 'arrow', from: [650, 760], to: [450, 740], tone: 'gold', x: 540, y: 740, at: '~piece+0.4', lift: 0 },
      { k: 'chip', text: 'PROOF: PART OF THE LINING', tone: 'gold', size: 36, x: 540, y: 470, at: '~lining' }, { k: 'chip', text: 'FROM “JACKSON”', tone: 'bad', size: 44, x: 540, y: 1010, at: '~Jackson' }] },
    arrest: { lab: 'THE ARREST', pip: { text: 'ARRESTED', tone: 'bad', stamp: 'ARRESTED' }, items: [
      { k: 'person', who: 'middleman', w: 440, name: 'EDWARD BETCLEY', nick: 'THE MIDDLEMAN', x: 540, y: 760, at: 0, nameSize: 42 }, { k: 'stamp', text: 'ARRESTED', tone: 'bad', size: 84, x: 540, y: 690, rot: -0.12, at: '~named' }, { k: 'chip', text: 'A LONDON DOCKWORKER', tone: 'gold', size: 38, x: 540, y: 1060, at: '~dock|dockworker' }] },
    claim: { lab: 'THE MIDDLEMAN', pip: { text: '“JUST THE MIDDLEMAN”', tone: 'gold' }, items: [
      { k: 'person', who: 'middleman', w: 330, name: 'BETCHLEY', nick: 'HIS CLAIM', x: 290, y: 770, at: 0, nameSize: 40 }, { k: 'card', head: 'HIS CLAIM', w: 500, h: 360, lines: [['“ONLY THE', 'ink', 58], ['MIDDLEMAN”', 'bad', 62]], x: 760, y: 760, at: '~middleman', size: 60 },
      { k: 'chip', text: 'SOMEONE ELSE STOLE IT', tone: 'gold', size: 38, x: 540, y: 1030, at: '~stole|else' }] },
    whoq: { lab: 'THE MIDDLEMAN', pip: { text: 'WHO?', tone: 'bad' }, items: [
      { k: 'text', lines: [['WHO?', 'bad']], size: 150, x: 540, y: 480, at: 0 }, { k: 'person', who: 'middleman', w: 330, name: 'BETCHLEY', x: 290, y: 800, at: 0.1, nameSize: 40 }, { k: 'arrow', from: [440, 800], to: [650, 800], tone: 'bad', x: 540, y: 800, at: '~never' },
      { k: 'person', who: 'thief', w: 330, name: 'THE THIEF', nick: 'NEVER IDENTIFIED', x: 800, y: 800, at: '~never+0.2' }, { k: 'chip', text: 'HE NEVER SAID', tone: 'bad', size: 44, x: 540, y: 1070, at: '~never+0.6' }] },
    board: { lab: 'THE EVIDENCE', pip: { text: 'STILL NO TROPHY', tone: 'bad' }, items: [
      { k: 'board', w: 980, h: 660, title: 'EVIDENCE BOARD · 1966', x: 540, y: 740, at: 0, tightAt: '~still', strings: [[0, 1], [1, 2]], pins: [
        { x: -310, y: -10, w: 230, h: 260, icon: 'ransom', s: 1.0, label: 'RANSOM NOTE', tone: 'navy', rot: -0.06, at: '~note' }, { x: -10, y: -20, w: 250, h: 300, who: 'middleman', label: 'MIDDLEMAN', tone: 'navy', rot: 0.04, at: '~middleman' },
        { x: 300, y: -10, w: 230, h: 260, icon: 'glasscase', s: 0.9, label: 'NO TROPHY', tone: 'bad', rot: 0.06, at: '~trophy', stamp: { text: '?', at: '~still+0.2', size: 56 } }] }] },
    walk: { lab: 'THE DOG WALK', pip: { text: 'DAY 7', tone: 'gold' }, items: [
      { k: 'chip', text: 'DAY 7 · SOUTH LONDON', tone: 'gold', size: 42, x: 540, y: 470, at: 0 }, { k: 'person', who: 'walker', w: 360, name: 'DAVID CORBETT', nick: 'THE DOG WALKER', x: 300, y: 800, at: 0.1, nameSize: 36 }, { k: 'person', who: 'dog', w: 360, name: 'PICKLES', nick: 'HIS DOG', x: 780, y: 800, at: '~dog', tilt: 0.04 }] },
    sniff: { lab: 'THE FIND', pip: { text: 'PICKLES SNIFFS', tone: 'gold' }, items: [
      { k: 'person', who: 'dog', sniff: true, w: 450, name: 'PICKLES', nick: 'NOSE DOWN', x: 340, y: 780, at: 0, tilt: -0.03 }, { k: 'icon', name: 'hedge', s: 1.8, x: 790, y: 930, at: '~hedge' }, { k: 'icon', name: 'bundle', s: 1.7, x: 780, y: 760, at: '~package' },
      { k: 'chip', text: 'WRAPPED IN NEWSPAPER', tone: 'gold', size: 34, x: 600, y: 1070, at: '~wrapped|newspaper' }] },
    found: { lab: 'THE FIND', pip: { text: 'FOUND!', tone: 'good' }, items: [
      { ...REPLICA, w: 460, x: 470, y: 760, at: 0.05, tilt: -0.02 }, { k: 'stamp', text: 'FOUND', tone: 'good', size: 96, x: 760, y: 990, rot: -0.1, at: '~World' }] },
    suspect: { lab: 'THE TWIST', pip: { text: 'WHO WALKED IN?', tone: 'gold' }, items: [
      { k: 'person', who: 'walker', w: 430, name: 'DAVID CORBETT', nick: 'THE DOG WALKER', x: 540, y: 770, at: 0, nameSize: 40 }, { k: 'stamp', text: 'SUSPECT?', tone: 'bad', size: 84, x: 540, y: 700, rot: -0.1, at: '~suspect' }, { k: 'chip', text: 'BRIEFLY A SUSPECT', tone: 'gold', size: 40, x: 540, y: 1060, at: '~briefly' }] },
    sentence: { lab: 'THE SENTENCE', pip: { text: '2 YEARS', tone: 'bad', bars: true }, items: [
      { k: 'person', who: 'middleman', w: 390, name: 'EDWARD BETCLEY', nick: 'THE MIDDLEMAN', x: 300, y: 790, at: 0, bars: '~two', nameSize: 38 }, { k: 'text', lines: [['2 YEARS', 'gold']], size: 130, x: 770, y: 640, at: '~two' },
      { k: 'stamp', text: 'SENTENCED', tone: 'bad', size: 62, x: 770, y: 790, rot: -0.1, at: '~sentenced' }, { k: 'chip', text: 'OVER THE RANSOM DEMAND', tone: 'paper', size: 30, x: 540, y: 450, at: '~ransom' }, { k: 'icon', name: 'gavel', s: 1.2, x: 770, y: 960, at: '~sentenced+0.3' }] },
    thiefnever: { lab: 'THE TWIST', pip: { text: 'NEVER CONVICTED', tone: 'bad', x: true }, items: [
      { k: 'person', who: 'thief', w: 440, name: 'THE THIEF', nick: 'NEVER IDENTIFIED', x: 540, y: 750, at: 0 }, { k: 'stamp', text: 'UNSOLVED', tone: 'bad', size: 84, x: 540, y: 700, rot: -0.1, at: '~Nobody' }, { k: 'chip', text: 'NEVER CONVICTED OF THE THEFT', tone: 'gold', size: 34, x: 540, y: 1060, at: '~convicted' }] },
    hero: { lab: 'THE HERO', pip: { text: 'THE REAL HERO', tone: 'good' }, items: [
      { ...REPLICA, w: 360, x: 320, y: 790, at: '~summer', tilt: -0.04 }, { k: 'person', who: 'dog', w: 380, name: 'PICKLES', nick: 'THE HERO', x: 760, y: 790, at: '~hero|MVP|dog', tilt: 0.04 }, { k: 'icon', name: 'medal', s: 1.4, x: 860, y: 960, at: '~hero|MVP|dog+0.3' }, { k: 'chip', text: 'ENGLAND WON THAT SUMMER', tone: 'gold', size: 34, x: 540, y: 1095, at: '~summer' }] },
    q: { lab: 'YOUR CALL', pip: { text: 'POLICE OR PICKLES?', tone: 'gold' }, items: [
      { k: 'person', who: 'police', w: 360, name: 'POLICE', x: 280, y: 760, at: 0 }, { k: 'text', lines: [['OR', 'gold']], size: 100, x: 540, y: 760, at: 0.1 }, { k: 'person', who: 'dog', sniff: true, w: 360, name: 'PICKLES', x: 800, y: 760, at: 0.2 }] },
  },
};
