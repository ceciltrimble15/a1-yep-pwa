# YEP / Y.A.E.P. Proof-of-Concept Workbooks — Approval Package (Rev 3)

**Status:** CEO decisions locked. Full workbook copy **HELD** pending app repairs + tablet QA.
**Prepared for:** Cecil Trimble, Founder & CEO, A/1 Suppliers
**Audit basis:** `ceciltrimble15/a1-yep-pwa`, PR #2 — YEP V1 Tablet Pilot (Draft),
branch `codex/yep-v1-tablet-pilot-2026-09-03` @ `f08d1109e98c6e49442d86fd53825d98dda940d5`
**History:** Rev 1 audited `main` and was wrong — discard. Rev 2 corrected the audit.
Rev 3 folds in CEO decisions and the approved app repairs.

---

## 0. Where This Stands

The chain is `CURRENT APP → WORKBOOK ALIGNMENT → CONTENT REVIEW → APPROVED APP CHANGE → FINAL LOCK`.
We are at **APPROVED APP CHANGE**.

Four repairs are approved and owned by Codex. The workbooks are written against that
approved post-repair behavior, not against `f08d110` as it stands today. Final copy is
withheld until those repairs are committed and physically retested on the tablet.

Throughout §3 and §4, **⟳** marks a cell whose behavior depends on an approved repair and
must be re-verified on the tablet before copy is locked. Everything unmarked is verified
against `f08d110` as built.

---

## 1. CEO Decision Log — Locked

| Ref | Decision | Effect on the workbooks |
|---|---|---|
| **D-1** | **Option A approved.** Page 3 is preparation for the tablet Mirror. The tablet Mirror is the authoritative scored assessment. No second scored paper Mirror. | Page 3 warms up the six dimensions on paper, then records the tablet's **Anchor · Growth Edge · Learning Style · assigned FINISHER direction**. |
| **B-1** | **App repair required.** A facilitated participant must move cleanly through Page 3 → Page 7 → Page 8 → Page 9. Do not write around the navigation. | Pages 3, 7, 8, 9 are written against a clean resume/direct path. The Rev 2 "facilitator jumps to hub card 8" workaround is deleted. |
| **B-2** | **One participant per device accepted** for the POC. No backend sync or export required. **Destructive reset without confirmation is not accepted** — a reset confirmation safeguard is required. | Page 14 states the device-record scope plainly and instructs the facilitator to confirm before reset. No claim of sync or export. |
| **A-1** | **Approved.** Admin Review will surface the already-persisted writing: Daily Quest response, S.T.E.M.Sin response, Boss Challenge response, Mentor Question. | Page 14 describes Admin Review as showing **completion status + the local pilot participant's saved proof**. Explicitly **not** a cloud-synced multi-participant production backend. |
| **A-2** | **Approved.** Participant Profile / My Process is the digital My Process proof page and summarizes pathway, Power Name, Mirror result, FINISHER direction/progress, activity completion, badges/status, and saved proof available in the build. | Page 13 aligns field-for-field to that summary. |
| **XP** | **No point values.** Pilot activities currently award no XP. | Page 9 instructs the participant to record the progress/XP the tablet actually displays. No printed numbers, no invented economy. |
| **S.T.E.M.Sin** | **Do not expand the acronym** — the formal expansion is not locked in the master curriculum. Use **`S.T.E.M.Sin Technology + Problem-Solving Quest`**, with YEP `Build Something That Solves a Problem` and Y.A.E.P. `Turn a Tool Into Value`. | Page 6 uses the approved label and no expansion. **Creates one naming delta with the current build — see S-1 below.** |
| **Terminology** | Y.A.E.P. participants are **`Y.A.E.P. Participant`** or **`young adult participant`**. Never "Yeppers". | Y.A.E.P. workbook uses those terms throughout. YEP workbook keeps **Yeppers** per the brand system. |

Rev 2 open items G-6 (acronym) and G-8 (18–24 terminology) are **closed** by the above.

---

## 2. Approved App Repairs — What Each Must Deliver for the Workbook

These are the acceptance criteria the workbook copy will assume. Codex owns implementation;
this is the spec the printed pages will depend on.

