# YEP — Lesson Architecture Pressure Test
**Review date:** October 14, 2026  
**Scope:** A/1 Suppliers YEP tablet POC, draft PR #10. Architecture/teaching audit only; **no feature changes, merge, or production release authorized by this review**.  
**Reviewed head:** `c5b0e2dfd27fd96547d7597972ab03def8e434f3`. Vercel status READY; no pull-request-triggered GitHub Actions workflow runs returned for this commit. Physical tablet/user comprehension/retention not certified.

## Executive decision
**CONDITIONAL FAIL for child-independent, end-to-end educational acceptance. PASS as a visual/technical demonstration candidate only.** Keep the four lanes and age pathways; correct a short list of architectural gaps rather than redesign.

**First principles:** A lesson succeeds only when a learner can: (1) notice a meaningful example; (2) understand a single concept; (3) manipulate or choose something for a reason; (4) explain what happened; (5) recall it without the original cue; (6) apply it in a new, appropriate context. An attractive illustration, play button, self-rating, or saved choice is *not* by itself proof of learning or impact.

### Code-supported strengths
- Four distinct age pathways and age-dependent instructional text: `src/data/modes.js`, `src/data/pilotContent.js`.
- Structured Foundation Daily Quest (cafeteria scene: see problem -> identify people -> choose idea -> save choice): `src/screens/FoundationDailyQuest.jsx`.
- S.T.E.M.Sin lets users choose tools, predict, reveal a *simulated* possible change, choose a next test, save a response: `src/screens/PilotScreens.jsx`.
- Vocabulary definition, rhyme, picture, read-aloud component, with initial action-matched scenes NOTICE/SORT/REFLECT: `src/data/visualVocabulary.js`, `src/components/VisualVocabulary.jsx`, `src/components/VisualTeachingScene.jsx`.
- Guided prompts and optional spoken Foundation teaching script in `src/data/foundationTeacher.js` and `src/components/YEPGuide.jsx`.
- Submitted-choice evidence is distinguished from a written explanation, unfinished work is saved in local storage; youth microphone input is locked: `src/context/YEPContext.jsx`, `src/components/VoiceCapture.jsx`.
- Code-level regression script covers some navigation/draft saving/scoring/mission completion: `scripts/tablet-cases.jsx`; the mere existence of the script does **not** certify a fresh passing run on PR #10.

### Blockers to a child-ready learning experience
**P0-1 — FINISHER age fit/safeguarding.** `src/data/missions.js` has one common mission bank regardless of age; the Mirror's growth edge selects it. It may direct a 7–10-year-old to record themselves on camera, pitch, approach people, price for profit, do a three-day streak or reach out. This conflicts with expectations for a supervised, age-appropriate Foundation lesson and the app's locked youth microphone/privacy posture. Gate youth-facing missions behind an age-appropriate, adult-supervised variant; no child-directed recording/contact or adult business task. For the *demo*, explicitly use fictional/sample selections with facilitator interpretation until fixed.

**P0-2 — Shared state contamination.** `src/context/YEPContext.jsx` saves `laneProgress[mode]` separately by age, but `mirrorResult`, `mirrorScores`, `currentMission`, `missionStepsDone`, `reflection`, `reflectionSubmitted`, `powerName` are global to the browser's local session. Switching modes or handing a tablet to another learner risks showing another pathway's Mirror/mission/personal answers. Hard gate: POC uses only a single **fictional demo persona** and a deliberate reset between demonstrations. A real multi-user implementation requires per-participant, access-controlled storage and consent/privacy design (future backend), not just localStorage.

**P0-3 — Foundation full-loop reflection accessibility.** `src/screens/Reflection.jsx` requires at least 12 typed characters; `src/components/VoiceCapture.jsx` locks youth microphone. Some 7–10 learners will need facilitator help or a developmentally appropriate non-voice, tap-based way to reflect. Avoid treating a tap or copied sentence as evidence of independent understanding. For POC, the facilitator may assist with fictional sample text; real pilot must specify responsible recording process and independent vs supported responses.

**P0-4 — Teacher wiring regression.** `src/screens/FoundationDailyQuest.jsx` passes `foundationTeacherStep('dailyQuest', step)` to the guide. However `src/screens/PilotScreens.jsx` passes `foundationTeacherStep('stemSin', guideStep)` in **StandardDailyQuest**, the legacy Foundation Daily route; the actual `StemSinQuest` guide currently has no such teacher prop. Hence the younger learner's new scripted S.T.E.M.Sin teacher does not run where intended, and legacy daily-quest users can hear the wrong lesson. Fix the props and rerun all legacy/reentry tests. Confirm the teacher focus IDs (`stem-ready`, `stem-result`, `stem-complete`, etc.) actually exist for the steps that require them; empty scroll/highlight is an inert "Show where to tap" button.

**P0-5 — Mirror over-claims.** `src/data/mirrorQuestions.js` runs twelve self-report statements (six dimensions x two) across ages, scores 1–4. `src/context/YEPContext.jsx` turns the highest-scoring dimension into a fixed "learning style" via `dimensionToStyle`, and results copy can sound definitive ("The Mirror Read You."). This is **not validated evidence** of a child's ability, personality, learning style, or objective growth. Render as "today's self-check-in" and "one way you might try", with room to change; never treat as a diagnosis, measured learning improvement, or funder-reported outcome. If the scoring interpretation is not amended by POC signoff, constrain demonstration and record an explicit limitation.

