#!/usr/bin/env python3
# derive ig.js / tt.js from yt.js via time maps (YT sentence,word) -> (cut sentence,word); station numbering (A(i,..)) is untouched
import re, sys
def convert(src, SWmap, Smap, Emap, out, extra=[]):
    s = open(src).read()
    def sw(m):
        fn, i, k = m.group(1), int(m.group(2)), int(m.group(3))
        key = (i, k)
        if key not in SWmap: raise KeyError('SW %s' % (key,))
        v = SWmap[key]; return v if isinstance(v, str) else '%s(%d,%d)' % (fn, v[0], v[1])
    s = re.sub(r"\b(S[WE])\((\d+), *(-?\d+)\)", sw, s)
    s = re.sub(r"(?<![A-Za-z_])S\((\d+)\)", lambda m: Smap[int(m.group(1))] if isinstance(Smap[int(m.group(1))], str) else 'S(%d)' % Smap[int(m.group(1))], s)
    s = re.sub(r"(?<![A-Za-z_])E\((\d+)\)", lambda m: 'E(%d)' % Emap[int(m.group(1))], s)
    for a, b in extra:
        if a not in s: print('WARN extra not found:', a[:60])
        s = s.replace(a, b)
    open(out, 'w').write(s)
SM = {}  # filled below
# ---------- IG ----------
ig_sw = {(0,10):(0,10),(0,11):(0,7),(0,12):'(SE(0,10)+0.1)',(0,4):(0,3),(1,7):(1,4),(2,11):(2,12),(2,6):(2,7),(2,8):(2,9),(3,5):(3,5),(3,7):(3,7),(4,3):(4,3),(4,8):(4,8),
 (5,6):(4,10),(5,8):(5,2),(6,3):(5,10),(6,8):(5,11),(7,1):(6,1),(8,6):(7,6),(9,1):(8,1),(10,1):(9,3),(10,4):(9,6),(10,5):(9,7),(11,2):(10,1),(11,8):(10,2),(12,3):(11,4),(12,5):(11,6),(12,7):(11,8),
 (13,0):(13,1),(14,2):(12,4),(14,6):(14,3),(14,9):(14,6),(15,2):(14,9),(16,0):(15,0),(16,3):(15,3),(16,5):(15,5),(16,6):(15,6),(17,0):(16,4),(17,12):(16,16),(17,5):(16,9),(18,5):(17,6),(18,0):(17,0),(18,10):(17,9),
 (19,3):(18,5),(19,5):(18,6),(19,9):(18,10),(20,2):(19,2),(20,4):(19,4),(20,5):(19,5),(21,5):(20,5),(21,7):(20,7),(22,5):(21,5),(23,5):(22,3),(23,7):(22,7),(24,0):(23,0),(24,4):(23,3)}
ig_S = {1:1,2:2,3:3,4:4,5:'SW(4,4)',6:'SW(5,0)',7:6,8:7,9:8,10:9,11:10,12:11,13:13,14:14,15:'SW(14,9)',16:15,17:16,18:17,19:18,20:19,21:20,22:21,23:22,24:23}
ig_E = {23:22,24:23}
convert('yt.js', ig_sw, ig_S, ig_E, 'ig.js', [
 ("[['$100 MILLION IN DIAMONDS', 'paper']], [['SANK BY A SANDWICH', 'bad']]], sizes: [64, 76]", "[['THESE CLOWNS STOLE $100M', 'paper']], [['SUNK BY LUNCH', 'bad']]], sizes: [58, 84]"),
 ("[['$100 MILLION IN DIAMONDS', 'paper']], [['SANK BY A SANDWICH', 'bad']]], sizes: [64, 76]", "[['THESE CLOWNS STOLE $100M', 'paper']], [['SUNK BY LUNCH', 'bad']]], sizes: [58, 84]"),
 ("foot: 'FOR A LONG TIME'", "foot: 'STROLL IN, STROLL OUT'"),
 ("title: 'CASE FILE Nº 1 · ANTWERP · 2003'", "title: 'CASE FILE Nº 1 · ANTWERP · 2003'"),
])

