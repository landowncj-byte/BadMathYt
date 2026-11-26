// ---------------- CH2 · THE PRINCE WHO ORDERED PORK (P21-P33) — royal teal room, Gignac ----------------
const R2 = k => K(RM[2], k);
el('ch2', 'headline', R2(0) - 360, 40, '@P21-0.3', { kicker: 'CHAPTER TWO', lines: ['THE PRINCE WHO', [['ORDERED ', 'paper'], ['PORK', 'accent']]], size: 118, underAt: 1.0 }, { out: '@P22-0.2' });
con('g1', 'gig', R2(0) + 640, 50, '@P21-0.2', { w: 440, variant: 'card', file: true, caseNo: 'CASE Nº 2', crownAt: '@P21:prince', push: { at: '@P21', to: 1.12, dur: 4 } }, { out: '@P22-0.2' });
bt('@P21', 'graphic-hero', ['ch2', 'g1'], { move: 'whip', dur0: 0.7, fill: 0.82, sy: 480, pose: 'shrug', arc: 0.2 }); sf('@P21-0.6', 'tape_stop_1', -8, 1.0); sf('@P21-0.1', 'cinematic_hit_1', -9, 1.5); sf('@P21+0.9', 'camera_flash_1', -9, 0.6); sk('@P21+0.7', 8);
bt('@P21:prince', 'zoom-on-number', 'g1', { fill: 0.3, maxH: 760, sy: 520, pose: 'point' });
// P22 Miami: he calls himself a prince — the pitch quote
el('dc22', 'datecard', R2(1) - 300, -330, '@P22-0.2', { big: 'MIAMI', small: 'FLORIDA' }, { out: '@P23-0.2' });
con('g2', 'gig', R2(1) - 200, 40, '@P22-0.3', { w: 900, variant: 'side', quote: ['“PRINCE KHALID', 'BIN AL-SAUD”'], quoteSub: 'SAUDI ROYAL FAMILY · HIS CLAIM', quoteSize: 62, quoteAt: '@P22:calls', noquote: true, aspect: 0.62, pw: 400, crownAt: '@P22:calls' }, { out: '@P23-0.2' });
bt('@P22', 'graphic-hero', ['g2', 'dc22'], { move: 'whip', fill: 0.56, maxH: 860, sy: 500, pose: 'point' }); sf('@P22-0.3', 'swoosh_2', -11, 0.5); sf('@P22-0.1', 'typewriter_2', -11, 1.6);
bt('@P22:royal', 'zoom-on-number', 'g2', { fill: 0.62, maxH: 640, sy: 500, pose: 'shrug' });
// P23 Fisher Island, a sign on the door that says Sultan
el('sky23', 'icon', R2(2) - 480, -90, '@P23-0.3', { kind: 'building', s: 300, col: 'paper' }, { out: '@P24-0.2' });
el('fi23', 'text', R2(2) - 480, 190, '@P23:fisher-0.2', { lines: [[['FISHER ISLAND', 'paper']], [['ONE OF THE RICHEST ZIP CODES', 'gold', 34]]], size: 64 }, { out: '@P24-0.2' });
el('door23', 'card', R2(2) + 520, 40, '@P23:sign-0.2', { w: 560, h: 420, fill: 'navy', lines: [{ t: 'SULTAN', size: 150, tone: 'gold', at: '@P23:sultan' }, { t: 'SIGN ON HIS DOOR', size: 32, font: 'mono', tone: 'paper', at: '@P23:sultan' }] }, { out: '@P24-0.2' });
bt('@P23', 'graphic-hero', ['sky23', 'fi23'], { move: 'whip', fill: 0.5, sy: 480, pose: 'point' }); sf('@P23-0.3', 'swoosh_2', -11, 0.5);
bt('@P23:sign', 'graphic-hero', 'door23', { fill: 0.36, maxH: 600, sy: 500, pose: 'point' }); sf('@P23:sign-0.2', 'paper_slam_2', -10, 0.5); bt('@P23:sultan', 'zoom-on-number', 'door23', { fill: 0.42, maxH: 560, sy: 500, pose: 'shock' }); sf('@P23:sultan', 'pop_2', -8, 0.4);
// P24 Ferrari with diplomatic plates; bodyguards flash badges
el('car24', 'car', R2(3) - 420, 40, '@P24-0.3', { w: 720, plate: 'DIPLOMAT 1', fakeAt: '@P27:plates' }, { out: '@P25-0.2' });
el('bd24', 'tile', R2(3) + 330, 0, '@P24:badges-0.2', { icon: 'badge', caption: 'DSS BADGE', w: 290, h: 330, iconS: 150, tilt: 0.03 }, { out: '@P25-0.2' });
el('bd24b', 'tile', R2(3) + 650, 40, '@P24:badges', { icon: 'badge', caption: 'DSS BADGE', w: 290, h: 330, iconS: 150, tilt: -0.04 }, { out: '@P25-0.2' });
con('g24', 'gig', R2(3) + 120, 380, '@P24:drives', { w: 230, variant: 'pip', label: 'HIS RIDE', flash: false }, { out: '@P25-0.2' });
bt('@P24', 'graphic-hero', 'car24', { move: 'whip', fill: 0.44, maxH: 520, sy: 500, pose: 'point' }); sf('@P24-0.3', 'swoosh_2', -11, 0.5); bt('@P24:license', 'zoom-on-number', 'car24.plate', { fill: 0.13, maxH: 360, sy: 520 }); sf('@P24:license', 'pop_2', -8, 0.3);
bt('@P24:badges', 'graphic-hero', ['car24', 'bd24', 'bd24b'], { fill: 0.86, sy: 500, pose: 'point' }); sf('@P24:badges', 'camera_flash_1', -10, 0.6);
// P25 he tells investors he can bring in hundreds of millions
el('v25', 'victim', R2(4) - 600, 40, '@P25-0.3', { kind: 'investor', label: 'THE INVESTORS', sub: 'GET IN FIRST', w: 380, h: 480, reactAt: '@P25:first' }, { out: '@P26-0.2' });
el('q25', 'text', R2(4) + 260, -150, '@P25:hundreds-0.4', { lines: [[['“HUNDREDS OF MILLIONS”', 'gold']], [['IF YOU GET IN FIRST', 'paper', 54]]], size: 78 }, { out: '@P26-0.2' });
con('g25', 'gig', R2(4) + 260, 230, '@P25:he-0.1', { w: 260, variant: 'pip', label: 'THE PITCH', flash: false, arrow: { at: '@P25:hundreds', to: [0, -180] } }, { out: '@P26-0.2' });
bt('@P25', 'graphic-hero', ['v25', 'q25'], { move: 'whip', fill: 0.7, sy: 500, pose: 'point' }); sf('@P25-0.3', 'swoosh_2', -11, 0.5);
bt('@P25:hundreds', 'zoom-on-number', 'q25', { fill: 0.44, maxH: 420, sy: 400, pose: 'point' }); sf('@P25:hundreds', 'pop_2', -8, 0.4); bt('@P25:first', 'graphic-hero', ['v25', 'q25', 'g25'], { fill: 0.82, sy: 500, pose: 'shock' });
// P26 investors handed over $8M+
el('cs26', 'cashStack', R2(5) - 480, 120, '@P26-0.3', { count: 60, at: '@P26:handed', per: 0.04, each: 135000, prefix: '$', label: 'HANDED OVER', w: 520 }, { out: '@P27-0.2' });
el('c26', 'counter', R2(5) + 340, 20, '@P26-0.2', { label: 'INVESTORS HANDED HIM', sub: 'MORE THAN', to: 8000000, prefix: '$', at: '@P26:$8', dur: 1.2, tone: 'bad', size: 170, w: 1000 }, { out: '@P27-0.2' });
bt('@P26', 'graphic-hero', ['cs26', 'c26'], { move: 'whip', fill: 0.8, sy: 500, pose: 'point' }); sf('@P26-0.3', 'swoosh_2', -11, 0.5);
bt('@P26:$8', 'zoom-on-number', 'c26.value', { fill: 0.5, sy: 500, pose: 'shock' }); sf('@P26:$8', 'cash_register_1', -9, 0.9); sf('@P26:$8', 'money_counter_2', -11, 1.3); sk('@P26:$8+1.0', 10);
// P27 reveal: plates fake, badges fake, the prince is Anthony Gignac from Michigan
con('g27', 'gig', R2(6) - 360, 40, '@P27-0.3', { w: 440, variant: 'card', crownOff: '@P27:plates', stamps: [{ text: 'NOT A PRINCE', at: '@P27:man', tone: 'bad', size: 54, rot: -0.1, y: 60 }], ring: '@P27:man', flash: false, push: { at: '@P27', to: 1.2, dur: 4 } }, { out: '@P28-0.2' });
el('t27a', 'tile', R2(6) + 380, -120, '@P27:plates-0.1', { icon: 'plate', caption: 'PLATES', w: 280, h: 310, iconS: 150, stamp: 'FAKE', stampAt: '@P27:plates', tone: 'bad', tilt: -0.03 }, { out: '@P28-0.2' });
el('t27b', 'tile', R2(6) + 700, -120, '@P27:badges-0.1', { icon: 'badge', caption: 'BADGES', w: 280, h: 310, iconS: 150, stamp: 'FAKE', stampAt: '@P27:badges', tone: 'bad', tilt: 0.03 }, { out: '@P28-0.2' });
el('mi27', 'text', R2(6) + 540, 250, '@P27:michigan-0.1', { lines: [[['GREW UP IN ', 'paper'], ['MICHIGAN', 'bad']]], size: 62 }, { out: '@P28-0.2' });
bt('@P27', 'graphic-hero', ['g27', 't27a'], { move: 'whip', fill: 0.78, sy: 490, pose: 'point' }); sf('@P27-0.3', 'swoosh_2', -11, 0.5);
bt('@P27:plates', 'zoom-on-number', 't27a', { fill: 0.22, maxH: 520, sy: 500, pose: 'shock' }); sf('@P27:plates', 'rubber_stamp_2', -5, 0.5); sk('@P27:plates', 10); bt('@P27:badges', 'zoom-on-number', 't27b', { fill: 0.22, maxH: 520, sy: 500 }); sf('@P27:badges', 'rubber_stamp_2', -5, 0.5);
bt('@P27:man', 'graphic-hero', ['g27', 't27b', 'mi27'], { fill: 0.8, sy: 500, pose: 'point' }); sf('@P27:man', 'camera_flash_1', -9, 0.6); sf('@P27:man+0.2', 'heartbeat_1', -10, 2);
bt('@P27:michigan', 'zoom-on-number', 'mi27', { fill: 0.4, maxH: 300, sy: 460 });
// P28 nobody checked the plates
el('mg28', 'icon', R2(7) - 320, 40, '@P28-0.3', { kind: 'magnifier', s: 360, col: 'paper' }, { out: '@P29-0.2' });
el('n28', 'stamp', R2(7) + 380, 40, '@P28:checked-0.3', { text: 'NOBODY CHECKED', tone: 'bad', size: 110 }, { rot: -0.05, out: '@P29-0.2' });
el('pl28', 'tile', R2(7) + 380, 300, '@P28:plates-0.1', { icon: 'plate', caption: 'THE PLATES', w: 240, h: 260, iconS: 120 }, { out: '@P29-0.2' });
bt('@P28', 'graphic-hero', ['mg28', 'n28'], { move: 'whip', fill: 0.66, sy: 490, pose: 'chin' }); sf('@P28-0.3', 'swoosh_2', -11, 0.5); bt('@P28:checked', 'zoom-on-number', 'n28', { fill: 0.5, maxH: 420, sy: 460, pose: 'shock' }); sf('@P28:checked', 'rubber_stamp_2', -5, 0.5); sk('@P28:checked', 10);
// P29 dinner: a devout Saudi royal would not eat pork; the partner watched him eat pork
el('v29', 'victim', R2(8) - 560, 100, '@P29-0.3', { kind: 'diner', label: 'THE PARTNER', sub: 'WATCHED THE DINNER', w: 380, h: 480, reactAt: '@P29:pork#2' }, { out: '@P30-0.2' });
el('ck29', 'text', R2(8) + 120, -90, '@P29:dinner-0.1', { lines: [[['A DEVOUT SAUDI ROYAL', 'paper']], [['WOULD NOT EAT ', 'paper'], ['PORK', 'bad']]], size: 70 }, { out: '@P30-0.2' });
con('g29', 'gig', R2(8) + 340, 260, '@P29:watched-0.1', { w: 290, variant: 'pip', label: 'ATE PORK', flash: false, xmark: '@P29:pork#2' }, { out: '@P30-0.2' });
bt('@P29', 'graphic-hero', 'v29', { move: 'whip', fill: 0.26, maxH: 740, sy: 500, pose: 'point' }); sf('@P29-0.3', 'swoosh_2', -11, 0.5); bt('@P29:dinner', 'graphic-hero', ['v29', 'ck29'], { fill: 0.78, sy: 490, pose: 'point' });
bt('@P29:pork', 'zoom-on-number', 'ck29', { fill: 0.5, maxH: 360, sy: 360 }); sf('@P29:pork', 'pop_2', -8, 0.4); bt('@P29:watched', 'graphic-hero', ['v29', 'ck29', 'g29'], { fill: 0.8, sy: 500, pose: 'shock' }); sf('@P29:pork#2', 'wrong_buzzer_2', -10, 0.6); sk('@P29:pork#2', 10);
// P30 his security team dug in; the story fell apart
el('id30a', 'tile', R2(9) - 330, 20, '@P30:team-0.2', { icon: 'badge', caption: 'SECURITY TEAM', w: 300, h: 340, iconS: 150 }, { out: '@P31-0.2' });
el('mg30', 'icon', R2(9) + 70, 20, '@P30:digging-0.2', { kind: 'magnifier', s: 330, col: 'paper' }, { out: '@P31-0.2' });
el('fa30', 'stamp', R2(9) + 520, 20, '@P30:apart-0.1', { text: 'FELL APART', tone: 'bad', size: 96 }, { rot: -0.06, out: '@P31-0.2' });
bt('@P30', 'graphic-hero', ['id30a', 'mg30'], { move: 'whip', fill: 0.6, sy: 490, pose: 'point' }); sf('@P30-0.3', 'swoosh_2', -11, 0.5); bt('@P30:apart', 'graphic-hero', ['mg30', 'fa30'], { fill: 0.62, sy: 490, pose: 'shock' }); sf('@P30:apart-0.1', 'rubber_stamp_2', -5, 0.5); sk('@P30:apart', 10);
// P31 arrested or convicted eleven times since 1988, same prince act
el('c31', 'counter', R2(10) - 300, -60, '@P31-0.2', { label: 'SINCE 1988', sub: 'ARRESTED OR CONVICTED', to: 11, suffix: ' TIMES', at: '@P31:11', dur: 0.9, tone: 'bad', size: 190, w: 980 }, { out: '@P32-0.2' });
for (let i = 0; i < 6; i++) con('m31' + i, 'gig', R2(10) - 800 + i * 235, 330, `@P31:11+${(i * 0.12).toFixed(2)}`, { w: 200, variant: 'pip', label: i === 5 ? 'SAME ACT' : '', flash: false, mono: true, credit: '' }, { out: '@P32-0.2' });
bt('@P31', 'graphic-hero', ['c31', 'm310'], { move: 'whip', fill: 0.74, sy: 490, pose: 'point' }); sf('@P31-0.3', 'swoosh_2', -11, 0.5);
bt('@P31:11', 'zoom-on-number', 'c31.value', { fill: 0.42, maxH: 440, sy: 460, pose: 'shock' }); sf('@P31:11', 'pop_2', -8, 0.4); for (let i = 0; i < 6; i++) sf(`@P31:11+${(i * 0.12).toFixed(2)}`, 'camera_flash_1', -14, 0.3);
bt('@P31:same', 'graphic-hero', ['c31', 'm310', 'm315'], { fill: 0.84, sy: 500, pose: 'point' });
// P32 verdict
con('g32', 'gig', R2(11) - 520, 40, '@P32-0.3', { w: 420, variant: 'card', bars: '@P32:18', stamps: [{ text: 'SENTENCED 2019', at: '@P32:2019', tone: 'bad', size: 52, rot: -0.1, y: 60 }], push: { at: '@P32', to: 1.2, dur: 4 }, flash: false }, { out: '@P33-0.2' });
el('y32', 'counter', R2(11) + 220, 0, '@P32:sentenced-0.2', { label: 'FEDERAL PRISON', sub: 'MORE THAN', to: 18, suffix: ' YEARS', at: '@P32:18', dur: 0.9, tone: 'bad', size: 170, w: 940 }, { out: '@P33-0.2' });
bt('@P32', 'graphic-hero', ['g32', 'y32'], { move: 'whip', fill: 0.78, sy: 490, pose: 'point' }); sf('@P32-0.3', 'swoosh_2', -11, 0.5); sf('@P32:2019', 'gavel_1', -5, 0.8); sk('@P32:2019', 12);
bt('@P32:18', 'zoom-on-number', 'y32.value', { fill: 0.44, maxH: 420, sy: 480, pose: 'shock' }); sf('@P32:18-0.1', 'cell_door_1', -7, 1.2);
bt('@P32:prison', 'graphic-hero', ['g32', 'y32'], { fill: 0.8, sy: 500, pose: 'chin' });
// P33 LIKE micro-moment
el('heart', 'heart', 1620, 760, '@P33:hit-0.15', { s: 64 }, { layer: 'screen', out: '@P33:hit+1.5' });
sf('@P33:hit-0.1', 'pop_2', -8, 0.3); sf('@P33:hit+0.35', 'ding_2', -11, 0.7);
el('lk33', 'stamp', R2(12), 40, '@P33-0.3', { text: 'TRUE STORIES · REAL NUMBERS', tone: 'good', size: 96 }, { rot: -0.03, out: '@P34-0.2' });
bt('@P33', 'graphic-hero', 'lk33', { move: 'whip', fill: 0.7, maxH: 500, sx: 860, sy: 480, st: 'corner', pose: 'you' }); po('@P33:hit', 'you'); sf('@P33-0.3', 'swoosh_2', -11, 0.5);
bt('@P33:true', 'zoom-on-number', 'lk33', { fill: 0.72, maxH: 300, sx: 860, sy: 440, st: 'corner', pose: 'point' });
