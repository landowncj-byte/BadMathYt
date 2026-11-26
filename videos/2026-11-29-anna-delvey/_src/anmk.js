(function () {
  const ST = { x: 905, y: 1338, s: 0.8, layer: 'front', blur: 0, dim: 0 };
  const DX = [0, 420, -380, 300, -300, 380, -420, 260];
  window.AN5.make = function (c0) {
    const B = window.BM2, T = B.makeT((window.BM2_VOICE || {}).words || []), c = B.deepT(c0, T), els = [], extra = c.sfx2 || [], auto = [];
    const A = (at, name, gain = -9, dur = 0.5) => { if (at != null) auto.push({ at, name, gain, dur }); };
    c.scenes.forEach((sc, i) => { if (i > 0) A(sc.from, i % 2 ? 'whoosh_1' : 'whoosh_2', -11, 0.6);
      switch (sc.type) {
        case 'society': A(sc.at, 'camera_shutter_1', -8, 0.5); A(sc.stampAt, 'rubber_stamp_1', -7); A(sc.nameAt, 'pop_1', -10); break;
        case 'defcard': A(sc.at, 'pop_2'); A(sc.defAt, 'pop_1', -10); break;
        case 'claim': A(sc.at, 'cash_count_1', -11, 1.4); A(sc.stampAt, 'rubber_stamp_1', -6); break;
        case 'nameswap': A(sc.at, 'camera_shutter_2', -9); A(sc.strikeAt, 'pen_scratch_1', -8, 0.5); A(sc.revealAt, 'typewriter_1', -8, 0.9); A(sc.stampAt, 'rubber_stamp_2', -7); break;
        case 'luxe': A(sc.keysAt, 'pop_2'); A(sc.keysAt + 0.4, 'pop_1'); A(sc.rcptAt, 'paper_slam_1', -9); A(sc.stampAt, 'rubber_stamp_1', -8); break;
        case 'terminal': sc.cycles.forEach(cy => { A(cy, 'click_1', -9, 0.2); A(cy + 0.32, 'wrong_buzzer_1', -11, 0.7); }); break;
        case 'cover': A(sc.at, 'pop_2'); A(sc.blameAt, 'swipe_1', -10, 0.4); A(sc.billAt, 'paper_slam_1', -10); A(sc.paidAt, 'success_chime_1', -12, 0.9); break;
        case 'phone': A(sc.msgAt, 'notification_chime_1', -9, 1.0); A(sc.neverAt, 'rubber_stamp_1', -7); break;
        case 'wiredef': A(sc.coinAt, 'coin_single_1', -10); A(sc.xAt, 'wrong_buzzer_1', -11, 0.7); break;
        case 'hotels': A(sc.at, 'pop_2'); A(sc.s1, 'rubber_stamp_1', -8); A(sc.s2, 'rubber_stamp_2', -8); break;
        case 'friend': A(sc.at, 'camera_shutter_1', -10); A(sc.rAt, 'pop_1', -9); A(sc.strAt, 'swipe_1', -10, 0.4); break;
        case 'morocco': A(sc.at, 'pop_2'); A(sc.billAt, 'paper_slam_1', -9); A(sc.numAt, 'money_counter_2', -12, 1.1); A(sc.cardAt, 'pop_1', -9); A(sc.chargedAt, 'rubber_stamp_1', -7); break;
        case 'pay': A(sc.at, 'pop_2'); A(sc.at + 0.25, 'pop_1'); break;
        case 'arrest': A(sc.at, 'camera_flash_1', -8, 0.6); A(sc.cuffAt, 'handcuff_click_1', -8); A(sc.stampAt, 'rubber_stamp_1', -6); A(sc.stampAt, 'cinematic_hit_1', -9, 1.0); break;
        case 'verdict': A(sc.at, 'pop_2'); for (let k = 0; k < 8; k++) A(sc.countAt + k * (sc.countStep || 0.22), 'rubber_stamp_2', -13, 0.4); A(sc.countAt, 'gavel_1', -7, 0.6); break;
        case 'sentence': A(sc.barsAt, 'cell_door_1', -8, 1.2); A(sc.yrsAt, 'deep_boom_1', -5, 1.4); break;
        case 'repay': A(sc.at, 'cash_count_1', -11, 1.2); break;
        case 'board': A(sc.at, 'pop_2'); for (let k = 1; k < 5; k++) A(sc.at + 0.3 + (k - 1) * 0.25, 'pop_1', -10, 0.4); A(sc.tightAt, 'riser_1', -14, 1.6); A(sc.stampAt, 'rubber_stamp_1', -7); break;
        case 'ask': A(sc.from, 'pop_1'); break;
      } });
    els.push({ id: 'stage', type: 'astage', layer: 'screen', at: [540, 960], in: -1, z: 10, props: { C: c.C, scenes: c.scenes, hook: c.hook, hideCounter: c.hideCounter || [], beats: c.labels, notes: c.notes || [], photos: ['brand/photos/anna-sorokin/2.jpg', 'brand/photos/anna-sorokin/4.jpg'] } });
    els.push({ id: 'pip', type: 'apip', layer: 'screen', at: [150, 1213], scale: 0.82, in: -1, z: 20, props: { keys: c.pip } });
    els.push({ id: 'hypo', type: 'hypo', layer: 'screen', at: [545, 1316], in: 0.2, z: 20, props: { text: 'TRUE STORY · JURY VERDICT 2019' } });
    if (c.cta.like) els.push({ id: 'heart', type: 'heart', layer: 'screen', at: [520, 1205], in: c.cta.like, z: 30, props: { s: 1, dur: 1.0 } });
    if (c.cta.send) els.push({ id: 'plane', type: 'plane', layer: 'screen', at: [0, 0], in: c.cta.send, z: 30, props: { from: [330, 1275], to: [760, 1160], dur: 1.2, s: 0.7 }, out: c.cta.send + 1.5 });
    if (c.cta.follow) els.push({ id: 'follow', type: 'follow', layer: 'screen', at: [520, 1215], in: c.cta.follow, out: c.cta.followOut, z: 30, props: { press: 0.75 } });
    if (c.cta.bubble) els.push({ id: 'bubble', type: 'bubble', layer: 'screen', at: [520, 1205], in: c.cta.bubble.at, z: 30, props: { l1: c.cta.bubble.l1, l2: c.cta.bubble.l2, size: 40, tail: 'left' } });
    const beats = c.scenes.map((s, i) => ({ at: s.from, beat: 'wide', focus: { x: 540 + DX[i % DX.length], y: 740 + (i % 2 ? 90 : -60), w: 1080, h: 300 }, fill: 1, dur: 0.8, st: ST, pose: s.pose || 'talk' }));
    beats.unshift({ at: 0, beat: 'wide', focus: { x: 540, y: 740, w: 1080, h: 300 }, fill: 1, st: ST, pose: 'shock' });
    return {
      series: 'decoded', title: 'CASE FILE · FAKE HEIRESS', duration: c.dur,
      footnote: ['PHOTOS: PHILIP ROMANO (CC BY 4.0) · MARK MINTON (CC BY-SA 4.0), VIA WIKIMEDIA COMMONS', 'CONVICTED APR 2019 (8 COUNTS) · SENTENCED MAY 2019 · SOURCES: AP, UPI, NBC NEWS, ROLLING STONE', 'ILLUSTRATIONS / PROPS ARE GENERIC · “ANNA DELVEY” WAS HER FALSE NAME'],
      elements: els, beats, poses: [...(c.cta.follow ? [[c.cta.follow, 'follow', { target: [520, 1215] }]] : []), ...(c.poses || [])], shakes: c.shakes, captions: c.captions, bed: c.bed || { name: 'mystery_bed_1', gain: -1 }, sfx: [...auto, ...extra],
    };
  };
})();
