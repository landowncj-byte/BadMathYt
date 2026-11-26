function draw(g,W,H){
  bg(g,W,H,'#2b3a4d','#10161f');
  g.fillStyle='rgba(255,255,255,.05)';for(let i=0;i<4;i++)g.fillRect(i*230,0,100,H);
  const men=[{x:W*0.19,y:H*0.60,r:104,mask:'#8fbf6a'},{x:W*0.81,y:H*0.60,r:104,mask:'#c98a6a'},{x:W*0.5,y:H*0.5,r:122,mask:'#a9a0d0'}];
  [0,1,2].forEach(i=>{const m=men[i],cx=m.x,cy=m.y,r=m.r;
    g.fillStyle='#1f3352';g.beginPath();g.moveTo(cx-r*1.95,H+10);g.quadraticCurveTo(cx-r*1.95,cy+r*1.25,cx,cy+r*1.18);g.quadraticCurveTo(cx+r*1.95,cy+r*1.25,cx+r*1.95,H+10);g.closePath();g.fill();g.strokeStyle='#0a0d12';g.lineWidth=7;g.stroke();
    g.fillStyle='rgba(0,0,0,.2)';g.beginPath();g.moveTo(cx,cy+r*1.18);g.quadraticCurveTo(cx+r*1.95,cy+r*1.25,cx+r*1.95,H+10);g.lineTo(cx,H+10);g.fill();
    for(const q of[-1,1]){ell(g,cx+q*r*0.5,cy+r*1.75,9,9,'#d9a406',{stroke:'#0a0d12',lw:3});ell(g,cx+q*r*0.5,cy+r*2.0,9,9,'#d9a406',{stroke:'#0a0d12',lw:3});}
    // rubber mask face
    ell(g,cx,cy,r,r*1.08,m.mask,{stroke:'#0a0d12',lw:7});
    ell(g,cx-r*0.58,cy+r*0.3,r*0.17,r*0.12,'rgba(200,70,70,.45)');ell(g,cx+r*0.58,cy+r*0.3,r*0.17,r*0.12,'rgba(200,70,70,.45)');
    for(const q of[-1,1]){ell(g,cx+q*r*0.38,cy-r*0.05,r*0.2,r*0.15,'#0a0d12');ell(g,cx+q*r*0.38+q*2,cy-r*0.05,r*0.07,r*0.07,'#fff');
      g.strokeStyle='#0a0d12';g.lineWidth=r*0.1;g.lineCap='round';g.beginPath();g.moveTo(cx+q*r*0.12,cy-r*0.4);g.lineTo(cx+q*r*0.62,cy-r*(0.3+0.1*q*(i-1)));g.stroke();}
    g.fillStyle='#0a0d12';g.beginPath();g.moveTo(cx-r*0.5,cy+r*0.42);g.quadraticCurveTo(cx,cy+r*0.95,cx+r*0.5,cy+r*0.42);g.quadraticCurveTo(cx,cy+r*0.55,cx-r*0.5,cy+r*0.42);g.fill();
    g.fillStyle='#fff';for(let k=-2;k<=2;k++)g.fillRect(cx+k*r*0.16-5,cy+r*0.5,10,r*0.12);
    // chauffeur cap (peaked)
    g.fillStyle='#14171c';g.beginPath();g.moveTo(cx-r*1.05,cy-r*0.3);g.bezierCurveTo(cx-r*1.1,cy-r*1.3,cx+r*1.1,cy-r*1.3,cx+r*1.05,cy-r*0.3);g.closePath();g.fill();g.strokeStyle='#000';g.lineWidth=6;g.stroke();
    rrect(g,cx-r*1.0,cy-r*0.46,r*2.0,r*0.2,8,'#0a0d12');
    g.fillStyle='#0a0d12';g.beginPath();g.moveTo(cx-r*0.8,cy-r*0.28);g.lineTo(cx+r*0.8,cy-r*0.28);g.lineTo(cx+r*0.6,cy-r*0.12);g.lineTo(cx-r*0.6,cy-r*0.12);g.closePath();g.fill();
    ell(g,cx,cy-r*0.72,r*0.13,r*0.13,'#d9a406',{stroke:'#000',lw:3});
  });
}
