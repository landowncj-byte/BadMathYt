// Bad Math story scene — STARTER (bible format: one shots[] entry per storyboard row). Full reference: brand/engine-v2/CHARACTERS.md
BM2.story({
  duration: 8, theme: 'night',                       // 'night' = Decoded, 'day' = What If
  hud: { pill: 'DECODED', title: 'CASE 000 · STARTER' },
  shots: [
    { id: '1.1', at: 0, set: 'kitchen', size: 'WS', cam: ['creep'], el: 6, cast: [{ who: 'CON', at: 'A', dir: 'right', face: 'F02' }] },
    { id: '1.2', at: 2.5, size: 'CU', observer: 'reaction', cast: [{ who: 'CON' }], faces: [[2.5, 'CON', 'F12']] },
    { id: '1.3', at: 4, size: 'MS', cam: ['push-in'], cast: [{ who: 'CON', walk: { to: 300, until: 7 } }], faces: [[4, 'CON', 'F16']] },
  ],
});
