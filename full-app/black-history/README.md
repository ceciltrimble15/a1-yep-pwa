# Full YEP App: Black American Entrepreneurship, Ownership and Infrastructure History Quests

**Scope:** Permanent full-app curriculum feature. **NOT** the current YEP proof-of-concept (POC) UI, PR #13, PR #14, or PR #16. No routes or production behavior changed in this branch.

## Non-negotiable editorial boundary
No sports-celebrity timelines, entertainment profiles, or music/art history as standalone content in this lane. We are teaching how Black Americans built enterprises, secured financing, acquired assets, patented inventions, organized labor and communities, created infrastructure and adapted to modern industries. If an arts or sports company is ever used, the focus must be documented ownership, contracts, financing or business operations, not fame. Avoid teaching that entrepreneurship is the only worthy path: skilled careers and collective institutions matter too.

## Product thesis
Black American history belongs in the YEP learning system year-round, but this lane has a deliberately specific lens: entrepreneurs, inventors, skilled workers, engineers, land and property ownership, banking, supply chains, institutions and infrastructure. Examine slavery, discrimination, Reconstruction and civil rights as essential context for who could own, build, work, borrow and participate economically. Teach documented contributions by both Black women and men, even if the youth cohort is boys-focused. Sports and entertainment celebrity history are outside this curriculum's main scope.

**Founder voice:** direct, plainspoken, high-expectation, and future-facing. Sample: "We are not doing history just to memorize names. We're learning who built, who organized, who was kept out, what they did about it, and what you can build next. Bring receipts. Ask questions. Finish the quest." This is proposed copy for founder approval, not a quote or historical source.

**Guardrails:** No fabricated quotes, fake archival imagery, exaggerated firsts, made-up numbers, or confusing interpretation with source evidence. Study oppression without reducing the full history to victimhood. Do not sanitize violence or use sensational imagery with children. Represent Black women, inventors, business owners, tradespeople, farmers, manufacturers, organizers, scholars and ordinary families faithfully. Modern subjects should be dated and updated, not depicted as historical certainty without sources.

## Placement in full application
Home > Explore Quests > **History + Heritage** (permanent category).
- Sub-lanes: Economic Roots and Resistance, Freedom and Property Rights, Cincinnati/Ohio Business History, Black Banks and Finance, Inventors and Patents, Electrical/Construction Infrastructure, Agriculture and Land, Logistics and Manufacturing, Modern Black Enterprise and AI, Living Local Business History.
- Modes: Listen & Reflect, Business Timeline, Patent Detective, Ledger and Budget Lab, Map the Infrastructure, Inventor Challenge, Oral Business History, Ownership Evidence Review, Compare Then/Now, Build for the Future.
- Launch as elective or assigned by a facilitator. Quests are never paywalled for youth.
- Age bands 7–10, 11–13, 14–17, 18–24 share a topic ID but have separate reading length, content notes, methods and evidence requirements.
- Integrate with **FINISHER**, **F.L.A.G.**, Real Life Quests, A.Ai, facilitator review, progress and rewards. Do not create a second XP economy or a second youth identity store.
- No separate login; use the full-app user identity, existing permissions and progress model when that infrastructure exists.
- Curriculum structure must also work offline with preloaded accessible text and non-copyright-restricted visual resources.

## Single-quest flow
1. **The Hook (20–40 seconds):** founder-tone original opening; no invented historical dialogue
2. **The Receipts:** 1–3 sources with author/institution, date and direct link; label primary/secondary and "updated on"
3. **What really happened:** context, documented facts, uncertainty and contrasting accounts when warranted
4. **Then / Now / Next:** bridge to everyday life, ownership, technology, community
5. **Do the Quest:** action with age-appropriate artifact; hands-on elements supervised when needed
6. **F.L.A.G. reflection:** Focus; Life vs. Dead Day; Alignment; Growth
7. **FINISHER proof:** completed activity / source checked / lesson explained / facilitator verified, then XP and appropriate milestone.
8. **Review path:** source corrections, feedback and instructor editorial approval.

