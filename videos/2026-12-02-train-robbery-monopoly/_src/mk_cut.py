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
tt_sw = {(0,11):(0,11),(0,8):(0,9),(2,9):(4,2),(3,7):(4,14),(4,3):(5,3),(4,4):(5,4),(5,5):(5,9),(6,1):(6,1),(7,1):(5,13),(8,3):(7,3),(8,4):(7,4),(9,3):(8,3),(10,6):(9,5),(10,9):(9,9),
 (12,6):(2,4),(12,7):(2,5),(12,9):(2,8),(13,1):(12,1),(14,7):(11,7),(15,3):(13,4),(15,7):(13,8),(15,8):(13,9),(16,2):(14,2),(17,4):(15,7),(18,11):(16,11),(18,12):(16,12),(18,3):(16,3),(18,5):(16,5),(18,6):(16,6),(18,7):(16,7),
 (19,4):(16,4),(19,6):(16,6),(20,0):(17,0),(21,3):(18,3),(21,4):(18,4),(21,5):(18,5),(22,6):(19,6),(22,8):(19,8),(23,7):(21,7),(24,0):(22,0),(24,2):(22,1)}
tt_S = {1:'SW(1,4)',2:'SW(4,0)',3:'SW(4,10)',4:'SW(5,0)',5:'SW(5,6)',6:6,7:'SW(5,13)',8:7,9:8,10:9,11:1,12:2,13:12,14:11,15:13,16:14,17:15,18:16,19:16,20:17,21:18,22:19,23:21,24:22}
convert('yt.js', tt_sw, tt_S, {23:21,24:22}, 'tt.js', [
 ("const HK = [[['THEY PLAYED MONOPOLY', 'paper']], [['WITH THE REAL CASH', 'bad']]];", "const HK = [[['2.5 TONS OF CASH', 'paper']], [['CAUGHT BY KETCHUP', 'bad']]];"),
 ("icon: 'board', caption: 'BOARD GAME', cap: 34, w: 470, h: 500, iconS: 330, slam: true", "icon: 'ketchup', caption: 'KETCHUP', cap: 34, w: 470, h: 500, iconS: 330, slam: true"),
 ("caption: 'REAL CASH'", "caption: '2.5 TONS'"),
 ("{ id: 'bg', k: 'note', x: 280, y: 200, w: 300, h: 320, icon: 'board', iconS: 140, size: 34, lines: [['A BOARD GAME', 'bad', 30]]", "{ id: 'bg', k: 'note', x: 280, y: 200, w: 300, h: 320, icon: 'ketchup', iconS: 140, size: 34, lines: [['A KETCHUP BOTTLE', 'bad', 26]]"),
 ("l1: 'MONOPOLY', l2: 'OR KETCHUP?'", "l1: 'THE SANDWICH-LEVEL', l2: 'DUMB: WHICH?'"),
 ("E_('dc1', 'datecard'", "E_('bg20', 'suspect', A(20, 0, 20), { in: SW(20,4) - 0.3, props: G({ w: 520, nick: 'RONNIE BIGGS', tag: ILL + ' · NOT A PHOTO', tilt: -0.02, mono: true, flash: true, stamps: [{ text: 'ESCAPED · 1965', at: SW(20,6), size: 52, x: 0, y: -40, rot: -0.1 }] }) });\nE_('dc1', 'datecard'"),
 ("B_(S(21) - 0.05, GH, ['gg21'", "B_(SW(20,4) - 0.05, GH, 'bg20', { move: 'whip', fill: 0.9, maxH: 820, sy: 830, st: 'corner' });\nB_(S(21) - 0.05, GH, ['gg21'"),
], [r"q3", r"'spl'", r"'mg'"])
# ---------- IG ----------
ig_sw = {(0,11):(0,9),(0,8):(0,7),(2,9):(1,13),(3,7):(2,7),(4,3):(2,15),(4,4):(2,16),(5,5):(3,6),(6,1):(4,1),(7,1):(3,13),(8,3):(5,3),(8,4):(5,4),(9,3):(6,3),(10,6):(7,4),(10,9):(7,8),
 (12,6):(9,7),(12,7):(9,7),(12,9):(9,10),(13,1):(11,0),(14,7):(10,2),(15,3):(12,5),(15,7):(12,9),(15,8):(12,10),(16,2):(13,2),(17,4):(15,9),(18,11):(14,10),(18,12):(14,11),(18,3):(14,2),(18,5):(14,4),(18,6):(14,5),(18,7):(14,6),
 (19,4):(14,4),(19,6):(14,6),(20,0):(16,0),(21,3):(17,3),(21,4):(17,4),(21,5):(17,5),(22,6):(18,6),(22,8):(18,8),(23,7):(19,9),(24,0):(20,0),(24,2):(20,1)}
ig_S = {1:1,2:'SW(1,3)',3:2,4:'SW(2,12)',5:3,6:4,7:'SW(3,13)',8:5,9:6,10:7,11:8,12:9,13:11,14:10,15:12,16:13,17:15,18:14,19:14,20:16,21:17,22:18,23:19,24:20}
convert('yt.js', ig_sw, ig_S, {23:19,24:20}, 'ig.js', [
 ("const HK = [[['THEY PLAYED MONOPOLY', 'paper']], [['WITH THE REAL CASH', 'bad']]];", "const HK = [[['THESE GENIUSES ROBBED A TRAIN', 'paper']], [['BUSTED BY KETCHUP', 'bad']]];"),
 ("sizes: [66, 76]", "sizes: [44, 76]"),
 ("icon: 'board', caption: 'BOARD GAME', cap: 34, w: 470, h: 500, iconS: 330, slam: true", "icon: 'ketchup', caption: 'KETCHUP', cap: 34, w: 470, h: 500, iconS: 330, slam: true"),
 ("{ id: 'bg', k: 'note', x: 280, y: 200, w: 300, h: 320, icon: 'board', iconS: 140, size: 34, lines: [['A BOARD GAME', 'bad', 30]]", "{ id: 'bg', k: 'note', x: 280, y: 200, w: 300, h: 320, icon: 'ketchup', iconS: 140, size: 34, lines: [['A KETCHUP BOTTLE', 'bad', 26]]"),
 ("l1: 'MONOPOLY', l2: 'OR KETCHUP?'", "l1: 'MONOPOLY', l2: 'OR KETCHUP?'"),
], [r"'spl'", r"'mg'"])
