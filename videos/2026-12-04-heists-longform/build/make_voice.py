#!/usr/bin/env python3
"""align/engine_voice.json for engine v2: words (Whisper, spelling fixed to paragraphs.json) each tagged with the paragraph
they are spoken in (by gap-midpoint rule), plus paragraph start/end. Does not touch narration.wav / timeline.json / words.json."""
import json, os
os.chdir(os.path.dirname(os.path.abspath(__file__)) + '/../align')
T = json.load(open('timeline.json')); W = json.load(open('words.json'))
P = T['paragraphs']
words = []
for w0 in W:
    w = dict(w0)
    if w['e'] < w['s']: w['e'] = w['s']
    words.append(w)
FIX = json.load(open('../build/fixes.json')) if os.path.exists('../build/fixes.json') else {}
for w in words:
    for a, b in FIX.items(): w['w'] = w['w'].replace(a, b)
words.sort(key=lambda w: w['s'])
cuts = [(P[k]['end'] + P[k + 1]['start']) / 2 for k in range(len(P) - 1)]
for w in words:
    m = (w['s'] + w['e']) / 2; k = 0
    while k < len(cuts) and m > cuts[k]: k += 1
    w['p'] = P[k]['id']
json.dump({'words': words, 'paragraphs': [{'id': p['id'], 'chapter': p['chapter'], 'start': p['start'], 'end': p['end']} for p in P], 'duration': T['duration']}, open('engine_voice.json', 'w'), indent=0)
from collections import Counter
print(len(words), Counter(w['p'] for w in words).most_common(3))
for p in P:
    ws = [w for w in words if w['p'] == p['id']]
    print(p['id'], f"{p['start']:.2f}", ' '.join(w['w'] for w in ws))
