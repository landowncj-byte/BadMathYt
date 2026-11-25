#!/usr/bin/env python3
"""script_gate.py — mechanical SCRIPT GATE for Bad Math Shorts (see RULES.md).

Run on a cut folder BEFORE voicing (script only) and AGAIN after voicing (real timings):

  python3 brand/tools/script_gate.py videos/<slug>            # YouTube cut (root)
  python3 brand/tools/script_gate.py videos/<slug>/tiktok     # TikTok cut
  python3 brand/tools/script_gate.py videos/<slug>/ig         # IG/FB cut
  python3 brand/tools/script_gate.py videos/<slug>/ig --script script.v2.json   # un-voiced script: timings are estimated
  python3 brand/tools/script_gate.py videos/<slug> --all      # root + tiktok + ig

Reads <cut>/voice/script.json ([[line_with_tags, pause_s], ...]) and <cut>/voice/sentences.json
([{text,start,end}, ...]). With --script (or when sentences.json is missing / does not match the
script) timings are ESTIMATED from word counts (Liam ~3.3 words/s inside a line + pauses + tags).

Exit 0 = PASS (warnings allowed) · exit 1 = FAIL (reasons printed) · exit 2 = usage/file error.
Also enforces the script-writing skills (brand/skills/short-form-video-script, hook-writer): hook first
sentence <= 12 words, no throat-clearing opener, a beats*.md with three-track beats + >= 5 scored hook
candidates next to the script, word targets, loop hint.
It only checks what a machine can check. The judgement items (hook is outrageous AND true, twist,
facts grade, humanized feel) stay with the director — see the SCRIPT GATE in RULES.md.
"""
import json, os, re, sys

RATE = 3.3           # words/s inside a line (measured on the 2026-11-25 Liam cuts: 3.1–3.5)
TAG_S = 0.45         # seconds one [breath]/[sigh]/... adds
PLATFORM = {"": "YouTube", "tiktok": "TikTok", "ig": "IG/FB"}
# owner 2026-11-25: "90 seconds is the target timing" (Decoded) + "65 seconds for the what ifs" — same on every platform
SERIES_LEN = {"decoded": (80, 100, 250), "whatif": (58, 72, 180)}   # (min_s, max_s, max_words)

def series_of(cut_dir):
    """Series from voice/series.txt, else the scene file's series: 'whatif'|'decoded', else the slug; default decoded."""
    root = os.path.normpath(cut_dir)
    if os.path.basename(root) in ("tiktok", "ig"): root = os.path.dirname(root)
    for d in (cut_dir, root):
        f = os.path.join(d, "voice", "series.txt")
        if os.path.exists(f): return "whatif" if "what" in open(f).read().lower() else "decoded"
    for d in (cut_dir, root):
        for sub in ("build/scene.js",):
            f = os.path.join(d, sub)
            if os.path.exists(f):
                m = re.search(r"series:\s*['\"](\w+)", open(f).read())
                if m: return "whatif" if "what" in m.group(1).lower() else "decoded"
    return "decoded"
WIN = {"like": (0.20, 0.40), "share": (0.45, 0.65), "follow": (0.70, 0.90)}
MAX_GAP = 6.0        # s between the END of one number/question/turn sentence and the START of the next (pacing proxy)
MAX_LINE_S = 7.0     # one voiced line longer than this = a dead stretch on screen

