function draw(g,W,H){
  bg(g,W,H,'#3a4a5c','#161e28');
  g.fillStyle='rgba(255,255,255,.05)';for(let i=0;i<4;i++)g.fillRect(i*230,0,100,H);
  const men=[{x:W*0.19,y:H*0.60,r:104,coat:'#7a5a3a',cap:'#2e3b4e',skin:'#E8C9A0',hair:'#3a2a1a'},{x:W*0.81,y:H*0.60,r:104,coat:'#4a6a4a',cap:'#6b3b3b',skin:'#d9b48a',hair:'#1a1512'},{x:W*0.5,y:H*0.5,r:122,coat:'#3d4f6d',cap:'#1f2733',skin:'#E8C9A0',hair:'#6b5a46'}];
  [0,1,2].forEach(i=>{const m=men[i],cx=m.x,cy=m.y,r=m.r;
    g.fillStyle=m.coat;g.beginPath();g.moveTo(cx-r*1.95,H+10);g.quadraticCurveTo(cx-r*1.95,cy+r*1.25,cx,cy+r*1.18);g.quadraticCurveTo(cx+r*1.95,cy+r*1.25,cx+r*1.95,H+10);g.closePath();g.fill();g.strokeStyle='#10141a';g.lineWidth=7;g.stroke();
    g.fillStyle='rgba(0,0,0,.18)';g.beginPath();g.moveTo(cx,cy+r*1.18);g.quadraticCurveTo(cx+r*1.95,cy+r*1.25,cx+r*1.95,H+10);g.lineTo(cx,H+10);g.fill();
    poly(g,[[cx-r*0.5,cy+r*1.1],[cx,cy+r*1.7],[cx+r*0.5,cy+r*1.1]],'#e9e4d6',{stroke:'#10141a',lw:5});
    g.strokeStyle='#10141a';g.lineWidth=6;g.beginPath();g.moveTo(cx-r*0.5,cy+r*1.1);g.lineTo(cx-r*0.12,cy+r*1.9);g.moveTo(cx+r*0.5,cy+r*1.1);g.lineTo(cx+r*0.12,cy+r*1.9);g.stroke();
    ell(g,cx-r,cy+8,r*0.17,r*0.28,m.skin,{stroke:'#2b2118',lw:6});ell(g,cx+r,cy+8,r*0.17,r*0.28,m.skin,{stroke:'#2b2118',lw:6});
    face(g,cx,cy,r,{skin:m.skin,smirk:i!==1,look:i===0?8:-8});
    // flat cap
    g.fillStyle=m.cap;g.beginPath();g.moveTo(cx-r*1.0,cy-r*0.32);g.bezierCurveTo(cx-r*1.0,cy-r*1.3,cx+r*1.0,cy-r*1.3,cx+r*1.0,cy-r*0.32);g.quadraticCurveTo(cx+r*1.5,cy-r*0.3,cx+r*1.4,cy-r*0.18);g.lineTo(cx-r*1.0,cy-r*0.22);g.closePath();g.fill();g.strokeStyle='#10141a';g.lineWidth=6;g.stroke();
    g.strokeStyle='rgba(255,255,255,.2)';g.lineWidth=4;g.beginPath();g.moveTo(cx-r*0.6,cy-r*0.9);g.quadraticCurveTo(cx,cy-r*1.1,cx+r*0.6,cy-r*0.9);g.stroke();
  });
  // banknote bundles under arms + top hat token
  [[W*0.30,H*0.86,-0.2],[W*0.70,H*0.86,0.2]].forEach(([x,y,a])=>{g.save();g.translate(x,y);g.rotate(a);rrect(g,-70,-36,140,72,6,'#3aa56b',{stroke:'#10141a',lw:5});g.fillStyle='#e9e4d6';g.fillRect(-12,-36,24,72);ell(g,0,0,18,18,'#2f8556',{stroke:'#10141a',lw:3});g.restore();});
  g.save();g.translate(W*0.5,H*0.92);rrect(g,-44,-60,88,60,8,'#14171c',{stroke:'#000',lw:4});rrect(g,-70,-6,140,16,6,'#14171c',{stroke:'#000',lw:4});g.restore();
}
