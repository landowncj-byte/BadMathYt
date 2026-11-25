import json,sys
def snap(voice):
    w=json.load(open(voice+'words.json')); m=json.load(open(voice+'mouth.json'))
    f=lambda t: m[min(len(m)-1,int(t*30))]
    out=[]
    for x in w:
        s,e=x['s'],x['e']; i=int(s*30)
        while i/30<e-.05 and m[min(i,len(m)-1)]<.12: i+=1
        s2=i/30
        j=int(e*30)
        while j/30>s2+.05 and m[min(j,len(m)-1)]<.08: j-=1
        out.append(dict(w=x['w'].strip(),s=round(s2,2),e=round(max(s2+.05,j/30),2)))
    return out
if __name__=='__main__':
    o=snap(sys.argv[1]); json.dump(o,open(sys.argv[1]+'words_snap.json','w'))
    print(' '.join(f"{i}:{x['w']}[{x['s']:.2f}-{x['e']:.2f}]" for i,x in enumerate(o)))
