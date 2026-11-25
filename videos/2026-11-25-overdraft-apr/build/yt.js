// YouTube Short cut: "Overdraft, decoded". Times from sentences/silence-checked words.
const phoneBank = (c, t, o = {}, inner) => phone(c, o.x ?? 540, o.y ?? 800, o.w ?? 500, o.h ?? 800, (c2, sw, sh) => { bankScreen(c2, t, sw, sh, o.bank || {}); if (inner) inner(c2, sw, sh); });

// ---- S0 0-4.66 frame 0: phone, toggle ON, 17,000% slam
function sHook(c, t) {
  c.fillStyle = INK; c.fillRect(0, 0, W, H); rays(c, t);
  const pulse = 1 + .1 * Math.exp(-Math.max(0, t - 2.8) * 7) * (t > 2.8 ? 1 : 0);
  const hi = .55 + .45 * Math.sin(t * 7);
  phoneBank(c, t, { y: 800, bank: { toggle: 1, hi, bal: '$1,240.18' } });
  slam(c, lin(t, -.1, .12), 540, 520, () => { c.save(); c.scale(pulse, pulse); c.rotate(-.04); c.shadowColor = RED; c.shadowBlur = 40; hero(c, '17,000%', 0, 0, 250, RED, 960); c.restore(); });
  slam(c, lin(t, .04, .2), 540, 690, () => hero(c, 'APR', 0, 0, 150, HL, 600, 'Anton', 400, .03));
  // arrow to the toggle
  const ak = back(lin(t, .5, .85)); if (ak > 0) { c.save(); c.translate(790, 1010); c.scale(ak, ak); c.rotate(Math.sin(t * 8) * .06); txt(c, '← YOU', 0, 0, '400 60px Anton', HL); c.restore(); }
}
// ---- S1 4.66-6.7 "you said yes": opt-in popup, finger taps YES
function sYes(c, t) {
  bg(c, t, 'rgba(47,107,255,.14)');
  const k = back(lin(t, 4.7, 5.0)), tap = 5.55, tapped = t >= tap, closing = eo(lin(t, 5.95, 6.25));
  const pop = (c2, sw, sh) => {
    c2.fillStyle = `rgba(11,15,20,${.55 * clamp(k * 2) * (1 - closing)})`; c2.fillRect(0, 0, sw, sh);
    if (closing >= 1) return; c2.save(); c2.translate(sw / 2, lerp(900, 470, k) + closing * 500); c2.globalAlpha = 1 - closing;
    shadowBox(c2, -210, -170, 420, 340, 28, '#fff'); txt(c2, 'OVERDRAFT COVERAGE', 0, -128, '800 25px JBM', NAVY);
    txt(c2, 'Let debit purchases go through', 0, -76, '700 21px Inter', '#44536b'); txt(c2, 'when you are out of money?', 0, -46, '700 21px Inter', '#44536b'); txt(c2, 'Fees apply.', 0, -16, '700 21px Inter', '#44536b');
    const press = tapped ? 1 - .06 * Math.exp(-(t - tap) * 14) : 1;
    c2.fillStyle = '#e3e8f0'; rr(c2, -190, 42, 170, 80, 18); c2.fill(); txt(c2, 'NO THANKS', -105, 83, '800 22px JBM', '#6b7a90');
    c2.save(); c2.translate(105, 82); c2.scale(press, press); c2.fillStyle = tapped ? GREEN : BLUE; rr(c2, -95, -40, 190, 80, 18); c2.fill(); txt(c2, tapped ? 'YES ✓' : 'YES', 0, 2, '800 40px Inter', '#fff'); c2.restore(); c2.restore(); };
  phoneBank(c, t, { y: 800, bank: { toggle: tapped && t > 6.0 ? 1 : 1, hi: 0 } }, pop);
  // finger: from lower right to YES button (canvas approx 645, 1000)
  const fx = lerp(900, 646, eo(lin(t, 4.95, 5.5))), fy = lerp(1480, 1010, eo(lin(t, 4.95, 5.5))); const out = eo(lin(t, 5.8, 6.2));
  if (t >= 4.95) { c.save(); c.globalAlpha = 1 - out; finger(c, fx + out * 200, fy + out * 400, -.38, tapped ? Math.exp(-(t - tap) * 10) : 0); c.restore(); ripple(c, 646, 1010, lin(t, tap, tap + .45), 'rgba(0,210,106,'); }
  if (t > 6.0) { const kk = back(lin(t, 6.0, 6.3)); c.save(); c.translate(540, 400); c.scale(kk, kk); c.rotate(-.04); hero(c, 'YOU OPTED IN', 0, 0, 100, GREEN, 900); c.restore(); }
}
// ---- S2 6.7-13.9 CFPB study doc card
function sStudy(c, t) {
  bg(c, t, 'rgba(47,107,255,.14)');
  const k = back(lin(t, 6.72, 7.1)); const W2 = 800, H2 = 760;
  docCard(c, 540, 790, W2, H2, -.025, k);
  c.save(); c.translate(540, 790); c.rotate(-.025); const s = lerp(.8, 1, k); c.scale(s, s); c.globalAlpha = clamp(k * 4);
  // skeleton rows scanned by a bar
  for (let i = 0; i < 5; i++) { c.fillStyle = '#dde2ea'; rr(c, -W2 / 2 + 36, -H2 / 2 + 150 + i * 36, W2 * (.8 - i * .08), 18, 9); c.fill(); }
  const sc = lin(t, 7.0, 10.3); if (sc > 0 && sc < 1) { c.fillStyle = 'rgba(47,107,255,.25)'; c.fillRect(-W2 / 2 + 20, -H2 / 2 + 140 + ((t * 1.3) % 1) * 190, W2 - 40, 26); }
  // stat 1
  const k1 = back(lin(t, 10.47, 10.75)), k2 = back(lin(t, 11.99, 12.3));
  if (k1 > 0) { c.save(); c.translate(0, 40); c.scale(k1, k1); txt(c, 'TYPICAL OVERDRAFT', -W2 / 2 + 40, -52, '800 26px JBM', '#44536b', 'left'); txt(c, '$24 OR LESS', -W2 / 2 + 40, 20, '400 130px Anton', NAVY, 'left'); c.restore(); }
  if (k2 > 0) { c.save(); c.translate(0, 235); c.scale(k2, k2); txt(c, 'PAID BACK IN', -W2 / 2 + 40, -52, '800 26px JBM', '#44536b', 'left'); txt(c, '3 DAYS', -W2 / 2 + 40, 20, '400 130px Anton', RED, 'left'); c.restore(); }
  c.restore();
  if (t > 10.5) { const kk = back(lin(t, 10.5, 10.8)); c.save(); c.globalAlpha = kk; check(c, 905, 748, .7, GREEN, lin(t, 10.6, 11.0)); c.restore(); }
  if (t > 12.3) { check(c, 905, 953, .7, GREEN, lin(t, 12.3, 12.7)); }
}
function check(c, x, y, s, col, k) { c.save(); c.translate(x, y); c.scale(s, s); c.strokeStyle = col; c.lineWidth = 16; c.lineCap = 'round'; c.lineJoin = 'round'; c.beginPath(); c.moveTo(-34, 2); c.lineTo(-10, 28); c.lineTo(36, -26); c.setLineDash([140]); c.lineDashOffset = 140 * (1 - k); c.stroke(); c.restore(); }
// ---- S3 13.9-18.7 receipt + like heart
function sReceipt(c, t) {
  bg(c, t, 'rgba(255,59,48,.10)');
  const sl = 1.28; c.save(); c.translate(500, 360); c.scale(sl, sl);
  const slide = t < 14.0 ? 0 : 1; // paper prints out of the slot line by line
  receipt(c, t, 0, 0, 600, [['BANK · DEBIT CARD', '', 14.0, 'h'], ['', '', 14.25, 'd'], ['COFFEE', '$4.50', 14.45, 'n'], ['OVERDRAFT FEE', '$34.00', 14.92, 'r'], ['', '', 15.45, 'd'], ['TOTAL', '$38.50', 15.62, 'n']], .0);
  c.restore();
  // MEME #3 red circle + arrow at the fee line
  const ck = lin(t, 15.4, 15.85); redCircle(c, 500, 360 + (24 + 74 + 34 + 64 + 46) * sl, 395, 82, ck);
  if (t > 15.7) { arrowTo(c, 760, 990, 850, 740, eo(lin(t, 15.7, 16.1))); const kk = back(lin(t, 15.9, 16.2)); c.save(); c.translate(560, 1040); c.scale(kk, kk); c.rotate(-.04); txt(c, 'THE MEDIAN FEE', 0, 0, '400 64px Anton', RED); c.restore(); }
  // LIKE: heart pulse
  if (t >= 16.82) { const u = t - 16.82, out = 1 - lin(t, 18.3, 18.6); const s = 1 + .22 * Math.exp(-u * 8); c.save(); c.globalAlpha = out; heart(c, 220, 1100, 2.0 * s, RED);
    for (let i = 0; i < 4; i++) { const v = (u * .9 + i * .25) % 1; c.globalAlpha = out * (1 - v); heart(c, 220 + (i - 1.5) * 70 + Math.sin(v * 6 + i) * 14, 1000 - v * 200, .6, '#ff7a72'); } c.restore(); }
}
// ---- S4 18.7-25.8 formula
function sFormula(c, t) {
  bg(c, t, 'rgba(255,214,10,.12)');
  const hk = back(lin(t, 18.9, 19.15)); if (hk > 0) { c.save(); c.translate(540, 430); c.scale(hk, hk); hero(c, 'FEE = INTEREST', 0, 0, 130, HL, 920); c.restore(); }
  const chips = [['LOAN', '$24', GREEN, 19.45], ['TIME', '3 DAYS', PAPER, 19.85], ['FEE', '$34', RED, 20.25]]; const fade = 1 - lin(t, 21.0, 21.35);
  chips.forEach(([a, b, col, at], i) => { const k = back(lin(t, at, at + .25)); if (k <= 0 || fade <= 0) return; c.save(); c.globalAlpha = fade; c.translate(540, 640 + i * 140); c.scale(k, k); shadowBox(c, -330, -55, 660, 110, 22, '#141b24', 'rgba(245,243,238,.25)'); txt(c, a, -290, 0, '800 34px JBM', 'rgba(245,243,238,.7)', 'left'); txt(c, b, 290, 4, '400 84px Anton', col, 'right'); c.restore(); });
  const toks = [['$34', 21.10, RED, 'FEE'], ['÷ $24', 21.72, GREEN, 'LOAN'], ['× 365', 23.0, PAPER, 'DAYS / YEAR'], ['÷ 3', 24.24, HL, 'DAYS']];
  c.font = '400 120px Anton'; const gap = 36; const ws = toks.map(tk => c.measureText(tk[0]).width); const tot = ws.reduce((a, b) => a + b, 0) + gap * 3; let sc = Math.min(1, 940 / tot); let x0 = 540 - tot * sc / 2;
  c.save(); c.translate(x0, 640); c.scale(sc, sc); let px = 0;
  toks.forEach(([s, at, col, lab], i) => { const k = back(lin(t, at, at + .18)); if (k > 0) { c.save(); c.translate(px + ws[i] / 2, 0); c.scale(k, k); hero(c, s, 0, 0, 120, col, 999); txt(c, lab, 0, 100, '800 26px JBM', 'rgba(245,243,238,.75)'); c.restore(); } px += ws[i] + gap; });
  c.restore();
  if (t > 21.1) { const ek = back(lin(t, 25.0, 25.3)); const v = Math.round(17236 * eo(lin(t, 25.0, 25.7))); c.save(); c.translate(540, 960); c.scale(ek, ek); if (ek > 0) { hero(c, '= ' + fmt(v) + '%', 0, 0, 170, RED, 900); } c.restore();
    txt(c, 'SIMPLE ANNUALIZED · NO COMPOUNDING', 540, 1090, '700 24px JBM', 'rgba(245,243,238,.6)'); }
}
// ---- S5 25.8-30.7 17,000% APR boom
function sBoom(c, t) {
  c.fillStyle = INK; c.fillRect(0, 0, W, H); rays(c, t);
  slam(c, lin(t, 25.83, 26.0), 540, 420, () => hero(c, 'ABOUT', 0, 0, 100, PAPER));
  const k = lin(t, 26.4, 26.52); slam(c, k, 540, 640, () => { c.shadowColor = RED; c.shadowBlur = 50; hero(c, '17,000%', 0, 0, 270, RED, 980, 'Anton', 400, -.03); });
  slam(c, lin(t, 27.5, 27.65), 540, 850, () => hero(c, 'APR', 0, 0, 200, HL, 700, 'Anton', 400, .02));
  stampN(c, [["THE CFPB'S", 100], ['OWN NUMBER', 100]], 540, 1070, GREEN, -.07, lin(t, 29.02, 29.14), 'rgba(11,15,20,.85)', 760);
  if (t > 26.4) for (let i = 0; i < 10; i++) { const u = ((t - 26.4) * 1.1 + i * .1) % 1; c.save(); c.globalAlpha = (1 - u) * .8; txt(c, '%', 540 + (hash(i) - .5) * 900, 640 - u * 260 + (hash(i + 3) - .5) * 200, '400 90px Anton', RED); c.restore(); }
}
// ---- S6 30.7-34.3 share: plane + friend balance $2.00
function sShare(c, t) {
  bg(c, t, 'rgba(47,107,255,.14)');
  const bal = t >= 33.28 ? '$2.00' : '$ · · ·'; const pk = back(lin(t, 30.75, 31.05));
  phone(c, 640, 790, 440, 700, (c2, sw, sh) => bankScreen(c2, t, sw, sh, { bal, balCol: t >= 33.28 ? RED : '#9aa5b5', toggle: 1, label: 'OVERDRAFT PROTECTION:' }), Math.sin(t * 40) * .004 * (t > 32.1 && t < 32.4 ? 1 : 0));
  if (t >= 30.75) { const press = t > 30.92 && t < 31.1 ? .92 : 1; c.save(); c.translate(230, 1060); c.scale(pk * press, pk * press); shadowBox(c, -150, -50, 300, 100, 50, BLUE); txt(c, 'SEND', 28, 4, '800 44px Inter', '#fff'); plane(c, -85, 0, -.3, .38, '#fff'); c.restore(); ripple(c, 230, 1060, lin(t, 30.92, 31.35)); }
  if (t > 31.0 && t < 32.4) { const u = eo(lin(t, 31.05, 32.2)); const P = (a, b, cc) => (1 - u) * (1 - u) * a + 2 * u * (1 - u) * b + u * u * cc; const px = P(230, 330, 620), py = P(1060, 560, 760), tx = 2 * (1 - u) * (330 - 230) + 2 * u * (620 - 330), ty = 2 * (1 - u) * (560 - 1060) + 2 * u * (760 - 560);
    c.save(); c.globalAlpha = 1 - lin(t, 32.1, 32.4); c.strokeStyle = 'rgba(245,243,238,.5)'; c.lineWidth = 4; c.setLineDash([12, 14]); c.beginPath(); for (let k = 0; k <= u; k += .04) { const x = (1 - k) * (1 - k) * 230 + 2 * k * (1 - k) * 330 + k * k * 620, y = (1 - k) * (1 - k) * 1060 + 2 * k * (1 - k) * 560 + k * k * 760; k ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke(); c.setLineDash([]);
    plane(c, px, py, Math.atan2(ty, tx), .8 * (1 - .4 * u)); c.restore(); }
  const lk = back(lin(t, 32.5, 32.8)); if (lk > 0) { c.save(); c.translate(540, 410); c.scale(lk, lk); hero(c, 'THEIR BALANCE', 0, 0, 100, PAPER, 900); c.restore(); }
  if (t >= 33.28) { const kk = back(lin(t, 33.28, 33.45)); c.save(); c.translate(660, 600); c.rotate(-.05); c.scale(kk, kk); c.shadowColor = RED; c.shadowBlur = 30; hero(c, '$2.00', 0, 0, 170, RED, 500); c.restore(); }
}
// ---- S7 34.3-40.9 scale swap bar chart
function sScale(c, t) {
  bg(c, t);
  const BASE = 1150, CX = 210, OX = 440; const th = lin(t, 38.4, 39.4); const z = t < 38.4 ? 1 : Math.exp(Math.log(.045) * eio(th));
  if (t < 35.3) slam(c, lin(t, 34.4, 34.55), 540, 520, () => hero(c, 'FOR SCALE', 0, 0, 190, PAPER, 900));
  const vCard = 22 * eo(lin(t, 35.2, 36.3)), vOD = 17000 * Math.pow(lin(t, 38.06, 38.5), 2.2);
  const hC = vCard * .9 * z, hO = vOD * .9 * z;
  // ticks (visible once the camera pulls out)
  const ta = lin(z, .6, .2); if (ta > 0) for (const v of [5000, 10000, 15000]) { const y = BASE - v * .9 * z; c.strokeStyle = `rgba(245,243,238,${.25 * ta})`; c.lineWidth = 2; c.setLineDash([14, 10]); c.beginPath(); c.moveTo(90, y); c.lineTo(990, y); c.stroke(); c.setLineDash([]); txt(c, fmt(v) + '%', 990, y - 18, '700 24px JBM', `rgba(245,243,238,${.7 * ta})`, 'right'); }
  c.strokeStyle = 'rgba(245,243,238,.6)'; c.lineWidth = 4; c.beginPath(); c.moveTo(90, BASE); c.lineTo(990, BASE); c.stroke();
  // bars
  if (t >= 35.2) { c.fillStyle = GREEN; c.fillRect(CX - 65, BASE - Math.max(hC, 1.5), 130, Math.max(hC, 1.5)); }
  if (t < 38.06) { c.save(); c.strokeStyle = 'rgba(255,59,48,.6)'; c.lineWidth = 4; c.setLineDash([16, 12]); c.strokeRect(OX - 65, BASE - 300, 130, 300); c.restore(); txt(c, '?', OX, BASE - 150, '400 120px Anton', 'rgba(255,59,48,.6)'); }
  else { const g = c.createLinearGradient(0, BASE - hO, 0, BASE); g.addColorStop(0, '#ff7a72'); g.addColorStop(1, RED); c.fillStyle = g; c.fillRect(OX - 65, BASE - hO, 130, hO); }
  txt(c, 'CREDIT CARD', CX, BASE + 36, '800 24px JBM', PAPER); txt(c, 'OVERDRAFT', OX, BASE + 36, '800 24px JBM', PAPER);
  const lk = back(lin(t, 36.73, 36.95)); if (lk > 0) { c.save(); c.translate(CX, BASE + 100); c.scale(lk, lk); hero(c, '22%', 0, 0, 90, GREEN, 260); c.restore(); if (t < 38.4) { c.save(); c.globalAlpha = lk; arrowTo(c, CX + 120, BASE - 90, CX + 80, BASE - 30, 1, GREEN); txt(c, 'THIS IS 22%', CX + 190, BASE - 120, '800 26px JBM', GREEN, 'left'); c.restore(); } }
  if (t > 39.2) { const kk = back(lin(t, 39.2, 39.5)); const ty = Math.max(BASE - hO, 410); c.save(); c.translate(530, ty + 40); c.scale(kk, kk); txt(c, 'OVERDRAFT', 0, -50, '800 30px JBM', HL, 'left'); hero(c, '17,000%', 0, 20, 130, RED, 460); c.restore(); }
  // MEME #18 glitch error dialog
  if (t > 38.95 && t < 40.7) errorDialog(c, lin(t, 38.95, 39.15) * (1 - lin(t, 40.5, 40.7)), 470, 700, 'ERROR: BAR TOO TALL');
  if (t > 38.1 && t < 38.5) { c.fillStyle = `rgba(255,255,255,${.35 * (1 - lin(t, 38.1, 38.5))})`; c.fillRect(0, 0, W, H); }
}
// ---- S8 40.9-46.99 same loan at credit card rates
function sCard(c, t) {
  bg(c, t, 'rgba(0,210,106,.12)');
  const k = back(lin(t, 40.92, 41.2)); c.save(); c.translate(540, 470); c.scale(k, k); shadowBox(c, -400, -90, 800, 180, 24, '#141b24', 'rgba(245,243,238,.25)');
  txt(c, 'THE SAME LOAN', -360, -45, '800 28px JBM', 'rgba(245,243,238,.7)', 'left');
  const a = lin(t, 41.3, 41.5), b = lin(t, 42.5, 42.7); c.globalAlpha = a; txt(c, '$24', -360, 30, '400 100px Anton', GREEN, 'left'); c.globalAlpha = b; txt(c, '3 DAYS', 360, 30, '400 100px Anton', PAPER, 'right'); c.restore();
  const ck = back(lin(t, 43.66, 43.95)); if (ck > 0) { creditCard(c, 540, 800, ck * 1.05, -.04, '22%'); }
  const fk = back(lin(t, 44.3, 44.6)); if (fk > 0) { c.save(); c.translate(540, 1010); c.scale(fk, fk); txt(c, '$24 × 22% × 3 ÷ 365', 0, 0, '800 44px JBM', PAPER); c.restore(); }
  const rk = back(lin(t, 45.2, 45.5)); if (rk > 0) { c.save(); c.translate(280, 1130); c.scale(rk, rk); hero(c, '= $0.04', 0, 0, 120, GREEN, 520); c.restore(); }
  // two coins drop onto the tray at "cents"
  for (let i = 0; i < 2; i++) { const d = t - 45.85 - i * .18; if (d < 0) continue; const y = Math.min(1150, -100 + d * d * 6000 + 0), bounceK = d > .22 ? Math.abs(Math.sin((d - .22) * 12)) * 26 * Math.exp(-(d - .22) * 4) : 0; coin(c, 640 + i * 90, Math.min(1150, y) - bounceK, 46, 0, 1, '¢'); }
  if (t > 46.1) { const kk = back(lin(t, 46.1, 46.35)); c.save(); c.translate(690, 1060); c.scale(kk, kk); c.rotate(-.06); stamp(c, '4¢', 0, 0, 90, GREEN, 0, 1, 'rgba(11,15,20,.85)'); c.restore(); }
}
// ---- S9 46.99-49.7 "4¢ vs $34" giant
function sVs(c, t) {
  c.fillStyle = INK; c.fillRect(0, 0, W, H); rays(c, t, '0,210,106'); rays(c, t, '255,59,48');
  slam(c, lin(t, 46.99, 47.12), 540, 520, () => { c.shadowColor = GREEN; c.shadowBlur = 40; hero(c, '4¢', 0, 0, 330, GREEN, 700, 'Anton', 400, -.03); });
  slam(c, lin(t, 47.94, 48.06), 540, 735, () => hero(c, 'VS', 0, 0, 110, PAPER, 300));
  slam(c, lin(t, 48.35, 48.5), 540, 960, () => { c.shadowColor = RED; c.shadowBlur = 50; hero(c, '$34', 0, 0, 380, RED, 760, 'Anton', 400, .03); });
  const ck = lin(t, 47.3, 47.8); for (let i = 0; i < 2; i++) if (t > 47.3) coin(c, 170 + i * 80, 1180, 36, 0, 1, '¢');
  if (t > 48.4) cashStack(c, 880, 1230, 7, lin(t, 48.4, 48.9), '$34');
}
// ---- S10 49.7-51.83 "and they call it protection"
function sEnd(c, t) {
  bg(c, t, 'rgba(255,59,48,.12)');
  const k1 = lin(t, 49.95, 50.1), k2 = lin(t, 50.35, 50.5); slam(c, k1, 540, 440, () => hero(c, 'AND THEY CALL IT', 0, 0, 100, PAPER, 940));
  slam(c, k2, 540, 600, () => hero(c, '“PROTECTION”', 0, 0, 175, RED, 960, 'Anton', 400, -.02));
  const crack = lin(t, 50.55, 50.8), split = back(lin(t, 50.8, 51.15));
  shield(c, t, 330, 960, .98, split > 0 ? 0 : crack, split > 0 ? split : 0);
}
