#!/usr/bin/env python3
"""Rebuild the CC0 sound-effects library from the Openverse API.

Needs curl, ffmpeg and ffprobe on PATH. Run from anywhere:
    python3 brand/sfx-library/build_library.py

Only CC0 (public domain) results are kept. Each kept file is trimmed of leading
silence (one-shots only), checked to be at least -20 dB peak, and written to
<category>/<name>.mp3. manifest.json and CREDITS.md are regenerated.
"""
import hashlib
import json
import re
import shutil
import subprocess
import time
import urllib.parse
from pathlib import Path

ROOT = Path(__file__).resolve().parent
WORK = ROOT / ".work"
UA = "bad-math-video/1.0"
API = "https://api.openverse.org/v1/audio/"
TARGET = 2     # files kept per item
MAX_TRY = 10   # candidate downloads per item
MIN_PEAK_DB = -20.0

# kind -> (min_s, max_s, trim leading silence)
RANGES = {
    "oneshot": (0.2, 6.0, True),
    "reaction": (0.5, 8.0, True),  # crowd reactions: voices allowed
    "stinger": (2.0, 30.0, False),
    "bed": (30.0, 240.0, False),
}

# Titles/tags that suggest spoken voice (rejected except for reactions).
VOICE_RE = re.compile(
    r"\b(voice|voices|vocal|vocals|speech|speak\w*|said|say|says|talk\w*|"
    r"dialog\w*|narrat\w*|spoken|sing\w*|lyric\w*|rap|man|woman|male|female|kid|baby)\b",
    re.I,
)

