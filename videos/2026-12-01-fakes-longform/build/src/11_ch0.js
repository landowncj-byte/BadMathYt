// ---------------- COLD OPEN (P01-P07): four faces, four details ----------------
// P01: the thief + the Mona Lisa leaving the wall
con('k0', 'per', R0(0) - 600, 60, -3, { w: 420, variant: 'card', file: true, caseNo: 'CASE Nº 1', stamps: [{ text: 'THE THIEF', at: '@P01:man', tone: 'bad', size: 56, rot: -0.1, y: 40 }] }, { out: '@P02-0.2' });
el('w0', 'wall', R0(0) + 330, 40, -3, { w: 800, h: 740, src: 'brand/photos/mona-lisa-painting/1.jpg', goneAt: '@P01:under', hooksAt: '@P01:arm', label: 'THE MOST FAMOUS PAINTING', labelAt: '@P01:arm', nameAt: -1 }, { out: '@P02-0.2' });
bt(0, 'graphic-hero', ['k0', 'w0'], { fill: 0.84, sy: 480, pose: 'point' }); sf(0, 'paper_slam_2', -9, 0.5); sf(0.05, 'camera_flash_1', -9, 0.6);
bt('@P01:museum', 'zoom-on-number', 'w0', { fill: 0.4, maxH: 760, sy: 500, pose: 'chin' });
bt('@P01:famous#2', 'graphic-hero', ['k0', 'w0'], { fill: 0.84, sy: 480, pose: 'point' });
bt('@P01:under', 'zoom-on-number', 'w0', { fill: 0.42, maxH: 780, sy: 500, pose: 'shock' }); sf('@P01:under', 'door_bang_1', -9, 0.8); sk('@P01:under', 10);
// P02: the forger + 1.65 million guilders sold to a Nazi leader (text card only)
con('k1', 'mee', R0(1) - 660, 60, '@P02-0.3', { w: 420, variant: 'card', file: true, caseNo: 'CASE Nº 2', stamps: [{ text: 'FAKE', at: '@P02:fake', tone: 'bad', size: 70, rot: -0.1, y: 30 }] }, { out: '@P03-0.2' });
el('g2', 'card', R0(1) + 250, -200, '@P02:painter+0.4', { w: 640, h: 280, lines: [{ t: 'THE BUYER', size: 24, gap: 54, font: 'mono', tone: 'inkSoft', at: '@P02:nazi-0.4' }, { t: 'HERMANN GOERING', size: 58, font: 'hero', at: '@P02:nazi-0.3' }, { t: 'A NAZI LEADER', size: 40, tone: 'bad', at: '@P02:nazi' }], pad: 56 }, { out: '@P03-0.2' });
el('c2', 'counter', R0(1) + 250, 150, '@P02:sold-0.2', { label: 'PRICE IN GUILDERS (DUTCH MONEY)', to: 1.65, decimals: 2, suffix: ' MILLION', at: '@P02:1', dur: 1.2, tone: 'bad', size: 110, w: 900 }, { out: '@P03-0.2' });
bt('@P02', 'graphic-hero', ['k1', 'g2', 'c2'], { move: 'whip', fill: 0.86, sy: 500, pose: 'point' }); sf('@P02-0.3', 'swoosh_2', -11, 0.5);
bt('@P02:fake', 'zoom-on-number', 'k1', { fill: 0.3, maxH: 760, sy: 520, pose: 'shock' }); sf('@P02:fake', 'rubber_stamp_2', -5, 0.5);
bt('@P02:nazi', 'graphic-hero', ['g2', 'c2'], { fill: 0.5, sy: 500, pose: 'chin' });
bt('@P02:1', 'zoom-on-number', 'c2.value', { fill: 0.42, maxH: 420, sy: 500 }); sf('@P02:1', 'money_counter_2', -12, 1.3);
// P03: the diary forger, a magazine, ~9 million marks, wrong initials
con('k2', 'kuj', R0(2) - 700, 60, '@P03-0.3', { w: 380, variant: 'card', file: true, caseNo: 'CASE Nº 3', stamps: [{ text: 'FORGED', at: '@P03:secret', tone: 'bad', size: 60, rot: -0.1, y: 40 }] }, { out: '@P04-0.2' });
el('nb0', 'notebook', R0(2) + 120, 20, '@P03:secret-0.3', { w: 560, h: 700, n: 4, lettersAt: '@P03:wrong', ringAt: '@P03:cover' }, { out: '@P04-0.2' });
el('c3', 'counter', R0(2) + 760, -60, '@P03:nine-0.2', { label: 'A MAGAZINE PAID ABOUT', sub: 'MARKS (WEST GERMAN MONEY)', to: 9, suffix: ' MILLION', at: '@P03:nine', dur: 1.0, tone: 'bad', size: 100, w: 760 }, { out: '@P04-0.2' });
bt('@P03', 'graphic-hero', ['k2', 'nb0', 'c3'], { move: 'whip', fill: 0.9, sy: 500, pose: 'point' }); sf('@P03-0.3', 'swoosh_2', -11, 0.5);
bt('@P03:nine', 'zoom-on-number', 'c3.value', { fill: 0.34, maxH: 420, sx: 1100, sy: 480 }); sf('@P03:nine', 'money_counter_1', -12, 1.3);
bt('@P03:wrong', 'zoom-on-number', 'nb0.letters', { fill: 0.3, maxH: 420, sy: 500, pose: 'shock' }); sf('@P03:wrong', 'pop_2', -8, 0.4); sf('@P03:cover', 'rubber_stamp_2', -6, 0.5); sk('@P03:cover', 10);
// P04: the wine collector, world record, then "a wine factory"
con('k3', 'kur', R0(3) - 640, 60, '@P04-0.3', { w: 420, variant: 'card', file: true, caseNo: 'CASE Nº 4', stamps: [{ text: 'A WINE FACTORY', at: '@P04:factory', tone: 'bad', size: 50, rot: -0.1, y: 40 }] }, { out: '@P05-0.2' });
el('bo4', 'bottles', R0(3) + 360, 80, '@P04:wine-0.3', { items: [{ label: '1945', at: '@P04:wine' }, { label: '1982', at: '@P04:wine+0.15' }, { label: '1990', at: '@P04:wine+0.3' }], gap: 190, fakeAt: '@P04:house' }, { out: '@P05-0.2' });
el('wr4', 'stamp', R0(3) + 360, -270, '@P04:record-0.1', { text: 'WORLD AUCTION RECORD', tone: 'accent', size: 62 }, { rot: -0.05, out: '@P05-0.2' });
bt('@P04', 'graphic-hero', ['k3', 'bo4'], { move: 'whip', fill: 0.86, sy: 500, pose: 'point' }); sf('@P04-0.3', 'swoosh_2', -11, 0.5);
bt('@P04:record', 'graphic-hero', ['bo4', 'wr4'], { fill: 0.6, sx: 1100, sy: 480, pose: 'chin' }); sf('@P04:record', 'gavel_1', -7, 0.8);
bt('@P04:house', 'zoom-on-number', 'bo4', { fill: 0.4, maxH: 520, sx: 960, sy: 520 });
bt('@P04:factory', 'zoom-on-number', 'k3', { fill: 0.3, maxH: 760, sy: 520, pose: 'shock' }); sf('@P04:factory', 'rubber_stamp_2', -5, 0.5); sk('@P04:factory', 10);
// P05: four stories - three fakes and one real masterpiece
for (const [i, w] of ['per', 'mee', 'kuj', 'kur'].entries()) con('f' + i, w, R0(4) + (i - 1.5) * 440, 60 + (i % 2) * 24, `@P05:four+${(i * 0.14).toFixed(2)}`, { w: 340, variant: 'card', tilt: (i - 1.5) * 0.03, flash: i < 2, credit: '', stamps: i === 0 ? [{ text: 'THE REAL ONE', at: '@P05:real', tone: 'good', size: 38, rot: -0.1, y: 60 }] : [{ text: 'FAKE', at: `@P05:fooled+${(i * 0.18).toFixed(2)}`, tone: 'bad', size: 70, rot: -0.1, y: 40 }] }, { out: '@P06-0.2' });
el('fourT', 'text', R0(4), -400, '@P05-0.2', { lines: [[['FOUR STORIES', 'paper']]], size: 96 }, { out: '@P06-0.2' });
bt('@P05', 'graphic-hero', ['fourT', 'f0', 'f3'], { move: 'whip', fill: 0.92, sy: 480, pose: 'point' }); sf('@P05-0.3', 'swoosh_2', -11, 0.5);
for (let i = 0; i < 4; i++) sf(`@P05:four+${(i * 0.14).toFixed(2)}`, 'pop_2', -9, 0.3);
bt('@P05:three', 'graphic-hero', ['f1', 'f3'], { fill: 0.64, sy: 500, pose: 'shock' }); for (let i = 1; i < 4; i++) sf(`@P05:fooled+${(i * 0.18).toFixed(2)}`, 'rubber_stamp_2', -8, 0.5);
bt('@P05:masterpiece', 'zoom-on-number', 'f0', { fill: 0.3, maxH: 760, sy: 520, pose: 'chin' }); sf('@P05:real', 'ding_2', -9, 0.7);
bt('@P05:prove', 'graphic-hero', ['f0', 'f1', 'f2', 'f3'], { fill: 0.92, sy: 500, pose: 'point' });
// P06: every one ended in a courtroom; came apart over something tiny
el('gv6', 'tile', R0(5) - 520, 40, '@P06-0.3', { icon: 'gavel', caption: 'A COURTROOM', w: 340, h: 400, iconS: 200 }, { out: '@P07-0.2' });
el('mg6', 'icon', R0(5) + 380, 0, '@P06:apart-0.2', { kind: 'magnifier', s: 330, col: 'paper' }, { out: '@P07-0.2' });
el('t6', 'text', R0(5) + 380, 280, '@P06:tiny-0.4', { lines: [[['SOMETHING ', 'paper'], ['TINY', 'bad']]], size: 110 }, { out: '@P07-0.2' });
bt('@P06', 'graphic-hero', 'gv6', { move: 'whip', fill: 0.26, maxH: 640, sy: 500, pose: 'point' }); sf('@P06-0.3', 'swoosh_2', -11, 0.5); sf('@P06:courtroom', 'gavel_1', -6, 0.8);
bt('@P06:apart', 'graphic-hero', ['gv6', 'mg6'], { fill: 0.7, sy: 480, pose: 'chin' });
bt('@P06:tiny', 'zoom-on-number', 't6', { fill: 0.5, maxH: 320, sy: 450, pose: 'shock' }); sf('@P06:tiny', 'rubber_stamp_2', -5, 0.5); sk('@P06:tiny', 8);
// P07: three simple checks teaser, then the title
el('cl7', 'checklist', R0(6) - 100, 40, '@P07-0.3', { title: 'THREE SIMPLE CHECKS', lockOpen: '@P07>', rows: [{ show: '@P07:three', t: 'CHECK ONE   ???' }, { show: '@P07:simple', t: 'CHECK TWO   ???' }, { show: '@P07:caught', t: 'CHECK THREE   ???' }] }, { out: '@P07:all+0.1' });
el('ttl', 'headline', R0(7), 40, '@P07:all-0.1', { kicker: 'A BAD MATH CASE FILE', lines: [[['FAKES', 'accent']], [['THAT FOOLED THE EXPERTS', 'paper']]], size: 200, underAt: 0.9 });
bt('@P07', 'graphic-hero', 'cl7', { move: 'whip', fill: 0.58, maxH: 780, sy: 500, pose: 'point' }); sf('@P07-0.3', 'paper_slam_2', -10, 0.5); sf('@P07-0.3', 'swoosh_2', -11, 0.5);
for (const w of ['three', 'simple', 'caught']) sf(`@P07:${w}`, 'pop_2', -9, 0.3);
bt('@P07:simple', 'graphic-hero', 'cl7', { fill: 0.6, maxH: 780, sy: 500 }); bt('@P07:caught', 'graphic-hero', 'cl7', { fill: 0.6, maxH: 780, sy: 500, pose: 'chin' });
bt('@P07:all', 'graphic-hero', 'ttl', { move: 'whip', fill: 0.8, sy: 470, pose: 'shock', dur: 0.5 }); sf('@P07:all-0.1', 'deep_boom_1', -3, 2.0); sk('@P07:all', 12);
