"""Voice one cut: python voice_cut.py <cut_dir> [more dirs...]
Reads <cut>/voice/script.json ([[line_with_tags, pause], ...]); writes narration.wav (Liam via humanize.build),
sentences.json (SHOW text, from the script), words.json (Whisper word timings, for @word refs) and mouth.json (30 fps)."""
import json, math, subprocess, sys, os, tempfile, numpy as np, soundfile as sf
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from humanize import build
from kokoro_onnx import Kokoro
from faster_whisper import WhisperModel
k = Kokoro('/root/tts/kokoro-v1.0.onnx', '/root/tts/voices-v1.0.bin')
wm = WhisperModel('small.en', device='cpu', compute_type='int8')
for cut in sys.argv[1:]:
    v = os.path.join(cut, 'voice'); lines = json.load(open(os.path.join(v, 'script.json')))
    y, sr, sents = build(k, [tuple(l) for l in lines])
    sf.write(os.path.join(v, 'narration.wav'), y, sr); json.dump(sents, open(os.path.join(v, 'sentences.json'), 'w'), indent=1)
    t16 = tempfile.mktemp(suffix='.wav')
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', os.path.join(v, 'narration.wav'), '-ar', '16000', '-ac', '1', t16], check=True)
    a16, _ = sf.read(t16, dtype='float32'); os.remove(t16)
    segs, _ = wm.transcribe(a16, word_timestamps=True, language='en', beam_size=5)
    words = [{'w': w.word.strip(), 's': round(float(w.start), 3), 'e': round(float(w.end), 3)} for s in segs for w in (s.words or []) if w.word.strip()]
    json.dump(words, open(os.path.join(v, 'words.json'), 'w'), indent=1)
    fs = 16000 / 30; n = int(math.ceil(len(a16) / fs))
    rms = np.array([math.sqrt(float(np.mean(a16[int(i * fs):int((i + 1) * fs)].astype(np.float64) ** 2))) for i in range(n)])
    p = float(np.percentile(rms, 98)); json.dump([round(float(x), 3) for x in np.clip(rms / p, 0, 1)], open(os.path.join(v, 'mouth.json'), 'w'))
    print(f'{cut}: {len(y)/sr:.2f} s | ' + ' '.join(w['w'] for w in words), flush=True)
