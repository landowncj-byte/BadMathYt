// ===== scene: THE IMPOSSIBLE NUMBER THAT EXPOSED MADOFF (long-form, engine v2, 1920x1080) =====
const E = [], BT = [], SF = [], PO = [], SK = [];
const X1 = 17000, X2 = 55000, X3 = 95000, X4 = 145000, XE = 170000;   // rooms of the world: cold open, Ponzi, oil, Madoff, test, end card
const K = (room, k) => room + 2800 * k;                              // station k of a room
const el = (id, type, x, y, inn, props, o) => E.push({ id, type, at: [x, y], in: inn, props: props || {}, ...(o || {}) });
const bt = (at, beat, focus, o) => BT.push({ at, beat, ...(focus !== undefined && focus !== null ? { focus } : {}), ...(o || {}) });
const sf = (at, name, gain = -8, dur = 1, offset) => SF.push({ at, name, gain, dur, ...(offset ? { offset } : {}) });
const po = (at, pose, target) => PO.push(target ? [at, pose, { target }] : [at, pose]);
const sk = (at, amp = 12) => SK.push([at, amp]);
const SEPIA = { stage: ['#4A3A24', '#2B1D10', '#120C06'], blobs: [['#7A5A2A', 0.55], ['#5B3A1E', 0.5], ['#3E3220', 0.55], ['#7A5A2A', 0.4]], dust: '#FFE2B0', paper: '#EFE3C8', paperShade: '#DDD0AE', rule: '#CDBF98' };
