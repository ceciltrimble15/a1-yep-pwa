# YEP / Y.A.E.P. Proof-of-Concept Workbooks — Approval Package (Rev 4)

**Status:** CEO decisions locked through Rev 3. Full copy **HELD** pending R-1…R-5 + tablet QA.
**Prepared for:** Cecil Trimble, Founder & CEO, A/1 Suppliers
**Audit basis:** `ceciltrimble15/a1-yep-pwa`, PR #2 — YEP V1 Tablet Pilot (Draft),
branch `codex/yep-v1-tablet-pilot-2026-09-03` @ `f08d1109e98c6e49442d86fd53825d98dda940d5`
**History:** Rev 1 audited `main` — discard. Rev 2 corrected the audit. Rev 3 locked CEO
decisions. Rev 4 adds S-1 approval, the FINISHER Focus screen spec, and the R-5 four-lane
architecture with its workbook consequence.

**Architecture statement now governing both app and workbooks:**
**One system. Four developmental lanes. Four distinct experiences. One common Process.**

---

## 1. CEO Decision Log — Locked

| Ref | Decision | Effect |
|---|---|---|
| **D-1** | Option A. Page 3 prepares for the tablet Mirror; the tablet Mirror is the authoritative scored assessment. No second scored paper Mirror. | Page 3 warms up the six dimensions, then records the tablet's **Anchor · Growth Edge · Learning Style · assigned FINISHER direction**. |
| **B-1 → R-1** | Clean path Page 3 → 7 → 8 → 9, plus a **dedicated FINISHER Focus destination**. | Page 7 prints one tablet path instead of three. |
| **B-2 → R-4** | One participant per device accepted. No sync/export required. Destructive reset without confirmation not accepted. | Page 14 states device-record scope; facilitator confirms before reset. |
| **A-1 → R-2** | Admin Review surfaces the already-persisted writing. | Page 14: status **+ the local pilot participant's saved proof**. Never described as a cloud-synced multi-participant backend. |
| **A-2 → R-3** | Participant Profile is the digital My Process page and summarizes pathway, Power Name, Mirror result, FINISHER direction/progress, activity completion, badges/status, saved proof. | Page 13 aligns field-for-field. |
| **XP** | No point values. Pilot activities award no XP. | Page 9 records the progress/XP the tablet displays. |
| **S-1** | **Approved — Option A.** Codex updates the three build strings to `S.T.E.M.Sin Technology + Problem-Solving Quest`. Does not define or invent the acronym's formal expansion. | Page 6 uses the approved label. Workbook and tablet identical. **Closed.** |
| **Terminology** | `Y.A.E.P. Participant` / `young adult participant`. Never "Yeppers" for 18–24. | Y.A.E.P. book uses those terms; YEP keeps **Yeppers**. |
| **R-5** | **Four-lane content separation.** Each lane carries its own content. Shared engine + four content experiences. Not four applications. | Workbook production model changes — see §4. |

---

## 2. Approved App Repairs — Acceptance Criteria

**R-1 — Clean Mirror sequence + dedicated FINISHER Focus destination.**

Path: Mirror Check-In → **FINISHER Focus** → assigned mission → Reflection → XP / Progress,
resumable if the tablet is closed and reopened.

New screen, titled exactly **`FINISHER Focus`**. Displays existing persisted/derived FINISHER
information **only** — no new assessment, no new score:
- Daily Quest → **Focus**
- S.T.E.M.Sin → **Innovation**
- Mirror Growth Edge / assigned FINISHER direction
- FINISHER mission status

Single action: **`Continue to My FINISHER Mission`** → routes to the existing assigned mission.

*Workbook dependency:* Page 7 collapses from three tablet paths to one. Pages 3, 8, 9 each
print a single path.

**R-2 — Admin Review surfaces saved writing.** `dailyQuestText`, `stemSinText`, `bossText`,
`mentorQuestion` displayed with the existing status cards. All four already persist in
`pilotProgress`; display change only. *Gates Page 14.*

**R-3 — Participant Profile widened** to the A-2 field list. *Gates Page 13.*

**R-4 — Reset confirmation safeguard.** `resetSession` must confirm and be cancellable.
*Gates Page 14's facilitator protocol.*

**S-1 — Label update.** Three strings: `pilotContent.js:21`, `pilotContent.js:55`,
`Home.jsx:54`. The short-form eyebrow at `PilotScreens.jsx:88` is unaffected.

**R-5 — Four-lane content separation.** Spec in §3.

---