**R-1 (from B-1) — Clean path through the Mirror / FINISHER sequence.**
A facilitated participant must be able to reach, in order and without hunting the hub:
Mirror Check-In → assigned FINISHER mission → Reflection → XP / Progress, and resume mid-way
if the tablet is closed and reopened.
*Workbook dependency:* Pages 3, 7, 8 and 9 each print a single tablet path. **I need the final
screen and control names before those four pages are typeset.**
*Open spec question for Codex:* does the repair give Page 7 a dedicated FINISHER destination,
or does it route straight to the assigned mission? Page 7 currently sends the participant to
three screens to fill one page (Daily Quest for `Focus`, S.T.E.M.Sin for `Innovation`, Mirror
Results for the mission letter). One destination would collapse that to one path.

**R-2 (from A-1) — Admin Review surfaces saved writing.**
`dailyQuestText`, `stemSinText`, `bossText`, `mentorQuestion` displayed alongside the existing
status cards. All four are already persisted in `pilotProgress`; this is a display change.
*Workbook dependency:* Page 14 tells the facilitator they can read the participant's actual
responses on the tablet. That sentence is false until R-2 ships.

**R-3 (from A-2) — Participant Profile widened.**
Adds to the existing nine fields: FINISHER direction/progress, Daily Quest / Boss Challenge /
Mentor completion, and the saved proof available in the build.
*Workbook dependency:* Page 13 is the show-an-adult page and lists which fields the tablet
mirrors. The field list is the page.

**R-4 (from B-2) — Reset confirmation safeguard.**
`resetSession` must confirm before wiping. Today it clears `yep_session_v1` and every state
field with no prompt and no recovery.
*Workbook dependency:* Page 14's facilitator protocol. Low copy impact, real operational risk.

---

## 3. Corrected Matrices

Chain: `WORKBOOK ENTRY → TABLET ACTION → SAVED PROGRESS → BADGE/STATUS → ADMIN REVIEW`
**⟳** = depends on an approved repair; re-verify on tablet before copy lock.

### 3A. YEP — Ages 7–17

