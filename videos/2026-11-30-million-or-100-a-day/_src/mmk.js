(function () {
  const ST = { x: 905, y: 1338, s: 0.8, layer: 'front', blur: 0, dim: 0 };
  const DX = [0, 420, -380, 300, -300, 380, -420, 260];
  window.M5.make = function (c0) {
    const B = window.BM2, T = B.makeT((window.BM2_VOICE || {}).words || []), c = B.deepT(c0, T);
    const els = [], extra = c.sfx2 || [], auto = [];
    const A = (at, name, gain = -9, dur = 0.5) => { if (at != null && at >= 0) auto.push({ at, name, gain, dur }); };
    c.scenes.forEach((sc, i) => { if (i > 0) A(sc.from, i % 2 ? 'whoosh_1' : 'whoosh_2', -11, 0.6);
      switch (sc.type) {
        case 'piles': A(sc.leftAt, 'pop_2'); A(sc.rightAt, 'pop_1'); A(sc.orAt, 'pop_1', -10, 0.4); A(sc.pick, 'success_chime_1', -12, 0.9); (sc.tags || []).forEach(tg => A(tg.at, 'pop_1', -10, 0.4)); break;
        case 'drip': for (let k = 0; k < 8; k++) A(sc.from + 0.2 + k * 0.28, 'cash_rustle_1', -16, 0.3); break;
        case 'rent': A(sc.numAt, 'money_counter_2', -12, 1.1); A(sc.rentAt, 'pop_2'); A(sc.grocAt, 'pop_1'); break;
        case 'year': A(sc.at, 'money_counter_2', -12, sc.dur || 1.6); A(sc.at + (sc.dur || 1.6), 'success_chime_1', -11, 0.9); break;
        case 'race': A(sc.from, 'riser_1', -16, 1.6); if (sc.catchAt != null) { A(sc.catchAt, 'deep_boom_1', -5, 1.4); A(sc.catchAt, 'cinematic_hit_1', -8, 1.2); A(sc.catchAt + 0.2, 'rubber_stamp_1', -8, 0.5); } break;
        case 'years27': A(sc.at, 'clock_ticking_1', -14, sc.dur || 2); A(sc.at + (sc.dur || 2), 'ding_2', -9, 0.6); break;
        case 'blow': A(sc.at, 'cash_rustle_1', -12, sc.dur || 1.2); A(sc.at + (sc.dur || 1.2), 'sad_trombone_1', -12, 1.2); (sc.cars || []).forEach(cr => A(cr, 'car_stop_1', -12, 0.6)); break;
        case 'life': (sc.rows || []).forEach(r => { if (r.at >= 0) { A(r.at, 'swipe_1', -12, 0.4); A(r.numAt ?? r.at, 'money_counter_1', -14, 0.9); } if (r.resAt != null && r.at >= 0) A(r.resAt, r.win ? 'success_chime_1' : 'wrong_buzzer_1', r.win ? -10 : -12, 0.9); }); (sc.tags || []).forEach(tg => A(tg.at, 'pop_1', -10, 0.4)); break;
        case 'vs': sc.items.forEach(it => A(it.at, 'pop_2')); if (sc.gap) A(sc.gap.at, 'rubber_stamp_1', -7, 0.5); break;
        case 'ask': A(sc.from, 'pop_1'); break;
      } (sc.chips || []).forEach(ch => A(ch.at, 'pop_1', -11, 0.4)); });
    els.push({ id: 'stage', type: 'mstage', layer: 'screen', at: [540, 960], in: -1, z: 10, props: { K: c.K, C: c.C, scenes: c.scenes, hook: c.hook, hideCounter: c.hideCounter || [], beats: c.labels, notes: c.notes || [] } });
    els.push({ id: 'you', type: 'you', layer: 'screen', at: [150, 1213], scale: 0.82, in: -1, z: 20, props: { keys: c.you } });
    els.push({ id: 'hypo', type: 'hypo', layer: 'screen', at: [545, 1316], in: 0.2, z: 20, props: { text: 'HYPOTHETICAL · NO TAX · NO INTEREST' } });
    if (c.cta.like) els.push({ id: 'heart', type: 'heart', layer: 'screen', at: [520, 1205], in: c.cta.like, z: 30, props: { s: 1, dur: 1.0 } });
    if (c.cta.send) els.push({ id: 'plane', type: 'plane', layer: 'screen', at: [0, 0], in: c.cta.send, z: 30, props: { from: [330, 1275], to: [760, 1160], dur: 1.2, s: 0.7 }, out: c.cta.send + 1.5 });
    if (c.cta.follow) els.push({ id: 'follow', type: 'follow', layer: 'screen', at: [520, 1215], in: c.cta.follow, out: c.cta.followOut, z: 30, props: { press: 0.75 } });
    if (c.cta.bubble) els.push({ id: 'bubble', type: 'bubble', layer: 'screen', at: [520, 1205], in: c.cta.bubble.at, z: 30, props: { l1: c.cta.bubble.l1, l2: c.cta.bubble.l2, size: 40, tail: 'left' } });
    const beats = c.scenes.map((s, i) => ({ at: s.from, beat: 'wide', focus: { x: 540 + DX[i % DX.length], y: 740 + (i % 2 ? 90 : -60), w: 1080, h: 300 }, fill: 1, dur: 0.8, st: ST, pose: s.pose || 'talk' }));
    beats.unshift({ at: 0, beat: 'wide', focus: { x: 540, y: 740, w: 1080, h: 300 }, fill: 1, st: ST, pose: 'shock' });
    return {
      series: 'whatif', title: 'A MILLION OR $100 A DAY', duration: c.dur,
      footnote: ['ASSUMES: $100 EVERY DAY (365 DAYS) · NO TAX · NO INTEREST · NO INFLATION · AGES ARE EXAMPLES', 'HYPOTHETICAL · OUR MATH · NOT FINANCIAL ADVICE'],
      elements: els, beats, poses: [...(c.cta.follow ? [[c.cta.follow, 'follow', { target: [520, 1215] }]] : []), ...(c.poses || [])], shakes: c.shakes, captions: c.captions, bed: c.bed || { name: 'funk_bed_1', gain: -1 }, sfx: [...auto, ...extra],
    };
  };
})();
