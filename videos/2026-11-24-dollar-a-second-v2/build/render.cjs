// node render.cjs stills 0,4.5 outdir   |   node render.cjs video out.mp4 fps fromFrame toFrame
const {chromium}=require('playwright');const http=require('http'),fs=require('fs'),path=require('path');const {spawn}=require('child_process');
const ROOT=__dirname;const types={'.html':'text/html','.js':'text/javascript','.woff2':'font/woff2'};
const srv=http.createServer((q,r)=>{const p=path.join(ROOT,decodeURIComponent(q.url.split('?')[0]));fs.readFile(p,(e,d)=>{if(e){r.writeHead(404);r.end();return;}r.writeHead(200,{'content-type':types[path.extname(p)]||'application/octet-stream'});r.end(d);});}).listen(0);
(async()=>{
const b=await chromium.launch({args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
const p=await b.newPage({viewport:{width:720,height:1280},deviceScaleFactor:1.5});
p.on('pageerror',e=>console.log('ERR',e.message));p.on('console',m=>{if(m.type()==='error')console.log('[c]',m.text())});
await p.goto(`http://localhost:${srv.address().port}/index.html?render=1`);await p.waitForFunction(()=>window.renderAt&&window.ready,{timeout:120000});await p.evaluate(()=>window.ready);
const shot=()=>p.screenshot({clip:{x:0,y:0,width:720,height:1280},type:'png'});
const [mode,a,c,d,e]=process.argv.slice(2);
if(mode==='stills'){fs.mkdirSync(c,{recursive:true});for(const t of a.split(',').map(Number)){await p.evaluate(t=>window.renderAt(t),t);fs.writeFileSync(path.join(c,`s_${t.toFixed(2)}.png`),await shot());}}
else{const fps=Number(c),n0=Number(d),n1=Number(e);
 const ff=spawn('ffmpeg',['-y','-v','error','-f','image2pipe','-framerate',String(fps),'-c:v','png','-i','-','-c:v','libx264','-preset','medium','-crf','16','-pix_fmt','yuv420p',a],{stdio:['pipe','inherit','inherit']});
 const T0=Date.now();for(let n=n0;n<n1;n++){await p.evaluate(t=>window.renderAt(t),n/fps);const buf=await shot();if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));if(n%60===0)console.log(`frame ${n}/${n1} ${((Date.now()-T0)/(n-n0+1)).toFixed(0)}ms`);}
 ff.stdin.end();await new Promise(r=>ff.on('close',r));}
await b.close();srv.close();})();