| Pg | Workbook Entry | Tablet Screen → Action | Persisted As | Badge / Status | Reviewer Sees |
|----|---|---|---|---|---|
| 1 | Circle pathway; draft name; pick track | Start → `Choose Your Program Pathway` → `Your Name` (optional) → `Choose Your Track` → `Lock In` | `mode`, `youthName`, `track` | Session started | Admin Review: Program, Pathway · Profile: Program, Age Pathway, Track |
| 2 | Power Name + why it fits | Start → `Your Power Name` (**required**, 28 char max) · then Weekly Module → tap `Power Name` | `powerName`; `power-name` in `weeklyCompleted` | → **Identity Builder** | Admin Review: Participant · Profile: Power Name · Home greeting |
| 3 | Six-dimension warm-up on paper, then record the tablet's **Anchor · Growth Edge · Learning Style · assigned FINISHER direction** | ⟳ Mirror Check-In → 12 statements (Not yet / Sometimes / Mostly / Always) → Results | `mirrorScores`, `mirrorResult`, `currentMission` | Status only · **+50 Mirror XP** (first completion) | Profile: Anchor, Mirror XP ⟳ + Mirror result · Admin Review: Mirror / FINISHER Loop |
| 4 | Problem in one sentence + one way technology or better organization could help | Home → `Daily Quest` → `Problem Spotter` → type → `Complete Daily Quest` | `dailyQuestText`, `dailyQuestComplete` | **Quest Starter** | Status `Complete` ⟳ **+ the saved response** |
| 5 | All Week 1 writing: why the Power Name fits · the problem you care about in one sentence · one skill, one interest, one value | Home → `Weekly Module` → `Week 1 — Focus & Identity` → tap `Power Name`, `Define Your Why`, `Identity Map` | `weeklyCompleted[]` — **ids only, no text** | **Identity Builder** at 3/3 | Admin Review: `Complete` or n/3 · Profile: Weekly Activities n/3 |
| 6 | Problem carried from Pg 4 + tool / app / device / AI idea / simple system, what it does, who it helps | Home → S.T.E.M.Sin → `Build Something That Solves a Problem` → type → `Complete S.T.E.M.Sin Quest` | `stemSinText`, `stemSinComplete` | Status only. FINISHER Focus **Innovation** (read-only) | Status `Complete` ⟳ **+ the saved response** |
| 7 | Record the FINISHER direction the app assigned | ⟳ Single path per R-1. Today: `Focus` on Daily Quest, `Innovation` on S.T.E.M.Sin, mission letter on Mirror Results | `finisherLetter` (mission letter only) | Status only | ⟳ Profile: FINISHER direction/progress · Facilitator Demo View: letter chip |
| 8 | Reflection answers | ⟳ Mirror sequence → mission → Reflection → submit | `reflection`, `reflectionSubmitted` | Status only · **+25 Mirror XP** | Admin Review: Mirror / FINISHER Loop · Facilitator Demo View shows reflection text |
| 9 | Record the progress/XP the tablet displays. **No printed values.** | ⟳ Progress screen · `My Process / Profile` → read `Mirror XP` | `xp` (Mirror loop only) | Progress state | Profile: Mirror XP |
| 10 | 60-second script: problem, solution, who it helps, first step | Home → `Boss Challenge` → `60-Second Solution` → type → `Complete Boss Challenge` | `bossText`, `bossComplete` | **Boss Move** | Status `Complete` ⟳ **+ the saved response** |
| 11 | One question you would ask a mentor | Home → `Mentor Spotlight` → `What a Mentor Does` → type → `Save Mentor Question` | `mentorQuestion` (string, no completion flag) | Status only — `Question Saved` | Status `Saved` ⟳ **+ the saved question** |
| 12 | Tick the three badges | Home → `Rewards / Badges` → `Proof Badge Log` | Derived at render, not stored | Quest Starter · Identity Builder · Boss Move | Admin Review: `Badges: n` · Profile: Proof Badges n/3 |
| 13 | Full carry-forward summary | Home → `My Process / Profile` → `Participant Profile` | Composite of stored fields | Session state | ⟳ pathway · Power Name · Mirror result · FINISHER direction/progress · activity completion · badges/status · saved proof |
| 14 | Facilitator sign-off | Home → `Admin Review` → `Workbook + Tablet Proof Readout` → `Open Facilitator Demo` | Device record only | Verified by facilitator | ⟳ Status cards **+ the local pilot participant's saved proof**. Not cloud-synced. |

### 3B. Y.A.E.P. — Ages 18–24

Same page numbers. Adult framing. `Y.A.E.P. Participant` / `young adult participant` throughout.

