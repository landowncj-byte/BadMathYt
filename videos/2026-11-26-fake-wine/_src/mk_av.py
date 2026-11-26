import json,sys
cut,name=sys.argv[1],sys.argv[2]
s=json.load(open(cut+'/voice/sentences.json'))
V=[("Rudy","COLD OPEN: ICE photo card stamped FRAUD + kitchen exhibit photo; hook text","1 COLD OPEN face"),
("his name","CASE-FILE card: photo, RUDY KURNIAWAN, THE COLLECTOR, CASE FILE Nº 027, red ring on face, red string, CALIFORNIA date slate","2 INTRO CASE FILE"),
("auction","auction card: bid paddles, rising bars, bottle; THE COLLECTORS victim card","-"),
("35","gavel + cellar counter ≈$35M","-"),
("1,000","$1,000 a day calendar to 95 YEARS","-"),
("world record","his photo + WORLD RECORD stamp (side card)","3 PITCH / record card"),
("1945","catalogue lot: huge 1945 dated label, WITHDRAWN stamp; winemaker victim card","PiP HIS LABELS"),
("1982","BIG literal: label 1945 vs FIRST MADE: 1982 timeline, 37 YEARS bracket","PiP HIS LABELS"),
("2012","mono height-chart photo, ARRESTED stamp, THE CATCH slate","5 CATCH"),
("kitchen","kitchen exhibit photo above WINE FACTORY bench; 3 steps light up (mix/rebottle/label)","-"),
("2.1","cheque $2.1M + billionaire victim card","-"),
("evidence","EVIDENCE BOARD: his photo pinned, kitchen, bottle, labels, cheque, 2013, strings pull tight","4 EVIDENCE BOARD"),
("convicted","VERDICT: mono photo + CONVICTED stamp, bars slide, CONVICTED / 10 YEARS / $28.4M","6 VERDICT"),
("last line","comment bubble, whip back to frame-0 composition (face + kitchen)","loop face")]
o="# AV.md — fake-wine · %s (CRIME-SHOW pass, RULES 112)\nCon: **Rudy Kurniawan, \"THE COLLECTOR\"** (real ICE photo brand/photos/rudy-kurniawan/2.jpg, kitchen exhibit 3.jpg, both public domain). Victims: THE COLLECTORS, THE WINEMAKER, THE BILLIONAIRE cards.\n\n| Time | Script line | Visual (see scene.js beats) |\n|---|---|---|\n"%name
for x in s: o+="| %.2f | %s | per beat table in `bm2.cjs check` (focus id changes every ~1.5-2.5 s, trigger = @word of line) |\n"%(x['start'],x['text'])
o+="\n## Visual key (what each stretch shows, trigger word)\n| Trigger | Exact visual | Suspect treatment |\n|---|---|---|\n"
for a,b,c in V:o+="| @%s | %s | %s |\n"%(a,b,c)
open(cut+'/build/AV.md','w').write(o)
