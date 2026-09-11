export const EXPOSURE_WORLDS = [
  {
    id: 'design-build',
    label: 'Design + Build',
    prompt: 'How do people turn an idea into a place, product, structure, or system?',
  },
  {
    id: 'technology',
    label: 'Technology + Systems',
    prompt: 'How can software, AI, data, machines, or automation solve a real problem?',
  },
  {
    id: 'business',
    label: 'Business + Ownership',
    prompt: 'Who is the customer, where does money move, and what can be owned or improved?',
  },
  {
    id: 'creative-media',
    label: 'Creative + Media',
    prompt: 'How do story, music, design, content, and communication create attention or value?',
  },
  {
    id: 'health-service',
    label: 'Health + Service',
    prompt: 'How do people help others live, heal, learn, perform, or feel better?',
  },
  {
    id: 'community-leadership',
    label: 'Community + Leadership',
    prompt: 'How do people organize, lead, solve community problems, and improve public life?',
  },
  {
    id: 'trades-operations',
    label: 'Trades + Operations',
    prompt: 'What skilled hands-on work keeps homes, businesses, transportation, and infrastructure moving?',
  },
  {
    id: 'science-discovery',
    label: 'Science + Discovery',
    prompt: 'What can be tested, measured, researched, invented, or understood more deeply?',
  },
];

