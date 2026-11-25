// DEMO: "The Wine Factory" cold open, silent acting in a 3D paper set. 15.2 s, 1080x1920. Narration audio only (Owen, from videos/2026-11-26-fake-wine/voice): nobody on screen makes a sound.
// Bible flat form: ONE shots[] ENTRY = ONE STORYBOARD ROW. Times are @words from words.json. Faces are bible IDs (F01-F26). Scenes are grouped automatically by `set`.
BM2.story({
  duration: 15.3, theme: 'night',
  hud: { pill: 'DECODED', title: 'CASE 001 · THE WINE FACTORY', footnote: 'CARTOON RE-ENACTMENT · CHARACTERS ARE NOT LIKENESSES' },
  captions: { emph: { fraud: '#FF3B30', millions: '#FFD60A' } },
  sfx: [{ at: 3.4, name: 'door_slam_1', gain: -8, dur: 0.6 }, { at: 10.1, name: 'gavel_1', gain: -6, dur: 0.5 }],
  look: { CON: 'CON', AGENT: 'AGENT', TELLER: 'TELLER', RICH_A: 'RICH', RICH_B: 'RICH' },
  shots: [
    // ---- SCENE 1 · kitchen at night: the con bottles wine at home; the agent walks in; six faces in reaction
    { id: '1.1', at: 0, set: 'kitchen', size: 'WS', cam: ['creep'], el: 7, orbit: 16, props: [{ id: 'bottle1', kind: 'bottle', x: 235, lane: -1.2, y: 112 }, { id: 'jug', kind: 'jug', x: 395, lane: -1.2, y: 112 }], narration: 'Collectors paid millions for wine this fraud bottled at home.',
      cast: [{ who: 'CON', override: { outfit: 'apron' }, at: [330, -3], dir: 'camera', face: 'F16', pose: 'hold', hold: 'bottle' }] },
    { id: '1.2', at: '@home', size: 'CU', observer: 'reaction', narration: 'home.', cast: [{ who: 'CON', pose: 'hold', hold: 'bottle' }, { who: 'AGENT', at: [-760, 0], dir: 'right', face: 'F09', walk: { to: -170, until: '@His' } }], faces: [['@home', 'CON', 'F12']] },
    { id: '1.3', at: '@Wait', size: 'WS', move: 'whip', dir: 'right', cam: ['truck'], narration: 'Wait, who is he?', cast: [{ who: 'CON' }, { who: 'AGENT' }], faces: [[4.6, 'CON', 'F10']] },
    { id: '1.4', at: '@His', size: 'MS', observer: 'two', shotKind: 'two', on: ['AGENT', 'CON'], cam: ['push-in'], rack: { from: 'AGENT', to: 'CON', at: '@kernioan', dur: 0.3 }, dof: { blur: 9 }, narration: 'His name is Rudy Kernioan,', cast: [{ who: 'CON' }, { who: 'AGENT' }], faces: [['@His', 'CON', 'F03'], ['@kernioan', 'CON', 'F11'], ['@His', 'AGENT', 'F18']] },
    { id: '1.5', at: '@a', size: 'CU', observer: 'reaction', cam: { punch: 0.1 }, narration: 'a wine collector', cast: [{ who: 'CON' }], faces: [['@a', 'CON', 'F14']], fx: [{ type: 'impact', on: 'CON', sfx: 'deep_boom_1' }, { type: 'shake', amp: 16 }] },
    { id: '1.6', at: 8.6, size: 'MS', observer: 'ots', over: 'AGENT', on: 'CON', cam: ['crash'], narration: 'wine collector in', cast: [{ who: 'CON' }, { who: 'AGENT' }], faces: [[8.6, 'CON', 'F13']] },
    { id: '1.7', at: 9.2, freeze: { label: 'THE CON', role: 'PLAYED BY A PAPER CUT-OUT' }, on: 'CON', narration: 'in California.', cast: [{ who: 'CON' }] },
    // ---- SCENE 2 · auction (set change = whip transition): rich people bid
    { id: '2.1', at: '@Rare', set: 'auction', size: 'WS', cam: { orbit: -14 }, el: [5, 18], transition: { type: 'whip', dur: 0.36, dir: 'left' }, narration: 'Rare old wine gets sold at auctions,',
      cast: [{ who: 'TELLER', at: [-110, -4.6], dir: 'camera', face: 'F03', pose: 'hold', hold: 'gavel' }, { who: 'RICH_A', at: [420, 0], dir: 'left', face: 'F09', pose: 'raise-paddle', hold: 'paddle' }], faces: [['@sold', 'RICH_A', 'F15']] },
    { id: '2.2', at: '@where', size: 'MS', observer: 'overcrowd', on: 'RICH_A', cam: ['creep'], narration: 'where rich people bid', cast: [{ who: 'RICH_A' }, { who: 'RICH_B', at: [1000, 0], dir: 'left', face: 'F07', walk: { to: 640, until: '@against' }, pose: 'raise-paddle', hold: 'paddle' }] },
    { id: '2.3', at: '@each', size: 'CU', observer: 'reaction', narration: 'each other', cast: [{ who: 'RICH_A' }], faces: [['@each', 'RICH_A', 'F05']] },
    { id: '2.4', at: '@one', size: 'WS', cam: ['pull-back'], el: 6, narration: 'for one bottle.', cast: [{ who: 'RICH_A' }, { who: 'RICH_B' }], faces: [['@one', 'RICH_B', 'F20']] },
  ],
});
