# QA — 2026-11-25-impossible-number (first long-form)
| Check | Result | Status |
|---|---|---|
| Duration / format | 7:52.8 (457.78 s narration + 15 s end card), 1920×1080, 30 fps, 14,184 frames, H.264 + AAC 256k | PASS |
| Loudness / true peak | -14.1 LUFS / -1.5 dBTP | PASS |
| Frozen > 20 s / black > 1 s | none / none | PASS |
| Captions | captions.srt, 158 cues from Whisper word timings, spelling fixes applied | PASS |
| Facts | Every number in paragraphs.json traced to Wikipedia (citing Miller 1965, Zuckoff 2005, SEC/court record); no invented quotes (P48 uses the single sourced word "finished") | PASS |
| Thumbnails | A (TOO PERFECT, primary), B (123 vs 20), C ($65B ERROR) — 1280×720, < 2 MB | PASS |
| Sound | 26 CC0 Freesound files (sfx/CREDITS.md), 97 cues, voice 12–13 dB over ducked beds | PASS |
| Note | P50 opens on a sparse frame for ~2 s before the GUILTY stamp/tally | MINOR |
| Note | Long-form ≥ 8:00 enables mid-roll ads later; this is 7:53 (not monetized yet, so no impact) | INFO |
| Delivery | video.mp4 (560 MB) is backed up in video-parts/ as 95 MB pieces (GitHub 100 MB limit); rejoin with `cat video.mp4.part* > video.mp4` | — |
