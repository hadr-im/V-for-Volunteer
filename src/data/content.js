import aymen from "../images/aymen.jpeg";

/* ─── EVENT ────────────────────────────────────────────────────────────────
   Single source of truth for anything that appears in more than one place,
   so the hero, the marquee and the footer can never disagree again.
   ───────────────────────────────────────────────────────────────────────── */

export const event = {
  name: "Linked Out",
  edition: "2.0",
  program: "AIESEC Global Talent Program",
  deadlineISO: "2026-05-03T11:00:00",
  dateLabel: "03 MAY 2026",
  dateNumeric: "03.05.2026",
  origin: "TUNIS",
  city: "Tunis, Tunisia",
  tagline:
    "A global professional micro-event by AIESEC connecting ambitious young professionals aged 18–30 with real international opportunities, mentors and industry leaders.",
};

/* ─── DESTINATIONS ─────────────────────────────────────────────────────────
   These are the pins on the hero globe, which is what gives it a job:
   it is the map of where this program can actually send you. `coords` is
   [latitude, longitude] of each entity's host city.
   ───────────────────────────────────────────────────────────────────────── */

/* `time`, `flight` and `gate` are set dressing for the departures board —
   the metaphor needs those columns to read as a real board. They are
   fixed per destination so the board never shows shifting numbers.
   Everything an applicant acts on (country, program, whether it is still
   open) is real, and the literal detail lives in the Opportunities rail. */
export const destinations = [
  { city: "GERMANY",     code: "DEU", flag: "🇩🇪", coords: [52.52, 13.40],   program: "Professional Exchange", time: "09:40", flight: "GT 149", gate: "03", status: "open" },
  { city: "BRAZIL",      code: "BRA", flag: "🇧🇷", coords: [-23.55, -46.63], program: "Professional Exchange", time: "10:15", flight: "GT 207", gate: "11", status: "open" },
  { city: "TURKIYE",     code: "TUR", flag: "🇹🇷", coords: [41.01, 28.98],   program: "Global Volunteer",      time: "10:50", flight: "GT 318", gate: "07", status: "filling" },
  { city: "SOUTH KOREA", code: "KOR", flag: "🇰🇷", coords: [37.57, 126.98],  program: "Business Development",  time: "11:25", flight: "GT 426", gate: "14", status: "open" },
  { city: "POLAND",      code: "POL", flag: "🇵🇱", coords: [52.23, 21.01],   program: "UX / UI Design",        time: "12:05", flight: "GT 533", gate: "02", status: "open" },
  { city: "EGYPT",       code: "EGY", flag: "🇪🇬", coords: [30.04, 31.24],   program: "Global Talent",         time: "12:40", flight: "GT 641", gate: "09", status: "filling" },
  { city: "ROMANIA",     code: "ROU", flag: "🇷🇴", coords: [44.43, 26.10],   program: "Professional Exchange", time: "13:15", flight: "GT 758", gate: "05", status: "open" },
  { city: "GREECE",      code: "GRC", flag: "🇬🇷", coords: [37.98, 23.73],   program: "Global Volunteer",      time: "13:55", flight: "GT 862", gate: "12", status: "open" },
  { city: "INDIA",       code: "IND", flag: "🇮🇳", coords: [28.61, 77.21],   program: "Education Volunteer",   time: "14:30", flight: "GT 970", gate: "08", status: "open" },
  { city: "KENYA",       code: "KEN", flag: "🇰🇪", coords: [-1.29, 36.82],   program: "Community Development", time: "15:10", flight: "GT 184", gate: "06", status: "filling" },
];

export const origin = { city: "TUNIS", flag: "🇹🇳", coords: [36.80, 10.18] };

/* Built once at module scope so the references stay stable — the globe
   re-runs its setup effects if this data changes identity. */

const ARC_COLORS = ["#FF8166", "#F85A40", "#FFA48F", "#D14328"];

/* Wider AIESEC network, shown on the globe only.
   These are NOT open placements, so they stay off the departures board —
   the board lists things you can actually apply to today. They exist to
   give the globe more connected countries without inventing vacancies. */
export const networkNodes = [
  { city: "PORTUGAL", coords: [38.72, -9.14] },
  { city: "ITALY",    coords: [41.9, 12.5] },
  { city: "VIETNAM",  coords: [21.03, 105.85] },
  { city: "MEXICO",   coords: [19.43, -99.13] },
  { city: "MOROCCO",  coords: [33.57, -7.59] },
  { city: "CANADA",   coords: [45.42, -75.7] },
];

export const globePoints = [
  { lat: origin.coords[0], lng: origin.coords[1], size: 0.7, color: "#FFFFFF" },
  ...destinations.map((d) => ({
    lat: d.coords[0],
    lng: d.coords[1],
    size: 0.45,
    color: "#FF8166",
  })),
  // Network nodes sit dimmer and smaller than bookable destinations.
  ...networkNodes.map((n) => ({
    lat: n.coords[0],
    lng: n.coords[1],
    size: 0.3,
    color: "#9E3A25",
  })),
];

/* Hub and spoke out of Tunis — the arcs are the story: this is where the
   program can send you from here. Cross-links between host entities keep
   the far side of the globe from looking empty as it rotates. */
const CROSS_LINKS = [
  ["GERMANY", "BRAZIL"],
  ["SOUTH KOREA", "INDIA"],
  ["POLAND", "GREECE"],
  ["EGYPT", "KENYA"],
];

const byCity = (city) => destinations.find((d) => d.city === city);

const arcFrom = (from, to, order, alt, colorIndex) => ({
  order,
  startLat: from[0],
  startLng: from[1],
  endLat: to[0],
  endLng: to[1],
  arcAlt: alt,
  color: ARC_COLORS[colorIndex % ARC_COLORS.length],
});

