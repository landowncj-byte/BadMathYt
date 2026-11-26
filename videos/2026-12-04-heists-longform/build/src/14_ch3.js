// ---------------- CH3 · THE CAR THAT WAS LISTENING (P051-P071) — London night street: sodium orange + concrete blue-gray ----------------
const HAT = 'brand/photos/hatton-garden/2.jpg';
// P051 chapter card + the crew card
el('h51', 'headline', R3(0) - 440, 40, '@P051-0.3', { kicker: 'CASE FILE Nº 3', lines: ['THE CAR THAT', [['WAS LISTENING', 'bad']]], size: 130, underAt: 1.0 }, { out: '@P052-0.2' });
con('g51', 'hatton', R3(0) + 560, 40, '@P051-0.2', { w: 480, variant: 'card', file: true, caseNo: 'CASE Nº 3', flash: true, push: { at: '@P051', to: 1.12, dur: 2.6 } }, { out: '@P052-0.2' });
bt('@P051', 'graphic-hero', ['h51', 'g51'], { move: 'whip', fill: 0.9, sy: 470, pose: 'shrug' }); sf('@P051-0.6', 'tape_stop_1', -8, 1.0); sf('@P051-0.1', 'cinematic_hit_1', -9, 1.5); sf('@P051+0.7', 'camera_flash_1', -9, 0.6);
bt('@P051:car', 'zoom-on-number', 'h51', { fill: 0.5, maxH: 520, sy: 480, pose: 'point' }); sf('@P051:car', 'pop_2', -8, 0.4);
// P052 London, Easter weekend 2015: Hatton Garden jewelry district (public-domain street photo)
el('ph52', 'photo', R3(1) - 300, 40, '@P052-0.3', { src: HAT, name: 'HATTON GARDEN, LONDON', role: 'THE JEWELRY DISTRICT', credit: 'PHOTO: UNKNOWN AUTHOR · PUBLIC DOMAIN', w: 700, aspect: 0.74, fx: 0.5, fy: 0.5, tilt: 0.02 }, { out: '@P053-0.2' });
el('dc52', 'datecard', R3(1) + 620, -230, '@P052-0.2', { big: '2015', small: 'LONDON · EASTER WEEKEND' }, { out: '@P053-0.2' });
el('jd52', 'stamp', R3(1) + 600, 110, '@P052:jewelry', { text: 'JEWELRY DISTRICT', tone: 'accent', size: 66 }, { rot: -0.06, out: '@P053-0.2' });
bt('@P052', 'graphic-hero', ['ph52', 'dc52'], { move: 'whip', fill: 0.88, sy: 480, pose: 'point' }); sf('@P052-0.3', 'swoosh_2', -11, 0.5); sf('@P052-0.1', 'camera_shutter_1', -9, 0.5);
bt('@P052:easter', 'zoom-on-number', 'dc52', { fill: 0.4, maxH: 300, sx: 1200, sy: 480, pose: 'chin' });
bt('@P052:jewelry', 'graphic-hero', ['ph52', 'jd52', 'dc52'], { fill: 0.88, sy: 480, pose: 'shock' }); sf('@P052:jewelry', 'rubber_stamp_2', -8, 0.5);
// P053 the building cross-section: a vault in the basement, the same drawers as before
pr('cu53', 'cutaway', R3(2) - 300, 40, '@P053-0.3', { w: 760, h: 700, a: '@P053:vault-0.2' }, { out: '@P054-0.2' });
pr('bx53', 'boxes', R3(2) + 520, 40, '@P053:same-0.3', { w: 720, h: 420, cols: 6, rows: 4, one: '@P053:boxes', idx: 9 }, { out: '@P054-0.2' });
bt('@P053', 'graphic-hero', ['cu53'], { move: 'whip', fill: 0.4, maxH: 860, sy: 500, pose: 'point' }); sf('@P053-0.3', 'swoosh_2', -11, 0.5);
bt('@P053:vault', 'zoom-on-number', 'cu53', { fill: 0.42, maxH: 860, sy: 500, pose: 'chin' }); sf('@P053:vault', 'door_bang_1', -9, 0.8);
bt('@P053:boxes', 'graphic-hero', ['cu53', 'bx53'], { fill: 0.9, sy: 500, pose: 'point' }); sf('@P053:boxes', 'click_1', -8, 0.4);
// P054 the gang: mostly older men, led by a man in his 70s
con('g54', 'hatton', R3(3) - 300, 40, '@P054-0.3', { w: 520, variant: 'card', file: true, caseNo: 'THE CREW', flash: true, push: { at: '@P054', to: 1.1, dur: 3.5 } }, { out: '@P055-0.2' });
el('t54', 'text', R3(3) + 420, 20, '@P054:mostly-0.2', { lines: [[['MOSTLY ', 'paper'], ['OLDER', 'accent']], [['MEN', 'paper']], [['LED BY A MAN', 'soft']], [['IN HIS ', 'soft'], ['70s', 'bad']]], size: 100 }, { out: '@P055-0.2' });
bt('@P054', 'graphic-hero', ['g54', 't54'], { move: 'whip', fill: 0.86, sy: 480, pose: 'point' }); sf('@P054-0.3', 'swoosh_2', -11, 0.5); sf('@P054-0.1', 'camera_flash_1', -10, 0.6);
bt('@P054:older', 'zoom-on-number', 't54', { fill: 0.36, maxH: 560, sx: 1200, sy: 480, pose: 'chin' });
bt('@P054:70s', 'graphic-hero', ['g54', 't54'], { fill: 0.86, sy: 480, pose: 'shock' }); sf('@P054:70s', 'pop_2', -8, 0.4);
// P055 step one: down the lift shaft (= the tunnel an elevator rides in)
el('bd55', 'badge', R3(4) - 640, -300, '@P055-0.3', { text: 'STEP 1', tone: 'bad', size: 54 }, { out: '@P056-0.2' });
pr('lf55', 'lift', R3(4) - 240, 40, '@P055-0.3', { w: 480, h: 700, a: '@P055:climb' }, { out: '@P056-0.2' });
el('df55', 'card', R3(4) + 500, 20, '@P055:lift-0.3', { w: 640, h: 360, lines: [{ t: 'LIFT SHAFT', size: 76, font: 'hero', at: '@P055:lift' }, { t: '=', size: 70, font: 'hero', tone: 'bad', at: '@P055:tunnel-0.3' }, { t: 'THE TUNNEL AN ELEVATOR RIDES IN', size: 26, font: 'mono', tone: 'soft', at: '@P055:tunnel' }], pad: 90 }, { out: '@P056-0.2' });
bt('@P055', 'graphic-hero', ['bd55', 'lf55', 'df55'], { move: 'whip', fill: 0.88, sy: 480, pose: 'point' }); sf('@P055-0.3', 'swoosh_2', -11, 0.5);
bt('@P055:lift', 'zoom-on-number', 'lf55', { fill: 0.3, maxH: 780, sx: 700, sy: 500, pose: 'chin' }); sf('@P055:lift', 'pop_2', -8, 0.4);
bt('@P055:tunnel', 'graphic-hero', ['lf55', 'df55'], { fill: 0.84, sy: 480, pose: 'point' }); sf('@P055:tunnel', 'typewriter_2', -11, 1.0);
// P056 step two: drill through a thick concrete vault wall
el('bd56', 'badge', R3(5) - 640, -300, '@P056-0.3', { text: 'STEP 2', tone: 'bad', size: 54 }, { out: '@P057-0.2' });
pr('dr56', 'drill', R3(5), 40, '@P056-0.3', { w: 1000, h: 520, a: '@P056:drill', b: '@P056>-0.2' }, { out: '@P057-0.2' });
bt('@P056', 'graphic-hero', ['bd56', 'dr56'], { move: 'whip', fill: 0.84, sy: 480, pose: 'point' }); sf('@P056-0.3', 'swoosh_2', -11, 0.5);
bt('@P056:drill', 'zoom-on-number', 'dr56', { fill: 0.74, maxH: 620, sy: 500, pose: 'shock' }); sf('@P056:drill', 'static_1', -12, 2.4); sk('@P056:drill', 7);
bt('@P056:concrete', 'graphic-hero', 'dr56', { fill: 0.84, sy: 500, pose: 'chin' });
// P057 boxes pop open
pr('bx57', 'boxes', R3(6), 40, '@P057-0.3', { w: 1100, h: 560, cols: 6, rows: 4, open: ['@P057:open'], per: 0.12 }, { out: '@P058-0.2' });
bt('@P057', 'graphic-hero', 'bx57', { move: 'whip', fill: 0.64, maxH: 700, sy: 500, pose: 'point' }); sf('@P057-0.3', 'swoosh_2', -11, 0.5); for (let i = 0; i < 6; i++) sf(`@P057:open+${(i * 0.3).toFixed(2)}`, 'pop_2', -9, 0.3);
bt('@P057:box', 'zoom-on-number', 'bx57', { fill: 0.74, maxH: 660, sy: 500, pose: 'shock' });
// P058 the haul: more than £14 million
el('c58', 'counter', R3(7), 20, '@P058:14-0.3', { label: 'THE HAUL', to: 14, prefix: '£', suffix: ' MILLION+', at: '@P058:14', dur: 1.0, tone: 'good', size: 190, w: 1200 }, { out: '@P059-0.2' });
bt('@P058', 'graphic-hero', 'c58', { move: 'whip', fill: 0.78, sy: 480, pose: 'point' }); sf('@P058-0.3', 'swoosh_2', -11, 0.5);
bt('@P058:14', 'zoom-on-number', 'c58.value', { fill: 0.7, maxH: 460, sy: 480, pose: 'shock' }); sf('@P058:14', 'cash_register_1', -9, 1.0); sk('@P058:million', 8);
// P059 saving £1,000 a month would take 1,100+ years
el('jr59', 'tile', R3(8) - 520, 40, '@P059:thousand-0.3', { icon: 'cash', caption: '£1,000 / MONTH', cap: 34, w: 360, h: 400, iconS: 200, tilt: -0.03 }, { out: '@P060-0.2' });
el('c59', 'counter', R3(8) + 260, 40, '@P059:1-0.3', { label: 'YEARS TO SAVE IT', to: 1100, suffix: '+ YEARS', at: '@P059:1', dur: 1.2, tone: 'bad', size: 150, w: 900 }, { out: '@P060-0.2' });
bt('@P059', 'graphic-hero', ['jr59', 'c59'], { move: 'whip', fill: 0.86, sy: 480, pose: 'chin' }); sf('@P059-0.3', 'swoosh_2', -11, 0.5); sf('@P059:thousand', 'pop_2', -8, 0.4);
bt('@P059:1', 'zoom-on-number', 'c59.value', { fill: 0.5, maxH: 420, sx: 1150, sy: 480, pose: 'shock' }); sf('@P059:1', 'money_counter_1', -12, 1.4);
// P060 SEND moment
el('plane', 'plane', 1690, 930, '@P060:send-0.05', { dx: 190, dy: -330 }, { layer: 'screen', out: '@P060:send+1.5' }); sf('@P060:send-0.05', 'swoosh_2', -9, 1.0);
el('sd60', 'stamp', R3(9), 40, '@P060-0.3', { text: 'SEND THIS TO THAT FRIEND', tone: 'accent', size: 90 }, { rot: -0.03, out: '@P061-0.2' });
bt('@P060', 'graphic-hero', 'sd60', { move: 'whip', fill: 0.7, sy: 500, pose: 'shock' }); sf('@P060-0.3', 'swoosh_2', -11, 0.5);
bt('@P060:friend', 'graphic-hero', 'sd60', { fill: 0.76, sy: 500, pose: 'point' });
// P061 + P062 cameras everywhere; police spot a car (one CCTV wall across both)
pr('cc61', 'cctv', R3(10), 40, '@P061-0.3', { w: 1300, h: 640, a: '@P062:spot', hi: 8 }, { out: '@P063-0.2' });
bt('@P061', 'graphic-hero', 'cc61', { move: 'whip', fill: 0.7, maxH: 780, sy: 500, pose: 'point' }); sf('@P061-0.3', 'swoosh_2', -11, 0.5); sf('@P061:cameras', 'static_2', -16, 2.0);
bt('@P062:comb', 'graphic-hero', 'cc61', { fill: 0.76, maxH: 780, sy: 500, pose: 'chin' });
bt('@P062:spot', 'zoom-on-number', 'cc61', { fill: 0.88, maxH: 780, sy: 500, pose: 'shock' }); sf('@P062:spot', 'pop_2', -8, 0.4); sf('@P062:spot', 'camera_shutter_1', -8, 0.5);
// P063 detectives hide listening devices in the gang's cars
pr('cr63', 'car', R3(12) + 100, 60, '@P063-0.3', { w: 900, h: 540, a: '@P063:hide' }, { out: '@P064-0.2' });
el('dt63', 'tile', R3(12) - 620, 40, '@P063:detectives-0.3', { icon: 'badge', caption: 'DETECTIVES', cap: 32, w: 330, h: 360, iconS: 170, tilt: -0.03 }, { out: '@P064-0.2' });
bt('@P063', 'graphic-hero', ['dt63', 'cr63'], { move: 'whip', fill: 0.88, sy: 480, pose: 'point' }); sf('@P063-0.3', 'swoosh_2', -11, 0.5);
bt('@P063:hide', 'zoom-on-number', 'cr63', { fill: 0.6, maxH: 640, sy: 500, pose: 'chin' }); sf('@P063:hide', 'pop_2', -8, 0.4); sf('@P063:hide+0.3', 'click_2', -9, 0.4);
// P064 THE MISTAKE — EXHIBIT C: the car with a tiny mic, sound waves, empty bubbles (paraphrase)
mistake('P064', 'mistake', 'P065', 'C', R3(13), 2);
bt('@P064:mistake+0.02', 'graphic-hero', 'exP064', { dur: 0.05, lead: 0, fill: 0.44, sx: 1230, sy: 520, pose: 'point' });
bt('@P064:talking', 'zoom-on-number', 'exP064', { fill: 0.5, maxH: 780, sx: 1230, sy: 520, pose: 'shock' }); sf('@P064:talking', 'pop_2', -8, 0.4);
bt('@P064:arguing', 'graphic-hero', 'exP064', { fill: 0.5, maxH: 780, sx: 1230, sy: 520, pose: 'chin' }); sf('@P064:arguing', 'crowd_murmur_courtroom_1', -16, 3.0);
bt('@P064:loot', 'zoom-on-number', 'exP064', { fill: 0.52, maxH: 780, sx: 1230, sy: 520, pose: 'point' });
// P065 every word gets recorded
pr('tp65', 'tape', R3(14) + 400, 40, '@P065-0.3', { w: 700, h: 460 }, { out: '@P066-0.2' });
bt('@P065', 'graphic-hero', 'tp65', { move: 'whip', fill: 0.4, maxH: 660, sx: 1230, sy: 500, pose: 'point' }); sf('@P065-0.3', 'swoosh_2', -11, 0.5); sf('@P065:every', 'tape_zip_1', -12, 1.8);
bt('@P065:recorded', 'zoom-on-number', 'tp65', { fill: 0.5, maxH: 660, sx: 1230, sy: 500, pose: 'shock' });
// P066 May 2015: nine arrested
el('dc66', 'datecard', R3(15) - 660, -280, '@P066-0.2', { big: 'MAY 2015', small: 'POLICE MOVE IN' }, { out: '@P067-0.2' });
pr('cf66', 'cuffs', R3(15) + 100, 20, '@P066:arrest-0.2', { w: 900, h: 420, n: 9, a: '@P066:nine-0.4', per: 0.16 }, { out: '@P067-0.2' });
el('n66', 'text', R3(15) + 100, -300, '@P066:nine', { lines: [[['9 ', 'bad'], ['ARRESTED', 'paper']]], size: 120 }, { out: '@P067-0.2' });
bt('@P066', 'graphic-hero', ['dc66', 'cf66'], { move: 'whip', fill: 0.84, sy: 480, pose: 'point' }); sf('@P066-0.3', 'swoosh_2', -11, 0.5);
bt('@P066:nine', 'zoom-on-number', ['cf66', 'n66'], { fill: 0.6, maxH: 700, sy: 480, pose: 'shock' }); for (let i = 0; i < 9; i++) { const v = (i * 0.16 - 0.4).toFixed(2); sf(`@P066:nine${v < 0 ? '' : '+'}${v}`, 'handcuff_click_2', -12, 0.4); }
// P067 the judge: biggest burglary in English legal history
el('gv67', 'tile', R3(16) - 520, 20, '@P067:judge-0.3', { icon: 'gavel', caption: 'THE JUDGE', cap: 34, w: 360, h: 420, iconS: 210, tilt: -0.02 }, { out: '@P068-0.2' });
el('q67', 'card', R3(16) + 300, 20, '@P067:biggest-0.3', { w: 900, h: 420, lines: [{ t: '“BIGGEST BURGLARY', size: 76, font: 'hero', at: '@P067:biggest' }, { t: 'IN ENGLISH LEGAL HISTORY”', size: 60, font: 'hero', tone: 'bad', at: '@P067:english' }, { t: '— THE JUDGE', size: 30, font: 'mono', tone: 'soft', at: '@P067:history' }], pad: 120 }, { out: '@P068-0.2' });
bt('@P067', 'graphic-hero', ['gv67', 'q67'], { move: 'whip', fill: 0.88, sy: 480, pose: 'point' }); sf('@P067-0.3', 'swoosh_2', -11, 0.5); sf('@P067:judge', 'gavel_1', -7, 0.8);
bt('@P067:biggest', 'zoom-on-number', 'q67', { fill: 0.52, maxH: 520, sx: 1150, sy: 480, pose: 'chin' }); sf('@P067:biggest', 'typewriter_2', -11, 1.2);
bt('@P067:history', 'graphic-hero', ['gv67', 'q67'], { fill: 0.88, sy: 480, pose: 'shock' });
// P068-P070 verdict bars, three lines stacking on one plaque (7 years / ~6 years / 10 years)
el('j68', 'jail', R3(17), 40, '@P068-0.3', { w: 1200, h: 760, dropAt: '@P068:four', plaqueAt: '@P068:seven-0.5', head: 'THE SENTENCES', lines: [{ t: '4 MEN · 7 YEARS', at: '@P068:seven', size: 76 }, { t: '2 MEN · ~6 YEARS', at: '@P069:six', size: 76 }, { t: 'ELECTRONICS MAN · 10 YEARS', at: '@P070:10', size: 58 }] }, { out: '@P071-0.2' });
bt('@P068', 'graphic-hero', 'j68', { move: 'whip', fill: 0.62, maxH: 860, sy: 500, pose: 'point' }); sf('@P068-0.3', 'swoosh_2', -11, 0.5); sf('@P068:four', 'cell_door_1', -9, 1.0);
bt('@P068:seven', 'zoom-on-number', 'j68', { fill: 0.6, maxH: 780, sy: 500, pose: 'shock' }); sf('@P068:seven', 'rubber_stamp_2', -6, 0.5);
bt('@P069:two', 'graphic-hero', 'j68', { fill: 0.64, maxH: 860, sy: 500, pose: 'chin' }); sf('@P069:six', 'rubber_stamp_2', -8, 0.5);
bt('@P070:10', 'zoom-on-number', 'j68', { fill: 0.62, maxH: 800, sy: 500, pose: 'shock' }); sf('@P070:10', 'rubber_stamp_2', -6, 0.5);
// P071 split screen: the drill smashes the wall | the car catches every word; tray slot 3
pr('dr71', 'drill', R3(18) - 560, 40, '@P071-0.3', { w: 880, h: 520, a: '@P071:concrete', b: '@P071:concrete+2.0' }, { out: '@P072-0.2' });
pr('cr71', 'car', R3(18) + 560, 60, '@P071:ride-0.5', { w: 860, h: 520, a: '@P071:ride-0.2', b: '@P071:ride', c: '@P071:without' }, { out: '@P072-0.2' });
bt('@P071', 'graphic-hero', ['dr71', 'cr71'], { move: 'whip', fill: 0.94, sy: 480, pose: 'point' }); sf('@P071-0.3', 'swoosh_2', -11, 0.5);
bt('@P071:concrete', 'zoom-on-number', 'dr71', { fill: 0.44, maxH: 620, sy: 500, pose: 'chin' });
bt('@P071:ride', 'zoom-on-number', 'cr71', { fill: 0.44, maxH: 620, sy: 500, pose: 'shock' }); sf('@P071:ride', 'pop_2', -8, 0.4); sk('@P071:ride', 8);
bt('@P071:talking', 'graphic-hero', ['dr71', 'cr71'], { fill: 0.94, sy: 480, pose: 'shrug' });
