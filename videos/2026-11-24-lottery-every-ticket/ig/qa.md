# QA: lottery IG/FB Reels cut
- ig/video.mp4: 1080x1920, 30 fps, H.264 + AAC 192k, faststart, 22.76 s (685 frames; narration 22.43 s + ~0.4 s tail). 2 render parts concatenated.
- Loudness: -14.3 LUFS integrated, true peak -2.5 dBTP (limiter lowered after AAC overshoot was -0.7 dBTP at first pass; voice pre-mix -16 LUFS, bed upbeat_bed_1 ducked).
- Freeze check (d=1.5 s): 0 frozen stretches.
- Frame 0 (frame0.png): giant "STILL BUYING LOTTERY TICKETS?" + ticket slam + BAD MATH stamp, glitch/shake, boom at 0.0 s.
- "YOUR A** ROBBED" shown censored on screen and in the caption; voice uncensored. "1 IN 292,201,338" with MEME #1 boom zoom (punch zoom + shake + deep_boom) at 5.9 s. SCREW IT stamp at 9.88 + ticket avalanche, 5,500,000 TICKETS counter; WINNER confetti $27,000,000 at 14.0 (MEME #7 airhorn); red X on BIRTHDAY at 18.22 (MEME #12 buzzer); paper plane flies on "Send" 16.2; bookmark pops on "save" 19.92; end text SEND THIS / SAVE THIS.
- Safe zone: all art and the caption (y 1195) are inside y 250-1250; footnote at y 1266; small storyteller bottom-left decorative only. HUD: BAD MATH wordmark top-left, footnote "VIRGINIA LOTTERY 1992 · POWERBALL ODDS 1 IN 292.2M".
- Captions from words.json with fixes: "ass" -> A**, missing "dollars" (Whisper dropped it) added at 15.52-15.80; captions.srt per script sentence (uses script text, uncensored).
- Contact sheet contact.png reviewed; fixed overlaps (bills over BY MATH, A FUND vs caption, EVERY WEEK stamp vs caption, wordmark vs top titles, empty 0.2 s gaps at 4.0 and 16.1).
- SFX credits: ig/sfx/CREDITS.md.
