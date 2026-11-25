// ---------------- ROOM 4 · THE IMPOSSIBLE NUMBER TEST (P51-P57) ----------------
const R4 = k => K(X4, k);
// P51: chapter card, then the checklist returns and the padlock opens
el('ch4', 'headline', R4(0), 40, '@P51-0.3', { kicker: 'CHAPTER FOUR', lines: ['THE IMPOSSIBLE', [['NUMBER ', 'paper'], ['TEST', 'accent']]], size: 160, underAt: 1.0 }, { out: '@P51:three-0.15' });
el('cl4', 'checklist', R4(0), 40, '@P51:three-0.15', { lockOpen: '@P51:caught', rows: [{ show: '@P51:questions', t: 'MORE THAN EXISTS?' }, { show: '@P51:questions+0.3', t: 'TOO SMOOTH?' }, { show: '@P51:questions+0.6', t: 'CAN ANYONE ELSE CHECK IT?' }] }, { out: '@P52-0.2' });
bt('@P51', 'graphic-hero', 'ch4', { move: 'whip', dur0: 0.7, fill: 0.7, sy: 470, pose: 'you', arc: 0.2 }); sf('@P51-0.6', 'tape_stop_1', -8, 1.0); sf('@P51-0.1', 'cinematic_hit_2', -8, 1.5); sf('@P51+0.9', 'paper_slam_2', -10, 0.5); sk('@P51+0.7', 8);
bt('@P51:three', 'graphic-hero', 'cl4', { fill: 0.44, sy: 490, pose: 'point', dur: 0.9 }); sf('@P51:three-0.15', 'paper_slam_2', -10, 0.5); for (let i = 0; i < 3; i++) sf(`@P51:questions+${(i * 0.3).toFixed(1)}`, 'pop_2', -9, 0.3);
bt('@P51:they', 'zoom-on-number', 'cl4.head', { fill: 0.46, maxH: 300, sy: 300 }); sf('@P51:caught', 'click_1', -8, 0.3); sf('@P51:caught+0.05', 'ding_1', -9, 0.8);
// P52: question one
el('q1', 'headline', R4(1), -300, '@P52-0.3', { kicker: 'QUESTION ONE', lines: ['DOES THE MATH NEED MORE', 'THAN EXISTS?'], size: 84, under: null }, { out: '@P52:if-0.2' });
el('pn1a', 'panel', R4(1) - 520, 140, '@P52:coupons-0.35', { w: 440, h: 470, title: 'COUPONS', icon: 'coupon', iconS: 160, tone: 'bad', sub: 'NEEDED > EXISTED', mark: 'x', markAt: '@P52:coupons+0.2', titleSize: 48 }, { out: '@P52:if-0.2' });
el('pn1b', 'panel', R4(1), 140, '@P52:oil-0.35', { w: 440, h: 470, title: 'OIL', icon: 'tank', iconS: 160, tone: 'accent', sub: 'NEEDED > EXISTED', mark: 'x', markAt: '@P52:oil+0.2', titleSize: 48 }, { out: '@P52:if-0.2' });
el('pn1c', 'panel', R4(1) + 520, 140, '@P52:options-0.35', { w: 440, h: 470, title: 'OPTIONS', icon: 'ticket', iconS: 160, tone: 'good', sub: 'NEEDED > EXISTED', mark: 'x', markAt: '@P52:options+0.2', titleSize: 48 }, { out: '@P52:if-0.2' });
el('r52', 'headline', R4(1) + 40, 40, '@P52:if-0.2', { lines: ['A RETURN THAT NEEDS A', 'MARKET BIGGER THAN THE MARKET', [['IS NOT A RETURN.', 'bad']]], size: 96, under: 'bad', underAt: 1.2 });
bt('@P52', 'graphic-hero', 'q1', { move: 'whip', fill: 0.58, maxH: 600, sy: 470, pose: 'point' }); sf('@P52-0.2', 'swoosh_2', -11, 0.6); bt('@P52:does', 'zoom-on-number', 'q1', { fill: 0.6, maxH: 340, sy: 470 });
bt('@P52:more', 'graphic-hero', ['q1', 'pn1a', 'pn1b', 'pn1c'], { fill: 0.62, sx: 880, sy: 470, pose: 'point' }); bt('@P52:coupons', 'zoom-on-number', ['q1', 'pn1a'], { fill: 0.5, maxH: 740, sy: 480 }); bt('@P52:oil', 'zoom-on-number', ['q1', 'pn1b'], { fill: 0.5, maxH: 740, sy: 480 }); bt('@P52:options', 'zoom-on-number', ['q1', 'pn1c'], { fill: 0.5, maxH: 740, sy: 480 });
for (const w of ['coupons', 'oil', 'options']) { sf(`@P52:${w}-0.35`, 'pop_2', -9, 0.3); sf(`@P52:${w}+0.2`, 'wrong_buzzer_2', -11, 0.6); }
bt('@P52:if', 'graphic-hero', 'r52', { move: 'whip', fill: 0.62, maxH: 600, sy: 480, pose: 'point' }); sf('@P52:if-0.2', 'typewriter_2', -11, 2.0); bt('@P52:not', 'zoom-on-number', 'r52', { fill: 0.64, maxH: 520, sy: 480, pose: 'shock' }); sf('@P52:not', 'rubber_stamp_2', -5, 0.5); sk('@P52:not', 8);
// P53: question two, too smooth
el('q2', 'headline', R4(2), -380, '@P53-0.3', { kicker: 'QUESTION TWO', lines: [[['IS IT ', 'paper'], ['TOO SMOOTH?', 'accent']]], size: 96, under: null }, { out: '@P54-0.2' });
el('wig', 'chart', R4(2), 80, '@P53+0.0', { w: 1500, h: 560, title: '', series: [{ kind: 'noise', seed: 9, n: 150, drift: 0.004, vol: 0.075, tone: 'paper', at: '@P53:real', dur: 3.0, lin: true, w: 8, label: 'REAL MONEY WIGGLES', labelAt: '@P53:wiggles', lo: 0.05, hi: 0.9 }, { kind: 'smooth', seed: 3, y0: 0.07, y1: 0.78, tone: 'good', at: '@P53:if', dur: 3.0, lin: true, w: 12, label: 'NEVER A BAD MONTH', labelAt: '@P53:month+0.3', labelDy: 70 }], markX: { at: '@P53:that\'s', x: 0.66, y: 0.64 } }, { out: '@P54-0.2' });
el('story', 'stamp', R4(2) + 450, -60, '@P53:story-0.1', { text: 'NOT SKILL. A STORY.', tone: 'bad', size: 74 }, { rot: -0.06, out: '@P54-0.2' });
bt('@P53', 'graphic-hero', ['q2', 'wig'], { move: 'whip', fill: 0.62, maxH: 760, sy: 470, pose: 'point' }); sf('@P53-0.2', 'swoosh_2', -11, 0.6);
bt('@P53:real', 'zoom-on-number', 'wig', { fill: 0.62, maxH: 600, sy: 500, pose: 'point' }); sf('@P53:real', 'swipe_1', -12, 0.5); bt('@P53:wiggles', 'zoom-on-number', { x: R4(2) + 100, y: 80, w: 800, h: 500 }, { fill: 0.4, maxH: 560, sy: 500, rot: 0.01 });
bt('@P53:if', 'graphic-hero', 'wig', { fill: 0.6, maxH: 540, sy: 570, pose: 'idle', st: 'peek' }); sf('@P53:if', 'riser_2', -15, 2.6); bt('@P53:month', 'zoom-on-number', { x: R4(2) + 200, y: 20, w: 900, h: 560 }, { fill: 0.44, maxH: 560, sy: 500, pose: 'point' });
bt('@P53:that\'s', 'graphic-hero', ['wig', 'story'], { fill: 0.7, maxH: 640, sy: 490, pose: 'shock' }); sf('@P53:that\'s', 'wrong_buzzer_1', -8, 0.7); sf('@P53:story-0.1', 'rubber_stamp_2', -4, 0.5); sk('@P53:story', 8);
// P54: question three, who checks it
el('q3', 'headline', R4(3), -300, '@P54-0.3', { kicker: 'QUESTION THREE', lines: [[['CAN ANYONE ELSE ', 'paper'], ['CHECK IT?', 'accent']]], size: 84, under: null }, { out: '@P55-0.2' });
el('pn3a', 'panel', R4(3) - 520, 140, '@P54:ponzi-0.35', { w: 460, h: 520, title: 'PONZI', icon: 'index', iconS: 170, tone: 'ink', sub: 'BOOKS ON INDEX CARDS', titleSize: 56 }, { out: '@P55-0.2' });
el('pn3b', 'panel', R4(3), 140, '@P54:inspectors-0.35', { w: 460, h: 520, title: 'DE ANGELIS', icon: 'pair', iconS: 170, tone: 'accent', sub: 'INSPECTORS CLOSE TO HIM', titleSize: 56 }, { out: '@P55-0.2' });
el('pn3c', 'panel', R4(3) + 520, 140, '@P54:madoff-0.35', { w: 460, h: 520, title: 'MADOFF', icon: 'loop', iconS: 170, tone: 'bad', sub: 'MADOFF → MADOFF', titleSize: 56 }, { out: '@P55-0.2' });
bt('@P54', 'graphic-hero', 'q3', { move: 'whip', fill: 0.58, maxH: 600, sy: 470, pose: 'point' }); sf('@P54-0.2', 'swoosh_2', -11, 0.6);
bt('@P54:ponzi', 'graphic-hero', ['q3', 'pn3a', 'pn3b', 'pn3c'], { fill: 0.62, sx: 880, sy: 470, pose: 'point' }); bt('@P54:books', 'zoom-on-number', ['q3', 'pn3a'], { fill: 0.5, maxH: 740, sy: 480 });
bt('@P54:inspectors', 'zoom-on-number', ['q3', 'pn3b'], { fill: 0.5, maxH: 740, sy: 480 }); bt('@P54:madoff', 'zoom-on-number', ['q3', 'pn3c'], { fill: 0.5, maxH: 740, sy: 480, pose: 'shock' }); bt('@P54:so', 'graphic-hero', ['pn3a', 'pn3b', 'pn3c'], { fill: 0.62, sx: 880, sy: 470, pose: 'shrug' });
for (const w of ['ponzi', 'inspectors', 'madoff']) sf(`@P54:${w}-0.35`, 'pop_2', -9, 0.3); sf('@P54:index', 'paper_slam_2', -12, 0.5); sf('@P54:close', 'click_2', -10, 0.3); sf('@P54:homework', 'rubber_stamp_2', -6, 0.5);
// P55: three frauds, three folders stamped, three ticks
el('cl55', 'checklist', R4(4) - 760, 60, '@P55-0.3', { lockOpen: -9, w: 900, h: 600, rows: [{ show: -9, t: 'MORE THAN EXISTS?', tick: '@P55:three' }, { show: -9, t: 'TOO SMOOTH?', tick: '@P55:different' }, { show: -9, t: 'CAN ANYONE ELSE CHECK IT?', tick: '@P55:one' }] }, { out: '@P56-0.2' });
el('fd1', 'folder', R4(4) + 150, 60, '@P55-0.1', { tab: '1920', title: 'THE COUPON', icon: 'coupon', tone: 'bad', stamp: 'CAUGHT BY MATH', stampAt: '@P55:three+0.3' }, { scale: 0.62, out: '@P56-0.2' });
el('fd2', 'folder', R4(4) + 610, 60, '@P55+0.1', { tab: '1963', title: 'THE TANK', icon: 'tank', tone: 'accent', stamp: 'CAUGHT BY MATH', stampAt: '@P55:eras' }, { scale: 0.62, out: '@P56-0.2' });
el('fd3', 'folder', R4(4) + 1070, 60, '@P55+0.2', { tab: '2008', title: 'THE FUND', icon: 'chart', tone: 'good', stamp: 'CAUGHT BY MATH', stampAt: '@P55:pattern' }, { scale: 0.62, out: '@P56-0.2' });
bt('@P55', 'graphic-hero', ['cl55', 'fd1', 'fd2', 'fd3'], { move: 'whip', fill: 0.84, sy: 480, pose: 'point' }); sf('@P55-0.2', 'swoosh_2', -11, 0.6);
for (const [w, k] of [['three', 'fd1'], ['different', 'fd2'], ['one', 'fd3']]) { sf(`@P55:${w}`, 'click_1', -8, 0.3); sf(`@P55:${w}+0.05`, 'ding_2', -11, 0.7); }
sf('@P55:three+0.3', 'rubber_stamp_2', -5, 0.5); sf('@P55:eras', 'rubber_stamp_2', -5, 0.5); sf('@P55:pattern', 'rubber_stamp_2', -5, 0.5);
bt('@P55:three', 'zoom-on-number', 'fd1', { fill: 0.2, maxH: 480, sy: 500 }); bt('@P55:eras', 'zoom-on-number', 'fd2', { fill: 0.2, maxH: 480, sy: 500 }); bt('@P55:pattern', 'zoom-on-number', 'fd3', { fill: 0.2, maxH: 480, sy: 500, pose: 'shock' });
bt('@P55:number', 'graphic-hero', ['cl55', 'fd1', 'fd2', 'fd3'], { fill: 0.84, sy: 480, pose: 'point' });
// P56: a perfect chart, what would it take for it to be true?
el('perf', 'chart', R4(5), 170, '@P56-0.3', { w: 1300, h: 500, title: '', series: [{ kind: 'smooth', seed: 7, y0: 0.06, y1: 0.86, tone: 'good', at: '@P56+0.2', dur: 2.4, lin: true, w: 12 }] }, { out: '@P57>' });
el('ask56', 'headline', R4(5), -250, '@P56:ask#2-0.2', { lines: ['WHAT WOULD IT TAKE', [['FOR THIS TO BE ', 'paper'], ['TRUE?', 'accent']]], size: 96, under: 'accent', underAt: 1.0 }, { out: '@P57>' });
bt('@P56', 'graphic-hero', 'perf', { move: 'whip', fill: 0.58, maxH: 640, sy: 520, pose: 'chin' }); sf('@P56-0.2', 'swoosh_2', -11, 0.6); sf('@P56+0.2', 'riser_2', -16, 2.4);
bt("@P56:don't", 'presenter-front', 'perf', { fill: 0.58, pose: 'talk', sx: 800 }); bt('@P56:ask#2', 'graphic-hero', ['ask56', 'perf'], { fill: 0.66, maxH: 800, sy: 480, pose: 'point' }); sf('@P56:ask#2-0.2', 'typewriter_2', -10, 2.0);
bt('@P56:true', 'zoom-on-number', 'ask56', { fill: 0.56, maxH: 400, sy: 440, pose: 'chin' }); sf('@P56:true', 'deep_boom_2', -8, 0.4); sk('@P56:true', 6);
// P57: subscribe, comment, watch the tank
el('tankthumb', 'panel', R4(5) + 1000, 80, '@P57:then-0.4', { w: 460, h: 440, title: 'THE TANK THAT\nFOOLED AMEX', icon: 'tank', iconS: 150, tone: 'accent', sub: 'WATCH NEXT', titleSize: 44, fill: 'navy' }, { out: '@P57>' });
el('askc', 'bubble', 1150, 560, '@P57:comments-0.3', { l1: 'WHICH RED FLAG', l2: 'WOULD CATCH YOU FIRST?', size: 40, tail: 'right' }, { layer: 'screen', out: '@P57:then-0.1' });
el('sub', 'follow', 1470, 870, '@P57:subscribe+0.05', { press: 1.0, labels: ['SUBSCRIBE', '✓ SUBSCRIBED'] }, { layer: 'screen', out: '@P57:then-0.1' });
bt('@P57', 'presenter-front', ['perf', 'ask56'], { fill: 0.62, maxH: 800, sy: 480, pose: 'talk', sx: 800, dur: 1.0 });
po('@P57:subscribe', 'follow', [1470, 870]); po('@P57:comments', 'you'); po('@P57:then', 'point'); sf('@P57:subscribe+0.05', 'pop_2', -9, 0.3); sf('@P57:subscribe+1.05', 'click_1', -8, 0.3); sf('@P57:subscribe+1.1', 'success_chime_1', -12, 1.2);
sf('@P57:comments-0.3', 'pop_1', -9, 0.3); bt('@P57:then', 'side-by-side', 'tankthumb', { fill: 0.3, maxH: 520, sx: 820, sy: 500, st: 'corner', pose: 'point' }); sf('@P57:then-0.4', 'swoosh_1', -11, 0.6); sf('@P57:tank', 'pop_2', -8, 0.3);
// END CARD (15 s): wordmark, two YouTube end-screen slots, storyteller waving, music
const END0 = '@P57>+0.3';
el('wm', 'text', 960, 140, '@P57>+0.2', { lines: [[['BAD MATH', 'paper']]], size: 150, shadow: true }, { layer: 'screen' });
el('slots', 'endslots', 0, 0, '@P57>+0.4', { rl: 'WATCH NEXT', cl: 'SUBSCRIBE' }, { layer: 'screen' });
bt(END0, 'wide', { x: XE, y: 0, w: 1000, h: 600 }, { move: 'whip', dur0: 0.9, fill: 0.5, sy: 470, st: { x: 1075, y: 1064, s: 1.05, layer: 'front' }, pose: 'wave', stDur: 0.9, arc: 0.2 }); sf('@P57>+0.1', 'swoosh_1', -9, 0.8); sf('@P57>+0.7', 'success_chime_2', -12, 1.4);
