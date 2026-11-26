function draw(g,W,H){
  bg(g,W,H,'#2e5d73','#16303d');
  g.fillStyle='rgba(255,255,255,.06)';for(let i=0;i<5;i++)g.fillRect(i*170,0,70,H);
  const cx=W/2, hy=H*0.38, r=165, by=H*0.9;
  // orange hoodie body
  g.fillStyle='#E8742A';g.beginPath();g.moveTo(cx-340,H+10);g.quadraticCurveTo(cx-350,by-170,cx-130,by-200);g.lineTo(cx+130,by-200);g.quadraticCurveTo(cx+350,by-170,cx+340,H+10);g.closePath();g.fill();g.strokeStyle='#14171c';g.lineWidth=7;g.stroke();
  g.fillStyle='rgba(0,0,0,.14)';g.beginPath();g.moveTo(cx,by-200);g.quadraticCurveTo(cx+350,by-170,cx+340,H+10);g.lineTo(cx,H+10);g.fill();
  // hood collar + strings
  g.strokeStyle='#14171c';g.lineWidth=7;g.fillStyle='#d4631d';g.beginPath();g.ellipse(cx,by-200,150,48,0,0,Math.PI);g.fill();g.stroke();
  g.strokeStyle='#F5F3EE';g.lineWidth=7;g.lineCap='round';g.beginPath();g.moveTo(cx-40,by-165);g.lineTo(cx-48,by-60);g.moveTo(cx+40,by-165);g.lineTo(cx+48,by-60);g.stroke();
  rrect(g,cx-215,by-70,430,70,16,'#c9611c',{stroke:'#14171c',lw:6}); // pocket
  // car keys in hand (raised, right side)
  ell(g,cx+250,by-300,46,46,skin,{stroke:'#2b2118',lw:7});
  g.strokeStyle='#c9ccd2';g.lineWidth=9;g.beginPath();g.arc(cx+250,by-390,24,0,7);g.stroke();
  rrect(g,cx+226,by-372,48,84,10,'#2b3340',{stroke:'#14171c',lw:5});ell(g,cx+250,by-340,10,10,'#E0281E');ell(g,cx+250,by-312,7,7,'#c9ccd2');
  rrect(g,cx+232,by-262,36,70,16,'#E8742A',{stroke:'#14171c',lw:6});
  rrect(g,cx-48,by-300,96,110,30,'#d4b186');
  ell(g,cx-r,hy+10,26,38,skin,{stroke:'#2b2118',lw:7});ell(g,cx+r,hy+10,26,38,skin,{stroke:'#2b2118',lw:7});
  ell(g,cx,hy-50,r*1.02,r*0.95,'#4a3220');
  face(g,cx,hy,r,{look:10});
  // messy hair front
  g.fillStyle='#4a3220';g.beginPath();g.moveTo(cx-r*1.0,hy-r*0.1);g.bezierCurveTo(cx-r*1.05,hy-r*1.45,cx+r*1.0,hy-r*1.5,cx+r*1.02,hy-r*0.1);g.bezierCurveTo(cx+r*0.8,hy-r*0.7,cx+r*0.2,hy-r*0.95,cx-r*0.3,hy-r*0.72);g.bezierCurveTo(cx-r*0.7,hy-r*0.6,cx-r*0.95,hy-r*0.4,cx-r*1.0,hy-r*0.1);g.fill();
}
