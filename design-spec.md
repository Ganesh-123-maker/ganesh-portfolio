# Design Specification — Ganesh Portfolio

Original design system for Ganesh's portfolio. All content is Ganesh's
own. No external site's code, text, images, or branding is used.

## 1. Typography & Color Tokens

### Fonts

- Headings and section numbers: Space Grotesk, weights 500, 600, 700.
- Body copy: Inter, weights 400, 500, 600.
- Section indices (`01`–`05`), tech badges, and metadata tags:
  JetBrains Mono, weights 400, 500.
- Fonts are loaded with `next/font/google` in `app/layout.tsx`
  (`--font-display`, `--font-sans`, `--font-mono`).

### Color Palette (Dark Theme)

- Primary Background: `#0a0a0f`
- Elevated Surface / Card Background: `rgba(255, 255, 255, 0.03)`,
  hover state `rgba(255, 255, 255, 0.06)`
- Glass Navbar & Panels: `background: rgba(10, 10, 15, 0.75)`,
  `backdrop-filter: blur(16px)`
- Card & Section Borders: `1px solid rgba(255, 255, 255, 0.08)`,
  hover: `rgba(139, 92, 246, 0.4)`
- Primary Text: `#f8fafc`
- Secondary / Muted Text: `#94a3b8`
- Accent Gradient:
  `linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)`
- Subtle Background Glows: radial ambient blurs
  (`filter: blur(120px)`) positioned behind Hero and Projects using
  `rgba(139, 92, 246, 0.15)` and `rgba(6, 182, 212, 0.12)`.

These values live in `tailwind.config.ts` (`page`, `ink`, `muted`,
`accent`, `accent2`, `surface`, `surfaceHover`, `line`, `lineHover`,
`glass`) and in `app/globals.css` (`.section-heading`,
`.section-divider`, `.accent-gradient`, `.accent-gradient-text`,
`.glass`).

## 2. Layout, Spacing & Responsive Breakpoints

### Container

- Max-width `1200px` (`max-w-shell`, defined as `75rem` in
  `tailwind.config.ts`; Tailwind's built-in `max-w-7xl` is 1280px, so
  the 1200px value is used explicitly to match this specification),
  centered, horizontal padding:
  - `1.5rem` (`px-6`) at `375px`
  - `2.5rem` (`px-10`) at `768px`
  - `4rem` (`px-16`) at `1024px` and `1440px`
- Implemented as `px-6 md:px-10 lg:px-16` (Tailwind `md` = 768px,
  `lg` = 1024px).

### Section Spacing

- Vertical padding `5rem 0` (`py-20`) on mobile (`375px`–`768px`)
  and `7rem 0` (`py-28`) on desktop (`1024px`–`1440px`).
- Implemented as `py-20 lg:py-28`.

### Section Headers

- Indexed format with a monospace number (`01.`, `02.`, etc.) in
  accent color `#8b5cf6`, followed by a heading
  (`clamp(1.875rem, 3.5vw, 2.75rem)`, `font-weight: 700`,
  `letter-spacing: -0.02em`) and a subtle horizontal divider line
  (`height: 1px`,
  `background: linear-gradient(90deg, rgba(255,255,255,0.15), transparent)`).
- Implemented in `SectionHeading` in `src/components/Sections.tsx`
  and `.section-heading` / `.section-divider` in `app/globals.css`.

### Sections (01–05)

1. Hero / Intro — asymmetric split, gradient name, highlights card
2. About & Education — bio plus IIIT Guwahati education and
   experience card
3. Technical Skills — 22 skills, grouped by domain
4. Projects — 4 featured projects, including LuxeStay with its real
   repo link and Agentic AI on Mental Health, labelled
   "Ongoing Research" with no Source Code button
5. Contact — contact panel and Formspree form (or fallback panel
   when unconfigured)

Sections are 01–05 only, as listed above.

### Responsive Grid Behavior

- `375px` (Mobile): single-column layout (`grid-cols-1`) for Hero,
  About, Skills categories, Projects (`gap-6`), and Contact.
  Collapsible mobile navigation menu.
- `768px` (Tablet): 2-column grid (`grid-cols-2`, `gap-6`) for
  Projects and Skill groups; horizontal desktop nav bar visible.
- `1024px` & `1440px` (Desktop): 12-column asymmetric split for
  Hero and About/Education (`7 cols` bio / `5 cols` education &
  highlights card); 2-column Bento-style grid (`gap-8`) for the 4
  featured projects with `border-radius: 16px` (`rounded-2xl`),
  `padding: 2rem` (`p-8`), and smooth hover lift
  (`transform: translateY(-4px)`,
  `transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1)`).

## 3. Animations

- Clean CSS / Framer Motion entrance transitions
  (`opacity: 0 -> 1`, `translateY(20px -> 0)`, duration `0.5s`,
  easing `cubic-bezier(0.22, 1, 0.36, 1)`) with `0.08s` stagger on
  skill cards and project cards.
- Implemented as `fadeUp` in `src/components/Sections.tsx` and
  `Reveal` delays (`0.08 * index`).

## 4. Content Rules

- All personal content lives in `src/data/portfolio.ts`.
- An empty string means "not supplied yet" and that button, icon,
  or line is hidden on the live site. No placeholder text is
  rendered.
- LinkedIn and email are hidden until real values are supplied.
- The contact form posts to a Formspree endpoint when configured
  (`NEXT_PUBLIC_FORMSPREE_ENDPOINT` in Vercel, or `formEndpoint`
  in `src/data/portfolio.ts`), with a honeypot field and success /
  error states. When unconfigured, a fallback contact panel is
  shown instead of a form.
- `public/resume.pdf` is Ganesh's real resume and is not edited by
  design changes.
