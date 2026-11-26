# DIRECTION — "5 Cons That Fooled Billionaires, Banks and Entire States" (long-form, 16:9)

Copied pipeline: videos/2026-11-25-impossible-number (build2/src → scene.js, voice-owen/build_owen.py alignment, mix_long.py, srt.cjs, sheets.py, qa.cjs).
Look = RULES 111 (engine-v2, Decoded theme, gold-coin storyteller bottom-right, Anton/Inter/JetBrains Mono, paper cards, push-ins on spoken numbers). Crime-show = RULES 112 (each con is a recurring character, evidence board, chapter/case cards, "picture = the spoken words").
Script and facts are fixed (paragraphs.json). 1920x1080, 30 fps. Scene = narration (≈ 8:50 with pauses) + 12 s end card.
Every scene is keyed to paragraph ids and word refs (`@P15:date`), never hard-coded seconds. Audio: Owen chapter takes (final, untouched), aligned by `voice-owen/build_owen.py` → `align/`.

## Cast (the con is the recurring character; ≥ 5 appearances each, 6 treatments)
| Chapter | Con | Card | Source |
|---|---|---|---|
| 1 | **Rudy Kurniawan** "THE WINE COLLECTOR" | REAL photo | brand/photos/rudy-kurniawan/2.jpg (ICE 2021, public domain) |
| 2 | **Anthony Gignac** "THE PRINCE" | REAL photo | brand/photos/anthony-gignac/1.jpg (Miami-Dade booking, public domain) |
| 3 | **Eddie Tipton** "THE LOTTERY IT GUY" | coloured ILLUSTRATION | assets/tipton.png (same design as the lottery-rig Short; no licensed photo) |
| 4 | **Scott Tucker** "THE PAYDAY LENDER" | coloured ILLUSTRATION | assets/tucker.png (suit, shades, loan form; no likeness claim) |
| 5 | **Charlie Javice** "THE FOUNDER" | coloured ILLUSTRATION | brand/photos/charlie-javice-illustration/founder.png (same as the Javice Short) |
Victims get consistent faces too (crime.js `victim`: BILLIONAIRE COLLECTOR, THE WINEMAKER, THE DINER, THE INVESTORS, THE BANK).
Treatments used per chapter (crime-show vocabulary): 1 CASE-FILE intro card (file folder + name plate) · 2 PITCH (side card + quote) · 3 TRICK (pip in corner, red arrow to the step) · 4 CATCH (red ring / X / "WANTED") · 5 VERDICT (bars slide in + SENTENCED stamp) · 6 EVIDENCE BOARD callback in chapter 6 (all five faces pinned, strings pull tight). Slow Ken-Burns push on the faces on the big reveals.
Persistent: storyteller (poses by beat), HUD pill DECODED + "CASE FILE: 5 CONS", red chapter label (THE PITCH · THE TRICK · THE CATCH · THE SENTENCE), footnote with sources + photo credits, captions (Inter 800 58 px, y 945).
Rooms: one far-away room per chapter in the single world (`K(room,k)`), whip-pan between stations, stage palette crossfades per chapter (burgundy / royal teal / lottery gold-navy / payday green / founder purple / steel).

## COLD OPEN (P01–P06) — three faces, three numbers
- **P01** Frame 0: Kurniawan photo card (mugshot treatment) + counter **$2.1 MILLION** green→red; bottle tile "FAKE" beside. Push on "two point one". Storyteller `point`.
- **P02** Whip to Gignac? no — to the BANK: bank building icon + counter **$175 MILLION** + "4,000,000 CUSTOMERS" with a row of empty-silhouette dots fading out on "did not exist" (Javice illustration card pinned small).
- **P03** Lottery: Tipton illustration card + jackpot ticket counter **$16.5 MILLION** + "RIGGED BY THE MAN WHO PROTECTED IT"; lock icon breaks on "protect".
- **P04** Three folders slide in with the five faces fanned out ("FIVE REAL CONS"); gavel on "courtroom"; "SAME WAY" question mark on "caught the same way".
- **P05** Giant "?" → one small number "1" under a magnifier; text "ONE SMALL NUMBER THAT DID NOT ADD UP" types on.
- **P06** Teaser: the five faces on the evidence board silhouette, strings drawn but not tight (callback in ch.6), "THE PATTERN" stamp. Title card "5 CONS" (headline, 1.2 s) hits at the end.

