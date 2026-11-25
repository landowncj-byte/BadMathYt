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
It only checks what a machine can check. The judgement items (hook is outrageous AND true, twist,
facts grade, humanized feel) stay with the director — see the SCRIPT GATE in RULES.md.
"""
import json, os, re, sys

RATE = 3.3           # words/s inside a line (measured on the 2026-11-25 Liam cuts: 3.1–3.5)
TAG_S = 0.45         # seconds one [breath]/[sigh]/... adds
PLATFORM = {         # cut folder -> (name, min_s, max_s, max_words)
    "": ("YouTube", 40, 55, 135), "tiktok": ("TikTok", 25, 40, 90), "ig": ("IG/FB", 15, 25, 60)}
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
ALLOWED_TAGS = {"breath", "gasp", "sigh", "sniff", "smack", "throat", "pause"}
NUM = r"\d|\b(?:one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|thousand|million|billion|trillion|grand|percent|bucks|dollars?|half|double|triple|zero|mil)\b"
TURN = r"\?|\b(?:but|wait|except|nope|nah|turns\s+out|plot\s+twist|worse|dumber|instead|until|then|so\s+where|here's|guess|yeah|still|never|actually|okay|now)\b"
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
    name, lo, hi, maxw = PLATFORM[key]
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
    if hw > 18: fails.append(f"HOOK first sentence is {hw} words (max 12): \"{h1}\"")
    elif hw > 12: warns.append(f"hook first sentence is {hw} words (target ≤ 12)")
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
    setup_end = next((t0 for t0, _, tx in cl[1:] if re.search(r"\?|\b(but|wait|except|then|until|worse)\b", tx, re.I)), dur)
    if setup_end / dur > 0.30: warns.append(f"first turn/question after the hook comes at {pct(setup_end)} — setup is too long (target < 20%)")
    longest = max(len(words(l)) for l, _ in script)
    if longest > 26: warns.append(f"a line has {longest} words — break it up for the voice")

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
