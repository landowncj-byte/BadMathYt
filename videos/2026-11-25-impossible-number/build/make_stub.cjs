// node make_stub.cjs  -> timeline.stub.json (temporary timings from paragraphs.json: 2.6 words/s + pause)
const fs = require('fs'), path = require('path');
const P = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'paragraphs.json'), 'utf8'));
let t = 0.2; const paragraphs = [];
for (const p of P) {
  const ws = p.text.split(/\s+/).filter(Boolean), dur = ws.length / 2.6, step = dur / ws.length;
  paragraphs.push({ id: p.id, chapter: p.chapter, start: +t.toFixed(3), end: +(t + dur).toFixed(3), text: p.text,
    words: ws.map((w, i) => ({ w, s: +(t + i * step).toFixed(3), e: +(t + i * step + step * .9).toFixed(3) })) });
  t += dur + (p.pause || 0.4);
}
fs.writeFileSync(path.join(__dirname, 'timeline.stub.json'), JSON.stringify({ duration: +(paragraphs[paragraphs.length - 1].end + 0.3).toFixed(3), paragraphs }));
console.log('stub duration', t.toFixed(1));
