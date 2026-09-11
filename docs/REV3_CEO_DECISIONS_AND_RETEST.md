# REV 3 — CEO decisions and tablet retest

Status: implementation candidate. Final workbook copy remains HELD.

One system. Four developmental lanes. Four distinct experiences. One common Process.

## S-1 — exact shared label

Workbook and tablet label: **S.T.E.M.Sin Technology + Problem-Solving Quest**.
This is a label, not a definition or formal expansion of the acronym. The home destination and all four challenge headings use this exact wording. Individual challenge names remain separate descriptions.

## R-1 — Page 7 destination

Program Home → **FINISHER Focus** (`finisherFocus`).
Shows saved Daily Quest response/status → Focus; saved S.T.E.M.Sin response/status → Innovation; existing Mirror Growth Edge and assigned FINISHER direction; existing mission title/status.
**Continue to My FINISHER Mission** opens `mission` with the current assigned mission unchanged. No mission: disabled continuation and a route to the existing Mirror. No new assessment, score, award, or XP mutation.

## R-5 — four content experiences

| Lane | Stable mode ID | Developmental experience |
|---|---|---|
| Foundation, 7–10 | explorer | Concrete observation, short or supported responses, simple safe tool tests, counting materials and pretend money |
| Builder, 11–13 | builder | Familiar user needs, small comparisons, materials/budget, explain a choice and an improvement |
| Momentum, 14–17 | leader | Assumptions, prototypes, evidence, estimated costs/pricing, trade-offs and next tests |
| Y.A.E.P., 18–24 | yaep | Market/workplace value, demand evidence, costs/revenue or savings, constraints and accountable execution |

`src/data/pilotContent.js` contains four explicit independently editable packs. Each owns instructions, example, expectations, Daily Quest, Week 1 activities, S.T.E.M.Sin challenge, Boss Challenge, mentor language, and reflection prompts. Screens render these fields rather than a generic YEP fallback. Copy is developmental pilot material for review, not locked workbook copy.

Shared: app/router, Mirror scoring and assignment, mission engine, XP, badges, navigation and proof review. Legacy mode IDs remain compatible.

Quest answers/completions and mentor questions persist in `laneProgress[mode]`. Legacy `pilotProgress` migrates only into the saved lane (Builder for legacy sessions without a valid mode); URL lane selection does not copy proof into the new lane. Existing Mirror result/assigned mission/XP remain participant data shared by the engine. This is still one participant per device pilot, not a multi-user backend. Switching lanes is not switching participants.

## Verification

- Production build and PWA generation: PASS.
- `npm run test:rev3`: PASS. Renders all six content screens in all four modes; checks differentiated packs and exact S-1 heading; tests legacy migration, lane isolation and FINISHER Focus empty/assigned/completed states without data mutation.
- `git diff --check`: PASS.
- Physical tablet portrait/landscape, restart/offline installation, and workbook page-by-page comparison: pending facilitator retest.

## Copy release gate

R-2, R-3 and R-4 definitions were not present in the checked-in audit files or this REV 3 decision message. Do not invent their criteria or mark them passed.
Final copy remains HELD until R-1 through R-5 are verified against the retested tablet build and the physical workbook. One physical YEP book may remain, but Foundation/Builder/Momentum prompts must use the corresponding developmental content, not cosmetic lane labels. Earlier dual-workbook audit mappings are historical and superseded by this four-lane architecture.

No production merge is authorized by this implementation report. Keep PR #2 draft until its acceptance gates pass.
