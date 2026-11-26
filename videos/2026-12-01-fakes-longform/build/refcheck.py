import json,re,glob,sys
T=json.load(open('../align/engine_voice.json'))
from collections import defaultdict
W=defaultdict(list)
for w in T['words']: W[w['p']].append(w['w'])
def norm(w): return re.sub(r"^[.,!?;:\"“”()\-–]+|[.,!?;:\"“”()\-–]+$","",w.lower())
bad=0; seen=set()
for f in sorted(glob.glob('src/1*.js')+glob.glob('src/99*.js')):
    for ln,line in enumerate(open(f).read().split('\n'),1):
        for m in re.finditer(r"@(P\d+)(?::([^\s'\"\\>+\]\),}]+(?:'[a-z]+)?))?",line):
            pid,tok=m.group(1),m.group(2)
            if not tok: continue
            n=1
            tok=re.sub(r"[+-]\d+(\.\d+)?$","",tok)
            mm=re.match(r"(.*)#(\d+)$",tok)
            if mm: tok,n=mm.group(1),int(mm.group(2))
            if tok.startswith('#'): continue
            nw=[norm(w) for w in W[pid]]
            if nw.count(norm(tok))<n:
                bad+=1; seen.add((pid,tok,n))
print(bad,'bad refs')

for pid,tok,n in sorted(seen): print(f'{pid}:{tok}#{n}  ->  '+' '.join(W[pid]))