export const globeArcs = [
  ...destinations.map((d, i) =>
    arcFrom(origin.coords, d.coords, i, 0.14 + (i % 4) * 0.07, i)
  ),
  ...CROSS_LINKS.map(([a, b], i) =>
    arcFrom(
      byCity(a).coords,
      byCity(b).coords,
      destinations.length + i,
      0.26 + i * 0.05,
      i + 2
    )
  ),
  ...networkNodes.map((n, i) =>
    arcFrom(
      origin.coords,
      n.coords,
      destinations.length + CROSS_LINKS.length + i,
      0.18 + (i % 3) * 0.09,
      i + 1
    )
  ),
];

/* ─── WHY ATTEND ───────────────────────────────────────────────────────────── */

export const whyAttend = [
  {
    title: "Global Network",
    desc: "Connect with young professionals across a dozen countries through curated sessions built for real conversation, not small talk.",
  },
  {
    title: "Career Boost",
    desc: "Access exclusive listings, internships and talent programs from organisations hiring internationally right now.",
  },
  {
    title: "Expert Mentorship",
    desc: "Get matched with experienced AIESEC alumni and industry mentors who have already made the jump you are planning.",
  },
  {
    title: "Leadership Skills",
    desc: "Develop cross-cultural leadership through live challenges, hands-on workshops and projects with actual stakes.",
  },
  {
    title: "Certified Learning",
    desc: "Earn a recognised certificate of participation to put on your LinkedIn profile and your CV the week after.",
  },
  {
    title: "Go Abroad",
    desc: "Get priority matching for AIESEC's global exchange programs across our host countries worldwide.",
  },
];

/* ─── PROJECT LEAD ─────────────────────────────────────────────────────────── */

/* The section pages through this array, so adding someone is one object.
   `photo` is an import from ../images; omit it and their initials render
   instead. There is an unused haithem.jpeg sitting in src/images if a
   second member is meant to be here. */
export const crew = [
  {
    id: "aymen",
    name: "Aymen Zouaoui",
    role: "Project Head",
    initials: "AZ",
    photo: aymen,
    phone: "+216 26 038 745",
    email: "aymen.zouaoui@aiesec.net",
    country: "Tunisia",
    bio: "Aymen leads Linked Out 2.0 end to end — from the partner organisations hosting our exchanges to the people who will be standing in the room on the day. If you have a question the site does not answer, he is the one to ask.",
  },
];

/* ─── OPPORTUNITIES ────────────────────────────────────────────────────────── */

export const opportunities = [
  {
    id: 1,
    code: "DEU",
    title: "Global Talent Program — Marketing",
    org: "AIESEC in Germany",
    flag: "🇩🇪",
    duration: "6–8 weeks",
    type: "Professional Exchange",
    deadline: "30 MAY 2026",
    tags: ["Marketing", "Digital", "Paid"],
  },
  {
    id: 2,
    code: "BRA",
    title: "Software Engineering Internship",
    org: "AIESEC in Brazil",
    flag: "🇧🇷",
    duration: "3 months",
    type: "Professional Exchange",
    deadline: "10 JUN 2026",
    tags: ["Tech", "React", "Stipend"],
  },
  {
    id: 3,
    code: "IND",
    title: "Social Impact — Education Volunteer",
    org: "AIESEC in India",
    flag: "🇮🇳",
    duration: "6 weeks",
    type: "Global Volunteer",
    deadline: "01 JUN 2026",
    tags: ["Education", "NGO", "Volunteer"],
  },
  {
    id: 4,
    code: "KOR",
    title: "Business Development Exchange",
    org: "AIESEC in South Korea",
    flag: "🇰🇷",
    duration: "2 months",
    type: "Professional Exchange",
    deadline: "25 MAY 2026",
    tags: ["Business", "Strategy", "Paid"],
  },
  {
    id: 5,
    code: "POL",
    title: "UX / UI Design Internship",
    org: "AIESEC in Poland",
    flag: "🇵🇱",
    duration: "6 weeks",
    type: "Professional Exchange",
    deadline: "15 JUN 2026",
    tags: ["Design", "Figma", "Remote"],
  },
  {
    id: 6,
    code: "KEN",
    title: "Community Development Volunteer",
    org: "AIESEC in Kenya",
    flag: "🇰🇪",
    duration: "8 weeks",
    type: "Global Volunteer",
    deadline: "01 JUL 2026",
    tags: ["Community", "Impact", "Volunteer"],
  },
];

/* ─── MARQUEE ──────────────────────────────────────────────────────────────
   ⚠ PLACEHOLDER FIGURES — carried over from the old build, which
   contradicted itself (hero said 12+ countries, ticker said 10+, the
   program card listed 5). Replace with the real numbers; everything that
   displays them reads from here.
   ───────────────────────────────────────────────────────────────────────── */

export const marqueeRows = [
  ["12+ COUNTRIES", "BORDERLESS", "PAID STIPEND", "100+ ALUMNI"],
  ["AGED 18–30", "12 WEEKS", "FREE TO ATTEND", "6 PROGRAMS"],
  ["MENTORSHIP", "CERTIFICATE", "REAL PLACEMENTS", "NO EXPERIENCE NEEDED"],
];

/* ─── NAV + FOOTER ─────────────────────────────────────────────────────────── */

export const navLinks = [
  { label: "Why Attend",    href: "#why" },
  { label: "Project Lead",  href: "#lead" },
  { label: "Opportunities", href: "#opportunities" },
];

export const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/linkedout2.0?igsh=ZGczNGN1azV1dTZo",
  },
];