RX = {
 "like":   r"\b(?:hit|smash|tap|drop)\s+(?:a\s+|that\s+|the\s+)?(?:like|heart)\b|\blike\s+(?:this|if)\b|\bdouble[- ]tap\b|\bheart\s+(?:this|it|if)\b",
 "share":  r"\b(?:send|share|forward|show)\s+(?:this|that|it)\b|\btag\s+(?:a|the|your|that)\b|\bneeds?\s+(?:to\s+see\s+)?this\b",
 "follow": r"\bfollow(?:ing)?\b(?!\s+the\s+money)|\bsubscribe\b",
 "save":   r"\bsave\s+(?:this|that|it)\b",
 "comment": r"\bcomments?\b|\btell\s+me\b|\bbe\s+honest\b|\bdrop\s+(?:it|your|a)\b",
}
BANNED = [
 (r"\b(?:um+|uh+|erm+|uhm+|hmm+)\b", "um/uh filler (owner: \"drop the uhms\")"),
 (r"\[(?:chuckle|laugh|laughs|laughter|giggle|lol)\]|\bha(?:ha)+\b", "laugh/[chuckle] tag (owner: \"that laugh is hella out of place\")"),
 (r"link\s+in\s+(?:the\s+|my\s+|our\s+)?bio", "\"link in bio\" (owner: \"we are avoiding link in bio\")"),
 (r"like\s+and\s+subscribe|smash\s+that", "\"like and subscribe\" reflex"),
 (r"follow\s+(?:for|to\s+see)\s+(?:more|the\s+next)|for\s+more\s+videos", "pitch CTA (\"follow for more / for the next one\") — owner: \"I don't want it to feel like a pitch\""),
 (r"welcome\s+back|in\s+today'?s\s+video|hey\s+guys", "slow intro phrase"),
 (r"\byou\s+should\s+(?:buy|invest)|guaranteed\s+returns?\s+for\s+you|\bexperts\s+say\b|\bstudies\s+show\b", "advice / vague-authority phrasing"),
 (r"\btape\b(?!\s+(?:measure|recorder))", "Tape mention in the voice (narrator never pitches Tape)"),
 (r"\bAI[- ]narrated\b", "\"AI-narrated\" (AI labels are OFF)"),
]
YT_PROFANITY = r"\b(?:shit\w*|f\*+\w*|fuck\w*|bastard|damn|ass|dumbass|bullshit|bitch\w*|asshole)\b|-ass\b"
TT_PROFANITY = r"\b(?:shit\w*|fuck\w*|bitch\w*|asshole)\b"
ALLOWED_TAGS = {"breath", "gasp", "sigh", "sniff", "smack", "throat", "pause", "beat"}
NUM = r"\d|\b(?:one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|thousand|million|billion|trillion|grand|percent|bucks|dollars?|half|double|triple|zero|mil)\b"
TURN = r"\?|\b(?:but|wait|except|nope|nah|turns\s+out|plot\s+twist|worse|dumber|instead|until|then|so\s+where|here's|guess|yeah|still|never|actually|okay|now)\b"
THROAT = r"\s*(?:so,?\s+)?(?:hey|hi|hello|what'?s up|welcome|okay so today|today|in this video|in today'?s|let'?s talk about|let me tell you|i want to talk|so i'?ve been|have you ever wondered|did you know|here'?s a (?:video|story)|this (?:video|is a video)|quick (?:story|video)|story time)\b"
STIFF = r"\b(?:do not|does not|did not|is not|are not|was not|were not|cannot|will not|would not|could not|should not|it is|that is|you are|they are|he is|she is|you would|you will|there is)\b"

def strip_tags(s): return re.sub(r"\s+", " ", re.sub(r"\[[^\]]*\]", " ", s)).strip()
def words(s): return re.findall(r"[A-Za-z0-9$%']+(?:[-.][A-Za-z0-9]+)*", strip_tags(s))

def load(cut_dir, script_name):
    vdir = os.path.join(cut_dir, "voice")
    sp = os.path.join(vdir, script_name or "script.json")
    if not os.path.isfile(sp): sys.exit(f"script_gate: no script at {sp}") if True else None
    script = json.load(open(sp))
    script = [[str(l), float(p)] for l, p in script]
    sent, est = None, True
    sj = os.path.join(vdir, "sentences.json")
    if not script_name and os.path.isfile(sj):
        s = json.load(open(sj))
        if len(s) == len(script): sent, est = s, False
    if sent is None:                                   # estimate timings
        t, sent = 0.0, []
        for line, pause in script:
            tags = len(re.findall(r"\[[^\]]*\]", line))
            d = len(words(line)) / RATE + TAG_S * tags
            sent.append({"text": strip_tags(line), "start": round(t + TAG_S * (1 if line.strip().startswith("[") else 0), 3), "end": round(t + d, 3)})
            t += d + pause + 0.15                       # + auto-inhale / join slack
        return script, sent, est, sp
    return script, sent, est, sp

def clauses(sent):
    """split every voiced line into sentences with interpolated times -> [(t0,t1,text)]"""
    out = []
    for s in sent:
        txt = s["text"]; parts = [p for p in re.split(r"(?<=[.?!…])\s+", txt) if p.strip()]
        tot = max(1, sum(len(p) for p in parts)); t = s["start"]; span = s["end"] - s["start"]
        for p in parts:
            d = span * len(p) / tot; out.append((t, t + d, p)); t += d
    return out

def find(kind, sent):
    """all matches of a CTA kind -> [(time_s, phrase)]"""
    hits = []
    for s in sent:
        for m in re.finditer(RX[kind], s["text"], re.I):
            frac = m.start() / max(1, len(s["text"]))
            hits.append((s["start"] + frac * (s["end"] - s["start"]), m.group(0)))
    return hits

