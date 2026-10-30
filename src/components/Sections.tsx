"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
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


// About word-by-word reveal: each word brightens as it scrolls
// into focus, dim below until reached. Original Ganesh text only.
function AboutWord({ word, progress, index, total }: { word: string; progress: MotionValue<number>; index: number; total: number }) {
  const opacity = useTransform(progress, [Math.max(0, index / total - 0.12), Math.min(1, (index + 1) / total + 0.12)], [0.3, 1]);
  const y = useTransform(progress, [Math.max(0, index / total - 0.12), Math.min(1, (index + 1) / total + 0.12)], [8, 0]);
  return (
    <motion.span style={{ opacity, y }} className="mr-[0.25em] inline-block">
      {word}
      {" "}
    </motion.span>
  );
}

function AboutParagraph({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className="text-[clamp(1.2rem,3.2vw,2.5rem)]">
      {words.map((word, i) => (
        <AboutWord key={`${word}-${i}`} word={word} progress={scrollYProgress} index={i} total={words.length} />
      ))}
    </p>
  );
}

// Journey card: blur-to-sharp fade as it arrives in the viewport.
type JourneyEntry = { period: string; title: string; org: string; detail: string };
function JourneyCard({ entry, dir }: { entry: JourneyEntry; dir: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 0.5]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -20]);
  const filter = useTransform(scrollYProgress, [0, 0.5, 1], ["blur(8px)", "blur(0px)", "blur(8px)"]);
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [dir * 60, 0, 0]);
  return (
    <motion.article ref={ref} style={{ opacity, y, x, filter }} className="w-full max-w-[560px] text-center will-change-transform">
      <p className="mb-3 font-mono text-[11px] tracking-[0.38em] text-accent">{entry.period}</p>
      <h3 className="mb-2.5 text-[clamp(1.6rem,4.2vw,3.5rem)] font-extrabold leading-[1.05]">{entry.title}</h3>
      <p className="mb-3.5 text-[0.9rem] tracking-[0.08em] text-white/75">{entry.org}</p>
      {entry.detail ? (
        <p className="mx-auto max-w-[58ch] text-[0.95rem] leading-[1.8] text-white/45">{entry.detail}</p>
      ) : null}
    </motion.article>
  );
}

// Skills deck: one card's state from global deck scroll progress.
// Before its group segment it sits deep and invisible; during the
// segment it fans into its slot; at the segment end it sinks back.
function deckCardValue(
  v: number,
  groupIndex: number,
  cardIndex: number,
  groupSize: number,
  totalGroups: number,
  prop: "opacity" | "scale" | "x" | "y" | "rotateX" | "rotateY" | "z",
): number {
  const seg = 1 / totalGroups;
  const start = groupIndex * seg;
  const local = (v - start) / seg;
  const centre = (groupSize - 1) / 2;
  const fanX = (cardIndex - centre) * 45;
  const fanRot = (cardIndex - centre) * 8;
  if (local < 0) {
    return { opacity: 0, scale: 0.7, x: fanX * 0.5, y: 100, rotateX: 30, rotateY: fanRot, z: -200 }[prop];
  }
  if (local > 1) {
    return { opacity: 0, scale: 0.8, x: fanX, y: -80, rotateX: -15, rotateY: fanRot, z: -150 }[prop];
  }
  const stagger = groupSize > 1 ? (cardIndex / (groupSize - 1)) * 0.3 : 0;
  const appear = Math.min(1, Math.max(0, (local - stagger) / 0.5));
  const exit = Math.min(1, Math.max(0, (local - 0.85) / 0.15));
  const slide = cardIndex % 2 === 0 ? -160 : 160;
  const pop = 0.08 * Math.sin(appear * Math.PI);
  const vals = {
    opacity: appear * (1 - exit),
    scale: 0.7 + 0.3 * appear + pop - 0.2 * exit,
    x: fanX + slide * (1 - appear),
    y: 80 * (1 - appear) - 40 * exit,
    rotateX: 25 * (1 - appear) - 10 * exit,
    rotateY: fanRot * (0.5 + 0.5 * appear) + (cardIndex % 2 === 0 ? -25 : 25) * (1 - appear),
    z: -150 * (1 - appear) + 50 * Math.sin(appear * Math.PI) - 100 * exit,
  };
  return vals[prop];
}