# (category, key, search phrasings, kind, one-line description)
ITEMS = [
    # impacts
    ("impacts", "deep_boom", ["deep bass boom", "boom bass impact", "deep boom impact"], "oneshot",
     "Deep bass boom with a meme-style thump; use on punchlines and reveals."),
    ("impacts", "cinematic_hit", ["cinematic hit", "cinematic impact hit", "trailer hit impact"], "oneshot",
     "Big cinematic hit with layered low end; use for title cards and dramatic reveals."),
    ("impacts", "sub_drop", ["sub drop", "sub bass drop", "bass drop impact"], "oneshot",
     "Sub-bass drop that lands with weight; use when a twist or bad result drops in."),
    ("impacts", "thud", ["thud", "low thud impact", "body thud"], "oneshot",
     "Short low thud; use for small hits, objects landing, or a flat punchline."),
    ("impacts", "punch", ["punch impact sound", "punch hit", "fist hit impact"], "oneshot",
     "Sharp punchy impact; use for quick emphasis on a number or word."),
    # transitions
    ("transitions", "whoosh", ["whoosh", "whoosh transition", "air whoosh"], "oneshot",
     "Air whoosh; use between scenes or on fast camera moves."),
    ("transitions", "swoosh", ["swoosh", "swoosh fast", "swoosh sound"], "oneshot",
     "Quick swoosh; use for text or graphics sliding in or out."),
    ("transitions", "swipe", ["swipe sound", "swipe transition", "swipe whoosh"], "oneshot",
     "Short swipe; use for card or page swaps."),
    ("transitions", "riser", ["riser", "tension riser", "sound riser"], "oneshot",
     "Rising build-up; use to lead into a reveal or a big number."),
    ("transitions", "reverse_cymbal", ["reverse cymbal", "reverse crash cymbal"], "oneshot",
     "Reversed cymbal swell; use right before a cut or a hit."),
    ("transitions", "tape_stop", ["tape stop", "tape stop slowdown"], "oneshot",
     "Tape-stop slowdown; use when the action stops or something goes wrong."),
    ("transitions", "record_scratch", ["record scratch", "vinyl record scratch"], "oneshot",
     "Vinyl record scratch; use to halt the action on a surprise."),
    ("transitions", "rewind", ["rewind", "tape rewind", "rewind reverse sound"], "oneshot",
     "Tape rewind; use to signal going back in time or a replay."),
    # money
    ("money", "cash_register", ["cash register", "cash register ding"], "oneshot",
     "Cash register drawer opening; use when money or a price comes up."),
    ("money", "coins_drop", ["coins drop", "coins falling", "coin pile drop"], "oneshot",
     "Coins dropping into a pile; use for a payout or a cost reveal."),
    ("money", "coin_single", ["coin drop single", "single coin", "coin clink"], "oneshot",
     "Single coin clink; use for a small amount or a tiny joke."),
    ("money", "money_counter", ["bill counter", "money counter", "counting money"], "oneshot",
     "Bills being counted; use to show a total or a running sum."),
    ("money", "slot_win", ["slot machine win", "slot machine jackpot", "slot machine"], "oneshot",
     "Slot machine win; use for a jackpot or a lucky break."),
    ("money", "ka_ching", ["ka ching", "kaching", "cha ching"], "oneshot",
     "Ka-ching till bell; use for a sale, a deal or a money joke."),
    # ui_pop
    ("ui_pop", "pop", ["pop sound", "bubble pop"], "oneshot",
     "Soft pop; use when an element appears on screen."),
    ("ui_pop", "click", ["mouse click", "ui click", "click button"], "oneshot",
     "Crisp UI click; use for button presses and selections."),
    ("ui_pop", "ding", ["ding", "ding bell", "ding notification"], "oneshot",
     "Bright ding; use to flag a correct answer or a key fact."),
    ("ui_pop", "bell", ["bell ding small", "service bell", "desk bell"], "oneshot",
     "Small bell ring; use as a call-out or reminder."),
    ("ui_pop", "notification_chime", ["notification chime", "notification sound", "message notification"], "oneshot",
     "Notification chime; use when a comment or message appears on screen."),
    ("ui_pop", "typewriter", ["typewriter", "typewriter key", "typewriter ding"], "oneshot",
     "Typewriter key strike; use for text appearing letter by letter."),
    ("ui_pop", "keyboard_typing", ["keyboard typing", "keyboard typing fast", "typing keys"], "oneshot",
     "Keyboard typing burst; use when someone types or a script is being written."),
    ("ui_pop", "camera_shutter", ["camera shutter", "camera click", "shutter click"], "oneshot",
     "Camera shutter click; use for a photo or screenshot beat."),
    ("ui_pop", "camera_flash", ["camera flash", "flash photo", "camera flash pop"], "oneshot",
     "Camera flash; use for a photo moment or a bright reveal."),
    # reactions (crowd only)
    ("reactions", "crowd_gasp", ["crowd gasp", "audience gasp", "crowd gasps"], "reaction",
     "Crowd gasp; use right after a shocking reveal."),
    ("reactions", "crowd_ooh", ["crowd ooh", "audience ooh", "crowd oooh"], "reaction",
     "Crowd ooh; use when something impressive or surprising happens."),
    ("reactions", "crowd_laugh", ["crowd laugh", "audience laughter", "crowd laughing"], "reaction",
     "Crowd laugh; use after a joke lands."),
    ("reactions", "applause", ["applause", "audience applause", "clapping audience"], "reaction",
     "Applause; use to celebrate a correct answer or a finish."),
    ("reactions", "cheer", ["crowd cheer", "cheering crowd", "crowd cheering"], "reaction",
     "Crowd cheer; use for a win or a big payoff."),
    ("reactions", "boo", ["crowd boo", "booing crowd", "audience boo"], "reaction",
     "Crowd boo; use for a bad take or a mocked idea."),
    # comedy
    ("comedy", "sad_trombone", ["sad trombone", "sad trumpet wah", "wah wah sad"], "oneshot",
     "Sad trombone wah-wah; use when a joke fails or a result is a letdown."),
    ("comedy", "crickets", ["crickets", "cricket chirp", "cricket sounds"], "oneshot",
     "Crickets chirping; use after a joke falls flat."),
    ("comedy", "slide_whistle", ["slide whistle", "whistle slide up", "slide whistle down"], "oneshot",
     "Cartoon slide whistle; use for a number that rises or drops."),
    ("comedy", "cartoon_boing", ["boing", "cartoon boing", "spring boing"], "oneshot",
     "Cartoon boing; use for a bounce, a jump or a wobble."),
    ("comedy", "honk_clown", ["clown horn", "bike horn honk", "honk horn"], "oneshot",
     "Clown honk; use for a silly or clumsy moment."),
    ("comedy", "airhorn", ["air horn", "airhorn", "air horn blast"], "oneshot",
     "Airhorn blast; use for hype or an over-the-top announcement."),
    ("comedy", "rimshot", ["rimshot", "ba dum tss", "drum rimshot"], "oneshot",
     "Drum rimshot; use right after a punchline."),
    ("comedy", "record_scratch_stop", ["vinyl scratch stop", "record stop scratch", "scratch stop"], "oneshot",
     "Record-stop scratch; use to freeze the frame on a twist."),
    ("comedy", "wrong_buzzer", ["wrong buzzer", "wrong answer buzzer", "incorrect buzzer"], "oneshot",
     "Wrong-answer buzzer; use when a claim or guess is wrong."),
    ("comedy", "kazoo", ["kazoo", "kazoo sound", "kazoo toot"], "oneshot",
     "Kazoo toot; use for a goofy, silly beat."),
    # tension
    ("tension", "heartbeat", ["heartbeat", "heart beat", "heartbeat fast"], "oneshot",
     "Heartbeat thump; use while the video holds on a suspenseful answer."),
    ("tension", "clock_ticking", ["clock ticking", "ticking clock", "clock tick"], "stinger",
     "Ticking clock; use for a countdown or a deadline."),
    ("tension", "suspense_drone", ["suspense drone", "tension drone", "dark drone"], "stinger",
     "Low suspense drone; use under a slow reveal or a warning."),
    ("tension", "alarm", ["alarm", "alarm buzzer", "alarm sound"], "oneshot",
     "Alarm buzz; use for a warning or something going wrong."),
    ("tension", "siren", ["siren", "police siren short", "siren short"], "stinger",
     "Short siren; use for an emergency-style gag or alert."),
    ("tension", "glitch", ["glitch", "digital glitch", "glitch sound"], "oneshot",
     "Digital glitch; use when a number or claim breaks."),
    ("tension", "static", ["radio static", "static noise burst", "static"], "oneshot",
     "Static burst; use for a signal drop or a cut to a bad feed."),
    ("tension", "distorted_hit", ["distorted hit", "distorted impact", "distorted boom"], "oneshot",
     "Distorted hit; use for a harsh, gritty impact on a wrong turn."),
    # success_fail
    ("success_fail", "success_chime", ["success chime", "success sound", "positive chime"], "oneshot",
     "Success chime; use when the answer checks out."),
    ("success_fail", "level_up", ["level up", "video game level up", "level up sound"], "oneshot",
     "Video-game level-up; use when a milestone is reached."),
    ("success_fail", "fail_buzzer", ["error buzzer", "fail buzzer", "error sound"], "oneshot",
     "Error/fail buzzer; use when a calculation or attempt fails."),
    ("success_fail", "game_over", ["game over", "game over sound", "game over jingle"], "stinger",
     "Game-over jingle; use when a run or attempt ends in failure."),
    # objects
    ("objects", "paper_slam", ["paper slam", "paper slap", "paper hit"], "oneshot",
     "Paper slammed on a table; use for a document or a paper reveal."),
    ("objects", "rubber_stamp", ["rubber stamp", "stamp sound", "stamp thud"], "oneshot",
     "Rubber stamp; use for an approval, a verdict or a 'denied' beat."),
    ("objects", "gavel", ["gavel", "judge gavel", "gavel bang"], "oneshot",
     "Gavel strike; use for a ruling or a final verdict."),
    ("objects", "cell_door", ["cell door", "prison door", "cell door slam"], "oneshot",
     "Cell door clang; use for a jail or trapped gag."),
    ("objects", "glass_shatter", ["glass shatter", "glass break", "glass breaking"], "oneshot",
     "Glass shattering; use when a claim or plan breaks."),
    ("objects", "explosion_small", ["small explosion", "explosion small", "explosion"], "oneshot",
     "Small explosion; use for a blow-up moment, sized for a graphic gag."),
    ("objects", "door_slam", ["door slam", "door slam loud", "door bang"], "oneshot",
     "Door slam; use for a storm-out or an abrupt exit."),
    ("objects", "footsteps", ["footsteps", "footsteps walking", "footsteps gravel"], "oneshot",
     "Footsteps; use under a walk-on or a character approaching."),
    # music
    ("music", "dramatic_sting", ["dramatic sting", "dramatic stinger", "dramatic orchestra hit"], "stinger",
     "Short dramatic orchestral sting; use for a big reveal or an ending."),
    ("music", "comedic_sting", ["comedic sting", "comedy sting", "funny music sting"], "stinger",
     "Short comedic music sting; use after a joke or a silly moment."),
    ("music", "jazz_bed", ["jazz bed", "jazz background music", "jazz loop"], "bed",
     "Looping jazz background bed; use under narration in lighter segments."),
    ("music", "lofi_bed", ["lofi", "lofi beat", "lofi hip hop"], "bed",
     "Lo-fi background bed; use under explainer narration."),
    ("music", "tense_bed", ["tense music", "tension bed", "suspense music"], "bed",
     "Tense background bed; use under a dramatic or tricky section."),
    ("music", "upbeat_bed", ["upbeat music", "upbeat background", "upbeat bed"], "bed",
     "Upbeat background bed; use for intros and energetic segments."),
]


