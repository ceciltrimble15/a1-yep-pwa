# YEP illustrated application — browser QA and two-tablet trial

Date: October 24, 2026. Scope: existing visual PR #10, preserved in a separate draft change [PR #11](https://github.com/ceciltrimble15/a1-yep-pwa/pull/11). No merge, production publication, participant enrollment, consent activation or remote participant collection is authorized by this report.

## Current decision

**HOLD for field-trial acceptance.** The browser-tested development candidate is concrete and reviewable. Hosted interaction verification still requires permitted access to the protected preview. Audible guidance and physical Tablet 1/2 acceptance remain untested. This is not a claim that a production participant system is operational.

## Evidence and versions

- Starting implementation: PR #10 head `8def19c8ede5f6b8722a89f6b4af863e5cd38259`; PR #9 remains separate and unchanged.
- Browser-flow fix commit: `6275a03373d917b9c0e55155b3b237a8989a9cc8`. Its local tree was checked against the uploaded GitHub tree.
- [Flow results](qa-2026-10-24/flow-results.json): 16 passing real Chromium 138.0.7204.0 cases on Linux, using disposable fictional names. Four developmental pathways × four viewports. These are browser emulations, not four physical devices or a learner study.
- Subsequent visual-only changes repair card contrast and replace a corrupt organization PNG with the existing logo from `ceciltrimble15/a1-suppliers-website`, blob `6c234dacdd11c3b12441195a0f5df11bfa6aea79`. Manifest dimensions now match the recovered 500×500 asset. Targeted visual/asset and resilience checks accompany those changes.
- The existing deployed PR #10 preview was operated in the cloud desktop browser: Foundation entry, Show me, picture selection, draft refresh, guide audio failure and navigation were observed directly.
- The new Vercel preview built successfully but redirected the cloud browser to Vercel sign-in. Build status is not hosted interaction acceptance. Automatic review rejected creating a 23-hour bearer share link because anyone possessing that link could access the deployment. No bypass or sharing change was made.

## Reproduced problems and repairs

| Problem | Evidence before repair | Change and verification |
|---|---|---|
| New screens inherit old scroll position | Phone onboarding left the next screen at scrollY 699; desktop also retained the old position | Router resets screen/pathway entry to the top; browser flow checks confirm this |
| Picture choices advance to offscreen instructions | Foundation guide appeared above the viewport at top −91.6 px after choosing people | Each changed guide step receives focus and is brought into view; desktop/touch flows assert visible focus |
| FINISHER choice vanishes if chosen before Mirror | Reopening a valid Foundation action returned no current mission in a failing regression | Restore current age-valid mission independently of Mirror; all four unit pathways and browser reload checked |
| Storage failure is silent | Persistence catch ignored blocked/quota errors while lessons still said saved | Prominent warning explains that changes may be lost; browser test forces a quota error |
| Screen audio fails without useful feedback | Real cloud/browser speech engine failed; screen AudioGuide only returned to idle | Read-with-facilitator fallback appears on non-cancellation errors; actual audio failure and simulated controls checked |
| Small touch targets | Screen audio controls were 38 px high; phone Privacy control was 32×36 px; narrow hotspots were 40 px high | Audio controls and Privacy now have 44 px minimum dimensions; narrow hotspots have 44 px minimum height |
| Card copy has weak contrast | White on gold endpoint: 1.71:1; white on light green endpoint: 3.43:1 | Dark navy on gold and darker green background; minimum across all four card gradients: 4.78:1, checked at all four viewports. This is a scoped copy check, not whole-app accessibility certification |
| Organization logo appears nearly blank | PNG was 3,999 bytes; strict image decoding failed; browsers still reported naturalWidth | Recovered the existing A/1 Suppliers asset, 158,765 bytes; strict decode succeeds. No invented replacement branding |
| Existing suites reflect retired learning logic | `test:rev3` expected an old assigned mission; `test:tablet` expected the retired Mirror scoring flow | Updated fixtures to current exposure reflection and learner-selected actions, retaining migration, lane isolation, draft recovery, save guards and privacy checks |

## Browser test coverage

| Browser viewport | Input | Ages 7–10 | Ages 11–13 | Ages 14–17 | Ages 18–24 |
|---|---|---|---|---|---|
| Desktop 1366×900 | Mouse | PASS | PASS | PASS | PASS |
| Phone 390×844 | Emulated touch | PASS | PASS | PASS | PASS |
| Tablet portrait 768×1024 | Emulated touch | PASS | PASS | PASS | PASS |
| Tablet landscape 1024×768 | Emulated touch | PASS | PASS | PASS | PASS |

Each case exercised age selection, illustrated choices, Show me, guided step entry, unfinished Daily Quest refresh, choice-only saving, home/lesson return, closing/reopening a tab on the same origin, STEM prediction → illustrated practice change → saved response, four-question Mirror, choosing an age-appropriate FINISHER action, and checklist guards. It checked that no written answer or submitted reflection was invented. No uncaught page errors, page-level horizontal overflow, missing image elements, or non-GET submission requests were observed in those flows. Image-element checks alone did not detect the partial PNG corruption; strict asset decoding and manual screenshots caught it.