const CLUSTERS = [
  {
    id: 'built-environment',
    world: 'design-build',
    label: 'Architecture + Built Environment',
    keywords: ['architect', 'architecture', 'building', 'floor plan', 'urban design', 'construction design'],
    adjacent: ['Urban planning', 'Interior design', 'Civil engineering', 'Construction management', 'CAD / BIM design', 'Landscape architecture', 'Real-estate development'],
    tryIt: 'Choose a room, house, block, park, or storefront. Redesign it to solve one real problem and explain why your design is better.',
    money: 'Trace who owns the project, who pays for it, who approves the budget, what labor and materials cost, and where value is created.',
    technology: 'Explore CAD/BIM, 3D modeling, mapping, rendering, drones, digital measuring, and project-management tools.',
    people: 'Meet or interview an architect, contractor, engineer, planner, designer, developer, or skilled tradesperson.',
  },
  {
    id: 'technology',
    world: 'technology',
    label: 'Technology + Digital Systems',
    keywords: ['coding', 'coder', 'software', 'computer', 'ai', 'artificial intelligence', 'cyber', 'robot', 'app', 'technology', 'tech'],
    adjacent: ['Software development', 'Cybersecurity', 'Data analysis', 'Product design', 'AI operations', 'Automation', 'Technical sales'],
    tryIt: 'Pick one annoying problem and build or sketch a small digital tool, workflow, automation, or prototype that could reduce the problem.',
    money: 'Ask who would pay for the solution, what it costs to build and support, and whether the value is a product, service, subscription, or internal savings.',
    technology: 'Compare at least two tools and explain what each one can and cannot do. The tool should support your thinking, not replace it.',
    people: 'Talk with a builder, developer, IT professional, designer, business owner, or user who actually lives with the problem.',
  },
  {
    id: 'business',
    world: 'business',
    label: 'Business + Entrepreneurship',
    keywords: ['business', 'entrepreneur', 'owner', 'sales', 'marketing', 'store', 'company', 'money'],
    adjacent: ['Sales', 'Marketing', 'Operations', 'Finance', 'E-commerce', 'Procurement', 'Business analysis'],
    tryIt: 'Find a real customer problem, make a simple offer, test whether somebody understands it, and record what would have to improve.',
    money: 'Map price, cost, profit, cash flow, customer acquisition, and what must be paid before the owner gets paid.',
    technology: 'Explore booking, payments, CRM, lead capture, automation, analytics, and AI as tools that can make a business work better.',
    people: 'Talk with a customer, owner, salesperson, operator, accountant, or supplier and compare what each one sees.',
  },
  {
    id: 'creative',
    world: 'creative-media',
    label: 'Creative + Media',
    keywords: ['music', 'artist', 'video', 'youtube', 'film', 'media', 'photography', 'writer', 'writing', 'content', 'podcast'],
    adjacent: ['Production', 'Editing', 'Graphic design', 'Publishing', 'Audio engineering', 'Marketing', 'Creative direction'],
    tryIt: 'Create one small piece of work for a real audience, then ask what they understood, felt, remembered, or wanted next.',
    money: 'Study who owns the work, how rights and royalties work, who gets paid, what distribution costs, and how an audience becomes revenue.',
    technology: 'Explore editing, design, publishing, audio, analytics, AI-assisted production, and distribution tools.',
    people: 'Talk with a creator and somebody behind the scenes such as an editor, producer, manager, marketer, designer, or distributor.',
  },
  {
    id: 'health',
    world: 'health-service',
    label: 'Health + Human Service',
    keywords: ['doctor', 'nurse', 'health', 'medical', 'therapy', 'therapist', 'dentist', 'fitness', 'trainer', 'social work'],
    adjacent: ['Nursing', 'Therapy', 'Public health', 'Medical technology', 'Healthcare administration', 'Fitness', 'Social services'],
    tryIt: 'Choose one health or quality-of-life problem and map what a person needs before, during, and after receiving help.',
    money: 'Explore who pays, what insurance or public funding may do, what care costs, and how a mission-driven service stays financially healthy.',
    technology: 'Explore scheduling, health records, wearables, diagnostics, telehealth, accessibility tools, and privacy-aware data systems.',
    people: 'Talk with a care provider, patient advocate, administrator, technician, trainer, or community health worker.',
  },
  {
    id: 'sports',
    world: 'health-service',
    label: 'Sports + Performance',
    keywords: ['sports', 'athlete', 'basketball', 'football', 'baseball', 'soccer', 'coach', 'trainer'],
    adjacent: ['Coaching', 'Sports medicine', 'Analytics', 'Event operations', 'Media', 'Marketing', 'Facility management'],
    tryIt: 'Study one part of performance beyond playing: training, recovery, film study, stats, event operations, fan experience, or coaching.',
    money: 'Look at who earns money around the sport besides athletes: teams, venues, trainers, media, sponsors, agents, vendors, and businesses.',
    technology: 'Explore video analysis, wearables, stats, ticketing, scheduling, streaming, fan engagement, and training technology.',
    people: 'Talk with a coach, trainer, official, venue worker, sports-media person, business owner, or athlete.',
  },
  {
    id: 'fashion-beauty',
    world: 'creative-media',
    label: 'Fashion + Beauty',
    keywords: ['fashion', 'clothes', 'clothing', 'designer', 'barber', 'hair', 'beauty', 'cosmetology', 'makeup'],
    adjacent: ['Product design', 'Cosmetology', 'Branding', 'Retail', 'Manufacturing', 'Photography', 'E-commerce'],
    tryIt: 'Create or improve one look, product, service, or customer experience and explain who it is for and why it matters.',
    money: 'Break down materials, labor, pricing, inventory, appointments, customer retention, brand value, and profit.',
    technology: 'Explore design tools, booking, e-commerce, inventory, social content, customer follow-up, and digital payments.',
    people: 'Talk with a working barber, stylist, designer, retailer, photographer, supplier, or brand owner.',
  },
  {
    id: 'food-hospitality',
    world: 'business',
    label: 'Food + Hospitality',
    keywords: ['chef', 'cook', 'cooking', 'restaurant', 'food', 'baker', 'hospitality', 'hotel'],
    adjacent: ['Culinary arts', 'Restaurant operations', 'Food science', 'Hospitality management', 'Events', 'Procurement', 'Branding'],
    tryIt: 'Design one meal, product, service, or guest experience. Test it with someone and record what they would change.',
    money: 'Break down ingredients, labor, waste, pricing, capacity, customer volume, tips, overhead, and profit.',
    technology: 'Explore point-of-sale, reservations, delivery, inventory, scheduling, reviews, digital menus, and kitchen technology.',
    people: 'Talk with a cook, chef, server, manager, owner, supplier, event planner, or guest.',
  },
  {
    id: 'transportation',
    world: 'trades-operations',
    label: 'Transportation + Logistics',
    keywords: ['truck', 'trucking', 'driver', 'transportation', 'logistics', 'car', 'mechanic', 'aviation', 'pilot'],
    adjacent: ['Logistics', 'Fleet management', 'Diesel technology', 'Dispatch', 'Supply chain', 'Aviation operations', 'Transportation entrepreneurship'],
    tryIt: 'Map how one person, product, or vehicle moves from point A to point B and identify where time, money, or safety is being lost.',
    money: 'Study fuel, maintenance, insurance, financing, labor, routes, downtime, pricing, margins, and asset ownership.',
    technology: 'Explore GPS, routing, fleet software, diagnostics, cameras, dispatch tools, automation, and logistics data.',
    people: 'Talk with a driver, dispatcher, mechanic, fleet owner, warehouse operator, broker, or transportation customer.',
  },
  {
    id: 'community',
    world: 'community-leadership',
    label: 'Community + Public Leadership',
    keywords: ['community', 'government', 'politics', 'law', 'lawyer', 'teacher', 'education', 'nonprofit', 'police', 'firefighter'],
    adjacent: ['Public administration', 'Law', 'Education', 'Nonprofit leadership', 'Community development', 'Policy', 'Public safety'],
    tryIt: 'Choose one problem in your school, block, neighborhood, or community. Map who is affected, who has authority, and one realistic improvement.',
    money: 'Follow how public, nonprofit, grant, tax, donor, and earned-income dollars can fund community work and why accountability matters.',
    technology: 'Explore mapping, community data, communications, digital forms, accessibility, case management, and public-information tools.',
    people: 'Talk with a resident, organizer, teacher, nonprofit leader, public employee, elected official, attorney, or service provider.',
  },
];

