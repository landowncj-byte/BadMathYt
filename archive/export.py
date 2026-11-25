"""Back up the current Claude Code conversation into the repo (see HANDOFF.md §9).
Writes archive/conversation-<date>.md (readable: user messages + assistant replies only)
and archive/transcript-<date>.jsonl.gz (full raw, secrets/emails redacted).
usage: python3 archive/export.py          # readable conversation-latest.md (cheap, run often)
       python3 archive/export.py --raw    # also the full raw transcript-latest.jsonl.gz (~20 MB; only at compaction/handoff)"""
import glob, gzip, json, os, re, datetime, sys
ROOT = os.path.dirname(os.path.abspath(__file__))
files = sorted(glob.glob('/root/.claude/projects/-home-user-badmathyt/*.jsonl'), key=os.path.getmtime)
if not files: raise SystemExit('no transcript found')
src = files[-1]
today = datetime.date.today().isoformat()
RED = [(re.compile(r'eyJ[A-Za-z0-9_\-]{10,}\.[A-Za-z0-9_\-]{10,}\.[A-Za-z0-9_\-]{10,}'), '[REDACTED-JWT]'),
       (re.compile(r'(token=)[A-Za-z0-9_\-\.]+'), r'\1[REDACTED]'),
       (re.compile(r'("confirmToken"\s*:\s*")[^"]+'), r'\1[REDACTED]'),
       (re.compile(r'[A-Za-z0-9._%+\-]+@(?!anthropic\.com)[A-Za-z0-9.\-]+\.[A-Za-z]{2,}'), '[REDACTED-EMAIL]'),
       (re.compile(r'(sk-[A-Za-z0-9]{8})[A-Za-z0-9\-_]+'), r'\1[REDACTED]')]
def red(s):
    for r, t in RED: s = r.sub(t, s)
    return s
raw = open(src, encoding='utf-8').read()
if '--raw' in sys.argv:
    with gzip.open(os.path.join(ROOT, 'transcript-latest.jsonl.gz'), 'wt', encoding='utf-8') as g: g.write(red(raw))
out = [f'# Bad Math — conversation export ({today})\n\nSource transcript: `{os.path.basename(src)}`. User messages and assistant replies only (tool calls omitted). Secrets/emails redacted.\n']
def texts(content):
    if isinstance(content, str): return [content]
    return [b.get('text', '') for b in content if isinstance(b, dict) and b.get('type') == 'text']
n = 0
for line in raw.splitlines():
    try: e = json.loads(line)
    except Exception: continue
    t = e.get('type'); m = e.get('message') or {}
    if t not in ('user', 'assistant'): continue
    for tx in texts(m.get('content', '')):
        tx = tx.strip()
        if not tx: continue
        if t == 'user':
            tx = re.sub(r'<system-reminder>.*?</system-reminder>', '', tx, flags=re.S).strip()
            if not tx or tx.startswith('<') and 'agent-message' in tx[:40]: continue
            out.append(f'\n---\n**USER** ({e.get("timestamp","")[:16]}):\n\n{red(tx)}\n'); n += 1
        else:
            out.append(f'\n**ASSISTANT:**\n\n{red(tx)}\n')
open(os.path.join(ROOT, 'conversation-latest.md'), 'w', encoding='utf-8').write(''.join(out))
print('exported', src, '→ conversation-latest.md', f'({n} user messages)', '+ transcript-latest.jsonl.gz' if '--raw' in sys.argv else '')
