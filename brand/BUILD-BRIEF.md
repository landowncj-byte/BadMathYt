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

## Lessons from review (2026-11-25) — check these before handing back
1. Frame 0 shows the FULL hook text; the storyteller never covers it.
2. Keep all on-screen text, buttons and counters out of the caption band (screen y > ~1340) and never stack on-screen text over counters.
3. Temporary on-screen text exits cleanly; nothing lingers half-visible or blurred behind captions.

## Real photos and stock images (owner rule 2026-11-25)
- Every real person named in the video gets a REAL licensed photo if one exists: `python3 brand/tools/photos.py "<name>"` → `brand/photos/<slug>/` (+ credits.json). Look at the image and its description to confirm it is that person. Show it with the engine's `photo` element (paper frame, name tag, small credit). No licensed photo → silhouette card labelled ILLUSTRATION. Never AI-generate a real person's face.
- Use licensed stock/real-world images (same tool, or Canva-generated generic imagery labelled ILLUSTRATION) where a real object or place sells the beat. Photos live in paper frames; brand lock unchanged; no real logos.
- Put photo credits in the footnote ("PHOTOS: …, PUBLIC DOMAIN / CC BY-SA, VIA WIKIMEDIA COMMONS") and list them in qa.md.

## PHOTO PASS on an already-finished video (owner 2026-11-25: "update the scheduled stuff with real photos and stock images")
Goal: add real/stock imagery to a finished, queued topic WITHOUT changing script, voice, timing, pacing or the CTA beats.
1. Read `brand/photos/VERIFIED.md` (verified person photos) and the engine `photo` element docs in `brand/engine-v2/README.md` (example: `videos/2026-11-25-impossible-number/build2/src/`).
2. People: if the person is in VERIFIED.md, replace their silhouette/ILLUSTRATION card with the `photo` element (treatment 'mugshot' for booking photos, else 'paper'), name tag + small credit. If not listed, keep the silhouette.
3. Stock: add 1–3 real-world images where they sell a beat (place, object, document). Find them with `python3 brand/tools/photos.py "<query>" --n 6 --out brand/photos/stock` (Wikimedia Commons, licensed only). LOOK at every candidate and its description: correct subject, no visible brand logos, no identifiable private people, not graphic. Show it with the `photo` element in a paper/polaroid frame; never full-screen; brand lock unchanged. If nothing good turns up, skip stock rather than force it.
4. Credits: add "PHOTOS: <credit>, <license>, VIA WIKIMEDIA COMMONS" to the footnote and list every image in qa.md (file, page URL, license, author).
5. Re-render each changed cut with --force, ONE at a time, in the foreground; re-mix; regenerate the 1-fps contact sheet; re-run script_gate (must still PASS); check the VIDEO GATE + Lessons from review on real frames (photos must not cover numbers, captions or the hook). Keep files < 40 MB.
Final reply: per cut — what images were added where (with credits), file path/size, anything skipped.

## Covers / thumbnails (owner 2026-11-25: "update all of the thumbnails too")
Every Short gets `<folder>/cover.png` (1080×1920, < 2 MB, shared by all three cuts) and every long-form gets a 1280×720 thumbnail. Build it as a still in the v2 look (Ink stage, paper cards, no glows), from the scene's own elements: the topic's real photo (if VERIFIED) or best stock image in a paper/polaroid frame, the hook in big Anton text (≤ 5 words, readable at 200 px tall), one key number, the series pill. Keep the important text inside the centre 1080×1350 (IG grid crop) and away from the bottom 20% (platform UI). Render with the engine (`bm2.cjs stills` at a chosen frame, or a dedicated `cover` scene) and look at it full size and at 270×480. The cover is used as the TikTok/IG/FB cover image (coverImageKey) and the YouTube thumbnail.
