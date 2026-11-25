// ---------------- ROOM 2 · MORE OIL THAN AMERICA (P21-P33): case-file stage, oil gold / water blue ----------------
const R2 = k => K(X2, k);
el('ch2', 'headline', R2(0), 40, '@P21-0.3', { kicker: 'CHAPTER TWO', lines: ['MORE OIL', [['THAN ', 'paper'], ['AMERICA', 'gold']]], size: 170, under: 'gold', underAt: 0.9 });
bt('@P21', 'graphic-hero', 'ch2', { move: 'whip', dur0: 0.7, fill: 0.62, sy: 470, pose: 'shrug', arc: 0.2 }); sf('@P21-0.6', 'tape_stop_1', -8, 1.0); sf('@P21-0.1', 'cinematic_hit_2', -8, 1.5); sf('@P21+0.9', 'paper_slam_2', -10, 0.5); sk('@P21+0.7', 8);
// S1: Bayonne tank farm + Tino De Angelis
el('h22', 'text', R2(1) + 350, -330, '@P22', { lines: [[['NEW JERSEY · ', 'paper'], ['EARLY 1960s', 'accent']]], size: 72 }, { out: '@P23-0.2' });
el('tanks22', 'tanks', R2(1) + 350, 120, '@P22+0.3', { n: 5, at: '@P22+0.3', pin: 'BAYONNE, N.J.', pinAt: '@P22:bayonne-0.3', w: 1500, h: 560 }, { out: '@P23-0.2' });
el('sil22', 'silh', R2(1) - 850, 60, '@P22:tino-0.4', { name: 'TINO DE ANGELIS', role: 'ALLIED CRUDE', tone: 'navy' }, { rot: -0.03, out: '@P23-0.2' });
bt('@P22', 'graphic-hero', ['h22', 'tanks22'], { move: 'whip', fill: 0.56, sx: 960, sy: 500, pose: 'point' }); sf('@P22+0.3', 'thud_1', -11, 0.5);
bt('@P22:tino', 'side-by-side', 'sil22', { fill: 0.32, maxH: 660, sy: 540, st: 'corner', pose: 'point', sx: 880 }); sf('@P22:tino-0.35', 'camera_flash_1', -9, 0.6); bt('@P22:allied', 'zoom-on-number', 'sil22.name', { fill: 0.3, maxH: 300, sy: 520 });
bt('@P22:out', 'graphic-hero', ['h22', 'tanks22'], { fill: 0.56, sx: 960, sy: 500, pose: 'idle' }); bt('@P22:bayonne', 'zoom-on-number', 'tanks22.pin', { fill: 0.32, maxH: 380, sy: 500 }); sf('@P22:bayonne-0.3', 'pop_2', -8, 0.3);
// S2: tank -> inspector -> receipt -> bank -> $
el('h23', 'text', R2(2), -330, '@P23:simple-0.2', { lines: [[['A SIMPLE KIND OF ', 'paper'], ['LOAN', 'accent']]], size: 76 }, { out: '@P23:tank-0.15' });
el('flow', 'flow', R2(2), 60, '@P23-0.2', { items: [{ id: 'tank', label: 'TANK', icon: 'tank', at: '@P23:tank-0.1' }, { id: 'insp', label: 'WAREHOUSE CO.', size: 24, icon: 'magnifier', at: '@P23:warehouse' }, { id: 'rec', label: 'RECEIPT', icon: 'doc', at: '@P23:receipt-0.1' }, { id: 'bank', label: 'BANK', icon: 'building', at: '@P23:banks' }, { id: 'cash', label: 'MONEY', icon: 'dollar', tone: 'good', at: '@P23:money' }] }, { out: '@P24-0.2' });
bt('@P23', 'graphic-hero', ['h23', 'flow'], { move: 'whip', fill: 0.9, sy: 480, pose: 'point' }); bt('@P23:tank-0.25', 'graphic-hero', 'flow', { fill: 0.9, sy: 470, pose: 'point', dur: 0.5 });
bt('@P23:tank', 'zoom-on-number', 'flow.tank', { fill: 0.22, maxH: 420, sy: 480 }); bt('@P23:warehouse', 'zoom-on-number', 'flow.insp', { fill: 0.22, maxH: 420, sy: 480 }); bt('@P23:receipt', 'zoom-on-number', 'flow.rec', { fill: 0.22, maxH: 420, sy: 480 });
bt('@P23:banks', 'graphic-hero', ['flow.bank', 'flow.cash'], { fill: 0.5, sy: 480, pose: 'point' }); bt('@P23:against', 'pull-back', 'flow', { fill: 0.9, sy: 470 });
for (const w of ['tank', 'warehouse', 'receipt', 'banks']) sf(`@P23:${w}${w === 'warehouse' || w === 'banks' ? '' : '-0.1'}`, 'pop_2', -8, 0.3); sf('@P23:money', 'cash_register_1', -9, 0.9); sf('@P23:money-0.05', 'coin_single_2', -10, 0.5);
// S3: the warehouse receipt, American Express
el('wr', 'doc', R2(3), 30, '@P24-0.3', { title: 'WAREHOUSE RECEIPT', sub: 'ALLIED CRUDE · VEGETABLE OIL', w: 800, h: 700, skeleton: 3, lines: [{ id: 'amex', t: 'A UNIT OF AMERICAN EXPRESS', at: '@P24:unit', mark: 'accent', tone: 'navy' }] }, { out: '@P25-0.2' });
el('cert', 'stamp', R2(3) + 220, 200, '@P24:vouched-0.1', { text: 'CERTIFIED', tone: 'good', size: 120 }, { rot: -0.12, out: '@P25-0.2' });
bt('@P24', 'graphic-hero', 'wr', { move: 'whip', fill: 0.42, maxH: 720, sy: 480, pose: 'point' }); sf('@P24-0.2', 'paper_slam_2', -10, 0.5);
bt('@P24:unit', 'zoom-on-number', 'wr.amex', { fill: 0.46, maxH: 300, sy: 480 }); sf('@P24:unit', 'typewriter_2', -12, 1.0);
bt('@P24:vouched', 'graphic-hero', 'wr', { fill: 0.42, maxH: 620, sy: 570, pose: 'idle', st: 'peek' }); sf('@P24:vouched-0.1', 'rubber_stamp_2', -4, 0.5); sk('@P24:vouched', 10);
bt('@P24:banks', 'presenter-front', 'wr', { fill: 0.42, pose: 'talk', keep: ['cert'] }); sf('@P24:paid', 'cash_register_1', -9, 0.9);
// S4: receipt oil
el('rs', 'receiptstack', R2(4), 40, '@P25-0.3', { at: '@P25:more-0.1', per: 0.2, count: 12, labelAt: '@P25:receipt' }, { out: '@P26-0.2' });
bt('@P25', 'graphic-hero', 'rs', { move: 'whip', fill: 0.78, sy: 500, pose: 'point' }); bt('@P25:more', 'zoom-on-number', 'rs.stack', { fill: 0.5, maxH: 560, sy: 480 }); bt('@P25:not', 'side-by-side', 'rs.tank', { fill: 0.3, maxH: 640, sy: 500, st: 'corner' });
bt('@P25:receipt', 'zoom-on-number', 'rs.stack', { fill: 0.55, maxH: 600, sy: 500, pose: 'shock' }); sf('@P25:more-0.1', 'keyboard_typing_1', -12, 2.0); sf('@P25:receipt', 'rubber_stamp_2', -6, 0.5);
// S5: X-ray of the tank: hidden compartment, water under oil, dipstick
el('tc', 'tankcut', R2(5), 40, '@P26-0.3', { oilAt: '@P26-0.1', tubeAt: '@P26:compartments', stickAt: '@P26:saw', waterAt: '@P26:water-0.2', stick2At: '@P26:signed-0.4' }, { out: '@P27-0.2' });
el('oilok', 'stamp', R2(5) + 520, 120, '@P26:signed', { text: 'OIL ✓'.replace(' ✓', ''), tone: 'good', size: 90 }, { rot: 0.08, out: '@P27-0.2' });
bt('@P26', 'graphic-hero', 'tc', { move: 'whip', fill: 0.4, maxH: 760, sy: 490, pose: 'point' }); sf('@P26-0.2', 'local:pipes', -16, 3, 0);
bt('@P26:hidden', 'zoom-on-number', 'tc.tube', { fill: 0.2, maxH: 560, sy: 500 }); sf('@P26:compartments', 'pop_2', -8, 0.3); sf('@P26:compartments+0.2', 'click_1', -10, 0.3);
bt('@P26:inspectors', 'graphic-hero', 'tc', { fill: 0.4, maxH: 760, sy: 490, pose: 'point' }); bt('@P26:hatch', 'zoom-on-number', 'tc.hatch', { fill: 0.3, maxH: 360, sy: 400 }); sf('@P26:saw', 'swoosh_1', -13, 0.8);
bt('@P26:others', 'graphic-hero', 'tc', { fill: 0.4, maxH: 760, sy: 490, pose: 'chin' }); bt('@P26:water', 'zoom-on-number', 'tc.water', { fill: 0.34, maxH: 460, sy: 560, pose: 'shock' }); sf('@P26:water-0.2', 'local:pipes', -9, 2.0); sf('@P26:water', 'deep_boom_2', -6, 0.4); sk('@P26:water', 10);
bt('@P26:floats', 'graphic-hero', 'tc', { fill: 0.4, maxH: 760, sy: 490, pose: 'point' }); bt('@P26:looked', 'zoom-on-number', 'tc.oil', { fill: 0.36, maxH: 300, sy: 420 }); bt('@P26:signed', 'graphic-hero', ['tc', 'oilok'], { fill: 0.5, sy: 480, pose: 'shrug' }); sf('@P26:signed', 'rubber_stamp_2', -5, 0.5); sf('@P26:saw#2', 'swoosh_1', -13, 0.8);
// S6: pipes: the same oil moves ahead of the inspector
el('pipes', 'pipes', R2(6), 40, '@P27-0.3', { at: '@P27+0.1', times: ['@P27+0.2', '@P27:pipes', '@P27:counted', '@P27:again#2'] }, { out: '@P28-0.2' });
bt('@P27', 'graphic-hero', 'pipes', { move: 'whip', fill: 0.88, sy: 500, pose: 'point' }); bt('@P27:pipes', 'zoom-on-number', 'pipes.row', { fill: 0.5, maxH: 520, sy: 520 });
bt('@P27:same', 'graphic-hero', 'pipes', { fill: 0.88, sy: 500 }); bt('@P27:counted', 'zoom-on-number', 'pipes.count', { fill: 0.5, maxH: 200, sy: 330, pose: 'shock' }); sf('@P27:pipes-0.1', 'local:pipes', -10, 2.5); sf('@P27:counted', 'pop_1', -8, 0.3); sf('@P27:again#2', 'pop_2', -7, 0.3); sf('@P27:again#2+0.05', 'deep_boom_2', -8, 0.4);
// S7: Allied claimed more than the entire US
el('y28', 'text', R2(7), -440, '@P28:by-0.2', { lines: [[['BY ', 'paper'], ['1963', 'accent']]], size: 110 }, { out: '@P29-0.2' });
el('tp', 'tankpair', R2(7), 90, '@P28-0.2', { at: '@P28+0.1', fillAt: '@P28:allied', overAt: '@P28:existed-0.15' }, { out: '@P29-0.2' });
bt('@P28', 'graphic-hero', ['y28', 'tp'], { move: 'whip', fill: 0.5, maxH: 760, sy: 480, pose: 'point' }); bt('@P28:allied', 'zoom-on-number', 'tp.b', { fill: 0.3, maxH: 700, sy: 480 }); sf('@P28:allied', 'local:pipes', -10, 2.0);
bt('@P28:existed', 'graphic-hero', 'tp', { fill: 0.62, maxH: 760, sy: 520, pose: 'shock' }); sf('@P28:existed-0.15', 'thud_2', -6, 0.6); sk('@P28:existed', 10);
bt('@P28:entire', 'zoom-on-number', 'tp.a', { fill: 0.3, maxH: 700, sy: 480, pose: 'shock' }); bt('@P28:states', 'pull-back', 'tp', { fill: 0.62, maxH: 760, sy: 520 });
// S8: 900,000 tons on paper vs 55,000 there
el('bars29', 'bars', R2(8), 60, '@P29-0.2', { h: 520, barW: 220, gap: 300, note: 'TONS OF OIL · TRUE SCALE', items: [{ id: 'paper', label: 'ON PAPER', sub: 'TONS', value: 900000, tone: 'bad', at: '@P29:900-0.3', size: 80 }, { id: 'real', label: 'ACTUALLY THERE', sub: 'TONS', value: 55000, tone: 'good', at: '@P29:55-0.2', size: 80 }] }, { out: '@P30-0.2' });
el('never', 'stamp', R2(8) + 800, -90, '@P29:over-0.1', { text: 'OVER 90% NEVER EXISTED', tone: 'bad', size: 70 }, { rot: 0.07, out: '@P30-0.2' });
bt('@P29', 'graphic-hero', 'bars29', { move: 'whip', fill: 0.36, maxH: 760, sy: 500, pose: 'point' }); bt('@P29:900', 'zoom-on-number', 'bars29.paper_top', { fill: 0.4, maxH: 400, sy: 400, pose: 'shock' }); sf('@P29:900-0.3', 'money_counter_1', -11, 1.2); sf('@P29:900+0.9', 'deep_boom_1', -6, 1.4); sk('@P29:900+0.8', 8);
bt('@P29:actually', 'graphic-hero', 'bars29', { fill: 0.36, maxH: 600, sy: 520, st: 'peek' }); bt('@P29:55', 'zoom-on-number', 'bars29.real_top', { fill: 0.34, maxH: 400, sy: 380 }); sf('@P29:55-0.2', 'pop_2', -8, 0.3); sf('@P29:55+0.5', 'ding_2', -9, 0.7);
bt('@P29:over', 'graphic-hero', ['bars29', 'never'], { fill: 0.7, maxH: 760, sx: 1000, sy: 500, pose: 'shock' }); sf('@P29:over-0.1', 'rubber_stamp_2', -4, 0.5); sk('@P29:over', 10);
// S9: futures chart crashes; margin call
el('fut', 'chart', R2(9), 60, '@P30-0.2', { title: 'OIL FUTURES · ILLUSTRATIVE', series: [{ kind: 'crash', seed: 11, crashAt: 0.72, n: 140, drift: 0.0065, vol: 0.04, tone: 'good', at: '@P30+0.3', dur: 4.7, lin: true, w: 9, fall: 0.05 }], crack: { at: '@P30:cracked+0.12', x: 0.74, y: 0.35 } }, { out: '@P31-0.2' });
el('margin', 'stamp', R2(9) + 330, 150, '@P30:margin-0.1', { text: 'MARGIN CALL', tone: 'bad', size: 130 }, { rot: -0.08, out: '@P31-0.2' });
el('lookin', 'icon', R2(9) + 1100, 80, '@P30:inside-0.3', { kind: 'tank', s: 300, col: 'paper' }, { out: '@P31-0.2' });
bt('@P30', 'graphic-hero', 'fut', { move: 'whip', fill: 0.62, maxH: 760, sy: 490, pose: 'point' }); sf('@P30+0.3', 'riser_1', -16, 3.4);
bt('@P30:cracked', 'zoom-on-number', 'fut', { fill: 0.7, maxH: 760, sy: 490, pose: 'shock', dur: 0.5 }); sf('@P30:cracked+0.1', 'glass_shatter_2', -6, 0.9); sf('@P30:cracked+0.15', 'sub_drop_1', -8, 1.0); sk('@P30:cracked+0.12', 16);
bt('@P30:november', 'pull-back', 'fut', { fill: 0.62, maxH: 760, sy: 490, pose: 'idle' }); bt('@P30:margin', 'graphic-hero', ['fut', 'margin'], { fill: 0.62, maxH: 760, sy: 490, pose: 'point' }); sf('@P30:margin-0.1', 'rubber_stamp_2', -4, 0.5);
bt('@P30:inside', 'side-by-side', ['margin', 'lookin'], { fill: 0.5, sx: 880, sy: 500, st: 'corner', pose: 'point' }); sf('@P30:inside-0.3', 'pop_2', -8, 0.3);
// S10: 51 lenders, $180M+
el('b51', 'banks', R2(10) - 560, 20, '@P31-0.2', { n: 51, cols: 11, s: 84, gap: 20, at: '@P31+0.1', mode: 'red', times: [...Array(51)].map((_, i) => `@P31:51+${(0.25 + i * 0.035).toFixed(3)}`) }, { out: '@P32-0.2' });
el('l180', 'counter', R2(10) + 1000, -20, '@P31:$180-0.3', { label: 'LOSSES · MORE THAN', to: 180000000, prefix: '$', at: '@P31:$180-0.15', dur: 1.0, tone: 'bad', size: 130, w: 800, underline: true }, { out: '@P32-0.2' });
el('amex', 'stamp', R2(10) + 1000, 300, '@P31:bankrupt-0.3', { text: 'AMEX WAREHOUSE UNIT: BANKRUPT', tone: 'bad', size: 50 }, { rot: 0.04, out: '@P32-0.2' });
el('wall', 'badge', R2(10) + 1000, 430, '@P31:brokerage-0.1', { text: 'A WALL STREET BROKERAGE · WENT UNDER', tone: 'bad', size: 30 }, { out: '@P32-0.2' });
bt('@P31', 'graphic-hero', 'b51', { move: 'whip', fill: 0.44, maxH: 700, sy: 480, pose: 'point' }); sf('@P31:51', 'pop_1', -9, 0.3);
bt('@P31:more', 'side-by-side', ['b51', 'l180'], { fill: 0.84, sx: 960, sy: 480, st: 'corner' }); bt('@P31:$180', 'zoom-on-number', 'l180.value', { fill: 0.36, maxH: 380, sy: 440, pose: 'shock' }); sf('@P31:$180-0.15', 'money_counter_1', -11, 1.0); sf('@P31:million+0.3', 'deep_boom_1', -5, 1.4); sk('@P31:million+0.3', 12);
bt('@P31:the', 'graphic-hero', ['l180', 'amex', 'wall'], { fill: 0.5, sx: 1400 - 440, sy: 560, pose: 'point' }); bt('@P31:bankrupt', 'zoom-on-number', 'amex', { fill: 0.44, maxH: 300, sy: 520 }); sf('@P31:bankrupt-0.3', 'rubber_stamp_2', -4, 0.5); sf('@P31:brokerage-0.1', 'pop_1', -8, 0.3);
// S11: 20 years, out in 7
el('jail', 'jail', R2(11), 40, '@P32-0.2', { dropAt: '@P32+0.1', plaqueAt: '@P32:sentenced-0.1', head: '', lines: [{ t: '20 YEARS', at: '@P32:20-0.1', strike: '@P32:he', tone: 'bad' }, { t: 'OUT IN 7 YEARS', at: '@P32:out-0.1', tone: 'good', size: 78 }] }, { out: '@P33-0.2' });
bt('@P32', 'graphic-hero', 'jail', { move: 'whip', fill: 0.4, maxH: 760, sy: 480, pose: 'point' }); sf('@P32+0.1', 'cell_door_1', -7, 1.6); sf('@P32+0.12', 'thud_1', -8, 0.6); sk('@P32+0.15', 10);
bt('@P32:20', 'zoom-on-number', 'jail.plaque', { fill: 0.34, maxH: 420, sy: 520, pose: 'shock' }); sf('@P32:20-0.1', 'paper_slam_2', -10, 0.5); sf('@P32:he', 'tape_stop_1', -12, 0.8); bt('@P32:out', 'zoom-on-number', 'jail.plaque', { fill: 0.34, maxH: 420, sy: 520, pose: 'shrug' }); sf('@P32:out-0.1', 'pop_2', -8, 0.3);
// S12: coupons x, oil x, a perfect record?
el('pn1', 'panel', R2(12) - 680, 60, '@P33-0.2', { title: 'COUPONS', icon: 'coupon', tone: 'bad', mark: 'x', markAt: '@P33:coupons+0.25', sub: 'NEEDED > EXISTED' });
el('pn2', 'panel', R2(12), 60, '@P33+0.9', { title: 'OIL', icon: 'tank', tone: 'accent', mark: 'x', markAt: '@P33:tanks+0.25', sub: 'NEEDED > EXISTED' });
el('pn3', 'panel', R2(12) + 680, 60, '@P33:rarer-0.4', { title: 'A PERFECT\nRECORD?', icon: 'chart', tone: 'good', mark: 'lock', markAt: '@P33:perfect', sub: 'STRAIGHT LINE', fill: 'navy', titleSize: 50 });
bt('@P33', 'graphic-hero', ['pn1', 'pn2'], { move: 'whip', fill: 0.62, sx: 760, sy: 490, pose: 'point' }); bt('@P33:coupons', 'zoom-on-number', 'pn1', { fill: 0.24, maxH: 640, sy: 500 }); sf('@P33:coupons+0.25', 'wrong_buzzer_1', -9, 0.6); bt('@P33:tanks', 'zoom-on-number', 'pn2', { fill: 0.24, maxH: 640, sy: 500 }); sf('@P33:tanks+0.25', 'wrong_buzzer_2', -9, 0.6);
bt('@P33:both', 'presenter-front', ['pn1', 'pn2'], { fill: 0.62, pose: 'talk', sx: 760 }); bt('@P33:something', 'graphic-hero', ['pn1', 'pn2'], { fill: 0.62, sx: 760, sy: 490, pose: 'shrug' }); sf('@P33:something', 'pop_1', -12, 0.3);
bt('@P33:rarer', 'graphic-hero', ['pn1', 'pn2', 'pn3'], { fill: 0.9, sy: 490, pose: 'chin', dur: 1.1 }); sf('@P33:rarer-0.4', 'pop_2', -8, 0.3);
bt('@P33:perfect', 'zoom-on-number', 'pn3', { fill: 0.26, maxH: 700, sy: 500, pose: 'shock' }); sf('@P33:perfect', 'click_1', -8, 0.3); sf('@P33:perfect+0.1', 'deep_boom_2', -7, 0.4); sk('@P33:perfect', 8);
