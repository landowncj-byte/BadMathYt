import json,re,sys
sys.path.insert(0,'/home/user/badmathyt/videos/2026-11-25-overdraft-apr/build')
from common import load
def build(cut, V, out_html, libs, cuts, fixes, tail, disp, colors, chunk, dur, srt, depth):
    toks,sents,mouth=load(V)
    # piecewise remaps from silencedetect (a,b,new_s,new_e) over token index ranges
    for a,b,ns,ne in fixes:
        g=toks[a:b+1]; s0,e0=g[0]['s'],g[-1]['e']
        for t in g: t['s']=ns+(t['s']-s0)/(e0-s0)*(ne-ns); t['e']=ns+(t['e']-s0)/(e0-s0)*(ne-ns)
    if tail:
        i0,items=tail; toks=toks[:i0]+[dict(w=w,s=s,e=e) for w,s,e in items]
    for i,t in enumerate(toks):
        if i in disp: t['w']=disp[i]
    toks=[t for t in toks if t['w']!='']
    def clean(w): return w if w.endswith('?') else re.sub(r'[.,]+$','',w)
    def color(w):
        c=re.sub(r'[^A-Za-z0-9$%¢,.]','',w.lower())
        for k,v in colors.items():
            if re.fullmatch(k,c): return v
        return 'p'
    caps=[];i=0;n=len(toks)
    while i<n:
        g=[i]
        while len(g)<chunk['max'] and g[-1]+1<n:
            j=g[-1]; nx=toks[j+1]
            if re.search(r'[.,?!:]$',toks[j]['w']): break
            if nx['s']-toks[j]['e']>.3: break
            if sum(len(toks[k]['w']) for k in g)+len(nx['w'])>chunk['chars'] and len(g)>=2: break
            g.append(j+1)
        caps.append([toks[g[0]]['s'],[[clean(toks[k]['w']).upper(),color(toks[k]['w'])] for k in g],toks[g[-1]]['e']]); i=g[-1]+1
    out=[]
    for k,c in enumerate(caps):
        s=c[0]; nxt=caps[k+1][0] if k+1<len(caps) else dur
        e=min(nxt,c[2]+.5); out.append([round(s,2),round(e,2),c[1]])
    out[0][0]=0
    for o in out: print(o[0],o[1],' '.join(w+'/'+c for w,c in o[2]))
    # SRT (from the same SHOW text)
    def ts(x):
        h=int(x//3600);m=int(x%3600//60);s=x%60; return f"{h:02d}:{m:02d}:{int(s):02d},{int(round((s-int(s))*1000)):03d}"
    cues=[];i=0
    while i<n:
        g=[i]
        while len(g)<6 and g[-1]+1<n and not re.search(r'[.,?!:]$',toks[g[-1]]['w']) and toks[g[-1]+1]['s']-toks[g[-1]]['e']<.5: g.append(g[-1]+1)
        cues.append((toks[g[0]]['s'],toks[g[-1]]['e']+.15,' '.join(re.sub(r'[,]$','',toks[k]['w']) for k in g))); i=g[-1]+1
    with open(srt,'w') as f:
        for k,(s,e,tx) in enumerate(cues):
            e=min(e,cues[k+1][0]-.02) if k+1<len(cues) else min(e,dur); f.write(f"{k+1}\n{ts(s)} --> {ts(e)}\n{tx}\n\n")
    head='<!doctype html>\n<html><head><meta charset="utf-8"><title>What If: Overdraft APR ('+cut+')</title>\n<style>html,body{margin:0;background:#0B0F14;overflow:hidden}canvas{display:block}</style></head>\n<body><canvas id="c" width="1080" height="1920"></canvas>\n<script src="'+depth+'brand/storyteller.js"></script>\n<script>\n'
    pre='const MOUTH = '+json.dumps([round(m,3) for m in mouth])+';\nconst CAPS = '+json.dumps(out)+';\n'
    src=head+pre+''.join(open(l).read()+'\n' for l in libs)+'</script></body></html>\n'
    open(out_html,'w').write(src); json.dump(out,open(out_html.replace('scene.html','caps.json'),'w'))
