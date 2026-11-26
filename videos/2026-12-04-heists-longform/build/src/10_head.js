// ===== scene: 5 HEISTS · 1 DUMB MISTAKE EACH (long-form, engine v2, 1920x1080) =====
const E = [], BT = [], SF = [], PO = [], SK = [];
const RM = [0, 60000, 120000, 180000, 240000, 300000, 360000, 420000];   // rooms: cold open, ch1..ch6, end card
const K = (room, k) => room + 2800 * k;
const el = (id, type, x, y, inn, props, o) => E.push({ id, type, at: [x, y], in: inn, props: props || {}, ...(o || {}) });
const bt = (at, beat, focus, o) => BT.push({ at, beat, ...(focus !== undefined && focus !== null ? { focus } : {}), ...(o || {}) });
const sf = (at, name, gain = -8, dur = 1, offset) => SF.push({ at, name, gain, dur, ...(offset ? { offset } : {}) });
const po = (at, pose, target) => PO.push(target ? [at, pose, { target }] : [at, pose]);
const sk = (at, amp = 12) => SK.push([at, amp]);
const IMG = n => 'videos/2026-12-04-heists-longform/build/img/' + n + '.png';
// recurring villains: coloured ILLUSTRATION cards (the badge is baked into each image), same design every time
const CON = {
  mono: { src: IMG('monopoly'), name: 'THE MONOPOLY GANG', nick: '“THE TRAIN GANG”', aspect: 0.78 },
  dealer: { src: IMG('dealer'), name: 'THE FAKE DEALER', nick: '“LEONARDO NOTARBARTOLO”', aspect: 1.0 },
  crew: { src: IMG('crew_antwerp'), name: 'THE ANTWERP CREW', nick: '“THREE HELPERS”', aspect: 0.78 },
  hatton: { src: IMG('hatton'), name: 'THE HATTON GARDEN CREW', nick: '“MOSTLY OLDER MEN”', aspect: 0.78 },
  brinks: { src: IMG('brinks'), name: 'THE BRINK’S GANG', nick: '“RUBBER MASKS”', aspect: 0.78 },
  specs: { src: IMG('specs'), name: '“SPECS”', nick: 'JOSEPH O’KEEFE', aspect: 1.0 },
  specsj: { src: IMG('specs_stripes'), name: '“SPECS”', nick: 'JOSEPH O’KEEFE', aspect: 1.0 },
  bet: { src: IMG('betchley'), name: 'THE MIDDLEMAN', nick: '“EDWARD BETCHLEY”', aspect: 1.0 },
  thief: { src: IMG('thief'), name: 'THE THIEF', nick: '“NEVER IDENTIFIED”', aspect: 1.0 },
  pick: { src: IMG('pickles'), name: 'PICKLES', nick: '“THE DOG”', aspect: 1.0 },
  corb: { src: IMG('corbett'), name: 'DAVID CORBETT', nick: '“THE DOG WALKER”', aspect: 1.0 },
};
const con = (id, who, x, y, inn, extra, o) => { const b = { flash: false, credit: '', ...CON[who], ...(extra || {}) }; b.w = b.w || 420; if (b.variant !== 'pip' && b.variant !== 'side' && !b.nameSize) b.nameSize = Math.min(44, Math.floor((b.w - 44 - 36) / (b.name.length * 0.5))); if (b.variant === 'side' && !b.nameSize) b.nameSize = 30; el(id, 'suspect', x, y, inn, b, o); };
const pr = (id, kind, x, y, inn, props, o) => el(id, 'prop', x, y, inn, { kind, ...(props || {}) }, o);
// THE MISTAKE sequence: 4-frame black cut + heartbeat, red stamp (top-left third, same every time), tray slot fills; exhibit drops on a tray under a magnifier
const MIST = [];
function mistake(pid, word, nextPid, ex, xs, slot, extra) {
  const w = `@${pid}:${word}`, end = `@${nextPid}>+0.1`;
  el('bk' + pid, 'blackcut', 0, 0, w, {}, { layer: 'screen', z: 9990, out: w + '+0.134' });
  el('ms' + pid, 'mstamp', 480, 330, w + '+0.14', {}, { layer: 'screen', out: end });
  sf(w, 'heartbeat_1', -5, 1.2); sf(w + '+0.14', 'rubber_stamp_2', -3, 0.6); sf(w + '+0.14', 'sub_drop_1', -8, 1.0); sk(w + '+0.16', 12);
  el('ex' + pid, 'exhibit', xs, 40, w + '+0.1', { ex, label: 'EXHIBIT ' + ex, ...(extra || {}) }, { out: end });
  MIST.push([w, slot]);
}
const STAGES = [
  { at: '@P009-0.7', dur: 1.2, theme: { stage: ['#143326', '#0d2219', '#06100c'], blobs: [['#8a6a1f', 0.38], ['#1f6a4a', 0.55], ['#2a4a3e', 0.5], ['#8a6a1f', 0.3]], dust: '#FFF0C0' } },
  { at: '@P029-0.7', dur: 1.2, theme: { stage: ['#1d3550', '#122236', '#080e16'], blobs: [['#3a7aaa', 0.5], ['#2a4278', 0.55], ['#7aa0c0', 0.4], ['#3a7aaa', 0.3]], dust: '#DCEBFF' } },
  { at: '@P051-0.7', dur: 1.2, theme: { stage: ['#3a2a18', '#262028', '#0e1218'], blobs: [['#b0601a', 0.5], ['#3e4e68', 0.55], ['#8a5a2a', 0.4], ['#b0601a', 0.3]], dust: '#FFD9A8' } },
  { at: '@P072-0.7', dur: 1.2, theme: { stage: ['#3a2812', '#25190b', '#120c05'], blobs: [['#8a5a1f', 0.55], ['#7a2a1c', 0.5], ['#3e3020', 0.55], ['#8a5a1f', 0.4]], dust: '#FFE4B8' } },
  { at: '@P093-0.7', dur: 1.2, theme: { stage: ['#1f3a22', '#142a17', '#08140a'], blobs: [['#d9a21b', 0.45], ['#2a7a3a', 0.55], ['#3a5a30', 0.5], ['#d9a21b', 0.3]], dust: '#F0FFD0' } },
  { at: '@P112-0.7', dur: 1.2, theme: { stage: ['#3a2a1a', '#2a1d10', '#120c06'], blobs: [['#8a5a2a', 0.55], ['#6a3a20', 0.5], ['#3e3020', 0.55], ['#8a5a2a', 0.4]], dust: '#FFE4B8' } },
  { at: '@P120>+0.0', dur: 1.0, theme: { stage: ['#26354A', '#152030', '#0B0F14'], blobs: [['#1F5F7A', 0.58], ['#2A4278', 0.55], ['#1E4A4A', 0.5], ['#1F5F7A', 0.4]], dust: '#DCEBFF' } },
];
const R0 = k => K(RM[0], k), R1 = k => K(RM[1], k), R2 = k => K(RM[2], k), R3 = k => K(RM[3], k), R4 = k => K(RM[4], k), R5 = k => K(RM[5], k), R6 = k => K(RM[6], k);
