// DEMO v3: "The Wine Factory" cold open. 15.3 s, 1080x1920, 13 shots (avg 1.2 s). Narration audio only (Owen): nobody on screen makes a sound.
// Costumed cast (looks.js): CON = RED suit, RICH_A / RICH_B = GOLD + PURPLE top hats, AGENT = NAVY windbreaker with big yellow FBI, TELLER = the auctioneer. Every line is SHOWN literally:
//   "Collectors paid millions" -> a collector hands a cash bundle to the con (handover) · "bottled at home" -> pour, cork-press, label-slap, wax-dip · "rich people bid" -> gold paddles go up · "sold" -> gavel slam.
// Times are @words from words.json; captions show the SCRIPT text (voice/sentences.json). Each shot has a main action + 1-2 supporting moves (background cheer, props appearing, walk-ins).
BM2.story({
  duration: 15.3, theme: 'night',
  hud: { pill: 'DECODED', title: 'CASE 001 · THE WINE FACTORY', footnote: 'CARTOON RE-ENACTMENT · CHARACTERS ARE NOT LIKENESSES' },
  captions: { emph: { fraud: '#FF3B30', millions: '#FFD60A' } },
  look: { CON: 'CON', AGENT: 'AGENT', TELLER: 'TELLER', RICH_A: 'RICH', RICH_B: 'RICH_B' },
  shots: [
    // ---- SCENE 1 · auction hall: collectors PAY the con (cash changes hands), the con grins
    { id: '1.1', at: 0, set: 'auction', size: 'MS', observer: 'two', on: ['RICH_A', 'CON'], cam: { push: 0.02, zoomMoves: [{ at: 1.3, dur: 0.5, to: 1.35 }] }, el: 5, narration: 'Collectors paid millions for',
      props: [{ id: 'lot', kind: 'bottle', x: 400, lane: -3.3, y: 150, scale: 1.2 }, { id: 'cash2', kind: 'cashbundle', x: 330, lane: -0.6, y: 0, in: 1.0, scale: 1.4 }],
      cast: [{ who: 'RICH_A', at: [-150, 0], dir: 'right', face: 'F15' }, { who: 'CON', at: [130, 0], dir: 'left', face: 'F16' }, { who: 'RICH_B', at: [520, -2], dir: 'left', face: 'F20', bg: true }],
      actions: [{ at: 0.45, do: 'handover', from: 'RICH_A', to: 'CON', prop: 'cashbundle' }, { at: 0.2, who: 'RICH_B', do: 'cheer', dur: 1.8 }, { at: 1.0, who: 'CON', face: 'F20' }, { at: 1.4, who: 'RICH_B', do: 'give', prop: 'cashbundle', dur: 0.8 }] },
    // ---- SCENE 2 · kitchen: how the fraud is bottled at home (pour, cork, label, wax), then the agent walks in
    { id: '2.1', at: '@wine', set: 'kitchen', size: 'MS', cam: { push: 0.03 }, el: 6, narration: 'wine this fraud',
      props: [{ id: 'b1', kind: 'bottle', x: 190, lane: -1.3, y: 112 }, { id: 'b2', kind: 'bottle', x: 250, lane: -1.3, y: 112, in: 2.6 }, { id: 'cashk', kind: 'cashbundle', x: 520, lane: -1.2, y: 112, in: 2.35 }],
      cast: [{ who: 'CON', at: [330, -3], dir: 'camera', face: 'F16' }], actions: [{ at: '@wine+0.05', who: 'CON', do: 'pour', dur: 0.95 }, { at: '@bottled-0.3', who: 'CON', do: 'cork-press', dur: 0.8 }] },
    { id: '2.2', at: '@at', size: 'MS', cam: { zoomMoves: [{ at: 0, dur: 0.6, to: 1.2 }] }, narration: 'bottled at home.', cast: [{ who: 'CON' }], faces: [['@home', 'CON', 'F14']],
      actions: [{ at: '@home', who: 'CON', do: 'label-slap', dur: 0.8 }, { at: '@home+0.75', who: 'CON', do: 'wax-dip', dur: 0.9 }] },
    { id: '2.3', at: '@Wait', size: 'FS', observer: 'two', on: ['AGENT', 'CON'], move: 'whip', dir: 'right', cam: ['push-in'], narration: 'Wait,', cast: [{ who: 'CON' }, { who: 'AGENT', at: [-430, 0], dir: 'right', face: 'F09', walk: { to: -100, dur: 0.8 } }], faces: [['@Wait', 'CON', 'F12']], actions: [{ at: '@Wait-0.05', who: 'AGENT', do: 'stand', sfx: 'door-slam' }] },
    { id: '2.4', at: '@who', size: 'FS', observer: 'two', on: ['AGENT', 'CON'], cam: ['push-in'], rack: { from: 'AGENT', to: 'CON', at: '@His', dur: 0.25 }, dof: { blur: 8 }, narration: 'who is he? His', cast: [{ who: 'CON' }, { who: 'AGENT' }], faces: [['@who', 'AGENT', 'F18'], ['@His', 'CON', 'F03']], actions: [{ at: '@His', who: 'AGENT', do: 'point', target: 'CON', dur: 1.2 }] },
    { id: '2.5', at: '@Rudy', size: 'CU', observer: 'reaction', cam: ['creep'], narration: 'Rudy Kurniawan,', cast: [{ who: 'CON' }], faces: [['@Rudy', 'CON', 'F11']], fx: [{ type: 'impact', on: 'CON', sfx: 'deep_boom_1' }, { type: 'shake', amp: 14 }] },
    { id: '2.6', at: '@a', size: 'MS', observer: 'ots', over: 'AGENT', on: 'CON', cam: ['crash'], narration: 'a wine collector in', cast: [{ who: 'CON' }, { who: 'AGENT' }], faces: [['@a', 'CON', 'F13']] },
    { id: '2.7', at: 9.2, freeze: { label: 'THE CON', role: 'PLAYED BY A PAPER CUT-OUT' }, on: 'CON', narration: 'California.', cast: [{ who: 'CON' }] },
    // ---- SCENE 3 · auction (set reused): the gavel falls, rich people bid
    { id: '3.1', at: '@Rare', set: 'auction', size: 'FS', cam: { orbit: -10 }, el: [5, 14], transition: { type: 'whip', dur: 0.3, dir: 'left' }, narration: 'Rare old wine gets sold',
      props: [{ id: 'lot', kind: 'bottle', x: 400, lane: -3.3, y: 150, scale: 1.2 }],
      cast: [{ who: 'TELLER', at: [-110, -4.6], dir: 'camera', face: 'F03', pose: 'hold', hold: 'gavel' }, { who: 'RICH_A', at: [420, 0], dir: 'left', face: 'F09' }, { who: 'RICH_B', at: [900, 0], dir: 'left', face: 'F07', walk: { to: 650, dur: 1.0 } }] },
    { id: '3.2', at: '@sold', size: 'MS', observer: 'reaction', on: 'TELLER', cam: ['creep'], narration: 'sold at auctions,', cast: [{ who: 'TELLER' }], faces: [['@sold', 'TELLER', 'F13']], actions: [{ at: '@sold', who: 'TELLER', do: 'gavel', dur: 0.9 }, { at: '@auctions', who: 'RICH_A', do: 'cheer', dur: 0.9 }] },
    { id: '3.3', at: '@where', size: 'FS', observer: 'two', on: ['RICH_A', 'RICH_B'], cam: ['creep'], narration: 'where rich people', cast: [{ who: 'RICH_A', at: [-60, 0], dir: 'right', override: { propOpts: { color: '#F2B705', text: '12' } } }, { who: 'RICH_B', at: [250, 0], dir: 'left', override: { propOpts: { color: '#F5F3EE', text: '15' } } }], faces: [['@where', 'RICH_A', 'F09'], ['@rich', 'RICH_B', 'F07']],
      actions: [{ at: '@rich', who: 'RICH_A', do: 'raise-paddle', dur: 1.6 }, { at: '@people', who: 'RICH_B', do: 'raise-paddle', dur: 1.4 }] },
    { id: '3.4', at: '@bid', size: 'CU', observer: 'reaction', on: 'RICH_A', cam: ['creep'], rack: { from: 'RICH_A', to: 'RICH_B', at: '@other', dur: 0.25 }, dof: { blur: 8 }, narration: 'bid against each other', cast: [{ who: 'RICH_A' }, { who: 'RICH_B' }], faces: [['@bid', 'RICH_A', 'F05'], ['@each', 'RICH_B', 'F20']] },
    { id: '3.5', at: '@one', size: 'FS', cam: ['pull-back'], el: 6, narration: 'one bottle.', cast: [{ who: 'RICH_A' }, { who: 'RICH_B' }, { who: 'TELLER' }], faces: [['@one', 'RICH_B', 'F15']], actions: [{ at: '@one', who: 'RICH_A', do: 'cheer', dur: 1.0 }, { at: '@bottle', who: 'RICH_B', do: 'give', prop: 'cashbundle', dur: 0.8 }] },
  ],
});