def gate(cut_dir, script_name=None):
    cut = os.path.basename(os.path.normpath(cut_dir))
    key = cut if cut in ("tiktok", "ig") else ""
    name = PLATFORM[key]; ser = series_of(cut_dir)
    lo, hi, maxw = SERIES_LEN[ser]; name = f"{name} ({ser})"
    script, sent, est, sp = load(cut_dir, script_name)
    fails, warns, info = [], [], []
    raw = " ".join(l for l, _ in script); clean = strip_tags(raw)
    nwords = len(words(raw))
    dur = sent[-1]["end"] + script[-1][1]               # narration + closing pause (video adds ~0.4 s)
    pct = lambda t: f"{100 * t / dur:.0f}%"
    info.append(f"{name} cut · {len(script)} lines · {nwords} words · {dur:.1f} s ({'ESTIMATED' if est else 'voiced'} timings) · {sp}")

    # 1 duration + words
    if not lo <= dur <= hi: fails.append(f"DURATION {dur:.1f} s is outside the {name} window {lo}–{hi} s")
    elif est and not lo + 1.5 <= dur <= hi - 1.5: warns.append(f"estimated duration {dur:.1f} s is within 1.5 s of the {lo}–{hi} s limit — re-run after voicing")
    if nwords > maxw: (fails if nwords > maxw * 1.1 else warns).append(f"WORDS {nwords} > {maxw} target for {name}")

    if key == "tiktok" and 80 < nwords <= maxw: warns.append(f"{nwords} words — skill target is ~75 words ≈ 30 s on TikTok; cut-test every line again")
    vdir = os.path.dirname(sp)
    beats = [f for f in os.listdir(vdir) if f.startswith("beats") and f.endswith(".md")]
    if not beats: fails.append("NO beats*.md next to the script — write the three-track beats (time · VISUAL · ON-SCREEN TEXT · SPOKEN) and the scored hook candidates first (brand/skills/short-form-video-script + hook-writer)")
    else:
        b = open(os.path.join(vdir, sorted(beats)[-1])).read()
        if "ON-SCREEN TEXT" not in b or "VISUAL" not in b: fails.append(f"{sorted(beats)[-1]} has no three-track beat table (VISUAL · ON-SCREEN TEXT · SPOKEN)")
        rows = len(re.findall(r"^\|\s*\d+\s*\|[^|]+\|[^|]+\|\s*[0-2]\s*\|", b, re.M))
        if rows < 5: fails.append(f"{sorted(beats)[-1]} lists {rows} scored hook candidates (need 5–10 across different mechanisms, scored with the rubric)")
        if strip_tags(script[0][0])[:25].lower() not in strip_tags(b).lower(): warns.append("beats file does not contain the script's hook line — beats and script are out of sync")

    # 2 banned strings
    for rx, why in BANNED:
        m = re.search(rx, raw, re.I)
        if m: fails.append(f"BANNED: \"{m.group(0)}\" — {why}")
    for t in re.findall(r"\[([^\]]*)\]", raw):
        if t.lower() not in ALLOWED_TAGS and not re.match(r"chuckle|laugh|giggle|lol", t, re.I):
            warns.append(f"unknown sound tag [{t}] (allowed: {', '.join(sorted(ALLOWED_TAGS))})")
    if key == "" and re.search(YT_PROFANITY, clean, re.I):
        fails.append(f"PROFANITY on the YouTube cut: \"{re.search(YT_PROFANITY, clean, re.I).group(0)}\" (YouTube stays ad-safe: dumb/stupid/idiot only)")
    if key == "tiktok" and re.search(TT_PROFANITY, clean, re.I):
        fails.append(f"STRONG PROFANITY on TikTok: \"{re.search(TT_PROFANITY, clean, re.I).group(0)}\" (swap/bleep; keep For-You safe)")

    # 3 CTAs — spread, woven, never an end block
    hits = {k: find(k, sent) for k in RX}
    def in_win(k):
        a, b = WIN[k]; return [h for h in hits[k] if a <= h[0] / dur <= b]
    where = lambda k: ", ".join(f"\"{p}\" at {pct(t)}" for t, p in hits[k]) or "none"
    if key in ("", "tiktok"):
        for k in ("like", "share", "follow"):
            if not in_win(k):
                a, b = WIN[k]
                fails.append(f"CTA {k.upper()} missing in the {a*100:.0f}–{b*100:.0f}% window (found: {where(k)})")
    else:   # IG/FB: send/share (the metric that matters there) + at least one more, spread
        sh = [h for h in hits["share"] if 0.30 <= h[0] / dur <= 0.80]
        if not sh: fails.append(f"CTA SEND/SHARE missing in the 30–80% window on IG/FB (found: {where('share')})")
        other = [(k, h) for k in ("like", "follow", "save") for h in hits[k] if h[0] / dur < 0.92]
        if not other: fails.append("CTA: IG/FB needs send/share + one more (like, follow or save) before the ending")
        elif sh and min(abs(h[0] - sh[0][0]) for _, h in other) < 0.15 * dur:
            fails.append("CTA: the IG/FB asks are bunched together (< 15% of the video apart) — spread them")
    asks_end = [(k, t, p) for k in ("like", "share", "follow", "save", "comment") for t, p in hits[k] if t / dur >= 0.85]
    hard_end = [a for a in asks_end if a[0] != "comment"]
    if len({a[0] for a in asks_end}) >= 2:
        fails.append("END CTA BLOCK: " + " + ".join(f"{k} (\"{p}\" at {pct(t)})" for k, t, p in asks_end) + " all sit in the last 15% — owner: \"the ending CTA was terrible… spread out the CTA throughout the video\"")
    last = strip_tags(script[-1][0])
    if any(re.search(RX[k], last, re.I) for k in ("like", "share", "follow", "save")):
        fails.append(f"ENDING IS A PITCH: last line is an ask (\"{last}\") — the video must end on the payoff / twist / loop line (a comment question is the only ask allowed after the payoff)")
    all_asks = sorted((t, k) for k in ("like", "share", "follow", "save") for t, _ in hits[k])
    for (t1, k1), (t2, k2) in zip(all_asks, all_asks[1:]):
        if k1 != k2 and t2 - t1 < 0.10 * dur and not any("END CTA BLOCK" in f or "bunched" in f for f in fails):
            fails.append(f"CTA STACK: {k1} and {k2} are {t2 - t1:.1f} s apart — one ask per beat, spread out")
    if not [h for h in hits["comment"] if h[0] / dur >= 0.60] and not re.search(r"\?", " ".join(s["text"] for s in sent[-2:])):
        (warns if key == "ig" else fails).append("COMMENT PROMPT missing: no question / comment ask after the payoff (last two lines)")
    if hits["follow"] and min(t for t, _ in hits["follow"]) / dur < 0.15: warns.append("follow ask in the first 15% — nobody has a reason to follow yet")

    # 4 hook
    hook = strip_tags(script[0][0]); h1 = re.split(r"(?<=[.?!])\s+", hook)[0]; hw = len(words(h1))
    if hw > 12: fails.append(f"HOOK first sentence is {hw} words (max 12): \"{h1}\"")
    m = re.match(THROAT, hook, re.I)
    if m: fails.append(f"HOOK opens with throat-clearing (\"{m.group(0).strip()}\") — start on the claim / number / scene (hook-writer anti-patterns)")
    if not m and re.search(r"you won'?t believe|nobody (?:is )?talk(?:s|ing) about|the secret to", hook, re.I): fails.append("HOOK is a vague tease / dead template (hook-writer anti-patterns) — be specific")
    if sent[0]["end"] > 5.5: warns.append(f"hook line runs {sent[0]['end']:.1f} s — the outrageous part must land inside ~3 s")
    if re.match(r"\s*what if\b", hook, re.I): warns.append("hook opens with a soft \"What if…\" question — lead with the outrageous statement/number, put the What If on the pill")
    if not re.search(NUM, hook, re.I) and not re.search(r"\b(dumb|stupid|idiot|robbed|scam|fraud|con|played|insane|greedy)\w*", hook, re.I):
        warns.append("hook has no number and no edge word — does it stop a scroller?")

    # 5 pacing proxies
    cl = clauses(sent)
    bt = [(t0, t1) for t0, t1, tx in cl if re.search(NUM, tx, re.I) or re.search(TURN, tx, re.I)]
    edges = [(0.0, 0.0)] + bt + [(dur, dur)]
    worst = max((b[0] - a[1], a[1]) for a, b in zip(edges, edges[1:]))
    if worst[0] > MAX_GAP: fails.append(f"PACING: {worst[0]:.1f} s with no number / question / turn starting at {worst[1]:.1f} s (max {MAX_GAP} s)")
    for s in sent:
        d = s["end"] - s["start"]
        if d > MAX_LINE_S: fails.append(f"PACING: one line runs {d:.1f} s (max {MAX_LINE_S} s) — split it: \"{s['text'][:60]}…\"")
    numcount = [len(re.findall(r"(?:" + NUM + r")(?:[\s-]+(?:and\s+)?(?:" + NUM + r"))*", tx, re.I)) for _, _, tx in cl]
    for (t0, _, tx), n in zip(cl, numcount):
        if n >= 4: fails.append(f"NUMBER DUMP: {n} separate figures in one sentence at {t0:.1f} s: \"{tx[:70]}\"")
    run = 0
    for (t0, _, tx), n in zip(cl, numcount):
        bare = n >= 1 and len(words(tx)) <= 7 and not re.search(r"\?", tx)
        run = run + 1 if bare else 0
        if run == 3: fails.append(f"NUMBER LIST: three bare number sentences in a row ending at {t0:.1f} s — put a reaction or a question between them"); 
    # 5b sentence flow + breathing room (owner 2026-11-25: "pause after big numbers… the words feel chopped up and put together instead of actually a sentence")
    BIG = r"\b(hundred|thousand|million|billion|trillion|percent|years?|months?|grand)\b"
    frag_sents = [x for l, _ in script for x in re.split(r"(?<=[.!?])\s+", re.sub(r"\[[^\]]*\]", "", l)) if x.strip()]
    short = [x for x in frag_sents if len(words(x)) <= 3]
    if frag_sents and len(short) / len(frag_sents) > 0.25:
        fails.append(f"CHOPPY: {len(short)} of {len(frag_sents)} sentences are 3 words or fewer (max 25%) — write full spoken sentences (\"He got two hundred months in prison.\", not \"Guilty. Fourteen counts. Two hundred months.\"): " + " | ".join(short[:5]))
    run = 0
    for x in frag_sents:
        run = run + 1 if len(words(x)) <= 3 else 0
        if run == 3: fails.append(f"CHOPPY: three fragments in a row ending \"{x.strip()}\" — join them into one sentence"); break
    for i, (l, pz) in enumerate(script[:-1]):
        tail = re.sub(r"\[[^\]]*\]\s*$", "", l).strip()
        last_sent = re.split(r"(?<=[.!?])\s+", tail)[-1]
        if re.search(NUM, last_sent, re.I) and re.search(BIG, last_sent, re.I) and pz < 0.5 and not re.search(r"\[(pause|beat)\]\s*$", l):
            fails.append(f"NO BEAT after a big number: line {i+1} ends on \"{last_sent[:60]}\" with only {pz:.2f} s — give it ≥ 0.5 s (or end the line with [beat]) so it lands")
    setup_end = next((t0 for t0, _, tx in cl[1:] if re.search(r"\?|\b(but|wait|except|then|until|worse)\b", tx, re.I)), dur)
    if setup_end / dur > 0.30: warns.append(f"first turn/question after the hook comes at {pct(setup_end)} — setup is too long (target < 20%)")
    longest = max(len(words(l)) for l, _ in script)
    if longest > 26: warns.append(f"a line has {longest} words — break it up for the voice")

    stop = set("a an the and or but so if of to in on at it its it's is was that this you your for with one still would have what why how".split())
    kw = lambda t: {w.lower().strip("'") for w in words(t)} - stop
    if not (kw(script[0][0]) & kw(script[-1][0])): warns.append("LOOP: the last line shares no key word with the hook — does the ending flow back into frame 1? (director: confirm the visual loop)")

    # 6 humanize (warnings — the director judges feel)
    if re.search(STIFF, clean, re.I): warns.append(f"stiff phrasing \"{re.search(STIFF, clean, re.I).group(0)}\" — use contractions")
    tags = [t for t in re.findall(r"\[([^\]]*)\]", raw) if t.lower() in ALLOWED_TAGS]
    if not 1 <= len(tags) <= 3: warns.append(f"{len(tags)} sound tags (target 1–3 per Short: [breath] [sigh] [gasp] [smack])")
    if "—" not in raw and "--" not in raw and key != "ig": warns.append("no self-correction/restart (\"four— no, four point two\") — one per Short, never inside a Decoded fact")
    if not re.search(r"\byou(?:r|'re|'d|'ll)?\b", clean, re.I): warns.append("never talks to the viewer (\"you\")")

    return info, fails, warns

def main(argv):
    args = [a for a in argv if not a.startswith("--")]
    script_name = None
    if "--script" in argv:
        i = argv.index("--script"); script_name = argv[i + 1]; args = [a for a in args if a != script_name]
    if not args: print(__doc__); return 2
    cuts = []
    for a in args:
        cuts += [a, os.path.join(a, "tiktok"), os.path.join(a, "ig")] if "--all" in argv else [a]
    bad = 0
    for c in cuts:
        try: info, fails, warns = gate(c, script_name)
        except SystemExit as e: print(e); bad += 1; continue
        print(("FAIL  " if fails else "PASS  ") + info[0])
        for f in fails: print("   ✗ " + f)
        for w in warns: print("   · warn: " + w)
        bad += bool(fails)
    return 1 if bad else 0

if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