| Pg | Workbook Entry | Tablet Screen → Action | Persisted As | Badge / Status | Reviewer Sees |
|----|---|---|---|---|---|
| 1 | Confirm pathway; cohort; pick track | Start → `Choose Your Program Pathway` → **`Y.A.E.P. · Ages 18-24`** → `Your Name` → `Choose Your Track` → `Lock In` | `mode: 'yaep'`, `youthName`, `track` | Session started | Admin Review: Program `Y.A.E.P.`, Pathway · Profile: Program, Age Pathway, Track |
| 2 | Power Name + the evidence behind it | Start → `Your Power Name` (**required**) · Weekly Module → `Power Name` (*"Define the professional or entrepreneurial identity your Power Name represents."*) | `powerName`; `power-name` | → **Identity Builder** | Admin Review: Participant · Profile: Power Name |
| 3 | Six-dimension warm-up, then record the tablet's **Anchor · Growth Edge · Learning Style · assigned FINISHER direction** | ⟳ Mirror Check-In → 12 statements → Results | `mirrorScores`, `mirrorResult`, `currentMission` | Status only · **+50 Mirror XP** | Profile: Anchor, Mirror XP ⟳ + Mirror result |
| 4 | Opportunity, who it affects, one practical way to create value | Home → `Daily Quest` → `Opportunity Spotter` → type → `Complete Daily Quest` | `dailyQuestText`, `dailyQuestComplete` | **Quest Starter** | Status `Complete` ⟳ **+ the saved response** |
| 5 | All Week 1 writing: the identity the Power Name represents · the problem, opportunity or future you are committed to · one skill, one relationship, one resource | Home → `Weekly Module` → `Week 1 — Position & Purpose` → tap `Power Name`, `Define Your Why`, **`Asset Map`** | `weeklyCompleted[]` — **ids only, no text** | **Identity Builder** at 3/3 | Admin Review: `Complete` or n/3 · Profile: Weekly Activities n/3 |
| 6 | Opportunity from Pg 4 + digital tool / AI workflow / device / system, **the user, the task, the result you would test first** | Home → S.T.E.M.Sin → `Turn a Tool Into Value` → type → `Complete S.T.E.M.Sin Quest` | `stemSinText`, `stemSinComplete` | Status only. FINISHER Focus **Innovation** (read-only) | Status `Complete` ⟳ **+ the saved response** |
| 7 | Record the FINISHER direction the app assigned | ⟳ Single path per R-1 | `finisherLetter` (mission only) | Status only | ⟳ Profile: FINISHER direction/progress |
| 8 | Reflection incl. what you avoided and the honest reason | ⟳ Mirror sequence → mission → Reflection → submit | `reflection`, `reflectionSubmitted` | Status only · **+25 Mirror XP** | Admin Review: Mirror / FINISHER Loop |
| 9 | Record the progress/XP the tablet displays. **No printed values.** | ⟳ Progress · `My Process / Profile` → `Mirror XP` | `xp` (Mirror loop only) | Progress state | Profile: Mirror XP |
| 10 | Pitch: opportunity, value created, who benefits, next concrete move | Home → `Boss Challenge` → `60-Second Value Pitch` → type → `Complete Boss Challenge` | `bossText`, `bossComplete` | **Boss Move** | Status `Complete` ⟳ **+ the saved response** |
| 11 | One specific question about business, career, money, or next move | Home → `Mentor Spotlight` → `Using Mentorship Strategically` → type → `Save Mentor Question` | `mentorQuestion` (string, no flag) | Status only — `Question Saved` | Status `Saved` ⟳ **+ the saved question** |
| 12 | Tick the three statuses | Home → `Rewards / Badges` → `Proof Badge Log` | Derived at render | Quest Starter · Identity Builder · Boss Move | Admin Review: `Badges: n` · Profile: Proof Badges n/3 |
| 13 | Full carry-forward summary | Home → `My Process / Profile` → `Participant Profile` | Composite of stored fields | Session state | ⟳ pathway · Power Name · Mirror result · FINISHER direction/progress · activity completion · badges/status · saved proof |
| 14 | Facilitator sign-off | Home → `Admin Review` → `Workbook + Tablet Proof Readout` | Device record only | Verified by facilitator | ⟳ Status cards **+ saved proof**. Pathway shows `Y.A.E.P.` |

---

## 4. Gap Register — Re-Triaged Against CEO Decisions

### CLOSED BY CEO DECISION

| Ref | Was | Now |
|---|---|---|
| D-1 | Open decision — Mirror A or B | **Closed. Option A.** |
| A-6 | App change request — pilot steps award no XP | **Closed as a deliberate V1 choice.** No point values. Page 9 records what the tablet shows. |
| G-6 | Does S.T.E.M.Sin have an expansion? | **Closed. Do not expand.** Approved label locked. |
| G-8 | What do we call an 18–24 participant? | **Closed.** `Y.A.E.P. Participant` / `young adult participant`. |
| A-8 | Hub order vs approved spine | **Superseded by R-1.** |
| G-7 | Facilitator jumps to hub card 8 at Page 3 | **Superseded by R-1.** Workaround deleted. |

### APPROVED APP REPAIRS — in flight, Codex owns

R-1 clean Mirror→FINISHER→Reflection→XP path (from B-1) ·
R-2 Admin Review surfaces saved writing (from A-1) ·
R-3 Participant Profile widened (from A-2) ·
R-4 reset confirmation safeguard (from B-2).
Acceptance criteria in §2. All four gate the final copy.

### OPEN APP CHANGE REQUESTS — flagged, no decision yet

**S-1 — S.T.E.M.Sin label delta. NEW, needs your call.**
The approved label is **`S.T.E.M.Sin Technology + Problem-Solving Quest`**. The build says
**`S.T.E.M.Sin Technology Quest`** in three places:
`pilotContent.js:21` and `:55` (both quest titles) and `Home.jsx:54` (hub card).
The eyebrow at `PilotScreens.jsx:88` renders the short form `S.T.E.M.Sin` and is unaffected.
Under the source-of-truth rule I will not print a label the tablet does not show.
*Options:* (a) Codex updates the three strings while already in the repair batch — 3-line
change, keeps workbook and tablet identical; or (b) the workbook prints the current
`Technology Quest` label and the longer form waits for the master curriculum.
**Recommend (a).**

