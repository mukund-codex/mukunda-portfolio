import { labels, site } from "../config/site.js";
import { education } from "../data/experience.js";
import { has, sectionNumber, showEducation } from "../lib/derived.js";
import { Reveal } from "../lib/motion.jsx";

const { identity, portfolio } = site;

function ChipList({ title, items }) {
  return (
    <Reveal className="about__block">
      <h3 className="section-subtitle">{title}</h3>
      <ul className="chips chips--large">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Reveal>
  );
}

export default function About() {
  const paragraphs = identity.about.split(/\n\s*\n/).filter((text) => text.trim());

  return (
    <section id="about" className="section section--alt" aria-labelledby="about-title">
      <div className="container about">
        <Reveal className="section-head">
          <p className="section-kicker">{sectionNumber("about")}</p>
          <h2 id="about-title" className="section-title">
            {labels.about}
          </h2>
        </Reveal>

        <div className="about__layout">
          {paragraphs.length > 0 && (
            <Reveal className="about__bio">
              {paragraphs.map((text, index) => (
                <p key={index} className={index === 0 ? "about__lead" : undefined}>
                  {text}
                </p>
              ))}
            </Reveal>
          )}

          <div className="about__side">
            {has(portfolio.skills) && <ChipList title={labels.skills} items={portfolio.skills} />}
            {has(portfolio.tools) && <ChipList title={labels.toolsHeading} items={portfolio.tools} />}
            {showEducation && (
              <Reveal className="about__block">
                <h3 className="section-subtitle">{labels.education}</h3>
                <ul className="edu-list">
                  {education.map((item) => (
                    <li key={`${item.institution}-${item.qualification}`}>
                      <p className="edu-list__title">{item.qualification}</p>
                      <p className="edu-list__meta">
                        {[item.institution, [item.start, item.end].filter(Boolean).join(" – ")]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                      {item.description && <p className="edu-list__text">{item.description}</p>}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        </div>

        {has(portfolio.processSteps) && (
          <div className="process">
            <h3 className="section-subtitle">{labels.process}</h3>
            <ol className="process__list">
              {portfolio.processSteps.map((step, index) => (
                <Reveal as="li" key={step.title} delay={index * 0.06} className="process__step">
                  <span className="process__num">{String(index + 1).padStart(2, "0")}</span>
                  <h4>{step.title}</h4>
                  {step.text && <p>{step.text}</p>}
                </Reveal>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}
