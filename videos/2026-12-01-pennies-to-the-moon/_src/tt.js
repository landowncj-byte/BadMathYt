// TikTok cut — hook: one lottery jackpot almost buys a penny tower to the Moon (bars). Order: build · penny · Moon · straight · climb · 31 each · 100¢=$1 · $2.53B · jackpot · send · 630,000 tons · swap · bill tower · $3.52T · jackpots · ladder · ask
const H = { until: '@okay-0.2', y: 690, size: 64, lines: [[['ONE LOTTERY JACKPOT', 'paper']], [['ALMOST BUYS A PENNY', 'accent']], [['TOWER TO THE MOON', 'good']]] };
const NM = 252894736842, NB = 3.5195e12;
const S = PM.make({
  dur: 73.12,
  P: [[0, 1], ['@to#2-0.1', 1], ['@pennies#1+0.4', NM], ['@a#7-0.1', 1, 'j'], [54.6, 1], ['@trillion+0.3', NB]],
  C: [{ from: 0, mode: 'txt', L: ['RECORD JACKPOT', '$2.04B'], R: ['PENNY TOWER TO THE MOON', '$2.53B'], C3: ['THE JACKPOT COVERS', '81% OF IT'], fr: 0.81 }, { from: '@okay-0.1', mode: 'pen' }, { from: '@a#7-0.1', mode: 'bill' }, { from: '@so#4-0.1', mode: 'txt', L: ['PENNY TOWER', '$2.53B'], R: ['BILL TOWER', '$3.52T'], C3: ['THE BILL TOWER COSTS', '~1,400 × MORE'], fr: 0.02 }, { from: '@pennies#6-0.1', mode: 'off' }],
  hook: H,
  scenes: [
    { type: 'jackpot', from: 0, to: '@okay-0.1', pose: 'shock', at: 0.3, pct: '@almost+0.4', pctY: 655, sc: 0.62, dy: 100 },
    { type: 'tower', from: '@okay-0.1', to: '@a#2-0.1', pose: 'talk', kind: 'pen', drop: '@math', chip: { at: '@math', text: 'YOU DROP ONE PENNY', tone: 'ink' } },
    { type: 'penny', from: '@a#2-0.1', to: '@the#3-0.3', pose: 'point', edge: '@one#2' },
    { type: 'moon', from: '@the#3-0.3', to: '@pretend-0.1', pose: 'shock', mode: 'dist', at: '@239-0.2', dur: 1.9 },
    { type: 'moon', from: '@pretend-0.1', to: '@to#2-0.1', pose: 'chin', mode: 'straight', at: '@pretend', lock: 1.5, never: '@never', neverText: 'NEVER FALLS', never2: '@pure', neverText2: 'PURE FANTASY' },
    { type: 'tower', from: '@to#2-0.1', to: "@that's-0.1", pose: 'shock', kind: 'pen', zoomAt: '@to#2+0.2', zoomDur: 3.3, chip: { at: '@reach', text: 'ONE PENNY AT A TIME', tone: 'ink' } },
    { type: 'people', from: "@that's-0.1", to: '@hundred-0.1', pose: 'talk', at: '@31-0.2', n: 31, per: 0.08, big: '31 PENNIES EACH' },
    { type: 'hundred', from: '@hundred-0.1', to: '@so-0.1', pose: 'talk', at: '@hundred-0.1', merge: '@dollar-0.5', chip: { at: '@dollar', text: '100¢ = $1', tone: 'accent' } },
    { type: 'bignum', from: '@so-0.1', to: '@now-0.1', pose: 'shock', at: '@costs', dur: 1.8, num: 2.53, dec: 2, pre: '$', word: 'BILLION', col: '#00D26A', l1: 'THE WHOLE PENNY TOWER' },
    { type: 'jackpot', from: '@now-0.1', to: '@send-0.1', pose: 'you', at: '@biggest', pct: '@most', pctY: 645 },
    { type: 'ask', from: '@send-0.1', to: '@oh-0.1', pose: 'you', l1: 'SEND THIS TO THE FRIEND', l2: 'WHO THROWS PENNIES AWAY' },
    { type: 'weight', from: '@oh-0.1', to: '@but-0.1', pose: 'shock', at: '@630', dur: 1.6 },
    { type: 'swap', from: '@but-0.1', to: '@a#7-0.1', pose: 'shock', at: '@paper', eq: '@more', chip: { at: '@bills#2', text: 'BILLS: 14× THINNER', tone: 'accent' } },
    { type: 'tower', from: '@a#7-0.1', to: '@follow-0.1', pose: 'shock', kind: 'bill', zoomAt: 54.6, zoomDur: 3.5, chip: { at: '@half#2', text: 'DOLLAR-BILL TOWER', tone: 'ink' } },
    { type: 'bignum', from: '@follow-0.1', to: "@that's#2-0.1", pose: 'shock', at: '@follow', dur: 1.0, num: 3.52, dec: 2, pre: '$', word: 'TRILLION', col: '#FF3B30', l1: 'ONE STACK OF $1 BILLS' },
    { type: 'jackpots', from: "@that's#2-0.1", to: '@so#4-0.1', pose: 'chin', at: '@roughly', dur: 2.0 },
    { type: 'versus', from: '@so#4-0.1', to: '@pennies#6-0.1', pose: 'talk', at: '@so#4', ratio: '@ladder+0.2' },
    { type: 'ask', from: '@pennies#6-0.1', to: 99, pose: 'you', l1: 'PENNIES OR BILLS?', l2: 'ONE WORD' },
  ],
  labels: [[0, 'THE HOOK'], ['@okay-0.1', 'THE BUILD'], ['@a#2-0.1', 'THE PENNY'], ['@the#3-0.3', 'THE MOON'], ['@pretend-0.1', 'THE RULES'], ['@to#2-0.1', 'THE TOWER'], ["@that's-0.1", 'THE SPLIT'], ['@hundred-0.1', 'THE PRICE'], ['@now-0.1', 'THE JACKPOT'], ['@oh-0.1', 'THE WEIGHT'], ['@but-0.1', 'THE TWIST'], ['@a#7-0.1', 'THE BILLS'], ["@that's#2-0.1", 'THE RECEIPT'], ['@so#4-0.1', 'THE LADDER']],
  notes: [],
  you: [{ at: 0, mood: 'wow', text: 'ONE JACKPOT…' }, { at: '@math', mood: 'smirk', text: 'DROP A PENNY' }, { at: '@a#2', mood: 'neutral', text: '1.52 mm' }, { at: '@moon#2', mood: 'worried', text: '239,000 MILES?!' }, { at: '@pretend', mood: 'smirk', text: 'PERFECTLY STRAIGHT' }, { at: '@to#2', mood: 'worried', text: 'HOW MANY?' }, { at: '@253', mood: 'wow', text: '253 BILLION' }, { at: "@that's", mood: 'happy', text: '31 EACH' }, { at: '@hundred', mood: 'neutral', text: '100¢ = $1' }, { at: '@two', mood: 'wow', text: '$2.53 BILLION' }, { at: '@biggest', mood: 'smirk', text: 'A JACKPOT?' }, { at: '@most', mood: 'happy', text: '81% THERE' }, { at: '@630', mood: 'worried', text: '630,000 TONS' }, { at: '@but', mood: 'angry', text: 'THE TWIST' }, { at: '@half#2', mood: 'wow', text: 'BILLS: WAY MORE' }, { at: '@follow', mood: 'wow', text: 'UGLY' }, { at: '@so#4', mood: 'smirk', text: 'COIN WINS' }, { at: '@pennies#6', mood: 'smirk', text: 'PENNIES OR BILLS?' }],
  cta: { like: '@heart-0.1', send: '@send', follow: '@follow+0.05', followOut: '@follow+1.9' },
  poses: [['@heart', 'you'], ['@send', 'you']],
  shakes: [[0.1, 8], ['@pennies#1+0.4', 12], ['@half#2+0.8', 12]],
  captions: { gap: 16, emph: { 'billion.': 'good', 'billion': 'good', 'trillion': 'bad', 'dollars.': 'good', 'moon!': 'accent', 'moon': 'accent', 'moon?': 'accent', 'jackpot': 'accent', 'jackpots.': 'accent', 'tons.': 'bad', 'fantasy.': 'bad' }, fix: [] },
  sfx2: [
    { at: '@heart', name: 'pop_2', gain: -9, dur: 0.3 }, { at: '@send-0.05', name: 'swoosh_1', gain: -9, dur: 0.9 },
    { at: '@follow+0.05', name: 'pop_1', gain: -9, dur: 0.5 }, { at: '@follow+0.8', name: 'click_1', gain: -8, dur: 0.3 }, { at: '@follow+0.9', name: 'success_chime_1', gain: -12, dur: 1.2 },
    { at: 0.04, name: 'deep_boom_2', gain: -4, dur: 0.36 },
  ],
});
BM2.scene(S);
