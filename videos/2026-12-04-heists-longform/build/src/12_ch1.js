// ---------------- CH1 · THE MONOPOLY GANG (P009-P028) — British railway night: deep green + lamp amber ----------------
// P009 chapter card + gang card
el('h9', 'headline', R1(0) - 420, 40, '@P009-0.3', { kicker: 'CASE FILE Nº 1', lines: ['THE MONOPOLY', [['GANG', 'bad']]], size: 150, underAt: 1.0 }, { out: '@P010-0.2' });
con('g9', 'mono', R1(0) + 580, 40, '@P009-0.2', { w: 440, variant: 'card', file: true, caseNo: 'CASE Nº 1', flash: true, push: { at: '@P009', to: 1.12, dur: 2.6 } }, { out: '@P010-0.2' });
bt('@P009', 'graphic-hero', ['h9', 'g9'], { move: 'whip', fill: 0.9, sy: 470, pose: 'shrug' }); sf('@P009-0.6', 'tape_stop_1', -8, 1.0); sf('@P009-0.1', 'cinematic_hit_1', -9, 1.5); sf('@P009+0.7', 'camera_flash_1', -9, 0.6);
bt('@P009:monopoly', 'zoom-on-number', 'g9', { fill: 0.3, maxH: 760, sy: 520, pose: 'point' });
// P010 England, August 1963, the train rolls through the night
el('dc10', 'datecard', R1(1) - 640, -300, '@P010-0.2', { big: '1963', small: 'ENGLAND · AUGUST' }, { out: '@P011-0.2' });
pr('t10', 'train', R1(1), 80, '@P010-0.3', { w: 1500, h: 260, cars: 4, a: '@P010:royal-0.5', b: '@P010>+0.3' }, { out: '@P011-0.2' });
bt('@P010', 'graphic-hero', ['dc10', 't10'], { move: 'whip', fill: 0.86, sy: 470, pose: 'point' }); sf('@P010-0.3', 'swoosh_2', -11, 0.5); sf('@P010:royal', 'whoosh_2', -12, 2.0);
bt('@P010:train', 'graphic-hero', 't10', { fill: 0.84, sy: 520, pose: 'chin' });
bt('@P010:night', 'graphic-hero', ['dc10', 't10'], { fill: 0.86, sy: 470, pose: 'point' });
// P011 Royal Mail = the post office; sacks of used banknotes
el('cd11', 'card', R1(2) - 520, 20, '@P011-0.3', { w: 640, h: 380, lines: [{ t: 'ROYAL MAIL', size: 76, font: 'hero', at: '@P011:royal' }, { t: '=', size: 80, font: 'hero', tone: 'bad', at: '@P011:is' }, { t: 'THE POST OFFICE', size: 60, font: 'hero', at: '@P011:post' }], pad: 90 }, { out: '@P012-0.2' });
pr('s11', 'sacks', R1(2) + 420, 20, '@P011:sacks-0.3', { w: 640, h: 420, n: 12, a: '@P011:sacks', per: 0.07, label: 'USED BANKNOTES', labelAt: '@P011:used' }, { out: '@P012-0.2' });
bt('@P011', 'graphic-hero', 'cd11', { move: 'whip', fill: 0.4, maxH: 520, sy: 480, pose: 'point' }); sf('@P011-0.3', 'swoosh_2', -11, 0.5); sf('@P011:post', 'typewriter_2', -11, 1.0);
bt('@P011:sacks', 'graphic-hero', ['cd11', 's11'], { fill: 0.86, sy: 480, pose: 'chin' }); sf('@P011:sacks', 'cash_rustle_1', -9, 1.2);
bt('@P011:used', 'zoom-on-number', 's11', { fill: 0.38, maxH: 600, sy: 500, pose: 'shock' });
// P012 the gang intro card: about 15 men
con('g12', 'mono', R1(3) - 400, 40, '@P012-0.3', { w: 440, variant: 'card', file: true, caseNo: 'CASE Nº 1', flash: true, stamps: [{ text: 'WANTED', at: '@P012:plan', tone: 'bad', size: 54, rot: -0.1, y: 40 }] }, { out: '@P013-0.2' });
el('t12', 'text', R1(3) + 380, 20, '@P012:about-0.2', { lines: [[['ABOUT ', 'paper'], ['15', 'bad']], [['MEN', 'paper']]], size: 170 }, { out: '@P013-0.2' });
bt('@P012', 'graphic-hero', ['g12', 't12'], { move: 'whip', fill: 0.86, sy: 480, pose: 'point' }); sf('@P012-0.3', 'swoosh_2', -11, 0.5); sf('@P012-0.1', 'camera_flash_1', -10, 0.6);
bt('@P012:15', 'zoom-on-number', 't12', { fill: 0.3, maxH: 520, sx: 1200, sy: 480, pose: 'shock' }); sf('@P012:15', 'pop_2', -8, 0.4);
bt('@P012:plan', 'graphic-hero', 'g12', { fill: 0.3, maxH: 760, sy: 520, pose: 'chin' }); sf('@P012:plan', 'rubber_stamp_2', -7, 0.5);
// P013 step one: rig the signal
el('bd13', 'badge', R1(4) - 600, -300, '@P013-0.3', { text: 'STEP 1', tone: 'bad', size: 54 }, { out: '@P014-0.2' });
pr('sg13', 'signal', R1(4) - 80, 20, '@P013-0.3', { w: 420, h: 640, a: '@P013:thinks' }, { out: '@P014-0.2' });
con('p13', 'mono', R1(4) + 480, 60, '@P013:rig-0.2', { w: 300, variant: 'pip', label: 'THEY DID THIS', aspect: 0.78, arrow: { at: '@P013:rig', to: [-440, 0] } }, { out: '@P014-0.2' });
el('d13', 'text', R1(4) + 480, -330, '@P013:thinks', { lines: [[['STOP!', 'bad']]], size: 120 }, { out: '@P014-0.2' });
bt('@P013', 'graphic-hero', ['bd13', 'sg13', 'p13'], { move: 'whip', fill: 0.86, sy: 480, pose: 'point' }); sf('@P013-0.3', 'swoosh_2', -11, 0.5);
bt('@P013:signal', 'zoom-on-number', 'sg13', { fill: 0.24, maxH: 760, sy: 500, pose: 'chin' }); sf('@P013:signal', 'pop_2', -8, 0.4);
bt('@P013:traffic', 'graphic-hero', ['sg13', 'p13'], { fill: 0.74, sy: 480, pose: 'point' });
bt('@P013:thinks', 'zoom-on-number', 'sg13', { fill: 0.24, maxH: 760, sy: 500, pose: 'shock' }); sf('@P013:thinks', 'click_1', -8, 0.4); sf('@P013:thinks+0.1', 'car_stop_1', -12, 1.2);
// P014 the train stops at a bridge
pr('br14', 'bridge', R1(5), 40, '@P014-0.3', { w: 1200, h: 560, a: '@P014:stops-0.6' }, { out: '@P015-0.2' });
bt('@P014', 'graphic-hero', 'br14', { move: 'whip', fill: 0.84, sy: 500, pose: 'point' }); sf('@P014-0.3', 'swoosh_2', -11, 0.5); sf('@P014:stops', 'car_stop_2', -10, 1.2);
bt('@P014:bridge', 'zoom-on-number', 'br14', { fill: 0.6, maxH: 600, sy: 500, pose: 'chin' });
// P015 step two: 120 mail sacks
el('bd15', 'badge', R1(6) - 560, -300, '@P015-0.3', { text: 'STEP 2', tone: 'bad', size: 54 }, { out: '@P016-0.2' });
pr('s15', 'sacks', R1(6) - 120, 40, '@P015:grab-0.1', { w: 640, h: 520, n: 24, a: '@P015:grab', per: 0.05 }, { out: '@P016-0.2' });
el('c15', 'counter', R1(6) + 520, 60, '@P015:120-0.3', { label: 'MAIL SACKS', to: 120, at: '@P015:120', dur: 0.9, tone: 'bad', size: 190, w: 620 }, { out: '@P016-0.2' });
bt('@P015', 'graphic-hero', ['bd15', 's15', 'c15'], { move: 'whip', fill: 0.88, sy: 480, pose: 'point' }); sf('@P015-0.3', 'swoosh_2', -11, 0.5); sf('@P015:grab', 'cash_rustle_1', -9, 1.4);
bt('@P015:120', 'zoom-on-number', 'c15.value', { fill: 0.34, maxH: 400, sx: 1100, sy: 480, pose: 'shock' }); sf('@P015:120', 'money_counter_1', -12, 1.2);
// P016 about 2.6 million pounds
el('c16', 'counter', R1(7), 20, '@P016:2-0.3', { label: 'INSIDE THE SACKS', to: 2.6, decimals: 1, prefix: '£', suffix: ' MILLION', at: '@P016:2', dur: 1.0, tone: 'good', size: 190, w: 1100 }, { out: '@P017-0.2' });
bt('@P016', 'graphic-hero', 'c16', { move: 'whip', fill: 0.74, sy: 480, pose: 'point' }); sf('@P016-0.3', 'swoosh_2', -11, 0.5);
bt('@P016:2', 'zoom-on-number', 'c16.value', { fill: 0.6, maxH: 460, sy: 480, pose: 'shock' }); sf('@P016:2', 'cash_register_1', -9, 1.0); sk('@P016:million', 8);
// P017 scale: 2.5 tons of cash vs a car
pr('sc17', 'scale', R1(8), 20, '@P017-0.3', { w: 1000, h: 560, a: '@P017:heavier-0.4', dir: -1, l: { icon: 'cash', label: '2.5 TONS OF CASH', size: 30 }, r: { icon: 'car', label: 'A CAR', size: 30 } }, { out: '@P018-0.2' });
bt('@P017', 'graphic-hero', 'sc17', { move: 'whip', fill: 0.62, maxH: 860, sy: 500, pose: 'point' }); sf('@P017-0.3', 'swoosh_2', -11, 0.5);
bt('@P017:tons', 'zoom-on-number', 'sc17', { fill: 0.7, maxH: 640, sy: 500, pose: 'chin' }); sf('@P017:tons', 'pop_2', -8, 0.4);
bt('@P017:heavier', 'graphic-hero', 'sc17', { fill: 0.74, maxH: 760, sy: 500, pose: 'shock' }); sf('@P017:heavier-0.3', 'thud_2', -8, 0.8);
// P018 step three: hide at a farmhouse
el('bd18', 'badge', R1(9) - 600, -300, '@P018-0.3', { text: 'STEP 3', tone: 'bad', size: 54 }, { out: '@P019-0.2' });
pr('fm18', 'farm', R1(9) - 60, 40, '@P018-0.3', { w: 760, h: 560, a: '@P018:lie' }, { out: '@P019-0.2' });
el('ll18', 'stamp', R1(9) + 460, 60, '@P018:lie', { text: 'LIE LOW', tone: 'accent', size: 100 }, { rot: -0.08, out: '@P019-0.2' });
bt('@P018', 'graphic-hero', ['bd18', 'fm18', 'll18'], { move: 'whip', fill: 0.88, sy: 480, pose: 'point' }); sf('@P018-0.3', 'swoosh_2', -11, 0.5);
bt('@P018:farmhouse', 'zoom-on-number', 'fm18', { fill: 0.44, maxH: 640, sy: 500, pose: 'chin' });
bt('@P018:lie', 'graphic-hero', ['fm18', 'll18'], { fill: 0.78, sy: 480, pose: 'shrug' }); sf('@P018:lie', 'rubber_stamp_2', -7, 0.5);
// P019 game night with the real money
pr('b19', 'board', R1(10) - 100, 60, '@P019-0.3', { w: 860, h: 540, drops: ['@P019:monopoly', '@P019:monopoly+0.25', '@P019:real'] }, { out: '@P020-0.2' });
con('p19', 'mono', R1(10) + 580, 100, '@P019:pass-0.2', { w: 300, variant: 'pip', label: 'GAME NIGHT', aspect: 0.78 }, { out: '@P020-0.2' });
bt('@P019', 'graphic-hero', ['b19', 'p19'], { move: 'whip', fill: 0.9, sy: 480, pose: 'chin' }); sf('@P019-0.3', 'swoosh_2', -11, 0.5);
bt('@P019:monopoly', 'zoom-on-number', 'b19', { fill: 0.5, maxH: 680, sy: 480, pose: 'point' }); sf('@P019:monopoly', 'thud_1', -8, 0.5); sf('@P019:real', 'cash_rustle_1', -9, 1.0);
bt('@P019:real', 'graphic-hero', ['b19', 'p19'], { fill: 0.9, sy: 480, pose: 'shock' });
// P020 + P021 leave no trace: one checklist spans both paragraphs
el('cl20', 'checklist', R1(11), 20, '@P020-0.3', { title: 'LEAVE NO TRACE', w: 1100, h: 560, rows: [{ show: '@P020:wipe-0.2', t: 'WIPE THE PLACE DOWN', tick: '@P020:down' }, { show: '@P021:burn-0.4', t: 'BURN THE FARMHOUSE' }, { show: '@P021:reportedly', t: 'REPORTEDLY: NOBODY DID' }], lockOpen: '@P021:did' }, { out: '@P022-0.2' });
bt('@P020', 'graphic-hero', 'cl20', { move: 'whip', fill: 0.62, maxH: 760, sy: 500, pose: 'point' }); sf('@P020-0.3', 'swoosh_2', -11, 0.5); sf('@P020:wipe', 'paper_rustle_2', -9, 0.8);
bt('@P020:down', 'zoom-on-number', 'cl20.r0', { fill: 0.5, maxH: 300, sy: 500, pose: 'chin' }); sf('@P020:down', 'success_chime_1', -11, 0.7);
bt('@P021:burn', 'zoom-on-number', 'cl20.r1', { fill: 0.5, maxH: 300, sy: 500, pose: 'point' }); sf('@P021:burn', 'pop_2', -9, 0.4);
bt('@P021:reportedly', 'zoom-on-number', 'cl20.r2', { fill: 0.5, maxH: 300, sy: 500, pose: 'shrug' }); sf('@P021:reportedly', 'typewriter_2', -11, 0.8);
// P022 a tip sends police to the farm
pr('po22', 'police', R1(12) - 200, 60, '@P022:police-0.4', { w: 640, h: 440 }, { out: '@P023-0.2' });
el('tp22', 'card', R1(12) + 420, -20, '@P022:tip-0.05', { w: 520, h: 300, lines: [{ t: 'A TIP', size: 120, font: 'hero', tone: 'bad', at: '@P022:tip' }, { t: 'ANONYMOUS NOTE', size: 26, font: 'mono', tone: 'soft', at: '@P022:tip+0.2' }], pad: 80 }, { out: '@P023-0.2' });
bt('@P022', 'graphic-hero', ['po22', 'tp22'], { move: 'whip', fill: 0.84, sy: 480, pose: 'point' }); sf('@P022-0.3', 'swoosh_2', -11, 0.5); sf('@P022:tip', 'paper_slam_2', -9, 0.5); sf('@P022:police', 'siren_1', -16, 1.6);
bt('@P022:tip', 'zoom-on-number', 'tp22', { fill: 0.34, maxH: 460, sx: 1100, sy: 480, pose: 'shock' });
// P023 they wiped almost everything. Almost.
el('t23', 'text', R1(13) - 470, -40, '@P023-0.2', { lines: [[['WIPED ', 'paper'], ['ALMOST', 'accent']], [['EVERYTHING', 'paper']]], size: 110 }, { out: '@P024-0.2' });
pr('b23', 'board', R1(13) + 430, 60, '@P023:wiped-0.1', { w: 720, h: 460, fp: '@P023:almost#2' }, { out: '@P024-0.2' });
bt('@P023', 'graphic-hero', ['t23', 'b23'], { move: 'whip', fill: 0.9, sy: 480, pose: 'chin' }); sf('@P023-0.3', 'swoosh_2', -11, 0.5);
bt('@P023:almost#2', 'zoom-on-number', 'b23', { fill: 0.4, maxH: 520, sx: 1200, sy: 480, pose: 'shock' }); sf('@P023:almost#2', 'suspense_drone_1', -11, 1.6);
// P024 THE MISTAKE — EXHIBIT A: the board + the ketchup bottle, fingerprint lifts
mistake('P024', 'mistake', 'P025', 'A', R1(14), 0);
bt('@P024:mistake+0.02', 'graphic-hero', 'exP024', { dur: 0.05, lead: 0, fill: 0.44, sx: 1230, sy: 520, pose: 'point' });
bt('@P024:fingerprints', 'zoom-on-number', 'exP024', { fill: 0.5, maxH: 780, sx: 1230, sy: 520, pose: 'shock' }); sf('@P024:fingerprints', 'camera_shutter_1', -8, 0.5);
bt('@P024:ketchup', 'graphic-hero', 'exP024', { fill: 0.5, maxH: 780, sx: 1230, sy: 520, pose: 'chin' }); sf('@P024:ketchup', 'pop_2', -8, 0.4);
// P025 a board game and a ketchup bottle helped crack the case
bt('@P025:board', 'zoom-on-number', 'exP024', { fill: 0.5, maxH: 780, sx: 1230, sy: 520, pose: 'point' }); bt('@P025:crack', 'graphic-hero', 'exP024', { fill: 0.44, sx: 1230, sy: 520, pose: 'shrug' }); sf('@P025:crack', 'ding_2', -9, 0.7);
// P026 convicted: most of the gang (April 1964)
el('dc26', 'datecard', R1(15) - 700, -310, '@P026-0.2', { big: '1964', small: 'APRIL' }, { out: '@P027-0.2' });
con('k26', 'mono', R1(15) + 60, 40, '@P026-0.3', { w: 520, variant: 'card', stamps: [{ text: 'CONVICTED', at: '@P026:convicted', tone: 'bad', size: 78, rot: -0.1, y: 20 }, { text: 'MOST OF THE GANG', at: '@P026:most+0.4', tone: 'bad', size: 36, rot: -0.05, y: 150 }] }, { out: '@P027-0.2' });
bt('@P026', 'graphic-hero', ['dc26', 'k26'], { move: 'whip', fill: 0.8, sy: 480, pose: 'point' }); sf('@P026-0.3', 'swoosh_2', -11, 0.5); sf('@P026:court', 'gavel_1', -7, 0.8);
bt('@P026:convicted', 'zoom-on-number', 'k26', { fill: 0.34, maxH: 780, sy: 520, pose: 'shock' }); sf('@P026:convicted', 'rubber_stamp_2', -5, 0.5); sk('@P026:convicted', 10);
// P027 up to 30 years
el('j27', 'jail', R1(16), 40, '@P027-0.3', { w: 1000, h: 700, dropAt: '@P027:main', plaqueAt: '@P027:30-0.15', head: 'THE MAIN MEN', lines: [{ t: 'UP TO 30 YEARS', at: '@P027:30', size: 92 }] }, { out: '@P028-0.2' });
bt('@P027', 'graphic-hero', 'j27', { move: 'whip', fill: 0.62, maxH: 820, sy: 500, pose: 'point' }); sf('@P027-0.3', 'swoosh_2', -11, 0.5); sf('@P027:main', 'cell_door_1', -9, 1.0);
bt('@P027:30', 'zoom-on-number', 'j27', { fill: 0.52, maxH: 620, sy: 520, pose: 'shock' }); sf('@P027:30', 'rubber_stamp_2', -6, 0.5);
// P028 tons of cash undone by a game about money; tray slot 1
pr('b28', 'board', R1(17), 60, '@P028-0.3', { w: 980, h: 600, drops: ['@P028:cash', '@P028:cash+0.12', '@P028:cash+0.24', '@P028:cash+0.36', '@P028:cash+0.48'], fp: '@P028:undone' }, { out: '@P029-0.2' });
con('p28', 'mono', R1(17) + 760, 360, '@P028:undone-0.2', { w: 280, variant: 'pip', label: 'UNDONE', aspect: 0.78, xmark: '@P028:undone' }, { out: '@P029-0.2' });
bt('@P028', 'graphic-hero', 'b28', { move: 'whip', fill: 0.66, maxH: 780, sy: 480, pose: 'point' }); sf('@P028-0.3', 'swoosh_2', -11, 0.5);
bt('@P028:cash', 'zoom-on-number', 'b28', { fill: 0.6, maxH: 720, sy: 480, pose: 'chin' }); for (let i = 0; i < 5; i++) sf(`@P028:cash+${(i * 0.12).toFixed(2)}`, 'thud_1', -9, 0.4);
bt('@P028:undone', 'graphic-hero', ['b28', 'p28'], { fill: 0.82, sy: 480, pose: 'shock' }); sf('@P028:undone', 'rubber_stamp_2', -7, 0.5); sk('@P028:undone', 8);
