// ===== Card minimum v3 — scene builder shared by the three cuts: CM(W, V) -> BM2.scene spec =====
// Recurring character: YOU holding the card (you0 hook, you1 setup, you3 payment, you4 trap, you5 five years, you7 sixteen years, kid scene, you10 fixed, loop).
// Live number from frame 0: the monthstrip (MONTH n · STILL OWE · red INTEREST vs thin green DEBT bar, real simulation).
// Stations (world px): row0 y=0: hook(0) setup(1800) apr(3600) payment(5400) trap(7200) · row1 y=1800: fiveyears(0) sixteen(1800) kid(3600) total(5400) fixed(7200)
window.CM = function (W, V) {
  const SB = 'side-by-side', GH = 'graphic-hero', ZN = 'zoom-on-number', PF = 'presenter-front', PK = 'peek', PB = 'pull-back';
  const R = (ref, d) => (d == null ? ref : (typeof ref === 'number' ? ref + d : ref + (d >= 0 ? '+' : '') + d));
  const STL = { x: 120, y: 1410, s: 0.85 }, STR = { x: 940, y: 1410, s: 0.85 };
  const row = 1800, els = [], E = (...a) => els.push(...a);
  const has = k => W[k] != null;
  // ---------------------------------------------------------------- S0 hook (frame 0 + loop)
  E({ id: 'hook', type: 'text', at: [0, -470], in: -1, out: R(W.hookOut, -0.05), props: { lines: V.hook, size: V.hookSize || 124, per: 0.1 } },
    { id: 'you0', type: 'you', at: [0, 25], in: -3, props: { w: 480, h: 560, moods: [{ t: 0, m: 'worried' }, { t: V.shockAt || 99999, m: 'shock' }], tag: 'YEAR 1' } },
    { id: 'hook2', type: 'text', at: [0, -470], in: R(W.end, 0.05), props: { lines: V.hook, size: V.hookSize || 124, per: 0.1 } },
    { id: 'you0b', type: 'you', at: [0, 25], in: R(W.end, -0.15), props: { w: 480, h: 560, moods: [{ t: 0, m: 'think' }, { t: R(W.end, 0.4), m: 'worried' }], tag: 'YEAR 1' } });
  // ---------------------------------------------------------------- S1 setup: owe $5,000 + the minimum
  E({ id: 'you1', type: 'you', at: [1470, 40], in: R(W.s1, -0.3), props: { w: 400, h: 480, labelSize: 40, bg: 1, moods: [{ t: 0, m: 'think' }, { t: W.bal, m: 'worried' }], tag: 'OWES $5,000' } },
    { id: 'stmt', type: 'stmt', at: [2130, 20], scale: 0.84, in: R(W.s1, -0.1), props: { balAt: W.bal, aprAt: has('apr1') ? W.apr1 : 99999, dueAt: 99999, fineAt: 99999, fine1At: 99999, fine2At: 99999 } },
    { id: 'minT', type: 'text', layer: 'screen', at: [540, 478], in: W.minimum, out: W.s2 ? R(W.s2, -0.15) : R(W.s3, -0.8), props: { lines: V.minLines || [[['THE MINIMUM =', 'gold']], [['THE SMALLEST PAYMENT ALLOWED', 'paper']]], size: 54 } });
  // ---------------------------------------------------------------- S2 APR (skipped when the cut merges it into the statement)
  if (has('s2')) E({ id: 'plastic', type: 'plastic', at: [3600, -100], scale: 1.1, rot: -0.09, in: R(W.s2, -0.35) },
    { id: 'apr', type: 'counter', at: [3600, 330], in: R(W.s2, -0.2), props: { at: W.apr, dur: 1.1, to: 22.36, decimals: 2, suffix: '%', label: 'APR · A YEAR', sub: V.aprSub || 'AVERAGE · CARRYING A BALANCE', tone: 'bad', size: 170, w: 840 } });
  // ---------------------------------------------------------------- S3 month one: the payment splits
  E({ id: 'bar', type: 'paybar', at: [5400, -170], in: R(W.s3, -0.4), props: { fillAt: W.fillAt || W.intr, splitAt: W.drop } },
    { id: 'you3', type: 'you', at: [5400, 510], in: R(W.s3, -0.3), props: { w: 400, h: 440, labelSize: 40, bg: 2, moods: [{ t: 0, m: 'neutral' }, { t: R(W.intr, 0), m: 'worried' }, { t: W.drop, m: 'shock' }], tag: 'MONTH 1' } },
    { id: 'feeT', type: 'text', layer: 'screen', at: [540, V.feeY || 480], in: W.fee, out: R(W.drop, -0.15), props: { lines: V.feeLines || [[['INTEREST = ', 'bad'], ["THE BANK'S FEE", 'paper']], [['FOR LENDING YOU MONEY', 'gold']]], size: V.feeSize || 50 } });
  // ---------------------------------------------------------------- S4 the trap: the minimum shrinks
  E({ id: 'shr', type: 'shrink', at: [7200, -90], in: R(W.s4, -0.4), props: { at: R(W.shrAt, 0), per: V.shrPer || 0.42, labelAt: R(W.shrAt, 0.1) } },
    { id: 'you4', type: 'you', at: [7200, 560], in: R(W.s4, -0.3), props: { w: 380, h: 420, labelSize: 38, bg: 0, moods: [{ t: 0, m: 'think' }, { t: R(W.shrAt, 0.2), m: 'wrong' }], tag: 'MONTH 60' } });
  // ---------------------------------------------------------------- S5 five years later (calendar pages) + the balance still owed
  E({ id: 'cal', type: 'cal', at: [180, row + 20], in: R(W.s5, -0.4), enter: 'rise', props: { flipAt: R(W.five, -0.05), owedAt: W.owe, dur: 1.0 } },
    { id: 'you5', type: 'you', at: [-520, row + 70], in: R(W.s5, -0.3), props: { w: 340, h: 410, labelSize: 36, bg: 1, age: 0.35, moods: [{ t: 0, m: 'think' }, { t: W.owe, m: 'wrong' }], tag: 'YEAR 5' } });
  // ---------------------------------------------------------------- S7 sixteen and a half years
  E({ id: 'pf', type: 'pagesfly', at: [1800 - 120, row + 20], in: R(W.s7, -0.4), props: { at: R(W.yrs, -0.1), per: V.pagePer || 0.16, endAt: R(W.yrs, 2.6) } },
    { id: 'you7', type: 'you', at: [1800 + 560, row + 120], in: R(W.s7, -0.3), props: { w: 340, h: 410, labelSize: 36, bg: 2, age: 0.8, moods: [{ t: 0, m: 'worried' }, { t: R(W.yrs, 1.6), m: 'wrong' }], tag: 'YEAR 16' } },
    );
  if (has('kid')) E({ id: 'kid', type: 'kid', at: [3600, row + 20], in: R(W.kid, -0.35), props: { growAt: W.growAt, growDur: V.growDur || 1.0, driveAt: W.drive } });
  // ---------------------------------------------------------------- S9 the total
  E({ id: 'stf', type: 'stuff', at: [5400 - 380, row + 60], in: R(W.s9, -0.4), props: { at: R(W.stuff, -0.2) } },
    { id: 'rcpt', type: 'receipt', at: [5400 + 330, row + 40], in: R(W.s9, -0.2), props: { title: 'THE FINAL RECEIPT', w: 600, rows: [
      { id: 'borrowed', k: 'YOU BORROWED', v: '$5,000', at: R(W.s9, 0.2), tone: 'good' }, { id: 'paid', k: 'YOU PAID', v: '$12,811', at: W.paid, tone: 'bad' }, { id: 'int', k: 'INTEREST', v: '$7,811', at: R(W.paid, 1.0), tone: 'bad' }], foot: '198 MONTHS = 16.5 YEARS' } });
  // ---------------------------------------------------------------- S10 fixed $250: the ghost counter
  E({ id: 'track', type: 'track', at: [7200, row - 90], in: R(W.s10, -0.4), props: { fillAt: R(W.s10, 0), fillDur: 1.0, ghostAt: W.fx250, ghostDur: V.ghostDur || 1.4, tagAt: W.same } },
    { id: 'you10', type: 'you', at: [7200, row + 560], in: R(W.fx250, -0.3), props: { w: 380, h: 420, labelSize: 38, bg: 1, moods: [{ t: 0, m: 'think' }, { t: W.m26, m: 'grin' }], tag: 'FIXED $250' } },
    { id: 'fast', type: 'bigstamp', at: [7200, row - 60], rot: -0.07, scale: 1.12, in: W.fast, props: { lines: ['14 YEARS', 'FASTER'], tone: 'good', size: 110 } });
  // ---------------------------------------------------------------- screen micro-moments + HUD
  E({ id: 'heart', type: 'heart', layer: 'screen', at: [800, 930], in: R(W.like, -0.05), out: R(W.like, 1.15), props: { s: 1 } },
    { id: 'liket', type: 'text', layer: 'screen', at: [800, 1190], in: R(W.like, 0.15), out: R(W.like, 1.2), props: { lines: [[[V.likeText || 'LIKE', 'gold']]], size: 60 } },
    { id: 'plane', type: 'plane', layer: 'screen', at: [0, 0], in: R(W.send, -0.05), out: R(W.send, 1.5), props: { from: [110, 900], to: [1150, 330], dur: 1.45 } },
    { id: 'btn', type: 'follow', layer: 'screen', at: [830, 1010], scale: 0.8, in: R(W.follow, -0.05), out: R(W.follow, 1.45), props: { press: 0.55 } },
    { id: 'ask', type: 'bubble', layer: 'screen', at: [600, 1090], in: R(W.q, 0.4), out: R(W.end, 0.3), props: { l1: V.askL1, l2: V.askL2, size: 44, tail: 'left' } },
    ...(V.extra || []),
    { id: 'strip', type: 'monthstrip', layer: 'screen', at: [0, 0], in: -1, props: { clock: V.clock, fixedAt: W.fx250 } },
    { id: 'hud', type: 'hud', layer: 'screen', at: [0, 0], in: -1, props: { labels: V.labels, items: [] } });
  // ================================================================ beats
  const beats = [], bt = (at, o) => { if (at == null || /undefined/.test(String(at))) return; beats.push({ at, ...o }); };
  const F0 = ['hook', 'you0'], F0e = ['hook2', 'you0b'];
  beats.push({ at: 0, beat: SB, focus: F0, fill: 0.9, maxH: 900, sx: 540, sy: 905, st: { x: 130, y: 1410, s: 0.85 }, pose: 'you', keep: ['hook', 'hook2'] });
  bt(W.hookZ, { beat: ZN, focus: 'hook', fill: 0.95, maxH: 400, sy: 700, st: { x: 130, y: 1410, s: 0.85 }, pose: 'shock', dur: 0.45 });
  bt(W.hookZ2, { beat: GH, focus: F0, fill: 0.9, maxH: 900, sx: 540, sy: 905, st: STR, pose: 'point', dur: 0.7, keep: ['hook', 'hook2'] });
  bt(R(W.s1, -0.25), { beat: GH, focus: ['you1', 'stmt'], move: 'whip', fill: 0.97, maxH: 760, sy: 880, st: STR, pose: 'idle' });
  bt(W.bal, { beat: ZN, focus: 'stmt.bal', fill: 0.8, sy: 780, st: STL, pose: 'point', dur: 0.5 });
  bt(W.apr1, { beat: ZN, focus: 'stmt.apr', fill: 0.8, sy: 780, st: STL, pose: 'point', dur: 0.5 });
  bt(W.minimum, { beat: GH, focus: ['you1', 'stmt'], fill: 0.97, maxH: 760, sy: 880, st: STR, pose: 'point', dur: 0.7 });
  if (has('s2')) { bt(R(W.s2, -0.25), { beat: GH, focus: ['plastic', 'apr'], move: 'whip', fill: 0.9, maxH: 860, sy: 880, st: STL, pose: 'idle' });
    bt(W.apr, { beat: ZN, focus: 'apr.value', fill: 0.84, sy: 800, st: STL, pose: 'shock', dur: 0.5 }); bt(W.avg, { beat: GH, focus: ['plastic', 'apr'], fill: 0.9, maxH: 860, sy: 880, st: STR, pose: 'point', dur: 0.7 }); }
  bt(R(W.s3, -0.25), { beat: GH, focus: ['bar', 'you3'], move: 'whip', fill: 0.9, maxH: 820, sy: 960, st: STR, pose: 'idle' });
  bt(W.pay, { beat: ZN, focus: 'bar.total', fill: 0.8, sy: 780, st: STL, pose: 'point', dur: 0.5 });
  bt(W.intr, { beat: GH, focus: ['bar', 'you3'], fill: 0.95, maxH: 820, sy: 960, st: STL, pose: 'shock', dur: 0.5 });
  bt(W.drop, { beat: ZN, focus: 'bar.debt', fill: 0.8, maxH: 520, sy: 800, st: STL, pose: 'shock', dur: 0.5 });
  bt(R(W.drop, 1.2), { beat: GH, focus: ['bar', 'you3'], fill: 0.9, maxH: 820, sy: 960, st: STR, pose: 'idle', dur: 0.7 });
  bt(W.five2, { beat: ZN, focus: 'cal.owed', fill: 0.56, sy: 1000, st: STR, pose: 'idle', dur: 0.5 });
  bt(R(W.s4, -0.25), { beat: GH, focus: ['shr', 'you4'], move: 'whip', fill: 0.9, maxH: 900, sy: 880, st: STR, pose: 'chin' });
  bt(R(W.shrAt, 1.3), { beat: ZN, focus: 'shr.bars', fill: 0.7, maxH: 560, sy: 860, st: STL, pose: 'point', dur: 0.6 });
  bt(W.shrB, { beat: ZN, focus: 'shr.last', fill: 0.6, maxH: 560, sy: 860, st: STL, pose: 'shock', dur: 0.5 });
  bt(W.shrC, { beat: GH, focus: ['shr', 'you4'], fill: 0.9, maxH: 900, sy: 880, st: STR, pose: 'idle', dur: 0.7 });
  bt(V.shrTail === false ? undefined : R(W.shrAt, 3.0), { beat: GH, focus: ['shr', 'you4'], fill: 0.9, maxH: 900, sy: 880, st: STR, pose: 'idle', dur: 0.7 });
  bt(R(W.s5, -0.25), { beat: GH, focus: ['cal', 'you5'], move: 'whip', fill: 0.97, maxH: 780, sy: 880, st: STR, pose: 'idle' });
  bt(W.owe, { beat: ZN, focus: 'cal.owed', fill: 0.56, sy: 1000, st: STR, pose: 'shock', dur: 0.5 });
  bt(W.send, { beat: PF, focus: 'cal', sy: 770, pose: 'you' });
  bt(R(W.s7, -0.25), { beat: GH, focus: ['pf', 'you7'], move: 'whip', fill: 0.97, maxH: 860, sy: 880, st: STL, pose: 'idle' });
  bt(R(W.yrs, 0.2), { beat: ZN, focus: 'pf.counter', fill: 0.84, maxH: 400, sy: 740, st: STL, pose: 'shock', dur: 0.5 });
  bt(R(W.yrs, 2.4), { beat: GH, focus: ['pf', 'you7'], fill: 0.97, maxH: 860, sy: 880, st: STL, pose: 'idle', dur: 0.7 });
  bt(R(W.kid, -0.25), { beat: GH, focus: 'kid', move: 'whip', fill: 0.94, maxH: 860, sy: 880, st: STL, pose: 'point' });
  bt(W.growAt, { beat: ZN, focus: 'kid.age', fill: 0.4, maxH: 300, sy: 800, st: STL, pose: 'shock', dur: 0.5 });
  bt(W.drive, { beat: GH, focus: 'kid', fill: 0.94, maxH: 860, sy: 880, st: STR, pose: 'shock', dur: 0.7 });
  bt(W.follow, { beat: PF, focus: V.followFocus || 'kid', sy: 800, pose: 'follow', zoom: 0.9 });
  bt(R(W.s9, -0.25), { beat: GH, focus: 'rcpt', move: 'whip', fill: 0.7, maxH: 760, sy: 880, st: STL, pose: 'idle' });
  bt(W.paid, { beat: ZN, focus: 'rcpt.paid', fill: 0.6, sy: 900, st: STL, pose: 'shock', dur: 0.5 });
  bt(R(W.stuff, -0.1), { beat: GH, focus: ['stf', 'rcpt'], fill: 0.97, maxH: 760, sy: 880, st: STR, pose: 'point', dur: 0.7 });
  bt(R(W.s10, -0.25), { beat: GH, focus: ['track', 'you10'], move: 'whip', fill: 0.94, maxH: 900, sy: 930, st: STL, pose: 'idle' });
  bt(W.fx250, { beat: ZN, focus: 'track.ghost', fill: 0.72, sy: 1080, st: STL, pose: 'point', dur: 0.5 });
  bt(W.m26, { beat: GH, focus: ['track', 'you10'], fill: 0.94, maxH: 900, sy: 930, st: STR, pose: 'shock', dur: 0.6 });
  bt(W.fast, { beat: ZN, focus: 'fast', fill: 0.62, maxH: 380, sy: 860, st: STL, pose: 'shock', dur: 0.45 });
  bt(R(W.q, -0.3), { beat: PF, focus: 'track', sy: 800, pose: 'talk', dur: 0.6 });
  bt(W.end, { beat: SB, focus: F0e, move: 'whip', fill: 0.9, maxH: 900, sx: 540, sy: 905, st: { x: 130, y: 1410, s: 0.85 }, pose: 'you', keep: ['hook', 'hook2'] });
  for (const b of beats) { if (b.beat === PF || b.beat === ZN || b.at === 0) continue; b.maxH = Math.min(b.maxH || 860, 860); const lo = 430 + b.maxH / 2, hi = 1330 - b.maxH / 2; b.sy = Math.min(hi, Math.max(lo, b.sy || 880)); }
  // ================================================================ sfx
  const S = [], sx_ = (at, name, gain, dur) => { if (at == null || /undefined/.test(String(at))) return; S.push({ at, name, gain, dur }); };
  S.push({ at: 0, name: 'deep_boom_2', gain: -5, dur: 0.4 }, { at: 0.05, name: 'typewriter_1', gain: -14, dur: 0.6 });
  sx_(W.hookZ, 'pop_2', -9, 0.3); sx_(R(W.s1, -0.25), 'paper_slam_2', -10, 0.5); sx_(W.bal, 'pop_2', -8, 0.3); sx_(W.apr1, 'pop_2', -8, 0.3); sx_(W.minimum, 'typewriter_2', -11, 0.6);
  sx_(R(W.s2, -0.25), 'paper_slam_2', -10, 0.5); sx_(W.apr, 'money_counter_1', -11, 1.1); sx_(R(W.apr, 1.1), 'ding_2', -9, 0.7);
  sx_(R(W.s3, -0.25), 'paper_slam_2', -10, 0.5); sx_(W.pay, 'cash_register_1', -9, 0.9); sx_(W.intr, 'money_counter_1', -11, 0.9); sx_(W.drop, 'rubber_stamp_2', -6, 0.5); sx_(W.drop, 'thud_1', -9, 0.4);
  sx_(W.like, 'heartbeat_1', -8, 0.9); sx_(R(W.s4, -0.25), 'paper_slam_2', -10, 0.5); sx_(W.shrAt, 'click_1', -9, 0.3); sx_(R(W.shrAt, 0.42), 'click_1', -9, 0.3); sx_(R(W.shrAt, 0.84), 'click_1', -9, 0.3); sx_(R(W.shrAt, 2.1), 'record_scratch_stop_1', -14, 0.6);
  sx_(R(W.s5, -0.25), 'paper_slam_2', -10, 0.5); sx_(R(W.five, -0.05), 'paper_slam_1', -9, 0.5); sx_(W.owe, 'cash_register_1', -9, 0.9); sx_(W.send, 'swoosh_2', -9, 1.0);
  sx_(R(W.s7, -0.25), 'paper_slam_2', -10, 0.5); sx_(R(W.yrs, -0.1), 'riser_2', -11, 1.2); sx_(R(W.yrs, 2.4), 'cinematic_hit_1', -6, 1.0);
  sx_(R(W.kid, -0.25), 'paper_slam_2', -10, 0.5); sx_(W.growAt, 'riser_2', -12, 1.0); sx_(W.drive, 'pop_2', -8, 0.3);
  sx_(R(W.follow, 0.5), 'click_1', -8, 0.3); sx_(R(W.follow, 0.58), 'success_chime_1', -12, 1.0);
  sx_(R(W.s9, -0.25), 'paper_slam_2', -10, 0.5); sx_(R(W.stuff, -0.2), 'coins_drop_1', -12, 1.0); sx_(W.paid, 'cash_register_1', -7, 0.9); sx_(W.paid, 'cinematic_hit_1', -6, 1.0);
  sx_(R(W.s10, -0.25), 'paper_slam_2', -10, 0.5); sx_(W.fx250, 'money_counter_2', -11, 1.2); sx_(W.m26, 'success_chime_1', -9, 1.0); sx_(W.fast, 'rubber_stamp_2', -5, 0.5); sx_(W.fast, 'deep_boom_1', -5, 1.0);
  sx_(W.q, 'pop_1', -9, 0.5); sx_(W.end, 'rewind_2', -11, 0.9);
  return {
    series: 'whatif', title: V.title || 'CARD MINIMUM', duration: V.duration,
    footnote: ['ASSUMES $5,000 · 22.36% APR · MIN = 1% + INTEREST ($35 FLOOR) · NO NEW PURCHASES · MATH, NOT ADVICE', 'MONTH-BY-MONTH SIMULATION · APR: FEDERAL RESERVE G.19 (Q3 2026, VIA LENDINGTREE) · ILLUSTRATIONS: YOU · CARD · BAGS'],
    elements: els, beats, poses: [[R(W.follow, -0.1), 'follow', { target: [830, 1010] }], [R(W.follow, 1.5), 'talk']], shakes: V.shakes, captions: V.captions, bed: V.bed || { name: 'upbeat_bed_2', gain: -1 }, sfx: S,
  };
};
