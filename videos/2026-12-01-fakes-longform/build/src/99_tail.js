const BEATLABELS = [['@P08', '@P10', 'THE CASE'], ['@P10', '@P11', 'THE PITCH'], ['@P11', '@P13', 'THE TRICK'], ['@P13', '@P17', 'THE MYSTERY'], ['@P17', '@P22', 'THE CATCH'], ['@P22', '@P24', 'THE SENTENCE'],
  ['@P26', '@P27', 'THE CASE'], ['@P27', '@P30', 'THE PITCH'], ['@P30', '@P32', 'THE TRICK'], ['@P32', '@P37', 'THE BIG ONE'], ['@P37', '@P42', 'THE CATCH'], ['@P42', '@P45', 'THE SENTENCE'],
  ['@P46', '@P47', 'THE CASE'], ['@P47', '@P48', 'THE PITCH'], ['@P48', '@P53', 'THE TRICK'], ['@P53', '@P54', 'THE BIG REVEAL'], ['@P54', '@P59', 'THE CATCH'], ['@P59', '@P60', 'THE SENTENCE'], ['@P60', '@P61', 'THE ORDER'],
  ['@P61', '@P62', 'THE CASE'], ['@P62', '@P66', 'THE PITCH'], ['@P66', '@P69', 'THE TRICK'], ['@P69', '@P73', 'THE CATCH'], ['@P73', '@P75', 'THE SEARCH'], ['@P75', '@P77', 'THE SENTENCE'],
  ['@P77', '@P83', 'THE EVIDENCE'], ['@P83', '@P84', 'THE DETAIL'], ['@P84', '@P88', 'THE TEST']];
BEATLABELS.forEach(([a, b, t], i) => el('bl' + i, 'beatlabel', 1856, 140, a + '+0.12', { text: t }, { layer: 'screen', out: b }));
BM2.scene({
  series: 'decoded', title: 'CASE FILE: 4 FAKES', duration: __DUR__, fps: 30,
  footnote: ['DOCUMENTED CASES · COURT / ARCHIVE RECORDS · SOURCES IN DESCRIPTION · DATES & MONEY AS REPORTED',
    'PHOTOS: POLICE FILES, U.S. ICE / GOVERNMENT (PUBLIC DOMAIN) · KOOS RAUCAMP / ANEFO (CC BY 4.0) · TELEPHIL & VAN MEEGEREN PAINTING (CC BY-SA 3.0) · MONA LISA: PD REPRODUCTION'],
  elements: E, beats: BT, poses: PO, shakes: SK, sfx: SF,
  stages: STAGES, hudOff: [['@P88>+0.1', 900]], travel: { every: 10 },
  captions: { fix: [], hide: [['@P88>+0.1', 900]], emph: {
    '$35': 'good', '37': 'bad', '219': 'bad', '$28': 'bad', '$2': 'bad', '1': 'bad', '65': 'bad', '500': 'bad', '10': 'bad', '2013': 'bad', '1982': 'good', '1945': 'bad',
    fake: 'bad', fakes: 'bad', forger: 'bad', forgery: 'bad', real: 'good', arrested: 'bad', arrest: 'bad', convicted: 'bad', prison: 'bad', sentenced: 'bad', factory: 'bad', record: 'accent', wrong: 'bad',
    tiny: 'accent', check: 'accent', checks: 'accent', date: 'accent', letter: 'accent', 'f': 'bad', nothing: 'bad', dangerous: 'bad', million: 'bad', nine: 'bad', stern: 'accent', 'peruggia': 'accent', 'kujau': 'accent', 'meegeren': 'accent', 'kurniawan': 'accent' } },
});
