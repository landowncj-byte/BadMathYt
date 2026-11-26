// Allen Stanford (Decoded). Mug shot (US Marshals, PD) still blocked (HTTP 429) after 1 retry -> ILLUSTRATION card "THE ISLAND BANKER".
const BK = { k: 'person', who: 'banker', name: 'ALLEN STANFORD', nick: 'THE ISLAND BANKER' };
const CS_TOPIC = {
  series: 'decoded', title: 'CASE FILE · STANFORD · 2012', pipWho: 'banker', hypo: 'TRUE STORY · JURY VERDICT 2012',
  footnote: ['SOURCES: U.S. DOJ · SEC (2009 COMPLAINT) · HOUSTON FEDERAL TRIAL 2012 · SENTENCE 110 YEARS, JUNE 2012', 'THE MUG-SHOT PHOTO (US MARSHALS, PUBLIC DOMAIN) COULD NOT BE DOWNLOADED, SO HE IS SHOWN AS A DRAWN ILLUSTRATION', 'ILLUSTRATIONS: BANKER, CD HOLDERS, BUILDINGS ARE DRAWN, NOT REAL PHOTOS · “INFLATED RETURNS” = PROSECUTORS’ WORDS'],
  rules: [
    [/^(Hit|Smash) like|^Send this|^Follow if|^(His|Their) (defense|lawyers) asked|^His defense asked/i, '-'],
    [/Houston jury/i, 'jury'], [/\bSEC\b/, 'sec'], [/asked for two hundred thirty|Prosecutors asked/i, 'asked'], [/judge sentenced/i, 'verdict'], [/five point nine/i, 'judgment'],
    [/bank that beat every other|whole secret was just|bank paid way too well/i, 'recap'],
    [/meet Allen Stanford|rewind to Allen Stanford|meet the guy/i, 'meet'],
    [/paying back one friend|like paying back/i, 'friends'], [/Here's the trick|trick first/i, 'trick'], [/inflated/i, 'inflated'],
    [/how does a (small|little)/i, 'how'], [/seven billion/i, 'seven'], [/a million/i, 'daily'], [/promised more|more than normal banks/i, 'pitch'], [/sold CDs/i, 'cd'],
  ],
  scenes: {
    hookP: { pip: { text: 'THE ISLAND BANKER', tone: 'gold' }, items: [
      { ...BK, w: 360, x: 300, y: 880, at: 0, flash: false, nameSize: 34 }, { k: 'card', head: 'THE RATE BOARD', w: 560, h: 420, icon: 'piggy', iconS: 1.3, iconX: -170, iconY: 60, lines: [['NORMAL BANKS', 'ink', 38], ['HIS BANK: MORE?', 'bad', 52]], textX: 70, x: 770, y: 880, at: 0.1 }, { k: 'stamp', text: '?', tone: 'bad', size: 120, x: 780, y: 1010, rot: -0.12, at: '~problem' }] },
    hookD: { pip: { text: 'THE ISLAND BANKER', tone: 'gold' }, items: [
      { ...BK, w: 380, x: 540, y: 940, at: 0, flash: false, nameSize: 34, bars: '~customer' }, { k: 'stamp', text: '110 YEARS', tone: 'bad', size: 84, x: 540, y: 870, rot: -0.1, at: '~110|hundred' }] },
    hookG: { pip: { text: 'THE ISLAND BANKER', tone: 'gold' }, items: [
      { ...BK, w: 380, x: 540, y: 940, at: 0, flash: false, nameSize: 34 }, { k: 'stamp', text: 'TOO GOOD?', tone: 'bad', size: 78, x: 540, y: 870, rot: -0.1, at: '~Guess|well' }] },
    meet: { lab: 'THE BANKER', pip: { text: 'ALLEN STANFORD', tone: 'gold' }, items: [
      { ...BK, w: 420, x: 310, y: 780, at: 0, nameSize: 36 }, { k: 'icon', name: 'island', s: 2.2, x: 790, y: 780, at: '~Antigua|island' }, { k: 'chip', text: 'A TEXAN', tone: 'gold', size: 36, x: 310, y: 1075, at: '~Texan' }, { k: 'chip', text: 'ANTIGUA · CARIBBEAN', tone: 'gold', size: 36, x: 770, y: 1030, at: '~Antigua' }] },
    cd: { lab: 'WHAT’S A CD?', pip: { text: 'SOLD “CDs”', tone: 'gold' }, items: [
      { k: 'card', head: 'CD = CERTIFICATE OF DEPOSIT', headSize: 40, w: 880, h: 420, icon: 'lock', iconS: 1.9, lines: [['LOCK YOUR MONEY UP', 'ink', 52], ['FIXED RETURN', 'good', 70]], x: 540, y: 740, at: 0 }, { k: 'icon', name: 'cert', s: 1.4, x: 540, y: 1040, at: '~fixed|certificates' }] },
    pitch: { lab: 'THE PITCH', pip: { text: 'THE PITCH', tone: 'gold' }, items: [
      { ...BK, w: 330, x: 280, y: 790, at: 0, nameSize: 30 }, { k: 'card', head: 'HIS BANK’S PITCH', w: 520, h: 380, lines: [['“MORE THAN', 'ink', 58], ['NORMAL BANKS”', 'bad', 60]], x: 780, y: 770, at: '~promised|more' }, { k: 'chip', text: 'HIGHER THAN NORMAL BANKS PAID', tone: 'gold', size: 30, x: 540, y: 1060, at: '~normal' }] },
    seven: { lab: 'THE MONEY', pip: { text: '$7 BILLION+', tone: 'bad' }, items: [
      { k: 'count', to: 7, from: 0, pre: '$', suf: ' BILLION+', size: 150, card: true, label: 'SOLD IN CDs', tone: 'bad', x: 540, y: 640, at: '~$7|7|seven', dur: 1.1 }, { k: 'chip', text: 'OVER ABOUT 20 YEARS', tone: 'gold', size: 42, x: 540, y: 900, at: '~twenty|20' }, { k: 'icon', name: 'cert', s: 1.3, x: 540, y: 1040, at: '~$7|7|seven+0.4' }] },
    daily: { lab: 'THE MONEY', pip: { text: '≈ $1M A DAY', tone: 'bad' }, items: [
      { k: 'card', head: 'EVERY SINGLE DAY', w: 840, h: 420, icon: 'calendar', iconS: 1.5, mon: 'DAY', day: '1', lines: [['≈ $1 MILLION', 'bad', 96], ['A DAY', 'ink', 70]], x: 540, y: 740, at: 0 }] },
    how: { lab: 'THE QUESTION', pip: { text: 'HOW?', tone: 'bad' }, items: [
      { k: 'text', lines: [['HOW?', 'bad']], size: 160, x: 540, y: 490, at: 0 }, { k: 'icon', name: 'island', s: 1.6, x: 290, y: 850, at: 0.1 }, { k: 'icon', name: 'skyscraper', s: 2.3, x: 790, y: 840, at: '~giant|beat' }, { k: 'chip', text: 'SMALL ISLAND BANK vs GIANT BANKS', tone: 'gold', size: 32, x: 540, y: 1060, at: '~giant|beat' }] },
    inflated: { lab: 'THE TRUTH', pip: { text: 'INFLATED?', tone: 'bad' }, items: [
      { k: 'icon', name: 'balloon', s: 2.8, x: 330, y: 780, at: 0 }, { k: 'card', head: 'INFLATED =', w: 520, h: 340, lines: [['PUFFED UP', 'bad', 90], ['BIGGER THAN REAL', 'ink', 40]], x: 770, y: 780, at: '~inflated' }, { k: 'chip', text: 'PROSECUTORS SAID', tone: 'gold', size: 38, x: 540, y: 1040, at: '~Prosecutors|prosecutors' }] },
    trick: { lab: 'THE TRICK', pip: { text: 'THE LEVER', tone: 'bad' }, items: [
      { k: 'text', lines: [['THE NEXT-CUSTOMER TRICK', 'gold']], size: 62, x: 540, y: 470, at: 0 }, { k: 'row', cw: 330, ch: 360, items: [{ who: 'womanC', label: 'NEW CUSTOMER', sub: 'PUTS MONEY IN', tone: 'good' }, { icon: 'stack', label: '→', s: 1.1, tone: 'bad' }, { who: 'womanA', label: 'OLD CUSTOMER', sub: 'GETS PAID OUT', tone: 'bad' }], x: 540, y: 800, at: 0.2 }, { k: 'chip', text: 'NEW MONEY PAYS OLD CUSTOMERS', tone: 'bad', size: 34, x: 540, y: 1060, at: '~pays|paid' }] },
    friends: { lab: 'THE TRICK', pip: { text: 'THE LEVER', tone: 'bad' }, items: [
      { k: 'row', cw: 320, ch: 340, items: [{ who: 'womanA', label: 'FRIEND 1', tone: 'navy' }, { who: 'womanB', label: 'FRIEND 2', tone: 'navy' }, { who: 'womanC', label: 'FRIEND 3', tone: 'navy' }], x: 540, y: 770, at: 0 }, { k: 'chip', text: 'PAY FRIEND 1 WITH FRIEND 2’S CASH', tone: 'gold', size: 34, x: 540, y: 1040, at: '~friend' }] },
    sec: { lab: 'THE CATCH', pip: { text: 'SUED', tone: 'bad', stamp: 'SUED' }, items: [
      { k: 'board', w: 980, h: 600, title: 'EVIDENCE BOARD · 2009', x: 540, y: 740, at: 0, tightAt: '~massive|fraud', strings: [[0, 1], [1, 2]], pins: [{ x: -300, y: -10, w: 230, h: 270, who: 'banker', label: 'STANFORD', tone: 'navy', rot: -0.05, at: 0.4 }, { x: -10, y: -20, w: 230, h: 270, icon: 'cert', s: 1.0, label: 'THE CDs', tone: 'navy', rot: 0.04, at: 1.0 }, { x: 290, y: -10, w: 230, h: 270, who: 'bank', label: 'ISLAND BANK', tone: 'bad', rot: 0.05, at: 1.6, stamp: { text: 'SUED', at: '~sued|SEC+0.5', size: 44 } }] }, { k: 'chip', text: 'SEC (2009): “MASSIVE ONGOING FRAUD”', tone: 'gold', size: 32, x: 540, y: 1075, at: '~calling|massive' }] },
    jury: { lab: 'THE VERDICT', pip: { text: 'GUILTY', tone: 'bad', stamp: 'GUILTY' }, items: [
      { k: 'icon', name: 'jury', s: 1.7, x: 540, y: 580, at: 0 }, { k: 'card', head: 'HOUSTON JURY · 2012', w: 820, h: 330, lines: [['13 OF 14', 'bad', 130], ['COUNTS · GUILTY', 'ink', 50]], x: 540, y: 900, at: '~thirteen|13' }] },
    asked: { lab: 'THE SENTENCE', pip: { text: '230 vs 41', tone: 'gold' }, items: [
      { k: 'card', head: 'PROSECUTORS ASKED', headSize: 34, w: 440, h: 420, lines: [['230', 'bad', 160], ['YEARS', 'ink', 60]], x: 300, y: 780, at: 0 }, { k: 'card', head: 'DEFENSE ASKED', headSize: 34, w: 440, h: 420, lines: [['≈ 41', 'good', 160], ['MONTHS', 'ink', 60]], x: 780, y: 780, at: '~defense|His|lawyers|41|forty-one' }] },
    verdict: { lab: 'THE SENTENCE', pip: { text: '110 YEARS', tone: 'bad', bars: true }, items: [
      { ...BK, w: 390, x: 300, y: 790, at: 0, bars: '~110|hundred', nameSize: 30 }, { k: 'text', lines: [['110 YEARS', 'bad']], size: 120, x: 770, y: 640, at: '~110|hundred' }, { k: 'stamp', text: 'SENTENCED', tone: 'bad', size: 62, x: 770, y: 790, rot: -0.1, at: '~sentenced' }, { k: 'icon', name: 'gavel', s: 1.2, x: 770, y: 960, at: '~sentenced+0.3' }] },
    judgment: { lab: 'THE BILL', pip: { text: 'HE OWES IT', tone: 'bad' }, items: [
      { k: 'card', head: 'MONEY JUDGMENT', w: 860, h: 420, icon: 'gavel', iconS: 1.5, lines: [['$5.9 BILLION', 'bad', 96], ['A COURT ORDER: HE OWES IT', 'soft', 32]], x: 540, y: 740, at: 0 }] },
    recap: { lab: 'THE RECAP', pip: { text: 'PAID WITH THE NEXT', tone: 'bad', x: false }, items: [
      { ...BK, w: 360, x: 290, y: 800, at: 0, nameSize: 30, flash: false }, { k: 'arrow', from: [440, 800], to: [620, 800], tone: 'bad', x: 540, y: 800, at: '~next|paying|customer', lift: 0 }, { k: 'row', cw: 220, ch: 260, items: [{ who: 'womanA', label: 'OLD', tone: 'bad' }], x: 780, y: 800, at: '~next|paying|customer+0.2' }, { k: 'chip', text: 'PAID WITH THE NEXT CUSTOMER’S MONEY', tone: 'bad', size: 32, x: 540, y: 1060, at: '~next|customer' }] },
    q: { lab: 'YOUR CALL', pip: { text: '110 YEARS: FAIR?', tone: 'gold' }, items: [
      { ...BK, w: 380, x: 540, y: 800, at: 0, bars: 0.2, nameSize: 30 }, { k: 'stamp', text: '110 YEARS', tone: 'bad', size: 70, x: 540, y: 740, rot: -0.1, at: 0.3 }] },
  },
};
