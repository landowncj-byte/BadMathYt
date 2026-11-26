(function () {
// DECODED · CASE Nº 001 · THE WINE FACTORY — animated PILOT, YouTube cut (86.4 s). Built from STORYBOARD.md v3: one storyboard row = one shots[] entry (ids 1.1 … 15.2).
// Narration = voice/narration.wav (Owen, final take, unchanged). Every cut and action is keyed to @word refs from voice/words.json (numbers only where a gap has no word or a word repeats).
// Assembled from src/*.js by build.sh -> scene.js. Assets: brand/engine-v2/assets-decoded.js (live props, costumes, gestures, sets, overlays).
const T = BM2.makeT(BM2_VOICE.words, BM2_VOICE.paragraphs), SFX = [];
const fx = (at, name, gain, dur) => SFX.push({ at, name, ...(gain != null ? { gain } : {}), ...(dur != null ? { dur } : {}) });
const INK = '#0B0F14', PAPER = '#F5F3EE', RED = '#B8221A', REDHI = '#FF3B30', GOLD = '#F2B705', PURPLE = '#5A3FA0', GREEN = '#2F7A3E', NAVY = '#16264A', GREY = '#8A8F98';
// ---- set skins (palette per set; colour code: purple-gold = the money world, oxblood = his lie, green = the truth, navy = the law)
const AUC = { A: '#40546f', B: '#4B2A7A', C: '#F2B705', D: '#6B4AB8', E: '#3A2A63', F: '#1b1030', dado: '#37205c', pil: '#5A3FA0', curt: '#2c1550', cloth: '#6B4AB8', sign: 'AUCTION' };
const AUC_NY = { ...AUC, sign: 'NEW YORK · AUCTION' };
const KIT = { A: '#7a2420', B: '#5a1c1a', C: '#C9A66B', D: '#6b2a24', E: '#4a2a2a', G: '#EFE3C8', dado: '#4a1815' };
const COURT = { A: '#1d3566', C: '#C9A66B', D: '#2a4a8a', E: '#26324a', dado: '#16264A', pil: '#2a4a8a' };
const WALL = { A: '#4a2e22', E: '#3a2a2a' };
const AUCTION = { kind: 'auction', palette: AUC }, KITCHEN = { kind: 'kitchen', palette: KIT };
// ---- prop helpers (x, lane, y = base height; `in`/`out` = seconds)
const prop = (id, kind, x, lane, o = {}) => ({ id, kind, x, lane, ...o });
const band = (id, x, lane, y, inT, o = {}) => prop(id, 'cashbundle', x, lane, { y, scale: 1.5, in: inT, ...o });
const live = (id, x, lane, y, w, h, paint, o = {}) => prop(id, 'live', x, lane, { y, w, h, paint, scale: 1, ...o });
const away = [-3000, 0];
const card = (at, text, color, x, y, o = {}) => ({ kind: 'card', at, text, color, x, y, dur: o.dur ?? 1.0, ...o });
const strip = (at, text, o = {}) => ({ kind: 'strip', at, text, dur: o.dur ?? 2.5, ...o });
const SPEC = {
  duration: 86.4, theme: 'night', sfx: SFX,
  hud: { pill: 'DECODED', title: 'CASE 001 · THE WINE FACTORY', footnote: 'CONVICTED 2013 · 10 YEARS · $28.4M BACK · CARTOON RE-ENACTMENT · CHARACTERS ARE NOT LIKENESSES' },
  captions: { emph: { fraud: '#FF3B30', millions: '#FFD60A', million: '#FFD60A', fakes: '#FF3B30', guilty: '#FF3B30' } },
  look: { CON: 'CON', AGENT: 'AGENT', AGENT2: 'AGENT_B', TELLER: 'TELLER', RICH_A: 'RICH', RICH_B: 'RICH_B', RICH_C: 'RICH_C', HOST: 'HOST', YOU: 'YOU', PAL: 'PAL', WINE: 'WINEMAKER', FAM1: 'WINEMAKER_T', FAM2: 'WINEMAKER_S', PROS: 'PROSECUTOR', JUDGE: 'JUDGE', BILL: 'BILLIONAIRE',
    J1: 'JUROR', J2: 'JUROR', J3: 'JUROR', J4: 'JUROR', J5: 'JUROR', J6: 'JUROR', X1: 'CROWD', X2: 'CROWD', X3: 'CROWD' },
  shots: [
    // =================================================================== SCENE 1 · COLD OPEN (0.00-4.46) · auction -> kitchen
    { id: '1.1', at: 0, set: AUCTION, size: 'FS', on: 'RICH_A', w: 690, oy: 10, cam: ['creep'], el: 5, narration: 'Collectors paid millions',
      props: [prop('counter', 'table', 40, 0.9, { w: 780, color: '#7B4DB8', keep: true }), band('b1', 330, 0.9, 118, 0), band('b2', 230, 0.9, 118, 0.55), band('b3', 130, 0.9, 118, 0.85), prop('lotb', 'bottle', 430, -3.3, { y: 150, scale: 1.2 })],
      cast: [{ who: 'TELLER', at: [-30, -1.3], dir: 'right', face: 'F09' }, { who: 'RICH_C', at: [120, -1.1], dir: 'left', face: 'F04' }, { who: 'RICH_A', at: [235, -1.5], dir: 'left', face: 'F05' }, { who: 'RICH_B', at: [345, -1.1], dir: 'left', face: 'F04' }, { who: 'CON', at: [-300, -1.5], dir: 'right', face: 'F16' }],
      actions: [{ at: 0, who: 'RICH_B', do: 'give', prop: 'cashbundle', dur: 0.6 }, { at: 0.35, who: 'RICH_A', do: 'give', prop: 'cashbundle', dur: 0.6 }, { at: 0.65, who: 'RICH_C', do: 'give', prop: 'cashbundle', dur: 0.6 },
        { at: 0.07, do: 'prop', id: 'b1', jolt: true }, { at: 0.57, do: 'prop', id: 'b2', jolt: true }, { at: 0.87, do: 'prop', id: 'b3', jolt: true },
        { at: 0.4, do: 'prop', id: 'b1', to: [-110, 0.9], dur: 0.5 }, { at: 0.8, do: 'prop', id: 'b2', to: [-70, 0.9], dur: 0.4 }, { at: 1.0, do: 'prop', id: 'b3', to: [-30, 0.9], dur: 0.3 },
        { at: 1.1, who: 'TELLER', do: 'reach' }, { at: 1.15, do: 'prop', id: 'b1', to: [-250, 0.9], dur: 0.25 }, { at: 1.2, do: 'prop', id: 'b2', to: [-250, 0.9], dur: 0.25 }, { at: 1.25, do: 'prop', id: 'b3', to: [-250, 0.9], dur: 0.25 },
        { at: 1.1, who: 'TELLER', face: 'F03' }], overlays: [card(0.12, 'RICH COLLECTORS', GOLD, 620, 520, { dur: 0.9 })] },
    { id: '1.2', at: '@for', size: 'MS', observer: 'two', on: ['TELLER', 'RICH_A'], cam: ['creep'], narration: 'for wine',
      props: [prop('bot', 'bottle', 60, 0.3, { y: 150, scale: 1.2, in: 1.55, out: 1.93 })],
      cast: [{ who: 'TELLER', pose: 'present', hold: 'bottlerare' }],
      faces: [['@wine', 'RICH_A', 'F04'], ['@wine', 'RICH_C', 'F15']],
      actions: [{ at: '@for', who: 'TELLER', do: 'present', prop: 'bottlerare', dur: 0.13 }, { at: 1.55, do: 'prop', id: 'bot', to: [190, 0.3], dur: 0.35, arc: 40 }, { at: 1.7, who: 'RICH_C', do: 'reach' }, { at: 1.7, who: 'RICH_B', do: 'reach' }, { at: 1.9, who: 'RICH_A', do: 'hug', prop: 'bottlerare', dur: 1.0 }] },
    { id: '1.3', at: '@this', size: 'CU', on: 'CON', move: 'whip', dir: 'left', cam: ['creep'], narration: 'this fraud',
      cast: [{ who: 'CON', face: 'F02', pose: 'rub', pose_at: 0.2 }], overlays: [card(2.36, 'THE FRAUD', REDHI, 540, 360, { dur: 0.6, arrow: 'down' })] },
    { id: '1.4', at: '@bottled', set: KITCHEN, size: 'MS', el: 6, cam: ['creep'], narration: 'bottled at',
      props: [prop('fridge', 'fridge', 80, -5.8, { scale: 1.1 , keep: true }), prop('hsh', 'homesweet', 560, -8, { y: 250, scale: 1.5, anim: 'sway' , keep: true }), prop('kb1', 'bottle', 190, -1.3, { y: 112 , keep: true }), prop('kj', 'jug', 480, -1.3, { y: 112, scale: 0.7 , keep: true })],
      cast: [{ who: 'CON', at: [330, -3], dir: 'camera', face: 'F16' }, { who: 'TELLER', at: away }, { who: 'RICH_A', at: away }, { who: 'RICH_B', at: away }, { who: 'RICH_C', at: away }],
      actions: [{ at: '@bottled', who: 'CON', do: 'pour', dur: 0.68 }] },
    { id: '1.5', at: '@home', size: 'CU', on: 'CON', cam: ['creep'], narration: 'home.', faces: [['@home', 'CON', 'F02']], actions: [{ at: '@home', who: 'CON', do: 'cork-press', dur: 0.4 }, { at: '@home', do: 'prop', id: 'hsh', jolt: true }] },
    { id: '1.6', at: 3.78, size: 'CU', on: 'CON', cam: ['creep'], narration: '(label slap)', faces: [[3.78, 'CON', 'F12']], actions: [{ at: 3.78, who: 'CON', do: 'label-slap', dur: 0.2 }] },
    { id: '1.6f', at: 3.96, freeze: { label: 'CASE Nº 001', role: 'THE WINE FACTORY' }, on: 'CON', narration: '(freeze: case file)' },
    // =================================================================== SCENE 2 · WHO IS HE (4.46-10.10) · desk -> winewall -> map
    { id: '2.1', at: '@Wait', set: { kind: 'desk' }, size: 'CU', observer: 'reaction', on: 'HOST', cam: ['creep'], narration: 'Wait, who is he?',
      props: [prop('q1', 'qchip', 105, 0, { y: 330, scale: 1.3, in: '@who' })],
      cast: [{ who: 'HOST', at: [0, 0], dir: 'camera', face: 'F08' }, { who: 'CON', at: away }, { who: 'TELLER', at: away }],
      faces: [['@who', 'HOST', 'F23'], ['@he', 'HOST', 'F01']], actions: [{ at: '@Wait', who: 'HOST', do: 'showtap' }], overlays: [card('@Wait+0.1', 'YOUR HOST', GOLD, 540, 420, { dur: 0.9 })] },
    { id: '2.2', at: '@His', size: 'MS', on: 'CON', ox: -320, pan: { to: 'CON', dur: 0.66 }, narration: 'His name is Rudy Kurniawan,',
      props: [prop('ev', 'photo', 380, -6.2, { y: 300, scale: 1.25, img: 'rudy' }), live('str', 520, -4.4, 360, 340, 160, 'fn', { fn: (g, lt, w, h, t) => { g.strokeStyle = INK; g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); g.moveTo(8, 130); g.quadraticCurveTo(w * 0.5, 170, w - 30, 40); g.stroke(); g.strokeStyle = REDHI; g.lineWidth = 5; g.stroke(); g.beginPath(); g.arc(8, 130, 9, 0, 6.3); g.fillStyle = REDHI; g.fill(); } })],
      cast: [{ who: 'CON', at: [640, -3], dir: 'camera', face: 'F02' }, { who: 'HOST', at: away }], actions: [{ at: '@Rudy-0.1', who: 'CON', do: 'tug' }],
      overlays: [card('@Rudy', 'RUDY KURNIAWAN', REDHI, 540, 360, { sub: 'THE CON', dur: 1.2, arrow: 'down' })] },
    { id: '2.3', at: '@a', set: { kind: 'winewall', palette: WALL }, size: 'MS', on: 'CON', cam: ['creep'], narration: 'a wine collector',
      props: [prop('slotb', 'bottle', 120, -7.2, { y: 430, scale: 1.7, in: 8.2 }), live('chip', -150, -7.2, 330, 230, 100, 'plate', { bg: INK, ink: GOLD, border: GOLD, head: 'BOTTLES', headBg: GOLD, headInk: INK, txt: [[0, '1,204'], [8.4, '1,205']], scale: 1.1 })],
      cast: [{ who: 'CON', at: [20, -2], dir: 'right', face: 'F24' }], actions: [{ at: '@a', who: 'CON', do: 'reach', prop: 'bottlerare' }, { at: 8.25, who: 'CON', do: 'rub' }, { at: 8.2, do: 'prop', id: 'slotb', jolt: true }] },
    { id: '2.4', at: '@in', set: { kind: 'map' }, size: 'TOP', on: 'hse', w: 1100, el: 86, narration: 'in California.',
      props: [prop('pin1', 'pin', -330, -2.8, { scale: 1.6, in: '@California' }), prop('hse', 'redhouse', -250, -2.2, { scale: 1.5, in: '@California+0.12' }), prop('cal', 'sign', -470, -0.8, { scale: 1.1, in: '@California+0.25', text: 'CALIFORNIA', w: 300 })],
      cast: [{ who: 'CON', at: away }], cam: { zoomMoves: [{ at: 0, dur: 0.7, to: 1.15 }] } },
    { id: '2.5', at: 9.28, set: { kind: 'winewall', palette: WALL }, scene: 'S2b', size: 'CU', observer: 'reaction', on: 'CON', cam: ['creep'], narration: '(sniffs wine)',
      props: [prop('palm', 'palm', 440, -6, { scale: 1.2, anim: 'sway' })], cast: [{ who: 'CON', at: [130, -2], dir: 'camera', face: 'F24' }], faces: [[9.75, 'CON', 'F02']], actions: [{ at: 9.3, who: 'CON', do: 'swirl' }] },
    // =================================================================== SCENE 3 · WHAT AN AUCTION IS (10.10-15.18) · auction (purple + gold)
    { id: '3.1', at: '@Rare', set: AUCTION, scene: 'A3', size: 'INS', on: 'lotb', w: 360, oy: -170, az: [-12, 14], orbitMax: true, narration: 'Rare old wine',
      props: [prop('lotb', 'bottle', 400, -3.3, { y: 162, scale: 1.5, color: '#5b4a33', label: '#E9D79B', ink2: '#7a4a2a' }), prop('web', 'cobweb', 405, -3.0, { y: 320, scale: 1.4, anim: 'sway' }), prop('rstar', 'rarestar', 440, -3.0, { y: 255, scale: 1.2, anim: 'sway', in: '@Rare+0.15' }), live('dust', 400, -2.6, 300, 220, 160, 'puff', { from: 10.35, dur: 0.7, n: 9 })],
      cast: [{ who: 'TELLER', at: [330, -2.2], dir: 'left', face: 'F09' }, { who: 'RICH_A', at: away }, { who: 'RICH_B', at: away }, { who: 'RICH_C', at: away }, { who: 'CON', at: away }], actions: [{ at: 10.28, who: 'TELLER', do: 'lean-in', dur: 0.4 }], overlays: [] },
    { id: '3.2', at: '@gets', size: 'WS', on: 'TELLER', el: [18, 5], cam: ['creep'], narration: 'gets sold at auctions,',
      props: [prop('sold', 'lotcard', -100, -4.9, { y: 330, scale: 1.8, in: '@sold', text: 'SOLD', bg: GOLD })],
      cast: [{ who: 'TELLER', at: [-100, -5.6], dir: 'camera', face: 'F03' }, { who: 'RICH_A', at: [250, -1], dir: 'camera', face: 'F04' }, { who: 'RICH_B', at: [420, -1.4], dir: 'camera', face: 'F04' }, { who: 'RICH_C', at: [-330, -1], dir: 'camera', face: 'F04' }],
      actions: [{ at: '@sold-0.44', who: 'TELLER', do: 'gavel', dur: 0.9 }, { at: '@sold', who: 'RICH_A', do: 'bounce', dur: 1.0 }, { at: '@sold', who: 'RICH_B', do: 'cheer', dur: 0.9 }, { at: '@sold', who: 'RICH_C', do: 'nod', dur: 0.9 }], overlays: [card('@gets+0.1', 'AUCTIONEER', GREY, 380, 760, { dur: 0.9 })] },
    { id: '3.3', at: '@where', size: 'MS', on: 'RICH_A', cam: { push: 0.03, pan: { by: [60, 0], dur: 0.78 } }, narration: 'where rich people',
      props: [prop('cn', 'coins', 130, -0.6, { y: 0, scale: 1.2, in: '@rich' }), prop('cn2', 'coins', 150, -0.6, { y: 12, scale: 1.0, in: '@rich+0.12' })],
      cast: [{ who: 'RICH_C', at: [-120, -1], dir: 'camera', face: 'F24' }, { who: 'RICH_A', at: [10, -1], dir: 'camera', face: 'F02' }, { who: 'RICH_B', at: [140, -1], dir: 'camera', face: 'F25' }, { who: 'TELLER', at: away }],
      actions: [{ at: '@where', who: 'RICH_C', do: 'fan', dur: 0.9 }, { at: '@where', who: 'RICH_A', do: 'polish', dur: 0.9 }, { at: '@rich', who: 'RICH_B', do: 'rub', dur: 0.6 }] },
    { id: '3.4', at: '@bid', size: 'FS', observer: 'two', on: ['RICH_A', 'RICH_B'], cam: ['creep'], narration: 'bid against each other for',
      props: [prop('t1', 'coinstack', 20, -1, { n: 4, scale: 0.9, in: '@bid+0.1' }), prop('t2', 'coinstack', 20, -1, { n: 8, scale: 0.9, in: '@against+0.1' }), prop('t3', 'coinstack', 20, -1, { n: 13, scale: 0.9, in: '@each+0.1' })],
      cast: [{ who: 'RICH_A', at: [-90, -1], dir: 'right', face: 'F07', override: { propOpts: { color: GOLD, text: '12' } } }, { who: 'RICH_B', at: [130, -1], dir: 'left', face: 'F07', override: { propOpts: { color: PAPER, text: '47' } } }, { who: 'RICH_C', at: away }],
      faces: [['@each', 'RICH_A', 'F17'], ['@against', 'RICH_B', 'F17'], ['@other', 'RICH_B', 'F02']],
      actions: [{ at: '@bid', who: 'RICH_A', do: 'raise-paddle', dur: 0.5 }, { at: '@against', who: 'RICH_B', do: 'raise-paddle', dur: 0.5 }, { at: '@each', who: 'RICH_A', do: 'raise-paddle', dur: 0.6 }] },
    { id: '3.5', at: '@one', size: 'FS', on: 'bt', cam: { push: 0.12 }, narration: 'one bottle.',
      props: [prop('t4', 'coinstack', -70, -1.5, { n: 27, scale: 0.9 }), prop('bt', 'bottle', 70, -1.5, { y: 0, scale: 1.2 }), live('lcard', 70, -1.5, 215, 230, 80, 'plate', { bg: PAPER, border: GOLD, txt: [[0, 'ONE BOTTLE'], [14.34, 'SOLD']], scale: 1 })],
      cast: [{ who: 'RICH_A', at: [250, -1.5], dir: 'left', face: 'F15' }, { who: 'TELLER', at: [-260, -1.8], dir: 'right', face: 'F13' }, { who: 'RICH_B', at: away }, { who: 'RICH_C', at: away }],
      actions: [{ at: '@bottle-0.44', who: 'TELLER', do: 'gavel', dur: 0.9 }, { at: '@bottle', who: 'RICH_A', do: 'reach', dur: 1.0 }, { at: '@bottle+0.1', do: 'prop', id: 'bt', to: [150, -1.5], dur: 0.3 }] },
    // =================================================================== SCENE 4 · THE $35 MILLION (15.18-19.96) · auction
    { id: '4.1', at: '@In#2', size: 'MS', on: 'CON', cam: ['creep'], narration: 'In 2006,',
      props: [live('cal', 290, -3.3, 140, 230, 250, 'plate', { head: 'YEAR', headBg: RED, txt: [[0, '2003'], [15.42, '2004'], [15.62, '2005'], [15.82, '2006']], size: 90, scale: 1.2, always: true }), prop('cr1', 'redcrate', -300, -1.2, { scale: 1.1 }), prop('cr2', 'redcrate', -300, -1.2, { y: 120, scale: 1.1 })],
      cast: [{ who: 'CON', at: [-420, -1], dir: 'right', face: 'F02', walk: { to: -110, dur: 1.1 } }, { who: 'TELLER', at: away }, { who: 'RICH_A', at: away }, { who: 'RICH_B', at: away }],
      actions: [{ at: '@In#2', do: 'prop', id: 'cr1', to: [10, -1.2], dur: 1.1 }, { at: '@In#2', do: 'prop', id: 'cr2', to: [10, -1.2], dur: 1.1 }] },
    { id: '4.2', at: '@his#2', size: 'FS', on: 'CON', cam: { push: 0.04 }, el: [4, 12], narration: 'his collection sold for about',
      props: [prop('c1', 'redcrate', 70, -2.4, { scale: 1.2, tag: "RUDY'S COLLECTION" }), prop('c2', 'redcrate', 220, -2.4, { scale: 1.2, tag: false }), prop('c3', 'redcrate', 145, -2.4, { y: 130, scale: 1.2, tag: false }),
        prop('s1', 'soldsticker', 70, -2.2, { y: 40, scale: 1.2, in: '@sold#2' }), prop('s2', 'soldsticker', 220, -2.2, { y: 40, scale: 1.2, in: '@sold#2+0.14' }), prop('s3', 'soldsticker', 145, -2.2, { y: 160, scale: 1.2, in: '@sold#2+0.28' })],
      cast: [{ who: 'CON', at: [-110, -1.5], dir: 'right', face: 'F03' }, { who: 'RICH_A', at: [20, 0.2], dir: 'camera', face: 'F04' }, { who: 'RICH_B', at: [330, 0.2], dir: 'camera', face: 'F04' }, { who: 'TELLER', at: [-100, -5.6], dir: 'camera', face: 'F05' }],
      actions: [{ at: '@his#2', who: 'RICH_A', do: 'raise-paddle', dur: 0.8 }, { at: '@collection', who: 'RICH_B', do: 'raise-paddle', dur: 0.8 }, { at: '@sold#2-0.44', who: 'TELLER', do: 'gavel', dur: 0.9 }, { at: '@collection', who: 'CON', do: 'armsUp', dur: 1.0 }] },
    { id: '4.3', at: '@$35', size: 'INS', on: 'scr', w: 640, oy: -230, cam: ['push-in'], narration: '$35 million.',
      props: [live('scr', 80, -3, 270, 540, 190, 'plate', { bg: INK, ink: GOLD, border: GOLD, spin: { text: '≈ $35,000,000', pre: '≈ $', t0: 17.72, t1: 18.54 }, scale: 1.1, always: true }), band('m1', 520, -1.2, 120, '@$35'), band('m2', 600, -1.2, 120, '@$35+0.2'), band('m3', 680, -1.2, 120, '@$35+0.4')],
      cast: [{ who: 'CON', at: [80, -1.6], dir: 'camera', face: 'F05' }, { who: 'RICH_A', at: away }, { who: 'RICH_B', at: away }, { who: 'TELLER', at: away }],
      actions: [{ at: '@$35', do: 'prop', id: 'm1', to: [150, -1.2], dur: 0.7 }, { at: '@$35+0.2', do: 'prop', id: 'm2', to: [180, -1.2], dur: 0.7 }, { at: '@$35+0.4', do: 'prop', id: 'm3', to: [210, -1.2], dur: 0.7 }] },
    { id: '4.4', at: 19.06, size: 'MS', on: 'CON', cam: { zoomMoves: [{ at: 0, dur: 0.9, to: 0.85 }] }, narration: '(dollar signs)',
      props: [prop('pile', 'cashpile', 220, -1, { rows: 7, scale: 1.6, in: 19.06 })],
      cast: [{ who: 'CON', at: [20, -1.2], dir: 'camera', face: 'F15' }, { who: 'RICH_A', at: [-170, -3], dir: 'camera', face: 'F13' }, { who: 'RICH_B', at: [330, -3.4], dir: 'camera', face: 'F13' }], actions: [{ at: 19.1, who: 'CON', do: 'rub' }] },
    // =================================================================== SCENE 5 · THE COMPARISON + LIKE (19.96-26.60) · void
    { id: '5.1', at: '@That\'s', set: { kind: 'void' }, size: 'MS', on: 'YOU', cam: ['creep'], narration: "That's a thousand bucks a day",
      props: [prop('p1', 'cashpile', -230, -0.5, { rows: 5, scale: 1.2, out: '@1' }), prop('p2', 'cashpile', -230, -0.5, { rows: 4, scale: 1.2, in: '@1', out: '@bucks' }), prop('p3', 'cashpile', -230, -0.5, { rows: 3, scale: 1.2, in: '@bucks', out: '@day' }), prop('p4', 'cashpile', -230, -0.5, { rows: 2, scale: 1.2, in: '@day', out: '@for#4' }),
        live('dcal', 230, -0.5, 130, 230, 250, 'plate', { head: 'DAY', headBg: RED, txt: [[0, '0'], ['@1', 'DAY 1'], ['@bucks', 'DAY 2'], ['@day', 'DAY 3']], size: 70, scale: 1.1, always: true }),
        band('y1', -150, 0, 100, '@1', { text: '$1,000', scale: 1.4 }), band('y2', -150, 0, 100, '@bucks', { text: '$1,000', scale: 1.4 }), band('y3', -150, 0, 100, '@day', { text: '$1,000', scale: 1.4 })],
      cast: [{ who: 'YOU', at: [0, 0], dir: 'camera', face: 'F12', override: { propOpts: { text: '$1,000' } } }],
      faces: [['@bucks', 'YOU', 'F04']], actions: [{ at: '@1', do: 'prop', id: 'y1', to: [-20, 0], dur: 0.25, arc: 40 }, { at: '@bucks', do: 'prop', id: 'y2', to: [-20, 0], dur: 0.25, arc: 40 }, { at: '@day', do: 'prop', id: 'y3', to: [-20, 0], dur: 0.25, arc: 40 }, { at: '@1', who: 'YOU', do: 'hold', prop: 'cashbundle', dur: 1.5 }],
      overlays: [card('@That\'s+0.1', 'YOU', '#EFE3C8', 560, 470, { dur: 0.9, arrow: 'down' })] },
    { id: '5.2', at: '@for#4', size: 'MS', on: 'YOU', cam: ['creep'], narration: 'for ninety-five',
      props: [prop('p5', 'cashpile', -230, -0.5, { rows: 2, scale: 1.2, in: '@for#4', out: 21.9 }), prop('p6', 'cashpile', -230, -0.5, { rows: 1, scale: 1.2, in: 21.9 }),
        live('ycal', 230, -0.5, 130, 230, 250, 'plate', { head: 'YEAR', headBg: RED, count: { from: 1, to: 95, t0: 21.5, t1: 22.4, fmt: v => String(Math.round(v)) }, size: 100, scale: 1.1, always: true }),
        prop('bd1', 'beard', 0, 0.3, { y: 232, scale: 1.4, in: 21.6, len: 40 }), prop('bd2', 'beard', 0, 0.3, { y: 190, scale: 1.4, in: 21.95, len: 85 }), prop('bd3', 'beard', 0, 0.3, { y: 145, scale: 1.4, in: 22.25, len: 130 })],
      cast: [{ who: 'YOU' }], faces: [['@95', 'YOU', 'F25']], actions: [] },
    { id: '5.3', at: '@years', size: 'FS', on: 'YOU', cam: ['pull-back'], narration: 'years.',
      props: [prop('bd4', 'beard', 0, 0.3, { y: 8, scale: 1.4, in: '@years', len: 255 }), live('ycal2', 230, -0.5, 130, 230, 250, 'plate', { head: 'YEARS', headBg: RED, txt: '95', size: 110, scale: 1.1, in: '@years' }), prop('p7', 'cashbundle', -230, -0.5, { y: 0, scale: 1.4, in: '@years', out: 22.9 })],
      cast: [{ who: 'YOU', face: 'F09', pose: 'hold', hold: 'crook' }], actions: [{ at: '@years', do: 'prop', id: 'p7', to: [-120, -0.5], dur: 0.4, arc: 30 }],
      overlays: [strip('@years', 'OUR MATH: ≈ $35M ÷ $1,000 A DAY', { y: 290, dur: 1.2 })] },
    { id: '5.4', at: '@Hit', size: 'MS', on: 'YOU', cam: ['creep'], narration: 'Hit like if your fanciest bottle costs',
      props: [prop('hb', 'heartbtn', -150, 0.1, { y: 40, scale: 1.7, in: '@Hit', anim: 'bob' })],
      cast: [{ who: 'YOU', face: 'F24', pose: 'showtap', hold: 'screwbottle' }], actions: [{ at: '@like', do: 'prop', id: 'hb', jolt: true }, { at: '@Hit', who: 'YOU', do: 'showtap', prop: 'screwbottle', propScale: 1.5 }] },
    { id: '5.5', at: '@12', size: 'INS', on: 'pt', w: 380, oy: -190, cam: { push: 0.2 }, narration: 'twelve bucks.',
      props: [prop('sb', 'screwbottle', 0, -0.2, { scale: 1.9 }), prop('pt', 'pricetag', 50, 0.2, { y: 190, scale: 1.7, in: '@12', anim: 'sway' }), prop('hs', 'heartsticker', 120, 0.3, { y: 240, scale: 1.3, in: '@bucks' })],
      cast: [{ who: 'YOU', at: [-250, -1.5] }] },
    // =================================================================== SCENE 6 · THE WORLD RECORD (26.60-29.36) · auction
    { id: '6.1', at: '@One#2', set: AUCTION, scene: 'A6', size: 'MS', on: 'CON', cam: ['creep'], narration: 'One of his sales even',
      props: [prop('rc', 'redcrate', 130, -1.4, { scale: 1.5 }), prop('ss', 'soldsticker', 130, -1.2, { y: 60, scale: 1.4, in: '@sales' })],
      cast: [{ who: 'CON', at: [-40, -1.2], dir: 'right', face: 'F02' }, { who: 'TELLER', at: [-100, -5.6], dir: 'camera', face: 'F03' }, { who: 'RICH_A', at: [330, -0.8], dir: 'camera', face: 'F04' }],
      actions: [{ at: '@sales-0.44', who: 'TELLER', do: 'gavel', dur: 0.9 }, { at: '@sales', who: 'RICH_A', do: 'recoil', dur: 0.5 }] },
    { id: '6.2', at: '@set', size: 'MS', on: 'CON', cam: { push: 0.15 }, narration: 'set a world record.',
      props: [prop('ros', 'rosette', 130, -1.0, { y: 60, scale: 1.2, in: '@set' }), live('conf', 80, -1.2, 130, 560, 520, 'confetti', { from: 27.9, to: 29.4, scale: 1 })],
      cast: [{ who: 'CON', face: 'F05' }, { who: 'RICH_A', face: 'F04' }], faces: [[28.9, 'CON', 'F02']], actions: [{ at: '@world', who: 'CON', do: 'armsUp', dur: 0.8 }, { at: 28.9, who: 'CON', do: 'tug', dur: 0.5 }, { at: '@set', who: 'RICH_A', do: 'clap', dur: 1.4 }] },
  ],
};
// prop lifetimes: a prop lives for its own shot unless `keep: true` (set dressing) or it has explicit in / out
SPEC.shots.forEach((sh, i) => { const nx = SPEC.shots[i + 1]; for (const p of sh.props || []) { if (p.keep) continue; if (p.in === undefined) p.in = sh.at; if (p.out === undefined && nx) p.out = nx.at; } });
BM2.IMG = {}; const photosReady = Promise.all(Object.entries(window.PHOTOS || {}).map(([k, u]) => new Promise(r => { const i = new Image(); i.onload = () => { BM2.IMG[k] = i; r(); }; i.onerror = r; i.src = u; })));
window.ready = photosReady.then(() => { BM2.story(SPEC); return window.ready; });
})();
