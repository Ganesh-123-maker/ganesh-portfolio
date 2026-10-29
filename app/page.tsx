import { Navbar, Hero, About, Skills, Projects, ContactFooter } from "@/components/Sections";

export default function Home() {
  return (
    <main className="relative bg-[#030303] text-[#e0e0e0]">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <ContactFooter />
    </main>
  );
}
