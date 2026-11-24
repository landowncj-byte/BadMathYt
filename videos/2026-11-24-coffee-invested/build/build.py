import json,re
V='../voice/'
words=json.load(open(V+'words.json')); mouth=json.load(open(V+'mouth.json'))
toks=[]
for w in words:
    t=w['w'].strip()
    if t.startswith(',') and toks and re.search(r'\d$',toks[-1]['w']):
        toks[-1]['w']+=t; toks[-1]['e']=w['e']; continue
    if t=='%' and toks: toks[-1]['w']+='%'; toks[-1]['e']=w['e']; continue
    toks.append(dict(w=t,s=w['s'],e=w['e']))
# script.json fixes: $90,000 / $207,000 / $437,000 ; closing line
for t in toks:
    if re.match(r'^\d{2,3},000[.,]?$',t['w']): t['w']='$'+t['w']
    if t['w']=='latte.': t['w']='LATTE?'
    if t['w']=='coffee,': t['w']='COFFEE.'
KEEP=('LATTE?','COFFEE.')
def clean(t): return t if t in KEEP else re.sub(r'[.,?!]+$','',t)
Y={'math','invested','assumption,','promise.','like','send','follow','insane.','latte','LATTE?'}
def color(i,t):
    c=re.sub(r'[^a-z0-9$,%]','',t['w'].lower())
    if any(ch.isdigit() or ch=='$' for ch in c): return 'g'
    if c=='idiot': return 'r'
    if c in ('math','invested','assumption','promise','like','send','follow','insane','latte','latte?','coffee.'): return 'y'
    return 'p'
caps=[];i=0;n=len(toks)
while i<n:
    g=[i]
    while len(g)<4 and g[-1]+1<n:
        j=g[-1]; nx=toks[j+1]
        if re.search(r'[.,?!]$',toks[j]['w']): break
        if nx['s']-toks[j]['e']>.3: break
        if toks[j+1]['s']<39.5 and sum(len(toks[k]['w']) for k in g)+len(nx['w'])>19 and len(g)>=2: break
        g.append(j+1)
    caps.append([toks[g[0]]['s'],[[clean(toks[k]['w']).upper(),color(k,toks[k])] for k in g],toks[g[-1]]['e']]); i=g[-1]+1
out=[]
for k,c in enumerate(caps):
    s=c[0]; nxt=caps[k+1][0] if k+1<len(caps) else 41.6
    e=min(nxt,c[2]+.55)
    out.append([round(s,2),round(e,2),c[1]])
out[0][0]=0
json.dump(out,open('caps.json','w'))
for o in out: print(o[0],o[1],' '.join(w+'/'+c for w,c in o[2]))
head='<!doctype html>\n<html><head><meta charset="utf-8"><title>What If: Coffee Invested</title>\n<style>html,body{margin:0;background:#0B0F14;overflow:hidden}canvas{display:block}</style></head>\n<body><canvas id="c" width="1080" height="1920"></canvas>\n<script src="../../../brand/storyteller.js"></script>\n<script>\n'
src=head+open('helpers.js').read()+open('body.js').read()+'</script></body></html>\n'
src=src.replace('/*MOUTH*/[]',json.dumps([round(m,3) for m in mouth])).replace('/*CAPS*/[]',json.dumps(out))
open('scene.html','w').write(src)
