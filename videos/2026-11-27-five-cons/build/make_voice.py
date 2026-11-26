#!/usr/bin/env python3
"""voice/engine_voice.json for engine v2: words (Whisper, spelling fixed to paragraphs.json) each tagged with the paragraph
they are spoken in (by gap-midpoint rule), plus paragraph start/end. Does not touch narration.wav / timeline.json / words.json."""
import json, os
os.chdir(os.path.dirname(os.path.abspath(__file__)) + '/../align')
T = json.load(open('timeline.json')); W = json.load(open('words.json'))
P = T['paragraphs']
words = []
i = 0
while i < len(W):
    w = dict(W[i])
    if w['w'] == 'D' and i + 1 < len(W) and W[i + 1]['w'] == "'Angelo's":
        w['w'] = "De Angelis's" ; w['e'] = W[i + 1]['e']; i += 1
    w['w'] = w['w'].replace('Markopoulos', 'Markopolos')
    if w['w'] == ',000' and words and words[-1]['w'] == '51': i += 1; continue   # Whisper hallucinated '51,000'; script says fifty-one
    if w['e'] < w['s']: w['e'] = w['s']
    words.append(w); i += 1
# paragraph boundary = midpoint of the silence between paragraphs
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
    print(p['id'], f"{p['start']:.2f}", ' '.join(w['w'] for w in ws[:3]), '...', ' '.join(w['w'] for w in ws[-2:]))
