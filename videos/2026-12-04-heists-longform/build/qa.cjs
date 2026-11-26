// geometry QA on the compiled scene: for every beat (0.8 s after it lands) check
//  1) the focused thing is fully on screen and clear of the HUD chip (top-left) and the caption band,
//  2) the storyteller does not overlap the focused box,
//  3) captions (bbox of the active chunk) do not overlap the focused box.
const path = require('path'); const { chromium } = require('/opt/node-tools/node_modules/playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } }); await p.goto('file://' + path.resolve(__dirname, 'scene.html')); await p.evaluate(() => window.ready);
  const res = await p.evaluate(() => {
    const D = BM2.debug, out = [], M = document.createElement('canvas').getContext('2d'); M.font = BM2.F.cap(58);
    const inter = (a, b) => Math.max(0, Math.min(a[2], b[2]) - Math.max(a[0], b[0])) * Math.max(0, Math.min(a[3], b[3]) - Math.max(a[1], b[1]));
    D.beats.forEach((bt, i) => { if (i === 0) return; const t = bt.t + 0.8; if (t > 507) return; const s = D.cam.base(t), st = D.stTrack.at(t); let box; try { box = D.boxOf(bt.focus); } catch (e) { return; }
      const c = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([a, d]) => BM2.Camera.toScreen(s, box.x + a * box.w / 2, box.y + d * box.h / 2)), r = [Math.min(...c.map(q => q[0])), Math.min(...c.map(q => q[1])), Math.max(...c.map(q => q[0])), Math.max(...c.map(q => q[1]))];
      const ch = D.chunks.find(k => t >= k.s && t < k.e), cw = ch ? M.measureText(ch.ws.map(w => w.w).join(' ').toUpperCase()).width : 0, cap = ch ? [960 - cw / 2, 915, 960 + cw / 2, 985] : [0, 0, 0, 0];
      const sr = [st.x - 118 * st.s, st.y - 300 * st.s, st.x + 118 * st.s, st.y + 8], chip = [64, 40, 760, 86], area = (r[2] - r[0]) * (r[3] - r[1]) || 1, num = bt.beat === 'zoom-on-number';
      const f = { t: +bt.t.toFixed(2), beat: bt.beat, focus: JSON.stringify(bt.focus).slice(0, 40), rect: r.map(Math.round), off: r[0] < -4 || r[2] > 1924 || r[1] < -4 || r[3] > 1084, st: +(inter(r, sr) / area).toFixed(2), cap: +(inter(r, cap) / area).toFixed(2), chip: +(inter(r, chip) / area).toFixed(2), stLayer: st.layer };
      out.push(f); });
    return out;
  });
  await b.close(); let bad = 0;
  for (const f of res) { const flags = []; if (f.st > 0.02 && f.stLayer !== 'back') flags.push('STORYTELLER ' + f.st); if (f.cap > 0.04) flags.push('CAPTION ' + f.cap); if (f.chip > 0.04) flags.push('CHIP ' + f.chip); if (f.beat === 'zoom-on-number' && f.off) flags.push('OFFSCREEN'); if (flags.length) { bad++; console.log(f.t, f.beat, f.focus, f.rect.join(','), flags.join(' ')); } }
  console.log(`${res.length} beats checked, ${bad} flagged`);
})();
