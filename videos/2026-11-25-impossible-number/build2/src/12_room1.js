// ---------------- ROOM 1 · THE COUPON THAT COULDN'T EXIST (P08-P20), warm sepia stage ----------------
const R1 = k => K(X1, k);
el('ch1', 'headline', R1(0), 40, '@P08-0.3', { kicker: 'CHAPTER ONE', lines: ['THE COUPON', [["THAT COULDN'T ", 'paper'], ['EXIST', 'bad']]], size: 150, underAt: 1.0 });
bt('@P08', 'graphic-hero', 'ch1', { move: 'whip', dur0: 0.7, fill: 0.74, sy: 470, pose: 'shrug', arc: 0.2 }); sf('@P08-0.6', 'tape_stop_1', -8, 1.0); sf('@P08-0.1', 'cinematic_hit_1', -9, 1.5); sf('@P08+0.9', 'paper_slam_2', -10, 0.5); sk('@P08+0.7', 8);
// S1: banks vs Ponzi
el('h9', 'text', R1(1) + 340, -300, '@P09', { lines: [[['BOSTON, ', 'paper'], ['1920', 'accent']]], size: 86 }, { out: '@P09:5-0.3' });
el('sil9', 'silh', R1(1) - 760, 40, '@P09:charles-0.35', { name: 'CHARLES PONZI', role: 'FORMER DISHWASHER', hat: 'bowler' }, { out: '@P10-0.2', rot: -0.03 });
el('bars9', 'bars', R1(1) + 340, 70, '@P09+0.2', { h: 460, barW: 170, gap: 110, note: 'ON EVERY $100', items: [
  { id: 'bank', label: 'BANK', sub: '~5% A YEAR', value: 5, display: { prefix: '+$' }, tone: 'good', at: '@P09:5' },
  { id: 'ponzi', label: 'PONZI', sub: '50% IN 45 DAYS', value: 50, display: { prefix: '+$' }, tone: 'bad', at: '@P09:50' }] }, { out: '@P10-0.2' });
