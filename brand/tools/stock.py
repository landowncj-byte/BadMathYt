#!/usr/bin/env python3
"""stock.py — free, watermark-free stock photos for Bad Math videos (owner rules 2026-11-25).

  python3 brand/tools/stock.py "credit card on table" [--n 8] [--source openverse|loc|commons|all] [--out brand/photos/stock]

Sources (no API key needed):
  openverse — api.openverse.org: hundreds of millions of CC0 / public-domain / CC BY / CC BY-SA images
              (Flickr, StockSnap, Wikimedia, museums). Filtered to commercial use allowed.
  loc       — Library of Congress photos (historical; free to use, mostly no known restrictions).
  commons   — Wikimedia Commons (same as photos.py).
Writes <out>/<slug>/<n>.jpg + credits.json (title, author, license, source page, provider).

YOU MUST LOOK AT EVERY CANDIDATE before using it: reject anything with a watermark, stock-site overlay,
visible brand logo, readable private names, identifiable private people in a bad light, or graphic content.
Credit CC BY / BY-SA images in the footnote or description (a credit line is not a watermark)."""
import json, os, re, sys, time, urllib.parse, urllib.request
UA = {'User-Agent': 'BadMathVideoResearch/1.0 (educational video credits)'}
def get(url, tries=4):
    for i in range(tries):
        try: return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60).read()
        except Exception:
            if i == tries - 1: raise
            time.sleep(3 * (i + 1))
def openverse(q, n):
    p = {'q': q, 'license_type': 'commercial,modification', 'page_size': max(n * 2, 10), 'mature': 'false'}
    d = json.loads(get('https://api.openverse.org/v1/images/?' + urllib.parse.urlencode(p)))
    out = []
    for r in d.get('results', []):
        if r.get('source') in ('rawpixel',) or (r.get('width') or 0) < 600: continue  # skip low-res / watermark-prone sources
        out.append({'provider': 'openverse:' + r.get('source', ''), 'title': r.get('title') or '', 'url': r['url'],
                    'page': r.get('foreign_landing_url'), 'license': (r.get('license') or '').upper() + ' ' + (r.get('license_version') or ''),
                    'author': r.get('creator') or 'unknown', 'credit': r.get('attribution') or '', 'w': r.get('width'), 'h': r.get('height')})
        if len(out) >= n: break
    return out
def loc(q, n):
    d = json.loads(get('https://www.loc.gov/photos/?' + urllib.parse.urlencode({'q': q, 'fo': 'json', 'c': n * 3})))
    out = []
    for r in d.get('results', []):
        imgs = r.get('image_url') or []
        if not imgs or 'no known restrictions' not in json.dumps(r.get('rights', '') or r.get('rights_advisory', '') or '').lower() and 'no known' not in json.dumps(r).lower(): continue
        out.append({'provider': 'loc', 'title': r.get('title', ''), 'url': imgs[-1].split('#')[0], 'page': r.get('url') or r.get('id'),
                    'license': 'No known restrictions (Library of Congress)', 'author': ', '.join(r.get('contributor', [])[:1]) or 'Library of Congress', 'credit': 'Library of Congress'})
        if len(out) >= n: break
    return out
def commons(q, n):
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    import photos
    return [{'provider': 'commons', 'title': r['title'], 'url': r['thumb'], 'page': r['page'], 'license': r['license'], 'author': r['author'], 'credit': r['author'] + ', ' + r['license'] + ', via Wikimedia Commons'} for r in photos.search(q, n)]
def main():
    a = sys.argv; q = a[1]
    n = int(a[a.index('--n') + 1]) if '--n' in a else 8
    src = a[a.index('--source') + 1] if '--source' in a else 'all'
    out = a[a.index('--out') + 1] if '--out' in a else 'brand/photos/stock'
    res = []
    for name, fn in (('openverse', openverse), ('loc', loc), ('commons', commons)):
        if src in ('all', name):
            try: res += fn(q, n)
            except Exception as e: print(f'  {name} failed: {e}')
    slug = re.sub(r'[^a-z0-9]+', '-', q.lower()).strip('-'); d = os.path.join(out, slug); os.makedirs(d, exist_ok=True)
    kept = []
    for r in res:
        i = len(kept) + 1; r['file'] = f'{i}.jpg'
        try: data = get(r['url'])
        except Exception as e: print('  download failed:', r['provider'], r['url'][:70], e); continue
        open(os.path.join(d, r['file']), 'wb').write(data); kept.append(r)
        print(f"{i}. [{r['provider']}] {r['title'][:60]} | {r['license']} | {r['author'][:40]}")
        time.sleep(0.5)
    json.dump(kept, open(os.path.join(d, 'credits.json'), 'w'), indent=1)
    print(f'{len(kept)} images in {d} (LOOK at each before use)')
if __name__ == '__main__': main()
