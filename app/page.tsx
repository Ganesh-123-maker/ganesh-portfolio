import { Navbar, Hero, About, Journey, Skills, Projects, ContactFooter } from "@/components/Sections";

export default function Home() {
  return (
    <main className="relative">
      {/* Cinematic layer: film grain + vignette over the whole page, never blocking clicks */}
      <div className="film-grain pointer-events-none fixed inset-0 z-[60]" aria-hidden="true" />
      <div className="vignette pointer-events-none fixed inset-0 z-[59]" aria-hidden="true" />
      <Navbar />
      <Hero />
      <About />
      <Journey />
      <Skills />
      <Projects />
      <ContactFooter />
    </main>
  );
}
