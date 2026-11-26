// TikTok cut — "1,023 people flipped for a million and got nothing." Hook = the crowd going to $0 live. Different order: crowd first (flip 1, 3, 5 with live pot), car, send, flip 7, flip 10, winner, follow, average, same as cash, ask.
const H = { until: "@here's-0.1", y: 690, size: 66, lines: [[['1,023 PEOPLE FLIPPED', 'bad']], [['FOR A MILLION', 'good']], [['AND GOT NOTHING', 'paper']]] };
const F10 = [27.9, 29.9, 31.0, 35.4, 36.0, 42.3, 42.8, 47.55, 47.85, 48.2];
const S = DN5.make({
  dur: 72.40, flips10: F10,
  K: [[0, 0], [60, 0], ['@000#5', 1000]],
  C: [{ from: 0, mode: 'z', a: 0.8, b: 3.8 }, { from: "@here's-0.1", mode: 'f' }, { from: '@now#1-0.1', mode: 'c' }, { from: '@now#2-0.1', mode: 'a' }],
  hook: H,
  scenes: [
    { type: 'crowd', from: 0, to: "@here's-0.1", pose: 'shock', sc: 0.62, dy: 135, noSide: true, sweep: [0.8, 3.8], appear: 0, noSfx: true, spotAt: 3.9, tags: [{ at: 3.9, text: '1 WINNER · 1,023 GOT $0', tone: 'bad', y: 1060 }] },
    { type: 'cash', from: "@here's-0.1", to: '@or-0.1', pose: 'talk', at: '@grab', chip: { at: '@cash#1', text: '$1,000 CASH · SAFE' } },
    { type: 'demo', from: '@or-0.1', to: '@and#2-0.1', pose: 'shock', flips: [{ at: 8.5, dur: 0.7, res: 'H' }, { at: 10.1, dur: 0.55, res: 'T' }] },
    { type: 'tenrow', from: '@and#2-0.1', to: "@it's#1-0.1", pose: 'chin', at: '@10-0.05', title: 'NO QUITTING · 10 IN A ROW', chip: { at: '@pull', text: 'PULL THAT OFF…' } },
    { type: 'bignum', from: "@it's#1-0.1", to: '@sounds-0.1', pose: 'shock', at: '@$1#1', dur: 1.0, num: 1024000, pre: '$', col: '#00D26A', chip: { at: '@000#1+0.35', text: "THAT'S 1,024 × THE CASH" } },
    { type: 'choice', from: '@sounds-0.1', to: '@tap-0.1', pose: 'you', pick: '@coin#2-0.05', or: '@easy', cash: { at: '@sounds' }, coin: { at: '@easy', flips: [{ at: '@most', dur: 0.9, res: 'H' }] }, chip: { at: '@coin#2', text: 'MOST GRAB THE COIN', tone: 'accent' } },
    { type: 'ask', from: '@tap-0.1', to: '@now#1-0.1', pose: 'you', l1: 'GRABBING', l2: 'THE COIN TOO?' },
    { type: 'crowd', from: '@now#1-0.1', to: '@$32-0.1', pose: 'shock', appear: '@put', holds: true,
      tags: [{ at: '@put+0.4', out: '@flip#3', text: '1,024 PEOPLE · ONE ROOM', tone: 'ink' }, { at: '@flip#3', out: '@flip#4', text: 'FLIP 1: HALF HIT TAILS · BROKE', tone: 'bad' }, { at: '@survivors', out: '@flip#5', text: 'FLIP 3: ONLY 1 IN 8 LEFT', tone: 'bad' }, { at: '@flip#5', text: 'FLIP 5: 32 PEOPLE LEFT', tone: 'ink' }] },
    { type: 'big', from: '@$32-0.1', to: '@send-0.1', pose: 'shock', at: '@$32', text: '$32,000', col: '#FFD60A', car: true, chip: { at: '@basically', text: 'BASICALLY A NEW CAR', tone: 'accent' } },
    { type: 'ask', from: '@send-0.1', to: '@by#1-0.1', pose: 'you', l1: 'FRIEND WHO NEVER', l2: 'TAKES THE SAFE CASH' },
    { type: 'crowd', from: '@by#1-0.1', to: '@follow-0.1', pose: 'shock', appear: 23.3, holds: true, spotAt: '@one#3', pop: false,
      tags: [{ at: '@by#1', out: '@but#1', text: 'FLIP 7 · POT $128,000', tone: 'ink' }, { at: '@but#1', out: '@by#2', text: 'ALMOST EVERYBODY IS OUT', tone: 'bad' }, { at: '@by#2', out: '@one#3', text: 'FLIP 10', tone: 'ink' }, { at: '@one#3', out: '@that#2', text: 'ONE PERSON LEFT', tone: 'good' }, { at: '@million#2-0.3', out: '@other', text: '1 WINNER · $1,024,000', tone: 'good' }, { at: '@023#2', text: '1,023 PEOPLE · $0 EACH', tone: 'bad' }] },
    { type: 'ask', from: '@follow-0.1', to: '@now#2-0.1', pose: 'you', l1: 'A COIN JUST', l2: 'ROASTED YOUR GUT?' },
    { type: 'duo', from: '@now#2-0.1', to: '@same-0.1', pose: 'chin', a: { at: '@split-0.1', col: '#FFD60A', l1: '$1,024,000', l2: 'SPLIT 1,024 WAYS' }, b: { at: '@$1#2-0.35', col: '#00D26A', l1: 'EACH AVERAGES', l2: '$1,000' } },
    { type: 'eq', from: '@same-0.1', to: '@so-0.1', pose: 'talk', a: { at: '@same', col: '#00D26A', l1: 'THE CASH', l2: '$1,000', l3: 'FOR SURE' }, b: { at: '@coin#4', col: '#FFD60A', l1: 'THE COIN', l2: '$1,000', l3: 'ON AVERAGE' }, mid: '@as', chip: { at: '@hides', text: 'THE COIN JUST HIDES THE LOSERS', tone: 'accent' } },
    { type: 'ask', from: '@so-0.1', to: 99, pose: 'you', l1: 'CASH OR COIN?', l2: 'ONE WORD' },
  ],
  hideCounter: [['@so-0.1', 99]],
  labels: [[0, 'THE RESULT'], ["@here's-0.1", 'THE BET'], ['@or-0.1', 'THE COIN'], ['@and#2-0.1', 'THE CATCH'], ["@it's#1-0.1", 'THE PRIZE'], ['@sounds-0.1', 'THE CHOICE'], ['@now#1-0.1', 'THE ROOM'], ['@by#1-0.1', 'THE LATE FLIPS'], ['@one#3-0.1', 'THE WINNER'], ['@now#2-0.1', 'THE TWIST']],
  notes: [],
  you: [{ at: 0, mood: 'wow', text: 'YOU: 1,023 BROKE?' }, { at: "@here's", mood: 'neutral', text: 'CASH: $1,000' }, { at: '@or', mood: 'smirk', text: 'OR A COIN…' }, { at: '@tails', mood: 'angry', text: 'TAILS = $0' }, { at: '@and#2', mood: 'worried', text: '10 IN A ROW' }, { at: '@$1#1', mood: 'wow', text: '$1,024,000!' }, { at: '@sounds', mood: 'smirk', text: 'COIN, EASY' },
    { at: '@now#1', mood: 'worried', text: 'IN THE ROOM' }, { at: '@$32', mood: 'happy', text: 'NEW CAR?' }, { at: '@by#1', mood: 'worried', text: 'STILL FLIPPING' }, { at: '@one#3', mood: 'wow', text: 'JUST ONE' }, { at: '@other', mood: 'angry', text: 'YOU: $0' }, { at: '@now#2', mood: 'neutral', text: 'THE WILD PART' }, { at: '@same', mood: 'smirk', text: 'SAME AS CASH' }, { at: '@so', mood: 'smirk', text: 'YOUR CALL' }],
  cta: { like: '@tap-0.1', send: '@send', follow: '@follow+0.05', followOut: '@follow+1.9', bubble: { at: '@cash#4', l1: 'CASH OR COIN?', l2: 'COMMENT BELOW' } },
  poses: [['@tap', 'you'], ['@send', 'you']],
  shakes: [[0.1, 8], ['@$1#1+0.8', 12], ['@one#3', 12]],
  captions: { gap: 16, emph: { 'coin': 'accent', 'coin.': 'accent', 'coin?': 'accent', 'million': 'good', 'million.': 'good', 'nothing.': 'bad', 'zero.': 'bad', 'broke.': 'bad', 'losers.': 'bad', 'roasted': 'bad' }, fix: [] },
  sfx2: [
    { at: 0.04, name: 'deep_boom_2', gain: -4, dur: 0.36 }, { at: 0.8, name: 'money_counter_2', gain: -14, dur: 3.0 },
    { at: '@tap', name: 'pop_2', gain: -9, dur: 0.3 }, { at: '@send-0.05', name: 'swoosh_1', gain: -9, dur: 0.9 },
    { at: '@follow+0.05', name: 'pop_1', gain: -9, dur: 0.5 }, { at: '@follow+0.8', name: 'click_1', gain: -8, dur: 0.3 }, { at: '@follow+0.9', name: 'success_chime_1', gain: -12, dur: 1.2 },
    { at: '@000#5', name: 'money_counter_1', gain: -13, dur: 1.2 }, { at: '@cash#4', name: 'pop_1', gain: -9, dur: 0.5 },
  ],
});
BM2.scene(S);
