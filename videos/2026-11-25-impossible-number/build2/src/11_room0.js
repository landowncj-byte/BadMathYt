// ---------------- ROOM 0 · COLD OPEN (P01-P07) ----------------
// A: the 1991 ticket
el('hook0', 'text', 0, -380, -1, { lines: [[['BERNIE MADOFF', 'paper']]], size: 76 }, { out: '@P02-0.2' });
el('tk', 'ticket', 0, 70, -3, { at: -3, to: 123, pulse: '@P01:123', rowsAt: 0.3 }, { out: '@P02-0.2' });
bt(0, 'graphic-hero', ['hook0', 'tk'], { pose: 'point', sy: 500 });
bt('@P01:123', 'zoom-on-number', 'tk.qty', { fill: 0.42, sy: 560 });
sf(0, 'paper_slam_2', -9, 0.5); sf('@P01:123', 'deep_boom_2', -7, 0.4); sf('@P01:123+0.05', 'ding_2', -10, 0.7);
bt('@P01:procter', 'graphic-hero', 'tk', { fill: 0.5, sy: 520 });
// B: only 20 changed hands, then CLAIMED 123 vs EXISTED 20
el('traded', 'counter', 3250, 40, '@P02-0.4', { label: 'ENTIRE MARKET · THAT WHOLE DAY', sub: 'OPTIONS CHANGED HANDS', to: 20, at: '@P02:20-0.45', dur: 0.5, tone: 'bad', size: 250, w: 760, underline: false }, { out: '@P03' });
bt('@P02', 'side-by-side', 'traded', { move: 'whip', fill: 0.42, sx: 1060, sy: 470, st: 'left' });
bt('@P02:20', 'zoom-on-number', 'traded.value', { fill: 0.42, st: 'corner', pose: 'shock', dur: 0.5 }); sk('@P02:20', 14);
sf('@P02:20-0.45', 'money_counter_2', -12, 0.6); sf('@P02:20', 'deep_boom_1', -5, 1.2); sf('@P02:20+0.05', 'ding_2', -9, 0.7);
el('claimed', 'counter', 1950, 40, '@P03:claimed-0.1', { label: 'CLAIMED', to: 123, at: -9, tone: 'good', size: 230, w: 640 });
el('existed', 'counter', 3250, 40, '@P03', { label: 'EXISTED', to: 20, at: -9, tone: 'bad', size: 230, w: 640 });
el('six', 'text', 2600, 40, '@P03:six-0.05', { lines: [[['6×', 'accent']]], size: 300 }, { enter: 'slam' });
bt('@P03', 'graphic-hero', ['claimed', 'six', 'existed'], { fill: 0.78, sy: 470, pose: 'point' });
bt('@P03:six', 'zoom-on-number', 'six', { fill: 0.22, st: 'corner', pose: 'idle' }); sf('@P03:six', 'rubber_stamp_2', -5, 0.5); sf('@P03:claimed', 'pop_2', -9, 0.3); sf('@P03', 'pop_1', -10, 0.3); sk('@P03:six', 10);
// C: 17 more years (calendar rolls 1991 -> 2008)
el('cal', 'calendar', 5700, 40, '@P03:nobody-0.4', { head: 'YEAR', roll: { from: 1991, to: 2008, at: '@P03:nobody', dur: 2.3 }, sub: '17 MORE YEARS', subAt: '@P03:years-0.3', size: 200 });
bt('@P03:nobody', 'graphic-hero', 'cal', { move: 'whip', fill: 0.36, sy: 480, pose: 'chin' }); bt('@P03:17', 'zoom-on-number', 'cal.value', { fill: 0.34 });
sf('@P03:nobody', 'paper_slam_2', -11, 0.5); sf('@P03:nobody+0.1', 'money_counter_1', -13, 2.2); sf('@P03:years-0.3', 'ding_2', -9, 0.7);
// D: $65,000,000,000 of fake balances
el('b65', 'counter', 8300, 40, '@P04-0.4', { label: 'BY THE TIME IT COLLAPSED', sub: 'FAKE ACCOUNT BALANCES', to: 65000000000, prefix: '$', at: '@P04:$65-0.1', dur: 1.6, tone: 'bad', size: 150, w: 1180 });
bt('@P04', 'graphic-hero', 'b65', { move: 'whip', fill: 0.56, sy: 470 }); bt('@P04:$65', 'zoom-on-number', 'b65.value', { fill: 0.6, maxH: 400, dur: 0.6, st: 'corner', pose: 'shock' });
sf('@P04:$65-0.1', 'money_counter_1', -9, 1.7); sf('@P04:billion+0.35', 'deep_boom_1', -4, 1.6); sf('@P04:billion+0.4', 'cash_register_1', -9, 0.9); sk('@P04:billion+0.35', 16);
bt('@P04:balances', 'pull-back', 'b65', { fill: 0.56, pose: 'idle' });
// E: ?  /  A NUMBER THAT CANNOT EXIST
el('q', 'text', 10800, 20, '@P05:impossible-0.1', { lines: [[['?', 'accent']]], size: 640 }, { out: '@P05:a#2-0.1' });
el('imp', 'headline', 10800, 30, '@P05:a#2-0.1', { kicker: 'THE BIGGEST FRAUDS IN HISTORY ALL HIDE ONE', lines: ['A NUMBER THAT', [['CANNOT ', 'paper'], ['EXIST', 'bad']]], size: 150, underAt: 1.2 });
bt('@P05', 'presenter-front', 'b65', { sy: 480, pose: 'talk' });
bt('@P05:impossible', 'graphic-hero', 'q', { move: 'whip', fill: 0.3, sy: 480, pose: 'chin' }); sf('@P05:impossible', 'pop_2', -8, 0.4); sf('@P05:impossible-0.05', 'suspense_drone_1', -18, 3, 0);
bt('@P05:biggest', 'presenter-front', 'q', { pose: 'talk', sx: 800 });
bt('@P05:a#2', 'graphic-hero', 'imp', { fill: 0.62, sy: 470, pose: 'point' }); sf('@P05:a#2', 'typewriter_2', -11, 1.6); sf('@P05:cannot', 'rubber_stamp_2', -6, 0.5);
bt('@P05:cannot', 'zoom-on-number', 'imp.title', { fill: 0.64, maxH: 330, pose: 'shock' }); sk('@P05:cannot', 10);
// F: three case files
el('f1', 'folder', 11900, 60, '@P06+0.0', { iconAt: '@P06:coupon-0.15', tab: '1920', title: 'THE COUPON', sub: 'CASE 1', icon: 'coupon', tone: 'bad' }, { enter: 'drop' });
el('f2', 'folder', 12600, 60, '@P06+0.15', { iconAt: '@P06:tank-0.15', tab: '1963', title: 'THE TANK', sub: 'CASE 2', icon: 'tank', tone: 'accent' }, { enter: 'drop' });
el('f3', 'folder', 13300, 60, '@P06+0.3', { iconAt: '@P06:fund-0.15', tab: '2008', title: 'THE FUND', sub: 'CASE 3', icon: 'chart', tone: 'good' }, { enter: 'drop' });
bt('@P06', 'graphic-hero', ['f1', 'f2', 'f3'], { move: 'whip', fill: 0.86, sy: 470, pose: 'point' });
bt('@P06:coupon', 'zoom-on-number', 'f1', { fill: 0.27, maxH: 700, sy: 480 }); bt('@P06:tank', 'zoom-on-number', 'f2', { fill: 0.27, maxH: 700, sy: 480 }); bt('@P06:fund', 'zoom-on-number', 'f3', { fill: 0.27, maxH: 700, sy: 480 });
bt('@P06:never', 'graphic-hero', ['f1', 'f2', 'f3'], { fill: 0.86, pose: 'idle', dur: 1.0 });
for (const [w, n] of [['coupon', 'f1'], ['tank', 'f2'], ['fund', 'f3']]) sf(`@P06:${w}-0.2`, 'paper_slam_2', -9, 0.5);
sf('@P06:from+0.0', 'pop_1', -14, 0.3);
// G: the three-question test card, then the TITLE
el('test0', 'checklist', 15300, 40, '@P07-0.3', { rows: [{}, {}, {}], title: 'THE IMPOSSIBLE NUMBER TEST' }, { out: '@P07:ponzi-0.05' });
el('title', 'headline', 15300, 40, '@P07:ponzi-0.05', { kicker: 'A BAD MATH CASE FILE', lines: ['THE IMPOSSIBLE', 'NUMBER'], size: 200, underAt: 0.9 });
bt('@P07', 'graphic-hero', 'test0', { move: 'whip', fill: 0.44, sy: 490, pose: 'point' }); bt('@P07:three', 'zoom-on-number', 'test0.head', { fill: 0.5, maxH: 300 }); bt('@P07:caught', 'graphic-hero', 'test0', { fill: 0.44, sy: 490, pose: 'you' });
bt('@P07:ponzi', 'graphic-hero', 'title', { fill: 0.72, sy: 470, pose: 'shock', dur: 0.5 }); sf('@P07', 'paper_slam_2', -10, 0.5); sf('@P07:ponzi-0.05', 'deep_boom_1', -3, 2.0); sk('@P07:ponzi', 12);
