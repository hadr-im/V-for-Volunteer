// ─── SPEAKERS ──────────────────────────────────────────────────────────────
export const speakers = [
  {
    id: 1,
    name: "Amira Hassan",
    role: "Global Talent Director",
    company: "Unilever",
    country: "Egypt",
    flag: "🇪🇬",
    topic: "Building a borderless career in the FMCG world",
    avatar: "AH",
    color: "#00B09B",
  },
  {
    id: 2,
    name: "Lucas Ferreira",
    role: "VP of Engineering",
    company: "Nubank",
    country: "Brazil",
    flag: "🇧🇷",
    topic: "From AIESEC exchange to Silicon Valley — my 10-year journey",
    avatar: "LF",
    color: "#007A6E",
  },
  {
    id: 3,
    name: "Yuna Park",
    role: "Co-founder & CEO",
    company: "GrowthLoop",
    country: "South Korea",
    flag: "🇰🇷",
    topic: "Entrepreneurship with a global mindset",
    avatar: "YP",
    color: "#00D4B8",
  },
  {
    id: 4,
    name: "Sofia Martínez",
    role: "Senior Consultant",
    company: "McKinsey & Co.",
    country: "Spain",
    flag: "🇪🇸",
    topic: "Networking across cultures: what actually works",
    avatar: "SM",
    color: "#005F55",
  },
];

// ─── ORGANIZING TEAM ────────────────────────────────────────────────────────
// data/content.js
export const team = [
  
  {
    id: "aymen",
    name: "Aymen Zouaoui",
    role: "Project Head",
    avatar: "MS",
    photo: "src/images/aymen.jpeg",
    phone: "+216 26038745",
    email: "aymen.zouaoui@aiesec.net",
    flag: "🇹🇳",
    country: "Tunisia",
  },
];

// ─── AGENDA ─────────────────────────────────────────────────────────────────
export const agenda = [
  {
    day: "Day 1",
    date: "May 14, 2025",
    label: "Connect",
    events: [
      { time: "09:00",  title: "Registration & Welcome Coffee",     type: "break"    },
      { time: "10:00",  title: "Opening Keynote — AIESEC Vision",   type: "keynote"  },
      { time: "11:00",  title: "Speaker: Amira Hassan",             type: "talk"     },
      { time: "12:30",  title: "Networking Lunch",                  type: "break"    },
      { time: "14:00",  title: "Panel: Global Careers Decoded",     type: "panel"    },
      { time: "15:30",  title: "Workshop: Build Your LinkedIn Brand",type: "workshop" },
      { time: "17:00",  title: "Networking Mixer & Close",          type: "break"    },
    ],
  },
  {
    day: "Day 2",
    date: "May 15, 2025",
    label: "Grow",
    events: [
      { time: "09:30",  title: "Morning Briefing & Icebreakers",    type: "break"    },
      { time: "10:00",  title: "Speaker: Lucas Ferreira",           type: "talk"     },
      { time: "11:15",  title: "Speaker: Yuna Park",                type: "talk"     },
      { time: "12:30",  title: "Lunch & Opportunity Showcase",      type: "break"    },
      { time: "14:00",  title: "Workshop: CV & Interview Mastery",  type: "workshop" },
      { time: "15:30",  title: "Speaker: Sofia Martínez",           type: "talk"     },
      { time: "17:00",  title: "Closing Ceremony & Group Photo",    type: "keynote"  },
    ],
  },
];

// ─── OPPORTUNITIES (replace with Google Sheets fetch in production) ─────────
export const opportunities = [
  {
    id: 1,
    title: "Global Talent Program — Marketing",
    org: "AIESEC in Germany",
    country: "Germany",
    flag: "🇩🇪",
    duration: "6–8 weeks",
    type: "Professional Exchange",
    deadline: "May 30, 2025",
    tags: ["Marketing", "Digital", "Paid"],
    link: "#",
  },
  {
    id: 2,
    title: "Software Engineering Internship",
    org: "AIESEC in Brazil",
    country: "Brazil",
    flag: "🇧🇷",
    duration: "3 months",
    type: "Professional Exchange",
    deadline: "June 10, 2025",
    tags: ["Tech", "React", "Stipend"],
    link: "#",
  },
  {
    id: 3,
    title: "Social Impact — Education Volunteer",
    org: "AIESEC in India",
    country: "India",
    flag: "🇮🇳",
    duration: "6 weeks",
    type: "Volunteer",
    deadline: "June 1, 2025",
    tags: ["Education", "NGO", "Volunteer"],
    link: "#",
  },
  {
    id: 4,
    title: "Business Development Exchange",
    org: "AIESEC in South Korea",
    country: "South Korea",
    flag: "🇰🇷",
    duration: "2 months",
    type: "Professional Exchange",
    deadline: "May 25, 2025",
    tags: ["Business", "Strategy", "Paid"],
    link: "#",
  },
  {
    id: 5,
    title: "UX/UI Design Internship",
    org: "AIESEC in Poland",
    country: "Poland",
    flag: "🇵🇱",
    duration: "6 weeks",
    type: "Professional Exchange",
    deadline: "June 15, 2025",
    tags: ["Design", "Figma", "Remote"],
    link: "#",
  },
  {
    id: 6,
    title: "Community Development Volunteer",
    org: "AIESEC in Kenya",
    country: "Kenya",
    flag: "🇰🇪",
    duration: "8 weeks",
    type: "Volunteer",
    deadline: "July 1, 2025",
    tags: ["Community", "Impact", "Volunteer"],
    link: "#",
  },
];

// ─── BENEFITS ────────────────────────────────────────────────────────────────
export const benefits = [
  {
   
    title: "Global Network",
    desc: "Connect with a lot of young professionals across different countries through curated sessions.",
  },
  {
  
    title: "Career Boost",
    desc: "Access exclusive listings, internships, and talent programs from top global organizations.",
  },
  {
    
    title: "Expert Mentorship",
    desc: "Get matched with experienced AIESEC alumni and industry mentors guiding your journey.",
  },
  {
    
    title: "Leadership Skills",
    desc: "Develop cross-cultural leadership through live challenges, workshops, and real projects.",
  },
  {
    
    title: "Certified Learning",
    desc: "Earn a recognized certificate of participation to showcase on LinkedIn and your CV.",
  },
  {
    
    title: "Go Abroad",
    desc: "Get priority matching for AIESEC's global exchange programs in different host countries.",
  },
];
