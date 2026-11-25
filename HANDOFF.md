# HANDOFF — Bad Math (read this first in any new session)

> **READ FIRST, EVERY SESSION AND EVERY NIGHTLY BUILD (user rule 2026-11-25: "remember every correction and rule"):**
> 1. `RULES.md` — every owner rule/correction + the SCRIPT GATE and VIDEO GATE. A new correction goes into RULES.md in the same turn it is given.
> 2. Scripts are written with the skills in `brand/skills/` (STYLE §22): beats muted-first, 5–10 scored hooks, cut-test every line, CTAs woven at ~30/55/80% (never an end block), loop ending.
> 3. Run `python3 brand/tools/script_gate.py <cut>` before voicing; FAIL = rewrite. Check the VIDEO GATE before queuing.
> 4. Never send scripts/drafts to the owner for review; only report finished, queued videos.
> 5. Long-forms use engine v2 (16:9), never the old neon engine. No AI labels anywhere. No um/uh, no laugh.

This file is the long-term memory of the Bad Math project. A new Claude session that reads this + the files it points to must be able to continue the work with no other context. **Keep it current** (see "Keeping this file alive" at the bottom).

Last updated: 2026-11-25 ~02:35 UTC (Tue Nov 24, ~9:35 PM ET). Session that wrote it: https://claude.ai/code/session_01JmfP7BKYW7KW1MupN5jo5m

---

## 1. What this project is
- **Bad Math** — a faceless channel about the math behind money cons (**Decoded** series, court-proven cases only; pending = "alleged") and money hypotheticals (**What If** series, assumptions on screen). Audience: US, 18–28. Goal: growth first, ads later.
- The owner (the user) wants it fully automated: research → scripts → animated videos → voice → sound → publish on all platforms, every day, without asking for approval. They check in from the Claude app on their phone.
- Repo: `landowncj-byte/BadMathYt` (private), cloned at `/home/user/badmathyt`. Everything durable lives here.

## 2. Files that ARE the system (read in this order)
1. `HANDOFF.md` (this) — overview, state, how to resume.
2. `CHANNEL.md` — channel config + **dated decision log** (every user rule, newest at the bottom).
3. `STYLE.md` — creative rules. Key sections: §13 woven CTAs · §14 hook gate (outrageous-but-true hooks) · §15 three platform cuts · §16 pronunciation (say vs show) · §17 comments hybrid mode · §18 story loop · §19 series rules (What If = wild, Decoded = 100% accurate) · §20 visual system v2 + brand lock.
4. `PRODUCTION.md` — the daily runbook (roles, pipeline, slots, PostFast steps, analytics loop, watching videos).
5. `ideas.md` — every topic ever used (never repeat) + used hooks + viewer requests.
6. `ANALYTICS.md` (daily pulls + Sunday reviews), `queue.md` (built-ahead, not yet scheduled).
7. `research/<date>/` — Fable's research: `competitors.md`, ranked `ideas.md`, `<slug>/research.md`, `longform/`, `lottery-part2/`.
8. `brand/` — `storyteller.js` (recurring character), `CHARACTER.md`, `MEMES.md`, `PROFILE.md`, `sfx-library/` (131 CC0 sounds + manifest.json), `voice/pronounce.py` + `voice/patch_sentences.py`, `tools/watch.sh`, **`engine-v2/` + `VISUAL-V2.md` (current video engine)**.
9. `videos/<date>-<slug>/` — one folder per topic: `voice/`, `build/`, `video.mp4` (YouTube cut), `tiktok/`, `ig/`, `captions.srt`, `qa.md`, `sfx/CREDITS.md`.
10. `archive/` — backups of the conversation itself (see §9).

