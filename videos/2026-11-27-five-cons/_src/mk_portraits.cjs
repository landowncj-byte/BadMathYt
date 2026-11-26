// draws the ILLUSTRATION portraits (Tipton "the lottery IT guy", Tucker "the payday lender") -> ../assets/*.png (640x720). node mk_portraits.cjs
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const TIP = `  const INK = '#1a1210', SK = '#E9B68C', SKS = '#D49A70', HAIR = '#3a2417', SHIRT = '#2F5DA8', LANY = '#F28C00', RED = '#E0281E';
  const MC = document.createElement('canvas').getContext('2d'); const mw = (s, f) => { MC.font = f; return MC.measureText(s).width; };
  const stroke = (g, w = 5) => { g.strokeStyle = INK; g.lineWidth = w; g.lineJoin = 'round'; g.lineCap = 'round'; g.stroke(); };

  // ---------- the character: head + shoulders, centred on the head, ~300 x 380 units ----------
  const tip = (g, cx, cy, s, o = {}) => {
    const caught = o.mood === 'caught', t = o.t || 0; g.save(); g.translate(cx, cy); g.scale(s, s);
    // shoulders / shirt
    g.fillStyle = SHIRT; g.beginPath(); g.moveTo(-150, 215); g.quadraticCurveTo(-148, 112, -60, 94); g.lineTo(60, 94); g.quadraticCurveTo(148, 112, 150, 215); g.closePath(); g.fill(); stroke(g, 5);
    // neck + collar
    g.fillStyle = SKS; g.beginPath(); g.moveTo(-32, 58); g.lineTo(32, 58); g.lineTo(36, 104); g.lineTo(0, 130); g.lineTo(-36, 104); g.closePath(); g.fill(); stroke(g, 4);
    g.fillStyle = '#F5F3EE'; g.beginPath(); g.moveTo(-62, 92); g.lineTo(-8, 92); g.lineTo(-2, 134); g.lineTo(-44, 122); g.closePath(); g.fill(); stroke(g, 4);
    g.beginPath(); g.moveTo(62, 92); g.lineTo(8, 92); g.lineTo(2, 134); g.lineTo(44, 122); g.closePath(); g.fill(); stroke(g, 4);
    // lanyard + security badge
    g.fillStyle = LANY; g.beginPath(); g.moveTo(-46, 96); g.lineTo(-30, 96); g.lineTo(-2, 150); g.lineTo(-16, 156); g.closePath(); g.fill(); stroke(g, 3);
    g.beginPath(); g.moveTo(46, 96); g.lineTo(30, 96); g.lineTo(2, 150); g.lineTo(16, 156); g.closePath(); g.fill(); stroke(g, 3);
    g.fillStyle = '#F5F3EE'; rr(g, -40, 150, 80, 92, 8); g.fill(); stroke(g, 4); g.fillStyle = '#2c3e66'; g.fillRect(-38, 152, 76, 22);
    txt(g, 'MUSL', 0, 163, F.cap(15), '#F5F3EE'); txt(g, 'IT SECURITY', 0, 188, F.cap(10.5), INK);
    g.fillStyle = '#C9CED6'; g.beginPath(); g.arc(0, 213, 15, 0, 7); g.fill(); stroke(g, 2.5); g.fillStyle = '#59606B'; g.fillRect(-14, 232, 28, 5);
    // ears + head
    g.fillStyle = SKS; for (const sx of [-1, 1]) { g.beginPath(); g.ellipse(sx * 80, 4, 13, 22, 0, 0, 7); g.fill(); stroke(g, 4); }
    g.fillStyle = SK; g.beginPath(); g.ellipse(0, -6, 79, 94, 0, 0, 7); g.fill(); stroke(g, 5);
    // hair
    g.fillStyle = HAIR; g.beginPath(); g.moveTo(-82, -20); g.bezierCurveTo(-98, -104, -40, -126, 8, -122); g.bezierCurveTo(62, -124, 100, -90, 82, -20); g.bezierCurveTo(70, -54, 40, -74, -2, -74); g.bezierCurveTo(-42, -70, -68, -52, -82, -20); g.closePath(); g.fill(); stroke(g, 4.5);
    // glasses
    g.fillStyle = 'rgba(205,232,255,.62)'; for (const x of [-64, 12]) { rr(g, x, -26, 52, 40, 11); g.fill(); stroke(g, 6); }
    g.beginPath(); g.moveTo(-12, -10); g.lineTo(12, -10); stroke(g, 5); g.beginPath(); g.moveTo(-64, -12); g.lineTo(-80, -16); g.moveTo(64, -12); g.lineTo(80, -16); stroke(g, 4);
    // eyes (blink every ~3 s)
    const bl = (t % 3.1) > 3.0 ? 0.15 : 1, lk = o.look || 0, pr = caught ? 9 : 6.5; g.fillStyle = caught ? '#fff' : 'transparent';
    for (const x of [-38, 38]) { if (caught) { g.fillStyle = '#fff'; g.beginPath(); g.ellipse(x, -7, 15, 14 * bl, 0, 0, 7); g.fill(); } g.fillStyle = INK; g.beginPath(); g.ellipse(x + lk * 5, -6, pr, pr * bl, 0, 0, 7); g.fill(); }
    // brows + nose + mouth
    g.beginPath(); if (caught) { g.moveTo(-66, -34); g.lineTo(-16, -48); g.moveTo(66, -34); g.lineTo(16, -48); } else { g.moveTo(-66, -40); g.lineTo(-16, -44); g.moveTo(16, -48); g.lineTo(64, -38); } stroke(g, 6);
    g.beginPath(); g.moveTo(-3, 6); g.quadraticCurveTo(-12, 28, 4, 30); stroke(g, 4);
    g.beginPath(); if (caught) { g.moveTo(-28, 58); g.quadraticCurveTo(-10, 48, 0, 56); g.quadraticCurveTo(12, 64, 30, 52); } else { g.moveTo(-30, 54); g.quadraticCurveTo(6, 70, 38, 44); } stroke(g, 5.5);
    if (!caught) { g.beginPath(); g.moveTo(38, 44); g.lineTo(44, 38); stroke(g, 4.5); }
    if (caught) { const dy = (t * 40) % 30; g.fillStyle = '#7CC8FF'; g.beginPath(); g.moveTo(98, -66 + dy); g.quadraticCurveTo(116, -36 + dy, 98, -30 + dy); g.quadraticCurveTo(80, -36 + dy, 98, -66 + dy); g.fill(); stroke(g, 3); }
    // thumb drive in his hand
    if (o.drive) { g.save(); g.translate(128, 170); g.rotate(-0.45); g.fillStyle = SK; g.beginPath(); g.arc(0, 52, 26, 0, 7); g.fill(); stroke(g, 4); g.fillStyle = RED; rr(g, -17, -34, 34, 78, 8); g.fill(); stroke(g, 4.5); g.fillStyle = '#C9CED6'; rr(g, -12, -72, 24, 42, 4); g.fill(); stroke(g, 4); g.fillStyle = INK; g.fillRect(-6, -64, 4, 10); g.fillRect(3, -64, 4, 10); g.fillStyle = SK; g.beginPath(); g.ellipse(0, 40, 27, 20, 0, 0, 7); g.fill(); stroke(g, 4); g.restore(); }
    g.restore();
  };`;
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 640, height: 720 } });
  require('fs').writeFileSync('/tmp/claude-0/cm/pp.html','<style>@font-face{font-family:Anton;src:url(file:///home/user/badmathyt/brand/engine-v2/fonts/anton-latin-400-normal.woff2)}</style><canvas id=c width=640 height=720></canvas><body style="margin:0">'); await p.goto('file:///tmp/claude-0/cm/pp.html');
  await p.evaluate(() => document.fonts.load('40px Anton')); await p.waitForTimeout(300);
  await p.addScriptTag({ content: `(function(){ const rr=(g,x,y,w,h,r)=>{g.beginPath();g.roundRect(x,y,w,h,r)}; const txt=(g,s,x,y,f,c)=>{g.font=f;g.fillStyle=c;g.textAlign='center';g.textBaseline='middle';g.fillText(s,x,y)}; const F={cap:n=>n+'px Anton'}; const rgba=(c,a)=>c; const B={};` + TIP + `; window.__tip = tip; })();` });
  for (const who of ['tipton', 'tucker']) {
    await p.evaluate((who) => {
      const c = document.getElementById('c'), g = c.getContext('2d'); g.clearRect(0, 0, 640, 720);
      const INK0 = '#1a1210';
      const bg = g.createRadialGradient(320, 260, 40, 320, 360, 560); bg.addColorStop(0, '#FFD866'); bg.addColorStop(1, '#E9980B'); g.fillStyle = bg; g.fillRect(0, 0, 640, 720);
      g.fillStyle = 'rgba(255,255,255,.13)'; for (let i = -6; i < 8; i++) { g.beginPath(); g.moveTo(320 + i * 60 - 14, 0); g.lineTo(320 + i * 60 + 14, 0); g.lineTo(320 + i * 150 + 14, 720); g.lineTo(320 + i * 150 - 14, 720); g.fill(); }
      const st = (w = 6) => { g.strokeStyle = INK0; g.lineWidth = w; g.lineJoin = 'round'; g.lineCap = 'round'; g.stroke(); };
      if (who === 'tipton') { window.__tip(g, 300, 282, 2.0, { mood: 'smug', drive: false }); }
      else {
        // Tucker: payday-loan boss, dark suit, red tie, slick hair, smug grin, holds the loan paper
        g.fillStyle = '#23304a'; g.beginPath(); g.moveTo(30, 720); g.quadraticCurveTo(50, 470, 200, 440); g.lineTo(440, 440); g.quadraticCurveTo(590, 470, 610, 720); g.closePath(); g.fill(); st(7);
        g.fillStyle = '#F5F3EE'; g.beginPath(); g.moveTo(250, 440); g.lineTo(390, 440); g.lineTo(320, 560); g.closePath(); g.fill(); st(5);
        g.fillStyle = '#E0281E'; g.beginPath(); g.moveTo(304, 470); g.lineTo(336, 470); g.lineTo(346, 600); g.lineTo(320, 640); g.lineTo(294, 600); g.closePath(); g.fill(); st(5);
        g.fillStyle = '#1a2640'; g.beginPath(); g.moveTo(210, 440); g.lineTo(300, 600); g.lineTo(250, 720); g.lineTo(90, 720); g.quadraticCurveTo(110, 500, 210, 440); g.fill(); st(5);
        g.beginPath(); g.moveTo(430, 440); g.lineTo(340, 600); g.lineTo(390, 720); g.lineTo(550, 720); g.quadraticCurveTo(530, 500, 430, 440); g.fill(); st(5);
        g.fillStyle = '#C98F66'; g.beginPath(); g.moveTo(278, 380); g.lineTo(362, 380); g.lineTo(368, 450); g.quadraticCurveTo(320, 480, 272, 450); g.closePath(); g.fill(); st(5);
        g.fillStyle = '#E2AE84'; g.beginPath(); g.ellipse(320, 290, 120, 140, 0, 0, 7); g.fill(); st(6);
        for (const s of [-1, 1]) { g.fillStyle = '#C98F66'; g.beginPath(); g.ellipse(320 + s * 120, 300, 16, 28, 0, 0, 7); g.fill(); st(5); }
        g.fillStyle = '#16120f'; g.beginPath(); g.moveTo(200, 270); g.bezierCurveTo(186, 140, 280, 128, 340, 134); g.bezierCurveTo(430, 136, 462, 190, 440, 270); g.bezierCurveTo(430, 220, 380, 190, 320, 186); g.bezierCurveTo(250, 186, 210, 220, 200, 270); g.closePath(); g.fill(); st(6);
        // sunglasses
        g.fillStyle = '#10161f'; for (const x of [224, 336]) { g.beginPath(); g.roundRect(x, 262, 82, 52, 16); g.fill(); st(6); } g.beginPath(); g.moveTo(306, 280); g.lineTo(336, 280); st(6);
        g.fillStyle = 'rgba(255,255,255,.35)'; for (const x of [236, 348]) { g.beginPath(); g.moveTo(x, 272); g.lineTo(x + 26, 272); g.lineTo(x + 12, 296); g.closePath(); g.fill(); }
        g.beginPath(); g.moveTo(232, 232); g.lineTo(300, 240); g.moveTo(340, 240); g.lineTo(408, 232); st(8);
        g.beginPath(); g.moveTo(318, 316); g.quadraticCurveTo(302, 346, 328, 350); st(5);
        g.fillStyle = '#fff'; g.beginPath(); g.moveTo(262, 372); g.quadraticCurveTo(330, 420, 400, 360); g.quadraticCurveTo(334, 388, 262, 372); g.closePath(); g.fill(); st(5);
        // loan paper
        g.save(); g.translate(500, 600); g.rotate(0.1); g.fillStyle = '#F5F3EE'; g.beginPath(); g.roundRect(-110, -130, 220, 260, 12); g.fill(); st(6);
        g.fillStyle = '#0B0F14'; g.fillRect(-106, -126, 212, 34); g.fillStyle = '#F5F3EE'; g.font = '36px Anton'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('LOAN', 0, -108);
        g.fillStyle = '#188a56'; g.font = '56px Anton'; g.fillText('$500', 0, -40); g.fillStyle = '#E0281E'; g.fillText('$650', 0, 28);
        g.fillStyle = '#0B0F14'; for (let i = 0; i < 3; i++) g.fillRect(-80, 66 + i * 18, 160 - i * 30, 6); g.restore();
        g.fillStyle = '#E2AE84'; g.beginPath(); g.arc(440, 700, 34, 0, 7); g.fill(); st(5);
      }
    }, who);
    await p.screenshot({ path: '/home/user/badmathyt/videos/2026-11-27-five-cons/assets/' + who + '.png' });
  }
  await b.close();
})();
