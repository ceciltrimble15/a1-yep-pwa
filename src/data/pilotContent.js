// REV 3: developmental pilot copy; final workbook copy remains held.
// Legacy mode IDs remain stable for saved sessions and links.
import { DEFAULT_MODE } from './modes.js';

export const STEM_SIN_LABEL = 'S.T.E.M.Sin Technology + Problem-Solving Quest';

export const PROGRAM_CONTENT = {
  "explorer": {
    "instructions": "Notice something small. Draw or tell your idea, then save a short answer with a trusted adult if you need help.",
    "example": "Crayons keep rolling off the table. A folded-paper tray could hold them.",
    "expectations": "Name who you help. Count the materials you use. Practice with pretend money and an adult; no selling is required.",
    "dailyQuest": {
      "id": "explorer-daily",
      "title": "Little Problem Finder",
      "prompt": "Find one small problem you can see. Who needs help? Tell or write one thing you could try.",
      "finisher": "Focus"
    },
    "weeklyModule": {
      "id": "explorer-week-1",
      "title": "Week 1 — I Can Help",
      "description": "Discover a strength you can use to help someone.",
      "activities": [
        {
          "id": "power-name",
          "title": "Power Name",
          "text": "Tell why you chose your Power Name."
        },
        {
          "id": "why",
          "title": "Define Your Why",
          "text": "Draw or name one thing you would like to make easier."
        },
        {
          "id": "identity-map",
          "title": "My Resources",
          "text": "Name one thing you enjoy and one thing you are learning."
        }
      ]
    },
    "stemSin": {
      "id": "explorer-stem",
      "title": "S.T.E.M.Sin Technology + Problem-Solving Quest",
      "challengeTitle": "Try a Helpful Tool",
      "prompt": "Choose a simple tool or material. Draw your idea, try it safely with an adult, and say what happened. You can describe the test instead of coding.",
      "finisher": "Innovation"
    },
    "bossChallenge": {
      "id": "explorer-boss",
      "title": "Boss Challenge — Show and Tell",
      "prompt": "Show or describe your idea. Say who it helps and one thing you tried. A short answer with adult support is enough."
    },
    "mentorSpotlight": {
      "title": "Ask a Helpful Adult",
      "body": "A mentor is a trusted person who helps you learn. You can ask them to explain or show a step, then try it yourself.",
      "challenge": "Ask: Can you help me try this safely?"
    },
    "reflection": {
      "title": "Tell What Happened",
      "prompt": "What did you try? What will you try next? You can tell an adult and save a few words.",
      "placeholder": "I tried… Next I will…"
    }
  },
  "builder": {
    "instructions": "Choose a familiar problem. Plan a small test, try it, and record what you noticed in your own words.",
    "example": "A shared supply box is hard to use. Test labels with a classmate and see whether finding an item gets easier.",
    "expectations": "Identify a user, list materials and a simple pretend budget, and explain how your idea helps. Ask permission before testing with others.",
    "dailyQuest": {
      "id": "builder-daily",
      "title": "Problem Spotter",
      "prompt": "Find a problem at home, school, or in your neighborhood. Describe who has the problem and one useful change you could test.",
      "finisher": "Focus"
    },
    "weeklyModule": {
      "id": "builder-week-1",
      "title": "Week 1 — Focus & Identity",
      "description": "Connect your strengths to a useful idea and a small plan.",
      "activities": [
        {
          "id": "power-name",
          "title": "Power Name",
          "text": "Explain how your Power Name connects to a strength you want to grow."
        },
        {
          "id": "why",
          "title": "Define Your Why",
          "text": "Name a problem you care about and who it affects."
        },
        {
          "id": "identity-map",
          "title": "My Resources",
          "text": "List a skill, an interest, and a value; choose how each could help your plan."
        }
      ]
    },
    "stemSin": {
      "id": "builder-stem",
      "title": "S.T.E.M.Sin Technology + Problem-Solving Quest",
      "challengeTitle": "Build and Compare",
      "prompt": "Choose a tool, simple model, or app idea. Test it with permission, compare what happened before and after, and record one improvement. Coding is optional.",
      "finisher": "Innovation"
    },
    "bossChallenge": {
      "id": "builder-boss",
      "title": "Boss Challenge — 60-Second Solution",
      "prompt": "Explain the problem, who needs help, your test, and one improvement. Practice sharing your solution in about 60 seconds."
    },
    "mentorSpotlight": {
      "title": "Learn With a Mentor",
      "body": "A mentor asks questions and helps you plan. Bring your own idea and listen for one suggestion you can test yourself.",
      "challenge": "What could I change to make my test more useful?"
    },
    "reflection": {
      "title": "Explain Your Learning",
      "prompt": "What happened in your mission? Explain one choice you made and one improvement for your next try.",
      "placeholder": "My choice was… I noticed… Next time…"
    }
  },
  "leader": {
    "instructions": "Investigate a problem that matters to others. State an assumption, gather feedback with permission, and use evidence to improve your plan.",
    "example": "A school club loses event sign-ups. Test a sample sign-up process with permission and compare completion time without collecting private data.",
    "expectations": "Describe a customer or community need, estimate costs and a possible price, and explain the trade-offs. Use sample numbers; real sales require facilitator approval.",
    "dailyQuest": {
      "id": "leader-daily",
      "title": "Need and Evidence Scout",
      "prompt": "Identify a school, community, or small-business problem. State who experiences it, what evidence you have, and one assumption you still need to test.",
      "finisher": "Focus"
    },
    "weeklyModule": {
      "id": "leader-week-1",
      "title": "Week 1 — Direction & Responsibility",
      "description": "Turn your strengths and values into a goal you can test and explain.",
      "activities": [
        {
          "id": "power-name",
          "title": "Power Name",
          "text": "Describe the responsibility your Power Name asks you to take."
        },
        {
          "id": "why",
          "title": "Define Your Why",
          "text": "Define a meaningful problem and a measurable improvement."
        },
        {
          "id": "identity-map",
          "title": "My Resources",
          "text": "Map a skill, a resource, and a support person; name a gap and your next action."
        }
      ]
    },
    "stemSin": {
      "id": "leader-stem",
      "title": "S.T.E.M.Sin Technology + Problem-Solving Quest",
      "challengeTitle": "Prototype With Evidence",
      "prompt": "Plan a simple prototype using a digital tool, device, or workflow. State your assumption, test with permission using sample data, and record evidence plus one limitation. Coding is optional.",
      "finisher": "Innovation"
    },
    "bossChallenge": {
      "id": "leader-boss",
      "title": "Boss Challenge — Evidence Pitch",
      "prompt": "In about 60 seconds, explain the user need, your prototype, evidence, estimated costs, and the next test. Distinguish what you know from what you assume."
    },
    "mentorSpotlight": {
      "title": "Bring Evidence to a Mentor",
      "body": "Use mentorship to challenge your reasoning. Bring your test results, explain a decision, and ask for feedback on a specific trade-off.",
      "challenge": "Which assumption in my plan should I test next, and why?"
    },
    "reflection": {
      "title": "Reflect on Your Decisions",
      "prompt": "What evidence from the mission changed your thinking? Explain a trade-off, what you would change, and how you will check that change.",
      "placeholder": "The evidence showed… The trade-off was… My next test is…"
    }
  },
  "yaep": {
    "instructions": "Select a real market, workplace, or community opportunity. Test a clear value proposition and document evidence, costs, constraints, and your next decision.",
    "example": "A local service business misses estimate requests. Prototype a request tracker using sample data and compare response time and staff effort.",
    "expectations": "Define the customer, value, costs, proposed revenue or savings, and a realistic delivery plan. Separate assumptions from validated demand and consider permissions and operational risk.",
    "dailyQuest": {
      "id": "yaep-daily",
      "title": "Opportunity Spotter",
      "prompt": "Identify an unmet need in a workplace, community, or market. Define the user, current workaround, evidence of demand, and value you could test.",
      "finisher": "Focus"
    },
    "weeklyModule": {
      "id": "yaep-week-1",
      "title": "Week 1 — Position & Purpose",
      "description": "Connect your assets and purpose to a credible execution plan.",
      "activities": [
        {
          "id": "power-name",
          "title": "Power Name",
          "text": "Define the professional or entrepreneurial identity your Power Name represents."
        },
        {
          "id": "why",
          "title": "Define Your Why",
          "text": "State the opportunity, intended value, and why you are committed to it."
        },
        {
          "id": "identity-map",
          "title": "My Resources",
          "text": "Map skills, relationships, resources, and constraints; choose an accountable next step."
        }
      ]
    },
    "stemSin": {
      "id": "yaep-stem",
      "title": "S.T.E.M.Sin Technology + Problem-Solving Quest",
      "challengeTitle": "Turn a Tool Into Value",
      "prompt": "Choose a digital tool, AI/computer workflow, device, or system. Define the user task, success measure, cost, and risk. Run a small permitted test with sample data and explain whether the result supports your value proposition.",
      "finisher": "Innovation"
    },
    "bossChallenge": {
      "id": "yaep-boss",
      "title": "Boss Challenge — 60-Second Value Pitch",
      "prompt": "Explain the opportunity, target customer, tested value, cost and revenue or savings assumptions, and your next concrete move in about 60 seconds."
    },
    "mentorSpotlight": {
      "title": "Use Mentorship Strategically",
      "body": "Bring a specific business or career decision to a mentor. Share evidence and constraints, ask for a challenge to your assumptions, and own the next action.",
      "challenge": "What evidence would make you change this business or career decision?"
    },
    "reflection": {
      "title": "Review Your Execution",
      "prompt": "What did the mission reveal about your decisions and execution? Evaluate evidence, cost or time, and impact. Name an accountable next step and how you will measure it.",
      "placeholder": "My evidence was… The constraint was… I will measure…"
    }
  }
};

export const PILOT_BADGES = [
  { id: 'daily-quest', name: 'Quest Starter', unlock: 'Complete the Daily Quest' },
  { id: 'weekly-module', name: 'Identity Builder', unlock: 'Complete all Week 1 activities' },
  { id: 'boss-challenge', name: 'Boss Move', unlock: 'Complete the Boss Challenge' },
];

export function getProgramContent(mode) {
  return PROGRAM_CONTENT[mode] || PROGRAM_CONTENT[DEFAULT_MODE];
}
