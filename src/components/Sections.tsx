"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { portfolio } from "@/data/portfolio";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
} as const;

function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay }} className={className}>
      {children}
    </motion.div>
  );
}


function SectionHeading({
  index,
  title,
  subtitle,
}: {
  index: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal>
      <div>
        <p className="font-mono text-sm font-medium text-accent">{index}.</p>
        <h2 className="section-heading mt-3">{title}</h2>
        <div className="section-divider mt-6" />
        {subtitle ? <p className="mt-4 max-w-2xl text-muted">{subtitle}</p> : null}
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
      <nav className="glass mx-auto flex max-w-shell items-center justify-between rounded-full border border-line py-2 pl-3 pr-2">
        <a href="#home" aria-label="Home" className="flex h-9 w-9 items-center justify-center rounded-full bg-surface text-white">
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
            className="group relative overflow-hidden rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-white"
          >
            <span className="accent-gradient absolute inset-0 -translate-x-full transition-transform duration-300 group-hover:translate-x-0" />
            <span className="relative">RESUME</span>
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="rounded-full border border-line bg-surface px-3 py-2 text-sm font-semibold md:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>
      {open ? (
        <div className="glass mx-auto mt-2 max-w-shell rounded-2xl border border-line p-4 md:hidden">
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
  return (
    <section id="home" className="relative overflow-hidden py-20 lg:py-28">
      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-[rgba(139,92,246,0.15)] blur-[120px]" aria-hidden="true" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[rgba(6,182,212,0.12)] blur-[120px]" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-shell grid-cols-1 items-center gap-10 px-6 pt-16 md:px-10 lg:grid-cols-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <p className="font-mono text-sm font-medium text-accent">01.</p>
          <h1 className="accent-gradient-text mt-4 font-display text-6xl font-bold uppercase leading-none tracking-[-0.02em] sm:text-7xl lg:text-8xl">
            {portfolio.name}
          </h1>
          <p className="mt-6 font-mono text-xs font-medium uppercase tracking-[0.3em] text-white/80 sm:text-sm">
            {portfolio.roleLine}
          </p>
          <p className="mt-4 max-w-xl text-muted">{portfolio.tagline}</p>
          <p className="mt-4 font-medium text-white/80">{portfolio.seeking}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#projects" className="accent-gradient rounded-full px-6 py-3 text-sm font-semibold text-white">
              View Projects
            </a>
            <a href={portfolio.links.resume} className="rounded-full border border-line bg-surface px-6 py-3 text-sm font-semibold hover:border-lineHover">
              Download Resume
            </a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          className="lg:col-span-5"
        >
          <div className="rounded-2xl border border-line bg-surface p-8">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">Highlights</p>
            <h2 className="mt-3 font-display text-2xl font-bold">{portfolio.education.degree}</h2>
            <p className="mt-2 text-muted">{portfolio.education.school} · {portfolio.education.period}</p>
            <p className="mt-4 text-muted">{portfolio.education.detail}</p>
            <div className="mt-6 border-t border-line pt-4">
              <a href={portfolio.links.github} target="_blank" rel="noreferrer" className="font-semibold text-white underline underline-offset-4 hover:text-accent">
                GitHub
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="scroll-mt-28 py-20 lg:py-28">
      <div className="mx-auto max-w-shell px-6 md:px-10 lg:px-16">
        <SectionHeading index="02" title="About & Education" subtitle="Full-stack and AI-integrated applications, with a focus on agentic AI." />
        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="space-y-5 text-lg leading-relaxed text-white/80 lg:col-span-7">
            {portfolio.about.map((para, i) => (
              <Reveal key={i} delay={0.08 * i}>
                <p>{para}</p>
              </Reveal>
            ))}
            <Reveal delay={0.16}>
              <div className="mt-4">
                <Image
                  src={portfolio.photo}
                  alt={portfolio.photoAlt}
                  width={600}
                  height={800}
                  className="w-full max-w-[400px] rounded-2xl"
                />
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.08} className="lg:col-span-5">
            <div className="rounded-2xl border border-line bg-surface p-8">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">{portfolio.education.period}</p>
              <h3 className="mt-3 font-display text-2xl font-bold">{portfolio.education.degree}</h3>
              <p className="mt-1 font-medium text-white/80">{portfolio.education.school}</p>
              <p className="mt-3 text-muted">{portfolio.education.detail}</p>
              <div className="mt-8 border-t border-line pt-6">
                <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">Recent Experience</p>
                {portfolio.experience.map((exp) => (
                  <div key={exp.company} className="mt-3">
                    <h4 className="font-display text-xl font-bold">{exp.role}</h4>
                    <p className="mt-1 font-medium text-white/80">{exp.company} · {exp.location} · {exp.period}</p>
                    {exp.detail ? <p className="mt-3 text-muted">{exp.detail}</p> : null}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  let counter = 0;
  return (
    <section id="skills" className="scroll-mt-28 py-20 lg:py-28">
      <div className="mx-auto max-w-shell px-6 md:px-10 lg:px-16">
        <SectionHeading
          index="03"
          title="Technical Expertise"
          subtitle="Technologies I use to build full-stack and AI-integrated applications."
        />
        <div className="mt-16 space-y-16">
          {portfolio.skillGroups.map((group) => (
            <div key={group.domain} className="relative overflow-hidden">
              <div className="relative mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                {group.skills.map((skill, skillIndex) => {
                  counter += 1;
                  const n = counter < 10 ? String(counter).padStart(2, "0") : `0${counter}`;
                  return (
                    <motion.article
                      key={skill}
                      {...fadeUp}
                      transition={{ ...fadeUp.transition, delay: skillIndex * 0.08 }}
                      className="relative rounded-2xl border border-line bg-surface p-5 transition-all hover:border-lineHover hover:bg-surfaceHover"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-surface text-sm font-bold text-accent">
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
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-28 py-20 lg:py-28">
      <div className="mx-auto max-w-shell px-6 md:px-10 lg:px-16">
        <SectionHeading index="04" title="Projects" subtitle="Selected full-stack and AI work." />
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {portfolio.projects.map((project, i) => (
            <Reveal key={project.title} delay={0.08 * i}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-8 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-lineHover hover:bg-surfaceHover">
                <div className="flex h-32 items-center justify-center overflow-hidden rounded-xl bg-surface transition-transform duration-300 group-hover:scale-105" aria-hidden="true">
                  <span className="font-mono text-2xl font-bold text-white/30">
                    {project.title.split(" ").map((w) => w[0]).join("").slice(0, 3)}
                  </span>
                </div>
                <div className="flex flex-1 flex-col pt-6">
                  <h3 className="text-[22px] font-bold leading-snug">{project.title}</h3>
                  {project.badge ? (
                    <span className="mt-3 inline-flex w-fit rounded-full border border-accent/50 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">{project.badge}</span>
                  ) : null}
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{project.description}</p>
                  {project.stack.length > 0 ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.stack.map((tag) => (
                        <span key={tag} className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs font-medium text-muted">
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <div className="mt-5 border-t border-line pt-4">
                    <div className="flex flex-wrap gap-4">
                      {isRealLink(project.live) ? (
                        <a href={project.live} target="_blank" rel="noreferrer" className="text-sm font-semibold text-accent2 hover:text-accent hover:underline hover:underline-offset-4">
                          ↗ Live Demo
                        </a>
                      ) : null}
                      {isRealLink(project.github) ? (
                        <a href={project.github} target="_blank" rel="noreferrer" className="text-sm font-semibold text-accent2 hover:text-accent hover:underline hover:underline-offset-4">
                          Source Code
                        </a>
                      ) : null}
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

export function ContactFooter() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  // Formspree endpoint: set NEXT_PUBLIC_FORMSPREE_ENDPOINT in Vercel,
  // or fill formEndpoint in src/data/portfolio.ts, then redeploy.
  // When empty, no form is shown — a fallback is shown instead.
  const endpoint =
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT) ||
    portfolio.formEndpoint ||
    "";
  const hasEmail = portfolio.links.email.includes("@");
  const hasLinkedin = isRealLink(portfolio.links.linkedin);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!endpoint) return;
    // Honeypot: bots fill this hidden field; humans never see it.
    if (honeypot.trim() !== "") {
      setStatus("success");
      return;
    }
    setStatus("sending");
    try {
      const form = new FormData();
      form.append("name", name);
      form.append("email", email);
      form.append("message", message);
      form.append("_gotcha", honeypot);
      const res = await fetch(endpoint, { method: "POST", headers: { Accept: "application/json" }, body: form });
      if (!res.ok) throw new Error("Formspree rejected the submission");
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <section id="contact" className="scroll-mt-28 py-20 lg:py-28">
        <div className="mx-auto max-w-shell px-6 md:px-10 lg:px-16">
          <SectionHeading index="05" title="Get in Touch" subtitle="Open to SDE / AI Engineer internship opportunities." />
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
                  {hasLinkedin ? (
                    <p>
                      <a href={portfolio.links.linkedin} target="_blank" rel="noreferrer" className="font-semibold text-white underline underline-offset-4 hover:text-accent">
                        LinkedIn
                      </a>
                    </p>
                  ) : null}
                  {hasEmail ? (
                    <p>
                      <a href={`mailto:${portfolio.links.email}`} className="font-semibold text-white underline underline-offset-4 hover:text-accent">
                        {portfolio.links.email}
                      </a>
                    </p>
                  ) : null}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              {endpoint ? (
                <form className="rounded-2xl border border-line bg-surface p-6" onSubmit={onSubmit}>
                  <label className="block">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Name</span>
                    <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="mt-2 w-full rounded-lg border border-line bg-[#0a0a0f] px-4 py-3 text-white placeholder:text-muted" />
                  </label>
                  <label className="mt-5 block">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Email</span>
                    <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="mt-2 w-full rounded-lg border border-line bg-[#0a0a0f] px-4 py-3 text-white placeholder:text-muted" />
                  </label>
                  <label className="mt-5 block">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Message</span>
                    <textarea required rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your message" className="mt-2 w-full rounded-lg border border-line bg-[#0a0a0f] px-4 py-3 text-white placeholder:text-muted" />
                  </label>
                  <label className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden opacity-0" aria-hidden="true">
                    <span>Website</span>
                    <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                  </label>
                  <button type="submit" disabled={status === "sending"} className="accent-gradient mt-6 w-full rounded-full py-3 text-sm font-bold uppercase tracking-[0.2em] text-white disabled:opacity-50">
                    {status === "sending" ? "Sending…" : "Send Message"}
                  </button>
                  {status === "success" ? (
                    <p className="mt-4 text-sm font-semibold text-accent">Message sent. Thanks for reaching out — I will reply as soon as I can.</p>
                  ) : null}
                  {status === "error" ? (
                    <p className="mt-4 text-sm font-semibold text-red-400">Something went wrong sending your message. Please try again, or reach me on GitHub.</p>
                  ) : null}
                </form>
              ) : (
                <div className="rounded-2xl border border-line bg-surface p-6">
                  <h4 className="text-xl font-bold">Get in touch</h4>
                  <p className="mt-3 text-muted">
                    The contact form is not set up yet. In the meantime, the best way to reach me is through GitHub.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-4">
                    <a href={portfolio.links.github} target="_blank" rel="noreferrer" className="accent-gradient rounded-full px-5 py-2.5 text-sm font-bold text-white">
                      GitHub
                    </a>
                    {hasEmail ? (
                      <a href={`mailto:${portfolio.links.email}`} className="rounded-full border border-line px-5 py-2.5 text-sm font-bold hover:border-lineHover hover:text-accent">
                        Email me
                      </a>
                    ) : null}
                  </div>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>
      <footer className="border-t border-line py-8">
        <div className="mx-auto flex max-w-shell flex-col items-center justify-between gap-3 px-6 text-sm text-muted sm:flex-row md:px-10 lg:px-16">
          <p>© 2026 Ganesh. All rights reserved.</p>
          <div className="flex gap-5">
            {hasLinkedin ? (
              <a href={portfolio.links.linkedin} target="_blank" rel="noreferrer" className="font-semibold text-white hover:text-accent">
                LinkedIn
              </a>
            ) : null}
            <a href={portfolio.links.github} target="_blank" rel="noreferrer" className="font-semibold text-white hover:text-accent">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
