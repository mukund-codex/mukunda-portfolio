/**
 * Work history and education. Real entries only; empty arrays hide the section.
 *
 * experience item: { role, organization, location, start: "2022", end: "Present", description: "", highlights: [] }
 * education item:  { qualification, institution, start, end, description: "" }
 */
export const experience = [
  {
    role: "Technical Lead / SDE-III",
    organization: "Anarock Property Consultants (Anacity Platform)",
    location: "Bengaluru",
    start: "Oct 2025",
    end: "Present",
    description: "Leading a team of 5 engineers on a multi-tenant proptech SaaS platform.",
    highlights: [
      "Wrote HLD/LLD for the billing engine, real-time notifications, amenity booking, RBAC and visitor management microservices.",
      "Cut production bugs by 68% (from 632 to about 200) in 2 months.",
      "Optimized MySQL and PostgreSQL and introduced Redis cache-aside caching.",
      "Set up the observability stack with New Relic, Bugsnag and Papertrail.",
      "Built an idempotent payment gateway integration and an API versioning strategy.",
      "Delivered real-time Zendesk and Jira analytics dashboards.",
    ],
  },
  {
    role: "Senior Software Engineer",
    organization: "Canterr India Pvt Ltd",
    location: "Mumbai",
    start: "Nov 2024",
    end: "Jul 2025",
    highlights: [
      "Built a GraphQL layer over MySQL with DataLoader, raising API throughput by 40%.",
      "Tuned 50+ SQL queries to bring down p95 latency.",
      "Introduced architecture review checkpoints.",
      "Led root-cause analyses and added Redis caching.",
    ],
  },
  {
    role: "Senior Software Engineer",
    organization: "Founder and Lightning Pvt Ltd",
    location: "Mumbai",
    start: "Sep 2022",
    end: "Jul 2024",
    highlights: [
      "Broke a monolith into Laravel microservices and dockerized 10+ services.",
      "Built zero-downtime CI/CD with CircleCI and Docker: release cycles 50% shorter, deploy errors down 25%, 99.9% uptime.",
      "Reduced page load time by 40%.",
      "Reached 95% API test coverage across 200+ Postman tests.",
      "Mentored 5 engineers, lifting team velocity by 15%; TDD cut regressions by 20%.",
    ],
  },
  {
    role: "Software Engineer",
    organization: "mPokket (Fintech)",
    location: "Mumbai",
    start: "Nov 2020",
    end: "Aug 2022",
    highlights: [
      "Built the repayment processing module, raising transaction success by 25% and throughput by 35%.",
      "Increased system capacity by 40%.",
      "Mentoring cut new-joiner ramp-up time by 30%.",
    ],
  },
  {
    role: "PHP Developer",
    organization: "Techizer Tech Solutions Pvt Ltd",
    location: "Mumbai",
    start: "Aug 2019",
    end: "Nov 2020",
    highlights: [
      "Built microservice backends and REST APIs for 10+ client projects, improving scalability by 25%.",
      "Delivered 30% ahead of schedule on average.",
    ],
  },
  {
    role: "PHP Developer / Software Developer",
    organization: "Innovins Softtech & Progressive Interactive",
    location: "Mumbai",
    start: "Apr 2017",
    end: "Jul 2019",
    highlights: [
      "Full-stack PHP and Laravel development.",
      "Reduced post-release defects by 35% with 95% on-time delivery.",
    ],
  },
];

export const education = [
  {
    qualification: "B.E. Information Technology",
    institution: "Thakur College of Engineering & Technology, Mumbai",
    start: "",
    end: "2017",
  },
];
