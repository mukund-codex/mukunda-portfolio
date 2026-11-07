import { site } from "../config/site.js";
import { projects } from "../data/projects.js";
import { experience, education } from "../data/experience.js";

const { identity, contact, portfolio, preferences } = site;

export const has = (value) =>
  Array.isArray(value) ? value.length > 0 : typeof value === "string" ? value.trim() !== "" : Boolean(value);

export const brandName = identity.displayName || identity.fullName || "Portfolio";

export const initials =
  (identity.fullName || identity.displayName || "P")
    .split(/\s+/)
    .filter(Boolean)
    .filter((part, index, parts) => index === 0 || index === parts.length - 1) // first + last name
    .map((part) => part[0].toUpperCase())
    .join("") || "P";

/** Storage key derived from the brand so settings don't clash across sites. */
export const storageKey = (name) =>
  `${brandName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-portfolio:${name}`;

export const SOCIAL_FIELDS = [
  ["linkedin", "LinkedIn"],
  ["github", "GitHub"],
  ["behance", "Behance"],
  ["dribbble", "Dribbble"],
  ["instagram", "Instagram"],
  ["youtube", "YouTube"],
];

export const socialLinks = [
  ...SOCIAL_FIELDS.filter(([key]) => has(contact[key])).map(([key, label]) => ({
    key,
    label,
    url: contact[key],
  })),
  ...contact.otherLinks
    .filter((link) => has(link?.url) && has(link?.label))
    .map((link) => ({ key: link.label.toLowerCase(), label: link.label, url: link.url })),
];

export const whatsappDigits = contact.whatsapp.replace(/\D/g, "");

export const whatsappLink = (message) =>
  whatsappDigits ? `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(message)}` : "";

export const resumeUrl = preferences.showDownloadResume && has(identity.resume) ? identity.resume : "";

export const featuredProjects = (() => {
  const byId = portfolio.featuredProjectIds
    .map((id) => projects.find((project) => project.id === id))
    .filter(Boolean);
  const list = byId.length ? byId : projects.filter((project) => project.featured);
  return list.slice(0, 4);
})();

export const categories = has(portfolio.categories)
  ? portfolio.categories
  : [...new Set(projects.map((project) => project.category).filter(Boolean))];

export const sections = {
  about:
    has(identity.about) ||
    has(portfolio.skills) ||
    has(portfolio.tools) ||
    has(portfolio.processSteps) ||
    (preferences.showEducation && has(education)),
  experience: preferences.showExperience && has(experience),
  awards: preferences.showAwards && has(portfolio.awards),
  testimonials: preferences.showTestimonials && has(portfolio.testimonials),
  clientLogos: preferences.showClientLogos && has(portfolio.clientLogos),
  contact: has(contact.email) || has(whatsappDigits) || socialLinks.length > 0,
};

export const showEducation = preferences.showEducation && has(education);

/** Two-digit index for section kickers, counting only sections that render. */
const ORDER = ["work", "about", "experience", "awards", "testimonials", "contact"];
export const sectionNumber = (id) => {
  const visible = ORDER.filter((key) => key === "work" || sections[key]);
  return String(visible.indexOf(id) + 1).padStart(2, "0");
};
