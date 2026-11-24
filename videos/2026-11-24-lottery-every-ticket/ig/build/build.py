import json,re,os,sys
CUT=os.path.basename(os.path.dirname(os.path.abspath(__file__)).rstrip('/')) if False else os.path.basename(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
V='../voice/'
words=json.load(open(V+'words.json')); mouth=json.load(open(V+'mouth.json')); script=json.load(open(V+'script.json'))
# ---- Whisper fixes against script.json ----
tok=[dict(w=w['w'].strip(),s=w['s'],e=w['e']) for w in words]
if CUT=='tiktok':
    NUM={'eight,':'8','11,':'11','13,':'13','15,':'15','19,':'19','20.':'20'}
    tok[5-0]  # sanity
    for t in tok:
        if t['w']=='These': t['s']=3.17; t['e']=3.45
        if t['w']=='guys' and t['s']<3.4: t['s']=3.45
        if t['w']=='Virginia': t['s']=4.93; t['e']=5.38
        if t['w']=='1992,': t['s']=5.38
        if t['w'] in NUM: t['w']=NUM[t['w']]+('.' if t['w']=='20.' else ',')
    MAXW=4; BALLS={'8,','11,','13,','15,','19,','20.'}
    SENT=[11,5,2,6,3,8,12,3,1,1,1,1,1,1,3,2,3,4,6,5]
    KEY_G={'1992','7','million','dollar','jackpot','27','292','tickets','half','five','combinations','powerball'}
    KEY_Y={'math','every','single','tax','one','follow','yes','no','comments','tried','draw'}
    KEY_R={"can't",'ran','out','time','tax'}
    capy=1345
else:
    for t in tok:
        if t['w']=='ass': t['w']='A**'
    # Whisper dropped "dollars" (script: twenty-seven million dollars)
    i=[k for k,t in enumerate(tok) if t['w']=='million.' and 14<t['s']<16][0]
    tok.insert(i+1,dict(w='dollars.',s=15.52,e=15.80)); tok[i]['w']='million'
    MAXW=3; BALLS=set()
    SENT=[4,7,6,17,5,11,8]
    KEY_G={'1992','292','million','$27','dollars','five','half','tickets','fund'}
    KEY_Y={'powerball','odds','one','screw','birthday','send','save','week','math'}
    KEY_R={'a**','robbed','screw'}
    capy=1195
assert sum(SENT)==len(tok),(sum(SENT),len(tok))
def clean(t): return re.sub(r'[.,?!:]+$','',t)
def color(w):
    c=clean(w).lower()
    if c in KEY_R: return 'r'
    if c in KEY_G or any(ch.isdigit() for ch in c): return 'g'
    if c in KEY_Y: return 'y'
    return 'p'
caps=[];i=0;n=len(tok);ball=[]
while i<n:
    t=tok[i]
    if t['w'] in BALLS:
        ball.append(clean(t['w'])); caps.append([t['s'],0,[[x,'g'] for x in ' · '.join(ball).split(' ')],t['e']]); i+=1; continue
    g=[i]
    while len(g)<MAXW and g[-1]+1<n:
        j=g[-1]; nx=tok[j+1]
        if re.search(r'[.,?!:]$',tok[j]['w']): break
        if nx['w'] in BALLS: break
        if nx['s']-tok[j]['e']>.3: break
        if sum(len(tok[k]['w']) for k in g)+len(nx['w'])>(19 if CUT=='tiktok' else 17) and len(g)>=2: break
        g.append(j+1)
    caps.append([tok[g[0]]['s'],0,[[clean(tok[k]['w']).upper(),color(tok[k]['w'])] for k in g],tok[g[-1]]['e']]); i=g[-1]+1
out=[]
for k,c in enumerate(caps):
    s=c[0]; nxt=caps[k+1][0] if k+1<len(caps) else 99
    e=min(nxt,c[3]+.5)
    if e-s<.3: e=min(nxt,s+.4)
    out.append([round(s,2),round(e,2),c[2]])
out[0][0]=0
json.dump(out,open('caps.json','w'))
# ---- SRT: one cue per script sentence, Whisper times ----
def ts(x):
    h=int(x//3600);m=int(x%3600//60);s=x%60;return f"{h:02d}:{m:02d}:{int(s):02d},{int(round((s-int(s))*1000)):03d}"
def spoken(w):  # script-accurate text for the srt
    return w
sents=[]
for line,_ in script:
    for s in re.findall(r'[^.?!]+[.?!]+',line): sents.append(s.strip())
if CUT=='tiktok': sents=[s for s in sents]
# script sentences vs SENT groups: tiktok script has draw numbers as separate sentences already
if len(sents)!=len(SENT):
    # merge "Then the draw." + numbers handled: report
    print('SRT sentence/SENT mismatch',len(sents),len(SENT))
k=0;cues=[]
for s,cnt in zip(sents,SENT):
    toks=tok[k:k+cnt];k+=cnt
    st,en=toks[0]['s'],toks[-1]['e']
    if cnt>9: # split long sentence in two cues at a comma/midpoint
        wl=s.split(); h=len(wl)//2; cues.append((st,toks[len(toks)//2-1]['e'],' '.join(wl[:h]))); cues.append((toks[len(toks)//2]['s'],en,' '.join(wl[h:])))
    else: cues.append((st,en,s))
with open('../captions.srt','w') as f:
    for i,(a,b,s) in enumerate(cues,1): f.write(f"{i}\n{ts(a)} --> {ts(b)}\n{s}\n\n")
# ---- assemble scene.html ----
head='''<!doctype html>
<html><head><meta charset="utf-8"><title>Lottery %s cut</title>
<style>html,body{margin:0;background:#0B0F14;overflow:hidden}canvas{display:block}</style></head>
<body><canvas id="c" width="1080" height="1920"></canvas>
<script src="../../../../brand/storyteller.js"></script>
<script>
const W = 1080, H = 1920;
const MOUTH = /*MOUTH*/[];
const CAPS = /*CAPS*/[];
'''%CUT
tail='''
const FONTS = [['Anton', 'node_modules/@fontsource/anton/files/anton-latin-400-normal.woff2', '400'], ['Inter', 'node_modules/@fontsource/inter/files/inter-latin-800-normal.woff2', '800'],
  ['JBM', 'node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-800-normal.woff2', '800'], ['JBM', 'node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff2', '700'],
  ['Special Elite', 'node_modules/@fontsource/special-elite/files/special-elite-latin-400-normal.woff2', '400']];
window.ready = Promise.all(FONTS.map(([f, u, w]) => new FontFace(f, `url(${u})`, { weight: w }).load().then(ff => document.fonts.add(ff)))).then(() => { window.render(0); return true; });
</script></body></html>'''
src=head+open('lib.js').read()+'\n'+open('parts.js').read()+'\n'+open('cut.js').read()+tail
open('scene.src.html','w').write(src)
open('scene.html','w').write(src.replace('/*MOUTH*/[]',json.dumps([round(m,3) for m in mouth])).replace('/*CAPS*/[]',json.dumps(out)))
for o in out: print(o[0],o[1],' '.join(w+'/'+c for w,c in o[2]))
