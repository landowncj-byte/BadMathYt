# QA: one-percent-fee v2 rebuild (What If, engine v2) 2026-11-25
Scripts/voice untouched. Sources: _src/shared2.js (twin/fee patched from shared.js) + recipes.js (slam x3, chip, heart) + yt2/tt2/ig2.js (build.sh <cut> <yt2|tt2|ig2>). No engine files changed. Old setup card and 24% pie removed (not in the new scripts).
| Cut | File | Narration | Video | Size |
|---|---|---|---|---|
| YouTube | video.mp4 | 45.03 s | 45.43 s | 18.2 MB (re-encoded crf 25; raw render was 42.8 MB) |
| TikTok | tiktok/video.mp4 | 35.35 s | 35.77 s | 33.6 MB |
| IG/FB | ig/video.mp4 | 21.42 s | 21.83 s | 12.2 MB |
Mix: -14.0 LUFS, true peak -1.4 / -1.1 / -1.4 dBFS. Contact sheets (1 fps, timestamped): contact_sheet.png in each cut.
Numbers on screen (research.md): $500x480=$240,000; fee $316,661; gaps Y10 $4,603, Y20 $29,443, Y30 $107,728 (YT/TT tags); column values A/B roll live ($1,312,407 / $995,745 at Y40). Chips: HYPOTHETICAL always on + footnote with the full line; IG adds FEES ARE LEGAL & DISCLOSED (stamp + footnote). No real funds.
Captions: words.json timing, fixed to sentences.json wording (Year 20?, To— to, beat you, Yeah, slow-ass...), no [tags]; captions.srt rewritten from sentences.json (3 files).
## VIDEO GATE
| # | YT | TT | IG |
|---|---|---|---|
| V1 script_gate PASS (real sentences) | Y | Y (warn: 93 words > 90) | Y |
| V2 watched via 1-fps sheet | Y | Y | Y |
| V3 frame 0 slam + hook text, boom | Y | Y | Y |
| V4 change every 2-3 s, nothing held >4 s | Y | mostly (bill card 27.4-30.6 s ~3 s) | borderline (bill card 11.5-16 s, only plane/peek/pull-back change) |
| V5 push-ins on spoken numbers, storyteller travels | Y | Y | Y |
| V6 heart / plane / +FOLLOW / bubble on voiced line, small | Y | Y | Y (heart, plane, bubble; no follow ask in script) |
| V7 payoff biggest hit; ends <=6 s after | hit Y; ends 9 s after (script tail) | hit Y; 8 s after | hit Y at 53%; ends 4.8 s after the 240 line |
| V8 brand lock, no neon | Y | Y | Y |
| V9 numbers match research, HYPOTHETICAL | Y | Y | Y |
| V10 captions from script, no tags | Y | Y | Y |
| V11 voice listen-check | not done (no audio review) | not done | not done |
| V12 CC0 sfx, -14 LUFS, peak ok | Y | Y | Y |
| V13 post settings | not applicable (not posting) | | |
## Doubts
- Payoff-to-end gap is 8-9 s on YT/TT because the fixed script puts 3 sentences after it.
- First push-in (0.4-0.6 s) crops the hook text for ~1 s on all cuts, then pull-back restores it.
- Year-40 fee tag is not shown separately; payoff is the dropped bill card. Fee ghost block rips off Fund B just before.
- Storyteller corner-left overlaps chart axis labels; HUD pill overlaps card tops on tight zooms.
## PHOTO PASS (2026-11-25)
Added 2 stock photos (paper frames, screen layer, small; no cover.png, no watermarks, no logos, no people; scripts/voice/timing unchanged). Footnote line added to all cuts.
| File | Page | License | Author | Used |
|---|---|---|---|---|
| brand/photos/stock/piggy-bank-coins/5.jpg ("Piggy Bank") | https://www.flickr.com/photos/59937401@N07/5929478505 | CC BY 2.0 | Images_of_Money | piggy at "sounds like nothing" (YT ~12.4-14.5 s, TT ~8.2-10 s, IG ~6-7 s) |
| brand/photos/stock/stacked-coins/1.jpg ("Stacked Coins") | https://www.flickr.com/photos/21898655@N05/4368910389 | CC BY-SA 2.0 | fran.trudeau | coins at "Whatever" (YT ~21.8-23.2 s), "Send this to your friend" (TT 16.7-18.3 s, IG 13.2-15.1 s) |
Footnote: PHOTOS: IMAGES_OF_MONEY (CC BY 2.0), FRAN.TRUDEAU (CC BY-SA 2.0), VIA FLICKR. Re-rendered with --force, re-mixed (-14 LUFS, peaks -1.1/-1.4/-1.4), sheets regenerated. YT re-encoded crf 25 (16.5 MB). script_gate not re-run (scripts untouched; known newer-rule FAIL accepted).

## CRIME-SHOW BUILD STATUS
v5 RE-EDIT on the new v3 scripts + Owen voices (`bm2.cjs voice` re-synced x3). New stage `_src/fee5.js` (+ `_src/build5.sh <cut> <yt5|tt5|ig5>`, reusing penny-doubled's pd5.js helpers): recurring YOU card + storyteller, two IDENTICAL piggy-bank funds A and B (B gets the 1% tag), live year / A / B counters (monthly-compounding FV in code: 7% vs 6%, $500/month), pigs riding true-scale coin towers, gap chip at year 10 ($4,603), 30 ($107,728), 40 ($316,661), then fee vs $240,000 deposited bars. Screen-space stage, one idea per scene, numbers fitted with margin, nothing in the caption band. Facts = research.md only (hypothetical, 7% assumed, no real fund, fees legal; IG hyperbole "robbed" carries LEGAL · DISCLOSED · EXPENSIVE on screen + footnote). IG "most of a house" line is spoken only, no on-screen claim.
RENDERED READY: one-percent-fee/video.mp4 (YouTube) 66.57s 12.6MB (-14.0 LUFS, -1.32 dBTP)
RENDERED READY: one-percent-fee/tiktok 67.93s 13.1MB (-14.1 LUFS, -1.26 dBTP, bed -12 dB)
RENDERED READY: one-percent-fee/ig 68.07s 12.8MB (-14.0 LUFS, -1.35 dBTP)
Gate: script_gate --all (see run), keyframe sheets and final 6x4 contact sheets viewed for all three cuts. Residuals: plane trail crosses the HYPOTHETICAL chip ~1 s on the SEND beat; first frames of the year-0 pigs scene fade in under the counter on TT; YT/TT/IG pigs scenes are long but the year/gap counters move throughout.
