# QA — 2026-11-25-impossible-number, long-form rebuilt in engine v2 (video-v2.mp4)

Built with `brand/engine-v2` (landscape `format: 16:9`), Owen narration (`voice/`, re-cut so every paragraph keeps its own first word, plus the woven CTA paragraphs P13b / P29b / P47b; total 495.35 s) + 15.0 s end card. Source: `build2/src/*.js` (recipes + five rooms), `build2/scene.js` (concatenated), `build2/mix_long.py`, `build2/sfx.json`.

| Check | Result | Status |
|---|---|---|
| Output | `video-v2.mp4`, H.264 1920×1080 30 fps + AAC 192k 48 kHz, 510.40 s (495.35 narration + 15.05 end card = 510.40 s), 15,312 frames, 206.0 MB (< 240 MB, CRF 21); `video-v2-post.mp4` = same video at CRF 26, 87.6 MB | PASS |
| Loudness / true peak | ffmpeg ebur128 on the file: -14.0 LUFS integrated, true peak -1.2 dBTP (ebur128), LRA ~2.5 LU. Speech-only windows -14.2 / -13.6 / -14.7 LUFS, end card (music only) -16.2 LUFS | PASS |
| Engine regression | Shorts unchanged: 4 stills of `2026-11-25-javice-fake-users/build` re-rendered with the new engine are byte-identical (`cmp`) to the pre-change render, checked again after the last engine edit | PASS |
| Style (VISUAL-V2 §0) | No glow, no additive blending, no chromatic glitch (grep of engine + recipes: no `lighter`, no coloured `shadowBlur`); depth only from soft shadows, blur, parallax. Storyteller, DECODED pill, fonts (Anton / Inter 800 / JetBrains Mono), wordmark, brand colours unchanged. Stage palettes per room are dark tints (warm sepia ch.1, cool slate ch.3), still Ink-based | PASS |
| Camera / choreography | 264 beats, 105 of them `zoom-on-number` (every spoken key number: 123, 20, 6×, 17, $65B, 5%, 50%, 45 days, $1,000,000, 160,000,000, 27,000, 1 in 6,000, $20M, $75, 900,000, 55,000, 90%, $180M, 51, 20 years, 10.5%, 17 years, 45°, 5 min, 4 h, 4%, 123 vs 20, 2000/2005, 8 looks, $7B, $5B, $234M, Dec 10/11, $64.8B, $35-55B, 11 crimes, 150 years, ...). Longest gap between beats 5.8 s (was 6.4 s at the first pass), average 1.9 s. Counters roll with springs and land on the spoken word | PASS |
| Chapters | 4 chapter cards (P08, P21, P34, P51) are headline elements in separate rooms of the world reached by a 0.7 s whip with motion blur, the stage palette crossfades, `tape_stop` + hit on the way in. Not slides | PASS |
| Storyteller | Moves between spots (corner, left, front, peek behind graphics: P09, P15, P24, P29, P38, P47, P53), poses per DIRECTION (shock on 20 / 6× / water / entire / 45° / arrested ...). Geometry check (`build2/qa.cjs`, 0.8 s after every beat): never overlaps the focused number/box on the front layer (0 flags), focused boxes clear of the caption band and the HUD chip (0 flags); 1 flag = a deliberate chart section box that is 24 px over the top edge at P39 | PASS |
| Captions | `captions-v2.srt` (185 cues) from the same words/timings as the on-screen captions. Whisper fixes: Markopoulos → Markopolos, "D 'Angelo's" → De Angelis's, "3 -question" joined, `10 .5 %` → 10.5%, `$64 .8` → $64.8, `900 ,000` → 900,000, stray "51,000" → 51. Word match vs `paragraphs.json` (number words removed): 99.5 % (only "a half" and "sixties" differ). Captions are screen-fixed lower third (y 945), ≤ 26 chars | PASS |
| Text collisions | Reviewed 6 contact sheets (every ~6 s per chapter) + 6 sheets of all 105 push-in frames (`qa-v2/zoom-beats-*.png`). Fixed: bar labels under captions (P09, P15, P29, P47), headline behind the chip (P23, P44), checklist under the caption (P07, P51), lens/peek collisions (P22, P45), stopwatch label over number, panel titles not wrapping. Remaining by design: captions sit over graphics' bodies (outlined, VISUAL-V2 §6) and card headers can pass under the HUD chip when a card is zoomed (the chip has an Ink backing so both stay legible) | PASS (minor) |
| Frozen / blank | `freezedetect` (8 s) and `blackdetect` (1 s): none. Frame 0 = hook + trade ticket (123 in green) + storyteller, no fade-in | PASS |
| Sound | about 470 cues, each on the same `@P:word` as its picture (reveals, stamps, counters, whips, 17 click ticks for the 17 bars). CC0 only: `brand/sfx-library` (credits in its CREDITS.md) + `sfx/` beds (`sfx/CREDITS.md`): cold open drone, ch.1 honky-tonk piano + vinyl crackle, ch.2 drone, ch.3 beat, ch.4 uplift (continues under the end card, +7 dB, fade-out); beds -24 LUFS, a further -5.5 dB while the voice talks, 1.2 s crossfades at chapters, voice -16 LUFS | PASS (by measurement; not listened to) |
| End card | 15 s: BAD MATH wordmark (Anton, Paper), dashed placeholders 800×450 at (120, 310) and r = 170 circle at (1400, 535) (labels WATCH NEXT / SUBSCRIBE), storyteller waving between them, no HUD / captions, music only | PASS |
| upload.json | Chapters from the new paragraph starts: 0:00, 0:53 (P08), 2:41 (P21), 4:38 (P34), 7:14 (P51), 8:15 (end card). `containsSyntheticMedia: false`; "AI-narrated." removed from the description | DONE |

