import json,re
V='../voice/'
words=json.load(open(V+'words.json')); mouth=json.load(open(V+'mouth.json'))
# merge "59" + ",000"
toks=[]
for w in words:
    t=w['w'].strip()
    if t.startswith(',') and toks and re.search(r'\d$',toks[-1]['w']):
        toks[-1]['w']+=t; toks[-1]['e']=w['e']; continue
    toks.append(dict(w=t,s=w['s'],e=w['e']))
def clean(t): return re.sub(r'[.,?!]+$','',t) if re.search(r'\d$|\d[.,]$',t) is None else re.sub(r'[.,?!]+$','',t)
GRN={'five','seven','million','dollar','jackpot','nine'}
def color(i,t):
    c=re.sub(r'[^a-z0-9$,]','',t['w'].lower()); nxt=re.sub(r'[^a-z]','',toks[i+1]['w'].lower()) if i+1<len(toks) else ''; prv=re.sub(r'[^a-z]','',toks[i-1]['w'].lower()) if i else ''
    if any(ch.isdigit() or ch=='$' for ch in c): return 'g'
    if c in ('idiot',): return 'r'
    if c in ('never',) or (c=='bought' and prv=='never'): return 'r'
    if c in ('ran',) or (c=='out' and prv=='ran'): return 'r'
    if c in GRN or (c=='one' and nxt=='dollar'): return 'g'
    if c in ('half','a') and 24<t['s']<25: return 'g' if c=='half' else 'p'
    if c=='one' and 23.9<t['s']<24.2: return 'g'
    if c in ('every','single','math','australia','like','send','follow','birthday','yes','powerball','years','time','combinations','fund') or (c=='one' and prv=='single'): return 'y'
    return 'p'
BALLS=['8,','11,','13,','15,','19,','20.']
caps=[];i=0;n=len(toks);ball=[]
while i<n:
    t=toks[i]
    if t['w'] in BALLS and 32<t['s']<36:
        ball.append(clean(t['w'])); caps.append([t['s'],0,[[x,'g'] for x in ' · '.join(ball).split(' ')]]); i+=1; continue
    g=[i]
    while len(g)<4 and g[-1]+1<n:
        j=g[-1]; nx=toks[j+1]
        if re.search(r'[.,?!]$',toks[j]['w']): break
        if nx['w'] in BALLS and 32<nx['s']<36: break
        if nx['s']-toks[j]['e']>.3: break
        if sum(len(toks[k]['w']) for k in g)+len(nx['w'])>19 and len(g)>=2: break
        g.append(j+1)
    caps.append([toks[g[0]]['s'],0,[[clean(toks[k]['w']).upper() if True else '',color(k,toks[k])] for k in g],toks[g[-1]]['e']]); i=g[-1]+1
out=[]
for k,c in enumerate(caps):
    s=c[0]; nxt=caps[k+1][0] if k+1<len(caps) else 50.1
    e=min(nxt, (c[3]+.55) if len(c)>3 else nxt)
    if len(c)==3: e=nxt if k+1<len(caps) and nxt-s<.8 else min(nxt,s+1.0) if k+1<len(caps) else s+.9
    out.append([round(s,2),round(e,2),c[2]])
if True: out[0][0]=0
json.dump(out,open('caps.json','w'))
for o in out: print(o[0],o[1],' '.join(w+'/'+c for w,c in o[2]))
src=open('scene.src.html').read().replace('/*MOUTH*/[]',json.dumps([round(m,3) for m in mouth])).replace('/*CAPS*/[]',json.dumps(out))
open('scene.html','w').write(src)
