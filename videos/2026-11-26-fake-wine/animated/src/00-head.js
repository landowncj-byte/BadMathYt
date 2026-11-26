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