## 3. R-5 — Content Model Restructure Spec

### What the build does today

`PROGRAM_CONTENT` has two keys, `yep` and `yaep`.
`getProgramContent(mode)` returns `mode === 'yaep' ? yaep : yep` — so Foundation, Builder and
Momentum all resolve to the same `yep` object. Four pathways are exposed; three share one
content experience.

### Good news: the seam already exists

`getProgramContent(mode)` is the **single content resolver**, called from nine sites — all
already mode-aware:
`Home.jsx:21` · `PilotScreens.jsx:30, 54, 83, 107, 127, 173, 197`.

Restructure the keys and the resolver and **every screen picks up lane content with no screen
edits**. This is a data-layer change, not a UI rewrite.

### Required changes

**3.1 — Four content objects,** keyed by the existing mode ids so no mapping layer is needed:

```
PROGRAM_CONTENT = {
  explorer: { … },   // Foundation · Ages 7-10
  builder:  { … },   // Builder · Ages 11-13
  leader:   { … },   // Momentum · Ages 14-17
  yaep:     { … },   // Y.A.E.P. · Ages 18-24
}
```

Each object carries its own `dailyQuest`, `weeklyModule` (with its three activities),
`stemSin`, `bossChallenge`, `mentorSpotlight` — plus two new fields the lanes need:
`homeCards` (see 3.2) and `reflectionPrompts` (see 3.3).

**3.2 — Two hardcoded ternaries bypass the content layer and must move into it.**
`Home.jsx:41` and `Home.jsx:62` read `mode === 'yaep' ? … : …`. That is lane copy living
outside `pilotContent.js`. Left as-is, Foundation and Momentum will silently show Builder's
hub-card text after the restructure. Move both strings into each lane's content object.

**3.3 — Reflection depth is a lane variable with no home in the data model.**
Reflection copy is currently hardcoded in `Reflection.jsx` and does not vary by mode at all.
R-5 lists reflection depth as a lane dimension, so it needs a `reflectionPrompts` array per
lane and `Reflection.jsx` needs to read from `getProgramContent(mode)`. **This is the one
screen edit R-5 actually requires.**

**3.4 — Resolver hardening.** `getProgramContent` must return a defined lane for any input
(fall back to `builder`, the `DEFAULT_MODE`) so an unknown or corrupted persisted `mode` never
renders an empty screen.

**3.5 — Delete the five dead legacy exports.** `DAILY_QUEST`, `WEEKLY_MODULE`, `STEM_SIN`,
`BOSS_CHALLENGE`, `MENTOR_SPOTLIGHT` (`pilotContent.js:82–86`) are defined, imported nowhere,
and hardcode `.yep`. After the restructure they are actively misleading.

**3.6 — Keep shared.** Process spine, navigation model, proof architecture, badge rules,
activity ids, Mirror/FINISHER engine, persistence shape. Lanes differ in **content**, never
in structure. Four content experiences on one engine — not four applications.

**3.7 — Activity ids stay stable across lanes.** `power-name`, `why`, `identity-map`,
`problem-spotter` / `opportunity-spotter` etc. remain the same ids in every lane, so the
proof chain and facilitator ids survive the split. Titles and prompts vary; ids do not.

---

## 4. Lane Content Specification — The Curriculum Deltas

This is the spec for both the app content objects and the workbook copy. Same source, so the
two cannot drift. Cosmetic lane markers are rejected — these are real differences.

