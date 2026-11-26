// SET SAMPLER: one wide shot per set / theme (night = Decoded, day = What If). Used to check the paper look: `bm2.cjs board brand/engine-v2/demo-sets`.
BM2.story({
  duration: 42, theme: 'night', captions: false,
  hud: { pill: 'DECODED', title: 'SET SAMPLER', footnote: '' },
  look: { A: 'CON', B: 'RICH', C: 'AGENT', D: 'JUDGE' },
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
    // ---- literal action sampler (each ~1.4 s): pour, cork-press, label-slap, wax-dip, cash hand-over, paddle raise, handcuffs, gavel
    { id: 'act-pour', at: 30, set: 'kitchen', size: 'MS', cam: ['creep'], el: 6, cast: [{ who: 'A', at: [330, -3], dir: 'camera', face: 'F16' }], actions: [{ at: 30.1, who: 'A', do: 'pour', dur: 1.2 }] },
    { id: 'act-cork', at: 31.5, size: 'MS', cam: ['creep'], cast: [{ who: 'A' }], actions: [{ at: 31.55, who: 'A', do: 'cork-press', dur: 1.3 }] },
    { id: 'act-label', at: 33, size: 'MS', cam: ['creep'], cast: [{ who: 'A' }], actions: [{ at: 33.1, who: 'A', do: 'label-slap', dur: 1.0 }] },
    { id: 'act-wax', at: 34.5, size: 'MS', cam: ['creep'], cast: [{ who: 'A' }], actions: [{ at: 34.55, who: 'A', do: 'wax-dip', dur: 1.4 }] },
    { id: 'act-cash', at: 36, set: 'auction', size: 'FS', observer: 'two', on: ['B', 'A'], cam: ['creep'], el: 5, cast: [{ who: 'B', at: [-130, 0], dir: 'right', face: 'F15' }, { who: 'A', at: [130, 0], dir: 'left', face: 'F16' }], actions: [{ at: 36.2, do: 'handover', from: 'B', to: 'A' }] },
    { id: 'act-paddle', at: 37.5, size: 'MS', cam: ['creep'], cast: [{ who: 'B', at: [0, 0], dir: 'camera', face: 'F09', override: { propOpts: { color: '#F2B705', text: '12' } } }], actions: [{ at: 37.6, who: 'B', do: 'raise-paddle', dur: 1.3 }] },
    { id: 'act-cuffs', at: 39, set: 'kitchen', size: 'FS', observer: 'two', on: ['C', 'A'], cam: ['creep'], el: 5, cast: [{ who: 'C', at: [-120, 0], dir: 'right', face: 'F09' }, { who: 'A', at: [120, 0], dir: 'left', face: 'F12' }], actions: [{ at: 39.1, do: 'cuffs-on', from: 'C', to: 'A' }] },
    { id: 'act-gavel', at: 40.5, set: 'court', size: 'MS', cam: ['creep'], el: 5, cast: [{ who: 'D', at: [0, -4.5], dir: 'camera', face: 'F13' }], actions: [{ at: 40.6, who: 'D', do: 'gavel', dur: 0.9 }] },
  ],
});
