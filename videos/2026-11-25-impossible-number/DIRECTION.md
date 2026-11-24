# DIRECTION — "The Impossible Number That Exposed Madoff" (first long-form)

Director: Opus. Builders: Sonnet/Haiku agents. **Do not change the script, facts, numbers or wording.** If something can't be built as described, build the closest thing and note it in `build/NOTES.md`.

## Format
- 1920×1080, 30 fps, H.264 + AAC 48 kHz. Narration ~7.9 min + 15 s end-screen hold (music only) → ~8.2 min.
- Every frame is a pure function of `t` (deterministic canvas animation, same approach as `videos/2026-11-24-salad-oil-swindle/build/scene.html` and `videos/2026-11-24-ponzi/build/scene.html`; reuse their helpers and drawing code freely, re-laid-out for 16:9).
- Palette: Ink `#0B0F14` bg, Paper White `#F5F3EE` text, Money Green `#00D26A` numbers, Loss Red `#FF3B30` (Decoded accent), Highlighter `#FFD60A` emphasis. Ponzi chapter uses the sepia palette from the Ponzi short (`#E6D5B0`, `#C9B07E`, `#2B1D0E`) with film grain/scratches.
- Fonts (@fontsource): Anton (titles/stamps), Inter 800 (captions), JetBrains Mono 700/800 (numbers), Special Elite (documents), Rye (1920s cards).
- **Something must change every 10–20 s at minimum, ideally every 3–6 s** (cut, zoom, counter, stamp, camera move). No static slides.

## Persistent layers (every frame except the end card)
- **Captions:** lower third, centered x=960, baseline ≈ y 945, Inter 800 58 px, max width 1300, 1–2 lines, key words colored (green numbers, red losses, yellow emphasis), black stroke. Timed from Whisper word timings, groups of 3–7 words, appear 0.05 s early.
- **Storyteller:** the shared character `brand/storyteller.js` (load via relative path `../../../brand/storyteller.js`). For 16:9 add a `pos` option to the module (backward-compatible; Shorts keep the default) and place him bottom-right at x≈1760, feet y≈1060, scale ≈0.95. Speech bubble / follow button anchors must also follow `pos` (bubble up-left of him). Mouth = narration loudness (mouth.json, 30 fps). Pose timeline in this doc.
- **HUD:** top-left tag (red "DECODED" pill) + "CASE FILE: THE IMPOSSIBLE NUMBER", and a thin red progress bar across the top. Chapter name small at top-right during chapters 1–4.
- **Footnote** bottom-left, JetBrains Mono 20 px, 60% white: "DOCUMENTED CASES · SOURCES IN DESCRIPTION · NOT FINANCIAL ADVICE".

## Global FX (reuse from the shorts)
glitch (RGB split + slice tears), screen shake, punch-zoom on key beats, whip-pan slide (0.16 s) on every scene cut, paper slam-in with shadow, rubber stamps (Anton in a rounded box, slam scale 2.6→1), counters that roll with easing, film grain + gate weave for sepia scenes.

## Timing contract
`voice/timeline.json` (made by the voice agent) gives every paragraph `{id, start, end}` and every word `{w, s, e}`. **Scenes are keyed to paragraph ids**, never to hard-coded seconds; beats inside a paragraph are keyed to the start time of a specific word (e.g. "stamp lands on the word 'twenty'"). Helper: `P('P15').start`, `W('P15', 'twenty-seven')` → time of that word inside that paragraph.

---
## Storyboard (per paragraph)

