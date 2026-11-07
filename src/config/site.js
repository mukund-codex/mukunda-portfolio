/**
 * SITE CONFIGURATION — the single place to edit personal details.
 *
 * Every name, link, date and claim shown on the site comes from this file
 * and the data modules in src/data/. Leave a field empty ("" or []) and the
 * matching UI disappears cleanly; never fill it with made-up content.
 *
 * TODO(owner): remaining TODOs are websiteUrl, LinkedIn and the CV file.
 */

export const site = {
  // Design reference used while building: https://touquirakhtar.com/ (inspiration only, not bundled).
  websiteUrl: "", // TODO(owner): your own domain, e.g. "https://example.com/" (used for canonical + OG)

  identity: {
    fullName: "Mukunda Rajesh Vishwakarma",
    displayName: "Mukunda", // short wordmark used in the header/footer
    profession: "Senior Software Developer",
    roleLine2: "Platform modernization · Backend & DevOps",
    location: "Bengaluru, India",
    availability: "", // e.g. "Available for work"; empty hides it
    headline: "Mukunda Vishwakarma", // hero name; empty falls back to fullName
    intro:
      "Senior Software Developer and Technical Lead with 8+ years building scalable, high-performance systems across fintech, proptech and SaaS. I modernize legacy platforms, design APIs and microservices, and own delivery from HLD/LLD to production observability.",
    about: `I'm a Senior Software Developer and Technical Lead with 8+ years of experience building scalable, high-performance distributed systems across fintech, proptech and SaaS.

My core stack is PHP (Laravel, Zend), JavaScript and TypeScript, ReactJS, and web components / PWA. I specialise in modernizing legacy codebases, containerizing services with Docker, building CI/CD pipelines, and running third-party integrations at scale.

I lead and mentor engineering teams and own the full lifecycle of what we ship, from high- and low-level design through to production observability.`,
    portrait: "", // e.g. "/assets/portrait.webp"; empty = typographic hero
    resume: "", // TODO(owner): add your CV as public/assets/resume.pdf, then set "/assets/resume.pdf" and showDownloadResume
    favicon: "", // empty = generated initials icon
  },

  contact: {
    email: "mukundvishwakarma042@gmail.com",
    phone: "", // not published yet; owner to confirm
    whatsapp: "", // international digits only, e.g. "919876543210"
    instagram: "",
    youtube: "",
    linkedin: "", // TODO(owner): LinkedIn profile URL
    github: "https://github.com/mukund-codex",
    behance: "",
    dribbble: "",
    otherLinks: [], // [{ label: "Blog", url: "https://..." }]
  },

  portfolio: {
    featuredProjectIds: ["nexnest", "bodyiq", "savewise", "snagging"],
    categories: [], // empty = derived from projects
    clientLogos: [], // [{ name, src }] — real, authorized clients only
    processSteps: [], // [{ title, text }]
    skills: [
      "PHP",
      "Laravel",
      "Zend",
      "JavaScript",
      "TypeScript",
      "Python",
      "ReactJS",
      "LitElement",
      "PWA & web components",
      "Microservices",
      "REST API design",
      "HLD / LLD",
      "Event-driven architecture",
      "MySQL",
      "PostgreSQL",
      "Redis",
      "AWS (EC2, RDS, S3)",
      "Docker",
      "Terraform",
      "CI/CD",
      "TDD",
      "Team leadership & mentoring",
    ],
    tools: ["CircleCI", "Heroku", "New Relic", "Bugsnag", "Papertrail", "Postman", "Jira", "Confluence", "Git"],
    awards: [], // [{ title, issuer, year, url }]
    testimonials: [], // [{ quote, name, role }] — permissioned quotes only
    metrics: [
      { value: "8+", label: "Years building software" },
      { value: "5", label: "Engineers led at Anarock" },
      { value: "68%", label: "Fewer production bugs in 2 months" },
      { value: "99.9%", label: "Uptime after CI/CD overhaul" },
    ], // verified stats only (from the owner's resume)
  },

  appearance: {
    theme: "dark",
    background: "#090909",
    text: "#f2efeb",
    accent: "#e32b3c",
    muted: "#a09c9a",
    displayFont: "Anton",
    bodyFont: "Manrope",
    accentFont: "Caveat",
    animationIntensity: "balanced", // subtle | balanced | expressive
    language: "English",
  },

  preferences: {
    showAwards: false,
    showEducation: true,
    showExperience: true,
    showClientLogos: false,
    showTestimonials: false,
    showContactForm: true,
    showDownloadResume: false,
    showProjectArchive: true,
  },
};

/** UI copy, kept here so the site can be translated in one place. */
export const labels = {
  nav: { work: "Work", about: "About", experience: "Experience", contact: "Contact" },
  viewWork: "View work",
  contact: "Contact",
  getInTouch: "Get in touch",
  motion: "Motion",
  animations: "Animations",
  motionOn: "Animations on",
  motionOff: "Animations off",
  motionDisabled: "Turn animations on to play",
  selectedWork: "Selected work",
  allWork: "All projects",
  searchProjects: "Search projects",
  all: "All",
  loadMore: "Load more",
  noProjectsTitle: "Case studies coming soon",
  noProjectsText: "Projects are being prepared and will be published here shortly.",
  noMatches: "No projects match your search.",
  viewProject: "View project",
  liveSite: "Live site",
  source: "Source code",
  role: "Role",
  tools: "Tools",
  outcomes: "Outcomes",
  about: "About",
  skills: "Skills",
  toolsHeading: "Tools",
  process: "Process",
  experience: "Experience",
  education: "Education",
  contactHeading: "Let's build something",
  contactText: "Have a project in mind or just want to say hello? Send a message.",
  name: "Name",
  email: "Email",
  message: "Message",
  send: "Open in email app",
  formNote: "This opens your email app with the message ready to send. Nothing is sent from this site.",
  backToTop: "Back to top",
  downloadResume: "Download CV",
  close: "Close",
  menu: "Menu",
};
