// ---------------- ROOM 3 · THE FUND THAT ALMOST NEVER LOST (P34-P50): clean, cool finance stage; green / red ----------------
const R3 = k => K(X3, k);
el('ch3', 'headline', R3(0), 40, '@P34-0.3', { kicker: 'CHAPTER THREE', lines: ['THE FUND THAT', [['ALMOST ', 'paper'], ['NEVER LOST', 'good']]], size: 150, under: 'good', underAt: 1.0 });
bt('@P34', 'graphic-hero', 'ch3', { move: 'whip', dur0: 0.7, fill: 0.66, sy: 470, pose: 'shrug', arc: 0.2 }); sf('@P34-0.6', 'tape_stop_1', -8, 1.0); sf('@P34-0.1', 'cinematic_hit_1', -9, 1.5); sf('@P34+0.9', 'paper_slam_2', -10, 0.5); sk('@P34+0.7', 8);
// S1: Madoff wasn't a nobody
el('sil35', 'photo', R3(1) - 900, 60, '@P35-0.3', { src: 'brand/photos/bernie-madoff/2.jpg', name: 'BERNIE MADOFF', role: 'WALL STREET', credit: 'PHOTO: U.S. DOJ · PUBLIC DOMAIN', treatment: 'mugshot', fx: 0.5, fy: 0.3, tilt: -0.03 }, { out: '@P36-0.2' });
el('bld35', 'icon', R3(1) + 100, 40, '@P35:chairman-0.5', { kind: 'building', s: 440, col: 'paper' }, { out: '@P36-0.2' });
el('nas', 'badge', R3(1) + 860, -110, '@P35:nasdaq-0.55', { text: 'FORMER NASDAQ CHAIRMAN', tone: 'navy', size: 40 }, { out: '@P36-0.2' });
el('mm', 'badge', R3(1) + 860, 90, '@P35:market-0.25', { text: 'ONE OF THE BIGGEST MARKET MAKERS', tone: 'navy', size: 34 }, { out: '@P36-0.2' });
bt('@P35', 'graphic-hero', 'sil35', { move: 'whip', fill: 0.3, maxH: 680, sy: 520, pose: 'chin' }); sf('@P35-0.2', 'camera_flash_1', -9, 0.6); bt('@P35:nobody', 'zoom-on-number', 'sil35.name', { fill: 0.28, maxH: 300, sy: 520 });
bt('@P35:chairman', 'side-by-side', ['bld35', 'nas'], { fill: 0.6, sx: 900, sy: 480, st: 'corner', pose: 'point' }); sf('@P35:chairman-0.5', 'pop_2', -8, 0.3); sf('@P35:nasdaq-0.55', 'swoosh_2', -11, 0.5);
bt('@P35:market', 'graphic-hero', ['bld35', 'nas', 'mm'], { fill: 0.64, sx: 900, sy: 480, pose: 'point' }); sf('@P35:market-0.25', 'pop_1', -8, 0.3); bt('@P35:biggest', 'zoom-on-number', 'mm', { fill: 0.38, maxH: 220, sy: 490, pose: 'point' });
// S2: ten percent a year, year after year after year
el('no50', 'text', R3(2), -340, '@P36:no-0.1', { lines: [[['NO ', 'paper'], ['50%', 'bad']]], size: 130 }, { out: '@P36:just-0.1' });
el('ten', 'text', R3(2), -340, '@P36:just-0.1', { lines: [[['~10% ', 'good'], ['A YEAR', 'paper']]], size: 110 }, { out: '@P37-0.2' });
el('yb', 'yearbars', R3(2), 90, '@P36-0.2', { at: '@P36:steady', per: 0.3 }, { out: '@P37-0.2' });
bt('@P36', 'presenter-front', 'yb', { move: 'whip', fill: 0.7, sy: 500, pose: 'talk' }); bt('@P36:no', 'zoom-on-number', 'no50', { fill: 0.3, maxH: 260, sy: 470, pose: 'point', st: 'corner' }); sf('@P36:no', 'pop_2', -8, 0.3); sf('@P36:50%', 'wrong_buzzer_2', -12, 0.5);
bt('@P36:just', 'graphic-hero', ['ten', 'yb'], { fill: 0.7, maxH: 760, sy: 490, pose: 'point' }); bt('@P36:10', 'zoom-on-number', 'ten', { fill: 0.32, maxH: 240, sy: 470 }); sf('@P36:just', 'pop_1', -8, 0.3);
bt('@P36:year#2', 'graphic-hero', 'yb.row', { fill: 0.76, sy: 520, pose: 'chin' }); for (let i = 0; i < 17; i++) sf(`@P36:steady+${(i * 0.3).toFixed(2)}`, 'click_2', -14, 0.2);
bt('@P36:after#2', 'zoom-on-number', 'yb.row', { fill: 0.86, maxH: 500, sy: 520, st: 'corner', dur: 1.2 });
// S3: greed vs safety
el('pgreed', 'panel', R3(3) - 380, 60, '@P37+0.3', { title: 'PONZI\nSOLD GREED', icon: 'rocket', tone: 'bad', sub: '50% IN 45 DAYS', titleSize: 56 });
el('psafe', 'panel', R3(3) + 380, 60, '@P37+0.5', { title: 'MADOFF\nSOLD SAFETY', icon: 'shield', tone: 'good', sub: '~10% A YEAR', fill: 'navy', titleSize: 56 });
bt('@P37', 'presenter-front', ['pgreed', 'psafe'], { move: 'whip', fill: 0.62, sy: 500, pose: 'talk' }); bt('@P37:ponzi', 'zoom-on-number', 'pgreed', { fill: 0.26, maxH: 660, sy: 500, st: 'corner', pose: 'point' }); sf('@P37:ponzi-0.35', 'pop_2', -8, 0.3); sf('@P37:greed', 'cartoon_boing_1', -14, 0.7);
bt('@P37:madoff', 'zoom-on-number', 'psafe', { fill: 0.26, maxH: 660, sy: 500 }); sf('@P37:madoff-0.35', 'pop_1', -8, 0.3); sf('@P37:safety', 'click_1', -8, 0.3); bt('@P37:safety', 'graphic-hero', ['pgreed', 'psafe'], { fill: 0.62, sy: 500, pose: 'point' });
// S4: 10.5% for 17 years; 2008 crash vs still up
el('c105', 'counter', R3(4) - 1000, 40, '@P38-0.3', { label: 'ONE FUND REPORTED', to: 10.5, decimals: 1, suffix: '%', at: '@P38:10-0.2', dur: 0.9, tone: 'good', size: 220, w: 700, underline: true }, { out: '@P39-0.2' });
el('yrs', 'text', R3(4) - 1000, 330, '@P38:for-0.1', { lines: [[['A YEAR · FOR ', 'paper'], ['17 YEARS', 'accent']]], size: 62 }, { out: '@P39-0.2' });
el('c08', 'chart', R3(4) + 480, 40, '@P38:late-0.35', { w: 1160, h: 620, title: 'LATE 2008', series: [{ kind: 'crash', seed: 4, crashAt: 0.42, n: 110, drift: 0.01, vol: 0.03, tone: 'bad', at: '@P38:late', dur: 2.6, lin: true, w: 9, fall: 0.07, label: 'MARKET', labelAt: '@P38:crashing+0.6', lo: 0.05, hi: 0.95 }, { kind: 'smooth', seed: 2, tone: 'good', at: '@P38:late', dur: 4.4, y0: 0.52, y1: 0.28, w: 9, label: 'FUND: STILL UP', labelAt: '@P38:still+0.3', lin: true, labelDy: -60 }] }, { out: '@P39-0.2' });
bt('@P38', 'graphic-hero', 'c105', { move: 'whip', fill: 0.34, maxH: 620, sx: 1000, sy: 480, pose: 'point' }); bt('@P38:10', 'zoom-on-number', 'c105.value', { fill: 0.4, maxH: 420, sy: 470, pose: 'shock' }); sf('@P38:10-0.2', 'money_counter_2', -12, 1.0); sf('@P38:years-0.8', 'ding_2', -9, 0.7);
bt('@P38:for', 'graphic-hero', ['c105', 'yrs'], { fill: 0.4, sx: 1000, sy: 480, pose: 'point' }); bt('@P38:late', 'side-by-side', 'c08', { fill: 0.6, sx: 960, sy: 490, st: 'corner', pose: 'point' }); sf('@P38:late-0.3', 'swoosh_2', -11, 0.6);
bt('@P38:crashing', 'zoom-on-number', 'c08', { fill: 0.64, maxH: 700, sy: 480, pose: 'shock', dur: 0.6 }); sf('@P38:crashing-0.1', 'sub_drop_2', -10, 1.2); sk('@P38:crashing+0.3', 8); sf('@P38:still+0.3', 'success_chime_1', -12, 1.0);
bt('@P38:still', 'graphic-hero', 'c08', { fill: 0.62, maxH: 600, sy: 570, pose: 'idle', st: 'peek' });
// S5: THE KEY VISUAL: a real chart wiggles; Madoff's line is a ruler at 45 degrees
el('key', 'chart', R3(5), 50, '@P39-0.2', { w: 1500, h: 760, title: '', series: [{ kind: 'noise', seed: 5, n: 170, drift: 0.0042, vol: 0.075, tone: 'paper', at: '@P39:picture', dur: 6.4, lin: true, w: 8, label: 'REAL MARKET', labelAt: '@P39:madoff\'s-0.3', lo: 0.04, hi: 0.98 }, { kind: 'straight', tone: 'good', at: '@P39:madoff\'s', dur: 2.6, w: 14, label: 'MADOFF', labelAt: '@P39:almost+0.5', dot: true }], angle: { at: '@P39:45-0.3' } }, { out: '@P40-0.2' });
el('tooperf', 'stamp', R3(5) + 380, 90, '@P39:degree-0.1', { text: 'TOO PERFECT', tone: 'bad', size: 150 }, { rot: -0.08, out: '@P40-0.2' });
bt('@P39', 'graphic-hero', 'key', { move: 'whip', fill: 0.64, maxH: 760, sy: 490, pose: 'point' });
bt('@P39:wiggles', 'zoom-on-number', { x: R3(5) - 200, y: 50, w: 700, h: 520 }, { fill: 0.42, maxH: 640, sy: 490, rot: 0.01, pose: 'point' }); bt('@P39:drops', 'zoom-on-number', { x: R3(5) + 150, y: 50, w: 700, h: 520 }, { fill: 0.42, maxH: 640, sy: 490, rot: -0.01 });
bt('@P39:bad', 'zoom-on-number', { x: R3(5) + 450, y: 50, w: 700, h: 520 }, { fill: 0.42, maxH: 600, sy: 500, rot: 0.01 }); sf('@P39:drops', 'sub_drop_2', -14, 0.8);
bt('@P39:madoff\'s', 'graphic-hero', 'key', { fill: 0.64, maxH: 760, sy: 490, pose: 'idle', dur: 1.0 }); sf('@P39:madoff\'s', 'riser_2', -14, 2.4);
bt('@P39:perfect', 'zoom-on-number', { x: R3(5) - 360, y: 60, w: 760, h: 700 }, { fill: 0.4, maxH: 720, sy: 490, pose: 'chin', dur: 0.7 });
bt('@P39:45', 'zoom-on-number', { x: R3(5) - 360, y: 220, w: 760, h: 420 }, { fill: 0.42, maxH: 520, sy: 520, pose: 'shock', dur: 0.6 }); sf('@P39:45-0.3', 'swipe_1', -12, 0.5); sf('@P39:45', 'ding_1', -8, 0.8);
bt('@P39:degree', 'graphic-hero', ['key', 'tooperf'], { fill: 0.64, maxH: 760, sy: 490, pose: 'shock' }); sf('@P39:degree-0.1', 'rubber_stamp_2', -3, 0.5); sf('@P39:degree', 'deep_boom_1', -4, 1.6); sk('@P39:degree', 14);
// S6: Markopolos: five minutes to doubt, four hours to prove
el('sil40', 'photo', R3(6) - 800, 60, '@P40:harry-0.4', { src: 'brand/photos/harry-markopolos/1.jpg', name: 'HARRY MARKOPOLOS', role: 'FINANCIAL ANALYST', credit: 'PHOTO: LOYOLA COLLEGE · PUBLIC DOMAIN', fx: 0.5, fy: 0.3, tilt: 0.03 }, { out: '@P41-0.2' });
el('sw', 'stopwatch', R3(6) + 380, 60, '@P40:knew-0.4', { aAt: '@P40:five-0.15', bAt: '@P40:four-0.15', a: ['KNEW IT DIDN\'T ADD UP', '5 MIN'], b: ['TOOK TO PROVE IT', '4 HOURS'] }, { out: '@P41-0.2' });
bt('@P40', 'graphic-hero', 'sil40', { move: 'whip', fill: 0.3, maxH: 660, sy: 530, pose: 'point' }); sf('@P40+0.8', 'camera_flash_1', -9, 0.6); bt('@P40:harry', 'zoom-on-number', 'sil40.name', { fill: 0.3, maxH: 300, sy: 520 });
bt('@P40:copy', 'side-by-side', 'sw', { fill: 0.6, sx: 900, sy: 500, st: 'corner', pose: 'point', dur: 1.0 }); bt('@P40:five', 'zoom-on-number', 'sw.a', { fill: 0.42, maxH: 300, sy: 480, pose: 'shock' }); sf('@P40:five-0.15', 'clock_ticking_1', -9, 1.6); sf('@P40:five+0.1', 'ding_2', -9, 0.7);
bt('@P40:add', 'graphic-hero', 'sw', { fill: 0.6, sx: 900, sy: 500 }); bt('@P40:four', 'zoom-on-number', 'sw.b', { fill: 0.42, maxH: 300, sy: 520, pose: 'chin' }); sf('@P40:four-0.15', 'clock_ticking_2', -9, 2.0); sf('@P40:hours+0.1', 'deep_boom_2', -6, 0.5); sk('@P40:hours', 8);
bt('@P40:prove', 'presenter-front', 'sw', { fill: 0.6, sx: 900, pose: 'talk' });
// S7: only 4% losing months
el('h41', 'text', R3(7) - 760, 40, '@P41:red-0.2', { lines: [[['RED FLAGS', 'bad']], [['WERE MATH', 'paper']]], size: 100 }, { out: '@P42-0.2' });
el('cells', 'cells', R3(7), 70, '@P41:madoff-0.1', { at: '@P41:madoff', redAt: '@P41:4', label: '≈ 4% LOSING MONTHS', labelAt: '@P41:4+0.15' }, { out: '@P42-0.2' });
bt('@P41', 'graphic-hero', 'h41', { move: 'whip', fill: 0.36, sx: 960, sy: 480, pose: 'point' }); sf('@P41+0.2', 'typewriter_2', -14, 1.2);
bt('@P41:madoff', 'graphic-hero', 'cells', { fill: 0.4, maxH: 800, sy: 490, pose: 'point' }); sf('@P41:madoff', 'click_2', -12, 1.6);
bt('@P41:4', 'zoom-on-number', 'cells', { fill: 0.46, maxH: 780, sy: 500, pose: 'shock' }); sf('@P41:4', 'pop_1', -6, 0.3); sf('@P41:4+0.15', 'wrong_buzzer_1', -12, 0.6); sk('@P41:4+0.2', 8);
bt('@P41:real', 'presenter-front', 'cells', { fill: 0.46, pose: 'talk' });
// S8: options that existed vs options he needed
el('nd', 'needed', R3(8), 60, '@P42+0.0', { aAt: '@P42:chicago', bAt: '@P42:needed-0.1' }, { out: '@P43-0.2' });
el('imp42', 'stamp', R3(8) + 750, 120, '@P42:existed-0.1', { text: 'IMPOSSIBLE', tone: 'bad', size: 150 }, { rot: -0.08, out: '@P43-0.2' });
bt('@P42', 'presenter-front', 'nd', { move: 'whip', fill: 0.5, maxH: 760, sx: 800, sy: 500, pose: 'talk' }); bt('@P42:to', 'graphic-hero', 'nd', { fill: 0.5, maxH: 760, sx: 820, sy: 500, pose: 'point' });
bt('@P42:chicago', 'zoom-on-number', 'nd.a', { fill: 0.3, maxH: 680, sx: 820, sy: 500 }); sf('@P42:chicago', 'thud_1', -9, 0.5);
bt('@P42:needed', 'zoom-on-number', 'nd.b', { fill: 0.3, maxH: 760, sx: 820, sy: 480, pose: 'shock' }); sf('@P42:needed-0.1', 'riser_1', -15, 1.4); sf('@P42:more', 'glass_shatter_1', -10, 0.8); sk('@P42:more', 10);
bt('@P42:existed', 'graphic-hero', ['nd', 'imp42'], { fill: 0.7, sx: 840, sy: 500, pose: 'shock' }); sf('@P42:existed-0.1', 'rubber_stamp_2', -4, 0.5); sf('@P42:existed', 'deep_boom_1', -5, 1.6);
// S9: callback to 1991: 123 claimed, 20 traded
el('y43', 'text', R3(9), -400, '@P43:pattern-0.2', { lines: [[['SAME PATTERN AS ', 'paper'], ['1991', 'accent']]], size: 84 }, { out: '@P44-0.2' });
el('tk2', 'ticket', R3(9) - 600, 90, '@P43:123-0.6', { at: '@P43:123-0.2', dur: 0.7, to: 123, tone: 'good', rowsAt: '@P43:123' }, { out: '@P44-0.2' });
el('tr2', 'counter', R3(9) + 600, 90, '@P43:20-0.4', { label: 'ACTUALLY TRADED', to: 20, at: '@P43:20-0.15', dur: 0.4, tone: 'bad', size: 230, w: 640, underline: true }, { out: '@P44-0.2' });
bt('@P43', 'graphic-hero', 'y43', { move: 'whip', fill: 0.4, sx: 960, sy: 470, pose: 'chin' }); bt('@P43:1991', 'graphic-hero', ['y43', 'tk2', 'tr2'], { fill: 0.78, sy: 480, pose: 'point' });
bt('@P43:123', 'zoom-on-number', 'tk2.qty', { fill: 0.4, maxH: 420, sy: 560, pose: 'point' }); sf('@P43:123-0.3', 'paper_slam_2', -9, 0.5); sf('@P43:123', 'deep_boom_2', -7, 0.4); sf('@P43:123+0.05', 'ding_2', -10, 0.7);
bt('@P43:20', 'zoom-on-number', 'tr2.value', { fill: 0.4, maxH: 420, sy: 540, pose: 'shock', dur: 0.5 }); sf('@P43:20-0.15', 'money_counter_2', -12, 0.5); sf('@P43:20', 'deep_boom_1', -5, 1.2); sk('@P43:20', 12);
// S10: the SEC, 2000, again, 2005 memo
el('sec', 'icon', R3(10) - 1000, 40, '@P44+0.0', { kind: 'building', s: 360, col: 'paper' }, { out: '@P45-0.2' });
el('secb', 'badge', R3(10) - 1000, 270, '@P44+0.1', { text: 'U.S. SEC', tone: 'navy', size: 46 }, { out: '@P45-0.2' });
el('tl44', 'timeline', R3(10) - 250, 60, '@P44:to-0.1', { w: 760, step: 150, items: [{ id: 'y0', date: '2000', label: 'FIRST TIME', at: '@P44:2000-0.1', tone: 'accent' }, { id: 'y1', date: 'AGAIN', label: 'AND AGAIN', at: '@P44:again-0.1', tone: 'accent' }, { id: 'y2', date: '2005', label: 'THE MEMO', at: '@P44:2005-0.1', tone: 'bad' }] }, { out: '@P45-0.2' });
el('memo', 'memo', R3(10) + 900, 40, '@P44:memo-0.35', { titleAt: '@P44:the#2', to: 'U.S. SEC', date: '2005' }, { out: '@P45-0.2' });
bt('@P44', 'graphic-hero', ['sec', 'secb'], { move: 'whip', fill: 0.26, maxH: 640, sy: 500, pose: 'point' }); bt('@P44:sec', 'side-by-side', ['sec', 'secb', 'tl44'], { fill: 0.7, sx: 900, sy: 490, pose: 'point' }); sf('@P44:sec-0.35', 'pop_2', -8, 0.3);
bt('@P44:2000', 'zoom-on-number', 'tl44.y0', { fill: 0.32, maxH: 260, sy: 400 }); sf('@P44:2000-0.1', 'pop_1', -8, 0.3); bt('@P44:again', 'zoom-on-number', 'tl44.y1', { fill: 0.32, maxH: 260, sy: 470 }); sf('@P44:again-0.1', 'pop_2', -8, 0.3);
bt('@P44:2005', 'zoom-on-number', 'tl44.y2', { fill: 0.32, maxH: 260, sy: 540, pose: 'chin' }); sf('@P44:2005-0.1', 'pop_1', -7, 0.3);
bt('@P44:memo', 'graphic-hero', 'memo', { move: 'whip', fill: 0.36, maxH: 780, sy: 480, pose: 'point' }); sf('@P44:memo-0.35', 'paper_slam_2', -10, 0.5); bt('@P44:the#2', 'zoom-on-number', 'memo.title', { fill: 0.4, maxH: 420, sy: 480, pose: 'shock' }); sf('@P44:the#2', 'typewriter_2', -10, 2.2); sf('@P44:fraud+0.2', 'deep_boom_2', -6, 0.5); sk('@P44:fraud+0.2', 8);
// S11: eight looks in sixteen years
el('h45', 'text', R3(11), -340, '@P45:over-0.1', { lines: [[['16 YEARS · AT LEAST ', 'paper'], ['8 LOOKS', 'accent']]], size: 76 }, { out: '@P46-0.2' });
el('len', 'lenses', R3(11), 40, '@P45-0.2', { at: '@P45:regulators-0.2', per: 0.5, n: 8, from: '1992', to: '2008' }, { out: '@P46-0.2' });
bt('@P45', 'graphic-hero', ['h45', 'len'], { move: 'whip', fill: 0.9, sy: 480, pose: 'point' }); bt('@P45:looked', 'zoom-on-number', 'len.row', { fill: 0.82, maxH: 520, sy: 520, pose: 'point' }); for (let i = 0; i < 8; i++) sf(`@P45:regulators+${(0.1 + i * 0.5).toFixed(2)}`, 'click_1', -11, 0.3);
bt('@P45:eight', 'graphic-hero', ['h45', 'len'], { fill: 0.9, sy: 480, pose: 'idle' }); bt('@P45:didn\'t', 'presenter-front', 'len', { fill: 0.82, pose: 'shrug', sy: 500 }); sf('@P45:find', 'sad_trombone_2', -16, 1.6);
// S12: 2008, $7 billion asked for back
el('y46', 'text', R3(12), 40, '@P46:2008-0.1', { lines: [[['2008', 'accent']]], size: 360 }, { out: '@P46:markets-0.1' });
el('cr46', 'chart', R3(12), 50, '@P46:markets-0.25', { w: 1100, h: 560, title: 'MARKETS CRASHED', series: [{ kind: 'crash', seed: 8, crashAt: 0.15, n: 100, drift: 0.01, vol: 0.03, tone: 'bad', at: '@P46:markets-0.1', dur: 1.6, lin: true, w: 10, fall: 0.07 }] }, { out: '@P46:about-0.5' });
el('ask7', 'counter', R3(12), 40, '@P46:about-0.5', { label: 'INVESTORS ASKED FOR THEIR MONEY BACK', to: 7000000000, prefix: '$', at: '@P46:$7-0.2', dur: 0.9, tone: 'bad', size: 190, w: 1280, underline: true }, { out: '@P47-0.2' });
bt('@P46', 'graphic-hero', 'y46', { move: 'whip', fill: 0.4, sy: 480, pose: 'shock' }); sf('@P46-0.1', 'deep_boom_1', -5, 1.6); sk('@P46+0.15', 10); bt('@P46:markets', 'graphic-hero', 'cr46', { fill: 0.58, maxH: 700, sy: 480, pose: 'point' }); sf('@P46:markets-0.1', 'sub_drop_1', -9, 1.2);
bt('@P46:about', 'graphic-hero', 'ask7', { fill: 0.6, sy: 470, pose: 'point' }); bt('@P46:$7', 'zoom-on-number', 'ask7.value', { fill: 0.56, maxH: 360, sy: 470, pose: 'shock' }); sf('@P46:$7-0.2', 'money_counter_1', -10, 1.0); sf('@P46:billion+0.4', 'cash_register_1', -8, 0.9); sk('@P46:billion+0.4', 12);
// S13: over $5 billion down to $234 million
el('bars47', 'bars', R3(13), 60, '@P47-0.2', { h: 520, barW: 220, gap: 360, note: 'MADOFF\'S BANK ACCOUNT · TRUE SCALE', items: [{ id: 'had', label: 'HAD HELD (EARLIER THAT YEAR)', value: 5000000000, display: { prefix: '$', suffix: '+' }, tone: 'good', at: '@P47:$5-0.3', size: 68 }, { id: 'down', label: 'DOWN TO', value: 234000000, display: { prefix: '$' }, tone: 'bad', at: '@P47:$234-0.25', size: 68 }] }, { out: '@P48-0.2' });
bt('@P47', 'graphic-hero', 'bars47', { move: 'whip', fill: 0.4, maxH: 760, sy: 500, pose: 'point' }); bt('@P47:$5', 'zoom-on-number', 'bars47.had_top', { fill: 0.4, maxH: 420, sy: 400, pose: 'idle' }); sf('@P47:$5-0.3', 'money_counter_1', -11, 1.0); sf('@P47:$5+0.7', 'ding_2', -9, 0.7);
bt('@P47:was', 'graphic-hero', 'bars47', { fill: 0.4, maxH: 600, sy: 520, pose: 'idle', st: 'peek' }); bt('@P47:$234', 'zoom-on-number', 'bars47.down_top', { fill: 0.34, maxH: 420, sy: 400, pose: 'shock' }); sf('@P47:$234-0.25', 'sub_drop_2', -9, 1.2); sf('@P47:$234+0.5', 'deep_boom_2', -6, 0.5); sk('@P47:$234', 8);
// S14: December 10 -> the next morning, arrested
el('cal48', 'calendar', R3(14) - 700, 60, '@P48-0.3', { head: 'DECEMBER 2008', pages: [{ at: '@P48:december', text: 'DEC 10' }, { at: '@P48:morning', text: 'DEC 11', tone: 'bad' }], size: 200, w: 640, h: 480 }, { out: '@P49-0.2' });
el('sons', 'card', R3(14) + 560, 60, '@P48:told-0.4', { w: 980, h: 300, fill: 'navy', lines: [{ t: 'HE TOLD HIS SONS HE WAS FINISHED', size: 38, tone: 'paper', at: '@P48:told' }, { t: 'THE FUND WAS A PONZI SCHEME', size: 46, tone: 'paper', at: '@P48:fund', mark: 'bad', gap: 80 }] }, { out: '@P48:morning-0.3' });
el('arr', 'stamp', R3(14) + 540, 60, '@P48:arrested-0.1', { text: 'ARRESTED', tone: 'bad', size: 150 }, { rot: -0.07, out: '@P49-0.2' });
el('cuffs', 'icon', R3(14) + 1100, 340, '@P48:arrested-0.2', { kind: 'cuffs', s: 220, col: 'paper' }, { out: '@P49-0.2' });
bt('@P48', 'graphic-hero', 'cal48', { move: 'whip', fill: 0.34, maxH: 520, sy: 480, pose: 'point' }); bt('@P48:december', 'zoom-on-number', 'cal48.value', { fill: 0.34, maxH: 380, sy: 480 }); sf('@P48:december', 'paper_slam_2', -10, 0.5);
bt('@P48:told', 'side-by-side', 'sons', { fill: 0.58, sx: 900, sy: 490, st: 'corner', pose: 'point' }); sf('@P48:told-0.3', 'pop_2', -8, 0.3); sf('@P48:fund', 'typewriter_2', -11, 1.0); bt('@P48:they', 'presenter-front', 'sons', { fill: 0.58, pose: 'talk' });
bt('@P48:morning', 'graphic-hero', 'cal48', { move: 'whip', fill: 0.34, maxH: 520, sy: 480, pose: 'point' }); sf('@P48:morning', 'paper_slam_2', -9, 0.5);
bt('@P48:arrested', 'zoom-on-number', ['arr', 'cuffs'], { fill: 0.5, maxH: 520, sy: 470, pose: 'shock', dur: 0.5 }); sf('@P48:arrested-0.1', 'rubber_stamp_2', -3, 0.5); sf('@P48:arrested', 'cell_door_2', -9, 1.2); sk('@P48:arrested', 14);
// S15: $64.8 billion; $35-55 billion never existed
el('f648', 'counter', R3(15), -130, '@P49-0.2', { label: 'PROSECUTORS PUT THE FRAUD AT', to: 64.8, decimals: 1, prefix: '$', suffix: 'B', at: '@P49:$64-0.2', dur: 1.0, tone: 'bad', size: 200, w: 1000, underline: true }, { out: '@P50-0.2' });
el('br49', 'bracket', R3(15), 360, '@P49:$35-0.4', { w: 900, at: '@P49:$35-0.3', lines: [{ t: '$35–55B', hero: true, tone: 'bad', size: 70 }, { t: 'NEVER EXISTED · MARKOPOLOS ESTIMATE', size: 30 }] }, { out: '@P50-0.2' });
bt('@P49', 'graphic-hero', 'f648', { move: 'whip', fill: 0.42, maxH: 760, sy: 450, pose: 'point' }); bt('@P49:$64', 'zoom-on-number', 'f648.value', { fill: 0.5, maxH: 420, sy: 440, pose: 'shock' }); sf('@P49:$64-0.2', 'money_counter_1', -10, 1.1); sf('@P49:billion+0.3', 'deep_boom_1', -4, 1.8); sf('@P49:billion+0.35', 'cash_register_1', -8, 0.9); sk('@P49:billion+0.3', 14);
bt('@P49:based', 'pull-back', ['f648', 'br49'], { fill: 0.5, maxH: 760, sy: 490, pose: 'idle' }); bt('@P49:$35', 'zoom-on-number', 'br49', { fill: 0.5, maxH: 420, sy: 540, pose: 'point' }); sf('@P49:$35-0.3', 'swoosh_2', -11, 0.6); sf('@P49:$55+0.3', 'pop_1', -8, 0.3);
bt('@P49:never', 'graphic-hero', ['f648', 'br49'], { fill: 0.5, maxH: 760, sy: 490, pose: 'shrug' });
// S16: guilty, 150 years, died in prison
el('jail50', 'jail', R3(16), 40, '@P50-0.2', { dropAt: '@P50+0.1', plaqueAt: '@P50+0.4', head: '', lines: [{ t: '11 FEDERAL CRIMES', size: 66, at: '@P50:11-0.1', tone: 'ink' }, { t: '150 YEARS', size: 120, at: '@P50:150-0.1', tone: 'bad' }] }, { out: '@P51-0.2' });
el('died', 'text', R3(16), 540, '@P50:he-0.1', { lines: [[['DIED IN PRISON, ', 'paper'], ['2021', 'accent']]], size: 70 }, { out: '@P51-0.2' });
bt('@P50', 'graphic-hero', 'jail50', { move: 'whip', fill: 0.38, maxH: 760, sy: 480, pose: 'point' }); sf('@P50+0.1', 'cell_door_1', -7, 1.6); sf('@P50+0.12', 'thud_1', -8, 0.6); sk('@P50+0.15', 10);
bt('@P50:11', 'zoom-on-number', 'jail50.plaque', { fill: 0.34, maxH: 420, sy: 520 }); sf('@P50:11-0.1', 'gavel_1', -5, 0.8); bt('@P50:150', 'zoom-on-number', 'jail50.plaque', { fill: 0.4, maxH: 420, sy: 540, pose: 'shock' }); sf('@P50:150-0.1', 'paper_slam_2', -9, 0.5); sf('@P50:150+0.1', 'deep_boom_1', -5, 1.6); sk('@P50:150', 12);
bt('@P50:he', 'graphic-hero', ['jail50', 'died'], { fill: 0.5, maxH: 780, sy: 470, pose: 'chin' }); sf('@P50:he-0.1', 'cell_door_2', -9, 1.2);
