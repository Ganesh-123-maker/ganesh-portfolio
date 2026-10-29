# Ganesh — Portfolio

A personal portfolio for Ganesh, a B.Tech Computer Science student at IIIT Guwahati (2023–2027), focused on full-stack and AI-integrated applications and agentic AI, seeking SDE / AI Engineer internships.

## Live URL

https://ganesh-portfolio-indol.vercel.app/

## Screenshots

See the live site above for the current design: a dark, full-viewport hero with a large serif name, an About & Education section with a portrait and an education card, a Skills grid, a Projects grid, and a Contact section.

## Tech Stack

- Next.js 14 (App Router) with React 18 and TypeScript
- Tailwind CSS 3
- Framer Motion for scroll and reveal animations
- Playfair Display for the hero title, Inter for body copy, Syncopate for large display text, JetBrains Mono for indices, badges, and metadata
- Vercel for hosting and deployment

See `design-spec.md` for the full design system: typography, colours, layout, breakpoints, and animations.

## Features

- Floating pill navigation with a mobile menu and a resume download
- Hero with a large serif name, a tag line, and a scroll indicator
- About & Education, Skills, Projects, and Contact sections in a single scrolling page
- Project cards with stack tags, live demo links where available, and source code links where available
- Contact form with success and error states and honeypot spam protection, wired to Formspree when configured, with a fallback contact panel when it is not
- Responsive layout for mobile, tablet, and desktop
- SEO and Open Graph tags, favicon, and a downloadable resume PDF

## Local Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000.

To build for production:

```bash
npm run build
npm start
```

## Project Structure

```
app/
  layout.tsx      # Page metadata, fonts, and Open Graph tags
  page.tsx        # Page composition: Hero, About, Skills, Projects, Contact
  globals.css     # Base styles and design-system utilities
src/
  components/
    Sections.tsx  # Navbar, Hero, About, Skills, Projects, Contact
  data/
    portfolio.ts  # All personal content in one editable file
public/
  photo.jpg       # About portrait
  resume.pdf      # Downloadable resume
  favicon.svg     # "G" favicon
design-spec.md    # Design system: typography, colours, layout, animations
```

## How to Edit src/data/portfolio.ts

Edit only `src/data/portfolio.ts` to update personal content. It holds:

- Name, role line, tagline, and About text
- Photo path and alt text
- Links: GitHub, LinkedIn, email, and resume path
- Contact form endpoint (see below)
- Education and experience
- Skill groups, numbered continuously in the UI
- Projects: title, description, stack, GitHub link, live demo link, and badge
- Contact heading and text
- Footer text

Rules for that file:

- An empty string means "not supplied yet" and that button, icon, or line is hidden on the live site. Never put placeholder text there.
- A project with a `badge` of "Ongoing Research" shows that badge and no Source Code button.
- To enable the contact form, create a free form at Formspree, copy its endpoint (it looks like `https://formspree.io/f/xxxxxxxx`), and either set it as `formEndpoint` in `src/data/portfolio.ts` or set it as the `NEXT_PUBLIC_FORMSPREE_ENDPOINT` environment variable in Vercel, then redeploy. Until an endpoint is set, the site shows a fallback contact panel instead of a form.
- After editing, run `npm run build`, commit, and push to `main` — Vercel redeploys automatically to the live URL.
