const F0 = { x: 0, y: 40, w: 900, h: 1340 };      // frame 0 and the loop frame share this framing
const ST0 = { x: 540, y: 1340, s: 1.3, layer: 'front' };   // storyteller stands between the two closed cases
const H1 = { lines: [[['$1,000,000', 'good']]], size: 156 };
const H2 = { lines: [['STAY OR SWITCH?'], [['YOUR GUT\'S WRONG', 'bad']]], size: 96 };
const LOOP = '@stay#2-0.7';
BM2.scene({
  series: 'whatif', title: 'THREE BRIEFCASES', duration: 31.39,
  footnote: ['ASSUMES: 1 CASE HAS $1,000,000 (AT RANDOM) · HOST KNOWS WHERE', 'HE ALWAYS OPENS AN EMPTY CASE YOU DIDN\'T PICK + OFFERS THE SWAP', 'HYPOTHETICAL · NOT FINANCIAL ADVICE · NO REAL GAME SHOW', 'PHOTO: SEMTRIO · CC BY 2.0 · VIA FLICKR'],
  elements: [
    // --- station 1: two closed cases + an empty one behind (frame 0 + loop frame), then rewound to three ---
    { id: 'hook1', type: 'text', at: [0, -560], in: -1, out: '@Three-0.15', props: H1 },
    { id: 'hook2', type: 'text', at: [0, -385], in: -1, out: '@Three-0.15', props: H2 },
    { id: 'endt1', type: 'text', at: [0, -560], in: LOOP, props: H1 },
    { id: 'endt2', type: 'text', at: [0, -385], in: LOOP, props: H2 },
    { id: 'tbl', type: 'table3', at: [0, 330], in: -1, props: { reAt: LOOP, slam: [-0.36, -0.29, -0.22], alt: true, relAt: '@Three', opens: [[2, -5, '@Three'], [2, '@opens', 99999]], tagIn: -1, tagIdx: 1, tagAway: '@picked', numAt: '@Three+0.45', pickAt: '@picked', pickIdx: 0,
      handAt: '@host', handIdx: 2, xrayAt: '@where', flipAt: '@opens', pullAt: '@Tap', swapAt: '@heart', btnAt: -0.1, fiftyAt: '@50', crackAt: '@Nah', pullOut: '@Nah+0.55',
      lockAt: '@one#4', slideAt: '@skipped-0.2', tag2At: '@skipped+0.25', winAt: '@two#2' } },
    { id: 'cash', type: 'photo', at: [0, 70], in: '@Three+0.5', out: '@picked-0.1', props: { src: 'brand/photos/stock/briefcase-cash/7.jpg', name: 'CASH', role: 'STOCK PHOTO', credit: 'PHOTO: SEMTRIO · CC BY 2.0', w: 230, aspect: 0.8, tilt: -0.05, fx: 0.5, fy: 0.5 } },
    // --- station 2: the kitchen-table trial (payoff) ---
    { id: 'kit', type: 'tally', at: [1750, 330], in: '@real-0.8', out: '@stay#2-0.3', props: { variant: 'kitchen', hostAt: '@real', markAt: '@real+0.2', doneAt: '@switching' } },
    // --- screen-fixed ---
    { id: 'hyp', type: 'chip', layer: 'screen', at: [850, 264], in: '@Three+0.3', props: { text: 'HYPOTHETICAL', size: 24 } },
    { id: 'asm', type: 'assumes', layer: 'screen', at: [450, 338], in: '@host+0.3', props: { text: 'HOST KNOWS · ALWAYS OPENS AN EMPTY CASE', size: 21 } },
    { id: 'heart', type: 'heart', layer: 'screen', at: [800, 760], in: '@heart', props: { s: 1, dur: 0.9 } },
    { id: 'plane', type: 'plane', layer: 'screen', at: [0, 0], in: '@Send-0.05', out: '@Send+1.0', props: { from: [470, 1000], to: [1150, 420], dur: 0.85, s: 0.62 } },
    { id: 'btn', type: 'follow', layer: 'screen', at: [650, 1120], in: '@follow+0.05', out: '@follow+1.45', props: { press: 0.55 } },
    { id: 'ask', type: 'bubble', layer: 'screen', at: [800, 830], in: '@stay#2', out: 31.35, props: { l1: 'STAY OR SWITCH?', l2: 'ONE WORD', size: 50, tail: 'left' } },
  ],
  beats: [
    { at: 0, beat: 'side-by-side', focus: F0, fill: 0.70, maxH: 1250, sx: 560, sy: 890, st: ST0, pose: 'shock', keep: ['hook1', 'hook2', 'tbl', 'endt1', 'endt2'] },
    { at: 0.3, beat: 'zoom-on-number', focus: 'hook1', fill: 0.92, sy: 700, rot: 0.008, st: ST0, pose: 'point', keep: ['hook1', 'hook2', 'tbl'] },
    { at: '@two', beat: 'zoom-on-number', focus: 'tbl.row', fill: 0.98, sy: 940, rot: -0.01, st: ST0, pose: 'shock', keep: ['hook1', 'hook2', 'tbl'] },
    { at: '@Stay', beat: 'pull-back', focus: F0, fill: 0.70, maxH: 1250, sx: 560, sy: 890, st: ST0, pose: 'talk', keep: ['hook1', 'hook2', 'tbl'] },
    { at: '@guts', beat: 'zoom-on-number', focus: 'hook2', fill: 0.96, sy: 700, rot: 0.01, st: ST0, pose: 'point', keep: ['hook1', 'hook2', 'tbl'] },
    // stakes (rewind)
    { at: '@Three', beat: 'graphic-hero', focus: 'tbl.row', fill: 0.92, sy: 800, st: 'corner-left', pose: 'idle', keep: ['cash'] },
    { at: '@picked', beat: 'zoom-on-number', focus: 'tbl.pick', fill: 0.72, sy: 620, rot: 0.01, st: 'corner-left', pose: 'point' },
    // host rule
    { at: '@host', beat: 'graphic-hero', focus: 'tbl', fill: 0.92, maxH: 1000, sy: 800, st: 'corner-left', pose: 'point', point: 'tbl.hand' },
    { at: '@where', beat: 'zoom-on-number', focus: 'tbl.row', fill: 0.98, sy: 820, rot: 0.008, st: 'corner-left', pose: 'chin' },
    { at: '@opens', beat: 'zoom-on-number', focus: 'tbl.c2', fill: 0.76, sy: 820, rot: -0.01, st: 'corner-left', pose: 'shock' },
    { at: '@Tap', beat: 'graphic-hero', focus: 'tbl.pulled', fill: 0.72, sy: 780, st: 'corner-left', pose: 'idle' },
    { at: '@50', beat: 'zoom-on-number', focus: 'tbl.fifty', fill: 0.8, sy: 660, rot: 0.01, st: 'corner-left', pose: 'shock' },
    { at: '@50+0.6', beat: 'graphic-hero', focus: 'tbl', fill: 0.92, maxH: 1000, sy: 800, st: 'left', pose: 'chin', point: 'tbl.fifty' },
    { at: '@Nah', beat: 'pull-back', focus: 'tbl', fill: 0.92, maxH: 1000, sy: 800, st: 'corner-left', pose: 'shrug' },
    { at: '@one#4', beat: 'zoom-on-number', focus: 'tbl.bar0', fill: 0.62, sy: 760, rot: -0.01, st: 'corner-left', pose: 'point' },
    { at: '@still', beat: 'pull-back', focus: 'tbl', fill: 0.92, maxH: 1000, sy: 800, st: 'corner-left', pose: 'shrug' },
    { at: '@Send', beat: 'presenter-front', focus: 'tbl', sy: 820, pose: 'shrug' },
    { at: '@who', beat: 'presenter-front', focus: 'tbl', sy: 820, pose: 'talk' },
    { at: '@other', beat: 'graphic-hero', focus: 'tbl', fill: 0.92, maxH: 1000, sy: 800, st: 'corner-left', pose: 'point', point: 'tbl.bar1' },
    { at: '@two#2', beat: 'zoom-on-number', focus: 'tbl.bar1', fill: 0.62, sy: 760, rot: 0.01, st: 'corner-left', pose: 'shock' },
    { at: '@Don\'t', beat: 'presenter-front', focus: 'tbl', sy: 820, pose: 'you' },
    { at: '@arguments', beat: 'graphic-hero', focus: 'tbl', fill: 0.92, maxH: 1000, sy: 800, st: 'corner-left', pose: 'point', point: 'tbl.bar1' },
    // payoff
    { at: '@real-0.7', beat: 'graphic-hero', focus: 'kit', move: 'whip', fill: 0.9, maxH: 1000, sy: 930, st: 'corner-left', pose: 'idle' },
    { at: '@tried', beat: 'zoom-on-number', focus: 'kit.board', fill: 0.92, sy: 650, rot: 0.01, st: 'corner-left', pose: 'point' },
    { at: '@himself+0.3', beat: 'pull-back', focus: 'kit', fill: 0.9, maxH: 1000, sy: 930, st: 'corner-left', pose: 'chin' },
    { at: '@switching', beat: 'zoom-on-number', focus: 'kit.sw', fill: 0.78, sy: 700, rot: -0.012, st: 'corner-left', pose: 'shock', dur: 0.4 },
    { at: LOOP, beat: 'side-by-side', focus: F0, move: 'whip', fill: 0.70, maxH: 1250, sx: 560, sy: 890, st: ST0, pose: 'shock', keep: ['hook1', 'hook2', 'tbl', 'endt1', 'endt2'] },
  ],
  poses: [['@follow', 'follow', { target: [650, 1120] }], ['@stay#2', 'chin']],
  shakes: [[0.3, 10], ['@50', 10], ['@Nah', 12], ['@two#2', 10], ['@switching', 26], ['@stay#2-0.6', 10]],
  captions: { gap: 16, emph: { million: 'good', 'wrong.': 'bad', cash: 'good', '50': 'accent', 'two': 'good', 'switching.': 'good', 'empty': 'accent' }, fix: [['cause', '\'cause'], ['guts', 'gut\'s'], ['switch,', 'switch?'], ['Nah,', 'Nah.'], ['one and', 'one in'], ['two and', 'two in'], ['and three,', 'in three.']] },
  bed: { name: 'lofi_bed_1', gain: -1 },
  sfx: [
    { at: 0, name: 'deep_boom_2', gain: -4, dur: 0.36 }, { at: 0.16, name: 'thud_1', gain: -8, dur: 0.4 }, { at: 0.3, name: 'pop_2', gain: -9, dur: 0.3 }, { at: 0.4, name: 'pop_1', gain: -10, dur: 0.3 },
    { at: '@Three', name: 'rewind_1', gain: -10, dur: 0.8 }, { at: '@Three+0.45', name: 'pop_1', gain: -9, dur: 0.4 }, { at: '@Three+0.57', name: 'pop_1', gain: -10, dur: 0.4 }, { at: '@Three+0.69', name: 'pop_2', gain: -10, dur: 0.4 },
    { at: '@picked', name: 'paper_slam_2', gain: -7, dur: 0.5 }, { at: '@picked+0.02', name: 'click_1', gain: -9, dur: 0.3 },
    { at: '@host', name: 'swoosh_1', gain: -10, dur: 0.8 }, { at: '@where', name: 'riser_1', gain: -14, dur: 0.9 }, { at: '@host+0.3', name: 'click_2', gain: -9, dur: 0.2 },
    { at: '@opens', name: 'door_slam_1', gain: -11, dur: 0.45 }, { at: '@opens', name: 'pop_2', gain: -9, dur: 0.3 },
    { at: '@heart', name: 'pop_2', gain: -9, dur: 0.3 }, { at: '@Tap', name: 'swoosh_2', gain: -11, dur: 0.6 }, { at: '@50', name: 'deep_boom_2', gain: -8, dur: 0.36 }, { at: '@50', name: 'pop_2', gain: -8, dur: 0.3 },
    { at: '@Nah', name: 'glass_shatter_2', gain: -12, dur: 0.7 }, { at: '@Nah', name: 'sub_drop_1', gain: -10, dur: 0.8 },
    { at: '@one#4', name: 'click_1', gain: -7, dur: 0.3 }, { at: '@one#4+0.3', name: 'click_2', gain: -7, dur: 0.3 },
    { at: '@Send-0.05', name: 'swoosh_1', gain: -9, dur: 0.9 },
    { at: '@skipped-0.2', name: 'swoosh_2', gain: -9, dur: 0.6 }, { at: '@skipped+0.25', name: 'success_chime_1', gain: -12, dur: 1.0 }, { at: '@skipped+0.25', name: 'pop_1', gain: -8, dur: 0.4 },
    { at: '@follow+0.05', name: 'pop_1', gain: -9, dur: 0.5 }, { at: '@follow+0.6', name: 'click_1', gain: -8, dur: 0.3 }, { at: '@follow+0.7', name: 'success_chime_1', gain: -12, dur: 1.2 },
    { at: '@real-0.7', name: 'whoosh_1', gain: -10, dur: 0.7 }, { at: '@real', name: 'thud_2', gain: -8, dur: 0.5 },
    { at: '@real+0.2', name: 'click_2', gain: -9, dur: 0.2 }, { at: '@real+0.5', name: 'click_2', gain: -9, dur: 0.2 }, { at: '@real+0.8', name: 'click_2', gain: -9, dur: 0.2 }, { at: '@real+1.1', name: 'click_2', gain: -9, dur: 0.2 }, { at: '@real+1.4', name: 'click_2', gain: -9, dur: 0.2 }, { at: '@real+1.7', name: 'click_2', gain: -9, dur: 0.2 }, { at: '@real+2.0', name: 'click_2', gain: -9, dur: 0.2 }, { at: '@real+2.3', name: 'click_2', gain: -9, dur: 0.2 }, { at: '@real+2.6', name: 'click_2', gain: -9, dur: 0.2 }, { at: '@real+2.9', name: 'click_2', gain: -9, dur: 0.2 }, 
    { at: '@switching', name: 'rubber_stamp_2', gain: -3, dur: 0.5 }, { at: '@switching', name: 'deep_boom_1', gain: -2, dur: 1.6 }, { at: '@switching', name: 'cinematic_hit_1', gain: -6, dur: 1.2 },
    { at: '@stay#2-0.8', name: 'whoosh_1', gain: -8, dur: 0.8 }, { at: LOOP, name: 'deep_boom_2', gain: -6, dur: 0.36 }, { at: '@stay#2-0.05', name: 'pop_1', gain: -9, dur: 0.5 },
  ],
});
