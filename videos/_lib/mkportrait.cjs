// usage: node mkportrait.cjs <draw.js> <out.png> [w] [h]   -- draw.js defines  function draw(g,W,H,H_)  (canvas 2D); renders to PNG via playwright
const fs = require('fs'), path = require('path'); const { chromium } = require('playwright');
(async () => {
  const [src, out, w = 800, h = 800] = process.argv.slice(2); const code = fs.readFileSync(src, 'utf8');
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: +w, height: +h } });
  await p.setContent(`<body style="margin:0"><canvas id=c width=${w} height=${h}></canvas></body>`);
  await p.evaluate(`${code}\n;draw(document.getElementById('c').getContext('2d'),${w},${h});`);
  const d = await p.evaluate(() => document.getElementById('c').toDataURL('image/png')); fs.writeFileSync(out, Buffer.from(d.split(',')[1], 'base64')); await b.close(); console.log('wrote', out);
})();
