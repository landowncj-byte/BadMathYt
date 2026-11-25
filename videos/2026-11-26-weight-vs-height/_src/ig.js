const F0 = { x: 0, y: -190, w: 1240, h: 1220 };
const FR = { fill: 0.86, maxH: 1000, sx: 560, sy: 800 };
const HOOK = { lines: [[['ONE PICK IS', 'paper']], [['A $200K F*CK-UP', 'bad']]], size: 88 };
const KEEP = ['hook', 'endt', 'scale', 'tower'];
BM2.scene({
  series: 'whatif', title: 'WEIGHT VS HEIGHT', duration: 22.65,
  footnote: ['HYPOTHETICAL · NOBODY IS OFFERING THIS · NOT FINANCIAL ADVICE', 'ASSUMES ≈1 G & 0.0043 IN PER BILL · FLIP POINT 2.56 LB PER INCH', 'AVG US MAN = CDC 199.0 LB · 68.9 IN (AUG 2021–AUG 2023)'],
  elements: [
    { id: 'hook', type: 'text', at: [0, -690], in: -1, out: '@Hundreds-0.2', props: HOOK },
    { id: 'endt', type: 'text', at: [0, -690], in: 22.0, props: HOOK },
    { id: 'scale', type: 'scale', at: [-300, 0], in: -1, props: { btnOff: [['@Hundreds', '@So#2-0.1']], slamAt: 0, btnAt: 0.1, pulses: ['@weight', '@20s'], bigAt: '@1#2', fill: [
      { t: 0, v: 4500 }, { t: '@1#2', v: 4500 }, { t: '@1#2+0.9', v: 90264, e: 'expo' }, { t: 21.7, v: 90264 }, { t: 22.4, v: 4500 }] } },
    { id: 'tower', type: 'tower', at: [300, 0], in: -1, props: { btnOff: [['@Hundreds', '@So#2-0.1']], slamAt: 0.05, btnAt: 0.2, pulses: ['@height', '@100s'], nopeAt: '@nope', nopeOut: '@Average-0.1', endAt: 21.9, rise: [
      { t: 0, v: 36 }, { t: '@height#2', v: 36 }, { t: '@1+0.4', v: 68.9, e: 'out' }, { t: 21.7, v: 68.9 }, { t: 22.4, v: 36 }] } },
    { id: 'doll', type: 'doll', at: [0, 40], in: '@Average', out: '@weight#2-0.15', props: { lbAt: '@gramma', hAt: '@height#2' } },
    { id: 'gap', type: 'gap', at: [0, 580], in: '@Send-0.4', out: 21.9, props: { to: 202980 } },
    { id: 'hyp', type: 'chip', layer: 'screen', at: [850, 264], in: '@Hundreds', props: { text: 'HYPOTHETICAL', size: 24 } },
    { id: 'hund', type: 'text', layer: 'screen', at: [540, 345], in: '@Hundreds', out: '@Average-0.1', props: { lines: [[['HUNDREDS?', 'accent']]], size: 90 } },
    { id: 'g1', type: 'chip', layer: 'screen', at: [540, 345], in: '@gramma-0.4', out: '@weight#2-0.15', props: { text: '≈1 G A BILL · ASSUMED', size: 30 } },
    { id: 'pays', type: 'text', layer: 'screen', at: [540, 345], in: '@For', out: '@So#2-0.1', props: { lines: [[['THE SCALE PAYS', 'good']]], size: 90 } },
    { id: 'heart', type: 'heart', layer: 'screen', at: [800, 900], in: '@double', props: { s: 1, dur: 0.9 } },
    { id: 'plane', type: 'plane', layer: 'screen', at: [0, 0], in: '@Send-0.05', out: '@Send+1.0', props: { from: [470, 1000], to: [1150, 420], dur: 0.85, s: 0.62 } },
    { id: 'ask', type: 'bubble', layer: 'screen', at: [690, 720], in: '@So#2', out: '@So#2+1.5', props: { l1: 'WEIGHT OR HEIGHT?', l2: 'COMMENT', size: 46, tail: 'left' } },
  ],
  beats: [
    { at: 0, beat: 'side-by-side', focus: F0, ...FR, pose: 'shock', st: { x: 540, y: 1250, s: 1.25 }, keep: KEEP },
    { at: '@fuck', beat: 'zoom-on-number', focus: 'hook', fill: 0.8, sy: 560, rot: 0.008, pose: 'shock', keep: KEEP },
    { at: 4.3, beat: 'pull-back', focus: F0, ...FR, pose: 'talk', keep: KEEP },
    { at: '@Hundreds', beat: 'graphic-hero', focus: 'tower', fill: 0.78, maxH: 900, sy: 850, st: 'right', pose: 'point', keep: ['tower'] },
    { at: '@double', beat: 'presenter-front', focus: 'tower', fill: 0.8, maxH: 900, sy: 850, pose: 'you', keep: ['tower'] },
    { at: '@nope', beat: 'zoom-on-number', focus: 'tower', fill: 0.8, sy: 850, rot: -0.01, st: 'corner-left', pose: 'shock', dur: 0.5, keep: ['tower'] },
    { at: '@Average', beat: 'graphic-hero', focus: 'doll', fill: 0.55, maxH: 900, sy: 860, st: 'corner-left', pose: 'idle', keep: ['doll'] },
    { at: '@gramma', beat: 'zoom-on-number', focus: 'doll.lb', fill: 0.62, sy: 760, rot: 0.01, st: 'corner-left', pose: 'point', keep: ['doll'], dur: 0.5 },
    { at: '@height#2', beat: 'zoom-on-number', focus: 'doll.h', fill: 0.62, sy: 760, rot: -0.01, st: 'corner-left', pose: 'point', keep: ['doll'], dur: 0.5 },
    { at: '@1', beat: 'zoom-on-number', focus: 'tower.total', fill: 0.8, sy: 800, rot: 0.01, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@weight#2', beat: 'graphic-hero', focus: 'scale', move: 'whip', fill: 0.84, maxH: 900, sy: 850, st: 'right', pose: 'point' },
    { at: '@1#2', beat: 'zoom-on-number', focus: 'scale.total', fill: 0.88, sy: 780, rot: 0.012, st: 'corner', pose: 'shock', dur: 0.5, keep: ['scale'] },
    { at: '@Send', beat: 'graphic-hero', st: 'right', focus: [{ x: 0, y: 200, w: 1240, h: 1280 }], sy: 810, maxH: 900, pose: 'you' },
    { at: '@they\'d', beat: 'zoom-on-number', focus: 'gap.num', fill: 0.88, sy: 800, rot: 0.01, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@For', beat: 'graphic-hero', focus: 'scale', fill: 0.84, maxH: 900, sy: 850, st: 'left', pose: 'you' },
    { at: '@So#2', beat: 'presenter-front', focus: 'scale', fill: 0.8, maxH: 900, sy: 850, pose: 'chin', keep: ['scale'] },
    { at: 21.9, beat: 'side-by-side', focus: F0, move: 'whip', ...FR, pose: 'shock', st: { x: 540, y: 1250, s: 1.25 }, keep: KEEP },
  ],
  shakes: [[0.3, 10], ['@1#2', 18], ['@nope', 10], ['@they\'d', 8]],
  captions: { emph: { '200': 'bad', '20s': 'good', '100s': 'accent', '8.': 'good' }, fix: [['20s','twenties'], ['one\'s a','One\'s a'], ['200 grand fuck up.','two hundred grand F*CK-UP.'], ['200 grand.','two hundred grand.'], ['Hundreds right,','Hundreds, right?'], ['double tap','Double-tap'], ['so, nope.','so. Nope.'], ['gramma','gram a'], ['20s,','twenties,'], ['100s,','hundreds,'], ['100s,','hundreds,'], ['100s,','hundreds,'], ['height.','height?']] },
  bed: { name: 'upbeat_bed_2', gain: -1 },
  sfx: [
    { at: 0, name: 'deep_boom_2', gain: -4, dur: 0.36 }, { at: 0.2, name: 'paper_slam_1', gain: -6, dur: 0.5 }, { at: 0.3, name: 'thud_1', gain: -8, dur: 0.4 },
    { at: '@fuck', name: 'rubber_stamp_2', gain: -6, dur: 0.5 },
    { at: '@double', name: 'pop_2', gain: -9, dur: 0.3 }, { at: '@nope', name: 'rubber_stamp_2', gain: -4, dur: 0.5 }, { at: '@nope', name: 'deep_boom_2', gain: -8, dur: 0.36 },
    { at: '@Average', name: 'pop_1', gain: -9, dur: 0.4 }, { at: '@gramma', name: 'click_2', gain: -9, dur: 0.2 }, { at: '@height#2', name: 'click_2', gain: -9, dur: 0.2 },
    { at: '@height#2+0.2', name: 'money_counter_2', gain: -12, dur: 1.4 }, { at: '@mil', name: 'ding_2', gain: -8, dur: 0.6 },
    { at: '@1#2', name: 'money_counter_2', gain: -10, dur: 1.2 }, { at: '@1#2+0.1', name: 'deep_boom_1', gain: -2, dur: 1.6 }, { at: '@1#2+0.1', name: 'cinematic_hit_1', gain: -6, dur: 1.2 },
    { at: '@Send-0.05', name: 'swoosh_1', gain: -9, dur: 0.9 }, { at: '@Send-0.4', name: 'rubber_stamp_2', gain: -6, dur: 0.5 },
    { at: '@they\'d', name: 'ding_2', gain: -8, dur: 0.6 },
    { at: '@scale', name: 'success_chime_1', gain: -12, dur: 1.2 },
    { at: '@So#2-0.1', name: 'pop_1', gain: -9, dur: 0.5 },
  ],
});
