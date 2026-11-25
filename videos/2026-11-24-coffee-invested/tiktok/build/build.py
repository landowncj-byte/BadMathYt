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
# SHOW layer (digits): script.json text -> display form
def fix(i):
    t=toks[i]; w=t['w']
    if w=='$21' and toks[i+1]['w']=='.90': return '$2,190'
    return w
out=[];skip=set()
for i,t in enumerate(toks):
    if t['w'].startswith('.90') and toks[i-1]['w']=='$21': toks[i-1]['w']='$2,190'+re.sub(r'^\.90','',t['w']); toks[i-1]['e']=t['e']; skip.add(i)
toks=[t for i,t in enumerate(toks) if i not in skip]
for t in toks:
    if t['w']=='$30,000.': t['w']='$30K'
    if t['w']=='$437,000.': t['w']='$437K'
    if t['w']=='$87,600.': t['w']='$87,600.'
    if t['w'].startswith('$400,000'): t['w']='$400,000?'.replace('?','')  # voice says it inside a question
KEEP=('COMMENTS.',)
def clean(t): return re.sub(r'[.,?!]+$','',t) if not t.endswith('?') else t
def color(t):
    c=re.sub(r'[^a-z0-9$,%]','',t['w'].lower())
    if any(ch.isdigit() or ch=='$' for ch in c): return 'g'
    if c in ('math','invested','assumed','follow','worth','coffee','comments','costs'): return 'y'
    return 'p'
caps=[];i=0;n=len(toks)
while i<n:
    g=[i]
    while len(g)<3 and g[-1]+1<n:
        j=g[-1]; nx=toks[j+1]
        if re.search(r'[.,?!:]$',toks[j]['w']): break
        if nx['s']-toks[j]['e']>.3: break
        if sum(len(toks[k]['w']) for k in g)+len(nx['w'])>17 and len(g)>=2: break
        g.append(j+1)
    caps.append([toks[g[0]]['s'],[[clean(toks[k]['w']).upper(),color(toks[k])] for k in g],toks[g[-1]]['e']]); i=g[-1]+1
out=[]
for k,c in enumerate(caps):
    s=c[0]; nxt=caps[k+1][0] if k+1<len(caps) else 99
    e=min(nxt,c[2]+.5)
    out.append([round(s,2),round(e,2),c[1]])
out[0][0]=0
json.dump(out,open('caps.json','w'))
for o in out: print(o[0],o[1],' '.join(w+'/'+c for w,c in o[2]))
# SRT from script text (SHOW form), grouped into <=5-word cues
def ts(x):
    h=int(x//3600);m=int(x%3600//60);s=x%60; return f"{h:02d}:{m:02d}:{int(s):02d},{int(round((s-int(s))*1000)):03d}"
cues=[];i=0
while i<n:
    g=[i]
    while len(g)<5 and g[-1]+1<n and not re.search(r'[.,?!:]$',toks[g[-1]]['w']): g.append(g[-1]+1)
    cues.append((toks[g[0]]['s'],toks[g[-1]]['e']+.15,' '.join(re.sub(r'[,]$','',toks[k]['w']) for k in g))); i=g[-1]+1
with open('../captions.srt','w') as f:
    for k,(s,e,tx) in enumerate(cues):
        e=min(e,cues[k+1][0]-.02) if k+1<len(cues) else e
        f.write(f"{k+1}\n{ts(s)} --> {ts(e)}\n{tx}\n\n")
head='<!doctype html>\n<html><head><meta charset="utf-8"><title>What If: Coffee Invested (TikTok)</title>\n<style>html,body{margin:0;background:#0B0F14;overflow:hidden}canvas{display:block}</style></head>\n<body><canvas id="c" width="1080" height="1920"></canvas>\n<script src="../../../../brand/storyteller.js"></script>\n<script>\n'
src=head+open('helpers.js').read()+open('assets.js').read()+open('cut.js').read()+'</script></body></html>\n'
src=src.replace('/*MOUTH*/[]',json.dumps([round(m,3) for m in mouth])).replace('/*CAPS*/[]',json.dumps(out))
open('scene.html','w').write(src)
