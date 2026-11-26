// ---------------- CH3 · THE LOTTERY'S OWN SECURITY GUY (P34-P47) — lottery gold-navy room, Tipton (illustration) ----------------
const R3 = k => K(RM[3], k);
el('ch3', 'headline', R3(0) - 360, 40, '@P34-0.3', { kicker: 'CHAPTER THREE', lines: ['THE LOTTERY\'S OWN', [['SECURITY ', 'paper'], ['GUY', 'accent']]], size: 112, underAt: 1.0 }, { out: '@P35-0.2' });
con('t1', 'tip', R3(0) + 640, 50, '@P34-0.2', { w: 440, variant: 'card', file: true, caseNo: 'CASE Nº 3', push: { at: '@P34', to: 1.12, dur: 4 } }, { out: '@P35-0.2' });
bt('@P34', 'graphic-hero', ['ch3', 't1'], { move: 'whip', dur0: 0.7, fill: 0.82, sy: 480, pose: 'shrug', arc: 0.2 }); sf('@P34-0.6', 'tape_stop_1', -8, 1.0); sf('@P34-0.1', 'cinematic_hit_1', -9, 1.5); sf('@P34+0.9', 'camera_flash_1', -9, 0.6); sk('@P34+0.7', 8);
bt('@P34:security', 'zoom-on-number', 't1', { fill: 0.3, maxH: 760, sy: 520, pose: 'point' });
// P35 millions trust the numbers are random
for (let i = 0; i < 6; i++) el('tk35' + i, 'icon', R3(1) - 700 + i * 280, 20 + (i % 2) * 40, `@P35:millions+${(i * 0.14).toFixed(2)}`, { kind: 'ticket', s: 200, col: 'paper' }, { out: '@P36-0.2' });
el('rn35', 'stamp', R3(1), 300, '@P35:random-0.2', { text: 'ARE THEY RANDOM?', tone: 'accent', size: 100 }, { rot: -0.04, out: '@P36-0.2' });
bt('@P35', 'graphic-hero', 'tk352', { move: 'whip', fill: 0.5, sy: 480, pose: 'point' }); sf('@P35-0.3', 'swoosh_2', -11, 0.5);
bt('@P35:millions', 'graphic-hero', ['tk350', 'tk355'], { fill: 0.82, sy: 480, pose: 'point' }); for (let i = 0; i < 6; i++) sf(`@P35:millions+${(i * 0.14).toFixed(2)}`, 'pop_2', -12, 0.3);
bt('@P35:random', 'zoom-on-number', 'rn35', { fill: 0.5, maxH: 400, sy: 470, pose: 'chin' }); sf('@P35:random', 'rubber_stamp_2', -6, 0.5);
// P36 Iowa computers pick numbers for many states, guarded by one man
el('mp36', 'map', R3(2) - 520, 20, '@P36-0.3', { title: 'LOTTERIES THAT USE THE COMPUTERS', w: 760, h: 560, nodes: [{ id: 'ia', x: 0.5, y: 0.5, label: 'IOWA', sub: 'THE COMPUTERS', at: '@P36:iowa', tone: 'accent', r: 34 }, { id: 'a', x: 0.15, y: 0.3, label: '', at: '@P36:many', r: 16 }, { id: 'b', x: 0.85, y: 0.25, label: '', at: '@P36:many+0.1', r: 16 }, { id: 'c', x: 0.2, y: 0.8, label: '', at: '@P36:many+0.2', r: 16 }, { id: 'd', x: 0.8, y: 0.8, label: '', at: '@P36:many+0.3', r: 16 }], links: [{ from: 'ia', to: 'a', at: '@P36:many' }, { from: 'ia', to: 'b', at: '@P36:many+0.1' }, { from: 'ia', to: 'c', at: '@P36:many+0.2' }, { from: 'ia', to: 'd', at: '@P36:many+0.3' }] }, { out: '@P37-0.2' });
con('t36', 'tip', R3(2) + 520, 40, '@P36:eddie-0.4', { w: 420, variant: 'card', nick: '“INFORMATION SECURITY DIRECTOR”', stamps: [], flash: true, push: { at: '@P36:eddie', to: 1.2, dur: 3 } }, { out: '@P37-0.2' });
bt('@P36', 'graphic-hero', 'mp36', { move: 'whip', fill: 0.42, maxH: 700, sy: 490, pose: 'point' }); sf('@P36-0.3', 'swoosh_2', -11, 0.5); sf('@P36:iowa', 'pop_2', -8, 0.4);
bt('@P36:many', 'graphic-hero', 'mp36', { fill: 0.44, maxH: 700, sy: 490 }); bt('@P36:eddie', 'graphic-hero', ['mp36', 't36'], { fill: 0.82, sy: 490, pose: 'point' }); sf('@P36:eddie', 'camera_flash_1', -9, 0.6);
bt('@P36:director', 'zoom-on-number', 't36', { fill: 0.3, maxH: 760, sy: 520, pose: 'shock' });
// P37 he helped write the software; trick step 1
con('t37', 'tip', R3(3) - 700, 380, '@P37-0.2', { w: 250, variant: 'pip', label: 'HE WROTE IT', flash: false, arrow: { at: '@P37:write', to: [250, -250] } }, { out: '@P38-0.2' });
el('cd37', 'card', R3(3) + 40, 20, '@P37-0.3', { w: 1000, h: 520, fill: 'navy', lines: [{ t: 'LOTTERY SOFTWARE', size: 40, font: 'mono', tone: 'gold', at: '@P37-0.1' }, { t: '{ pick numbers }', size: 120, tone: 'paper', at: '@P37:software' }, { t: 'STEP 1 · HE HELPED WRITE IT', size: 38, font: 'mono', tone: 'good', at: '@P37:helped' }] }, { out: '@P38-0.2' });
bt('@P37', 'graphic-hero', ['t37', 'cd37'], { move: 'whip', fill: 0.78, sy: 500, pose: 'point' }); sf('@P37-0.3', 'swoosh_2', -11, 0.5); sf('@P37:software', 'typewriter_2', -11, 1.4);
bt('@P37:software', 'zoom-on-number', 'cd37', { fill: 0.5, maxH: 520, sy: 500 }); bt('@P37:write', 'graphic-hero', ['t37', 'cd37'], { fill: 0.78, sy: 500, pose: 'point' });
// P38 trick: hid extra code; a few dates a year the numbers were predictable
el('cd38', 'card', R3(4) - 700, 40, '@P38:hid-0.2', { w: 560, h: 420, fill: 'navy', lines: [{ t: 'STEP 2', size: 44, font: 'mono', tone: 'good', at: '@P38:hid-0.1' }, { t: 'HIDDEN CODE', size: 90, tone: 'bad', at: '@P38:hid' }, { t: 'EXTRA LINES, NOBODY SEES', size: 26, font: 'mono', tone: 'paper', at: '@P38:code' }] }, { out: '@P39-0.2' });
el('cal38', 'calendar', R3(4) + 20, 40, '@P38:dates-0.3', { head: 'A FEW DATES A YEAR', pages: [{ at: '@P38:dates', text: 'JAN' }, { at: '@P38:dates+0.5', text: 'JUL', tone: 'bad' }, { at: '@P38:specific+0.3', text: 'DEC', tone: 'bad' }], size: 140, w: 600 }, { out: '@P39-0.2' });
for (let i = 0; i < 6; i++) el('bl38' + i, 'tile', R3(4) + 800 + (i % 3) * 190, -120 + Math.floor(i / 3) * 230, `@P38:predict+${(i * 0.1).toFixed(1)}`, { icon: 'labels', caption: '', w: 170, h: 190, iconS: 70 }, { out: '@P39-0.2' });
el('pd38', 'stamp', R3(4) + 980, 280, '@P38:predict+0.7', { text: 'HE CAN PREDICT', tone: 'bad', size: 52 }, { rot: -0.05, out: '@P39-0.2' });
bt('@P38', 'graphic-hero', 'cd38', { move: 'whip', fill: 0.34, maxH: 560, sy: 500, pose: 'point' }); sf('@P38-0.3', 'swoosh_2', -11, 0.5); sf('@P38:hid', 'pop_2', -8, 0.4);
bt('@P38:dates', 'graphic-hero', ['cd38', 'cal38'], { fill: 0.64, sy: 500, pose: 'point' }); sf('@P38:dates', 'paper_slam_2', -11, 0.5);
bt('@P38:predict', 'graphic-hero', ['cal38', 'bl380', 'pd38'], { fill: 0.7, sy: 500, pose: 'shock' }); sf('@P38:predict+0.7', 'rubber_stamp_2', -6, 0.5); sk('@P38:predict+0.7', 10);
// P39 workers can't play; he passed numbers to his brother and a friend who bought tickets
con('t39', 'tip', R3(5) - 760, 40, '@P39-0.3', { w: 300, variant: 'pip', label: 'THE TRICK', flash: false }, { out: '@P40-0.2' });
el('fl39', 'flow', R3(5) + 220, 80, '@P39:passed-0.3', { w: 1280, h: 360, items: [{ label: 'NUMBERS', icon: 'doc', at: '@P39:passed' }, { label: 'BROTHER + FRIEND', icon: 'pair', at: '@P39:brother' }, { label: 'TICKET', icon: 'ticket', at: '@P39:bought' }, { label: 'WIN', icon: 'dollar', at: '@P39:collected', tone: 'good' }] }, { out: '@P40-0.2' });
el('np39', 'stamp', R3(5) - 280, -300, '@P39:aren\'t-0.1', { text: 'WORKERS CAN\'T PLAY', tone: 'bad', size: 74 }, { rot: -0.04, out: '@P40-0.2' });
bt('@P39', 'graphic-hero', ['np39', 't39'], { move: 'whip', fill: 0.62, sy: 480, pose: 'point' }); sf('@P39-0.3', 'swoosh_2', -11, 0.5); sf('@P39:aren\'t', 'rubber_stamp_2', -6, 0.5);
bt('@P39:passed', 'graphic-hero', 'fl39', { fill: 0.72, maxH: 460, sy: 500, pose: 'point' }); sf('@P39:passed', 'pop_2', -8, 0.3); sf('@P39:brother', 'pop_2', -8, 0.3); sf('@P39:bought', 'pop_2', -8, 0.3); sf('@P39:collected', 'cash_register_1', -9, 0.9);
bt('@P39:collected', 'zoom-on-number', 'fl39', { fill: 0.5, maxH: 420, sy: 500, pose: 'shock' });
// P40 Colorado, Wisconsin, Oklahoma — $2.5M+
el('mp40', 'map', R3(6) - 380, 30, '@P40-0.3', { title: 'THE SMALLER WINS', w: 840, h: 560, nodes: [{ id: 'co', x: 0.25, y: 0.45, label: 'COLORADO', at: '@P40:colorado', tone: 'accent', r: 26 }, { id: 'wi', x: 0.72, y: 0.22, label: 'WISCONSIN', at: '@P40:wisconsin', tone: 'accent', r: 26 }, { id: 'ok', x: 0.5, y: 0.78, label: 'OKLAHOMA', at: '@P40:oklahoma', tone: 'accent', r: 26 }], links: [] }, { out: '@P41-0.2' });
el('c40', 'counter', R3(6) + 520, 20, '@P40:wins-0.2', { label: 'WINS, COMBINED', sub: 'MORE THAN', to: 2500000, prefix: '$', at: '@P40:two', dur: 1.2, tone: 'good', size: 130, w: 760 }, { out: '@P41-0.2' });
bt('@P40', 'graphic-hero', 'mp40', { move: 'whip', fill: 0.42, maxH: 700, sy: 490, pose: 'point' }); sf('@P40-0.3', 'swoosh_2', -11, 0.5);
for (const w of ['colorado', 'wisconsin', 'oklahoma']) sf(`@P40:${w}`, 'pop_2', -8, 0.3);
bt('@P40:wins', 'graphic-hero', ['mp40', 'c40'], { fill: 0.86, sy: 490, pose: 'point' }); bt('@P40:two', 'zoom-on-number', 'c40.value', { fill: 0.42, maxH: 400, sy: 500, pose: 'shock' }); sf('@P40:two', 'money_counter_2', -11, 1.3);
// P41 Dec 29 2010, Des Moines gas station ticket, $16.5M jackpot
el('dc41', 'datecard', 440, 190, '@P41-0.2', { big: 'DEC 29, 2010', small: 'DES MOINES, IOWA', kicker: 'GAS STATION TICKET' }, { layer: 'screen', out: '@P42-0.1' });
el('lt41', 'lotto', R3(7) - 150, 40, '@P41-0.3', { w: 800, h: 460, amount: '$16.5 MILLION', ballsAt: '@P41:ticket', per: 0.2 }, { out: '@P43-0.2' });
con('t41', 'tip', R3(7) + 600, 330, '@P41:hits-0.2', { w: 260, variant: 'pip', label: 'THE BIG ONE', flash: false }, { out: '@P43-0.2' });
bt('@P41', 'graphic-hero', 'lt41', { move: 'whip', fill: 0.46, maxH: 700, sy: 500, pose: 'point' }); sf('@P41-0.3', 'swoosh_2', -11, 0.5); sf('@P41:bought', 'pop_2', -8, 0.4);
bt('@P41:sixteen', 'zoom-on-number', 'lt41.amount', { fill: 0.42, maxH: 420, sy: 440, pose: 'shock' }); sf('@P41:sixteen', 'money_counter_2', -11, 1.3); sf('@P41:hits', 'cash_register_1', -8, 0.9); sk('@P41:hits', 10);
// P42 to claim, someone has to show their face
el('sl42', 'silh', R3(8) - 380, 40, '@P42-0.3', { name: 'SHOW YOUR FACE', role: 'TO CLAIM THE PRIZE', hat: 'none', tone: 'navy', tag: 'WHO?' }, { out: '@P43-0.2' });
el('q42', 'text', R3(8) + 360, 40, '@P42:problem-0.1', { lines: [[['ONE ', 'paper'], ['PROBLEM', 'bad']]], size: 150 }, { enter: 'slam', out: '@P43-0.2' });
bt('@P42', 'graphic-hero', 'sl42', { move: 'whip', fill: 0.26, maxH: 700, sy: 500, pose: 'chin' }); sf('@P42-0.3', 'swoosh_2', -11, 0.5);
bt('@P42:problem', 'graphic-hero', ['sl42', 'q42'], { fill: 0.74, sy: 490, pose: 'shock' }); sf('@P42:problem', 'rubber_stamp_2', -5, 0.5); sk('@P42:problem', 10); bt('@P42:face', 'zoom-on-number', 'sl42', { fill: 0.28, maxH: 700, sy: 500, pose: 'point' }); sf('@P42:face', 'camera_flash_1', -9, 0.6);
// P43 nobody for a year; two hours before the deadline, lawyers for a Belize trust
el('cal43', 'calendar', R3(9) - 640, 40, '@P43-0.3', { head: 'MONTHS WITH NO CLAIM', roll: { from: 0, to: 12, at: '@P43:year', dur: 2.2 }, sub: 'NOBODY CAME FORWARD', subAt: '@P43:year+1.5', size: 190, w: 620 }, { out: '@P44-0.2' });
el('ck43', 'counter', R3(9) + 110, -120, '@P43:two-0.3', { label: 'BEFORE THE DEADLINE', to: 2, suffix: ' HOURS', prefix: '< ', at: '@P43:two', dur: 0.5, tone: 'bad', size: 130, w: 640 }, { out: '@P44-0.2' });
el('bz43', 'card', R3(9) + 110, 210, '@P43:lawyers-0.1', { w: 640, h: 220, fill: 'navy', lines: [{ t: 'MYSTERY TRUST', size: 62, tone: 'gold', at: '@P43:lawyers' }, { t: 'BELIZE', size: 52, tone: 'paper', at: '@P43:belize' }] }, { out: '@P44-0.2' });
bt('@P43', 'graphic-hero', 'cal43', { move: 'whip', fill: 0.4, maxH: 700, sy: 490, pose: 'chin' }); sf('@P43-0.3', 'swoosh_2', -11, 0.5); sf('@P43:year', 'money_counter_1', -13, 2.0);
bt('@P43:two', 'graphic-hero', ['cal43', 'ck43', 'bz43'], { fill: 0.8, sy: 490, pose: 'point' }); bt('@P43:two', 'zoom-on-number', 'ck43.value', { fill: 0.28, maxH: 340, sy: 460, pose: 'shock' }); sf('@P43:two', 'clock_ticking_1', -8, 1.5); sf('@P43:lawyers', 'paper_slam_2', -10, 0.5); sf('@P43:belize', 'pop_2', -8, 0.4);
// P44 lottery refused to pay until it knew who really bought it
el('rf44', 'stamp', R3(10) - 100, 40, '@P44:refused-0.1', { text: 'NO PAYOUT UNTIL WE KNOW WHO', tone: 'bad', size: 84 }, { rot: -0.04, out: '@P45-0.2' });
el('mg44', 'icon', R3(10) - 100, -300, '@P44:who-0.3', { kind: 'magnifier', s: 220, col: 'paper' }, { out: '@P45-0.2' });
bt('@P44', 'graphic-hero', 'rf44', { move: 'whip', fill: 0.78, maxH: 480, sy: 500, pose: 'point' }); sf('@P44-0.3', 'swoosh_2', -11, 0.5); sf('@P44:refused', 'rubber_stamp_2', -5, 0.5); sk('@P44:refused', 10);
bt('@P44:who', 'graphic-hero', ['rf44', 'mg44'], { fill: 0.74, sy: 480, pose: 'shock' });
// P45 store security video; his co-workers recognize his voice; red ring on Tipton
el('vd45', 'card', R3(11) - 700, 40, '@P45-0.3', { w: 620, h: 400, fill: 'navy', lines: [{ t: 'SECURITY VIDEO', size: 50, font: 'mono', tone: 'gold', at: '@P45:video-0.2' }, { t: 'STORE · 12/29/2010', size: 34, font: 'mono', tone: 'paper', at: '@P45:video' }, { t: '● REC', size: 80, tone: 'bad', at: '@P45:video' }] }, { out: '@P46-0.2' });
el('vc45', 'text', R3(11) + 80, -180, '@P45:voice-0.3', { lines: [[['“THAT\'S HIS ', 'paper'], ['VOICE', 'bad'], ['”', 'paper']]], size: 100 }, { out: '@P46-0.2' });
con('t45', 'tip', R3(11) + 480, 260, '@P45:director-0.1', { w: 400, variant: 'card', ring: '@P45:director', flash: false, push: { at: '@P45:director', to: 1.3, dur: 3 } }, { out: '@P46-0.2' });
bt('@P45', 'graphic-hero', 'vd45', { move: 'whip', fill: 0.4, maxH: 600, sy: 490, pose: 'point' }); sf('@P45-0.3', 'swoosh_2', -11, 0.5); sf('@P45:video', 'camera_flash_1', -10, 0.6);
bt('@P45:voice', 'graphic-hero', ['vd45', 'vc45', 't45'], { fill: 0.9, sy: 500, pose: 'shock' }); sf('@P45:voice', 'pop_2', -8, 0.4);
bt('@P45:director', 'zoom-on-number', 't45', { fill: 0.3, maxH: 760, sy: 520, pose: 'point' }); sf('@P45:director', 'heartbeat_1', -9, 2); sf('@P45:director', 'rubber_stamp_2', -6, 0.5); sk('@P45:director', 12);
// P46 verdict: pleaded guilty 2017, up to 25 years
con('t46', 'tip', R3(12) - 520, 40, '@P46-0.3', { w: 420, variant: 'card', bars: '@P46:twenty', stamps: [{ text: 'PLEADED GUILTY 2017', at: '@P46:pleaded', tone: 'bad', size: 44, rot: -0.1, y: 60 }], push: { at: '@P46', to: 1.2, dur: 4 }, flash: false }, { out: '@P47-0.2' });
el('y46', 'counter', R3(12) + 220, 0, '@P46:sentenced-0.2', { label: 'SENTENCED TO', sub: 'UP TO', to: 25, suffix: ' YEARS', at: '@P46:twenty', dur: 0.9, tone: 'bad', size: 170, w: 940 }, { out: '@P47-0.2' });
bt('@P46', 'graphic-hero', ['t46', 'y46'], { move: 'whip', fill: 0.78, sy: 490, pose: 'point' }); sf('@P46-0.3', 'swoosh_2', -11, 0.5); sf('@P46:pleaded', 'gavel_1', -5, 0.8); sk('@P46:pleaded', 12);
bt('@P46:twenty', 'zoom-on-number', 'y46.value', { fill: 0.44, maxH: 420, sy: 480, pose: 'shock' }); sf('@P46:twenty-0.1', 'cell_door_1', -7, 1.2);
bt('@P46:prison', 'graphic-hero', ['t46', 'y46'], { fill: 0.8, sy: 500, pose: 'chin' });
// P47 the jackpot was never collected
el('lt47', 'lotto', R3(13), 40, '@P47-0.3', { w: 840, h: 480, amount: '$16.5 MILLION', ballsAt: -5, grey: true, stamp: 'NEVER COLLECTED', stampAt: '@P47:nobody' }, { out: '@P48-0.2' });
bt('@P47', 'graphic-hero', 'lt47', { move: 'whip', fill: 0.46, maxH: 700, sy: 500, pose: 'point' }); sf('@P47-0.3', 'swoosh_2', -11, 0.5);
bt('@P47:nobody', 'zoom-on-number', 'lt47', { fill: 0.52, maxH: 620, sy: 500, pose: 'shock' }); sf('@P47:nobody', 'rubber_stamp_2', -5, 0.5); sk('@P47:nobody', 12);
