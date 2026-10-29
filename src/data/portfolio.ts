// ============================================================
// SINGLE EDITABLE DATA FILE — edit only this file to update the
// portfolio. No other file contains personal content.
// Placeholders are written exactly as [ADD] and must be replaced
// with real values. Nothing here is invented.
// ============================================================

export const portfolio = {
  name: "Ganesh",
  fullName: "Ganesh",
  roleLine: "FULL-STACK DEVELOPER • AGENTIC AI",
  seeking: "Seeking SDE / AI Engineer internships",
  tagline:
    "Building full-stack and AI-integrated applications, with a focus on agentic AI.",

  about: [
    "I'm Ganesh, a B.Tech Computer Science student at IIIT Guwahati (2023–2027), focused on full-stack and AI-integrated applications and agentic AI.",
    "I'm seeking SDE / AI Engineer internships, and I like building products where a real interface, a real backend, and a real AI layer work together — not demos that only look finished.",
  ],

  // Photo: the photo you uploaded in this chat, copied to
  // public/photo.jpg. It is used in the About section only —
  // the reference hero has no photo, so the hero stays typographic.
  photo: "/photo.jpg",
  photoAlt: "Portrait of Ganesh",

  links: {
    github: "https://github.com/Ganesh-123-maker",
    // Replace the [ADD] values below — do not leave them as links.
    linkedin: "[ADD]",
    email: "[ADD]",
    // Resume: the PDF you uploaded in this chat is copied to
    // public/resume.pdf, so this link already works.
    resume: "/resume.pdf",
  },

  // Nav order and labels follow the reference navbar. The reference
  // nav has no Certifications link, so that section is reached by
  // scrolling, not from the nav — same as the reference.
  nav: [
    { label: "About Me", href: "#about" },
    { label: "Journey", href: "#journey" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],

  education: {
    period: "2023 – 2027",
    degree: "B.Tech in Computer Science and Engineering",
    school: "IIIT Guwahati",
    detail:
      "B.Tech Computer Science, IIIT Guwahati (2023–2027). Focus: full-stack and AI-integrated applications, agentic AI.",
  },

  // Experience: role, company and dates are from the resume you
  // uploaded. Details are left as [ADD] on purpose — no metrics,
  // jobs or achievements have been invented for this section.
  experience: [
    {
      role: "Software Engineering Intern",
      company: "Solvrex Pvt. Limited",
      location: "Remote",
      period: "Sep 2026 – Present",
      detail: "[ADD details]",
    },
  ],

  // SKILLS — exactly your list. No skills from the reference site
  // are included here. Numbers in the UI are assigned in order,
  // continuing across groups (01, 02, 03 …), as in the reference.
  skillGroups: [
    {
      domain: "Languages",
      skills: ["Python", "TypeScript", "JavaScript", "C++", "SQL"],
    },
    {
      domain: "Frontend",
      skills: ["React", "Next.js", "Tailwind CSS"],
    },
    {
      domain: "Backend",
      skills: ["FastAPI", "Node.js", "REST APIs", "JWT auth"],
    },
    {
      domain: "AI/ML",
      skills: [
        "RAG",
        "LangGraph",
        "LLM integration",
        "embeddings",
        "vector search (Qdrant)",
      ],
    },
    {
      domain: "Data/DevOps",
      skills: ["PostgreSQL", "Docker", "Git", "CI/CD"],
    },
  ],

  projects: [
    {
      title: "Agentic RAG Knowledge Assistant",
      description:
        "Document Q&A with chunking, embeddings, Qdrant vector search, and citations. LangGraph multi-agent layer (Planner, Retriever, Reasoning, Response), multi-turn chat, streaming, JWT auth.",
      stack: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "Docker"],
      github: "https://github.com/Ganesh-123-maker/RAG",
      live: "",
    },
    {
      title: "AI Interview Coach",
      description:
        "LLM-powered mock interview tool with question generation and feedback.",
      stack: [],
      github: "https://github.com/Ganesh-123-maker/InterviewCoach",
      // Live demo supplied by you in this chat, verified to load as
      // AI Interview Coach before it was added here.
      live: "https://interview-coach-blue.vercel.app/",
    },
    {
      title: "LuxeStay",
      description: "Full-stack rental platform.",
      stack: ["[ADD stack + repo]"],
      github: "[ADD]",
      live: "",
    },
    {
      title: "Agentic AI on Mental Health",
      description:
        "Ongoing research, IIIT Guwahati: adaptive strategy selection and safety supervision.",
      stack: [],
      github: "[ADD]",
      live: "",
    },
  ],

  // Certifications / achievements: you supplied none, so these are
  // placeholders only — no achievements have been invented.
  certifications: [
    { title: "[ADD certification]", detail: "[ADD]" },
    { title: "[ADD certification]", detail: "[ADD]" },
    { title: "[ADD achievement]", detail: "[ADD]" },
  ],

  contact: {
    heading: "Let's build something real.",
    text: "If you're hiring for an SDE / AI Engineer internship, or want to talk about full-stack and agentic AI work, my GitHub is the best place to start. LinkedIn and email are marked [ADD] until you add them above.",
  },

  footer: "© 2026 Ganesh. Built with Next.js, TypeScript, Tailwind CSS and Framer Motion.",
};

export type Portfolio = typeof portfolio;
