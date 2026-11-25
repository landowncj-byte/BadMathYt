const F0 = { x: 0, y: -87, w: 1240, h: 1425 };
const FR = { fill: 0.86, maxH: 1100, sx: 560, sy: 855 };
const HOOK = { lines: [[['AVG MAN LOSES', 'paper']], [['−$202,980', 'bad']]], size: 96 };
const KEEP = ['hook', 'endt', 'scale', 'tower'];
BM2.scene({
  series: 'whatif', title: 'WEIGHT VS HEIGHT', duration: 46.5,
  footnote: ['HYPOTHETICAL · NOBODY IS OFFERING THIS · NOT FINANCIAL ADVICE', 'ASSUMES ≈1 G & 0.0043 IN PER BILL · CRISP, FLAT, WHOLE NOTES', 'AVG US MAN = CDC 199.0 LB · 68.9 IN (AUG 2021–AUG 2023)'],
  elements: [
    { id: 'hook', type: 'text', at: [0, -690], in: -1, out: 3.6, props: HOOK },
    { id: 'endt', type: 'text', at: [0, -690], in: 45.8, props: HOOK },
    { id: 'scale', type: 'scale', at: [-300, 0], in: -1, props: { slamAt: 0, btnAt: 0.1, pulses: ['@weight', '@20s'], bigAt: '@1#2', fill: [
      { t: 0, v: 4500 }, { t: 13.45, v: 4500 }, { t: 13.7, v: 0, e: 'out' }, { t: 14.9, v: 0 }, { t: 14.96, v: 1 }, { t: '@One', v: 1 }, { t: '@bills', v: 454, e: 'expo' },
      { t: 33.8, v: 454 }, { t: 37.4, v: 31000, e: 'in' }, { t: '@1#2', v: 31000 }, { t: '@million#2', v: 90264, e: 'expo' }, { t: 45.3, v: 90264 }, { t: 46.3, v: 4500 }] } },
    { id: 'tower', type: 'tower', at: [300, 0], in: -1, props: { slamAt: 0.05, btnAt: 0.2, pulses: ['@height', '@hundreds#2'], inchAt: '@inch', inchOut: '@Average#2-0.1', tagAt: '@35', sagAt: '@win', endAt: 45.65, rise: [
      { t: 0, v: 36 }, { t: 29.4, v: 36 }, { t: '@million', v: 68.9, e: 'out' }, { t: 45.3, v: 68.9 }, { t: 46.3, v: 36 }] } },
    { id: 'five', type: 'fivex', at: [0, 20], in: '@hundreds#3-0.1', out: '@Hit-0.1', props: { xAt: '@five' } },
    { id: 'doll', type: 'doll', at: [0, 40], in: '@Average#2', out: '@Send-0.1', props: { lbAt: '@99-0.3', hAt: '@5-0.1' } },
    { id: 'gap', type: 'gap', at: [0, 850], in: '@win-0.1', out: 45.6, props: { to: 202980, flipAt: '@grand#2+0.35' } },
    // screen-fixed
    { id: 'hyp', type: 'chip', layer: 'screen', at: [850, 264], in: '@Two', props: { text: 'HYPOTHETICAL', size: 24 } },
    { id: 'easy', type: 'text', layer: 'screen', at: [540, 1235], in: '@easy', out: '@Hit-0.05', props: { lines: [[['EASY?', 'accent']]], size: 120 } },
    { id: 'team', type: 'text', layer: 'screen', at: [540, 1235], in: '@Hit', out: '@But-0.1', props: { lines: [['TEAM STACK?']], size: 110 } },
    { id: 'g1', type: 'text', layer: 'screen', at: [540, 1235], in: '@gram-0.4', out: '@One', props: { lines: [[['≈1 GRAM A BILL', 'accent']], [['(ASSUMED)', 'paper']]], size: 76 } },
    { id: 'lbt', type: 'text', layer: 'screen', at: [540, 1235], in: '@One', out: '@One#2-0.1', props: { lines: [[['1 LB =', 'paper'], [' 454 BILLS', 'good']]], size: 88 } },
    { id: 'next', type: 'text', layer: 'screen', at: [540, 350], in: '@His#2', out: '@His#3', props: { lines: [[['HIS WEIGHT…', 'accent']]], size: 110 } },
    { id: 'heart', type: 'heart', layer: 'screen', at: [800, 900], in: '@like', props: { s: 1, dur: 0.9 } },
    { id: 'plane', type: 'plane', layer: 'screen', at: [0, 0], in: '@Send-0.05', out: '@Send+1.0', props: { from: [470, 1000], to: [1150, 420], dur: 0.85, s: 0.62 } },
    { id: 'btn', type: 'follow', layer: 'screen', at: [650, 1120], in: '@follow+0.05', out: '@follow+1.45', props: { press: 0.55 } },
    { id: 'ask', type: 'bubble', layer: 'screen', at: [690, 720], in: '@So', out: '@So+1.6', props: { l1: '$20s OR $100s?', l2: 'COMMENT', size: 50, tail: 'left' } },
  ],
  beats: [
    { at: 0, beat: 'side-by-side', focus: F0, ...FR, pose: 'shock', st: { x: 540, y: 1250, s: 1.25 }, keep: KEEP },
    { at: '@200', beat: 'zoom-on-number', focus: 'hook', fill: 0.8, sy: 560, rot: 0.008, pose: 'point', keep: KEEP },
    { at: 3.5, beat: 'pull-back', focus: F0, ...FR, pose: 'talk', keep: KEEP },
    // two piles
    { at: '@weight', beat: 'graphic-hero', focus: 'scale', move: 'whip', fill: 0.8, maxH: 1150, sy: 800, st: 'corner', pose: 'point' },
    { at: '@height', beat: 'graphic-hero', focus: 'tower', move: 'whip', fill: 0.8, maxH: 1150, sy: 800, st: 'corner-left', pose: 'point' },
    { at: '@flat', beat: 'pull-back', focus: F0, ...FR, pose: 'chin', keep: KEEP },
    // x5
    { at: '@hundreds#3', beat: 'presenter-front', focus: 'five', fill: 0.7, sy: 780, pose: 'you', keep: ['five'] },
    { at: '@five', beat: 'zoom-on-number', focus: 'five.x', fill: 0.75, sy: 740, rot: 0.01, st: 'corner-left', pose: 'shock', keep: ['five'] },
    { at: '@Hit', beat: 'graphic-hero', focus: 'tower', fill: 0.78, maxH: 1150, sy: 800, st: 'right', pose: 'point', keep: ['tower'] },
    // twist 1: scale
    { at: '@But', beat: 'graphic-hero', focus: 'scale', move: 'whip', fill: 0.84, maxH: 1150, sy: 800, st: 'corner', pose: 'idle' },
    { at: '@gram', beat: 'zoom-on-number', focus: 'scale.pile', fill: 0.78, sy: 820, rot: -0.008, st: 'corner', pose: 'point' },
    { at: '@454', beat: 'zoom-on-number', focus: 'scale.count', fill: 0.8, sy: 780, rot: 0.01, st: 'corner', pose: 'shock', dur: 0.5 },
    // twist 2: tower inch
    { at: '@One#2', beat: 'peek', focus: 'tower', move: 'whip', sy: 860, maxH: 1000, pose: 'idle' },
    { at: '@inch', beat: 'zoom-on-number', focus: 'tower.base', fill: 0.8, sy: 860, rot: -0.01, st: 'corner-left', pose: 'point' },
    { at: '@233', beat: 'zoom-on-number', focus: 'tower.inch', fill: 0.85, sy: 860, rot: 0.01, st: 'corner-left', pose: 'shock', dur: 0.5 },
    // average man
    { at: '@Average#2', beat: 'graphic-hero', focus: 'doll', fill: 0.55, maxH: 900, sy: 860, st: 'corner-left', pose: 'idle', keep: ['doll'] },
    { at: '@99', beat: 'zoom-on-number', focus: 'doll.lb', fill: 0.62, sy: 760, rot: 0.01, st: 'corner-left', pose: 'point', keep: ['doll'], dur: 0.5 },
    { at: '@5', beat: 'zoom-on-number', focus: 'doll.h', fill: 0.62, sy: 760, rot: -0.01, st: 'corner-left', pose: 'point', keep: ['doll'], dur: 0.5 },
    // send
    { at: '@Send', beat: 'peek', focus: 'tower', sy: 860, maxH: 1000, pose: 'you' },
    // height in hundreds
    { at: '@His', beat: 'graphic-hero', focus: 'tower', fill: 0.8, maxH: 1150, sy: 820, st: 'corner-left', pose: 'idle' },
    { at: '@1', beat: 'zoom-on-number', focus: 'tower.total', fill: 0.78, sy: 800, rot: 0.01, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@35', beat: 'zoom-on-number', focus: 'tower.tag', fill: 0.62, sy: 800, rot: -0.012, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@pounds#2', beat: 'pull-back', focus: 'tower', fill: 0.8, maxH: 1150, sy: 820, st: 'corner-left', pose: 'idle' },
    // follow
    { at: '@His#2', beat: 'presenter-front', focus: 'scale', sy: 800, pose: 'chin', keep: ['scale'] },
    { at: '@follow', beat: 'presenter-front', focus: 'scale', sy: 800, pose: 'follow', keep: ['scale'] },
    // payoff
    { at: '@His#3', beat: 'graphic-hero', focus: 'scale', fill: 0.84, maxH: 1150, sy: 800, st: 'right', pose: 'point' },
    { at: '@1#2', beat: 'zoom-on-number', focus: 'scale.total', fill: 0.84, sy: 780, rot: 0.012, st: 'corner', pose: 'shock', dur: 0.5, keep: ['scale'] },
    { at: 40.5, beat: 'graphic-hero', focus: [{ x: 0, y: 790, w: 1000, h: 640 }], fill: 0.9, sy: 780, st: 'corner-left', pose: 'idle' },
    { at: '@200#2', beat: 'zoom-on-number', focus: 'gap.num', fill: 0.88, sy: 800, rot: -0.01, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@So', beat: 'presenter-front', focus: [{ x: 0, y: 790, w: 1000, h: 640 }], sy: 800, pose: 'shrug' },
    { at: 45.65, beat: 'side-by-side', focus: F0, move: 'whip', ...FR, pose: 'shock', keep: KEEP },
  ],
  poses: [['@follow', 'follow', { target: [650, 1120] }]],
  shakes: [[0.3, 10], ['@1#2', 18], ['@win', 8], ['@35', 8]],
  captions: { emph: { '200': 'bad', '454': 'good', '233.': 'good', '35': 'bad', '20s': 'good', '8': 'good' }, fix: [['20s','twenties'], ['200 grand.','two hundred grand.'], ['won 99','199'], ["5 '9\".", "5'9\"."], ["who'd grabbed","who'd grab"], ['without without','without— without'], ['weights','weight\'s'], ['math you','math you'], ['20s,','twenties:'], ['one word.','one word.']] },
  bed: { name: 'upbeat_bed_2', gain: -1 },
  sfx: [
    { at: 0, name: 'deep_boom_2', gain: -4, dur: 0.36 }, { at: 0.2, name: 'paper_slam_1', gain: -6, dur: 0.5 }, { at: 0.3, name: 'thud_1', gain: -8, dur: 0.4 },
    { at: '@200', name: 'rubber_stamp_2', gain: -7, dur: 0.5 },
    { at: '@Two', name: 'pop_1', gain: -10, dur: 0.4 }, { at: '@weight', name: 'click_1', gain: -8, dur: 0.25 }, { at: '@height', name: 'click_2', gain: -8, dur: 0.25 },
    { at: '@five', name: 'pop_2', gain: -8, dur: 0.3 }, { at: '@five', name: 'ding_2', gain: -9, dur: 0.6 },
    { at: '@like', name: 'pop_2', gain: -9, dur: 0.3 },
    { at: '@gram', name: 'coin_single_1', gain: -9, dur: 0.5 }, { at: '@One', name: 'money_counter_1', gain: -12, dur: 1.4 }, { at: '@bills', name: 'ding_2', gain: -9, dur: 0.6 },
    { at: '@inch', name: 'click_1', gain: -8, dur: 0.3 }, { at: '@233', name: 'ding_2', gain: -8, dur: 0.6 },
    { at: '@Average#2', name: 'pop_1', gain: -9, dur: 0.4 }, { at: '@99-0.3', name: 'click_2', gain: -9, dur: 0.2 }, { at: '@5-0.1', name: 'click_2', gain: -9, dur: 0.2 },
    { at: '@Send-0.05', name: 'swoosh_1', gain: -9, dur: 0.9 },
    { at: '@height#2+0.3', name: 'money_counter_2', gain: -12, dur: 1.6 }, { at: '@million', name: 'ding_2', gain: -8, dur: 0.6 },
    { at: '@35', name: 'pop_2', gain: -8, dur: 0.3 }, { at: '@35', name: 'thud_2', gain: -9, dur: 0.4 },
    { at: '@follow+0.05', name: 'pop_1', gain: -9, dur: 0.5 }, { at: '@follow+0.6', name: 'click_1', gain: -8, dur: 0.3 }, { at: '@follow+0.7', name: 'success_chime_1', gain: -12, dur: 1.2 },
    { at: '@His#3', name: 'suspense_drone_1', gain: -14, dur: 1.2 },
    { at: '@1#2', name: 'money_counter_2', gain: -10, dur: 1.2 }, { at: '@1#2+0.1', name: 'deep_boom_1', gain: -2, dur: 1.6 }, { at: '@1#2+0.1', name: 'cinematic_hit_1', gain: -6, dur: 1.2 },
    { at: '@win-0.1', name: 'rubber_stamp_2', gain: -5, dur: 0.5 }, { at: '@200#2', name: 'ding_2', gain: -7, dur: 0.6 },
    { at: '@So-0.1', name: 'pop_1', gain: -9, dur: 0.5 },
  ],
});
