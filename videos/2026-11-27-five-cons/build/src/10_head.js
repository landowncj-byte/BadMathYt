// ===== scene: 5 CONS THAT FOOLED BILLIONAIRES, BANKS AND ENTIRE STATES (long-form, engine v2, 1920x1080) =====
const E = [], BT = [], SF = [], PO = [], SK = [];
const RM = [0, 24000, 50000, 76000, 102000, 128000, 154000, 182000];   // rooms: cold open, ch1..ch5, ch6 pattern, end card
const K = (room, k) => room + 2800 * k;
const el = (id, type, x, y, inn, props, o) => E.push({ id, type, at: [x, y], in: inn, props: props || {}, ...(o || {}) });
const bt = (at, beat, focus, o) => BT.push({ at, beat, ...(focus !== undefined && focus !== null ? { focus } : {}), ...(o || {}) });
const sf = (at, name, gain = -8, dur = 1, offset) => SF.push({ at, name, gain, dur, ...(offset ? { offset } : {}) });
const po = (at, pose, target) => PO.push(target ? [at, pose, { target }] : [at, pose]);
const sk = (at, amp = 12) => SK.push([at, amp]);
// the five cons as recurring characters (crime.js `suspect` base props)
const CON = {
  kur: { src: 'brand/photos/rudy-kurniawan/2.jpg', name: 'RUDY KURNIAWAN', nick: '“THE WINE COLLECTOR”', credit: 'PHOTO: U.S. ICE · PUBLIC DOMAIN', fx: 0.49, fy: 0.45, aspect: 1.05 },
  gig: { src: 'brand/photos/anthony-gignac/1.jpg', crop: [0.5, 0, 0.5, 1], name: 'ANTHONY GIGNAC', nick: '“THE PRINCE”', credit: 'PHOTO: MIAMI-DADE COUNTY · PUBLIC DOMAIN', fx: 0.46, fy: 0.4, aspect: 1.05 },
  tip: { src: 'videos/2026-11-27-five-cons/assets/tipton.png', name: 'EDDIE TIPTON', nick: '“THE LOTTERY IT GUY”', credit: 'ILLUSTRATION · NO LICENSED PHOTO', fx: 0.5, fy: 0.45, aspect: 1.12 },
  tuc: { src: 'videos/2026-11-27-five-cons/assets/tucker.png', name: 'SCOTT TUCKER', nick: '“THE PAYDAY LENDER”', credit: 'ILLUSTRATION · NO LICENSED PHOTO', fx: 0.5, fy: 0.45, aspect: 1.12 },
  jav: { src: 'brand/photos/charlie-javice-illustration/founder.png', name: 'CHARLIE JAVICE', nick: '“THE FOUNDER”', credit: 'ILLUSTRATION · NO LICENSED PHOTO', fx: 0.5, fy: 0.42, aspect: 1.12 },
};
const con = (id, who, x, y, inn, extra, o) => el(id, 'suspect', x, y, inn, { ...CON[who], ...(extra || {}) }, o);
const STAGES = [
  { at: '@P07-0.7', dur: 1.2, theme: { stage: ['#3a1620', '#240d14', '#120609'], blobs: [['#7a2a3c', 0.55], ['#5b1f33', 0.5], ['#3e2030', 0.55], ['#7a2a3c', 0.4]], dust: '#FFD9DF' } },
  { at: '@P21-0.7', dur: 1.2, theme: { stage: ['#123a3d', '#0c2528', '#061214'], blobs: [['#1f7a7a', 0.55], ['#2a6a78', 0.5], ['#2e4a60', 0.55], ['#1f7a7a', 0.4]], dust: '#D9FFF6' } },
  { at: '@P34-0.7', dur: 1.2, theme: { stage: ['#2a2f52', '#171a33', '#0B0F14'], blobs: [['#8a6a1f', 0.5], ['#2a3a78', 0.55], ['#3e3a70', 0.5], ['#8a6a1f', 0.35]], dust: '#FFF0C0' } },
  { at: '@P48-0.7', dur: 1.2, theme: { stage: ['#14382a', '#0c2219', '#06120d'], blobs: [['#1f7a4a', 0.55], ['#2a6a50', 0.5], ['#1e4a3a', 0.5], ['#1f7a4a', 0.4]], dust: '#D9FFE6' } },
  { at: '@P60-0.7', dur: 1.2, theme: { stage: ['#2e1e52', '#1a1233', '#0B0F14'], blobs: [['#5a2aa8', 0.55], ['#3a2a78', 0.5], ['#6a2a8a', 0.45], ['#5a2aa8', 0.4]], dust: '#EBD9FF' } },
  { at: '@P71-0.7', dur: 1.2, theme: { stage: ['#26354A', '#152030', '#0B0F14'], blobs: [['#1F5F7A', 0.58], ['#2A4278', 0.55], ['#1E4A4A', 0.5], ['#1F5F7A', 0.4]], dust: '#DCEBFF' } },
];
const CHAP = [['@P07', 'THE WINE'], ['@P21', 'THE PRINCE'], ['@P34', 'THE LOTTERY'], ['@P48', 'THE LOAN'], ['@P60', 'THE USERS'], ['@P71', 'THE PATTERN']];
