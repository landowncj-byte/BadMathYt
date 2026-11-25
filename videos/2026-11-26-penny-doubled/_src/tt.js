const ST = { x: 125, y: 1330, s: 0.9, layer: 'front' };
const F0 = { x: 0, y: -100, w: 780, h: 1020 };
const F0e = { x: 0, y: 2100, w: 780, h: 1020 };
const FR = { fill: 0.82, maxH: 1010, sx: 600, sy: 830 };
const HOOK = { lines: [[['YOU PICKED', 'paper']], [['THE PENNY', 'accent']]], size: 150 };
BM2.scene({
  series: 'whatif', title: 'PENNY × 30 DAYS', duration: 34.12,
  footnote: ['ASSUMES: 1¢ ON DAY 1 · WHAT YOU HOLD DOUBLES EVERY DAY · 30 DAYS', 'NO TAXES, NO INTEREST · HYPOTHETICAL · OUR MATH · NOT FINANCIAL ADVICE'],
  elements: [
    // --- frame 0: penny slapped down, brick yanked away on a string ---
    { id: 'hook', type: 'text', at: [0, -400], in: -1, out: 2.4, props: HOOK },
    { id: 'art', type: 'hookart', at: [0, 80], in: -1, out: 2.45, props: { variant: 'slap' } },
    // --- the calendar page slams down on day 20 ---
    { id: 'board', type: 'board', at: [0, 0], enter: 'slam', in: 2.35, out: 33.2, props: {
      ticker: [[0, 20], [9.4, 20], [10.9, 10], [12.9, 10], [14.05, 27], [21.0, 27], [21.7, 28], [26.5, 28], [28.5, 30]],
      glow: [[19.0, 28], [19.35, 29], [19.7, 30]], flash: [[14.1, 27]], rainAt: 28.45, rainEnd: 30.5,
      notes: [{ at: 2.8, out: 4.7, text: 'DAY 20 · $5,242.88', tone: 'ink', fg: '#FFD60A' }, { at: '@Still', out: '@Send-0.2', text: 'STILL BEHIND', tone: 'bad' }, { at: '@28', out: '@Follow-0.2', text: 'DAY 28 · AHEAD', tone: 'good' }, { at: '@last', out: 27.6, text: 'DAY 30…', tone: 'ink', fg: '#FFD60A' }] } },
    // --- loop frame ---
    { id: 'endt', type: 'text', at: [0, 1800], in: 33.0, props: HOOK },
    { id: 'art2', type: 'hookart', at: [0, 2280], in: 33.0, props: { variant: 'slap', reAt: 33.4 } },
    // --- screen-fixed ---
    { id: 'hyp', type: 'chip', layer: 'screen', at: [850, 264], in: 0.4, props: { text: 'HYPOTHETICAL', size: 24 } },
    { id: 'reg', type: 'text', layer: 'screen', at: [540, 430], in: '@Regret', out: '@One-0.1', props: { lines: [[['REGRET', 'bad']], ['IT YET?']], size: 120 } },
    { id: 'deal', type: 'dealchips', layer: 'screen', at: [540, 700], in: '@One-0.1', out: '@Tap-0.1', props: { items: [{ at: '@penny#2', text: '1¢ PENNY', tone: 'gold' }, { at: '@doubles', text: 'DOUBLES DAILY', tone: 'accent', size: 54 }, { at: '@30', text: '30 DAYS', tone: 'good' }, { at: '@no', text: 'NO TAXES', tone: 'paper' }] } },
    { id: 'heart', type: 'heart', layer: 'screen', at: [800, 900], in: '@heart', props: { s: 1, dur: 0.9 } },
    { id: 'plane', type: 'plane', layer: 'screen', at: [0, 0], in: '@Send-0.05', out: '@Send+1.0', props: { from: [470, 1000], to: [1150, 420], dur: 0.85, s: 0.62 } },
    { id: 'btn', type: 'follow', layer: 'screen', at: [650, 1120], in: '@Follow+0.05', out: '@Follow+1.45', props: { press: 0.55 } },
        { id: 'ask', type: 'bubble', layer: 'screen', at: [690, 720], in: '@So-0.1', out: 33.1, props: { l1: 'PENNY or MILLION?', l2: 'ONE WORD · COMMENT', size: 48, tail: 'left' } },
  ],
  beats: [
    { at: 0, beat: 'side-by-side', focus: F0, ...FR, pose: 'shock', keep: ['hook', 'art', 'endt', 'art2'] },
    { at: 0.5, beat: 'zoom-on-number', focus: 'art.penny', fill: 0.62, sy: 900, rot: 0.008, pose: 'point', keep: ['hook', 'art'] },
    { at: 1.38, beat: 'pull-back', focus: F0, ...FR, pose: 'talk', keep: ['hook', 'art'] },
    { at: 2.3, beat: 'graphic-hero', focus: 'board', fill: 0.9, maxH: 1020, sy: 830, st: ST, pose: 'shock', dur: 0.5 },
    { at: '@20', beat: 'zoom-on-number', focus: 'board.stack', fill: 0.9, maxH: 570, sy: 700, rot: 0.01, st: ST, pose: 'point', dur: 0.5 },
    { at: '@Regret', beat: 'presenter-front', focus: 'board', sy: 820, pose: 'shock' },
    { at: '@heart', beat: 'presenter-front', focus: 'board', sy: 820, pose: 'shrug' },
    { at: 10.4, beat: 'zoom-on-number', focus: 'board.t10', fill: 0.38, sy: 640, rot: 0.01, st: ST, pose: 'point', dur: 0.5 },
    { at: '@five#1', beat: 'graphic-hero', focus: 'board.pile', fill: 0.9, maxH: 700, sy: 800, st: ST, pose: 'shock' },
    { at: '@Day#2', beat: 'graphic-hero', focus: 'board', fill: 0.9, maxH: 1020, sy: 830, st: ST, pose: 'idle', dur: 0.7 },
    { at: '@27', beat: 'zoom-on-number', focus: 'board.t27', fill: 0.38, sy: 640, rot: -0.01, st: ST, pose: 'shock', dur: 0.5 },
    { at: '@671', beat: 'graphic-hero', focus: 'board.pile', fill: 0.92, maxH: 700, sy: 800, st: ST, pose: 'shock' },
    { at: '@Still', beat: 'zoom-on-number', focus: 'board.meter', fill: 0.9, sy: 700, rot: 0.01, st: ST, pose: 'shrug', dur: 0.5 },
    { at: '@Send', beat: 'presenter-front', focus: 'board', sy: 820, pose: 'you' },
    { at: '@here', beat: 'graphic-hero', focus: 'board', fill: 0.9, maxH: 1020, sy: 830, st: ST, pose: 'chin' },
    { at: '@28', beat: 'zoom-on-number', focus: 'board.t28', fill: 0.38, sy: 640, rot: 0.01, st: ST, pose: 'shock', dur: 0.5 },
    { at: '@finally', beat: 'zoom-on-number', focus: 'board.meter', fill: 0.9, sy: 700, rot: -0.01, st: ST, pose: 'shock', dur: 0.5 },
    { at: '@Follow', beat: 'presenter-front', focus: 'board', sy: 820, pose: 'follow' },
    { at: '@last', beat: 'graphic-hero', focus: 'board', fill: 0.9, maxH: 1020, sy: 830, st: ST, pose: 'point' },
    { at: '@30#2', beat: 'zoom-on-number', focus: 'board.day', fill: 0.62, sy: 640, rot: 0.01, st: ST, pose: 'shock', dur: 0.5 },
    { at: '@5', beat: 'zoom-on-number', focus: 'board.stack', fill: 0.9, maxH: 570, sy: 700, rot: -0.01, st: ST, pose: 'shock', dur: 0.55 },
    { at: 30.3, beat: 'graphic-hero', focus: 'board', fill: 0.9, maxH: 1020, sy: 830, st: ST, pose: 'idle', dur: 1.0 },
    { at: '@So', beat: 'presenter-front', focus: 'board', sy: 820, pose: 'you' },
    { at: 33.0, beat: 'side-by-side', focus: F0e, move: 'whip', ...FR, pose: 'shock', keep: ['hook', 'art', 'endt', 'art2'] },
  ],
  poses: [['@Follow', 'follow', { target: [650, 1120] }]],
  shakes: [[0.1, 8], [2.35, 10], ['@5', 20], ['@28', 8]],
  captions: { emph: { 'penny': 'accent', 'million': 'good', '20,': 'accent', 'grand.': 'accent', '27': 'bad', 'losing': 'bad', '28,': 'good', '5.37': 'good', 'stupid.': 'bad' }, fix: [['Cause', "'Cause"], ['cause', "'cause"], ['5.37', '$5.37'], ['671', '$671'], ['yet,', 'yet?'], ['the deal.', 'The deal:'], ['bucks,', 'bucks.'], ['Still,', 'Still—'], ['millions, one', 'million? One']] },
  bed: { name: 'upbeat_bed_2', gain: -1 },
  sfx: [
    { at: 0.04, name: 'deep_boom_2', gain: -4, dur: 0.36 }, { at: 0.06, name: 'paper_slam_1', gain: -7, dur: 0.5 },
    { at: 2.35, name: 'paper_slam_2', gain: -7, dur: 0.5 }, { at: 2.4, name: 'deep_boom_2', gain: -9, dur: 0.36 },
    { at: '@One-0.1', name: 'pop_2', gain: -10, dur: 0.3 }, { at: '@penny#2', name: 'coin_single_1', gain: -9, dur: 0.5 }, { at: '@doubles', name: 'pop_1', gain: -9, dur: 0.4 }, { at: '@30', name: 'pop_2', gain: -9, dur: 0.3 }, { at: '@no', name: 'click_2', gain: -9, dur: 0.2 },
    { at: '@heart', name: 'pop_2', gain: -9, dur: 0.3 },
    { at: 9.4, name: 'rewind_2', gain: -14, dur: 1.5 }, { at: '@10', name: 'ding_2', gain: -9, dur: 0.6 },
    { at: 12.9, name: 'money_counter_1', gain: -12, dur: 1.2 }, { at: 14.1, name: 'wrong_buzzer_1', gain: -14, dur: 0.6 }, { at: 14.1, name: 'thud_1', gain: -8, dur: 0.4 },
    { at: '@Send-0.05', name: 'swoosh_1', gain: -9, dur: 0.9 },
    { at: 19.0, name: 'click_1', gain: -9, dur: 0.2 }, { at: 19.35, name: 'click_1', gain: -9, dur: 0.2 }, { at: 19.7, name: 'click_1', gain: -9, dur: 0.2 },
    { at: 21.7, name: 'ding_2', gain: -7, dur: 0.6 }, { at: 21.7, name: 'success_chime_1', gain: -12, dur: 1.2 },
    { at: '@Follow+0.05', name: 'pop_1', gain: -9, dur: 0.5 }, { at: '@Follow+0.6', name: 'click_1', gain: -8, dur: 0.3 }, { at: '@Follow+0.7', name: 'success_chime_1', gain: -12, dur: 1.2 },
    { at: 26.5, name: 'riser_1', gain: -12, dur: 2.0 },
    { at: 28.5, name: 'deep_boom_1', gain: -2, dur: 1.6 }, { at: 28.5, name: 'cinematic_hit_1', gain: -6, dur: 1.2 }, { at: 28.5, name: 'coins_drop_1', gain: -8, dur: 1.8 },
    { at: '@So-0.1', name: 'pop_1', gain: -9, dur: 0.5 },
  ],
});