| Dimension | ▲ Foundation 7-10 | ■ Builder 11-13 | ● Momentum 14-17 | Y.A.E.P. 18-24 |
|---|---|---|---|---|
| **Instructions** | One instruction per step, 8–12 words, one idea per line | Full sentences, max two steps per instruction | Single directive, assumes independence | Professional register, assumes self-direction |
| **Examples** | One fully worked example always shown before writing | One example, marked *"example — yours will be different"* | None by default; worked example in facilitator notes only | None; a standard is stated instead |
| **Daily Quest** | A problem you saw **today**, somewhere you actually were | Problem + who it affects + how often it happens | Problem + who + roughly how many + what it costs them in time, money, or opportunity | Opportunity + who pays or bears the cost + why it is open now + what makes it worth your time |
| **Week 1** | One word or short phrase per field; drawing accepted | One complete sentence per field, connected to something they actually do | Each field connects to a real next action with a date | Assets must be real and currently available, not aspirational |
| **S.T.E.M.Sin** | A **simple system** counts — a chart, a box, a timer, a sign. Drawing the idea is a valid answer | Name the tool **and** the person who would use it | Tool, user, test, and what would make you drop the idea | Tool, user, task, test result, and keep/change/drop with reasoning |
| **Boss Challenge** | Four short sentences, one per beat; practiced with a partner; reading from the page is fine | Full script, delivered standing, no notes by the third try | Script + one hard question you expect + your answer | Script + expected objection + answer; delivered standing, no notes |
| **Mentor language** | A mentor is a grown-up who already knows how. One question, one person, said out loud | The question cannot be answerable with yes or no | The question + how and when they will actually ask it | The ask is yours to make: what you need, who has done it, what you bring, how you close the loop |
| **Reflection depth** | One sentence per prompt; a drawing is an acceptable answer for what you are proud of | What was hard + what I would do differently, specific | What I would do differently becomes tomorrow's first action, written as a commitment | What I executed + **what I avoided and the honest reason** + what the result told me |
| **Business / money / problem-solving expectation** | **None.** Problems and helping. No pricing, customers, or profit | First awareness — would someone pay for this? what would it cost to make? No formal pricing | Market thinking — who else solves this, what would you charge, decision and accountability | Value, cost, trade-offs, and what you are willing to trade to get it |

**Unchanged across all four lanes:** the 14-step Process spine, the proof chain, FINISHER,
the three badges, activity ids, the Mirror instrument, the data rule, the AI rule, and the
real-people rule.

---

## 5. Workbook Production Model — Recommendation

**R-5 makes the Rev 3 production design obsolete.** "One book, one lane block per page" was
built on cosmetic markers, and cosmetic markers are now explicitly rejected. Three genuinely
distinct lanes cannot be printed three-up on a page a seven-year-old writes on — Foundation
needs the largest writing area and the simplest page, and it would be reading Momentum's
market-thinking prompts on the same sheet.

**Recommendation: one master, four printed editions — mirroring R-5 exactly.**

```
                    ONE CURRICULUM MASTER
                            │
      shared 14-page spine + proof chain + FINISHER + badges
                            │
   ┌────────────┬───────────┴────────┬──────────────┐
 YEP            YEP                YEP            Y.A.E.P.
 Foundation     Builder            Momentum       Edition
 Ages 7-10      Ages 11-13         Ages 14-17     Ages 18-24
```

The workbook production model then matches the app architecture verbatim:
**shared engine + four content experiences.** One system, four lanes, four distinct
experiences, one common Process — in print and on the tablet.

**Page classification across the four editions:**

| | Pages | Treatment |
|---|---|---|
| **Structurally shared** | 1, 2, 3, 7, 9, 12, 13, 14 | Same fields, same tablet path, same purpose in all four editions. Instruction voice and reading level still set per edition. |
| **Developmentally written per lane** | 4, 5, 6, 8, 10, 11 | Prompts, examples, standards and expectations written per §4. Six pages × four lanes. |

Every edition keeps the same 14-page map and the same page numbers, so a facilitator in a
mixed-age room still calls one page number. Foundation prints 5A/5B for writing room
(15 pages); the other three stay at 14.

**If you prefer one physical YEP book,** it is buildable — pages 4, 5, 6, 8, 10, 11 print as
three-page lane sets, giving a 32-page book where each participant uses fourteen pages and
ignores eighteen. I do not recommend it: it triples the print cost per participant, and it
puts Momentum's language in front of a seven-year-old. **Your call.**

---

## 6. Corrected Matrices

Chain: `WORKBOOK ENTRY → TABLET ACTION → SAVED PROGRESS → BADGE/STATUS → ADMIN REVIEW`
**⟳** = depends on an approved repair; re-verify on tablet before copy lock.
Lane deltas per §4 apply to the workbook-entry column on pages 4, 5, 6, 8, 10, 11.

### 6A. YEP — Foundation · Builder · Momentum

