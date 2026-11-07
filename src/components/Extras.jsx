import { Award, Quote } from "lucide-react";
import { site } from "../config/site.js";
import { sectionNumber } from "../lib/derived.js";
import { Reveal } from "../lib/motion.jsx";

const { portfolio } = site;

/** Only rendered for real, authorized clients (see preferences.showClientLogos). */
export function ClientLogos() {
  return (
    <section className="logos" aria-label="Clients">
      <ul className="container logos__list">
        {portfolio.clientLogos.map((logo) => (
          <li key={logo.name}>
            <img src={logo.src} alt={logo.name} loading="lazy" height="40" />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Awards() {
  return (
    <section id="awards" className="section" aria-labelledby="awards-title">
      <div className="container">
        <Reveal className="section-head">
          <p className="section-kicker">{sectionNumber("awards")}</p>
          <h2 id="awards-title" className="section-title">Recognition</h2>
        </Reveal>
        <ul className="awards">
          {portfolio.awards.map((award) => (
            <Reveal as="li" key={award.title} className="awards__item">
              <Award size={20} aria-hidden="true" />
              <span className="awards__title">
                {award.url ? (
                  <a href={award.url} target="_blank" rel="noopener noreferrer">
                    {award.title}
                  </a>
                ) : (
                  award.title
                )}
              </span>
              <span className="awards__meta">{[award.issuer, award.year].filter(Boolean).join(" · ")}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="section section--alt" aria-labelledby="testimonials-title">
      <div className="container">
        <Reveal className="section-head">
          <p className="section-kicker">{sectionNumber("testimonials")}</p>
          <h2 id="testimonials-title" className="section-title">Kind words</h2>
        </Reveal>
        <div className="testimonials">
          {portfolio.testimonials.map((item) => (
            <Reveal as="figure" key={item.name} className="testimonial">
              <Quote size={24} aria-hidden="true" />
              <blockquote>{item.quote}</blockquote>
              <figcaption>
                <strong>{item.name}</strong>
                {item.role && <span>{item.role}</span>}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
