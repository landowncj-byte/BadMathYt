// node render.cjs stills t1,t2,... outdir     (t = seconds, or "P05" / "P05+1.2" paragraph-relative)
// node render.cjs video out.mp4 30 [fromFrame] [toFrame]
// node render.cjs info        (prints duration + paragraph starts)   |   node render.cjs frames 30
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path'); const { spawn } = require('child_process');
const rd = f => fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : null;
(async () => {
  const tl = rd(path.join(__dirname, '../voice/timeline.json')) || rd(path.join(__dirname, 'timeline.stub.json')), mouth = rd(path.join(__dirname, '../voice/mouth.json'));
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await p.addInitScript(d => { window.__DATA__ = d; }, { timeline: tl, mouth });
  p.on('pageerror', e => console.log('ERR', e.message)); p.on('console', m => { if (m.type() === 'error') console.log('[c]', m.text()); });
  await p.goto('file://' + __dirname + '/index.html'); await p.evaluate(() => window.ready);
  const [mode, a, c, d, e] = process.argv.slice(2);
  const miss = await p.evaluate(() => Engine.missing); if (miss.length) console.log('WARN word not found (fell back to script position):', [...new Set(miss)].join(' | '));
  if (mode === 'info') { console.log(JSON.stringify(await p.evaluate(() => ({ DUR, NARR_END: Engine.NARR_END, scenes: Engine.sorted.map(s => [+s.start.toFixed(2), s.opts.name || '']) })))); }
  else if (mode === 'frames') console.log(Math.ceil((await p.evaluate(() => window.DUR)) * +a));
  else if (mode === 'stills') { fs.mkdirSync(c, { recursive: true });
    for (const tok of a.split(',')) { let t; const m = tok.match(/^(P\d+)([+-][\d.]+)?$/); if (m) t = await p.evaluate(id => Engine.P(id).start, m[1]) + (m[2] ? +m[2] : 0); else if (tok === 'END') t = await p.evaluate(() => Engine.NARR_END + 1); else t = +tok;
      await p.evaluate(t => window.render(t), t); await p.screenshot({ path: path.join(c, `s_${String(t.toFixed(2)).padStart(6, '0')}${m ? '_' + tok.replace('+', 'p') : ''}.png`) }); } }
  else if (mode === 'video') { const fps = +c, dur = await p.evaluate(() => window.DUR), n0 = d ? +d : 0, n1 = e ? +e : Math.ceil(dur * fps);
    const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-pix_fmt', 'yuv420p', a], { stdio: ['pipe', 'inherit', 'inherit'] });
    for (let n = n0; n < n1; n++) { await p.evaluate(t => window.render(t), n / fps); const buf = await p.screenshot({ type: 'jpeg', quality: 94 }); if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r)); }
    ff.stdin.end(); await new Promise(r => ff.on('close', r)); }
  await b.close();
})();