| Pg | Workbook Entry | Tablet Screen → Action | Persisted As | Badge / Status | Reviewer Sees |
|----|---|---|---|---|---|
| 1 | Circle lane; draft name; pick track | Start → `Choose Your Program Pathway` → `Your Name` (optional) → `Choose Your Track` → `Lock In` | `mode`, `youthName`, `track` | Session started | Admin Review: Program, Pathway · Profile: Program, Age Pathway, Track |
| 2 | Power Name + why it fits | Start → `Your Power Name` (**required**, 28 char max) · Weekly Module → tap `Power Name` | `powerName`; `power-name` in `weeklyCompleted` | → **Identity Builder** | Admin Review: Participant · Profile: Power Name · Home greeting |
| 3 | Six-dimension warm-up, then record the tablet's **Anchor · Growth Edge · Learning Style · assigned FINISHER direction** | ⟳ Mirror Check-In → 12 statements → Results | `mirrorScores`, `mirrorResult`, `currentMission` | Status only · **+50 Mirror XP** (first completion) | Profile: Anchor, Mirror XP ⟳ + Mirror result |
| 4 | Problem — lane standard per §4 | Home → `Daily Quest` → `Problem Spotter` → type → `Complete Daily Quest` | `dailyQuestText`, `dailyQuestComplete` | **Quest Starter** | Status `Complete` ⟳ **+ saved response** |
| 5 | All Week 1 writing — lane standard per §4 | Home → `Weekly Module` → `Week 1 — Focus & Identity` → tap `Power Name`, `Define Your Why`, `Identity Map` | `weeklyCompleted[]` — **ids only, no text** | **Identity Builder** at 3/3 | Admin Review: `Complete` or n/3 · Profile: Weekly Activities n/3 |
| 6 | Tool/system + what it does + who it helps — lane standard per §4 | Home → ⟳ `S.T.E.M.Sin Technology + Problem-Solving Quest` → `Build Something That Solves a Problem` → type → `Complete S.T.E.M.Sin Quest` | `stemSinText`, `stemSinComplete` | Status only. FINISHER Focus **Innovation** (read-only) | Status `Complete` ⟳ **+ saved response** |
| 7 | Record the FINISHER direction the app assigned | ⟳ **`FINISHER Focus`** → shows Focus, Innovation, Growth Edge / assigned direction, mission status → `Continue to My FINISHER Mission` | `finisherLetter` (mission letter) | Status only | ⟳ Profile: FINISHER direction/progress · Facilitator Demo View: letter chip |
| 8 | Reflection — lane depth per §4 | ⟳ Mirror sequence → mission → Reflection → submit | `reflection`, `reflectionSubmitted` | Status only · **+25 Mirror XP** | Admin Review: Mirror / FINISHER Loop · Facilitator Demo View shows text |
| 9 | Record the progress/XP the tablet displays. **No printed values.** | ⟳ Progress · `My Process / Profile` → read `Mirror XP` | `xp` (Mirror loop only) | Progress state | Profile: Mirror XP |
| 10 | 60-second script — lane standard per §4 | Home → `Boss Challenge` → `60-Second Solution` → type → `Complete Boss Challenge` | `bossText`, `bossComplete` | **Boss Move** | Status `Complete` ⟳ **+ saved response** |
| 11 | Mentor question — lane standard per §4 | Home → `Mentor Spotlight` → `What a Mentor Does` → type → `Save Mentor Question` | `mentorQuestion` (string, no completion flag) | Status only — `Question Saved` | Status `Saved` ⟳ **+ saved question** |
| 12 | Tick the three badges | Home → `Rewards / Badges` → `Proof Badge Log` | Derived at render | Quest Starter · Identity Builder · Boss Move | Admin Review: `Badges: n` · Profile: Proof Badges n/3 |
| 13 | Full carry-forward summary | Home → `My Process / Profile` → `Participant Profile` | Composite of stored fields | Session state | ⟳ pathway · Power Name · Mirror result · FINISHER direction/progress · activity completion · badges/status · saved proof |
| 14 | Facilitator sign-off | Home → `Admin Review` → `Workbook + Tablet Proof Readout` → `Open Facilitator Demo` | Device record only | Verified by facilitator | ⟳ Status cards **+ saved proof**. Not cloud-synced. |

### 6B. Y.A.E.P. — Ages 18–24

Same page numbers, same spine. `Y.A.E.P. Participant` / `young adult participant` throughout.

