import { Navbar, Hero, About, Journey, Skills, Projects, Certifications, ContactFooter } from "@/components/Sections";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Journey />
      <Skills />
      <Projects />
      <Certifications />
      <ContactFooter />
    </main>
  );
}
