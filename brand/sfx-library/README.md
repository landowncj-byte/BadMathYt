# CC0 sound-effects library

A reusable set of public-domain (CC0 1.0) sound effects for the channel's videos. Every file here was
pulled from Openverse with a CC0-only filter and checked automatically (see "How it was built").

## Categories

| Folder | What's in it | Files |
|---|---|---|
| `impacts/` | Deep booms, cinematic hits, sub drops, thuds, punches | 10 |
| `transitions/` | Whooshes, swooshes, swipes, risers, reverse cymbals, tape stops, record scratches, rewinds | 15 |
| `money/` | Cash register, coin drops, bill counters, slot wins, ka-ching | 8 |
| `ui_pop/` | Pops, clicks, dings, bells, notification chimes, typewriter, keyboard typing, camera shutter and flash | 18 |
| `reactions/` | Crowd gasp, ooh, laugh, applause, cheer, boo (crowd only, no individual voices) | 8 |
| `comedy/` | Sad trombone, crickets, slide whistle, boing, clown horn, airhorn, rimshot, record stop, wrong buzzer, kazoo | 20 |
| `tension/` | Heartbeat, clock ticking, suspense drone, alarm, siren, glitch, static, distorted hit | 16 |
| `success_fail/` | Success chime, level-up, fail buzzer, game over | 8 |
| `objects/` | Paper slam, rubber stamp, gavel, cell door, glass shatter, small explosion, door slam, footsteps | 16 |
| `music/` | Dramatic and comedic stings (2-30 s); jazz, lo-fi, tense and upbeat beds (30 s and up) | 12 |

Total: **131 files, about 19 MB**. Known gaps (no CC0 match passed the filters): `transitions/tape_stop`
(1 of 2), `money/slot_win` (0 of 2), `money/ka_ching` (0 of 2), `reactions/crowd_ooh` (1 of 2),
`reactions/boo` (1 of 2), `reactions/crowd_gasp` (0 of 2). Music is the thinnest area: only a few CC0
beds came back, so the beds are the first candidates to replace with commissioned or other-licensed
music if the channel needs more variety.

## Files

- `<category>/<name>.mp3` - the sound. Names are snake_case with a number: `impacts/deep_boom_1.mp3`.
  One-shots have leading silence trimmed (ffmpeg `silenceremove`, -45 dB threshold). Stings and beds are
  not trimmed.
- `manifest.json` - one entry per file: `file`, `category`, `name`, `duration_s`, `peak_db`,
  `description` (what it sounds like and when to use it), `title`, `creator`, `license`,
  `license_version`, `source_url` (the Freesound page).
- `CREDITS.md` - the attribution table (CC0 does not require credit; it is kept for source tracking).
- `build_library.py` - rebuilds the whole library from Openverse. Run `python3 build_library.py`
  (needs `curl`, `ffmpeg`, `ffprobe`).

## Using a sound in a video

1. Pick a category and a name from the table above, or search `manifest.json` by `description`.
2. Check `peak_db` and `duration_s` before dropping it into the timeline.
3. Copy the file into the video's `sfx/` folder.
4. Copy the matching rows from `CREDITS.md` into that video's `sfx/CREDITS.md`, so each video carries
   its own sources. Credit is not required for CC0, but the channel keeps it as a habit.

## Licensing rules

- Only CC0 1.0 (public domain) is allowed. Do not add CC-BY or any other license here, and do not add
  copyrighted meme originals, even if they are easy to find.
- If you add a file by hand, record its source in `manifest.json` and `CREDITS.md` and confirm the license
  on the source page first.

## How it was built

`build_library.py` queries `https://api.openverse.org/v1/audio/` with `license=cc0`, sends
`User-Agent: bad-math-video/1.0`, and retries 3 times on HTTP 500/503 with a 3 s pause. For each item it
tries a few search phrasings and keeps up to two results that pass these checks:

- CC0 license and an `.mp3` URL.
- Duration within the range for the item's kind: one-shots 0.2-6 s, reactions 0.5-8 s, stingers 2-30 s,
  beds 30-240 s.
- Title and tags do not suggest spoken voice (except crowd reactions). A title denylist also drops
  clips that are spoken or announced.
- Peak level at or above -20 dB (`ffmpeg volumedetect`).
- Not a duplicate of a file already kept.

These checks are automatic. Nobody has listened to every file, so audition each one before using it
in a video. Treat `description` as the intended use, not a guarantee of the sound.
