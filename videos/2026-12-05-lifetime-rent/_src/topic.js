const MIL = 1357223;
const STEP = (lab, yr, to, rent, frac, pipt) => ({ lab, pip: { text: pipt, tone: 'bad' }, items: [
  { k: 'count', to, from: 0, pre: '≈ $', size: 140, card: true, label: 'RENT PAID SO FAR · YEAR ' + yr, tone: 'bad', x: 540, y: 620, at: 0.1, dur: 1.0 },
  { k: 'chip', text: 'RENT NOW: $' + rent + ' / MONTH', tone: 'gold', size: 38, x: 540, y: 850, at: 0.6 },
  { k: 'progress', label: 'TOWARD $1.36 MILLION', w: 780, from: 0, to: frac, tone: 'bad', x: 540, y: 1000, at: 0.3, dur: 1.2 }] });
const CS_TOPIC = {
  series: 'whatif', title: 'WHAT IF · LIFETIME RENT', pipWho: 'you', hypo: 'HYPOTHETICAL · NOT A FORECAST',
  footnote: ['ASSUMES: START $1,500/MONTH · RENT +3% EVERY YEAR (AN ASSUMPTION, NOT A FORECAST) · 40 YEARS · NO MOVES, DEPOSITS OR FEES', 'TOTAL RENT: 10 YRS ≈ $206K · 20 YRS ≈ $484K · 30 YRS ≈ $856K · 40 YRS ≈ $1.357M · NO RAISES = $720K · THE RAISES ADD ≈ $637K', 'ILLUSTRATION: “YOU” IS A DRAWN CHARACTER · THE LANDLORD IS NEVER SHOWN'],
  rules: [
    [/^(Hit|Smash) like|^Send this|^Follow if/i, '-'],
    [/start at fifteen hundred/i, 'start'], [/so it hides|build your lifetime/i, 'build'], [/three percent (a|every) year|rent goes up/i, 'rate3'], [/forty-five/i, 'tiny'],
    [/second rent bill|whole second rent/i, 'second'], [/added six hundred thirty-seven|raises alone added/i, 'raises'], [/twist/i, 'flat'],
    [/ten years|year ten/i, 'y10'], [/twenty years|year twenty/i, 'y20'], [/year thirty|Year thirty/i, 'y30'], [/year forty/i, 'y40'], [/Total, one point|Grand total/i, 'total'],
  ],
  scenes: {
    hookR: { pip: { text: 'YOU', tone: 'gold' }, items: [{ k: 'person', who: 'you', w: 340, name: 'YOU', x: 290, y: 900, at: 0, flash: false }, { k: 'count', to: 1.36, from: 0, dec: 2, pre: '$', suf: 'M', size: 150, card: true, label: 'YOUR LIFETIME RENT', tone: 'bad', x: 760, y: 880, at: 0.05, dur: 0.9 }] },
    hookT: { pip: { text: 'YOU', tone: 'gold' }, items: [{ k: 'icon', name: 'house', s: 2.3, x: 290, y: 890, at: 0 }, { k: 'count', to: 600000, from: 0, pre: '≈ $', size: 100, card: true, label: '3% A YEAR ADDS', tone: 'bad', x: 760, y: 890, at: 0.1, dur: 1.0 }] },
    hookI: { pip: { text: 'YOU', tone: 'gold' }, items: [{ k: 'icon', name: 'house', s: 1.7, x: 250, y: 900, at: 0 }, { k: 'arrow', from: [360, 900], to: [520, 900], tone: 'bad', x: 540, y: 900, at: 0.5, lift: 0 }, { k: 'icon', name: 'house', s: 2.6, x: 760, y: 880, at: 0.7 }, { k: 'chip', text: 'x 3', tone: 'bad', size: 70, x: 760, y: 1080, at: 1.0 }] },
    build: { lab: 'ONE ENVELOPE AT A TIME', pip: { text: 'ADD IT UP', tone: 'gold' }, items: [{ k: 'row', cw: 240, ch: 260, items: [{ icon: 'envelope', label: 'MONTH 1', s: 1.2 }, { icon: 'envelope', label: 'MONTH 2', s: 1.2 }, { icon: 'envelope', label: 'MONTH 3', s: 1.2 }], x: 540, y: 740, at: 0 }, { k: 'chip', text: 'IT HIDES: NEVER PAID AT ONCE', tone: 'gold', size: 36, x: 540, y: 1010, at: '~hides|envelope|build' }] },
    start: { lab: 'ASSUMES: $1,500 · 40 YEARS', pip: { text: '$1,500 / MONTH', tone: 'gold' }, items: [{ k: 'card', head: 'ASSUMES: THE START', w: 880, h: 420, icon: 'house', iconS: 1.5, iconX: -290, lines: [['$1,500 / MONTH', 'ink', 90], ['FOR 40 YEARS', 'bad', 80]], textX: 90, x: 540, y: 740, at: 0 }, { k: 'icon', name: 'key', s: 1.2, x: 540, y: 1040, at: '~forty|40' }] },
    rate3: { lab: 'ASSUMES: +3% A YEAR', pip: { text: '+3% A YEAR', tone: 'gold' }, items: [{ k: 'card', head: 'ASSUMES: RENT RISES', w: 880, h: 420, lines: [['+3% EVERY YEAR', 'bad', 110], ['AN ASSUMPTION, NOT A FORECAST', 'soft', 30]], x: 540, y: 740, at: 0 }] },
    tiny: { lab: 'THE CATCH', pip: { text: '“JUST $45”', tone: 'gold' }, items: [{ k: 'card', head: '3% OF $1,500', w: 880, h: 420, lines: [['= $45', 'good', 150], ['A MONTH. WHO CARES?', 'ink', 52]], x: 540, y: 740, at: 0 }] },
    y10: STEP('AFTER 10 YEARS', 10, 206350, '1,957', 206350 / MIL, 'YEAR 10'),
    y20: STEP('AFTER 20 YEARS', 20, 483667, '2,630', 483667 / MIL, 'YEAR 20'),
    y30: STEP('AFTER 30 YEARS', 30, 856357, '3,535', 856357 / MIL, 'YEAR 30'),
    y40: { lab: 'YEAR 40', pip: { text: 'YEAR 40', tone: 'bad' }, items: [{ k: 'count', to: 4751, from: 1500, pre: '$', suf: ' / MONTH', size: 120, card: true, label: 'THE SAME PLACE, YEAR 40', tone: 'bad', x: 540, y: 620, at: 0.1, dur: 1.2 }, { k: 'chip', text: '$1,500 → $4,751', tone: 'gold', size: 44, x: 540, y: 880, at: 0.6 }, { k: 'chip', text: 'MORE THAN TRIPLE', tone: 'bad', size: 48, x: 540, y: 1000, at: '~triple|Wait' }] },
    total: { lab: 'THE TOTAL', pip: { text: '$1.36 MILLION', tone: 'bad' }, items: [{ k: 'count', to: 1.36, from: 0, dec: 2, pre: '$', suf: ' MILLION', size: 140, label: 'LIFETIME RENT', tone: 'gold', x: 540, y: 620, at: 0.1, dur: 1.2 }, { k: 'progress', w: 800, from: 0, to: 1, tone: 'bad', x: 540, y: 930, at: 0.3, dur: 1.2, sub: '40 YEARS OF RENT' }, { k: 'stamp', text: 'TOTAL', tone: 'bad', size: 70, x: 780, y: 1060, rot: -0.1, at: '~million|Total|total+0.6' }] },
    flat: { lab: 'THE TWIST', pip: { text: 'NO RAISES?', tone: 'gold' }, items: [{ k: 'card', head: 'IF THE RENT NEVER ROSE', w: 880, h: 420, icon: 'key', iconS: 1.6, iconX: -290, lines: [['40 YEARS x $1,500', 'ink', 54], ['= $720,000', 'good', 110]], textX: 90, x: 540, y: 740, at: 0 }] },
    raises: { lab: 'THE TWIST', pip: { text: 'RAISES: +$637K', tone: 'bad' }, items: [{ k: 'bars', title: 'LIFETIME RENT', w: 660, h: 400, items: [{ label: 'NO RAISES', value: 720, show: '$720K', tone: 'navy', at: 0.2 }, { label: 'THE RAISES ADDED', value: 637, show: '+$637K', tone: 'bad', at: '~six|637|raises|cute' }], x: 540, y: 720, at: 0 }, { k: 'chip', text: 'TINY RAISES, HUGE BILL', tone: 'bad', size: 40, x: 540, y: 1020, at: '~tiny|little|alone|cute' }] },
    second: { lab: 'THE TWIST', pip: { text: 'A SECOND RENT', tone: 'bad' }, items: [{ k: 'icon', name: 'house', s: 2.0, x: 300, y: 780, at: 0 }, { k: 'icon', name: 'house', s: 2.0, x: 780, y: 780, at: '~second|almost|whole', tilt: 0 }, { k: 'chip', text: '+', tone: 'gold', size: 90, x: 540, y: 780, at: '~second|almost|whole' }, { k: 'chip', text: 'ALMOST A SECOND RENT BILL', tone: 'bad', size: 40, x: 540, y: 1010, at: '~second|bill|raises' }] },
    q: { lab: 'YOUR NUMBERS', pip: { text: 'YOUR RENT?', tone: 'gold' }, items: [{ k: 'card', head: 'YOUR RENT', w: 860, h: 400, icon: 'house', iconS: 1.5, iconX: -290, lines: [['NOW: $____', 'bad', 80], ['FIRST: $____', 'ink', 80]], textX: 90, x: 540, y: 720, at: 0 }] },
  },
};
