// Builds the static site into dist/. Flags: --dev (watch + serve), --serve (build once + serve).
import * as esbuild from "esbuild";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { site } from "../src/config/site.js";

const dev = process.argv.includes("--dev");
const serve = dev || process.argv.includes("--serve");
const outdir = "dist";

const LANG_CODES = { english: "en", hindi: "hi", indonesian: "id", spanish: "es", french: "fr", german: "de" };

const escape = (value = "") =>
  String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function headData() {
  const { identity, contact, appearance, websiteUrl } = site;
  const name = identity.fullName || identity.displayName || "Portfolio";
  const title = [identity.displayName || name, identity.profession].filter(Boolean).join(" | ");
  const description = identity.intro || `${name} — ${identity.profession}. Portfolio and selected work.`;
  const initials =
    name.split(/\s+/).filter(Boolean).filter((part, i, parts) => i === 0 || i === parts.length - 1).map((part) => part[0].toUpperCase()).join("") || "P";

  const favicon =
    identity.favicon ||
    "data:image/svg+xml," +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="${appearance.background}"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="Impact,Arial Narrow,sans-serif" font-size="30" fill="${appearance.text}">${initials}</text><circle cx="50" cy="48" r="4" fill="${appearance.accent}"/></svg>`,
      );

  // Canonical, OG URL and JSON-LD only use values the owner actually supplied.
  const tags = [
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${escape(title)}" />`,
    `<meta property="og:description" content="${escape(description)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escape(title)}" />`,
    `<meta name="twitter:description" content="${escape(description)}" />`,
  ];
  if (websiteUrl) {
    tags.push(`<link rel="canonical" href="${escape(websiteUrl)}" />`, `<meta property="og:url" content="${escape(websiteUrl)}" />`);
  }
  if (identity.portrait && websiteUrl) {
    const image = new URL(identity.portrait, websiteUrl).href;
    tags.push(`<meta property="og:image" content="${escape(image)}" />`);
  }
  if (identity.fullName) {
    const sameAs = ["linkedin", "github", "behance", "dribbble", "instagram", "youtube"]
      .map((key) => contact[key])
      .filter(Boolean);
    const person = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: identity.fullName,
      jobTitle: identity.profession || undefined,
      url: websiteUrl || undefined,
      email: contact.email ? `mailto:${contact.email}` : undefined,
      sameAs: sameAs.length ? sameAs : undefined,
    };
    tags.push(`<script type="application/ld+json">${JSON.stringify(person).replace(/</g, "\\u003c")}</script>`);
  }

  const families = [
    [appearance.displayFont, ""],
    [appearance.bodyFont, ":wght@400;500;600;700"],
    [appearance.accentFont, ":wght@500;700"],
  ]
    .filter(([family]) => family)
    .map(([family, axis]) => `family=${family.replace(/ /g, "+")}${axis}`)
    .join("&");

  return {
    LANG: LANG_CODES[appearance.language.toLowerCase()] || "en",
    TITLE: escape(title),
    DESCRIPTION: escape(description),
    BG: appearance.background,
    TEXT: appearance.text,
    HEAD_TAGS: tags.join("\n    "),
    FAVICON: escape(favicon),
    FONTS_URL: `https://fonts.googleapis.com/css2?${families}&display=swap`,
  };
}

async function writeHtml() {
  const template = await readFile("index.html", "utf8");
  const data = headData();
  const html = template.replace(/%([A-Z_]+)%/g, (match, key) => (key in data ? data[key] : match));
  await writeFile(`${outdir}/index.html`, html);
}

await rm(outdir, { recursive: true, force: true });
await mkdir(outdir, { recursive: true });
if (existsSync("public")) await cp("public", outdir, { recursive: true });
await writeHtml();

const options = {
  entryPoints: { main: "src/main.jsx" },
  bundle: true,
  outdir,
  format: "esm",
  jsx: "automatic",
  loader: { ".js": "jsx", ".png": "file", ".jpg": "file", ".webp": "file", ".avif": "file", ".svg": "file" },
  minify: !dev,
  sourcemap: dev,
  target: ["es2020"],
  define: { "process.env.NODE_ENV": JSON.stringify(dev ? "development" : "production") },
  logLevel: "info",
};

if (serve) {
  const ctx = await esbuild.context(options);
  if (dev) await ctx.watch();
  else await ctx.rebuild();
  const { port } = await ctx.serve({ servedir: outdir, port: Number(process.env.PORT) || 5173 });
  console.log(`\n  Portfolio running at http://localhost:${port}\n`);
} else {
  await esbuild.build(options);
  console.log(`Built to ${outdir}/`);
}
