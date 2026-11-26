// Phone hours (What If). YOU = recurring cartoon worker. Numbers exactly per research (median $24.51, $1,000 phone, $70 x 36, 20% tax ASSUMED).
const CS_TOPIC = {
  series: 'whatif', title: 'WHAT IF · PHONE IN HOURS', pipWho: 'you', hypo: 'HYPOTHETICAL · NOT FINANCIAL ADVICE',
  footnote: ['ASSUMES: MEDIAN WAGE $24.51/HR (BLS OEWS, MAY 2025) · $1,000 PHONE · $70/MO x 36 MONTHS · NO TAX/TRADE-IN ON THE PHONE', 'AFTER-TAX LINE ASSUMES 20% TAX (NOT A SOURCED RATE) · HOURS = DOLLARS ÷ $24.51 · WAGES BEFORE TAX', 'ILLUSTRATION: “YOU” IS A DRAWN CHARACTER · PHONE IS GENERIC, NO BRAND'],
  rules: [
    [/^(Hit|Smash) like|^Send this|^Follow if/i, '-'],
    [/price it in hours|not dollars|Want proof|count it in hours/i, 'hours'],
    [/middle (American )?wage|middle wage/i, 'wage'], [/Half (earn|of workers|make)|government's middle number/i, 'half'],
    [/forty-one/i, 'math41'], [/full work week|week and then some/i, 'weekcal'], [/phone costs a thousand|a thousand (dollars|bucks)|Say it's a thousand/i, 'price'],
    [/cheap part|rip-off|isn't the expensive part/i, 'cheap'], [/two thousand five hundred twenty/i, 'planbars'], [/plan is seventy|Say seventy|Now the plan/i, 'plan'],
    [/hundred and three/i, 'planhours'], [/almost a hundred bucks/i, 'monthly'], [/three thousand five hundred twenty|Phone plus plan/i, 'total'],
    [/eighteen (full )?work days|hundred and forty-four hours, or/i, 'days18'], [/fifth of (your|the)/i, 'tax22'], [/whole month|before tax, a month after/i, 'month'],
  ],
  scenes: {
    hookY: { pip: { text: 'YOU', tone: 'gold' }, items: [
      { k: 'person', who: 'youPhone', w: 340, name: 'YOU', x: 290, y: 900, at: 0, flash: false }, { k: 'count', to: 144, from: 0, suf: ' H', size: 170, card: true, label: 'HOURS OF WORK', tone: 'bad', x: 760, y: 880, at: 0.05, dur: 0.9 }] },
    hookT: { pip: { text: 'YOU', tone: 'gold' }, items: [
      { k: 'icon', name: 'phone', s: 2.3, x: 290, y: 890, at: 0 }, { k: 'chip', text: '$1,000', tone: 'gold', size: 48, x: 290, y: 1080, at: 0.1 }, { k: 'icon', name: 'stack', n: 7, s: 2.1, x: 780, y: 890, at: '~plan' }, { k: 'chip', text: '$2,520', tone: 'bad', size: 48, x: 780, y: 1080, at: '~plan+0.3' }] },
    hookI: { pip: { text: 'YOU', tone: 'gold' }, items: [
      { k: 'cal', head: '3½ WEEKS OF WORK', cols: 6, rows: 3, total: 18, n: 18, cw: 76, ch: 64, fillAt: 0.15, per: 0.1, tone: 'bad', x: 540, y: 880, at: 0 }] },
    hours: { lab: 'PRICE IT IN HOURS', pip: { text: 'PUNCH IN', tone: 'gold' }, items: [
      { k: 'person', who: 'you', w: 350, name: 'YOU', x: 300, y: 810, at: 0 }, { k: 'icon', name: 'clock', s: 2.3, x: 770, y: 770, at: '~hours|weeks' }, { k: 'chip', text: 'NOT DOLLARS · HOURS', tone: 'gold', size: 42, x: 540, y: 1060, at: '~dollars|hours' }] },
    wage: { lab: 'ASSUMES: THE MIDDLE WAGE', pip: { text: '$24.51 / HR', tone: 'gold' }, items: [
      { k: 'card', head: 'PAY STUB · MIDDLE WAGE', w: 860, h: 400, icon: 'envelope', iconS: 1.7, lines: [['$24.51 / HOUR', 'good', 96], ['ASSUMES THE MEDIAN WAGE', 'soft', 36]], x: 540, y: 740, at: 0 }, { k: 'chip', text: 'BLS · MAY 2025', tone: 'paper', size: 34, x: 540, y: 1040, at: '~$24' }] },
    half: { lab: 'ASSUMES: THE MIDDLE WAGE', pip: { text: 'RIGHT IN THE MIDDLE', tone: 'gold' }, items: [
      { k: 'row', cw: 310, ch: 330, items: [{ who: 'worker', label: 'HALF EARN MORE', tone: 'good' }, { who: 'you', label: 'YOU', tone: 'navy' }, { who: 'worker', label: 'HALF EARN LESS', tone: 'bad' }], x: 540, y: 770, at: 0 }, { k: 'chip', text: 'THE GOVERNMENT’S MIDDLE NUMBER', tone: 'gold', size: 32, x: 540, y: 1040, at: '~government|half' }] },
    price: { lab: 'THE PHONE', pip: { text: 'NEW PHONE', tone: 'gold' }, items: [
      { k: 'icon', name: 'phone', s: 2.9, x: 330, y: 770, at: 0 }, { k: 'count', to: 1000, from: 0, pre: '$', size: 130, card: true, label: 'NEW PHONE (ASSUMED)', tone: 'ink', x: 770, y: 790, at: '~$1|bucks', dur: 0.8 }] },
    math41: { lab: 'THE MATH', pip: { text: '≈ 41 HOURS', tone: 'gold' }, items: [
      { k: 'card', head: 'DIVIDE BY YOUR PAY', w: 880, h: 390, lines: [['$1,000 ÷ $24.51', 'ink', 78], ['≈ 41 HOURS', 'bad', 130]], x: 540, y: 640, at: 0 }, { k: 'progress', label: 'HOURS OF WORK', w: 780, to: 1, tone: 'bad', sub: '≈ 41 HOURS', x: 540, y: 1000, at: '~41' }] },
    weekcal: { lab: 'THE MATH', pip: { text: '1 WEEK +', tone: 'gold' }, items: [
      { k: 'cal', head: '1 WORK WEEK +', cols: 6, rows: 1, total: 6, n: 6, cw: 110, ch: 100, labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', '+1'], tones: ['navy', 'navy', 'navy', 'navy', 'navy', 'bad'], fillAt: 0.3, per: 0.35, x: 540, y: 760, at: 0 }, { k: 'chip', text: '40 HOURS + A BIT', tone: 'gold', size: 42, x: 540, y: 1000, at: '~week' }] },
    cheap: { lab: 'THE TWIST', pip: { text: 'THE CHEAP PART?', tone: 'gold' }, items: [
      { k: 'text', lines: [['THE CHEAP PART?', 'gold']], size: 100, x: 540, y: 470, at: 0.1 }, { k: 'icon', name: 'phone', s: 1.5, x: 300, y: 830, at: 0 }, { k: 'icon', name: 'stack', n: 8, s: 2.5, x: 760, y: 820, at: '~cheap|plan|rip-off|expensive' }, { k: 'arrow', from: [420, 820], to: [600, 820], tone: 'bad', x: 540, y: 820, at: '~cheap|plan|rip-off|expensive+0.3', lift: 0 }] },
    plan: { lab: 'THE PLAN', pip: { text: '$70 / MONTH', tone: 'gold' }, items: [
      { k: 'card', head: 'THE PLAN', w: 880, h: 400, icon: 'stack', iconS: 1.6, lines: [['$70 / MONTH', 'ink', 96], ['x 36 MONTHS', 'bad', 96]], x: 540, y: 700, at: 0 }, { k: 'chip', text: '3 YEARS', tone: 'gold', size: 44, x: 540, y: 1010, at: '~three|years' }] },
    planbars: { lab: 'THE PLAN', pip: { text: '2.5x THE PHONE', tone: 'bad' }, items: [
      { k: 'bars', title: 'PHONE vs PLAN', w: 640, h: 430, items: [{ label: 'PHONE', value: 1000, show: '$1,000', tone: 'navy', at: 0.2 }, { label: '36-MONTH PLAN', value: 2520, show: '$2,520', tone: 'bad', at: '~two|Two' }], x: 540, y: 740, at: 0 }, { k: 'chip', text: '≈ 2.5x THE PHONE', tone: 'bad', size: 44, x: 540, y: 1075, at: '~half|phones' }] },
    planhours: { lab: 'THE PLAN', pip: { text: '≈ 103 HOURS', tone: 'bad' }, items: [
      { k: 'count', to: 103, from: 0, suf: ' HOURS', size: 150, card: true, label: 'THE PLAN IN WORK HOURS', tone: 'bad', x: 540, y: 660, at: 0.1, dur: 1.0 }, { k: 'icon', name: 'clock', s: 1.8, x: 540, y: 980, at: '~hundred|about' }] },
    monthly: { lab: 'ALL IN', pip: { text: '≈ $98 / MONTH', tone: 'bad' }, items: [
      { k: 'card', head: 'ALL IN, PER MONTH', w: 860, h: 390, lines: [['$3,520 ÷ 36', 'ink', 78], ['≈ $98 / MONTH', 'bad', 110]], x: 540, y: 740, at: 0 }] },
    total: { lab: 'THE TOTAL', pip: { text: '$3,520', tone: 'bad' }, items: [
      { k: 'count', to: 3520, from: 0, pre: '$', size: 170, label: 'PHONE + PLAN', tone: 'gold', x: 540, y: 600, at: 0.05, dur: 1.0 }, { k: 'progress', segs: [[1000 / 3520, 'navy'], [2520 / 3520, 'bad']], to: 1, w: 820, sub: 'PHONE $1,000 · PLAN $2,520', x: 540, y: 930, at: 0.5 }] },
    days18: { lab: 'THE HIT', pip: { text: '18 WORK DAYS', tone: 'bad' }, items: [
      { k: 'count', to: 144, from: 0, suf: ' HOURS', size: 130, tone: 'bad', x: 540, y: 490, at: 0.05, dur: 1.0 }, { k: 'cal', head: '18 FULL WORK DAYS', cols: 6, rows: 3, total: 18, n: 18, cw: 76, ch: 62, fillAt: 0.8, per: 0.14, tone: 'bad', x: 540, y: 880, at: 0.5 }] },
    tax22: { lab: 'AFTER TAX (ASSUMED)', pip: { text: '≈ 22 DAYS', tone: 'bad' }, items: [
      { k: 'count', to: 22, from: 18, suf: ' WORK DAYS', size: 130, card: true, label: 'AFTER AN ASSUMED 20% TAX', tone: 'bad', x: 540, y: 640, at: 0.1, dur: 1.2 }, { k: 'chip', text: 'ASSUMES 20% TAX', tone: 'gold', size: 40, x: 540, y: 930, at: '~fifth' }, { k: 'chip', text: 'ABOUT A MONTH', tone: 'bad', size: 44, x: 540, y: 1030, at: '~month|About|Basically' }] },
    month: { lab: 'AFTER TAX (ASSUMED)', pip: { text: 'A WHOLE MONTH', tone: 'bad' }, items: [
      { k: 'cal', head: 'ONE MONTH OF WORK', cols: 6, rows: 4, total: 22, n: 22, cw: 76, ch: 58, fillAt: 0.3, per: 0.08, tone: 'bad', x: 540, y: 780, at: 0 }, { k: 'chip', text: 'FOR ONE PHONE + ITS PLAN', tone: 'gold', size: 36, x: 540, y: 1075, at: '~phone|month' }] },
    q: { lab: 'YOUR NUMBER', pip: { text: 'YOUR PLAN?', tone: 'gold' }, items: [
      { k: 'card', head: 'YOUR PLAN', w: 860, h: 380, lines: [['$___ / MONTH', 'ink', 80], ['= ? HOURS', 'bad', 110]], x: 540, y: 700, at: 0 }, { k: 'icon', name: 'clock', s: 1.6, x: 540, y: 1000, at: 0.3 }] },
  },
};
