#!/usr/bin/env python3
"""photos.py — find REAL, properly licensed photos of people/places for Bad Math videos (owner rule 2026-11-25).

  python3 brand/tools/photos.py "Bernie Madoff" [--n 5] [--out brand/photos]   # search + download candidates
Source: Wikimedia Commons only (public domain, CC0, CC BY, CC BY-SA). Each download writes
<out>/<slug>/<n>.jpg and <out>/<slug>/credits.json (title, author, license, source URL).
RULES: only use a photo whose file page really shows that person (check the description!), never an
AI-generated or look-alike image of a real person, show the credit in the video footnote or the
description ("Photo: <author> / <license> via Wikimedia Commons"), CC BY-SA images: keep the credit.
If nothing licensed exists: use the silhouette card labelled ILLUSTRATION (old behaviour)."""
import json, os, re, sys, time, urllib.parse, urllib.request
UA = {'User-Agent': 'BadMathVideoResearch/1.0 (educational video credits; contact via channel)'}
OK = re.compile(r'(public domain|^pd|cc0|cc[- ]by(-sa)?[- ]?\d)', re.I)
def get(url, tries=5):
    for i in range(tries):
        try: return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60).read()
        except Exception as e:
            if i == tries - 1: raise
            time.sleep(4 * (i + 1))
def api(params):
    return json.loads(get('https://commons.wikimedia.org/w/api.php?' + urllib.parse.urlencode(params)))
def strip(h): return re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', h or '')).strip()
def search(name, n=5):
    d = api({'action': 'query', 'generator': 'search', 'gsrsearch': name, 'gsrnamespace': 6, 'gsrlimit': 30,
             'prop': 'imageinfo', 'iiprop': 'url|extmetadata|size|mime', 'iiurlwidth': 960, 'format': 'json'})
    out = []
    for p in sorted(d.get('query', {}).get('pages', {}).values(), key=lambda p: p.get('index', 99)):
        ii = (p.get('imageinfo') or [{}])[0]; m = ii.get('extmetadata', {})
        lic = strip(m.get('LicenseShortName', {}).get('value', ''))
        if not OK.search(lic) or ii.get('mime') not in ('image/jpeg', 'image/png'): continue
        if min(ii.get('width', 0), ii.get('height', 0)) < 300: continue
        out.append({'title': p['title'], 'thumb': ii.get('thumburl') or ii['url'], 'page': ii.get('descriptionurl'),
                    'license': lic, 'author': strip(m.get('Artist', {}).get('value', ''))[:120] or 'unknown',
                    'description': strip(m.get('ImageDescription', {}).get('value', ''))[:300], 'w': ii.get('width'), 'h': ii.get('height')})
        if len(out) >= n: break
    return out
def main():
    name = sys.argv[1]; n = int(sys.argv[sys.argv.index('--n') + 1]) if '--n' in sys.argv else 5
    out = sys.argv[sys.argv.index('--out') + 1] if '--out' in sys.argv else 'brand/photos'
    slug = re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-'); d = os.path.join(out, slug); os.makedirs(d, exist_ok=True)
    res = search(name, n)
    for i, r in enumerate(res, 1):
        ext = '.png' if r['thumb'].lower().endswith('.png') else '.jpg'; r['file'] = f'{i}{ext}'
        time.sleep(1.5)
        try:
            data = get(r['thumb'])
        except Exception as e:
            print('   download failed:', r['title'], e); r['file'] = None; continue
        with open(os.path.join(d, r['file']), 'wb') as f: f.write(data)
        print(f"{i}. {r['title']} | {r['license']} | {r['author']} | {r['description'][:90]}")
    json.dump(res, open(os.path.join(d, 'credits.json'), 'w'), indent=1)
    if not res: print('NO LICENSED PHOTO FOUND for', name)
if __name__ == '__main__': main()
