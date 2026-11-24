# The Bad Math Storyteller (character bible)
One recurring, original character in every video. Source of truth: `brand/storyteller.js`, loaded by every video's `scene.html` with `<script src="../../../brand/storyteller.js"></script>`. Never redraw him by hand; change the module and every video stays consistent.

**Look:** a gold coin for a head (ridged edge, inner rim, warm gradient), big white eyes, brown brows, rosy cheeks, a small mouth. Navy suit (#2c3e66, edge #6f86b8), white shirt V, red bowtie (#FF3B30). A soft yellow rim glow behind him so he reads on dark scenes.
**Personality:** a curious, dry-humored guide. Reacts, points, shrugs. **No name, never claims to be an expert, never gives advice, never pitches anything.**
**Placement:** bottom-right at x≈842, feet at y≈1545 (1080×1920), scale 1.12. Kept left of the TikTok/Shorts/Reels button rail (nothing past x≈940). Captions sit to his left (center x≈420–460, max width 600–620) and the footnote is left-aligned.
**Poses:** idle · point (at the stage) · chin (thinking) · shock (reveals, record scratches) · shrug (dilemmas) · you (points at the viewer) · wave · follow (taps the follow button). See `character-sheet.png`.
**Lip-sync:** mouth = narration loudness per frame (RMS at 30 fps, 98th-percentile normalized), plus blinks every ~3.3 s.

## Prompts (where they convert)
- **Comment prompt:** a speech bubble from him right after the payoff lands (viewers have an opinion then), 2–3 s, one question tied to the story. Example: "WOULD YOU HAVE / INVESTED? COMMENT".
- **Follow:** the red "+ FOLLOW" button he taps in the **last ~2 s**, ticking to "✓ FOLLOWING". It sits over the loop point so it doesn't cost mid-video retention.
- Never both at once; never mid-video before the payoff.
