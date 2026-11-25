// YouTube Shorts rebuild (beats.v2.md). Word times from voice/words.json (final voice).
const FR = { x: 150, y: 1330, s: 1.25 };                 // storyteller, front-left
const TXT = (lines, size, extra = {}) => ({ lines, size, ...extra });
BM2.scene({
  series: 'decoded', title: 'CASE: BITCONNECT · 2017', duration: 47.62,
  footnote: ['PROMOTER CONVICTED 2021 · 38 MONTHS · SOURCES: DOJ, SEC', 'OUR MATH: $1,000 × 1.01^DAYS · APP SCREEN IS AN ILLUSTRATION'],
  elements: [
    // ---- station A: cracked phone app + hook (frame 0 slam) ----
    { id: 'phone', type: 'phone', at: [0, 0], in: -1, props: { crackAt: 0.06, coinsAt: '@People', shutAt: '@shut', shutOutAt: 38.4 } },
    { id: 'hookA', type: 'slamtext', at: [0, -720], in: 0, out: 3.75, props: TXT([[['1% A DAY', 'bad']]], 200, { over: 0.22 }) },
    { id: 'hookB', type: 'slamtext', at: [0, -585], in: '@number-0.1', out: 3.75, props: TXT([[['NUMBER IN CRYPTO', 'paper']]], 78) },
    { id: 'dumb', type: 'stamp', at: [30, 120], rot: -0.08, in: '@dumbest-0.1', out: 3.8, props: { text: 'DUMBEST', tone: 'bad', size: 150 } },
    // ---- station Q: money taken in + big question mark ----
    { id: 'qctr', type: 'counter', at: [0, 1500], in: '@billions-0.3', props: { to: 2400000000, from: 0, at: '@billions', dur: 1.3, prefix: '$', size: 92, w: 900, tone: 'bad', label: 'MONEY TAKEN IN', sub: 'PER DOJ' } },
    { id: 'qm', type: 'slamtext', at: [0, 1930], in: '@Wait-0.05', props: TXT([[['?', 'accent']]], 640, { lh: 1 }) },
    // ---- station T: the SEC "posted returns" card ----
    { id: 'tick', type: 'ticker', at: [1750, 1700], in: '@BitConnect-0.4', props: { rowAt: [8.75, 9.54, 10.62, 11.36], srcAt: 8.3 } },
    // ---- station B: THE counter ----
    { id: 'ctr', type: 'compound', at: [1750, 0], in: '@Do-0.5', props: { h: 940,
      keys: [[0, 0], [15.6, 0], [16.7, 18], [17.9, 140], [18.56, 365], [20.78, 730], [21.8, 780], [23.0, 860], [24.2, 950], [25.46, 1050], [26.2, 1180], [26.84, 1389]],
      rows: [{ day: 'DAY 365', v: '$37,783', at: '@37', tone: 'good' }, { day: 'DAY 730', v: '$1,427,588', at: '@1', tone: 'good' }, { day: 'DAY 1,389', v: '$1,000,000,000', at: '@billionaire', tone: 'bad', size: 56 }] } },
    // ---- station C: trading bot -> pipe ----
    { id: 'bot', type: 'bot', at: [3450, 0], in: '@no-0.5', props: { h: 780, noTaken: true, curtainAt: '@who+0.1', tagAt: '@Prosecutors' } },
    // ---- station D: promoter case card ----
    { id: 'case', type: 'case', at: [3450, 1650], in: '@Its#2-0.4', props: { guiltyAt: '@guilty-0.15', monthsAt: '@38' } },
    // ---- loop copy of the hook (no slam: it slams again on frame 0) ----
    { id: 'hookA2', type: 'slamtext', at: [0, -720], in: 44.35, props: TXT([[['1% A DAY', 'bad']]], 200, { slam: false }) },
    // ---- screen-fixed micro moments ----
    { id: 'heart', type: 'heart', layer: 'screen', at: [830, 640], in: '@like-0.1', out: '@like+1.3', props: {} },
    { id: 'reas', type: 'text', layer: 'screen', at: [540, 500], in: 12.3, out: 13.5, props: TXT([[['SOUNDS REASONABLE?', 'paper']]], 74) },
    { id: 'not', type: 'text', layer: 'screen', at: [540, 500], in: 13.62, out: 14.9, props: TXT([[["IT'S NOT.", 'bad']]], 96) },
    { id: 'math', type: 'text', layer: 'screen', at: [610, 1235], in: 22.9, out: 24.4, props: TXT([[['SEND ', 'accent'], ['THIS', 'paper']]], 80) },
    { id: 'plane', type: 'plane', layer: 'screen', at: [540, 790], in: '@Send-0.05', out: '@Send+1.35', props: { dur: 1.3, s: 1.5, from: [-380, 330], to: [420, -300] } },
    { id: 'nobot', type: 'text', layer: 'screen', at: [610, 1235], in: '@no', out: 28.7, props: TXT([[['NO BOT DOES THAT', 'bad']]], 76) },
    { id: 'ask', type: 'bubble', layer: 'screen', at: [560, 650], in: "@why'd", out: 47.15, props: { l1: "WHY'D IT NEED YOUR MONEY?", l2: 'COMMENT', size: 44, tail: 'left' } },
    { id: 'btn', type: 'follow', layer: 'screen', at: [830, 1180], in: '@Follow+0.1', out: '@Follow+1.6', props: { press: 0.85 } },
  ],
  beats: [
    // 0-4: slam, stamp, coins pour in
    { at: 0, beat: 'zoom-on-number', focus: ['hookA', 'phone.rate'], fill: 0.84, maxH: 1000, sy: 900, st: FR, pose: 'shock', dur: 0.5 },
    { at: '@dumbest-0.1', beat: 'graphic-hero', focus: ['hookA', 'phone'], fill: 0.8, maxH: 1300, sy: 790, st: 'corner-left', pose: 'point' },
    { at: 2.15, beat: 'zoom-on-number', focus: 'phone.rate', fill: 0.78, maxH: 700, sy: 740, st: { x: 190, y: 1330, s: 0.95, layer: 'back' }, rot: -0.012 },
    { at: '@People-0.1', beat: 'graphic-hero', focus: ['phone.top', 'phone.rate'], fill: 0.86, maxH: 1000, sy: 640, st: 'corner-left', pose: 'idle' },
    // 4.5-7: billions -> big question mark
    { at: '@billions-0.1', beat: 'zoom-on-number', focus: 'qctr', move: 'whip', fill: 0.9, maxH: 700, sy: 720, st: 'corner-left', pose: 'shock', dur: 0.5 },
    { at: '@Wait', beat: 'graphic-hero', focus: ['qctr', 'qm'], fill: 0.82, maxH: 1500, sy: 800, st: 'corner-left', pose: 'chin' },
    { at: '@dumb', beat: 'zoom-on-number', focus: 'qm', fill: 0.9, maxH: 900, sy: 820, st: { x: 190, y: 1330, s: 0.95, layer: 'back' } },
    // 7.3-11.7: the SEC card
    { at: '@BitConnect', beat: 'side-by-side', focus: 'tick', move: 'whip', sy: 800, fill: 0.74, maxH: 960, pose: 'point' },
    { at: '@posted', beat: 'graphic-hero', focus: 'tick', st: 'corner-left', fill: 0.82, maxH: 900, sy: 850, pose: 'point' },
    { at: 10.5, beat: 'zoom-on-number', focus: ['tick.r2', 'tick.r3'], fill: 0.86, maxH: 560, sy: 900, st: { x: 190, y: 1330, s: 0.95, layer: 'back' }, rot: -0.012, dur: 0.5 },
    // 11.9-14.9: like + "it's not"
    { at: '@Hit', beat: 'presenter-front', focus: 'tick', sy: 760, pose: 'talk' },
    { at: '@it\'s', beat: 'presenter-front', focus: 'tick', sy: 760, pose: 'shrug', zoom: 0.86, dur: 0.5 },
    // 15.3-26.8: THE counter
    { at: '@Do', beat: 'side-by-side', focus: 'ctr', move: 'whip', sy: 760, fill: 0.74, maxH: 1000, pose: 'point' },
    { at: '@thousand', beat: 'zoom-on-number', focus: 'ctr.head', fill: 0.92, sy: 690, st: { x: 190, y: 1330, s: 0.95, layer: 'back' }, dur: 0.5 },
    { at: 16.95, beat: 'graphic-hero', focus: 'ctr', st: 'corner-left', fill: 0.8, maxH: 1000, sy: 760, pose: 'point' },
    { at: '@37', beat: 'zoom-on-number', focus: 'ctr.value', fill: 0.82, sy: 812, st: { x: 190, y: 1330, s: 0.95, layer: 'back' }, rot: 0.012 },
    { at: 19.5, beat: 'pull-back', focus: 'ctr', fill: 0.8, maxH: 1000, sy: 760, st: 'corner-left' },
    { at: '@1', beat: 'zoom-on-number', focus: 'ctr.value', fill: 0.84, sy: 812, st: { x: 190, y: 1330, s: 0.95, layer: 'back' }, rot: -0.012 },
    { at: 22.0, beat: 'graphic-hero', focus: 'ctr', fill: 0.8, maxH: 1000, sy: 760, st: 'corner-left', pose: 'point' },
    { at: '@Send', beat: 'graphic-hero', focus: 'ctr', fill: 0.86, maxH: 1000, sy: 820, st: 'corner-left', pose: 'you' },
    { at: '@1389', beat: 'zoom-on-number', focus: 'ctr.value', fill: 0.84, sy: 812, st: { x: 190, y: 1330, s: 0.95, layer: 'back' }, rot: 0.012, dur: 0.5 },
    { at: '@billionaire', beat: 'zoom-on-number', focus: ['ctr.value', 'ctr.m2'], fill: 0.9, maxH: 760, sy: 850, st: { x: 190, y: 1330, s: 0.95, layer: 'back' }, pose: 'shock', dur: 0.4 },
    // 27.4-33: no bot does that -> who paid -> pipe
    { at: '@no', beat: 'side-by-side', focus: 'bot', move: 'whip', sy: 800, fill: 0.74, maxH: 960, pose: 'shrug' },
    { at: '@who+0.1', beat: 'graphic-hero', focus: 'bot.window', fill: 0.88, sy: 880, st: 'corner-left', pose: 'chin' },
    { at: '@newer', beat: 'zoom-on-number', focus: 'bot.pipe', fill: 0.94, maxH: 560, sy: 880, st: { x: 190, y: 1330, s: 0.95, layer: 'back' }, pose: 'point' },
    { at: '@older', beat: 'pull-back', focus: 'bot', fill: 0.78, maxH: 960, sy: 790, st: 'corner-left' },
    // 33-35.3: shut down
    { at: '@January', beat: 'side-by-side', focus: 'phone', move: 'whip', sy: 780, fill: 0.74, maxH: 1000, pose: 'point' },
    { at: '@shut-0.1', beat: 'zoom-on-number', focus: 'phone.screen', fill: 0.9, maxH: 1000, sy: 800, st: 'corner-left', pose: 'shock', dur: 0.4 },
    // 35.4-38: follow
    { at: '@Follow-0.05', beat: 'wide', focus: ['phone', 'ctr', 'bot', 'tick'], fill: 0.94, sy: 760, st: { x: 250, y: 1330, s: 1.4 }, pose: 'you', dur: 1.0 },
    { at: '@smells', beat: 'graphic-hero', focus: 'phone', fill: 0.78, maxH: 1000, sy: 780, st: 'corner-left', pose: 'chin' },
    // 38.9-43.7: payoff
    { at: '@Its#2', beat: 'side-by-side', focus: 'case', move: 'whip', sy: 760, fill: 0.74, maxH: 950, pose: 'point' },
    { at: '@promoter', beat: 'graphic-hero', focus: ['case.who', 'case.guilty'], fill: 0.86, sy: 760, st: 'corner-left', pose: 'point' },
    { at: '@guilty-0.2', beat: 'zoom-on-number', focus: ['case.who', 'case.guilty'], fill: 0.9, sy: 820, st: 'corner-left', pose: 'shock', dur: 0.4 },
    { at: '@38', beat: 'zoom-on-number', focus: ['case.guilty', 'case.months'], fill: 0.94, maxH: 700, zoom: 1.05, sy: 830, st: { x: 190, y: 1330, s: 0.95, layer: 'back' }, dur: 0.4 },
    { at: 42.3, beat: 'pull-back', focus: 'case', fill: 0.8, maxH: 950, sy: 770, st: 'corner-left', pose: 'idle' },
    { at: 43.5, beat: 'presenter-front', focus: 'case', sy: 760, pose: 'chin' },
    // 44.5: back to the cracked phone = frame 0
    { at: 44.5, beat: 'zoom-on-number', focus: ['hookA2', 'phone.rate'], move: 'whip', fill: 0.84, maxH: 1000, sy: 900, st: FR, pose: 'talk' },
  ],
  poses: [['@Follow', 'follow', { target: [830, 1180] }]],
  shakes: [[0.06, 14], ['@dumbest', 16], ['@billionaire', 20], [34.16, 16], ['@guilty-0.15', 14], ['@38', 22]],
  captions: { gap: 16, emph: { '1': 'bad', dumbest: 'bad', '$2.4': 'bad', billions: 'bad', '37': 'good', billionaire: 'bad', prosecutors: 'accent', guilty: 'bad', '38': 'bad', down: 'bad' },
    fix: [['hand it at', 'handed it'], ['1389,', '1,389,'], ['its 1.4', "it's 1.4"], ['2018,', '2018,'], ['investors money', "investors' money"]] },
  bed: { name: 'tense_bed_2', gain: -1 },
  sfx: [
    { at: 0, name: 'deep_boom_2', gain: -4, dur: 0.4 }, { at: 0.06, name: 'glass_shatter_1', gain: -10, dur: 0.7 },
    { at: '@dumbest-0.1', name: 'rubber_stamp_2', gain: -5, dur: 0.5 }, { at: '@dumbest-0.1', name: 'thud_1', gain: -8, dur: 0.5 },
    { at: '@People', name: 'coins_drop_1', gain: -10, dur: 1.2 },
    { at: '@billions', name: 'cash_register_1', gain: -8, dur: 0.9 }, { at: '@billions', name: 'money_counter_2', gain: -12, dur: 1.3 },
    { at: '@Wait', name: 'dramatic_sting_1', gain: -10, dur: 0.9 },
    { at: '@BitConnect', name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: 8.3, name: 'pop_1', gain: -10, dur: 0.4 },
    { at: 8.75, name: 'click_1', gain: -8, dur: 0.3 }, { at: 9.54, name: 'click_1', gain: -8, dur: 0.3 }, { at: 10.62, name: 'click_1', gain: -7, dur: 0.3 }, { at: 11.36, name: 'click_1', gain: -8, dur: 0.3 },
    { at: '@like-0.1', name: 'pop_2', gain: -8, dur: 0.5 }, { at: 13.62, name: 'record_scratch_1', gain: -10, dur: 0.6 },
    { at: 16.7, name: 'money_counter_1', gain: -13, dur: 1.4 }, { at: '@37', name: 'cash_register_1', gain: -8, dur: 0.9 }, { at: '@37', name: 'paper_slam_2', gain: -11, dur: 0.5 },
    { at: '@1', name: 'cash_register_2', gain: -8, dur: 0.9 }, { at: '@1', name: 'paper_slam_2', gain: -11, dur: 0.5 }, { at: 21.8, name: 'money_counter_2', gain: -14, dur: 1.4 },
    { at: '@Send-0.05', name: 'swoosh_2', gain: -9, dur: 1.0 }, { at: '@1389', name: 'money_counter_1', gain: -12, dur: 1.6, offset: 0.4 },
    { at: '@billionaire', name: 'deep_boom_1', gain: -4, dur: 1.6 }, { at: '@billionaire', name: 'cash_register_1', gain: -7, dur: 0.9 }, { at: '@billionaire', name: 'rubber_stamp_2', gain: -6, dur: 0.5 },
    { at: '@no', name: 'record_scratch_1', gain: -10, dur: 0.6 },
    { at: '@who+0.1', name: 'swoosh_2', gain: -10, dur: 1.0 }, { at: '@who+0.45', name: 'money_counter_1', gain: -14, dur: 1.8, offset: 0.4 }, { at: '@Prosecutors', name: 'pop_1', gain: -9, dur: 0.5 },
    { at: '@January', name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@shut', name: 'door_slam_1', gain: -6, dur: 0.7 }, { at: '@shut+0.05', name: 'sub_drop_1', gain: -7, dur: 1.0 },
    { at: '@Follow+0.9', name: 'click_1', gain: -8, dur: 0.3 }, { at: '@Follow+0.95', name: 'success_chime_1', gain: -12, dur: 1.2 },
    { at: '@Its#2', name: 'paper_slam_2', gain: -10, dur: 0.5 },
    { at: '@guilty-0.15', name: 'rubber_stamp_2', gain: -4, dur: 0.5 }, { at: '@guilty-0.15', name: 'gavel_1', gain: -6, dur: 0.8 },
    { at: '@38', name: 'cinematic_hit_1', gain: -3, dur: 1.6 }, { at: '@38', name: 'money_counter_2', gain: -11, dur: 0.8 }, { at: '@38+0.72', name: 'ding_2', gain: -8, dur: 0.7 },
    { at: "@why'd-0.05", name: 'pop_1', gain: -9, dur: 0.5 }, { at: 44.4, name: 'rewind_2', gain: -11, dur: 0.9 },
  ],
});
