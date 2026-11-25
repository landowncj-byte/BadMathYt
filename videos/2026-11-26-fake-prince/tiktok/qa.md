# QA - fake-prince (tiktok)

Build source: `_src/` (shared.js, reuse.js, yt/tt/ig.js, build.sh). Render: bm2 v2, 1080x1920, 30 fps.

## VIDEO GATE
| # | Result | Note |
|---|---|---|
| V1 | PASS | script_gate.py --all PASS on real sentences.json |
| V2 | YES | 1-fps timestamped sheet (contact_sheet.png) plus per-beat stills reviewed |
| V3 | YES | Frame 0 = PORK order ticket slammed on a brass spike in front of the crown, FAKE PRINCE / ORDERED PORK; full hook text visible, storyteller bottom corner, not over the text; hit sound |
| V4 | YES* | camera/card/stamp change every 2-3 s; hook layout ~5 s (0-5.0) with push-in at 'pork'; rest <=3 s |
| V5 | YES | push-ins on spoken numbers/ticket; storyteller travels (corner/front/peek/behind) |
| V6 | YES | heart pulse, paper plane + SEND, mag taps +FOLLOW, comment bubble; each <=1.5 s, small |
| V7 | YES | payoff = PORK ticket hardest push + shake at 26.8-27.1 s (83%); ends ~5 s later; whips back to the frame-0 composition (hook text, crown, prop re-slam) |
| V8 | YES | brand lock intact, no neon glow |
| V9 | YES | every number from research.md, attributed; ILLUSTRATION/PROP labels; surname only on the verdict case card |
| V10 | YES | captions from words.json with fix (heart, $8, 18+), gap 16, y 1432 |
| V11 | not re-listened | voice untouched; Whisper words match script |
| V12 | YES | CC0 sfx-library only, -14 LUFS, peak -1.3 dBFS |
| V13 | n/a | posting not part of this build |

## On-screen facts
| On screen | Source in research.md | Grade |
|---|---|---|
| FAKE PRINCE / ABOUT 30 YEARS (~30) | 1988 to 2017 arrest, DOJ dates | 2 (footnote spells it out) |
| ARRESTED OR CONVICTED 11x SINCE 1988, PROSECUTORS SAID | DOJ wording via Real Deal / law.com, attributed | 2 |
| MORE THAN $8,000,000 TAKEN, PER DOJ | DOJ + AP | 2 |
| PLEADED GUILTY; MORE THAN 18 YEARS; SENTENCED MAY 31, 2019; S.D. FLORIDA | DOJ release | primary |
| CASE: ANTHONY GIGNAC (plain text, case card only) | DOJ | primary |
| DIPLOMATIC PLATES / SECURITY BADGES: FAKE (generic props, ILLUSTRATION/PROP) | DOJ extract, law.com, Real Deal | 2 |
| HE ORDERED: PORK; A VICTIM NOTICED, PER AP | AP: ruse fell apart when a victim saw him eat pork | 2 |
| ROYAL ID card, crown, silhouette, cloche | illustration only, labelled | n/a |
Layout checks (review lessons 2026-11-25): frame 0 full hook text; all on-screen text/buttons/counters above y 1340 (captions y 1432, footnote 1500; only the ILLUSTRATION micro-labels inside zoomed cards can sit lower); temporary text uses element `out` (0.28 s fade) and was checked at out+0.1..0.3 s.
