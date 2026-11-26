// ---------------- CH4 · THE LOAN THAT NEVER ENDED (P48-P59) — payday green room, Tucker (illustration) ----------------
const R4 = k => K(RM[4], k);
el('ch4', 'headline', R4(0) - 360, 40, '@P48-0.3', { kicker: 'CHAPTER FOUR', lines: ['THE LOAN THAT', [['NEVER ', 'paper'], ['ENDED', 'bad']]], size: 118, underAt: 1.0 }, { out: '@P49-0.2' });
con('u1', 'tuc', R4(0) + 640, 50, '@P48-0.2', { w: 440, variant: 'card', file: true, caseNo: 'CASE Nº 4', push: { at: '@P48', to: 1.12, dur: 4 } }, { out: '@P49-0.2' });
bt('@P48', 'graphic-hero', ['ch4', 'u1'], { move: 'whip', dur0: 0.7, fill: 0.82, sy: 480, pose: 'shrug', arc: 0.2 }); sf('@P48-0.6', 'tape_stop_1', -8, 1.0); sf('@P48-0.1', 'cinematic_hit_1', -9, 1.5); sf('@P48+0.9', 'camera_flash_1', -9, 0.6); sk('@P48+0.7', 8);
bt('@P48:loan', 'zoom-on-number', 'u1', { fill: 0.3, maxH: 760, sy: 520, pose: 'point' });
// P49 rent due Friday, paycheck Monday: a payday loan covers the gap
el('rent49', 'card', R4(1) - 620, 40, '@P49-0.2', { w: 520, h: 400, lines: [{ t: 'RENT DUE', size: 48, font: 'mono', tone: 'bad', at: '@P49+0.2', gap: 100 }, { t: 'FRIDAY', size: 104, tone: 'bad', at: '@P49:friday' }] }, { out: '@P50-0.2' });
el('pay49', 'card', R4(1) + 620, 40, '@P49:paycheck-0.5', { w: 520, h: 400, lines: [{ t: 'PAYCHECK', size: 48, font: 'mono', tone: 'good', at: '@P49:paycheck', gap: 100 }, { t: 'MONDAY', size: 104, tone: 'good', at: '@P49:monday' }] }, { out: '@P50-0.2' });
el('gap49', 'text', R4(1), 40, '@P49:payday-0.1', { lines: [[['A PAYDAY LOAN', 'gold']], [['COVERS THE GAP', 'paper', 52]]], size: 66 }, { out: '@P50-0.2' });
bt('@P49', 'graphic-hero', 'rent49', { move: 'whip', fill: 0.3, maxH: 560, sy: 500, pose: 'point' }); sf('@P49-0.3', 'swoosh_2', -11, 0.5); sf('@P49:friday', 'paper_slam_2', -10, 0.5);
bt('@P49:paycheck', 'graphic-hero', ['rent49', 'pay49'], { fill: 0.9, sy: 500, pose: 'point' }); sf('@P49:monday', 'paper_slam_2', -10, 0.5); bt('@P49:payday', 'graphic-hero', ['rent49', 'pay49', 'gap49'], { fill: 0.9, sy: 500, pose: 'chin' }); sf('@P49:payday', 'pop_2', -8, 0.4);
bt('@P49:borrow', 'zoom-on-number', 'gap49', { fill: 0.4, maxH: 300, sy: 460, pose: 'point' });
// P50 the pitch: borrow $500, pay back $650
con('u2', 'tuc', R4(2) - 640, 40, '@P50-0.3', { w: 440, variant: 'card', flash: false }, { out: '@P52-0.2' });
el('b500', 'counter', R4(2) + 160, -140, '@P50:$500-0.2', { label: 'BORROW', to: 500, prefix: '$', at: '@P50:$500', dur: 0.8, tone: 'good', size: 150, w: 640 }, { out: '@P52-0.2' });
el('p650', 'counter', R4(2) + 160, 190, '@P50:pay-0.2', { label: 'PAY BACK', to: 650, prefix: '$', at: '@P50:$650', dur: 0.8, tone: 'bad', size: 150, w: 640 }, { out: '@P52-0.2' });
el('pw50', 'text', R4(2) + 700, 20, '@P50:paperwork-0.1', { lines: [[['THE PAPERWORK', 'paper']], [['SAID SO', 'gold']]], size: 54 }, { out: '@P51-0.2' });
bt('@P50', 'graphic-hero', ['u2', 'b500'], { move: 'whip', fill: 0.72, sy: 490, pose: 'point' }); sf('@P50-0.3', 'swoosh_2', -11, 0.5);
bt('@P50:$500', 'zoom-on-number', 'b500.value', { fill: 0.4, maxH: 400, sy: 480 }); sf('@P50:$500', 'money_counter_2', -12, 1.0); bt('@P50:$650', 'zoom-on-number', 'p650.value', { fill: 0.4, maxH: 400, sy: 520, pose: 'point' }); sf('@P50:$650', 'money_counter_2', -12, 1.0);
bt('@P50:paperwork', 'graphic-hero', ['b500', 'p650', 'pw50'], { fill: 0.7, sx: 1000, sy: 500 });
// P51 expensive but clear — except that's not what happened
el('ec51', 'stamp', R4(3) - 380, -120, '@P51:expensive-0.1', { text: 'EXPENSIVE, BUT CLEAR', tone: 'good', size: 96 }, { rot: -0.04, out: '@P51:except-0.1' });
el('ex51', 'stamp', R4(3) + 20, 90, '@P51:except-0.05', { text: 'EXCEPT…', tone: 'bad', size: 190 }, { rot: -0.05, out: '@P52-0.2' });
bt('@P51', 'graphic-hero', 'ec51', { move: 'whip', fill: 0.6, maxH: 400, sy: 500, pose: 'shrug' }); sf('@P51-0.3', 'swoosh_2', -11, 0.5); sf('@P51:expensive', 'rubber_stamp_2', -6, 0.5);
bt('@P51:except', 'zoom-on-number', 'ex51', { fill: 0.62, maxH: 460, sy: 480, pose: 'shock' }); sf('@P51:except', 'rubber_stamp_2', -4, 0.5); sk('@P51:except', 12); sf('@P51:except', 'wrong_buzzer_2', -11, 0.6);
// P52 the trick: auto-renew every payday, $150 fee each time, the $500 never goes down
el('pd52', 'paydays', R4(4), 40, '@P52-0.3', { w: 1560, h: 660, n: 5, at: '@P52:renewed', per: 0.9, fee: 150, owed: 500 }, { out: '@P53-0.2' });
con('u52', 'tuc', R4(4) + 1000, 400, '@P52:company-0.1', { w: 240, variant: 'pip', label: 'THE TRICK', flash: false }, { out: '@P53-0.2' });
bt('@P52', 'graphic-hero', 'pd52', { move: 'whip', fill: 0.78, maxH: 760, sy: 500, pose: 'point' }); sf('@P52-0.3', 'swoosh_2', -11, 0.5);
for (let i = 0; i < 5; i++) sf(`@P52:renewed+${(i * 0.9).toFixed(1)}`, 'cash_register_1', -10, 0.8);
bt('@P52:took', 'zoom-on-number', 'pd52.paid', { fill: 0.24, maxH: 500, sy: 540, pose: 'shock' }); bt('@P52:$500', 'zoom-on-number', 'pd52.owed', { fill: 0.24, maxH: 500, sy: 540, pose: 'point' }); sf('@P52:$500', 'wrong_buzzer_2', -11, 0.6);
bt('@P52:down', 'graphic-hero', 'pd52', { fill: 0.78, maxH: 760, sy: 500, pose: 'shock' });
// P53 DOJ borrower paid $1,925 on a $500 loan
el('c53', 'counter', R4(5) + 100, -80, '@P53-0.3', { label: 'ONE BORROWER PAID', sub: 'ON A $500 LOAN', to: 1925, prefix: '$', at: '@P53:$1', dur: 1.4, tone: 'bad', size: 210, w: 1000 }, { out: '@P54-0.2' });
con('u53', 'tuc', R4(5) - 700, 80, '@P53-0.2', { w: 320, variant: 'pip', label: 'DOJ SAYS', flash: false, arrow: { at: '@P53:$1', to: [260, -60] } }, { out: '@P54-0.2' });
bt('@P53', 'graphic-hero', ['c53', 'u53'], { move: 'whip', fill: 0.78, sy: 490, pose: 'point' }); sf('@P53-0.3', 'swoosh_2', -11, 0.5);
bt('@P53:$1', 'zoom-on-number', 'c53.value', { fill: 0.56, maxH: 480, sy: 500, pose: 'shock' }); sf('@P53:$1', 'money_counter_1', -12, 1.5); sf('@P53:loan', 'deep_boom_1', -6, 1.0); sk('@P53:loan', 12);
// P54 ~700% a year vs credit card 22%
el('bar54', 'bars', R4(6), 0, '@P54-0.3', { items: [{ id: 'cc', label: 'CREDIT CARD', value: 22, show: 22, display: { suffix: '%' }, tone: 'accent', at: '@P54+0.5' }, { id: 'pd', label: 'THIS LOAN', value: 700, show: 700, display: { suffix: '%' }, tone: 'bad', at: '@P54+0.9', style: 'cash' }], max: 700, h: 640, barW: 260, gap: 260, note: 'APR · PER YEAR' }, { out: '@P55-0.2' });
bt('@P54', 'graphic-hero', 'bar54', { move: 'whip', fill: 0.52, maxH: 800, sy: 500, pose: 'point' }); sf('@P54-0.3', 'swoosh_2', -11, 0.5);
bt('@P54:700', 'zoom-on-number', 'bar54.pd_top', { fill: 0.3, maxH: 460, sy: 420, pose: 'shock' }); sf('@P54:700', 'money_counter_2', -11, 1.2); sk('@P54:700+0.6', 10);
bt('@P54:credit', 'graphic-hero', 'bar54', { fill: 0.5, maxH: 800, sy: 500, pose: 'point' }); bt('@P54:22', 'zoom-on-number', 'bar54.cc_base', { fill: 0.3, maxH: 420, sy: 560, pose: 'point' }); sf('@P54:22', 'pop_2', -8, 0.4);
// P55 4.5M borrowers, $3.5B
el('c55a', 'counter', R4(7) - 400, 0, '@P55-0.3', { label: 'AT LEAST', sub: 'PEOPLE BORROWED', to: 4500000, at: '@P55:four', dur: 1.3, tone: 'paper', size: 150, w: 800 }, { out: '@P56-0.2' });
el('c55b', 'counter', R4(7) + 520, 0, '@P55:brought-0.3', { label: 'THE BUSINESS BROUGHT IN', sub: 'MORE THAN', to: 3500000000, prefix: '$', at: '@P55:$3', dur: 1.5, tone: 'bad', size: 120, w: 920 }, { out: '@P56-0.2' });
bt('@P55', 'graphic-hero', 'c55a', { move: 'whip', fill: 0.42, maxH: 600, sy: 490, pose: 'point' }); sf('@P55-0.3', 'swoosh_2', -11, 0.5);
bt('@P55:four', 'zoom-on-number', 'c55a.value', { fill: 0.38, maxH: 420, sy: 480 }); sf('@P55:four', 'money_counter_2', -11, 1.3); bt('@P55:$3', 'zoom-on-number', 'c55b.value', { fill: 0.46, maxH: 400, sy: 500, pose: 'shock' }); sf('@P55:$3', 'money_counter_1', -11, 1.5); sf('@P55:billion+0.2', 'cash_register_1', -9, 0.9); sk('@P55:billion+0.2', 12);
bt('@P55:business', 'graphic-hero', ['c55a', 'c55b'], { fill: 0.86, sy: 490, pose: 'chin' });
// P56 some money went into his own pro race car team
el('car56', 'car', R4(8) - 160, 40, '@P56-0.3', { w: 760, plate: 'GENERIC', color: '#2F5DA8' }, { out: '@P57-0.2' });
el('tm56', 'stamp', R4(8) + 560, -230, '@P56:race-0.1', { text: 'HIS OWN RACING TEAM', tone: 'bad', size: 70 }, { rot: -0.05, out: '@P57-0.2' });
con('u56', 'tuc', R4(8) - 760, 300, '@P56:money-0.1', { w: 240, variant: 'pip', label: 'HIS TEAM', flash: false, arrow: { at: '@P56:race', to: [300, -100] } }, { out: '@P57-0.2' });
bt('@P56', 'graphic-hero', 'car56', { move: 'whip', fill: 0.48, maxH: 560, sy: 500, pose: 'point' }); sf('@P56-0.3', 'swoosh_2', -11, 0.5);
bt('@P56:race', 'graphic-hero', ['car56', 'tm56', 'u56'], { fill: 0.84, sy: 500, pose: 'shock' }); sf('@P56:race', 'rubber_stamp_2', -5, 0.5); sk('@P56:race', 10);
// P57 claimed tribes owned it, because states can't sue tribes; prosecutors: a sham
el('tr57', 'card', R4(9) - 440, 40, '@P57-0.2', { w: 600, h: 440, fill: 'navy', lines: [{ t: '“TRIBES OWN IT”', size: 64, tone: 'gold', at: '@P57+0.3' }, { t: 'BECAUSE STATES', size: 38, tone: 'paper', at: '@P57:because' }, { t: 'CAN\'T SUE TRIBES', size: 52, tone: 'paper', at: '@P57:sue' }] }, { out: '@P58-0.2' });
el('sh57', 'stamp', R4(9) + 420, 40, '@P57:sham-0.1', { text: 'A SHAM', tone: 'bad', size: 190 }, { rot: -0.07, out: '@P58-0.2' });
el('pr57', 'text', R4(9) + 420, 300, '@P57:prosecutors-0.1', { lines: [[['PROSECUTORS CALLED IT', 'paper']]], size: 44 }, { out: '@P58-0.2' });
bt('@P57', 'graphic-hero', 'tr57', { move: 'whip', fill: 0.34, maxH: 620, sy: 500, pose: 'point' }); sf('@P57-0.3', 'swoosh_2', -11, 0.5);
bt('@P57:tribes', 'zoom-on-number', 'tr57', { fill: 0.34, maxH: 620, sy: 500 }); sf('@P57:tribes', 'pop_2', -8, 0.4); sf('@P57:sue', 'paper_slam_2', -10, 0.5);
bt('@P57:sham', 'graphic-hero', ['tr57', 'sh57', 'pr57'], { fill: 0.86, sy: 480, pose: 'shock' }); sf('@P57:sham', 'rubber_stamp_2', -4, 0.5); sk('@P57:sham', 12);
// P58 verdict: 14 counts, 200 months (16+ years)
con('u58', 'tuc', R4(10) - 520, 40, '@P58-0.3', { w: 420, variant: 'card', bars: '@P58:200', stamps: [{ text: 'GUILTY · ALL 14', at: '@P58:jury', tone: 'bad', size: 52, rot: -0.1, y: 60 }], push: { at: '@P58', to: 1.2, dur: 4 }, flash: false }, { out: '@P59-0.2' });
el('y58', 'counter', R4(10) + 220, -130, '@P58:sentenced-0.2', { label: 'SENTENCED TO', sub: 'MONTHS IN PRISON', to: 200, at: '@P58:200', dur: 1.1, tone: 'bad', size: 170, w: 940 }, { out: '@P59-0.2' });
el('x58', 'text', R4(10) + 220, 210, '@P58:more-0.1', { lines: [[['MORE THAN ', 'paper'], ['16 YEARS', 'bad']]], size: 90 }, { out: '@P59-0.2' });
bt('@P58', 'graphic-hero', ['u58', 'y58'], { move: 'whip', fill: 0.78, sy: 490, pose: 'point' }); sf('@P58-0.3', 'swoosh_2', -11, 0.5); sf('@P58:jury', 'gavel_1', -5, 0.8); sk('@P58:jury', 12);
bt('@P58:200', 'zoom-on-number', 'y58.value', { fill: 0.44, maxH: 420, sy: 480, pose: 'shock' }); sf('@P58:200-0.1', 'cell_door_1', -7, 1.2); bt('@P58:more', 'graphic-hero', ['u58', 'y58', 'x58'], { fill: 0.84, sy: 500, pose: 'chin' });
// P59 SEND micro-moment: plane
el('plane', 'plane', 1690, 930, '@P59:send-0.05', { dx: 190, dy: -330 }, { layer: 'screen', out: '@P59:send+1.5' });
sf('@P59:send-0.05', 'swoosh_2', -9, 1.0);
el('sd59', 'stamp', R4(11), 40, '@P59-0.3', { text: 'SEND THIS CHAPTER', tone: 'accent', size: 96 }, { rot: -0.03, out: '@P60-0.2' });
bt('@P59', 'graphic-hero', 'sd59', { move: 'whip', fill: 0.7, maxH: 500, sx: 860, sy: 480, st: 'corner', pose: 'you' }); po('@P59:send', 'you'); sf('@P59-0.3', 'swoosh_2', -11, 0.5);
bt('@P59:someone', 'zoom-on-number', 'sd59', { fill: 0.74, maxH: 300, sx: 860, sy: 440, st: 'corner', pose: 'point' });
