#!/usr/bin/env python3
import re
def convert(src, SWmap, Smap, Emap, out, extra=[], drop=[]):
    s = open(src).read()
    def sw(m):
        fn, i, k = m.group(1), int(m.group(2)), int(m.group(3)); key = (i, k)
        if key not in SWmap: raise KeyError('SW %s' % (key,))
        v = SWmap[key]; return v if isinstance(v, str) else '%s(%d,%d)' % (fn, v[0], v[1])
    s = re.sub(r"\b(S[WE])\((\d+), *(-?\d+)\)", sw, s)
    s = re.sub(r"(?<![A-Za-z_])S\((\d+)\)", lambda m: Smap[int(m.group(1))] if isinstance(Smap[int(m.group(1))], str) else 'S(%d)' % Smap[int(m.group(1))], s)
    s = re.sub(r"(?<![A-Za-z_])E\((\d+)\)", lambda m: 'E(%d)' % Emap[int(m.group(1))], s)
    for a, b in extra:
        if a not in s: print('WARN extra not found:', a[:70])
        s = s.replace(a, b)
    lines = s.split('\n'); keep = []
    for ln in lines:
        if any(re.search(d, ln) for d in drop): continue
        keep.append(ln)
    open(out, 'w').write('\n'.join(keep))


# ---------- TT ----------
tt_sw = {(0,12):(0,11),(0,9):(0,8),(2,5):(4,4),(3,5):(5,5),(3,10):(5,10),(4,3):(6,4),(4,7):(6,8),(4,12):(6,9),(6,1):(7,1),(8,2):(10,3),(9,6):(10,9),(10,6):(11,7),(10,8):(11,11),(11,3):(12,1),(12,8):(14,5),(13,1):(13,1),(14,2):(1,7),(14,6):(2,6),(15,6):(15,9),
 (16,0):(14,1),(16,1):(14,4),(16,2):(14,5),(16,3):(14,10),(16,4):(14,14),(17,4):(17,5),(17,5):(17,6),(18,0):(16,0),(19,2):(18,3),(19,5):(18,5),(20,0):(19,0),(20,5):(19,5),(21,4):(20,4),(22,5):(21,7),(23,4):(22,3),(23,5):(22,5),(23,6):(22,6),(24,0):(22,9),(24,8):(22,12)}
tt_S = {6:7,1:'SW(4,0)',2:'SW(4,3)',3:5,4:'SW(6,3)',5:8,7:9,8:'SW(10,2)',9:'SW(10,6)',10:11,11:12,12:14,13:13,14:1,15:15,16:'SW(14,10)',17:17,18:16,19:18,20:19,21:20,22:21,23:'SW(21,9)',24:'SW(22,9)'}
convert('yt.js', tt_sw, tt_S, {23:21,24:22}, 'tt.js', [
 ("const HK = [[['£14 MILLION', 'paper']], [['THEIR OWN CARS RATTED THEM OUT', 'bad']]];", "const HK = [[['THEY DRILLED A VAULT', 'paper']], [['THEN SNITCHED IN THE CAR', 'bad']]];"),
 ("sizes: [92, 46]", "sizes: [62, 60]"),
 ("[['LED BY A MAN', 'paper']], [['IN HIS ', 'paper'], ['70s', 'gold']]", "[['MOSTLY', 'paper']], [['OLDER MEN', 'gold']]"),
 ("l1: 'WOULD YOU HAVE', l2: 'KEPT QUIET?'", "l1: 'WOULD YOU HAVE', l2: 'STAYED QUIET?'"),
], [r"B_\(.*'spl'"])
# ---------- IG ----------
ig_sw = {(0,12):(0,11),(0,9):(0,8),(2,5):(1,8),(3,5):(2,5),(3,10):(2,10),(4,3):(3,2),(4,7):(3,9),(4,12):(3,14),(6,1):(5,1),(8,2):(7,2),(9,6):(7,7),(10,6):(8,7),(10,8):(8,10),(11,3):(9,5),(12,8):(10,8),(13,1):(11,1),(14,2):(12,2),(14,6):(12,3),(15,6):(13,6),
 (16,0):(14,0),(16,1):(14,1),(16,2):(14,2),(16,3):(14,2),(16,4):(14,3),(17,4):(16,4),(17,5):(16,5),(18,0):(15,0),(19,2):(17,2),(19,5):(17,5),(20,0):(18,0),(20,5):(18,5),(21,4):(19,4),(22,5):(20,7),(23,4):(21,3),(23,5):(21,4),(23,6):(21,5),(24,0):(22,0),(24,8):(22,8)}
ig_S = {6:5,1:1,2:'SW(1,4)',3:2,4:3,5:4,7:6,8:'SW(7,1)',9:'SW(7,4)',10:8,11:9,12:10,13:11,14:12,15:13,16:14,17:16,18:15,19:17,20:18,21:19,22:20,23:21,24:22}
convert('yt.js', ig_sw, ig_S, {23:21,24:22}, 'ig.js', [
 ("const HK = [[['£14 MILLION', 'paper']], [['THEIR OWN CARS RATTED THEM OUT', 'bad']]];", "const HK = [[['THESE GENIUSES STOLE £14M', 'paper']], [['THEN NARRATED IT FOR THE COPS', 'bad']]];"),
 ("sizes: [92, 46]", "sizes: [56, 46]"),
 ("l1: 'WOULD YOU HAVE', l2: 'KEPT QUIET?'", "l1: 'WOULD YOU HAVE', l2: 'NARRATED IT?'"),
], [])
