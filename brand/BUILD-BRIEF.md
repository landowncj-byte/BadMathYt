# Build brief for a Short (render/coding agent) — engine v2
You build THREE finished vertical videos (1080×1920) for one topic: root = YouTube, `tiktok/`, `ig/`. Scripts are final and voiced: each cut's `voice/` holds narration.wav, words.json, mouth.json, sentences.json, script.json and **beats.md** (the beat-by-beat direction: time · VISUAL · ON-SCREEN TEXT · SPOKEN). Do not post, commit, or change scripts/voice.

Read first: `RULES.md` (VIDEO GATE — your cuts must pass it), `brand/engine-v2/README.md`, `brand/VISUAL-V2.md` §0 (brand lock, no neon), each cut's `voice/beats.md`, the topic's `research.md` (only source of on-screen facts), and a finished reference: `videos/2026-11-25-one-percent-fee/_src/` (What If) or `videos/2026-11-25-bitconnect/_src/` + `videos/2026-11-25-tucker-payday/_src/` (Decoded) with their contact sheets.

Direction (follow beats.md exactly):
- Frame 0 = physical pattern-break slam with the hook text. Something meaningful changes every 2–3 s; no layout held > ~4 s.
- Camera push-in on every spoken number as it's said; storyteller travels (in front / behind / beside), never parked.
- CTA micro-moments on screen when voiced, small, ≤ 1.5 s: heart pulse (like), paper-plane flick (send), storyteller taps +FOLLOW (follow), comment bubble on the final question. No end CTA block, no banners.
- Biggest visual hit = the payoff; the video ends ≤ ~6 s later and whips back to the frame-0 composition (loop).
- Decoded: only facts from research.md graded ✔2/primary, attributed on screen ("PER DOJ", "PROSECUTORS SAID"), silhouettes labelled ILLUSTRATION, no real logos/photos, footnote with conviction + sources. What If: HYPOTHETICAL chip + assumptions footnote + "NOT FINANCIAL ADVICE"; numbers exactly as research.md.
- Captions: built from words.json (Whisper mishears). Compare with voice/sentences.json and use `captions.fix` so on-screen captions match the script wording (numbers formatted, no [tags]); set `captions.gap: 16` (prevents joined words).
- Scene duration = narration length + 0.4 s. Series: `whatif` or `decoded` as the brief says. Sound: CC0 sfx from brand/sfx-library, one hit per reveal on the same @word.

Steps per cut: `node brand/engine-v2/bm2.cjs init <cut>/build --voice <cut>/voice --series <series>` → write scene (shared `_src/` + per-cut files) → `check` → stills → fix collisions → `render` → `python3 brand/engine-v2/mix.py <cut>/build <cut>/voice <cut>/video.mp4` → 1-fps timestamped contact sheet at `<cut>/contact_sheet.png` → look at it and fix problems → `<cut>/captions.srt` from sentences.json → `python3 brand/tools/script_gate.py <folder> --all` must PASS → `qa.md` with the VIDEO GATE table per cut and an on-screen facts table.
**Render ONE cut at a time and wait for each render in the foreground (poll until the process ends). Never hand back while a render is running.** Keep each video < 40 MB (re-encode with a higher CRF if needed).
Final reply (short): three paths + durations + sizes, contact sheet paths, VIDEO GATE result per cut, open doubts.
