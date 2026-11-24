"""Cue sheet for "The Impossible Number That Exposed Madoff".

Every cue is keyed to a paragraph id (P01..P57) or to a word inside one,
using the word timings in voice/timeline.json. Nothing is hard-coded in
seconds except small pre-roll / tail offsets that are named in the code.

Run `python3 build/cues.py` to print the cue list with times.
"""
import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TIMELINE = json.load(open(os.path.join(ROOT, "voice", "timeline.json")))
PARAS = {p["id"]: p for p in TIMELINE["paragraphs"]}
NARR_END = float(TIMELINE["duration"])
END_CARD = 15.0
TOTAL = NARR_END + END_CARD

# Number words that the script writes as digits in the timeline.
ALIAS = {"twenty": "20", "seventeen": "17", "six": "6", "eight": "8",
         "twentyseven": "27", "sixteen": "16", "fortyfour": "44"}


def _norm(tok):
    t = re.sub(r"[^a-z0-9]", "", tok.lower())
    return ALIAS.get(t, t)


def P(pid):
    """Start time of a paragraph."""
    return PARAS[pid]["start"]


def PE(pid):
    """End time of a paragraph."""
    return PARAS[pid]["end"]


def W(pid, word, nth=0):
    """Start time of the nth (0-based) occurrence of `word` inside paragraph `pid`."""
    key = _norm(word)
    hits = [w for w in PARAS[pid]["words"] if _norm(w["w"]) == key]
    if len(hits) <= nth:
        raise KeyError(f"word {word!r} (occurrence {nth}) not found in {pid}")
    return hits[nth]["s"]


# ---------------------------------------------------------------- chapter bounds
CH_BOUNDS = [0.0, P("P08"), P("P21"), P("P34"), P("P51"), TOTAL]


# ---------------------------------------------------------------- music beds
# Each bed is one stem per region: layers are looped with crossfades when the clip
# is shorter than the region, summed, loudnorm'd to -24 LUFS and faded at the edges.
# layer: (sfx file, gain dB before the stem loudnorm, loop?)
BEDS = [
    dict(name="cold_open", start=CH_BOUNDS[0], end=CH_BOUNDS[1], fade_in=0.5, fade_out=1.5,
         layers=[("sfx/bed_cold_drone.mp3", 0, True)]),
    dict(name="ch1_coupon", start=CH_BOUNDS[1], end=CH_BOUNDS[2], fade_in=0.5, fade_out=1.0,
         layers=[("sfx/bed_ch1_piano.mp3", 0, True),
                 ("sfx/bed_ch1_crackle.mp3", -12, True),
                 ("sfx/bed_ch1_projector.mp3", -14, True)]),
    dict(name="ch2_oil", start=CH_BOUNDS[2], end=CH_BOUNDS[3], fade_in=0.5, fade_out=1.0,
         layers=[("sfx/bed_ch2_drone.mp3", 0, True)]),
    dict(name="ch3_fund", start=CH_BOUNDS[3], end=CH_BOUNDS[4], fade_in=0.5, fade_out=1.0,
         layers=[("sfx/bed_ch3_beat.mp3", 0, True)]),
    # Chapter 4 runs into the end card (no voice after narration end), fades out over the last 3 s.
    dict(name="ch4_test_and_endcard", start=CH_BOUNDS[4], end=TOTAL, fade_in=0.5, fade_out=3.0,
         layers=[("sfx/bed_ch4_uplift.mp3", 0, True)]),
]


# ---------------------------------------------------------------- one-shot cues
# cue: name, sfx file, absolute time (s), clip length to use (s), gain dB, label
CUES = []


def cue(name, file, at, dur, gain=0.0, label=""):
    CUES.append(dict(name=name, file=f"sfx/{file}", at=round(at, 3), dur=dur, gain=gain,
                     label=label or name))


# Paragraph-start whooshes on cuts. Pre-roll 0.4 s so the whoosh peak lands on the cut.
WHOOSH_PARAS = ["P02", "P03", "P05", "P06", "P09", "P10", "P11", "P12", "P15", "P16",
                "P17", "P18", "P22", "P23", "P24", "P26", "P27", "P28", "P30", "P31",
                "P33", "P35", "P37", "P38", "P41", "P43", "P47", "P48", "P49", "P52",
                "P53", "P54", "P55", "P56", "P57"]
for i, pid in enumerate(WHOOSH_PARAS):
    f = "ws_whoosh.mp3" if i % 2 == 0 else "ws_swish.mp3"
    cue(f"whoosh_{pid}", f, P(pid) - 0.4, 1.0, -4, f"whoosh on {pid} start (cut)")