def curl_text(url):
    r = subprocess.run(["curl", "-s", "-m", "60", "-A", UA, "-w", "\n%{http_code}", url],
                       capture_output=True, text=True)
    body, _, code = r.stdout.rpartition("\n")
    return (int(code) if code.strip().isdigit() else 0), body


def search(query):
    """Openverse CC0 search. Retries 3x on 500/503 (3 s sleep); 429 gets 30 s backoff."""
    url = API + "?" + urllib.parse.urlencode({"q": query, "license": "cc0", "page_size": 10})
    for attempt in range(4):
        code, body = curl_text(url)
        if code == 200:
            try:
                return json.loads(body).get("results", [])
            except json.JSONDecodeError:
                return []
        if code in (500, 503) and attempt < 3:
            time.sleep(3)
            continue
        if code == 429 and attempt < 3:
            time.sleep(30)
            continue
        print(f"   search failed (HTTP {code}): {query}", flush=True)
        return []
    return []


def download(url, dest):
    r = subprocess.run(["curl", "-sL", "-m", "180", "-A", UA, "-o", str(dest), "-w", "%{http_code}", url],
                       capture_output=True, text=True)
    return r.stdout.strip() == "200" and dest.exists() and dest.stat().st_size > 1000


def probe_duration(path):
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                        "-of", "default=nw=1:nk=1", str(path)], capture_output=True, text=True)
    try:
        return float(r.stdout.strip())
    except ValueError:
        return None


