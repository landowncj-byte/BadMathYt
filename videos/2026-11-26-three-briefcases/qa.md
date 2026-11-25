# QA: three-briefcases (What If, engine v2) 2026-11-26 build
Scripts/voice untouched. Source: `_src/cases.js` (table3, fan100, mail, tally, assumes, chip, heart, plane) + `yt.js` / `tt.js` / `ig.js`; `_src/build.sh <cut> <yt|tt|ig>`. No engine files changed.
| Cut | File | Narration | Video | Size | LUFS / true peak |
|---|---|---|---|---|---|
| YouTube | video.mp4 | 47.13 s | 47.53 s | 31.1 MB | -14.0 / -1.47 dBFS |
| TikTok | tiktok/video.mp4 | 30.95 s | 31.37 s | 19.0 MB | -14.0 / -1.46 |
| IG/FB | ig/video.mp4 | 23.26 s | 23.66 s | 13.1 MB | -14.0 / -1.45 |
Contact sheets (1 fps, timestamped): contact_sheet.png in each cut. script_gate --all: PASS x3 (TikTok warn: 96 words > 90, script is fixed).
# QA: three-briefcases (What If, engine v2) RE-TIME + PHOTO PASS 2026-11-25
Scripts/voice untouched. Scenes re-keyed to the new voice (`bm2.cjs voice`, every ref re-resolved, all hard-coded seconds replaced by @word refs; loop whip = '@So#3-0.4' YT / '@stay#2-0.7' TT / '@PhDs#2+0.4' IG; duration = narration + 0.4 s). Source: `_src/cases.js` + `yt.js` / `tt.js` / `ig.js`; `_src/build.sh <cut> <yt|tt|ig>`. No engine files changed.
| Cut | File | Narration | Video | Size | LUFS / true peak |
|---|---|---|---|---|---|
| YouTube | video.mp4 | 48.44 s | 48.83 s | 32.3 MB | -14.0 / -1.46 dBFS |
| TikTok | tiktok/video.mp4 | 30.99 s | 31.40 s | 19.0 MB | -14.0 / -1.37 |
| IG/FB | ig/video.mp4 | 23.85 s | 24.27 s | 13.7 MB | -14.0 / -1.38 |
Contact sheets (1 fps, timestamped): contact_sheet.png in each cut. captions.srt regenerated from sentences.json.
script_gate --all: FAIL x3 on S10 duration only (YT 48.4 s vs 60-90, TT 31.0 vs 50-75, IG 23.9 vs 35-55; Rule 102 windows are newer than the original build). Scripts are fixed, so not changed here. TikTok also warns 95 words.
## Photo pass
No real people named, so no VERIFIED.md photos. One stock image per cut, same file: `brand/photos/stock/briefcase-cash/7.jpg`, "Banknotes - Credit to https://www.semtrio.com/" by Semtrio, CC BY 2.0, https://www.flickr.com/photos/163837264@N07/44290747382. Checked by eye: aluminium case of $100 bundles, no watermark, no logos, no people. Shown as a taped paper frame ("CASH / STOCK PHOTO") above the cases on "a million" (YT, IG) / "the cash" (TT), gone by "pick(ed)". Footnote line 4: "PHOTO: SEMTRIO · CC BY 2.0 · VIA FLICKR".
Skipped: game-show stage with doors (only unrelated stage/cosplay/theatre results), 1990s newspaper column (only a clipping with a readable masthead and unrelated topic, and vintage ads).
## VIDEO GATE
| # | YT | TT | IG |
|---|---|---|---|
| V1 script_gate PASS | N (S10 duration, script fixed) | N (S10 + words warn) | N (S10) |
| V2 watched via 1-fps sheet | Y | Y | Y |
| V3 frame 0 slam + full hook text, boom | Y | Y | Y |
| V4 change every 2-3 s | Y (pauses hold the big-number push-in, no new visual inside) | Y | Y |
| V5 push-ins on numbers, storyteller travels | Y | Y | Y |
| V6 heart / plane / +FOLLOW / bubble | Y all four | Y all four | heart, plane, bubble (no follow line) |
| V7 payoff biggest hit, loop | 99% 42.7 s, loop whip 45.8 s | switching 28.0 s, loop 28.6 s | two 19.2 s, loop 23.1 s |
| V8 brand lock | Y | Y | Y |
| V9 numbers match research, HYPOTHETICAL + ASSUMES pinned | Y | Y | Y |
| V10 captions from script | Y | Y | Y |
| V11 voice listen-check | not done | not done | not done |
| V12 sfx, -14 LUFS | Y | Y | Y |
## On-screen facts (all from research.md)
| On screen | Source |
|---|---|
| 1 case = $1,000,000, random; HOST KNOWS; ALWAYS OPENS AN EMPTY CASE (ASSUMES chip pinned from the host line to the end + footnote) | Assumptions 1-3 |
| 1 IN 3 / = 33.33% (pick, STAY); 2 IN 3 / = 66.67% (other case, SWITCH) | Arithmetic table |
| 100 cases, 98 opened empty, 99% switch, 1% pick (YT) | 100-case version |
| ≈1,000 PhDs, columnist's count, 1990; "NEARLY 1,000 PhD LETTERS, BY HER COUNT, OF ≈10,000 TOTAL" (YT) | True-story table (✔2, attributed) |
| 1,000,000 simulated games: switch won 66.59% (YT tally card) | Simulation check |
| 300-round bar race (YT) STAY 100 / SWITCH 200: seeded illustrative simulation (hash-based, host rule applied), labelled "300 SIMULATED ROUNDS", "OUR MATH"; not a research figure | own run |
| TikTok payoff: "HIS KITCHEN-TABLE TRIAL · ILLUSTRATION", tally marks 8 vs 2, "SWITCHING WON", paper silhouette, "NO LIKENESS" | NYT 1991 (✔1-2): 8 cars 2 goats, drawn as illustration only, no numbers stated |
Not used: IQ/"smartest", 92%, Erdős, letter quotes, doors/car/goats, host name or likeness, show branding. Mail is labelled ILLUSTRATION · LETTERS NOT REAL.
## Doubts
- TikTok: Whisper stamps the final "So…" at 28.18 s (real ~29.08 s). `_src/build.sh` patches build/voice.js (generated file only, voice folder untouched) so "switching." stays up.
- Bed music does not drop out at the follow/payoff (engine has no bed envelope); the bed is ducked under voice and silence is the narration gap.
- Fan100: opened cases are dimmed, the one closed case is only enlarged + stamped 99%; storyteller sometimes overlaps desk tag/buttons on tight zooms; STAY/SWITCH buttons touch captions on a few zoom-ins.
- Tally bar race appears only in YT (IG/TikTok scripts have no room); TikTok uses the kitchen-table tally marks.
- Voice not listened to (V11).
- Re-render 2026-11-25 (coordinator fixes): frame-0 framing lowered/zoomed out so hook text clears the pill and storyteller; STAY/SWITCH buttons raised and 50/50 + pulled zooms reduced so buttons stay above the caption band.