### Significant lesson design gaps (P1)
- **No recall / retention cycle:** `src/data/visualVocabulary.js` is display-only, without re-asking the concept after a short distraction or in a later session. Add one non-scored, unprompted recall and one new-scene transfer check for the demonstration; longer-term retention still requires follow-up after 1–7 days and appropriate consent.
- **Story continuity:** Foundation Daily Quest teaches a lunch-line need, S.T.E.M.Sin demonstrates art-table tools; vocabulary NOTICE uses falling pencils. This can model *transfer*, but only if the guide clearly announces "same thinking skill, new example" and asks the learner to name the connection. Otherwise it feels like unrelated modules.
- **Excessive narration density:** Some Foundation teacher speeches are multi-sentence mini-paragraphs. Test at ages 7 and 10 whether the child remembers the action after one short clip. Prefer a single 10–20-second prompt, a short question, then interaction; allow Replay, Skip, and visible text. These are design targets, not proven developmental standards.
- **Visual character ≠ speaking tutor:** The guide is currently a static SVG plus browser speech synthesis initiated by a tap; no mouth-sync, no live conversational AI, and no verified device voice availability. Keep the pilot deterministic and privacy-safe; animated mouth/gesture can be a later improvement and should not imply the learner is talking back.
- **Mirror fatigue:** 12 self-rating prompts labeled "~2 minutes" is a claim requiring observed timing across ages, especially younger readers. Make a real usability measurement before keeping the claim.

### Architectural release gates
**Gate A — visual demonstration only (controlled adults/sample data):**
1. Exact approved logo displayed; avatar/guide visual consistent with the CEO-selected Black youth guide; no fake progress badges/streaks.
2. Vocabulary images match the *teaching action*, not decorative or duplicated images.
3. One complete Foundation 7–10 loop can be navigated without broken links; active teacher script maps to actual lesson/step.
4. Check button focus behavior, speak/stop/replay, guide hint targeting, offline/portrait/landscape, loss/recovery of local draft.
5. No child PII, audio recording, unverifiable learning/outcome claims, or production merge without CEO approval.
6. GitHub code regression/build status and both **physical tablets** independently checked.

**Gate B — supervised youth pilot (not implied by Gate A):**
1. Written host/supervision/safeguarding/insurance/screening requirements, appropriate guardian consent/assent and approved participant record policy.
2. Age-safe mission content and accessible reflection/voice alternatives; no unconsented photo/video/contact.
3. Per-participant private data design and participant-switch protections; no shared local demo data exposed.
4. Learner comprehension measured with age-appropriate observation, not scores manufactured by avatar narration.
5. Facilitator trained to distinguish app simulation from real-world evidence.

### Suggested pressure-test script: Foundation (7–10)
Use **fictional/demo data** for internal testing. For actual child user research, secure appropriate permission and supervision first.
1. **Show without explanation**: Ask tester to point to "where to begin." Did it take <=30 seconds without help? (Proposed usability threshold, not validated.)
2. **NOTICE**: Guide shows cafeteria scene and asks for one problem. Ask "What do you see?" Record whether selection corresponds to a problem in scene; can they explain whom it affects?
3. **Predict**: Move to art-table tool scenario and say "same skill, new place." Ask what they expect before tapping reveal. Does the prediction precede the reveal?
4. **Reason**: Show before/possible-change pictures. Ask what changed and what *wasn't proven*. Child can use own words, gesture, or a supported method; mark level of assistance.
5. **Recall**: After another activity, hide the definition and ask what "NOTICE" means or ask them to spot the relevant example. Do not count repeating the rhyme alone.
6. **Transfer**: Show a new, unused image (e.g., missing playground equipment) and ask what needs attention, who it affects, and a safe idea. Note independent/supported responses.
7. **Mirror**: Observe reading support and whether language misleads tester into thinking they were "graded" or diagnosed.
8. **FINISHER**: Ensure activity is age-safe, partner-approved, and distinguish checklist tap from performed action.
9. **Retention later**: Re-ask a concept after 1 day and optionally 7 days without initial image or chant; do not claim retention yet.
10. **Reliability**: Close/reopen, switch pathway, reset sample profile, check audio interrupt, offline/portrait/landscape on both devices.

**Observables to capture:** start-to-first-action time, required facilitator hints, correct reasoning not only correct tap, unprompted recall, application in new context, confusion/abandonment, accessibility incidents, privacy/safety issues, and device recovery. Keep raw notes in restricted institutional workspace, not in public app or GitHub.

### Minimal fix sequence — protect scope
1. Repair teacher-to-lesson wiring and inert focus targets.
2. Gate risky adult FINISHER missions for 7–10 and misleading assessment wording. For a strictly controlled adult demo, disclose and avoid those routes until fixed.
3. Make reflection accessible to younger learners without collecting child audio/PII.
4. Add one small practice recall and transfer check as part of the first guided arc, **not an entire curriculum engine**.
5. Regression/physical-device QA, then CEO visual and teaching approval. Keep PWA demo and permanent backend distinct.

## Decision rules
- **PASS**: A tester can independently or with *documented acceptable support* identify, explain, and transfer a teaching concept; sequence is coherent; no false safety/learning claims; all demo device gates pass.
- **FAIL**: Guide talks but activity doesn't support its instructions, child receives unsafe/irrelevant adult mission, a student can see another's state, recall only repeats the on-screen definition, or saved completion is represented as proven learning.
- **HOLD**: Any legal/safety/privacy uncertainty, missing consent, untested hardware, or uncertainty around outcome interpretation.

**Do not merge PR #10 or claim child pilot readiness solely from Vercel READY.**
