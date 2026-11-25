# QA: parlay-math (YouTube, YOUR PARLAY, DECODED)
- video.mp4: 1080x1920, 30 fps, H.264 + AAC 192k, faststart, 57.87 s (1736 frames, 2 parts rendered in parallel, concat). build/video_noaudio.mp4 kept. Voice untouched.
- Loudness: -14.0 LUFS integrated (two-pass loudnorm), true peak <= -1.2 dBTP; voice pre-mix -16 LUFS, bed ducked by sidechain. SFX all CC0 (sfx/CREDITS.md).
- Caption/SFX timing: Whisper word starts after pauses were early by up to ~0.35 s, so words were snapped to audio onsets using mouth.json (shared/snap.py -> voice/words_snap.json); captions and sfx use those times.
- Footnote "ASSUMES 50/50 LEGS AT −110 · EXPECTED VALUE · NOT ADVICE" on every frame; generic "SPORTSBOOK" slip, no real brands; no "scam"/"fraud".
- Numbers: 1.91^10 = 643x, 2^10 = 1,024x, cut 37.2%, 1,024-643 = 381; $10/day = $3,650 stake, expected loss $166 (singles) vs $1,358 (10-leg), labelled EXPECTED VALUE.
- Contact sheets reviewed (build/final_sheet.png + per-scene sheets); fixed: 50/50 text vs HUD, pie label overflow, FAIR PAYOUT label vs number, follow button vs payoff text, THE CUT chip vs 37% text, day counter vs follow button, donation box/stamp vs caption/storyteller.
- Memes: #12 buzzer at 31.23 s (wrong 1,024x answer), #1 boom zoom + shake at 38.97 s (37%), #3 red circle on -110. Woven CTAs: like 16.73, share (paper plane) 32.10, follow tap 41.55. Loops: last frames glitch into frame 0 (slip + IDIOT TAX).
