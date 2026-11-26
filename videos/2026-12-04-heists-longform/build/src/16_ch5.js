// ---------------- CH5 · THE DOG (P093-P111) — 1966 London park: grass green + trophy gold (warmest chapter) ----------------
const TRO = 'brand/photos/jules-rimet-trophy/3.jpg';
const TROPHY = (id, x, y, inn, o, out) => el(id, 'photo', x, y, inn, { src: TRO, name: 'REPLICA', role: 'A COPY, NOT THE STOLEN ONE', credit: 'PHOTO: ABEL LAFLEUR · PUBLIC DOMAIN', fx: 0.5, fy: 0.3, aspect: 1.2, ...(o || {}) }, out);
// P093 chapter card with Pickles' card
el('h93', 'headline', R5(0) - 420, 40, '@P093-0.3', { kicker: 'CASE FILE Nº 5', lines: ['THE', [['DOG', 'accent']]], size: 200, underAt: 1.0, underTone: 'good' }, { out: '@P094-0.2' });
con('g93', 'pick', R5(0) + 520, 40, '@P093-0.2', { w: 440, variant: 'card', file: true, caseNo: 'CASE Nº 5', flash: true, push: { at: '@P093', to: 1.12, dur: 2.4 } }, { out: '@P094-0.2' });
bt('@P093', 'graphic-hero', ['h93', 'g93'], { move: 'whip', fill: 0.9, sy: 470, pose: 'shrug' }); sf('@P093-0.6', 'tape_stop_1', -8, 1.0); sf('@P093-0.1', 'cinematic_hit_1', -9, 1.5); sf('@P093+0.7', 'camera_flash_1', -9, 0.6);
bt('@P093:dog', 'zoom-on-number', 'g93', { fill: 0.32, maxH: 780, sx: 1250, sy: 520, pose: 'point' }); sf('@P093:dog', 'pop_2', -8, 0.4);
// P094 London, March 1966; the World Cup is four months away
el('dc94', 'datecard', R5(1) - 640, -300, '@P094-0.2', { big: '1966', small: 'LONDON · MARCH' }, { out: '@P095-0.2' });
el('c94', 'counter', R5(1) + 160, 40, '@P094:world-0.3', { label: 'UNTIL THE WORLD CUP', to: 4, suffix: ' MONTHS', at: '@P094:four-0.3', dur: 0.8, tone: 'good', size: 190, w: 900 }, { out: '@P095-0.2' });
bt('@P094', 'graphic-hero', ['dc94'], { move: 'whip', fill: 0.4, maxH: 300, sy: 460, pose: 'point' }); sf('@P094-0.3', 'swoosh_2', -11, 0.5);
bt('@P094:host', 'graphic-hero', ['dc94', 'c94'], { fill: 0.9, sy: 480, pose: 'chin' });
bt('@P094:four', 'zoom-on-number', 'c94.value', { fill: 0.5, maxH: 440, sx: 1150, sy: 480, pose: 'shock' }); sf('@P094:four', 'clock_ticking_1', -10, 1.4);
// P095 the golden trophy in a glass case at a stamp show (a REPLICA photo)
TROPHY('tr95', R5(2) - 200, 40, '@P095-0.3', { w: 520, tilt: -0.02 }, { out: '@P096-0.2' });
el('ss95', 'stamp', R5(2) + 440, -120, '@P095:stamp-0.1', { text: 'STAMP SHOW', tone: 'accent', size: 84 }, { rot: -0.06, out: '@P096-0.2' });
el('gd95', 'text', R5(2) + 440, 140, '@P095:golden-0.1', { lines: [[['GOLDEN', 'gold']], [['TROPHY', 'paper']]], size: 110 }, { out: '@P096-0.2' });
bt('@P095', 'graphic-hero', ['tr95'], { move: 'whip', fill: 0.32, maxH: 900, sy: 520, pose: 'point' }); sf('@P095-0.3', 'swoosh_2', -11, 0.5); sf('@P095-0.1', 'camera_shutter_1', -9, 0.5);
bt('@P095:golden', 'graphic-hero', ['tr95', 'gd95'], { fill: 0.84, sy: 500, pose: 'shock' }); sf('@P095:golden', 'ding_2', -9, 0.7);
bt('@P095:stamp', 'graphic-hero', ['tr95', 'ss95', 'gd95'], { fill: 0.9, sy: 500, pose: 'chin' }); sf('@P095:stamp', 'rubber_stamp_2', -8, 0.5);
// P096 Sunday 20 March: the case is empty, THE THIEF ? appears
el('dc96', 'datecard', R5(3) - 700, -300, '@P096-0.2', { big: 'SUN 20 MARCH', small: '1966' }, { out: '@P097-0.2' });
pr('gc96', 'glasscase', R5(3) - 100, 40, '@P096-0.3', { w: 560, h: 640, gone: '@P096:takes-0.3' }, { out: '@P097-0.2' });
con('th96', 'thief', R5(3) + 560, 40, '@P096:somebody-0.2', { w: 380, variant: 'card', file: true, caseNo: 'UNKNOWN', flash: true }, { out: '@P097-0.2' });
bt('@P096', 'graphic-hero', ['dc96', 'gc96'], { move: 'whip', fill: 0.62, sy: 480, pose: 'point' }); sf('@P096-0.3', 'swoosh_2', -11, 0.5);
bt('@P096:somebody', 'graphic-hero', ['gc96', 'th96'], { fill: 0.78, sy: 500, pose: 'chin' }); sf('@P096:somebody', 'camera_flash_1', -10, 0.6);
bt('@P096:takes', 'zoom-on-number', 'gc96', { fill: 0.32, maxH: 780, sx: 900, sy: 500, pose: 'shock' }); sf('@P096:takes-0.3', 'glass_clink_1', -10, 0.6);
// P097 the most famous trophy in sport is just gone
el('t97', 'text', R5(4), -150, '@P097-0.3', { lines: [[['THE MOST FAMOUS', 'paper']], [['TROPHY IN SPORT', 'paper']]], size: 100 }, { out: '@P098-0.2' });
el('g97', 'text', R5(4), 210, '@P097:gone-0.1', { lines: [[['GONE', 'bad']]], size: 280 }, { enter: 'slam', out: '@P098-0.2' });
bt('@P097', 'graphic-hero', ['t97'], { move: 'whip', fill: 0.62, maxH: 460, sy: 400, pose: 'point' }); sf('@P097-0.3', 'swoosh_2', -11, 0.5);
bt('@P097:gone', 'zoom-on-number', ['t97', 'g97'], { fill: 0.7, maxH: 900, sy: 500, pose: 'shock' }); sf('@P097:gone-0.1', 'deep_boom_2', -6, 1.2); sk('@P097:gone', 12);
// P098 + P099 the ransom note (no amount) with a piece of the lining from "Jackson"
pr('rn98', 'ransom', R5(5) - 200, 40, '@P098-0.3', { w: 800, h: 560, a: '@P099:lining', sig: '@P099:jackson' }, { out: '@P100-0.2' });
el('df98', 'card', R5(5) + 560, 20, '@P098:ransom#2-0.3', { w: 600, h: 400, lines: [{ t: 'RANSOM', size: 84, font: 'hero', tone: 'bad', at: '@P098:ransom#2' }, { t: '=', size: 70, font: 'hero', at: '@P098:pay-0.3' }, { t: 'PAY US, OR NEVER', size: 40, font: 'hero', at: '@P098:pay' }, { t: 'SEE IT AGAIN', size: 40, font: 'hero', at: '@P098:never' }], pad: 100 }, { out: '@P099-0.2' });
bt('@P098', 'graphic-hero', ['rn98'], { move: 'whip', fill: 0.4, maxH: 700, sy: 500, pose: 'point' }); sf('@P098-0.3', 'swoosh_2', -11, 0.5); sf('@P098:ransom', 'paper_slam_2', -9, 0.5);
bt('@P098:ransom#2', 'graphic-hero', ['rn98', 'df98'], { fill: 0.86, sy: 480, pose: 'chin' }); sf('@P098:ransom#2', 'typewriter_2', -11, 1.2);
bt('@P098:pay', 'zoom-on-number', 'df98', { fill: 0.32, maxH: 520, sx: 1250, sy: 480, pose: 'point' });
bt('@P099:lining', 'zoom-on-number', 'rn98', { fill: 0.5, maxH: 700, sy: 500, pose: 'shock' }); sf('@P099:lining', 'tape_zip_1', -10, 0.8);
bt('@P099:jackson', 'zoom-on-number', 'rn98', { fill: 0.5, maxH: 700, sy: 500, pose: 'chin' }); sf('@P099:jackson', 'pen_scratch_1', -10, 1.0);
// P100 Betchley is arrested
con('b100', 'bet', R5(7), 40, '@P100-0.3', { w: 460, variant: 'card', file: true, caseNo: 'THE MIDDLEMAN', flash: true, stamps: [{ text: 'ARRESTED', at: '@P100:arrest', tone: 'bad', size: 84, rot: -0.1, y: 40 }] }, { out: '@P101-0.2' });
el('dw100', 'stamp', R5(7) + 560, -150, '@P100:london-0.1', { text: 'LONDON DOCKWORKER', tone: 'accent', size: 54 }, { rot: -0.05, out: '@P101-0.2' });
bt('@P100', 'graphic-hero', ['b100', 'dw100'], { move: 'whip', fill: 0.6, sy: 500, pose: 'point' }); sf('@P100-0.3', 'swoosh_2', -11, 0.5); sf('@P100-0.1', 'camera_flash_1', -10, 0.6);
bt('@P100:arrest', 'zoom-on-number', 'b100', { fill: 0.34, maxH: 780, sy: 520, pose: 'shock' }); sf('@P100:arrest', 'handcuff_click_1', -6, 0.6); sf('@P100:arrest', 'rubber_stamp_2', -5, 0.5); sk('@P100:arrest', 9);
// P101 "I'm only the middleman" (his claim); the thief is a question mark; he never tells
con('b101', 'bet', R5(8) - 360, 40, '@P101-0.3', { w: 1000, variant: 'side', pw: 420, noquote: true, quote: [['“I’M ONLY', 'ink'], ['THE', 'ink'], ['MIDDLEMAN”', 'bad']], quoteSub: 'HIS CLAIM', quoteSize: 70, quoteAt: '@P101:only-0.1', flash: false }, { out: '@P102-0.2' });
con('t101', 'thief', R5(8) + 560, 60, '@P101:someone-0.2', { w: 330, variant: 'pip', label: 'WHO?', aspect: 1.0 }, { out: '@P102-0.2' });
el('lk101', 'icon', R5(8) - 260, 160, '@P101:never-0.1', { kind: 'lock', s: 190, col: 'gold', k: 1 }, { out: '@P102-0.2' });
bt('@P101', 'graphic-hero', ['b101'], { move: 'whip', fill: 0.62, maxH: 800, sy: 500, pose: 'point' }); sf('@P101-0.3', 'swoosh_2', -11, 0.5);
bt('@P101:only', 'zoom-on-number', 'b101', { fill: 0.6, maxH: 780, sy: 500, pose: 'chin' }); sf('@P101:only', 'typewriter_2', -11, 1.0);
bt('@P101:someone', 'graphic-hero', ['b101', 't101'], { fill: 0.9, sy: 480, pose: 'shrug' }); sf('@P101:someone', 'camera_flash_1', -10, 0.6);
bt('@P101:never', 'zoom-on-number', ['b101', 'lk101'], { fill: 0.7, maxH: 780, sy: 500, pose: 'shock' }); sf('@P101:never', 'click_1', -7, 0.4);
// P102 SUBSCRIBE moment
el('sub102', 'follow', 1480, 880, '@P102:subscribe-0.2', { press: 0.7, labels: ['SUBSCRIBE', '✓ SUBSCRIBED'] }, { layer: 'screen', out: '@P102:subscribe+1.6' });
sf('@P102:subscribe-0.15', 'pop_2', -9, 0.3); sf('@P102:subscribe+0.55', 'click_1', -8, 0.3); sf('@P102:subscribe+0.6', 'success_chime_1', -12, 1.2);
el('nw102', 'headline', R5(9), 40, '@P102-0.3', { kicker: 'A NEW CASE EVERY WEEK', lines: [[['A GOOD ', 'paper'], ['CATCH', 'accent']]], size: 150, underAt: 1.0 }, { out: '@P103-0.2' });
bt('@P102', 'graphic-hero', 'nw102', { move: 'whip', fill: 0.7, maxH: 640, sx: 860, sy: 480, st: 'corner', pose: 'point' }); sf('@P102-0.3', 'swoosh_2', -11, 0.5);
bt('@P102:subscribe', 'graphic-hero', 'nw102', { fill: 0.72, maxH: 640, sx: 860, sy: 480, st: 'corner', pose: 'follow' }); po('@P102:subscribe', 'follow', [1480, 880]); po('@P102:subscribe+1.2', 'point');
// P103 the police have a note, a middleman, still no trophy
el('n103', 'tile', R5(10) - 400, 40, '@P103-0.1', { icon: 'cheque', caption: 'THE NOTE', cap: 36, w: 330, h: 380, iconS: 190, tilt: -0.03, stamp: 'FOUND', tone: 'good', stampAt: '@P103:note+0.3', stampSize: 44 }, { out: '@P104-0.2' });
el('m103', 'tile', R5(10), 40, '@P103+0.15', { icon: 'cuffs', caption: 'MIDDLEMAN', cap: 34, w: 330, h: 380, iconS: 190, tilt: 0.02, stamp: 'FOUND', tone: 'good', stampAt: '@P103:middleman+0.3', stampSize: 44 }, { out: '@P104-0.2' });
el('t103', 'tile', R5(10) + 400, 40, '@P103+0.4', { icon: 'crown', caption: 'THE TROPHY', cap: 34, w: 330, h: 380, iconS: 190, tilt: -0.02, stamp: 'MISSING', tone: 'bad', stampAt: '@P103:trophy', stampSize: 44 }, { out: '@P104-0.2' });
bt('@P103', 'graphic-hero', ['n103', 'm103', 't103'], { move: 'whip', fill: 0.84, sy: 480, pose: 'point' }); sf('@P103-0.3', 'swoosh_2', -11, 0.5);
for (const w of ['note', 'middleman']) { sf(`@P103:${w}`, 'pop_2', -9, 0.3); sf(`@P103:${w}+0.3`, 'success_chime_2', -13, 0.8); }
bt('@P103:trophy', 'zoom-on-number', 't103', { fill: 0.3, maxH: 560, sx: 1150, sy: 500, pose: 'shock' }); sf('@P103:trophy', 'wrong_buzzer_1', -11, 0.7); sf('@P103:trophy', 'rubber_stamp_2', -7, 0.5);
// P104 one week later: Corbett and Pickles walk in south London
el('dc104', 'datecard', R5(11) - 700, -300, '@P104-0.2', { big: '1 WEEK LATER', small: 'SOUTH LONDON' }, { out: '@P105-0.2' });
con('c104', 'corb', R5(11) - 160, 40, '@P104:david-0.3', { w: 400, variant: 'card', file: true, caseNo: 'DOG WALKER', flash: true }, { out: '@P105-0.2' });
con('p104', 'pick', R5(11) + 380, 70, '@P104:dog-0.3', { w: 400, variant: 'card', file: true, caseNo: 'THE DOG', flash: true }, { out: '@P105-0.2' });
bt('@P104', 'graphic-hero', ['dc104'], { move: 'whip', fill: 0.4, maxH: 300, sy: 460, pose: 'point' }); sf('@P104-0.3', 'swoosh_2', -11, 0.5);
bt('@P104:david', 'graphic-hero', ['dc104', 'c104'], { fill: 0.84, sy: 500, pose: 'point' }); sf('@P104:david', 'camera_flash_1', -10, 0.6);
bt('@P104:dog', 'graphic-hero', ['c104', 'p104'], { fill: 0.84, sy: 500, pose: 'chin' }); sf('@P104:dog', 'camera_flash_1', -10, 0.6); sf('@P104:walk', 'footsteps_1', -11, 1.6);
bt('@P104:london', 'zoom-on-number', 'p104', { fill: 0.3, maxH: 780, sx: 1200, sy: 520, pose: 'shock' });
// P105 Pickles sniffs a newspaper-wrapped package under a hedge
pr('hd105', 'hedge', R5(12) + 100, 60, '@P105-0.3', { w: 980, h: 560, a: '@P105:package-0.2' }, { out: '@P106-0.2' });
con('p105', 'pick', R5(12) - 520, 80, '@P105:sniffs-0.3', { w: 320, variant: 'pip', label: 'SNIFF, SNIFF', aspect: 1.0, flash: false, arrow: { at: '@P105:sniffs', to: [380, 60] } }, { out: '@P106-0.2' });
bt('@P105', 'graphic-hero', ['hd105'], { move: 'whip', fill: 0.6, maxH: 700, sy: 500, pose: 'point' }); sf('@P105-0.3', 'swoosh_2', -11, 0.5);
bt('@P105:sniffs', 'graphic-hero', ['p105', 'hd105'], { fill: 0.9, sy: 480, pose: 'chin' }); sf('@P105:sniffs', 'sniff_sharp_1', -8, 0.8); sf('@P105:sniffs+0.8', 'sniff_sharp_2', -9, 0.8);
bt('@P105:package', 'zoom-on-number', 'hd105', { fill: 0.5, maxH: 700, sy: 500, pose: 'point' }); sf('@P105:package', 'paper_rustle_1', -9, 1.0);
bt('@P105:newspaper', 'zoom-on-number', 'hd105', { fill: 0.56, maxH: 700, sy: 500, pose: 'shock' });
// P106 and inside: the World Cup trophy (REPLICA photo)
TROPHY('tr106', R5(13), 40, '@P106-0.3', { w: 560, tilt: 0.02 }, { out: '@P107-0.2' });
bt('@P106', 'graphic-hero', ['tr106'], { move: 'whip', fill: 0.3, maxH: 780, sy: 470, pose: 'shock' }); sf('@P106-0.3', 'swoosh_2', -11, 0.5); sf('@P106:inside', 'paper_tear_1', -9, 0.8); sf('@P106:trophy', 'camera_flash_1', -8, 0.6); sf('@P106:trophy', 'ding_2', -9, 0.7);
bt('@P106:world', 'zoom-on-number', 'tr106', { fill: 0.32, maxH: 780, sy: 470, pose: 'chin' });
// P107 THE MISTAKE — EXHIBIT E: a hedge, a newspaper bundle, a city full of dogs (the stamp stays through this paragraph; P108 is THE TWIST)
mistake('P107', 'mistake', 'P107', 'E', R5(14), 4);
bt('@P107:mistake+0.02', 'graphic-hero', 'exP107', { dur: 0.05, lead: 0, fill: 0.44, sx: 1230, sy: 520, pose: 'point' });
bt('@P107:hedge', 'zoom-on-number', 'exP107', { fill: 0.46, maxH: 780, sx: 1230, sy: 520, pose: 'chin' }); sf('@P107:hedge', 'pop_2', -8, 0.4);
bt('@P107:dogs', 'zoom-on-number', 'exP107', { fill: 0.46, maxH: 780, sx: 1230, sy: 520, pose: 'shock' }); sf('@P107:dogs', 'cartoon_boing_1', -12, 0.8);
// P108 THE TWIST: Corbett is briefly a suspect, then cleared
con('c108', 'corb', R5(15), 40, '@P108-0.3', { w: 520, variant: 'card', stamps: [{ text: 'BRIEFLY A SUSPECT', at: '@P108:briefly', tone: 'bad', size: 44, rot: -0.08, y: 30 }, { text: 'CLEARED', at: '@P108:suspect+0.5', tone: 'good', size: 96, rot: 0.06, y: 180 }] }, { out: '@P109-0.2' });
bt('@P108', 'graphic-hero', 'c108', { move: 'whip', fill: 0.3, maxH: 780, sy: 470, pose: 'shrug' }); sf('@P108-0.3', 'swoosh_2', -11, 0.5); sf('@P108:twist', 'dramatic_sting_1', -12, 1.4);
bt('@P108:briefly', 'zoom-on-number', 'c108', { fill: 0.32, maxH: 780, sy: 470, pose: 'chin' }); sf('@P108:briefly', 'rubber_stamp_2', -7, 0.5);
bt('@P108:suspect', 'zoom-on-number', 'c108', { fill: 0.34, maxH: 780, sy: 470, pose: 'point' }); sf('@P108:suspect+0.5', 'success_chime_1', -9, 1.0); sf('@P108:suspect+0.5', 'rubber_stamp_2', -6, 0.5);
// P109 Betchley convicted over the ransom demand: two years
el('j109', 'jail', R5(16) + 200, 40, '@P109-0.3', { w: 1000, h: 700, dropAt: '@P109:convicted', plaqueAt: '@P109:two-0.2', head: 'OVER THE RANSOM DEMAND', lines: [{ t: '2 YEARS', at: '@P109:two', size: 130 }] }, { out: '@P110-0.2' });
con('b109', 'bet', R5(16) - 620, 100, '@P109-0.2', { w: 320, variant: 'pip', label: 'CONVICTED', aspect: 1.0, flash: false }, { out: '@P110-0.2' });
bt('@P109', 'graphic-hero', ['b109', 'j109'], { move: 'whip', fill: 0.84, sy: 500, pose: 'point' }); sf('@P109-0.3', 'swoosh_2', -11, 0.5); sf('@P109:convicted', 'cell_door_1', -9, 1.0);
bt('@P109:two', 'zoom-on-number', 'j109', { fill: 0.54, maxH: 620, sx: 1100, sy: 520, pose: 'shock' }); sf('@P109:two', 'rubber_stamp_2', -6, 0.5);
// P110 the actual thief: never convicted
con('t110', 'thief', R5(17), 40, '@P110-0.3', { w: 480, variant: 'card', file: true, caseNo: 'UNKNOWN', flash: false, stamps: [{ text: 'NEVER CONVICTED', at: '@P110:convicted', tone: 'bad', size: 58, rot: -0.1, y: 50 }] }, { out: '@P111-0.2' });
bt('@P110', 'graphic-hero', 't110', { move: 'whip', fill: 0.34, maxH: 860, sy: 520, pose: 'chin' }); sf('@P110-0.3', 'swoosh_2', -11, 0.5);
bt('@P110:convicted', 'zoom-on-number', 't110', { fill: 0.4, maxH: 860, sy: 520, pose: 'shock' }); sf('@P110:convicted', 'rubber_stamp_2', -5, 0.5); sk('@P110:convicted', 9);
// P111 that summer England won; the hero was the dog; tray slot 5
pr('su111', 'sun', R5(18) - 20, -330, '@P111:summer-0.2', { w: 400, h: 400, a: '@P111:summer' }, { out: '@P112-0.2' });
TROPHY('tr111', R5(18) - 400, 60, '@P111:england-0.3', { w: 440, tilt: -0.03 }, { out: '@P112-0.2' });
con('p111', 'pick', R5(18) + 380, 60, '@P111:hero-0.5', { w: 440, variant: 'card', flash: true, stamps: [{ text: 'THE HERO', at: '@P111:hero', tone: 'good', size: 84, rot: -0.08, y: 50 }] }, { out: '@P112-0.2' });
bt('@P111', 'graphic-hero', ['su111', 'tr111'], { move: 'whip', fill: 0.76, sy: 440, pose: 'point' }); sf('@P111-0.3', 'swoosh_2', -11, 0.5);
bt('@P111:england', 'graphic-hero', ['tr111', 'su111'], { fill: 0.7, sy: 480, pose: 'chin' }); sf('@P111:won', 'cheer_1', -14, 2.0);
bt('@P111:hero', 'zoom-on-number', 'p111', { fill: 0.32, maxH: 780, sx: 1250, sy: 520, pose: 'shock' }); sf('@P111:hero', 'rubber_stamp_2', -6, 0.5); sf('@P111:hero', 'ding_2', -9, 0.8); sk('@P111:hero', 8);
