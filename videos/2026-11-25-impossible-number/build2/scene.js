BM2.scene({
  series: 'decoded', title: 'CASE FILE: THE IMPOSSIBLE NUMBER', duration: 30,
  footnote: ['DOCUMENTED CASES · SOURCES IN DESCRIPTION · NOT FINANCIAL ADVICE'],
  elements: [
    { id: 'hook', type: 'text', at: [0, -330], in: -1, props: { lines: ['APRIL 16, 1991'], size: 90 } },
    { id: 'rc', type: 'receipt', at: [0, 0], in: -1, props: { title: 'TRADE TICKET', rows: [{ id: 'q', k: 'BUY CALLS', v: '123', at: '@P01:123', tone: 'good' }, { id: 'u', k: 'STOCK', v: 'P&G', at: '@P01:Procter' }] } },
    { id: 'c', type: 'counter', at: [1700, 0], in: '@P02', props: { label: 'TRADED THAT DAY', to: 20, at: '@P02:20', tone: 'bad' } },
    { id: 'btn', type: 'follow', layer: 'screen', at: [1500, 700], in: '@P04', props: { press: 0.8 } },
  ],
  beats: [
    { at: 0, beat: 'side-by-side', focus: ['hook', 'rc'], pose: 'talk' },
    { at: '@P01:123', beat: 'zoom-on-number', focus: 'rc.q' },
    { at: '@P02', beat: 'side-by-side', focus: 'c', move: 'whip' },
    { at: '@P02:20', beat: 'zoom-on-number', focus: 'c.value' },
    { at: '@P03', beat: 'presenter-front', focus: 'c' },
    { at: '@P04', beat: 'peek', focus: 'c' },
    { at: '@P05', beat: 'wide', pose: 'follow' },
  ],
  captions: {},
});