## Third pass: real photos (RULES 2026-11-25)
Engine: new reusable `photo` element (README): cover-cropped licensed photo in a lit paper frame (treatments paper / polaroid / mugshot), Anton name plate, tiny mono credit, tape, spring-in, anchors `face` / `name` / `photo`; images are preloaded before frame 0 and a missing file fails `check` / `stills` / `render`. Shorts unchanged (javice stills byte-identical after the change).
Photos used (all public domain, files in `brand/photos/<slug>/` with `credits.json`):
| Person | File | Where | Credit shown |
|---|---|---|---|
| Bernie Madoff | `bernie-madoff/2.jpg` (U.S. DOJ mugshot) | cold open beside the 1991 ticket (frame 0, 0-8 s) and his intro card in chapter 3 (P35) | PHOTO: U.S. DOJ · PUBLIC DOMAIN |
| Charles Ponzi | `charles-ponzi/2.jpg` (full figure, clearer face than 1.jpg) | chapter 1, P09 intro card | PHOTO: PUBLIC DOMAIN (Commons file "Ponzi1920.jpg", uploader unknown) |
| Tino De Angelis | `tino-de-angelis/1.jpg` (PNG data) | chapter 2, P22 intro card | PHOTO: PUBLIC DOMAIN (author unknown) |
| Harry Markopolos | `harry-markopolos/1.jpg` (Loyola College in Maryland) | chapter 3, P40 intro card | PHOTO: LOYOLA COLLEGE · PUBLIC DOMAIN |
Footnote line 2 on every frame except the end card: "PHOTOS: PUBLIC DOMAIN, VIA WIKIMEDIA COMMONS (U.S. DOJ; LOYOLA COLLEGE; PONZI, DE ANGELIS: UNKNOWN AUTHOR)". ILLUSTRATION labels removed from these four cards. Clarence Barron has no licensed photo in `brand/photos`, so his card stays a silhouette labelled ILLUSTRATION. The coordinator's line named "Boston Public Library" for Ponzi, but that credit belongs to `charles-ponzi/1.jpg`; the clearer `2.jpg` has an unknown author, so the footnote says so.

## Second pass (RULES.md: spread CTAs, travelling storyteller)
- **Woven CTAs, voiced and shown on the same word, small, <= 1.5 s, never a banner:** P13b "Hit like..." = heart pulse beside him (100.7 s); P29b "Send this to the friend..." = paper-plane flick from his hand (236.6 s); P47b "Subscribe now..." = he taps a small red SUBSCRIBE button -> SUBSCRIBED (399 s). The scene behind keeps moving (3 new beats each, push-ins, shake). The pre-existing P57 subscribe + comment bubble is part of the script and was not changed.
- **Storyteller travel** (engine option `travel: {every: 10}`): he flips side on whips and at least every 10 s, steps out of the way of wide shots, steps in front for reactions (presenter-front, e.g. P12 July counter), goes behind cards on peeks. Measured on the track: 150 position/size changes, longest stretch in one spot 13.5 s (was 70+ s), 30 % of the time on the left side. Geometry QA (`build2/qa.cjs`, `build2/travel.cjs`): 0 overlaps with a focused number.

