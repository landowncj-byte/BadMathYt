# QA: three-briefcases (What If, engine v2) 2026-11-26 build
Scripts/voice untouched. Source: `_src/cases.js` (table3, fan100, mail, tally, assumes, chip, heart, plane) + `yt.js` / `tt.js` / `ig.js`; `_src/build.sh <cut> <yt|tt|ig>`. No engine files changed.
| Cut | File | Narration | Video | Size | LUFS / true peak |
|---|---|---|---|---|---|
| YouTube | video.mp4 | 47.13 s | 47.53 s | 31.1 MB | -14.0 / -1.47 dBFS |
| TikTok | tiktok/video.mp4 | 30.95 s | 31.37 s | 19.0 MB | -14.0 / -1.46 |
| IG/FB | ig/video.mp4 | 23.26 s | 23.66 s | 13.1 MB | -14.0 / -1.45 |
Contact sheets (1 fps, timestamped): contact_sheet.png in each cut. script_gate --all: PASS x3 (TikTok warn: 96 words > 90, script is fixed).
## VIDEO GATE
| # | YT | TT | IG |
|---|---|---|---|
| V1 script_gate PASS | Y | Y (warn words) | Y |
| V2 watched via 1-fps sheet | Y | Y | Y (stills + sheet) |
| V3 frame 0 slam + hook text, boom | Y (cases land at frame 0, hook text, boom) | Y | Y |
| V4 change every 2-3 s, nothing held >4 s | Y (mail station 26-35 s keeps changing: letters, counter, stamps, follow tap) | Y (50/50 hold 11.6-13 s is silence) | Y |
| V5 push-ins on spoken numbers, storyteller travels | Y | Y | Y |
| V6 heart / plane / +FOLLOW / bubble | Y all four | Y all four | heart, plane, bubble (no follow ask in script) |
| V7 payoff biggest hit, ends <= ~6 s after | 99% stamp 41.8 s, ends 5.7 s later, loops | switching won 27.7 s, ends 3.6 s later, loops | bars 18.5 s, ends 5.1 s later, loops |
| V8 brand lock, no neon | Y | Y | Y |
| V9 numbers match research, HYPOTHETICAL + ASSUMES | Y | Y | Y |
| V10 captions from script, no tags | Y (words.json timing, `fix` for punctuation/numbers) | Y | Y |
| V11 voice listen-check | not done (no audio review) | not done | not done |
| V12 CC0 sfx, -14 LUFS, peak ok | Y | Y | Y |
| V13 post settings | n/a (not posting) | | |
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
- TikTok: Whisper stamps the final "So…" at 27.92 s (real ~28.55 s). `_src/build.sh` patches build/voice.js (generated file only, voice folder untouched) so "switching." stays up.
- Bed music does not drop out at the follow/payoff (engine has no bed envelope); the bed is ducked under voice and silence is the narration gap.
- Fan100: opened cases are dimmed, the one closed case is only enlarged + stamped 99%; storyteller sometimes overlaps desk tag/buttons on tight zooms; STAY/SWITCH buttons touch captions on a few zoom-ins.
- Tally bar race appears only in YT (IG/TikTok scripts have no room); TikTok uses the kitchen-table tally marks.
- Voice not listened to (V11).
- Re-render 2026-11-25 (coordinator fixes): frame-0 framing lowered/zoomed out so hook text clears the pill and storyteller; STAY/SWITCH buttons raised and 50/50 + pulled zooms reduced so buttons stay above the caption band.
