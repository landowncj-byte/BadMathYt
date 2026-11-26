# Rendering Bad Math on the owner's PC (RTX 5070, 32 GB DDR5)

Owner rule (RULES 110): heavy renders run on the owner's PC. The cloud session writes scripts, voice and storyboards, reviews, and posts. A Claude Code session running ON the PC (in the "Bad Math" folder) does the renders.

## One-time setup (run in the PC's Claude Code session, inside the "Bad Math" folder)
1. Get the repo:
   - `git clone https://github.com/landowncj-byte/BadMathYt.git .` (or `git pull` if it's already there).
2. Install tools (Windows; winget is built in):
   - Node.js 22 LTS: `winget install OpenJS.NodeJS.LTS`
   - ffmpeg: `winget install Gyan.FFmpeg`
   - Python 3.12: `winget install Python.Python.3.12` (for mix.py / script_gate.py / voice_owen.py)
   - Restart the terminal afterwards.
3. Engine dependencies:
   - `cd brand/engine-v2 && npm install` (installs playwright)
   - `npx playwright install chromium`
   - Python: `pip install soundfile numpy faster-whisper` (faster-whisper only for voice alignment; it can stay in the cloud).
4. GPU check: `node brand/engine-v2/bm2.cjs check brand/engine-v2/demo-characters` should compile. For GPU WebGL in headless Chromium, the engine's launch args should include `--use-angle=d3d11 --enable-gpu --ignore-gpu-blocklist` on Windows. If bm2.cjs doesn't pass them yet, add a `BM2_GPU=1` switch that adds them, and verify with a 30-frame test render that frames match the CPU render and are much faster.

## Each render job
1. `git pull` (the cloud session pushes scene + voice files).
2. Render one cut at a time:
   - `node brand/engine-v2/bm2.cjs render <cut>/build --force --crf 24 --jobs 4`
   - With the GPU, `--jobs` can go higher; measure.
3. Mix:
   - `python brand/engine-v2/mix.py <cut>/build <cut>/voice <cut>/video.mp4`
4. Contact sheet:
   - `node brand/engine-v2/bm2.cjs sheet <cut>/build`
5. Commit + push ONLY the outputs the cloud session asks for (video.mp4 under 40 MB, contact_sheet.png, captions.srt).
   - Don't commit build/parts or other large temporary files.
6. Tell the cloud session it's done (or the owner tells it).

## Rules the PC session must follow
- Don't post anything (PostFast posting stays in the cloud session).
- Don't change scripts, voice or storyboards.
- Report render time per cut, so we can tune.
