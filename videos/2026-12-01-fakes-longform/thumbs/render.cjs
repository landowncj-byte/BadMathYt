const {chromium}=require('/opt/node-tools/node_modules/playwright');const http=require('http');const fs=require('fs');const path=require('path');
const root=path.resolve(__dirname,'../../..');
const srv=http.createServer((q,s)=>{const f=path.join(root,decodeURIComponent(q.url.split('?')[0]));fs.readFile(f,(e,d)=>{if(e){s.statusCode=404;return s.end()}s.setHeader('content-type',{'.js':'text/javascript','.html':'text/html'}[path.extname(f)]||'application/octet-stream');s.end(d)})}).listen(0,async()=>{
 const b=await chromium.launch();const pg=await b.newPage({viewport:{width:1280,height:720}});
 pg.on('pageerror',e=>console.log('ERR',e.message));
 await pg.goto(`http://localhost:${srv.address().port}/videos/2026-12-01-fakes-longform/thumbs/thumbs.html`);await pg.waitForFunction('window.READY',null,{timeout:30000});
 const d=await pg.evaluate(()=>document.getElementById('a').toDataURL('image/png'));fs.writeFileSync(path.join(__dirname,'thumbnail.png'),Buffer.from(d.split(',')[1],'base64'));
 await b.close();srv.close();});
