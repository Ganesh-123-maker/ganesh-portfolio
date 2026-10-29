import { Navbar, Hero, About, Skills, Projects, ContactFooter } from "@/components/Sections";

export default function Home() {
  return (
    <main className="relative bg-[#0a0a0f] text-[#f8fafc]">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <ContactFooter />
    </main>
  );
}
