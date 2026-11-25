const F0 = { x: 0, y: -10, w: 800, h: 1380 };   // frame 0 and the loop frame share this framing
const HOOK = { lines: [[['A ', 'paper'], ['1%', 'bad'], [' FEE', 'paper']], ['COST MORE THAN'], [['YOU PUT IN', 'bad']]], size: 104 };
BM2.scene({
  series: 'whatif', title: 'THE 1% FEE', duration: 50.75,
  footnote: ['HYPOTHETICAL · 7% IS AN ASSUMPTION, NOT A FORECAST · NOT FINANCIAL ADVICE', '$500/MONTH × 40 YEARS · MONTHLY COMPOUNDING · NO TAXES · FUND B = 7% − 1% FEE = 6%'],
  elements: [
    // --- station 1: hook + the setup card (frame 0 and the loop point) ---
    { id: 'hook', type: 'text', at: [0, -520], in: -1, out: '@Two-0.1', props: HOOK },
    { id: 'plan', type: 'plan', at: [0, 230], in: -1, props: { aAt: '@identical', bAt: '@same', feeAt: '@charges+0.3', depAt: '@500', putAt: '@240', rateAt: '@7' } },
    { id: 'endt', type: 'text', at: [0, -520], in: '@next-0.4', props: HOOK },
    // --- station 2: the twin growing columns ---
    { id: 'twin', type: 'twin', at: [1750, 0], in: '@math>-0.2', props: { ticker: [[0, 0], [18.55, 0], [19.3, 10], [22.5, 10], [23.3, 20], [24.7, 20], [25.4, 30], [27.4, 30], [28.9, 40]],
      gaps: [{ year: 10, at: '@4' }, { year: 20, at: '@29' }, { year: 30, at: '@107' }, { year: 40, at: '@funda' }], ghostAt: '@$316' } },
    // --- station 3: the bill ---
    { id: 'fee', type: 'fee', at: [3500, 0], in: '@$316+1.4', props: { feeAt: '@Wait+0.1', putAt: '@240#2', moreAt: '@put#3+0.5', mathAt: '@put#3+0.9' } },
    // --- station 4: 24% of the pot ---
    { id: 'pt', type: 'text', at: [5250, -520], in: '@1#6', props: { lines: [[['1% A YEAR', 'paper'], [' =', 'accent']]], size: 100 } },
    { id: 'pie', type: 'pie', at: [5250, 90], in: '@1#6', props: { r: 250, total: 1312407, slices: [{ value: 995745, tone: 'gold', label: 'FUND B', at: '@1#6+0.1' }, { value: 316661, tone: 'bad', label: 'THE FEE', at: '@24' }], center: { to: 24, suffix: '%', at: '@24', dur: 0.9, label: 'OF THE POT', size: 150 } } },
    // --- screen-fixed ---
    { id: 'ask', type: 'bubble', layer: 'screen', at: [650, 1010], in: '@So', out: '@Follow-0.45', props: { l1: 'STILL "SMALL"?', l2: 'COMMENT', size: 52, tail: 'left' } },
    { id: 'btn', type: 'follow', layer: 'screen', at: [650, 1120], in: '@Follow+0.1', out: '@next', props: { press: 0.85 } },
  ],
  beats: [
    { at: 0, beat: 'side-by-side', focus: F0, fill: 0.56, sx: 650, sy: 850, pose: 'talk', keep: ['hook', 'plan', 'endt'] },
    { at: '@only', beat: 'zoom-on-number', focus: 'hook', fill: 0.9, sy: 640, rot: 0.008, pose: 'point' },                  // push: 1%
    { at: '@ever', beat: 'presenter-front', focus: 'plan', sy: 820, pose: 'talk' },
    { at: '@Two', beat: 'graphic-hero', focus: 'plan.funds', fill: 0.8, sy: 880, st: 'corner', pose: 'point' },
    { at: '@One', beat: 'zoom-on-number', focus: 'plan.fb', fill: 0.84, sy: 880, rot: -0.008, pose: 'point' },                 // push: the 1%
    { at: '@that\'s#2', beat: 'pull-back', focus: 'plan', fill: 0.74, sy: 830 },
    { at: '@500', beat: 'zoom-on-number', focus: 'plan.dep', fill: 0.8, sy: 950, rot: 0.01, pose: 'point' },                  // push: $500/mo x 40y
    { at: '@240', beat: 'zoom-on-number', focus: 'plan.put', fill: 0.66, sy: 940, rot: -0.008, dur: 0.5 },                    // push: $240,000
    { at: '@Say', beat: 'presenter-front', focus: 'plan', sy: 820, pose: 'talk' },
    { at: '@7', beat: 'zoom-on-number', focus: 'plan.assume', fill: 0.72, sy: 980, rot: 0.01, st: 'corner-left', pose: 'point' },  // push: 7%
    { at: '@After', beat: 'graphic-hero', focus: 'twin', move: 'whip', fill: 0.9, maxH: 940, sy: 770, st: 'corner-left', pose: 'idle' },
    { at: '@4', beat: 'zoom-on-number', focus: 'twin.tag', fill: 0.84, sy: 760, rot: 0.01, st: 'corner-left', pose: 'point' },   // push: year 10 gap
    { at: '@whatever', beat: 'zoom-on-number', focus: 'twin.base', fill: 0.84, sy: 660, rot: -0.008, st: 'corner-left', pose: 'shrug', dur: 0.55 },
    { at: '@20', beat: 'pull-back', focus: 'twin', fill: 0.9, maxH: 940, sy: 770, st: 'corner-left', pose: 'idle' },
    { at: '@29', beat: 'zoom-on-number', focus: 'twin.tag', fill: 0.84, sy: 760, rot: 0.01, st: 'corner-left', pose: 'point' },  // push: year 20 gap
    { at: '@30', beat: 'pull-back', focus: 'twin', fill: 0.9, maxH: 940, sy: 770, st: 'corner-left' },
    { at: '@107', beat: 'zoom-on-number', focus: 'twin.tag', fill: 0.84, sy: 760, rot: -0.01, st: 'corner-left', pose: 'shock' }, // push: year 30 gap
    { at: '@40#2', beat: 'pull-back', focus: 'twin', fill: 0.9, maxH: 940, sy: 770, st: 'corner-left', pose: 'idle' },
    { at: '@funda', beat: 'zoom-on-number', focus: 'twin.tops', fill: 0.8, sy: 780, rot: 0.008, st: 'corner-left', pose: 'point' },  // push: A 1.31M
    { at: '@995', beat: 'zoom-on-number', focus: 'twin.tops', fill: 0.8, sy: 780, rot: -0.01, st: 'corner-left', dur: 0.5 },     // slide: B 995k
    { at: '@That', beat: 'graphic-hero', focus: 'twin', fill: 0.9, maxH: 940, sy: 770, st: 'corner-left', pose: 'point' },
    { at: '@$316', beat: 'zoom-on-number', focus: 'twin.ghost', fill: 0.8, sy: 700, st: 'corner-left', pose: 'shock', rot: 0.01 },   // push: the fee
    { at: '@Wait', beat: 'peek', focus: 'fee', move: 'whip', sy: 880, maxH: 820, pose: 'idle' },                               // behind the bill
    { at: '@240#2', beat: 'zoom-on-number', focus: 'fee.put', fill: 0.9, sy: 760, st: 'corner-left', pose: 'shock', rot: -0.01 },   // push: $240,000
    { at: '@put#3', beat: 'pull-back', focus: 'fee', fill: 0.84, maxH: 900, sy: 770, st: 'corner-left', pose: 'point' },
    { at: '@1#6', beat: 'side-by-side', focus: ['pt', 'pie'], move: 'whip', fill: 0.8, maxH: 880, sx: 640, sy: 880, pose: 'point' },
    { at: '@24', beat: 'zoom-on-number', focus: 'pie', fill: 0.72, maxH: 760, sy: 860, st: 'corner-left', pose: 'shock' },       // push: 24%
    { at: '@pot', beat: 'pull-back', focus: ['pt', 'pie'], fill: 0.8, maxH: 880, sy: 880, st: 'corner-left' },
    { at: '@So', beat: 'presenter-front', focus: 'pie', sy: 770, pose: 'chin', keep: ['pie'] },                                // front 3
    { at: '@Follow', beat: 'presenter-front', focus: 'pie', sy: 770, pose: 'follow' },
    { at: '@next', beat: 'side-by-side', focus: F0, move: 'whip', fill: 0.56, sx: 650, sy: 850, pose: 'talk', keep: ['hook', 'plan', 'endt'] },  // loop
  ],
  poses: [['@Follow', 'follow', { target: [650, 1120] }]],
  shakes: [['@$316', 16], ['@24', 12], ['@107', 8], ['@240', 8]],
  captions: { emph: { '1%': 'bad', '4,600': 'bad', '29,000.': 'bad', '107,000.': 'bad', '$316,000.': 'bad', '24%': 'bad', '1.3,': 'good', '995,000.': 'accent', '240': 'good', '7%': 'accent' }, fix: [['funda', 'Fund A'], ['1.3, 1.31', '1.3— 1.31']] },
  bed: { name: 'lofi_bed_1', gain: -1 },
  sfx: [
    { at: 0, name: 'deep_boom_2', gain: -5, dur: 0.36 }, { at: '@only', name: 'pop_2', gain: -9, dur: 0.3 },
    { at: '@identical', name: 'pop_1', gain: -10, dur: 0.4 }, { at: '@same', name: 'pop_1', gain: -10, dur: 0.4 }, { at: '@charges+0.3', name: 'click_1', gain: -8, dur: 0.25 }, { at: '@charges+0.3', name: 'pop_2', gain: -9, dur: 0.3 },
    { at: '@500', name: 'cash_register_1', gain: -9, dur: 0.9 }, { at: '@240', name: 'money_counter_1', gain: -12, dur: 0.9 }, { at: '@240+0.7', name: 'ding_2', gain: -9, dur: 0.7 },
    { at: '@7', name: 'click_2', gain: -9, dur: 0.2 },
    { at: 18.55, name: 'money_counter_1', gain: -13, dur: 0.8 }, { at: 22.5, name: 'money_counter_1', gain: -13, dur: 0.8 }, { at: 24.7, name: 'money_counter_1', gain: -13, dur: 0.8 }, { at: 27.4, name: 'money_counter_2', gain: -12, dur: 1.5 },
    { at: '@4', name: 'ding_2', gain: -9, dur: 0.6 }, { at: '@29', name: 'ding_2', gain: -8, dur: 0.6 }, { at: '@107', name: 'ding_2', gain: -7, dur: 0.6 }, { at: '@107', name: 'sub_drop_1', gain: -9, dur: 0.9 },
    { at: '@funda', name: 'cash_register_1', gain: -8, dur: 0.9 }, { at: '@995', name: 'pop_2', gain: -9, dur: 0.3 },
    { at: '@$316', name: 'deep_boom_1', gain: -4, dur: 1.6 }, { at: '@$316', name: 'money_counter_1', gain: -11, dur: 0.9 },
    { at: '@Wait', name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@Wait+0.1', name: 'money_counter_2', gain: -12, dur: 0.9 },
    { at: '@240#2+0.05', name: 'pop_1', gain: -9, dur: 0.4 }, { at: '@put#3+0.5', name: 'rubber_stamp_2', gain: -3, dur: 0.5 }, { at: '@put#3+0.5', name: 'deep_boom_2', gain: -8, dur: 0.36 },
    { at: '@1#6', name: 'pop_1', gain: -9, dur: 0.5 }, { at: '@24', name: 'money_counter_1', gain: -11, dur: 0.9 }, { at: '@24+0.9', name: 'deep_boom_1', gain: -4, dur: 1.6 },
    { at: '@So-0.1', name: 'pop_1', gain: -9, dur: 0.5 },
    { at: '@Follow+0.1', name: 'pop_1', gain: -9, dur: 0.5 }, { at: '@Follow+0.95', name: 'click_1', gain: -8, dur: 0.3 }, { at: '@Follow+1.05', name: 'success_chime_1', gain: -12, dur: 1.2 },
  ],
});
