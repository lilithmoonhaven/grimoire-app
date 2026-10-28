# What this is: Ritual Spell Generator — standalone free-gift prototype (PRIVATE, NOT PUBLISHED)
# Built: 2026-10-28, from the Canva app (design DAHY3PbwAsU) — same dropdowns, same ritual text
# and assembly, same dark gold-on-black grimoire look, same music/voice optional controls.
# No payment, no signup, no tracking, no Canva, no server. No QR code in this job (QR is a
# separate later step, after a public link exists, and the old spell-book QR idea is NOT used).

## How to test it privately (no public link yet)
Copy this whole folder as-is (index.html + style.css + app.js + blocks/) and open index.html
in a browser, or serve it with a local static server. The voice clips are referenced by
relative path blocks/<voice-folder>/<clip>.mp3, so the blocks/ folder MUST travel with the page.
Music streams from the public GitHub raw URLs below — no local music files are needed.

## Intended public address (NOT created, NOT published, no domain bought)
When Krystal approves hosting, this is built to live at a GitHub Pages address under her
business name, in this format:
  https://lilithmoonhaven.github.io/<repo-name>/
Example only (repo name not yet decided/created): https://lilithmoonhaven.github.io/grimoire-app/
Do not share that example as a working link until the repo + Pages site are actually created
and Krystal approves them. That hosting step is separate from this prototype job.

## Voices — the right voices, recorded (not browser voices)
- LIVE now: Warm Female (voice-a-female-warm, Sample 1) and Gentle Male (voice-b-male-reassuring, Sample 2)
- STRUCTURED, clips coming soon (same clip naming, different folder, disabled in the dropdown until
  their recordings are copied in): Soothing Female (voice-c-female-soothing, Sample 3),
  Sultry Female (voice-d-female-sultry, Sample 4), Calming Deep Male (voice-e-male-calming-deep, Sample 5b),
  Deep British Male (voice-f-male-deep-british, Sample 5c).
- Narration uses these recorded MP3 blocks only. Browser speechSynthesis is NOT used as the main voice.
- 153 clips per live voice (152 recorded in the earlier batch + fixed-tools-substitute, recorded
  2026-10-28 to fill a gap in that batch).

## Music — the right music
The 6 new GitHub tracks, auto-play on track change, Heartbeat at full volume (1.0) regardless
of the Music volume slider, other tracks follow the slider:
- Heartbeat (v3 louder) — https://raw.githubusercontent.com/lilithmoonhaven/grimoire-audio/main/new-cleaned/heartbeat.mp3
- Birds, Flute, Windchimes, Gentle Subtle Guitar, Tibetan Singing Bowls — same new-cleaned/ folder.

## What is deliberately NOT spoken (honest limitation, shown on the page)
- Atmosphere step 2: displayed in text from the Make It Personal template, not spoken, because it
  is personalised (atmosphere / energy / element / minutes / keywords / notes) and has no
  pre-recorded clip. The voice skips step 2 and continues with step 3.
- Free-typed personal focus text: displayed in text ("Personal focus: ...") and appended to
  step 5 in text, not spoken. If a personal focus is entered, the default focus sentence clip
  is also skipped (it would contradict the personal focus).
- The intention / moon / method names themselves and the meta line have no spoken clips, so the
  voice reads the title, headings, tools, steps, affirmation, reflection and disclaimers — not
  the meta line. Reading scope "Ritual only" reads only the steps (still skipping step 2).

## Differences from the Canva app, stated honestly
- Voice pitch is implemented as playback speed (0.8–1.2) for recorded audio. True pitch-shifting
  of MP3 clips without processing is not available, so pitch and speed move together here,
  unlike the Canva browser voices where pitch was a separate speech setting.
- Music progress shows the actual 60-second loop file's time, not the Canva draft's "10-minute
  session" display (which was a cosmetic UI label over a 60-second loop).
- Ritual lengths: this prototype builds the standard 6-step ritual only. The Canva code also
  builds short (3-step) and extended (7-step) variants; those are not in this prototype yet.
- No QR code, no payment, no signup, no analytics in this prototype.

## Before a public GitHub Pages link can be made
1. Krystal approves this prototype (text, look, music, voices).
2. A public repo under lilithmoonhaven is created and GitHub Pages enabled (separate job, needs
   Krystal's go-ahead; nothing is published in this job).
3. This whole folder — index.html, style.css, app.js, and blocks/ (all voice folders, ~7.6 MB
   for 2 voices, more once the other 4 voices are added) — is uploaded to that repo.
4. QR code is built AFTER that public link exists, as a separate step.