## CH1 — THE WINE THAT COULDN'T EXIST (P07–P20), burgundy room
- **P07** Chapter card: "CHAPTER ONE · THE WINE THAT COULDN'T EXIST" + Kurniawan file card (INTRO).
- **P08** Datecard "LOS ANGELES · EARLY 2000s"; Kurniawan card with quote "A YOUNG COLLECTOR" + victim "THE SOMMELIERS" (collector kind) at a dinner table of glasses.
- **P09** Bottle tile "$10,000 A BOTTLE" slams, glass row; quote card "GENIUS" with the photo (PITCH).
- **P10** Auction: gavel + two lot pages, counter **$35,000,000** ("2 SALES · 2006"), stamp "WORLD RECORD".
- **P11–P12** THE TRICK, numbered steps 1 OLD CHEAP WINE + 2 NEW WINE → 3 EMPTY OLD BOTTLES → 4 NEW CORKS · NEW WAX · PRINTED LABELS; Kurniawan pip with arrow to the step. Labels stack with the word "FAMOUS".
- **P13** Kitchen photo (brand/photos/rudy-kurniawan/3.jpg) in a paper frame "FBI SEARCH · 2012" + tiles: corks, wax, labels counting up; stamp "WINE FACTORY".
- **P14** Tasters row of faces with ✓ "DRANK IT · PRAISED IT".
- **P15** "NOT TASTE. A DATE." headline; Kurniawan card gets the red ring (CATCH).
- **P16** Lot page "CLOS SAINT-DENIS · NEW YORK AUCTION 2008" with label years rolling back to **1945**.
- **P17** Winemaker victim card (LAURENT PONSOT) objects; timeline "1982 · FAMILY STARTS MAKING IT".
- **P18** Ruler: 1945 ← 37 YEARS → 1982, **37** counter, stamp "OLDER THAN THE WINE".
- **P19** Billionaire card (BILL KOCH) + counter **$2.1M** + **219 BOTTLES**, "SAYS FAKE".
- **P20** VERDICT: Kurniawan photo, jail bars, stamp "CONVICTED 2013", bars "10 YEARS" + "$28M+ OWED".

## CH2 — THE PRINCE WHO ORDERED PORK (P21–P33), royal teal room
- **P21** Chapter card + Gignac file card with crown. **P22** Datecard "MIAMI"; PITCH quote "PRINCE KHALID BIN AL-SAUD · SAUDI ROYAL FAMILY". **P23** Fisher Island card (map pin + skyline) + door sign "SULTAN". **P24** Ferrari + "DIPLOMATIC" plates + badge tiles. **P25** Investors victim card + "HUNDREDS OF MILLIONS" promise bubble + "GET IN FIRST" arrow. **P26** counter **$8,000,000+** into a briefcase.
- **P27** Reveal: crown knocked off, plates/badges stamped FAKE; photo card swaps to "ANTHONY GIGNAC · MICHIGAN". **P28** "NOBODY CHECKED THE PLATES" red magnifier. **P29** Diner victim card + fork + pork cloche; X on "devout". **P30** Security team: magnifier on the card, ID cards crumble. **P31** Counter **11** arrests since 1988 (11 mug-card strip, same prince act). **P32** VERDICT: bars + "18+ YEARS" stamp "SENTENCED 2019". **P33** (LIKE) heart pulse at the storyteller, "TRUE STORIES WITH REAL NUMBERS" tile.

## CH3 — THE LOTTERY'S OWN SECURITY GUY (P34–P47), lottery gold-navy room
- **P34** Chapter card + Tipton illustration file card. **P35** Millions of ticket icons; "RANDOM?" stamp. **P36** Map pin IOWA; Tipton card "INFORMATION SECURITY DIRECTOR"; many-states map. **P37** Code window `< code >` with Tipton pip "HE HELPED WRITE IT". **P38** Calendar with a few dates highlighted; ball row "NOT RANDOM · HE CAN PREDICT" (THE TRICK steps 1 write code / 2 hide code / 3 predict). **P39** Flow: TIPTON → numbers → BROTHER + FRIEND → TICKET → $ ; "WORKERS CAN'T PLAY". **P40** Map: COLORADO · WISCONSIN · OKLAHOMA pins, counter **$2.5M+**. **P41** Datecard "DEC 29, 2010 · DES MOINES", ticket + counter **$16.5M**. **P42** Face-reveal slot "SHOW YOUR FACE" empty silhouette. **P43** Calendar year of nothing (counter 11 months) → clock "< 2 HOURS" → trust card "BELIZE". **P44** Stamp "NO PAY UNTIL WE KNOW WHO". **P45** Security-video frame + sound waves → co-workers' faces "THAT'S HIS VOICE" → red ring on Tipton. **P46** VERDICT: bars + "UP TO 25 YEARS" + "PLEADED GUILTY 2017". **P47** Ticket "UNCLAIMED $16.5M" stamped VOID.