# Cold open
cue("slam_ticket", "paper_slam.mp3", P("P01"), 1.5, -2, "P01 start: trade ticket slams in")
cue("glitch_P02_twenty", "glitch.mp3", W("P02", "twenty"), 1.8, -4, "P02 'twenty': glitch hit")
cue("boom_P02_twenty", "boom.mp3", W("P02", "twenty"), 2.0, -3, "P02 'twenty': sub boom")
cue("glitch_P04", "glitch.mp3", P("P04"), 1.8, -4, "P04 start: glitch hit (counter)")
cue("boom_P04", "boom.mp3", P("P04"), 2.0, -3, "P04 start: sub boom (screen shake)")
cue("cash_P04_billion", "cash_register.mp3", W("P04", "billion"), 3.0, -4,
    "P04 'billion': counter lands on $65B")
cue("thump_P06_coupon", "thump.mp3", W("P06", "coupon"), 1.0, -4, "P06 'coupon': folder lands")
cue("thump_P06_tank", "thump.mp3", W("P06", "tank"), 1.0, -4, "P06 'tank': folder lands")
cue("thump_P06_fund", "thump.mp3", W("P06", "fund"), 1.0, -4, "P06 'fund': folder lands")
cue("typewriter_P05", "typewriter.mp3", W("P05", "a", nth=1), 3.0, -6,
    "P05 'a number that cannot exist': typed out")

# Title card (end of P07, on the word that ends "Ponzi scheme")
cue("glitch_title", "glitch.mp3", W("P07", "scheme"), 1.8, -4, "P07 'scheme': title card glitch")
cue("boom_title", "boom.mp3", W("P07", "scheme"), 2.0, -3, "P07 'scheme': title card boom")

# Chapter tape stops, ending at the start of each chapter card
for pid, label in [("P08", "chapter one"), ("P21", "chapter two"),
                   ("P34", "chapter three"), ("P51", "chapter four")]:
    cue(f"tapestop_{pid}", "tape_stop.mp3", P(pid) - 1.6, 2.0, -6,
        f"{pid} start: tape stop into {label} card")

# Chapter 1
cue("flash_Ponzi", "camera_flash.mp3", W("P09", "Ponzi"), 2.8, -4, "P09 'Ponzi': silhouette flash")
cue("typewriter_P14", "typewriter.mp3", P("P14"), 3.0, -6, "P14 start: typewriter (newspaper)")
cue("flash_Barron", "camera_flash.mp3", W("P14", "Barron"), 2.8, -4, "P14 'Barron': silhouette flash")
cue("crowd_P12_P13", "crowd.mp3", P("P12"), PE("P13") - P("P12"), -12,
    "P12-P13: crowd under the investor line")
cue("cash_P12_million", "cash_register.mp3", W("P12", "million"), 3.0, -4,
    "P12 'million': $ per day counter")
cue("stamp_P11_legal", "stamp.mp3", W("P11", "legal"), 1.2, -3, "P11 'legal': LEGAL stamp")
cue("stamp_P13_police", "stamp.mp3", W("P13", "police"), 1.2, -3, "P13 'police': 75% stamp")
cue("heartbeat_P15", "heartbeat.mp3", P("P15") - 3.0, 3.6, -4,
    "before P15: heartbeat into the 160M reveal")
cue("demolition_P18_banks", "demolition.mp3", W("P18", "banks"), 5.0, -6,
    "P18 'banks': six banks crumble")
cue("coins_P19_estate", "coins.mp3", W("P19", "estate"), 2.4, -5, "P19 'estate': coins drop")
cue("typewriter_P19", "typewriter.mp3", P("P19"), 3.0, -6, "P19 start: dictionary entry typed")

# Chapter 2
cue("flash_Angelis", "camera_flash.mp3", W("P22", "Angelis"), 2.8, -4,
    "P22 'De Angelis': silhouette flash")
