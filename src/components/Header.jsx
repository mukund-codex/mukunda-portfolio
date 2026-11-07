import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Play, X, Zap, ZapOff } from "lucide-react";
import { labels } from "../config/site.js";
import { brandName, sections } from "../lib/derived.js";
import { EASE, useMotion } from "../lib/motion.jsx";
import { startSwarm, stopSwarm } from "../lib/swarm.js";

const NAV = [
  { id: "work", label: labels.nav.work, show: true },
  { id: "about", label: labels.nav.about, show: sections.about },
  { id: "experience", label: labels.nav.experience, show: sections.experience },
].filter((item) => item.show);

function useActiveSection(ids) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const targets = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);
  return active;
}

/** "Motion" replays the swarm build; the icon button switches animations on or off. */
function MotionControls() {
  const { enabled, toggle } = useMotion();

  // Build the page with the swarm on every load, then section by section on scroll.
  useEffect(() => {
    if (!enabled) return;
    const timer = setTimeout(startSwarm, 150);
    return () => {
      clearTimeout(timer);
      stopSwarm();
    };
  }, []);

  return (
    <>
      <button
        type="button"
        className="motion-play"
        onClick={startSwarm}
        disabled={!enabled}
        title={enabled ? undefined : labels.motionDisabled}
      >
        <Play size={14} aria-hidden="true" />
        {labels.motion}
      </button>
      <button
        type="button"
        className="motion-toggle"
        aria-pressed={enabled}
        aria-label={labels.animations}
        title={enabled ? labels.motionOn : labels.motionOff}
        onClick={() => {
          if (enabled) stopSwarm();
          toggle();
        }}
      >
        {enabled ? <Zap size={16} aria-hidden="true" /> : <ZapOff size={16} aria-hidden="true" />}
      </button>
    </>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef(null);
  const active = useActiveSection([...NAV.map((item) => item.id), "contact"]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.classList.add("no-scroll");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("no-scroll");
    };
  }, [open]);

  const links = NAV.map((item) => (
    <li key={item.id}>
      <a
        href={`#${item.id}`}
        className={`nav-link${active === item.id ? " is-active" : ""}`}
        aria-current={active === item.id ? "true" : undefined}
        onClick={() => setOpen(false)}
      >
        {item.label}
        {active === item.id && <motion.span layoutId="nav-indicator" className="nav-link__bar" />}
      </a>
    </li>
  ));

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="container site-header__inner">
        <a href="#top" className="wordmark" aria-label={`${brandName}, back to top`}>
          {brandName}
          <span className="wordmark__dot" aria-hidden="true">.</span>
        </a>

        <nav aria-label="Primary" className="site-nav">
          <ul>{links}</ul>
        </nav>

        <div className="site-header__actions">
          <MotionControls />
          {sections.contact && (
            <a href="#contact" className="btn btn--small btn--accent header-cta">
              {labels.contact}
            </a>
          )}
          <button
            ref={menuButton}
            type="button"
            className="menu-button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? labels.close : labels.menu}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <ul>
              {links}
              {sections.contact && (
                <li>
                  <a href="#contact" className="nav-link" onClick={() => setOpen(false)}>
                    {labels.nav.contact}
                  </a>
                </li>
              )}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
