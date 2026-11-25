// node render.cjs stills 0,2.6 outdir  |  node render.cjs video out.mp4 fps n0 n1  |  node render.cjs srt out.srt
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const {spawn}=require('child_process');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
p.on('pageerror',e=>console.log('ERR',e.message));p.on('console',m=>{if(m.type()==='error')console.log('[c]',m.text())});
await p.goto('file://'+__dirname+'/scene.html');await p.evaluate(()=>window.ready);
const [mode,a,c,d,e]=process.argv.slice(2);
if(mode==='stills'){fs.mkdirSync(c,{recursive:true});for(const t of a.split(',').map(Number)){await p.evaluate(t=>window.render(t),t);await p.screenshot({path:path.join(c,`s_${String(t.toFixed(2)).padStart(5,'0')}.png`)});}}
else if(mode==='srt'){const caps=await p.evaluate(()=>window.CAPS.map(x=>({s:x.s,e:x.e,t:x.parts.map(q=>q[0]).join(' ')})));
 const f=s=>{s=Math.max(0,s);const h=Math.floor(s/3600),m=Math.floor(s%3600/60),sec=Math.floor(s%60),ms=Math.round((s%1)*1000);return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')},${String(ms).padStart(3,'0')}`};
 fs.writeFileSync(a,caps.map((x,i)=>`${i+1}\n${f(x.s)} --> ${f(x.e)}\n${x.t}\n`).join('\n'));}
else{const fps=+c,n0=+d,n1=+e;const ff=spawn('ffmpeg',['-y','-v','error','-f','image2pipe','-framerate',String(fps),'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','medium','-crf','17','-pix_fmt','yuv420p',a],{stdio:['pipe','inherit','inherit']});
 for(let n=n0;n<n1;n++){await p.evaluate(t=>window.render(t),n/fps);const buf=await p.screenshot({type:'jpeg',quality:94});if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));}
 ff.stdin.end();await new Promise(r=>ff.on('close',r));}
await b.close();})();
