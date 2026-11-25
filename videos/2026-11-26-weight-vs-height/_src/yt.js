const F0 = { x: 0, y: -190, w: 1240, h: 1220 };
const FR = { fill: 0.86, maxH: 1000, sx: 560, sy: 800 };
const HOOK = { lines: [[['CHOOSE THE $100s', 'paper']], [['−$202,980', 'bad']]], size: 96 };
const KEEP = ['hook', 'endt', 'scale', 'tower'];
const BTN = [['@stranger-0.1', '@bills#5>+0.2']];
BM2.scene({
  series: 'whatif', title: 'WEIGHT VS HEIGHT', duration: 71.2,
  footnote: ['HYPOTHETICAL · NOBODY IS OFFERING THIS · NOT FINANCIAL ADVICE', 'ASSUMES ≈1 G & 0.0043 IN PER BILL · CRISP, FLAT, WHOLE NOTES', 'AVG US MAN = CDC 199.0 LB · 68.9 IN (AUG 2021–AUG 2023)', 'PHOTOS: D.L. (CC BY-SA 2.0) · THE.COMEDIAN (CC BY 2.0) · VIA FLICKR'],
  elements: [
    { id: 'hook', type: 'text', at: [0, -690], in: -1, out: '@stranger-0.2', props: HOOK },
    { id: 'endt', type: 'text', at: [0, -690], in: '@bills#5>+0.25', props: HOOK },
    { id: 'scale', type: 'scale', at: [-300, 0], in: -1, props: { btnOff: BTN, slamAt: 0, btnAt: 0.1, pulses: ['@weight', '@Pile'], bigAt: '@million#2-0.5', fill: [
      { t: 0, v: 4500 }, { t: '@Pile-0.3', v: 4500 }, { t: '@Pile-0.1', v: 0, e: 'out' }, { t: '@weight', v: 0 }, { t: '@Pile#2-0.2', v: 31000, e: 'expo' }, { t: '@But-0.1', v: 31000 }, { t: '@But+0.4', v: 0, e: 'in' },
      { t: '@pound-0.3', v: 0 }, { t: '@pound+0.2', v: 1 }, { t: '@$9-0.1', v: 1 }, { t: '@$9+0.5', v: 454, e: 'expo' }, { t: '@His#3', v: 454 }, { t: '@20s#3', v: 30000, e: 'in' }, { t: '@million#2', v: 90264, e: 'expo' }, { t: '@bills#5>+0.25', v: 90264 }, { t: '@bills#5>+0.85', v: 4500 }] } },
    { id: 'tower', type: 'tower', at: [300, 0], in: -1, props: { btnOff: BTN, slamAt: 0.05, btnAt: 0.2, pulses: ['@height', '@Pile#2'], inchAt: '@inch', inchOut: '@Send', endAt: '@bills#5>+0.25', rise: [
      { t: 0, v: 36 }, { t: '@stacked', v: 36 }, { t: '@tall+0.3', v: 68.9, e: 'out' }, { t: '@And-0.5', v: 68.9 }, { t: '@And-0.1', v: 1, e: 'in' }, { t: '@So#3-0.4', v: 1 }, { t: '@$1+0.4', v: 68.9, e: 'expo' }, { t: '@bills#5>+0.25', v: 68.9 }, { t: '@bills#5>+0.85', v: 36 }] } },
    { id: 'offer', type: 'offer', at: [0, 1750], in: '@stranger-0.1', out: '@Pile+0.3', props: { keepAt: '@Keep' } },
    { id: 'five', type: 'fivex', at: [0, 20], in: '@$100#3-0.1', out: '@Hit-0.1', props: { xAt: '@five' } },
    { id: 'gram', type: 'gram', at: [1900, 0], in: '@But-0.4', out: '@So#2+0.3', props: { dropAt: '@But+0.1', gAt: '@gram', sameAt: '@same' } },
    { id: 'rows', type: 'rows', at: [1900, 1750], in: '@But#2-0.4', out: '@For+0.3', props: { lbAt: '@pounds', inAt: '@inches', moreAt: '@inches+0.5' } },
    { id: 'doll', type: 'doll', at: [-1900, 0], in: '@For-0.4', out: '@So#3+0.3', props: { lbAt: '@199-0.3', hAt: '@69-0.1' } },
    { id: 'tot', type: 'totals', at: [0, -1750], in: '@small-1.0', out: '@That\'s#2+0.3', props: { hAt: '@small-0.5', wAt: '@small-0.1', gapAt: '@200' } },
    { id: 'cal', type: 'calendar', at: [-1900, 1750], in: '@That\'s#2-0.4', out: '@Still+0.3', props: { at: '@That\'s#2+0.4', dur: 2.1, doneAt: '@years' } },
    { id: 'ph1', type: 'photo', layer: 'screen', at: [200, 1130], in: '@weight', out: '@Pile#2', props: { src: 'brand/photos/stock/bathroom-scale/3.jpg', name: 'SCALE', credit: 'D.L. · CC BY-SA 2.0', w: 250, tilt: -0.07, treatment: 'polaroid', aspect: 1.0 } },
    { id: 'ph2', type: 'photo', layer: 'screen', at: [880, 1130], in: '@stacked', out: '@$100#3-0.2', props: { src: 'brand/photos/stock/stack-of-hundred-dollar-bills/2.jpg', name: '$100 STACK', credit: 'THE.COMEDIAN · CC BY 2.0', w: 250, tilt: 0.07, treatment: 'polaroid', aspect: 1.0 } },
    // screen-fixed
    { id: 'hyp', type: 'chip', layer: 'screen', at: [850, 264], in: '@stranger', props: { text: 'HYPOTHETICAL', size: 24 } },
    { id: 'easy', type: 'text', layer: 'screen', at: [540, 345], in: '@easy', out: '@Hit-0.05', props: { lines: [[['EASY?', 'accent']]], size: 96 } },
    { id: 'g1', type: 'chip', layer: 'screen', at: [540, 345], in: '@every', out: '@So#2-0.1', props: { text: '≈1 G A BILL · ASSUMED', size: 30 } },
    { id: 'lbt', type: 'text', layer: 'screen', at: [540, 345], in: '@pound', out: '@And-0.1', props: { lines: [[['1 LB =', 'paper'], [' 454 BILLS', 'good']]], size: 76 } },
    { id: 'inc', type: 'text', layer: 'screen', at: [540, 345], in: '@inch', out: '@Send', props: { lines: [[['1 INCH =', 'paper'], [' 233 BILLS', 'accent']]], size: 76 } },
    { id: 'next', type: 'text', layer: 'screen', at: [540, 350], in: '@His#2', out: '@His#3', props: { lines: [[['HIS WEIGHT…', 'accent']]], size: 110 } },
    { id: 'heart', type: 'heart', layer: 'screen', at: [800, 900], in: '@like', props: { s: 1, dur: 0.9 } },
    { id: 'plane', type: 'plane', layer: 'screen', at: [0, 0], in: '@Send-0.05', out: '@Send+1.0', props: { from: [470, 1000], to: [1150, 420], dur: 0.85, s: 0.62 } },
    { id: 'btn', type: 'follow', layer: 'screen', at: [650, 1120], in: '@follow+0.05', out: '@follow+1.45', props: { press: 0.55 } },
    { id: 'ask', type: 'bubble', layer: 'screen', at: [690, 720], in: '@Still', out: '@bills#5>+0.25', props: { l1: 'STILL TAKING', l2: 'THE $100s?', size: 50, tail: 'left' } },
  ],
  beats: [
    { at: 0, beat: 'side-by-side', focus: F0, ...FR, pose: 'shock', st: { x: 540, y: 1250, s: 1.25 }, keep: KEEP },
    { at: '@$200', beat: 'zoom-on-number', focus: 'hook', fill: 0.8, sy: 560, rot: 0.008, pose: 'point', keep: KEEP },
    { at: '@A-0.3', beat: 'pull-back', focus: F0, ...FR, pose: 'talk', keep: KEEP, drift: 0.02 },
    // the offer
    { at: '@stranger', beat: 'graphic-hero', focus: 'offer', move: 'whip', fill: 0.92, maxH: 900, sy: 780, st: 'corner', pose: 'point' },
    { at: '@Keep', beat: 'zoom-on-number', focus: 'offer.keep', fill: 0.8, sy: 700, rot: 0.01, st: 'corner-left', pose: 'shock', keep: ['offer'] },
    // pile one
    { at: '@Pile', beat: 'graphic-hero', focus: 'scale', move: 'whip', fill: 0.8, maxH: 900, sy: 850, st: 'corner', pose: 'point' },
    { at: '@weight', beat: 'zoom-on-number', focus: 'scale.dial', fill: 0.62, sy: 760, rot: 0.01, st: 'corner', pose: 'shock', dur: 0.5 },
    { at: '@bills#2+0.3', beat: 'pull-back', focus: 'scale', fill: 0.82, maxH: 950, sy: 850, st: 'corner', pose: 'idle', drift: 0.03 },
    // pile two
    { at: '@Pile#2', beat: 'graphic-hero', focus: 'tower', move: 'whip', fill: 0.8, maxH: 900, sy: 850, st: 'corner-left', pose: 'point' },
    { at: '@stacked', beat: 'zoom-on-number', focus: 'tower.stack', fill: 0.62, sy: 780, rot: -0.01, st: 'corner-left', pose: 'point', dur: 0.5 },
    { at: '@tall', beat: 'pull-back', focus: F0, ...FR, pose: 'chin', keep: KEEP },
    // x5
    { at: '@$100#3', beat: 'presenter-front', focus: 'five', fill: 0.7, sy: 780, pose: 'you', keep: ['five'] },
    { at: '@five', beat: 'zoom-on-number', focus: 'five.x', fill: 0.75, sy: 740, rot: 0.01, st: 'corner-left', pose: 'shock', keep: ['five'] },
    { at: '@easy', beat: 'presenter-front', focus: 'five', fill: 0.7, sy: 780, pose: 'shrug', keep: ['five'], drift: 0.03 },
    { at: '@Hit', beat: 'graphic-hero', focus: 'tower', fill: 0.78, maxH: 900, sy: 850, st: 'right', pose: 'point', keep: ['tower'] },
    // twist 1: same weight
    { at: '@But', beat: 'graphic-hero', focus: 'gram', move: 'whip', fill: 0.94, maxH: 900, sy: 780, st: 'corner', pose: 'idle' },
    { at: '@every', beat: 'zoom-on-number', focus: 'gram.l', fill: 0.6, sy: 760, rot: 0.01, st: 'corner', pose: 'point', dur: 0.5, keep: ['gram'] },
    { at: '@same', beat: 'pull-back', focus: 'gram', fill: 0.94, maxH: 900, sy: 780, st: 'corner', pose: 'chin', keep: ['gram'] },
    { at: '@gram', beat: 'zoom-on-number', focus: 'gram.r', fill: 0.62, sy: 760, rot: -0.01, st: 'corner', pose: 'shock', dur: 0.5, keep: ['gram'] },
    // step 2: a pound of twenties
    { at: '@So#2', beat: 'graphic-hero', focus: 'scale', move: 'whip', fill: 0.84, maxH: 950, sy: 850, st: 'corner', pose: 'idle' },
    { at: '@pound', beat: 'zoom-on-number', focus: 'scale.pile', fill: 0.7, sy: 880, rot: 0.01, st: 'corner', pose: 'point', dur: 0.5 },
    { at: '@$9', beat: 'zoom-on-number', focus: 'scale.total', fill: 0.84, sy: 780, rot: -0.01, st: 'corner', pose: 'shock', dur: 0.5, keep: ['scale'] },
    { at: '@$9+1.4', beat: 'pull-back', focus: 'scale', fill: 0.82, maxH: 950, sy: 850, st: 'corner', pose: 'chin', drift: 0.03 },
    // step 3: one inch of hundreds
    { at: '@And', beat: 'graphic-hero', st: 'right', focus: 'tower', move: 'whip', sy: 850, maxH: 900, pose: 'idle' },
    { at: '@inch', beat: 'zoom-on-number', focus: 'tower.base', fill: 0.8, sy: 860, rot: -0.01, st: 'corner-left', pose: 'point' },
    { at: '@$23', beat: 'zoom-on-number', focus: 'tower.inch', fill: 0.85, sy: 860, rot: 0.01, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@$23+1.2', beat: 'pull-back', focus: 'tower', fill: 0.78, maxH: 900, sy: 850, st: 'corner-left', pose: 'chin', drift: 0.03 },
    // send
    { at: '@Send', beat: 'graphic-hero', st: 'right', focus: 'tower', sy: 850, maxH: 900, pose: 'you' },
    { at: '@grab', beat: 'peek', focus: 'tower', fill: 0.78, maxH: 900, sy: 850, pose: 'shock' },
    // the catch
    { at: '@But#2', beat: 'graphic-hero', focus: 'rows', move: 'whip', fill: 0.94, maxH: 900, sy: 780, st: 'corner', pose: 'point' },
    { at: '@way', beat: 'zoom-on-number', focus: 'rows.lb', fill: 0.9, sy: 760, rot: 0.01, st: 'corner-left', pose: 'point', dur: 0.5, keep: ['rows'] },
    { at: '@inches', beat: 'zoom-on-number', focus: 'rows.inch', fill: 0.9, sy: 780, rot: -0.01, st: 'corner-left', pose: 'shock', dur: 0.5, keep: ['rows'] },
    { at: '@inches+0.7', beat: 'pull-back', focus: 'rows', fill: 0.94, maxH: 900, sy: 780, st: 'corner', pose: 'chin', keep: ['rows'], drift: 0.03 },
    // the average man
    { at: '@For', beat: 'graphic-hero', focus: 'doll', move: 'whip', fill: 0.55, maxH: 900, sy: 860, st: 'corner-left', pose: 'idle' },
    { at: '@199', beat: 'zoom-on-number', focus: 'doll.lb', fill: 0.62, sy: 760, rot: 0.01, st: 'corner-left', pose: 'point', keep: ['doll'], dur: 0.5 },
    { at: '@pounds#2+0.3', beat: 'pull-back', focus: 'doll', fill: 0.55, maxH: 900, sy: 860, st: 'corner-left', pose: 'chin', drift: 0.03 },
    { at: '@69', beat: 'zoom-on-number', focus: 'doll.h', fill: 0.62, sy: 760, rot: -0.01, st: 'corner-left', pose: 'point', keep: ['doll'], dur: 0.5 },
    // height in hundreds
    { at: '@So#3', beat: 'graphic-hero', focus: 'tower', move: 'whip', fill: 0.8, maxH: 900, sy: 850, st: 'corner-left', pose: 'idle' },
    { at: '@$1', beat: 'zoom-on-number', focus: 'tower.total', fill: 0.78, sy: 800, rot: 0.01, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@million+0.4', beat: 'pull-back', focus: 'tower', fill: 0.8, maxH: 900, sy: 850, st: 'corner-left', pose: 'chin', drift: 0.03 },
    // follow
    { at: '@His#2', beat: 'presenter-front', focus: 'scale', fill: 0.8, maxH: 900, sy: 850, pose: 'chin', keep: ['scale'] },
    { at: '@follow', beat: 'presenter-front', focus: 'scale', fill: 0.8, maxH: 900, sy: 850, pose: 'follow', keep: ['scale'] },
    // payoff
    { at: '@His#3', beat: 'graphic-hero', focus: 'scale', fill: 0.84, maxH: 900, sy: 850, st: 'right', pose: 'point' },
    { at: '@20s#3', beat: 'zoom-on-number', focus: 'scale.total', fill: 0.84, sy: 780, rot: 0.012, st: 'corner', pose: 'shock', dur: 0.5, keep: ['scale'] },
    { at: '@million#2', beat: 'zoom-on-number', focus: 'scale.pile', fill: 0.9, sy: 900, rot: -0.01, st: 'corner', pose: 'shock', dur: 0.6, drift: 0.03, keep: ['scale'] },
    // verdict
    { at: '@small-0.6', beat: 'graphic-hero', focus: 'tot', move: 'whip', fill: 0.94, maxH: 950, sy: 800, st: 'corner', pose: 'idle' },
    { at: '@200', beat: 'zoom-on-number', focus: 'tot.gap', fill: 0.88, sy: 800, rot: -0.01, st: 'corner-left', pose: 'shock', dur: 0.5, keep: ['tot'] },
    { at: '@grand+0.6', beat: 'pull-back', focus: 'tot', fill: 0.94, maxH: 950, sy: 800, st: 'corner', pose: 'shrug', drift: 0.03 },
    // everyday comparison
    { at: '@That\'s#2', beat: 'graphic-hero', focus: 'cal', move: 'whip', fill: 0.94, maxH: 950, sy: 800, st: 'corner', pose: 'point' },
    { at: '@day', beat: 'zoom-on-number', focus: 'cal.days', fill: 0.84, sy: 960, rot: 0.01, st: 'corner-left', pose: 'point', dur: 0.5, keep: ['cal'] },
    { at: '@years', beat: 'zoom-on-number', focus: 'cal.days', fill: 0.84, sy: 960, rot: -0.01, st: 'corner-left', pose: 'shock', dur: 0.5, keep: ['cal'] },
    // loop
    { at: '@Still', beat: 'presenter-front', focus: F0, move: 'whip', ...FR, pose: 'shrug', keep: KEEP },
    { at: '@bills#5>+0.25', beat: 'side-by-side', focus: F0, move: 'whip', ...FR, pose: 'shock', keep: KEEP },
  ],
  poses: [['@follow', 'follow', { target: [650, 1120] }]],
  shakes: [[0.3, 10], ['@20s#3', 18], ['@200', 8], ['@Keep', 6]],
  captions: { gap: 16, emph: { '200': 'bad', '454': 'good', '23': 'good', '20s': 'good', '9': 'good' }, fix: [['$20 bills','twenty dollar bills'], ['$100 bills','hundred dollar bills'], ['$100 is','A hundred is'], ['$100 bucks','a hundred bucks'], ['$200 ,000.','two hundred grand.'], ['200 grand.','two hundred grand.'], ['But weight,','But wait,'], ['For the','Per the'], ['here','here,']] },
  bed: { name: 'upbeat_bed_2', gain: -1 },
  sfx: [
    { at: 0, name: 'deep_boom_2', gain: -4, dur: 0.36 }, { at: 0.2, name: 'paper_slam_1', gain: -6, dur: 0.5 }, { at: 0.3, name: 'thud_1', gain: -8, dur: 0.4 },
    { at: '@$200', name: 'rubber_stamp_2', gain: -7, dur: 0.5 },
    { at: '@stranger', name: 'pop_1', gain: -10, dur: 0.4 }, { at: '@Keep', name: 'rubber_stamp_2', gain: -9, dur: 0.5 },
    { at: '@Pile', name: 'click_1', gain: -8, dur: 0.25 }, { at: '@Pile#2', name: 'click_2', gain: -8, dur: 0.25 },
    { at: '@five', name: 'pop_2', gain: -8, dur: 0.3 }, { at: '@five', name: 'ding_2', gain: -9, dur: 0.6 },
    { at: '@like', name: 'pop_2', gain: -9, dur: 0.3 },
    { at: '@But+0.1', name: 'thud_2', gain: -9, dur: 0.4 }, { at: '@same', name: 'ding_2', gain: -9, dur: 0.6 }, { at: '@gram', name: 'coin_single_1', gain: -9, dur: 0.5 },
    { at: '@pound+0.2', name: 'money_counter_1', gain: -12, dur: 1.4 }, { at: '@$9+0.5', name: 'ding_2', gain: -9, dur: 0.6 },
    { at: '@inch', name: 'click_1', gain: -8, dur: 0.3 }, { at: '@$23', name: 'ding_2', gain: -8, dur: 0.6 },
    { at: '@Send-0.05', name: 'swoosh_1', gain: -9, dur: 0.9 },
    { at: '@pounds', name: 'click_2', gain: -9, dur: 0.2 }, { at: '@inches', name: 'click_2', gain: -9, dur: 0.2 }, { at: '@inches+0.5', name: 'pop_2', gain: -8, dur: 0.3 },
    { at: '@For', name: 'pop_1', gain: -9, dur: 0.4 }, { at: '@199-0.3', name: 'click_2', gain: -9, dur: 0.2 }, { at: '@69-0.1', name: 'click_2', gain: -9, dur: 0.2 },
    { at: '@height+0.3', name: 'money_counter_2', gain: -12, dur: 1.6 }, { at: '@million', name: 'ding_2', gain: -8, dur: 0.6 },
    { at: '@follow+0.05', name: 'pop_1', gain: -9, dur: 0.5 }, { at: '@follow+0.6', name: 'click_1', gain: -8, dur: 0.3 }, { at: '@follow+0.7', name: 'success_chime_1', gain: -12, dur: 1.2 },
    { at: '@His#3', name: 'suspense_drone_1', gain: -14, dur: 1.2 },
    { at: '@20s#3', name: 'money_counter_2', gain: -10, dur: 1.4 }, { at: '@million#2-0.4', name: 'deep_boom_1', gain: -2, dur: 1.6 }, { at: '@million#2-0.4', name: 'cinematic_hit_1', gain: -6, dur: 1.2 },
    { at: '@200', name: 'ding_2', gain: -7, dur: 0.6 }, { at: '@That\'s#2+0.4', name: 'money_counter_1', gain: -12, dur: 1.6 }, { at: '@years', name: 'ding_2', gain: -8, dur: 0.6 },
    { at: '@Still-0.1', name: 'pop_1', gain: -9, dur: 0.5 },
  ],
});
