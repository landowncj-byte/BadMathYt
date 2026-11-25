# QA: card-minimum (IG/FB 19.7s)
- video.mp4: 1080x1920, 30 fps, H.264 (CRF 17 via engine v2) + AAC, 19.7 s, rendered with --parts 2. Narration untouched.
- Loudness: -14.0 LUFS integrated, peak -1.4 dBFS (mix.py two-pass loudnorm + limiter).
- Engine v2, series whatif. Custom recipes registered inside scene.js (plastic card, statement, paybar split, calendar, timeline strip, bigstamp, paper plane, bookmark); no engine files changed. Storyteller, pills, fonts untouched.
- Numbers shown: $5,000, 22.36% APR, min = 1% + interest ($35 floor), month 1 $93.17 interest + $50.00 debt = $143.17, 198 months = 16.5 yrs, paid $12,811, interest $7,811, $2,736 owed after 5 yrs, fixed $250 = 26 months. Footnote persistent. No bank names/logos. ($1,315 interest on the $250 plan is in research but not shown.)
- Bar split drawn at true proportions (65% interest / 35% debt), so the green part is smaller but not "thin".
- Captions from words.json with fixes; captions.srt from script.json SHOW text (digits) + sentence times.
- Sound: CC0 sfx-library only; one hit per reveal on the same @word as the picture; bed upbeat_bed_2.
- Known minor: pill/title overlaps content during tight zooms in transit; "0.0 YEARS" counter visible briefly on whip arrival.
- Huge hook text; stamp '$12,811 FOR $5,000 OF C*AP' (censor on screen and in captions; spoken word is unbleeped by design); ending bookmark + paper plane + 'SEND · SAVE IT BEFORE YOUR STATEMENT'. Content kept in y 250-1250.