| Pg | Workbook Entry | Tablet Screen → Action | Persisted As | Badge / Status | Reviewer Sees |
|----|---|---|---|---|---|
| 1 | Confirm pathway; cohort; pick track | Start → `Choose Your Program Pathway` → **`Y.A.E.P. · Ages 18-24`** → `Your Name` → `Choose Your Track` → `Lock In` | `mode: 'yaep'`, `youthName`, `track` | Session started | Admin Review: Program `Y.A.E.P.`, Pathway · Profile: Program, Age Pathway, Track |
| 2 | Power Name + the evidence behind it | Start → `Your Power Name` (**required**) · Weekly Module → `Power Name` | `powerName`; `power-name` | → **Identity Builder** | Admin Review: Participant · Profile: Power Name |
| 3 | Six-dimension warm-up, then record **Anchor · Growth Edge · Learning Style · assigned FINISHER direction** | ⟳ Mirror Check-In → 12 statements → Results | `mirrorScores`, `mirrorResult`, `currentMission` | Status only · **+50 Mirror XP** | Profile: Anchor, Mirror XP ⟳ + Mirror result |
| 4 | Opportunity + who pays or bears the cost + why it is open + what makes it worth your time | Home → `Daily Quest` → `Opportunity Spotter` → type → `Complete Daily Quest` | `dailyQuestText`, `dailyQuestComplete` | **Quest Starter** | Status `Complete` ⟳ **+ saved response** |
| 5 | Week 1 writing: identity the Power Name represents · the problem/opportunity/future committed to · one skill, one relationship, one resource — **real and currently available** | Home → `Weekly Module` → `Week 1 — Position & Purpose` → tap `Power Name`, `Define Your Why`, **`Asset Map`** | `weeklyCompleted[]` — **ids only, no text** | **Identity Builder** at 3/3 | Admin Review: `Complete` or n/3 · Profile: Weekly Activities n/3 |
| 6 | Tool, **user, task, test result**, keep/change/drop with reasoning | Home → ⟳ `S.T.E.M.Sin Technology + Problem-Solving Quest` → `Turn a Tool Into Value` → type → `Complete S.T.E.M.Sin Quest` | `stemSinText`, `stemSinComplete` | Status only. FINISHER Focus **Innovation** (read-only) | Status `Complete` ⟳ **+ saved response** |
| 7 | Record the FINISHER direction the app assigned | ⟳ **`FINISHER Focus`** → `Continue to My FINISHER Mission` | `finisherLetter` | Status only | ⟳ Profile: FINISHER direction/progress |
| 8 | Reflection incl. **what I avoided and the honest reason** | ⟳ Mirror sequence → mission → Reflection → submit | `reflection`, `reflectionSubmitted` | Status only · **+25 Mirror XP** | Admin Review: Mirror / FINISHER Loop |
| 9 | Record the progress/XP the tablet displays. **No printed values.** | ⟳ Progress · `My Process / Profile` → `Mirror XP` | `xp` (Mirror loop only) | Progress state | Profile: Mirror XP |
| 10 | Pitch + expected objection + answer; standing, no notes | Home → `Boss Challenge` → `60-Second Value Pitch` → type → `Complete Boss Challenge` | `bossText`, `bossComplete` | **Boss Move** | Status `Complete` ⟳ **+ saved response** |
| 11 | What you need · who has done it · what you bring · how you close the loop | Home → `Mentor Spotlight` → `Using Mentorship Strategically` → type → `Save Mentor Question` | `mentorQuestion` (string, no flag) | Status only — `Question Saved` | Status `Saved` ⟳ **+ saved question** |
| 12 | Tick the three statuses | Home → `Rewards / Badges` → `Proof Badge Log` | Derived at render | Quest Starter · Identity Builder · Boss Move | Admin Review: `Badges: n` · Profile: Proof Badges n/3 |
| 13 | Full carry-forward summary | Home → `My Process / Profile` → `Participant Profile` | Composite of stored fields | Session state | ⟳ pathway · Power Name · Mirror result · FINISHER direction/progress · activity completion · badges/status · saved proof |
| 14 | Facilitator sign-off | Home → `Admin Review` → `Workbook + Tablet Proof Readout` | Device record only | Verified by facilitator | ⟳ Status cards **+ saved proof**. Pathway shows `Y.A.E.P.` |

---

## 7. Gap Register

### CLOSED BY CEO DECISION
D-1 (Option A) · A-6 (no XP — deliberate V1 choice) · G-6 (do not expand S.T.E.M.Sin) ·
G-8 (Y.A.E.P. Participant) · **S-1 (label — Option A approved)** · A-8 and G-7 (superseded
by R-1) · **A-5 (no FINISHER Focus screen — resolved by R-1)**.

### APPROVED REPAIRS IN FLIGHT — Codex
R-1 clean path + `FINISHER Focus` screen · R-2 Admin Review surfaces writing ·
R-3 Profile widened · R-4 reset confirmation · S-1 label · **R-5 four-lane content
separation**. All six gate final copy.

### OPEN — no decision yet

**A-3 — Identity Builder can be silently lost.** `toggleWeeklyActivity` un-checks and badges
are derived at render, so a mis-tap removes an earned badge with no warning. Cheap to fix
alongside R-4's confirmation pattern.

