# QA - fake-prince (CRIME-SHOW pass, RULES 112)

Photo credit: Anthony Gignac booking photos, Miami-Dade County, public domain (Wikimedia Commons File:Anthony Gignac Miami PD mugshot.jpg), brand/photos/anthony-gignac/1.jpg. Footnote on every cut carries the credit. All other art is generic ILLUSTRATION / PROP.

## CRIME-SHOW BUILD STATUS
<!--S-->
RENDERED READY: YouTube(root) 87.0s 34.2MB
RENDERED READY: TikTok(tiktok/) 85.6s 34.5MB
RENDERED READY: IG/FB(ig/) 84.1s 34.0MB
<!--/S-->


<!--C:YT-->
## YouTube cut (root) — video.mp4
- Duration 87.0 s (narration 86.6 s + 0.4), 1080x1920 30 fps, 34.2 MB (crf 23), loudness -14.0 LUFS integrated, true peak -1.4 dBFS (mix.py), CC0 sfx-library only (camera shutter / typewriter on photo reveals, suspense drone under THE CATCH, rubber stamp + cell door on the verdict, gavel).
- Voice untouched (voice/ files not edited; `bm2.cjs voice` only re-read words.json). AV table: `build/AV.md`. Scene: `build/scene.js` (source `_src/yt.crime.js` + `brand/engine-v2/crime.js`).
- **Suspect (Anthony Gignac, "THE FAKE PRINCE") on screen** — treatments and timestamps: 1 cold open face + crown 0.0–5.0 s · 2 intro CASE FILE card + red string + push-in 6.0–11.0 s · 3 pitch quote card “I'M A SAUDI PRINCE” + NOT TRUE stamp 14.8–19.1 s · 4 picture-in-picture "HIS TRICK" with arrow 22.1–31.6 s · 5 FAKE PLATES / FAKE BADGES stamp card 44.7–47.0 s · 6 evidence board 50.6–56.5 s · 7 verdict GUILTY stamp + jail bars + 18+ 56.7–60.4 s · 8 face beside the cloche (THE CATCH) 63.2–72.2 s · 9 OUT OF CHARACTER + red string to the victim 79.3–81.8 s · loop frame 86.1–87.0 s. Camera-focus on a suspect card = 37.4 s (43%); with the small PiP about 47 s (54%) — above the 25–35% target, kept because every card carries a different beat of the case.
- Victims have consistent green character cards: THE INVESTORS (briefcase) and THE VICTIM (dinner, face turns shocked on "suspicious").
- Chapter labels: THE PITCH · THE TRICK · THE MONEY · THE FALLOUT · THE SENTENCE · THE CATCH; date/location slates FLORIDA · 1988→2017, CHAPTER 2/3/5, S.D. FLORIDA · THE VERDICT (MAY 31, 2019, per DOJ).
- Mute test (CRIME-SHOW §5): with sound off the sheet shows who (photo, name, "THE FAKE PRINCE", crown), the lie (quote card), the props (plates, badges stamped FAKE), the loss ($8M counter + board), the arrests (11×), the verdict (GUILTY, bars, 18+) and the slip (pork ticket, OUT OF CHARACTER, victim). PASS.
- VIDEO GATE: V1 PASS (script_gate --all) · V2 YES (per-beat stills + 24-frame sheet viewed) · V3 YES (frame 0: face + crown + hook text + shutter/boom) · V4 YES (change every 1.5–3 s; board/verdict holds ≤ 4 s) · V5 YES · V6 YES (heart, plane+SEND, +FOLLOW tap, comment bubble) · V7 YES (pork ticket hit at ~83%, loop back to frame 0) · V8 YES (no neon) · V9 YES (numbers per research.md; "PROSECUTORS SAID", "PER DOJ"; ILLUSTRATION labels kept) · V10 YES · V11 voice untouched · V12 YES · V13 n/a.
- On-screen facts unchanged from the earlier build (see git history of this file): 30 years = 1988→2017, 11× arrested or convicted (prosecutors said), >$8M, >18 years, sentenced May 31, 2019.

<!--/C:YT-->

