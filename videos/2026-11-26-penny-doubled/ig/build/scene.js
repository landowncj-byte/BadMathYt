// Bad Math v2 — STARTER SCENE. Copy this folder (or run `bm2.cjs init`), then edit. Full reference: brand/engine-v2/README.md
// Times are seconds OR '@word' refs into words.json: '@$34' (start of the word), '@$34#2' (2nd time it is said),
// '@cents>' (END of the word), '@math+0.3' (offset). Numeric times are used below so the starter runs with any voice;
// in a real video, put every beat and reveal on the spoken word.
BM2.scene({
  series: 'whatif',            // 'whatif' (yellow pill) or 'decoded' (red pill)
  title: 'STARTER',            // small mono label next to the pill
  duration: 14,                // seconds = narration length (+ ~0.3 s tail)
  footnote: ['ASSUMPTIONS / SOURCE LINE GOES HERE'],
  // ---- 1. ELEMENTS: the graphics, placed in one continuous world. Put each "station" ~1500-1800 px apart. ----
  elements: [
    { id: 'hook', type: 'text', at: [0, -420], in: -1, out: 3.2, props: { lines: [[['$1', 'good'], [' A SECOND', 'paper']], ['FOREVER?']], size: 140 } },
    { id: 'num', type: 'counter', at: [0, 80], in: -1, props: { label: 'AFTER ONE DAY', to: 86400, prefix: '$', at: 1.0, dur: 1.4, tone: 'good', size: 190 } },
    { id: 'chart', type: 'bars', at: [1700, 0], in: 4.8, props: { h: 700, items: [
      { id: 'a', label: 'MILLION', sub: '11.6 days', value: 11.6, display: { decimals: 1 }, tone: 'good', at: 5.6 },
      { id: 'b', label: 'BILLION', sub: '11,574 days', value: 11574, tone: 'bad', at: 7.4 }] } },
    { id: 'ask', type: 'bubble', layer: 'screen', at: [560, 650], in: 10.4, out: 12.2, props: { l1: 'YOUR GUESS?', l2: 'COMMENT', size: 58, tail: 'left' } },
    { id: 'btn', type: 'follow', layer: 'screen', at: [650, 1120], in: 12.4, props: { press: 0.8 } },
  ],
  // ---- 2. BEATS: camera + storyteller choreography. One beat every 1.5-3 s. ----
  beats: [
    { at: 0,    beat: 'side-by-side',    focus: ['hook', 'num'], fill: 0.72, sx: 640, sy: 830, pose: 'talk' },   // frame 0 already shows the number
    { at: 1.0,  beat: 'zoom-on-number',  focus: 'num.value' },                                           // push in as the number is said
    { at: 3.2,  beat: 'presenter-front', focus: 'num' },                                                 // he steps in front and talks
    { at: 4.9,  beat: 'peek',            focus: 'chart', move: 'whip', sy: 860, maxH: 820 },             // whip to the chart; he goes behind it
    { at: 7.4,  beat: 'zoom-on-number',  focus: 'chart.b_top', fill: 0.8, st: 'corner-left', pose: 'shock' },
    { at: 9.0,  beat: 'pull-back',       focus: 'chart', st: 'corner-left' },
    { at: 10.2, beat: 'presenter-front', focus: 'chart', pose: 'you' },
    { at: 12.3, beat: 'wide',            st: { x: 250, y: 1330, s: 1.4 }, pose: 'follow' },
  ],
  poses: [[12.4, 'follow', { target: [600, 1120] }]],   // extra pose changes between beats
  shakes: [[2.4, 14], [8.1, 12]],                        // camera shake on the hits (time, px)
  captions: { emph: { '$1': 'good', billion: 'bad' } }, // spoken words to colour: good | bad | accent
  bed: { name: 'upbeat_bed_2', gain: -1 },
  sfx: [{ at: 0, name: 'deep_boom_2', gain: -5, dur: 0.36 }, { at: 1.0, name: 'money_counter_1', gain: -11, dur: 1.4 }, { at: 2.4, name: 'ding_2', gain: -8, dur: 0.7 }, { at: 7.4, name: 'riser_1', gain: -12, dur: 0.7 }, { at: 8.1, name: 'deep_boom_1', gain: -4, dur: 1.6 }, { at: 13.25, name: 'click_1', gain: -8, dur: 0.3 }],
});
