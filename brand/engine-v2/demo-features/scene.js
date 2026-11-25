// FEATURE TEST (not a deliverable): doorway camera travel, torch beam, aimed long shadow, camera match across a cut, rack focus, 45-degree orbit on a true-3D bottle, cell bars gobo.
BM2.story({
  duration: 12, theme: 'night', captions: false,
  shots: [
    // 0-3: camera travels THROUGH a doorway (explicit 3D path), kitchen beyond
    { id: 'A', at: 0, set: 'kitchen', size: 'WS', props: [{ id: 'b', kind: 'bottle', x: 300, lane: -1, y: 112 }, { id: 'tor', kind: 'torch', x: -120, lane: 0.5, scale: 1, sweep: 0.5 }],
      path: [{ at: 0, pos: [-1500, 260, 900], look: [-200, 200, -200], fov: 50 }, { at: 3, pos: [-150, 240, 500], look: [250, 220, -150], fov: 44 }],
      cast: [{ who: 'CON', look: 'CON', at: [330, -3], dir: 'left', face: 'F16' }] },
    // 3-6: 45-degree orbit around the 3D bottle (INS) with rack focus bottle -> CON
    { id: 'B', at: 3, size: 'INS', on: 'b', orbitMax: true, az: [-45, 45], dof: { blur: 12 }, rack: { from: 'b', to: 'CON', at: 5, dur: 0.4 }, cast: [{ who: 'CON' }] },
    // 6-9: aimed long shadow (lamp swings low) + torch
    { id: 'C', at: 6, size: 'MS', on: 'CON', lamp: { from: [-0.8, 0.9, 0.5], to: [-1.4, 0.18, 0.2] }, cast: [{ who: 'CON', face: 'F10' }] },
    // 9-12: camera-position match: same framing as shot C's final frame
    { id: 'D', at: 9, size: 'MS', match: 'C', cast: [{ who: 'CON', face: 'F12' }] },
  ],
});