**A-4 — Mentor Spotlight has no completion flag.** Status is inferred from a non-empty
string; the only proof step without a real completion boolean.

**A-7 — Y.A.E.P. `Asset Map` carries the id `identity-map`.** Cosmetic; no workbook impact
since the workbook prints the title. R-5 touches this file anyway — worth fixing in passing,
but §3.7 keeps ids stable across lanes, so leaving it is also defensible.

### ACCEPTED V1 LIMITATIONS — stated honestly in the workbook
One participant per device; no accounts, sync, export or print · five of fourteen steps earn
no badge and print **"Saved status only"** · Week 1 stores three checkbox ids and no text, so
**the workbook is the sole record of the Week 1 responses** and Page 5 says so · Admin Review
is a local device readout · Cohort Dashboard is three `Sample` records plus one `Pilot`
record · badges carry *"No purchase or cash value is attached in this test."* · all 14 pages
are completable on paper if the tablet is unavailable · **A.Ai** is in the brand system but
not in the build and appears in neither workbook · F.L.A.G. renders on no pilot screen and
stays out · the app header shows program name + age range, not the daily close, which the
workbooks keep as a brand element.

---

## 8. Tablet QA Gate — Before Final Copy

| # | Check | Gates |
|---|---|---|
| 1 | From Page 3, a participant reaches the Mirror without hunting the hub | R-1 |
| 2 | `FINISHER Focus` screen exists and shows Focus, Innovation, Growth Edge / assigned direction, mission status | R-1 |
| 3 | `Continue to My FINISHER Mission` routes to the existing assigned mission | R-1 |
| 4 | No new assessment or second FINISHER score was introduced | R-1 |
| 5 | Reflection is reachable after the mission and resumes after close/reopen | R-1 |
| 6 | XP / Progress displays a number the participant can copy | R-1 |
| 7 | Admin Review shows Daily Quest, S.T.E.M.Sin, Boss Challenge and Mentor Question text | R-2 |
| 8 | Participant Profile shows all seven A-2 fields | R-3 |
| 9 | Reset prompts for confirmation and can be cancelled without data loss | R-4 |
| 10 | All three S.T.E.M.Sin strings read `S.T.E.M.Sin Technology + Problem-Solving Quest` | S-1 |
| 11 | **Each of the four lanes shows its own Daily Quest, Week 1, S.T.E.M.Sin, Boss Challenge, mentor language and reflection prompts** | R-5 |
| 12 | **Foundation, Builder and Momentum no longer render identical content** | R-5 |
| 13 | **Home hub card text varies by lane** (the two `Home.jsx` ternaries were moved into the content layer) | R-5 §3.2 |
| 14 | An unknown or corrupted persisted `mode` falls back to a valid lane, no empty screen | R-5 §3.4 |
| 15 | Activity ids and badge rules are unchanged across all four lanes | R-5 §3.7 |
| 16 | All three badges unlock from real actions and survive close/reopen | existing |
| 17 | Verbatim screen and control names captured for Pages 3, 6, 7, 8, 9, 13, 14 | R-1–R-3, S-1 |

Row 17 is the one I need handed back directly. Seven pages print a tablet path and I will not
guess at a label.

---

## 9. Next Actions

**Codex:** R-1, R-2, R-3, R-4, S-1, R-5 on `codex/yep-v1-tablet-pilot-2026-09-03`.
R-5 notes worth reading before starting: the resolver seam in §3 makes this a data-layer
change (nine call sites, no screen edits) **except** `Reflection.jsx`, which needs to become
mode-aware, and the two `Home.jsx` ternaries, which must move into the content objects.
PR #2 stays Draft until QA passes.

**Krisha:** run §8 on the physical tablet — pass/fail per row, plus the verbatim screen and
control names from row 17.

**Claude:** on QA pass — full copy for four editions (YEP Foundation, YEP Builder, YEP
Momentum, Y.A.E.P.) written to the §4 lane spec, final workbook-to-app audit against the
retested build, and the print-ready structure for PDF formatting.

**Cecil:** one open call — **§5, the workbook production model.** Four printed editions from
one master (recommended), or one 32-page YEP book with three-page lane sets.

---
*A/1 Suppliers — YEP / Y.A.E.P. Proof-of-Concept Workbooks — Approval Package, Rev 4*
*Audited against `codex/yep-v1-tablet-pilot-2026-09-03` @ `f08d110`*
*One system. Four developmental lanes. Four distinct experiences. One common Process.*
*Supplying the Tools. Supporting the Hustle.*
