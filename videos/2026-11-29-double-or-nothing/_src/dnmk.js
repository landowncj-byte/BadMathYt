(function () {
  const ST = { x: 905, y: 1338, s: 0.8, layer: 'front', blur: 0, dim: 0 };
  const DX = [0, 420, -380, 300, -300, 380, -420, 260];
  window.DN5.make = function (c) {
    const els = [], extra = c.sfx2 || [], auto = [];
    c.scenes.forEach((sc, i) => { if (i > 0) auto.push({ at: sc.from, name: i % 2 ? 'whoosh_1' : 'whoosh_2', gain: -11, dur: 0.6 });
      const fl = (sc.flips || (sc.coin && sc.coin.flips) || []); fl.forEach((f, j) => { auto.push({ at: f.at, name: 'swipe_1', gain: -14, dur: 0.3 }); auto.push({ at: f.at + (f.dur || 0.7), name: 'coin_single_1', gain: -9, dur: 0.5 }); });
      if (sc.type === 'demo') sc.flips.forEach(f => auto.push({ at: f.at + (f.dur || 0.7) + 0.05, name: f.res === 'H' ? 'success_chime_1' : 'wrong_buzzer_1', gain: f.res === 'H' ? -11 : -12, dur: 0.9 }));
      if (sc.type === 'choice') { [sc.cash, sc.coin].forEach((cd, j) => auto.push({ at: cd.at, name: j ? 'pop_1' : 'pop_2', gain: -9, dur: 0.4 })); }
      if (sc.type === 'cash') { auto.push({ at: sc.at, name: 'cash_count_1', gain: -12, dur: 1.2 }); }
      if (sc.type === 'tenrow') for (let k = 0; k < 10; k += 2) auto.push({ at: sc.at + k * 0.11, name: 'pop_2', gain: -12, dur: 0.25 });
      if (sc.type === 'bignum') { auto.push({ at: sc.at, name: 'money_counter_2', gain: -12, dur: 1.4 }); auto.push({ at: sc.at + sc.dur * 0.8, name: 'deep_boom_1', gain: -5, dur: 1.4 }); auto.push({ at: sc.at + sc.dur * 0.8, name: 'cinematic_hit_1', gain: -8, dur: 1.2 }); if (sc.chip) auto.push({ at: sc.chip.at, name: 'rubber_stamp_1', gain: -8, dur: 0.5 }); }
      if (sc.type === 'big') { auto.push({ at: sc.at, name: 'success_chime_1', gain: -9, dur: 1.2 }); }
      if (sc.type === 'ladder') (sc.chips || []).forEach(ch => auto.push({ at: ch.at, name: 'pop_1', gain: -10, dur: 0.4 })), sc.car && auto.push({ at: sc.car.at, name: 'pop_2', gain: -9, dur: 0.4 });
      if (sc.type === 'crowd') { if (!sc.noSfx) c.flips10.forEach((f, j) => { if (f >= sc.from && f <= sc.to) auto.push({ at: f, name: 'click_1', gain: -10, dur: 0.2 }); }); if (sc.spotAt != null) { auto.push({ at: sc.spotAt, name: 'success_chime_1', gain: -9, dur: 1.2 }); auto.push({ at: sc.spotAt, name: 'sub_drop_1', gain: -9, dur: 0.8 }); } (sc.tags || []).forEach(tg => auto.push({ at: tg.at, name: 'pop_1', gain: -10, dur: 0.4 })); }
      if (sc.type === 'days') auto.push({ at: sc.pickAt, name: 'ding_2', gain: -9, dur: 0.6 });
      if (sc.type === 'odds') auto.push({ at: sc.at, name: 'thud_1', gain: -9, dur: 0.4 });
      if (sc.type === 'duo') [sc.a, sc.b].forEach((cd, j) => auto.push({ at: cd.at, name: j ? 'pop_1' : 'pop_2', gain: -9, dur: 0.4 }));
      if (sc.type === 'eq') { [sc.a, sc.b].forEach((cd, j) => auto.push({ at: cd.at, name: j ? 'pop_1' : 'pop_2', gain: -9, dur: 0.4 })); if (sc.mid) auto.push({ at: sc.mid, name: 'success_chime_1', gain: -10, dur: 1.0 }); }
      if (sc.type === 'ask') auto.push({ at: sc.from, name: 'pop_1', gain: -9, dur: 0.4 }); });
    els.push({ id: 'stage', type: 'dstage', layer: 'screen', at: [540, 960], in: -1, z: 10, props: { K: c.K, C: c.C, scenes: c.scenes, hook: c.hook, hideCounter: c.hideCounter || [], beats: c.labels, notes: c.notes || [], crowdFlips: c.flips10 } });
    els.push({ id: 'you', type: 'you', layer: 'screen', at: [150, 1213], scale: 0.82, in: -1, z: 20, props: { keys: c.you } });
    els.push({ id: 'hypo', type: 'hypo', layer: 'screen', at: [545, 1316], in: 0.2, z: 20, props: { text: 'HYPOTHETICAL · FAIR COIN · NO TAX' } });
    if (c.cta.like) els.push({ id: 'heart', type: 'heart', layer: 'screen', at: [520, 1205], in: c.cta.like, z: 30, props: { s: 1, dur: 1.0 } });
    if (c.cta.send) els.push({ id: 'plane', type: 'plane', layer: 'screen', at: [0, 0], in: c.cta.send, z: 30, props: { from: [330, 1275], to: [760, 1160], dur: 1.2, s: 0.7 }, out: c.cta.send + '+1.5' });
    if (c.cta.follow) els.push({ id: 'follow', type: 'follow', layer: 'screen', at: [520, 1215], in: c.cta.follow, out: c.cta.followOut, z: 30, props: { press: 0.75 } });
    if (c.cta.bubble) els.push({ id: 'bubble', type: 'bubble', layer: 'screen', at: [520, 1205], in: c.cta.bubble.at, z: 30, props: { l1: c.cta.bubble.l1, l2: c.cta.bubble.l2, size: 40, tail: 'left' } });
    const beats = c.scenes.map((s, i) => ({ at: s.from, beat: 'wide', focus: { x: 540 + DX[i % DX.length], y: 740 + (i % 2 ? 90 : -60), w: 1080, h: 300 }, fill: 1, dur: 0.8, st: ST, pose: s.pose || 'talk' }));
    beats.unshift({ at: 0, beat: 'wide', focus: { x: 540, y: 740, w: 1080, h: 300 }, fill: 1, st: ST, pose: 'shock' });
    return {
      series: 'whatif', title: 'DOUBLE OR NOTHING', duration: c.dur,
      footnote: ['ASSUMES: FAIR COIN · WIN 10 FLIPS IN A ROW · NO TAX · $1,000 × 2^10 = $1,024,000', 'HYPOTHETICAL · OUR MATH · NOT FINANCIAL ADVICE'],
      elements: els, beats, poses: [...(c.cta.follow ? [[c.cta.follow, 'follow', { target: [520, 1215] }]] : []), ...(c.poses || [])], shakes: c.shakes, captions: c.captions, bed: c.bed || { name: 'synth_bed_1', gain: -1 }, sfx: [...auto, ...extra],
    };
  };
})();
