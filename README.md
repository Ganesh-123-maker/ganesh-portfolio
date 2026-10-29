# Ganesh — Portfolio

A portfolio built with Next.js + TypeScript + Tailwind CSS + Framer Motion.
Its design and section structure follow the reference portfolio's order:
Hero → About (01) → Journey (02) → Skills (03) → Projects (04) →
Certifications & Achievements (05) → Contact (06) → Footer.
Design (v2, after the detailed live study): black background throughout,
burnt-orange accent, serif hero name, floating pill navbar, central
orange Journey timeline, dark charcoal project cards, list + preview
certifications, and a two-column contact section with a form card.
All personal content is Ganesh's only. No content from the reference site
remains in the title, meta tags, alt text, images, or footer.

Design notes and limits:
- The reference skills section is a scroll-driven 3D card deck. This
  version keeps the same dark cards, domain labels and numbering, in a
  grid, so all skills stay visible on desktop and mobile.
- Mobile behaviour of the reference could not be verified in the live
  study (no mobile viewport was available there), so mobile layout here
  is a responsive interpretation: stacked sections, a menu button in
  the pill navbar, and a left-aligned timeline on small screens.
- Colours and font families in the study were visual estimates, not
  sampled hex values, so treat the orange/black/serif combination as a
  close match, not a sampled-pixel match.

## Edit your content

Edit **only** `src/data/portfolio.ts`. That file holds:

- name, role line, about text, photo path and alt text
- links (GitHub is live; LinkedIn and email are marked `[ADD]`)
- education and experience
- skills, grouped by domain, numbered continuously in the UI
- projects, certifications placeholders, contact text, footer

Replace every `[ADD]` value with a real value before publishing.
For LuxeStay, replace `[ADD stack + repo]` with its real stack and repo link.
AI Interview Coach already has a live demo link:
https://interview-coach-blue.vercel.app/

The resume link points to `public/resume.pdf`, which is the resume PDF
uploaded in the portfolio chat. Replace that file with a new resume
whenever you update it — the link does not change.

Photo: `public/placeholder-portrait.svg` is a placeholder. Add your photo
to `public/` (for example `photo.jpg`) and update `photo` in the data file.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build

```bash
npm run build
npm start
```

## Deploy on Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import that repository.
3. Leave the framework preset as **Next.js** and the defaults as they are.
4. Click **Deploy**. No environment variables are required.

## Notes on what was not invented

- Skills are exactly the list supplied for this portfolio. Skills that
  appeared only on the reference site are not included.
- Certifications, achievements, LuxeStay stack/repo, LinkedIn and email
  are placeholders marked `[ADD]` where no value was supplied.
- Experience details are left as `[ADD]`; only role, company, location
  and dates from the uploaded resume are shown.
