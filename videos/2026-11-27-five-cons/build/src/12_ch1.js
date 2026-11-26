// ---------------- CH1 · THE WINE THAT COULDN'T EXIST (P07-P20) — burgundy room, Kurniawan ----------------
const R1 = k => K(RM[1], k);
// P07 chapter card + case-file intro
el('ch1', 'headline', R1(0) - 360, 40, '@P07-0.3', { kicker: 'CHAPTER ONE', lines: ['THE WINE THAT', [['COULDN\'T ', 'paper'], ['EXIST', 'bad']]], size: 118, underAt: 1.0 }, { out: '@P08-0.2' });
con('k1', 'kur', R1(0) + 640, 50, '@P07-0.2', { w: 440, variant: 'card', file: true, caseNo: 'CASE Nº 1', push: { at: '@P07', to: 1.12, dur: 4 } }, { out: '@P08-0.2' });
bt('@P07', 'graphic-hero', ['ch1', 'k1'], { move: 'whip', dur0: 0.7, fill: 0.82, sy: 480, pose: 'shrug', arc: 0.2 }); sf('@P07-0.6', 'tape_stop_1', -8, 1.0); sf('@P07-0.1', 'cinematic_hit_1', -9, 1.5); sf('@P07+0.9', 'camera_flash_1', -9, 0.6); sk('@P07+0.7', 8);
bt('@P07:wine', 'zoom-on-number', 'k1', { fill: 0.3, maxH: 760, sy: 520, pose: 'point' });
// P08 LA, early 2000s — the pitch: a young collector at the fanciest dinners
el('dc8', 'datecard', R1(1) - 360, -330, '@P08-0.2', { big: '2000s', small: 'LOS ANGELES' }, { out: '@P09-0.2' });
con('k2', 'kur', R1(1) - 150, 40, '@P08-0.3', { w: 880, variant: 'side', quote: ['A YOUNG', 'COLLECTOR'], quoteSub: 'AMERICA\'S FANCIEST WINE DINNERS', quoteSize: 74, quoteAt: '@P08:young', noquote: false, aspect: 0.62, pw: 400 }, { out: '@P09-0.2' });
el('v8', 'victim', R1(1) + 600, 80, '@P08:fanciest-0.2', { kind: 'collector', label: 'THE DINNER GUESTS', sub: 'WINE LOVERS', w: 360, h: 460, reactAt: '@P08:fanciest' }, { out: '@P09-0.2' });
bt('@P08', 'graphic-hero', ['k2', 'v8', 'dc8'], { move: 'whip', fill: 0.72, sy: 500, pose: 'point' }); sf('@P08-0.3', 'swoosh_2', -11, 0.5); sf('@P08-0.1', 'camera_flash_1', -10, 0.6);
bt('@P08:young', 'zoom-on-number', 'k2', { fill: 0.5, maxH: 720, sy: 500 }); bt('@P08:fanciest', 'graphic-hero', ['k2', 'v8'], { fill: 0.74, sy: 480, pose: 'point' }); sf('@P08:fanciest', 'pop_2', -9, 0.3);
// P09 bottles that cost $10,000 like soda; people call him a genius
el('b9', 'bottles', R1(2) - 330, 60, '@P09-0.3', { items: [{ label: '$10,000', at: '@P09:bottles', size: 24 }, { label: '$10,000', at: '@P09:bottles+0.2', size: 24 }, { label: '$10,000', at: '@P09:bottles+0.4', size: 24 }], gap: 190 }, { out: '@P10-0.2' });
el('g9', 'text', R1(2) + 560, 20, '@P09:people-0.1', { lines: [[['“GENIUS”', 'gold']]], size: 140 }, { enter: 'slam', out: '@P10-0.2' });
con('k9', 'kur', R1(2) + 560, 290, '@P09:genius-0.3', { w: 270, variant: 'pip', label: 'THE PITCH', flash: false }, { out: '@P10-0.2' });
bt('@P09', 'graphic-hero', 'b9', { move: 'whip', fill: 0.6, sy: 500, pose: 'point' }); sf('@P09-0.3', 'swoosh_2', -11, 0.5);
bt('@P09:bottles', 'zoom-on-number', 'b9', { fill: 0.5, maxH: 520, sy: 510 }); sf('@P09:bottles', 'pop_2', -9, 0.3); bt('@P09:soda', 'graphic-hero', 'b9', { fill: 0.64, sy: 500, pose: 'shrug' });
bt('@P09:people', 'graphic-hero', ['b9', 'g9', 'k9'], { fill: 0.84, sx: 960, sy: 500, pose: 'shock' }); sf('@P09:genius', 'rubber_stamp_2', -6, 0.5);
// P10 2006 auction, $35M, world record
el('gav10', 'tile', R1(3) - 520, 80, '@P10-0.3', { icon: 'gavel', caption: 'AUCTION · 2006', w: 330, h: 380, iconS: 190 }, { out: '@P11-0.2' });
el('c35', 'counter', R1(3) + 270, 0, '@P10-0.2', { label: 'TWO SALES', sub: 'ONE OF THEM BROKE THE WORLD RECORD', to: 35000000, prefix: '$', at: '@P10:$35', dur: 1.6, tone: 'good', size: 180, w: 1060 }, { out: '@P11-0.2' });
el('wr10', 'stamp', R1(3) + 620, -250, '@P10:world', { text: 'WORLD RECORD', tone: 'accent', size: 70 }, { rot: -0.08, out: '@P11-0.2' });
bt('@P10', 'graphic-hero', ['gav10', 'c35'], { move: 'whip', fill: 0.8, sy: 500, pose: 'point' }); sf('@P10-0.3', 'swoosh_2', -11, 0.5); sf('@P10:sells', 'gavel_1', -7, 0.8);
bt('@P10:$35', 'zoom-on-number', 'c35.value', { fill: 0.5, sy: 510, pose: 'shock' }); sf('@P10:$35', 'money_counter_2', -11, 1.6); sf('@P10:million+0.3', 'cash_register_1', -9, 0.9); sk('@P10:million+0.3', 10);
bt('@P10:world', 'graphic-hero', ['c35', 'wr10'], { fill: 0.7, sy: 500, pose: 'point' }); sf('@P10:world', 'rubber_stamp_2', -5, 0.5);
// P11-P12 the trick, step by step; he is in the corner with an arrow to the step
el('s1', 'card', R1(4) - 1020, 40, '@P11:here\'s-0.1', { w: 440, h: 440, lines: [{ t: '1', size: 130, tone: 'bad', at: '@P11:here\'s' }, { t: 'OLD, CHEAPER', size: 52, at: '@P11:bought' }, { t: 'WINE', size: 52, at: '@P11:bought' }] }, { out: '@P13-0.2' });
el('s2', 'card', R1(4) - 340, 40, '@P11:newer-0.2', { w: 440, h: 440, lines: [{ t: '2', size: 130, tone: 'bad', at: '@P11:mixed' }, { t: 'MIX IN', size: 52, at: '@P11:newer' }, { t: 'NEWER WINE', size: 52, at: '@P11:newer' }] }, { out: '@P13-0.2' });
el('s3', 'card', R1(4) + 340, 40, '@P11:poured-0.1', { w: 440, h: 440, lines: [{ t: '3', size: 130, tone: 'bad', at: '@P11:poured' }, { t: 'POUR INTO', size: 52, at: '@P11:poured' }, { t: 'EMPTY OLD BOTTLES', size: 40, at: '@P11:empty' }] }, { out: '@P13-0.2' });
el('s4', 'card', R1(4) + 1020, 40, '@P12:new-0.1', { w: 440, h: 440, lines: [{ t: '4', size: 130, tone: 'bad', at: '@P12:new' }, { t: 'NEW CORKS', size: 46, at: '@P12:corks' }, { t: 'NEW WAX', size: 46, at: '@P12:wax' }, { t: 'PRINTED LABELS', size: 40, at: '@P12:printed' }] }, { out: '@P13-0.2' });
con('k11', 'kur', R1(4) - 340, 400, '@P11:how', { w: 250, variant: 'pip', label: 'HE DID THIS', flash: false, arrow: { at: '@P11:bought', to: [-120, -220] } }, { out: '@P13-0.2' });
bt('@P11', 'graphic-hero', ['s1', 's2', 's3'], { move: 'whip', fill: 0.92, sy: 480, pose: 'point' }); sf('@P11-0.3', 'swoosh_2', -11, 0.5);
bt('@P11:bought', 'zoom-on-number', ['s1', 'k11'], { fill: 0.4, maxH: 760, sy: 500 }); sf('@P11:here\'s', 'pop_2', -8, 0.3);
bt('@P11:newer', 'zoom-on-number', 's2', { fill: 0.26, maxH: 640, sy: 500 }); sf('@P11:newer', 'pop_2', -8, 0.3); bt('@P11:poured', 'zoom-on-number', 's3', { fill: 0.26, maxH: 640, sy: 500, pose: 'shock' }); sf('@P11:poured', 'pour_glug_1', -10, 1.2);
bt('@P12', 'graphic-hero', ['s3', 's4'], { fill: 0.7, sy: 490, pose: 'point' }); bt('@P12:new#2', 'zoom-on-number', 's4', { fill: 0.28, maxH: 640, sy: 500 }); sf('@P12:corks', 'pop_2', -8, 0.3); sf('@P12:wax', 'pop_1', -9, 0.3); sf('@P12:printed', 'typewriter_2', -11, 1.2);
bt('@P12:famous', 'zoom-on-number', 's4', { fill: 0.34, maxH: 640, sy: 500, pose: 'point' });
// P13 FBI search 2012: kitchen photo, wine factory
el('kit', 'photo', R1(5) - 420, 20, '@P13-0.3', { src: 'brand/photos/rudy-kurniawan/3.jpg', name: 'HIS KITCHEN', role: 'FBI SEARCH · 2012', credit: 'PHOTO: U.S. GOVERNMENT · PUBLIC DOMAIN', treatment: 'paper', fx: 0.5, fy: 0.5, w: 780, aspect: 0.72, tilt: -0.02 }, { out: '@P14-0.2' });
el('t13a', 'tile', R1(5) + 330, -200, '@P13:stacks-0.1', { icon: 'bottle', caption: 'CORKS', w: 250, h: 270, iconS: 130, stamp: '', tilt: 0.03 }, { out: '@P14-0.2' });
el('t13b', 'tile', R1(5) + 620, -200, '@P13:wax-0.1', { icon: 'cash', caption: 'WAX', w: 250, h: 270, iconS: 130, tilt: -0.02 }, { out: '@P14-0.2' });
el('t13c', 'tile', R1(5) + 905, -200, '@P13:thousands-0.4', { icon: 'labels', caption: 'LABELS', w: 250, h: 270, iconS: 130, tilt: 0.03 }, { out: '@P14-0.2' });
el('wf', 'stamp', R1(5) + 620, 150, '@P13:wine+0.1', { text: 'A WINE FACTORY', tone: 'bad', size: 74 }, { rot: -0.05, out: '@P14-0.2' });
bt('@P13', 'graphic-hero', 'kit', { move: 'whip', fill: 0.5, maxH: 700, sx: 800, sy: 480, pose: 'point' }); sf('@P13-0.3', 'camera_flash_1', -9, 0.6);
bt('@P13:prosecutors', 'graphic-hero', ['kit', 'wf'], { fill: 0.82, sy: 500 }); sf('@P13:wine+0.1', 'rubber_stamp_2', -5, 0.5); sk('@P13:wine+0.1', 10);
bt('@P13:stacks', 'graphic-hero', ['t13a', 't13b', 't13c', 'wf'], { fill: 0.5, sx: 900, sy: 470, pose: 'point' }); sf('@P13:stacks-0.1', 'pop_2', -9, 0.3); sf('@P13:wax-0.1', 'pop_2', -9, 0.3); sf('@P13:thousands-0.4', 'pop_1', -9, 0.3);
bt('@P13:thousands', 'zoom-on-number', 't13c', { fill: 0.2, maxH: 400, sx: 900, sy: 440, pose: 'shock' });
// P14 the best tasters drank it and praised it
for (let i = 0; i < 3; i++) el('ts' + i, 'victim', R1(6) - 420 + i * 420, 20, `@P14:tasters+${(i * 0.18).toFixed(2)}`, { kind: 'collector', label: 'EXPERT TASTER', sub: 'LOVED IT', w: 320, h: 410, suit: ['#1FA366', '#2F5DA8', '#8A3FD1'][i], tape: 'TASTER', reactAt: '@P14:praised' }, { out: '@P15-0.2' });
el('pr14', 'stamp', R1(6), 330, '@P14:praised-0.1', { text: 'DRANK IT · PRAISED IT', tone: 'good', size: 70 }, { rot: -0.04, out: '@P15-0.2' });
bt('@P14', 'graphic-hero', 'ts1', { move: 'whip', fill: 0.3, maxH: 620, sy: 500, pose: 'chin' }); sf('@P14-0.3', 'swoosh_2', -11, 0.5);
bt('@P14:tasters', 'graphic-hero', ['ts0', 'ts2', 'pr14'], { fill: 0.72, sy: 500, pose: 'point' }); bt('@P14:praised', 'zoom-on-number', 'pr14', { fill: 0.44, maxH: 300, sy: 500, pose: 'shrug' }); sf('@P14:praised', 'pop_2', -9, 0.3);
// P15 what caught him: not taste, a date; red ring on his face (the catch)
el('h15', 'headline', R1(7) - 520, -250, '@P15-0.3', { kicker: 'WHAT CAUGHT HIM', lines: [[['NOT TASTE.', 'paper']], [['A DATE.', 'bad']]], size: 150, underAt: 1.0 }, { out: '@P16-0.2' });
con('k15', 'kur', R1(7) + 620, 20, '@P15-0.3', { w: 400, variant: 'card', ring: '@P15:date', push: { at: '@P15', to: 1.25, dur: 3 }, flash: false }, { out: '@P16-0.2' });
bt('@P15', 'graphic-hero', ['h15', 'k15'], { move: 'whip', fill: 0.84, sy: 480, pose: 'chin' }); sf('@P15-0.3', 'swoosh_2', -11, 0.5);
bt('@P15:date', 'zoom-on-number', 'h15', { fill: 0.38, maxH: 520, sy: 380, pose: 'shock' }); sf('@P15:date', 'rubber_stamp_2', -5, 0.5); sk('@P15:date', 10);
// P16 2008 NY auction, label going back to 1945
el('lot16', 'card', R1(7) + 380, 280, '@P16-0.2', { w: 780, h: 220, lines: [{ t: 'CLOS SAINT-DENIS', size: 70, at: '@P16:french' }, { t: 'NEW YORK AUCTION · 2008', size: 34, font: 'mono', at: '@P16:auction' }] }, { out: '@P17-0.2' });
el('cal16', 'calendar', R1(7) - 520, 40, '@P16-0.2', { head: 'LABEL SAYS', roll: { from: 2008, to: 1945, at: '@P16:labels', dur: 1.7 }, sub: 'LABELS GO BACK TO 1945', subAt: '@P16:1945', size: 190 }, { out: '@P17-0.2' });
bt('@P16', 'graphic-hero', ['lot16', 'cal16'], { fill: 0.78, sy: 500, pose: 'point' }); sf('@P16', 'paper_slam_2', -10, 0.5);
bt('@P16:labels', 'zoom-on-number', 'cal16.value', { fill: 0.36, sy: 480, pose: 'shock' }); sf('@P16:labels', 'money_counter_1', -13, 1.7);
// P17 winemaker Ponsot objects; his family only started in 1982
el('v17', 'victim', R1(8) - 560, 40, '@P17-0.3', { kind: 'winemaker', label: 'LAURENT PONSOT', sub: 'THE WINEMAKER', w: 380, h: 480, reactAt: '@P17:objected' }, { out: '@P19-0.2' });
el('tl17', 'text', R1(8) + 200, -200, '@P17:family-0.2', { lines: [[['HIS FAMILY STARTED', 'paper']], [['MAKING IT IN ', 'paper'], ['1982', 'good']]], size: 76 }, { out: '@P18-0.2' });
bt('@P17', 'graphic-hero', 'v17', { move: 'whip', fill: 0.28, maxH: 740, sy: 500, pose: 'point' }); sf('@P17-0.3', 'swoosh_2', -11, 0.5);
bt('@P17:objected', 'zoom-on-number', 'v17', { fill: 0.3, maxH: 740, sy: 500, pose: 'shock' }); sf('@P17:objected', 'wrong_buzzer_2', -11, 0.6);
bt('@P17:family', 'graphic-hero', ['v17', 'tl17'], { fill: 0.8, sy: 480, pose: 'point' }); bt('@P17:1982', 'zoom-on-number', 'tl17', { fill: 0.4, maxH: 300, sy: 360, pose: 'point' }); sf('@P17:1982', 'ding_2', -9, 0.7);
// P18 labels were thirty-seven years older than the wine
el('ru18', 'ruler', R1(8) + 400, 40, '@P18-0.3', { from: '1945', to: '1982', n: 37, at: '@P18:those', dur: 1.5 }, { out: '@P19-0.2' });
bt('@P18', 'graphic-hero', 'ru18', { fill: 0.64, maxH: 700, sy: 500, pose: 'point' }); sf('@P18-0.3', 'paper_slam_2', -10, 0.5); sf('@P18:those', 'clock_ticking_1', -10, 1.5);
bt('@P18:37', 'zoom-on-number', 'ru18.n', { fill: 0.4, maxH: 420, sy: 400, pose: 'shock' }); sf('@P18:older', 'rubber_stamp_2', -5, 0.5); sk('@P18:older', 12);
// P19 billionaire Bill Koch: $2.1M for 219 bottles he says are fake
el('v19', 'victim', R1(9) - 560, 40, '@P19-0.3', { kind: 'billionaire', label: 'BILL KOCH', sub: 'BILLIONAIRE COLLECTOR', w: 380, h: 480, reactAt: '@P19:fake' }, { out: '@P20-0.2' });
el('c19', 'counter', R1(9) + 130, -120, '@P19-0.2', { label: 'HE PAID', to: 2100000, prefix: '$', at: '@P19:$2', dur: 1.2, tone: 'bad', size: 150, w: 900 }, { out: '@P20-0.2' });
el('b219', 'counter', R1(9) + 130, 200, '@P19:$2+0.6', { label: 'FOR BOTTLES HE SAYS ARE FAKE', to: 219, at: '@P19:219', dur: 0.9, tone: 'paper', size: 150, w: 900 }, { out: '@P20-0.2' });
bt('@P19', 'graphic-hero', ['v19', 'c19'], { move: 'whip', fill: 0.76, sy: 490, pose: 'point' }); sf('@P19-0.3', 'swoosh_2', -11, 0.5);
bt('@P19:$2', 'zoom-on-number', 'c19.value', { fill: 0.48, sy: 480 }); sf('@P19:$2', 'money_counter_2', -12, 1.3);
bt('@P19:219', 'zoom-on-number', 'b219.value', { fill: 0.48, sy: 520, pose: 'shock' }); sf('@P19:219', 'pop_2', -8, 0.4); bt('@P19:fake', 'graphic-hero', ['v19', 'c19', 'b219'], { fill: 0.82, sy: 500, pose: 'point' });
// P20 verdict: Kurniawan behind bars, 10 years, $28M+
con('k20', 'kur', R1(10) - 520, 40, '@P20-0.3', { w: 420, variant: 'card', bars: '@P20:10', stamps: [{ text: 'CONVICTED 2013', at: '@P20:jury', tone: 'bad', size: 52, rot: -0.1, y: 60 }], push: { at: '@P20', to: 1.2, dur: 4 }, flash: false }, { out: '@P21-0.2' });
el('y20', 'counter', R1(10) + 220, -130, '@P20:sentenced-0.1', { label: 'SENTENCED TO', sub: 'IN PRISON', to: 10, suffix: ' YEARS', at: '@P20:10', dur: 0.7, tone: 'bad', size: 170, w: 900 }, { out: '@P21-0.2' });
el('m20', 'counter', R1(10) + 220, 210, '@P20:ordered-0.1', { label: 'AND MUST PAY BACK MORE THAN', to: 28000000, prefix: '$', at: '@P20:$28', dur: 1.3, tone: 'bad', size: 130, w: 900 }, { out: '@P21-0.2' });
bt('@P20', 'graphic-hero', ['k20', 'y20'], { move: 'whip', fill: 0.78, sy: 490, pose: 'point' }); sf('@P20-0.3', 'swoosh_2', -11, 0.5);
bt('@P20:jury', 'zoom-on-number', 'k20', { fill: 0.28, maxH: 740, sy: 500, pose: 'shock' }); sf('@P20:jury', 'gavel_1', -5, 0.8); sk('@P20:jury', 12);
bt('@P20:10', 'zoom-on-number', 'y20.value', { fill: 0.42, maxH: 420, sy: 480 }); sf('@P20:10-0.1', 'cell_door_1', -7, 1.2); sf('@P20:10', 'deep_boom_1', -6, 1.0);
bt('@P20:$28', 'zoom-on-number', 'm20.value', { fill: 0.46, maxH: 360, sy: 520 }); sf('@P20:$28', 'money_counter_1', -12, 1.4);
bt('@P20:ordered', 'graphic-hero', ['k20', 'y20', 'm20'], { fill: 0.84, sy: 500, pose: 'chin' });
