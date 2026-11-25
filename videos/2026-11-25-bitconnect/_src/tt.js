// TikTok rebuild (beats.v2.md). Word times from voice/words.json (final voice).
const FR = { x: 150, y: 1330, s: 1.25 };
const BKS = { x: 190, y: 1330, s: 0.95, layer: 'back' };
const TXT = (lines, size, extra = {}) => ({ lines, size, ...extra });
BM2.scene({
  series: 'decoded', title: 'CASE: BITCONNECT · 2017', duration: 34.23,
  footnote: ['PROMOTER CONVICTED 2021 · 38 MONTHS · SOURCES: DOJ, SEC', 'OUR MATH: $1,000 × 1.01^DAYS'],
  elements: [
    // ---- station A: tiny chip + red flag (frame 0) ----
    { id: 'flag', type: 'flag', at: [-260, 0], in: -1, props: { furlAt: -0.12, backAt: 33.0, chip: 'SOUNDS TINY' } },
    { id: 'hookT', type: 'slamtext', at: [0, -640], in: 0, out: 4.4, props: TXT([[['1% A DAY', 'bad']]], 196, { over: 0.22 }) },
    { id: 'hookT2', type: 'slamtext', at: [0, -640], in: 33.0, props: TXT([[['1% A DAY', 'bad']]], 196, { slam: false }) },
    // ---- station T: SEC card ----
    { id: 'tick', type: 'ticker', at: [1750, 0], in: '@BitConnect-0.4', props: { rowAt: [5.1, 5.74, 6.5, 6.95], srcAt: '@per', srcText: 'SOURCE: SEC · ALLEGED' } },
    // ---- station B: THE counter ----
    { id: 'ctr', type: 'compound', at: [0, 1750], in: '@Do-0.5', props: { h: 940,
      keys: [[0, 0], [10.8, 0], [11.7, 14], [12.3, 90], [12.94, 365], [14.82, 730], [16.0, 760], [17.5, 810], [18.8, 940], [20.04, 1095], [21.16, 1389]],
      rows: [{ day: 'DAY 365', v: '$37,783', at: '@37', tone: 'good' }, { day: 'DAY 730', v: '$1,427,588', at: '@1', tone: 'good' }, { day: 'DAY 1,389', v: '$1,000,000,000', at: '@billionaire', tone: 'bad', size: 56 }] } },
    // ---- station C: bot -> pipe ----
    { id: 'bot', type: 'bot', at: [1750, 1750], in: '@Prosecutors-0.5', props: { h: 780, noTaken: true, curtainAt: '@new-0.1', tagAt: '@Prosecutors' } },
    // ---- station D: promoter case ----
    { id: 'case', type: 'case', at: [3500, 1750], in: '@Top-0.4', props: { guiltyAt: '@promoter', monthsAt: '@38' } },
    // ---- screen-fixed micro moments ----
    { id: 'heart', type: 'heart', layer: 'screen', at: [830, 640], in: '@hard-0.1', out: '@hard+1.3', props: {} },
    { id: 'hyped', type: 'text', layer: 'screen', at: [540, 500], in: '@hyped', out: 10.35, props: TXT([[['HYPED?', 'paper']]], 96) },
    { id: 'send', type: 'text', layer: 'screen', at: [610, 1235], in: '@Send', out: '@Send+1.3', props: TXT([[['SEND ', 'accent'], ['THIS', 'paper']]], 80) },
    { id: 'plane', type: 'plane', layer: 'screen', at: [540, 790], in: '@Send-0.05', out: '@Send+1.3', props: { dur: 1.25, s: 1.5, from: [-380, 330], to: [420, -300] } },
    { id: 'ask', type: 'bubble', layer: 'screen', at: [560, 650], in: '@Would', out: 33.5, props: { l1: 'WOULD YOU HAVE BOUGHT IN?', l2: 'COMMENT', size: 46, tail: 'left' } },
    { id: 'btn', type: 'follow', layer: 'screen', at: [830, 1180], in: '@Follow+0.1', out: '@Follow+1.55', props: { press: 0.8 } },
  ],
  beats: [
    { at: 0, beat: 'zoom-on-number', focus: ['hookT', 'flag'], fill: 0.86, maxH: 1200, sy: 900, st: FR, pose: 'shock', dur: 0.5 },
    { at: '@it\'s', beat: 'zoom-on-number', focus: { x: 200, y: -170, w: 700, h: 380 }, fill: 0.9, maxH: 640, sy: 700, st: BKS, rot: -0.012, dur: 0.5 },
    { at: '@bro-0.05', beat: 'presenter-front', focus: ['hookT', 'flag'], sy: 760, pose: 'talk' },
    // 4.5-8: SEC card
    { at: '@BitConnect', beat: 'side-by-side', focus: 'tick', move: 'whip', sy: 800, fill: 0.74, maxH: 960, pose: 'point' },
    { at: '@about', beat: 'graphic-hero', focus: 'tick', st: 'corner-left', fill: 0.82, maxH: 900, sy: 850, pose: 'point' },
    { at: '@one#2', beat: 'zoom-on-number', focus: ['tick.r1', 'tick.r2'], fill: 0.88, maxH: 560, sy: 880, st: BKS, rot: -0.012, dur: 0.5 },
    { at: '@per-0.1', beat: 'pull-back', focus: 'tick', fill: 0.8, maxH: 880, sy: 850, st: 'corner-left' },
    // 8.2-10.3 heart
    { at: '@Tap', beat: 'presenter-front', focus: 'tick', sy: 760, pose: 'talk' },
    // 10.3-: counter
    { at: '@Do', beat: 'side-by-side', focus: 'ctr', move: 'whip', sy: 760, fill: 0.74, maxH: 1000, pose: 'point' },
    { at: '@thousand', beat: 'zoom-on-number', focus: 'ctr.head', fill: 0.92, sy: 690, st: BKS, dur: 0.5 },
    { at: '@year-0.1', beat: 'graphic-hero', focus: 'ctr', st: 'corner-left', fill: 0.8, maxH: 1000, sy: 760, pose: 'point' },
    { at: '@37', beat: 'zoom-on-number', focus: 'ctr.value', fill: 0.82, sy: 812, st: BKS, rot: 0.012 },
    { at: 14.0, beat: 'pull-back', focus: 'ctr', fill: 0.8, maxH: 1000, sy: 760, st: 'corner-left' },
    { at: '@1', beat: 'zoom-on-number', focus: 'ctr.value', fill: 0.84, sy: 812, st: BKS, rot: -0.012 },
    { at: 15.9, beat: 'graphic-hero', focus: 'ctr', fill: 0.8, maxH: 1000, sy: 760, st: 'corner-left', pose: 'point' },
    { at: '@Send', beat: 'graphic-hero', focus: 'ctr', fill: 0.86, maxH: 1000, sy: 820, st: 'corner-left', pose: 'you' },
    { at: 19.0, beat: 'pull-back', focus: 'ctr', fill: 0.8, maxH: 1000, sy: 760, st: 'corner-left' },
    { at: '@1389', beat: 'zoom-on-number', focus: 'ctr.value', fill: 0.84, sy: 812, st: BKS, rot: 0.012, dur: 0.5 },
    { at: '@billionaire', beat: 'zoom-on-number', focus: ['ctr.value', 'ctr.m2'], fill: 0.9, maxH: 760, sy: 850, st: BKS, pose: 'shock', dur: 0.4 },
    { at: '@be', beat: 'presenter-front', focus: 'ctr', sy: 760, pose: 'shrug' },
    // 23.3-: pipe
    { at: '@Prosecutors', beat: 'side-by-side', focus: 'bot', move: 'whip', sy: 800, fill: 0.74, maxH: 960, pose: 'point' },
    { at: '@money', beat: 'zoom-on-number', focus: 'bot.pipe', fill: 0.94, maxH: 560, sy: 880, st: BKS, pose: 'point', dur: 0.5 },
    { at: 25.0, beat: 'pull-back', focus: 'bot', fill: 0.78, maxH: 960, sy: 790, st: 'corner-left' },
    // 26-28: follow
    { at: '@Follow-0.05', beat: 'wide', focus: ['flag', 'tick', 'ctr', 'bot'], fill: 0.94, sy: 760, st: { x: 250, y: 1330, s: 1.4 }, pose: 'you', dur: 1.0 },
    // 28.4-: payoff
    { at: '@Top', beat: 'side-by-side', focus: 'case', move: 'whip', sy: 760, fill: 0.74, maxH: 950, pose: 'point' },
    { at: '@promoter-0.15', beat: 'zoom-on-number', focus: ['case.who', 'case.guilty'], fill: 0.9, sy: 820, st: 'corner-left', pose: 'shock', dur: 0.4 },
    { at: '@38', beat: 'zoom-on-number', focus: ['case.guilty', 'case.months'], fill: 0.94, maxH: 700, zoom: 1.05, sy: 830, st: BKS, dur: 0.4 },
    { at: 30.8, beat: 'pull-back', focus: 'case', fill: 0.8, maxH: 950, sy: 770, st: 'corner-left', pose: 'idle' },
    { at: 31.6, beat: 'presenter-front', focus: 'case', sy: 760, pose: 'chin' },
    // 33: back to the chip = frame 0
    { at: 33.0, beat: 'zoom-on-number', focus: ['hookT2', 'flag'], move: 'whip', fill: 0.86, maxH: 1200, sy: 900, st: FR, pose: 'talk' },
  ],
  poses: [['@Follow', 'follow', { target: [830, 1180] }]],
  shakes: [[0.0, 12], ['@it\'s', 12], ['@billionaire', 20], ['@promoter', 14], ['@38', 22]],
  captions: { gap: 16, emph: { '1': 'bad', '%': 'bad', flag: 'bad', billionaire: 'bad', '37': 'good', prosecutors: 'accent', '38': 'bad', heart: 'bad' },
    fix: [['hard if', 'heart if'], ['tap the hard', 'tap the heart'], ['1389,', '1,389,'], ['bought-ins?', 'bought in?'], ['its 1.4', '1.4']] },
  bed: { name: 'tense_bed_2', gain: -1 },
  sfx: [
    { at: 0, name: 'deep_boom_2', gain: -4, dur: 0.4 }, { at: 0.05, name: 'punch_1', gain: -9, dur: 0.5 },
    { at: '@it\'s', name: 'riser_1', gain: -14, dur: 1.0 }, { at: '@red', name: 'alarm_1', gain: -16, dur: 0.8 },
    { at: '@BitConnect', name: 'paper_slam_2', gain: -10, dur: 0.5 },
    { at: 5.1, name: 'click_1', gain: -8, dur: 0.3 }, { at: 5.74, name: 'click_1', gain: -8, dur: 0.3 }, { at: 6.5, name: 'click_1', gain: -7, dur: 0.3 }, { at: 6.95, name: 'click_1', gain: -8, dur: 0.3 }, { at: '@per', name: 'pop_1', gain: -10, dur: 0.4 },
    { at: '@hard-0.1', name: 'pop_2', gain: -8, dur: 0.5 },
    { at: 11.0, name: 'money_counter_1', gain: -13, dur: 1.4 }, { at: '@37', name: 'cash_register_1', gain: -8, dur: 0.9 }, { at: '@37', name: 'paper_slam_2', gain: -11, dur: 0.5 },
    { at: '@1', name: 'cash_register_2', gain: -8, dur: 0.9 }, { at: '@1', name: 'paper_slam_2', gain: -11, dur: 0.5 }, { at: 16.0, name: 'money_counter_2', gain: -14, dur: 1.6 },
    { at: '@Send-0.05', name: 'swoosh_2', gain: -9, dur: 1.0 }, { at: '@1389', name: 'money_counter_1', gain: -12, dur: 1.4, offset: 0.4 },
    { at: '@billionaire', name: 'deep_boom_1', gain: -4, dur: 1.6 }, { at: '@billionaire', name: 'cash_register_1', gain: -7, dur: 0.9 }, { at: '@billionaire', name: 'rubber_stamp_2', gain: -6, dur: 0.5 },
    { at: '@be', name: 'record_scratch_1', gain: -10, dur: 0.6 },
    { at: '@Prosecutors', name: 'pop_1', gain: -9, dur: 0.5 }, { at: '@Prosecutors', name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@new-0.1', name: 'swoosh_2', gain: -10, dur: 1.0 }, { at: '@new+0.25', name: 'money_counter_1', gain: -14, dur: 1.6, offset: 0.4 },
    { at: '@Follow+0.85', name: 'click_1', gain: -8, dur: 0.3 }, { at: '@Follow+0.9', name: 'success_chime_1', gain: -12, dur: 1.2 },
    { at: '@Top', name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@promoter', name: 'rubber_stamp_2', gain: -4, dur: 0.5 }, { at: '@promoter', name: 'gavel_1', gain: -6, dur: 0.8 },
    { at: '@38', name: 'cinematic_hit_1', gain: -3, dur: 1.6 }, { at: '@38', name: 'money_counter_2', gain: -11, dur: 0.8 }, { at: '@38+0.72', name: 'ding_2', gain: -8, dur: 0.7 },
    { at: '@Would', name: 'pop_1', gain: -9, dur: 0.5 }, { at: 32.95, name: 'rewind_2', gain: -11, dur: 0.9 },
  ],
});
