const F0 = { x: 0, y: -190, w: 1240, h: 1220 };
const FR = { fill: 0.86, maxH: 1000, sx: 560, sy: 800 };
const HOOK = { lines: [[['AVG MAN LOSES', 'paper']], [['−$202,980', 'bad']]], size: 96 };
const KEEP = ['hook', 'endt', 'scale', 'tower'];
BM2.scene({
  series: 'whatif', title: 'WEIGHT VS HEIGHT', duration: 48.67,
  footnote: ['HYPOTHETICAL · NOBODY IS OFFERING THIS · NOT FINANCIAL ADVICE', 'ASSUMES ≈1 G & 0.0043 IN PER BILL · CRISP, FLAT, WHOLE NOTES', 'AVG US MAN = CDC 199.0 LB · 68.9 IN (AUG 2021–AUG 2023)', 'PHOTOS: D.L. (CC BY-SA 2.0) · THE.COMEDIAN (CC BY 2.0) · VIA FLICKR'],
  elements: [
    { id: 'hook', type: 'text', at: [0, -690], in: -1, out: '@Two-0.1', props: HOOK },
    { id: 'endt', type: 'text', at: [0, -690], in: '@word+0.25', props: HOOK },
    { id: 'scale', type: 'scale', at: [-300, 0], in: -1, props: { btnOff: [['@easy', '@Hit-0.05'], ['@Hit', '@But-0.1'], ['@gram-0.4', '@One'], ['@One', '@One#2-0.1'], ['@For', '@Send'], ['@His', '@His#2'], ['@His#2', '@word+0.2']], slamAt: 0, btnAt: 0.1, pulses: ['@weight', '@20s'], bigAt: '@1#2', fill: [
      { t: 0, v: 4500 }, { t: '@But-0.4', v: 4500 }, { t: '@But-0.15', v: 0, e: 'out' }, { t: '@gram-0.25', v: 0 }, { t: '@gram-0.2', v: 1 }, { t: '@One', v: 1 }, { t: '@454+0.3', v: 454, e: 'expo' },
      { t: '@pounds#2', v: 454 }, { t: '@His#3-0.1', v: 31000, e: 'in' }, { t: '@1#2', v: 31000 }, { t: '@million#2', v: 90264, e: 'expo' }, { t: '@word+0.25', v: 90264 }, { t: '@word+0.85', v: 4500 }] } },
    { id: 'tower', type: 'tower', at: [300, 0], in: -1, props: { btnOff: [['@easy', '@Hit-0.05'], ['@Hit', '@But-0.1'], ['@gram-0.4', '@One'], ['@One', '@One#2-0.1'], ['@For', '@Send'], ['@His', '@His#2'], ['@His#2', '@word+0.2']], slamAt: 0.05, btnAt: 0.2, pulses: ['@height', '@hundreds#2'], inchAt: '@inch', inchOut: '@For-0.05', tagAt: '@35', sagAt: '@win', endAt: '@word+0.25', rise: [
      { t: 0, v: 36 }, { t: '@His', v: 36 }, { t: '@million', v: 68.9, e: 'out' }, { t: '@word+0.25', v: 68.9 }, { t: '@word+0.85', v: 36 }] } },
    { id: 'five', type: 'fivex', at: [0, 20], in: '@hundreds#3-0.1', out: '@Hit-0.1', props: { xAt: '@five' } },
    { id: 'doll', type: 'doll', at: [0, 40], in: '@For', out: '@Send-0.1', props: { lbAt: '@199-0.3', hAt: '@five#2-0.1' } },
    { id: 'gap', type: 'gap', at: [0, 580], in: '@the#8+0.15', out: '@word+0.2', props: { to: 202980, flipAt: '@grand#2+0.35' } },
    { id: 'ph1', type: 'photo', layer: 'screen', at: [200, 1130], in: '@weight', out: '@height', props: { src: 'brand/photos/stock/bathroom-scale/3.jpg', name: 'SCALE', credit: 'D.L. · CC BY-SA 2.0', w: 250, tilt: -0.07, treatment: 'polaroid', aspect: 1.0 } },
    { id: 'ph2', type: 'photo', layer: 'screen', at: [880, 1130], in: '@height', out: '@flat+0.3', props: { src: 'brand/photos/stock/stack-of-hundred-dollar-bills/2.jpg', name: '$100 STACK', credit: 'THE.COMEDIAN · CC BY 2.0', w: 250, tilt: 0.07, treatment: 'polaroid', aspect: 1.0 } },
    // screen-fixed
    { id: 'hyp', type: 'chip', layer: 'screen', at: [850, 264], in: '@Two', props: { text: 'HYPOTHETICAL', size: 24 } },
    { id: 'easy', type: 'text', layer: 'screen', at: [540, 345], in: '@easy', out: '@Hit-0.05', props: { lines: [[['EASY?', 'accent']]], size: 96 } },
    { id: 'team', type: 'text', layer: 'screen', at: [540, 345], in: '@Hit', out: '@But-0.1', props: { lines: [['TEAM STACK?']], size: 90 } },
    { id: 'g1', type: 'chip', layer: 'screen', at: [540, 345], in: '@gram-0.4', out: '@One', props: { text: '≈1 G A BILL · ASSUMED', size: 30 } },
    { id: 'lbt', type: 'text', layer: 'screen', at: [540, 345], in: '@One', out: '@One#2-0.1', props: { lines: [[['1 LB =', 'paper'], [' 454 BILLS', 'good']]], size: 76 } },
    { id: 'next', type: 'text', layer: 'screen', at: [540, 350], in: '@His#2', out: '@His#3', props: { lines: [[['HIS WEIGHT…', 'accent']]], size: 110 } },
    { id: 'heart', type: 'heart', layer: 'screen', at: [800, 900], in: '@like', props: { s: 1, dur: 0.9 } },
    { id: 'plane', type: 'plane', layer: 'screen', at: [0, 0], in: '@Send-0.05', out: '@Send+1.0', props: { from: [470, 1000], to: [1150, 420], dur: 0.85, s: 0.62 } },
    { id: 'btn', type: 'follow', layer: 'screen', at: [650, 1120], in: '@follow+0.05', out: '@follow+1.45', props: { press: 0.55 } },
    { id: 'ask', type: 'bubble', layer: 'screen', at: [690, 720], in: '@So#2', out: '@So#2+1.6', props: { l1: '$20s OR $100s?', l2: 'COMMENT', size: 50, tail: 'left' } },
  ],
  beats: [
    { at: 0, beat: 'side-by-side', focus: F0, ...FR, pose: 'shock', st: { x: 540, y: 1250, s: 1.25 }, keep: KEEP },
    { at: '@200', beat: 'zoom-on-number', focus: 'hook', fill: 0.8, sy: 560, rot: 0.008, pose: 'point', keep: KEEP },
    { at: '@Two-0.2', beat: 'pull-back', focus: F0, ...FR, pose: 'talk', keep: KEEP },
    // two piles
    { at: '@weight', beat: 'graphic-hero', focus: 'scale', move: 'whip', fill: 0.8, maxH: 900, sy: 850, st: 'corner', pose: 'point' },
    { at: '@height', beat: 'graphic-hero', focus: 'tower', move: 'whip', fill: 0.8, maxH: 900, sy: 850, st: 'corner-left', pose: 'point' },
    { at: '@flat', beat: 'pull-back', focus: F0, ...FR, pose: 'chin', keep: KEEP },
    // x5
    { at: '@hundreds#3', beat: 'presenter-front', focus: 'five', fill: 0.7, sy: 780, pose: 'you', keep: ['five'] },
    { at: '@five', beat: 'zoom-on-number', focus: 'five.x', fill: 0.75, sy: 740, rot: 0.01, st: 'corner-left', pose: 'shock', keep: ['five'] },
    { at: '@Hit', beat: 'graphic-hero', focus: 'tower', fill: 0.78, maxH: 900, sy: 850, st: 'right', pose: 'point', keep: ['tower'] },
    // twist 1: scale
    { at: '@But', beat: 'graphic-hero', focus: 'scale', move: 'whip', fill: 0.84, maxH: 900, sy: 850, st: 'corner', pose: 'idle' },
    { at: '@gram', beat: 'graphic-hero', focus: 'scale', fill: 0.8, maxH: 900, sy: 850, st: 'corner', pose: 'point' },
    { at: '@454', beat: 'graphic-hero', focus: 'scale', fill: 0.84, maxH: 950, sy: 850, st: 'corner', pose: 'shock', dur: 0.5 },
    // twist 2: tower inch
    { at: '@One#2', beat: 'graphic-hero', st: 'right', focus: 'tower', move: 'whip', sy: 850, maxH: 900, pose: 'idle' },
    { at: '@inch', beat: 'zoom-on-number', focus: 'tower.base', fill: 0.8, sy: 860, rot: -0.01, st: 'corner-left', pose: 'point' },
    { at: '@233', beat: 'zoom-on-number', focus: 'tower.inch', fill: 0.85, sy: 860, rot: 0.01, st: 'corner-left', pose: 'shock', dur: 0.5 },
    // average man
    { at: '@For', beat: 'graphic-hero', focus: 'doll', fill: 0.55, maxH: 900, sy: 860, st: 'corner-left', pose: 'idle', keep: ['doll'] },
    { at: '@199', beat: 'zoom-on-number', focus: 'doll.lb', fill: 0.62, sy: 760, rot: 0.01, st: 'corner-left', pose: 'point', keep: ['doll'], dur: 0.5 },
    { at: '@five#2', beat: 'zoom-on-number', focus: 'doll.h', fill: 0.62, sy: 760, rot: -0.01, st: 'corner-left', pose: 'point', keep: ['doll'], dur: 0.5 },
    // send
    { at: '@Send', beat: 'graphic-hero', st: 'right', focus: 'tower', sy: 850, maxH: 900, pose: 'you' },
    // height in hundreds
    { at: '@His', beat: 'graphic-hero', focus: 'tower', fill: 0.8, maxH: 900, sy: 850, st: 'corner-left', pose: 'idle' },
    { at: '@1', beat: 'zoom-on-number', focus: 'tower.total', fill: 0.78, sy: 800, rot: 0.01, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@35', beat: 'zoom-on-number', focus: 'tower.tag', fill: 0.62, sy: 800, rot: -0.012, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@pounds#2', beat: 'pull-back', focus: 'tower', fill: 0.8, maxH: 900, sy: 850, st: 'corner-left', pose: 'idle' },
    // follow
    { at: '@His#2', beat: 'presenter-front', focus: 'scale', fill: 0.8, maxH: 900, sy: 850, pose: 'chin', keep: ['scale'] },
    { at: '@follow', beat: 'presenter-front', focus: 'scale', fill: 0.8, maxH: 900, sy: 850, pose: 'follow', keep: ['scale'] },
    // payoff
    { at: '@His#3', beat: 'graphic-hero', focus: 'scale', fill: 0.84, maxH: 900, sy: 850, st: 'right', pose: 'point' },
    { at: '@1#2', beat: 'zoom-on-number', focus: 'scale.total', fill: 0.84, sy: 780, rot: 0.012, st: 'corner', pose: 'shock', dur: 0.5, keep: ['scale'] },
    { at: '@the#8-0.15', beat: 'graphic-hero', focus: [{ x: 0, y: 200, w: 1240, h: 1280 }], fill: 0.9, sy: 810, st: 'corner-left', pose: 'idle' },
    { at: '@200#2', beat: 'zoom-on-number', focus: 'gap.num', fill: 0.88, sy: 800, rot: -0.01, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@So#2', beat: 'presenter-front', focus: [{ x: 0, y: 200, w: 1240, h: 1280 }], sy: 810, pose: 'shrug' },
    { at: '@word+0.25', beat: 'side-by-side', focus: F0, move: 'whip', ...FR, pose: 'shock', keep: KEEP },
  ],
  poses: [['@follow', 'follow', { target: [650, 1120] }]],
  shakes: [[0.3, 10], ['@1#2', 18], ['@win', 8], ['@35', 8]],
  captions: { gap: 16, emph: { '200': 'bad', '454': 'good', '233.': 'good', '35': 'bad', '20s': 'good', '8': 'good' }, fix: [['20s','twenties'], ['200 grand.','two hundred grand.'], ['here','here,'], ['cash,','cash:'], ['flat.','flat?'], ['more,','more.'], ['easy','Easy,'], ['five nine.',"5'9\"."], ['For','Per'], ['without without','without— without'], ['weights','weight\'s'], ['next','next.'], ['follow','Follow,'], ['win','win,'], ['So','So…'], ['hundreds,','hundreds?'], ['one word.','One word.']] },
  bed: { name: 'upbeat_bed_2', gain: -1 },
  sfx: [
    { at: 0, name: 'deep_boom_2', gain: -4, dur: 0.36 }, { at: 0.2, name: 'paper_slam_1', gain: -6, dur: 0.5 }, { at: 0.3, name: 'thud_1', gain: -8, dur: 0.4 },
    { at: '@200', name: 'rubber_stamp_2', gain: -7, dur: 0.5 },
    { at: '@Two', name: 'pop_1', gain: -10, dur: 0.4 }, { at: '@weight', name: 'click_1', gain: -8, dur: 0.25 }, { at: '@height', name: 'click_2', gain: -8, dur: 0.25 },
    { at: '@five', name: 'pop_2', gain: -8, dur: 0.3 }, { at: '@five', name: 'ding_2', gain: -9, dur: 0.6 },
    { at: '@like', name: 'pop_2', gain: -9, dur: 0.3 },
    { at: '@gram', name: 'coin_single_1', gain: -9, dur: 0.5 }, { at: '@One', name: 'money_counter_1', gain: -12, dur: 1.4 }, { at: '@454+0.3', name: 'ding_2', gain: -9, dur: 0.6 },
    { at: '@inch', name: 'click_1', gain: -8, dur: 0.3 }, { at: '@233', name: 'ding_2', gain: -8, dur: 0.6 },
    { at: '@For', name: 'pop_1', gain: -9, dur: 0.4 }, { at: '@199-0.3', name: 'click_2', gain: -9, dur: 0.2 }, { at: '@five#2-0.1', name: 'click_2', gain: -9, dur: 0.2 },
    { at: '@Send-0.05', name: 'swoosh_1', gain: -9, dur: 0.9 },
    { at: '@height#2+0.3', name: 'money_counter_2', gain: -12, dur: 1.6 }, { at: '@million', name: 'ding_2', gain: -8, dur: 0.6 },
    { at: '@35', name: 'pop_2', gain: -8, dur: 0.3 }, { at: '@35', name: 'thud_2', gain: -9, dur: 0.4 },
    { at: '@follow+0.05', name: 'pop_1', gain: -9, dur: 0.5 }, { at: '@follow+0.6', name: 'click_1', gain: -8, dur: 0.3 }, { at: '@follow+0.7', name: 'success_chime_1', gain: -12, dur: 1.2 },
    { at: '@His#3', name: 'suspense_drone_1', gain: -14, dur: 1.2 },
    { at: '@1#2', name: 'money_counter_2', gain: -10, dur: 1.2 }, { at: '@1#2+0.1', name: 'deep_boom_1', gain: -2, dur: 1.6 }, { at: '@1#2+0.1', name: 'cinematic_hit_1', gain: -6, dur: 1.2 },
    { at: '@the#8+0.15', name: 'rubber_stamp_2', gain: -5, dur: 0.5 }, { at: '@200#2', name: 'ding_2', gain: -7, dur: 0.6 },
    { at: '@So#2-0.1', name: 'pop_1', gain: -9, dur: 0.5 },
  ],
});
