const CS_CUT = { dur: 65.77, first: 'hookT', bed: 'acoustic_bed_2', bubble: { l1: 'WHAT PERCENT', l2: 'DO YOU SAVE?' },
  hook: { until: 3.6, y: 520, size: 70, lines: [[['SAVE EVERY DOLLAR', 'paper']], [['A MILLION STILL', 'gold']], [['TAKES 15+ YEARS', 'bad']]] },
  force: { 15: 'q' }, shakes: [[0.1, 8], [40, 12]], captions: { gap: 16, emph: { 'million': 'gold', 'years': 'bad' } } };
BM2.scene(CS.make(CS_TOPIC, CS_CUT));
