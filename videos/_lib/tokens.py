#!/usr/bin/env python3
# usage: tokens.py <voice-dir>   prints per-sentence token index table (words.json as Whisper heard them) for SW(i,k) refs
import json,sys
d=sys.argv[1]; s=json.load(open(d+'/sentences.json')); w=json.load(open(d+'/words.json')); w=w['words'] if isinstance(w,dict) else w
for i,x in enumerate(s):
    nxt=s[i+1]['start']-0.05 if i+1<len(s) else 1e9
    t=[(j,u['w'],round(u['s'],2)) for j,u in enumerate([u for u in w if u['s']>=x['start']-0.02 and u['s']<max(x['end']-0.005,nxt)])]
    print('S%d [%.2f-%.2f] '%(i,x['start'],x['end'])+'  '.join('%d:%s@%.1f'%(a,b,c) for a,b,c in t))
