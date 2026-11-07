import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, Download, MapPin } from "lucide-react";
import { labels, site } from "../config/site.js";
import { brandName, has, initials, resumeUrl, sections } from "../lib/derived.js";
import { EASE, revealDistance, useMotion } from "../lib/motion.jsx";
import Magnetic from "./Magnetic.jsx";

const { identity, portfolio } = site;

const nameLines = (() => {
  const source = identity.headline || identity.fullName || brandName;
  const words = source.split(/\s+/).filter(Boolean);
  if (words.length < 2) return [source];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
})();

// Longest line drives the type size so long names fit instead of being clipped.
const longestLine = Math.max(...nameLines.map((line) => line.length)) + 1;

export default function Hero() {
  const ref = useRef(null);
  const { enabled } = useMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const typeY = useTransform(scrollYProgress, [0, 1], [0, enabled ? 90 : 0]);
  const artY = useTransform(scrollYProgress, [0, 1], [0, enabled ? -60 : 0]);

  const enter = (delay) =>
    enabled
      ? {
          initial: { opacity: 0, y: revealDistance },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: EASE },
        }
      : {};

  const highlights = portfolio.skills.slice(0, 4);

  return (
    <section id="top" ref={ref} className="hero" aria-labelledby="hero-title">
      <div className="hero__grid-lines" aria-hidden="true" />
      <div className="container hero__inner">
        <motion.p className="hero__eyebrow" {...enter(0.05)}>
          <span>{identity.profession}</span>
          {has(identity.availability) && (
            <span className="hero__status">
              <span className="hero__status-dot" aria-hidden="true" />
              {identity.availability}
            </span>
          )}
        </motion.p>

        <motion.div className="hero__title-wrap" style={{ y: typeY }}>
          <h1 id="hero-title" className="hero__title" style={{ "--chars": longestLine }}>
            {nameLines.map((line, index) => (
              <motion.span key={line} className="hero__title-line" {...enter(0.15 + index * 0.1)}>
                {line}
                {index === nameLines.length - 1 && <span className="accent">.</span>}
              </motion.span>
            ))}
          </h1>
          {has(identity.roleLine2) && (
            <motion.p className="hero__script" {...enter(0.4)}>
              {identity.roleLine2}
            </motion.p>
          )}
        </motion.div>

        <motion.div className="hero__art" style={{ y: artY }} aria-hidden={!has(identity.portrait)}>
          {has(identity.portrait) ? (
            <img
              src={identity.portrait}
              alt={`Portrait of ${identity.fullName || brandName}`}
              className="hero__portrait"
              fetchPriority="high"
            />
          ) : (
            <div className="hero__monogram">
              <span>{initials}</span>
            </div>
          )}
        </motion.div>

        <motion.div className="hero__bottom" {...enter(0.5)}>
          <div className="hero__copy">
            {has(identity.intro) && <p className="hero__intro">{identity.intro}</p>}
            {highlights.length > 0 && (
              <ul className="hero__highlights" aria-label="Specialties">
                {highlights.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            )}
            {has(identity.location) && (
              <p className="hero__location">
                <MapPin size={16} aria-hidden="true" /> {identity.location}
              </p>
            )}
          </div>

          <div className="hero__ctas">
            <Magnetic>
              <a href="#work" className="btn btn--accent">
                {labels.viewWork} <ArrowDownRight size={18} aria-hidden="true" />
              </a>
            </Magnetic>
            {sections.contact && (
              <Magnetic>
                <a href="#contact" className="btn btn--ghost">
                  {labels.contact}
                </a>
              </Magnetic>
            )}
            {resumeUrl && (
              <a href={resumeUrl} className="btn btn--ghost" download>
                <Download size={18} aria-hidden="true" /> {labels.downloadResume}
              </a>
            )}
          </div>
        </motion.div>

        {portfolio.metrics.length > 0 && (
          <dl className="hero__metrics">
            {portfolio.metrics.map((metric) => (
              <div key={metric.label}>
                <dt>{metric.label}</dt>
                <dd>{metric.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
