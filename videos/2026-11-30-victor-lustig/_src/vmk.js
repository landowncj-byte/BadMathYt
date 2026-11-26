(function () {
  const ST = { x: 905, y: 1338, s: 0.8, layer: 'front', blur: 0, dim: 0 };
  const DX = [0, 420, -380, 300, -300, 380, -420, 260];
  window.V5.make = function (c0) {
    const B = window.BM2, T = B.makeT((window.BM2_VOICE || {}).words || []), c = B.deepT(c0, T), els = [], extra = c.sfx2 || [], auto = [];
    const A = (at, name, gain = -9, dur = 0.5) => { if (at != null && at >= 0) auto.push({ at, name, gain, dur }); };
    c.scenes.forEach((sc, i) => { if (i > 0) A(sc.from, i % 2 ? 'whoosh_1' : 'whoosh_2', -11, 0.6);
      switch (sc.type) {
        case 'tower': A(sc.at, 'pop_2'); A(sc.tagAt, 'pop_1', -10); A(sc.stampAt, 'rubber_stamp_1', -7); A(sc.xAt, 'pen_scratch_1', -8, 0.5); break;
        case 'split': A(sc.at, 'pop_2'); A(sc.at2 ?? sc.at + 0.25, 'pop_1', -10); A(sc.L.stampAt, 'rubber_stamp_1', -7); A(sc.R.stampAt, 'rubber_stamp_2', -7); A(sc.R.bars, 'cell_door_1', -9, 1.0); break;
        case 'intro': A(sc.at, 'camera_shutter_1', -8, 0.5); A(sc.nameAt, 'pop_1', -10); (sc.stamps || []).forEach(s => A(s.at, 'rubber_stamp_1', -7)); break;
        case 'titleStrike': A(sc.at, 'pop_2'); A(sc.strikeAt, 'pen_scratch_1', -8, 0.5); A(sc.revealAt, 'typewriter_1', -8, 0.9); break;
        case 'date': A(sc.at, 'pop_2'); A(sc.l1At, 'pop_1', -10); A(sc.stampAt, 'rubber_stamp_1', -7); break;
        case 'official': A(sc.at, 'camera_shutter_1', -9, 0.5); A(sc.badgeAt, 'pop_1', -10); A(sc.stampAt, 'rubber_stamp_1', -7); break;
        case 'dealers': A(sc.at, 'pop_2'); (sc.times || []).forEach(x => A(x, 'pop_1', -11, 0.4)); A(sc.poissonAt, 'pop_2', -8); A(sc.stampAt, 'rubber_stamp_1', -7); break;
        case 'defcard': A(sc.at, 'pop_2'); A(sc.defAt, 'pop_1', -10); A(sc.factAt, 'rubber_stamp_1', -7); break;
        case 'whisper': A(sc.at, 'pop_2'); (sc.lines || []).forEach(l => A(l.at, 'typewriter_1', -10, 1.0)); A(sc.stampAt, 'rubber_stamp_1', -7); break;
        case 'paid': A(sc.at, 'pop_2'); A(sc.cashAt, 'cash_register_1', -10, 1.0); A(sc.stampAt, 'rubber_stamp_1', -7); break;
        case 'noreport': A(sc.at, 'pop_2'); A(sc.docAt, 'pop_1', -10); A(sc.noneAt, 'rubber_stamp_1', -7); A(sc.stampAt, 'rubber_stamp_2', -8); break;
        case 'again': A(sc.at, 'pop_2'); A(sc.backAt, 'pop_1', -10); break;
        case 'unproven': A(sc.at, 'pop_2'); A(sc.xAt, 'pen_scratch_1', -8, 0.5); A(sc.noAt, 'pop_1', -9); A(sc.stampAt, 'rubber_stamp_1', -7); break;
        case 'record': A(sc.at, 'pop_2'); A(sc.l2At, 'typewriter_1', -10, 0.9); A(sc.factAt, 'rubber_stamp_1', -7); break;
        case 'fakecash': A(sc.at, 'pop_2'); A(sc.fakeAt, 'pen_scratch_1', -8, 0.5); A(sc.factAt, 'rubber_stamp_1', -7); break;
        case 'moneybox': A(sc.at, 'pop_2'); A(sc.billAt, 'swoosh_1', -10, 0.6); A(sc.stampAt, 'rubber_stamp_1', -7); break;
        case 'arrest': A(sc.at, 'camera_flash_1', -8, 0.6); A(sc.stampAt, 'rubber_stamp_1', -6); A(sc.stampAt, 'cinematic_hit_1', -9, 1.0); A(sc.factAt, 'rubber_stamp_2', -8); break;
        case 'escape': A(sc.at, 'pop_2'); A(sc.escAt, 'swoosh_1', -9, 0.8); A(sc.escAt + 0.1, 'rubber_stamp_1', -8); A(sc.caughtAt, 'handcuff_click_1', -8); break;
        case 'sentence': A(sc.at, 'pop_2'); A(sc.guiltyAt ?? sc.at + 0.3, 'rubber_stamp_1', -7); A(sc.fifteenAt, 'pop_1', -9); A(sc.fiveAt, 'pop_1', -9); break;
        case 'verdict': A(sc.at, 'pop_2'); A(sc.barsAt, 'cell_door_1', -8, 1.2); A(sc.yrsAt, 'gavel_1', -6, 0.6); A(sc.yrsAt, 'deep_boom_1', -5, 1.4); A(sc.alcAt, 'pop_1', -9); break;
        case 'island': A(sc.at, 'pop_2'); A(sc.l1At ?? sc.at + 0.3, 'pop_1', -10); A(sc.factAt, 'rubber_stamp_1', -7); break;
        case 'child': A(sc.at, 'pop_2'); A(sc.kidAt, 'pop_1', -10); A(sc.longAt, 'pop_2', -9); break;
        case 'board': A(sc.at, 'pop_2'); for (let k = 1; k < 5; k++) A(sc.at + 0.3 + (k - 1) * (sc.step || 0.25), 'pop_1', -10, 0.4); A(sc.tightAt, 'riser_1', -14, 1.6); A(sc.stampAt, 'rubber_stamp_1', -7); break;
        case 'ask': A(sc.from, 'pop_1'); A(sc.stampAt, 'rubber_stamp_1', -8); break;
      } (sc.chips || []).forEach(ch => A(ch.at, 'pop_1', -11, 0.4)); (sc.tags || []).forEach(tg => A(tg.at, 'pop_1', -11, 0.4)); });
    els.push({ id: 'stage', type: 'vstage', layer: 'screen', at: [540, 960], in: -1, z: 10, props: { C: c.C, scenes: c.scenes, hook: c.hook, hideCounter: c.hideCounter || [], beats: c.labels, notes: c.notes || [], photos: ['brand/photos/victor-lustig/2.jpg', 'brand/photos/victor-lustig/1.jpg'] } });
    els.push({ id: 'pip', type: 'vpip', layer: 'screen', at: [150, 1213], scale: 0.82, in: -1, z: 20, props: { keys: c.pip } });
    els.push({ id: 'hypo', type: 'hypo', layer: 'screen', at: [545, 1316], in: 0.2, z: 20, props: { text: 'TOWER SALE = LEGEND · 20 YEARS = COURT RECORD' } });
    if (c.cta.like) els.push({ id: 'heart', type: 'heart', layer: 'screen', at: [520, 1205], in: c.cta.like, z: 30, props: { s: 1, dur: 1.0 } });
    if (c.cta.send) els.push({ id: 'plane', type: 'plane', layer: 'screen', at: [0, 0], in: c.cta.send, z: 30, props: { from: [330, 1275], to: [760, 1160], dur: 1.2, s: 0.7 }, out: c.cta.send + 1.5 });
    if (c.cta.follow) els.push({ id: 'follow', type: 'follow', layer: 'screen', at: [520, 1215], in: c.cta.follow, out: c.cta.followOut, z: 30, props: { press: 0.75 } });
    if (c.cta.bubble) els.push({ id: 'bubble', type: 'bubble', layer: 'screen', at: [520, 1205], in: c.cta.bubble.at, z: 30, props: { l1: c.cta.bubble.l1, l2: c.cta.bubble.l2, size: 40, tail: 'left' } });
    const beats = c.scenes.map((s, i) => ({ at: s.from, beat: 'wide', focus: { x: 540 + DX[i % DX.length], y: 740 + (i % 2 ? 90 : -60), w: 1080, h: 300 }, fill: 1, dur: 0.8, st: ST, pose: s.pose || 'talk' }));
    beats.unshift({ at: 0, beat: 'wide', focus: { x: 540, y: 740, w: 1080, h: 300 }, fill: 1, st: ST, pose: 'shock' });
    return {
      series: 'decoded', title: 'CASE FILE · THE COUNT', duration: c.dur,
      footnote: ['PHOTOS: U.S. DEPT. OF JUSTICE ID RECORD 1931 · 1935 NEWSPAPER · PUBLIC DOMAIN · WIKIMEDIA COMMONS', 'EIFFEL TOWER SALE = LEGEND, NEVER PROVEN IN COURT · ARREST, ESCAPE, PLEA, 20 YEARS = RECORD', 'ILLUSTRATIONS / PROPS ARE GENERIC · THE DEALERS ARE DRAWN, NOT REAL FACES'],
      elements: els, beats, poses: [...(c.cta.follow ? [[c.cta.follow, 'follow', { target: [520, 1215] }]] : []), ...(c.poses || [])], shakes: c.shakes, captions: c.captions, bed: c.bed || { name: 'noir_bed_2', gain: -1 }, sfx: [...auto, ...extra],
    };
  };
})();
