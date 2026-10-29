// ============================================================
// SINGLE EDITABLE DATA FILE — edit only this file to update the
// portfolio. No other file contains personal content.
// Empty strings mean 'not supplied yet' and are hidden on the
// live site — never rendered as placeholder text. Nothing here
// is invented.
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

  // Contact form endpoint: leave empty until a Formspree form is
  // created (see the Contact section code). When empty, the site
  // shows a fallback instead of a form that does nothing.
  formEndpoint: "",
  links: {
    github: "https://github.com/Ganesh-123-maker",
    // Empty string = hidden on the live site. Fill with a real
    // LinkedIn URL / email address when supplied; never render a
    // placeholder or a dead link.
    linkedin: "",
    email: "",
    // Resume: the PDF you uploaded in this chat is copied to
    // public/resume.pdf, so this link already works.
    resume: "/resume.pdf",
  },

  // Nav order and labels follow the reference navbar.
  nav: [
    { label: "About Me", href: "#about" },
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
  // uploaded. Details are left empty on purpose — no metrics,
  // jobs or achievements have been invented for this section.
  experience: [
    {
      role: "Software Engineering Intern",
      company: "Solvrex Pvt. Limited",
      location: "Remote",
      period: "Sep 2026 – Present",
      detail: "",
    },
  ],

  // SKILLS — exactly your latest list (22 skills). Numbers in the
  // UI are assigned in order, continuing across groups.
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
      skills: ["FastAPI", "Node.js", "Express", "REST APIs", "JWT"],
    },
    {
      domain: "AI/ML",
      skills: ["RAG", "LangGraph", "LLM integration", "Qdrant"],
    },
    {
      domain: "Data/DevOps",
      skills: ["MongoDB", "PostgreSQL", "Docker", "Git", "CI/CD"],
    },
  ],

  projects: [
    {
      title: "Agentic RAG Knowledge Assistant",
      description:
        "Document Q&A with chunking, embeddings, Qdrant vector search, and citations. LangGraph multi-agent layer (Planner, Retriever, Reasoning, Response), streaming, JWT auth.",
      stack: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "Docker"],
      github: "https://github.com/Ganesh-123-maker/RAG",
      live: "",
      badge: "",
    },
    {
      title: "AI Interview Coach",
      description: "LLM-powered mock interview tool with feedback.",
      stack: [],
      github: "https://github.com/Ganesh-123-maker/InterviewCoach",
      // Live demo supplied by you earlier in this chat, verified to
      // load as AI Interview Coach before it was added here.
      live: "https://interview-coach-blue.vercel.app/",
      badge: "",
    },
    {
      title: "LuxeStay",
      description: "Full-stack rental platform.",
      stack: ["Node.js", "Express", "MongoDB"],
      github: "https://github.com/Ganesh-123-maker/LuxeStay",
      live: "",
      badge: "",
    },
    {
      title: "Agentic AI on Mental Health",
      description:
        "Multi-agent AI system for mental health support (ongoing research project at IIIT Guwahati).",
      stack: [],
      github: "",
      live: "",
      badge: "Ongoing Research",
    },
  ],

  contact: {
    heading: "Let's build something real.",
    text: "If you're hiring for an SDE / AI Engineer internship, or want to talk about full-stack and agentic AI work, my GitHub is the best place to start for now.",
  },

  footer: "© 2026 Ganesh. Built with Next.js, TypeScript, Tailwind CSS and Framer Motion.",
};

export type Portfolio = typeof portfolio;
