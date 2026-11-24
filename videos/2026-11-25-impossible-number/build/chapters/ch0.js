// COLD OPEN (P01-P07 incl. title card). Everything keyed to paragraph ids / words.
Engine.chapter(0, () => {
  const AMBER = '#FFB000';

  // ---------- P01: the 1991 trade ticket slams in, slow push, storyteller already on screen
  Engine.scene('P01', 'P01', (c, t, lt) => {
    bgGrid(c, t, 'rgba(255,59,48,.05)'); glow(c, 840, 490, 700, 'rgba(0,210,106,.35)', .25);
    c.save(); push(c, lt, P('P01').end - P('P01').start + .5, 1, 1.07, 840, 490);
    paperSlam(c, t, 0, 840, 490, 960, 620, -.025, '#EFE7D2', (c2, w, h) => ticketContent(c2, w, h, { pop: Math.max(0, 1 - lin(t, W('P01', '123') - .05, W('P01', '123') + .4)) * (t > W('P01', '123') - .05 ? 1 : 0) }));
    c.restore();
    stamp(c, 'CALL OPTIONS', 1380, 250, 44, GOLD, .12, lin(t, W('P01', 'call'), W('P01', 'call') + .15));
  });
  Engine.hit(.12, { shake: 22, punch: .05 }); Engine.cue(.1, 'paper-slam');
  Engine.hit(W('P01', '123'), { shake: 8, punch: .03 });

  // ---------- P02 + P03: tape counter 0 -> 20, split CLAIMED 123 vs EXISTED 20, 6x, calendar 1991 -> 2008
  const tTw = W('P02', 'twenty'), tSix = W('P03', 'six'), tSev = W('P03', 'seventeen'), tCalEnd = Math.max(tSev + 1.4, P('P03').end - .05);
  Engine.hit(tTw, { glitch: 1, glitchDur: .45, shake: 16, flash: 1 }); Engine.cue(tTw, 'sub-boom');
  Engine.hit(tSix, { shake: 12, punch: .04 }); Engine.hit(tSev, { punch: .03 });
  Engine.scene('P02', 'P03', (c, t, lt) => {
    bgGrid(c, t, 'rgba(0,210,106,.045)');
    const split = eo(lin(t, tTw + .12, tTw + .55)), cal = eo(lin(t, tSev - .05, tSev + .3));
    // --- Phase A: the exchange board
    if (split < 1) {
      c.save(); c.globalAlpha = 1 - split; c.translate(0, -split * 60);
      const bx = 840, by = 450, bw = 1220, bh = 640; const slide = eo(lin(lt, 0, .25));
      c.translate(0, (1 - slide) * 80); c.fillStyle = '#0e141b'; rr(c, bx - bw / 2, by - bh / 2, bw, bh, 18); c.fill(); c.strokeStyle = '#3a4656'; c.lineWidth = 6; c.stroke();
      c.fillStyle = '#1a222d'; rr(c, bx - bw / 2, by - bh / 2, bw, 70, [18, 18, 0, 0]); c.fill();
      txt(c, 'ENTIRE MARKET · PROCTER & GAMBLE CALLS · APR 16, 1991', bx, by - bh / 2 + 36, '700 28px JBM', AMBER);
      // scrolling tape
      c.save(); c.beginPath(); c.rect(bx - bw / 2 + 20, by - bh / 2 + 82, bw - 40, 44); c.clip(); const off = (t * 220) % 420;
      for (let i = -1; i < 5; i++) txt(c, 'PG CALLS ▪ TRADES ▪ ', bx - bw / 2 + 20 + i * 420 - off, by - bh / 2 + 104, '700 26px JBM', 'rgba(255,176,0,.55)', 'left'); c.restore();
      txt(c, 'TOTAL TRADED TODAY', bx, by - 170, '800 44px JBM', GREY);
      const v = Math.round(roll(t, P('P02').start + .25, tTw + .2, 20, 0, eio)), landed = t >= tTw + .2;
      const pop = landed ? 1 + .1 * (1 - lin(t, tTw + .2, tTw + .5)) : 1; c.save(); c.translate(bx, by + 50); c.scale(pop, pop); txt(c, String(v), 0, 0, '800 300px JBM', landed ? RED : AMBER); c.restore();
      // 20 option "contracts" lighting up
      for (let i = 0; i < 20; i++) { const x = bx - 9.5 * 50 + i * 50, on = v > i; c.fillStyle = on ? (landed ? RED : AMBER) : 'rgba(255,255,255,.1)'; rr(c, x - 18, by + 190, 36, 36, 6); c.fill(); }
      txt(c, 'OPTIONS CHANGED HANDS', bx, by + 262, '700 26px JBM', 'rgba(245,243,238,.6)');
      c.restore();
    }
    // --- Phase B/C/D: the split screen
    if (split > 0) {
      const dim = 1 - cal * .82, sc = 1 - cal * .22; c.save(); c.globalAlpha = dim; c.translate(840, 450); c.scale(sc, sc); c.translate(-840, -450);
      for (const [side, x0, label, num, col] of [[-1, 420, 'CLAIMED', '123', GREEN], [1, 1260, 'EXISTED', '20', RED]]) {
        const cx = x0 + side * (1 - split) * 760; c.fillStyle = 'rgba(14,20,27,.92)'; rr(c, cx - 260, 160, 520, 600, 18); c.fill(); c.strokeStyle = col; c.lineWidth = 6; c.stroke();
        txt(c, label, cx, 215, '400 62px Anton', PAPER); glow(c, cx, 400, 260, col, .22); txt(c, num, cx, 395, '800 230px JBM', col);
        const bh = num === '123' ? 130 : 130 * 20 / 123, bp = eo(lin(t, tTw + .45, tTw + 1.0)); c.fillStyle = col; c.fillRect(cx - 60, 735 - bh * bp, 120, bh * bp); txt(c, num === '123' ? 'OPTIONS CLAIMED' : 'OPTIONS TRADED', cx, 565, '700 24px JBM', 'rgba(245,243,238,.65)');
      }
      if (t < tSix) txt(c, 'VS', 840, 450, '400 70px Anton', 'rgba(245,243,238,.55)'); c.restore();
      // 6x between them
      const sk = back(lin(t, tSix, tSix + .3)) * (1 - cal);
      if (sk > 0) { c.save(); c.translate(840, 420); c.scale(sk, sk); glow(c, 0, 0, 230, HL, .35); txt(c, '6', -42, 0, '400 200px Anton', HL); txt(c, '×', 62, 8, '800 120px JBM', HL); txt(c, '123 ÷ 20 = 6.15', 0, 130, '800 30px JBM', PAPER); c.restore(); }
    }
    // --- calendar 1991 -> 2008
    if (cal > 0) {
      c.save(); c.globalAlpha = cal; c.translate(840, 440 + (1 - cal) * 60); const p = lin(t, tSev, tCalEnd) * 17, yr = 1991 + Math.min(17, Math.round(p)), flip = Math.abs(Math.cos(Math.PI * p)), done = p >= 17;
      c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 40; c.shadowOffsetY = 18; c.fillStyle = PAPER; rr(c, -270, -290, 540, 600, 22); c.fill(); c.shadowColor = 'transparent';
      c.fillStyle = RED; rr(c, -270, -290, 540, 90, [22, 22, 0, 0]); c.fill(); txt(c, 'YEAR', 0, -245, '400 52px Anton', PAPER);
      c.fillStyle = '#d8d3c6'; for (let i = 0; i < 6; i++) { c.beginPath(); c.arc(-200 + i * 80, -290, 9, 0, 7); c.fill(); }
      c.save(); c.translate(0, -30); c.scale(1, Math.max(.04, done ? 1 : flip)); txt(c, String(yr), 0, 0, '400 250px Anton', INK); c.restore();
      txt(c, '1991  →  2008', 0, 215, '800 40px JBM', 'rgba(11,15,20,.6)');
      c.restore(); stamp(c, '17 YEARS', 1330, 330, 80, RED, .1, lin(t, tCalEnd - .1, tCalEnd + .12));
    }
  });

  // ---------- P04: $0 -> $65,000,000,000
  const tL = W('P04', 'billion');
  Engine.hit(tL, { shake: 32, punch: .07, glitch: .8, glitchDur: .3 }); Engine.cue(tL, 'sub-boom');
  Engine.scene('P04', 'P04', (c, t, lt) => {
    bgGrid(c, t, 'rgba(255,59,48,.07)'); glow(c, 840, 440, 900, 'rgba(255,59,48,.5)', .22);
    c.save(); c.font = '700 34px JBM'; for (let i = 0; i < 22; i++) { const x = 60 + i * 76 + hash(i) * 20, y = ((t * (140 + hash(i + 3) * 160) + hash(i + 9) * 1000) % 1200) - 100; c.fillStyle = `rgba(255,59,48,${.05 + .1 * hash(i + 5)})`; c.fillText('$', x, y); } c.restore();
    const v = roll(t, P('P04').start + .15, tL, 65e9, 0, eio), pop = 1 + .12 * (1 - lin(t, tL, tL + .35)) * (t >= tL ? 1 : 0), landed = t >= tL;
    c.save(); c.translate(840, 430); c.scale(pop, pop); txt(c, '$' + fmt(v), 0, 0, '800 150px JBM', RED); c.restore();
    const fk = eo(lin(t, W('P04', 'fake'), W('P04', 'fake') + .3)); c.save(); c.globalAlpha = fk; c.translate(0, (1 - fk) * 30); c.font = '400 92px Anton'; c.letterSpacing = '6px'; txt(c, 'FAKE ACCOUNT BALANCES', 840, 590, '400 92px Anton', PAPER); c.letterSpacing = '0px'; c.restore();
    if (landed) { c.fillStyle = RED; c.fillRect(840 - 480 * eo(lin(t, tL, tL + .4)), 660, 960 * eo(lin(t, tL, tL + .4)), 8); }
  });

  // ---------- P05: everything collapses into one glowing red "?" / A NUMBER THAT CANNOT EXIST
  const tImp = W('P05', 'impossible');
  Engine.hit(tImp, { shake: 24, punch: .06, flash: 1 }); Engine.cue(tImp, 'whoosh-boom');
  Engine.scene('P05', 'P05', (c, t, lt) => {
    bgGrid(c, t, 'rgba(255,59,48,.06)'); const k = eio(lin(t, P('P05').start + .15, tImp));
    if (t < tImp + .05) for (const [s, x, y, col, size] of [['123', 260, 260, GREEN, 150], ['20', 1420, 300, RED, 190], ['$65B', 840, 700, RED, 150]]) { const px = lerp(x, 840, k), py = lerp(y, 430, k), sc = lerp(1, .25, k); c.save(); c.globalAlpha = 1 - k * .6; c.translate(px + Math.sin(t * 40) * 3 * k, py); c.scale(sc, sc); txt(c, s, 0, 0, `800 ${size}px JBM`, col); c.restore(); }
    const q = back(lin(t, tImp, tImp + .35)), pulse = 1 + .03 * Math.sin(t * 5);
    if (q > 0) { glow(c, 840, 400, 620, RED, .55 + .12 * Math.sin(t * 5)); c.save(); c.translate(840, 400); c.scale(q * pulse, q * pulse); c.shadowColor = RED; c.shadowBlur = 80; txt(c, '?', 0, 0, '400 560px Anton', RED); c.restore(); }
    const full = 'A NUMBER THAT CANNOT EXIST', t0 = W('P05', 'number', 2) - .12, t1 = Wend('P05', 'exist') + .1;
    if (t >= t0) { const n = Math.floor(full.length * lin(t, t0, t1) + 1e-6); c.font = '400 88px Anton'; c.letterSpacing = '4px'; c.textBaseline = 'middle'; c.textAlign = 'left'; const w = c.measureText(full).width, x0 = 840 - w / 2, split = 'A NUMBER THAT '.length;
      const a = full.slice(0, Math.min(n, split)), b = full.slice(split, Math.max(split, n)); c.fillStyle = PAPER; c.fillText(a, x0, 720); c.fillStyle = RED; c.fillText(b, x0 + c.measureText(full.slice(0, split)).width, 720);
      if (t < t1 + .8 && Math.floor(t * 2.5) % 2 === 0) { c.fillStyle = PAPER; c.fillRect(x0 + c.measureText(full.slice(0, n)).width + 6, 680, 6, 80); } c.letterSpacing = '0px'; }
  });

  // ---------- P06: three case folders (coupon 1920, oil tank 1963, straight-line chart 2008)
  const fl = [[W('P06', 'coupon'), 360, 'CASE 01', 'COUPON SCAM', '1920'], [W('P06', 'tank'), 840, 'CASE 02', 'TANK FARM', '1963'], [W('P06', 'fund'), 1320, 'CASE 03', 'THE FUND', '2008']];
  fl.forEach(([tl_], i) => { Engine.hit(tl_ + .3, { shake: 9, punch: .02 }); Engine.cue(tl_ + .3, 'paper-slam'); });
  Engine.scene('P06', 'P06', (c, t, lt) => {
    bgGrid(c, t, 'rgba(255,214,10,.04)'); txt(c, 'TODAY: THREE CASE FILES', 840, 150, '800 30px JBM', 'rgba(245,243,238,.55)');
    fl.forEach(([tl_, x, tab, label, year], i) => { const k = lin(t, tl_ - .15, tl_ + .3); if (k <= 0) return; const px = lerp(-380, x, back(k)), rot = (1 - eo(k)) * -.15 + [-.03, .02, -.015][i];
      folder(c, px, 500, 420, 540, tab, { rot, draw: (c2, w, h) => {
        c2.fillStyle = 'rgba(11,15,20,.88)'; rr(c2, -w / 2 + 28, -h / 2 + 34, w - 56, 300, 10); c2.fill();
        if (i === 0) { coupon(c2, 0, -h / 2 + 184, 250, -.1); } else if (i === 1) { tank(c2, 0, -h / 2 + 300, 150, 200, { fill: .6, oil: '#3b8fd6' }); tank(c2, -88, -h / 2 + 300, 70, 120, { fill: .6 }); tank(c2, 88, -h / 2 + 300, 70, 120, { fill: .6 }); } else chartIcon(c2, 0, -h / 2 + 190, 280, 200, GREEN, 12);
        txt(c2, year, 0, 120, '400 130px Anton', BRN); txt(c2, label, 0, 215, '800 30px JBM', BRN2); } }); });
  });

  // ---------- P07: the test card (3 empty checkboxes + padlock) then TITLE CARD on "Ponzi"
  const tPon = W('P07', 'ponzi'), tTest = W('P07', 'test'), tNext = W('P07', 'next');
  Engine.hit(tTest, { shake: 10, punch: .03 }); Engine.cue(tTest, 'lock');
  Engine.scene('P07', 'P07', (c, t, lt) => {
    bgGrid(c, t, 'rgba(255,59,48,.05)'); const k = lin(t, P('P07').start, P('P07').start + .4);
    checklist(c, 640, 490, { k, rows: [{}, {}, {}], rot: -.025 });
    const lk = back(lin(t, tTest, tTest + .3)), rat = Math.sin(lin(t, tNext, tNext + .6) * 30) * (1 - lin(t, tNext, tNext + .6)) * .12;
    if (lk > 0) { c.save(); c.translate(1290, 520); c.scale(lk, lk); c.rotate(rat); glow(c, 0, 40, 300, RED, .3); padlock(c, 0, 0, 280, 0); c.restore(); txt(c, '3 QUESTIONS', 1290, 800, '400 54px Anton', PAPER); }
  });
  Engine.scene(['P07', 'ponzi', 1], 'P07', (c, t, lt) => {
    bgGrid(c, t, 'rgba(255,59,48,.07)'); glow(c, 860, 480, 900, 'rgba(255,59,48,.5)', .25);
    c.save(); c.font = '400 160px Anton'; c.letterSpacing = '4px'; const s = 'THE IMPOSSIBLE NUMBER', w = c.measureText(s).width, sc = Math.min(1, 1450 / w); c.restore();
    const jx = lt < .4 ? (hash(Math.floor(t * 30)) - .5) * 40 * (1 - lt / .4) : 0, k = back(lin(lt, 0, .3));
    c.save(); c.translate(860 + jx, 440); c.scale(sc * k, sc * k); c.letterSpacing = '4px'; txt(c, s, 0, 0, '400 160px Anton', PAPER); c.letterSpacing = '0px'; c.restore();
    const u = eo(lin(lt, .35, .95)); c.fillStyle = RED; c.fillRect(860 - 725, 540, 1450 * u, 16);
    c.save(); c.globalAlpha = eo(lin(lt, .9, 1.3)); txt(c, 'A BAD MATH CASE FILE', 860, 620, '700 34px JBM', GREY); c.restore();
  }, { whip: false, name: 'title' });
  Engine.hit(tPon, { glitch: 1.2, glitchDur: .5, shake: 30, punch: .07, flash: 1 }); Engine.cue(tPon, 'sub-boom');
  { const p8 = P('P08').start; Engine.glitch(p8 - .3, p8, 1); }
});
