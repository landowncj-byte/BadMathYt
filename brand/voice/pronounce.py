"""Bad Math pronunciation layer for the free Kokoro voice (user rule 2026-11-24:
"make it say every word the way it's supposed to be pronounced").

How it works: the whole sentence is phonemized normally (so prosody stays natural),
then any word in FIX has its wrong phonemes swapped for the correct IPA before
synthesis (Kokoro create(..., is_phonemes=True)). Captions ALWAYS come from the
script text (what we SHOW), never from Whisper and never from respellings.

Usage:
    from pronounce import say, audit
    audio, sr = say(k, "This dumbass gave his own firm unlimited credit.")
    audit(k, text)   # prints phonemes for capitalized / rare / profane words to review
Add a word: run audit(), compare to how a native speaker says it, add {word: ipa}.
"""
import re
# word (case-insensitive, matched as a whole word) -> correct IPA (Kokoro/espeak symbols)
FIX = {
    "dumbass":        "dˈʌmæs",            # not "dumb-bass"
    "dumbasses":      "dˈʌmæsɪz",
    "jackass":        "dʒˈækæs",
    "Theranos":       "θɚɹˈænoʊs",         # thuh-RAN-ohss
    "Alameda":        "ˌæləmˈiːdə",        # al-uh-MEE-duh
    "Madoff":         "mˈeɪdɔf",           # MAY-doff
    "misappropriate": "mˌɪsɐpɹˈoʊpɹiˌeɪt",
    "misappropriated":"mˌɪsɐpɹˈoʊpɹiˌeɪɾᵻd",
    "VIP":            "vˌiːˌaɪpˈiː",
    "FTX":            "ˌɛftˌiːˈɛks",
    "APR":            "ˌeɪpˌiːˈɑːɹ",        # A-P-R (spaced "A P R" reads as "uh P R")
    "SEC":            "ˌɛsˌiːsˈiː",
    "CEO":            "sˌiːˌiːˈoʊ",
    "Bankman-Fried":  "bˈæŋkmənfɹˈiːd",    # FREED
    "Fyre":           "fˈaɪɚ",
    "Ponzi":          "pˈɑːnzi",
    "Holmes":         "hˈoʊmz",
    "Jacobson":       "dʒˈeɪkəbsən",       # JAY-kub-sun
}
_WORD = re.compile(r"[A-Za-z][A-Za-z'\-]*")

def _default(tk, w):
    return tk.phonemize(w).strip()

def phonemes(k, text):
    tk = k.tokenizer
    ph = tk.phonemize(text)
    for w, ipa in FIX.items():
        if re.search(r"(?<![A-Za-z])" + re.escape(w) + r"(?![A-Za-z])", text, re.I):
            wrong = _default(tk, w)
            if wrong and wrong in ph:
                ph = ph.replace(wrong, ipa)
            else:
                print(f"[pronounce] WARN could not place fix for {w!r} (default {wrong!r}) in: {ph}")
    return ph

def say(k, text, voice="am_michael", speed=1.12):
    return k.create(phonemes(k, text), voice=voice, speed=speed, lang="en-us", is_phonemes=True)

COMMON = set("""the a an and or but of to in on at for with by from is was were are be been it its this that these those he she they his her their you your
i we our my me him them as so if then than not no yes one two three four five six seven eight nine ten hundred thousand million billion dollars dollar
year years day days money time out up down over about just all every more most what who how why when where""".split())
def audit(k, text):
    """Print phonemes of words most likely to be butchered: names, acronyms, profanity, long/rare words."""
    tk = k.tokenizer
    for w in sorted(set(_WORD.findall(text)), key=str.lower):
        lw = w.lower()
        risky = (w[0].isupper() and lw not in COMMON) or w.isupper() or len(w) >= 9 or \
                re.search(r"ass|shit|fuck|damn|bitch", lw)
        if risky:
            mark = "FIXED" if any(lw == f.lower() for f in FIX) else "check"
            print(f"  {mark:5s} {w:20s} {FIX.get(w) or _default(tk, w)}")


# ---------------------------------------------------------------------------
# ENERGY MODE (user rule 2026-11-25: "more energy, more sporadic, almost crazy")
# Per-line variation so the delivery never sits still: fast base speed with a
# deterministic jitter per line, a per-line pitch lift (rubberband, formants kept),
# punchier punctuation on short lines, and tight gaps. Captions stay the SHOW text.
import hashlib, subprocess, tempfile, os
import numpy as _np, soundfile as _sf

def _rnd(text, salt):
    h = hashlib.md5((salt + text).encode()).hexdigest()
    return int(h[:8], 16) / 0xFFFFFFFF          # 0..1, same every run for the same line

def energize_text(text):
    t = text.strip()
    words = len(t.split())
    if words <= 6 and t.endswith('.'):           # short punch lines -> exclamation
        t = t[:-1] + '!'
    return t

def _pitch(a, sr, semis):
    if abs(semis) < 0.05: return a
    fi = tempfile.mktemp(suffix='.wav'); fo = tempfile.mktemp(suffix='.wav')
    _sf.write(fi, a, sr)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', fi, '-af',
                    f'rubberband=pitch={2 ** (semis / 12):.5f}:formant=preserved', fo], check=True)
    b, _ = _sf.read(fo, dtype='float32'); os.remove(fi); os.remove(fo)
    return b

def say_energy(k, text, voice='am_michael', base=1.24, spread=0.14, pitch_lo=0.6, pitch_hi=2.4):
    """Energetic line read. Returns (audio, sr, gap_seconds_suggested)."""
    words = len(text.split())
    sp = base + (_rnd(text, 's') - 0.5) * 2 * spread          # e.g. 1.10 .. 1.38
    if words <= 5: sp += 0.06                                  # short lines snap
    if any(c.isdigit() for c in text) or 'percent' in text or 'dollars' in text: sp -= 0.05  # numbers land
    a, sr = k.create(phonemes(k, energize_text(text)), voice=voice, speed=sp, lang='en-us', is_phonemes=True)
    a = _pitch(a, sr, pitch_lo + _rnd(text, 'p') * (pitch_hi - pitch_lo))
    gap = 0.06 + _rnd(text, 'g') * 0.14                       # 0.06 .. 0.20 s
    return a, sr, gap

# DEFAULT SHORTS VOICE (2026-11-25): option 5 = 50/50 blend of am_michael + am_puck, read with say_energy().
def default_voice(k):
    return 0.5 * k.get_voice_style('am_michael') + 0.5 * k.get_voice_style('am_puck')
