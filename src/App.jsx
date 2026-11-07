import { useEffect } from "react";
import { MotionProvider } from "./lib/motion.jsx";
import { site } from "./config/site.js";
import { sections } from "./lib/derived.js";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import ProjectGrid from "./components/ProjectGrid.jsx";
import About from "./components/About.jsx";
import Experience from "./components/Experience.jsx";
import { Awards, ClientLogos, Testimonials } from "./components/Extras.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";

const { appearance } = site;

export default function App() {
  // Appearance settings in site.js are the design tokens.
  useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty("--bg", appearance.background);
    root.setProperty("--text", appearance.text);
    root.setProperty("--accent", appearance.accent);
    root.setProperty("--muted", appearance.muted);
    root.setProperty("--font-display", `"${appearance.displayFont}", "Impact", "Arial Narrow", sans-serif`);
    root.setProperty("--font-body", `"${appearance.bodyFont}", system-ui, -apple-system, "Segoe UI", sans-serif`);
    root.setProperty("--font-accent", `"${appearance.accentFont}", "Segoe Script", cursive`);
  }, []);

  return (
    <MotionProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollProgress />
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        {sections.clientLogos && <ClientLogos />}
        <ProjectGrid />
        {sections.about && <About />}
        {sections.experience && <Experience />}
        {sections.awards && <Awards />}
        {sections.testimonials && <Testimonials />}
        {sections.contact && <Contact />}
      </main>
      <Footer />
    </MotionProvider>
  );
}
