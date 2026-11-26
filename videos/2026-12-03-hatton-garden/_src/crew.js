function draw(g,W,H){
  bg(g,W,H,'#3d3a4d','#16151f');
  g.fillStyle='rgba(255,255,255,.05)';for(let i=0;i<4;i++)g.fillRect(i*230,0,100,H);
  const men=[{x:W*0.19,y:H*0.60,r:104,cap:'#2e3b4e',skin:'#E8C9A0'},{x:W*0.81,y:H*0.60,r:104,cap:'#5a4a3a',skin:'#d9b48a'},{x:W*0.5,y:H*0.5,r:122,cap:'#2a2f36',skin:'#E8C9A0',grey:true}];
  [0,1,2].forEach(i=>{const m=men[i],cx=m.x,cy=m.y,r=m.r;
    g.fillStyle='#3a4256';g.beginPath();g.moveTo(cx-r*1.95,H+10);g.quadraticCurveTo(cx-r*1.95,cy+r*1.25,cx,cy+r*1.18);g.quadraticCurveTo(cx+r*1.95,cy+r*1.25,cx+r*1.95,H+10);g.closePath();g.fill();g.strokeStyle='#0a0d12';g.lineWidth=7;g.stroke();
    // hi-vis vest
    g.fillStyle='#f28c1b';g.beginPath();g.moveTo(cx-r*1.0,cy+r*1.2);g.lineTo(cx-r*0.5,cy+r*1.12);g.lineTo(cx,cy+r*1.5);g.lineTo(cx+r*0.5,cy+r*1.12);g.lineTo(cx+r*1.0,cy+r*1.2);g.lineTo(cx+r*1.25,H+10);g.lineTo(cx-r*1.25,H+10);g.closePath();g.fill();g.stroke();
    g.fillStyle='#e9e4d6';g.fillRect(cx-r*1.2,cy+r*1.75,r*2.4,r*0.16);
    ell(g,cx-r,cy+8,r*0.17,r*0.28,m.skin,{stroke:'#2b2118',lw:6});ell(g,cx+r,cy+8,r*0.17,r*0.28,m.skin,{stroke:'#2b2118',lw:6});
    face(g,cx,cy,r,{skin:m.skin,smirk:i!==1,look:i===0?8:-8});
    if(m.grey){g.strokeStyle='#cfcfd6';g.lineWidth=12;g.lineCap='round';g.beginPath();g.moveTo(cx-r*0.95,cy-r*0.1);g.lineTo(cx-r*0.95,cy+r*0.2);g.moveTo(cx+r*0.95,cy-r*0.1);g.lineTo(cx+r*0.95,cy+r*0.2);g.stroke();}
    g.fillStyle=m.cap;g.beginPath();g.moveTo(cx-r*1.0,cy-r*0.4);g.bezierCurveTo(cx-r*1.0,cy-r*1.35,cx+r*1.0,cy-r*1.35,cx+r*1.0,cy-r*0.4);g.quadraticCurveTo(cx+r*1.5,cy-r*0.38,cx+r*1.4,cy-r*0.26);g.lineTo(cx-r*1.0,cy-r*0.3);g.closePath();g.fill();g.strokeStyle='#10141a';g.lineWidth=6;g.stroke();
  });
  // core drill + holdall
  g.save();g.translate(W*0.31,H*0.88);g.rotate(-0.4);rrect(g,-14,-80,28,120,6,'#59606B',{stroke:'#0a0d12',lw:5});rrect(g,-30,-110,60,40,8,'#d9362b',{stroke:'#0a0d12',lw:5});rrect(g,-20,40,40,24,4,'#c9ccd2',{stroke:'#0a0d12',lw:4});g.restore();
  rrect(g,W*0.62,H*0.8,150,90,18,'#3b2f2a',{stroke:'#0a0d12',lw:6});g.strokeStyle='#0a0d12';g.lineWidth=8;g.beginPath();g.arc(W*0.62+75,H*0.8,34,Math.PI,0);g.stroke();
}
