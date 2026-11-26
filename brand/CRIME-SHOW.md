# CRIME-SHOW PASS — owner direction 2026-11-26 05:30 UTC (RULES 112)

Owner: "Bad Math YT is a storytime, narrative series channel… make the images feel more connected to the script… the diagrams and the images feel attached to it… we feel like we can see the person, like we can characterize the bad guy in our mind instead of just a gray outline. If he's a scammer, show his picture multiple times throughout the video… like crime shows do it, they really go in to keep people hooked."

Style stays RULES 111 (engine-v2 explainer, gold coin storyteller, Madoff long-form look). This pass changes WHAT is on screen.

## 1. The bad guy is a CHARACTER, not a gray outline (Decoded)
- **Real licensed photo first** (brand/photos/VERIFIED.md). Retry `python3 brand/tools/photos.py "<name>"` and `brand/tools/stock.py` for anyone listed as "no photo" (court/DOJ/FBI/booking photos are often public domain). Check by eye that it is the right person; add the row to VERIFIED.md.
- **Repeat him**: the suspect card appears at least **5 times** in a Decoded Short (hook/intro, the pitch, the trick, the catch, the verdict) and must be on screen ~25–35% of the runtime in total. Crime-show treatments, a different one each time:
  1. INTRO card — photo in a case-file frame, NAME + one-line label ("THE LOTTERY IT GUY"), red string pinned to it.
  2. The PITCH — photo beside the claim he made (quote card "I'm a Saudi prince").
  3. The TRICK — photo small in the corner of the diagram (picture-in-picture "he did this"), arrow from him to the step.
  4. EVIDENCE BOARD — photo pinned on the cork board, string to receipts / bottles / tickets / victims.
  5. The CATCH — photo with a red ✕ or "WANTED/ARRESTED" stamp, or mugshot height chart.
  6. VERDICT — photo + "SENTENCED: 10 YEARS" stamp, bars sliding over.
  Slow Ken-Burns push into his face on the big reveal lines (true-crime "zoom on the eyes").
- **No licensed photo** → an ILLUSTRATION character card that is NOT gray: a coloured, distinctive cartoon portrait built from facts (clothes/props of his role: lottery IT badge + hoodie, startup founder hoodie + pitch deck, payday-loan suit + race car), the same design every time, labelled small "ILLUSTRATION". Give him a nickname and use it consistently ("the IT guy", "the prince").
- The VICTIMS get faces too (rich collectors, bank, players) as simple consistent character cards, so the viewer knows who is who.

## 2. Picture = the spoken words (every line)
- Make a line-by-line A/V table first (`build/AV.md`): each script line → the exact visual + the trigger word it lands on. Nothing generic ("money icon") when the line names a specific thing (a 1982 Pétrus bottle, a $14.3 million jackpot ticket, a fake diplomatic plate).
- Diagrams are ATTACHED to the story: the diagram uses the story's own objects and the bad guy's photo (not abstract boxes). Step 1 → 2 → 3 cards show HIS actions.
- Real places/objects from licensed stock (courthouse, lottery terminal, wine cellar) in paper photo frames.
- Everyday comparisons drawn as the real thing (a car, rent, a year of groceries).

## 3. Crime-show hooks & structure (storytime)
- Cold open on the most dramatic moment + his face (in medias res), then "Let's go back."
- Timeline stamps / date cards ("2005 · IOWA"), location cards, "CASE FILE Nº" chapter labels (THE PITCH · THE TRICK · THE CATCH · THE SENTENCE).
- Re-hook every ~15–20 s with a reveal (new evidence, a twist) — the beat label changes.
- Evidence-board callback before the verdict (everything we learned, pinned, string pulls tight).
- Sound: typewriter/camera-shutter on photo reveals, heartbeat/low drone under the catch, stamp slam on the verdict (CC0 library brand/sfx-library).

## 4. What If series
Same "connected" rule: the hypothetical's subject is a recurring character (YOU as a consistent cartoon player/contestant/saver) and the objects are the real thing (actual briefcases opening, actual penny piles).

## 5. Checks before render (keyframe sheet)
- Count the suspect-card appearances (≥ 5 Decoded) and list their timestamps in qa.md.
- Mute test: with sound off, can you tell who the bad guy is, what he did, and what happened to him?
- Every line in AV.md has a matching frame on the contact sheet.
