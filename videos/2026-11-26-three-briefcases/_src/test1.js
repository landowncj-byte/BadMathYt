BM2.scene({ series:'whatif', title:'TEST', duration: 6,
 footnote:['test'],
 elements:[
  { id:'b', type:'board3', at:[0,330], in:-1, props:{ boxAt:-1, rows:[[0.2,0,2,1.6],[1.1,1,2,2.4],[1.8,2,1,3.0]], sumAt:3.6 } },
  { id:'cal', type:'calendar', at:[1750,330], in:-1, props:{t0:0.2,t1:3,doneAt:3.1} },
  { id:'col', type:'column', at:[3500,330], in:-1, props:{stampAt:0.6, circleAt:1.4} },
  { id:'live', type:'live', layer:'screen', at:[540,352], in:-1, props:{end:6} },
  { id:'lab', type:'blabel', layer:'screen', at:[850,264], in:-1, props:{labels:[[0,'THE BET'],[3,'THE CHECK']]} },
 ],
 beats:[ {at:0,beat:'graphic-hero',focus:'b',fill:0.92,maxH:1000,sy:800,st:'corner-left',pose:'point'}, {at:3.6,beat:'graphic-hero',focus:'cal',move:'whip',fill:0.9,sy:800}, {at:5,beat:'graphic-hero',focus:'col',move:'whip',fill:0.9,sy:800} ],
 captions:false, autoSfx:false });
