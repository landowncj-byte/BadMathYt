// ===== Lottery Part 2 v3 — scene builder shared by the three cuts: LOT(W, V) -> BM2.scene spec =====
// W = word refs of this cut ('@word#n'), V = variant switches {open:'va'|'tx'|'chq', jack:true|false, name, duration, ...}
// Every spoken line has its own visual beat. Characters: THE AUSTRALIAN FUND (crew fund) x7, THE STATE OF VIRGINIA (official) x7, THE TEXAS GROUP (crew texas).
// Stations (world px, 1800 apart): row0 y=0: hook(0) intro(1800) jackpot(3600) rule(5400) bulk(7200) · row1 y=1800: legal(0) invest(1800) qticket(3600) paid(5400) fan(7200)
// row2 y=3600: salaries(0) house(1800) newrules(3600) yearcal(5400) texasgroup(7200) · row3 y=5400: combos(0) jackpot95(1800) sign(3600) final(5400)
window.LOT = function (W, V) {
  const SB = 'side-by-side', GH = 'graphic-hero', ZN = 'zoom-on-number', PF = 'presenter-front', PK = 'peek', PB = 'pull-back';
  const R = (ref, d) => (d == null ? ref : (typeof ref === 'number' ? ref + d : ref + (d >= 0 ? '+' : '') + d));
  const STL = { x: 120, y: 1410, s: 0.85 }, STR = { x: 940, y: 1410, s: 0.85 };
  const LOCPH = 'brand/photos/stock/lottery-tickets/1.jpg', BALLS = 'brand/photos/stock/lottery-balls/8.jpg';
  const sx = 1800, row = 1800;
  const hookProps = V.hook;
  const tx = V.open === 'tx';
  const els = [];
  const E = (...a) => els.push(...a);
  // ---------------------------------------------------------------- S0 hook (frame 0 and the loop)
  if (V.open === 'va') {
    E({ id: 'hook', type: 'hook', at: [0, -540], in: 0, out: R(W.hookOut, -0.1), props: hookProps },
      { id: 'cr0', type: 'crew', at: [0, -40], in: -3, props: { kind: 'fund', w: 440, h: 470, cheerAt: W.five, held: 'tickets', heldAt: W.tickets, tag: 'THE BUYERS' } },
      { id: 'mtn0', type: 'mountain', at: [0, 385], in: -4, props: { rows: 7, thumpAt: 0.04, heroAt: 99999, seed: 3 } },
      { id: 'hook2', type: 'hook', at: [0, -540], in: R(W.endAt, 0.05), props: hookProps },
      { id: 'cr0b', type: 'crew', at: [0, -40], in: R(W.endAt, -0.15), props: { kind: 'fund', w: 440, h: 470, cheerAt: R(W.endAt, 0.2), tag: 'THE BUYERS' } });
  } else if (tx) {
    E({ id: 'hook', type: 'hook', at: [0, -540], in: 0, out: R(W.hookOut, -0.1), props: hookProps },
      { id: 'cr0', type: 'crew', at: [-250, -60], in: -3, props: { kind: 'texas', w: 420, h: 450, cheerAt: W.won, held: 'tickets', heldAt: W.every0, tag: 'THE BUYERS' } },
      { id: 'jack0', type: 'counter', at: [250, 20], in: -3, props: { at: W.n95, dur: 1.0, to: 95000000, prefix: '$', label: 'TEXAS · 2023', sub: 'JACKPOT', tone: 'good', size: 112, w: 560 } },
      { id: 'mtn0', type: 'mountain', at: [0, 390], in: -4, props: { rows: 7, thumpAt: 0.04, heroAt: 99999, seed: 8 } },
      { id: 'hook2', type: 'hook', at: [0, -540], in: R(W.endAt, 0.05), props: hookProps },
      { id: 'cr0b', type: 'crew', at: [-250, -60], in: R(W.endAt, -0.15), props: { kind: 'texas', w: 420, h: 450, cheerAt: R(W.endAt, 0.2), tag: 'THE BUYERS' } });
  } else { // 'chq': Virginia has to pay
    E({ id: 'hook', type: 'hook', at: [0, -560], in: 0, out: R(W.hookOut, -0.1), props: hookProps },
      { id: 'chq0', type: 'cheque', at: [0, -110], in: -3, props: { at: W.n27, dur: 1.2, to: 27000000, rosetteAt: 99999, head: 'PRIZE CHEQUE', payee: 'A LOTTERY CREW', src: 'PER UPI · MAR 10, 1992' }, scale: 0.9 },
      { id: 'of0', type: 'official', at: [-245, 360], in: -3, props: { w: 400, h: 480, labelSize: 32, moods: [{ t: 0, m: 'stern' }], thought: '$27M?', thoughtAt: W.pay0, thoughtOut: R(W.hookOut, -0.2) } },
      { id: 'cr0', type: 'crew', at: [245, 360], in: -3, props: { kind: 'fund', w: 400, h: 480, cheerAt: W.n27, tag: 'THE CREW' } },
      { id: 'hook2', type: 'hook', at: [0, -560], in: R(W.endAt, 0.05), props: hookProps },
      { id: 'chq0b', type: 'cheque', at: [0, -110], in: R(W.endAt, -0.15), props: { at: R(W.endAt, 0.15), dur: 1.0, to: 27000000, head: 'PRIZE CHEQUE', payee: 'A LOTTERY CREW', src: 'PER UPI · MAR 10, 1992' }, scale: 0.9 },
      { id: 'of0b', type: 'official', at: [-245, 360], in: R(W.endAt, -0.15), props: { w: 400, h: 480, labelSize: 32, moods: [{ t: 0, m: 'think' }] } },
      { id: 'cr0b', type: 'crew', at: [245, 360], in: R(W.endAt, -0.15), props: { kind: 'fund', w: 400, h: 480, cheerAt: R(W.endAt, 0.2), tag: 'THE CREW' } });
  }
  // ---------------------------------------------------------------- S1 intro: THE FUND vs THE STATE (1992)
  E({ id: 'cr1', type: 'crew', at: [sx - 330, 60], in: R(W.s1, -0.3), props: { kind: 'fund', w: 480, h: 500, held: 'tickets', heldAt: W.every, stamps: [{ text: 'AUSTRALIA', at: W.fund, size: 40, x: 0, y: -150, rot: -0.1, tone: 'good' }], tag: 'THE BUYERS' } },
    { id: 'of1', type: 'official', at: [sx + 330, 60], in: W.vas, props: { w: 460, h: 520, labelSize: 34, moods: [{ t: 0, m: 'think' }] } },
    { id: 'vs', type: 'text', at: [sx, -330], in: R(W.tried, 0.05), props: { lines: V.vsLines || [[['TRIED TO BUY', 'gold']]], size: V.vsSize || 76 } },
    { id: 'every1', type: 'text', at: [sx, 450], in: W.every, props: { lines: V.everyLines || [[['EVERY TICKET', 'bad']]], size: 84 } },
    // ---------------------------------------------------------------- S2 jackpot
    { id: 'cr2', type: 'crew', at: [3600, -230], in: R(W.s2, -0.35), props: { kind: 'fund', w: 440, h: 470, cheerAt: W.worked, held: 'cheque', heldAt: W.jackpot, tag: 'THE WINNERS' } },
    { id: 'chq', type: 'cheque', at: [3600, 300], in: R(W.jackpot, -0.25), props: { at: R(W.jackpotN, 0), dur: 1.4, to: 27000000, rosetteAt: W.record, payee: 'AN AUSTRALIAN FUND' } },
    // ---------------------------------------------------------------- S3 the rule + licensed store
    { id: 'book', type: 'rulebook', at: [5240, 40], in: R(W.but, -0.4), props: { ulAt: W.licensed, lineAt: R(W.but, 0.5), newAt: 99999, stampAt: 99999 } },
    { id: 'store', type: 'photo', at: [5980, 330], in: R(W.licensed, -0.1), props: { src: LOCPH, w: 360, aspect: 1.0, fx: 0.5, fy: 0.5, tilt: 0.06, credit: 'PHOTO: LIBRARY OF CONGRESS · NO KNOWN RESTRICTIONS', name: 'LICENSED', role: 'A STORE · ILLUSTRATIVE', tape: true } },
    // ---------------------------------------------------------------- S4 printed in bulk
    { id: 'cr4', type: 'crew', at: [7200, -240], in: R(W.s4, -0.35), props: { kind: 'fund', w: 440, h: 460, cheerAt: 99999, held: 'tickets', heldAt: R(W.s4, 0.2), tag: 'THE BUYERS', moods: [] } },
    { id: 'bund', type: 'bundles', at: [7200, 330], in: R(W.s4, -0.3), props: { cols: 6, rows: 3, at: R(W.printed, -0.2), per: 0.07, w: 880, label: '' } },
    { id: 'bulkT', type: 'text', layer: 'screen', at: [540, 440], in: W.printed, out: R(W.s5, -0.15), props: { lines: [[['MILLIONS ', 'paper'], ['PRINTED', 'gold']]], size: 70 } },
    // ---------------------------------------------------------------- S5 legal?
    { id: 'of5', type: 'official', at: [0, row + 20], in: R(W.s5, -0.35), props: { w: 460, h: 540, moods: [{ t: 0, m: 'think' }, { t: R(W.legal, 0), m: 'worry' }], thought: '?', thoughtAt: R(W.s5, 0.3), thoughtOut: W.like } },
    { id: 'tk5', type: 'qticket', at: [0, row + 600], in: R(W.s5, 0.05), scale: 0.72, props: { qAt: R(W.legal, -0.1), tagAt: 99999, tags: [] } },
    { id: 'legalT', type: 'text', layer: 'screen', at: [540, 440], in: R(W.s5, 0.2), out: R(W.like, -0.1), props: { lines: V.legalLines || [[['WAS IT ', 'paper'], ['LEGAL?', 'gold']]], size: 92 } },
    // ---------------------------------------------------------------- S6 investigates + calendar
    { id: 'of6', type: 'official', at: [sx - 330, row + 40], in: R(W.s6, -0.35), props: { w: 440, h: 520, glassAt: R(W.s6, 0.1), glassDur: 1.6, moods: [{ t: 0, m: 'stern' }] } },
    { id: 'cal', type: 'datecal', at: [sx + 330, row + 30], scale: 0.78, in: R(W.weeks, -0.4), props: { tick1At: R(W.weeks, 0.3), tearAt: R(W.weeks, 0.9), tick2At: R(W.weeks, 1.6), provedAt: 99999 } },
    // ---------------------------------------------------------------- S7 can't prove it
    { id: 'tk7', type: 'qticket', at: [3600, row + 80], in: R(W.nobody, -0.45), props: { qAt: R(W.prove, -0.1), tagAt: R(W.prove, 0.2), stampAt: W.bought } },
    // ---------------------------------------------------------------- S8 no proof -> paid
    { id: 'of8', type: 'official', at: [5400 - 290, row + 70], in: R(W.s8, -0.4), props: { w: 440, h: 520, labelSize: 34, stampAt: W.paid, stampText: 'PAID', moods: [{ t: 0, m: 'stern' }, { t: R(W.paid, 0), m: 'smug' }] } },
    { id: 'cr8', type: 'crew', at: [5400 + 290, row + 110], in: R(W.s8, -0.3), props: { kind: 'fund', w: 400, h: 440, worryAt: R(W.s8, 0.3), cheerAt: R(W.paid, 0.2), tag: 'THE WINNERS' } },
    { id: 'npT', type: 'stamp', at: [5400, row - 330], rot: -0.05, in: R(W.s8, 0), out: R(W.paid, -0.1), props: { text: 'NO PROOF = NO BROKEN RULE', tone: 'accent', size: 44 } },
    // ---------------------------------------------------------------- S9 cheque fan
    { id: 'fan', type: 'chequefan', at: [7200, row + 30], in: R(W.s9, -0.5), props: { at: R(W.year, -0.05), per: 0.04, valAt: W.valAt || W.one, yearAt: W.year, nAt: W.twenty } },
    // ---------------------------------------------------------------- S10 twenty normal salaries
    { id: 'sal', type: 'salaries', at: [0, 2 * row + 40], in: R(W.sal, -0.5), props: { at: R(W.sal, 0.15), per: 0.07, totalAt: R(W.single, 0) } },
    // ---------------------------------------------------------------- S11 the house always wins
    { id: 'hse', type: V.send === 'one' ? 'oneticket' : 'house', at: [sx, 2 * row + 30], in: R(W.send, -0.45), props: { winsAt: W.wins, xAt: R(W.wins, 0.9) } },
    // ---------------------------------------------------------------- S12 the fix: new rules
    { id: 'of12', type: 'official', at: [3600 - 380, 2 * row + 90], in: R(W.then, -0.4), props: { w: 420, h: 500, labelSize: 32, penAt: R(W.rushed, 0.1), moods: [{ t: 0, m: 'stern' }, { t: W.problem, m: 'smug' }] } },
    { id: 'book2', type: 'rulebook', at: [3600 + 300, 2 * row + 20], scale: 0.8, in: R(W.then, -0.2), props: { ulAt: 99999, lineAt: 99999, newAt: W.bulk2, stampAt: R(W.bulk2, 0.3), dimAt: 99999 } },
    { id: 'solvT', type: 'text', layer: 'screen', at: [540, 440], in: W.problem, out: R(W.y31, -0.15), props: { lines: V.solvedLines || [[['SOLVED?', 'gold']]], size: V.solvedSize || 120 } },
    // ---------------------------------------------------------------- S14 31 years later
    { id: 'ycal', type: 'yearcal', at: [5400, 2 * row + 20], in: R(W.y31, -0.5), props: { flipAt: R(W.later, V.flipOff == null ? 0.15 : V.flipOff), labelAt: R(W.later, V.flipOff == null ? 0.0 : V.flipOff - 0.15), dur: V.flipDur || 0.8, yearsAt: R(W.y31, 0.05) } },
    // ---------------------------------------------------------------- S15 the Texas group + S16 combos
    { id: 'cr15', type: 'crew', at: [7200, 2 * row + 50], in: R(W.s15, -0.4), props: { kind: 'texas', w: 500, h: 520, held: 'tickets', heldAt: W.nearly, tag: 'A GROUP · TEXAS', stamps: [{ text: 'TEXAS 2023', at: R(W.s15, 0.2), size: 42, x: 0, y: -150, rot: -0.08, tone: 'bad' }] } },
    { id: 'cmb', type: 'combos', at: [0, 3 * row + 20], in: R(W.comb, -0.5), props: { at: R(W.comb, -0.1), dur: 1.7, w: 780, h: 660 } });
  // S17 $95M (skipped in the TikTok cut: it opened on it)
  if (V.jack !== false) E(
    { id: 'jmtn', type: 'mountain', at: [sx + 250, 3 * row + 380], scale: 0.62, in: R(W.n95, -0.6), props: { rows: 11, seed: 8, thumpAt: W.n95 } },
    { id: 'jack', type: 'counter', at: [sx, 3 * row - 140], in: R(W.n95, -0.55), out: R(W.commS, -0.05), props: { at: R(W.n95, -0.1), dur: 1.2, to: 95000000, prefix: '$', label: 'TEXAS · 2023', sub: 'JACKPOT · AGAIN', tone: 'good', size: 150, w: 900 } },
    { id: 'cr17', type: 'crew', at: [sx - 420, 3 * row + 390], in: R(W.n95, -0.3), out: R(W.commS, -0.05), props: { kind: 'texas', w: 380, h: 410, cheerAt: R(W.n95, 0.1), tag: 'THE WINNERS', labelSize: 34 } });
  E({ id: 'sign', type: 'sign', at: [3600, 3 * row - 110], in: R(W.commS, -0.1), props: { dropAt: W.shut, tagAt: R(W.commission, 0.1), fall: 210 } },
    // ---------------------------------------------------------------- S19 final question
    { id: 'of19', type: 'official', at: [5400, 3 * row + 20], in: R(W.q, -0.4), props: { w: 460, h: 540, moods: [{ t: 0, m: 'think' }, { t: W.pay, m: 'stern' }], thought: '?', thoughtAt: R(W.q, 0.3), thoughtOut: W.yes } },
    { id: 'tk19', type: 'qticket', at: [5400, 3 * row + 640], in: R(W.q, 0.05), scale: 0.6, props: { qAt: W.pay, tagAt: 99999, tags: [] } },
    // ---------------------------------------------------------------- screen micro-moments + HUD
    { id: 'heart', type: 'heart', layer: 'screen', at: [800, 930], in: R(W.like, -0.05), out: R(W.like, 1.15), props: { s: 1 } },
    { id: 'liket', type: 'text', layer: 'screen', at: [800, 1190], in: R(W.like, 0.15), out: R(W.like, 1.2), props: { lines: [[[V.likeText || 'LIKE', 'gold']]], size: 62 } },
    { id: 'plane', type: 'plane', layer: 'screen', at: [540, 960], in: R(W.send, -0.05), out: R(W.send, 1.2), props: { dur: 0.9, from: [-230, 250], to: [280, -330], s: 1.5 } },
    { id: 'sendtx', type: 'text', layer: 'screen', at: [800, 1190], in: R(W.send, 0.15), out: R(W.send, 1.2), props: { lines: [[['SEND', 'gold']]], size: 70 } },
    { id: 'btn', type: 'follow', layer: 'screen', at: [830, 1010], scale: 0.8, in: R(W.follow, -0.05), out: R(W.follow, 1.45), props: { press: 0.55 } },
    { id: 'ask', type: 'bubble', layer: 'screen', at: [600, 1090], in: R(W.q, 0.5), out: R(W.yes, 0.3), props: { l1: V.askL1 || 'SHOULD THE STATE PAY?', l2: V.askL2 || 'YES / NO', size: 46, tail: 'left' } },
    ...(V.extra || []),
    { id: 'hud', type: 'hud', layer: 'screen', at: [0, 0], in: -1, props: { labels: V.labels, items: V.items } });
  // ================================================================ beats
  const beats = [], bt = (at, o) => { if (at == null || at === 'undefined' || /undefined/.test(String(at))) return; beats.push({ at, ...o }); };
  const F0 = V.open === 'va' ? ['hook', 'cr0', 'mtn0'] : tx ? ['hook', 'cr0', 'jack0', 'mtn0'] : ['hook', 'chq0', 'of0', 'cr0'];
  const F0e = F0.map(x => x === 'hook' ? 'hook2' : x === 'chq0' ? 'chq0b' : x === 'of0' ? 'of0b' : x === 'cr0' ? 'cr0b' : x);
  beats.push({ at: 0, beat: SB, focus: F0, fill: 0.9, maxH: V.f0maxH || 900, sx: 540, sy: V.f0sy || 905, st: { x: 130, y: 1410, s: 0.85 }, pose: 'shock', keep: ['hook', 'hook2'] });
  if (V.open === 'va') bt(W.five, { beat: ZN, focus: 'hook.l1', fill: 0.95, maxH: 400, sy: 760, st: { x: 130, y: 1410, s: 0.85 }, dur: 0.45 });
  if (tx) bt(W.n95, { beat: ZN, focus: 'jack0', fill: 0.92, maxH: 500, sy: 780, st: { x: 130, y: 1410, s: 0.85 }, pose: 'shock', dur: 0.45 });
  if (V.open === 'chq') bt(W.n27, { beat: ZN, focus: 'chq0.amount', fill: 0.95, maxH: 400, sy: 760, st: { x: 130, y: 1410, s: 0.85 }, pose: 'shock', dur: 0.45 });
  bt(W.reframe, { beat: GH, focus: F0, fill: 0.9, maxH: V.f0maxH || 900, sx: 540, sy: V.f0sy || 905, st: STR, pose: 'point', dur: 0.7, keep: ['hook', 'hook2'] });
  // intro
  bt(R(W.s1, -0.25), { beat: GH, focus: V.s1both ? ['cr1', 'of1'] : 'cr1', move: 'whip', fill: V.s1both ? 0.9 : 0.62, maxH: 800, sy: 800, st: STR, pose: 'point' });
  bt(R(W.tried, -0.1), { beat: GH, focus: V.s1both ? ['cr1', 'of1', 'vs'] : ['cr1', 'vs'], fill: 0.74, maxH: 900, sy: 800, st: STR, pose: 'idle', dur: 0.7 });
  bt(W.every, { beat: ZN, focus: 'every1', fill: 0.86, maxH: 300, sy: 740, st: STL, pose: 'shock', dur: 0.45 });
  bt(V.vasBeat === false ? undefined : W.vas, { beat: GH, focus: ['cr1', 'of1', 'vs', 'every1'], fill: 0.97, maxH: 880, sy: 800, st: STR, pose: 'point', dur: 0.7 });
  // jackpot
  bt(R(W.s2, -0.2), { beat: GH, focus: ['cr2', 'chq'], move: 'whip', fill: 0.86, maxH: 950, sy: 770, st: STL, pose: 'shock' });
  bt(W.jackpotN, { beat: ZN, focus: 'chq.amount', fill: 0.92, sy: 760, st: STL, pose: 'shock', dur: 0.5 });
  bt(W.record, { beat: GH, focus: ['cr2', 'chq'], fill: 0.86, maxH: 950, sy: 770, st: STR, pose: 'point', dur: 0.7 });
  // rule + licensed store
  bt(R(W.but, -0.25), { beat: SB, focus: 'book', move: 'whip', sx: 640, sy: 830, fill: 0.7, maxH: 840, st: 'corner-left', pose: 'point' });
  bt(W.licensed, { beat: ZN, focus: 'book.rule', fill: 0.62, sy: 880, st: 'corner-left', dur: 0.5 });
  bt(W.store, { beat: GH, focus: ['book', 'store'], fill: 0.97, maxH: 880, sy: 800, st: STL, pose: 'point', dur: 0.7 });
  // printed in bulk
  bt(R(W.s4, -0.25), { beat: GH, focus: ['cr4', 'bund'], move: 'whip', fill: 0.9, maxH: 980, sy: 800, st: STL, pose: 'idle' });
  bt(W.printed, { beat: ZN, focus: 'bund.pile', fill: 0.9, maxH: 560, sy: 800, st: STL, pose: 'shock', dur: 0.5 });
  bt(W.bulk, { beat: GH, focus: ['cr4', 'bund'], fill: 0.9, maxH: 980, sy: 800, st: STR, pose: 'point', dur: 0.7 });
  // legal?
  bt(R(W.s5, -0.25), { beat: SB, focus: ['of5', 'tk5'], move: 'whip', fill: 0.62, maxH: 1000, sy: 850, st: STL, pose: 'chin' });
  bt(W.legal, { beat: ZN, focus: 'tk5', fill: 0.78, maxH: 420, sy: 1000, st: STL, pose: 'shock', dur: 0.45 });
  bt(W.like, { beat: PF, focus: 'of5', sy: 780, pose: 'you' });
  // investigates + calendar
  bt(R(W.s6, -0.25), { beat: GH, focus: 'of6', move: 'whip', fill: 0.6, maxH: 800, sy: 880, st: STR, pose: 'point' });
  bt(R(W.weeks, -0.55), { beat: GH, focus: ['of6', 'cal'], fill: 0.97, maxH: 720, sy: 880, st: STL, pose: 'point', dur: 0.7 });
  bt(W.weeks, { beat: ZN, focus: 'cal.date', fill: 0.7, sy: 900, st: STL, pose: 'shock', dur: 0.5 });
  bt(R(W.nobody, -0.2), { beat: GH, focus: 'tk7', move: 'whip', fill: 0.92, maxH: 760, sy: 800, st: STL, pose: 'chin' });
  bt(W.prove, { beat: ZN, focus: 'tk7.q', fill: 0.8, maxH: 420, sy: 780, st: STL, pose: 'shock', dur: 0.45 });
  bt(W.bought, { beat: GH, focus: 'tk7', fill: 0.92, maxH: 760, sy: 800, st: STR, pose: 'idle', dur: 0.7 });
  // paid
  bt(R(W.s8, -0.25), { beat: GH, focus: ['of8', 'cr8', 'npT'], move: 'whip', fill: 0.97, maxH: 720, sy: 800, st: STL, pose: 'idle' });
  bt(W.paid, { beat: ZN, focus: 'of8', fill: 0.8, maxH: 640, sy: 800, st: STR, pose: 'shock', dur: 0.4 });
  bt(W.paidTail, { beat: GH, focus: ['of8', 'cr8', 'npT'], fill: 0.97, maxH: 720, sy: 800, st: STL, pose: 'point', dur: 0.7 });
  // cheque fan
  bt(R(W.s9, -0.3), { beat: GH, focus: 'fan', move: 'whip', fill: 0.92, maxH: 980, sy: 790, st: STL, pose: 'idle' });
  bt(W.oneZN, { beat: ZN, focus: 'fan.value', fill: 0.84, sy: 740, st: STL, pose: 'shock', dur: 0.55 });
  bt(W.year, { beat: GH, focus: 'fan', fill: 0.9, maxH: 980, sy: 780, st: STL, pose: 'idle', dur: 0.7 });
  bt(W.years, { beat: GH, focus: 'fan', fill: 0.92, maxH: 980, sy: 780, st: STR, pose: 'point', dur: 0.8 });
  // salaries
  bt(R(W.sal, -0.25), { beat: SB, focus: 'sal', move: 'whip', sx: 600, sy: 790, fill: 0.84, maxH: 880, st: STL, pose: 'point' });
  bt(W.salaries, { beat: ZN, focus: 'sal.count', fill: 0.6, maxH: 400, sy: 780, st: STL, pose: 'shock', dur: 0.5 });
  bt(W.single, { beat: GH, focus: 'sal', fill: 0.86, maxH: 880, sx: 560, sy: 790, st: STR, pose: 'idle', dur: 0.7 });
  // send + house
  bt(R(W.send, -0.25), { beat: GH, focus: 'hse', move: 'whip', fill: 0.82, maxH: 900, sy: 800, st: STL, pose: 'you' });
  bt(W.wins, { beat: ZN, focus: 'hse.sign', fill: 0.5, maxH: 380, sy: 860, st: STL, pose: 'shock', dur: 0.4 });
  bt(R(W.wins, 0.6), { beat: GH, focus: 'hse', fill: 0.82, maxH: 900, sy: 800, st: STR, pose: 'shrug', dur: 0.7 });
  // new rules
  bt(R(W.then, -0.25), { beat: GH, focus: ['of12', 'book2'], move: 'whip', fill: 0.97, maxH: 760, sy: 800, st: STL, pose: 'point' });
  bt(W.bulk2, { beat: ZN, focus: 'book2', fill: 0.8, maxH: 640, sy: 800, st: STR, pose: 'shock', dur: 0.45 });
  bt(W.problem, { beat: PF, focus: 'book2', sy: 830, zoom: 0.85, pose: 'shrug' });
  // 31 years later
  bt(R(W.y31, -0.2), { beat: SB, focus: 'ycal', move: 'whip', sx: 640, sy: 830, fill: 0.7, maxH: 840, st: 'corner-left', pose: 'point' });
  bt(V.ycalZN === false ? undefined : R(W.later, 0.3), { beat: ZN, focus: 'ycal.year', fill: 0.72, maxH: 400, sy: 700, st: 'corner-left', pose: 'shock', dur: 0.5 });
  bt(R(W.follow, -0.1), { beat: GH, focus: V.followFocus || 'ycal', fill: 0.7, maxH: 840, sx: 520, sy: 830, st: 'corner-left', pose: 'idle', dur: 0.8 });
  // Texas group + combos
  bt(R(W.s15, -0.25), { beat: GH, focus: 'cr15', move: 'whip', fill: 0.7, maxH: 760, sy: 820, st: STL, pose: 'shock' });
  bt(W.comb, { beat: SB, focus: 'cmb', move: 'whip', sx: 560, sy: 800, fill: 0.92, maxH: 900, st: STL, pose: 'point' });
  bt(W.crZN, { beat: ZN, focus: 'cr15', fill: 0.86, maxH: 640, sy: 800, st: STL, pose: 'point', dur: 0.5 });
  bt(W.pctZ, { beat: ZN, focus: 'cmb.pct', fill: 0.6, maxH: 400, sy: 800, st: STL, pose: 'shock', dur: 0.5 });
  if (V.jack !== false) {
    bt(R(W.n95, -0.5), { beat: SB, focus: ['jack', 'jmtn', 'cr17'], move: 'whip', fill: 0.92, maxH: 1080, sy: 800, st: STR, pose: 'shock' });
    bt(W.n95, { beat: ZN, focus: 'jack', fill: 0.94, maxH: 520, sy: 780, st: STR, pose: 'shock', dur: 0.4, lead: 0.12 });
    bt(R(W.n95, 1.6), { beat: GH, focus: ['jack', 'jmtn', 'cr17'], fill: 0.92, maxH: 1080, sy: 800, st: STR, pose: 'shock', dur: 0.8 });
  }
  // sign + final
  bt(W.commS, { beat: SB, focus: ['sign'], move: 'whip', fill: 0.78, maxH: 1040, sy: 800, st: 'corner-left', pose: 'point', dur: 0.8 });
  bt(W.shut, { beat: ZN, focus: 'sign', fill: 0.86, maxH: 560, sy: 760, st: 'corner-left', pose: 'shock', dur: 0.45 });
  bt(W.commission, { beat: GH, focus: ['sign'], fill: 0.78, maxH: 1040, sy: 800, st: 'corner-left', pose: 'idle', dur: 0.8 });
  bt(R(W.q, -0.3), { beat: PF, focus: 'of19', move: 'whip', sy: 780, pose: 'talk' });
  bt(W.pay, { beat: GH, focus: ['of19', 'tk19'], fill: 0.62, maxH: 1000, sy: 850, st: STL, pose: 'point', dur: 0.6 });
  bt(W.yes, { beat: SB, focus: F0e, move: 'whip', fill: 0.9, maxH: V.f0maxH || 900, sx: 540, sy: V.f0sy || 905, st: { x: 130, y: 1410, s: 0.85 }, pose: 'shock', keep: ['hook', 'hook2'] });
  for (const b of beats) { if (b.beat === PF || b.beat === ZN || b.at === 0) continue; b.maxH = Math.min(b.maxH || 860, 860); const lo = 430 + b.maxH / 2, hi = 1330 - b.maxH / 2; b.sy = Math.min(hi, Math.max(lo, b.sy || 880)); }
  // ================================================================ sfx
  const S = [];
  const sx_ = (at, name, gain, dur) => { if (at == null || /undefined/.test(String(at))) return; S.push({ at, name, gain, dur }); };
  S.push({ at: 0, name: 'deep_boom_2', gain: -3, dur: 0.5 }, { at: 0.03, name: 'rubber_stamp_2', gain: -6, dur: 0.5 }, { at: 0.06, name: 'paper_slam_2', gain: -9, dur: 0.5 });
  sx_(W.five, 'pop_2', -9, 0.3); sx_(W.n27, 'money_counter_1', -11, 1.2); sx_(W.n95 && tx ? W.n95 : undefined, 'cinematic_hit_1', -5, 1.2);
  sx_(R(W.s1, -0.25), 'paper_slam_2', -10, 0.5); sx_(W.fund, 'rubber_stamp_2', -8, 0.5); sx_(W.every, 'pop_2', -9, 0.3); sx_(W.vas, 'thud_1', -10, 0.4);
  sx_(W.worked, 'success_chime_1', -11, 1.0); sx_(W.jackpotN, 'money_counter_1', -11, 1.5); sx_(R(W.jackpotN, 1.5), 'cash_register_1', -8, 0.9); sx_(W.record, 'rubber_stamp_2', -8, 0.5);
  sx_(R(W.but, -0.4), 'paper_slam_2', -10, 0.5); sx_(W.licensed, 'typewriter_1', -12, 0.7); sx_(W.store, 'pop_2', -9, 0.3);
  sx_(W.printed, 'swoosh_2', -10, 0.8); sx_(R(W.printed, 0.3), 'coins_drop_1', -13, 1.0);
  sx_(R(W.s5, -0.3), 'paper_slam_2', -10, 0.5); sx_(W.legal, 'pop_1', -9, 0.4); sx_(W.like, 'heartbeat_1', -8, 0.9);
  sx_(R(W.s6, -0.3), 'paper_slam_2', -10, 0.5); sx_(R(W.weeks, 0.3), 'click_1', -9, 0.3); sx_(R(W.weeks, 0.9), 'paper_slam_1', -9, 0.5); sx_(R(W.weeks, 1.6), 'ding_2', -10, 0.7);
  sx_(R(W.nobody, -0.4), 'swoosh_2', -10, 0.6); sx_(W.prove, 'pop_1', -9, 0.4); sx_(W.bought, 'rubber_stamp_2', -7, 0.5);
  sx_(W.paid, 'rubber_stamp_2', -4, 0.5); sx_(W.paid, 'success_chime_1', -11, 1.0);
  sx_(W.year, 'coins_drop_1', -12, 1.1); sx_(W.valAt || W.one, 'ding_2', -8, 0.7);
  sx_(W.sal, 'typewriter_2', -12, 1.0); sx_(W.send, 'swoosh_2', -9, 1.0);
  sx_(W.wins, 'rubber_stamp_2', -7, 0.5); sx_(R(W.wins, 0.9), 'record_scratch_stop_1', -14, 0.6);
  sx_(R(W.then, -0.4), 'paper_slam_2', -10, 0.5); sx_(W.bulk2, 'rubber_stamp_2', -5, 0.5); sx_(W.bulk2, 'thud_2', -8, 0.4);
  sx_(W.problem, 'record_scratch_stop_1', -14, 0.6); sx_(R(W.y31, -0.2), 'paper_slam_2', -10, 0.5); sx_(W.y31, 'clock_ticking_1', -14, 1.2);
  sx_(R(W.follow, 0.5), 'click_1', -8, 0.3); sx_(R(W.follow, 0.58), 'success_chime_1', -12, 1.0);
  sx_(R(W.later, 0.0), 'riser_2', -12, 0.9); sx_(R(W.s15, -0.2), 'paper_slam_2', -10, 0.5); sx_(W.comb, 'typewriter_1', -12, 1.0); sx_(R(W.comb, 2.1), 'cash_register_1', -9, 0.9);
  if (V.jack !== false) { sx_(R(W.n95, -0.3), 'sub_drop_1', -8, 1.2); sx_(W.n95, 'cinematic_hit_1', -3, 1.2); sx_(W.n95, 'deep_boom_1', -3, 1.4); sx_(R(W.n95, 0.1), 'cash_register_1', -8, 0.9); }
  sx_(W.shut, 'door_slam_1', -5, 0.8); sx_(R(W.commission, 0.1), 'rubber_stamp_2', -6, 0.5);
  sx_(W.q, 'pop_1', -9, 0.5); sx_(W.yes, 'rewind_2', -11, 0.9);
  return {
    series: 'whatif', title: V.title || 'PART 2 · LOTTERY · 1992', duration: V.duration,
    footnote: ['THE 1992 PURCHASE WAS LEGAL AND VIRGINIA PAID · SOURCES: UPI · WASHINGTON POST · ROANOKE TIMES (1992)', 'VIRGINIAN-PILOT (1997) · KUT · HOUSTON CHRONICLE · LOTTERYUSA (TEXAS 2023) · ~$65K = ROUGH TYPICAL US SALARY', 'ILLUSTRATIONS: THE FUND · THE OFFICIAL · TICKETS · CHEQUE · RULEBOOK · SIGN · PHOTO: LIBRARY OF CONGRESS (NO KNOWN RESTRICTIONS)'],
    elements: els, beats, poses: [[R(W.follow, -0.1), 'follow', { target: [830, 1010] }], [R(W.follow, 1.5), 'talk']], shakes: V.shakes, captions: V.captions, bed: V.bed || { name: 'tense_bed_2', gain: -1 }, sfx: S,
  };
};
