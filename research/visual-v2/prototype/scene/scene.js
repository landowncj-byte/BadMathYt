// PROTOTYPE — engine v2 look test on the overdraft TikTok narration (25.5 s). Same facts/numbers as the v1 cut.
// World: three stations in a row (receipt -> study -> chart). The camera flies between them and into the numbers.
BM2.scene({
  series: 'whatif', title: 'OVERDRAFT', duration: 25.51,
  footnote: ['CFPB EXAMPLE: $24 OVERDRAFT · 3 DAYS · $34 MEDIAN FEE (2014) ·', 'FEES VARY BY BANK'],
  elements: [
    // --- station A: the receipt ---
    { id: 'hook', type: 'text', at: [0, -470], in: -1, out: 4.75, props: { lines: [[['$34', 'bad'], [' TO BORROW', 'paper']], [['$24?', 'good']]], size: 132 } },
    { id: 'receipt', type: 'receipt', at: [0, 70], in: -1, props: { title: 'BANK · OVERDRAFT', rows: [
      { id: 'loan', k: 'LOAN', v: '$24.00', at: '@$24', tone: 'good' }, { id: 'term', k: 'TERM', v: '3 DAYS', at: '@three', tone: 'accent' }, { id: 'fee', k: 'FEE', v: '$34.00', at: '@$34', tone: 'bad' }], foot: 'HAVE A NICE DAY' } },
    { id: 'stamp', type: 'stamp', at: [0, -215], rot: -0.07, in: '@overdraft', props: { text: 'OVERDRAFT FEE', tone: 'bad', size: 104 } },
    // --- station B: the study ---
    { id: 'doc', type: 'doc', at: [1750, -60], in: "@government's-0.25", props: { title: 'CFPB STUDY', sub: 'DEBIT CARD OVERDRAFTS · 2014', skeleton: 3,
      lines: [{ id: 'math', t: '$34 ÷ $24 × 365 ÷ 3', at: '@did', mark: 'accent' }],
      hero: { label: 'AS A YEARLY RATE, ABOUT', to: 17000, suffix: '%', at: '@about', dur: 1.2, sub: 'APR' } } },
    // --- station C: the comparison ---
    { id: 'cc', type: 'card', at: [3285, 330], rot: -0.05, in: '@credit', out: '@versus-0.2', enter: 'drop', props: { w: 380, h: 230, fill: 'navy', pad: 78, lines: [{ t: 'CREDIT CARD', tone: 'paper', size: 38, gap: 76 }, { t: '~22% APR', tone: 'gold', size: 62, font: 'hero' }] } },
    { id: 'chart', type: 'bars', at: [3450, 200], in: '@credit-0.5', props: { h: 780, items: [
      { id: 'card', label: 'CREDIT CARD', sub: 'same $24, 3 days', value: 0.04, show: 4, display: { suffix: '¢' }, tone: 'good', at: '@four' },
      { id: 'fee', label: 'OVERDRAFT', sub: 'the fee', value: 34, display: { prefix: '$' }, tone: 'bad', at: '@$34#2-0.25', style: 'cash', count: 34, dur: 1.0 }] } },
    { id: 'coins', type: 'coins', at: [3125, 536], in: '@four', props: { count: 4, at: '@four+0.1', per: 0.11, r: 40 } },
    // --- screen-fixed prompts ---
    { id: 'ask', type: 'bubble', layer: 'screen', at: [560, 650], in: '@how-0.1', out: '@follow-0.25', props: { l1: 'HOW MUCH?', l2: 'COMMENT', size: 62, tail: 'left' } },
    { id: 'mark', type: 'text', layer: 'screen', at: [540, 440], in: '@follow+0.3', props: { lines: ['BAD MATH'], size: 150 } },
    { id: 'btn', type: 'follow', layer: 'screen', at: [650, 1120], in: '@follow+0.1', props: { press: 0.85 } },
  ],
  beats: [
    { at: 0, beat: 'side-by-side', focus: ['hook', 'receipt'], sx: 650, sy: 800, fill: 0.7, st: { x: 150, y: 1330, s: 1.25 }, pose: 'talk', others: [0, 0] },
    { at: '@$34', beat: 'zoom-on-number', focus: 'receipt.fee', fill: 0.94 },                                   // push 1
    { at: '@$24', beat: 'zoom-on-number', focus: 'receipt.loan', fill: 0.82, sy: 640, rot: 0.012, dur: 0.5 },             // push 2 (slides up the slip)
    { at: '@three', beat: 'zoom-on-number', focus: 'receipt.term', fill: 0.82, sy: 690, rot: -0.008, dur: 0.5 },
    { at: '@that\'s', beat: 'presenter-front', focus: 'receipt', keep: ['stamp'], sy: 810 },         // he walks in front and talks
    { at: "@government's", beat: 'peek', focus: 'doc', move: 'whip', sy: 880, maxH: 800 },             // whip to the study; he ducks BEHIND it
    { at: '@did', beat: 'zoom-on-number', focus: 'doc.math', fill: 0.8, sy: 700, rot: 0.01, pose: 'point' },                 // he pops out in front; push on the formula
    { at: '@about', beat: 'zoom-on-number', focus: 'doc.hero', fill: 0.84, sy: 780, dur: 0.7, pose: 'chin' }, // push 3: fly into 17,000%
    { at: '@PR.>+0.1', beat: 'pull-back', focus: 'doc', fill: 0.74, pose: 'shrug' },
    { at: '@a#2', beat: 'side-by-side', focus: ['cc', 'chart.card_base'], keep: ['chart'], move: 'whip', sx: 690, sy: 760, fill: 0.5 },
    { at: '@four', beat: 'zoom-on-number', focus: 'chart.card_base', keep: ['coins'], st: 'corner-left', fill: 0.5, maxH: 420 }, // push 4: the 4-cent sliver
    { at: '@four#2', beat: 'graphic-hero', focus: 'chart', st: 'corner-left', fill: 0.62, sx: 600, sy: 800, pose: 'idle' },
    { at: '@$34#2+0.55', beat: 'zoom-on-number', focus: 'chart.fee_top', st: 'corner-left', fill: 0.86, dur: 0.7, pose: 'shock' }, // push 5: ride the stack up
    { at: '@has', beat: 'presenter-front', focus: 'chart', pose: 'you', sy: 760 },
    { at: '@follow', beat: 'wide', focus: ['receipt', 'doc', 'chart'], st: { x: 250, y: 1330, s: 1.4 }, pose: 'follow', fill: 0.92, sy: 790, dur: 1.2 },
  ],
  poses: [['@$34+0.1', 'point', { target: 'receipt.fee' }], ['@,000>', 'shock'], ['@much?', 'shrug'], ['@comment', 'you'], ['@follow', 'follow', { target: [600, 1120] }]],
  shakes: [['@overdraft+0.2', 12], ['@,000>', 18], ['@$34#2+0.8', 10]],
  captions: { emph: { '$34': 'bad', '$34.': 'bad', '$24': 'good', '17,000%': 'bad', 'cents': 'good', 'APR.': 'bad' }, fix: [['a PR.', 'APR.']] },
  bed: { name: 'upbeat_bed_2', gain: -1 },
  sfx: [
    { at: 0, name: 'deep_boom_2', gain: -5, dur: 0.36 }, { at: 0.05, name: 'typewriter_1', gain: -13, dur: 0.7 },
    { at: '@$34', name: 'cash_register_1', gain: -9 }, { at: '@$24', name: 'pop_2', gain: -7, dur: 0.3 }, { at: '@three', name: 'pop_2', gain: -7, dur: 0.3 },
    { at: '@overdraft+0.18', name: 'rubber_stamp_2', gain: -3, dur: 0.5 }, { at: '@overdraft+0.18', name: 'deep_boom_2', gain: -8, dur: 0.36 },
    { at: "@government's", name: 'paper_slam_2', gain: -10, dur: 0.5 }, { at: '@did', name: 'typewriter_2', gain: -12, dur: 0.6 },
    { at: '@about', name: 'money_counter_1', gain: -12, dur: 1.15 }, { at: '@,000>', name: 'deep_boom_1', gain: -3, dur: 1.6 }, { at: '@,000>', name: 'ding_2', gain: -9, dur: 0.7 },
    { at: '@credit', name: 'pop_1', gain: -9, dur: 0.5 }, { at: '@four+0.25', name: 'coins_drop_2', gain: -8, dur: 0.6 }, { at: '@four+0.45', name: 'coin_single_1', gain: -10, dur: 0.8 },
    { at: '@$34#2-0.25', name: 'money_counter_1', gain: -9, dur: 1.0, offset: 1.5 }, { at: '@$34#2+0.8', name: 'deep_boom_1', gain: -4, dur: 1.6 }, { at: '@$34#2+0.8', name: 'cash_register_1', gain: -7 },
    { at: '@how-0.1', name: 'pop_1', gain: -9, dur: 0.5 }, { at: '@follow+0.95', name: 'click_1', gain: -8, dur: 0.3 }, { at: '@follow+1.0', name: 'success_chime_1', gain: -12, dur: 1.2 },
  ],
});
