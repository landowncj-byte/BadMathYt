(function () {
  const ST = { x: 905, y: 1338, s: 0.8, layer: 'front', blur: 0, dim: 0 };
  const DX = [0, 420, -380, 300, -300, 380, -420, 260];
  window.MV5.make = function (c) {
    const els = [];
    const extra = c.sfx2 || [], auto = [];
    c.scenes.forEach((sc, i) => { if (i > 0) auto.push({ at: sc.from, name: i % 2 ? 'whoosh_1' : 'whoosh_2', gain: -10, dur: 0.6 });
      if (sc.type === 'cards2') (sc.cards || []).forEach((cd, j) => auto.push({ at: cd.at, name: j ? 'pop_1' : 'pop_2', gain: -9, dur: 0.4 }));
      if (sc.type === 'duo' || sc.type === 'vs') [sc.a, sc.b].forEach((cd, j) => auto.push({ at: cd.at, name: j ? 'pop_1' : 'pop_2', gain: -9, dur: 0.4 }));
      if (sc.type === 'vs' && sc.chip) auto.push({ at: sc.chip.at, name: 'success_chime_1', gain: -11, dur: 1.0 });
      if (sc.type === 'list') sc.items.forEach((cd, j) => auto.push({ at: cd.at, name: j % 2 ? 'pop_1' : 'pop_2', gain: -9, dur: 0.4 }));
      if (sc.type === 'pile') { auto.push({ at: sc.zeroAt, name: 'thud_1', gain: -8, dur: 0.4 }); auto.push({ at: sc.zeroAt, name: 'rubber_stamp_2', gain: -6, dur: 0.5 }); }
      if (sc.type === 'bignum') { auto.push({ at: sc.at, name: 'deep_boom_1', gain: -4, dur: 1.6 }); auto.push({ at: sc.at, name: 'cinematic_hit_1', gain: -7, dur: 1.2 }); auto.push({ at: sc.chip.at, name: 'rubber_stamp_1', gain: -7, dur: 0.5 }); }
      if (sc.type === 'tline') { auto.push({ at: sc.romeAt, name: 'pop_2', gain: -8, dur: 0.4 }); if (sc.pinAt) auto.push({ at: sc.pinAt, name: 'pop_1', gain: -9, dur: 0.5 }); auto.push({ at: sc.from, name: 'rewind_1', gain: -10, dur: 1.4 }); }
      if (sc.type === 'stack') { sc.steps.forEach((st, j) => auto.push({ at: st.at, name: j % 2 ? 'pop_2' : 'pop_1', gain: -9, dur: 0.3 })); auto.push({ at: sc.mergeAt, name: 'swoosh_2', gain: -9, dur: 0.8 });  }
      if (sc.type === 'calendar') auto.push({ at: sc.from, name: 'money_counter_1', gain: -13, dur: 2.4 });
      if (sc.type === 'life') auto.push({ at: sc.from, name: 'riser_1', gain: -13, dur: 2.2 });
      if (sc.type === 'ask') auto.push({ at: sc.from, name: 'pop_1', gain: -9, dur: 0.4 }); });
    if (c.sfx0) auto.push(...c.sfx0);
    els.push({ id: 'stage', type: 'mstage', layer: 'screen', at: [540, 960], in: -1, z: 10, props: { K: c.K, C: c.C, scenes: c.scenes, hook: c.hook, hideCounter: c.hideCounter || [], beats: c.labels, notes: c.notes || [] } });
    els.push({ id: 'you', type: 'you', layer: 'screen', at: [150, 1213], scale: 0.82, in: -1, z: 20, props: { keys: c.you } });
    els.push({ id: 'hypo', type: 'hypo', layer: 'screen', at: [545, 1316], in: 0.2, z: 20, props: { text: 'HYPOTHETICAL · $1,000 A DAY · NO INTEREST' } });
    if (c.cta.like) els.push({ id: 'heart', type: 'heart', layer: 'screen', at: [520, 1205], in: c.cta.like, z: 30, props: { s: 1, dur: 1.0 } });
    if (c.cta.send) els.push({ id: 'plane', type: 'plane', layer: 'screen', at: [0, 0], in: c.cta.send, z: 30, props: { from: [330, 1275], to: [760, 1160], dur: 1.2, s: 0.7 }, out: c.cta.send + '+1.5' });
    if (c.cta.follow) els.push({ id: 'follow', type: 'follow', layer: 'screen', at: [520, 1215], in: c.cta.follow, out: c.cta.followOut, z: 30, props: { press: 0.75 } });
    if (c.cta.bubble) els.push({ id: 'bubble', type: 'bubble', layer: 'screen', at: [520, 1205], in: c.cta.bubble.at, z: 30, props: { l1: c.cta.bubble.l1, l2: c.cta.bubble.l2, size: 40, tail: 'left' } });
    const beats = c.scenes.map((s, i) => ({ at: s.from, beat: 'wide', focus: { x: 540 + DX[i % DX.length], y: 740 + (i % 2 ? 90 : -60), w: 1080, h: 300 }, fill: 1, dur: 0.8, st: ST, pose: s.pose || 'talk' }));
    beats.unshift({ at: 0, beat: 'wide', focus: { x: 540, y: 740, w: 1080, h: 300 }, fill: 1, st: ST, pose: 'shock' });
    return {
      series: 'whatif', title: 'MILLION × BILLION', duration: c.dur,
      footnote: ['ASSUMES: $1,000 SPENT EVERY DAY · NO INTEREST · 1 YEAR = 365.25 DAYS', 'HYPOTHETICAL · OUR MATH · NOT FINANCIAL ADVICE'],
      elements: els, beats, poses: [...(c.cta.follow ? [[c.cta.follow, 'follow', { target: [520, 1215] }]] : []), ...(c.poses || [])], shakes: c.shakes, captions: c.captions, bed: c.bed || { name: 'jazz_bed_2', gain: -1 }, sfx: [...auto, ...extra],
    };
  };
})();
