# Daily production runbook — Bad Math

Every day: **up to 8 unique Shorts** (at least 3), plus **1 unique long-form on Monday, Wednesday and Friday** (US Eastern), built **one at a time**, and each one is **published automatically as soon as it passes QA** (standing user authorization, 2026-11-24: "don't ask for approval"). Order: Short 1 → Short 2 → Short 3 → (Mon/Wed/Fri) long-form → Shorts 4–8 while usage lasts — each queued and approved the moment it passes QA, so finished videos go out even if the day's usage runs out. The user can revoke this anytime ("stop auto-posting") — then go back to asking per post.

Re-read first: `CHANNEL.md`, `STYLE.md`, `brand/CHARACTER.md`, `brand/MEMES.md` (meme beats: 2–3 per Short, ~1 per 30–45 s long-form), `brand/sfx-library/manifest.json` (reusable CC0 sounds), `ideas.md`, and the newest long-form `videos/2026-11-25-impossible-number/DIRECTION.md` (template for long-form direction).

## Roles (cost rule from the user)
- **Opus (director, this session):** picks ideas, does the research and fact-checking, writes every script, storyboard and thumbnail concept, reviews every still, approves or sends fixes. Never writes the animation code itself.
- **Sonnet agents:** animation engines, scenes/chapters, thumbnails (Agent tool, model "sonnet", run in background, parallel where independent).
- **Haiku agents:** narration + timelines, sound sourcing + mix, captions, upload packages, uploads (model "haiku").

## Uniqueness rules (non-negotiable — YouTube demonetizes repetitive/mass-produced content)
- Never reuse a topic, case, hypothetical, script, hook line or thumbnail layout already in `ideas.md` (check before choosing).
- Every video has its own story/insight, script, visuals and edit. Shared engine/character/brand are production tools, never the content.
- Rotate series and formats: Shorts alternate What If / Decoded; no two consecutive uploads use the same format (Counter, Scale Swap, Pitch vs Math, Case File, Dilemma/Two Buttons, Spot the Tell, Timeline, Myth vs Math).
- Long-form topics are bigger stories (a case or a hypothetical with 3–5 chapters), not stretched Shorts.
- Decoded = documented/court-proven only; pending = "alleged". What If = assumptions labeled on screen.
- Log every chosen idea in `ideas.md` (date, series, format, title, one-line angle, sources) at the moment it's picked.

## Daily pipeline
1. **Ideas (Opus):** pick 3 Short ideas + 1 long-form idea using research (Wikipedia + WebSearch; outliers in the niche). Hard-to-decide dilemmas and impossible-number frauds perform; vary them.
2. **Fact pass (Opus):** fetch sources (en.wikipedia.org is allowed), build the number spine, cut anything unverifiable. No invented quotes, records or case captions.
3. **Hook gate (Opus) — rule #1, before anything else:** follow STYLE.md §14. Write 10 outrageous hook variants ("This guy was so dumb…", "You're probably an idiot if…"), keep the strongest true one, design a frame-0 pattern break, and open a loop paid off at 75–80%. Mild edge only (no f-words/slurs in voice, title, thumbnail); never call an unconvicted person a fraud. A script that fails the gate is rewritten, not built.
4. **Scripts (Opus) — THREE per topic (STYLE.md §15):** a YouTube Shorts script, a TikTok script and an Instagram/Facebook Reels script, each with its own hook, length and CTA style (IG/FB = most vulgar/disrespectful, 15–25 s, built for sends + saves). Same facts, different cut. Voice each separately; build each edit separately (shared topic assets OK).
   Then, for the YouTube script:  weave like / share / follow into the story per STYLE.md §13 (spread out, one clause each, never a pitch). Shorts 70–115 words (28–45 s); long-form 1,350–1,600 words (≥ 8:30 so mid-rolls work later). Pattern-break hook in the first 2 s; re-hooks; payoff at 75–80%; loop line for Shorts. Write `paragraphs.json` per video.
