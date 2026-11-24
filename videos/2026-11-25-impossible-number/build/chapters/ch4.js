// CHAPTER 4 — THE IMPOSSIBLE NUMBER TEST (P51-P57) + 15 s END CARD.
Engine.chapter(4, () => {
  const ROWS = ['DOES IT NEED MORE THAN EXISTS?', 'IS IT TOO SMOOTH?', 'CAN ANYONE ELSE CHECK IT?'];
  const CASES = [['PONZI · 1920', 'COUPONS', 0], ['DE ANGELIS · 1963', 'OIL', 1], ['MADOFF · 2008', 'OPTIONS', 2]];
  function caseIcon(c, i, x, y, s) { c.save(); c.translate(x, y); if (i === 0) coupon(c, 0, 0, s * 1.2, -.1); else if (i === 1) tank(c, 0, s * .5, s * .7, s * .9, { fill: .6 }); else chartIcon(c, 0, 0, s * 1.1, s * .8, GREEN, 8); c.restore(); }
  function miniCases(c, x, y, k0, stamps) { // three stacked case folders; k0 = [t0,t1,t2] appear times
    CASES.forEach(([name, what, i], j) => { const k = back(lin(stamps.t, k0[j], k0[j] + .3)); if (k <= 0) return; c.save(); c.translate(x, y + (j - 1) * 215); c.scale(k, k);
      folder(c, 0, 0, 480, 150, 'CASE 0' + (i + 1), { rot: [-.02, .015, -.01][j], draw: (c2, w, h) => { c2.fillStyle = 'rgba(11,15,20,.85)'; rr(c2, -w / 2 + 14, -h / 2 + 14, 120, h - 28, 8); c2.fill(); caseIcon(c2, i, -w / 2 + 74, 0, 70); txt(c2, name, -w / 2 + 150, -18, '800 24px JBM', BRN, 'left'); txt(c2, what, -w / 2 + 150, 24, '400 40px Anton', BRN2, 'left'); } });
      if (stamps.s) stamp(c, 'CAUGHT BY MATH', 30, 20, 40, RED, -.12, lin(stamps.t, stamps.s[j], stamps.s[j] + .15)); c.restore(); });
  }
  function header(c, t, t0, n, title) { const k = eo(lin(t, t0, t0 + .3)); c.save(); c.globalAlpha = k; c.translate(0, (1 - k) * -30); rr(c, 100, 128, 190, 56, 10); c.fillStyle = RED; c.fill(); txt(c, 'CHECK ' + n, 195, 157, '400 38px Anton', PAPER); txt(c, title, 320, 157, '400 66px Anton', PAPER, 'left'); c.restore(); }

  // ---------- P51: the checklist returns, padlock opens, "all three" cases line up
  const p51 = P('P51').start, t3 = W('P51', 'three'), tAll = W('P51', 'caught');
  Engine.hit(t3, { shake: 10, punch: .03 }); Engine.cue(t3, 'unlock');
  Engine.scene('P51', 'P51', (c, t, lt) => {
    bgGrid(c, t, 'rgba(255,59,48,.05)'); const rows = ROWS.map((r, i) => ({ label: r, reveal: lin(t, t3 + .2 + i * .25, t3 + .5 + i * .25) }));
    checklist(c, 640, 490, { k: lin(t, p51, p51 + .35), rows, rot: -.025 });
    const la = 1 - eo(lin(t, tAll - .1, tAll + .2)); if (la > 0) { c.save(); c.globalAlpha = la; c.translate(1290, 520); glow(c, 0, 40, 300, lin(t, t3, t3 + .4) > .5 ? GREEN : RED, .3); padlock(c, 0, 0, 280, lin(t, t3, t3 + .5)); c.restore(); }
    miniCases(c, 1290, 520, [tAll + .1, tAll + .45, W('P51', 'all', 1) > tAll ? W('P51', 'all') + .1 : tAll + .8], { t });
  });

  // ---------- P52: check 1
  const t1c = W('P52', 'coupons'), t1o = W('P52', 'oil'), t1p = W('P52', 'options'), t1r = W('P52', 'return', 2);
  [t1c, t1o, t1p].forEach(x => Engine.hit(x, { shake: 8, punch: .02 })); Engine.hit(t1r, { shake: 22, punch: .05, glitch: .6, glitchDur: .3 });
  Engine.scene('P52', 'P52', (c, t, lt) => {
    bgGrid(c, t, 'rgba(255,59,48,.05)'); header(c, t, P('P52').start + .1, 1, 'DOES IT NEED MORE THAN EXISTS?');
    [[t1c, 'COUPONS', '160,000,000', '27,000', 160e6, 27e3, 0], [t1o, 'OIL (TONS)', '900,000', '55,000', 900e3, 55e3, 1], [t1p, 'OPTIONS', '123', '20', 123, 20, 2]].forEach(([tt, name, need, ex, nv, ev, i], j) => {
      const k = back(lin(t, tt, tt + .3)); if (k <= 0) return; const x = 400 + j * 460; c.save(); c.translate(x, 465); c.scale(k, k);
      c.fillStyle = 'rgba(14,20,27,.94)'; rr(c, -210, -270, 420, 560, 18); c.fill(); c.strokeStyle = 'rgba(245,243,238,.25)'; c.lineWidth = 4; c.stroke();
      caseIcon(c, i, 0, -170, 110); txt(c, name, 0, -80, '400 44px Anton', PAPER);
      txt(c, 'NEEDED', -180, -20, '700 22px JBM', GREEN, 'left'); txt(c, need, 180, -20, '800 40px JBM', GREEN, 'right');
      const bp = eo(lin(t, tt + .15, tt + .75)); c.fillStyle = GREEN; c.fillRect(-180, 5, 360 * bp, 26);
      txt(c, 'EXISTED', -180, 75, '700 22px JBM', RED, 'left'); txt(c, ex, 180, 75, '800 40px JBM', RED, 'right'); c.fillStyle = RED; c.fillRect(-180, 100, Math.max(6, 360 * ev / nv) * bp, 26);
      stamp(c, 'NEEDED > EXISTED', 0, 215, 34, RED, -.04, lin(t, tt + .6, tt + .75)); c.restore(); });
    stamp(c, 'NOT A RETURN', 840, 818, 84, RED, -.05, lin(t, t1r, t1r + .18));
  });

  // ---------- P53: check 2
  const wig = (x, w, h) => 0.5 - ((x / w) * .55 + (Math.sin(x * .045) * .07 + Math.sin(x * .11 + 1) * .05 + (hash(Math.floor(x / 9)) - .5) * .12));
  const tW = W('P53', 'wiggles'), tN = W('P53', 'never'), tSk = W('P53', 'skill'), tSt = W('P53', 'story');
  Engine.hit(tSk, { shake: 14, punch: .04 });
  Engine.scene('P53', 'P53', (c, t, lt) => {
    bgGrid(c, t, 'rgba(255,59,48,.05)'); header(c, t, P('P53').start + .1, 2, 'IS IT TOO SMOOTH?');
    const pw = 700, ph = 460, y0 = 230;
    for (const [x0, label, col] of [[100, 'REAL MONEY', GREEN], [880, 'PERFECT CHART', GREEN]]) { c.fillStyle = 'rgba(14,20,27,.94)'; rr(c, x0, y0, pw, ph + 70, 16); c.fill(); c.strokeStyle = 'rgba(245,243,238,.2)'; c.lineWidth = 3; c.stroke(); txt(c, label, x0 + pw / 2, y0 + 38, '800 30px JBM', PAPER);
      c.strokeStyle = 'rgba(245,243,238,.08)'; c.lineWidth = 2; for (let g = 1; g < 5; g++) { c.beginPath(); c.moveTo(x0 + 20, y0 + 70 + g * ph / 5); c.lineTo(x0 + pw - 20, y0 + 70 + g * ph / 5); c.stroke(); } }
    const dw = lin(t, P('P53').start + .5, tW + .9); c.strokeStyle = GREEN; c.lineWidth = 7; c.lineJoin = 'round'; c.beginPath(); for (let x = 0; x <= (pw - 60) * dw; x += 4) { const y = y0 + 70 + ph * .95 - (wig(x, pw - 60, ph) + .0) * ph * .95 - ph * .0; x ? c.lineTo(100 + 30 + x, y) : c.moveTo(130, y); } c.stroke();
    const sw = lin(t, tN - .1, tN + 1.0); if (sw > 0) { c.save(); c.shadowColor = GREEN; c.shadowBlur = 24; c.strokeStyle = GREEN; c.lineWidth = 9; c.lineCap = 'round'; c.beginPath(); c.moveTo(910, y0 + ph + 30); c.lineTo(910 + (pw - 60) * sw, y0 + ph + 30 - (ph - 40) * sw); c.stroke(); c.restore(); }
    const xk = back(lin(t, tSk, tSk + .25)); if (xk > 0) { c.save(); c.translate(1230, y0 + 300); c.scale(xk, xk); c.strokeStyle = RED; c.lineWidth = 36; c.lineCap = 'round'; c.beginPath(); c.moveTo(-110, -110); c.lineTo(110, 110); c.moveTo(110, -110); c.lineTo(-110, 110); c.stroke(); c.restore(); }
    stamp(c, "JUST A STORY", 1230, 790, 62, RED, -.05, lin(t, tSt, tSt + .15)); stamp(c, 'REAL MONEY WIGGLES', 450, 790, 54, GREEN, .03, lin(t, tW, tW + .15));
  });

  // ---------- P54: check 3
  const tP = W('P54', 'ponzi'), tI = W('P54', 'inspectors'), tM = W('P54', 'madoff');
  [tP, tI, tM].forEach(x => Engine.hit(x, { shake: 8, punch: .02 }));
  Engine.scene('P54', 'P54', (c, t, lt) => {
    bgGrid(c, t, 'rgba(255,59,48,.05)'); header(c, t, P('P54').start + .1, 3, 'CAN ANYONE ELSE CHECK IT?');
    [[tP, 0, 'PONZI', 'INDEX CARDS'], [tI, 1, 'DE ANGELIS', 'CLOSE TIES TO HIS INSPECTORS'], [tM, 2, 'MADOFF', 'CHECKED HIS OWN HOMEWORK']].forEach(([tt, i, name, sub], j) => {
      const k = back(lin(t, tt - .05, tt + .3)); if (k <= 0) return; c.save(); c.translate(380 + j * 460, 510); c.scale(k, k);
      c.fillStyle = 'rgba(14,20,27,.94)'; rr(c, -210, -290, 420, 600, 18); c.fill(); c.strokeStyle = 'rgba(245,243,238,.25)'; c.lineWidth = 4; c.stroke();
      c.save(); c.translate(0, -120);
      if (i === 0) { for (let n = 0; n < 5; n++) { c.save(); c.rotate((n - 2) * .09); c.translate((n - 2) * 22, (n % 2) * 8); c.fillStyle = '#EFE7D2'; c.fillRect(-90, -60, 180, 120); c.strokeStyle = '#7da0c8'; c.lineWidth = 2; for (let l = -30; l <= 40; l += 22) { c.beginPath(); c.moveTo(-80, l); c.lineTo(80, l); c.stroke(); } c.strokeStyle = '#b33'; c.beginPath(); c.moveTo(-80, -38); c.lineTo(80, -38); c.stroke(); c.fillStyle = '#2a2a2a'; for (let l = 0; l < 3; l++) c.fillRect(-70, -26 + l * 22, 40 + hash(n * 5 + l) * 70, 5); c.restore(); } }
      else if (i === 1) { for (const s of [-1, 1]) { c.fillStyle = s < 0 ? '#2c3e66' : '#5a4a3a'; c.beginPath(); c.arc(s * 100, -35, 36, 0, 7); c.fill(); rr(c, s * 100 - 50, 5, 100, 75, [24, 24, 0, 0]); c.fill(); }
        c.fillStyle = PAPER; c.save(); c.translate(0, 38); c.fillRect(-90, -14, 180, 28); c.beginPath(); c.arc(0, 0, 22, 0, 7); c.fill(); c.strokeStyle = INK; c.lineWidth = 3; for (let f = -2; f <= 2; f++) { c.beginPath(); c.moveTo(f * 8 - 4, -14); c.lineTo(f * 8 - 4, 14); c.stroke(); } c.restore(); }
      else { for (const [x, lab] of [[-95, 'MADOFF'], [95, 'MADOFF']]) { c.fillStyle = '#1d2733'; rr(c, x - 80, -50, 160, 100, 12); c.fill(); c.strokeStyle = GREY; c.lineWidth = 3; c.stroke(); txt(c, lab, x, 0, '800 24px JBM', PAPER); }
        c.strokeStyle = RED; c.lineWidth = 8; c.lineCap = 'round'; c.beginPath(); c.moveTo(-95, -60); c.bezierCurveTo(-95, -150, 95, -150, 95, -64); c.stroke(); c.fillStyle = RED; c.beginPath(); c.moveTo(95, -56); c.lineTo(78, -86); c.lineTo(112, -86); c.closePath(); c.fill(); }
      c.restore(); txt(c, name, 0, 60, '400 54px Anton', PAPER); txt(c, sub, 0, 120, '700 22px JBM', GREY);
      const xk = lin(t, tt + .55, tt + .75); if (xk > 0) { c.save(); c.globalAlpha = clamp(xk * 3); const s = lerp(1.8, 1, eo(xk)); c.translate(0, 215); c.scale(s, s); c.strokeStyle = RED; c.lineWidth = 12; c.lineCap = 'round'; c.beginPath(); c.arc(0, 0, 38, 0, 7); c.moveTo(-26, -26); c.lineTo(26, 26); c.stroke(); c.restore(); }
      c.restore(); });
  });

  // ---------- P55: all three boxes tick, folders stamped CAUGHT BY MATH
  const tF = W('P55', 'frauds'), tE = W('P55', 'eras'), tPt = W('P55', 'pattern'), tNum = W('P55', 'number'), tEx = W('P55', 'exist');
  [tF, tE, tPt].forEach(x => { Engine.hit(x, { shake: 12, punch: .03 }); Engine.cue(x, 'stamp'); }); [tNum, (tNum + tEx) / 2, tEx].forEach(x => Engine.hit(x, { shake: 14, punch: .04 }));
  Engine.scene('P55', 'P55', (c, t, lt) => {
    bgGrid(c, t, 'rgba(255,59,48,.06)'); const rows = ROWS.map((r, i) => ({ label: r, reveal: 1, tick: lin(t, [tF, tE, tPt][i], [tF, tE, tPt][i] + .3) }));
    checklist(c, 640, 490, { k: lin(t, P('P55').start, P('P55').start + .3), rows, rot: -.025 });
    miniCases(c, 1290, 520, [tF + .2, tE + .2, tPt + .2], { t, s: [tNum, (tNum + tEx) / 2, tEx] });
  });

  // ---------- P56: a perfect chart + the question
  const tPf = W('P56', 'perfect'), tQ0 = W('P56', 'ask', 2) - .05, tQ1 = Wend('P56', 'true');
  Engine.hit(tPf, { punch: .04 });
  Engine.scene('P56', 'P56', (c, t, lt) => {
    bgGrid(c, t, 'rgba(0,210,106,.045)'); const k = eo(lin(t, P('P56').start, P('P56').start + .35));
    c.save(); c.globalAlpha = k; c.fillStyle = 'rgba(14,20,27,.94)'; rr(c, 220, 140, 1240, 520, 16); c.fill(); c.strokeStyle = 'rgba(245,243,238,.2)'; c.lineWidth = 3; c.stroke(); c.restore();
    c.strokeStyle = 'rgba(245,243,238,.08)'; c.lineWidth = 2; for (let g = 1; g < 6; g++) { c.beginPath(); c.moveTo(240, 140 + g * 86); c.lineTo(1440, 140 + g * 86); c.stroke(); }
    const d = lin(t, tPf - .2, tPf + 1.1); if (d > 0) { c.save(); c.shadowColor = GREEN; c.shadowBlur = 30; c.strokeStyle = GREEN; c.lineWidth = 11; c.lineCap = 'round'; c.beginPath(); c.moveTo(270, 620); c.lineTo(270 + 1140 * d, 620 - 440 * d); c.stroke(); c.restore(); }
    txt(c, 'PERFECT CHART', 840, 185, '800 28px JBM', 'rgba(245,243,238,.6)');
    typedText(c, 'WHAT WOULD IT TAKE FOR THIS TO BE TRUE?', 840, 770, '400 80px Anton', HL, t, tQ0, tQ1);
  });

  // ---------- P57: CTA (storyteller follow button + comment bubble, mini thumbnail of the salad-oil short)
  const tSub = W('P57', 'subscribe'), tCm = W('P57', 'comments'), tWatch = W('P57', 'watch');
  Engine.st.follow = [tSub - .3, tCm - .15]; Engine.st.followLabel = ['SUBSCRIBE', '✓ SUBSCRIBED']; Engine.st.followScale = 1.15; Engine.st.followAt = [1560, 640];
  Engine.bubble(tCm - .05, tWatch - .1, 'WHICH RED FLAG WOULD', 'CATCH YOU?', [1460, 560]);
  Engine.hit(tSub + .45, { punch: .03 }); Engine.cue(tSub + .45, 'click'); Engine.hit(tWatch, { shake: 8, punch: .03 });
  Engine.scene('P57', 'P57', (c, t, lt) => {
    bgGrid(c, t, 'rgba(255,59,48,.06)'); glow(c, 600, 420, 700, 'rgba(255,59,48,.4)', .18);
    const hk = eo(lin(t, P('P57').start, P('P57').start + .4)); c.save(); c.globalAlpha = hk; txt(c, 'NEXT CASE', 480, 190, '400 130px Anton', PAPER); c.fillStyle = RED; c.fillRect(100, 270, 760 * hk, 10); c.restore();
    // comment box mock
    const ck = back(lin(t, tCm - .2, tCm + .2)); if (ck > 0) { c.save(); c.translate(480, 540); c.scale(ck, ck); c.fillStyle = 'rgba(245,243,238,.95)'; rr(c, -380, -90, 760, 180, 20); c.fill(); Storyteller.head(c, -290, 0, 46);
      txt(c, 'COMMENTS', -220, -50, '800 22px JBM', 'rgba(11,15,20,.55)', 'left'); const ph = 'Add a comment…'; txt(c, ph, -220, 10, '700 40px Inter', 'rgba(11,15,20,.45)', 'left'); if (Math.floor(t * 2.2) % 2 === 0) { c.fillStyle = RED; c.fillRect(-220 + 260, -14, 4, 50); } c.restore(); }
    // mini thumbnail of the salad-oil short (9:16)
    const tk = back(lin(t, tWatch - .05, tWatch + .35)); if (tk > 0) { c.save(); c.translate(1130, 480 + Math.sin(t * 2) * 6); c.scale(tk, tk); c.rotate(.05); c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 30; c.shadowOffsetY = 14;
      const g = c.createLinearGradient(0, -250, 0, 250); g.addColorStop(0, '#1b2330'); g.addColorStop(1, '#0B0F14'); c.fillStyle = g; rr(c, -146, -260, 292, 520, 22); c.fill(); c.shadowColor = 'transparent'; c.strokeStyle = PAPER; c.lineWidth = 5; c.stroke();
      tank(c, 0, 80, 150, 190, { fill: .35, oil: '#3b8fd6' }); txt(c, 'THE TANK THAT', 0, -208, '400 34px Anton', PAPER); txt(c, 'FOOLED', 0, -172, '400 34px Anton', PAPER); txt(c, 'AMERICAN EXPRESS', 0, -136, '400 34px Anton', HL); stamp(c, 'NOT OIL', 0, 150, 52, RED, -.14, 1); txt(c, 'SHORT', 0, 228, '800 20px JBM', GREY); c.restore(); }
  });

  // ---------- END CARD (15 s): empty 16:9 + circle rectangles for YouTube end-screen elements, music only
  Engine.endCard((c, t, lt) => {
    bgGrid(c, t, 'rgba(255,59,48,.05)'); glow(c, 960, 160, 800, 'rgba(255,214,10,.5)', .12);
    const k = back(lin(lt, .1, .5)); c.save(); c.translate(960, 130); c.scale(k, k); Storyteller.head(c, -450, 0, 80); c.letterSpacing = '6px'; txt(c, 'BAD MATH', 40, 8, '400 150px Anton', PAPER); c.letterSpacing = '0px'; c.restore();
    const dash = (fn) => { c.save(); c.setLineDash([18, 12]); c.strokeStyle = 'rgba(245,243,238,.45)'; c.lineWidth = 4; fn(); c.stroke(); c.restore(); };
    const a = eo(lin(lt, .4, .8)); c.save(); c.globalAlpha = a;
    txt(c, 'WATCH NEXT', 520, 268, '400 56px Anton', HL); c.fillStyle = 'rgba(245,243,238,.05)'; c.fillRect(120, 310, 800, 450); dash(() => { c.beginPath(); c.rect(120, 310, 800, 450); });
    txt(c, 'SUBSCRIBE', 1400, 268, '400 56px Anton', RED); c.fillStyle = 'rgba(245,243,238,.05)'; c.beginPath(); c.arc(1400, 535, 170, 0, 7); c.fill(); dash(() => { c.beginPath(); c.arc(1400, 535, 170, 0, 7); });
    c.restore(); Engine.drawStoryteller(c, t);
    const fo = lin(lt, 15 - 1.5, 15); if (fo > 0) { c.fillStyle = `rgba(0,0,0,${fo})`; c.fillRect(0, 0, VW, VH); }
  });
});
