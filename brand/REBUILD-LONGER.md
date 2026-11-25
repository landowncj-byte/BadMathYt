# REBUILD-LONGER — remaking held Shorts to the new standard (owner 2026-11-25)

Owner: "I don't care about posting times, I care about quality… fix all the shorts."
Every held Short is rebuilt to RULES 101–102 + STYLE §22–24. All of its posts in PostFast are on HOLD (NEEDS_WORK) until the new version is done.

## Stage 1 — SCRIPTS (Fable agent)
For each topic you are given (folder `videos/<slug>/`, research in `research/2026-11-25/<topic>/` or `videos/<slug>/` qa.md/research notes):
1. Read RULES.md (SCRIPT GATE S1–S17 + S10b, rules 101–102), STYLE.md §14, §15, §18, §19, §21, §22, §23, §24, and the skills in `brand/skills/` (short-form-video-script, hook-writer, storytelling-and-narrative, tiktok-script, viral-hooks). Read the current scripts (`voice/script.json` in root, `tiktok/`, `ig/`) — they are the facts spine, but too short and rushed.
2. Save each current script as `voice/script.v2.json` (do not overwrite an existing script.v1.json).
3. Write THREE NEW scripts, each its own hook and order, in `[[line_with_tags, pause_s], ...]` format:
   - LENGTH by series, same for all three cuts — DECODED ~90 s (gate 80–100 s, ≤ 250 words); WHAT IF ~65 s (gate 58–72 s, ≤ 180 words). Owner: "90 seconds is the target timing… 65 seconds for the what ifs". The gate reads the series from build/scene.js (series: 'whatif'|'decoded') or voice/series.txt.
   - YouTube (root): ad-safe. TikTok (`tiktok/`): spicy, comment bait. IG/FB (`ig/`): most vulgar (no slurs). Different hooks/order/tone, same length.
4. KINDERGARTEN CLARITY (the whole point):
   - Set the scene before the first big number: who, what they did, why anyone trusted it.
   - Explain every term in plain words the first time.
   - One new idea per line. Never two numbers in one sentence.
   - Walk the trick step by step ("First… then… so now…").
   - Give every big number an everyday comparison (rent, a car, a year of groceries, a stadium).
   - Recap the key number once before the payoff.
   - Still a gripping story: stakes, mystery, twist, payoff.
5. Flow: full natural sentences (not chopped fragments). Add a `[beat]` or a pause of ≥ 0.6 s after every big number and every verdict. Write verdicts as "he was sentenced to ten years in prison".
6. Voice and CTAs:
   - Humanized: contractions, "Yeah." / "Wait.", one self-correction, and [breath]/[sigh]/[gasp]/[smack] tags. No um/uh and no laugh/chuckle.
   - Write numbers as spoken words (follow the existing pronunciation style).
   - CTAs spread out: like ~30%, send ~55%, follow ~80%. The comment question goes after the payoff. No end CTA block.
7. Facts: use ONLY facts already in the current scripts/captions/research. Decoded = court-proven; don't invent anything. If you want an everyday comparison, compute it yourself and note the math in `voice/beats-v3.md`.
8. Gate:
   - Write `voice/beats-v3.md` per cut, with three-track beats and ≥ 5 scored hook candidates, as the gate requires.
   - Run `python3 brand/tools/script_gate.py <cut> --script script.json` until each cut passes.
   - Then voice all three: `python3 brand/voice/voice_cut.py videos/<slug> videos/<slug>/tiktok videos/<slug>/ig`.
   - Run `python3 brand/tools/script_gate.py videos/<slug> --all` on real timings. It must PASS. If it fails, fix the lines and re-voice.
9. Read each finished script aloud in your head as a 10-year-old: anything confusing → rewrite.
10. Don't touch PostFast or build files. Commit nothing (the director commits). Report: per cut, the duration, word count, gate result, and the full script text.

## Stage 2 — BUILD (Sonnet agent)
The new narration is much longer, so this is a RE-EDIT, not a re-time.
1. Read brand/BUILD-BRIEF.md (all lessons, photos/stock, PHOTO PASS, RE-TIME rules), brand/VISUAL-V2.md, brand/engine-v2/README.md.
2. For each cut, rewrite the scene (`_src/*.js` → build/scene.js, as the existing cut does) against the new `voice/words.json` / `sentences.json`:
   - Every new line needs its own visual beat.
   - Explanations get simple diagrams (step 1 → step 2 → step 3 cards, everyday-comparison visuals like a car, rent or groceries).
   - Camera push-ins on spoken numbers, the storyteller moving in front of and behind the graphics.
   - Hold the shot through [beat] pauses; nothing static for more than ~2.5 s.
3. Keep the real licensed photos already used (credits in qa.md). Add clean, free, logo-free stock via brand/tools/stock.py where it helps the viewer understand.
4. Rules: no watermarks and no logos. Nothing in the caption band (y > ~1340). The frame-0 hook is visible. Temporary text exits cleanly. Scene duration = narration + 0.4 s. No neon.
5. Render with `bm2.cjs render --force` ONE cut at a time, mix, rebuild captions.srt, make the contact sheets, and LOOK at the real frames. Fix anything wrong. Run the VIDEO GATE in RULES.md.
6. Don't kill processes you didn't start (no broad pkill). Don't touch PostFast. Commit nothing. Report: file paths, durations, sizes, loudness, the gate results, and any issues.
