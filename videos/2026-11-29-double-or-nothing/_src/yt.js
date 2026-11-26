// YouTube cut — WHAT IF: double or nothing. Hook: a coin turns $1,000 into $1,024,000 · cash · coin demo · 10 in a row · prize · choose · ladder (live flips) · send · crowd of 1,024 · odds · follow · winner · twist (average) · same as cash · ask
const H = { until: "@here's-0.1", y: 700, size: 66, lines: [[['A COIN CAN TURN', 'paper']], [['$1,000 INTO', 'good']], [['OVER A MILLION', 'accent']]] };
const F10 = [44.7, 45.2, 45.6, 46.0, 46.35, 46.7, 47.0, 47.25, 47.5, 47.75];
const lf = (at, n) => ({ at, dur: 0.5, res: 'H', n });
const S = DN5.make({
  dur: 70.43, flips10: F10,
  K: [[0, 0], ['@turn', 0], ['@million-0.3', 10], ["@here's-0.2", 10], ["@here's", 0], ['@$1#3', 0], ['@000#3', 10], ['@so-0.15', 10], ['@so+0.05', 0],
    [23.9, 0], [24.2, 1], [25.7, 1], [25.95, 2], [26.25, 2], [26.5, 3], [30.6, 3], [30.85, 4], [31.15, 4], [31.4, 5], ['@send', 5], ['@send+0.3', 0], [60.4, 0], ['@000#7', 1000]],
  C: [{ from: 0, mode: 'f' }, { from: '@now#2-0.1', mode: 'c' }, { from: "@here's#2-0.1", mode: 'a' }],
  hook: H,
  scenes: [
    { type: 'choice', from: 0, to: "@here's-0.1", pose: 'shock', sc: 0.5, dy: 215, cash: { at: 0.25 }, coin: { at: 0.4, flips: [{ at: 0.9, dur: 0.8, res: 'H' }, { at: 2.3, dur: 0.8, res: 'H' }] } },
    { type: 'cash', from: "@here's-0.1", to: '@or-0.1', pose: 'talk', at: '@deal', chip: { at: '@cash', text: 'CASH · RIGHT NOW' } },
    { type: 'demo', from: '@or-0.1', to: '@and#1-0.1', pose: 'shock', flips: [{ at: 8.3, dur: 0.7, res: 'H' }, { at: 10.0, dur: 0.55, res: 'T' }] },
    { type: 'tenrow', from: '@and#1-0.1', to: '@with-0.1', pose: 'chin', at: '@10-0.05', title: 'WIN 10 FLIPS IN A ROW', chip: { at: '@do', text: 'PASS ALL 10 · NO QUITTING' } },
    { type: 'bignum', from: '@with-0.1', to: '@so-0.1', pose: 'shock', at: '@$1#3', dur: 1.05, num: 1024000, pre: '$', col: '#00D26A', chip: { at: '@000#3+0.35', text: "THAT'S 1,024 × THE CASH" } },
    { type: 'choice', from: '@so-0.1', to: '@hit-0.1', pose: 'you', pick: '@coin#3-0.05', or: '@one', cash: { at: '@which' }, coin: { at: '@one', flips: [{ at: '@most', dur: 0.9, res: 'H' }] }, chip: { at: '@coin#3', text: 'MOST GRAB THE COIN', tone: 'accent' } },
    { type: 'ask', from: '@hit-0.1', to: '@win#2-0.1', pose: 'you', l1: 'WOULD YOU', l2: 'GRAB THE COIN?' },
    { type: 'ladder', from: '@win#2-0.1', to: '@send-0.1', pose: 'shock', flips: [{ ...lf(23.5, 1), dur: 0.55 }, lf(25.2, 2), lf(25.75, 3), lf(30.1, 4), lf(30.65, 5)], lit: [24.05, 25.7, 26.25, 30.6, 31.15], car: { at: '@car-0.25' }, chipOut: '@send-0.15',
      chips: [{ at: 24.1, text: 'WON 1 FLIP · POT $2,000', tone: 'good' }, { at: 26.55, text: 'WON 3 · POT $8,000', tone: 'good' }, { at: '@eight', text: 'ONLY 1 IN 8 GETS THERE', tone: 'bad' }, { at: 31.2, text: 'WON 5 · POT $32,000', tone: 'good' }, { at: '@32#2', text: 'ONLY 1 IN 32 IS STANDING', tone: 'bad' }] },
    { type: 'ask', from: '@send-0.1', to: '@now#2-0.1', pose: 'you', l1: 'FRIEND WHO SAYS', l2: 'DOUBLE OR NOTHING' },
    { type: 'crowd', from: '@now#2-0.1', to: "@that's-0.1", pose: 'shock', appear: '@picture-0.1', holds: true, spotAt: '@just#1',
      tags: [{ at: '@picture+0.9', out: '@every', text: '1,024 PEOPLE · ALL FLIPPING', tone: 'ink' }, { at: '@every', out: '@by', text: 'EVERY FLIP: HALF GO HOME WITH $0', tone: 'bad' }, { at: '@by', out: '@just#1', text: 'FLIP 10 · HOW MANY LEFT?', tone: 'ink' }, { at: '@just#1', text: 'JUST ONE LEFT', tone: 'good' }] },
    { type: 'odds', from: "@that's-0.1", to: '@follow-0.1', pose: 'chin', at: '@about#2', chip: { at: '@1#2', text: 'ONE IN 1,024 · ABOUT 0.1%', tone: 'ink' } },
    { type: 'ask', from: '@follow-0.1', to: '@the#6-0.1', pose: 'you', l1: 'GUT CHANGED', l2: 'ITS ANSWER?' },
    { type: 'crowd', from: '@the#6-0.1', to: "@here's#2-0.1", pose: 'shock', appear: 40.68, holds: false, spotAt: 49.42, noSfx: true, pop: false,
      tags: [{ at: '@million#2-0.3', out: '@other', text: '1 WINNER · $1,024,000', tone: 'good' }, { at: '@023', text: '1,023 PEOPLE · $0 EACH', tone: 'bad' }] },
    { type: 'duo', from: "@here's#2-0.1", to: '@same-0.1', pose: 'chin', a: { at: '@spread-0.1', col: '#FFD60A', l1: '$1,024,000', l2: 'SPREAD ACROSS 1,024' }, b: { at: '@000#7-0.3', col: '#00D26A', l1: 'EACH GETS', l2: '$1,000' } },
    { type: 'eq', from: '@same-0.1', to: '@so#2-0.1', pose: 'talk', a: { at: '@same', col: '#00D26A', l1: 'THE CASH', l2: '$1,000', l3: 'FOR SURE' }, b: { at: '@cash#2', col: '#FFD60A', l1: 'THE COIN', l2: '$1,000', l3: 'ON AVERAGE' }, mid: '@as', chip: { at: '@hides', text: 'THE COIN HIDES HOW RARE THE WINNER IS', tone: 'accent' } },
    { type: 'ask', from: '@so#2-0.1', to: 99, pose: 'you', l1: 'CASH OR COIN?', l2: 'ONE WORD' },
  ],
  hideCounter: [['@so#2-0.1', 99]],
  labels: [[0, 'THE BET'], ["@here's-0.1", 'THE CASH'], ['@or-0.1', 'THE COIN'], ['@and#1-0.1', 'THE CATCH'], ['@with-0.1', 'THE PRIZE'], ['@so-0.1', 'THE CHOICE'], ['@win#2-0.1', 'THE LADDER'], ['@now#2-0.1', 'THE CROWD'], ["@that's-0.1", 'THE ODDS'], ['@the#6-0.1', 'THE WINNER'], ["@here's#2-0.1", 'THE TWIST']],
  notes: [],
  you: [{ at: 0, mood: 'smirk', text: 'YOU: $1,000?' }, { at: "@here's", mood: 'neutral', text: 'CASH: $1,000' }, { at: '@or', mood: 'smirk', text: 'OR A COIN…' }, { at: '@tails', mood: 'worried', text: 'ONE TAILS = $0' }, { at: '@and#1', mood: 'worried', text: '10 IN A ROW?' }, { at: '@$1#3', mood: 'wow', text: '$1,024,000!' }, { at: '@so', mood: 'smirk', text: 'COIN, OBVIOUSLY' },
    { at: '@win#2', mood: 'happy', text: 'HEADS!' }, { at: '@only#2', mood: 'worried', text: 'ONLY 1 IN 32' }, { at: '@now#2', mood: 'worried', text: 'IN THE CROWD' }, { at: '@just#1', mood: 'wow', text: 'JUST ONE' }, { at: '@the#6', mood: 'angry', text: 'YOU: $0' }, { at: "@here's#2", mood: 'neutral', text: 'THE TWIST' }, { at: '@same', mood: 'smirk', text: 'SAME AS CASH' }, { at: '@so#2', mood: 'smirk', text: 'YOUR CALL' }],
  cta: { like: '@like-0.1', send: '@send', follow: '@follow+0.05', followOut: '@follow+1.9', bubble: { at: '@cash#3', l1: 'CASH OR COIN?', l2: 'COMMENT BELOW' } },
  poses: [['@like', 'you'], ['@send', 'you']],
  shakes: [[0.1, 8], ['@$1#3+0.8', 12], ['@just#1', 12]],
  captions: { gap: 16, emph: { 'coin': 'accent', 'coin.': 'accent', 'coin?': 'accent', 'million.': 'good', 'million': 'good', 'nothing.': 'bad', 'zero.': 'bad', 'tails': 'bad', 'Heads': 'good', 'cash': 'good', 'cash.': 'good', 'one.': 'accent', 'twist.': 'accent' }, fix: [] },
  sfx2: [
    { at: 0.04, name: 'deep_boom_2', gain: -4, dur: 0.36 }, { at: '@turn', name: 'money_counter_2', gain: -13, dur: 2.4 },
    { at: '@like', name: 'pop_2', gain: -9, dur: 0.3 }, { at: '@send-0.05', name: 'swoosh_1', gain: -9, dur: 0.9 },
    { at: '@follow+0.05', name: 'pop_1', gain: -9, dur: 0.5 }, { at: '@follow+0.8', name: 'click_1', gain: -8, dur: 0.3 }, { at: '@follow+0.9', name: 'success_chime_1', gain: -12, dur: 1.2 },
    { at: '@000#7', name: 'money_counter_1', gain: -13, dur: 1.2 }, { at: '@cash#3', name: 'pop_1', gain: -9, dur: 0.5 },
  ],
});
BM2.scene(S);
