// YouTube cut — WHAT IF: pennies to the Moon. Hook: the tower zooms out to the Moon with the live counters ($2.5B) · build slowly (YOU drops a penny) · penny 1.52 mm · Moon distance · perfectly straight · climb (live counters) · 100¢=$1 · $2.53B · jackpot bars · send · swap to bills · bill tower · $35.2T · 17,252 jackpots · ladder · 31¢ each · ask
const H = { until: '@sounds-0.1', y: 700, size: 70, lines: [[['PENNIES TO THE MOON', 'paper']], [['COST $2.5 BILLION', 'good']]] };
const NM = 252894736842, NB = 3.5195e12;
const S = PM.make({
  dur: 70.77,
  P: [[0, 1], [0.5, 1], ['@billion+0.5', NM], [3.95, NM], ['@sounds-0.1', 1, 'j'], [19.6, 1], ['@billion#2+0.4', NM], ['@a#3-0.1', 1, 'j'], [49.0, 1], ['@trillion+0.3', NB]],
  C: [{ from: 0, mode: 'pen' }, { from: '@a#3-0.1', mode: 'bill' }, { from: '@so#6-0.1', mode: 'txt', L: ['PENNY TOWER', '$2.53B'], R: ['BILL TOWER', '$3.52T'], C3: ['THE BILL TOWER COSTS', '~1,400 × MORE'], fr: 0.02 }, { from: '@split-0.1', mode: 'txt', L: ['PENNIES', '253 billion'], R: ['PEOPLE ON EARTH', '8.2 billion'], C3: ['EACH PERSON', '31 PENNIES = 31¢'], fr: 1 }, { from: '@would#3-0.1', mode: 'off' }],
  hook: H,
  scenes: [
    { type: 'tower', from: 0, to: '@sounds-0.1', pose: 'shock', kind: 'pen', drop: 0.02, dim: 0.3, dimOut: 3.7, zoomAt: 0.5, zoomDur: 2.4 },
    { type: 'tower', from: '@sounds-0.1', to: '@a-0.1', pose: 'talk', kind: 'pen', drop: '@build', chip: { at: '@build', text: 'YOU DROP ONE PENNY', tone: 'ink' } },
    { type: 'penny', from: '@a-0.1', to: '@moon#2-0.3', pose: 'point', edge: '@1' },
    { type: 'moon', from: '@moon#2-0.3', to: '@pretend-0.1', pose: 'shock', mode: 'dist', at: '@239-0.2', dur: 1.9 },
    { type: 'moon', from: '@pretend-0.1', to: '@so#2-0.1', pose: 'chin', mode: 'straight', at: '@pretend', lock: 1.5, never: '@never', neverText: 'NEVER FALLS' },
    { type: 'tower', from: '@so#2-0.1', to: '@now-0.1', pose: 'shock', kind: 'pen', zoomAt: 19.6, zoomDur: 2.4, chips: 1, chip: { at: '@many', text: 'HOW MANY PENNIES?', tone: 'ink' } },
    { type: 'hundred', from: '@now-0.1', to: '@so#3-0.1', pose: 'talk', at: '@100-0.1', merge: '@$1-0.1', chip: { at: '@$1', text: '100¢ = $1', tone: 'accent' } },
    { type: 'bignum', from: '@so#3-0.1', to: '@biggest-0.4', pose: 'shock', at: '@whole', dur: 2.3, num: 2.53, dec: 2, pre: '$', word: 'BILLION', col: '#00D26A', l1: 'THE WHOLE PENNY TOWER' },
    { type: 'jackpot', from: '@biggest-0.4', to: '@send-0.1', pose: 'you', at: '@biggest', pct: '@most', pctY: 645 },
    { type: 'ask', from: '@send-0.1', to: '@now#2-0.1', pose: 'you', l1: 'SEND THIS TO THE FRIEND', l2: 'WITH THE PENNY JAR' },
    { type: 'swap', from: '@now#2-0.1', to: '@a#3-0.1', pose: 'shock', at: '@thinner', eq: '@more', chip: { at: '@bills#2', text: 'BILLS: 14× THINNER', tone: 'accent' } },
    { type: 'tower', from: '@a#3-0.1', to: '@follow-0.1', pose: 'shock', kind: 'bill', zoomAt: 49.0, zoomDur: 3.3, chip: { at: '@$3', text: 'DOLLAR-BILL TOWER', tone: 'ink' } },
    { type: 'bignum', from: '@follow-0.1', to: "@that's-0.1", pose: 'shock', at: '@follow', dur: 1.0, num: 3.52, dec: 2, pre: '$', word: 'TRILLION', col: '#FF3B30', l1: 'ONE STACK OF $1 BILLS' },
    { type: 'jackpots', from: "@that's-0.1", to: '@so#6-0.1', pose: 'chin', at: '@around#2', dur: 2.3 },
    { type: 'versus', from: '@so#6-0.1', to: '@split-0.1', pose: 'talk', at: '@so#6', ratio: '@ladder+0.2' },
    { type: 'people', from: '@split-0.1', to: '@would#3-0.1', pose: 'talk', at: '@31-0.3', n: 31, per: 0.06, big: '31¢ EACH' },
    { type: 'ask', from: '@would#3-0.1', to: 99, pose: 'you', l1: 'CHIP IN YOUR 31¢?', l2: 'YES OR NO' },
  ],
  labels: [[0, 'THE CLAIM'], ['@sounds-0.1', 'THE BUILD'], ['@a-0.1', 'THE PENNY'], ['@moon#2-0.3', 'THE MOON'], ['@pretend-0.1', 'THE RULES'], ['@so#2-0.1', 'THE TOWER'], ['@now-0.1', 'THE PRICE'], ['@biggest-0.4', 'THE JACKPOT'], ['@now#2-0.1', 'THE TWIST'], ['@a#3-0.1', 'THE BILLS'], ["@that's-0.1", 'THE RECEIPT'], ['@so#6-0.1', 'THE LADDER'], ['@split-0.1', 'THE SPLIT']],
  notes: [],
  you: [{ at: 0, mood: 'wow', text: 'YOU: 1 PENNY' }, { at: '@build', mood: 'smirk', text: 'DROP A PENNY' }, { at: '@a', mood: 'neutral', text: '1.52 mm' }, { at: '@moon#2', mood: 'worried', text: '239,000 MILES?!' }, { at: '@pretend', mood: 'smirk', text: 'PERFECTLY STRAIGHT' }, { at: '@so#2', mood: 'worried', text: 'HOW MANY?' }, { at: '@253', mood: 'wow', text: '253 BILLION' }, { at: '@now', mood: 'neutral', text: '100¢ = $1' }, { at: '@$2#2', mood: 'wow', text: '$2.53 BILLION' }, { at: '@biggest', mood: 'smirk', text: 'A JACKPOT?' }, { at: '@most', mood: 'happy', text: '81% THERE' }, { at: "@here's", mood: 'angry', text: 'THE TWIST' }, { at: '@$3', mood: 'wow', text: '$3.5 TRILLION' }, { at: '@follow', mood: 'wow', text: 'JAW DROP' }, { at: '@so#6', mood: 'smirk', text: 'COIN WINS' }, { at: '@split', mood: 'happy', text: '31¢ EACH' }, { at: '@would#3', mood: 'smirk', text: 'YOUR 31¢?' }],
  cta: { like: '@like-0.1', send: '@send', follow: '@follow+0.05', followOut: '@follow+1.9' },
  poses: [['@like', 'you'], ['@send', 'you']],
  shakes: [[0.1, 8], ['@billion+0.5', 12], ['@$3+0.8', 12]],
  captions: { gap: 16, emph: { 'billion.': 'good', 'billion': 'good', 'trillion.': 'bad', 'moon': 'accent', 'Moon': 'accent', 'moon.': 'accent', 'jackpot': 'accent', 'jackpots.': 'accent', 'cents': 'good', 'twist.': 'accent' }, fix: [] },
  sfx2: [
    { at: '@like', name: 'pop_2', gain: -9, dur: 0.3 }, { at: '@send-0.05', name: 'swoosh_1', gain: -9, dur: 0.9 },
    { at: '@follow+0.05', name: 'pop_1', gain: -9, dur: 0.5 }, { at: '@follow+0.8', name: 'click_1', gain: -8, dur: 0.3 }, { at: '@follow+0.9', name: 'success_chime_1', gain: -12, dur: 1.2 },
    { at: 0.04, name: 'deep_boom_2', gain: -4, dur: 0.36 },
  ],
});
BM2.scene(S);
