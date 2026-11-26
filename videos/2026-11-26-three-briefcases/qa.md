# QA: three-briefcases (What If, engine v2) v3 RE-EDIT 2026-11-25 (REBUILD-LONGER Stage 2)
Scripts/voice untouched (voice/ files not modified; build/voice.js regenerated with `bm2.cjs voice`). Scenes rewritten against the new 63-66 s narration. Source: `_src/cases.js` (table3, fan100, mail, tally, assumes, chip, heart, plane; now exports `window.__bcase`) + NEW `_src/v3.js` (live, blabel, board3, calendar, column) + `_src/yt.js` / `tt.js` / `ig.js` (v2 scenes kept as `*.v2.js`); `_src/build.sh <cut> <yt|tt|ig>`. No engine files changed.
| Cut | File | Narration | Video | Size | LUFS / true peak |
|---|---|---|---|---|---|
| YouTube | video.mp4 | 65.89 s | 66.30 s | 30.8 MB | -14.0 / -1.44 dBFS |
| TikTok | tiktok/video.mp4 | 63.83 s | 64.23 s | 31.3 MB | -14.0 / -1.40 dBFS |
| IG/FB | ig/video.mp4 | 63.20 s | 63.60 s | 30.3 MB | -14.0 / -1.41 dBFS |
Contact sheets (1 fps, timestamped, 6x11): contact_sheet.png in each cut. captions.srt rebuilt from sentences.json. script_gate --all: PASS x3 (TikTok warn: 184 words > skill target of 75).
## What was built (per REBUILD-LONGER + MOTION TIPS + PLAYBOOK)
- One-second test first: board3 (rows opening one at a time) + live tally + beat label rendered as a 1 s clip (`--from 1 --to 2`) and judged on stills before the scenes were written.
- Keyframe contact sheets (one frame per beat plus first/last hold, timestamped) were checked before each final render; fixes made: HUD pushed content to y>=440, frame-0 composition raised so the desk and STAY/SWITCH sit above the caption band, hook zooms kept under 0.9 fill, board rows capped at maxH 720.
- LIVE REAL NUMBER from frame 0: `live` HUD = actual seeded simulation of 1,000 games of the real rules (host knows, always opens an empty case, switching wins iff the first pick was empty); seed chosen deterministically so the end is 667 switch / 333 stay (66.7% / 33.3%); counter ticks every frame (game n, STAY wins, SWITCH wins, share bar). Precomputed once at load, pure function of t, so seek(t) stays pure. Reaches game 1,000 just before the final question.
- BEAT LABELS pinned top-right: THE BET / THE TWIST / THE CHECK / THE ANSWER (order differs per cut to match the script).
- The three possible starts = `board3`: three numbered boxes (START 1/2/3, closed "?") that each open in turn: $1M tag on case 2, YOUR PICK tag, host opens an empty case, switch arrow, red X (START 1: picked the money) / green check (START 2 and 3), then the X, check, check = 2 OUT OF 3 strip.
- 100-case grid (`fan100`): 98 pop open in a wave with an OPENED counter, 99% stamp on the one left, 1% on yours.
- $100 a day = `calendar` (flipping pages, bills dropping, DAYS 0 to 10,000, YEARS roll to 27). 1990 columnist = `column` (SWITCH circled in red, 1990 stamp) + `mail` letter avalanche.
- Layout flips: whip between 6 stations (table, calendar, board, column, letters, 100 cases) plus front/back presenter switches roughly every 3-10 s; a beat or element change every 1.5-3 s (longest holds ~3 s over [beat] pauses).
- Picture changes land on trigger words (@refs): stamp on "wrong", flips on "opens", 98 on "98", 99% on "99", rows on "one/two/three", verdicts on "loses/wins/again/screwed", heart on "like/heart/Double tap", plane on "Send", +FOLLOW on "Follow".
- LOOP: last beat whips back to the frame-0 composition (hook + cases), question bubble on "stay".
## Photo
One stock image, same file in all cuts: `brand/photos/stock/briefcase-cash/7.jpg`, "Banknotes - Credit to https://www.semtrio.com/" by Semtrio, CC BY 2.0, https://www.flickr.com/photos/163837264@N07/44290747382. No watermark, no logos, no people. Shown in a taped paper frame ("CASH / STOCK PHOTO") on "a million", gone by "pick" / "two". Footnote line 4 credits it. No real people named, so no VERIFIED.md photos.
## VIDEO GATE
| # | YT | TT | IG |
|---|---|---|---|
| V1 script_gate PASS | Y | Y (warn words) | Y |
| V2 watched via 1-fps sheet + beat keyframes | Y | Y | Y |
| V3 frame 0 slam + full hook text, boom | Y | Y (giant 50/50 + THE $1,000,000 QUESTION) | Y ($1,000,000 / 2 CASES LEFT) |
| V4 change every 2-3 s | Y (pauses hold push-ins) | Y | Y |
| V5 push-ins on numbers, storyteller travels | Y | Y | Y |
| V6 heart / plane / +FOLLOW / bubble | heart, plane, follow, bubble | heart, plane, follow, bubble | heart, plane, bubble (no follow line in script) |
| V7 payoff biggest hit, loop | 99% at 60.3 s, whip 62.8 s | 99% at 30.9 s (answer 2/3 at 51 s), loop 61.2 s | 99% at 58.3 s, loop 59.7 s |
| V8 brand lock, no neon | Y | Y | Y |
| V9 numbers match research, ASSUMES + HYPOTHETICAL pinned | Y | Y | Y |
| V10 captions from script | Y | Y | Y |
| V11 voice listen-check | not done (no audio listening here) | not done | not done |
| V12 sfx CC0, -14 LUFS | Y | Y | Y |
## On-screen facts (all from research.md or our own arithmetic)
| On screen | Source |
|---|---|
| 1 case = $1,000,000 at random; HOST KNOWS; ALWAYS OPENS AN EMPTY CASE (ASSUMES chip pinned from the host line) | Assumptions 1-3 |
| Three starts: picked the money, switching loses; picked empty #1 / #2, switching wins; 2 OUT OF 3 | Arithmetic table |
| 100 cases, 98 opened empty, switch wins 99%, your pick 1% | 100-case version |
| $100 a day x 10,000 days = $1,000,000 = 27.4 years, "OUR MATH" | our arithmetic (beats-v3.md) |
| Column 1990 / ≈1,000 PhD letters "BY HER COUNT", ILLUSTRATION · LETTERS NOT REAL | True-story table (attributed) |
| LIVE SIM tally: 1,000 seeded games, final 667 switch / 333 stay | our own run (deterministic, rules applied); not a research figure |
## Doubts / issues
- Voice not listened to (V11).
- IG/TikTok frame-0 composition has the third (empty) case open behind the two (alt layout), as in v2.
- TikTok: during the "coin flip" push-in the blurred STAY/SWITCH buttons briefly sit in the caption band.
- Tall boards (board3 rows, fan100 zooms) pass behind the HUD during close-ups; HUD is a screen layer by design.
- Bed music still has no drop-out (engine has no bed envelope).

## CRIME-SHOW BUILD STATUS (2026-11-26, RULES 112)
RENDERED READY: three-briefcases (YouTube) 72.30s 20.7MB (-14.0 LUFS, -1.3 dBTP). Doubt: board/summary card 53-59 s holds ~6 s (only coin/YOU/tally move) and a one-frame whip blank at ~61 s.
