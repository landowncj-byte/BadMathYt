# QA - fake-prince (CRIME-SHOW pass, RULES 112)

Photo credit: Anthony Gignac booking photos, Miami-Dade County, public domain (Wikimedia Commons File:Anthony Gignac Miami PD mugshot.jpg), brand/photos/anthony-gignac/1.jpg. Footnote on every cut carries the credit. All other art is generic ILLUSTRATION / PROP.

## CRIME-SHOW BUILD STATUS
<!--S-->
RENDERED READY: YouTube(root) 87.0s 34.2MB
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
