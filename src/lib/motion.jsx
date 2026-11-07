import { createContext, useContext, useEffect, useState } from "react";
import { MotionConfig, motion } from "framer-motion";
import { site } from "../config/site.js";
import { storageKey } from "./derived.js";

export const EASE = [0.22, 1, 0.36, 1];

const INTENSITY = { subtle: 16, balanced: 32, expressive: 48 };
export const revealDistance = INTENSITY[site.appearance.animationIntensity] ?? 32;

const MotionContext = createContext({ enabled: true, toggle: () => {} });
const KEY = storageKey("motion");

function readStored() {
  try {
    const value = localStorage.getItem(KEY);
    return value === null ? null : value === "on";
  } catch {
    return null;
  }
}

export function MotionProvider({ children }) {
  const [systemReduced, setSystemReduced] = useState(
    () => typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [preference, setPreference] = useState(readStored);

  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setSystemReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // An explicit choice in the header wins; otherwise follow the OS setting.
  const enabled = preference ?? !systemReduced;

  useEffect(() => {
    document.documentElement.dataset.motion = enabled ? "on" : "off";
  }, [enabled]);

  const toggle = () => {
    const next = !enabled;
    setPreference(next);
    try {
      localStorage.setItem(KEY, next ? "on" : "off");
    } catch {
      /* storage unavailable: keep the choice for this visit only */
    }
  };

  return (
    <MotionContext.Provider value={{ enabled, toggle }}>
      <MotionConfig reducedMotion={enabled ? "never" : "always"} transition={{ ease: EASE }}>
        {children}
      </MotionConfig>
    </MotionContext.Provider>
  );
}

export const useMotion = () => useContext(MotionContext);

/** Scroll reveal. Content is fully visible when motion is off. */
export function Reveal({ as = "div", delay = 0, children, ...rest }) {
  const { enabled } = useMotion();
  const Tag = motion[as];
  if (!enabled) {
    const Plain = as;
    return <Plain {...rest}>{children}</Plain>;
  }
  return (
    <Tag
      initial={{ opacity: 0, y: revealDistance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
