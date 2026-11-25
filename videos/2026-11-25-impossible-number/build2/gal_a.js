BM2.scene({ series: 'decoded', title: 'GALLERY', duration: 20, float: 0, captions: false, storyteller: false,
 elements: [
  { id: 'h', type: 'headline', at: [0, -520], in: -1, props: { kicker: 'CHAPTER ONE', lines: ['THE COUPON', 'THAT COULDN\'T EXIST'], size: 110 } },
  { id: 'tk', type: 'ticket', at: [-1000, 150], in: -1, props: { at: 0.5 } },
  { id: 'cal', type: 'calendar', at: [0, 250], in: -1, props: { head: 'YEAR', roll: { from: 1991, to: 2008, at: 0.5, dur: 2 }, sub: '17 MORE YEARS', subAt: 3 } },
  { id: 'cal2', type: 'calendar', at: [800, 250], in: -1, props: { head: 'DECEMBER', pages: [{ at: 0.3, text: 'DEC 10' }, { at: 3, text: 'DEC 11', tone: 'bad' }] } },
  { id: 'f', type: 'folder', at: [1500, 200], in: -1, props: { stamp: 'CAUGHT BY MATH', stampAt: 3 } },
  { id: 'cl', type: 'checklist', at: [-2400, 150], in: -1, props: { rows: [{ show: 0.5, t: 'MORE THAN EXISTS?', tick: 3 }, { show: 1, t: 'TOO SMOOTH?' }, {}] } },
  { id: 'pn', type: 'panel', at: [-3200, 150], in: -1, props: { title: 'COUPONS', mark: 'x', markAt: 2 } },
  { id: 'sl', type: 'silh', at: [2200, 150], in: -1, props: { name: 'CHARLES PONZI', role: 'PROMOTER · BOSTON', hat: 'bowler' } },
  { id: 'bd', type: 'badge', at: [2800, 150], in: -1, props: { text: 'FORMER NASDAQ CHAIRMAN' } },
 ],
 beats: [{ at: 0, beat: 'wide', fill: 0.95 }, { at: 3.4, beat: 'wide', fill: 0.95 }] });
