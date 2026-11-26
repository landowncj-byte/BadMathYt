function draw(g,W,H){
  bg(g,W,H,'#27415f','#121c2c');
  g.fillStyle='rgba(255,255,255,.05)';for(let i=0;i<4;i++)g.fillRect(i*210,0,90,H);
  const hood=['#E0692A','#1F9AA8','#8a55c8'], xs=[W*0.2,W*0.5,W*0.8], ys=[H*0.58,H*0.5,H*0.58], rs=[110,128,110];
  [0,2,1].forEach(i=>{const cx=xs[i],cy=ys[i],r=rs[i];
    g.fillStyle=hood[i];g.beginPath();g.moveTo(cx-r*1.9,H+10);g.quadraticCurveTo(cx-r*1.9,cy+r*1.2,cx,cy+r*1.15);g.quadraticCurveTo(cx+r*1.9,cy+r*1.2,cx+r*1.9,H+10);g.closePath();g.fill();g.strokeStyle='#10141a';g.lineWidth=7;g.stroke();
    g.fillStyle='rgba(0,0,0,.16)';g.beginPath();g.moveTo(cx,cy+r*1.15);g.quadraticCurveTo(cx+r*1.9,cy+r*1.2,cx+r*1.9,H+10);g.lineTo(cx,H+10);g.fill();
    ell(g,cx,cy,r,r*1.05,'#cfa57a',{stroke:'#2b2118',lw:7});
    // dark mask lower face
    g.fillStyle='#14171c';g.beginPath();g.moveTo(cx-r*0.98,cy+r*0.12);g.quadraticCurveTo(cx,cy+r*0.35,cx+r*0.98,cy+r*0.12);g.quadraticCurveTo(cx+r*0.9,cy+r*1.0,cx,cy+r*1.05);g.quadraticCurveTo(cx-r*0.9,cy+r*1.0,cx-r*0.98,cy+r*0.12);g.fill();
    for(const q of[-1,1]){ell(g,cx+q*r*0.38,cy-r*0.12,r*0.2,r*0.14,'#fff',{stroke:'#2b2118',lw:5});ell(g,cx+q*r*0.38,cy-r*0.1,r*0.08,r*0.09,'#0B0F14');}
    g.strokeStyle='#14171c';g.lineWidth=r*0.09;g.lineCap='round';g.beginPath();g.moveTo(cx-r*0.62,cy-r*0.4);g.lineTo(cx-r*0.18,cy-r*0.3);g.moveTo(cx+r*0.62,cy-r*0.4);g.lineTo(cx+r*0.18,cy-r*0.3);g.stroke();
    // black beanie
    g.fillStyle='#14171c';g.beginPath();g.moveTo(cx-r*1.02,cy-r*0.3);g.bezierCurveTo(cx-r*1.1,cy-r*1.5,cx+r*1.1,cy-r*1.5,cx+r*1.02,cy-r*0.3);g.closePath();g.fill();
    rrect(g,cx-r*1.08,cy-r*0.62,r*2.16,r*0.34,r*0.12,'#262b32',{stroke:'#0b0d11',lw:5});
    ell(g,cx,cy-r*1.32,r*0.16,r*0.16,'#262b32');
  });
}
