(function () {
  const ST = { x: 905, y: 1338, s: 0.8, layer: 'front', blur: 0, dim: 0 };
  const DX = [0, 420, -380, 300, -300, 380, -420, 260];
  window.BQ.make = function (c0) {
    const B = window.BM2, T = B.makeT((window.BM2_VOICE || {}).words || []), c = B.deepT(c0, T);
    const els = [], extra = c.sfx2 || [], auto = [];
    const A = (at, name, gain = -9, dur = 0.5) => { if (at != null && at >= 0) auto.push({ at, name, gain, dur }); };
    c.scenes.forEach((sc, i) => { if (i > 0) A(sc.from, i % 2 ? 'whoosh_1' : 'whoosh_2', -11, 0.6);
      switch (sc.type) {
        case 'pile': A(sc.at ?? sc.from, 'pop_2'); A(sc.labelAt, 'pop_1', -10); A(sc.plateAt, 'pop_1', -10); A(sc.sliceAt, 'cash_rustle_1', -11, 1.2); A(sc.crowdAt, 'pop_1', -12, 0.5); A(sc.checkAt, 'success_chime_1', -11, 0.9); break;
        case 'assumes': A(sc.at, 'pop_2'); (sc.rows || []).forEach(r => A(r.at, 'typewriter_1', -11, 0.9)); A(sc.stampAt, 'rubber_stamp_1', -8); break;
        case 'trillion': A(sc.gridAt ?? sc.at + 0.3, 'money_counter_2', -13, sc.dur || 1.6); A(sc.eqAt, 'pop_1', -9); break;
        case 'people': A(sc.at, 'pop_2'); A(sc.sliceAt, 'cash_rustle_1', -11, 1.6); A(sc.youAt, 'success_chime_1', -11, 0.9); break;
        case 'samecheck': A(sc.babyAt, 'pop_2'); A(sc.grandAt, 'pop_2'); A(sc.youAt, 'pop_2'); A(sc.eqAt, 'rubber_stamp_1', -8); break;
        case 'check': A(sc.at, 'pop_2'); A(sc.numAt ?? sc.at, 'money_counter_2', -12, 1.1); A(sc.stampAt, 'rubber_stamp_1', -7); break;
        case 'once': A(sc.at, 'pop_2'); A(sc.onceAt ?? sc.at + 0.3, 'rubber_stamp_1', -8); break;
        case 'vs': A(sc.at, 'pop_2'); A(sc.bigAt, 'swipe_1', -11, 0.5); A(sc.smallAt, 'wrong_buzzer_1', -13, 0.8); break;
        case 'perday': A(sc.at, 'pop_2'); A(sc.gridAt, 'clock_ticking_1', -14, sc.dur || 2.4); A(sc.goneAt, 'rubber_stamp_1', -7); break;
        case 'growth': A(sc.at, 'pop_2'); A(sc.growAt, 'riser_1', -14, 1.0); A(sc.checkAt, 'success_chime_1', -11, 0.9); break;
        case 'ratio': A(sc.at, 'pop_2'); A(sc.gridAt ?? sc.at + 0.5, 'money_counter_2', -13, sc.dur || 1.8); break;
        case 'ask': A(sc.from, 'pop_1'); break;
      } (sc.chips || []).forEach(ch => A(ch.at, 'pop_1', -11, 0.4)); (sc.tags || []).forEach(tg => A(tg.at, 'pop_1', -11, 0.4)); });
    els.push({ id: 'stage', type: 'bstage', layer: 'screen', at: [540, 960], in: -1, z: 10, props: { C: c.C, scenes: c.scenes, hook: c.hook, hideCounter: c.hideCounter || [], beats: c.labels, notes: c.notes || [] } });
    els.push({ id: 'you', type: 'you', layer: 'screen', at: [150, 1213], scale: 0.82, in: -1, z: 20, props: { keys: c.you } });
    els.push({ id: 'hypo', type: 'hypo', layer: 'screen', at: [545, 1316], in: 0.2, z: 20, props: { text: 'HYPOTHETICAL · PRETEND IT’S ALL CASH · SPLIT ONCE' } });
    if (c.cta.like) els.push({ id: 'heart', type: 'heart', layer: 'screen', at: [520, 1205], in: c.cta.like, z: 30, props: { s: 1, dur: 1.0 } });
    if (c.cta.send) els.push({ id: 'plane', type: 'plane', layer: 'screen', at: [0, 0], in: c.cta.send, z: 30, props: { from: [330, 1275], to: [760, 1160], dur: 1.2, s: 0.7 }, out: c.cta.send + 1.5 });
    if (c.cta.follow) els.push({ id: 'follow', type: 'follow', layer: 'screen', at: [520, 1215], in: c.cta.follow, out: c.cta.followOut, z: 30, props: { press: 0.75 } });
    if (c.cta.bubble) els.push({ id: 'bubble', type: 'bubble', layer: 'screen', at: [520, 1205], in: c.cta.bubble.at, z: 30, props: { l1: c.cta.bubble.l1, l2: c.cta.bubble.l2, size: 40, tail: 'left' } });
    const beats = c.scenes.map((s, i) => ({ at: s.from, beat: 'wide', focus: { x: 540 + DX[i % DX.length], y: 740 + (i % 2 ? 90 : -60), w: 1080, h: 300 }, fill: 1, dur: 0.8, st: ST, pose: s.pose || 'talk' }));
    beats.unshift({ at: 0, beat: 'wide', focus: { x: 540, y: 740, w: 1080, h: 300 }, fill: 1, st: ST, pose: 'shock' });
    return {
      series: 'whatif', title: 'EVERY BILLIONAIRE, SPLIT', duration: c.dur,
      footnote: ['ASSUMES: MOSTLY COMPANY SHARES — WE PRETEND IT’S ALL CASH · SPLIT ONCE · NO PRICE DROP', 'FORBES MARCH 2026 LIST · 3,428 BILLIONAIRES · $20.1T · ~8.2B PEOPLE · HYPOTHETICAL · OUR MATH'],
      elements: els, beats, poses: [...(c.cta.follow ? [[c.cta.follow, 'follow', { target: [520, 1215] }]] : []), ...(c.poses || [])], shakes: c.shakes, captions: c.captions, bed: c.bed || { name: 'acoustic_bed_1', gain: -1 }, sfx: [...auto, ...extra],
    };
  };
})();
