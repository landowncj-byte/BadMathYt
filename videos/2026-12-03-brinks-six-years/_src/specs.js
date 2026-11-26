function draw(g,W,H){
  const stripes = typeof STRIPES!=='undefined'&&STRIPES;
  bg(g,W,H,stripes?'#3b3b44':'#3a4a3f',stripes?'#17171c':'#141c17');
  g.fillStyle='rgba(255,255,255,.05)';for(let i=0;i<5;i++)g.fillRect(i*170,0,70,H);
  const cx=W/2, hy=H*0.38, r=165, by=H*0.9;
  const coat=stripes?'#e9e4d6':'#2a3f66';
  g.fillStyle=coat;g.beginPath();g.moveTo(cx-340,H+10);g.quadraticCurveTo(cx-350,by-170,cx-130,by-200);g.lineTo(cx+130,by-200);g.quadraticCurveTo(cx+350,by-170,cx+340,H+10);g.closePath();g.fill();g.strokeStyle='#0a0d12';g.lineWidth=7;g.stroke();
  if(stripes){g.save();g.clip();g.fillStyle='#14171c';for(let x=cx-360;x<cx+360;x+=60)g.fillRect(x,by-220,28,H);g.restore();}
  else{poly(g,[[cx-110,by-200],[cx,by-40],[cx+110,by-200]],'#e9e4d6',{stroke:'#0a0d12',lw:6});for(let k=0;k<3;k++)ell(g,cx+70,by-10+k*50,10,10,'#d9a406',{stroke:'#0a0d12',lw:3});}
  rrect(g,cx-48,by-300,96,110,30,'#d4b186');
  ell(g,cx-r,hy+10,26,38,skin,{stroke:'#2b2118',lw:7});ell(g,cx+r,hy+10,26,38,skin,{stroke:'#2b2118',lw:7});
  face(g,cx,hy,r,{frown:!stripes,smirk:stripes});
  // thick black glasses
  g.strokeStyle='#0a0d12';g.lineWidth=14;for(const q of[-1,1]){g.beginPath();g.roundRect(cx+q*r*0.36-r*0.3,hy-r*0.32,r*0.6,r*0.5,12);g.stroke();}
  g.beginPath();g.moveTo(cx-r*0.06,hy-r*0.1);g.lineTo(cx+r*0.06,hy-r*0.1);g.stroke();
  g.lineWidth=10;g.beginPath();g.moveTo(cx-r*0.66,hy-r*0.1);g.lineTo(cx-r*1.0,hy-r*0.2);g.moveTo(cx+r*0.66,hy-r*0.1);g.lineTo(cx+r*1.0,hy-r*0.2);g.stroke();
  if(!stripes){ // flat cap
    g.fillStyle='#5a5448';g.beginPath();g.moveTo(cx-r*1.0,cy0=hy-r*0.52);g.bezierCurveTo(cx-r*1.0,hy-r*1.45,cx+r*1.0,hy-r*1.45,cx+r*1.0,hy-r*0.52);g.quadraticCurveTo(cx+r*1.5,hy-r*0.5,cx+r*1.4,hy-r*0.38);g.lineTo(cx-r*1.0,hy-r*0.42);g.closePath();g.fill();g.strokeStyle='#0a0d12';g.lineWidth=6;g.stroke();
  } else { g.fillStyle='#4a3a2a';g.beginPath();g.moveTo(cx-r*0.95,hy-r*0.3);g.bezierCurveTo(cx-r*1.0,hy-r*1.15,cx+r*1.0,hy-r*1.15,cx+r*0.95,hy-r*0.3);g.quadraticCurveTo(cx,hy-r*0.65,cx-r*0.95,hy-r*0.3);g.fill(); }
}
