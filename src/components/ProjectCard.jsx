import { forwardRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { labels } from "../config/site.js";
import { initials } from "../lib/derived.js";
import { EASE, revealDistance, useMotion } from "../lib/motion.jsx";

const ProjectCard = forwardRef(function ProjectCard({ project, onOpen, large = false, index = 0 }, ref) {
  const { enabled } = useMotion();
  const animation = enabled
    ? {
        initial: { opacity: 0, y: revealDistance },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "0px 0px -8% 0px" },
        transition: { duration: 0.6, delay: (index % 3) * 0.08, ease: EASE },
      }
    : {};

  return (
    <motion.article ref={ref} layout={enabled} className={`project-card${large ? " project-card--large" : ""}`} {...animation}>
      <button type="button" className="project-card__button" onClick={(event) => onOpen(project, event.currentTarget)}>
        <span className={`project-card__media${project.coverImage ? "" : " project-card__media--text"}`}>
          {project.coverImage ? (
            <img
              src={project.coverImage}
              alt=""
              loading="lazy"
              decoding="async"
              width={project.coverWidth || 1600}
              height={project.coverHeight || 1000}
            />
          ) : (
            // Typographic cover until the owner adds a screenshot.
            <span className="project-card__placeholder" aria-hidden="true">
              <span className="project-card__placeholder-title">{project.title || initials}</span>
              {project.tools?.length > 0 && (
                <span className="project-card__placeholder-tools">{project.tools.slice(0, 4).join(" · ")}</span>
              )}
            </span>
          )}
        </span>
        <span className="project-card__body">
          <span className="project-card__meta">
            {project.category && <span className="tag">{project.category}</span>}
            {project.year && <span className="project-card__year">{project.year}</span>}
          </span>
          <span className="project-card__title">{project.title}</span>
          {project.summary && <span className="project-card__summary">{project.summary}</span>}
          <span className="project-card__action">
            {labels.viewProject} <ArrowUpRight size={16} aria-hidden="true" />
          </span>
        </span>
      </button>
    </motion.article>
  );
});

export default ProjectCard;
