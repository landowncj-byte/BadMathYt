// ---------------- CH2 · THE SANDWICH (P029-P050) — diamond vault: steel blue + diamond white ----------------
const ANT = 'brand/photos/leonardo-notarbartolo/1.jpg';
// P029 chapter card + the fake dealer card
el('h29', 'headline', R2(0) - 420, 40, '@P029-0.3', { kicker: 'CASE FILE Nº 2', lines: ['THE', [['SANDWICH', 'bad']]], size: 170, underAt: 1.0 }, { out: '@P030-0.2' });
con('g29', 'dealer', R2(0) + 520, 40, '@P029-0.2', { w: 440, variant: 'card', file: true, caseNo: 'CASE Nº 2', flash: true, push: { at: '@P029', to: 1.12, dur: 2.4 } }, { out: '@P030-0.2' });
bt('@P029', 'graphic-hero', ['h29', 'g29'], { move: 'whip', fill: 0.9, sy: 470, pose: 'shrug' }); sf('@P029-0.6', 'tape_stop_1', -8, 1.0); sf('@P029-0.1', 'cinematic_hit_1', -9, 1.5); sf('@P029+0.7', 'camera_flash_1', -9, 0.6);
bt('@P029:sandwich', 'zoom-on-number', 'h29', { fill: 0.4, maxH: 520, sy: 480, pose: 'point' }); sf('@P029:sandwich', 'pop_2', -8, 0.4);
// P030 Antwerp, the diamond capital (public-domain street photo)
el('ph30', 'photo', R2(1) - 300, 40, '@P030-0.3', { src: ANT, name: 'ANTWERP, BELGIUM', role: 'A STREET IN THE DIAMOND DISTRICT', credit: 'PHOTO: THORSTEN1997 · PUBLIC DOMAIN', w: 700, aspect: 0.72, fx: 0.5, fy: 0.5, tilt: -0.02 }, { out: '@P031-0.2' });
el('dc30', 'datecard', R2(1) + 620, -230, '@P030-0.2', { big: 'ANTWERP', small: 'BELGIUM' }, { out: '@P031-0.2' });
el('tg30', 'stamp', R2(1) + 600, 110, '@P030:diamond', { text: 'DIAMOND CAPITAL', tone: 'accent', size: 70 }, { rot: -0.06, out: '@P031-0.2' });
bt('@P030', 'graphic-hero', ['ph30', 'dc30'], { move: 'whip', fill: 0.88, sy: 480, pose: 'point' }); sf('@P030-0.3', 'swoosh_2', -11, 0.5); sf('@P030-0.1', 'camera_shutter_1', -9, 0.5);
bt('@P030:diamond', 'graphic-hero', ['ph30', 'tg30', 'dc30'], { fill: 0.88, sy: 480, pose: 'shock' }); sf('@P030:diamond', 'rubber_stamp_2', -8, 0.5);
// P031 the vault with layers of security
pr('v31', 'vault', R2(2), 40, '@P031-0.3', { w: 900, h: 640, layers: ['@P031:under', '@P031:vault', '@P031:layer', '@P031:layer#2', '@P031:security'] }, { out: '@P032-0.2' });
bt('@P031', 'graphic-hero', 'v31', { move: 'whip', fill: 0.5, maxH: 800, sy: 500, pose: 'point' }); sf('@P031-0.3', 'swoosh_2', -11, 0.5);
bt('@P031:vault', 'zoom-on-number', 'v31', { fill: 0.5, maxH: 780, sy: 500, pose: 'chin' }); for (const [i, w] of ['under', 'vault', 'layer', 'layer#2', 'security'].entries()) sf(`@P031:${w}`, i === 4 ? 'cell_door_2' : 'click_2', -9, 0.6);
bt('@P031:security', 'graphic-hero', 'v31', { fill: 0.54, maxH: 800, sy: 500, pose: 'shock' });
// P032 safe-deposit boxes = locked metal drawers you rent
pr('bx32', 'boxes', R2(3), 40, '@P032-0.3', { w: 1100, h: 560, cols: 6, rows: 4, one: '@P032:rent', idx: 9 }, { out: '@P033-0.2' });
el('rt32', 'stamp', R2(3) + 520, -330, '@P032:rent', { text: 'YOU RENT IT', tone: 'accent', size: 80 }, { rot: -0.06, out: '@P033-0.2' });
bt('@P032', 'graphic-hero', 'bx32', { move: 'whip', fill: 0.62, maxH: 700, sy: 500, pose: 'point' }); sf('@P032-0.3', 'swoosh_2', -11, 0.5);
bt('@P032:locked', 'zoom-on-number', 'bx32', { fill: 0.7, maxH: 640, sy: 500, pose: 'chin' }); sf('@P032:locked', 'click_1', -8, 0.4);
bt('@P032:rent', 'graphic-hero', ['bx32', 'rt32'], { fill: 0.74, sy: 480, pose: 'point' }); sf('@P032:rent', 'pop_2', -8, 0.4); sf('@P032:rent+0.2', 'rubber_stamp_2', -8, 0.5);
// P033 meet Notarbartolo: his claim, a rented office
con('d33', 'dealer', R2(4) - 300, 40, '@P033-0.3', { w: 1000, variant: 'side', pw: 420, noquote: true, quote: [['“I’M A', 'ink'], ['DIAMOND', 'ink'], ['DEALER”', 'bad']], quoteSub: 'HIS CLAIM', quoteSize: 76, quoteAt: '@P033:notarbartolo+0.2', flash: true }, { out: '@P034-0.2' });
el('of33', 'card', R2(4) + 640, 20, '@P033:rented-0.3', { w: 400, h: 440, lines: [{ t: 'RENTED', size: 66, font: 'hero', at: '@P033:rented' }, { t: 'OFFICE', size: 66, font: 'hero', tone: 'bad', at: '@P033:office' }, { t: 'IN THE BUILDING', size: 24, font: 'mono', tone: 'soft', at: '@P033:building' }], pad: 90 }, { out: '@P034-0.2' });
bt('@P033', 'graphic-hero', ['d33'], { move: 'whip', fill: 0.62, maxH: 800, sy: 500, pose: 'point' }); sf('@P033-0.3', 'swoosh_2', -11, 0.5); sf('@P033-0.1', 'camera_flash_1', -10, 0.6);
bt('@P033:dealer', 'zoom-on-number', 'd33', { fill: 0.58, maxH: 780, sy: 500, pose: 'chin' }); sf('@P033:dealer', 'typewriter_2', -11, 1.0);
bt('@P033:rented', 'graphic-hero', ['d33', 'of33'], { fill: 0.9, sy: 480, pose: 'point' }); sf('@P033:rented', 'door_swing_1', -10, 1.0);
// P034 a reason to come and go, for a long time (no number)
el('cal34', 'calendar', R2(5) + 120, 40, '@P034-0.3', { head: 'FOR A LONG TIME', band: 'navy', size: 190, w: 700, h: 480, pages: ['JAN', 'MAR', 'MAY', 'JUL', 'SEP', 'NOV'].map((m, i) => ({ at: `@P034:reason+${(i * 0.4).toFixed(2)}`, text: m, tone: i % 2 ? 'ink' : 'bad' })) }, { out: '@P035-0.2' });
con('p34', 'dealer', R2(5) - 460, 80, '@P034:gave-0.2', { w: 300, variant: 'pip', label: 'COMES AND GOES', aspect: 1.0 }, { out: '@P035-0.2' });
bt('@P034', 'graphic-hero', ['p34', 'cal34'], { move: 'whip', fill: 0.84, sy: 480, pose: 'chin' }); sf('@P034-0.3', 'swoosh_2', -11, 0.5);
bt('@P034:reason', 'zoom-on-number', 'cal34', { fill: 0.4, maxH: 600, sx: 1150, sy: 480, pose: 'point' }); for (let i = 0; i < 6; i++) sf(`@P034:reason+${(i * 0.4).toFixed(2)}`, 'page_turn_1', -11, 0.4);
// P035 one weekend in February 2003: the crew gets in
el('dc35', 'datecard', R2(6) - 640, -300, '@P035-0.2', { big: '2003', small: 'FEB · ONE WEEKEND' }, { out: '@P036-0.2' });
con('c35', 'crew', R2(6) + 80, 40, '@P035-0.2', { w: 520, variant: 'card', file: true, caseNo: 'THE CREW', flash: true }, { out: '@P036-0.2' });
pr('v35', 'vault', R2(6) + 700, 220, '@P035-0.1', { w: 420, h: 330, layers: ['@P035:vault', '@P035:vault', '@P035:vault', '@P035:vault', '@P035:vault'] }, { out: '@P036-0.2' });
bt('@P035', 'graphic-hero', ['dc35', 'c35'], { move: 'whip', fill: 0.82, sy: 480, pose: 'point' }); sf('@P035-0.3', 'swoosh_2', -11, 0.5);
bt('@P035:crew', 'zoom-on-number', 'c35', { fill: 0.32, maxH: 760, sy: 500, pose: 'shock' }); sf('@P035:crew', 'camera_flash_1', -9, 0.6);
bt('@P035:vault', 'graphic-hero', ['c35', 'v35'], { fill: 0.82, sy: 480, pose: 'point' }); sf('@P035:vault', 'door_bang_1', -9, 0.8);
// P036 box after box
pr('bx36', 'boxes', R2(7), 40, '@P036-0.3', { w: 1100, h: 560, cols: 6, rows: 4, open: ['@P036:break'], per: 0.1 }, { out: '@P037-0.2' });
bt('@P036', 'graphic-hero', 'bx36', { move: 'whip', fill: 0.64, maxH: 700, sy: 500, pose: 'point' }); sf('@P036-0.3', 'swoosh_2', -11, 0.5);
bt('@P036:box', 'zoom-on-number', 'bx36', { fill: 0.74, maxH: 660, sy: 500, pose: 'shock' }); for (let i = 0; i < 6; i++) sf(`@P036:break+${(i * 0.3).toFixed(2)}`, 'pop_2', -9, 0.3);
// P037 the haul: ~$100 million (est.)
el('c37', 'counter', R2(8), 20, '@P037:$100-0.3', { label: 'THE HAUL (BY ESTIMATES)', to: 100, prefix: '$', suffix: ' MILLION', at: '@P037:$100', dur: 1.1, tone: 'good', size: 190, w: 1200 }, { out: '@P038-0.2' });
bt('@P037', 'graphic-hero', 'c37', { move: 'whip', fill: 0.78, sy: 480, pose: 'point' }); sf('@P037-0.3', 'swoosh_2', -11, 0.5);
bt('@P037:$100', 'zoom-on-number', 'c37.value', { fill: 0.7, maxH: 460, sy: 480, pose: 'shock' }); sf('@P037:$100', 'cash_register_1', -9, 1.0); sk('@P037:million', 8);
// P038 $100K a year -> 1,000 years of paychecks (1,000 envelopes)
pr('en38', 'envelopes', R2(9) - 120, 40, '@P038-0.3', { w: 1200, h: 620, cols: 40, rows: 25, a: '@P038:$100', per: 0.0032 }, { out: '@P039-0.2' });
el('c38', 'counter', R2(9) + 120, -430, '@P038:1-0.2', { label: 'YEARS OF $100,000 PAYCHECKS', to: 1000, suffix: ' YEARS', at: '@P038:1', dur: 1.0, tone: 'bad', size: 120, w: 900 }, { out: '@P039-0.2' });
bt('@P038', 'graphic-hero', ['en38', 'c38'], { move: 'whip', fill: 0.84, sy: 480, pose: 'point' }); sf('@P038-0.3', 'swoosh_2', -11, 0.5); sf('@P038:$100', 'paper_rustle_2', -10, 2.0);
bt('@P038:1', 'zoom-on-number', 'c38.value', { fill: 0.5, maxH: 420, sy: 480, pose: 'shock' }); sf('@P038:1', 'money_counter_1', -12, 1.2);
// P039 LIKE moment
el('heart', 'heart', 1620, 760, '@P039:hit-0.15', { s: 64 }, { layer: 'screen', out: '@P039:hit+1.5' }); sf('@P039:hit-0.1', 'pop_2', -8, 0.3); sf('@P039:hit+0.35', 'ding_2', -11, 0.7);
el('lk39', 'stamp', R2(10), 40, '@P039-0.3', { text: 'DID THEY GET AWAY?', tone: 'accent', size: 100 }, { rot: -0.03, out: '@P040-0.2' });
bt('@P039', 'graphic-hero', 'lk39', { move: 'whip', fill: 0.64, sy: 500, pose: 'shock' }); sf('@P039-0.3', 'swoosh_2', -11, 0.5);
bt('@P039:away', 'graphic-hero', 'lk39', { fill: 0.72, sy: 500, pose: 'point' });
// P040 one job left: get rid of the trash and burn it
el('cl40', 'checklist', R2(11), 20, '@P040-0.3', { title: 'ONE JOB LEFT', w: 1100, h: 480, rows: [{ show: '@P040:boring-0.2', t: 'GET RID OF THE TRASH' }, { show: '@P040:burn-0.2', t: 'BURN IT' }], lockOpen: '@P040>' }, { out: '@P041-0.2' });
bt('@P040', 'graphic-hero', 'cl40', { move: 'whip', fill: 0.6, maxH: 700, sy: 500, pose: 'point' }); sf('@P040-0.3', 'swoosh_2', -11, 0.5);
bt('@P040:trash', 'zoom-on-number', 'cl40.r0', { fill: 0.5, maxH: 300, sy: 500, pose: 'chin' }); sf('@P040:trash', 'pop_2', -9, 0.4);
bt('@P040:burn', 'zoom-on-number', 'cl40.r1', { fill: 0.5, maxH: 300, sy: 500, pose: 'point' }); sf('@P040:burn', 'pop_2', -9, 0.4);
// P041 it didn't happen: the bag got dumped by a road near Brussels
pr('bg41', 'bag', R2(12), 40, '@P041-0.3', { w: 900, h: 560, a: '@P041:dumped-0.2' }, { out: '@P042-0.2' });
el('x41', 'stamp', R2(12) - 330, -250, '@P041:happen+0.2', { text: 'BURN IT', tone: 'bad', size: 80 }, { rot: -0.08, out: '@P042-0.2' });
bt('@P041', 'graphic-hero', ['bg41', 'x41'], { move: 'whip', fill: 0.72, sy: 480, pose: 'shrug' }); sf('@P041-0.3', 'swoosh_2', -11, 0.5); sf('@P041:happen+0.2', 'wrong_buzzer_2', -12, 0.6);
bt('@P041:dumped', 'zoom-on-number', 'bg41', { fill: 0.6, maxH: 620, sy: 500, pose: 'point' }); sf('@P041:dumped', 'thud_2', -8, 0.6);
// P042 THE MISTAKE — EXHIBIT B: the half-eaten salami sandwich in an evidence bag
mistake('P042', 'mistake', 'P043', 'B', R2(13), 1);
bt('@P042:mistake+0.02', 'graphic-hero', 'exP042', { dur: 0.05, lead: 0, fill: 0.44, sx: 1230, sy: 520, pose: 'point' });
bt('@P042:evidence', 'zoom-on-number', 'exP042', { fill: 0.5, maxH: 780, sx: 1230, sy: 520, pose: 'shock' }); sf('@P042:evidence', 'camera_shutter_1', -8, 0.5);
bt('@P042:salami', 'zoom-on-number', 'exP042', { fill: 0.52, maxH: 780, sx: 1230, sy: 520, pose: 'chin' }); sf('@P042:salami', 'pop_2', -8, 0.4);
// P043 police say the sandwich carried his DNA: the tiny code only you have
pr('dn43', 'dna', R2(14) - 60, 40, '@P043:dna-0.3', { w: 360, h: 640, a: '@P043:dna' }, { out: '@P044-0.2' });
el('tg43', 'tile', R2(14) + 380, -150, '@P043:police-0.3', { icon: 'badge', caption: 'POLICE SAY', cap: 34, w: 330, h: 360, iconS: 170, tilt: 0.02 }, { out: '@P044-0.2' });
el('cd43', 'card', R2(14) + 820, 40, '@P043:code-0.3', { w: 560, h: 330, lines: [{ t: 'ONLY YOURS', size: 70, font: 'hero', tone: 'bad', at: '@P043:only' }, { t: 'THE TINY CODE IN YOUR BODY', size: 26, font: 'mono', tone: 'soft', at: '@P043:tiny' }], pad: 80 }, { out: '@P044-0.2' });
bt('@P043', 'graphic-hero', ['dn43', 'tg43'], { move: 'whip', fill: 0.6, sx: 1200, sy: 480, pose: 'point' }); sf('@P043-0.3', 'swoosh_2', -11, 0.5);
bt('@P043:dna', 'zoom-on-number', 'dn43', { fill: 0.24, maxH: 760, sx: 1200, sy: 500, pose: 'chin' }); sf('@P043:dna', 'pop_2', -8, 0.4);
bt('@P043:code', 'graphic-hero', ['tg43', 'cd43'], { fill: 0.7, sx: 1250, sy: 480, pose: 'point' });
bt('@P043:only', 'zoom-on-number', 'cd43', { fill: 0.4, maxH: 440, sx: 1250, sy: 480, pose: 'shock' }); sf('@P043:only', 'rubber_stamp_2', -8, 0.5);
// P044 + P045: five days later he walks back in, and is arrested
el('dc44', 'datecard', R2(15) - 700, -280, '@P044-0.2', { big: '5 DAYS LATER', small: 'AFTER THE HEIST' }, { out: '@P046-0.2' });
pr('of44', 'vault', R2(15) + 100, 60, '@P044-0.2', { w: 520, h: 420, layers: ['@P044:diamond', '@P044:diamond+0.1', '@P044:diamond+0.2', '@P044:diamond+0.3', '@P044:diamond+0.4'] }, { out: '@P046-0.2' });
con('w44', 'dealer', R2(15) + 640, 40, '@P044:five', { w: 400, variant: 'card', flash: true, ring: '@P045:arrested', stamps: [{ text: 'ARRESTED', at: '@P045:arrested', tone: 'bad', size: 80, rot: -0.1, y: 30 }] }, { out: '@P046-0.2' });
bt('@P044', 'graphic-hero', ['dc44', 'of44'], { move: 'whip', fill: 0.84, sy: 480, pose: 'point' }); sf('@P044-0.3', 'swoosh_2', -11, 0.5); sf('@P044:five', 'clock_ticking_1', -12, 2.0);
bt('@P044:walks', 'graphic-hero', ['of44', 'w44'], { fill: 0.86, sy: 480, pose: 'shock' }); sf('@P044:walks', 'door_swing_1', -10, 1.0); sf('@P044:walks+0.3', 'footsteps_1', -10, 1.2);
bt('@P045:arrested', 'zoom-on-number', 'w44', { fill: 0.3, maxH: 760, sy: 520, pose: 'shock' }); sf('@P045:arrested', 'handcuff_click_1', -6, 0.6); sf('@P045:arrested+0.05', 'rubber_stamp_2', -5, 0.5); sk('@P045:arrested', 10);
// P046 Antwerp court 2005: the planner
el('gv46', 'tile', R2(17) - 400, 20, '@P046-0.2', { icon: 'gavel', caption: 'ANTWERP COURT', cap: 32, w: 380, h: 420, iconS: 210, tilt: -0.02 }, { out: '@P047-0.2' });
el('dc46', 'datecard', R2(17) + 160, -300, '@P046-0.2', { big: '2005', small: 'THE PLANNER' }, { out: '@P047-0.2' });
con('d46', 'dealer', R2(17) + 280, 90, '@P046:planner-0.3', { w: 360, variant: 'card', stamps: [{ text: 'THE PLANNER', at: '@P046:planner', tone: 'bad', size: 54, rot: -0.1, y: 30 }] }, { out: '@P047-0.2' });
bt('@P046', 'graphic-hero', ['gv46', 'dc46', 'd46'], { move: 'whip', fill: 0.86, sy: 480, pose: 'point' }); sf('@P046-0.3', 'swoosh_2', -11, 0.5); sf('@P046:court', 'gavel_1', -7, 0.8);
bt('@P046:planner', 'zoom-on-number', 'd46', { fill: 0.26, maxH: 760, sx: 1150, sy: 520, pose: 'chin' }); sf('@P046:planner', 'rubber_stamp_2', -6, 0.5);
// P047 sentenced to 10 years
el('j47', 'jail', R2(18), 40, '@P047-0.3', { w: 1000, h: 700, dropAt: '@P047:sentenced', plaqueAt: '@P047:10-0.15', head: 'THE PLANNER', lines: [{ t: '10 YEARS', at: '@P047:10', size: 130 }] }, { out: '@P048-0.2' });
bt('@P047', 'graphic-hero', 'j47', { move: 'whip', fill: 0.62, maxH: 820, sy: 500, pose: 'point' }); sf('@P047-0.3', 'swoosh_2', -11, 0.5); sf('@P047:sentenced', 'cell_door_1', -9, 1.0);
bt('@P047:10', 'zoom-on-number', 'j47', { fill: 0.54, maxH: 620, sy: 520, pose: 'shock' }); sf('@P047:10', 'rubber_stamp_2', -6, 0.5);
// P048 three crew, five years each; P049 diamonds never found
for (let i = 0; i < 3; i++) el('cw48' + i, 'tile', R2(19) + (i - 1) * 380 - 200, 40, `@P048:three+${(i * 0.18).toFixed(2)}`, { icon: 'cuffs', caption: '5 YEARS', cap: 44, w: 330, h: 380, iconS: 190, tilt: (i - 1) * 0.03 }, { out: '@P049-0.2' });
bt('@P048', 'graphic-hero', ['cw480', 'cw482'], { move: 'whip', fill: 0.84, sy: 480, pose: 'point' }); sf('@P048-0.3', 'swoosh_2', -11, 0.5); for (let i = 0; i < 3; i++) sf(`@P048:three+${(i * 0.18).toFixed(2)}`, 'pop_2', -9, 0.3);
bt('@P048:five', 'zoom-on-number', ['cw480', 'cw482'], { fill: 0.9, maxH: 520, sy: 480, pose: 'shock' });
pr('dm49', 'coins100', R2(20), 40, '@P049:diamonds-0.3', { w: 1100, h: 440, a: '@P049:diamonds', lit: [3, 17, 24, 41, 58, 66, 73, 90], shape: 'gem', b: '@P049:most' }, { out: '@P050-0.2' });
el('nv49', 'stamp', R2(20) + 380, -280, '@P049:never', { text: 'MOST NEVER FOUND', tone: 'bad', size: 74 }, { rot: -0.05, out: '@P050-0.2' });
bt('@P049', 'graphic-hero', ['dm49'], { move: 'whip', fill: 0.7, maxH: 620, sy: 500, pose: 'chin' }); sf('@P049-0.3', 'swoosh_2', -11, 0.5);
bt('@P049:never', 'graphic-hero', ['dm49', 'nv49'], { fill: 0.8, sy: 480, pose: 'shrug' }); sf('@P049:never', 'rubber_stamp_2', -7, 0.5);
// P050 $100M next to the sandwich; the scale tips toward the sandwich; tray slot 2
pr('sc50', 'scale', R2(21), 20, '@P050-0.3', { w: 1000, h: 560, a: '@P050:trash', dir: 1, l: { icon: 'cash', label: '$100 MILLION', size: 32 }, r: { icon: 'sandwich', label: 'HIS OWN TRASH', size: 32 } }, { out: '@P051-0.2' });
bt('@P050', 'graphic-hero', 'sc50', { move: 'whip', fill: 0.62, maxH: 860, sy: 500, pose: 'point' }); sf('@P050-0.3', 'swoosh_2', -11, 0.5);
bt('@P050:trash', 'zoom-on-number', 'sc50', { fill: 0.7, maxH: 640, sy: 500, pose: 'shock' }); sf('@P050:trash', 'thud_2', -7, 0.8); sk('@P050:trash', 8);
