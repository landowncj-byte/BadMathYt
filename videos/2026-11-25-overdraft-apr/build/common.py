import json,re
def load(V):
    words=json.load(open(V+'words.json')); sents=json.load(open(V+'sentences.json')); mouth=json.load(open(V+'mouth.json'))
    toks=[]
    for w in words:
        t=w['w'].strip(); s,e=w['s'],w['e']
        if t.startswith(',') and toks and re.search(r'\d$',toks[-1]['w']): toks[-1]['w']+=t; toks[-1]['e']=e; continue
        if t.startswith('.') and toks and re.search(r'\$\d$',toks[-1]['w']): toks[-1]['w']+=t; toks[-1]['e']=e; continue
        if t.startswith('%') and toks: toks[-1]['w']+=t; toks[-1]['e']=e; continue
        if t in ('PR,','PR.') and toks and toks[-1]['w']=='of': toks[-1]['w']='APR'+t[2:]; toks[-1]['e']=e; continue
        if t in ('PR,','PR.') and toks and toks[-1]['w']=='a': toks[-1]['w']='APR'+t[2:]; toks[-1]['e']=e; continue
        toks.append(dict(w=t,s=s,e=e))
    return toks,sents,mouth
if __name__=='__main__':
    import sys
    toks,_,_=load(sys.argv[1])
    print(' '.join('%d:%s[%.2f]'%(i,t['w'],t['s']) for i,t in enumerate(toks)))
