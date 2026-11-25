// TikTok cut. depends on yt.js helpers (phoneBank, check, docCard in lib)
function t_hook(c, t) {
  c.fillStyle = INK; c.fillRect(0, 0, W, H); rays(c, t);
  slam(c, lin(t, -.1, .12), 540, 440, () => hero(c, '$34 TO BORROW', 0, 0, 150, PAPER, 960, 'Anton', 400, -.02));
  slam(c, lin(t, -.05, .18), 540, 590, () => { c.shadowColor = GREEN; c.shadowBlur = 40; hero(c, '$24?', 0, 0, 250, GREEN, 700, 'Anton', 400, .03); });
  receipt(c, t, 540, 740, 580, [['BANK · OVERDRAFT', '', .15, 'h'], ['LOAN', '$24.00', .35, 'n'], ['TERM', '3 DAYS', .6, 'n'], ['FEE', '$34.00', .95, 'r']], .02);
}
function t_days(c, t) {
  bg(c, t, 'rgba(0,210,106,.12)');
  const a = back(lin(t, 2.62, 2.9)), b = back(lin(t, 3.9, 4.2)), f = lin(t, 4.62, 4.74);
  c.save(); c.translate(300, 560); c.scale(a, a); shadowBox(c, -220, -140, 440, 280, 28, '#141b24', GREEN); txt(c, 'BORROW', 0, -85, '800 30px JBM', 'rgba(245,243,238,.7)'); hero(c, '$24', 0, 30, 190, GREEN, 380); c.restore();
  c.save(); c.translate(780, 560); c.scale(b, b); shadowBox(c, -220, -140, 440, 280, 28, '#141b24', PAPER); txt(c, 'FOR', 0, -85, '800 30px JBM', 'rgba(245,243,238,.7)'); hero(c, '3 DAYS', 0, 30, 150, PAPER, 380); c.restore();
  for (let i = 0; i < 3; i++) if (t > 4.2) { const k = lin(t, 4.2 + i * .12, 4.5 + i * .12); c.fillStyle = HL; c.globalAlpha = k; c.beginPath(); c.arc(640 + i * 70, 800, 14, 0, 7); c.fill(); c.globalAlpha = 1; }
  stampN(c, [['FEE: $34', 170]], 540, 940, RED, -.06, f, 'rgba(11,15,20,.85)', 900);
}
function t_phone(c, t) {
  bg(c, t, 'rgba(47,107,255,.14)'); phoneBank(c, t, { y: 800, bank: { toggle: 1, hi: .6 + .4 * Math.sin(t * 8), bal: t > 5.7 ? '-$34.00' : '$1,240.18', balCol: t > 5.7 ? RED : INK } });
  const k = back(lin(t, 5.55, 5.85)); if (k > 0) { c.save(); c.translate(540, 520); c.scale(k, k); shadowBox(c, -400, -70, 800, 140, 26, '#fff', RED); txt(c, 'BANK · OVERDRAFT FEE', -360, -28, '800 26px JBM', '#44536b', 'left'); txt(c, '-$34.00', 360, 18, '800 66px JBM', RED, 'right'); c.restore(); }
  slam(c, lin(t, 6.42, 6.55), 540, 360 + 0, () => 0);
}
function t_doc(c, t) {
  bg(c, t, 'rgba(47,107,255,.14)'); const k = back(lin(t, 7.3, 7.6)); docCard(c, 540, 760, 800, 640, -.025, k);
  c.save(); c.translate(540, 760); c.rotate(-.025); c.scale(lerp(.8, 1, k), lerp(.8, 1, k));
  for (let i = 0; i < 4; i++) { c.fillStyle = '#dde2ea'; rr(c, -364, -200 + i * 36, 700 * (.85 - i * .1), 18, 9); c.fill(); }
  const f = back(lin(t, 8.6, 8.9)); if (f > 0) { c.save(); c.translate(0, 90); c.scale(f, f); txt(c, '$34 ÷ $24 × 365 ÷ 3', 0, 0, '400 86px Anton', NAVY); c.restore(); }
  if (t > 9.5) { const g = back(lin(t, 9.5, 9.8)); c.save(); c.translate(0, 210); c.scale(g, g); txt(c, '= THE MATH', 0, 0, '400 80px Anton', RED); c.restore(); }
  c.restore();
}
function t_boom(c, t) {
  c.fillStyle = INK; c.fillRect(0, 0, W, H); rays(c, t);
  slam(c, lin(t, 10.28, 10.4), 540, 430, () => hero(c, 'ABOUT', 0, 0, 100, PAPER));
  slam(c, lin(t, 10.45, 10.57), 540, 650, () => { c.shadowColor = RED; c.shadowBlur = 50; hero(c, '17,000%', 0, 0, 270, RED, 980, 'Anton', 400, -.03); });
  slam(c, lin(t, 12.07, 12.2), 540, 860, () => hero(c, 'APR', 0, 0, 200, HL, 700, 'Anton', 400, .02));
  stampN(c, [["THE CFPB'S", 90], ['OWN NUMBER', 90]], 540, 1070, GREEN, -.07, lin(t, 12.3, 12.42), 'rgba(11,15,20,.85)', 760);
}
function t_card(c, t) {
  bg(c, t, 'rgba(0,210,106,.12)');
  const ck = back(lin(t, 13.1, 13.4)); if (ck > 0) creditCard(c, 540, 560, ck * 1.15, -.04, '22%');
  const fk = back(lin(t, 13.9, 14.2)); if (fk > 0) { c.save(); c.translate(540, 840); c.scale(fk, fk); txt(c, '$24 × 22% × 3 ÷ 365', 0, 0, '800 44px JBM', PAPER); c.restore(); }
  const rk = back(lin(t, 14.6, 14.9)); if (rk > 0) { c.save(); c.translate(300, 1000); c.scale(rk, rk); hero(c, '= $0.04', 0, 0, 130, GREEN, 520); c.restore(); }
  for (let i = 0; i < 2; i++) { const d = t - 15.14 - i * .15; if (d < 0) continue; const y = Math.min(1060, -100 + d * d * 6000); coin(c, 640 + i * 90, y, 46, 0, 1, '¢'); }
  if (t > 15.5) { const kk = back(lin(t, 15.5, 15.75)); c.save(); c.translate(700, 940); c.scale(kk, kk); c.rotate(-.06); stamp(c, '4¢', 0, 0, 100, GREEN, 0, 1, 'rgba(11,15,20,.85)'); c.restore(); }
}
function t_vs(c, t) {
  c.fillStyle = INK; c.fillRect(0, 0, W, H); rays(c, t, '0,210,106'); rays(c, t, '255,59,48');
  slam(c, lin(t, 16.775, 16.9), 540, 520, () => { c.shadowColor = GREEN; c.shadowBlur = 40; hero(c, '4¢', 0, 0, 330, GREEN, 700, 'Anton', 400, -.03); });
  slam(c, lin(t, 17.72, 17.85), 540, 735, () => hero(c, 'VS', 0, 0, 110, PAPER, 300));
  slam(c, lin(t, 18.2, 18.35), 540, 960, () => { c.shadowColor = RED; c.shadowBlur = 50; hero(c, '$34', 0, 0, 380, RED, 760, 'Anton', 400, .03); });
  if (t > 17.0) for (let i = 0; i < 2; i++) coin(c, 170 + i * 80, 1180, 36, 0, 1, '¢'); if (t > 18.3) cashStack(c, 880, 1230, 7, lin(t, 18.3, 18.8), '$34');
}
function t_comment(c, t) {
  bg(c, t, 'rgba(255,214,10,.12)');
  const k = back(lin(t, 19.72, 20.05)); c.save(); c.translate(540, 560); c.scale(k, k); c.rotate(-.025); shadowBox(c, -410, -190, 820, 380, 50, PAPER);
  c.fillStyle = PAPER; c.beginPath(); c.moveTo(-250, 180); c.lineTo(-300, 300); c.lineTo(-120, 185); c.fill();
  txt(c, 'HOW MUCH?', 0, -60, '400 190px Anton', INK, 'center'); txt(c, 'COMMENT', 0, 90, '400 130px Anton', RED, 'center'); c.restore();
  // fee counter
  const n = Math.min(10, Math.max(0, Math.floor((t - 20.6) / .22) + 1)); if (t > 20.6) { c.save(); c.translate(540, 1000); shadowBox(c, -400, -120, 800, 240, 28, '#141b24', RED); txt(c, 'FEES ADD UP · ' + n + ' × $34', 0, -68, '800 30px JBM', 'rgba(245,243,238,.8)'); const kk = 1 + .12 * Math.exp(-((t - 20.6) % .22) * 14); c.scale(kk, kk); hero(c, '$' + fmt(n * 34), 0, 22, 150, RED, 700); c.restore(); }
}
function t_follow(c, t) {
  bg(c, t, 'rgba(255,59,48,.12)');
  slam(c, lin(t, 23.02, 23.15), 540, 470, () => hero(c, 'MORE MATH', 0, 0, 170, PAPER, 940));
  slam(c, lin(t, 24.0, 24.12), 540, 650, () => hero(c, 'YOUR BANK HATES', 0, 0, 120, RED, 940, 'Anton', 400, -.02));
  phoneBank(c, t, { y: 1000, w: 340, h: 520, bank: { toggle: t > 24.5 ? 0 : 1, bal: '$1,240.18' } });
}
const CFG = { DUR: 25.51,
  SCENES: [[0, 2.6, t_hook], [2.6, 5.1, t_days], [5.1, 7.27, t_phone], [7.27, 10.2, t_doc], [10.2, 13.0, t_boom], [13.0, 16.75, t_card], [16.75, 19.7, t_vs], [19.7, 23.0, t_comment], [23.0, 99, t_follow]],
  st: { timeline: [[0, 'shock'], [2.7, 'point'], [5.1, 'shock'], [7.3, 'chin'], [10.3, 'shock'], [13.1, 'point'], [16.75, 'shock'], [19.7, 'you'], [23.02, 'follow']], bubbles: [], follow: [23.1, 25.5], enterAt: -1 },
  cap: { x: 420, y: 1345, w: 600, size: 68, lh: 76 },
  GLITCH: [[0, .4, 1, 'd'], [4.62, 4.75, .5], [10.45, 10.75, .7], [18.2, 18.35, .5], [25.2, 25.51, 1, 'r']],
  SHAKE: [[0, .4, 26], [4.62, .3, 18], [5.6, .2, 10], [10.45, .5, 34], [12.3, .25, 16], [16.775, .25, 16], [18.2, .4, 26]],
  PZ: [[0, .07], [4.62, .06], [10.45, .25], [16.775, .05], [18.2, .09]],
  hud: (c, t) => { whatIf(c); progress(c, t); footnote(c, 1488, 17); } };
