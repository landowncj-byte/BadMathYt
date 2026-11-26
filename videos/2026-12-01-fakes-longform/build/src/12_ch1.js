// ---------------- CH1 · THE MONA LISA THIEF (P08-P25) — Paris navy-gold room, Peruggia ----------------
const R1 = k => K(RM[1], k);
const MONA = 'brand/photos/mona-lisa-painting/1.jpg';
// P08 chapter card + case file
el('ch1', 'headline', R1(0) - 400, 40, '@P08-0.3', { kicker: 'CHAPTER ONE', lines: ['THE MONA', [['LISA ', 'paper'], ['THIEF', 'bad']]], size: 150, underAt: 1.0 }, { out: '@P09-0.2' });
con('p1', 'per', R1(0) + 560, 50, '@P08-0.2', { w: 440, variant: 'card', file: true, caseNo: 'CASE Nº 1', push: { at: '@P08', to: 1.12, dur: 3 } }, { out: '@P09-0.2' });
bt('@P08', 'graphic-hero', ['ch1', 'p1'], { move: 'whip', dur0: 0.7, fill: 0.84, sy: 480, pose: 'shrug', arc: 0.2 }); sf('@P08-0.6', 'tape_stop_1', -8, 1.0); sf('@P08-0.1', 'cinematic_hit_1', -9, 1.5); sf('@P08+0.9', 'camera_flash_1', -9, 0.6); sk('@P08+0.7', 8);
bt('@P08:thief', 'zoom-on-number', 'p1', { fill: 0.3, maxH: 760, sy: 520, pose: 'point' });
// P09 Paris, Monday, August 21st 1911; the Louvre is closed
el('dc9', 'datecard', R1(1) - 560, -320, '@P09-0.2', { big: '1911', small: 'PARIS · MONDAY' }, { out: '@P10-0.2' });
el('cal9', 'calendar', R1(1) - 200, 60, '@P09-0.3', { head: 'AUGUST 1911', band: 'navy', pages: [{ at: '@P09:monday', text: 'MON', tone: 'ink' }, { at: '@P09:21st', text: '21', tone: 'bad' }], size: 220 }, { out: '@P10-0.2' });
el('sg9', 'card', R1(1) + 520, 40, '@P09:louvre-0.3', { w: 560, h: 320, lines: [{ t: 'LOUVRE MUSEUM', size: 50, font: 'hero', at: '@P09:louvre' }, { t: 'CLOSED', size: 110, font: 'hero', tone: 'bad', at: '@P09:closed' }], pad: 100 }, { out: '@P10-0.2' });
bt('@P09', 'graphic-hero', ['dc9', 'cal9'], { move: 'whip', fill: 0.62, sy: 500, pose: 'point' }); sf('@P09-0.3', 'swoosh_2', -11, 0.5);
bt('@P09:21st', 'zoom-on-number', 'cal9.value', { fill: 0.34, maxH: 440, sy: 500 }); sf('@P09:21st', 'paper_slam_2', -10, 0.5);
bt('@P09:louvre', 'graphic-hero', ['cal9', 'sg9'], { fill: 0.84, sy: 500, pose: 'chin' });
bt('@P09:closed', 'zoom-on-number', 'sg9', { fill: 0.34, maxH: 360, sy: 500, pose: 'shock' }); sf('@P09:closed', 'rubber_stamp_2', -6, 0.5);
// P10 the pitch: who he was
con('p10', 'per', R1(2) - 150, 40, '@P10-0.3', { w: 900, variant: 'side', quote: ['ITALIAN.', 'EX-LOUVRE', 'WORKER.'], quoteSub: 'HE KNEW THE BUILDING', quoteSize: 74, quoteAt: '@P10:italian', noquote: true, aspect: 0.66, pw: 400 }, { out: '@P11-0.2' });
el('bd10', 'tile', R1(2) + 700, 40, '@P10:used-0.2', { icon: 'badge', caption: 'WORKED THERE', w: 300, h: 340, iconS: 170, tilt: 0.03 }, { out: '@P11-0.2' });
bt('@P10', 'graphic-hero', ['p10'], { move: 'whip', fill: 0.56, maxH: 800, sy: 500, pose: 'point' }); sf('@P10-0.3', 'swoosh_2', -11, 0.5); sf('@P10-0.1', 'camera_flash_1', -10, 0.6);
bt('@P10:italian', 'zoom-on-number', 'p10', { fill: 0.5, maxH: 740, sy: 500 }); sf('@P10:italian', 'typewriter_2', -11, 1.0);
bt('@P10:used', 'graphic-hero', ['p10', 'bd10'], { fill: 0.84, sy: 500, pose: 'point' }); sf('@P10:used', 'pop_2', -9, 0.3);
// P11 the trick: takes it off the wall
el('w11', 'wall', R1(3) - 200, 40, '@P11-0.3', { w: 820, h: 760, src: MONA, goneAt: '@P11:off', hooksAt: 99999, label: 'GONE', labelAt: '@P11:walks' }, { out: '@P12-0.2' });
con('p11', 'per', R1(3) + 520, 380, '@P11:takes-0.2', { w: 260, variant: 'pip', label: 'HE DID THIS', flash: false, arrow: { at: '@P11:off', to: [-250, -220] } }, { out: '@P12-0.2' });
bt('@P11', 'graphic-hero', ['w11'], { move: 'whip', fill: 0.4, maxH: 800, sy: 500, pose: 'point' }); sf('@P11-0.3', 'swoosh_2', -11, 0.5);
bt('@P11:off', 'zoom-on-number', 'w11', { fill: 0.42, maxH: 800, sy: 500, pose: 'shock' }); sf('@P11:off', 'paper_rustle_2', -8, 0.8); sf('@P11:off+0.2', 'thud_1', -10, 0.6);
bt('@P11:walks', 'graphic-hero', ['w11', 'p11'], { fill: 0.78, sy: 500, pose: 'point' }); sf('@P11:walks', 'footsteps_1', -10, 1.4);
// P12 how long until anyone noticed? a whole day
el('q12', 'text', R1(4) - 480, 0, '@P12-0.3', { lines: [[['?', 'accent']]], size: 480 }, { out: '@P13-0.2' });
el('c12', 'counter', R1(4) + 220, 20, '@P12:whole-0.3', { label: 'UNTIL ANYONE NOTICED', to: 1, suffix: ' WHOLE DAY', at: '@P12:whole', dur: 0.5, tone: 'bad', size: 140, w: 1000 }, { out: '@P13-0.2' });
bt('@P12', 'graphic-hero', ['q12', 'c12'], { move: 'whip', fill: 0.84, sy: 480, pose: 'chin' }); sf('@P12-0.3', 'swoosh_2', -11, 0.5); sf('@P12:long', 'clock_ticking_1', -11, 2.0);
bt('@P12:whole', 'zoom-on-number', 'c12.value', { fill: 0.46, maxH: 400, sy: 500, pose: 'shock' }); sf('@P12:whole', 'pop_2', -8, 0.4); sf('@P12:day', 'wrong_buzzer_2', -12, 0.6);
// P13 four empty hooks
el('dc13', 'datecard', R1(5) - 640, -330, '@P13-0.2', { big: 'DAY 2', small: 'A PAINTER NOTICES' }, { out: '@P14-0.2' });
el('w13', 'wall', R1(5) + 60, 40, '@P13-0.3', { w: 820, h: 760, src: MONA, goneAt: -9, hooksAt: '@P13:four', label: 'FOUR EMPTY HOOKS', labelAt: '@P13:hooks' }, { out: '@P14-0.2' });
bt('@P13', 'graphic-hero', ['dc13', 'w13'], { move: 'whip', fill: 0.72, sy: 500, pose: 'point' }); sf('@P13-0.3', 'swoosh_2', -11, 0.5);
bt('@P13:four', 'zoom-on-number', 'w13.hooks', { fill: 0.46, maxH: 700, sy: 480, pose: 'shock' }); for (let i = 0; i < 4; i++) sf(`@P13:four+${(i * 0.35).toFixed(2)}`, 'pop_2', -8, 0.3);
bt('@P13:hooks', 'graphic-hero', ['w13'], { fill: 0.5, maxH: 860, sy: 500, pose: 'point' }); sf('@P13:hooks', 'rubber_stamp_2', -6, 0.5);
// P14 shut for a week; newspapers; crowds line up to stare at the blank spot
el('nw14', 'news', R1(6) - 520, 20, '@P14-0.3', { w: 700, h: 520, head: 'EXTRA!', lines: ['LOUVRE SHUT', 'FOR A WEEK', 'THE EMPTY WALL'] }, { out: '@P15-0.2' });
el('qu14', 'queue', R1(6) + 520, 40, '@P14:crowds-0.3', { w: 1100, h: 480, n: 8, door: 'THE BLANK SPOT', capsAt: 99999 }, { out: '@P15-0.2' });
bt('@P14', 'graphic-hero', ['nw14'], { move: 'whip', fill: 0.4, maxH: 700, sy: 500, pose: 'point' }); sf('@P14-0.3', 'swoosh_2', -11, 0.5);
bt('@P14:week', 'zoom-on-number', 'nw14', { fill: 0.42, maxH: 700, sy: 500, pose: 'shock' }); sf('@P14:week', 'paper_slam_2', -10, 0.5);
bt('@P14:newspapers', 'graphic-hero', ['nw14', 'qu14'], { fill: 0.88, sy: 500, pose: 'point' }); sf('@P14:newspapers', 'page_turn_1', -9, 0.8);
bt('@P14:crowds', 'graphic-hero', ['qu14'], { fill: 0.55, maxH: 520, sy: 500, pose: 'chin' }); sf('@P14:crowds', 'crowd_murmur_auction_1', -16, 3.5);
bt('@P14:blank', 'zoom-on-number', 'qu14.door', { fill: 0.3, maxH: 480, sy: 480 });
// P15 and then nothing for over two years
el('n15', 'text', R1(7) - 520, -40, '@P15:nothing-0.3', { lines: [[['NOTHING.', 'bad']]], size: 230 }, { enter: 'slam', out: '@P16-0.2' });
el('cal15', 'calendar', R1(7) + 460, 40, '@P15:months-0.2', { head: 'SINCE THE THEFT', band: 'bad', roll: { from: 1911, to: 1913, at: '@P15:two', dur: 1.6 }, sub: 'OVER 2 YEARS · NOBODY FINDS IT', subAt: '@P15:finds', size: 220, w: 760, h: 520 }, { out: '@P16-0.2' });
bt('@P15', 'graphic-hero', ['n15'], { move: 'whip', fill: 0.5, maxH: 520, sy: 480, pose: 'chin' }); sf('@P15-0.3', 'swoosh_2', -11, 0.5); sf('@P15:nothing', 'deep_boom_2', -8, 1.0);
bt('@P15:weeks', 'graphic-hero', ['n15', 'cal15'], { fill: 0.9, sy: 480, pose: 'shrug' });
bt('@P15:two', 'zoom-on-number', 'cal15.value', { fill: 0.34, maxH: 440, sy: 500, pose: 'shock' }); sf('@P15:two', 'money_counter_1', -13, 1.6);
bt('@P15:finds', 'graphic-hero', ['n15', 'cal15'], { fill: 0.9, sy: 480, pose: 'chin' });
// P16 the reveal: it was in his apartment
el('ap16', 'photo', R1(8) - 340, 40, '@P16-0.3', { src: MONA, name: 'THE MONA LISA', role: 'IN HIS SMALL PARIS APARTMENT', credit: 'PUBLIC-DOMAIN REPRODUCTION', treatment: 'paper', fx: 0.5, fy: 0.3, w: 520, aspect: 1.3, tilt: -0.03 }, { out: '@P17-0.2' });
con('p16', 'per', R1(8) + 460, 60, '@P16:peruggia\'s-0.2', { w: 400, variant: 'card', flash: false, ring: '@P16:apartment', push: { at: '@P16:peruggia\'s', to: 1.2, dur: 3 } }, { out: '@P17-0.2' });
bt('@P16', 'graphic-hero', ['ap16'], { move: 'whip', fill: 0.34, maxH: 780, sy: 450, pose: 'shock' }); sf('@P16-0.3', 'swoosh_2', -11, 0.5); sf('@P16:most', 'heartbeat_1', -10, 2.5);
bt('@P16:peruggia\'s', 'graphic-hero', ['ap16', 'p16'], { fill: 0.82, sy: 500, pose: 'point' }); sf('@P16:peruggia\'s', 'camera_flash_1', -10, 0.6);
bt('@P16:apartment', 'zoom-on-number', 'p16', { fill: 0.3, maxH: 760, sy: 520, pose: 'shock' }); sf('@P16:apartment', 'rubber_stamp_2', -5, 0.5);
// P17 the catch: he catches himself
el('h17', 'headline', R1(9) - 480, -230, '@P17-0.3', { kicker: 'THE CATCH', lines: [[['HE CATCHES', 'paper']], [['HIMSELF.', 'bad']]], size: 150, underAt: 1.0 }, { out: '@P18-0.2' });
con('p17', 'per', R1(9) + 600, 20, '@P17-0.3', { w: 400, variant: 'card', ring: '@P17:catches', push: { at: '@P17', to: 1.25, dur: 3 }, flash: false }, { out: '@P18-0.2' });
bt('@P17', 'graphic-hero', ['h17', 'p17'], { move: 'whip', fill: 0.86, sy: 480, pose: 'chin' }); sf('@P17-0.3', 'swoosh_2', -11, 0.5);
bt('@P17:trail', 'graphic-hero', ['h17', 'p17'], { fill: 0.9, sy: 480, pose: 'shrug' });
bt('@P17:catches', 'zoom-on-number', 'h17', { fill: 0.4, maxH: 520, sy: 380, pose: 'shock' }); sf('@P17:catches', 'rubber_stamp_2', -5, 0.5); sk('@P17:catches', 10);
// P18 letter to the Florence dealer Alfredo Geri
el('dc18', 'datecard', R1(10) - 700, -330, '@P18-0.2', { big: '1913', small: 'FLORENCE, ITALY' }, { out: '@P19-0.2' });
el('m18', 'memo', R1(10) + 100, 20, '@P18-0.3', { w: 700, h: 820, to: 'ALFREDO GERI · ART DEALER', date: '1913', title: ['THE MONA LISA', 'IS FOR SALE'], titleAt: '@P18:letter' }, { out: '@P19-0.2' });
bt('@P18', 'graphic-hero', ['dc18', 'm18'], { move: 'whip', fill: 0.6, maxH: 760, sy: 450, pose: 'point' }); sf('@P18-0.3', 'swoosh_2', -11, 0.5); sf('@P18:letter', 'pen_scratch_1', -10, 1.5);
bt('@P18:letter', 'zoom-on-number', 'm18', { fill: 0.4, maxH: 740, sy: 450 }); sf('@P18:letter', 'paper_slam_2', -10, 0.5);
bt('@P18:dealer', 'graphic-hero', ['dc18', 'm18'], { fill: 0.7, maxH: 760, sy: 450, pose: 'chin' });
bt('@P18:geri', 'zoom-on-number', 'm18', { fill: 0.4, maxH: 800, sy: 500, pose: 'point' });
// P19 500,000 lire; the painting should go home to Italy
con('p19', 'per', R1(11) - 560, 80, '@P19-0.3', { w: 330, variant: 'card', flash: false, credit: '' }, { out: '@P20-0.2' });
el('c19', 'counter', R1(11) + 150, -130, '@P19:500-0.2', { label: 'HIS PRICE', to: 500000, suffix: ' LIRE', at: '@P19:500', dur: 1.2, tone: 'bad', size: 150, w: 900 }, { out: '@P20-0.2' });
el('h19', 'stamp', R1(11) + 150, 180, '@P19:home-0.1', { text: 'IT SHOULD GO HOME TO ITALY', tone: 'accent', size: 54 }, { rot: -0.03, out: '@P20-0.2' });
bt('@P19', 'graphic-hero', ['p19', 'c19'], { move: 'whip', fill: 0.8, sy: 490, pose: 'point' }); sf('@P19-0.3', 'swoosh_2', -11, 0.5);
bt('@P19:500', 'zoom-on-number', 'c19.value', { fill: 0.5, maxH: 420, sy: 480 }); sf('@P19:500', 'money_counter_2', -12, 1.4); sf('@P19:lire', 'cash_register_1', -10, 0.9);
bt('@P19:home', 'graphic-hero', ['p19', 'c19', 'h19'], { fill: 0.84, sy: 500, pose: 'chin' }); sf('@P19:home', 'rubber_stamp_2', -6, 0.5);
// P20 Geri brings in the expert: Giovanni Poggi, director of the Uffizi
el('ge20', 'card', R1(12) - 440, 40, '@P20-0.3', { w: 520, h: 300, lines: [{ t: 'ALFREDO GERI', size: 52, font: 'hero', at: '@P20:geri' }, { t: 'ART DEALER · FLORENCE', size: 24, font: 'mono', tone: 'inkSoft', at: '@P20:geri+0.1' }], pad: 100 }, { out: '@P21-0.2' });
el('po20', 'card', R1(12) + 280, 40, '@P20:expert-0.3', { w: 640, h: 380, lines: [{ t: 'THE EXPERT', size: 26, gap: 54, font: 'mono', tone: 'bad', at: '@P20:expert' }, { t: 'GIOVANNI POGGI', size: 62, font: 'hero', at: '@P20:expert+0.1' }, { t: 'DIRECTOR · UFFIZI GALLERY', size: 28, font: 'mono', tone: 'inkSoft', at: '@P20:uffizi' }], pad: 90 }, { out: '@P21-0.2' });
bt('@P20', 'graphic-hero', ['ge20'], { move: 'whip', fill: 0.3, maxH: 520, sy: 500, pose: 'point' }); sf('@P20-0.3', 'swoosh_2', -11, 0.5);
bt('@P20:expert', 'graphic-hero', ['ge20', 'po20'], { fill: 0.84, sy: 500, pose: 'point' }); sf('@P20:expert', 'pop_2', -9, 0.3);
bt('@P20:uffizi', 'zoom-on-number', 'po20', { fill: 0.38, maxH: 520, sy: 500, pose: 'chin' });
// P21 hotel meeting; looked closely; it is the real one
con('p21', 'per', R1(13) - 600, 60, '@P21-0.3', { w: 380, variant: 'card', flash: false, credit: '' }, { out: '@P22-0.2' });
el('ht21', 'tile', R1(13) - 150, -240, '@P21:hotel-0.3', { icon: 'index', caption: 'HIS HOTEL', w: 260, h: 290, iconS: 140, tilt: -0.03 }, { out: '@P22-0.2' });
el('ph21', 'photo', R1(13) + 400, 40, '@P21:painting-0.2', { src: MONA, name: 'THE PAINTING', role: 'EXAMINED CLOSELY', credit: 'PUBLIC-DOMAIN REPRODUCTION', fx: 0.5, fy: 0.3, w: 460, aspect: 1.3, tilt: 0.03 }, { out: '@P22-0.2' });
el('st21', 'stamp', R1(13) + 400, 120, '@P21:real-0.1', { text: 'THE REAL ONE', tone: 'good', size: 88 }, { rot: -0.06, out: '@P22-0.2' });
bt('@P21', 'graphic-hero', ['p21', 'ht21'], { move: 'whip', fill: 0.62, sy: 500, pose: 'point' }); sf('@P21-0.3', 'swoosh_2', -11, 0.5);
bt('@P21:look', 'graphic-hero', ['p21', 'ph21'], { fill: 0.82, sy: 500, pose: 'chin' }); sf('@P21:look', 'camera_flash_1', -10, 0.6);
bt('@P21:real', 'zoom-on-number', ['ph21', 'st21'], { fill: 0.36, maxH: 800, sy: 520, pose: 'shock' }); sf('@P21:real', 'rubber_stamp_2', -5, 0.5); sf('@P21:real', 'ding_2', -10, 0.7); sk('@P21:real', 10);
// P22 "we'll take it to be checked", then arrested at his hotel mid-December 1913
con('p22', 'per', R1(14) - 300, 40, '@P22:police-0.4', { w: 420, variant: 'card', flash: false, credit: '', stamps: [{ text: 'ARRESTED', at: '@P22:arrest', tone: 'bad', size: 74, rot: -0.1, y: 40 }] }, { out: '@P23-0.2' });
el('dc22', 'datecard', R1(14) + 460, -330, '@P22:december-0.3', { big: 'DEC 1913', small: 'AT HIS HOTEL' }, { out: '@P23-0.2' });
el('cf22', 'tile', R1(14) + 540, 100, '@P22:arrest-0.2', { icon: 'cuffs', caption: 'POLICE', w: 280, h: 310, iconS: 160 }, { out: '@P23-0.2' });
bt('@P22', 'graphic-hero', ['p22'], { move: 'whip', fill: 0.3, maxH: 760, sy: 500, pose: 'chin' }); sf('@P22-0.3', 'swoosh_2', -11, 0.5);
bt('@P22:december', 'graphic-hero', ['p22', 'dc22'], { fill: 0.84, sy: 480, pose: 'point' });
bt('@P22:arrest', 'zoom-on-number', 'p22', { fill: 0.3, maxH: 760, sy: 520, pose: 'shock' }); sf('@P22:arrest', 'handcuff_click_1', -6, 0.8); sf('@P22:arrest', 'rubber_stamp_2', -6, 0.5); sk('@P22:arrest', 12);
// P23 verdict: one year and 15 days; for Italy; served less than a year
con('p23', 'per', R1(15) - 520, 40, '@P23-0.3', { w: 420, variant: 'card', bars: '@P23:sentenced', stamps: [{ text: 'FLORENCE 1914', at: '@P23:court', tone: 'bad', size: 50, rot: -0.1, y: 60 }], push: { at: '@P23', to: 1.2, dur: 5 }, flash: false }, { out: '@P24-0.2' });
el('y23', 'counter', R1(15) + 260, -130, '@P23:one-0.2', { label: 'SENTENCED TO', to: 1, suffix: ' YEAR + 15 DAYS', at: '@P23:one', dur: 0.6, tone: 'bad', size: 110, w: 1000 }, { out: '@P24-0.2' });
el('i23', 'text', R1(15) + 260, 120, '@P23:said-0.1', { lines: [[['“I DID IT FOR ', 'paper'], ['ITALY', 'good'], ['”', 'paper']]], size: 76 }, { out: '@P24-0.2' });
el('s23', 'stamp', R1(15) + 260, 280, '@P23:less-0.1', { text: 'SERVED: LESS THAN A YEAR', tone: 'accent', size: 58 }, { rot: -0.03, out: '@P24-0.2' });
bt('@P23', 'graphic-hero', ['p23', 'y23'], { move: 'whip', fill: 0.8, sy: 490, pose: 'point' }); sf('@P23-0.3', 'swoosh_2', -11, 0.5);
bt('@P23:court', 'zoom-on-number', 'p23', { fill: 0.28, maxH: 760, sy: 500, pose: 'shock' }); sf('@P23:court', 'gavel_1', -5, 0.8); sf('@P23:sentenced-0.1', 'cell_door_1', -7, 1.2); sk('@P23:court', 10);
bt('@P23:one', 'zoom-on-number', 'y23.value', { fill: 0.42, maxH: 400, sy: 480 }); sf('@P23:one', 'deep_boom_1', -7, 1.0);
bt('@P23:said', 'graphic-hero', ['p23', 'y23', 'i23'], { fill: 0.84, sy: 500, pose: 'chin' });
bt('@P23:ended', 'graphic-hero', ['p23', 'i23', 's23'], { fill: 0.86, sy: 500, pose: 'shrug' }); sf('@P23:less', 'rubber_stamp_2', -6, 0.5);
// P24 famous -> the most famous
el('a24', 'photo', R1(16) - 460, 60, '@P24-0.3', { src: MONA, name: 'BEFORE THE THEFT', role: 'FAMOUS', credit: 'PUBLIC-DOMAIN REPRODUCTION', fx: 0.5, fy: 0.3, w: 340, aspect: 1.3, tilt: -0.03 }, { out: '@P25-0.2' });
el('b24', 'photo', R1(16) + 330, 20, '@P24:after-0.3', { src: MONA, name: 'AFTER THE THEFT', role: 'THE MOST FAMOUS PAINTING', credit: 'PUBLIC-DOMAIN REPRODUCTION', fx: 0.5, fy: 0.3, w: 560, aspect: 1.3, tilt: 0.03 }, { out: '@P25-0.2' });
el('ar24', 'icon', R1(16) - 60, 60, '@P24:after-0.1', { kind: 'chart', s: 200, col: 'accent' }, { out: '@P25-0.2' });
bt('@P24', 'graphic-hero', ['a24'], { move: 'whip', fill: 0.26, maxH: 800, sy: 500, pose: 'chin' }); sf('@P24-0.3', 'swoosh_2', -11, 0.5);
bt('@P24:before', 'graphic-hero', ['a24'], { fill: 0.3, maxH: 800, sy: 500, pose: 'point' });
bt('@P24:after', 'graphic-hero', ['a24', 'b24', 'ar24'], { fill: 0.9, sy: 500, pose: 'point' }); sf('@P24:after', 'pop_2', -9, 0.3);
bt('@P24:most', 'zoom-on-number', 'b24', { fill: 0.34, maxH: 800, sy: 470, pose: 'shock' }); sf('@P24:most', 'camera_flash_1', -9, 0.6); sk('@P24:most', 8);
// P25 LIKE moment
el('heart', 'heart', 1620, 760, '@P25:like-0.15', { s: 64 }, { layer: 'screen', out: '@P25:like+1.5' });
sf('@P25:like-0.1', 'pop_2', -8, 0.3); sf('@P25:like+0.35', 'ding_2', -11, 0.7);
el('lk25', 'stamp', R1(17), 40, '@P25-0.3', { text: 'CAUGHT BY HIS OWN LETTER', tone: 'good', size: 100 }, { rot: -0.03, out: '@P26-0.2' });
bt('@P25', 'graphic-hero', 'lk25', { move: 'whip', fill: 0.6, sy: 500, pose: 'shock' }); sf('@P25-0.3', 'swoosh_2', -11, 0.5);
bt('@P25:letter', 'graphic-hero', 'lk25', { fill: 0.7, sy: 500, pose: 'point' });