bt('@P09', 'graphic-hero', ['h9', 'bars9'], { move: 'whip', fill: 0.5, sx: 960, sy: 500, pose: 'point' });
bt('@P09:5', 'zoom-on-number', 'bars9.bank_top', { fill: 0.32, maxH: 260, sy: 400 }); bt('@P09:charles', 'peek', 'sil9', { fill: 0.34, sy: 560, maxH: 600, pose: 'idle' });
bt('@P09:50', 'zoom-on-number', 'bars9', { fill: 0.36, maxH: 560, sy: 470, pose: 'shock' }); sk('@P09:50', 12); bt('@P09:45', 'graphic-hero', 'bars9', { fill: 0.34, maxH: 580, sy: 470, pose: 'point' });
sf('@P09:5', 'pop_2', -8, 0.3); sf('@P09:5+0.1', 'money_counter_2', -13, 0.7); sf('@P09:charles-0.2', 'camera_flash_1', -9, 0.6); sf('@P09:50', 'cash_register_1', -8, 0.9); sf('@P09:50+0.05', 'deep_boom_2', -7, 0.4);
// S2: reply coupons, Europe -> America
el('h10', 'text', R1(2) - 650, -230, '@P10+0.1', { lines: [[['THE PITCH:', 'paper']]], size: 80 }, { out: '@P10:little' });
el('coupon', 'coupon', R1(2) - 650, 40, '@P10+0.1', { flipAt: '@P10:international-0.25' }, { out: '@P12-0.2' });
el('map10', 'map', R1(2) + 620, 40, '@P10:europe-0.5', { w: 940, h: 640, title: '', nodes: [{ id: 'eu', x: 0.17, y: 0.55, label: 'EUROPE', at: '@P10:europe', tone: 'accent' }, { id: 'am', x: 0.83, y: 0.55, label: 'AMERICA', at: '@P10:america', tone: 'good' }], links: [{ from: 'eu', to: 'am', at: '@P10:trade', dur: 1.0, tone: 'paper' }] }, { out: '@P12-0.2' });
el('tagEU', 'badge', R1(2) + 620 - 300, -140, '@P11:buy-0.05', { text: 'BUY LOW', tone: 'accent', tcol: 'ink', size: 44 }, { out: '@P12-0.2' });
el('tagAM', 'badge', R1(2) + 620 + 300, -140, '@P11:cash-0.05', { text: 'CASH IN HIGH', tone: 'good', tcol: 'ink', size: 44 }, { out: '@P12-0.2' });
el('legal', 'stamp', R1(2) + 620 + 330, 330, '@P11:legal-0.1', { text: 'LEGAL', tone: 'good', size: 96 }, { rot: 0.09, out: '@P12-0.2' });
bt('@P10', 'graphic-hero', ['h10', 'coupon'], { move: 'whip', fill: 0.4, sx: 960, sy: 480, pose: 'point' }); sf('@P10:international-0.2', 'swoosh_2', -11, 0.6); sf('@P10:international+0.1', 'paper_slam_2', -10, 0.5);
bt('@P10:europe', 'side-by-side', 'map10', { fill: 0.5, st: 'corner', pose: 'point', sx: 960 }); bt('@P10:america', 'zoom-on-number', 'map10.am', { fill: 0.26, maxH: 360, sy: 500 }); bt('@P10:trade', 'graphic-hero', 'map10', { fill: 0.5, pose: 'point' });
sf('@P10:europe', 'pop_2', -8, 0.3); sf('@P10:america', 'pop_1', -8, 0.3); sf('@P10:trade+0.05', 'swoosh_1', -12, 0.8);
bt('@P11:buy', 'zoom-on-number', 'map10.eu', { fill: 0.26, maxH: 360, sy: 500 }); sf('@P11:buy', 'pop_1', -8, 0.3);
bt('@P11:cash', 'zoom-on-number', 'map10.am', { fill: 0.26, maxH: 360, sy: 500 }); sf('@P11:cash', 'pop_2', -8, 0.3); sf('@P11:cash+0.15', 'coin_single_1', -9, 0.6);
bt('@P11:on', 'presenter-front', 'map10', { pose: 'shrug', fill: 0.5 }); bt('@P11:legal', 'graphic-hero', 'map10', { fill: 0.5, pose: 'point', sy: 540 }); sf('@P11:legal', 'rubber_stamp_2', -4, 0.5); sk('@P11:legal', 8);
// S3: the line outside the Securities Exchange Co.
el('q12', 'queue', R1(3), 120, '@P12-0.3', { n: 12, at: '@P12+0.3', capsAt: '@P13:police', caps: 8 }, { out: '@P14-0.2' });
el('day', 'counter', R1(3) - 0, -340, '@P12:by-0.2', { label: 'BY JULY · POURING IN', sub: 'PER DAY', to: 1000000, prefix: '$', at: '@P12:million-0.5', dur: 0.8, tone: 'good', size: 150, w: 880, underline: false }, { out: '@P13-0.05' });
el('police', 'stamp', R1(3) - 150, -100, '@P13:police+0.1', { text: "MOST OF BOSTON'S POLICE FORCE", tone: 'accent', size: 62 }, { rot: -0.05, out: '@P14-0.2' });
bt('@P12', 'graphic-hero', 'q12', { move: 'whip', fill: 0.84, sy: 520, pose: 'point' }); bt('@P12:early', 'zoom-on-number', 'q12.line', { fill: 0.7, maxH: 360, sy: 560 });
bt('@P12:word', 'zoom-on-number', 'q12.door', { fill: 0.3, maxH: 520, sy: 520, st: 'corner' }); bt('@P12:july', 'graphic-hero', ['day', 'q12'], { fill: 0.6, sy: 470, pose: 'point' });
bt('@P12:million', 'zoom-on-number', 'day.value', { fill: 0.48, maxH: 400, pose: 'shock' }); sk('@P12:million+0.4', 10);
sf('@P12:early', 'crowd_ooh_1', -18, 2.5); sf('@P12:million-0.5', 'money_counter_1', -11, 0.9); sf('@P12:million+0.3', 'cash_register_1', -8, 0.9);
bt('@P13', 'graphic-hero', 'q12', { fill: 0.84, sy: 520, pose: 'point' }); bt('@P13:police', 'graphic-hero', ['q12', 'police'], { fill: 0.7, maxH: 700, sy: 480, pose: 'shock' }); sf('@P13:police+0.1', 'rubber_stamp_2', -5, 0.5); sf('@P13:police', 'pop_1', -12, 0.4);
// S4: Clarence Barron did the math
el('h14', 'text', R1(4) + 350, 40, '@P14', { lines: ['NOBODY DID', 'THE MATH.'], size: 130 }, { out: '@P15-0.2' });
el('sil14', 'silh', R1(4) - 560, 60, '@P14:clarence-0.4', { name: 'CLARENCE BARRON', role: 'FINANCIAL JOURNALIST', hat: 'press' }, { rot: 0.03, out: '@P15-0.2' });
bt('@P14', 'graphic-hero', 'h14', { move: 'whip', fill: 0.4, sy: 480, pose: 'chin' }); sf('@P14', 'typewriter_2', -12, 1.4); sf('@P14:until', 'paper_slam_2', -11, 0.5);
bt('@P14:clarence', 'side-by-side', 'sil14', { fill: 0.3, maxH: 640, sy: 540, st: 'corner', pose: 'point', sx: 780 }); sf('@P14:clarence-0.3', 'camera_flash_1', -9, 0.6); bt('@P14:barron', 'zoom-on-number', 'sil14.name', { fill: 0.3, maxH: 300, sy: 520 });
// S5: 160,000,000 coupons needed vs about 27,000
el('bars15', 'bars', R1(5), 40, '@P15', { h: 540, barW: 200, gap: 340, note: 'POSTAL COUPONS · TRUE SCALE', items: [
  { id: 'need', label: 'NEEDED', sub: 'IN CIRCULATION', value: 160000000, tone: 'bad', at: '@P15:160-0.3', size: 80 },
  { id: 'real', label: 'ACTUAL', sub: 'IN CIRCULATION', value: 27000, tone: 'good', at: '@P15:27-0.1', size: 80, minH: 6 }] }, { out: '@P16-0.2' });
