#!/usr/bin/env python3
# usage: gen.py <cut: . | tiktok | ig> <cut-js (in _src)>   -> <cut>/build/scene.js = lib + kit + crime.js + header(SENT) + cut js
import sys, json, os
S = os.path.dirname(os.path.abspath(__file__)); T = os.path.dirname(S); KITS = [os.path.join(S, k.strip()) for k in open(os.path.join(S, 'kits.txt')).read().split() ] if os.path.exists(os.path.join(S, 'kits.txt')) else []; R = os.path.dirname(os.path.dirname(T))
cut, js = sys.argv[1], sys.argv[2]
sent = json.load(open(os.path.join(T, cut, 'voice/sentences.json')))
hdr = 'const SENT = %s;\nconst S = i => SENT[i][0], E = i => SENT[i][1];\n' % json.dumps([[x['start'], x['end']] for x in sent])
hdr += """const VW = BM2_VOICE.words.map(x => ({ w: x.w.toLowerCase().replace(/^[^a-z0-9$]+|[^a-z0-9$]+$/g, ''), s: x.s, e: x.e }));
const W = (w, n = 1) => { let c = 0; for (const x of VW) if (x.w === w.toLowerCase() && ++c === n) return x.s; throw new Error('W: word not found ' + w + '#' + n); };
const SW = (i, k) => { const ws = BM2_VOICE.words.filter(u => u.s >= SENT[i][0] - 0.02 && u.s < Math.max(SENT[i][1] - 0.005, i + 1 < SENT.length ? SENT[i + 1][0] - 0.05 : 1e9)); const u = ws[k < 0 ? ws.length + k : k]; if (!u) throw new Error('SW ' + i + ',' + k); return u.s; };
const SE = (i, k) => { const ws = BM2_VOICE.words.filter(u => u.s >= SENT[i][0] - 0.02 && u.s < Math.max(SENT[i][1] - 0.005, i + 1 < SENT.length ? SENT[i + 1][0] - 0.05 : 1e9)); const u = ws[k < 0 ? ws.length + k : k]; if (!u) throw new Error('SE ' + i + ',' + k); return u.e; };
const WE = (w, n = 1) => { let c = 0; for (const x of VW) if (x.w === w.toLowerCase() && ++c === n) return x.e; throw new Error('WE: word not found ' + w + '#' + n); };
"""
parts = [os.path.join(R, 'videos/_lib/lib.js'), os.path.join(R, 'videos/_lib/kit.js'), os.path.join(R, 'brand/engine-v2/crime.js')] + KITS
out = '\n'.join(open(p).read() for p in parts) + '\n' + hdr + open(os.path.join(S, js)).read()
os.makedirs(os.path.join(T, cut, 'build'), exist_ok=True)
open(os.path.join(T, cut, 'build/scene.js'), 'w').write(out); print('wrote', os.path.join(cut, 'build/scene.js'), len(out))