**A-3 — Identity Builder can be silently lost.** `toggleWeeklyActivity` un-checks and badges
are derived at render, so a mis-tap removes an earned badge with no warning. Cheap to fix
while R-4's confirmation pattern is being added.

**A-4 — Mentor Spotlight has no completion flag.** Status is inferred from a non-empty
string. The only proof step without a real completion boolean.

**A-7 — Y.A.E.P. `Asset Map` carries the id `identity-map`.** Cosmetic; the workbook prints
the title, so no workbook impact today. Note only.

### ACCEPTED V1 LIMITATIONS — stated honestly in the workbook

- One participant per device. No accounts, no sync, no export or print. *(B-2 accepted.)*
- Five of fourteen steps earn no badge — Mirror, S.T.E.M.Sin, FINISHER Focus, Reflection,
  Mentor. Workbook prints **"Saved status only."** No badge invented.
- Week 1 stores three checkbox ids and no text. **The workbook is the sole record of the
  Week 1 responses**, and Page 5 says so in facilitator text.
- Admin Review is a local device readout. Post-R-2 it shows status **and** the local
  participant's saved proof — never described as a synced multi-participant backend.
- Cohort Dashboard is three sample records plus one live record, already labeled
  `Sample` / `Pilot` / `Demo XP`. Not presented as a cohort report.
- Badges carry the app's own line: *"No purchase or cash value is attached in this test."*
- All 14 pages are completable on paper if the tablet is unavailable; only the save waits.
- **A.Ai** is in the brand system but not in the build. It appears in neither workbook.
- F.L.A.G. renders on no pilot screen and stays out of both workbooks. Tracks appear on
  Page 1 only because selection is mandatory at entry.
- The app header shows program name + age range, not *Always Forward. Never Back.* The
  workbooks keep the daily close as a brand element. Not a conflict.

---

## 5. Final Page Structure — Locked

Fourteen pages, both books, same number = same step. Foundation lane prints 5A/5B.
Cover + 14 = **15 printed pages** (Foundation: 16).

| Pg | YEP 7–17 | Y.A.E.P. 18–24 | Tablet Destination | Badge |
|----|---|---|---|---|
| 1 | Welcome — This Is a Process, Not a Program | Welcome — This Is a Process, Not a Program | Start: pathway, name, track | — |
| 2 | Power Name — Claim What They Call You | Power Name — Your Professional Identity | Start: Power Name · Weekly Module | → Identity Builder |
| 3 | Mirror Check-In — Read Yourself First | Mirror Check-In — An Honest Read on Where You Stand | ⟳ Mirror Check-In | status |
| 4 | Daily Quest — Problem Spotter | Daily Quest — Opportunity Spotter | Daily Quest | **Quest Starter** |
| 5 | Week 1 — Focus & Identity | Week 1 — Position & Purpose | Weekly Module | **Identity Builder** |
| 6 | S.T.E.M.Sin Technology + Problem-Solving Quest — Build Something That Solves a Problem | S.T.E.M.Sin Technology + Problem-Solving Quest — Turn a Tool Into Value | S.T.E.M.Sin Quest *(label pending S-1)* | status |
| 7 | FINISHER Focus — Record Your Direction | FINISHER Focus — Record Your Direction | ⟳ per R-1 | status |
| 8 | Reflection — What Moved You Forward | Reflection — What Moved the Work Forward | ⟳ Reflection | status |
| 9 | Mirror XP & Progress | Mirror XP & Progress | ⟳ Progress · My Process / Profile | — |
| 10 | Boss Challenge — 60-Second Solution | Boss Challenge — 60-Second Value Pitch | Boss Challenge | **Boss Move** |
| 11 | Mentor Spotlight — What a Mentor Does | Mentorship — Using Mentorship Strategically | Mentor Spotlight | status |
| 12 | Rewards & Badges | Rewards & Status | Rewards / Badges | — |
| 13 | My Process Page | My Process Page | ⟳ My Process / Profile | — |
| 14 | Facilitator & Admin Proof Connection | Facilitator & Admin Proof Connection | ⟳ Admin Review | — |

