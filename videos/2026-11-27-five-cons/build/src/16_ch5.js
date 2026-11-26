// ---------------- CH5 · FOUR MILLION PEOPLE WHO NEVER EXISTED (P60-P70) — founder purple room, Javice (illustration) ----------------
const R5 = k => K(RM[5], k);
el('ch5', 'headline', R5(0) - 360, 40, '@P60-0.3', { kicker: 'CHAPTER FIVE', lines: ['4 MILLION PEOPLE', [['WHO NEVER ', 'paper'], ['EXISTED', 'bad']]], size: 112, underAt: 1.0 }, { out: '@P61-0.2' });
con('j1', 'jav', R5(0) + 640, 50, '@P60-0.2', { w: 440, variant: 'card', file: true, caseNo: 'CASE Nº 5', push: { at: '@P60', to: 1.12, dur: 4 } }, { out: '@P61-0.2' });
bt('@P60', 'graphic-hero', ['ch5', 'j1'], { move: 'whip', dur0: 0.7, fill: 0.82, sy: 480, pose: 'shrug', arc: 0.2 }); sf('@P60-0.6', 'tape_stop_1', -8, 1.0); sf('@P60-0.1', 'cinematic_hit_1', -9, 1.5); sf('@P60+0.9', 'camera_flash_1', -9, 0.6); sk('@P60+0.7', 8);
bt('@P60:million', 'zoom-on-number', 'j1', { fill: 0.3, maxH: 760, sy: 520, pose: 'point' });
// P61 the pitch: Frank, a website that helped students fill out the federal aid form
con('j2', 'jav', R5(1) - 640, 40, '@P61-0.3', { w: 440, variant: 'card', flash: false }, { out: '@P62-0.2' });
el('fr61', 'card', R5(1) + 300, 40, '@P61:website-0.2', { w: 820, h: 480, fill: 'navy', lines: [{ t: 'FRANK', size: 150, tone: 'gold', at: '@P61:website' }, { t: 'HELPS STUDENTS FILL OUT', size: 40, font: 'mono', tone: 'paper', at: '@P61:fill' }, { t: 'THE FEDERAL COLLEGE AID FORM', size: 40, font: 'mono', tone: 'paper', at: '@P61:federal' }] }, { out: '@P62-0.2' });
bt('@P61', 'graphic-hero', ['j2', 'fr61'], { move: 'whip', fill: 0.76, sy: 490, pose: 'point' }); sf('@P61-0.3', 'swoosh_2', -11, 0.5);
bt('@P61:website', 'zoom-on-number', 'fr61', { fill: 0.44, maxH: 560, sy: 500 }); sf('@P61:website', 'pop_2', -8, 0.4); sf('@P61:fill', 'typewriter_2', -11, 1.6);
// P62 by 2021 banks wanted to buy; she claimed 4.25M users
el('c62', 'counter', R5(2) + 200, -40, '@P62:users-0.3', { label: 'SHE TOLD THE BANKS', sub: 'FRANK HAD THIS MANY USERS', to: 4250000, at: '@P62:four', dur: 1.5, tone: 'good', size: 190, w: 1080 }, { out: '@P63-0.2' });
el('bk62', 'icon', R5(2) - 680, 20, '@P62-0.3', { kind: 'building', s: 330, col: 'paper' }, { out: '@P63-0.2' });
con('j62', 'jav', R5(2) - 680, 380, '@P62:she-0.1', { w: 230, variant: 'pip', label: 'HER CLAIM', flash: false }, { out: '@P63-0.2' });
bt('@P62', 'graphic-hero', ['bk62', 'c62'], { move: 'whip', fill: 0.8, sy: 490, pose: 'point' }); sf('@P62-0.3', 'swoosh_2', -11, 0.5);
bt('@P62:four', 'zoom-on-number', 'c62.value', { fill: 0.56, maxH: 460, sy: 480, pose: 'shock' }); sf('@P62:four', 'money_counter_2', -11, 1.5); sf('@P62:users', 'pop_2', -8, 0.4);
// P63 SEC: real number was fewer than 300,000 (true scale bars)
el('bar63', 'bars', R5(3), 0, '@P63-0.3', { items: [{ id: 'cl', label: 'SHE CLAIMED', value: 4250000, show: 4250000, tone: 'good', at: '@P63:sec' }, { id: 'rl', label: 'THE REAL NUMBER', sub: 'SEC SAYS', value: 300000, show: 300000, display: { prefix: '< ' }, tone: 'bad', at: '@P63:fewer' }], max: 4250000, h: 640, barW: 260, gap: 260, note: 'USERS · TRUE SCALE' }, { out: '@P64-0.2' });
el('x14', 'stamp', R5(3) + 640, -240, '@P63:300+0.4', { text: '14× TOO MANY', tone: 'bad', size: 74 }, { rot: -0.06, out: '@P64-0.2' });
bt('@P63', 'graphic-hero', 'bar63', { move: 'whip', fill: 0.5, maxH: 800, sy: 500, pose: 'point' }); sf('@P63-0.3', 'swoosh_2', -11, 0.5);
bt('@P63:fewer', 'zoom-on-number', 'bar63.rl_top', { fill: 0.34, maxH: 460, sy: 450, pose: 'shock' }); sf('@P63:fewer', 'money_counter_2', -11, 1.2); sk('@P63:fewer+0.8', 12); bt('@P63:300', 'graphic-hero', ['bar63', 'x14'], { fill: 0.7, sy: 500, pose: 'point' }); sf('@P63:300+0.4', 'rubber_stamp_2', -5, 0.5);
// P64 JPMorgan asked to see the customer list
el('bk64', 'icon', R5(4) - 560, 20, '@P64-0.3', { kind: 'building', s: 360, col: 'paper' }, { out: '@P65-0.2' });
el('bt64', 'badge', R5(4) - 560, 250, '@P64:morgan-0.1', { text: 'THE BANK', tone: 'navy', size: 52 }, { out: '@P65-0.2' });
el('dc64', 'doc', R5(4) + 380, 20, '@P64:customer-0.3', { w: 560, h: 620, title: 'CUSTOMER LIST', sub: 'SHOW US THE PEOPLE', skeleton: true, lines: [] }, { out: '@P65-0.2' });
bt('@P64', 'graphic-hero', ['bk64', 'bt64'], { move: 'whip', fill: 0.4, maxH: 640, sy: 490, pose: 'point' }); sf('@P64-0.3', 'swoosh_2', -11, 0.5);
bt('@P64:asked', 'graphic-hero', ['bk64', 'dc64'], { fill: 0.82, sy: 500, pose: 'point' }); sf('@P64:customer-0.3', 'paper_slam_2', -10, 0.5); bt('@P64:customer', 'zoom-on-number', 'dc64', { fill: 0.3, maxH: 640, sy: 500, pose: 'chin' });
// P65 you can't hand over four million people you don't have
el('nm65', 'text', R5(5) - 380, -200, '@P65-0.2', { lines: [[['4,000,000 PEOPLE', 'paper']], [['NEEDED', 'gold', 64]]], size: 96 }, { out: '@P66-0.2' });
el('dg65', 'dotgrid', R5(5) + 330, 40, '@P65:problem-0.3', { cols: 40, rows: 26, gap: 17, at: '@P65:problem', hiAt: 99999, per: 0.9 }, { out: '@P66-0.2' });
el('pb65', 'stamp', R5(5) - 380, 220, '@P65:problem', { text: 'THE PROBLEM', tone: 'bad', size: 104 }, { rot: -0.05, out: '@P66-0.2' });
bt('@P65', 'graphic-hero', ['nm65'], { move: 'whip', fill: 0.5, maxH: 520, sy: 480, pose: 'chin' }); sf('@P65-0.3', 'swoosh_2', -11, 0.5);
bt('@P65:problem', 'graphic-hero', ['nm65', 'dg65', 'pb65'], { fill: 0.9, sy: 500, pose: 'shock' }); sf('@P65:problem', 'rubber_stamp_2', -5, 0.5); sk('@P65:problem', 10); bt('@P65:can\'t', 'zoom-on-number', 'pb65', { fill: 0.4, maxH: 300, sy: 460, pose: 'point' });
// P66 she asked her own engineer to create fake data; he refused
el('en66', 'victim', R5(6) - 540, 40, '@P66-0.2', { kind: 'investor', label: 'HER ENGINEER', sub: 'SAID NO', suit: '#2F5DA8', w: 340, h: 440, tape: 'ENGINEER', reactAt: '@P66:refused' }, { out: '@P67-0.2' });
el('fk66', 'text', R5(6) + 340, -80, '@P66:fake-0.2', { lines: [[['“CREATE FAKE DATA”', 'bad']]], size: 76 }, { out: '@P67-0.2' });
el('rf66', 'stamp', R5(6) + 340, 160, '@P66:refused-0.1', { text: 'HE REFUSED', tone: 'good', size: 120 }, { rot: -0.05, out: '@P67-0.2' });
con('j66', 'jav', R5(6) + 1000, 400, '@P66:asked-0.1', { w: 230, variant: 'pip', label: 'THE ASK', flash: false }, { out: '@P67-0.2' });
bt('@P66', 'graphic-hero', ['en66'], { move: 'whip', fill: 0.26, maxH: 640, sy: 490, pose: 'point' }); sf('@P66-0.3', 'swoosh_2', -11, 0.5);
bt('@P66:fake', 'graphic-hero', ['en66', 'fk66'], { fill: 0.76, sy: 490, pose: 'point' }); sf('@P66:fake', 'typewriter_2', -11, 1.2);
bt('@P66:refused', 'zoom-on-number', 'rf66', { fill: 0.4, maxH: 360, sy: 480, pose: 'shock' }); sf('@P66:refused', 'rubber_stamp_2', -5, 0.5); sk('@P66:refused', 10);
// P67 professor generated 4M+ fake records for about $18,000
el('pf67', 'victim', R5(7) - 700, 100, '@P67-0.3', { kind: 'investor', label: 'DATA PROFESSOR', sub: 'GENERATES THE RECORDS', suit: '#5a2aa8', w: 380, h: 480, reactAt: '@P67:more' }, { out: '@P68-0.2' });
el('ml67', 'maillist', R5(7) + 60, 140, '@P67:generated-0.3', { w: 700, h: 640, at: '@P67:generated', per: 0.12, rows: 9, bounceAt: 99999, title: 'FAKE CUSTOMER RECORDS' }, { out: '@P68-0.2' });
el('c67', 'counter', R5(7) + 60, -330, '@P67:four-0.3', { label: 'FAKE RECORDS', sub: 'MORE THAN', to: 4000000, at: '@P67:four', dur: 1.3, tone: 'bad', size: 120, w: 760 }, { out: '@P68-0.2' });
el('ch67', 'counter', R5(7) + 900, 140, '@P67:cost-0.1', { label: 'IT COST ABOUT', to: 18000, prefix: '$', at: '@P67:$18', dur: 1.0, tone: 'bad', size: 110, w: 560 }, { out: '@P68-0.2' });
bt('@P67', 'graphic-hero', ['pf67', 'ml67'], { move: 'whip', fill: 0.62, sy: 490, pose: 'point' }); sf('@P67-0.3', 'swoosh_2', -11, 0.5); sf('@P67:generated', 'typewriter_2', -11, 1.6);
bt('@P67:four', 'zoom-on-number', 'c67.value', { fill: 0.38, maxH: 400, sy: 400 }); sf('@P67:four', 'money_counter_2', -11, 1.3); bt('@P67:cost', 'graphic-hero', ['ml67', 'ch67'], { fill: 0.72, sx: 1100, sy: 490, pose: 'point' });
bt('@P67:$18', 'zoom-on-number', 'ch67.value', { fill: 0.3, maxH: 400, sy: 480, pose: 'shock' }); sf('@P67:$18', 'cash_register_1', -9, 0.9); sk('@P67:$18', 10);
// P68 JPMorgan bought Frank for $175M
el('cs68', 'tile', R5(8) - 560, 40, '@P68-0.3', { icon: 'cash', caption: 'THE PRICE', w: 330, h: 380, iconS: 190, tilt: -0.03 }, { out: '@P69-0.2' });
el('c68', 'counter', R5(8) + 340, 20, '@P68-0.2', { label: 'THE BANK PAID', to: 175000000, prefix: '$', at: '@P68:$175', dur: 1.5, tone: 'bad', size: 170, w: 1000 }, { out: '@P69-0.2' });
bt('@P68', 'graphic-hero', ['cs68', 'c68'], { move: 'whip', fill: 0.82, sy: 500, pose: 'point' }); sf('@P68-0.3', 'swoosh_2', -11, 0.5);
bt('@P68:$175', 'zoom-on-number', 'c68.value', { fill: 0.5, maxH: 420, sy: 500, pose: 'shock' }); sf('@P68:$175', 'money_counter_1', -11, 1.6); sf('@P68:million+0.2', 'cash_register_1', -9, 0.9); sk('@P68:million+0.2', 12);
// P69 the bank tried to reach its customers; the list fell apart
el('ml69', 'maillist', R5(9), 20, '@P69-0.3', { w: 900, h: 720, at: '@P69:reach', per: 0.2, rows: 10, bounceAt: '@P69:list', title: 'EMAIL TO THE NEW CUSTOMERS' }, { out: '@P70-0.2' });
bt('@P69', 'graphic-hero', 'ml69', { move: 'whip', fill: 0.5, maxH: 860, sy: 500, pose: 'point' }); sf('@P69-0.3', 'swoosh_2', -11, 0.5);
bt('@P69:list', 'zoom-on-number', 'ml69', { fill: 0.5, maxH: 860, sy: 500, pose: 'shock' }); for (let i = 0; i < 5; i++) sf(`@P69:list+${(i * 0.1).toFixed(1)}`, 'wrong_buzzer_2', -14, 0.4); sk('@P69:list', 12);
// P70 verdict: all four counts, 85 months, $287.5M
con('j70', 'jav', R5(10) - 520, 40, '@P70-0.3', { w: 420, variant: 'card', bars: '@P70:85', stamps: [{ text: 'GUILTY · ALL 4', at: '@P70:jury', tone: 'bad', size: 52, rot: -0.1, y: 60 }], push: { at: '@P70', to: 1.2, dur: 4 }, flash: false }, { out: '@P71-0.2' });
el('y70', 'counter', R5(10) + 220, -130, '@P70:sentenced-0.1', { label: 'SENTENCED TO', sub: 'MONTHS IN PRISON', to: 85, at: '@P70:85', dur: 0.9, tone: 'bad', size: 170, w: 940 }, { out: '@P71-0.2' });
el('m70', 'counter', R5(10) + 220, 210, '@P70:pay-0.1', { label: 'AND ORDERED TO PAY BACK', to: 287500000, prefix: '$', at: '@P70:$287', dur: 1.5, tone: 'bad', size: 120, w: 940 }, { out: '@P71-0.2' });
bt('@P70', 'graphic-hero', ['j70', 'y70'], { move: 'whip', fill: 0.78, sy: 490, pose: 'point' }); sf('@P70-0.3', 'swoosh_2', -11, 0.5); sf('@P70:jury', 'gavel_1', -5, 0.8); sk('@P70:jury', 12);
bt('@P70:85', 'zoom-on-number', 'y70.value', { fill: 0.44, maxH: 420, sy: 480, pose: 'shock' }); sf('@P70:85-0.1', 'cell_door_1', -7, 1.2);
bt('@P70:$287', 'zoom-on-number', 'm70.value', { fill: 0.5, maxH: 360, sy: 520 }); sf('@P70:$287', 'money_counter_1', -11, 1.5); bt('@P70:pay', 'graphic-hero', ['j70', 'y70', 'm70'], { fill: 0.84, sy: 500, pose: 'chin' });
