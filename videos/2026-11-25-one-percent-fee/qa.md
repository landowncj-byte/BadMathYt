# QA: one-percent-fee (What If, engine v2, series whatif)
## Files / durations (BM2.scene duration = narration + 0.4 s)
| Cut | File | Narration | Video | Size |
|---|---|---|---|---|
| YouTube | video.mp4 | 50.35 s | 50.77 s | 40.3 MB |
| TikTok | tiktok/video.mp4 | 29.35 s | 29.77 s | 22.9 MB |
| IG/FB | ig/video.mp4 | 17.00 s | 17.40 s | 13.7 MB |
1080x1920, 30 fps, CRF 20 default, mix.py defaults (-14 LUFS, peak -1.3 dBFS YT). Scripts, voice files untouched. Source: _src/ (shared.js + yt/tt/ig.js, build.sh). Custom recipes in shared.js: plan, twin, fee, plane. No engine files changed.
## On-screen numbers (all from research.md formula FV = 500 x ((1+r/12)^(12y) - 1) / (r/12); twin computes them live)
- $500/MONTH x 40 YEARS = 500 x 480 = $240,000 put in.
- Year 10: A $86,542, B $81,940, gap $4,603. Year 20: A $260,463, B $231,020, gap $29,443. Year 30: A $609,985, B $502,258, gap $107,728 (these A/B values roll on the columns as the year ticker runs).
- Year 40: A $1,312,407 (7%) vs B $995,745 (6% = 7% - 1% fee); fee = $1,312,407 - $995,745 = $316,661.
- Fee bar vs deposits: $316,661 vs $240,000 (bars drawn to scale 316.7 : 240; fee runs past the dashed "put in" line). Arithmetic lines shown on the YT/IG bill card.
- YT only: pie 24% = 316,661 / 1,312,407 = 24.1% shown as 24% (spoken "twenty-four percent"); slices 995,745 + 316,661 = 1,312,406 (rounding).
- Chart columns on a fixed true scale (A at year 40 = full height); the year-10 gap is a real ~2 px sliver (that is the point), the red hatched "ghost" block on B is the fee.
- Assumptions: "THE SETUP · HYPOTHETICAL" card (7% IS AN ASSUMPTION, NOT A FORECAST / MONTHLY COMPOUNDING · NO TAXES / NOT FINANCIAL ADVICE · NO REAL FUNDS) is on frame 0 of YT/TikTok/IG; footnote on every cut carries the full line. IG: stamp "FEES ARE LEGAL & DISCLOSED" (from "slow-ass robbery") + third footnote line. No real fund names or logos.
## Captions (from words.json, checked against sentences.json)
Fixes: YT "funda" -> "Fund A", "1.3, 1.31" -> "1.3— 1.31"; IG "slow ass" -> "slow-ass". Numbers follow speech ("$316,000", "4,600", "29,000", "107,000", "995,000"), not the exact on-screen figures. No [tags]. captions.srt in each cut from sentences.json (3 files).
## Beats
- Frame 0: side-by-side hook + setup card (hook has the 1%/$ number); every cut whips back to the same framing at the end (loop). Setup-card rows are skeleton at frame 0 and filled at the loop frame (small mismatch).
- YT push-ins (13): "1%" hook, 1% fee tag, $500/mo x 40y, $240,000 (plan), 7%, gap $4,603, tiny columns ("whatever"), $29,443, $107,728, Fund A 1.31M, Fund B 995k (slide), $316,661 ghost, $240,000 (bill), 24%. Front: x3 (ever put in, Say both, So would you/Follow); peek: bill card; whips: twin, bill, pie, loop.
- TikTok push-ins (9): just 1%, 316 grand, 1% fee, $500, 7%, $4,600, $316,661, $240,000; front x3; peek x1.
- IG push-ins (6): 1% hook, LEGAL note, $500, 7%, $316,661 ghost, $240,000; front x2; peek x1; paper plane + "SEND THIS TO THAT FRIEND" bubble.
## Sound
CC0 sfx-library names only, one hit per reveal on the same @word as the picture (gap tags: ding_2; $316,661: deep_boom_1 + money_counter; stamp: rubber_stamp_2; follow: click_1 + success_chime_1). Bed lofi_bed_1 (calm).
## Doubts
- Pill / title overlaps card headers during tight zooms on the setup card and bill card (same known minor as card-minimum).
- Storyteller in corner covers the lower-right of the setup card's assumption lines in a few beats; the footnote repeats them.
- YT file 40.3 MB (CRF 20 default), right at the ~40 MB limit.
- 24% is 24.1% rounded; fee bar math uses 316,661 (voice says "three hundred sixteen thousand").
- Captions say "$316,000" because that is what is spoken; screen shows exact $316,661.
