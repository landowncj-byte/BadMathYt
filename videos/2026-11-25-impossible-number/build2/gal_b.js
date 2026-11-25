const mk = (id, type, x, y, props, extra) => ({ id, type, at: [x, y], in: -1, props, ...extra });
const els = [
 mk('coupon','coupon',0,0,{}), mk('queue','queue',2600,0,{capsAt:2,caps:6}), mk('dots','dotgrid',5200,0,{hiAt:1.5}), mk('pyr','pyramid',7800,0,{flowAt:1}),
 mk('news','news',0,1400,{}), mk('banks','banks',2600,1400,{n:6,label:'x',labelAt:0}), mk('banks2','banks',5200,1400,{n:51,cols:11,s:80,gap:22,mode:'red',per:0.04}), mk('dict','dict',7800,1400,{}),
 mk('tanks','tanks',0,2800,{}), mk('tc','tankcut',2600,2800,{waterAt:1,tubeAt:2,stickAt:2.5,stick2At:3.5,oilAt:0}), mk('flow','flow',5600,2800,{items:[{label:'TANK',icon:'tank',at:0.2},{label:'INSPECTOR',icon:'magnifier',at:0.6},{label:'RECEIPT',icon:'doc',at:1},{label:'BANK',icon:'building',at:1.4},{label:'$',icon:'dollar',at:1.8,tone:'good'}]}),
 mk('rs','receiptstack',0,4200,{labelAt:2}), mk('pipes','pipes',3200,4200,{times:[0.5,1.5,2.5,3.5]}), mk('tp','tankpair',6200,4200,{fillAt:0.5,overAt:1.5}),
 mk('chart','chart',0,5600,{series:[{kind:'noise',seed:3,tone:'bad',at:0.2,dur:2,label:'REAL MARKET',labelAt:2.2},{kind:'straight',tone:'good',at:2.4,dur:1.5,label:'MADOFF',labelAt:4,w:12}],angle:{at:4},markX:{at:4.5}}),
 mk('sw','stopwatch',2600,5600,{aAt:0.3,bAt:1.5}), mk('cells','cells',5000,5600,{redAt:2,label:'LOSING MONTHS ≈ 4%',labelAt:2.5}), mk('need','needed',7500,5600,{bAt:1}),
 mk('memo','memo',0,7000,{}), mk('len','lenses',2600,7000,{}), mk('jail','jail',5600,7000,{lines:[{t:'20 YEARS',at:0.8,strike:1.8,tone:'bad'},{t:'OUT IN 7',at:2.2,tone:'good'}]}), mk('yb','yearbars',8000,7000,{}), mk('br','bracket',10000,7000,{lines:[{t:'$35–55B',hero:true,tone:'bad'},{t:'NEVER EXISTED'}]}),
];
BM2.scene({ series: 'decoded', title: 'GALLERY B', duration: 90, float: 0, captions: false, storyteller: true, elements: els,
 beats: els.map((e, i) => ({ at: i * 4, beat: 'graphic-hero', focus: e.id, fill: 0.55, dur: 0.3, lead: 0 })) });
