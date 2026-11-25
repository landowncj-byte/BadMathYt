import json,re,os
def make(chunks,dur,title,voice='../voice/',shared='../shared/',brand='../../../brand/storyteller.js',tail=.5,first0=True):
    words=json.load(open(voice+'words.json')); mouth=json.load(open(voice+'mouth.json'))
    out=[]
    for k,(i0,i1,spec) in enumerate(chunks):
        parts=[]
        for tok in spec.split(' '):
            m=re.match(r'^([rygp]):(.*)$',tok)
            parts.append([m.group(2),m.group(1)] if m else [tok,'p'])
        s=words[i0]['s']; e=words[i1]['e']
        nxt=words[chunks[k+1][0]]['s'] if k+1<len(chunks) else dur
        out.append([round(s,2),round(min(nxt,e+tail),2),parts])
    if first0: out[0][0]=0
    json.dump(out,open('caps.json','w'))
    for o in out: print(o[0],o[1],' '.join(w+'/'+c for w,c in o[2]))
    head='<!doctype html>\n<html><head><meta charset="utf-8"><title>%s</title>\n<style>html,body{margin:0;background:#0B0F14;overflow:hidden}canvas{display:block}</style></head>\n<body><canvas id="c" width="1080" height="1920"></canvas>\n<script src="%s"></script>\n<script>\n'%(title,brand)
    src=head+open('helpers.js').read().replace('/*DUR*/0',str(dur))+open(shared+'coinbill.js').read()+open(shared+'parlay.js').read()+open('body.js').read()+open(shared+'engine.js').read()+'</script></body></html>\n'
    src=src.replace('/*MOUTH*/[]',json.dumps([round(m,3) for m in mouth])).replace('/*CAPS*/[]',json.dumps(out))
    open('scene.html','w').write(src)
def srt(cues,path):
    def f(t):
        ms=int(round(t*1000)); return '%02d:%02d:%02d,%03d'%(ms//3600000,ms//60000%60,ms//1000%60,ms%1000)
    with open(path,'w') as fh:
        for i,(s,e,t) in enumerate(cues,1): fh.write('%d\n%s --> %s\n%s\n\n'%(i,f(s),f(e),t))
