# SHOW BIBLE — Bad Math, "PAPER TRAIL" style

**Status:** written 2026-11-25 for RULES 107 (owner: "little animated characters… walking around… storyboard each scene… like a movie… something unique with its own feel"). This file is the source of truth for the LOOK, CAST, SHOTS and FORMATS of every new video. RULES.md still wins on everything it covers (facts, CTAs, lengths, voice, labels). Nothing new is built until the pilot (`videos/2026-11-26-fake-wine/STORYBOARD.md`) is approved by the owner.

**What it replaces:** the "graphics on a stage + presenter" layouts of VISUAL-V2. What survives from v2: the engine, the deterministic `render(t)` pipeline, `@word` timing, the paper/clay materials, the captions, the brand lock.

---

## 0. The 12 laws (if you read nothing else)

1. **Owen is the only voice.** He narrates everything, including what characters say ("he told the jury…"). No character ever has audio. No speech bubbles as dialogue. A bubble or sign is allowed at most once per video, as a visual gag.
2. **The story is in the FACES.** Characters act silently with a stop-motion **replacement-face reservoir** (§2.4, 26 named faces). Faces SNAP; they never morph.
3. **The viewer is an eyewitness.** Every scene is staged in the present tense, as if it is happening live in front of us: cause → reaction within 10 frames, observer cameras, reaction close-ups (§5.1).
4. **No lecture slides.** No chart, card or list floats on a stage. Every number is on a prop a character touches (§6).
5. **A new shot every 1.5–3 s in Shorts**; average shot length 1.5–2.4 s; no shot over 4 s.
6. **Characters move on twos (15 poses/s, held). The camera, props and numbers move at 30 fps.** That contrast is the house feel.
7. **Everything is cut paper lit by one lamp.** No glow, no bloom, no neon. Light is a paper shape; shadow is a paper shape.
8. **Real people are an ARCHETYPE puppet with a name plate, never a likeness.** A licensed real photo may appear only as an EVIDENCE PHOTO prop.
9. **Red marks the lie (Decoded). Yellow marks the prize (What If).** The series accent is used for nothing else.
10. **Every video is storyboarded in the §10 template and passes the keyframe board review before the full render.**
11. **Shorts are numbered episodes** with a cold open and a ≤ 1 s sting. **Long-forms are movies** with three acts, chapter cards and credits.
12. **The first frame is mid-action and the last frame cuts back into it.**

---

## 1. Look and name

### 1.1 The pitch
**PAPER TRAIL.** Every Bad Math story happens inside a pop-up book built from the things money leaves behind: banknote paper, receipts, case files, price tags. Small paper "token people" with snap-on stop-motion faces live in fold-out paper sets lit by a single lamp, and we watch them through a movie camera that peeks, pushes in and cuts like a heist film. The host is the only thing in this world that is not paper: he is a gold coin. It mixes six niches on purpose (§A): the confessional intimacy of storytime cartoons, the deadpan map-and-gag rhythm of comedic history, the mid-action cold open of 3D story Shorts, the colour discipline of premium explainers, the impact frames of anime, and the planning montage and freeze-frame intros of heist films. It looks like none of them, because everything is cut paper, everybody moves on twos, and nobody speaks.

