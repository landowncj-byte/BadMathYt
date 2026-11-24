const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.goto('file://'+__dirname+'/scene.html');await p.evaluate(()=>document.fonts.ready);
const ts=process.argv.slice(2).map(Number);
for(const t of ts){await p.evaluate(t=>window.render(t),t);await p.screenshot({path:`/tmp/claude-0/-home-user/2038a7ea-fea8-5825-b2d5-fe5c8d6143c0/scratchpad/f_${t.toFixed(2)}.png`});}
await b.close();})();
