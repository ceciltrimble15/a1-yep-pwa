# Illustrated Mirror / FINISHER browser acceptance — November 7, 2026

**Status: PASS WITH FIXES — automated Chromium acceptance passes; physical-device and facilitated learner sign-off remain open.** No production release or live pilot approval is implied.

## Exact version and evidence

- PR: https://github.com/ceciltrimble15/a1-yep-pwa/pull/13 (remains an open draft, stacked on PR #12).
- Starting application head: `56a4b75ca191a447490cc3ac73ae088254662b97`.
- Tested commit: `5a9c83a9be7a5e3261fede5e2a0c3a8e38c5be68` on the existing `codex/yep-pilot-final-visual-cohort-2026-11-03` branch. This commit changes tests and the CI branch filter only; application source, learning decisions and privacy behavior are unchanged from the starting head.
- Successful GitHub Actions run: https://github.com/ceciltrimble15/a1-yep-pwa/actions/runs/42398364927 . All four jobs completed successfully on November 7, 2026, around 12:52 PM America/New_York (17:52 UTC).
- Browser: Playwright 1.62.1, Chromium / Chrome Headless Shell `151.0.7922.34`, GitHub-hosted Ubuntu, Node 20.20.2.
- Actual application build served by Vite preview on `http://127.0.0.1:5182`; resilience checks used port 5183. These were browser interactions with the built app, not component-renderer substitutes or claims about a hosted deployment.
- Raw per-flow results and resilience measurements are retained in [qa-2026-11-07](./qa-2026-11-07/). CI screenshots and JSON are also in the four `yep-browser-evidence-*` artifacts on the run; current artifact expiry is February 5, 2027.

## Passing matrix: 16 actual browser flows

| Browser viewport | Input | Ages 7–10 / explorer | Ages 11–13 / builder | Ages 14–17 / leader | Ages 18–24 / yaep |
| --- | --- | --- | --- | --- | --- |
| Desktop 1366 × 900 | Mouse plus keyboard scene activation | PASS | PASS | PASS | PASS |
| Phone 390 × 844 | Emulated touch plus keyboard scene activation | PASS | PASS | PASS | PASS |
| Tablet portrait 768 × 1024 | Emulated touch plus keyboard scene activation | PASS | PASS | PASS | PASS |
| Tablet landscape 1024 × 768 | Emulated touch plus keyboard scene activation | PASS | PASS | PASS | PASS |

Each flow entered the selected developmental pathway with fictional data and completed Daily Quest, S.T.E.M.Sin, a four-question Mirror and a chosen age-appropriate FINISHER checklist. The suite verifies:

- Four tappable stages in the illustrated saved Mirror and selected FINISHER mission, exactly one pressed state, matching active SVG milestone and stage-specific text. Region pathway matches the selected age mode. All eight stage targets in each flow are at least 44 × 44 CSS pixels. Enter and Space activate the native scene buttons.
- Mirror result survives refresh; Reflect Again → View Saved Mirror Results returns to the same saved result without replacing it.
- A selected mission and first completed step survive refresh; Home → FINISHER Mission reopens the chosen mission. Completion remains disabled while steps are incomplete, then becomes available when all steps are marked. Marking a checklist complete does not invent a submitted reflection or independent evidence of real-world activity.
- Daily Quest unfinished draft refresh, choice-only save, Home/lesson reopening and tab-close/reopen recovery; S.T.E.M.Sin prediction, reveal, save and reload remain functional.
- No uncaught page errors, broken image elements, page-level horizontal overflow or non-GET/HEAD browser submission requests during the exercised flows. Youth voice-input controls remain absent in the three minor pathways.

Representative CI screenshots of Foundation phone and Y.A.E.P. tablet landscape Mirror/FINISHER screens were visually inspected. This is a scoped layout check, not whole-app accessibility certification or learner usability evidence. Scene stage selection is temporary UI state and may reset on reopening; saved answers, selected mission and checklist progress are the persisted learning work.

## Additional passing browser checks

The desktop CI job ran `npm run test:browser:resilience` successfully:

