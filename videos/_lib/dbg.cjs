const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();p.on('console',m=>{if(/CS:/.test(m.text()))console.log(m.text())});await p.goto('file://'+require('path').resolve(process.argv[2])+'/scene.html');await p.evaluate(()=>window.ready).catch(()=>{});console.log(await p.evaluate(()=>window.CS_DEBUG));await b.close();})();
