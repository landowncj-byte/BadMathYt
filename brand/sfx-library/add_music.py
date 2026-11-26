#!/usr/bin/env python3
"""Add MORE CC0 music beds (RULES 115: different music every video) without rebuilding the library.
Reuses build_library.py's Openverse search/download/checks; appends to manifest.json + CREDITS.md.
usage: python3 brand/sfx-library/add_music.py"""
import hashlib, json, time, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
import build_library as bl
ROOT = bl.ROOT; man_p = ROOT / "manifest.json"
manifest = json.load(open(man_p)); have = {m["name"] for m in manifest}; seen_urls = {m["source_url"] for m in manifest}
NEW = [  # key, queries, description
 ("noir_bed", ["film noir music", "noir jazz", "detective music"], "Noir / detective bed; Decoded investigations."),
 ("mystery_bed", ["mystery music", "mysterious ambient music", "investigation music"], "Mystery bed; setting up a con or a clue."),
 ("heist_bed", ["heist music", "spy music", "sneaky music"], "Sneaky heist bed; the trick / how they did it."),
 ("dark_piano_bed", ["dark piano", "sad piano", "melancholy piano"], "Dark piano bed; verdicts and victims."),
 ("synth_bed", ["synthwave", "retro synth music", "80s synth"], "Retro synth bed; money/tech What Ifs."),
 ("electronic_bed", ["electronic background music", "minimal electronic", "chill electronic"], "Light electronic bed; explainers."),
 ("funk_bed", ["funk music", "funky groove", "funk loop"], "Funky groove; playful What Ifs."),
 ("hiphop_bed", ["hip hop beat instrumental", "boom bap beat", "instrumental beat"], "Instrumental beat; TikTok-style energy."),
 ("orchestral_bed", ["orchestral background", "cinematic music", "epic cinematic"], "Cinematic orchestral bed; big reveals / long-form."),
 ("ambient_bed", ["ambient music", "ambient pad", "calm ambient"], "Calm ambient bed; long-form chapters."),
 ("quirky_bed", ["quirky music", "playful music", "pizzicato"], "Quirky playful bed; light What Ifs."),
 ("acoustic_bed", ["acoustic guitar background", "acoustic guitar loop", "folk guitar"], "Acoustic guitar bed; everyday-money What Ifs."),
]
lo, hi = 45.0, 300.0; seen_hashes = set(); added = []
(ROOT / "music").mkdir(exist_ok=True); bl.WORK.mkdir(exist_ok=True)
for key, queries, desc in NEW:
    got, tries = 0, 0
    for q in queries:
        if got >= 3 or tries >= 12: break
        res = bl.search(q); time.sleep(1.2)
        for r in res:
            if got >= 3 or tries >= 12: break
            url = r.get("url") or ""
            if not url or url in seen_urls or not url.lower().endswith(".mp3"): continue
            if (r.get("license") or "").lower() != "cc0": continue
            seen_urls.add(url); title = r.get("title") or ""
            if bl.VOICE_RE.search(f"{title} {bl.tags_text(r)}") or bl.DENY_RE.search(title): continue
            d = r.get("duration")
            if d is not None and not (lo <= d / 1000 <= hi): continue
            tries += 1; raw = bl.WORK / f"{key}_{tries}.src"
            if not bl.download(url, raw): continue
            h = hashlib.md5(raw.read_bytes()).hexdigest()
            if h in seen_hashes: continue
            n = 1
            while f"{key}_{n}" in have: n += 1
            name = f"{key}_{n}"; out = ROOT / "music" / f"{name}.mp3"
            if not bl.make_final(raw, out, False): out.unlink(missing_ok=True); continue
            dur, pk = bl.probe_duration(out), bl.peak_db(out)
            if dur is None or pk is None or dur < lo or dur > hi + 1 or pk < bl.MIN_PEAK_DB: out.unlink(missing_ok=True); continue
            seen_hashes.add(h); have.add(name); got += 1
            e = {"file": f"music/{name}.mp3", "category": "music", "name": name, "duration_s": round(dur, 2), "peak_db": round(pk, 1),
                 "description": desc, "title": title, "creator": r.get("creator") or "", "license": "CC0",
                 "license_version": r.get("license_version") or "1.0", "source_url": r.get("foreign_landing_url") or url}
            manifest.append(e); added.append(e); print(f"kept {name} {dur:.0f}s '{title}'", flush=True)
json.dump(manifest, open(man_p, "w"), indent=1)
with open(ROOT / "CREDITS.md", "a") as f:
    f.write("\n## Music beds added 2026-11-26 (RULES 115)\n| File | Title | Creator | License | Source |\n|---|---|---|---|---|\n")
    for e in added: f.write(f"| `{e['file']}` | {e['title']} | {e['creator']} | CC0 {e['license_version']} | <{e['source_url']}> |\n")
print("ADDED", len(added))