## 3. The user's standing rules (short version — full list in CHANNEL.md log)
- **Volume:** minimum **8 posts per platform per day** + **1 long-form on Mon/Wed/Fri** (YouTube only, 17:00 ET). Build ahead freely, but **never schedule more than 7 days out**.
- **Three different cuts per topic** (§15): YouTube Shorts (ad-safe edgy, 40–55 s), TikTok (spicy, 25–40 s, comment bait), Instagram + Facebook (most vulgar/disrespectful, 15–25 s, sends + saves). Same facts, different script/voice/edit.
- **Hooks are #1, retention #2** (§14): outrageous/negative/edgy first line ("This guy was so dumb…", "You're probably an idiot if…"), always true. Story loop every time (§18): stakes → big question → twist → rehooks. **Humanized scripts (§21):** contractions, small reactions, everyday slang, self-corrections (no filler words), and real CC0 breaths/sighs/gasps. **NO um/uh and NO laugh/chuckle** (user 2026-11-25) via `brand/voice/humanize.py` (demo: research/humanize-demo/mock-short.mp4).
- **Auto-publish with no approval** (standing authorization 2026-11-24). Revocable only by "stop auto-posting".
- **Comments: hybrid** (§17) — auto-reply to normal comments; flag sensitive ones to the user.
- **Visuals v2** (§20): camera push-ins on spoken numbers, storyteller moves in front of/behind graphics, satisfying spring motion, NO neon. Fable built `brand/engine-v2` once (2026-11-25) and handed it to Opus; Fable stays research-only.
- **Series rules** (§19): What If = random/off-the-wall money premises welcome (~half of daily topics), math exact. Decoded = 100% accurate: convicted/pleaded/judged only; every fact primary-sourced or 2+ independent sources, else cut.
- **Usage pacing:** Claude can't see the usage meter. Give the user **time-based** estimates before heavy jobs ("~2 h of heavy work"), keep agents ≤3, use Sonnet/Haiku for builds, short replies.
- **Profiles:** optimized bios for all 4 platforms in `brand/PROFILE.md` (v2). Recommended the user rename TikTok @color.me.saved → @badmath.tv (not done yet as of 2026-11-25).
- **Model split:** **Fable** = all research (facts + competitor/viral content research). **Opus** = creation + directing (picks topics, hooks, 3 scripts, pronunciation pass, direction, reviews every contact sheet, approves). **Sonnet** = coding/rendering/mixing. **Haiku** = voice timings, sound, captions, packaging.
- **Voice:** Shorts = free Kokoro `am_liam` (user pick), plain read via `say()` in `brand/voice/pronounce.py` (correct pronunciation; captions show normal spelling). Long-forms = paid ElevenLabs **Owen – Calm, Trustworthy Narrator**, voice_id `83MXTnoLsr3jX4Sl4gL4` (Creator plan, ~121k credits/month ≈ 3 long-forms/week). Never spend ElevenLabs on Shorts/SFX.
- **Sound/music:** free CC0 only (`brand/sfx-library`, Openverse/Freesound). No synthesized "slop" beeps.
- **Brand lock:** v2 visuals evolve the look but never change the avatar design, profile pictures, pills, fonts, wordmark or series colors (STYLE §20).
- **No** "link in bio", no financial advice, no picks, AI labels OFF on all platforms (2026-11-25; we never imitate real people — if a video ever does, label that one), no real logos/brands in art, never copy competitors' topics/scripts/footage (copy patterns only). Memes: only user-supplied Vlipsy clips under MEMES.md guardrails; never scrape Vlipsy.
- **Budget:** ~$150/mo (Claude Max + ElevenLabs Creator).

