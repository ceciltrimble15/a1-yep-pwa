# YEP / Y.A.E.P. Proof-of-Concept Workbooks — Approval Package (Rev 2)

**Status:** Re-audited against the V1 tablet pilot branch. Awaiting founder decisions before full copy.
**Prepared for:** Cecil Trimble, Founder & CEO, A/1 Suppliers
**Supersedes:** Rev 1, which audited `main` and was wrong. Do not use Rev 1.

---

## 0. Audit Basis

| | |
|---|---|
| Repo | `ceciltrimble15/a1-yep-pwa` |
| PR | #2 — YEP V1 Tablet Pilot (Draft — must not be merged until QA passes) |
| Branch | `codex/yep-v1-tablet-pilot-2026-09-03` |
| Head audited | `f08d1109e98c6e49442d86fd53825d98dda940d5` (verified match) |

**Source-of-truth rule applied:** the pilot branch is the functional source of truth. The
workbooks match the V1 tablet flow. Every curriculum improvement is marked
`APP CHANGE REQUEST` and left for a deliberate decision. Nothing in the workbook silently
disagrees with the app.

Files that carry the functional truth:
`src/data/pilotContent.js` · `src/data/modes.js` · `src/context/YEPContext.jsx` ·
`src/screens/PilotScreens.jsx` · `src/screens/Home.jsx` · `src/screens/TrackSelector.jsx` ·
`src/screens/FacilitatorDashboard.jsx` · `src/App.jsx`

Prior branch docs reviewed and honored:
`docs/YEP_WORKBOOK_APP_ALIGNMENT_QA_2026-09-08.md` ·
`docs/YEP_YAEP_DUAL_WORKBOOK_APP_AUDIT_2026-09-08.md`

---

## 1. Re-Audit Findings — The Ten Items

### 1. Exact labels and spelling (verified from source)

**Pathways** — `modes.js`. Internal ids differ from display labels. Workbooks use the labels.

| id (code) | Program | Display label |
|---|---|---|
| `explorer` | YEP | **Foundation · Ages 7-10** |
| `builder` | YEP | **Builder · Ages 11-13** |
| `leader` | YEP | **Momentum · Ages 14-17** |
| `yaep` | Y.A.E.P. | **Y.A.E.P. · Ages 18-24** |

`builder` is the default mode. Program names in-app: `YEP` / `Young Entrepreneurs Process`,
`Y.A.E.P.` / `Young Adult Entrepreneur Process`. **The earlier `Y-A.E.P.` misspelling is gone —
the branch is correct.**

**Screen and card labels, verbatim:**

| Home hub card | Screen title |
|---|---|
| Daily Quest | `Problem Spotter` / `Opportunity Spotter` |
| Weekly Module | `Week 1 — Focus & Identity` / `Week 1 — Position & Purpose` |
| S.T.E.M.Sin Technology Quest | `S.T.E.M.Sin Technology Quest — Build Something That Solves a Problem` / `— Turn a Tool Into Value` |
| Boss Challenge | `Boss Challenge — 60-Second Solution` / `— 60-Second Value Pitch` |
| Mentor Spotlight | `What a Mentor Does` / `Using Mentorship Strategically` |
| Rewards / Badges | `Proof Badge Log` |
| My Process / Profile | `Participant Profile` |
| The Mirror + FINISHER | `Mirror Intro` → assessment → results → mission |
| Admin Review | `Workbook + Tablet Proof Readout` |

Buttons, verbatim: `Complete Daily Quest` · `Complete S.T.E.M.Sin Quest` ·
`Complete Boss Challenge` · `Save Mentor Question` · `Lock In` · `Back To Program Home` ·
`Open Facilitator Demo`.

Note: em dash in every quest title (`Week 1 — Focus & Identity`), hyphen in every mode label
(`Foundation · Ages 7-10`). Workbook headers must match character for character.

**Activity ids to print in small facilitator text** (real, from `pilotContent.js`):
`power-name` · `why` · `identity-map` · `problem-spotter` / `opportunity-spotter` ·
`week-1-focus-identity` / `week-1-position-purpose` ·
`build-something-that-solves-a-problem` / `turn-a-tool-into-value` ·
`sixty-second-solution` / `sixty-second-value-pitch` ·
badges: `daily-quest` · `weekly-module` · `boss-challenge`.

