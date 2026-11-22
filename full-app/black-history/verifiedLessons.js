/** Full YEP App only. Fact-checked content development seeds. Not imported into POC. 
 * Fact review: 2026-11-22. Human curriculum/age review still required before youth publication.
 * Sources are institutional references; narration is original and NOT historical quotation.
 */
export const VERIFIED_HISTORY_REVIEW_DATE = '2026-11-22';
export const VERIFIED_HISTORY_LESSONS = [
  {
    "id": "forten-ownership",
    "name": "James Forten",
    "years": "1766–1842",
    "title": "Learn the Trade. Run the Business.",
    "category": "Manufacturing & Ownership",
    "hook": "Before you can run the business, understand the work. James Forten learned sailmaking, managed people, then took responsibility for a major Philadelphia sail loft. What would you need to know before taking over?",
    "factChecks": [
      {
        "claim": "James Forten apprenticed under sailmaker Robert Bridges and later became foreman.",
        "citation": "Museum of the American Revolution, Black Founders Big Idea 4"
      },
      {
        "claim": "He took over Bridges's sailmaking business in Philadelphia when Bridges retired in 1798.",
        "citation": "Museum of the American Revolution, Black Founders Big Idea 4"
      },
      {
        "claim": "His business employed Black and white workers; his earnings supported abolition and civil rights.",
        "citation": "Museum of the American Revolution, Frequently Asked Questions: James Forten"
      }
    ],
    "sources": [
      {
        "label": "Museum of the American Revolution: James Forten",
        "url": "https://www.amrevmuseum.org/black-founders-big-idea-4-james-forten-and-entrepreneurs-of-african-descent"
      },
      {
        "label": "Museum FAQ",
        "url": "https://www.amrevmuseum.org/frequently-asked-questions-james-forten"
      }
    ],
    "scenes": [
      {
        "title": "See the workshop",
        "narration": "A sail loft worked because people could measure, cut and repair sails that ships actually needed. Forten learned the trade before he managed the business.",
        "scene": "workshop",
        "question": "What had to happen before the owner could earn money?"
      },
      {
        "title": "Take responsibility",
        "narration": "Forten became a foreman, working with people, supplies and customers. Operating a company takes more than an idea.",
        "scene": "ledger",
        "question": "Which business task would you learn first?"
      }
    ],
    "challenge": {
      "question": "You are preparing to run a sailmaking shop. What is the strongest first move?",
      "choices": [
        {
          "id": "a",
          "label": "Buy expensive signs without checking demand.",
          "feedback": "A sign alone does not prove you can deliver a service or find buyers."
        },
        {
          "id": "b",
          "label": "Learn the trade, understand costs and customers, and build trust.",
          "feedback": "Correct. Forten's path shows why technical skill, customers and relationships matter.",
          "correct": true
        },
        {
          "id": "c",
          "label": "Promise every customer same-day delivery before checking supplies.",
          "feedback": "A promise without capacity can damage trust and cost money."
        }
      ]
    },
    "reflection": "Name one skill you would learn before owning a business and one way you would earn customers' trust.",
    "skillTags": [
      "apprenticeship",
      "costs",
      "operations",
      "ownership"
    ]
  },
  {
    "id": "cuffe-logistics",
    "name": "Paul Cuffe",
    "years": "1759–1817",
    "title": "Own the Route. Understand the Risk.",
    "category": "Transportation & Trade",
    "hook": "You can have a product, but how does it reach the buyer? Paul Cuffe worked in maritime trade, owned or partnered in vessels, and invested in property. Let's study the system behind movement.",
    "factChecks": [
      {
        "claim": "Paul Cuffe was born in 1759 to a father of African origin and a Wampanoag mother.",
        "citation": "National Park Service, Paul Cuffe"
      },
      {
        "claim": "He traded along the Connecticut coast and acquired vessels alone and in partnerships.",
        "citation": "National Park Service, Paul Cuffe"
      },
      {
        "claim": "By age 50 he owned a ship, two brigs, smaller vessels, houses and land.",
        "citation": "National Park Service, Paul Cuffe"
      }
    ],
    "sources": [
      {
        "label": "National Park Service: Paul Cuffe",
        "url": "https://home.nps.gov/nebe/learn/historyculture/paulcuffe.htm"
      }
    ],
    "scenes": [
      {
        "title": "Map the shipment",
        "narration": "A voyage needs a route, supplies, buyers and a safe plan. Cuffe's trading company depended on more than owning a ship.",
        "scene": "route",
        "question": "What could go wrong between a seller and a buyer?"
      },
      {
        "title": "Build assets",
        "narration": "Cuffe owned vessels and property. Assets can support a business, but they also cost money and need upkeep.",
        "scene": "fleet",
        "question": "What is one cost of owning transportation equipment?"
      }
    ],
    "challenge": {
      "question": "You have orders to deliver but only enough money for one smaller boat. What should you do first?",
      "choices": [
        {
          "id": "a",
          "label": "Plan the route, costs, demand, and safety before committing.",
          "feedback": "Correct. Logistics starts with a realistic plan, not a bigger promise.",
          "correct": true
        },
        {
          "id": "b",
          "label": "Buy more boats on credit without checking demand.",
          "feedback": "Debt creates risk when sales and costs are unknown."
        },
        {
          "id": "c",
          "label": "Ignore weather and insurance because deliveries must be fast.",
          "feedback": "Speed without safety could put people and the business in danger."
        }
      ]
    },
    "reflection": "Identify one route risk and one cost a transportation business must plan for.",
    "skillTags": [
      "logistics",
      "partnerships",
      "risk",
      "assets"
    ]
  },
  {
    "id": "morgan-patent",
    "name": "Garrett Morgan",
    "years": "1877–1963",
    "title": "Notice a Problem. Protect a Solution.",
    "category": "Invention & Infrastructure",
    "hook": "A good business can start with a real problem. Garrett Morgan improved traffic safety and protected an invention through a patent. What makes an invention valuable to other people?",
    "factChecks": [
      {
        "claim": "Garrett Morgan received U.S. Patent 1,475,024 for a traffic signal on November 20, 1923.",
        "citation": "USPTO; original U.S. patent 1,475,024"
      },
      {
        "claim": "His hand-cranked signal had a stage stopping traffic from all directions before allowing vehicles to proceed.",
        "citation": "USPTO, Of courage and caution"
      },
      {
        "claim": "Morgan sold rights to the traffic-signal patent to General Electric for $40,000.",
        "citation": "USPTO, Of courage and caution"
      }
    ],
    "sources": [
      {
        "label": "USPTO: Of courage and caution",
        "url": "https://www.uspto.gov/learning-and-resources/journeys-innovation/historical-stories/courage-and-caution"
      },
      {
        "label": "Patent 1,475,024",
        "url": "https://patents.google.com/patent/US1475024A/en"
      }
    ],
    "scenes": [
      {
        "title": "Spot the danger",
        "narration": "Intersections needed a safer way to coordinate cars and people. Morgan worked on an improved manually operated signal; he did not invent the first traffic light.",
        "scene": "intersection",
        "question": "What problem did his signal address?"
      },
      {
        "title": "Make it real",
        "narration": "An invention needs evidence, a way to protect the work, and a buyer who values it. Morgan demonstrated his signal and sold patent rights.",
        "scene": "patent",
        "question": "How would you demonstrate that your solution helps?"
      }
    ],
    "challenge": {
      "question": "A safer crossing idea looks promising. What is the best next step?",
      "choices": [
        {
          "id": "a",
          "label": "Claim you invented all traffic signals.",
          "feedback": "That would be historically inaccurate and misrepresent the work."
        },
        {
          "id": "b",
          "label": "Test a safe model, document evidence, and learn about patent rights.",
          "feedback": "Correct. Evidence and accurate ownership claims come before selling a solution.",
          "correct": true
        },
        {
          "id": "c",
          "label": "Start live roadwork without permission.",
          "feedback": "Unsafe and unlawful. All practical activities require adult guidance and permission."
        }
      ]
    },
    "reflection": "Describe a community safety problem, a safe model you could test, and the evidence that would show improvement.",
    "skillTags": [
      "engineering",
      "safety",
      "intellectual-property",
      "sales"
    ]
  }
];
export const HISTORY_AGE_REQUIREMENTS = {
  '7-10': { directions: 'Read or hear one short scene; select a picture or answer with a trusted adult.', proof: 'spoken, drawn, or chosen answer' },
  '11-13': { directions: 'Compare two steps in a business and explain your choice.', proof: 'short explanation' },
  '14-17': { directions: 'Check the sources, analyze costs or risk, and support a decision.', proof: 'source-based plan' },
  '18-24': { directions: 'Analyze operations, financial assumptions and constraints before drafting a realistic plan.', proof: 'operations or business memo' }
};
export function reviewHistoryAnswer(lessonId, answerId) {
  const lesson = VERIFIED_HISTORY_LESSONS.find(item => item.id === lessonId);
  if (!lesson) throw new Error('Unknown history lesson');
  const choice = lesson.challenge.choices.find(item => item.id === answerId);
  if (!choice) throw new Error('Unknown history answer');
  return { correct: !!choice.correct, feedback: choice.feedback, lessonId, answerId };
}
export function getVerifiedHistoryLesson(lessonId) {
  return VERIFIED_HISTORY_LESSONS.find(item => item.id === lessonId) || null;
}