Additional checks cover screen audio play/pause/resume/replay/stop/rate, lesson/vocabulary stop controls, navigation cancellation, unavailable speech, blocked storage, choosing an action before Mirror, and warm-cache offline reload/navigation. **Speech control wiring used a deterministic API double; audible playback was not verified.** The real browser speech engine returned failure, and its fallback was observed.

Local `npm run test:rev3`, `npm run test:tablet`, `npm run build` and `git diff --check` pass. Browser evidence files record their own scope. The first GitHub Actions matrix passed desktop and portrait; phone/landscape failed while capturing full-page screenshots, after fonts loaded, rather than at a lesson assertion. Capture now disables animation and allows 30 seconds. The next run passed phone but hit tablet tap timeouts under Chromium 151; the runner now uses Playwright’s default graphics configuration rather than Lambda-specific software graphics flags. The updated matrix must be checked before declaring CI green. Do not hide a failed or pending CI run behind the local results.

## What remains uncertain

- Neither physical tablet has been tested. Their model, OS, browser, installed voices, audio output, orientation behavior, storage policy and PWA installation behavior are unknown.
- No child or facilitator usability study was conducted. The Foundation lesson still has substantial explanatory copy before its activity; verify that a 7–10 learner can find the picture activity and understand the next step with ordinary guidance.
- Only Chromium browser automation is established here; Safari/iPad compatibility is not established.
- Warm-cache offline behavior passed locally. A first visit needs a connection. A device voice may also need a connection; do not promise offline narration until tested.
- Saved work is local to a browser profile **and exact preview origin**. It does not transfer between preview hosts, tablets, private browsing or cleared storage. Do not switch between alias and immutable deployment URLs during acceptance.
- Demo checklist marks and choices are self-report/practice data, not verified real-world outcomes. Facilitator sections remain collapsed convenience controls, not production role-based security.

## Tablet 1 / Tablet 2 acceptance sheet

Run with a facilitator and invented sample data only. Keep the same approved preview host throughout. Record screenshots without real participant information.

| Record | Tablet 1 | Tablet 2 |
|---|---|---|
| Tester / date | NOT RUN | NOT RUN |
| Device / OS / browser version | NOT RECORDED | NOT RECORDED |
| Exact preview host / deployment / source commit | NOT RECORDED | NOT RECORDED |
| Online first load / recognizable organization logo | NOT RUN | NOT RUN |
| Four pathways and correct age copy | NOT RUN | NOT RUN |
| Foundation first check-in and picture choices | NOT RUN | NOT RUN |
| Show me / Show where to tap / guide remains visible after advancing | NOT RUN | NOT RUN |
| Touch navigation and small controls without accidental adjacent taps | NOT RUN | NOT RUN |
| Portrait / landscape before and during a lesson | NOT RUN | NOT RUN |
| Hear it / vocabulary / screen audio audible; pause, resume, replay, stop, speed where available | NOT RUN | NOT RUN |
| Audio stops on navigation; fallback is clear when unavailable | NOT RUN | NOT RUN |
| Unfinished Daily Quest survives refresh and leaving/reopening | NOT RUN | NOT RUN |
| Saved choice-only response reopens without invented written work | NOT RUN | NOT RUN |
| STEM prediction before reveal; tool choice / response reopens | NOT RUN | NOT RUN |
| Mirror draft and self-report wording | NOT RUN | NOT RUN |
| FINISHER chosen before Mirror survives refresh with marked steps | NOT RUN | NOT RUN |
| Close browser, reopen same host, recover work | NOT RUN | NOT RUN |
| Warm-cache airplane-mode reopen / return home; online recovery | NOT RUN | NOT RUN |
| No youth microphone prompt / no real participant data entry | NOT RUN | NOT RUN |
| Overall result / issue references | PENDING | PENDING |

Suggested run: Foundation end-to-end first, then a short task in each older pathway. Use `Demo Comet 1` and `Demo Comet 2`, not a child's name. In Daily Quest select a problem, refresh before completion, return home and reopen, then save choices without writing. In STEM predict before revealing the sample change. Check saved proof separately from demonstrated understanding. Test FINISHER before Mirror in a separate disposable demo session. Use the reset warning/cancel path before intentionally clearing sample work.

**Release gate:** both devices must complete the checklist with no lost saved work, blocked core navigation, wrong-age content or youth microphone activation. Audio needs an explicit device result; a missing voice is a failed audio acceptance item until addressed or a facilitator-led fallback is expressly accepted. Record defects and reproduction steps. Stop the trial if real personal data is entered, a youth microphone activates, saved work disappears, or age-specific content crosses pathways. Production enrollment and outcome claims require a separate approved privacy and operating process.

## Reproduce the checks

```bash
npm ci
npx playwright install chromium
npm run test:rev3
npm run test:tablet
npm run build
npm run test:browser
npm run test:browser:resilience
```

`YEP_TEST_VIEWS` selects a named viewport; `YEP_TEST_MODES` selects pathway IDs. CI uses separate jobs for each viewport. `YEP_TEST_URL` can target a preview only when access is already permitted. It does not create a share link or disable authentication. Raw test output defaults to ignored `qa-output/`; checked-in evidence below is sample-only.
