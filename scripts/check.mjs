// Content and build sanity checks. Run after a build: `npm run check`.
import { existsSync, readFileSync } from "node:fs";
import { site } from "../src/config/site.js";
import { projects } from "../src/data/projects.js";
import { experience, education } from "../src/data/experience.js";

const errors = [];
const warnings = [];

for (const file of ["dist/index.html", "dist/main.js", "dist/main.css"]) {
  if (!existsSync(file)) errors.push(`Missing build output: ${file}`);
}

const html = existsSync("dist/index.html") ? readFileSync("dist/index.html", "utf8") : "";
if (/%[A-Z_]+%/.test(html)) errors.push("Unreplaced template token in dist/index.html");
if ((html.match(/<h1/g) || []).length > 0) errors.push("Static HTML should not contain an <h1>; the app renders exactly one");

// Reference-site owner details must never leak into the build.
const bundle = html + (existsSync("dist/main.js") ? readFileSync("dist/main.js", "utf8") : "");
for (const needle of ["touquir", "xyz@gmail.com"]) {
  if (bundle.toLowerCase().includes(needle)) errors.push(`Build contains reference-site content: "${needle}"`);
}
if (/\[[A-Z][A-Z /&]+\]/.test(JSON.stringify({ site, projects, experience, education }))) {
  errors.push("Config still contains [SQUARE BRACKET] placeholders");
}

// Local assets referenced from content must exist in public/.
const localPaths = [
  site.identity.portrait,
  site.identity.resume,
  site.identity.favicon,
  ...site.portfolio.clientLogos.map((logo) => logo.src),
  ...projects.flatMap((p) => [p.coverImage, ...(p.gallery || [])]),
].filter((path) => path && path.startsWith("/"));
for (const path of localPaths) {
  if (!existsSync(`public${path}`)) errors.push(`Referenced asset not found: public${path}`);
}

// External links should be absolute https URLs.
const urls = [
  site.websiteUrl,
  ...["instagram", "youtube", "linkedin", "github", "behance", "dribbble"].map((key) => site.contact[key]),
  ...site.contact.otherLinks.map((link) => link.url),
  ...projects.flatMap((p) => [p.liveUrl, p.sourceUrl, p.videoUrl]),
].filter(Boolean);
for (const url of urls) {
  try {
    if (new URL(url).protocol !== "https:") warnings.push(`Not https: ${url}`);
  } catch {
    errors.push(`Invalid URL: ${url}`);
  }
}

const ids = projects.map((p) => p.id);
if (new Set(ids).size !== ids.length) errors.push("Duplicate project ids");
for (const id of site.portfolio.featuredProjectIds) {
  if (!ids.includes(id)) errors.push(`featuredProjectIds references unknown project "${id}"`);
}
if (site.contact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(site.contact.email)) errors.push("contact.email looks invalid");

// Missing content is allowed (sections hide) but worth reporting.
const missing = [];
if (!site.websiteUrl) missing.push("websiteUrl (canonical/OG URL)");
if (!site.identity.intro) missing.push("identity.intro");
if (!site.identity.about) missing.push("identity.about");
if (!site.contact.email) missing.push("contact.email (contact section hidden)");
if (projects.length < 3) missing.push(`projects (${projects.length} of 3+ recommended)`);
if (!experience.length) missing.push("experience (section hidden)");
if (!site.portfolio.skills.length) missing.push("portfolio.skills");

warnings.forEach((w) => console.warn(`warn  ${w}`));
if (missing.length) console.log(`info  Content still to add:\n      - ${missing.join("\n      - ")}`);
if (errors.length) {
  errors.forEach((e) => console.error(`error ${e}`));
  process.exit(1);
}
console.log("check passed");