## Example age progression: Garrett Morgan, traffic-signal safety
- 7–10: Recognize a safer crossing and draw a stop/wait/go scenario.
- 11–13: Identify an intersection problem and compare Morgan's three-way device with earlier signals.
- 14–17: Cite patent history, model an intersection and measure possible risk-reduction reasoning.
- 18–24: Draft a community safety proposal with cost, accessibility and infrastructure constraints.
- **Critical fact check:** Morgan patented a mechanical signal in 1923; do not assert he invented the first traffic light or today's modern electric yellow light.

## Content system and editor fields
Each quest should store: id, slug, era, dateRange, region, subjectPeople, track, ageVariants, accessibilityText, audioScript, sourceRecords, sourceTrustLevel, verifiedFactNotes, historicDisputes, triggerNotes, reflectionPrompts, activityInstructions, safeSupervision, requiredMaterials, evidenceType, FINISHER skillTags, FLAG prompts, difficulty, duration, XP policy, publishStatus, authoredBy, reviewedBy, reviewedAt, revisedAt, version.
- Source metadata must contain URL, institution, title, original publication date if known, archival/modern status, access date, and quotation rights.
- All modern events need refresh policy (e.g. 90-day editorial review for developing subjects), and source-backed updates.
- Keep source text and founder commentary in separate labeled fields. A.Ai may discuss the source; it must never invent a citation.
- Avatar/voice recording requires approved rights and a clear human vs. generated label where necessary.
- The catalog file is a **seed**, not yet an approved published lesson; each of 18 seed entries is marked editorial-review-required. Every activity must connect to economic agency, ownership, business operations or infrastructure; otherwise it belongs in a different curriculum lane.

## Safety and privacy
- No identifying youth interviews, faces, geolocation, medical data or voice recording uploaded by default.
- Under-18 participation in oral histories requires facilitator supervision, guardian-consent procedures if applicable, and interviewee permission. Prefer published archival recordings before collecting new ones.
- No unsupervised electricity, live wiring, tools or visits; supervised or simulated only.
- Graphic historical harms require age-sensitive summaries, content notes and an opt-in adult-supported extended lesson.
- No live external AI chat for minors without safeguarding, moderation and validated retrieval.

## Acceptance gates
- [ ] A dedicated History + Heritage category appears in the FULL app, not the existing POC navigation.
- [ ] 18 seed quests load via a shared catalog adapter, with at least 3 varied quest formats working end-to-end.
- [ ] Content reviewers approve accuracy and exact founder tone; sources render and open reliably.
- [ ] 4 age bands display materially different tasks with accessible audio/text and readable layouts.
- [ ] Quests persist progress offline, restore after closing and sync safely when online.
- [ ] Reflect via F.L.A.G.; reward via FINISHER; facilitators can verify supervised activity.
- [ ] No extra unapproved account, XP system, data collection, or youth uploads.
- [ ] Phone and tablet portrait/landscape accessible; touch targets and audio controls work.
- [ ] Modern stories show source and as-of date; corrections update without losing prior completion records.
- [ ] Real minors' data, image consent, moderation and compliance reviewed before release.

## Build sequence
A. Lock editorial voice and full-app information architecture.
B. Connect this data catalog to the full-app quest engine once the full app is separated from POC release path.
C. Publish the first 6 fact-checked quests (historic, local, STEM, modern) to a protected staging build.
D. Test age bands and facilitator verification, then expand.
E. Add additional Black History modules each month with versioned editorial evidence, not only on Black History Month.

## Proof and kill criteria
**Proof:** Youth can complete an age-fitting mission, cite or identify what they learned, demonstrate a real-world skill or source check, and return later without losing progress. Facilitator can verify it. At least 90% of tested quest flows complete successfully before release; measure learning with a short baseline / post-quest check, not empty completion clicks.

**Hold launch** when factual claims are unverified, youth safety is unresolved, content is too advanced for an age band, or offline progress loses work. **Kill individual content** when a claim cannot be sourced or the activity cannot be delivered safely.

**Implementation note:** The current repo's main app is a POC-style React Vite application (`src/App.jsx` switches between POC screens). This feature lives in `full-app/black-history/` and is intentionally not imported by `src/App.jsx`. Build a proper full-app shell/quest engine first, then wire it in. Never sneak this into the POC as an unreviewed feature.
