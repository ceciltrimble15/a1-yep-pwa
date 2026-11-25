/** Full YEP app. Modern Black American technology and entrepreneurship history.
 * Source review: 2026-11-25. Exact sourced statements only; activities are original.
 * Not part of YEP POC. Human content and age review required before youth release.
 * Do not claim any one individual invented the internet.
 */
export const INTERNET_AGE_REVIEW_DATE = '2026-11-25';
export const INTERNET_AGE_LESSONS = [
  {
    "id": "dean-computing",
    "name": "Mark Dean",
    "years": "Born 1957",
    "title": "Build the Computer, Not Just Use It",
    "category": "Computers & Hardware",
    "hook": "A computer is a whole system. Mark Dean and colleagues developed technology that helped devices connect to personal computers. How does a useful system become an industry?",
    "factChecks": [
      {
        "claim": "Mark Dean and Dennis Moeller developed a microcomputer system with bus control for peripheral devices.",
        "citation": "IBM History and National Inventors Hall of Fame, Mark Dean"
      },
      {
        "claim": "Dean served as chief engineer for IBM personal-computer work and holds three of IBM's original nine PC patents.",
        "citation": "National Inventors Hall of Fame, Mark Dean"
      }
    ],
    "sources": [
      {
        "label": "National Inventors Hall of Fame: Mark Dean",
        "url": "https://www.invent.org/inductees/mark-dean"
      }
    ],
    "scenes": [
      {
        "title": "Connect the parts",
        "scene": "patent",
        "narration": "A computer needs components to communicate. Mark Dean helped build the systems that let peripheral devices connect and work together. The lesson is to understand how the parts fit.",
        "question": "Which devices have to communicate for a computer to do useful work?"
      },
      {
        "title": "Solve the customer's problem",
        "scene": "ledger",
        "narration": "Technical work succeeds when it solves a real need. Learn the requirement, test compatibility and document the result. Do not claim Dean invented the internet.",
        "question": "What would a customer need to know before buying this system?"
      }
    ],
    "challenge": {
      "question": "You're building a new computer accessory. What's your first responsible business decision?",
      "choices": [
        {
          "id": "a",
          "label": "Promise compatibility with every device before testing.",
          "feedback": "Unverified compatibility creates costly failures for customers."
        },
        {
          "id": "b",
          "label": "Find a user need, test the device connections and record results.",
          "feedback": "Right. Testing the system and proving value make a product credible.",
          "correct": true
        },
        {
          "id": "c",
          "label": "Copy a competitor's protected design without permission.",
          "feedback": "Ignoring intellectual property creates legal and business risk."
        }
      ]
    },
    "reflection": "Describe a technology problem, the people it affects, and how you would test a useful solution.",
    "skillTags": [
      "computing",
      "engineering",
      "systems",
      "product-development"
    ]
  },
  {
    "id": "steward-infrastructure",
    "name": "David L. Steward",
    "years": "Founded WWT 1990",
    "title": "The Business Behind the Internet",
    "category": "Networks & Enterprise Sales",
    "hook": "Digital businesses depend on physical equipment, software and people who can deliver reliable systems. David Steward founded World Wide Technology in 1990. What does it take to serve large customers?",
    "factChecks": [
      {
        "claim": "David L. Steward founded World Wide Technology in 1990.",
        "citation": "World Wide Technology, David Steward biography"
      },
      {
        "claim": "WWT's work includes enterprise AI, digital, cloud, cybersecurity and infrastructure solutions.",
        "citation": "World Wide Technology, company press kit"
      }
    ],
    "sources": [
      {
        "label": "World Wide Technology: founder biography",
        "url": "https://www.wwt.com/wwt-executives/david-steward/bio"
      },
      {
        "label": "World Wide Technology: company facts",
        "url": "https://www.wwt.com/about/press-kit"
      }
    ],
    "scenes": [
      {
        "title": "See the network",
        "scene": "route",
        "narration": "A website does not run on wishes. It needs connected devices, servers, networks and businesses that make the system reliable. Steward built a company serving organizations that depend on technology.",
        "question": "What could happen if a hospital or school network goes down?"
      },
      {
        "title": "Deliver the contract",
        "scene": "ledger",
        "narration": "Winning a customer is not the same as delivering. A technology contractor needs the right equipment, a trained team, accurate pricing and proof that the system works.",
        "question": "Which costs and risks would you check before promising delivery?"
      }
    ],
    "challenge": {
      "question": "A school requests a network upgrade. How should a responsible contractor respond?",
      "choices": [
        {
          "id": "a",
          "label": "Assess needs, document equipment and labor costs, then propose a tested plan.",
          "feedback": "Right. A grounded scope protects the customer and the contractor.",
          "correct": true
        },
        {
          "id": "b",
          "label": "Promise any deadline without confirming the equipment supply.",
          "feedback": "An unchecked promise can produce delays and financial losses."
        },
        {
          "id": "c",
          "label": "Purchase random equipment before assessing the network.",
          "feedback": "Buying before discovery risks wasted money and incompatible parts."
        }
      ]
    },
    "reflection": "Explain who would pay for a network upgrade and what evidence proves a contractor delivered value.",
    "skillTags": [
      "networks",
      "contracts",
      "procurement",
      "operations"
    ]
  },
  {
    "id": "thompson-security",
    "name": "John W. Thompson",
    "years": "Symantec CEO 1999–2009",
    "title": "Protect the Systems People Trust",
    "category": "Cybersecurity & Leadership",
    "hook": "A business cannot survive if customers stop trusting its systems. John W. Thompson led Symantec during major growth in information security. Let's connect cybersecurity to leadership and business value.",
    "factChecks": [
      {
        "claim": "John W. Thompson served as Symantec CEO from 1999 to 2009.",
        "citation": "Stanford Technology Ventures Program, John Thompson"
      },
      {
        "claim": "Symantec expanded its information security offerings under Thompson's leadership.",
        "citation": "Stanford Technology Ventures Program, John Thompson"
      }
    ],
    "sources": [
      {
        "label": "Stanford: John Thompson",
        "url": "https://stvp.stanford.edu/people/john-thompson"
      },
      {
        "label": "Symantec 2007 SEC filing",
        "url": "https://www.sec.gov/Archives/edgar/data/849399/000095013407016118/f31482dedef14a.htm"
      }
    ],
    "scenes": [
      {
        "title": "Protect the customer",
        "scene": "intersection",
        "narration": "Businesses store information and depend on working systems. Security planning helps protect customers, employees and operations. John Thompson's leadership shows cybersecurity is also a business responsibility.",
        "question": "What happens to trust after a customer-data breach?"
      },
      {
        "title": "Choose a control",
        "scene": "ledger",
        "narration": "A security leader must assess threats, protect data and spend wisely. You cannot promise a system will never fail. You can choose controls and test them.",
        "question": "What would you secure first in a small business?"
      }
    ],
    "challenge": {
      "question": "A small business shares one password across its staff. What should it do?",
      "choices": [
        {
          "id": "a",
          "label": "Keep sharing the password because it is easier.",
          "feedback": "Shared credentials make access hard to control and audit."
        },
        {
          "id": "b",
          "label": "Publish the password on a staff notice board.",
          "feedback": "Public credentials expose systems and customer records."
        },
        {
          "id": "c",
          "label": "Use separate accounts, strong authentication and appropriate access.",
          "feedback": "Right. Individual accounts and access controls reduce security risk.",
          "correct": true
        }
      ]
    },
    "reflection": "Name one business data risk and one realistic control to reduce that risk.",
    "skillTags": [
      "cybersecurity",
      "risk",
      "customer-trust",
      "leadership"
    ]
  },
  {
    "id": "smith-software-ownership",
    "name": "Robert F. Smith",
    "years": "Founded Vista 2000",
    "title": "Understand Who Owns the Software",
    "category": "Investment & Digital Ownership",
    "hook": "Building software is one way to create value. Owning and operating software companies is another. Robert F. Smith founded Vista Equity Partners in 2000. What makes a recurring-revenue technology business valuable?",
    "factChecks": [
      {
        "claim": "Robert F. Smith founded Vista Equity Partners in 2000.",
        "citation": "Vista Equity Partners, Robert F. Smith biography"
      },
      {
        "claim": "Smith worked in technology-focused investment banking before founding Vista.",
        "citation": "Vista Equity Partners, Robert F. Smith biography"
      }
    ],
    "sources": [
      {
        "label": "Vista Equity Partners: Robert F. Smith",
        "url": "https://www.vistaequitypartners.com/about/team/robert-f-smith/"
      }
    ],
    "scenes": [
      {
        "title": "Meet the software customer",
        "scene": "ledger",
        "narration": "A business pays for software when it saves time, reduces mistakes or improves results. An investor studies that customer relationship, revenue, costs and competition.",
        "question": "Why might a company pay every month for software?"
      },
      {
        "title": "Test the economics",
        "scene": "patent",
        "narration": "Ownership carries costs and risks. Before investing in a software company, investigate its customers, retention, operations and cash flow. A famous founder does not guarantee a good investment.",
        "question": "What evidence matters more than a company's popularity?"
      }
    ],
    "challenge": {
      "question": "Two software companies want investors. Which evidence matters most?",
      "choices": [
        {
          "id": "a",
          "label": "A famous logo without proof of paying customers.",
          "feedback": "Brand awareness alone does not establish a sustainable business."
        },
        {
          "id": "b",
          "label": "Paying customers, retention, credible costs and product value.",
          "feedback": "Right. These help evaluate durability and business economics.",
          "correct": true
        },
        {
          "id": "c",
          "label": "Promises of guaranteed future profits.",
          "feedback": "Returns cannot be guaranteed; assumptions require verification."
        }
      ]
    },
    "reflection": "Describe software that a business would pay for, who buys it, and a cost to deliver it.",
    "skillTags": [
      "software",
      "recurring-revenue",
      "investment-literacy",
      "ownership"
    ]
  }
];
