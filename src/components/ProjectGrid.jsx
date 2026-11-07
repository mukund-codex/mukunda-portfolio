import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Search } from "lucide-react";
import { labels, site } from "../config/site.js";
import { projects } from "../data/projects.js";
import { categories, featuredProjects, sectionNumber } from "../lib/derived.js";
import { Reveal } from "../lib/motion.jsx";
import ProjectCard from "./ProjectCard.jsx";
import ProjectDialog from "./ProjectDialog.jsx";

const PAGE_SIZE = 6;

function Archive({ onOpen }) {
  const [category, setCategory] = useState(labels.all);
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((project) => {
      if (category !== labels.all && project.category !== category) return false;
      if (!q) return true;
      return [project.title, project.summary, project.category, project.role, ...(project.tools || [])]
        .filter(Boolean)
        .some((text) => text.toLowerCase().includes(q));
    });
  }, [category, query]);

  const filters = [labels.all, ...categories];

  return (
    <div className="archive">
      <div className="archive__head">
        <h3 className="section-subtitle">{labels.allWork}</h3>
        <div className="archive__controls">
          {categories.length > 1 && (
            <LayoutGroup id="filters">
              <div className="filters" role="group" aria-label="Filter by category">
                {filters.map((name) => (
                  <button
                    key={name}
                    type="button"
                    className={`filter${category === name ? " is-active" : ""}`}
                    aria-pressed={category === name}
                    onClick={() => {
                      setCategory(name);
                      setVisible(PAGE_SIZE);
                    }}
                  >
                    {name}
                    {category === name && <motion.span layoutId="filter-underline" className="filter__line" />}
                  </button>
                ))}
              </div>
            </LayoutGroup>
          )}
          <label className="search">
            <Search size={18} aria-hidden="true" />
            <span className="visually-hidden">{labels.searchProjects}</span>
            <input
              type="search"
              placeholder={labels.searchProjects}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setVisible(PAGE_SIZE);
              }}
            />
          </label>
        </div>
      </div>

      <p className="visually-hidden" aria-live="polite">
        {filtered.length} projects shown
      </p>

      {filtered.length === 0 ? (
        <p className="empty-note">{labels.noMatches}</p>
      ) : (
        <motion.div layout className="project-grid">
          <AnimatePresence mode="popLayout">
            {filtered.slice(0, visible).map((project, index) => (
              <ProjectCard key={project.id} project={project} onOpen={onOpen} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {visible < filtered.length && (
        <div className="archive__more">
          <button type="button" className="btn btn--ghost" onClick={() => setVisible((value) => value + PAGE_SIZE)}>
            {labels.loadMore}
          </button>
        </div>
      )}
    </div>
  );
}

export default function ProjectGrid() {
  const [selected, setSelected] = useState(null);
  const [opener, setOpener] = useState(null);

  const open = (project, trigger) => {
    setOpener(trigger);
    setSelected(project);
  };
  const close = () => {
    setSelected(null);
    opener?.focus();
  };

  const showFeatured = featuredProjects.length > 0;
  // Without featured picks the archive is the only listing, so it always shows.
  const showArchive =
    projects.length > 0 &&
    (!showFeatured || (site.preferences.showProjectArchive && projects.length > featuredProjects.length));

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container">
        <Reveal className="section-head">
          <p className="section-kicker">{sectionNumber("work")}</p>
          <h2 id="work-title" className="section-title">
            {labels.selectedWork}
          </h2>
        </Reveal>

        {projects.length === 0 ? (
          <Reveal className="empty-state">
            <span className="empty-state__mark" aria-hidden="true" />
            <h3>{labels.noProjectsTitle}</h3>
            <p>{labels.noProjectsText}</p>
          </Reveal>
        ) : (
          <>
            {showFeatured && (
              // First card spans the row; with an even count the last does too, so no card sits alone.
              <div className="featured-grid">
                {featuredProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} onOpen={open} large={index === 0 || (featuredProjects.length % 2 === 0 && index === featuredProjects.length - 1)} index={index} />
                ))}
              </div>
            )}
            {showArchive && <Archive onOpen={open} />}
          </>
        )}
      </div>

      <ProjectDialog project={selected} onClose={close} />
    </section>
  );
}