The id list in `YEP_WORKBOOK_APP_ALIGNMENT_QA_2026-09-08.md` (`mirror-check-in`,
`mentor-question`, `reflection`, `my-process`) was a proposal and **was not implemented**.
Those four steps have no ids in code. Workbooks use the real ids above only.

### 2. Exact order of activities

The tablet is **not linear**. Entry is `TrackSelector`, then Home is a 9-card hub the
participant can tap in any order.

Entry screen field order (all on one screen): **Program Pathway → Your Name (optional) →
Your Power Name (required) → Track → Lock In.** `Lock In` is disabled until both a track and
a Power Name are entered.

Home hub card order as rendered:
1. Daily Quest 2. Weekly Module 3. S.T.E.M.Sin Technology Quest 4. Boss Challenge
5. Mentor Spotlight 6. Rewards / Badges 7. My Process / Profile 8. **The Mirror + FINISHER**
9. Admin Review

**Finding:** the approved workbook spine puts Mirror Check-In at page 3; the tablet puts the
Mirror at hub card 8, after the entire pilot sequence. Because the hub is order-agnostic this
does not break, but a facilitator following the workbook page-by-page will jump to card 8 at
page 3 and back to card 1 at page 4. See G-7.

### 3. Exact tablet completion action

| Step | Action that marks it done |
|---|---|
| Daily Quest | Type in textarea → tap `Complete Daily Quest`. Button disabled while empty. |
| Weekly Module | Tap each of 3 activity rows to toggle a checkmark. **No text entry.** |
| S.T.E.M.Sin | Type in textarea → tap `Complete S.T.E.M.Sin Quest`. Disabled while empty. |
| Boss Challenge | Type in textarea → tap `Complete Boss Challenge`. Disabled while empty. |
| Mentor Spotlight | Type question → tap `Save Mentor Question`. Disabled while empty. |
| Mirror | Answer 12 statements on a 4-point scale → results screen. |
| FINISHER Mission | Tap complete on the assigned mission. |
| Reflection | Type → submit. |
| Rewards / Profile / Admin Review | Read-only. No completion action. |

Re-tapping a completed quest changes the button to `Update Completed Quest` — text can be
revised, completion is not lost.

### 4. What is actually persisted

One `localStorage` key, `yep_session_v1`, one participant per device.

Stored: `screen`, `track`, `youthName`, **`powerName`**, `mirrorScores`, `mirrorResult`,
`currentMission`, `missionComplete`, `reflection`, `reflectionSubmitted`, `finisherLetter`,
`xp`, `mode`, and `pilotProgress`:
`dailyQuestText` · `dailyQuestComplete` · `weeklyCompleted[]` · `stemSinText` ·
`stemSinComplete` · `bossText` · `bossComplete` · `mentorQuestion`.

**Not stored anywhere:** the participant's Week 1 writing (Power Name reasoning, Why,
Identity/Asset Map) — only the three checkbox ids. Badges are **derived at render time**, not
stored.

### 5. What earns a badge

Exactly three, all derived in `YEPContext.pilotBadges`:

| Badge | Condition in code |
|---|---|
| **Quest Starter** | `pilotProgress.dailyQuestComplete` |
| **Identity Builder** | `pilotProgress.weeklyCompleted.length >= 3` |
| **Boss Move** | `pilotProgress.bossComplete` |

Rewards screen carries the disclaimer: *"Badges are earned by completing real
proof-of-concept actions. No purchase or cash value is attached in this test."* Workbook copy
must not imply a prize.

### 6. What only records status

Mirror Check-In · S.T.E.M.Sin Technology Quest · FINISHER Focus · Reflection ·
Mentor Spotlight. Five of fourteen steps earn no badge — including S.T.E.M.Sin, the hardest
page in the book. Confirmed unchanged from Rev 1.

Mentor is weaker still: `saveMentorQuestion` sets no completion flag. Status is inferred from
whether the string is non-empty — `Question Saved` on Home, `Saved` on Admin Review.

### 7. Current Mirror / FINISHER behavior

