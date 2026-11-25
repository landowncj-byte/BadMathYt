# Scheduled tasks (copy exactly when moving to a successor session — HANDOFF.md §8 step 3)
Both fire into the session named in HANDOFF.md. To move: create_trigger with the same name, cron and prompt (persist into the new session), then update_trigger enabled=false on the old IDs.

## 1. Bad Math daily build
- id (current): trig_01AxWKDeui5AqNP2bAbWCAk4
- cron: `CRON_TZ=America/New_York 13 1 * * *`
- prompt: see `archive/trigger-daily-build.txt`

## 2. Bad Math comment sweep
- id (current): trig_01Mba35oBybPbDuPUXyWNyCo
- cron: `CRON_TZ=America/New_York 37 10,14,18,22 * * *`
- prompt: see `archive/trigger-comment-sweep.txt`

## Disabled
- trig_01HsuaDHY5sosjY8XzUaTgAT "Add music to the Salad Oil Short" (one-shot, paid ElevenLabs music) — disabled 2026-11-25: conflicts with the free-music rule; video already posted.

Note: scheduled tasks may expire ~30 days after creation. Daily build created 2026-11-24 → renew before ~2026-12-24.
