const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
p.on('pageerror',e=>console.log('ERR',e.message));p.on('console',m=>{if(m.type()==='error')console.log('[c]',m.text())});
await p.goto('file://'+__dirname+'/scene.html');await p.evaluate(()=>window.ready);
const out=process.argv[2];fs.mkdirSync(out,{recursive:true});
for(const t of process.argv[3].split(',').map(Number)){await p.evaluate(t=>window.render(t),t);await p.screenshot({path:`${out}/s_${t.toFixed(2).padStart(5,'0')}.png`});}
await b.close();})();