<!--C:TT-->
## TikTok cut — tiktok/video.mp4
- Duration 85.6 s (narration 85.3 s + 0.4), 1080x1920 30 fps, 34.5 MB (crf 23), loudness -14.3 LUFS integrated, true peak -1.5 dBFS, CC0 sfx-library only. Voice files untouched. AV table: `tiktok/build/AV.md`. Source `_src/tt.crime.js` (via `_src/mk_tt.py`).
- **Suspect on screen** — 1 cold open face card + ARRESTED stamp, hook "BUSTED 11 TIMES" 0.0–5.3 s · 2 intro CASE FILE card + red string + push-in 5.3–9.1 s · 3 pitch quote card “I'M A SAUDI PRINCE” + crown + NOT TRUE 12.0–14.6 s · 4 PiP "HIS TRICK" + arrow 17.9–28.4 s · 5 FAKE PLATES/BADGES stamp card 43.5–46.9 s · 6 evidence board 52.2–58.1 s · 7 verdict GUILTY + jail bars + 18+ 58.1–60.1 s · 8 face + cloche (THE CATCH) 64.9–71.9 s · 9 OUT OF CHARACTER + string to victim 79.0–84.4 s · loop frame 84.4–85.6 s. Focus time 37.7 s (44%); with PiP about 47 s (55%): above the 25–35% target (cards are the story's main visual).
- Victims: green THE INVESTORS card and THE VICTIM card (shocked on "suspicious").
- Labels THE PITCH · THE TRICK · THE MONEY · THE FALLOUT · THE SENTENCE · THE CATCH; slates FLORIDA · 1988→2017, CHAPTER 3, S.D. FLORIDA · THE VERDICT.
- Mute test PASS (who: photo + name + "THE FAKE PRINCE"; lie: quote card; props stamped FAKE; $8M; 11×; GUILTY + bars + 18+; pork ticket + victim).
- VIDEO GATE: V1 PASS · V2 YES (stills + sheet viewed) · V3 YES (face + hook + shutter/boom frame 0) · V4 YES · V5 YES · V6 YES (heart, plane, +FOLLOW tap, bubble) · V7 YES (pork hit ~82%, loop to frame 0) · V8 YES · V9 YES · V10 YES · V11 voice untouched · V12 YES · V13 n/a.
- Fixed in this pass: the old "you'd have bought it" caption overlay matched the first "You'd" (14.6 s) and overlapped every step card; it now keys to the second "you'd".

<!--/C:TT-->

<!--C:IG-->
## IG/FB cut — ig/video.mp4
- Duration 84.1 s (narration 83.8 s + 0.4), 1080x1920 30 fps, 34.0 MB (crf 23), loudness -14.0 LUFS integrated, true peak -1.3 dBFS, CC0 sfx-library only. Voice files untouched. AV table: `ig/build/AV.md`. Source `_src/ig.crime.js` (via `_src/mk_ig.py`).
- **Suspect on screen** — 1 cold open face + crown beside the PORK order ticket 0.0–4.9 s · 2 pitch quote card “I'M A SAUDI PRINCE” + crown slides off + SUSPICIOUS stamp 10.6–17.2 s (card at 10.6–12.8, intro case file 12.8–17.2: CASE FILE Nº 026 folder, red string, push-in, red ring) · 3 PiP "HIS TRICK" + arrow 32–46 s (props) · 4 FAKE PLATES/FAKE BADGES stamp card 54.8–58.3 s · 5 evidence board 58.3–65.2 s · 6 dinner (face + PORK ticket + victim) 67.4–74.5 s · 7 verdict GUILTY stamp + jail bars + 18+ 70.6–74.5 s · loop frame 83.1–84.1 s. Focus time 28.3 s (34%), with PiP about 38 s (45%).
- Victims: green THE INVESTORS card and THE VICTIM card (shocked on "suspicious").
- Labels THE SLIP · THE PITCH · THE TRICK · THE MONEY · THE FALLOUT · THE CATCH · THE SENTENCE; slates FLORIDA · 1988→2017, CHAPTER 3, S.D. FLORIDA · THE VERDICT.
- Mute test PASS. VIDEO GATE: V1 PASS (script_gate --all) · V2 YES (stills + sheet) · V3 YES (face + crown + PORK ticket + hook, shutter/boom) · V4 YES · V5 YES · V6 YES (heart, plane, +FOLLOW tap, bubble) · V7 YES (TIPPED OFF stamp then loop to frame 0) · V8 YES · V9 YES · V10 YES · V11 voice untouched · V12 YES · V13 n/a.

<!--/C:IG-->