Unchanged from `main`. Intro → 12 statements across 6 dimensions (Identity, Discipline,
Confidence, Money Awareness, Adaptability, Community) on a 4-point scale
(Not yet / Sometimes / Mostly / Always) → Results give **Anchor** (highest), **Growth Edge**
(lowest), **Learning Style** → app assigns a FINISHER Mission from the Growth Edge →
complete mission → Reflection → Progress.

**XP exists only here:** Mirror 50 + Mission 75 + Reflection 25 = 150 max. `Profile` labels it
**"Mirror XP"**. The entire pilot sequence — Daily Quest, Week 1, S.T.E.M.Sin, Boss Challenge,
Mentor — awards **zero XP**. Verified: none of those handlers touch `setXp`.

**FINISHER letters are assigned by the app, never chosen by the participant:**
Daily Quest displays `Focus` (read-only) · S.T.E.M.Sin displays `Innovation` (read-only) ·
the Mirror mission grants a letter from the Growth Edge (Identity → Identity, Discipline →
Execution, Confidence → Hustle, Money Awareness → Strategy, Adaptability → Resilience,
Community → Network). Only the mission letter is stored.

### 8. Participant Profile vs the proposed My Process page

The tablet already calls it My Process — Home card reads `My Process / Profile` and the
screen sub-copy reads *"This is the digital My Process proof page for the tablet pilot."*
**A separate My Process screen is not needed.** Rev 1 was wrong to call it missing.

`Participant Profile` shows nine fields: Program · Age Pathway · Power Name · Track ·
Mirror XP · Anchor · S.T.E.M.Sin · Proof Badges (n/3) · Weekly Activities (n/3).

It does **not** show: Daily Quest status, Boss Challenge status, Mentor Question, FINISHER
letter, Growth Edge, Reflection, or any written text. Admin Review shows more of the
participant's own progress than the participant's own profile does. See G-4.

### 9. Admin Review limitations

`Workbook + Tablet Proof Readout` renders ten status cards: Program · Pathway · Participant ·
Daily Quest · Weekly Module · S.T.E.M.Sin · Boss Challenge · Mentor Question · Badges ·
Mirror / FINISHER Loop.

**Every one is a status flag — `Complete` / `Open` / `Saved` / a count. No participant writing
is displayed anywhere on this screen.** `dailyQuestText`, `stemSinText`, `bossText` and
`mentorQuestion` are saved to the device but are only readable on the screen where they were
typed. Rev 1's matrix claimed Admin Review shows problem statements and mentor questions.
That was wrong and is corrected below.

Its own sub-copy is accurate and should be echoed, not contradicted: *"This screen reviews the
active device proof record. It is not the final source-of-truth backend."*

`Open Facilitator Demo` → Cohort Dashboard: three sample records (Marcus, Aaliyah, DeShawn)
tagged `Sample`, plus the live device record tagged `Pilot`, under the header
`Facilitator Demo View`. Stats read `Records` / `Finishers` / `Demo XP`. The branch already
labels this honestly — workbook copy must not upgrade it.

Limitations to state plainly in workbook Page 14: one participant per device · no accounts ·
no sync · no export or print · `resetSession` wipes the record permanently · written responses
are not surfaced to the reviewer.

### 10. Workbook content the tablet does not support

From the Rev 1 outline, the following were invented and are removed or rewritten:

| Rev 1 proposed | Reality | Resolution |
|---|---|---|
| Participant selects a FINISHER letter | App assigns letters; no selection screen | Page 7 rewritten to record assigned letters |
| Page 3 short Mirror check-in with its own scoring | No such screen; only the full 12-item Mirror | Page 3 becomes preparation — see §4 D-1 |
| Admin Review displays written responses | Status flags only | Matrix corrected |
| Page 9 XP per pilot step | Pilot steps award no XP | Page 9 = copy `Mirror XP` + status |
| Separate My Process tablet screen | Already exists as Participant Profile | Removed as a request |
| Week 1 writing saved to tablet | Checkboxes only | Workbook owns the writing; stated on the page |

Still true and confirmed: no leaderboard, no voice/video recording, no parent portal, no
certificates, no AI answering for the participant, no QR/scan ingestion. Nothing in the
workbooks promises any of them.

---

## 2. Corrected YEP Matrix — Ages 7–17

Chain: `WORKBOOK ENTRY → TABLET ACTION → SAVED PROGRESS → BADGE/STATUS → ADMIN REVIEW`