const FALLBACK = {
  id: 'open-exploration',
  world: null,
  label: 'Open Exploration',
  adjacent: ['A role that builds things', 'A role that helps people', 'A role that uses technology', 'A role that moves money', 'A role that tells stories', 'A role that leads or organizes'],
  tryIt: 'Choose one thing you are curious about. Find a tiny way to try the work instead of only reading about the job title.',
  money: 'Ask how money enters this field, who pays, what costs money, what creates value, and what can be owned.',
  technology: 'Ask which tools people in this field actually use and what technology is changing about the work.',
  people: 'Find one person doing the work and ask what the job is really like, what surprised them, and what they wish they knew earlier.',
};

const LANE_GUIDANCE = {
  explorer: {
    headline: 'Try it. Notice it. Tell us what felt interesting.',
    questions: ['What part looks fun?', 'What would you like to make, fix, or help with?', 'What did you learn that you did not know before?'],
  },
  builder: {
    headline: 'Try it, compare it, and ask better questions.',
    questions: ['What problem does this work solve?', 'Which part would you want to learn first?', 'What other job is connected to this one?'],
  },
  leader: {
    headline: 'Test the role against real work, real people, and real value.',
    questions: ['What skills does this direction actually require?', 'Who benefits from the work and who pays for it?', 'What adjacent path might fit you even better?'],
  },
  yaep: {
    headline: 'Turn curiosity into evidence about fit, opportunity, and next moves.',
    questions: ['What is the entry path and what proof of skill would matter?', 'Where is the money, ownership, leverage, or public value in this field?', 'What adjacent role or industry could create a stronger fit?'],
  },
};

function normalize(value) {
  return String(value || '').trim().toLowerCase();
}

export function findDirectionCluster(interest) {
  const text = normalize(interest);
  if (!text) return FALLBACK;
  return CLUSTERS.find((cluster) => cluster.keywords.some((keyword) => text.includes(keyword))) || FALLBACK;
}

export function getDirectionGuide(interest, mode) {
  const cluster = findDirectionCluster(interest);
  const lane = LANE_GUIDANCE[mode] || LANE_GUIDANCE.builder;
  const availableOutside = EXPOSURE_WORLDS.filter((world) => world.id !== cluster.world);
  const seed = normalize(interest).split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const outside = availableOutside[seed % availableOutside.length] || EXPOSURE_WORLDS[0];
  return { cluster, lane, outside };
}
