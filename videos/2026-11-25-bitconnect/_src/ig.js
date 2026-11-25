// Instagram / Facebook Reels rebuild (beats.v2.md). Word times from voice/words.json (final voice).
const FR = { x: 150, y: 1330, s: 1.25 };
const BKS = { x: 190, y: 1330, s: 0.95, layer: 'back' };
const TXT = (lines, size, extra = {}) => ({ lines, size, ...extra });
BM2.scene({
  series: 'decoded', title: 'CASE: BITCONNECT · 2017', duration: 20.93,
  footnote: ['PROMOTER CONVICTED 2021 · 38 MONTHS · SOURCES: DOJ, SEC', 'OUR MATH: $1,000 × 1.01^DAYS'],
  elements: [
    // ---- station A: wallet on strings (frame 0) ----
    { id: 'puppet', type: 'puppet', at: [0, 0], in: -1, props: { dropAt: -0.12, yankAt: '@getting', yankAt2: '@played-0.15' } },
    { id: 'hookI', type: 'slamtext', at: [0, -700], in: 0, out: 3.3, props: TXT([[['1% A DAY?', 'bad']]], 168, { over: 0.22 }) },
    { id: 'hookI2', type: 'slamtext', at: [0, -560], in: '@not', out: 3.3, props: TXT([[['NOT INVESTING.', 'paper']]], 84) },
    { id: 'played', type: 'stamp', at: [0, 330], rot: -0.07, in: '@played-0.12', out: 3.4, props: { text: 'GETTING PLAYED', tone: 'bad', size: 108 } },
    { id: 'hookI3', type: 'slamtext', at: [0, -700], in: 19.55, props: TXT([[['1% A DAY?', 'bad']]], 168, { slam: false }) },
    // ---- station B: THE counter ----
    { id: 'ctr', type: 'compound', at: [1750, 0], in: '@grand-0.6', props: { h: 740,
      keys: [[0, 0], [5.7, 0], [6.3, 40], [6.9, 400], [7.4, 900], ['@billion', 1389]],
      rows: [{ day: 'DAY 1,389', v: '$1,000,000,000', at: '@billion', tone: 'bad', size: 56 }] } },
    // ---- station C: bot -> pipe (the "case file") ----
    { id: 'bot', type: 'bot', at: [3500, 0], in: '@crypto-0.6', props: { h: 780, noTaken: true, curtainAt: '@new-0.1', tagAt: '@prosecutors' } },
    // ---- station D: promoter case ----
    { id: 'case', type: 'case', at: [3500, 1750], in: '@Top-0.4', props: { guiltyAt: '@promoter', monthsAt: '@38' } },
    // ---- screen-fixed micro moments ----
    { id: 'heart', type: 'heart', layer: 'screen', at: [830, 640], in: '@tap-0.1', out: '@tap+1.3', props: {} },
    { id: 'easy', type: 'text', layer: 'screen', at: [540, 500], in: '@easy', out: 5.75, props: TXT([[['EASY MONEY?', 'paper']]], 90) },
    { id: 'send', type: 'text', layer: 'screen', at: [610, 1235], in: '@Send', out: '@Send+1.3', props: TXT([[['SEND ', 'accent'], ['THIS', 'paper']]], 80) },
    { id: 'plane', type: 'plane', layer: 'screen', at: [540, 790], in: '@Send-0.05', out: '@Send+1.3', props: { dur: 1.25, s: 1.5, from: [-380, 330], to: [420, -300] } },
  ],
  beats: [
    { at: 0, beat: 'zoom-on-number', focus: ['hookI', 'puppet.wallet'], fill: 0.86, maxH: 1300, sy: 1000, st: FR, pose: 'shock', dur: 0.5 },
    { at: '@not-0.05', beat: 'graphic-hero', focus: ['hookI', 'puppet'], fill: 0.74, maxH: 1500, sy: 800, st: 'corner-left', pose: 'point' },
    { at: '@getting-0.1', beat: 'zoom-on-number', focus: 'puppet.wallet', fill: 0.9, maxH: 700, sy: 780, st: BKS, rot: -0.012, dur: 0.5 },
    { at: '@played-0.15', beat: 'graphic-hero', focus: ['puppet.wallet', 'played'], fill: 0.86, maxH: 900, sy: 800, st: 'corner-left', pose: 'shock' },
    { at: '@Double-0.1', beat: 'presenter-front', focus: 'puppet', sy: 760, pose: 'talk' },
    // 5.7-9.7: the counter
    { at: '@grand-0.1', beat: 'side-by-side', focus: 'ctr', move: 'whip', sy: 760, fill: 0.74, maxH: 1000, pose: 'point' },
    { at: '@1#2', beat: 'zoom-on-number', focus: 'ctr.head', fill: 0.92, sy: 690, st: BKS, dur: 0.5 },
    { at: 7.1, beat: 'graphic-hero', focus: 'ctr', st: 'corner-left', fill: 0.84, maxH: 1000, sy: 780, pose: 'point' },
    { at: '@billion', beat: 'zoom-on-number', focus: ['ctr.value', 'ctr.m0'], fill: 0.9, maxH: 760, sy: 850, st: BKS, pose: 'shock', dur: 0.4 },
    { at: '@four-0.1', beat: 'zoom-on-number', focus: 'ctr.day', fill: 0.8, maxH: 400, sy: 700, st: 'corner-left', pose: 'point', dur: 0.5 },
    { at: '@Send', beat: 'graphic-hero', focus: 'ctr', fill: 0.86, maxH: 1000, sy: 800, st: 'corner-left', pose: 'you' },
    // 11-17: the bot / pipe
    { at: '@crypto', beat: 'side-by-side', focus: 'bot', move: 'whip', sy: 800, fill: 0.74, maxH: 960, pose: 'shrug' },
    { at: '@sold-0.1', beat: 'graphic-hero', focus: 'bot', st: 'corner-left', fill: 0.8, maxH: 960, sy: 810, pose: 'point' },
    { at: '@but', beat: 'graphic-hero', focus: 'bot.head', fill: 0.9, maxH: 560, sy: 700, st: BKS, pose: 'chin' },
    { at: '@new-0.1', beat: 'zoom-on-number', focus: 'bot.pipe', fill: 0.94, maxH: 560, sy: 880, st: BKS, pose: 'point', dur: 0.5 },
    { at: 16.0, beat: 'pull-back', focus: 'bot', fill: 0.78, maxH: 960, sy: 790, st: 'corner-left' },
    // 16.9-: payoff
    { at: '@Top', beat: 'side-by-side', focus: 'case', move: 'whip', sy: 760, fill: 0.74, maxH: 950, pose: 'point' },
    { at: '@promoter-0.15', beat: 'zoom-on-number', focus: ['case.who', 'case.guilty'], fill: 0.9, sy: 820, st: 'corner-left', pose: 'shock', dur: 0.4 },
    { at: '@38', beat: 'zoom-on-number', focus: ['case.guilty', 'case.months'], fill: 0.94, maxH: 700, zoom: 1.05, sy: 830, st: BKS, dur: 0.4 },
    { at: 19.1, beat: 'pull-back', focus: 'case', fill: 0.8, maxH: 950, sy: 770, st: 'corner-left', pose: 'idle' },
    // 19.55: whip back to the wallet = frame 0
    { at: 19.55, beat: 'zoom-on-number', focus: ['hookI3', 'puppet.wallet'], move: 'whip', fill: 0.86, maxH: 1300, sy: 1000, st: FR, pose: 'talk' },
  ],
  poses: [],
  shakes: [[0.0, 12], ['@getting', 12], ['@played-0.12', 16], ['@billion', 20], ['@promoter', 14], ['@38', 22]],
  captions: { gap: 16, emph: { '1%': 'bad', billion: 'bad', '38': 'bad', ass: 'bad', played: 'bad', prosecutors: 'accent', grand: 'good' }, fix: [] },
  bed: { name: 'tense_bed_2', gain: -1 },
  sfx: [
    { at: 0, name: 'deep_boom_2', gain: -4, dur: 0.4 }, { at: 0.05, name: 'punch_1', gain: -9, dur: 0.5 },
    { at: '@getting', name: 'cartoon_boing_1', gain: -10, dur: 0.6 }, { at: '@played-0.15', name: 'cartoon_boing_2', gain: -10, dur: 0.6 },
    { at: '@played-0.12', name: 'rubber_stamp_2', gain: -4, dur: 0.5 }, { at: '@played-0.12', name: 'thud_1', gain: -8, dur: 0.5 },
    { at: '@tap-0.1', name: 'pop_2', gain: -8, dur: 0.5 },
    { at: '@grand-0.1', name: 'money_counter_1', gain: -12, dur: 2.0 }, { at: '@1#2', name: 'cash_register_2', gain: -9, dur: 0.9 },
    { at: '@billion', name: 'deep_boom_1', gain: -4, dur: 1.6 }, { at: '@billion', name: 'cash_register_1', gain: -7, dur: 0.9 }, { at: '@billion', name: 'rubber_stamp_2', gain: -6, dur: 0.5 },
    { at: '@Send-0.05', name: 'swoosh_2', gain: -9, dur: 1.0 },
    { at: '@crypto', name: 'record_scratch_1', gain: -11, dur: 0.6 }, { at: '@BitConnect', name: 'paper_slam_2', gain: -10, dur: 0.5 },
    { at: '@prosecutors', name: 'pop_1', gain: -9, dur: 0.5 }, { at: '@new-0.1', name: 'swoosh_2', gain: -10, dur: 1.0 }, { at: '@new+0.25', name: 'money_counter_1', gain: -14, dur: 1.6, offset: 0.4 },
    { at: '@Top', name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@promoter', name: 'rubber_stamp_2', gain: -4, dur: 0.5 }, { at: '@promoter', name: 'gavel_1', gain: -6, dur: 0.8 },
    { at: '@38', name: 'cinematic_hit_1', gain: -3, dur: 1.6 }, { at: '@38', name: 'money_counter_2', gain: -11, dur: 0.8 }, { at: '@38+0.72', name: 'ding_2', gain: -8, dur: 0.7 },
    { at: 19.5, name: 'rewind_2', gain: -11, dur: 0.8 },
  ],
});
