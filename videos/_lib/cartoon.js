// shared cartoon helpers (paste before draw): flat clay-ish characters in the Bad Math paper look
const skin='#E8C9A0';
function bg(g,W,H,c1,c2){const l=g.createLinearGradient(0,0,0,H);l.addColorStop(0,c1);l.addColorStop(1,c2);g.fillStyle=l;g.fillRect(0,0,W,H);}
function ell(g,x,y,rx,ry,c,o={}){g.save();g.fillStyle=c;g.beginPath();g.ellipse(x,y,rx,ry,o.rot||0,0,7);g.fill();if(o.stroke){g.strokeStyle=o.stroke;g.lineWidth=o.lw||6;g.stroke();}g.restore();}
function poly(g,pts,c,o={}){g.save();g.fillStyle=c;g.beginPath();pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.closePath();g.fill();if(o.stroke){g.strokeStyle=o.stroke;g.lineWidth=o.lw||6;g.lineJoin='round';g.stroke();}g.restore();}
function rrect(g,x,y,w,h,r,c,o={}){g.save();g.fillStyle=c;g.beginPath();g.roundRect(x,y,w,h,r);g.fill();if(o.stroke){g.strokeStyle=o.stroke;g.lineWidth=o.lw||6;g.stroke();}g.restore();}
function face(g,cx,cy,r,o={}){ // round head, cheeks, eyes, brows, mouth
  ell(g,cx,cy,r,r*1.08,o.skin||skin,{stroke:'#2b2118',lw:7});
  ell(g,cx-r*0.58,cy+r*0.3,r*0.17,r*0.12,'rgba(224,120,100,.5)');ell(g,cx+r*0.58,cy+r*0.3,r*0.17,r*0.12,'rgba(224,120,100,.5)');
  for(const q of[-1,1]){ell(g,cx+q*r*0.36,cy-r*0.05,r*0.2,r*0.22,'#fff',{stroke:'#2b2118',lw:5});ell(g,cx+q*r*0.36+(o.look||0),cy-r*0.02,r*0.09,r*0.11,'#0B0F14');
    g.strokeStyle=o.brow||'#2b2118';g.lineWidth=r*0.09;g.lineCap='round';g.beginPath();g.moveTo(cx+q*r*0.16,cy-r*(0.36+(o.browUp||0)*q*-0.0));g.lineTo(cx+q*r*0.6,cy-r*(0.42-(o.angry||0)*q*0.0+(o.angry?q*0.0:0)));g.stroke();}
  g.strokeStyle='#7a2b25';g.lineWidth=r*0.07;g.lineCap='round';g.beginPath();
  if(o.smirk){g.moveTo(cx-r*0.3,cy+r*0.5);g.quadraticCurveTo(cx+r*0.1,cy+r*0.62,cx+r*0.42,cy+r*0.38);}else if(o.frown){g.arc(cx,cy+r*0.75,r*0.26,Math.PI*1.15,Math.PI*1.85);}else{g.arc(cx,cy+r*0.42,r*0.28,0.2,Math.PI-0.2);}g.stroke();}
