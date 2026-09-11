# CEO KICKOFF — YEP APP V1 TABLET PILOT

Date: 2026-09-03
Owner: A/1 Suppliers / YEP
Pilot target: Two tablets arriving Monday
Build branch: `codex/yep-v1-tablet-pilot-2026-09-03`

## Objective
Have a working YEP V1 pilot ready to install, open, test, and demonstrate on both tablets when they arrive Monday.

Do not expand scope unnecessarily. Reuse existing YEP files, wireframes, architecture, Airtable/data work, prior decisions, and project history before creating anything new.

## V1 Locked User Experience
- Welcome / YEP identity
- Power Name / participant identity
- Daily Quest
- Weekly Module
- Boss Challenge
- Mentor Spotlight
- Rewards / badges
- Participant Profile
- Admin Review

## Tablet Pilot Requirements
The application must:
- work cleanly on tablet screens
- have large, clear touch targets
- use simple youth-friendly navigation
- preserve participant progress
- support a basic admin/facilitator view
- contain sample lessons/quests
- have no dead buttons
- have no placeholder claims presented as finished functionality
- avoid collecting sensitive real youth data until intake, consent, privacy, and permissions are approved

## Build Priority
FUNCTION FIRST.

Do not spend the sprint polishing animations while login, navigation, progress, or admin functions are broken.

Reuse the existing wireframe and architecture.

## Ownership
- Cecil: vision, approval, program decisions
- Codex/AI: technical build, fixes, packaging
- Krisha — A1 QA Specialist: independent testing, defect reports, regression testing, tablet acceptance testing

## Current Build Status
The active repository is `ceciltrimble15/a1-yep-pwa`.

Current main already contains a functioning React/Vite PWA proof-of-concept with:
- track selection
- YEP identity / ages 7–17
- F.L.A.G. home experience
- Mirror assessment
- Mirror results
- FINISHER mission
- reflection
- XP progress
- localStorage persistence
- facilitator/admin dashboard
- PWA manifest and installable display mode
- Vercel SPA deployment configuration

An older April 2026 MVP commit also contains useful prior product work including:
- Power Name
- four weekly modules
- rewards/badges
- streak tracking
- parent-interest flow
- offline/sync status UI

Those older features are reference assets. They should be selectively reused, not blindly restored.

## Existing Assets Found
- Current GitHub repo: `ceciltrimble15/a1-yep-pwa`
- Current React/Vite PWA code
- Existing PWA manifest via `vite-plugin-pwa`
- Existing A/1 logo asset
- Current Mirror/FINISHER/data architecture
- Current localStorage persistence
- Existing facilitator dashboard
- Prior YEP wireframe JSX
- Offline-first architecture document
- YEP System Hub / admin-tracker architecture
- Prior April YEP MVP code with Power Name, weekly content, rewards and offline status

## What Already Works in Current Main
- Screen routing through React context
- Track selection
- Mirror assessment and scoring
- Mission assignment
- Reflection flow
- XP awards
- FINISHER letter award
- Participant progress persistence through localStorage
- Facilitator dashboard populated by demo + active participant state
- PWA install configuration

## Broken / Missing Against Monday V1 Scope
- Power Name identity was missing from current main at kickoff
- Daily Quest screen/model is not yet a distinct V1 experience
- Weekly Module is not present in current main
- Boss Challenge is not present in current main
- Mentor Spotlight is not present in current main
- Rewards/badges are not present as a full V1 screen in current main
- Participant profile is not a dedicated screen
- Tablet acceptance testing has not yet been run on the actual Monday devices
- Offline cold-start/reconnect behavior still needs device verification
- No real-youth production data should be entered during this pilot

## Technical Action Started
The tablet pilot branch was created from `main`:

`codex/yep-v1-tablet-pilot-2026-09-03`

The first V1 identity fix has started:
- persistent Power Name added to YEP global state
- Power Name saved in localStorage
- Power Name required during pilot onboarding
- active youth/admin record now carries Power Name

## Build Tasks — Priority Order
1. Lock tablet pilot navigation and identity flow.
2. Finish Power Name and participant profile behavior.
3. Add Daily Quest using existing mission/content patterns.
4. Add one Weekly Module sample using real YEP content, not filler.
5. Add Boss Challenge completion state.
6. Add one Mentor Spotlight sample card with clearly labeled pilot content.
7. Add rewards/badges screen and persistent reward state.
8. Tighten admin review to show participant identity, quest/module/challenge status, XP and reward state.
9. Verify PWA install behavior and tablet responsive layout.
10. Verify persistence across refresh/restart.
11. Verify offline cached launch and reconnect behavior where implemented.
12. Remove dead controls/placeholders and fix tablet defects.

## Tablet Install Method
Primary Monday method: install the deployed PWA from the tablet browser using the browser's Add to Home Screen / Install App flow.

Fallback demo method: open the deployed web app directly in the browser if device policy blocks PWA installation.

Do not package a native APK unless the PWA route proves unreliable for the actual tablets.

## QA Test Plan — Krisha
Monday acceptance sequence:

INSTALL → LAUNCH → RUN EVERY SCREEN → BREAK IT → DOCUMENT BUGS → CODEX FIXES → RETEST → PASS/FAIL

Test:
- installation
- launch
- portrait/landscape behavior
- touch navigation
- text readability
- buttons
- Power Name
- progress saving
- Daily Quest
- Weekly Module
- Boss Challenge
- Mentor Spotlight
- rewards/badges
- participant profile
- admin/facilitator view
- offline/reconnect behavior if implemented
- crashes/freezes
- restart/cold start
- data persistence

For each defect record:
- device/tablet
- screen
- exact steps
- expected result
- actual result
- severity
- screenshot/video evidence
- retest result

Final QA result:
- PASS
- CONDITIONAL PASS
- FAIL

## Monday Definition of Done
The pilot passes Monday only if both tablets can:
- open/install the same build
- complete the core youth flow without dead ends
- create/use a Power Name
- run at least one real sample Daily Quest
- open a sample Weekly Module
- complete a Boss Challenge
- view Mentor Spotlight
- earn/view a reward or badge
- view participant progress/profile
- open the admin/facilitator review
- retain pilot progress after restart
- demonstrate stable touch/tablet usability

No sensitive real youth data is required for Monday acceptance.

## Scope Guardrail
Do not build the full future backend, mentor network, parent portal, AI agent system, marketplace, or complete curriculum before Monday.

The Monday objective is a credible, functioning physical proof of concept that can be held, demonstrated, tested, and used to decide what gets built next.
