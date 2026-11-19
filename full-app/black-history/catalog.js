/**
 * FULL YEP APP ONLY: editorial seed catalog. Not imported into the existing POC.
 * Every entry requires historical and age-band review before publication.
 * Voice is a working founder-style draft, not a claimed verbatim recording.
 */
export const BLACK_HISTORY_CATALOG_VERSION = '0.1-editorial';
export const BLACK_HISTORY_AGE_BANDS = [
  { id: '7-10', min: 7, max: 10, reading: 'short narration + illustrated choices', evidence: 'drawing, voice or one-sentence answer' },
  { id: '11-13', min: 11, max: 13, reading: 'short source excerpt + visual comparison', evidence: 'comparison, explanation or guided project' },
  { id: '14-17', min: 14, max: 17, reading: 'two sources + evidence-based reasoning', evidence: 'source analysis, project plan or supervised activity' },
  { id: '18-24', min: 18, max: 24, reading: 'primary sources + economic and systems context', evidence: 'research memo, practical build plan or field project' }
];
export const BLACK_HISTORY_QUESTS = [
  {
    "id": "bh-001",
    "title": "The History They Didn't Hand You",
    "era": "origins",
    "track": "identity",
    "story": "Black American history is more than slavery, and slavery cannot be skipped. We study African knowledge, the violence of enslavement, resistance, family, labor, and freedom together.",
    "quest": {
      "mode": "timeline",
      "instruction": "Build a two-column timeline: what was taken, what people built and protected.",
      "proof": "Learner-created artifact, reflection, or supervised demonstration",
      "needsAdult": false,
      "requiresExternalUpload": false
    },
    "sourceUrls": [
      "https://nmaahc.si.edu/explore/stories/slavery-freedom"
    ],
    "reviewStatus": "editorial-review-required",
    "minAge": 7
  },
  {
    "id": "bh-002",
    "title": "Free Didn't Mean Equal",
    "era": "reconstruction",
    "track": "civic",
    "story": "The Civil War ended, slavery was abolished with an exception, and the fight over citizenship, voting and opportunity continued.",
    "quest": {
      "mode": "evidence",
      "instruction": "Compare promises of freedom with barriers after 1865; support each claim with a source.",
      "proof": "Learner-created artifact, reflection, or supervised demonstration",
      "needsAdult": false,
      "requiresExternalUpload": false
    },
    "sourceUrls": [
      "https://nmaahc.si.edu/explore/exhibitions/reconstruction/voting-rights"
    ],
    "reviewStatus": "editorial-review-required",
    "minAge": 7
  },
  {
    "id": "bh-003",
    "title": "Cincinnati Was Not Innocent",
    "era": "cincinnati",
    "track": "civic",
    "story": "Ohio was called a free state, but Black residents faced discriminatory laws and violence. Cincinnati history includes resistance as well as injustice.",
    "quest": {
      "mode": "local-research",
      "instruction": "Map two documented barriers and one response by Black Cincinnati residents.",
      "proof": "Learner-created artifact, reflection, or supervised demonstration",
      "needsAdult": false,
      "requiresExternalUpload": false
    },
    "sourceUrls": [
      "https://www.nps.gov/articles/000/chapter-1-race-slavery-and-freedom-northern-unfreedom.htm"
    ],
    "reviewStatus": "editorial-review-required",
    "minAge": 7
  },
  {
    "id": "bh-004",
    "title": "Freedom Had a Network",
    "era": "cincinnati",
    "track": "leadership",
    "story": "People built networks of information, shelter, transportation and trust to help freedom seekers.",
    "quest": {
      "mode": "systems-map",
      "instruction": "Design an ethical support network for people today without pretending the stakes were identical.",
      "proof": "Learner-created artifact, reflection, or supervised demonstration",
      "needsAdult": false,
      "requiresExternalUpload": false
    },
    "sourceUrls": [
      "https://research.cincymuseum.org/library/aag/aag/antislavery.html"
    ],
    "reviewStatus": "editorial-review-required",
    "minAge": 7
  },
  {
    "id": "bh-005",
    "title": "What Does a Community Own?",
    "era": "reconstruction",
    "track": "business",
    "story": "Reconstruction raised urgent questions about who could own property, attend school, participate in government and control their future.",
    "quest": {
      "mode": "budget",
      "instruction": "Build a budget for a community learning space and identify who makes decisions.",
      "proof": "Learner-created artifact, reflection, or supervised demonstration",
      "needsAdult": false,
      "requiresExternalUpload": false
    },
    "sourceUrls": [
      "https://nmaahc.si.edu/explore/stories/slavery-freedom"
    ],
    "reviewStatus": "editorial-review-required",
    "minAge": 7
  },
  {
    "id": "bh-006",
    "title": "The Receipts Matter",
    "era": "civil-rights",
    "track": "media-literacy",
    "story": "Civil rights history includes organizers, families, local workers and people who carried risk without becoming household names.",
    "quest": {
      "mode": "source-check",
      "instruction": "Read a primary account and explain the difference between a document and somebody's opinion.",
      "proof": "Learner-created artifact, reflection, or supervised demonstration",
      "needsAdult": false,
      "requiresExternalUpload": false
    },
    "sourceUrls": [
      "https://nmaahc.si.edu/explore/initiatives/civil-rights-history-project"
    ],
    "reviewStatus": "editorial-review-required",
    "minAge": 7
  },
  {
    "id": "bh-007",
    "title": "Garrett Morgan Saw a Problem",
    "era": "innovation",
    "track": "infrastructure",
    "story": "Garrett Morgan patented an improved traffic signal in 1923. The lesson is to notice a danger, test a solution and understand ownership.",
    "quest": {
      "mode": "design-build",
      "instruction": "Sketch a safer crossing; identify the real Morgan design versus the later electric signal.",
      "proof": "Learner-created artifact, reflection, or supervised demonstration",
      "needsAdult": false,
      "requiresExternalUpload": false
    },
    "sourceUrls": [
      "https://www.uspto.gov/learning-and-resources/journeys-innovation/historical-stories/courage-and-caution"
    ],
    "reviewStatus": "editorial-review-required",
    "minAge": 7
  },
  {
    "id": "bh-008",
    "title": "Before AI, Black Mathematicians Built the Future",
    "era": "innovation",
    "track": "technology",
    "story": "Katherine Johnson helped NASA calculate flight paths; Black mathematics and engineering are part of American technology history.",
    "quest": {
      "mode": "stem",
      "instruction": "Solve a short navigation puzzle and check your steps instead of guessing.",
      "proof": "Learner-created artifact, reflection, or supervised demonstration",
      "needsAdult": false,
      "requiresExternalUpload": false
    },
    "sourceUrls": [
      "https://www.nasa.gov/centers-and-facilities/langley/katherine-johnson-biography/"
    ],
    "reviewStatus": "editorial-review-required",
    "minAge": 7
  },
  {
    "id": "bh-009",
    "title": "Dorothy Vaughan Learned the Next Tool",
    "era": "innovation",
    "track": "ai",
    "story": "Dorothy Vaughan became an expert in FORTRAN programming when electronic computing transformed her workplace.",
    "quest": {
      "mode": "future-skills",
      "instruction": "Compare an old computing job to a current AI-enabled job. What skill remains valuable?",
      "proof": "Learner-created artifact, reflection, or supervised demonstration",
      "needsAdult": false,
      "requiresExternalUpload": false
    },
    "sourceUrls": [
      "https://www.nasa.gov/people/dorothy-vaughan/"
    ],
    "reviewStatus": "editorial-review-required",
    "minAge": 7
  },
  {
    "id": "bh-010",
    "title": "Mary Jackson Opened Doors in Engineering",
    "era": "innovation",
    "track": "trades",
    "story": "Mary Jackson became NASA's first Black female engineer and later worked to expand opportunity for others.",
    "quest": {
      "mode": "experiment",
      "instruction": "Build a paper-airflow test and record results; identify the difference between observation and claim.",
      "proof": "Learner-created artifact, reflection, or supervised demonstration",
      "needsAdult": false,
      "requiresExternalUpload": false
    },
    "sourceUrls": [
      "https://www.nasa.gov/history/mary-w-jackson/"
    ],
    "reviewStatus": "editorial-review-required",
    "minAge": 7
  },
  {
    "id": "bh-011",
    "title": "Culture Became a Business",
    "era": "culture",
    "track": "creative",
    "story": "Hip-hop grew in the Bronx in the 1970s from community creativity and became a powerful cultural and economic force.",
    "quest": {
      "mode": "original-creative",
      "instruction": "Design an original creative brand, outline rights, costs and respectful credit.",
      "proof": "Learner-created artifact, reflection, or supervised demonstration",
      "needsAdult": false,
      "requiresExternalUpload": false
    },
    "sourceUrls": [
      "https://nmaahc.si.edu/explore/stories/hip-hop-bronx"
    ],
    "reviewStatus": "editorial-review-required",
    "minAge": 7
  },
  {
    "id": "bh-012",
    "title": "The Green Book Was Infrastructure",
    "era": "cincinnati",
    "track": "business",
    "story": "The Green Book helped Black travelers navigate exclusion. Cincinnati's Edgemont Inn was listed in the guide.",
    "quest": {
      "mode": "community-guide",
      "instruction": "Design an accessibility-and-safety guide for local community services, verified before sharing.",
      "proof": "Learner-created artifact, reflection, or supervised demonstration",
      "needsAdult": false,
      "requiresExternalUpload": false
    },
    "sourceUrls": [
      "https://www.ohiohistory.org/visit/browse-historical-sites/harriet-beecher-stowe-house/"
    ],
    "reviewStatus": "editorial-review-required",
    "minAge": 7
  },
  {
    "id": "bh-013",
    "title": "Who Owns the Story?",
    "era": "modern",
    "track": "media-literacy",
    "story": "Today's social platforms spread stories quickly, but popularity does not make a claim true.",
    "quest": {
      "mode": "source-check",
      "instruction": "Investigate an archival image, note its creator and context, then explain what remains unknown.",
      "proof": "Learner-created artifact, reflection, or supervised demonstration",
      "needsAdult": false,
      "requiresExternalUpload": false
    },
    "sourceUrls": [
      "https://nmaahc.si.edu/explore/initiatives/civil-rights-history-project"
    ],
    "reviewStatus": "editorial-review-required",
    "minAge": 7
  },
  {
    "id": "bh-014",
    "title": "Electric Futures, Real Skills",
    "era": "modern",
    "track": "infrastructure",
    "story": "The energy transition needs workers who understand safety, systems, math, construction and business. This quest connects history of invention to current possibilities without claiming a specific job forecast.",
    "quest": {
      "mode": "systems-map",
      "instruction": "Diagram how electricity reaches a neighborhood; no live wiring or unsupervised electrical work.",
      "proof": "Learner-created artifact, reflection, or supervised demonstration",
      "needsAdult": false,
      "requiresExternalUpload": false
    },
    "sourceUrls": [
      "https://www.uspto.gov/learning-and-resources/journeys-innovation/historical-stories/courage-and-caution"
    ],
    "reviewStatus": "editorial-review-required",
    "minAge": 7
  },
  {
    "id": "bh-015",
    "title": "AI Is a Tool, Not a Brain Replacement",
    "era": "modern",
    "track": "ai",
    "story": "Black contributions to computing are real. Today's AI can help research and create, but it can confidently invent false history.",
    "quest": {
      "mode": "ai-audit",
      "instruction": "Ask an AI to explain one verified historical fact, then audit its answer against a primary source.",
      "proof": "Learner-created artifact, reflection, or supervised demonstration",
      "needsAdult": false,
      "requiresExternalUpload": false
    },
    "sourceUrls": [
      "https://www.nasa.gov/people/dorothy-vaughan/"
    ],
    "reviewStatus": "editorial-review-required",
    "minAge": 7
  },
  {
    "id": "bh-016",
    "title": "Avondale History Is Living History",
    "era": "cincinnati",
    "track": "oral-history",
    "story": "Community stories are evidence when recorded carefully with consent and context. Local elders and business owners may hold important memories.",
    "quest": {
      "mode": "oral-history",
      "instruction": "With adult supervision and permission, interview a willing community member or use a published oral history; preserve their own words.",
      "proof": "Learner-created artifact, reflection, or supervised demonstration",
      "needsAdult": true,
      "requiresExternalUpload": false
    },
    "sourceUrls": [
      "https://research.cincymuseum.org/library/aag/aag/antislavery.html"
    ],
    "reviewStatus": "editorial-review-required",
    "minAge": 7
  },
  {
    "id": "bh-017",
    "title": "Black Business: More Than a Storefront",
    "era": "modern",
    "track": "business",
    "story": "Owning a business includes systems, pricing, customers, recordkeeping and solving a real problem, not just having a logo.",
    "quest": {
      "mode": "business-lab",
      "instruction": "Create a one-page business plan with customer, value, price and costs.",
      "proof": "Learner-created artifact, reflection, or supervised demonstration",
      "needsAdult": false,
      "requiresExternalUpload": false
    },
    "sourceUrls": [
      "https://invention.si.edu/sites/default/files/Lemelson-Center-Black-Inventors-Innovators-Report-updated-2021-10.pdf"
    ],
    "reviewStatus": "editorial-review-required",
    "minAge": 7
  },
  {
    "id": "bh-018",
    "title": "Build the Block, Not Just the App",
    "era": "modern",
    "track": "community",
    "story": "Strong neighborhoods rely on people, places, transport, housing, parks, utility networks and trusted organizations.",
    "quest": {
      "mode": "community-design",
      "instruction": "Choose one neighborhood need and draw a practical improvement plan with estimated costs and partners.",
      "proof": "Learner-created artifact, reflection, or supervised demonstration",
      "needsAdult": false,
      "requiresExternalUpload": false
    },
    "sourceUrls": [
      "https://www.nps.gov/articles/000/chapter-1-race-slavery-and-freedom-northern-unfreedom.htm"
    ],
    "reviewStatus": "editorial-review-required",
    "minAge": 7
  }
];

export function getBlackHistoryQuests({ age, era, track } = {}) {
  return BLACK_HISTORY_QUESTS.filter(q =>
    (age === undefined || age >= q.minAge) &&
    (!era || q.era === era) &&
    (!track || q.track === track)
  );
}

export function createHistoryQuestProgress(questId) {
  if (!BLACK_HISTORY_QUESTS.some(q => q.id === questId)) throw new Error('Unknown Black History quest');
  return {
    questId,
    status: 'not-started',
    reflection: '',
    evidenceState: 'none',
    verification: 'not-reviewed',
    awardedXP: 0,
    completedAt: null
  };
}
