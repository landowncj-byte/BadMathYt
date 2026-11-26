// ---------------- CH2 · THE VERMEER FORGER (P26-P45) — Dutch amber room, van Meegeren ----------------
const R2 = k => K(RM[2], k);
// P26 chapter card + case file
el('ch2', 'headline', R2(0) - 400, 40, '@P26-0.3', { kicker: 'CHAPTER TWO', lines: ['THE VERMEER', [['FORGER', 'bad']]], size: 150, underAt: 1.0 }, { out: '@P27-0.2' });
con('m1', 'mee', R2(0) + 580, 50, '@P26-0.2', { w: 440, variant: 'card', file: true, caseNo: 'CASE Nº 2', push: { at: '@P26', to: 1.12, dur: 3 } }, { out: '@P27-0.2' });
bt('@P26', 'graphic-hero', ['ch2', 'm1'], { move: 'whip', dur0: 0.7, fill: 0.84, sy: 480, pose: 'shrug', arc: 0.2 }); sf('@P26-0.6', 'tape_stop_1', -8, 1.0); sf('@P26-0.1', 'cinematic_hit_1', -9, 1.5); sf('@P26+0.9', 'camera_flash_1', -9, 0.6); sk('@P26+0.7', 8);
bt('@P26:forger', 'zoom-on-number', 'm1', { fill: 0.3, maxH: 760, sy: 520, pose: 'point' });
// P27 the pitch: a painter the critics ignore
el('dc27', 'datecard', R2(1) - 700, -330, '@P27-0.2', { big: '1930s', small: 'THE NETHERLANDS' }, { out: '@P28-0.2' });
con('m27', 'mee', R2(1) - 100, 40, '@P27-0.3', { w: 900, variant: 'side', quote: ['IGNORED', 'BY THE', 'CRITICS.'], quoteSub: 'A DUTCH PAINTER', quoteSize: 78, quoteAt: '@P27:critics-0.2', noquote: true, aspect: 0.66, pw: 400 }, { out: '@P28-0.2' });
bt('@P27', 'graphic-hero', ['dc27', 'm27'], { move: 'whip', fill: 0.62, sy: 500, pose: 'point' }); sf('@P27-0.3', 'swoosh_2', -11, 0.5); sf('@P27-0.1', 'camera_flash_1', -10, 0.6);
bt('@P27:dutch', 'zoom-on-number', 'm27', { fill: 0.5, maxH: 740, sy: 500 });
bt('@P27:critics', 'graphic-hero', ['m27'], { fill: 0.6, maxH: 800, sy: 500, pose: 'shrug' }); sf('@P27:critics', 'typewriter_2', -11, 1.2);
// P28 the target: Vermeer, 1600s
el('v28', 'card', R2(2) - 200, 20, '@P28:target-0.3', { w: 700, h: 400, lines: [{ t: 'THE TARGET', size: 28, gap: 54, font: 'mono', tone: 'bad', at: '@P28:target' }, { t: 'JOHANNES VERMEER', size: 70, font: 'hero', at: '@P28:johannes' }, { t: 'DUTCH MASTER · 1600s', size: 32, font: 'mono', tone: 'inkSoft', at: '@P28:dutch' }], pad: 100 }, { out: '@P29-0.2' });
con('m28', 'mee', R2(2) + 560, 280, '@P28:picks-0.2', { w: 250, variant: 'pip', label: 'HE PICKS', flash: false, arrow: { at: '@P28:target', to: [-210, -150] } }, { out: '@P29-0.2' });
bt('@P28', 'graphic-hero', ['v28', 'm28'], { move: 'whip', fill: 0.8, sy: 500, pose: 'point' }); sf('@P28-0.3', 'swoosh_2', -11, 0.5);
bt('@P28:target', 'zoom-on-number', 'v28', { fill: 0.5, maxH: 520, sy: 500, pose: 'chin' }); sf('@P28:target', 'rubber_stamp_2', -8, 0.5);
bt('@P28:dutch', 'graphic-hero', ['v28', 'm28'], { fill: 0.82, sy: 500, pose: 'point' });
// P29 only a few dozen real ones: a new one is buried treasure
el('g29', 'gallery', R2(3) - 200, 20, '@P29-0.3', { w: 1500, h: 520, head: 'REAL VERMEERS KNOWN: ONLY A FEW DOZEN', items: [0, 1, 2, 3].map(i => ({ label: 'REAL VERMEER', at: `@P29:few+${(i * 0.2).toFixed(2)}` })) }, { out: '@P30-0.2' });
el('t29', 'tile', R2(3) + 860, 40, '@P29:treasure-0.5', { icon: 'cash', caption: 'BURIED TREASURE', cap: 28, w: 340, h: 380, iconS: 190, tilt: 0.04 }, { out: '@P30-0.2' });
bt('@P29', 'graphic-hero', ['g29'], { move: 'whip', fill: 0.8, sy: 500, pose: 'point' }); sf('@P29-0.3', 'swoosh_2', -11, 0.5);
bt('@P29:few', 'zoom-on-number', 'g29', { fill: 0.8, maxH: 640, sy: 500, pose: 'chin' }); for (let i = 0; i < 4; i++) sf(`@P29:few+${(i * 0.2).toFixed(2)}`, 'pop_2', -9, 0.3);
bt('@P29:new', 'graphic-hero', ['g29', 't29'], { fill: 0.95, sy: 500, pose: 'point' });
bt('@P29:treasure', 'zoom-on-number', 't29', { fill: 0.22, maxH: 520, sx: 1100, sy: 500, pose: 'shock' }); sf('@P29:treasure', 'coins_drop_1', -10, 1.0);
// P30 the trick: paints in Vermeer's style, sells as lost Vermeers
el('ph30', 'photo', R2(4) - 640, 20, '@P30:paints-0.3', { src: 'brand/photos/han-van-meegeren/2.jpg', name: 'HIS OWN PAINTING', role: 'IN VERMEER\'S STYLE', credit: 'HAN VAN MEEGEREN · CC BY-SA 3.0 (WIKIMEDIA)', fx: 0.5, fy: 0.4, w: 600, aspect: 0.8, tilt: -0.02 }, { out: '@P31-0.2' });
el('s30', 'card', R2(4) + 140, 20, '@P30:sells-0.3', { w: 520, h: 440, lines: [{ t: '2', size: 130, tone: 'bad', at: '@P30:sells' }, { t: 'SELL THEM AS', size: 44, at: '@P30:sells+0.1' }, { t: '“LOST VERMEERS”', size: 52, tone: 'bad', at: '@P30:lost' }, { t: 'JUST DISCOVERED', size: 30, font: 'mono', tone: 'inkSoft', at: '@P30:discovered' }], pad: 90 }, { out: '@P31-0.2' });
el('n30', 'card', R2(4) - 640, -430, '@P30:paints-0.1', { w: 340, h: 110, lines: [{ t: '1  PAINT NEW ONES', size: 36, tone: 'bad', at: '@P30:paints' }], pad: 55 }, { out: '@P31-0.2' });
con('m30', 'mee', R2(4) + 660, 330, '@P30:van-0.2', { w: 250, variant: 'pip', label: 'HE DID THIS', flash: false, arrow: { at: '@P30:sells', to: [-250, -180] } }, { out: '@P31-0.2' });
bt('@P30', 'graphic-hero', ['ph30', 'n30'], { move: 'whip', fill: 0.4, maxH: 940, sy: 500, pose: 'point' }); sf('@P30-0.3', 'swoosh_2', -11, 0.5);
bt('@P30:paints', 'zoom-on-number', 'ph30', { fill: 0.34, maxH: 900, sy: 540 }); sf('@P30:paints', 'paper_slam_2', -10, 0.5);
bt('@P30:sells', 'graphic-hero', ['ph30', 's30', 'm30'], { fill: 0.84, sy: 500, pose: 'point' }); sf('@P30:sells', 'pop_2', -8, 0.3);
bt('@P30:lost', 'zoom-on-number', 's30', { fill: 0.3, maxH: 520, sy: 500, pose: 'chin' }); sf('@P30:lost', 'rubber_stamp_2', -8, 0.5);
// P31 the art world believes him
el('g31', 'gallery', R2(5) - 100, 40, '@P31-0.3', { w: 1300, h: 520, head: 'THE ART WORLD BELIEVES HIM', items: [{ label: 'LOST VERMEER', at: '@P31:experts' }, { label: 'LOST VERMEER', at: '@P31:museums' }, { label: 'LOST VERMEER', at: '@P31:buy' }] }, { out: '@P32-0.2' });
el('x31', 'victim', R2(5) - 960, 40, '@P31:believes-0.2', { kind: 'collector', label: 'THE EXPERTS', sub: 'BELIEVED HIM', w: 340, h: 440, reactAt: '@P31:museums', tape: 'EXPERTS' }, { out: '@P32-0.2' });
bt('@P31', 'graphic-hero', ['g31'], { move: 'whip', fill: 0.78, sy: 500, pose: 'point' }); sf('@P31-0.3', 'swoosh_2', -11, 0.5);
bt('@P31:believes', 'graphic-hero', ['x31', 'g31'], { fill: 0.9, sy: 500, pose: 'chin' });
bt('@P31:experts', 'zoom-on-number', 'g31', { fill: 0.7, maxH: 560, sy: 500 }); sf('@P31:experts', 'pop_2', -9, 0.3); sf('@P31:museums', 'pop_2', -9, 0.3); sf('@P31:buy', 'cash_register_1', -10, 0.9);
// P32 then it gets dangerous
el('d32', 'text', R2(6), -20, '@P32-0.3', { lines: [[['THEN IT GETS ', 'paper'], ['DANGEROUS', 'bad']]], size: 150 }, { enter: 'slam', out: '@P33-0.2' });
bt('@P32', 'graphic-hero', 'd32', { move: 'whip', fill: 0.8, maxH: 340, sy: 470, pose: 'shock' }); sf('@P32-0.3', 'swoosh_2', -11, 0.5); sf('@P32:dangerous', 'dramatic_sting_1', -8, 1.5); sk('@P32:dangerous', 12);
bt('@P32:dangerous', 'zoom-on-number', 'd32', { fill: 0.86, maxH: 300, sy: 470, pose: 'shock' });
// P33 1943, German occupation, fake sold via a dealer to Goering (TEXT ONLY: no portrait, no symbols)
el('dc33', 'datecard', R2(7) - 760, -330, '@P33-0.2', { big: '1943', small: 'GERMAN OCCUPATION' }, { out: '@P34-0.2' });
el('f33', 'flow', R2(7) + 100, 60, '@P33-0.3', { w: 1500, h: 360, items: [{ id: 'a', icon: 'person', label: 'VAN MEEGEREN', tone: 'paper', at: '@P33:fakes', size: 24 }, { id: 'b', icon: 'handshake', label: 'A DEALER', tone: 'paper', at: '@P33:dealer', size: 30 }, { id: 'c', icon: 'dollar', label: 'GOERING', tone: 'bad', at: '@P33:hermann', size: 32 }] }, { out: '@P34-0.2' });
el('g33', 'card', R2(7) + 100, 340, '@P33:nazi-0.4', { w: 760, h: 150, lines: [{ t: 'HERMANN GOERING · A NAZI LEADER', size: 40, tone: 'bad', at: '@P33:nazi' }], pad: 76 }, { out: '@P34-0.2' });
con('m33', 'mee', R2(7) - 620, 380, '@P33:fakes-0.2', { w: 230, variant: 'pip', label: 'HIS FAKE', flash: false }, { out: '@P34-0.2' });
bt('@P33', 'graphic-hero', ['dc33', 'f33'], { move: 'whip', fill: 0.72, sy: 500, pose: 'point' }); sf('@P33-0.3', 'swoosh_2', -11, 0.5);
bt('@P33:fakes', 'graphic-hero', ['f33', 'm33'], { fill: 0.86, sy: 480, pose: 'point' }); sf('@P33:fakes', 'pop_2', -9, 0.3); sf('@P33:dealer', 'pop_2', -9, 0.3);
bt('@P33:hermann', 'zoom-on-number', 'f33.c', { fill: 0.22, maxH: 520, sy: 460, pose: 'shock' }); sf('@P33:hermann', 'pop_2', -8, 0.4);
bt('@P33:nazi', 'graphic-hero', ['f33', 'g33'], { fill: 0.7, sy: 560, pose: 'chin' }); sf('@P33:nazi', 'rubber_stamp_2', -8, 0.5); sk('@P33:nazi', 8);
// P34 the price: 1.65 million guilders (Dutch money) - a fortune
el('c34', 'counter', R2(8) - 100, -80, '@P34:price-0.2', { label: 'THE PRICE', sub: 'GUILDERS WERE DUTCH MONEY', to: 1.65, decimals: 2, suffix: ' MILLION', at: '@P34:1', dur: 1.2, tone: 'bad', size: 170, w: 1100 }, { out: '@P35-0.2' });
el('f34', 'stamp', R2(8) - 100, 250, '@P34:fortune-0.2', { text: 'A FORTUNE', tone: 'accent', size: 90 }, { rot: -0.04, out: '@P35-0.2' });
bt('@P34', 'graphic-hero', ['c34'], { move: 'whip', fill: 0.58, sy: 480, pose: 'point' }); sf('@P34-0.3', 'swoosh_2', -11, 0.5);
bt('@P34:1', 'zoom-on-number', 'c34.value', { fill: 0.5, maxH: 440, sy: 480, pose: 'shock' }); sf('@P34:1', 'money_counter_2', -12, 1.4); sf('@P34:million', 'cash_register_1', -9, 0.9); sk('@P34:million', 10);
bt('@P34:guilders', 'graphic-hero', ['c34'], { fill: 0.6, sy: 480, pose: 'chin' });
bt('@P34:fortune', 'graphic-hero', ['c34', 'f34'], { fill: 0.7, sy: 500, pose: 'shock' }); sf('@P34:fortune', 'rubber_stamp_2', -6, 0.5);
// P35 1945: found in Goering's collection, traced to van Meegeren
el('t35', 'timeline', R2(9) - 380, 40, '@P35-0.3', { w: 900, step: 180, items: [{ id: 'i0', date: '1945', label: 'THE WAR IS OVER', at: '@P35:after', tone: 'accent' }, { id: 'i1', date: 'INVESTIGATORS', label: 'FIND IT IN GOERING\'S COLLECTION', at: '@P35:find', tone: 'accent' }, { id: 'i2', date: 'THE TRAIL', label: 'LEADS TO VAN MEEGEREN', at: '@P35:trace', tone: 'bad' }] }, { out: '@P36-0.2' });
con('m35', 'mee', R2(9) + 640, 40, '@P35:trace-0.3', { w: 400, variant: 'card', ring: '@P35:meegeren', flash: false, credit: '' }, { out: '@P36-0.2' });
bt('@P35', 'graphic-hero', ['t35'], { move: 'whip', fill: 0.5, maxH: 640, sy: 500, pose: 'point' }); sf('@P35-0.3', 'swoosh_2', -11, 0.5);
bt('@P35:find', 'zoom-on-number', 't35.i1', { fill: 0.4, maxH: 300, sy: 500 }); sf('@P35:find', 'page_turn_1', -10, 0.8);
bt('@P35:trace', 'graphic-hero', ['t35', 'm35'], { fill: 0.9, sy: 500, pose: 'point' }); sf('@P35:trace', 'camera_flash_1', -10, 0.6);
bt('@P35:meegeren', 'zoom-on-number', 'm35', { fill: 0.3, maxH: 760, sy: 520, pose: 'shock' }); sf('@P35:meegeren', 'rubber_stamp_2', -5, 0.5);
// P36 national treasure to the enemy; arrested and charged with collaboration
con('m36', 'mee', R2(10) - 480, 40, '@P36-0.3', { w: 420, variant: 'card', flash: false, credit: '', stamps: [{ text: 'COLLABORATION', at: '@P36:collaboration', tone: 'bad', size: 46, rot: -0.1, y: 50 }] }, { out: '@P37-0.2' });
el('e36', 'text', R2(10) + 280, -110, '@P36:treasure-0.2', { lines: [[['A DUTCH ', 'paper'], ['NATIONAL TREASURE', 'gold']], [['SOLD TO ', 'paper'], ['THE ENEMY', 'bad']]], size: 60 }, { out: '@P37-0.2' });
el('c36', 'tile', R2(10) + 160, 190, '@P36:arrested-0.2', { icon: 'cuffs', caption: 'ARRESTED', w: 270, h: 300, iconS: 150, tilt: -0.03 }, { out: '@P37-0.2' });
el('d36', 'card', R2(10) + 560, 200, '@P36:means-0.2', { w: 540, h: 230, lines: [{ t: 'COLLABORATION =', size: 36, tone: 'bad', at: '@P36:means' }, { t: 'HELPING THE ENEMY', size: 42, at: '@P36:helping' }], pad: 70 }, { out: '@P37-0.2' });
bt('@P36', 'graphic-hero', ['m36'], { move: 'whip', fill: 0.3, maxH: 760, sy: 500, pose: 'chin' }); sf('@P36-0.3', 'swoosh_2', -11, 0.5);
bt('@P36:treasure', 'graphic-hero', ['m36', 'e36'], { fill: 0.84, sy: 480, pose: 'point' });
bt('@P36:arrested', 'graphic-hero', ['m36', 'e36', 'c36'], { fill: 0.88, sy: 500, pose: 'shock' }); sf('@P36:arrested', 'handcuff_click_1', -7, 0.8);
bt('@P36:collaboration', 'zoom-on-number', 'm36', { fill: 0.28, maxH: 760, sy: 520, pose: 'shock' }); sf('@P36:collaboration', 'rubber_stamp_2', -5, 0.5); sk('@P36:collaboration', 10);
bt('@P36:means', 'graphic-hero', ['m36', 'd36'], { fill: 0.84, sy: 500, pose: 'chin' });
// P37 how do you get out of that? confess to something smaller
el('q37', 'text', R2(11) - 520, 0, '@P37-0.3', { lines: [[['?', 'accent']]], size: 440 }, { out: '@P38-0.2' });
el('h37', 'headline', R2(11) + 280, 20, '@P37:confess-0.3', { kicker: 'THE WAY OUT', lines: [[['CONFESS TO', 'paper']], [['SOMETHING', 'paper']], [['SMALLER.', 'bad']]], size: 130, underAt: 0.9 }, { out: '@P38-0.2' });
bt('@P37', 'graphic-hero', ['q37'], { move: 'whip', fill: 0.3, maxH: 640, sy: 480, pose: 'shrug' }); sf('@P37-0.3', 'swoosh_2', -11, 0.5);
bt('@P37:confess', 'graphic-hero', ['q37', 'h37'], { fill: 0.82, sy: 480, pose: 'point' }); sf('@P37:confess', 'typewriter_2', -11, 1.2);
bt('@P37:smaller', 'zoom-on-number', 'h37', { fill: 0.4, maxH: 520, sy: 480, pose: 'shock' }); sf('@P37:smaller', 'rubber_stamp_2', -5, 0.5);
// P38 the confession: "I painted it myself"
con('m38', 'mee', R2(12) - 150, 40, '@P38-0.3', { w: 900, variant: 'side', quote: ['“I DIDN\'T SELL', 'A TREASURE.', 'I PAINTED IT', 'MYSELF.”'], quoteSize: 56, quoteAt: '@P38:says', noquote: true, aspect: 0.66, pw: 400 }, { out: '@P39-0.2' });
bt('@P38', 'graphic-hero', ['m38'], { move: 'whip', fill: 0.62, maxH: 800, sy: 500, pose: 'point' }); sf('@P38-0.3', 'swoosh_2', -11, 0.5); sf('@P38-0.1', 'camera_flash_1', -10, 0.6);
bt('@P38:says', 'zoom-on-number', 'm38', { fill: 0.52, maxH: 760, sy: 500 }); sf('@P38:says', 'typewriter_2', -11, 1.5);
bt('@P38:painted', 'graphic-hero', ['m38'], { fill: 0.62, maxH: 800, sy: 500, pose: 'shock' });
// P39 nobody believes him: the experts had already called them real
for (let i = 0; i < 2; i++) el('x39' + i, 'victim', R2(13) - 500 + i * 400, 40, `@P39:nobody+${(i * 0.2).toFixed(2)}`, { kind: 'collector', label: 'THE EXPERTS', sub: 'ALREADY SAID: REAL', w: 340, h: 440, suit: ['#2F5DA8', '#8A3FD1'][i], reactAt: '@P39:believes', tape: 'EXPERTS' }, { out: '@P40-0.2' });
el('s39', 'stamp', R2(13) + 480, 40, '@P39:believes-0.1', { text: 'NOBODY BELIEVES HIM', tone: 'bad', size: 70 }, { rot: -0.05, out: '@P40-0.2' });
el('r39', 'stamp', R2(13) + 480, 250, '@P39:real-0.1', { text: 'REAL (SAID THE EXPERTS)', tone: 'accent', size: 44 }, { rot: 0.03, out: '@P40-0.2' });
bt('@P39', 'graphic-hero', ['x390', 'x391'], { move: 'whip', fill: 0.52, sy: 500, pose: 'chin' }); sf('@P39-0.3', 'swoosh_2', -11, 0.5);
bt('@P39:believes', 'graphic-hero', ['x390', 'x391', 's39'], { fill: 0.86, sy: 500, pose: 'shrug' }); sf('@P39:believes', 'rubber_stamp_2', -6, 0.5); sf('@P39:believes', 'wrong_buzzer_2', -12, 0.6);
bt('@P39:real', 'graphic-hero', ['s39', 'r39'], { fill: 0.5, sx: 1000, sy: 500, pose: 'point' });
// P40 he paints one more, with officials watching
el('ph40', 'photo', R2(14) - 200, 20, '@P40-0.3', { src: 'brand/photos/han-van-meegeren/4.jpg', name: 'HE PAINTS ONE MORE', role: 'WHILE OFFICIALS WATCH · OCT 1945', credit: 'PHOTO: KOOS RAUCAMP / ANEFO · CC BY 4.0', fx: 0.6, fy: 0.5, w: 900, aspect: 0.7, tilt: -0.02 }, { out: '@P41-0.2' });
el('t40', 'tile', R2(14) + 560, -200, '@P40:paint-0.2', { icon: 'labels', caption: 'PAINT + CANVAS', cap: 26, w: 300, h: 320, iconS: 150, tilt: 0.04 }, { out: '@P41-0.2' });
el('o40', 'victim', R2(14) + 560, 240, '@P40:officials-0.3', { kind: 'investor', label: 'OFFICIALS', sub: 'WATCHING', w: 300, h: 380, tape: 'OFFICIALS', reactAt: '@P40:brand' }, { out: '@P41-0.2' });
bt('@P40', 'graphic-hero', ['ph40'], { move: 'whip', fill: 0.5, maxH: 900, sy: 500, pose: 'point' }); sf('@P40-0.3', 'swoosh_2', -11, 0.5);
bt('@P40:paint', 'graphic-hero', ['ph40', 't40'], { fill: 0.78, sy: 500, pose: 'point' }); sf('@P40:paint', 'pop_2', -9, 0.3);
bt('@P40:officials', 'graphic-hero', ['ph40', 'o40'], { fill: 0.84, sy: 500, pose: 'chin' }); sf('@P40:officials', 'pop_2', -9, 0.3);
bt('@P40:brand', 'zoom-on-number', 'ph40', { fill: 0.42, maxH: 940, sy: 520, pose: 'shock' }); sf('@P40:brand', 'camera_flash_1', -9, 0.6); sf('@P40:brand', 'pen_scratch_1', -12, 1.5);
// P41 the charge changes: not a traitor, a forger
con('m41', 'mee', R2(15) - 500, 40, '@P41-0.3', { w: 420, variant: 'card', flash: false, credit: '', ring: '@P41:forger' }, { out: '@P42-0.2' });
el('a41', 'stamp', R2(15) + 300, -150, '@P41:traitor-0.1', { text: 'NOT A TRAITOR', tone: 'good', size: 80 }, { rot: -0.05, out: '@P42-0.2' });
el('b41', 'stamp', R2(15) + 300, 130, '@P41:forger-0.1', { text: 'A FORGER', tone: 'bad', size: 120 }, { rot: 0.04, out: '@P42-0.2' });
bt('@P41', 'graphic-hero', ['m41', 'a41'], { move: 'whip', fill: 0.84, sy: 480, pose: 'point' }); sf('@P41-0.3', 'swoosh_2', -11, 0.5);
bt('@P41:traitor', 'zoom-on-number', 'a41', { fill: 0.4, maxH: 300, sx: 1100, sy: 440, pose: 'chin' }); sf('@P41:traitor', 'rubber_stamp_2', -7, 0.5);
bt('@P41:forger', 'graphic-hero', ['m41', 'a41', 'b41'], { fill: 0.88, sy: 500, pose: 'shock' }); sf('@P41:forger', 'rubber_stamp_2', -4, 0.5); sk('@P41:forger', 10);
// P42 verdict 1947
con('m42', 'mee', R2(16) - 520, 40, '@P42-0.3', { w: 420, variant: 'card', bars: '@P42:sentenced', stamps: [{ text: 'CONVICTED 1947', at: '@P42:convicted', tone: 'bad', size: 46, rot: -0.1, y: 60 }], push: { at: '@P42', to: 1.2, dur: 5 }, flash: false }, { out: '@P43-0.2' });
el('y42', 'counter', R2(16) + 260, -120, '@P42:sentenced-0.1', { label: 'SENTENCED TO', sub: 'FOR FORGERY AND FRAUD', to: 1, suffix: ' YEAR IN PRISON', at: '@P42:one', dur: 0.6, tone: 'bad', size: 110, w: 1000 }, { out: '@P43-0.2' });
bt('@P42', 'graphic-hero', ['m42', 'y42'], { move: 'whip', fill: 0.8, sy: 490, pose: 'point' }); sf('@P42-0.3', 'swoosh_2', -11, 0.5);
bt('@P42:convicted', 'zoom-on-number', 'm42', { fill: 0.28, maxH: 760, sy: 500, pose: 'shock' }); sf('@P42:convicted', 'gavel_1', -5, 0.8); sk('@P42:convicted', 10);
bt('@P42:sentenced', 'graphic-hero', ['m42', 'y42'], { fill: 0.84, sy: 500, pose: 'chin' }); sf('@P42:sentenced-0.1', 'cell_door_1', -7, 1.2);
bt('@P42:one', 'zoom-on-number', 'y42.value', { fill: 0.42, maxH: 400, sy: 480 }); sf('@P42:one', 'deep_boom_1', -7, 1.0);
// P43 weeks later he dies before he serves it
con('m43', 'mee', R2(17) - 350, 40, '@P43-0.3', { w: 420, variant: 'card', mono: true, flash: false, credit: '', stamps: [{ text: 'NEVER SERVED IT', at: '@P43:serves', tone: 'bad', size: 46, rot: -0.1, y: 50 }] }, { out: '@P44-0.2' });
el('d43', 'datecard', R2(17) + 380, -100, '@P43-0.2', { big: 'WEEKS LATER', small: 'AFTER THE VERDICT' }, { out: '@P44-0.2' });
bt('@P43', 'graphic-hero', ['m43', 'd43'], { move: 'whip', fill: 0.84, sy: 500, pose: 'chin' }); sf('@P43-0.3', 'swoosh_2', -11, 0.5); sf('@P43:later', 'suspense_drone_1', -16, 3.5);
bt('@P43:serves', 'zoom-on-number', 'm43', { fill: 0.28, maxH: 760, sy: 520, pose: 'shock' }); sf('@P43:serves', 'rubber_stamp_2', -5, 0.5);
// P44 the experts couldn't spot his fakes; the only proof was to watch him paint one
el('g44', 'gallery', R2(18) - 100, 30, '@P44-0.3', { w: 1400, h: 520, head: 'THE EXPERTS COULD NOT TELL', fakeAt: '@P44:fake', items: [0, 1, 2, 3].map(i => ({ label: 'EXPERT: REAL', at: `@P44:spot+${(i * 0.15).toFixed(2)}` })) }, { out: '@P45-0.2' });
con('m44', 'mee', R2(18) + 760, 360, '@P44:watch-0.2', { w: 270, variant: 'pip', label: 'WATCH HIM PAINT ONE', flash: false, arrow: { at: '@P44:watch', to: [-250, -170] } }, { out: '@P45-0.2' });
bt('@P44', 'graphic-hero', ['g44'], { move: 'whip', fill: 0.8, sy: 500, pose: 'chin' }); sf('@P44-0.3', 'swoosh_2', -11, 0.5);
bt('@P44:fake', 'zoom-on-number', 'g44', { fill: 0.82, maxH: 640, sy: 500, pose: 'shock' }); for (let i = 0; i < 4; i++) sf(`@P44:fake+${(i * 0.12).toFixed(2)}`, 'rubber_stamp_2', -9, 0.5); sk('@P44:fake', 10);
bt('@P44:watch', 'graphic-hero', ['g44', 'm44'], { fill: 0.95, sy: 500, pose: 'point' }); sf('@P44:watch', 'pop_2', -8, 0.3);
// P45 SEND moment
el('plane', 'plane', 1690, 930, '@P45:send-0.05', { dx: 190, dy: -330 }, { layer: 'screen', out: '@P45:send+1.5' });
sf('@P45:send-0.05', 'swoosh_2', -9, 1.0);
el('sd45', 'stamp', R2(19), 40, '@P45-0.3', { text: 'SEND THIS ONE TO THAT FRIEND', tone: 'accent', size: 90 }, { rot: -0.03, out: '@P46-0.2' });
bt('@P45', 'graphic-hero', 'sd45', { move: 'whip', fill: 0.7, sy: 500, pose: 'shock' }); sf('@P45-0.3', 'swoosh_2', -11, 0.5);
bt('@P45:send', 'graphic-hero', 'sd45', { fill: 0.76, sy: 500, pose: 'point' });