cue("pipes_P27", "pipes.mp3", W("P27", "pipes"), 4.0, -6, "P27 'pipes': pipes move the oil")
cue("stamp_P24_vouched", "stamp.mp3", W("P24", "vouched"), 1.2, -3, "P24 'vouched': CERTIFIED stamp")
cue("stamp_P26_hatch", "stamp.mp3", W("P26", "hatch"), 1.2, -3, "P26 'hatch': OIL stamp")
cue("stamp_P29_existed", "stamp.mp3", W("P29", "existed"), 1.2, -3, "P29 'existed': 94% stamp")
cue("stamp_P30_margin", "stamp.mp3", W("P30", "margin"), 1.2, -3, "P30 'margin': MARGIN CALL stamp")
cue("glass_P30_cracked", "glass_crack.mp3", W("P30", "cracked"), 2.5, -4, "P30 'cracked': glass crack")
cue("stamp_P31_bankrupt", "stamp.mp3", W("P31", "bankrupt"), 1.2, -3, "P31 'bankrupt': AMEX stamp")
cue("cell_P32", "cell_door.mp3", P("P32"), 3.0, -4, "P32 start: prison bars slam")

# Re-hook at end of P33
cue("glitch_P33_end", "glitch.mp3", PE("P33"), 1.8, -4, "P33 end: glitch re-hook")
cue("boom_P33_end", "boom.mp3", PE("P33"), 2.0, -3, "P33 end: sub boom")

# Chapter 3
cue("flash_Madoff", "camera_flash.mp3", W("P35", "Madoff"), 2.8, -4, "P35 'Madoff': silhouette flash")
cue("glitch_P39_perfect", "glitch.mp3", W("P39", "perfect"), 1.8, -4, "P39 'perfect': key visual glitch")
cue("boom_P39_perfect", "boom.mp3", W("P39", "perfect"), 2.0, -3, "P39 'perfect': sub boom")
cue("stamp_P39_perfect", "stamp.mp3", W("P39", "perfect"), 1.2, -2, "P39 'perfect': TOO PERFECT stamp")
cue("flash_Markopoulos", "camera_flash.mp3", W("P40", "Markopoulos"), 2.8, -4,
    "P40 'Markopoulos': silhouette flash")
cue("clock_P40", "clock_tick.mp3", P("P40"), 5.9, -6, "P40 start: stopwatch ticks (5 min -> 4 hours)")
cue("heartbeat_P42", "heartbeat.mp3", P("P42") - 3.0, 3.6, -4, "before P42: heartbeat into the options reveal")
cue("stamp_P42_impossible", "stamp.mp3", W("P42", "impossible"), 1.2, -3, "P42 'impossible': IMPOSSIBLE stamp")
cue("slam_P44_memo", "paper_slam.mp3", P("P44"), 1.5, -2, "P44 start: 2005 memo slams in")
# Eight magnifier pops across P45, each gets a NO FRAUD FOUND stamp.
_p45 = P("P45"), PE("P45")
for k in range(8):
    t = _p45[0] + 0.5 + k * (_p45[1] - _p45[0] - 1.0) / 7
    cue(f"stamp_P45_{k + 1}", "stamp.mp3", t, 1.2, -4, f"P45 magnifier {k + 1}/8: NO FRAUD FOUND")
cue("cash_P46_billion", "coins.mp3", W("P46", "billion"), 2.4, -4,
    "P46 'billion': withdrawal counter")
cue("stamp_P48_arrested", "stamp.mp3", W("P48", "arrested"), 1.2, -3,
    "P48 'arrested': ARRESTED stamp")
cue("cell_P50", "cell_door.mp3", P("P50"), 3.0, -4, "P50 start: prison door")
cue("stamp_P50_150", "stamp.mp3", W("P50", "150"), 1.2, -3, "P50 '150': 11 FELONIES stamp")

# Chapter 4
cue("slam_P55_folder1", "stamp.mp3", W("P55", "three"), 1.2, -3, "P55 'three': CAUGHT BY MATH stamp 1")
cue("stamp_P55_2", "stamp.mp3", W("P55", "different"), 1.2, -3, "P55 'different': CAUGHT BY MATH stamp 2")
cue("stamp_P55_3", "stamp.mp3", W("P55", "pattern"), 1.2, -3, "P55 'pattern': CAUGHT BY MATH stamp 3")


# ---------------------------------------------------------------- summary
def print_cues():
    rows = [(c["at"], c["label"], c["file"], c["dur"], c["gain"]) for c in CUES]
    rows += [(b["start"], f"BED {b['name']} starts", ", ".join(l[0] for l in b["layers"]),
              b["end"] - b["start"], 0) for b in BEDS]
    rows.sort()
    print(f"{len(CUES)} one-shot cues, {len(BEDS)} music beds, total {TOTAL:.2f}s")
    for at, label, f, dur, g in rows:
        print(f"{at:9.2f}s  {label:<62} {f}  dur={dur:.2f} gain={g}")


if __name__ == "__main__":
    print_cues()
