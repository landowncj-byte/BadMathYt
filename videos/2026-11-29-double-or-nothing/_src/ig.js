// IG cut — "This coin flip makes a million look easy." Different order: cash · coin demo · 10 in a row · prize · ladder (3 heads, 5 heads, car) · send · crowd · odds · one right day in 2.8 years · follow · winner · twist · same as cash · ask
const H = { until: '@take-0.1', y: 700, size: 66, lines: [[['THIS COIN FLIP MAKES', 'paper']], [['A MILLION LOOK EASY', 'good']], [["IT'S NOT", 'bad']]] };
const F10 = [43.4, 43.85, 44.25, 44.6, 44.9, 45.2, 45.5, 45.75, 46.0, 46.3];
const lf = (at, n, dur = 0.45) => ({ at, dur, res: 'H', n });
const S = DN5.make({
  dur: 71.70, flips10: F10,
  K: [[0, 0], ['@coin#1', 0], ['@million', 10], ['@not-0.05', 10], ['@not+0.2', 0], ['@$1#2', 0], ['@000#2', 10], ['@double-0.3', 10], ['@double-0.1', 0],
    [22.0, 0], [22.4, 1], [22.45, 1], [22.85, 2], [22.9, 2], [23.25, 3], [26.3, 3], [26.7, 4], [26.8, 4], [27.25, 5], [62.1, 0], ['@000#5', 1000]],
  C: [{ from: 0, mode: 'f' }, { from: "@here's-0.1", mode: 'c' }, { from: '@spread-0.1', mode: 'a' }],
  hook: H,
  scenes: [
    { type: 'choice', from: 0, to: '@take-0.1', pose: 'shock', sc: 0.5, dy: 215, cash: { at: 0.25 }, coin: { at: 0.4, flips: [{ at: 0.9, dur: 0.8, res: 'H' }, { at: 2.3, dur: 0.8, res: 'H' }] } },
    { type: 'cash', from: '@take-0.1', to: '@or-0.1', pose: 'talk', at: '@take', chip: { at: '@cash', text: 'CASH · RIGHT NOW' } },
    { type: 'demo', from: '@or-0.1', to: '@and#1-0.1', pose: 'shock', flips: [{ at: 7.75, dur: 0.7, res: 'H' }, { at: 9.0, dur: 0.6, res: 'T' }] },
    { type: 'tenrow', from: '@and#1-0.1', to: '@with-0.1', pose: 'chin', at: '@10-0.05', title: '10 HEADS IN A ROW', chip: { at: '@no', text: 'NO BAILING EARLY' } },
    { type: 'bignum', from: '@with-0.1', to: '@double-0.1', pose: 'shock', at: '@$1#2', dur: 1.05, num: 1024000, pre: '$', col: '#00D26A', chip: { at: '@000#2+0.35', text: "THAT'S 1,024 × THE CASH" } },
    { type: 'ask', from: '@double-0.1', to: 21.85, pose: 'you', l1: 'WOULD YOU FLIP', l2: 'WITHOUT THINKING?' },
    { type: 'ladder', from: 21.85, to: '@send-0.1', pose: 'shock', flips: [lf(21.95, 1), lf(22.4, 2), lf(22.8, 3), lf(26.2, 4, 0.5), lf(26.75, 5, 0.5)], lit: [22.4, 22.85, 23.25, 26.7, 27.25], car: { at: '@real-0.3' }, chipOut: '@send-0.15',
      chips: [{ at: 23.25, text: 'WON 3 · POT $8,000', tone: 'good' }, { at: '@eight', text: 'ONLY 1 IN 8 GETS THERE', tone: 'bad' }, { at: 27.3, text: 'WON 5 · POT $32,000', tone: 'good' }, { at: '@32#1', text: "NOW IT'S 1 IN 32", tone: 'bad' }, { at: '@everyone', text: 'EVERYONE ELSE: $0', tone: 'bad' }] },
    { type: 'ask', from: '@send-0.1', to: "@here's-0.1", pose: 'you', l1: 'FRIEND WHO BETS', l2: 'THE RENT ON ONE FLIP' },
    { type: 'crowd', from: "@here's-0.1", to: '@your#2-0.1', pose: 'shock', appear: '@line', holds: true, spotAt: '@one#4',
      tags: [{ at: '@line+0.5', out: '@every#2', text: '1,024 PEOPLE · ONE LINE', tone: 'ink' }, { at: '@every#2', out: '@after', text: 'EVERY FLIP: HALF WIPED OUT', tone: 'bad' }, { at: '@after', out: '@one#4', text: 'AFTER 10 FLIPS…', tone: 'ink' }, { at: '@one#4', text: 'ONE PERSON LEFT', tone: 'good' }] },
    { type: 'odds', from: '@your#2-0.1', to: "@that's-0.1", pose: 'chin', at: '@about#1', chip: { at: '@1#2', text: 'ONE IN 1,024 · ABOUT 0.1%', tone: 'ink' } },
    { type: 'days', from: "@that's-0.1", to: '@follow-0.1', pose: 'chin', at: "@that's+0.2", pickAt: '@day', chip: { at: '@years', text: 'RIGHT DAY OUT OF ~3 YEARS', tone: 'accent' } },
    { type: 'ask', from: '@follow-0.1', to: '@the#6-0.1', pose: 'you', l1: 'THE ENDING', l2: 'FLIPS THIS WHOLE THING' },
    { type: 'crowd', from: '@the#6-0.1', to: '@spread-0.1', pose: 'shock', appear: 40.62, holds: false, spotAt: 46.66, noSfx: true, pop: false,
      tags: [{ at: '@million#2-0.3', out: '@other', text: '1 WINNER · $1,024,000', tone: 'good' }, { at: '@023', text: '1,023 PEOPLE · $0 EACH', tone: 'bad' }] },
    { type: 'duo', from: '@spread-0.1', to: '@same-0.1', pose: 'chin', a: { at: '@spread', col: '#FFD60A', l1: '$1,024,000', l2: 'SPREAD ACROSS 1,024' }, b: { at: "@it's#3-0.1", col: '#00D26A', l1: 'EACH GETS', l2: '$1,000' } },
    { type: 'eq', from: '@same-0.1', to: '@so#1-0.1', pose: 'talk', a: { at: '@same', col: '#00D26A', l1: 'THE BORING CASH', l2: '$1,000', l3: 'FOR SURE' }, b: { at: '@boring', col: '#FFD60A', l1: 'THE COIN', l2: '$1,000', l3: 'ON AVERAGE' }, mid: '@as', chip: { at: '@hides', text: 'THE COIN HIDES THE LOSERS', tone: 'accent' } },
    { type: 'ask', from: '@so#1-0.1', to: 99, pose: 'you', l1: 'CASH OR COIN?', l2: 'ONE WORD' },
  ],
  hideCounter: [['@so#1-0.1', 99]],
  labels: [[0, 'THE BAIT'], ['@take-0.1', 'THE CASH'], ['@or-0.1', 'THE COIN'], ['@and#1-0.1', 'THE CATCH'], ['@with-0.1', 'THE PRIZE'], ['@double-0.1', 'THE GUT CALL'], ['@three-0.1', 'THE LADDER'], ["@here's-0.1", 'THE CROWD'], ['@your#2-0.1', 'THE ODDS'], ['@the#6-0.1', 'THE WINNER'], ['@spread-0.1', 'THE TWIST']],
  notes: [],
  you: [{ at: 0, mood: 'smirk', text: 'YOU: EASY MILLION?' }, { at: '@take', mood: 'neutral', text: 'CASH: $1,000' }, { at: '@or', mood: 'smirk', text: 'OR A COIN…' }, { at: '@tails', mood: 'angry', text: 'TAILS = $0' }, { at: '@and#1', mood: 'worried', text: '10 IN A ROW' }, { at: '@$1#2', mood: 'wow', text: '$1,024,000!' }, { at: '@double', mood: 'smirk', text: 'FLIP, NO THINKING' },
    { at: '@three', mood: 'happy', text: 'HEADS!' }, { at: '@crying', mood: 'worried', text: 'CRYING IN LOT' }, { at: "@here's", mood: 'worried', text: 'IN THE LINE' }, { at: '@one#4', mood: 'wow', text: 'JUST ONE' }, { at: '@the#6', mood: 'angry', text: 'YOU: $0' }, { at: '@spread', mood: 'neutral', text: 'THE TWIST' }, { at: '@same', mood: 'smirk', text: 'SAME AS CASH' }, { at: '@so#1', mood: 'smirk', text: 'YOUR CALL' }],
  cta: { like: '@tap-0.1', send: '@send', follow: '@follow+0.05', followOut: '@follow+1.9', bubble: { at: '@coin#5', l1: 'CASH OR COIN?', l2: 'COMMENT BELOW' } },
  poses: [['@tap', 'you'], ['@send', 'you']],
  shakes: [[0.1, 8], ['@$1#2+0.8', 12], ['@one#4', 12]],
  captions: { gap: 16, emph: { 'coin': 'accent', 'coin.': 'accent', 'coin?': 'accent', 'million': 'good', 'million.': 'good', 'fucking': 'bad', 'damn': 'bad', 'tails,': 'bad', 'nothing.': 'bad', 'cash.': 'good', 'losers.': 'bad' }, fix: [] },
  sfx2: [
    { at: 0.04, name: 'deep_boom_2', gain: -4, dur: 0.36 }, { at: '@coin#1', name: 'money_counter_2', gain: -13, dur: 2.4 },
    { at: '@tap', name: 'pop_2', gain: -9, dur: 0.3 }, { at: '@send-0.05', name: 'swoosh_1', gain: -9, dur: 0.9 },
    { at: '@follow+0.05', name: 'pop_1', gain: -9, dur: 0.5 }, { at: '@follow+0.8', name: 'click_1', gain: -8, dur: 0.3 }, { at: '@follow+0.9', name: 'success_chime_1', gain: -12, dur: 1.2 },
    { at: '@000#5', name: 'money_counter_1', gain: -13, dur: 1.2 }, { at: '@coin#5', name: 'pop_1', gain: -9, dur: 0.5 },
  ],
});
BM2.scene(S);
