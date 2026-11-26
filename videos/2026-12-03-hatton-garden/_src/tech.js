function draw(g,W,H){
  bg(g,W,H,'#2f4a4a','#121f1f');
  g.fillStyle='rgba(255,255,255,.05)';for(let i=0;i<5;i++)g.fillRect(i*170,0,70,H);
  const cx=W/2, hy=H*0.38, r=165, by=H*0.9;
  g.fillStyle='#3a4256';g.beginPath();g.moveTo(cx-340,H+10);g.quadraticCurveTo(cx-350,by-170,cx-130,by-200);g.lineTo(cx+130,by-200);g.quadraticCurveTo(cx+350,by-170,cx+340,H+10);g.closePath();g.fill();g.strokeStyle='#0a0d12';g.lineWidth=7;g.stroke();
  g.fillStyle='#f28c1b';g.beginPath();g.moveTo(cx-130,by-200);g.lineTo(cx,by-60);g.lineTo(cx+130,by-200);g.lineTo(cx+250,by-120);g.lineTo(cx+250,H+10);g.lineTo(cx-250,H+10);g.lineTo(cx-250,by-120);g.closePath();g.fill();g.stroke();
  rrect(g,cx-48,by-300,96,110,30,'#d4b186');
  ell(g,cx-r,hy+10,26,38,skin,{stroke:'#2b2118',lw:7});ell(g,cx+r,hy+10,26,38,skin,{stroke:'#2b2118',lw:7});
  face(g,cx,hy,r,{smirk:true,look:-8});
  g.fillStyle='#8a7a66';g.beginPath();g.moveTo(cx-r*0.9,hy-r*0.3);g.bezierCurveTo(cx-r*1.0,hy-r*1.2,cx+r*1.0,hy-r*1.2,cx+r*0.9,hy-r*0.3);g.quadraticCurveTo(cx,hy-r*0.7,cx-r*0.9,hy-r*0.3);g.fill();
  // headphones
  g.strokeStyle='#14171c';g.lineWidth=18;g.lineCap='round';g.beginPath();g.arc(cx,hy-r*0.1,r*1.12,Math.PI*1.08,Math.PI*1.92);g.stroke();
  rrect(g,cx-r*1.3,hy-r*0.2,r*0.32,r*0.6,14,'#d9362b',{stroke:'#0a0d12',lw:5});rrect(g,cx+r*0.98,hy-r*0.2,r*0.32,r*0.6,14,'#d9362b',{stroke:'#0a0d12',lw:5});
  // multimeter
  g.save();g.translate(cx+250,by-130);g.rotate(0.15);rrect(g,-50,-80,100,150,12,'#F2B705',{stroke:'#0a0d12',lw:5});rrect(g,-36,-66,72,40,5,'#9fd6a0',{stroke:'#0a0d12',lw:3});ell(g,0,10,22,22,'#2b3340',{stroke:'#0a0d12',lw:3});g.restore();
}
