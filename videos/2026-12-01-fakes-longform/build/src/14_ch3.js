// ---------------- CH3 · THE FAKE DIARIES (P46-P60) — violet-ink room, Kujau. NO Hitler image, NO symbols: plain black notebooks, F H initials ----------------
const R3 = k => K(RM[3], k);
// P46 chapter card + case file
el('ch3', 'headline', R3(0) - 400, 40, '@P46-0.3', { kicker: 'CHAPTER THREE', lines: ['THE FAKE', [['DIARIES', 'bad']]], size: 150, underAt: 1.0 }, { out: '@P47-0.2' });
con('u1', 'kuj', R3(0) + 560, 50, '@P46-0.2', { w: 380, variant: 'card', file: true, caseNo: 'CASE Nº 3', push: { at: '@P46', to: 1.1, dur: 3 } }, { out: '@P47-0.2' });
bt('@P46', 'graphic-hero', ['ch3', 'u1'], { move: 'whip', dur0: 0.7, fill: 0.84, sy: 480, pose: 'shrug', arc: 0.2 }); sf('@P46-0.6', 'tape_stop_1', -8, 1.0); sf('@P46-0.1', 'cinematic_hit_1', -9, 1.5); sf('@P46+0.9', 'camera_flash_1', -9, 0.6); sk('@P46+0.7', 8);
bt('@P46:diaries', 'zoom-on-number', 'u1', { fill: 0.26, maxH: 700, sy: 520, pose: 'point' });
// P47 the pitch: a souvenir seller in Stuttgart
el('dc47', 'datecard', R3(1) - 760, -330, '@P47-0.2', { big: '1980s', small: 'WEST GERMANY' }, { out: '@P48-0.2' });
con('u47', 'kuj', R3(1) - 150, 40, '@P47-0.3', { w: 880, variant: 'side', quote: ['SELLS OLD', 'SOUVENIRS', 'IN STUTTGART.'], quoteSize: 62, quoteAt: '@P47:konrad', noquote: true, aspect: 0.66, pw: 390 }, { out: '@P48-0.2' });
el('t47', 'tile', R3(1) + 700, 40, '@P47:souvenirs-0.3', { icon: 'labels', caption: 'OLD SOUVENIRS', cap: 28, w: 300, h: 340, iconS: 170, tilt: 0.03 }, { out: '@P48-0.2' });
bt('@P47', 'graphic-hero', ['dc47', 'u47'], { move: 'whip', fill: 0.62, sy: 500, pose: 'point' }); sf('@P47-0.3', 'swoosh_2', -11, 0.5); sf('@P47-0.1', 'camera_flash_1', -10, 0.6);
bt('@P47:konrad', 'zoom-on-number', 'u47', { fill: 0.5, maxH: 740, sy: 500 }); sf('@P47:konrad', 'typewriter_2', -11, 1.2);
bt('@P47:souvenirs', 'graphic-hero', ['u47', 't47'], { fill: 0.84, sy: 500, pose: 'chin' }); sf('@P47:souvenirs', 'pop_2', -9, 0.3);
// P48 the trick: dozens of hand-written notebooks, claimed to be secret diaries
el('nb48', 'notebook', R3(2) - 150, 20, '@P48:notebooks-0.3', { w: 600, h: 720, n: 6, lettersAt: 99999, count: 'DOZENS · BY HAND' }, { out: '@P49-0.2' });
el('c48', 'card', R3(2) + 560, -60, '@P48:claims-0.3', { w: 560, h: 330, lines: [{ t: 'HE CLAIMS', size: 28, gap: 54, font: 'mono', tone: 'bad', at: '@P48:claims' }, { t: 'SECRET DIARIES', size: 68, font: 'hero', at: '@P48:secret-0.2' }, { t: 'NOT REAL · SHOWN AS THE FAKE', size: 22, font: 'mono', tone: 'inkSoft', at: '@P48:secret' }], pad: 90 }, { out: '@P49-0.2' });
con('u48', 'kuj', R3(2) + 560, 300, '@P48:writing-0.3', { w: 250, variant: 'pip', label: 'HE WROTE THEM', flash: false, arrow: { at: '@P48:by', to: [-370, -140] } }, { out: '@P49-0.2' });
bt('@P48', 'graphic-hero', ['nb48', 'c48'], { move: 'whip', fill: 0.84, sy: 500, pose: 'point' }); sf('@P48-0.3', 'swoosh_2', -11, 0.5);
bt('@P48:notebooks', 'zoom-on-number', 'nb48', { fill: 0.4, maxH: 900, sy: 500, pose: 'shock' }); sf('@P48:notebooks', 'paper_slam_2', -10, 0.5); sf('@P48:by', 'pen_scratch_1', -10, 1.4);
bt('@P48:dozens', 'zoom-on-number', 'nb48', { fill: 0.44, maxH: 900, sy: 500, pose: 'point' });
bt('@P48:claims', 'graphic-hero', ['nb48', 'c48', 'u48'], { fill: 0.88, sy: 500, pose: 'chin' }); sf('@P48:claims', 'pop_2', -9, 0.3);
bt('@P48:secret', 'zoom-on-number', 'c48', { fill: 0.34, maxH: 520, sx: 1100, sy: 480, pose: 'shock' }); sf('@P48:secret', 'rubber_stamp_2', -7, 0.5);
// P49 sold under a fake name through a middleman
el('f49', 'flow', R3(3), 40, '@P49-0.3', { w: 1500, h: 360, items: [{ id: 'a', icon: 'person', label: 'KUJAU', tone: 'paper', at: '@P49:sells', size: 30 }, { id: 'b', icon: 'index', label: 'A FAKE NAME', tone: 'bad', at: '@P49:fake', size: 28 }, { id: 'c', icon: 'handshake', label: 'A MIDDLEMAN', tone: 'paper', at: '@P49:middleman', size: 28 }] }, { out: '@P50-0.2' });
con('u49', 'kuj', R3(3) - 700, 380, '@P49:sells-0.2', { w: 230, variant: 'pip', label: 'THE SELLER', flash: false }, { out: '@P50-0.2' });
bt('@P49', 'graphic-hero', ['f49'], { move: 'whip', fill: 0.8, sy: 500, pose: 'point' }); sf('@P49-0.3', 'swoosh_2', -11, 0.5);
bt('@P49:fake', 'zoom-on-number', 'f49.b', { fill: 0.24, maxH: 520, sy: 500, pose: 'chin' }); sf('@P49:fake', 'pop_2', -8, 0.4); sf('@P49:sells', 'pop_2', -9, 0.3);
bt('@P49:middleman', 'graphic-hero', ['f49', 'u49'], { fill: 0.9, sy: 500, pose: 'point' }); sf('@P49:middleman', 'pop_2', -9, 0.3);
// P50 Gerd Heidemann, a star reporter at Stern; he believes they are real
el('h50', 'card', R3(4) - 400, 20, '@P50:heidemann-0.3', { w: 640, h: 360, lines: [{ t: 'THE REPORTER', size: 26, gap: 54, font: 'mono', tone: 'bad', at: '@P50:end' }, { t: 'GERD HEIDEMANN', size: 66, font: 'hero', at: '@P50:gerd' }, { t: 'STAR REPORTER · STERN', size: 30, font: 'mono', tone: 'inkSoft', at: '@P50:star' }], pad: 90 }, { out: '@P51-0.2' });
el('n50', 'news', R3(4) + 440, 40, '@P50:magazines-0.6', { w: 620, h: 520, head: 'STERN', lines: ['ONE OF GERMANY\'S', 'BIGGEST MAGAZINES', 'THE DIARIES?'] }, { out: '@P51-0.2' });
el('b50', 'stamp', R3(4) - 100, 330, '@P50:believes-0.1', { text: 'HE BELIEVES THEY\'RE REAL', tone: 'accent', size: 52 }, { rot: -0.03, out: '@P51-0.2' });
bt('@P50', 'graphic-hero', ['h50'], { move: 'whip', fill: 0.4, maxH: 560, sy: 480, pose: 'point' }); sf('@P50-0.3', 'swoosh_2', -11, 0.5);
bt('@P50:star', 'zoom-on-number', 'h50', { fill: 0.42, maxH: 520, sy: 480, pose: 'chin' }); sf('@P50:star', 'paper_slam_2', -10, 0.5);
bt('@P50:magazines', 'graphic-hero', ['h50', 'n50'], { fill: 0.88, sy: 480, pose: 'point' }); sf('@P50:magazines', 'page_turn_1', -9, 0.8);
bt('@P50:believes', 'graphic-hero', ['h50', 'n50', 'b50'], { fill: 0.9, sy: 520, pose: 'shock' }); sf('@P50:believes', 'rubber_stamp_2', -7, 0.5);
// P51 his bosses pay about nine million marks
el('v51', 'victim', R3(5) - 560, 40, '@P51:bosses-0.3', { kind: 'investor', label: 'HIS BOSSES', sub: 'AT THE MAGAZINE', w: 360, h: 460, tape: 'THE MAGAZINE', reactAt: '@P51:nine' }, { out: '@P52-0.2' });
el('c51', 'counter', R3(5) + 250, -130, '@P51:paying-0.2', { label: 'THEY PAY ABOUT', sub: 'MARKS · WEST GERMANY\'S MONEY', to: 9, suffix: ' MILLION', at: '@P51:nine', dur: 1.0, tone: 'bad', size: 140, w: 1000 }, { out: '@P52-0.2' });
el('f51', 'stamp', R3(5) + 250, 230, '@P51:fortune-0.2', { text: 'A FORTUNE', tone: 'accent', size: 84 }, { rot: -0.04, out: '@P52-0.2' });
bt('@P51', 'graphic-hero', ['v51'], { move: 'whip', fill: 0.26, maxH: 700, sy: 500, pose: 'chin' }); sf('@P51-0.3', 'swoosh_2', -11, 0.5);
bt('@P51:paying', 'graphic-hero', ['v51', 'c51'], { fill: 0.86, sy: 490, pose: 'point' });
bt('@P51:nine', 'zoom-on-number', 'c51.value', { fill: 0.5, maxH: 420, sy: 480, pose: 'shock' }); sf('@P51:nine', 'money_counter_2', -12, 1.4); sk('@P51:million', 10);
bt('@P51:fortune', 'graphic-hero', ['c51', 'f51'], { fill: 0.72, sx: 1000, sy: 490, pose: 'chin' }); sf('@P51:fortune', 'rubber_stamp_2', -6, 0.5);
// P52 Heidemann secretly kept a big chunk
el('h52', 'card', R3(6) - 400, 20, '@P52-0.3', { w: 560, h: 280, lines: [{ t: 'GERD HEIDEMANN', size: 56, font: 'hero', at: '@P52:heidemann' }, { t: 'STAR REPORTER', size: 28, font: 'mono', tone: 'inkSoft', at: '@P52:heidemann' }], pad: 100 }, { out: '@P53-0.2' });
el('t52', 'tile', R3(6) + 260, 20, '@P52:secretly-0.3', { icon: 'cash', caption: 'A BIG CHUNK', cap: 30, w: 320, h: 360, iconS: 180, tilt: -0.03 }, { out: '@P53-0.2' });
el('k52', 'stamp', R3(6) + 260, 280, '@P52:himself-0.3', { text: 'KEPT FOR HIMSELF', tone: 'bad', size: 68 }, { rot: 0.03, out: '@P53-0.2' });
bt('@P52', 'graphic-hero', ['h52', 't52'], { move: 'whip', fill: 0.74, sy: 500, pose: 'point' }); sf('@P52-0.3', 'swoosh_2', -11, 0.5);
bt('@P52:secretly', 'zoom-on-number', 't52', { fill: 0.26, maxH: 520, sx: 1100, sy: 480, pose: 'shock' }); sf('@P52:secretly', 'coins_drop_1', -10, 1.0);
bt('@P52:himself', 'graphic-hero', ['h52', 't52', 'k52'], { fill: 0.8, sy: 510, pose: 'chin' }); sf('@P52:himself', 'rubber_stamp_2', -6, 0.5); sk('@P52:himself', 8);
// P53 April 1983: the magazine tells the whole world
el('dc53', 'datecard', R3(7) - 640, -330, '@P53-0.2', { big: 'APRIL 1983', small: 'THE MAGAZINE TELLS THE WORLD', w: 700 }, { out: '@P54-0.2' });
el('n53', 'news', R3(7) + 100, 40, '@P53-0.3', { w: 760, h: 560, head: 'STERN', lines: ['“SECRET DIARIES”', 'FOUND?', 'THE WHOLE WORLD IS TOLD'] }, { out: '@P54-0.2' });
bt('@P53', 'graphic-hero', ['dc53', 'n53'], { move: 'whip', fill: 0.7, sy: 500, pose: 'point' }); sf('@P53-0.3', 'swoosh_2', -11, 0.5); sf('@P53:magazine', 'paper_slam_2', -10, 0.5);
bt('@P53:world', 'zoom-on-number', 'n53', { fill: 0.42, maxH: 600, sy: 500, pose: 'shock' }); sf('@P53:world', 'crowd_ooh_1', -12, 1.5);
// P54 nobody checked the most obvious thing: the cover
el('nb54', 'notebook', R3(8) - 300, 20, '@P54-0.3', { w: 560, h: 700, n: 3, lettersAt: 99999 }, { out: '@P55-0.2' });
el('mg54', 'icon', R3(8) + 100, -150, '@P54:checked-0.3', { kind: 'magnifier', s: 300, col: 'paper' }, { out: '@P55-0.2' });
el('t54', 'text', R3(8) + 420, 220, '@P54:obvious-0.2', { lines: [[['NOBODY CHECKED', 'paper']], [['THE COVER', 'bad']]], size: 90 }, { out: '@P55-0.2' });
bt('@P54', 'graphic-hero', ['nb54'], { move: 'whip', fill: 0.34, maxH: 860, sy: 500, pose: 'chin' }); sf('@P54-0.3', 'swoosh_2', -11, 0.5);
bt('@P54:checked', 'graphic-hero', ['nb54', 'mg54'], { fill: 0.7, sy: 480, pose: 'point' }); sf('@P54:checked', 'pop_2', -9, 0.4);
bt('@P54:cover', 'graphic-hero', ['nb54', 'mg54', 't54'], { fill: 0.92, sy: 500, pose: 'shock' }); sf('@P54:cover', 'rubber_stamp_2', -6, 0.5); sk('@P54:cover', 8);
// P55 plastic letters from a shop: F and H
el('nb55', 'notebook', R3(9) - 200, 20, '@P55-0.3', { w: 640, h: 740, n: 4, lettersAt: '@P55:letters#2' }, { out: '@P56-0.2' });
el('s55', 'card', R3(9) + 560, -100, '@P55:plastic-0.3', { w: 520, h: 260, lines: [{ t: 'PLASTIC LETTERS', size: 50, font: 'hero', at: '@P55:plastic' }, { t: 'BOUGHT FROM A SHOP', size: 28, font: 'mono', tone: 'inkSoft', at: '@P55:shop' }], pad: 90 }, { out: '@P56-0.2' });
con('u55', 'kuj', R3(9) + 560, 270, '@P55:front-0.3', { w: 240, variant: 'pip', label: 'HIS COVER', flash: false, arrow: { at: '@P55:letters#2', to: [-400, -80] } }, { out: '@P56-0.2' });
bt('@P55', 'graphic-hero', ['nb55', 's55'], { move: 'whip', fill: 0.84, sy: 500, pose: 'point' }); sf('@P55-0.3', 'swoosh_2', -11, 0.5);
bt('@P55:plastic', 'graphic-hero', ['nb55', 's55', 'u55'], { fill: 0.92, sy: 500, pose: 'chin' }); sf('@P55:plastic', 'pop_2', -9, 0.3);
bt('@P55:letters#2', 'zoom-on-number', 'nb55.letters', { fill: 0.34, maxH: 460, sy: 500, pose: 'shock' }); sf('@P55:letters#2', 'pop_2', -7, 0.4); sf('@P55:letters#2+0.18', 'pop_2', -7, 0.4);
// P56 should have said A H (the catch)
el('nb56', 'notebook', R3(10) - 100, 20, '@P56-0.3', { w: 640, h: 740, n: 4, lettersAt: 0, ringAt: '@P56:name', shouldAt: '@P56:said' }, { out: '@P57-0.2' });
el('h56', 'headline', R3(10) - 800, -230, '@P56-0.3', { kicker: 'THE CATCH', lines: [[['WRONG', 'bad']], [['INITIALS', 'paper']]], size: 120, underAt: 0.9 }, { out: '@P57-0.2' });
bt('@P56', 'graphic-hero', ['nb56', 'h56'], { move: 'whip', fill: 0.86, sy: 500, pose: 'chin' }); sf('@P56-0.3', 'swoosh_2', -11, 0.5);
bt('@P56:name', 'zoom-on-number', 'nb56.letters', { fill: 0.34, maxH: 460, sy: 480, pose: 'shock' }); sf('@P56:name', 'rubber_stamp_2', -5, 0.5); sk('@P56:name', 10);
bt('@P56:said', 'graphic-hero', ['nb56'], { fill: 0.5, maxH: 800, sy: 470, pose: 'point' }); sf('@P56:said', 'ding_2', -9, 0.7);
// P57 national archives test: paper and ink both modern
el('d57', 'doc', R3(11) - 100, 40, '@P57-0.3', { title: 'NATIONAL ARCHIVES', sub: 'GERMANY · LAB TEST', w: 720, h: 700, skeleton: 2, band: 'navy', lines: [{ id: 'paper', t: 'PAPER: MODERN', at: '@P57:paper', tone: 'bad', mark: 'bad' }, { id: 'ink', t: 'INK: MODERN', at: '@P57:ink', tone: 'bad', mark: 'bad' }, { id: 'new', t: 'TOO NEW TO BE REAL', at: '@P57:new', tone: 'bad', big: true }] }, { out: '@P58-0.2' });
bt('@P57', 'graphic-hero', ['d57'], { move: 'whip', fill: 0.4, maxH: 920, sy: 500, pose: 'point' }); sf('@P57-0.3', 'swoosh_2', -11, 0.5);
bt('@P57:paper', 'zoom-on-number', 'd57.paper', { fill: 0.4, maxH: 300, sy: 480 }); sf('@P57:paper', 'typewriter_2', -11, 1.0);
bt('@P57:ink', 'zoom-on-number', 'd57.ink', { fill: 0.4, maxH: 300, sy: 480, pose: 'chin' }); sf('@P57:ink', 'typewriter_2', -11, 1.0);
bt('@P57:modern', 'graphic-hero', ['d57'], { fill: 0.4, maxH: 660, sy: 440, pose: 'shock' });
bt('@P57:new', 'zoom-on-number', 'd57.new', { fill: 0.42, maxH: 300, sy: 480, pose: 'shock' }); sf('@P57:new', 'rubber_stamp_2', -5, 0.5);
// P58 less than two weeks later: crude forgery
el('c58', 'counter', R3(12) - 200, -100, '@P58:less-0.3', { label: 'AFTER THE BIG ANNOUNCEMENT', prefix: '< ', to: 2, suffix: ' WEEKS', at: '@P58:two', dur: 0.6, tone: 'bad', size: 170, w: 1000 }, { out: '@P59-0.2' });
el('nb58', 'notebook', R3(12) + 680, 20, '@P58:crude-0.5', { w: 520, h: 640, n: 3, lettersAt: 0, stampText: 'FAKE', stampAt: '@P58:forgery' }, { out: '@P59-0.2' });
el('d58', 'card', R3(12) - 200, 250, '@P58:means-0.2', { w: 780, h: 230, lines: [{ t: 'CRUDE FORGERY =', size: 36, tone: 'bad', at: '@P58:means' }, { t: 'A CHEAP, OBVIOUS FAKE', size: 44, at: '@P58:cheap' }], pad: 70 }, { out: '@P59-0.2' });
bt('@P58', 'graphic-hero', ['c58'], { move: 'whip', fill: 0.6, sy: 470, pose: 'point' }); sf('@P58-0.3', 'swoosh_2', -11, 0.5);
bt('@P58:two', 'zoom-on-number', 'c58.value', { fill: 0.5, maxH: 420, sy: 470, pose: 'shock' }); sf('@P58:two', 'money_counter_1', -13, 1.0); sf('@P58:two+0.6', 'clock_ticking_1', -11, 1.5);
bt('@P58:crude', 'graphic-hero', ['c58', 'nb58'], { fill: 0.92, sy: 480, pose: 'chin' });
bt('@P58:forgery', 'zoom-on-number', 'nb58', { fill: 0.3, maxH: 700, sx: 1250, sy: 500, pose: 'shock' }); sf('@P58:forgery', 'rubber_stamp_2', -5, 0.5); sk('@P58:forgery', 10);
bt('@P58:means', 'graphic-hero', ['c58', 'd58'], { fill: 0.7, sy: 500, pose: 'chin' });
// P59 verdict: Hamburg 1985, about four and a half years each
con('u59', 'kuj', R3(13) - 640, 40, '@P59-0.3', { w: 380, variant: 'card', bars: '@P59:sentenced', stamps: [{ text: 'CONVICTED 1985', at: '@P59:convicted', tone: 'bad', size: 42, rot: -0.1, y: 60 }], push: { at: '@P59', to: 1.15, dur: 6 }, flash: false }, { out: '@P60-0.2' });
el('h59', 'card', R3(13) - 130, 40, '@P59:convicted-0.2', { w: 420, h: 330, lines: [{ t: 'GERD HEIDEMANN', size: 40, font: 'hero', at: '@P59:heidemann' }, { t: 'CONVICTED TOO', size: 28, font: 'mono', tone: 'bad', at: '@P59:heidemann' }, { t: 'HAMBURG · 1985', size: 24, font: 'mono', tone: 'inkSoft', at: '@P59:hamburg' }], pad: 90 }, { out: '@P60-0.2' });
el('y59', 'counter', R3(13) + 520, -50, '@P59:each-0.5', { label: 'EACH SENTENCED TO ABOUT', to: 4.5, decimals: 1, suffix: ' YEARS', at: '@P59:four', dur: 0.8, tone: 'bad', size: 150, w: 760 }, { out: '@P60-0.2' });
bt('@P59', 'graphic-hero', ['u59', 'h59'], { move: 'whip', fill: 0.78, sy: 500, pose: 'point' }); sf('@P59-0.3', 'swoosh_2', -11, 0.5);
bt('@P59:convicted', 'zoom-on-number', 'u59', { fill: 0.28, maxH: 740, sy: 500, pose: 'shock' }); sf('@P59:convicted', 'gavel_1', -5, 0.8); sk('@P59:convicted', 10);
bt('@P59:heidemann', 'graphic-hero', ['u59', 'h59', 'y59'], { fill: 0.92, sy: 500, pose: 'chin' });
bt('@P59:four', 'zoom-on-number', 'y59.value', { fill: 0.34, maxH: 400, sx: 1100, sy: 480 }); sf('@P59:four', 'deep_boom_1', -7, 1.0); sf('@P59:sentenced-0.1', 'cell_door_1', -7, 1.2);
// P60 the order was wrong: paid first, tested after; flip it
el('o60', 'flow', R3(14), -200, '@P60:paid-0.3', { w: 1000, h: 360, items: [{ id: 'a', icon: 'dollar', label: '1  PAID', tone: 'bad', at: '@P60:paid', size: 34 }, { id: 'b', icon: 'magnifier', label: '2  TESTED', tone: 'paper', at: '@P60:cheap', size: 34 }] }, { out: '@P61-0.2' });
el('o60b', 'flow', R3(14), 240, '@P60:flip-0.2', { w: 1000, h: 360, items: [{ id: 'a', icon: 'magnifier', label: '1  TEST', tone: 'good', at: '@P60:flip', size: 34 }, { id: 'b', icon: 'dollar', label: '2  PAY', tone: 'paper', at: '@P60:flip+0.4', size: 34 }] }, { out: '@P61-0.2' });
el('x60', 'stamp', R3(14) + 760, 240, '@P60:fake-0.1', { text: 'NEVER MAKES IT TO PRINT', tone: 'good', size: 46 }, { rot: -0.04, out: '@P61-0.2' });
bt('@P60', 'graphic-hero', ['o60'], { move: 'whip', fill: 0.5, maxH: 520, sy: 440, pose: 'point' }); sf('@P60-0.3', 'swoosh_2', -11, 0.5);
bt('@P60:paid', 'zoom-on-number', 'o60.a', { fill: 0.2, maxH: 400, sy: 440 }); sf('@P60:paid', 'cash_register_1', -10, 0.9);
bt('@P60:cheap', 'graphic-hero', ['o60'], { fill: 0.5, maxH: 520, sy: 440, pose: 'chin' }); sf('@P60:cheap', 'pop_2', -9, 0.3);
bt('@P60:flip', 'graphic-hero', ['o60', 'o60b'], { fill: 0.5, maxH: 980, sy: 500, pose: 'point' }); sf('@P60:flip', 'rewind_1', -10, 0.9); sf('@P60:flip+0.4', 'pop_2', -9, 0.3);
bt('@P60:fake', 'graphic-hero', ['o60b', 'x60'], { fill: 0.7, sy: 560, pose: 'shock' }); sf('@P60:fake', 'rubber_stamp_2', -6, 0.5);
