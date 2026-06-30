import { ScrollProgress } from "@/components/ScrollProgress";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { About } from "@/components/About";
import { Stack } from "@/components/Stack";
import { Experience } from "@/components/Experience";
import { Work } from "@/components/Work";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <div className="col-grid" aria-hidden>
        <div className="col-grid__inner" />
      </div>
      <div className="grain" aria-hidden />

      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Stack />
        <Experience />
        <Work />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
