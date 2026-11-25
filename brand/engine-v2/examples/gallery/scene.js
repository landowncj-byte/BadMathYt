// Recipe gallery (Decoded theme): every chart recipe on one board. `bm2.cjs stills brand/engine-v2/examples/gallery 1,3,5,7,9,11,13`
BM2.scene({
  series: 'decoded', title: 'CASE: RECIPE GALLERY', duration: 16, captions: false,
  elements: [
    { id: 'pie', type: 'pie', at: [0, 0], in: 0.2, props: { slices: [{ value: 62, tone: 'bad', label: 'GONE', at: 0.4 }, { value: 23, tone: 'gold', label: 'FEES', at: 0.9 }, { value: 15, tone: 'good', label: 'RETURNED', at: 1.4 }], center: { to: 62, suffix: '%', at: 0.4, label: 'NEVER RECOVERED', tone: 'paper' } } },
    { id: 'tl', type: 'timeline', at: [1700, 0], in: 2.2, props: { items: [{ date: 'MAR 2017', label: 'THE PITCH', at: 2.5 }, { date: 'APR 2017', label: 'TICKETS SELL OUT', at: 3.0, tone: 'gold' }, { date: 'MAY 2017', label: 'NOTHING IS BUILT', at: 3.5 }, { date: 'OCT 2018', label: '6 YEARS', at: 4.0, tone: 'bad' }] } },
    { id: 'map', type: 'map', at: [3400, 0], in: 4.4, props: { title: 'WHERE THE MONEY WENT', nodes: [{ id: 'inv', x: 0.2, y: 0.25, label: 'INVESTORS', at: 4.6 }, { id: 'fund', x: 0.55, y: 0.5, label: 'THE FUND', sub: '$26M', at: 5.0, tone: 'gold', r: 34 }, { id: 'shell', x: 0.8, y: 0.2, label: 'SHELL CO.', at: 5.6, tone: 'bad' }, { id: 'jet', x: 0.3, y: 0.8, label: 'PRIVATE JETS', at: 6.0, tone: 'bad' }], links: [{ from: 'inv', to: 'fund', at: 5.0, tone: 'good' }, { from: 'fund', to: 'shell', at: 5.6, tone: 'bad' }, { from: 'fund', to: 'jet', at: 6.0, tone: 'bad' }] } },
    { id: 'race', type: 'barRace', at: [5100, 0], in: 6.6, props: { prefix: '$', suffix: 'B', decimals: 1, times: [6.8, 8.2, 9.6], items: [{ label: 'FUND A', tone: 'good', values: [4.0, 5.2, 6.1] }, { label: 'FUND B', tone: 'gold', values: [3.1, 6.4, 3.0] }, { label: 'THE CON', tone: 'bad', values: [1.2, 4.8, 17.5] }, { label: 'FUND C', tone: 'navy', values: [2.2, 2.9, 3.3] }] } },
    { id: 'cash', type: 'cashStack', at: [6800, 60], in: 10.0, props: { count: 24, at: 10.2, each: 100, label: 'PER VICTIM' } },
    { id: 'cnt', type: 'counter', at: [8500, -160], in: 11.8, props: { label: 'TOTAL TAKEN', to: 8000000000, prefix: '$', at: 12.0, dur: 1.6, size: 120, w: 900, sub: 'OF CUSTOMER MONEY' } },
    { id: 'note', type: 'card', at: [8500, 330], in: 12.4, enter: 'rise', props: { w: 700, h: 250, lines: [{ t: 'THE RETURNS WERE NOT HIGH.', size: 40, at: 12.5 }, { t: 'THEY WERE SMOOTH.', size: 56, font: 'hero', tone: 'bad', at: 13.2, mark: 'bad' }] } },
    { id: 'st', type: 'stamp', at: [8500, 600], rot: -0.08, in: 14.2, props: { text: 'EXHIBIT A' } },
  ],
  beats: [
    { at: 0, beat: 'graphic-hero', focus: 'pie', fill: 0.7 }, { at: 2.2, beat: 'side-by-side', focus: 'tl', move: 'whip', fill: 0.66 }, { at: 4.4, beat: 'peek', focus: 'map', move: 'whip', sy: 900, maxH: 820 },
    { at: 6.6, beat: 'graphic-hero', focus: 'race', move: 'whip' }, { at: 10.0, beat: 'over-shoulder', focus: 'cash', move: 'whip', fill: 0.5 }, { at: 11.8, beat: 'graphic-hero', focus: ['cnt', 'note'], move: 'whip', fill: 0.86 }, { at: 12.9, beat: 'zoom-on-number', focus: 'cnt.value', fill: 0.9 }, { at: 14.0, beat: 'pull-back', focus: ['cnt', 'note', 'st'] },
  ],
});