### COLD OPEN (P01–P07) — black, investigative
- **P01** Frame 0 = a real-looking trade ticket (paper, Special Elite) slams in: "DATE: APR 16, 1991 · BUY 123 CALLS · PROCTER & GAMBLE". The "123" is huge, green. Camera slow push. Storyteller already on screen (pose `point`).
- **P02** Hard cut: a market tape / exchange board for that day; counter "TOTAL TRADED TODAY" rolls 0 → **20** and stops. Then split screen: **CLAIMED 123** (green) vs **EXISTED 20** (red). Glitch hit on "twenty".
- **P03** "6×" appears between them (123 ÷ 20 = 6.15). A calendar flips 1991 → 2008 fast (17 pages) on "seventeen more years".
- **P04** Counter $0 → **$65,000,000,000** in red mono, screen shake when it lands; text under it "FAKE ACCOUNT BALANCES".
- **P05** Everything collapses into one glowing red number "?" / the words **A NUMBER THAT CANNOT EXIST** typed out.
- **P06** Three case-file folders slide in left→right, each with a mini icon: postal coupon (1920), oil tank (1963), straight-line chart (2008). Each lands on its phrase.
- **P07** A checklist card with 3 empty checkboxes "THE IMPOSSIBLE NUMBER TEST" + padlock; on "Ponzi scheme" → **TITLE CARD** (1.2 s pause): "THE IMPOSSIBLE NUMBER" Anton 160 px, red underline sweep, glitch in/out.

### CHAPTER 1 — THE COUPON THAT COULDN'T EXIST (P08–P20) — sepia 1920 film look
- **P08** Silent-film intertitle card (Rye, ornate border): "CHAPTER ONE · THE COUPON THAT COULDN'T EXIST".
- **P09** Split: BANK 5%/YEAR vs PONZI 50%/45 DAYS; $100 → $105 vs $100 → $150 bars race (reuse Ponzi short). Silhouette of Ponzi (bowler hat) on "Charles Ponzi".
- **P10** A large international reply coupon (stylized, "REPLY COUPON") flips over; map with EUROPE (left) and AMERICA (right), ocean waves between.
- **P11** Coupons fly Europe → America; "BUY LOW" / "CASH IN HIGH" tags; small "LEGAL ✓" stamp on "legal".
- **P12** Investor line marching to the "SECURITIES EXCHANGE CO." door; counter "$ PER DAY" climbing toward ~$1,000,000 on "a million dollars a day".
- **P13** Blue police caps in the line; stamp "≈75% OF BOSTON POLICE".
- **P14** Typewriter close-up / newspaper office; "CLARENCE BARRON" name card (no photo, silhouette).
- **P15** Coupon tower rising off the top of frame, counter → **160,000,000**; then hard cut to a tiny pile labeled **27,000**.
- **P16** Ratio graphic: 6,000 coupon icons in a grid, ONE highlighted green ("1 per ~6,000").
- **P17** Investor pyramid; money ($) flows from the newest (bottom) row up to the old (top) rows; label "NEW MONEY PAYS OLD".
- **P18** Spinning newspaper "EXTRA!" (headline numbers only: "160,000,000 vs 27,000"), then crowd running, 6 banks crumble one by one (counter 1/6…6/6), "$20,000,000" in red.
- **P19** Dictionary entry types "Pon·zi scheme (n.)"; then a faded portrait card + "ESTATE: $75" with coins dropping.
- **P20** Re-hook transition: the coupon dissolves into an oil-tank silhouette; film look fades out to modern dark.

### CHAPTER 2 — MORE OIL THAN AMERICA (P21–P33) — dark case-file, oil gold / water blue
- **P21** Chapter card (modern): "CHAPTER TWO · MORE OIL THAN AMERICA" with red string.
- **P22** Map pin "BAYONNE, N.J."; tank farm of 5 cutaway tanks; case-file card "TINO DE ANGELIS · ALLIED CRUDE" (silhouette).
- **P23** Animated flow diagram, step by step: TANK → INSPECTOR → RECEIPT → BANK → $ (each box lights in turn on its noun).
- **P24** Warehouse receipt document; "AMERICAN EXPRESS WAREHOUSING" line; CERTIFIED stamp lands on "vouched".
- **P25** Receipts multiply (photocopier stack) while the tank level stays the same; label "RECEIPT OIL".
- **P26** X-ray cutaway of a tank: thin oil layer on top, water below (bubbles), hidden compartment tube under the hatch highlighted with a dashed red box; inspector flashlight at the hatch → "OIL ✓" stamp.
- **P27** 4 tanks + pipes; the same golden oil blob races through the pipe ahead of the inspector; "SAME OIL · COUNTED ×1…×4".
- **P28** Two tanks: "ALL OF THE U.S." vs "ALLIED'S RECEIPTS" — Allied's overflows past it.
- **P29** Two columns fill: 900,000 (paper) vs 55,000 (real); stamp "94% NEVER EXISTED" ((900,000−55,000)/900,000 = 93.9%).
- **P30** Futures price chart rises then crashes on "cracked"; screen-crack overlay; "MARGIN CALL" stamp.
- **P31** 51 bank icons turn red; counter "$180,000,000+"; stamp "AMEX WAREHOUSE UNIT: BANKRUPT".
- **P32** Prison bars slam; "20 YEARS" → struck → "7".
- **P33** Re-hook: split panel "COUPONS ✗" "OIL ✗" then a third locked panel "A PERFECT RECORD?" with a straight glowing line; glitch.

