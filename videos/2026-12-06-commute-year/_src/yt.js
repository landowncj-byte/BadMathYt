const CS_CUT = { dur: 67.89, first: 'hookC', bed: 'ambient_bed_3', bubble: { l1: 'HOW LONG IS YOUR', l2: 'COMMUTE? (MIN)' },
  hook: { until: 3.6, y: 520, size: 68, lines: [[['YOUR COMMUTE EATS', 'paper']], [['1 FULL YEAR', 'bad']], [['NONSTOP', 'gold']]] },
  force: { 16: 'q' }, shakes: [[0.1, 8], [46, 12]], captions: { gap: 16, emph: { 'year': 'bad', 'year.': 'bad', 'nonstop': 'bad' } } };
BM2.scene(CS.make(CS_TOPIC, CS_CUT));
