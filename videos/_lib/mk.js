// CS builder: topic definition (CS_TOPIC) + cut definition (CS_CUT) -> BM2 scene spec. Runs in the browser (scene.js), words from window.BM2_VOICE.
(function () {
  const B = window.BM2;
  const ST = { x: 905, y: 1338, s: 0.8, layer: 'front', blur: 0, dim: 0 };
  const DX = [0, 420, -380, 300, -300, 380, -420, 260];
  const POSES = ['talk', 'chin', 'shock', 'point', 'talk', 'chin'];
  const norm = s => String(s).toLowerCase().replace(/[^a-z0-9$%']/g, '');
  const TIMEKEY = /^(at|out|xmark|bars|fillAt|tightAt|[a-z0-9]*At)$/;
  window.CS.make = function (TOPIC, CUT) {
    const V = window.BM2_VOICE, words = V.words, sents = V.sentences, dur = CUT.dur, th = TOPIC;
    const W = words.map(w => ({ n: norm(w.w), s: w.s, e: w.e }));
    // ---- sentence -> scene key
    const keys = []; const used = new Set();
    sents.forEach((s, i) => { let k = (CUT.force || {})[i]; if (i === 0 && k == null) k = CUT.first; if (k == null) { for (const [re, key] of TOPIC.rules) { if (re.test(s.text) && !used.has(key + '@' + 0)) { k = key; break; } } } if (k != null && k !== '-') used.add(k + '@0'); keys.push(k); });
    keys[0] = (CUT.force || {})[0] ?? CUT.first ?? keys[0] ?? 'hook';
    const segs = []; sents.forEach((s, i) => { if (keys[i] != null && keys[i] !== '-') segs.push({ key: keys[i], i, from: i === 0 ? 0 : Math.max(0, s.start - 0.08) }); });
    segs.forEach((g, j) => { g.to = j + 1 < segs.length ? segs[j + 1].from : dur + 1; g.iEnd = j + 1 < segs.length ? segs[j + 1].i : sents.length; });
    const scenes = [], sfx = [], labels = [], pipk = [];
    const A = (at, name, gain = -9, d = 0.5) => { if (at != null && at >= 0) sfx.push({ at, name, gain, dur: d }); };
    const SFXK = { chip: ['pop_1', -11], card: ['pop_2', -10], person: ['camera_shutter_1', -8], photo: ['camera_shutter_2', -9], stamp: ['rubber_stamp_1', -7], count: ['pop_2', -10], bars: ['pop_1', -10], icon: ['pop_1', -12], cal: ['pop_1', -11], board: ['pop_2', -10], row: ['pop_1', -10], progress: ['pop_1', -11], arrow: ['swipe_1', -12] };
    segs.forEach((sg, j) => {
      const def = TOPIC.scenes[sg.key]; if (!def) throw new Error('no scene ' + sg.key + ' (sentence ' + sg.i + ')'); const from = sg.from, to = Math.min(sg.to, dur + 0.4), len = to - from, ww = W.filter(w => w.s >= from - 0.05 && w.s < to);
      const rel = (v, i, n) => { // time ref -> absolute
        if (typeof v === 'number') return from + v;
        if (typeof v === 'string' && v[0] === '~') { let q = v.slice(1), nth = 1, off = 0; const mo = q.match(/([+-]\d+(\.\d+)?)$/); if (mo && q.length > mo[0].length) { off = parseFloat(mo[1]); q = q.slice(0, q.length - mo[0].length); } const m = q.match(/#(\d+)$/); if (m) { nth = +m[1]; q = q.replace(/#\d+$/, ''); } if (q[0] === '%') return from + len * parseFloat(q.slice(1)); if (q[0] === '+') return from + parseFloat(q.slice(1)); for (const alt of q.split('|')) { const hit = ww.filter(w => w.n === norm(alt)); if (hit[nth - 1]) return hit[nth - 1].s + off; } for (const alt of q.split('|')) { const hit2 = ww.filter(w => w.n.startsWith(norm(alt))); if (hit2[nth - 1]) return hit2[nth - 1].s + off; } console.warn('CS: word "' + q + '" not in scene ' + sg.key + '@' + from.toFixed(1)); return from + 0.5; }
        return v; };
      const walk = (o, ctx) => { if (Array.isArray(o)) return o.map(x => walk(x, ctx)); if (o && typeof o === 'object') { const r = {}; for (const [k, v] of Object.entries(o)) r[k] = TIMEKEY.test(k) && (typeof v === 'number' || (typeof v === 'string' && v[0] === '~')) ? rel(v) : walk(v, ctx); return r; } return o; };
      const n = def.items.length; const auto = Math.min(0.55, Math.max(0.2, (len - 0.8) / Math.max(1, n + 1)));
      let ai = 0; const items = def.items.map((it0, i) => { const it = walk(it0); if (it.at == null) { it.at = from + 0.05 + ai * auto; ai++; } else if (it0.at === 0 || it0.at === undefined) {} it.x = it.x ?? 540; it.y = it.y ?? 740; return it; });
      items.forEach(it => { const d = SFXK[it.k]; if (it.sfx === false) return; if (it.sfx) A(it.at, it.sfx, -9); else if (d && !(it.k === 'text')) A(it.at, d[0], d[1], 0.6); });
      if (j > 0) A(from, j % 2 ? 'whoosh_1' : 'whoosh_2', -12, 0.6);
      if (def.lab) labels.push({ at: from, text: def.lab });
      if (def.pip) pipk.push({ at: Math.max(0, from + 0.05), ...def.pip });
      scenes.push({ from, to, items, pose: def.pose || POSES[j % POSES.length], dy: def.dy || 0, sc: def.sc || 1, key: sg.key });
    });
    // ---- CTA from sentence text
    const cta = {}; sents.forEach((s, i) => { const tx = s.text; if (!cta.like && /\blike\b/i.test(tx) && /(hit|smash|drop|tap).*like|like if/i.test(tx)) cta.like = s.start + 0.1; else if (!cta.send && /\bsend this\b|\bshare this\b/i.test(tx)) cta.send = s.start + 0.1; else if (!cta.follow && /^follow\b|\bfollow if\b/i.test(tx)) { cta.follow = s.start + 0.1; cta.followOut = s.end + 0.1; } });
    const last = sents[sents.length - 1]; if (CUT.bubble) cta.bubble = { at: last.start + 0.25, ...CUT.bubble };
    if (CUT.hook && scenes[1]) CUT.hook.until = Math.min(CUT.hook.until, scenes[1].from - 0.3);
    const els = [];
    els.push({ id: 'stage', type: 'csstage', layer: 'screen', at: [540, 960], in: -1, z: 10, props: { scenes, hook: CUT.hook, labels, pip: CUT.pip || pipk, pipWho: TOPIC.pipWho, notes: CUT.notes || [] } });
    els.push({ id: 'hypo', type: 'hypo', layer: 'screen', at: [545, 1316], in: 0.2, z: 20, props: { text: TOPIC.hypo } });
    if (cta.like) els.push({ id: 'heart', type: 'heart', layer: 'screen', at: [520, 1205], in: cta.like, z: 30, props: { s: 1, dur: 1.0 } });
    if (cta.send) els.push({ id: 'plane', type: 'plane', layer: 'screen', at: [0, 0], in: cta.send, z: 30, props: { from: [330, 1275], to: [760, 1160], dur: 1.2, s: 0.7 }, out: cta.send + 1.5 });
    if (cta.follow) els.push({ id: 'follow', type: 'follow', layer: 'screen', at: [520, 1215], in: cta.follow, out: cta.followOut, z: 30, props: { press: 0.75 } });
    if (cta.bubble) els.push({ id: 'bubble', type: 'bubble', layer: 'screen', at: [520, 1205], in: cta.bubble.at, z: 30, props: { l1: cta.bubble.l1, l2: cta.bubble.l2, size: 40, tail: 'left' } });
    if (CUT.hook) { A(0.04, 'deep_boom_2', -6, 0.5); }
    if (cta.like) A(cta.like, 'pop_2', -9, 0.4); if (cta.send) A(cta.send, 'swoosh_1', -9, 0.9); if (cta.follow) { A(cta.follow, 'pop_1', -9, 0.5); A(cta.follow + 0.75, 'click_1', -8, 0.3); A(cta.follow + 0.85, 'success_chime_1', -12, 1.2); } if (cta.bubble) A(cta.bubble.at, 'pop_1', -9, 0.5);
    (CUT.sfx || []).forEach(x => sfx.push(x));
    const beats = scenes.map((s, i) => ({ at: s.from, beat: 'wide', focus: { x: 540 + DX[i % DX.length], y: 740 + (i % 2 ? 90 : -60), w: 1080, h: 300 }, fill: 1, dur: 0.8, st: ST, pose: s.pose }));
    beats.unshift({ at: 0, beat: 'wide', focus: { x: 540, y: 740, w: 1080, h: 300 }, fill: 1, st: ST, pose: 'shock' });
    const poses = []; if (cta.follow) poses.push([cta.follow, 'follow', { target: [520, 1215] }]); if (cta.like) poses.push([cta.like + 0.1, 'you']); if (cta.send) poses.push([cta.send + 0.1, 'you']);
    const shakes = (CUT.shakes || []);
    window.CS_DEBUG = scenes.map(s => s.key + '@' + s.from.toFixed(1)).join(' ');
    return { series: TOPIC.series, title: TOPIC.title, duration: dur, footnote: TOPIC.footnote, elements: els, beats, poses, shakes, captions: CUT.captions || { gap: 16 }, bed: { name: CUT.bed, gain: -1 }, sfx };
  };
})();
