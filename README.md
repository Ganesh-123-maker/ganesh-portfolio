# Ganesh — Portfolio

A portfolio built with Next.js + TypeScript + Tailwind CSS + Framer Motion.
Its design and section structure follow the reference portfolio's order,
with one section removed at the owner's request:
Hero → About (01) → Journey (02) → Skills (03) → Projects (04) →
Contact (05) → Footer.
There is no section for credentials here, and no nav link for one —
Projects is followed directly by Contact, with no gap left behind.
Design: black background throughout, burnt-orange accent, serif hero
name, floating pill navbar, central orange Journey timeline, dark
charcoal project cards, and a two-column contact section with a form card.
All personal content is Ganesh's only. No content from the reference site
remains in the title, meta tags, alt text, images, or footer.

Cinematic feeling: the page opens with a fade from black, the hero name
reveals with a slow blur-to-sharp title animation, the starfield
twinkles and the warm glow pulses slowly, the hero scales on scroll,
and every section reveals with a slow (0.9s) blur-to-sharp fade using a
cinematic ease. A faint film-grain overlay and a soft vignette run over
the whole page. These are generic cinematic techniques, not copied
assets or text.

Design notes and limits:
- The reference skills section is a scroll-driven 3D card deck. This
  version keeps the same dark cards, domain labels and numbering, in a
  grid, so all 22 skills stay visible on desktop and mobile.
- The browser tool used for the reference study could not resize to
  375px / 768px / 1024px, could not save screenshots, and could not
  read computed styles or dump the rendered DOM, so the 4-width
  screenshot comparison and the computed-style extraction in the brief
  could not be completed with the tools available. The build is based
  on the detailed desktop study of the reference, and mobile layout
  here is a responsive interpretation: stacked sections, a menu button
  in the pill navbar, and a left-aligned timeline on small screens.
- Colours and font families in the study were visual estimates, not
  sampled hex values, so treat the orange/black/serif combination as a
  close match, not a sampled-pixel match.
- The contact form validates and shows a notice, but does not send
  anything yet: no email or form endpoint has been supplied.

## Edit your content

Edit **only** `src/data/portfolio.ts`. That file holds:

- name, role line, about text, photo path and alt text
- links (GitHub is live; LinkedIn and email are marked `[ADD]`)
- education and experience
- skills, grouped by domain, numbered continuously in the UI
- projects, contact text, footer

Replace every `[ADD]` value with a real value before publishing.
AI Interview Coach already has a live demo link:
https://interview-coach-blue.vercel.app/

The resume link points to `public/resume.pdf`, which is the resume PDF
uploaded in the portfolio chat. Replace that file with a new resume
whenever you update it — the link does not change.

Photo: `public/photo.jpg` is the photo uploaded in the portfolio chat,
used in the About section only — the hero stays typographic, as in
the reference.

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
5. Later pushes to `main` redeploy automatically to the same production URL.

## Notes on what was not invented

- Skills are exactly the latest list supplied for this portfolio (22 skills).
- LinkedIn, email, the Mental Health project's GitHub link, and
  experience details are marked `[ADD]` where no value was supplied.
- Experience shows only role, company, location and dates from the
  uploaded resume. No metrics, jobs, or achievements have been invented.
