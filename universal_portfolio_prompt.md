# UNIVERSAL PREMIUM PORTFOLIO WEBSITE BUILDER

## Default reference: [https\://touquirakhtar.com/](https://touquirakhtar.com/)

> **Purpose:** Paste this master prompt into an AI coding assistant (Claude Code, Cursor, Codex, Lovable, Bolt, etc.) to create a polished, personal portfolio. The default reference is [**https\://touquirakhtar.com/**](https://touquirakhtar.com/), but the prompt works for any person, profession, or brand by editing the configuration block below. This is a reusable *specification*, not a request to copy the reference site's private source code.

&nbsp;

**For Build Animation you can use this opensource tool :&nbsp;**

To add this animation, share this repository with your AI and use this prompt: *'Add this Swarm effect to my website as a standalone feature. Include a "Motion" button at the top that triggers the animation when clicked.'*&nbsp;

https\://github.com/imperfec-t/swarm-Antigravity

https\://chromewebstore.google.com/detail/swarm-rebuild/diaeaocnhdhbknkbfbnkjikfcgokainm?pli=1

---

## 0\. START HERE — USER CONFIGURATION (EDIT THIS FIRST)

Replace anything in `[SQUARE BRACKETS]` with your own information. The `referenceWebsite` is for visual/UX inspiration and analysis; `websiteUrl` is the site the finished portfolio belongs to.

```yaml
referenceWebsite: "https://touquirakhtar.com/"
websiteUrl: "https://touquirakhtar.com/"

identity:
  fullName: "[YOUR FULL NAME]"
  displayName: "[SHORT DISPLAY NAME OR BRAND]"
  profession: "App & Web Developer / Designer" # default; change for other professions
  roleLine2: "[SECONDARY SPECIALTY OR TAGLINE]"
  location: "[CITY, COUNTRY]"
  availability: "[AVAILABLE FOR WORK / OPEN TO COLLABORATIONS / HIDE]"
  headline: "[SHORT, MEMORABLE HERO HEADLINE]"
  intro: "[2 SENTENCES ABOUT WHO YOU ARE AND THE VALUE YOU PROVIDE]"
  about: "[TRUE BIOGRAPHY, APPROACH, AND EXPERIENCE]"
  portrait: "[PATH TO YOUR OWN PORTRAIT OR LEAVE BLANK]"
  resume: "[PATH OR LINK TO YOUR OWN CV OR LEAVE BLANK]"
  favicon: "[PATH TO YOUR LOGO/FAVICON OR GENERATE A SIMPLE INITIALS ICON]"

contact:
  email: "[YOUR PUBLIC BUSINESS EMAIL]"
  phone: ""              # optional; keep empty to hide
  whatsapp: ""           # optional, international digits; empty = hide
  instagram: ""          # optional URL
  youtube: ""            # optional URL
  linkedin: ""           # optional URL
  github: ""             # optional URL
  behance: ""            # optional URL
  dribbble: ""           # optional URL
  otherLinks: []

portfolio:
  projects: []             # add REAL projects; see project schema below
  featuredProjectIds: []
  categories: []           # auto-derive from projects if empty
  clientLogos: []          # display only authorized/real clients
  processSteps: []         # optional; customize to your work
  skills: []               # real skills only
  tools: []                # software/tools you genuinely use
  experience: []           # jobs/contracts; real dates and descriptions
  education: []            # optional; real institutions and qualifications
  awards: []               # optional; real achievements only
  testimonials: []         # optional; verifiable, permissioned quotes only
  metrics: []              # optional; verified stats only

appearance:
  style: "cinematic minimal, premium, editorial, refined typography"
  theme: "dark"
  background: "#090909"
  text: "#f2efeb"
  accent: "#e32b3c"       # replace if preferred
  muted: "#a09c9a"
  displayFont: "Anton"    # alternative: a well-matched licensed display font
  bodyFont: "Manrope"
  accentFont: "Caveat"
  animationIntensity: "balanced" # subtle | balanced | expressive
  language: "English"     # change to Hindi, Indonesian, etc.

preferences:
  showAwards: false         # true only when actual awards are provided
  showEducation: true
  showExperience: true
  showBeforeAfter: false    # true only when real before/after assets exist
  showClientLogos: false   # true only for actual clients
  showTestimonials: false # true only for actual testimonials
  showContactForm: true
  showDownloadResume: false # true only when CV is provided
  showProjectArchive: true
```

&nbsp;

**Default-site note:** Public page metadata identifies the reference as **“TOUQUIR \| App & Web Developer / Designer.”** Do **not** assume additional biography, employment history, client identities, phone numbers, awards, or work samples from that title. Inspect the reference site and/or supplied files to substantiate any content you use. The email displayed in the public JavaScript-disabled page is `xyz@gmail.com`; use it only if this is the intended public contact and the site owner approves. Otherwise use the email supplied in `contact.email`.

### Minimum input for a good result

A display name, profession, 2–3 lines of introduction, a portrait (optional), 3 or more authentic projects with images, and one valid contact method. If a value is missing, build a graceful design that omits the unverified section; don't create imaginary personal facts.

---

## 1\. YOUR ROLE AND MAIN TASK

You are a senior creative developer, UI/UX designer, front-end architect, and accessibility specialist. **Build a fully functioning, production-quality, static portfolio website** tailored to the configuration above. Use `https://touquirakhtar.com/` as the **default visual reference**, not as a source of personal content to plagiarize. Preserve the high-level ambition of the original example: striking typography, carefully layered imagery, responsive composition, excellent visual polish, sophisticated but controlled motion, and rich portfolio browsing.

**Reference analysis, before coding:**

1. Open `referenceWebsite`, if browsing is available. Inspect desktop and mobile layouts, navigational structure, typography, spacing, colors, hero composition, portfolio cards, transitions, interactions, accessibility, and section rhythm.  
2. Distinguish **observed** features from **proposed improvements**. If the site requires JavaScript and you cannot inspect it fully, say so; do not claim pixel-perfect reproduction based only on metadata.  
3. Adapt its design language to the new identity and profession. Produce an original implementation rather than copying proprietary code, project media, logos, or claims.  
4. If browsing is unavailable, follow the complete design specification below and clearly label it as an interpretation, not a verified clone.

**Success condition:** The final site feels distinctly premium while showing only the portfolio owner's authentic details and assets. The layout should be adaptable to a developer, designer, marketer, editor, photographer, filmmaker, student, consultant, or creative agency.

---

## 2\. TECHNOLOGY AND PROJECT STRUCTURE

Preferred stack:

- React 19, JavaScript/JSX, and Framer Motion 12 for user-facing interactions.  
- Vanilla CSS and CSS custom properties for responsive design; no heavy UI component library.  
- Lucide icons and web-safe/licensed Google Fonts.  
- esbuild (or Vite if the execution environment requires it). Deliver static deployable assets.  
- All content in a central configuration file and data modules. **Do not hard-code an owner's name/contact inside UI components.**

Suggested structure:

```
portfolio/
├── index.html
├── package.json
├── scripts/
│   └── build.mjs
├── src/
│   ├── main.jsx
│   ├── styles.css
│   ├── config/
│   │   └── site.js
│   ├── data/
│   │   ├── projects.js
│   │   └── experience.js
│   └── components/
│       ├── Header.jsx
│       ├── Hero.jsx
│       ├── ProjectGrid.jsx
│       ├── ProjectDialog.jsx
│       ├── About.jsx
│       ├── Experience.jsx
│       ├── Contact.jsx
│       └── Footer.jsx
└── public/
    └── assets/
        ├── portrait.webp
        ├── projects/
        ├── logos/
        └── resume.pdf
```

For a plain esbuild setup, make sure JSX, CSS output, asset paths, and index.html correctly resolve. The exact structure may be adjusted to the user's platform as long as the project runs and remains easy to edit.

Required commands: `npm install`, `npm run dev`, `npm run build`, and preferably `npm run check`. Do not claim tests passed unless you ran them.

---

## 3\. CREATIVE DIRECTION

### Overall appearance

- Use a near-black backdrop (`#090909`), warm off-white text (`#f2efeb`), and the configured accent (`#e32b3c` by default).  
- Large bold condensed headline type, generous negative space, clear hierarchy, thin separators, carefully composed editorial grids, subtle texture, and elevated hover states.  
- Accent used selectively on headlines, navigation indicators, CTA details, and interactive elements.  
- Portrait cut-out may overlap oversized hero typography **only when a real portrait is provided**. Without a portrait, build an equally strong typographic hero or an abstract, non-identifying graphic.  
- Natural visual treatment: avoid excessive glow, noisy gradients, heavy blur, plastic-looking skin, and intrusive parallax.  
- Treat `appearance` settings as user-controlled design tokens throughout the application.

### Responsiveness

- Design across 320–1920+ px, with representative breakpoints near 1100, 800, 600, and 370 px.  
- No horizontal scrolling at any phone width.  
- Hero copy, image, cards, navigation, search, overlays, and forms must remain readable and usable at 390 px.  
- Minimum 44 px tap targets. No hover-only access to essential functionality.

### Typography

- Default display: Anton; body: Manrope; optional handwritten accent: Caveat.  
- Load fonts efficiently, with sensible fallbacks and `font-display: swap`.  
- Fit long first/last names using `clamp()`, wrapping rules, and responsive line breaks rather than clipping.  
- Respect requested language, including translated navigation and CTA labels.

---

## 4\. PAGE STRUCTURE AND FEATURES

### A. Navigation

Sticky, subtle header with an identity wordmark and anchor navigation to existing sections. Include active-section indication, accessible mobile menu, contact CTA, and a usable Motion on/off button. Hide links for omitted sections. Support Escape to close mobile navigation.

### B. Hero

Premium full-height or near-full-height opening section with:

- profession and availability line;  
- large display-name/portfolio headline, brand accent, and optional real cut-out portrait;  
- short personal introduction, skill/specialty highlights, and clear **View Work** \+ **Contact** CTAs;  
- verified metrics only (never arbitrary counts);  
- location and resume only when supplied;  
- optional hero parallax and entrance reveals, limited by reduced-motion preferences.

The hero must not presume the owner is a VFX artist or filmmaker. Adapt the exact labels to `identity.profession`.

### C. Selected Work / Projects

- Feature 2–4 strongest actual projects first. Show responsive thumbnails, concise titles, category tags, year (when known), brief context, and a prominent action.  
- Add accessible category filtering, text search, and Load More for larger collections.  
- Open a project detail dialog with a full description, responsibilities, tech stack, outcomes, images, video, or live link based on available assets.  
- Display a meaningful empty state when the project list is empty. Optionally provide a clearly labelled owner-editable placeholder template **inside the code**, not fabricated achievements on the live public page.  
- Show client logos only if supplied and authorized.

Suggested project record:

```json
{
  "id": "example-project-01",
  "title": "[REAL PROJECT NAME]",
  "category": "[WEB APP / BRANDING / VIDEO / PHOTOGRAPHY / ETC]",
  "year": "[YYYY OR EMPTY]",
  "summary": "[ONE-SENTENCE DESCRIPTION]",
  "description": "[WHAT YOU ACTUALLY CREATED AND WHY]",
  "role": "[YOUR ROLE]",
  "tools": ["[ACTUAL TOOLS USED]"],
  "coverImage": "/assets/projects/example-cover.webp",
  "gallery": [],
  "videoUrl": "",
  "liveUrl": "",
  "sourceUrl": "",
  "featured": true
}
```

Support YouTube embeds where applicable, with privacy-aware loading and graceful fallbacks. Do not borrow another creator's YouTube/Drive/Cloudinary IDs.

### D. Skills, Tools, and About

Provide concise, meaningful biography, actual education/experience (if available), verified skills, tools, workflow/process, and a clear personal positioning statement. Replace filmmaker-specific terms with profession-appropriate copy. Keep content scannable.

### E. Work Experience / Timeline

Accessible expandable timeline using supplied positions, dates, organization names, and descriptions. If the user has no formal experience, offer sections for independent work, meaningful projects, or learning milestones **without inventing companies or job titles**.

### F. Recognition, Testimonials, and Before/After

Each is **conditional**:

- Awards only with real names/dates/proof.  
- Testimonials only with permission and real quotes.  
- Client logo strip only with actual relationships.  
- Before/after interactive comparison only if two appropriately paired user-owned images exist. Do not display fake accolades or filler logos just to fill a layout.

### G. Contact

Prominent CTA, verified email, and supplied social links. Optional form with validation. If WhatsApp is configured, create a draft message using `https://wa.me/<verified international digits>?text=<encoded message>` and open only when the user explicitly activates the control. If no WhatsApp number is supplied, do not render WhatsApp buttons. Never claim a form message was delivered unless a real backend confirms it. For a static site, prefer a `mailto:` form or a clearly identified third-party integration.

### H. Footer

Owner's display name/wordmark, current year, working social links, top-of-page navigation, and relevant legal links if provided. Never include an unrelated personal or agency name.

---

## 5\. INTERACTION AND MOTION SYSTEM

Use Framer Motion for tasteful enhancements, not critical content rendering.

- Shared ease: `[0.22, 1, 0.36, 1]`.  
- Typical reveal: `opacity: 0 → 1`, `y: 32 → 0`, around 0.6–0.8s.  
- Scroll-linked progress indicator and restrained hero parallax.  
- Magnetic CTA or cursor-following effect only for fine-pointer devices, never required to interact.  
- Animated filter underline and gentle card entrance.  
- Dialog entrance/exit and focus management; close via Escape/backdrop/close button; restore focus to the initiating control.  
- `prefers-reduced-motion` must disable non-essential motion; header toggle must work and persist under a site-specific storage key derived from the brand.  
- Do not scroll hijack; do not autoplay sound; do not obstruct keyboard navigation.  
- Never inject third-party visual-effects scripts from unrelated domains or allow a reference site's demo code to execute without a separate security review.

---

## 6\. CONTENT, ASSETS, AND PERSONALIZATION RULES

1. Every name, title, location, biography, statistic, date, employer, educational record, award, testimonial, credential, social profile, logo, résumé, portfolio video, and link **must come from the user's configuration, own files, or a verified authorized source**.  
2. **Do not import or retain any previous creator's portrait, branded images, personal contact details, projects, certificates, CV, employer history, or client logos.** Build neutral structure instead.  
3. `https://touquirakhtar.com/` is the default **design reference** and default `websiteUrl`; it is not a universal contact destination. For users other than that site owner, change `websiteUrl`, identity, and contacts.  
4. If the user owns the reference site and explicitly wants to use its published content, extract only details you can actually verify, and ask for unavailable assets rather than inventing replacements.  
5. Only create an image or AI portrait when specifically requested. Never label a synthetic portrait as a photograph of the real owner without confirmation.  
6. Use optimized WebP/AVIF when available; supply width/height, descriptive alt text, lazy loading below the fold, and high-priority loading only for crucial hero imagery.  
7. Store personal data in one central `site.js` (or equivalent config) for global updates: header, hero, metadata, OG tags, contact, footer, and download links.  
8. Replace favicon, metadata, canonical URL, title, Open Graph text, social handles, filenames, local storage keys, accessibility labels, file paths, and any hidden text carrying the previous owner name.  
9. Omit unverified content cleanly. Missing data should not create broken blank cards, empty carousels, dummy statistics, or dead buttons.  
10. External links use safe targets and `rel="noopener noreferrer"` where appropriate. Do not depend on private assets or external scripts from the original template.

---

## 7\. SEO, ACCESSIBILITY, AND PERFORMANCE

- Semantic HTML5 landmarks; one H1; meaningful page title and description using config values.  
- Canonical tag based on `websiteUrl`; correct Open Graph/Twitter tags and optional JSON-LD `Person`/`Organization` only from provided verified information.  
- Keyboard-friendly menus, dialogs, forms and carousels; visible focus outlines; alt text; properly labelled controls.  
- Sufficient color contrast and readable type on mobile.  
- Responsive images; defer noncritical media; avoid excessive layout shift and unnecessary JS.  
- No hydration/build errors or console warnings. Ensure all in-page anchors work.  
- Respect privacy; avoid leaking telephone numbers or personal information that is not meant to be public.

---

## 8\. BUILD ORDER AND QUALITY CHECKS

**Build in this order:**

1. Parse the user configuration, inspect the provided reference if available, and identify missing content.  
2. Build design tokens, typography, global layout and responsive header.  
3. Implement hero, portfolio grid/details, about, timeline, contact, and footer.  
4. Wire project data and optional sections so they gracefully disappear without real content.  
5. Add motion and accessibility only after the page is fully usable without animation.  
6. Build, test, and visually inspect at desktop (1440 px), tablet (768 px), and mobile (390 and 320 px).  
7. Verify filters/search/dialog, Escape and keyboard focus, Motion toggle, links, projects, forms, responsive images and SEO.  
8. Deliver complete source files and concise setup/deployment instructions; report what was implemented and anything unverified.

**Definition of done:** The site builds successfully, uses the configured person's own content, does not retain any other owner's details, is responsive, has no broken assets/links in supplied content, and remains useful with reduced motion.

---

## 9\. HOW TO USE THIS MASTER PROMPT

**Step 1 — Choose the site identity.** In section 0, set `identity.fullName`, `displayName`, profession, headline, about text, desired language, and `websiteUrl`. For the default example, retain `https://touquirakhtar.com/` as both reference and website only if building that owner's site. For someone else, keep it as `referenceWebsite` and change `websiteUrl`.

**Step 2 — Add personal assets.** Upload your own portrait, project screenshots/videos, logos, and optional résumé. Reference their real local paths. For best results, provide a tall high-quality portrait with a clean background and landscape project covers.

**Step 3 — Fill the work data.** Add actual project entries according to the project schema, with descriptions, relevant URLs, roles, and images. Mark the strongest ones `featured: true`. No work to showcase yet? Ask the AI to make a clean, honest starter portfolio without fake work.

**Step 4 — Customize the style.** Change theme colors, fonts, animation intensity, preferred sections, and language. If you want the closest look to the reference, leave default style tokens and ask the assistant to report what was actually observed versus inferred.

**Step 5 — Paste the entire file into your AI coding tool.** Attach the images/project files in the same conversation. Tell it: **“Use the configuration in section 0\. Create the complete runnable project. Do not use previous owners' names, media, awards, or contact details. Show me the finished build and any missing assets.”**

**Step 6 — Review before publishing.** Inspect every name, link, image, CTA, résumé, social URL, and section; test mobile layout and contact actions; replace any placeholders. Deploy to your own domain only after the content is correct.

### Quick change checklist for other people

| Change this | Example / why it matters |
| :---- | :---- |
| `referenceWebsite` | Design inspiration (can remain `https://touquirakhtar.com/`) |
| `websiteUrl` | **Your** finished domain; needed for canonical/SEO |
| Name \+ wordmark | Header, hero, footer, title, OG tags, accessible labels |
| Profession \+ headline | Adapt sections to your field |
| Bio, location, skills | Only truthful personal details |
| Portrait \+ logo | Replace with your own, or omit |
| Project cards \+ links | Own portfolio assets and verified URLs |
| Experience \+ awards | Remove if not applicable |
| Contact \+ social links | Your own intended public methods |
| Accent \+ fonts \+ language | Personal visual identity |
| Toggles for sections | Hide unavailable information instead of faking it |

### Example one-line requests you can append

- **Developer:** “I'm a full-stack developer. Highlight live demos, GitHub repos, frameworks, and case studies instead of film reels.”  
- **Video editor:** “I'm a video editor. Feature showreels, before/after edits, editing tools, and project video previews.”  
- **Designer:** “I'm a UI/UX designer. Focus on Figma case studies, prototypes, design systems, and measurable outcomes.”  
- **Marketer:** “I'm a digital marketer. Show campaign case studies, services, transparent verified results, and lead-generation contact.”  
- **Student:** “I'm a student. Showcase coursework, internships, learning projects, and links to code or demos; don't invent experience.”

---

## 10\. FINAL INSTRUCTION TO THE BUILD ASSISTANT

**Proceed with implementation using the configuration supplied.** Do not ask unnecessary questions about missing optional fields. Produce a strong, honest site with optional sections omitted when relevant data is absent. Use `https://touquirakhtar.com/` as the default design reference, while making the final site clearly belong to the configured owner. Show the complete runnable result, state where to edit personal details, and report which features were tested and which could not be verified.