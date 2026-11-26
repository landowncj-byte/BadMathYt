// ---------------- CH4 · THE WINE IN THE KITCHEN (P61-P76) — burgundy room, Kurniawan ----------------
const R4 = k => K(RM[4], k);
// P61 chapter card + case file
el('ch4', 'headline', R4(0) - 400, 40, '@P61-0.3', { kicker: 'CHAPTER FOUR', lines: ['THE WINE IN', [['THE KITCHEN', 'bad']]], size: 140, underAt: 1.0 }, { out: '@P62-0.2' });
con('w1', 'kur', R4(0) + 600, 50, '@P61-0.2', { w: 440, variant: 'card', file: true, caseNo: 'CASE Nº 4', push: { at: '@P61', to: 1.12, dur: 3 } }, { out: '@P62-0.2' });
bt('@P61', 'graphic-hero', ['ch4', 'w1'], { move: 'whip', dur0: 0.7, fill: 0.84, sy: 480, pose: 'shrug', arc: 0.2 }); sf('@P61-0.6', 'tape_stop_1', -8, 1.0); sf('@P61-0.1', 'cinematic_hit_1', -9, 1.5); sf('@P61+0.9', 'camera_flash_1', -9, 0.6); sk('@P61+0.7', 8);
bt('@P61:kitchen', 'zoom-on-number', 'w1', { fill: 0.3, maxH: 760, sy: 520, pose: 'point' });
// P62 the pitch: a young collector, a star of the rare wine world
el('dc62', 'datecard', R4(1) - 700, -330, '@P62-0.2', { big: '2000s', small: 'LOS ANGELES' }, { out: '@P63-0.2' });
con('w62', 'kur', R4(1) - 100, 40, '@P62-0.3', { w: 900, variant: 'side', quote: ['A YOUNG', 'COLLECTOR.', 'A STAR OF', 'RARE WINE.'], quoteSize: 62, quoteAt: '@P62:young', noquote: true, aspect: 0.66, pw: 400 }, { out: '@P63-0.2' });
bt('@P62', 'graphic-hero', ['dc62', 'w62'], { move: 'whip', fill: 0.62, sy: 500, pose: 'point' }); sf('@P62-0.3', 'swoosh_2', -11, 0.5); sf('@P62-0.1', 'camera_flash_1', -10, 0.6);
bt('@P62:young', 'zoom-on-number', 'w62', { fill: 0.5, maxH: 740, sy: 500 }); sf('@P62:young', 'typewriter_2', -11, 1.2);
bt('@P62:star', 'graphic-hero', ['w62'], { fill: 0.62, maxH: 800, sy: 500, pose: 'shock' }); sf('@P62:star', 'pop_2', -9, 0.3);
// P63 opens rare old bottles at fancy dinners like they're nothing
for (let i = 0; i < 2; i++) el('d63' + i, 'victim', R4(2) - 700 + i * 380, 40, `@P63:fancy+${(i * 0.2).toFixed(2)}`, { kind: 'collector', label: 'DINNER GUEST', sub: 'WINE LOVER', w: 320, h: 420, suit: ['#2F5DA8', '#8A3FD1'][i], tape: 'DINNER', reactAt: '@P63:nothing' }, { out: '@P64-0.2' });
el('b63', 'bottles', R4(2) + 420, 80, '@P63:opens-0.3', { items: [{ label: '1945', at: '@P63:opens' }, { label: '1982', at: '@P63:rare' }, { label: '1990', at: '@P63:old' }], gap: 200 }, { out: '@P64-0.2' });
bt('@P63', 'graphic-hero', ['b63'], { move: 'whip', fill: 0.4, maxH: 560, sx: 1100, sy: 500, pose: 'point' }); sf('@P63-0.3', 'swoosh_2', -11, 0.5); sf('@P63:opens', 'cork_pop_1', -8, 0.8);
bt('@P63:dinners', 'graphic-hero', ['d630', 'd631', 'b63'], { fill: 0.92, sy: 500, pose: 'chin' }); sf('@P63:dinners', 'glass_clink_1', -10, 1.0);
bt('@P63:nothing', 'zoom-on-number', 'b63', { fill: 0.5, maxH: 520, sx: 1100, sy: 520, pose: 'shrug' });
// P64 2006: two auctions, $35 million, world record
el('g64', 'tile', R4(3) - 520, 80, '@P64-0.3', { icon: 'gavel', caption: 'AUCTIONS · 2006', cap: 30, w: 340, h: 390, iconS: 190 }, { out: '@P65-0.2' });
el('c64', 'counter', R4(3) + 270, 0, '@P64:two-0.2', { label: 'TWO AUCTIONS BRING IN ABOUT', to: 35, prefix: '$', suffix: ' MILLION', at: '@P64:$35', dur: 1.5, tone: 'good', size: 150, w: 1060 }, { out: '@P65-0.2' });
el('wr64', 'stamp', R4(3) + 620, -250, '@P64:record-0.1', { text: 'WORLD RECORD', tone: 'accent', size: 70 }, { rot: -0.08, out: '@P65-0.2' });
bt('@P64', 'graphic-hero', ['g64', 'c64'], { move: 'whip', fill: 0.8, sy: 500, pose: 'point' }); sf('@P64-0.3', 'swoosh_2', -11, 0.5); sf('@P64:auctions', 'gavel_1', -7, 0.8);
bt('@P64:$35', 'zoom-on-number', 'c64.value', { fill: 0.5, sy: 510, pose: 'shock' }); sf('@P64:$35', 'money_counter_2', -11, 1.6); sf('@P64:million+0.3', 'cash_register_1', -9, 0.9); sk('@P64:million+0.3', 10);
bt('@P64:second', 'graphic-hero', ['c64', 'wr64'], { fill: 0.7, sy: 500, pose: 'point' }); sf('@P64:record', 'rubber_stamp_2', -5, 0.5);
// P65 how do you fake wine the best tasters are drinking?
el('q65', 'text', R4(4) - 520, 0, '@P65-0.3', { lines: [[['?', 'accent']]], size: 440 }, { out: '@P66-0.2' });
for (let i = 0; i < 3; i++) el('t65' + i, 'victim', R4(4) + 60 + i * 380, 40, `@P65:tasters+${(i * 0.2).toFixed(2)}`, { kind: 'collector', label: 'EXPERT TASTER', sub: 'DRINKING IT', w: 320, h: 420, suit: ['#1FA366', '#2F5DA8', '#8A3FD1'][i], tape: 'TASTER', reactAt: '@P65:drinking' }, { out: '@P66-0.2' });
bt('@P65', 'graphic-hero', ['q65'], { move: 'whip', fill: 0.28, maxH: 640, sy: 480, pose: 'shrug' }); sf('@P65-0.3', 'swoosh_2', -11, 0.5);
bt('@P65:fake', 'graphic-hero', ['q65', 't650'], { fill: 0.7, sy: 480, pose: 'chin' });
bt('@P65:tasters', 'graphic-hero', ['t650', 't652'], { fill: 0.7, sy: 500, pose: 'point' }); sf('@P65:tasters', 'pop_2', -9, 0.3);
bt('@P65:drinking', 'zoom-on-number', 't651', { fill: 0.24, maxH: 560, sy: 500, pose: 'shock' }); sf('@P65:drinking', 'glass_clink_1', -10, 1.0);
// P66 the trick, steps 1-3 (his actions), pip in the corner with an arrow
el('s1', 'card', R4(5) - 1020, 40, '@P66:older-0.2', { w: 440, h: 440, lines: [{ t: '1', size: 130, tone: 'bad', at: '@P66:older-0.1' }, { t: 'OLDER, CHEAPER', size: 46, at: '@P66:older' }, { t: 'WINE', size: 52, at: '@P66:cheaper' }] }, { out: '@P68-0.2' });
el('s2', 'card', R4(5) - 340, 40, '@P66:mixed-0.2', { w: 440, h: 440, lines: [{ t: '2', size: 130, tone: 'bad', at: '@P66:mixed-0.1' }, { t: 'MIX IN', size: 52, at: '@P66:mixed' }, { t: 'NEWER WINE', size: 52, at: '@P66:newer' }] }, { out: '@P68-0.2' });
el('s3', 'card', R4(5) + 340, 40, '@P66:poured-0.2', { w: 440, h: 440, lines: [{ t: '3', size: 130, tone: 'bad', at: '@P66:poured-0.1' }, { t: 'POUR INTO', size: 52, at: '@P66:poured' }, { t: 'OLD BOTTLES', size: 48, at: '@P66:old' }] }, { out: '@P68-0.2' });
con('w66', 'kur', R4(5) - 340, 400, '@P66:prosecutors-0.2', { w: 250, variant: 'pip', label: 'HE DID THIS', flash: false, arrow: { at: '@P66:older', to: [-340, -230] } }, { out: '@P68-0.2' });
bt('@P66', 'graphic-hero', ['s1', 's2', 's3'], { move: 'whip', fill: 0.92, sy: 480, pose: 'point' }); sf('@P66-0.3', 'swoosh_2', -11, 0.5);
bt('@P66:older', 'zoom-on-number', ['s1', 'w66'], { fill: 0.4, maxH: 760, sy: 500 }); sf('@P66:older-0.1', 'pop_2', -8, 0.3);
bt('@P66:mixed', 'zoom-on-number', 's2', { fill: 0.26, maxH: 640, sy: 500 }); sf('@P66:mixed-0.1', 'pop_2', -8, 0.3); sf('@P66:mixed', 'stir_pot_1', -14, 1.2);
bt('@P66:poured', 'zoom-on-number', 's3', { fill: 0.26, maxH: 640, sy: 500, pose: 'shock' }); sf('@P66:poured', 'pour_glug_1', -10, 1.2);
// P67 new corks, wax, printed labels
el('s4', 'card', R4(5) + 1020, 40, '@P67:new-0.2', { w: 440, h: 440, lines: [{ t: '4', size: 130, tone: 'bad', at: '@P67:new-0.1' }, { t: 'NEW CORKS · NEW WAX', size: 36, at: '@P67:corks' }, { t: 'PRINTED LABELS', size: 44, at: '@P67:printed' }] }, { out: '@P68-0.2' });
el('k67', 'tile', R4(5) + 1020, -330, '@P67:corks-0.2', { icon: 'bottle', caption: 'CORKS', cap: 28, w: 240, h: 250, iconS: 120, tilt: -0.03 }, { out: '@P68-0.2' });
el('x67', 'tile', R4(5) + 1280, -330, '@P67:wax-0.2', { icon: 'badge', caption: 'WAX', cap: 28, w: 240, h: 250, iconS: 120, tilt: 0.02 }, { out: '@P68-0.2' });
el('l67', 'tile', R4(5) + 1540, -330, '@P67:printed-0.2', { icon: 'labels', caption: 'LABELS', cap: 28, w: 240, h: 250, iconS: 120, tilt: -0.02 }, { out: '@P68-0.2' });
bt('@P67', 'graphic-hero', ['s3', 's4'], { fill: 0.7, sy: 490, pose: 'point' }); sf('@P67-0.1', 'swoosh_2', -11, 0.5);
bt('@P67:new', 'zoom-on-number', 's4', { fill: 0.28, maxH: 640, sy: 500 }); sf('@P67:corks', 'cork_pop_1', -9, 0.6); sf('@P67:wax', 'wax_plop_1', -10, 0.6); sf('@P67:printed', 'label_slap_1', -10, 0.6);
bt('@P67:famous', 'graphic-hero', ['s4', 'k67', 'x67', 'l67'], { fill: 0.6, sx: 1250, sy: 460, pose: 'shock' });
// P68 for years, plenty of experts drank it and bought more
for (let i = 0; i < 3; i++) el('e68' + i, 'victim', R4(6) - 420 + i * 420, 20, `@P68:experts+${(0.1 + i * 0.2).toFixed(2)}`, { kind: 'collector', label: 'EXPERT TASTER', sub: 'LOVED IT', w: 320, h: 410, suit: ['#1FA366', '#2F5DA8', '#8A3FD1'][i], tape: 'TASTER', reactAt: '@P68:bought' }, { out: '@P69-0.2' });
el('pr68', 'stamp', R4(6), 330, '@P68:drank-0.1', { text: 'DRANK IT · BOUGHT MORE', tone: 'good', size: 66 }, { rot: -0.04, out: '@P69-0.2' });
bt('@P68', 'graphic-hero', ['e681'], { move: 'whip', fill: 0.3, maxH: 620, sy: 500, pose: 'chin' }); sf('@P68-0.3', 'swoosh_2', -11, 0.5);
bt('@P68:experts', 'graphic-hero', ['e680', 'e682', 'pr68'], { fill: 0.72, sy: 500, pose: 'point' });
bt('@P68:bought', 'zoom-on-number', 'pr68', { fill: 0.44, maxH: 300, sy: 500, pose: 'shrug' }); sf('@P68:drank', 'pop_2', -9, 0.3); sf('@P68:bought', 'cash_register_1', -10, 0.9);
// P69 what caught him: not taste, a date; red ring
el('h69', 'headline', R4(7) - 520, -250, '@P69-0.3', { kicker: 'WHAT CAUGHT HIM', lines: [[['NOT TASTE.', 'paper']], [['A DATE.', 'bad']]], size: 150, underAt: 1.0 }, { out: '@P70-0.2' });
con('w69', 'kur', R4(7) + 620, 20, '@P69-0.3', { w: 400, variant: 'card', ring: '@P69:date', push: { at: '@P69', to: 1.25, dur: 3 }, flash: false }, { out: '@P70-0.2' });
bt('@P69', 'graphic-hero', ['h69', 'w69'], { move: 'whip', fill: 0.84, sy: 480, pose: 'chin' }); sf('@P69-0.3', 'swoosh_2', -11, 0.5);
bt('@P69:date', 'zoom-on-number', 'h69', { fill: 0.38, maxH: 520, sy: 380, pose: 'shock' }); sf('@P69:date', 'rubber_stamp_2', -5, 0.5); sk('@P69:date', 10);
// P70 2008 New York auction, labels going back to 1945
el('lot70', 'card', R4(8) + 380, 280, '@P70-0.2', { w: 780, h: 220, lines: [{ t: 'CLOS SAINT-DENIS', size: 70, at: '@P70:french' }, { t: 'NEW YORK AUCTION · 2008', size: 34, font: 'mono', at: '@P70:auction' }] }, { out: '@P71-0.2' });
el('cal70', 'calendar', R4(8) - 520, 40, '@P70-0.2', { head: 'LABEL SAYS', roll: { from: 2008, to: 1945, at: '@P70:labels', dur: 1.7 }, sub: 'LABELS GO BACK TO 1945', subAt: '@P70:1945', size: 190 }, { out: '@P71-0.2' });
bt('@P70', 'graphic-hero', ['lot70', 'cal70'], { move: 'whip', fill: 0.78, sy: 500, pose: 'point' }); sf('@P70', 'paper_slam_2', -10, 0.5);
bt('@P70:french', 'graphic-hero', ['lot70', 'cal70'], { fill: 0.84, sy: 500, pose: 'chin' });
bt('@P70:labels', 'zoom-on-number', 'cal70.value', { fill: 0.36, sy: 480, pose: 'shock' }); sf('@P70:labels', 'money_counter_1', -13, 1.7);
// P71 the winemaker objects; his family started in 1982
el('v71', 'victim', R4(9) - 560, 40, '@P71-0.3', { kind: 'winemaker', label: 'LAURENT PONSOT', sub: 'THE WINEMAKER', w: 380, h: 480, reactAt: '@P71:objected' }, { out: '@P72-0.2' });
el('tl71', 'text', R4(9) + 200, -120, '@P71:family-0.2', { lines: [[['HIS FAMILY STARTED', 'paper']], [['MAKING IT IN ', 'paper'], ['1982', 'good']]], size: 76 }, { out: '@P72-0.2' });
bt('@P71', 'graphic-hero', 'v71', { move: 'whip', fill: 0.28, maxH: 740, sy: 500, pose: 'point' }); sf('@P71-0.3', 'swoosh_2', -11, 0.5);
bt('@P71:objected', 'zoom-on-number', 'v71', { fill: 0.3, maxH: 740, sy: 500, pose: 'shock' }); sf('@P71:objected', 'wrong_buzzer_2', -11, 0.6);
bt('@P71:family', 'graphic-hero', ['v71', 'tl71'], { fill: 0.8, sy: 480, pose: 'point' });
bt('@P71:1982', 'zoom-on-number', 'tl71', { fill: 0.4, maxH: 300, sy: 360, pose: 'point' }); sf('@P71:1982', 'ding_2', -9, 0.7);
// P72 37 years older than the wine; pulled from the sale
el('ru72', 'ruler', R4(9) + 1000, 40, '@P72-0.3', { from: '1945', to: '1982', n: 37, at: '@P72:those', dur: 1.5 }, { out: '@P73-0.2' });
el('pl72', 'stamp', R4(9) + 1000, 330, '@P72:pulled-0.1', { text: 'PULLED FROM THE SALE', tone: 'bad', size: 64 }, { rot: -0.04, out: '@P73-0.2' });
bt('@P72', 'graphic-hero', 'ru72', { move: 'whip', fill: 0.64, maxH: 700, sy: 500, pose: 'point' }); sf('@P72-0.3', 'paper_slam_2', -10, 0.5); sf('@P72:those', 'clock_ticking_1', -10, 1.5);
bt('@P72:37', 'graphic-hero', 'ru72', { fill: 0.74, maxH: 760, sy: 500, pose: 'shock' }); sf('@P72:older', 'rubber_stamp_2', -5, 0.5); sk('@P72:older', 12);
bt('@P72:pulled', 'graphic-hero', ['ru72', 'pl72'], { fill: 0.72, sy: 540, pose: 'chin' }); sf('@P72:pulled', 'rubber_stamp_2', -6, 0.5);
// P73 FBI, his home: bottles, corks, wax, thousands of labels = a wine factory
el('kit', 'photo', R4(10) - 420, 20, '@P73:fbi-0.3', { src: 'brand/photos/rudy-kurniawan/3.jpg', name: 'HIS KITCHEN', role: 'FBI SEARCH · 2012', credit: 'PHOTO: U.S. GOVERNMENT · PUBLIC DOMAIN', treatment: 'paper', fx: 0.5, fy: 0.5, w: 780, aspect: 0.72, tilt: -0.02 }, { out: '@P74-0.2' });
con('w73', 'kur', R4(10) - 1000, 40, '@P73:arrested-0.2', { w: 330, variant: 'card', flash: false, credit: '', stamps: [{ text: 'ARRESTED 2012', at: '@P73:arrested', tone: 'bad', size: 36, rot: -0.1, y: 40 }] }, { out: '@P74-0.2' });
el('t73a', 'tile', R4(10) + 330, -290, '@P73:corks-0.1', { icon: 'bottle', caption: 'CORKS', cap: 28, w: 250, h: 270, iconS: 130, tilt: 0.03 }, { out: '@P74-0.2' });
el('t73b', 'tile', R4(10) + 620, -290, '@P73:wax-0.1', { icon: 'badge', caption: 'WAX', cap: 28, w: 250, h: 270, iconS: 130, tilt: -0.02 }, { out: '@P74-0.2' });
el('t73c', 'tile', R4(10) + 905, -290, '@P73:thousands-0.4', { icon: 'labels', caption: 'LABELS', cap: 28, w: 250, h: 270, iconS: 130, tilt: 0.03 }, { out: '@P74-0.2' });
el('wf', 'stamp', R4(10) + 620, 20, '@P73:factory-0.2', { text: 'A WINE FACTORY', tone: 'bad', size: 74 }, { rot: -0.05, out: '@P74-0.2' });
bt('@P73', 'graphic-hero', ['w73', 'kit'], { move: 'whip', fill: 0.84, sy: 480, pose: 'point' }); sf('@P73-0.3', 'camera_flash_1', -9, 0.6);
bt('@P73:arrested', 'zoom-on-number', 'w73', { fill: 0.22, maxH: 560, sy: 500, pose: 'shock' }); sf('@P73:arrested', 'handcuff_click_1', -7, 0.8); sf('@P73:arrested', 'rubber_stamp_2', -7, 0.5);
bt('@P73:inside', 'graphic-hero', ['kit'], { fill: 0.5, maxH: 700, sx: 800, sy: 480, pose: 'point' });
bt('@P73:corks', 'graphic-hero', ['t73a', 't73b', 't73c', 'wf'], { fill: 0.5, sx: 900, sy: 470, pose: 'point' }); sf('@P73:corks-0.1', 'pop_2', -9, 0.3); sf('@P73:wax-0.1', 'pop_2', -9, 0.3); sf('@P73:thousands-0.4', 'pop_1', -9, 0.3);
bt('@P73:thousands', 'zoom-on-number', 't73c', { fill: 0.2, maxH: 400, sx: 900, sy: 440, pose: 'shock' });
bt('@P73:factory', 'graphic-hero', ['kit', 'wf'], { fill: 0.82, sy: 500, pose: 'chin' }); sf('@P73:factory', 'rubber_stamp_2', -5, 0.5); sk('@P73:factory', 10);
// P74 Bill Koch: $2.1M for 219 bottles he says were fake
el('v74', 'victim', R4(11) - 560, 40, '@P74-0.3', { kind: 'billionaire', label: 'BILL KOCH', sub: 'BILLIONAIRE COLLECTOR', w: 380, h: 480, reactAt: '@P74:fake' }, { out: '@P75-0.2' });
el('c74', 'counter', R4(11) + 130, -120, '@P74-0.2', { label: 'HE PAID', to: 2.1, decimals: 1, prefix: '$', suffix: ' MILLION', at: '@P74:$2', dur: 1.2, tone: 'bad', size: 130, w: 900 }, { out: '@P75-0.2' });
el('b74', 'counter', R4(11) + 130, 200, '@P74:$2+0.6', { label: 'FOR BOTTLES HE SAYS WERE FAKE', to: 219, at: '@P74:219', dur: 0.9, tone: 'paper', size: 150, w: 900 }, { out: '@P75-0.2' });
bt('@P74', 'graphic-hero', ['v74', 'c74'], { move: 'whip', fill: 0.76, sy: 490, pose: 'point' }); sf('@P74-0.3', 'swoosh_2', -11, 0.5);
bt('@P74:$2', 'zoom-on-number', 'c74.value', { fill: 0.48, sy: 480 }); sf('@P74:$2', 'money_counter_2', -12, 1.3);
bt('@P74:219', 'zoom-on-number', 'b74.value', { fill: 0.48, sy: 520, pose: 'shock' }); sf('@P74:219', 'pop_2', -8, 0.4);
bt('@P74:fake', 'graphic-hero', ['v74', 'c74', 'b74'], { fill: 0.82, sy: 500, pose: 'point' });
// P75 verdict: convicted 2013, 10 years, $28.4M
con('w75', 'kur', R4(12) - 520, 40, '@P75-0.3', { w: 420, variant: 'card', bars: '@P75:10', stamps: [{ text: 'CONVICTED 2013', at: '@P75:convicted', tone: 'bad', size: 52, rot: -0.1, y: 60 }], push: { at: '@P75', to: 1.2, dur: 5 }, flash: false }, { out: '@P76-0.2' });
el('y75', 'counter', R4(12) + 220, -130, '@P75:sentenced-0.1', { label: 'SENTENCED TO', sub: 'IN PRISON', to: 10, suffix: ' YEARS', at: '@P75:10', dur: 0.7, tone: 'bad', size: 170, w: 900 }, { out: '@P76-0.2' });
el('m75', 'counter', R4(12) + 220, 210, '@P75:ordered-0.1', { label: 'AND MUST PAY BACK ABOUT', to: 28.4, decimals: 1, prefix: '$', suffix: ' MILLION', at: '@P75:$28', dur: 1.3, tone: 'bad', size: 120, w: 900 }, { out: '@P76-0.2' });
bt('@P75', 'graphic-hero', ['w75', 'y75'], { move: 'whip', fill: 0.78, sy: 490, pose: 'point' }); sf('@P75-0.3', 'swoosh_2', -11, 0.5);
bt('@P75:convicted', 'zoom-on-number', 'w75', { fill: 0.28, maxH: 740, sy: 500, pose: 'shock' }); sf('@P75:jury', 'gavel_1', -5, 0.8); sk('@P75:jury', 12);
bt('@P75:10', 'zoom-on-number', 'y75.value', { fill: 0.42, maxH: 420, sy: 480 }); sf('@P75:10-0.1', 'cell_door_1', -7, 1.2); sf('@P75:10', 'deep_boom_1', -6, 1.0);
bt('@P75:$28', 'zoom-on-number', 'm75.value', { fill: 0.46, maxH: 360, sy: 520 }); sf('@P75:$28', 'money_counter_1', -12, 1.4);
bt('@P75:ordered', 'graphic-hero', ['w75', 'y75', 'm75'], { fill: 0.84, sy: 500, pose: 'chin' });
// P76 the best noses missed it; a guy reading a label caught it
for (let i = 0; i < 3; i++) el('n76' + i, 'victim', R4(13) - 740 + i * 300, 60, `@P76:best+${(i * 0.15).toFixed(2)}`, { kind: 'collector', label: 'BEST NOSE', sub: 'MISSED IT', w: 270, h: 360, suit: ['#1FA366', '#2F5DA8', '#8A3FD1'][i], tape: 'NOSE', reactAt: '@P76:catch', labelSize: 34 }, { out: '@P77-0.2' });
el('m76', 'stamp', R4(13) - 440, 330, '@P76:catch-0.1', { text: 'MISSED IT', tone: 'bad', size: 60 }, { rot: -0.04, out: '@P77-0.2' });
el('mg76', 'icon', R4(13) + 520, -90, '@P76:guy-0.2', { kind: 'magnifier', s: 300, col: 'paper' }, { out: '@P77-0.2' });
el('lb76', 'card', R4(13) + 520, 170, '@P76:reading-0.2', { w: 560, h: 190, lines: [{ t: 'CLOS SAINT-DENIS · 1945', size: 36, font: 'cap', at: '@P76:reading' }, { t: 'CAUGHT IT', size: 54, font: 'hero', tone: 'good', at: '@P76:did' }], pad: 62 }, { out: '@P77-0.2' });
bt('@P76', 'graphic-hero', ['n760', 'n762'], { move: 'whip', fill: 0.62, sy: 520, pose: 'chin' }); sf('@P76-0.3', 'swoosh_2', -11, 0.5);
bt('@P76:catch', 'graphic-hero', ['n760', 'n762', 'm76'], { fill: 0.7, sy: 520, pose: 'shrug' }); sf('@P76:catch', 'wrong_buzzer_2', -11, 0.6); sf('@P76:catch', 'rubber_stamp_2', -7, 0.5);
bt('@P76:guy', 'graphic-hero', ['mg76', 'lb76'], { move: 'whip', fill: 0.5, sy: 480, pose: 'point' }); sf('@P76:guy-0.3', 'swoosh_2', -11, 0.5);
bt('@P76:did', 'zoom-on-number', 'lb76', { fill: 0.44, maxH: 360, sy: 480, pose: 'shock' }); sf('@P76:did', 'ding_2', -9, 0.7); sf('@P76:did', 'rubber_stamp_2', -8, 0.5);
