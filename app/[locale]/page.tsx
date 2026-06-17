import { setRequestLocale } from "next-intl/server";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
