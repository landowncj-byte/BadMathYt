// ===== scene: FAKES THAT FOOLED THE EXPERTS (long-form, engine v2, 1920x1080) =====
const E = [], BT = [], SF = [], PO = [], SK = [];
const RM = [0, 60000, 120000, 180000, 240000, 300000, 360000];   // rooms: cold open, ch1..ch5, end card
const K = (room, k) => room + 2800 * k;
const el = (id, type, x, y, inn, props, o) => E.push({ id, type, at: [x, y], in: inn, props: props || {}, ...(o || {}) });
const bt = (at, beat, focus, o) => BT.push({ at, beat, ...(focus !== undefined && focus !== null ? { focus } : {}), ...(o || {}) });
const sf = (at, name, gain = -8, dur = 1, offset) => SF.push({ at, name, gain, dur, ...(offset ? { offset } : {}) });
const po = (at, pose, target) => PO.push(target ? [at, pose, { target }] : [at, pose]);
const sk = (at, amp = 12) => SK.push([at, amp]);
// the four fakers as recurring characters (crime.js `suspect` base props): real licensed photos only
const CON = {
  per: { src: 'brand/photos/vincenzo-peruggia/1.jpg', name: 'VINCENZO PERUGGIA', nick: '“THE THIEF”', credit: 'PHOTO: POLICE FILE · PUBLIC DOMAIN', fx: 0.5, fy: 0.36, aspect: 1.1 },
  mee: { src: 'brand/photos/han-van-meegeren/4.jpg', crop: [0.5, 0, 0.5, 1], name: 'HAN VAN MEEGEREN', nick: '“THE FORGER”', credit: 'PHOTO: KOOS RAUCAMP / ANEFO · CC BY 4.0', fx: 0.42, fy: 0.3, aspect: 1.05 },
  kuj: { src: 'brand/photos/konrad-kujau/3.jpg', crop: [0, 0, 0.6, 1], name: 'KONRAD KUJAU', nick: '“THE DIARY FORGER”', credit: 'PHOTO: TELEPHIL · CC BY-SA 3.0', fx: 0.4, fy: 0.3, aspect: 1.05 },
  kur: { src: 'brand/photos/rudy-kurniawan/2.jpg', name: 'RUDY KURNIAWAN', nick: '“THE WINE COLLECTOR”', credit: 'PHOTO: U.S. ICE · PUBLIC DOMAIN', fx: 0.49, fy: 0.45, aspect: 1.05 },
};
const con = (id, who, x, y, inn, extra, o) => { const b = { ...CON[who], ...(extra || {}) }; if (b.variant !== 'pip' && b.variant !== 'side' && !b.nameSize) b.nameSize = Math.min(44, Math.floor((b.w - 44 - 36) / (b.name.length * 0.5))); if (b.variant === 'side' && !b.nameSize) b.nameSize = 30; el(id, 'suspect', x, y, inn, b, o); };
const STAGES = [
  { at: '@P08-0.7', dur: 1.2, theme: { stage: ['#1d2840', '#121a2c', '#080c16'], blobs: [['#8a6a1f', 0.4], ['#2a3a78', 0.55], ['#3e4a70', 0.5], ['#8a6a1f', 0.3]], dust: '#FFF0C0' } },
  { at: '@P26-0.7', dur: 1.2, theme: { stage: ['#3a2812', '#25190b', '#120c05'], blobs: [['#8a5a1f', 0.55], ['#6a4a2a', 0.5], ['#3e3020', 0.55], ['#8a5a1f', 0.4]], dust: '#FFE4B8' } },
  { at: '@P46-0.7', dur: 1.2, theme: { stage: ['#2a2848', '#1a1830', '#0B0F14'], blobs: [['#4a3a88', 0.5], ['#2a4a68', 0.5], ['#3a3a60', 0.5], ['#4a3a88', 0.35]], dust: '#E4DEFF' } },
  { at: '@P61-0.7', dur: 1.2, theme: { stage: ['#3a1620', '#240d14', '#120609'], blobs: [['#7a2a3c', 0.55], ['#5b1f33', 0.5], ['#3e2030', 0.55], ['#7a2a3c', 0.4]], dust: '#FFD9DF' } },
  { at: '@P77-0.7', dur: 1.2, theme: { stage: ['#26354A', '#152030', '#0B0F14'], blobs: [['#1F5F7A', 0.58], ['#2A4278', 0.55], ['#1E4A4A', 0.5], ['#1F5F7A', 0.4]], dust: '#DCEBFF' } },
];
const R0 = k => K(RM[0], k);
