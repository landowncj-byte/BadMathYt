# QA: overdraft-apr, IG/FB Reels cut
- video.mp4: 1080x1920, 30 fps, H.264 + AAC 192k, faststart, 17.33 s (520 frames, 2 parts rendered in parallel). build/video_noaudio.mp4 kept. Narration untouched.
- Loudness (final file, ebur128): -14.0 LUFS integrated; true peak (192 kHz oversampled) -1.45 dBTP. Voice pre-mix -16 LUFS, two-pass loudnorm to -14, bed ducked by sidechain. AAC encoded with pns/is/tns off because the default encoder created clipping overshoots.
- Freeze check (freezedetect 1.5 s): none.
- Facts on screen: CFPB 2014 example, $24 / 3 days / $34 median fee = 17,236%, shown as "17,000%" (CFPB's wording); credit card 22%, $24 x 22% x 3/365 = $0.04. Payday ≈ 700% labelled typical. Footnote on every frame. Generic "BANK" app, no real bank names or logos; no "scam/fraud/illegal".
- Caption timing: words.json, with the re-voiced sentences re-timed from sentences.json and ffmpeg silencedetect gaps (YouTube tail from 40.9 s hand-timed because Whisper words there were stale). Captions use digits; captions.srt written from the same text.
- SFX: CC0 only (sfx/CREDITS.md); receipt printer from the lottery Short's sfx/.
- Contact sheet reviewed (contact_sheet.png); fixes made: VS vs $34 overlap, bar-chart labels vs caption, stamp vs caption (IG), phone vs follow button (TikTok).
