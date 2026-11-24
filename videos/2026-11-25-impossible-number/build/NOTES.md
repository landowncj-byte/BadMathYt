# NOTES
- Built against the real `voice/timeline.json` + `mouth.json` (457.78 s narration, DUR = 472.78 s). `timeline.stub.json` kept as fallback only.
- `brand/storyteller.js` now takes `pos`, `followLabel`, `followAt`, `followScale`; verified the two-buttons still at t=41 is byte-identical before/after.
- Not verified: full-length render, motion/transition feel (only stills checked), audio. `render_all.sh` is untested end to end (parts + concat logic only).
- Shapes choices to review: P01 ticket shows only the three facts from the script (date, qty, underlying) plus generic labels ("TRADE TICKET", "CONFIRMATION"); P02 board header text "ENTIRE MARKET · PROCTER & GAMBLE CALLS · APR 16, 1991" is illustrative; P06 folders use years from DIRECTION (1920/1963/2008); end-card rectangles are 800×450 at (120,310) and a r=170 circle at (1400,535), adjust to the final YouTube end-screen layout.
- P57 follow button sits at (1560,640) and the bubble at (1460,560): both lie partly over the right side of the content area (x>1360) by design; they never show together.
- Storyteller is drawn in the end card (waving, default pos). The follow button may appear ~0.3 s before the paragraph ends over P56's chart panel edge (follow starts 0.3 s before the word "Subscribe").
- ch1-ch3 are placeholders (one card per chapter). Chapter sepia look: use scene opt `{film:true}`.
- The HUD progress bar is across the whole DUR including the end card.
- Caption keyword colors are a small word list in engine.js (`CAP_GREEN/CAP_RED/CAP_YEL`); tweak there.
