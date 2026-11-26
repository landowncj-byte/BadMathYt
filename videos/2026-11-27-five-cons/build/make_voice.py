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
FIX = {'Kerniawan': 'Kurniawan', 'Penseau': 'Ponsot', 'Sandinie': 'Saint-Denis', 'Ansarud': 'Al-Saud', 'Ginyak': 'Gignac', 'Jevis': 'Javice'}
for w in words:
    w['w'] = FIX.get(w['w'].strip(',.'), w['w']) if w['w'].strip(',.') in FIX else w['w']
    for a, b in FIX.items(): w['w'] = w['w'].replace(a, b)
# whisper skipped the spoken chapter titles of P34 and P60 in the full pass: take them from the per-chapter pass
st = {p['id']: p['start'] for p in P}
for pid, cf, lim in (('P34', '/tmp/claude-0/cm/ws_ch3.json', 3.6), ('P60', '/tmp/claude-0/cm/ws_ch5.json', 4.5)):
    cw = json.load(open(cf)); add = [dict(w=x['w'], s=round(st[pid] + x['s'], 3), e=round(st[pid] + x['e'], 3)) for x in cw if x['s'] < lim and x['w'] not in ('Every', 'Charlie')]
    for a in add: a['w'] = FIX.get(a['w'].strip(',.'), a['w'])
    words += add
words.sort(key=lambda w: w['s'])
# paragraph boundary = midpoint of the silence between paragraphs
cuts = [(P[k]['end'] + P[k + 1]['start']) / 2 for k in range(len(P) - 1)]
for w in words:
    m = (w['s'] + w['e']) / 2; k = 0
    while k < len(cuts) and m > cuts[k]: k += 1
    w['p'] = P[k]['id']
    if w['w'] == 'Every' and 205 < w['s'] < 211: w['p'] = 'P35'
    if w['w'] == 'Charlie' and 384 < w['s'] < 391: w['p'] = 'P61'
json.dump({'words': words, 'paragraphs': [{'id': p['id'], 'chapter': p['chapter'], 'start': p['start'], 'end': p['end']} for p in P], 'duration': T['duration']}, open('engine_voice.json', 'w'), indent=0)
from collections import Counter
print(len(words), Counter(w['p'] for w in words).most_common(3))
for p in P:
    ws = [w for w in words if w['p'] == p['id']]
    print(p['id'], f"{p['start']:.2f}", ' '.join(w['w'] for w in ws[:3]), '...', ' '.join(w['w'] for w in ws[-2:]))
