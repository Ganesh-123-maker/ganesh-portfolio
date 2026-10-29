"use client";

import { useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { portfolio } from "@/data/portfolio";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: "easeOut" },
} as const;

function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay }} className={className}>
      {children}
    </motion.div>
  );
}

// Journey entries fade/slide in with a blur-to-sharp effect, as in the reference.
function JourneyReveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal>
      <div className="text-center">
        <p className="font-mono text-sm font-semibold uppercase tracking-[0.25em] text-accent">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
        {subtitle ? <p className="mx-auto mt-4 max-w-2xl text-muted">{subtitle}</p> : null}
      </div>
    </Reveal>
  );
}

function isRealLink(v: string) {
  return v.startsWith("http://") || v.startsWith("https://") || v.startsWith("/");
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav className="mx-auto flex max-w-3xl items-center justify-between rounded-full border border-line bg-black/70 py-2 pl-3 pr-2 backdrop-blur">
        <a href="#home" aria-label="Home" className="flex h-9 w-9 items-center justify-center rounded-full bg-card2 text-white">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 10.5 12 3l9 7.5" />
            <path d="M5 9.5V21h14V9.5" />
          </svg>
        </a>
        <div className="hidden items-center gap-6 md:flex">
          {portfolio.nav.map((item) => (
            <a key={item.href} href={item.href} className="text-sm font-medium text-white/80 hover:text-white">
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a
            href={portfolio.links.resume}
            className="group relative overflow-hidden rounded-full border border-line bg-card px-4 py-2 text-sm font-semibold text-white"
          >
            <span className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-300 group-hover:translate-x-0" />
            <span className="relative">RESUME</span>
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="rounded-full border border-line bg-card px-3 py-2 text-sm font-semibold md:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>
      {open ? (
        <div className="mx-auto mt-2 max-w-3xl rounded-2xl border border-line bg-card p-4 md:hidden">
          {portfolio.nav.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="block py-2 text-base font-medium text-white">
              {item.label}
            </a>
          ))}
        </div>
      ) : null}
    </header>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  return (
    <section id="home" ref={ref} className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="starfield absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[120px]" aria-hidden="true" />
      <motion.div style={{ scale }} className="relative px-5 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="font-serif text-6xl font-black uppercase leading-none tracking-tight text-cream sm:text-8xl"
        >
          {portfolio.name}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-6 flex items-center justify-center gap-4"
        >
          <span className="h-px w-10 bg-accent" aria-hidden="true" />
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-white/80 sm:text-sm">
            {portfolio.roleLine}
          </p>
          <span className="h-px w-10 bg-accent" aria-hidden="true" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="mt-4 text-muted"
        >
          {portfolio.seeking}
        </motion.p>
        <a href="#about" className="mt-16 inline-flex flex-col items-center gap-3 text-sm text-muted hover:text-white">
          <span className="flex h-10 w-6 items-start justify-center rounded-full border border-white/40 p-1.5">
            <span className="h-2 w-1 rounded-full bg-white/80" />
          </span>
          Scroll down to explore
        </a>
      </motion.div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="scroll-mt-28 py-24 sm:py-32">
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <Reveal>
          <p className="text-center font-mono text-sm font-semibold uppercase tracking-[0.25em] text-accent">01. About Me</p>
        </Reveal>
        <div className="mt-12 grid items-center gap-10 md:grid-cols-12">
          <div className="space-y-5 text-lg font-light leading-relaxed text-white/80 md:col-span-7">
            {portfolio.about.map((p, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1} className="md:col-span-5">
            <Image
              src={portfolio.photo}
              alt={portfolio.photoAlt}
              width={600}
              height={800}
              className="mx-auto w-full max-w-[400px] rounded-[10px]"
              priority={false}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Journey() {
  return (
    <section id="journey" className="scroll-mt-28 py-24 sm:py-32">
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <SectionHeading eyebrow="02. Journey" title="Professional Path" subtitle="Education and experience so far, in order." />
        <div className="relative mt-16">
          <div className="absolute bottom-0 left-4 top-0 w-px bg-accent/70 md:left-1/2" aria-hidden="true" />
          <div className="space-y-14">
            <JourneyReveal>
              <div className="relative pl-12 md:w-1/2 md:pl-0 md:pr-14 md:text-right">
                <span className="absolute left-4 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-accent md:left-full" aria-hidden="true" />
                <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-accent">{portfolio.education.period}</p>
                <h3 className="mt-2 text-2xl font-bold">{portfolio.education.degree}</h3>
                <p className="mt-1 font-medium text-white/80">{portfolio.education.school}</p>
                <p className="mt-3 text-muted">{portfolio.education.detail}</p>
              </div>
            </JourneyReveal>
            {portfolio.experience.map((exp) => (
              <JourneyReveal key={exp.company}>
                <div className="relative pl-12 md:ml-auto md:w-1/2 md:pl-14">
                  <span className="absolute left-4 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-accent md:left-0" aria-hidden="true" />
                  <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-accent">Recent Experience</p>
                  <h3 className="mt-2 text-2xl font-bold">{exp.role}</h3>
                  <p className="mt-1 font-medium text-white/80">
                    {exp.company} · {exp.location} · {exp.period}
                  </p>
                  <p className="mt-3 text-muted">{exp.detail}</p>
                </div>
              </JourneyReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  let counter = 0;
  return (
    <section id="skills" className="scroll-mt-28 py-24 sm:py-32">
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <SectionHeading
          eyebrow="03. Tech Stack"
          title="Technical Expertise"
          subtitle="Technologies I use to build full-stack and AI-integrated applications."
        />
        <div className="mt-16 space-y-16">
          {portfolio.skillGroups.map((group) => (
            <div key={group.domain} className="relative overflow-hidden">
              <p className="outline-word pointer-events-none select-none whitespace-nowrap text-[72px] font-extrabold uppercase leading-none sm:text-[110px]" aria-hidden="true">
                {group.domain}
              </p>
              <div className="relative -mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.skills.map((skill) => {
                  counter += 1;
                  const n = counter < 10 ? String(counter).padStart(2, "0") : `0${counter}`;
                  return (
                    <motion.article
                      key={skill}
                      {...fadeUp}
                      className="relative rounded-xl border border-line bg-card p-5 shadow-sm transition-colors hover:border-accent"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-card2 text-sm font-bold text-accent">
                        {skill.slice(0, 2).toUpperCase()}
                      </div>
                      <h4 className="mt-4 text-lg font-bold">{skill}</h4>
                      <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted">Domain: {group.domain}</p>
                      <span className="absolute bottom-3 right-4 text-4xl font-bold text-white/10" aria-hidden="true">
                        {n}
                      </span>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-muted">
          Note: the reference skills section is a scroll-driven card deck. This version keeps the same dark cards, domain labels and numbering, in a grid, so all skills stay visible on desktop and mobile.
        </p>
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-28 py-24 sm:py-32">
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <SectionHeading eyebrow="04. Projects" title="Projects" subtitle="Selected full-stack and AI work." />
        <div className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
          {portfolio.projects.map((project, i) => (
            <Reveal key={project.title} delay={0.05 * i}>
              <article className="flex h-full flex-col overflow-hidden rounded-[20px] border border-line bg-card">
                <div className="flex h-40 items-center justify-center bg-gradient-to-br from-card2 to-black" aria-hidden="true">
                  <span className="font-mono text-2xl font-bold text-white/30">
                    {project.title.split(" ").map((w) => w[0]).join("").slice(0, 3)}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="text-[22px] font-bold leading-snug">{project.title}</h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{project.description}</p>
                  {project.stack.length > 0 ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.stack.map((tag) => (
                        <span key={tag} className="rounded-full bg-[#262626] px-3 py-1 text-xs font-medium text-[#d4d4d4]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <div className="mt-5 border-t border-line pt-4">
                    <div className="flex flex-wrap gap-4">
                      {isRealLink(project.live) ? (
                        <a href={project.live} target="_blank" rel="noreferrer" className="text-sm font-semibold text-linkblue hover:underline hover:underline-offset-4">
                          ↗ Live Demo
                        </a>
                      ) : null}
                      {isRealLink(project.github) ? (
                        <a href={project.github} target="_blank" rel="noreferrer" className="text-sm font-semibold text-linkblue hover:underline hover:underline-offset-4">
                          Source Code
                        </a>
                      ) : (
                        <p className="text-sm font-semibold text-muted">Source Code: {project.github}</p>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Certifications() {
  const [active, setActive] = useState(0);
  const current = portfolio.certifications[active];
  return (
    <section id="certifications" className="scroll-mt-28 py-24 sm:py-32">
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <SectionHeading
          eyebrow="05. Certifications"
          title="Certifications & Honors"
          subtitle="Placeholders only — add your real items in src/data/portfolio.ts."
        />
        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <div className="space-y-2">
            {portfolio.certifications.map((cert, i) => (
              <button
                key={cert.title + i}
                type="button"
                onClick={() => setActive(i)}
                className={`w-full border-l-4 py-4 pl-5 text-left text-lg font-semibold transition-colors ${
                  i === active ? "border-accent text-accent" : "border-transparent text-muted hover:text-white"
                }`}
              >
                {cert.title}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex min-h-[280px] flex-col items-center justify-center rounded-xl bg-white p-8 text-center text-black"
            >
              <p className="text-xl font-bold">{current.title}</p>
              <p className="mt-3 text-black/60">{current.detail}</p>
              <p className="mt-6 text-sm text-black/50">Preview placeholder — replace with your certificate in the data file.</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export function ContactFooter() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <section id="contact" className="scroll-mt-28 py-24 sm:py-32">
        <div className="mx-auto max-w-shell px-5 sm:px-8">
          <SectionHeading eyebrow="06. Contact" title="Get in Touch" subtitle="Open to SDE / AI Engineer internship opportunities." />
          <div className="mt-14 grid gap-12 lg:grid-cols-2">
            <Reveal>
              <div>
                <h3 className="text-4xl font-extrabold leading-tight sm:text-5xl">{portfolio.contact.heading}</h3>
                <p className="mt-5 max-w-xl text-muted">{portfolio.contact.text}</p>
                <div className="mt-8 space-y-2 text-base">
                  <p>
                    <a href={portfolio.links.github} target="_blank" rel="noreferrer" className="font-semibold text-white underline underline-offset-4 hover:text-accent">
                      GitHub
                    </a>
                  </p>
                  <p className="text-muted">LinkedIn: {portfolio.links.linkedin}</p>
                  <p className="text-muted">Email: {portfolio.links.email}</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <form
                className="rounded-[20px] border border-line bg-card p-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <label className="block">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Name</span>
                  <input required placeholder="Your name" className="mt-2 w-full rounded-lg border border-line bg-black px-4 py-3 text-white placeholder:text-muted" />
                </label>
                <label className="mt-5 block">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Email</span>
                  <input required type="email" placeholder="you@example.com" className="mt-2 w-full rounded-lg border border-line bg-black px-4 py-3 text-white placeholder:text-muted" />
                </label>
                <label className="mt-5 block">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Message</span>
                  <textarea required rows={4} placeholder="Your message" className="mt-2 w-full rounded-lg border border-line bg-black px-4 py-3 text-white placeholder:text-muted" />
                </label>
                <button type="submit" className="mt-6 w-full rounded-[10px] bg-white py-3 text-sm font-bold uppercase tracking-[0.2em] text-black hover:bg-accent hover:text-white">
                  Send Message
                </button>
                {sent ? (
                  <p className="mt-4 text-sm text-muted">Form handling is [ADD] — this demo does not send anything yet.</p>
                ) : null}
              </form>
            </Reveal>
          </div>
        </div>
      </section>
      <footer className="border-t border-line py-8">
        <div className="mx-auto flex max-w-shell flex-col items-center justify-between gap-3 px-5 text-sm text-muted sm:flex-row sm:px-8">
          <p>© 2026 Ganesh. All rights reserved.</p>
          <div className="flex gap-5">
            <span>LinkedIn: {portfolio.links.linkedin}</span>
            <a href={portfolio.links.github} target="_blank" rel="noreferrer" className="font-semibold text-white hover:text-accent">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
