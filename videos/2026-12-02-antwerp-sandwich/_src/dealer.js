function draw(g,W,H){
  bg(g,W,H,'#7a2b2a','#3b1618');
  // soft window light stripes
  g.fillStyle='rgba(255,230,180,.07)';for(let i=0;i<5;i++){g.beginPath();g.moveTo(80+i*150,0);g.lineTo(160+i*150,0);g.lineTo(60+i*150,H);g.lineTo(-20+i*150,H);g.fill();}
  const cx=W/2, by=H*0.86;
  // shoulders / suit (charcoal pinstripe)
  g.fillStyle='#2f343c';g.beginPath();g.moveTo(cx-330,H+10);g.quadraticCurveTo(cx-340,by-150,cx-120,by-190);g.lineTo(cx+120,by-190);g.quadraticCurveTo(cx+340,by-150,cx+330,H+10);g.closePath();g.fill();
  g.strokeStyle='rgba(235,235,240,.22)';g.lineWidth=3;for(let x=cx-320;x<cx+330;x+=26){g.beginPath();g.moveTo(x,H);g.lineTo(x+(x<cx?-6:6),by-170+Math.abs(x-cx)*0.25);g.stroke();}
  g.strokeStyle='#14171c';g.lineWidth=7;g.beginPath();g.moveTo(cx-330,H);g.quadraticCurveTo(cx-340,by-150,cx-120,by-190);g.lineTo(cx+120,by-190);g.quadraticCurveTo(cx+340,by-150,cx+330,H);g.stroke();
  // shirt V + collar
  poly(g,[[cx-95,by-195],[cx,by-40],[cx+95,by-195]],'#F5F3EE',{stroke:'#14171c',lw:6});
  poly(g,[[cx-100,by-200],[cx-30,by-175],[cx-70,by-120]],'#E7E2D6',{stroke:'#14171c',lw:5});poly(g,[[cx+100,by-200],[cx+30,by-175],[cx+70,by-120]],'#E7E2D6',{stroke:'#14171c',lw:5});
  // lapels
  poly(g,[[cx-100,by-200],[cx-150,by-80],[cx-20,by+20],[cx-95,by-110]],'#262b32',{stroke:'#14171c',lw:6});poly(g,[[cx+100,by-200],[cx+150,by-80],[cx+20,by+20],[cx+95,by-110]],'#262b32',{stroke:'#14171c',lw:6});
  // gold tie
  poly(g,[[cx-20,by-170],[cx+20,by-170],[cx+14,by-150],[cx-14,by-150]],'#d9a406',{stroke:'#7a5a00',lw:4});
  poly(g,[[cx-14,by-150],[cx+14,by-150],[cx+30,by-20],[cx,by+10],[cx-30,by-20]],'#F2B705',{stroke:'#7a5a00',lw:5});
  g.strokeStyle='rgba(122,90,0,.45)';g.lineWidth=4;for(let i=0;i<4;i++){g.beginPath();g.moveTo(cx-20+i*3,by-120+i*28);g.lineTo(cx+20-i*3,by-135+i*28);g.stroke();}
  // keycard on lapel (clipped)
  g.save();g.translate(cx+120,by-70);g.rotate(0.12);rrect(g,-34,-24,68,48,6,'#f4f0e4',{stroke:'#14171c',lw:4});g.fillStyle='#2c3e66';g.fillRect(-34,-24,68,14);g.fillStyle='#14171c';g.fillRect(-24,0,30,5);g.fillRect(-24,10,44,4);ell(g,-4,-30,5,5,'#59606B');g.restore();
  // jeweller's loupe on a cord
  g.strokeStyle='#14171c';g.lineWidth=5;g.beginPath();g.moveTo(cx-90,by-195);g.quadraticCurveTo(cx-130,by-100,cx-112,by-45);g.stroke();
  ell(g,cx-112,by-30,34,34,'#c9ccd2',{stroke:'#14171c',lw:7});ell(g,cx-112,by-30,22,22,'rgba(160,210,240,.85)',{stroke:'#59606B',lw:3});ell(g,cx-120,by-40,6,5,'rgba(255,255,255,.9)');
  // neck + head
  rrect(g,cx-48,by-300,96,120,30,'#d4b186');
  const hy=H*0.36, r=170;
  ell(g,cx-r,hy+10,26,38,skin,{stroke:'#2b2118',lw:7});ell(g,cx+r,hy+10,26,38,skin,{stroke:'#2b2118',lw:7});
  // hair back (slicked dark)
  ell(g,cx,hy-60,r*1.02,r*0.95,'#1a1512');
  face(g,cx,hy,r,{smirk:true,look:8});
  // slicked hair front
  g.fillStyle='#1a1512';g.beginPath();g.moveTo(cx-r*1.0,hy-r*0.2);g.bezierCurveTo(cx-r*1.05,hy-r*1.35,cx+r*0.9,hy-r*1.45,cx+r*1.02,hy-r*0.2);g.bezierCurveTo(cx+r*0.7,hy-r*0.85,cx+r*0.0,hy-r*0.95,cx-r*0.5,hy-r*0.78);g.bezierCurveTo(cx-r*0.8,hy-r*0.6,cx-r*0.95,hy-r*0.45,cx-r*1.0,hy-r*0.2);g.fill();
  g.strokeStyle='rgba(255,255,255,.25)';g.lineWidth=6;g.lineCap='round';for(let i=0;i<4;i++){g.beginPath();g.moveTo(cx-r*0.7+i*r*0.35,hy-r*0.9+i*6);g.quadraticCurveTo(cx-r*0.2+i*r*0.35,hy-r*1.15,cx+r*0.35+i*r*0.3,hy-r*0.95);g.stroke();}
  // thin moustache
  g.fillStyle='#1a1512';g.beginPath();g.moveTo(cx-r*0.34,hy+r*0.34);g.quadraticCurveTo(cx,hy+r*0.22,cx+r*0.34,hy+r*0.34);g.quadraticCurveTo(cx,hy+r*0.32,cx-r*0.34,hy+r*0.34);g.fill();g.strokeStyle='#1a1512';g.lineWidth=7;g.beginPath();g.moveTo(cx-r*0.36,hy+r*0.36);g.quadraticCurveTo(cx,hy+r*0.24,cx+r*0.36,hy+r*0.36);g.stroke();
}
