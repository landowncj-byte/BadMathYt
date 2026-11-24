const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:2160,height:1300}});
await p.goto('file://'+__dirname+'/assets.html');await p.evaluate(()=>window.ready);
for(const v of ['ink','red']){await p.evaluate(v=>window.pfp(v),v);await p.locator('#c').screenshot({path:__dirname+`/pfp-${v}.png`});}
await p.evaluate(()=>window.sheet());await p.locator('#c').screenshot({path:__dirname+'/character-sheet.png'});await b.close();})();