| Pg | Workbook Entry | Tablet Screen → Action (verbatim) | Persisted As | Badge / Status | Visible To Reviewer |
|----|---|---|---|---|---|
| 1 | Circle pathway; draft name; pick track | Start screen → `Choose Your Program Pathway` → `Your Name` (optional) → `Choose Your Track` → `Lock In` | `mode`, `youthName`, `track` | Session started | Admin Review: Program, Pathway · Profile: Program, Age Pathway, Track |
| 2 | Power Name + why it fits | Same screen → `Your Power Name` (**required**, 28 char max) · then Weekly Module → tap `Power Name` | `powerName`; id `power-name` in `weeklyCompleted` | Counts toward **Identity Builder** | Admin Review: Participant · Profile: Power Name · Home greeting |
| 3 | Mirror preparation notes | Home → `The Mirror + FINISHER` → Mirror Intro → 12 statements (Not yet/Sometimes/Mostly/Always) → Results | `mirrorScores`, `mirrorResult`, `currentMission` | Status only · **+50 Mirror XP** (first time) | Profile: Anchor, Mirror XP · Admin Review: Mirror / FINISHER Loop |
| 4 | Problem in one sentence + one way tech or better organization could help | Home → `Daily Quest` → `Problem Spotter` → type → `Complete Daily Quest` | `dailyQuestText`, `dailyQuestComplete` | **Quest Starter** | Admin Review: `Daily Quest: Complete` — **text not shown** |
| 5 | All Week 1 writing: why the Power Name fits · the problem you care about in one sentence · one skill, one interest, one value | Home → `Weekly Module` → `Week 1 — Focus & Identity` → tap `Power Name`, `Define Your Why`, `Identity Map` | `weeklyCompleted[]` — **ids only, no text** | **Identity Builder** at 3/3 | Admin Review: `Weekly Module: Complete` or n/3 · Profile: Weekly Activities n/3 |
| 6 | Problem carried from Pg 4 + tool/app/device/AI idea/simple system, what it does, who it helps | Home → `S.T.E.M.Sin Technology Quest` → `Build Something That Solves a Problem` → type → `Complete S.T.E.M.Sin Quest` | `stemSinText`, `stemSinComplete` | Status only. Screen displays FINISHER Focus **Innovation** (read-only) | Admin Review + Profile: `S.T.E.M.Sin: Complete` — **text not shown** |
| 7 | Record the letters the app assigned you | No dedicated screen. Read `Focus` on Daily Quest, `Innovation` on S.T.E.M.Sin, mission letter on Mirror Results | `finisherLetter` (mission letter only) | Status only | Facilitator Demo View: FINISHER letter chip. **Not on Admin Review** |
| 8 | Reflection answers | Home → `The Mirror + FINISHER` → mission → complete → Reflection → submit | `reflection`, `reflectionSubmitted` | Status only · **+25 Mirror XP** | Admin Review: Mirror / FINISHER Loop · Facilitator Demo View shows reflection text |
| 9 | Copy what the tablet shows | Home → `My Process / Profile` → read `Mirror XP`; Progress screen shows XP / 150 | `xp` (max 150, Mirror loop only) | Progress state | Profile: Mirror XP · Facilitator Demo View: XP per record |
| 10 | 60-second script: problem, solution, who it helps, first step | Home → `Boss Challenge` → `60-Second Solution` → type → `Complete Boss Challenge` | `bossText`, `bossComplete` | **Boss Move** | Admin Review: `Boss Challenge: Complete` — **text not shown** |
| 11 | One question you would ask a mentor | Home → `Mentor Spotlight` → `What a Mentor Does` → type → `Save Mentor Question` | `mentorQuestion` (string, no flag) | Status only — `Question Saved` | Admin Review: `Mentor Question: Saved` — **text not shown** |
| 12 | Tick the three badges | Home → `Rewards / Badges` → `Proof Badge Log` | Derived, not stored | All three: Quest Starter, Identity Builder, Boss Move | Admin Review: `Badges: n` · Profile: Proof Badges n/3 |
| 13 | Full carry-forward summary | Home → `My Process / Profile` → `Participant Profile` | Composite of stored fields | Session state | 9 fields — see §1.8 for what it omits |
| 14 | Facilitator sign-off | Home → `Admin Review` → `Workbook + Tablet Proof Readout` → `Open Facilitator Demo` | Device record only | Verified by facilitator | 10 status cards; Cohort Dashboard = 3 `Sample` + 1 `Pilot` |

