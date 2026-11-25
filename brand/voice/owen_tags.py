"""Auto-tag a Short script for Owen (ElevenLabs eleven_v4 audio tags) — owner rule 2026-11-25:
"make sure you auto tag the script via eleven labs and narrating".
usage:  python3 brand/voice/owen_tags.py <cut_dir> [--print]
Reads voice/script.json, writes voice/owen_prompt.txt (the exact text sent to ElevenLabs) and voice/owen_tags.json
(per line: tag(s) chosen + why). Rules (ElevenLabs guide: tags go right before the words they colour, hold until the
next tag, so only change them where delivery changes; describe HOW it is spoken):
  - NO non-verbal noise tags ever (owner: no breathing): never [sighs] [laughs] [gasps] [exhales] [chuckles] [clears throat].
  - Existing [breath]/[sigh]/... script tags are dropped; [beat]/[pause] become [short pause].
  - hook line .............. Decoded [dramatically] · What If [curious]
  - question lines ......... [curious]   ("yes or no?" / CTA questions -> [playfully])
  - "wait / nope / bullshit / no way" turns ... [surprised]
  - like/heart/send/follow/tag asks .......... [playfully]
  - verdict / sentence / convicted / pleaded . [seriously]
  - step-by-step lines ("Step one", "First,", "Then") [matter of fact]
  - payoff / big reveal (day thirty, ninety-nine percent, the winner line) [excited]
  - roast / profanity lines (IG) .............. [sarcastic]
  - a line whose last sentence lands a big number gets a trailing [short pause]
A tag is only written when it differs from the one in force. Edit voice/owen_tags.json 'override' to hand-tune a line."""
import json, os, re, sys
cut = sys.argv[1]; v = os.path.join(cut, 'voice')
lines = json.load(open(os.path.join(v, 'script.json')))
series = 'decoded'
for d in (cut, os.path.dirname(os.path.normpath(cut))):
    f = os.path.join(d, 'build', 'scene.js')
    if os.path.exists(f):
        m = re.search(r"series:\s*['\"](\w+)", open(f).read())
        if m: series = 'whatif' if 'what' in m.group(1).lower() else 'decoded'; break
ov_path = os.path.join(v, 'owen_tags.json')
overrides = {}
if os.path.exists(ov_path):
    for r in json.load(open(ov_path)):
        if r.get('override'): overrides[r['line']] = r['override']
NOISE = r'\[(breath|sigh|sighs|gasp|gasps|smack|sniff|throat|chuckle|chuckles|laugh|laughs|exhales?)\]'
BIGNUM = r'(million|billion|thousand|hundred|percent|years? in prison|years\b|grand\b|\bdollars\b)'
def pick(i, text):
    t = text.lower()
    if i == 0:
        if os.path.basename(os.path.normpath(cut)) == 'ig': return 'sarcastic', 'hook (IG roast cut)'
        return ('dramatically' if series == 'decoded' else 'curious'), 'hook'
    if re.search(r'\b(sentenced|convicted|pleaded guilty|jury|prison)\b', t): return 'seriously', 'verdict'
    if re.search(r'\b(hit like|tap the heart|double-tap|send this|follow|tag your|tag the)\b', t): return 'playfully', 'call to action'
    if re.search(r"^(wait|nope|nah|bullshit|no way|okay, rewind|rewind)\b", t) or re.search(r'\bwait, (why|that)', t): return 'surprised', 'turn'
    if re.search(r'\b(day thirty|ninety-nine percent|two wins out of three|win by|wins by|finally passes|nobody ever collected|not a .*cent|zero\.)', t): return 'excited', 'payoff'
    if re.search(r'\b(fuck\w*|shit\w*|dumbass|damn|hell|bullshit|idiot)\b', t): return 'sarcastic', 'roast'
    if re.search(r'^(step (one|two|three)|first,|then |one:|two:|three:)', t): return 'matter of fact', 'steps'
    if text.strip().endswith('?'):
        return ('playfully', 'closing question') if i == len(lines) - 1 else ('curious', 'question')
    return None, ''
out, rows, cur = [], [], None
for i, (line, pause) in enumerate(lines):
    text = re.sub(NOISE, '', line, flags=re.I)
    beat = bool(re.search(r'\[(beat|pause)\]\s*$', text))
    text = re.sub(r'\[(beat|pause)\]', '', text).strip()
    text = re.sub(r'\s+', ' ', text)
    tag, why = (overrides[i + 1], 'override') if i + 1 in overrides else pick(i, text)
    if not tag and cur in ('playfully', 'surprised', 'excited', 'sarcastic', 'curious'):
        tag, why = 'conversational', 'back to plain storytelling'   # a tag holds until the next one: reset after a coloured line
    piece = text
    if tag and tag != cur: piece = f'[{tag}] ' + piece; cur = tag
    last = re.split(r'(?<=[.?!])\s+', text)[-1]
    land = (beat or (pause >= 0.85 and re.search(BIGNUM, last, re.I))) and i < len(lines) - 1
    if land: piece += ' [short pause]'
    out.append(piece)
    rows.append({'line': i + 1, 'tag': tag, 'why': why, 'short_pause_after': bool(land), 'text': text, 'override': overrides.get(i + 1)})
prompt = ' '.join(out)
open(os.path.join(v, 'owen_prompt.txt'), 'w').write(prompt)
json.dump(rows, open(ov_path, 'w'), indent=1)
if '--print' in sys.argv: print(prompt)
print(f'{cut}: {len(prompt)} chars · {sum(1 for r in rows if r["tag"])} tagged lines · {sum(r["short_pause_after"] for r in rows)} short pauses')
