# Daily production runbook — Bad Math

Every day: **3 unique Shorts**, plus **1 unique long-form on Monday, Wednesday and Friday** (US Eastern), built **one at a time**, and each one is **published automatically as soon as it passes QA** (standing user authorization, 2026-11-24: "don't ask for approval"). Order: Short 1 → post → Short 2 → post → Short 3 → post → (Mon/Wed/Fri) long-form → post, so finished videos go out even if the day's usage runs out. The user can revoke this anytime ("stop auto-posting") — then go back to asking per post.

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
3. **Scripts (Opus):** Shorts 70–115 words (28–45 s); long-form 1,350–1,600 words (≥ 8:30 so mid-rolls work later). Pattern-break hook in the first 2 s; re-hooks; payoff at 75–80%; loop line for Shorts. Write `paragraphs.json` per video.
4. **Voice (Haiku):** Shorts = FREE Kokoro `am_michael`, speed 1.12 (`/root/tts/.venv`, models in `/root/tts`). Long-forms (Mon/Wed/Fri) = PAID ElevenLabs **Bad Math Narrator** (voice_id `tEcWY4Gir18XAcYuihhc`, model eleven_v4, one take, generations_count 1) — ElevenLabs Creator plan (~121k credits/month ≈ 3 long-forms a week at ~8,500 characters each). Check `account_get_usage` first; if remaining credits < script length + 5%, use Kokoro for that long-form and tell the user. Never spend ElevenLabs credits on Shorts, sound effects or music. Then Whisper word timings + mouth envelope — same as `videos/2026-11-25-impossible-number/voice/tts.py`.
5. **Direction (Opus):** `DIRECTION.md` per video (storyboard per paragraph, storyteller poses, sound cues, thumbnail concept). Shorts: 1080×1920, storyteller bottom-right left of the button rail, comment bubble after the payoff, follow button in the last 2 s. Long-form: 1920×1080, reuse the long-form engine (`videos/2026-11-25-impossible-number/build/engine.js`, `ENGINE.md`).
6. **Build (Sonnet):** scenes/chapters in parallel; each agent renders and inspects stills. Opus reviews contact sheets and sends fixes.
7. **Sound (Haiku):** FREE only — never ElevenLabs sound effects or music (user rule 2026-11-24). CC0 recordings from Openverse/Freesound for every SFX and music bed, credited in `sfx/CREDITS.md`; mix to −14 LUFS / ≤ −1 dBTP. No synthesized "beep" sounds.
8. **Render + QA:** full render; check duration, loudness/peak, frozen/black frames, contact sheet. `qa.md`.
9. **Package (Haiku):** `captions.srt`, `upload.json` (title ≤ 60 chars, description with sources + "AI-narrated · not financial advice", chapters for long-form, tags, pinned comment), `socials.md` (TikTok caption; no links, no "link in bio", no Tape).
10. **Queue in PostFast (Opus):**
    - Upload each video to a 12 h temp link: `curl -F reqtype=fileupload -F time=12h -F fileToUpload=@video.mp4 https://litterbox.catbox.moe/resources/internals/api.php` → `upload_from_url`. Long-form must be ≤ 250 MB (re-encode ~3.8 Mb/s). Upload `captions.srt` too (youtubeCaptionKey) and the thumbnail (youtubeThumbnailKey) for long-form.
    - Accounts: YouTube **BadMath** `7615365c-4085-4841-ae0b-7af4c8c441de` (Shorts + long-form); TikTok **@color.me.saved** `095075de-53fe-407f-9d08-4b5f47ed8390` (Shorts only — this is the Bad Math TikTok until the username can be changed). Re-check `list_accounts` connectionStatus first.
    - Schedule: as soon as the video passes QA, scheduledAt = now + 10 min. Keep ≥ 90 min between two posts on the same account (if the last one was more recent, schedule 90 min after it). Controls: youtubeContainsSyntheticMedia true, youtubeMadeForKids false, youtubeIsShort true/false, youtubeLanguage "en", youtubePrivacy PUBLIC; tiktokIsAigc true.
    - `create_posts`, then `approve_posts` (APPROVED) right away under the user's standing authorization. Only videos that passed fact-check + QA may be approved. If the user has said "stop auto-posting", leave posts PENDING_APPROVAL and ask instead.
11. **After each post:** a short note to the user (platform · time ET · title · video attached via SendUserFile; long-form share copy < 500 MB). Then check `list_posts` later for FAILED posts and report any failure.
12. **Commit + push** each finished video folder to `main` (keep `video.mp4` > 95 MB out of git: split into `video-parts/`).

## If something fails
- Usage limit / long build: ship the Shorts first; the long-form can slip to the next day — never ship an unreviewed video.
- PostFast account DISABLED: tell the user; don't schedule to it.
- Temp host blocked: tell the user; offer manual upload.
