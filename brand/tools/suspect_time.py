# usage: suspect_time.py <cut-build-dir> <duration> [suspect ids...]  -> % of runtime a suspect card is the camera focus (+ PiP windows from scene.js)
import sys,re,subprocess,json
b=sys.argv[1]; dur=float(sys.argv[2]); ids=sys.argv[3:] or ['sus0','mug','mug0','mug2','mug3','sus3','suspc','sv','cos','sus17','sus15','susd','board']
out=subprocess.run(['node','brand/engine-v2/bm2.cjs','check',b],capture_output=True,text=True).stdout
bt=[]
for ln in out.split('\n'):
    m=re.match(r'\s+([\d.]+)\s+\S+\s+(.+?)\s{2}\S+\s+\S+\s*$',ln)
    if m: bt.append((float(m.group(1)),m.group(2)))
iv=[]
for i,(t,f) in enumerate(bt):
    e=bt[i+1][0] if i+1<len(bt) else dur
    foc=re.findall(r'"([a-z0-9]+)(?:\.[a-z0-9]+)?"',f)
    if any(x in ids for x in foc): iv.append((t,e))
# PiP windows: read resolved element times is not exposed; approximate from sfx? -> caller adds manually
tot=sum(e-s for s,e in iv); print('focus intervals:',[(round(s,1),round(e,1)) for s,e in iv]); print('suspect-focus total %.1fs = %.0f%% of %.1fs'%(tot,100*tot/dur,dur))
