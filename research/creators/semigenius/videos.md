# Creator study: Semigenius — shot-by-shot storyboard log

Logged 2026-11-25. Purpose: learn how the PICTURES tell the story. Patterns only: do not reuse their character, art style, catchphrase, jokes or stories. Their humour is crude and sweary; none of that is for us.

## Coverage (read this first)

| Source | Exists | What I got | How |
|---|---|---|---|
| Instagram `@semigenius` | 45 posts, 89,671 followers (from the public profile embed) | **6 listed, 5 watched at full picture quality** | The profile listing needs a login (`yt-dlp` user extractor is broken; the page redirects to the login wall). The public embed page lists only the 6 newest reels. Video downloaded for 5 of 6 (720p, picture only), audio for 3 of 6. The Instagram CDN is split: `scontent-ord5-1.cdninstagram.com` is reachable, `scontent-ord5-2.cdninstagram.com` is **blocked**, and each file lives on one or the other. Reel `DgIHlqMAt1d` (wife's name) has audio only: its video file is on the blocked host. Instagram does not expose view counts. |
| YouTube `@semigeniuss` (note the double s) | **44 Shorts**, uploaded 2026-11-01 to 2026-11-25, no long videos | **44 of 44 listed with views, likes, dates, descriptions; 43 with captions; 0 downloaded** | YouTube refuses this server ("Sign in to confirm you're not a bot") and the media host `*.googlevideo.com` is blocked. The embedded player still gives auto-captions and YouTube's own preview thumbnails: about 1 frame per second at 50 × 90 px. I looked at those thumbnail sheets for the 5 most-viewed Shorts. They show the shot order and framing, not cut-accurate timing or detail. |
| TikTok `@semigenius` | unknown | **0** | `www.tiktok.com` is blocked. |

**Honest summary.** The channel has 44 videos (the same videos are cross-posted; Instagram has 45 posts). I truly watched **5** (every frame at 2 fps, all 5 dense sheets read for two of them, all dense sheets for a third, one frame per shot for the other two), and I read rough 1 fps thumbnails plus full captions for **5 more**, which are the 5 most-viewed. The 5 I could watch properly are the 5 newest, not the 5 most-viewed, because only the newest are listed without a login. One of them (speed-walker) is also the 6th most-viewed, at 1.10M. The other 34 I know only by title, view count, caption text and description. The patterns below were the same in all 10 I looked at, so I trust them, but shot-length numbers come from 5 videos.

Other blocked hosts met: `www.google.com`, `www.instagram.com` through the web-fetch tool (it works through `yt-dlp` and `curl`).

**Files.** `research/creators/semigenius/<reel id>/`: `dense_NN.jpg` (2 fps, time-stamped, 18 frames per sheet), `shots_NN.jpg` (one frame per detected shot, for two reels), `cuts.txt` (ffmpeg scene cuts), `transcript.txt` where audio was reachable, `video_noaudio.mp4` and `audio.m4a` (git-ignored). `_yt/index.tsv` (all 44: views, id, title, length, likes, date, description), `_yt/<id>.transcript.txt` (auto-captions), `_yt/<id>.sheet.jpg` (1 fps thumbnails).

## The channel in one paragraph

Every Short is 14 to 43 s (median 31.5 s) and has the same spine: an everyday problem, stated in the first second → "so you, being a semigenius," try a fix → the fix makes it worse → a bigger fix → worse again, four to seven times, each jump bigger than the last (street → ocean → Spain → old age) → a deadpan callback to frame 0. The narrator speaks in second person, present tense, and **every clause is a physical action that the picture is showing at that instant**. The look is simple low-poly 3D: a hero who always wears the same blue shirt, two dots for eyes, flat bright sets. The real answer to the title question is in the description, not the video.

Most-viewed (YouTube, 2026-11-25): stubbed toe 3.27M · shower curtain 2.15M · taller in the morning 1.59M · upstairs neighbour 1.36M · buttered cats 1.25M · speed-walker 1.10M · twenty below 1.09M · Q-tip 1.07M · family group chat 1.06M · air mattress 1.04M. Full list in `_yt/index.tsv`.

## Numbers across the 5 watched reels

| Reel | Length | Shots (ffmpeg, scene > 0.30) | Shots (my count from frames) | Average shot | Longest shot | Cuts in first 10 s |
|---|---|---|---|---|---|---|
| Speed-walker `DgIHN8xgCdD` | 43.1 s | 33 | 34 | 1.27 s | 2.3 s | 8 |
| Dog and landlord `DgKqYs9hRYH` | 33.8 s | 21 (misses cuts inside the one room) | 30 | 1.13 s | 2.1 s | 10 |
| Key in the lock `DgFhJKAj0Ss` | 27.0 s | 15 (misses cuts on the dark porch) | 20 | 1.35 s | 3.0 s (the opening) | 6 |
| Forgot why you walked in `DgFg65TlD_b` | 40.9 s | 25 | not hand-counted | ≤ 1.64 s | — | 8 |
| Everybody's partying `DgDj1R7JdT4` | 37.3 s | 27 | not hand-counted | ≤ 1.38 s | — | 8 |

- **Average shot length: about 1.1 to 1.4 s.** Almost no shot is over 2.5 s. The one long shot (3.0 s) is an opening close-up where the gag needs repeating to read.
- **Transitions: 100 % hard cuts.** No fades, wipes or dissolves in any of the 5. Fast moves get motion blur.
- **Picture vs narration.** I read each reel's frames with the captions covered before reading the transcript. I could retell the whole plot of all 5 from the pictures alone. What the pictures did not give me: a handful of spoken facts ("She's German", "Category five", "it's twenty degrees" was given by a dial) and the jokes' wording. My estimate: **the picture carries 85 to 90 % of the story; the narration carries the comic voice and names things.** The narration could be removed and you would still know who wants what, what they try, and how it goes wrong.
- **Elements on screen:** almost always 2 or 3 things you must read: the hero, one other character or object, one prop or sign. Crowds appear only as a single mass (bulls, wedding guests, dancers).
- **Words in the picture:** captions of 2 to 4 words (yellow, the current word white), plus at most one in-world sign of 1 to 3 words per scene (`NO PETS ALLOWED`, `PIZZA`, `WEDDING CHAPEL`, `LAW`), plus a comic sound word on a few impacts (`HIC!`, `FWOOM`, `BOOM!`).

---

## 1. Speed-walker ("Why do people speed up when you pass them?")

`DgIHN8xgCdD` · 43.1 s · YouTube twin `79FVofGAQfU`: 1,099,131 views, 71,116 likes, uploaded 2026-11-24. Picture only (audio host blocked); words from YouTube captions. Read: all 5 dense sheets.

| # | Time | Len | Picture | Shot / camera | What a mute viewer understands |
|---|---|---|---|---|---|
| 1 | 0.0–1.1 | 1.1 | A pavement with shop awnings. A man in a grey suit with a briefcase walks; the hero in blue comes up beside him on the right. | Full shot, camera travelling backwards in front of them | Blue is overtaking grey. |
| 2 | 1.1–2.3 | 1.2 | Grey glances sideways and takes a bigger stride. | Medium, low, closer on grey | Grey noticed, and sped up on purpose. |
| 3 | 2.3–3.6 | 1.3 | Blue's brows drop into a V. | Medium on blue | Blue is annoyed. It is a contest now. |
| 4 | 3.6–4.6 | 1.0 | From behind: blue's hips swing wildly; grey copies. | Full shot from the back, new shop (FLOWERS) | They are both walking in a silly fast way. |
| 5 | 4.6–6.3 | 1.7 | From the front: both strut toward us with fixed grins. | Full, camera retreating | Neither will give in. |
| 6 | 6.3–7.1 | 0.8 | Knees up, almost a run, then they stop themselves. | Low medium | They want to run but won't. |
| 7 | 7.1–8.5 | 1.4 | Long street; both walk stiffly, eyes forward. Other people far behind. | Wide, front | Pretending this is normal. |
| 8 | 8.5–10.3 | 1.8 | Outside a bakery: grey "reads" a newspaper (headline `MAN WALKS`) while walking; blue checks his watch. | Medium | Both act casual. (The newspaper headline is a tiny extra joke; you lose nothing if you miss it.) |
| 9 | 10.3–11.0 | 0.7 | Grey's hip knocks blue sideways. | Medium | Grey cheats. |
| 10 | 11.0–12.9 | 1.9 | High angle: blue stumbles into a red bus lane. A bus slides in from the right edge. | Wide, high | A bus is about to hit him. Cause is set up in the same frame as the victim. |
| 11 | 12.9–14.4 | 1.5 | Blue in the air above the whole street, cars tiny below. | Aerial | The bus threw him a long way. Effect shown in the very next shot; distance shown by how small the cars are. |
| 12 | 14.4–14.9 | 0.5 | He lands still walking. | Full | He is ahead now. |
| 13 | 14.9–15.8 | 0.9 | Close-up: smug smile, then eyes go wide. | Close-up | He thinks he won. Then he sees something. |
| 14 | 15.8–16.9 | 1.1 | Looking up: grey flying overhead off the next bus, impact marks round him. | Low wide, tilted up | Grey did the same thing. |
| 15 | 16.9–18.0 | 1.1 | Close-up: blue's fists come up, eyes narrow. | Close-up | New plan. |
| 16 | 18.0–19.0 | 1.0 | A wooden pier over blue sea; both walk off the end of it. | Wide, side | New place in one frame (pier + sea). They walk straight into the water. |
| 17 | 19.0–21.3 | 2.3 | Underwater: sand, kelp, fish, bubbles; both still speed-walking on the bottom. | Full, side | Neither stopped. Longest shot, because the picture is the joke. |
| 18 | 21.3–22.3 | 1.0 | A whale's mouth opens behind them and closes over both. | Wide | Swallowed. |
| 19 | 22.3–23.4 | 1.1 | The whale at the surface by a quay; a spout; both walk out of the blowhole. | Wide | They came out the top, somewhere else. |
| 20 | 23.4–24.9 | 1.5 | A white-walled street, people in white with red scarves; the two walk among them. | Full | A new country. (You may not know it is Spain until the bulls.) |
| 21 | 24.9–25.8 | 0.9 | The crowd runs toward us; black bulls burst from a gate behind. | Wide, front | Everyone is running from bulls except our two. |
| 22 | 25.8–27.4 | 1.6 | The two walk, bulls right behind them. | Medium, front | Still refusing to run. |
| 23 | 27.4–28.5 | 1.1 | From above: the bulls are now walking in step beside them. | High | The bulls joined the walk. |
| 24 | 28.5–30.0 | 1.5 | Straight down: bulls and runners all walking. | Top view | Everybody walks now. |
| 25 | 30.0–32.5 | 2.5 | A bride in white walks beside blue, guests behind. Three photo prints drop into the top of frame one by one; grey is in every photo. | Full, front; photos as an overlay | He got married without stopping, and grey was there for all of it. |
| 26 | 32.5–33.6 | 1.1 | The pizza shop from shot 2. Both men have grey hair and a stoop. | Full | A lot of time has passed. Time shown by: same place, same positions, new hair. |
| 27 | 33.6–34.5 | 0.9 | Both take a step; a yellow starburst flashes on each hip. | Medium | They both hurt a hip at once. |
| 28 | 34.5–36.5 | 2.0 | Both on walking frames. Grey's briefcase hangs on his. | Full | Old, still side by side. |
| 29 | 36.5–37.5 | 1.0 | Grey pushes his frame ahead. | High | Now grey tries to pass blue: the first frame, reversed. |
| 30 | 37.5–38.3 | 0.8 | Grey clutches his chest and drops flat. | High | Grey dies. |
| 31 | 38.3–39.5 | 1.2 | Blue stands over him and smiles. | Medium, low | Blue wins. |
| 32 | 39.5–40.5 | 1.0 | Blue wheels his frame over grey. | Wide | He passes him at last. |
| 33 | 40.5–41.5 | 1.0 | Close-up: huge smile; grey on the ground far behind. | Close-up | Triumph. |
| 34 | 41.5–43.1 | 1.6 | He rolls on, grey's briefcase now on his frame. Push in to his face. | Medium to close-up | He took the briefcase too. End on the hero's face. |

**How it works without sound**
- **Hook picture:** the conflict is complete in frame 0 (two walkers, one passing) and the second shot shows the other man's choice. Three shots in the first 3.6 s: act, counter-act, reaction.
- **Who is who:** blue is on the right and grey on the left in every two-shot of the video: on the street, under the sea, in Spain, at the wedding, at 80. Blue is the only saturated blue thing in any frame.
- **New ideas arrive as establishing shots:** each new place is one wide frame with one unmistakable landmark (pier, kelp, whale, bulls and red scarves, wedding dress) before any detail.
- **Cause → effect:** always two neighbouring shots, cause first: hip bump → stumble into the bus lane → bus enters → aerial flight. No effect is ever shown before its cause, and no cause is left without its effect.
- **Numbers, time, scale:** distance = aerial shot with tiny cars. "Sixty years" = same shop, grey hair, walking frames. "He's in every photo" = three photo prints. No number is ever written on screen.
- **Emotion:** two square eyes and a mouth. Emotion comes from brows (flat, V, raised), mouth shape, a body pose (fists, chest clutch) and comic marks (starbursts on the hips, impact lines).
- **Left out:** no dialogue, no other story lines, no detail on passers-by, no explanation of how anything is possible.

## 2. Dog and landlord ("Can your landlord evict you for having a dog?")

`DgKqYs9hRYH` · 33.8 s · YouTube twin `-JdVSQnVgbY`: 138,929 views in its first day. Picture and audio. Read: all 4 dense sheets.

| # | Time | Len | Picture | Shot / camera | What a mute viewer understands |
|---|---|---|---|---|---|
| 1 | 0.0–0.9 | 0.9 | The hero, hands on hips, beside a golden dog with a tennis ball. On the door behind them a red sign: `NO PETS ALLOWED`. | Full | He has a dog where dogs are banned. Premise complete in one frame: hero + problem + rule. |
| 2 | 0.9–2.2 | 1.3 | Black frame with a round peephole: a bald man with round glasses and a clipboard grins, bent by the lens. | Point of view through the door's peephole | Someone official is outside the door right now. A new character and where he is, in one shot. |
| 3 | 2.2–3.4 | 1.2 | Wide of the room: door, sign, dog, hero. He raises a finger. | Wide | He has an idea. Also re-establishes the room after the peephole. |
| 4 | 3.4–4.3 | 0.9 | He throws a white sheet. | Medium | — |
| 5 | 4.3–5.5 | 1.2 | The sheet covers the dog in a cone shape, right next to a real floor lamp of the same shape. The door opens; the landlord walks in. | Wide | The dog is disguised as a lamp. The real lamp beside it explains the disguise with no words. |
| 6 | 5.5–6.9 | 1.4 | The cone's back end wags and knocks the real lamp over. Hero's grin goes stiff. | Wide, same framing | The disguise failed. |
| 7 | 6.9–8.0 | 1.1 | He whips the sheet up; under it the dog now wears a white dress. | Medium | Second disguise. |
| 8 | 8.0–8.5 | 0.5 | He drops a curly grey wig on the dog. | Medium | She is an old lady now. |
| 9 | 8.5–9.7 | 1.2 | The dog in wig, glasses and pearls on a red armchair; the landlord inspects her; the hero gestures "ta-da". | Wide three-shot | He is passing the dog off as a person. |
| 10 | 9.7–10.5 | 0.8 | The dog barks in the landlord's face. | Medium | Problem. |
| 11 | 10.5–11.3 | 0.8 | Close-up of the hero, completely flat face. | Close-up reaction | He bluffs. (The words "She's German" are sound-only.) |
| 12 | 11.3–12.2 | 0.9 | The dog sniffs the landlord from head down to toe. | Medium, tilting down | — |
| 13 | 12.2–13.9 | 1.7 | The landlord's face goes pink; a red heart pops above his head. | Medium | He is falling for her. |
| 14 | 13.9–16.0 | 2.1 | The dog's long tongue sweeps his whole face. | Close two-shot | — |
| 15 | 16.0–17.1 | 1.1 | He drops to one knee with a ring box. | Full | He proposes. |
| 16 | 17.1–18.3 | 1.2 | Night. A pink building, neon sign `WEDDING CHAPEL`. The landlord in a tuxedo and the dog go in. | Wide exterior | New place; they are getting married. The sign does the establishing. |
| 17 | 18.3–19.8 | 1.5 | Inside: heart arch, dog in a veil, landlord in a tux, the hero holding a card that reads `RENT $1,800`. | Wide | The wedding. The rent card sets up the next beat. |
| 18 | 19.8–21.1 | 1.3 | Low close-up: the hero throws both arms up, then crosses them, smiling. Petals fall. | Close-up, low angle | He won. |
| 19 | 21.1–21.9 | 0.8 | Close-up of the bride-dog: ears up, head snaps round. | Close-up | She noticed something. |
| 20 | 21.9–23.1 | 1.2 | The chapel doors: a mailman with a parcel waves. | Full, framed by the doorway | What she noticed. Dogs and mailmen: no words needed. |
| 21 | 23.1–23.8 | 0.7 | Down the red aisle: the dog bolts for the door. | Point of view down the aisle | She is chasing him. |
| 22 | 23.8–25.1 | 1.3 | Outside: the mailman dives into his truck, a blur of dog after him. | Wide | — |
| 23 | 25.1–26.4 | 1.3 | Close-up: the landlord howling, arcs of blue tears, ring box in hand. | Close-up reaction | Heartbreak. |
| 24 | 26.4–27.5 | 1.1 | The hero catches the bouquet. | Medium | — |
| 25 | 27.5–28.4 | 0.9 | The dog at the mail truck window, papers flying. | Medium | She has left him. (That the papers are a divorce filing needs the words.) |
| 26 | 28.4–29.9 | 1.5 | A panelled room, a round seal reading `LAW`. A German shepherd in a tie beside the bride-dog; the landlord alone at the other table. | Wide | Court. Her lawyer is a dog. One sign sets the place. |
| 27 | 29.9–30.6 | 0.7 | The dog bride posing in front of the apartment building. | Full | She won the building. |
| 28 | 30.6–31.3 | 0.7 | The hero on the steps with boxes. | Full | He is thrown out. |
| 29 | 31.3–32.1 | 0.8 | The whole building: a dog on every balcony; the sign now reads `NO HUMANS ALLOWED`. | Wide | The rule from frame 0, reversed. The sign pays off the first frame. |
| 30 | 32.1–33.8 | 1.7 | Landlord (crying) and hero (holding the bouquet) sit on the kerb. | Two-shot, hold | Both lost. |

**How it works without sound**
- **Hook picture:** rule sign + rule-breaker in frame 0; the threat arrives in shot 2 through the peephole. 10 cuts in the first 10 s.
- **A sign is the story's spine:** `NO PETS ALLOWED` is in the background of most of the first 15 shots, so the stakes never leave the frame, and its reversal is the ending.
- **Explaining by placing things side by side:** the sheeted dog stands next to a real lamp of the same shape, so "it's meant to be a lamp" is visible.
- **Emotion:** pink face + a heart = love; arcs of tears = heartbreak; a totally flat face = a bluff; ears up = alert.
- **Left out:** the room has a door, a lamp, a chair and a rug. Nothing else.

## 3. Key in the lock ("Why can't you get the key in the lock at night?")

`DgFhJKAj0Ss` · 27.0 s · YouTube twin `oEN0Y7nYvyg`: 294,089 views. Picture and audio. Read: all 3 dense sheets. Crude toilet humour; logged for structure only.

| # | Time | Len | Picture | Shot / camera | What a mute viewer understands |
|---|---|---|---|---|---|
| 1 | 0.0–3.0 | 3.0 | Black background. The hero's face fills the frame; a key keeps jabbing his cheek and nose; his tongue sticks out. | Extreme close-up, 3 jabs | He cannot see what he is doing. The darkness itself is shown: only his face is lit. |
| 2 | 3.0–4.3 | 1.3 | A porch at night: he scrapes a key around a door lock (scratch marks round the keyhole). Comic word `HIC!`. A round dial hangs on the wall beside the door. | Full, side | He is drunk, at a front door, missing the lock. The dial is planted here and used in shot 11. |
| 3 | 4.3–5.4 | 1.1 | He bends over with a lighter. | Wide | A bad idea is coming. |
| 4 | 5.4–6.9 | 1.5 | A jet of flame hits the door. Comic word `FWOOM`. | Wide | — |
| 5 | 6.9–8.2 | 1.3 | The lock, on fire, lit orange. | Close-up insert | Now he can see the keyhole, and it is burning. |
| 6 | 8.2–10.4 | 2.2 | He aims a stream at the flames and misses. | Medium, low | He tries to put it out the only way he can. |
| 7 | 10.4–12.9 | 2.5 | Wider: shoes, wall and doormat turn yellow. | Wide | He misses everything. |
| 8 | 12.9–13.7 | 0.8 | Close-up: his face in the orange light, content. | Close-up reaction | — |
| 9 | 13.7–14.4 | 0.7 | The stream hits the fire; steam. | Medium | Fire out. |
| 10 | 14.4–15.5 | 1.1 | Smile, then an "O" of horror. | Close-up, two faces | Solved, then something is wrong. |
| 11 | 15.5–16.4 | 0.9 | The wall dial fills the frame: needle on 20, a `°F` mark. | Extreme close-up insert | It is freezing cold. A number shown on a real instrument, alone in the frame. |
| 12 | 16.4–18.5 | 2.1 | A solid yellow block of ice covers the whole door; he pushes at it. | Full | The door is frozen shut. Cause (dial) then effect (ice) in neighbouring shots. |
| 13 | 18.5–19.3 | 0.8 | Inside a truck cab, looking back over his shoulder. | Medium interior | — |
| 14 | 19.3–20.4 | 1.1 | A red truck reverses at the porch, tail lights on. | Wide | He is going to ram it. |
| 15 | 20.4–20.9 | 0.5 | Impact, debris, comic word `BOOM!`. | Wide | — |
| 16 | 20.9–21.7 | 0.8 | He tumbles into a living room. | Wide | He is in. |
| 17 | 21.7–22.9 | 1.2 | Family photos on the wall; he stares at them. | Medium, the photos share the frame with his face | These are not his family. |
| 18 | 22.9–23.8 | 0.9 | Looking up the stairs: a woman in a pink robe with a baseball bat. | Low angle | Wrong house, and the owner is awake. |
| 19 | 23.8–24.5 | 0.7 | He flops on their couch. | High | — |
| 20 | 24.5–27.0 | 2.5 | Morning. He walks out with their air fryer strapped to his chest, the truck still in the wall. Push in to his smile. | Wide to close-up | He stole something on the way out. End on the hero's face. |

**How it works without sound:** the number (20 °F) is never said without being shown on a dial; the dial was hanging in shot 2 before it mattered. "Wrong house" is told with three pictures and no words: strangers' photos → an angry stranger → his sheepish flop.

## 4. Forgot why you walked in ("Why do you forget why you walked into a room?")

`DgFg65TlD_b` · 40.9 s · YouTube twin `hiDo4aJfMpQ`: 260,705 views. Picture only. Read: one frame per shot (25 frames), so timings are from the ffmpeg cut list and lengths are approximate.

| # | At | Picture | Shot / camera | What a mute viewer understands |
|---|---|---|---|---|
| 1 | 0.0 | He walks into a kitchen and stops by the fridge. | Full | He came in for something. |
| 2 | 2.1 | The house with its roof and front wall removed, like a doll's house: two rooms side by side, a doorway between, him small in one. | Cut-away wide | The two rooms and the door between them: the whole "map" of the problem in one picture. |
| 3 | 4.3 | Blank face. | Close-up | He has forgotten. |
| 4 | 5.1 | Doll's-house view again: he walks back through the doorway. | Cut-away wide | He goes back to remember. |
| 5 | 6.1 | He blurs past a cuckoo clock. | Medium, motion blur | Back and forth, fast. |
| 6 | 7.0 | Back at the fridge. | Full | Still nothing. |
| 7 | 8.1 | The door swings into his face. | Medium | — |
| 8 | 9.3 | From above: flat on the floor, stars circling. | Top view | Knocked out. |
| 9 | 10.2 | The Earth from space. | Wide insert | Now he does not even know what planet this is. |
| 10 | 11.2 | Arms up; a thought cloud with a green alien head. | Medium + thought bubble | He thinks he is an alien. A thought shown as a picture in a cloud. |
| 11 | 12.5 | Garden: he holds a light bulb up on a tower made of a lawn chair, a toaster and the cuckoo clock. | Wide | He built something to "phone home". |
| 12 | 13.8 | The contraption, close. | Insert | — |
| 13 | 15.0 | He rides a bicycle off the roof at night. | Wide | — |
| 14 | 16.1 | A black silhouette on a bicycle across a huge moon. | Wide, silhouette | A famous film picture, readable with no words. |
| 15 | 16.9 | He crashes into a neighbour's pool party. | Wide | It did not work. |
| 16 | 18.0 | In the pool, finger up. | Medium | New idea. |
| 17 | 18.8 | He straps red fire extinguishers to the fridge. | Medium | — |
| 18 | 19.6 | The fridge with rockets. | Full | — |
| 19 | 21.2 | The fridge blasts through the roof. | Wide exterior | — |
| 20 | 21.9 | Him frozen grey in the freezer compartment, the Earth behind. | Medium | He is in space, frozen. |
| 21 | 23.3 | Red desert; the fridge crashed; he sits up. | Medium | Mars. |
| 22 | 26.7 | From above: green aliens with spears in a ring around him. | Top view | Captured. |
| 23 | 27.5–36.6 | (ffmpeg sees one 9 s stretch on the red ground; there are cuts inside it that I did not sample.) A lone door frame stands on the red plain; he walks through it and blurs. | Full | The same door trick, on Mars. |
| 24 | 36.6 | He is old, white beard; a thought cloud holds a glass of water. | Medium + thought bubble | Years later he remembers: he only wanted a glass of water. |
| 25 | 38.2 | He walks back through the door. | Full | And forgets again. |

**New devices here:** the doll's-house cut-away (shows a layout problem in one frame), thought clouds with a single picture inside (the only way a thought is ever shown), top view for "knocked out" and "surrounded".

## 5. Everybody's partying except me

`DgDj1R7JdT4` · 37.3 s · YouTube twin `bt3Q13OCTfA`: 273,644 views. Picture only. Read: one frame per shot (27 frames).

| # | At | Picture | Shot / camera | What a mute viewer understands |
|---|---|---|---|---|
| 1 | 0.0 | The hero at his bedroom window, sad mouth. Boxing gloves and a `FIGHT NIGHT` poster on the wall. | Medium, seen from outside through the window frame | He is stuck inside. He boxes (planted for shot 3). |
| 2 | 1.1 | The back of his head, close; beyond it, across the street, a house with balloons and a couple at the door. | Over his shoulder, out of the window | What he is looking at: a party he is not at. |
| 3 | 2.5 | He bounces into a boxing stance. | Full | — |
| 4 | 5.1 | Wide: his huge black shadow on the wall facing him. | Wide | He is shadow-boxing. The shadow is the second character. |
| 5 | 5.9 | Close: he jabs at it. | Medium | — |
| 6 | 7.1 | The shadow's fist hits him. | Medium | The shadow hits back. |
| 7 | 8.1 | From above: flat out, stars. | Top view | Knocked out. |
| 8 | 9.2 | The shadow, now a solid black figure in a red jacket, walks out of the door. | Medium, from behind | His shadow is leaving without him. |
| 9 | 11.1 | The party house door: the shadow is welcomed in. | Full, framed by the doorway | It went to the party. |
| 10 | 12.3 | He comes through the party window in a shower of bits. | Wide | He followed. |
| 11 | 13.1 | A girl slow-dancing with the shadow. | Close two-shot | His crush is with it. |
| 12 | 14.2 | His face: V brows. | Close-up reaction | Jealous. |
| 13 | 15.5 | Her face: eyes closed, smiling. | Close-up | She is happy. |
| 14 | 16.6–19.2 | He swings, misses, hits the DJ. | Wide, 2 shots | — |
| 15 | 19.2 | The shadow lifts him over its head. | Wide | — |
| 16 | 20.2 | From the garden: he flies out through the glass door. | Wide exterior | Thrown out. |
| 17 | 21.7 | Close: he holds up a light bulb, grinning. | Close-up with the prop beside his face | Idea: no light, no shadow. |
| 18 | 22.8–25.8 | He head-butts a lamp, jumps at a bulb, jumps at the ceiling light. | 3 quick shots | He is smashing every light. |
| 19 | 25.8 | The party, dark; stars round his head; the girl beside him. | Medium | It is dark and he is dizzy, but he is next to her. |
| 20 | 27.5 | Outside: a street lamp throws a cone of light; the shadow stands in it. | Wide | It moved to the street light. |
| 21 | 28.9 | He stands on a power pole. | Low wide | — |
| 22 | 30.6 | The whole town from the air; lights going out. | Aerial | He cut the power to everything. Scale by pulling right out. |
| 23 | 32.5 | An empty red jacket drops onto the pavement. | Insert | The shadow is gone. An object stands for a character. |
| 24 | 33.3–37.3 | The dark street: everybody is out; one figure in the red jacket punches the air alone. | Wide, hold | Back to frame 0, with the roles changed. |

**New devices here:** the over-the-shoulder window shot that shows what a character wants in one frame; a prop held beside the face for "idea"; an empty costume for "gone"; a recurring colour (the red jacket) to track a character who is otherwise a black blob.

---

## The 5 most-viewed, from 1 fps thumbnails + captions (not truly watched)

| Short | Views | Length | What the thumbnails show that matters for us |
|---|---|---|---|
| Stubbed toe in church `TL4hOkBc1rY` | 3,273,267 | 24 s | Frame 0: an extreme close-up of the hero with both hands clamped over his mouth and a red face, in a church. The whole premise (pain + can't shout) is one picture. Holding it in is shown as his body inflating like a balloon, bigger each shot. About 22 different pictures in 24 s. |
| Shower curtain `LVy9Qeau3fI` | 2,154,164 | 25 s | Frame 0: shocked face, curtain touching him. Every fix is a new object entering the same bathroom (darker curtain, tape, fire hose). The escalation ends with a pull-out to the house spinning above the town. |
| Taller in the morning `XoCxPYPYBG4` | 1,586,698 | 29 s | **Best number staging on the channel.** A height line drawn across the wall at his head with the figure on it (5'11", then 5'10", 6'0", 6'1", 6'2"), a profile card showing "6'0"" at the start, and a phone notification bar at the top of frame for the time pressure ("10 minutes away"). The number is always attached to the thing it measures, and it changes in front of you. |
| Upstairs neighbour `gGwvn002Y1I` | 1,364,601 | 34 s | Frame 0 is a cut-away of two flats, one above the other: the stomper upstairs and the hero in bed below, in one frame. Scale grows by pull-outs: stage → hall → a planet covered in tiny dancers → a cross-section of the Earth's core. |
| Buttered cats `taethBr1zEI` | 1,254,018 | 35 s | One cat on a table → a warehouse of identical tables running to the vanishing point ("10,000 times" shown as rows, not said as a number) → the city skyline lighting up (effect) → on-screen counters stuck to the object: `352 RPM`, `691,741 RPM`, `DAY: 24 H`. A fast day/night flicker shows the Earth spinning. |

## What repeats in all 10

1. Frame 0 is a complete picture of the problem: the hero, the thing in his way, and (when there is one) the rule or number, all in one frame.
2. One spoken clause = one picture = one action. The narration describes what is on screen in the present tense; it never runs ahead of the picture or talks about something not shown.
3. The hero looks the same in every shot of every video, and keeps the same side of the frame within a video.
4. A new place is always entered through one wide frame with one landmark or one sign.
5. Cause and effect sit in neighbouring shots, cause first.
6. Numbers, time and scale are shown on a thing: a dial, a height line, a counter on the object, grey hair, a pull-out to a town or a planet.
7. Feelings are a face change plus one comic mark (heart, tears, stars, starburst), held for about a second in close-up.
8. Sets are nearly empty: only what the story touches.
9. Hard cuts only. Average shot a little over a second.
10. The last picture answers the first one.