**Lane markers (YEP only), matched to the app's own labels:**
**▲ Foundation · Ages 7-10** — short sentences, concrete visible problems, one worked
example, largest writing area, prints 5A/5B ·
**■ Builder · Ages 11-13** — independent work, problem→solution, first money and customer
awareness ·
**● Momentum · Ages 14-17** — execution, market thinking, decisions, accountability,
leadership.
One lane block per page. **Y.A.E.P. carries no lane markers.**

**Standing page furniture (both books):**
- **WORKBOOK:** / **TABLET:** callouts on every activity page, tablet paths verbatim from §3.
- Activity id in small facilitator text — real ids only: `power-name` · `why` ·
  `identity-map` · `problem-spotter` / `opportunity-spotter` · `week-1-focus-identity` /
  `week-1-position-purpose` · `build-something-that-solves-a-problem` /
  `turn-a-tool-into-value` · `sixty-second-solution` / `sixty-second-value-pitch` ·
  badges `daily-quest` · `weekly-module` · `boss-challenge`.
- Steps without a badge print **"Saved status only."**
- AI rule on Page 6: AI may support thinking, it does not produce the participant's work;
  write what you asked and what you decided.
- Real-people rule on Page 11.
- Data rule on Pages 1 and 14: first name, Power Name, cohort only. Sample or non-sensitive
  information only until intake, consent, privacy, and permissions are approved.
- Daily close at the foot of Pages 1 and 13: **Always Forward. Never Back.**

---

## 6. Tablet QA Gate — What Must Pass Before Final Copy

Final copy is written after these are committed on the pilot branch and physically retested
on the tablet. Suggested pass/fail list for the retest:

| # | Check | Gates |
|---|---|---|
| 1 | From Page 3, a participant reaches the Mirror and completes it without hunting the hub | R-1 |
| 2 | After the Mirror, the assigned FINISHER direction is reachable in one step | R-1 |
| 3 | Reflection is reachable after the mission, and resumes after the tablet is closed and reopened | R-1 |
| 4 | XP / Progress is reachable and displays a number the participant can copy | R-1 |
| 5 | Admin Review shows the Daily Quest response text | R-2 |
| 6 | Admin Review shows the S.T.E.M.Sin response text | R-2 |
| 7 | Admin Review shows the Boss Challenge response text | R-2 |
| 8 | Admin Review shows the Mentor Question text | R-2 |
| 9 | Participant Profile shows pathway, Power Name, Mirror result, FINISHER direction/progress, activity completion, badges/status, saved proof | R-3 |
| 10 | Reset prompts for confirmation and can be cancelled without data loss | R-4 |
| 11 | Both pathways demo end to end: YEP (each of the three lanes) and Y.A.E.P. | existing |
| 12 | All three badges unlock from real actions and survive a close/reopen | existing |
| 13 | Final screen labels captured verbatim for typesetting Pages 3, 7, 8, 9, 13, 14 | R-1–R-3 |

Item 13 is the one I need handed back to me directly — the final screen and control names.
Six pages print a tablet path and I will not guess at a label.

---

## 7. Next Actions

**Codex:** R-1, R-2, R-3, R-4 on `codex/yep-v1-tablet-pilot-2026-09-03`. S-1 recommended for
the same batch (3 strings). PR #2 stays Draft until QA passes.

**Krisha:** run §6 on the physical tablet, return pass/fail per row plus the verbatim screen
and control names from item 13.

**Claude:** on QA pass — full YEP copy, full Y.A.E.P. copy, final workbook-to-app audit
against the retested build, and the print-ready structure for PDF formatting.

**Cecil:** one open call — **S-1**, the S.T.E.M.Sin label. Recommend (a), update the three
strings so workbook and tablet read identically.

---
*A/1 Suppliers — YEP / Y.A.E.P. Proof-of-Concept Workbooks — Approval Package, Rev 3*
*Audited against `codex/yep-v1-tablet-pilot-2026-09-03` @ `f08d110`*
*Supplying the Tools. Supporting the Hustle.*