- Screen audio play, pause, resume, replay, stop, speed change and navigation cancellation; lesson and vocabulary controls; error fallback.
- New scene audio: no autoplay, touch play/stop/replay, selected-stage narration content, cancellation on stage change and navigation, speech error with retained readable stage text. Deterministic speech API double only.
- Reduced-motion emulation disables scene SVG animations. Unsupported speech leaves the scene text and stage interactions usable.
- Storage-quota/blocked-write warning appears. Selected mission/checklist recovery also works when chosen before taking a Mirror.
- Warm-cache offline reload and Home navigation. First visit and cache acquisition still need a connection.
- Existing scoped Home card gradient copy/action contrast checks: minimum measured ratio 4.78:1 across four viewports.

**Audible playback is NOT VERIFIED.** The actual headless Chromium speech API returned “Audio could not play” and the readable fallback was observed. The API double proves control wiring only; it does not prove speaker output, installed voices, latency or offline voice availability. Scene narration was tested with a double, not heard on a physical device.

## Reproduced failures and corrections

| Failure | Correction | Evidence after correction |
| --- | --- | --- |
| `test:tablet` crashed because the existing speech fixture lacked `getVoices()` used by the current guide | Added voice enumeration and speech-chunk completion to the fixture | Local and all four CI jobs pass the tablet regression suite |
| Existing tests targeted retired labels: Choose This Action, Finish My Practice Checklist, Show My Steps and Hear it | Updated tests to current mission, next-step, lesson/example controls; preserved the established UI | Browser and component regressions pass using actual current labels |
| Workflow branch filters omitted PR #13's branch/base, so its draft was not exercising this matrix | Added the existing draft head branch to push triggers | Actual four-job GitHub Actions run completed successfully |
| Local Chromium could not start (`socket() failed: Operation not permitted`) | Used the existing GitHub-hosted CI environment for real browser execution | CI logs and downloaded raw artifacts verify 16 passes |

No reproducible application runtime defect was found in this scoped run, so no application behavior or settled visual decisions were changed. No claim is made that every possible interaction or failure condition has been tested. Build, REV3 regressions and tablet component regressions also passed; the latter are not physical tablet tests.

## Remaining gates and limits

| Gate | Current evidence | Required next evidence |
| --- | --- | --- |
| Both physical tablets | NOT RUN | Record device, OS, browser, exact preview origin/build; exercise touch, rotations, reopen, install/offline and speaker output with fictional personas |
| Safari / iPadOS | NOT RUN; Chromium touch emulation is not Safari | Repeat Mirror/FINISHER, audio and storage acceptance in actual Safari/iPadOS |
| Other browser engines | Not tested in this run | Separate engine-specific results before claiming Firefox/WebKit support |
| Facilitator / age-appropriate learner usability | NOT RUN | Observe ordinary guided use and comprehension separately for each pathway under approved safeguarding arrangements |
| Hosted preview parity | Build tested locally on CI runner | Record the exact preview URL and confirm its source commit before physical trial; these results do not independently test a Vercel hostname |
| Security/dependency maintenance | CI `npm ci` reported 16 advisories (4 low, 5 moderate, 7 high); reachability was not assessed in this acceptance task | Triage separately before production; no blanket dependency upgrade was mixed into the educational-interaction task |

Saved progress is browser-local and origin-specific. Different preview hosts, devices, private browsing, cleared storage or unavailable storage do not provide cross-device recovery. The app remains a fictional-data pilot preview, not a secure youth roster or authenticated institutional learning system.

No merge, production publication, enrollment or real participant data collection was performed. Existing operational gates in [the Founders Cohort readiness document](./YEP_FOUNDERS_COHORT_PILOT_READINESS_2026-11-03.md) remain in force; 15 participants, eight weeks and 16 sessions are planning targets, not verified enrollment or authorization.

**What passed:** current scoped Chromium interaction and regression checks. **What failed:** stale fixtures and missing CI trigger, now corrected. **Must be fixed before live use:** unresolved physical-device, Safari, safeguarding and operational gates. **Biggest risk:** treating automated passes as evidence of audible tablet playback or age-appropriate learning. **Highest-leverage next action:** a facilitator-led two-tablet rehearsal using fictional profiles on one fixed, version-recorded preview origin.
