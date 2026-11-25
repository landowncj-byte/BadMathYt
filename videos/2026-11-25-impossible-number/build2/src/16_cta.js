// ---------------- woven CTA micro-moments (RULES §CTAs): small, on the voiced word, never a banner ----------------
// LIKE (P13b): heart pulse next to him
el('heart', 'heart', 1620, 760, '@P13b:like-0.15', { s: 64 }, { layer: 'screen', out: '@P13b:like+1.5' });
sf('@P13b:like-0.1', 'pop_2', -8, 0.3); sf('@P13b:like+0.35', 'ding_2', -11, 0.7); sf('@P13b:like+0.75', 'pop_1', -12, 0.3);
bt('@P13b', 'graphic-hero', ['q12', 'police'], { fill: 0.7, maxH: 700, sx: 860, sy: 480, st: 'corner', pose: 'you' });
po('@P13b:like', 'you');
bt('@P13b:bought', 'zoom-on-number', 'q12.line', { fill: 0.6, maxH: 420, sx: 860, sy: 540, st: 'corner', pose: 'point' });
bt('@P13b:most', 'zoom-on-number', 'police', { fill: 0.5, maxH: 300, sx: 860, sy: 480, st: 'corner', pose: 'shock' }); sf('@P13b:most', 'crowd_ooh_1', -16, 1.6);
// SEND (P29b): paper-plane flick from his hand
el('plane', 'plane', 1690, 930, '@P29b:send-0.05', { dx: 190, dy: -330 }, { layer: 'screen', out: '@P29b:send+1.5' });
sf('@P29b:send-0.05', 'swoosh_2', -9, 1.0);
bt('@P29b', 'graphic-hero', ['bars29', 'never'], { fill: 0.7, maxH: 700, sx: 860, sy: 480, st: 'corner', pose: 'you' });
po('@P29b:send', 'you');
bt('@P29b:friend', 'graphic-hero', 'bars29', { fill: 0.36, maxH: 600, sx: 860, sy: 520, st: 'corner', pose: 'point' });
bt('@P29b:receipt', 'zoom-on-number', 'never', { fill: 0.5, maxH: 300, sx: 860, sy: 440, st: 'corner', pose: 'shrug' }); sf('@P29b:receipt', 'paper_slam_2', -12, 0.5);
// SUBSCRIBE (P47b): he taps a small SUBSCRIBE button
el('sub47', 'follow', 1480, 880, '@P47b:subscribe-0.2', { press: 0.7, labels: ['SUBSCRIBE', '✓ SUBSCRIBED'] }, { layer: 'screen', out: '@P47b:subscribe+1.6' });
sf('@P47b:subscribe-0.15', 'pop_2', -9, 0.3); sf('@P47b:subscribe+0.55', 'click_1', -8, 0.3); sf('@P47b:subscribe+0.6', 'success_chime_1', -12, 1.2);
bt('@P47b', 'graphic-hero', 'bars47', { fill: 0.4, maxH: 640, sx: 860, sy: 500, st: 'corner', pose: 'follow' });
po('@P47b:subscribe', 'follow', [1480, 880]); po('@P47b:now+1.0', 'point');
bt('@P47b:because', 'zoom-on-number', 'bars47.down_top', { fill: 0.34, maxH: 420, sx: 860, sy: 400, st: 'corner', pose: 'point' });
bt('@P47b:where', 'graphic-hero', 'bars47', { fill: 0.4, maxH: 640, sx: 860, sy: 520, st: 'corner', pose: 'shock' }); sk('@P47b:apart', 10); sf('@P47b:apart', 'sub_drop_1', -9, 1.0);