## CH4 — THE LOAN THAT NEVER ENDED (P48–P59), payday green room
- **P48** Chapter card + Tucker file card. **P49** Rent due Friday / paycheck Monday calendar gap with a loan bridge. **P50** PITCH: loan form BORROW $500 → PAY BACK $650 with Tucker side quote "CLEAR". **P51** "EXPENSIVE, BUT CLEAR. EXCEPT…" **P52** THE TRICK: payday calendar, each payday −$150 fee, "OWED $500" tile never moves, counter grows. **P53** counter **$1,925** on a $500 loan (DOJ borrower). **P54** bars: **~700%** vs **22%** credit card. **P55** Counters **4,500,000 borrowers** + **$3.5 BILLION**. **P56** Race-car tile "HIS OWN RACING TEAM" (Tucker pip). **P57** Tribe shield: "STATES CAN'T SUE TRIBES" → stamp "SHAM — PROSECUTORS". **P58** VERDICT: jury "14/14 COUNTS", bars "200 MONTHS = 16+ YEARS". **P59** (SEND) paper plane.

## CH5 — FOUR MILLION PEOPLE WHO NEVER EXISTED (P60–P70), founder purple room
- **P60** Chapter card + Javice file card. **P61** PITCH: site "FRANK" form card (college aid form, no logos). **P62** counter **4.25 MILLION USERS** (her claim) with Javice side quote; banks queue. **P63** bars: 4,250,000 vs <300,000 true scale; stamp "SEC: FEWER THAN 300,000". **P64** JPMorgan = "THE BANK" building asks → customer-list doc. **P65** problem: 4M dots needed vs few. **P66** Engineer victim card "REFUSED". **P67** Professor card (the Javice Short's `prof`-style) + data scrolling "4,000,000+ FAKE RECORDS" + **$18,000** cheque. **P68** cash stack counter **$175M**, handshake. **P69** email grid "DELIVERED ✗ ✗ ✗" collapsing. **P70** VERDICT: bars **85 MONTHS** + **$287.5M**; stamp "CONVICTED ON ALL 4 COUNTS 2025".

## CH6 — THE PATTERN (P71–P81), steel room, evidence board
- **P71** Chapter card "THE PATTERN" + evidence board with all five faces. **P72** strings start. **P73–P77** one pinned clue per beat, string pulls from that con's face to the clue: LABEL 37 YEARS OLDER · A PRINCE WHO ATE PORK · A JACKPOT NOBODY COULD CLAIM · A BALANCE THAT NEVER MOVED · A LIST 14× TOO BIG (counter 14×). **P78** magnifier ring on "ONE NUMBER, ONE DETAIL". **P79** the three-question test (checklist) with the questions typed, padlock; **P80** all three tick, five faces stamped "FAILED THE TEST". **P81** SUBSCRIBE tap + comment bubble "WHICH CON WOULD HAVE FOOLED YOU?"; **END CARD 12 s**: logo text, "WATCH NEXT" rect, "SUBSCRIBE" circle (music only).

## Sound
CC0 only (brand/sfx-library manifest + beds from videos/2026-11-25-impossible-number/sfx, reused). Per-chapter beds, SFX on every reveal: paper slam, stamp, camera shutter on photo reveals, gavel on verdicts, cell door on bars, typewriter on quotes, heartbeat before reveals, cash register on money counters. Master −14 LUFS, peak ≤ −1 dBTP.

## Thumbnail (1280×720)
v2 look: dark grid, **"5 CONS"** huge Anton (red/white), the two real photos (Kurniawan, Gignac) + three illustrated cards fanned, red stamp "ALL CAUGHT BY ONE NUMBER", gold coin storyteller shocked bottom-right. No logos.

## QA
Contact sheets per chapter (every ~6 s), look at real frames at beat times: no cropped text, no overlaps, nothing static > ~3 s, captions clear of graphics. Loudness, size ≤ 250 MB, captions.srt, chapters list.
