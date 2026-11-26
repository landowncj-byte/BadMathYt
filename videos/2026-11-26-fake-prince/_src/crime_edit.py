# helper for turning an existing cut .js into its crime-show .crime.js (RULES 112)
import re,sys
class Cut:
    def __init__(s,src): s.t=open(src).read()
    def line_of(s,eid):
        for m in re.finditer(r"^( *)\{ id: '%s',.*$"%re.escape(eid), s.t, re.M): return m
        raise Exception('no element '+eid)
    def repl(s,eid,new):
        m=s.line_of(eid); s.t=s.t[:m.start()]+new+s.t[m.end():]
    def delete(s,eid):
        m=s.line_of(eid); s.t=s.t[:m.start()]+s.t[m.end()+1:]
    def after(s,eid,new):
        m=s.line_of(eid); s.t=s.t[:m.end()]+'\n'+new+s.t[m.end():]
    def r(s,a,b,must=True):
        if must: assert a in s.t, a
        s.t=s.t.replace(a,b)
    def save(s,dst): open(dst,'w').write(s.t)
SUS="src: MUG, crop: [0.5, 0, 0.5, 1], fx: 0.5, fy: 0.42, aspect: 1.0"
NICK="nick: '“THE FAKE PRINCE”'"
NAME="name: 'ANTHONY GIGNAC'"
def stepfix(c):
    for sid,txt in (('stepA',"[[['STEP 1 · THE PLATES', 'gold']], [['FOREIGN OFFICIALS GET THESE', 'paper']]], size: 46"),('stepB',"[[['STEP 2 · THE BADGES', 'gold']], [['LIKE REAL GOVERNMENT AGENTS', 'paper']]], size: 46")):
        m=c.line_of(sid); l=m.group(0); c.repl(sid, re.sub(r"lines: .*?size: \d+","lines: "+txt,l))
def hudlabels(c,labels):
    m=re.search(r"labels: \[.*?\],\n",c.t,re.S); assert m
    c.t=c.t[:m.start()]+"labels: ["+", ".join("{ at: %s, text: '%s' }"%(a,b) for a,b in labels)+"],\n"+c.t[m.end():]
def board(c,eid,at,beg,n11at,stampat,tight,rows):
    pass
def tail_beats(c,pairs):
    a=c.t.index("  beats: [")
    head,b=c.t[:a],c.t[a:]
    for o,n in pairs:
        assert o in b,o
        b=b.replace(o,n)
    c.t=head+b
def add_sfx(c, items):
    s=", ".join("{ at: %s, name: '%s', gain: %s, dur: %s }"%(a,n,g,d) for a,n,g,d in items)
    assert "  sfx: [\n" in c.t
    c.t=c.t.replace("  sfx: [\n","  sfx: [\n    "+s+",\n",1)
def storyright(c, ids):
    a=c.t.index("  beats: ["); head,b=c.t[:a],c.t[a:]; out=[]
    for ln in b.split('\n'):
        if 'focus:' in ln and any(("'%s'"%i in ln.split('focus:')[1].split('sy')[0].split('fill')[0].split('move')[0]) or ("'%s."%i in ln.split('focus:')[1].split(',')[0]) for i in ids):
            ln=ln.replace("st: 'corner-left'","st: 'corner'").replace("st: 'left'","st: 'corner'")
        out.append(ln)
    c.t=head+'\n'.join(out)
import re as _re
def fixfocus(c):
    a=c.t.index("  beats: ["); head,b=c.t[:a],c.t[a:]; out=[]
    for ln in b.split('\n'):
        m=_re.search(r"focus: '(sus3|suspc|mug2|mug)(\.face|\.quote)?'",ln)
        if m and 'beat:' in ln:
            X=m.group(1); wide=X in('sus3','suspc')
            ln=_re.sub(r"focus: '[a-z0-9]+(\.face|\.quote)?'","focus: '%s'"%X,ln,1)
            fill,maxh,sy=(0.86,780,880) if wide else (0.62,680,960)
            ln=_re.sub(r"fill: [0-9.]+","fill: %s"%fill,ln); ln=_re.sub(r"maxH: \d+","maxH: %d"%maxh,ln)
            ln=_re.sub(r"sy: \d+","sy: %d"%sy,ln)
            if 'fill:' not in ln: ln=ln.replace("focus: '%s'"%X,"focus: '%s', fill: %s, maxH: %d"%(X,fill,maxh))
            if 'sy:' not in ln: ln=ln.replace("focus: '%s'"%X,"focus: '%s', sy: %d"%(X,sy))
        out.append(ln)
    c.t=head+'\n'.join(out)
