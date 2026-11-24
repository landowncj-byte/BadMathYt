# CHANNEL.md — Bad Math

```yaml
channel: "Bad Math — the math behind the world's biggest money cons and its wildest money hypotheticals."
series:
  what_if: "Economics thought experiments. Curious, playful. Bright cinematic AI scenes. Accent Highlighter #FFD60A."
  decoded: "How real, documented scams worked. Tense, investigative, dry humor. Dark case-file visuals. Accent Loss Red #FF3B30."
audience: >
  US, 18-28, mostly young men with first jobs and first paychecks, scrolling Shorts at night.
  Want: to feel smarter than the people around them, see how the money game actually works, spot a con before it gets them.
  Tired of: rich-guy gurus, "stop buying lattes" lectures, stock picks, slow intros, obvious AI slop.
goal: "Growth first, then ad revenue."
monetization:
  own_app: "Tape — linked in the pinned comment + description, labeled 'my app'. Never pitched by the narrator."
  affiliate: "One disclosed affiliate after 1K subs. No trading or crypto affiliates."
formats:
  phase_1: {months: "1-3", type: "Shorts only", length: "20-45 s (50-115 words @ ~2.5 words/s)", size: "1080x1920", cadence: "1-2/day, alternating What If / Decoded"}
  phase_2: {type: "+1 long-form/week", length: "8-12 min (1,200-1,850 words)", size: "1920x1080", source: "expand the best-performing Shorts"}
narrator:
  engine: "ElevenLabs — one custom voice made with Voice Design (not a library voice)"
  identity: "No name. Never claims to be an expert or gives advice. Not the user's voice, no face, no avatar."
  emotion_range: "What If: curious, amused, wide-eyed. Decoded: low, controlled, dry; tension builds, never shouts."
tone: "Educational at heart. What If = curious + playful. Decoded = tense + investigative + dry humor. Both end on a punchy one-liner."
look:
  references_for_mechanisms_only:
    - "What If (Underknown): hypothetical-world visuals"
    - "MagnatesMedia: faceless business storytelling"
    - "Coffeezilla: investigative case-file graphics for Decoded (graphics only, not his on-camera format)"
  palette:
    ink: "#0B0F14"          # background
    highlighter: "#FFD60A"  # What If accent
    loss_red: "#FF3B30"     # Decoded accent
    money_green: "#00D26A"  # numbers
    paper_white: "#F5F3EE"  # text
  fonts: {thumbnails_hooks: "Anton", captions: "Inter", numbers_math: "JetBrains Mono"}  # all Google Fonts (OFL)
  art:
    what_if: "Bright, cinematic AI scenes"
    decoded: "Dark case-file: documents, timelines, red string"
hard_nos:
  - "Personal financial advice ('you should buy/invest'), guaranteed returns, stock or crypto picks"
  - "An AI host/avatar presenting itself as a finance expert"
  - "Decoded topics that aren't documented or court-proven; anything not yet ruled on is 'alleged'"
  - "What If speculation presented as fact; always mark which parts are speculation"
  - "Numbers not checked against a real source"
  - "Templated scripts with only names swapped; other creators' clips"
  - "The narrator pitching Tape"
  - "Strong profanity in titles/thumbnails; thumbnail promises the video doesn't deliver"
cta: "One line tied to the payoff, e.g. follow for the next case / comment your answer. Tape lives only in pinned comment + description."
disclaimer: "AI-narrated. Educational entertainment, not financial advice. What If scenarios are hypothetical; Decoded cases are based on public records (allegations labeled)."
disclosures:
  - "YouTube altered/synthetic content setting: ON for every upload"
  - "About section says 'AI-narrated'"
  - "Affiliate links disclosed in the description"
tools:
  paid_allowed: true   # ElevenLabs only
  voice: "ElevenLabs Starter ($6/mo, ~30 min audio) now; Creator ($22/mo) when long-form starts"
  scripts_factcheck: "Claude / ChatGPT"
  images: "Ideogram / ChatGPT images (commercial use OK) — no free AI video generators"
  edit: "DaVinci Resolve or CapCut (no CapCut music)"
  music: "YouTube Audio Library"
  thumbnails: "Canva"
  analytics: "YouTube Studio + vidIQ free"
  api_keys: []  # none provided yet (YouTube Data API not set up)
language: "en-US"
decisions:
  - "2026-11-24: Back to 3 Shorts + 1 long-form EVERY day. ElevenLabs Creator credits: Shorts get the paid voice first; long-forms use it while credits last, then Kokoro."
  - "2026-11-24: Budget plan: ElevenLabs Creator (paid voice only; ~121k credits/month — Shorts get the paid voice first, long-forms only if credits remain). Cadence = 3 Shorts daily + long-form on Tuesdays and Fridays (ET)."
  - "2026-11-24: Paid voice only (ElevenLabs Bad Math Narrator). Sound effects and music are always free CC0 (Freesound/Openverse), never ElevenLabs credits."
  - "2026-11-24: Standing authorization: build one video at a time and auto-publish each via PostFast as soon as it passes QA — no per-post approval. Revocable with \"stop auto-posting\"."
  - "2026-11-24: Cadence = 3 unique Shorts + 1 unique long-form every day (US Eastern: Shorts 12/5/9 PM, long-form 6 PM). Built overnight per PRODUCTION.md, queued in PostFast, each post approved by the user. TikTok @color.me.saved is the Bad Math TikTok until renamed. No repeats (ideas.md)."
  - "2026-11-24: Salad Oil, Ponzi and Two Buttons Shorts were posted by the user (manually). Posting from now on goes through PostFast with per-post approval; Bad Math TikTok/Instagram still to be connected (PostFast TikTok = Color Me Saved, not Bad Math)."
  - "2026-11-24: Storyteller saved as brand/storyteller.js and used in every video; on-screen comment bubble after the payoff + tap-to-follow button in the last 2 s. Display name Bad Math; pfp brand/pfp-ink.png."
  - "2026-11-24: Instagram/TikTok are purely for views and content: no Tape mention, no link-in-bio lines in socials."
  - "2026-11-24: Add a small original storyteller character (gold-coin head, red bowtie) bottom-right, kept left of the platform button rail."
  - "2026-11-24: Decoded #2 built: Charles Ponzi (1920). Free stack: Kokoro voice (am_michael), CC0 Freesound SFX/music via Openverse, faster-whisper captions. Not uploaded."
  - "2026-11-24: Decoded #1 built: The Great Salad Oil Swindle (1963). Real ElevenLabs SFX instead of synthesized sounds; custom ElevenLabs music scheduled after the Nov 29 credit reset. Not uploaded."
  - "2026-11-24: Short #1 redone in 3D (v2) with the video-gen-skills plugin (zach-d-films engine + unscrollable rules). Same voice take. Not uploaded."
  - "2026-11-24: Narrator voice picked = Voice Design preview B, saved as 'Bad Math Narrator' (voice_id tEcWY4Gir18XAcYuihhc)."
  - "2026-11-24: Short #1 built: 'What If You Earned $1 Every Second?' (videos/2026-11-24-dollar-a-second). Not uploaded."
  - "2026-11-24: Channel set up via intake. Name Bad Math, two series (What If / Decoded), Shorts-only for months 1-3, then 1 long-form/week from top Shorts."
  - "2026-11-24: Narrator = one custom ElevenLabs Voice Design voice, nameless, 100% faceless, 100% AI. Synthetic disclosure always on."
  - "2026-11-24: Monetization = growth first, then ads; Tape ('my app') in pinned comment + description; one disclosed non-trading/non-crypto affiliate after 1K subs."
```

## Open items to verify (flagged at setup)
- **Voice budget:** 2 Shorts/day × ~40 s × 30 days ≈ 40 min/month, more than Starter's ~30 min, before retakes. At 1/day (~20 min) it fits. Either average ~1.3/day on Starter or move to Creator earlier.
- **YPP threshold:** the long-form path is 1,000 subs + **4,000** public watch hours in 12 months (or 10M Shorts views in 90 days), not 8,000. Check YouTube's current YPP page before planning around it.
- **Links on Shorts:** links in Shorts descriptions and comments aren't clickable (YouTube changed this in 2023). Put Tape in the channel header/About links and the long-form descriptions too. Re-check the current behavior.
- **Image licenses:** confirm the Ideogram plan's commercial terms (and whether free-plan images are public), and log each image in `credits.md`.
