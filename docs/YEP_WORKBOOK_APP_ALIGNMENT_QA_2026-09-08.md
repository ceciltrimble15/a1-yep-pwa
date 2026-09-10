> Superseded where inconsistent by [REV 3 CEO decisions](REV3_CEO_DECISIONS_AND_RETEST.md). Final copy is held pending R-1 through R-5 and four-lane retest.

# YEP Workbook ↔ App Alignment QA

Date: 2026-09-08
Owner: A/1 Suppliers / YEP
Build branch: `codex/yep-v1-tablet-pilot-2026-09-03`

## Objective
Audit the YEP POC workbook and prove that the workbook and tablet app reinforce the same process instead of operating as two disconnected products.

The workbook is the thinking/writing layer. The app is the action/tracking/progress layer.

## Locked Workbook Loop
The workbook should stay within the approved POC loop:
1. Power Name
2. Mirror Check-In
3. Real-World Quest
4. S.T.E.M.Sin connection
5. FINISHER focus
6. Reflection
7. XP / progress
8. Boss Challenge
9. My Process

Target size: roughly 10–15 pages for the POC, not a full curriculum book.

## Current App V1 Mapping

| Workbook element | App destination | Current app behavior | QA proof required |
|---|---|---|---|
| Power Name | Onboarding / Profile | Persistent participant identity | Enter Power Name, close/reopen, confirm persistence |
| Mirror Check-In | Mirror | Assessment → results → assigned mission | Complete Mirror and verify result/progress |
| Real-World Quest | Daily Quest | `Problem Spotter` prompt | Workbook prompt and app prompt must teach the same action |
| S.T.E.M.Sin | Daily Quest / future content pack | Current Daily Quest references technology or better organization | Verify workbook does not promise a larger tech feature than app provides |
| FINISHER Focus | Daily Quest + Mirror/FINISHER | Daily Quest currently focuses on `Focus`; Mirror loop awards FINISHER progress | Confirm terminology is identical |
| Reflection | Reflection | Existing Reflection screen | Workbook reflection should prepare or reinforce app reflection |
| XP / Progress | Progress / Profile / Rewards | XP + badges + completion state | Verify completed work visibly changes app progress |
| Boss Challenge | Boss Challenge | `60-Second Solution` | Workbook instructions and app challenge must match |
| My Process | Profile / Admin Review | Device record summarizes pilot progress | Verify a youth can see what they completed and an admin can review it |

## Current Pilot Content To Match

### Daily Quest
**Problem Spotter**
Find one real problem at home, school, in your neighborhood, or in a business. Write it in one clear sentence, then name one way technology or better organization could help.
FINISHER focus: **Focus**.

### Week 1 Module
**Focus & Identity**
- Power Name — explain why your Power Name fits who you are becoming.
- Define Your Why — write the problem you care about solving in one sentence.
- Identity Map — list one skill, one interest, and one value you can use to move forward.

### Boss Challenge
**60-Second Solution**
Explain the problem, your solution, who it helps, and the first step you would take. Practice saying it in 60 seconds or less.

### Mentor Spotlight
Teach that a mentor does not do the work for the participant. The participant saves one real question they would ask a mentor.

### Pilot Badges
- Quest Starter — Daily Quest complete
- Identity Builder — all Week 1 activities complete
- Boss Move — Boss Challenge complete

## Workbook Audit Questions
Krisha should answer each with PASS / GAP / MISMATCH.

1. Does every workbook activity have a clear matching app destination?
2. Does the workbook use the same names as the app: Power Name, Daily Quest, Weekly Module, Boss Challenge, Mentor Spotlight, FINISHER, XP, Rewards, Profile?
3. Does the workbook teach the same action the app asks the participant to complete?
4. Does anything in the workbook promise voice recording, AI, mentor video, leaderboard, certificates, or backend features that are not functional in V1?
5. Does every app action that matters have a workbook thinking/reflection companion where appropriate?
6. Are instructions short enough for ages 7–17, with room for age-tier adaptation later?
7. Can a facilitator look at the workbook and app together and understand where the participant is in the process?
8. Is workbook completion measurable enough to support the YEP Impact Tracker?
9. Are sensitive fields excluded from the POC workbook until consent/privacy rules are approved?
10. Can the workbook still be used if the tablet is temporarily offline?

## Connection Rule For V1
Do **not** build QR codes, scanning, handwriting recognition, or automatic workbook ingestion for Monday.

For the pilot, connection means **process alignment + shared activity IDs + visible app completion state**.

Recommended activity IDs:
- `power-name`
- `mirror-check-in`
- `problem-spotter`
- `week-1-focus-identity`
- `boss-sixty-second-solution`
- `mentor-question`
- `reflection`
- `my-process`

The printed workbook should display the matching activity name/ID in small facilitator text so the same step can be confirmed in the app/admin review.

## Krisha QA Deliverable
Return:
- workbook file/version reviewed
- page-by-page PASS / GAP / MISMATCH
- workbook ↔ app mapping table
- terminology mismatches
- activities with no app destination
- app screens with no workbook companion
- content that over-promises unavailable features
- recommended corrections
- final status: ALIGNED / CONDITIONALLY ALIGNED / NOT ALIGNED

## Ownership
- Cecil: final program/curriculum approval
- Codex/AI: app changes and content-ID connection
- Krisha: independent workbook/app alignment QA and retest

## Definition Of Done
The POC is aligned when a youth can work in the workbook, open the matching step in the app, complete the action, see progress/reward change, and a facilitator can verify the same step in Admin Review without guessing.
