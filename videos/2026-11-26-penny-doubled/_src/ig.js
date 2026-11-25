const ST = { x: 125, y: 1330, s: 0.9, layer: 'front' };
const F0 = { x: 0, y: -50, w: 900, h: 1130 };
const F0e = { x: 0, y: 2150, w: 900, h: 1130 };
const FR = { fill: 0.82, maxH: 1030, sx: 560, sy: 830 };
BM2.scene({
  series: 'whatif', title: 'PENNY × 30 DAYS', duration: 20.23,
  footnote: ['ASSUMES: 1¢ ON DAY 1 · WHAT YOU HOLD DOUBLES EVERY DAY · 30 DAYS', 'NO TAXES, NO INTEREST · HYPOTHETICAL · OUR MATH · NOT FINANCIAL ADVICE'],
  elements: [
    // --- frame 0: the A/B buttons are the hook; brick + penny slam under them ---
    { id: 'ab', type: 'ab', at: [0, -330], in: -1, props: { aAt: -1, bAt: -1, settle: true, splitAt: '@double' } },
    { id: 'art', type: 'hookart', at: [0, 200], in: -1, props: { variant: 'brick' } },
    { id: 'pick', type: 'stamp', at: [0, 60], rot: -0.06, in: '@Pick', out: '@Said', props: { text: 'PICK.', tone: 'bad', size: 120 } },
    // --- station 2: the board ---
    { id: 'board', type: 'board', at: [1750, 0], in: 4.2, out: 19.0, props: {
      ticker: [[0, 0], [4.6, 0], [5.85, 20], [7.9, 20], [8.85, 27], [12.0, 27], [13.55, 30]],
      flash: [[8.9, 27]], rainAt: 13.5, rainEnd: 15.6,
      notes: [{ at: '@still', out: '@Send-0.2', text: 'STILL BEHIND', tone: 'bad' }] } },
    { id: 'pie', type: 'pie', at: [1750, -130], in: '@Seven-0.15', out: '@So-0.05', props: { r: 230, center: { to: 87.5, suffix: '%', decimals: 1, at: '@Seven', dur: 0.9, label: 'IN THE LAST 3 DAYS', tone: 'accent' },
      slices: [{ value: 12.5, tone: 'soft', label: 'DAYS 1–27', at: '@Seven-0.1' }, { value: 87.5, tone: 'accent', label: 'DAYS 28–30', at: '@Seven+0.15' }] } },
    // --- loop frame (a separate station so nothing ghosts through) ---
    { id: 'ab2', type: 'ab', at: [0, 1870], in: 19.0, props: { aAt: -1, bAt: -1, settle: true } },
    { id: 'art2', type: 'hookart', at: [0, 2400], in: 19.0, props: { variant: 'brick', reAt: 19.5 } },
    // --- screen-fixed ---
    { id: 'hyp', type: 'chip', layer: 'screen', at: [850, 264], in: 0.5, props: { text: 'HYPOTHETICAL', size: 24 } },
    { id: 'heart', type: 'heart', layer: 'screen', at: [800, 900], in: '@double', props: { s: 1, dur: 0.9 } },
    { id: 'plane', type: 'plane', layer: 'screen', at: [0, 0], in: '@Send-0.05', out: '@Send+1.0', props: { from: [470, 1000], to: [1150, 420], dur: 0.85, s: 0.62 } },
    { id: 'ask', type: 'bubble', layer: 'screen', at: [690, 720], in: '@So-0.1', out: 19.0, props: { l1: 'PENNY or MILLION?', l2: 'ONE WORD · COMMENT', size: 48, tail: 'left' } },
  ],
  beats: [
    { at: 0, beat: 'side-by-side', focus: F0, ...FR, pose: 'shock', keep: ['ab', 'art', 'ab2', 'art2', 'pick'] },
    { at: '@now', beat: 'zoom-on-number', focus: 'ab.a', fill: 0.86, sy: 760, rot: -0.008, pose: 'point', keep: ['ab', 'art'] },
    { at: '@penny', beat: 'zoom-on-number', focus: 'ab.b', fill: 0.86, sy: 760, rot: 0.008, pose: 'point', keep: ['ab', 'art'] },
    { at: '@30', beat: 'zoom-on-number', focus: 'ab.b', fill: 0.9, sy: 760, rot: -0.008, pose: 'shock', dur: 0.5, keep: ['ab', 'art'] },
    { at: '@Pick', beat: 'pull-back', focus: F0, ...FR, st: { x: 540, y: 1330, s: 1.0, layer: 'front' }, pose: 'you', keep: ['ab', 'art', 'pick'] },
    // board
    { at: 4.15, beat: 'graphic-hero', focus: 'board', move: 'whip', fill: 0.9, maxH: 1020, sy: 830, st: ST, pose: 'shock' },
    { at: '@20', beat: 'zoom-on-number', focus: 'board.t20', fill: 0.5, sy: 760, rot: 0.01, st: ST, pose: 'point', dur: 0.5 },
    { at: '@five', beat: 'zoom-on-number', focus: 'board.stack', fill: 0.9, maxH: 570, sy: 700, rot: -0.01, st: ST, pose: 'shock', dur: 0.5 },
    { at: 7.7, beat: 'graphic-hero', focus: 'board', fill: 0.9, maxH: 1020, sy: 830, st: ST, pose: 'chin', dur: 0.7 },
    { at: '@27', beat: 'zoom-on-number', focus: 'board.t27', fill: 0.5, sy: 760, rot: 0.01, st: ST, pose: 'shock', dur: 0.5 },
    { at: '@still', beat: 'zoom-on-number', focus: 'board.meter', fill: 0.9, sy: 700, rot: -0.01, st: ST, pose: 'shrug', dur: 0.5 },
    { at: '@Send', beat: 'peek', focus: 'board', sy: 830, maxH: 1000, pose: 'you' },
    { at: '@bail', beat: 'graphic-hero', focus: 'board', fill: 0.9, maxH: 1020, sy: 830, st: ST, pose: 'chin' },
    { at: '@30#2', beat: 'zoom-on-number', focus: 'board.day', fill: 0.62, sy: 640, rot: 0.01, st: ST, pose: 'shock', dur: 0.5 },
    { at: '@5', beat: 'zoom-on-number', focus: 'board.stack', fill: 0.9, maxH: 570, sy: 700, rot: -0.01, st: ST, pose: 'shock', dur: 0.55 },
    { at: 15.0, beat: 'graphic-hero', focus: 'board', fill: 0.9, maxH: 1020, sy: 830, st: ST, pose: 'idle', dur: 0.9 },
    { at: '@Seven-0.1', beat: 'graphic-hero', focus: 'pie', fill: 0.78, sy: 780, st: ST, pose: 'point', blur: 9, dim: 0.6 },
    { at: '@three', beat: 'zoom-on-number', focus: 'pie.center', fill: 0.6, sy: 760, rot: 0.01, st: ST, pose: 'shock', dur: 0.5, blur: 9, dim: 0.6 },
    { at: '@So', beat: 'presenter-front', focus: 'board', sy: 820, pose: 'you' },
    { at: 19.0, beat: 'side-by-side', focus: F0e, move: 'whip', ...FR, pose: 'shock', keep: ['ab', 'art', 'ab2', 'art2', 'pick'] },
  ],
  shakes: [[0.1, 8], ['@Pick', 8], ['@5', 20], ['@27', 8]],
  captions: { emph: { 'million': 'good', 'penny': 'accent', 'double': 'accent', '20,': 'accent', 'grand.': 'accent', '27,': 'bad', 'losing.': 'bad', '5.37': 'good', 'fucking': 'bad', 'Seven': 'accent', 'eighths': 'accent' }, fix: [['penny,', 'penny?'], ['double tap.', 'Double-tap.'], ['30 days.', '30 days?'], ['5.37', '$5.37'], ['30,', '30?'], ['So penny', 'So, penny']] },
  bed: { name: 'upbeat_bed_2', gain: -1 },
  sfx: [
    { at: 0.04, name: 'deep_boom_2', gain: -4, dur: 0.36 }, { at: 0.06, name: 'paper_slam_1', gain: -7, dur: 0.5 },
    { at: '@Pick', name: 'rubber_stamp_2', gain: -5, dur: 0.5 },
    { at: '@double', name: 'pop_2', gain: -9, dur: 0.3 }, { at: '@double+0.05', name: 'coin_single_1', gain: -10, dur: 0.5 },
    { at: 4.6, name: 'money_counter_1', gain: -12, dur: 1.3 }, { at: '@20', name: 'ding_2', gain: -8, dur: 0.6 },
    { at: 7.9, name: 'money_counter_2', gain: -13, dur: 1.0 }, { at: 8.9, name: 'wrong_buzzer_1', gain: -14, dur: 0.6 }, { at: 8.9, name: 'thud_1', gain: -8, dur: 0.4 },
    { at: '@Send-0.05', name: 'swoosh_1', gain: -9, dur: 0.9 },
    { at: 12.0, name: 'riser_1', gain: -12, dur: 1.6 },
    { at: 13.55, name: 'deep_boom_1', gain: -2, dur: 1.6 }, { at: 13.55, name: 'cinematic_hit_1', gain: -6, dur: 1.2 }, { at: 13.55, name: 'coins_drop_1', gain: -8, dur: 1.8 },
    { at: '@Seven-0.1', name: 'pop_1', gain: -9, dur: 0.4 }, { at: '@Seven+0.15', name: 'pop_2', gain: -9, dur: 0.3 },
    { at: '@So-0.1', name: 'pop_1', gain: -9, dur: 0.5 },
  ],
});
