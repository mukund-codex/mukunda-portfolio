# Portfolio

Static React 19 + Framer Motion site, bundled with esbuild. Design follows
`universal_portfolio_prompt.md` (reference: touquirakhtar.com, used for inspiration only).

## Commands

```bash
npm install
npm run dev      # watch + serve at http://localhost:5173
npm run build    # production build into dist/
npm run check    # build, then content/link/asset checks
npm run preview  # build once and serve dist/
```

## Where to edit your details

- `src/config/site.js` — name, profession, intro, about, contact, socials, skills, tools,
  metrics, colors, fonts, section toggles, and all UI labels (for translation).
- `src/data/projects.js` — projects (a copy-paste template is in the file header).
- `src/data/experience.js` — work history and education.
- `public/assets/` — portrait, project images (`public/assets/projects/`), CV, logos.
  Reference them as `/assets/...`.

Anything left empty is hidden: no contact email hides the contact section, no experience
hides the timeline, and so on. `npm run check` lists what is still missing.

## Deploy

Upload the `dist/` folder to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages).
Set `websiteUrl` in `site.js` first so the canonical and Open Graph tags are correct.

The contact form opens the visitor's email app (`mailto:`); nothing is sent from the site.