## 4. Accounts & IDs
- **PostFast** (MCP connector `mcp.postfa.st`): YouTube **BadMath** `7615365c-4085-4841-ae0b-7af4c8c441de` · TikTok **@color.me.saved** `095075de-53fe-407f-9d08-4b5f47ed8390` (the Bad Math TikTok until the username can be changed) · Instagram **badmath.tv** `1beb5c7d-4c01-4abf-a91f-0880aa3dee7e` (REEL) · Facebook **BadMath.tv** `d999359b-223e-4dfc-a6a1-bf0e120086e5` (REEL). Inbox (comments) works for TikTok/IG/FB, not YouTube.
- **Publishing flow:** `curl -F "files[]=@video.mp4" https://uguu.se/upload` → `upload_from_url` → `create_posts` (status SCHEDULED, firstComment, AI labels OFF: youtubeContainsSyntheticMedia false / tiktokIsAigc false / instagramIsAiGenerated false) → `approve_posts` APPROVED. (litterbox/tmpfiles refuse uploads from this environment.)
- **YouTube cap:** PostFast allows max 10 YouTube posts per UTC day (see PRODUCTION.md). ET 20:00+ counts toward the next UTC day.
- **Slots (America/New_York):** 08/10/12/14/16/18/20/22 for Shorts (+ evening catch-up slots if a day is short), long-form 17:00.
- **ElevenLabs** connector (Creator plan, active). **GitHub** repo above. **Cloud environment** `BadMathYt` `env_01985tBieg9F2mAWpMFVmzKq` (personal): setup script installs Kokoro + Whisper; allowed hosts include Wikipedia, GitHub, Hugging Face, Openverse/Freesound, uguu.se, justice.gov, sec.gov, consumerfinance.gov, YouTube, Instagram (+ `scontent-ord5-1.cdninstagram.com`).
- `.claude/settings.json` in the repo allows PostFast + ElevenLabs speech tools without permission prompts.

## 5. Scheduled tasks (fire into the CURRENT session — must be moved on handoff)
- **Bad Math daily build** `trig_01AxWKDeui5AqNP2bAbWCAk4` — `CRON_TZ=America/New_York 13 1 * * *` (1:13 AM ET). Analytics → Fable research → 8 topics × 3 cuts (+ long-form Mon/Wed/Fri) → publish. Created 2026-11-24; scheduled tasks may expire ~30 days after creation → **renew before ~2026-12-24**.
- **Bad Math comment sweep** `trig_01Mba35oBybPbDuPUXyWNyCo` — `CRON_TZ=America/New_York 37 10,14,18,22 * * *`.
- (Disabled) Salad Oil paid-music one-shot `trig_01HsuaDHY5sosjY8XzUaTgAT` — disabled 2026-11-25.

## 6. Production machinery (how a video is made)
- **Visual system v2 (2026-11-25, owner request): all NEW videos use `brand/engine-v2/`** (camera, depth layers, moving storyteller, no neon glow; brand lock in `brand/VISUAL-V2.md` §0). One `scene.js` per cut: elements + beats timed with `@word` refs. Build: `node brand/engine-v2/bm2.cjs init|check|stills|render` then `python3 brand/engine-v2/mix.py`. Read `brand/engine-v2/README.md`; prototype in `research/visual-v2/prototype/`. The v1 canvas templates below remain for reference only.
- Canvas engine: deterministic `window.render(t)` in HTML → Playwright screenshots → ffmpeg (2 parallel parts, concat list paths relative to list file). Templates: Decoded `videos/2026-11-24-fyre-bail/build`, What If `videos/2026-11-24-coffee-invested/build`, long-form engine `videos/2026-11-25-impossible-number/build/engine.js` + `ENGINE.md`.
- Mix: voice −16 LUFS, beds −24 ducked, master −14 LUFS / ≤ −1 dBTP, two-pass loudnorm.
- Voice: write `CUTS` lists → `pronounce.say()` (Kokoro) → Whisper word timings (`words.json`) → mouth envelope (`mouth.json`). Re-voice only bad sentences with `brand/voice/patch_sentences.py <voice_dir>`.
- Review: Opus checks a contact sheet of every cut (`ffmpeg -vf fps=…,tile`), fixes fabricated numbers/overlaps, then publishes.
- Watch reference videos: `brand/tools/watch.sh <url|file> <outdir>` → transcript + frame sheet.

