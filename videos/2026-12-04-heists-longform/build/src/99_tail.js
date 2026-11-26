BM2.scene({
  series: 'decoded', title: 'CASE FILE: 5 HEISTS', duration: __DUR__, fps: 30,
  footnote: ['DOCUMENTED CASES · COURT / POLICE RECORDS · SOURCES IN DESCRIPTION · SENTENCES & MONEY AS REPORTED · VILLAINS & PICKLES ARE ILLUSTRATIONS',
    'PHOTOS: ANTWERP STREET (THORSTEN1997), HATTON GARDEN (UNKNOWN), TROPHY REPLICA (ABEL LAFLEUR): PUBLIC DOMAIN, VIA WIKIMEDIA COMMONS · CAP: FBI, PUBLIC DOMAIN'],
  elements: E, beats: BT, poses: PO, shakes: SK, sfx: SF,
  stages: STAGES, hudOff: [['@P120>+0.1', 900], ...MIST.map(m => [m[0], m[0] + '+0.134'])], travel: { every: 10 },
  captions: { fix: [['The hall?', 'The haul?'], ['The hall is', 'The haul is'], ['diamond center', 'Diamond Centre'], ['rubber-sold', 'rubber-soled'], ["O 'Keeffe,", "O'Keefe,"], ['royal mail', 'Royal Mail'], ['Royal mail is', 'Royal Mail is']], hide: [['@P120>+0.1', 900], ...MIST.map(m => [m[0], m[0] + '+0.134'])], emph: {
    '£2': 'bad', '$100': 'good', '$2': 'good', '$60': 'bad', '£14': 'good', '120': 'bad', '15': 'bad', '30': 'bad', '10': 'bad', '2005': 'bad', '1,000': 'bad', '1,100': 'bad', '2,190': 'accent', '11': 'bad', '2015': 'accent', '1963': 'accent', '1950': 'accent', '1956': 'accent', '1966': 'accent', '1964': 'accent', '2003': 'accent',
    mistake: 'bad', mistakes: 'bad', arrested: 'bad', convicted: 'bad', sentenced: 'bad', prison: 'bad', dumbest: 'bad', dumb: 'bad', fingerprints: 'bad', dna: 'bad', ransom: 'bad', suspect: 'bad', recorded: 'bad', talks: 'bad', missed: 'bad', deadline: 'bad',
    sandwich: 'accent', ketchup: 'accent', monopoly: 'accent', pickles: 'accent', dog: 'accent', hedge: 'accent', specs: 'accent', notarbartolo: 'accent', betchley: 'accent', corbett: 'accent', million: 'good', tons: 'bad' } },
});
