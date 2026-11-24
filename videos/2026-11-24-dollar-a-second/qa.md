# QA — 2026-11-24-dollar-a-second
| Check | Result | Status |
|---|---|---|
| Duration vs budget (20–45 s; script 80 words est. ~32 s) | 28.8 s | PASS |
| Resolution / fps / codecs | 1080×1920, 30 fps, H.264 + AAC 48 kHz | PASS |
| Loudness | -14.2 LUFS integrated | PASS |
| True peak | -1.7 dBTP | PASS |
| Frozen stretch > 3 s | none detected (freezedetect) | PASS |
| Frame 0 | $1 bill + "$1 EVERY SECOND. FOREVER." + counter. Works as cover | PASS |
| Captions vs audio | Timed from ElevenLabs Scribe word timestamps; transcript = script, 55/55 words | PASS |
| Caption size / safe zone | Inter 800 78 px at y≈1300–1400, x 150–930; nothing above y 240 or below y 1510 | PASS |
| Claims in sources.md | All arithmetic, number spine complete | PASS |
| Assets in credits.md | Yes, all original except the ElevenLabs voice and OFL fonts | PASS |
| Style deviation | Uses motion graphics, not "bright cinematic AI scenes" (kept free and license-clean) | NOTE |
| Hook audit (sound off) | Frame 0 reads instantly: $1, every second, forever | PASS |
