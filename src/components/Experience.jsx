import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { labels } from "../config/site.js";
import { experience } from "../data/experience.js";
import { sectionNumber } from "../lib/derived.js";
import { EASE, Reveal } from "../lib/motion.jsx";

function Item({ item, index, open, onToggle }) {
  const panelId = `exp-panel-${index}`;
  const hasDetails = item.description || item.highlights?.length;
  const dates = [item.start, item.end].filter(Boolean).join(" – ");

  return (
    <Reveal as="li" className={`timeline__item${open ? " is-open" : ""}`} delay={index * 0.05}>
      <span className="timeline__dot" aria-hidden="true" />
      <h3 className="timeline__heading">
        <button
          type="button"
          className="timeline__toggle"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          disabled={!hasDetails}
        >
          <span className="timeline__dates">{dates}</span>
          <span className="timeline__role">{item.role}</span>
          <span className="timeline__org">
            {[item.organization, item.location].filter(Boolean).join(" · ")}
          </span>
          {hasDetails && <Plus className="timeline__icon" size={20} aria-hidden="true" />}
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && hasDetails && (
          <motion.div
            id={panelId}
            className="timeline__panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="timeline__panel-inner">
              {item.description && <p>{item.description}</p>}
              {item.highlights?.length > 0 && (
                <ul>
                  {item.highlights.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Reveal>
  );
}

export default function Experience() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container">
        <Reveal className="section-head">
          <p className="section-kicker">{sectionNumber("experience")}</p>
          <h2 id="experience-title" className="section-title">
            {labels.experience}
          </h2>
        </Reveal>
        <ol className="timeline">
          {experience.map((item, index) => (
            <Item
              key={`${item.organization}-${item.role}-${item.start}`}
              item={item}
              index={index}
              open={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
