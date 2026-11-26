// draws the ILLUSTRATION founder portrait (hoodie, laptop, pitch slide) -> founder.png (640x720). Run: node mk_founder.cjs
const { chromium } = require('/opt/node-tools/node_modules/playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 640, height: 720 } });
  await p.setContent('<canvas id=c width=640 height=720></canvas><body style="margin:0">');
  await p.addStyleTag({ content: '@font-face{font-family:A;src:url(file:///home/user/badmathyt/brand/engine-v2/fonts/anton-latin-400-normal.woff2)}' }).catch(() => {});
  await p.evaluate(() => {
    const c = document.getElementById('c'), g = c.getContext('2d'); const INK = '#1a1210';
    const st = (w = 6) => { g.strokeStyle = INK; g.lineWidth = w; g.lineJoin = 'round'; g.lineCap = 'round'; g.stroke(); };
    const bg = g.createRadialGradient(320, 260, 40, 320, 360, 560); bg.addColorStop(0, '#FFD866'); bg.addColorStop(1, '#E9980B'); g.fillStyle = bg; g.fillRect(0, 0, 640, 720);
    g.fillStyle = 'rgba(255,255,255,.13)'; for (let i = -6; i < 8; i++) { g.beginPath(); g.moveTo(320 + i * 60 - 14, 0); g.lineTo(320 + i * 60 + 14, 0); g.lineTo(320 + i * 150 + 14, 720); g.lineTo(320 + i * 150 - 14, 720); g.fill(); }
    // hair back
    g.fillStyle = '#5a2e14'; g.beginPath(); g.moveTo(130, 300); g.bezierCurveTo(100, 110, 220, 70, 320, 74); g.bezierCurveTo(430, 70, 540, 120, 510, 330); g.lineTo(520, 470); g.lineTo(120, 470); g.closePath(); g.fill(); st(6);
    // hoodie body
    g.fillStyle = '#7A3FD1'; g.beginPath(); g.moveTo(40, 720); g.quadraticCurveTo(50, 470, 200, 440); g.lineTo(440, 440); g.quadraticCurveTo(590, 470, 600, 720); g.closePath(); g.fill(); st(7);
    // hood ring
    g.fillStyle = '#5E2BAA'; g.beginPath(); g.ellipse(320, 452, 150, 52, 0, 0, Math.PI); g.fill(); st(6);
    // strings
    g.strokeStyle = '#F5F3EE'; g.lineWidth = 8; for (const s of [-1, 1]) { g.beginPath(); g.moveTo(320 + s * 50, 490); g.quadraticCurveTo(320 + s * 60, 560, 320 + s * 48, 610); g.stroke(); }
    // neck
    g.fillStyle = '#D49A70'; g.beginPath(); g.moveTo(278, 380); g.lineTo(362, 380); g.lineTo(368, 470); g.quadraticCurveTo(320, 500, 272, 470); g.closePath(); g.fill(); st(5);
    // head
    g.fillStyle = '#E9B68C'; g.beginPath(); g.ellipse(320, 290, 124, 142, 0, 0, 7); g.fill(); st(6);
    // hair front (side part)
    g.fillStyle = '#5a2e14'; g.beginPath(); g.moveTo(194, 270); g.bezierCurveTo(176, 130, 290, 120, 360, 140); g.bezierCurveTo(440, 160, 462, 220, 446, 280); g.bezierCurveTo(430, 210, 390, 180, 330, 176); g.bezierCurveTo(260, 176, 214, 210, 194, 270); g.closePath(); g.fill(); st(6);
    // eyes, brows, nose, smirk
    g.fillStyle = INK; for (const x of [268, 372]) { g.beginPath(); g.ellipse(x, 292, 10, 12, 0, 0, 7); g.fill(); }
    g.beginPath(); g.moveTo(236, 262); g.lineTo(296, 254); g.moveTo(344, 252); g.lineTo(404, 262); st(7);
    g.beginPath(); g.moveTo(318, 304); g.quadraticCurveTo(304, 340, 328, 344); st(5);
    g.fillStyle = '#C0443A'; g.beginPath(); g.moveTo(272, 370); g.quadraticCurveTo(330, 410, 392, 358); g.quadraticCurveTo(340, 384, 272, 370); g.closePath(); g.fill(); st(5);
    g.fillStyle = 'rgba(224,120,100,.4)'; for (const x of [236, 404]) { g.beginPath(); g.ellipse(x, 336, 20, 12, 0, 0, 7); g.fill(); }
    // pitch slide held up in front (no logos)
    g.save(); g.translate(320, 628); g.rotate(-0.04); g.fillStyle = '#F5F3EE'; g.beginPath(); g.roundRect(-190, -92, 380, 190, 14); g.fill(); st(7);
    g.fillStyle = '#0B0F14'; g.fillRect(-186, -88, 372, 30); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = '#F5F3EE'; g.font = '700 18px "JetBrains Mono",monospace'; g.fillText('PITCH DECK', 0, -73);
    g.fillStyle = '#00A152'; g.font = '800 50px Inter,Arial,sans-serif'; g.fillText('4.25M USERS', 0, 0); 
    g.fillStyle = '#E9B68C'; for (const x of [-170, 170]) { g.beginPath(); g.arc(x, 90, 26, 0, 7); g.fill(); st(5); } g.restore();
  });
  await p.evaluate(()=>document.fonts.load('84px A')).catch(()=>{}); await p.waitForTimeout(400);
  await p.screenshot({ path: '/home/user/badmathyt/videos/2026-11-25-javice-fake-users/_src/founder.png' }); await b.close();
})();
