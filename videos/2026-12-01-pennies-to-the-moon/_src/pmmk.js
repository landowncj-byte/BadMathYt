(function () {
  const ST = { x: 905, y: 1338, s: 0.8, layer: 'front', blur: 0, dim: 0 };
  const DX = [0, 420, -380, 300, -300, 380, -420, 260];
  window.PM.make = function (c0) {
    const B = window.BM2, T = B.makeT((window.BM2_VOICE || {}).words || []), c = B.deepT(c0, T);
    const els = [], extra = c.sfx2 || [], auto = [];
    c.scenes.forEach((sc, i) => { if (i > 0) auto.push({ at: sc.from, name: i % 2 ? 'whoosh_1' : 'whoosh_2', gain: -12, dur: 0.6 });
      if (sc.type === 'tower') { const bill = sc.kind === 'bill'; if (sc.drop != null) auto.push({ at: sc.drop + 0.3, name: 'coin_single_1', gain: -8, dur: 0.5 }); if (sc.zoomAt != null) { auto.push({ at: sc.zoomAt, name: 'riser_1', gain: -11, dur: sc.zoomDur || 2.4 }); auto.push({ at: sc.zoomAt + (sc.zoomDur || 2.4) - 0.1, name: 'deep_boom_1', gain: -6, dur: 1.4 }); } }
      if (sc.type === 'penny') { auto.push({ at: sc.from + 0.1, name: 'pop_2', gain: -9, dur: 0.4 }); auto.push({ at: sc.edge, name: 'click_1', gain: -9, dur: 0.3 }); }
      if (sc.type === 'moon') { auto.push({ at: sc.at, name: 'swipe_1', gain: -11, dur: 0.6 }); if (sc.never) auto.push({ at: sc.never, name: 'rubber_stamp_1', gain: -8, dur: 0.5 }); }
      if (sc.type === 'hundred') { for (let k = 0; k < 100; k += 10) auto.push({ at: sc.at + k * 0.012, name: 'coin_single_2', gain: -14, dur: 0.2 }); auto.push({ at: sc.merge + 0.3, name: 'cash_register_1', gain: -9, dur: 0.8 }); }
      if (sc.type === 'bignum') { auto.push({ at: sc.at, name: 'money_counter_2', gain: -12, dur: 1.4 }); auto.push({ at: sc.at + sc.dur * 0.8, name: 'deep_boom_1', gain: -5, dur: 1.4 }); auto.push({ at: sc.at + sc.dur * 0.8, name: 'cinematic_hit_1', gain: -8, dur: 1.2 }); }
      if (sc.type === 'jackpot') { auto.push({ at: sc.at, name: 'cash_register_1', gain: -9, dur: 0.8 }); auto.push({ at: sc.at + 0.5, name: 'thud_1', gain: -9, dur: 0.4 }); if (sc.pct) auto.push({ at: sc.pct, name: 'success_chime_1', gain: -9, dur: 1.1 }); }
      if (sc.type === 'jackpots') auto.push({ at: sc.at, name: 'money_counter_1', gain: -12, dur: sc.dur });
      if (sc.type === 'swap') { auto.push({ at: sc.from + 0.1, name: 'pop_2', gain: -9, dur: 0.4 }); for (let k = 0; k < 14; k += 3) auto.push({ at: sc.at + k * 0.12, name: 'pop_1', gain: -13, dur: 0.2 }); if (sc.eq) auto.push({ at: sc.eq, name: 'success_chime_1', gain: -10, dur: 1.0 }); }
      if (sc.type === 'people') { for (let k = 0; k < (sc.n || 31); k += 6) auto.push({ at: sc.at + k * (sc.per || 0.05), name: 'coin_single_2', gain: -13, dur: 0.2 }); auto.push({ at: sc.at + 0.1, name: 'pop_1', gain: -9, dur: 0.4 }); }
      if (sc.type === 'weight') { auto.push({ at: sc.at, name: 'money_counter_2', gain: -13, dur: sc.dur }); auto.push({ at: sc.at + sc.dur * 0.8, name: 'thud_1', gain: -5, dur: 0.6 }); }
      if (sc.type === 'versus') { auto.push({ at: sc.at, name: 'swipe_1', gain: -11, dur: 0.6 }); if (sc.ratio) auto.push({ at: sc.ratio, name: 'rubber_stamp_1', gain: -8, dur: 0.5 }); }
      if (sc.type === 'ask') auto.push({ at: sc.from, name: 'pop_1', gain: -9, dur: 0.4 });
      if (sc.chip) auto.push({ at: sc.chip.at, name: 'pop_1', gain: -11, dur: 0.4 }); });
    els.push({ id: 'stage', type: 'pstage', layer: 'screen', at: [540, 960], in: -1, z: 10, props: { P: c.P, C: c.C, scenes: c.scenes, hook: c.hook, beats: c.labels, notes: c.notes || [] } });
    els.push({ id: 'you', type: 'you', layer: 'screen', at: [150, 1213], scale: 0.82, in: -1, z: 20, props: { keys: c.you } });
    els.push({ id: 'hypo', type: 'hypo', layer: 'screen', at: [545, 1316], in: 0.2, z: 20, props: { text: 'HYPOTHETICAL · PERFECTLY STRAIGHT STACK' } });
    if (c.cta.like) els.push({ id: 'heart', type: 'heart', layer: 'screen', at: [520, 1205], in: c.cta.like, z: 30, props: { s: 1, dur: 1.0 } });
    if (c.cta.send) els.push({ id: 'plane', type: 'plane', layer: 'screen', at: [0, 0], in: c.cta.send, z: 30, props: { from: [330, 1275], to: [760, 1160], dur: 1.2, s: 0.7 }, out: c.cta.send + 1.5 });
    if (c.cta.follow) els.push({ id: 'follow', type: 'follow', layer: 'screen', at: [520, 1215], in: c.cta.follow, out: c.cta.followOut, z: 30, props: { press: 0.75 } });
    if (c.cta.bubble) els.push({ id: 'bubble', type: 'bubble', layer: 'screen', at: [520, 1205], in: c.cta.bubble.at, z: 30, props: { l1: c.cta.bubble.l1, l2: c.cta.bubble.l2, size: 40, tail: 'left' } });
    const beats = c.scenes.map((s, i) => ({ at: s.from, beat: 'wide', focus: { x: 540 + DX[i % DX.length], y: 740 + (i % 2 ? 90 : -60), w: 1080, h: 300 }, fill: 1, dur: 0.8, st: ST, pose: s.pose || 'talk' }));
    beats.unshift({ at: 0, beat: 'wide', focus: { x: 540, y: 740, w: 1080, h: 300 }, fill: 1, st: ST, pose: 'shock' });
    return {
      series: 'whatif', title: 'PENNIES TO THE MOON', duration: c.dur,
      footnote: ['ASSUMES: PENNY 1.52 mm · MOON 384,400 km (AVERAGE) · PERFECTLY STRAIGHT STACK · 8.2 B PEOPLE', 'HYPOTHETICAL · OUR MATH · JACKPOT $2.04 B ADVERTISED (2022) · BILL 0.109 mm'],
      elements: els, beats, poses: [...(c.cta.follow ? [[c.cta.follow, 'follow', { target: [520, 1215] }]] : []), ...(c.poses || [])], shakes: c.shakes, captions: c.captions, bed: c.bed || { name: 'electronic_bed_2', gain: -1 }, sfx: [...auto, ...extra],
    };
  };
})();
