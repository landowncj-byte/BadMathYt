(function () {
  const ST = { x: 905, y: 1338, s: 0.8, layer: 'front', blur: 0, dim: 0 };
  const DX = [0, 420, -380, 300, -300, 380, -420, 260];
  window.DD.make = function (c0) {
    const B = window.BM2, T = B.makeT((window.BM2_VOICE || {}).words || []), c = B.deepT(c0, T), els = [], extra = c.sfx2 || [], auto = [];
    const A = (at, name, gain = -9, dur = 0.5) => { if (at != null) auto.push({ at, name, gain, dur }); };
    c.scenes.forEach((sc, i) => { if (i > 0) A(sc.from, i % 2 ? 'whoosh_1' : 'whoosh_2', -12, 0.6);
      switch (sc.type) {
        case 'nb': A(sc.at, 'pop_2'); A(sc.lAt ?? sc.at + 0.4, 'click_1', -9, 0.3); A((sc.lAt ?? sc.at + 0.4) + 0.25, 'click_1', -9, 0.3); A(sc.circleAt, 'pen_scratch_1', -8, 0.6); A(sc.stampAt, 'rubber_stamp_1', -7); break;
        case 'stack': A(sc.at, 'paper_rustle_1', -11, 1.2); for (let k = 0; k < (sc.n || 12); k += 3) A(sc.at + k * (sc.per || 0.12), 'pop_1', -12, 0.3); break;
        case 'casefile': A(sc.at, 'camera_shutter_1', -8, 0.5); A(sc.nameAt, 'pop_1', -10); break;
        case 'souvenirs': A(sc.at, 'pop_2'); A(sc.at + 0.25, 'pop_1', -10); A(sc.at + 0.5, 'pop_1', -10); break;
        case 'forging': A(sc.at + 0.2, 'pen_scratch_1', -8, 2.0); A(sc.at + 1.3, 'pen_scratch_2', -9, 1.2); A(sc.stampAt, 'rubber_stamp_1', -7); break;
        case 'alias': A(sc.at, 'pop_2'); A(sc.strikeAt, 'pen_scratch_1', -8, 0.5); A(sc.revealAt, 'typewriter_1', -9, 0.8); A(sc.chainAt, 'pop_1', -10); A(sc.chainAt + 0.35, 'pop_1', -10); A(sc.chainAt + 0.7, 'pop_1', -10); break;
        case 'reportercard': A(sc.at, 'pop_2'); A(sc.rAt ?? sc.at + 0.4, 'camera_shutter_2', -9); A(sc.believeAt, 'success_chime_1', -11, 0.9); break;
        case 'pay': A(sc.at, 'cash_count_1', -11, 1.5); A(sc.at + 1.1, 'deep_boom_1', -7, 1.2); A(sc.stampAt, 'rubber_stamp_1', -7); break;
        case 'skim': A(sc.at, 'pop_2'); A(sc.moveAt, 'swipe_1', -9, 0.5); A(sc.stampAt, 'rubber_stamp_1', -7); break;
        case 'defcard': A(sc.at, 'pop_2'); A(sc.defAt ?? sc.at + 0.4, 'pop_1', -10); break;
        case 'press': A(sc.at, 'pop_2'); for (let k = 0; k < 7; k++) A(sc.flashAt + k * 0.28, 'camera_flash_1', -10, 0.4); break;
        case 'cover': A(sc.at, 'pop_2'); [0, 1, 2].forEach(k => A(sc.listAt + k * 0.4, 'wrong_buzzer_1', -13, 0.5)); break;
        case 'compare': A(sc.at, 'pop_2'); A(sc.at + 0.5, 'pen_scratch_1', -9, 0.5); A(sc.at + (sc.gap ?? 0.8), 'pop_1', -10); A(sc.at + (sc.gap ?? 0.8) + 0.5, 'success_chime_1', -11, 0.9); break;
        case 'lab': A(sc.at, 'pop_2'); A(sc.lampAt, 'riser_1', -14, 1.2); A(sc.paperAt, 'rubber_stamp_1', -7); A(sc.inkAt, 'rubber_stamp_2', -7); break;
        case 'days': A(sc.at, 'pop_2'); for (let k = 0; k < 14; k++) A(sc.tickAt + k * (sc.step ?? 0.12), 'click_1', -13, 0.2); A(sc.stampAt, 'rubber_stamp_1', -6); A(sc.stampAt, 'cinematic_hit_1', -9, 1.0); break;
        case 'crude': A(sc.at, 'pop_2'); A(sc.stampAt, 'rubber_stamp_1', -6); A(sc.stampAt, 'cinematic_hit_1', -9, 1.0); break;
        case 'court': A(sc.at, 'pop_2'); A(sc.gavelAt, 'gavel_1', -6, 0.6); break;
        case 'sentence': A(sc.at, 'pop_2'); A(sc.barsAt, 'cell_door_1', -8, 1.2); A(sc.yrsAt, 'deep_boom_1', -5, 1.4); break;
        case 'board': A(sc.at, 'pop_2'); for (let k = 1; k < 5; k++) A(sc.at + 0.3 + (k - 1) * 0.25, 'pop_1', -10, 0.4); A(sc.tightAt, 'riser_1', -14, 1.6); A(sc.stampAt, 'rubber_stamp_1', -7); break;
        case 'ask': A(sc.from, 'pop_1'); break;
      }
      if (sc.chip) A(sc.chip.at, 'pop_1', -11, 0.4); (sc.chips || []).forEach(ch => A(ch.at, 'pop_1', -11, 0.4)); });
    els.push({ id: 'stage', type: 'astage', layer: 'screen', at: [540, 960], in: -1, z: 10, props: { C: c.C, scenes: c.scenes, hook: c.hook, hideCounter: c.hideCounter || [], beats: c.labels, notes: c.notes || [], photos: ['brand/photos/konrad-kujau/3.jpg'] } });
    els.push({ id: 'pip', type: 'apip', layer: 'screen', at: [150, 1213], scale: 0.82, in: -1, z: 20, props: { keys: c.pip } });
    els.push({ id: 'hypo', type: 'hypo', layer: 'screen', at: [545, 1316], in: 0.2, z: 20, props: { text: 'TRUE STORY · HAMBURG COURT 1985' } });
    if (c.cta.like) els.push({ id: 'heart', type: 'heart', layer: 'screen', at: [520, 1205], in: c.cta.like, z: 30, props: { s: 1, dur: 1.0 } });
    if (c.cta.send) els.push({ id: 'plane', type: 'plane', layer: 'screen', at: [0, 0], in: c.cta.send, z: 30, props: { from: [330, 1275], to: [760, 1160], dur: 1.2, s: 0.7 }, out: c.cta.send + 1.5 });
    if (c.cta.follow) els.push({ id: 'follow', type: 'follow', layer: 'screen', at: [520, 1215], in: c.cta.follow, out: c.cta.followOut, z: 30, props: { press: 0.75 } });
    const beats = c.scenes.map((s, i) => ({ at: s.from, beat: 'wide', focus: { x: 540 + DX[i % DX.length], y: 740 + (i % 2 ? 90 : -60), w: 1080, h: 300 }, fill: 1, dur: 0.8, st: ST, pose: s.pose || 'talk' }));
    beats.unshift({ at: 0, beat: 'wide', focus: { x: 540, y: 740, w: 1080, h: 300 }, fill: 1, st: ST, pose: 'shock' });
    return {
      series: 'decoded', title: 'CASE FILE · FAKE DIARIES', duration: c.dur,
      footnote: ['PHOTO: TELEPHIL (CC BY-SA 3.0), VIA WIKIMEDIA COMMONS · REPORTER & MIDDLEMAN = ILLUSTRATIONS', 'PRICE ~9 MILLION DEUTSCHE MARKS · SENTENCES (HAMBURG, JULY 1985) ~4½ YEARS EACH', 'SOURCES: BRITANNICA · CHRISTIAN SCIENCE MONITOR 1985 · ENCYCLOPEDIA.COM · TIME'],
      elements: els, beats, poses: [...(c.cta.follow ? [[c.cta.follow, 'follow', { target: [520, 1215] }]] : []), ...(c.poses || [])], shakes: c.shakes, captions: c.captions, bed: c.bed || { name: 'orchestral_bed_1', gain: -1 }, sfx: [...auto, ...extra],
    };
  };
})();