## VIDEO GATE (RULES.md)
| # | Gate | Result |
|---|---|---|
| V1 | `script_gate.py` | N/A: gate is for Shorts; long-form script unchanged apart from the three CTA lines the coordinator added |
| V2 | Watched, not just a 24-frame sheet | 6 chapter sheets every ~6 s + 6 sheets with every one of the 105 push-in frames; geometry QA on all 264 beats |
| V3 | Frame 0 pattern break, no fade | Hook + trade ticket with 123 + hit sound at frame 0: PASS |
| V4 | Change every 2-3 s, no card > ~4 s | Beats average 1.9 s apart (max gap 5.8 s); counters/lines keep moving; a few cards hold 4-6 s (chart draws, jail plaques): PARTIAL |
| V5 | Push-ins on numbers, storyteller travels | 105 push-ins; travel measured above: PASS |
| V6 | CTA micro-moments small, <= 1.5 s | heart / plane / SUBSCRIBE tap at P13b / P29b / P47b: PASS (like at 20 %, send at 47 %, subscribe at 80 % of the video) |
| V7 | Payoff biggest hit at ~75-80 % | Long-form: $64.8B + arrest land at ~82-84 %, ends on the test + the script's own closing: PASS (loop to frame 0 N/A) |
| V8 | Brand lock, no neon | PASS (see above) |
| V9 | Numbers match research, ILLUSTRATION labels | Every figure is from the script; people cards tagged ILLUSTRATION; chart labelled ILLUSTRATIVE: PASS |
| V10 | Captions from script, spelling, safe zone | Whisper words with script spelling fixes (99.5 % match), lower third y 945: PASS |
| V11 | Voice / butchered words | Not listened to; Whisper transcript of names checked (Markopolos, De Angelis's, Procter & Gamble fixed in captions): UNVERIFIED by ear |
| V12 | CC0 sound, -14 LUFS, <= -1 dBTP | -14.0 LUFS, -1.2 dBTP, CC0 library + sfx/ beds: PASS |
| V13 | Post settings | Not part of this render (upload.json updated: containsSyntheticMedia false, no "AI-narrated") |

## Facts on screen (all from the script / DIRECTION list)
Dates 1920 / early 1960s / 1963 / 2000 / 2005 / 2008 / Dec 10–11 2008 / 2021; ticket (APRIL 16, 1991 · BUY 123 call options · PROCTER & GAMBLE); 20 changed hands; 6×; 17 years; $65B fake balances; $100 → +$5 vs +$50 (5 % a year vs 50 % in 45 days); ~$1,000,000 a day; most of Boston's police force; 160,000,000 needed vs about 27,000 (true-scale bars), 1 in ~6,000; 6 banks, about $20,000,000; $75 estate; 900,000 vs 55,000 tons, over 90 % never existed; $180,000,000+ and 51 lenders; 20 years, out in 7; ~10 % a year, 10.5 % for 17 years; 45°; 5 minutes / 4 hours; ≈ 4 % losing months; at least 8 looks in 16 years; $7B asked back; $5B+ → $234M; $64.8B; $35–55B (Markopolos estimate); 11 federal crimes, 150 years, died in prison 2021. People are silhouettes tagged ILLUSTRATION (no photos). Not shown on purpose: "75 % of Boston police", "21 pages", "94 %" (the script only says "most", "over 90 %"). DIRECTION's top progress bar and chapter label were not rebuilt (not part of the v2 system).

## Known limits / unverified
- Audio was verified by measurement only (levels, peaks, cue times), not by ear.
- The old narration build had mis-cut 9 paragraph starts (a leading "And / One / Three" stranded before a pause); `voice/` was re-cut by the coordinator before this render, so the video uses the fixed audio. Paragraph starts in the engine come from `timeline.json`; word times are Whisper's (±0.1–0.3 s after pauses).
- Whisper timestamps are the sync reference for push-ins; a few land up to ~0.2 s early/late.
- YouTube end-screen element positions are placeholders as specified (800×450 at (120, 310), circle r 170 at (1400, 535)); the real elements are added in YouTube Studio.
- Playback on YouTube / mobile not tested; `video-v2.mp4` is git-ignored.