## 3. Corrected Y.A.E.P. Matrix — Ages 18–24

Same page numbers. Differences are content and standard, not structure.

| Pg | Workbook Entry | Tablet Screen → Action (verbatim) | Persisted As | Badge / Status | Visible To Reviewer |
|----|---|---|---|---|---|
| 1 | Confirm pathway; cohort; pick track | Start screen → `Choose Your Program Pathway` → **`Y.A.E.P. · Ages 18-24`** → `Your Name` → `Choose Your Track` → `Lock In` | `mode: 'yaep'`, `youthName`, `track` | Session started | Admin Review: Program `Y.A.E.P.`, Pathway · Profile: Program, Age Pathway, Track |
| 2 | Power Name + the evidence behind it | Same screen → `Your Power Name` (**required**) · then Weekly Module → tap `Power Name` (*"Define the professional or entrepreneurial identity your Power Name represents."*) | `powerName`; id `power-name` | Counts toward **Identity Builder** | Admin Review: Participant · Profile: Power Name |
| 3 | Mirror preparation notes | Home → `The Mirror + FINISHER` → 12 statements → Anchor / Growth Edge / Learning Style | `mirrorScores`, `mirrorResult`, `currentMission` | Status only · **+50 Mirror XP** | Profile: Anchor, Mirror XP · Admin Review: Mirror / FINISHER Loop |
| 4 | Opportunity, who it affects, one practical way to create value | Home → `Daily Quest` → `Opportunity Spotter` → type → `Complete Daily Quest` | `dailyQuestText`, `dailyQuestComplete` | **Quest Starter** | Admin Review: `Daily Quest: Complete` — **text not shown** |
| 5 | All Week 1 writing: identity the Power Name represents · the problem/opportunity/future you are committed to · one skill, one relationship, one resource | Home → `Weekly Module` → `Week 1 — Position & Purpose` → tap `Power Name`, `Define Your Why`, **`Asset Map`** | `weeklyCompleted[]` — **ids only, no text** | **Identity Builder** at 3/3 | Admin Review: `Weekly Module: Complete` or n/3 · Profile: Weekly Activities n/3 |
| 6 | Opportunity from Pg 4 + digital tool / AI workflow / device / system, **the user, the task, the result you would test first** | Home → `S.T.E.M.Sin Technology Quest` → `Turn a Tool Into Value` → type → `Complete S.T.E.M.Sin Quest` | `stemSinText`, `stemSinComplete` | Status only. FINISHER Focus **Innovation** (read-only) | Admin Review + Profile: `S.T.E.M.Sin: Complete` — **text not shown** |
| 7 | Record the letters the app assigned you | No dedicated screen. `Focus` on Daily Quest, `Innovation` on S.T.E.M.Sin, mission letter on Mirror Results | `finisherLetter` (mission only) | Status only | Facilitator Demo View: letter chip. **Not on Admin Review** |
| 8 | Reflection incl. what you avoided and why | Home → `The Mirror + FINISHER` → mission → Reflection → submit | `reflection`, `reflectionSubmitted` | Status only · **+25 Mirror XP** | Admin Review: Mirror / FINISHER Loop · Facilitator Demo View shows text |
| 9 | Copy what the tablet shows | Home → `My Process / Profile` → read `Mirror XP` | `xp` (max 150, Mirror loop only) | Progress state | Profile: Mirror XP |
| 10 | Pitch: opportunity, value created, who benefits, next concrete move | Home → `Boss Challenge` → `60-Second Value Pitch` → type → `Complete Boss Challenge` | `bossText`, `bossComplete` | **Boss Move** | Admin Review: `Boss Challenge: Complete` — **text not shown** |
| 11 | One specific question about business, career, money, or next move | Home → `Mentor Spotlight` → `Using Mentorship Strategically` → type → `Save Mentor Question` | `mentorQuestion` (string, no flag) | Status only — `Question Saved` | Admin Review: `Mentor Question: Saved` — **text not shown** |
| 12 | Tick the three statuses | Home → `Rewards / Badges` → `Proof Badge Log` | Derived, not stored | Quest Starter, Identity Builder, Boss Move | Admin Review: `Badges: n` · Profile: Proof Badges n/3 |
| 13 | Full carry-forward summary | Home → `My Process / Profile` → `Participant Profile` | Composite of stored fields | Session state | 9 fields — see §1.8 |
| 14 | Facilitator sign-off | Home → `Admin Review` → `Workbook + Tablet Proof Readout` | Device record only | Verified by facilitator | 10 status cards; pathway shows `Y.A.E.P.` |