bt('@P15', 'graphic-hero', 'bars15', { move: 'whip', fill: 0.34, maxH: 720, sy: 500, pose: 'point' });
bt('@P15:160', 'zoom-on-number', 'bars15.need_top', { fill: 0.42, maxH: 400, sy: 400, pose: 'shock' }); sk('@P15:160+0.8', 10); bt('@P15:circulation', 'pull-back', 'bars15', { fill: 0.34, maxH: 600, sy: 520, st: 'peek' });
bt('@P15:the', 'graphic-hero', 'bars15.real_base', { fill: 0.5, maxH: 400, sy: 480, pose: 'chin', dur: 1.2 }); sf('@P15:the-0.3', 'heartbeat_1', -9, 2.0);
bt('@P15:27', 'zoom-on-number', 'bars15.real_base', { fill: 0.6, maxH: 420, sy: 480, pose: 'shock' }); sk('@P15:27', 8);
sf('@P15:160-0.3', 'money_counter_1', -11, 1.2); sf('@P15:160+0.9', 'deep_boom_1', -5, 1.6); sf('@P15:27-0.1', 'pop_2', -8, 0.3); sf('@P15:27+0.5', 'ding_2', -9, 0.7);
// S6: one coupon in 6,000
el('dots', 'dotgrid', R1(6), 110, '@P16', { at: '@P16+0.1', per: 0.7, hiAt: '@P16:one', hiCol: 72, hiRow: 22 }, { out: '@P17-0.2' });
el('lab16', 'text', R1(6), -440, '@P16:6-0.2', { lines: [[['1 ', 'good'], ['COUPON FOR EVERY ~6,000 NEEDED', 'paper']]], size: 56 }, { out: '@P17-0.2' });
bt('@P16', 'graphic-hero', 'dots', { move: 'whip', fill: 0.7, maxH: 800, sy: 490, pose: 'point' }); bt('@P16:one', 'zoom-on-number', 'dots.hi', { fill: 0.12, maxH: 150, sy: 480, dur: 0.9, pose: 'shock' }); sf('@P16:one', 'pop_1', -6, 0.4); sf('@P16:one+0.05', 'ding_2', -8, 0.7);
bt('@P16:6', 'graphic-hero', ['dots', 'lab16'], { fill: 0.8, maxH: 760, sy: 500, dur: 1.2, pose: 'idle' }); sf('@P16+0.1', 'money_counter_2', -16, 1.4);
// S7: the pyramid (new money pays old)
el('pyr', 'pyramid', R1(7), 40, '@P17-0.3', { at: '@P17+0.1', flowAt: '@P17:old', label: 'NEW MONEY PAYS OLD' }, { out: '@P18-0.2' });
bt('@P17', 'graphic-hero', 'pyr', { move: 'whip', fill: 0.4, maxH: 760, sy: 470, pose: 'point' }); bt('@P17:next', 'zoom-on-number', 'pyr.base', { fill: 0.5, maxH: 420, sy: 480 });
bt('@P17:old', 'zoom-on-number', 'pyr.top', { fill: 0.3, maxH: 420, sy: 400, pose: 'point' }); bt('@P17:that\'s', 'presenter-front', 'pyr', { fill: 0.42, pose: 'talk', sy: 470 });
sf('@P17+0.1', 'pop_2', -12, 0.3); sf('@P17:next', 'pop_1', -9, 0.3); sf('@P17:old', 'coins_drop_1', -11, 1.2); sf('@P17:trick', 'rubber_stamp_2', -10, 0.5);
// S8: the papers ran the numbers; six banks; $20,000,000
el('news', 'news', R1(8) - 760, 20, '@P18:papers-0.25', {}, { out: '@P19-0.2' });
el('banks6', 'banks', R1(8) + 500, -100, '@P18:six-0.6', { n: 6, at: '@P18:six-0.6', times: [0, 1, 2, 3, 4, 5].map(i => `@P18:six+${(0.35 + i * 0.32).toFixed(2)}`), label: 'x', labelAt: '@P18:six', s: 130, gap: 40 }, { out: '@P19-0.2' });
el('lost20', 'counter', R1(8) + 500, 330, '@P18:20-0.3', { label: 'INVESTORS LOST ABOUT', sub: 'IN 1920', to: 20000000, prefix: '$', at: '@P18:20-0.15', dur: 1.0, tone: 'bad', size: 120, w: 800, underline: false }, { out: '@P19-0.2' });
bt('@P18', 'graphic-hero', 'news', { move: 'whip', fill: 0.4, sy: 480, pose: 'point' }); sf('@P18:papers-0.2', 'swoosh_2', -10, 0.8); sf('@P18:papers+0.5', 'paper_slam_2', -10, 0.5);
bt('@P18:line', 'presenter-front', 'news', { fill: 0.42, pose: 'talk' }); sf('@P18:line', 'crowd_ooh_1', -15, 2.5);
bt('@P18:six', 'side-by-side', ['banks6', 'lost20'], { fill: 0.5, sx: 1040, sy: 480, st: 'corner', pose: 'point', move: 'whip' }); for (let i = 0; i < 6; i++) sf(`@P18:six+${(0.35 + i * 0.32).toFixed(2)}`, i % 2 ? 'explosion_small_2' : 'thud_1', -10, 0.8);
bt('@P18:20', 'zoom-on-number', 'lost20.value', { fill: 0.4, maxH: 330, sy: 470, pose: 'shock' }); sf('@P18:20-0.15', 'money_counter_1', -11, 1.0); sf('@P18:dollars+0.2', 'deep_boom_1', -5, 1.6); sk('@P18:dollars+0.2', 10);
bt('@P18:1920', 'pull-back', ['banks6', 'lost20'], { fill: 0.5, sx: 1040, sy: 480 });
// S9: guilty, the word for the scam, $75
el('gst', 'stamp', R1(9) - 600, 20, '@P19:guilty-0.1', { text: 'GUILTY', tone: 'bad', size: 170 }, { rot: -0.07, out: '@P19:his-0.1' });
el('mail', 'text', R1(9) - 600, 330, '@P19:mail-0.1', { lines: [[['MAIL FRAUD', 'paper']]], size: 80 }, { out: '@P19:his-0.1' });
el('dict', 'dict', R1(9) + 300, 0, '@P19:his-0.3', { at: '@P19:his' }, { out: '@P19:and-0.1' });
el('est', 'counter', R1(10), 40, '@P19:and-0.2', { label: 'ESTATE AT DEATH', to: 75, prefix: '$', at: '@P19:75-0.15', dur: 0.6, tone: 'bad', size: 230, w: 700, underline: true }, { out: '@P20:coupons-0.1' });
el('coins75', 'coins', R1(10) + 560, 200, '@P19:75+0.1', { count: 4, at: '@P19:75+0.1', per: 0.14, r: 56 }, { out: '@P20:coupons-0.1' });
bt('@P19', 'graphic-hero', ['gst', 'mail'], { move: 'whip', fill: 0.4, sx: 960, sy: 500, pose: 'point' }); sf('@P19:guilty-0.1', 'gavel_1', -4, 0.8); sf('@P19:guilty', 'rubber_stamp_2', -5, 0.5); sk('@P19:guilty', 12);
bt('@P19:his', 'graphic-hero', 'dict', { fill: 0.56, sy: 470, pose: 'point' }); sf('@P19:his', 'keyboard_typing_1', -12, 1.4); sf('@P19:scam', 'pop_1', -9, 0.4);
bt('@P19:and', 'graphic-hero', 'est', { move: 'whip', fill: 0.36, sy: 480, pose: 'shrug' }); bt('@P19:75', 'zoom-on-number', 'est.value', { fill: 0.36, maxH: 400, sy: 480, pose: 'shock' }); sf('@P19:75-0.15', 'money_counter_2', -12, 0.7); sf('@P19:75+0.5', 'coins_drop_2', -9, 1.2); sf('@P19:75+0.55', 'sad_trombone_1', -16, 2.0);
// S10: coupons -> a tank
el('c20', 'coupon', R1(11) - 400, 40, '@P20-0.2', { flipAt: '@P20-0.15' }, { out: '@P20:tank-0.05' });
el('t20', 'icon', R1(11) + 380, 40, '@P20:tank-0.3', { kind: 'tank', s: 380, col: 'paper' }, { enter: 'pop' });
el('h20', 'text', R1(11), -280, '@P20:coupons-0.2', { lines: [[['HIDING IN ', 'paper'], ['COUPONS', 'accent']]], size: 70 }, { out: '@P20:inside-0.1' });
bt('@P20', 'graphic-hero', 'c20', { move: 'whip', fill: 0.38, sx: 960, sy: 500, pose: 'chin' }); bt('@P20:next', 'presenter-front', ['c20', 't20'], { fill: 0.5, pose: 'talk' });
bt('@P20:tank', 'zoom-on-number', 't20', { fill: 0.2, maxH: 480, sy: 480, pose: 'point' }); sf('@P20:tank-0.3', 'pop_2', -7, 0.4); sf('@P20:tank-0.25', 'tape_stop_1', -12, 0.9);
