// ===== scene factory for penny-doubled v5: PD5.make(cfg) -> BM2.scene spec. All three cuts are data. =====
(function () {
  const ST = { x: 905, y: 1338, s: 0.8, layer: 'front', blur: 0, dim: 0 };
  const DX = [0, 420, -380, 300, -300, 380, -420, 260];
  window.PD5.make = function (c) {
    const els = [];
    els.push({ id: 'stage', type: 'pstage', layer: 'screen', at: [540, 960], in: -1, z: 10, props: { K: c.K, scenes: c.scenes, hook: c.hook, deal: c.deal, counterIn: c.counterIn, hideCounter: c.hideCounter || [], beats: c.labels, notes: c.notes || [] } });
    els.push({ id: 'art', type: 'hookart', layer: 'screen', at: [540, 745], in: -1, out: c.hook.until, z: 9, props: { variant: c.hook.variant || 'brick', drop: c.hook.drop || 90 } });
    els.push({ id: 'art2', type: 'hookart', layer: 'screen', at: [540, 872], scale: 0.5, in: c.scenes.find(s => s.type === 'ask').from, z: 9, props: { variant: 'brick', reAt: c.scenes.find(s => s.type === 'ask').from, drop: 200 } });
    els.push({ id: 'you', type: 'you', layer: 'screen', at: [150, 1213], scale: 0.82, in: -1, z: 20, props: { keys: c.you } });
    els.push({ id: 'hypo', type: 'hypo', layer: 'screen', at: [545, 1316], in: 0.2, z: 20, props: { text: 'HYPOTHETICAL · NOT FINANCIAL ADVICE' } });
    if (c.cta.like) els.push({ id: 'heart', type: 'heart', layer: 'screen', at: [520, 1205], in: c.cta.like, z: 30, props: { s: 1, dur: 1.0 } });
    if (c.cta.send) els.push({ id: 'plane', type: 'plane', layer: 'screen', at: [0, 0], in: c.cta.send, z: 30, props: { from: [330, 1275], to: [760, 1160], dur: 1.2, s: 0.7 } , out: c.cta.send + '+1.5' });
    if (c.cta.follow) els.push({ id: 'follow', type: 'follow', layer: 'screen', at: [520, 1215], in: c.cta.follow, out: c.cta.followOut, z: 30, props: { press: 0.75 } });
    if (c.cta.bubble) els.push({ id: 'bubble', type: 'bubble', layer: 'screen', at: [520, 1205], in: c.cta.bubble.at, z: 30, props: { l1: c.cta.bubble.l1, l2: c.cta.bubble.l2, size: 40, tail: 'left' } });
    const beats = c.scenes.map((s, i) => ({ at: s.from, beat: 'wide', focus: { x: 540 + DX[i % DX.length], y: 740 + (i % 2 ? 90 : -60), w: 1080, h: 300 }, fill: 1, dur: 0.8, st: ST, pose: s.pose || 'talk' }));
    beats.unshift({ at: 0, beat: 'wide', focus: { x: 540, y: 740, w: 1080, h: 300 }, fill: 1, st: ST, pose: 'shock' });
    return {
      series: 'whatif', title: 'PENNY × 30 DAYS', duration: c.dur,
      footnote: ['ASSUMES: 1¢ ON DAY 1 · WHAT YOU HOLD DOUBLES EVERY DAY · 30 DAYS', 'NO TAXES, NO INTEREST · HYPOTHETICAL · OUR MATH · NOT FINANCIAL ADVICE'],
      elements: els, beats, poses: [...(c.cta.follow ? [[c.cta.follow, 'follow', { target: [520, 1215] }]] : []), ...(c.poses || [])], shakes: c.shakes, captions: c.captions, bed: c.bed || { name: 'upbeat_bed_2', gain: -1 }, sfx: c.sfx,
    };
  };
})();
