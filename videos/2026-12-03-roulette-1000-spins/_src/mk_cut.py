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
tt_sw = {(0,15):(0,10),(0,8):(0,5),(1,5):(5,4),(2,1):(5,8),(2,3):(6,3),(3,3):(6,7),(4,2):(2,3),(4,7):(2,4),(5,6):(3,6),(6,1):(4,1),(7,3):(7,3),(7,9):(7,9),(8,5):(8,5),(9,5):(8,5),(11,0):(10,0),(11,11):(10,9),(11,8):(10,8),
 (12,1):(11,1),(12,4):(11,4),(13,1):(12,1),(14,1):(13,1),(15,2):(14,1),(15,4):(14,4),(16,0):(15,0),(17,4):(14,9),(17,5):(14,9),(18,3):(16,6),(18,5):(16,8),(19,3):(17,2),(19,6):(17,5),(20,0):(18,0)}
tt_S = {1:'SW(5,0)',2:'SW(5,7)',3:'SW(6,5)',4:'SW(1,3)',5:3,6:4,7:7,8:8,9:9,10:9,11:10,17:'SW(14,6)',18:16,19:17,20:18}
convert('yt.js', tt_sw, tt_S, {19:17,20:18}, 'tt.js', [
 ("const HK = [[['$1 ON RED × 1,000', 'paper']], [['ONLY 1 IN 22 AHEAD', 'bad']]];", "const HK = [[['1,000 SPINS OF RED', 'paper']], [['95% END UP BEHIND', 'bad']]];"),
 ("l1: 'JUST ONE', l2: 'MORE SPIN'", "l1: \"I'M DUE\", l2: 'ONE MORE'"),
], [r"E_\('c5'", r"'c5'", r"c5\.value"])
# ---------- IG ----------
ig_sw = {(0,15):(0,10),(0,8):(0,6),(1,5):(5,5),(2,1):(5,11),(2,3):(6,1),(3,3):(6,5),(4,2):(2,3),(4,7):(2,4),(5,6):(3,6),(6,1):(4,1),(7,3):(7,4),(7,9):(7,9),(8,5):(8,6),(9,5):(8,6),(11,0):(12,0),(11,11):(12,10),(11,8):(12,7),
 (12,1):(10,1),(12,4):(10,4),(13,1):(11,1),(14,1):(13,1),(15,2):(14,2),(15,4):(14,4),(16,0):(16,0),(17,4):(15,3),(17,5):(15,6),(18,3):(17,5),(18,5):(17,7),(19,3):(19,1),(19,6):(19,5),(20,0):(20,0)}
ig_S = {1:'SW(5,0)',2:'SW(5,11)',3:'SW(6,3)',4:'SW(1,1)',5:3,6:4,7:7,8:8,9:9,10:9,11:12,17:15,18:17,19:19,20:20}
convert('yt.js', ig_sw, ig_S, {19:19,20:20}, 'ig.js', [
 ("const HK = [[['$1 ON RED × 1,000', 'paper']], [['ONLY 1 IN 22 AHEAD', 'bad']]];", "const HK = [[['LOOKS 50-50', 'paper']], [['HOW IT GETS YOU', 'bad']]];"),
 ("l1: 'JUST ONE', l2: 'MORE SPIN'", "l1: 'GOT A', l2: 'SYSTEM?'"),
 ("E_('btn', 'follow', [830, 1010], { layer: 'screen', scale: 0.8, in: SW(16,0) - 0.05, out: SW(16,0) + 1.45, props: { press: 0.5 } });", "E_('savetx', 'text', [830, 360], { layer: 'screen', in: SW(16,0), out: SW(16,4) + 0.4, props: { lines: [[['SAVE IT', 'gold']]], size: 70 } });"),
], [r"E_\('c5'", r"'c5'", r"c5\.value", r"poses\.push"])