function DeckWord({ word, progress, groupIndex, totalGroups }: { word: string; progress: MotionValue<number>; groupIndex: number; totalGroups: number }) {
  const opacity = useTransform(progress, (v: number) => {
    const seg = 1 / totalGroups;
    const local = (v - groupIndex * seg) / seg;
    if (local < 0 || local > 1) return 0;
    const edge = Math.min(1, Math.min(local / 0.1, (1 - local) / 0.1));
    return 0.9 * edge;
  });
  const scale = useTransform(progress, (v: number) => {
    const seg = 1 / totalGroups;
    const local = (v - groupIndex * seg) / seg;
    if (local < 0 || local > 1) return 0.95;
    return 0.95 + 0.05 * Math.min(1, local / 0.3);
  });
  const x = useTransform(progress, (v: number) => {
    const seg = 1 / totalGroups;
    const local = (v - groupIndex * seg) / seg;
    if (local < 0) return -120;
    if (local > 1) return 120;
    return -120 * (1 - Math.min(1, local / 0.3));
  });
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
      <motion.p style={{ opacity, scale, x }} className="whitespace-nowrap font-display text-[clamp(3rem,10vw,8rem)] font-bold uppercase tracking-[clamp(-0.1rem,-1vw,-0.5rem)] text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.15)]">
        {word}
      </motion.p>
    </div>
  );
}

function DeckCard({ skill, domain, n, progress, groupIndex, cardIndex, groupSize, totalGroups }: { skill: string; domain: string; n: string; progress: MotionValue<number>; groupIndex: number; cardIndex: number; groupSize: number; totalGroups: number }) {
  const opacity = useTransform(progress, (v: number) => deckCardValue(v, groupIndex, cardIndex, groupSize, totalGroups, "opacity"));
  const scale = useTransform(progress, (v: number) => deckCardValue(v, groupIndex, cardIndex, groupSize, totalGroups, "scale"));
  const x = useTransform(progress, (v: number) => deckCardValue(v, groupIndex, cardIndex, groupSize, totalGroups, "x"));
  const y = useTransform(progress, (v: number) => deckCardValue(v, groupIndex, cardIndex, groupSize, totalGroups, "y"));
  const rotateX = useTransform(progress, (v: number) => deckCardValue(v, groupIndex, cardIndex, groupSize, totalGroups, "rotateX"));
  const rotateY = useTransform(progress, (v: number) => deckCardValue(v, groupIndex, cardIndex, groupSize, totalGroups, "rotateY"));
  const z = useTransform(progress, (v: number) => deckCardValue(v, groupIndex, cardIndex, groupSize, totalGroups, "z"));
  return (
    <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
      <motion.article
        style={{ opacity, scale, x, y, rotateX, rotateY, z, transformPerspective: 700, transformStyle: "preserve-3d" }}
        className="relative flex h-[clamp(320px,35vw,410px)] w-[clamp(220px,25vw,290px)] flex-col justify-between border border-line bg-surface p-6 text-center shadow-[0_0_0_1px_#00000080,0_20px_50px_#00000080] backdrop-blur-[8px] transition-colors duration-300 hover:border-accent hover:bg-surfaceHover hover:shadow-[0_0_30px_#c46b1f38]"
      >
        <div className="flex items-center justify-center gap-4 border-b border-line pb-3">
          <span className="font-mono text-xs text-accent">{n}</span>
          <span className="h-2 w-2 bg-accent" aria-hidden="true" />
        </div>
        <h4 className="mt-4 font-display text-[clamp(1.3rem,3vw,2rem)] font-bold uppercase leading-[0.95] text-white">
          {skill}
        </h4>
        <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.06em] text-white/45">{domain}</p>
        <p className="mt-auto pt-4 font-mono text-[0.65rem] text-white/40">Skill {n} / 22</p>
        <span className="absolute bottom-6 right-6 text-[3rem] font-black text-white opacity-10" aria-hidden="true">
          {n}
        </span>
      </motion.article>
    </div>
  );
}