### CHAPTER 3 — THE FUND THAT ALMOST NEVER LOST (P34–P50) — clean modern finance UI, green/red
- **P34** Chapter card: "CHAPTER THREE · THE FUND THAT ALMOST NEVER LOST".
- **P35** Wall Street building silhouette; badges "FORMER NASDAQ CHAIRMAN", "TOP WALL ST MARKET MAKER" (silhouette of Madoff, no photo).
- **P36** Return bars year after year, all ≈10%, ticking in one by one ("~10% / YEAR").
- **P37** Split: "PONZI SOLD GREED" (50% rocket) vs "MADOFF SOLD SAFETY" (calm flat-ish line with a shield icon).
- **P38** Counter "10.5% / YR × 17 YEARS"; then a 2008 crash chart (S&P-style line falling, labeled "MARKET, 2008" — illustrative, no numbers) next to "FUND: STILL UP" green.
- **P39** THE KEY VISUAL: a jagged real-market chart drawn left→right (deterministic noise), then Madoff's line drawn as a near-perfect straight 45° line over it, glowing; protractor arc "45°"; stamp **TOO PERFECT**.
- **P40** "HARRY MARKOPOLOS" card (silhouette); stopwatch: "5 MIN" (doubt) → "4 HOURS" (proof).
- **P41** Grid of 100 month-cells: only 4 red, 96 green; label "LOSING MONTHS ≈ 4%".
- **P42** "CBOE" exchange: bar "OPTIONS THAT EXISTED" vs a much taller bar "OPTIONS MADOFF NEEDED" punching through the ceiling; stamp "IMPOSSIBLE". (No specific numbers — the source gives none.)
- **P43** Callback: the 1991 trade ticket from the cold open returns: 123 vs 20.
- **P44** SEC building icon; memo document slams in titled "THE WORLD'S LARGEST HEDGE FUND IS A FRAUD" (21 pages, 2005); dates 2000 → 2005 on a timeline.
- **P45** Timeline 1992–2008 with 8 magnifying-glass icons popping; each gets a grey "NO FRAUD FOUND".
- **P46** 2008 crash; withdrawal counter $0 → $7,000,000,000 red.
- **P47** Bank-account bar draining: "$5,000,000,000+" → "$234,000,000".
- **P48** Calendar "DEC 10, 2008" → "DEC 11, 2008"; handcuffs icon / "ARRESTED" stamp.
- **P49** Big red "$64.8B" with a bracket showing "$35–55B NEVER EXISTED (MARKOPOLOS ESTIMATE)".
- **P50** "11 FELONIES · 150 YEARS" stamp; prison bars; "DIED IN PRISON, 2021".

