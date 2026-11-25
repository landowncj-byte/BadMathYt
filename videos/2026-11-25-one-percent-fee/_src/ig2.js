const F0 = { x: 0, y: -60, w: 780, h: 1260 };
const FR = { fill: 0.84, maxH: 1230, sx: 570, sy: 1040 };
BM2.scene({
  series: 'whatif', title: 'THE 1% FEE', duration: 21.82,
  footnote: ['HYPOTHETICAL · 7% IS AN ASSUMPTION, NOT A FORECAST', 'MONTHLY COMPOUNDING · NO TAXES · NOT FINANCIAL ADVICE', 'FEES ARE LEGAL & DISCLOSED · NO REAL FUNDS NAMED', 'PHOTOS: IMAGES_OF_MONEY (CC BY 2.0), FRAN.TRUDEAU (CC BY-SA 2.0), VIA FLICKR'],
  elements: [
    // --- station 1: frame-0 slam (slow-motion pickpocket) + loop frame ---
    { id: 'hook', type: 'text', at: [0, -640], in: -1, out: 4.05, props: { lines: [[['1% =', 'bad']], [['SLOW-ASS', 'paper']], [['ROBBERY', 'bad']]], size: 118 } },
    { id: 'art', type: 'slam', at: [0, 300], scale: 1.25, in: -1, props: { variant: 'wallet', reAt: 20.85 } },
    { id: 'note', type: 'stamp', at: [0, 120], rot: -0.06, in: '@legal-0.05', out: 4.05, props: { text: 'LEGAL & DISCLOSED', tone: 'good', size: 62 } },
    { id: 'endt', type: 'text', at: [0, -640], in: 20.85, props: { lines: [[['1% =', 'bad']], [['SLOW-ASS', 'paper']], [['ROBBERY', 'bad']]], size: 118 } },
    // --- station 2: twin (races to year 40) ---
    { id: 'twin', type: 'twin', at: [1750, 0], in: 6.75, props: { feeTagAt: 7.2, ripAt: 10.75,
      chips: [['@500', '$500/MO'], ['@40', '40 YRS'], ['@assumed', 'ASSUMES 7%']],
      ticker: [[0, 0], [7.4, 0], [10.45, 40]], gaps: [] } },
    // --- station 3: the bill ---
    { id: 'fee', type: 'fee', at: [3500, 0], in: 10.5, props: { feeAt: 11.0, putAt: '@only', moreAt: 17.7 } },
    // --- screen-fixed ---
    { id: 'hyp', type: 'chip', layer: 'screen', at: [850, 264], in: 0.4, props: { text: 'HYPOTHETICAL', size: 24 } },
    { id: 'ever', type: 'text', layer: 'screen', at: [540, 400], in: '@Ever', out: 6.9, props: { lines: [['EVER CHECKED'], [['YOURS?', 'accent']]], size: 96 } },
    { id: 'heart', type: 'heart', layer: 'screen', at: [800, 900], in: '@double', props: { s: 1, dur: 0.9 } },
    { id: 'plane', type: 'plane', layer: 'screen', at: [0, 0], in: '@Send-0.05', out: '@Send+1.0', props: { from: [470, 1000], to: [1150, 420], dur: 0.85, s: 0.62 } },
    { id: 'ph1', type: 'photo', layer: 'screen', at: [215, 1030], in: '@double', out: 6.95, props: { src: 'brand/photos/stock/piggy-bank-coins/5.jpg', name: 'SAVINGS', role: '', credit: 'PHOTO: IMAGES_OF_MONEY · CC BY 2.0', w: 330, tilt: -0.07, treatment: 'paper', aspect: 1.0, tape: true } },
    { id: 'ph2', type: 'photo', layer: 'screen', at: [830, 1030], in: 13.2, out: 15.1, props: { src: 'brand/photos/stock/stacked-coins/1.jpg', name: 'COINS', role: '', credit: 'PHOTO: FRAN.TRUDEAU · CC BY-SA 2.0', w: 270, tilt: 0.06, treatment: 'paper', aspect: 0.8, tape: true } },
    { id: 'ask', type: 'bubble', layer: 'screen', at: [690, 720], in: '@Still', out: '@Still+1.5', props: { l1: 'STILL "NOTHING"?', l2: 'COMMENT', size: 50, tail: 'left' } },
  ],
  beats: [
    { at: 0, beat: 'side-by-side', focus: F0, ...FR, pose: 'shock', keep: ['hook', 'art', 'endt', 'note'] },
    { at: 0.4, beat: 'zoom-on-number', focus: 'hook', fill: 0.9, sy: 780, rot: 0.008, pose: 'point', keep: ['hook', 'art'] },
    { at: '@slow', beat: 'zoom-on-number', focus: 'art', fill: 0.9, sy: 940, rot: -0.01, pose: 'chin', keep: ['hook', 'art'] },
    { at: '@legal', beat: 'zoom-on-number', focus: 'note', fill: 0.92, sy: 760, rot: 0.01, pose: 'shrug', keep: ['hook', 'art', 'note'] },
    { at: '@Ever', beat: 'presenter-front', focus: 'art', sy: 820, pose: 'you' },
    { at: '@no', beat: 'presenter-front', focus: 'art', sy: 820, pose: 'shrug' },
    // twin
    { at: 7.1, beat: 'graphic-hero', focus: 'twin', move: 'whip', fill: 0.9, maxH: 900, sy: 840, st: 'corner-left', pose: 'idle' },
    { at: '@500', beat: 'zoom-on-number', focus: 'twin.tag', fill: 0.86, sy: 760, rot: 0.01, st: 'corner-left', pose: 'point' },
    { at: '@40', beat: 'zoom-on-number', focus: 'twin.tag', fill: 0.88, sy: 760, rot: -0.01, st: 'corner-left', pose: 'point', dur: 0.5 },
    { at: '@7%', beat: 'zoom-on-number', focus: 'twin.tag', fill: 0.9, sy: 760, rot: 0.01, st: 'corner-left', pose: 'point', dur: 0.5 },
    { at: 9.9, beat: 'graphic-hero', focus: 'twin', fill: 0.9, maxH: 900, sy: 840, st: 'corner-left', pose: 'idle', dur: 0.5 },
    // payoff
    { at: 10.85, beat: 'peek', focus: 'fee', move: 'whip', sy: 880, maxH: 820, pose: 'idle' },
    { at: '@316', beat: 'zoom-on-number', focus: 'fee.fee', fill: 0.97, sy: 700, rot: 0.01, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@grand', beat: 'pull-back', focus: 'fee', fill: 0.84, maxH: 900, sy: 770, st: 'corner-left', pose: 'shock' },
    { at: '@Send', beat: 'peek', focus: 'fee', sy: 880, maxH: 820, pose: 'you' },
    { at: '@checked#2', beat: 'graphic-hero', focus: 'fee', fill: 0.86, maxH: 900, sy: 780, st: 'corner-left', pose: 'idle' },
    { at: '@only', beat: 'zoom-on-number', focus: 'fee.put', fill: 0.9, sy: 760, rot: -0.01, st: 'corner-left', pose: 'shrug' },
    { at: 17.7, beat: 'zoom-on-number', focus: 'fee.more', fill: 0.9, sy: 800, rot: 0.01, st: 'corner-left', pose: 'shock' },
    { at: '@Still', beat: 'presenter-front', focus: 'fee', sy: 770, pose: 'chin' },
    { at: 20.85, beat: 'side-by-side', focus: F0, move: 'whip', ...FR, pose: 'shock', keep: ['hook', 'art', 'endt', 'note'] },
  ],
  shakes: [[0.3, 8], ['@legal', 8], ['@316', 18], ['@only', 8], [17.7, 10]],
  captions: { emph: { '1%': 'bad', 'legal.': 'good', '316': 'bad', '7%.': 'accent', '240.': 'good' }, fix: [
    ['slow ass', 'slow-ass'], ['robbery and', 'robbery, and'], ['fees,', 'fees?'], ['double tap', 'Double-tap'], ['1% is nothing.', "1%'s nothing?"] ] },
  bed: { name: 'lofi_bed_1', gain: -1 },
  sfx: [
    { at: 0, name: 'deep_boom_2', gain: -4, dur: 0.36 }, { at: 0.5, name: 'pop_1', gain: -10, dur: 0.4 },
    { at: '@legal-0.05', name: 'rubber_stamp_2', gain: -4, dur: 0.5 }, { at: '@legal-0.05', name: 'deep_boom_2', gain: -9, dur: 0.36 },
    { at: '@double', name: 'pop_2', gain: -9, dur: 0.3 },
    { at: 7.2, name: 'click_1', gain: -8, dur: 0.25 }, { at: 7.2, name: 'pop_2', gain: -9, dur: 0.3 },
    { at: '@500', name: 'cash_register_1', gain: -9, dur: 0.9 }, { at: '@40', name: 'pop_1', gain: -9, dur: 0.4 }, { at: '@assumed', name: 'click_2', gain: -9, dur: 0.2 },
    { at: 7.4, name: 'money_counter_2', gain: -12, dur: 2.9 },
    { at: 10.75, name: 'paper_slam_2', gain: -10, dur: 0.5 },
    { at: 11.0, name: 'money_counter_2', gain: -11, dur: 0.9 }, { at: 11.3, name: 'deep_boom_1', gain: -2, dur: 1.6 }, { at: 11.3, name: 'cinematic_hit_1', gain: -6, dur: 1.2 },
    { at: '@Send-0.05', name: 'swoosh_1', gain: -9, dur: 0.9 },
    { at: '@only+0.05', name: 'pop_1', gain: -9, dur: 0.4 }, { at: 17.7, name: 'rubber_stamp_2', gain: -3, dur: 0.5 }, { at: 17.7, name: 'deep_boom_2', gain: -8, dur: 0.36 },
    { at: '@Still-0.1', name: 'pop_1', gain: -9, dur: 0.5 },
  ],
});
