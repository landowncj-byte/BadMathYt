// CHAPTER 1 — THE COUPON THAT COULDN'T EXIST (P08-P20). Sepia 1920 film look. Everything keyed to paragraph ids / words.
Engine.chapter(1, () => {
  const DK = 'rgba(18,12,5,.88)', BLUE = '#4f8bd6', CAP = '#26466f', DRED = '#c0392b';
  const FILM = { film: true };

  // ---------- local helpers (silhouettes only, no photos)
  function man(c, x, y, s, col, o = {}) { // 1920s man silhouette, (x,y) = feet. o: {walk, arms, run, hat:'bowler'|'fedora'|'cap', hatCol}
    const { walk = 0, arms = 0, run = 0, hat = 'bowler', hatCol = col } = o; c.fillStyle = col; const sw = Math.sin(walk) * (run ? .5 : .25);
    c.save(); c.translate(x, y);
    c.save(); c.translate(-s * .08, -s * .42); c.rotate(sw); c.fillRect(-s * .06, 0, s * .12, s * .42); c.restore();
    c.save(); c.translate(s * .08, -s * .42); c.rotate(-sw); c.fillRect(-s * .06, 0, s * .12, s * .42); c.restore();
    rr(c, -s * .2, -s * .9, s * .4, s * .52, s * .08); c.fill();
    c.save(); c.translate(-s * .2, -s * .85); c.rotate(.15 + (arms ? -2.6 : -sw * .8)); c.fillRect(-s * .05, 0, s * .1, s * .4); c.restore();
    c.save(); c.translate(s * .2, -s * .85); c.rotate(-.15 + (arms ? 2.6 : sw * .8)); c.fillRect(-s * .05, 0, s * .1, s * .4); c.restore();
    c.beginPath(); c.arc(0, -s * 1.02, s * .13, 0, 7); c.fill();
    c.fillStyle = hatCol;
    if (hat === 'cap') { c.beginPath(); c.arc(0, -s * 1.07, s * .14, Math.PI, 0); c.fill(); c.fillRect(-s * .17, -s * 1.08, s * .34, s * .05); c.fillRect(-s * .06, -s * 1.1, s * .2, s * .03); }
    else if (hat === 'fedora') { c.beginPath(); c.ellipse(0, -s * 1.11, s * .24, s * .04, 0, 0, 7); c.fill(); c.beginPath(); c.moveTo(-s * .12, -s * 1.11); c.lineTo(-s * .09, -s * 1.22); c.lineTo(s * .09, -s * 1.22); c.lineTo(s * .12, -s * 1.11); c.fill(); }
    else { c.beginPath(); c.ellipse(0, -s * 1.1, s * .2, s * .045, 0, 0, 7); c.fill(); c.beginPath(); c.arc(0, -s * 1.12, s * .11, Math.PI, 0); c.fill(); }
    c.restore();
  }
  function bank(c, x, y, s, color) {
    c.fillStyle = color; c.beginPath(); c.moveTo(x - s * .55, y - s * .25); c.lineTo(x, y - s * .55); c.lineTo(x + s * .55, y - s * .25); c.closePath(); c.fill();
    for (let i = 0; i < 4; i++) c.fillRect(x - s * .42 + i * s * .26, y - s * .2, s * .1, s * .5);
    c.fillRect(x - s * .55, y + s * .32, s * 1.1, s * .1);
  }
  const plate = (c, x, y, w, h, r = 14, col = DK, line = SEP2) => { rr(c, x, y, w, h, r); c.fillStyle = col; c.fill(); c.strokeStyle = line; c.lineWidth = 3; c.stroke(); };
  function blob(c, pts) { const n = pts.length; c.beginPath(); c.moveTo((pts[0][0] + pts[n - 1][0]) / 2, (pts[0][1] + pts[n - 1][1]) / 2); for (let i = 0; i < n; i++) { const a = pts[i], b = pts[(i + 1) % n]; c.quadraticCurveTo(a[0], a[1], (a[0] + b[0]) / 2, (a[1] + b[1]) / 2); } c.closePath(); }
  const wrapText = (c, s, maxW, font) => { c.font = font; const out = []; let line = ''; for (const w of s.split(' ')) { if (line && c.measureText(line + ' ' + w).width > maxW) { out.push(line); line = w; } else line = line ? line + ' ' + w : w; } out.push(line); return out; };
  function office(c, t, x, y, w, h, sign) { // storefront, (x,y) = top-left
    c.fillStyle = '#2a1d0c'; c.fillRect(x, y, w, h); c.strokeStyle = SEP2; c.lineWidth = 4; c.strokeRect(x, y, w, h);
    c.fillStyle = 'rgba(255,200,90,.28)'; for (const wx of [x + 24, x + w - 24 - 90]) { c.fillRect(wx, y + 90, 90, 110); }
    c.fillStyle = '#120c05'; c.fillRect(x + w / 2 - 55, y + h - 230, 110, 230); c.strokeStyle = SEP2; c.strokeRect(x + w / 2 - 55, y + h - 230, 110, 230);
    plate(c, x + 10, y + 14, w - 20, 60, 8, '#120c05'); txt(c, sign, x + w / 2, y + 44, '400 25px Rye', HL);
  }
  const floor = c => { c.fillStyle = 'rgba(0,0,0,.4)'; c.fillRect(0, 800, VW, 90); c.fillStyle = SEP2; c.globalAlpha = .4; c.fillRect(0, 800, VW, 3); c.globalAlpha = 1; };

  // ============================================================ P08  intertitle
  const tEx8 = W('P08', 'exist'), tCo8 = W('P08', 'coupon'), tTh8 = W('P08', "couldn't"), tCh8 = W('P08', 'Chapter');
  Engine.scene('P08', 'P08', (c, t, lt) => {
    sepiaBg(c); const k = eo(lin(lt, .02, .5));
    c.save(); c.translate(840, 495); const sc = lerp(1.12, 1, k) + .004 * Math.sin(t * 40); c.scale(sc, sc); c.globalAlpha = k;
    c.fillStyle = 'rgba(18,12,5,.55)'; c.fillRect(-690, -350, 1380, 700);
    c.strokeStyle = SEP; c.lineWidth = 8; c.strokeRect(-690, -350, 1380, 700); c.lineWidth = 2.5; c.strokeRect(-662, -322, 1324, 644);
    for (const [sx, sy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { c.lineWidth = 3; c.beginPath(); c.arc(sx * 662, sy * 322, 38, 0, 7); c.stroke(); c.beginPath(); c.arc(sx * 662, sy * 322, 20, 0, 7); c.stroke(); }
    c.restore();
    const a1 = eo(lin(t, tCh8 - .05, tCh8 + .25)), a2 = back(lin(t, tCo8 - .05, tCo8 + .3)), a3 = back(lin(t, tTh8 - .05, tTh8 + .3)), a4 = back(lin(t, tEx8 - .05, tEx8 + .3));
    c.save(); c.globalAlpha = a1; c.letterSpacing = '6px'; txt(c, '— CHAPTER ONE —', 840, 255, '400 58px Rye', SEP2); c.letterSpacing = '0px'; c.restore();
    for (const [a, s, y, col] of [[a2, 'THE COUPON', 395, SEP], [a3, "THAT COULDN'T", 520, SEP], [a4, 'EXIST.', 650, RED]]) { c.save(); c.globalAlpha = clamp(a); c.translate(840, y); c.scale(lerp(1.25, 1, clamp(a)), lerp(1.25, 1, clamp(a))); txt(c, s, 0, 0, '400 112px Rye', col); c.restore(); }
    c.fillStyle = SEP2; c.fillRect(840 - 260 * a1, 296, 520 * a1, 4); c.fillRect(840 - 260 * a1, 715, 520 * a1, 4);
    // projector flicker bar
    c.fillStyle = `rgba(255,235,190,${.05 * hash(Math.floor(t * 24))})`; c.fillRect(0, 0, VW, VH);
  }, FILM);
  Engine.hit(tEx8, { punch: .04, shake: 10 }); Engine.cue(tEx8, 'projector-thunk');

  // ============================================================ P09  bank vs Ponzi
  const t9 = { bos: W('P09', 'Boston'), y: W('P09', '1920'), ban: W('P09', 'banks'), f5: W('P09', '5'), yr: W('P09', 'year'), dw: W('P09', 'dishwasher'), ch: W('P09', 'Charles'), pz: W('P09', 'Ponzi'), f50: W('P09', '50'), d45: W('P09', '45'), days: Wend('P09', 'days') };
  Engine.scene('P09', 'P09', (c, t, lt) => {
    sepiaBg(c);
    const sp = eio(lin(t, t9.ban - .1, t9.ban + .45));
    // phase A: BOSTON 1920 over a skyline
    if (sp < 1) {
      c.save(); c.globalAlpha = 1 - sp; c.translate(-sp * 300, 0);
      for (let i = 0; i < 24; i++) { const h = 140 + hash(i) * 330, x = 70 + i * 66, rise = eo(lin(lt, .02 + i * .012, .5 + i * .012)); c.fillStyle = `rgba(230,213,176,${.07 + .05 * hash(i + 5)})`; c.fillRect(x, 870 - h * rise, 56, h * rise);
        c.fillStyle = 'rgba(255,205,110,.22)'; for (let j = 0; j < h / 52; j++) if (hash(i * 9 + j) > .4) c.fillRect(x + 10, 870 - h * rise + 20 + j * 52, 12, 18); }
      const a = back(lin(t, t9.bos - .05, t9.bos + .35)), b = back(lin(t, t9.y - .05, t9.y + .35));
      c.save(); c.translate(840, 330); c.scale(lerp(1.3, 1, clamp(a)), lerp(1.3, 1, clamp(a))); c.globalAlpha = clamp(a); txt(c, 'BOSTON', 0, 0, '400 190px Rye', SEP); c.restore();
      c.save(); c.translate(840, 560); c.scale(lerp(1.3, 1, clamp(b)), lerp(1.3, 1, clamp(b))); c.globalAlpha = clamp(b); txt(c, '1920', 0, 0, '400 230px Rye', HL); c.restore();
      c.restore();
    }
    if (sp > 0) {
      const sl = (1 - sp) * 900, S = 2.7, BASE = 800;
      // bank panel
      c.save(); c.translate(-sl, 0); plate(c, 100, 150, 680, 700, 20);
      bank(c, 200, 270, 150, SEP); txt(c, 'THE BANK', 470, 215, '400 56px Rye', SEP);
      const a5 = back(lin(t, t9.f5 - .05, t9.f5 + .3)); c.save(); c.globalAlpha = clamp(a5); txt(c, '5% / YEAR', 470, 290, '800 54px JBM', SEP2); c.restore();
      const kb = eio(lin(t, t9.f5, t9.yr + .5));
      c.fillStyle = 'rgba(201,176,126,.45)'; c.fillRect(210, BASE - 100 * S, 150, 100 * S); txt(c, '$100', 285, BASE - 100 * S - 22, '800 40px JBM', SEP2);
      const bh = (100 + 5 * kb) * S; c.fillStyle = SEP2; c.fillRect(500, BASE - bh, 150, bh); txt(c, '$' + Math.round(100 + 5 * kb), 575, BASE - bh - 24, '800 46px JBM', SEP);
      txt(c, 'START', 285, 825, '700 22px JBM', SEP2); txt(c, 'AFTER 1 YEAR', 575, 825, '700 22px JBM', SEP2);
      c.strokeStyle = SEP2; c.lineWidth = 4; c.beginPath(); c.moveTo(150, BASE + 4); c.lineTo(730, BASE + 4); c.stroke(); c.restore();
      // ponzi panel
      c.save(); c.translate(sl, 0); plate(c, 880, 150, 680, 700, 20);
      const pk = back(lin(t, t9.dw - .2, t9.dw + .25)); const sm = t > t9.ch - .02;
      if (pk > 0) { c.save(); c.translate(1495, 340); c.scale(clamp(pk) * 1.0, clamp(pk)); man(c, 0, 0, 150, SEP, { hat: 'bowler', arms: 0 }); c.restore(); }
      if (!sm) { c.save(); c.globalAlpha = clamp(pk); txt(c, 'A FORMER DISHWASHER', 1160, 215, '800 30px JBM', SEP2); c.restore(); }
      else { const nk = back(lin(t, t9.ch - .02, t9.ch + .28)); c.save(); c.globalAlpha = clamp(nk); c.translate(1130, 215); c.scale(lerp(1.2, 1, clamp(nk)), lerp(1.2, 1, clamp(nk))); txt(c, 'CHARLES PONZI', 0, 0, '400 54px Rye', HL); c.restore(); }
      const a50 = back(lin(t, t9.f50 - .05, t9.f50 + .3)); c.save(); c.globalAlpha = clamp(a50); txt(c, '50% / 45 DAYS', 1130, 290, '800 54px JBM', GREEN); c.restore();
      const kp = eio(lin(t, t9.f50, t9.days + .1));
      c.fillStyle = 'rgba(201,176,126,.45)'; c.fillRect(940, BASE - 100 * S, 150, 100 * S); txt(c, '$100', 1015, BASE - 100 * S - 22, '800 40px JBM', SEP2);
      const ph = (100 + 50 * kp) * S; c.fillStyle = GREEN; c.fillRect(1230, BASE - ph, 150, ph); txt(c, '$' + Math.round(100 + 50 * kp), 1305, BASE - ph - 24, '800 46px JBM', GREEN);
      txt(c, 'START', 1015, 825, '700 22px JBM', SEP2); txt(c, 'DAY ' + Math.round(45 * kp), 1305, 825, '700 22px JBM', GREEN);
      c.strokeStyle = SEP2; c.lineWidth = 4; c.beginPath(); c.moveTo(930, BASE + 4); c.lineTo(1510, BASE + 4); c.stroke(); c.restore();
    }
  }, FILM);
  Engine.hit(t9.ch + .3, { shake: 8, flash: 1, cue: 'camera-flash' }); Engine.hit(t9.f50, { punch: .03, shake: 8 }); Engine.hit(t9.ban, { punch: .02 });

  // ============================================================ P10a  the reply coupon flips
  const t10 = { clever: W('P10', 'clever'), intl: W('P10', 'International'), slips: W('P10', 'slips'), eu: W('P10', 'Europe'), cheap: W('P10', 'cheap'), weak: W('P10', 'weak'), am: W('P10', 'America'), worth: W('P10', 'worth'), trade: W('P10', 'trade') };
  Engine.scene('P10', 'P10', (c, t, lt) => {
    sepiaBg(c);
    txt(c, 'HIS PITCH', 840, 170, '400 50px Rye', SEP2); c.fillStyle = SEP2; c.fillRect(640, 205, 400 * eo(lin(lt, .1, .6)), 3);
    const kIn = back(lin(t, t10.clever - .15, t10.clever + .35)), fl = eio(lin(t, t10.intl - .05, t10.intl + .65)), sh = eio(lin(t, t10.slips - .05, t10.slips + .5));
    if (sh < 1) {
      c.save(); c.translate(840, 500 + (1 - clamp(kIn)) * 500 + Math.sin(t * 3) * 6); c.globalAlpha = 1 - sh; c.rotate((1 - clamp(kIn)) * .8 - .04); const sx = Math.cos(fl * Math.PI), s = clamp(kIn) * (1 - sh * .3); c.scale(Math.max(.02, Math.abs(sx)) * s, s);
      const w = 700, h = 434;
      if (fl < .5) { c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 40; c.shadowOffsetY = 20; coupon(c, 0, 0, w, 0); c.shadowColor = 'transparent'; }
      else { c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 40; c.shadowOffsetY = 20; c.fillStyle = '#d9c490'; c.fillRect(-w / 2, -h / 2, w, h); c.shadowColor = 'transparent'; c.strokeStyle = BRN2; c.lineWidth = 6; c.strokeRect(-w / 2 + 16, -h / 2 + 16, w - 32, h - 32); c.lineWidth = 2; c.strokeRect(-w / 2 + 28, -h / 2 + 28, w - 56, h - 56);
        txt(c, 'INTERNATIONAL', 0, -110, '400 62px Rye', BRN); txt(c, 'REPLY COUPON', 0, -35, '400 74px Rye', BRN); c.fillStyle = BRN2; c.fillRect(-250, 18, 500, 4); txt(c, 'EXCHANGEABLE FOR POSTAGE STAMPS', 0, 62, '400 26px Elite', BRN2); txt(c, '★   ★   ★', 0, 125, '800 40px JBM', DRED); }
      c.restore();
    }
    if (sh > 0) for (let i = 0; i < 16; i++) { const col = i % 8, row = Math.floor(i / 8), tx = 270 + col * 150 + (row ? 40 : 0), ty = 380 + row * 190, a = eo(clamp(sh * 1.2 - hash(i) * .2)); coupon(c, lerp(840, tx, a), lerp(500, ty, a), lerp(500, 150, a), (hash(i + 3) - .5) * .5 * a, clamp(a * 2)); }
    if (sh > .9) txt(c, 'LITTLE SLIPS', 840, 790, '800 38px JBM', GREEN);
  }, FILM);
  Engine.hit(t10.intl, { punch: .04, shake: 10, cue: 'paper-flip' }); Engine.cue(t10.clever, 'whoosh');

  // ============================================================ P10b + P11  the map, Europe -> America (one scene across P10 end + P11)
  const t11 = { low: W('P11', 'low'), cash: W('P11', 'cash'), paper: W('P11', 'paper'), arb: W('P11', 'arbitrage'), legal: W('P11', 'legal'), buy: W('P11', 'Buy') };
  const tMap = t10.eu - .25;
  const EU = [[210,340],[260,320],[300,290],[340,300],[380,270],[430,300],[470,290],[520,320],[560,310],[600,360],[590,420],[560,440],[580,490],[540,520],[520,560],[490,540],[470,600],[500,650],[470,690],[430,660],[400,610],[360,640],[330,700],[290,720],[250,700],[270,650],[220,630],[200,580],[240,540],[190,500],[170,440],[200,400]];
  const AM = [[1040,360],[1100,310],[1180,290],[1280,300],[1360,280],[1440,300],[1520,330],[1560,390],[1520,430],[1540,470],[1490,520],[1450,560],[1470,610],[1430,660],[1400,720],[1360,760],[1340,700],[1310,650],[1250,640],[1200,600],[1140,560],[1100,500],[1060,470],[1030,420]];
  const flightStart = i => i < 3 ? t10.trade + i * .65 : t11.low - .15 + (i - 3) * .3;
  Engine.scene([ 'P10', 'Europe', 1, -.25 ], 'P11', (c, t, lt) => {
    sepiaBg(c); const k = eo(lin(t, tMap, tMap + .4));
    c.save(); c.globalAlpha = k;
    // ocean waves
    c.strokeStyle = 'rgba(120,160,190,.45)'; c.lineWidth = 4; for (let j = 0; j < 7; j++) { c.beginPath(); for (let x = 640; x <= 990; x += 10) c.lineTo(x, 330 + j * 62 + Math.sin(x * .05 + t * 3.5 + j) * 9); c.stroke(); }
    blob(c, EU); c.fillStyle = 'rgba(201,176,126,.22)'; c.fill(); c.strokeStyle = SEP; c.lineWidth = 4; c.stroke();
    blob(c, AM); c.fillStyle = 'rgba(201,176,126,.22)'; c.fill(); c.stroke();
    c.restore();
    const ae = back(lin(t, t10.eu - .05, t10.eu + .3)), aa = back(lin(t, t10.am - .05, t10.am + .3));
    c.save(); c.globalAlpha = clamp(ae); txt(c, 'EUROPE', 370, 410, '400 70px Rye', SEP); c.restore(); c.save(); c.globalAlpha = clamp(aa); txt(c, 'AMERICA', 1290, 410, '400 70px Rye', SEP); c.restore();
    // europe: cheap coupons pile + weak money
    const nPile = Math.floor(lin(t, t10.cheap, t10.cheap + 1.2) * 9) + (t > t10.cheap ? 1 : 0);
    for (let i = 0; i < Math.min(9, nPile); i++) coupon(c, 290 + (i % 3) * 60 + (hash(i) - .5) * 20, 560 + Math.floor(i / 3) * -22 + 40, 130, (hash(i + 2) - .5) * .4);
    const pc = back(lin(t, t10.cheap - .05, t10.cheap + .3)); if (pc > 0) { c.save(); c.globalAlpha = clamp(pc); plate(c, 160, 790, 500, 70, 12); txt(c, 'COUPONS: CHEAP', 410, 826, '800 36px JBM', GREEN); c.restore(); }
    const pw = back(lin(t, t10.weak - .05, t10.weak + .3)); if (pw > 0) { c.save(); c.globalAlpha = clamp(pw); c.translate(370, 665); c.scale(clamp(pw), clamp(pw)); plate(c, -200, -26, 400, 52, 10, 'rgba(120,30,20,.85)', '#c0392b'); txt(c, 'MONEY IS WEAK', 0, 0, '800 28px JBM', PAPER); c.restore(); }
    // america: stamps worth more
    const ps = back(lin(t, t10.worth - .1, t10.worth + .3)); if (ps > 0) { c.save(); c.globalAlpha = clamp(ps); plate(c, 1020, 790, 540, 70, 12); txt(c, 'STAMPS: WORTH MORE', 1290, 826, '800 36px JBM', HL); c.restore();
      for (let i = 0; i < 4; i++) { c.save(); c.translate(1150 + i * 55, 505); c.rotate(-.08 + i * .05); c.fillStyle = '#efe6cf'; c.fillRect(-20, -26, 40, 52); c.strokeStyle = DRED; c.lineWidth = 3; c.strokeRect(-14, -20, 28, 40); c.fillStyle = DRED; c.fillRect(-6, -10, 12, 18); c.restore(); } }
    // flights Europe -> America
    for (let i = 0; i < 30; i++) { const s0 = flightStart(i), a = lin(t, s0, s0 + 1.35); if (a <= 0 || a >= 1) continue; const q = eio(a);
      coupon(c, lerp(430, 1230, q), lerp(560, 545, q) - Math.sin(q * Math.PI) * 230 + (i % 3 - 1) * 24, lerp(120, 140, q), Math.sin(i + a * 7) * .45); }
    // cash coming back: America pile grows after landing
    const nLand = clamp(Math.floor(lin(t, t11.cash, t11.paper) * 7), 0, 7); for (let i = 0; i < nLand; i++) coupon(c, 1330 + (i % 3) * 56, 560 + (Math.floor(i / 3)) * -24, 110, .1 - i * .04);
    // tags
    const tl = back(lin(t, t11.low - .05, t11.low + .3)); if (tl > 0) { c.save(); c.translate(370, 235); c.scale(clamp(tl), clamp(tl)); c.rotate(-.05); plate(c, -190, -36, 380, 72, 12, GREEN, '#0b6b3a'); txt(c, 'BUY LOW', 0, 2, '400 52px Anton', INK); c.restore(); }
    const tc = back(lin(t, t11.cash - .05, t11.cash + .3)); if (tc > 0) { c.save(); c.translate(1290, 235); c.scale(clamp(tc), clamp(tc)); c.rotate(.05); plate(c, -250, -36, 500, 72, 12, HL, '#8a6d00'); txt(c, 'CASH IN HIGH', 0, 2, '400 52px Anton', INK); c.restore(); }
    // arbitrage
    if (t > t11.paper - .1) { plate(c, 640, 420, 400, 130, 14); txt(c, 'ON PAPER:', 840, 448, '800 26px JBM', SEP2); typedText(c, 'ARBITRAGE', 840, 502, '400 62px Anton', PAPER, t, t11.paper - .05, t11.arb + .7); }
    stamp(c, 'LEGAL ✓', 840, 690, 110, GREEN, -.12, lin(t, t11.legal, t11.legal + .15), 'Anton');
  }, FILM);
  Engine.hit(t11.legal, { shake: 14, punch: .04, cue: 'stamp' }); Engine.cue(t11.low, 'cash-register');

  // ============================================================ P12  the line to the office; $ per day
  const t12 = { work: W('P12', 'worked'), early: W('P12', 'Early'), paid: W('P12', 'paid'), spread: W('P12', 'spread'), jul: W('P12', 'July'), pour: W('P12', 'pouring'), mil: W('P12', 'million'), day: W('P12', 'day') };
  Engine.scene('P12', 'P12', (c, t, lt) => {
    sepiaBg(c); floor(c); const T0 = P('P12').start;
    office(c, t, 1180, 250, 420, 550, 'SECURITIES EXCHANGE CO.');
    c.save(); c.fillStyle = '#4a3216'; c.fillRect(470, 500, 12, 300); c.fillRect(760, 500, 12, 300); plate(c, 330, 410, 580, 110, 10, '#d9c490', BRN2); txt(c, '50% IN 45 DAYS', 620, 466, '400 56px Rye', BRN); c.restore();
    // people queue
    const n = Math.floor(lerp(6, 14, lin(t, t12.early, t12.day))), ph = (t * 55) % 110;
    for (const [row, y, s, off] of [[1, 780, 170, 55], [0, 806, 205, 0]]) for (let i = -1; i < n; i++) { const x = 1250 - i * 110 - off + ph; if (x < 40 || x > 1330) continue; const al = x > 1240 ? clamp((1330 - x) / 90) : 1;
      c.save(); c.globalAlpha = al * (i >= 7 ? eo(lin(t, t12.spread + (i - 7) * .15, t12.spread + (i - 7) * .15 + .3)) : 1); man(c, x, y, s, row ? '#b9a577' : SEP, { walk: t * 7 + i * 1.3 + row, hat: i % 3 ? 'bowler' : 'fedora' }); c.restore(); }
    // early investors paid: +50% tags drifting up
    for (let i = 0; i < 6; i++) { const s0 = t12.early + i * .35, a = lin(t, s0, s0 + 1.1); if (a <= 0 || a >= 1) continue; c.save(); c.globalAlpha = Math.sin(a * Math.PI); txt(c, '+50%', 1010 - i * 130, 620 - a * 150, '800 40px JBM', GREEN); c.restore(); }
    stamp(c, 'PAID ON TIME', 620, 300, 62, GREEN, -.1, lin(t, t12.paid - .15, t12.paid + .05) * (t < t12.spread ? 1 : 1 - lin(t, t12.spread, t12.spread + .3)));
    // word spread: ripples
    if (t > t12.spread) for (let i = 0; i < 3; i++) { const a = lin((t - t12.spread + i * .35) % 1.05, 0, 1.05); c.strokeStyle = `rgba(230,213,176,${.5 * (1 - a)})`; c.lineWidth = 4; c.beginPath(); c.arc(600, 640, 40 + a * 300, 0, 7); c.stroke(); }
    if (t > t12.spread && t < t12.jul) { c.save(); c.globalAlpha = clamp(eo(lin(t, t12.spread, t12.spread + .25))); txt(c, 'WORD SPREAD…', 620, 300, '400 64px Rye', SEP); c.restore(); }
    // JULY tag
    const kj = back(lin(t, t12.jul - .05, t12.jul + .3)); if (kj > 0) { c.save(); c.translate(1425, 215); c.scale(clamp(kj), clamp(kj)); plate(c, -170, -56, 340, 112, 14); txt(c, 'JULY', 0, -14, '400 56px Rye', HL); txt(c, '1920', 0, 34, '800 36px JBM', SEP2); c.restore(); }
    // counter
    const kc = eo(lin(t, t12.jul + .1, t12.jul + .5)); if (kc > 0) { c.save(); c.globalAlpha = kc; plate(c, 100, 140, 760, 250, 18); txt(c, 'MONEY POURING IN', 480, 188, '700 30px JBM', SEP2);
      const v = roll(t, t12.pour, t12.mil + .35, 1e6, 0, eio), landed = t >= t12.mil + .35, pop = landed ? 1 + .1 * (1 - lin(t, t12.mil + .35, t12.mil + .7)) : 1;
      c.save(); c.translate(480, 280); c.scale(pop, pop); txt(c, (landed ? '≈ ' : '') + '$' + fmt(v), 0, 0, '800 88px JBM', landed ? GREEN : HL); c.restore();
      txt(c, 'PER DAY', 480, 355, '800 36px JBM', PAPER); c.restore(); }
  }, FILM);
  Engine.hit(t12.mil, { shake: 10, punch: .04, cue: 'cash-register' }); Engine.cue(t12.early, 'crowd-murmur'); Engine.hit(t12.jul, { punch: .02 });

  // ============================================================ P13  the police bought in
  const t13 = { bos: W('P13', "Boston's"), pol: W('P13', 'police'), bought: W('P13', 'bought') };
  Engine.scene('P13', 'P13', (c, t, lt) => {
    sepiaBg(c); floor(c); c.save(); push(c, lt, 2.6, 1, 1.04, 840, 600);
    for (let i = 0; i < 8; i++) { const x = 250 + i * 160, cop = i < 6, kk = cop ? eo(lin(t, t13.bos + i * .1, t13.bos + i * .1 + .25)) : 0;
      man(c, x, 800, 230, kk > .5 ? BLUE : SEP, { walk: t * 6 + i * 1.7, hat: kk > .5 ? 'cap' : (i % 2 ? 'fedora' : 'bowler'), hatCol: kk > .5 ? CAP : undefined });
      const kb = back(lin(t, t13.bought + (i % 6) * .08, t13.bought + (i % 6) * .08 + .3)); if (cop && kb > 0) txt(c, '$', x, 470 - clamp(kb) * 22 + Math.sin(t * 5 + i) * 4, '800 56px JBM', GREEN); }
    c.restore();
    stamp(c, '≈75% OF BOSTON POLICE', 840, 300, 78, BLUE, -.06, lin(t, t13.pol, t13.pol + .15));
    if (t < t13.pol) txt(c, "BOSTON'S POLICE FORCE", 840, 220, '400 56px Rye', SEP2);
  }, FILM);
  Engine.hit(t13.pol, { shake: 14, punch: .04, cue: 'stamp' }); Engine.cue(P('P13').start, 'crowd-murmur');

  // ============================================================ P14  typewriter / Clarence Barron
  const t14 = { math: W('P14', 'math'), jour: W('P14', 'journalist'), cl: W('P14', 'Clarence'), bar: W('P14', 'Barron'), did: W('P14', 'did') };
  Engine.scene('P14', 'P14', (c, t, lt) => {
    sepiaBg(c); const T0 = P('P14').start;
    // newspaper-office wall: stacked pages
    for (let i = 0; i < 5; i++) { c.save(); c.translate(1000 + i * 120, 760); c.rotate(-.1 + i * .05); c.fillStyle = `rgba(239,230,207,${.05 + .02 * i})`; c.fillRect(-60, -70, 120, 140); c.restore(); }
    // desk + typewriter
    c.fillStyle = '#2a1d0c'; c.fillRect(60, 790, 860, 90); c.fillStyle = SEP2; c.globalAlpha = .5; c.fillRect(60, 790, 860, 4); c.globalAlpha = 1;
    const sheetTop = 300, k = eo(lin(lt, .05, .45));
    c.save(); c.translate(0, (1 - k) * 200);
    c.fillStyle = '#efe6cf'; c.fillRect(260, sheetTop, 400, 360); c.fillStyle = 'rgba(0,0,0,.12)'; c.fillRect(260, sheetTop + 330, 400, 30);
    c.fillStyle = '#1c1c1c'; rr(c, 150, 640, 620, 170, 24); c.fill(); c.strokeStyle = '#555'; c.lineWidth = 4; c.stroke();
    c.fillStyle = '#333'; rr(c, 220, 612, 480, 40, 12); c.fill(); c.fillStyle = '#777'; c.fillRect(210, 620, 12, 22); c.fillRect(698, 620, 12, 22);
    for (let r = 0; r < 3; r++) for (let j = 0; j < 11 - r; j++) { const pr = (Math.floor(t * 9) + r * 4 + j * 3) % 11 === 0 && t < t14.bar; c.fillStyle = pr ? SEP : '#aaa'; c.beginPath(); c.arc(215 + r * 20 + j * 46, 690 + r * 38, 15, 0, 7); c.fill(); c.fillStyle = '#111'; c.fillRect(205 + r * 20 + j * 46, 684 + r * 38, 20, 4); }
    c.restore();
    const n1 = typedText(c, 'NOBODY DID', 460, sheetTop + 60 + (1 - k) * 200, '400 44px Elite', '#1c1c1c', t, T0 + .1, t14.math - .25, 'center', false);
    typedText(c, 'THE MATH.', 460, sheetTop + 130 + (1 - k) * 200, '400 44px Elite', DRED, t, t14.math - .25, t14.math + .5, 'center', false);
    if (t > t14.jour + .5) txt(c, 'UNTIL…', 460, sheetTop + 220, '400 40px Elite', '#1c1c1c');
    // Barron card
    paperSlam(c, t, t14.jour - .05, 1230, 480, 520, 640, .03, '#d9c490', (p, w, h) => {
      p.strokeStyle = BRN2; p.lineWidth = 4; p.strokeRect(-w / 2 + 16, -h / 2 + 16, w - 32, h - 32);
      txt(p, 'FINANCIAL JOURNALIST', 0, -h / 2 + 58, '400 28px Elite', BRN2);
      p.fillStyle = 'rgba(43,29,14,.12)'; p.fillRect(-w / 2 + 40, -h / 2 + 90, w - 80, 360); p.save(); p.translate(0, 135); man(p, 0, 0, 270, BRN, { hat: 'fedora' }); p.restore();
      p.fillStyle = BRN; const nm = 'CLARENCE BARRON'; const m = Math.floor(nm.length * lin(t, t14.cl, t14.bar + .35)); if (t >= t14.cl) { p.font = '400 40px Rye'; p.textAlign = 'center'; p.textBaseline = 'middle'; p.fillText(nm.slice(0, m), 0, h / 2 - 70); }
    });
    stamp(c, 'DID THE MATH', 480, 225, 52, DRED, -.08, lin(t, t14.did, t14.did + .15));
  }, FILM);
  Engine.hit(t14.cl, { flash: 1, shake: 8, cue: 'camera-flash' }); Engine.cue(P('P14').start + .1, 'typewriter'); Engine.hit(t14.jour, { shake: 8, cue: 'paper-slam' });

  // ============================================================ P15  160,000,000 needed -> 27,000 existed
  const t15 = { owed: W('P15', 'owed'), f160: W('P15', '160'), coup: W('P15', 'coupons'), circ: W('P15', 'circulation'), act: W('P15', 'actual'), ab: W('P15', 'about'), n27: W('P15', '27') };
  Engine.scene('P15', 'P15', (c, t, lt) => { // ledger: what Ponzi owed
    sepiaBg(c); const T0 = P('P15').start;
    paperSlam(c, t, T0, 840, 480, 900, 640, -.02, '#efe6cf', (p, w, h) => {
      txt(p, 'WHAT PONZI OWED', 0, -h / 2 + 70, '400 64px Rye', BRN); p.fillStyle = BRN; p.fillRect(-w / 2 + 50, -h / 2 + 120, w - 100, 5);
      for (let i = 0; i < 6; i++) { const a = eo(lin(t, T0 + .3 + i * .22, T0 + .55 + i * .22)); p.globalAlpha = a; const y = -h / 2 + 190 + i * 70;
        txt(p, 'INVESTOR', -w / 2 + 60, y, '400 32px Elite', BRN2, 'left'); p.fillStyle = BRN2; p.fillRect(-w / 2 + 250, y + 14, 260, 3); txt(p, '+ 50%', w / 2 - 70, y, '800 36px JBM', DRED, 'right'); }
      p.globalAlpha = 1; });
  }, FILM);
  Engine.scene([ 'P15', '160', 1, -.15 ], 'P15', (c, t, lt) => { // the tower
    sepiaBg(c); const k = eio(lin(t, t15.f160 - .05, t15.coup + .5)), cam = lt * 40;
    const topY = lerp(900, -400, k);
    for (let i = 0; i < 40; i++) { const y = 1000 - i * 52; if (y < topY || y > 1100) continue; coupon(c, 1290 + Math.sin(i * 1.7) * 10, y, 300, Math.sin(i) * .05); }
    c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(0, 960, VW, 120);
    plate(c, 100, 190, 940, 330, 20); txt(c, 'COUPONS NEEDED', 570, 245, '800 38px JBM', SEP2);
    const v = roll(t, t15.f160, t15.coup + .1, 160e6, 0, eio), landed = t >= t15.coup + .1, pop = landed ? 1 + .08 * (1 - lin(t, t15.coup + .1, t15.coup + .45)) : 1;
    c.save(); c.translate(570, 360); c.scale(pop, pop); txt(c, fmt(v), 0, 0, '800 120px JBM', landed ? RED : HL); c.restore();
    const ci = back(lin(t, t15.circ - .05, t15.circ + .3)); if (ci > 0) { c.save(); c.globalAlpha = clamp(ci); txt(c, 'IN CIRCULATION', 570, 460, '800 36px JBM', PAPER); c.restore(); }
    c.save(); c.translate(0, 0); const arrow = clamp(k * 2); if (arrow > 0) { txt(c, '▲', 1290, 130 + Math.sin(t * 6) * 6, '800 60px JBM', RED); } c.restore();
  }, FILM);
  Engine.scene([ 'P15', 'actual', 1, -.15 ], 'P15', (c, t, lt) => { // the tiny pile
    sepiaBg(c); const k = lin(t, t15.act, t15.act + .35);
    c.strokeStyle = 'rgba(230,213,176,.35)'; c.setLineDash([16, 12]); c.lineWidth = 4; c.strokeRect(300, 150, 200, 650); c.setLineDash([]);
    txt(c, '160,000,000', 400, 470, '800 40px JBM', 'rgba(230,213,176,.5)'); txt(c, 'NEEDED', 400, 840, '400 40px Rye', SEP2);
    c.save(); push(c, lt, 3, 1, 1.25, 1020, 700); for (let i = 0; i < 7; i++) coupon(c, 1020 + (i % 3 - 1) * 52 + (hash(i) - .5) * 14, 790 - Math.floor(i / 3) * 24, 120, (hash(i + 4) - .5) * .5, clamp(k * 3)); c.restore();
    const ab = eo(lin(t, t15.ab - .1, t15.ab + .3)); c.save(); c.globalAlpha = ab; txt(c, 'THE ACTUAL NUMBER · ABOUT', 1020, 215, '800 32px JBM', SEP2); c.restore();
    const v = roll(t, t15.ab, t15.n27 + .9, 27000, 0, eio), landed = t >= t15.n27 + .9, pop = landed ? 1 + .1 * (1 - lin(t, t15.n27 + .9, t15.n27 + 1.2)) : 1;
    c.save(); c.translate(1020, 340); c.scale(pop, pop); glow(c, 0, 0, 420, GREEN, landed ? .2 : .08); txt(c, fmt(v), 0, 0, '800 190px JBM', GREEN); c.restore();
    const sk = lin(t, t15.n27 + 1.0, t15.n27 + 1.15); stamp(c, 'EXISTED', 1020, 520, 72, GREEN, .06, sk);
    c.strokeStyle = GREEN; c.lineWidth = 4; c.beginPath(); c.moveTo(1020, 590); c.lineTo(1020, 690); c.stroke();
  }, FILM);
  Engine.cue(t15.f160 - .6, 'heartbeat'); Engine.hit(t15.f160, { shake: 18, punch: .05, glitch: .7, glitchDur: .3, cue: 'sub-boom' });
  Engine.hit(t15.act, { shake: 10, punch: .03 }); Engine.hit(t15.n27 + .9, { shake: 16, punch: .05, glitch: .6, glitchDur: .25 });

  // ============================================================ P16  1 per ~6,000
  const t16 = { short: W('P16', 'short'), one: W('P16', 'one'), six: W('P16', '6'), need: W('P16', 'need') };
  const GC = 120, GR = 50, CS = 11.5, GX = 840 - GC * CS / 2, GY = 215, HC = 83, HR = 21;
  Engine.scene('P16', 'P16', (c, t, lt) => {
    sepiaBg(c); const T0 = P('P16').start, fill = eo(lin(t, T0 + .1, t16.one - .15)), nShown = Math.floor(GC * GR * fill);
    const z = lerp(1, 2.6, eio(lin(t, t16.one, t16.one + 1.1))), hx = GX + (HC + .5) * CS, hy = GY + (HR + .5) * CS;
    c.save(); c.beginPath(); c.rect(100, 190, 1480, 650); c.clip(); c.translate(hx, hy); c.scale(z, z); c.translate(-hx, -hy);
    for (let i = 0; i < nShown; i++) { const col = i % GC, row = Math.floor(i / GC); if (col === HC && row === HR) continue; c.fillStyle = (row + col) % 2 ? 'rgba(230,213,176,.78)' : 'rgba(201,176,126,.78)'; c.fillRect(GX + col * CS + .6, GY + row * CS + .6, CS - 1.2, CS - 1.2); }
    if (nShown > HR * GC + HC && t > t16.one - .3) { const p = 1 + .25 * Math.sin(t * 9), pk = lin(t, t16.one - .05, t16.one + .2); glow(c, hx, hy, 40 * p * z * .6, GREEN, .8 * pk); c.fillStyle = GREEN; c.fillRect(GX + HC * CS - 1, GY + HR * CS - 1, CS + 2, CS + 2); }
    c.restore();
    const vn = Math.round(6000 * fill); plate(c, 440, 125, 800, 66, 12); txt(c, fmt(vn) + ' COUPONS NEEDED', 840, 158, '800 44px JBM', SEP);
    const lk = back(lin(t, t16.six - .1, t16.six + .3)); if (lk > 0) { c.save(); c.translate(840, 795); c.scale(clamp(lk), clamp(lk)); plate(c, -430, -70, 860, 140, 18, DK, GREEN); txt(c, '1 COUPON PER ~6,000', 0, 4, '400 82px Anton', GREEN); c.restore(); }
    else if (t > t16.one) { plate(c, 540, 760, 600, 76, 14, DK, GREEN); txt(c, 'ONLY ONE EXISTS', 840, 798, '800 44px JBM', GREEN); }
  }, FILM);
  Engine.hit(t16.one, { punch: .04, shake: 8 }); Engine.hit(t16.six, { punch: .03, shake: 8, cue: 'stamp' });

  // ============================================================ P17  new money pays old (pyramid)
  const t17 = { profits: W('P17', 'profits'), next: W('P17', 'next'), old: W('P17', 'Old'), newm: W('P17', 'new'), money: W('P17', 'money'), whole: W('P17', 'whole'), trick: W('P17', 'trick') };
  Engine.scene('P17', 'P17', (c, t, lt) => { // where did the profits come from?
    sepiaBg(c); const T0 = P('P17').start;
    const k = back(lin(t, T0 + .05, T0 + .45));
    for (let i = 0; i < 14; i++) { const x = 840 + (hash(i) - .5) * 340, y = 780 - Math.floor(i / 4) * 24 - (i % 3) * 6; c.fillStyle = '#d4a84a'; c.beginPath(); c.ellipse(x, y, 52, 17, 0, 0, 7); c.fill(); c.strokeStyle = '#8a6d1a'; c.lineWidth = 3; c.stroke(); }
    c.save(); c.translate(840, 500); c.scale(clamp(k), clamp(k)); glow(c, 0, 0, 380, HL, .25); txt(c, '?', 0, 0, '400 380px Anton', HL); c.restore();
    const kp = back(lin(t, t17.profits - .05, t17.profits + .3)); c.save(); c.globalAlpha = clamp(kp); txt(c, 'THE PROFITS', 840, 190, '400 78px Anton', PAPER); c.restore();
  }, FILM);
  Engine.scene([ 'P17', 'next', 1, -.15 ], 'P17', (c, t, lt) => { // pyramid
    sepiaBg(c); const rows = [1, 2, 4, 7, 11], CX = 700;
    for (let r = 0; r < 5; r++) { const ri = 4 - r, k = eo(lin(t, t17.next + ri * .22, t17.next + ri * .22 + .3)); if (k <= 0) continue; const n = rows[r], y = 300 + r * 130;
      for (let i = 0; i < n; i++) { const x = CX + (i - (n - 1) / 2) * 92; man(c, x, y + (1 - k) * 160, 98, r === 4 ? GREEN : r === 0 ? HL : SEP, { hat: i % 2 ? 'bowler' : 'fedora' }); } }
    // money flowing up from the newest (bottom) row
    if (t > t17.old - .1) for (let i = 0; i < 22; i++) { const s0 = t17.old + i * .15, a = ((t - s0) % 3.3 + 3.3) % 3.3 / 1.5; if (t < s0 || a >= 1) continue; const x = CX + (hash(i) - .5) * 700 * (1 - a * .9); txt(c, '$', x, lerp(790, 200, eio(a)), '800 46px JBM', GREEN); }
    c.save(); const kl = back(lin(t, t17.old - .05, t17.old + .3)); if (kl > 0) { c.translate(1440, 360); c.scale(clamp(kl), clamp(kl)); plate(c, -150, -110, 300, 220, 16);
      txt(c, 'NEW MONEY', 0, -55, '400 50px Anton', GREEN); txt(c, '▲', 0, 0, '800 54px JBM', HL); txt(c, 'PAYS OLD', 0, 60, '400 50px Anton', SEP); } c.restore();
    stamp(c, "THE WHOLE TRICK", 1410, 640, 40, DRED, .06, lin(t, t17.whole, t17.whole + .15));
  }, FILM);
  Engine.hit(t17.whole, { shake: 12, punch: .03, cue: 'stamp' }); Engine.cue(t17.old, 'coin-flow');

  // ============================================================ P18  newspaper -> run -> 6 banks -> $20,000,000
  const t18 = { pap: W('P18', 'papers'), num: W('P18', 'numbers'), line: W('P18', 'line'), run: W('P18', 'run'), six: W('P18', 'Six'), down: W('P18', 'down'), lost: W('P18', 'lost'), m20: W('P18', '$20'), mil: W('P18', 'million'), yr: W('P18', '1920') };
  Engine.scene('P18', 'P18', (c, t, lt) => { // spinning newspaper
    sepiaBg(c); const T0 = P('P18').start, k = eo(lin(t, T0 + .02, T0 + 1.0)), rot = (1 - k) * Math.PI * 4;
    for (let i = 0; i < 6; i++) { const a = lin(t, T0 + i * .09, T0 + i * .09 + .9); if (a <= 0 || a >= 1) continue; c.save(); c.translate(lerp(120 + i * 250, 840, a), lerp(900, 500, a) - Math.sin(a * Math.PI) * 120); c.rotate(a * 9 + i); c.globalAlpha = .35 * (1 - a); c.fillStyle = '#efe6cf'; c.fillRect(-60, -80, 120, 160); c.restore(); }
    c.save(); c.translate(840, 500); c.rotate(rot); c.scale(.2 + .8 * k, .2 + .8 * k); c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 40; c.shadowOffsetY = 18; c.fillStyle = '#efe6cf'; c.fillRect(-460, -370, 920, 740); c.shadowColor = 'transparent'; c.fillStyle = BRN;
    txt(c, 'EXTRA!', 0, -290, '400 120px Rye', BRN); c.fillRect(-420, -218, 840, 6);
    txt(c, '160,000,000', -245, -110, '800 54px JBM', BRN); txt(c, 'vs', 0, -110, '400 40px Rye', BRN2); txt(c, '27,000', 255, -110, '800 54px JBM', DRED);
    txt(c, 'NEEDED', -245, -45, '700 28px JBM', BRN2); txt(c, 'EXISTED', 255, -45, '700 28px JBM', BRN2);
    for (let i = 0; i < 9; i++) c.fillRect(-420, 25 + i * 38, 840 * (.55 + hash(i) * .45), 13); c.restore();
  }, FILM);
  Engine.scene([ 'P18', 'line', 1, -.25 ], 'P18', (c, t, lt) => { // the line turns into a run
    sepiaBg(c); floor(c); office(c, t, 1230, 300, 370, 500, 'SECURITIES EXCHANGE CO.'); const T0 = t18.line - .25;
    for (let i = 0; i < 34; i++) { const row = i % 3, x = ((i * 53 + (t - T0) * (260 + 200 * lin(t, t18.line, t18.run)) + 5000) % 1400) + 40, y = 800 - row * 22, s = 150 - row * 14;
      man(c, x, y, s, row === 1 ? '#b9a577' : SEP, { walk: t * (9 + 8 * lin(t, t18.line, t18.run)) + i, run: t > t18.run - .6 ? 1 : 0, arms: i % 5 === 0 && t > t18.run - .4 }); }
    for (let i = 0; i < 12; i++) { const a = lin((t * 1.2 + hash(i) * 3) % 1.4, 0, 1.4); c.fillStyle = `rgba(200,180,140,${.25 * (1 - a)})`; c.beginPath(); c.arc(100 + hash(i + 3) * 1100, 790 - a * 80, 20 + a * 30, 0, 7); c.fill(); }
    txt(c, 'THE LINE OUTSIDE HIS OFFICE…', 700, 205, '400 52px Rye', SEP2);
    const kr = back(lin(t, t18.run - .05, t18.run + .3)); if (kr > 0) { c.save(); c.translate(700, 360); c.scale(clamp(kr), clamp(kr)); c.rotate(-.04); txt(c, 'A RUN!', 0, 0, '400 190px Anton', RED); c.restore(); }
  }, FILM);
  const crumble = i => t18.six + .1 + i * .24;
  Engine.scene([ 'P18', 'Six', 1, -.1 ], 'P18', (c, t, lt) => { // six banks go down, then $20,000,000
    sepiaBg(c); const nDown = [0, 1, 2, 3, 4, 5].filter(i => t > crumble(i)).length, BY = 720;
    for (let i = 0; i < 6; i++) { const x = 215 + i * 250, f = eio(lin(t, crumble(i), crumble(i) + .5));
      c.save(); c.beginPath(); c.rect(x - 140, BY - 150, 280, 242); c.clip(); c.translate(x, BY + f * 150 * 0 ); c.translate(0, f * 190); c.rotate(f * (i % 2 ? .22 : -.22)); bank(c, 0, 0, 215, f > 0 ? '#c94a3a' : SEP); c.restore();
      if (f > 0) { const hk = Math.min(1, f * 1.4); c.fillStyle = '#1a1006'; c.beginPath(); c.moveTo(x - 125 * hk, BY + 92); for (let j = 0; j <= 8; j++) c.lineTo(x - 125 * hk + j * 31 * hk, BY + 92 - (30 + 40 * hash(i * 9 + j)) * hk * Math.sin(Math.PI * j / 8)); c.lineTo(x + 125 * hk, BY + 92); c.closePath(); c.fill(); c.fillStyle = '#6b4a22'; for (let j = 0; j < 6; j++) c.fillRect(x + (hash(i * 5 + j) - .5) * 190 * hk - 9, BY + 70 - hash(i * 3 + j) * 34 * hk, 18, 12); }
      if (f > 0 && f < 1) for (let d = 0; d < 10; d++) { c.fillStyle = `rgba(200,180,140,${.55 * (1 - f)})`; c.beginPath(); c.arc(x + (hash(i * 10 + d) - .5) * 260, BY + 40 - f * 90 * hash(d + 1), 20 + 36 * f, 0, 7); c.fill(); } }
    const lostK = lin(t, t18.lost - .05, t18.lost + .25);
    c.save(); c.translate(840, lerp(300, 200, eo(lostK))); const sc = lerp(1, .55, eo(lostK)); c.scale(sc, sc); txt(c, nDown + ' / 6 BANKS DOWN', 0, 0, '400 118px Anton', RED); c.restore();
    if (lostK > 0) { const k = back(lin(t, t18.lost - .05, t18.lost + .3)); c.save(); c.translate(760, 405); c.scale(clamp(k), clamp(k)); plate(c, -430, -100, 860, 200, 18);
      txt(c, 'INVESTORS LOST ABOUT', 0, -55, '800 30px JBM', SEP2); const v = roll(t, t18.m20 - .1, t18.mil + .25, 20e6, 0, eio); txt(c, '$' + fmt(v), 0, 25, '800 108px JBM', RED); c.restore(); }
    stamp(c, '1920', 1400, 405, 92, SEP, .1, lin(t, t18.yr, t18.yr + .15));
  }, FILM);
  for (let i = 0; i < 6; i++) Engine.hit(crumble(i) + .12, { shake: 12 + i * 2, punch: i === 5 ? .04 : 0, cue: 'demolition' });
  Engine.cue(t18.line, 'crowd-run'); Engine.hit(t18.run, { shake: 16, punch: .03 }); Engine.hit(t18.mil + .25, { shake: 14, punch: .04, glitch: .5, glitchDur: .25 });

  // ============================================================ P19  guilty -> the word -> died broke, $75
  const t19 = { guilty: W('P19', 'guilty'), mail: W('P19', 'mail'), fraud: W('P19', 'fraud'), his: W('P19', 'name'), scam: W('P19', 'scam'), died: W('P19', 'died'), broke: W('P19', 'broke'), est: W('P19', 'estate'), d75: W('P19', '$75') };
  Engine.scene('P19', 'P19', (c, t, lt) => {
    sepiaBg(c); const T0 = P('P19').start;
    paperSlam(c, t, T0, 620, 500, 760, 600, -.02, '#efe6cf', (p, w, h) => {
      txt(p, 'THE CHARGE', 0, -h / 2 + 70, '400 54px Rye', BRN); p.fillStyle = BRN; p.fillRect(-w / 2 + 50, -h / 2 + 115, w - 100, 5);
      typedText(p, 'MAIL', 0, -60, '400 120px Elite', '#1c1c1c', t, t19.mail - .1, t19.mail + .4, 'center', false); typedText(p, 'FRAUD', 0, 70, '400 150px Elite', DRED, t, t19.fraud - .1, t19.fraud + .45, 'center', false);
      txt(p, 'UNITED STATES v. CHARLES PONZI', 0, h / 2 - 50, '400 24px Elite', BRN2); });
    // gavel
    const hit = lin(t, t19.guilty - .25, t19.guilty), rec = lin(t, t19.guilty, t19.guilty + .3), ang = lerp(-1.1, .1, ei(hit)) * (1 - rec * .5);
    c.save(); c.translate(1300, 720); c.rotate(.2); c.fillStyle = '#6b4a22'; c.fillRect(-12, -250, 24, 250); c.save(); c.translate(0, -250); c.rotate(ang * .4); c.fillStyle = '#8a6030'; c.fillRect(-100, -45, 200, 90); c.fillStyle = '#4a3216'; c.fillRect(-100, -45, 22, 90); c.fillRect(78, -45, 22, 90); c.restore(); c.restore();
    c.fillStyle = '#4a3216'; rr(c, 1150, 720, 300, 40, 8); c.fill();
    stamp(c, 'GUILTY', 1240, 260, 130, DRED, -.12, lin(t, t19.guilty, t19.guilty + .15));
  }, FILM);
  Engine.scene([ 'P19', 'His', 1, -.1 ], 'P19', (c, t, lt) => { // dictionary entry
    sepiaBg(c); const T0 = W('P19', 'His') - .1;
    paperSlam(c, t, T0, 840, 490, 1180, 600, -.01, '#f4efe3', (p, w, h) => {
      const word = 'Pon·zi scheme'; typedText(p, word, -w / 2 + 60, -h / 2 + 100, '400 98px Rye', BRN, t, T0 + .05, T0 + .7, 'left', false);
      if (t > T0 + .7) txt(p, '(n.)  /ˈpɒn.zi ˌskiːm/', -w / 2 + 62, -h / 2 + 190, '400 36px Elite', BRN2, 'left');
      const def = 'A fraud that pays earlier investors with money from newer investors.', n = Math.floor(def.length * lin(t, T0 + .6, t19.scam + .15)); const lines = wrapText(p, def.slice(0, n), w - 140, '400 48px Elite');
      lines.forEach((l, i) => txt(p, l, -w / 2 + 62, -h / 2 + 290 + i * 66, '400 48px Elite', '#1c1c1c', 'left'));
      p.fillStyle = RED; p.fillRect(-w / 2 + 60, -h / 2 + 128, 560 * eo(lin(t, T0 + .75, T0 + 1.2)), 5); });
  }, FILM);
  Engine.scene([ 'P19', 'died', 1, -.15 ], 'P19', (c, t, lt) => { // died broke, estate $75
    sepiaBg(c); const T0 = t19.died - .15; c.save(); push(c, lt, 5, 1, 1.05, 840, 490);
    paper(c, 470, 480, 430, 580, -.03, '#a89878', (p, w, h) => { p.fillStyle = 'rgba(43,29,14,.2)'; p.fillRect(-w / 2 + 30, -h / 2 + 30, w - 60, h - 150); man(p, 0, 100, 330, 'rgba(60,45,25,.65)', { hat: 'bowler' }); txt(p, 'CHARLES PONZI', 0, h / 2 - 50, '400 40px Rye', '#3a2c18'); });
    stamp(c, 'BROKE', 470, 450, 120, DRED, -.2, lin(t, t19.broke, t19.broke + .15));
    paperSlam(c, t, t19.est - .05, 1120, 440, 560, 300, .03, '#efe6cf', (p, w, h) => { txt(p, 'ESTATE', 0, -h / 2 + 70, '400 56px Rye', BRN); p.fillStyle = BRN; p.fillRect(-w / 2 + 40, -h / 2 + 110, w - 80, 4);
      const z = back(lin(t, t19.d75 - .05, t19.d75 + .3)); p.save(); p.translate(0, 50); p.scale(clamp(z), clamp(z)); txt(p, '$75', 0, 0, '800 150px JBM', DRED); p.restore(); });
    for (let i = 0; i < 3; i++) { const a = lin(t, t19.d75 + .05 + i * .22, t19.d75 + .5 + i * .22); if (a <= 0) continue; const y = lerp(120, 735, bounce(a)); c.fillStyle = '#d4a84a'; c.beginPath(); c.ellipse(1010 + i * 110, y, 40, 16, 0, 0, 7); c.fill(); c.strokeStyle = '#8a6d1a'; c.lineWidth = 3; c.stroke(); }
    c.restore();
  }, FILM);
  Engine.hit(t19.guilty, { shake: 18, punch: .05, cue: 'gavel' }); Engine.hit(t19.his, { punch: .02 }); Engine.hit(t19.broke, { shake: 12, punch: .03, cue: 'stamp' }); Engine.hit(t19.d75, { shake: 10, punch: .03, cue: 'coins' });

  // ============================================================ P20  coupon dissolves into an oil tank; film look fades to modern dark
  const t20 = { imp: W('P20', 'impossible'), cp: W('P20', 'coupons'), nx: W('P20', 'next'), plain: W('P20', 'plain'), ins: W('P20', 'inside'), tank: W('P20', 'tank') };
  Engine.scene('P20', 'P20', (c, t, lt) => {
    const T0 = P('P20').start, mod = eio(lin(t, t20.plain, t20.tank + .3)); // 0 = sepia, 1 = modern
    sepiaBg(c); if (mod > 0) { c.save(); c.globalAlpha = mod; bgGrid(c, t, 'rgba(255,214,10,.05)'); c.restore(); }
    // coupon with the impossible number stamped on it
    const dis = eio(lin(t, t20.plain, t20.ins + .9)), kIn = back(lin(t, T0 + .02, T0 + .4));
    const CW = 640, CX = 840, CY = 450, tw = 300, th = 400;
    if (dis < 1) { c.save(); c.translate(CX, CY); c.scale(clamp(kIn), clamp(kIn)); coupon(c, 0, 0, CW, -.05, clamp(1 - dis * 1.5)); c.restore();
      stamp(c, '160,000,000 vs 27,000', CX, CY + 250, 46, RED, -.1, lin(t, t20.imp, t20.imp + .15) * (1 - clamp(dis * 3))); }
    // the dissolve: coupon-coloured squares fly into the tank silhouette
    if (dis > 0) { const col = mod > .5 ? '#5b6879' : SEP;
      for (let i = 0; i < 140; i++) { const sx = CX + (hash(i) - .5) * CW, sy = CY + (hash(i + 7) - .5) * CW * .62, gx = CX + (hash(i + 3) - .5) * tw, gy = CY + 150 - hash(i + 5) * th + 20, a = clamp(dis * 1.4 - hash(i + 9) * .4), e = eio(a);
        const px = lerp(sx, gx, e) + Math.sin(e * 3.14 + i) * 40 * (1 - Math.abs(e * 2 - 1)), py = lerp(sy, gy, e) - Math.sin(e * 3.14) * 90; c.fillStyle = col; c.globalAlpha = a > 0 ? (1 - clamp((dis - .85) * 6)) : 0; c.fillRect(px - 8, py - 8, 16, 16); }
      c.globalAlpha = 1; }
    const tk = eo(lin(t, t20.plain + 1.1, t20.tank + .2)); if (tk > 0) { c.save(); c.globalAlpha = tk; glow(c, CX, CY, 420, GOLD, .18 * tk); tank(c, CX, CY + 200, tw, th, { fill: .72 }); c.restore(); }
    if (t > t20.nx) { c.save(); c.globalAlpha = eo(lin(t, t20.nx, t20.nx + .4)) * (1 - mod * 0); plate(c, 1140, 150, 400, 130, 14); txt(c, 'THE NEXT ONE', 1340, 185, '400 42px Anton', PAPER); txt(c, 'HIDING IN PLAIN SIGHT', 1340, 238, '800 24px JBM', HL); c.restore(); }
    film(c, t, 1 - mod);
  }, { film: false, vignette: .6 });
  Engine.hit(t20.plain, { punch: .03, cue: 'whoosh' }); Engine.hit(t20.tank, { glitch: .8, glitchDur: .3, shake: 12, punch: .04, cue: 'sub-boom' });
});
