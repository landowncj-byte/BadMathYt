const BEATLABELS = [['@P07', '@P08', 'THE CASE'], ['@P08', '@P10', 'THE PITCH'], ['@P11', '@P13', 'THE TRICK'], ['@P15', '@P20', 'THE CATCH'], ['@P20', '@P21', 'THE SENTENCE'],
  ['@P21', '@P22', 'THE CASE'], ['@P22', '@P27', 'THE PITCH'], ['@P27', '@P29', 'THE TRICK'], ['@P29', '@P32', 'THE CATCH'], ['@P32', '@P34', 'THE SENTENCE'],
  ['@P34', '@P35', 'THE CASE'], ['@P36', '@P37', 'THE JOB'], ['@P37', '@P41', 'THE TRICK'], ['@P41', '@P45', 'THE BIG ONE'], ['@P45', '@P46', 'THE CATCH'], ['@P46', '@P48', 'THE SENTENCE'],
  ['@P48', '@P49', 'THE CASE'], ['@P49', '@P52', 'THE PITCH'], ['@P52', '@P58', 'THE TRICK'], ['@P58', '@P60', 'THE SENTENCE'],
  ['@P60', '@P61', 'THE CASE'], ['@P61', '@P64', 'THE PITCH'], ['@P64', '@P69', 'THE TRICK'], ['@P69', '@P70', 'THE CATCH'], ['@P70', '@P71', 'THE SENTENCE'],
  ['@P71', '@P79', 'THE EVIDENCE'], ['@P79', '@P81', 'THE TEST']];
BEATLABELS.forEach(([a, b, t], i) => el('bl' + i, 'beatlabel', 1856, 140, a, { text: t }, { layer: 'screen', out: b }));
BM2.scene({
  series: 'decoded', title: 'CASE FILE: 5 CONS', duration: __DUR__, fps: 30,
  footnote: ['DOCUMENTED CASES · COURT / DOJ / SEC RECORDS · SOURCES IN DESCRIPTION · NOT FINANCIAL ADVICE', 'PHOTOS: U.S. ICE, MIAMI-DADE COUNTY, U.S. GOVERNMENT (PUBLIC DOMAIN). CARTOON CARDS = ILLUSTRATIONS, NOT PHOTOS'],
  elements: E, beats: BT, poses: PO, shakes: SK, sfx: SF,
  stages: STAGES, hudOff: [['@P81>+0.1', 900]], travel: { every: 10 },
  captions: { fix: [], hide: [['@P81>+0.1', 900]], emph: {
    '$2.1': 'bad', '$175': 'bad', '$16.5': 'bad', fake: 'bad', rigged: 'bad', '$35': 'good', '37': 'bad', '219': 'bad', '$28': 'bad', '$8': 'bad', '11': 'bad', '18': 'bad', pork: 'bad', '$2.5': 'good',
    '$500': 'good', '$650': 'bad', '$150': 'bad', '$1,925': 'bad', '700': 'bad', '22': 'good', '4.5': 'paper', '$3.5': 'bad', '4.25': 'good', '300,000': 'bad', '$18,000': 'bad', '85': 'bad', '$287.5': 'bad', '14': 'bad', '25': 'bad', '200': 'bad',
    guilty: 'bad', prison: 'bad', convicted: 'bad', exist: 'bad', existed: 'bad', cons: 'accent', pattern: 'accent', number: 'accent', check: 'accent', sham: 'bad' } },
});
