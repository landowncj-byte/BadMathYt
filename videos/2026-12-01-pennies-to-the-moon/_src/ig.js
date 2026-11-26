// Instagram cut — hook: the tower zooms out to the Moon (cheaper than you think). Order: setup · penny · Moon · straight · climb · 100¢=$1 · $2.53B · jackpot · send · swap · bill tower · $3.52T · jackpots · 31¢ each · ladder · ask
const H = { until: "@here's-0.1", y: 700, size: 62, lines: [[['STACKING PENNIES TO', 'paper']], [['THE MOON IS CHEAPER', 'good']], [['THAN YOU THINK', 'accent']]] };
const NM = 252894736842, NB = 3.5195e12;
const S = PM.make({
  dur: 70.12,
  P: [[0, 1], [0.5, 1], [3.0, NM], [3.95, NM], ["@here's-0.1", 1, 'j'], ['@so-0.1', 1, 'j'], [16.9, 1], ['@billion+0.4', NM], ['@a#6-0.1', 1, 'j'], [48.7, 1], ['@trillion+0.3', NB]],
  C: [{ from: 0, mode: 'pen' }, { from: '@a#6-0.1', mode: 'bill' }, { from: '@meanwhile-0.1', mode: 'txt', L: ['PENNIES', '253 billion'], R: ['PEOPLE ON EARTH', '8.2 billion'], C3: ['EACH PERSON', '31 PENNIES = 31¢'], fr: 1 }, { from: '@so#4-0.1', mode: 'txt', L: ['PENNY TOWER', '$2.53B'], R: ['BILL TOWER', '$3.52T'], C3: ['THE BILL TOWER COSTS', '~1,400 × MORE'], fr: 0.02 }, { from: '@would#2-0.1', mode: 'off' }],
  hook: H,
  scenes: [
    { type: 'tower', from: 0, to: "@here's-0.1", pose: 'shock', kind: 'pen', drop: 0.02, dim: 0.3, dimOut: 3.7, zoomAt: 0.5, zoomDur: 2.5 },
    { type: 'tower', from: "@here's-0.1", to: '@one-0.1', pose: 'talk', kind: 'pen', drop: "@here's", chip: { at: "@here's+0.2", text: 'YOU DROP ONE PENNY', tone: 'ink' } },
    { type: 'penny', from: '@one-0.1', to: '@the#3-0.1', pose: 'point', edge: '@one#2' },
    { type: 'moon', from: '@the#3-0.1', to: "@we're-0.1", pose: 'shock', mode: 'dist', at: '@239-0.2', dur: 1.8 },
    { type: 'moon', from: "@we're-0.1", to: '@so-0.1', pose: 'chin', mode: 'straight', at: "@we're", lock: 1.5, never: '@never', neverText: 'NEVER FALLS' },
    { type: 'tower', from: '@so-0.1', to: '@now-0.1', pose: 'shock', kind: 'pen', zoomAt: 16.9, zoomDur: 2.2, chip: { at: '@many', text: 'HOW MANY PENNIES?', tone: 'ink' } },
    { type: 'hundred', from: '@now-0.1', to: '@so#2-0.1', pose: 'talk', at: '@100-0.1', merge: '@$1-0.3', chip: { at: '@$1', text: '100¢ = $1', tone: 'accent' } },
    { type: 'bignum', from: '@so#2-0.1', to: "@that's-0.1", pose: 'shock', at: '@tower', dur: 2.2, num: 2.53, dec: 2, pre: '$', word: 'BILLION', col: '#00D26A', l1: 'THE WHOLE PENNY TOWER' },
    { type: 'jackpot', from: "@that's-0.1", to: '@send-0.1', pose: 'you', at: '@biggest', pct: '@most', pctY: 645 },
    { type: 'ask', from: '@send-0.1', to: '@now#2-0.1', pose: 'you', l1: 'SEND THIS TO THE FRIEND', l2: 'WITH THE COIN JAR' },
    { type: 'swap', from: '@now#2-0.1', to: '@a#6-0.1', pose: 'shock', at: '@paper', eq: '@number', chip: { at: '@thin', text: 'BILLS: 14× THINNER', tone: 'accent' } },
    { type: 'tower', from: '@a#6-0.1', to: '@follow-0.1', pose: 'shock', kind: 'bill', zoomAt: 48.7, zoomDur: 3.2, chip: { at: '@$35', text: 'DOLLAR-BILL TOWER', tone: 'ink' } },
    { type: 'bignum', from: '@follow-0.1', to: "@that's#2-0.1", pose: 'shock', at: '@follow', dur: 1.0, num: 3.52, dec: 2, pre: '$', word: 'TRILLION', col: '#FF3B30', l1: 'ONE STACK OF $1 BILLS' },
    { type: 'jackpots', from: "@that's#2-0.1", to: '@meanwhile-0.1', pose: 'chin', at: '@around', dur: 1.8 },
    { type: 'people', from: '@meanwhile-0.1', to: '@so#4-0.1', pose: 'talk', at: '@everyone-0.3', n: 31, per: 0.1, big: '31¢ EACH' },
    { type: 'versus', from: '@so#4-0.1', to: '@would#2-0.1', pose: 'talk', at: '@so#4', ratio: '@cheapest' },
    { type: 'ask', from: '@would#2-0.1', to: 99, pose: 'you', l1: 'CHIP IN YOUR 31¢?', l2: 'YES OR NO' },
  ],
  labels: [[0, 'THE CLAIM'], ["@here's-0.1", 'THE SETUP'], ['@one-0.1', 'THE PENNY'], ['@the#3-0.1', 'THE MOON'], ["@we're-0.1", 'THE RULES'], ['@so-0.1', 'THE TOWER'], ['@now-0.1', 'THE PRICE'], ["@that's-0.1", 'THE JACKPOT'], ['@now#2-0.1', 'THE TWIST'], ['@a#6-0.1', 'THE BILLS'], ["@that's#2-0.1", 'THE RECEIPT'], ['@meanwhile-0.1', 'THE SPLIT'], ['@so#4-0.1', 'THE LADDER']],
  notes: [],
  you: [{ at: 0, mood: 'wow', text: 'YOU: 1 PENNY' }, { at: "@here's", mood: 'smirk', text: 'DROP A PENNY' }, { at: '@one', mood: 'neutral', text: '1.52 mm' }, { at: '@moon#2', mood: 'worried', text: '239,000 MILES?!' }, { at: "@we're", mood: 'smirk', text: 'PERFECTLY STRAIGHT' }, { at: '@so', mood: 'worried', text: 'HOW MANY?' }, { at: '@253', mood: 'wow', text: '253 BILLION' }, { at: '@now', mood: 'neutral', text: '100¢ = $1' }, { at: '@$2', mood: 'wow', text: '$2.53 BILLION' }, { at: '@biggest', mood: 'smirk', text: 'A JACKPOT?' }, { at: '@most', mood: 'happy', text: '81% THERE' }, { at: '@swap', mood: 'angry', text: 'SWAP TO BILLS' }, { at: '@nope', mood: 'angry', text: 'NOPE' }, { at: '@$35', mood: 'wow', text: 'BILLS: WAY MORE' }, { at: '@follow', mood: 'wow', text: 'DUMBER' }, { at: '@meanwhile', mood: 'happy', text: '31¢ EACH' }, { at: '@so#4', mood: 'smirk', text: 'COIN WINS' }, { at: '@would#2', mood: 'smirk', text: 'YOUR 31¢?' }],
  cta: { like: '@double-0.1', send: '@send', follow: '@follow+0.05', followOut: '@follow+1.9' },
  poses: [['@double', 'you'], ['@send', 'you']],
  shakes: [[0.1, 8], ['@billion+0.4', 12], ['@$35+0.8', 12]],
  captions: { gap: 16, emph: { 'billion.': 'good', 'billion': 'good', 'trillion.': 'bad', 'moon': 'accent', 'moon.': 'accent', 'jackpot': 'accent', 'jackpots.': 'accent', 'cents': 'good', 'each.': 'good', 'dumber.': 'bad' }, fix: [] },
  sfx2: [
    { at: '@double', name: 'pop_2', gain: -9, dur: 0.3 }, { at: '@send-0.05', name: 'swoosh_1', gain: -9, dur: 0.9 },
    { at: '@follow+0.05', name: 'pop_1', gain: -9, dur: 0.5 }, { at: '@follow+0.8', name: 'click_1', gain: -8, dur: 0.3 }, { at: '@follow+0.9', name: 'success_chime_1', gain: -12, dur: 1.2 },
    { at: 0.04, name: 'deep_boom_2', gain: -4, dur: 0.36 },
  ],
});
BM2.scene(S);