### 1.2 Shape rules
- **Everything is a cut-out.** Each shape has one flat fill, a 2 px lighter edge on the top-left (the paper's cut edge) and a hard-edged drop shadow offset (+10, +14) px in Shadow `#020409` at α 0.34. No blur on that shadow at layer distance < 40 px; blur 6 px on far layers.
- **Corners:** radius 6–10 px on props, 0 on torn edges. A torn edge is a seeded zig-zag, 6–10 px amplitude, used only on evidence, impact frames and chapter cards.
- **Characters are outlined, the world is not.** Characters and hand props: Ink `#0B0F14` outline, 5 px at a 520 px-tall figure (scale with the figure; never under 3 px or over 9 px on screen), seeded wobble ±0.6 px so it reads hand-cut. Sets: no outline, only edge + shadow. That is what keeps a character readable against any set.
- **Proportion of detail:** hero prop (the bottle, the briefcase) gets up to 12 shapes; background props ≤ 5 shapes; crowd figures ≤ 3 shapes.
- **Texture:** paper grain at 5 % opacity over the whole frame (existing `BM2.grain`, seeded), plus fibre flecks at 3 % on Paper-coloured shapes only. No photo textures, no halftone, no scan lines.

### 1.3 Light rules (how "no neon" is enforced)
- **One key light per set**, always named in the set file (`lamp: {x, y, dir}`). It is drawn as an opaque paper wedge or pool: warm `#F4D9A0` at α ≤ 0.30 (Decoded), cream `#FFF4DC` at α ≤ 0.22 (What If).
- **Cast shadows are shapes:** every character and standing prop casts a skewed copy of its silhouette on the floor, away from the lamp, Shadow at α 0.38 (Decoded, length 1.6 × height) or Grape `#3D2A73` at α 0.22 (What If, length 0.5 × height).
- **Gobos (Decoded only):** venetian-blind stripes, window crosses, prison bars, as flat shadow shapes sweeping over characters. Max one gobo per shot.
- **Banned:** outer glow, bloom, additive blending, gradients with a luminance change over 8 %, lens flares, light text on a glowing plate, any fill with HSL saturation > 85 % covering more than 10 % of the frame. The series accent may cover at most 8 % of the frame (impact frames excepted: 2 frames).

### 1.4 Palette
Brand tokens are unchanged: Ink `#0B0F14` · Paper `#F5F3EE` · Money Green `#00D26A` · Highlighter `#FFD60A` · Loss Red `#FF3B30` · Gold `#F2B705`. Fonts unchanged: Anton (titles, hero numbers, wordmark), Inter 800 (captions, tags), JetBrains Mono (prop numbers, footnotes, stamps). Pills, wordmark, captions and safe zones unchanged.

| | **DECODED — "Night Edition"** (noir / heist) | **WHAT IF — "Day Edition"** (game show / fantasy) |
|---|---|---|
| Time of day | always night or lamp-lit interior | always daylight or stage light |
| Backdrop | Ink `#0B0F14`, Midnight `#1B2433` | Cream `#FFF4DC`, Sky `#7FCDEB` |
| Set papers | Oxblood `#5E1F1B`, Manila `#C9A66B`, Smoke `#59606B`, Slate `#2A3647` | Tangerine `#F58A2E`, Grape `#5A3FA0`, Mint `#9BE3C0`, Curtain Plum `#3D2A73` |
| People | Paper heads, costumes in Smoke / Slate / Manila | Paper heads, costumes in Sky / Tangerine / Mint |
| Accent (law 9) | Loss Red: the liar's pocket square, fake things, verdict stamps | Highlighter: the prize, the right answer, the meter |
| Contrast | dark 70 % / light 30 % of the frame | light 70 % / dark 30 % |
| Shadows | long, hard, black-blue | short, soft-edged, Grape (never black) |
| Camera temper | slow creeps, Dutch tilts up to 6°, peeks | level horizon, bouncy trucks, crash zooms |
| Set-open move | pop-up unfolds from darkness, lamp clicks on | curtain parts, pop-up springs up with a bounce |
| Text tags | typewriter mono on manila labels | Anton on scoreboard tiles |

Money is always the same in both: bills Cash Green `#1FA366` with a Paper band, coins Gold. A viewer must tell the series from one frame with the pill covered.

---

## 2. Characters

### 2.1 The token-people rig
All humans are "token people": a board-game piece with a face.

| Part | Rule (at scale 1 = 520 px tall, feet on y = 0) |
|---|---|
| Height | 2.6 heads. Head 200 px tall. Kids 2.1 heads, 380 px. |
| Head | A **Paper White `#F5F3EE` cut-out for every human**, whatever the real person looks like. Five head shapes carry identity: round, square, tall oval, pear (wide jaw), bean (tilted). No nose, no ears, no skin tones. |
| Hair / hat | One flat shape, 1 colour, sits on the head as a separate piece (it bounces 2 frames late). |
| Body | One bell/pawn shape, 230 px tall, 170 px wide at the hem, in the costume colour. A second flat shape for the costume tell (apron, robe, lapels). |
| Arms | 2-bone, 22 px thick strokes with round caps in the sleeve colour, Paper mitten hands (34 px circle, a thumb nub when holding). Hands can hold one prop each (`hold: 'paddle'`). |
| Legs | 2-bone, 24 px, 90 px long, wedge shoes 46 × 22 px in Ink. |
| Face area | 150 × 120 px slot centred on the head; every face in §2.4 is drawn inside it. |
| Outline | Ink, 5 px, on every part. |

The rig is one function: `puppet({look, pose, face, x, y, dir, s, hold})`. Poses are joint-angle sets; faces are indexes into the reservoir.

### 2.2 The host (the yellow mascot STAYS)
- **Decision:** the coin-head storyteller stays, as the **HOST**: the viewer's seat-mate and the only character who knows a camera exists. Brand lock holds: gold coin head with ridged edge, big white eyes, brown brows, rosy cheeks, navy suit `#2c3e66`, white shirt V, red bowtie. He is rebuilt on the token rig (same colours, same head-to-body ratio as today), which gives him legs (navy trousers, brown shoes), a walk cycle and world-space scale, so he can shrink into a wide shot.
- **Role:** Owen is the voice-over; the host is its body on screen only when the narration speaks to the viewer (a question, a CTA, a comparison, the closing question). His mouth mimes on those lines. The rest of the time he watches the story with us: leaning into frame, peeking over a prop, reacting with a face.
- **Screen-time budget:** on screen in 20–35 % of a Short's shots; never the subject of two shots in a row except the follow → verdict hand-off.
- **Powers (he is outside story time):** he can PAUSE a scene (freeze-frame, §5.4), walk in front of the frozen picture, pick a prop out of it, and slap stickers on it. No cast member can see him.
- **Props:** Decoded = magnifying glass + manila case folder. What If = slim hand microphone + cue cards. No costume changes.
- Still no name, never an expert, never "I", never advice, never a pitch (RULES 42).

### 2.3 The generic cast
Each archetype = head shape + hat/hair + costume + one **tell** readable in silhouette. Colours shown for Decoded / What If.

| ID | Archetype | Head | Silhouette tell | Costume | Default face |
|---|---|---|---|---|---|
| CON | The con artist | tall oval | slick swoop of hair, **Loss Red pocket square** (the only red on any person) | Smoke suit, wide lapels | F02 SMUG |
| MARK | The investor / victim | round | flat cap or bun, clutching a bag or envelope | Manila coat / Sky cardigan | F01 NEUTRAL. **Never given F02, F15 or any "dumb" face. Victims are never the joke.** |
| RICH | The rich collector | pear | bow tie, cufflink dots in Gold, bidding paddle | Slate dinner jacket / Grape jacket | F09 DEADPAN |
| JUDGE | The judge | square | huge robe (body 1.3× wide), tiny head, big gavel | Ink robe with Paper collar | F09 DEADPAN |
| AGENT | The federal agent | square | sunglasses bar (eyes hidden: uses brow + mouth sets only), windbreaker with block letters | Midnight windbreaker | F09 DEADPAN |
| YOU | The everyday person | bean | hoodie hood shape, phone in hand | Sky hoodie in both series | F01 NEUTRAL |
| PAL | YOU's friend (target of every "send this to…" gag) | round | scarf, coffee cup | Mint jumper | F04 DELIGHT |
| EXPERT | The expert / witness / whistle-blower | tall oval | round glasses, clipboard or ledger | Manila waistcoat or work apron | F06 SIDE-EYE |
| TELLER | Banker / auctioneer / dealer / clerk | square | visor or centre parting, stands behind a counter or podium | Slate waistcoat | F03 FAKE SMILE |
| JURY / CROWD | Groups | round | drawn in rows of 3–5, 3 shapes each, 2 frames of sway | Smoke / Sky, no faces beyond two dots | — |
| KID | A child (comparisons only) | round, 2.1 heads | backpack | Tangerine | F04 DELIGHT |

Rules: maximum 3 full-detail characters in one shot; one costume colour per character; a recurring archetype keeps its design in every episode so viewers learn the cast (the same AGENT arrests everyone; the same JUDGE sentences everyone; the same YOU suffers every comparison).

### 2.4 The replacement-face reservoir (26 faces)
Like a stop-motion puppet's box of swap-on faces. Each face is a complete, pre-drawn set (brows + eyes + mouth + extras), stored once and used by every character (the AGENT uses brows + mouth + extras only). **Each face must read in silhouette**: the "outline cue" is the part that changes the head's outline or sticks out of it.

| ID | Name | Brows | Eyes | Mouth | Outline cue (extras) | Use when |
|---|---|---|---|---|---|---|
| F01 | NEUTRAL | flat, mid | round dots | short flat line | none | default, listening |
| F02 | SMUG GRIN | one up, one flat | half-lidded | wide curl, one corner higher | chin tilts up 6° | the con is winning |
| F03 | FAKE SMILE | high, stiff | wide circles, tiny pupils | full-width teeth bar | one sweat bead on the temple | selling, lying to a face |
| F04 | DELIGHT | arched high | upturned arcs (closed happy) | open D | 2 sparkle chips by the head | a win, a kid, a prize |
| F05 | TRIUMPHANT | sharp V-down | wide, pupils up | huge open grin | both fists overhead (pose locked to face) | record sale, jackpot |
| F06 | SIDE-EYE | one down | pupils hard to one side, lids low | small flat line, off-centre | head turned 20° away from where the eyes look | someone smells a rat |
| F07 | SUSPICIOUS SQUINT | both low, pinched | two thin slits | tight zig-zag | head pushed forward 12 px | examining evidence |
| F08 | DISBELIEF | one very high, one low | one big, one small | small crooked "o" | head tilts 10° | "wait, what?" facts |
| F09 | DEADPAN | flat, low | half-lids, dead centre | flat line | none; always held ≥ 0.8 s | after a dumb fact; judge, agent |
| F10 | NERVOUS SWEAT | tilted up in the middle | wide, pupils small and darting (2 positions) | wobbly line | 3 sweat drops flying off the outline | the lie is under strain |
| F11 | GUILTY GULP | up in the middle | looking down-left | lips pressed in, a lump shape on the neck | neck lump + collar tug hand | asked the question he can't answer |
| F12 | CAUGHT RED-HANDED | shot up off the head | huge white circles, pin pupils | small frozen "o" | brows float above the head outline, shoulders at ears | the door opens, the light clicks on |
| F13 | JAW-DROP SHOCK | high | wide circles | jaw piece drops 40 px below the head | **the head outline gets longer** | the twist, the verdict |
| F14 | PANIC | zig-zag | spirals or two different sizes | open rectangle with teeth | hair piece lifts 20 px, 4 sweat drops | it is collapsing right now |
| F15 | DREAMY GREED | soft arcs | Money Green `$` cut-outs (What If: Gold coins) | open drool smile | tongue tip out, head floats up 10 px | seeing the pile |
| F16 | SCHEMING | deep V | narrow, pupils to the side | closed crooked smile | steepled mittens under the chin (pose locked) | the plan, flashback steps |
| F17 | FURIOUS | deep V touching | small hard dots | open jagged rectangle | steam puff shapes left and right of the head | the victim finds out, the expert objects |
| F18 | STERN | flat, heavy, low | small dots | downturned arc | chin down 8° | judge, agent, prosecutor |
| F19 | TERRIFIED | high, tilted | wide, pupils tiny, 2 px tremble on twos | wavy open | whole head shakes ±4 px on twos | sentencing, the cell door |
| F20 | DEFEATED | drooped outward | half-closed, looking down | small down arc | head drops 30 px, shoulders slump | after the verdict |
| F21 | CRYING | drooped | closed arcs | wide wobbly open | two tear streams leaving the outline | losses (victims: use sparingly and respectfully) |
| F22 | RELIEVED | relaxed high | closed arcs | small open smile | one breath puff, shoulders drop | it is over, money back |
| F23 | THINKING | one up | pupils up and to the side | small pursed dot | mitten on chin (pose locked) | the host's questions |
| F24 | PROUD SNOB | high and smooth | closed, lashes | tiny pursed smile | nose-up head tilt 15°, pinky out | "sniffs the cork" gags |
| F25 | BORED | flat low | half-lids, pupils drifting | flat, slightly open | cheek resting on a mitten | waiting years, ignoring a warning |
| F26 | EUREKA | shot up | wide, pupils centred | open round "O" | a paper exclamation chip above the head | the expert spots the tell |

Blink = replacement, not a tween: eyes swap to a closed-arc set for 2 frames, every 2.5–4 s (seeded), never during an F09, F12 or F13 hold.

**Snap rule (how a face changes).**
1. Frames −2 and −1: anticipation squash of the head only (scaleY 0.92, scaleX 1.06), old face still on.
2. Frame 0: the new face is swapped in whole. Head pops to scaleY 1.06 / scaleX 0.96 for this one frame.
3. Frame +1: back to 1.0.
4. Hold the new face for at least 8 frames (0.27 s). Reaction close-ups hold it 0.8–1.4 s.
No cross-fade, no interpolated brows, no morphing mouths, ever. A face change always lands on a word or a sound.

**Face budget:** a Short uses 10–22 different faces; every named fact gets one reaction face from someone; never more than 2 face changes per second on one character.

### 2.5 Real people
- A real person is played by the archetype for their ROLE, with a **name plate** on first appearance (freeze-frame + Anton name + mono role tag, §5.4). Example: Rudy Kurniawan is played by CON with a wine-stained apron.
- **Never a likeness:** no real hairstyle, face shape, body type, glasses, skin tone, age cue or accent cue. The head is Paper White like everyone else's. Costume may show documented, non-physical facts only (job, a documented prop).
- **Evidence photo:** a properly licensed real photo (RULES real-photo rule, `brand/photos/<slug>/` + `credits.json`) may appear as a paper-framed prop: pinned to the case board, held by the host or lying on a desk, with the credit line. It is never animated, never lip-synced, never merged with a puppet, and is on screen 1.5–3 s per appearance, at most 3 times per video.
- Victims who are private or not central are never named and always drawn with MARK or RICH dignity (no dumb faces).
- Every Decoded video carries the footnote: `CARTOON RE-ENACTMENT · CHARACTERS ARE NOT LIKENESSES · SOURCES: …`. Staging details that are not in research.md (what a room looked like, who stood where) must stay generic; anything specific must be a sourced fact.
- No invented quotes (RULES 71). Because nobody speaks and there are no dialogue bubbles, this is enforced by the format itself.
- Labels stay OFF (RULES 80–81): an archetype is not an imitation of a real person. Upload setting "not made for kids" on every post (cartoons get mis-flagged).

---

## 3. Movement

**Frame rates.** Output is 30 fps. Character poses and faces update on twos (15 per second) and hold; camera, props, cash, numbers and text update every frame. In code: the puppet samples its pose at `floor(t * 15) / 15`.

| Move | Spec |
|---|---|
| **Walk** | 8 poses per cycle (contact, down, pass, up × 2 legs), cycle 0.53 s (8 poses on twos), stride 150 px at scale 1, so speed is locked at 283 px/s × scale: **feet never slide**. Body bob 6 % of leg length, lean 4° forward, arms swing ±25° opposite the legs, hair/hat lags 2 frames. |
| **Sneak** (Decoded) | same cycle at 0.8 s, knees high, lean 10°, shoulders up, face F16 or F10. |
| **Run** | 6 poses, cycle 0.4 s, stride 260 px (650 px/s), lean 14°, both feet off the ground on 2 poses, a paper dust puff at each contact. |
| **Stop** | 1 pose overshoot (lean 6° past vertical), settle next pose. |
| **Enter / exit** | characters walk or are carried in; nothing fades in. Exits can be a walk, a yank (shepherd's-crook gag) or a hard cut. |
| **Gestures** (pose library, 14) | stand, hands-behind-back, point, present-prop, shrug, hands-up, facepalm, arms-crossed, lean-in, recoil, clutch-bag, count-cash, pour, raise-paddle. Each is one held pose with a 2-frame anticipation in the opposite direction. |
| **Takes** (big reactions) | anticipation squash 2 frames → stretch 1 frame → settle; whole body ±12 %. |
| **Mimed talk** | when Owen reports what a character said or did with words ("told the jury", "objected", "called it"), that character's mouth cycles through 3 replacement mouths (shut / half / open) on twos, gated by Owen's loudness (`mouth.json`), for the length of the clause. Eyes and brows stay on the current face. It is a mime, not lip-sync: no visemes. The character never looks at the camera while doing it. |
| **Host talk** | same 3 mouths driven by Owen's loudness, only on lines addressed to the viewer; he looks at the lens. |
| **Idle** | never a dead hold: breathing (torso scaleY ±1.5 % on twos), a blink, one weight shift every ~2 s. |

**Squash-and-stretch level: 2 of 3 ("puppet").** Characters ±12 % max (takes, landings, face snaps). Soft props (cash bundles, bags, hats) ±25 %. Rigid things (bottles, gavels, evidence, photos, text, numbers) 0 %: they shake, they do not stretch.

**On-screen words.** Captions (unchanged, auto from the script) carry every spoken word. Extra text is only: tags on props (≤ 4 words), name plates, stamps. A bubble or held sign as a joke: at most one per video.

---

## 4. Sets

Every set is a pop-up diorama with **4 parallax layers** and a fixed floor line. Parallax factor = how much the layer moves per pixel of camera travel.

| Layer | Factor | Content | Treatment |
|---|---|---|---|
| L0 backdrop | 0.15 | wall, sky, window light | flat papers, the gobo |
| L1 far | 0.45 | furniture rows, crowd, shelves | blur 3 px in MS/CU shots |
| L2 stage | 1.00 | the floor strip the cast walks on, hero props | sharp; characters live here |
| L3 foreground | 1.40 | a dark out-of-focus edge: door frame, plant, shoulder, bottle necks | Ink-dark, blur 7 px, covers 10–35 % of the frame; this is what the camera "peeks" past |

Floor line (9:16): y = 1320 in wide and medium shots. Set width 2,400–3,200 px so the camera can truck. Set open: layers rise from the fold line over 0.35 s, staggered 60 ms back to front, with a paper `fwump`. Every set has a **night** and a **day** paper theme (so both series can use it) and 2–3 named camera marks (`A`, `B`, `door`).

| Set ID | Layers (L0 / L1 / L2 / L3) | Standard props | Used for |
|---|---|---|---|
| `void` | spotlight pool on Ink (night) or Cream cyclorama (day) / — / floor disc / — | calendar, shopping cart, scale, ruler | comparison gags, host asides, CTAs |
| `desk` | blinds gobo wall / filing cabinets / case desk with lamp, case board with pins and red string / lamp shade edge | folder, magnifier, evidence photos, stamps | Decoded home base, intros, verdict hand-off |
| `stage` | curtain + light pool / audience silhouettes / podium, 3 doors or plinths, big scoreboard / stage-light rig edge | buzzer, briefcases, prize wheel, meter | What If home base |
| `auction` | panelled wall + tote board / rows of bidders from behind / auctioneer podium, lot pedestal / two foreground bidder shoulders and a raised paddle | gavel, paddles, lot cards, catalogue | sales, records, "rich people bid" |
| `court` | wall with a plain round seal shape (no real emblem) / jury box (2 rows) / judge's bench, witness stand, defence table / public-gallery rail | gavel, verdict sheet, evidence table | testimony, verdicts, sentences |
| `street` | skyline + moon or sun / house fronts with a working front door / pavement, street lamp, kerb / car bonnet or hedge | car (headlight wedges), mailbox, FOR SALE sign | arrests at home, door-knocks, exteriors |
| `kitchen` | window + wall cabinets / counter, sink, fridge / table or island (work surface) / door frame (we look in from the hall) | pots, funnel, bottles, cups, labels | "made it at home", family money scenes |
| `office` | glass wall + city / desks, monitors (blank, no logos) / boss desk, whiteboard / plant + chair back | phone, laptop (blank), pitch deck boards | startups, call rooms, pitches |
| `bank` | vault door wall / teller windows / counter, queue rope / pillar | deposit slips, cash drawer, safe-deposit box | banks, loans, lotteries paying out |
| `casino` | chandelier wall / slot rows (no brand art) / card table, roulette / chip stacks | chips, cards, dice | odds, gambling, parlays |
| `shop` | shelves wall / aisle / checkout counter, lottery terminal / basket | price tags, till with flip numbers, receipts | everyday prices, lottery tickets |
| `map` | paper map of the right region on a table, top-down, 2 layers (map + pins/tokens) | pins, dotted routes, tiny 120 px tokens of the cast, paper planes and boats | "in California", moves between cities, deadpan map gags |
| `cell` | brick wall + barred window gobo / bunk / floor / bars in foreground | calendar scratches | sentences served (epilogues) |

A new set costs about half a day; an episode may request at most one. Everything else must come from this library with a re-skin (banner text, time of day, one swapped prop).

---

## 5. Shot grammar

### 5.1 The eyewitness rules (law 3)
1. **Present tense.** The picture shows the event happening on the word, even when Owen uses the past tense. No "here is a diagram of what happened".
2. **Cause → reaction.** Every event shot is followed within 10 frames by a reaction: a cut to a face, or a face snap in the same shot. Cause and reaction never share a slow move; the reaction is a hard cut or a snap.
3. **Reaction close-ups are held 0.8–1.4 s**, long enough to read the face, short enough to cut before it dies. One per fact beat.
4. **The camera is a witness with a position.** At least **30 % of shots** are observer shots from the list below; in the others the camera still stands at human height inside the room.
5. **Nobody performs to the lens** except the host. Cast look at each other, at the prop, or over their shoulder.
6. **The host watches too.** He can be in L3 of a shot, back to us, reacting.

| Observer shot | How it is built | Use |
|---|---|---|
| PEEK | L3 occluder (door frame, hedge, shelf, bottle necks) covers 25–40 % of the frame; camera creeps sideways 40 px to "lean out" | crimes in progress, kitchens, back rooms |
| POV | we look through something a witness holds: a magnifying-glass ring, a paddle held up at the frame edge, a keyhole, binocular mask | the tell, inspections |
| OVER-CROWD | backs of 3–5 heads in L3, the action small in L2 | auctions, courtrooms, pitches |
| OTS | one shoulder + head back fills 30 % of the frame, blur 6 px, dim 40 % | two-person beats, a victim facing the con |
| SECURITY-CAM | high 3/4 angle, 12 fps instead of 15, desaturated 40 %, a mono corner tag `CAM 2 · ILLUSTRATION`, 4 px rounded frame; never a fake timestamp, only a verified year | arrests, vaults, "nobody noticed" |
| COURT-SKETCH | the shot freezes and re-renders as a pencil sketch on tan paper (Ink line art, 3 marker colours), with a paper tape tag; cameras are not allowed in court, so the big courtroom beat is "drawn" | testimony, verdict |
| WINDOW | exterior, we see the room through a lit window frame; figures as silhouettes behind paper blinds | "at home", late-night work |
| REACTION CU | head and shoulders, flat colour card or blurred set behind, face held | every fact |

### 5.2 Shot sizes (9:16; H = head height on screen)
| Code | Name | Framing rule |
|---|---|---|
| WS | wide | whole set, figures 300–420 px tall (H 115–160). Establishes; ≤ 2.5 s. |
| FS | full | one or two figures head to toe, 600–800 px tall. Walks, entrances. |
| MS | medium | waist up, H 300–360 px. Handling props. |
| CU | close-up | head and shoulders, H 520–640 px (head fills 50–60 % of the width). Faces. |
| ECU | extreme close-up | eyes only, or a prop detail filling ≥ 70 % of the width; a hero number's cap height ≥ 220 px. |
| INS | insert | a prop alone (label, cheque, gavel). |
| TOP | overhead | straight down on a table or the `map`. |
| SPLIT | split-screen | 2 panels with a 10 px Ink gutter tilted 8°, or 3 panels for a montage; each panel is its own shot. |

16:9 uses the same codes; H scales by 0.56 and wides hold up to 4 s.

### 5.3 Camera moves and transitions
| Move | Spec |
|---|---|
| creep (default) | every held shot pushes in 1.5 % per second (Decoded) or drifts sideways 12 px/s (What If). No dead-still frames. |
| push-in | 0.5–0.6 s, +18–35 % scale, lands within ±2 frames of the spoken number or the face snap. |
| crash zoom | 0.2 s, +60 %, with a 6-frame overshoot of 4 %. Max 3 per Short. |
| pull-back | 0.6–0.9 s reveal of scale or of who is watching. |
| truck | sideways with full parallax, follows a walk at the walk's speed. |
| whip-pan | 8–10 frames with directional smear; lands on a new subject or a new set. |
| rack focus | L3 and L2 swap blur in 0.3 s. |
| Dutch tilt | Decoded only, 3–6°, on lies and arrests. |
| shake | 14 px, flips sign every frame, dies in 7 frames. Only on impacts. |

| Transition | Use | Limit |
|---|---|---|
| hard cut | default | ≥ 65 % of all cuts |
| smash cut | cut on a loud sound into the opposite mood | 2–4 per Short |
| match cut | the same shape at the same screen position (± 20 px) in two places or times | 1–3 per Short; the cold open or the loop should be one |
| whip-pan | between two places in one beat | ≤ 5 |
| pop-up fold | set change with the 0.35 s fold | ≤ 4 (it is the slowest) |
| walk-wipe | a figure crosses the lens in L3 and the scene behind changes | ≤ 2 |
| No dissolves, no fades to black in Shorts. | | |

### 5.4 Movie devices
- **Cold open:** frame 0 is the most dramatic instant of the story, mid-action (a gavel 2 frames from landing, a door opening). No title, no fade. The hook words are on screen as a tag on a prop or the caption (V3 still applies).
- **Freeze-frame + label:** the action freezes mid-pose; the picture desaturates to 30 % and gets a 14 px Paper border like a photo print; Anton name plate (≤ 3 words) and a mono role tag slam in with a `camera_shutter`; hold 0.7–1.2 s. For every named person's first appearance and for the series sting.
- **Impact frame (anime):** exactly 2 frames. Frame A: full-frame Paper, the subject as a solid Ink silhouette, 14–18 torn paper wedges radiating from the hit point. Frame B: the same in the series accent with a Paper silhouette. Then the normal frame with a shake. Max 3 per Short, never two within 1 s (flash safety).
- **Speed lines:** 12–18 Paper strips in the direction of motion for 4–6 frames; or vertical "tension lines" behind a face for 0.5–0.8 s in a dramatic close-up.
- **Dramatic close-up (anime beat):** CU → crash zoom to ECU on the eyes; the set is replaced by a flat card (Oxblood / Tangerine) with tension lines; one face snap; hold 0.6–1.0 s.
- **Heist montage:** how-it-worked steps are a 3-panel split with numbered Anton badges, one panel lighting up per step, a percussion groove, each step shown as hands doing it (TOP or INS). In Decoded it is framed as a flashback: rounded-corner Manila border and the tag `PROSECUTORS SAID` (or the source) for its whole length.
- **Title card:** Shorts only get the ≤ 1 s sting (§7). Chapter and title cards are for long-form (§8).
- **Callback:** an object from the first third returns in the last third, changed (the pile that rained in flows back out).

### 5.5 Shot length targets
| Format | New shot every | Average | Max | Shots |
|---|---|---|---|---|
| Decoded Short (80–100 s) | 1.5–3 s | 1.5–2.4 s | 4.0 s | 36–56 |
| What If Short (62–75 s) | 1.5–3 s | 1.5–2.4 s | 4.0 s | 28–44 |
| Long-form (8–12 min) | 2.5–5 s | ≤ 4.0 s | 8 s (chapter cards 3 s) | 130–220 |
A shot under 1.5 s must be a reaction cut (≥ 0.8 s), an insert in a montage run, an impact, or the sting; nothing else is that short.

---

## 6. Numbers and math inside the story

**Rule:** a number is never a floating graphic. It is printed, stamped, flipped or counted on a prop that a character is holding, reading or reacting to. The old recipes become props:

| Kind of number | Diegetic prop | Behaviour |
|---|---|---|
| a price or a total | tote board / scoreboard with flip tiles; till display; price tag | tiles flip to the value in 0.6–1.2 s, last tile lands on the word |
| money in hand | cash pile, bundles, a bag, coins (true count where it can be shown: 1 bundle = a stated amount, tag on the pile) | falls with pre-simulated physics; someone must react |
| a payment or a loss | cheque, receipt, invoice, bank slip | the line is written or stamped as it is spoken |
| a date or a duration | wall calendar, desk calendar pages, a wall clock, tally marks | pages flip; the year is stamped |
| a difference | tailor's tape, a ruler, a balance scale | pulled between the two things, the gap printed on the tape |
| odds or a share | a jar of marbles, doors, a prize wheel, a row of 10 people with some stepping forward | the real proportion is built (run the real simulation when it is a What If) |
| a verdict | verdict sheet, the judge's ledger, a cell-door plate | slammed, stamped |
| steps | numbered badges on the montage panels | one lights per step |

**Kindergarten clarity, visually:**
- The push-in lands on the number as it is spoken (±2 frames) and the shot holds through the pause after it.
- Exact figure on the prop, rounded figure in the voice. A mono strip `OUR MATH: …` sits on the prop whenever the arithmetic is ours.
- One number per shot. Two numbers = two shots or a SPLIT.
- **Every big number gets a comparison gag**: a 2–4 s cutaway to `void` starring YOU, one prop, one transformation, then a hard cut back. Stock gags (reuse, vary the prop):
  - "$X a day for N years" → calendar pages flip while YOU grows a floor-length paper beard.
  - "N years of rent / groceries" → envelopes or shopping carts queue past YOU out of frame.
  - "enough people to fill…" → the camera pulls back from YOU to a stadium of crowd tokens.
  - "as tall as…" → YOU stands beside the stack as it passes a house, a tree, a plane.
  - "you'd have to work until…" → YOU at a desk while the window behind cycles day/night.
- Assumptions (What If) are a sign in the scene (`ASSUMES: no taxes`) held up by the host for ≥ 1.5 s. Attributions (Decoded) are tags on the prop: `PROSECUTORS SAID`, `HE TOLD THE JURY`, `PER DOJ`.

---

## 7. Shorts = episodes

**Numbering.** Decoded: `CASE Nº 001 · THE <2–3 WORD TITLE>`. What If: `ROUND Nº 001 · <2–3 WORD TITLE>`. Numbers run per series in publish order, restart at 001 with the first Paper Trail video, and are logged in `brand/EPISODES.md` (number, slug, title, date, the hidden-penny location). The three platform cuts of one topic share the number. The number is on screen only in the sting and in the mono title beside the pill; it never delays the hook.

**The recurring open (every episode):**
1. **Cold open, 0–~4 s:** frame 0 mid-action over the hook line.
2. **Series sting, ≤ 1.0 s, in the natural pause after the hook line** (script pause 0.8 s; the sting is exactly as long as the gap and never delays Owen): the last cold-open frame freezes as a photo print, the pill slams, the case/round number types on. Decoded sting sound: `gavel` + 3-note upright-bass figure. What If: `ding` + 3-note vibraphone figure. Same two motifs forever.

**The recurring structure** (maps onto the story loop, STYLE §18, and the CTA placements in RULES 46–50). A small mono chapter tag under the pill changes at each step so the viewer always knows where they are.

| % | DECODED tag | WHAT IF tag | Loop job | Staging |
|---|---|---|---|---|
| 0–5 | (cold open) + sting | (cold open) + sting | hook | most dramatic instant, then freeze |
| 5–20 | THE PLAYERS | THE OFFER | stakes: who, what, why trust it | host asks the question; freeze-frame name plates; map gag for place |
| 20–35 | THE MONEY | THE OBVIOUS ANSWER | first big number + comparison gag; **LIKE** at ~30 % | `void` cutaway with YOU |
| 35–55 | THE TELL | THE CATCH | the twist; **SEND** at ~55 % | observer shots, dramatic close-up, impact frame |
| 55–75 | THE TRICK | THE MATH | how it worked, step by step | heist montage / the real simulation |
| 75–85 | THE BILL | THE LAST STEP | cost to victims / recap; **FOLLOW** at ~80 % | courtroom or scoreboard |
| 85–97 | THE VERDICT | THE REVEAL | payoff | court-sketch, impact frame, callback |
| 97–100 | YOUR CALL | YOUR CALL | comment question + loop | host to lens, match cut to frame 0 |

**CTA moments staged in-world** (≤ 1.5 s each, never a banner, never stacked; wording stays in the script):
- **LIKE (~30 %):** a paper heart sticker gets slapped onto the prop in the gag (by YOU or the host) and pulses once. Decoded variant: an evidence tag `EXHIBIT ♥`. What If: the heart is the podium buzzer.
- **SEND (~55 %):** a paper from the scene (a label, a ticket, a receipt) folds itself into a paper plane in 3 folds and is thrown at PAL, who is doing the thing the line describes; it leaves the frame to the right.
- **FOLLOW (~80 %):** the sealed thing that holds the payoff (the verdict folder, the prize envelope, the last door) is sealed with the red `+ FOLLOW` sticker. The host taps it, it flips to `✓ FOLLOWING`, the seal breaks, the music drops out. The follow is literally what opens the ending.
- **COMMENT (after the payoff):** the host turns to the lens holding the episode's hero prop; the question is on a prop he holds (an auction paddle, a cue card). This is the one allowed sign per video.

**Recurring gags and rituals (visual; none needs a new narration line):**
1. **The hidden penny.** One copper penny is hidden in every episode (location logged in EPISODES.md). Never mentioned by Owen; the first comment can ask who found it.
2. **The Look.** After the dumbest fact, one character holds F09 DEADPAN for 0.8 s while everything else keeps moving.
3. **The yank.** YOU never walks into a comparison: a shepherd's crook hooks them in from the side, and they are dropped back by a hard cut.
4. **The bowtie.** The host's bowtie spins one turn on every F13/F26 moment.
5. **Red marks the lie / yellow marks the prize** (law 9): fans learn to scan for it.
6. **The same AGENT and the same JUDGE** in every case; the judge's gavel gets one new dent per episode (cosmetic counter).
7. **The callback pile:** money that arrives in THE MONEY leaves in THE VERDICT.
8. **Catchphrase family (already in the scripts):** the follow line is always "Follow, this page ___" (reads the verdicts / finishes the math / reads the fine print). Writers keep that frame; the blank changes.

**The ending loops.** The last shot is a match cut or whip back to the cold-open composition, one beat before frame 0's action (the gavel raised), so the replay completes the motion. Nothing after the question.

**Three cuts per topic (RULES 13):** one full storyboard for the YouTube cut; the TikTok and IG/FB cuts get their own shot lists (`STORYBOARD-tt.md`, `STORYBOARD-ig.md`) built from the same sets, cast and props in a different order with their own cold open. Sets, cast and props are shared in `_src/shared.js`.

---

## 8. Long-form = movie (8–12 min, 16:9)

| Part | Time (10:00 example) | What happens | Rules |
|---|---|---|---|
| **Cold open** | 0:00–0:35 | the single best scene of the film, mid-action, ending on a question and a freeze-frame | no greeting, no recap of what the video is |
| **Title sequence** | 0:35–0:43 | 8 s max: cut-paper title animation (the case's hero prop assembles the title in Anton), BAD MATH wordmark, `A DECODED FILM` / `A WHAT IF FILM`; score motif in full | Owen keeps talking over the last 3 s; never silent for more than 5 s |
| **Act I · the setup** | 0:43–3:10 | chapters 1–2: the world, the players (name plates), the pitch, why people believed it. Ends on **cliffhanger 1** | first big number + comparison by 1:30 |
| **Mid-roll 1** | ~3:10 (30–35 %) | placed manually on the chapter boundary, after the cliffhanger line and a 1.5 s held reaction close-up | never mid-sentence; first shot back is a 4 s re-hook that restates the open question |
| **Act II · the con runs** | 3:10–6:50 | chapters 3–5: escalation, the trick as a full heist montage, the first tell, the midpoint reversal at ~50 % (the hunter appears / the number stops adding up). Ends on **cliffhanger 2** ("and then someone read the label") | a comparison gag every ~60 s; a set change at least every 45 s |
| **Mid-roll 2** | ~6:50 (65–70 %) | same rules | |
| **Act III · the fall** | 6:50–9:20 | chapters 6–7: the unravelling shown as an eyewitness sequence (observer shots), the arrest, the trial (court-sketch), the verdict, the bill | payoff at 85–92 % |
| **Epilogue** | 9:20–9:40 | where the money and the people are now (sourced), the callback object | one line that reframes the cold open |
| **Credits** | 9:40–10:00 | 15–20 s credits-style ending over the score: **CAST** ("THE CON … a paper cut-out · not a likeness"), **SOURCES** rolling as film credits (court, DOJ, press), **PHOTOS** credits, a 5 s post-credits gag that teases the next film's hero prop; YouTube end-screen elements sit in two reserved boxes on the right | no voiced CTA in the credits; the follow/subscribe ask lives at ~80 % as in Shorts |

- **Chapter cards:** 2–3 s, a full-frame torn-paper card: `CHAPTER 3` in mono, a 2–4 word title in Anton, one prop from the chapter, one paper sound. 6–8 chapters; their times are also the YouTube chapter markers.
- **Recurring cast:** the same HOST, YOU, PAL, AGENT, JUDGE and TELLER designs as the Shorts. A film's CON keeps one costume throughout; ageing or time passing is shown by props and sets, not by redesign.
- **Shot rhythm:** average ≤ 4 s; one "set-piece" per act where shots drop to Shorts speed (1.5–2.5 s) for 20–30 s.
- **Mid-roll count:** 2 for 8–12 min. Check the retention graph after each film: a drop of more than ~5 points at a break means move the break to the next chapter card.
- **Relationship to Shorts:** a film is the feature cut of a case or a theme; the matching Shorts are its episodes and may reuse its sets and shots re-framed to 9:16.

---

## 9. Sound

All sound is free CC0 from `brand/sfx-library` (RULES 76–77): real recordings, never synthesized, never ElevenLabs credits. Mix unchanged: voice clear, −14 LUFS, peak ≤ −1 dBTP.

| | DECODED | WHAT IF |
|---|---|---|
| Score | small noir jazz combo: walking upright bass, brushed snare, muted trumpet or vibraphone stabs, 88–100 BPM. Heist montage: bongos + hi-hat + bass ostinato at 108–116 BPM. | game-show band: marimba / vibraphone, pizzicato strings, hand claps, 116–126 BPM; a drum roll under THE MATH. |
| Library beds today | `jazz_bed_1/2`, `tense_bed_1/2`, `suspense_drone_1/2` | `upbeat_bed_1/2`, `lofi_bed_1/2` |
| To source (CC0) | a caper percussion loop, a bass-walk loop, a 3-note bass sting | a game-show loop, a drum roll, a 3-note vibraphone sting, a "thinking" loop |
| Sting (≤ 1 s) | `gavel_1` + bass figure | `ding_1` + vibraphone figure |
| Before the payoff | music out for 0.3–0.5 s, room tone only | drum roll, then a cut to silence for 0.3 s |
| Payoff | `gavel_2` or `cell_door_1` + `deep_boom_1` | `success_chime_1` or `wrong_buzzer_1` + `cheer_1` / `crowd_ooh_1` |

**SFX palette (the paper signature).** Every pop-up set opens with a paper `fwump`; face snaps get a tiny card `tick` (−18 dB, only on reaction close-ups); footsteps are soft taps on card (`footsteps_1/2` low-passed until paper foley is sourced). Standard hits: `camera_shutter` on freeze-frames, `rubber_stamp` on stamps, `paper_slam` on documents, `whoosh` on whips, `record_scratch` on pauses by the host, `cash_register` / `money_counter` / `coins_drop` on money, `door_slam`, `siren` (short, far) on arrests, `crowd_ooh` / `applause` for auction and game-show crowds, `clock_ticking` under waits. To source (CC0): paper rustle, page turn, pop-up unfold, scissors snip, card tick, cork pop, liquid pour, glass clink, pen scratch, handcuff click, chair scrape.
Rules: one sound per visible cause, on the same frame; no sound without a picture cause; at most 2 comedy sounds (`slide_whistle`, `cartoon_boing`, `sad_trombone`) per Short and none in a Decoded verdict; silence is a sound (use it before the twist and the payoff).

**Owen's delivery by scene type** (drives `brand/voice/owen_tags.py`; one take per cut, RULES 105):

| Scene type | Tag | Note |
|---|---|---|
| Cold open / hook | `dramatically` | flat and certain, no upward lilt |
| Host question to the viewer | `curious` or `surprised` | real question |
| Setup / who-what-why | `conversational` | a friend explaining |
| A big number | (no tag) + natural 0.38 s gap after | let the picture hit |
| Comparison gag | `conversational`, slightly amused | never `excited` |
| Reported speech ("he told the jury…") | `matter of fact` | Owen reports, he never acts a character's voice |
| The tell / twist | `surprised` then (no tag) | slow down on the number |
| How-it-worked steps | `matter of fact` | even pace, one step per line |
| Roast of the con | `sarcastic` | dry; never at victims |
| CTA clauses | `playfully` | thrown away, in passing |
| Verdict / sentence / the bill | `seriously` | full sentences, lower, slower |
| What If reveal | `excited` | the only place for it |
| Closing question | `playfully` | lifts at the end, then nothing |

---

## 10. The storyboard (mandatory before any build)

Every video has `videos/<date>-<slug>/STORYBOARD.md` (plus `-tt` / `-ig` for the other cuts), written from the FINAL voiced timings (`voice/sentences.json`, `voice/words.json`). The narration is never changed to fit the board.

### 10.1 File layout
1. **Header:** series, episode number + title, cut, duration, counts (scenes, shots, average shot length, observer-shot %, faces used), sets, cast, new assets needed, hidden-penny location, the loop (hook → payoff → last frame).
2. **Cast & set sheet:** who plays whom (archetype, costume, name plate text), sets with time of day, hero props, evidence photos with credits.
3. **Scene blocks**, one per scene (a scene = one place and time; a new scene on every set change). Each block has a heading line and one table, one row per shot:

| Column | What goes in it |
|---|---|
| `#` | scene.shot, e.g. `7.2` |
| `Time` | start–end in seconds from the voiced timings, cut on a `@word` |
| `Narration` | the exact words spoken during the shot (from sentences.json), or `(gap)` |
| `Shot` | size code + observer type, e.g. `CU · REACTION`, `WS · OVER-CROWD` |
| `Characters · action / blocking` | who is where (left/centre/right, layer), what they do, on which word |
| `Face` | reservoir IDs per character, with the snap word: `CON F02 → F12 @objected` |
| `Camera` | move from §5.3 with its numbers |
| `Text / props` | tags, number props and their exact values, stamps, labels (ILLUSTRATION, sources) |
| `Transition → SFX` | how we leave the shot, and the sounds with their cue word |

   The scene heading states: **Set** (ID, time of day, camera mark), story-loop job, and the chapter tag.
   Under each table: **Thumbnail** lines, one per shot: a plain-words sketch of the keyframe (what is big, where it sits in the frame, where the eye goes), specific enough for someone to draw a matching stick sketch.
4. **Checks table** (10.2) filled in.
5. **Asset list:** every puppet look, face, pose, set, prop and sound the board uses, marked HAVE / NEW.

### 10.2 Paper review (before any code)
| # | Must be YES |
|---|---|
| B1 | Every narration word is covered by a shot; shot times come from the voiced files; narration unchanged. |
| B2 | Shot count and average length inside §5.5; no shot over 4 s. |
| B3 | Frame 0 is mid-action with the hook words on screen; the last shot matches into frame 0. |
| B4 | ≥ 30 % observer shots; every fact beat has a cause → reaction within 10 frames and a held reaction CU. |
| B5 | Every row has a Face entry or `—`; 10–22 different faces; no dialogue bubbles (≤ 1 sign gag). |
| B6 | Every spoken number sits on a diegetic prop with a push-in; every big number has a comparison gag; no floating chart or card. |
| B7 | Real people: archetype + name plate, no likeness; evidence photos licensed and credited; victims dignified; staging details generic or sourced; attribution tags present. |
| B8 | LIKE / SEND / FOLLOW / COMMENT staged in-world at the voiced lines; nothing after the closing question. |
| B9 | Series look: accent used only per law 9; sets from the library (≤ 1 new); ≤ 3 impact frames, ≤ 3 crash zooms, ≤ 4 pop-up folds. |
| B10 | Sound: one cue per cause, CC0 names from the manifest or listed under "to source"; silence before the payoff. |
| B11 | Safe zones: faces and numbers between y 240 and y 1380, nothing important right of x 940 below y 960. |
| B12 | Asset list complete; NEW items ≤ the daily budget (§12.3). |

### 10.3 Keyframe board review (after the scene file, before the full render)
1. `node brand/engine-v2/bm2.cjs board <build>`: renders **one keyframe per shot** (at the shot's `key` time, default start + 60 % of its length) into a contact sheet, 6 columns, each cell labelled with shot #, timecode, size code and the narration words. For long-form: one sheet per chapter.
2. Compare the sheet against the STORYBOARD thumbnails row by row. Check: the face reads at thumbnail size; the subject is not under the captions or the pill; cropped text; overlaps; the accent rule; empty frames; a character missing after a cut; left/right continuity (a character who exits right enters from the left).
3. Render a **1-second test** of the hardest effect (motion-tips rule) and a **silent animatic pass** at 540 × 960, 15 fps, with the voice, to judge the cutting rhythm.
4. Fix, re-board, and write `BOARD REVIEW: PASS <date>` plus the sheet path at the bottom of STORYBOARD.md. Only then run the full render, then the normal VIDEO GATE (RULES).
5. Pilot only: the board sheet goes to the owner for approval (RULES 107). After the pilot is approved, boards are reviewed by the director, not sent to the owner (RULES: "don't send them to me").

---

## 11. Worked pilot
`videos/2026-11-26-fake-wine/STORYBOARD.md`: DECODED · CASE Nº 001 · THE WINE FACTORY, YouTube cut, 86.4 s, built on the final Owen timings.

---

## 12. Production feasibility

### 12.1 What the engine already gives us (`brand/engine-v2`)
Deterministic `render(t)`, Playwright capture, chunked renders; `@word` timing; camera with parallax, shake and motion blur; paper/clay/shadow primitives, grain, springs; captions; `photo` element; number roll; cash stacks; `mix.py`; contact sheets (`sheet`). All of that is kept.

### 12.2 What must be built, in priority order for the pilot
**P0: without these there is no pilot**
1. **`puppet.js`: the token rig.** `puppet({look, pose, face, x, y, dir, s, hold, layer})`; 2-bone arms and legs with hand IK to a target or a prop; `look` options (head shape, hair/hat, costume, tell, colours); world-space (scales with the camera); 15-per-second pose stepping; cast shadow shape; idle breathing and seeded blink. Looks needed first: HOST, CON, RICH, TELLER, EXPERT, AGENT, JUDGE, YOU, PAL, JURY/CROWD.
2. **`faces.js`: the replacement-face reservoir.** All 26 faces as draw functions in the 150 × 120 slot, with their outline cues; the snap (2-frame squash, 1-frame pop, minimum hold); blink set; 3 mime mouths driven by `mouth.json`; the AGENT variant (sunglasses). Pilot needs 22 faces: all except F14, F21, F22, F26.
3. **Pose library + walk cycle.** 14 gesture poses, 8-pose walk with locked stride (no foot slide), stop, enter/exit helpers. Sneak and run can wait (P2).
4. **`sets.js`: 4-layer pop-up sets** with parallax factors, lamp and shadow direction, night/day themes, camera marks, the fold-open move. Pilot sets in order: `auction`, `kitchen`, `court`, `void`, `desk`, `street`, `map`.
5. **Shot timeline in the scene format.** `shots: [{id, at, set, mark, size, observer, cast: [...], cam, key}]`: hard cuts by default, auto-framing from a size code on a character's head or a prop anchor, per-shot cast blocking keyed to `@word`s, face cues `faces: [['@objected', 'CON', 'F12']]`. One storyboard row = one `shots[]` entry.
6. **`bm2.cjs board`**: the per-shot keyframe contact sheet with labels (§10.3).

**P1: the movie grammar the pilot uses**
7. **Transitions and devices:** smash cut, match cut helper (aligns a named anchor across two shots), whip-pan smear, freeze-frame + name plate, impact frame, speed/tension lines, SPLIT panels (each panel renders a sub-shot to an offscreen canvas), heist-montage frame with step badges.
8. **Observer treatments:** L3 occluder presets (door frame, bidder shoulders, bottle necks), POV masks (magnifier ring, keyhole), SECURITY-CAM filter, COURT-SKETCH filter (line-art pass on tan paper).
9. **Number props (recipes):** tote board with flip tiles, price tag, cheque, calendar with flipping pages, tailor's tape, verdict sheet, stamps; cash rain and reverse cash flow (pre-simulated, cached per frame).
10. **Pilot props:** wine bottle (dusty / clean, label slot with a year), cork, wax pot, funnel, jugs, label sheets, bidding paddle, gavel, catalogue, hand truck with crates, ledger, front door, car, handcuffs, verdict folder with the FOLLOW seal, heart sticker, paper plane fold, shepherd's crook, paper beard, the hidden penny.
11. **Light:** lamp wedges, long cast shadows, gobos (blinds, bars).
12. **Sound sourcing (CC0):** paper foley set, cork/pour/clink, handcuffs, the two stings, a caper loop.

**P2: needed for daily production and What If**
13. Sets `stage`, `office`, `bank`, `shop`, `casino`, `cell`; What If day themes for all sets.
14. Run and sneak cycles; KID and MARK looks; the remaining 6 faces.
15. Comparison-gag kit (calendar-beard, carts, stadium pull-back, stack-vs-landmark, day/night window).
16. 16:9 layouts for sets and size codes; title-sequence and chapter-card templates; credits roll; end-screen safe boxes.
17. `brand/EPISODES.md` registry; a `storyboard_gate.py` that checks B1, B2, B5 and B11 from the scene file (shot coverage, lengths, face cues, safe zones).
18. A `scene.js` generator that turns the STORYBOARD tables into a `shots[]` skeleton.

### 12.3 Can this run at 3 Short topics a day?
- **Reuse is the plan:** after the pilot, a normal episode uses library sets (≤ 1 new), the existing cast (≤ 1 new costume), and ≤ 4 new props. The budget for NEW assets per topic is: 1 set OR 4 props, 1 costume, 0 faces. Anything bigger is scheduled as a library task, not inside an episode.
- **Per topic (three cuts):** storyboard YT ~25 min + two re-ordered boards ~10 min each (director model); scene files ~60–90 min for the first cut and ~30 min for each re-cut (builder models, shots map 1:1 from the board); board review 10 min per cut; render ~5–6 min per 90 s cut (same engine speed as today); mix and gate unchanged.
- **Hard parts and how they are contained:** 40+ shots per Short is data, not animation by hand, because shots are presets (size code + mark + cast poses + face cues). Walks are the only continuous character animation and are one function. Physics is pre-simulated. No per-frame hand keying anywhere.
- **Build-up estimate for the team:** P0 ≈ 2 working sessions, P1 ≈ 2, pilot scene + reviews ≈ 1. P2 runs in parallel with the first week of episodes.
- **Risks:** (1) puppets reading as generic clip-art: mitigated by the paper edge + cast shadow + on-twos stepping, check on the first stills before building sets. (2) Too many shots for a calm Decoded narration: if the animatic feels frantic, merge shots but keep the cause → reaction cuts. (3) Likeness or dramatization complaints: the archetype rule, the footnote and generic staging are non-negotiable. (4) Render time growing with offscreen SPLIT panels: cap at 3 panels.

---

## Appendix A — where the patterns come from (patterns only; no characters, art, names or footage copied)

Sources: the repo skills `animated-shorts`, `cartoon-shorts`, `directing-stickman-videos`, `storytelling-and-narrative`, `zach-d-films`, `kurzgesagt`; `research/creators/robertmckeaveney/PLAYBOOK.md`; `research/claude-motion-tips/README.md`; and web searches on 2026-11-25. The web results were thin (mostly marketing blogs, no retention studies of these niches; one promising breakdown of a 3D story Short was on a host this session cannot reach), so the niche notes below are the director's reading of the formats, not measured data. Treat them as hypotheses to check against our own retention graphs.

| Niche | Why it holds people | What Paper Trail takes | What it refuses |
|---|---|---|---|
| Animated storytime / true-crime cartoons | a human face reacting to every turn; confessional intimacy; simple designs that put all the budget into expressions; a set structure viewers learn | the story is in the faces (reservoir), reaction close-ups, recurring cast, episode ritual | first-person fake confessions, shock topics, invented dialogue |
| Flat comedic history | deadpan timing, a gag every few seconds, maps with tiny figures, running jokes and callbacks across videos, one narrator voicing everything | the map set with tokens, The Look, running gags, one narrator, callbacks | stick-figure look, joke-per-line density that buries the facts |
| 3D story Shorts | frame 0 is already inside the action; "question → misconception → but → mechanism → payoff"; a cut every 2–4 s; physical cause and effect | mid-action cold open, cause → reaction cutting, the mechanism shown by hands doing it | 3D rendering, body-horror hooks |
| Premium explainer animation | strict palettes, one light direction, rounded consistent shapes, visual metaphors chosen before drawing, fact-checking as part of the brand | the two locked palettes, one lamp per set, metaphors as props, sources in the credits | space-and-glow backgrounds, slide-like infographics |
| Anime drama beats | impact frames of 1–2 frames, speed lines for 1–3 frames, staccato holds, close-ups on eyes; effects saved for key moments | 2-frame paper impact frames, tension lines, the dramatic close-up, held poses on twos, strict per-video limits | effects on every hit, anime character design |
| Heist / noir film grammar | the planning montage compresses a method into a minute, split screens run parallel actions, freeze-frame crew intros, low-key light with hard shadows, the inverted detective story | the heist montage for "how it worked", SPLIT, freeze-frame name plates, gobos and long shadows, Dutch tilts, the case desk | glamorising the con: the montage is always tagged as the prosecution's account and ends in the verdict |
| Stop-motion puppetry | replacement faces snap between sculpted expressions; holds feel deliberate; handmade materials | the reservoir, the snap rule, on-twos stepping, paper materials | — |
| Platform guidance | manual mid-rolls belong at natural breaks, not mid-sentence; a video needs 8+ minutes for mid-rolls (Google help page) | mid-rolls on chapter boundaries after a cliffhanger | — |

Web pages consulted: support.google.com/youtube/answer/6175006 (mid-roll placement), kurzgesagt.org/youtube (process: script first, metaphors chosen in sketching), en.wikipedia.org/wiki/Smear_frame, blog.cg-wire.com/smear-frames, backstage.com/magazine/article/how-to-use-montages-in-film-75771, studiobinder.com/blog/what-is-a-deadpan-definition, longstories.ai/blog/retention-benchmarks-animated-youtube-videos (unverified benchmarks, not relied on).

## Appendix B — conflicts with older files (newest wins; fix when touched)
- VISUAL-V2 "one continuous world, graphics come toward the camera" and the README beat presets (`side-by-side`, `graphic-hero`, `presenter-front`) are retired for new videos; shots and sets replace stations and beats. The engine internals stay.
- RULES 57 / V5 ("storyteller travels in front / behind graphics") now reads: the host watches, pauses and addresses the lens per §2.2.
- STYLE §18 "case board with red-string pins / running meter" survive as props in `desk` and `stage`, not as the main layout.
- The on-screen comment bubble becomes the host's held sign (the one allowed sign gag); the `+ FOLLOW` button becomes the seal on the payoff.
- RULES real-photo rule stays, narrowed by the owner's new direction: real photos appear only as evidence-photo props; the person on screen is the archetype puppet.
