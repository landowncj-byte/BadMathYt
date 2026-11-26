# QA: Your phone in hours of work (What If) — scripts + Owen voice, Opus writer 2026-11-26
Research: research/2026-11-28/phone-hours-of-work/research.md. Beats/AV notes: voice/beats-v3.md in each cut. Voice: Owen 83MXTnoLsr3jX4Sl4gL4, eleven_v4, one take per cut (jobs in voice/owen_jobs.json).

## Durations (real, after voicing)
| cut | hook | words | narration s | gate |
|---|---|---|---|---|
| youtube | Your phone costs you a hundred and forty-four hours of work. | 200 | 61.90 | over the brief's 61.0 s floor; script_gate real-timing check says 61.9 s vs its 62 s floor (0.1 s short) — video = narration + 0.4 s tail ≈ 62.3 s. Not re-voiced (brief: re-voice only if under 61 s). Builder: keep the full 0.4 s tail + loop hold. |
| tiktok | The phone isn't the expensive part. The plan is. | 203 | 64.65 | PASS (voiced timings) |
| ig | You worked three and a half damn weeks for that phone. | 205 | 66.71 | PASS (voiced timings) |

## Facts used
ASSUMES (on screen): median hourly wage $24.51 (BLS OEWS May 2025, all occupations, ✔1 — said as "the government's own labor numbers"); hypothetical $1,000 phone; hypothetical $70/month plan for 36 months; no trade-in, insurance or tax on the phone; wages before tax; second line at an ASSUMED 20% tax (not a sourced rate). Math (research Python, re-checked): phone $1,000 ÷ 24.51 = 40.8 h ("about forty-one hours" = a 40-h work week + about one more hour... said as "a full work week, and then some"); plan $70 × 36 = $2,520 = 102.8 h ("about a hundred and three hours"); plan is 2.52× the phone ("two and a half times"); total $3,520 = 143.6 h ("about a hundred and forty-four"); ÷ 8 = 18 work days; ÷ 40 = 3.6 work weeks ("about three and a half work weeks"); after assumed 20% tax: $19.61/h → 179.5 h = 22.4 work days ("about twenty-two work days" ≈ a month of work days, ~21.7 per month); all-in $3,520 ÷ 36 = $97.78/month ("almost a hundred dollars a month").

## Cautions applied
No brand/model/carrier names; no "don't buy a phone" / "phones are a waste" (no advice, no moral); prices are hypothetical, never "average"; never say the median wage is what YOU earn ("say you earn the middle wage"); tax rate always "if a fifth goes to taxes" = assumption. $24.51 said "twenty-four fifty-one"; BLS said as "the government's own labor numbers".

## Villain / character photo plan
What If — no villain photo. Recurring character = YOU (the same cartoon worker in the house style, holding a generic, logo-free phone), reacting each beat; a time-clock punch card and a work-week calendar are the objects. Everything illustrative labelled ILLUSTRATION; ASSUMES card on screen with the wage, prices and the 20% tax.

## CRIME-SHOW BUILD STATUS
VOICED READY

RENDERED READY (night builder 2026-11-26, engine v2 + videos/_lib/cs.js screen-stage; beds exactly as assigned; mix v2 (quiet bed); TikTok mixed with BM2_BED_DB=-12):
RENDERED READY: youtube (2026-12-04-phone-hours/video.mp4) 62.30s 23.6MB, -14.2 LUFS
RENDERED READY: tiktok (2026-12-04-phone-hours/tiktok/video.mp4) 65.07s 24.6MB, -14.1 LUFS
RENDERED READY: ig (2026-12-04-phone-hours/ig/video.mp4) 67.10s 25.0MB, -14.1 LUFS
Checks: contact sheets of all 3 cuts looked at on real frames (stills reviewed per scene before render; fixed: card line overlap, hook text vs next scene, number-word timing). Nothing in the caption band; numbers match the script ($24.51/hr, $1,000, 41 HOURS, $70 x 36, $2,520, 103 HOURS, $3,520, 144 HOURS = 18 WORK DAYS, 22 after the ASSUMED 20% tax). No brand/model: generic logo-free phone. YOU = recurring cartoon worker (pip bottom-left, 100%). All visuals are ILLUSTRATION (no real photos). Bed electronic_bed_3; TikTok BM2_BED_DB=-12.
