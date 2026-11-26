// beat labels (top-right pill): the show's recurring beats; THE MISTAKE spans the "The mistake?" paragraph and the one after it
const BEATLABELS = [
  ['@P009', '@P013', 'THE CASE'], ['@P013', '@P015', 'THE PLAN'], ['@P015', '@P018', 'THE HAUL'], ['@P018', '@P022', 'THE PLAN'], ['@P022', '@P024', 'THE CATCH'], ['@P024', '@P026', 'THE MISTAKE'], ['@P026', '@P029', 'THE SENTENCE'],
  ['@P029', '@P033', 'THE CASE'], ['@P033', '@P035', 'THE PLAN'], ['@P035', '@P040', 'THE HAUL'], ['@P040', '@P042', 'THE PLAN'], ['@P042', '@P044', 'THE MISTAKE'], ['@P044', '@P046', 'THE CATCH'], ['@P046', '@P051', 'THE SENTENCE'],
  ['@P051', '@P055', 'THE CASE'], ['@P055', '@P057', 'THE PLAN'], ['@P057', '@P061', 'THE HAUL'], ['@P061', '@P064', 'THE CATCH'], ['@P064', '@P066', 'THE MISTAKE'], ['@P066', '@P068', 'THE CATCH'], ['@P068', '@P072', 'THE SENTENCE'],
  ['@P072', '@P074', 'THE CASE'], ['@P074', '@P077', 'THE HEIST'], ['@P077', '@P079', 'THE HAUL'], ['@P079', '@P083', 'THE PLAN'], ['@P083', '@P085', 'THE CATCH'], ['@P085', '@P087', 'THE MISTAKE'], ['@P087', '@P089', 'THE CATCH'], ['@P089', '@P093', 'THE SENTENCE'],
  ['@P093', '@P096', 'THE CASE'], ['@P096', '@P098', 'THE HAUL'], ['@P098', '@P100', 'THE PLAN'], ['@P100', '@P107', 'THE CATCH'], ['@P107', '@P108', 'THE MISTAKE'], ['@P108', '@P109', 'THE TWIST'], ['@P109', '@P112', 'THE SENTENCE'],
  ['@P112', '@P117', 'THE EVIDENCE'], ['@P117', '@P120>', 'THE CASE']];
BEATLABELS.forEach(([a, b, t], i) => el('bl' + i, 'beatlabel', 1856, 140, a + '+0.12', { text: t }, { layer: 'screen', out: b }));
// the running MISTAKE TRAY (bottom-left, five slots, one fills per chapter)
el('mtray', 'mtray', 64, 150, '@P009', { fills: MIST.map(m => m[0] + '+0.5') }, { layer: 'screen', out: '@P112' });
// extra push-ins so no picture holds longer than ~3.4 s (found by the beat-gap check)
bt('@P010:1963', 'graphic-hero', ['dc10', 't10'], { fill: 0.8, sy: 480, pose: 'chin' });
bt('@P033:said', 'graphic-hero', 'd33', { fill: 0.64, maxH: 800, sy: 490, pose: 'point' });
bt('@P040:get', 'graphic-hero', 'cl40', { fill: 0.64, maxH: 720, sy: 500, pose: 'chin' });
bt('@P052:hatton', 'graphic-hero', ['ph52', 'jd52'], { fill: 0.8, sy: 480, pose: 'point' });
bt('@P070:electronics', 'graphic-hero', 'j68', { fill: 0.66, maxH: 860, sy: 500, pose: 'point' });
bt('@P073:1950', 'graphic-hero', ['dc73', 'tr73'], { fill: 0.8, sy: 480, pose: 'chin' });
bt('@P077:cash', 'graphic-hero', 'c77', { fill: 0.82, sy: 480, pose: 'point' });
bt('@P087:week', 'graphic-hero', ['dc87', 't87'], { fill: 0.84, sy: 470, pose: 'chin' });
bt('@P094:england', 'graphic-hero', ['dc94', 'c94'], { fill: 0.92, sy: 480, pose: 'point' });
bt('@P095:sitting', 'graphic-hero', ['tr95', 'gd95', 'ss95'], { fill: 0.86, sy: 500, pose: 'point' });
bt('@P099:comes', 'graphic-hero', 'rn98', { fill: 0.46, maxH: 720, sy: 500, pose: 'point' });
