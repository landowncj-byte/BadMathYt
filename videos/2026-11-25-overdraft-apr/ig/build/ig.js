// IG/FB cut. Content in y 250-1250.
function i_hook(c, t) {
  c.fillStyle = INK; c.fillRect(0, 0, W, H); rays(c, t);
  slam(c, lin(t, -.1, .12), 540, 520, () => { c.shadowColor = RED; c.shadowBlur = 50; hero(c, '$34', 0, 0, 470, RED, 800, 'Anton', 400, -.03); });
  slam(c, lin(t, 0, .2), 540, 790, () => hero(c, 'TO BORROW $24', 0, 0, 130, PAPER, 960, 'Anton', 400, .01));
  slam(c, lin(t, .1, .3), 540, 940, () => hero(c, 'FOR 3 DAYS', 0, 0, 160, HL, 900, 'Anton', 400, -.02));
}
function i_apr(c, t) {
  c.fillStyle = INK; c.fillRect(0, 0, W, H); rays(c, t);
  slam(c, lin(t, 5.05, 5.15), 540, 440, () => hero(c, "THAT'S", 0, 0, 110, PAPER));
  slam(c, lin(t, 5.24, 5.36), 540, 650, () => { c.shadowColor = RED; c.shadowBlur = 50; hero(c, '17,000%', 0, 0, 280, RED, 990, 'Anton', 400, -.03); });
  slam(c, lin(t, 6.58, 6.7), 540, 880, () => hero(c, 'INTEREST', 0, 0, 170, HL, 900, 'Anton', 400, .02));
}
function i_pay(c, t) {
  bg(c, t, 'rgba(255,59,48,.10)');
  slam(c, lin(t, 7.57, 7.7), 540, 420, () => hero(c, 'PAYDAY LENDERS', 0, 0, 120, PAPER, 940));
  slam(c, lin(t, 8.3, 8.45), 540, 545, () => hero(c, 'CHARGE LESS', 0, 0, 150, RED, 940, 'Anton', 400, -.02));
  const BX = 90, FULL = 860, k1 = eo(lin(t, 7.9, 8.4)), k2 = eo(lin(t, 8.6, 9.3));
  txt(c, 'PAYDAY ≈ 700% (TYPICAL)', BX, 720, '800 30px JBM', PAPER, 'left'); c.fillStyle = HL; c.fillRect(BX, 745, Math.max(6, 700 / 17000 * FULL * k1), 56);
  txt(c, 'OVERDRAFT 17,000%', BX, 850, '800 30px JBM', RED, 'left'); const g = c.createLinearGradient(BX, 0, BX + FULL, 0); g.addColorStop(0, RED); g.addColorStop(1, '#ff8a80'); c.fillStyle = g; c.fillRect(BX, 875, FULL * k2, 90);
  if (t > 8.55) { const f = back(lin(t, 8.55, 8.8)); c.save(); c.translate(720, 700); c.scale(f, f); txt(c, 'x24', 0, 0, '400 110px Anton', GREEN); c.restore(); }
}
function i_prot(c, t) {
  bg(c, t, 'rgba(255,59,48,.12)');
  slam(c, lin(t, 9.71, 9.85), 540, 430, () => hero(c, 'AND THEY CALL IT', 0, 0, 100, PAPER, 940));
  slam(c, lin(t, 10.32, 10.45), 540, 570, () => hero(c, '“PROTECTION”', 0, 0, 170, RED, 960, 'Anton', 400, -.02));
  shield(c, t, 540, 880, .85, lin(t, 10.5, 10.9), 0);
}
function i_bs(c, t) {
  bg(c, t, 'rgba(255,59,48,.14)');
  stampN(c, [["THAT'S NOT", 120], ['PROTECTION,', 120]], 540, 520, PAPER, -.04, lin(t, 11.28, 11.4), 'rgba(11,15,20,.85)', 860);
  stampN(c, [["THAT'S", 190], ['BULLSH*T', 230]], 540, 880, RED, .035, lin(t, 12.52, 12.64), 'rgba(11,15,20,.9)', 900);
}
function i_send(c, t) {
  bg(c, t, 'rgba(47,107,255,.14)');
  slam(c, lin(t, 13.4, 13.5), 540, 440, () => hero(c, 'SEND TO YOUR', 0, 0, 120, PAPER, 940));
  slam(c, lin(t, 13.9, 14.0), 540, 570, () => hero(c, 'BROKE FRIEND', 0, 0, 150, HL, 940, 'Anton', 400, -.02));
  if (t > 13.45 && t < 14.9) { const u = eo(lin(t, 13.45, 14.8)); const x = lerp(120, 940, u), y = 860 - Math.sin(u * Math.PI) * 120 - u * 80; c.save(); c.globalAlpha = 1 - lin(t, 14.5, 14.9); plane(c, x, y, -.25 - u * .2, 1.0); c.restore(); }
  const bk = back(lin(t, 15.2, 15.5)); if (bk > 0) bookmark(c, 400, 850, .9, HL, bk);
  slam(c, lin(t, 15.4, 15.55), 700, 880, () => hero(c, 'SAVE IT', 0, 0, 150, GREEN, 520, 'Anton', 400, .04));
  const sk = back(lin(t, 14.9, 15.15)); if (sk > 0) { c.save(); c.translate(540, 700); c.scale(sk, sk); txt(c, '· SEND TO YOUR BROKE FRIEND · SAVE IT ·', 0, 0, '800 24px JBM', 'rgba(245,243,238,.8)'); c.restore(); }
}
const CFG = { DUR: 17.33,
  SCENES: [[0, 4.75, i_hook], [4.75, 7.57, i_apr], [7.57, 9.71, i_pay], [9.71, 11.24, i_prot], [11.24, 13.41, i_bs], [13.41, 99, i_send]],
  st: { pos: { x: 850, y: 1330, s: .88 }, timeline: [[0, 'shock'], [4.8, 'shock'], [7.6, 'point'], [9.7, 'shrug'], [11.3, 'shock'], [13.4, 'you'], [15.2, 'point']], enterAt: -1 },
  cap: { x: 430, y: 1125, w: 680, size: 74, lh: 84 },
  GLITCH: [[0, .4, 1, 'd'], [1.13, 1.25, .4], [5.24, 5.5, .8], [8.6, 8.75, .4], [10.9, 11.1, .7], [12.52, 12.8, .9], [17.03, 17.33, 1, 'r']],
  SHAKE: [[0, .4, 28], [1.13, .2, 14], [2.79, .2, 12], [5.24, .5, 34], [8.6, .25, 16], [10.9, .3, 20], [12.52, .5, 34]],
  PZ: [[0, .08], [5.24, .25], [12.52, .22], [10.9, .06]],
  hud: (c, t) => { wordmark(c); footnote(c, 1212, 17); } };
