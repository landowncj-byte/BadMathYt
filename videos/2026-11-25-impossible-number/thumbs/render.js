const {chromium}=require('playwright');const http=require('http');const fs=require('fs');const path=require('path');
const root=path.resolve(__dirname,'../../..');
const srv=http.createServer((q,s)=>{const f=path.join(root,decodeURIComponent(q.url.split('?')[0]));fs.readFile(f,(e,d)=>{if(e){s.statusCode=404;return s.end()}const t={'.js':'text/javascript','.html':'text/html','.woff2':'font/woff2'}[path.extname(f)]||'application/octet-stream';s.setHeader('content-type',t);s.end(d)})}).listen(0,async()=>{
 const b=await chromium.launch();const pg=await b.newPage({viewport:{width:1280,height:720}});
 pg.on('console',m=>console.log(m.text()));pg.on('pageerror',e=>console.log('ERR',e.message));
 await pg.goto(`http://localhost:${srv.address().port}/videos/2026-11-25-impossible-number/thumbs/thumbs.html`);await pg.waitForFunction('window.READY');
 for(const k of 'abc'){const d=await pg.evaluate(k=>document.getElementById(k).toDataURL('image/png'),k);fs.writeFileSync(`thumb-${k}.png`,Buffer.from(d.split(',')[1],'base64'));
  const s=await pg.evaluate(async d=>{const i=new Image();i.src=d;await i.decode();const c=document.createElement('canvas');c.width=160;c.height=90;const x=c.getContext('2d');x.imageSmoothingQuality='high';x.drawImage(i,0,0,160,90);return c.toDataURL('image/png')},d);
  fs.writeFileSync(`thumb-${k}-small.png`,Buffer.from(s.split(',')[1],'base64'));}
 await b.close();srv.close();});
