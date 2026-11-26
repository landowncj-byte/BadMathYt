// writes ../captions-v2.srt from the engine's own caption chunks (same words + timings as on screen), grouped into 1-2 line cues
const fs = require('fs'), path = require('path'); const { chromium } = require('/opt/node-tools/node_modules/playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } }); await p.goto('file://' + path.resolve(__dirname, 'scene.html')); await p.evaluate(() => window.ready);
  const ch = await p.evaluate(() => BM2.debug.chunks.map(c => ({ s: c.s, e: c.e, t: c.ws.map(w => w.w).join(' ') }))); await b.close();
  const cues = []; let cur = null; const MAX = 72;
  for (const c of ch) { if (cur && (cur.t.length + c.t.length + 1 > MAX || /[.?!]$/.test(cur.t) || (/[,;:]$/.test(cur.t) && cur.t.length >= 34) || c.s - cur.eRaw > 0.9)) { cues.push(cur); cur = null; } if (!cur) cur = { s: c.s, t: c.t, eRaw: c.e }; else { cur.t += ' ' + c.t; cur.eRaw = c.e; } } if (cur) cues.push(cur);
  const f = t => { const ms = Math.round(t * 1000), h = Math.floor(ms / 3600000), m = Math.floor(ms % 3600000 / 60000), s = Math.floor(ms % 60000 / 1000); return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')},${String(ms % 1000).padStart(3, '0')}`; };
  const wrap = t => { if (t.length <= 42) return t; const w = t.split(' '); let best = 0, bd = 1e9; for (let i = 1; i < w.length; i++) { const d = Math.abs(w.slice(0, i).join(' ').length - w.slice(i).join(' ').length); if (d < bd) { bd = d; best = i; } } return w.slice(0, best).join(' ') + '\n' + w.slice(best).join(' '); };
  let out = ''; cues.forEach((c, i) => { const nx = cues[i + 1], e = Math.min(c.eRaw + 0.15, nx ? nx.s - 0.02 : 1e9); out += `${i + 1}\n${f(c.s)} --> ${f(Math.max(e, c.s + 0.4))}\n${wrap(c.t)}\n\n`; });
  fs.writeFileSync(path.resolve(__dirname, '../captions.srt'), out); console.log('cues', cues.length);
})();