type ProjectItem = {
  title: string;
  description: string;
  stack: string[];
  github: string;
  live: string;
  badge: string;
};

function ProjectDepthCard({ project, index }: { project: ProjectItem; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  return (
    <motion.article
      ref={ref}
      style={{ opacity, y }}
      className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-[rgba(255,255,255,0.08)] bg-[#0a0a0a59] shadow-[0_24px_70px_#0000008c] backdrop-blur-[10px] transition-all duration-300 hover:border-[#c46b1f59] hover:shadow-[0_0_38px_#c46b1f2e]"
    >
      <div className="relative h-[clamp(200px,22vw,260px)] w-full overflow-hidden max-[480px]:h-[190px]" aria-hidden="true">
        <div className="flex h-full w-full items-center justify-center bg-surface">
          <span className="font-mono text-2xl font-bold text-white/30">
            {project.title
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 3)}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/55 to-black/85 opacity-100 transition-opacity duration-300 group-hover:opacity-85" />
      </div>
      <div className="flex flex-1 flex-col p-[clamp(16px,2vw,22px)]">
        <h3 className="text-[clamp(1.1rem,1.5vw,1.35rem)] font-bold tracking-[-0.01em]">{project.title}</h3>
        {project.badge ? (
          <span className="mt-3 inline-flex w-fit rounded-full border border-accent/50 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
            {project.badge}
          </span>
        ) : null}
        <p className="mt-3 flex-1 text-[clamp(0.88rem,1.1vw,0.95rem)] leading-[1.65] text-white/50">{project.description}</p>
        {project.stack.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.06)] px-2.5 py-1.5 text-xs text-white/65 transition-all duration-200 group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
        <div className="mt-auto border-t border-[rgba(255,255,255,0.08)] pt-3.5">
          <div className="flex flex-wrap gap-[18px]">
            {isRealLink(project.live) ? (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="text-[0.9rem] font-semibold text-[#78d2fff2] transition-all duration-200 hover:text-[#c46b1ff2] hover:underline group-hover:translate-x-0.5"
              >
                ↗ Live Demo
              </a>
            ) : null}
            {isRealLink(project.github) ? (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="text-[0.9rem] font-semibold text-[#78d2fff2] transition-all duration-200 hover:text-[#c46b1ff2] hover:underline group-hover:translate-x-0.5"
              >
                Source Code
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function SectionHeading({

  index,
  title,
  subtitle,
  titleClassName = "section-heading",
  kickerClassName = "section-kicker",
}: {
  index: string;
  title: string;
  subtitle?: string;
  titleClassName?: string;
  kickerClassName?: string;
}) {
  return (
    <Reveal>
      <div>
        <p className={kickerClassName}>{index}.</p>
        <h2 className={`${titleClassName} mt-3`}>{title}</h2>
        {subtitle ? (
          <p className="mt-4 max-w-[70ch] text-[clamp(0.85rem,1.1vw,0.95rem)] leading-[1.7] text-white/60">{subtitle}</p>
        ) : null}
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
    <header className="fixed inset-x-0 top-4 z-[1000] px-3.5">
      <nav className="glass mx-auto flex w-full max-w-[920px] items-center justify-between gap-3 rounded-full border border-line px-3.5 py-2.5">
        <a
          href="#home"
          aria-label="Home"
          className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full border border-line text-white"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 10.5 12 3l9 7.5" />
            <path d="M5 9.5V21h14V9.5" />
          </svg>
        </a>
        <div className="hidden min-w-0 flex-1 items-center justify-around min-[641px]:flex">
          {portfolio.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-sm text-white opacity-90 transition-all duration-200 hover:-translate-y-px hover:opacity-100"
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a
            href={portfolio.links.resume}
            className="group relative overflow-hidden rounded-full border border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.06)] px-[26px] py-3.5 text-sm font-semibold text-[#ffffffeb] backdrop-blur-[10px] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#c46b1f8c]"
          >
            <span className="absolute inset-0 -translate-x-full bg-[#c46b1f59] transition-transform duration-300 group-hover:translate-x-0" />
            <span className="relative">RESUME</span>
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(0,0,0,0.3)] text-xs font-semibold text-white min-[641px]:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>
      {open ? (
        <div className="glass mx-auto mt-2.5 w-full max-w-[920px] rounded-[18px] border border-line p-2.5 shadow-[0_0_20px_rgba(255,255,255,0.08)] min-[641px]:hidden">
          {portfolio.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl p-3 text-base font-medium text-white opacity-90 transition-all duration-200 hover:bg-white/10 hover:opacity-100"
            >
              {item.label}
            </a>
          ))}
          <a
            href={portfolio.links.resume}
            className="block rounded-xl p-3 text-base font-medium text-white opacity-90 transition-all duration-200 hover:bg-white/10 hover:opacity-100"
          >
            RESUME
          </a>
        </div>
      ) : null}
    </header>
  );
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(heroProgress, [0, 1], [1, 0.15]);
  const heroNameScale = useTransform(heroProgress, [0, 1], [1, 2.4]);
  const heroNameOpacity = useTransform(heroProgress, [0, 0.7, 1], [1, 1, 0]);
  return (
    <section ref={heroRef} id="home" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(241,129,31,0.2),rgba(196,107,31,0.06),transparent_60%)] blur-[60px] opacity-90" />
        {Array.from({ length: 60 }, (_, i) => (
          <span key={i} className="absolute h-[2px] w-[2px] rounded-full bg-white opacity-50" style={{ left: `${(i * 37 + 13) % 100}%`, top: `${(i * 53 + 7) % 100}%` }} />
        ))}
      </div>
      <div className="relative z-[2] mx-auto flex w-[80%] flex-col items-center justify-center pb-16 pt-24 text-center">
        <motion.div style={{ opacity: heroOpacity }} className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <motion.h1 style={{ scale: heroNameScale, opacity: heroNameOpacity }} className="hero-title">{portfolio.name}</motion.h1>
          <div className="mx-auto mt-[clamp(1rem,3vw,2rem)] flex flex-wrap items-center justify-center gap-[clamp(0.6rem,2vw,1.2rem)]">
            <span className="h-px w-[clamp(36px,10vw,80px)] bg-[#c46b1f] opacity-90" aria-hidden="true" />
            <span className="hero-tagline">{portfolio.roleLine}</span>
            <span className="h-px w-[clamp(36px,10vw,80px)] bg-[#c46b1f] opacity-90" aria-hidden="true" />
          </div>
          <p className="mx-auto mt-6 max-w-[62ch] text-[clamp(0.9rem,1.2vw,0.95rem)] leading-[1.7] text-white/60">
            {portfolio.tagline}
          </p>
          <p className="mt-4 font-medium text-white/80">{portfolio.seeking}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#projects"
              className="rounded-full bg-[#c46b1f] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
            >
              View Projects
            </a>
            <a
              href={portfolio.links.resume}
              className="rounded-full border border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.06)] px-6 py-3 text-sm font-semibold text-[#ffffffeb] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#c46b1f8c]"
            >
              Download Resume
            </a>
          </div>
          <a
            href="#about"
            className="mx-auto mt-[clamp(1.5rem,4vw,3rem)] flex flex-col items-center gap-2 text-[#545454] transition-opacity duration-200 hover:opacity-100"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
            <span className="text-[0.85rem] opacity-75">Scroll down to explore</span>
          </a>
        </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="scroll-mt-28 py-[50px] text-white min-[641px]:py-[70px]">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <Reveal>
          <h2 className="section-kicker flex w-full justify-center">01. About Me</h2>
        </Reveal>
        <div className="mt-[30px] flex flex-col items-center gap-6 text-center min-[641px]:flex-row min-[641px]:items-center min-[641px]:justify-between min-[641px]:gap-6 min-[641px]:text-left min-[901px]:gap-8">
          <div className="w-full font-light leading-[clamp(2rem,5vw,4.5rem)] text-white min-[641px]:w-[62%] min-[901px]:w-[60%]">
            {portfolio.about.map((para, i) => (
              <div key={i} className="mb-4 last:mb-0">
                <AboutParagraph text={para} />
              </div>
            ))}
          </div>
          <Reveal delay={0.08} className="w-[min(320px,90%)] shrink-0 min-[641px]:w-[34%] min-[901px]:w-[32%]">
            <Image
              src={portfolio.photo}
              alt={portfolio.photoAlt}
              width={600}
              height={800}
              className="aspect-[4/5] h-full w-full rounded-xl object-cover min-[641px]:aspect-[3/4]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Journey() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 0.7", "end 0.5"] });
  const fillScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const entries: JourneyEntry[] = [
    {
      period: portfolio.education.period,
      title: portfolio.education.degree,
      org: portfolio.education.school,
      detail: portfolio.education.detail,
    },
    ...portfolio.experience.map((exp) => ({
      period: exp.period,
      title: exp.role,
      org: `${exp.company} · ${exp.location}`,
      detail: exp.detail,
    })),
  ];
  return (
    <section id="timeline" className="relative scroll-mt-28 py-[clamp(40px,6vw,90px)] pb-[clamp(60px,8vw,110px)] text-white">
      <div className="mx-auto mb-[clamp(24px,5vw,56px)] px-[clamp(16px,4vw,40px)] text-center">
        <Reveal>
          <p className="section-kicker">02. Journey</p>
          <h2 className="mt-3.5 font-sans text-[clamp(2.2rem,6vw,5.25rem)] font-extrabold leading-[0.95] tracking-[-0.02em]">Journey</h2>
          <p className="mx-auto mt-4 max-w-[62ch] text-[clamp(0.9rem,1.2vw,0.95rem)] leading-[1.7] text-white/60">
            Education and experience, in order.
          </p>
        </Reveal>
      </div>
      <div ref={timelineRef} className="relative mx-auto w-full px-[clamp(14px,4vw,60px)]">
        <div className="pointer-events-none absolute bottom-0 left-1/2 top-0 w-[2px] -translate-x-1/2 bg-[rgba(255,255,255,0.08)] max-[900px]:hidden" aria-hidden="true">
          <motion.div style={{ scaleY: fillScaleY }} className="h-full w-full origin-top bg-gradient-to-b from-[#c46b1f] to-[rgba(196,107,31,0.15)]" />
        </div>
        {entries.map((entry, i) => (
          <div key={entry.title} className="relative flex items-center py-[clamp(26px,4vw,44px)]">
            <div className="flex min-w-0 flex-1 justify-center max-[900px]:hidden min-[901px]:justify-end min-[901px]:pr-[clamp(18px,4vw,52px)]">
              {i % 2 === 0 ? <JourneyCard entry={entry} dir={-1} /> : null}
            </div>
            <div className="relative w-[clamp(56px,6vw,80px)] shrink-0 max-[900px]:hidden" aria-hidden="true">
              <span className="absolute left-1/2 top-1/2 h-[14px] w-[14px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent bg-[#050505e6] shadow-[0_0_0_6px_rgba(196,107,31,0.08)]" />
            </div>
            <div className="flex min-w-0 flex-1 justify-center max-[900px]:hidden min-[901px]:justify-start min-[901px]:pl-[clamp(18px,4vw,52px)]">
              {i % 2 === 1 ? <JourneyCard entry={entry} dir={1} /> : null}
            </div>
            <div className="hidden w-full justify-center max-[900px]:flex">
              <JourneyCard entry={entry} dir={i % 2 === 0 ? -1 : 1} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Skills() {
  const deckRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: deckRef, offset: ["start start", "end end"] });
  const groups = portfolio.skillGroups;
  const totalGroups = groups.length;
  let counter = 0;
  const cardsByGroup = groups.map((group) =>
    group.skills.map((skill) => {
      counter += 1;
      const n = String(counter).padStart(2, "0");
      return { skill, n };
    }),
  );
  const stars = Array.from({ length: 120 }, (_, i) => ({
    left: `${(i * 37 + 13) % 100}%`,
    top: `${(i * 53 + 7) % 100}%`,
  }));
  return (
    <section id="skills" className="relative scroll-mt-28">
      <div ref={deckRef} style={{ height: `${totalGroups * 100}vh` }} className="relative">
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden pt-[100px]">
          <div className="relative z-10 mx-auto w-[min(92vw,1110px)] shrink-0 px-5 text-center">
            <p className="section-kicker">03. Skills</p>
            <h2 className="section-heading mt-2.5">Technical Expertise</h2>
            <p className="mx-auto mt-2.5 max-w-[60ch] text-[clamp(0.85rem,1.5vw,0.95rem)] font-light leading-[1.5] text-white/60">
              Technologies I use to build full-stack and AI-integrated applications.
            </p>
          </div>
          <div className="relative mt-5 flex-1 overflow-hidden" style={{ perspective: 700 }}>
            {stars.map((s, i) => (
              <span key={i} className="absolute h-[2px] w-[2px] rounded-full bg-white opacity-50" style={{ left: s.left, top: s.top }} aria-hidden="true" />
            ))}
            {groups.map((group, gi) => (
              <DeckWord key={group.domain} word={group.domain} progress={scrollYProgress} groupIndex={gi} totalGroups={totalGroups} />
            ))}
            {groups.map((group, gi) =>
              cardsByGroup[gi].map((card, ci) => (
                <DeckCard
                  key={card.skill}
                  skill={card.skill}
                  domain={group.domain}
                  n={card.n}
                  progress={scrollYProgress}
                  groupIndex={gi}
                  cardIndex={ci}
                  groupSize={group.skills.length}
                  totalGroups={totalGroups}
                />
              )),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-28 pb-[clamp(60px,8vw,100px)] pt-[clamp(60px,8vw,100px)] text-white max-[480px]:py-[50px]">
      <div className="mx-auto w-[min(1200px,92%)] px-4 text-center">
        <SectionHeading
          index="04"
          title="Projects"
          subtitle="Selected full-stack and AI work."
          titleClassName="section-heading-projects"
          kickerClassName="section-kicker-projects"
        />
      </div>
      <div className="mx-auto mt-[clamp(30px,5vw,42px)] grid w-[min(1200px,92%)] grid-cols-2 gap-[clamp(20px,3vw,28px)] max-[900px]:w-[94%] max-[900px]:grid-cols-1" style={{ perspective: 1200 }}>
        {portfolio.projects.map((project, i) => (
          <ProjectDepthCard key={project.title} project={project} index={i} />
        ))}
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

  const inputClass =
    "mt-2 w-full rounded-[10px] border border-[rgba(255,255,255,0.08)] bg-[#0808088c] p-3 text-sm text-[#ffffffe0] outline-none placeholder:text-white/30 focus:border-white/20";

  return (
    <>
      <section id="contact" className="relative scroll-mt-28 pb-[clamp(24px,6vw,40px)] pt-[clamp(56px,8vw,90px)] text-white">
        <div className="relative mx-auto mt-[clamp(18px,5vw,50px)] flex w-[min(1200px,92vw)] flex-col gap-[clamp(18px,4vw,56px)] pb-[clamp(32px,6vw,70px)] min-[901px]:flex-row min-[901px]:items-start min-[901px]:justify-between">
          <Reveal className="w-full min-w-0 min-[901px]:flex-[1_1_58%] min-[901px]:max-w-[680px]">
            <div>
              <p className="section-kicker">05. Get in Touch</p>
              <h3 className="mt-[clamp(14px,3vw,22px)] text-[clamp(2.2rem,5.2vw,5.4rem)] font-extrabold leading-[0.92] tracking-[-0.03em]">
                {portfolio.contact.heading}
              </h3>
              <p className="mt-[clamp(18px,4vw,34px)] max-w-[56ch] text-[clamp(0.9rem,1.2vw,0.95rem)] leading-[1.7] text-white/55">
                {portfolio.contact.text}
              </p>
              <div className="mt-[18px] flex flex-col gap-2.5">
                <p>
                  <a
                    href={portfolio.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="w-fit border-b border-white/25 pb-1.5 text-[clamp(0.95rem,2.5vw,1.15rem)] font-semibold text-[#ffffffeb] hover:border-white/60"
                  >
                    GitHub
                  </a>
                </p>
                {hasLinkedin ? (
                  <p>
                    <a
                      href={portfolio.links.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="w-fit border-b border-white/25 pb-1.5 text-[clamp(0.95rem,2.5vw,1.15rem)] font-semibold text-[#ffffffeb] hover:border-white/60"
                    >
                      LinkedIn
                    </a>
                  </p>
                ) : null}
                {hasEmail ? (
                  <p>
                    <a
                      href={`mailto:${portfolio.links.email}`}
                      className="w-fit border-b border-white/25 pb-1.5 text-[clamp(0.95rem,2.5vw,1.15rem)] font-semibold text-[#ffffffeb] hover:border-white/60"
                    >
                      {portfolio.links.email}
                    </a>
                  </p>
                ) : null}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="w-full min-[901px]:shrink-0 min-[901px]:flex-[0_0_420px] min-[901px]:max-w-[420px] max-[900px]:max-w-none">
            {endpoint ? (
              <form
                className="flex flex-col gap-4 rounded-[18px] border border-[rgba(255,255,255,0.08)] bg-[#1414148c] p-[clamp(16px,4vw,22px)] shadow-[0_20px_60px_#0000008c] backdrop-blur-[10px]"
                onSubmit={onSubmit}
              >
                <label className="block">
                  <span className="text-[11px] tracking-[0.22em] text-white/35">NAME</span>
                  <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={inputClass} />
                </label>
                <label className="block">
                  <span className="text-[11px] tracking-[0.22em] text-white/35">EMAIL</span>
                  <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={inputClass} />
                </label>
                <label className="block">
                  <span className="text-[11px] tracking-[0.22em] text-white/35">MESSAGE</span>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your message"
                    className={`${inputClass} min-h-[120px] resize-none`}
                  />
                </label>
                <label className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden opacity-0" aria-hidden="true">
                  <span>Website</span>
                  <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                </label>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-1.5 h-[52px] w-full rounded-[10px] border border-white/15 bg-[#fffffff2] text-xs font-bold tracking-[0.12em] text-[#0b0b0b] transition-all duration-150 hover:-translate-y-px hover:opacity-90 disabled:opacity-50"
                >
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
              <div className="rounded-[18px] border border-[rgba(255,255,255,0.08)] bg-[#1414148c] p-[clamp(16px,4vw,22px)] shadow-[0_20px_60px_#0000008c] backdrop-blur-[10px]">
                <h4 className="text-xl font-bold">Get in touch</h4>
                <p className="mt-3 text-white/55">
                  The contact form is not set up yet. In the meantime, the best way to reach me is through GitHub.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <a
                    href={portfolio.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-[#fffffff2] px-5 py-2.5 text-sm font-bold text-[#0b0b0b]"
                  >
                    GitHub
                  </a>
                  {hasEmail ? (
                    <a
                      href={`mailto:${portfolio.links.email}`}
                      className="rounded-full border border-line px-5 py-2.5 text-sm font-bold hover:border-lineHover hover:text-accent"
                    >
                      Email me
                    </a>
                  ) : null}
                </div>
              </div>
            )}
          </Reveal>
        </div>
      </section>
      <footer className="border-t border-[rgba(255,255,255,0.08)] pb-[clamp(48px,10vw,120px)] pt-[22px]">
        <div className="mx-auto flex w-[min(1200px,92vw)] flex-col items-center justify-between gap-4 text-xs text-white/35 sm:flex-row">
          <p>© 2026 Ganesh. All rights reserved.</p>
          <div className="flex gap-[18px]">
            {hasLinkedin ? (
              <a href={portfolio.links.linkedin} target="_blank" rel="noreferrer" className="font-semibold text-white/35 hover:text-white/70">
                LinkedIn
              </a>
            ) : null}
            <a href={portfolio.links.github} target="_blank" rel="noreferrer" className="font-semibold text-white/35 hover:text-white/70">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
