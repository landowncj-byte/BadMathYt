"""Human delivery for Shorts narration (user rule 2026-11-25: "add mistakes humans make while
speaking — uhms, breaths, things like that" + "more inhale and human noise sounds").
Script lines may contain:
  - fillers/self-corrections written as words: "um", "uh", "like", "she, uh, she had…", "four— no, four point two five"
  - inline sound tags: [breath] [gasp] [sigh] [sniff] [smack] [throat] [chuckle] [pause] [beat]
build(k, lines) -> (audio, sr, sentences) with tags turned into real CC0 human noises (brand/sfx-library/breath/),
plus automatic soft inhales before ~1 in 3 lines that don't already start with a tag.
SHOW text (captions) = the line with [tags] removed.
USER RULE 2026-11-25: NO "um"/"uh" fillers ("doesn't sound right at all") and NO [chuckle]/laugh ("hella out of place").
Both are stripped automatically below as a safety net."""
import re, glob, hashlib, numpy as np, soundfile as sf, subprocess, tempfile, os, sys
sys.path.insert(0, os.path.dirname(__file__))
from pronounce import say
LIB = os.path.join(os.path.dirname(__file__), '..', 'sfx-library', 'breath')
TAGS = {'breath': 'inhale_[1346]', 'gasp': 'inhale_2', 'sigh': 'sigh_*', 'sniff': 'sniff_*',
        'smack': 'lipsmack_*', 'throat': 'throat_*'}  # no chuckle (user rule)
GAIN = {'breath': 0.45, 'gasp': 0.55, 'sigh': 0.5, 'sniff': 0.45, 'smack': 0.5, 'throat': 0.5, 'chuckle': 0.55}
_cache = {}
def _h(s, salt): return int(hashlib.md5((salt + s).encode()).hexdigest()[:8], 16)
def _load(f, sr):
    if f not in _cache:
        fo = tempfile.mktemp(suffix='.wav')
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f, '-ar', str(sr), '-ac', '1', fo], check=True)
        _cache[f], _ = sf.read(fo, dtype='float32'); os.remove(fo)
    return _cache[f]
def noise(tag, key, sr):
    files = sorted(glob.glob(os.path.join(LIB, TAGS[tag] + '.wav')))
    a = _load(files[_h(key, tag) % len(files)], sr)
    if tag == 'breath': a = a[:int(0.55 * sr)]
    return a * GAIN[tag]
FILLER = re.compile(r'(?i)(,\s*)?\b(u+h*m+|u+h+|e+r+m+)\b[,.…]*\s*')
def clean(line):
    """Drop um/uh fillers and [chuckle]/[laugh] tags (user rule)."""
    line = re.sub(r'\[(chuckle|laugh)\]', '', line, flags=re.I)
    line = FILLER.sub(lambda m: (m.group(1) or '').strip() and ', ' or ' ', line)
    line = re.sub(r'\s+([,.!?])', r'\1', re.sub(r'\s{2,}', ' ', line)).strip()
    return line[:1].upper() + line[1:] if line[:1].islower() else line
def show_text(line): return re.sub(r'\s*\[(\w+)\]\s*', ' ', clean(line)).strip()
def _trim(a, sr):
    nz = np.where(np.abs(a) > 0.01)[0]
    return a[max(0, nz[0] - int(.02 * sr)): nz[-1] + int(.05 * sr)] if len(nz) else a
def build(k, lines, voice='am_liam', auto_breath=True):
    """lines: [(text_with_tags, pause_after_s)]. Returns audio, sr, sentences (start/end/show text)."""
    out, marks, t, sr = [], [], 0.0, 24000
    for i, (line, pause) in enumerate(lines):
        line = clean(line)
        parts = re.split(r'(\[\w+\])', line)
        if auto_breath and i > 0 and not line.strip().startswith('[') and _h(line, 'auto') % 3 == 0:
            parts = ['[breath]'] + parts
        seg = []
        start_t = None
        for p in parts:
            p = p.strip()
            if not p: continue
            m = re.fullmatch(r'\[(\w+)\]', p)
            if m:
                tag = m.group(1)
                if tag == 'pause': seg.append(np.zeros(int(0.35 * sr), 'float32')); continue
                if tag == 'beat': seg.append(np.zeros(int(0.7 * sr), 'float32')); continue  # owner: let big numbers land
                if tag in TAGS: seg += [noise(tag, line, sr), np.zeros(int(0.05 * sr), 'float32')]
                continue
            a, sr = say(k, p, voice=voice); a = _trim(a, sr)
            if start_t is None: start_t = t + sum(len(x) for x in seg) / sr
            seg += [a, np.zeros(int(0.06 * sr), 'float32')]
        y = np.concatenate(seg) if seg else np.zeros(1, 'float32')
        marks.append({'text': show_text(line), 'start': round(start_t if start_t is not None else t, 3),
                      'end': round(t + len(y) / sr, 3)})
        out += [y, np.zeros(int(pause * sr), 'float32')]; t += len(y) / sr + pause
    return np.concatenate(out).astype('float32'), sr, marks
