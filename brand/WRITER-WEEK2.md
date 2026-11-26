# WRITER BRIEF: Shorts for Wed 12/2 → Sun 12/6 (Opus writers; director = main session)

The research for each topic is in `research/2026-11-28/<research-slug>/research.md`. The schedule and photo table are in `research/2026-11-28/ideas.md`.
Follow `brand/REBUILD-LONGER.md` Stage 1, the PLAYBOOK add-on, RULES 104/105 and the AUTO-TAG section, `brand/CRIME-SHOW.md` (crime-show storytime, recurring villain / YOU character), and RULES 112–114 (no part twos: each topic is told completely in one Short).

## Per topic
1. Create `videos/<folder>/` with `voice/`, `tiktok/voice/`, `ig/voice/`. Write `voice/series.txt` (`decoded` or `whatif`) in all three cuts.
2. Write 3 scripts (`voice/script.json`, `tiktok/voice/script.json`, `ig/voice/script.json`) in `[[line, pause_s], ...]` format.
   - YouTube = ad-safe; TikTok = spicy comment bait; IG = most vulgar (no slurs).
   - Each cut gets its own hook and order.
   - Write `voice/beats-v3.md` per cut, with hook-ladder candidates and the AV notes the builder needs: what is on screen per line and where the villain photo or illustration card appears (at least 5 times for Decoded).
3. LENGTH (owner: every Short must be OVER 60 s; Owen reads about 2.9 words/s with pauses):
   - What If: 195–215 words, so about 66–74 s.
   - Decoded: 240–265 words, so about 82–92 s.
   - The gate's estimate runs about 13% long, so trust the real timing after voicing.
4. FACTS: use only ✔2/✔1 facts from research.md. Obey every "say X, not Y" caution in it. Drop ⚠ items. Put your everyday-comparison math in beats-v3.md.
5. Gate: `python3 brand/tools/script_gate.py <cut> --script script.json`, run per cut until it passes.
6. VOICE (Owen, one take per cut, never retry a paid call blindly):
   1. Run `python3 brand/voice/owen_tags.py <cut>`.
   2. Call ElevenLabs `creative_generate_speech` with voice_id `83MXTnoLsr3jX4Sl4gL4`, model eleven_v4, generations_count 1, and text = contents of `<cut>/voice/owen_prompt.txt`.
   3. Poll `creative_get_flow_run_status` until it finishes, then `curl -s -o <cut>/voice/owen/take.mp3 <content_url>`.
   4. Run `/root/tts/.venv/bin/python brand/voice/voice_owen.py <cut> <cut>/voice/owen/take.mp3 </dev/null`.
   5. Check the result:
      - REQUIRED: duration > 61.0 s for every cut.
      - If it is under, add a line or two and re-voice. A re-voice spends credits, so get the length right first time.
      - Also check that unmatched lines are none or only number-only lines.
7. Write `qa.md` in the topic root:
   - the 3 durations and word counts;
   - the villain photo plan, from the ideas.md photo table: real licensed photos only, paths plus licence; where none exists, use an illustration card labelled as an illustration, never a fake "photo";
   - this status line: `## CRIME-SHOW BUILD STATUS` followed by `VOICED READY` (the builder adds RENDERED READY later).

## Rules
- No logos or watermarks. Never state a con's claim as our own fact. Verdicts are worded exactly per research.
- Wells Fargo: the bank "admitted" or "agreed to pay"; never "convicted".
- Don't touch PostFast, git, builds or other topics' folders. Max 1 ElevenLabs call per cut, plus a fix only if under 61 s.
- Report at the end, per topic: folder, the 3 durations, the hook of each cut, and any fact caution you applied.