### CHAPTER 4 — THE IMPOSSIBLE NUMBER TEST (P51–P57) — bold checklist
- **P51** The checklist card from P07 returns, padlock opens.
- **P52** Check 1 "DOES IT NEED MORE THAN EXISTS?" — three mini icons (coupon, oil, option) each with "NEEDED > EXISTED".
- **P53** Check 2 "IS IT TOO SMOOTH?" — wiggly real line vs straight line; the straight one gets a red ✗.
- **P54** Check 3 "CAN ANYONE ELSE CHECK IT?" — three mini panels: index cards (Ponzi), inspector with a handshake (De Angelis), "MADOFF → MADOFF" self-check arrow.
- **P55** All three checkboxes tick red ✓ one after another; three case folders stamped "CAUGHT BY MATH".
- **P56** A perfect chart; question text "WHAT WOULD IT TAKE FOR THIS TO BE TRUE?" types out.
- **P57** CTA: storyteller `follow` pose taps a red **SUBSCRIBE** button (adapt the module's follow button: label "SUBSCRIBE" / "✓ SUBSCRIBED"); comment bubble "WHICH RED FLAG WOULD CATCH YOU?"; mini thumbnail of the salad-oil short on "watch the tank".
- **END CARD (15 s after P57)**: clean dark background, "BAD MATH" logo text + the coin head, two empty 16:9 rectangles (left: "WATCH NEXT", right: "SUBSCRIBE" circle area) positioned for YouTube end-screen elements, music only.

### Storyteller pose timeline (by paragraph)
idle at start → point (P01) → shock (P02 on "twenty") → point (P03–P04) → chin (P05) → point (P06–P07) → shrug (P08) → point (P09–P14) → shock (P15 on "twenty-seven") → point (P16–P19) → chin (P20) → point (P21–P25) → shock (P26 on "water") → point (P27) → shock (P28 on "entire") → point (P29–P32) → chin (P33) → point (P34–P38) → shock (P39 on "perfect") → point (P40–P41) → shock (P42 on "existed") → point (P43–P47) → shock (P48 on "arrested") → point (P49–P50) → you (P51) → point (P52–P55) → chin (P56) → follow (P57) → wave (end card).

## Sound (CC0 only — Freesound via Openverse API, `license=cc0`)
- **Music beds** (ducked under voice, −24 LUFS before ducking): cold open = dark suspense drone; Ch1 = old honky-tonk/ragtime piano + vinyl crackle + projector; Ch2 = dark investigative pulse/drone; Ch3 = modern tense minimal beat; Ch4 = steady uplifting-but-tense loop; end card = same as Ch4, fade out. Hard stop / tape-stop into each chapter card.
- **SFX on hits:** paper slam/thump (documents), rubber stamp, typewriter, cash register/coins, glitch + sub boom (P02, P04, title card, P33, P39), whoosh on every cut, crowd murmur (P12–P13), demolition (banks), pipes/liquid (P26–P27), glass crack (P30), cell door (P32, P50), clock/stopwatch tick (P40), camera flash (silhouette reveals), heartbeat before big reveals (P15, P42).
- Master: −14 LUFS integrated, true peak ≤ −1 dBTP. Voice −16 LUFS pre-master; music ducked ≥10 dB under voice.
- Credit every file in `sfx/CREDITS.md` (title, creator, license, URL).

## Thumbnails (1280×720, < 2 MB) — make all three
- **A (primary): "TOO PERFECT"** — dark grid with a jagged red/green market line across the frame; one glowing green ruler-straight line at 45° slicing up through it; huge red stamp "TOO PERFECT" (Anton, ~150 px, slight rotation) top-left; "$65 BILLION" small white top-right; the storyteller coin head big (≈360 px) bottom-right with shocked face (shock pose head). Hand test: chart + stamp alone must read "fake money chart".
- **B: "123 vs 20"** — two giant numbers: "123" green left, "20" red right, "vs" between, label under each: "CLAIMED" / "EXISTED"; red "IMPOSSIBLE" stamp across; storyteller head bottom-right.
- **C: "$65B LIE"** — calculator-style LCD panel reading "ERROR", red "$65B" above it; storyteller head.
All: ≤4 words of big text, readable at 160 px wide, high contrast.

## QA (builder must check before handing back)
- Contact sheet of 24 frames across the video; no text overlaps, nothing behind the storyteller, captions readable, no blank/frozen stretch > 20 s, frame 0 not empty.
- Loudness −14 ±1 LUFS, true peak ≤ −1 dBTP. Duration ≈ narration + 15 s.
- Caption word match vs script ≥ 95% (numbers as digits OK).
