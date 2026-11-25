// SET SAMPLER: one wide shot per set / theme (night = Decoded, day = What If). Used to check the paper look: `bm2.cjs board brand/engine-v2/demo-sets`.
BM2.story({
  duration: 30, theme: 'night', captions: false,
  hud: { pill: 'DECODED', title: 'SET SAMPLER', footnote: '' },
  look: { A: 'CON', B: 'AGENT', C: 'TELLER' },
  shots: [
    { id: 'kitchen-n', at: 0, set: 'kitchen', size: 'WS', cam: ['creep'], el: 6, orbit: 10, cast: [{ who: 'A', at: [330, -3], dir: 'camera', face: 'F16' }, { who: 'B', at: [-200, 0], dir: 'right', face: 'F09' }] },
    { id: 'auction-n', at: 3, set: 'auction', size: 'WS', cam: ['creep'], el: 6, cast: [{ who: 'C', at: [-100, -4.6], dir: 'camera', face: 'F03' }, { who: 'B', at: [300, 0], dir: 'left', face: 'F15' }] },
    { id: 'court-n', at: 6, set: 'court', size: 'WS', cam: ['creep'], el: 6, cast: [{ who: 'C', at: [0, -5], dir: 'camera', face: 'F03' }, { who: 'A', at: [500, -3], dir: 'left', face: 'F09' }] },
    { id: 'street-n', at: 9, set: 'street', size: 'WS', cam: ['truck'], el: 4, cast: [{ who: 'A', at: [-120, 0], dir: 'right', face: 'F16' }, { who: 'B', at: [260, 0], dir: 'left', face: 'F09' }] },
    { id: 'desk-n', at: 12, set: 'desk', size: 'WS', cam: ['creep'], el: 6, cast: [{ who: 'B', at: [250, -2], dir: 'camera', face: 'F16' }] },
    { id: 'map-n', at: 15, set: 'map', size: 'TOP', cam: ['creep'], cast: [{ who: 'A', at: [-100, 0], dir: 'camera', face: 'F16' }] },
    { id: 'kitchen-d', at: 18, set: 'kitchen', theme: 'day', size: 'WS', cam: ['creep'], el: 6, cast: [{ who: 'A', at: [330, -3], dir: 'camera', face: 'F16' }, { who: 'B', at: [-200, 0], dir: 'right', face: 'F09' }] },
    { id: 'auction-d', at: 21, set: 'auction', theme: 'day', size: 'WS', cam: ['creep'], el: 6, cast: [{ who: 'C', at: [-100, -4.6], dir: 'camera', face: 'F03' }] },
    { id: 'street-d', at: 24, set: 'street', theme: 'day', size: 'WS', cam: ['truck'], el: 4, cast: [{ who: 'A', at: [-120, 0], dir: 'right', face: 'F16' }] },
    { id: 'court-d', at: 27, set: 'court', theme: 'day', size: 'WS', cam: ['creep'], el: 6, cast: [{ who: 'C', at: [0, -5], dir: 'camera', face: 'F03' }] },
  ],
});