def peak_db(path):
    r = subprocess.run(["ffmpeg", "-hide_banner", "-nostats", "-i", str(path),
                        "-af", "volumedetect", "-f", "null", "-"], capture_output=True, text=True)
    m = re.search(r"max_volume: (-?[\d.]+) dB", r.stderr)
    return float(m.group(1)) if m else None


def make_final(raw, out, trim):
    cmd = ["ffmpeg", "-y", "-hide_banner", "-loglevel", "error", "-i", str(raw)]
    if trim:  # strip leading silence, one-shots only
        cmd += ["-af", "silenceremove=start_periods=1:start_threshold=-45dB"]
    cmd += ["-c:a", "libmp3lame", "-q:a", "2", str(out)]
    return subprocess.run(cmd).returncode == 0 and out.exists()


def tags_text(result):
    tags = result.get("tags") or []
    return " ".join(t.get("name", "") for t in tags if isinstance(t, dict))


def main():
    WORK.mkdir(exist_ok=True)
    manifest, seen_urls, seen_hashes, unfilled = [], set(), set(), []

    for cat, key, queries, kind, desc in ITEMS:
        lo, hi, trim = RANGES[kind]
        out_dir = ROOT / cat
        out_dir.mkdir(exist_ok=True)
        print(f"[{cat}/{key}] kind={kind}", flush=True)
        accepted, tries = [], 0

        for q in queries:
            if len(accepted) >= TARGET or tries >= MAX_TRY:
                break
            results = search(q)
            time.sleep(1.2)  # be polite to the API
            for r in results:
                if len(accepted) >= TARGET or tries >= MAX_TRY:
                    break
                url = r.get("url") or ""
                if not url or url in seen_urls or not url.lower().endswith(".mp3"):
                    continue
                if (r.get("license") or "").lower() != "cc0":
                    continue
                seen_urls.add(url)
                title = r.get("title") or ""
                if kind != "reaction" and VOICE_RE.search(f"{title} {tags_text(r)}"):
                    continue
                dur_ms = r.get("duration")
                if dur_ms is not None and not (lo <= dur_ms / 1000 <= hi):
                    continue

                tries += 1
                raw = WORK / f"{key}_{tries}.src"
                if not download(url, raw):
                    print("   download failed", flush=True)
                    continue
                digest = hashlib.md5(raw.read_bytes()).hexdigest()
                if digest in seen_hashes:
                    continue

                name = f"{key}_{len(accepted) + 1}"
                out = out_dir / f"{name}.mp3"
                if not make_final(raw, out, trim):
                    out.unlink(missing_ok=True)
                    continue
                dur, pk = probe_duration(out), peak_db(out)
                min_ok = 0.2 if trim else lo
                if dur is None or pk is None or dur < min_ok or dur > hi + 1:
                    out.unlink(missing_ok=True)
                    continue
                if pk < MIN_PEAK_DB:
                    print(f"   skip quiet ({pk} dB): {title}", flush=True)
                    out.unlink(missing_ok=True)
                    continue

                seen_hashes.add(digest)
                accepted.append({
                    "file": f"{cat}/{name}.mp3",
                    "category": cat,
                    "name": name,
                    "duration_s": round(dur, 2),
                    "peak_db": round(pk, 1),
                    "description": desc,
                    "title": title,
                    "creator": r.get("creator") or "",
                    "license": "CC0",
                    "license_version": r.get("license_version") or "1.0",
                    "source_url": r.get("foreign_landing_url") or url,
                })
                print(f"   kept {name}.mp3  {dur:.2f}s  {pk:.1f} dB  '{title}'", flush=True)

        if len(accepted) < TARGET:
            unfilled.append(f"{cat}/{key} ({len(accepted)}/{TARGET})")
        manifest.extend(accepted)

    # Drop any stale files from a previous build that are no longer in the manifest.
    kept = {m["file"] for m in manifest}
    for cat in {i[0] for i in ITEMS}:
        for p in (ROOT / cat).glob("*.mp3"):
            if f"{cat}/{p.name}" not in kept:
                p.unlink()

    (ROOT / "manifest.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n")

    lines = [
        "# CREDITS",
        "",
        "Every sound below is CC0 1.0 Universal (public domain dedication). No attribution is legally required;",
        "this table is kept as a courtesy and for source tracking. Copy the relevant rows into each video's",
        "`sfx/CREDITS.md`.",
        "",
        "| File | Title | Creator | License | Source |",
        "|---|---|---|---|---|",
    ]
    for m in manifest:
        def cell(s):
            return str(s).replace("|", "/").replace("\n", " ")
        lines.append(f"| `{m['file']}` | {cell(m['title'])} | {cell(m['creator'])} | "
                     f"CC0 {m['license_version']} | <{m['source_url']}> |")
    (ROOT / "CREDITS.md").write_text("\n".join(lines) + "\n")

    shutil.rmtree(WORK, ignore_errors=True)
    print("\nSUMMARY", flush=True)
    per_cat = {}
    for m in manifest:
        per_cat[m["category"]] = per_cat.get(m["category"], 0) + 1
    for cat in dict.fromkeys(i[0] for i in ITEMS):
        print(f"  {cat}: {per_cat.get(cat, 0)}", flush=True)
    print(f"  total files: {len(manifest)}", flush=True)
    print(f"  unfilled items: {unfilled or 'none'}", flush=True)
    print("DONE", flush=True)


if __name__ == "__main__":
    main()
