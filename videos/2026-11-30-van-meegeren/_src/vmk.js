(function () {
  const ST = { x: 905, y: 1338, s: 0.8, layer: 'front', blur: 0, dim: 0 };
  const DX = [0, 420, -380, 300, -300, 380, -420, 260];
  window.V5.make = function (c0) {
    const B = window.BM2, T = B.makeT((window.BM2_VOICE || {}).words || []), c = B.deepT(c0, T), els = [], extra = c.sfx2 || [], auto = [];
    const A = (at, name, gain = -9, dur = 0.5) => { if (at != null && at >= 0) auto.push({ at, name, gain, dur }); };
    c.scenes.forEach((sc, i) => { if (i > 0) A(sc.from, i % 2 ? 'whoosh_1' : 'whoosh_2', -11, 0.6);
      switch (sc.type) {
        case 'frame': A(sc.at, 'pop_2'); A(sc.labelAt, 'pop_1', -10); A(sc.stampAt, 'rubber_stamp_1', -7); break;
        case 'intro': A(sc.at, 'camera_shutter_1', -8, 0.5); A(sc.nameAt, 'pop_1', -10); (sc.stamps || []).forEach(s => A(s.at, 'rubber_stamp_1', -7)); break;
        case 'defcard': A(sc.at, 'pop_2'); A(sc.defAt, 'pop_1', -10); break;
        case 'steps': sc.items.forEach((it, k) => A(it.at, k % 2 ? 'pop_1' : 'pop_2', -9)); break;
        case 'deal': A(sc.buyerAt, 'pop_2'); A(sc.frameAt ?? sc.at, 'pop_1', -10); A(sc.priceAt, 'cash_register_1', -10, 1.0); A(sc.numAt, 'money_counter_2', -12, 1.1); A(sc.soldAt, 'rubber_stamp_1', -7); A(sc.fakeAt, 'rubber_stamp_2', -7); break;
        case 'trace': A(sc.at, 'pop_2'); A(sc.foundAt, 'rubber_stamp_1', -7); A(sc.faceAt, 'camera_shutter_2', -9); A(sc.stringAt, 'swipe_1', -10, 0.4); break;
        case 'arrest': A(sc.at, 'camera_flash_1', -8, 0.6); A(sc.cuffAt, 'handcuff_click_1', -8); A(sc.stampAt, 'rubber_stamp_1', -6); A(sc.stampAt, 'cinematic_hit_1', -9, 1.0); break;
        case 'confess': A(sc.at, 'pop_2'); (sc.lines || []).forEach(l => A(l.at, 'typewriter_1', -10, 1.0)); A(sc.stampAt, 'rubber_stamp_1', -7); break;
        case 'watch': A(sc.at, 'camera_shutter_1', -8, 0.5); (sc.callouts || []).forEach(cl => A(cl.at, 'pop_1', -10)); A(sc.stampAt, 'rubber_stamp_1', -7); break;
        case 'swap': A(sc.at, 'pop_2'); A(sc.strikeAt, 'pen_scratch_1', -8, 0.5); A(sc.revealAt, 'success_chime_1', -11, 0.9); break;
        case 'charge': A(sc.at, 'pop_2'); A(sc.strikeAt, 'pen_scratch_1', -8, 0.5); A(sc.revealAt, 'typewriter_1', -8, 0.9); break;
        case 'verdict': A(sc.at, 'pop_2'); A(sc.barsAt, 'cell_door_1', -8, 1.2); A(sc.yrsAt, 'gavel_1', -6, 0.6); A(sc.yrsAt, 'deep_boom_1', -5, 1.4); break;
        case 'after': A(sc.at, 'clock_ticking_1', -14, 1.5); A(sc.stampAt, 'rubber_stamp_1', -6); break;
        case 'board': A(sc.at, 'pop_2'); for (let k = 1; k < 5; k++) A(sc.at + 0.3 + (k - 1) * 0.25, 'pop_1', -10, 0.4); A(sc.tightAt, 'riser_1', -14, 1.6); A(sc.stampAt, 'rubber_stamp_1', -7); break;
        case 'ask': A(sc.from, 'pop_1'); break;
      } (sc.chips || []).forEach(ch => A(ch.at, 'pop_1', -11, 0.4)); (sc.tags || []).forEach(tg => A(tg.at, 'pop_1', -11, 0.4)); });
    els.push({ id: 'stage', type: 'vstage', layer: 'screen', at: [540, 960], in: -1, z: 10, props: { C: c.C, scenes: c.scenes, hook: c.hook, hideCounter: c.hideCounter || [], beats: c.labels, notes: c.notes || [], photos: ['brand/photos/han-van-meegeren/4.jpg', 'brand/photos/han-van-meegeren/2.jpg'] } });
    els.push({ id: 'pip', type: 'vpip', layer: 'screen', at: [150, 1213], scale: 0.82, in: -1, z: 20, props: { keys: c.pip } });
    els.push({ id: 'hypo', type: 'hypo', layer: 'screen', at: [545, 1316], in: 0.2, z: 20, props: { text: 'TRUE STORY · CONVICTED 1947' } });
    if (c.cta.like) els.push({ id: 'heart', type: 'heart', layer: 'screen', at: [520, 1205], in: c.cta.like, z: 30, props: { s: 1, dur: 1.0 } });
    if (c.cta.send) els.push({ id: 'plane', type: 'plane', layer: 'screen', at: [0, 0], in: c.cta.send, z: 30, props: { from: [330, 1275], to: [760, 1160], dur: 1.2, s: 0.7 }, out: c.cta.send + 1.5 });
    if (c.cta.follow) els.push({ id: 'follow', type: 'follow', layer: 'screen', at: [520, 1215], in: c.cta.follow, out: c.cta.followOut, z: 30, props: { press: 0.75 } });
    if (c.cta.bubble) els.push({ id: 'bubble', type: 'bubble', layer: 'screen', at: [520, 1205], in: c.cta.bubble.at, z: 30, props: { l1: c.cta.bubble.l1, l2: c.cta.bubble.l2, size: 40, tail: 'left' } });
    const beats = c.scenes.map((s, i) => ({ at: s.from, beat: 'wide', focus: { x: 540 + DX[i % DX.length], y: 740 + (i % 2 ? 90 : -60), w: 1080, h: 300 }, fill: 1, dur: 0.8, st: ST, pose: s.pose || 'talk' }));
    beats.unshift({ at: 0, beat: 'wide', focus: { x: 540, y: 740, w: 1080, h: 300 }, fill: 1, st: ST, pose: 'shock' });
    return {
      series: 'decoded', title: 'CASE FILE · THE FORGER', duration: c.dur,
      footnote: ['PHOTOS: K. RAUCAMP/ANEFO (CC BY 4.0) · FAKE PAINTING (CC BY-SA 3.0) · WIKIMEDIA COMMONS', 'CONVICTED NOV 1947 (FORGERY) · SENTENCED TO 1 YEAR · SOURCES: BRITANNICA, COLBY COLLEGE', 'ILLUSTRATIONS / PROPS ARE GENERIC · THE BUYER IS SHOWN AS TEXT ONLY'],
      elements: els, beats, poses: [...(c.cta.follow ? [[c.cta.follow, 'follow', { target: [520, 1215] }]] : []), ...(c.poses || [])], shakes: c.shakes, captions: c.captions, bed: c.bed || { name: 'heist_bed_1', gain: -1 }, sfx: [...auto, ...extra],
    };
  };
})();