# ---------- TT ----------
tt_sw = {(0,10):(0,11),(0,11):(0,7),(0,12):'(SE(0,11)+0.1)',(0,4):(0,1),(1,7):(4,4),(2,11):(6,4),(2,6):(6,0),(2,8):(6,1),(3,5):(5,12),(3,7):(5,14),(4,3):(7,2),(4,8):(7,2),
 (5,6):(7,11),(5,8):(8,1),(6,3):(8,9),(6,8):(8,11),(7,1):(9,1),(8,6):(10,3),(9,1):(10,8),(10,1):(11,0),(10,4):(11,4),(10,5):(11,5),(11,2):(12,1),(11,8):(12,1),
 (12,3):(13,3),(12,5):(13,2),(12,7):(13,4),(13,0):(14,0),(14,2):(15,2),(14,6):(15,7),(14,9):(1,8),(15,2):(2,1),(16,0):(16,0),(16,3):(16,3),(16,5):(16,6),(16,6):(16,8),
 (17,0):(17,4),(17,12):(17,16),(17,5):(17,9),(18,5):(18,7),(18,0):(18,0),(18,10):(18,9),(19,3):(19,3),(19,5):(19,5),(19,9):(19,9),(20,2):(20,2),(20,4):(20,4),(20,5):(20,5),
 (21,5):(21,5),(21,7):(21,7),(22,5):(22,5),(23,5):(22,5),(23,7):(22,6),(24,0):(23,0),(24,4):(23,6)}
tt_S = {1:4,2:6,3:5,4:'SW(7,0)',5:'SW(7,5)',6:8,7:9,8:10,9:'SW(10,7)',10:11,11:12,12:13,13:14,14:1,15:2,16:16,17:17,18:18,19:19,20:20,21:21,22:22,23:22,24:23}
tt_E = {23:22,24:23}
convert('yt.js', tt_sw, tt_S, tt_E, 'tt.js', [
 ("[['$100 MILLION IN DIAMONDS', 'paper']], [['SANK BY A SANDWICH', 'bad']]], sizes: [64, 76]", "[['$100M DIAMOND HEIST', 'paper']], [['WRECKED BY A SANDWICH', 'bad']]], sizes: [68, 72]"),
 ("E_('cover', 'text'", "E_('cover0', 'text'"),
 ("stringTo: [620, 50], stringAt: SW(7,2) - 0.2, ", ""),
 ("['sus4', 'cover']", "'sus4'"),
 ("foot: 'FOR A LONG TIME'", "foot: 'COME AND GO'"),
 ("big: 'THE CATCH', small: 'NEAR BRUSSELS'", "big: 'FEB 2003', small: 'ROAD NEAR BRUSSELS'"),
 ("kicker: 'CHAPTER 4'", "kicker: 'COLD OPEN'"),
 ("l1: 'BURN THE BAG', l2: 'OR EAT IT?'", "l1: 'SANDWICH OR', l2: 'WALKING BACK?'"),
 ("['road', 'brx', 'nb'], { move: 'whip'", "['road', 'brx'], { move: 'whip'"),
])
t = open('tt.js').read()
import re
# drop the unused cover text + recap board + their beats; patch hud labels, add rewind overlay + return beat to the bag
t = re.sub(r"E_\('cover0'.*?\n", "", t)
t = re.sub(r"E_\('rec', 'board'.*?\n(?:  .*\n)*?  strings:.*?\n", "", t)
t = re.sub(r"B_\(S\(22\) - 0.05, GH, 'rec'.*?\n", "", t)
t = re.sub(r"B_\(SW\(22,6\), ZN, 'rec.tr'.*?\n", "", t)
t = re.sub(r"labels: \[\{ at: -1, text: 'THE HOOK' \}.*?\],\n", "labels: [{ at: -1, text: 'THE COLD OPEN' }, { at: S(1) - 0.1, text: 'THE ROADSIDE' }, { at: S(3) - 0.1, text: 'REWIND' }, { at: S(4) - 0.1, text: 'THE SETUP' }, { at: SW(7,0) - 0.1, text: 'THE MAN' }, { at: SW(7,5) - 0.1, text: 'THE PITCH' }, { at: S(10) - 0.1, text: 'THE TRICK' }, { at: S(15) - 0.1, text: 'THE CATCH' }, { at: S(19) - 0.1, text: 'THE SENTENCE' }],\n", t, flags=re.S)
t = t.replace("E_('hud'", "E_('rew', 'text', [540, 440], { layer: 'screen', in: S(3) + 0.35, out: S(4) - 0.1, props: { lines: [[['WHOSE SANDWICH?', 'gold']], [['WHAT ROBBERY?', 'paper']]], size: 76 } });\nE_('hud'")
t = t.replace("B_(E(23) - 0.55,", "B_(S(3), PF, 'spill', { pose: 'shrug', sy: 830 });\nB_(SW(15,0) - 0.05, SB, ['road', 'brx', 'nb'], { move: 'whip', fill: 1.0, maxH: 900, sy: 830 });\nB_(E(23) - 0.55,")
open('tt.js', 'w').write(t)