---

## 4. Revised Gaps — Classified

### BLOCKER — must be resolved before the tablet demo

**B-1 — Reflection and XP are unreachable without running the Mirror loop.**
Workbook pages 8 and 9 are gated behind hub card 8. A participant who works pages 1–7 in
order and then turns to page 8 has nothing to open — Reflection only appears after
Mirror → Mission → Complete Mission. If the demo does not include the full Mirror loop,
two of fourteen pages have no tablet action at all.
*Resolution required:* either the demo script always runs the Mirror loop, or pages 8–9 are
explicitly framed as part of the Mirror sequence. **Recommend the demo always runs it** —
it is also the only source of XP.

**B-2 — One participant per device, no export, destructive reset.**
Single `yep_session_v1` key. A second participant on the same tablet overwrites the first.
`resetSession` deletes the record with no confirmation and no way to recover it. Nothing can
be printed, exported, or emailed off the device.
*Resolution required:* a written demo protocol — one tablet per participant, or reset only
after the facilitator has recorded the readout on paper. This is an operational fix, not a
code fix, and it is enough for V1.

### APP CHANGE REQUEST — flagged, not applied

**A-1 — Admin Review shows no participant writing.** Ten status flags, zero text. The
proof standard promises a reviewer can see the work; right now they see that work
*happened*. `dailyQuestText`, `stemSinText`, `bossText`, and `mentorQuestion` are already
persisted — surfacing them is a display change, not a data change. **Highest-value single
change on this list.**

**A-2 — Participant Profile is thinner than Admin Review.** The participant's own My Process
page omits Daily Quest, Boss Challenge, Mentor Question, FINISHER letter, Growth Edge, and
Reflection — all of which the admin screen shows. Page 13 is the show-an-adult moment and
the tablet half currently under-delivers against the workbook half.

**A-3 — Identity Builder can be lost.** `toggleWeeklyActivity` un-checks. Badges are derived
at render, not stored, so a mis-tap silently removes an earned badge with no warning.
*Suggested:* make completion one-way, or confirm before un-checking.

**A-4 — Mentor Spotlight has no completion flag.** Status is inferred from a non-empty
string. It is the only proof step without a real completion boolean, which makes it the odd
one out in any completion count.

**A-5 — No FINISHER Focus screen.** Letters appear as read-only fields on two screens and as
a mission grant on a third. There is no single place a participant sees their FINISHER
progress, so workbook page 7 sends them to three screens to fill one page.

**A-6 — Pilot sequence awards no XP.** Five completed proof actions move the XP number zero.
A participant who finishes Daily Quest, Week 1, S.T.E.M.Sin, Boss Challenge and Mentor and
skips the Mirror shows **0 XP**. Not fixed here — no XP economy is approved. Flagged so the
decision is deliberate.

**A-7 — Y.A.E.P. Asset Map carries the id `identity-map`.** Cosmetic in code, but the
facilitator id printed in the Y.A.E.P. workbook would read `identity-map` next to a page
titled Asset Map. Low priority; the workbook prints the title, not the id, so no workbook
impact today.

**A-8 — Hub order does not match the approved spine.** The Mirror sits at card 8; the spine
puts it at page 3. See G-7 under Accepted Limitations for the V1 handling.

### WORKBOOK CHANGE — my side, already applied to the structure below

**W-1 — Page 7 rewritten.** Participants **record** the FINISHER letters the app assigned
(Focus, Innovation, mission letter), they do not choose one. Rev 1 had them selecting a
letter, which the app does not support.

**W-2 — Page 3 becomes Mirror preparation.** See decision D-1.

