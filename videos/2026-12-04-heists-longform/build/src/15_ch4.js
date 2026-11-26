// ---------------- CH4 · THE DEADLINE (P072-P092) — 1950s Boston: sepia + calendar red ----------------
const FBI = 'brand/photos/brinks-robbery-boston-1950/1.jpg';
// P072 chapter card + the gang card
el('h72', 'headline', R4(0) - 420, 40, '@P072-0.3', { kicker: 'CASE FILE Nº 4', lines: ['THE', [['DEADLINE', 'bad']]], size: 170, underAt: 1.0 }, { out: '@P073-0.2' });
con('g72', 'brinks', R4(0) + 560, 40, '@P072-0.2', { w: 480, variant: 'card', file: true, caseNo: 'CASE Nº 4', flash: true, push: { at: '@P072', to: 1.12, dur: 2.4 } }, { out: '@P073-0.2' });
bt('@P072', 'graphic-hero', ['h72', 'g72'], { move: 'whip', fill: 0.9, sy: 470, pose: 'shrug' }); sf('@P072-0.6', 'tape_stop_1', -8, 1.0); sf('@P072-0.1', 'cinematic_hit_1', -9, 1.5); sf('@P072+0.7', 'camera_flash_1', -9, 0.6);
bt('@P072:deadline', 'zoom-on-number', 'h72', { fill: 0.4, maxH: 520, sy: 480, pose: 'point' }); sf('@P072:deadline', 'clock_ticking_1', -12, 1.6);
// P073 Boston, January 1950; a company that moves cash in armored trucks (generic truck, no logo)
el('dc73', 'datecard', R4(1) - 640, -300, '@P073-0.2', { big: '1950', small: 'BOSTON · JANUARY' }, { out: '@P074-0.2' });
pr('tr73', 'truck', R4(1) + 60, 60, '@P073-0.3', { w: 900, h: 520, a: '@P073:company-0.2' }, { out: '@P074-0.2' });
bt('@P073', 'graphic-hero', ['dc73', 'tr73'], { move: 'whip', fill: 0.86, sy: 480, pose: 'point' }); sf('@P073-0.3', 'swoosh_2', -11, 0.5); sf('@P073:company', 'car_stop_1', -12, 1.2);
bt('@P073:cash', 'zoom-on-number', 'tr73', { fill: 0.52, maxH: 560, sy: 500, pose: 'chin' });
bt('@P073:trucks', 'graphic-hero', ['dc73', 'tr73'], { fill: 0.86, sy: 480, pose: 'point' });
// P074 masked men walk into the building
con('g74', 'brinks', R4(2) - 100, 40, '@P074-0.3', { w: 680, variant: 'card', file: true, caseNo: 'THE GANG', flash: true, push: { at: '@P074', to: 1.14, dur: 3.1 }, stamps: [{ text: 'MASKED', at: '@P074:masked', tone: 'bad', size: 70, rot: -0.1, y: 40 }] }, { out: '@P075-0.2' });
bt('@P074', 'graphic-hero', 'g74', { move: 'whip', fill: 0.3, maxH: 720, sy: 470, pose: 'point' }); sf('@P074-0.3', 'swoosh_2', -11, 0.5); sf('@P074-0.1', 'camera_flash_1', -10, 0.6);
bt('@P074:masked', 'zoom-on-number', 'g74', { fill: 0.34, maxH: 740, sy: 470, pose: 'shock' }); sf('@P074:masked', 'rubber_stamp_2', -6, 0.5); sf('@P074:walk', 'door_swing_2', -11, 0.9);
// P075 three items snap onto the gang: mask, cap, shoes
pr('gr75', 'gear', R4(3) + 180, 60, '@P075-0.3', { w: 1200, h: 520, items: ['mask', 'cap', 'shoe'], times: ['@P075:masks', '@P075:caps', '@P075:shoes'] }, { out: '@P076-0.2' });
con('p75', 'brinks', R4(3) - 640, 60, '@P075-0.2', { w: 330, variant: 'pip', label: 'THE GANG', aspect: 0.78 }, { out: '@P076-0.2' });
bt('@P075', 'graphic-hero', ['p75', 'gr75'], { move: 'whip', fill: 0.9, sy: 480, pose: 'point' }); sf('@P075-0.3', 'swoosh_2', -11, 0.5);
for (const w of ['masks', 'caps', 'shoes']) { bt(`@P075:${w}`, 'zoom-on-number', 'gr75', { fill: 0.62, maxH: 600, sy: 500, pose: 'point' }); sf(`@P075:${w}`, 'pop_2', -8, 0.4); }
// P076 they tie up the workers and walk out with the money
pr('ca76', 'cart', R4(4), 40, '@P076-0.3', { w: 1000, h: 440, a: '@P076:walk-0.3' }, { out: '@P077-0.2' });
el('w76', 'text', R4(4), -300, '@P076:tie-0.1', { lines: [[['WORKERS ', 'paper'], ['TIED UP', 'bad']]], size: 90 }, { out: '@P077-0.2' });
bt('@P076', 'graphic-hero', ['w76', 'ca76'], { move: 'whip', fill: 0.8, sy: 480, pose: 'point' }); sf('@P076-0.3', 'swoosh_2', -11, 0.5); sf('@P076:tie', 'paper_fold_1', -9, 0.6);
bt('@P076:walk', 'zoom-on-number', 'ca76', { fill: 0.7, maxH: 520, sy: 500, pose: 'shock' }); sf('@P076:walk', 'footsteps_1', -10, 1.4);
// P077 more than $2.7 million in cash, checks and more
el('c77', 'counter', R4(5), 20, '@P077:$2-0.3', { label: 'CASH, CHECKS AND MORE', to: 2.7, decimals: 1, prefix: '$', suffix: ' MILLION+', at: '@P077:$2', dur: 1.0, tone: 'good', size: 190, w: 1200 }, { out: '@P078-0.2' });
bt('@P077', 'graphic-hero', 'c77', { move: 'whip', fill: 0.78, sy: 480, pose: 'point' }); sf('@P077-0.3', 'swoosh_2', -11, 0.5);
bt('@P077:$2', 'zoom-on-number', 'c77.value', { fill: 0.7, maxH: 460, sy: 480, pose: 'shock' }); sf('@P077:$2', 'cash_register_1', -9, 1.0); sk('@P077:million', 8);
// P078 dead ends, then the FBI keeps one of the caps (public-domain evidence photo)
pr('de78', 'deadend', R4(6) - 380, 40, '@P078-0.3', { w: 900, h: 640, n: 14, a: '@P078:chase' }, { out: '@P079-0.2' });
el('fb78', 'photo', R4(6) + 600, 20, '@P078:fbi-0.3', { src: FBI, name: 'FBI EVIDENCE', role: 'THE ROBBERS’ CHAUFFEUR CAP', credit: 'PHOTO: FBI · PUBLIC DOMAIN', w: 620, aspect: 0.66, fx: 0.5, fy: 0.5, tilt: 0.03 }, { out: '@P079-0.2' });
bt('@P078', 'graphic-hero', 'de78', { move: 'whip', fill: 0.5, maxH: 780, sy: 500, pose: 'point' }); sf('@P078-0.3', 'swoosh_2', -11, 0.5); for (let i = 0; i < 6; i++) sf(`@P078:chase+${(0.3 + i * 0.3).toFixed(2)}`, 'rubber_stamp_2', -12, 0.4);
bt('@P078:dead', 'zoom-on-number', 'de78', { fill: 0.52, maxH: 780, sy: 500, pose: 'shrug' });
bt('@P078:fbi', 'graphic-hero', ['de78', 'fb78'], { fill: 0.9, sy: 480, pose: 'point' }); sf('@P078:fbi', 'camera_shutter_1', -8, 0.5);
bt('@P078:caps', 'zoom-on-number', 'fb78', { fill: 0.3, maxH: 720, sx: 1200, sy: 500, pose: 'chin' });
// P079 the plan: stay quiet for six years
con('g79', 'brinks', R4(7) - 460, 40, '@P079-0.3', { w: 460, variant: 'card', flash: false }, { out: '@P080-0.2' });
el('pl79', 'card', R4(7) + 320, 20, '@P079:gang-0.1', { w: 760, h: 460, lines: [{ t: 'THE PLAN', size: 34, font: 'mono', tone: 'soft', at: '@P079:gang' }, { t: 'STAY QUIET', size: 110, font: 'hero', at: '@P079:quiet' }, { t: 'FOR 6 YEARS', size: 100, font: 'hero', tone: 'bad', at: '@P079:six' }], pad: 100 }, { out: '@P080-0.2' });
bt('@P079', 'graphic-hero', ['g79', 'pl79'], { move: 'whip', fill: 0.86, sy: 480, pose: 'point' }); sf('@P079-0.3', 'swoosh_2', -11, 0.5);
bt('@P079:quiet', 'zoom-on-number', 'pl79', { fill: 0.4, maxH: 520, sx: 1150, sy: 480, pose: 'chin' }); sf('@P079:quiet', 'typewriter_2', -11, 1.0);
bt('@P079:six', 'zoom-on-number', 'pl79', { fill: 0.44, maxH: 520, sx: 1150, sy: 480, pose: 'shock' }); sf('@P079:six', 'rubber_stamp_2', -7, 0.5);
// P080-P082 the statute of limitations: one wall clock with a 6-year dial across three paragraphs, then a flying calendar
pr('ck80', 'clock', R4(8), 40, '@P080-0.3', { w: 700, h: 700, label: '6 YEARS', a: '@P081:six', b: '@P082>' }, { out: '@P083-0.2' });
el('sl80', 'card', R4(8) + 760, -80, '@P080:legal-0.3', { w: 620, h: 340, lines: [{ t: 'STATUTE OF', size: 62, font: 'hero', at: '@P080:statute' }, { t: 'LIMITATIONS', size: 62, font: 'hero', tone: 'bad', at: '@P080:limitations' }, { t: 'A LEGAL DEADLINE', size: 26, font: 'mono', tone: 'soft', at: '@P080:deadline' }], pad: 90 }, { out: '@P081-0.2' });
el('cb81', 'stamp', R4(8) + 760, -60, '@P081:charged-0.6', { text: 'CAN’T BE CHARGED', tone: 'bad', size: 70 }, { rot: -0.06, out: '@P082-0.2' });
el('cl82', 'calendar', R4(8) + 760, 20, '@P082:wait-0.2', { head: 'WAIT IT OUT', band: 'bad', roll: { from: 1950, to: 1956, at: '@P082:wait', dur: 1.5 }, size: 190, w: 560, h: 420 }, { out: '@P083-0.2' });
bt('@P080', 'graphic-hero', ['ck80', 'sl80'], { move: 'whip', fill: 0.86, sy: 480, pose: 'point' }); sf('@P080-0.3', 'swoosh_2', -11, 0.5);
bt('@P080:statute', 'zoom-on-number', 'sl80', { fill: 0.36, maxH: 420, sx: 1250, sy: 480, pose: 'chin' }); sf('@P080:statute', 'typewriter_2', -11, 1.2);
bt('@P081:six', 'zoom-on-number', 'ck80', { fill: 0.4, maxH: 720, sy: 500, pose: 'point' }); sf('@P081:six', 'clock_ticking_2', -10, 3.0);
bt('@P081:charged', 'graphic-hero', ['ck80', 'cb81'], { fill: 0.86, sy: 480, pose: 'shock' }); sf('@P081:charged-0.6', 'rubber_stamp_2', -7, 0.5);
bt('@P082:wait', 'graphic-hero', ['ck80', 'cl82'], { fill: 0.86, sy: 480, pose: 'shrug' }); sf('@P082:wait', 'page_turn_2', -10, 1.4);
bt('@P082:clock', 'zoom-on-number', 'ck80', { fill: 0.42, maxH: 720, sy: 500, pose: 'point' });
// P083 Specs: jailed for a different burglary
con('s83', 'specsj', R4(11) - 200, 40, '@P083-0.3', { w: 520, variant: 'card', file: true, caseNo: 'THE PARTNER', flash: true, bars: '@P083:jail-0.1' }, { out: '@P084-0.2' });
el('ab83', 'stamp', R4(11) + 600, -100, '@P083:different-0.2', { text: 'ANOTHER BURGLARY', tone: 'accent', size: 60 }, { rot: -0.05, out: '@P084-0.2' });
bt('@P083', 'graphic-hero', ['s83'], { move: 'whip', fill: 0.34, maxH: 860, sy: 520, pose: 'point' }); sf('@P083-0.3', 'swoosh_2', -11, 0.5); sf('@P083-0.1', 'camera_flash_1', -10, 0.6);
bt('@P083:jail', 'zoom-on-number', 's83', { fill: 0.36, maxH: 860, sy: 520, pose: 'shock' }); sf('@P083:jail-0.1', 'cell_door_1', -7, 1.0);
bt('@P083:different', 'graphic-hero', ['s83', 'ab83'], { fill: 0.7, sy: 500, pose: 'chin' }); sf('@P083:different', 'rubber_stamp_2', -8, 0.5);
// P084 reportedly feels cheated out of his share
pr('mb84', 'moneybag', R4(12) + 100, 60, '@P084-0.3', { w: 560, h: 560, a: '@P084:cheated' }, { out: '@P085-0.2' });
con('p84', 'specsj', R4(12) - 420, 80, '@P084-0.2', { w: 320, variant: 'pip', label: 'REPORTEDLY', aspect: 1.0, flash: false }, { out: '@P085-0.2' });
bt('@P084', 'graphic-hero', ['p84', 'mb84'], { move: 'whip', fill: 0.84, sy: 480, pose: 'chin' }); sf('@P084-0.3', 'swoosh_2', -11, 0.5); sf('@P084:reportedly', 'typewriter_2', -11, 0.8);
bt('@P084:cheated', 'zoom-on-number', 'mb84', { fill: 0.34, maxH: 600, sy: 500, pose: 'shock' }); sf('@P084:cheated', 'page_tear_1', -9, 0.8);
// P085 THE MISTAKE — EXHIBIT D (P085 starts on "mistake", the "The" is the end of P084)
mistake('P085', 'mistake', 'P086', 'D', R4(13), 3, { src: IMG('specs_stripes'), c: '@P086:talks' });
bt('@P085:mistake+0.02', 'graphic-hero', 'exP085', { dur: 0.05, lead: 0, fill: 0.44, sx: 1230, sy: 520, pose: 'point' });
bt('@P085:secret', 'zoom-on-number', 'exP085', { fill: 0.5, maxH: 780, sx: 1230, sy: 520, pose: 'shock' }); sf('@P085:secret', 'suspense_drone_1', -11, 2.0);
bt('@P085:unhappy', 'graphic-hero', 'exP085', { fill: 0.54, maxH: 780, sx: 1230, sy: 520, pose: 'chin' });
// P086 so Specs talks: the empty bubble fills with sound bars
el('ht86', 'stamp', R4(13) + 560, 330, '@P086:talks', { text: 'HE TALKS', tone: 'bad', size: 74 }, { rot: -0.06, out: '@P086>+0.1' });
bt('@P086:specs', 'zoom-on-number', 'exP085', { fill: 0.58, maxH: 780, sx: 1230, sy: 520, pose: 'point' }); bt('@P086:talks', 'zoom-on-number', 'exP085', { fill: 0.62, maxH: 780, sx: 1230, sy: 520, pose: 'shock' }); sf('@P086:talks', 'rubber_stamp_2', -6, 0.5); sf('@P086:talks', 'static_1', -14, 1.2);
// P087 January 1956: less than a week left, 11 men charged
el('dc87', 'datecard', R4(15) - 700, -300, '@P087-0.2', { big: '1956', small: 'JANUARY' }, { out: '@P088-0.2' });
el('t87', 'text', R4(15) - 100, -160, '@P087:less-0.3', { lines: [[['LESS THAN ', 'paper'], ['A WEEK', 'bad']], [['LEFT ON THE CLOCK', 'paper']]], size: 100 }, { out: '@P088-0.2' });
el('c87', 'counter', R4(15) + 80, 190, '@P087:11-0.3', { label: 'MEN CHARGED', to: 11, at: '@P087:11', dur: 0.8, tone: 'bad', size: 160, w: 620 }, { out: '@P088-0.2' });
con('g87', 'brinks', R4(15) + 640, 150, '@P087:eleven-0.3', { w: 360, variant: 'card', flash: false, stamps: [{ text: 'CHARGED', at: '@P087:charged', tone: 'bad', size: 54, rot: -0.1, y: 40 }] }, { out: '@P088-0.2' });
bt('@P087', 'graphic-hero', ['dc87', 't87'], { move: 'whip', fill: 0.8, sy: 480, pose: 'point' }); sf('@P087-0.3', 'swoosh_2', -11, 0.5); sf('@P087:less', 'clock_ticking_1', -10, 2.0);
bt('@P087:11', 'zoom-on-number', 'c87.value', { fill: 0.34, maxH: 420, sx: 960, sy: 520, pose: 'shock' }); sf('@P087:11', 'money_counter_2', -12, 1.0); sf('@P087:charged', 'rubber_stamp_2', -6, 0.5);
bt('@P087:charged', 'graphic-hero', ['c87', 'g87'], { fill: 0.84, sy: 520, pose: 'chin' });
// P088 six years = 2,190 days; they missed it by less than seven
el('c88', 'counter', R4(16) - 100, -30, '@P088:2-0.3', { label: '6 YEARS ≈', to: 2190, suffix: ' DAYS', at: '@P088:2', dur: 1.2, tone: 'accent', size: 170, w: 1000 }, { out: '@P089-0.2' });
el('m88', 'text', R4(16) - 100, 300, '@P088:missed-0.2', { lines: [[['MISSED BY ', 'paper'], ['LESS THAN 7', 'bad']]], size: 100 }, { out: '@P089-0.2' });
bt('@P088', 'graphic-hero', 'c88', { move: 'whip', fill: 0.7, sy: 480, pose: 'point' }); sf('@P088-0.3', 'swoosh_2', -11, 0.5);
bt('@P088:2', 'zoom-on-number', 'c88.value', { fill: 0.56, maxH: 440, sy: 460, pose: 'shock' }); sf('@P088:2', 'money_counter_1', -12, 1.4);
bt('@P088:missed', 'graphic-hero', ['c88', 'm88'], { fill: 0.84, sy: 520, pose: 'chin' }); sf('@P088:missed', 'wrong_buzzer_2', -12, 0.6); sk('@P088:seven', 9);
// P089 eight men, life in prison
el('j89', 'jail', R4(17), 40, '@P089-0.3', { w: 1000, h: 700, dropAt: '@P089:eight', plaqueAt: '@P089:life-0.15', head: 'THE GANG', lines: [{ t: '8 MEN · LIFE', at: '@P089:life', size: 100 }] }, { out: '@P090-0.2' });
bt('@P089', 'graphic-hero', 'j89', { move: 'whip', fill: 0.62, maxH: 820, sy: 500, pose: 'point' }); sf('@P089-0.3', 'swoosh_2', -11, 0.5); sf('@P089:eight', 'cell_door_1', -9, 1.0);
bt('@P089:life', 'zoom-on-number', 'j89', { fill: 0.54, maxH: 620, sy: 520, pose: 'shock' }); sf('@P089:life', 'rubber_stamp_2', -6, 0.5); sk('@P089:life', 9);
// P090 Specs: pleaded guilty, testified, four years
con('s90', 'specsj', R4(18), 40, '@P090-0.3', { w: 560, variant: 'card', stamps: [{ text: 'PLEADED GUILTY', at: '@P090:pleaded', tone: 'bad', size: 46, rot: -0.1, y: -40 }, { text: 'TESTIFIED', at: '@P090:testified', tone: 'accent', size: 56, rot: 0.06, y: 70 }, { text: '4 YEARS', at: '@P090:four', tone: 'bad', size: 90, rot: -0.08, y: 190 }] }, { out: '@P091-0.2' });
bt('@P090', 'graphic-hero', 's90', { move: 'whip', fill: 0.3, maxH: 780, sy: 470, pose: 'point' }); sf('@P090-0.3', 'swoosh_2', -11, 0.5);
for (const [w, g] of [['pleaded', -7], ['testified', -7], ['four', -5]]) sf(`@P090:${w}`, 'rubber_stamp_2', g, 0.5);
bt('@P090:testified', 'zoom-on-number', 's90', { fill: 0.34, maxH: 780, sy: 470, pose: 'chin' }); bt('@P090:four', 'zoom-on-number', 's90', { fill: 0.36, maxH: 780, sy: 470, pose: 'shock' });
// P091 only about $60,000 was ever found
el('c91', 'counter', R4(19), 20, '@P091:$60-0.3', { label: 'EVER FOUND', to: 60000, prefix: '$', at: '@P091:$60', dur: 1.0, tone: 'bad', size: 190, w: 1000, sub: 'OF $2.7 MILLION+' }, { out: '@P092-0.2' });
bt('@P091', 'graphic-hero', 'c91', { move: 'whip', fill: 0.7, sy: 480, pose: 'chin' }); sf('@P091-0.3', 'swoosh_2', -11, 0.5);
bt('@P091:$60', 'zoom-on-number', 'c91.value', { fill: 0.56, maxH: 440, sy: 480, pose: 'shock' }); sf('@P091:$60', 'cash_register_1', -9, 1.0);
// P092 two cents of every dollar; tray slot 4
pr('cn92', 'coins100', R4(20), 20, '@P092:two-1.4', { w: 1300, h: 520, a: '@P092-0.2', lit: [41, 62], b: '@P092:two' }, { out: '@P093-0.2' });
el('tc92', 'stamp', R4(20), -300, '@P092:two+0.3', { text: '2¢ OF EVERY $1', tone: 'bad', size: 96 }, { rot: -0.04, out: '@P093-0.2' });
bt('@P092', 'graphic-hero', 'cn92', { move: 'whip', fill: 0.8, maxH: 640, sy: 500, pose: 'point' }); sf('@P092-0.3', 'swoosh_2', -11, 0.5);
bt('@P092:two', 'zoom-on-number', ['cn92', 'tc92'], { fill: 0.8, maxH: 760, sy: 500, pose: 'shock' }); sf('@P092:two', 'coin_single_1', -8, 0.6); sf('@P092:two+0.3', 'rubber_stamp_2', -7, 0.5);
