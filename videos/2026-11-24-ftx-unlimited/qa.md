# QA — FTX Unlimited (Decoded)
- video.mp4: 1080x1920, 30 fps, 1404 frames, H.264 + AAC 192k, faststart, 46.80 s (narration 46.29 s + 0.5 s tail).
- Loudness (final file, ebur128): -14.0 LUFS integrated, true peak -2.0 dBFS (target <= -1). Master via two-pass loudnorm (linear). Voice stem normalized to -16 LUFS before the bed/SFX sum and the master gain.
- Freeze check (freezedetect, >2.5 s): none. Something moves every 2-3 s (scene cuts at 4.0, 5.7, 9.8, 12.95, 14.5, 18.4, 20.5, 24.4, 29.1, 34.8, 38.4, 41.3, 44.5).
- Frame 0: glitching toggle, red "$8,000,000,000", shocked storyteller. Loop: last 0.35 s glitches back to the LIMITED toggle.
- Captions from words.json, Bankman-Fried spelling fixed. captions.srt = one cue per sentence.
- Contact sheets reviewed (32 frames); overlaps fixed (heart vs TRUSTED, stamps vs comment bubble, meter overflow vs title).
- Audio: CC0 only (brand/sfx-library), see sfx/CREDITS.md. No real logos/photos; code is labelled ILLUSTRATION.
- Not built: no separate "dumb" yellow stamp sound beyond the shared stamp hit; "SO DUMB" stamp and caption word share the same cue.
