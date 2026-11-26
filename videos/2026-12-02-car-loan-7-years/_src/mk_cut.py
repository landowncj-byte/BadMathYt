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
Z = (10, 0)
# ---------- TT ----------
tt_sw = {(0,7):(0,6),(0,9):'(SE(0,11))',(1,3):(4,2),(3,2):(7,2),(3,3):(7,3),(3,9):(7,9),(4,8):(3,2),(5,4):(1,11),(6,4):(2,3),(7,1):(6,2),(8,1):Z,(8,3):Z,(9,4):(11,5),
 (10,4):(8,11),(11,2):(9,10),(11,3):(9,11),(12,0):(12,0),(13,4):(10,7),(14,5):(13,5),(15,2):'(SW(13,5)+1.8)',(16,0):(15,0),(16,6):(15,6),(17,3):(16,3),(17,4):(16,5),(17,5):(16,7),(17,8):(16,9),(18,4):(17,2),(19,0):(18,0)}
tt_S = {1:4,2:5,3:7,4:3,5:1,6:2,7:6,8:10,9:11,10:8,11:9,12:12,13:10,14:13,15:13,16:15,17:16,18:17,19:18}
convert('yt.js', tt_sw, tt_S, {19:18}, 'tt.js', [
 ("lines: HK, sizes: [70, 76]", "lines: HK, sizes: [64, 70]"),
 ("const HK = [[['LOW PAYMENT?', 'paper']], [['COSTS $5,287 MORE', 'bad']]];", "const HK = [[['7-YEAR LOAN?', 'paper']], [['$5,287 GONE FOR GOOD', 'bad']]];"),
 ("props: { to: 395, prefix: '−$', suffix: '/MO', at: 0.1, dur: 0.9, size: 112, tone: 'good', label: 'PAYMENT DROPS', w: 520 }", "props: { to: 84, suffix: ' MO', at: 0.1, dur: 0.9, size: 112, tone: 'ink', label: 'MONTHS OF PAYMENTS', w: 520 }"),
 ("label: 'EXTRA INTEREST'", "label: 'YOU NEVER SEE AGAIN'"),
 ("l1: \"WHAT'S YOUR\", l2: 'LOAN TERM?'", "l1: 'HOW MANY YEARS', l2: 'IS YOUR LOAN?'"),
 ("E_('wk', 'weeks'", "E_('c9', 'counter', A(20, 0, 0), { in: S(14) - 0.3, props: { to: 15699, prefix: '$', at: SW(14,8), dur: 1.1, size: 130, tone: 'bad', label: '7 YEARS AT 9% · ASSUMES', w: 860 } });\nE_('wk', 'weeks'"),
 ("B_(S(13) - 0.05, GH, 'wk'", "B_(S(14) - 0.05, GH, 'c9', { move: 'whip', fill: 0.98, maxH: 600, sy: 830 });\nB_(SW(14,8), ZN, 'c9.value', { fill: 0.8, maxH: 420, sy: 800 });\nB_(S(13) - 0.05, GH, 'wk'"),
], [r"bar8", r"c395b", r"you8"])
# ---------- IG ----------
ig_sw = {(0,7):(0,10),(0,9):'(SE(0,11))',(1,3):(3,2),(3,2):(4,2),(3,3):(4,3),(3,9):(4,9),(4,8):(1,8),(5,4):(6,5),(6,4):(8,5),(7,1):(5,1),(8,1):(2,4),(8,3):(2,7),(9,4):(4,0),
 (10,4):(7,5),(11,2):(9,2),(11,3):(9,3),(12,0):(11,0),(13,4):(10,5),(14,5):(12,5),(15,2):(13,4),(16,0):(14,0),(16,6):(14,3),(17,3):(15,3),(17,4):(15,4),(17,5):(15,6),(17,8):(15,9),(18,4):(16,2),(19,0):(17,0)}
ig_S = {1:3,2:'SW(3,12)',3:4,4:1,5:6,6:8,7:5,8:2,9:4,10:7,11:9,12:11,13:10,14:12,15:13,16:14,17:15,18:16,19:17}
convert('yt.js', ig_sw, ig_S, {19:17}, 'ig.js', [
 ("const HK = [[['LOW PAYMENT?', 'paper']], [['COSTS $5,287 MORE', 'bad']]];", "const HK = [[['THAT LOW PAYMENT', 'paper']], [['ROBS YOU OF $5K', 'bad']]];"),
 ("l1: \"WHAT'S YOUR\", l2: 'LOAN TERM?'", "l1: 'FOUR YEARS', l2: 'OR SEVEN?'"),
 ("lines: [[['4 · 5 · 6 · 7', 'gold']], [['YEARS?', 'paper']]]", "lines: [[['4 YEARS', 'good'], [' OR ', 'paper'], ['7?', 'bad']]]"),
 ("E_('ask', 'bubble'", "E_('savetx', 'text', [830, 360], { layer: 'screen', in: SW(14,1), out: E(14) + 0.2, props: { lines: [[['SAVE IT', 'gold']]], size: 70 } });\nE_('ask', 'bubble'"),
], [r"E_\('mon'", r"E_\('dc2'", r"'mon'", r"E_\('btn', 'follow'", r"poses\.push\(\[SW\(14,0\), 'follow'"])
