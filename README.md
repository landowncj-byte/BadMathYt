# Bad Math: YouTube Shorts project

The working files for the **Bad Math** channel: the math behind money's wildest hypotheticals (**What If**) and biggest documented cons (**Decoded**).

## What's here
| Path | What |
|---|---|
| `CHANNEL.md` | Channel decisions, audience, rules, dated decision log |
| `STYLE.md` | Paste-anywhere style guide (voice, visuals, retention, CTA, honesty rules) |
| `skills-youtube-automation.md` | The YouTube automation playbook this project follows |
| `brand/` | Storyteller character (`storyteller.js`, `CHARACTER.md`, `character-sheet.png`), profile pictures, `PROFILE.md` |
| `videos/<date>-<slug>/` | One folder per video: `video.mp4`, `captions.srt`, `socials.md`, `upload.json`, `script.md`, `sources.md`, `credits.md`, `qa.md`, `voice/`, `sfx/`, `build/` |
| `voice-previews/` | The three ElevenLabs Voice Design auditions (B was picked) |

## Videos
| Folder | Series | Voice | Status |
|---|---|---|---|
| `2026-11-24-dollar-a-second` | What If | ElevenLabs "Bad Math Narrator" | done (no storyteller) |
| `2026-11-24-dollar-a-second-v2` | What If (3D) | ElevenLabs | done (no storyteller) |
| `2026-11-24-salad-oil-swindle` | Decoded | ElevenLabs + ElevenLabs SFX | done with storyteller; custom music still to add |
| `2026-11-24-ponzi` | Decoded | Kokoro (free) + CC0 Freesound | done with storyteller |
| `2026-11-24-two-buttons` | What If | Kokoro (free) + CC0 Freesound | done with storyteller |

## Rebuild a video
Each `build/` holds a deterministic `scene.html` (canvas animation; every frame is a function of time) and `render.cjs` (Playwright → ffmpeg).
```bash
cd videos/<folder>/build
npm i @fontsource/anton @fontsource/inter @fontsource/jetbrains-mono @fontsource/special-elite @fontsource/rye
node render.cjs stills 0,5,10 /tmp/stills        # check frames
node render.cjs video part.mp4 30 0 <frames>      # render (frames = seconds × 30)
cd .. && python3 build/mix.py                     # audio mix → build/mix.wav (needs voice/ + sfx/)
ffmpeg -i build/part.mp4 -i build/mix.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k video.mp4
```
Scenes load the shared character from `../../../brand/storyteller.js`. The Salad Oil mix re-creates `voice/narration_edit.wav` from `voice/narration.mp3` + `voice/cutmap.json`.

Free voice: Kokoro (`kokoro-onnx`, voice `am_michael`, speed 1.12). Captions: `faster-whisper small.en` word timestamps. Sounds: CC0 Freesound via the Openverse API; credits in each `sfx/CREDITS.md`.