5. **Voice (Haiku):** Shorts = FREE Kokoro `am_michael`, speed 1.12 (`/root/tts/.venv`, models in `/root/tts`). Long-forms (Mon/Wed/Fri) = PAID ElevenLabs **Bad Math Narrator** (voice_id `tEcWY4Gir18XAcYuihhc`, model eleven_v4, one take, generations_count 1) — ElevenLabs Creator plan (~121k credits/month ≈ 3 long-forms a week at ~8,500 characters each). Check `account_get_usage` first; if remaining credits < script length + 5%, use Kokoro for that long-form and tell the user. Never spend ElevenLabs credits on Shorts, sound effects or music. Then Whisper word timings + mouth envelope — same as `videos/2026-11-25-impossible-number/voice/tts.py`.
6. **Direction (Opus):** `DIRECTION.md` per video (storyboard per paragraph, storyteller poses, sound cues, thumbnail concept). Shorts: 1080×1920, storyteller bottom-right left of the button rail, comment bubble after the payoff, follow button in the last 2 s. Long-form: 1920×1080, reuse the long-form engine (`videos/2026-11-25-impossible-number/build/engine.js`, `ENGINE.md`).
7. **Build (Sonnet):** scenes/chapters in parallel; each agent renders and inspects stills. Opus reviews contact sheets and sends fixes.
8. **Sound (Haiku):** FREE only — never ElevenLabs sound effects or music (user rule 2026-11-24). CC0 recordings from Openverse/Freesound for every SFX and music bed, credited in `sfx/CREDITS.md`; mix to −14 LUFS / ≤ −1 dBTP. No synthesized "beep" sounds.
9. **Render + QA:** full render; check duration, loudness/peak, frozen/black frames, contact sheet. `qa.md`.
10. **Package (Haiku):** `captions.srt`, `upload.json` (title ≤ 60 chars, description with sources + "AI-narrated · not financial advice", chapters for long-form, tags, pinned comment), `socials.md` (TikTok caption; no links, no "link in bio", no Tape).
11. **Queue in PostFast (Opus):**
    - Upload each video to a temp link — **uguu.se works** (3 h, ≤128 MB): `curl -F "files[]=@video.mp4" https://uguu.se/upload` → `files[0].url`. (litterbox and tmpfiles.org refused uploads from this environment on 2026-11-24.) `curl -F reqtype=fileupload -F time=12h -F fileToUpload=@video.mp4 https://litterbox.catbox.moe/resources/internals/api.php` → `upload_from_url`. Long-form must be ≤ 250 MB (re-encode ~3.8 Mb/s). Upload `captions.srt` too (youtubeCaptionKey) and the thumbnail (youtubeThumbnailKey) for long-form.
    - Accounts: YouTube **BadMath** `7615365c-4085-4841-ae0b-7af4c8c441de` (Shorts + long-form); TikTok **@color.me.saved** `095075de-53fe-407f-9d08-4b5f47ed8390` (TikTok cut only — the Bad Math TikTok until the username can be changed); Instagram **badmath.tv** `1beb5c7d-4c01-4abf-a91f-0880aa3dee7e` (IG cut, instagramPublishType REEL); Facebook **BadMath.tv** `d999359b-223e-4dfc-a6a1-bf0e120086e5` (same IG cut, facebookContentType REEL). YouTube gets only the YouTube cut. Re-check `list_accounts` connectionStatus first.
    - Schedule (America/New_York): Shorts take the next free slot of the day among 08:00, 10:00, 12:00, 14:00, 16:00, 18:00, 20:00, 22:00 (if all of today's slots have passed or are taken, use the same slots tomorrow, but never more than 8 Shorts per day per account). Long-form (Mon/Wed/Fri) goes at 17:00. If a slot is less than 10 minutes away, take the next one. Check `list_posts` for already-scheduled posts before picking a slot. Controls: youtubeContainsSyntheticMedia true, youtubeMadeForKids false, youtubeIsShort true/false, youtubeLanguage "en", youtubePrivacy PUBLIC; tiktokIsAigc true.
    - `create_posts`, then `approve_posts` (APPROVED) right away under the user's standing authorization. Only videos that passed fact-check + QA may be approved. If the user has said "stop auto-posting", leave posts PENDING_APPROVAL and ask instead.
12. **After each post:** a short note to the user (platform · time ET · title · video attached via SendUserFile; long-form share copy < 500 MB). Then check `list_posts` later for FAILED posts and report any failure.
13. **Commit + push** each finished video folder to `main` (keep `video.mp4` > 95 MB out of git: split into `video-parts/`).

## If something fails
- Usage limit / long build: ship the Shorts first; the long-form can slip to the next day — never ship an unreviewed video.
- PostFast account DISABLED: tell the user; don't schedule to it.
- Temp host blocked: tell the user; offer manual upload.

## Build ahead + analytics loop (user rule 2026-11-24)
- **Build ahead freely** when there's time/usage: research, scripts, voice, renders for future days are all fine.
- **Scheduling horizon = 7 days max.** Never schedule a post more than ~7 days out. Finished videos beyond that wait in `queue.md` (unscheduled) so they can still be improved or replaced after we see analytics.
- **Daily (start of every build session):** pull `get_post_analytics` for the last 7 days (all platforms) and append a dated block to `ANALYTICS.md`: per post — platform, title/hook, views, avg watch time / % viewed, likes, comments, shares, saves (IG saveRate, reelsSkipRate), TikTok full_video_watched_rate. Flag the top 20% and bottom 20%.
- **Weekly review (every Sunday ET, before building):** write `## Week of …` in `ANALYTICS.md`: which topics, series (Decoded/What If), formats, hook patterns, lengths, platforms and slots won/lost, with numbers. Then write **3–5 concrete changes** for next week (e.g. "more court-convicted villains", "IG cuts under 18 s", "drop the 08:00 slot"), and apply them: update STYLE.md/PRODUCTION.md if it's a rule change, re-rank ideas, and revise or replace any already-scheduled post in the next 7 days that the data says will underperform.
- **Replicate winners, never repeat them:** a winning video gets a *new* topic with the same ingredients (hook pattern, structure, length, villain type) — never the same topic or script (uniqueness rules still apply). Log "inspired by <winner>" in ideas.md.
- Small samples: don't overreact to < 500 views; judge patterns over ≥ 3 posts.