**W-3 — Page 9 drops all point values.** Copy reads `Mirror XP` to match the Profile label,
states plainly that the pilot steps record status rather than points, and has the participant
copy the number off the tablet.

**W-4 — Page 1 absorbs pathway and track selection.** Both happen on the entry screen before
anything else, so the Welcome page must cover them. Rev 1 omitted track entirely.

**W-5 — Page 5 carries all Week 1 writing and says so.** Because the tablet stores only three
checkboxes, the workbook is the sole record of the Week 1 responses. The page states this in
facilitator text: *"The tablet records that you did this. This page records what you said."*

**W-6 — Page 13 marks which fields the tablet mirrors.** Fields the Participant Profile also
shows get a small tablet glyph; the rest are workbook-only until A-2 lands. No page implies
the tablet holds something it does not.

**W-7 — Foundation lane 5A/5B split confirmed.** Page 5 now carries three writing activities
for ages 7–10 with no tablet capture to fall back on. Foundation prints as 5A/5B (15 pages);
Builder, Momentum and Y.A.E.P. stay at 14.

**W-8 — Rewards page carries the app's own disclaimer.** *"No purchase or cash value is
attached in this test."* Nothing in the workbook frames badges as prizes.

### ACCEPTED V1 LIMITATION — stated honestly in the workbook, not fixed

**G-1** Five of fourteen steps earn no badge (Mirror, S.T.E.M.Sin, FINISHER Focus,
Reflection, Mentor). Workbook marks them **"Saved status only."** No badge is invented.

**G-2** Written responses live only on the screen where they were typed. Page 14 tells the
facilitator to read the workbook alongside the tablet rather than expecting the tablet to
show the writing.

**G-3** Admin Review is a device readout, not a synced backend. Page 14 echoes the app's own
sentence and claims nothing more.

**G-4** Cohort Dashboard is three sample records plus one live record, already labeled
`Sample` / `Pilot` / `Demo XP` by the branch. Workbook does not present it as a cohort report.

**G-5** No offline dependency. All 14 workbook pages are completable on paper if the tablet
is unavailable; only the save step waits. This satisfies QA question 10.

**G-6** `S.T.E.M.Sin` has no defined expansion anywhere in the repo or brand system. Used
verbatim, unexplained. *If it should be defined, Page 6 needs one line from you.*

**G-7** Mirror at page 3 vs hub card 8. Accepted for V1 because the hub is order-agnostic —
the participant taps card 8 at page 3 and returns to card 1 at page 4. Page 3 carries a
facilitator note naming the card. Reordering the hub is A-8 if you want it clean.

**G-8** No participant term exists for Y.A.E.P. Brand fixes **Yeppers** for youth. Y.A.E.P.
copy says "participant" throughout. *Still an open naming decision, not a blocker.*

**G-9** **A.Ai** is in the brand system, not in the build. It appears in neither workbook.

**G-10** F.L.A.G. and the three Tracks (Build & Sell, Brand & Influence, Money & Markets) are
live in the app but outside the 14-step spine. Tracks now appear on Page 1 because selection
is mandatory at entry. F.L.A.G. renders on no pilot screen and stays out of both workbooks.

**G-11** The app header no longer displays *Always Forward. Never Back.* — it now shows the
program name and age range. The workbooks keep the daily close as a brand element. Not a
conflict.

### DECISION REQUIRED

**D-1 — Mirror Check-In, Page 3. Recommend Option A: preparation for the full tablet Mirror.**

Reasoning. Option B asks the workbook to be a short paper Mirror that points to the fuller
tablet assessment. The tablet Mirror produces a scored, consequential result — Anchor, Growth
Edge, Learning Style — and the Growth Edge **selects the participant's FINISHER mission**. A
paper instrument would either be unscored, in which case it is preparation wearing a
different name, or scored differently, in which case a participant can hold two conflicting
reads of themselves in one session and the facilitator has to explain which one counts.

Option A avoids that entirely. Page 3 warms up the same six dimensions in plain language,
the participant answers honestly on paper, then takes the real assessment on the tablet and
writes their Anchor, Growth Edge, Learning Style and assigned mission into the workbook. One
result, one source, and the paper page still does real thinking work.

**This does not replace or redefine the existing Mirror. It adds nothing to it.**

