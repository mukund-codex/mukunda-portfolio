import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, Play, X } from "lucide-react";
import { labels } from "../config/site.js";
import { EASE } from "../lib/motion.jsx";

function youtubeId(url = "") {
  const match = url.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  return match ? match[1] : "";
}

/** Privacy-aware embed: nothing loads from YouTube until the visitor asks for it. */
function Video({ url, title }) {
  const [play, setPlay] = useState(false);
  const id = youtubeId(url);
  if (!id) {
    return (
      <a className="btn btn--ghost" href={url} target="_blank" rel="noopener noreferrer">
        <Play size={18} aria-hidden="true" /> Watch video
      </a>
    );
  }
  return (
    <div className="video">
      {play ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          loading="lazy"
        />
      ) : (
        <button type="button" className="video__poster" onClick={() => setPlay(true)}>
          <Play size={36} aria-hidden="true" />
          <span>Play video</span>
        </button>
      )}
    </div>
  );
}

const FOCUSABLE = 'a[href], button:not([disabled]), input, textarea, select, iframe, [tabindex]:not([tabindex="-1"])';

export default function ProjectDialog({ project, onClose }) {
  const panel = useRef(null);
  const closeButton = useRef(null);

  useEffect(() => {
    if (!project) return;
    closeButton.current?.focus();
    document.body.classList.add("no-scroll");
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !panel.current) return;
      const items = [...panel.current.querySelectorAll(FOCUSABLE)];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("no-scroll");
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="dialog-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onMouseDown={(event) => event.target === event.currentTarget && onClose()}
        >
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            className="dialog"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <button ref={closeButton} type="button" className="dialog__close" onClick={onClose} aria-label={labels.close}>
              <X size={22} aria-hidden="true" />
            </button>

            {project.coverImage && (
              <img className="dialog__cover" src={project.coverImage} alt={`${project.title} cover`} />
            )}

            <div className="dialog__body">
              <p className="dialog__meta">
                {[project.category, project.year].filter(Boolean).join(" · ")}
              </p>
              <h2 id="dialog-title" className="dialog__title">
                {project.title}
              </h2>
              {project.description && <p className="dialog__text">{project.description}</p>}

              <dl className="dialog__facts">
                {project.role && (
                  <div>
                    <dt>{labels.role}</dt>
                    <dd>{project.role}</dd>
                  </div>
                )}
                {project.tools?.length > 0 && (
                  <div>
                    <dt>{labels.tools}</dt>
                    <dd>
                      <ul className="chips">
                        {project.tools.map((tool) => (
                          <li key={tool}>{tool}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}
              </dl>

              {project.outcomes?.length > 0 && (
                <>
                  <h3 className="dialog__subhead">{labels.outcomes}</h3>
                  <ul className="dialog__list">
                    {project.outcomes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              )}

              {project.videoUrl && <Video url={project.videoUrl} title={project.title} />}

              {project.gallery?.length > 0 && (
                <div className="dialog__gallery">
                  {project.gallery.map((src, index) => (
                    <img key={src} src={src} alt={`${project.title} screenshot ${index + 1}`} loading="lazy" />
                  ))}
                </div>
              )}

              {(project.liveUrl || project.sourceUrl) && (
                <div className="dialog__links">
                  {project.liveUrl && (
                    <a className="btn btn--accent" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      {labels.liveSite} <ExternalLink size={16} aria-hidden="true" />
                    </a>
                  )}
                  {project.sourceUrl && (
                    <a className="btn btn--ghost" href={project.sourceUrl} target="_blank" rel="noopener noreferrer">
                      <Github size={16} aria-hidden="true" /> {labels.source}
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