## 7. Current state (update every work block)
- **STATE 2026-11-25 ~13:30 UTC:** **Thursday 2026-11-26 is FULLY QUEUED and approved on all 4 platforms (AI labels off):** 08:00 weight-vs-height · 10:00 fake-wine · 12:00 three-briefcases · 14:00 lottery-rig · 16:00 fake-prince · 18:00 penny-doubled · 20:00 lottery-part2 (What If; YT same time) · 22:00 onecoin (YT same time). All written with brand/skills, gate-passed, built per brand/BUILD-BRIEF.md and reviewed on real frames. Next: Friday 2026-11-27 batch (8 Shorts + Do Kwon long-form 17:00 ET, engine v2 16:9, Owen) → research with Fable, scripts with the gate, ≤3 build agents at once. ideas.md must get the Thursday topics added.
- **STATE 2026-11-25 ~10:00 UTC (Wed 5 AM ET):** Wed is fully queued and approved, AI labels off: 08 parlay · 10 overdraft · 12 McDonald's · 14 Javice · 16 card-minimum (YT 20:00) · 17:00 YT long-form "Impossible Number" (v2 style, Owen, woven CTAs, post id e92f65fe (real photos + photo thumbnail thumb-v2-d), title "One Number Exposed 3 of History's Biggest Frauds", thumb-v2-c) · 18 Tucker (YT 21) · 20 BitConnect (YT 22) · 22 1% fee (YT 23). Tucker/BitConnect/1% fee were REBUILT from rewritten scripts (spread CTAs) and swapped in.
- **New system (owner corrections 2026-11-25):** RULES.md = every rule + SCRIPT/VIDEO GATE; brand/tools/script_gate.py; scripts written with brand/skills (STYLE §22); build agents follow brand/BUILD-BRIEF.md; never send scripts to the owner.
- **Thursday 2026-11-26:** research in research/2026-11-26; 8 topics × 3 scripts written (Fable) + voiced (Liam), all 24 PASS the gate: weight-vs-height (08:00), fake-wine (10), three-briefcases (12), lottery-rig (14), fake-prince (16), penny-doubled (18), lottery-part2 (20), onecoin (22). Builds: first three running (Sonnet); then the other five, 3 at a time. YouTube Thu slots: 08–18 same times; 20:00+ count to the next UTC day (cap 10/UTC day: Thu UTC day already holds 4 from Wed evening → only 6 more before 19:59 ET, so Thu 08–18 = 6 fits exactly; 20 and 22 go to Fri UTC day).
- To verify before queuing: lottery-rig "security director" title; lottery-part2 "Virginia passed emergency rules" wording. Friday long-form = Do Kwon (v2 16:9 engine: brand/engine-v2 format 16:9; example videos/2026-11-25-impossible-number/build2).
- **Usage:** hit the 5-hour limit once on 2026-11-25 (06:40–08:30 UTC) with 5+ agents in parallel; keep to ≤ 3 build agents at a time.
- **Posted/scheduled 2026-11-24 (ET):** YouTube 8 (user's 3 + FTX 20:00, Theranos 21:00, lottery 22:00, Fyre 23:00, coffee 23:30); TikTok 8 (user's 3 + FTX, coffee, lottery, Theranos, Fyre); IG/FB 5 each.
- **Wed 2026-11-25 scheduled (all 4 platforms, all Liam voice):** parlay 08:00, overdraft 10:00, McDonald's Monopoly 12:00 ET (re-voiced to Liam via brand/voice/revoice.py). AI labels OFF (re-created 2026-11-25). Nightly build fills the rest — **YouTube for Wed can only take 14:00 + the 17:00 long-form before 20:00 ET (UTC cap); remaining Wed YouTube Shorts go at 20:00/21:00/22:00/23:00 ET**; TikTok/IG/FB use the normal 14/16/18/20/22 slots.
- **Wed 2026-11-25 also scheduled (engine v2 + Liam):** Javice 14:00 ET (all 4); credit-card minimum 16:00 ET TikTok/IG/FB + YouTube 20:00 ET. YouTube Wed remaining capacity: 17:00 long-form only before 20:00; 21:00/22:00/23:00 ET open.
- **Wed 18/20/22 (TikTok/IG/FB) + YouTube 21/22/23 ET — IN PROGRESS 2026-11-25 ~04:00 UTC:** Tucker payday loans (18:00 / YT 21:00), BitConnect 1%-a-day (20:00 / YT 22:00), 1% fee What If (22:00 / YT 23:00). Scripts + Liam voice done (videos/2026-11-25-tucker-payday, -bitconnect, -one-percent-fee; 3 cuts each); engine-v2 renders by Sonnet agents; then Opus reviews contact sheets and queues. Don't rebuild these. Still open after that: Do Kwon long-form 17:00 YouTube (Owen).
- **Long-forms = engine v2 style, 16:9 (user rule 2026-11-25, "trash neon slop" otherwise).** Madoff long-form ("The Impossible Number") is being rebuilt in v2 with Owen narration (voice/narration.wav = Owen; Kokoro backup in voice/kokoro/) → output video-v2.mp4, slot Wed 17:00 ET YouTube. Do Kwon long-form moves to Friday.
- **AI labels OFF everywhere** (all scheduled posts checked 2026-11-25 04:30 UTC; Tue-batch posts already published with labels can only be fixed in the apps).
- **Wed queued so far (besides 08–16):** BitConnect TT/IG/FB 20:00 + YT 22:00 ET; 1% fee TT/IG/FB 22:00 + YT 23:00 ET. Tucker TT/IG/FB 18:00 + YT 21:00 ET QUEUED. Wed Shorts complete: 8 per platform. Only the 17:00 long-form (v2 rebuild) remains.
- **Next up (Fable's ranked list `research/2026-11-25/ideas.md`):** Javice fake users, Tipton lottery rig, Tucker payday loans, BitConnect, credit-card minimum, 1% fee, OneCoin; **long-form Wed = Do Kwon / Terra-Luna** (Owen voice); **lottery Part 2** (promised on TikTok).
- **Visual v2 is LIVE** (brand/engine-v2/READY, prototype research/visual-v2/prototype/video.mp4 sent to the user 2026-11-25). Fable's improvement list: tighter wide-shot recap, storyteller can't yet walk *into* the world, watch for pill/caption collisions on tight zooms, use CRF 19–20.
- **User verdict on v2 sample: "actually awesome".** Voice: user picked **am_liam, plain** (energy mode tried, then dropped). 21 voice samples in research/voice-plain/.
- **Pending with the user:** nothing blocking. Optional: TikTok username change to @badmath.tv; paste the new bios.
- Long-form "The Impossible Number That Exposed Madoff" (videos/2026-11-25-impossible-number) was built earlier; check whether it was ever posted before reusing the slot.

## 8. How to resume in a NEW session (successor protocol)
1. Open a new Claude Code session on repo `landowncj-byte/BadMathYt` in environment `BadMathYt` (same model family). First message: **"Read HANDOFF.md and take over Bad Math as the successor session."**
2. The new session reads §2 files, `git log -20`, and `archive/LATEST.md`.
3. **Move the scheduled tasks** to the new session: create the two tasks again with the same cron + prompts (copy from `archive/triggers.md`) bound to the new session, then disable the old ones (`update_trigger enabled=false`). Verify with `list_triggers`.
4. Re-check connectors: `list_accounts` (PostFast), ElevenLabs `account_get_usage`.
5. Continue §7 "Current state".
The old session can also do steps 1–4 itself with `create_session` + `send_message` when its context is near exhaustion (see §10).

## 9. Backups of the conversation
- `archive/conversation-<date>.md` — readable export of every user message and assistant reply (no tool noise).
- `archive/transcript-<date>.jsonl.gz` — full raw transcript (tokens redacted).
- `archive/LATEST.md` — short "what happened since the last handoff update".
- `archive/triggers.md` — exact cron + prompt of every scheduled task (for re-creating them).
Regenerate with `python3 archive/export.py` (writes all of the above).

## 10. Keeping this file alive (rules for every session)
- After any new user rule or big decision: append to `CHANNEL.md` log AND update the relevant section here.
- End of every work block / nightly build: update §7, run `python3 archive/export.py`, commit + push.
- **Context budget:** each time this session's context is auto-compacted, run the export immediately. After the **3rd compaction** (or if summaries start losing detail), start a successor: `create_session` on this repo/environment with prompt "Read HANDOFF.md and take over Bad Math as the successor session", send it anything not yet in the files, move the scheduled tasks to it (§8 step 3), and tell the user the new session link.