---

## 5. Final Recommended Page Structure

Fourteen pages, both books, same number = same step. Foundation lane prints 5A/5B.
Cover + 14 = **15 printed pages** (Foundation: 16).

| Pg | YEP 7–17 | Y.A.E.P. 18–24 | Tablet Destination | Badge |
|----|---|---|---|---|
| 1 | Welcome — This Is a Process, Not a Program | Welcome — This Is a Process, Not a Program | Start screen: pathway, name, track | — |
| 2 | Power Name — Claim What They Call You | Power Name — Your Professional Identity | Start screen: Power Name · Weekly Module | → Identity Builder |
| 3 | Mirror Check-In — Read Yourself First | Mirror Check-In — An Honest Read | The Mirror + FINISHER (hub card 8) | status |
| 4 | Daily Quest — Problem Spotter | Daily Quest — Opportunity Spotter | Daily Quest | **Quest Starter** |
| 5 | Week 1 — Focus & Identity | Week 1 — Position & Purpose | Weekly Module | **Identity Builder** |
| 6 | S.T.E.M.Sin — Build Something That Solves a Problem | S.T.E.M.Sin — Turn a Tool Into Value | S.T.E.M.Sin Technology Quest | status |
| 7 | FINISHER Focus — Record Your Letters | FINISHER Focus — Record Your Letters | read-only across 3 screens | status |
| 8 | Reflection — What Moved You Forward | Reflection — What Moved the Work Forward | Reflection (inside Mirror loop) | status |
| 9 | Mirror XP & Progress | Mirror XP & Progress | My Process / Profile | — |
| 10 | Boss Challenge — 60-Second Solution | Boss Challenge — 60-Second Value Pitch | Boss Challenge | **Boss Move** |
| 11 | Mentor Spotlight — What a Mentor Does | Mentorship — Using Mentorship Strategically | Mentor Spotlight | status |
| 12 | Rewards & Badges | Rewards & Status | Rewards / Badges | — |
| 13 | My Process Page | My Process Page | My Process / Profile | — |
| 14 | Facilitator & Admin Proof Connection | Facilitator & Admin Proof Connection | Admin Review | — |

**Lane markers (YEP only), matched to the app's own labels:**
**▲ Foundation · Ages 7-10** — short sentences, visible problems, one worked example, largest
writing area, 5A/5B split ·
**■ Builder · Ages 11-13** — independent work, problem→solution, first money awareness ·
**● Momentum · Ages 14-17** — execution, market thinking, decisions, accountability.
One lane block per page. Y.A.E.P. carries no lane markers.

**Standing page furniture:**
- **WORKBOOK:** / **TABLET:** callouts on every activity page, tablet path verbatim from §2–3.
- Activity id in small facilitator text, real ids only (§1.1).
- Steps without a badge print **"Saved status only."**
- Sensitive-data rule on Pages 1 and 14: first name, Power Name, cohort. Nothing else.
- Sample-data rule echoing the app: use sample or non-sensitive information only until
  intake, consent, privacy, and permissions are approved.
- Daily close at the foot of Pages 1 and 13: **Always Forward. Never Back.**

---

## 6. What I Need From You

Four decisions, then I write full copy for both books plus the print-ready structure.

1. **D-1 — Mirror Page 3.** Approve Option A (preparation), or choose B.
2. **B-1 — Demo script.** Confirm the tablet demo always runs the Mirror loop, so pages 8–9
   have a destination and XP is non-zero.
3. **B-2 — Device protocol.** One tablet per participant, or facilitator records the readout
   before reset.
4. **A-1 / A-2 — App change requests.** Approve, defer, or decline surfacing participant
   writing on Admin Review and widening the Participant Profile. Either answer is workable —
   the workbook copy differs depending on it, so I need it before writing Pages 13 and 14.

Open naming items that can ride along: **G-6** (does S.T.E.M.Sin have an expansion?) and
**G-8** (what do we call an 18–24 participant?).

---
*A/1 Suppliers — YEP / Y.A.E.P. Proof-of-Concept Workbooks — Approval Package, Rev 2*
*Audited against `codex/yep-v1-tablet-pilot-2026-09-03` @ `f08d110`*
*Supplying the Tools. Supporting the Hustle.*
